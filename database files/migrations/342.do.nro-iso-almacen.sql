ALTER TABLE agil_almacen ADD numero_correlativo_iso_orden_servicio int(11) default 1;
-- INSERT INTO gl_tipo (nombre,nombre_corto,empresa, usar_herencia,createdAt,updatedAt) 
-- 	VALUES ('ORDEN DE SERVICIO','CON_ORD_SER',35, 1,'2021-03-05 00:00:00','2021-03-05 00:00:01'); 

-- INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
-- 	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'SERVICIO','ORDSER_SER',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'ALQUILER','ORDSER_ALQ',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'OTROS','ORDSER_OTR',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00');

-- INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt, padre) 
-- 	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'VEHÍCULOS','SER_VHC',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_SER')),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'EQUIPOS','SER_EQP',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_SER')),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'MATERIALES','SER_MTL',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_SER')),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'UNIFORMES','SER_UNF',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_SER')),

-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'VEHÍCULOS','ALQ_VHC',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_ALQ')),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'EQUIPOS','ALQ_EQP',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_ALQ')),
-- 			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'MATERIALES','ALQ_MTL',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_ALQ')),
			
--             ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'MATERIAL DE ESCRITORIO','OTR_MAT',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_OTR')),
--             ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'VEHÍCULOS','OTR_VHC',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_OTR')),
--             ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'EQUIPOS','OTR_EQP',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_OTR')),
--             ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'MATERIALES','OTR_MTL',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_OTR')),
--             ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'CON_ORD_SER'),'UNIFORMES','OTR_UNF',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00', (SELECT cl.id FROM gl_clase AS cl WHERE cl.nombre_corto = 'ORDSER_OTR'));