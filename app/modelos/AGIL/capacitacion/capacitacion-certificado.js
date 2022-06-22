module.exports = function (sequelize, Sequelize) {
	CapacitacionCertificado = sequelize.define('agil_capacitacion_certificado', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		modelo: {
			type: Sequelize.STRING,
			field: 'modelo'
		},
		titulo: {
			type: Sequelize.STRING,
			field: 'titulo'
		},
		texto_uno: {
			type: Sequelize.STRING,
			field: 'texto_uno'
		},
		texto_dos: {
			type: Sequelize.STRING,
			field: 'texto_dos'
		},
		plantilla: {
			type: Sequelize.BOOLEAN,
			field: 'plantilla'
		},
		imagen: {
			type: Sequelize.STRING,
			field: 'imagen'
		},
		color_texto_uno: {
			type: Sequelize.STRING,
			field: 'color_texto_uno'
		},
		color_subtitulo: {
			type: Sequelize.STRING,
			field: 'color_subtitulo'
		},
		color_detalle_estudiante: {
			type: Sequelize.STRING,
			field: 'color_detalle_estudiante'
		},
		color_texto_dos: {
			type: Sequelize.STRING,
			field: 'color_texto_dos'
		},
		color_nombre_docente: {
			type: Sequelize.STRING,
			field: 'color_nombre_docente'
		},
		color_subtitulo_docente: {
			type: Sequelize.STRING,
			field: 'color_subtitulo_docente'
		},
		dimencion_texto_uno: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_texto_uno'
		},
		dimencion_subtitulo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_subtitulo'
		},
		dimencion_detalle_estudiante: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_detalle_estudiante'
		},
		dimencion_texto_dos: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_texto_dos'
		},
		dimencion_nombre_docente: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_nombre_docente'
		},
		dimencion_subtitulo_docente: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'dimencion_subtitulo_docente'
		},
		id_font_texto_uno: {
			type: Sequelize.INTEGER,
			field: 'font_texto_uno'
		},
		id_font_subtitulo: {
			type: Sequelize.INTEGER,
			field: 'font_subtitulo'
		},
		id_font_detalle_estudiante: {
			type: Sequelize.INTEGER,
			field: 'font_detalle_estudiante'
		},
		id_font_texto_dos: {
			type: Sequelize.INTEGER,
			field: 'font_texto_dos'
		},
		id_font_nombre_docente: {
			type: Sequelize.INTEGER,
			field: 'font_nombre_docente'
		},
		id_font_subtitulo_docente: {
			type: Sequelize.INTEGER,
			field: 'font_subtitulo_docente'
		},
		id_orientacion: {
			type: Sequelize.INTEGER,
			field: 'orientacion'
		},
		id_dimencion: {
			type: Sequelize.INTEGER,
			field: 'dimencion'
		},		
		color_plantilla_uno: {
			type: Sequelize.STRING,
			field: 'color_plantilla_uno'
		},
		color_plantilla_dos: {
			type: Sequelize.STRING,
			field: 'color_plantilla_dos'
		},
		usar_imagen_empleado:{
			type: Sequelize.BOOLEAN,
			field: 'usar_imagen_empleado',
			defaultValue: false
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: false
		},

	}, {
		freezeTableName: true
	});

	CapacitacionCertificado.sync().then(function () {

	});

	return CapacitacionCertificado;
}