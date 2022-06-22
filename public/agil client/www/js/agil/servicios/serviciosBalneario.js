angular.module('agil.servicios')
.factory('RutaTiposAmbientes', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/ambiente/tipo/:id_empresa");
}])

.factory('ListaTiposAmbientes', ['RutaTiposAmbientes', '$q', function (RutaTiposAmbientes, $q) {
    var res = function (idEmpresa) {
        var delay = $q.defer();
        RutaTiposAmbientes.get({ id_empresa: idEmpresa }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('RutaAmbientes', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/ambientes/:id_empresa", { id_empresa: '@id_empresa' },
        {
            'update': { method: 'PUT' }
        });
}])
.factory('CrearAmbiente', ['RutaAmbientes', '$q', function (RutaAmbientes, $q) {
    var res = function (idEmpresa, ambiente) {
        var delay = $q.defer();
        RutaAmbientes.save({ id_empresa: idEmpresa }, ambiente, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('GetListaAmbientes', ['RutaAmbientes', '$q', function (RutaAmbientes, $q) {
    var res = function (idEmpresa, idTipo) {
        var delay = $q.defer();
        RutaAmbientes.get({ id_empresa: idEmpresa }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('RutaAmbientesActivos', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/ambientes-activos/:id_empresa/sucursal/:id_sucursal/estado/:id_estado", { id_empresa: '@id_empresa' },
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GetListaAmbientesActivos', ['RutaAmbientesActivos', '$q', function (RutaAmbientesActivos, $q) {
    var res = function (idEmpresa, id_sucursal, id_estado) {
        var delay = $q.defer();
        RutaAmbientesActivos.get({ id_empresa: idEmpresa, id_sucursal: id_sucursal, id_estado: id_estado}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('RutaNumeroSucursal', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/ambiente/numero/:id_sucursal/:id_tipo");
}])

.factory('GetNumeroSucursal', ['RutaNumeroSucursal', '$q', function (RutaNumeroSucursal, $q) {
    var res = function (idSucursal, idTipo) {
        var delay = $q.defer();
        RutaNumeroSucursal.get({ id_sucursal: idSucursal, id_tipo: idTipo }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('RutaEncargados', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/vendedores/:id_empresa", { id_empresa: '@id_empresa' },
        {
            'update': { method: 'PUT' }
        });
}])
.factory('CrearEncargado', ['RutaEncargados', '$q', function (RutaEncargados, $q) {
    var res = function (idEmpresa, encargado) {
        var delay = $q.defer();
        RutaEncargados.save({ id_empresa: idEmpresa }, encargado, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GetListaEncargados', ['RutaEncargados', '$q', function (RutaEncargados, $q) {
    var res = function (idEmpresa) {
        var delay = $q.defer();
        RutaEncargados.get({ id_empresa: idEmpresa }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('VentaAmbiente', ['$resource', function ($resource) {
    return $resource(restServer + "ventas-ambiente");
}])

.factory('VentasBalnearioRuta', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/ventas/liquidacion", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('UpdateVentaBalneario', ['VentasBalnearioRuta', '$q', function (VentasBalnearioRuta, $q) {
    var res = function (venta) {
        var delay = $q.defer();
        VentasBalnearioRuta.update(null, venta, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('RutaComandaVenta', ['$resource', function ($resource) {
    return $resource(restServer + "balnearios/comanda/:id_comanda", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('DatosComanda', ['RutaComandaVenta', '$q', function (RutaComandaVenta, $q) {
    var res = function (id_comanda) {
        var delay = $q.defer();
        RutaComandaVenta.get({ id_comanda: id_comanda ? id_comanda : 0 }, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])