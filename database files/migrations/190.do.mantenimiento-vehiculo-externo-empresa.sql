alter table agil_vehiculos_externos
  add empresa int(11);
  alter table agil_mantenimiento_orden_trabajo
  add mantenimiento_externo tinyint(1) default 0;
    alter table agil_sucursal
  add numero_correlativo_ot_mecanica int(11);
   alter table agil_sucursal
  add numero_correlativo_ot_chaperia int(11);
   alter table agil_mantenimiento_orden_trabajo
  add estado int(11);
     alter table agil_mantenimiento_orden_trabajo_servicio_externo
  add autorizacion bigint(20);
     alter table agil_mantenimiento_orden_trabajo_servicio_externo
  add codigo_control varchar(255);
