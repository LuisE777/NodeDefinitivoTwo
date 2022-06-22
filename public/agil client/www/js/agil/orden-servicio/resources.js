angular.module('agil.servicios')
    .factory('OrdenServicio', ['$resource', ($resource) => {
        return $resource(restServer + "orden-servicio/:id_orden_servicio/:id_empresa/:id_usuario",
            {
                'update': { method: 'PUT' }
            })
    }])
    .factory('ListaOrdenServicio', ['$resource', ($resource) => {
        return $resource(restServer + "orden-servicio/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/columna/:columna/direccion/:direccion/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen");
    }])

    .factory('FiltroOrdenServicio', ['ListaOrdenServicio', '$q', (ListaOrdenServicio, $q) => {
        const res = (idEmpresa, paginador) => {
            const delay = $q.defer();
            ListaOrdenServicio.get(
                {
                    id_empresa: idEmpresa,
                    desde: paginador.filter.desde,
                    hasta: paginador.filter.hasta,
                    pagina: paginador.currentPage,
                    items_pagina: paginador.itemsPerPage,
                    texto_busqueda: paginador.search,
                    id_tipo: paginador.filter.tipo,
                    id_proveedor: paginador.filter.proveedor ? paginador.filter.proveedor.id : 0,
                    nit: paginador.filter.nit,
                    id_sucursal: paginador.filter.sucursal != 0 ? paginador.filter.sucursal.id : paginador.filter.sucursal,
                    estado: paginador.filter.estado,
                    usuario: paginador.filter.usuario,
                    dociso: paginador.filter.dociso || 0,
                    id_almacen: paginador.filter.almacen != 0 ? paginador.filter.almacen.id : paginador.filter.almacen,
                    columna: paginador.column,
                    direccion: paginador.direction
                }, (entidades) => {
                    delay.resolve(entidades);
                }, (error) => {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])

    .factory('GuardarOrdenServicio', ['OrdenServicio', '$q', (OrdenServicio, $q) => {
        const res = (idEmpresa, pedido, usuario) => {

            const delay = $q.defer();
            OrdenServicio.save(
                {
                    id_orden_servicio: pedido.id && pedido.id || 0,
                    id_empresa: idEmpresa,
                    id_usuario: usuario
                },
                {
                    id: pedido.id && pedido.id || 0,
                    detalles: pedido.detalles,
                    fecha: pedido.fecha,
                    fecha_entrega: pedido.fecha_entrega,
                    id_usuario: usuario,
                    // id_compra: null,
                    id_sucursal: pedido.sucursal.id,
                    id_almacen: pedido.almacen.id,
                    // activo: true,
                    id_concepto: pedido.concepto.id,
                    cambio_dolar: pedido.cambio_dolar,
                    id_detalle: pedido.detalle.id,
                    id_proveedor: pedido.proveedor.id,
                    cliente: pedido.usar_empresa_nuevo ? null : pedido.cliente,
                    // eliminado: false,
                    id_empresa: idEmpresa,
                    // numero_correlativo: null,
                    id_area_solicitante: pedido.area_solicitante.id,
                    id_area_destino: pedido.area_destino.id,
                    importe: pedido.importe,
                    id_tipo_pago: pedido.tipoPago.id,
                    dias_credito: pedido.dias_credito && pedido.dias_credito || 0,
                    a_cuenta: pedido.a_cuenta && pedido.a_cuenta || 0,
                    saldo: pedido.importe - (pedido.a_cuenta && pedido.a_cuenta || 0),
                    id_estado: pedido.estado.id,
                    // numero_iso:,
                    // descripcion:,
                    observacion: pedido.observacion,
                    config_doc_iso: pedido.config_doc_iso
                }, (entidades) => {
                    delay.resolve(entidades);
                }, (error) => {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])

    .factory('ObtenerOrdenServicio', ['OrdenServicio', '$q', (OrdenServicio, $q) => {
        const res = (pedido) => {
            const delay = $q.defer();
            OrdenServicio.get(
                {
                    id_orden_servicio: pedido && pedido || 0,
                    id_empresa: 0,
                    id_usuario: 0
                }, (entidades) => {
                    delay.resolve(entidades);
                }, (error) => {
                    delay.reject(error);
                });
            return delay.promise;
        };
        return res;
    }])

