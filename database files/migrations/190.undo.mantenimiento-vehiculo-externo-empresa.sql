alter table agil_vehiculos_externos
  drop empresa;
  alter table agil_mantenimiento_orden_trabajo
  drop mantenimiento_externo;
    alter table agil_sucursal
  drop numero_correlativo_ot_mecanica;
   alter table agil_sucursal
  drop numero_correlativo_ot_chaperia;
   alter table agil_mantenimiento_orden_trabajo
  drop estado;
     alter table agil_mantenimiento_orden_trabajo_servicio_externo
  drop autorizacion;
     alter table agil_mantenimiento_orden_trabajo_servicio_externo
  drop codigo_control;
