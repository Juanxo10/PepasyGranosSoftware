-- =====================================
-- SEED: Configuración
-- =====================================
INSERT INTO configuracion (clave, valor) VALUES ('domicilio', 6000)
ON CONFLICT (clave) DO NOTHING;

-- =====================================
-- SEED: Productos
-- =====================================

-- Bases (precio incluido en BOWL_BASE, se pone 12000)
INSERT INTO productos (nombre, tipo, precio) VALUES
  ('Arroz integral', 'base', 12000),
  ('Papa criolla',   'base', 12000),
  ('Quinoa',         'base', 12000);

-- Toppings (los primeros 4 son gratis, desde el 5to +2000 c/u — precio 0; lógica en backend)
INSERT INTO productos (nombre, tipo, precio) VALUES
  ('Aguacate',       'topping', 0),
  ('Champiñones',    'topping', 0),
  ('Cherry',         'topping', 0),
  ('Maíz',           'topping', 0),
  ('Zanahoria',      'topping', 0),
  ('Pepino',         'topping', 0),
  ('Guacamole',      'topping', 0),
  ('Repollo morado', 'topping', 0),
  ('Piña asada',     'topping', 0),
  ('Mango',          'topping', 0),
  ('Pico de gallo',  'topping', 0),
  ('Tomate cherry',  'topping', 0),
  ('Nueces',         'topping', 0),
  ('Nachos',         'topping', 0),
  ('Brócoli',        'topping', 0),
  ('Queso',          'topping', 0);

-- Proteínas
INSERT INTO productos (nombre, tipo, precio) VALUES
  ('Pollo',        'proteina', 8500),
  ('Atún',         'proteina', 8500),
  ('Carne molida', 'proteina', 6500),
  ('Falafel',      'proteina', 5000),
  ('Huevo',        'proteina', 4000),
  ('Lomo de res',  'proteina', 8500),
  ('Cerdo',        'proteina', 8500);

-- Bebidas
INSERT INTO productos (nombre, tipo, precio) VALUES
  ('Limonada',      'bebida', 0),
  ('Agua y limón',  'bebida', 0);

-- Incluidos (siempre gratis)
INSERT INTO productos (nombre, tipo, precio) VALUES
  ('Lechuga',   'incluido', 0),
  ('Vinagreta', 'incluido', 0);

-- Extras / Productos adicionales
INSERT INTO productos (nombre, tipo, precio) VALUES
  -- Brunch
  ('Pizzeta pesto',      'extra', 31000),
  ('Pizzeta carne',      'extra', 31000),
  ('Picada especial',    'extra', 52200),
  ('Sopa de tomate',     'extra', 24000),
  -- Emparedados
  ('Emparedado de lomo',   'extra', 25000),
  ('Choripan',             'extra', 20500),
  ('Emparedado integral',  'extra', 26500),
  ('Emparedado de cerdo',  'extra', 24000),
  ('Emparedado de huevo',  'extra', 21000),
  ('Emparedado de salami', 'extra', 21000),
  -- Desayunos
  ('Criollito',          'extra', 22800),
  ('Hayaca',             'extra', 17500),
  ('Wraps de espinaca',  'extra', 17300),
  ('Wraps de cerdo',     'extra', 27500),
  ('Desayuno Llanero',   'extra', 14800),
  -- Omelet
  ('Omelet Opción 1',   'extra', 18800),
  ('Omelet Opción 2',   'extra', 18800),
  ('Omelet Opción 3',   'extra', 18800),
  -- Montaditos
  ('Montadito de huevo',      'extra', 12500),
  ('Montadito napolitano',    'extra', 17200),
  ('Montadito de carne',      'extra', 15000),
  -- Bowls y Fruta
  ('Bowl de yogurt',          'extra', 23000),
  ('Mini bowl de yogurt',     'extra', 16500),
  ('Bowl de avena',           'extra', 16000),
  ('Bowl de açaí',            'extra', 23000),
  ('Cuchareable de açaí',     'extra', 16000),
  ('Fruta fresca',            'extra', 14200),
  -- Bebidas
  ('Soda Hatsu',            'extra', 8000),
  ('Colombiano',            'extra', 4900),
  ('Capuchino',             'extra', 7200),
  -- Combos
  ('Hayaca + Chocolate',   'extra', 24000),
  ('Hayaca + Capuchino',   'extra', 24000),
  ('Hayaca + Aguapanela',  'extra', 24000),
  ('Hayaca + Colombiano',  'extra', 24000),
  ('Combo chocolate',                       'extra', 14800),
  ('Combo aguapanela',                      'extra', 12500),
  ('Croissant jamón y queso + capuchino',   'extra', 17500),
  ('Croissant arequipe + capuchino',        'extra', 15000);
