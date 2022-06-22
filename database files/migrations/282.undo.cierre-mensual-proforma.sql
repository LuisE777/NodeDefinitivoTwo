ALTER TABLE sys_usuario drop activar_cierre_mensual_proforma;
ALTER TABLE agil_proforma_factura_anulada drop asiento_contabilidad;
ALTER TABLE agil_configuracion_cuenta drop concepto;
ALTER TABLE agil_configuracion_cuenta drop configuracion;
ALTER TABLE agil_configuracion_cuenta CHANGE valor valor varchar(255);
ALTER TABLE agil_proforma drop contabilizado;
ALTER TABLE agil_proforma_factura_anulada CHANGE cliente cliente varchar(255);