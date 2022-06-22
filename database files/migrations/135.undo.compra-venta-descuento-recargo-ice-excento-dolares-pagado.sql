ALTER TABLE inv_venta drop descuento_general_dolares;
ALTER TABLE inv_venta drop descuento_dolares;
ALTER TABLE inv_venta drop total_recargo_dolares;
ALTER TABLE inv_venta drop total_ice_dolares;
ALTER TABLE inv_venta drop total_excento_dolares;
ALTER TABLE inv_venta drop pagado_dolares;
ALTER TABLE inv_venta drop saldo_dolares;
ALTER TABLE inv_venta drop cambio_dolares;
ALTER TABLE inv_venta Drop a_cuenta_dolares;

ALTER TABLE inv_compra drop recargo_dolares;
ALTER TABLE inv_compra drop ice_dolares;
ALTER TABLE inv_compra drop descuento_dolares;
ALTER TABLE inv_compra drop excento_dolares;
ALTER TABLE inv_compra drop a_cuenta_dolares;
ALTER TABLE inv_compra drop saldo_dolares;

ALTER TABLE agil_producto_tipo_precio drop precio_unitario_dolares;
ALTER TABLE agil_producto_tipo_precio drop rango_negativo_dolares;
ALTER TABLE agil_producto_tipo_precio drop rango_positivo_dolares;
