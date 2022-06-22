ALTER TABLE inv_compra drop iehd  DECIMAL(20, 4) DEFAULT 0.00; 
ALTER TABLE inv_compra drop ipj  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra drop tasas  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra drop otros_ns_cf  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_compra drop grav_tasa_cero  DECIMAL(20, 4) DEFAULT 0.00;

ALTER TABLE inv_detalle_compra drop iehd  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra drop ipj  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra drop tasas  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra drop otros_ns_cf  DECIMAL(20, 4) DEFAULT 0.00;
ALTER TABLE inv_detalle_compra drop grav_tasa_cero  DECIMAL(20, 4) DEFAULT 0.00;