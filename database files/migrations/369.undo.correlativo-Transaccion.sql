ALTER TABLE agil_correlativo_empresa  drop numero_correlativo_transaccion_cobro;
ALTER TABLE agil_correlativo_empresa  drop numero_correlativo_transaccion_pago;
ALTER TABLE agil_cuenta_transaccion  drop correlativo;
ALTER TABLE inv_pago_compra DROP FOREIGN KEY fk_transaccion_pagocompra_id;
ALTER TABLE inv_pago_compra  drop id_transaccion;