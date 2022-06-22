ALTER TABLE inv_compra  add estado_programacion_pago  TINYINT(1) DEFAULT false;

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('ESTADO PROGRAMACIÓN PAGO','EPGP',null,'2021-07-08 00:00:00','2021-07-08 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'EPGP'),'APROBADO','APRO',1,0,'2021-07-08 00:00:00','2021-07-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'EPGP'),'RECHAZADO','RECH',1,0,'2021-07-08 00:00:00','2021-07-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'EPGP'),'PENDIENTE','PEND',1,0,'2021-07-08 00:00:00','2021-07-08 00:00:00');
			