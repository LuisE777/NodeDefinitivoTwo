module.exports = function (router, Persona, VendedorVenta, Venta, MeseroVenta, ensureAuthorizedlogged) {

    router.route('/vendedor-venta/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            VendedorVenta.findAll({
                where: { id_empresa: req.params.id_empresa },
                include: [{ model: Persona, as: 'persona' }]
            }).then(function (persons) {
                res.json(persons);
            });
        });

    router.route('/vendedor-venta/empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
                + ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
                + ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
                + ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
            Persona.create({
                nombres: req.body.persona.nombres,
                apellido_paterno: req.body.persona.apellido_paterno,
                apellido_materno: req.body.persona.apellido_materno,
                nombre_completo: nombre
            }).then(function (persona) {
                VendedorVenta.create({
                    id_empresa: req.body.id_empresa,
                    id_persona: persona.id
                }).then(function (vendedor) {
                    res.json(vendedor);
                });
            });
        });

    router.route('/vendedor-venta/:id_vendedor')
        .put(ensureAuthorizedlogged, function (req, res) {
            VendedorVenta.find({
                where: {
                    id: req.params.id_vendedor
                }
            }).then(function (vendedor) {
                var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
                    + ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
                    + ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
                    + ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
                Persona.update({
                    nombres: req.body.persona.nombres,
                    apellido_paterno: req.body.persona.apellido_paterno,
                    apellido_materno: req.body.persona.apellido_materno,
                    nombre_completo: nombre
                }, {
                        where: {
                            id: vendedor.id_persona
                        }
                    }).then(function (persona) {
                        res.json({ mensaje: "Vendedor actualizado satisfactoriamente!" });
                    });
            });
        });

    router.route('/vendedor-venta/:id_vendedor')
        .delete(ensureAuthorizedlogged, function (req, res) {
            VendedorVenta.find({
                where: {
                    id: req.params.id_vendedor
                },
                include: [{ model: Venta, as: 'ventas' }]
            }).then(function (vendedor) {
                if (vendedor.ventas.length == 0) {
                    Persona.destroy({
                        where: {
                            id: vendedor.id_persona
                        }
                    }).then(function (persona) {
                        VendedorVenta.destroy({
                            where: {
                                id: req.params.id_vendedor
                            }
                        }).then(function (persona) {
                            res.json({ mensaje: "Vendedor eliminado satisfactoriamente!" });
                        });
                    });
                } else {
                    res.json({ mensaje: "No se puede eliminar al vendedor porque tiene ventas registradas!" });
                }
            });
        });
    router.route('/mesero-venta/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id) {
                MeseroVenta.update({
                    codigo: req.body.codigo,
                    activo: req.body.activo
                }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(function (mesero) {
                        var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
                            + ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
                            + ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
                            + ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
                        Persona.update({
                            nombres: req.body.persona.nombres,
                            apellido_paterno: req.body.persona.apellido_paterno,
                            apellido_materno: req.body.persona.apellido_materno,
                            nombre_completo: nombre,
                            ci: req.body.persona.ci,
                            direccion: req.body.persona.direccion
                        }, {
                                where: {
                                    id: req.body.persona.id
                                }
                            }).then(function (personaActualizada) {
                                res.json({ mensaje: "Mesero actualizado satisfactoriamente!" });
                            });
                    });
            } else {
                var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
                    + ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
                    + ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
                    + ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
                Persona.create({
                    nombres: req.body.persona.nombres,
                    apellido_paterno: req.body.persona.apellido_paterno,
                    apellido_materno: req.body.persona.apellido_materno,
                    nombre_completo: nombre,
                    ci: req.body.persona.ci,
                    direccion: req.body.persona.direccion
                }).then(function (persona) {
                    MeseroVenta.create({
                        id_empresa: req.params.id_empresa,
                        id_persona: persona.id,
                        codigo: req.body.codigo,
                        activo: true
                    }).then(function (mesero) {
                        res.json({ mensaje: "Mesero creado satisfactoriamente!" });
                    });
                });

            }
        });
        router.route('/mesero-venta/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            MeseroVenta.findAll({
                where: { id_empresa: req.params.id_empresa,activo:true },
                include: [{ model: Persona, as: 'persona' }]
            }).then(function (persons) {
                res.json(persons);
            });
        });

        router.route('/validar-codigo/mesero/:id_empresa')
		.post(ensureAuthorizedlogged,function (req, res) {
			MeseroVenta.find({
				where: {
					id_empresa: req.params.id_empresa,
					codigo: req.body.codigo,
					activo: true
				}
			}).then(function (entidad) {
				if (entidad) {
					res.json({
						type: true,
						message: "¡el codigo ya Exsiste!"
					});
				} else {
					res.json({
						type: false,
						message: "Codigo Disponible"
					});
				}
			});
		});
}