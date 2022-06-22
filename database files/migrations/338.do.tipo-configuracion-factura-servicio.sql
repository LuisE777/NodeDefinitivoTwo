INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CONF_FORM'),'SIN CANTIDAD','SIN_CANTIDAD',1,0,'2021-02-25 00:00:00','2021-02-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CONF_FORM'),'CON CANTIDAD','CON_CANTIDAD',1,0,'2021-02-25 00:00:00','2021-02-25 00:00:00');
ALTER TABLE agil_configuracion_general_factura ADD tipo_configuracion_nota_servicio INT(11);
ALTER TABLE agil_configuracion_factura ADD tipo_configuracion_nota_servicio INT(11);