angular.module('agil.servicios')


.factory('comprobanteTransaccionEmail', ['$resource', function ($resource) {
    return $resource(mailRestServer + "transaccion/proveedor/send/email", null,
        {'update': { method: 'PUT' }});
}])
.factory('EmailComprobanteTransaccion', ['comprobanteTransaccionEmail', '$q', function (comprobanteTransaccionEmail, $q) {
    var res = function (data) {
        var delay = $q.defer();
        comprobanteTransaccionEmail.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])



.factory('rutaListaMailInbox', ['$resource', function ($resource) {
    return $resource(mailRestServer + "lista/enviados/mail/inbox/:id_empresa/:id_usuario/:destacado/:eliminado/:borrador", { id: '@idEmpresa' },
        {
            'update': { method: 'PUT' }
        });
}])
.factory('listaMailInbox', ['rutaListaMailInbox', '$q', function (rutaListaMailInbox, $q) {
    var res = function (idEmpresa, idUsuario, destacado, eliminado, borrador) {
        var delay = $q.defer();
        rutaListaMailInbox.get({ id_empresa: idEmpresa, id_usuario: idUsuario, destacado: destacado, eliminado, borrador}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('rutaDetalleMailInbox', ['$resource', function ($resource) {
    return $resource(mailRestServer + "detalle/mail/inbox/:id_empresa/:id_inbox", { id: '@idEmpresa' },
        {
            'update': { method: 'PUT' }
        });
}])
.factory('detalleMailInbox', ['rutaDetalleMailInbox', '$q', function (rutaDetalleMailInbox, $q) {
    var res = function (idEmpresa,idInbox) {
        var delay = $q.defer();
        rutaDetalleMailInbox.get({ id_empresa: idEmpresa, id_inbox: idInbox }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('rutaAddEnvioCorreoMail', ['$resource', function ($resource) {
    return $resource(mailRestServer + "nuevo/envio/correo/email/bandeja", null,
        {'update': { method: 'PUT' }});
}])
.factory('addEnvioCorreoMail', ['rutaAddEnvioCorreoMail', '$q', function (rutaAddEnvioCorreoMail, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaAddEnvioCorreoMail.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('rutaAddMailBorrador', ['$resource', function ($resource) {
    return $resource(mailRestServer + "nuevo/envio/correo/email/borrador", null,
        {'update': { method: 'PUT' }});
}])
.factory('addMailBorrador', ['rutaAddMailBorrador', '$q', function (rutaAddMailBorrador, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaAddMailBorrador.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('rutaMailPapelera', ['$resource', function ($resource) {
    return $resource(mailRestServer + "editar/envio/correo/email/papelera", null,
        {'update': { method: 'PUT' }});
}])
.factory('moverApapelera', ['rutaMailPapelera', '$q', function (rutaMailPapelera, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaMailPapelera.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}]) 

.factory('rutaMarcarSinDestacar', ['$resource', function ($resource) {
    return $resource(mailRestServer + "editar/envio/correo/email/sin/destadar", null,
        {'update': { method: 'PUT' }});
}])
.factory('marcarSinDestacarr', ['rutaMarcarSinDestacar', '$q', function (rutaMarcarSinDestacar, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaMarcarSinDestacar.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('rutaMarcarDestacado', ['$resource', function ($resource) {
    return $resource(mailRestServer + "editar/envio/correo/email/destacado", null,
        {'update': { method: 'PUT' }});
}])
.factory('marcarDestacadoo', ['rutaMarcarDestacado', '$q', function (rutaMarcarDestacado, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaMarcarDestacado.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('rutaReenvioCorreoMail', ['$resource', function ($resource) {
    return $resource(mailRestServer + "reevio/correo/email", null,
        {'update': { method: 'PUT' }});
}])
.factory('reenvioCorreoMail', ['rutaReenvioCorreoMail', '$q', function (rutaReenvioCorreoMail, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaReenvioCorreoMail.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('rutaEliminarBorrador', ['$resource', function ($resource) {
    return $resource(mailRestServer + "eliminar/correo/email/borrador", null,
        {'update': { method: 'PUT' }});
}])
.factory('eliminarBorrador', ['rutaEliminarBorrador', '$q', function (rutaEliminarBorrador, $q) {
    var res = function (data) {
        var delay = $q.defer();
        rutaEliminarBorrador.save({}, data, function (entidad) {
            delay.resolve(entidad);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

//? INICIO NOTIFICACION FACTURACION
    //* NOTIFICA LA EMISIÓN DE LA FACTURA
    .factory('NotificacionEmisionFactura', ['$resource', function ($resource) {
        return $resource(mailRestServer + "facturacion/notificacion/emision", null, {
            'update': { method: 'PUT' }
        })
    }])

    .factory('NotificarEmision', ['NotificacionEmisionFactura', '$q', function (NotificacionEmisionFactura, $q) {
        var res = function ( data, pdf, xml, logoUrl, host, port, user, pass ) {
            var delay = $q.defer();
            NotificacionEmisionFactura.save({}, { data, pdf, logoUrl, xml, host, port, user, pass }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    //* NOTIFICA LA ANULACION DE LA FACTURA
    .factory('NotificacionAnulacionFactura', ['$resource', function ($resource) {
        return $resource(mailRestServer + "facturacion/notificacion/anulacion", null, {
            'update': { method: 'PUT' }
        })
    }])

    .factory('NotificarAnulacion', ['NotificacionAnulacionFactura', '$q', function (NotificacionAnulacionFactura, $q) {
        var res = function ( data, logoUrl, host, port, user, pass ) {
            var delay = $q.defer();
            NotificacionAnulacionFactura.save({}, { data, logoUrl, host, port, user, pass }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
//? FIN NOTIFICACION FACTURACION