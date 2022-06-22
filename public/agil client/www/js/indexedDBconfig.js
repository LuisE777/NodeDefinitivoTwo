angular.module('agil')
  .constant('indexedDBConfig', function ($indexedDBProvider) {
    $indexedDBProvider
      .connection('myIndexedDB')
      .upgradeDatabase(1, function (event, db, tx) {
        let objStore;

        objStore = db.createObjectStore('sincronizacion_diaria', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });

        objStore = db.createObjectStore('gl_clase', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_tipo', 'id_tipo', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('nombre_corto', 'nombre_corto', { unique: false });
        objStore.createIndex('habilitado', 'habilitado', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('id_padre', 'id_padre', { unique: false });
        objStore.createIndex('icono', 'icono', { unique: false });

        objStore = db.createObjectStore('gl_tipo', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('nombre_corto', 'nombre_corto', { unique: false });
        objStore.createIndex('empresa', 'empresa', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('id_padre', 'id_padre', { unique: false });
        objStore.createIndex('usar_herencia', 'usar_herencia', { unique: false });

        objStore = db.createObjectStore('encargado_venta', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_persona', 'id_persona', { unique: false });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('codigo', 'codigo', { unique: false });
        objStore.createIndex('activo', 'activo', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });



        objStore = db.createObjectStore('gl_persona', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('nombre_completo', 'nombre_completo', { unique: false });
        objStore.createIndex('apellido_paterno', 'apellido_paterno', { unique: false });
        objStore.createIndex('apellido_materno', 'apellido_materno', { unique: false });
        objStore.createIndex('apellido_casada', 'apellido_casada', { unique: false });
        objStore.createIndex('nombres', 'nombres', { unique: false });
        objStore.createIndex('segundo_nombre', 'segundo_nombre', { unique: false });
        objStore.createIndex('direccion', 'direccion', { unique: false });
        objStore.createIndex('telefono', 'telefono', { unique: false });
        objStore.createIndex('imagen', 'imagen', { unique: false });
        objStore.createIndex('fecha_nacimiento', 'fecha_nacimiento', { unique: false });
        objStore.createIndex('lugar_nacimiento', 'lugar_nacimiento', { unique: false });
        objStore.createIndex('profesion', 'profesion', { unique: false });
        objStore.createIndex('correo_electronico', 'correo_electronico', { unique: false });
        objStore.createIndex('ci', 'ci', { unique: false });
        objStore.createIndex('genero', 'genero', { unique: false });
        objStore.createIndex('telefono_movil', 'telefono_movil', { unique: false });
        objStore.createIndex('lenguaje', 'lenguaje', { unique: false });
        objStore.createIndex('grado_academico', 'grado_academico', { unique: false });
        objStore.createIndex('pais_nacimiento', 'pais_nacimiento', { unique: false });
        objStore.createIndex('ciudad_nacimiento', 'ciudad_nacimiento', { unique: false });
        objStore.createIndex('provincia_nacimiento', 'provincia_nacimiento', { unique: false });
        objStore.createIndex('localidad_nacimiento', 'localidad_nacimiento', { unique: false });
        objStore.createIndex('direccion_provincia', 'direccion_provincia', { unique: false });
        objStore.createIndex('direccion_ciudad', 'direccion_ciudad', { unique: false });
        objStore.createIndex('direccion_localidad', 'direccion_localidad', { unique: false });
        objStore.createIndex('direccion_zona', 'direccion_zona', { unique: false });
        objStore.createIndex('direccion_numero', 'direccion_numero', { unique: false });
        objStore.createIndex('firma', 'firma', { unique: false });
        objStore.createIndex('activo', 'activo', { unique: false });
        objStore.createIndex('estado_civil', 'estado_civil', { unique: false });
        objStore.createIndex('expedido', 'expedido', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('agil_proveedor', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('codigo', 'codigo', { unique: false });
        objStore.createIndex('razon_social', 'razon_social', { unique: false });
        objStore.createIndex('nit', 'nit', { unique: false });
        objStore.createIndex('direccion', 'direccion', { unique: false });
        objStore.createIndex('telefono1', 'telefono1', { unique: false });
        objStore.createIndex('telefono2', 'telefono2', { unique: false });
        objStore.createIndex('email', 'email', { unique: false });
        objStore.createIndex('contacto', 'contacto', { unique: false });
        objStore.createIndex('rubro', 'rubro', { unique: false });
        objStore.createIndex('categoria', 'categoria', { unique: false });
        objStore.createIndex('ubicacion_geografica', 'ubicacion_geografica', { unique: false });
        objStore.createIndex('fecha1', 'fecha1', { unique: false });
        objStore.createIndex('fecha2', 'fecha2', { unique: false });
        objStore.createIndex('texto1', 'texto1', { unique: false });
        objStore.createIndex('texto2', 'texto2', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('documento_nit', 'documento_nit', { unique: false });
        objStore.createIndex('documento_funda_empresa', 'documento_funda_empresa', { unique: false });
        objStore.createIndex('documento_ci', 'documento_ci', { unique: false });
        objStore.createIndex('documento_licencia_funcionamiento', 'documento_licencia_funcionamiento', { unique: false });
        objStore.createIndex('documento_seguro_social', 'documento_seguro_social', { unique: false });
        objStore.createIndex('productos', 'productos', { unique: false });
        objStore.createIndex('estado', 'estado', { unique: false });

        objStore = db.createObjectStore('agil_sucursal', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('numero', 'numero', { unique: false });
        objStore.createIndex('direccion', 'direccion', { unique: false });
        objStore.createIndex('telefono1', 'telefono1', { unique: false });
        objStore.createIndex('telefono2', 'telefono2', { unique: false });
        objStore.createIndex('telefono3', 'telefono3', { unique: false });
        objStore.createIndex('id_departamento', 'id_departamento', { unique: false });
        objStore.createIndex('id_municipio', 'id_municipio', { unique: false });
        objStore.createIndex('nota_venta_correlativo', 'nota_venta_correlativo', { unique: false });
        objStore.createIndex('nota_traspaso_correlativo', 'nota_traspaso_correlativo', { unique: false });
        objStore.createIndex('nota_baja_correlativo', 'nota_baja_correlativo', { unique: false });
        objStore.createIndex('pedido_correlativo', 'pedido_correlativo', { unique: false });
        objStore.createIndex('frase_pedido', 'frase_pedido', { unique: false });
        objStore.createIndex('copias_impresion_pedido', 'copias_impresion_pedido', { unique: false });
        objStore.createIndex('nota_recibo_correlativo', 'nota_recibo_correlativo', { unique: false });
        objStore.createIndex('imprimir_pedido_corto', 'imprimir_pedido_corto', { unique: false });
        objStore.createIndex('cotizacion_correlativo', 'cotizacion_correlativo', { unique: false });
        objStore.createIndex('pre_factura_correlativo', 'pre_factura_correlativo', { unique: false });
        objStore.createIndex('comprobante_ingreso_correlativo', 'comprobante_ingreso_correlativo', { unique: false });
        objStore.createIndex('comprobante_egreso_correlativo', 'comprobante_egreso_correlativo', { unique: false });
        objStore.createIndex('comprobante_traspaso_correlativo', 'comprobante_traspaso_correlativo', { unique: false });
        objStore.createIndex('comprobante_caja_chica_correlativo', 'comprobante_caja_chica_correlativo', { unique: false });
        objStore.createIndex('reiniciar_comprobante_ingreso_correlativo', 'reiniciar_comprobante_ingreso_correlativo', { unique: false });
        objStore.createIndex('reiniciar_comprobante_egreso_correlativo', 'reiniciar_comprobante_egreso_correlativo', { unique: false });
        objStore.createIndex('reiniciar_comprobante_traspaso_correlativo', 'reiniciar_comprobante_traspaso_correlativo', { unique: false });
        objStore.createIndex('reiniciar_comprobante_caja_chica_correlativo', 'reiniciar_comprobante_caja_chica_correlativo', { unique: false });
        objStore.createIndex('fecha_reinicio_correlativo', 'fecha_reinicio_correlativo', { unique: false });
        objStore.createIndex('nota_venta_farmacia_correlativo', 'nota_venta_farmacia_correlativo', { unique: false });
        objStore.createIndex('despacho_correlativo', 'despacho_correlativo', { unique: false });
        objStore.createIndex('despacho_recivo_correlativo', 'despacho_recivo_correlativo', { unique: false });
        objStore.createIndex('ropa_trabajo_correlativo', 'ropa_trabajo_correlativo', { unique: false });
        objStore.createIndex('correlativo_proforma', 'correlativo_proforma', { unique: false });
        objStore.createIndex('caja_chica_ingreso_correlativo', 'caja_chica_ingreso_correlativo', { unique: false });
        objStore.createIndex('caja_chica_egreso_correlativo', 'caja_chica_egreso_correlativo', { unique: false });
        objStore.createIndex('anticipo_cliente_correlativo', 'anticipo_cliente_correlativo', { unique: false });
        objStore.createIndex('anticipo_proveedor_correlativo', 'anticipo_proveedor_correlativo', { unique: false });
        objStore.createIndex('anticipo_compensacion_cliente_correlativo', 'anticipo_compensacion_cliente_correlativo', { unique: false });
        objStore.createIndex('anticipo_compensacion_proveedor_correlativo', 'anticipo_compensacion_proveedor_correlativo', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('vale_caja_chica_correlativo', 'vale_caja_chica_correlativo', { unique: false });
        objStore.createIndex('numero_rendicion_fondo_gasto_correlativo', 'numero_rendicion_fondo_gasto_correlativo', { unique: false });
        objStore.createIndex('numero_correlativo_prestamo_rrhh', 'numero_correlativo_prestamo_rrhh', { unique: false });
        objStore.createIndex('numero_correlativo_caja_chica_incremento', 'numero_correlativo_caja_chica_incremento', { unique: false });
        objStore.createIndex('numero_correlativo_ot', 'numero_correlativo_ot', { unique: false });
        objStore.createIndex('numero_correlativo_ot_mecanica', 'numero_correlativo_ot_mecanica', { unique: false });
        objStore.createIndex('numero_correlativo_ot_chaperia', 'numero_correlativo_ot_chaperia', { unique: false });
        objStore.createIndex('numero_correlativo_modulo_pedido', 'numero_correlativo_modulo_pedido', { unique: false });
        objStore.createIndex('numero_correlativo_reposicion_almacen', 'numero_correlativo_reposicion_almacen', { unique: false });
        objStore.createIndex('numero_correlativo_solicitud_almacen', 'numero_correlativo_solicitud_almacen', { unique: false });
        objStore.createIndex('numero_correlativo_devolucion_item', 'numero_correlativo_devolucion_item', { unique: false });
        objStore.createIndex('numero_correlativo_reposicion_item', 'numero_correlativo_reposicion_item', { unique: false });
        objStore.createIndex('numero_correlativo_ingreso_por_ajuste', 'numero_correlativo_ingreso_por_ajuste', { unique: false });
        objStore.createIndex('activo', 'activo', { unique: false });
        objStore.createIndex('numero_correlativo_orden_servicio', 'numero_correlativo_orden_servicio', { unique: false });
        objStore.createIndex('numero_correlativo_ingreso_produccion', 'numero_correlativo_ingreso_produccion', { unique: false });

        objStore = db.createObjectStore('agil_sucursal_actividad_dosificacion', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_sucursal', 'id_sucursal', { unique: false });
        objStore.createIndex('actividad', 'actividad', { unique: false });
        objStore.createIndex('dosificacion', 'dosificacion', { unique: false });
        objStore.createIndex('expirado', 'expirado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('cuenta', 'cuenta', { unique: false });
        objStore.createIndex('cuenta_caja_banco', 'cuenta_caja_banco', { unique: false });

        objStore = db.createObjectStore('agil_almacen', { keyPath: 'id', autoIncrement: true });


        objStore.createIndex('id_sucursal', 'id_sucursal', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('numero', 'numero', { unique: false });
        objStore.createIndex('direccion', 'direccion', { unique: false });
        objStore.createIndex('telefono', 'telefono', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('numero_correlativo_iso_compra', 'numero_correlativo_iso_compra', { unique: false });
        objStore.createIndex('numero_correlativo_iso_consumo', 'numero_correlativo_iso_consumo', { unique: false });
        objStore.createIndex('numero_correlativo_iso_orden_compra', 'numero_correlativo_iso_orden_compra', { unique: false });
        objStore.createIndex('numero_correlativo_iso_traspaso_salida', 'numero_correlativo_iso_traspaso_salida', { unique: false });
        objStore.createIndex('numero_correlativo_iso_dotacion_ropa', 'numero_correlativo_iso_dotacion_ropa', { unique: false });
        objStore.createIndex('numero_correlativo_iso_baja', 'numero_correlativo_iso_baja', { unique: false });
        objStore.createIndex('numero_correlativo_iso_orden_servicio', 'numero_correlativo_iso_orden_servicio', { unique: false });
        objStore.createIndex('cuenta', 'cuenta', { unique: false });
        objStore.createIndex('correlativo_iso_gestion_recepcion', 'correlativo_iso_gestion_recepcion', { unique: false });
        objStore.createIndex('correlativo_iso_gestion_envio', 'correlativo_iso_gestion_envio', { unique: false });

        objStore = db.createObjectStore('inv_vendedor_venta', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_persona', 'id_persona', { unique: false });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('codigo', 'codigo', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_venta', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_almacen', 'id_almacen', { unique: false });
        objStore.createIndex('id_actividad', 'id_actividad', { unique: false });
        objStore.createIndex('id_cliente', 'id_cliente', { unique: false });
        objStore.createIndex('id_movimiento', 'id_movimiento', { unique: false });
        objStore.createIndex('factura', 'factura', { unique: false });
        objStore.createIndex('autorizacion', 'autorizacion', { unique: false });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('fecha_limite_emision', 'fecha_limite_emision', { unique: false });
        objStore.createIndex('codigo_control', 'codigo_control', { unique: false });
        objStore.createIndex('importe', 'importe', { unique: false });
        objStore.createIndex('id_tipo_pago', 'id_tipo_pago', { unique: false });
        objStore.createIndex('dias_credito', 'dias_credito', { unique: false });
        objStore.createIndex('a_cuenta', 'a_cuenta', { unique: false });
        objStore.createIndex('saldo', 'saldo', { unique: false });
        objStore.createIndex('total', 'total', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('usuario', 'usuario', { unique: false });
        objStore.createIndex('activa', 'activa', { unique: false });
        objStore.createIndex('pagado', 'pagado', { unique: false });
        objStore.createIndex('cambio', 'cambio', { unique: false });
        objStore.createIndex('id_almacen_traspaso', 'id_almacen_traspaso', { unique: false });
        objStore.createIndex('pedido', 'pedido', { unique: false });
        objStore.createIndex('despachado', 'despachado', { unique: false });
        objStore.createIndex('cierre_caja', 'cierre_caja', { unique: false });
        objStore.createIndex('id_vendedor', 'id_vendedor', { unique: false });
        objStore.createIndex('contabilizado', 'contabilizado', { unique: false });
        objStore.createIndex('usar_servicios', 'usar_servicios', { unique: false });
        objStore.createIndex('observacion', 'observacion', { unique: false });
        objStore.createIndex('id_sucursal', 'id_sucursal', { unique: false });
        objStore.createIndex('tipo_movimiento', 'tipo_movimiento', { unique: false });
        objStore.createIndex('total_recargo', 'total_recargo', { unique: false });
        objStore.createIndex('total_ice', 'total_ice', { unique: false });
        objStore.createIndex('total_exento', 'total_exento', { unique: false });
        objStore.createIndex('importe_dolares', 'importe_dolares', { unique: false });
        objStore.createIndex('total_dolares', 'total_dolares', { unique: false });
        objStore.createIndex('ver_dolares', 'ver_dolares', { unique: false });
        objStore.createIndex('descuento_general_dolares', 'descuento_general_dolares', { unique: false });
        objStore.createIndex('total_recargo_dolares', 'total_recargo_dolares', { unique: false });
        objStore.createIndex('total_ice_dolares', 'total_ice_dolares', { unique: false });
        objStore.createIndex('total_excento_dolares', 'total_excento_dolares', { unique: false });
        objStore.createIndex('pagado_dolares', 'pagado_dolares', { unique: false });
        objStore.createIndex('saldo_dolares', 'saldo_dolares', { unique: false });
        objStore.createIndex('cambio_dolares', 'cambio_dolares', { unique: false });
        objStore.createIndex('a_cuenta_dolares', 'a_cuenta_dolares', { unique: false });
        objStore.createIndex('descuento_general', 'descuento_general', { unique: false });
        objStore.createIndex('mesero', 'mesero', { unique: false });
        objStore.createIndex('mesa', 'mesa', { unique: false });
        objStore.createIndex('mesa_activa', 'mesa_activa', { unique: false });
        objStore.createIndex('liquidacion', 'liquidacion', { unique: false });
        objStore.createIndex('cierre_caja_mesero', 'cierre_caja_mesero', { unique: false });
        objStore.createIndex('numero_tarjeta_credito', 'numero_tarjeta_credito', { unique: false });
        objStore.createIndex('monto_tarjeta_credito', 'monto_tarjeta_credito', { unique: false });
        objStore.createIndex('usar_descuento_general', 'usar_descuento_general', { unique: false });
        objStore.createIndex('tipo_descuento', 'tipo_descuento', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('tipo_recargo', 'tipo_recargo', { unique: false });
        objStore.createIndex('recargo', 'recargo', { unique: false });
        objStore.createIndex('ice', 'ice', { unique: false });
        objStore.createIndex('excento', 'excento', { unique: false });
        objStore.createIndex('observacion_traspaso', 'observacion_traspaso', { unique: false });
        objStore.createIndex('numero_iso_traspaso', 'numero_iso_traspaso', { unique: false });
        objStore.createIndex('id_movimiento_eliminado', 'id_movimiento_eliminado', { unique: false });
        objStore.createIndex('confirmar_traspaso', 'confirmar_traspaso', { unique: false });
        objStore.createIndex('config_doc_iso', 'config_doc_iso', { unique: false });
        objStore.createIndex('numero_iso_baja', 'numero_iso_baja', { unique: false });
        objStore.createIndex('id_comprobante', 'id_comprobante', { unique: false });
        objStore.createIndex('campamento_sincronizado', 'campamento_sincronizado', { unique: false });
        objStore.createIndex('fecha_sincronizado', 'fecha_sincronizado', { unique: false });

        objStore = db.createObjectStore('inv_detalle_venta', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_venta', 'id_venta', { unique: false });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('precio_unitario', 'precio_unitario', { unique: false });
        objStore.createIndex('cantidad', 'cantidad', { unique: false });
        objStore.createIndex('importe', 'importe', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('recargo', 'recargo', { unique: false });
        objStore.createIndex('ice', 'ice', { unique: false });
        objStore.createIndex('excento', 'excento', { unique: false });
        objStore.createIndex('tipo_descuento', 'tipo_descuento', { unique: false });
        objStore.createIndex('tipo_recargo', 'tipo_recargo', { unique: false });
        objStore.createIndex('total', 'total', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('fecha_vencimiento', 'fecha_vencimiento', { unique: false });
        objStore.createIndex('lote', 'lote', { unique: false });
        objStore.createIndex('inventario', 'inventario', { unique: false });
        objStore.createIndex('observaciones', 'observaciones', { unique: false });
        objStore.createIndex('servicio', 'servicio', { unique: false });
        objStore.createIndex('precio_unitario_dolares', 'precio_unitario_dolares', { unique: false });
        objStore.createIndex('importe_dolares', 'importe_dolares', { unique: false });
        objStore.createIndex('total_dolares', 'total_dolares', { unique: false });
        objStore.createIndex('descuento_dolares', 'descuento_dolares', { unique: false });
        objStore.createIndex('recargo_dolares', 'recargo_dolares', { unique: false });
        objStore.createIndex('ice_dolares', 'ice_dolares', { unique: false });
        objStore.createIndex('excento_dolares', 'excento_dolares', { unique: false });
        objStore.createIndex('promocion', 'promocion', { unique: false });
        objStore.createIndex('promocion_puntaje', 'promocion_puntaje', { unique: false });
        objStore.createIndex('cambio_item', 'cambio_item', { unique: false });

        objStore = db.createObjectStore('inv_detalle_venta_no_consolidada', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_venta', 'id_venta', { unique: false });
        objStore.createIndex('id_cliente', 'id_cliente', { unique: false });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('precio_unitario', 'precio_unitario', { unique: false });
        objStore.createIndex('cantidad', 'cantidad', { unique: false });
        objStore.createIndex('importe', 'importe', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('recargo', 'recargo', { unique: false });
        objStore.createIndex('ice', 'ice', { unique: false });
        objStore.createIndex('excento', 'excento', { unique: false });
        objStore.createIndex('tipo_descuento', 'tipo_descuento', { unique: false });
        objStore.createIndex('tipo_recargo', 'tipo_recargo', { unique: false });
        objStore.createIndex('total', 'total', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_detalle_venta_producto_devolucion', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_detalle_venta', 'id_detalle_venta', { unique: false });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('entrega', 'entrega', { unique: false });
        objStore.createIndex('recibe', 'recibe', { unique: false });
        objStore.createIndex('observaciones', 'observaciones', { unique: false });
        objStore.createIndex('numero_documento', 'numero_documento', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_detalle_venta_producto_final', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_detalle_venta', 'id_detalle_venta', { unique: false });
        objStore.createIndex('id_detalle_movimiento', 'id_detalle_movimiento', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_detalle_venta_producto_reposicion', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('detalle_venta', 'detalle_venta', { unique: false });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('entrega', 'entrega', { unique: false });
        objStore.createIndex('recibe', 'recibe', { unique: false });
        objStore.createIndex('numero_serie', 'numero_serie', { unique: false });
        objStore.createIndex('observaciones', 'observaciones', { unique: false });
        objStore.createIndex('numero_documento', 'numero_documento', { unique: false });
        objStore.createIndex('id_tipo_reposicion', 'id_tipo_reposicion', { unique: false });
        objStore.createIndex('id_producto_cambio', 'id_producto_cambio', { unique: false });
        objStore.createIndex('precio_venta', 'precio_venta', { unique: false });
        objStore.createIndex('monto', 'monto', { unique: false });
        objStore.createIndex('monto_faltante', 'monto_faltante', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_inventario', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_almacen', 'id_almacen', { unique: false });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('cantidad', 'cantidad', { unique: false });
        objStore.createIndex('costo_unitario', 'costo_unitario', { unique: false });
        objStore.createIndex('costo_unitario_dolares', 'costo_unitario_dolares', { unique: false });
        objStore.createIndex('costo_total', 'costo_total', { unique: false });
        objStore.createIndex('costo_total_dolares', 'costo_total_dolares', { unique: false });
        objStore.createIndex('fecha_vencimiento', 'fecha_vencimiento', { unique: false });
        objStore.createIndex('lote', 'lote', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('costo_unitario_neto', 'costo_unitario_neto', { unique: false });

        objStore = db.createObjectStore('inv_movimiento', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_tipo', 'id_tipo', { unique: false });
        objStore.createIndex('id_clase', 'id_clase', { unique: false });
        objStore.createIndex('id_almacen', 'id_almacen', { unique: false });
        objStore.createIndex('fecha', 'fecha', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('inv_detalle_movimiento', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('producto', 'producto', { unique: false });
        objStore.createIndex('movimiento', 'movimiento', { unique: false });
        objStore.createIndex('costo_unitario', 'costo_unitario', { unique: false });
        objStore.createIndex('cantidad', 'cantidad', { unique: false });
        objStore.createIndex('importe', 'importe', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('recargo', 'recargo', { unique: false });
        objStore.createIndex('ice', 'ice', { unique: false });
        objStore.createIndex('excento', 'excento', { unique: false });
        objStore.createIndex('tipo_descuento', 'tipo_descuento', { unique: false });
        objStore.createIndex('tipo_recargo', 'tipo_recargo', { unique: false });
        objStore.createIndex('total', 'total', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('fecha_vencimiento', 'fecha_vencimiento', { unique: false });
        objStore.createIndex('lote', 'lote', { unique: false });
        objStore.createIndex('inventario', 'inventario', { unique: false });
        objStore.createIndex('costo_unitario_dolares', 'costo_unitario_dolares', { unique: false });
        objStore.createIndex('importe_dolares', 'importe_dolares', { unique: false });
        objStore.createIndex('total_dolares', 'total_dolares', { unique: false });
        objStore.createIndex('descuento_dolares', 'descuento_dolares', { unique: false });
        objStore.createIndex('recargo_dolares', 'recargo_dolares', { unique: false });
        objStore.createIndex('ice_dolares', 'ice_dolares', { unique: false });
        objStore.createIndex('excento_dolares', 'excento_dolares', { unique: false });


        objStore = db.createObjectStore('agil_configuracion_venta_vista', { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('mostrar_producto', 'mostrar_producto', { unique: false });
        objStore.createIndex('mostrar_codigo_producto', 'mostrar_codigo_producto', { unique: false });
        objStore.createIndex('mostrar_unidad_producto', 'mostrar_unidad_producto', { unique: false });
        objStore.createIndex('mostrar_precio_unitario', 'mostrar_precio_unitario', { unique: false });
        objStore.createIndex('mostrar_cantidad', 'mostrar_cantidad', { unique: false });
        objStore.createIndex('mostrar_importe', 'mostrar_importe', { unique: false });
        objStore.createIndex('mostrar_descuento', 'mostrar_descuento', { unique: false });
        objStore.createIndex('mostrar_recargo', 'mostrar_recargo', { unique: false });
        objStore.createIndex('mostrar_ice', 'mostrar_ice', { unique: false });
        objStore.createIndex('mostrar_excento', 'mostrar_excento', { unique: false });
        objStore.createIndex('mostrar_total', 'mostrar_total', { unique: false });
        objStore.createIndex('mostrar_fecha_vencimiento', 'mostrar_fecha_vencimiento', { unique: false });
        objStore.createIndex('mostrar_lote', 'mostrar_lote', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('sys_usuario_aplicacion_opcion', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_usuario_aplicacion', 'id_usuario_aplicacion', { unique: false });
        objStore.createIndex('id_opcion_aplicacion', 'id_opcion_aplicacion', { unique: false });
        objStore.createIndex('puede_ver', 'puede_ver', { unique: false });
        objStore.createIndex('puede_crear', 'puede_crear', { unique: false });
        objStore.createIndex('puede_modificar', 'puede_modificar', { unique: false });
        objStore.createIndex('puede_eliminar', 'puede_eliminar', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('sys_opcion_aplicacion', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('aplicacion', 'aplicacion', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('agil_usuario_sucursal', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_usuario', 'id_usuario', { unique: false });
        objStore.createIndex('id_sucursal', 'id_sucursal', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('agil_servicio_venta', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('precio', 'precio', { unique: false });
        objStore.createIndex('descripcion', 'descripcion', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('descuento_fijo', 'descuento_fijo', { unique: false });
        objStore.createIndex('habilitado', 'habilitado', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        objStore = db.createObjectStore('agil_producto', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('imagen', 'imagen', { unique: false });
        objStore.createIndex('codigo', 'codigo', { unique: false });
        objStore.createIndex('unidad_medida', 'unidad_medida', { unique: false });
        objStore.createIndex('precio_unitario', 'precio_unitario', { unique: false });
        objStore.createIndex('utilidad_esperada', 'utilidad_esperada', { unique: false });
        objStore.createIndex('inventario_minimo', 'inventario_minimo', { unique: false });
        objStore.createIndex('descripcion', 'descripcion', { unique: false });
        objStore.createIndex('id_grupo', 'id_grupo', { unique: false });
        objStore.createIndex('id_subgrupo', 'id_subgrupo', { unique: false });
        objStore.createIndex('caracteristica_especial1', 'caracteristica_especial1', { unique: false });
        objStore.createIndex('caracteristica_especial2', 'caracteristica_especial2', { unique: false });
        objStore.createIndex('codigo_fabrica', 'codigo_fabrica', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('comision', 'comision', { unique: false });
        objStore.createIndex('publicar_panel', 'publicar_panel', { unique: false });
        objStore.createIndex('alerta', 'alerta', { unique: false });
        objStore.createIndex('descuento', 'descuento', { unique: false });
        objStore.createIndex('descuento_fijo', 'descuento_fijo', { unique: false });
        objStore.createIndex('tipo_producto', 'tipo_producto', { unique: false });
        objStore.createIndex('activar_inventario', 'activar_inventario', { unique: false });
        objStore.createIndex('marca', 'marca', { unique: false });
        objStore.createIndex('modelo', 'modelo', { unique: false });
        objStore.createIndex('anio', 'anio', { unique: false });
        objStore.createIndex('almacen_erp', 'almacen_erp', { unique: false });
        objStore.createIndex('id_cuenta', 'id_cuenta', { unique: false });
        objStore.createIndex('rango_positivo', 'rango_positivo', { unique: false });
        objStore.createIndex('rango_negativo', 'rango_negativo', { unique: false });
        objStore.createIndex('activo_fijo', 'activo_fijo', { unique: false });
        objStore.createIndex('precio_unitario_dolares', 'precio_unitario_dolares', { unique: false });
        objStore.createIndex('usar_promocion', 'usar_promocion', { unique: false });
        objStore.createIndex('restar_solo_despacho', 'restar_solo_despacho', { unique: false });
        objStore.createIndex('usar_promocion_en_dias_habilitados', 'usar_promocion_en_dias_habilitados', { unique: false });
        objStore.createIndex('cantidad_prestacion_compra', 'cantidad_prestacion_compra', { unique: false });
        objStore.createIndex('indice_rotacion', 'indice_rotacion', { unique: false });
        objStore.createIndex('unidad_economica', 'unidad_economica', { unique: false });
        objStore.createIndex('id_relacion', 'id_relacion', { unique: false });
        objStore.createIndex('combo', 'combo', { unique: false });
        objStore.createIndex('sujeto_mantenimiento', 'sujeto_mantenimiento', { unique: false });
        objStore.createIndex('usar_herencia', 'usar_herencia', { unique: false });
        objStore.createIndex('id_ambiente', 'id_ambiente', { unique: false });


        objStore = db.createObjectStore('agil_producto_base', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('producto_base', 'producto_base', { unique: false });
        objStore.createIndex('formulacion', 'formulacion', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('habilitar_cambio', 'habilitar_cambio', { unique: false });


        objStore = db.createObjectStore('agil_producto_padre', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('id_producto_padre', 'id_producto_padre', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });


        objStore = db.createObjectStore('agil_producto_precio_por_sucursal', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('id_sucursal', 'id_sucursal', { unique: false });
        objStore.createIndex('precio_unitario', 'precio_unitario', { unique: false });
        objStore.createIndex('rango_positivo', 'rango_positivo', { unique: false });
        objStore.createIndex('rango_negativo', 'rango_negativo', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });


        objStore = db.createObjectStore('agil_producto_promocion', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('dia', 'dia', { unique: false });
        objStore.createIndex('nombre', 'nombre', { unique: false });
        objStore.createIndex('habilitado', 'habilitado', { unique: false });
        objStore.createIndex('tipo_promocion', 'tipo_promocion', { unique: false });
        objStore.createIndex('hora_inicio', 'hora_inicio', { unique: false });
        objStore.createIndex('hora_fin', 'hora_fin', { unique: false });
        objStore.createIndex('precio', 'precio', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });


        objStore = db.createObjectStore('agil_producto_promocion_puntaje', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('dia', 'dia', { unique: false });
        objStore.createIndex('fecha_inicio', 'fecha_inicio', { unique: false });
        objStore.createIndex('fecha_fin', 'fecha_fin', { unique: false });
        objStore.createIndex('habilitado', 'habilitado', { unique: false });
        objStore.createIndex('tipo_promocion', 'tipo_promocion', { unique: false });
        objStore.createIndex('hora_inicio', 'hora_inicio', { unique: false });
        objStore.createIndex('hora_fin', 'hora_fin', { unique: false });
        objStore.createIndex('puntaje', 'puntaje', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });


        objStore = db.createObjectStore('agil_producto_tipo_precio', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_producto', 'id_producto', { unique: false });
        objStore.createIndex('tipo_precio', 'tipo_precio', { unique: false });
        objStore.createIndex('precio_unitario', 'precio_unitario', { unique: false });
        objStore.createIndex('rango_positivo', 'rango_positivo', { unique: false });
        objStore.createIndex('rango_negativo', 'rango_negativo', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('precio_unitario_dolares', 'precio_unitario_dolares', { unique: false });
        objStore.createIndex('rango_negativo_dolares', 'rango_negativo_dolares', { unique: false });
        objStore.createIndex('rango_positivo_dolares', 'rango_positivo_dolares', { unique: false });
        objStore.createIndex('sucursal', 'sucursal', { unique: false });

        objStore = db.createObjectStore('agil_cliente', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('codigo', 'codigo', { unique: false });
        objStore.createIndex('razon_social', 'razon_social', { unique: false });
        objStore.createIndex('nit', 'nit', { unique: false });
        objStore.createIndex('direccion', 'direccion', { unique: false });
        objStore.createIndex('telefono1', 'telefono1', { unique: false });
        objStore.createIndex('telefono2', 'telefono2', { unique: false });
        objStore.createIndex('telefono3', 'telefono3', { unique: false });
        objStore.createIndex('contacto', 'contacto', { unique: false });
        objStore.createIndex('rubro', 'rubro', { unique: false });
        objStore.createIndex('categoria', 'categoria', { unique: false });
        objStore.createIndex('ubicacion_geografica', 'ubicacion_geografica', { unique: false });
        objStore.createIndex('fecha1', 'fecha1', { unique: false });
        objStore.createIndex('fecha2', 'fecha2', { unique: false });
        objStore.createIndex('texto1', 'texto1', { unique: false });
        objStore.createIndex('texto2', 'texto2', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        objStore.createIndex('latitud', 'latitud', { unique: false });
        objStore.createIndex('longitud', 'longitud', { unique: false });
        objStore.createIndex('documento_nit', 'documento_nit', { unique: false });
        objStore.createIndex('documento_funda_empresa', 'documento_funda_empresa', { unique: false });
        objStore.createIndex('documento_ci', 'documento_ci', { unique: false });
        objStore.createIndex('documento_licencia_funcionamiento', 'documento_licencia_funcionamiento', { unique: false });
        objStore.createIndex('documento_seguro_social', 'documento_seguro_social', { unique: false });
        objStore.createIndex('linea_credito', 'linea_credito', { unique: false });
        objStore.createIndex('plazo_credito', 'plazo_credito', { unique: false });
        objStore.createIndex('usar_limite_credito', 'usar_limite_credito', { unique: false });
        objStore.createIndex('bloquear_limite_credito', 'bloquear_limite_credito', { unique: false });
        objStore.createIndex('id_tipo_precio_venta', 'id_tipo_precio_venta', { unique: false });

        objStore = db.createObjectStore('agil_actividades_economicas', { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('actividad', 'actividad', { unique: false });
        objStore.createIndex('id_empresa', 'id_empresa', { unique: false });
        objStore.createIndex('eliminado', 'eliminado', { unique: false });
        objStore.createIndex('createdAt', 'createdAt', { unique: false });
        objStore.createIndex('updatedAt', 'updatedAt', { unique: false });

        /* inicio tablas facturacion electronica */

        objStore = db.createObjectStore(`sfe_actividad_documento_sector`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoCaeb`, `codigoCaeb`, { unique: false });
        objStore.createIndex(`codigoTipoDocSector`, `codigoTipoDocSector`, { unique: false });
        objStore.createIndex(`tipoDocumentoSector`, `tipoDocumentoSector`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });

        //Table structure for sfe_factura

        objStore = db.createObjectStore(`sfe_factura`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex('idSucursal', 'idSucursal', { unique: false });
        objStore.createIndex('idEmpresa', 'idEmpresa', { unique: false });
        objStore.createIndex('actividadEconomica', 'actividadEconomica', { unique: false });
        objStore.createIndex('nitEmisor', 'nitEmisor', { unique: false });
        objStore.createIndex('razonSocialEmisor', 'razonSocialEmisor', { unique: false });
        objStore.createIndex('municipio', 'municipio', { unique: false });
        objStore.createIndex('telefono', 'telefono', { unique: false });
        objStore.createIndex('numeroFactura', 'numeroFactura', { unique: false });
        objStore.createIndex('cuf', 'cuf', { unique: false });
        objStore.createIndex('cufd', 'cufd', { unique: false });
        objStore.createIndex('codigoSucursal', 'codigoSucursal', { unique: false });
        objStore.createIndex('codigoPuntoVenta', 'codigoPuntoVenta', { unique: false });
        objStore.createIndex('fechaEmision', 'fechaEmision', { unique: false });
        objStore.createIndex('nombreRazonSocial', 'nombreRazonSocial', { unique: false });
        objStore.createIndex('codigoTipoDocIdentidad', 'codigoTipoDocIdentidad', { unique: false });
        objStore.createIndex('numeroDocumento', 'numeroDocumento', { unique: false });
        objStore.createIndex('complemento', 'complemento', { unique: false });
        objStore.createIndex('codigoCliente', 'codigoCliente', { unique: false });
        objStore.createIndex('codigoMetodoPago', 'codigoMetodoPago', { unique: false });
        objStore.createIndex('numeroTarjeta', 'numeroTarjeta', { unique: false });
        objStore.createIndex('montoTotal', 'montoTotal', { unique: false });
        objStore.createIndex('montoTotalSujetoIva', 'montoTotalSujetoIva', { unique: false });
        objStore.createIndex('codigoTipoMoneda', 'codigoTipoMoneda', { unique: false });
        objStore.createIndex('tipoCambio', 'tipoCambio', { unique: false });
        objStore.createIndex('montoTotalMoneda', 'montoTotalMoneda', { unique: false });
        objStore.createIndex('montoGiftCard', 'montoGiftCard', { unique: false });
        objStore.createIndex('descuentoAdicional', 'descuentoAdicional', { unique: false });
        objStore.createIndex('codigoExcepcion', 'codigoExcepcion', { unique: false });
        objStore.createIndex('cafc', 'cafc', { unique: false });
        objStore.createIndex('leyenda', 'leyenda', { unique: false });
        objStore.createIndex('usuario', 'usuario', { unique: false });
        objStore.createIndex('codigoDocumentoSector', 'codigoDocumentoSector', { unique: false });
        objStore.createIndex('codigoTipoEmision', 'codigoTipoEmision', { unique: false });
        objStore.createIndex('codigoTipoFactura', 'codigoTipoFactura', { unique: false });
        objStore.createIndex('codigoMotivoAnulacion', 'codigoMotivoAnulacion', { unique: false });
        objStore.createIndex('codigoRecepcion', 'codigoRecepcion', { unique: false });
        objStore.createIndex('codigoEstado', 'codigoEstado', { unique: false });
        objStore.createIndex('estado', 'estado', { unique: false });

        //Table structure for sfe_Detalle_factura

        objStore = db.createObjectStore(`sfe_detalle_factura`, { keyPath: 'id', autoIncrement: true });

        objStore.createIndex('idFactura', 'idFactura', { unique: false });
        objStore.createIndex('actividadEconomica', 'actividadEconomica', { unique: false });
        objStore.createIndex('codigoProductoSin', 'codigoProductoSin', { unique: false });
        objStore.createIndex('codigoProducto', 'codigoProducto', { unique: false });
        objStore.createIndex('codigoUnidadMedida', 'codigoUnidadMedida', { unique: false });
        objStore.createIndex('descripcion', 'descripcion', { unique: false });
        objStore.createIndex('cantidad', 'cantidad', { unique: false });
        objStore.createIndex('unidadMedida', 'unidadMedida', { unique: false });
        objStore.createIndex('precioUnitario', 'precioUnitario', { unique: false });
        objStore.createIndex('montoDescuento', 'montoDescuento', { unique: false });
        objStore.createIndex('subTotal', 'subTotal', { unique: false });
        objStore.createIndex('numeroSerie', 'numeroSerie', { unique: false });
        objStore.createIndex('numeroImei', 'numeroImei', { unique: false });

        //Table structure for sfe_actividades

        objStore = db.createObjectStore(`sfe_actividades`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoCaeb`, `codigoCaeb`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`leyendaDefault`, `leyendaDefault`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });

        //Table structure for sfe_cufd

        objStore = db.createObjectStore(`sfe_cufd`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoCufd`, `codigoCufd`, { unique: false });
        objStore.createIndex(`idCuis`, `idCuis`, { unique: false });
        objStore.createIndex(`codigoControl`, `codigoControl`, { unique: false });
        objStore.createIndex(`fechaEmision`, `fechaEmision`, { unique: false });
        objStore.createIndex(`fechaVigencia`, `fechaVigencia`, { unique: false });


        //Table structure for sfe_cuis

        objStore = db.createObjectStore(`sfe_cuis`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoCuis`, `codigoCuis`, { unique: false });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idPos`, `idPos`, { unique: false });
        objStore.createIndex(`fechaVigencia`, `fechaVigencia`, { unique: false });
        objStore.createIndex(`periodo`, `periodo`, { unique: false });


        //Table structure for sfe_empresa

        objStore = db.createObjectStore(`sfe_empresa`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`empresa`, `empresa`, { unique: false });
        objStore.createIndex(`razonSocial`, `razonSocial`, { unique: false });
        objStore.createIndex(`nit`, `nit`, { unique: false });
        objStore.createIndex(`token`, `token`, { unique: false });
        objStore.createIndex(`codigoSistema`, `codigoSistema`, { unique: false });
        objStore.createIndex(`codigoAmbiente`, `codigoAmbiente`, { unique: false });
        objStore.createIndex(`codigoModalidad`, `codigoModalidad`, { unique: false });
        objStore.createIndex(`tokenSin`, `tokenSin`, { unique: false });
        objStore.createIndex(`firmaDigital`, `firmaDigital`, { unique: false });
        objStore.createIndex(`passwordFirma`, `passwordFirma`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`cufdAutomatico`, `cufdAutomatico`, { unique: false });


        //Table structure for sfe_empresa_actividad

        objStore = db.createObjectStore(`sfe_empresa_actividad`, { keyPath: 'id', autoIncrement: true });

        objStore.createIndex(`codigoCaeb`, `codigoCaeb`, { unique: false });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_motivo_anulacion

        objStore = db.createObjectStore(`sfe_empresa_motivo_anulacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoMotivoAnulacion`, `codigoMotivoAnulacion`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });





        //Table structure for sfe_empresa_producto_servicio


        objStore = db.createObjectStore(`sfe_empresa_producto_servicio`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoProducto`, `codigoProducto`, { unique: false });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });





        //Table structure for sfe_empresa_tipo_doc_identidad


        objStore = db.createObjectStore(`sfe_empresa_tipo_doc_identidad`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoDocIdentidad`, `codigoTipoDocIdentidad`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_doc_sector

        objStore = db.createObjectStore(`sfe_empresa_tipo_doc_sector`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoDocSector`, `codigoTipoDocSector`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_emision

        objStore = db.createObjectStore(`sfe_empresa_tipo_emision`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoEmision`, `codigoTipoEmision`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_evento

        objStore = db.createObjectStore(`sfe_empresa_tipo_evento`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoEvento`, `codigoTipoEvento`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_factura

        objStore = db.createObjectStore(`sfe_empresa_tipo_factura`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoFactura`, `codigoTipoFactura`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_habitacion

        objStore = db.createObjectStore(`sfe_empresa_tipo_habitacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoHabitacion`, `codigoTipoHabitacion`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_metodo_pago

        objStore = db.createObjectStore(`sfe_empresa_tipo_metodo_pago`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoMetodoPago`, `codigoTipoMetodoPago`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_moneda

        objStore = db.createObjectStore(`sfe_empresa_tipo_moneda`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoMoneda`, `codigoTipoMoneda`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_empresa_tipo_punto_venta

        objStore = db.createObjectStore(`sfe_empresa_tipo_punto_venta`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoPos`, `codigoTipoPos`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });
        objStore.createIndex(`correlativo`, `correlativo`, { unique: false });


        //Table structure for sfe_empresa_tipo_unidad_medida

        objStore = db.createObjectStore(`sfe_empresa_tipo_unidad_medida`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoTipoUnidadMedida`, `codigoTipoUnidadMedida`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`eliminado`, `eliminado`, { unique: false });


        //Table structure for sfe_eventos_significativos

        objStore = db.createObjectStore(`sfe_eventos_significativos`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`inicio`, `inicio`, { unique: false });
        objStore.createIndex(`fin`, `fin`, { unique: false });
        objStore.createIndex(`idTipoEventoSignif`, `idTipoEventoSignif`, { unique: false });
        objStore.createIndex(`idCufd`, `idCufd`, { unique: false });
        objStore.createIndex(`idCufdEvento`, `idCufdEvento`, { unique: false });
        objStore.createIndex(`codigoRecepcion`, `codigoRecepcion`, { unique: false });
        objStore.createIndex(`estado`, `estado`, { unique: false });


        //Table structure for sfe_leyenda

        objStore = db.createObjectStore(`sfe_leyenda`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_empresa`, `id_empresa`, { unique: false });
        objStore.createIndex(`codigoCaeb`, `codigoCaeb`, { unique: false });
        objStore.createIndex(`descripcionLeyenda`, `descripcionLeyenda`, { unique: false });


        //Table structure for sfe_motivos_anulacion

        objStore = db.createObjectStore(`sfe_motivos_anulacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoMotivoAnulacion`, `codigoMotivoAnulacion`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_producto_servicio

        objStore = db.createObjectStore(`sfe_producto_servicio`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoProducto`, `codigoProducto`, { unique: false });
        objStore.createIndex(`codigoCaeb`, `codigoCaeb`, { unique: false });
        objStore.createIndex(`descripcionProducto`, `descripcionProducto`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_punto_venta

        objStore = db.createObjectStore(`sfe_punto_venta`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`nombre`, `nombre`, { unique: false });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idTipoPuntoVenta`, `idTipoPuntoVenta`, { unique: false });
        objStore.createIndex(`codigo`, `codigo`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });


        //Table structure for sfe_sucursal

        objStore = db.createObjectStore(`sfe_sucursal`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`sucursal`, `sucursal`, { unique: false });
        objStore.createIndex(`nombre`, `nombre`, { unique: false });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`codigoSucursal`, `codigoSucursal`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });


        //Table structure for sfe_sucursal_actividad

        objStore = db.createObjectStore(`sfe_sucursal_actividad`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idEmpresaActividad`, `idEmpresaActividad`, { unique: false });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`leyendaDefault`, `leyendaDefault`, { unique: false });


        //Table structure for sfe_sucursal_motivo_anulacion

        objStore = db.createObjectStore(`sfe_sucursal_motivo_anulacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaMotivoAnulacion`, `idEmpresaMotivoAnulacion`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_doc_identidad

        objStore = db.createObjectStore(`sfe_sucursal_tipo_doc_identidad`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoDocIdentidad`, `idEmpresaTipoDocIdentidad`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_doc_sector

        objStore = db.createObjectStore(`sfe_sucursal_tipo_doc_sector`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoDocSector`, `idEmpresaTipoDocSector`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_emision

        objStore = db.createObjectStore(`sfe_sucursal_tipo_emision`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoEmision`, `idEmpresaTipoEmision`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_evento_signif

        objStore = db.createObjectStore(`sfe_sucursal_tipo_evento_signif`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoEvento`, `idEmpresaTipoEvento`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_factura

        objStore = db.createObjectStore(`sfe_sucursal_tipo_factura`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoFactura`, `idEmpresaTipoFactura`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_habitacion

        objStore = db.createObjectStore(`sfe_sucursal_tipo_habitacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoHabitacion`, `idEmpresaTipoHabitacion`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_metodo_pago

        objStore = db.createObjectStore(`sfe_sucursal_tipo_metodo_pago`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoMetodoPago`, `idEmpresaTipoMetodoPago`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_moneda

        objStore = db.createObjectStore(`sfe_sucursal_tipo_moneda`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoMoneda`, `idEmpresaTipoMoneda`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_punto_venta

        objStore = db.createObjectStore(`sfe_sucursal_tipo_punto_venta`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoPuntoVenta`, `idEmpresaTipoPuntoVenta`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_sucursal_tipo_unidad_medida

        objStore = db.createObjectStore(`sfe_sucursal_tipo_unidad_medida`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`idSucursal`, `idSucursal`, { unique: false });
        objStore.createIndex(`idEmpresaTipoUnidadMedida`, `idEmpresaTipoUnidadMedida`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_tipo_documento_identidad

        objStore = db.createObjectStore(`sfe_tipo_documento_identidad`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoTipoDocIdentidad`, `codigoTipoDocIdentidad`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_documento_sector

        objStore = db.createObjectStore(`sfe_tipo_documento_sector`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoTipoDocSector`, `codigoTipoDocSector`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_emision

        objStore = db.createObjectStore(`sfe_tipo_emision`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoTipoEmision`, `codigoTipoEmision`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_eventos_significativos

        objStore = db.createObjectStore(`sfe_tipo_eventos_significativos`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoTipoEvento`, `codigoTipoEvento`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_factura

        objStore = db.createObjectStore(`sfe_tipo_factura`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoTipoFactura`, `codigoTipoFactura`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_habitacion

        objStore = db.createObjectStore(`sfe_tipo_habitacion`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoTipoHabitacion`, `codigoTipoHabitacion`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_metodo_pago

        objStore = db.createObjectStore(`sfe_tipo_metodo_pago`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoTipoMetodoPago`, `codigoTipoMetodoPago`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });


        //Table structure for sfe_tipo_moneda

        objStore = db.createObjectStore(`sfe_tipo_moneda`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`id_sucursal`, `id_sucursal`, { unique: false });
        objStore.createIndex(`codigoTipoMoneda`, `codigoTipoMoneda`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_punto_venta

        objStore = db.createObjectStore(`sfe_tipo_punto_venta`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoTipoPos`, `codigoTipoPos`, { unique: false });
        objStore.createIndex(`puntoVenta`, `puntoVenta`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`isDefault`, `isDefault`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_tipo_unidad_medida

        objStore = db.createObjectStore(`sfe_tipo_unidad_medida`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`codigoTipoUnidadMedida`, `codigoTipoUnidadMedida`, { unique: false });
        objStore.createIndex(`descripcion`, `descripcion`, { unique: false });
        objStore.createIndex(`version`, `version`, { unique: false });


        //Table structure for sfe_usuario

        objStore = db.createObjectStore(`sfe_usuario`, { keyPath: 'id', autoIncrement: true });
        objStore.createIndex(`usuario`, `usuario`, { unique: false });
        objStore.createIndex(`idEmpresa`, `idEmpresa`, { unique: false });
        objStore.createIndex(`activo`, `activo`, { unique: false });



        /* fin tablas facturacion electronica */
        /*  
  
          objStore = db.createObjectStore('agil_activos_fijos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('fecha_ingreso', { unique: false });
          objStore.createIndex('revaluado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('ultima_actualizacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_activos_fijos_configuracion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('subgrupo', { unique: false });
          objStore.createIndex('vida_util', { unique: false });
          objStore.createIndex('factor', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_activos_fijos_valores', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('valor', { unique: false });
          objStore.createIndex('incremento_actualizacion', { unique: false });
          objStore.createIndex('valor_actualizado', { unique: false });
          objStore.createIndex('depreciacion_acumulada', { unique: false });
          objStore.createIndex('incremento_actualizacion_depreciacion_acumulada', { unique: false });
          objStore.createIndex('depreciacion_acumulada_actualizada', { unique: false });
          objStore.createIndex('depreciacion', { unique: false });
          objStore.createIndex('total_depreciacion_acumulada', { unique: false });
          objStore.createIndex('valor_neto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          
  
  
          objStore = db.createObjectStore('agil_area_costos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_asiento_contabilidad', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('comprobante', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('debe_bs', { unique: false });
          objStore.createIndex('haber_bs', { unique: false });
          objStore.createIndex('debe_sus', { unique: false });
          objStore.createIndex('haber_sus', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('glosa', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('saldo_cuenta_bs', { unique: false });
          objStore.createIndex('saldo_cuenta_sus', { unique: false });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('venta', { unique: false });
  
  
          objStore = db.createObjectStore('agil_asiento_contabilidad_centro_costo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_banco', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('tipo_cuenta', { unique: false });
          objStore.createIndex('tipo_moneda', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminar', { unique: false });
          objStore.createIndex('cuenta_sueldo', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('glosa_individual', { unique: false });
          objStore.createIndex('nit', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('solicitud', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('pagado', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('cerrada', { unique: false });
          objStore.createIndex('cierre_caja_chica', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('caja_chica_solicitud', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_centro_costo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('caja_chica', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_detalle_rendicion_fondo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('gasto', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('numero_factura_recargo', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('usar_factura', { unique: false });
          objStore.createIndex('rembolsado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('rendicion_fondo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('compra', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_detalle_rendicion_fondo_centro_costo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('detalle_rendicion_fondo', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_gasto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('nivel', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('combustible_recorrido', { unique: false });
          objStore.createIndex('usar_producto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_nivel_gasto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_chica_rendicion_fondo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('rendicion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_salida', { unique: false });
          objStore.createIndex('fecha_entrada', { unique: false });
          objStore.createIndex('odometro_salida', { unique: false });
          objStore.createIndex('odometro_entrada', { unique: false });
          objStore.createIndex('litros', { unique: false });
          objStore.createIndex('conductor', { unique: false });
          objStore.createIndex('vehiculo', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('solicitud', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('empresa', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_siguiente_turno', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('cierre_caja', { unique: false });
          objStore.createIndex('cierre_caja_cerrado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_caja_siguiente_turno-mesero', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('mesero_siguiente_turno', { unique: false });
          objStore.createIndex('cierre_caja_mesero', { unique: false });
          objStore.createIndex('cierre_caja_cerrado_mesero', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('curso', { unique: false });
          objStore.createIndex('duracion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('tipo_curso', { unique: false });
          objStore.createIndex('ponderacion', { unique: false });
          objStore.createIndex('certificado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_calificacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ponderacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('predefinido', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_certificado', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('modelo', { unique: false });
          objStore.createIndex('titulo', { unique: false });
          objStore.createIndex('texto_uno', { unique: false });
          objStore.createIndex('texto_dos', { unique: false });
          objStore.createIndex('plantilla', { unique: false });
          objStore.createIndex('imagen', { unique: false });
          objStore.createIndex('color_texto_uno', { unique: false });
          objStore.createIndex('color_subtitulo', { unique: false });
          objStore.createIndex('color_detalle_estudiante', { unique: false });
          objStore.createIndex('color_texto_dos', { unique: false });
          objStore.createIndex('color_nombre_docente', { unique: false });
          objStore.createIndex('color_subtitulo_docente', { unique: false });
          objStore.createIndex('dimencion_texto_uno', { unique: false });
          objStore.createIndex('dimencion_subtitulo', { unique: false });
          objStore.createIndex('dimencion_detalle_estudiante', { unique: false });
          objStore.createIndex('dimencion_texto_dos', { unique: false });
          objStore.createIndex('dimencion_nombre_docente', { unique: false });
          objStore.createIndex('dimencion_subtitulo_docente', { unique: false });
          objStore.createIndex('font_texto_uno', { unique: false });
          objStore.createIndex('font_subtitulo', { unique: false });
          objStore.createIndex('font_detalle_estudiante', { unique: false });
          objStore.createIndex('font_texto_dos', { unique: false });
          objStore.createIndex('font_nombre_docente', { unique: false });
          objStore.createIndex('font_subtitulo_docente', { unique: false });
          objStore.createIndex('orientacion', { unique: false });
          objStore.createIndex('dimencion', { unique: false });
          objStore.createIndex('color_plantilla_uno', { unique: false });
          objStore.createIndex('color_plantilla_dos', { unique: false });
          objStore.createIndex('usar_imagen_empleado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_detalle_calificacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('calificacion', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('desde', { unique: false });
          objStore.createIndex('hasta', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_docente', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('capacitacion', { unique: false });
          objStore.createIndex('detalle_docente', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_estudiante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('capacitacion', { unique: false });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('nombre_empleado', { unique: false });
          objStore.createIndex('ci', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('nota', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_capacitacion_ponderacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('nota_maxima', { unique: false });
          objStore.createIndex('nota_minima', { unique: false });
          objStore.createIndex('numerico', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cierre_caja', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('banco_destino', { unique: false });
          objStore.createIndex('persona_destino', { unique: false });
          objStore.createIndex('importe_entrega', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('saldo_inicial', { unique: false });
          objStore.createIndex('gastos', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cierre_caja_chica', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('inicio', { unique: false });
          objStore.createIndex('fin', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('saldo_inicial', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
          objStore.createIndex('saldo_final', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cierre_caja_mesero', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('mesero', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('banco_destino', { unique: false });
          objStore.createIndex('persona_destino', { unique: false });
          objStore.createIndex('importe_entrega', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('saldo_inicial', { unique: false });
          objStore.createIndex('gastos', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cierre_mensual_proforma', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('periodo_mes', { unique: false });
          objStore.createIndex('periodo_anio', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cliente', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('razon_social', { unique: false });
          objStore.createIndex('nit', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('telefono1', { unique: false });
          objStore.createIndex('telefono2', { unique: false });
          objStore.createIndex('telefono3', { unique: false });
          objStore.createIndex('contacto', { unique: false });
          objStore.createIndex('rubro', { unique: false });
          objStore.createIndex('categoria', { unique: false });
          objStore.createIndex('ubicacion_geografica', { unique: false });
          objStore.createIndex('fecha1', { unique: false });
          objStore.createIndex('fecha2', { unique: false });
          objStore.createIndex('texto1', { unique: false });
          objStore.createIndex('texto2', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('latitud', { unique: false });
          objStore.createIndex('longitud', { unique: false });
          objStore.createIndex('documento_nit', { unique: false });
          objStore.createIndex('documento_funda_empresa', { unique: false });
          objStore.createIndex('documento_ci', { unique: false });
          objStore.createIndex('documento_licencia_funcionamiento', { unique: false });
          objStore.createIndex('documento_seguro_social', { unique: false });
          objStore.createIndex('linea_credito', { unique: false });
          objStore.createIndex('plazo_credito', { unique: false });
          objStore.createIndex('usar_limite_credito', { unique: false });
          objStore.createIndex('bloquear_limite_credito', { unique: false });
          objStore.createIndex('tipo_precio_venta', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cliente_anticipo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('pago_venta', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('monto_anticipo', { unique: false });
          objStore.createIndex('monto_salida', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('numero_correlativo_anticipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cliente_centro_costos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('centro', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cliente_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cliente_razon', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('razon_social', { unique: false });
          objStore.createIndex('nit', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('codigo_sap', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_alias_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('tarjeta', { unique: false });
          objStore.createIndex('gerencia', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_gerencias_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('identificador_equipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_historial_comida_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('comensal', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('tarjeta', { unique: false });
          objStore.createIndex('gerencia', { unique: false });
          objStore.createIndex('comida', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('identificador_equipo', { unique: false });
          objStore.createIndex('documento', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('fecha_texto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('verificado', { unique: false });
          objStore.createIndex('fecha_verificado', { unique: false });
          objStore.createIndex('verificado_por', { unique: false });
          objStore.createIndex('descartado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_horario_comidas_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('inicio', { unique: false });
          objStore.createIndex('final', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_marcaciones_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('comensal', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('gerencia', { unique: false });
          objStore.createIndex('comida', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('verificado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comensales_precio_comidas_cliente_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('comida', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comision_vendedor_producto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('comision', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comprobante_centro_costos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_centro_costos', { unique: false });
          objStore.createIndex('id_area_costos', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('prorrateo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_comprobante_contabilidad', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('abierto', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('gloza', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('favorito', { unique: false });
          objStore.createIndex('tipo_cambio', { unique: false });
          objStore.createIndex('fecha_creacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_concepto_movimiento_caja_chica', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_config_alertas', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('dias_anticipacion', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_config_mantenimiento', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('mantenimiento_default', { unique: false });
          objStore.createIndex('hrs_hombre', { unique: false });
          objStore.createIndex('factor_hhmm', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('especialidades_grupal', { unique: false });
  
  
          objStore = db.createObjectStore('agil_config_vacuna_producto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_grupo', { unique: false });
          objStore.createIndex('id_subgrupo', { unique: false });
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_calificacion_evaluacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('capacitacion', { unique: false });
          objStore.createIndex('documentos', { unique: false });
          objStore.createIndex('equipo', { unique: false });
          objStore.createIndex('puntualidad', { unique: false });
          objStore.createIndex('higiene', { unique: false });
          objStore.createIndex('reunion', { unique: false });
          objStore.createIndex('ingreso', { unique: false });
          objStore.createIndex('formularios', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('encargado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_calificacion_proveedor', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('porcentaje', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_compra_vista', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mostrar_producto', { unique: false });
          objStore.createIndex('mostrar_codigo_producto', { unique: false });
          objStore.createIndex('mostrar_unidad_producto', { unique: false });
          objStore.createIndex('mostrar_costo_unitario', { unique: false });
          objStore.createIndex('mostrar_cantidad', { unique: false });
          objStore.createIndex('mostrar_importe', { unique: false });
          objStore.createIndex('mostrar_descuento', { unique: false });
          objStore.createIndex('mostrar_recargo', { unique: false });
          objStore.createIndex('mostrar_ice', { unique: false });
          objStore.createIndex('mostrar_excento', { unique: false });
          objStore.createIndex('mostrar_total', { unique: false });
          objStore.createIndex('mostrar_fecha_vencimiento', { unique: false });
          objStore.createIndex('mostrar_lote', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('mostrar_it_retencion', { unique: false });
          objStore.createIndex('mostrar_iue', { unique: false });
          objStore.createIndex('mostrar_pagado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_contable_comprobante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('integracion', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('glosa_general', { unique: false });
          objStore.createIndex('usar_auxiliar', { unique: false });
          objStore.createIndex('usar_centro_costo', { unique: false });
          objStore.createIndex('contra_cuenta_debe', { unique: false });
          objStore.createIndex('contra_cuenta_haber', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('tipo_comprobante', { unique: false });
          objStore.createIndex('glosa_debe', { unique: false });
          objStore.createIndex('glosa_haber', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_contable_movimiento_centro_costo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('movimiento_caja_chica', { unique: false });
          objStore.createIndex('configuracion_contable_comprobate', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_contable_movimientos_auxiliar', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('movimiento_caja_chica', { unique: false });
          objStore.createIndex('configuracion_contable_comprobate', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('valor', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('configuracion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_desempenio_evaluacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('desde', { unique: false });
          objStore.createIndex('hasta', { unique: false });
          objStore.createIndex('color', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_factura', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('impresion_factura', { unique: false });
          objStore.createIndex('tipo_facturacion', { unique: false });
          objStore.createIndex('tamano_papel_factura', { unique: false });
          objStore.createIndex('titulo_factura', { unique: false });
          objStore.createIndex('subtitulo_factura', { unique: false });
          objStore.createIndex('pie_factura', { unique: false });
          objStore.createIndex('maximo_items', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_pf', { unique: false });
          objStore.createIndex('imprimir_al_guardar', { unique: false });
          objStore.createIndex('tamano_papel_nota_venta', { unique: false });
          objStore.createIndex('tamano_papel_nota_traspaso', { unique: false });
          objStore.createIndex('tamano_papel_nota_baja', { unique: false });
          objStore.createIndex('tamano_papel_nota_pedido', { unique: false });
          objStore.createIndex('tamano_papel_cierre_caja', { unique: false });
          objStore.createIndex('tamano_papel_cotizacion', { unique: false });
          objStore.createIndex('tamano_papel_factura_servicio', { unique: false });
          objStore.createIndex('tamano_papel_despacho', { unique: false });
          objStore.createIndex('tamano_papel_farmacia', { unique: false });
          objStore.createIndex('tamano_papel_ropa_trabajo', { unique: false });
          objStore.createIndex('tamano_papel_caja_chica_ingreso', { unique: false });
          objStore.createIndex('tamano_papel_caja_chica_egreso', { unique: false });
          objStore.createIndex('formato_papel_factura', { unique: false });
          objStore.createIndex('formato_color_factura', { unique: false });
          objStore.createIndex('nota_factura_bien', { unique: false });
          objStore.createIndex('formato_papel_factura_servicio', { unique: false });
          objStore.createIndex('formato_color_factura_servicio', { unique: false });
          objStore.createIndex('color_cabecera_factura', { unique: false });
          objStore.createIndex('color_detalle_factura', { unique: false });
          objStore.createIndex('color_cabecera_factura_servicio', { unique: false });
          objStore.createIndex('color_detalle_factura_servicio', { unique: false });
          objStore.createIndex('nota_factura_servicio', { unique: false });
          objStore.createIndex('tipo_configuracion', { unique: false });
          objStore.createIndex('formato_color_nota_venta', { unique: false });
          objStore.createIndex('formato_papel_nota_venta', { unique: false });
          objStore.createIndex('nota_factura_nota_venta', { unique: false });
          objStore.createIndex('color_cabecera_nota_venta', { unique: false });
          objStore.createIndex('color_detalle_nota_venta', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_venta', { unique: false });
          objStore.createIndex('formato_color_nota_traspaso', { unique: false });
          objStore.createIndex('formato_papel_nota_traspaso', { unique: false });
          objStore.createIndex('nota_factura_nota_traspaso', { unique: false });
          objStore.createIndex('color_cabecera_nota_traspaso', { unique: false });
          objStore.createIndex('color_detalle_nota_traspaso', { unique: false });
          objStore.createIndex('formato_color_nota_baja', { unique: false });
          objStore.createIndex('formato_papel_nota_baja', { unique: false });
          objStore.createIndex('nota_factura_nota_baja', { unique: false });
          objStore.createIndex('color_cabecera_nota_baja', { unique: false });
          objStore.createIndex('color_detalle_nota_baja', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_baja', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_traspaso', { unique: false });
          objStore.createIndex('formato_con_firma_nota_venta', { unique: false });
          objStore.createIndex('formato_con_firma_factura', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_servicio', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_general_app', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('tipo_venta', { unique: false });
          objStore.createIndex('impresion_habilitada', { unique: false });
          objStore.createIndex('cobro_habilitado', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('cierre_habilitado', { unique: false });
          objStore.createIndex('usar', { unique: false });
          objStore.createIndex('listado_productos', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_general_factura', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('impresion_factura', { unique: false });
          objStore.createIndex('tipo_facturacion', { unique: false });
          objStore.createIndex('tamano_papel_factura', { unique: false });
          objStore.createIndex('titulo_factura', { unique: false });
          objStore.createIndex('subtitulo_factura', { unique: false });
          objStore.createIndex('pie_factura', { unique: false });
          objStore.createIndex('maximo_items', { unique: false });
          objStore.createIndex('usar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_pf', { unique: false });
          objStore.createIndex('imprimir_al_guardar', { unique: false });
          objStore.createIndex('tamano_papel_nota_venta', { unique: false });
          objStore.createIndex('tamano_papel_nota_traspaso', { unique: false });
          objStore.createIndex('tamano_papel_nota_baja', { unique: false });
          objStore.createIndex('tamano_papel_nota_pedido', { unique: false });
          objStore.createIndex('tamano_papel_cierre_caja', { unique: false });
          objStore.createIndex('tamano_papel_cotizacion', { unique: false });
          objStore.createIndex('formato_papel_factura', { unique: false });
          objStore.createIndex('formato_color_factura', { unique: false });
          objStore.createIndex('tamano_papel_factura_servicio', { unique: false });
          objStore.createIndex('tamano_papel_despacho', { unique: false });
          objStore.createIndex('tamano_papel_farmacia', { unique: false });
          objStore.createIndex('tamano_papel_ropa_trabajo', { unique: false });
          objStore.createIndex('tamano_papel_caja_chica_ingreso', { unique: false });
          objStore.createIndex('tamano_papel_caja_chica_egreso', { unique: false });
          objStore.createIndex('nota_factura_bien', { unique: false });
          objStore.createIndex('formato_papel_factura_servicio', { unique: false });
          objStore.createIndex('formato_color_factura_servicio', { unique: false });
          objStore.createIndex('color_cabecera_factura', { unique: false });
          objStore.createIndex('color_detalle_factura', { unique: false });
          objStore.createIndex('color_cabecera_factura_servicio', { unique: false });
          objStore.createIndex('color_detalle_factura_servicio', { unique: false });
          objStore.createIndex('nota_factura_servicio', { unique: false });
          objStore.createIndex('tipo_configuracion', { unique: false });
          objStore.createIndex('formato_color_nota_venta', { unique: false });
          objStore.createIndex('formato_papel_nota_venta', { unique: false });
          objStore.createIndex('nota_factura_nota_venta', { unique: false });
          objStore.createIndex('color_cabecera_nota_venta', { unique: false });
          objStore.createIndex('color_detalle_nota_venta', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_venta', { unique: false });
          objStore.createIndex('formato_color_nota_traspaso', { unique: false });
          objStore.createIndex('formato_papel_nota_traspaso', { unique: false });
          objStore.createIndex('nota_factura_nota_traspaso', { unique: false });
          objStore.createIndex('color_cabecera_nota_traspaso', { unique: false });
          objStore.createIndex('color_detalle_nota_traspaso', { unique: false });
          objStore.createIndex('formato_color_nota_baja', { unique: false });
          objStore.createIndex('formato_papel_nota_baja', { unique: false });
          objStore.createIndex('nota_factura_nota_baja', { unique: false });
          objStore.createIndex('color_cabecera_nota_baja', { unique: false });
          objStore.createIndex('color_detalle_nota_baja', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_baja', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_traspaso', { unique: false });
          objStore.createIndex('formato_con_firma_nota_venta', { unique: false });
          objStore.createIndex('formato_con_firma_factura', { unique: false });
          objStore.createIndex('tipo_configuracion_nota_servicio', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_iso', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('tipo_documento', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('revicion', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('fecha_aprobacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('predefinido', { unique: false });
          objStore.createIndex('version_impresion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_iso_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('tipo_documento', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('revicion', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('fecha_aprobacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('predefinido', { unique: false });
          objStore.createIndex('version_impresion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_vendedor_app', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('vendedor', { unique: false });
          objStore.createIndex('tipo_venta', { unique: false });
          objStore.createIndex('impresion_habilitada', { unique: false });
          objStore.createIndex('cobro_habilitado', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('cierre_habilitado', { unique: false });
          objStore.createIndex('listado_productos', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_configuracion_venta_vista', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });          
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mostrar_producto', { unique: false });
          objStore.createIndex('mostrar_codigo_producto', { unique: false });
          objStore.createIndex('mostrar_unidad_producto', { unique: false });
          objStore.createIndex('mostrar_precio_unitario', { unique: false });
          objStore.createIndex('mostrar_cantidad', { unique: false });
          objStore.createIndex('mostrar_importe', { unique: false });
          objStore.createIndex('mostrar_descuento', { unique: false });
          objStore.createIndex('mostrar_recargo', { unique: false });
          objStore.createIndex('mostrar_ice', { unique: false });
          objStore.createIndex('mostrar_excento', { unique: false });
          objStore.createIndex('mostrar_total', { unique: false });
          objStore.createIndex('mostrar_fecha_vencimiento', { unique: false });
          objStore.createIndex('mostrar_lote', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_clasificacion_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('usar_centro_costo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_configuracion_general_tipo_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('tipo_cuenta', { unique: false });
          objStore.createIndex('digitos', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_en_comprobante', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('debe', { unique: false });
          objStore.createIndex('haber', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('clasificacion', { unique: false });
          objStore.createIndex('tipo_cuenta', { unique: false });
          objStore.createIndex('bimonetaria', { unique: false });
          objStore.createIndex('aplicar_calculo', { unique: false });
          objStore.createIndex('calculo', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('cuenta_padre', { unique: false });
          objStore.createIndex('id_tipo_auxiliar', { unique: false });
          objStore.createIndex('especifica', { unique: false });
          objStore.createIndex('tipo_especifica', { unique: false });
          objStore.createIndex('vincular_cuenta', { unique: false });
          objStore.createIndex('especifica_texto1', { unique: false });
          objStore.createIndex('especifica_texto2', { unique: false });
          objStore.createIndex('especifica_texto3', { unique: false });
          objStore.createIndex('cuenta_activo', { unique: false });
          objStore.createIndex('estado_resultado', { unique: false });
          objStore.createIndex('no_monetaria', { unique: false });
          objStore.createIndex('resultado_acumulado', { unique: false });
          objStore.createIndex('libro_de_compra', { unique: false });
          objStore.createIndex('almacen_lc', { unique: false });
          objStore.createIndex('cuenta_vinculada_lc', { unique: false });
          objStore.createIndex('id_cuenta_depreciacion', { unique: false });
          objStore.createIndex('patrimonial', { unique: false });
          objStore.createIndex('grupo', { unique: false });
          objStore.createIndex('tipo_personal', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_cuenta_auxiliar', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('debe', { unique: false });
          objStore.createIndex('haber', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('asiento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_cuenta_campo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_contabilidad_cuenta_grupo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('grupo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_correlativo_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('numero_correlativo_llamada_atencion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('numero_correlativo_programacion_pago', { unique: false });
          objStore.createIndex('numero_correlativo_transaccion_cobro', { unique: false });
          objStore.createIndex('numero_correlativo_transaccion_pago', { unique: false });
  
  
          objStore = db.createObjectStore('agil_correlativos_ot', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_sucursal', { unique: false });
          objStore.createIndex('id_especialidad', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('numeracion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cuenta_restaurante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('detalle_pedido_restaurante', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cuenta_transaccion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('observaciones', { unique: false });
          objStore.createIndex('ref_doc', { unique: false });
          objStore.createIndex('tipo_doc', { unique: false });
          objStore.createIndex('debe', { unique: false });
          objStore.createIndex('haber', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('cerrada', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('detalle_dos', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('proformas', { unique: false });
          objStore.createIndex('ventas', { unique: false });
          objStore.createIndex('seguimiento', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('id_comprobante', { unique: false });
          objStore.createIndex('doc_respaldo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cuenta_transaccion_detalle', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('transaccion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('id_compra', { unique: false });
  
  
          objStore = db.createObjectStore('agil_cuentas_banco_proveedor', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_proveedor', { unique: false });
          objStore.createIndex('id_banco', { unique: false });
          objStore.createIndex('nro_cuenta', { unique: false });
          objStore.createIndex('predefinido', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_calificacion_proveedor', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('valor', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('puntuacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_evaluacion_proveedor_general', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('evaluacion_general', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('razon_social_proveedor', { unique: false });
          objStore.createIndex('nombre_usuario', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('telefono', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('fecha_elaboracion', { unique: false });
          objStore.createIndex('inicio', { unique: false });
          objStore.createIndex('fin', { unique: false });
          objStore.createIndex('registros', { unique: false });
          objStore.createIndex('productos', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('configuracion_iso', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('tipo_proveedor', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('responsable_venta', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_orden_servicio_entrega', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('detalle_orden_servicio', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('restante', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_pedido_entrega', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('detalle_pedido', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('restante', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_pedido_restaurante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('inventario', { unique: false });
          objStore.createIndex('pedido_restaurante', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('recargo', { unique: false });
          objStore.createIndex('ice', { unique: false });
          objStore.createIndex('excento', { unique: false });
          objStore.createIndex('tipo_descuento', { unique: false });
          objStore.createIndex('tipo_recargo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('lote', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalle_proforma', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('proforma', { unique: false });
          objStore.createIndex('servicio', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_detalles_pedidos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('pedido', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('solicitud', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('recibido', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('costo_unitario', { unique: false });
          objStore.createIndex('codigo_equipo', { unique: false });
          objStore.createIndex('saldo_inventario', { unique: false });
  
  
          objStore = db.createObjectStore('agil_dosificacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('fecha_limite_emision', { unique: false });
          objStore.createIndex('llave_digital', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('pie_factura', { unique: false });
          objStore.createIndex('expirado', { unique: false });
          objStore.createIndex('tipo_dosificacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_empresa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('razon_social', { unique: false });
          objStore.createIndex('nit', { unique: false });
          objStore.createIndex('imagen', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('telefono1', { unique: false });
          objStore.createIndex('telefono2', { unique: false });
          objStore.createIndex('telefono3', { unique: false });
          objStore.createIndex('departamento', { unique: false });
          objStore.createIndex('municipio', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_panel', { unique: false });
          objStore.createIndex('usar_vencimientos', { unique: false });
          objStore.createIndex('usar_servicios', { unique: false });
          objStore.createIndex('usar_consumos', { unique: false });
          objStore.createIndex('usar_descuentos', { unique: false });
          objStore.createIndex('usar_georeferenciacion', { unique: false });
          objStore.createIndex('usar_pedidos', { unique: false });
          objStore.createIndex('usar_pantalla_cliente', { unique: false });
          objStore.createIndex('usar_pantalla_despacho', { unique: false });
          objStore.createIndex('usar_mesas', { unique: false });
          objStore.createIndex('usar_salas', { unique: false });
          objStore.createIndex('usar_contabilidad', { unique: false });
          objStore.createIndex('usar_medico', { unique: false });
          objStore.createIndex('usar_mantenimiento', { unique: false });
          objStore.createIndex('usar_cuentas_auxiliares', { unique: false });
          objStore.createIndex('usar_proforma', { unique: false });
          objStore.createIndex('usar_creditos', { unique: false });
          objStore.createIndex('usar_destinos', { unique: false });
          objStore.createIndex('usar_razon_social', { unique: false });
          objStore.createIndex('usar_correlativos_clientes', { unique: false });
          objStore.createIndex('usar_correlativos_destinos', { unique: false });
          objStore.createIndex('usar_funciones_erp', { unique: false });
          objStore.createIndex('usar_estado_resultados_no_contables', { unique: false });
          objStore.createIndex('usar_peps', { unique: false });
          objStore.createIndex('usar_edicion_venta', { unique: false });
          objStore.createIndex('usar_venta_servicio', { unique: false });
          objStore.createIndex('usar_facturacion_masiva', { unique: false });
          objStore.createIndex('usar_cotizacion', { unique: false });
          objStore.createIndex('usar_tipo_precio', { unique: false });
          objStore.createIndex('usar_pago_anticipado', { unique: false });
          objStore.createIndex('usar_ceros_plan_cuenta', { unique: false });
          objStore.createIndex('usar_importacion_compra', { unique: false });
          objStore.createIndex('usar_importacion_venta', { unique: false });
          objStore.createIndex('usar_vencimiento_productos', { unique: false });
          objStore.createIndex('usar_vencimiento_creditos', { unique: false });
          objStore.createIndex('usar_vencimiento_deudas', { unique: false });
          objStore.createIndex('usar_filtro_lote', { unique: false });
          objStore.createIndex('ver_costos_dolares', { unique: false });
          objStore.createIndex('tipo_cambio_dolar', { unique: false });
          objStore.createIndex('usar_anticipo_recursos_humanos', { unique: false });
          objStore.createIndex('usar_anticipo_caja_chica', { unique: false });
          objStore.createIndex('usar_integracion', { unique: false });
          objStore.createIndex('usar_mantenimiento_externo_propio', { unique: false });
          objStore.createIndex('usar_promocion_producto', { unique: false });
          objStore.createIndex('restar_solo_despacho', { unique: false });
          objStore.createIndex('usar_prestacion_compra', { unique: false });
          objStore.createIndex('usar_indice_rotacion_producto', { unique: false });
          objStore.createIndex('usar_restaurante_express', { unique: false });
          objStore.createIndex('usar_productos_derivados_panel', { unique: false });
          objStore.createIndex('ver_precio_compra_en_venta', { unique: false });
          objStore.createIndex('usar_promocion_producto_puntos', { unique: false });
          objStore.createIndex('ver_usuario_en_ticket', { unique: false });
          objStore.createIndex('usar_calificaciones_proveedor', { unique: false });
          objStore.createIndex('usar_precio_por_sucursal', { unique: false });
          objStore.createIndex('usar_combo_producto_final', { unique: false });
          objStore.createIndex('usar_configuracion_iso', { unique: false });
          objStore.createIndex('representante_legal', { unique: false });
          objStore.createIndex('repr_ci', { unique: false });
          objStore.createIndex('repr_extension_ci', { unique: false });
          objStore.createIndex('repr_direccion', { unique: false });
          objStore.createIndex('repr_telefono', { unique: false });
          objStore.createIndex('repr_correo_electronico', { unique: false });
          objStore.createIndex('usar_panel_cotizaciones', { unique: false });
          objStore.createIndex('usar_devoluciones', { unique: false });
          objStore.createIndex('usar_generador_series', { unique: false });
          objStore.createIndex('nombre_comercial', { unique: false });
          objStore.createIndex('usar_ingreso_por_ajuste', { unique: false });
          objStore.createIndex('usar_traspaso_automatico', { unique: false });
          objStore.createIndex('usar_produccion_compra', { unique: false });
          objStore.createIndex('usar_programacion_pago_proveedor', { unique: false });
          objStore.createIndex('usar_relacion_compra_rendicion', { unique: false });
          objStore.createIndex('usar_envio_correos', { unique: false });
          objStore.createIndex('usar_correo_imstitucional', { unique: false });
          objStore.createIndex('email_host', { unique: false });
          objStore.createIndex('email_puerto', { unique: false });
          objStore.createIndex('email_empresa_aplicacion', { unique: false });
          objStore.createIndex('email_password_aplicacion', { unique: false });
          objStore.createIndex('asunto_email', { unique: false });
          objStore.createIndex('correlativo_iso_viajes', { unique: false });
  
  
          objStore = db.createObjectStore('agil_entrega_detalle_venta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('detalle_venta', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_estado_financiero_confituracion_impresion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('lugar_emision', { unique: false });
          objStore.createIndex('fecha_emision', { unique: false });
          objStore.createIndex('tipo_numeracion', { unique: false });
          objStore.createIndex('empesar_numeracion', { unique: false });
          objStore.createIndex('firma_uno', { unique: false });
          objStore.createIndex('cargo_uno', { unique: false });
          objStore.createIndex('firma_dos', { unique: false });
          objStore.createIndex('cargo_dos', { unique: false });
          objStore.createIndex('frase_pie_pagina', { unique: false });
          objStore.createIndex('usar_lugar_emision', { unique: false });
          objStore.createIndex('usar_fecha_emision', { unique: false });
          objStore.createIndex('usar_tipo_numeracion', { unique: false });
          objStore.createIndex('usar_empesar_numeracion', { unique: false });
          objStore.createIndex('usar_firma_uno', { unique: false });
          objStore.createIndex('usar_firma_dos', { unique: false });
          objStore.createIndex('usar_frase_pie_pagina', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_estado_financiero_gestion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('inicio', { unique: false });
          objStore.createIndex('fin', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_evaluacion_polifuncional', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('capacitacion', { unique: false });
          objStore.createIndex('documentos', { unique: false });
          objStore.createIndex('equipo', { unique: false });
          objStore.createIndex('puntualidad', { unique: false });
          objStore.createIndex('higiene', { unique: false });
          objStore.createIndex('reunion', { unique: false });
          objStore.createIndex('ingreso', { unique: false });
          objStore.createIndex('formularios', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('desempenio', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('encargado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('ficha', { unique: false });
  
  
          objStore = db.createObjectStore('agil_evaluacion_proveedor', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('razon_social_proveedor', { unique: false });
          objStore.createIndex('nombre_usuario', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('telefono', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('fecha_elaboracion', { unique: false });
          objStore.createIndex('inicio', { unique: false });
          objStore.createIndex('fin', { unique: false });
          objStore.createIndex('registros', { unique: false });
          objStore.createIndex('productos', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('configuracion_iso', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('tipo_proveedor', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('responsable_venta', { unique: false });
  
  
          objStore = db.createObjectStore('agil_evaluacion_proveedor_calificacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('evaluacion', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_evaluacion_proveedor_calificacion_general', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('evaluacion', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_evaluacion_proveedor_general', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('tipo_proveedor', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_garzon', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_garzon_pedido_restaurante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha_atencion', { unique: false });
          objStore.createIndex('pedido_restaurante', { unique: false });
          objStore.createIndex('garzon', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gestion_detalle_orden_reposicion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('orden_reposicion', { unique: false });
          objStore.createIndex('observado', { unique: false });
          objStore.createIndex('observacion_revisor', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('extra', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('detalle_pedido', { unique: false });
          objStore.createIndex('inventario_disponible', { unique: false });
          objStore.createIndex('cantidad_corregida', { unique: false });
          objStore.createIndex('justificativo', { unique: false });
          objStore.createIndex('cantidad_maxima', { unique: false });
          objStore.createIndex('cantidad_sugerida', { unique: false });
          objStore.createIndex('detalle_orden_reposicion_campamento', { unique: false });
          objStore.createIndex('cantidad_total', { unique: false });
          objStore.createIndex('cantidad_fijo', { unique: false });
  
          objStore = db.createObjectStore('agil_gestion_detalle_orden_reposicion_iso', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_orden', { unique: false });
          objStore.createIndex('id_producto', { unique: false });
          objStore.createIndex('consumo', { unique: false });
          objStore.createIndex('extra', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('cantidad_maxima', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('observado', { unique: false });
          objStore.createIndex('observacion_revisor', { unique: false });
          objStore.createIndex('cantidad_corregida', { unique: false });
          objStore.createIndex('cantidad_sugerida', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('cantidad_total', { unique: false });
          objStore.createIndex('fecha_registro', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('cantidad_fijo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gestion_orden_reposicion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha_creacion', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_consumo', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('usar_observacion', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('confirmacion_reposicion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('indice_rotacion', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('venta', { unique: false });
          objStore.createIndex('orden_reposicion_campamento', { unique: false });
          objStore.createIndex('campamento_sincronizado', { unique: false });
          objStore.createIndex('fecha_sincronizado', { unique: false });
          objStore.createIndex('nro_correlativo_iso_recepcion', { unique: false });
          objStore.createIndex('nro_correlativo_iso_envio', { unique: false });
          objStore.createIndex('config_doc_iso_recepcion', { unique: false });
          objStore.createIndex('config_doc_iso_envio', { unique: false });
          objStore.createIndex('maximos', { unique: false });
  
  
  
          objStore = db.createObjectStore('agil_gestion_orden_reposicion_iso', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_orden', { unique: false });
          objStore.createIndex('nro_correlativo_iso_recepcion', { unique: false });
          objStore.createIndex('nro_correlativo_iso_envio', { unique: false });
          objStore.createIndex('config_doc_iso_recepcion', { unique: false });
          objStore.createIndex('config_doc_iso_envio', { unique: false });
          objStore.createIndex('id_almacen', { unique: false });
          objStore.createIndex('id_usuario', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('desde', { unique: false });
          objStore.createIndex('hasta', { unique: false });
          objStore.createIndex('finalizado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_maximos_fijos', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_cliente_destino', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_despacho', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('cliente_razon', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('observacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_despacho_detalle', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('despacho', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('cantidad_despacho', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('transportista', { unique: false });
          objStore.createIndex('estibaje', { unique: false });
          objStore.createIndex('grupo_estibaje', { unique: false });
          objStore.createIndex('despachado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('servicio_transporte', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('alerta', { unique: false });
          objStore.createIndex('fecha_factura', { unique: false });
          objStore.createIndex('pago_ac', { unique: false });
          objStore.createIndex('saldo_pago_ac', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('kardex_detalle', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('longitud', { unique: false });
          objStore.createIndex('latitud', { unique: false });
          objStore.createIndex('estado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_despacho_detalle_resivo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('despacho_detalle', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('tipo_moneda', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('cambio_moneda', { unique: false });
          objStore.createIndex('numero_cuenta', { unique: false });
          objStore.createIndex('banco', { unique: false });
          objStore.createIndex('otro_banco', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_destino', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('codigo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_estibaje', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('costo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('activo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_grupo_estibaje', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('activo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_transportista', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('vehiculo', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('capacidad', { unique: false });
          objStore.createIndex('nit', { unique: false });
          objStore.createIndex('costo_transporte', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('activo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_venta_kardex', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('cliente_razon', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('eliminar', { unique: false });
  
  
          objStore = db.createObjectStore('agil_gtm_venta_kardex_detalle', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('cantidad_despachada', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('kardex', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('servicio_transporte', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_inventario_de_recepcion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_mantenimiento_ot', { unique: false });
          objStore.createIndex('parabrisas_delantero', { unique: false });
          objStore.createIndex('parabrisas_trasero', { unique: false });
          objStore.createIndex('vidrio_techo_solar', { unique: false });
          objStore.createIndex('radio', { unique: false });
          objStore.createIndex('retrovisor', { unique: false });
          objStore.createIndex('modelo', { unique: false });
          objStore.createIndex('tapa_valvulas', { unique: false });
          objStore.createIndex('gata', { unique: false });
          objStore.createIndex('faroles_delanteros', { unique: false });
          objStore.createIndex('guiniadores', { unique: false });
          objStore.createIndex('limpia_parabrisas_delantero', { unique: false });
          objStore.createIndex('limpia_parabrisas_trasero', { unique: false });
          objStore.createIndex('ventanas_delanteras', { unique: false });
          objStore.createIndex('ventanas_traseras', { unique: false });
          objStore.createIndex('encendedor', { unique: false });
          objStore.createIndex('antena', { unique: false });
          objStore.createIndex('emblema', { unique: false });
          objStore.createIndex('tapa_cubos', { unique: false });
          objStore.createIndex('herramientas', { unique: false });
          objStore.createIndex('tapa_tanque_combustible', { unique: false });
          objStore.createIndex('stops', { unique: false });
          objStore.createIndex('sobrepisos', { unique: false });
          objStore.createIndex('tamanio_tanque', { unique: false });
          objStore.createIndex('otros', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mantenimiento_orden_trabajo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('diagnostico', { unique: false });
          objStore.createIndex('prioridad', { unique: false });
          objStore.createIndex('tiempo_estimado', { unique: false });
          objStore.createIndex('fecha_hora_aviso', { unique: false });
          objStore.createIndex('fecha_hora_inicio', { unique: false });
          objStore.createIndex('fecha_hora_fin', { unique: false });
          objStore.createIndex('tipo_mantenimiento', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('correlativo_ot', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('id_vehiculo', { unique: false });
          objStore.createIndex('id_cliente', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('mantenimiento_externo', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('importe_facturado', { unique: false });
          objStore.createIndex('monto_porcentaje', { unique: false });
          objStore.createIndex('asignar_todos', { unique: false });
          objStore.createIndex('porcentaje', { unique: false });
          objStore.createIndex('km', { unique: false });
          objStore.createIndex('observacion_descuento', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('dias_credito', { unique: false });
          objStore.createIndex('a_cuenta', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('numero_manual', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
          objStore.createIndex('tipo_activo', { unique: false });
          objStore.createIndex('campo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mantenimiento_orden_trabajo_mano_obra', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('orden_trabajo', { unique: false });
          objStore.createIndex('especialidad', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('trabajo_realizado', { unique: false });
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('importe_interno', { unique: false });
          objStore.createIndex('total_cliente', { unique: false });
          objStore.createIndex('horas', { unique: false });
          objStore.createIndex('minutos', { unique: false });
          objStore.createIndex('requerimiento_trabajo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mantenimiento_orden_trabajo_material', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('orden_trabajo', { unique: false });
          objStore.createIndex('id_producto', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('importe_interno', { unique: false });
          objStore.createIndex('total_cliente', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mantenimiento_orden_trabajo_servicio_externo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('orden_trabajo', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('servicio', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('numero_factura', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('codigo_control', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('importe_interno', { unique: false });
          objStore.createIndex('total_cliente', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mantenimiento_orden_trabajo_sistema', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('orden_trabajo', { unique: false });
          objStore.createIndex('orden_trabajo_sistema', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('importe_interno', { unique: false });
          objStore.createIndex('total_cliente', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_diagnostico', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_diagnostico_examen', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('diagnostico', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('examen', { unique: false });
          objStore.createIndex('unidad', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('minimo', { unique: false });
          objStore.createIndex('maximo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_diagnostico_paciente', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('diagnostico', { unique: false });
          objStore.createIndex('paciente', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_diagnostico_resultado', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('laboratorio_paciente', { unique: false });
          objStore.createIndex('laboratorio_examen', { unique: false });
          objStore.createIndex('resultado', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('estadistica', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_laboratorio', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminar', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_laboratorio_examen', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('laboratorio', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('examen', { unique: false });
          objStore.createIndex('unidad', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('maximo', { unique: false });
          objStore.createIndex('minimo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_laboratorio_paciente', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('laboratorio', { unique: false });
          objStore.createIndex('paciente', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_laboratorio_resultado', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('laboratorio_paciente', { unique: false });
          objStore.createIndex('laboratorio_examen', { unique: false });
          objStore.createIndex('resultado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('grupo_sanguineo', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('designacion_empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('es_empleado', { unique: false });
          objStore.createIndex('tipo_documento', { unique: false });
          objStore.createIndex('extension', { unique: false });
          objStore.createIndex('fecha_vence_documento', { unique: false });
          objStore.createIndex('chofer', { unique: false });
          objStore.createIndex('regularizado', { unique: false });
          objStore.createIndex('id_grupo_sanguineo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente_consulta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_paciente', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('presion', { unique: false });
          objStore.createIndex('pulso', { unique: false });
          objStore.createIndex('talla', { unique: false });
          objStore.createIndex('peso', { unique: false });
          objStore.createIndex('temperatura', { unique: false });
          objStore.createIndex('frecuencia_respiratoria', { unique: false });
          objStore.createIndex('frecuencia_cardiaca', { unique: false });
          objStore.createIndex('indice_masa_corporal', { unique: false });
          objStore.createIndex('subjetivo', { unique: false });
          objStore.createIndex('objetivo', { unique: false });
          objStore.createIndex('analitico', { unique: false });
          objStore.createIndex('plan', { unique: false });
          objStore.createIndex('evolucion', { unique: false });
          objStore.createIndex('nervioso_central', { unique: false });
          objStore.createIndex('sentidos', { unique: false });
          objStore.createIndex('cardiovascular', { unique: false });
          objStore.createIndex('respiratorio', { unique: false });
          objStore.createIndex('gastrointestinal', { unique: false });
          objStore.createIndex('genitourinario', { unique: false });
          objStore.createIndex('locomotor', { unique: false });
          objStore.createIndex('piel', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('id_ficha_medica', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente_ficha', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_paciente', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('estilo_vida', { unique: false });
          objStore.createIndex('actividad_laboral', { unique: false });
          objStore.createIndex('area_operacion', { unique: false });
          objStore.createIndex('riesgo', { unique: false });
          objStore.createIndex('id_persona_referencia', { unique: false });
          objStore.createIndex('id_tipo_control', { unique: false });
          objStore.createIndex('alergia_humo_cigarrillo', { unique: false });
          objStore.createIndex('alergia_polvo', { unique: false });
          objStore.createIndex('alergia_picadura', { unique: false });
          objStore.createIndex('alergia_quimico', { unique: false });
          objStore.createIndex('alergia_algun_material', { unique: false });
          objStore.createIndex('alergia_medicamento', { unique: false });
          objStore.createIndex('alergia_plantas', { unique: false });
          objStore.createIndex('alergia_alimentos', { unique: false });
          objStore.createIndex('alergia_conservas', { unique: false });
          objStore.createIndex('alergia_otros', { unique: false });
          objStore.createIndex('alergia_otros_comentario', { unique: false });
          objStore.createIndex('es_donante', { unique: false });
          objStore.createIndex('enfermedad_hipertension', { unique: false });
          objStore.createIndex('enfermedad_cardilogia', { unique: false });
          objStore.createIndex('enfermedad_lumbalgia', { unique: false });
          objStore.createIndex('enfermedad_diabetes', { unique: false });
          objStore.createIndex('enfermedad_digestiva', { unique: false });
          objStore.createIndex('enfermedad_epilepsia', { unique: false });
          objStore.createIndex('enfermedad_chagas', { unique: false });
          objStore.createIndex('enfermedad_asma', { unique: false });
          objStore.createIndex('enfermedad_hepatitis', { unique: false });
          objStore.createIndex('enfermedad_otros', { unique: false });
          objStore.createIndex('enfermedad_comentario', { unique: false });
          objStore.createIndex('quirurgico_operado', { unique: false });
          objStore.createIndex('quirurgico_comentario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('descripcion_antecedentes', { unique: false });
          objStore.createIndex('quirurgico_descripcion', { unique: false });
          objStore.createIndex('tratamiento', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('cargos', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente_prerequisito', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('paciente', { unique: false });
          objStore.createIndex('prerequisito', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dias_activacion', { unique: false });
          objStore.createIndex('reprogramado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('documento', { unique: false });
          objStore.createIndex('asignado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente_vacuna', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_paciente', { unique: false });
          objStore.createIndex('id_vacuna', { unique: false });
          objStore.createIndex('ultima_aplicacion', { unique: false });
          objStore.createIndex('siguiente_aplicacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_paciente_vacuna_dosis', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_paciente_vacuna', { unique: false });
          objStore.createIndex('fecha_aplicacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('id_dosis', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_prerequisito', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('vencimiento_mes', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('puede_modificar_rrhh', { unique: false });
          objStore.createIndex('dias_activacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('id_empresa', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_vacuna', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dias_activacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('unico', { unique: false });
          objStore.createIndex('id_empresa', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_vacuna_dosis', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('es_dosis', { unique: false });
          objStore.createIndex('tiempo', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('id_vacuna', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_medico_vacuna_producto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_vacuna', { unique: false });
          objStore.createIndex('id_producto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mesa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('imagen', { unique: false });
          objStore.createIndex('sala', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mesa_pedido_restaurante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('pedido_activo', { unique: false });
          objStore.createIndex('pedido_restaurante', { unique: false });
          objStore.createIndex('mesa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_mesero_venta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_moneda_tipo_cambio', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('ufv', { unique: false });
          objStore.createIndex('dolar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('empresa', { unique: false });
  
  
          objStore = db.createObjectStore('agil_pedido_restaurante', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cantidad_personas', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('tiempo_ingreso', { unique: false });
          objStore.createIndex('tiempo_salida', { unique: false });
          objStore.createIndex('fecha_reserva', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_pedidos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('recibido', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('id_tipo_pago', { unique: false });
          objStore.createIndex('dias_credito', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('a_cuenta', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('fecha_recepcion', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('id_forma_entrega', { unique: false });
          objStore.createIndex('numero_iso_orden_compra', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('imagen', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('unidad_medida', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('utilidad_esperada', { unique: false });
          objStore.createIndex('inventario_minimo', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('grupo', { unique: false });
          objStore.createIndex('subgrupo', { unique: false });
          objStore.createIndex('caracteristica_especial1', { unique: false });
          objStore.createIndex('caracteristica_especial2', { unique: false });
          objStore.createIndex('codigo_fabrica', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('comision', { unique: false });
          objStore.createIndex('publicar_panel', { unique: false });
          objStore.createIndex('alerta', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('descuento_fijo', { unique: false });
          objStore.createIndex('tipo_producto', { unique: false });
          objStore.createIndex('activar_inventario', { unique: false });
          objStore.createIndex('marca', { unique: false });
          objStore.createIndex('modelo', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('almacen_erp', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('rango_positivo', { unique: false });
          objStore.createIndex('rango_negativo', { unique: false });
          objStore.createIndex('activo_fijo', { unique: false });
          objStore.createIndex('precio_unitario_dolares', { unique: false });
          objStore.createIndex('usar_promocion', { unique: false });
          objStore.createIndex('restar_solo_despacho', { unique: false });
          objStore.createIndex('usar_promocion_en_dias_habilitados', { unique: false });
          objStore.createIndex('cantidad_prestacion_compra', { unique: false });
          objStore.createIndex('indice_rotacion', { unique: false });
          objStore.createIndex('unidad_economica', { unique: false });
          objStore.createIndex('relacion', { unique: false });
          objStore.createIndex('combo', { unique: false });
          objStore.createIndex('sujeto_mantenimiento', { unique: false });
          objStore.createIndex('usar_herencia', { unique: false });
          objStore.createIndex('id_ambiente', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_base', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('producto_base', { unique: false });
          objStore.createIndex('formulacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('habilitar_cambio', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_padre', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('producto_padre', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_precio_por_sucursal', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('rango_positivo', { unique: false });
          objStore.createIndex('rango_negativo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_promocion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('dia', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('tipo_promocion', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_promocion_puntaje', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('dia', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('tipo_promocion', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('puntaje', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_producto_tipo_precio', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('tipo_precio', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('rango_positivo', { unique: false });
          objStore.createIndex('rango_negativo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('precio_unitario_dolares', { unique: false });
          objStore.createIndex('rango_negativo_dolares', { unique: false });
          objStore.createIndex('rango_positivo_dolares', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proforma', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha_proforma', { unique: false });
          objStore.createIndex('fecha_proforma_ok', { unique: false });
          objStore.createIndex('fecha_recepcion', { unique: false });
          objStore.createIndex('fecha_factura', { unique: false });
          objStore.createIndex('fecha_cobro', { unique: false });
          objStore.createIndex('periodo_mes', { unique: false });
          objStore.createIndex('periodo_anio', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('actividad', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('descripcion_factura', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('fecha_limite_emision', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('codigo_control', { unique: false });
          objStore.createIndex('dias', { unique: false });
          objStore.createIndex('a_cuenta', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('cambio_dolar', { unique: false });
          objStore.createIndex('totalImporteSus', { unique: false });
          objStore.createIndex('glosa_unica', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('facturas_anuladas', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('contabilizado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proforma_contabilidad', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_proforma', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('totalImporteSus', { unique: false });
          objStore.createIndex('cambio_dolar', { unique: false });
          objStore.createIndex('fecha_factura', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proforma_factura_anulada', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('fecha_factura', { unique: false });
          objStore.createIndex('periodo_mes', { unique: false });
          objStore.createIndex('periodo_anio', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('actividad', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('totalImporteSus', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('codigo_control', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('proformas_anulacion', { unique: false });
          objStore.createIndex('factura_anulada', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proveedor', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('razon_social', { unique: false });
          objStore.createIndex('nit', { unique: false });
          objStore.createIndex('direccion', { unique: false });
          objStore.createIndex('telefono1', { unique: false });
          objStore.createIndex('telefono2', { unique: false });
          objStore.createIndex('email', { unique: false });
          objStore.createIndex('contacto', { unique: false });
          objStore.createIndex('rubro', { unique: false });
          objStore.createIndex('categoria', { unique: false });
          objStore.createIndex('ubicacion_geografica', { unique: false });
          objStore.createIndex('fecha1', { unique: false });
          objStore.createIndex('fecha2', { unique: false });
          objStore.createIndex('texto1', { unique: false });
          objStore.createIndex('texto2', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('documento_nit', { unique: false });
          objStore.createIndex('documento_funda_empresa', { unique: false });
          objStore.createIndex('documento_ci', { unique: false });
          objStore.createIndex('documento_licencia_funcionamiento', { unique: false });
          objStore.createIndex('documento_seguro_social', { unique: false });
          objStore.createIndex('productos', { unique: false });
          objStore.createIndex('estado', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proveedor_anticipo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('pago_compra', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('monto_anticipo', { unique: false });
          objStore.createIndex('monto_salida', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('numero_correlativo_anticipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_proveedor_cuenta', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('tipo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_aguinaldo_planilla-sueldo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_detalle_aguinaldo', { unique: false });
          objStore.createIndex('id_detalle_sueldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_anticipo_tr3', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('anticipo', { unique: false });
          objStore.createIndex('tr3', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_clase_ausencia', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('porcentaje', { unique: false });
          objStore.createIndex('dias_descuento', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_aguinaldos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('promedio_basico', { unique: false });
          objStore.createIndex('prom_horas_extras', { unique: false });
          objStore.createIndex('prom_recargo_nocturno', { unique: false });
          objStore.createIndex('prom_bono_antiguedad', { unique: false });
          objStore.createIndex('prom_bono_frontera', { unique: false });
          objStore.createIndex('prom_otros_bonos', { unique: false });
          objStore.createIndex('prom_total_ganado', { unique: false });
          objStore.createIndex('dias_trabajados', { unique: false });
          objStore.createIndex('total_ganado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('entrego_tr3', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_cargas_sociales', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('dt', { unique: false });
          objStore.createIndex('ganado', { unique: false });
          objStore.createIndex('horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('total_ganado', { unique: false });
          objStore.createIndex('afp', { unique: false });
          objStore.createIndex('sol', { unique: false });
          objStore.createIndex('pro_v', { unique: false });
          objStore.createIndex('cns', { unique: false });
          objStore.createIndex('prev_indemnizacion', { unique: false });
          objStore.createIndex('prov_aguinaldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_incrementos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('sueldo_basico', { unique: false });
          objStore.createIndex('incremento_salarial', { unique: false });
          objStore.createIndex('incremento_adicional', { unique: false });
          objStore.createIndex('nuevo_sueldo', { unique: false });
          objStore.createIndex('sueldo_basico_ficha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_rc_iva', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('neto_imponible', { unique: false });
          objStore.createIndex('dos_smn', { unique: false });
          objStore.createIndex('diferencia', { unique: false });
          objStore.createIndex('rc_iva', { unique: false });
          objStore.createIndex('dos_smn13', { unique: false });
          objStore.createIndex('f110', { unique: false });
          objStore.createIndex('rc_iva_fisico', { unique: false });
          objStore.createIndex('saldo_dependiente', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('actualizacion', { unique: false });
          objStore.createIndex('saldo_actualizado', { unique: false });
          objStore.createIndex('saldo_total', { unique: false });
          objStore.createIndex('saldo_utilizado', { unique: false });
          objStore.createIndex('rc_iva_mes', { unique: false });
          objStore.createIndex('nuevo_saldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('saldo_fisco', { unique: false });
          objStore.createIndex('otros_ingresos', { unique: false });
          objStore.createIndex('monto_ingresos_netos', { unique: false });
          objStore.createIndex('saldo_anterior_arrastrado', { unique: false });
          objStore.createIndex('otra_empresa', { unique: false });
          objStore.createIndex('observaciones', { unique: false });
          objStore.createIndex('nuevo_empleado', { unique: false });
          objStore.createIndex('f110_monto_declarado', { unique: false });
          objStore.createIndex('f110_munero_facturas', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_retroactivas', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('id_sueldo', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('dt', { unique: false });
          objStore.createIndex('ganado', { unique: false });
          objStore.createIndex('horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('total_ganado', { unique: false });
          objStore.createIndex('afp', { unique: false });
          objStore.createIndex('rc_iva', { unique: false });
          objStore.createIndex('importe_anticipos', { unique: false });
          objStore.createIndex('importe_prestamos', { unique: false });
          objStore.createIndex('importe_total_descuento', { unique: false });
          objStore.createIndex('liquido_pagable', { unique: false });
          objStore.createIndex('horas_extras_r', { unique: false });
          objStore.createIndex('dias_rol_turnos', { unique: false });
          objStore.createIndex('horas_extras_rol', { unique: false });
          objStore.createIndex('entrego_tr3', { unique: false });
          objStore.createIndex('nt', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_subsidios', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('planificacion', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_detalle_planilla_sueldos', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('total_ganado', { unique: false });
          objStore.createIndex('afp', { unique: false });
          objStore.createIndex('rc_iva', { unique: false });
          objStore.createIndex('importe_anticipos', { unique: false });
          objStore.createIndex('importe_prestamos', { unique: false });
          objStore.createIndex('importe_total_descuento', { unique: false });
          objStore.createIndex('liquido_pagable', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('dt', { unique: false });
          objStore.createIndex('ganado', { unique: false });
          objStore.createIndex('horas_extras_r', { unique: false });
          objStore.createIndex('dias_rol_turnos', { unique: false });
          objStore.createIndex('horas_extras_rol', { unique: false });
          objStore.createIndex('entrego_tr3', { unique: false });
          objStore.createIndex('nt', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('campo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_anticipo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('tope', { unique: false });
          objStore.createIndex('salario_basico', { unique: false });
          objStore.createIndex('tipo_porcentual', { unique: false });
          objStore.createIndex('porcentaje', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('caja_chica', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('promedio_total_ganado', { unique: false });
          objStore.createIndex('matriz_reutilizable', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('ficha', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_ausencia', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('diagnostico', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dias', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('primera_baja', { unique: false });
          objStore.createIndex('horas', { unique: false });
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('vehiculo', { unique: false });
          objStore.createIndex('usar_vehiculo', { unique: false });
          objStore.createIndex('portero_salida', { unique: false });
          objStore.createIndex('portero_retorno', { unique: false });
          objStore.createIndex('sin_retorno', { unique: false });
          objStore.createIndex('sin_ingreso', { unique: false });
          objStore.createIndex('autorizador', { unique: false });
          objStore.createIndex('fecha_inicio_solicitud', { unique: false });
          objStore.createIndex('fecha_fin_solicitud', { unique: false });
          objStore.createIndex('usuario', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_beneficio_social', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('motivo', { unique: false });
          objStore.createIndex('fecha_elaboracion', { unique: false });
          objStore.createIndex('fecha_asistensia', { unique: false });
          objStore.createIndex('fecha_ingreso', { unique: false });
          objStore.createIndex('fecha_retiro', { unique: false });
          objStore.createIndex('primer_mes', { unique: false });
          objStore.createIndex('segundo_mes', { unique: false });
          objStore.createIndex('tercer_mes', { unique: false });
          objStore.createIndex('numero_quinquenio', { unique: false });
          objStore.createIndex('quinquenio_adelantado', { unique: false });
          objStore.createIndex('total_quinquenio', { unique: false });
          objStore.createIndex('tipo_beneficio', { unique: false });
          objStore.createIndex('desahucio', { unique: false });
          objStore.createIndex('total_ingresos', { unique: false });
          objStore.createIndex('total_deducciones', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('cuenta_banco', { unique: false });
          objStore.createIndex('promedio', { unique: false });
          objStore.createIndex('mes_uno', { unique: false });
          objStore.createIndex('mes_dos', { unique: false });
          objStore.createIndex('mes_tres', { unique: false });
          objStore.createIndex('empleado_cargo_impresion', { unique: false });
          objStore.createIndex('cargo_imprecion', { unique: false });
          objStore.createIndex('usar_primer_mes', { unique: false });
          objStore.createIndex('usar_segundo_mes', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('anios_servicio', { unique: false });
          objStore.createIndex('meses_servicio', { unique: false });
          objStore.createIndex('dias_servicio', { unique: false });
          objStore.createIndex('anios_importe', { unique: false });
          objStore.createIndex('meses_importe', { unique: false });
          objStore.createIndex('dias_importe', { unique: false });
          objStore.createIndex('meses_navidad', { unique: false });
          objStore.createIndex('dias_navidad', { unique: false });
          objStore.createIndex('navidad_importe', { unique: false });
          objStore.createIndex('mes_prima', { unique: false });
          objStore.createIndex('dias_prima', { unique: false });
          objStore.createIndex('importe_prima', { unique: false });
          objStore.createIndex('mes_vacacion', { unique: false });
          objStore.createIndex('dias_vacacion', { unique: false });
          objStore.createIndex('importe_vacacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_bitacora_ficha', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('valor_anterior', { unique: false });
          objStore.createIndex('valor_actual', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_campamento_empleado', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('comensales', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_capacidad_interno_externo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('hoja_vida', { unique: false });
          objStore.createIndex('tipo_capacidad', { unique: false });
          objStore.createIndex('curso', { unique: false });
          objStore.createIndex('institucion', { unique: false });
          objStore.createIndex('certificado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('documento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_cargo', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('principal', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_compensacion_ausencia', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ausencia', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('tiempo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_configuracion_ropa', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('ropa_trabajo', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('meses_uso', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_configuracion_subsidio', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('tipo_subsidio', { unique: false });
          objStore.createIndex('meses', { unique: false });
          objStore.createIndex('mes_gestacion', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('control_medico', { unique: false });
          objStore.createIndex('vincular_hijo', { unique: false });
          objStore.createIndex('planillas', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_configuracion_vacacion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('desde', { unique: false });
          objStore.createIndex('hasta', { unique: false });
          objStore.createIndex('dias', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_deduccion_ingreso', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
  
          objStore.createIndex('beneficio', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('motivo', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_descuento_vacacion_historial', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
          bjStore.createIndex('id', { unique: false });
          objStore.createIndex('id_vacacion', { unique: false });
          objStore.createIndex('id_historial_vacacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_discapacidad', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('discapacidad', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_documento_familiar', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('familiar', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('aceptado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_dotacion_ropa', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('cumplimiento', { unique: false });
          objStore.createIndex('periodo', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('numero_iso_dotacion_ropa', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_dotacion_ropa_item', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('dotacion_ropa', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('ropa', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('anterior', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_experiencia_laboral', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('hoja_vida', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('motivo_retiro', { unique: false });
          objStore.createIndex('contacto', { unique: false });
          objStore.createIndex('telefono', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('documento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_ficha', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_empleado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_expiracion', { unique: false });
          objStore.createIndex('codigo_empleado', { unique: false });
          objStore.createIndex('tipo_contrato', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('tipo_personal', { unique: false });
          objStore.createIndex('carga_horarios', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('ubicacion', { unique: false });
          objStore.createIndex('haber_basico', { unique: false });
          objStore.createIndex('haber_basico_literal', { unique: false });
          objStore.createIndex('contrato', { unique: false });
          objStore.createIndex('jubilacion', { unique: false });
          objStore.createIndex('fecha_jubilacion', { unique: false });
          objStore.createIndex('persona_referencia', { unique: false });
          objStore.createIndex('matricula_seguro', { unique: false });
          objStore.createIndex('seguro_salud', { unique: false });
          objStore.createIndex('lugar_seguro_salud', { unique: false });
          objStore.createIndex('seguro_salud_carnet', { unique: false });
          objStore.createIndex('nua_seguro_largo_plazo', { unique: false });
          objStore.createIndex('aporte_seguro_largo_plazo', { unique: false });
          objStore.createIndex('lugar_seguro_largo_plazo', { unique: false });
          objStore.createIndex('numero_cuenta', { unique: false });
          objStore.createIndex('banco', { unique: false });
          objStore.createIndex('detalle_discapacidades', { unique: false });
          objStore.createIndex('discapacidad', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('horas_extra', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('encargado_area', { unique: false });
          objStore.createIndex('codigo_tributario', { unique: false });
          objStore.createIndex('caracteristica_discapacidad', { unique: false });
          objStore.createIndex('vencimiento_carnet_discapacidad', { unique: false });
          objStore.createIndex('total_ganado_fijo', { unique: false });
          objStore.createIndex('monto_total_ganado', { unique: false });
          objStore.createIndex('bono_dias', { unique: false });
          objStore.createIndex('costo_campo', { unique: false });
          objStore.createIndex('costo_descanso', { unique: false });
          objStore.createIndex('horas_extra_dia_campo', { unique: false });
          objStore.createIndex('horas_campo', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('id_campo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_ficha_familiar', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('familiar', { unique: false });
          objStore.createIndex('relacion', { unique: false });
          objStore.createIndex('afiliado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('referencia', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_ficha_otros_seguros', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('tipo_seguro', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_formacion_academica', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('hoja_vida', { unique: false });
          objStore.createIndex('id_grado', { unique: false });
          objStore.createIndex('id_titulo', { unique: false });
          objStore.createIndex('id_institucion', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('anio_obtencion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('documento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_historial_vacacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('gestion', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('aplicadas', { unique: false });
          objStore.createIndex('tomadas', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_hoja_vida', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_hora_extra_ordinaria', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('horas', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('cerrado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('fecha_cierre', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_horas_extra', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('tiempo', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_llamada_atencion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('motivo', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_solicitud', { unique: false });
          objStore.createIndex('fecha_realizado', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('fecha_devolucion', { unique: false });
          objStore.createIndex('solicitante', { unique: false });
          objStore.createIndex('recepcionista', { unique: false });
          objStore.createIndex('visado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('cerrado', { unique: false });
          objStore.createIndex('firmante', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_logro_interno_externo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('hoja_vida', { unique: false });
          objStore.createIndex('tipo_logro', { unique: false });
          objStore.createIndex('motivo', { unique: false });
          objStore.createIndex('institucion', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('documento', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_otros_bonos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('id_usuario', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_planificacion_subsidio', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_empleado', { unique: false });
          objStore.createIndex('tipo_subsidio', { unique: false });
          objStore.createIndex('mes_gestacion', { unique: false });
          objStore.createIndex('fecha_reporte', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('observaciones', { unique: false });
          objStore.createIndex('vincular_hijo', { unique: false });
          objStore.createIndex('vincular_veneficiaria', { unique: false });
          objStore.createIndex('hijo_gestacion', { unique: false });
          objStore.createIndex('nro_asignacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_prerequisito_cargo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('prerequisito', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_prestamo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('fecha_inicial', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('interes_pactado', { unique: false });
          objStore.createIndex('plazo', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('cuota', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('observacion_eliminado', { unique: false });
          objStore.createIndex('descuento_planilla', { unique: false });
          objStore.createIndex('tipo_prestamo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_prestamo_pago', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('prestamo', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('monto_pagado', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('a_cuenta_anterior', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_rol_turno', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('tipo', { unique: false });
          objStore.createIndex('dias_trabajado', { unique: false });
          objStore.createIndex('dias_descanso', { unique: false });
          objStore.createIndex('grupo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('turno_dia', { unique: false });
          objStore.createIndex('alerta', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('clasificacion', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_rol_turno_noche', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('rol_truno', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('dias_trabajado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('tipo', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_seguimiento_subsidio', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_empleado', { unique: false });
          objStore.createIndex('id_planificacion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('medico', { unique: false });
          objStore.createIndex('num_control', { unique: false });
          objStore.createIndex('documento', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_solicitud_vacacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('sabado', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dias', { unique: false });
          objStore.createIndex('inicio_tipo', { unique: false });
          objStore.createIndex('fin_tipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('domingos', { unique: false });
          objStore.createIndex('feriados', { unique: false });
          objStore.createIndex('fecha_creacion', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('comentario', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empleado_vacaciones', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('sabado', { unique: false });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dias', { unique: false });
          objStore.createIndex('inicio_tipo', { unique: false });
          objStore.createIndex('fin_tipo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('domingos', { unique: false });
          objStore.createIndex('feriados', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('fecha_creacion', { unique: false });
          objStore.createIndex('dias_restante', { unique: false });
          objStore.createIndex('usuario', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_empresa_carga_horario', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('carga_horario', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('usar_descanso', { unique: false });
          objStore.createIndex('hora_inicio_descanso', { unique: false });
          objStore.createIndex('hora_fin_descanso', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_feriado', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('fecha_inicio', { unique: false });
          objStore.createIndex('fecha_fin', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_parametros', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('salario_minimo', { unique: false });
          objStore.createIndex('salario-rciva', { unique: false });
          objStore.createIndex('porcentage_iva', { unique: false });
          objStore.createIndex('decreto_supremo', { unique: false });
          objStore.createIndex('seguro_salud', { unique: false });
          objStore.createIndex('aporte_serguro_salud', { unique: false });
          objStore.createIndex('numero_patronal', { unique: false });
          objStore.createIndex('pension_vejez', { unique: false });
          objStore.createIndex('riesgo_comun', { unique: false });
          objStore.createIndex('comision', { unique: false });
          objStore.createIndex('aporte_solidario_laboral', { unique: false });
          objStore.createIndex('riesgo_profesional', { unique: false });
          objStore.createIndex('aporte_solidario_patronal', { unique: false });
          objStore.createIndex('rango_primero_inicio_solidario', { unique: false });
          objStore.createIndex('rango_primero_fin_solidario', { unique: false });
          objStore.createIndex('rango_segundo_inicio_solidario', { unique: false });
          objStore.createIndex('rango_segundo_fin_solidario', { unique: false });
          objStore.createIndex('rango_tercero_inicio_solidario', { unique: false });
          objStore.createIndex('rango_tercero_fin_solidario', { unique: false });
          objStore.createIndex('salario_base_antiguedad', { unique: false });
          objStore.createIndex('antiguedad_cero_uno', { unique: false });
          objStore.createIndex('antiguedad_dos_cuatro', { unique: false });
          objStore.createIndex('antiguedad_cinco_siete', { unique: false });
          objStore.createIndex('antiguedad_ocho_diez', { unique: false });
          objStore.createIndex('antiguedad_once_catorce', { unique: false });
          objStore.createIndex('antiguedad_quice_diecinueve', { unique: false });
          objStore.createIndex('antiguedad_veinte_veinticuatro', { unique: false });
          objStore.createIndex('antiguedad_mas_veinticinco', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('pro_vivienda_patronal', { unique: false });
          objStore.createIndex('solo_jubilados_mayor_65', { unique: false });
          objStore.createIndex('frontera_monto', { unique: false });
          objStore.createIndex('frontera_porcentaje', { unique: false });
          objStore.createIndex('hbd_monto', { unique: false });
          objStore.createIndex('hbd_porcentaje', { unique: false });
          objStore.createIndex('indemnizaciones', { unique: false });
          objStore.createIndex('aguinaldos', { unique: false });
          objStore.createIndex('numero_empleador', { unique: false });
          objStore.createIndex('factor_calculo_dias', { unique: false });
          objStore.createIndex('resolucion_ministerio', { unique: false });
          objStore.createIndex('dias_min_trabajos', { unique: false });
          objStore.createIndex('id_metodo_dias', { unique: false });
          objStore.createIndex('solo_jubilados_menor_65', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_parametros_areas_frontera', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('parametro', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_parametros_areas_hbd', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('parametro', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_parametros_horas_extras_campo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('parametro', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('horas', { unique: false });
          objStore.createIndex('inicio_mes', { unique: false });
          objStore.createIndex('fin_mes', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_aguinaldo_tr3', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('planilla_aguinaldo', { unique: false });
          objStore.createIndex('tr3', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_aguinaldos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('importe_total_ganado', { unique: false });
          objStore.createIndex('total_dias_trabajados', { unique: false });
          objStore.createIndex('importe_liquido_pagable', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_cargas_sociales', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('total_empleados', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('importe_ganado', { unique: false });
          objStore.createIndex('total_horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('importe_total_ganado', { unique: false });
          objStore.createIndex('importe_afp', { unique: false });
          objStore.createIndex('importe_sol', { unique: false });
          objStore.createIndex('importe_pro_v', { unique: false });
          objStore.createIndex('importe_cns', { unique: false });
          objStore.createIndex('importe_prev_indemnizacion', { unique: false });
          objStore.createIndex('importe_prov_aguinaldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_incrementos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('importe_incrementos', { unique: false });
          objStore.createIndex('importe_incremento_adicional', { unique: false });
          objStore.createIndex('importe_nuevo_sueldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_rc_iva', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('total_empleados', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('neto_imponible', { unique: false });
          objStore.createIndex('dos_smn', { unique: false });
          objStore.createIndex('diferencia', { unique: false });
          objStore.createIndex('rc_iva', { unique: false });
          objStore.createIndex('dos_smn13', { unique: false });
          objStore.createIndex('f110', { unique: false });
          objStore.createIndex('rc_iva_fisico', { unique: false });
          objStore.createIndex('saldo_dependiente', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('actualizacion', { unique: false });
          objStore.createIndex('saldo_actualizado', { unique: false });
          objStore.createIndex('saldo_total', { unique: false });
          objStore.createIndex('saldo_utilizado', { unique: false });
          objStore.createIndex('rc_iva_mes', { unique: false });
          objStore.createIndex('nuevo_saldo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('otros_ingresos', { unique: false });
          objStore.createIndex('monto_ingresos_netos', { unique: false });
          objStore.createIndex('saldo_fisco', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_retroactivas', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('importe_ganado', { unique: false });
          objStore.createIndex('total_horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('importe_total_ganado', { unique: false });
          objStore.createIndex('importe_afp', { unique: false });
          objStore.createIndex('importe_rc_iva', { unique: false });
          objStore.createIndex('importe_anticipos', { unique: false });
          objStore.createIndex('importe_prestamos', { unique: false });
          objStore.createIndex('importe_total_descuento', { unique: false });
          objStore.createIndex('importe_liquido_pagable', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_subsidios', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('total_empleados', { unique: false });
          objStore.createIndex('total_asignaciones', { unique: false });
          objStore.createIndex('total_monto', { unique: false });
          objStore.createIndex('total_cantidad', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_sueldo_tr3', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('planilla_sueldo', { unique: false });
          objStore.createIndex('tr3', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_planilla_sueldos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('mes', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('total_empleados', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('importe_sueldo_basico', { unique: false });
          objStore.createIndex('total_horas_extras', { unique: false });
          objStore.createIndex('importe_horas_extras', { unique: false });
          objStore.createIndex('importe_recargo_nocturno', { unique: false });
          objStore.createIndex('importe_bono_antiguedad', { unique: false });
          objStore.createIndex('importe_bono_frontera', { unique: false });
          objStore.createIndex('importe_otros_bonos', { unique: false });
          objStore.createIndex('importe_total_ganado', { unique: false });
          objStore.createIndex('importe_afp', { unique: false });
          objStore.createIndex('importe_rc_iva', { unique: false });
          objStore.createIndex('importe_anticipos', { unique: false });
          objStore.createIndex('importe_prestamos', { unique: false });
          objStore.createIndex('importe_total_descuento', { unique: false });
          objStore.createIndex('importe_liquido_pagable', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('importe_ganado', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_riesgo_cargos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('nombre_riesgo', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_tr3', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('cuenta', { unique: false });
          objStore.createIndex('departamento', { unique: false });
          objStore.createIndex('planilla', { unique: false });
          objStore.createIndex('nombre_archivo', { unique: false });
          objStore.createIndex('nombre_planilla', { unique: false });
          objStore.createIndex('numero_planilla', { unique: false });
          objStore.createIndex('origen_fondos', { unique: false });
          objStore.createIndex('destino_fondos', { unique: false });
          objStore.createIndex('dirigido_para', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('firma_uno', { unique: false });
          objStore.createIndex('firma_dos', { unique: false });
          objStore.createIndex('firma_tres', { unique: false });
          objStore.createIndex('firma_cuatro', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('fecha_elaboracion', { unique: false });
          objStore.createIndex('aumentar_ceros', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_viaje', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('vehiculo', { unique: false });
          objStore.createIndex('conductor', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('relevo', { unique: false });
          objStore.createIndex('fecha_ingreso', { unique: false });
          objStore.createIndex('fecha_salida', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('nro_iso', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_viaje_conductor', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('licencia', { unique: false });
          objStore.createIndex('tipo_licencia', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_viaje_destino', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('viaje', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_rrhh_viaje_detalle', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('viaje', { unique: false });
          objStore.createIndex('visita', { unique: false });
          objStore.createIndex('ficha', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('tipo_viaje', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('campo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_ruta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('departamento', { unique: false });
          objStore.createIndex('municipio', { unique: false });
          objStore.createIndex('segmentos', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_ruta_cliente', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ruta', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_ruta_dia', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('ruta', { unique: false });
          objStore.createIndex('dia', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_sala', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('ubicacion', { unique: false });
          objStore.createIndex('posicion', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_servicio', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('actividad', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('codigo', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_servicio_venta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('descuento_fijo', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_solicitud_caja_chica', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('solicitante', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('autorizador', { unique: false });
          objStore.createIndex('verificador', { unique: false });
          objStore.createIndex('incremento', { unique: false });
          objStore.createIndex('fecha_incremento', { unique: false });
          objStore.createIndex('numero_correlativo_incremento', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('numero_orden_compra', { unique: false });
  
  
          
  
          objStore = db.createObjectStore('agil_transaccion_seguimiento', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('transaccion', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('entregado', { unique: false });
          objStore.createIndex('devuelto', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('fecha_devolucion', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_transporte_chofer', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_persona', { unique: false });
          objStore.createIndex('id_categoria', { unique: false });
          objStore.createIndex('vencimiento', { unique: false });
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_transporte_detalle_recibo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_recibo', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('id_ruta', { unique: false });
          objStore.createIndex('peso', { unique: false });
          objStore.createIndex('unidad', { unique: false });
          objStore.createIndex('descripcion_descuento', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_transporte_recibo', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_usuario', { unique: false });
          objStore.createIndex('id_sucursal', { unique: false });
          objStore.createIndex('id_moneda', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('id_chofer', { unique: false });
          objStore.createIndex('id_vehiculo', { unique: false });
          objStore.createIndex('metodo_pago', { unique: false });
          objStore.createIndex('id_banco', { unique: false });
          objStore.createIndex('id_banco_destino', { unique: false });
          objStore.createIndex('nro_cheque', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('id_estado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_transporte_rutas', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('origen', { unique: false });
          objStore.createIndex('destino', { unique: false });
          objStore.createIndex('costo', { unique: false });
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_usuario_almacen', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_usuario_ruta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('ruta', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_usuario_sucursal', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_vale_caja_chica', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('solicitud', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('agil_vehiculos_externos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('marca', { unique: false });
          objStore.createIndex('chasis', { unique: false });
          objStore.createIndex('placa', { unique: false });
          objStore.createIndex('color', { unique: false });
          objStore.createIndex('km', { unique: false });
          objStore.createIndex('anio', { unique: false });
          objStore.createIndex('modelo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('id_producto', { unique: false });
          objStore.createIndex('capacidad', { unique: false });
  
  
          objStore = db.createObjectStore('ambientes', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_tipo', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('id_estado', { unique: false });
          objStore.createIndex('id_sucursal', { unique: false });
          objStore.createIndex('id_unidad_medida', { unique: false });
          objStore.createIndex('tiempo', { unique: false });
          objStore.createIndex('habilitado', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('comanda_venta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_venta', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('detalle_comanda', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_comanda', { unique: false });
          objStore.createIndex('id_producto', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('detalle_orden_servicio', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('orden_servicio', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('unidad_medida', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('costo_unitario', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('recibido', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
  
  
          
  
  
          objStore = db.createObjectStore('gl_telefono', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_persona', { unique: false });
          objStore.createIndex('numero', { unique: false });
          objStore.createIndex('fijo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
        
  
  
          objStore = db.createObjectStore('inv_compra', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('factura', { unique: false });
          objStore.createIndex('autorizacion', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('codigo_control', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('dias_credito', { unique: false });
          objStore.createIndex('a_cuenta', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('descuento_general', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('recargo', { unique: false });
          objStore.createIndex('ice', { unique: false });
          objStore.createIndex('excento', { unique: false });
          objStore.createIndex('tipo_descuento', { unique: false });
          objStore.createIndex('tipo_recargo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('cierre_caja', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('contabilizado', { unique: false });
          objStore.createIndex('usar_producto', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('dui', { unique: false });
          objStore.createIndex('tipo_retencion', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('tipo_movimiento', { unique: false });
          objStore.createIndex('importe_dolares', { unique: false });
          objStore.createIndex('total_dolares', { unique: false });
          objStore.createIndex('ver_dolares', { unique: false });
          objStore.createIndex('recargo_dolares', { unique: false });
          objStore.createIndex('ice_dolares', { unique: false });
          objStore.createIndex('descuento_dolares', { unique: false });
          objStore.createIndex('excento_dolares', { unique: false });
          objStore.createIndex('a_cuenta_dolares', { unique: false });
          objStore.createIndex('saldo_dolares', { unique: false });
          objStore.createIndex('calificacion_proveedor', { unique: false });
          objStore.createIndex('numero_iso_compra', { unique: false });
          objStore.createIndex('asiento_contabilidad', { unique: false });
          objStore.createIndex('descuento_gasolina', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('verificado_para_comprobante', { unique: false });
          objStore.createIndex('estado_programacion_pago', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('doc_rendicion', { unique: false });
          objStore.createIndex('compra_rendida', { unique: false });
          objStore.createIndex('iehd', { unique: false });
          objStore.createIndex('ipj', { unique: false });
          objStore.createIndex('tasas', { unique: false });
          objStore.createIndex('otros_ns_cf', { unique: false });
          objStore.createIndex('grav_tasa_cero', { unique: false });
  
  
          objStore = db.createObjectStore('inv_compra_programacion_pago', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_empresa', { unique: false });
          objStore.createIndex('id_usuario', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('correlativo', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('inv_compra_reprogramacion_pago', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('fecha_reprogramacion', { unique: false });
          objStore.createIndex('fecha_anterior', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('inv_cotizacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('id_usuario', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('id_sucursal', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('plazo', { unique: false });
          objStore.createIndex('nota', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('firma', { unique: false });
          objStore.createIndex('cargo', { unique: false });
          objStore.createIndex('fecha_estado', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('id_tipo_movimiento', { unique: false });
  
  
          objStore = db.createObjectStore('inv_detalle_combo_venta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('detalle_venta', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('observaciones', { unique: false });
          objStore.createIndex('mostrar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('inv_detalle_compra', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('centro_costo', { unique: false });
          objStore.createIndex('costo_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('recargo', { unique: false });
          objStore.createIndex('ice', { unique: false });
          objStore.createIndex('excento', { unique: false });
          objStore.createIndex('tipo_descuento', { unique: false });
          objStore.createIndex('tipo_recargo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('inventario', { unique: false });
          objStore.createIndex('it', { unique: false });
          objStore.createIndex('iue', { unique: false });
          objStore.createIndex('servicio', { unique: false });
          objStore.createIndex('costo_unitario_dolares', { unique: false });
          objStore.createIndex('importe_dolares', { unique: false });
          objStore.createIndex('total_dolares', { unique: false });
          objStore.createIndex('descuento_dolares', { unique: false });
          objStore.createIndex('recargo_dolares', { unique: false });
          objStore.createIndex('ice_dolares', { unique: false });
          objStore.createIndex('excento_dolares', { unique: false });
          objStore.createIndex('caja_chica_detalle_rendicion', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('correlativo_produccion', { unique: false });
          objStore.createIndex('iehd', { unique: false });
          objStore.createIndex('ipj', { unique: false });
          objStore.createIndex('tasas', { unique: false });
          objStore.createIndex('otros_ns_cf', { unique: false });
          objStore.createIndex('grav_tasa_cero', { unique: false });
  
  
          objStore = db.createObjectStore('inv_detalle_compra_programacion_pago', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_programacion_pago', { unique: false });
          objStore.createIndex('id_compra', { unique: false });
          objStore.createIndex('id_usuario', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('id_estado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('inv_detalle_cotizacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('cotizacion', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('precio_unitario', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('venta', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('descuento', { unique: false });
          objStore.createIndex('recargo', { unique: false });
          objStore.createIndex('ice', { unique: false });
          objStore.createIndex('excento', { unique: false });
          objStore.createIndex('tipo_descuento', { unique: false });
          objStore.createIndex('tipo_recargo', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('fecha_vencimiento', { unique: false });
          objStore.createIndex('lote', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          
  
  
          objStore = db.createObjectStore('inv_detalle_solicitud_producto', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('solicitud', { unique: false });
          objStore.createIndex('producto', { unique: false });
          objStore.createIndex('cantidad', { unique: false });
          objStore.createIndex('detalle_orden_reposicion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('detalle_solicitud_campamento', { unique: false });
  
  
          objStore = db.createObjectStore('inv_detalle_solicitud_producto_base', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('detalle_solicitud_producto', { unique: false });
          objStore.createIndex('producto_base', { unique: false });
          objStore.createIndex('cantidad_ideal', { unique: false });
          objStore.createIndex('cantidad_real', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('detalle_orden_reposicion', { unique: false });
  
  
          
  
  
          objStore = db.createObjectStore('inv_liquidacion_ventas_mesa', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('total', { unique: false });
          objStore.createIndex('visa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('pago_efectivo', { unique: false });
  
  
        
  
  
          objStore = db.createObjectStore('inv_pago_compra', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('a_cuenta_anterior', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('monto_pagado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('cierre_caja', { unique: false });
          objStore.createIndex('id_transaccion', { unique: false });
  
  
          objStore = db.createObjectStore('inv_pago_ot', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_ot', { unique: false });
          objStore.createIndex('a_cuenta_anterior', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('monto_pagado', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('anticipo', { unique: false });
  
  
          objStore = db.createObjectStore('inv_pago_venta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('venta', { unique: false });
          objStore.createIndex('a_cuenta_anterior', { unique: false });
          objStore.createIndex('saldo_anterior', { unique: false });
          objStore.createIndex('monto_pagado', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('numero_documento', { unique: false });
          objStore.createIndex('cierre_caja', { unique: false });
  
  
          objStore = db.createObjectStore('inv_solicitud_reposicion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('movimiento', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('monto', { unique: false });
          objStore.createIndex('comprobante', { unique: false });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('comensales', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('area', { unique: false });
          objStore.createIndex('numero_iso_consumo', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('solicitud_campamento', { unique: false });
          objStore.createIndex('campamento_sincronizado', { unique: false });
          objStore.createIndex('fecha_sincronizado', { unique: false });
          objStore.createIndex('id_cierre_usuario', { unique: false });
          objStore.createIndex('fecha_cierre', { unique: false });
          objStore.createIndex('campo', { unique: false });
  
  
         
  
  
          objStore = db.createObjectStore('inv_venta_ambiente', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('id_venta', { unique: false });
          objStore.createIndex('id_ambiente', { unique: false });
          objStore.createIndex('id_encargado', { unique: false });
          objStore.createIndex('liquidado', { unique: false });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('hora_inicio', { unique: false });
          objStore.createIndex('hora_fin', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('inv_venta_farmacia', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('venta', { unique: false });
          objStore.createIndex('diagnostico', { unique: false });
          objStore.createIndex('observaciones', { unique: false });
          objStore.createIndex('numero_receta', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('id_paciente', { unique: false });
  
  
          objStore = db.createObjectStore('inv_venta_reprogramacion_pago', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('venta', { unique: false });
          objStore.createIndex('fecha_reprogramacion', { unique: false });
          objStore.createIndex('fecha_anterior', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('mantenimiento_especialidad_precios', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('especialidad', { unique: false });
          objStore.createIndex('precio', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('orden_servicio', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('fecha', { unique: false });
          objStore.createIndex('fecha_entrega', { unique: false });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('compra', { unique: false });
          objStore.createIndex('sucursal', { unique: false });
          objStore.createIndex('almacen', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('concepto', { unique: false });
          objStore.createIndex('cambio_dolar', { unique: false });
          objStore.createIndex('detalle', { unique: false });
          objStore.createIndex('proveedor', { unique: false });
          objStore.createIndex('cliente', { unique: false });
          objStore.createIndex('eliminado', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('numero_correlativo', { unique: false });
          objStore.createIndex('area_solicitante', { unique: false });
          objStore.createIndex('area_destino', { unique: false });
          objStore.createIndex('importe', { unique: false });
          objStore.createIndex('tipo_pago', { unique: false });
          objStore.createIndex('dias_credito', { unique: false });
          objStore.createIndex('a_cuenta', { unique: false });
          objStore.createIndex('saldo', { unique: false });
          objStore.createIndex('estado', { unique: false });
          objStore.createIndex('numero_iso', { unique: false });
          objStore.createIndex('descripcion', { unique: false });
          objStore.createIndex('observacion', { unique: false });
          objStore.createIndex('config_doc_iso', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('schemaversion', { keyPath: 'id_idb', autoIncrement: true });
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('version', { unique: false });
          objStore.createIndex('name', { unique: false });
          objStore.createIndex('md5', { unique: false });
          objStore.createIndex('run_at', { unique: false });
  
  
          objStore = db.createObjectStore('sys_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('titulo', { unique: false });
          objStore.createIndex('atributo_clase', { unique: false });
          objStore.createIndex('url', { unique: false });
          objStore.createIndex('padre', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_empresa_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_integracion_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_integracion_empresa', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('integracion', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('usar_integracion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_opcion_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_rol', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('nombre', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_rol_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('rol', { unique: false });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('puede_ver', { unique: false });
          objStore.createIndex('puede_crear', { unique: false });
          objStore.createIndex('puede_modificar', { unique: false });
          objStore.createIndex('puede_eliminar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('persona', { unique: false });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('nombre_usuario', { unique: false });
          objStore.createIndex('clave', { unique: false });
          objStore.createIndex('token', { unique: false });
          objStore.createIndex('activo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('comision_general', { unique: false });
          objStore.createIndex('comision_activa', { unique: false });
          objStore.createIndex('usar_lector_de_barra', { unique: false });
          objStore.createIndex('autorizacion_caja_chica', { unique: false });
          objStore.createIndex('encargado_caja_chica', { unique: false });
          objStore.createIndex('encargado_rendicion_caja_chica', { unique: false });
          objStore.createIndex('encargado_verificacion_caja_chica', { unique: false });
          objStore.createIndex('usar_importacion_venta_servicio', { unique: false });
          objStore.createIndex('usar_filtro_lote', { unique: false });
          objStore.createIndex('empleado', { unique: false });
          objStore.createIndex('encargado_almacen_gestion', { unique: false });
          objStore.createIndex('administrador_panel_venta', { unique: false });
          objStore.createIndex('encargado_sincronizacion_gestion', { unique: false });
          objStore.createIndex('ver_listado_ventas', { unique: false });
          objStore.createIndex('crear_comprobante_antiguo', { unique: false });
          objStore.createIndex('activar_empleados_rrhh', { unique: false });
          objStore.createIndex('activar_cierre_mensual_proforma', { unique: false });
          objStore.createIndex('encargado_integracion_contable_gestion', { unique: false });
          objStore.createIndex('integracion_contable_mantenimiento', { unique: false });
          objStore.createIndex('integracion_contable_ropa_trabajo_rrhh', { unique: false });
          objStore.createIndex('encargado_programar_pago', { unique: false });
          objStore.createIndex('encargado_Aprobar_Rechazar_programacion_pago', { unique: false });
          objStore.createIndex('encargado_integracion_contable', { unique: false });
          objStore.createIndex('correccion_costo_unitario', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario_alerta', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('usar_vencimiento_producto', { unique: false });
          objStore.createIndex('usar_vencimiento_credito', { unique: false });
          objStore.createIndex('usar_vencimiento_deuda', { unique: false });
          objStore.createIndex('usar_pedido', { unique: false });
          objStore.createIndex('usar_venta', { unique: false });
          objStore.createIndex('usar_proforma', { unique: false });
          objStore.createIndex('usar_compra', { unique: false });
          objStore.createIndex('usar_banco_caja', { unique: false });
          objStore.createIndex('usar_otros', { unique: false });
          objStore.createIndex('usar_preventivo', { unique: false });
          objStore.createIndex('usar_correctivo', { unique: false });
          objStore.createIndex('usar_rutina', { unique: false });
          objStore.createIndex('usar_verificacion_caja_chica', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('usar_cierre_caja_chica', { unique: false });
          objStore.createIndex('usar_fondo_a_rendir', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('puede_ver', { unique: false });
          objStore.createIndex('puede_crear', { unique: false });
          objStore.createIndex('puede_modificar', { unique: false });
          objStore.createIndex('puede_eliminar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario_aplicacion_opcion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario_aplicacion', { unique: false });
          objStore.createIndex('opcion_aplicacion', { unique: false });
          objStore.createIndex('puede_ver', { unique: false });
          objStore.createIndex('puede_crear', { unique: false });
          objStore.createIndex('puede_modificar', { unique: false });
          objStore.createIndex('puede_eliminar', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario_grupos', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('grupo', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_usuario_rol', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('usuario', { unique: false });
          objStore.createIndex('rol', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
  
  
          objStore = db.createObjectStore('sys_vista_columnas_aplicacion', { keyPath: 'id_idb', autoIncrement: true });        
          objStore.createIndex('id', 'id', { unique: true });
          objStore.createIndex('empresa', { unique: false });
          objStore.createIndex('aplicacion', { unique: false });
          objStore.createIndex('configuracion', { unique: false });
          objStore.createIndex('createdAt', { unique: false });
          objStore.createIndex('updatedAt', { unique: false });
          objStore.createIndex('nombre', { unique: false });
  
  
                 */
        console.log("indexed-db models is set.")
      })

  });
