INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('MANTENIMIENTO','MTM',null,'2019-03-19 00:00:00','2019-03-19 00:00:00'); 


INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'MTM'),'CORRECTIVO','CORRE',1,0,'2019-03-19 00:00:00','2019-03-19 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'MTM'),'PREVENTIVO','PREV',1,0,'2019-03-19 00:00:00','2019-03-19 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'MTM'),'RRUTINA','RRUT',1,0,'2019-03-19 00:00:00','2019-03-19 00:00:00');