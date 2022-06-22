angular.module('agil.servicios')

// INICIO RECIBO
    // buscar choferes por nombre
    .factory('ReciboChofer',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/chofer/empresa/:id_empresa/busqueda/:busqueda");
    }])
    .factory('BuscarChoferPorNombre', ['ReciboChofer', '$q', function (ReciboChofer, $q) {
    var res = function (id_empresa, busqueda) {
        var delay = $q.defer();
        ReciboChofer.query({id_empresa:id_empresa, busqueda: busqueda}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // buscar vehiculos por placa
    .factory('ReciboVehiculo',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/vehiculo/empresa/:id_empresa/busqueda/:busqueda");
    }])

    .factory('BuscarVehiculoPorPlaca', ['ReciboVehiculo', '$q', function (ReciboVehiculo, $q) {
    var res = function (id_empresa, busqueda) {
        var delay = $q.defer();
        ReciboVehiculo.query({id_empresa:id_empresa, busqueda: busqueda}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
    // buscar bancos de la empresa
    .factory('ReciboBanco',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/banco/empresa/:id_empresa/moneda/:moneda");
    }])
    .factory('BuscarBancosEmpresa', ['ReciboBanco', '$q', function (ReciboBanco, $q) {
    var res = function (id_empresa, moneda) {
        var delay = $q.defer();
        ReciboBanco.get({id_empresa:id_empresa, moneda: moneda}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
    // obtener sucursales que emitieron recibos
    .factory('ReciboSucursales',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibo/sucursales/empresa/:id_empresa");
    }])
    .factory('ObtenerSucursalesEmpresa', ['ReciboSucursales', '$q', function (ReciboSucursales, $q) {
    var res = function (id_empresa) {
        var delay = $q.defer();
        ReciboSucursales.get({id_empresa:id_empresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
    // obtener usuarios que generaron recibos
    .factory('RecibosUsuarios',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibo/usuarios/empresa/:id_empresa");
    }])
    .factory('ObtenerUsuariosEmpresa', ['RecibosUsuarios', '$q', function (RecibosUsuarios, $q) {
    var res = function (id_empresa) {
        var delay = $q.defer();
        RecibosUsuarios.get({id_empresa:id_empresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // buscar bancos del sistema financiero
    .factory('ReciboBancoDestino',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/bancos/busqueda/:busqueda");
    }])
    .factory('BuscarBancoDestinoPorNombre', ['ReciboBancoDestino', '$q', function (ReciboBancoDestino, $q) {
    var res = function (busqueda) {
        var delay = $q.defer();
        ReciboBancoDestino.query({ busqueda: busqueda }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // buscar rutas por nombre
    .factory('ReciboRuta',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/ruta/empresa/:id_empresa/busqueda/:busqueda");
    }])
    .factory('BuscarRutaPorNombre', ['ReciboRuta', '$q', function (ReciboRuta, $q) {
    var res = function (id_empresa, busqueda) {
        var delay = $q.defer();
        ReciboRuta.query({id_empresa:id_empresa, busqueda: busqueda}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // obtener todos los recibos para cargar tabla
    .factory('RecibosReporte',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/RecibosReporte/reportes/empresa/:id_empresa");
    }])
    .factory('GetRecibosReporte', ['RecibosReporte', '$q', function (RecibosReporte, $q) {
    var res = function (id_empresa, filtro) {
        var delay = $q.defer();
        RecibosReporte.save({ id_empresa:id_empresa}, filtro, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // Obtener recibos para reportes
    .factory('Recibos',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibos/empresa/:id_empresa");
    }])
    .factory('ObtenerRecibos', ['Recibos', '$q', function (Recibos, $q) {
    var res = function (id_empresa, filtro) {
        var delay = $q.defer();
        Recibos.save({id_empresa:id_empresa}, filtro, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    //guardar o editar recibo
    .factory('ReciboDetalle',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibo_detalle");
    }])
    .factory('GuardarEditarRecibo', ['ReciboDetalle', '$q', function (ReciboDetalle, $q) {
        var res = function (recibo) {
            var delay = $q.defer();
            ReciboDetalle.save({}, recibo, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    // obtener recibo por ID
    .factory('Recibo',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibo/id_recibo/:id_recibo");
    }])
    .factory('ObtenerReciboPorId', ['Recibo', '$q', function (Recibo, $q) {
    var res = function (id_recibo) {
        var delay = $q.defer();
        Recibo.get({id_recibo:id_recibo}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    // Eliminacion de recibo
    .factory('QuitarRecibo',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/recibo/:id_recibo/eliminar/:eliminar");
    }])
    .factory('EliminarRecibo', ['QuitarRecibo', '$q', function (QuitarRecibo, $q) {
    var res = function (id_recibo, eliminar ) {
        var delay = $q.defer();
        QuitarRecibo.delete({id_recibo:id_recibo, eliminar:eliminar}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
    

// FIN RECIBO

























//INICIO CHOFERES
    .factory('Chofer',  ['$resource',function ($resource) {
            return $resource(restServer+"transporte/chofer");
    }])

    .factory('GuardarEditarChofer', ['Chofer', '$q', function (Chofer, $q) {
        var res = function (chofer) {
            var delay = $q.defer();
            Chofer.save({}, chofer, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('Choferes',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/chofer/empresa/:id_empresa");
    }])

    .factory('ObtenerChoferes', ['Choferes', '$q', function (Choferes, $q) {
    var res = function (id_empresa) {
        var delay = $q.defer();
        Choferes.get({id_empresa:id_empresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    .factory('QuitarChofer',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/chofer/:id_chofer/persona/:id_persona");
    }])

    .factory('EliminarChofer', ['QuitarChofer', '$q', function (QuitarChofer, $q) {
    var res = function (id_chofer, id_persona) {
        var delay = $q.defer();
        QuitarChofer.delete({id_chofer:id_chofer, id_persona:id_persona}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
// FIN CHOFERES

// INICIO VEHICULOS
    .factory('Vehiculo',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/vehiculo");
    }])

    .factory('GuardarEditarVehiculo', ['Vehiculo', '$q', function (Vehiculo, $q) {
    var res = function (vehiculo) {
        var delay = $q.defer();
        Vehiculo.save({}, vehiculo, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    .factory('Vehiculos',  ['$resource',function ($resource) {
    return $resource(restServer+"transporte/vehiculo/empresa/:id_empresa");
    }])

    .factory('ObtenerVehiculos', ['Vehiculos', '$q', function (Vehiculos, $q) {
    var res = function (id_empresa) {
        var delay = $q.defer();
        Vehiculos.get({id_empresa:id_empresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    .factory('QuitarVehiculo',  ['$resource',function ($resource) {
    return $resource(restServer+"transporte/vehiculo/:id_vehiculo");
    }])

    .factory('EliminarVehiculo', ['QuitarVehiculo', '$q', function (QuitarVehiculo, $q) {
    var res = function (id_vehiculo) {
        var delay = $q.defer();
        QuitarVehiculo.delete({id_vehiculo:id_vehiculo}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
// FIN VEHICULOS

// INICIO RUTAS
    .factory('Ruta',  ['$resource',function ($resource) {
        return $resource(restServer+"transporte/ruta");
    }])

    .factory('GuardarEditarRuta', ['Ruta', '$q', function (Ruta, $q) {
    var res = function (ruta) {
        var delay = $q.defer();
        Ruta.save({}, ruta, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    .factory('RutasTransporte',  ['$resource',function ($resource) {
    return $resource(restServer+"transporte/rutas/empresa/:id_empresa");
    }])

    .factory('ObtenerRutas', ['RutasTransporte', '$q', function (RutasTransporte, $q) {
    var res = function (id_empresa) {
        var delay = $q.defer();
        RutasTransporte.get({id_empresa:id_empresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

    .factory('QuitarRuta',  ['$resource',function ($resource) {
    return $resource(restServer+"transporte/ruta/:id_ruta");
    }])

    .factory('EliminarRuta', ['QuitarRuta', '$q', function (QuitarRuta, $q) {
    var res = function (id_ruta) {
        var delay = $q.defer();
        QuitarRuta.delete({id_ruta:id_ruta}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])
// FIN RUTAS

