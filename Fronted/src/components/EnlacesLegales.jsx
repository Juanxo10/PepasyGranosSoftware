import { Link } from "react-router-dom";
import { abrirPreferencias } from "../data/preferencias";

const cls = "font-label-md text-label-md text-on-surface-variant hover:text-primary underline-offset-2 hover:underline";

export default function EnlacesLegales() {
  return (
    <nav aria-label="Información legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
      <Link className={cls} to="/privacidad">Privacidad</Link>
      <Link className={cls} to="/terminos">Términos</Link>
      <Link className={cls} to="/reembolsos">Reembolsos</Link>
      <button type="button" className={cls} onClick={abrirPreferencias}>Preferencias de cookies</button>
    </nav>
  );
}
