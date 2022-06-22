module.exports = function (router, forEach, fs, sequelize, Empresa, Dosificacion, SucursalActividadDosificacion, Sucursal, Clase, ensureAuthorizedlogged) {

	router.route('/dosificaciones')

		.post(ensureAuthorizedlogged,function (req, res) {
			Dosificacion.create({
				id_empresa: req.body.id_empresa,
				correlativo: req.body.correlativo,
				fecha_limite_emision: req.body.fecha_limite_emision,
				autorizacion: req.body.autorizacion,
				llave_digital: req.body.llave_digital,
				id_pie_factura: req.body.pieFactura.id,
				tipo_dosificacion:req.body.tipo_dosificacion,
				expirado: (new Date(req.body.fecha_limite_emision) > new Date()) ? false : true

			}).then(function (dosificacionCreada) {
				res.json(dosificacionCreada);
			});
		});
		router.route('/dosificacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			let condicionDosificacion = { id_empresa: req.params.id_empresa};
			if (req.params.texto_busqueda != 0) {
				condicionDosificacion = {
					id_empresa: req.params.id_empresa,
					$or: [
						{
							autorizacion: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							correlativo: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							llave_digital: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							fecha_limite_emision: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}
					]
				};
			}

			Dosificacion.findAndCountAll({
				offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
				where: condicionDosificacion,
				include: [{ model: Empresa, as: 'empresa' },
				{ model: Clase, as: 'pieFactura' },
				{
					model: SucursalActividadDosificacion, as: 'actividadesSucursales',
					include: [{ model: Sucursal, as: "sucursal" }]
				}]
			}).then(function (data) {
				res.json({ dosificaciones: data.rows, paginas: Math.ceil(data.count / req.params.items_pagina) });
			}).catch(function (err) {
                res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
		});
	router.route('/dosificaciones/empresa/:id_empresa')
		.get(ensureAuthorizedlogged,function (req, res) {
			Dosificacion.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{ model: Empresa, as: 'empresa' },
				{ model: Clase, as: 'pieFactura' },
				{
					model: SucursalActividadDosificacion, as: 'actividadesSucursales',
					include: [{ model: Sucursal, as: "sucursal" }]
				}]
			}).then(function (dosificaciones) {
				res.json(dosificaciones);
			});
		});

	router.route('/dosificaciones-disponibles/empresa/:id_empresa')
		.get(ensureAuthorizedlogged,function (req, res) {
			sequelize.query("select * from agil_dosificacion where id not in (select dosificacion from agil_sucursal_actividad_dosificacion where dosificacion is not NULL) and expirado = false and empresa=" + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
				.then(function (dosificaciones) {
					res.json(dosificaciones);
				});
		});

	router.route('/actualizacion-dosificaciones-expiradas/:id_empresa')
		.get(ensureAuthorizedlogged,function (req, res) {
			sequelize.query("UPDATE agil_dosificacion SET agil_dosificacion.expirado = CASE WHEN agil_dosificacion.fecha_limite_emision > NOW() THEN FALSE ELSE TRUE END").spread(function (emptyArray, affectedRows) {
					res.json(affectedRows);
				}).catch(function (err) {
					res.json(err);
				})
		});

	router.route('/dosificaciones/:id_dosificacion')
		.put(ensureAuthorizedlogged,function (req, res) {
			Dosificacion.update({
				correlativo: req.body.correlativo,
				fecha_limite_emision: req.body.fecha_limite_emision,
				autorizacion: req.body.autorizacion,
				llave_digital: req.body.llave_digital,
				id_pie_factura: req.body.pieFactura.id,
				tipo_dosificacion:req.body.tipo_dosificacion,
			}, {
					where: {
						id: req.params.id_dosificacion
					}
				}).then(function (dosificacionActualizada) {
					res.json(req.body);
				});
		})

		.delete(ensureAuthorizedlogged,function (req, res) {
			Dosificacion.destroy({
				where: {
					id: req.params.id_dosificacion
				}
			}).then(function (affectedRows) {
				res.json({ message: "Eliminado Satisfactoriamente!" });
			});
		});
}