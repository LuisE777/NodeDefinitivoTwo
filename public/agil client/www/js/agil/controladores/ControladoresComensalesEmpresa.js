angular.module('agil.controladores')

    .controller('controladorComensalesEmpresa', ['ObtenerImagen', '$scope', '$timeout', '$localStorage', '$filter', '$location', 'blockUI', 'Clientes', 'ClientesNit', 'GuardarAlias', 'ObtenerAlias', 'GuardarGerencias',
        'ObtenerGerencias', 'GuardarComensales', 'ObtenerComensales', 'GuardarComidas', 'ObtenerComidas', 'GuardarPrecioComidas', 'ObtenerPrecioComidas', 'GuardarHistorialExcel', 'GuardarComensalesExcel',
        'ObtenerHistorial', 'GuardarEmpresasExcel', 'GuardarGerenciasExcel', 'GuardarComidasExcel', 'GuardarPreciosExcel', 'Paginator', 'BusquedaComensales', 'ObtenerReporteComedor', 'ObtenerCambioMoneda',
        'ObtenerReporteEmpresa', 'ObtenerReporteComensal', 'ObtenerAlertasMarcacion', 'EditarAlertasMarcacion', 'ObtenerHistorialDocumentos', 'ObtenerDocumento', 'EditarHistorial', '$q', 'ObtenerReporteGeneralComensal','SweetAlert', 'ListaClienteComensales', function (ObtenerImagen, $scope, $timeout, $localStorage, $filter, $location, blockUI, Clientes, ClientesNit, GuardarAlias, ObtenerAlias, GuardarGerencias,
            ObtenerGerencias, GuardarComensales, ObtenerComensales, GuardarComidas, ObtenerComidas, GuardarPrecioComidas, ObtenerPrecioComidas, GuardarHistorialExcel, GuardarComensalesExcel,
            ObtenerHistorial, GuardarEmpresasExcel, GuardarGerenciasExcel, GuardarComidasExcel, GuardarPreciosExcel, Paginator, BusquedaComensales, ObtenerReporteComedor, ObtenerCambioMoneda,
            ObtenerReporteEmpresa, ObtenerReporteComensal, ObtenerAlertasMarcacion, EditarAlertasMarcacion, ObtenerHistorialDocumentos, ObtenerDocumento, EditarHistorial, $q, ObtenerReporteGeneralComensal, SweetAlert, ListaClienteComensales) {

            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.modalEdicionAlias = 'modalAliasEmpresasCliente'
            $scope.modalEdicionGerencias = 'modalGerenciaEmpresasCliente'
            $scope.modalEdicionComensales = 'modalComensalesEmpresasCliente'
            $scope.modalEdicionComidas = 'modalComidasEmpresasCliente'
            $scope.modalEdicionPrecios = 'modalPreciosComidasEmpresasCliente'
            $scope.dialogClienteEmpresa = 'dialog-cliente-empresa'
            $scope.busquedaComensalesEmpresa = 'dialog-comensales-empresa'
            $scope.dialogAlertasMarcaciones = 'dialog-alerta-marcaciones'
            $scope.dialogHistorialDocumentos = 'dialog-historial-documentos'
            $scope.dialogImportacionHistorial = 'dialog-importacion-historial'
            $scope.modalEdicionHistorial = 'modalEdicionHistorial'
            $scope.dialogClienteEmpresaHuella = 'dialog-cliente-empresa-huella'

            $scope.imagenEmpresa;
            var imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
            imgDelay.then(function (img) {
                $scope.imagenEmpresa = img
            }).catch(function (err) {
                var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
                blockUI.stop()
            })

            $scope.$on('$viewContentLoaded', function () {
                // if (redirectProformas) {
                //     $timeout(function () {
                //         $location.path('/proformas')
                //         // blockUI.stop()
                //     }, 5000)
                //     return
                // }
                ejecutarScriptsComensales($scope.modalEdicionAlias, $scope.modalEdicionGerencias, $scope.modalEdicionComensales, $scope.modalEdicionComidas, $scope.modalEdicionPrecios,
                    $scope.dialogClienteEmpresa, $scope.busquedaComensalesEmpresa, $scope.dialogAlertasMarcaciones, $scope.dialogHistorialDocumentos, $scope.modalEdicionHistorial, $scope.dialogClienteEmpresaHuella);
                resaltarPestaña($location.path().substring(1));
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
                // $scope.obtenerColumnasAplicacion()
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                // if (!redirectProformas) {
                $scope.eliminarPopup($scope.modalEdicionAlias);
                $scope.eliminarPopup($scope.modalEdicionGerencias);
                $scope.eliminarPopup($scope.modalEdicionComensales);
                $scope.eliminarPopup($scope.modalEdicionComidas);
                $scope.eliminarPopup($scope.modalEdicionPrecios);
                $scope.eliminarPopup($scope.dialogClienteEmpresa);
                $scope.eliminarPopup($scope.busquedaComensalesEmpresa);
                $scope.eliminarPopup($scope.dialogAlertasMarcaciones);
                $scope.eliminarPopup($scope.dialogHistorialDocumentos);
                $scope.eliminarPopup($scope.modalEdicionHistorial);
                $scope.eliminarPopup($scope.dialogClienteEmpresaHuella);
                // }
            });

            // convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
            //     if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
            //         $scope.imagenEmpresa = imagenEmpresa;
            //     } else {
            //         convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
            //             if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
            //                 $scope.mostrarMensaje('No se encuentra la imagen de la empresa.')
            //                 $scope.imagenEmpresa = imagenEmpresa;
            //             } else {
            //                 $scope.mostrarMensaje('No se encuentra imagenen de la empresa.')
            //             }
            //         })
            //     }
            // })

            $scope.ordenarListaHistorialDocumentos = function (column, date) {
                if ($scope.sortDirectionDochist) {
                    $scope.sortDirectionDochist = false
                    if (date) {
                        $scope.historialesDocumentos.sort((a, b) => {
                            return (new Date(a[column])) - (new Date(b[column]))
                        })
                    } else {
                        $scope.historialesDocumentos.sort((a, b) => {
                            if (b[column] < a[column]) {
                                return -1;
                            }
                            if (b[column] > a[column]) {
                                return 1;
                            }
                            // a debe ser igual b
                            return 0;
                        })
                    }
                } else {
                    $scope.sortDirectionDochist = true
                    if (date) {
                        $scope.historialesDocumentos.sort((a, b) => {
                            return (new Date(b[column])) - (new Date(a[column]))
                        })
                    } else {
                        $scope.historialesDocumentos.sort((a, b) => {
                            if (b[column] > a[column]) {
                                return -1;
                            }
                            if (b[column] < a[column]) {
                                return 1;
                            }
                            // a debe ser igual b
                            return 0;
                        })
                    }
                }
            }

            $scope.editar = function (historial) {
                $scope.edicionHistorial = Object.assign({}, historial)
                $scope.edicionHistorial.fecha_texto = $scope.edicionHistorial.fecha_texto.split(' ')[0]
                $scope.abrirModalEdicionHistorial()
            }

            $scope.editarHorarioComida = function (comida) {
                comida.editado = true
                var inicio = new Date(("1970-1-1 " + comida.inicio))
                var final = new Date(("1970-1-1 " + comida.final))
                comida.inicio = inicio
                comida.final = final
                $scope.clienteEmpresaComidas = comida
            }


            $scope.SelectItemPorPagina = function (itemsPerPageCompra) {
                $scope.config = {
                    itemsPerPage: itemsPerPageCompra,
                    maxPages: 5,
                    fillLastPage: true
                }
            }

            $scope.odenarColumnasComensales = function (columna) {
                $scope.paginator.direccion = $scope.paginator.direccion == 'asc' ? 'desc' : 'asc'
                $scope.paginator.sortColumn(columna)
            }
            $scope.ordenarColumnasMarcaciones = function (columna) {
                $scope.filtroMarcaciones.direccion = $scope.filtroMarcaciones.direccion == 'asc' ? 'desc' : 'asc'
                if ($scope.filtroMarcaciones.direccion == 'asc') {
                    if (columna = 'fecha') {
                        $scope.alertaMarcacionesFiltradas = $scope.alertaMarcacionesFiltradas.sort(function (a, b) {
                            if (a.fecha > b.fecha) {
                                return 1;
                            }
                            if (a.fecha < b.fecha) {
                                return -1;
                            }
                            return 0
                        })
                    }
                } else {
                    if (columna = 'fecha') {
                        $scope.alertaMarcacionesFiltradas = $scope.alertaMarcacionesFiltradas.sort(function (a, b) {
                            if (a.fecha > b.fecha) {
                                return -1;
                            }
                            if (a.fecha < b.fecha) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    // $scope.alertaMarcacionesDescartadasFiltradas
                }
                $scope.filtroMarcaciones.columna = columna
                // $scope.obtenerAlertas()
            }

            $scope.inicio = function () {
                // blockUI.start()
                $scope.activeModal = 0
                $scope.obtenerClientes()
                if ($scope.empresaExternaSeleccionada) {
                    var empresa = Object.assign({}, $scope.empresaExternaSeleccionada)
                    $scope.config = {
                        itemsPerPage: 10,
                        maxPages: 5,
                        fillLastPage: true
                    }
                    $scope.filtroComensales = { desde: "", hasta: "", empresaCliente: empresa, id_usuario: "", id_cliente: "", mes: "", anio: "", gerencia: "", comida: "", comensal: "" }
                    $scope.reportes = [{ id: 1, nombre: 'Reporte Comedor' }, { id: 2, nombre: 'Empresa' }, { id: 3, nombre: 'Por comensal' }]
                    $scope.obtenerPaginador()
                    $scope.verificarActualizacion = false;
                    $scope.edicionHistorial = {}
                    $scope.listaAliasclientesEmpresa = []
                    $scope.listaComensalesclienteEmpresa = []
                    $scope.listaGerenciasClienteEmpresa = []
                    $scope.listaComidasclienteEmpresa = []
                    $scope.listaPrecioComidasclienteEmpresa = []
                    $scope.alertaMarcaciones = []
                    $scope.alertaMarcacionesDescartadas = []
                    $scope.alertaMarcacionesFiltradas = []
                    $scope.alertaMarcacionesDescartadasFiltradas = []
                    $scope.historialesDocumentos = []
                    $scope.comensalesSeleccionadosFiltro = []
                    $scope.obtenerComidas()
                    $scope.obtenerGerencias()
                    $scope.obtenerHistoriales()
                    $scope.obtenerComensales()
                    $scope.filtroMarcaciones = { desde: "", hasta: "", columna: 'fecha', direccion: 'asc', descartados: false }
                    setTimeout(function () {
                        aplicarDatePickers();
                    }, 200);
                }
                blockUI.stop()
            }

            $scope.PopoverConfiguracionComensales = {
                templateUrl: 'PopoverConfiguracionComensales.html',
                title: 'Menu',
                isOpen: false
            };

            $scope.buscarCliente = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ClientesNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            }

            $scope.filtrarAlertas = function (filtrar) {
                if ($scope.alertaMarcaciones.length > 0 && !$scope.filtroMarcaciones.descartados) {
                    if ($scope.filtroMarcaciones.desde !== 0 && $scope.filtroMarcaciones.desde !== "" && $scope.filtroMarcaciones.hasta !== 0 && $scope.filtroMarcaciones.hasta !== "") {
                        if ($scope.filtroMarcaciones.comensal && $scope.filtroMarcaciones.comensal !== "") {
                            $scope.alertaMarcacionesFiltradas = $scope.alertaMarcaciones.filter(function (alerta) {
                                return alerta.comensal.nombre.toLowerCase().indexOf($scope.filtroMarcaciones.comensal.toLowerCase()) >= 0
                            }
                            )
                            $scope.alertaMarcacionesFiltradas = $scope.alertaMarcacionesFiltradas.filter(function (alerta) {
                                var fecha_alerta = new Date(alerta.fecha)
                                var desde = new Date($scope.filtroMarcaciones.desde.split('/').reverse().join('-') + 'T00:00:00.000Z')
                                var hasta = new Date($scope.filtroMarcaciones.hasta.split('/').reverse().join('-') + 'T23:59:59.000Z')
                                if (fecha_alerta >= desde && fecha_alerta <= hasta) {
                                    if ($scope.filtroMarcaciones.empresaCliente) {
                                        if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                            return true
                                        }
                                        return false
                                    } else {
                                        return true
                                    }
                                }
                                return false
                            })
                        } else {

                            if ($scope.filtroMarcaciones.comensal && $scope.filtroMarcaciones.comensal !== "") {
                                $scope.alertaMarcacionesFiltradas = $scope.alertaMarcaciones.filter(function (alerta) {
                                    return alerta.comensal.nombre.toLowerCase().indexOf($scope.filtroMarcaciones.comensal.toLowerCase()) >= 0
                                })
                                $scope.alertaMarcacionesFiltradas = $scope.alertaMarcacionesFiltradas.filter(function (alerta) {
                                    var fecha_alerta = new Date(alerta.fecha)
                                    var desde = new Date($scope.filtroMarcaciones.desde.split('/').reverse().join('-') + 'T00:00:00.000Z')
                                    var hasta = new Date($scope.filtroMarcaciones.hasta.split('/').reverse().join('-') + 'T23:59:59.000Z')
                                    if (fecha_alerta >= desde && fecha_alerta <= hasta) {
                                        if ($scope.filtroMarcaciones.empresaCliente) {
                                            if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                                return true
                                            }
                                            return false
                                        } else {
                                            return true
                                        }
                                    }
                                    return false
                                })
                            } else {
                                $scope.alertaMarcacionesFiltradas = $scope.alertaMarcaciones.filter(function (alerta) {
                                    var fecha_alerta = new Date(alerta.fecha)
                                    var desde = new Date($scope.filtroMarcaciones.desde.split('/').reverse().join('-') + 'T00:00:00.000Z')
                                    var hasta = new Date($scope.filtroMarcaciones.hasta.split('/').reverse().join('-') + 'T23:59:59.000Z')
                                    if (fecha_alerta >= desde && fecha_alerta <= hasta) {
                                        if ($scope.filtroMarcaciones.empresaCliente) {
                                            if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                                return true
                                            }
                                            return false
                                        } else {
                                            return true
                                        }
                                    }
                                    return false
                                })
                            }
                        }


                    } else {
                        if ($scope.filtroMarcaciones.comensal && $scope.filtroMarcaciones.comensal !== "") {
                            $scope.alertaMarcacionesFiltradas = $scope.alertaMarcaciones.filter(function (alerta) {
                                return alerta.comensal.nombre.toLowerCase().indexOf($scope.filtroMarcaciones.comensal.toLowerCase()) >= 0
                            }
                            )
                            if ($scope.filtroMarcaciones.empresaCliente) {
                                $scope.alertaMarcacionesFiltradas = $scope.alertaMarcacionesFiltradas.filter(function (alerta) {
                                    if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                        return true
                                    }
                                    return false
                                })
                            } else {

                                $scope.alertaMarcacionesFiltradas = Object.assign([], $scope.alertaMarcaciones)
                            }
                        } else {
                            if ($scope.filtroMarcaciones.empresaCliente) {
                                $scope.alertaMarcacionesFiltradas = $scope.alertaMarcaciones.filter(function (alerta) {
                                    if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                        return true
                                    }
                                    return false
                                })
                            } else {

                                $scope.alertaMarcacionesFiltradas = Object.assign([], $scope.alertaMarcaciones)
                            }
                        }


                    }
                } else if ($scope.alertaMarcacionesDescartadas.length > 0 && $scope.filtroMarcaciones.descartados) {
                    if ($scope.filtroMarcaciones.desde !== 0 && $scope.filtroMarcaciones.desde !== "" && $scope.filtroMarcaciones.hasta !== 0 && $scope.filtroMarcaciones.hasta !== "") {
                        $scope.alertaMarcacionesDescartadasFiltradas = $scope.alertaMarcacionesDescartadas.filter(function (alerta) {
                            var fecha_alerta = new Date(alerta.fecha.split('/').reverse().join('-') + 'T04:00:00.000Z')
                            var desde = new Date($scope.filtroMarcaciones.desde.split('/').reverse().join('-') + 'T00:00:00.000Z')
                            var hasta = new Date($scope.filtroMarcaciones.hasta.split('/').reverse().join('-') + 'T23:59:59.000Z')
                            if (fecha_alerta >= desde && fecha_alerta <= hasta) {
                                if ($scope.filtroMarcaciones.empresaCliente) {
                                    if (alerta.comensal.id_cliente == $scope.filtroMarcaciones.empresaCliente.id) {
                                        return true
                                    }
                                    return false
                                } else {
                                    return true
                                }
                            }
                            return false
                        })
                    } else {
                        $scope.alertaMarcacionesDescartadasFiltradas = Object.assign([], $scope.alertaMarcacionesDescartadas)
                    }
                } else {
                    if (!filtrar) {
                        $scope.obtenerAlertas(true)
                    }
                }
            }

            $scope.buscarComensales = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = BusquedaComensales($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id, query);
                    return promesa;
                }
            }

            $scope.filtrarClientes = function (query) {
                $scope.clientesProcesados = $filter('filter')($scope.clientes, query);
            }

            $scope.filtrarComensales = function (query) {
                $scope.comensalesProcesados = $filter('filter')($scope.comensalesBusqueda, query);
            }

            $scope.obtenerHistorialDocumentos = function () {
                blockUI.start()
                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                $scope.paginator.filter = $scope.filtroComensales
                var prom = ObtenerHistorialDocumentos($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id, $scope.paginator)
                prom.then(function (res) {
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.historialesDocumentos = res.documentos
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.obtenerClientes = function () {
                blockUI.start()
                var prom = Clientes($scope.usuario.id_empresa);
                prom.then(function (cls) {
                    $scope.clientes = cls
                    $scope.clientesProcesados = cls
                    blockUI.stop()
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.establecerCliente = function (cliente) {
                switch ($scope.activeModal) {
                    case 0:
                        if (!$scope.filtroComensales) {
                            $scope.filtroComensales = {}
                        }
                        if (!$scope.empresaExternaSeleccionada) {
                            $scope.empresaExternaSeleccionada = Object.assign({}, cliente)
                            $scope.inicio()
                        }
                        $scope.filtroComensales.empresaCliente = Object.assign({}, cliente)
                        $scope.obtenerComensales($scope.filtroComensales.empresaCliente, true)
                        break;
                    case 1:
                        if (!$scope.clienteEmpresaAsignacionAlias) {
                            $scope.clienteEmpresaAsignacionAlias = {}
                        }
                        $scope.clienteEmpresaAsignacionAlias.empresaCliente = Object.assign({}, cliente)
                        break;
                    case 2:
                        if (!$scope.clienteEmpresaEdicionGerencias) {
                            $scope.clienteEmpresaEdicionGerencias = {}
                        }
                        $scope.clienteEmpresaEdicionGerencias.empresaCliente = Object.assign({}, cliente)
                        $scope.obtenerGerencias(true)
                        break;
                    case 3:
                        if (!$scope.clienteEmpresaEdicionComensales) {
                            $scope.clienteEmpresaEdicionComensales = {}
                        }
                        if (!$scope.clienteEmpresaEdicionGerencias) {
                            $scope.clienteEmpresaEdicionGerencias = {}
                        }
                        $scope.clienteEmpresaEdicionGerencias.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaEdicionComensales.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaEdicionComensales.tipo = $scope.obtenerAliasCliente(cliente.id)

                        $scope.obtenerGerencias(true)
                        $scope.obtenerComensales(true)
                        break;
                    case 4:
                        if (!$scope.clienteEmpresaComidas) {
                            $scope.clienteEmpresaComidas = {}
                        }
                        $scope.clienteEmpresaComidas.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaComidas.verTodos
                        $scope.obtenerComidas(true)
                        break;
                    case 5:
                        if (!$scope.clienteEmpresaPreciosComidas) {
                            $scope.clienteEmpresaPreciosComidas = {}
                        }
                        $scope.clienteEmpresaPreciosComidas.empresaCliente = Object.assign({}, cliente)
                        $scope.obtenerPrecioComidas(true)
                        break;
                    case 6:
                        if (!$scope.edicionHistorial) {
                            $scope.edicionHistorial = {}
                        }
                        $scope.edicionHistorial.empresaCliente = Object.assign({}, cliente)
                        // $scope.obtenerPrecioComidas(true)
                        break;
                    default:
                        $scope.mostrarMensaje('Ocurrio un error al asignar')
                }
            }

            $scope.establecerComensal = function (comensal, modal) {
                if ($scope.edicionHistorial) {
                    $scope.edicionHistorial.comensal = Object.assign({}, comensal)
                } else {
                    $scope.filtroComensales.comensal = Object.assign({}, comensal)
                }
                if (modal) {
                    $scope.cerrardialogBusquedaComensales()
                }
            }

            $scope.seleccionarcliente = function (cliente) {
                switch ($scope.activeModal) {
                    case 0:
                        if (!$scope.filtroComensales) {
                            $scope.filtroComensales = {}
                        }
                        /* if (!$scope.empresaExternaSeleccionada) { */
                        $scope.empresaExternaSeleccionada = Object.assign({}, cliente)
                        $scope.inicio()
                        /*  } */
                        $scope.filtroComensales.empresaCliente = Object.assign({}, cliente)
                        /*  $scope.obtenerComensales($scope.filtroComensales.empresaCliente, true) */
                        break;
                    case 1:
                        if (!$scope.clienteEmpresaAsignacionAlias) {
                            $scope.clienteEmpresaAsignacionAlias = {}
                        }
                        $scope.clienteEmpresaAsignacionAlias.empresaCliente = Object.assign({}, cliente)
                        break;
                    case 2:
                        if (!$scope.clienteEmpresaEdicionGerencias) {
                            $scope.clienteEmpresaEdicionGerencias = {}
                        }
                        $scope.clienteEmpresaEdicionGerencias.empresaCliente = Object.assign({}, cliente)
                        $scope.obtenerGerencias(true)
                        break;
                    case 3:
                        if (!$scope.clienteEmpresaEdicionComensales) {
                            $scope.clienteEmpresaEdicionComensales = {}
                        }
                        if (!$scope.clienteEmpresaEdicionGerencias) {
                            $scope.clienteEmpresaEdicionGerencias = {}
                        }
                        $scope.clienteEmpresaEdicionGerencias.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaEdicionComensales.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaEdicionComensales.tipo = $scope.obtenerAliasCliente(cliente.id)
                        $scope.obtenerGerencias(true)
                        $scope.obtenerComensales(true)
                        break;
                    case 4:
                        if (!$scope.clienteEmpresaComidas) {
                            $scope.clienteEmpresaComidas = {}
                        }
                        $scope.clienteEmpresaComidas.empresaCliente = Object.assign({}, cliente)
                        $scope.clienteEmpresaComidas.verTodos = false
                        $scope.obtenerComidas(true)
                        break;
                    case 5:
                        if (!$scope.clienteEmpresaPreciosComidas) {
                            $scope.clienteEmpresaPreciosComidas = {}
                        }
                        $scope.clienteEmpresaPreciosComidas.empresaCliente = Object.assign({}, cliente)
                        $scope.obtenerComidas(true, $scope.clienteEmpresaPreciosComidas)
                        $scope.obtenerPrecioComidas(true)
                        break;
                    case 6:
                        if (!$scope.edicionHistorial) {
                            $scope.edicionHistorial = {}
                        }
                        $scope.edicionHistorial.empresaCliente = Object.assign({}, cliente)
                        // $scope.obtenerPrecioComidas(true)
                        break;
                    default:
                        $scope.mostrarMensaje('Ocurrio un error al asignar')
                }
                $scope.cerrardialogClientesComensales()
            }

            $scope.editarComensal = function (comensal) {
                comensal.editado = true
                $scope.clienteEmpresaEdicionComensales = comensal
            }

            $scope.limpiarPeriodo = function () {
                $scope.filtroComensales.desde = null
                $scope.filtroComensales.hasta = null
                $scope.filtroComensales.anio = null
                $scope.filtroComensales.mes = null
                $scope.filtroComensales.empresaCliente = $scope.empresaExternaSeleccionada
                // $scope.filtroComensales.gerencia = null
                // $scope.filtroComensales.comensal = null
                // $scope.filtroComensales.comida = null
                // $scope.filtroComensales.estado = null
            }

            $scope.obtenerAliasEmpresa = function () {
                blockUI.start()
                var prom = ObtenerAlias($scope.usuario.id_empresa, $scope.usuario.id)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.listaAliasclientesEmpresa = res.lista
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerGerencias = function (empresa) {
                blockUI.start()
                var prom;
                if (empresa) {
                    prom = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.clienteEmpresaEdicionGerencias.empresaCliente.id)
                } else {
                    prom = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id)
                }
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.listaGerenciasClienteEmpresa = res.lista
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerComensales = function (empresa, filtro) {
                blockUI.start()
                var prom;
                if (empresa && !filtro) {
                    prom = ObtenerComensales($scope.usuario.id_empresa, $scope.usuario.id, $scope.clienteEmpresaEdicionComensales.empresaCliente.id)
                } else if (empresa && filtro) {
                    prom = ObtenerComensales($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente.id)
                } else {
                    prom = ObtenerComensales($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id)
                }
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.listaComensalesclienteEmpresa = res.lista
                        $scope.comensalesBusqueda = res.lista
                        $scope.comensalesProcesados = res.lista
                        $scope.llenarComensalesMiltiselect(res.lista)
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.llenarComensalesMiltiselect = function (datos) {
                $scope.comensalesMultiselect = datos.map(function (comensal) {
                    var formato = {
                        name: comensal.nombre,
                        maker: "",
                        ticked: false,
                        id: comensal.id
                    }
                    return formato
                })
            }
            $scope.verTodasLasComidas = function () {
                if (!$scope.clienteEmpresaComidas) {
                    $scope.clienteEmpresaComidas = {}
                    $scope.clienteEmpresaComidas.verTodos = false
                } else if (!$scope.clienteEmpresaComidas.verTodos) {
                    $scope.clienteEmpresaComidas.verTodos = true
                } else {
                    $scope.clienteEmpresaComidas.verTodos = false
                }
                $scope.obtenerComidas()
            }

            $scope.obtenerComidas = function (empresa, seleccionado) {
                blockUI.start()
                var prom;
                if (!$scope.clienteEmpresaComidas) {
                    $scope.clienteEmpresaComidas = {}
                    $scope.clienteEmpresaComidas.verTodos = false
                }
                if (empresa) {
                    if (seleccionado) {
                        prom = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, seleccionado.empresaCliente.id)
                    } else {
                        prom = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.clienteEmpresaComidas.empresaCliente.id)
                    }
                } else if ($scope.clienteEmpresaComidas.verTodos) {
                    prom = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, 0)
                } else {
                    prom = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id)
                }
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        if (res.lista.length > 0) {
                            $scope.listaComidasclienteEmpresa = res.lista
                        } else {
                            $scope.listaComidasclienteEmpresa = []
                        }
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerPrecioComidas = function (empresa) {
                blockUI.start()
                var prom;
                if (empresa) {
                    prom = ObtenerPrecioComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.clienteEmpresaPreciosComidas.empresaCliente.id)
                } else {
                    prom = ObtenerPrecioComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id)
                }
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.listaPrecioComidasclienteEmpresa = res.lista
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerHistoriales = function (filtrar) {
                blockUI.start()
                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                var listaComensales;
                if ($scope.filtroComensales.comensal.length > 0) {
                    listaComensales = $scope.filtroComensales.comensal.map(function (comensal) {
                        return comensal.id
                    })
                } else {
                    listaComensales = []
                }
                $scope.filtroComensales.comensalesProcesados = listaComensales
                $scope.paginator.filter = $scope.filtroComensales

                var prom = ObtenerHistorial($scope.usuario.id_empresa, $scope.usuario.id, $scope.empresaExternaSeleccionada.id, $scope.paginator)
                prom.then(function (res) {
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.historialesComedor = res.historial//.map(function (hist) {
                        //     hist.fecha_texto = new Date(hist.fecha.split('T')[0].split('-').reverse().join('/') + ' ' + hist.fecha.split('T')[1].split('.')[0])
                        //     hist.fecha = new Date(hist.fecha)
                        //     return hist
                        // })
                        $scope.paginator.setPages(res.paginas)
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerAlertas = function (filtrar) {
                blockUI.start()
                if (!$scope.filtroMarcaciones.empresaCliente) {
                    $scope.filtroMarcaciones.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                    // $scope.filtroMarcaciones.empresaCliente = $scope.filtroMarcaciones.empresaCliente.id
                }
                $scope.filtroMarcaciones = $scope.filtrarHistorial($scope.filtroMarcaciones, true)
                var prom = ObtenerAlertasMarcacion($scope.usuario.id_empresa, $scope.usuario.id, ($scope.filtroMarcaciones.empresaCliente ? $scope.filtroMarcaciones.empresaCliente : $scope.empresaExternaSeleccionada.id), $scope.filtroMarcaciones)
                prom.then(function (res) {
                    $scope.filtroMarcaciones = $scope.filtrarHistorial($scope.filtroMarcaciones, true, true)
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        if (!$scope.filtroMarcaciones.descartados) {
                            $scope.alertaMarcaciones = res.alertas
                            $scope.alertaMarcacionesFiltradas = res.alertas
                        } else {
                            $scope.alertaMarcacionesDescartadas = res.alertas
                            $scope.alertaMarcacionesDescartadasFiltradas = res.alertas
                        }
                        if (filtrar) {
                            $scope.filtrarAlertas(true)
                        }
                        blockUI.stop()
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.obtenerPaginador = function () {
                $scope.paginator = Paginator()
                $scope.paginator.column = "fecha"
                $scope.paginator.direccion = "asc"
                $scope.paginator.callBack = $scope.obtenerHistoriales
                // $scope.paginator.getSearch("")
            }

            $scope.filtrarHistorial = function (filtro, _, __) {
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
                    $scope.obtenerHistoriales(true)
                } else {
                    return filtro
                }
            }

            $scope.subirExcelHistorial = function (event) {
                // blockUI.start();
                var files = event.target.files;
                var i, f;
                if (!files) {
                    blockUI.stop();
                    return
                }
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var Historial = [];
                        let comensal = {}
                        do {
                            try {
                                comensal = {};
                                comensal.tarjeta = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                                comensal.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;

                                comensal.fecha = $scope.extraerFechaExcel(worksheet['C' + row].v, worksheet['C' + row].t, worksheet['C' + row].w, worksheet['C' + row]);
                                comensal.fecha_hora = $scope.extraerFechaExcel(worksheet['C' + row].v, worksheet['C' + row].t, worksheet['C' + row].w, worksheet['C' + row]);

                                comensal.lectora = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                                comensal.alias = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                                comensal.documento = name
                                comensal.linea = row + 0;
                                Historial.push(comensal);
                                row++;
                                i++;
                            } catch (error) {
                                $scope.limpiarArchivoImportacion()
                                return alert(error.stack)
                            }
                        } while (worksheet['A' + row] != undefined);
                        // blockUI.stop();
                        $scope.guardarHistorialExcel(Historial);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirReparacionExcelHistorial = function (event) {
                // blockUI.start();
                var files = event.target.files;
                var i, f;
                if (!files) {
                    blockUI.stop();
                    return
                }
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var Historial = [];
                        do {
                            var comensal = {};
                            comensal.tarjeta = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            comensal.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            comensal.fecha_hora = $scope.extraerFechaExcel(worksheet['C' + row].v, worksheet['C' + row].t, worksheet['C' + row].w, worksheet['C' + row]);
                            comensal.lectora = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            comensal.alias = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                            comensal.documento = name
                            comensal.verificarActualizacion = true
                            Historial.push(comensal);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        // blockUI.stop();
                        $scope.guardarHistorialExcel(Historial);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirExcelComensales = function (event) {
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
                        var comensales = [];
                        do {
                            var comensal = {};
                            comensal.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            comensal.tarjeta = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            comensal.nombre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            comensal.empresaCliente = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            comensal.gerencia = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                            comensal.tipo = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
                            comensales.push(comensal);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        blockUI.stop();
                        $scope.guardarComensalesExcel(comensales);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirExcelEmpresas = function (event) {
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
                        var empresas = [];
                        do {
                            var empresa = {};
                            empresa.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            empresa.empresaCliente = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            empresa.nombre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            empresas.push(empresa);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        blockUI.stop();
                        $scope.guardarEmpresasExcel(empresas);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirExcelGerencias = function (event) {
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
                        var gerencias = [];
                        do {
                            var gerencia = {};
                            gerencia.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            gerencia.empresaCliente = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            gerencia.nombre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            gerencia.lectora = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            gerencias.push(gerencia);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        blockUI.stop();
                        $scope.guardarGerenciasExcel(gerencias);
                        $scope.limpiarArchivoImportacion();
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirExcelComidas = function (event) {
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
                        var comidas = [];
                        do {
                            var comida = {};
                            comida.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            comida.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            comida.inicio = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].w.toString() : null;
                            comida.final = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].w.toString() : null;
                            comida.empresaCliente = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                            comidas.push(comida);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        blockUI.stop();
                        $scope.guardarComidasExcel(comidas);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.subirExcelPrecios = function (event) {
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
                        var precios = [];
                        do {
                            var precio = {};
                            precio.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            precio.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            precio.empresaCliente = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            precio.precio = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            precios.push(precio);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        blockUI.stop();
                        $scope.guardarPreciosExcel(precios);
                        $scope.limpiarArchivoImportacion()
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.fecha_excel_angularComensales = function (fecha_desde_excel) {
                const fecha_minima_angular_indice_excel_1970 = 25569 - 1 //fecha minima angular. el -1 es para ajustar que el resultado da 1 anterior a la fecha real.
                const fecha_excel = new Date('1970-1-1 0:0:0')
                const diferencia_de_fecha = fecha_desde_excel - fecha_minima_angular_indice_excel_1970
                return fecha_excel.setTime(fecha_excel.getTime() + diferencia_de_fecha * 86400000)
            }

            $scope.extraerFechaExcel = function (value, type, str, data) {
                let dato = '';
                let fechaIFstrFail = null;
                if(type === 'n') {
                    dato = str.trim().split(/\s+/);
                    fechaIFstrFail = $scope.formatoFechaPDF($scope.fecha_excel_angularComensales(value)).split('/');
                    fechaIFstrFail[0] = parseInt(fechaIFstrFail[0]) -1;
                    fechaIFstrFail = fechaIFstrFail.join('/') + ' ' + dato[1];
                    let reformatingDAteGringo = ('0' + dato[0].split('/')[1]).slice(-2) + '/' + ( '0' +  dato[0].split('/')[0]).slice(-2) + '/' + ('20' + dato[0].split('/')[2]).slice(-4) + ' ' + dato[1];
                    let reformatingDAtelat = ('0' + dato[0].split('/')[0]).slice(-2) + '/' + ('0' + dato[0].split('/')[1]).slice(-2) + '/' + ('20' + dato[0].split('/')[2]).slice(-4) + ' ' + dato[1];
                    if(fechaIFstrFail !== reformatingDAteGringo){
                        if(fechaIFstrFail !== reformatingDAtelat){
                            throw new Error('No se puede determinar fecha, la cantidad de formatos de fecha excede la lógica.')
                        }else{
                            dato = reformatingDAtelat.trim().split(/\s+/)
                        }
                    }else{
                        dato = reformatingDAteGringo.trim().split(/\s+/)
                    }
                }
                if(type === 's') dato = value.trim().split(/\s+/);
                let horas = dato[1]
                if(horas.split(':').length === 2) horas = $scope.formatoTiempoPDF($scope.fecha_excel_angularComensales(value));
                const fecha = dato[0].split('/').reverse()
                if (dato.length === 3) {
                    if (dato[2] === 'AM') {
                        horas = horas.split(':')
                    }
                    if (dato[2] === 'PM') {
                        horas = horas.split(':')
                        if ((parseInt(horas[0])) < 12) {
                            horas[0] = (parseInt(horas[0]) + 12) + ''
                        }
                    }
                } else {
                    if (horas.includes('AM') || horas.includes('am')) {
                        horas = horas.toLowerCase().split('am')[0]
                    } else if (horas.includes('PM') || horas.includes('pm')) {
                        horas = horas.toLowerCase().split('pm')[0]
                        horas = horas.split(':')
                        if ((parseInt(horas[0])) < 12) {
                            horas[0] = (parseInt(horas[0]) + 12) + ''
                        }
                    } else {
                        horas = horas.split(':')
                    }
                }
                const fecha_texto = fecha[0] + '-' + ('0'+fecha[1]).slice(-2) + '-' + ('0'+fecha[2]).slice(-2) + 'T' + ('0' + horas[0]).slice(-2) + ':' + ('0' + horas[1]).slice(-2) + ':' + ('0' + horas[2]).slice(-2) + '.000Z'
                return fecha_texto
            }
            //err
            $scope.guardarComensalesExcel = function (comensales) {
                if (comensales.length > 0) {
                    var prom = GuardarComensalesExcel($scope.usuario.id_empresa, comensales, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.obtenerComensales()
                        var txtmensajes = "<h5 class='widget-title blue smaller editable-click'></h5>";
                        if (!res.hasErr) {
                            if (res.mensajes) {
                                for (var m = 0; m < res.mensajes.length; m++) {
                                    txtmensajes = txtmensajes + "<strong class='green'>" + res.mensajes[m] + "</strong> <br>";
                                }
                                $scope.mostrarMensaje(txtmensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        } else {
                            for (var m = 0; m < res.mensajes.length; m++) {
                                txtmensajes = txtmensajes + "<strong class='red'>" + res.mensajes[m] + "</strong> <br>";
                            }
                            $scope.mostrarMensaje(txtmensajes)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.guardarPreciosExcel = function (precios) {
                if (precios.length > 0) {
                    var prom = GuardarPreciosExcel($scope.usuario.id_empresa, precios, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.obtenerPrecioComidas()
                        if (!res.hasErr) {
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        } else {
                            $scope.mostrarMensaje(res.mensajes)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.guardarEdicionHistorial = function () {
                var historialEditado = {
                    id: $scope.edicionHistorial.id,
                    tarjeta: $scope.edicionHistorial.tarjeta,
                    id_cliente: $scope.edicionHistorial.empresaCliente.id,
                    id_comensal: $scope.edicionHistorial.comensal.id,
                    id_empresa: $scope.usuario.id_empresa,
                    id_gerencia: $scope.edicionHistorial.gerencia ? $scope.edicionHistorial.gerencia.id : null,
                    id_comida: $scope.edicionHistorial.comida.id,
                    fecha: $scope.edicionHistorial.fecha,//.split('T').join(' ').split('.000Z').join(''),
                    id_usuario: $scope.edicionHistorial.id_usuario,
                    identificador_equipo: $scope.edicionHistorial.identificador_equipo,
                    documento: $scope.edicionHistorial.documento,
                    precio: $scope.edicionHistorial.comida.precio ? $scope.edicionHistorial.comida.precio.length > 0 ? $scope.edicionHistorial.comida.precio[0].precio : null : null,
                    fecha_texto: ($scope.edicionHistorial.fecha.split('T')[0] + ' ' + $scope.edicionHistorial.fecha.split('T')[1].split('.000Z')[0]),
                    estado: $scope.edicionHistorial.estado === undefined || $scope.edicionHistorial.estado === null || $scope.edicionHistorial.estado === 'true' ? true : false
                }
                var prom = EditarHistorial($scope.usuario.id_empresa, historialEditado, $scope.usuario.id, $scope.edicionHistorial.empresaCliente.id)
                prom.then(function (res) {
                    $scope.obtenerHistoriales()
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.mostrarMensaje(res.mensaje)
                        $scope.edicionHistorial = null
                        $scope.cerrarModalEdicionHistorial()
                    }
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }
            $scope.guardarHistorialExcel = function (Historial) {
                var datos = []
                if (Historial.length > 0) {
                    Historial.forEach(function (comensal) {
                        if (!datos.some(function (dato) {
                            var fdato = dato.fecha_hora
                            var fcomensal = comensal.fecha_hora
                            dato.fecha = $scope.formatoFechaPDF(dato.fecha_hora)
                            if (!dato.fecha) {
                                console.log(dato)
                            }
                            var diffSec = ((new Date(fcomensal)) - (new Date(fdato))) / 1000
                            if (diffSec < 0) {
                                diffSec *= -1
                            }
                            // var hrs = ~~(diff / 3600);
                            // var mins = ~~((diff % 3600) / 60);
                            // var secs = diff % 60;
                            if (!(dato.tarjeta === comensal.tarjeta && dato.nombre === comensal.nombre && diffSec < 1800)) {
                                return false
                            } else {
                                return true
                            }
                        })) {
                            if (datos.length === 0) {
                                comensal.fecha = $scope.formatoFechaPDF(comensal.fecha_hora)
                            }
                            datos.push(comensal)
                        }
                    })
                }
                if (datos.length > 0) {
                    var txtmensajes = "<h5 class='widget-title blue smaller editable-click'></h5>";
                    var prom = GuardarHistorialExcel($scope.usuario.id_empresa, datos, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.verificarActualizacion = false
                        $scope.obtenerHistoriales()
                        if (!res.hasErr) {
                            $scope.obtenerAliasEmpresa()
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                            if (res.comensalesNoRegistrados) {
                                $scope.mostrarExcelComensalesNoRegistrados(res.comensalesNoRegistrados)
                            }
                            if (res.empresasNoRegistradas) {
                                $scope.mostrarExcelEmpresasNoRegistrados(res.empresasNoRegistradas)
                            }
                        } else {
                            for (var m = 0; m < res.mensajes.length; m++) {
                                txtmensajes = txtmensajes + "<strong class='red'>" + res.mensajes[m] + "</strong> <br>";
                            }

                            $scope.mostrarMensaje(txtmensajes)
                            if (res.comensalesNoRegistrados) {
                                $scope.mostrarExcelComensalesNoRegistrados(res.comensalesNoRegistrados)
                            }
                            if (res.empresasNoRegistradas) {
                                $scope.mostrarExcelEmpresasNoRegistrados(res.empresasNoRegistradas)
                            }
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.mostrarExcelComensalesNoRegistrados = function (lista) {
                if (lista) {
                    if (lista.length === 0) {
                        return
                    }
                }
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var stream = doc.pipe(blobStream());
                var y = 190
                var itemsPorPagina = 20
                var items = 0
                var pagina = 1
                var cubeX = 70
                var totalPaginas = Math.ceil(1 / itemsPorPagina);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
                doc.font('Helvetica-Bold', 10);
                doc.text('COMENSALES NO REGISTRADOS : ', cubeX + 150 + 29, 90 + 7, { width: 200 })
                for (var i = 0; i < lista.length; i++) {
                    doc.font('Helvetica', 8);
                    doc.font('Helvetica', 8).fill('black')
                    doc.text(lista[i], cubeX + 3, y + 7);
                    y = y + 20;
                    items++;
                    if (items > itemsPorPagina || (y > 700)) {
                        if (cubeX > 250) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            cubeX = 70
                        } else {
                            cubeX += 250
                        }
                        y = 190;
                        items = 0;
                        doc.font('Helvetica-Bold', 10);
                    }
                }
                y = y + 20;
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.mostrarExcelEmpresasNoRegistrados = function (lista) {
                if (lista) {
                    if (lista.length === 0) {
                        return
                    }
                }
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var stream = doc.pipe(blobStream());
                var y = 190
                var itemsPorPagina = 20
                var items = 0
                var pagina = 1
                var cubeX = 70
                var totalPaginas = Math.ceil(1 / itemsPorPagina);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
                doc.font('Helvetica-Bold', 10);
                doc.text('EMPRESAS NO REGISTRADAS : ', cubeX + 150 + 29, 90 + 7, { width: 200 })
                for (var i = 0; i < lista.length; i++) {
                    doc.font('Helvetica', 8);
                    doc.font('Helvetica', 8).fill('black')
                    doc.text(lista[i], cubeX + 3, y + 7);
                    y = y + 20;
                    items++;
                    if (items > itemsPorPagina || (y > 700)) {
                        if (cubeX > 250) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            cubeX = 70
                        } else {
                            cubeX += 250
                        }
                        y = 190;
                        items = 0;
                        doc.font('Helvetica-Bold', 10);
                    }
                }
                y = y + 20;
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.guardarGerenciasExcel = function (gerencias) {
                if (gerencias.length > 0) {
                    var prom = GuardarGerenciasExcel($scope.usuario.id_empresa, gerencias, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.obtenerGerencias()
                        if (!res.hasErr) {
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        } else {
                            $scope.mostrarMensaje(res.mensajes)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.guardarEmpresasExcel = function (empresas) {
                if (empresas.length > 0) {
                    var prom = GuardarEmpresasExcel($scope.usuario.id_empresa, empresas, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.obtenerAliasEmpresa()
                        if (!res.hasErr) {
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        } else {
                            $scope.mostrarMensaje(res.mensajes)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.guardarComidasExcel = function (comidas) {
                if (comidas.length > 0) {
                    var prom = GuardarComidasExcel($scope.usuario.id_empresa, comidas, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.obtenerComidas()
                        if (!res.hasErr) {
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes)
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        } else {
                            if (res.mensajes) {
                                $scope.mostrarMensaje(res.mensaje + res.mensajes.join('<br />'))
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                            }
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.guardarAliasClienteEmpresa = function () {
                var datos = []
                if ($scope.listaAliasclientesEmpresa.length > 0) {
                    $scope.listaAliasclientesEmpresa.forEach(function (alias) {
                        if (alias.nuevo || alias.eliminado || alias.editado) {
                            datos.push(alias)
                        }
                    })
                }
                if (datos.length > 0) {
                    var prom = GuardarAlias($scope.usuario.id_empresa, datos, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            $scope.obtenerAliasEmpresa()
                        }
                        $scope.cerrarPopup($scope.modalEdicionAlias);
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.agregarAliasClienteEmpresa = function (alias) {
                var extramsg = ''
                if (!$scope.listaAliasclientesEmpresa.some(function (data) {
                    if (data.codigo) {
                        if (data.codigo === alias.codigo) {
                            extramsg += 'Código: ' + data.codigo + ' ya fué asigando. No se puede duplicar.'
                            return true
                        }
                    } else {
                        extramsg += 'Código: Vacio'
                        return true
                    }
                    if (data.empresaCliente) {
                        if (data.empresaCliente.id === alias.empresaCliente.id) {
                            extramsg += 'Empresa: ' + data.empresaCliente.razon_social + ' ya fué asigando. No se puede duplicar.'
                            return true
                        }
                    }
                    // else {
                    //     extramsg += 'Empresa: Vacio'
                    //     // return true
                    // }
                    if (data.nombre) {
                        if (data.nombre === alias.nombre) {
                            extramsg += 'Alias: ' + data.nombre + ' ya fué asigando. No se puede duplicar.'
                            return true
                        }
                    } else {
                        extramsg += 'Alias: Vacio'
                        return true
                    }
                })) {
                    var obj = Object.assign({}, alias)
                    obj.nuevo = true
                    $scope.listaAliasclientesEmpresa.push(obj)
                } else {
                    $scope.mostrarMensaje(extramsg)
                }
            }

            $scope.guardarGerenciasClienteEmpresa = function (clienteEmpresaEdicionGerencias) {
                var datos = []
                if ($scope.listaGerenciasClienteEmpresa.length > 0) {
                    $scope.listaGerenciasClienteEmpresa.forEach(function (gerencia) {
                        if (gerencia.nuevo || gerencia.eliminado || gerencia.editado) {
                            datos.push(gerencia)
                        }
                    })
                }
                if (datos.length > 0) {
                    var prom = GuardarGerencias($scope.usuario.id_empresa, datos, $scope.usuario.id)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            $scope.obtenerGerencias()
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.agregarGerenciaClienteEmpresa = function (gerencia) {
                var extramsg = ''
                if (!$scope.listaGerenciasClienteEmpresa.some(function (data) {
                    if ((data.codigo == gerencia.codigo && data.empresaCliente.id == gerencia.empresaCliente.id && data.nombre === gerencia.nombre) || (data.codigo == gerencia.codigo && data.empresaCliente.id == gerencia.empresaCliente.id) || (data.empresaCliente.id == gerencia.empresaCliente.id && data.nombre === gerencia.nombre)) {
                        extramsg += 'Código y/o nombre'
                        return true
                    }
                    return false
                })) {
                    var obj = Object.assign({}, gerencia)
                    obj.nuevo = true
                    $scope.listaGerenciasClienteEmpresa.push(obj)
                } else {
                    $scope.mostrarMensaje(extramsg + ' ya fué asigando. No se puede duplicar.')
                }
            }

            $scope.guardarComensalesClienteEmpresa = function () {
                var datos = []
                if ($scope.listaComensalesclienteEmpresa.length > 0) {
                    $scope.listaComensalesclienteEmpresa.forEach(function (comensal) {
                        if (comensal.nuevo || comensal.eliminado || comensal.editado) {
                            datos.push(comensal)
                        }
                    })
                }
                if (datos.length > 0) {
                    var prom = GuardarComensales($scope.usuario.id_empresa, datos, $scope.usuario.id, $scope.empresaExternaSeleccionada.id)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            $scope.obtenerComensales()
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.agregarComensalClienteEmpresa = function (comensal) {
                var extramsg = ''
                if (comensal.editado) {
                    $scope.clienteEmpresaEdicionComensales = {}
                    $scope.clienteEmpresaEdicionComensales.empresaCliente = comensal.empresaCliente
                    $scope.clienteEmpresaEdicionComensales.tipo = comensal.tipo
                    return
                }
                if (!$scope.listaComensalesclienteEmpresa.some(function (data) {
                    if (data.codigo) {
                        if (data.codigo === comensal.codigo) {
                            extramsg += 'Código: ' + data.codigo + ' ya fué asigando. No se puede duplicar.'
                            return true
                        }
                    } else {
                        extramsg += 'Código: Vacio'
                        return true
                    }
                    if (data.empresaCliente) {
                        if (data.empresaCliente.id !== null && data.empresaCliente.id !== undefined) {
                        }
                    } else {
                        extramsg += 'Empresa: Vacio'
                        return true
                    }
                    if (data.nombre) {
                        if (data.nombre === comensal.nombre && data.tarjeta === comensal.tarjeta) {
                            extramsg += 'comensal y tarjeta' + data.nombre + ' ya fué asigando. No se puede duplicar.'
                            return true
                        }
                    } else {
                        extramsg += 'comensal: Vacio'
                        return true
                    }
                    return false
                })) {
                    var obj = Object.assign({}, comensal)
                    obj.nuevo = true
                    $scope.listaComensalesclienteEmpresa.push(obj)
                    $scope.clienteEmpresaEdicionComensales = {}
                    $scope.clienteEmpresaEdicionComensales.empresaCliente = comensal.empresaCliente
                    $scope.clienteEmpresaEdicionComensales.tipo = comensal.tipo
                } else {
                    $scope.mostrarMensaje(extramsg)
                }
            }

            $scope.guardarComidasEmpresasCliente = function () {
                var datos = []
                if ($scope.listaComidasclienteEmpresa.length > 0) {
                    $scope.listaComidasclienteEmpresa.forEach(function (comida) {
                        if (comida.nuevo || comida.eliminado || comida.editado) {
                            comida.inicio = new Date(0, 0, 0, comida.inicio.getHours(), comida.inicio.getMinutes(), 0).toLocaleTimeString('es-ES')
                            comida.final = new Date(0, 0, 0, comida.final.getHours(), comida.final.getMinutes(), 0).toLocaleTimeString('es-ES')
                            datos.push(comida)
                        }
                    })
                }
                if (datos.length > 0) {
                    var prom = GuardarComidas($scope.usuario.id_empresa, datos, $scope.usuario.id, 0)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            $scope.obtenerComidas(true)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.agregarComidaClienteEmpresa = function (comida) {
                var extramsg = ''
                if (comida.editado) {
                    $scope.clienteEmpresaComidas = {}
                    $scope.clienteEmpresaComidas.empresaCliente = comida.empresaCliente
                    $scope.clienteEmpresaComidas.tipo = comida.tipo
                    return
                }
                if (!$scope.listaComidasclienteEmpresa.some(function (data) {
                    if ((data.codigo == comida.codigo && data.empresaCliente.id == comida.empresaCliente.id && data.nombre === comida.nombre) || (data.codigo == comida.codigo && data.empresaCliente.id == comida.empresaCliente.id) || (data.empresaCliente.id == comida.empresaCliente.id && data.nombre === comida.nombre)) {
                        extramsg += 'Código y/o nombre'
                        return true
                    }
                    return false
                })) {
                    var obj = Object.assign({}, comida)
                    obj.nuevo = true
                    $scope.listaComidasclienteEmpresa.push(obj)
                } else {
                    $scope.mostrarMensaje(extramsg + ' ya fué asigando. No se puede duplicar.')
                }
            }

            $scope.guardarPreciosComidasEmpresasCliente = function () {
                var datos = []
                if ($scope.listaPrecioComidasclienteEmpresa.length > 0) {
                    $scope.listaPrecioComidasclienteEmpresa.forEach(function (precio) {
                        if (precio.nuevo || precio.eliminado || precio.editado) {
                            datos.push(precio)
                        }
                    })
                }
                if (datos.length > 0) {
                    var prom = GuardarPrecioComidas($scope.usuario.id_empresa, datos, $scope.usuario.id, 0)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            $scope.obtenerPrecioComidas(true)
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('Sin cambios.')
                }
            }

            $scope.agregarPrecioComida = function (clienteEmpresaPreciosComidas) {
                var extramsg = ''
                if (!$scope.listaPrecioComidasclienteEmpresa.some(function (data) {
                    if ((data.codigo == clienteEmpresaPreciosComidas.codigo && data.empresaCliente.id == clienteEmpresaPreciosComidas.empresaCliente.id && data.comida.id === clienteEmpresaPreciosComidas.comida.id) || (data.codigo == clienteEmpresaPreciosComidas.codigo && data.empresaCliente.id == clienteEmpresaPreciosComidas.empresaCliente.id)) {
                        extramsg += 'Código y/o nombre'
                        return true
                    }
                    return false
                })) {
                    var obj = Object.assign({}, clienteEmpresaPreciosComidas)
                    obj.nuevo = true
                    obj.id_comida = obj.comida.id
                    $scope.listaPrecioComidasclienteEmpresa.push(obj)
                } else {
                    $scope.mostrarMensaje(extramsg + ' ya fué asigando. No se puede duplicar.')
                }
            }

            $scope.agregarMarcacion = function (marcacion, marca) {
                let copyMarcacion = Object.assign({}, marcacion)
                if (marca === 1) {
                    //Marcación positiva
                    marcacion.fecha_hora = '' + marcacion.fecha
                    marcacion.tarjeta = marcacion.comensal.tarjeta
                    marcacion.habilitado = true
                    marcacion.fecha_verificado = new Date()
                    marcacion.verificado_por = $scope.usuario.id
                    marcacion.verificado = true
                    marcacion.descartado = false
                } else if (marca === 2) {
                    //Reinicio marcación
                    marcacion.habilitado = false
                    marcacion.verificado = true
                    marcacion.descartado = true
                } else if (marca === 3) {
                    //Marcación descartada
                    marcacion.habilitado = undefined
                    return
                    // copyMarcacion.verificado = true
                    // copyMarcacion.descartado = true
                }
                var prom = EditarAlertasMarcacion($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, marcacion)
                prom.then(function (res) {
                    $scope.mostrarMensaje(res.mensaje)
                    if (!res.hasErr) {
                        marcacion.id = res.marcacion.id
                        marcacion.habilitado = (res.marcacion.habilitado !== null && res.marcacion.habilitado !== undefined ? res.marcacion.habilitado : res.marcacion.estado)
                        // marcacion.fecha = res.marcacion.fecha
                    }
                    else {
                        marcacion = Object.assign({}, copyMarcacion)
                    }
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    // marcacion = Object.assign({}, copyMarcacion)
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.eliminarAsignacionaliasClienteEmpresa = function (alias) {
                $scope.listaAliasclientesEmpresa[$scope.listaAliasclientesEmpresa.indexOf(alias)].eliminado = true
            }

            $scope.eliminarAsignaciongerenciaClienteEmpresa = function (gerencia) {
                $scope.listaGerenciasClienteEmpresa[$scope.listaGerenciasClienteEmpresa.indexOf(gerencia)].eliminado = true
            }

            $scope.eliminarAsignacioncomensalClienteEmpresa = function (comensal) {
                $scope.listaComensalesclienteEmpresa[$scope.listaComensalesclienteEmpresa.indexOf(comensal)].eliminado = true
            }

            $scope.eliminarAsignacioncomidaClienteEmpresa = function (comida) {
                $scope.listaComidasclienteEmpresa[$scope.listaComidasclienteEmpresa.indexOf(comida)].eliminado = true
            }

            $scope.eliminarAsignacionprecioComidaClienteEmpresa = function (precioComida) {
                $scope.listaPrecioComidasclienteEmpresa[$scope.listaPrecioComidasclienteEmpresa.indexOf(precioComida)].eliminado = true
            }

            $scope.generarHistorialPDF = function (documento) {
                var prom = ObtenerDocumento($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, documento)
                prom.then(function (res) {
                    var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                    var stream = doc.pipe(blobStream());
                    var y = 190
                    var itemsPorPagina = 20
                    var items = 0
                    var pagina = 1
                    var cubeX = 70
                    var totalPaginas = Math.ceil(1 / itemsPorPagina);
                    if ($scope.imagenEmpresa) {
                        doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                    }
                    //cabecera
                    doc.font('Helvetica-Bold', 10);
                    doc.text('DOCUMENTO : ', cubeX + 150 + 29, 90 + 7, { width: 200 })
                    doc.text(documento.documento, cubeX + 150 + 29, 110 + 7, { width: 200 })//Nombre fecha documento
                    doc.text('Fecha : ' + documento.fecha.split('-').reverse().join('/'), cubeX + 150 + 29, 130 + 7, { width: 200 })//Nombre fecha documento
                    doc.font('Helvetica-Bold', 8);
                    doc.font('Helvetica', 8).fill('black')
                    doc.text('Tarjeta', cubeX + 3, 170 + 7);
                    doc.text('Nombre', cubeX + 65, 170 + 7)
                    doc.text('Fecha Hora', cubeX + 200 + 29, 170 + 7)
                    doc.text('Lectora', cubeX + 80 + 240 + 9, 170 + 7)
                    doc.text('Name', cubeX + 80 + 335 + 9, 170 + 7)
                    doc.rect(cubeX, 170 + 3, 50, 20).stroke()//tarjeta
                    doc.rect(cubeX, 170 + 3, 215, 20).stroke()//nombre
                    doc.rect(cubeX + 215, 170 + 3, 95, 20).stroke()//fecha
                    doc.rect(cubeX + 310, 170 + 3, 90, 20).stroke()//identificador
                    doc.rect(cubeX + 400, 170 + 3, 100, 20).stroke()//empresa
                    ///
                    for (var i = 0; i < res.documento.length; i++) {
                        // columns.push(res.documento[index].tarjeta)
                        // columns.push(res.documento[index].comensal.nombre)
                        // columns.push(res.documento[index].fecha.split('T')[0].split('-').reverse().join('/') + ' ' + res.documento[index].fecha.split('T')[1].split('.')[0])
                        // columns.push(res.documento[index].identificador_equipo)
                        // columns.push(res.documento[index].empresaCliente.alias[0].nombre)
                        let fecha_hora = new Date(res.documento[i].fecha).toLocaleDateString('en-US').trim() + ' ' + new Date(res.documento[i].fecha).toTimeString('en-US').trim();
                        doc.font('Helvetica', 8);
                        doc.font('Helvetica', 8).fill('black')
                        doc.text(res.documento[i].tarjeta, cubeX + 3, y + 7);
                        doc.text(res.documento[i].comensal.nombre, cubeX + 55, y + 7)
                        doc.text(fecha_hora.split('GMT')[0].trim(), cubeX + 195 + 29, y + 7)//res.documento[i].fecha.split('T')[0].split('-').reverse().join('/') + ' ' + res.documento[i].fecha.split('T')[1].split('.')[0], cubeX + 195 + 29, y + 7)
                        doc.font('Helvetica', 6);
                        doc.text(res.documento[i].identificador_equipo, cubeX + 63 + 240 + 9, y + 7, { width: 85 })
                        doc.font('Helvetica', 7);
                        doc.text(res.documento[i].empresaCliente ? res.documento[i].empresaCliente.alias[0].nombre : "Error: Empresa No especificada.", cubeX + 80 + 315 + 9, y + 7)
                        doc.font('Helvetica', 8);
                        doc.rect(cubeX, y + 3, 50, 20).stroke()//tarjeta
                        doc.rect(cubeX, y + 3, 215, 20).stroke()//nombre
                        doc.rect(cubeX + 215, y + 3, 95, 20).stroke()//fecha
                        doc.rect(cubeX + 310, y + 3, 90, 20).stroke()//identificador
                        doc.rect(cubeX + 400, y + 3, 100, 20).stroke()//empresa
                        y = y + 20;
                        items++;
                        if (items > itemsPorPagina || (y > 700)) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 190;
                            items = 0;
                            pagina = pagina + 1;
                            if ($scope.imagenEmpresa) {
                                doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                            }
                            //cabecera
                            doc.font('Helvetica-Bold', 10);
                            doc.text(documento.documento + ' ' + documento.fecha, cubeX + 150 + 29, 110 + 7, { width: 200 })//Nombre fecha documento
                            doc.font('Helvetica-Bold', 8);
                            doc.font('Helvetica', 8).fill('black')
                            doc.text('Tarjeta', cubeX + 3, 170 + 7);
                            doc.text('Nombre', cubeX + 65, 170 + 7)
                            doc.text('Fecha Hora', cubeX + 200 + 29, 170 + 7)
                            doc.text('Lectora', cubeX + 80 + 240 + 9, 170 + 7)
                            doc.text('Name', cubeX + 80 + 335 + 9, 170 + 7)
                            doc.rect(cubeX, 170 + 3, 50, 20).stroke()//tarjeta
                            doc.rect(cubeX, 170 + 3, 215, 20).stroke()//nombre
                            doc.rect(cubeX + 215, 170 + 3, 95, 20).stroke()//fecha
                            doc.rect(cubeX + 310, 170 + 3, 90, 20).stroke()//identificador
                            doc.rect(cubeX + 400, 170 + 3, 100, 20).stroke()//empresa
                            ///

                        }
                    }
                    // doc.rect(cubeX, y + 3, 150, 20).stroke()
                    // doc.rect(cubeX + 150, y + 3, 80, 20).stroke()
                    // doc.rect(cubeX + 230, y + 3, 80, 20).stroke()
                    // doc.rect(cubeX + 310, y + 3, 80, 20).stroke()
                    // doc.rect(cubeX + 390, y + 3, 110, 20).stroke()
                    y = y + 20;
                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.generarHistorialExcel = function (documento) {
                var prom = ObtenerDocumento($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, documento)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                        return
                    }
                    var cabecera = ['TARJETA', 'EMPLEADO', 'FECHA / HORA', 'lectora', 'NAME']
                    var data = [cabecera]
                    for (var index = 0; index < res.documento.length; index++) {
                        var columns = []
                        let fecha_hora = new Date(res.documento[index].fecha).toLocaleDateString('en-US').trim() + ' ' + new Date(res.documento[index].fecha).toTimeString('en-US').trim();
                        columns.push(res.documento[index] ? res.documento[index].tarjeta : 'xxxx')
                        columns.push(res.documento[index] ? res.documento[index].comensal ? res.documento[index].comensal.nombre : 'xxxx' : 'xxxx')
                        columns.push(res.documento[index] ? fecha_hora.split('GMT')[0].trim() : '-/-/-')//res.documento[index].fecha.split('T')[0].split('-').reverse().join('/') + ' ' + res.documento[index].fecha.split('T')[1].split('.')[0] : 'xxxx')
                        columns.push(res.documento[index] ? res.documento[index].identificador_equipo : 'xxxx')
                        columns.push(res.documento[index] ? res.documento[index].empresaCliente ? res.documento[index].empresaCliente.alias.length ? res.documento[index].empresaCliente.alias[0].nombre : 'xxxx' : 'xxxx' : 'xxxx')
                        data.push(columns)
                    }
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    var wscols = [
                        { wch: 20 },
                        { wch: 19 },
                        { wch: 20 },
                        { wch: 16 },
                        { wch: 25 },
                        { wch: 15 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 8 },
                        { wch: 12 }
                    ];
                    ws['!cols'] = wscols;
                    ws['!rows'] = [{ hpx: 28, level: 3 }];
                    // ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 4 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, { s: { r: (3 + data.length), c: 0 }, e: { r: (3 + data.length), c: 1 } }]
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), res.documento[0].documento + '.xlsx');
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.generarReportePDF = function () {
                if (!$scope.filtroComensales.generar) {
                    $scope.mostrarMensaje('Seleccione un tipo de reporte.')
                    return
                }
                if ($scope.filtroComensales.generar === 1) {
                    $scope.reportePDFComedor()
                } else if ($scope.filtroComensales.generar === 2) {
                    $scope.reportePDFEmpresa()
                } else if ($scope.filtroComensales.generar === 3) {
                    $scope.reportePDFComensal()
                } else {
                    $scope.mostrarMensaje('Existe un problema con la identificación del reporte.')
                }
            }

            $scope.generarReporteEXCEL = function () {
                if (!$scope.filtroComensales.generar) {
                    $scope.mostrarMensaje('Seleccione un tipo de reporte.')
                    return
                }
                if ($scope.filtroComensales.generar === 1) {
                    $scope.reportePDFComedor(true)
                } else if ($scope.filtroComensales.generar === 2) {
                    $scope.reportePDFEmpresa(true)
                } else if ($scope.filtroComensales.generar === 3) {
                    $scope.reportePDFComensal(true)
                } else {
                    $scope.mostrarMensaje('Existe un problema con la identificación del reporte.')
                }
            }

            $scope.reportePDFComedor = function (excel) {
                var reporte = [];
                var tipoCambioDollar = 0
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    tipoCambioDollar = res.monedaCambio ? res.monedaCambio.dolar : 6.96
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                    $scope.paginator.filter = $scope.filtroComensales
                    var promGer = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                    promGer.then(function (res) {
                        $scope.listaGerenciasClienteEmpresa = res.lista
                        var promComidas = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                        promComidas.then(function (comidas) {
                            var comidasEmpresa = comidas.lista
                            var cabecera = []
                            if (comidasEmpresa.length === 0) {
                                $scope.mostrarMensaje('El listado de comidas para esta empresa esta vacio, no se puede generar el reporte')
                                return
                            }
                            comidasEmpresa.forEach(function (comida) {
                                cabecera.push(comida.nombre.toUpperCase())
                            })
                            cabecera.unshift('fecha'.toUpperCase())
                            // cabecera.push('observación'.toUpperCase())
                            var listaComensales;
                            if ($scope.filtroComensales.comensal.length > 0) {
                                listaComensales = $scope.filtroComensales.comensal.map(function (comensal) {
                                    return comensal.id
                                })
                            } else {
                                listaComensales = []
                            }
                            $scope.filtroComensales.comensalesProcesados = listaComensales
                            $scope.paginator.filter = $scope.filtroComensales
                            var promHistorial = ObtenerReporteComedor($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, $scope.paginator)
                            promHistorial.then(function (res) {
                                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                                if (res.hasErr) {
                                    $scope.mostrarMensaje(res.mensaje)
                                    return
                                }
                                var reportesGerencias = []
                                for (var index = 0; index < res.reporte.length; index++) {
                                    var reporteGerencias = []
                                    if (res.reporte[index].historial.length > 0) {
                                        for (var _index = 0; _index < res.reporte[index].historial.length; _index++) {
                                            var conteoIndex = -1
                                            if (reporteGerencias.some(function (dato) {
                                                conteoIndex += 1
                                                if (dato.gerencia.nombre === res.reporte[index].nombre && dato.fecha.split('T')[0] === res.reporte[index].historial[_index].fecha.split('T')[0]) {
                                                    return true
                                                }
                                                return false
                                            })) {
                                                if (res.reporte[index].historial[_index].comida) {
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'desayuno') {
                                                        reporteGerencias[conteoIndex].desayuno.cantidad += 1
                                                        reporteGerencias[conteoIndex].desayuno.total += res.reporte[index].historial[_index].precio
                                                    }
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'almuerzo') {
                                                        reporteGerencias[conteoIndex].almuerzo.cantidad += 1
                                                        reporteGerencias[conteoIndex].almuerzo.total += res.reporte[index].historial[_index].precio
                                                    }
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'cena') {
                                                        reporteGerencias[conteoIndex].cena.cantidad += 1
                                                        reporteGerencias[conteoIndex].cena.total += res.reporte[index].historial[_index].precio
                                                    }
                                                } else {
                                                    reporteGerencias[conteoIndex].fuera_horario += 1
                                                }

                                            } else {
                                                var chingadera = { cantidad: 0, total: 0 }
                                                var combo = { periodo: (res.reporte[index].periodo ? res.reporte[index].periodo : ""), empresaCliente: res.reporte[index].historial[_index].empresaCliente, gerencia: { id: res.reporte[index].id, nombre: res.reporte[index].nombre, codigo: res.reporte[index].codigo, id_cliente: res.reporte[index].id_cliente, id_empresa: res.reporte[index].id_empresa }, fecha: res.reporte[index].historial[_index].fecha.split('T')[0], desayuno: Object.assign({}, chingadera), almuerzo: Object.assign({}, chingadera), cena: Object.assign({}, chingadera), fuera_horario: 0 }
                                                if (res.reporte[index].historial[_index].comida) {
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'desayuno') {
                                                        combo.desayuno.cantidad += 1
                                                        combo.desayuno.total += res.reporte[index].historial[_index].precio
                                                    }
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'almuerzo') {
                                                        combo.almuerzo.cantidad += 1
                                                        combo.almuerzo.total += res.reporte[index].historial[_index].precio
                                                    }
                                                    if (res.reporte[index].historial[_index].comida.nombre.toLowerCase() === 'cena') {
                                                        combo.cena.cantidad += 1
                                                        combo.cena.total += res.reporte[index].historial[_index].precio
                                                    }
                                                } else {
                                                    combo.observacion = 'Fuera de horario, no se puede contabilizar.'
                                                }
                                                reporteGerencias.push(combo)
                                            }
                                            if (_index === (res.reporte[index].historial.length - 1)) {
                                                reportesGerencias.push(reporteGerencias)
                                            }
                                        }
                                    }
                                }
                                if (excel) {
                                    $scope.reportesParaExcel = reportesGerencias
                                    $scope.imprimirExcel($scope.reportesParaExcel, null, cabecera, comidasEmpresa, tipoCambioDollar, res.periodo, 'por_gerencia')
                                } else {
                                    if (reportesGerencias.length === 0) {
                                        $scope.mostrarMensaje('No existen datos.')
                                        return
                                    }
                                    for (var _index = 0; _index < reportesGerencias.length; _index++) {
                                        $scope.imprimirReporteComedor(reportesGerencias[_index], reportesGerencias[_index][0].gerencia, cabecera, comidasEmpresa, tipoCambioDollar, res.periodo[2])
                                    }
                                }
                                blockUI.stop();
                            })
                        })
                    })
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.reportePDFEmpresa = function (excel) {
                var reporte = [];
                var tipoCambioDollar = 0
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    var listaComensales;
                    if ($scope.filtroComensales.comensal.length > 0) {
                        listaComensales = $scope.filtroComensales.comensal.map(function (comensal) {
                            return comensal.id
                        })
                    } else {
                        listaComensales = []
                    }

                    $scope.filtroComensales.comensalesProcesados = listaComensales
                    tipoCambioDollar = res.monedaCambio.dolar
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                    $scope.paginator.filter = $scope.filtroComensales
                    var promGer = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                    promGer.then(function (res) {
                        $scope.listaGerenciasClienteEmpresa = res.lista
                        var promComidas = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                        promComidas.then(function (comidas) {
                            var listaComensales;
                            if ($scope.filtroComensales.comensal.length > 0) {
                                listaComensales = $scope.filtroComensales.comensal.map(function (comensal) {
                                    return comensal.id
                                })
                            } else {
                                listaComensales = []
                            }

                            $scope.filtroComensales.comensalesProcesados = listaComensales
                            var comidasEmpresa = comidas.lista
                            var cabecera = []
                            comidasEmpresa.forEach(function (comida) {
                                cabecera.push(comida.nombre.toUpperCase())
                            })
                            cabecera.unshift('Empleado'.toUpperCase())
                            cabecera.push('Total general'.toUpperCase())
                            var promHistorial = ObtenerReporteEmpresa($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, $scope.paginator)
                            promHistorial.then(function (res) {
                                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                                if (res.hasErr) {
                                    $scope.mostrarMensaje(res.mensaje)
                                    return
                                }
                                var reportesEmpresas = []
                                res.reporte.forEach(function (comensal) {
                                    var reporteEmpresas = []
                                    comensal.desayuno = { cantidad: 0, total: 0 }
                                    comensal.almuerzo = { cantidad: 0, total: 0 }
                                    comensal.cena = { cantidad: 0, total: 0 }
                                    comensal.fueraHorario = 0
                                    comensal.historial.forEach(function (historial) {
                                        if (historial.comida) {
                                            if (historial.comida.nombre.toLowerCase() === 'desayuno') {
                                                comensal.desayuno.cantidad += 1
                                            }
                                            if (historial.comida.nombre.toLowerCase() === 'almuerzo') {
                                                comensal.almuerzo.cantidad += 1
                                            }
                                            if (historial.comida.nombre.toLowerCase() === 'cena') {
                                                comensal.cena.cantidad += 1
                                            }
                                        } else {
                                            comensal.fueraHorario += 1
                                        }
                                    })
                                })
                                var periodoHoy = new Date().toISOString();
                                periodoHoy = periodoHoy.split('T')[0].split('-').reverse().join('/')
                                var rango;
                                if ($scope.filtroComensales.anio) {
                                    rango = false
                                } else if ($scope.filtroComensales.desde || $scope.filtroComensales.hasta) {
                                    rango = true
                                }
                                var periodo = $scope.filtroComensales.desde ? [$scope.filtroComensales.desde, ($scope.filtroComensales.hasta ? $scope.filtroComensales.hasta : periodoHoy)] : $scope.filtroComensales.anio ? [($scope.filtroComensales.mes ? $scope.filtroComensales.mes.nombre.toUpperCase() : ''), $scope.filtroComensales.anio.nombre] : ['Error', 'Error']

                                if (excel) {
                                    $scope.imprimirReporteEmpresaEXCEL(res.reporte, res.gerencia, cabecera, comidasEmpresa, tipoCambioDollar, res.periodo, rango)
                                } else {
                                    $scope.imprimirReporteEmpresa(res.reporte, res.gerencia, cabecera, comidasEmpresa, tipoCambioDollar, res.periodo, rango)
                                }
                                blockUI.stop();
                            }).catch(function (err) {
                                var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                $scope.mostrarMensaje(msg)
                                blockUI.stop()
                            })
                        })
                    })
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.reportePDFAlertasMarcaciones = function (excel, matriz) {
                if (matriz) {
                    var promComidas = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                    promComidas.then(function (comidas) {
                        var comidasEmpresa = comidas.lista
                        var cabecera = []
                        comidasEmpresa.forEach(function (comida) {
                            cabecera.push(comida.nombre.toUpperCase())
                        })
                        cabecera.unshift('empleado'.toUpperCase())
                        cabecera.unshift('empresa'.toUpperCase())
                        cabecera.push('Total general'.toUpperCase())
                        if ($scope.alertaMarcacionesFiltradas.length > 0) {
                            $scope.alertaMarcacionesFiltradas.reverse()
                            var alertasVerificadas = []
                            var alertas = []
                            var index = 0
                            while ($scope.alertaMarcacionesFiltradas.length > 0) {
                                var conteoIndex = -1
                                var alerta = $scope.alertaMarcacionesFiltradas.pop()
                                if (alertas.some(function (dato) {
                                    conteoIndex += 1
                                    if (dato.fecha === alerta.fecha) {
                                        return true;
                                    }
                                    return false;
                                })) {
                                    alertas[conteoIndex].alertas.push(alerta)
                                    alertasVerificadas.push(alerta)
                                } else {
                                    alertasVerificadas.push(alerta)
                                    var _alerta = { fecha: alerta.fecha, alertas: [alerta] }
                                    alertas.push(_alerta)
                                }
                                index += 1
                            }
                            $scope.alertaMarcacionesFiltradas = alertasVerificadas
                            if (excel) {
                                $scope.imprimirAlertaMarcacionesMatriz(alertas, null, cabecera, comidasEmpresa)
                            } else {
                                $scope.imprimirAlertaMarcacionesLista(alertas, null, cabecera, comidasEmpresa)
                            }
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.stack !== undefined && err.stack !== null) ? err.stack : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    if ($scope.alertaMarcacionesFiltradas.length > 0) {
                        if ($scope.filtroMarcaciones.descartados) {
                            $scope.imprimirAlertaMarcacionesMatriz($scope.alertaMarcacionesDescartadas)
                        } else {
                            $scope.imprimirAlertaMarcacionesLista($scope.alertaMarcaciones)
                        }
                    }
                }
            }

            $scope.reportePDFComensal = function (excel) {
                var reporte = [];
                var tipoCambioDollar = 0
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    tipoCambioDollar = res.monedaCambio ? res.monedaCambio.dolar : 6.96
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                    $scope.paginator.filter = $scope.filtroComensales
                    var promGer = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                    promGer.then(function (res) {
                        $scope.listaGerenciasClienteEmpresa = res.lista
                        var promComidas = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                        promComidas.then(function (comidas) {
                            var comidasEmpresa = comidas.lista
                            var cabecera = []
                            comidasEmpresa.forEach(function (comida) {
                                cabecera.push(comida.nombre.toUpperCase())
                            })
                            cabecera.unshift('FECHA'.toUpperCase())
                            cabecera.push('Total general'.toUpperCase())
                            var listaComensales;
                            if ($scope.filtroComensales.comensal.length > 0) {
                                listaComensales = $scope.filtroComensales.comensal.map((comensal) => comensal.id)
                            } else {
                                listaComensales = []
                            }

                            $scope.filtroComensales.comensalesProcesados = listaComensales
                            var promHistorial = ObtenerReporteComensal($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id, $scope.paginator)
                            promHistorial.then(function (res) {
                                res.reporte.forEach(function (repo) {
                                    repo.historial.sort(function (a, b) {
                                        if (a.fecha > b.fecha) {
                                            return 1
                                        }
                                        if (b.fecha > a.fecha) {
                                            return -1
                                        }
                                        return 0
                                    })
                                })
                                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                                if (res.hasErr) {
                                    $scope.mostrarMensaje(res.mensaje)
                                    return
                                }
                                if (res.reporte.length === 0) {
                                    $scope.mostrarMensaje('No existen datos.')
                                    return
                                }
                                if (excel) {
                                    $scope.reportesParaExcel = res.reporte
                                    $scope.imprimirExcel($scope.reportesParaExcel, null, cabecera, comidasEmpresa, tipoCambioDollar, res.periodo)
                                } else {
                                    $scope.imprimirPDFAsync(res.reporte, res.periodo[2])
                                }
                                blockUI.stop();
                            })
                        })
                    })
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.imprimirPDFAsync = function (reporte, periodo) {
                $scope.reportesParaPDF = reporte
                if ($scope.reportesParaPDF.length > 0) {
                    var reporte = $scope.reportesParaPDF.pop()
                    var prom = $scope.imprimirReporteComensal(reporte, reporte.gerencia, null, null, null, periodo)
                    prom.then(function (res) {
                        if ($scope.reportesParaPDF.length > 0) {
                            setTimeout(function () {
                                $scope.imprimirPDFAsync($scope.reportesParaPDF, periodo)
                            }, 2000);
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                        blockUI.stop()
                    })
                } else {
                    $scope.mostrarMensaje('No se encontraron datos.')
                }
            }

            $scope.imprimirExcel = function (reporte, gerencia, cabecera, comidasEmpresa, tipoCambioDollar, periodo, tipo) {
                $scope.reportesParaExcel = reporte
                if (reporte.length > 0) {
                    reporte_ = reporte.pop()
                    if (tipo === undefined) {
                        var prom = $scope.imprimirReporteComensalEXCEL(reporte_, null, cabecera, comidasEmpresa, tipoCambioDollar, periodo[2])
                        prom.then(function (res) {
                            if ($scope.reportesParaExcel.length > 0) {
                                setTimeout(function () {
                                    $scope.imprimirExcel($scope.reportesParaExcel, null, cabecera, comidasEmpresa, tipoCambioDollar, periodo)
                                }, 3000);
                            }
                        }).catch(function (err) {
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                            blockUI.stop()
                        })
                    }
                    if (tipo === 'por_gerencia') {
                        // $scope.imprimirReporteComedorEXCEL = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo)
                        var prom = $scope.imprimirReporteComedorEXCEL(reporte_, gerencia, cabecera, comidasEmpresa, tipoCambioDollar, periodo)
                        prom.then(function (res) {
                            if ($scope.reportesParaExcel.length > 0) {
                                setTimeout(function () {
                                    $scope.imprimirExcel($scope.reportesParaExcel, null, cabecera, comidasEmpresa, tipoCambioDollar, periodo, 'por_gerencia')
                                }, 3000);
                            }
                        }).catch(function (err) {
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                            blockUI.stop()
                        })
                    }
                }
            }

            $scope.imprimirAlertaMarcacionesLista = function (reporte) {
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var stream = doc.pipe(blobStream());
                var y = 135
                var itemsPorPagina = 10
                var items = 0
                var xSeparacion = 0
                var pagina = 1
                var cubeX = 70
                var periodo = reporte[0].fecha.split('T')[0].split('-').reverse().join('/') + " al " + reporte[reporte.length - 1].fecha.split('T')[0].split('-').reverse().join('/')
                var totalPaginas = Math.ceil(reporte.length / itemsPorPagina);
                $scope.cabeceraReporteAlertasMarcacionesLista(doc, $scope.usuario.empresa.razon_social, periodo, pagina, totalPaginas);
                for (var i = 0; i < reporte.length; i++) {
                    doc.text((i + 1), 70, y + 5);
                    doc.text(reporte[i].comensal.nombre, 100, y + 5);
                    doc.text($scope.filtroMarcaciones.empresaCliente.razon_social, 270, y + 5, { width: 120 });
                    doc.text(reporte[i].fecha.split('T')[0].split('-').reverse().join('/'), 380, y + 5);
                    doc.text(reporte[i].comida.nombre, 440, y + 5);
                    doc.text(reporte[i].habilitado === true ? 'Marcado' : reporte[i].habilitado === false ? 'Descartado' : 'Pendiente', 500, y + 5);
                    doc.rect(60, y, 500, 20).stroke()
                    // doc.text((i + 1), 60, y);
                    // doc.rect(60, y, 400, 20).stroke()
                    // doc.text(reporte[i].comensal.nombre, 60 + 60, y);
                    // doc.text(reporte[i].fecha, 60 + 60, y);
                    // doc.text(reporte[i].comida.nombre, 60 + 60 + 60, y);
                    // doc.text(reporte[i].habilitado === true ? 'Marcado' : reporte[i].habilitado === false ? 'Descartado' : 'Pendiente', 60 + 60 + 60 + 60, y);
                    y += 20
                    if (items > itemsPorPagina || (y > 700)) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 135;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraReporteAlertasMarcacionesLista(doc, $scope.usuario.empresa.razon_social, periodo, pagina, totalPaginas);
                    }
                }
                y += 20
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.imprimirAlertaMarcacionesMatriz = function (reporte, gerencia, cabecera, comidasEmpresa) {
                if (reporte.length > 0) {
                    var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                    var stream = doc.pipe(blobStream());
                    var y = 150
                    var itemsPorPagina = 10
                    var items = 0
                    var xSeparacion = 0
                    var pagina = 1
                    var cubeX = 70
                    var totalPaginas = Math.ceil(1 / itemsPorPagina);
                    if ($scope.Marcaciones.length > 0) {

                    }
                    $scope.cabeceraReporteAlertasMarcacionesMatriz(doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase());
                    for (var i = 0; i < reporte.length; i++) {
                        for (var index = 0; index < reporte[i].alertas.length; index++) {
                            // var total_comensal = 0
                            doc.font('Helvetica', 8);
                            // total_general_desayuno += reporte[i].desayuno.cantidad
                            // total_general_almuerzo += reporte[i].almuerzo.cantidad
                            // total_general_cena += reporte[i].cena.cantidad
                            // total_comensal = reporte[i].desayuno.cantidad + reporte[i].almuerzo.cantidad + reporte[i].cena.cantidad
                            // total_desayunos += reporte[i].desayuno.cantidad
                            // total_almuerzos += reporte[i].almuerzo.cantidad
                            // total_cenas += reporte[i].cena.cantidad
                            // xSeparacion = 0
                            doc.font('Helvetica', 6).fill('black')
                            doc.text(reporte[i].alertas[index].comida.empresaCliente.razon_social, cubeX - 20, y + 7);
                            doc.text(reporte[i].alertas[index].comensal.nombre, cubeX + 20, y + 7)
                            if (reporte[i].alertas[index].comida.nombre.toLowerCase() === "desayuno") {
                                doc.font('Helvetica', 8).fill('red');
                                doc.text(reporte[i].alertas[index].comida.nombre, cubeX + 65 + 95 + 9, y + 7).fill('black');
                                doc.rect(cubeX + 310, y + 3, 80, 20).stroke('red');
                            }
                            if (reporte[i].alertas[index].comida.nombre.toLowerCase() === "almuerzo") {
                                doc.font('Helvetica', 8).fill('black');
                                doc.text('Falta2', cubeX + 80 + 175 + 9, y + 7).fill('black');
                                doc.rect(cubeX + 230, y + 3, 80, 20).stroke('black');
                            }
                            if (reporte[i].alertas[index].comida.nombre.toLowerCase() === "cena") {
                                doc.font('Helvetica', 8).fill('black');
                                doc.text('Falta3', cubeX + 80 + 255 + 9, y + 7).fill('black');
                            }
                            doc.text(reporte[i].alertas[index].comida.nombre, cubeX + 165 + 175 + 9, y + 7)
                            // doc.text(reporte[i].alertas[index].cena.cantidad, cubeX + 80 + 255 + 9, y + 7)
                            // doc.text(total_comensal, cubeX + 80 + 335 + 9, y + 7)
                            // total_fueraHorario += reporte[i].fueraHorario
                            doc.rect(cubeX - 20, y + 3, 170, 20).stroke()
                            doc.rect(cubeX + 150, y + 3, 80, 20).stroke()
                            doc.rect(cubeX + 230, y + 3, 80, 20).stroke()
                            doc.rect(cubeX + 310, y + 3, 80, 20).stroke()
                            doc.rect(cubeX + 390, y + 3, 110, 20).stroke()
                            doc.rect(cubeX - 20, y + 3, 80, 20).stroke() // y ? 130 + 3 + 20
                            doc.rect(cubeX + 60, y + 3, 90, 20).stroke()

                            y = y + 20;
                            items++;
                            if (items > itemsPorPagina || (y > 700)) {
                                doc.addPage({ size: [612, 792], margin: 10 });
                                y = 115 + 80;
                                items = 0;
                                pagina = pagina + 1;
                                $scope.cabeceraReporteAlertasMarcacionesMatriz(doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase());
                            }
                        }
                    }
                    doc.text("Total general", cubeX - 20 + 6, y + 7);
                    // doc.text(total_general_desayuno, cubeX + 80 + 95 + 9, y + 7)
                    // doc.text(total_general_almuerzo, cubeX + 80 + 175 + 9, y + 7)
                    // doc.text(total_general_cena, cubeX + 80 + 255 + 9, y + 7)
                    // doc.text((total_general_desayuno + total_general_almuerzo + total_general_cena), cubeX + 80 + 335 + 9, y + 7)
                    doc.rect(cubeX - 20, y + 3, 170, 20).stroke()
                    doc.rect(cubeX + 150, y + 3, 80, 20).stroke()
                    doc.rect(cubeX + 230, y + 3, 80, 20).stroke()
                    doc.rect(cubeX + 310, y + 3, 80, 20).stroke()
                    doc.rect(cubeX + 390, y + 3, 110, 20).stroke()
                    // if (total_fueraHorario > 0) {
                    //     doc.text("No contabilizados (fuera de horario):", cubeX + 80 + 320, y + 7 + 20)
                    //     doc.text("Cant.: " + total_fueraHorario, cubeX + 80 + 335 + 12, y + 7 + 40)
                    // }
                    y = y + 20;
                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                } else {
                    $scope.mostrarMensaje('No hay datos.')
                }
            }

            $scope.imprimirReporteComedorEXCEL = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo) {
                return $q(function (fullfil, reject) {
                    var data = [[""], [""], [("REPORTE DE COMEDOR " + reporte.gerencia.nombre.toUpperCase() + ' ' + reporte.empresaCliente.razon_social.toUpperCase())], [""], cabecera]
                    var total_desayunos = 0;
                    var total_almuerzos = 0;
                    var total_cenas = 0;
                    for (var i = 0; i < reporte.length; i++) {
                        var columns = []
                        columns.push(reporte[i].fecha)
                        if (reporte[i].desayuno.cantidad > 0) {
                            columns.push(reporte[i].desayuno.cantidad)
                            total_desayunos += reporte[i].desayuno.cantidad
                        } else {
                            columns.push("")
                        }
                        if (reporte[i].almuerzo.cantidad > 0) {
                            columns.push(reporte[i].almuerzo.cantidad)
                            total_almuerzos += reporte[i].almuerzo.cantidad
                        } else {
                            columns.push("")
                        }
                        if (reporte[i].cena.cantidad > 0) {
                            columns.push(reporte[i].cena.cantidad)
                            total_cenas += reporte[i].cena.cantidad
                        } else {
                            columns.push("")
                        }
                        if (reporte[i].observacion) {
                            columns.push(reporte[i].observacion)
                        }
                        data.push(columns)
                    }
                    data.push([""])
                    var columns = ["TOTAL ==>", total_desayunos, total_almuerzos, total_cenas]
                    data.push(columns)
                    columns = ["TOTAL $us. ==>", (total_desayunos * dollar), (total_almuerzos * dollar), (total_cenas * dollar)]
                    data.push(columns)
                    columns = ["TOTAL General $us. ==>", "", ((total_desayunos * dollar) + (total_almuerzos * dollar) + (total_cenas * dollar))]
                    data.push(columns)
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    var wscols = [
                        { wch: 20 },
                        { wch: 19 },
                        { wch: 20 },
                        { wch: 16 },
                        { wch: 25 },
                        { wch: 15 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 8 },
                        { wch: 12 }
                    ];
                    ws['!cols'] = wscols;
                    ws['!rows'] = [{ hpx: 28, level: 3 }];
                    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 4 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, { s: { r: (3 + data.length), c: 0 }, e: { r: (3 + data.length), c: 1 } }]
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop()
                    fullfil(saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE GERENCIA " + reporte[0].gerencia.nombre.toUpperCase() + ".xlsx"))
                })
            }

            $scope.imprimirReporteEmpresaEXCEL = function (reporte, gerencia, cabecera, comidasEmpresa, dollar) {
                return $q(function (fullfil, reject) {
                    var data = [["Reporte EMPRESA VS PERIODO"], ["EMPRESA", reporte[0].historial[0].empresaCliente.razon_social], ["GERENCIA", ""], ["PERIODO", reporte[0].fecha], cabecera]
                    var total_general_desayuno = 0
                    var total_general_almuerzo = 0
                    var total_general_cena = 0
                    var total_totales = 0
                    var total_desayunos = 0;
                    var total_almuerzos = 0;
                    var total_cenas = 0;
                    for (var i = 0; i < reporte.length; i++) {
                        var total_comensal = 0
                        total_general_desayuno += reporte[i].desayuno.cantidad
                        total_general_almuerzo += reporte[i].almuerzo.cantidad
                        total_general_cena += reporte[i].cena.cantidad
                        total_comensal = reporte[i].desayuno.cantidad + reporte[i].almuerzo.cantidad + reporte[i].cena.cantidad
                        total_desayunos += reporte[i].desayuno.cantidad
                        total_almuerzos += reporte[i].almuerzo.cantidad
                        total_cenas += reporte[i].cena.cantidad
                        var columns = []
                        columns.push(reporte[i].nombre)
                        columns.push(reporte[i].desayuno.cantidad)
                        columns.push(reporte[i].almuerzo.cantidad)
                        columns.push(reporte[i].cena.cantidad)
                        total_totales += total_comensal
                        columns.push(total_comensal)
                        data.push(columns)
                    }
                    var columns = ["TOTAL General", total_general_desayuno, total_general_almuerzo, total_general_cena, (total_general_desayuno + total_general_almuerzo + total_general_cena)]
                    data.push(columns)
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    var wscols = [
                        { wch: 20 },
                        { wch: 19 },
                        { wch: 20 },
                        { wch: 16 },
                        { wch: 25 },
                        { wch: 15 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 8 },
                        { wch: 12 }
                    ];
                    ws['!cols'] = wscols;
                    ws['!rows'] = [{ hpx: 28, level: 3 }];
                    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 4 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, { s: { r: (3 + data.length), c: 0 }, e: { r: (3 + data.length), c: 1 } }]
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    fullfil(saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE EMPRESA " + reporte[0].historial[0].empresaCliente.razon_social.toUpperCase() + ".xlsx"))
                })
            }

            $scope.imprimirReporteComensalEXCEL = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo) {
                return $q(function (fullfil, reject) {
                    // var delay = $q.defer();
                    // var reporte = reporte
                    // var gerencia = gerencia
                    // var cabecera = cabecera
                    // var comidasEmpresa = comidasEmpresa
                    // var dollar = dollar

                    let posibleErrorDeDatos = () => {
                        $scope.mostrarMensaje('Parece haber un error en los datos de ' + reporte.nombre + '. Se sugiere revisión manual.')
                        return ''
                    }
                    var fecha_inicio = new Date(reporte.historial[0].fecha)
                    var fecha_final = new Date(reporte.historial[(reporte.historial.length - 1)].fecha)
                    var periodoTexto = ''
                    fecha_inicio.setHours(0)
                    fecha_inicio.setMinutes(0)
                    fecha_inicio.setSeconds(0)

                    fecha_final.setHours(23)
                    fecha_final.setMinutes(59)
                    fecha_final.setSeconds(59)
                    if ($scope.filtroComensales.desde && $scope.filtroComensales.hasta) {
                        var primerRegistro = new Date(($scope.filtroComensales.desde.split('/').reverse().join('-') + 'T12:00:00'))
                        var ultimoRegistro = new Date(($scope.filtroComensales.hasta.split('/').reverse().join('-') + 'T12:00:00'))
                        if (primerRegistro.toLocaleDateString() === ultimoRegistro.toLocaleDateString()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() !== ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        }
                    } else {
                        var primerRegistro = new Date(reporte.historial[0].fecha)
                        var ultimoRegistro = new Date(reporte.historial[reporte.historial.length - 1].fecha)
                        primerRegistro.setHours(0)
                        primerRegistro.setMinutes(0)
                        primerRegistro.setSeconds(0)

                        ultimoRegistro.setHours(23)
                        ultimoRegistro.setMinutes(59)
                        ultimoRegistro.setSeconds(59)
                        if (primerRegistro.getMonth() === ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() !== ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        }
                        // else if (primerRegistro.getMonth() === ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                        //     var uno = primerRegistro.toLocaleDateString()
                        //     var dos = ultimoRegistro.toLocaleDateString()
                        //     periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        // }
                    }
                    var getDaysArray = function (start, end) {
                        var arr = []
                        for (arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
                            arr.push(new Date(dt));
                        }
                        return arr;
                    };

                    var fechas = getDaysArray(fecha_inicio, fecha_final)
                    var data = [["REPORTE POR PERSONA"], ["EMPLEADO", reporte.nombre], ["EMPRESA", reporte.empresaCliente.razon_social], ["GERENCIA", reporte.gerencia.nombre], ["PERIODO", periodoTexto], cabecera]
                    var total_general_desayuno = 0
                    var total_general_almuerzo = 0
                    var total_general_cena = 0
                    var total_desayunos = 0;
                    var total_almuerzos = 0;
                    var total_cenas = 0;
                    var xreporte = { desayuno: 0, almuerzo: 0, cena: 0 }
                    for (var i = 0; i < fechas.length; i++) {
                        var listaDelDia = reporte.historial.filter(function (elem) {
                            return $scope.formatoFechaPDF(fechas[i]) == $scope.formatoFechaPDF(new Date(elem.fecha))
                        })
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'DESAYUNO'
                        })) {
                            xreporte.desayuno += 1
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'ALMUERZO'
                        })) {
                            xreporte.almuerzo += 1
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'CENA'
                        })) {
                            xreporte.cena += 1
                        }
                        var total_comensal = 0
                        total_general_desayuno += xreporte.desayuno
                        total_general_almuerzo += xreporte.almuerzo
                        total_general_cena += xreporte.cena
                        total_comensal = xreporte.desayuno + xreporte.almuerzo + xreporte.cena
                        total_desayunos += xreporte.desayuno
                        total_almuerzos += xreporte.almuerzo
                        total_cenas += xreporte.cena
                        var columns = []

                        columns.push($scope.formatoFechaPDF(fechas[i]))
                        columns.push(xreporte.desayuno)
                        columns.push(xreporte.almuerzo)
                        columns.push(xreporte.cena)
                        // columns.push(reporte.reporte[i].observacion)
                        columns.push(total_comensal)
                        // if (reporte[i].desayuno.cantidad > 0) {
                        //     // doc.text(reporte[i].fecha, cubeX + 9, y + 7);
                        //     // doc.text(reporte[i].desayuno.cantidad, cubeX + 95 + 9, y + 7)
                        //     columns.push(reporte[i].desayuno.cantidad)
                        //     total_desayunos += reporte[i].desayuno.cantidad
                        // }else{
                        //     columns.push("")
                        // }
                        // if (reporte[i].almuerzo.cantidad > 0) {
                        //     columns.push(reporte[i].almuerzo.cantidad)
                        //     total_almuerzos += reporte[i].almuerzo.cantidad
                        // }else{
                        //     columns.push("")
                        // }
                        // if (reporte[i].cena.cantidad > 0) {
                        //     columns.push(reporte[i].cena.cantidad)
                        //     total_cenas += reporte[i].cena.cantidad
                        // }else{
                        //     columns.push("")
                        // }
                        // if (reporte[i].observacion) {
                        //     columns.push(reporte[i].observacion)
                        // }
                        xreporte = { desayuno: 0, almuerzo: 0, cena: 0 }
                        data.push(columns)
                    }
                    // data.push([""])
                    var columns = ["TOTAL General", total_general_desayuno, total_general_almuerzo, total_general_cena, (total_general_desayuno + total_general_almuerzo + total_general_cena)]
                    // data.push(columns)
                    // columns = [total_general_desayuno]
                    // data.push(columns)
                    // columns = [total_general_almuerzo]
                    // data.push(columns)
                    // columns = [total_general_cena]
                    data.push(columns)
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    var wscols = [
                        { wch: 20 },
                        { wch: 19 },
                        { wch: 20 },
                        { wch: 16 },
                        { wch: 25 },
                        { wch: 15 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 25 },
                        { wch: 8 },
                        { wch: 12 }
                    ];
                    ws['!cols'] = wscols;
                    ws['!rows'] = [{ hpx: 28, level: 3 }];
                    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 4 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, { s: { r: (3 + data.length), c: 0 }, e: { r: (3 + data.length), c: 1 } }]
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    fullfil(saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE COMENSAL " + reporte.nombre.toUpperCase() + ' ' + periodoTexto + ".xlsx"));
                })
            }

            $scope.imprimirReporteComedor = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo) {
                if (reporte.length === 0) {
                    $scope.mostrarMensaje('No existen datos.')
                    return
                }
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var stream = doc.pipe(blobStream());
                var y = 170
                var itemsPorPagina = 20
                // var inicio_periodo;
                // var final_periodo;
                // if (periodo[0]) {
                //     inicio_periodo = periodo[0].split('T')[0]
                // }
                // if (periodo[1]) {
                //     final_periodo = periodo[1].split('T')[0]
                // }
                // var periodo_ = 
                var items = 0
                var xSeparacion = 0
                var pagina = 1
                var cubeX = 140
                var totalPaginas = Math.ceil(1 / itemsPorPagina);
                $scope.cabeceraReporteComedor(reporte, doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), 0, periodo);
                var total_desayunos = 0
                var total_almuerzos = 0
                var total_cenas = 0
                for (var i = 0; i < reporte.length; i++) {
                    cabecera.forEach(function (dato) {
                        doc.rect(cubeX + xSeparacion, y, 80, 20).stroke()
                        xSeparacion += 80
                    })
                    xSeparacion = 0
                    doc.font('Helvetica', 8);
                    if (reporte[i].desayuno.cantidad > 0) {
                        doc.text(reporte[i].fecha, cubeX + 9, y + 7);
                        doc.text(reporte[i].desayuno.cantidad, cubeX + 95 + 9, y + 7)
                        total_desayunos += reporte[i].desayuno.cantidad
                    }
                    if (reporte[i].almuerzo.cantidad > 0) {
                        doc.text(reporte[i].fecha, cubeX + 9, y + 7);
                        doc.text(reporte[i].almuerzo.cantidad, cubeX + 175 + 9, y + 7)
                        total_almuerzos += reporte[i].almuerzo.cantidad
                    }
                    if (reporte[i].cena.cantidad > 0) {
                        doc.text(reporte[i].fecha, cubeX + 9, y + 7);
                        doc.text(reporte[i].cena.cantidad, cubeX + 255 + 9, y + 7)
                        total_cenas += reporte[i].cena.cantidad
                    }
                    if (reporte[i].observacion) {
                        doc.text(reporte[i].fecha, cubeX + 9, y + 7);
                        doc.text(reporte[i].observacion, cubeX + 312 + 9, y + 3, { width: 80 })
                    }
                    y = y + 20;
                    items++;
                    if (items > itemsPorPagina || (y > 700)) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 170;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraReporteComedor(reporte, doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, reporte[i].gerencia ? reporte[i].gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), i, periodo);
                    }
                }
                doc.rect(cubeX, y, 80, 20).stroke()
                doc.rect(cubeX + 80, y, 80, 20).stroke()
                doc.rect(cubeX + 160, y, 80, 20).stroke()
                doc.rect(cubeX + 240, y, 80, 20).stroke()
                // doc.rect(cubeX + 320, y, 80, 20).stroke()
                y = y + 20;
                var precio_total_desayunos = total_desayunos * (comidasEmpresa[0].nombre.toLowerCase() === 'desayuno' ? comidasEmpresa[0].precio[0].precio : comidasEmpresa[1].nombre.toLowerCase() === 'desayuno' ? comidasEmpresa[1].precio[0].precio : comidasEmpresa[2].nombre.toLowerCase() === 'desayuno' ? comidasEmpresa[2].precio[0].precio : 'ERROR')
                var precio_total_almuerzos = total_almuerzos * (comidasEmpresa[0].nombre.toLowerCase() === 'almuerzo' ? comidasEmpresa[0].precio[0].precio : comidasEmpresa[1].nombre.toLowerCase() === 'almuerzo' ? comidasEmpresa[1].precio[0].precio : comidasEmpresa[2].nombre.toLowerCase() === 'almuerzo' ? comidasEmpresa[2].precio[0].precio : 'ERROR')
                var precio_total_cenas = total_cenas * (comidasEmpresa[0].nombre.toLowerCase() === 'cena' ? comidasEmpresa[0].precio[0].precio : comidasEmpresa[1].nombre.toLowerCase() === 'cena' ? comidasEmpresa[1].precio[0].precio : comidasEmpresa[2].nombre.toLowerCase() === 'cena' ? comidasEmpresa[2].precio[0].precio : 'ERROR')
                doc.text('Total.-', cubeX + 15 + 9, y + 7)
                doc.text('Total $us.-', cubeX + 15 + 9, y + 7 + 20)
                doc.text('Total General $us.-', cubeX + 15 + 9, y + 7 + 40)
                doc.rect(cubeX + 80, y, 80, 20).stroke()
                doc.text(total_desayunos, cubeX + 95 + 9, y + 7)
                doc.rect(cubeX + 160, y, 80, 20).stroke()
                doc.text(total_almuerzos, cubeX + 175 + 9, y + 7)
                doc.rect(cubeX + 240, y, 80, 20).stroke()
                doc.text(total_cenas, cubeX + 255 + 9, y + 7)
                doc.rect(cubeX + 80, y + 20, 80, 20).stroke()
                doc.rect(cubeX + 160, y + 20, 80, 20).stroke()
                doc.rect(cubeX + 240, y + 20, 80, 20).stroke()
                doc.rect(cubeX + 160, y + 40, 80, 20).stroke()
                doc.text($scope.number_format(precio_total_desayunos, 2), cubeX + 95 + 9, y + 7 + 20)
                doc.text($scope.number_format(precio_total_almuerzos, 2), cubeX + 175 + 9, y + 7 + 20)
                doc.text($scope.number_format(precio_total_cenas, 2), cubeX + 255 + 9, y + 7 + 20)
                doc.text($scope.number_format((precio_total_desayunos + precio_total_almuerzos + precio_total_cenas), 2), cubeX + 175 + 9, y + 7 + 40)
                doc.rect(cubeX, y + 70, 80, 20).fill("yellow")
                doc.rect(cubeX, y + 90, 80, 20).fill("yellow")
                doc.rect(cubeX, y + 110, 80, 20).fill("yellow")
                doc.rect(cubeX + 80, y + 70, 80, 20).fill("yellow")
                doc.rect(cubeX + 80, y + 90, 80, 20).fill("yellow")
                doc.rect(cubeX + 80, y + 110, 80, 20).fill("yellow")
                doc.rect(cubeX + 240, y + 90, 160, 20).fill("yellow")
                doc.rect(cubeX, y + 70, 80, 20).stroke()
                doc.rect(cubeX, y + 90, 80, 20).stroke()
                doc.rect(cubeX, y + 110, 80, 20).stroke()
                doc.rect(cubeX + 80, y + 70, 80, 20).stroke()
                doc.rect(cubeX + 80, y + 90, 80, 20).stroke()
                doc.rect(cubeX + 80, y + 110, 80, 20).stroke()
                    .fill("black")
                doc.text('Desayuno.-', cubeX + 15 + 9, y + 7 + 70)
                doc.text('almuerzo.-', cubeX + 15 + 9, y + 7 + 90)
                doc.text('Cena.-', cubeX + 15 + 9, y + 7 + 110)
                doc.rect(cubeX + 240, y + 90, 160, 20).stroke()
                doc.text(('T.C. ' + dollar + '       Bs ' + ($scope.number_format(((precio_total_desayunos + precio_total_almuerzos + precio_total_cenas) * dollar), 2))), cubeX + 15 + 9 + 240, y + 7 + 90)
                doc.text((comidasEmpresa[0].nombre.toLowerCase() === 'desayuno' ? $scope.number_format(comidasEmpresa[0].precio[0].precio, 2) : comidasEmpresa[1].nombre.toLowerCase() === 'desayuno' ? $scope.number_format(comidasEmpresa[1].precio[0].precio, 2) : comidasEmpresa[2].nombre.toLowerCase() === 'desayuno' ? $scope.number_format(comidasEmpresa[2].precio[0].precio, 2) : 'ERROR'), cubeX + 15 + 9 + 80, y + 7 + 70)
                doc.text((comidasEmpresa[0].nombre.toLowerCase() === 'almuerzo' ? $scope.number_format(comidasEmpresa[0].precio[0].precio, 2) : comidasEmpresa[1].nombre.toLowerCase() === 'almuerzo' ? $scope.number_format(comidasEmpresa[1].precio[0].precio, 2) : comidasEmpresa[2].nombre.toLowerCase() === 'almuerzo' ? $scope.number_format(comidasEmpresa[2].precio[0].precio, 2) : 'ERROR'), cubeX + 15 + 9 + 80, y + 7 + 90)
                doc.text((comidasEmpresa[0].nombre.toLowerCase() === 'cena' ? $scope.number_format(comidasEmpresa[0].precio[0].precio, 2) : comidasEmpresa[1].nombre.toLowerCase() === 'cena' ? $scope.number_format(comidasEmpresa[1].precio[0].precio, 2) : comidasEmpresa[2].nombre.toLowerCase() === 'cena' ? $scope.number_format(comidasEmpresa[2].precio[0].precio, 2) : 'ERROR'), cubeX + 15 + 9 + 80, y + 7 + 110)
                var literal = ConvertirALiteral((precio_total_desayunos + precio_total_almuerzos + precio_total_cenas).toFixed(2))
                literal = literal.split('BOLIVIANOS')[0]
                doc.text('Son: ' + literal + ' Dólares Americanos', cubeX + 15 + 9, y + 7 + 130)
                // doc.rect(cubeX + 130, y + 460, 110, 0).stroke()
                // doc.text('Encargado', cubeX + 146 + 10, y + 455)
                doc.end();

                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.imprimirReporteEmpresa = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo, rango) {
                // if (reporte.length === 0) {
                //     $scope.mostrarMensaje('No existen datos.')
                //     return
                // }
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var stream = doc.pipe(blobStream());
                var y = 190
                var itemsPorPagina = 25
                var items = 0
                var xSeparacion = 0
                // var inicio_periodo;
                // var final_periodo;
                // if (rango) {
                //     if (periodo[0]) {
                //         inicio_periodo = periodo[0].split('T')[0]
                //     }
                //     if (periodo[1]) {
                //         final_periodo = periodo[1].split('T')[0]
                //     }
                // } else {
                //     inicio_periodo = periodo[0]
                //     final_periodo = periodo[1]

                // }

                var pagina = 1
                var cubeX = 70
                var totalPaginas = Math.ceil(1 / itemsPorPagina);
                $scope.cabeceraReporteEmpresa(reporte, doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), periodo);
                var total_general_desayuno = 0
                var total_general_almuerzo = 0
                var total_general_cena = 0
                var total_desayunos = 0
                var total_almuerzos = 0
                var total_cenas = 0
                var total_fueraHorario = 0
                for (var i = 0; i < reporte.length; i++) {
                    var total_comensal = 0
                    doc.font('Helvetica', 8);
                    total_general_desayuno += reporte[i].desayuno.cantidad
                    total_general_almuerzo += reporte[i].almuerzo.cantidad
                    total_general_cena += reporte[i].cena.cantidad
                    total_comensal = reporte[i].desayuno.cantidad + reporte[i].almuerzo.cantidad + reporte[i].cena.cantidad
                    total_desayunos += reporte[i].desayuno.cantidad
                    total_almuerzos += reporte[i].almuerzo.cantidad
                    total_cenas += reporte[i].cena.cantidad
                    xSeparacion = 0
                    doc.font('Helvetica', 8).fill('black')
                    doc.text(reporte[i].nombre, cubeX + 3, y + 6, { width: 147 });
                    doc.text(reporte[i].desayuno.cantidad, cubeX + 200, y + 7)
                    doc.text(reporte[i].almuerzo.cantidad, cubeX + 295, y + 7)
                    doc.text(reporte[i].cena.cantidad, cubeX + 395, y + 7)
                    // doc.text(total_comensal, cubeX + 80 + 335 + 9, y + 7)
                    total_fueraHorario += reporte[i].fueraHorario
                    doc.rect(cubeX, y + 3, 150, 20).stroke()
                    doc.rect(cubeX + 150, y + 3, 100, 20).stroke()
                    doc.rect(cubeX + 250, y + 3, 100, 20).stroke()
                    doc.rect(cubeX + 350, y + 3, 100, 20).stroke()
                    // doc.rect(cubeX + 390, y + 3, 110, 20).stroke()
                    y = y + 20;
                    items++;
                    if (items > itemsPorPagina || (y > 700)) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 190;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraReporteEmpresa(reporte, doc, pagina, totalPaginas, cabecera, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), periodo);
                    }
                }
                doc.text("Total general", cubeX + 6, y + 7);
                doc.text(total_general_desayuno, cubeX + 195, y + 7)
                doc.text(total_general_almuerzo, cubeX + 290, y + 7)
                doc.text(total_general_cena, cubeX + 390, y + 7)
                // doc.text((total_general_desayuno + total_general_almuerzo + total_general_cena), cubeX + 80 + 335 + 9, y + 7)
                doc.rect(cubeX, y + 3, 150, 20).stroke()
                doc.rect(cubeX + 150, y + 3, 100, 20).stroke()
                doc.rect(cubeX + 250, y + 3, 100, 20).stroke()
                doc.rect(cubeX + 350, y + 3, 100, 20).stroke()
                // doc.rect(cubeX + 390, y + 3, 110, 20).stroke()
                if (total_fueraHorario > 0) {
                    doc.text("No contabilizados (fuera de horario):", cubeX + 80 + 320, y + 7 + 20)
                    doc.text("Cant.: " + total_fueraHorario, cubeX + 80 + 335 + 12, y + 7 + 40)
                }
                y = y + 20;
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            // $scope.formatoFechaPDF = function (fecha) {
            //     var MyDate = new Date(fecha);
            //     var MyDateString;
            //     MyDate.setDate(MyDate.getDate());
            //     MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + MyDate.getFullYear();
            //     return MyDateString
            // }

            $scope.imprimirReporteComensal = function (reporte, gerencia, cabecera, comidasEmpresa, dollar, periodo, rangoFechas) {
                return $q(function (resolve, reject) {
                    let posibleErrorDeDatos = () => {
                        $scope.mostrarMensaje('Parece haber un error en los datos de ' + reporte.nombre + '. Se sugiere revisión manual.')
                        return ''
                    }
                    var fecha_inicio = new Date(reporte.historial[0].fecha)
                    var fecha_final = new Date(reporte.historial[(reporte.historial.length - 1)].fecha)
                    var periodoTexto = ''
                    fecha_inicio.setHours(0)
                    fecha_inicio.setMinutes(0)
                    fecha_inicio.setSeconds(0)
                    fecha_final.setHours(23)
                    fecha_final.setMinutes(59)
                    fecha_final.setSeconds(59)
                    if ($scope.filtroComensales.desde && $scope.filtroComensales.hasta) {
                        var primerRegistro = new Date(($scope.filtroComensales.desde.split('/').reverse().join('-') + 'T12:00:00'))
                        var ultimoRegistro = new Date(($scope.filtroComensales.hasta.split('/').reverse().join('-') + 'T12:00:00'))
                        if (primerRegistro.toLocaleDateString() === ultimoRegistro.toLocaleDateString()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() !== ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        }
                    } else {
                        var primerRegistro = new Date(reporte.historial[0].fecha)
                        var ultimoRegistro = new Date(reporte.historial[reporte.historial.length - 1].fecha)
                        primerRegistro.setHours(0)
                        primerRegistro.setMinutes(0)
                        primerRegistro.setSeconds(0)

                        ultimoRegistro.setHours(23)
                        ultimoRegistro.setMinutes(59)
                        ultimoRegistro.setSeconds(59)
                        if (primerRegistro.getMonth() === ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() !== ultimoRegistro.getFullYear()) {
                            var uno = primerRegistro.toLocaleDateString()
                            var dos = ultimoRegistro.toLocaleDateString()
                            periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        }
                        // else if (primerRegistro.getMonth() === ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                        //     var uno = primerRegistro.toLocaleDateString()
                        //     var dos = ultimoRegistro.toLocaleDateString()
                        //     periodoTexto = "Del " + primerRegistro.getDate() + " de " + $scope.mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + $scope.mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                        // }
                    }
                    var getDaysArray = function (start, end) {
                        var arr = []
                        for (arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
                            arr.push(new Date(dt));
                        }
                        return arr;
                    };

                    var fechas = getDaysArray(fecha_inicio, fecha_final)

                    var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                    var stream = doc.pipe(blobStream());
                    var y = 210
                    var itemsPorPagina = 20
                    var items = 0
                    var xSeparacion = 0
                    var pagina = 1
                    var cubeX = 70
                    // var inicio_periodo;
                    // var final_periodo;
                    // if (periodo[0]) {
                    //     inicio_periodo = periodo[0].split('T')[0]
                    // }
                    // if (periodo[1]) {
                    //     final_periodo = periodo[1].split('T')[0]
                    // }a
                    var totalPaginas = Math.ceil(1 / itemsPorPagina);
                    $scope.cabeceraReporteComensal(reporte, doc, pagina, totalPaginas, reporte, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), periodoTexto);
                    var total_general_desayuno = 0
                    var total_general_almuerzo = 0
                    var total_general_cena = 0
                    var total_desayunos = 0
                    var total_almuerzos = 0
                    var total_cenas = 0
                    var xreporte = { desayuno: 0, almuerzo: 0, cena: 0, verificado_desayuno: 0, verificado_almuerzo: 0, verificado_cena: 0 }

                    for (var i = 0; i < fechas.length; i++) {
                        doc.rect(cubeX + 160, y + 3, 100, 20).stroke('black');
                        doc.rect(cubeX + 260, y + 3, 100, 20).stroke('black');
                        doc.rect(cubeX + 360, y + 3, 100, 20).stroke('black');
                        var listaDelDia = reporte.historial.filter(function (elem) {
                            return $scope.formatoFechaPDF(fechas[i]) == $scope.formatoFechaPDF(new Date(elem.fecha))
                        })
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'DESAYUNO'
                        })) {
                            total_desayunos += 1
                            xreporte.desayuno += 1
                            doc.font('Helvetica', 8).fill('black');
                            doc.text(1, cubeX + 211, y + 7).fill('black');
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'ALMUERZO'
                        })) {
                            total_almuerzos += 1
                            xreporte.almuerzo += 1
                            doc.font('Helvetica', 8).fill('black');
                            doc.text(1, cubeX + 310, y + 7).fill('black');
                            // doc.rect(cubeX + 230, y + 3, 100, 20).stroke('black');
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'CENA'
                        })) {
                            xreporte.cena += 1
                            total_cenas += 1
                            doc.font('Helvetica', 8).fill('black');
                            doc.text(1, cubeX + 400, y + 7).fill('black');
                            //  doc.rect(cubeX + 310, y + 3, 100, 20).stroke('black');
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.verificado && (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'DESAYUNO')
                        })) {
                            xreporte.verificado_desayuno += 1
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.verificado && (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'ALMUERZO')
                        })) {
                            xreporte.verificado_almuerzo += 1
                        }
                        if (listaDelDia.some(function (dato) {
                            return (dato.verificado && (dato.comida ? dato.comida.nombre.toUpperCase() : posibleErrorDeDatos()) === 'CENA')
                        })) {
                            xreporte.verificado_cena += 1
                        }
                        var total_comensal = 0
                        doc.font('Helvetica', 8).fill('black');
                        total_general_desayuno += xreporte.desayuno
                        total_general_almuerzo += xreporte.almuerzo
                        total_general_cena += xreporte.cena
                        total_comensal = xreporte.desayuno + xreporte.almuerzo + xreporte.cena
                        // total_desayunos += 0
                        // total_almuerzos += 0
                        // total_cenas += 0
                        xSeparacion = 0

                        doc.font('Helvetica', 8).fill('black')
                        doc.rect(cubeX, y + 3, 160, 20).stroke('black');
                        // doc.rect(cubeX + 390, y + 3, 110, 20).stroke('black');
                        doc.text($scope.formatoFechaPDF(fechas[i]), cubeX + 48, y + 7).fill('black');
                        // doc.text(total_comensal, cubeX + 80 + 335 + 9, y + 7).fill('black');
                        // doc.rect(cubeX + 310, y + 3, 100, 20).stroke('black');
                        if (xreporte.desayuno === 0 || xreporte.verificado_desayuno) {
                            doc.rect(cubeX + 162, y + 5, 96, 16).stroke('red');
                            // doc.text('Falta', cubeX + 80 + 95 + 9, y + 7).fill('black');
                            // doc.rect(cubeX + 310, y + 3, 100, 20).stroke('black');
                            doc.font('Helvetica', 8).fill('black');
                        }
                        if (xreporte.almuerzo === 0 || xreporte.verificado_almuerzo) {
                            doc.rect(cubeX + 262, y + 5, 96, 16).stroke('red');
                            doc.font('Helvetica', 8).fill('black');
                            // doc.text('Falta', cubeX + 80 + 175 + 9, y + 7).fill('black');
                            // doc.rect(cubeX + 230, y + 3, 100, 20).stroke('black');
                        }
                        if (xreporte.cena === 0 || xreporte.verificado_cena) {
                            doc.rect(cubeX + 362, y + 5, 96, 16).stroke('red');
                            doc.font('Helvetica', 8).fill('black');
                            // doc.text('Falta', cubeX + 80 + 255 + 9, y + 7).fill('black');
                            // doc.rect(cubeX + 150, y + 3, 100, 20).stroke('black');
                        }
                        y = y + 20;
                        items++;
                        xreporte = { desayuno: 0, almuerzo: 0, cena: 0, verificado_desayuno: 0, verificado_almuerzo: 0, verificado_cena: 0 }
                        if (items > itemsPorPagina || (y > 700)) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 210;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.cabeceraReporteComensal(reporte, doc, pagina, totalPaginas, reporte, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.razon_social ? $scope.filtroComensales.empresaCliente.razon_social : $scope.empresaExternaSeleccionada.razon_social : $scope.empresaExternaSeleccionada.razon_social, gerencia ? gerencia.nombre.toUpperCase() : 'Sin asignación.'.toUpperCase(), periodoTexto);
                        }
                    }
                    doc.font('Helvetica', 8).fill('black');
                    doc.text("Total general".toLocaleUpperCase(), cubeX + 45, y + 7).fill('black');
                    doc.text(total_general_desayuno, cubeX + 209, y + 7).fill('black');
                    doc.text(total_general_almuerzo, cubeX + 309, y + 7).fill('black');
                    doc.text(total_general_cena, cubeX + 409, y + 7).fill('black');
                    // doc.text((total_general_desayuno + total_general_almuerzo + total_general_cena), cubeX + 80 + 335 + 9, y + 7).fill('black');
                    doc.rect(cubeX, y + 3, 160, 20).stroke('black');
                    doc.rect(cubeX + 160, y + 3, 100, 20).stroke('black');
                    doc.rect(cubeX + 260, y + 3, 100, 20).stroke('black');
                    doc.rect(cubeX + 360, y + 3, 100, 20).stroke('black');
                    // doc.rect(cubeX + 390, y + 3, 110, 20).stroke('black');
                    y = y + 20;
                    doc.end();
                    resolve(stream.on('finish', function () {
                        var fileURL = stream.toBlob('application/pdf');
                        saveAs(fileURL, 'REPORTE COMENSAL ' + reporte.nombre.toUpperCase() + ' ' + periodoTexto + '.pdf');
                    }))
                })
            }

            $scope.cabeceraReporteComedor = function (reporte, doc, pagina, totalPaginas, cabecera, empresa, comedor, i, periodo) {
                var y = 150;
                var xSeparacion = 0
                var cubeX = 140
                // var fecha_impresion = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()

                // var inicial = new Date(inicio_periodo)
                // var finalo = new Date(final_periodo)
                // var dif = Math.floor(Math.abs(finalo - inicial) / 36e5);//(((finalo.getTime() - inicial.getTime()) / 1000) /60) /60
                // var hoy = new Date()
                // var fecha_inicial_reporte = new Date(reporte[0].fecha)
                // var fecha_final_reporte = new Date(reporte[reporte.length - 1].fecha)
                // doc.rect(40, 40, 40, 40).fillAndStroke("silver", "#000");
                doc.font('Helvetica-Bold', 12)
                    .fill('black')
                doc.text("REPORTES DE COMEDOR " + comedor.toUpperCase() + ' ' + empresa.toUpperCase(), 150, 80, { width: 300, align: "center" });
                doc.font('Helvetica-Bold', 10)
                doc.text("PERIODO " + (periodo.length > 0 ? periodo.toUpperCase() : reporte[i].periodo), 130, 110, { width: 350, align: "center" });
                doc.font('Helvetica-Bold', 12)
                // if (inicio_periodo && final_periodo) {
                //     doc.text("PERIODO " + (dif < 745 ? $scope.meses[inicial.getMonth() + 1].nombre.toUpperCase() + '/' + inicial.getFullYear() : $scope.meses[inicial.getMonth() + 1].nombre.toUpperCase() + '/' + inicial.getFullYear() + ' A ' + $scope.meses[finalo.getMonth()].nombre.toUpperCase() + '/' + finalo.getFullYear()), 150, 110, { width: 300, align: "center" });
                // } else if (!inicio_periodo && final_periodo) {
                //     doc.text("PERIODO " + $scope.meses[fecha_inicial_reporte.getMonth()].nombre.toUpperCase() + '/' + finalo.getFullYear(), 150, 110, { width: 300, align: "center" });
                // } else {
                //     doc.text("PERIODO " + reporte[0].fecha.split('-').reverse().join('/') + ' A ' + reporte[reporte.length - 1].fecha.split('-').reverse().join('/'), 150, 110, { width: 300, align: "center" });
                // }

                if ($scope.filtroComensales.comensal.length === 1) {
                    doc.font('Helvetica-Bold', 10)
                    doc.text("COMENSAL: " + $scope.filtroComensales.comensal[0].name, 120, 130, { width: 350, align: "center" });
                    doc.font('Helvetica-Bold', 12)
                }

                doc.font('Helvetica-Bold', 8);
                cabecera.forEach(function (dato) {
                    doc.rect(cubeX + xSeparacion, y, 80, 20).stroke()
                    doc.text(dato, cubeX + xSeparacion + 9, y + 7);
                    xSeparacion += 80
                })
                doc.rect(cubeX + 130, y + 500, 130, 0).stroke()
                doc.text('Encargado', cubeX + 146 + 26, y + 510)
                doc.font('Helvetica', 8);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.cabeceraReporteAlertasMarcacionesLista = function (doc, empresa, periodo, pagina, totalPaginas) {
                var y = 150;
                var x = 100
                var xSeparacion = 0
                var cubeX = 70
                doc.font('Helvetica', 6)
                    .fill('black')
                doc.text('Pag. ' + (pagina + ' de ' + totalPaginas), 560, 40);
                doc.font('Helvetica-Bold', 12)
                    .fill('black')
                doc.text(empresa.toLocaleUpperCase(), 260, 60);
                doc.font('Helvetica-Bold', 8);
                // doc.text(empresa.razon_social.toLocaleUpperCase(), 260, 60);
                doc.text("Cochambamba - Bolivia", 255, 80);
                doc.font('Helvetica-Bold', 8);
                doc.text("Del " + periodo, 255, 100);
                doc.text("Nro.", 70, 120);
                doc.text("comensal", 100, 120);
                doc.text("empresa", 270, 120);
                doc.text("fecha", 380, 120);
                doc.text("Comida", 440, 120);
                doc.text("Estado", 500, 120);
                doc.rect(60, 115, 500, 20).stroke()

                // doc.text("ALMUERZO", 350 - 30, 140);
                // doc.text("CENA", 430 - 30, 140);
                // doc.text("TOTAL GENERAL", 510 - 30, 140);
                // doc.rect(cubeX - 20, 113, 170, 20).stroke()
                // doc.rect(cubeX + 150, 113, 350, 20).stroke()
                // // doc.rect(cubeX, 93, 150, 20).stroke()
                // // doc.rect(cubeX, 113, 150, 20).stroke()
                // // doc.rect(cubeX, 133, 150, 20).stroke()
                // // doc.rect(cubeX + 150, 73, 350, 20).stroke()
                // // doc.rect(cubeX + 150, 93, 350, 20).stroke()
                // // doc.rect(cubeX + 150, 113, 350, 20).stroke()
                // doc.rect(cubeX - 20, 133, 80, 20).stroke()
                // doc.rect(cubeX + 60, 133, 90, 20).stroke()
                // // doc.rect(cubeX + 50, 133, 80, 20).stroke()
                // doc.rect(cubeX + 150, 133, 80, 20).stroke()
                // doc.rect(cubeX + 230, 133, 80, 20).stroke()
                // doc.rect(cubeX + 310, 133, 80, 20).stroke()
                // doc.rect(cubeX + 390, 133, 110, 20).stroke()
                // doc.font('Helvetica', 8);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.cabeceraReporteAlertasMarcacionesMatriz = function (doc, empresa, totalPaginas, cabecera, empresa, comedor) {
                var y = 150;
                var x = 100
                var xSeparacion = 0
                var cubeX = 70
                doc.font('Helvetica-Bold', 12)
                    .fill('black')
                doc.font('Helvetica-Bold', 8);
                doc.text("Alerta no Marcaciones".toLocaleUpperCase(), 260, 80);
                doc.text("Fecha", 60, 120);
                doc.text("Empresa", 60, 140);
                doc.text("Empleado", 134, 140);
                doc.text("DESAYUNO", 270 - 30, 140);
                doc.text("ALMUERZO", 350 - 30, 140);
                doc.text("CENA", 430 - 30, 140);
                doc.text("TOTAL GENERAL", 510 - 30, 140);
                doc.rect(cubeX - 20, 113, 170, 20).stroke()
                doc.rect(cubeX + 150, 113, 350, 20).stroke()
                // doc.rect(cubeX, 93, 150, 20).stroke()
                // doc.rect(cubeX, 113, 150, 20).stroke()
                // doc.rect(cubeX, 133, 150, 20).stroke()
                // doc.rect(cubeX + 150, 73, 350, 20).stroke()
                // doc.rect(cubeX + 150, 93, 350, 20).stroke()
                // doc.rect(cubeX + 150, 113, 350, 20).stroke()
                doc.rect(cubeX - 20, 133, 80, 20).stroke()
                doc.rect(cubeX + 60, 133, 90, 20).stroke()
                // doc.rect(cubeX + 50, 133, 80, 20).stroke()
                doc.rect(cubeX + 150, 133, 80, 20).stroke()
                doc.rect(cubeX + 230, 133, 80, 20).stroke()
                doc.rect(cubeX + 310, 133, 80, 20).stroke()
                doc.rect(cubeX + 390, 133, 110, 20).stroke()
                doc.font('Helvetica', 8);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.cabeceraReporteEmpresa = function (reporte, doc, pagina, totalPaginas, cabecera, empresa, comedor, periodo) {
                var y = 40;
                var x = 100
                var xSeparacion = 0
                var cubeX = 70
                doc.font('Helvetica-Bold', 12)
                    .fill('black')
                doc.font('Helvetica-Bold', 8);
                doc.text("Empresa", 124, 80 + y);
                doc.text(empresa, 300, 80 + y);
                doc.text("Gerencia", 124, 100 + y);
                var fecha_impresion = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()

                // var inicial = new Date(inicio_periodo)
                // var finalo = new Date(final_periodo)
                // var dif = Math.floor(Math.abs(finalo - inicial) / 36e5);//(((finalo.getTime() - inicial.getTime()) / 1000) /60) /60
                // var hoy = new Date()

                // var fecha_inicial_reporte = new Date(reporte[0].historial[0].fecha)
                // var fecha_final_reporte = new Date(reporte[0].historial[reporte[0].historial.length - 1].fecha)
                if (comedor) {
                    doc.text(comedor.toUpperCase() === 'SIN ASIGNACIÓN.' ? 'TODAS' : comedor.toUpperCase(), 320, 100 + y);
                } else {
                    doc.text("TODAS", 320, 80 + y);
                }
                doc.text(periodo[2], 200, 120 + y, { width: 300, align: "center" });
                // if (rango) {
                //     doc.text(inicio_periodo + ' A ' + final_periodo, 200, 120 + y, { width: 300, align: "center" });
                // } else {
                //     doc.text(inicio_periodo + ' DE ' + final_periodo, 200, 120 + y, { width: 300, align: "center" });
                // }
                // doc.text("Periodo ", 300, 100+y);
                doc.text("Periodo", 124, 120 + y);
                doc.text("Empleado", 124, 140 + y);
                doc.text("DESAYUNO", 270 - 15, 140 + y);
                doc.text("ALMUERZO", 350 - 5, 140 + y);
                doc.text("CENA", 455, 140 + y);
                // doc.text("TOTAL GENERAL", 510 - 30, 140 + y);
                doc.rect(cubeX, 73 + y, 150, 20).stroke()
                doc.rect(cubeX, 93 + y, 150, 20).stroke()
                doc.rect(cubeX, 113 + y, 150, 20).stroke()
                doc.rect(cubeX, 133 + y, 150, 20).stroke()
                doc.rect(cubeX + 150, 73 + y, 300, 20).stroke()
                doc.rect(cubeX + 150, 93 + y, 300, 20).stroke()

                doc.rect(cubeX + 150, 113 + y, 300, 20).stroke()
                doc.rect(cubeX + 150, 133 + y, 100, 20).stroke()
                doc.rect(cubeX + 250, 133 + y, 100, 20).stroke()
                doc.rect(cubeX + 350, 133 + y, 100, 20).stroke()
                // doc.rect(cubeX + 390, 133 + y, 110, 20).stroke()
                doc.font('Helvetica', 8);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.cabeceraReporteComensal = function (reporte, doc, pagina, totalPaginas, reporte, empresa, comedor, periodo) {
                var y = 40;
                var x = 100
                // var xSeparacion = 0
                var cubeX = 70
                // var fecha_impresion = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
                // var inicial = new Date(inicio_periodo)
                // var finalo = new Date(final_periodo)
                // var dif = Math.floor(Math.abs(finalo - inicial) / 36e5);//(((finalo.getTime() - inicial.getTime()) / 1000) /60) /60
                // var hoy = new Date()
                doc.font('Helvetica-Bold', 8)
                    .fill('black')
                // var fecha_inicial_reporte = new Date(reporte.reporte[0].fecha)
                // var fecha_final_reporte = new Date(reporte.reporte[reporte.reporte.length - 1].fecha)
                // if (inicio_periodo && final_periodo) {
                //     doc.text((dif < 745 ? $scope.meses[inicial.getMonth()].nombre.toUpperCase() + '/' + inicial.getFullYear() : $scope.meses[inicial.getMonth()].nombre.toUpperCase() + '/' + inicial.getFullYear() + ' A ' + $scope.meses[finalo.getMonth()].nombre.toUpperCase() + '/' + finalo.getFullYear()), 200, 120 + y, { width: 300, align: "center" });
                // } else if (!inicio_periodo && final_periodo) {
                //     doc.text($scope.meses[fecha_inicial_reporte.getMonth()].nombre.toUpperCase() + '/' + finalo.getFullYear(), 200, 120 + y, { width: 300, align: "center" });
                // } else {
                //     doc.text(reporte.reporte[0].fecha.split('T')[0].split('-').reverse().join('/') + ' A ' + reporte.reporte[reporte.reporte.length - 1].fecha.split('T')[0].split('-').reverse().join('/'), 200, 120 + y, { width: 300, align: "center" });
                // }
                doc.text(reporte.gerencia.nombre, 200, 120 + y, { width: 300, align: "center" });
                doc.text(periodo, 200, 140 + y, { width: 300, align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.text("Empleado", 124, 80 + y);
                doc.text(reporte.nombre.toUpperCase(), 300, 80 + y);
                doc.text(empresa, 300, 100 + y);
                doc.text("Empresa", 124, 100 + y);
                doc.text("Gerencia", 124, 120 + y);
                doc.text("Periodo", 124, 140 + y);
                doc.text("Fecha", 124, 160 + y);
                doc.text("DESAYUNO", 260, 160 + y);
                doc.text("ALMUERZO", 360, 160 + y);
                doc.text("CENA", 460, 160 + y);
                // doc.text("TOTAL GENERAL", 490, 140 + y);
                doc.rect(cubeX, 73 + y, 160, 20).stroke()
                doc.rect(cubeX, 93 + y, 160, 20).stroke()
                doc.rect(cubeX, 113 + y, 160, 20).stroke()
                doc.rect(cubeX, 133 + y, 160, 20).stroke()
                doc.rect(cubeX, 153 + y, 160, 20).stroke()
                doc.rect(cubeX + 160, 73 + y, 300, 20).stroke()
                doc.rect(cubeX + 160, 93 + y, 300, 20).stroke()
                doc.rect(cubeX + 160, 113 + y, 300, 20).stroke()
                doc.rect(cubeX + 160, 133 + y, 300, 20).stroke()

                doc.rect(cubeX + 160, 153 + y, 100, 20).stroke()
                doc.rect(cubeX + 260, 153 + y, 100, 20).stroke()
                doc.rect(cubeX + 360, 153 + y, 100, 20).stroke()
                // doc.rect(cubeX + 390, 133 + y, 110, 20).stroke()
                doc.font('Helvetica', 8);
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.reporteGeneralComensales = () => {
                var reporte = [];
                var tipoCambioDollar = 0
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    tipoCambioDollar = res.monedaCambio ? res.monedaCambio.dolar : 6.96
                    $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true)
                    $scope.paginator.filter = $scope.filtroComensales
                    var promGer = ObtenerGerencias($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                    promGer.then(function (res) {
                        $scope.listaGerenciasClienteEmpresa = res.lista
                        var promComidas = ObtenerComidas($scope.usuario.id_empresa, $scope.usuario.id, $scope.filtroComensales.empresaCliente ? $scope.filtroComensales.empresaCliente.id ? $scope.filtroComensales.empresaCliente.id : $scope.empresaExternaSeleccionada.id : $scope.empresaExternaSeleccionada.id)
                        promComidas.then(function (comidas) {
                            var comidasEmpresa = comidas.lista
                            var cabecera = []
                            comidasEmpresa.forEach(function (comida) {
                                cabecera.push(comida.nombre.toUpperCase())
                            })
                            cabecera.unshift('FECHA'.toUpperCase())
                            cabecera.push('Total general'.toUpperCase())
                            var listaComensales;
                            if ($scope.filtroComensales.comensal.length > 0) {
                                listaComensales = $scope.filtroComensales.comensal.map((comensal) => comensal.id)
                            } else {
                                listaComensales = []
                            }

                            $scope.filtroComensales.comensalesProcesados = listaComensales
                            var promHistorial = ObtenerReporteGeneralComensal($scope.usuario.id_empresa, $scope.paginator)
                            promHistorial.then(function (res) {
                                res.reporte.forEach(function (repo) {
                                    repo.historial.sort(function (a, b) {
                                        if (a.fecha > b.fecha) {
                                            return 1
                                        }
                                        if (b.fecha > a.fecha) {
                                            return -1
                                        }
                                        return 0
                                    })
                                })
                                $scope.filtroComensales = $scope.filtrarHistorial($scope.filtroComensales, true, true)
                                if (res.hasErr) {
                                    $scope.mostrarMensaje(res.mensaje)
                                    return
                                }
                                if (res.reporte.length === 0) {
                                    $scope.mostrarMensaje('No existen datos.')
                                    return
                                }

                                $scope.reportesParaExcel = res.reporte
                                $scope.imprimirReporteGeneralEXCEL($scope.reportesParaExcel, cabecera)
                                blockUI.stop();
                            })
                        })
                    })
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.imprimirReporteGeneralEXCEL = (reporte, cabecera) => {
                return $q((fullfil, reject) => {
                    const cabecera = ['TARJETA', 'EMPLEADO', 'EMPRESA', 'GERENCIA', 'COMIDA', 'FECHA / HORA', 'USUARIO', 'ESTADO']
                    const data = [cabecera]
                    for (let i = 0; i < reporte.length; i++) {
                        for (let index = 0; index < reporte[i].historial.length; index++) {
                            const columns = []
                            columns.push(reporte[i].historial[index].tarjeta)
                            columns.push(reporte[i].nombre)
                            columns.push(reporte[i].empresaCliente.razon_social)
                            columns.push(reporte[i].gerencia.nombre)
                            columns.push(reporte[i].historial[index].comida.nombre)
                            const fecha = new Date(reporte[i].historial[index].fecha)
                            const fecha_texto = ('0' + fecha.getHours()).slice(-2) + ':' + ('0' + fecha.getMinutes()).slice(-2) + ':' + ('0' + fecha.getSeconds()).slice(-2) + ' ' + ('0' + fecha.getDate()).slice(-2) + '/' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' + fecha.getFullYear()
                            columns.push(fecha_texto)
                            columns.push(reporte[i].historial[index].usuario.nombre_usuario)
                            const estado = (reporte[i].historial[index].estado ? 'Vigente' : 'Sin asignación')
                            columns.push(estado)
                            data.push(columns)
                        }
                    }
                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    // const wscols = [
                    //     { wch: 20 },
                    //     { wch: 19 },
                    //     { wch: 20 },
                    //     { wch: 16 },
                    //     { wch: 25 },
                    //     { wch: 15 },
                    //     { wch: 25 },
                    //     { wch: 25 },
                    //     { wch: 25 },
                    //     { wch: 8 },
                    //     { wch: 12 }
                    // ];
                    // ws['!cols'] = wscols;
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    fullfil(saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE GENERAL.xlsx"))
                })
            }

            $scope.abrirModalEdicionAlias = function () {
                $scope.clienteEmpresaAsignacionAlias = {}
                $scope.clienteEmpresaAsignacionAlias.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                $scope.clienteEmpresaEdicionGerencias
                $scope.obtenerAliasEmpresa()
                $scope.activeModal = 1
                $scope.abrirPopup($scope.modalEdicionAlias);
            }

            $scope.cerrarModalEdicionAlias = function () {
                $scope.activeModal = 0
                $scope.clienteEmpresaAsignacionAlias = {}
                // $scope.listaAliasclientesEmpresa = []
                $scope.cerrarPopup($scope.modalEdicionAlias);
            }

            $scope.abrirModalEdicionGerencias = function () {
                $scope.activeModal = 2
                $scope.clienteEmpresaEdicionGerencias = {}
                $scope.clienteEmpresaEdicionGerencias.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                $scope.obtenerGerencias()
                $scope.abrirPopup($scope.modalEdicionGerencias);
            }
            $scope.cerrarModalEdicionGerencias = function () {
                $scope.activeModal = 0
                $scope.clienteEmpresaEdicionGerencias = {}
                $scope.cerrarPopup($scope.modalEdicionGerencias);
            }

            $scope.obtenerAliasCliente = function (cliente) {
                var promTipo = ObtenerAlias($scope.usuario.id_empresa, $scope.usuario.id, cliente)
                promTipo.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                        $scope.clienteEmpresaEdicionComensales.tipo = null;
                    } else {
                        $scope.clienteEmpresaEdicionComensales.tipo = res.lista[0].nombre
                    }
                })
            }

            $scope.abrirModalEdicionComensales = function () {
                $scope.activeModal = 3
                $scope.clienteEmpresaEdicionComensales = {}
                $scope.clienteEmpresaEdicionComensales.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                $scope.clienteEmpresaEdicionComensales.tipo = $scope.obtenerAliasCliente($scope.clienteEmpresaEdicionComensales.empresaCliente.id)
                $scope.obtenerGerencias()
                $scope.obtenerComensales()
                $scope.abrirPopup($scope.modalEdicionComensales);
            }

            $scope.cerrarModalEdicionComensales = function () {
                $scope.activeModal = 0
                $scope.clienteEmpresaEdicionComensales = {}
                $scope.cerrarPopup($scope.modalEdicionComensales);
            }

            $scope.abrirModalEdicionComidas = function () {
                $scope.clienteEmpresaComidas = {}
                $scope.clienteEmpresaComidas.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                $scope.clienteEmpresaComidas.verTodos = false
                $scope.obtenerComidas()
                $scope.activeModal = 4
                $scope.abrirPopup($scope.modalEdicionComidas);
            }

            $scope.cerrarModalEdicionComidas = function () {
                $scope.clienteEmpresaComidas = {}
                $scope.activeModal = 0
                $scope.cerrarPopup($scope.modalEdicionComidas);
            }

            $scope.abrirModalEdicionPrecios = function () {
                $scope.clienteEmpresaPreciosComidas = {}
                $scope.clienteEmpresaPreciosComidas.empresaCliente = Object.assign({}, $scope.empresaExternaSeleccionada)
                $scope.activeModal = 5
                $scope.obtenerPrecioComidas()
                $scope.abrirPopup($scope.modalEdicionPrecios);
            }

            $scope.cerrarModalEdicionPrecios = function () {
                $scope.activeModal = 0
                $scope.clienteEmpresaPreciosComidas = {}
                $scope.cerrarPopup($scope.modalEdicionPrecios);
            }

            $scope.buscarCliente = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ClientesNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            }

            $scope.abrirdialogClientesComensales = function () {
                $scope.abrirPopup($scope.dialogClienteEmpresa);
            }

            $scope.cerrardialogClientesComensales = function () {
                //             $scope.activeModal = 0
                $scope.cerrarPopup($scope.dialogClienteEmpresa);
            }

            $scope.abrirdialogBusquedaComensales = function (edicion) {
                if (edicion) {
                    $scope.editarHistorial = true
                    $scope.abrirPopup($scope.busquedaComensalesEmpresa);
                } else {
                    $scope.activeModal = 0
                    $scope.abrirPopup($scope.busquedaComensalesEmpresa);
                }
            }

            $scope.abrirEdicionHistorial = function () {
                $scope.activeModal = 6
            }

            $scope.cerrardialogBusquedaComensales = function () {
                $scope.activeModal = 0
                if ($scope.editarHistorial) {
                    $scope.activeModal = 6
                }
                $scope.cerrarPopup($scope.busquedaComensalesEmpresa);
            }

            $scope.abrirdialogAlertaMarcaciones = function () {
                $scope.activeModal = 0
                $scope.obtenerAlertas()
                $scope.abrirPopup($scope.dialogAlertasMarcaciones);
            }

            $scope.cerrardialogAlertaMarcaciones = function () {
                $scope.activeModal = 0
                $scope.filtroMarcaciones = { desde: '', hasta: '', columna: 'fecha', direccion: 'asc', descartados: false }
                $scope.alertaMarcaciones = []
                $scope.cerrarPopup($scope.dialogAlertasMarcaciones);
            }

            $scope.abrirdialogHistorialDocumentos = function () {
                $scope.activeModal = 0
                $scope.obtenerHistorialDocumentos()
                $scope.abrirPopup($scope.dialogHistorialDocumentos);
            }

            $scope.cerrardialogHistorialDocumentos = function () {
                $scope.activeModal = 0
                $scope.historialesDocumentos = []
                $scope.cerrarPopup($scope.dialogHistorialDocumentos);
            }
            $scope.abrirModalEdicionHistorial = function () {
                $scope.abrirPopup($scope.modalEdicionHistorial);
            }
            $scope.cerrarModalEdicionHistorial = function () {
                $scope.activeModal = 0
                $scope.cerrarPopup($scope.modalEdicionHistorial);
            }


            $scope.abrirdialogClientesComensalesHuella = function () {
                $scope.buscarClienteComensales();
                $scope.abrirPopup($scope.dialogClienteEmpresaHuella);
            }
            $scope.buscarClienteComensales=function (texto) {
                var promesa =ListaClienteComensales($scope.usuario.id_empresa, texto)
                promesa.then(function (datos){
                    $scope.clientessEmpComensales= datos 
                })
            }

            $scope.cerrardialogClientesComensalesHuella = function () {
                //             $scope.activeModal = 0
                $scope.cerrarPopup($scope.dialogClienteEmpresaHuella);
            }

            $scope.generarExcelDatosComensalesGeneral =  function () {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar....',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerComensales($scope.usuario.id_empresa,0,0);
				promesa.then(function (datos) {
					var listaComensalesclienteEmpresa = datos.lista;
					/* var data = [["Codigo de nombre","Nombre de comensales", "Codigo gerencia","Nombre de Gerencia"]] */
                    var data = [["ID de usuario","Nombre", "Apellido","Número de tarejeta","No. departamento","Departamento","Género","Huellas v10", "Huellas v9", "Venas", "Rostros (Pull)" ]]
					if(datos.lista.length > 0){
						for (var i = 0; i < listaComensalesclienteEmpresa.length; i++) {
							var columns = [];
							columns.push(Number(listaComensalesclienteEmpresa[i].codigo));
							columns.push(listaComensalesclienteEmpresa[i].nombre );
                            columns.push("");
                            columns.push("");
                            columns.push(listaComensalesclienteEmpresa[i].gerencia? listaComensalesclienteEmpresa[i].gerencia.codigo: "");
                            columns.push(listaComensalesclienteEmpresa[i].gerencia? listaComensalesclienteEmpresa[i].gerencia.nombre: "");
                            columns.push("");
                            columns.push("0");
                            columns.push("0");
                            columns.push("0");
                            columns.push("0");
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Datos de Comensales Grl.xls");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No se encontraron Datos", "warning");
					}
				});
			}


            $scope.generarExcelDatosHuellas =  function (cliente) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar....',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerComensales($scope.usuario.id_empresa,0,cliente.id);
				promesa.then(function (datos) {
					var listaComensalesclienteEmpresa = datos.lista;
					/* var data = [["Codigo de nombre","Nombre de comensales", "Codigo gerencia","Nombre de Gerencia"]] */
                    var data = [["ID de usuario","Nombre", "Apellido","Número de tarejeta","No. departamento","Departamento","Género","Huellas v10", "Huellas v9", "Venas", "Rostros (Pull)" ]]
					if(datos.lista.length > 0){
						for (var i = 0; i < listaComensalesclienteEmpresa.length; i++) {
							var columns = [];
							columns.push(Number(listaComensalesclienteEmpresa[i].codigo));
							columns.push(listaComensalesclienteEmpresa[i].nombre );
                            columns.push("");
                            columns.push("");
                            columns.push(listaComensalesclienteEmpresa[i].gerencia? listaComensalesclienteEmpresa[i].gerencia.codigo: "");
                            columns.push(listaComensalesclienteEmpresa[i].gerencia? listaComensalesclienteEmpresa[i].gerencia.nombre: "");
                            columns.push("");
                            columns.push("0");
                            columns.push("0");
                            columns.push("0");
                            columns.push("0");
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Datos de Comensales "+cliente.razon_social+".xls");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No se encontraron Datos", "warning");
					}
				});
			}

            $scope.generarExcelDatosHuellasGerencia =  function (cliente) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar....',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerGerencias($scope.usuario.id_empresa,0,cliente.id);
				promesa.then(function (datos) {
					var listaGerenciasClienteEmpresa = datos.lista;
					// var data = [["Codigo de gerencia","Nombre de gerencia","Nombre de empresa"]]
                    var data = [["Número","Nombre","Departamento Superior"]]
					if(datos.lista.length > 0){
						for (var i = 0; i < listaGerenciasClienteEmpresa.length; i++) {
							var columns = [];
							columns.push(listaGerenciasClienteEmpresa[i].codigo);
                            columns.push(listaGerenciasClienteEmpresa[i].nombre);
                            columns.push(listaGerenciasClienteEmpresa[i].empresaCliente.razon_social);
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Departamento de gerencia de "+cliente.razon_social+".xls");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No se encontraron Datos", "warning");
					}
				});
			}







            



            $scope.inicio()
        }]);