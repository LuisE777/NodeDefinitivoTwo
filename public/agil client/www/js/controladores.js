angular.module('agil.controladores', ['agil.servicios', 'blockUI'])
    .controller('ControladorPrincipal', ['$scope', '$sce', '$rootScope', '$route', '$templateCache', '$location', '$window', '$localStorage', 'Sesion', '$timeout', 'blockUI', 'UsuarioSucursalesAutenticacion', 'VencimientosProductosEmpresa', 'VencimientosCreditosEmpresa', 'VencimientosDeudasEmpresa', 'VentaEmpresaDatos', 'ClienteVencimientoCredito', '$http', 'Tipos', 'ProveedorVencimientoCredito', 'Venta', 'ClasesTipo', 'Compra', 'Producto', 'DatosVenta', 'DatosCompra', 'ImprimirSalida', 'Diccionario', 'VentasComprobantesEmpresa', 'ComprasComprobantesEmpresa', 'LibroMayorCuenta', 'Paginator', 'ComprobanteRevisarPaginador', 'AsignarComprobanteFavorito', 'ListaCuentasComprobanteContabilidad', 'NuevoComprobanteContabilidad', 'NuevoComprobante', 'ComprasComprobante', 'ConfiguracionesCuentasEmpresa', 'GuardarContabilidadCambioMoneda', 'ObtenerCambioMoneda', 'AsignarCuentaCiente', 'AsignarCuentaProveedor', 'GtmTransportistas', 'GtmEstibajes', 'GtmGrupoEstibajes', 'ListasCuentasAuxiliares', 'GtmDetallesDespachoAlerta', '$interval', 'GuardarGtmDetalleDespachoAlerta', 'GtmDetalleDespacho', 'VerificarCorrelativosSucursale', 'ReiniciarCorrelativoSucursales', 'ClasesTipoEmpresa', 'alertasProformasLista', 'UltimaFechaTipoComprobante', 'FacturaProforma', 'ListaDetallesProformasAFacturar', 'ProformasInfo', 'FacturarProformas', 'ImprimirPdfAlertaDespacho', 'ExportarExelAlarmasDespachos', 'VencimientoDosificaciones', 'EmpresaDatosInicio', 'VerificacionMensualActivos', 'ProductosPaginador', 'Pedidos', 'ClientesNit', 'GetCliente', 'ClientePedido', 'ClientePedidoRazonSocial', 'ClientePedidoDestino', '$filter', 'ObtenerAlertasCajaChica', 'GuardarVerificadorSolicitud', 'PagosVentaCreditos', 'CompraDatosCredito', 'ObtenerImagen', 'VerificarAutentificacionUsuarios', 'SalirAlias', 'FacturaProformaEliminar', 'ObtenerOpcionesAplicacionUsuario', 'LibroMayorCuentaReporte', 'alertasProformasCantidad', 'ObtenerConfiguracionesContablesComprobantes', 'alertasCajaChicaCantidad', 'alertasComprasCantidad', 'alertasVentasCantidad', 'alertasDespachoCantidad', 'alertasVencimientosDeudasCantidad', 'alertasCreditosVentaCantidad', 'ListaCuentasParaAsignar', 'GenerarImpresionCompra', 'ProductosPanelPedidos', 'ProformasFacturadas', 'ConfiguracionesFacturasProformas', 'ProveedoresNit', 'ObtenerCompraAsignadaComprobante', 'ConfiguracionCuentaEmpresa', 'GuardarProveedorCompraComprobante', 'SweetAlert', 'ObtenerActividadDosificacionFactura', 'ImprimirComprobante', 'ImprimirComprobanteRes', 'DatosComprobante', 'ObtenerRegistroPedidoPorId', 'GuardarVerificacionCompraComprobante', 'ObtenerOrdenServicio', 'NumeroLiteral', 'ProgramarPagoYmodifCompra', 'listaProgrPagosEmpresa', 'programarPagoAprobado', 'programarPagoRechazado', 'estadoProgramPago', 'listaCompraPrograPagoImpres', 'Prerequisito', 'Prerequisitos', 'PrerequisitosSave', 'ListaPrerequisitosEmpleado', 'ListaPrerequisitosPaciente', 'AsignarPrerequisitoPaciente', 'GetPrerequisitosPaciente', 'GetNumberAlerts', 'DeletePrerequisito', 'PrerequisitosHistorial', 'ReprogramarPrerequisitoPaciente', 'GuardarPrerequisitoPaciente', 'ListaAlertasPrerequisitosPaciente', 'ListaPrerequisitosCargos', 'GetCamposEmpresa', 'ListaPrerequisitosEntregas', 'ProductoKardex', 'ListaAlertasVacunasEmpresa', 'ObtenerConfigAlertas', 'GetVacunaProyeccion', 'GetVacunaPaciente', 'AplicacionPacienteVacuna', 'GuardarConfigAlertas', 'PrerequisitoPacienteById',
        'HistorialVacuna', 'ServiceWorkerService', 'SincronizacionesDiariasIndexDb', function ($scope, $sce, $rootScope, $route, $templateCache, $location, $window, $localStorage, Sesion, $timeout, blockUI, UsuarioSucursalesAutenticacion, VencimientosProductosEmpresa, VencimientosCreditosEmpresa, VencimientosDeudasEmpresa, VentaEmpresaDatos, ClienteVencimientoCredito, $http, Tipos, ProveedorVencimientoCredito, Venta, ClasesTipo, Compra, Producto, DatosVenta, DatosCompra, ImprimirSalida, Diccionario, VentasComprobantesEmpresa, ComprasComprobantesEmpresa, LibroMayorCuenta, Paginator, ComprobanteRevisarPaginador, AsignarComprobanteFavorito, ListaCuentasComprobanteContabilidad, NuevoComprobanteContabilidad, NuevoComprobante, ComprasComprobante, ConfiguracionesCuentasEmpresa, GuardarContabilidadCambioMoneda, ObtenerCambioMoneda, AsignarCuentaCiente, AsignarCuentaProveedor, GtmTransportistas, GtmEstibajes, GtmGrupoEstibajes, ListasCuentasAuxiliares, GtmDetallesDespachoAlerta, $interval, GuardarGtmDetalleDespachoAlerta, GtmDetalleDespacho, VerificarCorrelativosSucursale, ReiniciarCorrelativoSucursales, ClasesTipoEmpresa, alertasProformasLista, UltimaFechaTipoComprobante, FacturaProforma, ListaDetallesProformasAFacturar, ProformasInfo, FacturarProformas, ImprimirPdfAlertaDespacho, ExportarExelAlarmasDespachos, VencimientoDosificaciones, EmpresaDatosInicio, VerificacionMensualActivos, ProductosPaginador, Pedidos, ClientesNit, GetCliente, ClientePedido, ClientePedidoRazonSocial, ClientePedidoDestino, $filter, ObtenerAlertasCajaChica, GuardarVerificadorSolicitud, PagosVentaCreditos, CompraDatosCredito, ObtenerImagen, VerificarAutentificacionUsuarios, SalirAlias, FacturaProformaEliminar, ObtenerOpcionesAplicacionUsuario, LibroMayorCuentaReporte, alertasProformasCantidad, ObtenerConfiguracionesContablesComprobantes, alertasCajaChicaCantidad, alertasComprasCantidad, alertasVentasCantidad, alertasDespachoCantidad, alertasVencimientosDeudasCantidad, alertasCreditosVentaCantidad, ListaCuentasParaAsignar, GenerarImpresionCompra, ProductosPanelPedidos, ProformasFacturadas, ConfiguracionesFacturasProformas, ProveedoresNit, ObtenerCompraAsignadaComprobante, ConfiguracionCuentaEmpresa, GuardarProveedorCompraComprobante, SweetAlert, ObtenerActividadDosificacionFactura, ImprimirComprobante, ImprimirComprobanteRes, DatosComprobante, ObtenerRegistroPedidoPorId, GuardarVerificacionCompraComprobante, ObtenerOrdenServicio, NumeroLiteral, ProgramarPagoYmodifCompra, listaProgrPagosEmpresa, programarPagoAprobado, programarPagoRechazado, estadoProgramPago, listaCompraPrograPagoImpres, Prerequisito, Prerequisitos, PrerequisitosSave, ListaPrerequisitosEmpleado, ListaPrerequisitosPaciente, AsignarPrerequisitoPaciente, GetPrerequisitosPaciente, GetNumberAlerts, DeletePrerequisito, PrerequisitosHistorial, ReprogramarPrerequisitoPaciente, GuardarPrerequisitoPaciente, ListaAlertasPrerequisitosPaciente, ListaPrerequisitosCargos, GetCamposEmpresa, ListaPrerequisitosEntregas, ProductoKardex, ListaAlertasVacunasEmpresa, ObtenerConfigAlertas, GetVacunaProyeccion, GetVacunaPaciente, AplicacionPacienteVacuna, GuardarConfigAlertas, PrerequisitoPacienteById, HistorialVacuna,
            ServiceWorkerService, SincronizacionesDiariasIndexDb) {
            $scope.idModalTablaVencimientoProductos = "tabla-vencimiento-productos";
            $scope.idModalTablaDespachos = "tabla-gtm-despachos";
            $scope.idModalTablaAsignacionDespacho = "tabla-gtm-asignacion-despachos";
            $scope.idModalTablaVencimientoCreditos = "tabla-vencimiento-creditos";
            $scope.idModalTablaVencimientoDeudas = "tabla-vencimiento-deudas";
            $scope.idModalTablaVentasPendientes = "tabla-ventas-pendientes";
            $scope.idModalTablaComprasPendientes = "tabla-compras-pendientes";
            $scope.idModalTablaBancosPendientes = "tabla-bancos-pendientes";
            $scope.idModalTablaOtrosPendientes = "tabla-otros-pendientes";
            $scope.idModalPagoP = 'dialog-pago-credito';
            $scope.idModalPagoDeuda = 'dialog-pago-deuda';
            $scope.idmodalActualizarCreditoCliente = "dialog-actualizar-credito";
            $scope.idmodalActualizarCreditoDeuda = "dialog-actualizar-deudas";
            $scope.idModalDescuento = "dialog-edicion-descuento";
            $scope.idModalInicioSesion = "popup-inicio-sesion";
            $scope.idModalNuevoPedido = "modal-nuevo-pedido";
            $scope.idModalDatosProducto = "modal-dato-producto";
            $scope.idModalNuevoClientePedido = "modal-nuevo-cliente-pedido";
            $scope.idModalNuevaRazonCliente = "modal-nueva-razon-cliente";
            $scope.idModalNuevoDestino = "modal-nuevo-destino";
            $scope.idModalVerificacionCajaChica = "tabla-verificacion-caja-chica"
            $scope.IdModalVerificacionCompra = 'verificacion-datos-compra-comprobantes'
            //nuevo comprobante
            $scope.idModalWizardComprobanteEdicion = 'modal-wizard-comprobante-edicion';
            $scope.idPopupQr = 'modal-wizard-comprobante-edicions';
            $scope.IdModalOpcionesQr = 'modal-opciones-qr';
            $scope.IdModalRegistrarComprobante = 'modal-registrar';
            $scope.IdModalRevisarComprobante = 'modal-revisar';
            $scope.IdModalLibroMayor = 'modal-libro-contable';
            $scope.IdModalAsignarCuenta = 'dialog-asignar-cuenta';
            //fin nuevo comprobante
            $scope.IdModalEliminarProductoVencido = "eliminar-producto-vencido"
            //proformas facturacion
            $scope.dialogAlertasProformas = 'dialog-alertas-proforma'
            $scope.facturarProformas = 'proforma-facturacion'
            $scope.mensajeConfirmacionComprobante = 'comprobante-mensaje-confirmacion'
            $scope.idModalTablaComprasPendientes = "tabla-compras-pendientes";
            $scope.ModalMensajePago = "Modal-Mensaje-Pago";
            $scope.IdModalLibroCompraComprobante = "libro-de-compra-comprobante"
            $scope.ModalTablaListaProgrPagos = "tabla-programacion-pagos-compras"
            $scope.idModalDialogPrerequisitoNuevo = 'dialog-pre-requisito-nuevo';
            $scope.IdModalDialogPreRequisitos = 'dialog-pre-requisitos'
            $scope.idModalDialogPrerequisitosConfig = 'dialog-prerequisitos-config';
            $scope.idModalHistorialPrerequisito = 'dialog-historico-preRequisito';
            $scope.idModalEditarPrerequisito = 'dialog-editar-preRequisito';
            $scope.IdEntregaPrerequisito = 'dialog-entrega-preRequisito';
            $scope.idModalReprogramarPrerequisitos = "dialog-reprogramar-prerequisito";
            $scope.idInputDocPrerequisito = "id-doc-prerequisito";
            $scope.idModalAlertPrerequisitos = "dialog-alertPre-requisitos";
            $scope.idModalReportesPrerequisitosGeneral = "dialog-reportes-requisitos-general";
            $scope.idModalWizardProductoKardex = 'modal-wizard-producto-kardex';
            $scope.idModalAlertVacunas = "dialog-alertVacunas";
            $scope.idModalDiasActivacionPrerequisitos = "dialog-diasActivacion-Prerequisitos";
            $scope.idModalDiasActivacionVacunas = "dialog-diasActivacion-Vacunas";
            $scope.idModalDialogProyeccionVacunas = 'dialog-proyeccion-vacunas';


            $scope.diccionario = Diccionario;
            $scope.base_url = $location.$$absUrl.split('#/')[0];
            $scope.$on('$viewContentLoaded', function () {
                ejecutarScriptsInicio($scope.IdModalDialogPreRequisitos, $scope.idModalAlertPrerequisitos, $scope.idModalTablaVencimientoProductos, $scope.idModalTablaVencimientoCreditos, $scope.idModalTablaVencimientoDeudas, $scope.idModalPagoP, $scope.idmodalActualizarCreditoCliente, $scope.idmodalActualizarCreditoDeuda, $scope.idModalPagoDeuda, $scope.idModalDescuento, $scope.idModalTablaVentasPendientes, $scope.idModalTablaComprasPendientes, $scope.idModalTablaBancosPendientes, $scope.idModalTablaOtrosPendientes, $scope.idModalInicioSesion, $scope.idModalWizardComprobanteEdicion, $scope.IdModalOpcionesQr, $scope.IdModalRegistrarComprobante, $scope.IdModalRevisarComprobante, $scope.IdModalLibroMayor, $scope.IdModalAsignarCuenta, $scope.idModalTablaDespachos, $scope.idModalTablaAsignacionDespacho, $scope.IdModalEliminarProductoVencido, $scope.dialogAlertasProformas, $scope.facturarProformas, $scope.mensajeConfirmacionComprobante, $scope.idModalNuevoPedido, $scope.idModalDatosProducto, $scope.idModalNuevoClientePedido, $scope.idModalNuevaRazonCliente, $scope.idModalNuevoDestino, $scope.idModalVerificacionCajaChica, $scope.ModalMensajePago, $scope.IdModalLibroCompraComprobante, $scope.IdModalVerificacionCompra, $scope.ModalTablaListaProgrPagos, $scope.idModalDialogPrerequisitoNuevo, $scope.idModalDialogPrerequisitosConfig, $scope.idModalHistorialPrerequisito, $scope.idModalEditarPrerequisito, $scope.idModalReprogramarPrerequisitos, $scope.idInputDocPrerequisito, $scope.idModalReportesPrerequisitosGeneral, $scope.idModalWizardProductoKardex, $scope.idModalAlertVacunas, $scope.idModalDiasActivacionPrerequisitos, $scope.idModalDiasActivacionVacunas, $scope.idModalDialogProyeccionVacunas, $scope.IdEntregaPrerequisito)
                $rootScope.title = $route.current.title;
                $scope.inicio();
                $scope.recargarCache()
                blockUI.stop();
            });
            //modal comprobante nuevo
            $scope.$on('$routeChangeStart', function (next, current) {
                /* $scope.eliminarPopup($scope.idPopupQr);
                 $scope.eliminarPopup($scope.IdModalRegistrarComprobante);
                 $scope.eliminarPopup($scope.IdModalRevisarComprobante);
                 $scope.eliminarPopup($scope.idModalWizardComprobanteEdicion);
                 $scope.eliminarPopup($scope.IdModalLibroMayor);
                 $scope.eliminarPopup($scope.IdModalOpcionesQr);
                 $scope.eliminarPopup($scope.IdModalAsignarCuenta); 
                 $scope.eliminarPopup($scope.ModalMensajePago);*/
            });
            if ($localStorage.usuario) $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.dynamicPopoverCargosPre = {
                templateUrl: 'myPopoverTemplatePreCargos.html',
            };
            $scope.formatoFechaPDF = (fecha) => {
                /*
                fecha
                formatos aceptados:
                Iso string - 2020-12-31T23:59:59.999Z
                Internacional 2020-12-31 23:59:59 / 2020-12-31
                milisegundos 84328216
    
                return 31/12/2020
                */
                const _date = new Date(fecha);
                const _dateString = ('0' + _date.getDate()).slice(-2) + '/' + ('0' + (_date.getMonth() + 1)).slice(-2) + '/' + _date.getFullYear();
                return _dateString
            }
            $scope.formatoTiempoPDF = (fecha_hora) => {
                /*
                fecha
                formatos aceptados:
                Iso string - 2020-12-31T23:59:59.999Z
                Internacional 2020-12-31 23:59:59
                milisegundos 84328216
    
                return 23:59:59
                */
                const _time = new Date(fecha_hora);
                const _timeString = ('0' + _time.getHours()).slice(-2) + ':' + ('0' + (_time.getMinutes())).slice(-2) + ':' + _time.getSeconds();
                return _timeString
            }

            $scope.obtenerSucursales = function () {
                var sucursales = [];
                if ($scope.usuario.sucursalesUsuario) {
                    for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
                        sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
                    }
                }
                return sucursales;
            }            

            //modal nuevo comprobante
            $scope.validarGuardadoDeComprobante = function (form, nuevoComprobante, form2) {
                var mensaje = "cuenta "
                var CuentasSinGuardar = false
                var cont = 0
                $scope.comprobanteParaImpresion = nuevoComprobante
                $scope.cuentasCero = []
                let comprasfechas = []
                const fechaComprobante = new Date($scope.convertirFecha(nuevoComprobante.fecha))
                const finAnio2020 = new Date(2020, 11, 31, 23, 59, 59, 0)
                let fechaComprobanteComparacion = new Date($scope.convertirFecha(nuevoComprobante.fecha))
                if ($scope.usuario.id_empresa === 35 && fechaComprobanteComparacion.getTime() <= finAnio2020.getTime()) return SweetAlert.swal("Advertencia", 'El perio 2020 esta cerrado no se puede guardar el comprobante. Fecha del comprobante.:' + nuevoComprobante.fecha, "warning");
                if (nuevoComprobante.asientosContables.length == $scope.asientosEliminados) return SweetAlert.swal("Datos Faltantes", 'El Agregue Asientos Contables al Comprobante', "warning");
                for (let index = 0; index < nuevoComprobante.asientosContables.length; index++) {
                    const asiento = nuevoComprobante.asientosContables[index]
                    if (asiento.lc_comp_compra && asiento.lc_comp_compra.fecha) {
                        const fechaCompra = (asiento.lc_comp_compra.fecha.length > 10) ? new Date(asiento.lc_comp_compra.fecha) : new Date($scope.convertirFecha(asiento.lc_comp_compra.fecha));

                        if (fechaComprobante.getFullYear() != fechaCompra.getFullYear() || fechaComprobante.getMonth() != fechaCompra.getMonth()) comprasfechas.push(asiento)
                    }
                    let verificarCentroCosto = asiento.cuenta ? asiento.cuenta.clasificacion.usar_centro_costo ? !asiento.centroCosto ? true : asiento.centroCosto?.length == 0 ? true : false : false : false;
                    if (verificarCentroCosto) return SweetAlert.swal("Requerido", `El asiento Nº ${index + 1} no tiene asignado centros de costo.`, "warning");
                    const configAux = asiento.cuenta.tipoAuxiliar && asiento.cuenta.tipoAuxiliar.id && true || false || false;
                    if (!configAux) continue;
                    const ctaAux = asiento.cuentaAux && asiento.cuentaAux.nombre && true || false || false;
                    if (ctaAux) continue;
                    return SweetAlert.swal("", 'No se asignó cuenta auxiliar en uno o más asientos requeridos.', "warning");

                }

                if (comprasfechas.length > 0) {
                    const mensaje = comprasfechas.reduce((val, x) => {
                        val += val.length > 0 ? "---comp glosa: " + x.glosa + " compra: " + x.lc_comp_compra.fecha : "cuenta : " + x.cuenta.codigo + "." + x.cuenta.nombre + ",glosa :" + x.glosa + " y con fecha de la compra: " + x.lc_comp_compra.fecha
                        return val
                    }, "")
                    return SweetAlert.swal("", 'No se puede guardar el comprobante, hay compras que no corresponden al mes de registro. en fecha: ' + $scope.fechaATexto(fechaComprobante) + ".\n" + mensaje, "warning");
                }
                nuevoComprobante.asientosContables.forEach(function (asiento, index, array) {
                    if (asiento.debe_bs == 0 && asiento.haber_bs == 0) {
                        asiento.eliminado = true
                        if (index != (array.length - 1)) {
                            $scope.cuentasCero.push(asiento.cuenta.codigo + '-' + asiento.cuenta.nombre + ". ")
                            CuentasSinGuardar = true
                            cont++
                        }
                    }
                    if (index == (array.length - 1)) {
                        if (CuentasSinGuardar == false) {
                            var mensaje2 = ""
                            $scope.AbrirMensajeConfirmacionComprobante(mensaje2, form, form2)
                        } else {
                            if (cont == 1) {
                                var mensaje2 = ""
                                $scope.AbrirMensajeConfirmacionComprobante(mensaje2, form, form2)
                            } else {
                                var mensaje2 = ""
                                $scope.AbrirMensajeConfirmacionComprobante(mensaje2, form, form2)
                            }
                        }
                    }
                })
            }


            $scope.buscarProductos = function () {
                blockUI.start();
                $scope.paginator.filter = $scope.grupo !== undefined ? $scope.grupo : { id: 0 }
                $scope.paginator.itemsPerPage = 15;
                $scope.paginator.filter.subGrupo = 0;
                $scope.paginator.filter.idrelacion = 0;
                $scope.paginator.filter.grupo = 0;
                var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginator, $scope.usuario.id);
                promesa.then(function (dato) {
                    if (dato.hasErr) {
                        $scope.mostrarMensaje(dato.mensaje)
                    } else {
                        $scope.paginator.setPages(dato.paginas);
                        $scope.productos = dato.productos;
                    }

                    setTimeout(function () {
                        aplicarSwiper(4, 3, true, 2);
                    }, 1000);
                    blockUI.stop();
                }).catch(function (err) {
                    var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.data + '<br />' + err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor."
                    $scope.mostrarMensaje(memo)
                    blockUI.stop();
                })
            }

            $scope.obtenerProductos = function () {
                $scope.paginator = Paginator();
                $scope.paginator.column = "nombre";
                $scope.paginator.filter = $scope.grupo
                $scope.paginator.callBack = $scope.buscarProductos;
                $scope.paginator.getSearch("", null, null);
            }

            $scope.obtenerPanelProductosPedidos = function () {
                var promesa = ProductosPanelPedidos($scope.usuario.id_empresa, $scope.usuario.id);
                promesa.then(function (dato) {
                    if (dato.hasErr) {
                        $scope.mostrarMensaje(dato.mensaje)
                    } else {
                        $scope.productos = dato.productos;
                    }

                    setTimeout(function () {
                        aplicarSwiper(4, 3, true, 2);
                    }, 1000);
                    blockUI.stop();
                }).catch(function (err) {
                    var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.data + '<br />' + err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor."
                    $scope.mostrarMensaje(memo)
                    blockUI.stop();
                })
            }

            $scope.AbrirProducto = function (producto) {
                // console.log("elproductos es: ", producto);
                $scope.Datoproducto = producto;
                $scope.Datoproducto.cantidad = 1;
                $scope.Datoproducto.transporte = 0;
                $scope.Datoproducto.totalTransporte = 0;
                // la ventana ===
                $scope.abrirPopup($scope.idModalDatosProducto);
            }

            $scope.calcularTransporte = function () {
                $scope.Datoproducto.totalTransporte = Math.round(($scope.Datoproducto.cantidad * $scope.Datoproducto.transporte) * 1000) / 1000;
            }

            $scope.cerrarDatoProducto = function () {
                $scope.cerrarPopup($scope.idModalDatosProducto)
            }

            $scope.agregarDetallePedido = function (producto) {
                //console.log("producto sssssssssss ", producto);
                var detallePedido;
                $scope.cantidadInventario = 0;

                detallePedido = {
                    producto: producto,
                    id_producto: producto.id,
                    cantidad: producto.cantidad,
                    precio_unitario: producto.precio_unitario,
                    total: producto.cantidad * producto.precio_unitario,
                    servicio_transporte: producto.transporte,
                    latitud: 0,
                    longitud: 0,
                };


                $scope.pedido.detalles_despacho.push(detallePedido);

                $scope.cerrarDatoProducto();

                $scope.sumarTotalPedido();

            }

            $scope.sumarTotalPedido = function () {
                var sumaTotal = 0;
                for (var i = 0; i < $scope.pedido.detalles_despacho.length; i++) {
                    sumaTotal = sumaTotal + $scope.pedido.detalles_despacho[i].total;
                }
                $scope.pedido.totalPedido = Math.round((sumaTotal) * 1000) / 1000;
            }

            $scope.eliminarDetallePedido = function (detallePedido) {
                $scope.pedido.detalles_despacho.splice($scope.pedido.detalles_despacho.indexOf(detallePedido), 1);
                $scope.sumarTotalPedido();
            }

            $scope.buscarCliente = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ClientesNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            };
            $scope.habilitarDatos = true;
            $scope.establecerCliente = function (cliente) {
                $scope.pedido.cliente = cliente;

                var promesa = GetCliente(cliente.id);
                promesa.then(function (dato) {
                    // console.log("los datos cliente", dato);
                    $scope.pedido.clientes_razon = dato.clientes_razon;
                    $scope.pedido.destinos = dato.cliente_destinos;
                    $scope.habilitarDatos = false;
                    blockUI.stop();
                });
                // $scope.enfocar('razon_social');
                // //$scope.capturarInteraccion();
            }

            $scope.obtenerNit = function (razon) {
                $scope.pedido.cliente_nit = razon.nit;
            }

            $scope.obtenerDireccion = function (d) {
                // console.log("su destino ", d);
                $scope.pedido.destino_direccion = d.destino.direccion;
            }


            $scope.guardarPedido = function (valido, pedido) {
                // console.log("llegooooo a pedido guardar ", pedido);
                if (valido) {
                    $scope.ocultarMensajesValidacion();
                    var tiempoActual = new Date();
                    pedido.fecha = pedido.fechaTexto;

                    pedido.id_cliente = pedido.cliente.id;
                    pedido.id_destino = pedido.cliente_destino.id_destino;
                    pedido.id_cliente_razon = pedido.cliente_razon.id;
                    //venta.receptor=(venta.receptor!=undefined && venta.receptor!=null)?venta.receptor:((venta.receptor==undefined || venta.receptor==null)?(venta.textoVendedor!=""?{nombre_completo:venta.textoVendedor}:null):venta.receptor);
                    blockUI.start();

                    pedido.$save(function (res) {
                        if (res.hasError) {
                            blockUI.stop();
                            // $scope.crearNuevaVenta(res);
                            $scope.mostrarMensaje(res.message);
                        } else {
                            blockUI.stop();
                            $scope.cerrarNuevoPedido();
                            $scope.verificarDespachos($scope.usuario.id_empresa);

                            // $scope.crearNuevaVenta(res);
                            $scope.mostrarMensaje('Venta registrada exitosamente!');
                        }
                    }, function (error) {
                        blockUI.stop();
                        $scope.cerrarNuevoPedido();
                        $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                        // $scope.recargarItemsTabla();
                    });

                }
            }


            $scope.AbrirNuevoPedido = function (mensaje) {
                // alert("llegooooo");
                // $scope.obtenerProductos();
                $scope.obtenerPanelProductosPedidos();
                var fechaActual = new Date();

                $scope.pedido = new Pedidos({
                    id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, fechaTexto: "",
                    detalles_despacho: []
                });
                $scope.pedido.fechaTexto = (fechaActual.getDate() + 1) + "/" + ("0" + (fechaActual.getMonth() + 1)).slice(-2) + "/" + fechaActual.getFullYear();

                $scope.abrirPopup($scope.idModalNuevoPedido);
                $scope.pedido.totalPedido = 0;

                $scope.enfocar("razon_social");
            }

            $scope.enfocar = function (elemento) {
                $timeout(function () {
                    $("#" + elemento).focus();
                }, 0);
            }

            $scope.cerrarNuevoPedido = function () {
                $scope.cerrarPopup($scope.idModalNuevoPedido);
            }

            $scope.AbrirMensajeConfirmacionComprobante = function (mensaje, form, form2) {
                $scope.mensajeConfirmacion = mensaje
                $scope.formUno = form
                $scope.formDos = form2
                $scope.abrirPopup($scope.mensajeConfirmacionComprobante)
            }
            $scope.imprimirComprobanteCreado = function (comprobante, bimonetario, resumido) {
                blockUI.start();
                var promesa = DatosComprobante(comprobante.id)
                promesa.then(function (datosComprobante) {
                    if (datosComprobante.comprobante.asientosContables.length > 0) {
                        datosComprobante.comprobante.importe_literal = datosComprobante.importeLiteral
                        if (resumido) {
                            ImprimirComprobanteRes(datosComprobante.comprobante, bimonetario, $scope.usuario, $scope.number_format)
                        } else {
                            ImprimirComprobante(datosComprobante.comprobante, bimonetario, $scope.usuario, $scope.number_format)
                        }
                    } else {
                        SweetAlert.swal("", "El comprobante no tiene detalles para imprimir", "warning");
                    }
                    blockUI.stop();
                })
            }
            $scope.cerrarMensajeConfirmacionComprobante = function () {
                $scope.cerrarPopup($scope.mensajeConfirmacionComprobante)
            }
            $scope.ConfirmarGuardarComprobante = function (form, nuevoComprobante, form2) {
                var tamaño = nuevoComprobante.asientosContables.length - 1
                var ComprobantesEliminar = []
                if (!nuevoComprobante.asientosContables[tamaño].cuenta) {
                    $scope.nuevoComprobante.asientosContables.splice(tamaño, 1)
                }
                $scope.cerrarMensajeConfirmacionComprobante()
                $scope.AgregarComprobante(form, nuevoComprobante, form2)
                /*    }
    
               } */
            }

            $scope.asignarEmpresaExterna = function (clienteEmpresa) {
                $scope.empresaExternaSeleccionada = clienteEmpresa
                $location.path('/comensales')
            }

            $scope.fecha_excel_angular = function (fecha_desde_excel) {
                var fecha_minima_angular_indice_excel_1970 = 25569 - 1 //fecha minima angular. el -1 es para ajustar que el resultado da 1 anterior a la fecha real.
                var fecha_excel = new Date(1 / 1 / 1970)
                var diferencia_de_fecha = fecha_desde_excel - fecha_minima_angular_indice_excel_1970
                return fecha_excel.setTime(fecha_excel.getTime() + diferencia_de_fecha * 86400000)
            }
            $scope.AgregarComprobante = function (form, nuevoComprobante, form2) {
                // $scope.imprimirComprobanteCreado(nuevoComprobante)
                if ($scope.moneda.dolar != "--") {
                    if (nuevoComprobante.fecha) {
                        if ($scope.totales.debe_bs == $scope.totales.haber_bs && $scope.totales.debe_bs > 0 && $scope.totales.haber_bs > 0) {
                            var listaAsientosComprobante = []
                            nuevoComprobante.asientosContables.forEach(function (asiento, index, array) {
                                if (asiento.eliminado == false) {
                                    listaAsientosComprobante.push(asiento)
                                }
                                if (index === (array.length - 1)) {
                                    if (listaAsientosComprobante.length >= 2) {

                                        if (form != null) {
                                            if (!nuevoComprobante.fecha) {
                                                form.fecha.$error.required = true
                                            } else {
                                                form.fecha.$error.required = false
                                            }
                                            if (!nuevoComprobante.gloza) {
                                                form.gloza.$error.required = true
                                            } else {
                                                form.gloza.$error.required = false
                                            }
                                            if (nuevoComprobante.asientosContables.length <= 0) {
                                                form.asientos.$error.detalleAsiento = true
                                            } else {
                                                form.asientos.$error.detalleAsiento = false
                                            }
                                            if (!form.asientos.$error.detalleAsiento && !form.gloza.$error.required && !form.fecha.$error.required) {
                                                $scope.stopGuardadoAutomaticoComprobante()
                                                NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, $scope.convertirFecha, $scope.cerrarNuevoComprobante, $scope.nuevoComprobante, null, $scope.verificarVentasComprobantes, $scope.verificarComprasComprobantes, $scope.recargarItemsTabla, $scope.number_format, $scope.imprimirComprobanteCreado)
                                                // prom.then((res) => {
                                                //     $scope.mostrarMensaje(res.mensaje)
                                                //     blockUI.stop()
                                                // }).catch((err) => {
                                                //     blockUI.stop()
                                                //     let msg = (err.stack !== undefined && err.stack !== null) ? err.data +'<br />'+ err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                                //     $scope.mostrarMensaje(msg)
                                                // })
                                            }
                                        } else {
                                            if (form2) {
                                                $scope.stopGuardadoAutomaticoComprobante()
                                                NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, $scope.convertirFecha, $scope.cerrarNuevoComprobante, $scope.nuevoComprobante, null, $scope.verificarVentasComprobantes, $scope.verificarComprasComprobantes, $scope.recargarItemsTabla, $scope.number_format)
                                                $scope.totales = undefined
                                            }
                                        }
                                    } else {
                                        SweetAlert.swal("", "El comprobante debe tener mas de 2 cuentas para guardar", "warning");
                                    }
                                }
                            });


                        } else {
                            SweetAlert.swal("", "La suma total del DEBE y HABER deben ser iguales y mayores a 0", "warning");
                        }
                    } else {

                    }
                } else {
                    SweetAlert.swal("", "Datos nulos en bimonetario importar cambio moneda dolar y ufv para guardar", "warning");
                }
            }
            $scope.$watch('nuevoComprobante.fecha', function () {
                var date = new Date()
                if ($scope.nuevoComprobante) {
                    if (!$scope.nuevoComprobante.fecha) {
                        $scope.nuevoComprobante.fecha = $scope.fechaATexto(date)
                    }
                }
            }, true);

            $scope.ActivarDesactivarCopiaGlosa = function (comprobante) {
                if (comprobante.copia_glosa == true) {
                    comprobante.copia_glosa == false
                } else {
                    comprobante.copia_glosa == true
                }
            }
            $scope.calcularAsientoRetencionServicio = async function () {
                if ($scope.asientoActualFocus.debe_bs && $scope.asientoActualFocus.debe_bs > 0) {
                    let debe = ($scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].debe_bs * 100) / $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].cuenta = await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.iue.cuenta.codigo)
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].haber_bs = debe * ($scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100)
                    await $scope.agregarAsiento($scope.asientoActualFocus)

                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 2].cuenta = await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.it.cuenta.codigo)
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 2].haber_bs = debe * ($scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100)
                    await $scope.agregarAsiento($scope.asientoActualFocus)

                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].debe_bs = debe
                    let nombreInputUltimoAsiento = ($scope.nuevoComprobante.asientosContables.length - 1) + '-As'
                    $scope.enfocar(nombreInputUltimoAsiento)
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                }
                $scope.$evalAsync()
            }
            $scope.calcularAsientoRetencionBienes = async function () {
                if ($scope.asientoActualFocus.debe_bs && $scope.asientoActualFocus.debe_bs > 0) {
                    let debe = ($scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].debe_bs * 100) / $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].cuenta = await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.iue.cuenta.codigo)
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].haber_bs = debe * ($scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100)
                    if ($scope.nuevoComprobante.copia_glosa) {
                        $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].glosa = $scope.nuevoComprobante.gloza
                    }
                    await $scope.agregarAsiento($scope.asientoActualFocus)

                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 2].cuenta = await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.it.cuenta.codigo)
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 2].haber_bs = debe * ($scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100)
                    if ($scope.nuevoComprobante.copia_glosa) {
                        $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 2].glosa = $scope.nuevoComprobante.gloza
                    }
                    await $scope.agregarAsiento($scope.asientoActualFocus)

                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].debe_bs = debe
                    let nombreInputUltimoAsiento = ($scope.nuevoComprobante.asientosContables.length - 1) + '-As'
                    $scope.enfocar(nombreInputUltimoAsiento)
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                }
                $scope.$evalAsync()
            }
            $scope.obtenerCambioMoneda = async function () {
                var fecha = new Date()
                try {
                    var dato = await ObtenerCambioMoneda(fecha, $scope.usuario.id_empresa)
                    return dato.monedaCambio
                    // console.log(dato)
                } catch (error) {
                    console.log(error)
                }
            }

            $scope.guardadoAutomaticoComprobante = function () {
                $scope.GuardadoAutomaticoComprobante;
                // Don't start a new fight if we are already fighting
                $scope.GuardadoAutomaticoComprobante = $interval(function () {
                    if ($scope.nuevoComprobante.asientosContables.length > 2) {
                        $localStorage.nuevoComprobante = $scope.nuevoComprobante
                        $scope.ComprobanteGuardado = $localStorage.nuevoComprobante
                        // console.log($localStorage.nuevoComprobante)
                    }
                }, 300000);
            };
            $scope.pararAutoGuardado = function () {
                $interval.cancel($scope.GuardadoAutomaticoComprobante);
            }
            $scope.stopGuardadoAutomaticoComprobante = function () {
                $interval.cancel($scope.GuardadoAutomaticoComprobante);
                $window.localStorage.removeItem('ngStorage-nuevoComprobante');
                /* $localStorage.$reset({
                    usuario: local.usuario,
                    token: local.token
                }); */
                $localStorage.nuevoComprobante = undefined
                $scope.GuardadoAutomaticoComprobante = undefined;
                $scope.ComprobanteGuardado = undefined
            };
            $scope.limpiarArchivoImportacion = function () {
                $('.upload').val('');
            }
            $scope.verigicarRegistroAntiguo = function () {
                let fechaActual = new Date();
                let fechaCompro = new Date($scope.convertirFecha($scope.nuevoComprobante.fecha));
                if (fechaCompro.getMonth() == fechaActual.getMonth() && fechaCompro.getFullYear() == fechaActual.getFullYear()) {
                    $scope.desabilitarRegistroCompAntiguo = true;
                    $scope.nuevoComprobante.crearRegistroCompAntiguo = false
                } else {
                    $scope.desabilitarRegistroCompAntiguo = false;
                    $scope.nuevoComprobante.crearRegistroCompAntiguo = true
                }
            }
            $scope.obtenerCambioMoneda2 = function (fechaMoneda) {
                if (fechaMoneda.length == 10) {
                    var fecha = new Date(convertirFecha(fechaMoneda))
                    var promesa = ObtenerCambioMoneda(fecha, $scope.usuario.id_empresa)
                    promesa.then(function (dato) {
                        // console.log(dato)
                        if (dato.monedaCambio) {
                            $scope.moneda = dato.monedaCambio;

                        } else {
                            $scope.moneda = { ufv: "--", dolar: "--" }
                        }
                        if ($scope.nuevoComprobante) {
                            if ($scope.nuevoComprobante.asientosContables.length > 0) {
                                $scope.nuevoComprobante.asientosContables.forEach(function (asiento, index, array) {
                                    $scope.ComvertirDebeEnDolar(asiento)
                                    $scope.ComvertirHaberEnDolar(asiento)
                                    if (index === (array.length - 1)) {
                                        $scope.cal($scope.nuevoComprobante.asientosContables)
                                    }
                                });
                            }
                        }
                    })
                } else {
                    console.log("faltan datos")
                }
            }
            $scope.crearNuevoComprobante = async function (tipoCreacion, datosComprobanteNuevo) {/* venta, compra, comprobante, view, cierreCaja */

                $scope.obtenerCentroCostos();
                try {
                    blockUI.noOpen = true;
                    $scope.remarcar = true;
                    $scope.verComprobante = false
                    $scope.edicionCierre = false
                    $scope.crearRegistroCompAntiguo = false
                    $scope.htmlTooltip = $sce.trustAsHtml('Acciones Rapidas\
                <br>Ctrl+G=Guardar.\
                <br>Ctrl+shift+G=Guardado rapido.\
                <br>Ctrl+S=Generar retencion Servicio.\
                <br>Ctrl+B=Generar retencion Bervicio.');
                    $scope.plantillasCuentasCompobante = await $scope.ObtenerPlantillasCuenta()
                    $scope.moneda = await $scope.obtenerCambioMoneda();
                    $scope.listaConfiguracionesContables = await $scope.obtenerConfiguracionContable()
                    var oForm = document.getElementById('formNuevoComprobante');
                    shortcut.add("Ctrl+shift+G", function () {
                        if ($scope.nuevoComprobante.asientosContables.length >= 2) {
                            $localStorage.nuevoComprobante = $scope.nuevoComprobante
                            $scope.ComprobanteGuardado = $localStorage.nuevoComprobante
                            $scope.mostrarMensaje("comproban guardado en almacenamiento local Satisfactoriamente")
                        }
                    })
                    shortcut.add("Ctrl+G", function () {
                        $scope.validarGuardadoDeComprobante(null, $scope.nuevoComprobante, true)
                    });
                    shortcut.add("Ctrl+S", function () {
                        $scope.calcularAsientoRetencionServicio()
                    });
                    shortcut.add("Ctrl+B", function () {
                        $scope.calcularAsientoRetencionBienes()
                    });
                    $scope.alertasComprobantes = 0
                    if ($scope.ventasComprobantes) {
                        $scope.alertasComprobantes = $scope.alertasComprobantes + $scope.ventasComprobantes.length
                    }
                    if ($scope.comprasComprobantes) {
                        $scope.alertasComprobantes = $scope.alertasComprobantes + $scope.comprasComprobantes.length
                    }

                    var fecha = $scope.fechaATexto(new Date())
                    if ($scope.moneda) {
                        // console.log($scope.ventas)
                        var datee = new Date()
                        $scope.nuevoComprobante = { crearRegistroCompAntiguo: false, fechaActual: datee, copia_glosa: true, fecha: fecha, id_usuario: $scope.usuario.id, asientosContables: [], eliminado: 0, abierto: 0, importe: 0, id_sucursal: $scope.sucursales[0], tipoComprobante: $scope.tiposComprobantes[0], tipoCambio: $scope.moneda };
                        $scope.nuevoComprobante.crearRegistroCompAntiguo = $scope.usuario.crear_comprobante_antiguo ? true : false
                        $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                        $scope.verigicarRegistroAntiguo()
                        $scope.cuentaActual = {}
                        $scope.listaCuentasAuxiliaresClientes = await $scope.obtenerListarCuentasAuxiliares('CLIENTE')
                        $scope.listaCuentasAuxiliaresProveedor = await $scope.obtenerListarCuentasAuxiliares('PROVEEDOR')
                        $scope.listaCuentasAuxiliaresEmpleado = await $scope.obtenerListarCuentasAuxiliares('EMPLEADO')
                        $scope.gestiones = await $scope.obtenerGestiones()

                        $scope.ListaConfiguaracionCuenta = await $scope.ObtenerPlantillaIngresoEgreso();
                        $scope.crearRegistroComprobante(tipoCreacion, datosComprobanteNuevo)
                        $scope.$evalAsync()
                    } else {
                        $scope.mostrarMensaje("cargar cambio de UFV y dolar")
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            $scope.subirExcelUfvDolar = function (event) {
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        blockUI.start();
                        var data = e.target.result;

                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var mes = [];
                        do {
                            var dia = {};
                            var fecha_vencimiento = null;
                            if (worksheet['A' + row] != undefined && worksheet['A' + row] != "") {
                                if (typeof worksheet['A' + row].v === 'number') {
                                    if (worksheet['A' + row].v % 1 === 0) {
                                        fecha_vencimiento = new Date((worksheet['A' + row].v - (25567 + 1)) * 86400 * 1000);
                                    }
                                } else {
                                    fecha_vencimiento = new Date($scope.convertirFecha(worksheet['A' + row].v));
                                }
                            }
                            dia.ufb = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            dia.dolar = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            dia.fecha = fecha_vencimiento;
                            mes.push(dia);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        // console.log(mes)
                        $scope.guardarCambioMoneda(mes);
                        blockUI.stop();
                    };
                    reader.readAsBinaryString(f);
                }

            }
            $scope.guardarCambioMoneda = function (mes) {
                var promesa = GuardarContabilidadCambioMoneda(mes, $scope.usuario.id_empresa)
                /*   GuardarContabilidadCambioMoneda.save(mes, function (dato) { */
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.message)
                    if ($scope.moneda.dolar == "--") {
                        if ($scope.nuevoComprobante.fecha) {
                            $scope.obtenerCambioMoneda2($scope.nuevoComprobante.fecha)
                        } else {
                            var fecha = new Date()
                            $scope.obtenerCambioMoneda2(fecha)
                        }

                    }
                })

                /*  }) */
            }
            $scope.opcionBimonetario = false;
            $scope.VerBimonetario = function (asientos) {
                for (var i = 0; i < asientos.length; i++) {
                    var element = asientos[i];
                    if (element.debe_bs) {
                        $scope.ComvertirDebeEnDolar(element, false)
                    } else {
                        $scope.ComvertirHaberEnDolar(element, false)
                    }
                }
                // console.log($scope.opcionBimonetario)
                if ($scope.opcionBimonetario != true) {
                    $scope.opcionBimonetario = false;
                } else {
                    $scope.opcionBimonetario = true;
                }
            }

            $scope.cal = function (asientos) {
                $scope.totales = { debe_bs: 0, debe_sus: 0, haber_bs: 0, haber_sus: 0 }
                asientos.forEach(function (asiento, index, array) {
                    /* if (asiento.centrosCostos) {
                        asiento.centroCosto=[]
                        for (var i = 0; i < asiento.centrosCostos.length; i++) {
                            var x = asiento.centrosCostos[i];
                            asiento.centroCosto.push($scope.centrosDeCostos.find(function (cc) {
                                return x.id_centro_costo === cc.id
                            }))
                        }
                    } */
                    if (asiento.eliminado != true) {
                        if (asiento.debe_bs != "") {
                            $scope.totales.debe_bs = $scope.totales.debe_bs + asiento.debe_bs
                        } else {
                            asiento.debe_bs = 0;
                            $scope.totales.debe_bs = $scope.totales.debe_bs + asiento.debe_bs
                        }
                        if (asiento.debe_sus != "") {
                            $scope.totales.debe_sus = $scope.totales.debe_sus + asiento.debe_sus
                        } else {
                            asiento.debe_sus = 0;
                            $scope.totales.debe_sus = $scope.totales.debe_sus + asiento.debe_sus
                        }
                        if (asiento.haber_bs != "") {
                            $scope.totales.haber_bs = $scope.totales.haber_bs + asiento.haber_bs
                        } else {
                            asiento.haber_bs = 0
                            $scope.totales.haber_bs = $scope.totales.haber_bs + asiento.haber_bs
                        }
                        if (asiento.haber_sus != "") {
                            $scope.totales.haber_sus = $scope.totales.haber_sus + asiento.haber_sus
                        } else {
                            asiento.haber_sus = 0
                            $scope.totales.haber_sus = $scope.totales.haber_sus + asiento.haber_sus
                        }
                    }
                    if (index === array.length - 1) {
                        $scope.totales.haber_bs = Math.round($scope.totales.haber_bs * 10000) / 10000
                        $scope.totales.debe_sus = Math.round($scope.totales.debe_sus * 1000) / 1000
                        $scope.totales.debe_bs = Math.round($scope.totales.debe_bs * 10000) / 10000
                        $scope.totales.haber_sus = Math.round($scope.totales.haber_sus * 1000) / 1000
                    }

                }, this);
            }
            $scope.obtenerConfiguracionContable = async function () {
                try {
                    var dato = await ObtenerConfiguracionesContablesComprobantes($scope.usuario.id_empresa)
                    dato.forEach(function (x) {
                        x.movimientosCentrosCosto = x.movimientosCentrosCosto.reduce(function (val, x) {
                            val.push(x.movimiento)
                            return val
                        }, [])
                        x.movimientosAuxiliares = x.movimientosAuxiliares.reduce(function (val, x) {
                            val.push(x.movimiento)
                            return val
                        }, [])
                    })
                    return dato

                } catch (error) {
                    console.log(error)
                }


            }
            $scope.modificarGlosaComprobante = () => {
                $scope.modificarGlosa = true;
                $scope.enfocar("glosa-general-comprobante");
            }
            $scope.realizarComprobandeEdicion = function (comprobante) {
                $scope.asientosEliminados = 0;
                $scope.nuevoComprobante = comprobante;
                $scope.nuevoComprobante.crearRegistroCompAntiguo = true
                $scope.nuevoComprobante.asientosContables.forEach(async function (asiento, index, array) {
                    asiento.cuenta = await $scope.buscarCuentaVinculanteLc(asiento.cuenta.codigo);
                    if (asiento.centrosCostos) {
                        asiento.centroCosto = []
                        for (var i = 0; i < asiento.centrosCostos.length; i++) {

                            var x = asiento.centrosCostos[i];
                            asiento.centroCosto.push($scope.centrosDeCostos.find(function (cc) {
                                return x.id_centro_costo === cc.id
                            }))
                        }
                    }
                })
                if (comprobante.sucursal) {
                    $scope.nuevoComprobante.id_sucursal = comprobante.sucursal
                }
                if (comprobante.fecha.length == 10) {
                    var fecha = comprobante.fecha
                    $scope.nuevoComprobante.fecha = fecha
                } else {
                    var fecha = new Date(comprobante.fecha)
                    $scope.nuevoComprobante.fecha = $scope.fechaATexto(fecha)
                }
                $scope.totales = { debe_bs: 0, debe_sus: 0, haber_bs: 0, haber_sus: 0 }
                $scope.cal($scope.nuevoComprobante.asientosContables)
                $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
            }
            $scope.realizarComprobandeVista = function (comprobante) {
                $scope.verComprobante = true
                $scope.pararAutoGuardado()
                $scope.realizarComprobandeEdicion(comprobante)
            }
            $scope.realizarComprobandeVenta = async function (datos) {
                let a = false;
                let ventas = []
                if (datos instanceof Array) {
                    ventas = datos
                } else {
                    ventas.push(datos)
                }
                for (const venta of ventas) {
                    if (venta.check) {
                        if (venta.cliente.clienteCuenta != null) {
                            let cuenta = venta.cliente.clienteCuenta.cuenta
                            for (const configuracionCuenta of $scope.ListaConfiguaracionCuenta) {
                                if (configuracionCuenta.tipo.nombre_corto == Diccionario.MOV_ING) {
                                    if (configuracionCuenta.nombre == "IT" || configuracionCuenta.nombre == "CAJA/BANCOS") {
                                        let asiento = {
                                            idAsignado: null, idPadre: null, id_venta: venta.id,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: venta.total * configuracionCuenta.valor / 100, haber_bs: "", debe_sus: Math.round(((venta.total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                        }
                                        if ($scope.datos_glosa_individual) {
                                            asiento.glosa = $scope.texto_datos_glosa_individual + " " + venta.factura + ", " + venta.cliente.razon_social + "."
                                        }

                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        $scope.nuevoComprobante.asientosContables.push(asiento);
                                    } else if (configuracionCuenta.nombre == "IVA DF" || configuracionCuenta.nombre == "IT POR PAGAR") {
                                        let asiento = {
                                            idAsignado: null, idPadre: null,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: venta.total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((venta.total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                        }
                                        if ($scope.datos_glosa_individual) {
                                            asiento.glosa = $scope.texto_datos_glosa_individual + " " + venta.factura + ", " + venta.cliente.razon_social + "."
                                        }

                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        $scope.nuevoComprobante.asientosContables.push(asiento);
                                    }
                                }
                            }
                            let asiento = {
                                idAsignado: null, idPadre: null,
                                cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo), debe_bs: "", haber_bs: venta.total * (87 / 100), debe_sus: "", haber_sus: Math.round(((venta.total * 87 / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                            }
                            if ($scope.datos_glosa_individual) {
                                asiento.glosa = $scope.texto_datos_glosa_individual + " " + venta.factura + ", " + venta.cliente.razon_social + "."
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);

                        } else {
                            $scope.mostrarMensaje("asignar Cuenta")
                        }
                    }
                }
                $scope.cal($scope.nuevoComprobante.asientosContables)
                $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                $scope.verigicarRegistroAntiguo()
            }
            $scope.realizarComprobandeCompra = async function (compra) {
                try {
                    let a = false;
                    let compras = []
                    if (compra instanceof Array) {
                        compras = compra
                    } else {
                        compra.check = true
                        compras.push(compra)
                    }
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    /* let configuracionCompra = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'ALMACEN'
                    })
                    , */
                    for (const compra2 of compras) {
                        if (compra2.almacen) {
                            compra2.id_sucursal = compra2.almacen.id_sucursal
                        }
                        $scope.configuracionComprobantesActual = $scope.listaConfiguracionesContables.find(function (x) {
                            return x.integracion.moduloIntegracion.aplicacion.titulo == 'COMPRAS' && x.integracion.moduloIntegracion.nombre == 'COMPRA'
                        })
                        var tipoCom = $scope.tiposComprobantes.find(function (x) {
                            return x.id == $scope.configuracionComprobantesActual.id_tipo_comprobante
                        })
                        $scope.nuevoComprobante.tipoComprobante = tipoCom
                        if (compra2.check) {
                            if (compra2.movimiento == undefined) {
                                compra2.movimiento = { clase: compra2.tipoMovimiento }
                            }
                            $scope.nuevoComprobante.id_compra = compra2.id

                            if (compra2.proveedor.proveedorCuentas.length > 0) {

                                let cuenta = null;
                                let cuentaHaber = null;
                                for (const item of compra2.proveedor.proveedorCuentas) {
                                    if (item.tipo.nombre_corto === "DEBE") {
                                        cuenta = item.cuenta
                                    }
                                    if (item.tipo.nombre_corto === "HABER") {
                                        cuentaHaber = item.cuenta
                                    }


                                }
                                if (cuenta && cuentaHaber) {

                                    let extra = 0
                                    // let total = compra2.total
                                    let total = compra2.importe - (compra2.descuento ? compra2.descuento : 0)
                                    if (compra2.excento > 0) {
                                        total = compra2.total + compra2.excento
                                        extra = total * (30 / 100)
                                        total = total * (70 / 100)

                                    }
                                    let retencion = compra2.tipo_retencion ? "(Si)" : "(No)"
                                    if (compra2.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION || compra2.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_DIARIO) {
                                        let asiento = {
                                            cuentaAux: {}, centroCosto: [],
                                            idAsignado: null, idPadre: null,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo),
                                            debe_bs: total * (87 / 100) + extra,
                                            haber_bs: "",
                                            debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000,
                                            haber_sus: "", eliminado: false, activo: true, isOpen: false
                                        }
                                        if ($scope.datos_glosa_individual) {
                                            asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                        } else {
                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                        }
                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        asiento.id_compra = compra2.id
                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                            asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                        }
                                        $scope.nuevoComprobante.asientosContables.push(asiento);

                                        let configuracionCuenta = configuracionesCuenta.find(x => {
                                            return x.concepto.nombre_corto === 'IVA CF' && x.tipo.nombre_corto == Diccionario.MOV_EGR
                                        })
                                        asiento = {
                                            cuentaAux: {}, centroCosto: [], idAsignado: null,
                                            idPadre: null, cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo),
                                            debe_bs: total * configuracionCuenta.valor / 100, haber_bs: "", debe_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                        }
                                        if ($scope.datos_glosa_individual) {
                                            asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                        } else {
                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                        }

                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                        asiento.id_compra = compra2.id
                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                            asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                        }
                                        $scope.nuevoComprobante.asientosContables.push(asiento);

                                        configuracionCuenta = configuracionesCuenta.find(x => {
                                            return x.concepto.nombre_corto === 'CAJA/BANCOS' && x.tipo.nombre_corto == Diccionario.MOV_EGR
                                        })
                                        asiento = {
                                            cuentaAux: {}, centroCosto: [],
                                            idAsignado: null, idPadre: null,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(cuentaHaber.codigo),
                                            debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100,
                                            debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                        }
                                        if ($scope.datos_glosa_individual) {
                                            asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                        } else {
                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                        }
                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        asiento.id_compra = compra2.id
                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                            asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                        }
                                        $scope.nuevoComprobante.asientosContables.push(asiento);


                                    } else if (compra2.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_COMPRA_SIN_FACTURA) {
                                        let asiento = {
                                            cuentaAux: {},
                                            centroCosto: [], idAsignado: null,
                                            idPadre: null,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(cuentaHaber.codigo),
                                            debe_bs: "", haber_bs: total, debe_sus: "",
                                            haber_sus: Math.round(((total) / $scope.moneda.dolar) * 10000) / 10000,
                                            eliminado: false, activo: true, isOpen: false
                                        }

                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        asiento.id_compra = compra2.id
                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                            asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                        }
                                        $scope.nuevoComprobante.asientosContables.push(asiento);
                                        asiento = {
                                            cuentaAux: {},
                                            centroCosto: [], idAsignado: null,
                                            idPadre: null,
                                            cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo),
                                            debe_bs: total, haber_bs: "",
                                            debe_sus: Math.round(((total) / $scope.moneda.dolar) * 10000) / 10000,
                                            haber_sus: "", eliminado: false, activo: true, isOpen: false
                                        }

                                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                        asiento.id_compra = compra2.id
                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                            asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                        }
                                        $scope.nuevoComprobante.asientosContables.push(asiento);
                                    } else if (compra2.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                                        if (compra2.tipo_retencion) {
                                            let asiento = {
                                                cuentaAux: {},
                                                centroCosto: [],
                                                idAsignado: null,
                                                idPadre: null,
                                                cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo), debe_bs: total, haber_bs: "", debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                            }
                                            if ($scope.datos_glosa_individual) {
                                                asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                            } else {
                                                asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                            }
                                            let asiento2 = {}
                                            let tiposCompras = { alm: 0, gasto: 0 }

                                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                            asiento.id_compra = compra2.id
                                            if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                                asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                            }
                                            $scope.nuevoComprobante.asientosContables.push(asiento)
                                            for (const configuracionCuenta of configuracionesCuenta) {
                                                if (configuracionCuenta.tipo.nombre_corto == Diccionario.MOV_ING && configuracionCuenta.configuracion.nombre === "RETENCION DE SERVICIOS") {

                                                    if (configuracionCuenta.nombre == 'CUENTA DE SERVICIO' || configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                        asiento2 = { cuentaAux: {}, centroCosto: [], idAsignado: null, idPadre: null, cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false }
                                                        if ($scope.datos_glosa_individual) {
                                                            asiento2.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                                        } else {
                                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                                        }
                                                        /* if (configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                            asiento.debe_bs = asiento.debe_bs + total * configuracionCuenta.valor / 100
                                                        } */
                                                        asiento2.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                                        asiento2.id_compra = compra2.id

                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento2.cuenta.tipoAuxiliar) {
                                                            asiento2.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asiento2)
                                                    }

                                                }

                                            }
                                        } else {
                                            let asiento = {
                                                cuentaAux: {}, centroCosto: [], idAsignado: null, idPadre: null,
                                                cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo), debe_bs: total, haber_bs: "", debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                            }
                                            if ($scope.datos_glosa_individual) {
                                                asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                            } else {
                                                asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                            }
                                            let asiento2 = {}
                                            let asientoServ = {}
                                            let tiposCompras = { alm: 0, gasto: 0 }

                                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                            asiento.id_compra = compra2.id
                                            if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                                asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                            }
                                            $scope.nuevoComprobante.asientosContables.push(asiento);
                                            for (const configuracionCuenta of configuracionesCuenta) {
                                                if (configuracionCuenta.tipo.nombre_corto == Diccionario.MOV_ING && configuracionCuenta.configuracion.nombre === "RETENCION DE SERVICIOS") {

                                                    if (configuracionCuenta.nombre == 'CUENTA DE SERVICIO') {
                                                        asientoServ = { cuentaAux: {}, centroCosto: [], idAsignado: null, idPadre: null, cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false }
                                                        if ($scope.datos_glosa_individual) {
                                                            asientoServ.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                                        } else {
                                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                                        }
                                                        asientoServ.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                                        asientoServ.id_compra = compra2.id
                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asientoServ.cuenta.tipoAuxiliar) {
                                                            asientoServ.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asientoServ)
                                                    }
                                                    if (configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                        asiento2 = { cuentaAux: {}, centroCosto: [], idAsignado: null, idPadre: null, cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false }
                                                        if ($scope.datos_glosa_individual) {
                                                            asiento2.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                                        } else {
                                                            asiento.glosa = compra2.proveedor.razon_social + ", F-" + compra2.factura + ",OC/OP:, , " + (compra2.numero_iso_compra ? "NI: " + compra2.numero_iso_compra + ", " : "") + (compra2.observacion ? compra2.observacion + ", " : "") + $scope.meses[new Date(compra2.fecha).getMonth()].nombre.toUpperCase() + " " + new Date(compra2.fecha).getFullYear() + '.'
                                                        }
                                                        //asientoServ.haber_bs = asientoServ.haber_bs - asiento2.haber_bs
                                                        asiento2.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                                        asiento2.id_compra = compra2.id
                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento2.cuenta.tipoAuxiliar) {
                                                            asiento2.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asiento2)
                                                    }

                                                }

                                            }
                                        }
                                    } else if (compra2.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                                        if (compra2.tipo_retencion) {
                                            let asiento = {
                                                cuentaAux: {}, centroCosto: [],
                                                idAsignado: null, idPadre: null,
                                                cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo),
                                                debe_bs: total,
                                                haber_bs: "",
                                                debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000,
                                                haber_sus: "",
                                                eliminado: false, activo: true, isOpen: false
                                            }
                                            if ($scope.datos_glosa_individual) {
                                                asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                            }
                                            let asiento2 = {}
                                            let tiposCompras = { alm: 0, gasto: 0 }

                                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                            asiento.id_compra = compra2.id
                                            if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                                asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                            }
                                            $scope.nuevoComprobante.asientosContables.push(asiento);
                                            for (const configuracionCuenta of configuracionesCuenta) {
                                                if (configuracionCuenta.tipo.nombre_corto == Diccionario.MOV_ING && configuracionCuenta.configuracion.nombre === "RETENCION DE BIENES (GASTO)") {
                                                    if (configuracionCuenta.nombre == 'CUENTA DE GASTO' || configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                        asiento2 = {
                                                            idAsignado: null,
                                                            cuentaAux: {}, centroCosto: [],
                                                            idPadre: null,
                                                            glosa: " (" + compra2.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                                                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo),
                                                            debe_bs: "",
                                                            haber_bs: total * configuracionCuenta.valor / 100,
                                                            debe_sus: "",
                                                            haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                                        }
                                                        /* if (configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                            asiento.debe_bs = asiento.debe_bs + asiento2.haber_bs
                                                        } */
                                                        asiento2.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                                        asiento2.id_compra = compra2.id
                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento2.cuenta.tipoAuxiliar) {
                                                            asiento2.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asiento2)
                                                    }
                                                }

                                            }
                                        } else {
                                            let asiento = {
                                                cuentaAux: {}, centroCosto: [],
                                                idAsignado: null,
                                                idPadre: null,
                                                id_compra: compra2.id,
                                                cuenta: await $scope.buscarCuentaVinculanteLc(cuenta.codigo), debe_bs: total, haber_bs: "", debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                            }
                                            if ($scope.datos_glosa_individual) {
                                                asiento.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                            }
                                            let asiento2 = {}
                                            let asientoBien = {}
                                            let tiposCompras = { alm: 0, gasto: 0 }

                                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                            asiento.id_compra = compra2.id
                                            if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento.cuenta.tipoAuxiliar) {
                                                asiento.cuentaAux.nombre = compra2.proveedor.razon_social
                                            }
                                            $scope.nuevoComprobante.asientosContables.push(asiento);

                                            for (const configuracionCuenta of configuracionesCuenta) {
                                                if (configuracionCuenta.tipo.nombre_corto == Diccionario.MOV_ING && configuracionCuenta.configuracion.nombre === "RETENCION DE BIENES (GASTO)") {
                                                    if (configuracionCuenta.nombre == 'CUENTA DE GASTO') {
                                                        asientoBien = {
                                                            cuentaAux: {}, centroCosto: [],
                                                            idAsignado: null, idPadre: null,
                                                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                                        }
                                                        if ($scope.datos_glosa_individual) {
                                                            asientoBien.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                                        }
                                                        asientoBien.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                                        asientoBien.id_compra = compra2.id
                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asientoBien.cuenta.tipoAuxiliar) {
                                                            asientoBien.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asientoBien)
                                                    }
                                                    if (configuracionCuenta.nombre == 'IT' || configuracionCuenta.nombre == "IUE") {
                                                        asiento2 = {
                                                            cuentaAux: {}, centroCosto: [],
                                                            idAsignado: null, idPadre: null,
                                                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionCuenta.cuenta.codigo), debe_bs: "", haber_bs: total * configuracionCuenta.valor / 100, debe_sus: "", haber_sus: Math.round(((total * configuracionCuenta.valor / 100) / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                                        }
                                                        if ($scope.datos_glosa_individual) {
                                                            asiento2.glosa = $scope.texto_datos_glosa_individual + " " + compra2.factura + ", " + compra2.proveedor.razon_social + "."
                                                        }
                                                        asientoBien.haber_bs = asientoBien.haber_bs - asiento2.haber_bs
                                                        asiento2.idAsignado = $scope.nuevoComprobante.asientosContables.length

                                                        asiento2.id_compra = compra2.id
                                                        if ($scope.configuracionComprobantesActual.usar_auxiliar && asiento2.cuenta.tipoAuxiliar) {
                                                            asiento2.cuentaAux.nombre = compra2.proveedor.razon_social
                                                        }
                                                        $scope.nuevoComprobante.asientosContables.push(asiento2)
                                                    }
                                                }
                                            }
                                        }



                                    }
                                } else {
                                    return $scope.mostrarMensaje("asignar Cuenta compra Nº factura" + compra2.factura)
                                }
                            } else {
                                return $scope.mostrarMensaje("asignar Cuenta compra Nº factura" + compra2.factura)
                            }
                        }

                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                    $scope.$evalAsync()
                } catch (error) {
                    console.log(error)
                }

            }
            $scope.realizarComprobandeProforma = async function (datosfacturas) {
                try {
                    $scope.configuracionProforma = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PROF/FACTURA'
                    })
                    var tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionProforma.id_tipo_comprobante
                    })
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionProforma.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionProforma.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda
                    };
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    $scope.obtenerCambioMoneda2($scope.nuevoComprobante.fecha)
                    $scope.nuevoComprobante.fechaActual = new Date($scope.convertirFecha($scope.nuevoComprobante.fecha))
                    $scope.nuevoComprobante.gloza = $scope.nuevoComprobante.gloza + " " + $scope.nuevoComprobante.fecha + "."

                    for (const factura of datosfacturas) {
                        let dato = await ObtenerActividadDosificacionFactura(factura.id_actividad, factura.autorizacion)
                        if (!dato.actividadDosificacion.cuenta) { return $scope.mostrarMensaje("uno o mas actividadesDosificacion no cuentan con cuenta asignada"); }
                        //ingreso caja banco
                        let asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            numero_factura_proforma: factura.factura,
                            sucursalProforma: factura.id_sucursal,
                            autorizacion_proforma: factura.autorizacion,
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuentaCajaBanco.codigo),
                            debe_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.cajaBanco.porcentaje / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.cajaBanco.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        if ($scope.configuracionProforma.usar_auxiliar) {
                            asiento.cuentaAux.nombre = factura.cliente.razon_social
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            numero_factura_proforma: factura.factura,
                            sucursalProforma: factura.id_sucursal,
                            autorizacion_proforma: factura.autorizacion,
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.it.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.it.porcentaje / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso factura actividadEconomica
                        asiento = {
                            idAsignado: null, idPadre: null,
                            numero_factura_proforma: factura.factura,
                            sucursalProforma: factura.id_sucursal,
                            autorizacion_proforma: factura.autorizacion,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * (87 / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }

                        if ($scope.configuracionProforma.usar_centro_costo) {
                            asiento.centroCosto = await $scope.obtenerCentrosCostoDetalleProforma(factura.detallesProformas)
                        }
                        asiento.glosa = factura.cliente.razon_social + ",F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso ivadf
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},

                            numero_factura_proforma: factura.factura,
                            sucursalProforma: factura.id_sucursal,
                            autorizacion_proforma: factura.autorizacion,
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.ivadf.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.ivadf.porcentaje / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.ivadf.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso it por pagar
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            numero_factura_proforma: factura.factura,
                            sucursalProforma: factura.id_sucursal,
                            autorizacion_proforma: factura.autorizacion,
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.itPorPagar.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.itPorPagar.porcentaje / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.itPorPagar.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ",F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.detalle + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    }

                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.realizarComprobandeProformaEliminada = async function (datosfacturas) {
                try {
                    $scope.configuracionProforma = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PROF/FACTURA'
                    })
                    var tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionProforma.id_tipo_comprobante
                    })
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionProforma.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionProforma.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda
                    };
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    $scope.obtenerCambioMoneda2($scope.nuevoComprobante.fecha)
                    $scope.nuevoComprobante.fechaActual = new Date($scope.convertirFecha($scope.nuevoComprobante.fecha))
                    $scope.nuevoComprobante.gloza = $scope.nuevoComprobante.gloza + " " + $scope.nuevoComprobante.fecha + "."

                    for (const factura of datosfacturas) {
                        let dato = await ObtenerActividadDosificacionFactura(factura.id_actividad, factura.autorizacion)
                        if (!dato.actividadDosificacion.cuenta) { return $scope.mostrarMensaje("uno o mas actividadesDosificacion no cuentan con cuenta asignada"); }

                        //ingreso factura actividadEconomica

                        let asiento = {
                            idAsignado: null, idPadre: null,
                            id_proforma_anulada: factura.id,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * (87 / 100),
                            haber_bs: "",
                            ddebe_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        if ($scope.configuracionProforma.usar_auxiliar) {
                            asiento.cuentaAux.nombre = factura.cliente.razon_social
                        }
                        if ($scope.configuracionProforma.usar_centro_costo) {
                            asiento.centroCosto = await $scope.obtenerCentrosCostoDetalleProforma(factura.detallesProformas)
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso ivadf revertido
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.facturasAnuladasDDJJ.ivadf.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.facturasAnuladasDDJJ.ivadf.porcentaje / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                        //ingreso cajaBanco
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuentaCajaBanco.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.facturasAnuladasDDJJ.cajaBanco.porcentaje / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.facturasAnuladasDDJJ.cajaBanco.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                    }

                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);

                } catch (error) {
                    console.log(error)
                }
            }
            $scope.realizarComprobandeProformaEliminadaRectifiacion = async function (datosfacturas) {
                try {
                    $scope.configuracionProforma = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PROF/FACTURA'
                    })
                    var tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionProforma.id_tipo_comprobante
                    })
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionProforma.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionProforma.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda
                    };
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    $scope.obtenerCambioMoneda2($scope.nuevoComprobante.fecha)
                    $scope.nuevoComprobante.fechaActual = new Date($scope.convertirFecha($scope.nuevoComprobante.fecha))
                    $scope.nuevoComprobante.gloza = $scope.nuevoComprobante.gloza + " " + $scope.nuevoComprobante.fecha + "."

                    for (const factura of datosfacturas) {
                        let dato = await ObtenerActividadDosificacionFactura(factura.id_actividad, factura.autorizacion)
                        if (!dato.actividadDosificacion.cuenta) { return $scope.mostrarMensaje("uno o mas actividadesDosificacion no cuentan con cuenta asignada"); }
                        //ingreso caja banco
                        let asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuentaCajaBanco.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.cajaBanco.porcentaje / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.cajaBanco.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        if ($scope.configuracionProforma.usar_auxiliar) {
                            asiento.cuentaAux.nombre = factura.cliente.razon_social
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.it.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.it.porcentaje / 100),
                            debe_sus: "",
                            haber_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso factura actividadEconomica
                        asiento = {
                            idAsignado: null, idPadre: null,
                            id_proforma_anulada: factura.id,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(dato.actividadDosificacion.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * (87 / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }

                        if ($scope.configuracionProforma.usar_centro_costo) {
                            asiento.centroCosto = await $scope.obtenerCentrosCostoDetalleProforma(factura.detallesProformas)
                        }
                        asiento.glosa = factura.cliente.razon_social + ",F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso ivadf
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.ivadf.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.ivadf.porcentaje / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.ivadf.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ", F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.actividadEconomica.nombre + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //ingreso it por pagar
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {},
                            centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.ingreso.itPorPagar.cuenta.codigo),
                            debe_bs: factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.itPorPagar.porcentaje / 100),
                            haber_bs: "",
                            debe_sus: Math.round((factura.totalImporteBs * ($scope.plantillasCuentasCompobante.ingreso.itPorPagar.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false
                        }
                        asiento.glosa = factura.cliente.razon_social + ",F: " + factura.factura + ", PF: " + factura.correlativo + ", " + factura.detalle + ", " + $scope.meses[factura.periodo_mes].nombre + "/" + factura.periodo_anio + "."

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    }

                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
            }

            function esperandoCalculoPlanillaSueldo() {
                return new Promise(resolve => setTimeout(resolve, 5));
            }

            async function realizarCalculosPlanillaSueldo(campo, configuracionesCuenta, datosPlanillaSueldo, countE) {
                await esperandoCalculoPlanillaSueldo();
                SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
                SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
                blockUI.noOpen = true;

                for (const configuracion of configuracionesCuenta) {
                    switch (configuracion.concepto.nombre_corto) {
                        case 'SUELDOS':
                            if (campo.importeSumaTotalGanado > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeSumaTotalGanado,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeSumaTotalGanado / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanillaSueldo.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanillaSueldo.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanillaSueldo.glosa_debe + " del " + datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanillaSueldo.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'SUELDOS POR PAGAR':
                            for (const trabajador of campo.trabajadores) {
                                if (trabajador.liquido_pagable > 0) {
                                    asiento = {
                                        idAsignado: null, idPadre: null,
                                        cuentaAux: {}, centroCosto: [],
                                        cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                        debe_bs: "",
                                        haber_bs: trabajador.liquido_pagable,
                                        debe_sus: "",
                                        haber_sus: Math.round((trabajador.liquido_pagable / $scope.moneda.dolar) * 10000) / 10000,
                                        eliminado: false,
                                        activo: true,
                                        isOpen: false
                                    }
                                    if ($scope.configuracionPlanillaSueldo.usar_auxiliar) {
                                        asiento.cuentaAux.nombre = trabajador.DetalleFicha.empleado.persona.nombre_completo
                                    }
                                    if ($scope.configuracionPlanillaSueldo.glosa_haber) {
                                        asiento.glosa = $scope.configuracionPlanillaSueldo.glosa_haber + " del " + datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanillaSueldo.datosPlanillaMes.anio + "."
                                    }
                                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                    $scope.nuevoComprobante.asientosContables.push(asiento);
                                }
                            }
                            break;
                        case 'SEGURO SOCIAL AFPs':
                            if (campo.importeTotalAFP > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: "",
                                    haber_bs: campo.importeTotalAFP,
                                    debe_sus: "",
                                    haber_sus: Math.round((campo.importeTotalAFP / $scope.moneda.dolar) * 10000) / 10000,
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanillaSueldo.glosa_haber) {
                                    asiento.glosa = $scope.configuracionPlanillaSueldo.glosa_haber + " del " + datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanillaSueldo.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'RC - IVA DEPENDIENTES':
                            if (campo.importeTotalRCIVA > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: "",
                                    haber_bs: campo.importeTotalRCIVA,
                                    debe_sus: "",
                                    haber_sus: Math.round((campo.importeTotalRCIVA / $scope.moneda.dolar) * 10000) / 10000,
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanillaSueldo.glosa_haber) {
                                    asiento.glosa = $scope.configuracionPlanillaSueldo.glosa_haber + " del " + datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanillaSueldo.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'ANTICIPOS - PERSONAL':
                            for (const trabajador of campo.trabajadores) {
                                if (trabajador.importe_anticipos > 0) {
                                    asiento = {
                                        idAsignado: null, idPadre: null,
                                        cuentaAux: {}, centroCosto: [],
                                        cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                        debe_bs: "",
                                        haber_bs: trabajador.importe_anticipos,
                                        debe_sus: "",
                                        haber_sus: Math.round((trabajador.importe_anticipos / $scope.moneda.dolar) * 10000) / 10000,
                                        eliminado: false,
                                        activo: true,
                                        isOpen: false
                                    }
                                    if ($scope.configuracionPlanillaSueldo.usar_auxiliar) {
                                        asiento.cuentaAux.nombre = trabajador.DetalleFicha.empleado.persona.nombre_completo
                                    }
                                    if ($scope.configuracionPlanillaSueldo.glosa_haber) {
                                        asiento.glosa = $scope.configuracionPlanillaSueldo.glosa_haber + " del " + datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanillaSueldo.datosPlanillaMes.anio + "."
                                    }
                                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                    $scope.nuevoComprobante.asientosContables.push(asiento);
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }
            }

            async function procesarCalculosPlanillaSueldo(datosPlanillaSueldo, configuracionesCuenta) {
                SweetAlert.update({ title: "Procesando datos para la emisión del comprobante....." })

                var countE = 0;
                for (const campo of datosPlanillaSueldo.arrayCampos) {
                    countE = countE + 1;
                    await realizarCalculosPlanillaSueldo(campo, configuracionesCuenta, datosPlanillaSueldo, getPercentageChange(datosPlanillaSueldo.arrayCampos.length, countE));
                }

                console.log('Doneee')
                SweetAlert.swal({
                    title: 'Finalizado!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                $scope.cal($scope.nuevoComprobante.asientosContables)
                $scope.verigicarRegistroAntiguo()
                $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
            }

            $scope.realizarComprobandePlanillaSueldo = async function (datosPlanillaSueldo) {

                try {
                    SweetAlert.swal({
                        title: 'Obteniendo Datos...',
                        icon: 'info',
                        iconHtml: '<i class="fa fa-search size-icon"></i>',
                        // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
                        html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;

                    $scope.configuracionPlanillaSueldo = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PLANILLA DE SUELDOS'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanillaSueldo.id_tipo_comprobante
                    })
                    let fechaUltimoDiaMes = new Date(parseInt(datosPlanillaSueldo.datosPlanillaMes.anio), parseInt(datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanillaSueldo.glosa_general,
                        fecha: $scope.fechaATexto(fechaUltimoDiaMes),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanillaSueldo.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        id_planilla_sueldo: datosPlanillaSueldo.datosPlanillaMes.id
                    };
                    let asiento = {}

                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();

                    for (const campo of datosPlanillaSueldo.arrayCampos) {
                        if (campo.camposReferidos.length > 0) {
                            for (const [i, campoReferido] of campo.camposReferidos.entries()) {
                                datosCampoEncontrado = datosPlanillaSueldo.arrayCampos.find(x => {
                                    return x.campo.id == campoReferido.id
                                })
                                datosCampoEncontrado.importeSumaTotalGanado = datosCampoEncontrado.importeSumaTotalGanado + (campo.importeSumaTotalGanado / campoReferido.porcentaje);
                            }
                            campo.importeSumaTotalGanado = 0
                        }
                    }

                    await procesarCalculosPlanillaSueldo(datosPlanillaSueldo, configuracionesCuenta);
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
            }

            function getPercentageChange(oldNumber, newNumber) {
                var decreaseValue = oldNumber - newNumber;
                var porcentage = 100 - (decreaseValue / oldNumber) * 100;
                return porcentage.toFixed();
            }

            function esperandoCalculoCargaSocial() {
                return new Promise(resolve => setTimeout(resolve, 5));
            }

            async function realizarCalculosCargaSocial(campo, configuracionesCuenta, datosPlanilla, countE) {
                await esperandoCalculoCargaSocial();
                SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
                SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
                blockUI.noOpen = true;
                for (const configuracion of configuracionesCuenta) {
                    switch (configuracion.concepto.nombre_corto) {
                        case 'APORTES CAMPOS':
                            if (!campo.administrativo && campo.importeSumaTotalAportes > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeSumaTotalAportes,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeSumaTotalAportes / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                } if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'AGUINALDOS CAMPOS':
                            if (!campo.administrativo && campo.importeTotalAguinaldos > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeTotalAguinaldos,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeTotalAguinaldos / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;

                        case 'INDEMNIZACION CAMPOS':
                            if (!campo.administrativo && campo.importeTotalIndemnizacion > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeTotalIndemnizacion,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeTotalIndemnizacion / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'APORTES ADMINISTRATIVOS':
                            if (campo.administrativo && campo.importeSumaTotalAportes > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeSumaTotalAportes,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeSumaTotalAportes / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'AGUINALDOS ADMINISTRATIVOS':
                            if (campo.administrativo && campo.importeTotalAguinaldos > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeTotalAguinaldos,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeTotalAguinaldos / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'INDEMNIZACION ADMINISTRATIVA':
                            if (campo.administrativo && campo.importeTotalIndemnizacion > 0) {
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    cuentaAux: {}, centroCosto: [],
                                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                    debe_bs: campo.importeTotalIndemnizacion,
                                    haber_bs: "",
                                    debe_sus: Math.round((campo.importeTotalIndemnizacion / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false,
                                    activo: true,
                                    isOpen: false
                                }
                                if ($scope.configuracionPlanilla.usar_centro_costo) {
                                    asiento.centroCosto = [campo.campo]
                                    if (campo.arraycampoConReferencia.length > 0) {
                                        asiento.centroCosto = asiento.centroCosto.concat(campo.arraycampoConReferencia)
                                    }
                                }
                                if ($scope.configuracionPlanilla.glosa_debe) {
                                    asiento.glosa = $scope.configuracionPlanilla.glosa_debe + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                }
                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            }
                            break;
                        case 'FONDO DE VIVIENDA':
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                debe_bs: "",
                                haber_bs: campo.importeSumaFondoVivienda,
                                debe_sus: "",
                                haber_sus: Math.round((campo.importeSumaFondoVivienda / $scope.moneda.dolar) * 10000) / 10000,
                                eliminado: false,
                                activo: true,
                                isOpen: false
                            }
                            if ($scope.configuracionPlanilla.glosa_haber) {
                                asiento.glosa = $scope.configuracionPlanilla.glosa_haber + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            break;
                        case 'SEGURO SOCIAL CPS':
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                debe_bs: "",
                                haber_bs: campo.importeSumaSeguroSocialCPS,
                                debe_sus: "",
                                haber_sus: Math.round((campo.importeSumaSeguroSocialCPS / $scope.moneda.dolar) * 10000) / 10000,
                                eliminado: false,
                                activo: true,
                                isOpen: false
                            }

                            if ($scope.configuracionPlanilla.glosa_haber) {
                                asiento.glosa = $scope.configuracionPlanilla.glosa_haber + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            break;
                        case 'SEGURO SOCIAL AFPS':
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                debe_bs: "",
                                haber_bs: campo.importeSumaSeguroSocialAFP,
                                debe_sus: "",
                                haber_sus: Math.round((campo.importeSumaSeguroSocialAFP / $scope.moneda.dolar) * 10000) / 10000,
                                eliminado: false,
                                activo: true,
                                isOpen: false
                            }

                            if ($scope.configuracionPlanilla.glosa_haber) {
                                asiento.glosa = $scope.configuracionPlanilla.glosa_haber + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            break;
                        case 'RESERVA P/INDEMNIZACION':
                            for (const trabajador of campo.trabajadores) {
                                if (trabajador.prev_indemnizacion > 0) {
                                    asiento = {
                                        idAsignado: null, idPadre: null,
                                        cuentaAux: {}, centroCosto: [],
                                        cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                        debe_bs: "",
                                        haber_bs: trabajador.prev_indemnizacion,
                                        debe_sus: "",
                                        haber_sus: Math.round((trabajador.prev_indemnizacion / $scope.moneda.dolar) * 10000) / 10000,
                                        eliminado: false,
                                        activo: true,
                                        isOpen: false
                                    }
                                    if ($scope.configuracionPlanilla.usar_auxiliar) {
                                        asiento.cuentaAux.nombre = trabajador.DetalleFicha.empleado.persona.nombre_completo
                                    }

                                    if ($scope.configuracionPlanilla.glosa_haber) {
                                        asiento.glosa = $scope.configuracionPlanilla.glosa_haber + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                    }
                                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                    $scope.nuevoComprobante.asientosContables.push(asiento);
                                }
                            }
                            break;
                        case 'AGUINALDOS P/PAGAR':
                            for (const trabajador of campo.trabajadores) {
                                if (trabajador.prev_indemnizacion > 0) {
                                    asiento = {
                                        idAsignado: null, idPadre: null,
                                        cuentaAux: {}, centroCosto: [],
                                        cuenta: await $scope.buscarCuentaVinculanteLc(configuracion.cuenta.codigo),
                                        debe_bs: "",
                                        haber_bs: trabajador.prov_aguinaldo,
                                        debe_sus: "",
                                        haber_sus: Math.round((trabajador.prov_aguinaldo / $scope.moneda.dolar) * 10000) / 10000,
                                        eliminado: false,
                                        activo: true,
                                        isOpen: false
                                    }
                                    if ($scope.configuracionPlanilla.usar_auxiliar) {
                                        asiento.cuentaAux.nombre = trabajador.DetalleFicha.empleado.persona.nombre_completo
                                    }

                                    if ($scope.configuracionPlanilla.glosa_haber) {
                                        asiento.glosa = $scope.configuracionPlanilla.glosa_haber + " del " + datosPlanilla.datosPlanillaMes.mes.split('-')[1] + " " + datosPlanilla.datosPlanillaMes.anio + "."
                                    }
                                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                    $scope.nuevoComprobante.asientosContables.push(asiento);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }

            }

            async function procesarCalculosCargaSocial(datosPlanilla, configuracionesCuenta) {
                SweetAlert.update({ title: "Procesando datos para la emisión del comprobante....." })

                var countE = 0;
                for (const campo of datosPlanilla.arrayCampos) {
                    countE = countE + 1;

                    await realizarCalculosCargaSocial(campo, configuracionesCuenta, datosPlanilla, getPercentageChange(datosPlanilla.arrayCampos.length, countE));
                }

                console.log('Doneee')
                SweetAlert.swal({
                    title: 'Finalizado!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                $scope.cal($scope.nuevoComprobante.asientosContables)
                $scope.verigicarRegistroAntiguo()
                $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
            }

            $scope.realizarComprobandeCargaSocial = async function (datosPlanilla) {

                try {
                    SweetAlert.swal({
                        title: 'Obteniendo Datos...',
                        icon: 'info',
                        iconHtml: '<i class="fa fa-search size-icon"></i>',
                        // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
                        html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;

                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PLANILLA DE CARGOS SOCIALES'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })
                    //let fechaUltimoDiaMes = new Date(parseInt(datosPlanilla.datosPlanillaMes.anio), parseInt(datosPlanilla.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        id_planilla_carga_social: datosPlanilla.datosPlanillaMes.id
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();

                    for (const campo of datosPlanilla.arrayCampos) {
                        if (campo.camposReferidos.length > 0) {
                            for (const [i, campoReferido] of campo.camposReferidos.entries()) {
                                datosCampoEncontrado = datosPlanilla.arrayCampos.find(x => {
                                    return x.campo.id == campoReferido.id
                                })
                                datosCampoEncontrado.importeSumaTotalGanado = datosCampoEncontrado.importeSumaTotalGanado + (campo.importeSumaTotalGanado / campoReferido.porcentaje);
                                datosCampoEncontrado.importeSumaTotalAportes = datosCampoEncontrado.importeSumaTotalAportes + (campo.importeSumaTotalAportes / campoReferido.porcentaje)
                                datosCampoEncontrado.importeTotalAguinaldos = datosCampoEncontrado.importeTotalAguinaldos + (campo.importeTotalAguinaldos / campoReferido.porcentaje)
                                datosCampoEncontrado.importeTotalIndemnizacion = datosCampoEncontrado.importeTotalIndemnizacion + (campo.importeTotalIndemnizacion / campoReferido.porcentaje)
                            }
                            campo.importeSumaTotalGanado = 0
                            campo.importeSumaTotalAportes = 0
                            campo.importeTotalAguinaldos = 0
                            campo.importeTotalIndemnizacion = 0
                        }
                    }

                    procesarCalculosCargaSocial(datosPlanilla, configuracionesCuenta);


                } catch (error) {
                    console.log(error)
                }
            }
            $scope.realizarComprobandeAnticiposRegulares = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'ANTICIPO SUELDOS'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })
                    //let fechaUltimoDiaMes = new Date(parseInt(datosPlanillaSueldo.datosPlanillaMes.anio), parseInt(datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    let configuracionAnticipos = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'ANTICIPO DE SUELDOS'
                    })
                    let totalMonto = 0
                    for (const anticipo of datos.anticipos) {
                        //asiento debe
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionAnticipos.cuenta.codigo),
                            debe_bs: anticipo.monto,
                            haber_bs: "",
                            debe_sus: Math.round((anticipo.monto / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            id_anticipo_regular: anticipo.id
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = anticipo.empleado ? anticipo.empleado.persona.nombre_completo : anticipo.ficha.empleado.persona.nombre_completo
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                        //asiento haber
                        if (datos.registroIndividual) {
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                                debe_bs: "",
                                haber_bs: anticipo.monto,
                                debe_sus: "",
                                haber_sus: Math.round((anticipo.monto / $scope.moneda.dolar) * 10000) / 10000,
                                eliminado: false,
                                activo: true,
                                isOpen: false,
                                glosa: datos.banco.glosa_individual + ", personal del " + anticipo.ficha.area.nombre + ", " + anticipo.ficha.empleado.persona.nombre_completo
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                        } else {
                            totalMonto += anticipo.monto
                        }
                    }
                    if (!datos.registroIndividual) {
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: totalMonto,
                            debe_sus: "",
                            haber_sus: Math.round((totalMonto / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: datos.banco.glosa_individual
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                    SweetAlert.close();
                } catch (error) {
                    console.log(error)
                }
            }

            function esperandoCalculoPlanillaSueldoEmpleado() {
                return new Promise(resolve => setTimeout(resolve, 5));
            }

            async function realizarCalculosPlanillaSueldoEmpleado(detallePlanilla, datos, configuracionPagoSueldo, countE) {
                await esperandoCalculoPlanillaSueldoEmpleado();
                SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
                SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
                blockUI.noOpen = true;

                //asiento debe
                asiento = {
                    idAsignado: null, idPadre: null,
                    cuentaAux: {}, centroCosto: [],
                    cuenta: await $scope.buscarCuentaVinculanteLc(configuracionPagoSueldo.cuenta.codigo),
                    debe_bs: detallePlanilla.liquido_pagable,
                    haber_bs: "",
                    debe_sus: Math.round((detallePlanilla.liquido_pagable / $scope.moneda.dolar) * 10000) / 10000,
                    haber_sus: "",
                    eliminado: false,
                    activo: true,
                    isOpen: false,
                    id_detalle_planilla_sueldo: detallePlanilla.id,
                    glosa: "Sueldo por pagar " + detallePlanilla.DetalleFicha.area.nombre + ', del mes ' + datos.planilla.mes.split("-")[1] + ' del año ' + datos.planilla.anio + '.'
                }
                if ($scope.configuracionPlanilla.usar_auxiliar) {
                    asiento.cuentaAux.nombre = detallePlanilla.DetalleFicha.empleado.persona.nombre_completo
                }
                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                $scope.nuevoComprobante.asientosContables.push(asiento);

                //asiento haber
                if (datos.registroIndividual) {
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: detallePlanilla.liquido_pagable,
                        debe_sus: "",
                        haber_sus: Math.round((detallePlanilla.liquido_pagable / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false,
                        activo: true,
                        isOpen: false,
                        glosa: datos.banco.glosa_individual + ", personal del " + detallePlanilla.DetalleFicha.area.nombre + ", " + detallePlanilla.DetalleFicha.empleado.persona.nombre_completo
                    }
                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                }
            }

            async function procesarCalculosPlanillaSueldoEmpleado(datos, configuracionPagoSueldo) {
                SweetAlert.update({ title: "Procesando datos para la emisión del comprobante....." })

                var countE = 0;
                let totalMonto = 0
                for (const detallePlanilla of datos.detallePlanilla) {
                    countE = countE + 1;
                    if (!datos.registroIndividual) {
                        totalMonto += detallePlanilla.liquido_pagable
                    }
                    await realizarCalculosPlanillaSueldoEmpleado(detallePlanilla, datos, configuracionPagoSueldo, getPercentageChange(datos.detallePlanilla.length, countE));
                }

                if (!datos.registroIndividual) {
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: totalMonto,
                        debe_sus: "",
                        haber_sus: Math.round((totalMonto / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false,
                        activo: true,
                        isOpen: false,
                        glosa: datos.banco.glosa_individual
                    }
                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                }

                SweetAlert.swal({
                    title: 'Finalizado!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                $scope.cal($scope.nuevoComprobante.asientosContables)
                $scope.verigicarRegistroAntiguo()
                $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);

            }
            $scope.realizarComprobandePlanillaSueldoEmpleado = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PAGO DE SUELDOS'
                    })

                    if ($scope.configuracionPlanilla) {
                        let tipoCom = $scope.tiposComprobantes.find(function (x) {
                            return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                        })
                        //let fechaUltimoDiaMes = new Date(parseInt(datosPlanillaSueldo.datosPlanillaMes.anio), parseInt(datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                        $scope.nuevoComprobante = {
                            crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                            gloza: $scope.configuracionPlanilla.glosa_general,
                            fecha: $scope.fechaATexto(new Date()),
                            id_usuario: $scope.usuario.id,
                            asientosContables: [],
                            eliminado: 0, abierto: 0,
                            importe: 0,
                            id_sucursal: $scope.configuracionPlanilla.sucursal,
                            tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        };
                        let asiento = {}
                        $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                        let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                        let configuracionPagoSueldo = configuracionesCuenta.find(x => {
                            return x.concepto.nombre_corto === 'SUELDO POR PAGAR'
                        })
                        if (datos.banco.cuenta) {
                            SweetAlert.swal({
                                title: 'Obteniendo Datos...',
                                icon: 'info',
                                iconHtml: '<i class="fa fa-search size-icon"></i>',
                                html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                                allowEscapeKey: false,
                                allowOutsideClick: false
                            })
                            SweetAlert.showLoading()
                            blockUI.noOpen = true;

                            await procesarCalculosPlanillaSueldoEmpleado(datos, configuracionPagoSueldo);
                        } else {
                            SweetAlert.swal("", "Falta configurar la cuenta bancaria con el pago de sueldos y la cuenta contable, ingrese a bancos edita la caja de ahorro o cuenta corriente habilitada para pago de sueldos y vincule en la opción 'Vincular cuenta', con la cuenta contable correspondiente", "warning");
                        }
                    } else {
                        SweetAlert.swal("", "Falta la configuración de 'PAGO DE SUELDOS' en el plan de cuentas en el ícono de integraciones contables, ingrese y aumente el concepto pago de sueldos, agregue y luego guarde", "warning");
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            $scope.realizarComprobandePlanillaAguinaldoEmpleado = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'PAGO DE AGUINALDO'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })
                    //let fechaUltimoDiaMes = new Date(parseInt(datosPlanillaSueldo.datosPlanillaMes.anio), parseInt(datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    let configuracionAguinaldo = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'AGUINALDO POR PAGAR'
                    })
                    let totalMonto = 0
                    for (const detallePlanilla of datos.detallePlanilla) {
                        //asiento debe
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionAguinaldo.cuenta.codigo),
                            debe_bs: detallePlanilla.liquido_pagable,
                            haber_bs: "",
                            debe_sus: Math.round((detallePlanilla.liquido_pagable / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            id_detalle_planilla_aguinaldo: detallePlanilla.id,
                            glosa: "Aguinaldo por pagar " + detallePlanilla.DetalleFicha.area.nombre + ' del año ' + datos.planilla.anio + '.'
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = detallePlanilla.DetalleFicha.empleado.persona.nombre_completo
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                        //asiento haber
                        if (datos.registroIndividual) {
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                                debe_bs: "",
                                haber_bs: detallePlanilla.liquido_pagable,
                                debe_sus: "",
                                haber_sus: Math.round((detallePlanilla.liquido_pagable / $scope.moneda.dolar) * 10000) / 10000,
                                eliminado: false,
                                activo: true,
                                isOpen: false,
                                glosa: datos.banco.glosa_individual + ", personal del " + detallePlanilla.DetalleFicha.area.nombre + ", " + detallePlanilla.DetalleFicha.empleado.persona.nombre_completo
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                        } else {
                            totalMonto += detallePlanilla.liquido_pagable
                        }
                    }
                    if (!datos.registroIndividual) {
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(datos.banco.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: totalMonto,
                            debe_sus: "",
                            haber_sus: Math.round((totalMonto / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: datos.banco.glosa_individual
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.realizarComprobandeSalidaTraspasos = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'TRASPASOS'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })
                    //let fechaUltimoDiaMes = new Date(parseInt(datosPlanillaSueldo.datosPlanillaMes.anio), parseInt(datosPlanillaSueldo.datosPlanillaMes.mes.split('-')[0]), 0, 23, 59, 59, 59)
                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        ids_ventas: []
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    let configuracionSalidaTraspaso = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'ALMACEN'
                    })
                    let i = 0
                    for (const venta of datos) {
                        i++
                        $scope.nuevoComprobante.ids_ventas.push(venta.id)
                        //asiento debe
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionSalidaTraspaso.cuenta.codigo),
                            debe_bs: venta.total,
                            haber_bs: "",
                            debe_sus: Math.round((venta.total / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            id_detalle_venta: venta.id,
                            glosa: "Traspaso Nº " + (venta.numero_iso_traspaso ? venta.numero_iso_traspaso + "-" : "") + venta.factura + " " + venta.almacen.nombre + "(" + venta.almacen.sucursal.nombre + ")" + " al almacén " + venta.almacenTraspaso.nombre + "(" + venta.almacen.sucursal.nombre + ")"
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = venta.almacenTraspaso.nombre + "(" + venta.almacenTraspaso.sucursal.nombre + ")"
                        }
                        if (i === datos.length) {
                            $scope.nuevoComprobante.gloza += " " + asiento.glosa + "."
                        } else {
                            $scope.nuevoComprobante.gloza += " " + asiento.glosa + ","
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                        //asiento haber
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(configuracionSalidaTraspaso.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: venta.total,
                            debe_sus: "",
                            haber_sus: Math.round((venta.total / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: "Traspaso Nº " + (venta.numero_iso_traspaso ? venta.numero_iso_traspaso + "-" : "") + venta.factura + " " + venta.almacen.nombre + "(" + venta.almacen.sucursal.nombre + ")" + " al almacén " + venta.almacenTraspaso.nombre + "(" + venta.almacen.sucursal.nombre + ")"
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = venta.almacen.nombre + "(" + venta.almacen.sucursal.nombre + ")"
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length

                        $scope.nuevoComprobante.asientosContables.push(asiento);

                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync();
            }
            $scope.realizarComprobandeSolicitudesAlmacen = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'CONSUMOS'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })

                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        ids_solicitudes: []
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    /* let configuracionSalidaTraspaso = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'ALMACEN'
                    })
                     */let i = 0
                    for (const solicitud of datos) {
                        i++
                        $scope.nuevoComprobante.ids_solicitudes = $scope.nuevoComprobante.ids_solicitudes.concat(solicitud.ids)
                        let sumaTotalDebe = 0
                        for (const detalle of solicitud.detalles) {
                            let total = detalle.total * 0.87
                            sumaTotalDebe += total
                            let cuentaGrupo = {}
                            if (detalle.producto.grupo.cuentasGrupo.length > 1) {
                                for (const cuentaG of detalle.producto.grupo.cuentasGrupo) {
                                    let encontrado = cuentaG.cuenta.camposCuenta.find(y => {
                                        return y.id_campo == solicitud.campo
                                    })
                                    if (encontrado) {
                                        cuentaGrupo = cuentaG
                                    }
                                }

                            } else {
                                cuentaGrupo = detalle.producto.grupo.cuentasGrupo[0]
                            }
                            //asiento debe
                            let glosadias = solicitud.fechaMenor.getDate() === solicitud.fechaMayor.getDate() ? " el " + solicitud.fechaMenor.getDate() : " del " + solicitud.fechaMenor.getDate() + " al " + solicitud.fechaMayor.getDate()
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(cuentaGrupo.cuenta.codigo),/* detalle.producto.grupo.cuenta.codigo */
                                debe_bs: total,
                                haber_bs: "",
                                debe_sus: Math.round((total / $scope.moneda.dolar) * 10000) / 10000,
                                haber_sus: "",
                                eliminado: false,
                                activo: true,
                                isOpen: false,
                                id_detalles_movimiento: detalle.ids,
                                glosa: "Consumos efectuados" + glosadias + " de " + $scope.meses[solicitud.fechaMayor.getMonth()].nombre + ", " + $scope.meses[solicitud.fechaMayor.getMonth()].nombre + "/" + solicitud.fechaMayor.getFullYear() + ". grupo:" + detalle.producto.grupo.nombre
                            }
                            /*  if (i === datos.length) {
                                 $scope.nuevoComprobante.gloza += " " + asiento.glosa + "."
                             } else {
                                 $scope.nuevoComprobante.gloza += " " + asiento.glosa + ","
                             } */
                            if ($scope.configuracionPlanilla.usar_centro_costo) {
                                let centro = $scope.centrosDeCostos.find(x => x.id == detalle.movimiento.solicitud.id_campo)
                                asiento.centroCosto.push(centro)
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                        }


                        //asiento haber
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(solicitud.almacen.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: sumaTotalDebe,
                            debe_sus: "",
                            haber_sus: Math.round((sumaTotalDebe / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: "CONSUMOS DEL ALMACEN Nº " + solicitud.almacen.nombre + "(" + solicitud.almacen.sucursal.nombre + ")."
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = solicitud.almacen.nombre + "(" + solicitud.almacen.sucursal.nombre + ")"
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        /*  if ($scope.configuracionPlanilla.usar_centro_costo) {
                             let centro = $scope.centrosDeCostos.find(x => x.id == solicitud.id_campo)
                             asiento.centroCosto.push(centro)
                         } */
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync();
            }
            $scope.realizarComprobandeMaterialMantenimiento = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion
                            && x.integracion.moduloIntegracion.nombre == 'CONSUMOS OT'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })

                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        ids_mantenimiento: datos.idsMantenimiento
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                   // let configuracionesCuenta = await $scope.obtenerConfigudarcionesCuentaEmpresa();
                    /* let configuracionSalidaTraspaso = configuracionesCuenta.find(x => {
                        return x.concepto.nombre_corto === 'ALMACEN'
                    })
                     */let i = 0
                    for (const solicitud of datos.detalles) {
                        i++
                        let sumaTotalDebe = 0
                        for (const detalle of solicitud.detallesPorGrupo) {
                            let total = detalle.total * 0.87
                            sumaTotalDebe += total
                            let cuentaGrupo = {}
                            if (detalle.producto.grupo.cuentasGrupo.length > 1) {
                                for (const cuentaG of detalle.producto.grupo.cuentasGrupo) {
                                    let encontrado = cuentaG.cuenta.camposCuenta.find(y => {
                                        return y.id_campo == solicitud.materialTrabajo.ordenTrabajo.id_campo
                                    })
                                    if (encontrado) {
                                        cuentaGrupo = cuentaG
                                    }
                                }

                            } else {
                                cuentaGrupo = detalle.producto.grupo.cuentasGrupo[0]
                            }
                            //asiento debe
                            //let glosadias=solicitud.fechaMenor.getDate()===solicitud.fechaMayor.getDate()?" el "+solicitud.fechaMenor.getDate():" del "+solicitud.fechaMenor.getDate()+" al "+solicitud.fechaMayor.getDate()
                            asiento = {
                                idAsignado: null, idPadre: null,
                                cuentaAux: {}, centroCosto: [],
                                cuenta: await $scope.buscarCuentaVinculanteLc(cuentaGrupo.cuenta.codigo),/* detalle.producto.grupo.cuenta.codigo */
                                debe_bs: total,
                                haber_bs: "",
                                debe_sus: Math.round((total / $scope.moneda.dolar) * 10000) / 10000,
                                haber_sus: "",
                                eliminado: false,
                                activo: true,
                                isOpen: false,
                                id_detalles_movimiento: detalle.ids,
                                //  glosa: "Consumos efectuados"+glosadias+" de "+$scope.meses[solicitud.fechaMayor.getMonth()].nombre+", "+ $scope.meses[solicitud.fechaMayor.getMonth()].nombre+"/"+solicitud.fechaMayor.getFullYear()+". grupo:" + detalle.producto.grupo.nombre
                            }
                            if ($scope.configuracionPlanilla.usar_centro_costo) {
                                let centro = $scope.centrosDeCostos.find(x => x.id == detalle.movimiento.materialTrabajo.ordenTrabajo.id_campo)
                                asiento.centroCosto.push(centro)
                            }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                        }


                        //asiento haber
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(solicitud.almacen.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: sumaTotalDebe,
                            debe_sus: "",
                            haber_sus: Math.round((sumaTotalDebe / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: "CONSUMOS DEL ALMACEN Nº " + solicitud.almacen.nombre + "(" + solicitud.almacen.sucursal.nombre + ")."
                        }
                        if ($scope.configuracionPlanilla.usar_auxiliar) {
                            asiento.cuentaAux.nombre = solicitud.almacen.nombre + "(" + solicitud.almacen.sucursal.nombre + ")"
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        /*    if ($scope.configuracionPlanilla.usar_centro_costo) {
                               let centro = $scope.centrosDeCostos.find(x => x.nombre == solicitud.almacen.sucursal.nombre)
                               asiento.centroCosto.push(centro)
                           } */
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                    }
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync();
            }
            $scope.realizarComprobandeRopaTrabajo = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion
                            && x.integracion.moduloIntegracion.nombre == 'EPP´S ROPA DE TRABAJO'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })

                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: $scope.configuracionPlanilla.glosa_general + 'del' + datos.fechaInicio + ' al ' + datos.fechaFin + '.',
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        ids_ropas_trabajo: [],
                    };
                    let asiento = {}
                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let i = 0
                    let sumaTotalHaber = 0
                    for (const detalle of datos.detalles) {
                        let total = detalle.movimiento.detallesMovimiento[0].total * 0.87
                        $scope.nuevoComprobante.ids_ropas_trabajo = $scope.nuevoComprobante.ids_ropas_trabajo + detalle.ids
                        i++

                        let totalDebe = total
                        sumaTotalHaber += totalDebe
                        if (!detalle.dotacionRopa.ficha.tipoPersonal) {
                            console.log(detalle.dotacionRopa.ficha)
                        }
                        asiento = {
                            idAsignado: null, idPadre: null,
                            cuentaAux: {}, centroCosto: [],
                            cuenta: await $scope.buscarCuentaVinculanteLc(detalle.dotacionRopa.ficha.tipoPersonal.cuenta.codigo),/* detalle.producto.grupo.cuenta.codigo */
                            debe_bs: totalDebe,
                            haber_bs: "",
                            debe_sus: Math.round((totalDebe / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false,
                            activo: true,
                            isOpen: false,
                            glosa: $scope.configuracionPlanilla.glosa_debe + ' ' + detalle.dotacionRopa.ficha.tipoPersonal.nombre
                        }
                        if ($scope.configuracionPlanilla.usar_centro_costo) {
                            let centro = $scope.centrosDeCostos.find(x => x.id == detalle.dotacionRopa.ficha.empleado.id_campo)
                            asiento.centroCosto.push(centro)
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);

                    }
                    //asiento haber
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionPlanilla.contraCuentaHaber.codigo),
                        debe_bs: "",
                        haber_bs: sumaTotalHaber,
                        debe_sus: "",
                        haber_sus: Math.round((sumaTotalHaber / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false,
                        activo: true,
                        isOpen: false,
                        glosa: $scope.configuracionPlanilla.glosa_haber
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);


                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync();
            }
            $scope.realizarComprobandeRendicionFondo = async function (datos) {

                try {
                    $scope.configuracionPlanilla = $scope.listaConfiguracionesContables.find(function (x) {
                        return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion
                            && x.integracion.moduloIntegracion.nombre == 'FONDOS A RENDIR'
                    })
                    let tipoCom = $scope.tiposComprobantes.find(function (x) {
                        return x.id == $scope.configuracionPlanilla.id_tipo_comprobante
                    })

                    $scope.nuevoComprobante = {
                        crearRegistroCompAntiguo: false, fechaActual: new Date(), copia_glosa: false,
                        gloza: "FONDOS A RENDIR DE" + datos.solicitud.solicitante.persona.nombre_completo + ", S/G RENDICIÓN DE FONDOS NRO." + datos.numero_correlativo,
                        fecha: $scope.fechaATexto(new Date()),
                        id_usuario: $scope.usuario.id,
                        asientosContables: [],
                        eliminado: 0, abierto: 0,
                        importe: 0,
                        id_sucursal: $scope.configuracionPlanilla.sucursal,
                        tipoComprobante: tipoCom, tipoCambio: $scope.moneda,
                        ids_cajas_chicas: [],
                    };
                    let asiento = {}
                    totalesRendicion = { totalRendicionBS: 0, totalRendicionSUS: 0 }

                    $scope.nuevoComprobante.fecha = await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                    let i = 0
                    var correlatPadreRendicion = datos.solicitud.cajasChicas[0].numero_correlativo
                    let ices = 0
                    for (const caja of datos.solicitud.cajasChicas) {
                        let centros = []
                        $scope.nuevoComprobante.ids_cajas_chicas.push(caja.id)
                        if (caja.centrosCosto.length > 0 && true) {
                            for (let ij = 0; ij < caja.centrosCosto.length; ij++) {
                                let x = caja.centrosCosto[ij];
                                centros.push($scope.centrosDeCostos.find(function (cc) {
                                    return x.id_centro_costo === cc.id
                                }))
                            }
                        }
                        cuentaAux = { razon_social: undefined }
                        if (caja.concepto.nombre == 'FONDOS A RENDIR') {

                        } else if (caja.concepto.nombre == 'DEVOLUCION' || caja.concepto.nombre == 'INCREMENTO') {

                        } else {
                            ices += caja.compra.ice
                            caja.gasto = datos.gastos.find((x) => {
                                return x.detalle.toUpperCase().includes(caja.detalle.toUpperCase().trim());
                            })
                            await $scope.crearAsientosFondoRendirCompra(caja, i, datos.solicitud.cajasChicas.length, true
                                , true, centros, cuentaAux, datos, totalesRendicion, correlatPadreRendicion)


                        }
                    }
                    let planillaFondoRendir = $scope.ListaConfiguaracionCuenta.find(x => {
                        return x.concepto.nombre_corto == "CUENTA HABER" && x.concepto.padre.nombre_corto == 'RENFONCC'
                    })
                    //Contra Cuenta haber uno por muchas Facturas En Rendicion de Cuentas
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: { nombre: datos.solicitud.solicitante.persona.nombre_completo }, centroCosto: [],
                        glosa: "FONDOS A RENDIR DE " + datos.solicitud.solicitante.persona.nombre_completo + ", S/G RENDICIÓN DE FONDOS NRO." + datos.numero_correlativo,
                        cuenta: await $scope.buscarCuentaVinculanteLc(planillaFondoRendir.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: datos.total,
                        debe_sus: "",
                        haber_sus: datos.total,
                        eliminado: false,
                        activo: true,
                        isOpen: false
                    }
                    $scope.nuevoComprobante.asientosContables.push(asiento);

                    $scope.cal($scope.nuevoComprobante.asientosContables)
                    $scope.verigicarRegistroAntiguo()
                    $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync();
            }
            $scope.crearAsientosFondoRendirCompra = async function (caja, i, a, SeleccionarCentros,
                SeleccionarAuxiliar, centros, cuentaAux, datos, totalesRendicion, correlatPadreRendicion) {
                if (caja.compra.movimiento == null) {
                    caja.compra.movimiento = { clase: {} }
                    caja.compra.movimiento.clase = caja.compra.tipoMovimiento
                }
                compra2 = caja.compra
                let extra = 0
                var total = caja.pagado
                let ice = compra2.ice ? compra2.ice : 0
                extra = compra2.excento
                total = caja.pagado - compra2.excento - ice

                let retencion = caja.compra.tipo_retencion ? "(Si)" : "(No)"
                if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION || caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_DIARIO) {

                    let asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: (total * (87 / 100)) + extra + ice, haber_bs: "",
                        debe_sus: Math.round(((total * (87 / 100) + extra + ice) / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "", eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.egreso.ivacf.cuenta.codigo),
                        debe_bs: (total) * ($scope.plantillasCuentasCompobante.egreso.ivacf.porcentaje / 100),
                        haber_bs: "",
                        debe_sus: Math.round(((total) * ($scope.plantillasCuentasCompobante.egreso.ivacf.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "",
                        eliminado: false,
                        activo: true,
                        isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);

                    totalesRendicion.totalRendicionBS += (total + extra) * ($scope.plantillasCuentasCompobante.egreso.cajaBanco.porcentaje / 100)
                    totalesRendicion.totalRendicionSUS += Math.round((total * ($scope.plantillasCuentasCompobante.egreso.cajaBanco.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000

                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_COMPRA_SIN_FACTURA) {

                    let asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: total,
                        haber_bs: "",
                        debe_sus: Math.round((total / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "", eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    totalesRendicion.totalRendicionBS += total
                    totalesRendicion.totalRendicionSUS += Math.round((total / $scope.moneda.dolar) * 10000) / 10000

                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {

                    if (caja.compra.tipo_retencion) {
                        total = total * 100 / $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje
                    }
                    //cuenta caja
                    let asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: total,
                        haber_bs: "",
                        debe_sus: Math.round((total / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "",
                        eliminado: false, activo: true, isOpen: false
                    }


                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    totalesRendicion.totalRendicionBS += total * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100
                    totalesRendicion.totalRendicionSUS += Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000
                    //iue
                    asiento = {
                        idAsignado: null, idPadre: null,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.iue.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: total * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100, debe_sus: "",
                        haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    //it
                    asiento = {
                        idAsignado: null, idPadre: null,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.it.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: total * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100, debe_sus: "",
                        haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);


                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    let asiento = {}
                    if (caja.compra.tipo_retencion) {
                        total = total * 100 / $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje
                    }
                    //caja chica
                    asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: total,
                        haber_bs: "",
                        debe_sus: Math.round(((total) / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "",
                        eliminado: false, activo: true, isOpen: false
                    }
                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento)
                    totalesRendicion.totalRendicionBS += total * $scope.plantillasCuentasCompobante.retencionBienes.almacen.porcentaje / 100
                    totalesRendicion.totalRendicionSUS += Math.round((total / $scope.moneda.dolar) * 10000) / 10000
                    //iue
                    asiento = {
                        idAsignado: null, idPadre: null,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.iue.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: total * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100, debe_sus: "",
                        haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    //it
                    asiento = {
                        idAsignado: null, idPadre: null,
                        glosa: caja.compra.proveedor.razon_social + "," + (caja.gasto.usar_Factura ? 'F' : 'R') + "-"
                            + caja.gasto.numero_factura_recargo + ",,,,"
                            + caja.gasto.gasto.nombre + ","
                            + $scope.fechaATexto(caja.gasto.fecha).split("/")[1]
                            + "/" + new Date(caja.gasto.fecha).getFullYear()
                            + "," + datos.solicitud.solicitante.persona.nombre_completo + "," + correlatPadreRendicion,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.it.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: total * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100, debe_sus: "",
                        haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);



                    if (i === a.length - 1) {
                        $scope.cal($scope.nuevoComprobante.asientosContables)
                        $scope.verigicarRegistroAntiguo()
                        $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                    }
                }
                $scope.$evalAsync()

            }
            $scope.seleccionarAuxiliarAsignado = function (listaCuentasAuxiliares, idCompararcion) {
                const cuentaAux = listaCuentasAuxiliares.find(function (x) {
                    return x.id == idCompararcion
                });
                return cuentaAux
            }
            $scope.seleccionarCentroDeCosto = function (listaCuentasAuxiliares, idCompararcion) {
                const cuentaAux = listaCuentasAuxiliares.find(function (x) {
                    return x.id == idCompararcion
                });
                return cuentaAux
            }
            $scope.ObtenerActividadDosificacionFactura = async function (idActividad, autorizacion) {
                try {
                    let date = await ObtenerActividadDosificacionFactura(idActividad, autorizacion)
                    return date.actividadDosificacion
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.obtenerCentrosCostoDetalleProforma = function (detallesProformas) {

                let centros = []
                let bandera = false
                for (const detalle of detallesProformas) {
                    if (detalle.centroCosto) {
                        const cenco = $scope.centrosDeCostos.find(function (cc) {
                            return cc.nombre == detalle.centroCosto.nombre
                        })
                        for (const centro of centros) {
                            if (cenco.id == centro.id) {
                                bandera = true
                            }
                        }
                        if (!bandera) {
                            centros.push(cenco)
                        }
                    }

                }
                return centros



            }
            $scope.realizarComprobandeCierreCaja = function (cierreCaja) {
                $scope.configuracionCierreCajaChica = $scope.listaConfiguracionesContables.find(function (x) {
                    return x.integracion.moduloIntegracion.id_aplicacion == $scope.aplicacion.id_aplicacion && x.integracion.moduloIntegracion.nombre == 'CIERRE DE CAJA'
                })
                $scope.generarComprobanteCierreCaja(cierreCaja)

            }
            $scope.generarComprobanteCierreCaja = async function (cierreCaja) {
                var tipoCom = $scope.tiposComprobantes.find(function (x) {
                    return x.nombre_corto == 'TCMCCCH'
                })
                $scope.nuevoComprobante = { fechaActual: cierreCaja.fin, gloza: $scope.configuracionCierreCajaChica.glosa_general, copia_glosa: true, fecha: $scope.fechaATexto(cierreCaja.fin), id_usuario: $scope.usuario.id, asientosContables: [], eliminado: 0, abierto: 0, importe: 0, id_sucursal: cierreCaja.detalleCierreCaja[0].sucursal, tipoComprobante: tipoCom, tipoCambio: $scope.moneda };
                /* $scope.mostrarMensaje($scope.configuracionCierreCajaChica) */
                for (var i = 0; i < cierreCaja.detalleCierreCaja.length; i++) {
                    var index = i
                    var array = cierreCaja.detalleCierreCaja.length
                    var caja = cierreCaja.detalleCierreCaja[i]
                    var centros = []
                    var concepto = $scope.configuracionCierreCajaChica.movimientosCentrosCosto.find(function (x) {
                        return caja.concepto.concepto.nombre_corto == x.nombre_corto
                    })
                    var SeleccionarCentros = concepto ? true : false
                    var conceptoAux = $scope.configuracionCierreCajaChica.movimientosAuxiliares.find(function (x) {
                        return caja.concepto.concepto.nombre_corto == x.nombre_corto
                    })
                    var SeleccionarAuxiliar = conceptoAux ? true : false
                    if (caja.centrosCosto.length > 0 && SeleccionarCentros) {
                        for (var ij = 0; ij < caja.centrosCosto.length; ij++) {
                            var x = caja.centrosCosto[ij];
                                let found = $scope.centrosDeCostos.find(function (cc) {
                                return x.id_centro_costo === cc.id
                            })
                            if(found)centros.push(found);
                        }
                    }
                    cuentaAux = { razon_social: undefined }
                    $scope.nuevoComprobante.id_cierre_caja = cierreCaja.id
                    $scope.edicionCierre = true

                    switch (caja.concepto.concepto.nombre_corto) {
                        case $scope.diccionario.CC_MOV_INGRESO:
                            if (caja.concepto.nombre == "DEVOLUCION") {

                                let planillaDevolucion = $scope.ListaConfiguaracionCuenta.find(x => {
                                    return x.concepto.nombre_corto == "CUENTA HABER" && x.concepto.padre.nombre_corto == 'DEVCC'
                                })
                                //movimiento al debe    
                                var asiento = {
                                    idAsignado: null, idPadre: null, id_caja_chica: caja.id,
                                    centroCosto: centros, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                    cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                                    debe_bs: caja.monto,
                                    haber_bs: "",
                                    debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000,
                                    haber_sus: "",
                                    eliminado: false, activo: true, isOpen: false
                                }


                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                                if (SeleccionarAuxiliar == true) {
                                    var cuentaAux = $scope.listaCuentasAuxiliaresEmpleado.find(function (x) {
                                        return x.id == caja.cajaChicaSolicitud.solicitud.solicitante.id
                                    });
                                }
                                asiento = {
                                    idAsignado: null, idPadre: null,
                                    glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                    cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                                    cuenta: await $scope.buscarCuentaVinculanteLc(planillaDevolucion.cuenta.codigo),
                                    debe_bs: "", haber_bs: caja.monto,
                                    debe_sus: "",
                                    haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000,
                                    eliminado: false, activo: true, isOpen: false
                                }

                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                            } else {
                                //movimiento al debe                                
                                var asiento = {
                                    idAsignado: null, idPadre: null, id_caja_chica: caja.id,
                                    cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                                    centroCosto: centros, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                    cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo), debe_bs: caja.monto, haber_bs: "", debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                                }


                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                                asiento = {
                                    idAsignado: null, idPadre: null, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                    cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionCierreCajaChica.contraCuentaDebe.codigo), debe_bs: "", haber_bs: caja.monto, debe_sus: "", haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                                }

                                asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                                $scope.nuevoComprobante.asientosContables.push(asiento);
                                /*   $scope.crearAsientosCierreCaja(caja,i,cierreCaja.detalleCierreCaja.length) */
                            }
                            break;
                        case $scope.diccionario.CC_MOV_KARDEX:
                            //movimiento al debe
                            if (SeleccionarAuxiliar == true) {
                                var cuentaAux = $scope.listaCuentasAuxiliaresEmpleado.find(function (x) {
                                    return x.id == caja.solicitud.solicitante.id
                                });
                            }
                            var asiento = {
                                idAsignado: null,
                                idPadre: null,
                                id_caja_chica: caja.id,
                                cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                                centroCosto: centros,
                                glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                                debe_bs: caja.monto, haber_bs: "",
                                debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000,
                                haber_sus: "",
                                eliminado: false, activo: true, isOpen: false
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            asiento = {
                                idAsignado: null,
                                idPadre: null,
                                glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionCierreCajaChica.contraCuentaHaber.codigo),
                                debe_bs: "",
                                haber_bs: caja.monto,
                                debe_sus: "",
                                haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            /*  $scope.crearAsientosCierreCaja(caja,i,cierreCaja.detalleCierreCaja.length) */
                            break;
                        case $scope.diccionario.CC_MOV_GASTO:
                            //movimiento al debe
                            if (SeleccionarAuxiliar == true) {
                            }
                            await $scope.crearAsientosCierreCajaCompra(caja, i, cierreCaja.detalleCierreCaja.length, SeleccionarCentros
                                , SeleccionarAuxiliar, centros, cuentaAux)
                            break;
                        case $scope.diccionario.CC_MOV_PROVEEDOR:
                            //movimiento al DEBE
                            if (SeleccionarAuxiliar == true) {
                                var cuentaAux = $scope.listaCuentasAuxiliaresProveedor.find(function (x) {
                                    return x.id == caja.solicitud.id_proveedor
                                });
                            }
                            var asiento = {
                                idAsignado: null, idPadre: null, id_caja_chica: caja.id,
                                cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                                centroCosto: centros, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo), debe_bs: caja.monto, haber_bs: "", debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                            }
                            if (SeleccionarAuxiliar == true) {
                                $scope.selecionarCuentaAxiliar(asiento)
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            asiento = {
                                idAsignado: null, idPadre: null, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionCierreCajaChica.contraCuentaHaber.codigo), debe_bs: "", haber_bs: caja.monto, debe_sus: "", haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            /* $scope.crearAsientosCierreCaja(caja,i,cierreCaja.detalleCierreCaja.length) */
                            break;
                        case $scope.diccionario.CC_MOV_ANTICIPO:
                            //movimiento al debe
                            if (SeleccionarAuxiliar == true) {
                                var cuentaAux = $scope.listaCuentasAuxiliaresEmpleado.find(function (x) {
                                    return x.id == caja.solicitud.solicitante.id
                                });
                            }
                            var asiento = {
                                idAsignado: null, idPadre: null, id_caja_chica: caja.id,
                                cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined }, centroCosto: centros,
                                glosa: caja.detalle + " TIPO:" + caja.concepto.nombre, cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo), debe_bs: caja.monto, haber_bs: "", debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, haber_sus: "", eliminado: false, activo: true, isOpen: false
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            asiento = {
                                idAsignado: null, idPadre: null, glosa: caja.detalle + " TIPO:" + caja.concepto.nombre,
                                cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionCierreCajaChica.contraCuentaHaber.codigo), debe_bs: "", haber_bs: caja.monto, debe_sus: "", haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000, eliminado: false, activo: true, isOpen: false
                            }

                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento);
                            /* $scope.crearAsientosCierreCaja(caja,i,cierreCaja.detalleCierreCaja.length) */
                            break;
                        default:
                            break;
                    }

                    if (index === array - 1) {
                        $scope.cal($scope.nuevoComprobante.asientosContables)
                        $scope.verigicarRegistroAntiguo()
                        $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                        SweetAlert.swal({
                            title: 'Finalizado!',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        })
                    }
                }
                $scope.verComprobante = false
                $scope.$evalAsync()
            }
            $scope.crearAsientosCierreCajaCompra = async function (caja, i, a, SeleccionarCentros,
                SeleccionarAuxiliar, centros, cuentaAux) {
                if (caja.compra.movimiento == null) {
                    caja.compra.movimiento = { clase: {} }
                    caja.compra.movimiento.clase = caja.compra.tipoMovimiento
                }
                compra2 = caja.compra
                let extra = 0
                var total = compra2.total
                if (compra2.excento > 0) {/* 
                    if (compra2.excento > 0) {
                        compra2.excento = compra2.importe * 0.30;
                        compra2.total = compra2.importe * 0.70;
                    } */
                    total = compra2.importe
                    extra = compra2.excento

                }
                let retencion = caja.compra.tipo_retencion ? "(Si)" : "(No)"
                if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION || caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_DIARIO) {

                    let asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")",
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: (compra2.total * (87 / 100)) + extra, haber_bs: "",
                        debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "", eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        glosa: caja.detalle,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.egreso.ivacf.cuenta.codigo),
                        debe_bs: compra2.total * ($scope.plantillasCuentasCompobante.egreso.ivacf.porcentaje / 100),
                        haber_bs: "",
                        debe_sus: Math.round((compra2.importe * ($scope.plantillasCuentasCompobante.egreso.ivacf.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "",
                        eliminado: false,
                        activo: true,
                        isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    asiento = {
                        idAsignado: null, idPadre: null,
                        cuentaAux: {}, centroCosto: [],
                        glosa: caja.detalle,
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.egreso.cajaBanco.cuenta.codigo),
                        debe_bs: "",
                        haber_bs: total * ($scope.plantillasCuentasCompobante.egreso.cajaBanco.porcentaje / 100),
                        debe_sus: "",
                        haber_sus: Math.round((total * ($scope.plantillasCuentasCompobante.egreso.cajaBanco.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false,
                        activo: true,
                        isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_COMPRA_SIN_FACTURA) {
                    /*  console.log("sin factura") */
                    let asiento = {
                        idAsignado: null, idPadre: null,
                        id_compra: caja.compra.id,
                        cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                        centroCosto: centros,
                        glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")",
                        cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                        debe_bs: caja.monto,
                        haber_bs: "",
                        debe_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000,
                        haber_sus: "", eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                    asiento = {
                        idAsignado: null, idPadre: null,
                        glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")",
                        cuenta: await $scope.buscarCuentaVinculanteLc($scope.configuracionCierreCajaChica.contraCuentaHaber.codigo),
                        debe_bs: "",
                        haber_bs: caja.monto,
                        debe_sus: "",
                        haber_sus: Math.round((caja.monto / $scope.moneda.dolar) * 10000) / 10000,
                        eliminado: false, activo: true, isOpen: false
                    }

                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento);
                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                    /*  console.log("retencion Servicio") */
                    if (caja.compra.tipo_retencion) {
                        //cuenta caja
                        let asiento = {
                            idAsignado: null, idPadre: null,
                            id_compra: caja.compra.id,
                            cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                            centroCosto: centros,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                            debe_bs: caja.compra.importe,
                            haber_bs: "",
                            debe_sus: Math.round((caja.compra.importe / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false, activo: true, isOpen: false
                        }


                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //servicio
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.servicio.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //iue
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.iue.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.it.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    } else {
                        let asiento = {
                            idAsignado: null, idPadre: null,
                            id_compra: caja.compra.id,
                            cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                            centroCosto: centros, glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                            debe_bs: total,
                            haber_bs: "",
                            debe_sus: Math.round(((total * (87 / 100)) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false, activo: true, isOpen: false
                        }
                        //servicio

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.servicio.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.servicio.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                        //iue
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.iue.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                        //it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionServicios.it.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionServicios.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)

                    }

                } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    let asiento = {}
                    if (caja.compra.tipo_retencion) {
                        //caja chica
                        asiento = {
                            idAsignado: null, idPadre: null,
                            id_compra: caja.compra.id,
                            cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                            centroCosto: centros,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                            debe_bs: caja.compra.importe,
                            haber_bs: "",
                            debe_sus: Math.round(((caja.compra.importe) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                        //almacen
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //iue
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.iue.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.it.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((caja.compra.importe * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                    } else {
                        asiento = {
                            idAsignado: null, idPadre: null,
                            id_compra: caja.compra.id,
                            cuentaAux: { nombre: cuentaAux ? cuentaAux.razon_social : undefined },
                            centroCosto: centros,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc(caja.cuenta.codigo),
                            debe_bs: total * 100 / $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje,
                            haber_bs: "",
                            debe_sus: Math.round(((total * 100 / $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje) / $scope.moneda.dolar) * 10000) / 10000,
                            haber_sus: "",
                            eliminado: false, activo: true, isOpen: false
                        }

                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento);
                        //almacen
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionBienesGasto.gasto.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                        //iue
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.iue.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionBienesGasto.iue.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                        //it
                        asiento = {
                            idAsignado: null, idPadre: null,
                            glosa: caja.detalle + " (" + caja.compra.movimiento.clase.nombre + ")" + "retencion por la empresa:" + retencion,
                            cuenta: await $scope.buscarCuentaVinculanteLc($scope.plantillasCuentasCompobante.retencionBienesGasto.it.cuenta.codigo),
                            debe_bs: "",
                            haber_bs: total * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100, debe_sus: "",
                            haber_sus: Math.round(((total * $scope.plantillasCuentasCompobante.retencionBienesGasto.it.porcentaje / 100) / $scope.moneda.dolar) * 10000) / 10000,
                            eliminado: false, activo: true, isOpen: false
                        }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                    }


                    if (i === a.length - 1) {
                        $scope.cal($scope.nuevoComprobante.asientosContables)
                        $scope.verigicarRegistroAntiguo()
                        $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                    }
                }
                $scope.$evalAsync()
                /*   } */

            }
            $scope.imprimirCompra = function (compra) {
                GenerarImpresionCompra(compra, $scope.usuario, $scope.convertirALiteral, $scope.verificarDescuentos)
            }
            $scope.imprimirCompraProg = function (ProgCompras) {
                GenerarImpresionCompra(ProgCompras.compra, $scope.usuario, $scope.convertirALiteral, $scope.verificarDescuentos)
            }
            $scope.convertirALiteral = function (value) {
                ConvertirALiteral(value)
            }
            $scope.crearRegistroComprobante = async function (tipoCreacion, datosComprobante) {
                $scope.verComprobante = false
                $scope.edicionCierre = false
                $scope.guardadoAutomaticoComprobante()
                switch (tipoCreacion) {
                    case 'edicion':
                        $scope.realizarComprobandeEdicion(datosComprobante)
                        break;
                    case 'vista':
                        $scope.realizarComprobandeVista(datosComprobante)
                        break;
                    case 'venta':
                        $scope.realizarComprobandeVenta(datosComprobante)
                        break;
                    case 'compra':
                        const esArray = Array.isArray(datosComprobante)
                        if (esArray) {
                            const noVerificadas = datosComprobante.filter(compra => (compra.check && compra.verificado_para_comprobante === false))
                            const informacion = noVerificadas.map(compra => (compra.proveedor.razon_social + ', Total: ' + compra.total))
                            if (informacion.length > 0) {
                                $scope.mostrarMensaje(informacion.join('<br />') + '<br />Compra(s) no verificada(s)!')
                            } else {
                                $scope.realizarComprobandeCompra(datosComprobante)
                            }
                        } else {
                            if (datosComprobante.verificado_para_comprobante) {
                                $scope.realizarComprobandeCompra(datosComprobante)
                            } else {
                                alert('Información de compra sin verificar.')
                            }
                        }

                        break;
                    case 'cierreCaja':
                        $scope.realizarComprobandeCierreCaja(datosComprobante)
                        break;
                    case 'proforma':
                        $scope.realizarComprobandeProforma(datosComprobante)
                        break;
                    case 'proformaFactEliminada':
                        $scope.realizarComprobandeProformaEliminada(datosComprobante)
                        break;
                    case 'proformaFactEliminadaRectificacion':
                        $scope.realizarComprobandeProformaEliminadaRectifiacion(datosComprobante)
                        break;
                    case 'PlanillaSueldo':
                        $scope.realizarComprobandePlanillaSueldo(datosComprobante)
                        break;
                    case 'PlanillaSueldosEmpleados':
                        $scope.realizarComprobandePlanillaSueldoEmpleado(datosComprobante)
                        break;
                    case 'PlanillaCargaSocial':
                        $scope.realizarComprobandeCargaSocial(datosComprobante)
                        break;
                    case 'AnticiposRegulares':
                        $scope.realizarComprobandeAnticiposRegulares(datosComprobante)
                        break;
                    case 'PlanillaAguinaldos':
                        $scope.realizarComprobandePlanillaAguinaldoEmpleado(datosComprobante)
                        break;
                    case 'Traspasos':
                        $scope.realizarComprobandeSalidaTraspasos(datosComprobante)
                        break;
                    case 'solicitudesAlmacen':
                        $scope.realizarComprobandeSolicitudesAlmacen(datosComprobante)
                        break;
                    case 'materialMantenimiento':
                        $scope.realizarComprobandeMaterialMantenimiento(datosComprobante)
                        break;
                    case 'ropaTrabajoRRHH':
                        $scope.realizarComprobandeRopaTrabajo(datosComprobante)
                        break;
                    case 'RendicionFondo':
                        $scope.realizarComprobandeRendicionFondo(datosComprobante)
                        break;
                    default:
                        $scope.abrirPopup($scope.idModalWizardComprobanteEdicion);
                        break;
                }
            }
            $scope.ObtenerPlantillaIngresoEgreso = async function () {
                try {
                    const entidad = await ConfiguracionesCuentasEmpresa($scope.usuario.id_empresa);
                    return entidad.lista;
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.reiniciarCorrelativoComprobantes = function () {
                let fechaActual = new Date()
                let sucursalesParaActualizar = []
                if ($scope.usuario.id_empresa) {
                    let promesa = VerificarCorrelativosSucursale($scope.usuario.id_empresa)
                    promesa.then(function (sucursales) {
                        sucursales.forEach(function (sucursal, index, array) {
                            if (sucursal.fecha_reinicio_correlativo) {
                                let fechaAnterior = new Date(sucursal.fecha_reinicio_correlativo)
                                let fechaAnteriorMes = fechaAnterior.getMonth()
                                let fechaActualMes = fechaActual.getMonth()
                                if (fechaAnteriorMes != fechaActualMes || fechaAnteriorMes < fechaActualMes) {
                                    sucursalesParaActualizar.push(sucursal)
                                } else if (fechaAnteriorMes == 11 && fechaActualMes == 0) {
                                    sucursalesParaActualizar.push(sucursal)

                                }
                            } else {
                                sucursalesParaActualizar.push(sucursal)
                            }
                        });
                        let fecha_reinicio_correlativo = new Date()
                        let diaActual = new Date()
                        fecha_reinicio_correlativo.setDate(1)
                        fecha_reinicio_correlativo.setHours(diaActual.getHours())
                        fecha_reinicio_correlativo.setMinutes(diaActual.getMinutes())
                        fecha_reinicio_correlativo.setSeconds(diaActual.getSeconds())
                        let datos = { sucursales: sucursalesParaActualizar, fecha: fecha_reinicio_correlativo }
                        if (sucursalesParaActualizar.length > 0 && diaActual.getTime() == fecha_reinicio_correlativo.getTime()) {
                            let promesa = ReiniciarCorrelativoSucursales(datos)
                            promesa.then(function (dato) {
                                $scope.mostrarMensaje(dato.message)
                            })
                        }
                    })
                }
            }

            $scope.ComvertirDebeEnDolar = function (asiento, dato) {
                asiento.debe_sus = Math.round((asiento.debe_bs / $scope.moneda.dolar) * 10000) / 10000;
                if (asiento.cuenta.cuentaAux) {
                    asiento.cuenta.cuentaAux.debe = asiento.debe_bs;
                    asiento.cuenta.cuentaAux.haber = asiento.haber_bs;
                    if (asiento.debe_bs >= asiento.haber_bs) {
                        asiento.cuenta.cuentaAux.saldo = asiento.debe_bs - asiento.haber_bs;
                    } else {
                        asiento.cuenta.cuentaAux.saldo = asiento.haber_bs - asiento.debe_bs;
                    }
                }
                // console.log(asiento.cuenta.cuentaAux)
            }
            $scope.ComvertirHaberEnDolar = function (asiento) {
                asiento.haber_sus = Math.round((asiento.haber_bs / $scope.moneda.dolar) * 10000) / 10000;
                if (asiento.cuenta.cuentaAux) {
                    asiento.cuenta.cuentaAux.debe = asiento.debe_bs;
                    asiento.cuenta.cuentaAux.haber = asiento.haber_bs;
                    if (asiento.debe_bs >= asiento.haber_bs) {
                        asiento.cuenta.cuentaAux.saldo = asiento.debe_bs - asiento.haber_bs;
                    } else {
                        asiento.cuenta.cuentaAux.saldo = asiento.haber_bs - asiento.debe_bs;
                    }
                }
            }
            $scope.ComvertirDebeEnBolivianos = function (asiento) {
                asiento.debe_bs = Math.round((asiento.debe_sus * $scope.moneda.dolar) * 10000) / 10000;
                if (asiento.cuenta.cuentaAux) {
                    asiento.cuenta.cuentaAux.debe = asiento.debe_bs;
                    asiento.cuenta.cuentaAux.haber = asiento.haber_bs;
                    if (asiento.debe_bs >= asiento.haber_bs) {
                        asiento.cuenta.cuentaAux.saldo = asiento.debe_bs - asiento.haber_bs;
                    } else {
                        asiento.cuenta.cuentaAux.saldo = asiento.haber_bs - asiento.debe_bs;
                    }
                }
            }
            $scope.ComvertirHaberEnBolivianos = function (asiento) {
                asiento.haber_bs = Math.round((asiento.haber_sus * $scope.moneda.dolar) * 10000) / 10000;
                if (asiento.cuenta.cuentaAux) {
                    asiento.cuenta.cuentaAux.debe = asiento.debe_bs;
                    asiento.cuenta.cuentaAux.haber = asiento.haber_bs;
                    if (asiento.debe_bs >= asiento.haber_bs) {
                        asiento.cuenta.cuentaAux.saldo = asiento.debe_bs - asiento.haber_bs;
                    } else {
                        asiento.cuenta.cuentaAux.saldo = asiento.haber_bs - asiento.debe_bs;
                    }
                }
            }
            $scope.obtenerTiposComprobante = function () {
                blockUI.start();
                var promesa = ClasesTipo("TCMC");
                promesa.then(function (entidad) {
                    $scope.tiposComprobantes = entidad.clases;
                    blockUI.stop();
                });
            }
            $scope.guardarComprasComprobante = function () {
                $scope.ocultarMensajesValidacion();
                $scope.DatosCodigoQr.forEach(function (element) {
                    element.fecha = new Date($scope.convertirFecha(element.fecha));
                }, this);
                blockUI.start();
                ComprasComprobante.save($scope.DatosCodigoQr, function (dato) {
                    blockUI.stop();
                    $scope.mostrarMensaje(dato.mensaje);
                    $scope.DatosCodigoQr = [];
                }, function (error) {
                    blockUI.stop();
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');

                });

            }
            $scope.verificarCuenta = function (formularioAsignarCuenta, cuenta) {
                if (cuenta.id) {
                    formularioAsignarCuenta.asig.$error.cuenta = false
                    $scope.error = false
                } else {
                    formularioAsignarCuenta.asig.$error.cuenta = true
                    $scope.error = true
                }
            }
            $scope.AsignarCuentaClienteProvedor = function (formularioAsignarCuenta) {
                if ($scope.datos.cuenta.id) {
                    formularioAsignarCuenta.asig.$error.cuenta = false
                    $scope.error = false
                    $scope.datos.$save(function (data) {
                        $scope.mostrarMensaje(data.menssage)
                        $scope.cerrarCuentaClienteProvedor()
                        $scope.verificarVentasComprobantes($scope.usuario.id_empresa)
                        $scope.verificarComprasComprobantes($scope.usuario.id_empresa)
                    })
                } else {

                    formularioAsignarCuenta.asig.$error.cuenta = true
                    $scope.error = true
                }
            }
            $scope.cerrarNuevoComprobante = function () {
                shortcut.remove("Ctrl+G")
                shortcut.remove("Ctrl+S")
                shortcut.remove("Ctrl+B")
                shortcut.remove("Ctrl+shift+G")
                $scope.pararAutoGuardado()
                $scope.cerrarPopup($scope.idModalWizardComprobanteEdicion);
                $scope.totales = undefined
            };
            //modal qr
            $scope.abrirModalOpcionesQr = function () {
                $scope.abrirPopup($scope.IdModalOpcionesQr);
            }
            $scope.cerrarModalOpcionesQr = function () {
                $scope.cerrarPopup($scope.IdModalOpcionesQr);
            }
            //modal asignar cuenta
            $scope.abrirCuentaClienteProvedor = function (cliente, proveedor, tipo) {

                if (cliente) {
                    $scope.datos = new AsignarCuentaCiente({ id_cliente: cliente.id, cuenta: "", tipo: tipo })
                } else {
                    if (tipo === 'debe') {
                        let debe = $scope.tiposCuentaProveedor.find(x => x.nombre_corto == 'DEBE')
                        $scope.datos = new AsignarCuentaProveedor({ id: proveedor.proveedorCuentaDebe ? proveedor.proveedorCuentaDebe.id : null, id_proveedor: proveedor.id, cuenta: proveedor.proveedorCuentaDebe ? proveedor.proveedorCuentaDebe.cuenta : '', id_tipo: debe.id, edicion: proveedor.proveedorCuentaDebe ? true : false, idProveedorCuenta: proveedor.proveedorCuentaDebe ? proveedor.proveedorCuentaDebe.id : "" })
                    } else {
                        let haber = $scope.tiposCuentaProveedor.find(x => x.nombre_corto == 'HABER')
                        $scope.datos = new AsignarCuentaProveedor({ id: proveedor.proveedorCuentaHaber ? proveedor.proveedorCuentaHaber.id : null, id_proveedor: proveedor.id, cuenta: proveedor.proveedorCuentaHaber ? proveedor.proveedorCuentaHaber.cuenta : '', id_tipo: haber.id, edicion: proveedor.proveedorCuentaHaber ? true : false, idProveedorCuenta: proveedor.proveedorCuentaHaber ? proveedor.proveedorCuentaHaber.id : "" })

                    }
                }

                $scope.abrirPopup($scope.IdModalAsignarCuenta);
            }
            $scope.abrirVerificacionDatosCompra = (compra) => {
                $scope.obtenerMovimientosIngresos();
                $scope.obtenerAlmacenes(compra.almacen.id_sucursal)
                compra.tipoPago = { id: compra.id_tipo_pago }
                compra.fechaTexto = $scope.formatoFechaPDF(compra.fecha)
                compra.sucursal = compra.almacen.sucursal
                $scope.compraPorVerificarComprobantes = compra
                $scope.cambiarTipoPagoCompEdit($scope.compraPorVerificarComprobantes)
                $scope.abrirPopup($scope.IdModalVerificacionCompra);
            }
            $scope.obtenerMovimientosIngresos = () => {
                const promesa = ClasesTipo("MOVING");
                promesa.then(function (entidad) {
                    $scope.movimientosIngreso = entidad.clases.reduce(function (val, mov, index, array) {
                        if (mov.nombre_corto !== $scope.diccionario.MOVING_INVENTARIO_INICIAL && mov.nombre_corto !== $scope.diccionario.MOVING_POR_TRASPASO && mov.nombre_corto !== $scope.diccionario.MOVING_POR_DEVOLUCION) {
                            let bool = true
                            if (mov.nombre_corto === $scope.diccionario.MOVING_POR_AJUSTE) {
                                bool = $scope.usuario.empresa.usar_ingreso_por_ajuste ? true : false
                            }
                            if (mov.nombre_corto === $scope.diccionario.MOVING_POR_PRODUCCION) {
                                bool = $scope.usuario.empresa.usar_produccion_compra ? true : false
                            }
                            if (bool) {
                                val.push(mov)

                            }
                        }
                        return val
                    }, []);
                    blockUI.stop();
                }).catch((err) => {
                    alert(err?.stack ?? 'Se perdió la conexión.')
                })
            }
            $scope.guardarCompraComprobanteVerificada = async () => {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Esta seguro de verificar la Compra con factura #" + $scope.compraPorVerificarComprobantes.factura + " seleccionada!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(async function (result) {
                    if (result.value) {
                        const fecha = $scope.compraPorVerificarComprobantes.fechaTexto.split('/').reverse().join('-') + ' ' + $scope.formatoTiempoPDF(new Date())
                        $scope.compraPorVerificarComprobantes.fechaModificadaVerificacion = new Date(fecha)
                        const verificacion = await GuardarVerificacionCompraComprobante($scope.usuario.id_empresa, $scope.compraPorVerificarComprobantes)
                        if (verificacion.hasErr) return alert(verificacion.mensaje)
                        $scope.compraPorVerificarComprobantes.verificado_para_comprobante = true
                        $scope.cerrarVerificacionDatosCompra()
                    }
                });
            }
            $scope.cerrarVerificacionDatosCompra = function () {
                $scope.compraPorVerificarComprobantes = undefined;
                $scope.cerrarPopup($scope.IdModalVerificacionCompra);
            }
            $scope.cerrarCuentaClienteProvedor = function () {
                $scope.cuenta = ""
                $scope.cerrarPopup($scope.IdModalAsignarCuenta);
            }

            //modal registrar
            $scope.abrirModalRegistrarComprobante = function () {
                $scope.abrirPopup($scope.IdModalRegistrarComprobante)
            }
            $scope.cerrarModalRegComprobante = function () {
                $scope.cerrarPopup($scope.IdModalRegistrarComprobante);
            }

            //modal revisar
            $scope.abrirModalRevisarComprobante = function () {

                $scope.ObtenerComprobantesRevision()
                $scope.abrirPopup($scope.IdModalRevisarComprobante)
            }
            $scope.ObtenerComprobantesRevision = function () {
                $scope.paginatorPrincipal = $scope.paginator;
                $scope.paginator = Paginator();
                $scope.paginator.column = "numero";
                $scope.paginator.callBack = $scope.obtenerListaRevision;
                $scope.filtro = { empresa: $scope.usuario.id_empresa, inicio: 0, fin: 0, texto_busqueda: 0 };
                if ($scope.filtro.inicio != null) {
                    $scope.paginator.getSearch("", $scope.filtro);
                    $scope.filtro.inicio = ""
                    $scope.filtro.fin = ""
                }
            }

            $scope.asignarComprobanteFavorito = function (idComprobante) {
                NuevoComprobante(SweetAlert, $scope.paginator, $scope.filtro, null, idComprobante)
            }

            $scope.obtenerListaRevision = function () {
                blockUI.start();
                var promise = NuevoComprobante(null, $scope.paginator, $scope.filtro, null, null, null, true, $scope.convertirFecha)
                promise.then(function (data) {
                    $scope.paginator.setPages(data.paginas);
                    $scope.comprobantesRevision = data.comprobantes;
                    blockUI.stop();
                });
            }

            $scope.BuscarPorFechaLibrosMayores = function (asiento, inicio, fin) {
                if (inicio) {
                    var datosLibro = { empresa: $scope.usuario.id_empresa, asiento: asiento, fechaInicio: new Date($scope.convertirFecha(inicio)), fechaFin: new Date($scope.convertirFecha(fin)) }
                } else {
                    var datosLibro = { empresa: $scope.usuario.id_empresa, asiento: asiento, fechaInicio: 0, fechaFin: 0 }
                }
                /*  var promesa = NuevoComprobante(null, null, null, null, null, datosLibro)
                 promesa.then(function (entidad) {
                     $scope.DatosLibroMayor = entidad;
                 }); */
                $scope.abrirModalLibrosMayores(asiento, datosLibro)
            }
            $scope.cerrarModalLibrosMayores = function () {
                $scope.cerrarPopup($scope.IdModalLibroMayor);
            }
            $scope.cerrarModalRevisarComprobante = function () {
                if ($scope.paginatorPrincipal != null) {
                    $scope.paginator = Paginator()
                    $scope.paginator = $scope.paginatorPrincipal;
                    $scope.paginator.column = "numero";
                    $scope.paginator.callBack = $scope.obtenerLista;
                }
                $scope.cerrarPopup($scope.IdModalRevisarComprobante);
            }

            //modal Libros mayores
            $scope.abrirModalLibrosMayores = function (asiento, filter) {
                $scope.asiento = asiento
                $scope.ultimoValorAsiento = 0
                $scope.obtenerLibrosMayores(asiento)
                $scope.abrirPopup($scope.IdModalLibroMayor)
            }
            $scope.obtenerLibrosMayores = function (asiento, filter) {
                var asientos = asiento;
                if (asiento.cuenta) {
                    asientos = asiento.cuenta

                } else {
                    asientos = asiento
                }
                $scope.paginator = Paginator();
                $scope.paginator.column = "id";
                $scope.paginator.direction = "asc";
                if (filter) {
                    $scope.datosLibro = {
                        empresa: $scope.usuario.id_empresa,
                        asiento: asientos, fechaInicio: 0, fechaFin: 0, cuenta_auxiliar: 0, centro_costos: 0
                    };

                    $scope.datosLibro.fechaInicio = filter.fechaInicio ? new Date($scope.convertirFecha(filter.fechaInicio)) : 0;
                    $scope.datosLibro.fechaFin = filter.fechaFin ? new Date($scope.convertirFecha(filter.fechaFin)) : 0;
                    $scope.datosLibro.asiento = asientos;
                    $scope.datosLibro.cuenta_auxiliar = filter.cuenta_auxiliar ? filter.cuenta_auxiliar : 0;
                    $scope.datosLibro.centro_costos = filter.centro_costos ? filter.centro_costos : 0;
                } else {
                    $scope.datosLibro = {
                        empresa: $scope.usuario.id_empresa,
                        asiento: asientos, fechaInicio: 0, fechaFin: 0, cuenta_auxiliar: 0, centro_costos: 0
                    }
                }
                $scope.paginator.callBack = $scope.obtenerLibroMayorCuenta
                $scope.paginator.getSearch("", $scope.datosLibro, null);
            }

            $scope.quitarEspacioTexto = function (texto) {
                if (texto) {
                    return texto.replace(/[ ]+$/g, "")
                } else {
                    return "";
                }
            }

            $scope.descargarExcelLibrosMayores = function (filter) {
                blockUI.start();
                $scope.filtroMayores = {
                    currentPage: 1,
                    itemsPerPage: 0,// itemsPerPage: $scope.paginator.pages.length * 10, ocaciona que no salgan todos los registros.
                    search: 0,
                    column: "id",
                    direction: "asc",
                    filter: {
                        empresa: $scope.usuario.id_empresa,
                        asiento: $scope.asiento,
                        fechaInicio: 0,
                        fechaFin: 0,
                        cuenta_auxiliar: 0,
                        centro_costos: 0,
                        bimonetario: 0
                    }
                };

                if (filter) {
                    if (filter.fechaInicio && filter.fechaFin) {
                        $scope.filtroMayores.filter.fechaInicio = new Date($scope.convertirFecha(filter.fechaInicio));
                        $scope.filtroMayores.filter.fechaFin = new Date($scope.convertirFecha(filter.fechaFin));
                    }
                    $scope.filtroMayores.filter.cuenta_auxiliar = filter.cuenta_auxiliar ? filter.cuenta_auxiliar : 0;
                    $scope.filtroMayores.filter.centro_costos = filter.centro_costos ? filter.centro_costos : 0;
                    $scope.filtroMayores.filter.bimonetario = filter.bimonetario ? filter.bimonetario : 0;
                }
                if ($scope.filtroMayores.filter.bimonetario) {
                    var data = [["FECHA", "N°", "DESCRIPCIÓN", "DEBE", "HABER", "DEUDOR ACREEDOR", 'DEBE USD', 'DEBE USD', 'AUXILIAR']]
                } else {
                    var data = [["FECHA", "N°", "DESCRIPCIÓN", "DEBE", "HABER", "DEUDOR ACREEDOR", 'AUXILIAR']]
                }

                var promesa = NuevoComprobante(null, null, null, null, null, $scope.filtroMayores)
                promesa.then(function (entidad) {
                    $scope.DatosLibroMayorExcel = entidad.asientos;
                    var saldo = 0
                    if ($scope.DatosLibroMayorExcel.length > 0) {
                        $scope.DatosLibroMayorExcel.forEach(function (cuenta, index, array) {
                            var columns = [];
                            cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento;
                            cuenta.prefico_comprobante = $scope.prefijosComprobantes(cuenta);
                            if ($scope.paginator.currentPage > 1) {
                                if ($scope.asiento.clasificacion.saldo.nombre == "DEUDOR-DEBE" || $scope.asiento.clasificacion.saldo.nombre == "AMBAS-DEBE Y HABER") {

                                    if (index == 0) {
                                        cuenta.saldo_bs = cuenta.debe_bs - cuenta.haber_bs
                                        cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento
                                        $scope.ultimoValorAsiento = cuenta.saldo_bs
                                        saldo = cuenta.saldo_bs
                                    } else {
                                        cuenta.saldo_bs = saldo + cuenta.debe_bs - cuenta.haber_bs
                                        //cuenta.saldo_bs =  cuenta.saldo_bs + $scope.ultimoValorAsiento 
                                        $scope.ultimoValorAsiento = cuenta.saldo_bs
                                        saldo = cuenta.saldo_bs
                                    }

                                } else if ($scope.asiento.clasificacion.saldo.nombre == "ACREEDOR-HABER") {
                                    if (index == 0) {
                                        cuenta.saldo_bs = cuenta.haber_bs - cuenta.debe_bs
                                        cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento
                                        $scope.ultimoValorAsiento = cuenta.saldo_bs
                                        saldo = cuenta.saldo_bs
                                    } else {
                                        cuenta.saldo_bs = saldo + cuenta.haber_bs - cuenta.debe_bs
                                        //cuenta.saldo_bs =  cuenta.saldo_bs + $scope.ultimoValorAsiento 
                                        $scope.ultimoValorAsiento = cuenta.saldo_bs
                                        saldo = cuenta.saldo_bs
                                    }
                                }

                            } else {
                                if ($scope.asiento.clasificacion.saldo.nombre == "DEUDOR-DEBE" || $scope.asiento.clasificacion.saldo.nombre == "AMBAS-DEBE Y HABER") {

                                    if (index == 0) {
                                        cuenta.saldo_bs = cuenta.debe_bs - cuenta.haber_bs
                                        saldo = cuenta.saldo_bs
                                    } else {
                                        cuenta.saldo_bs = saldo + cuenta.debe_bs - cuenta.haber_bs
                                        saldo = cuenta.saldo_bs
                                    }

                                } else if ($scope.asiento.clasificacion.saldo.nombre == "ACREEDOR-HABER") {
                                    if (index == 0) {
                                        cuenta.saldo_bs = cuenta.haber_bs - cuenta.debe_bs
                                        saldo = cuenta.saldo_bs
                                    } else {
                                        cuenta.saldo_bs = saldo + cuenta.haber_bs - cuenta.debe_bs
                                        saldo = cuenta.saldo_bs
                                    }
                                }
                            }
                            columns.push($scope.formatoFechaPDF(cuenta.comprobante.fecha));
                            columns.push(cuenta.prefico_comprobante)
                            columns.push(cuenta.glosa);
                            columns.push(cuenta.debe_bs);
                            columns.push(cuenta.haber_bs);
                            columns.push(cuenta.saldo_bs);
                            if ($scope.filtroMayores.filter.bimonetario) {
                                columns.push(cuenta.debe_sus);
                                columns.push(cuenta.haber_sus);
                            }
                            columns.push(cuenta.cuentaAux ? $scope.quitarEspacioTexto(cuenta.cuentaAux.nombre) : '');
                            data.push(columns);

                        })
                        $scope.ultimoValorAsiento = $scope.DatosLibroMayor[$scope.DatosLibroMayor.length - 1].saldo_bs

                        var ws_name = "SheetJS";
                        var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                        /* add worksheet to workbook */
                        wb.SheetNames.push(ws_name);
                        wb.Sheets[ws_name] = ws;
                        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBROS-MAYORES.xlsx");
                    }

                    blockUI.stop();
                    //
                });

            }

            $scope.prefijosComprobantes = function (cuenta) {
                if (cuenta.comprobante.tipoComprobante) {
                    if (cuenta.comprobante.tipoComprobante.nombre == "CAJA CHICA") {
                        return "C-" + cuenta.comprobante.numero;
                    } else if (cuenta.comprobante.tipoComprobante.nombre == "EGRESO") {
                        return "E-" + cuenta.comprobante.numero;
                    } else if (cuenta.comprobante.tipoComprobante.nombre == "INGRESO") {
                        return "I-" + cuenta.comprobante.numero;
                    } else if (cuenta.comprobante.tipoComprobante.nombre == "TRASPASO") {
                        return "T-" + cuenta.comprobante.numero;
                    } else {
                        return "" + cuenta.comprobante.numero;
                    }
                }
            }

            $scope.generarPdfLibrosMayores = function (filter) {
                // blockUI.start();
                $scope.filtroMayores = {
                    currentPage: 1,
                    itemsPerPage: 0,// itemsPerPage: $scope.paginator.pages.length * 10, // ocaciona que no salgan todos los registros.
                    search: 0,
                    column: "id",
                    direction: "asc",
                    filter: {
                        empresa: $scope.usuario.id_empresa,
                        asiento: $scope.asiento,
                        fechaInicio: 0,
                        fechaFin: 0,
                        cuenta_auxiliar: 0,
                        centro_costos: 0,
                        detallado: 0
                    }
                };

                if (filter) {
                    if (filter.fechaInicio && filter.fechaFin) {
                        $scope.filtroMayores.filter.fechaInicio = new Date($scope.convertirFecha(filter.fechaInicio));
                        $scope.filtroMayores.filter.fechaFin = new Date($scope.convertirFecha(filter.fechaFin));
                    }
                    $scope.filtroMayores.filter.cuenta_auxiliar = filter.cuenta_auxiliar ? filter.cuenta_auxiliar : 0;
                    $scope.filtroMayores.filter.centro_costos = filter.centro_costos ? filter.centro_costos : 0;
                    $scope.filtroMayores.filter.detallado = filter.detallado ? filter.detallado : 0;
                }

                SweetAlert.swal({
                    title: 'Obteniendo datos...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-search size-icon"></i>',
                    html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;

                var promesa = NuevoComprobante(null, null, null, null, null, $scope.filtroMayores)
                promesa.then(function (entidad) {
                    $scope.DatosLibroMayorExcel = entidad.asientos;
                    if ($scope.DatosLibroMayorExcel.length > 0) {
                        var elemIcon = document.querySelector('.swal2-icon-content');
                        elemIcon.innerHTML = '';
                        elemIcon.innerHTML = '<i class="fa fa-file-text size-icon"></i>';
                        SweetAlert.update({ title: "Generando Reporte.....", html: "Por favor espere esto puede tardar varios minutos..." })
                        if ($scope.filtroMayores.filter.detallado) {
                            $scope.generarPdfDetallado($scope.DatosLibroMayorExcel);
                        }
                        else {
                            $scope.generarPdfSinDetalle($scope.DatosLibroMayorExcel);
                        }
                    }
                });
            }

            $scope.generarPdfSinDetalle = function (datos) {
                var height = 20;
                var x = 30, y = 110, width = 555, itemsPage = 31, pagina = 1, totalPaginas = Math.ceil($scope.DatosLibroMayorExcel.length / itemsPage);
                var doc = new PDFDocument({ size: 'letter', margin: 30, compress: false });
                var stream = doc.pipe(blobStream());
                doc.lineWidth(0.5)
                $scope.dibujarCabeceraPdfLibrosMayores(doc, 1, totalPaginas, $scope.filtroMayores);
                doc.font('Helvetica', 6);
                var currentDate = new Date();
                var dia = currentDate.getDate();
                var mes = currentDate.getMonth() + 1;
                var anio = currentDate.getFullYear();
                var horas = currentDate.getHours();
                var min = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
                var debeBs = 0;
                var haberBs = 0;
                var saldoCA = 0;
                datos.forEach(function (cuenta, index, array) {
                    if ($scope.asiento.clasificacion.saldo.nombre_corto == 'DEDE') {
                        saldoCA += cuenta.debe_bs.toFixed(2) - cuenta.haber_bs.toFixed(2);
                    }
                    if ($scope.asiento.clasificacion.saldo.nombre_corto == 'ACHA') {
                        saldoCA += cuenta.haber_bs.toFixed(2) - cuenta.debe_bs.toFixed(2);
                    }
                    cuenta.prefico_comprobante = $scope.prefijosComprobantes(cuenta);
                    debeBs += cuenta.debe_bs;
                    haberBs += cuenta.haber_bs;
                    doc.font('Helvetica', 6);
                    doc.rect(x, y, 555, height).stroke();
                    doc.text(cuenta.comprobante.fecha ? $scope.fechaATexto(new Date(cuenta.comprobante.fecha)) : "", 30, y + 8, { width: 40, align: "center" });
                    doc.text(cuenta.prefico_comprobante, 70, y + 8, { width: 40, align: 'center' });
                    if (cuenta.glosa != null && cuenta.glosa.length > 74) {
                        doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 4, { width: 250 });
                    } else {
                        doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 8, { width: 250 });
                    }
                    doc.text(number_format_negativo_to_positvo(cuenta.debe_bs, 2), 365, y + 8, { width: 65, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(cuenta.haber_bs, 2), 435, y + 8, { width: 65, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(saldoCA.toFixed(2), 2), 505, y + 8, { width: 70, align: 'right' });

                    y = y + height;
                    if (y > 731) {
                        y = y + 10;
                        doc.font('Helvetica', 6);
                        doc.text("Página : " + pagina, 540, 750);
                        doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                        doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

                        doc.addPage({ margin: 0, bufferPages: true });
                        y = 110;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                        doc.font('Helvetica', 6);
                    }
                    if (index == datos.length - 1) {
                        doc.font('Helvetica-Bold', 7);
                        doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(debeBs, 2), 365, y + 3, { width: 70, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(haberBs, 2), 435, y + 3, { width: 70, align: 'right' });
                    }


                })

                doc.font('Helvetica', 6);
                doc.text("Página : " + pagina, 540, 750);
                doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                    SweetAlert.swal({
                        title: 'Finalizado!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                });
                blockUI.stop();
            }

            $scope.generarPdfDetallado = function (datos) {
                var height = 20;
                var x = 30, y = 110, width = 555, itemsPage = 31, pagina = 1, totalPaginas = Math.ceil($scope.DatosLibroMayorExcel.length / itemsPage);
                var doc = new PDFDocument({ size: 'letter', margin: 30, compress: false });
                var stream = doc.pipe(blobStream());
                doc.lineWidth(0.5)
                $scope.dibujarCabeceraPdfLibrosMayores(doc, 1, totalPaginas, $scope.filtroMayores);
                var datosNoDef = datos.filter(cuenta => cuenta.cuentaAux == null);
                var datosDef = datos.filter(cuenta => cuenta.cuentaAux != null);
                if (datosDef[0].cuentaAux) {
                    datosDef = datosDef.sort(function (prev, next) {
                        if (prev.cuentaAux.nombre > next.cuentaAux.nombre) return 1
                        if (prev.cuentaAux.nombre < next.cuentaAux.nombre) return -1
                        return 0
                    })
                }
                doc.font('Helvetica', 6);
                var currentDate = new Date();
                var dia = currentDate.getDate();
                var mes = currentDate.getMonth() + 1;
                var anio = currentDate.getFullYear();
                var horas = currentDate.getHours();
                var min = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
                var debeBs = 0;
                var haberBs = 0;
                var saldoCA = 0;
                datosDef.forEach(function (cuenta, index, array) {
                    cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento;
                    cuenta.prefico_comprobante = $scope.prefijosComprobantes(cuenta);

                    if (index == 0) {
                        debeBs += cuenta.debe_bs;
                        haberBs += cuenta.haber_bs;
                        if ($scope.asiento.clasificacion.saldo.nombre == 'DEUDOR-DEBE') saldoCA += cuenta.debe_bs - cuenta.haber_bs;
                        if ($scope.asiento.clasificacion.saldo.nombre == 'ACREEDOR-HABER') saldoCA += cuenta.haber_bs - cuenta.debe_bs;
                        doc.font('Helvetica-Bold', 8); y += 10;
                        doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                        doc.font('Helvetica', 6);
                        doc.rect(x, y, 555, height).stroke();
                        doc.text(cuenta.comprobante.fecha ? $scope.fechaATexto(new Date(cuenta.comprobante.fecha)) : "", 30, y + 8, { width: 40, align: "center" });
                        doc.text(cuenta.prefico_comprobante, 70, y + 8, { width: 40, align: 'center' });
                        if (cuenta.glosa != null && cuenta.glosa.length > 74) {
                            doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 4, { width: 250 });
                        } else {
                            doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 8, { width: 250 });
                        }
                        doc.text(number_format_negativo_to_positvo(cuenta.debe_bs, 2), 365, y + 8, { width: 70, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(cuenta.haber_bs, 2), 435, y + 8, { width: 70, align: 'right' });
                        doc.text(formatearSeparadorMiles(saldoCA, 2), 505, y + 8, { width: 70, align: 'right' });

                        y = y + height;
                        if (y >= 730) {
                            y = y + 10;
                            doc.font('Helvetica', 6);
                            doc.text("Página : " + pagina, 540, 750);
                            doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                            doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

                            doc.addPage({ margin: 0, bufferPages: true });
                            y = 110;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                            doc.font('Helvetica-Bold', 8); y += 10;
                            doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                            doc.font('Helvetica', 6);
                        }

                    } else {
                        if (cuenta.cuentaAux.nombre.replace(/ /g, '') === array[index - 1].cuentaAux.nombre.replace(/ /g, '')) {
                            if ($scope.asiento.clasificacion.saldo.nombre == 'DEUDOR-DEBE') saldoCA += cuenta.debe_bs - cuenta.haber_bs;
                            if ($scope.asiento.clasificacion.saldo.nombre == 'ACREEDOR-HABER') saldoCA += cuenta.haber_bs - cuenta.debe_bs;
                            debeBs += cuenta.debe_bs;
                            haberBs += cuenta.haber_bs;
                            doc.font('Helvetica', 6);
                            doc.rect(x, y, 555, height).stroke();
                            doc.text(cuenta.comprobante.fecha ? $scope.fechaATexto(new Date(cuenta.comprobante.fecha)) : "", 30, y + 8, { width: 40, align: "center" });
                            doc.text(cuenta.prefico_comprobante, 70, y + 8, { width: 40, align: 'center' });
                            if (cuenta.glosa != null && cuenta.glosa.length > 74) {
                                doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 4, { width: 250 });
                            } else {
                                doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 8, { width: 250 });
                            }
                            doc.text(number_format_negativo_to_positvo(cuenta.debe_bs, 2), 365, y + 8, { width: 70, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(cuenta.haber_bs, 2), 435, y + 8, { width: 70, align: 'right' });
                            doc.text(formatearSeparadorMiles(saldoCA, 2), 505, y + 8, { width: 70, align: 'right' });

                            y = y + height;
                            if (y >= 730) {
                                y = y + 10;
                                doc.font('Helvetica', 6);
                                doc.text("Página : " + pagina, 540, 750);
                                doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

                                doc.addPage({ margin: 0, bufferPages: true });
                                y = 110;
                                pagina = pagina + 1;
                                $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                                doc.font('Helvetica-Bold', 8); y += 10;
                                doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                                doc.font('Helvetica', 6);
                            }

                        } else {
                            doc.font('Helvetica-Bold', 7);
                            doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(debeBs, 2), 365, y + 3, { width: 70, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(haberBs, 2), 435, y + 3, { width: 70, align: 'right' });
                            if ($scope.asiento.clasificacion.saldo.nombre == 'DEUDOR-DEBE') saldoCA = cuenta.debe_bs - cuenta.haber_bs;
                            if ($scope.asiento.clasificacion.saldo.nombre == 'ACREEDOR-HABER') saldoCA = cuenta.haber_bs - cuenta.debe_bs;
                            debeBs = cuenta.debe_bs;
                            haberBs = cuenta.haber_bs;
                            doc.font('Helvetica-Bold', 8); y += height;
                            if (y >= 730) {
                                y = y + 10;
                                doc.font('Helvetica', 6);
                                doc.text("Página : " + pagina, 540, 750);
                                doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);
                                doc.addPage({ margin: 0, bufferPages: true });
                                y = 110;
                                pagina = pagina + 1;
                                $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                                doc.font('Helvetica-Bold', 8); y += 10;
                                doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                                doc.font('Helvetica', 6);
                            }
                            doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                            doc.font('Helvetica', 6);
                            doc.rect(x, y, 555, height).stroke();
                            doc.text(cuenta.comprobante.fecha ? $scope.fechaATexto(new Date(cuenta.comprobante.fecha)) : "", 30, y + 8, { width: 40, align: "center" });
                            doc.text(cuenta.prefico_comprobante, 70, y + 8, { width: 40, align: 'center' });
                            if (cuenta.glosa != null && cuenta.glosa.length > 74) {
                                doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 4, { width: 250 });
                            } else {
                                doc.text(cuenta.glosa != null ? cuenta.glosa : "", 115, y + 8, { width: 250 });
                            }
                            doc.text(number_format_negativo_to_positvo(cuenta.debe_bs, 2), 365, y + 8, { width: 70, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(cuenta.haber_bs, 2), 435, y + 8, { width: 70, align: 'right' });
                            doc.text(formatearSeparadorMiles(saldoCA, 2), 505, y + 8, { width: 70, align: 'right' });

                            y = y + height;
                            if (y >= 730) {
                                y = y + 10;
                                doc.font('Helvetica', 6);
                                doc.text("Página : " + pagina, 540, 750);
                                doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

                                doc.addPage({ margin: 0, bufferPages: true });
                                y = 110;
                                pagina = pagina + 1;
                                $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                                doc.font('Helvetica-Bold', 8); y += 10;
                                doc.text(cuenta.cuentaAux.nombre.toUpperCase(), x, y); y += 10;
                                doc.font('Helvetica', 6);
                            }
                        }
                    }
                    if (index == datosDef.length - 1) {
                        doc.font('Helvetica-Bold', 7);
                        doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(debeBs, 2), 365, y + 3, { width: 70, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(haberBs, 2), 435, y + 3, { width: 70, align: 'right' });
                    }


                })
                //////////////////
                if (datosNoDef.length > 0) {
                    var saldoF = 0;
                    datosNoDef.forEach(function (registro, idx, array) {
                        if ($scope.asiento.clasificacion.saldo.nombre == 'DEUDOR-DEBE') saldoF += registro.debe_bs - registro.haber_bs;
                        if ($scope.asiento.clasificacion.saldo.nombre == 'ACREEDOR-HABER') saldoF += registro.haber_bs - registro.debe_bs;
                        registro.prefico_comprobante = $scope.prefijosComprobantes(registro);
                        debeBs += registro.debe_bs;
                        haberBs += registro.haber_bs;
                        if (idx == 0) {
                            doc.font('Helvetica-Bold', 8); y += 10;
                            doc.text('AUXILIAR NO DEFINIDO', x, y); y += 10;
                            doc.font('Helvetica', 6);
                        }
                        doc.font('Helvetica', 6);
                        doc.rect(x, y, 555, height).stroke();
                        doc.text(registro.comprobante.fecha ? $scope.fechaATexto(new Date(registro.comprobante.fecha)) : "", 30, y + 8, { width: 40, align: "center" });
                        doc.text(registro.prefico_comprobante, 70, y + 8, { width: 40, align: 'center' });
                        if (registro.glosa != null && registro.glosa.length > 74) {
                            doc.text(registro.glosa != null ? registro.glosa : "", 115, y + 4, { width: 250 });
                        } else {
                            doc.text(registro.glosa != null ? registro.glosa : "", 115, y + 8, { width: 250 });
                        }
                        doc.text(number_format_negativo_to_positvo(registro.debe_bs, 2), 365, y + 8, { width: 65, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(registro.haber_bs, 2), 435, y + 8, { width: 65, align: 'right' });
                        doc.text(formatearSeparadorMiles(saldoF, 2), 505, y + 8, { width: 70, align: 'right' });

                        y = y + height;
                        if (y > 731) {
                            y = y + 10;
                            doc.font('Helvetica', 6);
                            doc.text("Página : " + pagina, 540, 750);
                            doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                            doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

                            doc.addPage({ margin: 0, bufferPages: true });
                            y = 110;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPdfLibrosMayores(doc, pagina, totalPaginas, $scope.filtroMayores);
                            doc.font('Helvetica-Bold', 8); y += 10;
                            doc.text('AUXILIAR NO DEFINIDO', x, y); y += 10;
                            doc.font('Helvetica', 6);
                        }
                        if (idx == datosNoDef.length - 1) {
                            doc.font('Helvetica-Bold', 7);
                            doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(debeBs, 2), 365, y + 3, { width: 70, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(haberBs, 2), 435, y + 3, { width: 70, align: 'right' });
                        }


                    })
                }
                //////////////////
                doc.font('Helvetica', 7);
                doc.text("Página : " + pagina, 540, 750);
                doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                    SweetAlert.swal({
                        title: 'Finalizado!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                });
                blockUI.stop()
            }


            $scope.dibujarCabeceraPdfLibrosMayores = function (doc, pagina, totalpgn, data) {
                doc.font('Helvetica-Bold', 10);
                doc.text($scope.usuario.empresa.razon_social, 30, 25);
                doc.font('Helvetica-Bold', 8);
                doc.text($scope.usuario.empresa.direccion, 30, 45, { width: 200 });
                doc.text('CASA MATRIZ', 30, 35, { width: 250 });
                var del = $scope.fechaATexto(data.inicio);
                var al = $scope.fechaATexto(data.fin);
                doc.font('Helvetica-Bold', 12);
                doc.text(data.filter.asiento.nombre.toUpperCase(), 0, 60, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                if (data.filter.fechaInicio != 0 && data.filter.fechaFin != 0) {
                    doc.text('Del ' + $scope.fechaATexto(data.filter.fechaInicio) + ' Al ' + $scope.fechaATexto(data.filter.fechaFin), 0, 75, { align: "center" });
                }
                doc.font('Helvetica-Bold', 8);
                // doc.text("Del "+ del+ " Al "+ al, 0, 90, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.rect(30, 85, 555, 25).fillAndStroke("#DADAE3", "black").fillColor('black').stroke();
                doc.font('Helvetica-Bold', 8);
                doc.text("FECHA", 30, 95, { width: 40, align: "center" });
                doc.text("N°", 70, 95, { width: 40, align: "center" });
                doc.text("DESCRIPCIÓN", 110, 95, { width: 255, align: "center" });
                doc.text("DEBE", 365, 95, { width: 70, align: "center" });
                doc.text("HABER", 435, 95, { width: 70, align: "center" });
                doc.text("SALDO", 505, 95, { width: 80, align: "center" });
                doc.font('Helvetica', 8);
            }

            // para redondeo de numeros
            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.ultimoLibroMayor = function () {
                $scope.currentPage = currentPage = $scope.numberOfPages
            }
            $scope.cambiarItemsPorPagina = function (DatosLibroMayor) {
                $scope.pagesLibroMayor = []
                $scope.numberOfPages = Math.ceil(DatosLibroMayor.length / $scope.pageSize);
                for (let index = 0; index < $scope.numberOfPages; index++) {
                    $scope.pagesLibroMayor.push(index)
                }

            }
            $scope.dateRangeLibroMayor = function (items, fromDate, toDate, start) {
                var filtered = [];
                $scope.cambiarItemsPorPagina(items)
                $scope.currentPage = 0
                //here you will have your desired input
                if (angular.isArray(items)) {
                    if (fromDate && toDate) {
                        var from_date = new Date(convertirFecha(fromDate))
                        from_date.setHours(0, 0, 0, 0);
                        var to_date = new Date(convertirFecha(toDate))
                        to_date.setHours(23, 59, 59, 59);
                        var from_date = Date.parse(from_date);
                        var to_date = Date.parse(to_date);
                        angular.forEach(items, function (item) {
                            var date = Date.parse(item.comprobante.fecha);
                            if (date >= from_date && date <= to_date) {
                                filtered.push(item);

                            }
                        });
                        start = +start; //parse to int
                        if (angular.isArray(filtered)) {
                            let datos = filtered.slice(start);
                            $scope.cambiarItemsPorPagina(datos)
                            $scope.currentPage = 0

                        }
                    } else {
                        start = +start; //parse to int
                        if (angular.isArray(items)) {
                            let datos = items.slice(start);
                            $scope.cambiarItemsPorPagina(datos)
                            $scope.currentPage = 0
                        }
                    }
                }
            };
            $scope.obtenerLibroMayorCuenta = function () {
                $scope.paginator.itemsPerPage = 0
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.data = [];

                var promesa = NuevoComprobante(null, null, null, null, null, $scope.paginator)
                promesa.then(function (entidad) {
                    $scope.DatosLibroMayor = entidad.asientos;
                    $scope.paginator.setPages(entidad.paginas);
                    $scope.cambiarItemsPorPagina($scope.DatosLibroMayor)
                    var saldo = 0
                    $scope.DatosLibroMayor.forEach(function (cuenta, index, array) {
                        cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento;
                        cuenta.prefico_comprobante = $scope.prefijosComprobantes(cuenta);
                        if ($scope.paginator.currentPage > 1) {
                            if ($scope.asiento.clasificacion.saldo.nombre == "DEUDOR-DEBE" || $scope.asiento.clasificacion.saldo.nombre == "AMBAS-DEBE Y HABER") {

                                if (index == 0) {
                                    cuenta.saldo_bs = cuenta.debe_bs - cuenta.haber_bs
                                    cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento
                                    $scope.ultimoValorAsiento = cuenta.saldo_bs
                                    saldo = cuenta.saldo_bs
                                } else {
                                    cuenta.saldo_bs = saldo + cuenta.debe_bs - cuenta.haber_bs
                                    //cuenta.saldo_bs =  cuenta.saldo_bs + $scope.ultimoValorAsiento 
                                    $scope.ultimoValorAsiento = cuenta.saldo_bs
                                    saldo = cuenta.saldo_bs
                                }

                            } else if ($scope.asiento.clasificacion.saldo.nombre == "ACREEDOR-HABER") {
                                if (index == 0) {
                                    cuenta.saldo_bs = cuenta.haber_bs - cuenta.debe_bs
                                    cuenta.saldo_bs = cuenta.saldo_bs + $scope.ultimoValorAsiento
                                    $scope.ultimoValorAsiento = cuenta.saldo_bs
                                    saldo = cuenta.saldo_bs
                                } else {
                                    cuenta.saldo_bs = saldo + cuenta.haber_bs - cuenta.debe_bs
                                    //cuenta.saldo_bs =  cuenta.saldo_bs + $scope.ultimoValorAsiento 
                                    $scope.ultimoValorAsiento = cuenta.saldo_bs
                                    saldo = cuenta.saldo_bs
                                }
                            }

                        } else {
                            if ($scope.asiento.clasificacion.saldo.nombre == "DEUDOR-DEBE" || $scope.asiento.clasificacion.saldo.nombre == "AMBAS-DEBE Y HABER") {

                                if (index == 0) {
                                    cuenta.saldo_bs = cuenta.debe_bs - cuenta.haber_bs
                                    saldo = cuenta.saldo_bs
                                } else {
                                    cuenta.saldo_bs = saldo + cuenta.debe_bs - cuenta.haber_bs
                                    saldo = cuenta.saldo_bs
                                }

                            } else if ($scope.asiento.clasificacion.saldo.nombre == "ACREEDOR-HABER") {
                                if (index == 0) {
                                    cuenta.saldo_bs = cuenta.haber_bs - cuenta.debe_bs
                                    saldo = cuenta.saldo_bs
                                } else {
                                    cuenta.saldo_bs = saldo + cuenta.haber_bs - cuenta.debe_bs
                                    saldo = cuenta.saldo_bs
                                }
                            }
                        }
                    })
                    //$scope.ultimoValorAsiento = $scope.DatosLibroMayor[$scope.DatosLibroMayor.length - 1].saldo_bs

                });
            }
            $scope.obtenerGestiones = async function () {
                try {
                    const entidad = ClasesTipo("GTN");
                    return entidad.clases;

                } catch (error) {
                    console.log(error)
                }
            }
            $scope.buscarCuentasParaAsignar = function (query, index) {

                var promesa = ListaCuentasParaAsignar($scope.usuario.id_empresa, query)
                var a = promesa.then(function (dato) {
                    if (dato.length == 1) {
                        $scope.datos.cuenta = dato[0]
                        $scope.error = false
                        return []
                    } else {
                        return promesa
                    }

                })
                return a
            }
            $scope.buscarCuentas = function (query, index) {
                var promesa = NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, null, null, null, query)
                var a = promesa.then(function (dato) {
                    if (dato.length == 1) {

                        $scope.nuevoComprobante.asientosContables[index].cuenta = dato[0]
                        $scope.establecerCuentaActual($scope.nuevoComprobante.asientosContables[index], index)
                        $scope.establecerCuentaActual2($scope.nuevoComprobante.asientosContables[index], index)
                        if ($scope.nuevoComprobante.asientosContables[index].cuenta.tipoAuxiliar) {
                            var id = index + "-CA"
                            $scope.enfocar(id)
                        } else {
                            var id = index + "-CC"
                            $scope.enfocar(id)

                        }
                        return []
                    } else {
                        return promesa
                    }

                })
                return a
            }
            $scope.eliminarDatosQr = function (dato) {
                $scope.DatosCodigoQr[dato].eliminado = true;
            }

            $scope.DatosCodigoQr = [];
            $scope.cont2 = 1
            $scope.disparo = true;
            $scope.verificarFechaQr = function (DatoQr, index) {
                var data = new Date();
                var data2 = new Date($scope.convertirFecha(DatoQr.fecha))
                var valido = ""
                if (data.getTime() < data2.getTime()) {
                    valido = true
                } else {
                    valido = false
                }
                $scope.DatosCodigoQr[index].valido = valido;
            }

            $scope.eliminarAsiento = function (asiento, index) {
                if (asiento.id) {
                    $scope.asientosEliminados += 1;
                    asiento.eliminado = true
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                } else {
                    $scope.nuevoComprobante.asientosContables.splice(index, 1)
                    $scope.cal($scope.nuevoComprobante.asientosContables)
                }

            }
            $scope.abrirCuentasAxiliares = function (asiento) {
                asiento.activo = true
                if (asiento.cuenta.tipoAuxiliar.nombre == "CLIENTE") {
                    $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresClientes;
                }
                if (asiento.cuenta.tipoAuxiliar.nombre == "EMPLEADO") {
                    $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresEmpleado;
                }
                if (asiento.cuenta.tipoAuxiliar.nombre == "PROVEEDOR") {
                    $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresProveedor;
                }
                setTimeout(() => {
                    $('#form-field-icon-1').focus()
                }, 400)

            }

            $scope.establecerCuentaActual2 = function (asiento, index) {
                $scope.asientoActualFocus = asiento
                $scope.indexCuentaAsientoActual = index
                var cuenta = asiento.cuenta
                var debe = 0, haber = 0;
                $scope.cuentaActual = { id: cuenta.id, nombre: cuenta.nombre, debe: cuenta.debe, haber: cuenta.haber, saldo: cuenta.saldo };
                setTimeout(() => {
                    $('#form-field-icon-1').focus()
                }, 400)

            }
            $scope.inputDebebs = function (asiento) {
                asiento.debe_bs = (asiento.debe_bs == 0) ? "" : asiento.debe_bs
            }
            $scope.inputDebeSus = function (asiento) {
                asiento.debe_sus = (asiento.debe_sus == 0) ? "" : asiento.debe_sus
            }
            $scope.inputhaberbs2 = function (asiento) {
                asiento.haber_bs = (asiento.haber_bs == 0) ? "" : asiento.haber_bs
            }
            $scope.inputHaberSus = function (asiento) {
                asiento.haber_sus = (asiento.haber_sus == 0) ? "" : asiento.haber_sus
            }
            $scope.obtenerListarCuentasAuxiliares = async function (tipo) {
                try {
                    let datos = await ListasCuentasAuxiliares($scope.usuario.id_empresa, tipo)
                    let listaCuentasAuxiliares = datos;
                    if (datos.length > 0) {
                        if (datos[0].es_empleado) {
                            for (const cuentaAux of listaCuentasAuxiliares) {
                                cuentaAux.razon_social = cuentaAux.persona.nombre_completo
                            }
                        }
                    }
                    return listaCuentasAuxiliares
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.establecerCuentaActual = function (asiento, index) {
                quitarScrollInputNumber()
                $scope.indexCuentaAsientoActual = index
                if (asiento.cuenta.libro_de_compra) {
                    if (asiento.lc_comp_compra) {
                        asiento.lc_comp_compra.elimiado = true
                        $scope.abrirModalEdicionLCComprobante(asiento, index)
                    } else {
                        $scope.abrirModalLibroCompraComprobante(asiento, index)
                    }

                } else if (asiento.lc_comp_compra) {
                    asiento.lc_comp_compra.eliminado = true
                }
                /* var cuenta = asiento.cuenta
                var debe = 0, haber = 0;
                $scope.cuentaActual = { id: cuenta.id, nombre: cuenta.nombre, debe: cuenta.debe, haber: cuenta.haber, saldo: cuenta.saldo }; */
                if (asiento.cuenta.id) {
                    $scope.nuevoComprobante.asientosContables[index].debe_bs = $scope.nuevoComprobante.asientosContables[index].debe_bs ? $scope.nuevoComprobante.asientosContables[index].debe_bs : 0
                    $scope.nuevoComprobante.asientosContables[index].haber_bs = $scope.nuevoComprobante.asientosContables[index].haber_bs ? $scope.nuevoComprobante.asientosContables[index].haber_bs : 0
                    $scope.nuevoComprobante.asientosContables[index].debe_sus = $scope.nuevoComprobante.asientosContables[index].debe_sus ? $scope.nuevoComprobante.asientosContables[index].debe_sus : 0
                    $scope.nuevoComprobante.asientosContables[index].haber_sus = $scope.nuevoComprobante.asientosContables[index].haber_sus ? $scope.nuevoComprobante.asientosContables[index].haber_sus : 0
                    $scope.listaCuentasAuxiliares = {}
                    if (asiento.cuenta.tipoAuxiliar) {
                        $scope.nuevoComprobante.asientosContables[index].isOpen = true
                        if (asiento.cuenta.tipoAuxiliar.nombre == "CLIENTE") {
                            $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresClientes;
                        }
                        if (asiento.cuenta.tipoAuxiliar.nombre == "EMPLEADO") {
                            $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresEmpleado;
                        }
                        if (asiento.cuenta.tipoAuxiliar.nombre == "PROVEEDOR") {
                            $scope.listaCuentasAuxiliares = $scope.listaCuentasAuxiliaresProveedor;
                        }

                    } else {
                        $scope.nuevoComprobante.asientosContables[index].isOpen = false;
                        asiento.cuentaAux = undefined
                    }
                    if ($scope.nuevoComprobante.copia_glosa) {
                        $scope.nuevoComprobante.asientosContables[index].glosa = $scope.nuevoComprobante.gloza
                    }
                } else {
                    $scope.nuevoComprobante.asientosContables[index].isOpen = false;
                }
                $scope.agregarAsiento(asiento)
            }
            $scope.selecionarCuentaAxiliar = function (asiento) {
                // console.log(asiento)
                asiento.isOpen = false;
            }
            $scope.agregarDatosQr = function (evento, Dato) {
                if (evento.which === 13) {
                    $scope.cont2++;
                    datos = Dato;//$scope.cont2+"|999999999|9999999999999|17/10/2017|90|90|43|19999|0|0|0|0"
                    var DatosCodigoQr = datos.split(' ');
                    var data = new Date();
                    var data2 = new Date($scope.convertirFecha(DatosCodigoQr[3]))
                    var valido = ""
                    if (data.getTime() < data2.getTime()) {
                        valido = true
                    } else {
                        valido = false
                    }
                    var DatosRecopiladosCodigoQr = { nit: DatosCodigoQr[0], id_usuario: $scope.usuario.id, id_tipo_pago: null, tipoPago: null, detallesCompra: [], descuento_general: false, factura: DatosCodigoQr[1], autorizacion: DatosCodigoQr[2], fecha: DatosCodigoQr[3], total: DatosCodigoQr[4], total2: DatosCodigoQr[5], codigo_control: DatosCodigoQr[6], cliente_nit: DatosCodigoQr[7], ice: DatosCodigoQr[8], numero_grav: 0, sujeto_cf: 0, tipo_recargo: false, descuento: 0, recargo: 0, ice: 0, excento: 0, eliminado: false, valido: valido, lector: true }
                    $scope.DatosCodigoQr.push(DatosRecopiladosCodigoQr)
                    // console.log($scope.DatosCodigoQr)
                    var DatosRecopiladosCodigoQr = null;
                    Dato = "";
                }
            }

            $scope.agregarAsientoANuevoComprobante = function (datos) {
                datos.asientosContables.forEach(function name(asiento, index, array) {
                    $scope.nuevoComprobante.asientosContables.push(asiento)
                    if (index === (array.length - 1)) {
                        $scope.cal($scope.nuevoComprobante.asientosContables)
                    }
                });
                $scope.nuevoComprobante.tipoComprobante = datos.tipoComprobante
                $scope.mostrarMensaje("datos copiados correctamente")
            }
            $scope.agregarAsiento = function (asiento) {
                if ($scope.nuevoComprobante.asientosContables.length == 0) {
                    var asiento = { idAsignado: null, idPadre: null, glosa: "", cuenta: "", debe_bs: "", haber_bs: "", debe_sus: "", haber_sus: "", eliminado: false, activo: true, isOpen: false }
                    asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                    $scope.nuevoComprobante.asientosContables.push(asiento)
                } else {
                    if ($scope.nuevoComprobante.asientosContables[($scope.nuevoComprobante.asientosContables.length - 1)].cuenta && $scope.nuevoComprobante.asientosContables[($scope.nuevoComprobante.asientosContables.length - 1)].cuenta.id != undefined) {
                        var asiento = { idAsignado: null, idPadre: null, glosa: "", cuenta: "", debe_bs: "", haber_bs: "", debe_sus: "", haber_sus: "", eliminado: false, activo: true, isOpen: false }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)
                    }
                }

            }
            $scope.agregarPrimerAsiento = function (comprobante) {
                if (comprobante.gloza) {
                    if (comprobante.asientosContables.length == 0) {
                        var asiento = { idAsignado: null, idPadre: null, glosa: "", cuenta: "", debe_bs: "", haber_bs: "", debe_sus: "", haber_sus: "", eliminado: false, activo: true, isOpen: false }
                        asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                        $scope.nuevoComprobante.asientosContables.push(asiento)

                    }
                } else {
                    if (comprobante.asientosContables.length == 1) {
                        $scope.nuevoComprobante.asientosContables.splice(0)

                    }
                }
                $scope.indexCuentaAsientoActual = 0
            }
            $scope.ultimaFechaTipoComprobanteInicioNuevo = async function () {
                let data = await UltimaFechaTipoComprobante($scope.usuario.id_empresa, $scope.nuevoComprobante.tipoComprobante.id)
                if (data.comprobante) {
                    return $scope.fechaATexto(new Date(data.comprobante.fecha))
                } else {
                    return $scope.fechaATexto(new Date())
                }
            }
            $scope.ultimaFechaTipoComprobante = function (comprobante) {
                var promesa = UltimaFechaTipoComprobante($scope.usuario.id_empresa, comprobante.tipoComprobante.id)
                promesa.then(function (data) {
                    var fecha = $scope.fechaATexto(new Date(data.comprobante.fecha))
                    comprobante.fecha = fecha
                    $scope.obtenerCambioMoneda2(comprobante.fecha)
                    $scope.verigicarRegistroAntiguo()
                })
            }
            $scope.agregarNuevoAsiento = function (asiento, index) {
                if (asiento.glosa) {
                    if (asiento.glosa.length == 1) {
                        if ($scope.nuevoComprobante.asientosContables[index + 1]) {

                        } else {
                            var asiento = { idAsignado: null, idPadre: null, glosa: "", cuenta: "", debe_bs: "", haber_bs: "", debe_sus: "", haber_sus: "", eliminado: false, activo: true, isOpen: false }
                            asiento.idAsignado = $scope.nuevoComprobante.asientosContables.length
                            $scope.nuevoComprobante.asientosContables.push(asiento)
                            // console.log(comprobante.asientosContables)
                        }
                    }
                } else {
                    if ($scope.nuevoComprobante.asientosContables[index + 1].cuenta) {

                    } else {
                        $scope.nuevoComprobante.asientosContables.splice(index + 1)
                        // console.log(comprobante.asientosContables)
                    }

                }

            }

            $scope.agregarNuevoItem = function () {
                var DatosRecopiladosCodigoQr = { nit: "", factura: "", autorizacion: "", fecha: "", total: "", total2: "", codigo_control: "", cliente: "", ice: "", numero_grav: "", sujeto_cf: "", desc: "", eliminado: false, valido: null, lector: false }
                $scope.DatosCodigoQr.push(DatosRecopiladosCodigoQr)

            }
            //fin modal comprobante nuevo
            $scope.ocultarFormularioInicioSesion = function () {
                $scope.cerrarPopup($scope.idModalInicioSesion);
            }

            $scope.buscarAplicacion = function (aplicaciones, url) {
                var aplicaciones = $.grep(aplicaciones, function (e) { return e.aplicacion.url == url; });
                $scope.aplicacion = aplicaciones[0];
            }
            $scope.buscarOpcionesAplicacion = function (aplicaciones, url) {
                var aplicaciones = $.grep(aplicaciones, function (e) { return e.aplicacion.url == url; });
                // $scope.aplicacion = aplicaciones[0];
                var promesa = ObtenerOpcionesAplicacionUsuario($scope.aplicacion.id)
                promesa.then(function (data) {
                    $scope.opcionesAplicacion = {}
                    if ($scope.aplicacion.aplicacion.titulo == 'RRHH') {
                        data.opciones = data.opciones.map((opcion) => {
                            opcion.puede_ver = true;
                            opcion.puede_crear = true;
                            opcion.puede_modificar = true;
                            return opcion
                        })
                        $scope.opcionesAplicacion.RRHH_OPCION_FP = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_FP })
                        $scope.opcionesAplicacion.RRHH_OPCION_PREREQUISITO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_PREREQUISITO })
                        $scope.opcionesAplicacion.RRHH_OPCION_DATOS_EMPLEADO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_DATOS_EMPLEADO })
                        $scope.opcionesAplicacion.RRHH_OPCION_FINIQUITO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_FINIQUITO })
                        $scope.opcionesAplicacion.RRHH_OPCION_ANTICIPO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_ANTICIPO })
                        $scope.opcionesAplicacion.RRHH_OPCION_PRESTAMO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_PRESTAMO })
                        $scope.opcionesAplicacion.RRHH_OPCION_AUSENCIA_VACACION = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_AUSENCIA_VACACION })
                        $scope.opcionesAplicacion.RRHH_OPCION_ROL_TURNO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_ROL_TURNO })
                        $scope.opcionesAplicacion.RRHH_OPCION_HORAS_EXTRA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_HORAS_EXTRA })
                        $scope.opcionesAplicacion.RRHH_OPCION_HOJA_VIDA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_HOJA_VIDA })
                        $scope.opcionesAplicacion.RRHH_OPCION_ROPA_TRABAJO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_ROPA_TRABAJO })
                        $scope.opcionesAplicacion.RRHH_OPCION_HISTORIAL_FICHAS = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_HISTORIAL_FICHAS })
                        $scope.opcionesAplicacion.RRHH_OPCION_SUBSIDIO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_SUBSIDIO })
                        $scope.opcionesAplicacion.RRHH_OPCION_LLAMADA_ATENCION = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.RRHH_OPCION_LLAMADA_ATENCION })
                    }
                    if ($scope.aplicacion.aplicacion.titulo == 'CAJA CHICA') {
                        $scope.opcionesAplicacion.CC_OPCION_CIERRE_CAJA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.CC_OPCION_CIERRE_CAJA })
                        $scope.opcionesAplicacion.CC_OPCION_FONDO_A_RENDIR = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.CC_OPCION_FONDO_A_RENDIR })
                    }
                    if ($scope.aplicacion.aplicacion.titulo == 'SALIDAS') {
                        $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_FACTURACION })
                        $scope.opcionesAplicacion.VENTA_OPCION_BAJA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_BAJA })
                        $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_PROFORMA })
                        $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO })
                        $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_AJUSTE })
                        $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_SERVICIO })
                        $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO_ALMACEN })
                    }
                })
            }
            $scope.recargarItemsTabla = function () {
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            }

            $scope.recargarCache = function () {
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
            }

            $scope.cargarMailer = function () {
                console.log("Mailer cargado.")
            }

            $scope.cargarPagina = function () {
                let online = $window.navigator.onLine;
                if (!$scope.usuario.alertas) {
                    $scope.usuario.alertas = {}
                }
                var verificarToken = VerificarAutentificacionUsuarios()
                verificarToken.then(function (res) {
                    if (res.autorizado) {
                        if ($scope.usuario.id_empresa) {
                            SincronizacionesDiariasIndexDb($scope.fechaATexto, $scope.usuario.id_empresa);
                        }
                        $scope.generarMenus($scope.usuario);
                        $scope.vencimientoTotal = 0;
                        if ($scope.usuario.empresa && online) {
                            $scope.obtenerNumeroAlertas()
                            $scope.obtenerTiposDePago()
                            $scope.verificarActivosFijos()
                            $scope.actualizarVencimientoDosificaciones()
                            $scope.obtenerCentroCostos();
                            $scope.obtenerMovimientoEgresoBaja();
                            $scope.obtenerEstadosPagoDespachos()
                            $scope.obtenerTiposComprobante();
                            $scope.obtenerTipoCuentaProveedor()
                            $scope.reiniciarCorrelativoComprobantes()
                            if (screen.width > 960) {
                                $('.modal-rh-nuevo').addClass('modal-dialog');
                            } else {
                                $('.modal-rh-nuevo').removeClass('modal-dialog');
                            }
                            $scope.verificarNotificaciones()

                        }
                        $scope.ocultarFormularioInicioSesion();
                    } else {
                        $scope.cerrarSesion()
                    }
                })

            }

            $scope.PopoverSubMenus = {
                templateUrl: 'PopoverSubMenus.html',
                title: 'Sub Menus',
                isOpen: false
            };

            $scope.actualizarVencimientoDosificaciones = function () {
                var prom = VencimientoDosificaciones($scope.usuario.id_empresa)
                prom.then(function (res) {
                    if (res.stack) {
                        $scope.mostrarMensaje(res.stack)
                    }
                })
            }

            // $scope.verificarAlertasProformas = function (idEmpresa) {
            //     $scope.alertasProformas = []
            //     if ($scope.filtroAlertasProformas === undefined) {
            //         $scope.filtroAlertasProformas = { mes: "", anio: "", razon_social: "", proforma: "", col: "correlativo", dir: "asc" }
            //     }
            //     $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true)
            //     var prom = alertasProformasLista(idEmpresa, $scope.filtroAlertasProformas)
            //     $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true, true)
            //     prom.then(function (proformas) {
            //         if (!proformas.hasErr) {
            //             $scope.alertasProformas = proformas.proformas
            //             $scope.vencimientoTotal += $scope.alertasProformas.length
            //         }
            //     }).catch(function (err) {
            //         $scope.mostrarMensaje(err.data !== undefined ? err.data : err.data)
            //     })

            // }

            $scope.verificarAlertasProformas = function (idEmpresa) {
                $scope.alertasProformas = []
                if ($scope.filtroAlertasProformas === undefined) {
                    // var anioActual = new Date().getFullYear();
                    // var mesActual = new Date().getMonth() + 1;
                    $scope.filtroAlertasProformas = { mes: "", anio: "", razon_social: "", proforma: "", col: "correlativo", dir: "asc" }
                }
                $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true)
                var prom = alertasProformasCantidad(idEmpresa)
                $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true, true)
                prom.then(function (proformas) {
                    if (!proformas.hasErr) {
                        $scope.alertasProformasCantidad = proformas.cantidad_proformas
                        $scope.vencimientoTotal += $scope.alertasProformasCantidad
                    }
                }).catch(function (err) {
                    $scope.mostrarMensaje(err.data !== undefined ? err.data : err.data)
                })
            }

            $scope.verificarNotificaciones = function () {
                /* $scope.verificarNotifiacion = $interval(function () { */
                $scope.vencimientoTotal = 0
                if ($scope.usuario.empresa) {
                    if ($scope.usuario.empresa.usar_vencimientos) {
                        if ($scope.usuario.alertas.usar_vencimiento_producto) {
                            $scope.verificarVencimientosProductos($scope.usuario.id_empresa);
                        }
                        if ($scope.usuario.alertas.usar_vencimiento_credito) {
                            $scope.verificarVencimientosCreditosAlertasGet($scope.usuario.id_empresa);
                        }
                        if ($scope.usuario.alertas.usar_vencimiento_deuda) {
                            $scope.verificarVencimientosDeudasAlertasGet($scope.usuario.id_empresa);
                        }

                    }
                    if ($scope.usuario.alertas.usar_pedido) {
                        $scope.GetAlertasDespachos($scope.usuario.id_empresa);
                    }
                    if ($scope.usuario.empresa.usar_contabilidad) {
                        if ($scope.usuario.alertas.usar_venta) {
                            $scope.verificarVentasAlertas($scope.usuario.id_empresa);
                        }
                        if ($scope.usuario.alertas.usar_compra) {
                            $scope.verificarComprasComprobantesCantidad($scope.usuario.id_empresa)
                        }
                    }
                    if ($scope.usuario.encargado_verificacion_caja_chica) {
                        if ($scope.usuario.alertas.usar_verificacion_caja_chica) {
                            $scope.verificarAlertasCajaChica()
                        }

                    }
                    if ($scope.usuario.empresa.usar_proformas) {
                        if ($scope.usuario.alertas.usar_proforma) {
                            $scope.verificarAlertasProformas($scope.usuario.id_empresa)
                        }
                    }
                    /* $scope.verificarNotificaciones() */
                }

                /* 	console.log("cargando notificaciones")
                }, 100000); */
            }
            $scope.pararverificarNotificaciones = function () {
                $interval.cancel($scope.verificarNotifiacion);
            }
            $scope.iniciarSesion = function (usuario) {
                blockUI.start();
                /*var captchResponse = $('#g-recaptcha-response').val();
                if(captchResponse.length == 0 ){
                    $scope.error='Utiliza el Captcha del sitio!';
                    blockUI.stop();
                }else{*/
                Sesion.iniciarSesion(usuario, function (res) {
                    if (res.type == false) {
                        $scope.error = res.data;
                        if (res.mensaje !== undefined) {
                            $scope.mostrarMensaje(res.mensaje)
                        }
                    } else {
                        $scope.usuario = res.data;
                        if (!$scope.usuario.alertas) {
                            $scope.usuario.alertas = {}
                        }
                        $localStorage.token = res.data.token;
                        $scope.token = $localStorage.token;
                        if (res.data.id_empresa) {
                            var promesa = UsuarioSucursalesAutenticacion(res.data.id);
                            promesa.then(function (usuarioSucursales) {
                                promesa = EmpresaDatosInicio(res.data.id_empresa);
                                promesa.then(function (empresa) {
                                    res.data.empresa = empresa[0];
                                    res.data.sucursalesUsuario = usuarioSucursales;
                                    if( res.data.empresa.usar_facturacion_electronica ){
                                        res.data.sucursalFacturacion = $scope.obtenerSucursalFacturacion( usuarioSucursales )
                                    }
                                    $localStorage.usuario = JSON.stringify(res.data);
                                    $scope.cargarPagina();
                                });
                            });
                        } else {
                            $localStorage.usuario = JSON.stringify(res.data);
                            $scope.cargarPagina();
                        }
                        document.title = 'AGIL - ' + $scope.usuario.nombre_usuario;
                    }
                    blockUI.stop();
                }, function (data, status, headers, config) {
                    // $localStorage.usuario = JSON.stringify({});
                    // $localStorage.token = ''
                });
            };

            $scope.generarMenus = function (usuario) {
                $scope.aplicaciones = [];

                for (var i = 0; i < usuario.rolesUsuario.length; i++) {
                    for (var j = 0; j < usuario.rolesUsuario[i].rol.aplicacionesRol.length; j++) {
                        usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion.url = usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion.url.replace("?", usuario.persona.id + "");
                        if (usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion.id_padre == null) {
                            var app = usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion;
                            app.subaplicaciones = [];
                            var bandera = false
                            if (usuario.empresa) {
                                if (usuario.empresa.aplicacionesEmpresa.length > 0) {
                                    for (var d = 0; d < usuario.empresa.aplicacionesEmpresa.length; d++) {
                                        var element = usuario.empresa.aplicacionesEmpresa[d];
                                        if (element) {
                                            if (element.id_aplicacion == app.id) {
                                                bandera = true
                                                d = usuario.empresa.aplicacionesEmpresa.length
                                            }
                                        }

                                    }
                                    if (bandera) {
                                        for (var k = 0; k < usuario.aplicacionesUsuario.length; k++) {
                                            var element = usuario.aplicacionesUsuario[k];
                                            if (element.aplicacion.titulo == app.titulo)
                                                if (element.puede_ver) {
                                                    $scope.aplicaciones.push(app);
                                                }

                                        }
                                    }
                                } else {
                                    for (var k = 0; k < usuario.aplicacionesUsuario.length; k++) {
                                        var element = usuario.aplicacionesUsuario[k];
                                        if (element.aplicacion.titulo == app.titulo)
                                            if (element.puede_ver) {
                                                $scope.aplicaciones.push(app);
                                            }

                                    }
                                }
                            } else {
                                $scope.aplicaciones.push(app);
                            }
                        }
                    }
                }

                for (var i = 0; i < usuario.rolesUsuario.length; i++) {
                    for (var j = 0; j < usuario.rolesUsuario[i].rol.aplicacionesRol.length; j++) {
                        for (var z = 0; z < $scope.aplicaciones.length; z++) {
                            if (usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion.id_padre == $scope.aplicaciones[z].id) {
                                var app2 = usuario.rolesUsuario[i].rol.aplicacionesRol[j].aplicacion;

                                var bandera = false
                                if (usuario.empresa) {
                                    if (usuario.empresa.aplicacionesEmpresa.length > 0) {
                                        for (var d = 0; d < usuario.empresa.aplicacionesEmpresa.length; d++) {
                                            var element = usuario.empresa.aplicacionesEmpresa[d];
                                            if (element) {
                                                if (element.id_aplicacion == app2.id) {
                                                    bandera = true
                                                    d = usuario.empresa.aplicacionesEmpresa.length
                                                }
                                            }
                                        }
                                        if (bandera) {
                                            for (var k = 0; k < usuario.aplicacionesUsuario.length; k++) {
                                                var element = usuario.aplicacionesUsuario[k];
                                                if (element.aplicacion.titulo == app2.titulo)
                                                    if (element.puede_ver) {
                                                        $scope.aplicaciones[z].subaplicaciones.push(app2);
                                                    }

                                            }
                                        }
                                    } else {
                                        for (var k = 0; k < usuario.aplicacionesUsuario.length; k++) {
                                            var element = usuario.aplicacionesUsuario[k];
                                            if (element.aplicacion.titulo == app2.titulo){
                                                if (element.puede_ver) {
                                                    $scope.aplicaciones[z].subaplicaciones.push(app2);
                                                }
                                            }

                                        }
                                    }
                                } else {
                                    $scope.aplicaciones[z].subaplicaciones.push(app2);
                                }
                            }
                        }
                    }
                }
            }


            $scope.OcultarMenu = function () {

                if ($scope.ocultarMenu == true) {
                    $scope.ocultarMenu = false;
                } else {
                    $scope.ocultarMenu = true;
                }
            }

            $scope.abrirm = function () {
                $('#modal-wizard-comprobante-edicion').modal('show');
            }

            $scope.ValidarForm = function (form, steps, button) {
                ValidarForm(form, steps, button)
            }

            /*  $scope.verificarComprasComprobantes = function (idEmpresa) {
                 var promesa = ComprasComprobantesEmpresa(idEmpresa);
                 promesa.then(function (dato) {
                     $scope.comprasComprobantes = dato.compras;
                    //$scope.vencimientoTotal = $scope.vencimientoTotal + $scope.comprasComprobantes.length;
                 });
             } */
            $scope.verificarComprasComprobantes = function () {
                $scope.alertCompraPaginator = Paginator()
                $scope.alertCompraPaginator.column = "id";
                $scope.alertCompraPaginator.direction = "asc";
                $scope.alertCompraPaginator.itemsPerPage = '10';
                var date = new Date();
                var primerDia = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                $scope.alertCompraPaginator.filtro = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: $scope.fechaATexto(primerDia),
                    fin: $scope.fechaATexto(ultimoDia),
                    tipo: true,
                    search: ""
                }
                $scope.alertCompraPaginator.callBack = $scope.obtenerComprasComprobante
                $scope.alertCompraPaginator.getSearch("", $scope.alertCompraPaginator.filtro, null);
            }
            $scope.obtenerComprasComprobante = function () {
                if ($scope.alertCompraPaginator.filter.inicio != 0 && $scope.alertCompraPaginator.filter.fin != 0) {
                    $scope.alertCompraPaginator.filter.inicio = new Date($scope.convertirFecha($scope.alertCompraPaginator.filtro.inicio))
                    $scope.alertCompraPaginator.filter.fin = new Date($scope.convertirFecha($scope.alertCompraPaginator.filtro.fin))
                }
                var promesa = ComprasComprobantesEmpresa($scope.alertCompraPaginator);
                promesa.then(function (dato) {
                    $scope.comprasComprobantes = dato.compras;
                    for (const compra of $scope.comprasComprobantes) {
                        for (const cuenta of compra.proveedor.proveedorCuentas) {
                            if (cuenta.tipo.nombre_corto === "DEBE") {
                                compra.proveedor.proveedorCuentaDebe = cuenta
                            } else if (cuenta.tipo.nombre_corto === "HABER") {
                                compra.proveedor.proveedorCuentaHaber = cuenta
                            }


                        }
                    }
                    $scope.alertCompraPaginator.setPages(dato.paginas);
                });
            }
            $scope.obtenerTipoCuentaProveedor = function () {
                blockUI.start();
                if ($scope.usuario.id_empresa) {
                    var promesa = ClasesTipoEmpresa("TCPROVE", $scope.usuario.id_empresa);
                    promesa.then(function (entidad) {
                        $scope.tiposCuentaProveedor = entidad.clases
                        blockUI.stop();
                    });
                } else {
                    blockUI.stop();
                }
            }
            $scope.verificarComprasComprobantesCantidad = function (idEmpresa) {
                var promesa = alertasComprasCantidad(idEmpresa);
                promesa.then(function (dato) {
                    $scope.comprasCantidadAlertas = dato.compras_cantidad;
                    $scope.vencimientoTotal = $scope.vencimientoTotal + $scope.comprasCantidadAlertas;
                });
            }
            /* 
                        $scope.verificarVentasComprobantes = function (idEmpresa) {
                            var promesa = VentasComprobantesEmpresa(idEmpresa);
                            promesa.then(function (dato) {
                                $scope.ventasComprobantes = dato.ventas;
                                $scope.vencimientoTotal = $scope.vencimientoTotal + $scope.ventasComprobantes.length;
                                // console.log(dato.ventas)
                            });
                        } */
            $scope.verificarVentasComprobantes = function () {
                $scope.alertVentasPaginator = Paginator()
                $scope.alertVentasPaginator.column = "id";
                $scope.alertVentasPaginator.direction = "asc";
                $scope.alertVentasPaginator.filtro = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: "",
                    fin: "",
                    search: ""
                }
                $scope.alertVentasPaginator.callBack = $scope.obtenerVentasComprobante
                $scope.alertVentasPaginator.getSearch("", $scope.alertVentasPaginator.filtro, null);
            }
            $scope.obtenerVentasComprobante = function () {
                if ($scope.alertVentasPaginator.filter.inicio != 0 && $scope.alertVentasPaginator.filter.fin != 0) {
                    $scope.alertVentasPaginator.filter.inicio = new Date($scope.convertirFecha($scope.alertVentasPaginator.filter.inicio))
                    $scope.alertVentasPaginator.filter.fin = new Date($scope.convertirFecha($scope.alertVentasPaginator.filter.fin))
                }
                var promesa = VentasComprobantesEmpresa($scope.alertVentasPaginator);
                promesa.then(function (dato) {
                    $scope.ventasComprobantes = dato.ventas;
                    $scope.alertVentasPaginator.setPages(dato.paginas);
                });
            }

            $scope.verificarVentasAlertas = function (idEmpresa) {
                var promesa = alertasVentasCantidad(idEmpresa);
                promesa.then(function (dato) {
                    $scope.ventasCantidadAlertas = dato.cantidad_ventas;
                    $scope.vencimientoTotal = $scope.vencimientoTotal + $scope.ventasCantidadAlertas;
                    // console.log(dato.ventas)
                });
            }

            $scope.verificarVencimientosProductos = function (idEmpresa) {
                //blockUI.start();
                var promesa = VencimientosProductosEmpresa(idEmpresa);
                promesa.then(function (vencimientosProductos) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal + vencimientosProductos.length;
                    $scope.vencimientosProductos = vencimientosProductos;
                    //blockUI.stop();
                });
            }
            $scope.verificarAlertasCajaChica = function (filtro2) {
                //blockUI.start();
                if (filtro2) {
                    var filtro = filtro2
                } else {
                    var filtro = { id_empresa: $scope.usuario.id_empresa, historico: false, mes: "", anio: "" }
                }
                var promesa = alertasCajaChicaCantidad(filtro, $scope.usuario.id);
                promesa.then(function (dato) {

                    $scope.cantidadAlertasCajaChica = dato.cantidad_cajachica;
                    $scope.vencimientoTotal = $scope.vencimientoTotal + $scope.cantidadAlertasCajaChica;
                    //blockUI.stop();
                });
            }

            $scope.verificarVencimientosCreditos = function (idEmpresa) {
                //blockUI.start();
                var promesa = VencimientosCreditosEmpresa(idEmpresa);
                promesa.then(function (vencimientosCreditos) {

                    for (var i = 0; i < vencimientosCreditos.length; i++) {
                        var fecha = new Date(vencimientosCreditos[i].fecha);
                        vencimientosCreditos[i].fecha_vencimiento = $scope.sumaFecha(vencimientosCreditos[i].dias_credito, fecha);
                        for (var j = 0; j < vencimientosCreditos[i].ventaReprogramacionPagos.length; j++) {
                            if (vencimientosCreditos[i].ventaReprogramacionPagos[j].activo) {
                                vencimientosCreditos[i].fecha_anterior = vencimientosCreditos[i].ventaReprogramacionPagos[j].fecha_anterior
                            }
                        }

                    }
                    $scope.vencimientoTotal = $scope.vencimientoTotal + vencimientosCreditos.length;
                    $scope.vencimientosCreditos = vencimientosCreditos;
                    //blockUI.stop();
                });
            }

            $scope.verificarVencimientosCreditosAlertasGet = function (idEmpresa) {
                //blockUI.start();
                var promesa = alertasCreditosVentaCantidad(idEmpresa);
                promesa.then(function (vencimientosCreditos) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal + vencimientosCreditos.cantidad_creditos;
                    $scope.vencimientosCreditosAlertas = vencimientosCreditos.cantidad_creditos;
                    //blockUI.stop();
                });
            }

            $scope.verificarVencimientosDeudasAlertasGet = function (idEmpresa) {
                //blockUI.start();
                var promesa = alertasVencimientosDeudasCantidad(idEmpresa);
                promesa.then(function (vencimientosDeudas) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal + vencimientosDeudas.cantidad_deudas;
                    $scope.vencimientosDeudasAlertas = vencimientosDeudas.cantidad_deudas;
                    //blockUI.stop();
                });
            }

            $scope.abrirListaVencimientoDeudas = function () {
                $scope.abrirPopup($scope.idModalTablaVencimientoDeudas);
                var fechaHast = new Date();
                var fechaDesd = new Date().setDate(new Date().getDate() - 10);
                $scope.filtro = { desde: $scope.fechaATexto(fechaDesd), hasta: $scope.fechaATexto(fechaHast) };
                $scope.verificarVencimientosDeudas($scope.usuario.id_empresa, $scope.filtro);
            }

            $scope.cerrarListaVencimientoDeudas = function () {
                $scope.cerrarPopup($scope.idModalTablaVencimientoDeudas);
            }

            $scope.verificarVencimientosDeudas = function (idEmpresa, filtro) {
                $scope.filtroCopiado = angular.copy(filtro)
                if ($scope.filtroCopiado) {
                    if ($scope.filtroCopiado.desde && $scope.filtroCopiado.hasta) {
                        $scope.filtroCopiado.desde = $scope.convertirFecha($scope.filtroCopiado.desde)
                        $scope.filtroCopiado.hasta = $scope.convertirFecha($scope.filtroCopiado.hasta)
                    }
                }
                var promesa = VencimientosDeudasEmpresa(idEmpresa, $scope.filtroCopiado);
                promesa.then(function (vencimientosDeudas) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal + vencimientosDeudas.length;
                    $scope.vencimientosDeudas = vencimientosDeudas;
                });
            }
            $scope.buscarfiltradoVencimDeudas = function (filtro) {
                $scope.ProgPagoSeleccionados = [];
                $scope.verificarVencimientosDeudas($scope.usuario.id_empresa, filtro);
            }

            $scope.ConfirmProgramarPago = function (datos) {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Programar el Pago de " + datos.proveedor.razon_social + ", N° Fact: " + datos.factura + "!!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompra(datos);
                    }
                });
            }

            $scope.programarPagoCompra = function (compra) {
                ProgramarPagoYmodifCompra({
                    id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: [compra]
                }).then(function (datos) {
                    compra.estado_programacion_pago = true;
                    if (datos.estadoCompraVerificacion.length == 0) {
                        toastr.success("Programado Correctamente");
                        $scope.imprimirProgramacionPago(datos);
                    } else {
                        toastr.warning(datos.estadoCompraVerificacion[0] + "Ya esta programado");
                    }
                })
            }

            $scope.abrirListaProgrPagos = function () {
                $scope.cerrarPopup($scope.idModalTablaVencimientoDeudas);
                $scope.abrirPopup($scope.ModalTablaListaProgrPagos);
                $scope.filtr = {};

                var promesa = estadoProgramPago();
                promesa.then(function (estadoProgra) {
                    $scope.estadoProgra = estadoProgra
                    $scope.filtr.estado = $scope.estadoProgra[2]
                    $scope.verificarProgrPagos($scope.usuario.id_empresa, $scope.filtr);
                });

            }
            $scope.cerrarListaProgrPagos = function () {
                $scope.cerrarPopup($scope.ModalTablaListaProgrPagos);
            }
            $scope.buscarfiltradoProgrPagos = function (filtr) {
                $scope.verificarProgrPagos($scope.usuario.id_empresa, filtr);
            }
            $scope.verificarProgrPagos = function (idEmpresa, filtr) {
                $scope.filtrado = angular.copy(filtr)
                if ($scope.filtrado.desde && $scope.filtrado.hasta) {
                    $scope.filtrado.desde = new Date($scope.convertirFecha($scope.filtrado.desde))
                    $scope.filtrado.hasta = new Date($scope.convertirFecha($scope.filtrado.hasta))
                }
                if ($scope.filtrado.desde && !$scope.filtrado.hasta) {
                    $scope.filtrado.desde = new Date($scope.convertirFecha($scope.filtrado.desde))
                }
                if (!$scope.filtrado.desde && $scope.filtrado.hasta) {
                    $scope.filtrado.hasta = new Date($scope.convertirFecha($scope.filtrado.hasta))
                }
                $scope.listaProgrPagosEmp(idEmpresa, $scope.filtrado);
            }

            $scope.listaProgrPagosEmp = function (empresa, filtrado) {
                var promesa = listaProgrPagosEmpresa(empresa, filtrado);
                promesa.then(function (detcompraProgramacPagos) {
                    $scope.detcompraProgramacPagos = detcompraProgramacPagos
                });
            }

            $scope.confirmacionAprobado = function (datos) {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Aprobar programación de pago de " + datos.compra.proveedor.razon_social + ", N° Fact: " + datos.compra.factura + "!!",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompraAprobado(datos);
                    }
                });
            }

            $scope.programarPagoCompraAprobado = function (compra) {
                programarPagoAprobado({ id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: [compra] }).then(function (datos) {
                    if (datos.estadoCompraVerificacion.length == 0) {
                        $scope.listaProgrPagosEmp($scope.usuario.id_empresa, compra);
                        toastr.success("Aprobado");
                    } else {
                        toastr.warning(datos.estadoCompraVerificacion[0] + "Ya no puede Aprobar");
                    }
                })
            }

            $scope.confirmacionRechazado = function (datos) {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Rechazar programación de pago de " + datos.compra.proveedor.razon_social + ", N° Fact: " + datos.compra.factura + "!!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompraRechazado(datos);
                    }
                });
            }

            $scope.programarPagoCompraRechazado = function (compra) {
                programarPagoRechazado({ id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: [compra] }).then(function (datos) {
                    if (datos.estadoCompraVerificacion.length == 0) {
                        $scope.listaProgrPagosEmp($scope.usuario.id_empresa, compra);
                        toastr.success("Rechazado");
                    } else {
                        toastr.warning(datos.estadoCompraVerificacion[0] + "Ya no puede Rechazar");
                    }
                })
            }

            $scope.atras = function () {
                $scope.cerrarPopup($scope.ModalTablaListaProgrPagos);
                $scope.abrirListaVencimientoDeudas();
            }

            $scope.imprimirCompraPrograPago = function (compra) {
                listaCompraPrograPagoImpres({ compra }).then(function (datos) {
                    $scope.imprimirProgramacionPago(datos);
                })
            }


            $scope.headerPdfProgrPago = (doc, logo, titulo, hoy, page, inf_empresa, inf_Depart, metadata, nroCorrelativo) => {
                try {
                    if (logo.length > 0 && logo !== "error") {
                        if (logo) {
                            doc.image(logo, 85, 33, { fit: [78, 45] });
                        }
                    }
                    doc.lineWidth(0.5)
                    doc.rect(40, 30, 542, 65).stroke();
                    doc.rect(200, 30, 0, 65).stroke();

                    doc.font('Helvetica', 5);
                    doc.text((inf_empresa.direccion).toUpperCase(), 45, 80, { width: 155, align: "center" });
                    doc.text((inf_empresa.departamento).toUpperCase() + ' - BOLIVIA', 45, 90, { width: 155, align: "center" });

                    doc.font('Helvetica-Bold', 11);
                    doc.text(titulo, 200, 40, { width: 380, align: "center" });
                    doc.font('Helvetica', 10);
                    doc.text((inf_Depart).toUpperCase(), 200, 53, { width: 380, align: 'center' });
                    doc.font('Helvetica-Bold', 12);
                    doc.text(nroCorrelativo, 200, 79, { width: 380, align: 'center' });

                    doc.font('Helvetica-Bold', 7).text("Página " + page, 0, 740, { align: 'center' })
                    doc.font('Helvetica', 6).text(metadata, 0, 755, { align: 'center' })
                } catch (e) {
                    console.error('Error al generar pdf...', e);
                    return SweetAlert.swal("", "Ocurrió un error al generar pdf..." + e, "warning");
                }
            }

            $scope.imprimirProgramacionPago = async (pagosProg) => {
                blockUI.stop();
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
                    var stream = doc.pipe(blobStream());
                    let titulo = "PROGRAMACIÓN ORDEN DE PAGO"
                    let nroCorrelativo = 'N° ' + pagosProg.CompProgramacPagos.correlativo
                    let hoy = $scope.fechaATexto(new Date());
                    let inf_empresa = { direccion: $scope.usuario.empresa.direccion, departamento: $scope.usuario.empresa.departamento.nombre }
                    let inf_Depart = $scope.usuario.empresa.departamento.nombre + ' - ' + $scope.aFechaLarga(pagosProg.CompProgramacPagos.fecha)
                    let metadata = "Usuario: " + $scope.usuario.nombre_usuario + " - Fecha Emisión: " + $scope.convertirFechaHora(pagosProg.CompProgramacPagos.fecha) + " - Fecha impresión: " + $scope.convertirFechaHora(new Date());
                    var x = 40, y = 95, items = 0, page = 1, itemsPerPage = 50, pages = Math.ceil(pagosProg.CompProgramacPagos.DetallesCompraProgramacionPago.length / itemsPerPage)
                    $scope.headerPdfProgrPago(doc, logo, titulo, hoy, page, inf_empresa, inf_Depart, metadata, nroCorrelativo);
                    y += 10;
                    doc.rect(40, y, 542, 0).stroke()
                    y += 5;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('N°', 40, y);
                    doc.text('EMPRESA', 60, y);
                    doc.text('FECHA', 240, y, { width: 45, align: 'center' });
                    doc.text('ESTADO', 285, y, { width: 40, align: 'center' });
                    doc.text('FACTURA', 325, y, { width: 50, align: 'center' });
                    doc.text('VENCIMIENTO', 370, y, { width: 75, align: 'center' });
                    doc.text('MONTO', 420, y, { width: 55, align: 'right' });
                    doc.text('PAGADO', 475, y, { width: 55, align: 'right' });
                    doc.text('COMPROB', 530, y, { width: 50, align: 'right' });
                    y += 10;
                    doc.rect(40, y, 542, 0).stroke();
                    y += 5;
                    doc.font('Helvetica', 7);
                    doc.lineWidth(0.5);
                    let total_bs = 0;
                    let total_pag = 0;
                    if (pagosProg.CompProgramacPagos.DetallesCompraProgramacionPago) {
                        for (let j = 0; j < pagosProg.CompProgramacPagos.DetallesCompraProgramacionPago.length; j++) {
                            const registr = pagosProg.CompProgramacPagos.DetallesCompraProgramacionPago[j];
                            if (j % 3 == 0) doc.rect(40, y - 3, 542, 12).fill('#f7f7f7').fillColor('#000');
                            doc.font
                            doc.text(j + 1, 40, y);
                            doc.text(registr.compra.proveedor.razon_social, 60, y, { width: 200 });
                            doc.text(fechaATexto(registr.compra.fecha), 240, y, { width: 45, align: 'center' });
                            doc.text(registr.estado.nombre_corto, 285, y, { width: 40, align: 'center' });
                            doc.text(registr.compra.factura ? registr.compra.factura : '', 325, y, { width: 50, align: 'center' });
                            doc.text(fechaATexto(registr.fecha_vencimiento), 370, y, { width: 75, align: 'center' });
                            doc.text(number_format_negativo_to_positvo(registr.compra.saldo, 2), 420, y, { width: 55, align: 'right' });
                            doc.text(number_format_negativo_to_positvo(registr.compra.a_cuenta, 2), 475, y, { width: 55, align: 'right' });
                            var comprob = registr.compra.asientosContab[0] ? registr.compra.asientosContab[0].comprobante.numero : '-'
                            var tipoComp = registr.compra.asientosContab[0] ? registr.compra.asientosContab[0].comprobante.tipoComprobante.nombre_corto : '-'
                            doc.text(tipoComp.substr(4, 1) + '-' + comprob, 530, y, { width: 50, align: 'right' });
                            total_bs = total_bs + registr.compra.saldo
                            total_pag = total_pag + registr.compra.a_cuenta
                            y += 12; items += 1;
                            if (y > 730) {
                                x = 40, y = 95, items = 0, page++
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                y += 8;
                                doc.lineWidth(0.1)
                                doc.rect(40, y, 542, 0).stroke()
                                doc.rect(40, y + 13, 542, 0).stroke();
                                y += 4;
                                doc.font('Helvetica-Bold', 8);
                                doc.text('N°', 40, y);
                                doc.text('EMPRESA', 60, y);
                                doc.text('ESTADO', 305, y, { width: 40, align: 'center' });
                                doc.text('FACTURA', 345, y, { width: 50, align: 'center' });
                                doc.text('VENCIMIENTO', 395, y, { width: 75, align: 'center' });
                                doc.text('MONTO', 470, y, { width: 55, align: 'right' });
                                doc.text('COMPROB', 530, y, { width: 50, align: 'right' });
                                y += 15, items++;
                                $scope.headerPdfProgrPago(doc, logo, titulo, hoy, page, inf_empresa, inf_Depart, metadata, nroCorrelativo);
                            }
                        }
                    }
                    doc.rect(40, y, 542, 0).stroke();
                    y += 2;
                    doc.text('TOTAL', 40, y);
                    doc.text(number_format_negativo_to_positvo(total_bs, 2), 420, y, { width: 55, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(total_pag, 2), 475, y, { width: 55, align: 'right' });
                    y += 20;

                    doc.end();
                    stream.on('finish', () => {
                        const fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                });
            }

            $scope.ProgPagoSeleccionados = [];
            $scope.checkProgPago = function (index, value, checked) {
                var idx = $scope.ProgPagoSeleccionados.indexOf(value);
                $scope.selectAllProgPago = false;
                if (idx >= 0 && !checked) {
                    $scope.ProgPagoSeleccionados.splice(idx, 1);
                }
                if (idx < 0 && !checked) {
                    $scope.ProgPagoSeleccionados.splice(index, 1);
                }
                if (idx < 0 && checked) {
                    $scope.ProgPagoSeleccionados.push(value);
                }
            }

            $scope.checkAllProgPago = function (vencimentDeudas, selectAll) {
                angular.forEach(vencimentDeudas, function (reg) {
                    reg.checkedProgPago = selectAll;
                });
                if (!selectAll) {
                    $scope.ProgPagoSeleccionados = [];
                } else {
                    $scope.ProgPagoSelecAll = angular.copy(vencimentDeudas);
                    $scope.ProgPagoSeleccionados = $scope.ProgPagoSelecAll.filter(compra => !compra.estado_programacion_pago)
                }
            };

            $scope.ConfirmProgramarPagoCheck = function () {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Programar los Pagos Seleccionados!!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompraCheck($scope.ProgPagoSeleccionados);
                    }
                });
            }
            $scope.programarPagoCompraCheck = function (compra) {
                ProgramarPagoYmodifCompra({ id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: compra }).then(function (datos) {
                    if (datos.estadoCompraVerificacion.length > 1) {
                        SweetAlert.swal({
                            title: "Ya fueron Programados!",
                            html: "<div class='content-sweet'>" + datos.estadoCompraVerificacion.join('\n\n') + "</div><dl id='dt-list-1'><dt>Seleccione solo los pendientes!!</dt></dl>",
                            icon: 'warning'
                        });
                    } else {
                        $scope.imprimirProgramacionPago(datos);
                        toastr.success("Programado");
                    }
                    $scope.verificarVencimientosDeudas($scope.usuario.id_empresa, $scope.filtro);
                    $scope.ProgPagoSeleccionados = [];
                })
            }

            $scope.aproRechSeleccionados = [];
            $scope.checkAproRech = function (index, value, checked) {
                var idx = $scope.aproRechSeleccionados.indexOf(value);
                $scope.selectAllProgPago = false;
                if (idx >= 0 && !checked) {
                    $scope.aproRechSeleccionados.splice(idx, 1);
                }
                if (idx < 0 && !checked) {
                    $scope.aproRechSeleccionados.splice(index, 1);
                }
                if (idx < 0 && checked) {
                    $scope.aproRechSeleccionados.push(value);
                }
            }

            $scope.checkAllAproRech = function (detProgramacPagos, selectAll) {
                angular.forEach(detProgramacPagos, function (reg) {
                    reg.checkedAproRech = selectAll;
                });
                if (!selectAll) {
                    $scope.aproRechSeleccionados = [];
                } else {
                    $scope.ProgPagoSelecAllAprRech = angular.copy(detProgramacPagos);
                    $scope.aproRechSeleccionados = $scope.ProgPagoSelecAllAprRech.filter(compra => compra.estado.nombre_corto == 'PEND')
                }

            };

            $scope.confirmacionAprobadoCheck = function (compra, filtr) {
                $scope.compra = compra
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Aprobar programación de pagos seleccionados!!",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompraAprobadoCheck($scope.aproRechSeleccionados, filtr);
                    }
                });
            }

            $scope.programarPagoCompraAprobadoCheck = function (compra, filtr) {
                programarPagoAprobado({ id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: compra }).then(function (datos) {
                    if (datos.estadoCompraVerificacion.length > 1) {
                        SweetAlert.swal({
                            title: "Ya fueron Rechazados!",
                            html: "<div class='content-sweet'>" + datos.estadoCompraVerificacion.join('\n\n') + "</div><dl id='dt-list-1'><dt>Seleccione solo los pendientes!!</dt></dl>",
                            icon: 'warning'
                        });
                    } else {
                        toastr.success("Aprobado");
                    }
                    $scope.verificarProgrPagos($scope.usuario.id_empresa, filtr);
                    $scope.aproRechSeleccionados = [];
                })
            }

            $scope.confirmacionRechazadoCheck = function (compra, filtr) {
                $scope.compra = compra
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Rechazar programación de pagos seleccionados!!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.programarPagoCompraRechazadoCheck($scope.aproRechSeleccionados, filtr);
                    }
                });
            }

            $scope.programarPagoCompraRechazadoCheck = function (compra, filtr) {
                programarPagoRechazado({ id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, detalles: compra }).then(function (datos) {
                    if (datos.estadoCompraVerificacion.length > 1) {
                        SweetAlert.swal({
                            title: "Ya fueron Aprobados!",
                            html: "<div class='content-sweet'>" + datos.estadoCompraVerificacion.join('\n\n') + "</div><dl id='dt-list-1'><dt>Seleccione solo los pendientes!!</dt></dl>",
                            icon: 'warning'
                        });
                    } else {
                        toastr.success("Rechazado");
                    }
                    $scope.verificarProgrPagos($scope.usuario.id_empresa, filtr);
                    $scope.aproRechSeleccionados = [];
                })
            }

            $scope.obtenerAlmacenes = function (idSucursal) {
                $scope.almacenes = [];
                var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
                $scope.almacenes = sucursal.almacenes;
            }
            $scope.despachoSortColumn = function (propertyName, tipo) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
                $scope.propertyNameTipo = tipo;
            }
            $scope.verificarDespachos = function (idEmpresa) {
                //blockUI.start();
                var filtro = { inicio: 0, fin: 0, razon_social: 0, empleado: 0, inicio2: 0, fin2: 0 }
                var promesa = GtmTransportistas(idEmpresa);
                promesa.then(function (transportistas) {
                    $scope.gtm_transportistas = transportistas;
                    promesa = GtmEstibajes(idEmpresa);
                    promesa.then(function (estibajes) {
                        $scope.gtm_estibajes = estibajes;
                        promesa = GtmGrupoEstibajes(idEmpresa);
                        promesa.then(function (grupoEstibajes) {
                            $scope.gtm_grupo_estibajes = grupoEstibajes;
                            promesa = GtmDetallesDespachoAlerta(idEmpresa, filtro);
                            promesa.then(function (detallesDespacho) {
                                $scope.gtm_detalles_despacho = detallesDespacho;
                                $scope.vencimientoTotal = $scope.vencimientoTotal + detallesDespacho.length;
                                $scope.gtm_detalles_despacho_seleccionados = [];
                                $scope.gtm_detalles_despacho.forEach(function (despacho, index, array) {
                                    despacho.cantidad_despacho2 = despacho.saldo
                                    despacho.saldo2 = 0
                                });
                            });
                        });
                    });
                });
            }

            $scope.GetAlertasDespachos = function (idEmpresa) {
                var promesa = GtmTransportistas(idEmpresa);
                promesa.then(function (transportistas) {
                    $scope.gtm_transportistas = transportistas;
                    promesa = GtmEstibajes(idEmpresa);
                    promesa.then(function (estibajes) {
                        $scope.gtm_estibajes = estibajes;
                        promesa = GtmGrupoEstibajes(idEmpresa);
                        promesa.then(function (grupoEstibajes) {
                            $scope.gtm_grupo_estibajes = grupoEstibajes;
                            promesa = alertasDespachoCantidad(idEmpresa);
                            promesa.then(function (dato) {
                                $scope.despachoCantidadAlertas = dato.cantidad_pedidos;
                                $scope.vencimientoTotal = $scope.vencimientoTotal + $scope.despachoCantidadAlertas;
                            });
                        });
                    });
                });
            }

            $scope.removerDetalleDespachoAlerta = function (detalle_despacho) {
                detalle_despacho = new GtmDetalleDespacho(detalle_despacho);
                detalle_despacho.$delete(function (res) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.gtm_detalles_despacho_seleccionados.length;
                    $scope.verificarDespachos($scope.usuario.id_empresa);
                    $scope.mostrarMensaje(res.mensaje);
                });
            }

            /* 	$scope.calcularTotalCarga=function(transportista){
                    var totalCantidadCarga=0;
                    for(var i=0;i<$scope.gtm_detalles_despacho_seleccionados.length;i++){
                        if($scope.gtm_detalles_despacho_seleccionados[i].id_transportista==transportista.id){
                            totalCantidadCarga=totalCantidadCarga+$scope.gtm_detalles_despacho_seleccionados[i].cantidad;
                        }
                    }
                    return totalCantidadCarga;
                }
         */
            $scope.cambiarSeleccionDetallesDespacho = function (seleccion) {
                $scope.gtm_detalles_despacho_seleccionados = [];
                for (var i = 0; i < $scope.gtm_detalles_despacho.length; i++) {
                    $scope.gtm_detalles_despacho[i].seleccionado = seleccion;
                    if ($scope.gtm_detalles_despacho[i].seleccionado) {
                        $scope.gtm_detalles_despacho_seleccionados.push($scope.gtm_detalles_despacho[i]);
                    }
                }
            }

            $scope.calcularTotalCantidad = function () {
                var totalCantidadDespacho = 0;
                if ($scope.gtm_detalles_despacho_seleccionados != undefined) {
                    for (var i = 0; i < $scope.gtm_detalles_despacho_seleccionados.length; i++) {
                        totalCantidadDespacho = totalCantidadDespacho + $scope.gtm_detalles_despacho_seleccionados[i].cantidad;
                    }
                }
                return totalCantidadDespacho;
            }

            $scope.cambiarSeleccionDetalleDespacho = function (gtm_detalle_despacho) {
                if (gtm_detalle_despacho.seleccionado) {
                    $scope.gtm_detalles_despacho_seleccionados.push(gtm_detalle_despacho);
                    if ($scope.gtm_detalles_despacho_seleccionados.length == $scope.gtm_detalles_despacho.length) {
                        $scope.detalles_despacho_seleccionados = true;
                    }
                } else {
                    $scope.gtm_detalles_despacho_seleccionados.splice($scope.gtm_detalles_despacho_seleccionados.indexOf(gtm_detalle_despacho), 1);
                    $scope.detalles_despacho_seleccionados = false;
                }
            }

            $scope.guardarDespachos = async function (id_almacen_despacho, id_sucursal_despacho, fecha) {
                /* blockUI.start(); */
                var mensajes = ""
                var mensajeCorrecto = ""
                var hasherror = false
                for (var i = 0; i < $scope.gtm_detalles_despacho_seleccionados.length; i++) {
                    var arreglo = []
                    arreglo.push($scope.gtm_detalles_despacho_seleccionados[i])
                    var res = await GuardarGtmDetalleDespachoAlerta($scope.usuario.id_empresa, fecha, arreglo, id_almacen_despacho, id_sucursal_despacho)
                    if (res.hasError) {
                        $scope.mostrarMensaje(res.mensaje);
                        mensajes += res.mensaje
                        hasherror = true
                    } else {
                        if (res.sinGuardar == true) {
                            mensajes += res.mensaje
                            hasherror = true
                        }
                        $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.gtm_detalles_despacho_seleccionados.length;
                        $scope.verificarDespachos($scope.usuario.id_empresa);
                        mensajeCorrecto = res.mensaje
                    }
                    if (i === ($scope.gtm_detalles_despacho_seleccionados.length - 1)) {
                        if (hasherror == true) {
                            $scope.mostrarMensaje(mensajes);
                        } else {
                            $scope.mostrarMensaje(mensajeCorrecto);
                        }

                    }
                }
            }

            $scope.calcularSaldoDespacho = function (gtm_detalle_despacho) {
                gtm_detalle_despacho.saldo2 = gtm_detalle_despacho.cantidad - (gtm_detalle_despacho.cantidad_despacho + gtm_detalle_despacho.cantidad_despacho2);
            }

            $scope.calcularSaldoFacturaProforma = function (facturaProforma) {
                $scope.facturaProformas.saldo = facturaProforma.importe - facturaProforma.a_cuenta
            }

            $scope.establecerDespacho = function (asignacion) {
                for (var i = 0; i < $scope.gtm_detalles_despacho_seleccionados.length; i++) {
                    $scope.gtm_detalles_despacho_seleccionados[i].id_estibaje = asignacion.id_estibaje;
                    $scope.gtm_detalles_despacho_seleccionados[i].id_grupo_estibaje = asignacion.id_grupo_estibaje;
                    $scope.gtm_detalles_despacho_seleccionados[i].id_transportista = asignacion.id_transportista;

                }
                var fecha = new Date($scope.convertirFecha(asignacion.fecha))
                $scope.guardarDespachos($scope.id_almacen_despacho, $scope.id_sucursal_despacho, fecha)
                $scope.cerrarAsignacionDespacho();
            }

            $scope.abrirAsignacionDespacho = function (model, form, sucursal, almacen) {
                if (form.$valid) {
                    $scope.id_almacen_despacho = almacen
                    $scope.id_sucursal_despacho = sucursal
                    $scope.id_sucursal_despacho = sucursal
                    if (model) {
                        $scope.gtm_detalles_despacho_seleccionados = []
                        $scope.gtm_detalles_despacho_seleccionados.push(model);
                        $scope.abrirPopup($scope.idModalTablaAsignacionDespacho);
                    } else {
                        $scope.abrirPopup($scope.idModalTablaAsignacionDespacho);
                    }
                } else {
                    $scope.errorDespacho = true
                }
            }

            $scope.cerrarAsignacionDespacho = function () {
                $scope.cerrarPopup($scope.idModalTablaAsignacionDespacho);
            }
            $scope.abrirEliminarProductoVencido = function () {
                $scope.abrirPopup($scope.IdModalEliminarProductoVencido);
            }
            $scope.cerrarEliminarProductoVencido = function () {
                $scope.cerrarPopup($scope.IdModalEliminarProductoVencido);
            }

            $scope.ActualizarFechaCreditosCliente = function (venta, fechaCredito) {

                venta.fecha = new Date(venta.fecha)
                // console.log("fecha anterior " + venta.fecha)
                // console.log("fecha reprogramada " + fechaCredito)
                var datos = {}
                fechaReprogramacion = new Date($scope.convertirFecha(fechaCredito)).getTime();
                fechaInicioVenta = new Date($scope.convertirFecha(venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear())).getTime();
                var diff = fechaReprogramacion - fechaInicioVenta;
                var diferencia = diff / (1000 * 60 * 60 * 24);
                // console.log(diferencia)
                datos.dias_credito = diferencia
                datos.fecha_reprogramacion = new Date($scope.convertirFecha(fechaCredito));
                datos.fecha_anterior = new Date($scope.convertirFecha(venta.fecha_vencimiento.getDate() + "/" + (venta.fecha_vencimiento.getMonth() + 1) + "/" + venta.fecha_vencimiento.getFullYear()));
                // console.log(datos)
                ClienteVencimientoCredito.update({ id: venta.id }, datos, function (res) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosCreditos.length;
                    $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                    $scope.cerrarActualizarFechaCreditos();
                    $scope.mostrarMensaje("¡Actualizado Satisfactoriamente!");
                });
            }

            $scope.ActualizarFechaCreditosDeudas = function (compra, fechaDeuda) {
                compra.fecha = new Date(compra.fecha)
                // console.log("fecha anterior " + compra.fecha)
                // console.log("fecha reprogramada " + fechaDeuda)
                var datos = {}
                fechaReprogramacion = new Date($scope.convertirFecha(fechaDeuda)).getTime();
                fechaInicioCompra = new Date($scope.convertirFecha(compra.fecha.getDate() + "/" + (compra.fecha.getMonth() + 1) + "/" + compra.fecha.getFullYear())).getTime();
                var diff = fechaReprogramacion - fechaInicioCompra;
                var diferencia = diff / (1000 * 60 * 60 * 24);
                // console.log(diferencia)
                datos.dias_credito = diferencia
                datos.fecha_reprogramacion = new Date($scope.convertirFecha(fechaDeuda));
                datos.fecha_anterior = new Date($scope.convertirFecha(compra.fecha_vencimiento.getDate() + "/" + (compra.fecha_vencimiento.getMonth() + 1) + "/" + compra.fecha_vencimiento.getFullYear()));
                // console.log(datos)
                ProveedorVencimientoCredito.update({ id: compra.id }, datos, function (res) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosDeudas.length;
                    $scope.verificarVencimientosDeudas($scope.usuario.id_empresa);
                    $scope.cerrarActualizarFechaDeudas();
                    $scope.mostrarMensaje("¡Actualizado Satisfactoriamente!");
                });
            }
            $scope.obtenerMovimientoEgresoBaja = function () {
                blockUI.start();
                var promesa = ClasesTipo("MOVEGR");
                promesa.then(function (entidad) {
                    $scope.movimientoEgresoBaja = $.grep(entidad.clases, function (e) { return e.nombre_corto == $scope.diccionario.EGRE_BAJA; })[0];
                    blockUI.stop();
                });
            }
            $scope.obtenerEstadosPagoDespachos = function () {
                blockUI.start();
                var promesa = ClasesTipo("ES_DESP_PAGO");
                promesa.then(function (entidad) {
                    $scope.estadosDespacho = entidad.clases
                    blockUI.stop();
                });
            }

            $scope.abrirVentanaBaja = function (inventario) {
                var inventarios = []; inventarios.push(inventario);
                $scope.bajaInventario = new Venta({
                    id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id,
                    detallesVenta: [], detallesVentaNoConsolidadas: [],
                    importe: (inventario.producto.precio_unitario * inventario.cantidad),
                    total: (inventario.producto.precio_unitario * inventario.cantidad)
                });
                $scope.bajaInventario.sucursal = inventario.almacen.sucursal;
                $scope.bajaInventario.almacen = inventario.almacen;
                $scope.bajaInventario.movimiento = $scope.movimientoEgresoBaja;
                var fechaActual = new Date();
                $scope.bajaInventario.fechaTexto = fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear();
                $scope.bajaInventario.detallesVenta.push({
                    producto: inventario.producto, cantidad: inventario.cantidad,
                    importe: (inventario.producto.precio_unitario * inventario.cantidad),
                    total: (inventario.producto.precio_unitario * inventario.cantidad),
                    costos: inventarios, inventario: inventario,
                    descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false
                });
                $scope.abrirEliminarProductoVencido()
            }

            $scope.cerrarVentanaBajaProducto = function () {
                $scope.bajaInventario = null;
            }

            $scope.abrirListaDespachos = function () {

                $scope.filtroDes = { inicio: "", fin: "", inicio2: "", fin2: "", razon_social: "", empleado: "", verTransporte: false }
                $scope.verificarDespachos($scope.usuario.id_empresa);
                $scope.PopoverInfoDespacho = {
                    templateUrl: 'PopoverInfoDespacho.html',
                    title: 'informacion',
                    isOpen: false
                };
                $scope.abrirPopup($scope.idModalTablaDespachos);
            }
            $scope.filtrarDetalleDespachos = function (filtro) {
                if (filtro.inicio) {
                    filtro.inicio2 = new Date($scope.convertirFecha(filtro.inicio))
                } else {
                    filtro.inicio2 = 0
                }
                if (filtro.fin) {
                    filtro.fin2 = new Date($scope.convertirFecha(filtro.fin))
                } else {
                    filtro.fin2 = 0
                }
                promesa = GtmDetallesDespachoAlerta($scope.usuario.id_empresa, filtro);
                promesa.then(function (detallesDespacho) {
                    $scope.gtm_detalles_despacho = detallesDespacho;
                    $scope.gtm_detalles_despacho_seleccionados = [];

                    $scope.gtm_detalles_despacho.forEach(function (despacho, index, array) {
                        despacho.cantidad_despacho2 = despacho.saldo
                        despacho.saldo2 = 0
                    });
                });

            }
            $scope.imprimirPdfDespachosALerta = function () {
                ImprimirPdfAlertaDespacho($scope.gtm_detalles_despacho_seleccionados, $scope.filtroDes, $scope.usuario, $scope.convertirFecha)
            }
            $scope.imprimirExelDespachosALerta = function () {
                ExportarExelAlarmasDespachos($scope.gtm_detalles_despacho_seleccionados, $scope.filtroDes, $scope.usuario)
            }
            $scope.verificarLimiteCredito = function (ventaActual) {

                if (ventaActual.cliente && ventaActual.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    var promesa = VerificarLimiteCredito(ventaActual)

                    promesa.then(function (dato) {
                        var PrimeraVenta = dato.ventas.slice(0)
                        var FechaActual = new Date()
                        var totalsaldo = 0
                        var mensaje = { uno: "", dos: "" }

                        dato.ventas.forEach(function (venta, index, array) {
                            totalsaldo += venta.saldo
                            // console.log(totalsaldo)
                            if (totalsaldo >= ventaActual.cliente.linea_credito) {
                                mensaje.uno = "exedio el limite de la linea de credito"

                            }
                            if (index == (array.length - 1)) {
                                var fechaVenta = new Date(PrimeraVenta.fecha)
                                var dato = $scope.diferenciaEntreDiasEnDias(fechaVenta, FechaActual)
                                if (dato > ventaActual.cliente.plazo_credito) {
                                    mensaje.dos = "exedio el limide de dias de credito"

                                    if (ventaActual.cliente.bloquear_limite_credito == true) {
                                        $scope.mostrarMensaje(mensaje.uno + " " + mensaje.dos + " no puede realizar mas compras")
                                        $scope.blockerVenta = false
                                    } else {
                                        $scope.mostrarMensaje(mensaje.uno + " " + mensaje.dos + ", pero puede seguir consumiendo")
                                        $scope.blockerVenta = true
                                    }
                                } else {
                                    if (ventaActual.cliente.bloquear_limite_credito == true) {
                                        $scope.mostrarMensaje(mensaje.uno + " " + mensaje.dos + " no puede realizar mas compras")
                                        $scope.blockerVenta = false
                                    } else {
                                        $scope.mostrarMensaje(mensaje.uno + " " + mensaje.dos + ", pero puede seguir consumiendo")
                                        $scope.blockerVenta = true
                                    }

                                }
                            }
                        });
                    })
                } else {
                    $scope.blockerVenta = true
                }
            }

            $scope.obtenerMovimientosEgreso = function () {
                blockUI.start();
                var promesa = ClasesTipo("MOVEGR");
                promesa.then(function (entidad) {
                    $scope.movimientosEgreso = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.verificarSeleccionProformas = function () {
                $scope.obtenerMovimientosEgreso()
                $scope.obtenerTiposDePago()
                const paraFacturar = []
                if ($scope.alertasProformas.length > 0) {
                    // var id_actividad = $scope.alertasProformas[0].actividad
                    for (let index = 0; index < $scope.alertasProformas.length; index++) {
                        if ($scope.alertasProformas[index].seleccionada) {
                            paraFacturar.push($scope.alertasProformas[index])
                        }
                    }
                    $scope.generarFacturaciondeProformas(paraFacturar)
                }
            }

            $scope.odenarColumnasProformasAlertas = function (columna) {
                $scope.filtroAlertasProformas.dir = $scope.filtroAlertasProformas.dir == 'asc' ? 'desc' : 'asc'
                $scope.filtroAlertasProformas.col = columna
                $scope.abrirListaVencimientoProformas(true)

            }

            $scope.abrirListaVencimientoProformas = function (alreadyOpen) {
                // $scope.obtenerMeses()
                if (alreadyOpen === undefined) {
                    $scope.abrirPopup($scope.dialogAlertasProformas)
                }
                $scope.alertasProformas = [];
                if ($scope.filtroAlertasProformas === undefined) {
                    $scope.filtroAlertasProformas = { mes: "", anio: "", razon_social: "", proforma: "", col: "correlativo", dir: "asc" }

                }
                $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true)
                const prom = alertasProformasLista($scope.usuario.empresa.id, $scope.filtroAlertasProformas)
                prom.then(function (proformas) {

                    $scope.filtroAlertasProformas = $scope.filtrarFiltroProformas($scope.filtroAlertasProformas, true, true)
                    $scope.alertasProformas = proformas.proformas
                    // $scope.alertasProformas.forEach(function (_) {
                    //     var dolores = 0
                    //     dolores = _.tc.dolar;
                    //     _.totalSus = _.totalImporteBs / dolores
                    //     // var promesa = ObtenerCambioMoneda(_.fecha_proforma)

                    //     // promesa.then(function (dato) {
                    //     //     if (dato.monedaCambio) {

                    //     //     } else {
                    //     //         $scope.mostrarMensaje('La fecha ' + _.fecha_proforma + ' no tiene datos del tipo de cambio de dolar.')
                    //     //     }


                    //     // })
                    // })
                    // if (alreadyOpen === undefined) {
                    //     $scope.filtroAlertasProformas.anio = $scope.anios[0];
                    //     $scope.mesesFiltro.map(function (a) {
                    //         var mesActualf = new Date().getMonth() + 1;
                    //         if (a.id == mesActualf) {
                    //             $scope.filtroAlertasProformas.mes = a;
                    //         }
                    //     });
                    // }

                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })

            }
            $scope.filtrarFiltroProformas = function (filtro, _, __) {
                if (__ !== undefined) {
                    for (var key in filtro) {
                        if (filtro[key] == 0) {
                            filtro[key] = ""
                        }
                    }
                } else {
                    for (var key in filtro) {
                        if (filtro[key] === "" || filtro[key] === null) {
                            filtro[key] = 0
                        }
                    }
                }
                if (_ === undefined || !_) {
                    // $scope.obtenerHistoriales(true)
                } else {
                    return filtro
                }
            }

            $scope.obtenerTipoEgreso = function (movimiento) {
                var nombre_corto = movimiento.nombre_corto;
                $scope.tipoEgreso = nombre_corto;
            }

            $scope.generarFacturaciondeProformas = function (listaProformas) {
                let men = ''
                const noMismaActividad = []
                const noMismoCliente = []
                let textCli = ''
                const paraFacturar = []
                const proformaNoOk = []
                if (listaProformas.length > 0) {
                    const actividadComparar = listaProformas[0].actividadEconomica.id
                    const clienteComparar = listaProformas[0].cliente.id
                    for (let index = 0; index < listaProformas.length; index++) {
                        if (actividadComparar == listaProformas[index].actividadEconomica.id && clienteComparar == listaProformas[index].cliente.id) {
                            if (listaProformas[index].fecha_proforma_ok !== null) {
                                men += listaProformas[index].id + ', '
                                paraFacturar.push(listaProformas[index])
                            } else {
                                proformaNoOk.push(listaProformas[index])
                            }
                        } else {
                            noMismaActividad.push(listaProformas[index])
                        }
                        if (clienteComparar == listaProformas[index].cliente.id) {

                        } else {
                            noMismoCliente.push(listaProformas[index])
                        }
                    }
                    if (noMismaActividad.length > 0) {
                        var text = "La(s) actividad(es) "
                        for (let index = 0; index < noMismaActividad.length; index++) {
                            if (index === noMismaActividad.length - 1) {
                                text += noMismaActividad[index].actividadEconomica.nombre
                            } else {
                                text += noMismaActividad[index].actividadEconomica.nombre + ", "
                            }
                        }
                        if (noMismoCliente.length > 0) {
                            textCli = ' | '
                            textCli += " La(s) razón(es) social(es) "
                            for (let index = 0; index < noMismoCliente.length; index++) {
                                if (index === noMismoCliente.length - 1) {
                                    textCli += noMismoCliente[index].cliente.razon_social
                                } else {
                                    textCli += noMismoCliente[index].cliente.razon_social + ", "
                                }
                            }
                            textCli += " no pertenecen al mismo cliente " + listaProformas[0].cliente.razon_social + "  "
                        }
                        text += " no pertenecen a la misma actividad de " + listaProformas[0].actividadEconomica.nombre + "  "
                        $scope.mostrarMensaje(text + textCli)
                    } else {
                        if (paraFacturar.length === listaProformas.length) {
                            $scope.abrirFacturaProformas(paraFacturar)
                            $scope.cerrarListaVencimientoProformas()
                        } else {
                            $scope.mostrarMensaje('Una o más proformas seleccionada(s) no está lista para facturar. total:' + proformaNoOk.length)
                        }
                    }
                } else {
                    $scope.mostrarMensaje('Seleccione como mínimo 1 proforma a facturar, seleccionadas: ' + listaProformas.length)
                }
            }
            $scope.obtenerTiposDePago = function () {
                blockUI.start();
                var promesa = ClasesTipo("TIPA");
                promesa.then(function (entidad) {
                    $scope.tiposPago = entidad.clases.reduce(function (value, x) {
                        if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
                            value.push(x)
                        }
                        return value
                    }, []);
                    blockUI.stop();
                });
            }
            $scope.cambiarTipoPagoCompEdit = function (compra) {
                var tipoPagoO = compra.tipoPago
                var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPagoO.id; })[0];
                compra.tipoPago = tipoPago
                $scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
            }
            $scope.cambiarTipoPago = function (venta) {
                var tipoPagoO = venta.tipoPago
                var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPagoO.id; })[0];
                venta.tipoPago = tipoPago
                $scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
                if (venta.cliente.usar_limite_credito == true) {
                    $scope.verificarLimiteCredito(venta)
                }
            }
            $scope.generarFacturaProformas = (valid, factura) => {
                if (!factura.sucursal) {
                    return $scope.mostrarMensaje('No se puede continuar sin una autorización activa.')
                }
                blockUI.start()
                if (valid) {
                    if (factura.tipoPago.nombre_corto === 'CRE') {
                        if (factura.a_cuenta == undefined || factura.a_cuenta == null) {
                            factura.a_cuenta = 0;
                            factura.saldo = factura.total - factura.a_cuenta
                        }
                        if (factura.dias_credito == undefined || factura.dias_credito == null) {
                            factura.dias_credito = 30;
                        }
                    } else if (factura.tipoPago.nombre_corto === 'CONT') {
                        if (factura.a_cuenta == undefined || factura.a_cuenta == null) {
                            factura.a_cuenta = 0;
                            factura.saldo = factura.total - factura.a_cuenta
                        }
                        if (factura.dias_credito == undefined || factura.dias_credito == null) {
                            factura.dias_credito = 0;
                        }
                    }
                    const prom = FacturaProforma($scope.usuario.empresa.id, factura)
                    prom.then((res) => {
                        const mensake_ = res.mensaje;
                        if (res.hasErr === undefined) {
                            const prom = ProformasFacturadas($scope.usuario.id_empresa, res.factura.factura, res.factura.autorizacion)
                            prom.then((res) => {
                                const datosProformas = res.datosProformas
                                let movimiento = {}
                                const promConfigFact = ConfiguracionesFacturasProformas($scope.usuario.id_empresa)
                                promConfigFact.then((configuracionFactura) => {
                                    const promMov = ClasesTipo('MOVEGR')
                                    promMov.then((dato) => {
                                        dato.clases.forEach((clase) => {
                                            if (clase.nombre == "FACTURACIÓN" && clase.nombre_corto == "FACT") {
                                                movimiento = clase
                                            }
                                        })
                                        const promesa = ClasesTipo("TIPA");
                                        promesa.then((entidad) => {
                                            $scope.tiposPago = entidad.clases.reduce((value, x) => {
                                                if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
                                                    value.push(x)
                                                }
                                                return value
                                            }, []);
                                            $scope.facturaProformas = {}
                                            $scope.facturaProformas.glosa_unica = datosProformas[0].glosa_unica;
                                            $scope.facturaProformas.configuracion = configuracionFactura.configuracion;
                                            $scope.facturaProformas.movimiento = movimiento;
                                            $scope.facturaProformas.cliente = datosProformas[0].cliente;
                                            $scope.facturaProformas.autorizacion = datosProformas[0].autorizacion;
                                            $scope.facturaProformas.factura = datosProformas[0].factura;
                                            $scope.facturaProformas.codigo_control = datosProformas[0].codigo_control;
                                            $scope.facturaProformas.fecha = new Date(datosProformas[0].fecha_factura);
                                            $scope.facturaProformas.fecha_limite_emision = new Date(datosProformas[0].fecha_limite_emision);
                                            $scope.facturaProformas.actividad = datosProformas[0].actividadEconomica;
                                            $scope.facturaProformas.sucursal = datosProformas[0].sucursal;
                                            $scope.facturaProformas.detallesVenta = [];
                                            $scope.facturaProformas.detalle = "";
                                            $scope.facturaProformas.totalImporteBs = datosProformas[0].totalImporteBs;
                                            $scope.facturaProformas.importe = datosProformas[0].importe;
                                            $scope.facturaProformas.fecha_factura = new Date(datosProformas[0].fecha_factura).toLocaleDateString();
                                            $scope.facturaProformas.fechaTexto = new Date($scope.facturaProformas.fecha).toLocaleDateString();
                                            $scope.facturaProformas.periodo_mes = datosProformas[0].mes;
                                            $scope.facturaProformas.periodo_anio = datosProformas[0].anio;
                                            $scope.facturaProformas.datosProformas = datosProformas;
                                            $scope.facturaProformas.descripcion = datosProformas[0].descripcion;
                                            $scope.facturaProformas.movimiento = movimiento;
                                            $scope.facturaProformas.id_movimiento = $scope.facturaProformas.movimiento.id;
                                            $scope.facturaProformas.id_tipo_pago = $scope.tiposPago[0].id;
                                            $scope.facturaProformas.tipoPago = $scope.tiposPago[1];
                                            $scope.obtenerTipoEgreso($scope.facturaProformas.movimiento);
                                            $scope.esContado = false;
                                            $scope.facturaProformas.usar_servicios = true;
                                            $scope.facturaProformas.id_usuario = $scope.usuario.id;
                                            $scope.facturaProformas.fecha = datosProformas[0].fecha;
                                            $scope.facturaProformas.id_empresa = $scope.usuario.id_empresa;
                                            $scope.facturaProformas.total = 0;
                                            $scope.facturaProformas.importe = 0;
                                            $scope.facturaProformas.datosProformas.forEach(function (proforma, i) {
                                                proforma.detallesProformas.map(function (det, y) {
                                                    det.tc = proforma.cambio_dolar;
                                                    det.total = det.precio_unitario * det.cantidad;
                                                    $scope.facturaProformas.importe += det.total;
                                                    $scope.facturaProformas.total += det.total;
                                                    $scope.facturaProformas.detallesVenta.push(det)
                                                    if (y === proforma.detallesProformas.length - 1) {
                                                        if (i == $scope.facturaProformas.datosProformas.length - 1) {
                                                            $scope.mostrarMensaje(mensake_)
                                                            $scope.facturaProformas.importeLiteral = ConvertirALiteral($scope.facturaProformas.importe.toFixed(2));
                                                            $scope.facturaProformas.numero_literal = $scope.facturaProformas.importeLiteral;
                                                            ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, false);
                                                            $scope.cerrarFacturaProformas()
                                                            $scope.recargarItemsTabla()
                                                        }
                                                    }
                                                })
                                            });
                                            blockUI.stop()
                                        }).catch(function (err) {
                                            blockUI.stop()
                                            const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                            $scope.mostrarMensaje(msg)
                                        })
                                    }).catch(function (err) {
                                        blockUI.stop()
                                        const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                        $scope.mostrarMensaje(msg)
                                    })
                                }).catch(function (err) {
                                    blockUI.stop()
                                    const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                    $scope.mostrarMensaje(msg)
                                })
                            }).catch(function (err) {
                                const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                $scope.mostrarMensaje(msg)
                                blockUI.stop()
                            })
                        } else {
                            $scope.mostrarMensaje(mensake_)
                        }
                        blockUI.stop()
                    }).catch(function (err) {
                        const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Faltan datos')
                    blockUI.stop()
                }
            }
            $scope.cerrarFacturaProformas = function (paraFacturar) {
                $scope.facturaProformas = undefined
                $scope.cerrarPopup($scope.facturarProformas);
            }
            $scope.obtenerCambioDolarActual = function () {
                var hoy = new Date();
                var dolarActual = { ufv: "--", dolar: "--" }
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    dolarActual = { ufv: res.monedaCambio.ufv, dolar: res.monedaCambio.dolar }
                    return dolarActual
                }, function (err) {
                    $scope.mostrarMensaje('Hubo un problema al recuperar el cambio de dolar para ' + hoy.toLocaleDateString())
                    return dolarActual
                })

            }
            $scope.proforma_periodo_minimo = (proformas) => {
                return proformas.map(proforma => proforma).sort((proformA, proformB) => {
                    if (proformB === undefined || proformB === null) return 1;
                    const valor_anio = proformA.periodo_anio - proformB.periodo_anio
                    if (valor_anio == 0) return proformA.periodo_mes - proformB.periodo_mes;
                    return valor_anio;
                })[0];
            }
            $scope.abrirFacturaProformas = (paraFacturar) => {
                blockUI.start();
                const promMov = ClasesTipo('MOVEGR');
                let movimiento = {};
                promMov.then((dato) => {
                    for (let index = 0; index < dato.clases.length; index++) {
                        if (dato.clases[index].nombre == "FACTURACIÓN" && dato.clases[index].nombre_corto == "FACT") {
                            movimiento = dato.clases[index];
                            break
                        }
                    }
                    const fact = paraFacturar.map(proforma => proforma.id).join(',');
                    const prom = ProformasInfo(fact);
                    prom.then((datosProformas) => {
                        if (datosProformas.hasErr) {
                            $scope.facturaProformas = undefined;
                            $scope.mostrarMensaje(datosProformas.mensaje);
                            blockUI.stop();
                            return
                        }
                        $scope.facturaProformas = {};
                        $scope.facturaProformas.glosa_unica = $scope.facturaProformas.glosa_unica && $scope.facturaProformas.glosa_unica || true;
                        $scope.facturaProformas.movimiento = { id: movimiento.id };
                        $scope.facturaProformas.movimiento_nombre_corto = movimiento.nombre_corto;
                        $scope.facturaProformas.cliente = datosProformas.proformas[0].cliente;
                        let continuarFacturacion = false;
                        const actividadesDosificaciones = []
                        $scope.facturaProformas.actividad = datosProformas.proformas[0].actividadEconomica;
                        for (let i = 0; i < datosProformas.proformas[0].sucursal.actividadesDosificaciones.length; i++) {
                            if (datosProformas.proformas[0].sucursal.actividadesDosificaciones[i].id_actividad == $scope.facturaProformas.actividad.id && !datosProformas.proformas[0].sucursal.actividadesDosificaciones[i].expirado && !datosProformas.proformas[0].sucursal.actividadesDosificaciones[i].dosificacion.expirado) {
                                $scope.facturaProformas.sucursal = Object.assign({}, datosProformas.proformas[0].sucursal);
                                actividadesDosificaciones.push(datosProformas.proformas[0].sucursal.actividadesDosificaciones[i]);
                                break
                            }
                        }
                        continuarFacturacion = $scope.facturaProformas.sucursal && true || false;
                        if (!continuarFacturacion) {
                            blockUI.stop();
                            return $scope.mostrarMensaje('Existe un problema con la dosificación actual, esta vencida o no existe.<br />No se puede continuar con la facturación');
                        }
                        const proforma_periodo_minimo = $scope.proforma_periodo_minimo(datosProformas.proformas);
                        $scope.facturaProformas.sucursal && ($scope.facturaProformas.sucursal.actividadesDosificaciones = actividadesDosificaciones);
                        $scope.facturaProformas.detallesVenta = [];
                        $scope.facturaProformas.detalle = "";
                        $scope.facturaProformas.totalImporteBs = 0;
                        $scope.facturaProformas.totalImporteSus = 0;
                        $scope.facturaProformas.importe = 0;
                        $scope.facturaProformas.dias_credito = 30;
                        $scope.facturaProformas.a_cuenta = 0;
                        $scope.facturaProformas.fecha_factura = $scope.formatoFechaPDF(new Date());
                        $scope.facturaProformas.fechaTexto = $scope.formatoFechaPDF(new Date());
                        $scope.facturaProformas.periodo_mes = { id: proforma_periodo_minimo.periodo_mes };
                        $scope.facturaProformas.periodo_anio = { id: proforma_periodo_minimo.periodo_anio };
                        $scope.facturaProformas.datosProformas = datosProformas.proformas;
                        $scope.facturaProformas.descripcion = "";
                        $scope.facturaProformas.id_movimiento = $scope.facturaProformas.movimiento.id;
                        $scope.facturaProformas.id_tipo_pago = $scope.tiposPago[0].id;
                        $scope.facturaProformas.tipoPago = $scope.tiposPago[1];
                        $scope.esContado = false;
                        $scope.facturaProformas.usar_servicios = true;
                        $scope.facturaProformas.id_usuario = $scope.usuario.id;
                        $scope.facturaProformas.fecha = new Date();
                        $scope.facturaProformas.detallesVentaNoConsolidadas = [];
                        $scope.facturaProformas.id_empresa = $scope.usuario.id_empresa;
                        for (let index = 0; index < $scope.facturaProformas.datosProformas.length; index++) {
                            $scope.facturaProformas.descripcion += $scope.facturaProformas.datosProformas[index].detalle + ". ";
                            $scope.facturaProformas.totalImporteBs += $scope.facturaProformas.datosProformas[index].totalImporteBs;
                            $scope.facturaProformas.totalImporteSus += $scope.facturaProformas.datosProformas[index].totalImporteSus;
                            $scope.facturaProformas.datosProformas[index].importe = $scope.facturaProformas.datosProformas[index].importeTotalBs;
                            for (let jindex = 0; jindex < $scope.facturaProformas.datosProformas[index].detallesProformas.length; jindex++) {
                                $scope.facturaProformas.datosProformas[index].detallesProformas[jindex].tc = $scope.facturaProformas.datosProformas[index].cambio_dolar;
                                if (jindex === $scope.facturaProformas.datosProformas[index].detallesProformas.length - 1) {
                                    Array.prototype.push.apply($scope.facturaProformas.detallesVenta, $scope.facturaProformas.datosProformas[index].detallesProformas);
                                }
                                if (index === $scope.facturaProformas.datosProformas.length - 1 && jindex === $scope.facturaProformas.datosProformas[index].detallesProformas.length - 1) {
                                    $scope.facturaProformas.importe = $scope.facturaProformas.totalImporteBs;
                                    $scope.facturaProformas.total = $scope.facturaProformas.importe;
                                    $scope.facturaProformas.importeLiteral = ConvertirALiteral($scope.facturaProformas.totalImporteBs.toFixed(2));
                                    $scope.facturaProformas.saldo = $scope.facturaProformas.totalImporteBs - $scope.facturaProformas.a_cuenta;
                                    $scope.abrirPopup($scope.facturarProformas);
                                }
                            }
                        }
                        blockUI.stop();
                    }).catch(function (err) {
                        const mensaje = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
                        $scope.mostrarMensaje(mensaje);
                        blockUI.stop();
                    })
                })
            }

            $scope.checkResourceImg = function (url, alreadyCheck) {
                var req = new XMLHttpRequest();
                var urli = url.split('.')
                if (urli.length == 4) {
                    return false
                } else if (urli.length == 2) {
                    return true
                } else {
                    if (alreadyCheck) {
                        return true
                    } else {
                        return false
                    }
                }
                // req.open('HEAD', host, true);
                // req.send();
                // if (req.status === 404) {
                //     return true;
                // }
                // if (req.status === 403) {
                //     return false;
                // }
            };
            // $scope.imprimirFacturaProforma = function (factura) {

            // }

            $scope.imprimirVenta = function (venta) {
                var promesa = DatosVenta(venta.id, $scope.usuario.id_empresa);
                promesa.then(function (datos) {
                    var ventaConsultada = datos.venta;
                    ventaConsultada.configuracion = datos.configuracion;
                    ventaConsultada.sucursal = datos.sucursal;
                    ventaConsultada.numero_literal = datos.numero_literal;
                    var fecha = new Date(ventaConsultada.fecha);
                    ventaConsultada.fechaTexto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
                    ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, false, $scope.usuario);
                });
            }


            $scope.abrirListaVencimientoProductos = function () {
                $scope.abrirPopup($scope.idModalTablaVencimientoProductos);
            }
            $scope.cerrarListaVencimientoProformas = function () {
                $scope.filtroAlertasProformas = { mes: "", anio: "", razon_social: "", proforma: "", col: "correlativo", dir: "asc" }
                $scope.cerrarPopup($scope.dialogAlertasProformas);
            }
            $scope.cerrarListaDespachos = function () {
                $scope.cerrarPopup($scope.idModalTablaDespachos);
            }

            $scope.cerrarListaVencimientoProductos = function () {
                $scope.cerrarPopup($scope.idModalTablaVencimientoProductos);
            }
            //modal compras pendientes
            $scope.abrirModalComprasPendientes = function () {
                $scope.datos_glosa_individual = false
                $scope.texto_datos_glosa_individual = 'Factura nro. '
                $scope.abrirPopup($scope.idModalTablaComprasPendientes);
                $scope.verificarComprasComprobantes($scope.usuario.id_empresa);
            }
            $scope.cerrarModalComprasPendientes = function () {
                $scope.cerrarPopup($scope.idModalTablaComprasPendientes);
            }
            //modal bancos pendientes
            $scope.abrirModalBancosPendientes = function () {
                $scope.abrirPopup($scope.idModalTablaBancosPendientes)
            }
            $scope.cerrarModalBancosPendientes = function () {
                $scope.cerrarPopup($scope.idModalTablaBancosPendientes);
            }
            //modal otros pendientes
            $scope.abrirModalBancosPendientes = function () {
                $scope.abrirPopup($scope.idModalTablaOtrosPendientes)
            }
            $scope.cerrarModalBancosPendientes = function () {
                $scope.cerrarPopup($scope.idModalTablaOtrosPendientes);
            }
            $scope.abrirListaVencimientoCreditos = function () {
                $scope.abrirPopup($scope.idModalTablaVencimientoCreditos);
                $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
            }

            $scope.cerrarListaVencimientoCreditos = function () {
                $scope.cerrarPopup($scope.idModalTablaVencimientoCreditos);
            }
            $scope.abrirActualizarFechaCreditos = function (venta) {
                $scope.venta = venta;
                $scope.abrirPopup($scope.idmodalActualizarCreditoCliente);
            }
            $scope.cerrarActualizarFechaCreditos = function () {
                $scope.cerrarPopup($scope.idmodalActualizarCreditoCliente);
            }
            $scope.abrirActualizarFechaDeudas = function (compra) {
                $scope.compra = compra;
                $scope.abrirPopup($scope.idmodalActualizarCreditoDeuda);
            }
            $scope.cerrarActualizarFechaDeudas = function () {
                $scope.cerrarPopup($scope.idmodalActualizarCreditoDeuda);
            }

            $scope.abrirListaVentasPendientes = function () {
                $scope.datos_glosa_individual = false
                $scope.texto_datos_glosa_individual = 'Factura nro. '
                $scope.abrirPopup($scope.idModalTablaVentasPendientes);
                $scope.verificarVentasComprobantes($scope.usuario.id_empresa);
            }

            $scope.cerrarListaVentasPendientes = function () {
                $scope.cerrarPopup($scope.idModalTablaVentasPendientes);
            }
            $scope.imprimirListaVencimientoProductos = function (vencimientosProductos) {
                blockUI.start();
                // console.log(vencimientosProductos);
                var doc = new PDFDocument({ size: 'letter', margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text
                var saldoFisico = 0;
                var saldoValuado = 0;

                var y = 140, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(vencimientosProductos.length / itemsPorPagina);
                $scope.dibujarCabeceraPDFVencimientoProductos(doc, 1, totalPaginas, vencimientosProductos);
                for (var i = 0; i < vencimientosProductos.length && items <= itemsPorPagina; i++) {

                    doc.rect(30, y - 10, 555, 20).stroke();
                    doc.font('Helvetica', 7);
                    if (vencimientosProductos[i].producto.codigo == null) {
                        doc.text("", 40, y);
                    } else {
                        doc.text(vencimientosProductos[i].producto.codigo, 40, y);
                    }
                    //
                    doc.text(vencimientosProductos[i].producto.nombre, 120, y - 6, { width: 140 });
                    vencimientosProductos[i].fecha_vencimiento = new Date(vencimientosProductos[i].fecha_vencimiento);
                    doc.text(vencimientosProductos[i].producto.unidad_medida, 260, y, { width: 50 });
                    doc.text(vencimientosProductos[i].almacen.sucursal.nombre, 305, y - 6, { width: 60 });
                    doc.text(vencimientosProductos[i].almacen.nombre, 375, y - 6, { width: 60 });
                    doc.text(vencimientosProductos[i].fecha_vencimiento.getDate() + "/" + (vencimientosProductos[i].fecha_vencimiento.getMonth() + 1) + "/" + vencimientosProductos[i].fecha_vencimiento.getFullYear(), 445, y, { width: 50 });
                    doc.text(vencimientosProductos[i].lote, 490, y, { width: 50 });
                    doc.text(vencimientosProductos[i].cantidad, 540, y, { width: 50 });
                    doc.text(vencimientosProductos[i].producto.descuento + "%", 560, y, { width: 50 });
                    y = y + 20;
                    items++;

                    if (items == itemsPorPagina) {
                        doc.addPage({ margin: 0, bufferPages: true });
                        y = 140;
                        items = 0;
                        pagina = pagina + 1;

                        $scope.dibujarCabeceraPDFVencimientoProductos(doc, pagina, totalPaginas, vencimientosProductos);

                        doc.font('Helvetica', 7);
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }

            $scope.dibujarCabeceraPDFVencimientoProductos = function (doc, pagina, totalPaginas, vencimientosProductos) {
                var fechaActual = new Date();
                var min = fechaActual.getMinutes();
                if (min < 10) {
                    min = "0" + min;
                }
                doc.font('Helvetica-Bold', 10);
                doc.text($scope.usuario.empresa.razon_social, 0, 35, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("COCHABAMBA - BOLIVIA", 0, 50, { align: "center" });
                doc.font('Helvetica-Bold', 10);
                doc.text("LISTA DE VENCIMIENTOS PRODUCTOS", 0, 65, { align: "center" });
                doc.rect(210, 75, 180, 0);
                doc.font('Helvetica-Bold', 7);
                doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
                doc.rect(30, 100, 555, 30).stroke();
                doc.font('Helvetica-Bold', 8);
                doc.text("Codigo", 45, 110);
                doc.text("Productos", 120, 110, { width: 50 });
                doc.text("Unid. de Medida", 260, 110, { width: 40 });
                doc.text("Sucursal", 310, 110, { width: 60 });
                doc.text("Almacen", 370, 110, { width: 60 });
                doc.text("Venc.", 440, 110, { width: 60 });
                doc.text("Lote", 490, 110, { width: 50 });
                doc.text("Cant.", 530, 110, { width: 50 });
                doc.text("Desc.", 550, 110, { width: 50 });
                doc.font('Helvetica', 7);
                doc.text("usuario : " + $scope.usuario.nombre_usuario, 475, 740);
                doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 475, 750);
            }
            $scope.imprimirListaVencimientoCreditos = function (vencimientosCreditos) {
                blockUI.start();

                var doc = new PDFDocument({ size: 'letter', margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text
                var saldoFisico = 0;
                var saldoValuado = 0;

                var y = 140, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(vencimientosCreditos.length / itemsPorPagina);
                $scope.dibujarCabeceraPDFVencimientoCreditos(doc, 1, totalPaginas, vencimientosCreditos);
                for (var i = 0; i < vencimientosCreditos.length && items <= itemsPorPagina; i++) {

                    doc.rect(30, y - 10, 555, 20).stroke();
                    doc.font('Helvetica', 8);
                    if (vencimientosCreditos[i].cliente.codigo == null) {
                        doc.text("", 45, y, { width: 50 });
                    } else {
                        doc.text(vencimientosCreditos[i].cliente.codigo, 45, y, { width: 50 });
                    }
                    doc.text(vencimientosCreditos[i].cliente.razon_social, 100, y);
                    if (vencimientosCreditos[i].factura == null) {
                        doc.text("Proforma", 280, y);
                    } else {
                        doc.text("Factura Nro. " + vencimientosCreditos[i].factura, 280, y);
                    }
                    vencimientosCreditos[i].fecha = new Date(vencimientosCreditos[i].fecha);
                    doc.text(vencimientosCreditos[i].fecha.getDate() + "/" + (vencimientosCreditos[i].fecha.getMonth() + 1) + "/" + vencimientosCreditos[i].fecha.getFullYear(), 400, y, { width: 50 });
                    doc.text(vencimientosCreditos[i].saldo, 500, y, { width: 50, align: "right" });
                    y = y + 20;
                    items++;

                    if (items == itemsPorPagina) {
                        doc.addPage({ margin: 0, bufferPages: true });
                        y = 140;
                        items = 0;
                        pagina = pagina + 1;

                        $scope.dibujarCabeceraPDFVencimientoCreditos(doc, pagina, totalPaginas, vencimientosCreditos);

                        doc.font('Helvetica', 8);
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }

            $scope.dibujarCabeceraPDFVencimientoCreditos = function (doc, pagina, totalPaginas, vencimientosCreditos) {
                var fechaActual = new Date();
                var min = fechaActual.getMinutes();
                if (min < 10) {
                    min = "0" + min;
                }
                doc.font('Helvetica-Bold', 10);
                doc.text($scope.usuario.empresa.razon_social, 0, 35, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("COCHABAMBA - BOLIVIA", 0, 50, { align: "center" });
                doc.font('Helvetica-Bold', 10);
                doc.text("LISTA DE VENCIMIENTOS CLIENTE", 0, 65, { align: "center" });
                doc.rect(210, 75, 180, 0);
                doc.font('Helvetica-Bold', 8);
                doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
                doc.rect(30, 100, 555, 30).stroke();
                doc.font('Helvetica-Bold', 8);
                doc.text("Codigo", 45, 110);
                doc.text("Cliente", 100, 110, { width: 50 });
                doc.text("Detalle", 280, 110, { width: 60 });
                doc.text("Vencimiento", 400, 110, { width: 50 });
                doc.text("monto", 525, 110, { width: 50 });
                doc.font('Helvetica', 7);
                doc.text("usuario : " + $scope.usuario.nombre_usuario, 475, 740);
                doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 475, 750);
            }
            $scope.imprimirListaVencimientoDeudas = function (vencimientosDeudas) {
                blockUI.start();

                var doc = new PDFDocument({ size: 'letter', margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text
                var saldoFisico = 0;
                var saldoValuado = 0;

                var y = 140, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(vencimientosDeudas.length / itemsPorPagina);
                $scope.dibujarCabeceraPDFVencimientoDeudas(doc, 1, totalPaginas, vencimientosDeudas);
                for (var i = 0; i < vencimientosDeudas.length && items <= itemsPorPagina; i++) {
                    doc.rect(30, y - 10, 555, 20).stroke();
                    doc.font('Helvetica', 8);
                    if (vencimientosDeudas[i].proveedor.codigo == null) {
                        doc.text("", 45, y, { width: 50 });
                    } else {
                        doc.text(vencimientosDeudas[i].proveedor.codigo, 45, y, { width: 50 });
                    }
                    doc.text(vencimientosDeudas[i].proveedor.razon_social, 100, y);
                    if (vencimientosDeudas[i].factura == null) {
                        doc.text("Proforma", 280, y);
                    } else {
                        doc.text("Factura Nro. " + vencimientosDeudas[i].factura, 280, y);
                    }
                    vencimientosDeudas[i].fecha = new Date(vencimientosDeudas[i].fecha);
                    doc.text(vencimientosDeudas[i].fecha.getDate() + "/" + (vencimientosDeudas[i].fecha.getMonth() + 1) + "/" + vencimientosDeudas[i].fecha.getFullYear(), 400, y, { width: 50 });
                    doc.text(vencimientosDeudas[i].saldo, 500, y, { width: 50, align: "right" });
                    y = y + 20;
                    items++;

                    if (items == itemsPorPagina) {
                        doc.addPage({ margin: 0, bufferPages: true });
                        y = 140;
                        items = 0;
                        pagina = pagina + 1;

                        $scope.dibujarCabeceraPDFVencimientoDeudas(doc, pagina, totalPaginas, vencimientosDeudas);

                        doc.font('Helvetica', 8);
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }
            $scope.dibujarCabeceraPDFVencimientoDeudas = function (doc, pagina, totalPaginas, vencimientosDeudas) {
                var fechaActual = new Date();
                var min = fechaActual.getMinutes();
                if (min < 10) {
                    min = "0" + min;
                }
                doc.font('Helvetica-Bold', 10);
                doc.text($scope.usuario.empresa.razon_social, 0, 35, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("COCHABAMBA - BOLIVIA", 0, 50, { align: "center" });
                doc.font('Helvetica-Bold', 10);
                doc.text("LISTA DE VENCIMIENTOS PROVEEDORES", 0, 65, { align: "center" });
                doc.rect(210, 75, 180, 0);
                doc.font('Helvetica-Bold', 8);
                doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
                doc.rect(30, 100, 555, 30).stroke();
                doc.font('Helvetica-Bold', 8);
                doc.text("Codigo", 45, 110);
                doc.text("Proveedor", 100, 110, { width: 50 });
                doc.text("Detalle", 280, 110, { width: 60 });
                doc.text("Vencimiento", 400, 110, { width: 50 });
                doc.text("monto", 525, 110, { width: 50 });
                doc.font('Helvetica', 7);
                doc.text("usuario : " + $scope.usuario.nombre_usuario, 475, 740);
                doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 475, 750);
            }

            $scope.abrirPopupPagoCreditos = function (venta) {
                $scope.venta = venta;

                $scope.pago = null;
                $scope.abrirPopup($scope.idModalPagoP);
            }

            $scope.cerrarPopupPagoCredito = function () {
                $scope.cerrarPopup($scope.idModalPagoP);
            }

            $scope.abrirPopupPagoDeudas = function (compra) {
                $scope.compra = compra;
                $scope.pago = null;
                SweetAlert.swal({
                    title: $scope.compra.proveedor.razon_social.toUpperCase(),
                    html: '<p class="center"> <b>Factura Nro. </b>' + $scope.compra.factura + '</p>' +
                        '<div class="row"><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><p class="text-left"><b>Plazo: </b>' + $scope.compra.dias_credito + ' Dias</p></div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><p class="text-left"><b>A cuenta: </b>Bs.' + $scope.compra.a_cuenta + '</p></div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><p class="text-left"><b>Saldo: </b>Bs.' + $scope.compra.saldo + '</p></div><div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"><p class="text-left"><b>Deuda: </b>Bs.' + $scope.compra.total + '</p></div></div>' +
                        '<div class="row"><div class="input-group input-group-lg"><input type="number" required  min="0.0001" id="pago" class="form-control" placeholder="Ingrese importe"><span class="input-group-btn"><button type="button" class="btn btn-warning btn-sm" id="asignarMax">100% </button></span></div></div>',
                    confirmButtonText: 'Pagar',
                    showCancelButton: true,
                    cancelButtonText: 'Cerrar',
                    showLoaderOnConfirm: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#28a746',
                    preConfirm: () => {

                        let pago = SweetAlert.getContent().querySelector('#pago').value
                        if (pago == "" || pago == null) {
                            SweetAlert.showValidationMessage(`Ingrese importe válido`)
                            return false
                        } else {
                            return { pago: pago }
                        }
                    }
                }).then((result) => {
                    if (result.value) {
                        $scope.efectuarPagoVencimientoDeuda(Number(result.value.pago));

                    }
                })
                $("#asignarMax").click(function () {
                    //$scope.pago=$scope.compra.saldo;
                    SweetAlert.getContent().querySelector('#pago').value = $scope.compra.saldo
                });
                // $scope.abrirPopup($scope.idModalPagoDeuda);
            }

            $scope.cerrarPopupPagoDeuda = function () {
                $scope.cerrarPopup($scope.idModalPagoDeuda);
            }


            $scope.realizarPago = function (idVenta, pago, UsuarioIdEmpresa) {
                var restante = 0;
                var saldo = $scope.venta.saldo;
                restante = saldo - $scope.pago;
                if (restante < 0) {
                    restante = restante;
                } else if (restante >= 0) {
                    restante = 0;
                }

                blockUI.start();
                var promesa = PagosVentaCreditos(idVenta, UsuarioIdEmpresa, { pago: pago, id_usuario_cajero: $scope.usuario.id, saldoRestante: restante });
                promesa.then(function (data) {
                    $scope.mostrarMensaje(data.mensaje);
                    $scope.cerrarPopup($scope.ModalMensajePago);
                    $scope.cerrarPopup($scope.idModalPagoP);

                    $scope.imprimirReciboVencimientoCredito(data, data.venta, pago);
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosCreditos.length;
                    $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                    blockUI.stop();
                    /*blockUI.start();
                    VentaEmpresaDatos.update({ id: $scope.venta.id, id_empresa: $scope.usuario.id_empresa }, { pago: pago, id_usuario_cajero: $scope.usuario.id }, function(data) {
                    $scope.mostrarMensaje(data.mensaje);
                    $scope.cerrarPopup($scope.idModalPagoP);
                    $scope.imprimirReciboVencimientoCredito(data, data.venta, pago);
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosCreditos.length;
                    $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                    blockUI.stop();
                }, function(error) {
                    $scope.mostrarMensaje(error);
                    $scope.cerrarPopup($scope.idModalPagoP);
                    $scope.obtenerVentas();
                    blockUI.stop();
                });*/
                })
            }

            $scope.mensaje = function (value) {
                $scope.accion = value;
                if ($scope.accion == true) {
                    $scope.realizarPago($scope.venta.id, $scope.pago, $scope.usuario.id);
                } else {
                    $scope.cerrarPopup($scope.ModalMensajePago);
                }
            }

            $scope.efectuarPagoVencimientoCredito = function (pago) {

                var tipoPago = $scope.usuario.empresa.usar_pago_anticipado;
                $scope.pago = pago;
                if (tipoPago == true) {
                    //usar pagos anticipados
                    if (pago <= $scope.venta.saldo) {
                        $scope.realizarPago($scope.venta.id, pago, $scope.usuario.id_empresa);
                    } else {
                        $scope.abrirPopup($scope.ModalMensajePago);
                    }
                } else {
                    //no usar pagos anticipados
                    if (pago <= $scope.venta.saldo) {
                        $scope.realizarPago($scope.venta.id, pago, $scope.usuario.id);
                    } else {
                        $scope.mostrarMensaje("El cobro excede el monto a cobrar");
                    }
                }
            }

            $scope.realizarPagoDeuda = function (idCompra, pago, idUsuario) {
                var restante = 0;
                var saldo = $scope.compra.saldo;
                restante = saldo - $scope.pago;
                if (restante < 0) {
                    restante = restante;
                } else if (restante >= 0) {
                    restante = 0;
                }
                blockUI.start();
                var promesa = CompraDatosCredito(idCompra, { idSucursal: $scope.compra.almacen.id_sucursal, pago: pago, id_usuario_cajero: idUsuario, saldoRestante: restante });
                promesa.then(function (data) {
                    SweetAlert.swal("", data.mensaje, "success");
                    //$scope.cerrarPopup($scope.ModalMensajePago);
                    $scope.cerrarPopup($scope.idModalPagoDeuda);
                    $scope.imprimirReciboVencimientoDeuda(data, data.compra, pago);
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosDeudas.length;
                    $scope.verificarVencimientosDeudas($scope.usuario.id_empresa);
                    $scope.abrirListaVencimientoDeudas();
                    blockUI.stop();
                })
            }

            $scope.efectuarPagoVencimientoDeuda = function (pago) {
                var tipoPago = $scope.usuario.empresa.usar_pago_anticipado;
                $scope.pago = pago;
                if (tipoPago == true) {
                    //usar pagos anticipados
                    if (pago <= $scope.compra.saldo) {
                        $scope.realizarPagoDeuda($scope.compra.id, pago, $scope.usuario.id);
                    } else {
                        $scope.abrirPopup($scope.ModalMensajePago);
                    }
                } else {
                    //no usar pagos anticipados
                    if (pago <= $scope.compra.saldo) {
                        $scope.realizarPagoDeuda($scope.compra.id, pago, $scope.usuario.id);
                    } else {
                        $scope.mostrarMensaje("El cobro excede el monto a cobrar");
                    }
                }
                /* blockUI.start();
                 Compra.update({ id: $scope.compra.id }, { pago: pago, id_usuario_cajero: $scope.usuario.id }, function(data) {
                     $scope.mostrarMensaje(data.mensaje);
                     $scope.cerrarPopup($scope.idModalPagoDeuda);
                     $scope.imprimirReciboVencimientoDeuda(data, data.compra, pago);
                     $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosDeudas.length;
                     $scope.verificarVencimientosDeudas($scope.usuario.id_empresa);
                     blockUI.stop();
                 }, function(error) {
                     $scope.mostrarMensaje(error);
                     $scope.cerrarPopup($scope.idModalPagoDeuda);
                     $scope.obtenerCompras();
                     blockUI.stop();
                 });*/
            }

            $scope.imprimirReciboVencimientoCredito = function (data, venta, pago, usar_venta_enviada) {
                if (usar_venta_enviada) {
                    $scope.venta = venta
                }
                blockUI.start();
                var doc = new PDFDocument({ size: [227, 353], margin: 10 });
                var stream = doc.pipe(blobStream());
                doc.moveDown(2);
                doc.font('Helvetica-Bold', 8);
                doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.font('Helvetica', 7);
                doc.text(venta.almacen.sucursal.nombre.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.text(venta.almacen.sucursal.direccion.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                var telefono = (venta.almacen.sucursal.telefono1 != null ? venta.almacen.sucursal.telefono1 : "") +
                    (venta.almacen.sucursal.telefono2 != null ? "-" + venta.almacen.sucursal.telefono2 : "") +
                    (venta.almacen.sucursal.telefono3 != null ? "-" + venta.almacen.sucursal.telefono3 : "");
                doc.text("TELF.: " + telefono, { align: 'center' });
                doc.moveDown(0.4);
                doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
                doc.moveDown(0.5);
                doc.font('Helvetica-Bold', 8);
                doc.text("RECIBO", { align: 'center' });
                doc.font('Helvetica', 7);
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                doc.text(venta.almacen.sucursal.nota_recibo_correlativo, { align: 'center' });
                //doc.text("NIT: "+$scope.usuario.empresa.nit,{align:'center'});

                //doc.text("FACTURA No: "+venta.factura,{align:'center'});
                doc.moveDown(0.4);
                //doc.text("AUTORIZACIÓN No: "+venta.autorizacion,{align:'center'});
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                //doc.text(venta.actividad.nombre,{align:'center'});
                doc.moveDown(0.6);
                var date = new Date();
                doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
                doc.moveDown(0.4);
                doc.text("He recibido de : " + $scope.venta.cliente.razon_social, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.2);
                doc.text("       CONCEPTO                                   ", { align: 'left' });
                doc.moveDown(0.2);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                venta.fecha = new Date(venta.fecha);
                doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
                var textoFact = $scope.venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + $scope.venta.factura : "Proforma nro. " + $scope.venta.factura;
                doc.text(textoFact, 105, 210, { width: 100 });
                doc.text("Saldo Bs " + (venta.saldo - pago) + ".-", 105, 220, { width: 100 });
                doc.text("Bs " + pago + ".-", 170, 210, { width: 100 });

                doc.text("--------------", 10, 230, { align: 'right' });
                //oc.text("--------------------",{align:'right'});
                doc.moveDown(0.3);
                doc.text("TOTAL Bs.              " + pago.toFixed(2), { align: 'right' });
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.text("SON: " + data.pago, { align: 'left' });
                doc.moveDown(0.6);

                doc.moveDown(0.4);

                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);

                doc.text("-------------------------                       -------------------------", { align: 'center' });
                doc.text("ENTREGUE CONFORME            RECIBI CONFORME", { align: 'center' });
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
                $scope.venta = undefined
            }
            // $scope.imprimirReciboVencimientoCredito = function (data, venta, pago) {
            // 	blockUI.start();
            // 	var doc = new PDFDocument({ size: [227, 353], margin: 10, compress: false });
            // 	var stream = doc.pipe(blobStream());
            // 	doc.moveDown(2);
            // 	doc.font('Helvetica-Bold', 8);
            // 	doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	doc.font('Helvetica', 7);
            // 	doc.text((venta.almacen !== undefined)?venta.almacen.sucursal.nombre.toUpperCase():(venta.sucursal !== undefined) ? venta.sucursal.nombre.toUpperCase(): 'ERROR', { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	doc.text((venta.almacen !== undefined)?venta.almacen.sucursal.direccion.toUpperCase():(venta.sucursal !== undefined) ? venta.sucursal.direccion.toUpperCase(): 'ERROR', { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	var telefono = (venta.almacen !== undefined)? (venta.almacen.sucursal.telefono1 != null ? venta.almacen.sucursal.telefono1 : "") +
            // 		(venta.almacen.sucursal.telefono2 != null ? "-" + venta.almacen.sucursal.telefono2 : "") +
            // 		(venta.almacen.sucursal.telefono3 != null ? "-" + venta.almacen.sucursal.telefono3 : ""):(venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
            // 		(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
            // 		(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "")
            // 	doc.text("TELF.: " + telefono, { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
            // 	doc.moveDown(0.5);
            // 	doc.font('Helvetica-Bold', 8);
            // 	doc.text("RECIBO", { align: 'center' });
            // 	doc.font('Helvetica', 7);
            // 	doc.moveDown(0.4);
            // 	doc.text("------------------------------------", { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	doc.text((venta.almacen !== undefined) ? venta.almacen.sucursal.nota_recibo_correlativo : venta.sucursal.nota_recibo_correlativo, { align: 'center' });
            // 	//doc.text("NIT: "+$scope.usuario.empresa.nit,{align:'center'});

            // 	//doc.text("FACTURA No: "+venta.factura,{align:'center'});
            // 	doc.moveDown(0.4);
            // 	//doc.text("AUTORIZACIÓN No: "+venta.autorizacion,{align:'center'});
            // 	doc.moveDown(0.4);
            // 	doc.text("------------------------------------", { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	//doc.text(venta.actividad.nombre,{align:'center'});
            // 	doc.moveDown(0.6);
            // 	var date = new Date();
            // 	doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
            // 	doc.moveDown(0.4);
            // 	doc.text("He recibido de : " + ($scope.venta !== undefined) ? $scope.venta.cliente.razon_social : (venta.cliente) ? venta.cliente.razon_social : '', { align: 'left' });
            // 	doc.moveDown(0.4);
            // 	doc.text("---------------------------------------------------------------------------------", { align: 'center' });
            // 	doc.moveDown(0.2);
            // 	doc.text("       CONCEPTO                                   ", { align: 'left' });
            // 	doc.moveDown(0.2);
            // 	doc.text("---------------------------------------------------------------------------------", { align: 'center' });
            // 	doc.moveDown(0.4);
            // 	venta.fecha = new Date(venta.fecha);
            // 	doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
            // 	if ($scope.venta !== undefined) {
            // 		var textoFact = $scope.venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + $scope.venta.factura : "Proforma nro. " + $scope.venta.factura;
            // 	} else {
            // 		var textoFact = venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + $scope.venta.factura : "Proforma nro. " + $scope.venta.factura;	
            // 	}
            // 	doc.text(textoFact, 105, 210, { width: 100 });
            // 	doc.text("Saldo Bs " + (venta.saldo - pago) + ".-", 105, 220, { width: 100 });
            // 	doc.text("Bs " + pago + ".-", 170, 210, { width: 100 });

            // 	doc.text("--------------", 10, 230, { align: 'right' });
            // 	//oc.text("--------------------",{align:'right'});
            // 	doc.moveDown(0.3);
            // 	doc.text("TOTAL Bs.              " + pago.toFixed(2), { align: 'right' });
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.text("SON: " + data.pago, { align: 'left' });
            // 	doc.moveDown(0.6);

            // 	doc.moveDown(0.4);

            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);
            // 	doc.moveDown(0.4);

            // 	doc.text("-------------------------                       -------------------------", { align: 'center' });
            // 	doc.text("ENTREGUE CONFORME            RECIBI CONFORME", { align: 'center' });
            // 	doc.end();
            // 	stream.on('finish', function () {
            // 		var fileURL = stream.toBlobURL('application/pdf');
            // 		window.open(fileURL, '_blank', 'location=no');
            // 	});
            // 	blockUI.stop();
            // }

            $scope.imprimirReciboVencimientoDeuda = function (data, compra, pago) {
                blockUI.start();
                var doc = new PDFDocument({ size: [227, 353], margin: 10 });
                var stream = doc.pipe(blobStream());
                doc.moveDown(2);
                doc.font('Helvetica-Bold', 8);
                doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.font('Helvetica', 7);
                doc.text(compra.almacen.sucursal.nombre.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.text(compra.almacen.sucursal.direccion.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                var telefono = (compra.almacen.sucursal.telefono1 != null ? compra.almacen.sucursal.telefono1 : "") +
                    (compra.almacen.sucursal.telefono2 != null ? "-" + compra.almacen.sucursal.telefono2 : "") +
                    (compra.almacen.sucursal.telefono3 != null ? "-" + compra.almacen.sucursal.telefono3 : "");
                doc.text("TELF.: " + telefono, { align: 'center' });
                doc.moveDown(0.4);
                doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
                doc.moveDown(0.5);
                doc.font('Helvetica-Bold', 8);
                doc.text("PAGO", { align: 'center' });
                doc.font('Helvetica', 7);
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                //doc.text("NIT: "+$scope.usuario.empresa.nit,{align:'center'});
                doc.moveDown(0.4);
                doc.text(compra.almacen.sucursal.nota_recibo_correlativo, { align: 'center' });
                doc.moveDown(0.4);
                //doc.text("AUTORIZACIÓN No: "+venta.autorizacion,{align:'center'});
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                //doc.text(venta.actividad.nombre,{align:'center'});
                doc.moveDown(0.6);
                var date = new Date();
                doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
                doc.moveDown(0.4);
                doc.text("Pagado a : " + $scope.compra.proveedor.razon_social, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.2);
                doc.text("       CONCEPTO                                   ", { align: 'left' });
                doc.moveDown(0.2);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                compra.fecha = new Date(compra.fecha);
                doc.text("Fecha: " + compra.fecha.getDate() + "/" + (compra.fecha.getMonth() + 1) + "/" + compra.fecha.getFullYear(), 15, 210);
                var textoFact = $scope.compra.factura;
                doc.text(textoFact, 105, 210, { width: 100 });
                doc.text("Bs " + pago + ".-", 170, 210, { width: 100 });

                doc.text("--------------", 10, 230, { align: 'right' });
                //oc.text("--------------------",{align:'right'});
                doc.moveDown(0.3);
                doc.text("TOTAL Bs.              " + pago.toFixed(2), { align: 'right' });
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.text("SON: " + data.pago, { align: 'left' });
                doc.moveDown(0.6);

                doc.moveDown(0.4);

                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.moveDown(0.4);

                doc.text("-------------------------                       -------------------------", { align: 'center' });
                doc.text("ENTREGUE CONFORME            RECIBI CONFORME", { align: 'center' });
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.abrirVentanaDescuento = function (inventario) {
                $scope.productoVenc = inventario.producto;
                $scope.abrirPopup($scope.idModalDescuento);
            }

            $scope.guardarDecuento = function (productoVenc) {
                Producto.update({ idProducto: productoVenc.id }, productoVenc, function (res) {
                    $scope.cerrarVentanaDescuento();
                    $scope.mostrarMensaje('Actualizado Exitosamente!');
                });
            }

            $scope.cerrarVentanaDescuento = function () {
                $scope.cerrarPopup($scope.idModalDescuento);
            }

            $scope.guardarBaja = function (bajaInventario) {
                bajaInventario.fecha = new Date($scope.convertirFecha(bajaInventario.fechaTexto));
                blockUI.start();
                var movimiento = bajaInventario.movimiento.nombre_corto;
                bajaInventario.$save(function (res) {
                    $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosProductos.length;
                    $scope.verificarVencimientosProductos($scope.usuario.id_empresa);
                    blockUI.stop();
                    $scope.bajaInventario = null;
                    $scope.mostrarMensaje('Baja registrada exitosamente!');
                    $scope.cerrarEliminarProductoVencido()
                    ImprimirSalida(movimiento, bajaInventario, true, $scope.usuario);
                }, function (error) {
                    blockUI.stop();
                    $scope.bajaInventario = null;
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    $scope.cerrarEliminarProductoVencido()
                });
            }
            $scope.mensaje = $sce.trustAsHtml("Procesando...");
            $scope.mostrarMensaje = function (mensaje) {
                $scope.mensaje = mensaje ? $sce.trustAsHtml(mensaje.replace(/\n/, '<br />')) : mensaje;
                var dialog = $("#mensaje").removeClass('hide').dialog({
                    modal: true,
                    title_html: true,
                    width: "40%",
                    height: 190,
                    appendTo: "body" // evita que el dialog aparesca detras. ???.. parece funcionar!
                });
            }

            $scope.mostrarMensajeEliminar = (mensaje) => {
                $scope.mensaje = mensaje;
                const dialog = $("#mensajeEliminarFactura").removeClass('hide').dialog({
                    modal: true,
                    title_html: true,
                    width: "40%",
                    height: 190,
                    appendTo: "body" // evita que el dialog aparesca detras. ???.. parece funcionar!
                });
            }

            $scope.cerrarConfirmacionEliminado = function () {
                $("#mensajeEliminarFactura").dialog('close');
            }

            $scope.cerrarConfirmacion = function () {
                $("#mensaje").dialog('close');
            }

            /*  $scope.mostrarMensajeFactura = function (mensaje) {
                 $scope.mensaje = mensaje;
                 var dialog = $("#mensajeFactura").removeClass('hide').dialog({
                     modal: true,
                     title_html: true,
                     width: "40%",
                     height: 190,
                     appendTo: "body" // evita que el dialog aparesca detras. ???.. parece funcionar!
                 });
             } */

            $scope.eliminarFactura = (observacion) => {
                const proforma = $scope.dataParam;
                proforma.observacion = observacion;
                blockUI.start();
                const promesa = FacturaProformaEliminar(proforma);
                promesa.then((res) => {
                    blockUI.stop();
                    $scope.mostrarMensaje(res.mensaje)
                    if (res.hasErr || res.err) return;
                    proforma.fecha_factura = null;
                    proforma.factura = null;
                    proforma.autorizacion = null;
                    $scope.dataParam = undefined;
                    $scope.cerrarConfirmacionEliminado();
                }).catch((err) => {
                    blockUI.stop()
                    $scope.dataParam = undefined
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg);

                })
            }

            $scope.abrirPopupConfirmacionEliminacion = function (funcionEliminacion, dataParam) {
                $scope.observacionAnulacion = '';
                const dialog = $("#confirmacion-eliminacion").removeClass('hide').dialog({
                    modal: true,
                    title_html: true,
                    width: "40%",
                    height: 190,
                    appendTo: "body" // evita que el dialog aparesca detras. ???.. parece funcionar!
                });
                $scope.funcionEliminacion = funcionEliminacion;
                $scope.dataParam = dataParam;
            }

            $scope.cerrarConfirmacionAnulacion = function () {
                $("#confirmacion-anulacion").dialog('close');
            }

            $scope.cerrarConfirmacionEliminacion = function () {
                $("#confirmacion-eliminacion").dialog('close');
            }
            $scope.accionarEliminacion = function () {
                $scope.funcionEliminacion($scope.dataParam);
                $scope.cerrarConfirmacionEliminacion();
            }
            $scope.accionarAnulacion = (observacion) => {
                $scope.dataParam.observacion = observacion
                $scope.funcionEliminacion($scope.dataParam, observacion);
                $scope.cerrarConfirmacionAnulacion();
            }
            $scope.PasarWizardOcultos = function (condicionEmpresa, idStep) {
                if (!condicionEmpresa) {
                    var step = $('#' + idStep).attr('class');
                    console.log(step)
                    if (step == "ng-hide active") {
                        $('#siguiente').click();
                    }
                }
            }
            $scope.regresarWizardOcultos = function (condicionEmpresa, idStep) {
                if (!condicionEmpresa) {
                    var step = $('#' + idStep).attr('class');
                    console.log(step)
                    if (step == "ng-hide complete") {
                        $('#anterior').click();
                    }
                }
            }
            $scope.cerrarSesion = function () {
                Sesion.cerrarSesion(function () {
                    var salir = SalirAlias()
                    salir.then(function () {
                        $scope.user = {};
                        $location.path("/");
                        $window.location.reload();
                        $scope.token = $localStorage.token;
                        $scope.usuario = $localStorage.usuario;
                        $scope.abrirPopup($scope.idModalInicioSesion);
                    }).catch(function () {
                        mostrarMensaje('Error... No se puede cerrar session.')
                    })

                }, function () {
                    alert("Failed to logout!");
                });
            }

            $scope.crearPopup = function (idPopup, idImagen) {
                crearPopup(idPopup, idImagen);
            }

            $scope.abrirPopup = function (idPopup) {
                abrirPopup(idPopup);
            }

            $scope.cerrarPopup = function (idPopup) {
                ocultarPopup(idPopup);
            }

            $scope.eliminarPopup = function (idPopup) {
                eliminarPopup(idPopup);
            }
            $scope.number_format = function (numero, decimal) {
                return number_format(numero, decimal)
            }
            $scope.convertirFecha = function (fecha) {
                return convertirFecha(fecha);
            }

            $scope.convertirFechaHora = function (fecha) {
                fech = new Date(fecha)
                var valor = (fech.getMonth() + 1)
                if (valor < 10) {
                    valor = "0" + valor
                }
                var valor2 = fech.getDate()
                if (valor2 < 10) {
                    valor2 = "0" + valor2
                }

                var hours = fech.getHours();
                var minutes = fech.getMinutes();
                var seconds = fech.getSeconds();
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                var fechaText = valor2 + "/" + valor + "/" + fech.getFullYear() + ' ' + hours + ":" + minutes + ":" + seconds;
                return fechaText
            }

            $scope.convertirFechaVenta = function (fecha) {
                return convertirFechaVenta(fecha);
            }

            $scope.sumaFecha = function (dias, fecha) {
                return sumaFecha(dias, fecha);
            }

            $scope.aplicarTabla = function (idTabla, columnas) {
                setTimeout(function () {
                    ejecutarScriptsTabla(idTabla, columnas);
                }, 2000);
            }
            $scope.limpiarMultiSelect = function (modelo) {
                for (var i = 0; i < modelo.length; i++) {
                    modelo[i].ticked = false;
                }
            }
            $scope.resetMultiselect = function () {
                setTimeout(function () {
                    angular.element(document.querySelectorAll('.multiSelect .reset'))[0].click();
                }, 50);
            }
            $scope.ocultarMensajesValidacion = function () {
                $(".ketchup-error").css('display', 'none');
            }

            $scope.obtenerDiaActual = function () {
                var diaActual = new Date().getDay();
                var res;
                if (diaActual == 0) {
                    res = $scope.diccionario.DIA_DOMINGO;
                } else if (diaActual == 1) {
                    res = $scope.diccionario.DIA_LUNES;
                } else if (diaActual == 2) {
                    res = $scope.diccionario.DIA_MARTES;
                } else if (diaActual == 3) {
                    res = $scope.diccionario.DIA_MIERCOLES;
                } else if (diaActual == 4) {
                    res = $scope.diccionario.DIA_JUEVES;
                } else if (diaActual == 5) {
                    res = $scope.diccionario.DIA_VIERNES;
                } else if (diaActual == 6) {
                    res = $scope.diccionario.DIA_SABADO;
                }
                return res;
            }
            $scope.verificarDescuentos = function (detalles) {
                var existe = false;
                for (var i = 0; i < detalles.length; i++) {
                    if (detalles[i].descuento > 0 || detalles[i].recargo > 0 || detalles[i].ice > 0 || detalles[i].excento > 0) {
                        existe = true;
                    }
                }
                return existe;
            }
            /* $scope.imprimirCompra = function (compra) {
                var promesa = DatosCompra(compra.id, $scope.usuario.id_empresa);
                promesa.then(function (datos) {
                    var compraConsultada = datos.compra;
                    compraConsultada.configuracion = datos.configuracion;
                    compraConsultada.sucursal = datos.sucursal;
                    compraConsultada.numero_literal = datos.numero_literal;
                    var fecha = new Date(compraConsultada.fecha);
                    compraConsultada.fechaTexto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
     
     
                    $scope.imprimirFacturaRolloCompra(compraConsultada);
     
                });
            } */

            $scope.loadData = function () {
                // $http.get('recursos/data.json').success(function(data) {
                //     $scope.menu_items = data.menu_items;
                //     $scope.skin = data.skin;
                //     $scope.app_name = data.app_name;
                //     $scope.paragrahp_1 = data.paragrahp_1;
                //     $scope.paragrahp_2 = data.paragrahp_2;
                //     $scope.username_label = data.username_label;
                //     $scope.password_label = data.password_label;
                //     $scope.missing_password_label = data.missing_password_label;
                // });
                $scope.menu_items = [{ "nombre": "Noticias Mundiales", "enlace": "http://www.bbc.com/mundo" },
                { "nombre": "Los Tiempos", "enlace": "http://www.lostiempos.com/" },
                { "nombre": "yahoo", "enlace": "https://login.yahoo.com/?.src=ym&.intl=us&.lang=en-US&.done=https%3a//mail.yahoo.com" },
                { "nombre": "google.com", "enlace": "https://www.google.com/" },
                { "nombre": "facebook.com", "enlace": "https://www.facebook.com/" },
                { "nombre": "hotmail.com", "enlace": "https://login.live.com/" },
                { "nombre": "youtube.com", "enlace": "https://www.youtube.com/?hl=es&gl=ES" }];
                $scope.skin = "no-skin";
                $scope.app_name = "AGIL";
                $scope.paragrahp_1 = "Somos una empresa que cuenta con un amplio portafolio de Soluciones, Especializadas porque sabemos que tu negocio tiene necesidades propias, bien sean a nivel Administrativo Comercial Industrial, Educativo y de Servicios";
                $scope.paragrahp_2 = "Contamos con un equipo multidisciplinario comprometido a generar proyectos con resultados optimos dando siempre lo mejor de cada talento";
                $scope.username_label = "Usuario";
                $scope.password_label = "Contraseña";
                $scope.missing_password_label = "¿Olvidaste tu contraseña?";
                $scope.current_year = new Date().getFullYear();
            }


            $scope.imprimirFacturaRolloCompra = function (compra) {
                var alto;
                if (compra.detallesCompra.length <= 2) {
                    alto = 570;
                } else {
                    alto = 570 + (20 * (compra.detallesCompra.length - 2))
                }
                papel = [227, alto];
                var doc = new PDFDocument({ size: papel, margin: 10 });
                var stream = doc.pipe(blobStream());


                doc.moveDown(2);
                doc.font('Helvetica-Bold', 8);
                doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.font('Helvetica', 7);
                doc.text(compra.almacen.sucursal.nombre.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.text(compra.almacen.sucursal.direccion.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                var telefono = (compra.almacen.sucursal.telefono1 != null ? compra.almacen.sucursal.telefono1 : "") +
                    (compra.almacen.sucursal.telefono2 != null ? "-" + compra.almacen.sucursal.telefono2 : "") +
                    (compra.almacen.sucursal.telefono3 != null ? "-" + compra.almacen.sucursal.telefono3 : "");
                doc.text("TELF.: " + telefono, { align: 'center' });
                doc.moveDown(0.4);
                doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
                doc.moveDown(0.5);
                doc.font('Helvetica-Bold', 8);
                doc.text("NORMAL", { align: 'center' });
                doc.font('Helvetica', 7);
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                doc.text("Nro.  " + compra.factura, { align: 'center' });
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                doc.text(compra.tipoPago.nombre_corto, { align: 'center' });
                doc.moveDown(0.4);
                doc.text("------------------------------------", { align: 'center' });
                doc.moveDown(0.6);
                doc.text("FECHA : " + compra.fechaTexto, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("SEÑOR(ES) : " + compra.proveedor.razon_social, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("NIT/CI : " + compra.proveedor.nit, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.2);
                doc.text("CANT   CONCEPTO                                   P. UNIT.    SUBTOTAL", { align: 'left' });
                doc.moveDown(0.2);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                var y = doc.y, sumaDescuento = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
                for (var i = 0; i < compra.detallesCompra.length; i++) {
                    doc.text(compra.detallesCompra[i].cantidad, 15, y);
                    doc.text(compra.detallesCompra[i].producto.nombre, 35, y, { width: 100 });

                    doc.text(compra.detallesCompra[i].costo_unitario.toFixed(2), 145, y);
                    doc.text(compra.detallesCompra[i].importe.toFixed(2), 180, y);
                    sumaDescuento = sumaDescuento + (compra.detallesCompra[i].tipo_descuento ? (compra.detallesCompra[i].importe * (compra.detallesCompra[i].descuento / 100)) : compra.detallesCompra[i].descuento);
                    sumaRecargo = sumaRecargo + (compra.detallesCompra[i].tipo_recargo ? (compra.detallesCompra[i].importe * (compra.detallesCompra[i].recargo / 100)) : compra.detallesCompra[i].recargo);
                    sumaIce = sumaIce + compra.detallesCompra[i].ice;
                    sumaExcento = sumaExcento + compra.detallesCompra[i].excento;
                    y = y + 20;
                }
                doc.text("--------------", 10, y, { align: 'right' });
                //oc.text("--------------------",{align:'right'});
                doc.moveDown(0.4);
                doc.text("IMPORTE TOTAL Bs.              " + compra.importe.toFixed(2), { align: 'right' });
                doc.moveDown(0.3);
                if (sumaDescuento > 0) {
                    doc.text("DESCUENTO Bs.              " + sumaDescuento.toFixed(2), { align: 'right' });
                }
                doc.moveDown(0.3);
                if (sumaRecargo > 0) {
                    doc.text("RECARGO Bs.              " + sumaRecargo.toFixed(2), { align: 'right' });
                }
                doc.moveDown(0.3);
                if (sumaIce > 0) {
                    doc.text("ICE Bs.              " + sumaIce.toFixed(2), { align: 'right' });
                }
                doc.moveDown(0.3);
                if (sumaExcento > 0) {
                    doc.text("EXCENTO Bs.              " + sumaExcento.toFixed(2), { align: 'right' });
                }
                doc.moveDown(0.3);
                doc.text("TOTAL Bs.              " + compra.total.toFixed(2), { align: 'right' });
                doc.moveDown(0.4);
                doc.moveDown(0.4);
                doc.text("SON: " + compra.numero_literal, { align: 'left' });
                doc.moveDown(0.6);
                var fechaActual = new Date();
                var min = fechaActual.getMinutes();
                if (min < 10) {
                    min = "0" + min;
                }
                doc.text("usuario : " + $scope.usuario.nombre_usuario, 0, y + 205, { align: 'right' });
                doc.moveDown(0.4);
                doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 10, y + 215, { align: 'right' });
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }





            $scope.PopoverCuentasAxiliares = {
                templateUrl: 'PopoverCuentasAxiliares.html',
                title: 'Cuentas Axiliares',
                isOpen: false
            };
            $scope.obtenerCentroCostos = function () {
                blockUI.start();
                if ($scope.usuario.id_empresa) {
                    var promesa = ClasesTipoEmpresa("CENCOS", $scope.usuario.id_empresa);
                    promesa.then(function (entidad) {
                        $scope.centrosDeCostos = entidad.clases
                        $scope.llenarCampamentos($scope.centrosDeCostos)
                        blockUI.stop();
                    });
                } else {
                    blockUI.stop();
                }
            }
            $scope.llenarCampamentos = function (campamentos) {
                $scope.campamento = [];
                if (campamentos) {
                    for (var i = 0; i < campamentos.length; i++) {
                        var campamento = {
                            nombre: campamentos[i].nombre,
                            maker: "",
                            ticked: false,
                            id: campamentos[i].id
                        }
                        $scope.campamento.push(campamento);
                    }
                }

            }

            $scope.obtenerMeses = function () { }
            $scope.obtenerDiaTextoSemana = function (data) {
                var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
                var d = new Date(data);
                return days[d.getDay()];
            }
            $scope.cantidadItems = [{ cantidad: 0, texto: 'Todos' }, { cantidad: 10, texto: '10' }, { cantidad: 25, texto: '25' }, { cantidad: 50, texto: '50' }, { cantidad: 100, texto: '100' }]
            $scope.meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" }, { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
            { id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];

            $scope.mesesFiltro = [{ id: 1, nombre: "Enero" }, { id: 2, nombre: "Febrero" }, { id: 3, nombre: "Marzo" }, { id: 4, nombre: "Abril" }, { id: 5, nombre: "Mayo" }, { id: 6, nombre: "Junio" }, { id: 7, nombre: "Julio" }, { id: 8, nombre: "Agosto" },
            { id: 9, nombre: "Septiembre" }, { id: 10, nombre: "Octubre" }, { id: 11, nombre: "Noviembre" }, { id: 12, nombre: "Diciembre" }];

            const actual_year_diference = (new Date().getFullYear() - 1980)

            $scope.anios = Array.apply(null, Array(actual_year_diference + 1)).map(function (_, i) {
                const start_year = 1980
                const year = { id: start_year + i, nombre: start_year + i }
                return year
            })
            $scope.anios.reverse()

            $scope.fechaATexto = function (fecha, mesLiteral, mesCompleto) {
                if (moment(fecha, 'DD/MM/YYYY', true).isValid()) {
                    fech = new Date($scope.convertirFecha(fecha));
                } else {
                    fech = new Date(fecha);
                }
                var valor = (fech.getMonth() + 1)
                if (valor < 10) {
                    valor = "0" + valor
                }
                var valor2 = fech.getDate()
                if (valor2 < 10) {
                    valor2 = "0" + valor2
                }
                if (isNaN(valor)) {
                    if (mesLiteral) {
                        if (mesCompleto) {
                            fecha = valor2 + " de " + $scope.meses[fech.getMonth()].nombre + " de " + fech.getFullYear();
                        } else {
                            fecha = valor2 + "-" + $scope.meses[fech.getMonth()].nombre.substring(0, 3) + "-" + fech.getFullYear();
                        }
                    } else {
                        fecha = valor2 + "/" + valor + "/" + fech.getFullYear();
                    }
                } else {
                    if (mesLiteral) {
                        if (mesCompleto) {
                            fecha = valor2 + " de " + $scope.meses[fech.getMonth()].nombre + " " + fech.getFullYear();
                        } else {
                            fecha = valor2 + "-" + $scope.meses[fech.getMonth()].nombre.substring(0, 3) + "-" + fech.getFullYear();
                        }
                    } else {
                        fecha = valor2 + "/" + valor + "/" + fech.getFullYear();
                    }
                }
                return fecha
                // $scope.fechaAplicacionVacuna = new Date(convertirFecha(fecha))
            }
            $scope.fechaATiempo = function (fecha) {
                var hours = fecha.getHours();
                var minutes = fecha.getMinutes();
                var seconds = fecha.getSeconds();
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                //Anteponiendo un 0 a los segundos si son menos de 10
                seconds = seconds < 10 ? '0' + seconds : seconds;
                return hours + ":" + minutes + ":" + seconds;  // 2:41:30
            }
            var resto = 0;
            $scope.countPorcentage = function (nloading) {
                if (nloading) {
                    var porcentaje = ((nloading.blockCount * 10) / 100)

                    var restado = 100 - porcentaje.toFixed();
                    return Number(restado);
                } else {
                    return 0;
                }

            }

            $scope.aFechaLarga = function (fecha) {
                if (!fecha) return "";
                fecha = new Date(fecha);
                return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][fecha.getDay()] + ", " + fecha.getDate().toString() + " de " + ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][fecha.getMonth()] + " de " + fecha.getFullYear().toString();

            }
            $scope.aFechaLargaSinDia = function (fecha) {
                if (!fecha) return "";
                fecha = new Date(fecha);
                return fecha.getDate().toString() + " de " + ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][fecha.getMonth()] + " de " + fecha.getFullYear().toString();

            }



            $scope.SumarDiasMesesAñosfecha = function (fecha, intervalo, dma, simbolo) {
                return editar_fecha(fecha, intervalo, dma, simbolo)
            }

            Date.prototype.getWeekNumber = function () {
                var d = new Date(+this);  //Creamos un nuevo Date con la fecha de "this".
                d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
                d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
                //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
                return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
            };

            $scope.verificarActivosFijos = function () {
                if ($scope.usuario.empresa.usar_funciones_erp) {
                    blockUI.start()
                    var prom = VerificacionMensualActivos($scope.usuario.id_empresa)
                    prom.then(function (res) {
                        if (res.hasErr) {
                            $timeout(function () {
                                //$scope.mostrarMensaje('Error al verificar los activos fijos para actualizar: ' + res.mensaje)
                            }, 5000)

                        } else {
                            blockUI.stop()
                            //$scope.mostrarMensaje(res.mensaje)
                        }
                        blockUI.stop()
                    }).catch(function (err) {
                        var mensaje = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
                        $scope.mostrarMensaje(mensaje)
                        blockUI.stop()
                    })
                }
            }

            // $scope.actualizarActivosFijos = function () {

            // }

            $scope.nuevoClientePedido = function () {
                $scope.pedidocliente = new ClientePedido({ id_empresa: $scope.usuario.id_empresa });
                $scope.abrirPopup($scope.idModalNuevoClientePedido);
            }

            $scope.cerrarClientePedido = function () {
                $scope.cerrarPopup($scope.idModalNuevoClientePedido)
            }

            $scope.guardarClientePedido = function (valido, pedidocliente) {
                pedidocliente.telefono = pedidocliente.telefono.toString();
                if (valido) {
                    blockUI.start();

                    pedidocliente.$save(function (res) {
                        if (res.hasError) {
                            blockUI.stop();
                            $scope.mostrarMensaje(res.message);
                        } else {
                            blockUI.stop();
                            $scope.cerrarClientePedido();
                            $scope.establecerCliente(res);
                            $scope.mostrarMensaje('Cliente registrado exitosamente!');
                        }
                    }, function (error) {
                        blockUI.stop();
                        $scope.cerrarClientePedido();
                        $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    });

                }
            }


            $scope.nuevaRazonCliente = function (id_cliente) {
                $scope.clienteRS = new ClientePedidoRazonSocial({ id_cliente: id_cliente });
                $scope.abrirPopup($scope.idModalNuevaRazonCliente);
            }

            $scope.cerrarRazonCliente = function () {
                $scope.cerrarPopup($scope.idModalNuevaRazonCliente);
            }

            $scope.guardarClienteRazonSocial = function (valido, clienteRS) {
                if (valido) {
                    blockUI.start();

                    clienteRS.$save(function (res) {
                        if (res.hasError) {
                            blockUI.stop();
                            $scope.mostrarMensaje(res.message);
                        } else {
                            blockUI.stop();
                            $scope.cerrarRazonCliente();
                            $scope.pedido.cliente_nit = res.nit;
                            $scope.establecerDatosCliente(res.id_cliente);
                            $scope.pedido.cliente_razon = res;
                            $scope.mostrarMensaje('Cliente registrado exitosamente!');
                        }
                    }, function (error) {
                        blockUI.stop();
                        $scope.cerrarRazonCliente();
                        $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    });

                }
            }

            $scope.nuevoDestino = function (id_cliente) {
                $scope.clienteDestino = new ClientePedidoDestino({ id_cliente: id_cliente, id_empresa: $scope.usuario.id_empresa });
                $scope.abrirPopup($scope.idModalNuevoDestino);
            }

            $scope.cerrarNuevoDestino = function () {
                $scope.cerrarPopup($scope.idModalNuevoDestino);
            }
            $scope.abrirModalVerificacionCajaChica = async function () {
                $scope.gestiones = await $scope.obtenerGestiones()
                $scope.solicitudesSeleccionadas = []
                $scope.GetAlertasVerificacionCajachica();
                $scope.abrirPopup($scope.idModalVerificacionCajaChica);
                $scope.$evalAsync()
            }
            $scope.GetAlertasVerificacionCajachica = function (filtro) {
                $scope.paginatorVCC = Paginator();
                $scope.paginatorVCC.column = "fecha";
                $scope.paginatorVCC.direction = "desc";
                $scope.paginatorVCC.itemsPerPage = 10;
                $scope.paginatorVCC.callBack = $scope.obtenerlistaAlertasVerificacionCajachica;
                if (filtro) {
                    var filtros = filtro;
                } else {
                    var filtros = { id_empresa: $scope.usuario.id_empresa, historico: false, mes: "", anio: "" }
                }
                $scope.paginatorVCC.getSearch("", filtros, null);
            }
            $scope.obtenerlistaAlertasVerificacionCajachica = function (filtro2) {
                /*  if (filtro2) {
                     var filtro = filtro2;
                     filtro.id_empresa = $scope.usuario.id_empresa;
                     filtro.anio = filtro.anio ? filtro.anio : 0;
                     filtro.mes = filtro.mes ? filtro.mes : 0;
                 } else {
                     var filtro = { id_empresa: $scope.usuario.id_empresa, historico: false, mes: "", anio: "" }
                 } */
                var promesa = ObtenerAlertasCajaChica($scope.paginatorVCC, $scope.usuario.id);
                promesa.then(function (dato) {
                    $scope.paginatorVCC.setPages(dato.paginas);
                    $scope.alertasCajaChica = dato.solicitudes;
                });
            }

            $scope.cerrarModalVerificacionCajaChica = function () {
                $scope.cerrarPopup($scope.idModalVerificacionCajaChica);
            }

            $scope.establecerDatosCliente = function (clienteid, destinoid) {
                var promesa = GetCliente(clienteid);
                promesa.then(function (dato) {
                    $scope.pedido.clientes_razon = dato.clientes_razon;
                    $scope.pedido.destinos = dato.cliente_destinos;

                    if (destinoid) {
                        var destinoF = $filter('filter')($scope.pedido.destinos, { id: destinoid }, true)[0];
                        $scope.pedido.cliente_destino = destinoF;
                        $scope.obtenerDireccion(destinoF);
                    }

                    blockUI.stop();
                });
            }

            $scope.guardarClienteDestino = function (valido, clienteDestino) {
                if (valido) {
                    blockUI.start();

                    clienteDestino.$save(function (res) {
                        if (res.hasError) {
                            blockUI.stop();
                            $scope.mostrarMensaje(res.message);
                        } else {
                            blockUI.stop();
                            $scope.cerrarNuevoDestino();
                            $scope.establecerDatosCliente(res.id_cliente, res.id);
                            $scope.pedido.cliente_destino = res;

                            $scope.mostrarMensaje('Destino registrado exitosamente!');
                        }
                    }, function (error) {
                        blockUI.stop();
                        $scope.cerrarNuevoDestino();
                        $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    });

                }
            }

            $scope.guardarVerificadorSolicitudes = function (solicitud) {
                if (solicitud) {
                    if (solicitud.select) {
                        var datos = { solicitudes: $scope.solicitudesSeleccionadas, id_verificador: $scope.usuario.id }
                        var promesa = GuardarVerificadorSolicitud($scope.usuario.id_empresa, datos)
                        promesa.then(function (dato) {
                            $scope.mostrarMensaje(dato.mensaje)
                            $scope.GetAlertasVerificacionCajachica()
                            $scope.solicitudesSeleccionadas = []
                        })
                    }
                } else {
                    if ($scope.solicitudesSeleccionadas.length > 0) {
                        var datos = { solicitudes: $scope.solicitudesSeleccionadas, id_verificador: $scope.usuario.id }
                        var promesa = GuardarVerificadorSolicitud($scope.usuario.id_empresa, datos)
                        promesa.then(function (dato) {
                            $scope.mostrarMensaje(dato.mensaje)
                            $scope.GetAlertasVerificacionCajachica()
                            $scope.solicitudesSeleccionadas = []
                        })
                    }
                }
            }
            $scope.seleccionarSolicitudesAVerificar = function (solicitud) {
                if (solicitud.select == false) {
                    solicitud.select = false
                    $scope.solicitudesSeleccionadas.splice($scope.solicitudesSeleccionadas.indexOf(solicitud))
                } else {
                    solicitud.select = true
                    $scope.solicitudesSeleccionadas.push(solicitud)

                }
            }

            /*$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
              //Change page title, based on Route information
              $rootScope.title = $route.current.title;
            });*/

            $scope.inicio = function (paramValue) {

                $scope.loadData();
                $scope.localLang = {
                    selectAll: "Marcar todo",
                    selectNone: "No marcar ninguno",
                    reset: "Deshacer todo",
                    search: "Escriba aquí para buscar...",
                    nothingSelected: "No se ha seleccionado nada"
                };
                $scope.arregloTipoGrafico = [{ tipo: "column", nombre: "Gráfico de columnas" },
                { tipo: "doughnut", nombre: "Gráfico de donas" },
                { tipo: "line", nombre: "Gráfico de linea" },
                { tipo: "splineArea", nombre: "Gráfico de área de spline" },
                { tipo: "stepArea", nombre: "Gráfico de pasos en area" },
                { tipo: "stepLine", nombre: "Gráfico de pasos en linia" },
                { tipo: "bar", nombre: "Gráfico de barra" },
                { tipo: "pie", nombre: "Gráfico de circular" }]

                $rootScope.abs = $window.Math.abs;

                if ($localStorage.usuario) {
                    $scope.usuario = JSON.parse($localStorage.usuario);
                    $scope.ComprobanteGuardado = $localStorage.nuevoComprobante
                    // console.log($scope.ComprobanteGuardado)
                    // console.log($scope.usuario)
                    if (!$scope.aplicaciones) {
                        $scope.cargarPagina();
                    }
                    $scope.sucursales = $scope.obtenerSucursales();
                } else {
                    var paramValue = $location.$$url.split('/')[1];
                    if (paramValue == "mailer") {
                        // $scope.ocultarFormularioInicioSesion();
                    } else {
                        $scope.abrirPopup($scope.idModalInicioSesion);
                    }
                }
                $scope.ocultarMenu = true;
                $scope.dynamicPopoverCentrosCostoLC = {
                    templateUrl: 'popoverTemplateCentrosCostoLC.html',
                    title: 'Centros de costo'
                };

            }
            $scope.currentPage = 0
            $scope.pagesLibroMayor = []
            $scope.DatosLibroMayor = []
            $scope.pagesLibroMayor = []
            $scope.numberOfPages = 0
            $scope.capitalizar = function (texto) {
                return texto.replace(/(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])([a-záéíóúüñ])/g, c => c.toUpperCase());
            }

            $scope.imprimirFiltroCajaCartaOficio = function (asiento, filtro) {

                var doc = new PDFDocument({ size: [612, 792], margin: 10, compress: false }); //{compress: false},
                var stream = doc.pipe(blobStream());

                var y = 135, itemsPorPagina = 28, items = 0, pagina = 1, totalPaginas = Math.round(asiento.length / itemsPorPagina);
                totalPaginas = totalPaginas + 1;
                $scope.dibujarCabeceraPDFLibrosMayores(doc, pagina, totalPaginas, asiento, filtro);
                var index = 0;
                for (var i = 0; i < asiento.length && items <= itemsPorPagina; i++) {

                    doc.font('Helvetica', 8);
                    index = index + 1;
                    doc.text(index, 45, y);
                    doc.text(asiento[i].codigo, 70, y);
                    doc.text(capitalize(asiento[i].nombre.toLowerCase()), 120, y);
                    doc.text(asiento[i].clasificacion.nombre, 410, y);
                    doc.text(capitalize(asiento[i].tipoCuenta.nombre.toLowerCase()), 475, y);

                    y = y + 15;
                    items++;

                    if (items > itemsPorPagina) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 125;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFLibrosMayores(doc, pagina, totalPaginas, asiento, filtro);
                    }
                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });

            }

            $scope.dibujarCabeceraPDFLibrosMayores = function (doc, pagina, totalPaginas, asiento, filtro) {
                doc.font('Helvetica-Bold', 15);
                doc.text("PLAN DE CUENTAS", 0, 40, { align: 'center' });
                var clasificacion = "";
                if (filtro.clasificacion == 10) {
                    clasificacion = "ACTIVO";
                } else if (filtro.clasificacion == 15) {
                    clasificacion = "PASIVO";
                } else if (filtro.clasificacion == 16) {
                    clasificacion = "CAPITAL";
                } else if (filtro.clasificacion == 17) {
                    clasificacion = "INGRESO";
                } else if (filtro.clasificacion == 18) {
                    clasificacion = "EGRESO";
                } else {
                    clasificacion = "TODOS"
                }
                var tipo_cuenta = "";
                if (filtro.tipo_cuenta == 731) {
                    tipo_cuenta = "GRUPO";
                } else if (filtro.tipo_cuenta == 732) {
                    tipo_cuenta = "APROPIACION";
                } else if (filtro.tipo_cuenta == 733) {
                    tipo_cuenta = "GENERICA";
                } else if (filtro.tipo_cuenta == 734) {
                    tipo_cuenta = "SUBGRUPO";
                } else if (filtro.tipo_cuenta == 1407) {
                    tipo_cuenta = "MOVIMIENTO";
                } else if (filtro.tipo_cuenta == 2308) {
                    tipo_cuenta = "SUB GRUPO";
                } else {
                    tipo_cuenta = "TODOS";
                }
                var fecha = new Date();
                doc.font('Helvetica', 10);
                doc.text('CLASIFICACIÓN: ' + clasificacion, 0, 67, { align: "center" });
                doc.text('TIPO DE CUENTA: ' + tipo_cuenta, 0, 85, { align: "center" })
                doc.font('Helvetica-Bold', 8);
                doc.text('Fecha: ', 40, 100);
                doc.font('Helvetica', 8);
                doc.text($scope.fechaATexto(fecha), 70, 100);
                doc.rect(40, 110, 532, 18).stroke();
                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 45, 115);
                doc.text("Código", 70, 115);
                doc.text("Nombre", 120, 115);
                doc.text("Clasificación", 400, 115);
                doc.text("Tipo De Cuenta", 470, 115);
                doc.font('Helvetica', 8);
                doc.text("Pagina " + pagina + " de " + totalPaginas, 0, 765, { align: 'center' });
                var usuario = $scope.usuario;
                doc.text("Usuario: " + usuario.nombre_usuario + ", Hora: " + $scope.fechaATexto(fecha) + " - " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(), 400, 750);
            }

            $scope.imprimirFiltroExcelCajaCartaOficio = function (asiento) {

                blockUI.start();

                var data = [["N°", "CODIGO", "NOMBRE", "CLACIFICACION", "TIPO CUENTA"]]
                var index = 0;
                for (var i = 0; i < asiento.length; i++) {
                    var columns = [];
                    index = index + 1;
                    columns.push(index);
                    columns.push(asiento[i].codigo)
                    columns.push(capitalize(asiento[i].nombre.toLowerCase()));
                    columns.push(asiento[i].clasificacion.nombre);
                    columns.push(capitalize(asiento[i].tipoCuenta.nombre.toLowerCase()));

                    data.push(columns);
                }


                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBRO-VENTAS.xlsx");
                blockUI.stop();
            }

            $scope.redondeo = function (numero, decimales) {
                var flotante = parseFloat(numero);
                var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
                return resultado;
            }
            $scope.obtenerDiaSemana = function (dato) {
                return dia_semana(dato)
            }

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }


            //libro compra comprobante

            $scope.abrirModalLibroCompraComprobante = function (asiento) {
                $scope.asientoActualFocus = asiento
                asiento.lc_comp_compra = { asignado: false }
                $scope.lc_comp_compra = {
                    proveedor: {}, descuento_general: false,
                    tipo_descuento: false,
                    descuento: 0,
                    tipo_recargo: false,
                    recargo: 0,
                    ice: 0,
                    excento: 0,
                    asignado: true,
                    descuento_gasolina: false,
                    eliminado: false
                }

                $scope.abrirPopup($scope.IdModalLibroCompraComprobante);
            }
            $scope.abrirModalEdicionLCComprobante = function (asiento, index) {
                $scope.asientoActualFocus = asiento
                $scope.indexCuentaAsientoActual = index
                if (asiento.id) {
                    var promesa = ObtenerCompraAsignadaComprobante(asiento.id);
                    promesa.then(function (dato) {
                        if (dato.compra) {
                            $scope.lc_comp_compra = dato.compra;
                            $scope.lc_comp_compra.asignado = true;
                            $scope.lc_comp_compra.fecha = $scope.fechaATexto($scope.lc_comp_compra.fecha);
                        } else {
                            $scope.lc_comp_compra = {
                                proveedor: {}, descuento_general: false,
                                tipo_descuento: false,
                                descuento: 0,
                                tipo_recargo: false,
                                recargo: 0,
                                ice: 0,
                                excento: 0,
                                asignado: true,
                                elimiado: false,
                                descuento_gasolina: false,
                                eliminado: false
                            }
                        }
                    })
                } else {
                    $scope.lc_comp_compra = asiento.lc_comp_compra.asignado ? asiento.lc_comp_compra : $scope.lc_comp_compra;
                }
                $scope.abrirPopup($scope.IdModalLibroCompraComprobante);
            }
            $scope.cerrarModalLibroCompraComprobante = function () {
                $scope.cerrarPopup($scope.IdModalLibroCompraComprobante)
            }
            $scope.generarDescuentoGasolinaLCC = function () {
                $scope.lc_comp_compra.descuento_gasolina = !$scope.lc_comp_compra.descuento_gasolina
                if ($scope.lc_comp_compra.descuento_gasolina) {
                    $scope.lc_comp_compra.descuento_general = true
                    $scope.lc_comp_compra.excento = $scope.lc_comp_compra.importe * 0.3
                    $scope.calcularImporteGeneralLCC()
                } else {
                    $scope.lc_comp_compra.excento = 0
                    $scope.calcularImporteGeneralLCC()
                }
            }
            $scope.buscarProveedorRazonLCC = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
                    return promesa
                }
            };
            $scope.buscarProveedorNitLCC = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
                    var p = promesa.then(function (datos) {
                        if (datos.length == 1) {
                            $scope.establecerProveedorLCC(datos[0])
                            $scope.enfocar('factura_cc')
                            return []
                        } else if (datos.length > 1) {
                            return promesa
                        } else {
                            $scope.lc_comp_compra.proveedor = { nit: $scope.lc_comp_compra.proveedor.nit, razon_social: $scope.lc_comp_compra.proveedor.razon_social }
                            $scope.MensajeProvedorNit = true
                        }
                    })
                    return p;
                }
            };
            $scope.establecerProveedorLCC = function (proveedor) {
                if (proveedor.id) {
                    $scope.MensajeProvedorNit = false
                } else {
                    $scope.MensajeProvedorNit = true
                }
                $scope.lc_comp_compra.proveedor = proveedor
            }
            $scope.activarDescuentosLCC = function () {
                if (!$scope.lc_comp_compra.descuento_general) {
                    $scope.lc_comp_compra.descuento = 0;
                    $scope.lc_comp_compra.recargo = 0;
                    $scope.lc_comp_compra.ice = 0;
                    $scope.lc_comp_compra.excento = 0;
                    $scope.lc_comp_compra.descuento_gasolina = false
                    $scope.calcularImporteGeneralLCC()
                }
            }
            $scope.calcularImporteGeneralLCC = function () {
                let descuento, recargo;
                if ($scope.lc_comp_compra.tipo_descuento) {
                    descuento = $scope.lc_comp_compra.importe * ($scope.lc_comp_compra.descuento / 100);
                } else {
                    descuento = $scope.lc_comp_compra.descuento ? $scope.lc_comp_compra.descuento : 0;
                }
                if ($scope.lc_comp_compra.tipo_recargo) {
                    recargo = $scope.lc_comp_compra.importe * ($scope.lc_comp_compra.recargo / 100);
                } else {
                    recargo = $scope.lc_comp_compra.recargo ? $scope.lc_comp_compra.recargo : 0;
                }
                $scope.lc_comp_compra.total = Math.round(($scope.lc_comp_compra.importe - descuento + recargo
                    - ($scope.lc_comp_compra.ice ? $scope.lc_comp_compra.ice : 0)
                    - ($scope.lc_comp_compra.excento ? $scope.lc_comp_compra.excento : 0)) * 1000) / 1000;
            }
            $scope.asignarLibroCompraComprobante = async function (tipoAsignacion) {
                try {
                    $scope.lc_comp_compra.fecha2 = new Date($scope.convertirFecha($scope.lc_comp_compra.fecha))
                    $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].lc_comp_compra = $scope.lc_comp_compra
                    if (!$scope.lc_comp_compra.proveedor.id) {
                        const res = await GuardarProveedorCompraComprobante($scope.lc_comp_compra.proveedor, $scope.usuario.id_empresa);
                        toastr.success(res.mensaje);
                        $scope.lc_comp_compra.proveedor = res.proveedorNuevo
                        $scope.listaCuentasAuxiliaresClientes = await $scope.obtenerListarCuentasAuxiliares('CLIENTE')
                        $scope.listaCuentasAuxiliaresProveedor = await $scope.obtenerListarCuentasAuxiliares('PROVEEDOR')
                        $scope.listaCuentasAuxiliaresEmpleado = await $scope.obtenerListarCuentasAuxiliares('EMPLEADO')
                        $scope.MensajeProvedorNit = false
                    }
                    if ($scope.asientoActualFocus.cuenta.cuenta_vinculada_lc) {
                        if (tipoAsignacion) {
                            $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].cuenta = await $scope.buscarCuentaVinculanteLc($scope.asientoActualFocus.cuenta.cuenta_vinculada_lc)
                            $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].debe_bs = $scope.lc_comp_compra.total * 0.13
                            if ($scope.nuevoComprobante.copia_glosa) {
                                $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual + 1].glosa = $scope.nuevoComprobante.gloza
                            }
                        }
                        $scope.nuevoComprobante.asientosContables[$scope.indexCuentaAsientoActual].debe_bs = $scope.lc_comp_compra.total * 0.87 + $scope.lc_comp_compra.excento + $scope.lc_comp_compra.ice

                        $scope.agregarAsiento($scope.asientoActualFocus)
                        $scope.cal($scope.nuevoComprobante.asientosContables)
                        $scope.$evalAsync()
                        $scope.cerrarModalLibroCompraComprobante();
                    }
                } catch (error) {
                    toastr.warning(error);
                }
            }
            $scope.obtenerConfigudarcionesCuentaEmpresa = async function () {
                try {
                    var entidad = await ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
                    return entidad.lista;
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.ObtenerPlantillasCuenta = async function () {
                try {
                    plantillasCuentasCompobante = {
                        retencionServicios: { it: {}, iue: {}, servicio: {} },
                        retencionBienesGasto: { it: {}, iue: {}, gasto: {} },
                        retencionBienes: { it: {}, iue: {}, almacen: {} },
                        egreso: { ivacf: {}, cajaBanco: {} },
                        ingreso: { ivadf: {}, it: {}, itPorPagar: {}, cajaBanco: {} },
                        facturasAnuladasDDJJ: { ivadf: {}, ingreso: {}, cajaBanco: {} },
                        PlanillaDeSueldo: { sueldo: {}, sueldoPorPagar: {}, seguroSocialAfp: {}, rcIvaDependiente: {}, anticipoPersona: {}, }
                    }
                    var entidad = await ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
                    for (const lista of entidad.lista) {
                        if ($scope.diccionario.IVA_DF == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                            plantillasCuentasCompobante.ingreso.ivadf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                            plantillasCuentasCompobante.ingreso.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IT_POR_PAGAR == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                            plantillasCuentasCompobante.ingreso.itPorPagar = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                            plantillasCuentasCompobante.ingreso.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IVA_CF == lista.nombre && $scope.diccionario.MOV_EGR == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "EGRESOS") {
                            plantillasCuentasCompobante.egreso.ivacf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_EGR == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "EGRESOS") {
                            plantillasCuentasCompobante.egreso.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                            plantillasCuentasCompobante.retencionBienes.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                            plantillasCuentasCompobante.retencionBienes.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CUENTA_ALMACEN_RETENCION_BIEN == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                            plantillasCuentasCompobante.retencionBienes.almacen = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                            plantillasCuentasCompobante.retencionBienesGasto.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                            plantillasCuentasCompobante.retencionBienesGasto.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CUENTA_GASTO_RETENCION_BIEN == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                            plantillasCuentasCompobante.retencionBienesGasto.gasto = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                            plantillasCuentasCompobante.retencionServicios.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                            plantillasCuentasCompobante.retencionServicios.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CUENTA_RETENCION_SERVICIO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                            plantillasCuentasCompobante.retencionServicios.servicio = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.INGRESO_REVERTIDO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                            plantillasCuentasCompobante.facturasAnuladasDDJJ.ingreso = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.IVA_DF_REVERTIDO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                            plantillasCuentasCompobante.facturasAnuladasDDJJ.ivadf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                        if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                            plantillasCuentasCompobante.facturasAnuladasDDJJ.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                        }
                    }
                    return plantillasCuentasCompobante
                } catch (error) {
                    console.log(error)
                }


            }
            $scope.buscarCuentaVinculanteLc = async function (query) {
                if (query != "" && query != undefined) {
                    data = await ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, query);
                    if (data.length == 1) {
                        return data[0]
                    }
                }
            }
            $scope.registrarFuentePdfKit = async function (doc, src, fontName) {
                const font = await fetch(src)
                const arrayBuffer = await font.arrayBuffer()
                doc.registerFont(fontName, arrayBuffer);
                return doc;
            }

            $scope.fechasIncorrectaInic = false;
            $scope.validarFechaI = function (inicio, fin) {
                let fechI = new Date($scope.convertirFechaVenta(inicio));
                if (fin) {
                    let fechF = new Date($scope.convertirFechaVenta(fin));
                    if (fechI > fechF) {
                        toastr.warning("Fecha inicio no puedes ser mayor a fecha fin");
                        $scope.fechasIncorrectaInic = true;
                    } else {
                        $scope.fechasIncorrectaInic = false;
                        $scope.fechasIncorrectaFin = false;
                    }
                } else {
                    toastr.warning("Seleccione Fecha fin");
                    $scope.fechasIncorrectaFin = true;
                }
            }

            $scope.fechasIncorrectaFin = false;
            $scope.validarFechaF = function (inicio, fin) {
                let fechF = new Date($scope.convertirFechaVenta(fin));
                if (inicio) {
                    let fechI = new Date($scope.convertirFechaVenta(inicio));
                    if (fechF < fechI) {
                        toastr.warning("Fecha fin no puedes ser menor a fecha inicio");
                        $scope.fechasIncorrectaFin = true;
                    } else {
                        $scope.fechasIncorrectaFin = false;
                        $scope.fechasIncorrectaInic = false;
                    }
                } else {
                    toastr.warning("Seleccione Fecha inicio");
                    $scope.fechasIncorrectaInic = true;
                }
            }

            $scope.imprimirIsoOrdenCompra = async (idPedido, version) => {
                if (!!idPedido && !!version) {
                    switch (version) {
                        case 1:
                            $scope.imprimirIsoOrdenCompraV1(idPedido);
                            break;
                        case 2:
                            $scope.imprimirIsoOrdenCompraV2(idPedido);
                            break;
                        case 3:
                            $scope.imprimirIsoOrdenCompraV3(idPedido);
                            break;
                        default:
                            SweetAlert.swal("", "Formato ISO del pedido no disponible", "warning");
                            break;
                    }
                } else {
                    SweetAlert.swal("", "No se pudo obtener la configuracion ISO <br> Pedido: " + idPedido + " <br> v: " + version, "warning");
                }
            }
            $scope.imprimirIsoOrdenCompraV1 = async function (idPedido) {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    var datos = await ObtenerRegistroPedidoPorId(idPedido)
                    if (datos.hasErr) {
                        SweetAlert.swal("", "No se encontraron datos del pedido", "warning");
                    } else {
                        var pedido = datos.pedido;
                        blockUI.start();
                        var doc = new PDFDocument({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
                        var stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        var y = 245, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil((pedido.detallesPedido.length + 10) / itemsPorPagina);
                        if (20 >= pedido.detallesPedido.length) {
                            itemsPorPagina = 20;
                        }
                        else {
                            itemsPorPagina = 25;
                        }
                        $scope.dibujarCabeceraIsoOrdenCompraV1(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso);
                        for (var i = 0; i < pedido.detallesPedido.length && items <= itemsPorPagina; i++) {
                            detalle = pedido.detallesPedido[i]
                            doc.font('Bookman', 7);
                            doc.rect(60, y, 507, 20);
                            doc.rect(90.42, y, 0, 20).stroke();
                            doc.rect(156.33, y, 0, 20).stroke();
                            doc.rect(369.27, y, 0, 20).stroke();
                            doc.rect(425.04, y, 0, 20).stroke();
                            doc.rect(480.81, y, 0, 20).stroke();

                            doc.text(i + 1, 65, y + 5, { width: 25 });
                            doc.text(detalle.producto ? detalle.producto.codigo ? detalle.producto.codigo : '' : '', 90.42, y + 5, { width: 65.90, align: 'center' });
                            doc.text(detalle.producto.nombre, 158, y + 5, { width: 211.90 });
                            doc.text(detalle.producto.unidad_medida, 369.27, y + 5, { width: 55.77, align: 'center' });
                            doc.text(detalle.cantidad, 425.04, y + 5, { width: 55.77, align: 'center' });
                            if (detalle.observacion) {
                                if (detalle.observacion.length > 25 && detalle.observacion.length < 50) {
                                    doc.font('Bookman', 5);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 482, y + 3, { width: 85 });
                                } else if (detalle.observacion.length >= 75) {
                                    detalle.observacion = detalle.observacion.slice(0, 75) + '...';
                                    doc.font('Bookman', 4);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 482, y + 1, { width: 85 });
                                } else {
                                    doc.font('Bookman', 6);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 482, y + 5, { width: 85 });
                                }
                            }
                            doc.font('Bookman', 7);
                            y = y + 20;
                            items++;
                            if (items == itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 60;
                                items = 0;
                                pagina = pagina + 1;
                                if (pagina != totalPaginas) itemsPorPagina = 30;
                                if (pagina === totalPaginas) itemsPorPagina = 25;
                                doc.font('Bookman-Bold', 8);
                                doc.text('´', 291, 745);
                                doc.font('Bookman-Italic-Bold', 8);
                                doc.text('Pagina', 284, 745);
                                doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                            }
                        }
                        if (pagina === 1 && pedido.detallesPedido.length > 20 && pedido.detallesPedido.length <= 25) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas - 1 && items > 25 && items <= 30) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas) {
                            doc.font('Bookman-Italic-Bold', 9);
                            doc.text('--------------------------------------------', 60, 712, { width: 162, align: 'center' })
                            doc.text("Responsable de Area", 60, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 232, 712, { width: 162, align: 'center' })
                            doc.text("Jefe de Area", 232, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 404, 712, { width: 162, align: 'center' })
                            doc.text("Gerencia", 404, 720, { width: 162, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 745);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop();
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraIsoOrdenCompraV1 = function (doc, pagina, totalPaginas, pedido, imagenEmpresa, configuracionIso) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso.nombre.toUpperCase(), 164, 70, { width: 267, align: "center" });
                doc.font('Bookman-Italic-Bold', 9);
                doc.text("Codigo:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso.codigo, 283, 95);
                doc.font('Bookman-Bold', 9);
                doc.text('´', 251, 95);
                doc.font('Bookman-Italic', 9);
                doc.text("Revision:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso.revicion, 477, 70);
                doc.font('Bookman-Italic', 9);
                doc.text("Fecha de Aprobacion", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });
                doc.text('´', 463, 70.2);
                doc.text('´', 516, 90.2);
                var y = 125;
                //DETALLE CABECERA
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("N", 436, y);
                doc.font('Helvetica-BoldOblique', 10);
                doc.text(" °:", 442, y + 2);
                doc.font('Bookman', 10);
                doc.text(pedido.numero_iso_orden_compra ? pedido.numero_iso_orden_compra : 'S/N', 455, y);

                y += 20;
                doc.rect(60, y, 507, 60).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Proveedor:", 63, y + 3);
                doc.font('Bookman', 9);
                doc.text(pedido.proveedor ? pedido.proveedor.razon_social : '', 115, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Italic-Bold', 9);
                doc.text("Distintivo:", 63, y + 3);
                doc.font('Bookman-Bold', 9);
                doc.text("Fecha de impresión:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.proveedor) doc.text(pedido.proveedor.razon_social ? pedido.proveedor.razon_social.length < 37 ? pedido.proveedor.razon_social.toUpperCase() : pedido.proveedor.razon_social.slice(0, 35).toUpperCase() + '...' : '', 115, y + 3);

                doc.text($scope.fechaATexto(new Date()), 440, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Almacén:", 63, y + 3);
                doc.text("Fecha emisión:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.almacen) doc.text(pedido.almacen.nombre ? pedido.almacen.nombre.length > 41 ? pedido.almacen.nombre.slice(0, 40).toUpperCase() + '...' : pedido.almacen.nombre.toUpperCase() : '', 115, y + 3);
                doc.text($scope.fechaATexto(pedido.fecha), 440, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Observación:", 63, y + 3);
                doc.text("Fecha de recepción:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.observacion) doc.text(pedido.observacion.length < 37 ? pedido.observacion : pedido.observacion.slice(0, 35) + '...', 126, y + 3);
                doc.text(pedido.fecha_recepcion ? $scope.fechaATexto(pedido.fecha_recepcion) : '', 440, y + 3);
                y = y + 30;
                //CUADROS CUERPO
                doc.rect(60, y, 507, 25).stroke();
                doc.rect(90.42, y, 0, 25).stroke();
                doc.rect(156.33, y, 0, 25).stroke();
                doc.rect(369.27, y, 0, 25).stroke();
                doc.rect(425.04, y, 0, 25).stroke();
                doc.rect(480.81, y, 0, 25).stroke();
                doc.font('Bookman-Bold', 10);
                doc.text('N°', 60, y + 7, { width: 30.42, align: 'center' });
                doc.text('Código del Artículo', 90.42, y + 1, { width: 65.91, align: 'center' });
                doc.text('Descripción', 156.33, y + 7, { width: 212.94, align: 'center' });
                doc.text('Unidad', 369.27, y + 7, { width: 55.77, align: 'center' });
                doc.text('Cantidad', 425.04, y + 7, { width: 55.77, align: 'center' });
                doc.text('Observación', 480.81, y + 7, { width: 86.19, align: 'center' });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('´', 291, 745);
                    doc.font('Bookman-Italic-Bold', 8);
                    doc.text('Pagina', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                }

            };
            $scope.imprimirIsoOrdenCompraV2 = async function (idPedido) {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    var datos = await ObtenerRegistroPedidoPorId(idPedido)
                    if (datos.hasErr) {
                        SweetAlert.swal("", "No se encontraron datos del pedido", "warning");
                    } else {
                        var pedido = datos.pedido;
                        blockUI.start();
                        var doc = new PDFDocument({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
                        var stream = doc.pipe(blobStream());
                        doc.lineWidth(0.75)
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        var y = 245, itemsPorPagina = 25, items = 0, pagina = 1, totalPaginas = Math.ceil((pedido.detallesPedido.length + 5) / itemsPorPagina);
                        if (20 >= pedido.detallesPedido.length) {
                            itemsPorPagina = 20;
                        }
                        else {
                            itemsPorPagina = 25;
                        }
                        $scope.dibujarCabeceraIsoOrdenCompraV2(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                        var totales = 0;
                        for (var i = 0; i < pedido.detallesPedido.length && items <= itemsPorPagina; i++) {
                            detalle = pedido.detallesPedido[i]
                            doc.font('Bookman', 7);
                            doc.rect(60, y, 507, 20);
                            doc.rect(80, y, 0, 20).stroke();
                            doc.rect(140, y, 0, 20).stroke();
                            doc.rect(271, y, 0, 20).stroke();
                            doc.rect(311, y, 0, 20).stroke();
                            doc.rect(351, y, 0, 20).stroke();
                            doc.rect(401, y, 0, 20).stroke();
                            doc.rect(436, y, 0, 20).stroke();
                            doc.rect(481, y, 0, 20).stroke();

                            doc.text(i + 1, 62, y + 5, { width: 18 });
                            doc.text(detalle.producto ? detalle.producto.codigo ? detalle.producto.codigo : '' : '', 80, y + 5, { width: 60, align: 'center' });
                            if (detalle.producto) {
                                if (detalle.producto.nombre.length < 28) doc.text(detalle.producto.nombre, 142, y + 5, { width: 129 });
                                if (detalle.producto.nombre.length > 27 && detalle.producto.nombre.length < 54) doc.text(detalle.producto.nombre, 142, y + 2, { width: 129 });
                                if (detalle.producto.nombre.length > 53) doc.text(detalle.producto.nombre.slice(0, 51) + '...', 142, y + 2, { width: 129 });
                            } else {
                                doc.text(detalle.producto ? detalle.producto.nombre : '', 142, y + 5, { width: 129 });
                            }
                            doc.text(detalle.saldo_inventario != null ? detalle.saldo_inventario : '', 271, y + 5, { width: 38, align: 'right' });
                            doc.text(detalle.producto.unidad_medida ? detalle.producto.unidad_medida : '', 311, y + 5, { width: 38, align: 'right' });
                            doc.text(detalle.cantidad ? detalle.cantidad : '', 351, y + 5, { width: 48, align: 'right' });
                            doc.text(detalle.costo_unitario ? number_format_negativo_to_positvo(detalle.costo_unitario, 2) : '', 401, y + 5, { width: 33, align: 'right' });
                            let total = detalle.cantidad ? detalle.costo_unitario ? detalle.cantidad * detalle.costo_unitario : '' : '';
                            doc.text(total > 0 ? number_format_negativo_to_positvo(total, 2) : '', 436, y + 5, { width: 43, align: 'right' });
                            totales = totales + total;
                            if (detalle.observacion) {
                                if (detalle.observacion.length > 25 && detalle.observacion.length < 50) {
                                    doc.font('Bookman', 5);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 3, { width: 84 });
                                } else if (detalle.observacion.length >= 75) {
                                    detalle.observacion = detalle.observacion.slice(0, 75) + '...';
                                    doc.font('Bookman', 4);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 1, { width: 84 });
                                } else {
                                    doc.font('Bookman', 6);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 5, { width: 84 });
                                }
                            }
                            doc.font('Bookman', 7);
                            y = y + 20;
                            items++;
                            if (items == itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 245;
                                items = 0;
                                pagina = pagina + 1;
                                if (pagina != totalPaginas) itemsPorPagina = 25;
                                if (pagina === totalPaginas) itemsPorPagina = 20;
                                $scope.dibujarCabeceraIsoOrdenCompraV2(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                                doc.font('Bookman-Bold', 8);
                                doc.text('´', 291, 745);
                                doc.font('Bookman-Italic-Bold', 8);
                                doc.text('Pagina', 284, 745);
                                doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                            }
                        }
                        y += 5
                        doc.font('Bookman-Bold', 7);
                        doc.text('TOTAL', 401, y);
                        doc.text(number_format_negativo_to_positvo(totales, 2), 436, y, { width: 43, align: 'right' });
                        if (pagina === 1 && pedido.detallesPedido.length > 20 && pedido.detallesPedido.length <= 25) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 245;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas - 1 && items > 20 && items <= 25) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 245;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas) {
                            $scope.dibujarCabeceraIsoOrdenCompraV2(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                            doc.font('Bookman-Bold', 9);
                            doc.text('--------------------------------------------', 60, 712, { width: 162, align: 'center' })
                            doc.text("Área Solicitante", 60, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 232, 712, { width: 162, align: 'center' })
                            doc.text("Responsable de Área", 232, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 404, 712, { width: 162, align: 'center' })
                            doc.text("Responsable de Compras", 404, 720, { width: 162, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 745);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop()
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraIsoOrdenCompraV2 = function (doc, pagina, totalPaginas, pedido, imagenEmpresa, configuracionIso, items) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] });
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso.nombre.toUpperCase(), 164, 70, { width: 267, align: "center" });
                doc.font('Bookman-Bold', 9);
                doc.text("Código:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso.codigo, 283, 95);
                doc.lineWidth(0.5)
                doc.font('Bookman', 9);
                doc.text("Revisión:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso.revicion, 477, 70);
                doc.font('Bookman', 9);
                doc.text("Fecha de Aprobación", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });

                var y = 125;
                //DETALLE CABECERA
                doc.font('Bookman-Bold', 10);
                doc.text("N°:", 436, y);
                doc.font('Bookman', 10);
                doc.text(pedido.numero_iso_orden_compra ? pedido.numero_iso_orden_compra : 'S/N', 455, y);

                y += 20;
                doc.font('Bookman-Bold', 9);
                doc.text(pedido.almacen ? pedido.almacen.sucursal ? pedido.almacen.sucursal.nombre : '' : '', 60, y - 10);
                doc.rect(60, y, 507, 60).stroke();
                doc.text("Proveedor:", 63, y + 3);
                doc.font('Bookman', 9);
                doc.text(pedido.proveedor ? pedido.proveedor.razon_social : '', 115, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Tipo Pago:", 63, y + 3);
                doc.font('Bookman-Bold', 9);
                doc.text("Fecha emisión:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.tipoPago) doc.text(pedido.tipoPago.nombre ? pedido.tipoPago.nombre.length < 37 ? pedido.tipoPago.nombre.toUpperCase() : pedido.tipoPago.nombre.slice(0, 35).toUpperCase() + '...' : '', 115, y + 3);
                doc.text($scope.fechaATexto(pedido.fecha), 440, y + 3);

                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Almacén:", 63, y + 3);
                doc.text("Fecha de recepción:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                let almSuc = pedido.almacen ? pedido.almacen.sucursal ? pedido.almacen.nombre + '-' + pedido.almacen.sucursal.nombre : pedido.almacen.nombre : ''
                doc.text(almSuc ? almSuc.length > 40 ? almSuc.slice(0, 38).toUpperCase() : almSuc.toUpperCase() : '', 115, y + 3);
                doc.text(pedido.fecha_recepcion ? $scope.fechaATexto(pedido.fecha_recepcion) : '', 440, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Observación:", 63, y + 3);
                doc.text("Destino:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.observacion) doc.text(pedido.observacion.length < 37 ? pedido.observacion : pedido.observacion.slice(0, 35) + '...', 126, y + 3);
                y = y + 30;
                //CUADROS CUERPO
                if (!(items == 0 && pagina === totalPaginas)) {
                    doc.rect(60, y, 507, 25).stroke();
                    doc.rect(80, y, 0, 25).stroke();
                    doc.rect(140, y, 0, 25).stroke();
                    doc.rect(271, y, 0, 25).stroke();
                    doc.rect(311, y, 0, 25).stroke();
                    doc.rect(351, y, 0, 25).stroke();
                    doc.rect(401, y, 0, 25).stroke();
                    doc.rect(436, y, 0, 25).stroke();
                    doc.rect(481, y, 0, 25).stroke();
                    doc.font('Bookman-Bold', 9);
                    doc.text('N°', 60, y + 7, { width: 20, align: 'center' });
                    doc.text('Código del Artículo', 80, y + 0.5, { width: 60, align: 'center' });
                    doc.text('Descripción', 140, y + 7, { width: 131, align: 'center' });
                    doc.text('Saldo', 271, y + 7, { width: 40, align: 'center' });
                    doc.text('Unidad', 311, y + 7, { width: 40, align: 'center' });
                    doc.text('Cantidad', 351, y + 7, { width: 50, align: 'center' });
                    doc.text('PU', 401, y + 7, { width: 35, align: 'center' });
                    doc.text('Total', 436, y + 7, { width: 45, align: 'center' });
                    doc.text('Observación', 481, y + 7, { width: 86, align: 'center' });
                }
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('´', 291, 745);
                    doc.font('Bookman-Italic-Bold', 8);
                    doc.text('Pagina', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                }
                let hoy = new Date();
                let fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
                let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                doc.font('Bookman', 6).text('Fecha Impresión: ' + fecha + ' ' + hora + '    Usuario: ' + $scope.usuario.nombre_usuario, 60, 752);

            };
            $scope.imprimirIsoOrdenCompraV3 = async function (idPedido) {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    var datos = await ObtenerRegistroPedidoPorId(idPedido)
                    if (datos.hasErr) {
                        SweetAlert.swal("", "No se encontraron datos del pedido", "warning");
                    } else {
                        var pedido = datos.pedido;
                        blockUI.start();
                        var doc = new PDFDocument({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
                        var stream = doc.pipe(blobStream());
                        doc.lineWidth(0.75)
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        var y = 245, itemsPorPagina = 25, items = 0, pagina = 1, totalPaginas = Math.ceil((pedido.detallesPedido.length + 5) / itemsPorPagina);
                        if (20 >= pedido.detallesPedido.length) {
                            itemsPorPagina = 20;
                        }
                        else {
                            itemsPorPagina = 25;
                        }
                        $scope.dibujarCabeceraIsoOrdenCompraV3(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                        var totales = 0;
                        for (var i = 0; i < pedido.detallesPedido.length && items <= itemsPorPagina; i++) {
                            detalle = pedido.detallesPedido[i]
                            doc.font('Bookman', 7);
                            doc.rect(60, y, 507, 20);
                            doc.rect(80, y, 0, 20).stroke();
                            doc.rect(140, y, 0, 20).stroke();
                            doc.rect(271, y, 0, 20).stroke();
                            doc.rect(311, y, 0, 20).stroke();
                            doc.rect(351, y, 0, 20).stroke();
                            doc.rect(401, y, 0, 20).stroke();
                            doc.rect(436, y, 0, 20).stroke();
                            doc.rect(481, y, 0, 20).stroke();

                            doc.text(i + 1, 62, y + 5, { width: 18 });
                            doc.text(detalle.producto ? detalle.producto.codigo ? detalle.producto.codigo : '' : '', 80, y + 5, { width: 60, align: 'center' });
                            if (detalle.producto) {
                                if (detalle.producto.nombre.length < 28) doc.text(detalle.producto.nombre, 142, y + 5, { width: 129 });
                                if (detalle.producto.nombre.length > 27 && detalle.producto.nombre.length < 54) doc.text(detalle.producto.nombre, 142, y + 2, { width: 129 });
                                if (detalle.producto.nombre.length > 53) doc.text(detalle.producto.nombre.slice(0, 51) + '...', 142, y + 2, { width: 129 });
                            } else {
                                doc.text(detalle.producto ? detalle.producto.nombre : '', 142, y + 5, { width: 129 });
                            }
                            doc.text(detalle.saldo_inventario != null ? detalle.saldo_inventario : '', 271, y + 5, { width: 38, align: 'right' });
                            doc.text(detalle.producto.unidad_medida ? detalle.producto.unidad_medida : '', 311, y + 5, { width: 38, align: 'right' });
                            doc.text(detalle.cantidad ? detalle.cantidad : '', 351, y + 5, { width: 48, align: 'right' });
                            doc.text(detalle.costo_unitario ? number_format_negativo_to_positvo(detalle.costo_unitario, 2) : '', 401, y + 5, { width: 33, align: 'right' });
                            let total = detalle.cantidad ? detalle.costo_unitario ? detalle.cantidad * detalle.costo_unitario : '' : '';
                            doc.text(total > 0 ? number_format_negativo_to_positvo(total, 2) : '', 436, y + 5, { width: 43, align: 'right' });
                            totales = totales + total;
                            if (detalle.observacion) {
                                if (detalle.observacion.length > 25 && detalle.observacion.length < 50) {
                                    doc.font('Bookman', 5);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 3, { width: 84 });
                                } else if (detalle.observacion.length >= 75) {
                                    detalle.observacion = detalle.observacion.slice(0, 75) + '...';
                                    doc.font('Bookman', 4);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 1, { width: 84 });
                                } else {
                                    doc.font('Bookman', 6);
                                    doc.text(detalle.observacion ? detalle.observacion : "", 483, y + 5, { width: 84 });
                                }
                            }
                            doc.font('Bookman', 7);
                            y = y + 20;
                            items++;
                            if (items == itemsPorPagina) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 245;
                                items = 0;
                                pagina = pagina + 1;
                                if (pagina != totalPaginas) itemsPorPagina = 25;
                                if (pagina === totalPaginas) itemsPorPagina = 20;
                                $scope.dibujarCabeceraIsoOrdenCompraV3(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                            }
                        }
                        y += 5
                        doc.font('Bookman-Bold', 7);
                        doc.text('TOTAL', 401, y);
                        doc.text(number_format_negativo_to_positvo(totales, 2), 436, y, { width: 43, align: 'right' });
                        if (pagina === 1 && pedido.detallesPedido.length > 20 && pedido.detallesPedido.length <= 25) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 245;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas - 1 && items > 20 && items <= 25) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 245;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas) {
                            $scope.dibujarCabeceraIsoOrdenCompraV3(doc, pagina, totalPaginas, pedido, imagenEmpresa, pedido.configuracionesIso, items);
                            doc.font('Bookman-Bold', 9);
                            doc.text('--------------------------------------------', 60, 712, { width: 162, align: 'center' })
                            doc.text("Área Solicitante", 60, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 232, 712, { width: 162, align: 'center' })
                            doc.text("Responsable de Área", 232, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 404, 712, { width: 162, align: 'center' })
                            doc.text("Responsable de Compras", 404, 720, { width: 162, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 750);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 750);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 750);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop()
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraIsoOrdenCompraV3 = function (doc, pagina, totalPaginas, pedido, imagenEmpresa, configuracionIso, items) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] });
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso.nombre.toUpperCase(), 164, 70, { width: 267, align: "center" });
                doc.font('Bookman-Bold', 9);
                doc.text("Código:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso.codigo, 283, 95);
                doc.lineWidth(0.5)
                doc.font('Bookman', 9);
                doc.text("Revisión:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso.revicion, 477, 70);
                doc.font('Bookman', 9);
                doc.text("Fecha de Aprobación", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });

                var y = 125;
                //DETALLE CABECERA
                doc.font('Bookman-Bold', 10);
                doc.text("N°:", 436, y);
                doc.font('Bookman', 10);
                doc.text(pedido.numero_iso_orden_compra ? pedido.numero_iso_orden_compra : 'S/N', 455, y);

                y += 20;
                doc.font('Bookman-Bold', 9);
                doc.text(pedido.almacen ? pedido.almacen.sucursal ? pedido.almacen.sucursal.nombre : '' : '', 60, y - 10);
                doc.rect(60, y, 507, 60).stroke();
                doc.text("Proveedor:", 63, y + 3);
                doc.font('Bookman', 9);
                doc.text(pedido.proveedor ? pedido.proveedor.razon_social : '', 115, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Tipo Pago:", 63, y + 3);
                doc.font('Bookman-Bold', 9);
                doc.text("Fecha emisión:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.tipoPago) doc.text(pedido.tipoPago.nombre ? pedido.tipoPago.nombre.length < 37 ? pedido.tipoPago.nombre.toUpperCase() : pedido.tipoPago.nombre.slice(0, 35).toUpperCase() + '...' : '', 115, y + 3);
                doc.text($scope.fechaATexto(pedido.fecha), 440, y + 3);

                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Almacén:", 63, y + 3);
                doc.text("Fecha de recepción:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                let almSuc = pedido.almacen ? pedido.almacen.sucursal ? pedido.almacen.nombre + '-' + pedido.almacen.sucursal.nombre : pedido.almacen.nombre : ''
                doc.text(almSuc ? almSuc.length > 40 ? almSuc.slice(0, 38).toUpperCase() : almSuc.toUpperCase() : '', 115, y + 3);
                doc.text(pedido.fecha_recepcion ? $scope.fechaATexto(pedido.fecha_recepcion) : '', 440, y + 3);
                y += 15;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text("Observación:", 63, y + 3);
                doc.text("Destino:", 331, y + 3, { width: 100, align: 'right' });
                doc.font('Bookman', 9);
                if (pedido.observacion) doc.text(pedido.observacion.length < 37 ? pedido.observacion : pedido.observacion.slice(0, 35) + '...', 126, y + 3);
                y = y + 30;
                //CUADROS CUERPO
                doc.rect(60, y, 507, 25).stroke();
                doc.rect(80, y, 0, 25).stroke();
                doc.rect(140, y, 0, 25).stroke();
                doc.rect(271, y, 0, 25).stroke();
                doc.rect(311, y, 0, 25).stroke();
                doc.rect(351, y, 0, 25).stroke();
                doc.rect(401, y, 0, 25).stroke();
                doc.rect(436, y, 0, 25).stroke();
                doc.rect(481, y, 0, 25).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text('N°', 60, y + 7, { width: 20, align: 'center' });
                doc.text('Código del Artículo', 80, y + 0.5, { width: 60, align: 'center' });
                doc.text('Descripción', 140, y + 7, { width: 131, align: 'center' });
                doc.text('Saldo', 271, y + 7, { width: 40, align: 'center' });
                doc.text('Unidad', 311, y + 7, { width: 40, align: 'center' });
                doc.text('Cantidad', 351, y + 7, { width: 50, align: 'center' });
                doc.text('PU', 401, y + 7, { width: 35, align: 'center' });
                doc.text('Total', 436, y + 7, { width: 45, align: 'center' });
                doc.text('Observación', 481, y + 7, { width: 86, align: 'center' });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('´', 291, 750);
                    doc.font('Bookman-Italic-Bold', 8);
                    doc.text('Pagina', 284, 750);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 750);
                }
                doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(pedido.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(pedido.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
            };

            $scope.imprimirTraspasoIsoModVentas = async (idTraspaso, version) => {
                if (!!idTraspaso && !!version) {
                    switch (version) {
                        case 1:
                            $scope.imprimirTraspasoIsoV1(idTraspaso);
                            break;
                        case 2:
                            $scope.imprimirTraspasoIsoV2(idTraspaso);
                            break;
                        default:
                            SweetAlert.swal("", "Formato ISO no disponible", "danger");
                            break;
                    }
                } else {
                    SweetAlert.swal("", "No se pudo obtener la configuracion ISO <br> Traspaso: " + idTraspaso + " <br> v: " + version, "warning");
                }
            }
            $scope.imprimirBajaIsoModVentas = async (idBaja, version) => {
                if (!!idBaja && !!version) {
                    switch (version) {
                        case 1:
                            $scope.imprimirBajaIsoV1(idBaja);
                            break;
                        case 2:
                            $scope.imprimirBajaIsoV2(idBaja);
                            break;
                        default:
                            SweetAlert.swal("", "Formato ISO no disponible", "danger");
                            break;
                    }
                } else {
                    SweetAlert.swal("", "No se pudo obtener la configuracion ISO <br> Baja: " + idBaja + " <br> v: " + version, "warning");
                }
            }

            $scope.imprimirTraspasoIsoV1 = async function (id) {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    var dato = await DatosVenta(id, $scope.usuario.id_empresa);
                    if (!dato.venta) {
                        SweetAlert.swal("Error", "Documento ISO traspaso no encontrado", "warning");
                    } else {
                        blockUI.start();
                        var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
                        var stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        var detalle = []
                        var d = dato.venta.detallesVenta.forEach(orden => {
                            var idx = detalle.findIndex(prod => prod.id_producto === orden.id_producto);
                            if (idx != -1) {
                                detalle[idx].cantidad = detalle[idx].cantidad + orden.cantidad;
                            } else {
                                detalle.push(orden);
                            }
                        });
                        var y = 235, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil((detalle.length + 10) / itemsPorPagina);
                        if (20 >= detalle.length) {
                            itemsPorPagina = 20;
                        }
                        else {
                            itemsPorPagina = 25;
                        }
                        $scope.dibujarCabeceraPDFTraspasoSucIso1(doc, pagina, totalPaginas, dato, imagenEmpresa, dato.venta.configuracionesIso);
                        for (var i = 0; i < detalle.length; i++) {
                            detalleTraspaso = detalle[i];
                            doc.font('Bookman', 7);
                            doc.text(i + 1, 60, y + 7, { width: 30, align: "center" });
                            doc.text(detalleTraspaso.producto.codigo, 90, y + 7, { width: 71, align: "center" });
                            if (detalleTraspaso.producto.nombre.length < 35) doc.text(detalleTraspaso.producto.nombre, 163, y + 7, { width: 155 });
                            if (detalleTraspaso.producto.nombre.length >= 35) doc.text(detalleTraspaso.producto.nombre, 163, y + 2, { width: 155 });
                            doc.text(detalleTraspaso.producto.unidad_medida, 318, y + 7, { width: 56, align: "center" });
                            doc.text(detalleTraspaso.cantidad ? number_format_negativo_to_positvo(detalleTraspaso.cantidad, 2) : '', 374, y + 7, { width: 51, align: "right" });
                            if (dato.observacion) {
                                if (dato.observacion.length > 40 && dato.observacion.length < 80) {
                                    doc.font('Bookman', 5);
                                    doc.text(dato.observacion ? dato.observacion.toUpperCase() : "", 430, y + 7 - 2);
                                } else if (dato.observacion.length >= 80) {
                                    doc.font('Bookman', 4);
                                    doc.text(dato.observacion ? dato.observacion.toUpperCase() : "", 430, y + 7 - 3);
                                } else {
                                    doc.font('Bookman', 6);
                                    doc.text(dato.observacion ? dato.observacion.toUpperCase() : "", 430, y + 7);
                                }
                            }

                            doc.font('Bookman', 7);
                            doc.rect(60, y, 507, 20).stroke();
                            doc.rect(90, y, 0, 20).stroke();
                            doc.rect(161, y, 0, 20).stroke();
                            doc.rect(318, y, 0, 20).stroke();
                            doc.rect(374, y, 0, 20).stroke();
                            doc.rect(430, y, 0, 20).stroke();
                            y = y + 20;
                            items++;
                            if (items === itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: "letter", margin: 10, compress: false });
                                items = 0;
                                pagina = pagina + 1;
                                y = 60;
                                if (pagina != totalPaginas) itemsPorPagina = 30;
                                if (pagina === totalPaginas) itemsPorPagina = 25;
                            }

                        }
                        if (pagina === 1 && detalle.length > 20 && detalle.length <= 25) {
                            doc.addPage({ size: "letter", margin: 10, compress: false });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;

                        }
                        if (pagina === totalPaginas - 1 && items > 25 && items <= 30) {
                            doc.addPage({ size: "letter", margin: 10, compress: false });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;

                        }
                        if (pagina === totalPaginas) {
                            doc.font("Bookman-Italic-Bold", 10);
                            doc.text('--------------------------------------------', 60, 720, { width: 160, align: 'center' })
                            doc.text("Despachado por:", 60, 728, { width: 160, align: "center" });
                            doc.text('--------------------------------------------', 233.5, 720, { width: 160, align: 'center' })
                            doc.text("Transportado por:", 233.5, 728, { width: 160, align: "center" });
                            doc.text('--------------------------------------------', 407, 720, { width: 160, align: 'center' })
                            doc.text("Recibido por:", 407, 728, { width: 160, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 745);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                            doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.venta.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(dato.venta.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
                        }
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop();
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraPDFTraspasoSucIso1 = function (doc, pagina, totalPaginas, dato, imagenEmpresa, configuracionIso, esBaja) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso.nombre.toUpperCase(), 164, 70, { width: 267, align: "center" });
                doc.font('Bookman-Italic-Bold', 9);
                doc.text("Codigo:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso.codigo, 283, 95);
                doc.font('Bookman-Bold', 9);
                doc.text('´', 251, 95);
                doc.font('Bookman-Italic', 9);
                doc.text("Revision:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso.revicion, 477, 70);
                doc.font('Bookman-Italic', 9);
                doc.text("Fecha de Aprobacion", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });
                doc.text('´', 463, 70.2);
                doc.text('´', 516, 90.2);

                var y = 130;
                doc.rect(115, y, 12, 10).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text('REMISIÓN', 155, y);
                doc.font('Bookman-Bold', 9);
                if (esBaja) doc.rect(265, y, 12, 10).stroke();
                if (!esBaja) doc.rect(265, y, 12, 10).fillAndStroke('black');
                doc.text('TRASPASO', 305, y);
                doc.font('Bookman-Bold', 9);
                if (esBaja) doc.rect(425, y, 12, 10).fillAndStroke('black');
                if (!esBaja) doc.rect(425, y, 12, 10).stroke();
                doc.text('BAJAS', 465, y);
                y += 25;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Origen: ", 60, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta.almacen ? dato.venta.almacen.sucursal ? dato.venta.almacen.sucursal.nombre.toUpperCase() + ' / ' + dato.venta.almacen.nombre.toUpperCase() : dato.venta.almacen.nombre.toUpperCase() : "", 120, y + 1);
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("N :", 450, y);
                doc.font('Bookman-Bold', 10);

                doc.text("°", 458, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta ? dato.venta.numero_iso_traspaso : '', 470, y + 1);
                y += 15;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Destino: ", 60, y);
                doc.text("Fecha: ", 450, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta.almacenTraspaso ? dato.venta.almacenTraspaso.sucursal ? dato.venta.almacenTraspaso.sucursal.nombre.toUpperCase() + ' / ' + dato.venta.almacenTraspaso.nombre.toUpperCase() : dato.venta.almacenTraspaso.nombre.toUpperCase() : "", 120, y + 1);
                doc.text(dato.venta ? $scope.fechaATexto(dato.venta.fecha) : '', 488, y + 1);
                y += 15;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Observacion: ", 60, y);
                doc.font('Bookman-Bold', 10);
                doc.text("´", 113, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta ? dato.venta.observacion_traspaso.toUpperCase() : '', 135, y + 1, { width: 372 });
                y += 25;

                //CABECERA DETALLE 
                doc.rect(60, y, 507, 25).stroke();
                doc.rect(90, y, 0, 25).stroke();
                doc.rect(161, y, 0, 25).stroke();
                doc.rect(318, y, 0, 25).stroke();
                doc.rect(374, y, 0, 25).stroke();
                doc.rect(430, y, 0, 25).stroke();
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("N", 60, y + 7, { width: 30, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("°", 67, y + 7, { width: 30, align: "center" });
                doc.text("Codigo del Articulo", 90, y + 0.5, { width: 71, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("´", 105, y + 1);
                doc.text("´", 120, y + 14);
                doc.text("Descripcion", 161, y + 7, { width: 157, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("´", 258, y + 7);
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Unidad", 318, y + 7, { width: 56, align: "center" });
                doc.text("Cantidad", 374, y + 7, { width: 56, align: "center" });
                doc.text("Observaciones", 430, y + 7, { width: 137, align: "center" });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('´', 291, 745);
                    doc.font('Bookman-Italic-Bold', 8);
                    doc.text('Pagina', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                    doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.venta.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(dato.venta.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
                }
            }
            $scope.imprimirBajaIsoV1 = async function (id) {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    let dato = await DatosVenta(id, $scope.usuario.id_empresa);
                    if (!dato.venta) {
                        SweetAlert.swal("Error", "Documento ISO Baja no encontrado", "danger");
                    } else {
                        blockUI.start();
                        var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
                        var stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        var detalle = []
                        var d = dato.venta.detallesVenta.forEach(orden => {
                            var idx = detalle.findIndex(prod => prod.id_producto === orden.id_producto);
                            if (idx != -1) {
                                detalle[idx].cantidad = detalle[idx].cantidad + orden.cantidad;
                            } else {
                                detalle.push(orden);
                            }
                        });
                        var y = 235, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil((detalle.length + 10) / itemsPorPagina);
                        if (20 >= detalle.length) {
                            itemsPorPagina = 20;
                        }
                        else {
                            itemsPorPagina = 25;
                        }

                        $scope.dibujarCabeceraPDFBajaSucIso(doc, pagina, totalPaginas, dato, imagenEmpresa, dato.venta.configuracionesIso, true);
                        for (var i = 0; i < detalle.length; i++) {
                            detalleBaja = detalle[i];
                            doc.font('Bookman', 7);
                            doc.text(i + 1, 60, y + 7, { width: 30, align: "center" });
                            doc.text(detalleBaja.producto.codigo, 90, y + 7, { width: 71, align: "center" });
                            if (detalleBaja.producto.nombre.length < 35) doc.text(detalleBaja.producto.nombre, 163, y + 7, { width: 155 });
                            if (detalleBaja.producto.nombre.length >= 35) doc.text(detalleBaja.producto.nombre, 163, y + 2, { width: 155 });
                            doc.text(detalleBaja.producto.unidad_medida, 318, y + 7, { width: 56, align: "center" });
                            doc.text(detalleBaja.cantidad ? number_format_negativo_to_positvo(detalleBaja.cantidad, 2) : '', 374, y + 7, { width: 51, align: "right" });
                            if (detalleBaja.observaciones) {
                                if (detalleBaja.observaciones.length > 40 && detalleBaja.observaciones.length < 80) {
                                    doc.font('Bookman', 5);
                                    doc.text(detalleBaja.observaciones ? detalleBaja.observaciones.toUpperCase() : "", 435, y + 7 - 2);
                                } else if (detalleBaja.observaciones.length >= 80) {
                                    doc.font('Bookman', 4);
                                    doc.text(detalleBaja.observaciones ? detalleBaja.observaciones.toUpperCase() : "", 435, y + 7 - 3);
                                } else {
                                    doc.font('Bookman', 6);
                                    doc.text(detalleBaja.observaciones ? detalleBaja.observaciones.toUpperCase() : "", 435, y + 7);
                                }
                            }

                            doc.font('Bookman', 7);
                            doc.rect(60, y, 507, 20).stroke();
                            doc.rect(90, y, 0, 20).stroke();
                            doc.rect(161, y, 0, 20).stroke();
                            doc.rect(318, y, 0, 20).stroke();
                            doc.rect(374, y, 0, 20).stroke();
                            doc.rect(430, y, 0, 20).stroke();
                            y = y + 20;
                            items++;
                            if (items === itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: "letter", margin: 10, compress: false });
                                items = 0;
                                pagina = pagina + 1;
                                y = 60;
                                if (pagina != totalPaginas) itemsPorPagina = 30;
                                if (pagina === totalPaginas) itemsPorPagina = 25;
                                doc.font('Bookman-Bold', 8);
                                doc.text('´', 291, 745);
                                doc.font('Bookman-Italic-Bold', 8);
                                doc.text('Pagina', 284, 745);
                                doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                            }

                        }
                        if (pagina === 1 && detalle.length > 20 && detalle.length <= 25) {
                            doc.addPage({ size: "letter", margin: 10, compress: false });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;

                        }
                        if (pagina === totalPaginas - 1 && items > 25 && items <= 30) {
                            doc.addPage({ size: "letter", margin: 10, compress: false });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;

                        }
                        if (pagina === totalPaginas) {
                            doc.font("Bookman-Italic-Bold", 10);
                            doc.text('--------------------------------------------', 60, 720, { width: 160, align: 'center' })
                            doc.text("Despachado por:", 60, 728, { width: 160, align: "center" });
                            doc.text('--------------------------------------------', 233.5, 720, { width: 160, align: 'center' })
                            doc.text("Transportado por:", 233.5, 728, { width: 160, align: "center" });
                            doc.text('--------------------------------------------', 407, 720, { width: 160, align: 'center' })
                            doc.text("Recibido por:", 407, 728, { width: 160, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 745);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop();
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraPDFBajaSucIso = function (doc, pagina, totalPaginas, dato, imagenEmpresa, configuracionIso, esBaja) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso.nombre.toUpperCase(), 164, 70, { width: 267, align: "center" });
                doc.font('Bookman-Italic-Bold', 9);
                doc.text("Codigo:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso.codigo, 283, 95);
                doc.font('Bookman-Bold', 9);
                doc.text('´', 251, 95);
                doc.font('Bookman-Italic', 9);
                doc.text("Revision:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso.revicion, 477, 70);
                doc.font('Bookman-Italic', 9);
                doc.text("Fecha de Aprobacion", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });
                doc.text('´', 463, 70.2);
                doc.text('´', 516, 90.2);

                var y = 130;
                doc.rect(115, y, 12, 10).stroke();
                doc.font('Bookman-Bold', 9);
                doc.text('REMISIÓN', 155, y);
                doc.font('Bookman-Bold', 9);
                if (esBaja) doc.rect(265, y, 12, 10).stroke();
                if (!esBaja) doc.rect(265, y, 12, 10).fillAndStroke('black');
                doc.text('TRASPASO', 305, y);
                doc.font('Bookman-Bold', 9);
                if (esBaja) doc.rect(425, y, 12, 10).fillAndStroke('black');
                if (!esBaja) doc.rect(425, y, 12, 10).stroke();
                doc.text('BAJAS', 465, y);
                y += 25;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Origen: ", 60, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta.almacen ? dato.venta.almacen.sucursal ? dato.venta.almacen.sucursal.nombre.toUpperCase() + ' / ' + dato.venta.almacen.nombre.toUpperCase() : dato.venta.almacen.nombre.toUpperCase() : "", 120, y + 1);
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("N :", 450, y);
                doc.font('Bookman-Bold', 10);

                doc.text("°", 458, y);
                doc.font('Bookman', 9);
                doc.text(dato.venta ? dato.venta.numero_iso_baja : '', 470, y + 1);
                y += 15;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Destino: ", 60, y);
                doc.text("Fecha: ", 450, y);
                doc.font('Bookman', 9);
                doc.text("", 120, y + 1);
                doc.text(dato.venta ? $scope.fechaATexto(dato.venta.fecha) : '', 488, y + 1);
                y += 15;
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Observacion: ", 60, y);
                doc.font('Bookman-Bold', 10);
                doc.text("´", 113, y);
                doc.font('Bookman', 9);
                var observacionesVenta = "";
                if (dato.venta) {
                    observacionesVenta = dato.venta.observacion_traspaso ? dato.venta.observacion_traspaso.toUpperCase() : dato.venta.observacion.toUpperCase();
                }
                doc.text(observacionesVenta ? observacionesVenta : '', 135, y + 1, { width: 372 });
                y += 25;

                //CABECERA DETALLE 
                doc.rect(60, y, 507, 25).stroke();
                doc.rect(90, y, 0, 25).stroke();
                doc.rect(161, y, 0, 25).stroke();
                doc.rect(318, y, 0, 25).stroke();
                doc.rect(374, y, 0, 25).stroke();
                doc.rect(430, y, 0, 25).stroke();
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("N", 60, y + 7, { width: 30, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("°", 67, y + 7, { width: 30, align: "center" });
                doc.text("Codigo del Articulo", 90, y + 0.5, { width: 71, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("´", 105, y + 1);
                doc.text("´", 120, y + 14);
                doc.text("Descripcion", 161, y + 7, { width: 157, align: "center" });
                doc.font('Bookman-Bold', 10);
                doc.text("´", 258, y + 7);
                doc.font('Bookman-Italic-Bold', 10);
                doc.text("Unidad", 318, y + 7, { width: 56, align: "center" });
                doc.text("Cantidad", 374, y + 7, { width: 56, align: "center" });
                doc.text("Observaciones", 430, y + 7, { width: 137, align: "center" });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('´', 291, 745);
                    doc.font('Bookman-Italic-Bold', 8);
                    doc.text('Pagina', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                }

            }
            $scope.verificarFiltro = function (filter) {
                if (filter != null) {
                    filter = JSON.parse(JSON.stringify(filter));
                    let keys = Object.keys(filter);
                    for (let index = 0; index < keys.length; index++) {
                        let key = keys[index];
                        if (filter[key] == null || filter[key] == undefined || filter[key] == "") {
                            filter[key] = 0;
                        } else if (filter[key] == true) {
                            filter[key] = 1;
                        }
                    }
                }
                return filter
            }

            $scope.imprimirIsoOrdenServicio = async function (idPedido, version) {
                if (!!idPedido && !!version) {
                    switch (version) {
                        case 1:
                            $scope.imprimirIsoOrdenServicioV1(idPedido);
                            break;
                        case 2:
                            $scope.imprimirIsoOrdenServicioV2(idPedido);
                            break;
                        case 3:
                            $scope.imprimirIsoOrdenServicioV3(idPedido);
                            break;
                        default:
                            SweetAlert.swal("", "Version de formato ISO no disponible", "warning");
                            break;
                    }
                } else {
                    SweetAlert.swal("", "No se pudo obtener la configuracion ISO <br> Orden: " + idPedido + " <br> v: " + version, "warning");
                }
            }
            $scope.imprimirIsoOrdenServicioV1 = (idPedido) => {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    const data = await ObtenerOrdenServicio(idPedido);
                    if (data.hasErr) {
                        SweetAlert.swal("", "No se encontraron datos del pedido", "warning");
                    } else {
                        const orden = data.orden_servicio;
                        blockUI.start();
                        const doc = new PDFDocument({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
                        const stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        let y = 239, itemsPorPagina = 45, items = 0, pagina = 1, totalPaginas = Math.ceil((orden.detallesOrdenServicios.length + 10) / itemsPorPagina);
                        if (35 >= orden.detallesOrdenServicios.length) {
                            itemsPorPagina = 30;
                        }
                        else {
                            itemsPorPagina = 40;
                        }
                        doc.lineWidth(0.5)
                        $scope.dibujarCabeceraIsoOrdenServicio(doc, pagina, totalPaginas, orden, imagenEmpresa, orden.configuracionesIso);

                        for (let i = 0; i < orden.detallesOrdenServicios.length && items <= itemsPorPagina; i++) {
                            detalle = orden.detallesOrdenServicios[i]
                            doc.font('Bookman', 7);

                            var o = 12
                            var s = 0
                            if (detalle.descripcion.length > 49) {
                                s = detalle.descripcion.length / 51
                                o += s * 8
                            }

                            doc.rect(60, y, 507, o).stroke();
                            doc.rect(90, y, 0, o).stroke();
                            doc.rect(377, y, 0, o).stroke();
                            doc.rect(427, y, 0, o).stroke();
                            doc.rect(477, y, 0, o).stroke();
                            doc.rect(522, y, 0, o).stroke();

                            doc.text(i + 1, 65, y + 2, { width: 25 });
                            doc.text(detalle.descripcion ? detalle.descripcion.toUpperCase() : '', 92, y + 2, { width: 285 });
                            doc.text(detalle.unidad_medida ? detalle.unidad_medida.toUpperCase() : '', 377, y + 2, { width: 50, align: 'center' });
                            doc.text(detalle.cantidad, 427, y + 2, { width: 50, align: 'center' });
                            doc.text(detalle.total ? number_format_negativo_to_positvo(detalle.total / orden.cambio_dolar, 2) : '', 477, y + 2, { width: 44, align: 'right' });
                            doc.text(detalle.total ? number_format_negativo_to_positvo(detalle.total, 2) : '', 522, y + 2, { width: 44, align: 'right' });
                            doc.font('Bookman', 7);
                            y = y + o;
                            items++;
                            if (items == itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 60;
                                items = 0;
                                pagina = pagina + 1;
                                if (pagina != totalPaginas) itemsPorPagina = 45;
                                if (pagina === totalPaginas) itemsPorPagina = 40;
                                doc.font('Bookman-Bold', 8);
                                doc.text('´', 291, 745);
                                doc.font('Bookman-Italic-Bold', 8);
                                doc.text('Pagina', 284, 745);
                                doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                            }
                        }
                        doc.font('Bookman-Bold', 7).text('VALOR TOTAL', 377, y + 2, { width: 98, align: 'right' })
                        doc.rect(477, y, 90, 12).stroke()
                        doc.rect(522, y, 0, 12).stroke();
                        doc.font('Bookman', 7)
                        doc.text(orden.importe ? number_format_negativo_to_positvo(orden.importe / orden.cambio_dolar, 2) : '', 477, y + 2, { width: 44, align: 'right' })
                        doc.text(orden.importe ? number_format_negativo_to_positvo(orden.importe, 2) : '', 522, y + 2, { width: 44, align: 'right' })
                        if (pagina === 1 && orden.detallesOrdenServicios.length > 30 && orden.detallesOrdenServicios.length <= 40) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                        }
                        if (pagina === totalPaginas - 1 && items > 40 && items <= 45) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas) {
                            doc.font('Bookman-Bold', 8);
                            doc.text("SON:", 60, 630, { width: 80 });
                            doc.font('Bookman', 7)
                            doc.text(NumeroLiteral.Convertir(parseFloat(orden.importe).toFixed(2).toString()), 85, 630, { width: 507 });
                            doc.font('Bookman-Bold', 8);
                            doc.text("OBSERVACIONES", 60, 648, { width: 507, align: "center" });
                            doc.font('Bookman', 8);
                            doc.rect(60, 659, 507, 25).stroke();
                            doc.text(orden.observacion ? orden.observacion.toUpperCase() : '', 61, 661, { width: 507 });
                            doc.font('Bookman-Italic-Bold', 9);
                            doc.text('--------------------------------------------', 60, 712, { width: 162, align: 'center' })
                            doc.text("Solicitado Por", 60, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 232, 712, { width: 162, align: 'center' })
                            doc.text("Aprobado Por", 232, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 404, 712, { width: 162, align: 'center' })
                            doc.text("Autorizado Por", 404, 720, { width: 162, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('´', 291, 745);
                            doc.font('Bookman-Italic-Bold', 8);
                            doc.text('Pagina', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            const fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop();
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraIsoOrdenServicio = function (doc, pagina, totalPaginas, pedido, imagenEmpresa, configuracionIso) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso && configuracionIso.nombre.toUpperCase() || '-', 164, 62, { width: 267, align: "center" });
                doc.font('Bookman-Italic-Bold', 9);
                doc.text("Codigo:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso && configuracionIso.codigo || '-', 283, 95);
                doc.font('Bookman-Bold', 9);
                doc.text('´', 251, 95);
                doc.font('Bookman-Italic', 9);
                doc.text("Revision:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso && configuracionIso.revicion || '-', 477, 70);
                doc.font('Bookman-Italic', 9);
                doc.text("Fecha de Aprobacion", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text(configuracionIso && $scope.fechaATexto(configuracionIso.fecha_aprobacion) || '-', 435, 100, { width: 132 });
                doc.text('´', 463, 70.2);
                doc.text('´', 516, 90.2);
                let y = 118;
                //DETALLE CABECERA
                doc.font('Bookman-Bold', 8);
                doc.text("N°", 436, y + 2);
                doc.text(pedido.numero_iso ? pedido.numero_iso : 'S/N', 450, y + 2);
                y += 16;
                doc.font('Bookman-Bold', 7).text('CONCEPTO:', 110, y + 1, { width: 70, align: 'right' })
                doc.rect(182, y, 55, 12).stroke();
                doc.rect(237, y, 55, 12).stroke();
                doc.rect(292, y, 55, 12).stroke();
                doc.rect(347, y, 55, 12).stroke();
                doc.font('Bookman', 6)
                doc.lineGap(0)
                if (pedido.concepto) {
                    pedido.concepto.nombre_corto == "ORDSER_SER" ? doc.rect(182, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('SERVICIO', 182, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('SERVICIO', 182, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDSER_ALQ" ? doc.rect(237, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('ALQUILER', 237, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('ALQUILER', 237, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDSER_OTR" ? doc.rect(292, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('OTROS', 292, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('OTROS', 292, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDEN_COMP" ? doc.rect(347, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('COMPRAS', 347, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('COMPRAS', 347, y + 2, { width: 55, align: 'center' })
                } else {
                    doc.fillColor('#000')
                    doc.text('SERVICIO', 182, y + 1, { width: 55, align: 'center' })
                    doc.text('ALQUILER', 237, y + 1, { width: 55, align: 'center' })
                    doc.text('OTROS', 292, y + 1, { width: 55, align: 'center' })
                    doc.text('COMPRAS', 347, y + 1, { width: 55, align: 'center' })
                }

                y += 15

                doc.font('Bookman-Bold', 7).fillColor('#000').text('DETALLE:', 110, y + 1, { width: 70, align: 'right' })
                doc.rect(182, y, 55, 12).stroke();
                doc.rect(237, y, 55, 12).stroke();
                doc.rect(292, y, 55, 12).stroke();
                doc.rect(347, y, 55, 12).stroke();
                doc.rect(402, y, 55, 12).stroke();
                doc.rect(457, y, 55, 12).stroke();
                doc.rect(512, y, 55, 12).stroke();
                doc.font('Bookman', 6)
                if (pedido.detalle) {
                    if (pedido.detalle.nombre_corto == "OTR_MAT" || pedido.detalle.nombre_corto == "COMP_OTR") {
                        doc.rect(182, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('MATERIAL DE', 182, y, { width: 55, align: 'center', lineHeight: 0 })
                        doc.fillColor('#fff').text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center', lineHeight: 0 })
                    } else {
                        doc.fillColor('#000').text('MATERIAL DE', 182, y, { width: 55, align: 'center' })
                        doc.fillColor('#000').text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center' })
                    }
                    pedido.detalle.nombre_corto == "SER_VHC" || pedido.detalle.nombre_corto == "ALQ_VHC" || pedido.detalle.nombre_corto == "COMP_VEH" ? doc.rect(237, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('VEHÍCULOS', 237, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('VEHÍCULOS', 237, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_EQP" || pedido.detalle.nombre_corto == "COMP_EQP" ? doc.rect(292, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('EQUIPOS', 292, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('EQUIPOS', 292, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_MTL" || pedido.detalle.nombre_corto == "COMP_MAT" ? doc.rect(347, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('MATERIALES', 347, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('MATERIALES', 347, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_UNF" || pedido.detalle.nombre_corto == "COMP_UNF" ? doc.rect(402, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('UNIFORMES', 402, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('UNIFORMES', 402, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_OTR" || pedido.detalle.nombre_corto == "COMP_OTR" ? doc.rect(457, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('OTROS', 457, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('OTROS', 457, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_PRF" ? doc.rect(512, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('PROFESIONALES', 512, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('PROFESIONALES', 512, y + 2, { width: 55, align: 'center' })
                    doc.fillColor('#000')
                } else {
                    doc.fillColor('#000')
                    doc.text('MATERIAL DE', 182, y, { width: 55, align: 'center' })
                    doc.text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center' })
                    doc.text('VEHÍCULOS', 237, y + 1, { width: 55, align: 'center' })
                    doc.text('EQUIPOS', 292, y + 1, { width: 55, align: 'center' })
                    doc.text('MATERIALES', 347, y + 1, { width: 55, align: 'center' })
                    doc.text('UNIFORMES', 402, y + 1, { width: 55, align: 'center' })
                    doc.text('OTROS', 457, y + 1, { width: 55, align: 'center' })
                    doc.text('PROFESIONALES', 512, y + 1, { width: 55, align: 'center' })
                    doc.fillColor('#000')
                }



                y += 20;
                doc.rect(60, y, 507, 40).stroke();
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("ÁREA SOLICITANTE:", 63, y + 1);
                doc.font('Bookman-Bold', 7);
                doc.text("FECHA ACTUAL:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.area_solicitante ? pedido.area_solicitante.nombre.toUpperCase() : '', 140, y + 1);
                doc.text($scope.fechaATexto(pedido.createdAt), 440, y + 1);
                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("ÁREA DESTINO:", 63, y + 1);
                doc.text("FECHA DE NECESIDAD:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.area_destino ? pedido.area_destino.nombre : '', 125, y + 1);
                doc.text(pedido.fecha_entrega ? $scope.fechaATexto(pedido.fecha_entrega) : '', 440, y + 1);
                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("TELÉFONO:", 331, y + 1, { width: 100, align: 'right' });
                doc.text("PROVEEDOR/NIT:", 63, y + 1);
                doc.font('Bookman', 7);

                doc.text(pedido.proveedor ? pedido.proveedor.razon_social ? pedido.proveedor.razon_social.length > 37 ? pedido.proveedor.razon_social.toUpperCase() : pedido.proveedor.nit ? pedido.proveedor.razon_social.toUpperCase() + '/' + pedido.proveedor.nit : pedido.proveedor.razon_social.toUpperCase() : '' : '', 133, y + 1);
                const telefono = (pedido.proveedor && pedido.proveedor.telefono1 && pedido.proveedor.telefono1 || null) || (pedido.proveedor && pedido.proveedor.telefono2 && pedido.proveedor.telefono2 || null) || (pedido.proveedor && pedido.proveedor.telefono3 && pedido.proveedor.telefono3 || null)
                doc.text(telefono && telefono || '', 440, y + 1);

                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("TIPO DE PAGO:", 63, y + 1);
                doc.text("DESTINO:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.tipoPago ? pedido.tipoPago.nombre ? pedido.tipoPago.nombre.toUpperCase() : '' : '', 126, y + 1);
                doc.text(pedido.clientes ? 'CLIENTE' : $scope.usuario.empresa.razon_social.toUpperCase(), 440, y + 1);
                y = y + 20;
                //CUADROS CUERPO
                doc.rect(60, y, 507, 20).stroke();
                doc.rect(90, y, 0, 20).stroke();
                doc.rect(377, y, 0, 20).stroke();
                doc.rect(427, y, 0, 20).stroke();
                doc.rect(477, y + 10, 90, 0).stroke();
                doc.rect(477, y, 0, 20).stroke();
                doc.rect(522, y + 10, 0, 10).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text('N°', 60, y + 7, { width: 30, align: 'center' });
                doc.text('DESCRIPCIÓN', 90, y + 7, { width: 287, align: 'center' });
                doc.text('UNIDAD', 377, y + 7, { width: 50, align: 'center' });
                doc.text('CANTIDAD', 427, y + 7, { width: 50, align: 'center' });
                doc.text('PRECIO', 477, y + 2, { width: 90, align: 'center' });
                doc.text('$us', 477, y + 11, { width: 45, align: 'center' });
                doc.text('Bs.', 522, y + 11, { width: 45, align: 'center' });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 7);
                    doc.text('´', 291, 745);
                    doc.font('Bookman-Italic-Bold', 7);
                    doc.text('Pagina', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                }
                var currentDate = new Date();
                doc.font('Bookman', 5).text("FECHA IMP: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hrs:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 60, 755);
                doc.font('Bookman', 5).text("USUARIO: " + $scope.usuario.nombre_usuario, 155, 755);
            };
            $scope.imprimirIsoOrdenServicioV2 = (idPedido) => {
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    const data = await ObtenerOrdenServicio(idPedido);
                    if (data.hasErr) {
                        SweetAlert.swal("", "No se encontraron datos de la orden", "warning");
                    } else {
                        const orden = data.orden_servicio;
                        blockUI.start();
                        const doc = new PDFDocument({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
                        const stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');

                        let y = 239, itemsPorPagina = 45, items = 0, pagina = 1, totalPaginas = Math.ceil((orden.detallesOrdenServicios.length + 10) / itemsPorPagina);
                        if (35 >= orden.detallesOrdenServicios.length) {
                            itemsPorPagina = 30;
                        }
                        else {
                            itemsPorPagina = 40;
                        }
                        doc.lineWidth(0.5)
                        $scope.dibujarCabeceraIsoOrdenServicioV2(doc, pagina, totalPaginas, orden, imagenEmpresa, orden.configuracionesIso);

                        for (let i = 0; i < orden.detallesOrdenServicios.length && items <= itemsPorPagina; i++) {
                            detalle = orden.detallesOrdenServicios[i]
                            doc.font('Bookman', 7);

                            var o = 12
                            var s = 0
                            if (detalle.descripcion.length > 49) {
                                s = detalle.descripcion.length / 51
                                o += s * 8
                            }

                            doc.rect(60, y, 507, o).stroke();
                            doc.rect(90, y, 0, o).stroke();
                            doc.rect(377, y, 0, o).stroke();
                            doc.rect(427, y, 0, o).stroke();
                            doc.rect(477, y, 0, o).stroke();
                            doc.rect(522, y, 0, o).stroke();

                            doc.text(i + 1, 65, y + 2, { width: 25 });
                            doc.text(detalle.descripcion ? detalle.descripcion.toUpperCase() : '', 92, y + 2, { width: 285 });
                            doc.text(detalle.unidad_medida ? detalle.unidad_medida.toUpperCase() : '', 377, y + 2, { width: 50, align: 'center' });
                            doc.text(detalle.cantidad, 427, y + 2, { width: 50, align: 'center' });
                            doc.text(detalle.total ? number_format_negativo_to_positvo(detalle.total / orden.cambio_dolar, 2) : '', 477, y + 2, { width: 44, align: 'right' });
                            doc.text(detalle.total ? number_format_negativo_to_positvo(detalle.total, 2) : '', 522, y + 2, { width: 44, align: 'right' });
                            doc.font('Bookman', 7);
                            y = y + o;
                            items++;
                            if (items == itemsPorPagina && pagina != totalPaginas) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 60;
                                items = 0;
                                pagina = pagina + 1;
                                if (pagina != totalPaginas) itemsPorPagina = 45;
                                if (pagina === totalPaginas) itemsPorPagina = 40;
                                doc.font('Bookman-Bold', 8);
                                doc.text('Página', 284, 745);
                                doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                                doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(orden.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(orden.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });

                            }
                        }
                        doc.font('Bookman-Bold', 7).text('VALOR TOTAL', 377, y + 2, { width: 98, align: 'right' })
                        doc.rect(477, y, 90, 12).stroke()
                        doc.rect(522, y, 0, 12).stroke();
                        doc.font('Bookman', 7)
                        doc.text(orden.importe ? number_format_negativo_to_positvo(orden.importe / orden.cambio_dolar, 2) : '', 477, y + 2, { width: 44, align: 'right' })
                        doc.text(orden.importe ? number_format_negativo_to_positvo(orden.importe, 2) : '', 522, y + 2, { width: 44, align: 'right' })
                        if (pagina === 1 && orden.detallesOrdenServicios.length > 30 && orden.detallesOrdenServicios.length <= 40) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                            doc.font('Bookman-Bold', 8);
                            doc.text('Página', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);

                        }
                        if (pagina === totalPaginas - 1 && items > 40 && items <= 45) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 60;
                            items = 0;
                            pagina = pagina + 1;
                        }
                        if (pagina === totalPaginas) {
                            doc.font('Bookman-Bold', 8);
                            doc.text("SON:", 60, 630, { width: 80 });
                            doc.font('Bookman', 7)
                            doc.text(NumeroLiteral.Convertir(parseFloat(orden.importe).toFixed(2).toString()), 85, 630, { width: 507 });
                            doc.font('Bookman-Bold', 8);
                            doc.text("OBSERVACIONES", 60, 648, { width: 507, align: "center" });
                            doc.font('Bookman', 8);
                            doc.rect(60, 659, 507, 25).stroke();
                            doc.text(orden.observacion ? orden.observacion.toUpperCase() : '', 61, 661, { width: 507 });
                            doc.font('Bookman-Bold', 9);
                            doc.text('--------------------------------------------', 60, 712, { width: 162, align: 'center' })
                            doc.text("Solicitado Por", 60, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 232, 712, { width: 162, align: 'center' })
                            doc.text("Aprobado Por", 232, 720, { width: 162, align: "center" });
                            doc.text('--------------------------------------------', 404, 712, { width: 162, align: 'center' })
                            doc.text("Autorizado Por", 404, 720, { width: 162, align: "center" });
                            doc.font('Bookman-Bold', 8);
                            doc.text('Página', 284, 745);
                            doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                        }
                        doc.end();
                        stream.on('finish', function () {
                            const fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        blockUI.stop();
                        $scope.$evalAsync()
                    }
                });
            }
            $scope.dibujarCabeceraIsoOrdenServicioV2 = function (doc, pagina, totalPaginas, pedido, imagenEmpresa, configuracionIso) {
                doc.font('Bookman-Bold', 10);
                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    if (imagenEmpresa) {
                        doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
                    }
                }
                //cuadros
                doc.rect(60, 60, 507, 55).stroke();
                doc.rect(164, 88, 403, 0).stroke();
                doc.rect(164, 60, 0, 55).stroke();
                doc.rect(431, 60, 0, 55).stroke();

                doc.text(configuracionIso && configuracionIso.nombre.toUpperCase() || '-', 164, 62, { width: 267, align: "center" });
                doc.font('Bookman-Bold', 9);
                doc.text("Codigo:", 243, 95);
                doc.font('Bookman-Bold', 9);
                doc.text(configuracionIso && configuracionIso.codigo || '-', 283, 95);
                doc.font('Bookman-Bold', 9);
                doc.text('´', 251, 95);
                doc.font('Bookman', 9);
                doc.text("Revisión:", 435, 70);
                doc.font('Bookman', 9);
                doc.text(configuracionIso && configuracionIso.revicion || '-', 477, 70);
                doc.font('Bookman', 9);
                doc.text("Fecha de Aprobación:", 435, 90, { width: 132 });
                doc.font('Bookman', 9);
                doc.text(configuracionIso && $scope.fechaATexto(configuracionIso.fecha_aprobacion) || '-', 435, 100, { width: 132 });
                let y = 118;
                //DETALLE CABECERA
                doc.font('Bookman-Bold', 8);
                doc.text("N°", 436, y + 2);
                doc.text(pedido.numero_iso ? pedido.numero_iso : 'S/N', 450, y + 2);
                y += 16;
                doc.font('Bookman-Bold', 7).text('CONCEPTO:', 110, y + 1, { width: 70, align: 'right' })
                doc.rect(182, y, 55, 12).stroke();
                doc.rect(237, y, 55, 12).stroke();
                doc.rect(292, y, 55, 12).stroke();
                doc.rect(347, y, 55, 12).stroke();
                doc.font('Bookman', 6)
                doc.lineGap(0)
                if (pedido.concepto) {
                    pedido.concepto.nombre_corto == "ORDSER_SER" ? doc.rect(182, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('SERVICIO', 182, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('SERVICIO', 182, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDSER_ALQ" ? doc.rect(237, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('ALQUILER', 237, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('ALQUILER', 237, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDSER_OTR" ? doc.rect(292, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('OTROS', 292, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('OTROS', 292, y + 2, { width: 55, align: 'center' })
                    pedido.concepto.nombre_corto == "ORDEN_COMP" ? doc.rect(347, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('COMPRAS', 347, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('COMPRAS', 347, y + 2, { width: 55, align: 'center' })
                } else {
                    doc.fillColor('#000')
                    doc.text('SERVICIO', 182, y + 1, { width: 55, align: 'center' })
                    doc.text('ALQUILER', 237, y + 1, { width: 55, align: 'center' })
                    doc.text('OTROS', 292, y + 1, { width: 55, align: 'center' })
                    doc.text('COMPRAS', 347, y + 1, { width: 55, align: 'center' })
                }

                y += 15

                doc.font('Bookman-Bold', 7).fillColor('#000').text('DETALLE:', 110, y + 1, { width: 70, align: 'right' })
                doc.rect(182, y, 55, 12).stroke();
                doc.rect(237, y, 55, 12).stroke();
                doc.rect(292, y, 55, 12).stroke();
                doc.rect(347, y, 55, 12).stroke();
                doc.rect(402, y, 55, 12).stroke();
                doc.rect(457, y, 55, 12).stroke();
                doc.rect(512, y, 55, 12).stroke();
                doc.font('Bookman', 6)
                if (pedido.detalle) {
                    if (pedido.detalle.nombre_corto == "OTR_MAT" || pedido.detalle.nombre_corto == "COMP_OTR") {
                        doc.rect(182, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('MATERIAL DE', 182, y, { width: 55, align: 'center', lineHeight: 0 })
                        doc.fillColor('#fff').text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center', lineHeight: 0 })
                    } else {
                        doc.fillColor('#000').text('MATERIAL DE', 182, y, { width: 55, align: 'center' })
                        doc.fillColor('#000').text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center' })
                    }
                    pedido.detalle.nombre_corto == "SER_VHC" || pedido.detalle.nombre_corto == "ALQ_VHC" || pedido.detalle.nombre_corto == "COMP_VEH" ? doc.rect(237, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('VEHÍCULOS', 237, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('VEHÍCULOS', 237, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_EQP" || pedido.detalle.nombre_corto == "COMP_EQP" ? doc.rect(292, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('EQUIPOS', 292, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('EQUIPOS', 292, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_MTL" || pedido.detalle.nombre_corto == "COMP_MAT" ? doc.rect(347, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('MATERIALES', 347, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('MATERIALES', 347, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_UNF" || pedido.detalle.nombre_corto == "COMP_UNF" ? doc.rect(402, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('UNIFORMES', 402, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('UNIFORMES', 402, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_OTR" || pedido.detalle.nombre_corto == "COMP_OTR" ? doc.rect(457, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('OTROS', 457, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('OTROS', 457, y + 2, { width: 55, align: 'center' })
                    pedido.detalle.nombre_corto == "SER_PRF" ? doc.rect(512, y, 55, 12).fillAndStroke('#0D5889', '').fillColor('#fff').text('PROFESIONALES', 512, y + 2, { width: 55, align: 'center' }) : doc.fillColor('#000').text('PROFESIONALES', 512, y + 2, { width: 55, align: 'center' })
                    doc.fillColor('#000')
                } else {
                    doc.fillColor('#000')
                    doc.text('MATERIAL DE', 182, y, { width: 55, align: 'center' })
                    doc.text('ESCRITORIO', 182, y + 5, { width: 55, align: 'center' })
                    doc.text('VEHÍCULOS', 237, y + 1, { width: 55, align: 'center' })
                    doc.text('EQUIPOS', 292, y + 1, { width: 55, align: 'center' })
                    doc.text('MATERIALES', 347, y + 1, { width: 55, align: 'center' })
                    doc.text('UNIFORMES', 402, y + 1, { width: 55, align: 'center' })
                    doc.text('OTROS', 457, y + 1, { width: 55, align: 'center' })
                    doc.text('PROFESIONALES', 512, y + 1, { width: 55, align: 'center' })
                    doc.fillColor('#000')
                }
                y += 20;
                doc.rect(60, y, 507, 40).stroke();
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("ÁREA SOLICITANTE:", 63, y + 1);
                doc.font('Bookman-Bold', 7);
                doc.text("FECHA ACTUAL:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.area_solicitante ? pedido.area_solicitante.nombre.toUpperCase() : '', 140, y + 1);
                doc.text($scope.fechaATexto(pedido.createdAt), 440, y + 1);
                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("ÁREA DESTINO:", 63, y + 1);
                doc.text("FECHA DE NECESIDAD:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.area_destino ? pedido.area_destino.nombre : '', 125, y + 1);
                doc.text(pedido.fecha_entrega ? $scope.fechaATexto(pedido.fecha_entrega) : '', 440, y + 1);
                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("TELÉFONO:", 331, y + 1, { width: 100, align: 'right' });
                doc.text("PROVEEDOR/NIT:", 63, y + 1);
                doc.font('Bookman', 7);

                doc.text(pedido.proveedor ? pedido.proveedor.razon_social ? pedido.proveedor.razon_social.length > 37 ? pedido.proveedor.razon_social.toUpperCase() : pedido.proveedor.nit ? pedido.proveedor.razon_social.toUpperCase() + '/' + pedido.proveedor.nit : pedido.proveedor.razon_social.toUpperCase() : '' : '', 133, y + 1);
                const telefono = (pedido.proveedor && pedido.proveedor.telefono1 && pedido.proveedor.telefono1 || null) || (pedido.proveedor && pedido.proveedor.telefono2 && pedido.proveedor.telefono2 || null) || (pedido.proveedor && pedido.proveedor.telefono3 && pedido.proveedor.telefono3 || null)
                doc.text(telefono && telefono || '', 440, y + 1);

                y += 10;
                doc.rect(60, y, 507, 0).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text("TIPO DE PAGO:", 63, y + 1);
                doc.text("DESTINO:", 331, y + 1, { width: 100, align: 'right' });
                doc.font('Bookman', 7);
                doc.text(pedido.tipoPago ? pedido.tipoPago.nombre ? pedido.tipoPago.nombre.toUpperCase() : '' : '', 126, y + 1);
                doc.text(pedido.clientes ? 'CLIENTE' : $scope.usuario.empresa.razon_social.toUpperCase(), 440, y + 1);
                y = y + 20;
                //CUADROS CUERPO
                doc.rect(60, y, 507, 20).stroke();
                doc.rect(90, y, 0, 20).stroke();
                doc.rect(377, y, 0, 20).stroke();
                doc.rect(427, y, 0, 20).stroke();
                doc.rect(477, y + 10, 90, 0).stroke();
                doc.rect(477, y, 0, 20).stroke();
                doc.rect(522, y + 10, 0, 10).stroke();
                doc.font('Bookman-Bold', 7);
                doc.text('N°', 60, y + 7, { width: 30, align: 'center' });
                doc.text('DESCRIPCIÓN', 90, y + 7, { width: 287, align: 'center' });
                doc.text('UNIDAD', 377, y + 7, { width: 50, align: 'center' });
                doc.text('CANTIDAD', 427, y + 7, { width: 50, align: 'center' });
                doc.text('PRECIO', 477, y + 2, { width: 90, align: 'center' });
                doc.text('$us', 477, y + 11, { width: 45, align: 'center' });
                doc.text('Bs.', 522, y + 11, { width: 45, align: 'center' });
                if (pagina != totalPaginas) {
                    doc.font('Bookman-Bold', 8);
                    doc.text('Página', 284, 745);
                    doc.text(pagina + ' de ' + totalPaginas, 317, 745);
                }
                doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(pedido.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(pedido.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });

            };

            $scope.formatoFechaHora = (fecha) => {
                let date = fecha ? new Date(fecha) : new Date();
                let newDate = date.getDate() < 10 ? "0" + date.getDate() + "/" : date.getDate() + "/"
                newDate += (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) + "/" : (date.getMonth() + 1) + "/"
                newDate += date.getFullYear() + " "
                newDate += date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":"
                newDate += date.getMinutes() < 10 ? "0" + date.getMinutes() + ":" : date.getMinutes() + ":"
                newDate += date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
                return newDate;
            }
            // INICIO PREREQUISITOS
            $scope.abrirDialogPrerequisitoNuevo = function () {
                $scope.cargosPre = []
                $scope.NuevoP = new Prerequisito({ puede_modificar_rrhh: false, cargos: [], nombre: "", vencimiento_mes: "", observacion: "" });
                $scope.obtenerCargos()
                $scope.obtenertodoslosPrerequisitos()
                $scope.abrirPopup($scope.idModalDialogPrerequisitoNuevo);
            }
            $scope.obtenerCargos = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_CARGO", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    var cargos = entidad.clases
                    $scope.listaCargos = entidad
                    $scope.llenarCargos(cargos)
                    blockUI.stop();
                });
            }
            $scope.obtenertodoslosPrerequisitos = function () {
                var requisitos = Prerequisitos($scope.usuario.id_empresa)
                requisitos.then(function (prerequisitos) {
                    $scope.preRequisitosEmpresa = prerequisitos.prerequisitos
                })
            }
            $scope.llenarCargos = function (cargos) {
                $scope.nuevoRH = ""
                $scope.cargos = [];
                for (var i = 0; i < cargos.length; i++) {
                    var cargo = {
                        nombre: cargos[i].nombre,
                        maker: "",
                        ticked: false,
                        id: cargos[i].id
                    }
                    $scope.cargos.push(cargo);
                }
            }

            $scope.saveFormPrerequisito = function (nuevoPrerequisito, cargosPre) {
                blockUI.start();
                nuevoPrerequisito.cargos = cargosPre
                if (nuevoPrerequisito.nombre != undefined && nuevoPrerequisito.vencimiento_mes != undefined) {
                    var prom = PrerequisitosSave(nuevoPrerequisito, $scope.usuario.id_empresa)
                    prom.then(function (res) {
                        SweetAlert.swal("", res.mensaje, "success");
                        $scope.NuevoP = null
                        $scope.llenarCargos($scope.listaCargos.clases)
                        $scope.cargosPre = []
                        //$scope.cerrarPopupPrerequisitoNuevo();
                        $scope.obtenertodoslosPrerequisitos();
                        blockUI.stop();
                        //$scope.verificarAsignacionPrerequisitos($scope.paciente)
                    }).catch(function (err) {
                        blockUI.stop()
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        SweetAlert.swal("", msg, "error");
                    })
                } else {
                    SweetAlert.swal("", 'Los campos Prerequisito Nombre y vencimiento mes son requeridos.', "warning");
                    blockUI.stop();
                }

            }
            $scope.verificarAsignacionPrerequisitos = function (empleado) {
                if (empleado) {
                    blockUI.start();
                    var requisitos = ListaPrerequisitosEmpleado(empleado.cargosids)
                    requisitos.then(function (prerequisitos) {
                        $scope.preRequisitos = prerequisitos.prerequisitos
                        filtro = { inicio: 0, fin: 0 }
                        var promesa = ListaPrerequisitosPaciente($scope.paciente.id, filtro);
                        promesa.then(function (preRequisitos) {
                            $scope.prerequisitosPaciente = preRequisitos.Prerequisitos;
                            if ($scope.preRequisitos.length > 0) {
                                var requisitosRestantes = []
                                $scope.preRequisitos.forEach(function (requisito, index, array) {
                                    if ($scope.prerequisitosPaciente.length > 0) {

                                        var requisitoFueAsignado = $scope.prerequisitosPaciente.find(function (dato, index, array) {
                                            return dato.id_prerequisito == requisito.id
                                        })
                                        if (!requisitoFueAsignado) {
                                            requisitosRestantes.push(requisito)
                                        }
                                        $scope.prerequisitosPaciente.forEach(function (preRe) {
                                            if (preRe.fecha_vencimiento) {
                                                var fechaInicio = new Date(preRe.fecha_vencimiento)
                                                var fechaFin = new Date()
                                                var fecha1 = moment('"' + fechaInicio.getFullYear() + '-' + fechaInicio.getMonth() + '-' + fechaInicio.getDate() + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
                                                var fecha2 = moment('"' + fechaFin.getFullYear() + '-' + fechaFin.getMonth() + '-' + fechaFin.getDate() + " " + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");

                                                var diff = fecha1.diff(fecha2, 'd');
                                                if (diff <= 0) {
                                                    preRe.verIconoEntregado = true
                                                } else {
                                                    preRe.verIconoEntregado = false
                                                }
                                            } else {
                                                preRe.verIconoEntregado = false
                                            }
                                            if (requisito.id == preRe.id_prerequisito) {
                                                if (preRe.eliminado) {
                                                    requisito.asignado = false
                                                } else {
                                                    requisito.asignado = true
                                                }
                                            }
                                            if (preRe.fecha_entrega != null) {
                                                preRe.entregado = true
                                            }
                                        });

                                    } else {
                                        requisito.asignado = true
                                    }
                                });
                            }
                            blockUI.stop();
                        });
                    })
                }
            }

            $scope.asignarPrerequisito = function (i, preq) {
                SweetAlert.swal({
                    title: "",
                    html: `<b>¿Estas seguro?</b><br><p><small>
                        ${preq.habilitado ?
                            preq.asignado ? 'Esta acción habilitará al trabajador entregar el prerequisito'
                                : 'Esta acción ya no permitirá al trabajador entregar el prerequisito' :
                            preq.asignado ? 'El prerequisito esta inactivo, por tanto no se puede asignar al trabajador'
                                : 'El prerequisito esta inactivo, no podrá volver a habilitarlo otra vez'}</small></p>`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No",
                }).then(function (result) {
                    if (result.isConfirmed) {
                        AsignarPrerequisitoPaciente($scope.paciente.id, preq.id)
                            .then(res => {
                                if (!res.error) $scope.obtenerPrerequisitosPaciente($scope.paciente.id, false)
                                if (!res.error) $scope.obtenerNumeroAlertas()
                                SweetAlert.swal("", res.message, res.messageType);
                            })
                    } else {
                        $scope.prerequisitosPaciente[i].asignado = !preq.asignado;
                    }
                })
            }

            $scope.obtenerPrerequisitosPaciente = (id, config) => {
                GetPrerequisitosPaciente(id, config, $scope.usuario.id_empresa, $scope.filtro)
                    .then(res => {
                        if (!res.error) {
                            if (config) {
                                $scope.prerequisitosPaciente = res.prerequisitos
                            } else {
                                $scope.prerequisitosAsignadas = res.prerequisitos
                            }
                        } else {
                            SweetAlert.swal("", res.message, res.messageType);
                        }
                    })
            }

            $scope.obtenerNumeroAlertas = () => {
                GetNumberAlerts($scope.usuario.id_empresa).then(data => {
                    if (!data.error) {
                        $scope.alertas = data;
                    } else {
                        $scope.alertas = 0
                    }
                })
            }

            $scope.cerrarPopupPrerequisitoNuevo = function () {
                $scope.cerrarPopup($scope.idModalDialogPrerequisitoNuevo);
            }

            $scope.inactivarPrerequisito = (id) => {
                SweetAlert.swal({
                    title: "",
                    html: `<b>¿Seguro que quiere inactivar el prerequisito?</b><br><small>El prerequisito ya no podrá ser asignado a los trabajadores.</small>`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No",
                }).then(async function (result) {
                    if (result.isConfirmed) {
                        DeletePrerequisito(id)
                            .then(res => {
                                SweetAlert.swal("", res.message, res.messageType);
                                if (!res.error) $scope.obtenertodoslosPrerequisitos();
                            })
                    }
                })
            }
            $scope.activarPrerequisito = (id) => {
                SweetAlert.swal({
                    title: "",
                    html: `<b>¿Seguro que quiere activar el prerequisito?</b><br><small>El prerequisito podrá ser asignado a los trabajadores.</small>`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No",
                }).then(async function (result) {
                    if (result.isConfirmed) {
                        DeletePrerequisito(id)
                            .then(res => {
                                SweetAlert.swal("", res.message, res.messageType);
                                if (!res.error) $scope.obtenertodoslosPrerequisitos();
                            })
                    }
                })
            }

            $scope.abrirDialogPrerequisitoEditar = function (prerequisito) {
                $scope.seleccionarCargosPrerequisito(prerequisito.prerequisitoCargos)
                $scope.NuevoP = new Prerequisito({ id: prerequisito.id, nombre: prerequisito.nombre, observacion: prerequisito.observacion, vencimiento_mes: prerequisito.vencimiento_mes, dias_activacion: prerequisito.dias_activacion, puede_modificar_rrhh: prerequisito.puede_modificar_rrhh ? true : false, cargos: [] })
                //$scope.abrirPopup($scope.idModalDialogPrerequisitoNuevo);
            }

            $scope.seleccionarCargosPrerequisito = function (cargosPrerequisito) {
                for (var i = 0; i < $scope.cargos.length; i++) {
                    for (var j = 0; j < cargosPrerequisito.length; j++) {
                        if ($scope.cargos[i].id == cargosPrerequisito[j].id_cargo) {
                            $scope.cargos[i].ticked = true;
                        }
                    }
                }
            }

            $scope.abrirIdModalDialogPreRequisitos = function (paciente) {
                $scope.currentModulePath = $route.current.$$route.originalPath;
                $scope.paciente = paciente;
                $scope.filtro = { inicio: 0, fin: 0 }
                $scope.obtenerPrerequisitosPaciente(paciente.id, false);
                /*  $scope.verificarAsignacionPrerequisitos(paciente)
                 $scope.obtenertodoslosPrerequisitos() */
                $scope.abrirPopup($scope.IdModalDialogPreRequisitos);

            }
            $scope.abrirDialogPrerequisitosConfig = (config, id) => {
                $scope.obtenerPrerequisitosPaciente(id, config)
                $scope.abrirPopup($scope.idModalDialogPrerequisitosConfig);
            }

            $scope.abrirDialogHistoricoPreRequisito = function (id_prerequisito, id_paciente, nombre) {
                $scope.nombrePrereq = nombre
                $scope.id_prerequisito = id_prerequisito
                $scope.id_paciente = id_paciente
                $scope.filtropre = { inicio: 0, fin: 0 }
                var filtro = { inicio: 0, fin: 0 }
                var promesa = PrerequisitosHistorial({ id_pre: id_prerequisito, id_pac: id_paciente, inicio: filtro.inicio, fin: filtro.fin });
                promesa.then(function (preRequisitos) {
                    $scope.historialPrerequisitosPaciente = preRequisitos.historial;
                    blockUI.stop();
                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                });
                $scope.abrirPopup($scope.idModalHistorialPrerequisito);
            }

            $scope.abrirDialogEditarPreRequisito = function (prerequisito) {
                $scope.prerequisito = prerequisito
                $scope.prerequisito.fecha_vencimiento_texto = $scope.fechaATexto(prerequisito.fecha_vencimiento)
                $scope.abrirPopup($scope.idModalEditarPrerequisito);
            }
            $scope.cerrarDialogPrerequisitosConfig = () => {
                $scope.cerrarPopup($scope.idModalDialogPrerequisitosConfig);
            }
            $scope.cerrarDialogEditarPreRequisito = function () {
                $scope.cerrarPopup($scope.idModalEditarPrerequisito);
            }
            $scope.verificarFechaEntregaPrerequisito = function (preRequisito, paciente, alertas) {
                $scope.preRequisito = preRequisito
                if (paciente === undefined) {
                    $scope.paciente = preRequisito.pacientePrerequisito
                } else {
                    $scope.paciente = paciente
                }
                $scope.abrirDialogEntregaPreRequisito($scope.preRequisito, $scope.paciente, alertas);
            }
            $scope.cerrarDialogHistoricoPreRequisito = function () {
                $scope.cerrarPopup($scope.idModalHistorialPrerequisito);
            }

            $scope.filtrarHistorialPrerequisito = function (id_prerequisito, id_paciente, filtro) {
                if (filtro != undefined) {
                    var fecha_inicio = filtro.inicio && filtro.inicio.length == 10 ? filtro.inicio : 0;
                    var fecha_fin = filtro.fin && filtro.fin.length == 10 ? filtro.fin : 0;
                    filtro = { inicio: fecha_inicio, fin: fecha_fin }
                } else {
                    var filtro = { inicio: 0, fin: 0 }
                }
                var promesa = PrerequisitosHistorial({ id_pre: id_prerequisito, id_pac: id_paciente, inicio: filtro.inicio, fin: filtro.fin });
                promesa.then(function (preRequisitos) {
                    $scope.historialPrerequisitosPaciente = preRequisitos.historial;
                    blockUI.stop();
                });
            }
            $scope.abrirDialogEntregaPreRequisito = function (PreRequisito, paciente, alertas) {
                $scope.preRequisito = PreRequisito
                $scope.preRequisito.alertas = alertas
                $scope.preRequisito.nueva_fecha_entrega = $scope.fechaATexto(new Date())
                $scope.preRequisito.nueva_fecha_emision = null
                $scope.preRequisito.nueva_fecha_vencimiento = null
                $('#id-doc-prerequisito').ace_file_input('reset_input_ui');
                $('#id-doc-prerequisito').ace_file_input('reset_input');
                $scope.paciente = paciente;
                $scope.abrirPopup($scope.IdEntregaPrerequisito);
                $(' #' + $scope.IdEntregaPrerequisito).dialog({
                    dialogClass: "entrega-prerequisito"
                })
            }
            $scope.cerrarIdModalDialogPreRequisitos = function () {
                $scope.cerrarPopup($scope.IdModalDialogPreRequisitos);
            }
            $scope.cerrarPopUpEntregaPreRequisito = function () {
                $scope.cerrarPopup($scope.IdEntregaPrerequisito);
            }
            $scope.guardarEntregaPrerequisito = function (prerequisito) {
                $scope.modulo = $location.$$path.split('/')[1];
                var f = null
                var f_emision = false
                var f_vcto = false
                if (prerequisito.nueva_fecha_entrega && prerequisito.nueva_fecha_entrega.length == "10") {
                    let hoy = new Date()
                    let horas = hoy.getHours() < 10 ? "0" + hoy.getHours() + ":" : hoy.getHours() + ":";
                    let minutos = hoy.getMinutes() < 10 ? "0" + hoy.getMinutes() + ":" : hoy.getMinutes() + ":";
                    let segundos = hoy.getSeconds() < 10 ? "0" + hoy.getSeconds() : hoy.getSeconds();
                    prerequisito.nueva_fecha_entrega = prerequisito.nueva_fecha_entrega.split('/').reverse().join('-') + " " + horas + minutos + segundos;

                    if (prerequisito.nueva_fecha_emision && prerequisito.nueva_fecha_emision.length == 10) {
                        prerequisito.nueva_fecha_emision = prerequisito.nueva_fecha_emision.split('/').reverse().join('-') + " " + horas + minutos + segundos;
                        if (!$scope.verficarDiferenciaEntreFechas(new Date(prerequisito.nueva_fecha_entrega), new Date(prerequisito.nueva_fecha_emision))) {
                            prerequisito.nueva_fecha_entrega = fechaATexto(new Date())
                            prerequisito.nueva_fecha_emision = ""
                            return SweetAlert.swal("", "<b>Datos inconsistentes</b><br>No se pueden entregar documentos con fechas anteriores a su emisión.", "error");
                        }
                        f_emision = true;
                    }
                    if (prerequisito.nueva_fecha_vencimiento && prerequisito.nueva_fecha_vencimiento.length == 10) {
                        prerequisito.nueva_fecha_vencimiento = prerequisito.nueva_fecha_vencimiento.split('/').reverse().join('-') + " " + horas + minutos + segundos;
                        if (!$scope.verficarDiferenciaEntreFechas(new Date(prerequisito.nueva_fecha_vencimiento), new Date(prerequisito.nueva_fecha_entrega))) {
                            prerequisito.nueva_fecha_entrega = fechaATexto(new Date())
                            prerequisito.nueva_fecha_emision = ""
                            prerequisito.nueva_fecha_vencimiento = ""
                            return SweetAlert.swal("", "<b>Datos inconsistentes</b><br>No se puede registrar fecha de vencimiento anterior a hoy.", "error");
                        }
                        f_vcto = true;
                    }
                    if (!f_emision && !f_vcto) {
                        prerequisito.nueva_fecha_entrega = fechaATexto(new Date())
                        prerequisito.nueva_fecha_emision = ""
                        prerequisito.nueva_fecha_vencimiento = ""
                        return SweetAlert.swal("", "<b>Datos inconsistentes</b><br>Ingrese fecha de emisión o vencimiento.", "error");
                    }
                    blockUI.start();
                    prerequisito.asignado = true
                    if (!f_vcto) {
                        let fecha = new Date(prerequisito.nueva_fecha_emision)
                        prerequisito.nueva_fecha_vencimiento = new Date(fecha.setMonth(fecha.getMonth() + prerequisito.vencimiento_mes))
                    }
                    f = document.getElementById($scope.idInputDocPrerequisito).files[0],
                        r = new FileReader();
                    if (f) {
                        r.onloadend = function (e) {
                            prerequisito.documento2 = { name: "", data: null }
                            prerequisito.documento2.name = prerequisito.nuevo_documento[0].name
                            prerequisito.documento2.data = e.target.result;
                            $scope.GuardarPrerequisitoPacienteEntrega(prerequisito, $scope.modulo)
                            blockUI.stop();
                            //send your binary data via $http or $resource or do anything else with it
                        }
                        r.readAsBinaryString(f);
                    } else {
                        $scope.GuardarPrerequisitoPacienteEntrega(prerequisito, $scope.modulo)
                        blockUI.stop();
                    }
                } else {
                    SweetAlert.swal("", "Fecha de entrega  incorrecta", "error");
                }
            }

            $scope.verficarDiferenciaEntreFechas = (fecha1, fecha2) => {
                if (fecha1 && fecha2) {
                    fecha1.setHours(0, 0, 0, 0)
                    fecha2.setHours(0, 0, 0, 0)
                    if (fecha1 >= fecha2) return true
                    return false
                }
            }
            $scope.reprogramarPrerequisitos = function (id, fecha_reprogramada, alertas) {
                if (fecha_reprogramada.length == 10 && id) {
                    fecha_reprogramada = fecha_reprogramada.split('/').reverse().join('-') + " 00:00:00"
                    let fecha = new Date(fecha_reprogramada);
                    let hoy = new Date()
                    hoy.setHours(0, 0, 0, 0)
                    if (fecha >= hoy) {
                        blockUI.start()
                        ReprogramarPrerequisitoPaciente({ id, fecha_reprogramada })
                            .then(result => {
                                SweetAlert.swal("", result.message, result.messageType);
                                if (!result.error) {
                                    $scope.obtenerNumeroAlertas()
                                    alertas ? $scope.listaAlertasPrerequisitosPaciente(true) : $scope.obtenerPrerequisitosPaciente($scope.paciente.id);
                                    alertas ? $scope.cerrarDialogReprogramarPrerequisitos() : $scope.cerrarDialogEditarPreRequisito();
                                }
                                blockUI.stop()
                            })
                    } else {
                        SweetAlert.swal("", "La fecha de reprogramación no puede ser anterior a hoy.", "error");
                    }
                } else {
                    SweetAlert.swal("", "Formato fecha no válida", "error");

                }
            }
            $scope.cerrarDialogReprogramarPrerequisitos = function () {
                $scope.cerrarPopup($scope.idModalReprogramarPrerequisitos);
            }

            $scope.GuardarPrerequisitoPacienteEntrega = function (prerequisito, modulo) {
                GuardarPrerequisitoPaciente(prerequisito)
                    .then(res => {
                        if (!res.error) {
                            SweetAlert.swal("", res.message, res.messageType);
                            $scope.obtenerPrerequisitosPaciente(prerequisito.paciente, false,)
                            if (modulo === "rrhh" || modulo === "pacientes") {
                                $scope.obtenerNumeroAlertas();
                                if (prerequisito.alertas) $scope.listaAlertasPrerequisitosPaciente(false);
                            }
                            $scope.cerrarPopUpEntregaPreRequisito()
                        } else {
                            SweetAlert.swal("", res.message, res.messageType);
                            blockUI.stop();
                        }
                    })
            }

            $scope.abrirDialogDialogAlertPrerequisitos = function () {
                $scope.modulo = $location.$$path.split('/')[1];
                $scope.filtroAlertaPrereq = { inicio: 0, fin: 0 }
                $scope.paginatorAlertasPrereq = Paginator();
                $scope.paginatorAlertasPrereq.column = "fecha_vencimiento";
                $scope.paginatorAlertasPrereq.direction = "asc";
                $scope.paginatorAlertasPrereq.itemsPerPage = "10";
                $scope.textSearch = ""
                $scope.paginatorAlertasPrereq.callBack = $scope.listaAlertasPrerequisitosPaciente;
                $scope.paginatorAlertasPrereq.getSearch($scope.textSearch, $scope.filtroAlertaPrereq, null);
                $scope.abrirPopup($scope.idModalAlertPrerequisitos);
            }

            $scope.cerrarDialogDialogAlertPrerequisitos = function () {
                $scope.cerrarPopup($scope.idModalAlertPrerequisitos);
            }

            $scope.listaAlertasPrerequisitosPaciente = function (buscar) {
                $scope.paginatorAlertasPrereq.filter = $scope.filtroAlertaPrereq;
                if (buscar) $scope.paginatorAlertasPrereq.currentPage = 1
                ListaAlertasPrerequisitosPaciente($scope.usuario.id_empresa, $scope.paginatorAlertasPrereq)
                    .then(function (datos) {
                        if (!datos.error) {
                            $scope.paginatorAlertasPrereq.setPages(datos.paginas)
                            $scope.alertaPrerequisitos = datos.empleados;
                        } else {
                            console.log('rec', datos);
                        }
                    })
            }
            $scope.abrirDialogReprogramarPrerequisitos = function (prerequisito) {
                $scope.preRequisito = prerequisito
                $scope.abrirPopup($scope.idModalReprogramarPrerequisitos);
            }
            $scope.abrirDialogReportesPrerequisitos = () => {
                $scope.filtroP = {
                    inicio: 0,
                    fin: 0,
                    eEmpleados: 'TODOS',
                    ePre: "TODOS",
                    eCargo: "TODOS",
                    eCampo: "TODOS"

                }
                $scope.listarCampos();
                $scope.abrirPopup($scope.idModalReportesPrerequisitosGeneral);
            }
            $scope.cerrarDialogReportesPrerequisitos = () => {
                $scope.cerrarPopup($scope.idModalReportesPrerequisitosGeneral)
            }
            $scope.reporteExcelPrerequisitos = async (filtro) => {
                SweetAlert.swal({
                    title: '',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    text: 'Generando reporte, por favor espere...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let cargosPrerequisitos = await ListaPrerequisitosCargos($scope.usuario.id_empresa, filtro);
                if (cargosPrerequisitos.error) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", cargosPrerequisitos.message, cargosPrerequisitos.messageType);
                }
                const { datos } = cargosPrerequisitos
                var data = [["NRO", "PREREQUISITO", "ESTADO PREREQUISITO", "CARGO", "CARGO HABILITADO", "CARGO ELIMINADO", "VENCIMIENTO"]];
                for (let i = 0; i < datos.length; i++) {
                    data.push([
                        i + 1,
                        datos[i].prerequisito ? datos[i].prerequisito.toString() : '',
                        datos[i].pre_activo ? 'ACTIVO' : 'INACTIVO',
                        datos[i].cargo ? datos[i].cargo : '',
                        datos[i].cargo_habilitado ? 'HABILITADO' : 'DESHABILITADO',
                        datos[i].cargo_eliminado ? 'SI' : 'NO',
                        datos[i].vencimiento_mes ? datos[i].vencimiento_mes : 0
                    ])
                }
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-GENERAL-CARGOS-PREREQUISITOS.xlsx");
                swal.close();
            }

            $scope.reporteExcelPrerequisitosEntregas = async (filtro, empleado) => {
                SweetAlert.swal({
                    title: '',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    text: 'Generando reporte, por favor espere...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let res = await ListaPrerequisitosEntregas($scope.usuario.id_empresa, filtro, empleado);
                if (res.error) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", res.message, res.messageType);
                }
                const { datos } = res
                var data = [["NRO", "NOMBRE COMPLETO", "ESTADO EMPLEADO", "CARGO", "ESTADO CARGO", "CAMPO", "ESTADO CAMPO", "PREREQUISITO", "ESTADO PREREQUISITO", "VENCIMIENTO EN MESES", "FECHA ENTREGA", "FECHA EMISIÓN", "FECHA VENCIMIENTO", "OBSERVACIÓN", "ADJUNTO"]];
                for (let i = 0; i < datos.length; i++) {
                    data.push([
                        i + 1,
                        datos[i].nombre_completo ? datos[i].nombre_completo.toString() : '',
                        datos[i].eliminado ? 'INACTIVO' : 'ACTIVO',
                        datos[i].cargo ? datos[i].cargo : '',
                        datos[i].estado_cargo ? 'HABILITADO' : 'DESHABILITADO',
                        datos[i].campo ? datos[i].campo.toString() : '',
                        datos[i].estado_campo ? 'HABILITADO' : 'DESHABILITADO',
                        datos[i].nombre_prerequisito ? datos[i].nombre_prerequisito.toString() : '',
                        datos[i].estado_prerequisito ? 'HABILITADO' : 'DESHABILITADO',
                        datos[i].vencimiento_mes ? datos[i].vencimiento_mes : '',

                        datos[i].fecha_entrega ? fechaATexto(datos[i].fecha_entrega) : '',
                        datos[i].fecha_emision ? fechaATexto(datos[i].fecha_emision) : '',
                        datos[i].fecha_vencimiento ? fechaATexto(datos[i].fecha_vencimiento) : '',
                        datos[i].observacion ? datos[i].observacion.toString() : '',
                        datos[i].documento ? "SI" : 'NO',
                    ])
                }
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-GENERAL-ENTREGA-PREREQUISITOS.xlsx");
                swal.close();
            }

            $scope.reportePdfPrerequisitosEntregas = async (filtro, id_paciente) => {
                SweetAlert.swal({
                    title: '',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    text: 'Generando reporte, por favor espere...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let res = await ListaPrerequisitosEntregas($scope.usuario.id_empresa, filtro, id_paciente);
                if (res.error) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", res.message, res.messageType);
                }
                let { datos } = res
                if (!datos.length > 0) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", "<b>Sin registros</b><br><small>No se encontraron registros para generar el reporte</small>", res.messageType);
                }
                datos = Object.values(datos.reduce((ac, val) => {
                    if (!ac[val.id_paciente + val.id_prerequisito]) {
                        ac[val.id_paciente + val.id_prerequisito] = val
                    } else {
                        if (!ac[val.id_paciente + val.id_prerequisito].cargo_principal) {
                            ac[val.id_paciente + val.id_prerequisito] = val
                        }
                    }
                    return ac
                }, {}))
                datos.sort((a, b) => {
                    if (a.fecha_entrega < b.fecha_entrega) return 1;
                    if (a.fecha_entrega > b.fecha_entrega) return -1;
                    return 0;
                })
                let metaData = "Fecha Impresión: " + $scope.formatoFechaHora(new Date()) + "         Generado por: " + $scope.usuario.nombre_usuario;
                var x = 30, y = 85, items = 0, itemsPage = 55, pagina = 1, totalPaginas = Math.ceil(datos.length / itemsPage);
                var doc = new PDFDocument({ size: 'letter', margin: 15, compress: false });
                var stream = doc.pipe(blobStream());
                doc.lineWidth(0.35)
                doc.lineGap(-2)
                $scope.headerReportePrerequisitosEntregas(doc, 1, totalPaginas, datos[0], filtro, metaData);
                doc.font('Helvetica', 6);
                for (let i = 0; i < datos.length; i++) {
                    const dato = datos[i];
                    doc.rect(x, y, 562, 12).stroke();
                    doc.text(i + 1, x + 2, y + 4, { width: 18 }); x += 20;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.nombre_prerequisito ? dato.nombre_prerequisito.toUpperCase() : '', x + 2, y + 2, { width: 128 }); x += 130;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.cargo ? dato.cargo.toUpperCase() : '', x + 2, y + 2, { width: 93 }); x += 95;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.vencimiento_mes ? dato.vencimiento_mes : '', x + 2, y + 4, { width: 33, align: "center" }); x += 35;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_entrega ? fechaATexto(dato.fecha_entrega) : '', x + 2, y + 4, { width: 38, align: "center" }); x += 40;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_emision ? fechaATexto(dato.fecha_emision) : '', x + 2, y + 4, { width: 38, align: "center" }); x += 40;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_vencimiento ? fechaATexto(dato.fecha_vencimiento) : '', x + 2, y + 4, { width: 43, align: "center" }); x += 45;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.observacion ? dato.observacion.toUpperCase() : '', x + 2, y + 4, { width: 120 }); x += 122;
                    doc.rect(x, y, 0, 12).stroke();
                    if (dato.documento) {
                        doc.text("SI", x + 2, y + 4, { link: $scope.base_url + dato.documento, width: 35, align: "center" });
                    } else {
                        doc.text("NO", x + 2, y + 4, { width: 35, align: "center" });
                    }
                    items++;
                    y += 12
                    x = 30
                    if (items >= itemsPage) {
                        pagina++;
                        doc.addPage({ size: 'letter', margin: 15, compress: false });
                        $scope.headerReportePrerequisitosEntregas(doc, pagina, totalPaginas, datos[0], filtro, metaData);
                        doc.font('Helvetica', 6);
                        items = 0;
                        y = 85;
                        x = 30
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                    swal.close();
                });
            }

            $scope.headerReportePrerequisitosEntregas = (doc, pagina, totalPaginas, empleado, filtro, metaData) => {
                let x = 30, y = 30
                doc.font('Helvetica-Bold', 9).text("CONTROL DOCUMENTAL", 0, y, { width: 612, align: "center" }); y += 10
                if (filtro.inicio && filtro.fin) doc.font('Helvetica', 6).text("Del " + filtro.inicio + " Al " + filtro.fin, 0, y, { width: 612, align: "center" }); y += 20

                doc.font('Helvetica-Bold', 6).text("NOMBRE: ", x, y);
                doc.font('Helvetica', 6).text(empleado.nombre_completo ? empleado.nombre_completo.toString() : "", x + 30, y); y += 10

                doc.font('Helvetica-Bold', 6)
                doc.rect(x, y, 562, 15).fillAndStroke("#C5D6E1", "#000").fillColor('#000');
                doc.text("N°", x, y + 6, { width: 20, align: "center" }); x += 20;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("PREREQUISITO", x, y + 6, { width: 130, align: "center" }); x += 130;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("CARGO", x, y + 6, { width: 95, align: "center" }); x += 95;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("VCTO EN MESES", x, y + 2, { width: 35, align: "center" }); x += 35;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA ENTREGA", x, y + 2, { width: 40, align: "center" }); x += 40;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA EMISIÓN", x, y + 2, { width: 40, align: "center" }); x += 40;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA VENCIMIENTO", x, y + 2, { width: 45, align: "center" }); x += 45;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("OBSERVACIÓN", x, y + 6, { width: 122, align: "center" }); x += 122;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("ADJUNTO", x, y + 6, { width: 35, align: "center" });
                doc.font('Helvetica-Bold', 6).text("Página " + pagina + " de " + totalPaginas, 0, 755, { width: 612, align: "center" })
                doc.font('Helvetica', 5).text(metaData, 0, 762, { width: 612, align: "center" })
            }

            $scope.reportePdfPrerequisitosEntregasGrl = async (filtro, id_paciente) => {
                SweetAlert.swal({
                    title: '',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    text: 'Generando reporte, por favor espere...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let res = await ListaPrerequisitosEntregas($scope.usuario.id_empresa, filtro, false);
                if (res.error) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", res.message, res.messageType);
                }
                let { datos } = res
                if (!datos.length > 0) {
                    SweetAlert.hideLoading();
                    return SweetAlert.swal("", "<b>Sin registros</b><br><small>No se encontraron registros para generar el reporte</small>", "warning");
                }
                datos = Object.values(datos.reduce((ac, val) => {
                    if (!ac[val.id_paciente + val.id_prerequisito]) {
                        ac[val.id_paciente + val.id_prerequisito] = val
                    } else {
                        if (!ac[val.id_paciente + val.id_prerequisito].cargo_principal) {
                            ac[val.id_paciente + val.id_prerequisito] = val
                        }
                    }
                    return ac
                }, {}))
                datos.sort((a, b) => {
                    if (a.fecha_entrega < b.fecha_entrega) return 1;
                    if (a.fecha_entrega > b.fecha_entrega) return -1;
                    return 0;
                })
                let metaData = "Fecha Impresión: " + $scope.formatoFechaHora(new Date()) + "         Generado por: " + $scope.usuario.nombre_usuario;
                var x = 30, y = 85, items = 0, itemsPage = 40, pagina = 1, totalPaginas = Math.ceil(datos.length / itemsPage);
                var doc = new PDFDocument({ size: 'letter', layout: 'landscape', margin: 15, compress: false });
                var stream = doc.pipe(blobStream());
                doc.lineWidth(0.35)
                doc.lineGap(-2)
                $scope.headerReportePrerequisitosEntregasGrl(doc, 1, totalPaginas, datos[0], filtro, metaData);
                doc.font('Helvetica', 6);
                for (let i = 0; i < datos.length; i++) {
                    const dato = datos[i];
                    doc.rect(x, y, 742, 12).stroke();
                    doc.text(i + 1, x + 2, y + 4, { width: 18 }); x += 20;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.nombre_completo ? dato.nombre_completo.toUpperCase() : '', x + 2, y + 4, { width: 178 }); x += 180;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.nombre_prerequisito ? dato.nombre_prerequisito.toUpperCase() : '', x + 2, y + 4, { width: 128 }); x += 130;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.cargo ? dato.cargo.toUpperCase() : '', x + 2, dato.cargo.length > 24 ? y + 1 : y + 4, { width: 93 }); x += 95;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.vencimiento_mes ? dato.vencimiento_mes : '', x + 2, y + 4, { width: 33, align: "center" }); x += 35;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_entrega ? fechaATexto(dato.fecha_entrega) : '', x + 2, y + 4, { width: 38, align: "center" }); x += 40;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_emision ? fechaATexto(dato.fecha_emision) : '', x + 2, y + 4, { width: 38, align: "center" }); x += 40;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.fecha_vencimiento ? fechaATexto(dato.fecha_vencimiento) : '', x + 2, y + 4, { width: 43, align: "center" }); x += 45;
                    doc.rect(x, y, 0, 12).stroke();
                    doc.text(dato.observacion ? dato.observacion.toUpperCase() : '', x + 2, y + 4, { width: 120 }); x += 122;
                    doc.rect(x, y, 0, 12).stroke();
                    if (dato.documento) {
                        doc.text("SI", x + 2, y + 4, { link: $scope.base_url + dato.documento, width: 35, align: "center" });
                    } else {
                        doc.text("NO", x + 2, y + 4, { width: 35, align: "center" });
                    }
                    items++;
                    y += 12
                    x = 30
                    if (items > itemsPage) {
                        pagina++;
                        doc.addPage({ size: 'letter', layout: 'landscape', margin: 15, compress: false });
                        $scope.headerReportePrerequisitosEntregasGrl(doc, pagina, totalPaginas, datos[0], filtro, metaData);
                        doc.font('Helvetica', 6);
                        items = 0;
                        y = 85;
                        x = 30
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                    swal.close();
                });
            }

            $scope.headerReportePrerequisitosEntregasGrl = (doc, pagina, totalPaginas, empleado, filtro, metaData) => {
                let x = 30, y = 30
                doc.font('Helvetica-Bold', 9).text("CONTROL DOCUMENTAL", 0, y, { width: 792, align: "center" }); y += 10
                if (filtro.inicio && filtro.fin) doc.font('Helvetica', 6).text("Del " + filtro.inicio + " Al " + filtro.fin, 0, y, { width: 792, align: "center" }); y += 20

                doc.font('Helvetica-Bold', 6).text("PREREQUISITO: ", x, y);
                doc.font('Helvetica', 6).text(filtro.prerequisito ? empleado.nombre_prerequisito.toUpperCase() : "TODOS", x + 50, y); y += 10

                doc.font('Helvetica-Bold', 6)
                doc.rect(x, y, 742, 15).fillAndStroke("#C5D6E1", "#000").fillColor('#000')
                doc.text("N°", x, y + 6, { width: 20, align: "center" }); x += 20;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("NOMBRE COMPLETO", x, y + 6, { width: 180, align: "center" }); x += 180;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("PREREQUISITO", x, y + 6, { width: 130, align: "center" }); x += 130;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("CARGO", x, y + 6, { width: 95, align: "center" }); x += 95;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("VCTO EN MESES", x, y + 3, { width: 35, align: "center" }); x += 35;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA ENTREGA", x, y + 3, { width: 40, align: "center" }); x += 40;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA EMISIÓN", x, y + 3, { width: 40, align: "center" }); x += 40;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("FECHA VENCIMIENTO", x, y + 3, { width: 45, align: "center" }); x += 45;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("OBSERVACIÓN", x, y + 6, { width: 122, align: "center" }); x += 122;
                doc.rect(x, y, 0, 15).stroke();
                doc.text("ADJUNTO", x, y + 6, { width: 35, align: "center" });
                doc.font('Helvetica-Bold', 6).text("Página " + pagina + " de " + totalPaginas, 0, 580, { width: 792, align: "center" })
                doc.font('Helvetica', 5).text(metaData, 0, 587, { width: 792, align: "center" })
            }

            $scope.listarCampos = async () => {
                $scope.camposEmpresa = []
                let res = await GetCamposEmpresa("CENCOS", $scope.usuario.id_empresa)
                if (res.error) return console.error(res.message);
                $scope.camposEmpresa = res.campos
            }

            $scope.cambiarTipoPagoCompra = function (compra) {
                var tipoPagoO = compra.tipoPago
                var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPagoO.id; })[0];
                compra.tipoPago = tipoPago;
                compra.a_cuenta = 0;
                $scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
            }

            $scope.obtenerEdad = function (dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }

            $scope.cerrarPopPupKardex = function () {
                $scope.cerrarPopup($scope.idModalWizardProductoKardex);
                // $scope.search.inventario.lote = "";
                $scope.filtroKardexProducto = { sucursal: null, almacen: null, fechaInicioTexto: "", fechaFinTexto: "", lote: "" }
            }
            $scope.generarPdfKardexProducto = function (kardexproduto, tipo) {
                if (kardexproduto && kardexproduto.detallesMovimiento && kardexproduto.detallesMovimiento.length > 0) {
                    SweetAlert.swal({
                        title: 'Generando documento...',
                        icon: 'info',
                        iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;
                    convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                        let det = kardexproduto.detallesMovimiento;
                        let meta = "Impreso por: " + $scope.usuario.nombre_usuario + "         Fecha: " + $scope.formatoFechaHora(new Date());
                        let telefonos = ""
                        if ($scope.usuario.empresa.telefono1) telefonos += " " + $scope.usuario.empresa.telefono1
                        if ($scope.usuario.empresa.telefono2) telefonos += " " + $scope.usuario.empresa.telefono2
                        if ($scope.usuario.empresa.telefono3) telefonos += " " + $scope.usuario.empresa.telefono3
                        let doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                        let stream = doc.pipe(blobStream());
                        let y = 180, itemsPorPagina = 55, items = 0, pagina = 1, totalPaginas = Math.ceil(det.length / itemsPorPagina);
                        $scope.dibujarCabeceraPDFKardexProducto(doc, kardexproduto, $scope.filtroKardexProducto, pagina, totalPaginas, logo, meta, telefonos, tipo);
                        for (let i = 0; i < det.length; i++) {
                            let d = det[i];
                            doc.lineGap(-2);
                            if (i % 2 != 0) doc.rect(30, y + 0.5, 552, 10).fill('#E4EAF9').fillColor('#000');
                            if (tipo) {
                                doc.text(i + 1, 30, y + 3, { width: 30, align: "center" });
                                doc.text(d.movimiento && d.movimiento.fecha ? $scope.formatoFechaHora(d.movimiento.fecha) : "", 60, y + 3, { width: 70, align: "center" });
                                doc.text(d.tipo ? d.tipo : "", 132, y + 3, { width: 120 });
                                doc.text(d.costo_unitario ? number_format_negativo_to_positvo(d.costo_unitario, 2) : "", 252, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVING" ? number_format_negativo_to_positvo(d.cantidad, 2) : "0.00", 282, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVEGR" ? number_format_negativo_to_positvo(d.cantidad, 2) : "0.00", 312, y + 3, { width: 29, align: "right" });
                                doc.text(d.saldoFisico ? number_format_negativo_to_positvo(d.saldoFisico, 2) : "", 342, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVING" ? d.cantidad && d.costo_unitario ? number_format_negativo_to_positvo(d.cantidad * d.costo_unitario, 2) : "0.00" : "0.00", 372, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVEGR" ? d.cantidad && d.costo_unitario ? number_format_negativo_to_positvo(d.cantidad * d.costo_unitario, 2) : "0.00" : "0.00", 402, y + 3, { width: 29, align: "right" });
                                doc.text(d.saldoV ? number_format_negativo_to_positvo(d.saldoV, 2) : "", 432, y + 3, { width: 29, align: "right" });
                                doc.text(d.lote ? d.lote : "", 462, y + 3, { width: 70, align: "center" });
                                doc.text(d.fecha_vencimiento ? fechaATexto(d.fecha_vencimiento) : "", 532, y + 3, { width: 50, align: "center" });
                            } else {
                                doc.text(i + 1, 30, y + 3, { width: 30, align: "center" });
                                doc.text(d.movimiento && d.movimiento.fecha ? $scope.formatoFechaHora(d.movimiento.fecha) : "", 60, y + 3, { width: 70, align: "center" });
                                doc.text(d.tipo ? d.tipo : "", 132, y + 3, { width: 120 });
                                doc.text(d.costo_unitario ? number_format_negativo_to_positvo(d.costo_unitario, 2) : "", 312, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVING" ? number_format_negativo_to_positvo(d.cantidad, 2) : "0.00", 342, y + 3, { width: 29, align: "right" });
                                doc.text(d.movimiento.tipo && d.movimiento.tipo.nombre_corto === "MOVEGR" ? number_format_negativo_to_positvo(d.cantidad, 2) : "0.00", 382, y + 3, { width: 29, align: "right" });
                                doc.text(d.saldoFisico ? number_format_negativo_to_positvo(d.saldoFisico, 2) : "", 422, y + 3, { width: 29, align: "right" });
                                doc.text(d.lote ? d.lote : "", 462, y + 3, { width: 70, align: "center" });
                                doc.text(d.fecha_vencimiento ? fechaATexto(d.fecha_vencimiento) : "", 532, y + 3, { width: 50, align: "center" });
                            }
                            y += 10; items++;
                            if (items === itemsPorPagina) {
                                doc.addPage({ size: 'letter', margin: 10, compress: false });
                                y = 180;
                                items = 0;
                                pagina++;
                                $scope.dibujarCabeceraPDFKardexProducto(doc, kardexproduto, $scope.filtroKardexProducto, pagina, totalPaginas, logo, meta, telefonos, tipo);

                            }

                        }
                        doc.end();
                        stream.on('finish', function () {
                            swal.close();
                            let fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                    })
                } else {
                    SweetAlert.swal("", "<b>No se encontrarón productos en el periodo seleccionado</b>", "info")
                }
            }

            $scope.dibujarCabeceraPDFKardexProducto = function (doc, producto, filtro, pagina, totalPaginas, logo, meta, telefonos, tipo) {
                let x = 30, y = 30
                if (logo != "error") {
                    doc.image(logo, x, y, { fit: [69, 49] });
                    x += 73
                }
                doc.font('Helvetica-Bold', 7).text($scope.usuario.empresa.razon_social, x, y); y += 10;
                doc.font('Helvetica', 6)
                doc.text($scope.usuario.empresa.direccion ? $scope.usuario.empresa.direccion : "", x, y); y += 10;
                if (telefonos) doc.text(telefonos ? "TELF:" + telefonos : "", x, y); y += 35;
                doc.font('Helvetica-Bold', 9).text("KARDEX", 0, y, { width: 612, align: "center" }); y += 10;
                doc.font('Helvetica-Bold', 8).text(producto.nombre, 0, y, { width: 612, align: "center" }); y += 10;
                y += 5;
                x = 30
                doc.lineWidth(0.45);
                doc.lineWidth(0.6).rect(x, y, 552, 10).fillAndStroke("#D2DCF7", "#121314"); y += 10;
                doc.lineWidth(0.6).rect(x, y, 552, 10).fillAndStroke("#FFF", "#121314"); y += 10;
                doc.lineWidth(0.6).rect(x, y, 552, 10).fillAndStroke("#D2DCF7", "#121314"); y += 10;
                doc.lineWidth(0.6).rect(x, y, 552, 10).fillAndStroke("#FFF", "#121314"); y += 20;
                y -= 50;
                doc.rect(168, y, 0, 40).fillAndStroke("#121314", "#121314");
                doc.rect(306, y, 0, 40).fillAndStroke("#121314", "#121314");
                doc.rect(444, y, 0, 40).fillAndStroke("#121314", "#121314");
                doc.font('Helvetica-Bold', 7).fill("#121314");
                doc.text("SUCURSAL", 30, y + 3, { width: 138, align: "center" });
                doc.text("DESDE", 168, y + 3, { width: 138, align: "center" });
                doc.text("CÓDIGO", 306, y + 3, { width: 138, align: "center" });
                doc.text("INV. MÍNIMO", 444, y + 3, { width: 138, align: "center" });
                doc.font('Helvetica', 7);
                doc.text(filtro.sucursal ? filtro.sucursal.nombre : "", 30, y + 13, { width: 138, align: "center" });
                doc.text(filtro.fechaInicioTexto ? filtro.fechaInicioTexto : "", 168, y + 13, { width: 138, align: "center" });
                doc.text(producto.codigo ? producto.codigo : "", 306, y + 13, { width: 138, align: "center" });
                doc.text(producto.inventario_minimo ? producto.inventario_minimo : "", 444, y + 13, { width: 138, align: "center" });
                y += 20;
                doc.font('Helvetica-Bold', 7).fill("#121314");
                doc.text("ALMACÉN", 30, y + 3, { width: 138, align: "center" });
                doc.text("HASTA", 168, y + 3, { width: 138, align: "center" });
                doc.text("UNIDAD DE MEDIDA", 306, y + 3, { width: 138, align: "center" });
                doc.text("INV. MÁXIMO", 444, y + 3, { width: 138, align: "center" });
                doc.font('Helvetica', 7);
                doc.text(filtro.almacen ? filtro.almacen.nombre : "", 30, y + 13, { width: 138, align: "center" });
                doc.text(filtro.fechaFinTexto ? filtro.fechaFinTexto : "", 168, y + 13, { width: 138, align: "center" });
                doc.text(producto.unidad_medida ? producto.unidad_medida : "", 306, y + 13, { width: 138, align: "center" });
                doc.text(producto.inventario_maximo ? producto.inventario_maximo : "", 444, y + 13, { width: 138, align: "center" });
                y += 30
                doc.font('Helvetica-Bold', 6)
                if (tipo) {
                    doc.text('N°', 30, y + 8, { width: 30, align: "center" });
                    doc.text('FECHA', 60, y + 8, { width: 70, align: "center" });
                    doc.text('DETALLE', 130, y + 8, { width: 122, align: "center" });
                    doc.text('C/U', 252, y + 8, { width: 30, align: "center" });
                    doc.text('FÍSICO', 282, y + 3, { width: 90, align: "center" });
                    doc.text('INGRESO', 282, y + 12, { width: 30, align: "center" });
                    doc.text('SALIDA', 312, y + 12, { width: 30, align: "center" });
                    doc.text('SALDO', 342, y + 12, { width: 30, align: "center" });
                    doc.text('VALUADO', 372, y + 3, { width: 90, align: "center" });
                    doc.text('INGRESO', 372, y + 12, { width: 30, align: "center" });
                    doc.text('SALIDA', 402, y + 12, { width: 30, align: "center" });
                    doc.text('SALDO', 432, y + 12, { width: 30, align: "center" });
                    doc.text('LOTE', 462, y + 8, { width: 70, align: "center" });
                    doc.text('FECHA VENCIMIENTO', 532, y + 3, { width: 50, align: "center" });
                    doc.rect(60, y, 0, 20).stroke();
                    doc.rect(130, y, 0, 20).stroke();
                    doc.rect(252, y, 0, 20).stroke();
                    doc.rect(282, y, 0, 20).stroke();
                    doc.rect(312, y + 10, 0, 10).stroke();
                    doc.rect(342, y + 10, 0, 10).stroke();
                    doc.rect(372, y, 0, 20).stroke();
                    doc.rect(402, y + 10, 0, 10).stroke();
                    doc.rect(432, y + 10, 0, 10).stroke();
                    doc.rect(462, y, 0, 20).stroke();
                    doc.rect(532, y, 0, 20).stroke();
                    doc.lineWidth(0.6).rect(x, y, 552, 20).stroke(); y += 10;
                    doc.lineWidth(0.4).rect(282, y, 180, 0).stroke();
                } else {
                    doc.text('N°', 30, y + 8, { width: 30, align: "center" });
                    doc.text('FECHA', 60, y + 8, { width: 70, align: "center" });
                    doc.text('DETALLE', 130, y + 8, { width: 182, align: "center" });
                    doc.text('C/U', 312, y + 8, { width: 30, align: "center" });
                    doc.text('FÍSICO', 342, y + 3, { width: 120, align: "center" });
                    doc.text('INGRESO', 342, y + 12, { width: 40, align: "center" });
                    doc.text('SALIDA', 382, y + 12, { width: 40, align: "center" });
                    doc.text('SALDO', 422, y + 12, { width: 40, align: "center" });
                    doc.text('LOTE', 462, y + 8, { width: 70, align: "center" });
                    doc.text('FECHA VENCIMIENTO', 532, y + 3, { width: 50, align: "center" });
                    doc.rect(60, y, 0, 20).stroke();
                    doc.rect(130, y, 0, 20).stroke();
                    doc.rect(312, y, 0, 20).stroke();
                    doc.rect(342, y, 0, 20).stroke();
                    doc.rect(382, y + 10, 0, 10).stroke();
                    doc.rect(422, y + 10, 0, 10).stroke();
                    doc.rect(462, y, 0, 20).stroke();
                    doc.rect(532, y, 0, 20).stroke();
                    doc.lineWidth(0.6).rect(x, y, 552, 20).stroke(); y += 10;
                    doc.lineWidth(0.4).rect(342, y, 120, 0).stroke();
                }
                doc.font('Helvetica-Bold', 7).text('Página ' + pagina + " de " + totalPaginas, 0, 760, { width: 612, align: "center" });
                doc.font('Helvetica', 6).text(meta, 0, 770, { width: 612, align: "center" });
            }
            $scope.generarExcelKardexProducto = function (kardexproduto, valuado) {
                var detalleMovimiento = kardexproduto.detallesMovimiento;
                blockUI.start()
                var data = [["Codigo", "Producto", "Fecha", "Tipo Movimiento", "Clase Movimiento", "Detalle", "Documento", "Ingreso", "Salida", "Lote", "Fecha Vencimiento"]];
                for (var i = 0; i < kardexproduto.detallesMovimiento.length; i++) {
                    let detalle = kardexproduto.detallesMovimiento[i]
                    var column = [];
                    column.push(kardexproduto.codigo);
                    column.push(kardexproduto.nombre);
                    if (detalle.movimiento && detalle.movimiento.fecha) {
                        column.push($scope.fechaATexto(detalle.movimiento.fecha));
                    } else {
                        column.push("")
                    }
                    if (detalle.movimiento && detalle.movimiento.tipo) {
                        column.push(detalle.movimiento.tipo.nombre ? detalle.movimiento.tipo.nombre : "")
                    } else {
                        column.push("")
                    }
                    if (detalle.movimiento && detalle.movimiento.clase) {
                        column.push(detalle.movimiento.clase.nombre ? detalle.movimiento.clase.nombre : "")
                    } else {
                        column.push("")
                    }
                    let det = detalle.tipo
                    let doc = ""
                    if (detalle.movimiento && detalle.movimiento.compra) {
                        doc = detalle.movimiento.compra.numero_iso_compra ? detalle.movimiento.compra.numero_iso_compra : ""
                        if (detalle.movimiento.compra.proveedor) {
                            det += ((detalle.movimiento.compra.factura ? " N° " + detalle.movimiento.compra.factura : "") + (detalle.movimiento.compra.proveedor.razon_social ? " - " + detalle.movimiento.compra.proveedor.razon_social : ""))
                        } else {
                            det += " " + detalle.movimiento.compra.observacion
                        }
                    }
                    if (detalle.movimiento && detalle.movimiento.dotacionesRopaItem && detalle.movimiento.dotacionesRopaItem.length > 0) {
                        let dot = detalle.movimiento.dotacionesRopaItem[0]
                        if (dot.dotacionRopa) {
                            det += (dot.dotacionRopa.numero_iso_dotacion_ropa ? " N° ISO " + dot.dotacionRopa.numero_iso_dotacion_ropa + " " : (dot.dotacionRopa.numero ? " N° " + dot.dotacionRopa.numero + " " : ""))
                            if (dot.dotacionRopa.empleado && dot.dotacionRopa.empleado.persona) det += dot.dotacionRopa.empleado.persona.nombre_completo
                            if (dot.dotacionRopa.numero_iso_dotacion_ropa) doc = dot.dotacionRopa.numero_iso_dotacion_ropa;
                        }
                    }
                    if (detalle.movimiento.materialTrabajo) {
                        let mat = detalle.movimiento.materialTrabajo.ordenTrabajo
                        if (mat) {
                            det += mat.mantenimiento_externo ? " EXTERNO " : " INTERNO "
                            if (mat.correlativo_ot) {
                                det += "N° " + mat.correlativo_ot;
                                doc = mat.correlativo_ot
                            }
                        }
                    }
                    if (detalle.movimiento && detalle.movimiento.venta) {
                        let venta = detalle.movimiento.venta
                        det += venta.cliente ? " - " + venta.cliente.razon_social : venta.observacion ? venta.observacion : ""
                    }
                    if (detalle.movimiento && detalle.movimiento.solicitud) {
                        let rep = detalle.movimiento.solicitud
                        det += (rep.numero_iso_consumo ? " N° " + rep.numero_iso_consumo : rep.numero_correlativo ? " N° " + rep.numero_correlativo : "") + (rep.area ? " - " + rep.area.nombre : rep.descripcion ? rep.descripcion : "")
                        if (rep.numero_correlativo) doc = rep.numero_correlativo
                    }
                    column.push(det);
                    column.push(doc);
                    if (detalle.movimiento.id_tipo != 7) {
                        if (detalle.cantidad) {
                            column.push(detalle.cantidad);
                        } else {
                            column.push("");
                        }
                    } else {
                        column.push("")
                    }
                    if (detalle.movimiento.id_tipo != 6) {
                        if (detalle.cantidad) {
                            column.push(detalle.cantidad);
                        } else {
                            column.push("");
                        }

                    } else {
                        column.push("")
                    }
                    if (detalle.inventario != null) {
                        column.push(detalle.inventario.lote);
                        column.push(detalle.inventario.fecha_vencimiento);
                    } else {
                        column.push(detalle.lote);
                        column.push("")
                    }
                    data.push(column);
                }
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Kardex-" + kardexproduto.codigo + ".xlsx");
                blockUI.stop();
            }
            /* kardex */
            $scope.kardexProducto = function (producto) {

                $scope.producto = producto;
                $scope.kardexproduto = null;
                if ($scope.almacenBusqueda) {
                    $scope.sucursalBusquedaGet = $scope.sucursales.find(function (sucursal) {
                        return sucursal.id === $scope.almacenBusqueda.id_sucursal
                    })
                }
                $scope.usarValuado = true;
                var date = new Date();
                var primerDia = date.getMonth() > 1 ? new Date(new Date().getFullYear(), 0, 1) : new Date(new Date().getFullYear() - 1, 0, 1);
                var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                $scope.filtroKardexProducto = { sucursal: $scope.sucursalBusquedaGet, almacen: $scope.almacenBusqueda, fechaInicioTexto: $scope.fechaATexto(primerDia), fechaFinTexto: $scope.fechaATexto(ultimoDia), lote: "" }
                // $scope.filtroKardexProducto.sucursal = $scope.sucursales.length == 1 ? $scope.sucursales[0] : null;
                if ($scope.sucursalBusquedaGet) $scope.obtenerAlmacenes($scope.sucursalBusquedaGet.id)
                // if ($scope.filtroKardexProducto.sucursal) {
                // 	$scope.obtenerAlmacenes($scope.filtroKardexProducto.sucursal.id);
                // 	$scope.filtroKardexProducto.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
                // }
                // $("#modal-wizard-producto-kardex").dialog({ closeOnEscape: false });
                $scope.abrirPopup($scope.idModalWizardProductoKardex);

            }
            $scope.establecerAlmacenBusqueda = function (almacen) {
                $scope.almacenBusqueda = almacen;
            }
            $scope.buscarKardexProducto = function (idProducto, almacen) {
                blockUI.start();
                $scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true)
                // var fechaInicio = filtro.fechaInicioTexto == "" || filtro.fechaInicioTexto == undefined ? 0 : new Date($scope.convertirFecha(filtro.fechaInicioTexto));
                // var fechaFin = filtro.fechaFinTexto == "" || filtro.fechaFinTexto == undefined ? 0 : new Date($scope.convertirFecha(filtro.fechaFinTexto));
                // var lote = filtro.lote == "" || filtro.lote == undefined ? 0 : filtro.lote;
                // $scope.idProducto = idProducto;
                // $scope.idAlmacen = almacen.id;
                $scope.kardexproduto = null;
                $scope.filtrosKardexItem = angular.copy($scope.filtroKardexProducto);
                $scope.filtrosKardexItem.almacen = $scope.filtrosKardexItem.almacen.id;
                $scope.filtrosKardexItem.sucursal = $scope.filtrosKardexItem.sucursal.id;

                if ($scope.filtroKardexProducto.fechaInicioTexto != 0) {
                    var promesa = ProductoKardex(idProducto, $scope.filtrosKardexItem, true); //primero obtener el saldo anterior
                    $scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true, true)
                    promesa.then(function (detMovsSaldo) {
                        blockUI.stop();
                        if (detMovsSaldo.hasErr) {
                            $scope.mostrarMensaje(detMovsSaldo.mensaje)
                            return
                        }
                        var detalleMovimientoSaldoAnterior = $scope.obtenerSaldo(detMovsSaldo.saldoAnterior);
                        if (detalleMovimientoSaldoAnterior != 0) {
                            detalleMovimientoSaldoAnterior.catidad = ""
                            detalleMovimientoSaldoAnterior.total = ""
                            detMovsSaldo.kardex.unshift(detalleMovimientoSaldoAnterior);
                        }
                        $scope.generarKardexProducto(detMovsSaldo.kardex);
                        // promesa = ProductoKardex($scope.idProducto, $scope.filtroKardexProducto);
                        // promesa.then(function (detMovs) {
                        // 	if (detalleMovimientoSaldoAnterior != 0) {
                        // 		detMovs.unshift(detalleMovimientoSaldoAnterior);
                        // 	}
                        // 	$scope.generarKardexProducto(detMovs);

                        // });
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    var promesa = ProductoKardex(idProducto, $scope.filtrosKardexItem, false);
                    $scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true, true)
                    promesa.then(function (detMovsSaldo) {
                        // var detalleMovimientoSaldoAnterior = $scope.obtenerSaldo(detMovsSaldo.saldoAnterior);
                        // if (detalleMovimientoSaldoAnterior != 0) {
                        // 	detMovs.unshift(detalleMovimientoSaldoAnterior);
                        // }
                        if (detMovsSaldo.hasErr) {
                            $scope.mostrarMensaje(detMovsSaldo.mensaje)
                            return
                        }
                        if (detMovsSaldo.kardex.length > 0) {
                            $scope.generarKardexProducto(detMovsSaldo.kardex);
                        } else {
                            $scope.mostrarMensaje('No se encontraron movimientos.')
                        }

                        // promesa = ProductoKardex($scope.idProducto, $scope.filtroKardexProducto);
                        // promesa.then(function (detMovs) {
                        // 	if (detalleMovimientoSaldoAnterior != 0) {
                        // 		detMovs.unshift(detalleMovimientoSaldoAnterior);
                        // 	}
                        // 	$scope.generarKardexProducto(detMovs);
                        blockUI.stop();
                        // });					
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                }
            }
            $scope.filtrarFiltro = function (filtro, _, __) {
                if (__ !== undefined) {
                    for (var key in filtro) {
                        if (filtro[key] == 0) {
                            filtro[key] = ""
                        }
                    }
                } else {
                    for (var key in filtro) {
                        if (filtro[key] === "" || filtro[key] === null) {
                            filtro[key] = 0
                        }
                    }
                }
                if (_ === undefined || !_) {
                    // $scope.obtenerHistoriales(true)
                } else {
                    return filtro
                }
            }
            $scope.obtenerSaldo = function (detMovs) {
                var dato = {};
                dato.detallesMovimiento = detMovs;
                for (var i = 0; i < dato.detallesMovimiento.length; i++) {
                    dato.detallesMovimiento[i].costo_unitario = Math.round((dato.detallesMovimiento[i].costo_unitario * 0.87) * 100) / 100;
                    if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == $scope.diccionario.ING_INV_INICIAL) {
                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                        dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                    } else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                        dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                    }
                    else {
                        if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
                            if (i > 0) {
                                dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
                                dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                            } else {
                                dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                            }
                        } else {
                            if (dato.detallesMovimiento[i].movimiento.venta) {
                                //dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
                                if (i > 0) {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
                                } else {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
                                }
                            } else {
                                if (i > 0) {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                                } else {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                                }
                            }
                        }

                    }
                    dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
                }

                if (dato.detallesMovimiento.length > 0) {
                    dato.detallesMovimiento[dato.detallesMovimiento.length - 1].tipo = "SALDO ANTERIOR";
                    dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.compra = null;
                    dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.venta = null;
                    return dato.detallesMovimiento[dato.detallesMovimiento.length - 1];
                } else {
                    return 0;
                }
            }
            $scope.generarKardexProducto = function (detMovs) {
                var dato = $scope.producto;
                var producto = [];
                dato.detallesMovimiento = detMovs;
                $scope.Math = Math;
                for (var i = 0; i < dato.detallesMovimiento.length; i++) {
                    if (dato.detallesMovimiento[i].movimiento) {
                        if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "ID" || dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "IPI") {
                            dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 0.87) / dato.detallesMovimiento[i].cantidad) * 100) / 100);
                        } else {
                            dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 1) / dato.detallesMovimiento[i].cantidad) * 100) / 100);
                        }
                        if (i == 0 && dato.detallesMovimiento[i].tipo == "SALDO ANTERIOR") {
                            dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].saldoFisico;
                            dato.detallesMovimiento[i].saldoValuado = dato.detallesMovimiento[i].saldoValuado;
                            dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 0.87) / dato.detallesMovimiento[i].cantidad) * 100) / 100);

                        } else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == $scope.diccionario.ING_INV_INICIAL) {
                            dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                            dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
                            if (dato.detallesMovimiento[i].movimiento.compra != null) {
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.compra.factura;
                                if (dato.detallesMovimiento[i].inventario != null) {
                                    dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                } else {
                                    dato.detallesMovimiento[i].lote = ""
                                }
                            } else {
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                                if (dato.detallesMovimiento[i].inventario != null) {
                                    dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                } else {
                                    dato.detallesMovimiento[i].lote = ""
                                }
                            }
                        } else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
                            dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                            dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
                            if (dato.detallesMovimiento[i].movimiento.compra != null) {
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.compra.factura;
                                if (dato.detallesMovimiento[i].inventario != null) {
                                    dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                } else {
                                    dato.detallesMovimiento[i].lote = ""
                                }
                            } else {
                                dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
                                if (dato.detallesMovimiento[i].inventario != null) {
                                    dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                } else {
                                    dato.detallesMovimiento[i].lote = ""
                                }
                            }
                        }
                        else {
                            if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
                                if (i > 0) {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre

                                    if (dato.detallesMovimiento[i].inventario != null) {
                                        dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                    } else {
                                        dato.detallesMovimiento[i].lote = ""
                                    }
                                } else {
                                    dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                    dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                    dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
                                    if (dato.detallesMovimiento[i].inventario != null) {
                                        dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
                                    } else {
                                        dato.detallesMovimiento[i].lote = ""
                                    }
                                }
                            } else {
                                if (dato.detallesMovimiento[i].movimiento.venta) {
                                    //dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
                                    if (dato.detallesMovimiento[i].inventario.detallesCompra && dato.detallesMovimiento[i].inventario.detallesCompra.length > 0) {
                                        var tipoMovimientoCompra = dato.detallesMovimiento[i].inventario.detallesCompra[0].compra.tipoMovimiento;
                                        if (tipoMovimientoCompra.nombre_corto == "ID" || tipoMovimientoCompra.nombre_corto == "IPI") {
                                            dato.detallesMovimiento[i].costo_unitario = Math.round((((dato.detallesMovimiento[i].inventario.detallesCompra[0].importe - dato.detallesMovimiento[i].inventario.detallesCompra[0].descuento) * 0.87) / dato.detallesMovimiento[i].inventario.detallesCompra[0].cantidad) * 100) / 100;
                                        }
                                    }
                                    if (i > 0) {
                                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
                                        dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
                                    } else {
                                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                        dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
                                    }
                                } else {
                                    if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "CONSUM") {
                                        if (dato.detallesMovimiento[i].inventario.detallesCompra && dato.detallesMovimiento[i].inventario.detallesCompra.length > 0) {
                                            var tipoMovimientoCompra = dato.detallesMovimiento[i].inventario.detallesCompra[0].compra.tipoMovimiento;
                                            if (tipoMovimientoCompra.nombre_corto == "ID" || tipoMovimientoCompra.nombre_corto == "IPI") {
                                                dato.detallesMovimiento[i].costo_unitario = Math.round((((dato.detallesMovimiento[i].inventario.detallesCompra[0].importe - dato.detallesMovimiento[i].inventario.detallesCompra[0].descuento) * 0.87) / dato.detallesMovimiento[i].inventario.detallesCompra[0].cantidad) * 100) / 100;
                                            }
                                        }
                                    }
                                    if (i > 0) {
                                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
                                        dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
                                    } else {
                                        dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
                                        dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
                                        dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
                                    }
                                }
                            }

                        }

                        dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
                    } else {
                        console.log(dato.detallesMovimiento[i])
                    }
                }

                $scope.kardexproduto = dato;
            }
            $scope.abrirDialogAlertVacunas = function () {
                $scope.modulo = $location.$$path.split('/')[1];
                $scope.filtroAlertaVacunas = { inicio: 0, fin: 0, vacuna: 0 }
                $scope.paginatorAlertasVacuna = Paginator();
                $scope.paginatorAlertasVacuna.column = "siguiente_aplicacion";
                $scope.paginatorAlertasVacuna.direction = "asc";
                $scope.paginatorAlertasVacuna.itemsPerPage = "10";
                $scope.textSearch = ""
                $scope.paginatorAlertasVacuna.callBack = $scope.obtenerListaAlertasVacunas;
                $scope.paginatorAlertasVacuna.getSearch($scope.textSearch, $scope.filtroAlertaVacunas, null);
                $scope.abrirPopup($scope.idModalAlertVacunas);
            }

            $scope.cerrarDialogAlertVacunas = function () {
                $scope.cerrarPopup($scope.idModalAlertVacunas);
            }
            $scope.obtenerListaAlertasVacunas = function (buscar) {
                $scope.paginatorAlertasVacuna.filter = $scope.filtroAlertaVacunas;
                if (buscar) $scope.paginatorAlertasVacuna.currentPage = 1;
                var promesa = ListaAlertasVacunasEmpresa($scope.usuario.id_empresa, $scope.paginatorAlertasVacuna)
                promesa.then(function (data) {
                    if (!data.error) {
                        $scope.paginatorAlertasVacuna.setPages(data.paginas);
                        $scope.alertaVacunas = data.empleados;
                        $scope.proyecVacs = data.vacunas;
                    } else {
                        console.log('ocurrio un error', data);
                    }
                })
            }
            $scope.abrirDialogDiasActivacionVacunas = function (tipo) {
                ObtenerConfigAlertas($scope.usuario.id_empresa, tipo).then(data => {
                    if (!data.error) {
                        $scope.dias_Activacion = data.config.dias_anticipacion
                    } else {
                        console.log('Ocurrio un error');
                    }
                })
                tipo == 'VACUNAS' ? $scope.abrirPopup($scope.idModalDiasActivacionVacunas) : $scope.abrirPopup($scope.idModalDiasActivacionPrerequisitos);
            }
            $scope.abrirDlgProyeccion = () => {
                if ($scope.alertaVacunas.length > 0) {
                    GetVacunaProyeccion($scope.usuario.id_empresa)
                        .then(data => {
                            if (!data.error) {
                                $scope.dataProyeccion = data.registros
                                $scope.vacunaProyeccion = data.vacunas.sort((a, b) => {
                                    if (a.nombre > b.nombre) return 1
                                    if (a.nombre < b.nombre) return -1
                                    return 0
                                })
                                $scope.abrirPopup($scope.idModalDialogProyeccionVacunas);
                            } else {
                                SweetAlert.swal("", data.message, data.messageType);
                            }
                        })
                } else {
                    SweetAlert.swal("", `<center><h3><b>SIN VACUNAS</b></h3><br><p>No se encontraron pacientes a ser vacunados.</p></center>`, "warning");
                }

            }
            $scope.cerrarDialogDialogDiasActivacionPrerequisitos = function () {
                $scope.cerrarPopup($scope.idModalDiasActivacionPrerequisitos);
            }
            $scope.cerrarDialogDiasActivacionVacunas = function () {
                $scope.cerrarPopup($scope.idModalDiasActivacionVacunas);
            }
            $scope.cerrarDlgProyeccion = () => {
                $scope.cerrarPopup($scope.idModalDialogProyeccionVacunas);
            }
            $scope.generarPdfProyeccion = () => {
                let filasVacunas = $scope.vacunaProyeccion ? $scope.vacunaProyeccion.length : 0
                let datos = $scope.dataProyeccion
                    .reduce((acc, curr, i) => {
                        let pos = acc.findIndex(e => e.id_paciente === curr.id_paciente && e.id_vacuna === curr.id_vacuna)
                        if (pos !== -1) {
                            acc[pos].cantidad = acc[pos].cantidad + 1
                        } else {
                            curr.cantidad = 1
                            acc.push(curr)
                        }
                        return acc
                    }, []);
                let vacunas = new Map()
                let registros = []
                let vacs = $scope.vacunaProyeccion.reduce((acc, val, i) => {
                    registros[i] = datos.filter(e => e.id_vacuna == val.id)
                    vacunas.set(val.nombre, {
                        costo: val.valuar ? val.seleccionado.producto.costo : 0,
                        producto: val.valuar ? val.seleccionado.producto.nombre : null,
                        requeridos: val.cantidad,
                        valuar: val.valuar
                    })
                    return acc
                }, [])
                SweetAlert.swal({
                    title: 'Generando reporte ...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-file-pdf-o size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                var stream = doc.pipe(blobStream());
                let filasDatos = datos.length;
                let filas = filasVacunas + 7 + (filasVacunas * 4) + filasDatos;
                var x = 35, y = 59, items = 0, itemsPerPage = 55, page = 1, pages = Math.ceil(filas / itemsPerPage)
                let metadata = "Usuario: " + $scope.usuario.nombre_usuario + "          " + "Fecha: " + $scope.convertirFechaHora(new Date());
                $scope.headerPdfProyeccion(doc, page, pages, metadata);
                doc.font('Helvetica-Bold', 8).text("RESUMEN ", 0, y, { align: "center", width: 612 })
                y += 12; items++;
                doc.rect(80, y, 452, 14).fillAndStroke('#8CB4C8', '#8CB4C8');
                doc.fillColor('#000');
                doc.text("VACUNA", x, y + 4, { align: 'center', width: 160 })
                doc.text("CANTIDAD", 195, y + 4, { align: 'center', width: 80 })
                doc.text("C/U", 275, y + 4, { align: 'center', width: 80 })
                doc.text("TOTAL", 355, y + 4, { align: 'center', width: 80 })
                y += 12; items++;
                doc.font('Helvetica', 8)
                let totalVacs = 0, totalCosto = 0;
                for (let i = 0; i < $scope.vacunaProyeccion.length; i++) {
                    let vacuna = $scope.vacunaProyeccion[i];
                    let vcn = vacunas.get(vacuna.nombre);
                    totalVacs += vacuna.cantidad;
                    totalCosto += (vacuna.cantidad * vcn.costo);
                    doc.text(vacuna.nombre, 82, y + 4, { width: 158 })
                    doc.text(vacuna.cantidad, 195, y + 4, { align: 'right', width: 80 })
                    doc.text(vcn ? number_format_negativo_to_positvo(vcn.costo, 2) : 0, 275, y + 4, { align: 'right', width: 80 })
                    doc.text(vacuna.cantidad ? number_format_negativo_to_positvo(vacuna.cantidad * vcn.costo, 2) : 0, 355, y + 4, { align: 'right', width: 80 })
                    y += 12; items++;
                }
                doc.lineWidth(0.3);
                doc.rect(80, y, 452, 0).stroke();
                doc.font('Helvetica-Bold', 8)
                doc.text("TOTALES", 82, y + 4, { width: 160 })
                doc.text(totalVacs, 195, y + 4, { align: 'right', width: 80 })
                doc.text(number_format_negativo_to_positvo(totalCosto, 2), 355, y + 4, { align: 'right', width: 80 })
                y += 24; items += 2;
                doc.font('Helvetica-Bold', 8).text("DETALLES DE LA PROYECCIÓN", 0, y + 12, { align: 'center', width: 612 })
                for (let j = 0; j < registros.length; j++) {
                    let registro = registros[j];
                    let totalVacs = 0, totalCosto = 0;
                    for (let k = 0; k < registro.length; k++) {
                        let vacuna = registro[k];
                        let vcn = vacunas.get(vacuna.nombre);
                        let costo = vcn ? vcn.costo : 0;
                        if (k === 0) {
                            y += 24; items += 2;
                            if (items >= itemsPerPage) {
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                y = 60;
                                items = 0;
                                page = page + 1;
                                $scope.headerPdfProyeccion(doc, page, pages, metadata);
                            }
                            doc.text(vacuna.nombre.toUpperCase(), 80, y + 4)
                            y += 12; items++;
                            if (items >= itemsPerPage) {
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                y = 60;
                                items = 0;
                                page = page + 1;
                                $scope.headerPdfProyeccion(doc, page, pages, metadata);
                            }
                            doc.rect(80, y, 452, 12).fillAndStroke('#8CB4C8', '#8CB4C8');
                            doc.fillColor('#000').font('Helvetica-Bold', 8)
                            doc.text("NOMBRE COMPLETO", 80, y + 4, { align: 'center', width: 180 })
                            doc.text("CAMPO", 260, y + 4, { align: 'center', width: 80 })
                            doc.text("CANTIDAD", 340, y + 4, { align: 'center', width: 72 })
                            doc.text("P/U", 412, y + 4, { align: 'center', width: 60 })
                            doc.text("TOTAL", 472, y + 4, { align: 'center', width: 60 })
                            y += 12; items++;
                            if (items >= itemsPerPage) {
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                y = 60;
                                items = 0;
                                page = page + 1;
                                $scope.headerPdfProyeccion(doc, page, pages, metadata);
                            }
                            doc.font('Helvetica', 8)
                        }
                        doc.font('Helvetica', 8)
                        doc.text(vacuna.nombre_completo, 80, y + 4, { width: 180 });
                        doc.text(vacuna.campo, 260, y + 4, { width: 80 });
                        doc.text(vacuna.cantidad, 340, y + 4, { width: 72, align: "right" });
                        doc.text(number_format_negativo_to_positvo(costo, 2), 412, y + 4, { width: 60, align: "right" });
                        doc.text(vacuna.cantidad ? number_format_negativo_to_positvo((vacuna.cantidad * costo), 2) : 0, 472, y + 4, { width: 60, align: "right" });
                        totalVacs += vacuna.cantidad;
                        totalCosto += vacuna.cantidad * costo;
                        y += 12; items++;
                        if (items === itemsPerPage) {
                            doc.addPage({ compress: false, size: 'letter', margin: 10 });
                            y = 60;
                            items = 0;
                            page = page + 1;
                            $scope.headerPdfProyeccion(doc, page, pages, metadata);
                        }
                    }
                    doc.rect(80, y, 452, 0).stroke();
                    doc.font('Helvetica-Bold', 8)
                    doc.text("TOTALES", 80, y + 4)
                    doc.text(totalVacs, 340, y + 4, { align: 'right', width: 72 })
                    doc.text(number_format_negativo_to_positvo(totalCosto, 2), 472, y + 4, { align: 'right', width: 60 })
                }

                doc.end();
                stream.on('finish', function () {
                    SweetAlert.swal({
                        title: 'Finalizado!',
                        icon: 'success',
                        timer: 1200,
                        showConfirmButton: false
                    })
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }
            $scope.headerPdfProyeccion = (doc, page, pages, metadata) => {
                doc.font('Helvetica-Bold', 11).text("PROYECCIÓN DE VACUNAS", 0, 35, { align: 'center', width: 612 })
                doc.font('Helvetica-Bold', 7).text("Página " + page + " de " + pages, 0, 750, { width: 612, align: 'center' })
                doc.font('Helvetica', 6).text(metadata, 0, 758, { width: 612, align: 'center' })
            }
            $scope.generarXlsProyeccion = () => {
                blockUI.start();
                let vacunas = new Map()
                let vacs = $scope.vacunaProyeccion
                    .reduce((acc, val, i) => {
                        vacunas.set(val.nombre, {
                            costo: val.valuar ? val.seleccionado.producto.costo : 0,
                            producto: val.valuar ? val.seleccionado.producto.nombre : null,
                            requeridos: val.cantidad,
                            valuar: val.valuar
                        })
                        return acc
                    }, [])
                let datos = $scope.dataProyeccion
                    .reduce((acc, curr, i) => {
                        let pos = acc.findIndex(e => e.id_paciente === curr.id_paciente && e.id_vacuna === curr.id_vacuna)
                        if (pos !== -1) {
                            acc[pos].cantidad = acc[pos].cantidad + 1
                        } else {
                            curr.cantidad = 1
                            acc.push(curr)
                        }
                        return acc
                    }, [])
                    .map(ele => {
                        let vacuna = vacunas.get(ele.nombre);
                        let costo = vacuna ? vacuna.costo : 0
                        reg = [
                            ele.nombre_completo,
                            ele.campo,
                            ele.nombre,
                            ele.cantidad,
                            costo,
                            ele.cantidad * costo,
                            vacuna.valuar ? "SI" : "NO"
                        ]
                        return reg
                    })
                datos.unshift(["NOMBRE", "CAMPO", "VACUNA", "CANTIDAD", "C/U", "TOTAL", "VALUADO"])
                let ws_name = "SheetJS";
                let wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Proyeccion vacunas.xlsx");
                blockUI.stop();
            }
            $scope.abrirVacunacion = (id) => {
                GetVacunaPaciente(id)
                    .then(res => {
                        if (!res.error) {
                            if (!$scope.paciente) $scope.paciente = res.vacuna.paciente
                            $scope.iniciarVacunacion(res.vacuna, true);
                        } else {
                            SweetAlert.swal("", "<b>Ocurrió un error al recuperar los datos<br><small>Puede realizar la vacunación desde vacunas</b></small>", "error");
                        }
                    })
            }
            $scope.iniciarVacunacion = (vacuna, recargar, paciente) => {
                if (!$scope.paciente) $scope.paciente = paciente
                console.log($scope.paciente);
                if ($scope.paciente.eliminado) {
                    SweetAlert.swal("Paciente inactivo", 'No se puede aplicar vacunas a personal inactivo.<br>', "error");
                    return
                }
                if (vacuna.pacienteVacuna.eliminado) {
                    SweetAlert.swal("Vacuna inactiva", 'No se puede realizar la aplicación de la vacuna porque ésta se encuentra inactivada.<br>', "error");
                    return
                }
                if (vacuna.pacienteVacuna.unico) {
                    if (vacuna.pacienteVacunaDosis.length > 0) {
                        SweetAlert.swal("", '<b>Vacuna de dosis única</b><br>La vacuna es de dosis única y ya fue aplicado en fecha ' + fechaATexto(vacuna.pacienteVacunaDosis[0].fecha_aplicacion) + '<br>', "error");
                    } else {
                        $scope.aplicarVacuna(vacuna, $scope.paciente.id, recargar)
                    }
                } else {
                    if (vacuna.pacienteVacunaDosis.length >= vacuna.pacienteVacuna.vacunaDosis.length) {
                        SweetAlert.swal("", '<b>Todas las dosis aplicadas</b><br>La vacuna es de ' + vacuna.pacienteVacuna.vacunaDosis.length + ' dosis y el paciente ya recibió ' + vacuna.pacienteVacunaDosis.length + ' dosis.<br>', "info");
                    } else {
                        $scope.aplicarVacuna(vacuna, $scope.paciente.id, recargar)
                    }
                }
            }
            $scope.aplicarVacuna = function (vacuna, id, recargar) {
                var confirmado = false;
                SweetAlert.swal({
                    html: `<h3 style="margin: 0px;"><b>Datos de aplicación</h3><br>
                    <center><div style="max-width: 75%; display: flex; justify-content: center; flex-direction: column">
                    <input  type="text" class="swal2-input text-center" style="margin: 0px 0px 20px 0px"  id="fechaAplicacion"  placeholder="Fecha aplicacion">
                    <textarea id="comentario" class="swal2-textarea" style="margin: 0px 0px 12px" maxlength="100" rows="3" cols="50" placeholder="Alguna observación" ></textarea>
                    </div></center>`,
                    icon: 'success',
                    iconHtml: "<i class='icono-vacuna' style='color: #05974B!important;'></i>",
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#D33',
                    confirmButtonText: 'Aplicar',
                    cancelButtonText: "Cancelar",
                    onOpen: function () {
                        $('#fechaAplicacion').datepicker({
                            todayHighlight: true,
                            format: 'dd/mm/yyyy'
                        })
                        SweetAlert.getContent().querySelector('#fechaAplicacion').value = fechaATexto(new Date())
                        SweetAlert.getContent().querySelector('#comentario').value = ""
                    },
                    preConfirm: () => {
                        let fecha = SweetAlert.getContent().querySelector('#fechaAplicacion').value;
                        if (fecha.length < 10) {
                            SweetAlert.showValidationMessage(`Ingrese fecha válida`)
                            return false;
                        }
                        let comentario = SweetAlert.getContent().querySelector('#comentario').value;
                        if (vacuna.fecha_siguiente_aplicacion && !confirmado) {
                            f = fecha.valueOf().split('/');
                            apli = new Date(f[2], f[1] - 1, f[0], 0, 0, 0, 0)
                            sig = new Date(vacuna.fecha_siguiente_aplicacion)
                            sig.setHours(0, 0, 0, 0)
                            if (apli < sig) {
                                SweetAlert.showValidationMessage(`<div><b>Aplicación anticipada a la proyección </b><br> si desea continuar presione <b>"Aplicar"</b></div>`)
                                confirmado = true
                                return false
                            }
                        }
                        return { fecha: fecha, comentario: comentario }
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        let fecha = result.value.fecha.split('/').reverse().join('-');
                        fecha += " 12:00:00"
                        let comentario = result.value.comentario;
                        AplicacionPacienteVacuna(vacuna.id, fecha, comentario)
                            .then(res => {
                                SweetAlert.swal("", res.message, res.messageType)
                                if (!res.error) {
                                    recargar ? $scope.obtenerListaAlertasVacunas(true) : $scope.obtenerHistorialProyecciones(vacuna.id_paciente, true);
                                    $scope.obtenerNumeroAlertas()
                                    //if(!recargar) $scope.obtenerVacunasPaciente(false, paciente.id)
                                }
                            })
                    }
                })
            }
            $scope.setDiasActivacion = function (dias, tipo) {
                if (dias > 0) {
                    GuardarConfigAlertas(dias, tipo, $scope.usuario.id_empresa)
                        .then(res => {
                            $scope.cerrarDialogDiasActivacionVacunas()
                            if (!res.error) {
                                $scope.obtenerNumeroAlertas();
                                if (tipo == "VACUNAS") $scope.obtenerListaAlertasVacunas();
                                if (tipo == "PREREQUISITOS") $scope.listaAlertasPrerequisitosPaciente();
                                $scope.cerrarDialogDialogDiasActivacionPrerequisitos();
                            } else {
                                SweetAlert.swal("", result.message, "error");
                            }
                        })
                } else {
                    SweetAlert.swal("", "<b>Parámetro incorrecto</b><br>Intente con números positivos.", "error");
                }
            }
            $scope.iniciarEntregaPrerequisito = (id_prerequisito) => {
                PrerequisitoPacienteById(id_prerequisito)
                    .then(data => {
                        if (!data.error) {
                            data.paciente.paciente = data.paciente.id_paciente
                            data.paciente.prerequisito = data.paciente.id_prerequisito
                            data.paciente.vencimiento_mes = data.paciente.preRequisito.vencimiento_mes
                            $scope.verificarFechaEntregaPrerequisito(data.paciente, undefined, true);
                        } else {
                            SweetAlert.swal("", data.message, data.messageType);
                        }
                    })
            }
            $scope.obtenerHistorialProyecciones = (id, general) => {
                HistorialVacuna(id, general)
                    .then(data => {
                        if (!data.error) {
                            $scope.vacunasAsignadas = data.historial;
                            $scope.errores = ['<b>Las siguientes aplicaciones no tienen registrada la dosis</b><br><table class="table table-striped table-bordered table-hover"><thead><tr><th class="text-center">Vacuna</th><th class="text-center">Fecha Aplicación</th></tr></thead><tbody>']
                            if (general) {
                                $scope.datosHistorial = data.historial.map(reg => {
                                    let data = {};
                                    data.id = reg.pacienteVacuna.id
                                    data.nombre = reg.pacienteVacuna.nombre
                                    data.unico = reg.pacienteVacuna.unico
                                    data.dosis = reg.pacienteVacuna.vacunaDosis
                                    data.totalDosis = reg.pacienteVacuna.vacunaDosis.length;
                                    data.totalAplicados = reg.pacienteVacunaDosis.length;
                                    for (let i = 0; i < reg.pacienteVacunaDosis.length; i++) {
                                        const aplicada = reg.pacienteVacunaDosis[i];
                                        if (aplicada.id_dosis) {
                                            let ix = data.dosis.findIndex(ele => ele.id == aplicada.id_dosis)
                                            if (ix != -1) data.dosis[ix].aplicada = aplicada;
                                        } else {
                                            $scope.errores.push(`<tr><td>${data.nombre}</td><td>${aplicada.fecha_aplicacion ? fechaATexto(aplicada.fecha_aplicacion) : ""}</td></tr>`)
                                        }
                                    }
                                    return data
                                })
                                if ($scope.errores.length > 1) SweetAlert.swal("", $scope.errores.join('') + '</tbody></table>', 'error');
                                var reformateado = [...$scope.datosHistorial]
                                $scope.historialVacunas = []
                                for (let h = 0; h < reformateado.length; h++) {
                                    const registro = reformateado[h];
                                    let vacuna = $scope.generarHistoricoVacuna(registro)
                                    $scope.vacunasAsignadas[h].historico = vacuna;
                                    $scope.historialVacunas.push(vacuna);
                                }
                                $scope.vacunasAsignadas.sort((a, b) => {
                                    if (a.pacienteVacuna.createdAt > b.pacienteVacuna.createdAt) return 1
                                    if (b.pacienteVacuna.createdAt > a.pacienteVacuna.createdAt) return -1
                                    return 0
                                })
                            } else {
                                let datos = {};
                                datos.nombre = data.historial.pacienteVacuna.nombre
                                datos.unico = data.historial.pacienteVacuna.unico
                                datos.dosis = data.historial.pacienteVacuna.vacunaDosis
                                datos.totalDosis = data.historial.pacienteVacuna.vacunaDosis.length;
                                datos.totalAplicados = data.historial.pacienteVacunaDosis.length;
                                for (let i = 0; i < data.historial.pacienteVacunaDosis.length; i++) {
                                    const aplicada = data.historial.pacienteVacunaDosis[i];
                                    if (aplicada.id_dosis) {
                                        let ix = datos.dosis.findIndex(ele => ele.id == aplicada.id_dosis)
                                        if (ix != -1) datos.dosis[ix].aplicada = aplicada;
                                    } else {
                                        $scope.errores.push(`<tr><td>${datos.nombre}</td><td>${aplicada.fecha_aplicacion ? fechaATexto(aplicada.fecha_aplicacion) : ""}</td></tr>`)
                                    }
                                }
                                if ($scope.errores.length > 1) SweetAlert.swal("", $scope.errores.join('') + '</tbody></table>', 'error');
                                $scope.historicoVacuna = $scope.generarHistoricoVacuna(datos)
                            }
                        } else {
                            SweetAlert.swal("", data.message, data.messageType);
                        }
                    })
            }
            $scope.generarHistoricoVacuna = (registro) => {
                let vacuna = registro;
                var ultima = null;
                var primero = true;
                vacuna.dosis = registro.dosis.map((el, i, arr) => {
                    let dosis = {}
                    if (registro.totalAplicados > 0) {
                        if (registro.dosis[i + 1]) {
                            if (el.aplicada) {
                                dosis.comentario = el.aplicada.comentario
                                dosis.aplicacion = new Date(el.aplicada.fecha_aplicacion);
                                let fecha = new Date(dosis.aplicacion.valueOf())
                                dosis.proyeccion = registro.dosis[i + 1].es_dosis ? new Date(fecha.setDate(fecha.getDate() + registro.dosis[i + 1].tiempo)) :
                                    new Date(fecha.setMonth(fecha.getMonth() + (registro.dosis[i + 1].tiempo) + 1));
                                dosis.estado = ultima ? $scope.compararFechasHistorial(dosis.aplicacion, new Date(ultima.valueOf())) : 1
                                ultima = new Date(dosis.proyeccion.valueOf())
                            } else {
                                if (primero) {
                                    dosis.proyeccion = new Date(new Date(ultima.valueOf()))
                                    dosis.aplicacion = null
                                    let fecha = new Date(ultima.valueOf())
                                    ultima = registro.dosis[i + 1].es_dosis ? fecha.setDate(fecha.getDate() + registro.dosis[i + 1].tiempo) : fecha.setMonth(fecha.getMonth() + registro.dosis[i + 1].tiempo);
                                    dosis.estado = 3
                                    primero = false;
                                } else {
                                    dosis.proyeccion = new Date(new Date(ultima.valueOf()))
                                    let fecha = new Date(ultima.valueOf())
                                    ultima = registro.dosis[i + 1].es_dosis ? fecha.setDate(fecha.getDate() + registro.dosis[i + 1].tiempo) : fecha.setMonth(fecha.getMonth() + registro.dosis[i + 1].tiempo);

                                    dosis.aplicacion = null
                                    dosis.estado = 3
                                }
                            }
                        } else {
                            if (i != 0) {
                                if (el.aplicada) {
                                    dosis.comentario = el.aplicada.comentario
                                    dosis.aplicacion = new Date(el.aplicada.fecha_aplicacion);
                                    dosis.proyeccion = new Date(ultima.valueOf())
                                    ultima = new Date(dosis.proyeccion.valueOf())
                                    dosis.estado = $scope.compararFechasHistorial(dosis.aplicacion, dosis.proyeccion)
                                } else {
                                    let fecha = new Date(ultima.valueOf());
                                    dosis.proyeccion = new Date(fecha.valueOf())
                                    dosis.aplicacion = null;
                                    dosis.estado = 3
                                }
                            } else {
                                dosis.comentario = el.aplicada ? el.aplicada.comentario : null
                                dosis.proyeccion = null
                                dosis.aplicacion = new Date(el.aplicada.fecha_aplicacion);
                                dosis.estado = 1
                            }
                        }
                    }
                    return dosis;
                })
                return vacuna
            }
            $scope.compararFechasHistorial = (aplicacion, proyectada) => {
                aplicacion = new Date(aplicacion);
                aplicacion.setHours(0, 0, 0, 0)
                proyectada.setHours(0, 0, 0, 0)
                if (aplicacion > proyectada) return 2;
                return 1;
            }
            $scope.reportePdfAlertaPrerequisitos = () => {
                SweetAlert.swal({
                    title: 'Generando documento...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                ListaAlertasPrerequisitosPaciente($scope.usuario.id_empresa, $scope.paginatorAlertasPrereq, true)
                    .then(({ error, empleados, message }) => {
                        if (error) return SweetAlert.swal("", message, "error")
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let meta = "Impreso por: " + $scope.usuario.nombre_usuario + "         Fecha: " + $scope.formatoFechaHora(new Date());
                            let telefonos = ""
                            if ($scope.usuario.empresa.telefono1) telefonos += " " + $scope.usuario.empresa.telefono1
                            if ($scope.usuario.empresa.telefono2) telefonos += " " + $scope.usuario.empresa.telefono2
                            if ($scope.usuario.empresa.telefono3) telefonos += " " + $scope.usuario.empresa.telefono3
                            let doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                            let stream = doc.pipe(blobStream());
                            let y = 120, itemsPorPagina = 60, items = 0, pagina = 1, totalPaginas = Math.ceil(empleados.length / itemsPorPagina);
                            $scope.headerReporteAlertas(doc, "REPORTE ALERTA DE PRERREQUISITOS", "PRERREQUISITOS", telefonos, pagina, totalPaginas, logo, meta);
                            for (let i = 0; i < empleados.length; i++) {
                                const reg = empleados[i];
                                if (i % 2 != 0) doc.rect(40, y + 0.5, 542, 10).fill('#E4EAF9').fillColor('#000');
                                doc.font('Helvetica', 7);
                                doc.text(i + 1, 40, y + 3, { width: 25, align: "center" });
                                if (reg.nombre_completo && reg.nombre_completo.length > 28) reg.nombre_completo = reg.nombre_completo.slice(0, 28);
                                doc.text(reg.nombre_completo ? reg.nombre_completo : "", 67, y + 3, { width: 135 });
                                doc.text(reg.nombre ? reg.nombre : "", 204, y + 3, { width: 98 });
                                doc.text(reg.fecha_entrega ? $scope.fechaATexto(reg.fecha_entrega) : "", 302, y + 3, { width: 50, align: "center" });
                                doc.text(reg.fecha_inicio ? $scope.fechaATexto(reg.fecha_inicio) : "", 352, y + 3, { width: 50, align: "center" });
                                doc.text(reg.fecha_vencimiento ? $scope.fechaATexto(reg.fecha_vencimiento) : "", 402, y + 3, { width: 50, align: "center" });
                                if (reg.observacion && reg.observacion.length > 28) reg.observacion = reg.observacion.slice(0, 30);
                                doc.text(reg.observacion ? reg.observacion : "", 454, y + 3, { width: 108 });
                                if (reg.documento) {
                                    doc.text("SI", 562, y + 3, { link: $scope.base_url + reg.documento, continued: true, width: 20, align: "center" });
                                } else {
                                    doc.text("NO", 562, y + 3, { width: 20, align: "center" });
                                }
                                y += 10;
                                items++;
                                if (items === itemsPorPagina) {
                                    doc.addPage({ size: 'letter', margin: 10, compress: false });
                                    y = 120;
                                    items = 0;
                                    pagina++;
                                    $scope.headerReporteAlertas(doc, "REPORTE ALERTA DE PRERREQUISITOS", "PRERREQUISITOS", telefonos, pagina, totalPaginas, logo, meta);
                                }
                            }
                            doc.end();
                            stream.on('finish', function () {
                                swal.close();
                                let fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    })
            }
            $scope.reporteXlsxAlertaPrerequisitos = () => {
                SweetAlert.swal({
                    title: 'Generando documento...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                ListaAlertasPrerequisitosPaciente($scope.usuario.id_empresa, $scope.paginatorAlertasPrereq, true)
                    .then(({ error, empleados, message }) => {
                        if (error) return SweetAlert.swal("", message, "error");
                        if (empleados && empleados.length > 0) {
                            let data = [["N°", "NOMBRE COMPLETO", "PREREQUISITO", "ENTREGADO", "EMITIDO", "VENCIMIENTO", "OBSERVACIÓN", "ADJUNTO"]]
                            for (let i = 0; i < empleados.length; i++) {
                                const reg = empleados[i];
                                data.push([
                                    i + 1,
                                    reg.nombre_completo ? reg.nombre_completo : "",
                                    reg.nombre ? reg.nombre : "",
                                    reg.fecha_entrega ? $scope.fechaATexto(reg.fecha_entrega) : "",
                                    reg.fecha_inicio ? $scope.fechaATexto(reg.fecha_inicio) : "",
                                    reg.fecha_vencimiento ? $scope.fechaATexto(reg.fecha_vencimiento) : "",
                                    reg.observacion ? reg.observacion : "",
                                    reg.documento ? "SI" : "NO"
                                ])
                            }
                            var ws_name = "SheetJS";
                            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                            /* add worksheet to workbook */
                            wb.SheetNames.push(ws_name);
                            wb.Sheets[ws_name] = ws;
                            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE ALERTA DE PRERREQUISITOS.xlsx");
                            swal.close();
                        } else {
                            SweetAlert.swal("", "<b>No existen registros</b><br>Compruebe que haya seleccionado las fechas", "info")
                        }
                    })
            }

            $scope.reportePdfAlertaVacunas = () => {
                SweetAlert.swal({
                    title: 'Generando documento...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                ListaAlertasVacunasEmpresa($scope.usuario.id_empresa, $scope.paginatorAlertasVacuna, true)
                    .then(({ error, empleados, message }) => {
                        if (error) return SweetAlert.swal("", message, "error")
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let meta = "Impreso por: " + $scope.usuario.nombre_usuario + "         Fecha: " + $scope.formatoFechaHora(new Date());
                            let telefonos = ""
                            if ($scope.usuario.empresa.telefono1) telefonos += " " + $scope.usuario.empresa.telefono1
                            if ($scope.usuario.empresa.telefono2) telefonos += " " + $scope.usuario.empresa.telefono2
                            if ($scope.usuario.empresa.telefono3) telefonos += " " + $scope.usuario.empresa.telefono3
                            let doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                            let stream = doc.pipe(blobStream());
                            let y = 120, itemsPorPagina = 60, items = 0, pagina = 1, totalPaginas = Math.ceil(empleados.length / itemsPorPagina);
                            $scope.headerReporteAlertas(doc, "REPORTE ALERTA DE VACUNAS", "VACUNAS", telefonos, pagina, totalPaginas, logo, meta);
                            for (let i = 0; i < empleados.length; i++) {
                                const reg = empleados[i];
                                if (i % 2 != 0) doc.rect(40, y + 0.5, 542, 10).fill('#E4EAF9').fillColor('#000');
                                doc.font('Helvetica', 7);
                                doc.text(i + 1, 40, y + 3, { width: 25, align: "center" });
                                doc.text(reg.nombre_completo ? reg.nombre_completo : "", 68, y + 3, { width: 264 });
                                doc.text(reg.nombre ? reg.nombre : "", 335, y + 3, { width: 107 });
                                doc.text(reg.ultima_aplicacion ? $scope.fechaATexto(reg.ultima_aplicacion) : "", 442, y + 3, { width: 70, align: "center" });
                                doc.text(reg.siguiente_aplicacion ? $scope.fechaATexto(reg.siguiente_aplicacion) : "", 512, y + 3, { width: 70, align: "center" });
                                y += 10;
                                items++;
                                if (items === itemsPorPagina) {
                                    doc.addPage({ size: 'letter', margin: 10, compress: false });
                                    y = 120;
                                    items = 0;
                                    pagina++;
                                    $scope.headerReporteAlertas(doc, "REPORTE ALERTA DE VACUNAS", "VACUNAS", telefonos, pagina, totalPaginas, logo, meta);
                                }
                            }
                            doc.end();
                            stream.on('finish', function () {
                                swal.close();
                                let fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    })
            }
        
        $scope.datetimeFormat = ( date ) => {
        if(!date) return 0;
        let str = date.split('T')
        return str[0].split('-').reverse().join('/') + " "+ str[1].split('.')[0];
        }
        
        $scope.obtenerSucursalUsuario = ( sucursalesUsuario ) => {
            if(sucursalesUsuario == 0) return null
            if( sucursalesUsuario.length === 1 ) return sucursalesUsuario[0].sucursal ? sucursalesUsuario[0].sucursal : null
            let reg = sucursalesUsuario.find( ( ele ) => ele.sucursal.numero === 0 )
            if(reg && reg.sucursal) return reg.sucursal
            return null
        }
        $scope.addclipboard = (text ) => {
            if(navigator){
                navigator.clipboard.writeText(text);
                toastr.options.timeOut = '1400'
                toastr.options.positionClass = 'toast-top-center'
                toastr.success('Copiado al portapapeles');
            }
        }
        $scope.obtenerSucursalFacturacion = ( sucursales ) => {
            if(sucursales && sucursales.length > 0){
                let suc = sucursales.reduce((prev, curr) => {
                    return prev.numero < curr.numero && curr.usar_facturacion_en_linea ? prev : curr
                })
                if(!suc) return null
                return suc.sucursal
            }
            return null
        }
        //ServiceWorkerService.init();
    }]);

