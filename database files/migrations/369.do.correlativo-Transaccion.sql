ALTER TABLE agil_correlativo_empresa  add numero_correlativo_transaccion_cobro  INT(11) DEFAULT 0;
ALTER TABLE agil_correlativo_empresa  add numero_correlativo_transaccion_pago INT(11) DEFAULT 0;
ALTER TABLE agil_cuenta_transaccion  add correlativo  INT(11) DEFAULT 0;
ALTER TABLE inv_pago_compra  add id_transaccion  INT(11) DEFAULT null;
ALTER TABLE inv_pago_compra ADD CONSTRAINT fk_transaccion_pagocompra_id FOREIGN KEY (id_transaccion) REFERENCES agil_cuenta_transaccion(id);
