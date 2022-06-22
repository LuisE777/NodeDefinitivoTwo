ALTER TABLE agil_almacen ADD numero_correlativo_iso_orden_compra int(11) default 1;
ALTER TABLE agil_pedidos ADD numero_iso_orden_compra int(11) default 0;