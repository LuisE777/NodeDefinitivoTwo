module.exports = function (sequelize, Sequelize) {
	var  UsuarioAplicacionOpcion= sequelize.define('sys_usuario_aplicacion_opcion', {
		id_usuario_aplicacion: {
			type: Sequelize.INTEGER,
			field: 'usuario_aplicacion'
        },
        id_opcion_aplicacion:{
            type: Sequelize.INTEGER,
			field: 'opcion_aplicacion'
        },
		puede_ver: {
			type: Sequelize.BOOLEAN,
			field: 'puede_ver'
		},
		puede_crear: {
			type: Sequelize.BOOLEAN,
			field: 'puede_crear'
		},
		puede_modificar: {
			type: Sequelize.BOOLEAN,
			field: 'puede_modificar'
		},
		puede_eliminar: {
			type: Sequelize.BOOLEAN,
			field: 'puede_eliminar'
		}
	}, {
			freezeTableName: true
		});

		UsuarioAplicacionOpcion.sync().then(function () {
	});

	return UsuarioAplicacionOpcion;
}