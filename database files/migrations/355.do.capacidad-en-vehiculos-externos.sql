ALTER TABLE agil_vehiculos_externos ADD capacidad DECIMAL(20,4) DEFAULT NULL;

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('LICENCIA DE CONDUCIR','LICOND',null,'2021-06-08 00:00:00','2021-06-08 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'LICOND'),'A','CAT-A',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'LICOND'),'B','CAT-B',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'LICOND'),'C','CAT-C',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'LICOND'),'M','CAT-M',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'LICOND'),'P','CAT-P',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00');

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('ESTADOS RECIBO TRANSPORTE','ESRETRA',null,'2021-06-08 00:00:00','2021-06-06 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESRETRA'),'ABIERTO','ABIERTO',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESRETRA'),'CERRADO','CERRADO',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESRETRA'),'ANULADO','ANULADO',1,0,'2021-06-08 00:00:00','2021-06-08 00:00:00');

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('BANCOS SISTEMA FINANCIEROS','BASIFI',null,'2021-06-10 00:00:00','2021-06-10 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco BISA S.A.','BIS',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco de Crédito de Bolivia S.A.','BCR',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco de la Nación Argentina S. A.','BNA',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Económico S.A.','BEC',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Fassil S.A.','BFS',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Fortaleza S.A.','BFO',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Ganadero S.A.','BGA',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Mercantil Santa Cruz S.A.','BME',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Nacional de Bolivia S.A.','BNB',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Prodem S.A.','BPR',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Solidario S.A.','BSO',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco Unión S.A.','BUN',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'BASIFI'),'Banco PYME de la Comunidad S.A.','PCO',1,0,'2021-06-10 00:00:00','2021-06-10 00:00:00');
