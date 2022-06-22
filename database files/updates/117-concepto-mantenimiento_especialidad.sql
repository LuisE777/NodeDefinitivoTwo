INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('TRABAJO_ESPECIALIDAD_MANO_OBRA','TEM',null,'2019-04-25 00:00:00','2019-04-25 00:00:00'); 


INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TEM'),'OTROS','OTROS',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00');