alter table agil_mantenimiento_orden_trabajo add tipo_pago int(11);
alter table agil_mantenimiento_orden_trabajo add dias_credito int(11);
alter table agil_mantenimiento_orden_trabajo add a_cuenta decimal(20, 4) default 0;
alter table agil_mantenimiento_orden_trabajo add saldo decimal(20, 4) default 0;
ALTER TABLE agil_mantenimiento_orden_trabajo ADD CONSTRAINT agil_mantenimiento_orden_trabajo_ibfk_8 FOREIGN KEY (tipo_pago) REFERENCES gl_clase(id);