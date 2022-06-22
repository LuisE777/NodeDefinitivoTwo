ALTER TABLE inv_venta ADD numero_tarjeta_credito int(11);
ALTER TABLE inv_venta ADD monto_tarjeta_credito decimal(20,4);
ALTER TABLE inv_liquidacion_ventas_mesa ADD pago_efectivo decimal(20,4);