import { Link } from "react-router-dom";
import logoDark from "../assets/log.png";
import { NEGOCIO } from "../data/legalData";
import { abrirPreferencias } from "../data/preferencias";

const link = "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors";
const titulo = "font-label-md text-label-md text-primary mb-4 md:mb-6 uppercase tracking-widest";

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start mb-5">
            <img alt="Pepas Coffee" className="h-12 w-auto object-contain" src={logoDark} />
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            Nutriendo tu cuerpo, mente y alma desde 2018. Ingredientes puros, intención pura.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              className="w-10 h-10 rounded-full border border-primary-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-white transition-all"
              href="https://www.instagram.com/pepascoffee/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Pepas Coffee"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Navegación">
          <h4 className={titulo}>Navegación</h4>
          <ul className="space-y-3">
            <li><Link className={link} to="/menu">Menú</Link></li>
            <li><Link className={link} to="/ubicacion">Ubicación</Link></li>
            <li><Link className={link} to="/sugerencias">Sugerencias</Link></li>
          </ul>
        </nav>

        <nav aria-label="Información legal">
          <h4 className={titulo}>Legal</h4>
          <ul className="space-y-3">
            <li><Link className={link} to="/privacidad">Política de Privacidad</Link></li>
            <li><Link className={link} to="/terminos">Términos de Servicio</Link></li>
            <li><Link className={link} to="/reembolsos">Cancelaciones y Reembolsos</Link></li>
            <li><button type="button" className={link} onClick={abrirPreferencias}>Preferencias de cookies</button></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-outline-variant py-6">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <span className="font-label-md text-label-md text-on-surface-variant">
            © {new Date().getFullYear()} {NEGOCIO.nombre}. Nutriendo tu cuerpo, mente y alma.
          </span>
        </div>
      </div>
    </footer>
  );
}
