angular.module('agil.servicios')

    .factory('GestionesEEFF', function ($resource) {
        return $resource(restServer + "gestiones/:id_empresa", null, {
            'update': { method: 'PUT' }
        });
    })

    .factory('ObtenerGestionesEEFF', ['GestionesEEFF', '$q', function (GestionesEEFF, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            GestionesEEFF.query({id_empresa:idEmpresa},function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('GuardarGestionesEEFF', ['GestionesEEFF', '$q', function (GestionesEEFF, $q) {
        var res = function (idEmpresa,datos) {
            var delay = $q.defer();
            GestionesEEFF.save({id_empresa:idEmpresa},datos,function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                    delay.reject(error);
                });
            return delay.promise;
        };
      
        return res;
    }])
    .factory('ConfiguracionImp', function ($resource) {
        return $resource(restServer + "configuracion-impresion/:id_empresa'", null, {
            'update': { method: 'PUT' }
        });
    })

    .factory('ObtenerConfiguracionImpresion', ['ConfiguracionImp', '$q', function (ConfiguracionImp, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ConfiguracionImp.get({id_empresa:idEmpresa},function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarConfiguracionImpresion', ['ConfiguracionImp', '$q', function (ConfiguracionImp, $q) {
        var res = function (idEmpresa,datos) {
            var delay = $q.defer();
            ConfiguracionImp.save({id_empresa:idEmpresa},datos,function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])

    
    .factory('CuentaContabilidadFiltroEEFF', function ($resource) {
		return $resource(restServer + "contabilidad-cuentas/empresa/:id_empresa/tipo_periodo/:periodo/tipo/:id_tipo/gestion/:gestion/mes/:mes/inicio/:inicio/fin/:fin/gestion_fin/:gestion_fin", null,
			{
				'update': { method: 'PUT' }
			});
	})
    
	.factory('CuentasContabilidadEEFF', ['CuentaContabilidadFiltroEEFF', '$q', function (CuentaContabilidadFiltroEEFF, $q) {
		var res = function (filtro,idEmpresa) {
			var delay = $q.defer();
			CuentaContabilidadFiltroEEFF.save({
				id_empresa: idEmpresa,
				periodo: filtro.tipoPeriodo.nombre,
                id_tipo: filtro.tipo_cuenta.id,
                gestion:(filtro.gestion)?filtro.gestion.nombre:0,
                mes:(filtro.mes.id)?filtro.mes.id:0,
                inicio:(filtro.inicio2)?filtro.inicio2:0,
                fin:(filtro.fin2)?filtro.fin2:0,
                gestion_fin:(filtro.gestion_fin)?filtro.gestion_fin.nombre:0
			},filtro, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
    }])
    .factory('CuentaContabilidadEstadoResultadoEEFF', function ($resource) {
		return $resource(restServer + "contabilidad-cuentas-estado-resultado/empresa/:id_empresa/tipo_periodo/:periodo/tipo/:id_tipo/gestion/:gestion/mes/:mes/inicio/:inicio/fin/:fin/gestion_fin/:gestion_fin", null,
			{
				'update': { method: 'PUT' }
			});
	})
    .factory('CuentasContabilidadEstadoResultadoEEFF', ['CuentaContabilidadEstadoResultadoEEFF', '$q', function (CuentaContabilidadEstadoResultadoEEFF, $q) {
		var res = function (filtro,idEmpresa) {
			var delay = $q.defer();
			CuentaContabilidadEstadoResultadoEEFF.save({
				id_empresa: idEmpresa,
				periodo: filtro.tipoPeriodo.nombre,
                id_tipo: filtro.tipo_cuenta.id,
                gestion:(filtro.gestion)?filtro.gestion.nombre:0,
                mes:(filtro.mes.id)?filtro.mes.id:0,
                inicio:(filtro.inicio2)?filtro.inicio2:0,
                fin:(filtro.fin2)?filtro.fin2:0,
                gestion_fin:(filtro.gestion_fin)?filtro.gestion_fin.nombre:0
			},filtro, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
    }])
    
    //resultados acumulados
    .factory('ObtenerResultadosAcumulados', function ($resource) {
		return $resource(restServer + "estados-financieros/resultados-acumulados/empresa/:id_empresa/gestion/:gestion", null,
			{
				'update': { method: 'PUT' }
			});
	})
    
	.factory('CuentaResultadosAcumulados', ['ObtenerResultadosAcumulados', '$q', function (ObtenerResultadosAcumulados, $q) {
		var res = function (filtro,idEmpresa) {
			var delay = $q.defer();
			ObtenerResultadosAcumulados.save({
				id_empresa: idEmpresa,
				periodo: filtro.gestion ? filtro.gestion.nombre:0 ,
                gestion:(filtro.gestion)?filtro.gestion.nombre:0,
                mes:(filtro.mes.id)?filtro.mes.id:0,
                inicio:(filtro.inicio2)?filtro.inicio2:0,
                fin:(filtro.fin2)?filtro.fin2:0,
                gestion_fin:(filtro.gestion_fin)?filtro.gestion_fin.nombre:0
			},filtro, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
    }])




 ////////////////////
    

    .factory('EstadoResultadoComercial', function ($resource) {
		return $resource(restServer + "estado-resultados/comercial/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	})
    .factory('ObtenerCuentasEstadoResultado', ['EstadoResultadoComercial', '$q', function (EstadoResultadoComercial, $q) {
		var res = function (filtro, idEmpresa) {
			var delay = $q.defer();
			EstadoResultadoComercial.save({id_empresa: idEmpresa }, filtro, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
    }])

    .factory('CencosEmpresa', function ($resource) {
        return $resource(restServer + "cencos/empresa/:id_empresa", null, {
            'update': { method: 'PUT' }
        });
    })

    .factory('ObtenerCencosEmpresa', ['CencosEmpresa', '$q', function (CencosEmpresa, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            CencosEmpresa.query({id_empresa:idEmpresa},function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])

    ///ESTADO DE EVOLUCION PATRIMONIAL
    .factory('CuentasPatrimoniales', function ($resource) {
        return $resource(restServer + "estado-patrimonial/empresa/:id_empresa");
    })


    .factory('ObtenerCuentasPatrimoniales', ['CuentasPatrimoniales', '$q', function (CuentasPatrimoniales, $q) {
        var res = function (config, idEmpresa) {
            var delay = $q.defer();
            CuentasPatrimoniales.save({ id_empresa: idEmpresa }, config, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])