alter table inv_detalle_venta add cambio_item tinyint default 0;

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('TIPO REPOSICION ITEM','TIPO_REP_ITEM',null,'2019-04-25 00:00:00','2019-04-25 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPO_REP_ITEM'),'FABRICANTE','FABRICANTE',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPO_REP_ITEM'),'CAMBIO_ITEM','CAMBIO_ITEM',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPO_REP_ITEM'),'EFECTIVO','EFECTIVO',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00');