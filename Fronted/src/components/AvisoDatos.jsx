import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { almacenLocal } from "../data/almacen";
import { guardarConsentimiento, alAbrirPreferencias } from "../data/preferencias";

export default function AvisoDatos() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  useEffect(() => alAbrirPreferencias(() => setVisible(true)), []);

  // El personal no ve el aviso
  const esPersonal = pathname.startsWith("/admin") || pathname.startsWith("/login") || !!almacenLocal.get("token");
  if (!visible || esPersonal) return null;

  const elegir = (v) => { guardarConsentimiento(v); setVisible(false); };
  const btn = "px-5 py-2 rounded-full font-label-md text-label-md transition-all";

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies y datos"
      className="fixed bottom-0 inset-x-0 z-[100] bg-surface-container border-t border-outline-variant shadow-[0px_-4px_20px_rgba(45,74,47,0.12)]"
    >
      <div className="max-w-container-max mx-auto px-gutter py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="flex-1 font-body-md text-body-md text-on-surface-variant">
          No usamos cookies de publicidad. Guardamos en tu navegador lo necesario para que funcione tu carrito.
          Si aceptas todas, también cargamos el mapa de Google, que puede usar cookies de Google.{" "}
          <Link to="/privacidad#cookies" className="underline text-primary">Más información</Link>
        </p>
        <div className="flex gap-3 justify-end">
          <button className={`${btn} border border-primary-container text-primary hover:bg-primary-container hover:text-white`} onClick={() => elegir("necesarias")}>
            Solo necesarias
          </button>
          <button className={`${btn} bg-primary-container text-white hover:bg-primary`} onClick={() => elegir("todas")}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
