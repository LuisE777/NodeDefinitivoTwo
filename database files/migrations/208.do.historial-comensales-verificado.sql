alter table agil_comensales_historial_comida_cliente_empresa add verificado tinyint(1) default null;
alter table agil_comensales_historial_comida_cliente_empresa add fecha_verificado Date;
alter table agil_comensales_historial_comida_cliente_empresa add verificado_por int(11) default null;
alter table agil_comensales_historial_comida_cliente_empresa add descartado tinyint(1) default 0;