ALTER TABLE inv_compra ADD iehd  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra ADD ipj  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra ADD tasas  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra ADD otros_ns_cf  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra ADD grav_tasa_cero  DECIMAL(20, 4) DEFAULT 0.00;

ALTER TABLE inv_detalle_compra ADD iehd  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra ADD ipj  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra ADD tasas  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra ADD otros_ns_cf  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra ADD grav_tasa_cero  DECIMAL(20, 4) DEFAULT 0.00;