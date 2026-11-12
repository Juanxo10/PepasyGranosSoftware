// Storage que nunca lanza (modo privado, cookies bloqueadas): cae a memoria.
const memoria = { local: new Map(), session: new Map() };
const crear = (tipo) => ({
  get(k) { try { const v = window[`${tipo}Storage`].getItem(k); if (v !== null) return v; } catch { /* usa memoria */ } return memoria[tipo].get(k) ?? null; },
  set(k, v) { memoria[tipo].set(k, String(v)); try { window[`${tipo}Storage`].setItem(k, String(v)); } catch { /* usa memoria */ } },
  remove(k) { memoria[tipo].delete(k); try { window[`${tipo}Storage`].removeItem(k); } catch { /* usa memoria */ } },
});
export const almacenLocal = crear("local");
export const almacenSesion = crear("session");
