alter table agil_producto
  add cantidad_prestacion_compra decimal(20, 4);
  alter table agil_empresa
  add usar_prestacion_compra tinyint(1) default 0;
   alter table agil_gestion_detalle_orden_reposicion
  add cantidad_sugerida  decimal(20, 4);
  
  