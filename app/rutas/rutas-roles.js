module.exports=function(router, Rol, RolAplicacion, Aplicacion, ensureAuthorizedlogged,OpcionAplicacion){
	
router.route('/roles')

	.get(ensureAuthorizedlogged,function(req, res) {
		Rol.findAll({
			include:[{model:RolAplicacion,as:'aplicacionesRol',
					include:[{model:Aplicacion,as:'aplicacion',include:{model:OpcionAplicacion,as:'opciones'}}]}],
					
		}).then(function(entities){			
			res.json(entities);		  
		});
	});	
}