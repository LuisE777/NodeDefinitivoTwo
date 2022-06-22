angular.module('agil.servicios')
.factory('CierreCaja', ['$resource',function ($resource) {
		return $resource(restServer+"cierres-caja/empresa/:idEmpresa/:idUsuario",{id: '@idEmpresa'},
		{
			'update': { method:'PUT' }
		});
}])

.factory('CierreCajaDatos', ['$resource',function ($resource) {
		return $resource(restServer+"cierres-caja/:id_cierre_caja",{id: '@id_cierre_caja'},
		{
			'update': { method:'PUT' }
		});
}])

.factory('CierreCajaPaginador', ['$resource',function ($resource) {
	return $resource(restServer+"cierres-caja/empresa/:id_empresa/:id_usuario/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion",{id: '@idEmpresa'},
	{
		'update': { method:'PUT' }
	});
}])
.factory('CierreCajaMeseroPaginador', ['$resource',function ($resource) {
	return $resource(restServer+"cierres-caja-mesero/empresa/:idEmpresa/:idUsuario/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/columna/:columna/direccion/:direccion",{id: '@idEmpresa'},
	{
		'update': { method:'PUT' }
	});
}])
.factory('ListaCierresCajaMeseros', ['CierreCajaMeseroPaginador','$q',function(CierreCajaMeseroPaginador, $q) 
  {
	var res = function(paginator) 
	{
		var delay = $q.defer();
		CierreCajaMeseroPaginador.get({
			idEmpresa:paginator.filter.empresa,
			idUsuario:paginator.filter.usuario,
		  pagina: paginator.currentPage,
			items_pagina: paginator.itemsPerPage,
			busqueda: paginator.search,
			columna: paginator.column,
			direccion: paginator.direction},function(entidades) 
		{        
			delay.resolve(entidades);
		}, function(error) 
			{
				delay.reject(error);
			});
		return delay.promise;
	};
    return res;
  }])
.factory('CierreCajaDatosItem', ['CierreCajaDatos','$q',function(CierreCajaDatos, $q) 
{
var res = function(id_cierre) 
{
	var delay = $q.defer();
	CierreCajaDatos.get({
		id_cierre_caja:id_cierre},function(entidades) 
	{        
		delay.resolve(entidades);
	}, function(error) 
		{
			delay.reject(error);
		});
	return delay.promise;
};
	return res;
}])


.factory('ListaCierresCaja', ['CierreCajaPaginador','$q',function(CierreCajaPaginador, $q) 
  {
	var res = function(paginator) 
	{
		var delay = $q.defer();
		CierreCajaPaginador.get({
			id_empresa:paginator.filter.empresa,
			id_usuario:paginator.filter.usuario,
			inicio: paginator.filter.inicio,
			fin: paginator.filter.fin,
		  	pagina: paginator.currentPage,
			items_pagina: paginator.itemsPerPage,
			busqueda: paginator.search,
			columna: paginator.column,
			direccion: paginator.direction},function(entidades) 
		{        
			delay.resolve(entidades);
		}, function(error) 
			{
				delay.reject(error);
			});
		return delay.promise;
	};
    return res;
  }])

.factory('CierreCajaPendiente', ['$resource',function ($resource) {
		return $resource(restServer+"cierre-caja-pendiente/:idsSucursales");
}])

.factory('CierresCajaPendiente', ['CierreCajaPendiente','$q',function(CierreCajaPendiente, $q) 
  {
	var res = function(idsSucursales) 
	{
		var delay = $q.defer();
		CierreCajaPendiente.query({idsSucursales:idsSucursales},function(entidades) 
		{        
			delay.resolve(entidades);
		}, function(error) 
			{
				delay.reject(error);
			});
		return delay.promise;
	};
    return res;
  }])
  .factory('CierreCajaPendienteMesero', ['$resource',function ($resource) {
	return $resource(restServer+"cierre-caja-pendiente/:idsSucursales/mesero/:id_mesero");
}])

.factory('CierresCajaPendienteMesero', ['CierreCajaPendienteMesero','$q',function(CierreCajaPendienteMesero, $q) 
{
var res = function(idsSucursales,idMesero) 
{
	var delay = $q.defer();
	CierreCajaPendienteMesero.query({idsSucursales:idsSucursales,id_mesero:idMesero},function(entidades) 
	{        
		delay.resolve(entidades);
	}, function(error) 
		{
			delay.reject(error);
		});
	return delay.promise;
};
return res;
}])
.factory('CierreCajaMesero', ['$resource',function ($resource) {
	return $resource(restServer+"cierres-caja-mesero/empresa");
}])

.factory('CrearCierreCajaMesero', ['CierreCajaMesero','$q',function(CierreCajaMesero, $q) 
{
var res = function(datos) 
{
	var delay = $q.defer();
	CierreCajaMesero.save({},datos,function(entidades) 
	{        
		delay.resolve(entidades);
	}, function(error) 
		{
			delay.reject(error);
		});
	return delay.promise;
};
return res;
}]);