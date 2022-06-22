const version = 5;
let staticName = `staticCache-${version}`
let dynamicName = `dynamicName`;
let fontName = `fontCache-${version}`
let imgName = `imagenCache-${version}`
let assets = [
    '/',
    '/principal.html',
    '/manifest.json',
    '/assets/css/bootstrap.min.css',
    '/assets/font-awesome/4.2.0/css/font-awesome.min.css',
    '/assets/css/ace-skins.min.css',
    '/assets/css/jquery-ui.min.css',
    '/assets/css/bootstrap-duallistbox.min.css',
    '/assets/css/bootstrap-multiselect.min.css',
    '/assets/css/select2.min.css',
    '/assets/css/jquery-ui.custom.min.css',
    '/assets/css/chosen.min.css',
    '/assets/css/datepicker.min.css',
    '/assets/css/bootstrap-timepicker.min.css',
    '/assets/css/daterangepicker.min.css',
    '/assets/css/bootstrap-datetimepicker.min.css',
    '/assets/css/colorpicker.min.css',
    '/assets/css/color-picker.min.css',
    '/lib/ui-select-master/dist/select.min.css',
    '/assets/fonts/fonts.googleapis.com.css',
    '/assets/css/ace.min.css',
    '/assets/css/ace-part2.min.css',
    '/assets/css/ace-ie.min.css',
    '/assets/css/ace-rtl.min.css',
    '/assets/css/owl.carousel.css',
    '/assets/css/owl.theme.css',
    '/assets/css/responsive.css',
    '/assets/css/animate.css',
    '/css/custom.css',
    '/css/inicio.css',
    '/css/div_table.css',
    '/css/stylePacientes/pacientes.css',
    '/css/stylePacientes/style.css',
    '/css/progress_loader.css',
    '/css/stylePanelVentas/panel_ventas.css',
    '/css/stylePanelVentas/panel_ventas-express.css',
    '/css/stylePantalla/pantalla-cliente.css',
    '/css/stylePanelOperaciones/panel_operaciones.css',
    '/css/styleRRHH/rrhh.css',
    '/css/styleRRHH/style.css',
    '/css/iconosAgil/style.css',
    '/css/iconosBalneario/style.css',
    '/css/mantenimiento.css',
    '/assets/css/fullcalendar.min.css',
    '/css/mailbox.css',
    '/lib/swiper/swiper.min.css',
    '/assets/sweet-alert/sweetalert.min.css',
    '/assets/sweet-alert2/sweetalert2.min.css',
    '/assets/croppie/croppie.css',
    '/css/circle.css',
    '/lib/angular-block-ui/angular-block-ui.min.css',
    '/lib/angular-multi-select-master/isteven-multi-select.css',
    '/assets/icon-picker/ui-iconpicker.css',
    '/assets/angular-date-picker/angular-datepicker.css',
    '/lib/ketchup-plugin-master/css/jquery.ketchup.css',
    '/lib/pivot/pivot.min.css',
    '/lib/tablas-dinamicas-webdatarocks/webdatarocks.min.css',
    '/assets/js/ace-extra.min.js',
    '/assets/js/html5shiv.min.js',
    '/assets/js/respond.min.js',
    '/lib/swiper/swiper.min.js',
    '/assets/sweet-alert/sweetalert.min.js',
    '/assets/sweet-alert2/sweetalert2.all.min.js',
    '/assets/sweet-alert2/sweetalert2.min.js',
    '/assets/croppie/croppie.js',
    '/lib/pdfkit/pdfkit.js',
    '/lib/pdfkit/blob-stream.js',
    '/lib/pdfkit/qr.js',
    '/lib/pdfkit/pdfkit.min.js',
    '/lib/pdfkit/blob-stream.min.js',
    '/lib/pdfkit/qr.min.js',
    '/lib/bwip-js-min.js',
    '/lib/js-xlsx-master/xlsx.core.min.js',
    '/lib/FileSaver.js-master/FileSaver.min.js',
    '/lib/angular.min.js',
    '/lib/angular-resource.min.js',
    '/lib/angular-route.js',
    '/lib/angular-messages.js',
    '/lib/angular-messages.min.js',
    '/lib/angular-block-ui/angular-block-ui.min.js',
    '/lib/ngStorage.min.js',
    '/lib/ngStorage.js',
    '/lib/ui-bootstrap-tpls-1.3.3.min.js',
    '/assets/js/jquery.min.js',
    '/lib/angular-google-maps.min.js',
    '/lib/lodash.js',
    '/lib/lodash.min.js',
    '/lib/angular-simple-logger.js',
    '/lib/socket.io.js',
    '/lib/angular-socket-io-master/socket.min.js',
    '/lib/Chart.min.js',
    '/lib/angular-chart.js-master/dist/angular-chart.min.js',
    '/lib/oclazyload/dist/ocLazyLoad.min.js',
    '/lib/checklist-model.js',
    '/lib/checklist-model.min.js',
    '/lib/ng-cordova.js',
    '/lib/ng-cordova.min.js',
    '/lib/shortcut.js',
    '/lib/shortcut.min.js',
    '/lib/color-picker.min.js',
    '/lib/numero-literal.js',
    '/lib/numero-literal.min.js',
    '/lib/angular-multi-select-master/isteven-multi-select.js',
    '/lib/angular-table.js',
    '/assets/js/ng-infinite-scroll.min.js',
    '/lib/SweetAlert.min.js',
    '/lib/swangular.js',
    '/lib/ngMask-master/dist/ngMask.min.js',
    '/assets/icon-picker/ui-iconpicker.js',
    '/assets/angular-timer/humanize-duration.js',
    '/assets/angular-timer/angular-timer.js',
    '/assets/angular-date-picker/angular-datepicker.js',
    '/assets/ui-tinymce/tinymce/tinymce.min.js',
    '/assets/ui-tinymce/tinymce.js',
    '/lib/ChartGrafic.bundle.js',
    '/lib/ChartGrafic.bundle.min.js',
    '/lib/ChartGrafic.js',
    '/lib/ChartGrafic.min.js',
    '/assets/js/jquery.2.1.1.min.js',
    '/assets/js/jquery.1.11.1.min.js',
    '/assets/js/bootstrap.min.js',
    '/assets/js/jquery-ui.min.js',
    '/assets/js/jquery.ui.touch-punch.min.js',
    '/assets/js/jquery.dataTables.min.js',
    '/assets/js/jquery.dataTables.bootstrap.min.js',
    '/assets/js/dataTables.tableTools.min.js',
    '/assets/js/dataTables.colVis.min.js',
    '/assets/js/fuelux.wizard.min.js',
    '/assets/js/jquery.validate.min.js',
    '/assets/js/additional-methods.min.js',
    '/assets/js/bootbox.min.js',
    '/assets/js/jquery.maskedinput.min.js',
    '/assets/js/select2.min.js',
    '/assets/js/jquery.bootstrap-duallistbox.min.js',
    '/assets/js/jquery.raty.min.js',
    '/assets/js/bootstrap-multiselect.min.js',
    '/assets/js/typeahead.jquery.min.js',
    '/assets/js/smoothscroll.js',
    '/assets/js/jquery.scrollTo.min.js',
    '/assets/js/jquery.localScroll.min.js',
    '/assets/js/jquery.nav.js',
    '/assets/js/owl.carousel.js',
    '/assets/js/jquery.flexslider-min.js',
    '/assets/js/jquery.ajaxchimp.min.js',
    '/assets/js/matchMedia.js',
    '/assets/js/script.js',
    '/assets/js/wow.js',
    '/assets/js/easing.js',
    '/assets/js/excanvas.min.js',
    '/assets/js/jquery-ui.custom.min.js',
    '/assets/js/chosen.jquery.min.js',
    '/assets/js/fuelux.spinner.min.js',
    '/assets/js/bootstrap-datepicker.min.js',
    '/assets/js/bootstrap-timepicker.min.js',
    '/assets/js/moment.min.js',
    '/assets/js/es.js',
    '/assets/js/daterangepicker.min.js',
    '/assets/js/bootstrap-datetimepicker.min.js',
    '/assets/js/bootstrap-colorpicker.min.js',
    '/assets/js/jquery.knob.min.js',
    '/assets/js/jquery.autosize.min.js',
    '/assets/js/jquery.inputlimiter.1.3.1.min.js',
    '/assets/js/bootstrap-tag.min.js',
    '/assets/js/ace-elements.min.js',
    '/assets/js/ace.min.js',
    '/lib/ketchup-plugin-master/jquery.ketchup.all.min.js',
    '/assets/mantenimiento/wizard.min.js',
    '/assets/mantenimiento/jquery.dataTables.min.js',
    '/assets/mantenimiento/jquery.dataTables.bootstrap.min.js',
    '/assets/mantenimiento/dataTables.fixedColumns.min.js',
    '/assets/mantenimiento/dataTables.buttons.min.js',
    '/assets/mantenimiento/buttons.flash.min.js',
    '/assets/mantenimiento/buttons.html5.min.js',
    '/assets/mantenimiento/buttons.print.min.js',
    '/assets/mantenimiento/buttons.colVis.min.js',
    '/assets/mantenimiento/dataTables.select.min.js',
    '/assets/mantenimiento/moment.min.js',
    '/assets/mantenimiento/fullcalendar.min.js',
    '/assets/mantenimiento/bootbox.js',
    '/assets/mantenimiento/jquery.knob.min.js',
    '/assets/mantenimiento/bootstrap-multiselect.min.js',
    '/assets/mantenimiento/select2.min.js',
    '/lib/ui-select-master/dist/select.min.js',
    '/lib/toast/toastr.min.js',
    '/lib/pdfobject/pdfobject.min.js',
    '/lib/pivot/pivot.min.js',
    '/lib/pivot/plotly-basic-latest.min.js',
    '/lib/pivot/plotly_renderers.min.js',
    '/lib/pivot/export_renderers.min.js',
    '/lib/pivot/pivot.es.min.js',
    '/lib/tablas-dinamicas-webdatarocks/webdatarocks.toolbar.min.js',
    '/lib/tablas-dinamicas-webdatarocks/webdatarocks.js',
    '/lib/tablas-dinamicas-webdatarocks/webdatarocks.googlecharts.js',
    '/lib/tablas-dinamicas-webdatarocks/loader.js',
    '/assets/js/html2canvas.js',
    '/assets/js/canvasjs.min.js',
    '/lib/signature_pad.min.js',
    '/lib/flexmonster/flexmonster.min.css',
    '/lib/flexmonster/flexmonster.js'
];
let imgAssets = [
    '/img/agilsoftware.png',
    '/img/anticipos.png',
    '/img/bajar-comprobante.png',
    '/img/busViaje.png',
    '/img/CAJERA.png',
    '/img/carpeta-azul.png',
    '/img/cestoProductos.png',
    '/img/comida.png',
    '/img/contacto.png',
    '/img/distribucion.png',
    '/img/educacion.png',
    '/img/ejemploPlanCuenta.png',
    '/img/f608.png',
    '/img/finiquito.png',
    '/img/finiquito2.png',
    '/img/Gas-Pump-icon.png',
    '/img/hand-black.png',
    '/img/hand-green.png',
    '/img/hand-yellow.png',
    '/img/icon.png',
    '/img/icono-correlativo.png',
    '/img/icono-pedidos.png',
    '/img/icono-pedidos2.png',
    '/img/icono-pedidos22.png',
    '/img/icono-pistola.png',
    '/img/icono-viveres-2.png',
    '/img/importacion_venta_servicio.png',
    '/img/integracion.png',
    '/img/inventarios.png',
    '/img/iso-print.png',
    '/img/iso.png',
    '/img/map.png',
    '/img/marca-emserso.png',
    '/img/mesa-icon-venta.png',
    '/img/mesa.png',
    '/img/mesas1.png',
    '/img/pagoanticipo.png',
    '/img/pasajeros.png',
    '/img/pasajerosViaje.png',
    '/img/pedidos3 azul.png',
    '/img/pedidos3.png',
    '/img/promo.png',
    '/img/promo2.png',
    '/img/Red_Silhouette_-_Gear_and_Tools.svg.png',
    '/img/restexpress.png',
    '/img/subir-comprobante.png',
    '/img/vecindarios.png'
]
let controladores = [
    '/js/app.js',
    '/js/controladores.js',
    '/js/servicios.js',
    '/js/directivas.js',
    '/js/filtros.js',
    '/js/funciones.js',
    '/js/utilidades.js',
    '/js/gral/services/Paginator.js',
    '/js/gral/services/FieldViewer.js',
    '/js/agil/controladores/controladoresEmpresa.js',
    '/js/sys/controladores/controladoresUsuario.js',
    '/js/agil/controladores/controladoresCliente.js',
    '/js/agil/controladores/controladoresProveedor.js',
    '/js/agil/controladores/controladoresProducto.js',
    '/js/sys/controladores/controladoresConcepto.js',
    '/js/agil/controladores/controladoresSucursal.js',
    '/js/agil/controladores/controladoresDosificacion.js',
    '/js/agil/controladores/controladoresCodigoControl.js',
    '/js/agil/controladores/controladoresCompra.js',
    '/js/agil/controladores/controladoresInventario.js',
    '/js/agil/controladores/controladoresVenta.js',
    '/js/agil/controladores/controladoresFactura.js',
    '/js/agil/controladores/controladoresConfiguracionApp.js',
    '/js/agil/controladores/controladoresRuta.js',
    '/js/agil/controladores/controladoresSeguimientoApp.js',
    '/js/agil/controladores/controladoresPantalla.js',
    '/js/agil/controladores/controladoresBanco.js',
    '/js/agil/controladores/controladoresCierreCaja.js',
    '/js/agil/controladores/controladoresMesa.js',
    '/js/agil/controladores/controladoresCotizacion.js',
    '/js/agil/controladores/controladoresContabilidadCuenta.js',
    '/js/agil/controladores/ControladoresAsientosContables.js',
    '/js/agil/controladores/controladoresPacientes.js',
    '/js/agil/controladores/controladoresVehiculos.js',
    '/js/agil/controladores/controladoresRecursosHumanos.js',
    '/js/agil/controladores/ControladorPlanillaSueldos.js',
    '/js/agil/controladores/ControladorIncrementoSalarial.js',
    '/js/agil/controladores/ControladoresRCIVA.js',
    '/js/agil/controladores/ControladoresPlanillaRetroactivos.js',
    '/js/agil/controladores/ControladorPlanillaCargasSociales.js',
    '/js/agil/controladores/controladoresOperaciones.js',
    '/js/gtm/controladores/ControladorGtmEstibaje.js',
    '/js/gtm/controladores/ControladorGtmTransportista.js',
    '/js/gtm/controladores/ControladorGtmGrupoEstibaje.js',
    '/js/agil/controladores/controladoresProformas.js',
    '/js/gtm/controladores/ControladorGtmDestino.js',
    '/js/gtm/controladores/ControladorGtmDespacho.js',
    '/js/agil/controladores/ControladoresFarmacia.js',
    '/js/agil/controladores/controladoresPolifuncionalidad.js',
    '/js/agil/controladores/controladoresTransacciones.js',
    '/js/agil/controladores/controladoresPedidos.js',
    '/js/agil/controladores/ControladoresActivosFijos.js',
    '/js/gtm/controladores/ControladorGtmGeoLocalizacion.js',
    '/js/estadosFinancierosAgil/controladores/ControladorConfiguracionesEstadosFinancieros.js',
    '/js/estadosFinancierosAgil/controladores/ControladorBalanceGeneral.js',
    '/js/agil/controladores/ControladoresCajaChica.js',
    '/js/agil/controladores/ControladoresComensalesEmpresa.js',
    '/js/estadosFinancierosAgil/controladores/ControladorBalaceComprobacionSumaSaldo.js',
    '/js/estadosFinancierosAgil/controladores/ControladorEstadoResultados.js',
    '/js/estadosFinancierosAgil/controladores/ControladorComprobanteDiario.js',
    '/js/estadosFinancierosAgil/controladores/ControladorEstadoEvolucionPatrimonioNeto.js',
    '/js/estadosFinancierosAgil/controladores/ControladorResultadosAcumulados.js',
    '/js/agil/controladores/controladoresPorteria.js',
    '/js/agil/controladores/ControladoresReporteRendicionCajaChica.js',
    '/js/agil/controladores/ControladorPlanillaSubsidios.js',
    '/js/agil/controladores/ControladorPlanillaAguinaldos.js',
    '/js/agil/controladores/ControladorConsultaContableUno.js',
    '/js/agil/controladores/ControladorConsultaContableDos.js',
    '/js/agil/controladores/ControladorConsultaCostos.js',
    '/js/agil/controladores/ControladorConsultaCompras.js',
    '/js/agil/controladores/ControladorConsultaVentas.js',
    '/js/agil/controladores/ControladorPlanillaIncrementos.js',
    '/js/agil/controladores/ControladorRecibosTrasporte.js',
    '/js/agil/controladores/ControladorPlanillaRetroactivas.js',
    '/js/agil/controladores/ControladorBalneario.js',
    '/js/agil/controladores/ControladorCapacitacion.js',
    '/js/agil/controladores/controladoresMail.js',
    '/js/agil/controladores/controladoresFacturacion.js',
    '/js/agil/orden-servicio/controlador.js'
];
let servicios = [
    '/js/service-worker/serviceWorkerService.js',
    '/js/agil/servicios/serviciosProformas.js',
    '/js/agil/servicios/serviciosPolifuncionalidad.js',
    '/js/agil/orden-servicio/resources.js',
    '/js/agil/servicios/serviciosComprobanteContabilidad.js',
    '/js/agil/servicios/serviciosContabilidadCuentas.js',
    '/js/sys/servicios/serviciosUsuario.js',
    '/js/sys/servicios/serviciosTipo.js',
    '/js/sys/servicios/serviciosRol.js',
    '/js/agil/servicios/serviciosEmpresa.js',
    '/js/agil/servicios/serviciosCliente.js',
    '/js/agil/servicios/serviciosProveedor.js',
    '/js/agil/servicios/serviciosProducto.js',
    '/js/agil/servicios/serviciosSucursal.js',
    '/js/agil/servicios/serviciosDosificacion.js',
    '/js/agil/servicios/serviciosCodigoControl.js',
    '/js/agil/servicios/serviciosInventario.js',
    '/js/agil/servicios/serviciosFactura.js',
    '/js/agil/servicios/serviciosReporte.js',
    '/js/agil/servicios/serviciosConfiguracionApp.js',
    '/js/agil/servicios/serviciosRuta.js',
    '/js/agil/servicios/serviciosSeguimientoApp.js',
    '/js/agil/servicios/serviciosBanco.js',
    '/js/agil/servicios/serviciosCierreCaja.js',
    '/js/agil/servicios/serviciosCotizacion.js',
    '/js/agil/servicios/serviciosSalida.js',
    '/js/agil/servicios/serviciosEntrada.js',
    '/js/agil/servicios/serviciosPantalla.js',
    '/js/agil/servicios/serviciosMesa.js',
    '/js/agil/servicios/serviciosGeneral.js',
    '/js/agil/servicios/serviciosPaciente.js',
    '/js/agil/servicios/serviciosVehiculos.js',
    '/js/agil/servicios/serviciosRecursosHumanos.js',
    '/js/agil/servicios/serviciosOperaciones.js',
    '/js/gtm/servicios/serviciosDespacho.js',
    '/js/agil/servicios/serviciosFarmacia.js',
    '/js/agil/servicios/serviciosPlanillas.js',
    '/js/agil/servicios/serviciosPedidos.js',
    '/js/agil/servicios/serviciosActivosFijos.js',
    '/js/estadosFinancierosAgil/servicios/serviciosEstadosFinancieros.js',
    '/js/estadosFinancierosAgil/servicios/serviciosComprobanteDiario.js',
    '/js/agil/servicios/serviciosSolicitudCajaChica.js',
    '/js/agil/servicios/serviciosComensales.js',
    '/js/estadosFinancierosAgil/servicios/serviciosBalanceCompSumasSaldos.js',
    '/js/estadosFinancierosAgil/servicios/serviciosEvolucionPatrimonio.js',
    '/js/agil/servicios/serviciosRecibosTransporte.js',
    '/js/agil/servicios/serviciosBalneario.js',
    '/js/agil/servicios/serviciosCapacitacion.js',
    '/js/agil/servicios/serviciosMail.js',
    '/js/agil/servicios/serviciosFacturacion.js'
];
let serviciosIndexDb = [
    '/js/sys/servicios-indexeddb/serviciosUsuario.js',
    '/js/sys/servicios-indexeddb/serviciosTipo.js',
    '/js/agil/servicios-indexeddb/serviciosVenta.js',
    '/js/agil/servicios-indexeddb/serviciosFacturacion.js']
let templates = [
    '/templates/agil/activosFijos.html',
    '/templates/agil/balneario.html',
    '/templates/agil/bancos.html',
    '/templates/agil/caja-chica.html',
    '/templates/agil/capacitaciones.html',
    '/templates/agil/cierres-caja.html',
    '/templates/agil/clientes.html',
    '/templates/agil/codigo-control.html',
    '/templates/agil/comensalesEmpresaExterna.html',
    '/templates/agil/compras-mensuales.html',
    '/templates/agil/compras.html',
    '/templates/agil/comprobantes.html',
    '/templates/agil/configuraciones-app.html',
    '/templates/agil/configuraciones-factura.html',
    '/templates/agil/consulta-compras.html',
    '/templates/agil/consulta-contable-1.html',
    '/templates/agil/consulta-contable-2.html',
    '/templates/agil/consulta-costos.html',
    '/templates/agil/consulta-ventas.html',
    '/templates/agil/contabilidad-cuenta.html',
    '/templates/agil/cotizacion.html',
    '/templates/agil/dosificaciones.html',
    '/templates/agil/empresas.html',
    '/templates/agil/estado-cuentas-cliente.html',
    '/templates/agil/estado-cuentas-proveedor.html',
    '/templates/agil/estado-resultados-no-contable.html',
    '/templates/agil/farmacia.html',
    '/templates/agil/geoLocalizacion.html',
    '/templates/agil/incremento-salarial.html',
    '/templates/agil/inventarios.html',
    '/templates/agil/libro-compras.html',
    '/templates/agil/libro-ventas.html',
    '/templates/agil/mail.html',
    '/templates/agil/mailer.html',
    '/templates/agil/mantenimientos.html',
    '/templates/agil/mesa.html',
    '/templates/agil/operaciones.html',
    '/templates/agil/orden-servicio.html',
    '/templates/agil/pacientes.html',
    '/templates/agil/paginador-vista-inventario.html',
    '/templates/agil/pantalla-cliente.html',
    '/templates/agil/pantalla-despacho.html',
    '/templates/agil/pedidos.html',
    '/templates/agil/planilla-aguinaldos.html',
    '/templates/agil/planilla-cargas-sociales.html',
    '/templates/agil/planilla-incrementos.html',
    '/templates/agil/planilla-rc-iva.html',
    '/templates/agil/planilla-retroactivas.html',
    '/templates/agil/planilla-retroactivos.html',
    '/templates/agil/planilla-subsidos.html',
    '/templates/agil/planilla-sueldos.html',
    '/templates/agil/polifuncionalidad.html',
    '/templates/agil/porteria.html',
    '/templates/agil/productos.html',
    '/templates/agil/proformas.html',
    '/templates/agil/proveedores.html',
    '/templates/agil/recibos-transporte.html',
    '/templates/agil/reporte-almacenes.html',
    '/templates/agil/reporte-rapido-almacenes.html',
    '/templates/agil/reporte-rrhh.html',
    '/templates/agil/reportesRendicionCajaChica.html',
    '/templates/agil/retroactivos-cargas-sociales.html',
    '/templates/agil/rrhh.html',
    '/templates/agil/rutas.html',
    '/templates/agil/seguimiento-app.html',
    '/templates/agil/solicitud-caja-chica.html',
    '/templates/agil/sucursales.html',
    '/templates/agil/transacciones.html',
    '/templates/agil/vehiculos.html',
    '/templates/agil/ventas-mensuales.html',
    '/templates/agil/ventas.html',
    '/templates/gral/concepto-edicion-correlativos.html',
    '/templates/gral/concepto-edicion.html',
    '/templates/gral/fields-viewer.html',
    '/templates/gral/messages.html',
    '/templates/gral/paginator-graficas-empresa.html',
    '/templates/gral/paginator-graficos-empresa.html',
    '/templates/gral/paginator-header-1.html',
    '/templates/gral/paginator-header-2.html',
    '/templates/gral/paginator-header-lc.html',
    '/templates/gral/paginator-header-librocompras.html',
    '/templates/gral/paginator-reporte-facturas-proforma.html',
    '/templates/gral/paginator.html',
    '/templates/gral/paginatorRolTurnos.html',
    '/templates/gral/paginatorRolTurnosCalendario.html',
    '/templates/gral/concepto-edicion-riesgo-trabajo.html',
    '/templates/gtm/notifications/asignacion-despacho.html',
    '/templates/gtm/notifications/despachos.html',
    '/templates/gtm/despacho.html',
    '/templates/gtm/destino.html',
    '/templates/gtm/estibaje.html',
    '/templates/gtm/grupo-estibaje.html',
    '/templates/gtm/transportista.html',
    '/templates/sys/conceptos.html',
    '/templates/sys/usuarios.html',
    '/templates/autocompletar.html',
    '/templates/inicio.html',
    '/templates/agil/facturacion.html'
]
let indexeddb = [
    '/js/indexedDB.js',
    '/js/indexedDBconfig.js',
]
let cacheAssets = [...assets, ...controladores, ...servicios, ...serviciosIndexDb, ...templates, ...indexeddb]

self.addEventListener('install', async (ev) => {
    //Service workerhas  been installed
    //extendable events
    console.log(`Version ${version} installed`);
    //buld a cache
    ev.waitUntil(caches.open(staticName).then(cache => {
        cache.addAll(cacheAssets).then(() => {
            console.log(`${staticName} has beed update.`)
        }, (error) => {
            console.log(`fail to update ${staticName}.`)
        })
    }).then(() => {
        caches.open(imgName).then(cache => {
            cache.addAll(imgAssets).then(() => {
                console.log(`${imgName} has beed update.`)
            }, (error) => {
                console.log(`fail to update ${imgName}.`)
            })
        })
    })
    )
})
self.addEventListener('activate', (ev) => {
    //service worker is activated
    console.log("activated - this worker not used until page reloads")
    /*  clients.claim().then(()=>{
         //cleim means that the html file will use this new service worker
         console.log("the service worker now claimed all pages so they use the new serviceworker")
     }) */
    //delete old versions of caches
    ev.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter(key => {
                if (key != staticName && key != imgName) {
                    return true
                }
            }).map(keys => caches.delete(keys)))
        }))
})
self.addEventListener('fetch', (ev) => {
    ev.respondWith(
        //check cache. fetch if missing. then add response to cache
        caches.match(ev.request).then((cacheRes) => {
            return (
                cacheRes ||
                Promise.resolve().then(() => {
                    let opts = {
                        mode: ev.request.mode, //cors, no-cors, same-origin, navigate
                        cache: 'no-cache',
                    };/* 
                    if (!ev.request.url.startsWith(location.origin)) {
                        //not on the same domain as my html file
                        opts.mode = 'cors';
                        opts.credentials = 'omit';
                    } */
                    return fetch(ev.request).then((fetchResponse) => {
                        if (fetchResponse.ok) {
                            return handleFetchResponse(fetchResponse, ev)
                        }
                        let agilrute = ev.request.url.match('agilsoft2019srl')
                        if (agilrute) {
                            //save in image cache
                            console.log(`TODO: control this request: ${ev.request.url}`);
                        } else {
                            console.log(`TODO: save in sw file: ${ev.request.url}`);
                        }
                        return fetchResponse;
                    },
                        (err) => {
                            let agilrute = ev.request.url.match('agilsoft2019srl')
                            if (agilrute) {
                                //save in image cache
                                console.log(`TODO: control this request: ${ev.request.url}`);
                            }

                        })


                    //.catch()
                })
            );
        }) //end of match().then()
    ); //end of respondWith
}); //end of fetch listener

const handleFetchResponse = (fetchResponse, ev) => {
    let type = fetchResponse.headers.get('content-type');
    if (
        (type && type.match(/^text\/css/i)) ||
        ev.request.url.match(/fonts.googleapis.com/i)
    ) {
        //css to save in dynamic cache
        console.log(`save a CSS file ${ev.request.url}`);
        return caches.open(dynamicName).then((cache) => {
            cache.put(ev.request, fetchResponse.clone());
            return fetchResponse;
        });
    } else if (
        (type && type.match(/^font\//i)) ||
        ev.request.url.match(/fonts.gstatic.com/i)
    ) {
        console.log(`save a FONT file ${ev.request.url}`);
        return caches.open(fontName).then((cache) => {
            cache.put(ev.request, fetchResponse.clone());
            return fetchResponse;
        });
    } else if (type && type.match(/^images\//i)) {
        //save in image cache
        console.log(`save an IMAGE file ${ev.request.url}`);
        return caches.open(imgName).then((cache) => {
            cache.put(ev.request, fetchResponse.clone());
            return fetchResponse;
        });
    } else if (type && type.match(/^img\//i)) {
        //save in image cache
        console.log(`save an IMAGE file ${ev.request.url}`);
        return caches.open(imgName).then((cache) => {
            cache.put(ev.request, fetchResponse.clone());
            return fetchResponse;
        });
    } else {
        // save in dynamic cache
        let agilrute = ev.request.url.match('agilsoft2019srl')
        let sfeRutes = ev.request.url.match('api/1.0')
        if (!agilrute) {
            if (!sfeRutes) {
                console.log(`OTHER save ${ev.request.url}`);
                return caches.open(dynamicName).then((cache) => {
                    cache.put(ev.request, fetchResponse.clone());
                });
            }
        }
        return fetchResponse;
    }
};
self.addEventListener('message', (ev) => {
    //service worker is message
    console.log("message")
})