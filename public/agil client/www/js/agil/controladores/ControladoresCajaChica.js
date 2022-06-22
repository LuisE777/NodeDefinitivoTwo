angular.module('agil.controladores')

    .controller('ControladorCajaChica', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
        'ClasesTipoEmpresa', 'ClasesTipo', 'GuardarSolicitudCajaChica', 'GuardarConceptoMovimientoCajaChica',
        'ObtenerConceptoMovimientoCajaChica', 'SolicitudesCajaPaginador', 'SolicitudesCajaChicaPaginador', 'ObtenerTodoPersonal', '$filter', 'Paginator', 'VerificarUsuarioEmpresa',
        'NuevoComprobante', 'ConfiguracionCompraVista', 'ConfiguracionCuentaEmpresa', 'ConfiguracionCompraVistaDatos', 'ProveedoresNit', 'GuardarCajaChica', 'ListaProductosEmpresaUsuario', 'VerificarUsuarioEmpresaCaja', 'IngresosCajaPaginador', 'ObtenerDatosCierreCaja', 'CierreCajaCPaginador',
        'FieldViewer', 'ObtenerImagen', 'ObtenerDatosSolicitudID', 'Tipos', 'Diccionario', 'SolicitudesCajaChicaPDF', 'CierreCajaCImpresion', 'EliminarIngresoCajaChica', 'ObtenerlistaFondoArendir', 'GuardarIncrementoSolicitud', 'IngresosCajaPDF', 'GuardarValeCajaChica',
        'DarDeBajaValeCajaChica', 'ObtenerDetalleRendicionSolicitud', 'ObtenerRendicionFondo', 'ObtenerGastosCajaChica', 'DatosCierreCajaChica',
        'ObtenerListaVales', 'SweetAlert', 'CompraDatos', 'EliminarDevolucionCajaChica', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
            ClasesTipoEmpresa, ClasesTipo, GuardarSolicitudCajaChica, GuardarConceptoMovimientoCajaChica,
            ObtenerConceptoMovimientoCajaChica, SolicitudesCajaPaginador, SolicitudesCajaChicaPaginador, ObtenerTodoPersonal, $filter, Paginator, VerificarUsuarioEmpresa,
            NuevoComprobante, ConfiguracionCompraVista, ConfiguracionCuentaEmpresa, ConfiguracionCompraVistaDatos, ProveedoresNit, GuardarCajaChica, ListaProductosEmpresaUsuario, VerificarUsuarioEmpresaCaja, IngresosCajaPaginador, ObtenerDatosCierreCaja, CierreCajaCPaginador,
            FieldViewer, ObtenerImagen, ObtenerDatosSolicitudID, Tipos, Diccionario, SolicitudesCajaChicaPDF, CierreCajaCImpresion, EliminarIngresoCajaChica, ObtenerlistaFondoArendir, GuardarIncrementoSolicitud, IngresosCajaPDF, GuardarValeCajaChica,
            DarDeBajaValeCajaChica, ObtenerDetalleRendicionSolicitud, ObtenerRendicionFondo, ObtenerGastosCajaChica, DatosCierreCajaChica,
            ObtenerListaVales, SweetAlert, CompraDatos, EliminarDevolucionCajaChica) {

            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.idModalSolicitudCajaChica = 'dialog-solicitud'
            $scope.idModalConceptosMovimiento = 'dialog-conceptos-movimiento'
            $scope.idModalEliminarSolicitud = 'dialog-eliminar-solicitud'
            $scope.idModalVerificarAutorizacion = 'modal-verificar-autorizacion'
            $scope.idModalRegistroCajaChica = 'dialog-registro-caja-chica'
            $scope.idModalKardexCajaChica = 'dialog-kardex-caja-chica'
            $scope.idModalKardexGastoCajaChica = 'dialog-kardex-gasto-caja-chica'
            $scope.idModalIngresosCajaChica = 'dialog-kardex-ingresos'
            $scope.idModalRegistroIngresoCajaChica = 'dialog-registro-ingreso-caja-chica'
            $scope.idModalHistorialCierreCajaChica = 'dialog-kardex-cierre-caja-chica'
            $scope.idModalRegistroDesembolsoCajaChica = 'dialog-registro-desembolso-caja-chica'
            $scope.idModalServicios = 'dialog-servicios'
            $scope.idModalRegistroAnticipoCajaChica = 'dialog-registro-anticipo-caja-chica'
            $scope.idModalIncrementoSolicitud = 'modal-incremento-solicitud'
            $scope.idModalVerificarCierreCajaChica = 'modal-verificacion-cierre-caja-chica'
            $scope.idModalValeCajaChica = 'modal-vale-caja-chica'
            $scope.idModalDetalleGastosFondo = 'modal-detalle-gastos-fondo'
            $scope.idModalRegistroProveedorCajaChica = 'dialog-registro-proveedor-caja-chica'
            $scope.idModalDevolucionFondoRendir = 'dialog-devolucion-fondo-a-rendir'
            $scope.idModallistaVales = 'dialog-lista-vales'
            $scope.AgregarImporte = function () {
                $scope.insertarImporte = true
            }
            $scope.calcularCantidadDeImporte = function () {
                $scope.detalleCompra.cantidad = $scope.detalleCompra.importe / $scope.detalleCompra.costo_unitario
                $scope.calcularImporte();
                $scope.verificarCamposDetalleCompra($scope.detalleCompra)
            }
            $scope.ingresarTotalRestanteImporte = function () {
                $scope.detalleCompra.importe = $scope.totalRestante
                $scope.detalleCompra.cantidad = $scope.detalleCompra.importe / $scope.detalleCompra.costo_unitario
                $scope.calcularImporte();
                $scope.verificarCamposDetalleCompra($scope.detalleCompra)
            }
            $scope.inicio = function () {
                $scope.errorFechaCaja = "error fecha"
                $scope.sucursales = $scope.obtenerSucursales();
                $scope.sucursalPrincipal = $scope.usuario.sucursalesUsuario[0].sucursal
                $scope.diccionario = Diccionario

                $scope.obtenerTiposMovimiento()
                $scope.obtenerConceptosMovimiento()
                $scope.obtenerTiposEstados()
                $scope.obtenerEstadosVales()
                $scope.obtenerMovimientosIngreso()
                $scope.obtenerTiposDePago()
                $scope.obtenerCentrosDeCosto()
                $scope.obtenerConfiguracionCompraVista()
                $scope.obtenerconfiuracionCuentas()
                $scope.obtenerServicios();
                $scope.propertyName = 'id';
                $scope.reverse = true;

                // $scope.listaSolicitudesCajaChicaPDF();
                //$scope.cierresCajaChicaImpresion();
                // $scope.obtenerTodoListaIngresos();



                $scope.dynamicPopoverValeCaja = {
                    templateUrl: 'myPopoverTemplateValeCaja.html',
                };
                $scope.dynamicPopoverCargosFr = {
                    templateUrl: 'myPopoverTemplateFrCargos.html',
                };
                $scope.ConceptosMovimiento = []
                $scope.tipoFiltro = "TODOS"
                $scope.verificacionDatos = true
                $scope.validarCuenta = false
            }
            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };
            $scope.llenarCentroCostos = function () {
                $scope.rendicionFondo.gastos.forEach(function (gasto) {
                    gasto.centrosCosto = gasto.datosCentrosCosto.map(function (centros) {
                        return centros.centro_costo
                    })
                })
            }

            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsCajaChicas($scope.idModalSolicitudCajaChica, $scope.idModalConceptosMovimiento, $scope.idModalEliminarSolicitud, $scope.idModalVerificarAutorizacion,
                    $scope.idModalRegistroCajaChica, $scope.idModalKardexCajaChica, $scope.idModalIngresosCajaChica, $scope.idModalRegistroIngresoCajaChica, $scope.idModalHistorialCierreCajaChica,
                    $scope.idModalRegistroDesembolsoCajaChica, $scope.idModalServicios, $scope.idModalRegistroAnticipoCajaChica,
                    $scope.idModalIncrementoSolicitud, $scope.idModalKardexGastoCajaChica, $scope.idModalVerificarCierreCajaChica,
                    $scope.idModalValeCajaChica, $scope.idModalDetalleGastosFondo, $scope.idModalRegistroProveedorCajaChica, $scope.idModalDevolucionFondoRendir,
                    $scope.idModallistaVales);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
                $scope.buscarOpcionesAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1))
                $scope.obtenerColumnasAplicacion()
                blockUI.stop();
            });
            $scope.obtenerColumnasAplicacion = function () {
                $scope.fieldViewer = FieldViewer({
                    crear: false,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        usuario_solicitante: { value: "usuario_solicitante", show: true },
                        fecha: { value: "fecha", show: true },
                        documento: { value: "documento", show: true },
                        beneficiario: { value: "Beneficiario", show: true },
                        proveedor: { value: "proveedor", show: true },
                        numero_orden: { value: "Numero orden", show: true },
                        autorizador: { value: "Autorizador", show: true },
                        verificador: { value: "Verificador", show: true },
                        movimiento: { value: "Movimiento", show: true },
                        concepto: { value: "Concepto", show: true },
                        detalle: { value: "Detalle", show: true },
                        estado: { value: "Estado", show: true },
                        monto: { value: "Monto", show: true },
                        area: { value: "area", show: true },
                        campo: { value: "campo", show: true },
                    }
                }, $scope.aplicacion.aplicacion.id, 'principal');
                $scope.fieldViewer.updateObject();
                $scope.fieldViewerDetalleFondo = FieldViewer({
                    crear: true,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        gasto: { value: "Gasto", show: true },
                        fecha: { value: "Fecha", show: true },
                        num_fact_rec: { value: "N° Fact/Rec", show: true },
                        detalle: { value: "Detalle", show: true },
                        monto: { value: "Monto", show: true },
                        area: { value: "area", show: true },
                        centro_costos: { value: "Centro costos", show: true },
                    }
                }, $scope.aplicacion.aplicacion.id, 'rendicion-fondo');
                $scope.fieldViewerDetalleFondo.updateObject();
            }
            /* $scope.abrirModalSolicitudCajaChica = function (verOEditar) {
                if (verOEditar == undefined) {
                    $scope.solicitud = { fecha: new Date() }
                }
                $scope.filtrarPersonal()
                $scope.abrirPopup($scope.idModalSolicitudCajaChica);
            }
            $scope.cerrarModalSolicitudCajaChica = function () {
                $scope.cerrarPopup($scope.idModalSolicitudCajaChica);
            }*/
            $scope.abrirModalConceptosMovimiento = function () {
                $scope.clase = { edit: false }
                $scope.abrirPopup($scope.idModalConceptosMovimiento);
            }
            $scope.cerrarModalConceptosMovimiento = function () {
                $scope.cerrarPopup($scope.idModalConceptosMovimiento);
            }
            $scope.abrirModalKardexCajaChica = function (datos) {
                var promesa = ObtenerDatosSolicitudID(datos.id)
                promesa.then(function (dato) {
                    $scope.solicitud = dato.solicitud
                    $scope.rendido = 0
                    $scope.solicitud.cajasChicas.forEach(function (data, index, array) {
                        if (data.id_padre != null) {
                            $scope.rendido = $scope.rendido + data.pagado
                        }
                    })
                    $scope.CajaChicaSolicitud = Object.assign({}, $scope.solicitud.cajasChicas.find(function (x) {
                        return x.monto == $scope.solicitud.monto && x.id_padre == null
                    }))

                    $scope.CajaChicaSolicitudIncremento = $scope.solicitud.cajasChicas.find(function (x) {
                        return x.concepto.nombre == 'INCREMENTO' && x.id_padre == null
                    })
                    if ($scope.CajaChicaSolicitudIncremento) {
                        $scope.CajaChicaSolicitud.monto = $scope.CajaChicaSolicitud.monto + $scope.CajaChicaSolicitudIncremento.monto
                        $scope.CajaChicaSolicitud.pagado = $scope.CajaChicaSolicitud.pagado + $scope.CajaChicaSolicitudIncremento.pagado
                        $scope.CajaChicaSolicitud.saldo = $scope.CajaChicaSolicitud.saldo + $scope.CajaChicaSolicitudIncremento.saldo
                    }
                    $scope.abrirPopup($scope.idModalKardexCajaChica);
                })

            }
            $scope.abrirModalKardexGastoCajaChica = function (datos) {
                var promesa = ObtenerDatosSolicitudID(datos.id)
                promesa.then(function (dato) {
                    $scope.solicitud = dato.solicitud
                    $scope.rendido = 0
                    if ($scope.solicitud.cajasChicas) {
                        $scope.solicitud.cajasChicas.forEach(function (data, index, array) {

                            $scope.rendido = $scope.rendido + data.pagado

                        })
                    }
                    $scope.abrirPopup($scope.idModalKardexGastoCajaChica);
                })

            }
            $scope.cerrarModalKardexGastoCajaChica = function () {
                $scope.cerrarPopup($scope.idModalKardexGastoCajaChica);
            }

            $scope.abrirModalVerificarCierreCajaChica = function () {
                $scope.abrirPopup($scope.idModalVerificarCierreCajaChica);
            }
            $scope.cerrarModalVerificarCierreCajaChica = function () {
                $scope.cerrarPopup($scope.idModalVerificarCierreCajaChica);
            }
            $scope.abrirModalValeCajaChica = function () {
                $scope.abrirPopup($scope.idModalValeCajaChica);
            }
            $scope.cerrarModalValeCajaChica = function () {
                $scope.cerrarPopup($scope.idModalValeCajaChica);
            }
            $scope.abrirModalDetalleGastosFondo = function (solicitud) {
                $scope.solicitud = solicitud
                $scope.obtenerGastosFr()
                $scope.usar_imprecion_rendicion = $localStorage.usar_imprecion_rendicion
                $scope.obtenerDetalleRendicionSolicitud()
                $scope.abrirPopup($scope.idModalDetalleGastosFondo);
            }
            $scope.cerrarModalDetalleGastosFondo = function () {
                $scope.cerrarPopup($scope.idModalDetalleGastosFondo);
            }
            $scope.cerrarModalKardexCajaChica = function () {
                $scope.cerrarPopup($scope.idModalKardexCajaChica);
            }
            $scope.abrirModalIngresosCajaChica = function () {
                $scope.obtenerListaIngresos()
                $scope.abrirPopup($scope.idModalIngresosCajaChica);
            }
            $scope.cerrarModalIngresosCajaChica = function () {
                $scope.cerrarPopup($scope.idModalIngresosCajaChica);
            }
            $scope.abrirModalHistorialCierreCajaChica = function () {
                $scope.obtenerListaCierresCajaChica()
                $scope.abrirPopup($scope.idModalHistorialCierreCajaChica);
            }
            $scope.cerrarModalHistorialCierreCajaChica = function () {
                $scope.cerrarPopup($scope.idModalHistorialCierreCajaChica);
            }
            $scope.abrirModalEliminarSolicitud = function (datos) {
                $scope.solicitud = datos
                if ($scope.solicitud.cajasChicas) {
                    $scope.existeCerrados = $scope.solicitud.cajasChicas.some(function (arrVal) {
                        return arrVal.cerrada == true;
                    });

                    if ($scope.existeCerrados) {
                        SweetAlert.swal("", "No se puede Anular porque tiene cierres realizados!", "warning");

                    } else {
                        $scope.abrirPopup($scope.idModalEliminarSolicitud);
                    }
                } else {
                    $scope.abrirPopup($scope.idModalEliminarSolicitud);
                }
            }
            $scope.cerrarModalEliminarSolicitud = function () {
                $scope.cerrarPopup($scope.idModalEliminarSolicitud);
            }
            $scope.abrirModalRegistroCajaChica = function () {
                $scope.abrirPopup($scope.idModalRegistroCajaChica);
            }
            $scope.crearRegistroCajaChicaDeDetalleFondo = async function (gasto) {
                $scope.gastoRendicion = gasto
                $scope.ObtenerRegistroCajaChica()
            }

            $scope.ObtenerRegistroCajaChica = async function (datos, edicion, ver, hijo, incremento) {
                try {
                    $scope.insertarImporte = false
                    $scope.ErrorImporte = false
                    $scope.mensajeValidacionCentroCosto = false
                    if (datos != undefined && datos != null) {
                        $scope.retencionActivo = false
                        let dato = await ObtenerDatosSolicitudID(datos.id)
                        $scope.limpiarMultiSelect($scope.campamento)
                        let solicitud = dato.solicitud
                        $scope.rendido = 0
                        solicitud.cajasChicas.forEach(function (data, index, array) {
                            if (data.id_padre != null) {
                                $scope.rendido = $scope.rendido + data.pagado
                            }
                        })
                        if (solicitud) {
                            $scope.solicitud = solicitud
                            $scope.CajaChicaSolicitud = Object.assign({}, $scope.solicitud.cajasChicas.find(function (x) {
                                return x.monto == $scope.solicitud.monto && x.id_padre == null
                            }))

                            $scope.CajaChicaSolicitudIncremento = $scope.solicitud.cajasChicas.find(function (x) {
                                return x.concepto.nombre == 'INCREMENTO' && x.id_padre == null
                            })
                            if ($scope.CajaChicaSolicitudIncremento) {
                                $scope.CajaChicaSolicitud.monto = $scope.CajaChicaSolicitud.monto + $scope.CajaChicaSolicitudIncremento.monto
                                $scope.CajaChicaSolicitud.pagado = $scope.CajaChicaSolicitud.pagado + $scope.CajaChicaSolicitudIncremento.pagado
                                $scope.CajaChicaSolicitud.saldo = $scope.CajaChicaSolicitud.saldo + $scope.CajaChicaSolicitudIncremento.saldo
                            }
                            if ($scope.solicitud.concepto.concepto.nombre == 'GASTO') {
                                if ($scope.solicitud.cajasChicas.length > 0) {
                                    var monto = 0
                                    var montoRestante = $scope.solicitud.monto
                                    $scope.solicitud.cajasChicas.forEach(function (caja, index, array) {
                                        if (edicion) {
                                            montoRestante = montoRestante - caja.monto
                                        } else {
                                            if (index == 0) {
                                                montoRestante = montoRestante - caja.monto
                                            } else {
                                                montoRestante = montoRestante + caja.monto
                                            }
                                            monto = monto + caja.monto

                                        }
                                    })
                                    $scope.saldoGastos = monto
                                    $scope.saldoMontoGasto = montoRestante + (hijo ? hijo.monto : 0)
                                } else {
                                    $scope.saldoMontoGasto = $scope.solicitud.monto
                                    $scope.saldoGastos = 0
                                }

                            }
                            if (edicion) {
                                if (hijo) {
                                    $scope.cajaChica = Object.assign({}, hijo)
                                    $scope.seleccionarArtosCentrosCosto($scope.cajaChica.centrosCosto)
                                    $scope.cajaChica.compra = Object.assign({}, hijo.compra)
                                    $scope.cajaChica.solicitud = Object.assign({}, solicitud)
                                    $scope.cajaChica.solicitud.cajasChicas[0].saldo += $scope.cajaChica.compra.total
                                    $scope.cajaChica.verDatosCompra = true
                                    $scope.cajaChica.descuentoGasolina = false
                                    if ($scope.cajaChica.fecha.length > 10) $scope.cajaChica.fecha = $scope.fechaATexto($scope.cajaChica.fecha)
                                    $scope.cajaChica.compra.fechaTexto = $scope.fechaATexto(hijo.compra.fecha)
                                } else {
                                    $scope.cajaChica = Object.assign({}, solicitud.cajasChicas[0])
                                    $scope.cajaChica.compra = Object.assign({}, solicitud.cajasChicas[0].compra)
                                    $scope.cajaChica.solicitud = Object.assign({}, solicitud)
                                    $scope.cajaChica.solicitud.cajasChicas[0].saldo += $scope.cajaChica.compra.total
                                    $scope.cajaChica.verDatosCompra = true
                                    $scope.cajaChica.descuentoGasolina = false
                                    if ($scope.cajaChica.fecha.length > 10) $scope.cajaChica.fecha = $scope.fechaATexto($scope.cajaChica.fecha)
                                    $scope.cajaChica.compra.fechaTexto = $scope.fechaATexto(solicitud.cajasChicas[0].compra.fecha)
                                }
                                if ($scope.cajaChica.compra.movimiento == undefined) {
                                    $scope.cajaChica.compra.movimiento = { clase: {} }
                                    $scope.cajaChica.compra.movimiento.clase = $scope.cajaChica.compra.tipoMovimiento
                                }
                                if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                                    $scope.configuracionCompraVista.mostrar_it_retencion = true
                                    $scope.configuracionCompraVista.mostrar_iue = true
                                    $scope.configuracionCompraVista.mostrar_pagado = true
                                } else {
                                    $scope.configuracionCompraVista.mostrar_it_retencion = false
                                    $scope.configuracionCompraVista.mostrar_iue = false
                                    $scope.configuracionCompraVista.mostrar_pagado = false
                                }
                                $scope.retencionActivo = ($scope.cajaChica.compra.detallesCompra[0].id_caja_chica_detalle_rendicion != undefined || $scope.cajaChica.compra.detallesCompra[0].id_caja_chica_detalle_rendicion != null) ? true : false
                                if ($scope.retencionActivo == true) {
                                    $scope.movimientosIngresoRetencion = $scope.movimientosIngreso
                                }
                                // $scope.cambiarTipoPago($scope.cajaChica.compra.tipoPago);
                            } else {
                                if (solicitud.cajasChicas.length > 0) {
                                    var total = 0
                                } else {
                                    var total = 0
                                }
                                $scope.cajaChica = {
                                    id_usuario: $scope.usuario.id,
                                    fecha: $scope.fechaATexto(new Date()),
                                    concepto: solicitud.concepto,
                                    detalle: solicitud.detalle,
                                    compra: {
                                        sucursal: $scope.sucursalPrincipal,
                                        fecha: $scope.fechaATexto(new Date()),
                                        generado_por_pedido: false,
                                        usar_producto: true, movimiento: { clase: {} }, tipo_retencion: true,
                                        total: total, id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, proveedor: {}, id_tipo_pago: $scope.tiposPago[0].id, tipoPago: $scope.tiposPago[0],
                                        detallesCompra: [], descuento_general: false, tipo_descuento: false, codigo_control: 0, autorizacion: 0,
                                        tipo_recargo: false, descuento: 0, recargo: 0, ice: 0, excento: 0
                                    }, solicitud: solicitud, verDatosCompra: false, descuentoGasolina: false
                                }
                            }
                            if (ver) {
                                $scope.cajaChica.ver = true
                                $scope.cajaChica.verDatosCompra = true
                            } else {
                                $scope.cajaChica.ver = false
                            }
                        } else {

                            if (hijo) {
                                $scope.cajaChica = Object.assign({}, hijo)
                                $scope.cajaChica.compra = Object.assign({}, hijo.compra)
                                $scope.cajaChica.solicitud = null
                                $scope.cajaChica.verDatosCompra = true
                                $scope.cajaChica.descuentoGasolina = false
                                if ($scope.cajaChica.fecha.length > 10) $scope.cajaChica.fecha = $scope.fechaATexto($scope.cajaChica.fecha)
                                $scope.cajaChica.compra.fechaTexto = $scope.fechaATexto(hijo.compra.fecha)
                            } else {
                                $scope.cajaChica = {
                                    id_usuario: $scope.usuario.id,
                                    fecha: $scope.fechaATexto(new Date()),
                                    compra: {
                                        fecha: $scope.fechaATexto(new Date()),
                                        generado_por_pedido: false,
                                        usar_producto: true, movimiento: { clase: {} }, tipo_retencion: true,
                                        total: "", id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, proveedor: {}, id_tipo_pago: $scope.tiposPago[0].id, tipoPago: $scope.tiposPago[0],
                                        detallesCompra: [], descuento_general: false, tipo_descuento: false, codigo_control: 0, autorizacion: 0,
                                        tipo_recargo: false, descuento: 0, recargo: 0, ice: 0, excento: 0
                                    }, solicitud: null, verDatosCompra: false, descuentoGasolina: false
                                }
                            }
                            if (ver) {
                                $scope.cajaChica.ver = true
                                $scope.cajaChica.verDatosCompra = true
                            } else {
                                $scope.cajaChica.ver = false
                            }
                        }
                        $scope.detalleCompra = { producto: {}, servicio: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
                        $scope.cargarCentroCosto($scope.detalleCompra)
                        $scope.abrirModalRegistroCajaChica()

                    } else {
                        let dato = await ObtenerDatosSolicitudID($scope.solicitud.id)
                        $scope.retencionActivo = true
                        $scope.limpiarMultiSelect($scope.campamento)
                        let solicitud = dato.solicitud
                        $scope.rendido = 0
                        solicitud.cajasChicas.forEach(function (data, index, array) {
                            if (data.id_padre != null) {
                                $scope.rendido = $scope.rendido + data.pagado
                            }
                        })
                        $scope.CajaChicaSolicitud = Object.assign({}, solicitud.cajasChicas.find(function (x) {
                            return x.monto == solicitud.monto && x.id_padre == null
                        }))

                        $scope.CajaChicaSolicitudIncremento = solicitud.cajasChicas.find(function (x) {
                            return x.concepto.nombre == 'INCREMENTO' && x.id_padre == null
                        })
                        if ($scope.CajaChicaSolicitudIncremento) {
                            $scope.CajaChicaSolicitud.monto = $scope.CajaChicaSolicitud.monto + $scope.CajaChicaSolicitudIncremento.monto
                            $scope.CajaChicaSolicitud.pagado = $scope.CajaChicaSolicitud.pagado + $scope.CajaChicaSolicitudIncremento.pagado
                            $scope.CajaChicaSolicitud.saldo = $scope.CajaChicaSolicitud.saldo + $scope.CajaChicaSolicitudIncremento.saldo
                        }
                        var total = $scope.gastoRendicion.monto
                        var mov = undefined
                        if ($scope.gastoRendicion.usar_factura) {
                            $scope.movimientosIngresoRetencion = $scope.movimientosIngreso.filter(function (x) {
                                return x.nombre_corto === 'ID'
                            })
                            mov = $scope.movimientosIngresoRetencion[0]
                        } else {
                            if ($scope.gastoRendicion.gasto.usar_producto) {
                                $scope.movimientosIngresoRetencion = $scope.movimientosIngreso.filter(function (mov) {
                                    return mov.nombre_corto === $scope.diccionario.MOVING_POR_IMPORTACION ||
                                        mov.nombre_corto === $scope.diccionario.MOVING_POR_RETENCION_BIENES ||
                                        mov.nombre_corto === $scope.diccionario.MOVING_POR_COMPRA_SIN_FACTURA
                                })
                            } else {
                                $scope.movimientosIngresoRetencion = $scope.movimientosIngreso.filter(function (mov) {
                                    return mov.nombre_corto === $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS ||
                                        mov.nombre_corto === $scope.diccionario.MOVING_POR_COMPRA_SIN_FACTURA

                                })
                            }
                        }
                        var serv = { nombre: $scope.gastoRendicion.gasto.nombre.toUpperCase() }
                        /*  if (!$scope.gastoRendicion.gasto.usar_producto) {
                             serv = $scope.datosServicios.clases.find(function (x) {
                                 return x.nombre.toUpperCase() === $scope.gastoRendicion.gasto.nombre.toUpperCase()
                             })
 
                         } */
                        var gasto = $scope.gastosFr.find(function (x) {
                            return x.id == $scope.gastoRendicion.gasto.id
                        })
                       
                        $scope.cajaChica = {
                            id_usuario: $scope.usuario.id,
                            rendicionActiva: true,
                            fecha: $scope.fechaATexto($scope.gastoRendicion.fecha),
                            concepto: { id: $scope.gastoRendicion.gasto.id_concepto },
                            cuenta: $scope.gastoRendicion.gasto.cuenta,
                            detalle: $scope.gastoRendicion.detalle,
                            gasto: gasto,
                            compra: {
                                id_caja_chica_detalle_rendicion: $scope.gastoRendicion.id,
                                sucursal: $scope.sucursalPrincipal,
                                fecha: $scope.fechaATexto(new Date()),
                                factura: $scope.gastoRendicion.numero_factura_recargo,
                                generado_por_pedido: false,
                                usar_producto: $scope.gastoRendicion.gasto.usar_producto, movimiento: { clase: mov }, tipo_retencion: true,
                                total: total, id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, proveedor: {}, id_tipo_pago: $scope.tiposPago[0].id, tipoPago: $scope.tiposPago[0],
                                detallesCompra: [], descuento_general: false, tipo_descuento: false, codigo_control: 0, autorizacion: 0,
                                tipo_recargo: false, descuento: 0, recargo: 0, ice: 0, excento: 0
                            }, solicitud: solicitud, verDatosCompra: false, descuentoGasolina: false
                        }
                        if ($scope.gastoRendicion.id_compra) {
                            $scope.cajaChica.compra = await CompraDatos($scope.gastoRendicion.id_compra);
                            $scope.cajaChica.compra.usar_producto = true
                            $scope.cajaChica.compra.fechaTexto = $scope.fechaATexto($scope.cajaChica.compra.fecha),
                                $scope.cajaChica.compra.id_caja_chica_detalle_rendicion = $scope.gastoRendicion.id,
                                $scope.retencionActivo = true
                            if ($scope.cajaChica.compra.sucursal == undefined) {
                                $scope.cajaChica.compra.sucursal = $scope.cajaChica.compra.almacen.sucursal;
                            }
                            if ($scope.cajaChica.compra.almacen == undefined) {
                                $scope.cajaChica.compra.almacen = $scope.cajaChica.compra.almacen;
                            }
                            if ($scope.cajaChica.compra.movimiento == undefined) {
                                $scope.cajaChica.compra.movimiento = { clase: {} }
                                $scope.cajaChica.compra.movimiento.clase = $scope.cajaChica.compra.tipoMovimiento

                            }
                            if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                                $scope.configuracionCompraVista.mostrar_it_retencion = true
                                $scope.configuracionCompraVista.mostrar_iue = true
                                $scope.configuracionCompraVista.mostrar_pagado = true
                            } else {
                                $scope.configuracionCompraVista.mostrar_it_retencion = false
                                $scope.configuracionCompraVista.mostrar_iue = false
                                $scope.configuracionCompraVista.mostrar_pagado = false
                            }
                        }
                        $scope.seleccionarArtosCentrosCosto($scope.gastoRendicion.centrosCosto)
                        $scope.cajaChica.verDatosCompra = true

                        $scope.detalleCompra = { importe: $scope.gastoRendicion.monto, id_caja_chica_detalle_rendicion: $scope.gastoRendicion.id, producto: { nombre: $scope.gastoRendicion.gasto.nombre }, servicio: serv, centroCosto: {}, cantidad: 1, costo_unitario: $scope.gastoRendicion.monto, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
                        if (!$scope.gastoRendicion.id_compra) {
                            $scope.agregarDetalleCompra($scope.detalleCompra)

                        } else {
                            $scope.cargarCentroCosto($scope.detalleCompra)
                        }
                        if (mov != undefined) {
                            $scope.calcularImporte()
                        }
                        $scope.cerrarModalDetalleGastosFondo()
                        $scope.abrirModalRegistroCajaChica()



                    }
                    $scope.$evalAsync()
                } catch (error) {
                    console.log(error)
                }

            }
            $scope.cargarCentroCosto = function (detalleCompra) {
                if ($scope.cajaChica.compra.usar_producto) {
                    detalleCompra.centroCosto = $scope.centrosCosto.filter(function (dato) {
                        return dato.nombre_corto == "VR"
                    })
                }
            }
            $scope.abrirModalRegistroIngresoCajaChica = function (datos, ver) {

                if (datos) {
                    $scope.cajaChica = datos
                    $scope.cajaChica.fecha = $scope.fechaATexto(new Date(datos.fecha))
                    $scope.cajaChica.total = datos.monto
                    $scope.cajaChica.sucursal = $scope.sucursalPrincipal
                } else {
                    $scope.cajaChica = {
                        id_usuario: $scope.usuario.id,
                        fecha: $scope.fechaATexto(new Date()),
                        solicitud: null, verDatosCompra: false, descuentoGasolina: false, sucursal: $scope.sucursalPrincipal, ingreso: null
                    }
                }
                if (ver) {
                    $scope.cajaChica.ver = true
                }


                $scope.abrirPopup($scope.idModalRegistroIngresoCajaChica);
            }
            $scope.abrirModalRegistroAnticipoCajaChica = function (datos, ver) {

                if (datos) {
                    $scope.cajaChica = { id_usuario: $scope.usuario.id }
                    $scope.cajaChica.solicitud = datos
                    $scope.cajaChica.concepto = datos.concepto
                    $scope.cajaChica.detalle = datos.detalle
                    $scope.cajaChica.fecha = $scope.fechaATexto(new Date(datos.fecha))
                    $scope.cajaChica.total = datos.monto
                    $scope.cajaChica.sucursal = $scope.sucursalPrincipal
                } else {
                    $scope.cajaChica = {
                        id_usuario: $scope.usuario.id,
                        fecha: $scope.fechaATexto(new Date()),
                        solicitud: null, verDatosCompra: false, descuentoGasolina: false, sucursal: $scope.sucursalPrincipal
                    }
                }
                if (ver) {
                    $scope.cajaChica.ver = true
                }

                $scope.cajaChica.Desembolso = true
                $scope.cajaChica.Anticipo = true
                $scope.abrirPopup($scope.idModalRegistroAnticipoCajaChica);
            }
            $scope.cerrarModalRegistroAnticipoCajaChica = function () {

                $scope.cerrarPopup($scope.idModalRegistroAnticipoCajaChica);
            }

            $scope.cerrarModalRegistroIngresoCajaChica = function () {

                $scope.cerrarPopup($scope.idModalRegistroIngresoCajaChica);
            }
            $scope.abrirModalIncrementoSolicitud = function () {
                $scope.incrementoDeRendicion = false
                var promesa = ObtenerRendicionFondo($scope.solicitud.id)
                promesa.then(function (dato) {
                    if (dato.rendicion) {
                        var incremento = $scope.solicitud.incremento ? $scope.solicitud.incremento : 0
                        if (dato.rendicion.total > $scope.solicitud.monto + incremento) {
                            $scope.incrementoDeRendicion = true
                            $scope.rendicion = dato.rendicion
                            $scope.solicitud.incremento = dato.rendicion.total - $scope.solicitud.monto
                            $scope.abrirPopup($scope.idModalIncrementoSolicitud);
                        } else if ($scope.solicitud.incremento > 0) {
                            $scope.mostrarMensaje("La solicitud ya cuenta con un incremento de: " + $scope.solicitud.incremento)
                        } else {
                            $scope.mostrarMensaje("el total de la rendicion es menor al total de la solicitud no se puede realizar incremento")
                        }
                    }
                })
            }
            $scope.cerrarModalIncrementoSolicitud = function () {

                $scope.cerrarPopup($scope.idModalIncrementoSolicitud);
            }
            $scope.abrirModalRegistroDesembolsoCajaChica = function (datos, ver, edit) {

                if (edit) {
                    $scope.cajaChica = Object.assign({}, datos.cajasChicas[0])
                    $scope.cajaChica.solicitud = Object.assign({}, datos)
                    $scope.cajaChica.fecha = $scope.fechaATexto(new Date($scope.cajaChica.fecha))
                    $scope.cajaChica.total = datos.cajasChicas[0].monto
                    $scope.cajaChica.Desembolso = true
                    $scope.cajaChica.sucursal = $scope.sucursalPrincipal
                } else {
                    $scope.cajaChica = { solicitud: datos, sucursal: $scope.sucursalPrincipal, id_usuario: $scope.usuario.id }
                    $scope.cajaChica.fecha = $scope.fechaATexto(new Date(datos.fecha))
                    $scope.cajaChica.total = datos.monto
                    $scope.cajaChica.detalle = datos.detalle
                    $scope.cajaChica.concepto = datos.concepto
                    $scope.cajaChica.Desembolso = true
                }
                if (ver) {
                    $scope.cajaChica.ver = true
                }


                $scope.abrirPopup($scope.idModalRegistroDesembolsoCajaChica);
            }
            $scope.cerrarModalRegistroDesembolsoCajaChica = function () {

                $scope.cerrarPopup($scope.idModalRegistroDesembolsoCajaChica);
            }

            $scope.obtenerTiposDePago = function () {
                blockUI.start();
                var promesa = ClasesTipo("TIPA");
                promesa.then(function (entidad) {
                    $scope.tiposPago = entidad.clases;
                    $scope.tiposPago = entidad.clases.reduce(function (value, x) {
                        if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
                            value.push(x)
                        }
                        return value
                    }, []);
                    blockUI.stop();
                });
            }

            $scope.cerrarModalRegistroCajaChica = function () {
                if ($scope.retencionActivo == true) {
                    $scope.abrirModalDetalleGastosFondo($scope.solicitud)
                    $scope.retencionActivo = false
                }
                $scope.resetMultiselect();
                $scope.cerrarPopup($scope.idModalRegistroCajaChica);
            }
            $scope.abrirModalVerificarAutorizacion = function (dato, tipoPermiso) {
                $scope.solicitud = dato
                $scope.tipoDatosPermiso = tipoPermiso
                $scope.abrirPopup($scope.idModalVerificarAutorizacion);
            }
            $scope.cerrarModalVerificarAutorizacion = function () {

                $scope.cerrarPopup($scope.idModalVerificarAutorizacion);
            }


            $scope.obtenerTiposMovimiento = function () {
                var promesa = ClasesTipo('CM_CCH')
                promesa.then(function (dato) {
                    $scope.tiposMovimientos = dato
                })
            }
            $scope.obtenerTiposEstados = function () {
                var promesa = ClasesTipo('ES_CCH')
                promesa.then(function (dato) {
                    $scope.tiposEstados = dato.clases
                    $scope.tiposEstados.forEach(function (estado) {
                        estado.numero = estado.nombre_corto == 'PENDIENTE' ? 1 : estado.nombre_corto == 'AUTORIZADO' ? 2 : estado.nombre_corto == 'DESEMBOLSADO' ? 3 : estado.nombre_corto == 'FR-VERIFICADO' ? 4 : estado.nombre_corto == 'PROCESADO' ? 5 : estado.nombre_corto == 'ANULADO' ? 6 : null

                    })
                    $scope.obtenerListaSolicitudes()
                })
            }
            $scope.obtenerConceptosMovimiento = function () {
                var promesa = ObtenerConceptoMovimientoCajaChica($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.ConceptosMovimiento = dato
                    $scope.cerrarModalConceptosMovimiento()
                })

            }
            $scope.AgregarConceptosMovimientoCajaChica = function (clase) {
                clase.habilitado = true
                if (!clase.edit) {
                    $scope.ConceptosMovimiento.push(clase)
                } else {
                    $scope.clase = { edit: false }
                }
            }
            $scope.editarConceptoMovimientoCajaChica = function (clase) {
                clase.edit = true
                $scope.clase = clase
            }
            $scope.cancelarEdicionConcepotMovimientoCajaChica = function (clase) {
                $scope.clase = { edit: false }
            }

            $scope.guardarConceptoMovimientoCajaChica = function () {
                var promesa = GuardarConceptoMovimientoCajaChica($scope.usuario.id_empresa, $scope.ConceptosMovimiento)
                promesa.then(function (dato) {
                    $scope.obtenerConceptosMovimiento()
                    $scope.mostrarMensaje(dato.mensaje)
                })
            }
            /* $scope.guardarSolicitudCajaChica = function () {
                $scope.solicitud.usuario = $scope.usuario
                $scope.tiposEstados.forEach(function (tipo, index, array) {
                    if ($scope.usuario.autorizacion_caja_chica) {
                        if (tipo.nombre === $scope.diccionario.CC_ESTADO_AUTORIZADO) {
                            $scope.solicitud.estado = tipo
                        }
                    } else {
                        if (tipo.nombre === $scope.diccionario.CC_ESTADO_PENDIENTE) {
                            $scope.solicitud.estado = tipo
                        }
             
                    }
                    if (index === (array.length - 1)) {
                        
                        var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                        promesa.then(function (dato) {
                            $scope.cerrarModalSolicitudCajaChica()
                            $scope.mostrarMensaje(dato.mensaje)
                        })
                    }
             
                });
             
            } */
            /* $scope.buscarPersonal = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = $filter('filter')($scope.todoPersonal, query);
                    return promesa;
                }
            }
            */
            /* $scope.filtrarPersonal = function (query) {
                if ($scope.todoPersonal !== undefined) {
                    $scope.personalProcesado = $filter('filter')($scope.todoPersonal, query);
                } else {
                    var prom = ObtenerTodoPersonal($scope.usuario.empresa.id)
                    prom.then(function (personal) {
                        $scope.todoPersonal = personal.personal
                        $scope.personalProcesado = personal.personal
                        if (personal.mensaje !== undefined) {
                            $scope.mostrarMensaje(personal.mensaje)
                        }
                    }, function (err) {
                        $scope.mostrarMensaje("Se perdió la conexión.")
                    })
                }
            } */
            /* $scope.establecerPersonal = function (personal) {
             
                var personalSeleccionado = { id: personal.id, persona: { nombre_completo: personal.persona.nombre_completo } }
             
            } */
            $scope.obtenerListaSolicitudes = function (filtro, tipo) {
                $scope.paginator2 = Paginator();
                $scope.paginator2.column = "fecha";
                $scope.paginator2.direction = "desc";
                $scope.paginator2.itemsPerPage = 10;
                var estado = { id: "" }
                if ($scope.usuario.autorizacion_caja_chica && $scope.usuario.encargado_caja_chica) {
                    estado = { id: "" }
                } else if ($scope.usuario.autorizacion_caja_chica && $scope.usuario.encargado_rendicion_caja_chica) {
                    estado = { id: "" }
                } else if ($scope.usuario.encargado_caja_chica && $scope.usuario.encargado_rendicion_caja_chica) {
                    estado = { id: "" }
                } else {
                    if ($scope.usuario.autorizacion_caja_chica) {
                        estado = $scope.tiposEstados.find(function (estado) {
                            return estado.nombre_corto == 'PENDIENTE'
                        })
                    }
                    if ($scope.usuario.encargado_caja_chica) {
                        estado = $scope.tiposEstados.find(function (estado) {
                            return estado.nombre_corto == 'AUTORIZADO'
                        })
                    }
                    if ($scope.usuario.encargado_rendicion_caja_chica) {
                        estado = $scope.tiposEstados.find(function (estado) {
                            return estado.nombre_corto == 'VERIFICADO'
                        })
                    }
                }
                if (filtro) {
                    $scope.filtro = filtro
                    $scope.filtro.id_sucursal = $scope.sucursalPrincipal.id
                    if (tipo) {
                        var mov = $scope.tiposMovimientos.clases.find(function (movimiento) {
                            return movimiento.nombre_corto.toUpperCase() == tipo.toUpperCase()
                        })
                        $scope.filtro.movimiento = mov.id
                    }
                    if ($scope.filtro.inicio && $scope.filtro.fin) {
                        $scope.filtro.fechaInicio = new Date($scope.convertirFecha($scope.filtro.inicio))
                        $scope.filtro.fechaFin = new Date($scope.convertirFecha($scope.filtro.fin))
                    } else {
                        $scope.filtro.fechaInicio = "";
                        $scope.filtro.fechaFin = "";
                    }
                    $scope.paginator2.callBack = $scope.listaSolicitudesCajaChica;
                    $scope.paginator2.getSearch("", $scope.filtro, null);
                } else {
                    var date = new Date();
                    var inicioF = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                    var finalF = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                    $scope.filtro = {
                        empresa: $scope.usuario.id_empresa,
                        inicio: "",
                        fin: "",
                        solicitante: "",
                        usuario: "",
                        estado: estado.id,
                        concepto: "",
                        movimiento: "",
                        fechaInicio: inicioF,
                        fechaFin: finalF,
                        campo: "",
                        proveedor: "",
                        id_usuario_no_autorizado: ($scope.usuario.encargado_caja_chica) ? "" : ($scope.usuario.encargado_rendicion_caja_chica) ? "" : $scope.usuario.id,
                        id_sucursal: $scope.sucursalPrincipal.id,
                        rendiciones: ($scope.usuario.encargado_rendicion_caja_chica) ? 1 : "",
                    }
                    $scope.paginator2.callBack = $scope.listaSolicitudesCajaChica;
                    $scope.paginator2.getSearch("", $scope.filtro, null);
                    $scope.filtro.inicio = moment(inicioF).format('DD/MM/YYYY');
                    $scope.filtro.fin = moment(finalF).format('DD/MM/YYYY');
                }

            }
            $scope.listaSolicitudesCajaChica = function () {
                blockUI.start()

                var promesa = SolicitudesCajaChicaPaginador($scope.paginator2)
                promesa.then(function (datos) {
                    blockUI.stop()
                    $scope.totalRlCaja = datos.totalRlCaja
                    $scope.totalCaja = datos.total
                    $scope.totalVales = datos.TotalVales
                    $scope.paginator2.setPages(datos.paginas);
                    $scope.solicitudesCajaChica = datos.solicitudes
                })
            }
            $scope.obtenerListaIngresos = function () {
                $scope.paginator = Paginator();
                $scope.paginator.column = "fecha";
                $scope.paginator.direction = "desc";
                $scope.paginator.itemsPerPage = 10;
                $scope.filtro2 = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: "",
                    fin: "",
                    id_sucursal: $scope.sucursalPrincipal.id
                }
                $scope.paginator.callBack = $scope.listaIngresosCajaChica;
                $scope.paginator.getSearch("", $scope.filtro2, null);


            }
            $scope.listaIngresosCajaChica = function () {
                blockUI.start()
                var promesa = IngresosCajaPaginador($scope.paginator)
                promesa.then(function (datos) {
                    blockUI.stop()
                    $scope.paginator.setPages(datos.paginas);
                    console.log('ingresos', datos.ingresos);
                    $scope.IngresosCajaChica = datos.ingresos
                })
            }
            $scope.obtenerListaCierresCajaChica = function () {
                $scope.paginator = Paginator();
                $scope.paginator.column = "id";
                $scope.paginator.direction = "asc";
                $scope.paginator.itemsPerPage = 10;
                $scope.filtro2 = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: "",
                    fin: "",
                    id_sucursal: $scope.sucursalPrincipal.id
                }
                $scope.paginator.callBack = $scope.listaCierresCajaChica;
                $scope.paginator.getSearch("", $scope.filtro2, null);


            }
            $scope.listaCierresCajaChica = function () {
                blockUI.start()
                var promesa = CierreCajaCPaginador($scope.paginator)
                promesa.then(function (datos) {
                    blockUI.stop()
                    $scope.paginator.setPages(datos.paginas);
                    $scope.ultimoSaldo = 0;
                    datos.cierreCaja.map(function (dato, index, array) {
                        /* if (index != 0) {
                            dato.saldo_inicial = $scope.ultimoSaldo
                        }
                        dato.saldo_final = dato.saldo_inicial
                        dato.detalleCierreCaja.map(function (detalle, idx, arr) {
                            if (detalle.concepto.concepto.nombre == "INGRESO") {
                                dato.saldo_final += detalle.monto
                            } else {
                                dato.saldo_final -= detalle.monto
                            }
                            if (idx == (arr.length - 1)) {
                                $scope.ultimoSaldo = dato.saldo_final;
                            }
                        }) */
                        /* if (index == (array.length - 1)) { */
                        $scope.cierresCajaChica = datos.cierreCaja
                        /* } */
                    })

                })
            }

            /*  $scope.verSolicitudCajaChica = function (datos) {
                 $scope.solicitud = datos
                 $scope.solicitud.ver = true
                 $scope.abrirModalSolicitudCajaChica(true)
             }
             $scope.editarSolicitudCajaChica = function (datos) {
                 $scope.solicitud = datos
                 $scope.abrirModalSolicitudCajaChica(true)
             } */
            $scope.eliminarSolicitud = function () {
                $scope.tiposEstados.forEach(function (tipo, index, array) {
                    if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_ANULADO) {
                        $scope.solicitud.estado = tipo
                    }
                    if (index === (array.length - 1)) {
                        $scope.solicitud.eliminado = true
                        $scope.solicitud.autorizador = $scope.usuario.id
                        var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                        promesa.then(function (dato) {
                            $scope.obtenerListaSolicitudes()
                            $scope.cerrarModalEliminarSolicitud()
                            $scope.mostrarMensaje(dato.mensaje)
                        })
                    }

                });
            }

            $scope.verificarPerimisoAutorizacion = function (cuenta) {
                cuenta.nombre_usuario = $scope.usuario.nombre_usuario
                var promesa = VerificarUsuarioEmpresaCaja($scope.usuario.id_empresa, cuenta)
                promesa.then(function (dato) {
                    if (dato.type) {
                        /*  $scope.mostrarMensaje(dato.message) */
                        /*  cuenta.abierto= cuenta.abierto; */
                        if ($scope.tipoDatosPermiso == "autorizacion") {
                            $scope.tiposEstados.forEach(function (tipo, index, array) {
                                if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_AUTORIZADO) {
                                    $scope.solicitud.estado = tipo
                                }
                                if (index === (array.length - 1)) {
                                    $scope.solicitud.autorizador = $scope.usuario.id
                                    var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                                    promesa.then(function (dato2) {
                                        $scope.obtenerListaSolicitudes()
                                        $scope.cerrarModalVerificarAutorizacion()
                                        $scope.mostrarMensaje(dato2.mensaje)
                                    })
                                }

                            });
                        }
                        if ($scope.tipoDatosPermiso == "incremento") {
                            $scope.abrirModalIncrementoSolicitud()
                            $scope.cerrarModalVerificarAutorizacion()
                        }
                    } else if (dato.otrosPermisos) {
                        if ($scope.tipoDatosPermiso == "incremento") {
                            $scope.abrirModalIncrementoSolicitud()
                            $scope.cerrarModalVerificarAutorizacion()
                        } else {
                            $scope.cerrarModalVerificarAutorizacion()
                            $scope.mostrarMensaje(dato.message)
                        }
                    } else {
                        if (dato.entidad) {
                            $scope.mostrarMensaje(dato.message)
                        } else {
                            $scope.claveconfirmacionCuentaSolicitud = true
                        }
                    }
                })
            }
            $scope.guardarIncrementoSolicitud = function () {
                $scope.solicitud.fecha_incremento = new Date()
                $scope.solicitud.concepto = $scope.ConceptosMovimiento.find(function (x) {
                    return x.nombre == 'INCREMENTO'
                })
                $scope.solicitud.usuarioId = $scope.usuario.id
                var promesa = GuardarIncrementoSolicitud($scope.solicitud)
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.obtenerListaSolicitudes()
                    $scope.cerrarModalIncrementoSolicitud()
                })
            }
            $scope.verDatosCompra = function () {
                if ($scope.cajaChica) {
                    if ($scope.cajaChica.solicitud) {
                        if ($scope.cajaChica.solicitud.vale) {
                            if ($scope.cajaChica.solicitud.vale.estado) {
                                if ($scope.cajaChica.solicitud.vale.estado.nombre.toUpperCase() === "PENDIENTE") {
                                    return $scope.mostrarMensaje('Debe cerrar el vale antes de la rendición')
                                }
                            }
                        }
                    }
                }
                $scope.cajaChica.compra.fechaTexto = $scope.fechaATexto(new Date())
                $scope.cajaChica.verDatosCompra = ($scope.cajaChica.verDatosCompra) ? false : true
            }
            $scope.obtenerMovimientosIngreso = function (compra) {
                blockUI.start();
                var promesa = ClasesTipo("MOVING");
                promesa.then(function (entidad) {
                    $scope.movimientosIngreso = entidad.clases.reduce(function (val, mov, index, array) {
                        if (mov.nombre_corto !== $scope.diccionario.MOVING_POR_PRODUCCION && mov.nombre_corto !== $scope.diccionario.MOVING_INVENTARIO_INICIAL && mov.nombre_corto !== $scope.diccionario.MOVING_POR_TRASPASO && mov.nombre_corto !== $scope.diccionario.MOVING_POR_DEVOLUCION) {
                            let bool = true
                            if (mov.nombre_corto === $scope.diccionario.MOVING_POR_AJUSTE) {
                                bool = $scope.usuario.empresa.usar_ingreso_por_ajuste ? true : false
                            }
                            if (bool) {
                                val.push(mov)

                            }
                        }
                        return val
                    }, []);
                    blockUI.stop();
                });
            }
            $scope.buscarCuentasCajaChica = function (query) {

                return NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, null, null, null, query)
            }
            $scope.buscarProveedorNit = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
                    var p = promesa.then(function (datos) {
                        $scope.filtro_lote = null
                        $scope.ListaProveedoresRZ = [];
                        $scope.ListaProveedoresNIT = datos;
                        if ($scope.usuario.usar_filtro_lote) {
                            $scope.filtro_lote = query
                        }
                        if (datos.length == 1) {
                            $scope.establecerProveedor(datos[0])
                            $scope.enfocar('factura_cc')
                            return []
                        } else if (datos.length > 1) {
                            return promesa
                        } else {
                            $scope.mostrarMensaje("No existen coincidencias en la búsqueda");
                        }
                    })
                    return p;
                }
            };
            $scope.buscarProveedorRazon = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
                    promesa.then(function (proveedores) {
                        $scope.ListaProveedoresNIT = [];
                        $scope.ListaProveedoresRZ = proveedores;
                    })
                    return promesa
                }
            };

            $scope.establecerProveedor = function (proveedor) {
                $scope.cajaChica.compra.proveedor = proveedor;
            }
            $scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
                if (keyEvent.which === 13) {
                    if (esEnfocar) {
                        $scope.enfocar(elemento);
                    } else {
                        $timeout(function () {
                            $('#' + elemento).trigger('click');
                        }, 0);
                    }
                }
            }
            $scope.obtenerSucursales = function () {
                var sucursales = [];
                for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
                    sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
                }
                return sucursales;
            }
            $scope.obtenerAlmacenes = function (idSucursal) {
                $scope.almacenes = [];
                var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
                $scope.almacenes = sucursal.almacenes;
                if ($scope.cajaChica.compra.id == undefined) {
                    $scope.cajaChica.compra.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
                }
            }

            $scope.verificarMomivmiento = function (compra) {
                if (compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                    compra.usar_producto = false
                } else if (compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    compra.usar_producto = true
                } else if (compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
                    compra.factura = 0
                    compra.autorizacion = 3
                    compra.codigo_control = 0
                    compra.descuento_general = false
                    compra.usar_producto = true
                }
            }
            $scope.generarDescuentoGasolina = function () {

                $scope.cajaChica.descuentoGasolina = ($scope.cajaChica.descuentoGasolina) ? false : true
                if ($scope.cajaChica.descuentoGasolina) {
                    $scope.cajaChica.compra.descuento_general = true
                    $scope.cajaChica.compra.descuento = 0
                    $scope.cajaChica.compra.recargo = 0
                    $scope.cajaChica.compra.ice = 0
                    if ($scope.retencionActivo) {
                        $scope.cajaChica.compra.excento = ($scope.cajaChica.compra.detallesCompra[0].importe * 30) / 100
                    } else {
                        // $scope.cajaChica.compra.excento = ($scope.cajaChica.solicitud.monto * 30) / 100
                        if ($scope.cajaChica.compra.detallesCompra.length > 0) {
                            $scope.cajaChica.compra.excento = ($scope.cajaChica.compra.detallesCompra[0].importe * 30) / 100
                        }
                    }
                    $scope.calcularImporteGeneral()
                } else {
                    $scope.cajaChica.compra.descuento_general = false
                    $scope.cajaChica.compra.descuento = 0
                    $scope.cajaChica.compra.recargo = 0
                    $scope.cajaChica.compra.ice = 0
                    $scope.cajaChica.compra.excento = 0
                    $scope.calcularImporteGeneral()
                }

            }
            $scope.activarDescuentos = function () {
                //$scope.cajaChica.compra.descuento_general = ($scope.cajaChica.compra.descuento_general) ? false : true

                $scope.cajaChica.compra.descuento = 0
                $scope.cajaChica.compra.recargo = 0
                $scope.cajaChica.compra.ice = 0
                $scope.cajaChica.compra.excento = 0

            }
            $scope.verificarFechaCajaChica = async () => {
                let bool = false;
                let fechaCompra = moment($scope.cajaChica.compra.fechaTexto, "DD/MM/YYYY").format("YYYY/MM/DD");
                let fechaActual = moment($scope.fechaATexto(new Date()), "DD/MM/YYYY").format("YYYY/MM/DD");
                var monthCompra = moment(fechaCompra).format('M');
                var monthActual = moment(fechaActual).format('M');
                let mensaje = monthCompra > monthActual ? `No se puede guardar la fecha de la compra no correponde a un mes todavía no vigente` :
                    fechaCompra > fechaActual ? `La fecha de la compra ${fechaCompra}  es mayor a la actual esta seguro de continuar` : `La fecha es menor a la actual esta seguro de continuar`;
                let sweetParams = {
                    title: "Verificar Fecha Compra",
                    text: mensaje,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                };
                if (monthCompra > monthActual) sweetParams.showConfirmButton = false;
                bool = await SweetAlert.swal(sweetParams)

                return bool.isConfirmed;
            }
            $scope.verificarFormRegistroCajaChica = async (invalid) => {

                if (invalid) {
                    $scope.cajaChica.verDatosCompra = true
                } else {
                    if ($scope.cajaChica.campos) {
                        if ($scope.cajaChica.campos.length > 0) {
                            $scope.mensajeValidacionCentroCosto = false
                            let boolVerificarFecha = await $scope.verificarFechaCajaChica()
                            if (boolVerificarFecha) {
                                $scope.guardarCajaChica()
                            }
                        } else {
                            $scope.mensajeValidacionCentroCosto = true
                        }
                    } else {
                        $scope.mensajeValidacionCentroCosto = true
                    }
                }
            }
            $scope.guardarCajaChica = function () {
                if ($scope.cajaChica.solicitud) {
                    if ($scope.cajaChica.Desembolso) {
                        var idsus = $scope.cajaChica.sucursal.id
                        $scope.cajaChica.sucursal = { id: idsus }
                        $scope.cajaChica.solicitud = { id: $scope.cajaChica.solicitud.id, estado: $scope.cajaChica.solicitud.estado, id_empleado: $scope.cajaChica.solicitud.id_solicitante }
                        // $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                        $scope.cajaChica.fecha = new Date()


                        if ($scope.cajaChica.Anticipo || $scope.cajaChica.proveedor) {
                            $scope.cajaChica.solicitud.estado = $scope.tiposEstados.find(function (x, index, array) {
                                return x.nombre_corto === $scope.diccionario.CC_ESTADO_PROCESADO
                            })
                        } else {
                            $scope.cajaChica.solicitud.estado = $scope.tiposEstados.find(function (x, index, array) {
                                return x.nombre_corto === $scope.diccionario.CC_ESTADO_DESEMBOLSADO
                            })
                        }
                        if ($scope.cajaChica.cuenta.id) {
                            $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                            blockUI.start()
                            var tiempoActual = new Date();
                            $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                            $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                            $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                            var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                            promesa.then(function (dato) {
                                blockUI.stop()
                                if (dato.hasErr || dato.hasError) return $scope.mostrarMensaje(dato.mensaje)
                                $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica)
                                $scope.obtenerListaSolicitudes()

                                SweetAlert.swal("", dato.mensaje, "success");
                                $scope.validarCuenta = false
                                if ($scope.cajaChica.Anticipo) {
                                    $scope.cerrarModalRegistroAnticipoCajaChica()
                                } else if ($scope.cajaChica.proveedor) {
                                    $scope.cerrarModalRegistroProveedorCajaChica()
                                } else {
                                    $scope.cerrarModalRegistroDesembolsoCajaChica()
                                }
                            })
                        } else {
                            $scope.validarCuenta = true
                        }
                    } else {

                        if ($scope.cajaChica.solicitud != null) {
                            if ($scope.cajaChica.solicitud.concepto.concepto.nombre_corto == "KARDEX") {
                                if ($scope.cajaChica.solicitud.cajasChicas.length > 0) {
                                    var varlorcomparar = $scope.cajaChica.solicitud.cajasChicas[0].saldo
                                } else {
                                    var varlorcomparar = -1
                                }
                                if ($scope.cajaChica.compra.importe == varlorcomparar) {
                                    $scope.cajaChica.solicitud.estado = $scope.tiposEstados.find(function (x, index, array) {
                                        return x.nombre_corto === $scope.diccionario.CC_ESTADO_PROCESADO
                                    })
                                    if ($scope.cajaChica.cuenta.id) {
                                        $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                                        blockUI.start()

                                        $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                                        $scope.cajaChica.compra.fecha = new Date($scope.convertirFecha($scope.cajaChica.compra.fechaTexto))
                                        var tiempoActual = new Date();
                                        $scope.cajaChica.compra.fecha.setHours(tiempoActual.getHours())
                                        $scope.cajaChica.compra.fecha.setMinutes(tiempoActual.getMinutes())
                                        $scope.cajaChica.compra.fecha.setSeconds(tiempoActual.getSeconds())
                                        $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                                        $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                                        $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                                        var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                                        promesa.then(function (dato) {
                                            blockUI.stop()
                                            if (dato.hasErr) return SweetAlert.swal("", dato.mensaje, "error")
                                            $scope.obtenerListaSolicitudes()
                                            SweetAlert.swal("", dato.mensaje, "success")
                                            if ($scope.retencionActivo == true) {
                                                $scope.obtenerServicios()
                                                $scope.cerrarModalRegistroCajaChica()
                                                $scope.abrirModalDetalleGastosFondo($scope.solicitud)
                                                if ($scope.usar_imprecion_rendicion) {
                                                    $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica, true)
                                                }
                                            } else {
                                                $scope.ObtenerRegistroCajaChica($scope.cajaChica.solicitud)
                                                $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica, true)
                                            }
                                            $scope.validarCuenta = false
                                        })
                                    } else {
                                        $scope.validarCuenta = true
                                    }
                                } else {
                                    if ($scope.cajaChica.cuenta.id) {
                                        $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                                        blockUI.start()

                                        $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                                        $scope.cajaChica.compra.fecha = new Date($scope.convertirFecha($scope.cajaChica.compra.fechaTexto))
                                        var tiempoActual = new Date();
                                        $scope.cajaChica.compra.fecha.setHours(tiempoActual.getHours())
                                        $scope.cajaChica.compra.fecha.setMinutes(tiempoActual.getMinutes())
                                        $scope.cajaChica.compra.fecha.setSeconds(tiempoActual.getSeconds())
                                        $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                                        $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                                        $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                                        var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                                        promesa.then(function (dato) {
                                            blockUI.stop()
                                            if (dato.hasErr) return SweetAlert.swal("", dato.mensaje, "error")
                                            $scope.obtenerListaSolicitudes()
                                            SweetAlert.swal("", dato.mensaje, "success")
                                            if ($scope.retencionActivo == true) {
                                                $scope.obtenerServicios()
                                                $scope.cerrarModalRegistroCajaChica()
                                                $scope.abrirModalDetalleGastosFondo($scope.solicitud)
                                                if ($scope.usar_imprecion_rendicion) {
                                                    $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica, true)
                                                }
                                            } else {
                                                $scope.ObtenerRegistroCajaChica($scope.cajaChica.solicitud)
                                                $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica, true)
                                            }

                                            $scope.validarCuenta = false
                                        })
                                    } else {
                                        $scope.validarCuenta = true
                                    }
                                }
                            } else {
                                if ($scope.cajaChica.cuenta.id) {
                                    blockUI.start()
                                    $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                                    if ($scope.cajaChica.compra.tipo_retencion && ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES)) {
                                        if ($scope.cajaChica.compra.total == $scope.saldoMontoGasto || $scope.saldoMontoGasto == 0) {
                                            $scope.cajaChica.solicitud.estado = $scope.tiposEstados.find(function (tipo, index, array) {
                                                return tipo.nombre_corto === $scope.diccionario.CC_ESTADO_PROCESADO
                                            });
                                        }

                                    } else
                                        if ($scope.cajaChica.compra.importe == $scope.saldoMontoGasto || $scope.saldoMontoGasto == 0) {
                                            $scope.cajaChica.solicitud.estado = $scope.tiposEstados.find(function (tipo, index, array) {
                                                return tipo.nombre_corto === $scope.diccionario.CC_ESTADO_PROCESADO
                                            });
                                        }

                                    $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                                    $scope.cajaChica.compra.fecha = new Date($scope.convertirFecha($scope.cajaChica.compra.fechaTexto))
                                    var tiempoActual = new Date();
                                    $scope.cajaChica.compra.fecha.setHours(tiempoActual.getHours())
                                    $scope.cajaChica.compra.fecha.setMinutes(tiempoActual.getMinutes())
                                    $scope.cajaChica.compra.fecha.setSeconds(tiempoActual.getSeconds())
                                    $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                                    $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                                    $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                                    var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                                    promesa.then(function (dato) {
                                        blockUI.stop()
                                        if (dato.hasErr) return SweetAlert.swal("", dato.mensaje, "error")
                                        $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica)
                                        $scope.obtenerListaSolicitudes()
                                        SweetAlert.swal("", dato.mensaje, "success")
                                        if ($scope.cajaChica.solicitud.estado.nombre_corto == $scope.diccionario.CC_ESTADO_PROCESADO) {
                                            $scope.cerrarModalRegistroCajaChica()
                                        } else {
                                            $scope.ObtenerRegistroCajaChica($scope.cajaChica.solicitud)
                                        }
                                        $scope.validarCuenta = false
                                    })



                                } else {
                                    $scope.validarCuenta = true
                                }
                            }

                        } else {
                            if ($scope.cajaChica.cuenta.id) {
                                $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                                blockUI.start()

                                $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                                $scope.cajaChica.compra.fecha = new Date($scope.convertirFecha($scope.cajaChica.compra.fechaTexto))
                                var tiempoActual = new Date();
                                $scope.cajaChica.compra.fecha.setHours(tiempoActual.getHours())
                                $scope.cajaChica.compra.fecha.setMinutes(tiempoActual.getMinutes())
                                $scope.cajaChica.compra.fecha.setSeconds(tiempoActual.getSeconds())
                                $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                                $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                                $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                                var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                                promesa.then(function (dato) {
                                    blockUI.stop()
                                    if (dato.hasErr) return $scope.mostrarMensaje(dato.mensaje)
                                    $scope.obtenerListaSolicitudes()
                                    $scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica)
                                    $scope.mostrarMensaje(dato.mensaje)
                                    $scope.ObtenerRegistroCajaChica($scope.cajaChica.solicitud)
                                    //$scope.cerrarModalRegistroCajaChica()
                                    $scope.validarCuenta = false
                                })
                            } else {
                                $scope.validarCuenta = true
                            }
                        }
                    }
                } else {
                    if ($scope.cajaChica.cuenta.id) {
                        blockUI.start()
                        $scope.cajaChica.fecha = new Date($scope.convertirFecha($scope.cajaChica.fecha))
                        var tiempoActual = new Date();
                        $scope.cajaChica.fecha.setHours(tiempoActual.getHours())
                        $scope.cajaChica.fecha.setMinutes(tiempoActual.getMinutes())
                        $scope.cajaChica.fecha.setSeconds(tiempoActual.getSeconds())
                        $scope.cajaChica.cuenta = { id: $scope.cajaChica.cuenta.id }
                        var promesa = GuardarCajaChica($scope.cajaChica, $scope.usuario.id_empresa)
                        promesa.then(function (dato) {
                            blockUI.stop()
                            if (dato.hasErr) return SweetAlert.swal("", dato.mensaje, "error")
                            //$scope.generarPdfBoletaCajaChica($scope.cajaChica.solicitud, dato.cajaChica)
                            $scope.obtenerListaIngresos()
                            $scope.obtenerListaSolicitudes()
                            SweetAlert.swal("", dato.mensaje, "success")
                            //$scope.ObtenerRegistroCajaChica($scope.cajaChica.solicitud)
                            $scope.cerrarModalRegistroIngresoCajaChica()
                            $scope.validarCuenta = false
                        })
                    } else {
                        $scope.validarCuenta = true
                    }
                }
            }
            $scope.filterPorTipo = function (dato, filtro) {
                $scope.tipoFiltro = dato
                if (dato == "TODOS") {
                    filtro.movimiento = 0
                    $scope.paginator.getSearch($scope.paginator.search, filtro, null)
                } else {
                    var mov = $scope.tiposMovimientos.clases.find(function (movimiento) {
                        return movimiento.nombre.toUpperCase() == dato.toUpperCase()
                    })
                    filtro.movimiento = mov.id
                    $scope.obtenerListaSolicitudes(filtro)

                }
            }


            $scope.obtenerDatosCierreCaja = function () {
                blockUI.start()
                var fecha = new Date()
                var promesa = ObtenerDatosCierreCaja($scope.usuario.id_empresa, fecha, $scope.totalRlCaja, $scope.sucursalPrincipal.id, $scope.usuario.id)
                promesa.then(function (dato) {
                    blockUI.stop()
                    if (dato.hasErr) return $scope.mostrarMensaje(dato.mensaje)
                    var datos = dato.cierreCaja
                    if (!angular.isArray(datos)) {
                        $scope.generarPdfCajaChica(datos)
                    } else {
                        $scope.mostrarMensaje("No hay movimientos para realizar el cierre de caja");
                    }

                })
            }

            $scope.crearNuevoComprobanteCajaChicaCierre = function (datos) {
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
                var promesa = DatosCierreCajaChica(datos.id, $scope.usuario.id_empresa, $scope.sucursalPrincipal.id)
                promesa.then(function (dato) {
                    if (dato.hasErr) return $scope.mostrarMensaje(dato.mensaje)
                    $scope.crearNuevoComprobante('cierreCaja', dato.cierreCaja)
                })
            }
            $scope.generarPdfCajaChica = function (datos) {
                var promesa = DatosCierreCajaChica(datos.id, $scope.usuario.id_empresa, $scope.sucursalPrincipal.id)
                promesa.then(function (dato) {
                    if (dato.hasErr) return $scope.mostrarMensaje(dato.mensaje)
                    var datos = dato.cierreCaja

                    blockUI.start();
                    var monto = 0
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
                    var stream = doc.pipe(blobStream());
                    // draw some text
                    var totalCosto = 0;
                    doc.lineWidth(0.5);
                    var y = 95, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil((datos.detalleCierreCaja.length + 4) / itemsPorPagina);
                    $scope.dibujarCabeceraPDFCajaChica(doc, 1, totalPaginas, datos);
                    doc.font('Helvetica', 7);
                    var saldo = datos.saldo_inicial
                    for (var i = 0; i < datos.detalleCierreCaja.length && items <= itemsPorPagina; i++) {

                        if (i % 2 == 0) doc.rect(40, y, 542, 20).fill('#f4f4f4').fillColor('#000');
                        var caja = datos.detalleCierreCaja[i]
                        //doc.rect(40, y , 542, 20).stroke();
                        doc.rect(40, y, 0, 20).stroke();
                        doc.rect(75, y, 0, 20).stroke();
                        doc.rect(125, y, 0, 20).stroke();
                        doc.rect(270, y, 0, 20).stroke();
                        doc.rect(420, y, 0, 20).stroke();
                        doc.rect(470, y, 0, 20).stroke();
                        doc.rect(525, y, 0, 20).stroke();
                        doc.rect(582, y, 0, 20).stroke();

                        doc.text(caja.id, 42, y + 7, { width: 29, align: 'right' });
                        doc.text($scope.fechaATexto(new Date(caja.fecha)), 82, y + 7);
                        if (caja.solicitud) {
                            doc.text(caja.solicitud.solicitante.persona.nombre_completo, 128, y + 5, { width: 135 });
                        } else {
                            // console.log(caja);
                            /*  doc.text(caja.cuenta.nombre, 150, y, { width: 120 }); */
                        }
                        doc.text(caja.concepto.nombre, 273, y + 7, { width: 150 });
                        if (caja.compra) {
                            if (caja.compra.factura) {
                                doc.text(caja.compra.factura, 422, y + 7, { width: 45, align: 'right' })
                            } else {
                                doc.text("", 422, y + 7, { width: 45, align: 'right' })
                            }
                        }
                        if (caja.concepto.nombre == "DEVOLUCION") {
                            if (caja.cajaChicaSolicitud) {
                                doc.text(caja.cajaChicaSolicitud.solicitud.solicitante.persona.nombre_completo, 127, y + 7, { width: 120 });
                            }
                        }
                        if (caja.concepto.concepto.nombre == "INGRESO") {

                            if (caja.compra) {
                                monto = caja.monto
                                doc.text("" + number_format(monto, 2), 472, y + 7, { width: 50, align: 'right' });
                                saldo += monto
                            } else {
                                //doc.text(caja.solicitud.cuenta.nombre, 150, y, { width: 120 });
                                monto = caja.monto
                                doc.text("" + number_format(monto, 2), 472, y + 7, { width: 50, align: 'right' });
                                saldo += monto
                            }
                        } else {
                            if (caja.compra) {
                                monto = caja.monto
                                doc.text("(" + number_format(monto, 2) + ")", 472, y + 7, { width: 50, align: 'right' });
                                saldo -= monto
                            } else {
                                //doc.text(caja.solicitud.cuenta.nombre, 150, y, { width: 120 });
                                monto = caja.monto
                                doc.text("(" + number_format(monto, 2) + ")", 472, y + 7, { width: 50, align: 'right' });
                                saldo -= monto
                            }
                        }
                        if (saldo < 0) {
                            saldoFor = saldo * -1
                            doc.text("(" + number_format(saldoFor, 2) + ")", 540, y + 7, { width: 38, align: 'right' });
                        } else {
                            doc.text(number_format(saldo, 2), 540, y + 7, { width: 38, align: 'right' });
                        }
                        y = y + 20;
                        items++;

                        if (items == itemsPorPagina) {
                            doc.rect(40, y, 542, 0).stroke();
                            doc.addPage({ margin: 0, bufferPages: true });
                            y = 95;
                            items = 0;
                            pagina = pagina + 1;
                            if ((datos.detalleCierreCaja.length - 1) != i) {
                                doc.lineWidth(0.5);
                                $scope.dibujarCabeceraPDFCajaChica(doc, pagina, totalPaginas, datos);
                            }
                            doc.font('Helvetica', 7);
                        }
                        if ((datos.detalleCierreCaja.length - 1) == i) {
                            doc.rect(40, y, 542, 0).stroke();
                        }
                    }
                    doc.font('Helvetica', 8);
                    doc.rect(201, y + 35, 200, 0).dash(1, { space: 5 }).stroke();
                    doc.text("Encargado Caja Chica", 170, y + 42, { width: 271, align: "center" });
                    doc.text(datos.usuario.persona.nombre_completo, 170, y + 50, { width: 271, align: "center" });

                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                    blockUI.stop();
                })
            }
            $scope.dibujarCabeceraPDFCajaChica = function (doc, pagina, totalPaginas, datos) {
                doc.font('Helvetica-Bold', 12);
                doc.text("CIERRE CAJA CHICA", 0, 25, { align: "center" }); +
                    doc.font('Helvetica', 8);
                doc.text("DEL " + $scope.fechaATexto(datos.inicio) + " AL " + $scope.fechaATexto(datos.fin), 0, 37, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("(Expresado en Bolivianos)", 0, 45, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
                /* doc.rect(30, 50, 555, 30).stroke(); */
                doc.font('Helvetica-Bold', 8);
                doc.text("SALDO INICIAL : BS. " + number_format(datos.saldo_inicial, 2), 40, 65);
                doc.font('Helvetica', 8);
                /*  doc.text(proveedor.razon_social, 140, 60); */
                doc.rect(40, 75, 542, 20).stroke();
                // doc.rect(40, 75, 0, 20).stroke();
                doc.rect(75, 75, 0, 20).stroke();
                doc.rect(125, 75, 0, 20).stroke();
                doc.rect(270, 75, 0, 20).stroke();
                doc.rect(420, 75, 0, 20).stroke();
                doc.rect(470, 75, 0, 20).stroke();
                doc.rect(525, 75, 0, 20).stroke();

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 40, 82, { width: 40, align: 'center' });
                doc.text("FECHA", 75, 82, { width: 50, align: 'center' });
                doc.text("NOMBRE", 125, 82, { width: 140, align: 'center' });
                doc.text("GASTO", 270, 82, { width: 145, align: 'center' });
                doc.text("N° FACT", 420, 82, { width: 50, align: 'center' });
                doc.text("MONTO", 470, 82, { width: 57, align: 'center' });
                doc.text("SALDO", 525, 82, { width: 55, align: 'center' });
                doc.font('Helvetica', 8);
                var fechaActual = new Date();
                var min = fechaActual.getMinutes();
                if (min < 10) {
                    min = "0" + min;
                }
                doc.font('Helvetica', 7);
                doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 380, 750);
                doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 475, 750);
            }
            $scope.generarPdfIncrementoCajaChica = function (solicitud, caja, kardex) {
                var delayImagen = ObtenerImagen($scope.usuario.empresa.imagen);
                delayImagen.then(function (imagen) {
                    var doc = new PDFDocument({ size: 'letter', margin: 10 });
                    var stream = doc.pipe(blobStream());
                    // draw some text
                    var totalCosto = 0;
                    var y = 45;
                    $scope.dibujarPDFIncrementoCajaChica(doc, solicitud, caja, y, imagen, kardex);
                    y += 370
                    doc.rect(0, y - 35, 650, 0).dash(2, { space: 5 }).stroke()
                    $scope.dibujarPDFIncrementoCajaChica(doc, solicitud, caja, y, imagen, kardex);
                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.dibujarPDFIncrementoCajaChica = function (doc, solicitud, caja, y, imagen, kardex) {
                if (solicitud) {
                    caja = solicitud.cajasChicas.find(function (caja1) {
                        return caja.id == caja1.id
                    })
                }


                doc.text("RECIBO DE CAJA", 0, y + 20, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.text(caja.sucursal.nombre, 0, y + 40, { align: "center" });
                doc.text("Nro. " + solicitud.numero_correlativo_incremento, 0, y + 50, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("Fecha.: " + $scope.fechaATexto(solicitud.fecha_incremento), 0, y + 60, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.rect(465, y, 90, 20).dash(0, { space: 0 }).stroke()
                doc.rect(435, y, 30, 20).dash(0, { space: 0 }).stroke()
                doc.rect(465, y + 20, 90, 20).dash(0, { space: 0 }).stroke()
                doc.rect(435, y + 20, 30, 20).dash(0, { space: 0 }).stroke()
                doc.text("Bs.", 445, y + 10);
                var pagado = solicitud.incremento
                doc.text(pagado.toFixed(2), 485, y + 10);
                doc.text("$us.", 445, y + 30);
                doc.font('Helvetica', 8);

                if (solicitud.cajasChicas.length == 0 || solicitud.cajasChicas.length == 1) {
                    var nombre = "Caja " + $scope.usuario.empresa.razon_social
                } else {
                    var nombre = solicitud.solicitante.persona.nombre_completo
                }
                doc.text("Recibí de .: " + nombre, 45, y + 80);
                if (caja.id_padre) {
                    doc.text("La suma de .: " + ConvertirALiteral(pagado.toFixed(2)), 45, y + 95);
                } else {
                    doc.text("La suma de .: " + ConvertirALiteral(pagado.toFixed(2)), 45, y + 95);
                }

                doc.font('Helvetica', 8);
                doc.text("Por concepto de:", 45, y + 110);
                doc.font('Helvetica-Bold', 8);
                doc.text("DETALLE", 200, y + 125);
                doc.text("IMPORTE", 485, y + 125);
                doc.font('Helvetica', 8);
                doc.text(caja.detalle, 55, y + 155, { width: 410 });
                var longitudCaracteres = caja.detalle.length;
                var yDesc = (longitudCaracteres <= 100) ? y + 165 : ((longitudCaracteres > 100 && longitudCaracteres <= 202) ? y + 175 : y + 185);

                doc.text(pagado.toFixed(2), 485, y + 155);
                if (solicitud != undefined || solicitud != null) {
                    if (solicitud.concepto != undefined || solicitud.concepto != null) {
                        if (solicitud.concepto.concepto.nombre_corto == $scope.diccionario.CC_MOV_KARDEX) {
                            if (caja.id_padre == null) {
                                doc.text($scope.fechaATexto(solicitud.fecha_incremento) + " - Incremento", 55, yDesc, { width: 410 });
                                /*  if (solicitud.incremento > 0) doc.text(solicitud.incremento.toFixed(2), 485, y + 165); */
                            }
                        }
                    }
                }
                doc.font('Helvetica', 8);
                doc.rect(45, y + 120, 420, 20).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(45, y + 140, 420, 60).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(465, y + 120, 90, 20).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(465, y + 140, 90, 60).dash(0, { space: 0 }).stroke().stroke();
                doc.font('Helvetica', 6);

                doc.rect(250, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                doc.text(solicitud.solicitante.persona.nombre_completo, 225, y + 285, { width: 150, align: "center" });
                doc.text("Recibí Conforme", 225, y + 295, { width: 150, align: "center" });
                doc.rect(450, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                doc.text(caja.usuario.persona.nombre_completo, 425, y + 285, { width: 150, align: "center" });
                doc.text("Entregue Conforme", 425, y + 295, { width: 150, align: "center" });


                var fechaActual = new Date()
                doc.text("Usuario.: " + $scope.usuario.nombre_usuario + " Hora.: " + fechaActual.getHours() + ":" + fechaActual.getMinutes() + " imp.: " + $scope.fechaATexto(fechaActual), 425, y + 310, { width: 150, align: "center" });
            }
            $scope.generarPdfBoletaCajaChica = function (solicitud, caja, kardex) {
                if (solicitud) {
                    var promesa = ObtenerDatosSolicitudID(solicitud.id)
                    promesa.then(function (dato) {
                        if (dato.hasErr) return $scope.mostrarMensaje(dato.mensaje)
                        solicitud = dato.solicitud
                        if (!caja) {
                            caja = dato.solicitud.cajasChicas[0]

                        }
                        if (solicitud != undefined || solicitud != null) {
                            if (solicitud.concepto != undefined || solicitud.concepto != null) {
                                if (solicitud.concepto.concepto.nombre_corto == $scope.diccionario.CC_MOV_KARDEX && solicitud.incremento > 0) {
                                    if (caja.id_padre == null) {
                                        $scope.generarPdfIncrementoCajaChica(solicitud, caja, kardex)
                                    }
                                }
                            }
                        }
                        // convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
                        var delayImagen = ObtenerImagen($scope.usuario.empresa.imagen);
                        delayImagen.then(function (imagen) {
                            var doc = new PDFDocument({ size: 'letter', margin: 10 });
                            var stream = doc.pipe(blobStream());
                            // draw some text
                            var totalCosto = 0;
                            var y = 45;
                            $scope.dibujarPDFBoletaCajaChica(doc, solicitud, caja, y, imagen, kardex);
                            y += 370
                            doc.rect(0, y - 35, 650, 0).dash(2, { space: 5 }).stroke()
                            $scope.dibujarPDFBoletaCajaChica(doc, solicitud, caja, y, imagen, kardex);
                            doc.end();
                            stream.on('finish', function () {
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        }).catch(function (err) {
                            blockUI.stop()
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                        })
                    })
                    // });
                } else {
                    var delayImagen = ObtenerImagen($scope.usuario.empresa.imagen);
                    delayImagen.then(function (imagen) {
                        var doc = new PDFDocument({ size: 'letter', margin: 10 });
                        var stream = doc.pipe(blobStream());
                        // draw some text
                        var totalCosto = 0;
                        var y = 45;
                        $scope.dibujarPDFBoletaCajaChica(doc, solicitud, caja, y, imagen, kardex);
                        y += 370
                        doc.rect(0, y - 35, 650, 0).dash(2, { space: 5 }).stroke()
                        $scope.dibujarPDFBoletaCajaChica(doc, solicitud, caja, y, imagen, kardex);
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                    }).catch(function (err) {
                        blockUI.stop()
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }
            }
            $scope.dibujarPDFBoletaCajaChica = function (doc, solicitud, caja, y, imagen, kardex) {
                const fondos_rendir = solicitud && { ...solicitud.cajasChicas.find(caja_chica => caja_chica.concepto.concepto.nombre === "FONDOS A RENDIR") } || null;
                const caja_c_solicitud = caja.cajaChicaSolicitud && { ...caja.cajaChicaSolicitud } || null
                if (solicitud) {
                    caja = solicitud.cajasChicas.find(function (caja1) {
                        return caja.id == caja1.id
                    })
                }
                let detalle = caja.detalle;
                if (caja.concepto.concepto.nombre != "INGRESO") {
                    if (!kardex) {
                        doc.text("RECIBO DE CAJA", 0, y + 20, { align: "center" });
                        detalle += (caja_c_solicitud && ' (' + caja_c_solicitud.numero_correlativo + ')') || ''
                    } else {
                        doc.text("RENDICIÓN FONDOS CAJA CHICA", 0, y + 20, { align: "center" });
                        detalle += (fondos_rendir && (fondos_rendir.id != caja.id) && ' (' + fondos_rendir.numero_correlativo + ')') || ''
                    }
                    var canvas = document.getElementById('qr-code');
                    qr.canvas({
                        canvas: canvas,
                        value: caja.numero_correlativo + "|" + caja.fecha + "|" + caja.monto + "|" + solicitud.solicitante.persona.nombre_completo + "|" + solicitud.autorizador.persona.nombre_completo
                    }, function () { });
                    var qrImage = canvas.toDataURL('image/png');
                    doc.image(qrImage, 45, y + 220, { width: 40, height: 40 });
                    doc.font('Helvetica-Bold', 12);
                    doc.image(imagen, 30, y - 20, { fit: [80, 80] });
                } else {
                    doc.text("RECIBO DE CAJA", 0, y + 20, { align: "center" });
                    doc.font('Helvetica-Bold', 8);
                    doc.text("(INGRESO)", 0, y + 30, { align: "center" });
                    detalle += (fondos_rendir && (fondos_rendir.id != caja.id) && ' (' + fondos_rendir.numero_correlativo + ')') || ''
                }
                doc.font('Helvetica-Bold', 8);
                doc.text(caja.sucursal.nombre, 0, y + 40, { align: "center" });
                doc.text("Nro. " + caja.numero_correlativo, 0, y + 50, { align: "center" });
                doc.font('Helvetica', 8);
                doc.text("Fecha.: " + $scope.fechaATexto(caja.fecha), 0, y + 60, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.rect(465, y, 90, 20).dash(0, { space: 0 }).stroke()
                doc.rect(435, y, 30, 20).dash(0, { space: 0 }).stroke()
                doc.rect(465, y + 20, 90, 20).dash(0, { space: 0 }).stroke()
                doc.rect(435, y + 20, 30, 20).dash(0, { space: 0 }).stroke()
                doc.text("Bs.", 445, y + 10);
                var pagado = 0
                if (caja.compra) {
                    if (caja.id_padre) {
                        pagado = caja.pagado
                        doc.text(pagado.toFixed(2), 485, y + 10);
                    } else {
                        pagado = caja.monto
                        doc.text(pagado.toFixed(2), 485, y + 10);

                    }
                } else {
                    if (caja.id_padre) {
                        pagado = caja.pagado
                        doc.text(caja.pagado.toFixed(2), 485, y + 10);
                    } else {
                        pagado = caja.monto
                        if (solicitud != undefined || solicitud != null) {
                            if (solicitud.concepto != undefined || solicitud.concepto != null) {
                                if (solicitud.concepto.concepto.nombre_corto == $scope.diccionario.CC_MOV_KARDEX) {
                                    pagado = pagado - solicitud.incremento
                                }
                            }
                        }
                        doc.text(pagado.toFixed(2), 485, y + 10);

                    }
                }

                doc.text("$us.", 445, y + 30);
                doc.font('Helvetica', 8);
                if (caja.concepto.concepto.nombre == "GASTO") {
                    var datos = $scope.fechaATexto(solicitud.cajasChicas[0].fecha).split("/")
                    var dia = $scope.obtenerDiaTextoSemana(solicitud.cajasChicas[0].fecha)
                    var mes = $scope.mesesFiltro[datos[1] - 1].nombre
                    doc.text(dia + ", " + datos[0] + " de " + mes + " de " + datos[2], 45, y + 65);
                }
                if (solicitud) {
                    if (solicitud.cajasChicas.length == 0 || solicitud.cajasChicas.length == 1) {
                        var nombre = "Caja " + $scope.usuario.empresa.razon_social
                    } else {
                        var nombre = solicitud.solicitante.persona.nombre_completo
                    }

                } else {
                    if (caja.concepto.nombre == "DEVOLUCION") {
                        if (caja.cajaChicaSolicitud) {
                            var nombre = caja.cajaChicaSolicitud.solicitud.solicitante.persona.nombre_completo;
                        } else {
                            var nombre = $scope.usuario.empresa.razon_social
                        }

                    } else {
                        var nombre = $scope.usuario.empresa.razon_social
                    }
                    // var nombre = $scope.usuario.empresa.razon_social
                }
                doc.text("Recibí de .: " + nombre, 45, y + 80);
                if (caja.id_padre) {
                    doc.text("La suma de .: " + ConvertirALiteral(pagado.toFixed(2)), 45, y + 95);
                } else {
                    doc.text("La suma de .: " + ConvertirALiteral(pagado.toFixed(2)), 45, y + 95);
                }

                doc.font('Helvetica', 8);



                if (caja.concepto.concepto.nombre != "INGRESO") {
                    doc.text("Autorizado por :", 350, y + 80);
                    doc.text(solicitud.autorizador.persona.nombre_completo.toUpperCase(), 410, y + 80);
                    doc.text("Bajo el concepto de: " + caja.concepto.nombre, 45, y + 110);
                    y += 15
                } else {
                    if (caja.cajaChicaSolicitud) {
                        doc.text("Documento: " + caja.cajaChicaSolicitud.numero_correlativo, 45, y + 110);
                        y += 15
                    }
                }
                doc.text("Por concepto de:", 45, y + 110);
                doc.font('Helvetica-Bold', 8);
                doc.text("DETALLE", 200, y + 125);
                doc.text("IMPORTE", 485, y + 125);
                doc.font('Helvetica', 8);

                doc.text(detalle, 55, y + 155, { width: 410 });
                var longitudCaracteres = detalle.length;
                var yDesc = (longitudCaracteres <= 100) ? y + 165 : ((longitudCaracteres > 100 && longitudCaracteres <= 202) ? y + 175 : y + 185);

                doc.text(pagado.toFixed(2), 485, y + 155);
                if (caja.compra) {
                    if (caja.compra.movimiento == undefined) {
                        caja.compra.movimiento = { clase: {} }
                        caja.compra.movimiento.clase = caja.compra.tipoMovimiento
                    }
                    var it = 0
                    var iue = 0
                    var importe = pagado
                    var total = 0
                    if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                        if (caja.compra.tipo_retencion) {
                            total = importe
                            importe = (total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + total
                            it = (importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                            iue = (importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        } else {
                            it = (importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                            iue = (importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                            total = (importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
                            importe = total - it - iue
                        }
                        doc.text(it.toFixed(2), 485, y + 165);
                        doc.text(iue.toFixed(2), 485, y + 175);
                        doc.text("Total", 435, y + 215);
                        doc.text(importe.toFixed(2), 485, y + 215);
                        /* $scope.detalleCompra.total = $scope.detalleCompra.importe */
                    } else if (caja.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                        if (caja.compra.tipo_retencion) {

                            total = importe
                            importe = (total * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + total
                            it = (importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                            iue = (importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

                        } else {

                            it = (importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                            iue = (importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
                            total = (importe * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


                        }
                        doc.text(it.toFixed(2) + (caja.compra.tipo_retencion ? "" : "(-)"), 485, y + 165);
                        doc.text(iue.toFixed(2) + (caja.compra.tipo_retencion ? "" : "(-)"), 485, y + 175);
                        doc.text("Total", 435, y + 215);
                        doc.text(importe.toFixed(2), 485, y + 215);
                    }
                }
                doc.font('Helvetica', 8);
                doc.rect(45, y + 120, 420, 20).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(45, y + 140, 420, 60).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(465, y + 120, 90, 20).dash(0, { space: 0 }).stroke().stroke();
                doc.rect(465, y + 140, 90, 60).dash(0, { space: 0 }).stroke().stroke();
                doc.font('Helvetica', 6);
                //doc.rect(70, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                // doc.text(solicitud.usuario.persona.nombre_completo, 45, y + 285,{width:150,align: "center"});
                if (caja.concepto.concepto.nombre == "INGRESO") {
                    //doc.text("Autorizado", 45, y + 295, { width: 150, align: "center" });
                    //doc.rect(250, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                    var solicitanteNombre = "";
                    if (caja.concepto.nombre == "DEVOLUCION") {
                        if (caja.cajaChicaSolicitud) {
                            var solicitanteNombre = caja.cajaChicaSolicitud.solicitud.solicitante.persona.nombre_completo;
                        } else {
                            var solicitanteNombre = $scope.usuario.empresa.razon_social
                        }

                    } else {
                        var solicitanteNombre = $scope.usuario.empresa.razon_social
                    }
                    doc.rect(250, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                    doc.text(solicitanteNombre, 225, y + 285, { width: 150, align: "center" });

                    doc.text("Entregue Conforme", 225, y + 295, { width: 150, align: "center" });
                    doc.rect(450, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                    doc.text(caja.usuario.persona.nombre_completo, 425, y + 285, { width: 150, align: "center" });
                    doc.text("Recibí Conforme", 425, y + 295, { width: 150, align: "center" });
                } else {
                    //doc.text(solicitud.usuario.persona.nombre_completo, 45, y + 285, { width: 150, align: "center" });
                    //doc.text("Autorizado", 45, y + 295, { width: 150, align: "center" });
                    doc.rect(250, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                    if (solicitud.proveedor != undefined && solicitud.proveedor != null) {
                        doc.text(solicitud.proveedor.razon_social, 225, y + 285, { width: 150, align: "center" });
                    } else {
                        doc.text(solicitud.solicitante.persona.nombre_completo, 225, y + 285, { width: 150, align: "center" });
                    }
                    doc.text("Recibí Conforme", 225, y + 295, { width: 150, align: "center" });
                    doc.rect(450, y + 275, 100, 0).dash(2, { space: 5 }).stroke()
                    doc.text(caja.usuario.persona.nombre_completo, 425, y + 285, { width: 150, align: "center" });
                    doc.text("Entregue Conforme", 425, y + 295, { width: 150, align: "center" });
                }

                var fechaActual = new Date()
                doc.text("Usuario.: " + $scope.usuario.nombre_usuario + " Hora.: " + fechaActual.getHours() + ":" + fechaActual.getMinutes() + " imp.: " + $scope.fechaATexto(fechaActual), 425, y + 310, { width: 150, align: "center" });
            }

            $scope.dibujarCuerpoPDFBoletaCajaChica = function (doc, solicitud, caja, y) {
                /*  doc.rect(30, y - 10, 555, 20).stroke(); */

            }
            $scope.verificarProducto = function (detalleCompra) {

                if ($scope.cajaChica.compra.movimiento.clase != undefined) {
                    if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                        detalleCompra.descuento = 0
                        detalleCompra.ice = 0
                        detalleCompra.recargo = 0
                        detalleCompra.excento = 0
                        $scope.configuracionCompraVista.mostrar_it_retencion = true
                        $scope.configuracionCompraVista.mostrar_iue = true
                        $scope.configuracionCompraVista.mostrar_pagado = true
                        $scope.agregarDetalleCompra(detalleCompra);
                    } else {
                        $scope.agregarDetalleCompra(detalleCompra);
                    }
                } else {
                    $scope.agregarDetalleCompra(detalleCompra);
                }

            }

            $scope.verificarServicio = function (detalleCompra) {

                if (detalleCompra.servicio.id) {
                    if ($scope.cajaChica.compra.movimiento.clase != undefined) {
                        if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                            detalleCompra.descuento = 0
                            detalleCompra.ice = 0
                            detalleCompra.recargo = 0
                            detalleCompra.excento = 0
                            $scope.configuracionCompraVista.mostrar_it_retencion = true
                            $scope.configuracionCompraVista.mostrar_iue = true
                            $scope.configuracionCompraVista.mostrar_pagado = true
                            $scope.agregarDetalleCompraServicio(detalleCompra);
                        } else {
                            $scope.agregarDetalleCompraServicio(detalleCompra);
                        }
                    } else {
                        $scope.agregarDetalleCompraServicio(detalleCompra);
                    }
                    $scope.verificarCamposDetalleCompra(detalleCompra, true)
                } else {
                    $scope.mostrarMensaje("El producto no se encuentra en el catalogo")
                }


            }

            $scope.calcularExcentoGasolina = function () {
                if ($scope.cajaChica.descuentoGasolina) {
                    $scope.cajaChica.compra.descuento_general = true
                    $scope.cajaChica.compra.descuento = 0
                    $scope.cajaChica.compra.recargo = 0
                    $scope.cajaChica.compra.ice = 0
                    $scope.cajaChica.compra.excento = ($scope.cajaChica.compra.detallesCompra[0].importe * 30) / 100
                    $scope.calcularImporteGeneral()
                } else {
                    $scope.cajaChica.compra.descuento_general = false
                    $scope.cajaChica.compra.descuento = 0
                    $scope.cajaChica.compra.recargo = 0
                    $scope.cajaChica.compra.ice = 0
                    $scope.cajaChica.compra.excento = 0
                    $scope.calcularImporteGeneral()
                }
            }

            $scope.agregarDetalleCompra = function (detalleCompra) {
                if (detalleCompra.producto.nombre.id) {
                    detalleCompra.producto = detalleCompra.producto.nombre;
                }
                /*  if (detalleCompra.centroCosto.nombre.id) {
                     detalleCompra.centroCosto = detalleCompra.centroCosto.nombre;
                 } else {
                     if (detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
                         var centroCostoAlmacen = $.grep($scope.centrosCosto, function (e) { return e.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN; })[0];
                         detalleCompra.centroCosto = centroCostoAlmacen;
                     }
                 } */
                if (detalleCompra.fechaVencimientoTexto) {
                    detalleCompra.fecha_vencimiento = new Date($scope.convertirFecha(detalleCompra.fechaVencimientoTexto));
                }
                /* if ($scope.cajaChica.compra.descuento_general) {
                    detalleCompra.descuento = $scope.cajaChica.compra.descuento
                    detalleCompra.ice = $scope.cajaChica.compra.ice
                    detalleCompra.recargo = $scope.cajaChica.compra.recargo
                    detalleCompra.excento = $scope.cajaChica.compra.excento
                } */


                $scope.cajaChica.compra.detallesCompra.push(detalleCompra);
                $scope.detalleCompra = { producto: {}, servicio: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                }

                $scope.cargarCentroCosto($scope.detalleCompra)
                $scope.calcularExcentoGasolina();

            }
            $scope.agregarDetalleCompraServicio = function (detalleCompra) {

                $scope.cajaChica.compra.detallesCompra.push(detalleCompra);
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                }
                $scope.detalleCompra = { producto: {}, servicio: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
                $scope.cargarCentroCosto($scope.detalleCompra)

            }
            $scope.obtenerConfiguracionCompraVista = function () {
                blockUI.start();
                var promise = ConfiguracionCompraVistaDatos($scope.usuario.id_empresa);
                promise.then(function (configuracion) {
                    $scope.configuracionCompraVista = configuracion;
                    blockUI.stop();
                });
            }
            $scope.guardarConfiguracionCompraVista = function () {
                ConfiguracionCompraVista.update({ id_empresa: $scope.usuario.id_empresa }, $scope.configuracionCompraVista, function (res) {

                });
            }
            $scope.eliminarDetalleCompra = function (detalleCompra) {
                if ($scope.cajaChica.compra.id) {
                    detalleCompra.eliminado = true;
                } else {
                    $scope.cajaChica.compra.detallesCompra.splice($scope.cajaChica.compra.detallesCompra.indexOf(detalleCompra), 1);
                }
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                }
            }

            $scope.sumarTotalImporte = function () {
                var sumaImporte = 0;
                for (var i = 0; i < $scope.cajaChica.compra.detallesCompra.length; i++) {
                    if (!$scope.cajaChica.compra.detallesCompra[i].eliminado) {
                        sumaImporte = sumaImporte + $scope.cajaChica.compra.detallesCompra[i].importe;
                    }
                }
                $scope.cajaChica.compra.importe = Math.round((sumaImporte) * 1000) / 1000;
            }

            $scope.sumarTotal = function () {
                var sumaTotal = 0, sumaDescuentos = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
                for (var i = 0; i < $scope.cajaChica.compra.detallesCompra.length; i++) {
                    if (!$scope.cajaChica.compra.detallesCompra[i].eliminado) {
                        sumaTotal = sumaTotal + $scope.cajaChica.compra.detallesCompra[i].total;
                        sumaDescuentos = sumaDescuentos + $scope.cajaChica.compra.detallesCompra[i].descuento;
                        sumaRecargo = sumaRecargo + $scope.cajaChica.compra.detallesCompra[i].recargo;
                        sumaIce = sumaIce + $scope.cajaChica.compra.detallesCompra[i].ice;
                        sumaExcento = sumaExcento + $scope.cajaChica.compra.detallesCompra[i].excento;
                    }
                }
                if ($scope.cajaChica.compra.movimiento.clase) {
                    if (($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES)) {
                        $scope.cajaChica.compra.total = $scope.cajaChica.compra.detallesCompra.reduce((ac, va) => { return ac += !va.eliminado ? va.importe - (va.tipo_descuento ? va.importe * (va.descuento / 100) : va.descuento) + (va.tipo_recargo ? va.importe * (va.recargo / 100) : va.recargo) - va.ice - va.excento - va.it - va.iue : 0 }, 0)
                    } else {
                        $scope.cajaChica.compra.total = $scope.cajaChica.compra.detallesCompra.reduce((ac, va) => { return ac += !va.eliminado ? va.importe - (va.tipo_descuento ? va.importe * (va.descuento / 100) : va.descuento) + (va.tipo_recargo ? va.importe * (va.recargo / 100) : va.recargo) - va.ice - va.excento : 0 }, 0)
                    }
                }
                // calculo de los demas datos despues del importe =========
                $scope.cajaChica.compra.descuento = Math.round(sumaDescuentos * 100) / 100;
                $scope.cajaChica.compra.recargo = Math.round(sumaRecargo * 100) / 100;
                $scope.cajaChica.compra.ice = Math.round(sumaIce * 100) / 100;
                $scope.cajaChica.compra.excento = Math.round(sumaExcento * 100) / 100;
                $scope.cajaChica.compra.total = Math.round($scope.cajaChica.compra.total * 100) / 100;

                //$scope.saldoMontoGasto = $scope.cajaChica.compra.total;
            }

            $scope.calcularSaldo = function () {
                $scope.cajaChica.compra.saldo = $scope.cajaChica.compra.total - $scope.cajaChica.compra.a_cuenta;
            }

            $scope.calcularImporteGeneral = function () {
                var descuento, recargo;
                if ($scope.cajaChica.compra.tipo_descuento) {
                    descuento = $scope.cajaChica.compra.importe * ($scope.cajaChica.compra.descuento / 100);
                } else {
                    descuento = $scope.cajaChica.compra.descuento;
                }
                if ($scope.cajaChica.compra.tipo_recargo) {
                    recargo = $scope.cajaChica.compra.importe * ($scope.cajaChica.compra.recargo / 100);
                } else {
                    recargo = $scope.cajaChica.compra.recargo;
                }
                if ($scope.cajaChica.compra.detallesCompra.length > 0) {
                    var sumaEliminados = 0;
                    for (var i = 0; i < $scope.cajaChica.compra.detallesCompra.length; i++) {
                        if ($scope.cajaChica.compra.detallesCompra[i].eliminado) {
                            sumaEliminados = + 1;
                        }
                    }
                    if ($scope.cajaChica.compra.detallesCompra.length == sumaEliminados) {
                        $scope.cajaChica.compra.total = 0;
                    } else {
                        $scope.cajaChica.compra.total = Math.round(($scope.cajaChica.compra.importe - descuento + recargo - $scope.cajaChica.compra.ice - $scope.cajaChica.compra.excento) * 1000) / 1000;
                    }

                } else {
                    $scope.cajaChica.compra.total = 0;
                }

            }
            $scope.eliminarDetalleCompra = function (detalleCompra) {
                if ($scope.cajaChica.compra.id) {
                    detalleCompra.eliminado = true;
                } else {
                    $scope.cajaChica.compra.detallesCompra.splice($scope.cajaChica.compra.detallesCompra.indexOf(detalleCompra), 1);
                }
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                }
            }

            $scope.cambiarTipoPago = function (tipoPago) {
                var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPago.id; })[0];
                $scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
                $scope.cajaChica.compra.id_tipo_pago = tipoPago.id;
                if (!$scope.esContado) {
                    $scope.calcularSaldo();
                }

            }
            $scope.buscarProducto = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.solicitud.compra.almacen.id);
                    return promesa;
                }
            };
            $scope.establecerProducto = function (producto) {

                producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
                var centroCostos = $scope.detalleCompra.centroCosto;
                // === para colocar el costo unitario de inventario == 
                $scope.precio_inventario;
                if (producto.inventarios.length > 0) {
                    $scope.precio_inventario = producto.inventarios.pop().costo_unitario + " Bs";

                } else {
                    $scope.precio_inventario = "Sin histórico";
                }

                $scope.detalleCompra = {
                    centroCosto: centroCostos, producto: producto, precio_unitario: producto.precio_unitario,
                    cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
                };

                $scope.cerrarPopup($scope.idModalInventario);
                $scope.enfocar('cantidad');

            }
            $scope.recalcular = function () {
                $scope.calcularImporteGeneral();
                $scope.calcularImporte();
            }

            $scope.calcularIngresoImporte = function () {
                if ($scope.retencionActivo == true && $scope.cajaChica.compra.detallesCompra.length > 0) {
                    $scope.detalleCompra = $scope.cajaChica.compra.detallesCompra[0]
                    if ($scope.edicionCU == true) {
                        $scope.detalleCompra.importe = $scope.detalleCompra.costo_unitario * $scope.detalleCompra.cantidad
                    } else {
                        $scope.detalleCompra.importe = $scope.gastoRendicion.monto
                        $scope.detalleCompra.costo_unitario = $scope.detalleCompra.importe / $scope.detalleCompra.cantidad
                    }
                    $scope.detalleCompra.total = $scope.detalleCompra.importe
                    $scope.cajaChica.compra.total = $scope.detalleCompra.importe
                }

                var descuento, recargo;
                if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        $scope.detalleCompra.total = $scope.detalleCompra.importe
                        $scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + $scope.detalleCompra.total
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        //$scope.detalleCompra.total =($scope.detalleCompra.importe *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100

                    } else {
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        $scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
                        $scope.detalleCompra.importe = $scope.detalleCompra.total - $scope.detalleCompra.it - $scope.detalleCompra.iue
                    }
                    /* $scope.detalleCompra.total = $scope.detalleCompra.importe */
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
                    $scope.detalleCompra.total = $scope.detalleCompra.importe
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        $scope.detalleCompra.total = $scope.detalleCompra.importe
                        $scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + $scope.detalleCompra.total
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

                    } else {

                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
                        $scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


                    }
                } else {
                    if (!$scope.cajaChica.compra.descuento_general) {
                        if ($scope.detalleCompra.tipo_descuento) {
                            descuento = $scope.detalleCompra.importe * ($scope.detalleCompra.descuento / 100);
                        } else {
                            descuento = $scope.detalleCompra.descuento;
                        }
                        if ($scope.detalleCompra.tipo_recargo) {
                            recargo = $scope.detalleCompra.importe * ($scope.detalleCompra.recargo / 100);
                        } else {
                            recargo = $scope.detalleCompra.recargo;
                        }

                        $scope.detalleCompra.total = $scope.detalleCompra.importe - descuento + recargo - $scope.detalleCompra.ice - $scope.detalleCompra.excento;
                    } else {
                        /*    if ($scope.cajaChica.compra.tipo_descuento) {
                              descuento = $scope.detalleCompra.importe * ($scope.cajaChica.compra.descuento / 100);
                          } else {
                              descuento = $scope.cajaChica.compra.descuento;
                          }
                          if ($scope.cajaChica.compra.tipo_recargo) {
                              recargo = $scope.detalleCompra.importe * ($scope.cajaChica.compra.recargo / 100);
                          } else {
                              recargo = $scope.cajaChica.compra.recargo;
                          }
            */
                        $scope.detalleCompra.total = $scope.detalleCompra.importe /* - descuento + recargo - $scope.cajaChica.compra.ice - $scope.cajaChica.compra.excento; */
                    }
                }
                importe = ($scope.cajaChica.compra.importe) ? $scope.cajaChica.compra.importe : 0
                if ($scope.solicitud.concepto.concepto.nombre == 'GASTO') {
                    if ($scope.cajaChica.solicitud.cajasChicas.length > 0) {
                        var monto = 0
                        if ($scope.cajaChica.solicitud.cajasChicas.length == 1 && importe == 0) {
                            $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                        } else {
                            $scope.cajaChica.solicitud.cajasChicas.forEach(function (caja, index, array) {
                                if (index == 0) {
                                    monto = $scope.solicitud.monto - caja.monto
                                } else {
                                    monto = monto - caja.monto
                                }
                                if (index === (array.length - 1)) {
                                    $scope.totalRestante = monto - importe
                                }
                            })
                        }
                    } else {
                        $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                    }

                } else {
                    if ($scope.cajaChica.solicitud.cajasChicas.length > 0) {
                        var solicitudCaja = $scope.cajaChica.solicitud.cajasChicas.find(function (caja) {
                            return caja.id_padre == null
                        })

                        $scope.totalRestante = solicitudCaja.saldo - importe
                    } else {
                        $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                    }
                }
                if ($scope.retencionActivo != true) {
                    if ($scope.cajaChica.solicitud) {
                        if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                            var comp = $scope.detalleCompra.costo_unitario * $scope.detalleCompra.cantidad
                            if (comp > $scope.totalRestante) {
                                $scope.detalleCompra.importe = NaN
                                $scope.ErrorImporte = true
                            } else {
                                $scope.ErrorImporte = false
                            }
                        } else {
                            if ($scope.detalleCompra.importe > $scope.totalRestante) {
                                $scope.detalleCompra.importe = NaN
                                $scope.ErrorImporte = true
                            } else {
                                $scope.ErrorImporte = false
                            }
                        }
                    }
                }
            }
            $scope.calcularImporte2 = function (detalle) {
                if ($scope.retencionActivo == true && $scope.cajaChica.compra.detallesCompra.length > 0) {
                    if ($scope.edicionCU == true) {
                        detalle.importe = detalle.costo_unitario * detalle.cantidad
                    } else {
                        detalle.importe = $scope.gastoRendicion.monto
                        detalle.costo_unitario = detalle.importe / detalle.cantidad
                    }
                    detalle.total = detalle.importe
                    $scope.cajaChica.compra.total = detalle.importe
                }
                detalle.importe = detalle.cantidad * detalle.costo_unitario
                var descuento, recargo;
                if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        detalle.total = detalle.importe
                        detalle.importe = (detalle.total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + detalle.total
                        detalle.it = (detalle.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        detalle.iue = (detalle.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        //detalle.total =(detalle.importe *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100

                    } else {
                        detalle.it = (detalle.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        detalle.iue = (detalle.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        detalle.total = (detalle.importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
                        //detalle.importe = detalle.total - detalle.it - detalle.iue
                    }
                    /* detalle.total = detalle.importe */
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
                    detalle.total = detalle.importe
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        detalle.total = detalle.importe
                        detalle.importe = (detalle.total * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + detalle.total
                        detalle.it = (detalle.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        detalle.iue = (detalle.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

                    } else {

                        detalle.it = (detalle.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        detalle.iue = (detalle.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
                        detalle.total = (detalle.importe * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


                    }
                } else {
                    if (!$scope.cajaChica.compra.descuento_general) {
                        if (detalle.tipo_descuento) {
                            descuento = detalle.importe * (detalle.descuento / 100);
                        } else {
                            descuento = detalle.descuento;
                        }
                        if (detalle.tipo_recargo) {
                            recargo = detalle.importe * (detalle.recargo / 100);
                        } else {
                            recargo = detalle.recargo;
                        }

                        detalle.total = detalle.importe - descuento + recargo - detalle.ice - detalle.excento;
                    } else {
                        /*    if ($scope.cajaChica.compra.tipo_descuento) {
                              descuento = $scope.detalleCompra.importe * ($scope.cajaChica.compra.descuento / 100);
                          } else {
                              descuento = $scope.cajaChica.compra.descuento;
                          }
                          if ($scope.cajaChica.compra.tipo_recargo) {
                              recargo = $scope.detalleCompra.importe * ($scope.cajaChica.compra.recargo / 100);
                          } else {
                              recargo = $scope.cajaChica.compra.recargo;
                          }
            */
                        detalle.total = detalle.importe /* - descuento + recargo - $scope.cajaChica.compra.ice - $scope.cajaChica.compra.excento; */
                    }
                }
            }
            $scope.calcularImporte = function () {
                if ($scope.retencionActivo == true && $scope.cajaChica.compra.detallesCompra.length > 0) {
                    $scope.detalleCompra = $scope.cajaChica.compra.detallesCompra[0]
                    if ($scope.edicionCU == true) {
                        $scope.detalleCompra.importe = $scope.detalleCompra.costo_unitario * $scope.detalleCompra.cantidad
                    } else {
                        $scope.detalleCompra.importe = $scope.gastoRendicion.monto
                        $scope.detalleCompra.costo_unitario = round(($scope.detalleCompra.importe / $scope.detalleCompra.cantidad), 3);
                    }
                    $scope.detalleCompra.total = $scope.detalleCompra.importe
                    $scope.cajaChica.compra.total = $scope.detalleCompra.importe
                }
                $scope.detalleCompra.importe = $scope.detalleCompra.cantidad * $scope.detalleCompra.costo_unitario
                var descuento, recargo;
                if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        $scope.detalleCompra.total = $scope.detalleCompra.importe
                        $scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + $scope.detalleCompra.total
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        //$scope.detalleCompra.total =($scope.detalleCompra.importe *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100

                    } else {
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
                        $scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
                        //$scope.detalleCompra.importe = $scope.detalleCompra.total - $scope.detalleCompra.it - $scope.detalleCompra.iue
                    }
                    /* $scope.detalleCompra.total = $scope.detalleCompra.importe */
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
                    $scope.detalleCompra.total = $scope.detalleCompra.importe
                } else if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                    if ($scope.cajaChica.compra.tipo_retencion) {

                        $scope.detalleCompra.total = $scope.detalleCompra.importe
                        $scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + $scope.detalleCompra.total
                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

                    } else {

                        $scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
                        $scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
                        $scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


                    }
                } else {
                    if (!$scope.cajaChica.compra.descuento_general) {
                        if ($scope.detalleCompra.tipo_descuento) {
                            descuento = $scope.detalleCompra.importe * ($scope.detalleCompra.descuento / 100);
                        } else {
                            descuento = $scope.detalleCompra.descuento;
                        }
                        if ($scope.detalleCompra.tipo_recargo) {
                            recargo = $scope.detalleCompra.importe * ($scope.detalleCompra.recargo / 100);
                        } else {
                            recargo = $scope.detalleCompra.recargo;
                        }

                        $scope.detalleCompra.total = $scope.detalleCompra.importe - descuento + recargo - $scope.detalleCompra.ice - $scope.detalleCompra.excento;
                    } else {
                        /*    if ($scope.cajaChica.compra.tipo_descuento) {
                              descuento = $scope.detalleCompra.importe * ($scope.cajaChica.compra.descuento / 100);
                          } else {
                              descuento = $scope.cajaChica.compra.descuento;
                          }
                          if ($scope.cajaChica.compra.tipo_recargo) {
                              recargo = $scope.detalleCompra.importe * ($scope.cajaChica.compra.recargo / 100);
                          } else {
                              recargo = $scope.cajaChica.compra.recargo;
                          }
            */
                        $scope.detalleCompra.total = $scope.detalleCompra.importe /* - descuento + recargo - $scope.cajaChica.compra.ice - $scope.cajaChica.compra.excento; */
                    }
                }
                importe = ($scope.cajaChica.compra.importe) ? $scope.cajaChica.compra.importe : 0
                if ($scope.solicitud.concepto.concepto.nombre == 'GASTO') {
                    if ($scope.cajaChica.solicitud.cajasChicas.length > 0) {
                        var monto = 0
                        if ($scope.cajaChica.solicitud.cajasChicas.length == 1 && importe == 0) {
                            $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                        } else {
                            $scope.cajaChica.solicitud.cajasChicas.forEach(function (caja, index, array) {
                                if (index == 0) {
                                    monto = $scope.solicitud.monto - caja.monto
                                } else {
                                    monto = monto - caja.monto
                                }
                                if (index === (array.length - 1)) {
                                    $scope.totalRestante = monto - importe
                                }
                            })
                        }

                    } else {
                        $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                    }

                } else {
                    if ($scope.cajaChica.solicitud.cajasChicas.length > 0) {
                        var solicitudCaja = $scope.cajaChica.solicitud.cajasChicas.find(function (caja) {
                            return caja.id_padre == null
                        })

                        $scope.totalRestante = solicitudCaja.saldo - importe
                    } else {
                        $scope.totalRestante = $scope.cajaChica.solicitud.monto - importe
                    }
                }
                if ($scope.retencionActivo != true) {
                    if ($scope.cajaChica.solicitud) {
                        if ($scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.cajaChica.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
                            var comp = $scope.detalleCompra.costo_unitario * $scope.detalleCompra.cantidad
                            if (comp > $scope.totalRestante) {
                                $scope.detalleCompra.importe = NaN
                                $scope.ErrorImporte = true
                            } else {
                                $scope.ErrorImporte = false
                            }
                        } else {
                            if ($scope.detalleCompra.importe > $scope.totalRestante) {
                                $scope.detalleCompra.importe = NaN
                                $scope.ErrorImporte = true
                            } else {
                                $scope.ErrorImporte = false
                            }
                        }
                    }
                }
            }
            $scope.calcularImporteDetalleEdicion = function (detalleCompra) {
                detalleCompra.importe = Math.round((detalleCompra.cantidad * detalleCompra.costo_unitario) * 1000) / 1000;
                var descuento, recargo;
                if (detalleCompra.tipo_descuento) {
                    descuento = detalleCompra.importe * (detalleCompra.descuento / 100);
                } else {
                    descuento = detalleCompra.descuento;
                }
                if (detalleCompra.tipo_recargo) {
                    recargo = detalleCompra.importe * (detalleCompra.recargo / 100);
                } else {
                    recargo = detalleCompra.recargo;
                }
                detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento;
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                } else {
                    $scope.cajaChica.compra.a_cuenta = null
                    $scope.cajaChica.compra.saldo = null
                    $scope.cajaChica.compra.dias_credito = null
                }
            }
            $scope.calcularImporteDetalleEdicionCU = function (detalleCompra, tipo) {
                if ($scope.retencionActivo != true) {
                    detalleCompra.importe = Math.round((detalleCompra.cantidad * detalleCompra.costo_unitario) * 1000) / 1000;

                } else {
                    if ($scope.cajaChica.compra.movimiento.clase == undefined) {
                        $scope.mostrarMensaje("Seleccionar movimiento antes de realizar modificacion en el detalle")
                        return
                    }
                    detalleCompra.importe = detalleCompra.costo_unitario * detalleCompra.cantidad
                    $scope.detalleCompra = detalleCompra

                }
                if (tipo == 'CU') {
                    $scope.edicionCU = true
                } else {
                    $scope.edicionCU = false
                }
                var descuento, recargo;
                if (detalleCompra.tipo_descuento) {
                    descuento = detalleCompra.importe * (detalleCompra.descuento / 100);
                } else {
                    descuento = detalleCompra.descuento;
                }
                if (detalleCompra.tipo_recargo) {
                    recargo = detalleCompra.importe * (detalleCompra.recargo / 100);
                } else {
                    recargo = detalleCompra.recargo;
                }
                detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento;
                $scope.sumarTotal();
                $scope.sumarTotalImporte();
                if ($scope.cajaChica.compra.descuento_general) {
                    $scope.calcularImporteGeneral();
                }
                if ($scope.cajaChica.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
                    $scope.calcularSaldo();
                }
                if ($scope.retencionActivo == true) {
                    $scope.calcularImporte()
                }
            }
            $scope.sumarMonto = function (compras) {
                var suma = 0;
                for (var i = 0; i < compras.length; i++) {
                    suma = suma + compras[i].total;

                }
                return Math.round(suma * 100) / 100;
            }

            $scope.obtenerCentrosDeCosto = function () {
                blockUI.start();
                var promesa = ClasesTipo("CCO");
                promesa.then(function (entidad) {
                    $scope.centrosCosto = entidad.clases;
                    if ($scope.usuario.empresa.usar_funciones_erp) {
                        var ids = []
                        $scope.centrosCosto.forEach(function (dato, index, array) {
                            if (dato.nombre_corto == "ALM") {

                            } else if (dato.nombre_corto == "VR") { } else {
                                ids.push(index)
                            }

                        })
                        ids.reverse().forEach(function (dato, index, array) {
                            $scope.centrosCosto.splice(dato, 1)
                        })
                    }
                    blockUI.stop();
                });
            }

            $scope.obtenerconfiuracionCuentas = async function () {
                /*   var promesa = ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
                  var a = false; */
                $scope.plantilla = {
                    retencionServicios: { it: {}, iue: {}, servicio: {} },
                    retencionBienesGasto: { it: {}, iue: {}, gasto: {} },
                    retencionBienes: { it: {}, iue: {}, almacen: {} },
                    egreso: { ivacf: {}, cajaBanco: {} },
                    ingreso: { ivadf: {}, it: {}, itPorPagar: {}, cajaBanco: {} },
                    facturasAnuladasDDJJ: { ivadf: {}, ingreso: {}, cajaBanco: {} }
                }
                var entidad = await ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
                for (const lista of entidad.lista) {
                    if ($scope.diccionario.IVA_DF == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                        $scope.plantilla.ingreso.ivadf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                        $scope.plantilla.ingreso.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IT_POR_PAGAR == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                        $scope.plantilla.ingreso.itPorPagar = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "INGRESOS") {
                        $scope.plantilla.ingreso.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IVA_CF == lista.nombre && $scope.diccionario.MOV_EGR == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "EGRESOS") {
                        $scope.plantilla.egreso.ivacf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_EGR == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "EGRESOS") {
                        $scope.plantilla.egreso.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                        $scope.plantilla.retencionBienes.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                        $scope.plantilla.retencionBienes.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CUENTA_ALMACEN_RETENCION_BIEN == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBA") {
                        $scope.plantilla.retencionBienes.almacen = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                        $scope.plantilla.retencionBienesGasto.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                        $scope.plantilla.retencionBienesGasto.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CUENTA_GASTO_RETENCION_BIEN == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RBG") {
                        $scope.plantilla.retencionBienesGasto.gasto = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IT == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                        $scope.plantilla.retencionServicios.it = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IUE == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                        $scope.plantilla.retencionServicios.iue = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CUENTA_RETENCION_SERVICIO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "RS") {
                        $scope.plantilla.retencionServicios.servicio = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.INGRESO_REVERTIDO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                        $scope.plantilla.facturasAnuladasDDJJ.ingreso = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.IVA_DF_REVERTIDO == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                        $scope.plantilla.facturasAnuladasDDJJ.ivadf = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                    if ($scope.diccionario.CAJA_BANCOS == lista.nombre && $scope.diccionario.MOV_ING == lista.tipo.nombre_corto && lista.configuracion.nombre_corto == "AFDDJJ") {
                        $scope.plantilla.facturasAnuladasDDJJ.cajaBanco = { porcentaje: parseFloat(lista.valor), cuenta: lista.cuenta }
                    }
                }
                $scope.$evalAsync()
            }

            $scope.obtenerServicios = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("SERVICIOS_COMPRA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.datosServicios = entidad
                    blockUI.stop();
                });
            }

            $scope.abrirDialogServicios = function (tipo) {
                $scope.tipo_edicion = tipo;
                $scope.clase = { habilitado: true };
                $scope.abrirPopup($scope.idModalServicios);
            }

            $scope.cerrarDialogServicios = function () {
                $scope.cerrarPopup($scope.idModalServicios);
            }
            $scope.agregarConceptoEdicion = function (clase) {
                if (clase.nombre && clase.nombre_corto) {
                    if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
                        $scope.tipo_edicion.clases.push(clase);
                    }
                    $scope.clase = { habilitado: true }
                }
            }
            $scope.modificarConceptoEdicion = function (clase) {
                $scope.clase = clase;
            }

            $scope.removerConceptoEdicion = function (clase) {
                clase.eliminado = true;
            }
            $scope.guardarConceptoEdicion = function (tipo) {
                blockUI.start();
                Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
                    var promesa = ClasesTipo(tipo.nombre_corto);
                    promesa.then(function (entidad) {
                        blockUI.stop();
                        $scope.obtenerServicios()
                        $scope.cerrarDialogServicios();
                        $scope.mostrarMensaje('Guardado Exitosamente!');
                    });
                });
            }

            $scope.establecerServicioSeleccionado = function (clase) {
                $scope.establecerServicio(clase)
                $scope.cerrarDialogServicios()
            }
            $scope.establecerServicio = function (producto) {
                producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
                var centroCostos = $scope.detalleCompra.centroCosto;
                $scope.detalleCompra = {
                    centroCosto: null, servicio: producto, precio_unitario: producto.precio_unitario,
                    cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false
                };
                $scope.cerrarPopup($scope.idModalInventario);
                $scope.enfocar('cantidad');

            }
            $scope.verificarCamposDetalleCompra = function (detalle, servicio) {
                if (servicio) {
                    $scope.verificacionDatos = false
                    $scope.verificacionDatos = (detalle.servicio.id) ? false : true

                    $scope.verificacionDatos = (detalle.cantidad > 0) ? false : true

                    $scope.verificacionDatos = (detalle.costo_unitario > 0) ? false : true


                } else {
                    $scope.verificacionDatos = false
                    $scope.verificacionDatos = (detalle.producto.nombre) ? false : true

                    $scope.verificacionDatos = (detalle.cantidad > 0) ? false : true

                    $scope.verificacionDatos = (detalle.costo_unitario > 0) ? false : true


                }
            }

            $scope.listaSolicitudesCajaChicaPDF = async function (Finicio, Ffin) {
                blockUI.start()
                var empresa = $scope.usuario.id_empresa;
                //var id_usuario_no_autorizado= ($scope.usuario.encargado_caja_chica) ? ($scope.usuario.encargado_rendicion_caja_chica) : "" ? $scope.usuario.id : "";
                var id_sucursal = $scope.sucursalPrincipal.id;
                var id_usuario_no_autorizado = ($scope.usuario.encargado_caja_chica) ? "0" : ($scope.usuario.encargado_rendicion_caja_chica) ? "0" : $scope.usuario.id;
                var inicio = Finicio ? Finicio : "0";
                var fin = Ffin ? Ffin : "0";

                var concepto = "0";
                var estado = "0";
                var movimiento = "0";
                var solicitante = "0";
                var usuario = "0";
                var promesa = SolicitudesCajaChicaPDF(id_sucursal, empresa, inicio, fin)
                //var promesa = SolicitudesCajaChicaPDF(id_sucursal, empresa, id_usuario_no_autorizado, inicio, fin)
                var datos = await promesa.then(function (datos) {
                    blockUI.stop()
                    //$scope.totalRlCaja = datos.totalRlCaja
                    //$scope.totalCaja = datos.total
                    // $scope.paginator.setPages(datos.paginas);
                    return datos;
                })
                $scope.ultimoSaldo = 0;
                datos.cierreCaja.saldo_final = datos.cierreCaja.saldo_inicial
                datos.cierreCaja.detalleCierreCaja.map(function (detalle, idx, arr) {
                    if (detalle.concepto.concepto.nombre_corto == "INGRESO") {
                        datos.cierreCaja.saldo_final += detalle.monto
                    } else {
                        datos.cierreCaja.saldo_final -= detalle.monto
                    }
                    if (idx == (arr.length - 1)) {
                        $scope.ultimoSaldo = datos.cierreCaja.saldo_final;
                    }
                })


                return datos.cierreCaja
            }


            $scope.cierresCajaChicaImpresion = async function () {
                blockUI.start()
                var empresa = $scope.usuario.id_empresa;
                var id_sucursal = $scope.sucursalPrincipal.id;

                var promesa = CierreCajaCImpresion(id_sucursal, empresa)
                var datos = await promesa.then(function (datos) {
                    blockUI.stop()
                    //$scope.paginator.setPages(datos.paginas);
                    return datos;
                })
                $scope.ultimoSaldo = 0;
                datos.cierreCaja.forEach(function (dato, index, array) {
                    if (index != 0) {
                        dato.saldo_inicial = $scope.ultimoSaldo
                    }
                    dato.saldo_final = dato.saldo_inicial
                    dato.detalleCierreCaja.forEach(function (detalle, idx, arr) {
                        if (detalle.concepto.concepto.nombre_corto == "INGRESO") {
                            dato.saldo_final += detalle.monto
                        } else {
                            dato.saldo_final -= detalle.monto
                        }
                        if (idx == (arr.length - 1)) {
                            $scope.ultimoSaldo = dato.saldo_final;
                        }
                    })

                    if (index == (array.length - 1)) {
                        datos.cierreCaja
                    }

                })
                return datos.cierreCaja
            }

            $scope.obtenerTodoListaIngresos = async function () {
                var empresa = $scope.usuario.id_empresa;
                var id_sucursal = $scope.sucursalPrincipal.id;
                blockUI.start()
                var promesa = IngresosCajaPDF(empresa, id_sucursal)
                var datos = await promesa.then(function (datos) {
                    blockUI.stop()
                    return $scope.IngresosTodoCajaChica = datos.ingresos
                })
                return datos
            }

            $scope.calcularCierre = function (listaDatos) {
                var valores = {
                    fecha: "", codigo: "", persona: "", concepto: "",
                    proveedor: "", cargo: "", ingreso: "", egreso: "", movimiento: "", iva: "",
                    total: ""
                };

                listaDatos.sort(function (a, b) {
                    var fecha1 = new Date(a.inicio); fecha1.setHours(0, 0, 0, 0);
                    var fecha2 = new Date(b.inicio); fecha2.setHours(0, 0, 0, 0);
                    return fecha1 - fecha2;
                })
                var columns = new Array();
                var saldo_inicial = listaDatos[0].saldo_inicial;
                for (var i = 0; i < listaDatos.length; i++) {
                    var cierres = listaDatos[i];

                    for (var j = 0; j < cierres.detalleCierreCaja.length; j++) {
                        var detalle = cierres.detalleCierreCaja[j];
                        //fecha
                        var fecha = detalle.fecha;
                        valores.fecha = fecha;
                        //codigo
                        var codigo = detalle.cuenta.codigo;
                        valores.codigo = codigo;
                        //persona
                        if (detalle.solicitud) {
                            var persona = detalle.solicitud.solicitante.persona.nombre_completo;
                            valores.persona = persona;
                        } else {
                            valores.persona = "";
                        }

                        //concepto
                        var concepto = detalle.concepto.nombre;
                        valores.concepto = concepto;
                        //proveedor
                        if (detalle.compra) {
                            var proveedor = detalle.compra.proveedor.razon_social;
                            valores.proveedor = proveedor;
                        } else {
                            valores.proveedor = "";
                        }

                        //cargo
                        if (detalle.solicitud) {
                            var cargo = detalle.solicitud.solicitante.cargo;
                            valores.cargo = cargo;
                        } else {
                            valores.cargo = "";
                        }

                        //ingreso y egreso
                        var egreso = 0;
                        var ingreso = 0;
                        if (detalle.concepto.concepto.nombre != 'INGRESO') {
                            egreso = detalle.monto;
                            valores.egreso = egreso;
                            valores.ingreso = ingreso;
                        } else {
                            ingreso = detalle.monto;
                            valores.ingreso = ingreso;
                            valores.egreso = egreso;
                        }
                        //iva
                        if (detalle.compra) {
                            if (detalle.compra.movimiento) {
                                if (detalle.compra.movimiento.clase.nombre_corto === 'ID' ||
                                    detalle.compra.movimiento.clase.nombre_completo === 'IMPORTACIÓN') {
                                    var movimiento = detalle.compra.movimiento.clase.nombre;
                                    valores.movimiento = movimiento;
                                    var iva = detalle.compra.total * 0.13;
                                    valores.iva = iva;
                                } else {
                                    var movimiento = detalle.compra.movimiento.clase.nombre;
                                    valores.movimiento = movimiento;
                                    var iva = 0 * 0.13;
                                    valores.iva = iva;
                                }
                            } else {
                                var movimiento = "";
                                valores.movimiento = movimiento;
                                var iva = 0 * 0.13;
                                valores.iva = iva;
                            }
                        } else {
                            var movimiento = "";
                            valores.movimiento = movimiento;
                            var iva = 0 * 0.13;
                            valores.iva = iva;
                        }


                        saldo_inicial = saldo_inicial - egreso + ingreso;
                        valores.total = saldo_inicial;

                        columns.push((Object.assign({}, valores)));
                    }
                }
                return columns;
            }

            $scope.imprimirControlGastoPDF = async function (filtro) {
                var inicio = filtro.inicio;
                var fin = filtro.fin;
                $scope.cierresCajaChicaImprecion = await $scope.cierresCajaChicaImpresion();

                var solicitudesCierres = new Array();
                if (filtro.inicio != undefined && filtro.fin) {

                    var diaIni = filtro.inicio.split('/')[0];
                    var mesIni = filtro.inicio.split('/')[1];
                    var añoIni = filtro.inicio.split('/')[2];
                    var filtroInicio = new Date(añoIni + "/" + mesIni + "/" + diaIni); filtroInicio.setHours(0, 0, 0, 0);

                    var diaFin = filtro.fin.split('/')[0];
                    var mesFin = filtro.fin.split('/')[1];
                    var añoFin = filtro.fin.split('/')[2];
                    var filtroFin = new Date(añoFin + "/" + mesFin + "/" + diaFin); filtroFin.setHours(0, 0, 0, 0);

                    for (let i = $scope.cierresCajaChicaImprecion.length - 1; i >= 0; i--) {
                        const element = $scope.cierresCajaChicaImprecion[i];
                        var fechaInicioCierre = new Date(element.inicio); fechaInicioCierre.setHours(0, 0, 0, 0);
                        var fechaFinCierre = new Date(element.fin); fechaFinCierre.setHours(0, 0, 0, 0);

                        if ((filtroInicio >= fechaInicioCierre && filtroInicio <= fechaFinCierre) ||
                            (filtroInicio < fechaInicioCierre && filtroFin > fechaFinCierre) ||
                            (filtroFin >= fechaInicioCierre && filtroFin <= fechaFinCierre)) {

                            solicitudesCierres.push(element)
                        }
                    }

                    if (solicitudesCierres.length == 0) {
                        $scope.mostrarMensaje("No existe una fecha de cierre para el rango elegido.!");
                        return null;
                    }

                    var datos = $scope.calcularCierre(solicitudesCierres)

                    var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                    var stream = doc.pipe(blobStream());
                    var solicitudImpresion = new Array();
                    for (let i = 0; i < datos.length; i++) {
                        const element = datos[i];
                        var fecha = new Date(element.fecha); fecha.setHours(0, 0, 0, 0);

                        if (fecha >= filtroInicio && fecha <= filtroFin) {
                            solicitudImpresion.push(element)
                        }
                    }
                    var total = 0;
                    if (solicitudImpresion[0].egreso != 0) {
                        total = solicitudImpresion[0].total + solicitudImpresion[0].egreso
                    } else {
                        total = solicitudImpresion[0].total - solicitudImpresion[0].ingreso
                    }

                    var y = 150, itemsPorPagina = 25, items = 0, pagina = 1; totalPaginas = Math.ceil(solicitudImpresion.length / itemsPorPagina);
                    $scope.dibujarCabeceraPDFControlGastos(doc, solicitudImpresion, pagina, filtro, formatNumber(total), totalPaginas);
                    var subTotalGasto = 0;
                    var subTotalIngreso = 0;
                    var subTotalIva = 0;
                    var subTotalTotal = 0;

                    var totalIngreso = 0;
                    var totalGasto = 0;
                    var totalIva = 0;
                    var totalTotal = 0;

                    for (var i = 0; i < solicitudImpresion.length && items <= itemsPorPagina; i++) {

                        doc.font('Helvetica', 6);
                        //FECHA
                        doc.text($scope.fechaATexto(solicitudImpresion[i].fecha), 32, y);
                        //CUENTA
                        doc.text(solicitudImpresion[i].codigo, 80, y);
                        //PERSONA              
                        doc.text(solicitudImpresion[i].persona, 120, y, { width: 80 });
                        //CONCEPTO
                        doc.text(solicitudImpresion[i].concepto, 205, y, { width: 80 });
                        //PROVEEDOR
                        doc.text(solicitudImpresion[i].proveedor, 283, y, { width: 80 });
                        //area
                        doc.font('Helvetica', 6)
                        doc.text(solicitudImpresion[i].cargo, 365, y, { width: 80 });
                        //INGRESOS Y EGRESO
                        doc.font('Helvetica', 6)
                        var egreso = 0;
                        var ingreso = 0;
                        if (solicitudImpresion[i].egreso != "" || solicitudImpresion[i].egreso != 0) {
                            egreso = solicitudImpresion[i].egreso;
                            //480
                            doc.text(formatNumber(egreso), 427, y, { align: "right", width: 80 });
                            subTotalGasto = subTotalGasto + egreso;
                            totalGasto = totalGasto + egreso;

                        } else if (solicitudImpresion[i].ingreso != "") {
                            ingreso = solicitudImpresion[i].ingreso;
                            //447
                            doc.text(formatNumber(ingreso), 395, y, { align: "right", width: 80 });
                            subTotalIngreso = subTotalIngreso + ingreso;
                            totalIngreso = totalIngreso + ingreso;
                        }
                        //IVA
                        var iva = solicitudImpresion[i].iva;
                        //518
                        doc.text(formatNumber(iva), 463, y, { align: "right", width: 80 });
                        subTotalIva = subTotalIva + iva;
                        totalIva = totalIva + iva;

                        //TOTAL
                        //550
                        doc.text(formatNumber(solicitudImpresion[i].total), 508, y, { align: "right", width: 80 });
                        subTotalTotal = subTotalTotal + solicitudImpresion[i].total
                        totalTotal = totalTotal + solicitudImpresion[i].total;


                        y = y + 23;
                        items++;

                        if (items == itemsPorPagina) {
                            doc.font('Helvetica-Bold', 6)
                            doc.text("Sub-Total: ", 400, y + 3)
                            doc.text(subTotalIngreso.toFixed(2), 455, y + 3);
                            doc.text(subTotalGasto.toFixed(2), 485, y + 3);
                            doc.text(subTotalIva.toFixed(2), 527, y + 3);
                            doc.text(subTotalTotal.toFixed(2), 560, y + 3);

                            subTotalGasto = 0;
                            subTotalIngreso = 0;
                            subTotalIva = 0;
                            subTotalTotal = 0;

                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 150;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPDFControlGastos(doc, solicitudImpresion, pagina, filtro, formatNumber(total), totalPaginas);
                        }


                    }

                    doc.font('Helvetica-Bold', 6)
                    doc.text("Sub-Total: ", 400, y + 3)
                    doc.text(subTotalIngreso.toFixed(2), 455, y + 3);
                    doc.text(subTotalGasto.toFixed(2), 485, y + 3);
                    doc.text(subTotalIva.toFixed(2), 527, y + 3);
                    doc.text(subTotalTotal.toFixed(2), 560, y + 3);

                    doc.text("Total: ", 410, y + 12)
                    doc.text(totalIngreso.toFixed(2), 455, y + 12);
                    doc.text(totalGasto.toFixed(2), 485, y + 12);
                    doc.text(totalIva.toFixed(2), 527, y + 12);
                    doc.text(totalTotal.toFixed(2), 560, y + 12);

                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                } else {
                    $scope.mostrarMensaje("Ingrese las fechas")
                }
            }

            $scope.dibujarCabeceraPDFControlGastos = function (doc, datos, pagina, fechas, saldoInicio, totalPaginas) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 12);
                doc.text("CONTROL DE GASTOS DE CAJA CHICA", 0, 90, { align: 'center' });
                doc.font('Helvetica-Bold', 10);
                doc.text("En el periodo de " + fechas.inicio + " hasta " + fechas.fin, 0, 105, { align: 'center' })
                doc.font('Helvetica-Bold', 8);

                doc.text(empresa.razon_social + "\n " + empresa.direccion + "\n " + empresa.departamento.nombre, 50, 50, { columns: 2, width: 200, align: 'center' });
                doc.rect(30, 120, 45, 15).stroke();
                doc.text("Fecha", 35, 125);
                doc.rect(75, 120, 43, 15).stroke();
                doc.text("Cuenta", 80, 125);
                doc.rect(118, 120, 80, 15).stroke();
                doc.text("Persona", 135, 125);
                doc.rect(198, 120, 80, 15).stroke();
                doc.text("Concepto", 220, 125);

                doc.font('Helvetica-Bold', 8);
                doc.rect(278, 120, 80, 15).stroke();
                doc.text("Proveedor", 295, 125);
                doc.rect(358, 120, 80, 15).stroke();
                doc.text("Área/Sección", 375, 125);
                doc.rect(438, 120, 35, 15).stroke();
                doc.text("Ingreso", 442, 125);
                doc.rect(473, 120, 35, 15).stroke();
                doc.text("Gasto", 477, 125);
                doc.rect(508, 120, 35, 15).stroke();
                doc.text("IVA CF", 513, 125);
                doc.rect(543, 120, 50, 15).stroke();
                doc.text("Saldo", 555, 125);

                if (pagina === 1) {
                    doc.font('Helvetica-Bold', 7);
                    doc.text("Saldo Inicial", 220, 140);
                    doc.text(saldoInicio, 550, 140);
                }
                doc.font('Helvetica', 8);
                doc.text("Página: " + pagina, 550, 740);

                doc.font('Helvetica-Bold', 8);
                var fechaActual = new Date();
                doc.text("Usuario: " + $scope.usuario.nombre_usuario + " Fecha: " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " - " + fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds(), 410, 760);

            }

            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.imprimirFiltroCajaCartaOficio = function (filtro) {

                blockUI.start()
                var inicio = filtro.inicio ? new Date($scope.convertirFecha(filtro.inicio)) : "0";
                var fin = filtro.fin ? new Date($scope.convertirFecha(filtro.fin)) : "0";
                var empresa = $scope.usuario.id_empresa;
                var id_sucursal = $scope.sucursalPrincipal.id;
                var id_usuario_no_autorizado = ($scope.usuario.encargado_caja_chica) ? "0" : ($scope.usuario.encargado_rendicion_caja_chica) ? "0" : $scope.usuario.id;
                var concepto = (filtro.concepto) ? filtro.concepto : "0";
                var estado = (filtro.estado) ? filtro.estado : "0";
                var movimiento = (filtro.movimiento) ? filtro.movimiento : "0";
                var solicitante = (filtro.solicitante) ? filtro.solicitante : "0";
                var usuario = (filtro.usuario) ? filtro.usuario : "0";
                var promesa = SolicitudesCajaChicaPDF(id_sucursal, empresa, id_usuario_no_autorizado, inicio, fin, concepto, estado, movimiento, solicitante, usuario)
                promesa.then(function (datos) {
                    blockUI.stop()

                    var solicitudImpresion = datos.solicitudes


                    var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                    var stream = doc.pipe(blobStream());
                    // draw some text

                    var y = 120, itemsPorPagina = 20, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.solicitudesCajaChica.length / itemsPorPagina);;
                    $scope.dibujarCabeceraPDFFiltroCajaChica(doc, solicitudImpresion, pagina, filtro, totalPaginas);

                    var index = 0;
                    for (var i = 0; i < solicitudImpresion.length && items <= itemsPorPagina; i++) {
                        var solicitudes = solicitudImpresion[i];
                        index = index + 1;
                        doc.font('Helvetica', 6);
                        doc.text(index, 30, y);
                        var fecha = $scope.fechaATexto(solicitudes.fecha);
                        doc.text(fecha, 49, y);
                        if (solicitudes.solicitante) {
                            doc.text(capitalize(solicitudes.solicitante.persona.nombre_completo.toLowerCase()), 84, y, { width: 80 });
                        }
                        if (solicitudes.autorizador != null) {
                            doc.text(capitalize(solicitudes.autorizador.persona.nombre_completo.toLowerCase()), 165, y, { width: 70 });
                        }
                        if (solicitudes.verificador != null) {
                            doc.text(capitalize(solicitudes.verificador.persona.nombre_completo.toLowerCase()), 234, y, { width: 80 });
                        }
                        doc.font('Helvetica', 7);
                        doc.text(capitalize(solicitudes.concepto.concepto.nombre.toLowerCase()), 300, y, { width: 50 });
                        doc.text(capitalize(solicitudes.concepto.nombre.toLowerCase()), 348, y, { width: 50 });

                        if (solicitudes.detalle) {
                            if (solicitudes.detalle.length > 132 && solicitudes.detalle.length < 174) {
                                doc.text(capitalize(solicitudes.detalle.toLowerCase()), 397, y, { width: 115 });
                                y = y + 20;
                            } else if (solicitudes.detalle.length > 174) {
                                doc.text(capitalize(solicitudes.detalle.toLowerCase()), 397, y, { width: 115 });
                                y = y + 40;
                            } else if (solicitudes.detalle.length < 66) {
                                doc.text(capitalize(solicitudes.detalle.toLowerCase()), 397, y, { width: 115 });
                                y = y - 5;
                            } else {
                                doc.text(capitalize(solicitudes.detalle.toLowerCase()), 397, y, { width: 115 });
                            }
                        }

                        doc.text(capitalize(solicitudes.estado.nombre.toLowerCase()), 515, y + 5);
                        doc.text(round(solicitudes.monto, 2), 580, y + 5)

                        y = y + 30;
                        items++;

                        if (items == itemsPorPagina) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 120;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPDFFiltroCajaChica(doc, solicitudImpresion, pagina, filtro, totalPaginas);
                        }
                    }
                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                })
            }

            $scope.dibujarCabeceraPDFFiltroCajaChica = function (doc, solicitudesCajaChica, pagina, filtro, totalPaginas) {
                doc.font("Helvetica-Bold", 12);
                doc.text("REPORTE CAJA CHICA", 0, 30, { align: 'center' });
                doc.font("Helvetica-Bold", 10);
                doc.text("Del " + filtro.inicio + " al " + filtro.fin, 0, 45, { align: 'center' });
                doc.font("Helvetica-Bold", 8);
                if (filtro.solicitante != "") {
                    doc.text("Solicitante: " + filtro.solicitante, 28, 55);
                }
                if (filtro.usuario != "") {
                    doc.text("Usuario: " + filtro.usuario, 28, 65);
                }
                if (filtro.concepto != "") {
                    for (let i = 0; i < $scope.ConceptosMovimiento.length; i++) {
                        const element = $scope.ConceptosMovimiento[i];
                        if (element.id == filtro.concepto) {
                            doc.text("Concepto: " + element.nombre, 28, 65);
                        }
                    }
                }
                /* if(filtro.estado != ""){
                    for (let i = 0; i < $scope.tiposEstados.length; i++) {
                        const element = $scope.tiposEstados[i];
                        if (element.id == filtro.estado) {
                            doc.text("Estado: "+element.nombre, 28,75 );
                        }
                    }
                } */
                if (filtro.movimiento != "") {
                    for (let i = 0; i < $scope.tiposMovimientos.clases.length; i++) {
                        const element = $scope.tiposMovimientos.clases[i];
                        if (filtro.movimiento == element.id) {
                            doc.text("Movimiento: " + element.nombre, 28, 85);
                        }
                    }
                }


                doc.rect(28, 97, 15, 15).stroke();
                doc.text("N°", 29, 100);
                doc.rect(43, 97, 35, 15).stroke();
                doc.text("Fecha", 50, 100);
                doc.rect(78, 97, 80, 15).stroke();
                doc.text("Beneficiario", 95, 100);
                doc.rect(158, 97, 70, 15).stroke();
                doc.text("Autorizador", 170, 100);
                doc.rect(228, 97, 70, 15).stroke();
                doc.text("Verificador", 238, 100);
                doc.rect(298, 97, 46, 15).stroke();
                doc.text("Movimiento", 299, 100);
                doc.rect(344, 97, 50, 15).stroke();
                doc.text("Concepto", 348, 100);
                doc.rect(394, 97, 114, 15).stroke();
                doc.text("Detalle", 420, 100);
                doc.rect(508, 97, 60, 15).stroke();
                doc.text("Estado", 520, 100);
                doc.rect(568, 97, 40, 15).stroke();
                doc.text("Monto", 572, 100);

                doc.font("Helvetica", 6);
                doc.text("Pagina " + pagina + " de " + totalPaginas, 50, 760);
                var usuario = $scope.usuario;
                var fechaActual = $scope.fechaATexto(new Date());
                doc.text("Usuario: " + usuario.persona.nombre_completo + "  Fecha: " + fechaActual, 420, 760)
            }

            $scope.imprimirFiltroExcelCajaCartaOficio = function (filtro) {

                blockUI.start()
                var inicio = filtro.inicio ? new Date($scope.convertirFecha(filtro.inicio)) : "0";
                var fin = filtro.fin ? new Date($scope.convertirFecha(filtro.fin)) : "0";
                var empresa = $scope.usuario.id_empresa;
                var id_sucursal = $scope.sucursalPrincipal.id;
                var id_usuario_no_autorizado = ($scope.usuario.encargado_caja_chica) ? "0" : ($scope.usuario.encargado_rendicion_caja_chica) ? "0" : $scope.usuario.id;
                var concepto = (filtro.concepto) ? filtro.concepto : "0";
                var estado = (filtro.estado) ? filtro.estado : "0";
                var movimiento = (filtro.movimiento) ? filtro.movimiento : "0";
                var solicitante = (filtro.solicitante) ? filtro.solicitante : "0";
                var usuario = (filtro.usuario) ? filtro.usuario : "0";
                var promesa = SolicitudesCajaChicaPDF(id_sucursal, empresa, id_usuario_no_autorizado, inicio, fin, concepto, estado, movimiento, solicitante, usuario)
                promesa.then(function (datos) {
                    blockUI.stop()

                    var solicitudImpresion = datos.solicitudes
                    var index = 0;
                    var data = [["Nro", "Fecha", "Beneficio", "Autorizador", "Verificador", "Campo", "Area", "Movimiento",
                        "Concepto", "Detalle", "Estado", "Monto"]]

                    for (var i = 0; i < solicitudImpresion.length; i++) {
                        var solicitudes = solicitudImpresion[i];
                        var columns = [];
                        index = index + 1;
                        //Numero
                        columns.push(index);
                        //Fecha
                        var fecha = $scope.fechaATexto(solicitudes.fecha);
                        columns.push(fecha);
                        //Beneficio
                        if (solicitudes.solicitante) {
                            columns.push(solicitudes.solicitante.persona.nombre_completo);
                        } else {
                            columns.push(" ")
                        }
                        //Autorizador
                        if (solicitudes.autorizador != null) {
                            columns.push(solicitudes.autorizador.persona.nombre_completo);
                        } else {
                            columns.push(" ");

                        }
                        //Verificador
                        if (solicitudes.verificador != null) {
                            columns.push(solicitudes.verificador.persona.nombre_completo);
                        } else {
                            columns.push(" ");
                        }


                        //Campo
                        // solicitante.campo.nombre
                        columns.push(solicitudes.solicitante.campo.nombre);


                        //area
                        if (solicitudes.solicitante) {
                            var area = ""
                            var tam = solicitudes.solicitante.empleadosFichas.length - 1;
                            const existeRegistroArea = (solicitudes.solicitante.empleadosFichas && solicitudes.solicitante.empleadosFichas[tam] && solicitudes.solicitante.empleadosFichas[tam].area && solicitudes.solicitante.empleadosFichas[tam].area.nombre) || false;
                            if (existeRegistroArea) {
                                area = existeRegistroArea;
                            } else {
                                area = "";

                            }
                            columns.push(area);
                        } else {
                            columns.push(" ");
                        }

                        //movimiento
                        columns.push(solicitudes.concepto.concepto.nombre)
                        //concepto
                        columns.push(solicitudes.concepto.nombre);
                        //detalle
                        columns.push(solicitudes.detalle);
                        //estado
                        columns.push(solicitudes.estado.nombre);
                        //monto
                        columns.push(round(solicitudes.monto, 2));

                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-GENERAL-DE-CAJA.xlsx");
                });
            }
            $scope.eliminarIngresoCajaChica = function (dato) {
                var promesa = EliminarIngresoCajaChica(dato.id)
                promesa.then(function (data) {
                    $scope.mostrarMensaje(data.mensaje)
                    $scope.obtenerListaIngresos()
                    $scope.obtenerListaSolicitudes()
                })
            }
            $scope.obtenerlistaFondosArendir = function (filtro) {
                $scope.paginatorRendicion = Paginator();
                $scope.paginatorRendicion.column = "fecha";
                $scope.paginatorRendicion.direction = "desc";
                $scope.paginatorRendicion.itemsPerPage = 10;
                $scope.paginatorRendicion.callBack = $scope.obtenerlistaFondoArendir;
                if (filtro) {
                    $scope.filtro = filtro;
                } else {
                    $scope.filtro = {}
                }
                $scope.paginatorRendicion.getSearch("", $scope.filtro, null);
            }
            $scope.obtenerlistaFondoArendir = function () {
                var promesa = ObtenerlistaFondoArendir($scope.sucursalPrincipal.id, $scope.paginatorRendicion)
                promesa.then(function (dato) {
                    $scope.paginatorRendicion.setPages(dato.paginas);
                    $scope.listaFondosARendir = dato.solicitudes.filter(function (solicitud) {
                        if (solicitud.rendicionFondo) {
                            solicitud.saldo = solicitud.monto - solicitud.rendicionFondo.total
                            solicitud.pagado = solicitud.rendicionFondo.total
                        } else {
                            solicitud.saldo = solicitud.cajasChicas[0].saldo
                            solicitud.pagado = solicitud.cajasChicas[0].pagado
                        }
                        if (solicitud.rendicionFondo != undefined && solicitud.rendicionFondo != null) {
                            return solicitud.cajasChicas[0].saldo > 0
                        } else {
                            return solicitud
                        }
                    })
                })
            }
            /*  $scope.obtenerlistaFondoArendir = function () {
                 var promesa = ObtenerlistaFondoArendir($scope.sucursalPrincipal.id, $scope.paginatorRendicion)
                 promesa.then(function (dato) {
                     $scope.paginatorRendicion.setPages(dato.paginas);
                     $scope.listaFondosARendir = dato.solicitudes
                     $scope.listaFondosARendir.forEach(function (x) {
                         if (x.rendicionFondo) {
                             x.saldo = x.monto - x.rendicionFondo.total
                         }else{
                             x.saldo=x.cajasChicas[0].saldo
                         }
                     })
                 })
             } */
            $scope.seleccionarFondoArendir = function (solicitud) {
                $scope.cajaChica.ingreso = solicitud
                $scope.cajaChica.devolucion = true
                $scope.cajaChica.concepto = $scope.ConceptosMovimiento.find(function (dato) {
                    return dato.nombre == "DEVOLUCION"
                })
                if (solicitud.rendicionFondo) {
                    $scope.cajaChica.total = solicitud.monto - solicitud.rendicionFondo.total
                    $scope.cajaChica.rendicionFondo = true
                } else {
                    $scope.cajaChica.total = solicitud.saldo
                    $scope.cajaChica.devolucion_desembolso = true
                }
                $scope.cerrarModalDevolucionFondoRendir()
            }
            /*  $scope.seleccionarFondoArendir = function (solicitud) {
                 $scope.cajaChica.ingreso = solicitud
                 $scope.cajaChica.devolucion = true
                 if (solicitud.rendicionFondo) {
                     $scope.cajaChica.total = solicitud.monto - solicitud.rendicionFondo.total
                     $scope.cajaChica.rendicionFondo = true
                 }
                 $scope.cajaChica.concepto = $scope.ConceptosMovimiento.find(function (dato) {
                     return dato.nombre == "DEVOLUCION"
                 })
                 if (solicitud.estado.nombre_corto === $scope.diccionario.CC_ESTADO_DESEMBOLSADO) {
                     $scope.cajaChica.total = solicitud.monto
                     $scope.cajaChica.devolucion_desembolso = true
                 } else {
                     $scope.cajaChica.devolucion_desembolso = false
                 }
                 $scope.cerrarModalDevolucionFondoRendir()
             } */
            $scope.GenerarValeCajaChica = function () {
                blockUI.start();
                var datos = { solicitud: { monto: $scope.solicitud.monto, id: $scope.solicitud.id, id_sucursal: $scope.solicitud.id_sucursal }, fecha: new Date() }
                var promesa = GuardarValeCajaChica(datos)
                promesa.then(function (dato) {
                    $scope.ImprimirValeCajaChica(dato.vale)
                    $scope.cerrarModalValeCajaChica()
                    $scope.solicitud.vale = dato.vale
                })
            }
            $scope.ImprimirValeCajaChica = function (vale, local, reporte_vale) {
                var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
                var stream = doc.pipe(blobStream());
                if (local) {
                    doc.font('Helvetica', 50);
                    doc.text("vale", 10, 70);
                    doc.font('Helvetica', 10);
                    doc.text("Fecha.:", 120, 40);
                    doc.text($scope.fechaATexto(vale.fecha), 200, 40);

                    doc.text("Beneficiario.:", 120, 60);
                    if (reporte_vale) {
                        doc.text(vale.solicitud.solicitante.persona.nombre_completo, 200, 60);
                    } else {
                        doc.text($scope.solicitud.solicitante.persona.nombre_completo, 200, 60);
                    }
                    doc.text("Monto.:", 120, 80);
                    doc.text(vale.monto, 200, 80);

                    doc.text("Nro.:", 480, 40);
                    doc.text(vale.numero_correlativo, 510, 40);

                    doc.text("...................................", 340, 113);
                    doc.text("Firma", 370, 120);
                } else {
                    doc.font('Helvetica', 50);
                    doc.text("vale", 10, 70);
                    doc.font('Helvetica', 10);
                    doc.text("Fecha.:", 120, 40);
                    doc.text($scope.fechaATexto(vale.fecha), 200, 40);

                    doc.text("Beneficiario.:", 120, 60);
                    doc.text(vale.solicitud.solicitante.persona.nombre_completo, 200, 60);

                    doc.text("Monto.:", 120, 80);
                    doc.text(vale.monto, 200, 80);

                    doc.text("Nro.:", 480, 40);
                    doc.text(vale.numero_correlativo, 510, 40);

                    doc.text("...................................", 340, 113);
                    doc.text("Firma", 370, 120);
                }
                doc.rect(0, 140, 610, 0).dash(1, { space: 5 }).stroke();
                doc.font('Helvetica', 30);

                if (vale.estado.nombre_corto == $scope.diccionario.CC_ESTADO_VALE_PROCESADO) {
                    doc.rotate(330, { origin: [285, 320] })
                    doc.text('PROCESADO')
                    doc.restore()
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }
            $scope.darDeBajaValeCajaChica = function (vale) {
                blockUI.start();
                var promesa = DarDeBajaValeCajaChica(vale.id)
                promesa.then(function (dato) {
                    $scope.solicitud.vale.estado = dato.vale.estado
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.ImprimirValeCajaChica(dato.vale)
                    blockUI.stop();
                })
            }

            $scope.imprimirPDFIngresosCC = async function () {
                $scope.IngresosTodoCajaChica = await $scope.obtenerTodoListaIngresos();

                var listaIngresosCC = $scope.IngresosTodoCajaChica;
                var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text

                var y = 95, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(listaIngresosCC.length / itemsPorPagina);;
                $scope.dibujarCabeceraPDFIngresosCC(doc, listaIngresosCC, pagina, totalPaginas);

                var index = 0;
                for (var i = 0; i < listaIngresosCC.length && items <= itemsPorPagina; i++) {
                    var ingresos = listaIngresosCC[i];
                    index = index + 1;
                    doc.font('Helvetica', 8);
                    doc.text(index, 40, y);
                    var fecha = $scope.fechaATexto(ingresos.fecha);
                    doc.text(fecha, 60, y);
                    doc.text(ingresos.sucursal.nombre, 120, y);
                    doc.text(ingresos.cuenta.nombre, 180, y);
                    doc.text(ingresos.concepto.nombre, 240, y);
                    doc.text(formatNumber(ingresos.monto), 400, y);



                    y = y + 20;
                    items++;

                    if (items == itemsPorPagina) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 90;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFIngresosCC(doc, listaIngresosCC, pagina, totalPaginas);
                    }
                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.dibujarCabeceraPDFIngresosCC = function (doc, listaIngresosCC, pagina, totalPaginas) {

                doc.font('Helvetica-Bold', 13);
                doc.text("REPORTE DE INGRESOS DE CAJA CHICA", 0, 40, { align: 'center' });

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 40, 80);
                doc.text("Fecha", 60, 80);
                doc.text("Sucursal", 120, 80);
                doc.text("Cuenta", 180, 80);
                doc.text("Concepto", 240, 80);
                doc.text("Monto", 400, 80);

                doc.font('Helvetica', 8);
                doc.text(pagina + " de " + totalPaginas, 540, 750);
            }

            $scope.imprimirExcelIngresosCC = async function () {
                $scope.IngresosTodoCajaChica = await $scope.obtenerTodoListaIngresos();

                var listaIngresosCC = $scope.IngresosTodoCajaChica;
                var index = 0;
                var data = [["Nro", "Fecha", "Sucursal", "Cuenta", "Concepto", "Monto"]]

                for (var i = 0; i < listaIngresosCC.length; i++) {
                    var ingresos = listaIngresosCC[i];
                    var columns = [];
                    index = index + 1;
                    //Numero
                    columns.push(index);
                    //Fecha
                    var fecha = $scope.fechaATexto(ingresos.fecha);
                    columns.push(fecha);
                    //sucursal
                    if (ingresos.sucursal) {
                        columns.push(ingresos.sucursal.nombre);
                    } else {
                        columns.push(" ")
                    }
                    //Cuenta
                    if (ingresos.cuenta != null) {
                        columns.push(ingresos.cuenta.nombre);
                    } else {
                        columns.push(" ");

                    }
                    //Concepto
                    if (ingresos.concepto != null) {
                        columns.push(ingresos.concepto.nombre);
                    } else {
                        columns.push(" ");
                    }

                    //Monto                        
                    columns.push(formatNumber(ingresos.monto));

                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-INGRESOS-CAJA-CHICA.xlsx");
            }

            $scope.imprimirPDFCierresCC = function () {
                var listaCierreCC = $scope.cierresCajaChica;
                var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text

                var y = 95, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(listaCierreCC.length / itemsPorPagina);;
                $scope.dibujarCabeceraPDFEgresosCC(doc, listaCierreCC, pagina, totalPaginas);

                var index = 0;
                for (var i = 0; i < listaCierreCC.length && items <= itemsPorPagina; i++) {
                    var egresos = listaCierreCC[i];
                    index = index + 1;
                    doc.font('Helvetica', 8);
                    doc.text(index, 40, y);

                    var fechaCreada = $scope.fechaATexto(egresos.createdAt);
                    doc.text(fechaCreada, 60, y)

                    var fechaInicio = $scope.fechaATexto(egresos.inicio);
                    doc.text(fechaInicio, 150, y)

                    var fechaFin = $scope.fechaATexto(egresos.fecha);
                    doc.text(fechaFin, 210, y);

                    var saldoInicial = formatNumber(egresos.saldo_inicial);
                    if (saldoInicial == "-") {
                        doc.text(0, 270, y);
                    } else {
                        doc.text(saldoInicial, 270, y);
                    }

                    var saldoFinal = formatNumber(egresos.saldo_final);
                    doc.text(saldoFinal, 340, y)

                    y = y + 20;
                    items++;

                    if (items == itemsPorPagina) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 90;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFEgresosCC(doc, listaCierreCC, pagina, totalPaginas);
                    }
                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });

            }

            $scope.dibujarCabeceraPDFEgresosCC = function (doc, listaCierreCC, pagina, totalPaginas) {

                doc.font("Helvetica-Bold", 13);
                doc.text("REPORTE CIERRES CAJA CHICA", 0, 50, { align: 'center' });
                doc.font("Helvetica-Bold", 8);
                doc.text("N°", 40, 80);
                doc.text("Fecha Elaboración", 60, 80);
                doc.text("Fecha Inicio", 150, 80);
                doc.text("Fecha Fin", 210, 80);
                doc.text("Saldo Inicial", 270, 80);
                doc.text("Saldo Final", 340, 80);

                doc.font("Helvetica", 8);
                doc.text(pagina + " de " + totalPaginas, 540, 750);

            }

            $scope.imprimirExcelCierresCC = function () {
                var listaCierreCC = $scope.cierresCajaChica;
                var index = 0;
                var data = [["Nro", "Fecha Elaboracion", "Fecha Inicio", "Fecha Fin", "Saldo Inicio", "Saldo Fin"]]

                for (var i = 0; i < listaCierreCC.length; i++) {
                    var cierre = listaCierreCC[i];
                    var columns = [];
                    index = index + 1;
                    //Numero
                    columns.push(index);
                    //Fecha elaboradora
                    var fecha = $scope.fechaATexto(cierre.createdAt);
                    columns.push(fecha);

                    //fecha inicio          
                    columns.push($scope.fechaATexto(cierre.inicio));

                    //fecha fin                      
                    columns.push($scope.fechaATexto(cierre.fecha));

                    //saldo inicial
                    columns.push(formatNumber(cierre.saldo_inicial));

                    //saldo final                        
                    columns.push(formatNumber(cierre.saldo_final));

                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-CIERRES-CAJA-CHICA.xlsx");
            }
            $scope.establecerCuenta = function (cuenta) {
                if (cuenta.id) {
                    $scope.validarCuenta = false
                } else {
                    $scope.validarCuenta = true
                }

            }
            $scope.establecerCuentaContraDebe = function (cuenta) {
                $scope.validarCuentaContraDebe = (cuenta) ? (cuenta.id) ? false : true : true
            }

            $scope.establecerCuentaContraHaber = function (cuenta) {
                $scope.validarCuentaContraHaber = (cuenta) ? (cuenta.id) ? false : true : true

            }

            $scope.seleccionarCentrosCosto = function (campo) {
                for (var i = 0; i < $scope.campamento.length; i++) {
                    if ($scope.campamento[i].id == campo.id) {
                        $scope.campamento[i].ticked = true;

                    } else {
                        $scope.campamento[i].ticked = false;
                    }
                }
            }
            $scope.seleccionarArtosCentrosCosto = function (campos) {
                for (var i = 0; i < $scope.campamento.length; i++) {
                    if (campos) {
                        for (var j = 0; j < campos.length; j++) {
                            var campo = campos[j];
                            var idcentro = campo.id_centro_costo ? campo.id_centro_costo : campo.id
                            if ($scope.campamento[i].id == idcentro) {
                                $scope.campamento[i].ticked = true;

                            }
                        }
                    }
                }
            }
            /* detalle rendicion */
            $scope.obtenerDetalleRendicionSolicitud = function () {
                var promesa = ObtenerDetalleRendicionSolicitud($scope.solicitud.id)
                promesa.then(function (dato) {
                    $scope.rendicionFondo = dato.rendicion
                    $scope.llenarCentroCostos()
                })
            }
            /* fin detalles rendicion */

            /* solicitudes con proveedores */
            $scope.abrirModalRegistroProveedorCajaChica = function (datos, ver) {

                if (datos) {
                    $scope.cajaChica = { id_usuario: $scope.usuario.id }
                    $scope.cajaChica.solicitud = datos
                    $scope.cajaChica.concepto = datos.concepto
                    $scope.cajaChica.detalle = datos.detalle
                    $scope.cajaChica.fecha = $scope.fechaATexto(new Date(datos.fecha))
                    $scope.cajaChica.total = datos.monto
                    $scope.cajaChica.sucursal = $scope.sucursalPrincipal
                } else {
                    $scope.cajaChica = {
                        id_usuario: $scope.usuario.id,
                        fecha: $scope.fechaATexto(new Date()),
                        solicitud: null, verDatosCompra: false, descuentoGasolina: false, sucursal: $scope.sucursalPrincipal
                    }
                }
                if (ver) {
                    $scope.cajaChica.ver = true
                }

                $scope.cajaChica.Desembolso = true
                $scope.cajaChica.Anticipo = false
                $scope.cajaChica.proveedor = true
                $scope.abrirPopup($scope.idModalRegistroProveedorCajaChica);
            }
            $scope.cerrarModalRegistroProveedorCajaChica = function () {

                $scope.cerrarPopup($scope.idModalRegistroProveedorCajaChica);
            }
            /* solicitudes con proveedores */

            $scope.guardarConfigImprecionRendicion = function () {
                $localStorage.usar_imprecion_rendicion = $scope.usar_imprecion_rendicion;
            }



            //gasto
            $scope.obtenerGastosFr = function () {
                $scope.gastosFr = []
                var promesa = ObtenerGastosCajaChica($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.gastosFr = dato.gastos
                })
            }
            $scope.establecerGasto = function (model) {
                if (model) {
                    if (model.id) {
                        $scope.gastoNoAsignado = false
                        $scope.cajaChica.concepto = model.concepto
                        $scope.cajaChica.cuenta = model.cuenta
                    } else {
                        $scope.gastoNoAsignado = true
                    }
                }
            }
            //devoluciones fondo a rendir
            $scope.abrirModalDevolucionFondoRendir = function () {
                $scope.obtenerlistaFondosArendir()
                $scope.abrirPopup($scope.idModalDevolucionFondoRendir);
            }
            $scope.cerrarModalDevolucionFondoRendir = function () {

                $scope.cerrarPopup($scope.idModalDevolucionFondoRendir);
            }
            //fin devolucion fondo a renidr
            //lista vales
            $scope.abrirModallistaVales = function () {
                $scope.obtenerlistaVales()
                $scope.abrirPopup($scope.idModallistaVales);
            }
            $scope.cerrarModallistaVales = function () {

                $scope.cerrarPopup($scope.idModallistaVales);
            }
            $scope.obtenerEstadosVales = function () {
                var promesa = ClasesTipo('ESTADOS-VCC')
                promesa.then(function (dato) {
                    $scope.estadosVales = dato.clases
                })
            }
            $scope.obtenerlistaVales = function (filtro) {
                $scope.paginatorListaVales = Paginator();
                $scope.paginatorListaVales.column = "fecha";
                $scope.paginatorListaVales.direction = "desc";
                $scope.paginatorListaVales.itemsPerPage = 10;
                $scope.paginatorListaVales.callBack = $scope.obtenerListaVales;
                if (filtro) {
                    $scope.filtro = filtro;
                } else {
                    var estado = $scope.estadosVales.find(function (x) {
                        return x.nombre_corto == 'PENDIENTE'
                    })
                    $scope.filtro = { id_estado: estado.id }
                }
                $scope.paginatorListaVales.getSearch("", $scope.filtro, null);
            }
            $scope.obtenerListaVales = function () {
                var promesa = ObtenerListaVales($scope.sucursalPrincipal.id, $scope.paginatorListaVales)
                promesa.then(function (dato) {
                    $scope.paginatorListaVales.setPages(dato.paginas);
                    $scope.listaVales = dato.vales
                })
            }
            //fin lista vales
            /* reporte de lista vales */
            $scope.imprimirPDFVales = function () {
                var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                var stream = doc.pipe(blobStream());
                // draw some text

                var y = 95, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.listaVales.length / itemsPorPagina);;
                $scope.dibujarCabeceraPDFListaVales(doc, pagina, totalPaginas);

                var index = 0;
                for (var i = 0; i < $scope.listaVales.length && items <= itemsPorPagina; i++) {
                    var vale = $scope.listaVales[i]
                    doc.font('Helvetica', 8);
                    doc.text(i + 1, 40, y);
                    var fechaCreada = $scope.fechaATexto(vale.fecha);
                    doc.text(fechaCreada, 70, y)
                    doc.text(vale.solicitud.solicitante.persona.nombre_completo, 140, y)
                    doc.text(vale.estado.nombre, 330, y)
                    doc.text(vale.monto, 500, y)
                    y += 20
                    if (items == itemsPorPagina) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 90;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFListaVales(doc, pagina, totalPaginas);
                    }
                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }
            $scope.dibujarCabeceraPDFListaVales = function (doc, pagina, totalPaginas) {

                doc.font("Helvetica-Bold", 13);
                doc.text("REPORTE VALES CAJA CHICA", 0, 50, { align: 'center' });
                doc.font("Helvetica-Bold", 8);
                doc.text("N°", 40, 80);
                doc.text("Fecha", 80, 80);
                doc.text("Beneficiario", 150, 80);
                doc.text("Estado", 340, 80);
                doc.text("Monto", 500, 80);

                doc.font("Helvetica", 8);
                doc.text(pagina + " de " + totalPaginas, 540, 750);

            }
            $scope.imprimirExcelVales = function () {
                var index = 0;
                var data = [["Nro", "Fecha Elaboracion", "Beneficiario", "Estado", "Monto"]]

                for (var i = 0; i < $scope.listaVales.length; i++) {
                    var vale = $scope.listaVales[i];
                    var columns = [];
                    columns.push(i + 1)
                    columns.push(new Date(vale.fecha))
                    columns.push(vale.solicitud.solicitante.persona.nombre_completo)
                    columns.push(vale.estado.nombre)
                    columns.push(vale.monto)

                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-VALES-CAJA-CHICA.xlsx");
            }
            /* fin reporte de lista vales */
            /* repote cierres caja exel */
            $scope.generarExelCierreCajaChica = function (cierreCaja) {
                var promesa = DatosCierreCajaChica(cierreCaja.id, $scope.usuario.id_empresa, $scope.sucursalPrincipal.id)
                promesa.then(function (dato) {
                    var datos = dato.cierreCaja
                    console.log(datos);
                    var saldo = datos.saldo_inicial;
                    var data = [["Nro", "Fecha", "Nombre", "Gastos", "Nro. Factura",
                        "Monto", "Saldo"]];
                    var datosIniciales = [];
                    datosIniciales.push(0);
                    datosIniciales.push(new Date(datos.fecha));
                    datosIniciales.push("");
                    datosIniciales.push("SALDO INICIAL");
                    datosIniciales.push("");
                    datosIniciales.push("");
                    datosIniciales.push(saldo.toFixed(2));
                    data.push(datosIniciales);

                    for (var i = 0; i < datos.detalleCierreCaja.length; i++) {
                        var caja = datos.detalleCierreCaja[i]
                        var columns = [];
                        columns.push(i + 1);
                        columns.push(new Date(caja.fecha))
                        if (caja.solicitud != undefined) {
                            var nombre = caja.solicitud.solicitante.persona.nombre_completo
                            columns.push(nombre);
                        } else {
                            columns.push("")
                        }
                        columns.push(caja.concepto.nombre);
                        var factura = (caja.compra != undefined) ? (caja.compra.factura) ? caja.compra.factura : "" : "";
                        columns.push(factura)

                        if (caja.concepto.concepto.nombre == "INGRESO") {
                            monto = caja.monto
                            saldo += monto
                            columns.push(monto.toFixed(2));


                        } else {
                            monto = caja.monto
                            saldo -= monto
                            columns.push(-1 * monto.toFixed(2));

                        }
                        columns.push(saldo.toFixed(2));
                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-CAJA-CHICA.xlsx");

                });
            }
            /* fin repote cirres caja exel */
            /* inicio comprobantesr orden de reposicion */
            $scope.generarComprobante = async function () {
                try {
                    for (const gasto of $scope.rendicionFondo.gastos) {
                        if (!gasto.rembolsado) {
                            return SweetAlert.swal("Adventencia", "No se puede Realizar el comprobante porque faltan revisar registros!", "warning");
                        }
                    }
                    var res = await ObtenerDatosSolicitudID($scope.solicitud.id)

                    $scope.rendicionFondo.solicitud = res.solicitud
                    let datos = $scope.rendicionFondo
                    $scope.crearNuevoComprobante('RendicionFondo', datos)
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.eliminarDetalleCCH = (dato) => {
                SweetAlert.swal({
                    title: "¿Esta seguro de eliminar el detalle?",
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(async (result) => {
                    if (result.value) {
                        $scope.eliminarIngresoCajaChica(dato)

                    }
                });
            }
            /* fin comprobante orden reposicion */

            $scope.validarCampos = () => {
                if ($scope.cajaChica.concepto && $scope.cajaChica.concepto.nombre === "DEVOLUCION") {
                    $scope.cajaChica.devolucion_desembolso = true
                    $scope.cajaChica.ingreso = {}
                } else {
                    $scope.cajaChica.devolucion_desembolso = false
                }
            }

            $scope.$on('$routeChangeStart', function (next, current) {

                $scope.eliminarPopup($scope.idModalSolicitudCajaChica);
                $scope.eliminarPopup($scope.idModalConceptosMovimiento)
                $scope.eliminarPopup($scope.idModalEliminarSolicitud)
                $scope.eliminarPopup($scope.idModalVerificarAutorizacion)
                $scope.eliminarPopup($scope.idModalRegistroCajaChica)
                $scope.eliminarPopup($scope.idModalKardexCajaChica)
                $scope.eliminarPopup($scope.idModalIngresosCajaChica)
                $scope.eliminarPopup($scope.idModalHistorialCierreCajaChica)
                $scope.eliminarPopup($scope.idModalRegistroIngresoCajaChica)
                $scope.eliminarPopup($scope.idModalRegistroDesembolsoCajaChica)
                $scope.eliminarPopup($scope.idModalServicios)
                $scope.eliminarPopup($scope.idModalRegistroAnticipoCajaChica)
                $scope.eliminarPopup($scope.idModalKardexGastoCajaChica)
                $scope.eliminarPopup($scope.idModalVerificarCierreCajaChica)
                $scope.eliminarPopup($scope.idModalValeCajaChica)
                $scope.eliminarPopup($scope.ModalDetalleGastosFondo)
                $scope.eliminarPopup($scope.idModalRegistroProveedorCajaChica)
                $scope.eliminarPopup($scope.idModalDevolucionFondoRendir);
            });

            $scope.inicio();
        }])














    .controller('ControladorSolicitudCajaChica', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
        'ClasesTipoEmpresa', 'ClasesTipo', 'GuardarSolicitudCajaChica', 'GuardarConceptoMovimientoCajaChica',
        'ObtenerConceptoMovimientoCajaChica', 'VerificarUsuarioEmpresaCaja', 'SolicitudesCajaPaginador', 'ObtenerTodoPersonal', '$filter', 'Paginator', 'VerificarUsuarioEmpresa', 'FieldViewer', 'pruebaSolicitud',
        'GuardarNivelesCajaChica', 'GuardarGastosCajaChica', 'ObtenerNivelesCajaChica', 'NuevoComprobante', 'ObtenerGastosCajaChica',
        'ListaChoferesViaje', 'GuardarConductoresEmpresa', 'Tipos', 'ObtenerDatosSolicitudFondoARendir', 'GuardarRendicionDeFondo', '$timeout', 'ObtenerImagen', 'ProveedoresNit',
        'ComprasRendicionDoc', 'ObtenerDatosSolicitudID', 'SweetAlert', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
            ClasesTipoEmpresa, ClasesTipo, GuardarSolicitudCajaChica, GuardarConceptoMovimientoCajaChica,
            ObtenerConceptoMovimientoCajaChica, VerificarUsuarioEmpresaCaja, SolicitudesCajaPaginador, ObtenerTodoPersonal, $filter, Paginator, VerificarUsuarioEmpresa, FieldViewer, pruebaSolicitud,
            GuardarNivelesCajaChica, GuardarGastosCajaChica, ObtenerNivelesCajaChica, NuevoComprobante, ObtenerGastosCajaChica, ListaChoferesViaje, GuardarConductoresEmpresa, Tipos, ObtenerDatosSolicitudFondoARendir, GuardarRendicionDeFondo,
            $timeout, ObtenerImagen, ProveedoresNit, ComprasRendicionDoc, ObtenerDatosSolicitudID, SweetAlert) {


            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.idModalSolicitudCajaChica = 'dialog-solicitud'
            $scope.idModalConceptosMovimiento = 'dialog-conceptos-movimiento'
            $scope.idModalEliminarSolicitud = 'dialog-eliminar-solicitud'
            $scope.idModalVerificarAutorizacion = 'modal-verificar-autorizacion'
            $scope.idModalNivelFondoRendir = 'modal-nivel-fondo-rendir'
            $scope.idModalGastoFondoRendir = 'modal-gasto-fondo-rendir'
            $scope.idModalPanelGastoFondo = 'modal-panel-gasto-fondo'
            $scope.idModalVehiculosViaje = "dialog-vehiculos-viaje";
            $scope.idModalConductoresViaje = 'dialog-conductores-viaje'
            $scope.idModalConceptoEdicion = 'dialog-conceptos';
            $scope.idModalFondoRendirEdicionSolicitud = 'dialog-fondo-rendir-edicion-solicitud'
            $scope.inicio = function () {
                $scope.gastoNoAsignado = false
                $scope.beneficiarioNoEncontrado = false
                $scope.obtenerTiposMovimiento()
                $scope.obtenerConceptosMovimiento()
                $scope.obtenerTiposEstados()
                $scope.obtenerChoferesViaje()
                $scope.obtenerVehiculosViaje()
                $scope.obtenerTipoLicenciaVehiculo()
                $scope.obtenerTipoRendiciones()
                $scope.obtenerGastosFr()
                $scope.obtenerAreas()
                $scope.ConceptosMovimiento = []
                $scope.dynamicPopoverConfig = {
                    templateUrl: 'myPopoverTemplateConfig.html',
                };
                $scope.dynamicPopoverCargosFr = {
                    templateUrl: 'myPopoverTemplateFrCargos.html',
                };
            }


            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsSolicitudCajaChicas($scope.idModalSolicitudCajaChica, $scope.idModalConceptosMovimiento, $scope.idModalEliminarSolicitud, $scope.idModalVerificarAutorizacion,
                    $scope.idModalNivelFondoRendir, $scope.idModalGastoFondoRendir, $scope.idModalPanelGastoFondo, $scope.idModalVehiculosViaje,
                    $scope.idModalConductoresViaje, $scope.idModalConceptoEdicion, $scope.idModalFondoRendirEdicionSolicitud);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
                $scope.obtenerColumnasAplicacion()
                blockUI.stop();
            });

            $scope.obtenerAreas = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_AREA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.listaAreas = entidad
                    blockUI.stop();
                });
            }

            $scope.obtenerColumnasAplicacion = function () {
                $scope.fieldViewer = FieldViewer({
                    crear: false,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        usuario_solicitante: { value: "Usuario solicitante", show: true },
                        sucursal: { value: "sucursal", show: true },
                        fecha: { value: "Fecha", show: true },
                        beneficiario: { value: "Beneficiario", show: true },
                        proveedor: { value: "Proveedor", show: true },
                        numero_orden: { value: "Numero orden", show: true },
                        autorizador: { value: "Autorizador", show: true },
                        concepto: { value: "Concepto", show: true },
                        area: { value: "Area", show: true },
                        campo: { value: "Campo", show: true },
                        detalle: { value: "Detalle", show: true },
                        estado: { value: "Estado", show: true },
                        monto: { value: "Monto", show: true }
                    }
                }, $scope.aplicacion.aplicacion.id, 'principal');
                $scope.fieldViewer.updateObject();
                $scope.fieldViewerDetalleFondo = FieldViewer({
                    crear: true,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        gasto: { value: "Gasto", show: true },
                        fecha: { value: "Fecha", show: true },
                        num_fact_rec: { value: "N° Fact/Rec", show: true },
                        detalle: { value: "Detalle", show: true },
                        monto: { value: "Monto", show: true },
                        area: { value: "area", show: true },
                        centro_costos: { value: "Centro costos", show: true }

                    }
                }, $scope.aplicacion.aplicacion.id, 'rendicion-fondo');
                $scope.fieldViewerDetalleFondo.updateObject();
            }
            $scope.abrirModalSolicitudCajaChica = function (verOEditar) {
                if (verOEditar == undefined) {
                    $scope.solicitud = { fecha: new Date() }
                    $scope.solicitud.sucursal = $scope.sucursales.length > 1 ? "" : $scope.sucursales[0]
                }
                $scope.filtrarPersonal()
                $scope.abrirPopup($scope.idModalSolicitudCajaChica);
            }
            $scope.cerrarModalSolicitudCajaChica = function () {

                $scope.cerrarPopup($scope.idModalSolicitudCajaChica);
            }
            $scope.abrirModalConceptosMovimiento = function () {
                $scope.clase = { edit: false }
                $scope.abrirPopup($scope.idModalConceptosMovimiento);
            }
            $scope.cerrarModalConceptosMovimiento = function () {

                $scope.cerrarPopup($scope.idModalConceptosMovimiento);
            }
            // $scope.abrirModalEliminarSolicitud = function (datos) {
            //     $scope.solicitud = datos
            //     $scope.abrirPopup($scope.idModalEliminarSolicitud);
            // }
            $scope.cerrarModalEliminarSolicitud = function () {

                $scope.cerrarPopup($scope.idModalEliminarSolicitud);
            }
            $scope.abrirModalVerificarAutorizacion = function (dato) {
                $scope.claveconfirmacionCuentaSolicitud = false
                $scope.solicitud = dato
                $scope.tipoDatosPermiso = "autorizacion"
                $scope.abrirPopup($scope.idModalVerificarAutorizacion);
            }
            $scope.cerrarModalVerificarAutorizacion = function () {
                $scope.claveconfirmacionCuentaSolicitud = false
                $scope.cerrarPopup($scope.idModalVerificarAutorizacion);
            }

            $scope.obtenerTiposMovimiento = function () {
                var promesa = ClasesTipo('CM_CCH')
                promesa.then(function (dato) {
                    $scope.tiposMovimientos = dato
                })
            }

            $scope.obtenerTiposEstados = function () {
                var promesa = ClasesTipo('ES_CCH')
                promesa.then(function (dato) {
                    $scope.tiposEstados = dato.clases
                    $scope.tiposEstados.forEach(function (estado) {
                        estado.numero = estado.nombre_corto == 'PENDIENTE' ? 1 : estado.nombre_corto == 'AUTORIZADO' ? 2 : estado.nombre_corto == 'DESEMBOLSADO' ? 3 : estado.nombre_corto == 'FR-VERIFICADO' ? 4 : estado.nombre_corto == 'PROCESADO' ? 5 : estado.nombre_corto == 'ANULADO' ? 6 : null

                    })
                    $scope.obtenerListaSolicitudes()
                })
            }
            $scope.obtenerConceptosMovimiento = function () {
                var promesa = ObtenerConceptoMovimientoCajaChica($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.ConceptosMovimiento = dato

                    $scope.cerrarModalConceptosMovimiento()
                })

            }
            $scope.AgregarConceptosMovimientoCajaChica = function (clase) {
                clase.habilitado = true
                if (!clase.edit) {
                    $scope.ConceptosMovimiento.push(clase)
                } else {
                    $scope.clase = { edit: false }
                }
            }
            $scope.editarConceptoMovimientoCajaChica = function (clase) {
                clase.edit = true
                $scope.clase = clase
            }
            $scope.cancelarEdicionConcepotMovimientoCajaChica = function (clase) {
                $scope.clase = { edit: false }
            }

            $scope.guardarConceptoMovimientoCajaChica = function () {
                var promesa = GuardarConceptoMovimientoCajaChica($scope.usuario.id_empresa, $scope.ConceptosMovimiento)
                promesa.then(function (dato) {
                    $scope.obtenerConceptosMovimiento()
                    $scope.mostrarMensaje(dato.mensaje)
                })
            }
            $scope.guardarSolicitudCajaChica = function () {
                if ($scope.solicitud.solicitante.id) {
                    $scope.beneficiarioNoEncontrado = false
                    $scope.errorSolicitudProveedor = false
                    if (!$scope.solicitud.id) {
                        $scope.solicitud.usuario = $scope.usuario
                    }
                    $scope.tiposEstados.forEach(function (tipo, index, array) {
                        if ($scope.usuario.autorizacion_caja_chica) {
                            $scope.solicitud.autorizador = $scope.usuario.id
                            if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_AUTORIZADO) {
                                $scope.solicitud.estado = tipo
                            }
                        } else {
                            if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_PENDIENTE) {
                                $scope.solicitud.estado = tipo
                            }

                        }
                        if (index === (array.length - 1)) {
                            //$scope.solicitud.fecha = new Date($scope.convertirFecha($scope.solicitud.fecha))
                            var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                            promesa.then(function (dato) {
                                $scope.obtenerListaSolicitudes()
                                $scope.cerrarModalSolicitudCajaChica()
                                $scope.mostrarMensaje(dato.mensaje)
                            })
                        }

                    });
                } else {
                    $scope.beneficiarioNoEncontrado = true
                }


            }
            $scope.buscarPersonal = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = $filter('filter')($scope.todoPersonal, query);
                    return promesa;
                }
            }

            $scope.filtrarPersonal = function (query) {
                if ($scope.todoPersonal !== undefined) {
                    $scope.personalProcesado = $filter('filter')($scope.todoPersonal, query);
                } else {
                    var prom = ObtenerTodoPersonal($scope.usuario.empresa.id)
                    prom.then(function (personal) {
                        $scope.todoPersonal = personal.personal
                        $scope.personalProcesado = personal.personal
                        if (personal.mensaje !== undefined) {
                            $scope.mostrarMensaje(personal.mensaje)
                        }
                    }, function (err) {
                        $scope.mostrarMensaje("Se perdió la conexión.")
                    })
                }
            }
            $scope.establecerPersonal = function (personal) {

                var personalSeleccionado = { id: personal.id, persona: { nombre_completo: personal.persona.nombre_completo } }

            }

            $scope.obtenerListaSolicitudes = function (filtro) {
                $scope.paginator = Paginator();
                $scope.paginator.column = "fecha";
                $scope.paginator.direction = "desc";
                $scope.paginator.itemsPerPage = 10;
                var estado = { id: "" }
                if ($scope.usuario.autorizacion_caja_chica) {
                    estado = $scope.tiposEstados.find(function (estado) {
                        return estado.nombre == 'PENDIENTE'
                    })
                }

                $scope.paginator.callBack = $scope.listaSolicitudesCajaChica;
                if (filtro) {
                    $scope.filtro = filtro;
                    if ($scope.filtro.solicitudes_usuario_empleado) {
                        $scope.filtro.id_empleado_usuario = $scope.usuario.id_empleado
                    } else {
                        $scope.filtro.id_empleado_usuario = ""
                    }
                    $scope.paginator.getSearch("", $scope.filtro, null);

                } else {
                    $scope.filtro = {
                        empresa: $scope.usuario.id_empresa,
                        inicio: "",
                        fin: "",
                        solicitante: "",
                        autorizador: "",
                        usuario: "",
                        estado: estado.id,
                        concepto: "",
                        movimiento: "",
                        proveedor: "",
                        area: "",
                        campo: "",
                        doc: "",
                        solicitudes_usuario_empleado: "",
                        id_empleado_usuario: "",
                        id_usuario_no_autorizado: ($scope.usuario.autorizacion_caja_chica) ? "0" : ($scope.usuario.rolesUsuario[0].rol.nombre == $scope.diccionario.ROL_ADMINISTRADOR) ? '0' : $scope.usuario.id
                    }
                    // ($scope.usuario.autorizacion_caja_chica) ? "" : $scope.usuario.id
                    $scope.paginator.getSearch("", $scope.filtro, null);
                    $scope.filtro.estado = 0;
                }

            }

            $scope.listaSolicitudesCajaChica = function () {
                blockUI.start()
                if ($scope.paginator.filter.inicio != 0 && $scope.paginator.filter.fin != 0) {
                    $scope.paginator.filter.inicio = new Date($scope.convertirFecha($scope.filtro.inicio))
                    $scope.paginator.filter.fin = new Date($scope.convertirFecha($scope.filtro.fin))
                }
                var promesa = SolicitudesCajaPaginador($scope.paginator)
                promesa.then(function (datos) {
                    blockUI.stop()
                    $scope.paginator.setPages(datos.paginas);
                    $scope.solicitudesCajaChica = datos.solicitudes
                    $scope.montoTotalSolicitudes = 0
                    $scope.solicitudesCajaChica.forEach(function (dato) {
                        $scope.montoTotalSolicitudes = $scope.montoTotalSolicitudes + dato.monto
                    })
                })
            }
            $scope.verSolicitudCajaChica = function (datos) {

                $scope.solicitud = datos
                $scope.solicitud.ver = true
                $scope.abrirModalSolicitudCajaChica(true)

            }
            $scope.editarSolicitudCajaChica = function (datos) {
                if (datos.estado.nombre_corto == $scope.diccionario.CC_ESTADO_PENDIENTE) {
                    if ($scope.usuario.persona.id == datos.usuario.persona.id) {
                        $scope.solicitud = datos
                        $scope.solicitud.fecha = $scope.fechaATexto($scope.solicitud.fecha)
                        $scope.abrirModalSolicitudCajaChica(true)
                    }
                }
                if (datos.estado.nombre_corto == $scope.diccionario.CC_ESTADO_AUTORIZADO) {
                    if ($scope.usuario.persona.id == datos.autorizador.persona.id) {
                        $scope.solicitud = datos
                        $scope.solicitud.fecha = $scope.fechaATexto($scope.solicitud.fecha)
                        $scope.abrirModalSolicitudCajaChica(true)
                    }
                }
            }
            $scope.eliminarSolicitud = function () {
                $scope.tiposEstados.forEach(function (tipo, index, array) {
                    if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_ANULADO) {
                        $scope.solicitud.estado = tipo
                    }
                    if (index === (array.length - 1)) {
                        $scope.solicitud.eliminado = true
                        var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                        promesa.then(function (dato) {
                            $scope.obtenerListaSolicitudes()
                            $scope.cerrarModalEliminarSolicitud()
                            $scope.mostrarMensaje(dato.mensaje)
                        })
                    }

                });
            }

            $scope.verificarPerimisoAutorizacion = function (cuenta) {
                cuenta.nombre_usuario = $scope.usuario.nombre_usuario
                var promesa = VerificarUsuarioEmpresaCaja($scope.usuario.id_empresa, cuenta)
                promesa.then(function (dato) {
                    if (dato.type) {
                        $scope.mostrarMensaje(dato.message)
                        /*  cuenta.abierto= cuenta.abierto; */
                        if ($scope.tipoDatosPermiso == "autorizacion") {
                            $scope.tiposEstados.forEach(function (tipo, index, array) {
                                if (tipo.nombre_corto === $scope.diccionario.CC_ESTADO_AUTORIZADO) {
                                    $scope.solicitud.estado = tipo
                                }
                                if (index === (array.length - 1)) {
                                    $scope.solicitud.autorizador = $scope.usuario.id
                                    var promesa = GuardarSolicitudCajaChica($scope.solicitud)
                                    promesa.then(function (dato) {
                                        $scope.cerrarModalVerificarAutorizacion()
                                        $scope.mostrarMensaje(dato.mensaje)
                                    })
                                }

                            });
                        }
                    } else {
                        $scope.cerrarModalVerificarAutorizacion()
                        $scope.mostrarMensaje(dato.message)
                    }
                })
            }

            $scope.imprimirFiltroSolicitudCajaCarta = function (filtro) {
                blockUI.start();
                var estado;
                if (filtro.estado == "" || filtro.estado == undefined) {
                    estado = "0";
                } else {
                    estado = filtro.estado;
                }
                var empresa = $scope.usuario.id_empresa;
                var inicio = filtro.inicio ? filtro.inicio : "0";
                var fin = filtro.fin ? filtro.fin : "0";
                var solicitante = filtro.solicitante ? filtro.solicitante : "0";
                var autorizador = filtro.autorizador ? filtro.autorizador : "0";
                var usuario = filtro.usuario ? filtro.usuario : "0";
                var id_usuario_no_autorizado = ($scope.usuario.autorizacion_caja_chica) ? "0" : $scope.usuario.id

                var promesa = pruebaSolicitud(inicio, fin, empresa, estado, solicitante, usuario, id_usuario_no_autorizado)
                promesa.then(function (res) {
                    blockUI.stop();
                    var solicitudesCC = res.solicitudes

                    var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
                    var stream = doc.pipe(blobStream());
                    // draw some text

                    var y = 95, itemsPorPagina = 27, items = 0, pagina = 1, totalPaginas = Math.ceil(solicitudesCC.length / itemsPorPagina);;
                    $scope.dibujarCabeceraPDFSolicitudCC(doc, solicitudesCC, pagina, filtro, totalPaginas);

                    var index = 0;
                    for (var i = 0; i < solicitudesCC.length && items <= itemsPorPagina; i++) {
                        var solicitudes = solicitudesCC[i];

                        doc.font('Helvetica', 8);
                        index = index + 1;
                        doc.text(index, 40, y);
                        doc.text($scope.fechaATexto(solicitudes.fecha), 55, y);
                        doc.text(capitalize(solicitudes.solicitante.persona.nombre_completo.toLowerCase()), 100, y, { width: 140 });
                        if (solicitudes.autorizador) {
                            doc.text(capitalize(solicitudes.autorizador.persona.nombre_completo.toLowerCase()), 230, y, { width: 100 });
                        } else {
                            doc.text("", 230, y, { width: 110 });
                        }

                        var detalle = solicitudes.detalle.toString().replace("\n", " ");
                        doc.text(capitalize(detalle.toLowerCase()), 340, y, { width: 210 })
                        doc.text(formatNumber(solicitudes.monto), 550, y)

                        y = y + 25;
                        items++;

                        if (items == itemsPorPagina) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 90;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPDFSolicitudCC(doc, solicitudesCC, pagina, filtro, totalPaginas);
                        }
                    }

                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                });
            }


            $scope.dibujarCabeceraPDFSolicitudCC = function (doc, solicitudesCC, pagina, filtro, totalPaginas) {
                var usuario = $scope.usuario
                doc.font('Helvetica-Bold', 13);
                doc.text("REPORTE DE SOLICITUDES DE CAJA CHICA", 0, 40, { align: 'center' });
                doc.font('Helvetica-Bold', 10);
                if (filtro.inicio != "" && filtro.fin != "") {
                    doc.text("Del " + filtro.inicio + " al " + filtro.fin, 0, 55, { align: 'center' });
                }
                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 40, 80);
                doc.text("Fecha", 55, 80);
                doc.text("Beneficiario", 100, 80)
                doc.text("Autorizador", 230, 80)
                doc.text("Detalle", 340, 80)
                doc.text("Monto", 550, 80)

                doc.font('Helvetica', 8);
                doc.text("Usuario: " + usuario.persona.nombre_completo + ". Fecha Imp. " + $scope.fechaATexto(new Date()), 350, 750)

            }

            $scope.imprimirFiltroExcelSolicitudCajaCarta = function (filtro) {
                var estado;
                if (filtro.estado == "") {
                    estado = { id: "" }
                    if ($scope.usuario.autorizacion_caja_chica) {
                        estado = $scope.tiposEstados.find(function (estado) {
                            return estado.nombre == 'PENDIENTE'
                        })
                    }
                    estado = estado.id
                } else {
                    estado = filtro.estado;
                }
                var empresa = $scope.usuario.id_empresa;
                var inicio = filtro.inicio ? filtro.inicio : "0";
                var fin = filtro.fin ? filtro.fin : "0";
                var solicitante = filtro.solicitante ? filtro.solicitante : "0";
                var autorizador = filtro.autorizador ? filtro.autorizador : "0";
                var usuario = filtro.usuario ? filtro.usuario : "0";
                var id_usuario_no_autorizado = ($scope.usuario.autorizacion_caja_chica) ? "0" : $scope.usuario.id
                var promesa = pruebaSolicitud(inicio, fin, empresa, estado, solicitante, usuario, id_usuario_no_autorizado)
                promesa.then(function (res) {
                    blockUI.stop();
                    var solicitudesCC = res.solicitudes

                    var index = 0;
                    var data = [["Nro", "Sucursal", "Usuario", "Fecha", "Beneficiario", "Autorizador", "Concepto", "Detalle",
                        "Estado", "Monto"]]

                    for (var i = 0; i < solicitudesCC.length; i++) {
                        var solicitudes = solicitudesCC[i];
                        var columns = [];
                        index = index + 1;
                        //Numero
                        columns.push(index);
                        //Sucursal
                        var sucursal = solicitudes.sucursal.nombre;
                        columns.push(sucursal);

                        //usuario
                        columns.push(capitalize(solicitudes.usuario.persona.nombre_completo.toLowerCase()));

                        //Fecha
                        columns.push($scope.fechaATexto(solicitudes.fecha));

                        //Beneficiario
                        columns.push(capitalize(solicitudes.solicitante.persona.nombre_completo.toLowerCase()));

                        //Autorizador
                        if (solicitudes.autorizador) {
                            columns.push(capitalize(solicitudes.autorizador.persona.nombre_completo.toLowerCase()))
                        } else {
                            columns.push("-");
                        }

                        //Concepto
                        columns.push(capitalize(solicitudes.concepto.nombre.toLowerCase()));

                        //Detalle
                        columns.push(capitalize(solicitudes.detalle.toLowerCase().replace("\n", " ")));

                        //Estado
                        columns.push(capitalize(solicitudes.estado.nombre.toLowerCase()));

                        //monto
                        columns.push(formatNumber(solicitudes.monto));

                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-SOLICITUDES.xlsx");

                });
            }


            //para fondos a rendir
            $scope.abrirModalNivelFondoRendir = function () {
                $scope.nivelFr = { eliminado: false }
                $scope.obtenerNivelesGasto()
                $scope.abrirPopup($scope.idModalNivelFondoRendir);
            }

            $scope.cerrarModalNivelFondoRendir = function () {
                $scope.cerrarPopup($scope.idModalNivelFondoRendir);
            }
            $scope.abrirModalGastoFondoRendir = function () {
                $scope.gastoFr = { eliminado: false }
                $scope.usar_producto = true
                $scope.combustible_recorrido = false
                $scope.obtenerNivelesGasto()
                $scope.abrirPopup($scope.idModalGastoFondoRendir);
            }
            $scope.cerrarModalGastoFondoRendir = function () {
                $scope.cerrarPopup($scope.idModalGastoFondoRendir);
            }
            $scope.abrirModalPanelGastoFondo = function () {
                $scope.abrirPopup($scope.idModalPanelGastoFondo);
            }
            $scope.editarGastoFondo = function (key) {
                $scope.rendicionFondo = $scope.solicitud.rendicionFondo
                $scope.ingresoGasto = { eliminado: false, gasto: null, area: $scope.solicitud.solicitante.empleadosFichas[$scope.solicitud.solicitante.empleadosFichas.length - 1].area }
                $scope.rendicionFondo.fecha = $scope.fechaATexto($scope.rendicionFondo.fecha)
                if ($scope.rendicionFondo.fecha_salida) $scope.rendicionFondo.fecha_salida = $scope.fechaATexto($scope.rendicionFondo.fecha_salida)
                if ($scope.rendicionFondo.fecha_entrada) $scope.rendicionFondo.fecha_entrada = $scope.fechaATexto($scope.rendicionFondo.fecha_entrada)

                switch (key) {
                    case 'ver':
                        $scope.rendicionFondo.ver = true
                        $scope.calcularTotalFondoARendirEditar()
                        $scope.abrirModalPanelGastoFondo()
                        $scope.llenarCentroCostos()
                        break;
                    case 'editar':
                        var promesa = ObtenerDatosSolicitudID($scope.solicitud.id)
                        promesa.then(function (dato) {
                            bool = dato.solicitud.cajasChicas.find(elem => {
                                return elem.concepto.nombre == 'DEVOLUCION'
                            })
                            if (!bool) {
                                $scope.solicitud = dato.solicitud
                                $scope.calcularTotalFondoARendirEditar()
                                $scope.abrirModalPanelGastoFondo()
                                $scope.llenarCentroCostos()
                            } else {
                                SweetAlert.swal("Adventencia", "No se puede realizar la edicion porque el registro ya cuenta con una devolucion realizada!", "warning");
                            }
                        })
                        break;
                    case 'imprimir':
                        $scope.rendicionFondo.gastos = $scope.rendicionFondo.gastos.sort(function (a, b) {
                            return a.id_gasto < b.id_gasto
                        })
                        if ($scope.rendicionFondo.rendicion.nombre_corto != $scope.diccionario.CC_RENDICION_INTERNA) {

                        }
                        $scope.generarPdfFondoARendir()
                        $scope.calcularTotalFondoARendir()
                        break;
                    default:
                        break;
                }
                $scope.cerrarModalFondoRendirEdicionSolicitud()
            }
            $scope.llenarCentroCostos = function () {
                $scope.rendicionFondo.gastos.forEach(function (gasto) {
                    gasto.centrosCosto = gasto.datosCentrosCosto.map(function (centros) {
                        return centros.centro_costo
                    })
                })
            }
            $scope.asignarCompra = function (compra) {
                $scope.ingresoGasto.fecha = $scope.fechaATexto(compra.fecha)
                $scope.ingresoGasto.numero_factura_recargo = compra.factura ? compra.factura : compra.numero_iso_compra
                $scope.ingresoGasto.monto = compra.total
                $scope.ingresoGasto.id_compra = compra.id
                $scope.ingresoGasto.compra_rendido = compra.compra_rendida
                $scope.ingresoGasto.movimiento = compra.movimiento.clase.nombre
                if ($scope.ingresoGasto.movimiento === 'FACTURAS' || $scope.ingresoGasto.movimiento === 'IMPORTACIONES') {
                    $scope.ingresoGasto.usar_factura = true
                    $scope.ingresoGasto.cop_usar_factura = true
                } else {
                    $scope.ingresoGasto.usar_factura = false
                    $scope.ingresoGasto.cop_usar_factura = false
                }
            }
            $scope.obterDatosCompras = async function () {
                try {
                    let caja = $scope.solicitud.cajasChicas[0]
                    let res = await ComprasRendicionDoc(caja.sucursal, caja.numero_correlativo)
                    $scope.comprasDeLaRendicion = res.compras
                    $scope.comprasRendicionTemporal = angular.copy(res.compras)

                } catch (error) {
                    console.log(error)
                }
                $scope.$evalAsync()
            }
            $scope.verificarDatosPanelGastoFondo = function (id) {
                var promesa = ObtenerDatosSolicitudFondoARendir(id)
                promesa.then(function (dato) {
                    $scope.solicitud = dato.solicitud
                    $scope.obterDatosCompras()
                    $scope.datosImprecion = dato.datosImp
                    if ($scope.solicitud.rendicionFondo) {
                        $scope.abrirModalFondoRendirEdicionSolicitud()
                    } else {
                        if ($scope.solicitud.cajasChicas.length > 1) {
                            $scope.mostrarMensaje('La solocitud ya tiene registros realizados en caja chica no se puede efecctuar el fondo a rendir!')
                        } else {
                            $scope.ingrsoGasto = { eliminado: false, gasto: null, area: $scope.solicitud.solicitante.empleadosFichas[$scope.solicitud.solicitante.empleadosFichas.length - 1].area }
                            $scope.rendicionFondo = { eliminado: false, gastos: [] }
                            $scope.rendicionFondo.conductor = $scope.choferesViaje.find(function (x) {
                                return x.id_empleado == $scope.solicitud.solicitante.id
                            })

                            $scope.rendicionFondo.conductor = $scope.rendicionFondo.conductor ? $scope.rendicionFondo.conductor : 0
                            $scope.seleccionarCentrosCosto($scope.solicitud.solicitante.campo)
                            $scope.km_recorridos = 0
                            $scope.km_litros = 0
                            $scope.km_bs = 0
                            $scope.totalGastoFr = 0
                            $scope.totalRestante = $scope.solicitud.monto
                            $scope.abrirModalPanelGastoFondo()
                        }
                    }
                })
            }

            $scope.cerrarModalPanelGastoFondo = function () {
                $scope.cerrarPopup($scope.idModalPanelGastoFondo);
            }
            $scope.abrirModalVehiculosViaje = function (tipo) {
                $scope.clase = { habilitado: true }
                $scope.tipo_edicion = tipo;
                $scope.abrirPopup($scope.idModalVehiculosViaje);
            }
            $scope.cerrarModalVehiculosViaje = function () {
                $scope.cerrarPopup($scope.idModalVehiculosViaje);
            }
            $scope.abrirModalConductoresViaje = function () {
                $scope.abrirPopup($scope.idModalConductoresViaje);
            }
            $scope.cerrarModalConductoresViaje = function () {
                $scope.cerrarPopup($scope.idModalConductoresViaje);
            }
            $scope.abrirDialogConceptoEdicion = function (tipo) {
                $scope.tipo_edicion = tipo;
                $scope.clase = {};
                $scope.abrirPopup($scope.idModalConceptoEdicion);
            }
            $scope.cerrarDialogConceptoEdicion = function () {
                $scope.cerrarPopup($scope.idModalConceptoEdicion);
            }
            $scope.abrirModalFondoRendirEdicionSolicitud = function () {
                $scope.abrirPopup($scope.idModalFondoRendirEdicionSolicitud);
            }
            $scope.cerrarModalFondoRendirEdicionSolicitud = function () {
                $scope.cerrarPopup($scope.idModalFondoRendirEdicionSolicitud);
            }

            //nivel
            $scope.obtenerNivelesGasto = function () {
                $scope.nivelesFr = []
                var promesa = ObtenerNivelesCajaChica($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.nivelesFr = dato.niveles
                })
            }
            $scope.agregarNivelFondoARendir = function () {
                if ($scope.nivelFr.editar) {
                    $scope.nivelFr = { eliminado: true }
                } else {
                    if ($scope.nivelesFr.length > 0) {
                        var nivelMayor = $scope.nivelesFr.reduce(function (r, a) {
                            if (r.numero > a.numero) { return r } else { return a }
                        }, {})
                        $scope.nivelFr.numero = nivelMayor.numero + 1
                        $scope.nivelesFr.push($scope.nivelFr)
                        $scope.nivelFr = { eliminado: false }
                    } else {
                        $scope.nivelFr.numero = 1
                        $scope.nivelesFr.push($scope.nivelFr)
                        $scope.nivelFr = { eliminado: false }
                    }
                }

            }
            $scope.editarNivelFondoARendir = function () {
                $scope.nivelFr = {}
            }
            $scope.modificarNivelFondoARendir = function (key, nivel, index) {
                switch (key) {
                    case 'subir-nivel':
                        $scope.nivelesFr.forEach(function (n, i, a) {
                            if (n.numero === (nivel.numero - 1)) {
                                n.numero = n.numero + 1
                            }
                            if (i === (a.length - 1)) {
                                nivel.numero = nivel.numero - 1
                            }
                        })
                        break;
                    case 'editar':
                        $scope.nivelFr = nivel
                        $scope.nivelFr.editar = true
                        break;
                    case 'eliminar':
                        if (nivel.id) {
                            nivel.eliminado = true
                        } else {
                            $scope.nivelesFr.splice(index, 1)
                        }

                        break;
                    default:
                        break;
                }

            }
            $scope.guardarNivelesFondoARendir = function () {
                var promesa = GuardarNivelesCajaChica($scope.nivelesFr, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.obtenerNivelesGasto()
                    $scope.cerrarModalNivelFondoRendir()
                })
            }
            //gasto
            $scope.obtenerGastosFr = function () {
                $scope.gastosFr = []
                var promesa = ObtenerGastosCajaChica($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.gastosFr = dato.gastos
                })
            }

            $scope.agregarGastoFondoARendir = function (combustible_recorrido, usar_producto) {
                $scope.gastoFr.usar_producto = usar_producto
                $scope.gastoFr.combustible_recorrido = combustible_recorrido
                if ($scope.gastoFr.cuenta.id) {
                    if ($scope.gastoFr.editar) {
                        $scope.gastoFr = { eliminado: true }
                        $scope.usar_producto = true
                        $scope.combustible_recorrido = false
                    } else {
                        if ($scope.gastosFr.length > 0) {
                            var nivelMayor = $scope.gastosFr.reduce(function (r, a) {
                                if (r.numero > a.numero) { return r } else { return a }
                            }, {})
                            $scope.gastoFr.numero = nivelMayor.numero + 1
                            $scope.gastosFr.push($scope.gastoFr)
                            $scope.gastoFr = { eliminado: false }
                            $scope.usar_producto = true
                            $scope.combustible_recorrido = false
                        } else {
                            $scope.gastoFr.numero = 1
                            $scope.gastosFr.push($scope.gastoFr)
                            $scope.gastoFr = { eliminado: false }
                            $scope.usar_producto = true
                            $scope.combustible_recorrido = false
                        }
                    }
                } else {
                    $scope.validarCuenta = true
                }
            }
            $scope.modificarGastoFondoARendir = function (key, gasto, index) {
                switch (key) {
                    case 'subir-nivel':
                        $scope.gastosFr.forEach(function (g, i, a) {
                            if (g.numero === (gasto.numero - 1)) {
                                g.numero = g.numero + 1
                            }
                            if (i === (a.length - 1)) {
                                gasto.numero = gasto.numero - 1
                            }
                        })
                        break;
                    case 'editar':
                        $scope.gastoFr = gasto
                        $scope.usar_producto = gasto.usar_producto
                        $scope.combustible_recorrido = gasto.combustible_recorrido
                        $scope.gastoFr.editar = true
                        break;
                    case 'eliminar':
                        if (gasto.id) {
                            gasto.eliminado = true
                        } else {
                            $scope.gastosFr.splice(index, 1)
                        }

                        break;
                    default:
                        break;
                }
            }
            $scope.guardarGastosFondoARendir = function () {
                var promesa = GuardarGastosCajaChica($scope.gastosFr, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.obtenerGastosFr()
                    $scope.cerrarModalGastoFondoRendir()
                })
            }
            $scope.buscarCuentasCajaChica = function (query) {

                return NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, null, null, null, query)
            }
            $scope.establecerCuenta = function (cuenta) {
                if (cuenta.id) {
                    $scope.validarCuenta = false
                } else {
                    $scope.validarCuenta = true
                }

            }
            //detalle fondo
            $scope.agregarDetalleFondoARendir = function (ingresoGasto) {
                if (!ingresoGasto.editar) {
                    if ($scope.ingresoGasto.id_compra && $scope.ingresoGasto.usar_factura != $scope.ingresoGasto.cop_usar_factura) { toastr.warning("No coinciden el tipo de movimiento de la Compra Seleccionada"); return true }
                    //}else{
                    $scope.ingresoGasto.fecha = new Date($scope.convertirFecha($scope.ingresoGasto.fecha))
                    $scope.rendicionFondo.gastos.push(ingresoGasto)
                    $scope.ingresoGasto = { fecha: $scope.fechaATexto(new Date()), eliminado: false, gasto: null, area: null }
                    $scope.limpiarMultiSelect($scope.campamento)
                    $timeout(function () {
                        $scope.seleccionarArtosCentrosCosto(ingresoGasto.centrosCosto)
                    }, 500);
                    if (ingresoGasto.id_compra) { //para quitar la lista de compra
                        let index = $scope.comprasDeLaRendicion.findIndex(compra => compra.id == ingresoGasto.id_compra)
                        if (index != -1) $scope.comprasDeLaRendicion.splice(index, 1)
                    }
                    $scope.calcularTotalFondoARendir()
                    $scope.gastoNoAsignado = false
                    $scope.enfocar('gastoinput')
                    //}

                } else {
                    $scope.ingresoGasto.editar = false
                    $scope.ingresoGasto.fecha = new Date($scope.convertirFecha($scope.ingresoGasto.fecha))
                    $scope.ingresoGasto = { eliminado: false, gasto: null, area: null }
                    $scope.limpiarMultiSelect($scope.campamento)
                    $timeout(function () {
                        $scope.seleccionarArtosCentrosCosto(ingresoGasto.centrosCosto)
                    }, 500);
                    $scope.calcularTotalFondoARendir()
                    $scope.gastoNoAsignado = false
                    $scope.enfocar('gastoinput')

                }
                $scope.calcularTotalFondoARendir()
            }

            //rendiciones
            //
            $scope.obtenerTipoRendiciones = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RDFG_CCH", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.tipoRendiciones = entidad
                    blockUI.stop();
                });
            }
            //vehiculo
            $scope.obtenerTipoLicenciaVehiculo = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_TLVVIA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.TiposLicenciasVehiculo = entidad
                    blockUI.stop();
                });
            }

            $scope.obtenerVehiculosViaje = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_VVIA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.vehiculosViaje = entidad
                    blockUI.stop();
                });
            }
            $scope.agregarVehiculo = function (clase) {
                clase.nombre = clase.vehiculo + "-" + clase.placa
                if (clase.nombre && clase.nombre_corto) {
                    if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
                        $scope.tipo_edicion.clases.push(clase);
                    }
                    $scope.clase = { habilitado: true }
                }

            }
            $scope.modificarConceptoEdicionVehiculo = function (clase) {
                var datosVehiculo = clase.nombre.split("-")
                clase.vehiculo = datosVehiculo[0]
                clase.placa = datosVehiculo[1]
                $scope.clase = clase;
            }

            $scope.guardarConceptoEdicionVehiculo = function (tipo) {
                blockUI.start();
                Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
                    var promesa = ClasesTipo(tipo.nombre_corto);
                    promesa.then(function (entidad) {
                        tipo = entidad
                        blockUI.stop();
                        $scope.cerrarModalVehiculosViaje();
                        $scope.mostrarMensaje('Guardado Exitosamente!');
                    });
                });
            }
            //conductores
            $scope.agregarConductor = function (conductor) {
                conductor.habilitado = true
                $scope.choferesViaje.push(conductor);
                $scope.conductor = {}
            }
            $scope.editarConductor = function (conductor) {
                $scope.conductor = conductor
            }
            $scope.filtrarConductor = function (tipo) {
                if (tipo) {
                    $scope.tipoConductor = { id_empleado: tipo }
                } else {
                    $scope.tipoConductor = {}
                }

            }
            $scope.guardarConductores = function () {
                var promesa = GuardarConductoresEmpresa($scope.usuario.id_empresa, $scope.choferesViaje)
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.obtenerChoferesViaje()
                    $scope.cerrarModalConductoresViaje()
                })
            }
            $scope.obtenerChoferesViaje = function () {
                var promesa = ListaChoferesViaje($scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.choferesViaje = dato
                })
            }
            //conceptos edicion
            $scope.agregarConceptoEdicion = function (clase) {
                if (clase.nombre && clase.nombre_corto) {
                    if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
                        $scope.tipo_edicion.clases.push(clase);
                    }
                    $scope.clase = {}
                }
            }
            $scope.modificarConceptoEdicion = function (clase) {
                $scope.clase = clase;
            }
            $scope.removerConceptoEdicion = function (clase) {
                clase.eliminado = true;
            }

            $scope.guardarConceptoEdicion = function (tipo) {
                blockUI.start();
                Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
                    var promesa = ClasesTipo(tipo.nombre_corto);
                    promesa.then(function (entidad) {
                        tipo = entidad
                        blockUI.stop();
                        $scope.cerrarDialogConceptoEdicion();
                        $scope.mostrarMensaje('Guardado Exitosamente!');
                    });
                });
            }

            $scope.establecerGasto = function (model) {
                if (model) {
                    if (model.id) {
                        $scope.gastoNoAsignado = false
                    } else {
                        $scope.gastoNoAsignado = true
                    }
                }
            }
            //rendicion de fondos
            //editar detalles
            $scope.editarDetalleRendicionFondo = function (key, model, index) {
                switch (key) {
                    case 'editar':
                        $scope.ingresoGasto = model
                        $scope.ingresoGasto.fecha = $scope.fechaATexto($scope.ingresoGasto.fecha)
                        $scope.ingresoGasto.editar = true
                        $scope.seleccionarArtosCentrosCosto($scope.ingresoGasto.centrosCosto)
                        $scope.calcularTotalFondoARendir()
                        break;
                    case 'eliminar':
                        if (model.id_compra && !model.id) {
                            let compraObtenido = $scope.comprasRendicionTemporal.find(compra => compra.id == model.id_compra)
                            $scope.comprasDeLaRendicion.push(compraObtenido)
                        }
                        if (model.id) {
                            model.eliminado = true
                        } else {
                            $scope.rendicionFondo.gastos.splice(index, 1)
                        }
                        $scope.calcularTotalFondoARendir()


                        break;
                    case 'activar':
                        if ($scope.totalRestante < model.monto) {
                            $scope.mostrarMensaje("El monto del detalle es mayor al monto restante el cual es: " + $scope.totalRestante + ", primero tiene que editar el monto para poder habilitar el detalle.")
                        } else {
                            if (model.id) {
                                model.eliminado = false
                            }
                            $scope.calcularTotalFondoARendir()
                        }
                        break;
                    default:
                        break;
                }
            }
            //total fonddos a rendir
            $scope.calcularTotalFondoARendir = function () {
                $scope.km_recorridos = $scope.rendicionFondo.odometro_entrada - $scope.rendicionFondo.odometro_salida
                $scope.km_litros = $scope.rendicionFondo.litros / $scope.km_recorridos
                $scope.totalGastoFr = $scope.rendicionFondo.gastos.reduce(function (valor, gasto) {
                    return (gasto.eliminado || gasto.editar) ? valor : valor + gasto.monto
                }, 0)
                $scope.totalGastos = $scope.rendicionFondo.gastos.filter(function (gasto) { return gasto.monto }).reduce(function (importe, gastos) {
                    return (gastos.eliminado || gastos.editar) ? importe : importe + gastos.monto
                }, 0)
                $scope.km_bs = $scope.totalGastoFr / $scope.km_recorridos
                $scope.totalRestante = $scope.solicitud.monto - $scope.totalGastoFr
            }
            $scope.calcularTotalFondoARendirEditar = function () {
                $scope.km_recorridos = $scope.rendicionFondo.odometro_entrada - $scope.rendicionFondo.odometro_salida
                $scope.km_litros = $scope.km_recorridos / $scope.rendicionFondo.litros
                $scope.totalGastoFr = $scope.rendicionFondo.gastos.filter(function (gasto) {
                    return gasto.gasto.id_nivel == 1;
                }).reduce(function (valor, gasto) {
                    return (gasto.eliminado || gasto.editar) ? valor : valor + gasto.monto
                }, 0)
                $scope.km_bs = $scope.totalGastoFr / $scope.km_recorridos
                $scope.totalGastos = $scope.rendicionFondo.gastos.filter(function (gasto) { return gasto.monto }).reduce(function (importe, gastos) {
                    return (gastos.eliminado || gastos.editar) ? importe : importe + gastos.monto
                }, 0)
                $scope.totalRestante = $scope.solicitud.monto - $scope.totalGastoFr
            }
            $scope.guardarRendicionDeFondo = function () {
                if ($scope.rendicionFondo.id) {
                    var value = $scope.rendicionFondo.gastos.filter(function (x) {
                        return x.eliminado == false
                    })
                    if (value.length == 0) {
                        return $scope.mostrarMensaje("No se puede guardar el fondo a rendir sin detalle de gastos!")
                    }
                }

                $scope.rendicionFondo.solicitud = { id: $scope.solicitud.id, id_sucursal: $scope.solicitud.id_sucursal }
                $scope.rendicionFondo.fecha = new Date($scope.convertirFecha($scope.rendicionFondo.fecha))
                $scope.rendicionFondo.id_empresa = $scope.usuario.id_empresa
                if ($scope.rendicionFondo.fecha_salida) $scope.rendicionFondo.fecha_salida = new Date($scope.convertirFecha($scope.rendicionFondo.fecha_salida))
                if ($scope.rendicionFondo.fecha_entrada) $scope.rendicionFondo.fecha_entrada = new Date($scope.convertirFecha($scope.rendicionFondo.fecha_entrada))
                $scope.rendicionFondo.total = $scope.totalGastos
                var promesa = GuardarRendicionDeFondo($scope.rendicionFondo)
                promesa.then(function (dato) {
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.cerrarModalPanelGastoFondo()
                    $scope.rendicionFondo = dato.fr
                    $scope.rendicionFondo.fecha = $scope.fechaATexto($scope.rendicionFondo.fecha)
                    $scope.datosImprecion = dato.datosImp
                    $scope.rendicionFondo.fecha_salida = $scope.fechaATexto($scope.rendicionFondo.fecha_salida)
                    $scope.rendicionFondo.fecha_entrada = $scope.fechaATexto($scope.rendicionFondo.fecha_entrada)
                    $scope.generarPdfFondoARendir()
                })
            }

            $scope.generarPdfFondoARendir = function () {
                blockUI.start();
                var delayImagen = ObtenerImagen($scope.usuario.empresa.imagen);
                delayImagen.then(function (imagen) {
                    var doc = new PDFDocument({ size: 'letter', margin: 10 });
                    var stream = doc.pipe(blobStream());
                    // draw some text
                    var totalCosto = 0;
                    var y = 135, totalGasto = 0, saldo = 0, itemsPorPagina = 28, items = 0, pagina = 1, totalPaginas = 2;
                    $scope.dibujarCabeceraPDFFondoARendir(doc, 1, totalPaginas, imagen);
                    doc.font('Helvetica', 8);
                    var centrosCosto = []
                    var yCuadro = 0;
                    for (var i = 0; i < $scope.datosImprecion.length && items <= itemsPorPagina; i++) {
                        var nivel = $scope.datosImprecion[i]
                        nivel.total = 0
                        //doc.rect(25, y - 5, 0, 20).stroke();
                        // doc.rect(580, y - 5, 0, 20).stroke();
                        doc.text(nivel.nombre.toUpperCase(), 45, y);
                        y = y + 20;
                        items++;
                        for (var j = 0; j < nivel.gastos.length; j++) {
                            var gasto = nivel.gastos[j];
                            gasto.total = gasto.detallesRendicionesFondos.reduce(function (total, detalle) {
                                return total + detalle.monto
                            }, 0)
                            centrosCosto = gasto.detallesRendicionesFondos.reduce(function (cc, detalle) {
                                if (detalle.datosCentrosCosto.length > 0) {
                                    if (cc.length > 0) {

                                        var detalleCentroCosto = detalle.datosCentrosCosto.reduce(function (val, x) {
                                            var bandera = false
                                            cc.forEach(function (centro, i, a) {
                                                if (centro === x.centro_costo.nombre) {
                                                    bandera = true
                                                }
                                            })
                                            if (bandera) {
                                                return val
                                            } else {
                                                return val.concat(x)
                                            }
                                        }, [])
                                        if (detalleCentroCosto.length > 0) {
                                            return cc.concat(detalleCentroCosto.map(function (x) {
                                                return x.centro_costo.nombre
                                            }))
                                        } else {
                                            return cc
                                        }
                                    } else {
                                        return cc.concat(detalle.datosCentrosCosto.map(function (x) {
                                            return x.centro_costo.nombre
                                        }))
                                    }
                                } else {
                                    return cc
                                }

                            }, centrosCosto)
                            nivel.total = nivel.total + gasto.total
                            //doc.rect(25, y - 5, 0, 20).stroke();
                            //doc.rect(580, y - 5, 0, 20).stroke();
                            if (gasto.nombre.length > 20) {
                                doc.text(gasto.nombre.substr(0, 20) + "...", 40, y, { width: 120 });
                            } else {
                                doc.text(gasto.nombre, 40, y, { width: 120 });
                            }

                            doc.text("Bs. " + $scope.number_format(gasto.total, 2), 165, y);
                            for (var l = 0; l < gasto.detallesRendicionesFondos.length; l++) {
                                var detalle = gasto.detallesRendicionesFondos[l];
                                //doc.rect(25, y - 5, 0, 20).stroke();
                                //doc.rect(580, y - 5, 0, 20).stroke();
                                doc.text($scope.fechaATexto(detalle.fecha), 220, y, { width: 50 });
                                let tipo = detalle.usar_factura ? "F-" : "R-";
                                var detalleRen = tipo + detalle.numero_factura_recargo + " " + detalle.detalle.substr(0, 40) + ((detalle.detalle.length > 60) ? "..." : ".")
                                doc.text(detalleRen, 275, y, { width: 190 });

                                doc.text("Bs. " + $scope.number_format(detalle.monto, 2), 510, y, { width: 50 });
                                y = y + 20;
                                items++;

                            }
                            if (j == nivel.gastos.length - 1) {
                                doc.rect(25, y - 5, 555, 20).stroke();
                                if ($scope.rendicionFondo.rendicion.nombre_corto === $scope.diccionario.CC_RENDICION_INTERNA) {
                                    doc.text(centrosCosto, 210, 95, { width: 220 });
                                } else {
                                    doc.text(centrosCosto, 80, 115, { width: 220 });
                                }

                                doc.text("TOTAL " + nivel.nombre.toUpperCase() + "   " + $scope.number_format(nivel.total, 2), 55, y);
                            }
                            if (y >= 600) {
                                doc.addPage({ margin: 0, bufferPages: true });
                                y = 135;
                                items = 0;
                                pagina = pagina + 1;
                                $scope.dibujarCabeceraPDFFondoARendir(doc, pagina, totalPaginas, imagen);
                                doc.font('Helvetica', 8);
                                doc.text(nivel.nombre.toUpperCase(), 45, y);
                                y = y + 20;
                            }
                        }
                        /*  doc.rect(25, 115, 555, y - 120).stroke();*/


                        totalGasto = totalGasto + nivel.total
                        y = y + 20;
                        items++;
                        // if (items == itemsPorPagina) {
                        //     doc.addPage({ margin: 0, bufferPages: true });
                        //     y = 135;
                        //     items = 0;
                        //     pagina = pagina + 1;
                        //     $scope.dibujarCabeceraPDFFondoARendir(doc, pagina, totalPaginas, imagen);
                        //     doc.font('Helvetica', 8);
                        // }
                    }
                    doc.rect(25, 80, 555, y - 10).stroke();

                    y = y + 20;
                    doc.font('Helvetica', 14);
                    doc.text("TOTAL GASTO", 25, y);
                    doc.text($scope.number_format(totalGasto, 2), 155, y);
                    y = y + 15;
                    doc.text("TOTAL INGRESOS", 25, y);
                    doc.text($scope.number_format($scope.solicitud.monto, 2), 155, y);
                    y = y + 15;
                    doc.text("SALDO", 25, y);
                    doc.text($scope.number_format($scope.solicitud.monto - totalGasto, 2), 155, y);
                    y = y + 70;
                    doc.font('Helvetica', 8);
                    doc.text("CONDUCTOR", 90, y, { width: 200, align: "center" });
                    doc.text($scope.solicitud.solicitante.persona.nombre_completo.toUpperCase(), 90, y - 10, { width: 200, align: "center" });
                    doc.text("AUTORIZADOR", 360, y, { width: 200, align: "center" });
                    doc.text($scope.solicitud.autorizador.persona.nombre_completo.toUpperCase(), 360, y - 10, { width: 200, align: "center" });
                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                });
                blockUI.stop();

            }

            $scope.dibujarCabeceraPDFFondoARendir = function (doc, pagina, totalPaginas, imagen) {
                doc.font('Helvetica-Bold', 12);
                doc.image(imagen, 30, 20, { fit: [80, 80] });
                if ($scope.rendicionFondo.rendicion.nombre_corto === $scope.diccionario.CC_RENDICION_INTERNA) {
                    doc.text("RENDICIÓN DE FONDOS", 0, 55, { align: "center" });
                    doc.rect(505, 50, 75, 15).stroke();
                    doc.text("Nro.", 510, 52);
                    doc.font('Helvetica', 8);
                    doc.text("DOCUMENTO " + $scope.solicitud.cajasChicas[0].numero_correlativo, 0, 70, { align: "center" });
                    doc.font('Helvetica-Bold', 8);
                    doc.rect(25, 120, 555, 0).stroke();
                    doc.text("BENEFICIARIO:", 30, 85);
                    doc.text("FONDO A RENDIR:", 30, 95);
                    doc.text("DESTINOS:", 160, 95, { width: 220 });
                    doc.text("FECHA:", 30, 105);
                    //TABLA
                    /*  doc.rect(30, 115, 555, 30).stroke(); */
                    doc.font('Helvetica-Bold', 8);
                    doc.text("DETALLE DE GASTO", 45, 125);
                    doc.text("FECHA", 225, 125, { width: 50 });
                    doc.text("DOC. DETALLE", 320, 125, { width: 60 });
                    doc.text("GASTO", 510, 125, { width: 50 });
                    doc.font('Helvetica', 12);
                    doc.text($scope.rendicionFondo.numero_correlativo, 540, 52);
                    doc.font('Helvetica', 8);
                    doc.text($scope.solicitud.solicitante.persona.nombre_completo, 100, 85);
                    doc.text($scope.number_format($scope.solicitud.monto, 2), 120, 95);
                    doc.text($scope.rendicionFondo.fecha, 70, 105);
                    doc.text("PÁGINA " + pagina, 0, 740, { align: "center" });
                } else {
                    doc.text("RENDICIÓN DE FONDOS CONDUCTOR", 0, 55, { align: "center" });

                    doc.rect(505, 50, 75, 15).stroke();
                    doc.text("Nro. ", 510, 55);
                    doc.rect(25, 130, 555, 0).stroke();
                    doc.font('Helvetica', 8);
                    doc.text("DOCUMENTO " + $scope.solicitud.cajasChicas[0].numero_correlativo, 0, 70, { align: "center" });

                    doc.font('Helvetica-Bold', 8);

                    doc.text("CONDUCTOR:", 30, 85);
                    doc.text("FONDO A RENDIR:", 30, 95);
                    doc.text("FECHA:", 30, 105);
                    //>>>>>>>>
                    doc.text("ODOMETRO:", 300, 85);
                    doc.text("Inicio: ", 350, 85);
                    doc.text("fin: ", 440, 85);
                    doc.text("RECORRIDO:", 300, 95);
                    doc.text("Km/Lts:", 300, 105);
                    doc.text("BsxKm:", 380, 105);
                    doc.text("FECHA SALIDA:", 300, 115);
                    doc.text("FECHA LLEGADA:", 420, 115);
                    doc.text("DESTINOS:", 30, 115);
                    doc.font('Helvetica', 12);
                    doc.text($scope.rendicionFondo.numero_correlativo, 540, 55);
                    doc.font('Helvetica', 8);
                    doc.text($scope.rendicionFondo.conductor.nombre, 100, 85);
                    doc.text($scope.number_format($scope.solicitud.monto, 2), 120, 95);
                    doc.text($scope.rendicionFondo.fecha, 70, 105);
                    //>>>>>>>>
                    doc.text($scope.rendicionFondo.odometro_salida.toFixed(2), 380, 85);
                    doc.text($scope.rendicionFondo.odometro_entrada.toFixed(2), 460, 85);
                    doc.text($scope.km_recorridos.toFixed(2), 370, 95);
                    doc.text($scope.km_litros.toFixed(2), 340, 105);
                    doc.text($scope.km_bs.toFixed(2), 420, 105);
                    doc.text($scope.rendicionFondo.fecha_salida, 365, 115);
                    doc.text($scope.rendicionFondo.fecha_entrada, 495, 115);
                    //TABLA  
                    doc.text("PÁGINA " + pagina, 0, 740, { align: "center" });
                    var fechaActual = new Date();
                    var min = fechaActual.getMinutes();
                    if (min < 10) {
                        min = "0" + min;
                    }
                    doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 450, 750);
                    doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 550, 750);

                }
            }

            $scope.seleccionarCentrosCosto = function (campo) {
                for (var i = 0; i < $scope.campamento.length; i++) {
                    if ($scope.campamento[i].id == campo.id) {
                        $scope.campamento[i].ticked = true;

                    } else {
                        $scope.campamento[i].ticked = false;
                    }
                }
            }
            $scope.seleccionarArtosCentrosCosto = function (campos) {
                for (var i = 0; i < $scope.campamento.length; i++) {
                    if (campos) {
                        for (var j = 0; j < campos.length; j++) {
                            var campo = campos[j];
                            if ($scope.campamento[i].id == campo.id) {
                                $scope.campamento[i].ticked = true;

                            }
                        }
                    }
                }
            }
            $scope.activarFechas = function () {
                setTimeout(function () {
                    aplicarDatePickers();
                }, 200);
            }

            //proveedores solicitud
            $scope.buscarProveedor = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            };

            $scope.establecerProveedor = function (proveedor) {
                if (proveedor.id) {
                    $scope.solicitud.proveedor = proveedor;
                } else {
                    $scope.errorSolicitudProveedor = true
                }
            }
            $scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
                if (keyEvent.which === 13) {
                    if (esEnfocar) {
                        $scope.enfocar(elemento);
                    } else {
                        $timeout(function () {
                            $('#' + elemento).trigger('click');
                        }, 0);
                    }
                }
            }
            //fin proveedores solicitud
            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalSolicitudCajaChica);
                $scope.eliminarPopup($scope.idModalConceptosMovimiento)
                $scope.eliminarPopup($scope.idModalEliminarSolicitud)
                $scope.eliminarPopup($scope.idModalVerificarAutorizacion)
                $scope.eliminarPopup($scope.idModalNivelFondoRendir)
                $scope.eliminarPopup($scope.idModalGastoFondoRendir)
                $scope.eliminarPopup($scope.idModalPanelGastoFondo);
                $scope.eliminarPopup($scope.idModalVehiculosViaje);
                $scope.eliminarPopup($scope.idModalConductoresViaje);
                $scope.eliminarPopup($scope.idModalConceptoEdicion);
                $scope.eliminarPopup($scope.idModalFondoRendirEdicionSolicitud);

            });

            $scope.inicio();
        }]);



