alter table agil_comensales_historial_comida_cliente_empresa add constraint fecha_comensal unique (fecha, comensal);
alter table agil_comensales_historial_comida_cliente_empresa drop index fecha;