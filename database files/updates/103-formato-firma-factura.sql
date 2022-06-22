


update agil_configuracion_factura set formato_con_firma_factura = (select id from gl_clase where nombre_corto = 'FORM_S_FIRMA'); 

update agil_configuracion_general_factura set formato_con_factura = (select id from gl_clase where nombre_corto = 'FORM_S_FIRMA'); 