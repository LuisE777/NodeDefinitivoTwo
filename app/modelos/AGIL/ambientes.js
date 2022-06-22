module.exports=function(sequelize,Sequelize){
	var Ambientes = sequelize.define('ambientes', {
        id_tipo: {
            type: Sequelize.INTEGER,
            field: 'id_tipo'
        },
        numero: {
            type: Sequelize.INTEGER,
            field: 'numero'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'id_estado'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'id_sucursal'
        },
        id_unidad_medida: {
            type: Sequelize.INTEGER,
            field: 'id_unidad_medida',
            defaultValue: null
        },
        tiempo: {
            type: Sequelize.INTEGER,
            field: 'tiempo',
            defaultValue: null
        },
        habilitado: {
            type: Sequelize.BOOLEAN,
            field: 'habilitado',
            defaultValue: true 
        },
        eliminado: {
          type: Sequelize.BOOLEAN,
          field: 'eliminado',
          defaultValue: false 
        }
    }, {
    freezeTableName: true 
	});
	
	Ambientes.sync().then(function(){
        // creando el tipo para estado ambiente
		sequelize.query("INSERT INTO gl_tipo ( nombre, nombre_corto, empresa, createdAt, updatedAt ) SELECT * FROM\
            ( SELECT 'ESTADO AMBIENTE' AS nombre, 'ESTAMB' AS nombre_corto, NULL AS empresa, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_tipo WHERE nombre_corto = 'ESTAMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        // creando las clases para estado ambiente
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESTAMB') AS tipo, 'OCUPADO' AS nombre, 'OCUPADO_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'OCUPADO_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESTAMB') AS tipo, 'RESERVADO' AS nombre, 'RESERVADO_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'RESERVADO_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'ESTAMB') AS tipo, 'LIBRE' AS nombre, 'LIBRE_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'LIBRE_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        // creando el tipo para tipo de ambiente
        // sequelize.query("INSERT INTO gl_tipo ( nombre, nombre_corto, empresa, createdAt, updatedAt ) SELECT * FROM\
        //     ( SELECT 'TIPO AMBIENTE' AS nombre, 'TIPAMB' AS nombre_corto, NULL AS empresa, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
        //     NOT EXISTS ( SELECT nombre_corto FROM gl_tipo WHERE nombre_corto = 'TIPAMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		// });
        // // creando las clases para tipo ambiente
        // sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
        //     ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPAMB') AS tipo, 'SAUNA' AS nombre, 'SAUNA_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
        //     NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'SAUNA_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		// });
        // sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
        //     ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPAMB') AS tipo, 'PISCINA' AS nombre, 'PISCINA_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
        //     NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'PISCINA_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		// });
        // sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
        //     ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPAMB') AS tipo, 'DUCHA' AS nombre, 'DUCHA_AMB' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
        //     NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'DUCHA_AMB' ) LIMIT 1;").spread(function(results, metadata) {
			
		// });

        // creando el tipo para unidad de medida
        sequelize.query("INSERT INTO gl_tipo ( nombre, nombre_corto, empresa, createdAt, updatedAt ) SELECT * FROM\
            ( SELECT 'TIPO UNIDAD MEDIDA' AS nombre, 'TIPUNIDMED' AS nombre_corto, NULL AS empresa, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_tipo WHERE nombre_corto = 'TIPUNIDMED' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        // creando las clases para tipo unidad medida
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPUNIDMED') AS tipo, 'HORA(S)' AS nombre, 'HORA_UNIDMED' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'HORA_UNIDMED' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPUNIDMED') AS tipo, 'MINUTO (S)' AS nombre, 'MINUTO_UNIDMED' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'MINUTO_UNIDMED' ) LIMIT 1;").spread(function(results, metadata) {
			
		});
        sequelize.query("INSERT INTO gl_clase (tipo,nombre,nombre_corto,habilitado,eliminado,createdAt,updatedAt) SELECT * FROM \
            ( SELECT (SELECT gl_tipo.id FROM gl_tipo WHERE gl_tipo.nombre_corto = 'TIPUNIDMED') AS tipo, 'SIN TIEMPO' AS nombre, 'SINTIEMPO_UNIDMED' AS nombre_corto, 1 AS habilitado, 0 AS eliminado, '2021-07-08 00:00:00' AS createdAt, '2021-07-08 00:00:00' AS updatedAt ) AS temp WHERE\
            NOT EXISTS ( SELECT nombre_corto FROM gl_clase WHERE nombre_corto = 'SINTIEMPO_UNIDMED' ) LIMIT 1;").spread(function(results, metadata) {
			
		});

	});
	
	return Ambientes;
}