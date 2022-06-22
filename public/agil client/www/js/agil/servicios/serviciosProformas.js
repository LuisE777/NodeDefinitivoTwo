angular.module('agil.servicios')

    .factory('Proformas', ['$resource', function ($resource) {
        return $resource(restServer + "proformas/empresa/:id_empresa/mes/:mes/anio/:anio/suc/:sucursal/act/:actividad/ser/:servicio/monto/:monto/razon/:razon/usuario/:usuario/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/num/:numero/facturas/:id_opcion/col/:col/dir/:dir/:fecha_proforma_desde/:fecha_proforma_hasta/:buscar_factura/:factura", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GenerarProformas', ['$resource', function ($resource) {
        return $resource(restServer + "guardar/proforma/:id_empresa/:usuario",
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('importarProformas', ['$resource', function ($resource) {
        return $resource(restServer + "importacion/proforma/:id_empresa/:usuario",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('importacionProformas', ['importarProformas', '$q', function (importarProformas, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (proformas, idEmpresa, usuario) {
            var delay = $q.defer();
            importarProformas.save({ id_empresa: idEmpresa, usuario: usuario }, proformas, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('FiltroProformas', ['Proformas', '$q', function (Proformas, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (filtro) {
            var delay = $q.defer();
            Proformas.get({
                id_empresa: filtro.filter.empresa, usuario: filtro.filter.usuario, mes: (filtro.filter.mes !== 0 && filtro.filter.mes !== undefined ? filtro.filter.mes.id !== undefined ? filtro.filter.mes.id : filtro.filter.mes : 0),
                anio: (filtro.filter.anio !== 0 && filtro.filter.anio !== undefined ? filtro.filter.anio.id !== undefined ? filtro.filter.anio.id : filtro.filter.anio : 0), sucursal: (filtro.filter.sucursal.id !== undefined ? filtro.filter.sucursal.id : 0), actividad: (filtro.filter.actividadEconomica !== undefined ? (filtro.filter.actividadEconomica.id_actividad !== undefined ? filtro.filter.actividadEconomica.id_actividad : 0) : 0), monto: filtro.filter.monto, razon: filtro.filter.razon,
                servicio: (filtro.filter.servicio.id !== undefined ? filtro.filter.servicio.id : 0), pagina: filtro.currentPage, items_pagina: filtro.itemsPerPage, busqueda: filtro.search, numero: (filtro.filter.numero !== undefined ? filtro.filter.numero : 0), id_opcion: (filtro.filter.proformaFacturadas !== undefined ? (filtro.filter.proformaFacturadas.id ? filtro.filter.proformaFacturadas.id : 0) : 0), col: filtro.column, dir: filtro.direction,
                fecha_proforma_desde: (filtro.filter.fecha_proforma_desde && filtro.filter.fecha_proforma_desde.split('/').reverse().join('-') || 0),
                fecha_proforma_hasta: (filtro.filter.fecha_proforma_hasta && filtro.filter.fecha_proforma_hasta.split('/').reverse().join('-') || 0),
                buscar_factura: filtro.filter.buscarFactura && (filtro.filter.buscarFactura ? 1 : 0) || 0,
                factura: filtro.filter.factura && (filtro.filter.factura ? filtro.filter.factura : 0) || 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ProformasTablaEmpresa', ['$resource', ($resource) => {
        return $resource(restServer + "proformasEmpresa/empresa/:id_empresa/mes/:mes/anio/:anio/id_cliente/:id_cliente/estado/:estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/:excel", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('filtroListaProformasEmpresa', ['ProformasTablaEmpresa', '$q', (ProformasTablaEmpresa, $q) => {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        const res = (paginator, paraGrafico, facturas, excel) => {
            const delay = $q.defer();
            ProformasTablaEmpresa.get({
                pagina: paginator.currentPage,
                items_pagina: paraGrafico && 0 || paginator.itemsPerPage.cantidad,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
                id_empresa: paginator.filter.empresa,
                mes: paginator.mes && paginator.mes || 0,
                anio: paginator.filter.anio.id,
                id_cliente: paginator.filter.id_cliente || 0,
                estado: facturas && 1 || 0,
                excel: excel && 1 || 0
            }, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ProformasGrafica', ['$resource', function ($resource) {
        return $resource(restServer + "proformas/empresa/:id_empresa/mes/:mes/anio/:anio", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('FiltroListaProformas', ['ProformasGrafica', '$q', function (ProformasGrafica, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (empresa, mes, anio) {
            var delay = $q.defer();
            ProformasGrafica.get({
                id_empresa: empresa,
                mes: mes,
                anio: anio
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GuardarProformas', ['GenerarProformas', '$q', function (GenerarProformas, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (id_empresa, usuario, proforma) {
            var delay = $q.defer();
            GenerarProformas.save({
                id_empresa: id_empresa, usuario: usuario
            }, proforma, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ActividadEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "actividades/empresa/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ActividadesEmpresa', ['ActividadEmpresa', '$q', function (ActividadEmpresa, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ActividadEmpresa.get({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GuardarActividadesEmpresa', ['ActividadEmpresa', '$q', function (ActividadEmpresa, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (idEmpresa, nuevasActividades) {
            var delay = $q.defer();
            ActividadEmpresa.save({ id_empresa: idEmpresa }, nuevasActividades, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ActividadServicio', ['$resource', function ($resource) {
        return $resource(restServer + "actividades/servicios/empresa/:id_empresa/:id_actividad", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ServiciosEmpresa', ['ActividadServicio', '$q', function (ActividadServicio, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (idEmpresa, actividad) {
            var delay = $q.defer();
            ActividadServicio.get({ id_empresa: idEmpresa, id_actividad: actividad }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarActividadServicio', ['ActividadServicio', '$q', function (ActividadServicio, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (idEmpresa, actividad, servicios) {
            var delay = $q.defer();
            ActividadServicio.save({ id_empresa: idEmpresa, id_actividad: actividad }, servicios, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('Proforma', ['$resource', function ($resource) {
        return $resource(restServer + "proforma/:id", {},
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ProformasDetail', ['$resource', function ($resource) {
        return $resource(restServer + "proformas/:ids", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ActualizarProforma', ['Proforma', '$q', function (Proforma, $q) {
        var res = function (id, proforma) {
            var delay = $q.defer();
            Proforma.update({ id: id }, proforma, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ProformasInfo', ['ProformasDetail', '$q', function (ProformasDetail, $q) {
        var res = function (idProforma) {
            var delay = $q.defer();
            ProformasDetail.get({ ids: idProforma }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ProformaInfo', ['Proforma', '$q', function (Proforma, $q) {
        var res = function (idProforma) {
            var delay = $q.defer();
            Proforma.get({ id: idProforma }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('fechasProforma', ['$resource', function ($resource) {
        return $resource(restServer + "fechas/proforma/:id", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('eliminarProforma', ['$resource', function ($resource) {
        return $resource(restServer + "eliminar/proforma/:id", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ProformaEliminar', ['eliminarProforma', '$q', function (eliminarProforma, $q) {
        var res = function (proforma) {
            var delay = $q.defer();
            eliminarProforma.save({ id: proforma.id }, proforma, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('eliminarFacturaProforma', ['$resource', function ($resource) {
        return $resource(restServer + "eliminar/FacturaProforma/:id", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('FacturaProformaEliminar', ['eliminarFacturaProforma', '$q', function (eliminarFacturaProforma, $q) {
        var res = function (proforma) {
            var delay = $q.defer();
            eliminarFacturaProforma.save({ id: proforma.id }, proforma, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('alertasProformasLista', ['alertasProformas', '$q', function (alertasProformas, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            alertasProformas.get({
                id_empresa: idEmpresa ? idEmpresa : 0, mes: filtro.mes ? filtro.mes : 0,
                anio: filtro.anio ? filtro.anio : 0,
                razon_social: filtro.razon_social ? filtro.razon_social : 0,
                proforma: filtro.proforma ? filtro.proforma : 0,
                col: filtro.col,
                dir: filtro.dir
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('alertasProformas', ['$resource', function ($resource) {
        return $resource(restServer + "alertas/proformas/:id_empresa/:mes/:anio/:razon_social/:proforma/col/:col/dir/:dir", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('alertasProformasCantidadRuta', ['$resource', function ($resource) {
        return $resource(restServer + "alertas/proformas/cantidad/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('alertasProformasCantidad', ['alertasProformasCantidadRuta', '$q', function (alertasProformasCantidadRuta, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            alertasProformasCantidadRuta.get({
                id_empresa: idEmpresa ? idEmpresa : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    // .factory('alertasProformasCantidad',  ['$resource', '$q',function ($resource, $q) {
    //     var res = function (idEmpresa) {
    //         var delay = $q.defer();
    //         var proformaGet =  $resource(restServer + "alertas/proformas/cantidad/:id_empresa", {},
    //             {
    //                 'update': { method: 'PUT' }
    //             });
    //         proformaGet.get({ 
    //             id_empresa: idEmpresa ? idEmpresa : 0
    //         }, function (entidades) {
    //             delay.resolve(entidades);
    //         }, function (error) {
    //             delay.reject(error);
    //         });
    //         return delay.promise;
    //     }
    //     return res
    // }])


    .factory('FacturarProformas', ['$resource', function ($resource) {
        return $resource(restServer + "proforma/facturar/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('FacturaProforma', ['FacturarProformas', '$q', function (FacturarProformas, $q) {
        var res = function (idEmpresa, proformas) {
            var delay = $q.defer();
            FacturarProformas.save({ id_empresa: idEmpresa }, proformas, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    //Importacion de facturas
    .factory('ImportacionFacturarProformas', ['$resource', function ($resource) {
        return $resource(restServer + "proforma/facturar/:id_empresa/correlativo/:correlativo", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ImportacionFacturacion', ['ImportacionFacturarProformas', '$q', function (ImportacionFacturarProformas, $q) {
        var res = function (idEmpresa, correlativo, proformas) {
            var delay = $q.defer();
            ImportacionFacturarProformas.save({ id_empresa: idEmpresa, correlativo: correlativo }, proformas, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RutaImportacionFacturasProformas', ['$resource', function ($resource) {
        return $resource(restServer + "proforma/importacion-factura/:id_empresa/correlativo/:correlativo", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ProformasFacturasImp', ['RutaImportacionFacturasProformas', '$q', function (RutaImportacionFacturasProformas, $q) {
        var res = function (idEmpresa, correlativo, proformas) {
            var delay = $q.defer();
            RutaImportacionFacturasProformas.save({ id_empresa: idEmpresa, correlativo: correlativo }, proformas, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //Fin importacion de facturas

    .factory('DetallesProformasAFacturar', ['$resource', function ($resource) {
        return $resource(restServer + "detalles/proforma/facturar/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaDetallesProformasAFacturar', ['DetallesProformasAFacturar', '$q', function (DetallesProformasAFacturar, $q) {
        var res = function (idEmpresa, idproformas) {
            var delay = $q.defer();
            DetallesProformasAFacturar.get({ id_empresa: idEmpresa }, idproformas, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('listaProformasFacturadas', ['$resource', function ($resource) {
        return $resource(restServer + "factura/:id_factura/proforma/facturada/:id_empresa/:autorizacion/:anulada", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ProformasFacturadas', ['listaProformasFacturadas', '$q', function (listaProformasFacturadas, $q) {
        var res = function (idEmpresa, id_factura, autorizacion, anulada) {
            var delay = $q.defer();
            listaProformasFacturadas.get({ id_empresa: idEmpresa, id_factura: id_factura, autorizacion: autorizacion, anulada: anulada && 1 || 0 }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('configuracionFacturaEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "configuracion/proforma/facturar/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ConfiguracionesFacturasProformas', ['configuracionFacturaEmpresa', '$q', function (configuracionFacturaEmpresa, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            configuracionFacturaEmpresa.get({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    // sucursales/empresa/:id_empresa

    .factory('sucursalesEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "sucursales/empresa/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaSucursalesEmpresa', ['sucursalesEmpresa', '$q', function (sucursalesEmpresa, $q) {
        var res = function (idEmpresa, idproformas) {
            var delay = $q.defer();
            sucursalesEmpresa.get({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('ActividadesServiciosEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "actividades/servicios/:id_empresa", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaSucursalesActividadesDosificacionEmpresa', ['ActividadesServiciosEmpresa', '$q', function (ActividadesServiciosEmpresa, $q) {
        var res = function (idEmpresa, idproformas) {
            var delay = $q.defer();
            ActividadesServiciosEmpresa.get({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('proformaSucursalesUsuario', ['$resource', function ($resource) {
        return $resource(restServer + "proforma-sucursales/:id_usuario", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaSucursalesUsuario', ['proformaSucursalesUsuario',
        'IndexDbListaSucursalesUsuario',
        'IndexDbSaveSucursalesUsuario',
        '$q', '$window', function (proformaSucursalesUsuario,
            IndexDbListaSucursalesUsuario,
            IndexDbSaveSucursalesUsuario,
            $q, $window) {
            var res = function (id_usuario) {
                const online = $window.navigator.onLine;
                if (!online) {
                    return IndexDbListaSucursalesUsuario(id_usuario);
                }
                var delay = $q.defer();
                proformaSucursalesUsuario.get({ id_usuario: id_usuario }, function (entidades) {
                    IndexDbSaveSucursalesUsuario(entidades,id_usuario);
                    delay.resolve(entidades);
                }, function (error) {
                    delay.reject(error);
                });
                return delay.promise;
            };
            return res;
        }])

    .factory('actividadesHistorial', ['$resource', function ($resource) {
        return $resource(restServer + "actividades/historial/:id/:id_sucursal", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaHistorialActividad', ['actividadesHistorial', '$q', function (actividadesHistorial, $q) {
        var res = function (id, id_sucursal) {
            var delay = $q.defer();
            actividadesHistorial.get({ id: id, id_sucursal: id_sucursal }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('asignacionCentroCostosCliente', ['$resource', function ($resource) {
        return $resource(restServer + "clientes/centroCostos/:id_cliente",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('obtenerAsignacionCentroCosto', ['asignacionCentroCostosCliente', '$q', function (asignacionCentroCostosCliente, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (clienteId) {
            var delay = $q.defer();
            asignacionCentroCostosCliente.get({
                id_cliente: clienteId
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }]).factory('GuardarAsignacionCentroCosto', ['asignacionCentroCostosCliente', '$q', function (asignacionCentroCostosCliente, $q) {
        // :desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        var res = function (clienteId, listaAsignacion) {
            var delay = $q.defer();
            asignacionCentroCostosCliente.save({
                id_cliente: clienteId
            }, listaAsignacion, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('proformasCentroCostos', ['$resource', function ($resource) {
        return $resource(restServer + "proforma-CentroCostos/empresa/:empresa/mes/:mes/anio/:anio",
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaCentroCostos', ['proformasCentroCostos', '$q', function (proformasCentroCostos, $q) {
        var res = function (empresa, mes, anio) {
            var delay = $q.defer();
            proformasCentroCostos.get({
                empresa: empresa,
                mes: mes,
                anio: anio
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ProformaComparativo', ['$resource', function ($resource) {
        return $resource(restServer + "proformas-comparativo/empresa/:id_empresa/cliente/:id_cliente/mes/:mes/anio/:anio", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('reporteProformaComparativo', ['ProformaComparativo', '$q', function (ProformaComparativo, $q) {
        var res = function (empresa, cliente, mes, anio)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ProformaComparativo.get({
                id_empresa: empresa,
                id_cliente: cliente,
                mes: mes,
                anio: anio
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('proformaCorrelativo', ['$resource', function ($resource) {
        return $resource(restServer + "buscar-proforma/empresa/:id_empresa/proforma/:proforma/fechaOk/:fechaOk", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('buscarProformaPorCorrelatico', ['proformaCorrelativo', '$q', function (proformaCorrelativo, $q) {
        var res = function (empresa, proforma, fechaOk, fechaOkFin)//idEmpresa, xxx
        {
            var delay = $q.defer();
            proformaCorrelativo.get({
                id_empresa: empresa,
                proforma: proforma,
                fechaOk: fechaOk

            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('FacturasProformas', ['$resource', function ($resource) {
        return $resource(restServer + "facturas/proformas/:id_empresa/:usuario/:actividad/:sucursal/:razon/:anio/:mes/:dir/:col/:items_pagina/:pagina/:factura/:excel/:fecha_factura_desde/:fecha_factura_hasta/:autorizacion/:libro/:estado", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('ObtenerFacturasProformas', ['FacturasProformas', '$q', (FacturasProformas, $q) => {
        const res = (paginador, empresa, excel, libro) => {
            const delay = $q.defer();
            FacturasProformas.get({
                id_empresa: empresa,
                items_pagina: (paginador.itemsPerPage.cantidad && paginador.itemsPerPage.cantidad || 0),
                usuario: (paginador.filter.usuario && paginador.filter.usuario || 0),
                factura: (paginador.filter.factura && paginador.filter.factura || 0),
                actividad: (paginador.filter.actividadEconomica && paginador.filter.actividadEconomica.id_actividad || 0),
                sucursal: (paginador.filter.sucursal && paginador.filter.sucursal.id || 0),
                razon: (paginador.filter.razon && paginador.filter.razon || 0),
                anio: (paginador.filter.anio && paginador.filter.anio.id || 0),
                mes: (paginador.filter.mes && paginador.filter.mes.id || 0),
                dir: (paginador.direction && paginador.direction || 'asc'),
                col: (paginador.column && paginador.column || 'fecha_factura'),
                fecha_factura_desde: (paginador.filter.fecha_factura_desde && paginador.filter.fecha_factura_desde.split('/').reverse().join('-') || 0),
                fecha_factura_hasta: (paginador.filter.fecha_factura_hasta && paginador.filter.fecha_factura_hasta.split('/').reverse().join('-') || 0),
                pagina: paginador.currentPage,
                excel: (excel && 1 || 0),
                autorizacion: (paginador.filter.autorizacion && paginador.filter.autorizacion || 0),
                libro: (libro && 1 || 0),
                estado: (paginador.filter.estado && paginador.filter.estado.id || 0)
            }, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('facturasPendienteDeContabilizar', ['$resource', function ($resource) {
        return $resource(restServer + "obtener-proformas-no-contabilizadas/:id_empresa/:fecha/:eliminado", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('ObtenerfacturasPendienteDeContabilizar', ['facturasPendienteDeContabilizar', '$q', (facturasPendienteDeContabilizar, $q) => {
        const res = (empresa, fecha, eliminado) => {
            const delay = $q.defer();
            facturasPendienteDeContabilizar.get({
                id_empresa: empresa,
                fecha: fecha,
                eliminado: eliminado,
            }, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActividadDosificacionFactura', ['$resource', function ($resource) {
        return $resource(restServer + "actividad/:id/:autorizacion", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('ObtenerActividadDosificacionFactura', ['ActividadDosificacionFactura', '$q', (ActividadDosificacionFactura, $q) => {
        const res = (id_actividad, autorizacion) => {
            const delay = $q.defer();
            ActividadDosificacionFactura.get({
                id: id_actividad,
                autorizacion: autorizacion
            }, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CierreMesProforma', ['$resource', function ($resource) {
        return $resource(restServer + "cierre-mensual-proforma/:mes/:anio", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('ObtenerCierreMesProforma', ['CierreMesProforma', '$q', (CierreMesProforma, $q) => {
        const res = (filtro) => {
            const delay = $q.defer();
            CierreMesProforma.get({
                mes: filtro.mes.id,
                anio: filtro.anio.id
            }, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('AsignarCuentaActividad', ['$resource', function ($resource) {
        return $resource(restServer + "/asignar-cuentas-actividades", {
            'update': { method: 'PUT' }
        });
    }])

    .factory('GuardarAsignarCuentaActividad', ['AsignarCuentaActividad', '$q', (AsignarCuentaActividad, $q) => {
        const res = (datos) => {
            const delay = $q.defer();
            AsignarCuentaActividad.save(null, datos, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarCierreMesProforma', ['CierreMesProforma', '$q', (CierreMesProforma, $q) => {
        const res = (filtro, body) => {
            const delay = $q.defer();
            CierreMesProforma.save({
                mes: filtro.mes.id,
                anio: filtro.anio.id
            }, body, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])