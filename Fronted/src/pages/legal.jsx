import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import EnlacesLegales from "../components/EnlacesLegales";
import { NEGOCIO } from "../data/legalData";
import { abrirPreferencias } from "../data/preferencias";

const contacto = [NEGOCIO.correo, NEGOCIO.telefono].filter(Boolean).join(" / ");

// Borradores: deben ser revisados por un abogado antes de publicarse.
const DOCS = {
  "/privacidad": {
    titulo: "Política de Privacidad",
    secciones: [
      ["Responsable del tratamiento", [
        `${NEGOCIO.nombre}${NEGOCIO.nit ? ` (NIT ${NEGOCIO.nit})` : ""}, ubicado en ${NEGOCIO.direccion}, es responsable del tratamiento de tus datos personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.`,
        `Contacto: ${contacto}.`,
      ]],
      ["Datos que recogemos y finalidad", [
        "Pedidos: nombre, teléfono y, si pides a domicilio, dirección, barrio y referencia. Los usamos únicamente para preparar, entregar y atender tu pedido.",
        "Sugerencias, quejas y reclamos: tu mensaje y tu nombre (opcional), solo para atender tu solicitud.",
        "Como prueba de tu autorización guardamos la fecha, la versión de los textos aceptados, tu dirección IP y el navegador utilizado.",
      ]],
      ["Tus derechos", [
        "Como titular puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar tu autorización.",
        `Para ejercerlos escríbenos a ${NEGOCIO.correo || NEGOCIO.telefono}. Responderemos en los plazos que fija la ley.`,
      ]],
      ["Terceros", [
        "Pasarela de pago (Wompi): si pagas en línea, el pago se procesa en su plataforma bajo sus propias políticas.",
        "Google: el mapa de la página Ubicación es de Google y puede usar cookies de Google; solo se carga si aceptas todas las cookies.",
      ]],
      ["Cookies", [
        "No usamos cookies de publicidad. Guardamos en tu navegador solo lo necesario para que funcione tu carrito y tu sesión.",
      ], true],
    ],
  },
  "/terminos": {
    titulo: "Términos de Servicio",
    secciones: [
      ["Servicio", [`${NEGOCIO.nombre} ofrece venta de bowls y bebidas con entrega a domicilio, recogida en tienda o consumo en el local en ${NEGOCIO.direccion}.`]],
      ["Pedidos y precios", ["Al confirmar tu pedido aceptas estos términos. Los precios se calculan en nuestro servidor y pueden cambiar sin previo aviso; el valor aplicable es el mostrado al confirmar. El domicilio, la caja y el vaso se cobran según el tipo de entrega elegido."]],
      ["Pagos", ["Puedes pagar en efectivo (contraentrega o en caja) o en línea mediante Wompi."]],
      ["Tus datos", ["El tratamiento de tus datos se rige por nuestra Política de Privacidad."]],
    ],
  },
  "/reembolsos": {
    titulo: "Cancelaciones y Reembolsos",
    secciones: [
      ["Cancelaciones", [`Puedes solicitar la cancelación de tu pedido comunicándote cuanto antes con nosotros (${contacto}). Si ya está en preparación o en camino, podría no ser posible cancelarlo.`]],
      ["Reembolsos", ["Si hay un error en tu pedido o un problema de calidad, contáctanos el mismo día y lo repondremos o reembolsaremos. Los pagos en línea se reembolsan por el mismo medio de pago."]],
    ],
  },
};

export default function Legal() {
  const { pathname, hash } = useLocation();
  const doc = DOCS[pathname];

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  if (!doc) return null;
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto px-gutter py-12 space-y-8">
        <h1 className="font-headline-md text-headline-md text-primary">{doc.titulo}</h1>
        <p className="text-on-surface-variant">Última actualización: {NEGOCIO.actualizado}</p>
        {doc.secciones.map(([t, parrafos, cookies]) => (
          <section key={t} id={cookies ? "cookies" : undefined} className="space-y-3">
            <h2 className="font-headline-sm text-headline-sm text-primary">{t}</h2>
            {parrafos.map((p) => <p key={p}>{p}</p>)}
            {cookies && (
              <button
                type="button"
                onClick={abrirPreferencias}
                className="bg-primary-container text-white px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary transition-all"
              >
                Cambiar mis preferencias de cookies
              </button>
            )}
          </section>
        ))}
      </main>
      <footer className="bg-surface-container border-t border-outline-variant py-8 px-gutter">
        <EnlacesLegales />
      </footer>
    </div>
  );
}
