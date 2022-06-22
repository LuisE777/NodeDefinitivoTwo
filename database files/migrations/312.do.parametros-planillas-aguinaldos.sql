ALTER TABLE agil_rrhh_parametros ADD factor_calculo_dias int(11) DEFAULT 365;
ALTER TABLE agil_rrhh_parametros ADD resolucion_ministerio varchar(255);
ALTER TABLE agil_rrhh_parametros ADD dias_min_trabajos decimal(20,4) DEFAULT 60;
ALTER TABLE agil_rrhh_parametros ADD id_metodo_dias int(11) DEFAULT NULL;
ALTER TABLE agil_rrhh_parametros ADD CONSTRAINT agil_rrhh_parametros_ibfk_2 FOREIGN KEY (id_metodo_dias) REFERENCES gl_clase(id);

INSERT INTO gl_tipo (nombre,nombre_corto,empresa,createdAt,updatedAt) 
	VALUES ('TIPO METODO DIAS','TIPO_METODO_DIAS',null,'2019-04-25 00:00:00','2019-04-25 00:00:00'); 

INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) 
	VALUES ((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPO_METODO_DIAS'),'Días Calendario','dias_calendario',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00'),
			((SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPO_METODO_DIAS'),'Días Comerciales','dias_comerciales',1,0,'2019-04-25 00:00:00','2019-04-25 00:00:00');