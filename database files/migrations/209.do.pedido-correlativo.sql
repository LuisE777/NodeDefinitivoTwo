alter table agil_pedidos add estado int(11);
alter table agil_pedidos add numero_correlativo int(11);
alter table agil_detalles_pedidos add cantidad_recibida  decimal(20,4);
alter table agil_sucursal add numero_correlativo_modulo_pedido int(11);