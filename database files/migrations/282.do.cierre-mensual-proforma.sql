ALTER TABLE sys_usuario ADD activar_cierre_mensual_proforma tinyint default 0;
ALTER TABLE agil_proforma_factura_anulada ADD asiento_contabilidad int(11);
ALTER TABLE agil_configuracion_cuenta ADD concepto int(11);
ALTER TABLE agil_configuracion_cuenta ADD configuracion int(11);
ALTER TABLE agil_configuracion_cuenta CHANGE valor valor DECIMAL(20,4);
ALTER TABLE agil_proforma ADD contabilizado tinyint default 0;
UPDATE agil_proforma_factura_anulada set cliente=null;
delete from agil_configuracion_cuenta;
ALTER TABLE agil_proforma_factura_anulada CHANGE cliente cliente int(11);