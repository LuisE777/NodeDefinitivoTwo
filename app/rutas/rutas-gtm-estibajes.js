module.exports = function (router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmEstibaje, ensureAuthorizedlogged) {

	router.route('/gtm-estibajes/empresa/:id_empresa')

		.get(ensureAuthorizedlogged,function (req, res) {
			GtmEstibaje.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					eliminado:false
				}
			}).then(function (entity) {
				res.json(entity);
			});
		});

	router.route('/gtm-estibajes/empresa')

		.post(ensureAuthorizedlogged,function (req, res) {
			GtmEstibaje.create({
				codigo: req.body.codigo,
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				costo: req.body.costo,
				eliminado:false,
				activo:true
			}).then(function (estibajeCreado) {
				res.json(estibajeCreado);
			});
		});

	router.route('/gtm-estibajes/:id_estibaje')

		.put(ensureAuthorizedlogged,function (req, res) {
			GtmEstibaje.update({
				codigo: req.body.codigo,
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				costo: req.body.costo,
				eliminado:req.body.eliminado,
				activo:req.body.activo
			},
				{
					where: {
						id: req.params.id_estibaje
					}
				}).then(function (entity) {
					res.json({ mensaje: "Estibaje actualizado satisfactoriamente!" });
				});
		})

		.delete(function (req, res) {
			GtmEstibaje.update({
				eliminado:true
			},
				{
					where: {
						id: req.params.id_estibaje
					}
				}).then(function (entity) {
					res.json({ mensaje: "eliminado satisfactoriamente" });
				});
		});


}