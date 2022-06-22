
INSERT INTO gl_tipo (nombre,nombre_corto,createdAt,updatedAt)
  values("FORMATO_FIRMA","F_FIRMA",'2018-11-19 09:17:42','2018-11-19 09:17:42');
	
	INSERT INTO gl_clase(tipo,nombre,nombre_corto,createdAt,updatedAt,habilitado,eliminado)
	values((select id from gl_tipo where nombre = 'FORMATO_FIRMA'),"FORMATO CON FIRMA","FORM_C_FIRMA",
						'2018-11-19 09:17:42','2018-11-19 09:17:42',true,false);

INSERT INTO gl_clase(tipo,nombre,nombre_corto,createdAt,updatedAt,habilitado,eliminado)
	values((select id from gl_tipo where nombre = 'FORMATO_FIRMA'),"FORMATO SIN FIRMA","FORM_S_FIRMA",
						'2018-11-19 09:17:42','2018-11-19 09:17:42',true,false);


update agil_configuracion_general_factura set formato_con_firma_nota_venta = (select id from gl_clase where nombre_corto = 'FORM_S_FIRMA'); 