angular.module('agil.controladores')

    .controller('controladorTransacciones', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'ObtenerTodoPersonal', 'TransaccionBancoPaginador', '$timeout',
        'Paginator', 'ListaBancos', 'ClasesTipo', 'ClasesTipoEmpresa', 'TransaccionIngresoBanco', 'FieldViewer', 'TransaccionSeguimientoBanco', 'TransaccionSeguimientoEstado', 'TransaccionRevisionEstado',
        'SaldoCuenta', 'SaldoDisponibleCuenta', 'SaldoProformas', 'ObtenerImagen', 'ObtenerComprobanteTransaccion', 'Tipos', 'GuardarEdicionTransaccion','SaldoProformasEdic','elimDetalleTransacEdicion',
        'SweetAlert','ListaProformasXcobrar','TransaccionBancoPaginadorInicio','ListaProformasXpago','ListaPagosXprogramac','ObtenerCambioMoneda','ObtenerTransaccionParaComprobantes','ListasCuentasAuxiliares','GuardarComprobanteTransaccion','UltimaFechaTipoComprobanteTransaccion','NumeroLiteral','ListaPagosXprogramacEd','EmailComprobanteTransaccion','guardarAdjuntoo', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, ObtenerTodoPersonal, TransaccionBancoPaginador, $timeout,
            Paginator, ListaBancos, ClasesTipo, ClasesTipoEmpresa, TransaccionIngresoBanco, FieldViewer, TransaccionSeguimientoBanco, TransaccionSeguimientoEstado, TransaccionRevisionEstado,
            SaldoCuenta, SaldoDisponibleCuenta, SaldoProformas, ObtenerImagen, ObtenerComprobanteTransaccion, Tipos, GuardarEdicionTransaccion, SaldoProformasEdic, elimDetalleTransacEdicion, 
            SweetAlert, ListaProformasXcobrar, TransaccionBancoPaginadorInicio,ListaProformasXpago, ListaPagosXprogramac, ObtenerCambioMoneda, ObtenerTransaccionParaComprobantes, ListasCuentasAuxiliares, GuardarComprobanteTransaccion, UltimaFechaTipoComprobanteTransaccion,NumeroLiteral, ListaPagosXprogramacEd, EmailComprobanteTransaccion, guardarAdjuntoo) {
            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.modalNuevoIngreso = 'modal-wizard-nuevo-ingreso'
            $scope.modalSeguimiento = 'modal-wizard-seguimiento'
            $scope.modalRevision = 'modal-wizard-revision'
            $scope.modalVencimientoCreditos = 'tabla-vencimiento-creditos-transaciones'
            $scope.modalVerIngreso = 'modal-wizard-ver-ingreso'
            $scope.modalVerEgreso = 'modal-wizard-ver-egreso'
            $scope.modalEditarTransaccion = 'modal-wizard-editar-transaccion'
            $scope.idModalConceptoEdicion = 'dialog-conceptos';
            $scope.idModalWizardComprobanteTransaccionPago = 'modal-wizard-comprobante-transaccion-pago';
            $scope.idModalNuevoAdjuntarPDF = "modal-nuevo-adjuntarPDF";
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsTransacciones($scope.modalNuevoIngreso, $scope.modalSeguimiento, $scope.modalRevision, $scope.modalVencimientoCreditos,
                    $scope.modalVerIngreso, $scope.modalVerEgreso, $scope.idModalConceptoEdicion, $scope.modalEditarTransaccion, $scope.idModalWizardComprobanteTransaccionPago, $scope.idModalNuevoAdjuntarPDF);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
                $scope.obtenerColumnasAplicacion()
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.modalNuevoIngreso);
                $scope.eliminarPopup($scope.modalSeguimiento);
                $scope.eliminarPopup($scope.modalRevision);
                $scope.eliminarPopup($scope.modalVencimientoCreditos);
                $scope.eliminarPopup($scope.idModalConceptoEdicion);
                $scope.eliminarPopup($scope.idModalWizardComprobanteTransaccionPago);
                $scope.eliminarPopup($scope.modalVerIngreso);
                $scope.eliminarPopup($scope.modalVerEgreso);
                $scope.eliminarPopup($scope.modalEditarTransaccion);
                $scope.eliminarPopup($scope.idModalNuevoAdjuntarPDF);
                
            });

            $scope.imagenEmpresa;
            const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
            imgDelay.then((img) => {
                $scope.imagenEmpresa = img
            }).catch((err) => {
                const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
                blockUI.stop()
            })
            $scope.cerrarDialogConceptoEdicion = function () {
                $scope.cerrarPopup($scope.idModalConceptoEdicion);
            }
            $scope.guardarConceptoEdicion = function (tipo) {
                blockUI.start();
                Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
                    var promesa = ClasesTipoEmpresa(tipo.nombre_corto, $scope.usuario.id_empresa);
                    promesa.then(function (entidad) {
                        if (entidad.hasErr) return alert(entidad.mensaje)
                        $scope.tipo_edicion = entidad
                        blockUI.stop();
                        $scope.cerrarDialogConceptoEdicion();
                        $scope.mostrarMensaje('Guardado Exitosamente!');
                    }).catch((err) => {
                        alert(err.stack && err.stack || 'Se perdió la conexión.')
                    })
                });
            }
            $scope.modificarConceptoEdicion = function (clase) {
                $scope.clase = clase;
            }
            $scope.agregarConceptoEdicion = function (clase) {
                if (clase.nombre && clase.nombre_corto) {
                    if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
                        $scope.tipo_edicion.clases.push(clase);
                    }
                    $scope.clase = {}
                }
            }
            $scope.inicio = function () {
                const hoy = new Date()
                $scope.filtro = { empresa: $scope.usuario.empresa.id, desde: hoy.setDate(hoy.getDate() - 7), hasta: $scope.formatoFechaPDF(new Date()), cuenta: 0, nombre: 0, concepto: 0, ref_doc: 0, tipo_doc: 0, estado: 0 }
                $scope.filtro.desde = new Date($scope.filtro.desde).toLocaleDateString()
                $scope.obtenerCuentas()
                $scope.obtenerConceptosTransaccion()
                $scope.obtenerTiposDocumentos()
                $scope.obtenerEstadosTransaccion()
                //$scope.obtenerSaldoInicial()
                /* $timeout(function () {
                    $scope.obtenerVencimientos()
                }, 5000) */

                $scope.fondosDisponibles = 0
                $scope.ingresosEnTransito = 0
                $scope.egresosEnTransito = 0
                $scope.saldoInicial = 0
                $scope.saldoFinal = 0
                $scope.saldoPignorado = 0
                $scope.fecha_hoy = $scope.formatoFechaPDF(new Date())
                const prom = ObtenerTodoPersonal($scope.usuario.id_empresa)
                prom.then(function (res) {
                    $scope.empleados = res.personal
                    $scope.obtenerTransacciones()
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.abrirDialogConceptoEdicion = function (tipo) {
                $scope.tipo_edicion = tipo;
                $scope.clase = {};
                $scope.abrirPopup($scope.idModalConceptoEdicion);
            }

            $scope.obtenerConceptosTransaccion = function () {
                blockUI.start();
                const promesa = ClasesTipoEmpresa("CONTRAN", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.conceptosTransaccion = entidad;
                    $scope.conceptosTransaccion.clases.forEach(function (concepto) {
                        if (concepto.nombre_corto === 'CTRAN') {
                            $scope.TRAN_COBRO = concepto
                        }
                        if (concepto.nombre_corto === 'PTRAN') {
                            $scope.TRAN_PAGO = concepto
                        }
                        if (concepto.nombre_corto == 'SAL_INICIAL') {
                            $scope.SALDO_INICIAL = concepto
                        }
                    });
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.obtenerVencimientos = function () {
                $scope.vencimientosCobros = []
                $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                const prom = SaldoProformas($scope.usuario.id_empresa);
                prom.then(function (res) {
                    $scope.proformasPorCobrar = [];
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje);
                    } else {
                        $scope.proformasPorCobrar = res.proformas;
                    }
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.obtenerVencimientosEdic = function (transaccion) {
                $scope.vencimientosCobros = []
                $scope.proformasPorCobrarEdic = [];
                $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                const prom = SaldoProformasEdic($scope.usuario.id_empresa, transaccion.id_cliente);
                prom.then(function (res) {
                    
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje);
                        $scope.proformasPorCobrarEdic = [];
                    } else {
                        $scope.proformasPorCobrarEdic = res.proformas;
                    }
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.obtenerTiposDocumentos = function () {
                blockUI.start();
                const promesa = ClasesTipoEmpresa("TDC", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.tiposDocumentos = entidad;
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.obtenerSaldoInicial = function () {
                $scope.saldoInicial = 0
                const prom = SaldoCuenta($scope.usuario.id_empresa, $scope.cuentaSeleccionada.id, $scope.filtro.desde, $scope.filtro.hasta)
                prom.then(function (res) {
                    if (res.cuenta !== undefined) {
                        $scope.saldoInicial = res.cuenta.length ? res.cuenta[0].saldo : 0
                    } else {
                        $scope.mostrarMensaje('La cuenta Nro. ' + $scope.cuentaSeleccionada.numero + ' de ' + $scope.cuentaSeleccionada.nombre + ' no cuenta con un ingreso de apertura')
                    }

                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            /* $scope.showSelecccionCliente = function (ingreso) {
                if (ingreso === undefined || ingreso === null) {
                    return true
                }
                if (ingreso.concepto !== undefined && ingreso.concepto !== null) {
                    if (ingreso.concepto.id !== undefined) {
                        if (ingreso.concepto.id === $scope.SALDO_INICIAL.id) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        if (ingreso.concepto === $scope.SALDO_INICIAL.id) {
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    return true
                }

            } */

            $scope.obtenerEstadosTransaccion = function () {
                blockUI.start();
                const promesa = ClasesTipo("ESTRANS");
                promesa.then(function (entidad) {
                    $scope.estadosTransaccion = entidad.clases;
                    entidad.clases.map(function (clase) {
                        if (clase.nombre_corto == 'CONFIRMADO') {
                            $scope.CONFIRMADO = clase
                        }
                        if (clase.nombre_corto == 'EN_TRANSITO') {
                            $scope.EN_TRANSITO = clase
                        }
                    })
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.seleccionarCuenta = function (cuentaBanco) {
                $scope.cuentaSeleccionada = undefined
                $scope.bancos.forEach(function (cuenta) {
                    if (cuenta.id === cuentaBanco.id) {
                        $scope.cuentaSeleccionada = cuenta
                        $scope.filtro.cuenta = $scope.cuentaSeleccionada
                    }
                });
            }

            $scope.obtenerCuentas = function () {
                const prom = ListaBancos($scope.usuario.id_empresa)
                prom.then(function (res) {
                    $scope.bancos = res
                    $scope.cuentaSeleccionada = $scope.bancos[0]
                    $scope.filtro.cuenta = $scope.cuentaSeleccionada
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.calcularIngresosTransito = function () {
                $scope.ingresosEnTransito = 0
                $scope.transacciones.forEach(function (transaccion) {
                    if (transaccion.haber !== null && transaccion.id_estado === $scope.EN_TRANSITO.id) {
                        $scope.ingresosEnTransito += transaccion.haber
                    }
                });
            }

            $scope.calcularEgresosTransito = function () {
                $scope.egresosEnTransito = 0
                $scope.transacciones.forEach(function (transaccion) {
                    if (transaccion.debe !== null && transaccion.id_estado === $scope.EN_TRANSITO.id) {
                        $scope.egresosEnTransito += transaccion.debe
                    }
                });
            }

            $scope.calcularFondosDisponibles = function () {
                $scope.fondosDisponibles = 0
                const prom = SaldoDisponibleCuenta($scope.usuario.id_empresa, $scope.cuentaSeleccionada.id, 0, 0)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    }
                    $scope.fondosDisponibles = res.saldo
                    $scope.calcularIngresosTransito()
                    $scope.calcularEgresosTransito()
                    $scope.calcularSaldoPignorado()
                    $scope.calcularSaldoFinal()
                    const prom = SaldoCuenta($scope.usuario.id_empresa, $scope.cuentaSeleccionada.id, $scope.filtro.desde, $scope.filtro.hasta)
                    prom.then(function (res) {
                        $scope.saldoInicial = res.cuenta.length ? res.cuenta[0].saldo : 0
                    })
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.calcularSaldoFinal = function () {
                $scope.saldoFinal = $scope.fondosDisponibles + $scope.ingresosEnTransito - $scope.egresosEnTransito
            }

            $scope.calcularSaldoPignorado = function () {
                $scope.saldoPignorado = 0
                $scope.transacciones.forEach(function (transaccion) {
                    if (transaccion.debe !== null && transaccion.id_estado === $scope.EN_TRANSITO.id) {
                        $scope.saldoPignorado -= transaccion.debe
                    }
                    if (transaccion.haber !== null && transaccion.id_estado === $scope.EN_TRANSITO.id) {
                        $scope.saldoPignorado += transaccion.haber
                    }
                });
            }

            $scope.obtenerColumnasAplicacion = function () {
                blockUI.start();
                $scope.fieldViewer = FieldViewer({
                    crear: true,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        numero: { value: "N°", show: true },
                        fecha: { value: "Fecha", show: true },
                        banco: { value: "Banco", show: true },
                        detalle: { value: "Detalle", show: true },
                        nombre: { value: "Nombre completo", show: true },
                        concepto: { value: "Concepto", show: true },
                        observaciones: { value: "Observaciones", show: true },
                        ref_doc: { value: "Ref./Doc.", show: true },
                        tipo_doc: { value: "tipo Documento", show: true },
                        debe: { value: "Debe", show: true },
                        haber: { value: "Haber", show: true },
                        saldo: { value: "Saldo", show: true },
                        estado: { value: "estado", show: true }
                    }
                }, $scope.aplicacion.aplicacion.id);
                $scope.fieldViewer.updateObject();
                blockUI.stop();
            }

            $scope.obtenerSaldoCuenta = function () {
                const prom = SaldoCuenta($scope.usuario.id_empresa, $scope.filtro.cuenta, new Date())
                var recived = false
                prom.then(function (res) {
                    recived = true
                    $scope.saldoInicial = res.transaccion.saldo
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
                $timeout(function () {
                    if (recived) {
                        blockUI.stop()
                    } else {
                        blockUI.stop()
                        $scope.mostrarMensaje('La respuesta esta tardando mas de lo normal')
                    }
                }, 5000)
            }
            $scope.reniciarPagina = false;

            $scope.filtrarTransacciones = function (filtro, _, __) {
                if (__ !== undefined) {
                    for (var key in filtro) {
                        if (filtro[key] == 0) {
                            filtro[key] = ""
                        }
                    }
                } else {
                    for (var key in filtro) {
                        if (filtro[key] === "" || filtro[key] === null || filtro[key] === undefined) {
                            filtro[key] = 0
                        }
                    }
                }
                if (_ === undefined || !_) {
                    $scope.buscarTransacciones()
                } else {
                    return filtro
                }
            }

            $scope.obtenerTransacciones = function () {
                $scope.paginator = Paginator()
                $scope.paginator.column = "fecha"
                $scope.paginator.direction = "asc"
                $scope.paginator.callBack = $scope.buscarTransacciones
                $scope.paginator.getSearch("")
            }
            
            $scope.filtroSaldo = false;
            $scope.buscarfiltrado = function () {
                $scope.filtroSaldo = true;
                if($scope.filtroSaldo){
                    $scope.paginator.currentPage = 1
                }
                $scope.buscarTransacciones()
            }
            $scope.buscarTransacciones = function () {
                blockUI.start()
                if ($scope.filtro.cuenta === 0) {
                    $scope.filtro.cuenta = $scope.cuentaSeleccionada
                }
                $scope.filtro = $scope.filtrarTransacciones($scope.filtro, true)
                $scope.paginator.filter = $scope.filtro
               
                var servicioTransacc =$scope.filtroSaldo?TransaccionBancoPaginador:TransaccionBancoPaginadorInicio
                const prom = servicioTransacc($scope.usuario.id_empresa, $scope.paginator)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.saldAntFecha = res.saldAntFecha
                        $scope.saldoAntFechaInicial = res.saldoAntFechaInicial
                        $scope.transacciones = res.transacciones
                        $scope.transacciones.forEach(function (transaccion) {
                            $scope.verificarSeguimiento(transaccion)
                        });
                        $scope.paginator.setPages(res.paginas)

                        $scope.calcularFondosDisponibles()
                        $scope.obtenerSaldoInicial()
                        $scope.obtenerVencimientos()
                    }

                    blockUI.stop()
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
                $scope.filtro = $scope.filtrarTransacciones($scope.filtro, true, true)
            }

            $scope.crearNuevoIngreso = function () {
                $scope.abrirModalNuevoIngreso()
            }

            $scope.seguimiento = function (transaccion) {
                $scope.transaccion = transaccion
                $scope.abrirModalSeguimiento()
            }

            $scope.guardarSeguimiento = function (transaccion) {
                blockUI.start()
                if (transaccion.seguimientos[0].id_entregado !== null) {
                    if (transaccion.seguimientos[0].id_entregado !== transaccion.seguimientos[0].entregado_por.id) {
                        $scope.mostrarMensaje('No se permiten cambios!')
                        blockUI.stop()
                        return
                    } else {
                        if (transaccion.seguimientos[0].id_devuelto !== null && !transaccion.seguimientos[0].proveedor) {
                            if (transaccion.seguimientos[0].id_devuelto !== transaccion.seguimientos[0].devuelto_a.id) {
                                $scope.mostrarMensaje('No se permiten cambios!')
                                blockUI.stop()
                                return
                            }
                        } else if (transaccion.seguimientos[0].fecha_devolucion === null && (!transaccion.seguimientos[0].proveedor && (transaccion.seguimientos[0].devuelto_a !== 0 && transaccion.seguimientos[0].devuelto_a !== undefined && transaccion.seguimientos[0].devuelto_a !== null))) {
                            transaccion.seguimientos[0].fecha_devolucion = new Date()
                            transaccion.seguimientos[0].id_devuelto = transaccion.seguimientos[0].devuelto_a.id
                        }
                    }
                } else if (transaccion.seguimientos[0].fecha_entrega === null) {
                    transaccion.seguimientos[0].fecha_entrega = new Date()
                    transaccion.seguimientos[0].id_entregado = transaccion.seguimientos[0].entregado_por.id
                }

                const prom = TransaccionSeguimientoBanco($scope.usuario.id_empresa, transaccion.seguimientos[0], $scope.usuario.id)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.mostrarMensaje(res.mensaje)
                        $scope.cerrarModalSeguimiento()
                        $scope.verificarSeguimiento(transaccion)
                    }
                    blockUI.stop()
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.verificarSeguimiento = function (transaccion) {
                if (transaccion.seguimientos.length > 0) {
                    if (transaccion.seguimientos[0].entregado_por === null && transaccion.seguimientos[0].devuelto_a === null && !transaccion.seguimientos[0].proveedor) {
                        transaccion.seguimientos[0].black = true
                        transaccion.seguimientos[0].yellow = undefined
                        transaccion.seguimientos[0].green = undefined
                    }
                    if (transaccion.seguimientos[0].entregado_por !== null && transaccion.seguimientos[0].devuelto_a === null && !transaccion.seguimientos[0].proveedor) {
                        transaccion.seguimientos[0].black = undefined
                        transaccion.seguimientos[0].yellow = true
                        transaccion.seguimientos[0].green = undefined
                    }
                    if (transaccion.seguimientos[0].entregado_por !== null && transaccion.seguimientos[0].devuelto_a !== null && !transaccion.seguimientos[0].proveedor) {
                        transaccion.seguimientos[0].black = undefined
                        transaccion.seguimientos[0].yellow = undefined
                        transaccion.seguimientos[0].green = true
                    }
                    if (transaccion.seguimientos[0].entregado_por === null && transaccion.seguimientos[0].devuelto_a === null && transaccion.seguimientos[0].proveedor) {
                        transaccion.seguimientos[0].black = true
                        transaccion.seguimientos[0].yellow = undefined
                        transaccion.seguimientos[0].green = undefined
                    }
                    if (transaccion.seguimientos[0].entregado_por !== null && transaccion.seguimientos[0].devuelto_a === null && transaccion.seguimientos[0].proveedor) {
                        transaccion.seguimientos[0].black = undefined
                        transaccion.seguimientos[0].yellow = undefined
                        transaccion.seguimientos[0].green = true
                    }
                }
            }

            $scope.verificarConcepto = function (ingreso) {
                if ($scope.SALDO_INICIAL.id === ingreso.concepto) {
                    ingreso.venta = undefined
                    ingreso.detalle = 'Ingreso apertura.'
                }
                if($scope.TRAN_PAGO.id === ingreso.concepto){ 
                    ingreso.detalle = 'Pago(s).....'
                }   
                if($scope.TRAN_COBRO.id === ingreso.concepto){ 
                    ingreso.detalle = 'Cobro(s)....'
                } 
            }

            $scope.guardarRevision = function () {
                blockUI.start()
                $scope.transaccion.cerrado = true
                const prom = TransaccionRevisionEstado($scope.usuario.id_empresa, $scope.usuario.id, $scope.transaccion.id)
                prom.then(function (res) {
                    blockUI.stop()
                    $scope.mostrarMensaje(res.mensaje)
                    $scope.cerrarModalRevision()
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.asignarTipoDoc = (ingreso) => {
                $scope.ingresoNuevo.tipo_doc = ingreso.tipo_doc
            }

            $scope.asignarRefDoc = (ingreso) => {
                $scope.ingresoNuevo.ref_doc = ingreso.ref_doc
            }

            $scope.asignarObservacion = (ingreso) => {
                $scope.ingresoNuevo.observacion = ingreso.observacion
            }

            $scope.asignarHaber = (ingreso) => {
                $scope.ingresoNuevo.haber = ingreso.haber
            }
            $scope.guardarIngreso = function (ingreso) {
                blockUI.start()
                $scope.ingresoNuevo.fecha = new Date($scope.convertirFecha($scope.ingresoNuevo.fecha))
                $scope.ingresoNuevo.tipo_doc  = typeof $scope.ingresoNuevo.tipo_doc === 'object'?$scope.ingresoNuevo.tipo_doc.id:$scope.ingresoNuevo.tipo_doc
                const prom = TransaccionIngresoBanco($scope.usuario.id_empresa, $scope.ingresoNuevo, $scope.usuario.id)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.ingresoNuevo.fecha = new Date(ingreso.fecha).toLocaleDateString()
                        $scope.mostrarMensaje(res.mensaje)

                    } else {
                        ingreso = {
                            ventas: [],
                            detalle: '',
                            haber: 0,
                            cuenta: {},
                            fecha: $scope.formatoFechaPDF(new Date()),
                            observacion: '',
                            ref_doc: null,
                            tipo_doc: null
                        }
                        ingresoNuevo = {
                            ventas: [],
                            detalle: '',
                            haber: 0,
                            cuenta: {},
                            fecha: $scope.formatoFechaPDF(new Date()),
                            observacion: '',
                            ref_doc: null,
                            tipo_doc: null
                        }
                        $scope.ingresoNuevo = {
                            ventas: [],
                            detalle: '',
                            haber: 0,
                            cuenta: {},
                            fecha: $scope.formatoFechaPDF(new Date()),
                            observacion: '',
                            ref_doc: null,
                            tipo_doc: null
                        }
                        $scope.imprimirRegistroIngreso(res.transaccion, res.proformas, res.ventas)
                        $scope.ventasProformas = []
                        $scope.mostrarMensaje(res.mensaje)
                        $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
                        $scope.filtrarTransacciones($scope.filtro)
                        $scope.cerrarModalNuevoIngreso()
                        $scope.obtenerVencimientos()
                        shortcut.remove("Ctrl+G")
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    ingreso.fecha = $scope.formatoFechaPDF(ingreso.fecha)
                    blockUI.stop()
                })
            }
            $scope.obtenerComprobanteTransaccion = async (transaccion) => {
                blockUI.stop();
                try {
                    const comprobanteTransaccion = await ObtenerComprobanteTransaccion(transaccion.id);
                    if (comprobanteTransaccion.hasErr) return alert(comprobanteTransaccion.mensaje)
                    var impresiones = await $scope.imprimirRegistroIngreso(comprobanteTransaccion.transaccion, comprobanteTransaccion.proformas)
                } catch (err) {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                } 
            }
            $scope.imprimirRegistroIngreso = async (ingreso, proformas) => {
                try {
                    let fech = new Date(ingreso.fecha)
                    var moneda = await ObtenerCambioMoneda(fech, $scope.usuario.id_empresa);
                    if(moneda.monedaCambio == null){
                        toastr.warning("NO tiene tipo de cambio $us!!!")
                    }
                    if(ingreso.concepto.nombre_corto == 'CTRAN'){
                        $scope.imprimirRegistroIngresoCobro(ingreso, proformas);
                    }
                    if(ingreso.concepto.nombre_corto == 'SAL_INICIAL'){
                        $scope.imprimirRegistroIngresoSalInc(ingreso, moneda);
                    }
                    if(ingreso.concepto.nombre_corto == 'PTRAN'){
                        $scope.imprimirRegistroPago(ingreso,moneda);
                    }

                    
                } catch (error) {
                    return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+error, "error");
                }
            }
            $scope.headerPdfTransaccion = (doc, logo, titulo, hoy, page, inf_empresa, metadata, banco, concepto, nroCorrelativo) => {
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
					doc.text((inf_empresa.direccion).toUpperCase() ,45, 80, {width:155,align: "center"});
                    doc.text((inf_empresa.departamento).toUpperCase()+' - BOLIVIA',45, 90, {width:155,align: "center"});
	
					doc.font('Helvetica-Bold', 11);
					doc.text(titulo,200, 40, { width: 380,align: "center" });
                    doc.font('Helvetica-Bold', 10);
                    doc.text(banco,200, 53, { width: 380, align: 'center' });
                    doc.text(concepto,200, 66, { width: 380, align: 'center' });
                    doc.text(nroCorrelativo,200, 79, { width: 380, align: 'center' });
                    
					doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
					doc.font('Helvetica', 6).text(metadata, 0, 755, { align: 'center'})
				} catch (e) {
					console.error('Error al generar pdf...',e);
					return SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
				}
            }

            $scope.imprimirRegistroIngresoCobro =  async (ingreso, proformas) => {
				if(ingreso.length < 0) return SweetAlert.swal("", "Seleccione Cliente","error");
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); 
                    var stream = doc.pipe(blobStream());
                    let titulo = "COMPROBANTE DE INGRESO"
                    let banco = ingreso.cuenta.nombre+' - '+ingreso.cuenta.numero
                    let concepto = ingreso.concepto.nombre
                    let nroCorrelativo = 'N° ' + ingreso.correlativo
                    let hoy = $scope.fechaATexto(new Date()); 
                    let inf_empresa = {direccion:$scope.usuario.empresa.direccion, departamento:$scope.usuario.empresa.departamento.nombre}//$scope.usuario.empresa.direccion?$scope.usuario.empresa.direccion:'' + ' - ' + $scope.usuario.empresa.departamento.nombre?$scope.usuario.empresa.departamento.nombre:'';
                    let metadata = "Usuario: "+$scope.usuario.nombre_usuario+" - Fecha Emisión: "+$scope.convertirFechaHora(ingreso.fecha)+" - Fecha impresión: "+ $scope.convertirFechaHora(new Date());
                    var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(ingreso.detallesTransaccion.length / itemsPerPage)

                    $scope.headerPdfTransaccion(doc, logo, titulo, hoy, page,inf_empresa, metadata, banco, concepto, nroCorrelativo);
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Nombre:', 40, y);
                    doc.text('NIT:', 490, y);
                    doc.font('Helvetica', 8);
                    doc.text(proformas[0] && proformas[0].cliente.razon_social || '', 80, y);
                    doc.text(proformas[0] && proformas[0].cliente.nit || '', 500, y,{ width: 80, align: 'right' });
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Nro. de factura(s):', 40, y);
                    doc.font('Helvetica', 8);
                    const numeros_facturas = proformas.map(proforma => proforma.factura).join(',')
                    doc.text(numeros_facturas, 110, y, { width: 470, align: 'left' });
                    y += ((numeros_facturas.length > 100 && numeros_facturas.length < 230) ? 15 : ((numeros_facturas.length > 230 && numeros_facturas.length < 330) ? 25 :((numeros_facturas.length > 330)? 40 : 10)));
                    doc.rect(40, y + 5, 542, 0).stroke();
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('C. COSTO', 40, y);
                    doc.text('OBSERVACIÓN/DETALLE', 100, y);
                    doc.text('BS', 485, y);
                    doc.text('USD', 560, y);
                    y += 15;
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.font('Helvetica', 8);
                    let total_bs = 0;
                    let total_usd = 0;
                    let marcar = 0
                    doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
                    for (let index = 0; index < ingreso.detallesTransaccion.length; index++) {
                        const proforma = proformas?.find(proforma => proforma.id === ingreso?.detallesTransaccion[index]?.id_proforma)
                        if (!proforma) return alert('No se encontró identificador de proforma');
                        for (let i = 0; i < proforma.detallesProformas.length; i++) {
                            if(marcar % 2 == 0) doc.rect(40, y-4 , 542, 15).fill('#f7f7f7').fillColor('#000');
                            doc.font('Helvetica', 8);
                            const centro_costo = proforma.detallesProformas[i]?.centroCosto?.nombre
                            if (centro_costo?.length > 7) doc.font('Helvetica', 8);
                            doc.text(centro_costo || '', 40, y);
                            doc.font('Helvetica', 8);
                            const detalle = 'Factura Nro. ' + (proforma?.factura ?? 'X') + ', Proforma Nro. ' + (proforma?.correlativo ?? 'X') + ', ' + (proforma?.detallesProformas[i]?.servicio ?.nombre?? 'Desconocido');
                            doc.text(detalle, 100, y, { width: 350 });
                           const bs = ((((proforma.detallesProformas[i].importe * 100) / (proforma.totalImporteBs))/100) * (ingreso.detallesTransaccion[index].monto));
                            doc.text(number_format_negativo_to_positvo(bs,2), 450, y, { width: 50, align: 'right' });
                            const usd = (((((proforma.detallesProformas[i].importe * 100) / (proforma.totalImporteBs))/100) * (ingreso.detallesTransaccion[index].monto)) / proforma.cambio_dolar);
                            doc.text(number_format_negativo_to_positvo(usd,2), 530, y, { width: 50, align: 'right' });
                            const legt = ((detalle.length > 85 && detalle.length < 150) ? 25 : ((detalle.length > 120) ? 30 : 15))
                           
                            total_bs += bs;
                            total_usd += usd;
                            marcar +=1
                            y += 15, items++;
                            if( y > 730){
                                x = 40, y=95, items=0, page++
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                y += 8;
								doc.lineWidth(0.1)
                                doc.rect( 40, y, 542, 0).stroke()
                                doc.rect(40, y+13, 542, 0).stroke();
                                y += 4;
								doc.font('Helvetica-Bold', 8);
                                doc.text('C. COSTO', 40, y);
                                doc.text('OBSERVACIÓN/DETALLE', 100, y);
                                doc.text('BS', 485, y);
                                doc.text('USD', 560, y);
								y += 15, items++;
                                $scope.headerPdfTransaccion(doc, logo, titulo, hoy, page, inf_empresa, metadata, banco, concepto, nroCorrelativo); 
                            }
                        }
                    }
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.text('TOTAL', 40, y);
                    doc.text(number_format_negativo_to_positvo(total_bs,2), 450, y, { width: 50, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(total_usd,2), 530, y, { width: 50, align: 'right' });
                    y += 20;

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
                })
            }

			$scope.imprimirRegistroIngresoSalInc =  async (ingreso,moneda) => {
				if(ingreso.length < 0) return SweetAlert.swal("", "Seleccione Cliente","error");
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); 
                    var stream = doc.pipe(blobStream());
                    let titulo = "COMPROBANTE DE INGRESO"
                    let banco = ingreso.cuenta.nombre+' - '+ingreso.cuenta.numero
                    let concepto = ingreso.concepto.nombre
                    let nroCorrelativo = ''
                    let hoy = $scope.fechaATexto(new Date()); 
                    let inf_empresa = {direccion:$scope.usuario.empresa.direccion, departamento:$scope.usuario.empresa.departamento.nombre}
                    let metadata = "Usuario: "+$scope.usuario.nombre_usuario+" - Fecha Emisión: "+$scope.convertirFechaHora(ingreso.fecha)+" - Fecha impresión: "+ $scope.convertirFechaHora(new Date());
                    var x = 40, y=95, items=0, itemsPerPage=40, page=1, pages=Math.ceil(ingreso.detallesTransaccion.length / itemsPerPage)

                    $scope.headerPdfTransaccion(doc, logo, titulo, hoy, page,inf_empresa, metadata, banco, concepto, nroCorrelativo);
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Fecha:', 40, y);
                    doc.font('Helvetica', 8);
                    const inf_Depart = $scope.usuario.empresa.departamento.nombre;
                    doc.text(inf_Depart + ' - ' + $scope.aFechaLarga(ingreso.fecha), 80, y);
                    y += 10;
                    doc.rect(40, y + 5, 542, 0).stroke();
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('N°', 40, y);
                    doc.text('OBSERVACIÓN/DETALLE', 100, y);
                    doc.text('BS', 485, y);
                    doc.text('USD', 560, y);
                    y += 15;
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.font('Helvetica', 8);
                    let total_bs = 0;
                    let total_usd = 0;
                    doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
                        doc.font('Helvetica', 8);
                        doc.text(1, 40, y);
                        doc.text(ingreso.detalle?ingreso.detalle:'', 100, y, { width: 350 });
                        doc.text(number_format_negativo_to_positvo(ingreso.saldo,2), 450, y, { width: 50, align: 'right' });
                        const usd = (ingreso.saldo / (moneda.monedaCambio?moneda.monedaCambio.dolar:(1*0))); 
                        doc.text(number_format_negativo_to_positvo(usd,2), 530, y, { width: 50, align: 'right' });
                        total_bs += ingreso.saldo
                        total_usd += usd;
                        y += 15, items++;
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.text('TOTAL', 40, y);
                    doc.text(number_format_negativo_to_positvo(total_bs,2), 450, y, { width: 50, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(total_usd,2), 530, y, { width: 50, align: 'right' });
                    y += 20;

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
                })
            }


            $scope.imprimirRegistroPago =  async (ingreso, moneda) => {
				if(ingreso.length < 0) return SweetAlert.swal("", "Seleccione Cliente","error");
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); 
                    var stream = doc.pipe(blobStream());
                    let titulo = "COMPROBANTE DE EGRESO"
                    let banco = ingreso.cuenta.nombre+' - '+ingreso.cuenta.numero
                    let concepto = ingreso.concepto.nombre
                    let nroCorrelativo = 'N° ' + ingreso.correlativo
                    let hoy = $scope.fechaATexto(new Date()); 
                    let inf_empresa = {direccion:$scope.usuario.empresa.direccion, departamento:$scope.usuario.empresa.departamento.nombre}//$scope.usuario.empresa.direccion?$scope.usuario.empresa.direccion:'' + ' - ' + $scope.usuario.empresa.departamento.nombre?$scope.usuario.empresa.departamento.nombre:'';
                    let metadata = "Usuario: "+$scope.usuario.nombre_usuario+" - Fecha Emisión: "+$scope.convertirFechaHora(ingreso.fecha)+" - Fecha impresión: "+ $scope.convertirFechaHora(new Date());
                    var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(ingreso.detallesTransaccion.length / itemsPerPage)

                    $scope.headerPdfTransaccion(doc, logo, titulo, hoy, page,inf_empresa, metadata, banco, concepto, nroCorrelativo);
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Fecha:', 40, y);
                    doc.font('Helvetica', 8);
                    const inf_Depart = $scope.usuario.empresa.departamento.nombre;
                    doc.text(inf_Depart + ' - ' + $scope.aFechaLarga(ingreso.fecha), 80, y);
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Nombre:', 40, y);
                    doc.text('NIT:', 490, y);
                    doc.font('Helvetica', 8);
                    doc.text(ingreso.proveedor.razon_social || '', 80, y);
                    doc.text(ingreso.proveedor.nit || '', 500, y,{ width: 80, align: 'right' });
                    y += 10;
                    
                    doc.rect(40, y + 5, 542, 0).stroke();
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('N°', 40, y);
                    doc.text('OBSERVACIÓN/DETALLE', 100, y);
                    doc.text('BS', 485, y);
                    doc.text('USD', 560, y);
                    y += 15;
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.font('Helvetica', 8);
                    let total_bs = 0;
                    let total_usd = 0;
                    doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
                    for (let index = 0; index < ingreso.detallesTransaccion.length; index++) {
                        if(index % 2 == 0) doc.rect(40, y-4 , 542, 15).fill('#f7f7f7').fillColor('#000');
                        const detallTrans = ingreso.detallesTransaccion[index];
                        doc.font('Helvetica', 8);
                        doc.text(index+1, 40, y);
                        doc.text('Factura Nro. '+ detallTrans.compra.factura +', '+ detallTrans.compra.observacion, 100, y);
                        doc.text(number_format_negativo_to_positvo(detallTrans.monto,2), 450, y, { width: 50, align: 'right' });
                        const usd = (detallTrans.monto / (moneda.monedaCambio?moneda.monedaCambio.dolar:(1*0))); 
                        doc.text(number_format_negativo_to_positvo(usd,2), 530, y, { width: 50, align: 'right' });
                        total_bs += detallTrans.monto
                        total_usd += usd;  
                        y += 15, items++;
                        if( y > 730){
                            x = 40, y=95, items=0, page++
                            doc.addPage({ compress: false, size: 'letter', margin: 10 });
                            y += 8;
                            doc.lineWidth(0.1)
                            doc.rect( 40, y, 542, 0).stroke()
                            doc.rect(40, y+13, 542, 0).stroke();
                            y += 4;
                            doc.font('Helvetica-Bold', 8);
                            doc.text('N°', 40, y);
                            doc.text('OBSERVACIÓN/DETALLE', 100, y);
                            doc.text('BS', 485, y);
                            doc.text('USD', 560, y);
                            y += 15, items++;
                            $scope.headerPdfTransaccion(doc, logo, titulo, hoy, page, inf_empresa, metadata, banco, concepto, nroCorrelativo); 
                        }
                    }
                    doc.rect(40, y - 5, 542, 0).stroke();
                    doc.text('TOTAL', 40, y);
                    doc.text(number_format_negativo_to_positvo(total_bs,2), 450, y, { width: 50, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(total_usd,2), 530, y, { width: 50, align: 'right' });
                    y += 20;

                    doc.end();///solo que se abra cuando se cierre
                    if(!$scope.enviarCorreo){
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
                    }else{
                        stream.on('finish', async function() {
                            fileReader = new FileReader();
                            fileReader.onload = async function(event) {
                                var emailExistente = ingreso.proveedor.email?ingreso.proveedor.email:'--' /* 'violetalis54321@gmail.com' *//* 'oqlz sobm gnpz tpxu' *//* 'EQUIPO EMSERSO S.A.' */
                                var empresa = { id_empresa:$scope.usuario.empresa.id, id_usuario:$scope.usuario.id, razon_social_empresa:$scope.usuario.empresa.razon_social,telefono_empresa:$scope.usuario.empresa.telefono1, email_host: $scope.usuario.empresa.email_host, email_puerto: $scope.usuario.empresa.email_puerto, email_empresa_aplicacion:$scope.usuario.empresa.email_empresa_aplicacion, email_password_aplicacion:$scope.usuario.empresa.email_password_aplicacion, subNombre_email: $scope.usuario.empresa.asunto_email, URLactual: (window.location.origin)}
                                ingreso.email = { transaccion:ingreso.id, transaccion_respaldo:ingreso.doc_respaldo, empresa, prov_nombre_razon_social: ingreso.proveedor.razon_social, email_destinatario: ingreso.proveedor.email,nro_cuenta_Proveedor: ingreso.proveedor.CuentasBancoProveedor.length>0?ingreso.proveedor.CuentasBancoProveedor[0].nro_cuenta:'S/N', nombre_cuenta_Proveedor: ingreso.proveedor.CuentasBancoProveedor.length>0?ingreso.proveedor.CuentasBancoProveedor[0].banco.nombre:'S/N', binarioPDF: event.target.result} 
                                blockUI.noOpen = true;
                                var respEmail = await $scope.sendMailTransaccion(ingreso.email)
                                 if(!respEmail.hasErr){
                                    $scope.modificarEstadoTransaccion($scope.usuario.id_empresa, ingreso.estado.id, $scope.usuario.id, ingreso.id)
                                    $scope.enviarCorreo = false
                                    $scope.confirmacionSwitchAlert();
                                }else{
                                    SweetAlert.swal({
                                        title: "Desea Continuar?",
                                        html: "<h4 class='red'> CORREO DEL PROVEEDOR INCORRECTO..!!!</h4><h5 class='blue'>"+ emailExistente +"<b></h5> <i class='ace-icon fa fa-envelope bigger-130'></i> <h4>SI CONTUNUA YA NO PODRA EDITAR NINGUN DATO</h4>",
                                        icon: 'error',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: "No"
                                    }).then(async function (result) {
                                        if (result.value) { 
                                            $scope.modificarEstadoTransaccion($scope.usuario.id_empresa, ingreso.estado.id, $scope.usuario.id, ingreso.id); // para modificar estado de cierre de transacciones
                                            $scope.enviarCorreo = false
                                            $scope.confirmacionSwitchAlert();
                                        }
                                    });
                                } 
                            };
                            fileReader.onerror = async function() {
                               console.log('error loading file');
                            };
                            fileReader.readAsBinaryString(stream.toBlob('application/pdf'));
                        });
                    }
                    
                })
            }

            $scope.sendMailTransaccion = async function (datosEmail) { ///para enviar al email
                SweetAlert.swal({
                    title: 'Enviando correo...!!!',
                    html: '<center><lottie-player src="https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    background: 'rgba(76, 175, 80, 0.0)'
                })
				var prom = await EmailComprobanteTransaccion(datosEmail)
                return prom
			}

            $scope.confirmacionSwitchAlert = async function () { ///MENSAJE DE CORRECTO
                SweetAlert.swal({
                    title: 'Finalizado!',
                    color: '#716add',
                    html: '<center><lottie-player src="https://assets2.lottiefiles.com/packages/lf20_94HTw9.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                    timer: 2000,
                    showConfirmButton: false,
                    background: 'rgba(76, 175, 80, 0.0)',
                })
			}



            $scope.guardarEgreso = function (egreso) {
                blockUI.start()
                egreso.fecha = new Date($scope.convertirFecha(egreso.fecha))
                // egreso.haber = 0
                // egreso.debe = egreso.monto
                const prom = TransaccionEgresoBanco($scope.usuario.id_empresa, egreso, $scope.usuario.id)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                        egreso.fecha = egreso.fecha.toLocaleDateString()
                    } else {
                        $scope.mostrarMensaje(res.mensaje)
                        $scope.verificarVencimientosDeudas($scope.usuario.id_empresa);
                        // $scope.recargarItemsTabla()
                        $scope.filtrarTransacciones($scope.filtro)
                        $scope.cerrarModalNuevoEgreso()
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    egreso.fecha = egreso.fecha.toLocaleDateString()
                    blockUI.stop()
                })
            }

            $scope.imprimirReciboVencimientoCreditoProforma = function (data, venta, pago) {

                blockUI.start();
                const doc = new PDFDocument({ size: [227, 353], margin: 10 });
                const stream = doc.pipe(blobStream());
                doc.moveDown(2);
                doc.font('Helvetica-Bold', 8);
                doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.font('Helvetica', 7);
                doc.text(venta.sucursal.nombre.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                doc.text(venta.sucursal.direccion.toUpperCase(), { align: 'center' });
                doc.moveDown(0.4);
                const telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
                    (venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
                    (venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
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
                doc.text(venta.sucursal.nota_recibo_correlativo, { align: 'center' });
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
                doc.text("He recibido de : " + venta.cliente.razon_social, { align: 'left' });
                doc.moveDown(0.4);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.2);
                doc.text("                                        CONCEPTO                                   ", { align: 'left' });
                doc.moveDown(0.2);
                doc.text("---------------------------------------------------------------------------------", { align: 'center' });
                doc.moveDown(0.4);
                venta.fecha = new Date(venta.fecha);
                doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
                var textoFact = venta.factura
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
                    const fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }

            $scope.estadoConfirmado = function (transaccion) {
                blockUI.start()
                var err = true
                if (transaccion.seguimientos[0].id_entregado !== null && ((transaccion.seguimientos[0].id_devuelto !== null && !transaccion.seguimientos[0].proveedor) || (transaccion.seguimientos[0].id_devuelto === null && transaccion.seguimientos[0].proveedor))) {
                    $scope.estadosTransaccion.map(function (estado, i) {
                        if (estado.nombre == "CONFIRMADO") {
                            transaccion.estado = estado
                            err = false
                        }
                    })
                    if (err) {
                        blockUI.stop()
                        $scope.mostrarMensaje('Hubo un error al confirmar el estado')
                        return
                    } else {
                        SweetAlert.swal({
                            title: "Esta seguro?",
                            text: "Confirmar la transaccion del "+ transaccion.cuenta.nombre +",  "+ transaccion.concepto.nombre +"!!!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si',
                            cancelButtonText: "No"
                        }).then(function (result) {
                            if (result.value) {
                                const prom = TransaccionSeguimientoEstado($scope.usuario.id_empresa, transaccion.estado.id, $scope.usuario.id, transaccion.id)
                                prom.then(function (res) {
                                    if (res.hasErr) {
                                        $scope.mostrarMensaje(res.mensaje)
                                    } else {
                                        transaccion.estado.confirmado = true
                                        $scope.filtrarTransacciones($scope.filtro)
                                        $scope.mostrarMensaje(res.mensaje)
                                    }
                                    blockUI.stop()
                                }).catch((err) => {
                                    blockUI.stop();
                                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                    $scope.mostrarMensaje(msg)
                                })
                            } else{
                            }
                        });
                        blockUI.stop()
                        $scope.filtrarTransacciones($scope.filtro)
                    }
                } else {
                    blockUI.stop()
                    $scope.mostrarMensaje('No se puede confirmar el estado de la transacción, no existe información de seguimiento o esta inclompleta.')
                }
            }
            $scope.enviarCorreo = false
            $scope.estadoConfirmadoCerrar = function (transaccion){ 
                $scope.estadosTransaccion.map(function (estado, i) {
                    if (estado.nombre == "CONFIRMADO") {
                        transaccion.estado = estado
                    }
                })
                var emailExistente = transaccion.proveedor.email?transaccion.proveedor.email:'--' 
                SweetAlert.swal({
                    title: "Esta seguro?",
                    //text: "Confirmar la transaccion del "+ transaccion.cuenta.nombre +",  "+ transaccion.concepto.nombre +"!!!",
                    html: "<h4>Confirmar la transaccion del "+ transaccion.cuenta.nombre +",  "+ transaccion.concepto.nombre +"!!!</h4><br><h6>Y se enviara el comprobante al correo  del proveedor </h6><b><h5 class='blue'>"+ emailExistente +"<b></h5> <i class='ace-icon fa fa-envelope bigger-130'></i>",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(async function (result) {
                    if (result.value) { 
                        $scope.enviarCorreo = true
                        var datosImpresion = await $scope.obtenerComprobanteTransaccion(transaccion) /// DENTRO DE ESTA FUNCION SE ENVIA EL EMAIL
                    } 
                });
                $scope.filtrarTransacciones($scope.filtro)
            }

            $scope.abrirNuevoAdjuntarPDF= function (transaccion) {
                $scope.transaccion = transaccion;
               $('#id-adjunto-pdf').ace_file_input({
                no_file: "Ningún archivo ..", btn_choose: "Elegir", btn_change: "Cambiar", droppable: false, onchange: null, thumbnail: false
                 //| true | large  //whitelist:'gif|png|jpg|jpeg' //blacklist:'exe|php' //onchange:''
               });
               $('#id-adjunto-pdf').ace_file_input('reset_input_ui');
                $('#id-adjunto-pdf').ace_file_input('reset_input');
                $scope.abrirPopup($scope.idModalNuevoAdjuntarPDF);
            }
            $scope.cerrarAdjuntarPDF = function () {
                $scope.cerrarPopup($scope.idModalNuevoAdjuntarPDF);
            }
            
            $scope.agregarAdjuntoPDF = function (transaccion) {
                if (Object.keys(transaccion).length > 0) {

                    var f = document.getElementById("id-adjunto-pdf").files[0],
                        r = new FileReader();

                    if (f) {
                        r.onloadend = function (e) {
                            transaccion.doc_respaldo2 = { name: "", data: null }
                            transaccion.doc_respaldo2.name = transaccion.doc_respaldo[0].name
                            transaccion.doc_respaldo2.data = e.target.result;
                            const prom = guardarAdjuntoo(transaccion)
                            prom.then(function (res) {
                                $scope.cerrarAdjuntarPDF()
                                $scope.filtrarTransacciones($scope.filtro)
                                $scope.transaccion.doc_respaldo = ''
                                SweetAlert.swal({
                                    title: 'Finalizado!',
                                    icon: 'success',
                                   timer: 2000,
                                    showConfirmButton: false,
                                })
                        }).catch((err) => {
                            blockUI.stop();
                            const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                        })
                        }
                        r.readAsBinaryString(f);
                    } 
                }

            }



            $scope.modificarEstadoTransaccion = function (id_empresa, transaccion_estado_id, id_usuario, id_transaccion) {
				const prom = TransaccionSeguimientoEstado(id_empresa, transaccion_estado_id, id_usuario, id_transaccion)
                    prom.then(function (res) {
                        if (res.hasErr) {
                            $scope.mostrarMensaje(res.mensaje)
                        } else {
                            $scope.filtrarTransacciones($scope.filtro)
                        }
                        blockUI.stop()
                    }).catch((err) => {
                        blockUI.stop();
                        const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
			}

            $scope.abrirModalNuevoIngreso = function () {
                $scope.ingresoNuevo = {
                    ventas: [],
                    detalle: '',
                    haber: 0,
                    cuenta: null,
                    fecha: $scope.formatoFechaPDF(new Date()),
                    observacion: '',
                    ref_doc: null,
                    tipo_doc: $scope.tiposDocumentos.clases[1],
                    debe:0,
                    seguimiento: false
                    //saldoAct:0
                    //pagosProgramad: [],
                }
                shortcut.add("Ctrl+G", function () {
                    if($scope.ingresoNuevo.ventas.length > 0 && $scope.ingresoNuevo.concepto != null && $scope.ingresoNuevo.tipo_doc != null && $scope.ingresoNuevo.cuenta != null && $scope.ingresoNuevo.fecha != null){    
                        $scope.guardarIngreso($scope.ingreso)
                    }else{
                        SweetAlert.swal({
                            title: "Error..!!!",
                            text: "No se pudo GUARDAR, Por favor llene todo los datos o agregue un detalle..!!!",
                            icon: 'warning',
                        }) 
                    }
                });
                $scope.abrirPopup($scope.modalNuevoIngreso)
            }

            $scope.abrirModalVerIngreso = function (ingreso) {
                $scope.ingreso = ingreso
                $scope.ingreso.fecha = new Date($scope.ingreso.fecha).toLocaleDateString()
                $scope.abrirPopup($scope.modalVerIngreso)
            }

           /*  $scope.bootonGuardarEd = false;
            $scope.validMonto = function (monto) {
                if(monto<=0){
                    $scope.bootonGuardarEd = true;
                }
            }  */


            $scope.editarTransaccion = function (transaccion) {
                if (transaccion.concepto.nombre_corto =='CTRAN') {
                    const prom = ObtenerComprobanteTransaccion(transaccion.id);
                    prom.then((comprobanteTransaccion) => {
                        $scope.transaccion = comprobanteTransaccion.transaccion;
                        $scope.transaccion.fecha_texto = $scope.formatoFechaPDF(transaccion.fecha);
                        $scope.calcularImporteTransaccionEd($scope.transaccion)
                        $scope.obtenerVencimientosEdic(transaccion);
                        shortcut.add("Ctrl+G", function () {
                            if($scope.transaccion.detallesTransaccion.length > 0 && transaccion.concepto != null && transaccion.tipo_documento != null && transaccion.cuenta != null && $scope.transaccion.fecha_texto != null){
                                $scope.guardarEdicionTransaccionn($scope.transaccion)
                            }else{
                                SweetAlert.swal({
                                    title: "Error..!!!",
                                    text: "No se pudo GUARDAR la edición Cobro, Por favor llene todo los datos o agregue un detalle...!!!",
                                    icon: 'warning',
                                }) 
                            }
                        });
                        $scope.abrirPopup($scope.modalEditarTransaccion);
                        }).catch((err) => {
                        alert(err.stack && err.stack || 'Se perdió la conexión')
                    })
                }
                if (transaccion.concepto.nombre_corto =='PTRAN') {
                    const prom = ObtenerComprobanteTransaccion(transaccion.id);
                    prom.then((comprobanteTransaccion) => {
                        $scope.transaccion = comprobanteTransaccion.transaccion;
                        $scope.transaccion.fecha_texto = $scope.formatoFechaPDF(transaccion.fecha);
                        $scope.calcularImporteTransaccionEdPago($scope.transaccion)
                        /* shortcut.add("Ctrl+G", function () {
                            if($scope.transaccion.detallesTransaccion.length > 0 && transaccion.concepto != null && transaccion.tipo_documento != null && transaccion.cuenta != null && $scope.transaccion.fecha_texto != null){
                                $scope.guardarEdicionTransaccionn($scope.transaccion)
                            }else{
                                SweetAlert.swal({
                                    title: "Error..!!!",
                                    text: "No se pudo GUARDAR la edición de Pago, Por favor llene todo los datos o agregue un detalle...!!!",
                                    icon: 'warning',
                                }) 
                            }
                        }); */
                        $scope.abrirPopup($scope.modalEditarTransaccion);
                        }).catch((err) => {
                        alert(err.stack && err.stack || 'Se perdió la conexión')
                    })
                    
                }    
            }
            
            $scope.guardarEdicionTransaccionn = async function (transaccion){
                const hoy = new Date()
                hoy.setDate(parseInt(transaccion.fecha_texto.split('/')[0]))
                hoy.setMonth(parseInt(transaccion.fecha_texto.split('/')[1])-1)
                hoy.setFullYear(parseInt(transaccion.fecha_texto.split('/')[2]))
                transaccion.fecha = hoy;
                const res = await GuardarEdicionTransaccion($scope.usuario.id_empresa, $scope.usuario.id, transaccion);
                //$scope.mostrarMensaje(res.mensaje);
                SweetAlert.swal({
                    text: res.mensaje,
                    icon: 'success',
                })
                $scope.obtenerTransacciones()
                $scope.cerrarEditarTransaccion();
                shortcut.remove("Ctrl+G")
            }

            $scope.cerrarEditarTransaccion = function () {
                $scope.transaccion = undefined;
                $scope.detalleInvalid =false;
                shortcut.remove("Ctrl+G")
                $scope.cerrarPopup($scope.modalEditarTransaccion);
            }

            $scope.cerrarModalNuevoIngreso = function (ingresoNuevo) {
                ingresoNuevo = {
                    ventas: [],
                    detalle: '',
                    haber: 0,
                    cuenta: {},
                    fecha: $scope.formatoFechaPDF(new Date()),
                    observacion: '',
                    ref_doc: null,
                    tipo_doc: null
                }
                for (let index = 0; index < ingresoNuevo.ventas.length; index++) {
                    ingresoNuevo.ventas[index].ticked = false;
                }
                ingresoNuevo.detalle = '';
                ingresoNuevo.haber = 0;
                ingresoNuevo.cuenta = null;
                ingresoNuevo.fecha = $scope.formatoFechaPDF(new Date());
                ingresoNuevo.observacion = '';
                ingresoNuevo.ref_doc = null;
                ingresoNuevo.tipo_doc = null;
                $scope.ingresoNuevo = {
                    ventas: [],
                    detalle: '',
                    haber: 0,
                    cuenta: {},
                    fecha: $scope.formatoFechaPDF(new Date()),
                    observacion: '',
                    ref_doc: null,
                    tipo_doc: null
                }
                shortcut.remove("Ctrl+G")
                $scope.cerrarPopup($scope.modalNuevoIngreso)
            }

            $scope.cerrarModalVerIngreso = function () {
                $scope.ingreso = {
                    ventas: [],
                    detalle: '',
                    haber: 0,
                    cuenta: {},
                    fecha: $scope.formatoFechaPDF(new Date()),
                    observacion: '',
                    ref_doc: null,
                    tipo_doc: null
                }
                $scope.cerrarPopup($scope.modalVerIngreso)
            }

            $scope.abrirModalVerEgreso = function (egreso) {
                $scope.egreso = egreso
                $scope.egreso.fecha = $scope.formatoFechaPDF(new Date())
                $scope.abrirPopup($scope.modalVerEgreso)
            }

            $scope.cerrarModalVerEgreso = function () {
                $scope.egreso = undefined
                $scope.cerrarPopup($scope.modalVerEgreso)
            }

            $scope.abrirModalSeguimiento = function () {
                $scope.abrirPopup($scope.modalSeguimiento)
            }

            $scope.cerrarModalSeguimiento = function () {
                $scope.transaccion = undefined
                $scope.cerrarPopup($scope.modalSeguimiento)
            }

            $scope.obtenerSaldoDiaAnterior = function () {
                const prom = obtenerSaldoCuenta($scope.usuario.id_empresa)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {

                    }
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.abrirModalRevision = function (transaccion) {
                const prom = ClasesTipo('ESTRANS')
                var erro = true
                prom.then(function (res) {
                    res.clases.map(function (clase, i) {
                        if (transaccion.id_estado == clase.id && clase.nombre === 'CONFIRMADO') {
                            erro = false
                        }
                        if (i === res.clases.length - 1) {
                            if (!erro) {
                                $scope.transaccion = transaccion
                                $scope.abrirPopup($scope.modalRevision)
                            } else {
                                $scope.mostrarMensaje('La transaccion no se puede cerrar, aún no ha sido confirmada.')
                            }
                        }
                    })
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.cerrarModalRevision = function () {
                $scope.transaccion = undefined
                $scope.cerrarPopup($scope.modalRevision)
            }

            $scope.abrirModalVencimientoCreditos = function () {
                $scope.abrirPopup($scope.modalVencimientoCreditos)
            }

            $scope.cerrarModalVencimientoCreditos = function () {
                $scope.transaccion = undefined
                $scope.cerrarPopup($scope.modalVencimientoCreditos)
            }
            $scope.vaciarDetalle = function (ingresoNuevo) {
                ingresoNuevo.detalle = ""
            }
            /* $scope.enfocarImput = function (elemento) {
				$timeout(function () {
					$("#" + elemento).focus();
				}, 0);
			} */

            $scope.enfocarSelec = function (elemento) {
               var SearchInput = $("#" + elemento);
                SearchInput.val(SearchInput.val());
                var strLength= SearchInput.val().length;
                SearchInput.focus();
                SearchInput[0].setSelectionRange(strLength, strLength); 
            }
            

            $scope.agregardetalleTransaccion = (ingresoNuevo) => {
                if(ingresoNuevo.concepto != null && ingresoNuevo.tipo_doc != null && ingresoNuevo.cuenta != null && ingresoNuevo.fecha != null){
                    if (ingresoNuevo === undefined) {
                        ingresoNuevo = { ventas: [] };
                    } else if (ingresoNuevo.ventas === undefined) {
                        ingresoNuevo.ventas = []
                    }
                    if (!ingresoNuevo.detalleSeleccionado) return toastr.warning("Aun no ha seleccionado el Cliente");// alert('No ha seleccionado nada aún.')
                    const prof = {
                        id: ingresoNuevo.detalleSeleccionado.id,
                        factura: ingresoNuevo.detalleSeleccionado.factura,
                        total: ingresoNuevo.detalleSeleccionado.monto,
                        cliente: { razon_social: ingresoNuevo.detalleSeleccionado.razon_social, id: ingresoNuevo.detalleSeleccionado.cliente },
                        a_cuenta: ingresoNuevo.detalleSeleccionado.a_cuenta,
                        saldo: 0,
                        saldo_ant: ingresoNuevo.detalleSeleccionado.saldo,
                        es_proforma: true,
                        correlativo: ingresoNuevo.detalleSeleccionado.correlativo,
                        porCobrar: ingresoNuevo.detalleSeleccionado.saldo
                    }

                    var clientEncontrado = ingresoNuevo.ventas.find(function (datosBusqueda) {
                        return datosBusqueda.cliente.id == ingresoNuevo.detalleSeleccionado.cliente 
                    })
                    existe = false;
                    for (let index = 0; index < ingresoNuevo.ventas.length; index++) {
                        const busqProforma = ingresoNuevo.ventas[index];
                        if(ingresoNuevo.detalleSeleccionado.id == busqProforma.id ){
                            existe = true;
                        } 
                    }
                    
                    if(ingresoNuevo.ventas.length == 0){
                        if(ingresoNuevo.detalleSeleccionado.id){
                            ingresoNuevo.ventas.push(prof);
                            $scope.calcularImporteTransaccion(ingresoNuevo,prof)
                            ingresoNuevo.detalleSeleccionado = ingresoNuevo.detalleSeleccionado.razon_social;
                        }else{
                            toastr.warning("Debe seleccionar el Razón Social Cliente");
                        }
                    }else{
                        if(clientEncontrado){
                            if(existe == false){
                                ingresoNuevo.ventas.push(prof);
                                $scope.calcularImporteTransaccion(ingresoNuevo,prof)
                            }else{
                                toastr.warning("Factura N° "+ingresoNuevo.detalleSeleccionado.factura+", Proforma N° "+ingresoNuevo.detalleSeleccionado.correlativo+" Ya Existe En El Detalle");
                            }
                            ingresoNuevo.detalleSeleccionado = ingresoNuevo.detalleSeleccionado.razon_social;
                        }else{
                            toastr.warning("NO puede Agregar Cliente distinto al anterior");
                        }
                    }
                    $scope.enfocarSelec("transacRazonSocial")
                }else{
                    toastr.warning("Debe de llenar todos los datos anteriormente");
                }
            };

            $scope.filtroEliminado = function (detalle) {
                return !detalle.eliminado || detalle.eliminado == false
            }

            $scope.calcularImporteTransaccion = (ingreso, detalles) => {
                $scope.detalleInvalid = false
               if(detalles.porCobrar){
                   detalles.saldo = detalles.saldo_ant - detalles.porCobrar
               }else{
                    detalles.saldo = detalles.saldo_ant
               }
                let total = 0
                ingreso.detalle = ''
                for (let index = 0; index < ingreso.ventas.length; index++) {
                    const venta = ingreso.ventas[index]
                    total += venta.porCobrar || 0;

                    if (ingreso.detalle && ingreso.detalle !== '') {
                        ingreso.detalle += ', Factura N° ' + venta.factura
                    } else {
                        ingreso.detalle = 'Cobro(s) Factura N° ' + venta.factura
                    }
                    if(venta.porCobrar != null){
                        if(!$scope.detalleInvalid){
                            if(venta.porCobrar > venta.saldo_ant){
                                $scope.detalleInvalid = true
                            }
                            if(venta.porCobrar <= 0){
                                $scope.detalleInvalid = true
                            }
                            if(venta.porCobrar <= venta.saldo_ant && venta.porCobrar > 0){
                                $scope.detalleInvalid = false
                            }
                        }
                    }else{
                        $scope.detalleInvalid = true
                    }
                }
                ingreso.haber = total
            }

            $scope.eliminarDetalleTransaccion = function (detalle, ingreso) {
                detalle.eliminado = true
                for (let index = 0; index < ingreso.ventas.length; index++) {
                    if (ingreso.ventas[index].eliminado) {
                        ingreso.ventas.splice(index, 1);
                    }
                }
                $scope.calcularImporteTransaccion(ingreso, detalle)
            }
            
            /* $scope.focusMethod = function getFocus() {
				document.getElementById("focusjs").focus();
			} */
            // para celeccionsr con enter 
            $scope.enfocar = function (elemento) {
				$timeout(function () {
					$("#" + elemento).focus();
				}, 0);
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

            $scope.buscarTransaccion = function (query) {
				blockUI.start()
				if (query != "" && query != undefined) {
					var promesa = ListaProformasXcobrar($scope.usuario.id_empresa, query);
					var p = promesa.then(function (datos) {if (datos.length > 0) {
							return promesa
						} else {
							SweetAlert.swal("", "No existen coincidencias en la búsqueda", "warning");
						}
					}, function (err) {
						SweetAlert.swal("", err.message, "warning");
						blockUI.stop()
					})
					blockUI.stop()
					return p;
				}
                $scope.interceptarTecla(query, "razon_socialP", true);
			}

            $scope.agregardetalleTransaccionEd = (agregar) => {
                if(agregar.concepto != null && agregar.tipo_documento != null && agregar.cuenta != null){
                    if (agregar === undefined) {
                        agregar = { detallesTransaccion: [] };
                    } else if (agregar.detallesTransaccion === undefined) {
                        agregar.detallesTransaccion = []
                    }
                    if (!agregar.detalleSeleccionadoEd) return toastr.warning("Aun no ha seleccionado el Cliente.");
                    const prof = {
                        id: agregar.detalleSeleccionadoEd.id,
                        factura: agregar.detalleSeleccionadoEd.factura,
                        total: agregar.detalleSeleccionadoEd.monto,
                        cliente: { razon_social: agregar.detalleSeleccionadoEd.razon_social, id: agregar.detalleSeleccionadoEd.id_cliente },
                        a_cuenta: agregar.detalleSeleccionadoEd.monto,
                        totalImporteBs: agregar.detalleSeleccionadoEd.monto,
                        saldo: agregar.detalleSeleccionadoEd.saldo,
                        es_proforma: true,
                        correlativo: agregar.detalleSeleccionadoEd.correlativo,
                        porCobrar: agregar.detalleSeleccionadoEd.saldo,
                        aCuentaAnterior: agregar.detalleSeleccionadoEd.aCuentaAnterior,
                        montoAnterior:agregar.detalleSeleccionadoEd.montoAntt
                    }
                    var edicion = false
                    var existe = false
                    for (let index = 0; index < agregar.detallesTransaccion.length; index++) {
                        const datoProforma = agregar.detallesTransaccion[index];
                        if(agregar.detalleSeleccionadoEd.id == datoProforma.proforma.id ){
                            if(datoProforma.id){
                                edicion = true
                            }
                            existe = true
                        } 
                    }
                    if(existe){
                        if(!edicion){
                            toastr.warning("N° de factura "+agregar.detalleSeleccionadoEd.factura+" ya existe en el detalle");
                        }else{
                            agregar.detalleSeleccionadoEd = undefined;
                        }
                    }else{
                        agregar.detallesTransaccion.push({proforma:prof, monto: prof.saldo,montoAnterior: 0 });
                        agregar.detalleSeleccionadoEd = undefined;
                        $scope.calcularImporteTransaccionEd(agregar)
                    }
                }else{
                    toastr.warning("Debe de llenar todos los datos anteriormente.");
                }
               
            };

            $scope.calcularImporteTransaccionEd = (ingreso) => {
                let total = 0
                ingreso.detalle = ''
                for (let index = 0; index < ingreso.detallesTransaccion.length; index++) {
                    const venta = ingreso.detallesTransaccion[index]
                    total += venta.monto || 0;
                    if (ingreso.detalle && ingreso.detalle !== '') {
                        ingreso.detalle += ', Factura N° ' + venta.proforma.factura
                    } else {
                        ingreso.detalle = 'Cobro(s) Factura N° ' + venta.proforma.factura
                    }
                }
                ingreso.totalGRL = total
            }

            $scope.detalleInvalid = false
            $scope.calcularSaldoEd = (ingreso, detalle)=>{
                if(detalle.monto){
                    detalle.proforma.a_cuenta = (detalle.proforma.aCuentaAnterior - detalle.montoAnterior) + detalle.monto
                 
                    if(detalle.monto > ((detalle.proforma.totalImporteBs - detalle.proforma.aCuentaAnterior) + detalle.montoAnterior)){  
                    $scope.detalleInvalid = true 
                    }else if(detalle.monto<=0){  
                        $scope.detalleInvalid = true 
                    }else{
                        $scope.detalleInvalid = false 
                    }
                }else {

                    detalle.proforma.a_cuenta = detalle.proforma.aCuentaAnterior - detalle.montoAnterior 
                    $scope.detalleInvalid = true;
                }
                $scope.calcularImporteTransaccionEd(ingreso)

            }

            $scope.eliminarDetalleTransaccionEdicion = function (detalle, transaccion, index) {
                elimDetalleTransacEdicion({detalle:detalle,transaccion:transaccion}).then(function(dato) {
                    if (transaccion.concepto.nombre_corto =='CTRAN') {
                        transaccion.detallesTransaccion.splice(index, 1);
                        $scope.calcularImporteTransaccionEd(transaccion)
                        $scope.obtenerVencimientosEdic(transaccion);
                        $scope.obtenerTransacciones()
                    }
                    if (transaccion.concepto.nombre_corto =='PTRAN') {
                        transaccion.detallesTransaccion.splice(index, 1);
                        $scope.calcularImporteTransaccionEdPago(transaccion)
                        $scope.obtenerTransacciones()
                    }
                })  
            }
            
            $scope.confirmarEliminarDetalleTransEdicion = function (detalle, transaccion, index) {
                if(detalle.proforma){
                    SweetAlert.swal({
                        title: "Esta seguro?",
                        text: "Esta segur@ de Eliminar Factura N° "+detalle.proforma.factura+" de la transacción !!!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No"
                    }).then(function (result) {
                        if (result.value) {
                            $scope.eliminarDetalleTransaccionEdicion(detalle, transaccion, index);
                        } 
                    });  
                }
                if(detalle.compra){
                    SweetAlert.swal({
                        title: "Esta seguro?",
                        text: "Esta segur@ de Eliminar Factura N° "+detalle.compra.factura+" de la transacción !!!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No"
                    }).then(function (result) {
                        if (result.value) {
                            $scope.eliminarDetalleTransaccionEdicion(detalle, transaccion, index);
                        } 
                    });   
                }
            }
            $scope.showSelecccionCobro = function (ingreso) {
                if (ingreso === undefined || ingreso === null) {
                    return true /// volver a false despues de
                }
                if(ingreso.id){ /// para cobros de transacc edicion
                    if (ingreso.concepto != undefined && ingreso.concepto !== null) {
                        if (ingreso.concepto.id == $scope.TRAN_COBRO.id) {
                            return true
                            
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }

                }else{/// para nuevos cobros
                    if (ingreso.concepto != undefined && ingreso.concepto !== null) {
                        if (ingreso.concepto == $scope.TRAN_COBRO.id) {
                            return true
                            
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            } 

            $scope.showSelecccionPago = function (egreso) {
                if (egreso === undefined || egreso === null) {
                    return true 
                }
                if(egreso.id){ /// para cobros de transacc edicion
                    if (egreso.concepto != undefined && egreso.concepto !== null) {
                        if (egreso.concepto.id == $scope.TRAN_PAGO.id) {
                            return true
                            
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }else{/// para nuevos cobros
                    if (egreso.concepto != undefined && egreso.concepto !== null) {
                        if (egreso.concepto == $scope.TRAN_PAGO.id) {
                            return true
                            
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            } 
            $scope.showSelecccionSaldoInic = function (ingreso) {
                if (ingreso === undefined || ingreso === null) {
                    return true
                }
                if(ingreso.id){ /// para cobros de transacc edicion
                    if (ingreso.concepto != undefined && ingreso.concepto !== null) {
                        if (ingreso.concepto.id == $scope.SALDO_INICIAL.id) {
                            return true
                            
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }else{
                    if (ingreso.concepto != undefined && ingreso.concepto !== null) {
                        if (ingreso.concepto == $scope.SALDO_INICIAL.id) {
                            //$scope.detalleInvalid =false;
                            return true 
                        }else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            }
            $scope.showSelecccionSeguimiento = function (ingreso) {
                

                if (ingreso === undefined || ingreso === null) {
                    return true 
                }
                if (ingreso.tipo_doc != undefined && ingreso.tipo_doc !== null) {
                    var idCheq = null
                    for (let index = 0; index < $scope.tiposDocumentos.clases.length; index++) {
                        const buscDatos = $scope.tiposDocumentos.clases[index];
                        if (buscDatos.nombre_corto == 'CHEQUE') {
                            idCheq =  buscDatos.id
                        }
                    }
                    if (ingreso.tipo_doc == idCheq) {
                        return true
                        
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } 

            $scope.buscarTransaccionPagos = function (query) {
				blockUI.start()
				if (query != "" && query != undefined) {
					var promesa = ListaProformasXpago($scope.usuario.id_empresa, query);
					var p = promesa.then(function (datos) 
                        {if (datos.length > 0) {
							return promesa
						} else {
							SweetAlert.swal("", "No existen coincidencias en la búsqueda", "warning");
						}
					}, function (err) {
						SweetAlert.swal("", err.message, "warning");
						blockUI.stop()
					})
					blockUI.stop()
					return p;
				}
                $scope.interceptarTecla(query, "razon_socialP", true);
			}

            $scope.agregardetalleTransaccionPago = function (programPago) {
                if(programPago.concepto != null && programPago.tipo_doc != null && programPago.cuenta != null && programPago.fecha != null){
                    if (!programPago.detalleSeleccionadoPago.id_progPago) return toastr.warning("Aun no ha seleccionado al Proveedor.");
                    const prom = ListaPagosXprogramac($scope.usuario.id_empresa, $scope.usuario.id, programPago.detalleSeleccionadoPago)
                    prom.then(function (datos) {
                        $scope.ingresoNuevo.pagosProgramad = datos.pagosProgramados
                        $scope.calcularImporteTransaccionPago($scope.ingresoNuevo, $scope.ingresoNuevo.pagosProgramad)
                    }).catch((err) => {
                        blockUI.stop();
                        const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }else{
                    toastr.warning("Debe de llenar todos los datos anteriormente");
                }
            }
            $scope.eliminarDetalleTransaccionPago = function (detalle, pago) {
                detalle.eliminado = true
                for (let index = 0; index < pago.pagosProgramad.length; index++) {
                    if (pago.pagosProgramad[index].eliminado) {
                        pago.pagosProgramad.splice(index, 1);
                    }
                }
                $scope.calcularImporteTransaccionPago(pago, detalle)
            }

            $scope.calcularImporteTransaccionPago = (ingreso, detalles) => {
                $scope.detalleInvalidP = false;
                if(detalles.porPagar){
                    detalles.saldoAct = detalles.saldo - detalles.porPagar
                }else{
                     detalles.saldoAct = detalles.saldo
                }
                 let total = 0
                 ingreso.detalle = ''
                 for (let index = 0; index < ingreso.pagosProgramad.length; index++) { 
                     const pago = ingreso.pagosProgramad[index]
                     total += pago.porPagar || 0; 
 
                     if (ingreso.detalle && ingreso.detalle !== '') {
                         ingreso.detalle += ', Factura N° ' + pago.factura
                     } else {
                         ingreso.detalle = 'Pago(s) Factura N° ' + pago.factura
                    }
                    if(pago.porPagar != null){
                        if(!$scope.detalleInvalidP){
 
                            if(pago.porPagar > pago.saldo){
                                $scope.detalleInvalidP = true
                            }
                            if(pago.porPagar <= 0){
                                $scope.detalleInvalidP = true
                            }
                            if(pago.porPagar <= pago.saldo && pago.porPagar > 0){
                                $scope.detalleInvalidP = false
                            }
                        }
                    }else{
                        $scope.detalleInvalidP = true
                    }
                 }
                ingreso.debe = total
             }

             

            $scope.agregardetalleTransaccionEdPago = (programPago) => {
                if(programPago.concepto != null && programPago.tipo_doc != null && programPago.cuenta != null && programPago.fecha != null){
                    if (!programPago.detalleSeleccionadoEdPago.id_progPago) return toastr.warning("Aun no ha seleccionado al Proveedor.");
                    const prom = ListaPagosXprogramacEd($scope.usuario.id_empresa, $scope.usuario.id, programPago.detalleSeleccionadoEdPago)
                    prom.then(function (datos) {
                        var ddd = [...datos.pagosProgramados]
                        var datosNuevos = ddd.filter(function (o1) {//concatenando a la tabla ya exixtente
                            if(!o1.id){
                                o1.compra = {
                                    id: o1.id_compra,
                                    a_cuenta: o1.a_cuenta?o1.a_cuenta:o1.total,
                                    saldo: o1.saldo,
                                    total: o1.total,
                                    factura: o1.factura,
                                    fecha: o1.fecha,
                                    porPagar: o1.porPagar,
                                    aCuentaAnterior: o1.a_cuenta,
                                    proveedor: {id: o1.proveedor, razon_social: o1.razon_social},
                                    DetalleCompraProgramacionPago: {
                                        CompraProgramacionPago: { id: o1.id_progPago, correlativo: o1.correlatProgramPago}
                                    }
                                },
                                o1.saldoAct = o1.saldoAct
                                o1.montoAnterior = o1.montoAnterior
                                o1.monto = o1.saldo?o1.saldo:o1.total
                            }
                            return !$scope.transaccion.detallesTransaccion.some(function (o2) {
                                return o1.id_compra === o2.id_compra; 
                           });
                        });
                       /*  let datosNuevos = datos.pagosProgramados.filter(o1 => !$scope.transaccion.detallesTransaccion.some(o2 => o1.id_compra === o2.id_compra)); */
                        $scope.transaccion.detallesTransaccion = $scope.transaccion.detallesTransaccion.concat(datosNuevos)
                        $scope.calcularImporteTransaccionEdPago($scope.transaccion)
                    }).catch((err) => {
                        blockUI.stop();
                        const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }else{
                    toastr.warning("Debe de llenar todos los datos anteriormente");
                }
            };

             $scope.calcularSaldoEdPago = (egreso, detalle)=>{
                if(detalle.monto){
                    detalle.compra.a_cuenta = (detalle.compra.aCuentaAnterior - detalle.montoAnterior) + detalle.monto
                 
                    if(detalle.monto > ((detalle.compra.total - detalle.compra.aCuentaAnterior) + detalle.montoAnterior)){  
                    $scope.detalleInvalidEdPag = true 
                    }else if(detalle.monto<=0){  
                        $scope.detalleInvalidEdPag = true 
                    }else{
                        $scope.detalleInvalidEdPag = false 
                    }
                }else {

                    detalle.compra.a_cuenta = detalle.compra.aCuentaAnterior - detalle.montoAnterior 
                    $scope.detalleInvalidEdPag = true;
                }
                $scope.calcularImporteTransaccionEdPago(egreso)
            }
            $scope.calcularImporteTransaccionEdPago = (egreso) => {
                let total = 0
                egreso.detalle = ''
                for (let index = 0; index < egreso.detallesTransaccion.length; index++) {
                    const transaccion = egreso.detallesTransaccion[index]
                    total += transaccion.monto || 0;
                    if (egreso.detalle && egreso.detalle !== '') {
                        egreso.detalle += ', Factura N° ' + transaccion.compra.factura
                    } else {
                        egreso.detalle = 'Pago(s) Factura N° ' + transaccion.compra.factura
                    }
                }
                egreso.debe= total
            }








             $scope.obtenerCambioMoneda = async function () {
                var fecha = new Date()
                try {
                    var dato = await ObtenerCambioMoneda(fecha, $scope.usuario.id_empresa)
                    return dato.monedaCambio
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.obtenerCambioMoneda2 = function (fechaMoneda) {
                if (fechaMoneda.length == 10) {
                    var fecha = new Date(convertirFecha(fechaMoneda))
                    var promesa = ObtenerCambioMoneda(fecha, $scope.usuario.id_empresa)
                    promesa.then(function (dato) {
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
                            SweetAlert.swal({
                                title:'',
                                icon: 'warning',
                                iconHtml:'<i class="fa fa-exclamation-circle size-icon"></i>',
                                text: 'No existe UFVs a la fecha seleccionado'
                            })
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

            $scope.ComvertirDebeEnDolar = function (asiento) {
                asiento.debe_sus = Math.round((asiento.debe_bs / $scope.moneda.dolar) * 10000) / 10000;
            }
            $scope.ComvertirHaberEnDolar = function (asiento) {
                asiento.haber_sus = Math.round((asiento.haber_bs / $scope.moneda.dolar) * 10000) / 10000;
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
                if ($scope.opcionBimonetario != true) {
                    $scope.opcionBimonetario = false;
                } else {
                    $scope.opcionBimonetario = true;
                }
                $scope.cal($scope.nuevoComprobante.asientosContables)
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

            $scope.abrirCuentasAxiliares = async function (asiento) {
                asiento.activo = true
                if (asiento.cuenta.tipoAuxiliar.nombre_corto == "PROVE") {
                    $scope.listaCuentasAuxiliares = await $scope.obtenerListarCuentasAuxiliares('PROVEEDOR');
                }
                setTimeout(() => {
                    $('#form-field-icon-1').focus()
                }, 400)
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
            $scope.selecionarCuentaAxiliarProv = function (asiento) {
                asiento.isOpen = false;
            }
            $scope.ultimaFechaTipoComprobanteInicioNuevo = async function () {
                let data = await UltimaFechaTipoComprobanteTransaccion($scope.usuario.id_empresa, $scope.nuevoComprobante.tipoComprobante.id)
                if (data.comprobante.length>0) {
                    return $scope.fechaATexto(new Date(data.comprobante[0].fecha))
                } else {
                    return $scope.fechaATexto(new Date())
                }
            }
             //integracion de pagos  el transaccion
            $scope.crearNuevoComprobanteTransaccionLista = async function (transaccion) {
                $scope.nuevoComprobante = {}
                $scope.moneda = await $scope.obtenerCambioMoneda();
                if (transaccion.concepto.nombre_corto =='PTRAN') {
                    const prom = ObtenerTransaccionParaComprobantes(transaccion.id);
                    prom.then(async (comprobanteTransaccion) => {
                        //console.log(comprobanteTransaccion)
                        if(comprobanteTransaccion.transaccion.length>0){
                                if($scope.moneda){
                                    $scope.datosComprob = comprobanteTransaccion.datosComprob;
                                    $scope.nuevoComprobante.concepto = transaccion.concepto
                                    $scope.nuevoComprobante.id_sucursal = $scope.datosComprob[0].sucursal
                                    $scope.nuevoComprobante.tipoComprobante = $scope.datosComprob[0].tipoComprobante
                                    $scope.nuevoComprobante.fecha =  await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                                    var detallestransaciones = []
                                    var facturas = []
                                    var nroComprobamtes = []
                                    $scope.transaccion = comprobanteTransaccion.transaccion[0];
                                    let noContab= false
                                    var listaNoContab = []
                                    for (let i = 0; i < $scope.transaccion.detallesTransaccion.length; i++) {
                                        const det = $scope.transaccion.detallesTransaccion[i];
                                        if(det.compra.asientosContab.length>0){
                                            for (let j = 0; j < det.compra.asientosContab.length; j++) {
                                                const asient = det.compra.asientosContab[j];
                                                if(asient.cuenta.CuentaConfiguracion.length < 1){ 
                                                    if(asient.cuenta.clasificacion.tipoClasificacion.nombre_corto === '2'){
                                                        var mes = 0
                                                        var anio = 0
                                                        mes = asient.comprobante.fecha.split('-')[1] 
                                                        anio = asient.comprobante.fecha.split('-')[0] 
                                                        facturas.push(det.compra.factura?det.compra.factura:'N/A')
                                                        nroComprobamtes.push(asient.comprobante.numero?asient.comprobante.numero:'N/A')
                                                        detallestransaciones.push({
                                                            cuenta: asient.cuenta,
                                                            debe_bs: det.monto,
                                                            haber_bs: 0,
                                                            debe_sus: 0,
                                                            haber_sus: 0,
                                                            cuentaAux:det.compra.proveedor,
                                                            glosa: det.compra.proveedor.razon_social+', F-'+ (det.compra.factura?det.compra.factura:'N/A' )+', '+(det.compra.observacion?det.compra.observacion:'')+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+asient.comprobante.numero+', PERIODO '+mes+'-'+anio
                                                        })
                                                    }  
                                                }
                                            }
                                            /* noContab = true
                                            listaNoContab.push('Factura: '+ det.compra.factura+' Fecha: '+$scope.fechaATexto(det.compra.fecha)+'<br>') */
                                        }else{
                                            noContab = true
                                            listaNoContab.push('Factura: '+ det.compra.factura+' Fecha: '+$scope.fechaATexto(det.compra.fecha)+'<br>')
                                        }
                                    }
                                    detallestransaciones.push({
                                        cuenta: $scope.transaccion.cuenta.cuenta,
                                        debe_bs: 0,
                                        haber_bs: $scope.transaccion.debe,
                                        debe_sus: 0,
                                        haber_sus: 0,
                                        glosa: $scope.transaccion.proveedor.razon_social+', F-'+ facturas.join('-')+', '+$scope.transaccion.observaciones+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+nroComprobamtes.join('-')
                                    })
                                    $scope.nuevoComprobante.gloza = $scope.transaccion.proveedor.razon_social+', F-'+ facturas.join('-')+', '+$scope.transaccion.observaciones+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+nroComprobamtes.join('-')
                                    $scope.nuevoComprobante.id_transaccion = $scope.transaccion.id
                                    $scope.nuevoComprobante.debe = $scope.transaccion.debe
                                    $scope.nuevoComprobante.moneda = $scope.moneda
                                    
                                    $scope.nuevoComprobante.asientosContables = detallestransaciones
        
                                    $scope.cal($scope.nuevoComprobante.asientosContables)

                                    shortcut.add("Ctrl+G", function () {
                                        $scope.confirmacionDeGuardarIntegracion($scope.nuevoComprobante)
                                    });
                                    if(noContab){
                                        
                                        SweetAlert.swal({
                                            title:'Error al Integrar',
                                            icon: 'warning',
                                            iconHtml: '<img src="img/pensand.jpg" alt="" width="57" height="57"></img>'/* '<i class="fa fa-frown-o size-icon"></i>' */,
                                            html: "<div class='content-sweet'>" + listaNoContab.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-danger'>Verifique que todas las facturas esten Contabilizadas</dt></dl>",
								        })
                                    }else{
                                        $scope.abrirPopup($scope.idModalWizardComprobanteTransaccionPago);
                                    }
                                }else{
                                    toastr.warning("Cargar Tipo de Cambio de UFV y Dolar");
                                }
                        }else{
                            toastr.warning("Verifique que esten contabilizadas las compras del proveedor");
                        }
                        }).catch((err) => {
                        alert(err.stack && err.stack || 'Se perdió la conexión')
                    })
                }
                if (transaccion.concepto.nombre_corto =='CTRAN') {
                    //toastr.warning("Aun no se pueden integrar cobros");
                    const prom = ObtenerTransaccionParaComprobantes(transaccion.id);
                    prom.then(async (comprobanteTransaccion) => {
                        if(comprobanteTransaccion.transaccion.length>0){
                            if($scope.moneda){
                                $scope.datosComprob = comprobanteTransaccion.datosComprob;
                                $scope.nuevoComprobante.concepto = transaccion.concepto
                                $scope.nuevoComprobante.id_sucursal = $scope.datosComprob[0].sucursal
                                $scope.nuevoComprobante.tipoComprobante = $scope.datosComprob[0].tipoComprobante
                                $scope.nuevoComprobante.fecha =  await $scope.ultimaFechaTipoComprobanteInicioNuevo()
                                var detallestransaciones = []
                                var facturas = []
                                var nroComprobamtes = []
                                $scope.transaccion = comprobanteTransaccion.transaccion[0];
                                let noContab= false
                                var listaNoContabCob = []
                                //const numeros_facturas = proformas.map(proforma => proforma.factura).join(',')
                                const nfactGlosaDebe = $scope.transaccion.detallesTransaccion.map(profrm =>profrm.proforma.factura).join(',')
                                const nComprGlosaDebe = $scope.transaccion.detallesTransaccion.map(profrmCompr =>profrmCompr.proforma.ProformasContabilidad[0].asientoContabilidad.comprobante.numero).join(',')
                                detallestransaciones.push({
                                    cuenta: $scope.transaccion.cuenta.cuenta,
                                    debe_bs: $scope.transaccion.haber,
                                    haber_bs: 0,
                                    debe_sus: 0,
                                    haber_sus: 0,
                                    glosa: $scope.transaccion.cliente.razon_social+', F-'+ nfactGlosaDebe+', '+$scope.transaccion.observaciones+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+nComprGlosaDebe
                                })
                                 for (let i = 0; i < $scope.transaccion.detallesTransaccion.length; i++) {
                                    const det = $scope.transaccion.detallesTransaccion[i];
                                    if(det.proforma.ProformasContabilidad.length>1){
                                        for (let j = 0; j < det.proforma.ProformasContabilidad.length; j++) {
                                            const profContab = det.proforma.ProformasContabilidad[j]
                                            if(profContab.asientoContabilidad.cuenta.clasificacion.tipoClasificacion.nombre_corto === '1'){
                                                var mes = 0
                                                var anio = 0
                                                mes = profContab.asientoContabilidad.comprobante.fecha.split('-')[1] 
                                                anio = profContab.asientoContabilidad.comprobante.fecha.split('-')[0] 
                                                facturas.push(det.proforma.factura?det.proforma.factura:'N/A')
                                                nroComprobamtes.push(profContab.asientoContabilidad.comprobante.numero?profContab.asientoContabilidad.comprobante.numero:'N/A')
                                                detallestransaciones.push({
                                                    cuenta: profContab.asientoContabilidad.cuenta,
                                                    debe_bs: 0,
                                                    haber_bs:det.monto,
                                                    debe_sus: 0,
                                                    haber_sus: 0,
                                                    cuentaAux:det.proforma.cliente,
                                                    glosa: det.proforma.cliente.razon_social+', F-'+ (det.proforma.factura?det.proforma.factura:'N/A' )+', '+(det.proforma.actividadEconomica?det.proforma.actividadEconomica.nombre:'')+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+profContab.asientoContabilidad.comprobante.numero+', PERIODO '+mes+'-'+anio
                                                })
                                            }  
                                        }
                                    }else{
                                        noContab = true
                                        listaNoContabCob.push('N° Prof: '+ det.proforma.correlativo+' - N° Fact: '+ det.proforma.factura+' - Fecha Fact: '+$scope.fechaATexto(det.proforma.fecha_factura)+'<br>')
                                    }
                                } 
                                
                                $scope.nuevoComprobante.gloza = $scope.transaccion.cliente.razon_social+', F-'+ facturas.join('-')+', '+$scope.transaccion.observaciones+', '+$scope.transaccion.tipo_documento.nombre+', CT-'+nroComprobamtes.join('-')
                                $scope.nuevoComprobante.id_transaccion = $scope.transaccion.id
                                $scope.nuevoComprobante.haber = $scope.transaccion.haber
                                $scope.nuevoComprobante.moneda = $scope.moneda
                                
                                $scope.nuevoComprobante.asientosContables = detallestransaciones
        
                               $scope.cal($scope.nuevoComprobante.asientosContables)

                                shortcut.add("Ctrl+G", function () {
                                    $scope.confirmacionDeGuardarIntegracion($scope.nuevoComprobante)
                                });
                                if(noContab){
                                    
                                    SweetAlert.swal({
                                        title:'Error al Integrar',
                                        icon: 'warning',
                                        iconHtml: '<img src="img/pensand.jpg" alt="" width="57" height="57"></img>',
                                        html: "<div class='content-sweet'>" + listaNoContabCob.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-danger'>Verifique que todas las facturas esten Contabilizadas</dt></dl>",
							        })
                                }else{
                                    $scope.abrirPopup($scope.idModalWizardComprobanteTransaccionPago);
                                }
                            }else{
                                toastr.warning("Cargar Tipo de Cambio de UFV y Dolar");
                            }
                        }else{
                            toastr.warning("Verifique que esten contabilizadas las ventas al cliente");
                        }




                    }).catch((err) => {
                        alert(err.stack && err.stack || 'Se perdió la conexión')
                    })
                }
             }

            $scope.confirmacionDeGuardarIntegracion = function(datosComprobanteNuevo){
                let registro = datosComprobanteNuevo.crearRegistroCompAntiguo?'SI':'NO'
                let comproante = datosComprobanteNuevo.tipoComprobante?datosComprobanteNuevo.tipoComprobante.nombre:''
                let fech = datosComprobanteNuevo.fecha?datosComprobanteNuevo.fecha:''
                SweetAlert.swal({
                    title: "Esta seguro?",
                    html: "Guardar la integración...!!"+'<br><br><b>Tipo de comprobante: </b>'+ comproante+'<br><b>Registro de comprobante antiguo: </b>'+ registro+'<br><b>Fecha: </b>'+ fech,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.guardarNuevoComprobantetransaccion(datosComprobanteNuevo);
                    } 
                });
            }
             
            $scope.cerrarDialogComprobanteTransaccion = function () {
                $scope.cerrarPopup($scope.idModalWizardComprobanteTransaccionPago);
            }

            $scope.guardarNuevoComprobantetransaccion = function (datosComprobanteNuevo) {
                blockUI.start()
                var fech = $scope.convertirFecha(datosComprobanteNuevo.fecha);
                datosComprobanteNuevo.fecha = fech
                datosComprobanteNuevo.id_empresa = $scope.usuario.id_empresa
                datosComprobanteNuevo.id_usuario = $scope.usuario.id
                datosComprobanteNuevo.total = $scope.totales.debe_bs ///monto total de debe y haber

                const prom = GuardarComprobanteTransaccion(datosComprobanteNuevo)
                prom.then(function (res) {
                    if (res.hasErr) {
                        SweetAlert.swal({
                            title:'',
                            icon: 'warning',
                            iconHtml:'<i class="fa fa-exclamation-circle size-icon"></i>',
                            text: res.mensaje
                        })
                    } else {
                        $scope.cerrarDialogComprobanteTransaccion();
                        SweetAlert.swal({
                            title: 'Finalizado!',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false 
                        })
                        $scope.imprimirComprobanteTransaccion(res.registroComprobante)
                        shortcut.remove("Ctrl+G")
                        $scope.filtrarTransacciones($scope.filtro)
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }



            $scope.imprimirComprobanteTransaccion = async (registroComprobante) => {
                blockUI.stop();
                const doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                const stream = doc.pipe(blobStream());
                var itemsPorPagina = 20;
				var y = 150, items = 0, pagina = 1, totalPaginas = (Math.ceil((registroComprobante.asientosContables.length + 2) / itemsPorPagina));
				var sumaDebeBs = 0, sumaHaberBs = 0
                $scope.DibujarCabeceraComprobanteTransac(doc,registroComprobante,pagina, totalPaginas)
               for (let i = 0; i < registroComprobante.asientosContables.length; i++) {
                   const asiento = registroComprobante.asientosContables[i];
					doc.rect(450, y, 0, 30).stroke();
					doc.rect(520, y, 0, 30).stroke();
					doc.font('Helvetica', 7);
					doc.text(asiento.cuenta.codigo, 28, y + 5)
					doc.font('Helvetica-Bold', 6);
                    var auxiliar = asiento.cuenta.id_tipo_auxiliar?asiento.cuentaAux.nombre:''
					doc.text(auxiliar, 28, y + 13, { width: 80 })
					doc.font('Helvetica-Bold', 7);
					doc.text(asiento.cuenta.nombre, 120, y + 5, { width: 190, underline: true })
					doc.font('Helvetica', 6);
					doc.text(asiento.glosa, 125, y + 15, { width: 200 })
					var debe_bs = number_format(asiento.debe_bs, 2)
					var haber_bs = number_format(asiento.haber_bs, 2)
					if (debe_bs != "0.00") doc.text(debe_bs, 450, y + 5, { width: 65, align: 'right' })
					if (haber_bs != "0.00") doc.text(haber_bs, 520, y + 5, { width: 65, align: 'right' })
					sumaDebeBs += 0 + asiento.debe_bs
					sumaHaberBs += 0 + asiento.haber_bs
					y = y + 30;
					items++;
					if (items === itemsPorPagina) {
						if (pagina != totalPaginas) {
							doc.rect(450, y, 0, 12).stroke();
							doc.rect(520, y, 0, 12).stroke();
						}
						doc.addPage({ compress: false, size: 'letter', margin: 10 });
						y = 150;
						items = 0;
						pagina = pagina + 1;
						$scope.DibujarCabeceraComprobanteTransac(doc,registroComprobante,pagina, totalPaginas)
					}
               }
               doc.font('Helvetica-Bold', 7);
               doc.text("SUMA TOTAL:", 390, y + 5)
               doc.font('Helvetica', 7);
               sumaDebeBss = number_format(sumaDebeBs, 2)
               sumaHaberBss = number_format(sumaHaberBs, 2)
               doc.text(sumaDebeBss, 450, y + 5, { width: 60, align: 'right' })
               doc.text(sumaHaberBss, 520, y + 5, { width: 60, align: 'right' })
               doc.rect(20, y, 571, 0).stroke();
               doc.rect(20, y + 15, 571, 0).stroke();
               doc.font('Helvetica-Bold', 7);
               doc.rect(450, y, 0, 15).stroke();
               doc.rect(520, y, 0, 15).stroke();
               //conercion del importe en literal
                doc.text("Son:", 38, y + 20)
				doc.font('Helvetica', 7);
				doc.text(NumeroLiteral.Convertir(parseFloat(sumaDebeBs).toFixed(2).toString()), 60, y + 20)
				doc.rect(20, y + 30, 571, 0).stroke();
                //pie de pagina     
                doc.rect(20, 720, 571, 0).stroke();
				doc.font('Helvetica-Bold', 7);
				doc.text("Preparado por:", 38, 725)
				doc.font('Helvetica', 7);
				doc.text(registroComprobante.usuario.persona.nombre_completo, 38, 735)
				doc.rect(200, 720, 0, 42).stroke();
                doc.rect(310, 720, 0, 42).stroke();
				doc.rect(420, 720, 0, 42).stroke();
				doc.rect(20, 750, 571, 0).stroke();
				var fechaActual = new Date(registroComprobante.fecha_creacion)
				doc.text($scope.formatoFechaPDF(fechaActual), 38, 752)
				doc.text("IMP.:"+$scope.formatoFechaPDF(new Date()), 38, 765)
				doc.text("Revisado", 240, 752)
				doc.text("Autorizado", 350, 752)
				doc.text("Recibio conforme:", 425, 740)
				doc.text("CI:", 425, 752)

                doc.end();
                stream.on('finish', () => {
                    const fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.DibujarCabeceraComprobanteTransac = function (doc, registroComprobante, pagina, totalPaginas) {
                doc.rect(20, 30, 571, 731).stroke();
				doc.font('Helvetica-Bold', 9);
				doc.text(registroComprobante.usuario.empresa.razon_social.toUpperCase(), 25, 35)
				if (registroComprobante.usuario.empresa.direccion) {
					doc.text(registroComprobante.usuario.empresa.direccion, 25, 47)
					doc.text("NIT:", 25, 57)
					doc.font('Helvetica-Bold', 8);
					doc.text(registroComprobante.usuario.empresa.nit, 45, 57)
				} else {
					doc.text("NIT:", 25, 47)
					doc.font('Helvetica-Bold', 8);
					doc.text(registroComprobante.usuario.empresa.nit, 45, 47)
				}
				doc.font('Helvetica-Bold', 14);
				doc.text("COMPROBANTE DE "+ registroComprobante.tipoComprobante.nombre, 0, 72, { align: 'center' })// 
				doc.font('Helvetica-Bold', 12);
				 doc.text("N° "+ registroComprobante.numero , 515, 35, { width: 85, align: 'center' })//
				doc.font('Helvetica-Bold', 8);
				doc.text(pagina + ' de ' + totalPaginas, 515, 47, { width: 85, align: 'center' })
                var anio = new Date(registroComprobante.fecha).getFullYear()
				doc.text("Gestión "+ anio, 515, 57, { width: 85, align: 'center' })//.getFullYear()
				doc.rect(20, 90, 571, 0).stroke();
				doc.font('Helvetica', 8);
                if(registroComprobante.gloza.length<300){
                    doc.text(registroComprobante.gloza, 25, 100, { width: 460 })
                }else{
                    doc.text(registroComprobante.gloza, 25, 92, { width: 460 })
                }
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha: " + $scope.formatoFechaPDF(registroComprobante.fecha) , 500, 100)
				doc.text("T. Cambio: ", 500, 108)
				doc.font('Helvetica', 8);
				doc.text(registroComprobante.tipoCambio.dolar, 545, 108)
				doc.font('Helvetica-Bold', 8);
				doc.rect(20, 125, 571, 0).stroke();
				doc.text("Cuenta", 50, 135)
				doc.text("Descripcion/Glosa", 150, 135)
				doc.text("Ref", 405, 135)
				doc.text("BOLIVIANOS", 500, 128)
				doc.rect(20, 150, 571, 0).stroke();//
				doc.rect(450, 137, 140, 0).stroke();//*
				doc.rect(450, 125, 0, 25).stroke();
				doc.rect(520, 137, 0, 14).stroke();
				doc.text("Debe", 475, 140)
				doc.text("Haber", 545, 140) 
            }

            







            











            

            $scope.inicio()
        }]);



/* function imprimirDetallesProforma(proformas, doc, y, total_bs, total_usd, ingreso, imagen, $scope) {
    for (let index = 0; index < proformas.length; index++) {
        const proforma = proformas[index]
        if (!proforma) return alert('No se encontró identificador de proforma');
        for (let i = 0; i < proforma.detallesProformas.length; i++) {
            doc.font('Helvetica', 10);
            const centro_costo = proforma.detallesProformas[i]?.centroCosto?.nombre
            if (centro_costo?.length > 7) doc.font('Helvetica', 8);
            doc.text(centro_costo || '', 40, y);
            doc.font('Helvetica', 10);
            const detalle = 'Factura Nro. ' + (proforma?.factura ?? 'X') + ', Proforma Nro. ' + (proforma?.correlativo ?? 'X') + ', ' + (proforma?.detallesProformas[i]?.servicio?.nombre ?? 'Desconocido');
            doc.text(detalle, 100, y, { width: 360 });
            const bs = (proforma?.detallesProformas[i]?.importe / proforma?.totalImporteBs) * ingreso.haber / proformas.length;
            doc.text(bs.toFixed(2) || '0.00', 450, y, { width: 50, align: 'right' });
            const usd = ((proforma?.detallesProformas[i]?.importe / proforma?.totalImporteBs) * ingreso.haber / proformas.length) / proforma.cambio_dolar;
            doc.text(usd.toFixed(2), 530, y, { width: 50, align: 'right' });
            const legt = ((detalle.length > 76 && detalle.length < 120) ? 30 : ((detalle.length > 120) ? 45 : 15))
            y += legt;
            total_bs += bs;
            total_usd += usd;
            if ((y > 700)) {
                doc.font('Helvetica', 6);
                doc.text('Usuario:', 40, y);
                doc.text($scope.usuario.nombre_usuario, 100, y);
                y += 10;
                doc.text('Fecha Emisión:', 40, y);
                doc.text($scope.formatoFechaPDF(ingreso.fecha) + ' ' + $scope.formatoTiempoPDF(ingreso.fecha), 100, y);
                y += 10;
                doc.text('Fecha impresión:', 40, y);
                doc.text($scope.formatoFechaPDF(new Date()) + ' ' + $scope.formatoTiempoPDF(new Date()), 100, y);
                doc.addPage({ size: [612, 792], margin: 10 });
                y = 100;
                doc.rect(40, y + 5, 540, 0).stroke();
                y+=10;
                doc.font('Helvetica-Bold', 10);
                doc.text('C. COSTO', 40, y);
                doc.text('OBSERVACIÓN/DETALLE', 100, y);
                doc.text('BS', 485, y);
                doc.text('USD', 560, y);
                y += 15;
                doc.rect(40, y - 5, 540, 0).stroke();
                if (imagen) doc.image(imagen, 30, 20, { fit: [70, 70] });
            }
        }
    }
    return { y, total_bs, total_usd };
} */
