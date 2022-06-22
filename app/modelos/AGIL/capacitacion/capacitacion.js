module.exports = function (sequelize, Sequelize) {
	var Capacitacion = sequelize.define('agil_capacitacion', {	
        id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		curso: {
			type: Sequelize.STRING,
			field: 'curso'
		},
		duracion: {
			type: Sequelize.STRING,
			field: 'duracion'
		},
        fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
        fecha_inicio: {
			type: Sequelize.DATE,
			field: 'fecha_inicio'
		},
        fecha_fin: {
			type: Sequelize.DATE,
			field: 'fecha_fin'
		},
        descripcion: {
			type: Sequelize.TEXT("long"),
			field: 'descripcion'
		},
        id_tipo_curso: {
			type: Sequelize.INTEGER,
			field: 'tipo_curso'
		},
        id_ponderacion: {
			type: Sequelize.INTEGER,
			field: 'ponderacion'
		},
        id_certificado: {
			type: Sequelize.INTEGER,
			field: 'certificado'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		
	}, {
		freezeTableName: true
	});

	Capacitacion.sync().then(function () {

	});

	return Capacitacion;
}