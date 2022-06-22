ALTER TABLE agil_configuracion_contable_comprobante ADD tipo_comprobante int(11);
ALTER TABLE agil_configuracion_contable_comprobante ADD glosa_debe longtext;
ALTER TABLE agil_configuracion_contable_comprobante ADD glosa_haber longtext;
ALTER TABLE agil_sucursal_actividad_dosificacion ADD cuenta int(11);
ALTER TABLE agil_proforma add asiento_contabilidad int(11);