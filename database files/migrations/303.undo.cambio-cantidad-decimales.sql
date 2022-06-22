ALTER TABLE agil_detalles_pedidos CHANGE costo_unitario costo_unitario DECIMAL(20,4);
ALTER TABLE inv_detalle_compra CHANGE costo_unitario costo_unitario DECIMAL(20,4);
ALTER TABLE inv_detalle_compra CHANGE costo_unitario_dolares costo_unitario_dolares DECIMAL(20,4);
ALTER TABLE inv_detalle_movimiento CHANGE costo_unitario costo_unitario DECIMAL(20,4);
ALTER TABLE inv_detalle_movimiento CHANGE costo_unitario_dolares costo_unitario_dolares DECIMAL(20,4);
ALTER TABLE inv_inventario CHANGE costo_unitario costo_unitario DECIMAL(20,4);
ALTER TABLE inv_inventario CHANGE costo_unitario_dolares costo_unitario_dolares DECIMAL(20,4);