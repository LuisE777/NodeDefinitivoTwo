ALTER TABLE inv_venta ADD descuento_general_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD total_recargo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD total_ice_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD total_excento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD pagado_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD saldo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD cambio_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD a_cuenta_dolares decimal(20, 4) default 0;
ALTER TABLE inv_venta ADD descuento_general decimal(20, 4) default 0;

ALTER TABLE inv_compra ADD recargo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_compra ADD ice_dolares decimal(20, 4) default 0;
ALTER TABLE inv_compra ADD descuento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_compra ADD excento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_compra ADD a_cuenta_dolares decimal(20, 4) default 0;
ALTER TABLE inv_compra ADD saldo_dolares decimal(20, 4) default 0;

ALTER TABLE agil_producto_tipo_precio ADD precio_unitario_dolares decimal(20,4) default 0;
ALTER TABLE agil_producto_tipo_precio ADD rango_negativo_dolares decimal(20,4) default 0;
ALTER TABLE agil_producto_tipo_precio ADD rango_positivo_dolares decimal(20,4) default 0;
