import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

:root {
  --g900: #1a2e1b;
  --g800: #2D4A2F;
  --g700: #3a5e3c;
  --g600: #4A7C59;
  --g400: #7ab87a;
  --g200: #d4ead4;
  --g100: #edf7ed;
  --gold: #c8a84b;
  --gold-light: #f5e6b8;
  --cream: #f5f3ef;
  --border: #e2ddd6;
  --text: #1a2e1b;
  --muted: #6b7a6b;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--cream);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── NAV ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .9rem 2rem;
  background: rgba(45, 74, 47, .92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: .65rem;
}

.nav-logo {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: contain;
  flex-shrink: 0;
}

.nav-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -.4px;
}

.nav-sub {
  font-size: .58rem;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--g400);
  margin-top: .08rem;
}

.nav-btn {
  background: var(--gold);
  color: var(--g900);
  border: none;
  border-radius: 10px;
  padding: .55rem 1.2rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: .85rem;
  font-weight: 700;
  cursor: pointer;
  transition: background .15s, transform .1s;
}

.nav-btn:hover { background: #d4b050; transform: translateY(-1px); }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 7rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, #2d4a2f 0%, transparent 70%),
    var(--cream);
}

.hero-blur-1 {
  position: absolute;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(74,124,89,.18) 0%, transparent 70%);
  top: 10%; left: -10%;
  pointer-events: none;
}

.hero-blur-2 {
  position: absolute;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(200,168,75,.12) 0%, transparent 70%);
  bottom: 5%; right: -5%;
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  background: var(--gold-light);
  color: #8a6210;
  border: 1px solid #e8cc80;
  border-radius: 999px;
  padding: .4rem 1rem;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-bottom: 1.4rem;
}

.hero-badge span { font-size: .85rem; }

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: .95;
  letter-spacing: -.04em;
  color: var(--g900);
  margin-bottom: .4rem;
}

.hero-title em {
  font-style: normal;
  color: var(--g600);
}

.hero-sub-title {
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -.03em;
  color: var(--g800);
  margin-bottom: 1.2rem;
}

.hero-sub-title span {
  color: var(--gold);
}

.hero-desc {
  max-width: 46ch;
  font-size: clamp(.9rem, 2vw, 1.05rem);
  color: var(--muted);
  line-height: 1.7;
  margin: 0 auto 2.2rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--g800);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 1rem 2rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .55rem;
  transition: background .15s, transform .12s, box-shadow .15s;
  box-shadow: 0 8px 28px rgba(45,74,47,.28);
}

.btn-primary:hover {
  background: var(--g700);
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(45,74,47,.36);
}

.btn-secondary {
  background: transparent;
  color: var(--g800);
  border: 2px solid var(--border);
  border-radius: 14px;
  padding: .95rem 1.8rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color .15s, background .15s;
}

.btn-secondary:hover {
  border-color: var(--g400);
  background: var(--g100);
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .45rem;
  color: var(--muted);
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

/* ── FEATURES ── */
.features {
  padding: 5rem 1.5rem;
  max-width: 1080px;
  margin: 0 auto;
}

.section-eyebrow {
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g600);
  text-align: center;
  margin-bottom: .65rem;
}

.section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -.03em;
  text-align: center;
  color: var(--g900);
  margin-bottom: .7rem;
}

.section-sub {
  text-align: center;
  color: var(--muted);
  font-size: .9rem;
  max-width: 44ch;
  margin: 0 auto 3rem;
  line-height: 1.65;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.feat-card {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 1.8rem 1.6rem;
  transition: box-shadow .18s, transform .18s, border-color .18s;
}

.feat-card:hover {
  box-shadow: 0 12px 40px rgba(26,46,27,.09);
  transform: translateY(-4px);
  border-color: var(--g200);
}

.feat-icon {
  width: 52px;
  height: 52px;
  background: var(--g100);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.1rem;
}

.feat-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--g800);
  margin-bottom: .45rem;
}

.feat-desc {
  font-size: .83rem;
  color: var(--muted);
  line-height: 1.65;
}

/* ── MENU PREVIEW ── */
.preview {
  background: var(--g800);
  padding: 5rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.preview::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 90% 80% at 50% 100%, rgba(74,124,89,.25) 0%, transparent 65%);
  pointer-events: none;
}

.preview-inner {
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
}

.preview .section-eyebrow { color: var(--g400); }
.preview .section-title { color: #fff; }
.preview .section-sub { color: rgba(255,255,255,.55); }

.pills-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: .7rem;
  margin-bottom: 3rem;
}

.menu-pill {
  display: flex;
  align-items: center;
  gap: .5rem;
  background: rgba(255,255,255,.08);
  border: 1.5px solid rgba(255,255,255,.12);
  border-radius: 999px;
  padding: .55rem 1.1rem;
  font-size: .84rem;
  font-weight: 600;
  color: #fff;
  backdrop-filter: blur(4px);
}

.menu-pill .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--g400);
  flex-shrink: 0;
}

.menu-pill.gold .dot { background: var(--gold); }

.preview-cta {
  text-align: center;
}

.preview-cta p {
  color: rgba(255,255,255,.55);
  font-size: .82rem;
  margin-top: .85rem;
}

/* ── CTA BOTTOM ── */
.cta-section {
  padding: 5.5rem 1.5rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-section .section-title { margin-bottom: .65rem; }
.cta-section .section-sub { margin-bottom: 2rem; }

/* ── SUGERENCIAS ── */
.sugerencias {
  padding: 5.5rem 1.5rem;
  background: var(--cream);
  position: relative;
}

.sugerencias-inner {
  max-width: 640px;
  margin: 0 auto;
}

.sug-form {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 2.4rem 2.2rem;
  box-shadow: 0 8px 40px rgba(26,46,27,.07);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.sug-field {
  display: flex;
  flex-direction: column;
  gap: .45rem;
}

.sug-label {
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--g700);
}

.sug-input, .sug-textarea {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: .95rem;
  color: var(--text);
  background: var(--g100);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: .75rem 1rem;
  outline: none;
  transition: border-color .18s, box-shadow .18s;
  width: 100%;
}

.sug-input:focus, .sug-textarea:focus {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(74,124,89,.12);
  background: #fff;
}

.sug-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.sug-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.sug-hint {
  font-size: .75rem;
  color: var(--muted);
}

.sug-ok {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  background: var(--g100);
  color: var(--g700);
  border: 1.5px solid var(--g200);
  border-radius: 12px;
  padding: .75rem 1.4rem;
  font-size: .88rem;
  font-weight: 700;
}

@media (max-width: 640px) {
  .sugerencias { padding: 3.5rem 1.1rem; }
  .sug-form { padding: 1.6rem 1.2rem; border-radius: 18px; }
  .sug-footer { flex-direction: column; align-items: stretch; }
  .sug-footer .btn-primary { width: 100%; justify-content: center; }
}

/* ── FOOTER ── */
.footer {
  background: var(--g900);
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-brand {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -.3px;
}

.footer-brand small {
  display: block;
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--g400);
  margin-top: .1rem;
}

.footer-copy {
  font-size: .72rem;
  color: rgba(255,255,255,.3);
}

/* ── TABLET ── */
@media (min-width: 641px) and (max-width: 1000px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .hero { padding: 7rem 2rem 5rem; }
}

/* ── MOBILE ── */
@media (max-width: 640px) {
  /* Nav: ocultar subtítulo, logo más pequeño */
  .nav { padding: .7rem 1rem; }
  .nav-sub { display: none; }
  .nav-name { font-size: 1rem; }
  .nav-logo { width: 30px; height: 30px; font-size: .9rem; border-radius: 8px; }
  .nav-btn { padding: .5rem .95rem; font-size: .78rem; border-radius: 8px; }

  /* Hero: más compacto, botones apilados */
  .hero {
    min-height: 100svh;
    padding: 5.5rem 1.2rem 5rem;
    justify-content: flex-start;
    padding-top: 6rem;
  }
  .hero-blur-1, .hero-blur-2 { display: none; }
  .hero-badge { font-size: .68rem; padding: .35rem .85rem; margin-bottom: 1.1rem; }
  .hero-title { font-size: clamp(2.6rem, 13vw, 3.8rem); margin-bottom: .35rem; }
  .hero-sub-title { font-size: clamp(1.2rem, 6vw, 1.8rem); margin-bottom: 1rem; }
  .hero-desc { font-size: .88rem; margin-bottom: 1.8rem; max-width: 100%; }
  .hero-actions { flex-direction: column; width: 100%; gap: .75rem; }
  .btn-primary { width: 100%; justify-content: center; padding: 1rem 1.5rem; font-size: .95rem; }
  .btn-secondary { width: 100%; text-align: center; padding: .9rem 1.5rem; font-size: .95rem; }
  .hero-scroll { display: none; }

  /* Features: 1 columna, cards más compactas */
  .features { padding: 3.5rem 1.1rem; }
  .features-grid { grid-template-columns: 1fr; gap: .85rem; }
  .feat-card { padding: 1.3rem 1.2rem; border-radius: 16px; }
  .feat-icon { width: 44px; height: 44px; font-size: 1.25rem; margin-bottom: .85rem; border-radius: 11px; }
  .feat-title { font-size: .95rem; }
  .feat-desc { font-size: .8rem; }
  .section-title { font-size: clamp(1.4rem, 6vw, 1.9rem); }
  .section-sub { font-size: .83rem; max-width: 100%; margin-bottom: 2rem; }

  /* Preview: pills más pequeñas */
  .preview { padding: 3.5rem 1.1rem; }
  .menu-pill { font-size: .76rem; padding: .45rem .85rem; }
  .menu-pill .dot { width: 6px; height: 6px; }
  .pills-wrap { gap: .5rem; margin-bottom: 2.2rem; }
  .preview-cta .btn-primary { width: 100%; justify-content: center; }
  .preview-cta p { font-size: .76rem; }

  /* CTA */
  .cta-section { padding: 3.5rem 1.2rem; }
  .cta-section .btn-primary { width: 100%; justify-content: center; }

  /* Footer */
  .footer { flex-direction: column; align-items: center; text-align: center; padding: 1.8rem 1.2rem; gap: .6rem; }
  .footer-brand { font-size: 1rem; }
  .footer-copy { font-size: .68rem; }
}

/* ── GALLERY ── */
.gallery {
  padding: 5rem 1.5rem;
  background: var(--g900);
  position: relative;
  overflow: hidden;
}

.gallery::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,124,89,.2) 0%, transparent 65%);
  pointer-events: none;
}

.gallery-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

.gallery .section-eyebrow { color: var(--g400); }
.gallery .section-title { color: #fff; }
.gallery .section-sub { color: rgba(255,255,255,.5); margin-bottom: 2.5rem; }

.gallery-track {
  position: relative;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-slide {
  position: absolute;
  border-radius: 22px;
  overflow: hidden;
  transition: all .55s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
}

.gallery-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

.gallery-slide.active {
  width: 340px; height: 604px;
  z-index: 3;
  transform: translateX(0);
  box-shadow: 0 30px 80px rgba(0,0,0,.65);
  opacity: 1;
}

.gallery-slide.prev {
  width: 255px; height: 453px;
  z-index: 2;
  transform: translateX(-375px);
  opacity: .55;
  box-shadow: 0 12px 36px rgba(0,0,0,.4);
}

.gallery-slide.next {
  width: 255px; height: 453px;
  z-index: 2;
  transform: translateX(375px);
  opacity: .55;
  box-shadow: 0 12px 36px rgba(0,0,0,.4);
}

.gallery-slide.far-prev {
  width: 185px; height: 329px;
  z-index: 1;
  transform: translateX(-640px);
  opacity: .18;
  box-shadow: none;
}

.gallery-slide.far-next {
  width: 185px; height: 329px;
  z-index: 1;
  transform: translateX(640px);
  opacity: .18;
  box-shadow: none;
}

.gallery-slide.hidden {
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transform: translateX(0) scale(.4);
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255,255,255,.1);
  border: 1.5px solid rgba(255,255,255,.18);
  border-radius: 50%;
  width: 48px; height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background .2s, border-color .2s;
  outline: none;
  padding: 0;
  font-family: inherit;
}

.gallery-arrow:hover {
  background: rgba(255,255,255,.22);
  border-color: rgba(255,255,255,.35);
}

.gallery-arrow.left { left: 0; }
.gallery-arrow.right { right: 0; }

.gallery-dots {
  display: flex;
  justify-content: center;
  gap: .65rem;
  margin-top: 2.2rem;
}

.gallery-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.22);
  cursor: pointer;
  transition: all .28s;
  border: none;
  padding: 0;
  outline: none;
}

.gallery-dot.on {
  background: var(--gold);
  transform: scale(1.45);
}

@media (max-width: 900px) {
  .gallery-slide.far-prev,
  .gallery-slide.far-next { opacity: 0; pointer-events: none; }
}

@media (max-width: 640px) {
  .gallery { padding: 3.5rem 1rem; }
  .gallery-track { height: 490px; }
  .gallery-slide.active { width: 245px; height: 435px; }
  .gallery-slide.prev { width: 175px; height: 311px; transform: translateX(-240px); opacity: .4; }
  .gallery-slide.next { width: 175px; height: 311px; transform: translateX(240px); opacity: .4; }
  .gallery-slide.far-prev, .gallery-slide.far-next { opacity: 0; pointer-events: none; }
  .gallery-arrow { width: 40px; height: 40px; font-size: 1.2rem; }
  .gallery-arrow.left { left: -2px; }
  .gallery-arrow.right { right: -2px; }
}
`;

const FEATURES = [
  {
    icon: "🥗",
    title: "Bowls armados por ti",
    desc: "Elige tu base, toppings y proteínas. Armamos cada bowl exactamente como lo quieres, sin compromisos.",
  },
  {
    icon: "🌿",
    title: "Ingredientes frescos",
    desc: "Todo se prepara al momento. Sin conservantes, sin congelados. Lo que comes hoy fue comprado hoy.",
  },
  {
    icon: "⚡",
    title: "Entrega en 30–45 min",
    desc: "Pedido confirmado, bowl en camino. Nuestro domiciliario sale en cuanto tu pedido esté listo.",
  },
  {
    icon: "💰",
    title: "Precio transparente",
    desc: "Ves el precio de todo antes de confirmar. Sin cobros sorpresa, sin tarifas ocultas.",
  },
  {
    icon: "🛵",
    title: "Pago contraentrega",
    desc: "Paga en efectivo cuando recibes tu pedido. Sin registros, sin tarjetas, sin complicaciones.",
  },
  {
    icon: "☕",
    title: "Cafetería incluida",
    desc: "Agrega emparedados, wraps o brownies a tu pedido. Ideal para acompañar tu bowl.",
  },
];

const MENU_ITEMS = [
  { label: "Arroz integral", gold: false },
  { label: "Papa criolla", gold: false },
  { label: "Quinoa", gold: false },
  { label: "Aguacate", gold: false },
  { label: "Guacamole", gold: false },
  { label: "Pollo", gold: true },
  { label: "Atún", gold: true },
  { label: "Lomo de res", gold: true },
  { label: "Champiñones", gold: false },
  { label: "Mango", gold: false },
  { label: "Piña asada", gold: false },
  { label: "Falafel", gold: true },
  { label: "Cherry", gold: false },
  { label: "Limonada", gold: false },
  { label: "Brownie", gold: true },
  { label: "Wrap integral", gold: false },
];

const GALLERY_IMGS = [img1, img2, img3, img4, img5];

export default function Index() {
  const navigate = useNavigate();
  const [cur, setCur] = useState(0);
  const n = GALLERY_IMGS.length;
  const [sug, setSug] = useState({ nombre: "", mensaje: "" });
  const [sugState, setSugState] = useState("idle"); // idle | loading | ok | error

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % n), 4000);
    return () => clearInterval(t);
  }, [cur, n]);

  const enviarSugerencia = async (e) => {
    e.preventDefault();
    if (!sug.mensaje.trim()) return;
    setSugState("loading");
    try {
      const res = await fetch("/api/sugerencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sug),
      });
      if (!res.ok) throw new Error();
      setSugState("ok");
      setSug({ nombre: "", mensaje: "" });
    } catch {
      setSugState("error");
    }
  };

  const getPos = (i) => {
    const diff = (i - cur + n) % n;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    if (diff === n - 1) return "prev";
    if (diff === 2) return "far-next";
    if (diff === n - 2) return "far-prev";
    return "hidden";
  };

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <img src={logo} alt="Pepas logo" className="nav-logo" />
          <div>
            <div className="nav-name">Pepas</div>
            <div className="nav-sub">Bowls frescos · Vida saludable</div>
          </div>
        </div>
        <button className="nav-btn" onClick={() => navigate("/menu")}>Pedir ahora →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-blur-1" />
        <div className="hero-blur-2" />

        <div className="hero-badge">
          <span></span> Comida saludable · Entrega a domicilio
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: ".4rem" }}>
          <img src={logo} alt="Pepas logo" style={{ width: "clamp(60px,10vw,100px)", height: "clamp(60px,10vw,100px)", borderRadius: "18px", objectFit: "contain" }} />
          <h1 className="hero-title" style={{ marginBottom: 0 }}>Pepas</h1>
        </div>
        <p className="hero-sub-title">
          Bowls frescos,<br /><span>armados por ti.</span>
        </p>
        <p className="hero-desc">
          Elige tu base, tus toppings favoritos y la proteína que prefieras.
          Lo preparamos al momento y lo llevamos a tu puerta.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/menu")}>
             Armar mi bowl
          </button>
          <button className="btn-secondary" onClick={() => { document.getElementById("features").scrollIntoView({ behavior: "smooth" }); }}>
            Ver más ↓
          </button>
        </div>

        <div className="hero-scroll">
          <span>↓</span>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <div className="gallery-inner">
          <p className="section-eyebrow">Galería</p>
          <h2 className="section-title">Así lucen nuestros productos</h2>
          <p className="section-sub">
            Frescos, coloridos y llenos de sabor. Cada bowl es único porque tú lo armas.
          </p>

          <div className="gallery-track">
            {GALLERY_IMGS.map((src, i) => (
              <div
                key={i}
                className={`gallery-slide ${getPos(i)}`}
                onClick={() => setCur(i)}
              >
                <img src={src} alt={`Bowl ${i + 1}`} draggable={false} />
              </div>
            ))}
            <button
              className="gallery-arrow left"
              onClick={() => setCur(c => (c - 1 + n) % n)}
              aria-label="Anterior"
            >&#8249;</button>
            <button
              className="gallery-arrow right"
              onClick={() => setCur(c => (c + 1) % n)}
              aria-label="Siguiente"
            >&#8250;</button>
          </div>

          <div className="gallery-dots">
            {GALLERY_IMGS.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot${cur === i ? " on" : ""}`}
                onClick={() => setCur(i)}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <p className="section-eyebrow">¿Por qué elegirnos?</p>
        <h2 className="section-title">Todo hecho para ti</h2>
        <p className="section-sub">
          Desde el primer clic hasta que recibes tu bowl, cada detalle está pensado para que disfrutes sin complicaciones.
        </p>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feat-card" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="preview">
        <div className="preview-inner">
          <p className="section-eyebrow">El menú</p>
          <h2 className="section-title">Cientos de combinaciones</h2>
          <p className="section-sub">
            Bases, toppings, proteínas, bebidas y más. Arma el bowl perfecto para hoy.
          </p>
          <div className="pills-wrap">
            {MENU_ITEMS.map((item) => (
              <div className={`menu-pill${item.gold ? " gold" : ""}`} key={item.label}>
                <span className="dot" />
                {item.label}
              </div>
            ))}
          </div>
          <div className="preview-cta">
            <button className="btn-primary" style={{ margin: "0 auto", background: "var(--gold)", color: "var(--g900)" }} onClick={() => navigate("/menu")}>
              Ver el menú completo →
            </button>
            <p>Sin registro · Sin app · Solo elige y pide</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <p className="section-eyebrow">¿Listo para pedir?</p>
        <h2 className="section-title">Tu bowl perfecto está a un clic</h2>
        <p className="section-sub">
          Pago contraentrega en efectivo. Sin cuentas, sin complicaciones.
          Solo arma tu pedido y espera en casa.
        </p>
        <button className="btn-primary" style={{ margin: "0 auto" }} onClick={() => navigate("/menu")}>
           Pedir ahora
        </button>
      </section>

      {/* SUGERENCIAS */}
      <section className="sugerencias">
        <div className="sugerencias-inner">
          <p className="section-eyebrow">¿Tienes algo que decirnos?</p>
          <h2 className="section-title">Déjanos tu sugerencia</h2>
          <p className="section-sub">
            Tu opinión nos ayuda a mejorar. Cuéntanos qué te gustó, qué cambiarías o qué quieres ver en el menú.
          </p>

          {sugState === "ok" ? (
            <div className="sug-ok">
              <span>✓</span> ¡Gracias! Tu sugerencia fue enviada.
            </div>
          ) : (
            <form className="sug-form" onSubmit={enviarSugerencia}>
              <div className="sug-field">
                <label className="sug-label" htmlFor="sug-nombre">Tu nombre (opcional)</label>
                <input
                  id="sug-nombre"
                  className="sug-input"
                  type="text"
                  placeholder="Ej: María García"
                  maxLength={100}
                  value={sug.nombre}
                  onChange={e => setSug(s => ({ ...s, nombre: e.target.value }))}
                />
              </div>
              <div className="sug-field">
                <label className="sug-label" htmlFor="sug-mensaje">Tu sugerencia *</label>
                <textarea
                  id="sug-mensaje"
                  className="sug-textarea"
                  placeholder="Escribe aquí tu idea, comentario o sugerencia..."
                  maxLength={1000}
                  required
                  value={sug.mensaje}
                  onChange={e => setSug(s => ({ ...s, mensaje: e.target.value }))}
                />
              </div>
              <div className="sug-footer">
                <span className="sug-hint">{sug.mensaje.length}/1000 caracteres</span>
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={sugState === "loading"}
                  style={{ opacity: sugState === "loading" ? .6 : 1 }}
                >
                  {sugState === "loading" ? "Enviando…" : "Enviar sugerencia →"}
                </button>
              </div>
              {sugState === "error" && (
                <p style={{ color: "#c0392b", fontSize: ".82rem", marginTop: "-.3rem" }}>
                  Ocurrió un error. Por favor intenta de nuevo.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          Pepas 
          <small>Bowls frescos · Vida saludable</small>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Pepas & Granos. Todos los derechos reservados.</span>
      </footer>
    </>
  );
}
