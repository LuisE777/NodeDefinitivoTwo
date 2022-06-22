module.exports = function (router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Banco, Clase, ensureAuthorizedlogged,
	ContabilidadCuenta) {

	router.route('/bancos/empresa/:id_empresa')

		.get(ensureAuthorizedlogged, function (req, res) {
			Banco.findAll({
				where: {
					id_empresa: req.params.id_empresa
				},
				include: [{ model: ContabilidadCuenta, as: 'cuenta' },{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
			}).then(function (entity) {
				res.json(entity);
			});
		});

	router.route('/bancos/empresa')

		.post(ensureAuthorizedlogged, function (req, res) {
			Banco.create({
				nombre: req.body.nombre,
				id_empresa: req.body.id_empresa,
				numero: req.body.numero,
				id_tipo_cuenta: req.body.tipoCuenta.id,
				id_tipo_moneda: req.body.tipoMoneda.id,
				cuenta_sueldo: req.body.cuenta_sueldo,
				id_cuenta: req.body.cuenta && req.body.cuenta.id || null,
				glosa_individual: req.body.glosa_individual,
				nit:req.body.nit.toString()
			}).then(function (bancoCreado) {
				res.json(bancoCreado);
			}).catch((err)=>{
				res.json({mensaje: err.stack});
			})
		});

	//Start paginador
	router.route('/bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionBanco = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/ };
			if (req.params.texto_busqueda != 0) {
				condicionBanco = {
					id_empresa: req.params.id_empresa,/*codigo:{$not:null},*/
					$or: [
						{
							nombre: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							numero: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}
					]
				};
			}
			Banco.findAndCountAll({
				where: condicionBanco,
				// include: [{model:Clase,as: 'tipoCuenta'},{model:Clase,as: 'tipoMoneda'}]


			}).then(function (data) {
				Banco.findAll({
					offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
					where: condicionBanco,
					include: [{ model: ContabilidadCuenta, as: 'cuenta' },{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }],
					order: [['nombre', 'asc']]
				}).then(function (bancos) {
					res.json({ bancos: bancos, paginas: Math.ceil(data.count / req.params.items_pagina) });
				}).catch((err)=>{
					res.json({hasErr:true, bancos: [], paginas: 0, mensaje:err.stack });
				})
			}).catch((err)=>{
				res.json({hasErr:true, bancos: [], paginas: 0, mensaje:err.stack });
			})
		});
	//End paginador

	router.route('/bancos/:id_banco')
		.get(ensureAuthorizedlogged, function (req, res) {
			Banco.find({
				where: {
					id: req.params.id_banco
				},
				include: [{ model: ContabilidadCuenta, as: 'cuenta' },{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
			}).then(function (entity) {
				res.json(entity);
			});
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			Banco.update({
				nombre: req.body.nombre,
				id_empresa: req.body.id_empresa,
				numero: req.body.numero,
				id_tipo_cuenta: req.body.tipoCuenta.id,
				id_tipo_moneda: req.body.tipoMoneda.id,
				cuenta_sueldo: req.body.cuenta_sueldo,
				id_cuenta: req.body.cuenta.id,
				glosa_individual: req.body.glosa_individual,
				nit:req.body.nit
			}, {
				where: {
					id: req.body.id
				}
			}).then(function (bancoActualizado) {
				res.json({ "message": "Actualizado Satisfactoriamente!" });
			});
		})

		.delete(function (req, res) {

		});

	router.route('/banco/activar/:id_banco')
		.put(ensureAuthorizedlogged, function (req, res) {
			Banco.update({
				eliminar: req.body.eliminar
			}, {
				where: { id: req.params.id_banco }
			}).then(function (banco) {
				res.json({ mensaje: "Banco Actualizado." });
			})
		})
}