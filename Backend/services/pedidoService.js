const pool = require("../db");

const ESTADOS_VALIDOS = ["nuevo", "preparando", "camino", "entregado", "cancelado"];
const METODOS_VALIDOS = ["Contraentrega en efectivo", "Transferencia Wompi"];

// ── Crear pedido ─────────────────────────────────────────
async function crearPedido({ bowls, extraItems, cliente, metodo_pago }) {
  if (!METODOS_VALIDOS.includes(metodo_pago)) {
    throw { status: 400, message: "Método de pago no disponible" };
  }

  const { nombre, telefono, direccion, barrio, referencia, notas } = cliente || {};

  if (!nombre || !telefono || !direccion || !barrio) {
    throw { status: 400, message: "Faltan datos del cliente" };
  }
  if (!Array.isArray(bowls) || bowls.length === 0) {
    throw { status: 400, message: "El pedido debe tener al menos un bowl" };
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Leer toda la configuración de precios desde la DB (case-insensitive)
    const confRes = await client.query("SELECT LOWER(clave) AS clave, valor FROM configuracion");
    const conf = {};
    for (const row of confRes.rows) conf[row.clave] = Number(row.valor);

    const DOMICILIO       = conf.domicilio        ?? conf.precio_domicilio        ?? 6000;
    const BOWL_BASE       = conf.bowl_base         ?? conf.precio_base_bowl        ?? 12000;
    const TOPPINGS_GRATIS = conf.toppings_gratis   ?? conf.toppings_incluidos      ?? 4;
    const TOPPING_EXTRA   = conf.topping_extra      ?? conf.precio_topping_extra   ?? 3000;

    // Recopilar todos los nombres de productos necesarios
    const allNames = new Set();
    for (const bowl of bowls) {
      if (bowl.carb) allNames.add(bowl.carb);
      (bowl.tops || []).forEach((t) => allNames.add(t));
      (bowl.prots || []).forEach((p) => allNames.add(p));
      if (bowl.bev) allNames.add(bowl.bev);
      if (bowl.lechuga) allNames.add("Lechuga");
      if (bowl.vinagreta) allNames.add("Vinagreta");
    }
    for (const name of Object.keys(extraItems || {})) {
      allNames.add(name);
    }

    // Obtener productos de la DB en una sola consulta
    const prodRes = await client.query(
      "SELECT id, nombre, tipo, precio FROM productos WHERE nombre = ANY($1) AND activo = true",
      [Array.from(allNames)]
    );
    const prodMap = {};
    for (const p of prodRes.rows) {
      prodMap[p.nombre] = p;
    }

    // Calcular precios y preparar datos de bowls
    let subtotal = 0;
    const bowlsData = [];

    for (const bowl of bowls) {
      const base = prodMap[bowl.carb];
      if (!base) throw { status: 400, message: `Producto no encontrado: ${bowl.carb}` };

      // Precio base fijo del bowl (leído de configuracion)
      let bowlPrice = BOWL_BASE;
      const toppingIds = [];
      const proteinIds = [];

      const topsArr = bowl.tops || [];
      for (let ti = 0; ti < topsArr.length; ti++) {
        const prod = prodMap[topsArr[ti]];
        if (!prod) throw { status: 400, message: `Producto no encontrado: ${topsArr[ti]}` };
        // Los primeros TOPPINGS_GRATIS son gratis; los demás usan el precio del producto en DB
        if (ti >= TOPPINGS_GRATIS) bowlPrice += prod.precio > 0 ? prod.precio : TOPPING_EXTRA;
        toppingIds.push(prod.id);
      }

      for (const p of bowl.prots || []) {
        const prod = prodMap[p];
        if (!prod) throw { status: 400, message: `Producto no encontrado: ${p}` };
        bowlPrice += prod.precio;
        proteinIds.push(prod.id);
      }

      let bebidaId = null;
      if (bowl.bev) {
        const prod = prodMap[bowl.bev];
        if (!prod) throw { status: 400, message: `Producto no encontrado: ${bowl.bev}` };
        bowlPrice += prod.precio;
        bebidaId = prod.id;
      }

      // Incluidos (precio 0 pero se registran)
      const incluidoIds = [];
      if (bowl.lechuga && prodMap["Lechuga"]) incluidoIds.push(prodMap["Lechuga"].id);
      if (bowl.vinagreta && prodMap["Vinagreta"]) incluidoIds.push(prodMap["Vinagreta"].id);

      subtotal += bowlPrice;
      bowlsData.push({ baseId: base.id, bebidaId, toppingIds, proteinIds, incluidoIds });
    }

    // Calcular extras
    const extrasData = [];
    for (const [name, qty] of Object.entries(extraItems || {})) {
      if (qty <= 0) continue;
      const prod = prodMap[name];
      if (!prod) throw { status: 400, message: `Producto no encontrado: ${name}` };
      subtotal += prod.precio * qty;
      extrasData.push({ productoId: prod.id, cantidad: qty });
    }

    const total = subtotal + DOMICILIO;
    const numero_pedido = "P" + Date.now();

    // Insertar pedido
    // Pedidos Wompi arrancan como 'pendiente_pago' — se activan solo cuando el webhook confirma
    const estadoInicial = metodo_pago === "Transferencia Wompi" ? "pendiente_pago" : "nuevo";

    const pedidoRes = await client.query(
      `INSERT INTO pedidos
        (numero_pedido, nombre_cliente, telefono, direccion, barrio, referencia, notas, metodo_pago, subtotal, domicilio, total, estado)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id, numero_pedido, total`,
      [numero_pedido, nombre, telefono, direccion, barrio, referencia || null, notas || null, metodo_pago, subtotal, DOMICILIO, total, estadoInicial]
    );
    const pedidoId = pedidoRes.rows[0].id;

    // Insertar bowls + items
    for (const bd of bowlsData) {
      const bowlRes = await client.query(
        "INSERT INTO bowls (pedido_id, base_id, bebida_id) VALUES ($1,$2,$3) RETURNING id",
        [pedidoId, bd.baseId, bd.bebidaId]
      );
      const bowlId = bowlRes.rows[0].id;

      const allItemIds = [...bd.toppingIds, ...bd.proteinIds, ...bd.incluidoIds];
      for (const prodId of allItemIds) {
        await client.query(
          "INSERT INTO bowl_items (bowl_id, producto_id) VALUES ($1,$2)",
          [bowlId, prodId]
        );
      }
    }

    // Insertar extras
    for (const ext of extrasData) {
      await client.query(
        "INSERT INTO pedido_extras (pedido_id, producto_id, cantidad) VALUES ($1,$2,$3)",
        [pedidoId, ext.productoId, ext.cantidad]
      );
    }

    await client.query("COMMIT");
    return pedidoRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// ── Listar pedidos ───────────────────────────────────────
async function listarPedidos() {
  const pedidosRes = await pool.query(
    "SELECT * FROM pedidos WHERE estado != 'pendiente_pago' ORDER BY creado_en DESC"
  );

  const pedidos = [];

  for (const p of pedidosRes.rows) {
    // Bowls con base y bebida
    const bowlsRes = await pool.query(
      `SELECT b.id, base.nombre AS base, beb.nombre AS bebida
       FROM bowls b
       LEFT JOIN productos base ON b.base_id = base.id
       LEFT JOIN productos beb  ON b.bebida_id = beb.id
       WHERE b.pedido_id = $1`,
      [p.id]
    );

    const bowls = [];
    for (const bowl of bowlsRes.rows) {
      const itemsRes = await pool.query(
        `SELECT pr.nombre, pr.tipo
         FROM bowl_items bi
         JOIN productos pr ON bi.producto_id = pr.id
         WHERE bi.bowl_id = $1`,
        [bowl.id]
      );
      bowls.push({
        base: bowl.base,
        bebida: bowl.bebida,
        toppings: itemsRes.rows.filter((i) => i.tipo === "topping").map((i) => i.nombre),
        proteinas: itemsRes.rows.filter((i) => i.tipo === "proteina").map((i) => i.nombre),
        incluidos: itemsRes.rows.filter((i) => i.tipo === "incluido").map((i) => i.nombre),
      });
    }

    // Extras
    const extrasRes = await pool.query(
      `SELECT pr.nombre, pe.cantidad
       FROM pedido_extras pe
       JOIN productos pr ON pe.producto_id = pr.id
       WHERE pe.pedido_id = $1`,
      [p.id]
    );
    const extras = {};
    for (const e of extrasRes.rows) {
      extras[e.nombre] = e.cantidad;
    }

    pedidos.push({
      id: p.id,
      numero_pedido: p.numero_pedido,
      nombre: p.nombre_cliente,
      tel: p.telefono,
      addr: p.direccion,
      barrio: p.barrio,
      ref: p.referencia,
      notas: p.notas,
      pago: p.metodo_pago,
      status: p.estado,
      subtotal: p.subtotal,
      domicilio: p.domicilio,
      total: p.total,
      hora: p.creado_en,
      bowls,
      extraItems: extras,
    });
  }

  return pedidos;
}

// ── Cambiar estado ───────────────────────────────────────
async function cambiarEstado(id, estado) {
  if (!ESTADOS_VALIDOS.includes(estado)) {
    throw { status: 400, message: "Estado inválido" };
  }
  const res = await pool.query(
    "UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING id, estado",
    [estado, id]
  );
  if (!res.rows.length) {
    throw { status: 404, message: "Pedido no encontrado" };
  }
  return res.rows[0];
}

// ── Actualizar pago Wompi ─────────────────────────────────
// Llamado desde el webhook de Wompi para registrar el resultado
async function updateWompiPayment(numero_pedido, wompiTransactionId, estadoPago) {
  // Si el pago fue aprobado → activar el pedido (pasa a 'nuevo' y aparece en admin)
  // Si fue rechazado/error  → cancelar el pedido (no aparece en admin)
  const nuevoEstado = estadoPago === "aprobado" ? "nuevo" : "cancelado";

  const res = await pool.query(
    `UPDATE pedidos
     SET wompi_transaction_id = $1, estado_pago = $2, estado = $3
     WHERE numero_pedido = $4
     RETURNING id, numero_pedido, estado_pago, estado`,
    [wompiTransactionId, estadoPago, nuevoEstado, numero_pedido]
  );
  if (!res.rows.length) {
    throw { status: 404, message: "Pedido no encontrado" };
  }
  return res.rows[0];
}

module.exports = { crearPedido, listarPedidos, cambiarEstado, updateWompiPayment };
