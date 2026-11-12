import Navbar from "../components/Navbar";
import { useConsentimiento, guardarConsentimiento } from "../data/preferencias";
import Footer from "../components/Footer";

export default function Ubicacion() {
  const consent = useConsentimiento();
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col">
      <Navbar active="ubicacion" />

      {/* Header */}
      <header className="bg-primary px-gutter py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-tertiary-fixed rounded-full mb-5">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span className="font-label-md text-label-md">VISÍTANOS</span>
        </div>
        <h1 className="font-headline-md text-headline-md md:text-display-lg-mobile text-white leading-tight">
          Nuestra Ubicación
        </h1>
        <p className="font-body-md text-body-md text-white/70 mt-4 max-w-xl mx-auto">
          Encuéntranos en Acacías, Meta. Escríbenos o llámanos si tienes cualquier duda con tu pedido.
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 py-section-gap px-gutter bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 items-center gap-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4 bg-surface-container rounded-xl p-5 shadow-[0px_4px_20px_rgba(45,74,47,0.05)]">
                <span className="material-symbols-outlined text-primary-container">location_on</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Dirección</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">Cl. 13 #15-01, Acacías, Meta</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-surface-container rounded-xl p-5 shadow-[0px_4px_20px_rgba(45,74,47,0.05)]">
                <span className="material-symbols-outlined text-primary-container">call</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Teléfono</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">313 2664332</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Cl.%2013%20%2315-01%2C%20Acac%C3%ADas%2C%20Meta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-container text-white px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">directions</span>
                Cómo Llegar
              </a>
              <a
                href="tel:+573132664332"
                className="inline-flex items-center gap-2 border border-primary-container text-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-white transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                Llamar
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
            {consent === "todas" ? <iframe
              title="Ubicación de Pepas Coffee en Acacías, Meta"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Cl.%2013%20%2315-01%2C%20Acac%C3%ADas%2C%20Meta%2C%20Colombia&output=embed"
            /> : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-surface-container p-6 text-center">
                <p className="font-body-md text-on-surface-variant">El mapa de Google solo se carga si aceptas todas las cookies.</p>
                <button className="bg-primary-container text-white px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary transition-all" onClick={() => guardarConsentimiento("todas")}>Aceptar y ver mapa</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
