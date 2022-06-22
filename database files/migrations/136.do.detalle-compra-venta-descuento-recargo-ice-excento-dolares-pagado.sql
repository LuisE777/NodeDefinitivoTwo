ALTER TABLE inv_detalle_venta add descuento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_venta ADD recargo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_venta ADD ice_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_venta ADD excento_dolares decimal(20, 4) default 0;

ALTER TABLE inv_detalle_movimiento add descuento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_movimiento ADD recargo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_movimiento ADD ice_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_movimiento ADD excento_dolares decimal(20, 4) default 0;

ALTER TABLE inv_detalle_compra add descuento_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_compra ADD recargo_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_compra ADD ice_dolares decimal(20, 4) default 0;
ALTER TABLE inv_detalle_compra ADD excento_dolares decimal(20, 4) default 0;