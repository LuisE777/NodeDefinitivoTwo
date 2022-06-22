angular.module('agil.controladores')
	.controller('ControladorContabilidadCuenta', ['$scope', 'blockUI', '$localStorage',
		'$location', '$templateCache', '$window', 'CuentasPaginador', 'ContabilidadCuenta',
		'CuentasClasificaciones', 'ClasesTipo', 'lasClasificaciones', 'losSaldos', 'losMovimientos',
		'losTiposDeCuentas', 'lasOperacionesCalculos', 'CuentaContabilidad', 'Paginator', 'CuentasEmpresaCreacion',
		'ClientesNit', 'ProveedoresNit', '$timeout', 'Tipos', 'ConfiguracionCuentaEmpresa', 'ListaContabilidadCuentas', 'ListaCuentasComprobanteContabilidad', 'ConfiguracionCuentas',
		'CuentasClasificacionesEdicion', 'Diccionario', 'VistaColumnasAplicacion', 'FieldViewer', 'ValidarCodigoCuenta', 'ClaseTexto', 'ClasesTipoEmpresa', 'GuardarContabilidadConfiguracionGeneralTipoCuenta'
		, 'ObtenerContabilidadConfiguracionGeneralTipoCuenta', 'ObtenerConfiguracionesContablesComprobantes', 'GuardarConfiguracionesContablesComprobantes', 'ListaOpcionesIntegracionAplicacionEmpresa',
		'NuevoComprobante', 'ObtenerCuenta', 'LibroMayorGeneral', 'SweetAlert', 'ObtenerGestionesEEFF', 'ObtenerMayoresGlobal', 'ListaGruposProductoUsuario', 'BuscarCuentaContable', function ($scope, blockUI, $localStorage,
			$location, $templateCache, $window, CuentasPaginador, ContabilidadCuenta,
			CuentasClasificaciones, ClasesTipo, lasClasificaciones, losSaldos, losMovimientos,
			losTiposDeCuentas, lasOperacionesCalculos, CuentaContabilidad, Paginator, CuentasEmpresaCreacion,
			ClientesNit, ProveedoresNit, $timeout, Tipos, ConfiguracionCuentaEmpresa, ListaContabilidadCuentas, ListaCuentasComprobanteContabilidad, ConfiguracionCuentas,
			CuentasClasificacionesEdicion, Diccionario, VistaColumnasAplicacion, FieldViewer, ValidarCodigoCuenta, ClaseTexto, ClasesTipoEmpresa, GuardarContabilidadConfiguracionGeneralTipoCuenta,
			ObtenerContabilidadConfiguracionGeneralTipoCuenta, ObtenerConfiguracionesContablesComprobantes, GuardarConfiguracionesContablesComprobantes, ListaOpcionesIntegracionAplicacionEmpresa,
			NuevoComprobante, ObtenerCuenta, LibroMayorGeneral, SweetAlert, ObtenerGestionesEEFF, ObtenerMayoresGlobal, ListaGruposProductoUsuario, BuscarCuentaContable) {


			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.idModalWizardCuentaEdicion = "modal-wizard-cuenta-edicion"
			$scope.idModalWizardContainerCuentaEdicion = "modal-wizard-container-cuenta-edicion"
			$scope.idModalWizardCuentaVer = "modal-wizard-cuenta-ver"
			$scope.idModalWizardContainerCuentaVer = "modal-wizard-container-cuenta-ver"
			$scope.idModalWizardClasificacionNueva = "modal-wizard-agregar-clasificacion-cuenta"
			$scope.idModalWizardClasificacionVer = "modal-wizard-ver-clasificacion"
			$scope.idModalWizardContainerClasificacionNueva = "modal-wizard-container-agregar-clasificacion"
			$scope.idModalEliminarCuenta = "dialog-eliminar-cuenta"
			$scope.idModalWizardPlantillaIngreso = "modal-wizard-plantilla-ingreso";
			$scope.idModalWizardConceptoEdicion = 'modal-wizard-concepto-edicion';
			$scope.idModalWizardClasificacionEdicion = 'modal-wizard-clasificacion-edicion';
			$scope.idModalWizardConfiguracionCuenta = "modal-wizard-configuracion-cuentas";
			$scope.idModalConfiguracionContableComprobante = 'dialog-configuracion-contable-comprobante';
			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsContabilidadCuentas($scope.idModalWizardCuentaEdicion,
					$scope.idModalWizardContainerCuentaEdicion,
					$scope.idModalWizardClasificacionNueva,
					$scope.idModalWizardContainerClasificacionNueva,
					$scope.idModalWizardClasificacionVer,
					$scope.idModalWizardCuentaVer,
					$scope.idModalWizardContainerCuentaVer,
					$scope.idModalEliminarCuenta,
					$scope.idModalWizardPlantillaIngreso,
					$scope.idModalWizardConceptoEdicion,
					$scope.idModalWizardClasificacionEdicion,
					$scope.idModalWizardConfiguracionCuenta,
					$scope.idModalConfiguracionContableComprobante
				);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion();
				blockUI.stop();
			});

			$scope.inicio = function () {
				$scope.obtenerCuentas();
				$scope.obtenerConfiguracionTipoCuentas()
				$scope.obtenerTiposCuenta();
				$scope.obtenerTiposCuentasAuxilires()
				$scope.obtenerClasificacionCuenta();
				$scope.obtenerClasificacionSaldos();
				$scope.obtenerClasificacionTipos()
				$scope.obtenerClasificacionMovimientos();
				$scope.obtenerOperacionesCalculo();
				//$scope.obtenerTotalesGeneral()/ ya no es nesesaario desde 16/9/2021
				$scope.listaOpcionesIntegracionAplicacionEmpresa()
				$scope.obtenerTiposMovimiento()
				$scope.obtenerConfiguracionCuentaConcepto()
				$scope.obtenerGruposProductosEmpresaUsuario()
				$scope.obtenerTiposPersonales();
				$scope.dynamicPopoverMovAuxiliares = {
					templateUrl: 'myPopoverMovAuxiliares.html',
				};
				$scope.dynamicPopoverMovCentrosCostos = {
					templateUrl: 'myPopoverTemplateMovCentrosCostos.html',
				};
				$scope.sucursalesUsuario = "";
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					$scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
					if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
						$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
					}
				}
				$scope.listarCampos();
			}


			$scope.obtenerTiposPersonales = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RRHH_TP", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposPersonales = entidad
					blockUI.stop();
				});
			}
			$scope.agregarTipoCuenta = function () {

				blockUI.start();
				var promesa = ClasesTipoEmpresa("TCC", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tipo = entidad;
					blockUI.stop();
				});
				$scope.abrirPopup($scope.idModalWizardConceptoEdicion);
			}

			$scope.obtenerColumnasAplicacion = function () {
				$scope.fieldViewer = FieldViewer({
					crear: true,
					id_empresa: $scope.usuario.id_empresa,
					configuracion: {
						codigo: { value: "Codigo", show: true },
						nombre: { value: "Nombre", show: true },
						debe: { value: "Debe", show: true },
						haber: { value: "Haber", show: true },
						saldo: { value: "Saldo", show: true },
						clasificacion: { value: "Clasificacion", show: true },
						tipo_cuenta: { value: "Tipo Cuenta", show: true }
					}
				}, $scope.aplicacion.aplicacion.id);
				$scope.fieldViewer.updateObject();
			}

			$scope.adicionarTipoCuenta = function (clase) {
				if (clase.nombre && clase.nombre_corto) {
					if (!clase.id) {
						$scope.tipo.clases.push(clase);
					}
					$scope.clase = {}
				}
			}

			$scope.adicionarClasificacionCuenta = function (clasificacion) {
				if (clasificacion.nombre && clasificacion.saldo.id && clasificacion.movimiento.id) {
					if (!clasificacion.id) {
						$scope.cuentaClasificaciones.push(clasificacion);
					}
					$scope.clasificacionEdicion = {}
				}
			}

			$scope.modificarClasificacionEdicionCuenta = function (clasificacion) {
				$scope.clasificacionEdicion = clasificacion;
			}

			$scope.guardarTipoCuenta = function (valido, tipo) {
				if (valido) {
					blockUI.start();
					Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
						blockUI.stop();
						$scope.cerrarPopPupTipoCuenta();
						$scope.mostrarMensaje('Guardado Exitosamente!');
						$scope.obtenerTiposCuenta();
					});
				}
			}

			$scope.guardarClasificacionCuenta = function (valido, clasificaciones) {
				if (valido) {
					blockUI.start();
					CuentasClasificacionesEdicion.update({ id_empresa: $scope.usuario.id_empresa }, clasificaciones, function (res) {
						blockUI.stop();
						$scope.cerrarPopPupCalsificacionEdicionCuenta();
						$scope.mostrarMensaje('Guardado Exitosamente!');
						$scope.obtenerClasificacionCuenta();
					});
				}
			}

			$scope.modificarTipoCuenta = function (clase) {
				$scope.clase = clase;
			}

			$scope.removerTipoCuenta = function (clase) {
				clase.eliminado = true;
			}

			$scope.removerClasificacionCuenta = function (clasificacion) {
				clasificacion.eliminado = true;
			}

			$scope.cerrarPopPupTipoCuenta = function () {
				$scope.cerrarPopup($scope.idModalWizardConceptoEdicion);
			}

			$scope.cerrarPopPupCalsificacionEdicionCuenta = function () {
				$scope.cerrarPopup($scope.idModalWizardClasificacionEdicion);
			}


			$scope.guardarPlantillaIngreso = function (form, plantilla) {
				ConfiguracionCuentas.update({ id_empresa: $scope.usuario.id_empresa }, $scope.configuracionesPlanillaPlanCuenta, function (dato) {
					$scope.mostrarMensaje(dato.menssage)
					$scope.cerrarPlantillaIngreso()
				})
				/* $scope.visible.verPlantillaIngreso = true
				$scope.visible.verPlantillaEgreso = true
				$scope.visible.verPlantillarRetencionBien = true
				$scope.visible.verPlantillarRetencionBienGasto = true
				if (!plantilla.ingreso.ivadf.cuenta || !plantilla.ingreso.ivadf.cuenta.id) {
					$scope.visible.verPlantillaIngreso = true
					$scope.errorIvadf = "sdf"
					if (form.asignarCuentaIvaDf) {
						form.asignarCuentaIvaDf.$error.cuenta = false;
					}
				} else {
					$scope.verPlantillaIngreso = false
					$scope.errorIvadf = null
					if (form.asignarCuentaIvaDf) {
						form.asignarCuentaIvaDf.$error.cuenta = false;
					}
				}
				if (!plantilla.ingreso.it.cuenta || !plantilla.ingreso.it.cuenta.id) {
					$scope.visible.verPlantillaIngreso = true
					$scope.errorIT = "sdf"
					if (form.asignarCuentaIt) {
						form.asignarCuentaIt.$error.cuenta = false;
					}
				} else {
					$scope.verPlantillaIngreso = false
					$scope.errorIT = null
					if (form.asignarCuentaIt) {
						form.asignarCuentaIt.$error.cuenta = false;
					}
				}

				if (!plantilla.ingreso.itPorPagar.cuenta || !plantilla.ingreso.itPorPagar.cuenta.id) {
					$scope.visible.verPlantillaIngreso = true
					$scope.errorItPorPagar = "sdf"
					if (form.asignarCuentaItPorPagar) {
						form.asignarCuentaItPorPagar.$error.cuenta = false;
					}
				} else {
					$scope.verPlantillaIngreso = false
					$scope.errorItPorPagar = null
					if (form.asignarCuentaItPorPagar) {
						form.asignarCuentaItPorPagar.$error.cuenta = false;
					}
				}
				if (!plantilla.ingreso.cajaBanco.cuenta || !plantilla.ingreso.cajaBanco.cuenta.id) {
					$scope.visible.verPlantillaIngreso = true
					$scope.errorIngresoCaja = "sdf"
					if (form.asignarCuentaIngresoCaja) {
						form.asignarCuentaIngresoCaja.$error.cuenta = false;
					}
				} else {
					$scope.verPlantillaIngreso = false
					$scope.errorIngresoCaja = null
					if (form.asignarCuentaIngresoCaja) {
						form.asignarCuentaIngresoCaja.$error.cuenta = false;
					}
				}
				if (!plantilla.egreso.ivacf.cuenta || !plantilla.egreso.ivacf.cuenta.id) {
					$scope.visible.verPlantillaEgreso = true
					$scope.errorIvacf = "sdf"
					if (form.asignarCuentaIvaCf) {
						form.asignarCuentaIvaCf.$error.cuenta = false;
					}


				} else {
					$scope.verPlantillaEgreso = false
					$scope.errorIvacf = null
					if (form.asignarCuentaIvaCf) {
						form.asignarCuentaIvaCf.$error.cuenta = false;
					}
				}
				if (!plantilla.egreso.cajaBanco.cuenta || !plantilla.egreso.cajaBanco.cuenta.id) {
					$scope.visible.verPlantillaEgreso = true
					$scope.errorEgresoCaja = "sdf"
					if (form.asignarCuentaEgresoCaja) {
						form.asignarCuentaEgresoCaja.$error.cuenta = false;
					}
				} else {
					$scope.verPlantillaEgreso = false
					$scope.errorEgresoCaja = null
					if (form.asignarCuentaEgresoCaja) {
						form.asignarCuentaEgresoCaja.$error.cuenta = false;
					}
				}
				if ($scope.usuario.empresa.usar_funciones_erp) {
					if (!plantilla.retencionBienes.almacen.cuenta || !plantilla.retencionBienes.almacen.cuenta.id) {
						$scope.visible.verPlantillarRetencionBien = true
						$scope.errorEgresoBienAlmacen = "sdf"
						if (form.asignarAlmacenBienes) {
							form.asignarAlmacenBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBien = false
						$scope.errorEgresoBienAlmacen = null
						if (form.asignarAlmacenBienes) {
							form.asignarAlmacenBienes.$error.cuenta = false;
						}
					}
					if (!plantilla.retencionBienes.it.cuenta || !plantilla.retencionBienes.it.cuenta.id) {
						$scope.visible.verPlantillarRetencionBien = true
						$scope.errorEgresoBienIt = "sdf"
						if (form.asignarItBienes) {
							form.asignarItBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBien = false
						$scope.errorEgresoBienIt = null
						if (form.asignarItBienes) {
							form.asignarItBienes.$error.cuenta = false;
						}
					}
					if (!plantilla.retencionBienes.iue.cuenta || !plantilla.retencionBienes.iue.cuenta.id) {
						$scope.visible.verPlantillarRetencionBien = true
						$scope.errorEgresoBienIue = "sdf"
						if (form.asignarIueBienes) {
							form.asignarIueBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBien = false
						$scope.errorEgresoBienIue = null
						if (form.asignarIueBienes) {
							form.asignarIueBienes.$error.cuenta = false;
						}
					}
					if (!plantilla.retencionBienesGasto.gasto.cuenta || !plantilla.retencionBienesGasto.gasto.cuenta.id) {
						$scope.visible.verPlantillarRetencionBienGasto = true
						$scope.errorEgresoBienGasto = "sdf"
						if (form.asignarGastoBienes) {
							form.asignarGastoBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBienGasto = false
						$scope.errorEgresoBienGasto = null
						if (form.asignarGastoBienes) {
							form.asignarGastoBienes.$error.cuenta = false;
						}
					}
					if (!plantilla.retencionBienesGasto.it.cuenta || !plantilla.retencionBienesGasto.it.cuenta.id) {
						$scope.visible.verPlantillarRetencionBienGasto = true
						$scope.errorEgresoBienGastoIt = "sdf"
						if (form.asignarGastoItBienes) {
							form.asignarGastoItBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBienGasto = false
						$scope.errorEgresoBienGastoIt = null
						if (form.asignarGastoItBienes) {
							form.asignarGastoItBienes.$error.cuenta = false;
						}
					}
					if (!plantilla.retencionBienesGasto.iue.cuenta || !plantilla.retencionBienesGasto.iue.cuenta.id) {
						$scope.visible.verPlantillarRetencionBienGasto = true
						$scope.errorEgresoBienGastoIue = "sdf"
						if (form.asignarGastoIueBienes) {
							form.asignarGastoIueBienes.$error.cuenta = false;
						}
					} else {
						$scope.verPlantillarRetencionBienGasto = false
						$scope.errorEgresoBienGastoIue = null
						if (form.asignarGastoIueBienes) {
							form.asignarGastoIueBienes.$error.cuenta = false;
						}
					}
				} else {
					$scope.errorEgresoBienAlmacen = null
					$scope.errorEgresoBienIt = null
					$scope.errorEgresoBienIue = null
					$scope.errorEgresoBienGasto = null
					$scope.errorEgresoBienGastoIt = null
					$scope.errorEgresoBienGastoIue = null
				} */
				/* if ($scope.errorEgresoBienGasto == null &&
					$scope.errorEgresoBienGastoIt == null &&
					$scope.errorEgresoBienGastoIue == null && $scope.errorEgresoBienIue == null && $scope.errorEgresoBienIt == null && $scope.errorEgresoBienAlmacen == null && $scope.errorIvacf == null && $scope.errorEgresoCaja == null && $scope.errorIvadf == null && $scope.errorIT == null && $scope.errorItPorPagar == null) {
					plantilla.usar_funciones_erp = $scope.usuario.empresa.usar_funciones_erp
					ConfiguracionCuentas.update({ id_empresa: $scope.usuario.id_empresa }, plantilla, function (dato) {
						$scope.mostrarMensaje(dato.menssage)
						$scope.cerrarPlantillaIngreso()
					})
				} */

			}
			$scope.BuscarOcrearPlantillaIngreso = function () {

				$scope.plantilla = { retencionServicios: { it: {}, iue: {}, servicio: {} }, retencionBienesGasto: { it: {}, iue: {}, gasto: {} }, retencionBienes: { it: {}, iue: {}, almacen: {} }, egreso: { ivacf: {}, cajaBanco: {} }, ingreso: { ivadf: {}, it: {}, itPorPagar: {}, cajaBanco: {} } }
				var promesa = ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					console.log(entidad.lista)
					$scope.configuracionesPlanillaPlanCuenta = entidad.lista


					blockUI.stop();
				});
			}
			$scope.buscarCuentas = function (query) {
				if (query != "" && query != undefined) {
					// console.log(query)
					var promesa = ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, query);
					console.log(promesa)
					return promesa;
				}
			}
			$scope.buscarCuentaVinculanteLc = async function (query) {
				if (query != "" && query != undefined) {
					promesa = ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, query);
					promesa.then(function (data) {
						if (data.length == 1) {
							$scope.cuentaVinculante_lc = data[0];
						} else {
							$scope.cuentaVinculante_lc = undefined
						}
					})
				}
			}
			$scope.obtenerConfigCuentas = function () {
				var promesa = ListaContabilidadCuentas($scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.ListaCuentas = entidad;
					console.log($scope.ListaCuentas)
					blockUI.stop();
				});
			}
			$scope.updateFiltro = function (filtro) {
				$scope.filtro = filtro
			}
			$scope.abrirPlantillaIngreso = function () {
				$scope.visible = {}
				$scope.visible.verPlantillaIngreso = true
				$scope.visible.verPlantillaEgreso = true
				$scope.visible.verPlantillarRetencionBien = true
				$scope.visible.verPlantillarRetencionBienGasto = true
				$scope.visible.verPlantillarRetencionServicio = true
				$scope.BuscarOcrearPlantillaIngreso();
				$scope.id_conf_planilla = $scope.tipoConfPlanilla.clases.find(function (x) {
					return x.nombre_corto == "INGRESOS"
				})
				$scope.id_conf_planilla = $scope.id_conf_planilla.id
				$scope.obtenerConfigCuentas()

				$scope.abrirPopup($scope.idModalWizardPlantillaIngreso);
			}
			$scope.cerrarPlantillaIngreso = function () {
				$scope.cerrarPopup($scope.idModalWizardPlantillaIngreso);
			}
			$scope.agregarClasificacionCuenta = function () {
				$scope.clasificacion = new CuentasClasificaciones({ saldo: {}, movimiento: {} })
				$scope.abrirPopup($scope.idModalWizardClasificacionNueva);
			}

			$scope.modificarClasificacionCuenta = function (clasificacion) {
				$scope.clasificacion = clasificacion
				$scope.abrirPopup($scope.idModalWizardClasificacionNueva);
			}

			$scope.guardarClasificacion = function (valido, clasificacion) {
				if (valido) {
					$scope.ocultarMensajesValidacion();
					// var tiempoActual = new Date();
					// cotizacion.fecha = new Date($scope.convertirFecha(cotizacion.fechaTexto));
					blockUI.start();
					if (clasificacion.id) {
						CuentasClasificaciones.update({ id: clasificacion.id }, clasificacion, function (res) {
							blockUI.stop();
							$scope.cerrarPopPupAgregarClasificacion();
							$scope.obtenerClasificacionCuenta();
							$scope.mostrarMensaje('Actualizado exitosamente!');
						});
					} else {
						clasificacion.id_empresa = $scope.usuario.id_empresa
						clasificacion.$save(function (res) {
							blockUI.stop();
							$scope.mostrarMensaje('Clasificacion registrada exitosamente!', res);
							$scope.cerrarPopPupAgregarClasificacion();
							$scope.obtenerClasificacionCuenta();
						}, function (error) {
							blockUI.stop();
							$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
							$scope.obtenerClasificacionCuenta();
						});
					}
				}
			}

			$scope.mostrarConfirmacionEliminacion = function (cuenta) {
				$scope.cuenta = new ContabilidadCuenta({
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, tipoCuenta: {}, clasificacion: {}, eliminado: false, bimonetaria: false, aplicar_calculo: false
				});
				$scope.cuenta = cuenta
				SweetAlert.swal({
					title: "Esta seguro?",
					text: "Esta seguro de eliminar la cuenta seleccionada!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si',
					cancelButtonText: "No"
				}).then(function (result) {
					if (result.value) {
						$scope.eliminarCuenta(cuenta);
					}
				});
			}

			$scope.cerrarPopPupConfirmacionEliminacion = function () {
				$scope.cerrarPopup($scope.idModalEliminarCuenta);
			}

			$scope.eliminarCuenta = function (cuenta) {
				// console.log(cuenta)
				$scope.cuenta = angular.copy(cuenta);
				$scope.cuenta.eliminado = true
				blockUI.noOpen = true;
				ContabilidadCuenta.update({ id: cuenta.id, eliminado: true }, $scope.cuenta, function (res) {
					$scope.cerrarPopPupConfirmacionEliminacion();
					if (!res.hasError) {
						cuenta.eliminado = true
						SweetAlert.swal("Eliminado!", res.mensaje, "success");
						$scope.recargarItemsTabla();
					} else {
						SweetAlert.swal("No se pudo eliminar", res.mensaje, "warning");
					}

				}, function (error) {
					SweetAlert.swal("", 'Ocurrio un problema al momento de guardar!', "error");
					$scope.recargarItemsTabla();
				});

			}

			$scope.crearNuevaCuenta = function (i) {
				$scope.cuenta = new ContabilidadCuenta({
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, tipoCuenta: {},
					clasificacion: {},
					eliminado: false, 
					bimonetaria: false, 
					especifica_texto1: "",
					especifica_texto2: "",
					especifica_texto3: "",
					
				});
				if( i >= 0){
					if( $scope.Cuentas[i].tipoCuenta.nombre_corto != 4 ){
						$scope.cuenta.cuentaPadre = $scope.Cuentas[i]
						$scope.cuenta.clasificacion = $scope.Cuentas[i].clasificacion
						let sn = +$scope.Cuentas[i].tipoCuenta.nombre_corto
						sn++;
						let tipo = $scope.cuentaTipos.find(e => e.nombre_corto == sn)
						$scope.cuenta.tipoCuenta = tipo
					}
				}

				var fechaActual = new Date();
				$scope.cuenta.fechaTexto = fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear();
				$scope.abrirPopup($scope.idModalWizardCuentaEdicion);
			}
			$scope.optenerCfDf = function (tipo, activo) {

				if (activo) {
					if (tipo) {
						var promesa = ClaseTexto("CF_TEXTO_1")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto1 = dato.clase

						})

						var promesa = ClaseTexto("CF_TEXTO_2")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto2 = dato.clase

						})
						var promesa = ClaseTexto("CF_TEXTO_3")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto3 = dato.clase

						})
					} else {
						var promesa = ClaseTexto("DF_TEXTO_1")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto1 = dato.clase

						})
						var promesa = ClaseTexto("DF_TEXTO_2")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto2 = dato.clase

						})
						var promesa = ClaseTexto("DF_TEXTO_3")
						promesa.then(function (dato) {
							$scope.cuenta.especifica_texto3 = dato.clase

						})
					}
				} else {
					$scope.cuenta.tipo_especifica = false
					$scope.cuenta.especifica_texto1 = ""
					$scope.cuenta.especifica_texto2 = ""
					$scope.cuenta.especifica_texto3 = ""
				}
			}
			$scope.modificarCuenta = async function (cuenta) {
				if (cuenta.id_tipo_personal) {
					cuenta.tipoPersonal = $scope.tiposPersonales.clases.find(x => x.id == cuenta.id_tipo_personal)
				}
				if (!!cuenta.id_cuenta_depreciacion) {
					let dep = await ObtenerCuenta(cuenta.id_cuenta_depreciacion, $scope.usuario.empresa.id);

					$scope.cuenta.id_cuenta_depreciacion = dep;
				}
				$scope.cuenta = cuenta;
				if (cuenta.especifica) {
					$scope.optenerCfDf(cuenta.tipo_especifica, cuenta.especifica)
				}
				if ($scope.cuenta.cuenta_vinculada_lc) {
					$scope.buscarCuentaVinculanteLc($scope.cuenta.cuenta_vinculada_lc)
				}
				if ($scope.cuenta.id_almacen_lc) {
					$scope.buscarSucursalYAlmacen()
				}

				if ($scope.cuenta.gruposCuenta.length > 0) {
					$scope.cuenta.grupos = []
					for (const grp of $scope.cuenta.gruposCuenta) {

						let grupo = $scope.gruposProducto.find(x => x.id == grp.id_grupo)
						$scope.cuenta.grupos.push(grupo)
					}
				}
				if ($scope.cuenta.camposCuenta.length > 0) {
					$scope.cuenta.campos = []
					for (const camp of $scope.cuenta.camposCuenta) {

						let campo = $scope.camposEmpresa.find(x => x.id == camp.id_campo)
						$scope.cuenta.campos.push(campo)
					}
				}
				$scope.abrirPopup($scope.idModalWizardCuentaEdicion);
			}
			$scope.buscarSucursalYAlmacen = function () {
				let almacen = undefined
				for (const suc of $scope.sucursales) {
					almacen = suc.almacenes.find(function (x) {
						return x.id == $scope.cuenta.id_almacen_lc
					})
					if (almacen) {
						$scope.sucursalLc = suc.id
						$scope.obtenerAlmacenes($scope.sucursalLc)
					}
				}
			}
			$scope.modificarClasificacionesCuenta = function () {
				$scope.abrirPopup($scope.idModalWizardClasificacionEdicion);
			}

			$scope.verCuenta = function (cuenta) {
				$scope.cuenta = cuenta
				$scope.abrirPopup($scope.idModalWizardCuentaVer);
			}
			$scope.validarCodigoCuenta = function (CodigoCuenta) {
				var codigo = CodigoCuenta;
				if (codigo != '') {
					$timeout(function () {
						$scope.validar = new ValidarCodigoCuenta({ id_empresa: $scope.usuario.id_empresa });

						$scope.validar.codigo = CodigoCuenta;

						$scope.validar.$save(function (data) {
							$scope.data = data;
						})
					}, 1500);
				}
			};
			$scope.guardarCuenta = function (valido, cuenta) {
				if (valido) {
					cuenta.usar_ceros_delante = $scope.usuario.empresa.usar_ceros_plan_cuenta
					var button = $('#siguienteCuenta').text().trim();
					if (button != "Siguiente") {
						cuenta.id_cuenta_depreciacion ? (cuenta.id_cuenta_depreciacion = cuenta.id_cuenta_depreciacion.id) : (cuenta.id_cuenta_depreciacion = null);
						blockUI.start();
						if (cuenta.id) {
							ContabilidadCuenta.update({ id: cuenta.id }, cuenta, function (res) {
								blockUI.stop();
								$scope.cerrarPopPupEdicion();
								$scope.mostrarMensaje('Actualizado exitosamente!');
							});
						} else {
							cuenta.$save(function (res) {
								blockUI.stop();
								$scope.mostrarMensaje('Cuenta registrada exitosamente!', res);
								$scope.cerrarPopPupEdicion();
								$scope.recargarItemsTabla();

							}, function (error) {
								blockUI.stop();
								$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
								$scope.recargarItemsTabla();
							});
						}
					}
				}
			}

			$scope.obtenerCuentas = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "codigo";
				$scope.paginator.callBack = $scope.obtenerLista;

				$scope.filtro = { empresa: $scope.usuario.id_empresa, clasificacion: "", tipo_cuenta: "", monto: "" };
				$scope.paginator.getSearch("", $scope.filtro, null);
			}

			$scope.cerrarPopPupCuentaVer = function () {
				$scope.cerrarPopup($scope.idModalWizardCuentaVer);
			}

			$scope.cerrarPopPupEdicion = function () {
				$scope.cerrarPopup($scope.idModalWizardCuentaEdicion);
			}

			$scope.cerrarPopPupVerClasificacion = function () {
				$scope.cerrarPopup($scope.idModalWizardClasificacionVer);
			}

			$scope.cerrarPopPupAgregarClasificacion = function () {
				$scope.cerrarPopup($scope.idModalWizardClasificacionNueva);
			}

			$scope.obtenerClasificacionCuenta = function () {
				blockUI.start();
				// var promesa = ClasesTipo("SCC");
				var promesa = lasClasificaciones($scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					//$scope.cuentaClasificaciones=[{id:0,nombre:"TODOS"}]
					$scope.cuentaClasificaciones = entidad.clasificaciones;
					blockUI.stop();
				});
			}

			$scope.obtenerClasificacionSaldos = function () {
				blockUI.start();
				var promesa = ClasesTipo("CONTCLSSAL");
				// console.log(promesa)
				promesa.then(function (entidad) {
					$scope.cuentaSaldos = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerClasificacionTipos = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("TIPOS_CLAS_CUENTA", $scope.usuario.id_empresa);
				// console.log(promesa)
				promesa.then(function (entidad) {
					$scope.tiposClasificaciones = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerClasificacionMovimientos = function () {
				blockUI.start();
				var promesa = ClasesTipo("CONTCLSMOV");
				// console.log(promesa)
				promesa.then(function (entidad) {
					$scope.cuentaMovimientos = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.obtenerTiposCuenta = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("TCC", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.cuentaTipos = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.obtenerTiposCuentasAuxilires = function () {
				blockUI.start();
				var promesa = ClasesTipo("AUXCU");
				// var promesa = lasOperacionesCalculos();
				promesa.then(function (entidad) {
					$scope.tiposCuentasAuxiliares = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerOperacionesCalculo = function () {
				blockUI.start();
				var promesa = ClasesTipo("OPE");
				// var promesa = lasOperacionesCalculos();
				promesa.then(function (entidad) {
					// console.log(entidad)
					$scope.operacionesCalculo = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.obtenerLista = function () {
				blockUI.start();
				$scope.sumaTotales = { debe: 0, haber: 0, saldo: 0 }
				$scope.sumaTotalesGenerales = { debe: 0, haber: 0, saldo: 0 }
				var promesa = CuentaContabilidad($scope.paginator);
				promesa.then(function (dato) {
					$scope.paginator.setPages(dato.paginas);
					dato.cuentas.forEach(function (cuenta, index, array) {
						$scope.sumaTotales.debe += cuenta.debe
						$scope.sumaTotales.haber += cuenta.haber
						$scope.sumaTotales.saldo += cuenta.saldo

					});
					$scope.sumaTotalesGenerales.debe = dato.cuentasTotalGenera.debe
					$scope.sumaTotalesGenerales.haber = dato.cuentasTotalGenera.haber
					$scope.sumaTotalesGenerales.saldo = dato.cuentasTotalGenera.saldo
					blockUI.stop();
					$scope.Cuentas = dato.cuentas;

				})

			}
			/* $scope.obtenerTotalesGeneral = function () {
				$scope.sumaTotalesGenerales = { debe: 0, haber: 0, saldo: 0 }
				var paginator = {
					filter: {
						empresa: $scope.usuario.id_empresa,
						clasificacion: 0,
						tipo_cuenta: 0,
						monto: 0,
					},
					currentPage: 1,
					itemsPerPage: 0,
					search: 0,
					column: "codigo",
					direction: "asc"
				}
				var promesa2 = CuentaContabilidad(paginator);
				promesa2.then(function (dato) {
					dato.cuentas.forEach(function (cuenta, index, array) {
						$scope.sumaTotalesGenerales.debe += cuenta.debe
						$scope.sumaTotalesGenerales.haber += cuenta.haber
						$scope.sumaTotalesGenerales.saldo += cuenta.saldo
						blockUI.stop();
					});

				})
			} */
			$scope.subirExcelCuentas = function (event) {
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
						var cuentas = [];
						do {
							var cuenta = { clasificacion: {}, tipoCuenta: {} };
							cuenta.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							cuenta.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							cuenta.descripcion = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							let clasificacionNnombre = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							cuenta.clasificacion = $scope.cuentaClasificaciones.find(function (x) {
								return x.nombre.toUpperCase() == clasificacionNnombre.toUpperCase()
							})
							if (!cuenta.clasificacion) {
								blockUI.stop();
								return $scope.mostrarMensaje("no existe el tipo de clasificiacion con el nombre : " + clasificacionNnombre)

							}
							cuenta.tipoCuenta.nombre = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							cuenta.debe = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? parseFloat(worksheet['F' + row].v.toString()) : null;
							cuenta.haber = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? parseFloat(worksheet['G' + row].v.toString()) : null;
							cuenta.saldo = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : null;
							cuenta.bimonetaria = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
							cuenta.no_monetaria = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
							if (cuenta.bimonetaria.toUpperCase() != "SI") {
								cuenta.bimonetaria = 0;
							} else {
								cuenta.bimonetaria = 1;
							}
							if (cuenta.no_monetaria.toUpperCase() != "SI") {
								cuenta.no_monetaria = 0;
							} else {
								cuenta.no_monetaria = 1;
							}
							cuentas.push(cuenta);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarCuentas(cuentas);
						console.log(cuentas)
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}
			$scope.guardarCuentas = function (cuentas) {
				var cuentasEmpresa = new CuentasEmpresaCreacion({ usar_ceros_delante: $scope.usuario.empresa.usar_ceros_plan_cuenta, cuentas: cuentas, id_empresa: $scope.usuario.id_empresa });
				cuentasEmpresa.$save(function (cuenta) {
					blockUI.stop();
					$scope.mostrarMensaje('Guardado Exitosamente!');
					$scope.recargarItemsTabla();
				}, function (error) {
					blockUI.stop();
					$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
					$scope.recargarItemsTabla();
				});
			}
			//completar razon social provedor y cliente
			$scope.establecerCliente = function (cliente) {
				$scope.cuenta.cliente = cliente;

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
			$scope.buscarCliente = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ClientesNit($scope.usuario.id_empresa, query);
					return promesa;
				}
			};

			$scope.establecerProveedor = function (proveedor) {
				$scope.cuenta.proveedor = proveedor;
			}
			$scope.buscarProveedor = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
					return promesa;
				}
			};
			$scope.abrirPopPupConfiguracionCuenta = function () {
				$scope.obtenerConfiguracionTipoCuentas()
				$scope.configuracionTipoCuenta = {}
				$scope.dynamicPopoverCargos = {
					templateUrl: 'myPopoverTemplate.html',
				};
				$scope.abrirPopup($scope.idModalWizardConfiguracionCuenta);
			}

			$scope.cerrarPopPupConfiguracionCuenta = function () {
				$scope.cerrarPopup($scope.idModalWizardConfiguracionCuenta);
			}

			$scope.agregarCofiguracionTipoCuenta = function (configuracion) {
				if (configuracion.edit) {
					$scope.configuracionTipoCuenta = {}
				} else {
					if (configuracion.digitos && configuracion.tipoCuenta) {
						if ($scope.configuracionesGeneralesTipoCuentas.length > 0) {
							if ($scope.configuracionesGeneralesTipoCuentas.some(function (config) {
								if (config.tipoCuenta.nombre == configuracion.tipoCuenta.nombre) {
									return true
								} else {
									return false
								}
							})) {
								$scope.mostrarMensaje("la cuenta ya se encuentra en la lista")
							} else {
								$scope.configuracionesGeneralesTipoCuentas.push(configuracion)
								$scope.configuracionTipoCuenta = {}

							}
						} else {
							$scope.configuracionesGeneralesTipoCuentas.push(configuracion)
							$scope.configuracionTipoCuenta = {}
						}
					}
				}
			}
			$scope.modificarConfiguracionTipoCuenta = function (config) {
				$scope.configuracionTipoCuenta = config
				$scope.configuracionTipoCuenta.edit = true
			}
			$scope.guardarConfiguracionTiposCuentas = function () {
				var promesa = GuardarContabilidadConfiguracionGeneralTipoCuenta($scope.usuario.id_empresa, $scope.configuracionesGeneralesTipoCuentas)
				promesa.then(function (dato) {
					$scope.mostrarMensaje(dato.mensaje)
					$scope.cerrarPopPupConfiguracionCuenta()
				})
			}
			$scope.obtenerConfiguracionTipoCuentas = function () {
				var promesa = ObtenerContabilidadConfiguracionGeneralTipoCuenta($scope.usuario.id_empresa)
				promesa.then(function (dato) {
					$scope.configuracionesGeneralesTipoCuentas = dato
				})
			}

			$scope.generarExcelPlanCuentas = function () {
				var paginator = {
					filter: {
						empresa: $scope.usuario.id_empresa,
						clasificacion: 0,
						tipo_cuenta: 0,
						monto: 0,

					},
					currentPage: 1,
					itemsPerPage: "0",
					search: 0,
					column: "codigo",
					direction: "asc"
				}
				var promesa = CuentaContabilidad(paginator);
				promesa.then(function (dato) {
					var data = [["Código", "Nombre", 'Descripción', "Clasificación", "Tipo Cta", 'Debe', "Haber", "Saldo", "Bimonetaria"]]
					var totalCosto = 0;
					for (var i = 0; i < dato.cuentas.length; i++) {
						var cuenta = dato.cuentas[i]
						var columns = [];

						columns.push(cuenta.codigo)
						columns.push(cuenta.nombre)
						columns.push(cuenta.descripcion)
						columns.push(cuenta.clasificacion.nombre)
						columns.push(cuenta.tipoCuenta.nombre)
						columns.push(cuenta.debe)
						columns.push(cuenta.haber)
						columns.push(cuenta.saldo)
						var bimonetaria = (cuenta.bimonetaria) ? "SI" : "NO"
						columns.push(bimonetaria)
						data.push(columns);
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LISTA-PLAN-DE-CUENTAS.xlsx");
					blockUI.stop();
				})
			}
			$scope.actualizarConfiguracionGeneralTCuenta = function (position, entities) {
				entities.forEach((subscription, index) => {
					if (position !== index) {
						subscription.usar_en_comprobante = false;
					}
				});
			}
			//fin comprobar
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalWizardCuentaEdicion);
				$scope.eliminarPopup($scope.idModalWizardClasificacionNueva);
				//$scope.eliminarPopup($scope.idModalWizardClasificacionVer);
				$scope.eliminarPopup($scope.idModalWizardCuentaVer);
				$scope.eliminarPopup($scope.idModalEliminarCuenta);
				$scope.eliminarPopup($scope.idModalWizardPlantillaIngreso);
				$scope.eliminarPopup($scope.idModalWizardClasificacionEdicion);
				$scope.eliminarPopup($scope.idModalWizardConceptoEdicion);
				$scope.eliminarPopup($scope.idModalWizardConfiguracionCuenta);
				$scope.eliminarPopup($scope.idModalConfiguracionContableComprobante);
			});

			/* configuracion contable comprobantes */

			$scope.abrirModalConfiguracionContableComprobante = function () {
				$scope.configuracionContable = { eliminado: false }
				$scope.obtenerConfiguracionesContablesComprobantes()
				$scope.abrirPopup($scope.idModalConfiguracionContableComprobante);
			}
			$scope.cerrarModalConfiguracionContableComprobante = function () {

				$scope.cerrarPopup($scope.idModalConfiguracionContableComprobante);
			}
			$scope.obtenerConfiguracionesContablesComprobantes = function () {
				var promesa = ObtenerConfiguracionesContablesComprobantes($scope.usuario.id_empresa)
				promesa.then(function (dato) {
					$scope.listaConfiguracionesContables = dato
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
				})
			}
			$scope.obtenerGruposProductosEmpresaUsuario = function () {
				blockUI.start()
				var promesa = ListaGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (grupos) {
					blockUI.stop()
					if (grupos.length > 0) {
						$scope.gruposProducto = grupos;
					} else {
						$scope.gruposProducto = []
						$scope.mostrarMensaje('Parece que el usuario actual no cuenta con grupos de productos.')
					}
				}).catch(function (err) {

					$scope.gruposProducto = []
				})
			}
			$scope.listaOpcionesIntegracionAplicacionEmpresa = function () {
				var promesa = ListaOpcionesIntegracionAplicacionEmpresa($scope.usuario.id_empresa)
				promesa.then(function (dato) {
					$scope.listaIntegracionEmpresa = dato
				})
			}

			$scope.agregarConfiguracionIntegracion = function () {
				if ($scope.configuracionContable.edit) {
					$scope.configuracionContable.edit = false
					$scope.configuracionContable = { eliminado: false }
					return
				}
				$scope.listaConfiguracionesContables.push($scope.configuracionContable)
				$scope.configuracionContable = { eliminado: false }
			}
			$scope.obtenerTiposMovimiento = function () {
				var promesa = ClasesTipo('CM_CCH')
				promesa.then(function (dato) {
					$scope.tiposMovimientos = dato
				})
			}
			$scope.editarIntegracionContable = function (dato) {
				$scope.configuracionContable = dato
				$scope.configuracionContable.edit = true
			}
			$scope.eliminarIntegracionContable = function (dato, index) {
				if (dato.id) {
					dato.eliminado = true
				} else {
					$scope.listaConfiguracionesContables.splice(index, 1)
				}
			}
			$scope.guardarConfiguracionesContablesComprobantes = function () {
				var promesa = GuardarConfiguracionesContablesComprobantes($scope.usuario.id_empresa, $scope.listaConfiguracionesContables)
				promesa.then(function (dato) {

					$scope.mostrarMensaje(dato.mensaje)
					$scope.cerrarModalConfiguracionContableComprobante()
				})
			}
			$scope.establecerCuentaContraDebe = function (cuenta) {
				$scope.validarCuentaContraDebe = (cuenta) ? (cuenta.id) ? false : true : true
			}

			$scope.establecerCuentaContraHaber = function (cuenta) {
				$scope.validarCuentaContraHaber = (cuenta) ? (cuenta.id) ? false : true : true

			}
			$scope.buscarCuentasIntegracion = function (query) {

				return NuevoComprobante(SweetAlert, null, null, $scope.usuario, null, null, null, null, null, null, query)
			}
			$scope.obtenerConfiguracionCuentaConcepto = function () {
				blockUI.start();
				var promesa = ClasesTipo("COF_PL_PC");
				promesa.then(function (entidad) {
					//$scope.cuentaClasificaciones=[{id:0,nombre:"TODOS"}]
					$scope.tipoConfPlanilla = entidad;
					id_conf_planilla = 0
					blockUI.stop();
				});
			}

			$scope.librosMayoresGeneral = function (filter) {
				$scope.filtroMayores = {
					id_empresa: $scope.usuario.id_empresa,
					fechaInicio: 0,
					fechaFin: 0,
					cuenta_auxiliar: 0,
					centro_costos: 0,
					bimonetario: 0
				};

				$scope.filtroMayores.cuenta_auxiliar = filter.cuenta_auxiliar ? filter.cuenta_auxiliar : 0;
				$scope.filtroMayores.centro_costos = filter.centro_costos ? filter.centro_costos : 0;
				$scope.filtroMayores.detallado = filter.detallado ? filter.detallado : 0;

				if (filter.fechaInicioTexto && filter.fechaFinTexto) {
					$scope.filtroMayores.fechaInicio = new Date($scope.convertirFecha(filter.fechaInicioTexto));
					$scope.filtroMayores.fechaFin = new Date($scope.convertirFecha(filter.fechaFinTexto));
					// var fecha_expiracionE = new Date(empleado.fecha_expiracion);
					$scope.filtroMayores.fechaFin.setHours(23, 59, 59, 0, 0);
					timeDiff = Math.abs($scope.filtroMayores.fechaFin.getTime() - $scope.filtroMayores.fechaInicio.getTime());
					var diasGet = Math.ceil(timeDiff / (1000 * 3600 * 24));

					if (diasGet <= 40) {
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

						var promesa = LibroMayorGeneral($scope.filtroMayores)
						promesa.then(function (entidad) {
							$scope.DatosLibroMayor = entidad.asientos;
							if ($scope.DatosLibroMayor.length > 0) {
								var elemIcon = document.querySelector('.swal2-icon-content');
								elemIcon.innerHTML = '';
								elemIcon.innerHTML = '<i class="fa fa-file-text size-icon"></i>';
								SweetAlert.update({ title: "Generando Reporte.....", html: "Por favor espere esto puede tardar varios minutos..." })

								$scope.generarPdfLibroMayorGeneral($scope.DatosLibroMayor, $scope.filtroMayores);

							} else {
								SweetAlert.swal("", "no se encontro ningun dato", "warning");
							}
						});
					} else {
						SweetAlert.swal("", "Los periodos de consulta no deben ser mayores a 40 días", "warning");
					}
				} else {
					SweetAlert.swal("", "Seleccione los periodos", "warning");
				}

			}

			$scope.generarPdfLibroMayorGeneral = function (DatosLibroMayor, filtroMayores) {
				var currentDate = new Date();
				var dia = currentDate.getDate();
				var mes = currentDate.getMonth() + 1;
				var anio = currentDate.getFullYear();
				var horas = currentDate.getHours();
				var min = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
				var height = 20;
				var x = 30, y = 110, width = 555, itemsPage = 31, pagina = 1, totalPaginas = Math.ceil(DatosLibroMayor.length / itemsPage);
				var doc = new PDFDocument({ size: 'letter', margin: 30, compress: false });
				var stream = doc.pipe(blobStream());
				doc.lineWidth(0.5)
				// recorrer por cuenta
				$scope.dibujarCabeceraPdfLibrosMayoresGeneral(doc, pagina, totalPaginas, DatosLibroMayor[0], filtroMayores);
				var debeBs = 0;
				var haberBs = 0;
				var saldoCA = 0;
				DatosLibroMayor.forEach(function (cuentaPadre, index, array) {
					if (cuentaPadre.cuenta.length > 0) {

						doc.font('Helvetica', 6);

						var debeBsCuenta = 0;
						var haberBsCuenta = 0;
						cuentaPadre.cuenta.forEach(function (cuenta, indexAsiento, array) {
							if (cuentaPadre.clasificacion.saldo.nombre == 'DEUDOR-DEBE') saldoCA += cuenta.debe_bs - cuenta.haber_bs;
							if (cuentaPadre.clasificacion.saldo.nombre == 'ACREEDOR-HABER') saldoCA += cuenta.haber_bs - cuenta.debe_bs;
							cuenta.prefico_comprobante = $scope.prefijosComprobantes(cuenta);
							debeBs += cuenta.debe_bs;
							haberBs += cuenta.haber_bs;
							debeBsCuenta += cuenta.debe_bs;
							haberBsCuenta += cuenta.haber_bs;
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
							doc.text(formatearSeparadorMiles(saldoCA, 2), 505, y + 8, { width: 70, align: 'right' });

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
								$scope.dibujarCabeceraPdfLibrosMayoresGeneral(doc, pagina, totalPaginas, cuentaPadre, filtroMayores);
								doc.font('Helvetica', 6);
							} else {
								if (indexAsiento == cuentaPadre.cuenta.length - 1) {
									// totales por cuenta ==========================
									doc.font('Helvetica-Bold', 7);
									doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
									doc.text(number_format_negativo_to_positvo(debeBsCuenta, 2), 365, y + 3, { width: 70, align: 'right' });
									doc.text(number_format_negativo_to_positvo(haberBsCuenta, 2), 435, y + 3, { width: 70, align: 'right' });
									if (index < DatosLibroMayor.length - 1) {
										y = y + 10;
										doc.font('Helvetica', 6);
										doc.text("Página : " + pagina, 540, 750);
										doc.text("FECHA : " + dia + "/" + mes + "/" + anio + "   " + "Hrs:" + horas + ":" + min, 55, 750);
										doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 750);

										doc.addPage({ margin: 0, bufferPages: true });
										y = 110;
										pagina = pagina + 1;

										$scope.dibujarCabeceraPdfLibrosMayoresGeneral(doc, pagina, totalPaginas, DatosLibroMayor[index + 1], filtroMayores);


										doc.font('Helvetica', 6);
									}

								}
							}




						})

						// if (index == DatosLibroMayor.length - 1) {
						// 	doc.font('Helvetica-Bold', 7);
						// 	doc.text('TOTAL', 115, y + 3, { width: 250, align: 'right' });
						// 	doc.text(number_format_negativo_to_positvo(debeBs, 2), 365, y + 3, { width: 70, align: 'right' });
						// 	doc.text(number_format_negativo_to_positvo(haberBs, 2), 435, y + 3, { width: 70, align: 'right' });
						// }
					}

				});


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

			$scope.dibujarCabeceraPdfLibrosMayoresGeneral = function (doc, pagina, totalpgn, cuenta, filtroMayores) {
				doc.font('Helvetica-Bold', 10);
				doc.text($scope.usuario.empresa.razon_social, 30, 25);
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.direccion, 30, 45, { width: 200 });
				doc.text('CASA MATRIZ', 30, 35, { width: 250 });
				doc.text('FOLIO ' + pagina, 505, 35, { width: 250 });
				doc.font('Helvetica-Bold', 10);
				doc.text(cuenta.nombre.toUpperCase(), 0, 60, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("(EXPRESADO EN BOLIVIANOS)", 0, 69, { align: "center" });
				if (filtroMayores.fechaInicio != 0 && filtroMayores.fechaFin != 0) {
					doc.text('Del ' + $scope.fechaATexto(filtroMayores.fechaInicio) + ' Al ' + $scope.fechaATexto(filtroMayores.fechaFin), 0, 77, { align: "center" });
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
			/* fin configuracion contable comprobantes */

			$scope.abrirMayoresGlobal = () => {
				var gestiones = ClasesTipo('GTN');
				gestiones.then(tipo => {
					var config = ObtenerGestionesEEFF($scope.usuario.id_empresa);
					config.then(periodos => {
						var anios = tipo.clases.sort((a, b) => parseInt(b.nombre) - parseInt(a.nombre))
						if (anios.length > 0) {
							var gest = ""
							for (let i = 0; i < tipo.clases.length; i++) {
								i == 1 ? gest += "<option selected value=" + tipo.clases[i].nombre_corto + ">" + tipo.clases[i].nombre + "</option> " : gest += "<option value=" + tipo.clases[i].nombre_corto + ">" + tipo.clases[i].nombre + "</option> "

							}
							var periodo = periodos.filter(p => p.habilitado === true);
							console.log(periodos);
							if (periodo.length === 1) {
								SweetAlert.swal({
									title: "",
									html: '<div class="row text-center">SELECCIONE EL PERIODO</div><div class="row" style="font-size: 14px; padding: 15px 0px;"><div class="col-xs-12 col-sm-3 col-md-3"> <label for="gestion">GESTIÓN:</label></div><div class="col-xs-12 col-sm-3 col-md-3"> <select class="pull-left" name="gestion" id="gestion"> ' + gest + ' </select></div><div class="col-xs-12 col-sm-3 col-md-2"> <label  for="mes">MES:</label></div><div class="col-xs-12 col-sm-3 col-md-3"> <select name="mes" id="mes"><option selected value="0">SELECCIONAR</option><option value="1">ENERO</option><option value="2">FEBRERO</option><option value="3">MARZO</option><option value="4">ABRIL</option><option value="5">MAYO</option><option value="6">JUNIO</option><option value="7">JULIO</option><option value="8">AGOSTO</option><option value="9">SEPTIEMBRE</option><option value="10">OCTUBRE</option><option value="11">NOVIEMBRE</option><option value="12">DICIEMBRE</option> </select></div></div>',
									confirmButtonText: 'Excel',
									showCancelButton: true,
									cancelButtonText: 'Cerrar',
									cancelButtonColor: '#d33',
									confirmButtonColor: '#28a746'
								}).then((result) => {
									let gestion = SweetAlert.getContent().querySelector('#gestion').value
									let mes = SweetAlert.getContent().querySelector('#mes').value
									if (result.isConfirmed) {
										$scope.generarDocXlsx({ gestion: gestion, mes: mes }, periodo[0]);
									}
								})
							} else {
								SweetAlert.swal("Error", "Verifique la configuración del periodo de la empresa", "warning");
							}
						} else {
							SweetAlert.swal("", "Configure las gestiones de la empresa", "warning");
						}
					})
				})
			}
			$scope.generarDocXlsx = async (filtro, periodo) => {
				SweetAlert.swal({
					title: '',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Recuperando registros contables...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				ObtenerMayoresGlobal(filtro, periodo, $scope.usuario.id_empresa)
					.then(async data => {
						if (!data.hasError) {
							if (data.cuentas.length > 0) {
								//$scope.agregarRegistrosMayor(matriz, data.cuentas)
								SweetAlert.update({ title: "Construyendo archivo excel...." })
								data.cuentas.unshift(["FECHA", "CÓDIGO", "CUENTA", "COMPROBANTE", "DESCRIPCIÓN", "DEBE Bs", "HABER Bs", "SALDO Bs.", "CLASIFICACIÓN", "TIPO SALDO", "TIPO COMPROBANTE", "AUXILIAR"])
								var ws_name = "Mayores";
								var wb = new Workbook();
								//var ws = await sheet_from_array_of_arrays(data.cuentas);
								var ws = XLSX.utils.aoa_to_sheet(data.cuentas);
								/* add worksheet to workbook */
								wb.SheetNames.push(ws_name);
								wb.Sheets[ws_name] = ws;
								var wbout = await XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
								var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "MAYORES-GLOBAL.xlsx");
								filesaver.onwriteend = function () {
									swal.close();
								}
							}
						} else {
							data.err != undefined ? SweetAlert.swal("", data.message, "danger") : SweetAlert.swal("", data.message, "warning");
						}
					})
			}
			$scope.seleccionarCampos = function (bool) {
				if (bool) {
					$scope.cuenta.campos = $scope.camposEmpresa
				} else {
					$scope.cuenta.campos = []
				}
			}
			$scope.listarCuentasContabilidad = async( texto, cuenta ) => {
				try {
					console.log(cuenta);
					if(!( texto || cuenta )) return;
					console.log(texto);
					let nc = cuenta.tipoCuenta.nombre_corto
					nc--;
					let tipo = $scope.cuentaTipos.find(e => e.nombre_corto == nc)
					let { error, data } = await BuscarCuentaContable( $scope.usuario.id_empresa, cuenta.clasificacion.id, tipo.id, texto )
					if(error) return;
					return data;
				} catch (e) {
					console.error(e.message);
				}
			}
			$scope.validarCuenta = ( clasificacion ) => {
				if(!$scope.cuenta.cuentaPadre) return;
				if( clasificacion ){
					if($scope.cuenta.clasificacion.id != $scope.cuenta.cuentaPadre.id_clasificacion){
						$scope.cuenta.cuentaPadre = null
					}
				}else{
					if($scope.cuenta.tipoCuenta.id != $scope.cuenta.cuentaPadre.id_tipo_cuenta){
						$scope.cuenta.cuentaPadre = null
					}	
				}
			}
			$scope.inicio();

		}]);