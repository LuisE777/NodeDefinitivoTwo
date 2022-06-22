angular.module('agil.servicios')

.factory('OptenerUltimaFechaConsumoOrdenReposicion', ['$resource', function ($resource) {
    return $resource(restServer + "obtener-ultima-fecha-orden-reposicion/empresa/:id_almacen", {},
        {
            'update': { method: 'PUT' }
        });
}])
.factory('UltimaFechaConsumoOrdenReposicion', ['OptenerUltimaFechaConsumoOrdenReposicion', '$q', function (OptenerUltimaFechaConsumoOrdenReposicion, $q) {
    // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
    var res = function ( id ) {
        var delay = $q.defer();
        OptenerUltimaFechaConsumoOrdenReposicion.get({
            id_almacen: id ? id : 0
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosSolicitudesPedido', ['$resource', function ($resource) {
    return $resource(restServer + "operaciones-pedidos/almacen/:id_almacen/grupo/:id_grupo", {},
        {
            'update': { method: 'PUT' }
        });
}])
.factory('ListaCompletaOrdenReposicion', ['DatosSolicitudesPedido', '$q', function (DatosSolicitudesPedido, $q) {
    // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
    var res = function (pedido) {
        var delay = $q.defer();
        DatosSolicitudesPedido.get({
            id_almacen: pedido.almacen.id,
            id_grupo: pedido.grupo ? pedido.grupo : 0
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
    .factory('DatosSolicitudesOrdenRepo', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-orden-reposicion/almacen/:id_almacen/grupo/:id_grupo/fecha/:fecha", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaCompletaSolicitudesReposicion', ['DatosSolicitudesOrdenRepo', '$q', function (DatosSolicitudesOrdenRepo, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (pedido,fecha) {
            var delay = $q.defer();
            DatosSolicitudesOrdenRepo.get({
                id_almacen: pedido.almacen.id,
                id_grupo: pedido.grupo ? pedido.grupo : 0,
                fecha: fecha ? fecha :0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ProductoInventarioDisponible', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-orden-reposicion/inventario/producto/:id_producto/almacen/:id_almacen", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('OptenerInventarioDisponibleProducto', ['ProductoInventarioDisponible', '$q', function (ProductoInventarioDisponible, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (id_producto,id_almacen) {
            var delay = $q.defer();
            ProductoInventarioDisponible.get({
                id_almacen: id_almacen,
                id_producto: id_producto
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('SolicitudReposicion', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones/empresa/:id_empresa/vintage/:id_usuario/nro_almacen/:nro_almacen/capo/:rol/desde/:desde/hasta/:hasta/suc/:sucursal/alm/:almacen/mov/:movimiento/est/:estado/val/:valuado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/usuario/:usuario", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('SolicitudesReposicion', ['SolicitudReposicion', '$q', function (SolicitudReposicion, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (filtro) {
            var delay = $q.defer();
            SolicitudReposicion.get({
                id_empresa: filtro.filter.empresa, id_usuario: filtro.filter.id, rol: filtro.filter.rol, desde: filtro.filter.desde,
                hasta: filtro.filter.hasta, 
                sucursal: (filtro.filter.sucursal !== undefined) ? (filtro.filter.sucursal.id !== undefined && filtro.filter.sucursal.id >= 0) ? filtro.filter.sucursal.id : 0 : 0, 
                almacen: (filtro.filter.almacen !== undefined) ? (filtro.filter.almacen.id !== undefined && filtro.filter.almacen.id >= 0) ? filtro.filter.almacen.id : 0 : 0, 
                nro_almacen: (filtro.filter.nro_almacen !== undefined) ? filtro.filter.nro_almacen : '', 
                movimiento: filtro.filter.movimiento, 
                estado: (filtro.filter.estado !== undefined) ? (filtro.filter.estado.id !== undefined && filtro.filter.estado.id >= 0) ? filtro.filter.estado.id : 0 : 0, 
                valuado: filtro.filter.valuado, pagina: filtro.currentPage, items_pagina: filtro.itemsPerPage, busqueda: filtro.search,usuario:filtro.filter.usuario
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('BusquedaProductosOperaciones', ['$resource', function ($resource) {
        return $resource(restServer + "productos-operaciones/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo");
    }])

    .factory('ProductosOperaciones', ['BusquedaProductosOperaciones', '$q', function (BusquedaProductosOperaciones, $q) {
        var res = function (idEmpresa, idAlmacen, id_usuario, pagina, texto, idGrupo) {
            var delay = $q.defer();
            BusquedaProductosOperaciones.query({ id_empresa: idEmpresa, id_almacen: idAlmacen, id_usuario: id_usuario, pagina: pagina, texto: texto, id_grupo: idGrupo }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('Ingrediente', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones/producto/:id_producto", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('SolicitudesFormulacionProducto', ['Ingrediente', '$q', function (Ingrediente, $q) {
        var res = function (idProducto) {
            var delay = $q.defer();
            Ingrediente.get({ id_producto: idProducto }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])




    .factory('EliminarSolicitud', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones/eliminar/:id_solicitud", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('EliminarSolicitudReposicion', ['EliminarSolicitud', '$q', function (EliminarSolicitud, $q) {
        var res = function (solicitud) {
            var delay = $q.defer();
            EliminarSolicitud.save({ id_solicitud: solicitud.id }, solicitud, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('DatosImpresion', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones/impresion/:id_solicitud", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ImpresionSolicitudDatos', ['DatosImpresion', '$q', function (DatosImpresion, $q) {
        var res = function (idProducto) {
            var delay = $q.defer();
            DatosImpresion.get({ id_producto: idProducto }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('CerrarSolicitudViveres', ['$resource', function ($resource) {
        return $resource(restServer + "productos-operaciones/empresa/:id_empresa/cerrar", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CerrarSolicitud', ['CerrarSolicitudViveres', '$q', function (CerrarSolicitudViveres, $q) {
        var res = function (solicitud, id_empresa) {
            var delay = $q.defer();
            CerrarSolicitudViveres.save({ id_empresa: id_empresa }, solicitud, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('SolicitudReposicionEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "solicitud/empresa/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('Solicitud', ['SolicitudReposicionEmpresa', '$q', function (SolicitudReposicionEmpresa, $q) {
        var res = function (solicitud, id_empresa, actualizar) {
            var delay = $q.defer();
            /* if (actualizar) {
                SolicitudReposicionEmpresa.update({ id_empresa: id_empresa }, solicitud, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            } else { */
                SolicitudReposicionEmpresa.save({ id_empresa: id_empresa }, solicitud, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            /* } */
        };
        return res;
    }])

    .factory('ListaRelacionesProveedo', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-proveedor-relacion/empresa/:id_empresa/razon_social/:razon_social/almacen/:id_almacen/grupo/:id_grupo");
    }])

    .factory('obtenerListaRelacionesProveedor', ['ListaRelacionesProveedo', '$q', function (ListaRelacionesProveedo, $q) {
        var res = function (idEmpresa, razon_social, pedido) {
            var delay = $q.defer();
            ListaRelacionesProveedo.query({
                id_empresa: idEmpresa,
                razon_social: razon_social,
                id_almacen: pedido.almacen.id,
                id_grupo: pedido.grupo ? pedido.grupo : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('CrearOrdenReposicion', ['$resource', function ($resource) {
        return $resource(restServer + "nueva/orden-reposicion/usuario/:id_usuario", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearActualizarOrdentrabajo', ['CrearOrdenReposicion', '$q', function (CrearOrdenReposicion, $q) {
        var res = function (idusuario, Reposicion) {
            var delay = $q.defer();
                CrearOrdenReposicion.save({ id_usuario: idusuario }, Reposicion, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    .factory('OrdenesRepoPorProducto', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-reposicion/orden_repo/producto/:id_producto/almacen/:id_almacen/limit/:limit", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaOrdenesRepoPorProducto', ['OrdenesRepoPorProducto', '$q', function (OrdenesRepoPorProducto, $q) {
        var res = function (idProducto,idAlmacen,limit) {
            var delay = $q.defer();
            OrdenesRepoPorProducto.get({ id_producto:idProducto,id_almacen: idAlmacen,limit:limit }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    .factory('DatosOrdenReposicion', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-reposicion/orden_repo/:id_orden_repo/tipo/:tipo", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('DatosOrdenRepo', ['DatosOrdenReposicion', '$q', function (DatosOrdenReposicion, $q) {
        var res = function (idRepo,tipo) {
            var delay = $q.defer();
            DatosOrdenReposicion.get({ id_orden_repo: idRepo,tipo:tipo?tipo:"0" }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    
    .factory('ListaOrdenReposicion', ['$resource', function ($resource) {
        return $resource(restServer + "orden-reposicion/inicio/:inicio/fin/:fin/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/estado/:id_estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
    }])

    .factory('ObtenerOrdenesReposicion', ['ListaOrdenReposicion', '$q', function (ListaOrdenReposicion, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ListaOrdenReposicion.get({
                inicio: paginator.filter.inicio,
                fin: paginator.filter.fin,
                id_empresa: paginator.filter.id_empresa,
                id_sucursal: paginator.filter.id_sucursal,
                id_almacen: paginator.filter.id_almacen,
                id_estado: paginator.filter.id_estado,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    /* importacion desde almacenes */
    .factory('SolicitudesReposicionesAlmacen', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-importacion-solicitud-reposicion-almacen/empresa/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarSolicitudesReposicionesAlmacen', ['SolicitudesReposicionesAlmacen', '$q', function (SolicitudesReposicionesAlmacen, $q) {
        var res = function (solicitudes,ordenesReposicion,id_empresa) {
            var delay = $q.defer();
            SolicitudesReposicionesAlmacen.save({ id_empresa: id_empresa },{solicitudes:solicitudes,
            ordenesReposicion:ordenesReposicion}, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    
    /* importacion desde almacenes */
    .factory('GuardarSolicitudesImpAlm', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-importacion-solicitud/empresa/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarSolicitudesImp', ['GuardarSolicitudesImpAlm', '$q', function (GuardarSolicitudesImpAlm, $q) {
        var res = function (solicitudes,id_empresa) {
            var delay = $q.defer();
            GuardarSolicitudesImpAlm.save({ id_empresa: id_empresa },solicitudes, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    /* datos solicitud */
    
    .factory('DatosSolicitudAlm', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-datos-solictud/:id_solicitud/alm/:id_almacen", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('OptenerDatosSolicitudAlm', ['DatosSolicitudAlm', '$q', function (DatosSolicitudAlm, $q) {
        var res = function (idSolicitud, idAlmacen) {
            var delay = $q.defer();
            DatosSolicitudAlm.get({ id_solicitud: idSolicitud, id_almacen: idAlmacen }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    .factory('DatosDetalleValuadoSolicitud', ['$resource', function ($resource) {
        return $resource(restServer + "/operaciones-datos-detalle-solictud/:id_solicitud", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('OptenerDetalleValuadoSolicitud', ['DatosDetalleValuadoSolicitud', '$q', function (DatosDetalleValuadoSolicitud, $q) {
        var res = function (idSolicitud) {
            var delay = $q.defer();
            DatosDetalleValuadoSolicitud.query({ id_solicitud: idSolicitud }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    .factory('RutaDatosSolicitudAlmValuado', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones-datos-solictud/valuado/:id_solicitud", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerSolicitudAlmValuado', ['RutaDatosSolicitudAlmValuado', '$q', function (RutaDatosSolicitudAlmValuado, $q) {
        var res = function (idSolicitud, idAlmacen) {
            var delay = $q.defer();
            RutaDatosSolicitudAlmValuado.get({ id_solicitud: idSolicitud, id_almacen: idAlmacen }, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
        
    .factory('SolicitudesImportacionCamp', ['$resource', function ($resource) {
        return $resource(restServer + "/operaciones-importacion-solicitud-reposicion-almacen/sucursal/:id_sucursal", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerSolicitudesImportacionCamp', ['SolicitudesImportacionCamp', '$q', function (SolicitudesImportacionCamp, $q) {
        var res = function (idSuc) {
            var delay = $q.defer();
                SolicitudesImportacionCamp.get({ id_sucursal: idSuc}, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    
    .factory('SolicitudesImpCampCerrar', ['$resource', function ($resource) {
        return $resource(restServer + "/operaciones-importacion-solicitud-reposicion-almacen/cerrar/sucursal/:id_sucursal/fecha/:fecha", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CerrarSolicitudesImpCamp', ['SolicitudesImpCampCerrar', '$q', function (SolicitudesImpCampCerrar, $q) {
        var res = function (id_sucursal, fecha) {
            var delay = $q.defer();
                SolicitudesImpCampCerrar.save({ id_sucursal: id_sucursal,fecha:fecha },{}, function (entidades) {
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
        };
        return res;
    }])
    .factory('ListaDatosCampamentosSolicitud', ['$resource', function ($resource) {
        return $resource(restServer + "datos-campamento-almacen-solicitud/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
    }])

    .factory('ObtenerDatosCampamentoSolicitud', ['ListaDatosCampamentosSolicitud', '$q', function (ListaDatosCampamentosSolicitud, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ListaDatosCampamentosSolicitud.get({
                id_sucursal: paginator.filter.sucursal,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaDatosCampamentosOrden', ['$resource', function ($resource) {
        return $resource(restServer + "datos-campamento-almacen-orden/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
    }])

    .factory('ObtenerDatosCampamentoOrden', ['ListaDatosCampamentosOrden', '$q', function (ListaDatosCampamentosOrden, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ListaDatosCampamentosOrden.get({
                id_sucursal: paginator.filter.sucursal,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GetSolicitudesReposicion', ['$resource', function ($resource) {
        return $resource(restServer + "solicitudes/reporte/desde/:desde/hasta/:hasta/sucursal/:sucursal/almacen/:almacen/:nro_almacen/:detallado");
    }])

    .factory('ObtenerSolicitudesReposicion', ['GetSolicitudesReposicion', '$q', function (GetSolicitudesReposicion, $q) {
        var res = function (filtro, detallado)//idEmpresa, xxx
        {
            var delay = $q.defer();
            GetSolicitudesReposicion.get({
                desde: filtro.fechaInicioTexto ? filtro.fechaInicioTexto: 0,
                hasta: filtro.fechaFinTexto ? filtro.fechaFinTexto: 0,
                sucursal: filtro.sucursal ? filtro.sucursal.id : 0,
                almacen: filtro.almacen ? filtro.almacen.id : 0,
                nro_almacen: filtro.nro_almacen ? filtro.nro_almacen : 0,
                detallado: detallado ? 1 : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RutaValidarImportacionConsumos', ['$resource', function ($resource) {
        return $resource(restServer + "validar-importar-consumos/empresa/:id_empresa");
    }])
    .factory('ValidarImportacionConsumos', ['RutaValidarImportacionConsumos', '$q', function (RutaValidarImportacionConsumos, $q) {
        var res = function (solicitudes, idEmpresa) {
            var delay = $q.defer();
            RutaValidarImportacionConsumos.save({ id_empresa: idEmpresa }, { solicitudes: solicitudes }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GetIsoOrdenSolicitud', ['$resource', function ($resource) {
        return $resource(restServer + "operaciones/reposiciones/doc-iso/:id/:finalizado", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerDatosIsoOrdenSolicitud', ['GetIsoOrdenSolicitud', '$q', function (GetIsoOrdenSolicitud, $q) {
        var res = function (id, finalizado) {
            var delay = $q.defer();
            GetIsoOrdenSolicitud.get({ 
                id: id ? id : 0, 
                finalizado: finalizado ? 1 : 0
            }, null, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])