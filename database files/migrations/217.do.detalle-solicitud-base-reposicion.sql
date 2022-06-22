alter table inv_detalle_solicitud_producto_base add detalle_orden_reposicion int(11);
alter table sys_usuario add encargado_sincronizacion_gestion TINYINT(1) default 0;