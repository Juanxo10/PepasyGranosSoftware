import { useEffect, useState } from "react";
import { almacenLocal } from "./almacen";
import { NEGOCIO } from "./legalData";

const KEY = "pepas_cookies", META = "pepas_cookies_meta", CAMBIO = "pepas:consent", ABRIR = "pepas:abrir-cookies";

// Si la Política cambió desde que decidió, vuelve a preguntar
export const leerConsentimiento = () => {
  const meta = almacenLocal.get(META);
  return meta && meta.includes(NEGOCIO.actualizado) ? almacenLocal.get(KEY) : null;
};
export function guardarConsentimiento(valor) { // "todas" | "necesarias"
  almacenLocal.set(KEY, valor);
  almacenLocal.set(META, `${NEGOCIO.actualizado}|${new Date().toISOString()}`);
  window.dispatchEvent(new Event(CAMBIO));
}
export const abrirPreferencias = () => window.dispatchEvent(new Event(ABRIR));
export const alAbrirPreferencias = (fn) => { addEventListener(ABRIR, fn); return () => removeEventListener(ABRIR, fn); };
export function useConsentimiento() {
  const [valor, setValor] = useState(leerConsentimiento);
  useEffect(() => { const f = () => setValor(leerConsentimiento()); addEventListener(CAMBIO, f); return () => removeEventListener(CAMBIO, f); }, []);
  return valor;
}
