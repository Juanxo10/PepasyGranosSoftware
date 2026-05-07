require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./utils/logger");

const { warmup } = require("./services/pedidoService");
const pedidosRoutes = require("./routes/pedidos");
const authRoutes = require("./routes/auth");
const staffRoutes = require("./routes/staff");
const sugerenciasRoutes = require("./routes/sugerencias");
const tiendaRoutes = require("./routes/tienda");
const wompiRoutes = require("./routes/wompi");

const app = express();

// ─── Seguridad HTTP ──────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

// ─── Wompi webhook necesita raw body → lo maneja internamente con express.raw() ──
// Registrar DESPUÉS de express.json() para que integrity-hash reciba el body
app.use(express.json({ limit: "1mb" }));

// ─── Trust proxy (necesario para rate-limit detrás de reverse proxy / HTTPS) ─
app.set("trust proxy", 1);

// ─── Rutas ───────────────────────────────────────────────────────────────────
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/sugerencias", sugerenciasRoutes);
app.use("/api/tienda", tiendaRoutes);
app.use("/api/wompi", wompiRoutes);

// ─── Manejo de errores global ────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  logger.error({ err, method: req.method, url: req.originalUrl }, "Error no controlado");
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  warmup(); // establece la conexión al DB al arrancar
});
