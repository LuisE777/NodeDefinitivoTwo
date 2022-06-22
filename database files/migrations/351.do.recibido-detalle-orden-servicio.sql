ALTER TABLE detalle_orden_servicio ADD recibido TINYINT(1) DEFAULT false;
alter table sys_usuario add encargado_integracion_contable_gestion TINYINT(1) DEFAULT false;
alter table agil_almacen add cuenta int(11);
alter table agil_contabilidad_cuenta add grupo int(11);