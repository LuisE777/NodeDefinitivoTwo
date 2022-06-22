INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('TANQUE_GASOLINA','TAGA',null,'2019-04-25 00:00:00','2019-04-25 00:00:00'); 


INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TAGA'),'1/4','1/4',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TAGA'),'1/2','1/2',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TAGA'),'3/4','3/4',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TAGA'),'FULL','F',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00');