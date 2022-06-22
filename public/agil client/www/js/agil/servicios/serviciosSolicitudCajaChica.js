angular.module('agil.servicios')


.factory('SolicitudCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "solicitud-caja-chica", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('GuardarSolicitudCajaChica', ['SolicitudCajaChica', '$q', function (SolicitudCajaChica, $q) {
    var res = function (datos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        SolicitudCajaChica.save(datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('ConceptoMovimientoCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "solicitud-conceptos-caja-chica/empresa/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('GuardarConceptoMovimientoCajaChica', ['ConceptoMovimientoCajaChica', '$q', function (ConceptoMovimientoCajaChica, $q) {
    var res = function (idEmpleado, conceptos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        ConceptoMovimientoCajaChica.save({
            id_empresa: idEmpleado
        }, conceptos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('ObtenerConceptoMovimientoCajaChica', ['ConceptoMovimientoCajaChica', '$q', function (ConceptoMovimientoCajaChica, $q) {
    var res = function (idEmpleado, conceptos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        ConceptoMovimientoCajaChica.query({
            id_empresa: idEmpleado
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('SolicitudCajaChicaPaginador',  ['$resource',function ($resource) {
    return $resource(restServer + "solocitudes-caja-chica/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/solicitante/:solicitante/usuario/:usuario/estado/:estado/concepto/:concepto/movimiento/:movimiento/usuario-no-autorizado/:id_usuario_no_autorizado/autorizador/:autorizador/inicio/:inicio/fin/:fin/proveedor/:proveedor/campo/:campo/area/:area/doc/:doc/empleado_usuario/:id_empleado_usuario");
}])

.factory('SolicitudesCajaPaginador', ['SolicitudCajaChicaPaginador', '$q', function (SolicitudCajaChicaPaginador, $q) {
    var res = function (paginator)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        SolicitudCajaChicaPaginador.get({
            id_empresa: paginator.filter.empresa,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
            solicitante:paginator.filter.solicitante,
            autorizador:paginator.filter.autorizador,
            usuario:paginator.filter.usuario,
            estado:paginator.filter.estado,
            concepto:paginator.filter.concepto,
            movimiento:paginator.filter.movimiento,
            inicio:paginator.filter.inicio,
            fin:paginator.filter.fin,
            area:paginator.filter.area,
            campo:paginator.filter.campo,
            id_usuario_no_autorizado:paginator.filter.id_usuario_no_autorizado,
            proveedor:paginator.filter.proveedor,
            doc:paginator.filter.doc,
            id_empleado_usuario:paginator.filter.id_empleado_usuario
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('SolicitudTodoCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "todo-solicitudes-caja-chica/inicio/:inicio/fin/:fin/empresa/:id_empresa/estado/:estado/solicitante/:solicitante/usuario/:usuario/usuario_no_autorizado/:id_usuario_no_autorizado",null,
    {
        'update': { method: 'PUT' }
    });
}])

.factory('pruebaSolicitud', ['SolicitudTodoCajaChica', '$q', function (SolicitudTodoCajaChica, $q) {
    var res = function (inicio,fin,empresa,estado,solicitante,usuario,id_usuario_no_autorizado)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        SolicitudTodoCajaChica.get({
            inicio: inicio,
            fin: fin,
            id_empresa: empresa,
            estado: estado,
            solicitante: solicitante,
            //autorizador: autorizador,
            usuario: usuario,
            id_usuario_no_autorizado: id_usuario_no_autorizado
            /*concepto:paginator.filter.concepto,
            movimiento:paginator.filter.movimiento,
            id_usuario_no_autorizado:paginator.filter.id_usuario_no_autorizado,*/
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('CajaChicaPaginador',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/solicitante/:solicitante/usuario/:usuario/estado/:estado/concepto/:concepto/movimiento/:movimiento/usuario-no-autorizado/:id_usuario_no_autorizado/rendiciones/:rendiciones/inicio/:inicio/fin/:fin/campo/:campo/proveedor/:proveedor");
}])

.factory('SolicitudesCajaChicaPaginador', ['CajaChicaPaginador', '$q', function (CajaChicaPaginador, $q) {
    var res = function (paginator)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        CajaChicaPaginador.get({
            id_empresa: paginator.filter.empresa,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
            solicitante:paginator.filter.solicitante,
            usuario:paginator.filter.usuario,
            estado:paginator.filter.estado,
            concepto:paginator.filter.concepto,
            movimiento:paginator.filter.movimiento,
            id_usuario_no_autorizado:paginator.filter.id_usuario_no_autorizado,
            id_sucursal:paginator.filter.id_sucursal,
            rendiciones:paginator.filter.rendiciones,
            inicio:paginator.filter.fechaInicio,
            fin:paginator.filter.fechaFin,
            campo:paginator.filter.campo,
            proveedor:paginator.filter.proveedor
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('CajaChicaPDF',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chicaPDF/sucursal/:id_sucursal/empresa/:id_empresa/usuario-no-autorizado/:id_usuario_no_autorizado/inicio/:inicio/fin/:fin/concepto/:concepto/estado/:estado/movimiento/:movimiento/solicitante/:solicitante/usuario/:usuario");
}])

.factory('SolicitudesCajaChicaPDF', ['CajaChicaPDF', '$q', function (CajaChicaPDF, $q) {
    var res = function (id_sucursal,empresa,id_usuario_no_autorizado,inicio,fin,concepto,estado,movimiento,solicitante,usuario)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        CajaChicaPDF.get({
            id_sucursal:id_sucursal,
            id_empresa: empresa,
            id_usuario_no_autorizado: id_usuario_no_autorizado,
            inicio: inicio,
            fin: fin,
            concepto: concepto,
            estado: estado,
            movimiento: movimiento,
            solicitante:solicitante,
            usuario:usuario
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('IngresosCajaChicaPaginador',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
}])

.factory('IngresosCajaPaginador', ['IngresosCajaChicaPaginador', '$q', function (IngresosCajaChicaPaginador, $q) {
    var res = function (paginator)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        IngresosCajaChicaPaginador.get({
            id_empresa: paginator.filter.empresa,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
            id_sucursal:paginator.filter.id_sucursal   
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('IngresosCajaChicaPDF',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica-SolicitudesPDF/sucursal/:id_sucursal/empresa/:id_empresa");
}])

.factory('IngresosCajaPDF', ['IngresosCajaChicaPDF', '$q', function (IngresosCajaChicaPDF, $q) {
    var res = function (empresa,id_sucursal)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        IngresosCajaChicaPDF.get({
            id_empresa: empresa,      
            id_sucursal: id_sucursal   
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('DatosGuardarCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('GuardarCajaChica', ['DatosGuardarCajaChica', '$q', function (DatosGuardarCajaChica, $q) {
    var res = function (cajachica,idEmpresa)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DatosGuardarCajaChica.save({id_empresa:idEmpresa},cajachica, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('DatosCierreCaja',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/fecha/:fecha/saldoInicial/:saldo/usuario/:id_usuario", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('ObtenerDatosCierreCaja', ['DatosCierreCaja', '$q', function (DatosCierreCaja, $q) {
    var res = function (idEmpleado,fecha,saldo,idSucursal,idUsuario)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DatosCierreCaja.get({
            id_empresa: idEmpleado,fecha:fecha,saldo:saldo,id_sucursal:idSucursal,id_usuario:idUsuario
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
/* .factory('DatosCierreCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "cierre-caja-chica-impresion/cierre/:id_cierre");
}]) */


.factory('ObtenerDatosRendicionFondo',  ['$resource',function ($resource) {
    return $resource(restServer + "rendicion-caja-chica/solicitud/:id_solicitud");
}])

.factory('ObtenerRendicionFondo', ['ObtenerDatosRendicionFondo', '$q', function (ObtenerDatosRendicionFondo, $q) {
    var res = function (idSolicitud)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        ObtenerDatosRendicionFondo.get({
            id_solicitud: idSolicitud,
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('CierreCajaChicaPaginador',  ['$resource',function ($resource) {
    return $resource(restServer + "cierre-caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
}])

.factory('CierreCajaCPaginador', ['CierreCajaChicaPaginador', '$q', function (CierreCajaChicaPaginador, $q) {
    var res = function (paginator)//idEmpresa, xxx
    {        
        var delay = $q.defer();
        CierreCajaChicaPaginador.get({
            id_empresa: paginator.filter.empresa,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
            id_sucursal:paginator.filter.id_sucursal
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('CierreCajaChicaImpresion',  ['$resource',function ($resource) {
    return $resource(restServer + "cierre-caja-chica/sucursal/:id_sucursal/empresa/:id_empresa");
}])

.factory('CierreCajaCImpresion', ['CierreCajaChicaImpresion', '$q', function (CierreCajaChicaImpresion, $q) {
    var res = function (id_sucursal,empresa)
    {        
        var delay = $q.defer();
        CierreCajaChicaImpresion.get({
            id_empresa: empresa,
            id_sucursal:id_sucursal
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('alertasCajaChicaCantidadRuta',  ['$resource',function ($resource) {
    return $resource(restServer + "alertas/cajachica/cantidad/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('alertasCajaChicaCantidad', ['alertasCajaChicaCantidadRuta', '$q', function (alertasCajaChicaCantidadRuta, $q) {
    var res = function (filtro,idUsuario) {
        var delay = $q.defer();
        alertasCajaChicaCantidadRuta.get({ 
            id_empresa: filtro.id_empresa,
            id_verificador:idUsuario
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('AlertasCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "alertas-solicitud-caja-chica/empresa/:id_empresa/historico/:historico/mes/:mes/anio/:anio/verificador/:id_verificador/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('ObtenerAlertasCajaChica', ['AlertasCajaChica', '$q', function (AlertasCajaChica, $q) {
    var res = function (paginator,idUsuario)//idEmpresa, xxx
    {
        var delay = $q.defer();
        AlertasCajaChica.get({
            id_empresa: paginator.filter.id_empresa,
            historico:paginator.filter.historico,
            mes:paginator.filter.mes,
            anio:paginator.filter.anio,
            id_verificador:idUsuario,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('VerificacionCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "verificar-solicitudes-caja-chica", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarVerificadorSolicitud', ['VerificacionCajaChica', '$q', function (VerificacionCajaChica, $q) {
    var res = function (idEmpleado,datos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        VerificacionCajaChica.update({},datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosSolicitudID',  ['$resource',function ($resource) {
    return $resource(restServer + "cobros-caja-chica/solicitud/:id_solicitud", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerDatosSolicitudID', ['DatosSolicitudID', '$q', function (DatosSolicitudID, $q) {
    var res = function (idSolicitud)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DatosSolicitudID.get({id_solicitud:idSolicitud}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosSolicitudFondoARendir',  ['$resource',function ($resource) {
    return $resource(restServer + "fondo-a-rendir-caja-chica/solicitud/:id_solicitud", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerDatosSolicitudFondoARendir', ['DatosSolicitudFondoARendir', '$q', function (DatosSolicitudFondoARendir, $q) {
    var res = function (idSolicitud)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DatosSolicitudFondoARendir.get({id_solicitud:idSolicitud}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('listaFondoArendir',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica-fondoarendir-ingreso/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerlistaFondoArendir', ['listaFondoArendir', '$q', function (listaFondoArendir, $q) {
    var res = function (idSucursal,paginator)//idEmpresa, xxx
    {
        var delay = $q.defer();
        listaFondoArendir.get({
            id_sucursal:idSucursal,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('EliminarIngresoCaja',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/eliminar-ingreso/caja/:id_caja", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('EliminarIngresoCajaChica', ['EliminarIngresoCaja', '$q', function (EliminarIngresoCaja, $q) {
    var res = function (idCaja)//idEmpresa, xxx
    {
        var delay = $q.defer();
        EliminarIngresoCaja.save({id_caja:idCaja},null, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('EliminarDevolucionCaja',  ['$resource',function ($resource) {
    return $resource(restServer + "/caja-chica/eliminar-devolucion/caja/:id_caja", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('EliminarDevolucionCajaChica', ['EliminarDevolucionCaja', '$q', function (EliminarDevolucionCaja, $q) {
    var res = function (idCaja)//idEmpresa, xxx
    {
        var delay = $q.defer();
        EliminarDevolucionCaja.save({id_caja:idCaja},null, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosCierreCajaUno',  ['$resource',function ($resource) {
    return $resource(restServer + "datos-cierre-caja-chica/:id_cierre_caja/empresa/:id_empresa/sucursal/:id_sucursal", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('EliminarIngresoCaja',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/eliminar-ingreso/caja/:id_caja", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('EliminarDetalleCCH', ['EliminarIngresoCaja', '$q', function (EliminarIngresoCaja, $q) {
    var res = function (idCaja)//idEmpresa, xxx
    {
        var delay = $q.defer();
        EliminarIngresoCaja.save({id_caja:idCaja},null, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosCierreCajaUno',  ['$resource',function ($resource) {
    return $resource(restServer + "datos-cierre-caja-chica/:id_cierre_caja/empresa/:id_empresa/sucursal/:id_sucursal", null,
        {
            'update': { method: 'PUT' }
        });
}])
.factory('DatosCierreCajaChica', ['DatosCierreCajaUno', '$q', function (DatosCierreCajaUno, $q) {
    var res = function (id_cierre_caja,id_empresa,id_sucursal)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DatosCierreCajaUno.get({id_cierre_caja:id_cierre_caja,id_empresa:id_empresa,id_sucursal:id_sucursal},null, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('IncrementoSolicitud',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica/incremento/solicitud/:id_solicitud", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarIncrementoSolicitud', ['IncrementoSolicitud', '$q', function (IncrementoSolicitud, $q) {
    var res = function (solicitud)//idEmpresa, xxx
    {
        var delay = $q.defer();
        IncrementoSolicitud.save({id_solicitud:solicitud.id},{id_usuario:solicitud.usuarioId,incremento:solicitud.incremento,fecha_incremento:solicitud.fecha_incremento,concepto:solicitud.concepto}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarDatosValeCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "vale-caja-chica", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarValeCajaChica', ['GuardarDatosValeCajaChica', '$q', function (GuardarDatosValeCajaChica, $q) {
    var res = function (datos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosValeCajaChica.save(null,datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DarDeBajaValeCajaChica', ['GuardarDatosValeCajaChica', '$q', function (GuardarDatosValeCajaChica, $q) {
    var res = function (idVale)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosValeCajaChica.update(null,{id:idVale}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarDatosValeCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "vale-caja-chica", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarValeCajaChica', ['GuardarDatosValeCajaChica', '$q', function (GuardarDatosValeCajaChica, $q) {
    var res = function (datos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosValeCajaChica.save(null,datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarDatosNivelesCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "nivel-caja-chica/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarNivelesCajaChica', ['GuardarDatosNivelesCajaChica', '$q', function (GuardarDatosNivelesCajaChica, $q) {
    var res = function (datos,id)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosNivelesCajaChica.save({id_empresa:id},datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('ObtenerNivelesCajaChica', ['GuardarDatosNivelesCajaChica', '$q', function (GuardarDatosNivelesCajaChica, $q) {
    var res = function (id)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosNivelesCajaChica.get({id_empresa:id}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarDatosGastosCajaChica',  ['$resource',function ($resource) {
    return $resource(restServer + "nivel-caja-chica-gastos/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarGastosCajaChica', ['GuardarDatosGastosCajaChica', '$q', function (GuardarDatosGastosCajaChica, $q) {
    var res = function (datos,id)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosGastosCajaChica.save({id_empresa:id},datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('ObtenerGastosCajaChica', ['GuardarDatosGastosCajaChica', '$q', function (GuardarDatosGastosCajaChica, $q) {
    var res = function (id)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarDatosGastosCajaChica.get({id_empresa:id}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarRendicionDeFondoGasto',  ['$resource',function ($resource) {
    return $resource(restServer + "rendicion-fondo-caja-chica-gastos/:id_rendicion?", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('GuardarRendicionDeFondo', ['GuardarRendicionDeFondoGasto', '$q', function (GuardarRendicionDeFondoGasto, $q) {
    var res = function (datos,id)//idEmpresa, xxx
    {
        var delay = $q.defer();
        GuardarRendicionDeFondoGasto.save({id_empresa:id},datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DetalleRendicionSolicitud',  ['$resource',function ($resource) {
    return $resource(restServer + "caja-chica-detalles-rendicion/:id_solicitud", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerDetalleRendicionSolicitud', ['DetalleRendicionSolicitud', '$q', function (DetalleRendicionSolicitud, $q) {
    var res = function (idSolicitud)//idEmpresa, xxx
    {
        var delay = $q.defer();
        DetalleRendicionSolicitud.get({id_solicitud:idSolicitud}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
/* inicio configuracion contable comprobantes */
.factory('ConfiguracionContableComprobantes',  ['$resource',function ($resource) {
    return $resource(restServer + "configuracion-contable-comprobantes/empresa/:id_empresa", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerConfiguracionesContablesComprobantes', ['ConfiguracionContableComprobantes', '$q', function (ConfiguracionContableComprobantes, $q) {
    var res = function (idEmpresa)//idEmpresa, xxx
    {
        var delay = $q.defer();
        ConfiguracionContableComprobantes.query({id_empresa:idEmpresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('GuardarConfiguracionesContablesComprobantes', ['ConfiguracionContableComprobantes', '$q', function (ConfiguracionContableComprobantes, $q) {
    var res = function (idEmpresa,datos)//idEmpresa, xxx
    {
        var delay = $q.defer();
        ConfiguracionContableComprobantes.save({id_empresa:idEmpresa},datos, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
/* fin  configuracion contable comprobantes */
/* vales */
.factory('ListaValesCaja',  ['$resource',function ($resource) {
    return $resource(restServer + "lista-vales-caja/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/estado/:id_estado", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerListaVales', ['ListaValesCaja', '$q', function (ListaValesCaja, $q) {
    var res = function (idSucursal,paginator)//idEmpresa, xxx
    {
        var delay = $q.defer();
        ListaValesCaja.get({
            id_sucursal:idSucursal,
            pagina: paginator.currentPage,
            items_pagina: paginator.itemsPerPage,
            texto_busqueda: paginator.search,
            columna: paginator.column,
            direccion: paginator.direction,
            id_estado:paginator.filter.id_estado
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
/* fin vales */

