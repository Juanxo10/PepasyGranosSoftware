-- Ley 1581 de 2012 / Decreto 1377 de 2013: prueba de la autorización (idempotente)
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS acepto_terminos_en TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS consentimientos (
  id            SERIAL PRIMARY KEY,
  tipo          VARCHAR(20) NOT NULL CHECK (tipo IN ('terminos', 'datos')),
  version       VARCHAR(20) NOT NULL,
  pedido_id     INTEGER,
  sugerencia_id INTEGER,
  ip            VARCHAR(64),
  user_agent    VARCHAR(300),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_consentimientos_pedido     ON consentimientos (pedido_id);
CREATE INDEX IF NOT EXISTS idx_consentimientos_sugerencia ON consentimientos (sugerencia_id);

-- Supabase: sin policies, la API pública no puede leer esta tabla (el backend conecta como postgres y no se ve afectado)
ALTER TABLE public.consentimientos ENABLE ROW LEVEL SECURITY;
