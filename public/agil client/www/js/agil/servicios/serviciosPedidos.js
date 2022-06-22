angular.module('agil.servicios')
.factory('PedidosEmpresa',  ['$resource',function ($resource) {
    return $resource(restServer + "pedidos/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen/direccion/:direccion/columna/:columna");
}])

.factory('PedidosFiltro', ['PedidosEmpresa', '$q', function (PedidosEmpresa, $q) {
    var res = function (idEmpresa, paginador) {
        var delay = $q.defer();
        PedidosEmpresa.get({
            desde: paginador.filter.desde,
            hasta: paginador.filter.hasta, 
            id_empresa: idEmpresa, 
            pagina: paginador.currentPage, 
            items_pagina: paginador.itemsPerPage, 
            texto_busqueda: paginador.search,
            id_tipo: paginador.filter.tipo,
            id_proveedor: paginador.filter.proveedor,
            nit: paginador.filter.nit,
            id_sucursal: paginador.filter.sucursal != 0?paginador.filter.sucursal.id:paginador.filter.sucursal,
            estado: paginador.filter.estado,
            usuario: paginador.filter.usuario,
            dociso: paginador.filter.dociso || 0,
            id_almacen: paginador.filter.almacen != 0?paginador.filter.almacen.id:paginador.filter.almacen,
            columna: paginador.column,
            direccion: paginador.direction,
            
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('Pedido',  ['$resource',function ($resource) {
    return $resource(restServer + "pedidos/:id_empresa/:id_usuario");
}])
.factory('EliminarPedido',  ['$resource',function ($resource) {
    return $resource(restServer + "pedidos/:id_pedido");
}])

.factory('GuardarPedido', ['Pedido', '$q', function (Pedido, $q) {
    var res = function (idEmpresa, pedido, usuario) {
        var delay = $q.defer();
        Pedido.save({ id_empresa: idEmpresa, id_usuario: usuario }, pedido, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('ProveedoresOperaciones',  ['$resource',function ($resource) {
    return $resource(restServer + "proveedores/:id_empresa");
}])

.factory('ListaProveedores', ['ProveedoresOperaciones', '$q', function (ProveedoresOperaciones, $q) {
    var res = function (idEmpresa) {
        var delay = $q.defer();
        ProveedoresOperaciones.get({ id_empresa: idEmpresa}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('EliminarPedido',  ['$resource',function ($resource) {
    return $resource(restServer + "pedido/:id_pedido");
}])

.factory('EliminarPedidoEmpresa', ['EliminarPedido', '$q', function (EliminarPedido, $q) {
    var res = function (idPedido) {
        var delay = $q.defer();
        EliminarPedido.delete({ id_pedido: idPedido}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('EliminarDetallePedido',  ['$resource',function ($resource) {
    return $resource(restServer + "pedido/detalle/:id_detalle");
}])

.factory('EliminarDetallePedidoEmpresa', ['EliminarDetallePedido', '$q', function (EliminarDetallePedido, $q) {
    var res = function (idDetalle) {
        var delay = $q.defer();
        EliminarDetallePedido.delete({id_detalle: idDetalle}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('DatosInventarioProductoPedido',  ['$resource',function ($resource) {
    return $resource(restServer + "pedido/producto/inventarios/:id_producto/:id_almacen");
}])

.factory('ObtenerDatosInventarioPedido', ['DatosInventarioProductoPedido', '$q', function (DatosInventarioProductoPedido, $q) {
    var res = function (idProducto,idAlmacen) {
        var delay = $q.defer();
        DatosInventarioProductoPedido.query({id_producto: idProducto,id_almacen:idAlmacen}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('UltimoPrecioCompraProducto',  ['$resource',function ($resource) {
    return $resource(restServer + "pedido/ultimo-precio-compra-producto/:id_producto/:id_almacen/:id_sucursal");
}])

.factory('ObtenerUltimoPrecioCompraProducto', ['UltimoPrecioCompraProducto', '$q', function (UltimoPrecioCompraProducto, $q) {
    var res = function (idProducto,idSucursal,idAlmacen) {
        var delay = $q.defer();
        UltimoPrecioCompraProducto.get({id_producto: idProducto,id_almacen:idAlmacen,id_sucursal:idSucursal}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('EdicionPedido',  ['$resource',function ($resource) {
    return $resource(restServer + "editar/orden/compra/:id_usuario");
}])

.factory('GuardarEdicionPedido', ['EdicionPedido', '$q', (EdicionPedido, $q) => {
    const res = (pedido, usuario) => {
        const delay = $q.defer();
        EdicionPedido.save({ id_usuario: usuario }, pedido, (entidades) => {
            delay.resolve(entidades);
        }, (error) => {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


.factory('rutaObtenerOrdenServicioXid', ['$resource', function ($resource) {
    return $resource(restServer + "orden-pedido/servicio/:id_pedido", null,
        {
            'update': { method: 'PUT' }
        });
}])

.factory('ObtenerOrdenServicioXid', ['rutaObtenerOrdenServicioXid', '$q', function (rutaObtenerOrdenServicioXid, $q) {
    var res = function (id) {
        var delay = $q.defer();
        rutaObtenerOrdenServicioXid.get({ id_pedido: id }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])
.factory('rutaGuardarEdicionServicio',  ['$resource',function ($resource) {
    return $resource(restServer + "guardarEdicion/orden/servicio/:id_usuario");
}])

.factory('GuardarEdicionServicio', ['rutaGuardarEdicionServicio', '$q', (rutaGuardarEdicionServicio, $q) => {
    const res = (pedido, usuario) => {
        const delay = $q.defer();
        rutaGuardarEdicionServicio.save({ id_usuario: usuario }, pedido, (entidades) => {
            delay.resolve(entidades);
        }, (error) => {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('rutaEliminarServicio',  ['$resource',function ($resource) {
    return $resource(restServer + "eliminar/orden/servicio/:id_usuario");
}])

.factory('eliminarServicio', ['rutaEliminarServicio', '$q', (rutaEliminarServicio, $q) => {
    const res = (pedido, usuario) => {
        const delay = $q.defer();
        rutaEliminarServicio.save({ id_usuario: usuario }, pedido, (entidades) => {
            delay.resolve(entidades);
        }, (error) => {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])

.factory('RutaPedidosDetalles',  ['$resource',function ($resource) {
    return $resource(restServer + "pedidos-detalles/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen");
}])

.factory('PedidosDetallesFiltro', ['RutaPedidosDetalles', '$q', function (RutaPedidosDetalles, $q) {
    var res = function (idEmpresa, paginador) {
        var delay = $q.defer();
        RutaPedidosDetalles.get({
            desde: paginador.filter.desde,
            hasta: paginador.filter.hasta, 
            id_empresa: idEmpresa, 
            pagina: paginador.currentPage, 
            items_pagina: paginador.itemsPerPage, 
            texto_busqueda: paginador.search,
            id_tipo: paginador.filter.tipo,
            id_proveedor: paginador.filter.proveedor,
            nit: paginador.filter.nit,
            id_sucursal: paginador.filter.sucursal != 0?paginador.filter.sucursal.id:paginador.filter.sucursal,
            estado: paginador.filter.estado,
            usuario: paginador.filter.usuario,
            dociso: paginador.filter.dociso || 0,
            id_almacen: paginador.filter.almacen != 0?paginador.filter.almacen.id:paginador.filter.almacen
        }, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
}])


