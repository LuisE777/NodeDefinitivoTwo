angular.module('agil.controladores')

.controller('ControladorSucursales', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'Sucursal', 'Sucursales', 'SucursalesEmpresa', 'ClasesTipo', 'Clases', 'DosificacionesDisponibles', 'Sucursalupdate', 'Paises', 'ClasesTipoEmpresa', 'GuardarConfiguracionIso','ObtenerConfiguracionIso','SweetAlert', 'SucursalHabilitacion', 'ModificarEstadoISO', 'ObtenerTiposManteniminetoSucursal', 'GuardarCorrelativosOt','ListaCuentasComprobanteContabilidad','HabilitarSFE','ActualizarSucursalSFE','ObtenerCatalogosSucursal',
 'ObtenerCatalogoActividades','ObtenerCatalogoMotivos','ObtenerCatalogoDocumentosIdentidad','ObtenerCatalogoDocumentosSector', 'ObtenerCatalogoTiposEmision', 'ObtenerCatalogoTiposEventos', 'ObtenerCatalogoTiposFactura','ObtenerCatalogoTiposHabitacion', 'ObtenerCatalogoMetodosPago', 'ObtenerCatalogoTiposMoneda', 'ObtenerCatalogoTiposPuntoVenta', 'ObtenerCatalogoUnidadesMedida', 'ActualizarActividades','ActualizarMotivos', 'ActualizarDocumentosIdentidad','ActualizarDocumentosSector', 'ActualizarTiposEmision', 'ActualizarTiposEventos', 'ActualizarTiposFactura', 'ActualizarTiposHabitacion', 'ActualizarMetodosPago', 'ActualizarTiposMoneda', 'ActualizarTiposPuntoVenta','ActualizarUnidadesMedida',
 function ($scope, $localStorage, $location, $templateCache, $route, blockUI, Sucursal, Sucursales, SucursalesEmpresa, ClasesTipo, Clases,
	DosificacionesDisponibles, Sucursalupdate, Paises, ClasesTipoEmpresa, GuardarConfiguracionIso,ObtenerConfiguracionIso, SweetAlert, SucursalHabilitacion, ModificarEstadoISO, ObtenerTiposManteniminetoSucursal, GuardarCorrelativosOt, ListaCuentasComprobanteContabilidad,HabilitarSFE, ActualizarSucursalSFE, ObtenerCatalogosSucursal,
	ObtenerCatalogoActividades,ObtenerCatalogoMotivos,ObtenerCatalogoDocumentosIdentidad, ObtenerCatalogoDocumentosSector, ObtenerCatalogoTiposEmision, ObtenerCatalogoTiposEventos, ObtenerCatalogoTiposFactura, ObtenerCatalogoTiposHabitacion, ObtenerCatalogoMetodosPago, ObtenerCatalogoTiposMoneda, ObtenerCatalogoTiposPuntoVenta, ObtenerCatalogoUnidadesMedida, ActualizarActividades, ActualizarMotivos, ActualizarDocumentosIdentidad, ActualizarDocumentosSector, ActualizarTiposEmision, ActualizarTiposEventos, ActualizarTiposFactura, ActualizarTiposHabitacion, ActualizarMetodosPago, ActualizarTiposMoneda, ActualizarTiposPuntoVenta, ActualizarUnidadesMedida  ) {
	blockUI.start();
			
			$scope.idModalWizardSucursalCorrelativoEdicion = 'modal-wizard-sucursal-correlativo-edicion';
			$scope.idModalContenedorSucursalCorrelativoEdicion = 'modal-wizard-container-sucursal-correlativo';
			$scope.idModalWizardSucursalEdicion = 'modal-wizard-sucursal-edicion';
			$scope.idModalWizardSucursalVista = 'modal-wizard-sucursal-vista';
			$scope.idModalEliminarSucursal = 'dialog-eliminar-sucursal';
			$scope.idModalContenedorSucursalEdicion = 'modal-wizard-container-sucursal-edicion';
			$scope.idModalContenedorSucursalVista = 'modal-wizard-container-sucursal-vista';
			$scope.idModalConfiguracionIso = 'dialog-configuracion-iso'
			$scope.idModalMantenimiento = 'dialog-mantenimientos'
			$scope.idModalActivarSFE = 'modal-SFE'
			$scope.idModalCatalogoSFE = 'modal-catagolo-SFE'
			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario )
                if( !($scope.sucursalUsuario && $scope.sucursalUsuario .id ) ) return SweetAlert.swal("", "<b>Sucursal no encontrada</b></br><small>No se encontró sucursal asignada a su usuario.</small>", 'error');
				$scope.obtenerSucursales();
				$scope.obtenerDepartamentos();
				$scope.obtenerActividades();
				$scope.obtenerDosificaciones();
				$scope.obtenerTamanosPapelFactura()
				$scope.obtenerTiposDocumentosIso()
				/* setTimeout(function () {
					ejecutarScriptsTabla('tabla-sucursales', 8);
				}, 2000); */
			}

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsSucursal($scope.idModalWizardSucursalEdicion, $scope.idModalWizardSucursalVista,
					$scope.idModalEliminarSucursal, $scope.idModalContenedorSucursalEdicion, $scope.idModalContenedorSucursalVista,
					$scope.idModalWizardSucursalCorrelativoEdicion, $scope.idModalConfiguracionIso,$scope.idModalMantenimiento, $scope.idModalContenedorSucursalCorrelativoEdicion, $scope.idModalActivarSFE, $scope.idModalCatalogoSFE);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				blockUI.stop();
			});
			$scope.obtenerTamanosPapelFactura = function () {
				blockUI.start();
				var promesa = ClasesTipo("TAMPAPFACT");
				promesa.then(function (entidad) {
					$scope.tamanosPapelFactura = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerSucursales = function () {
				blockUI.start();
				var promesa = Sucursales($scope.usuario.id_empresa);
				promesa.then(function (sucursales) {
					$scope.sucursales = sucursales;
					blockUI.stop();
				});
			}
			$scope.habilitarSucursales = (sucursal) => {
				const promesa = SucursalHabilitacion($scope.usuario.id_empresa, sucursal.id, sucursal.activo);
				promesa.then((res) => {
					if(res.hasErr) alert(res.mensaje);
				}).catch((err)=>{
					alert(err.stack && err.stack || 'Se perdió la conexión...');
				});
			}
			$scope.obtenerDepartamentos = function () {
				var promesa = ClasesTipo("DEP");
				promesa.then(function (entidad) {
					$scope.departamentos = entidad.clases;
				});
			}

			$scope.obtenerActividades = function () {
				var promesa = ClasesTipo("ACTCOM");
				promesa.then(function (entidad) {
					$scope.actividades = entidad.clases;
				});
			}

			$scope.obtenerDosificaciones = function () {
				var promesa = DosificacionesDisponibles($scope.usuario.id_empresa);
				promesa.then(function (dosificaciones) {
					$scope.dosificaciones = dosificaciones;
				});
			}

			// $scope.buscarMunicipios = function (idDepartamento) {
			// 	var nombre_corto = idDepartamento.split('-')[1];
			// 	var promesa = Clases(nombre_corto + "M");
			// 	promesa.then(function (entidades) {
			// 		$scope.municipios = entidades;
			// 	});
			// }

			$scope.buscarMunicipios = function (idDepartamento) {
				if (idDepartamento) {
					var nombre_corto = idDepartamento.split('-')[1];
					var promesa = Paises(nombre_corto + "M");
					promesa.then(function (entidades) {
						$scope.municipios = entidades;
						// if (entidades.length === 0) {
						// 	$scope.localidades = []
						// }
					});
				}
			}

			$scope.crearNuevaSucursal = function () {
				var usuario = JSON.parse($localStorage.usuario);
				$scope.sucursal = new Sucursal({ id_empresa: usuario.id_empresa, almacenes: [], actividadesDosificaciones: [] });
				$scope.abrirPopup($scope.idModalWizardSucursalEdicion);
			}

			$scope.verSucursal = function (sucursal) {
				$scope.sucursal = sucursal;
				if (sucursal.departamento) {
					$scope.buscarMunicipios(sucursal.id_departamento + '-' + sucursal.departamento.nombre_corto);
				}
				$scope.abrirPopup($scope.idModalWizardSucursalVista);
			}

			$scope.cerrarPopPupVista = function () {
				$scope.cerrarPopup($scope.idModalWizardSucursalVista);
			}

			$scope.cerrarPopPupEdicion = function () {
				$scope.cerrarPopup($scope.idModalWizardSucursalEdicion);
			}

			$scope.cerrarPopPupEdicionCorrelativo = function () {
				$scope.cerrarPopup($scope.idModalWizardSucursalCorrelativoEdicion);
			}

			$scope.modificarSucursal = function (sucursal) {
				$scope.sucursal = sucursal;
				console.log(sucursal)
				if (sucursal.departamento) {
					$scope.buscarMunicipios(sucursal.id_departamento + '-' + sucursal.departamento.nombre_corto);
				}
				$scope.abrirPopup($scope.idModalWizardSucursalEdicion);
			}

			$scope.mostrarConfirmacionEliminacion = function (sucursal) {
				$scope.sucursal = new Sucursal(sucursal);
				$scope.abrirPopup($scope.idModalEliminarSucursal);
			}

			$scope.cerrarConfirmacionEliminacion = function () {
				$scope.cerrarPopup($scope.idModalEliminarSucursal);
			};

			$scope.eliminarSucursal = function (sucursal) {
				blockUI.start();
				$scope.cerrarConfirmacionEliminacion();
				sucursal.$delete();
				SweetAlert.swal("Eliminado!", "Eliminado exitosamente!", "success");
				$scope.recargarItemsTabla();
				blockUI.stop();
			}

			$scope.modificarCorrelativos = async function (sucursal) {
				$scope.sucursal = sucursal;
				$scope.configuracionesIso = await $scope.obtenerConfiguracionesIso()
				$scope.configuracionesIso = $scope.configuracionesIso.filter(val => val.activo === true)
				$scope.tipoDocs = {}
				if($scope.configuracionesIso.length > 0){
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "COMPRA").length > 0 ? $scope.tipoDocs.compra = true : $scope.tipoDocs.compra = false; 
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "CONSUMO").length > 0 ? $scope.tipoDocs.consumo = true : $scope.tipoDocs.consumo = false; 
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "ORDENCOMPRA").length > 0 ? $scope.tipoDocs.ordencompra = true : $scope.tipoDocs.ordencompra = false; 
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "TRASPASOSUC").length > 0 ? $scope.tipoDocs.traspasosuc = true : $scope.tipoDocs.traspasosuc = false; 
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "ROPATRABAJO").length > 0 ? $scope.tipoDocs.ropatrabajo = true : $scope.tipoDocs.ropatrabajo = false; 
					$scope.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto == "BAJASUC").length > 0 ? $scope.tipoDocs.baja = true : $scope.tipoDocs.baja = false; 
				}
				else{
					$scope.tipoDocs.compra = false;
					$scope.tipoDocs.consumo = false;
					$scope.tipoDocs.ordencompra = false;
					$scope.tipoDocs.traspasosuc= false;
					$scope.tipoDocs.ropatrabajo = false;
					$scope.tipoDocs.baja = false;
				} 
				$scope.abrirPopup($scope.idModalWizardSucursalCorrelativoEdicion);
				
			}
			$scope.stepWizard = function (step) {
				$('#' + $scope.idModalContenedorSucursalCorrelativoEdicion).wizard('selectedItem', {
					step: step
				});
			}

			$scope.guardarCorrelativos = function (sucursal) {
				var button = $('#siguiente-correlativo').text().trim();
				if (button != "Siguiente") {
					Sucursalupdate.update({ idSucursal: sucursal.id }, sucursal, function (res) {
						blockUI.stop();
						$scope.cerrarPopPupEdicionCorrelativo();
						SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");
						$scope.recargarItemsTabla();
					});
				}
				// para guardar si no tiene usar_configuracion_iso
				if (!$scope.usuario.empresa.usar_configuracion_iso) {
					Sucursalupdate.update({ idSucursal: sucursal.id }, sucursal, function (res) {
						blockUI.stop();
						$scope.cerrarPopPupEdicionCorrelativo();
						SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");
						$scope.recargarItemsTabla();
					});
				}
				
			}

			$scope.saveForm = function (sucursal) {
				var button=$('#modal-wizard-sucursal-edicion').find('button[type=submit]').text().trim();
				if (button != "Siguiente") {
					blockUI.start();
					if (typeof sucursal.id_departamento == "string") {
						sucursal.id_departamento = sucursal.id_departamento.split('-')[0];
					}
					if (sucursal.id) {
						if (sucursal.municipio) {
							sucursal.id_municipio = sucursal.municipio.id
						}
						Sucursal.update({ idSucursal: sucursal.id }, sucursal, function (res) {
							blockUI.stop();
							$scope.recargarItemsTabla();
							$scope.cerrarPopPupEdicion();
							SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");

						});
					} else {
						sucursal.fecha_reinicio_correlativo = new Date()
						sucursal.fecha_reinicio_correlativo.setDate(1)
						if (sucursal.municipio) {
							sucursal.id_municipio = sucursal.municipio.id
						}
						sucursal.$save(function (sucursal) {
							blockUI.stop();
							$scope.sucursal = new Sucursal({});
							$scope.cerrarPopPupEdicion();
							$scope.recargarItemsTabla();
							SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");

						}, function (error) {
							blockUI.stop();
							$scope.cerrarPopPupEdicion();
							$scope.recargarItemsTabla();
							SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");

						});
					}
				}
			}

			$scope.agregarAlmacen = function (almacen) {
				almacen.edit = false
				if (almacen.nombre && almacen.numero && almacen.direccion) {

					if ($scope.sucursal.almacenes.indexOf(almacen) == -1) {
						$scope.sucursal.almacenes.push(almacen);
					}

					$scope.almacen = {}
				}
			}

			$scope.modificarAlmacen = function (almacen) {
				almacen.edit = true
				$scope.almacen = almacen;
			}

			$scope.removerAlmacen = function (almacen) {
				almacen.eliminado = true;
			}

			$scope.agregarActividadDosificacion = function (actividadDosificacion) {
				var bandera = false
				if ($scope.sucursal.actividadesDosificaciones.length > 0) {
					/* $scope.sucursal.actividadesDosificaciones.forEach(function (dosificacion, index, array) {
						
						var expira=(actividadDosificacion.dosificacion.expirado==1)?true:false
						
							if(actividadDosificacion.dosificacion.expirado==0){
								bandera=false
								if (dosificacion.id_dosificacion == actividadDosificacion.dosificacion.id) {
									bandera = true
							}		
						}	
						if (index === (array.length - 1)) {
							if (bandera == false) {
								if (actividadDosificacion.actividad && actividadDosificacion.dosificacion) {
									if (!actividadDosificacion.id) {
										actividadDosificacion.id_actividad = actividadDosificacion.actividad.id;
										actividadDosificacion.id_dosificacion = actividadDosificacion.dosificacion.id;
										actividadDosificacion.expirado=false
										$scope.sucursal.actividadesDosificaciones.push(actividadDosificacion);
									}
									$scope.actividadDosificacion = {}
								}
							}
						}
					}); */
					var actididadEncontrada = $scope.sucursal.actividadesDosificaciones.find(function (x) {
						return (x.actividad.id == actividadDosificacion.actividad.id && x.dosificacion.expirado == 0)
					})
					var dosificacionEncontrada = $scope.sucursal.actividadesDosificaciones.find(function (x) {
						return (x.dosificacion.id == actividadDosificacion.dosificacion.id && x.dosificacion.expirado == 0)
					})

					if (!actididadEncontrada && !dosificacionEncontrada) {
						if (actividadDosificacion.actividad && actividadDosificacion.dosificacion) {
							if (!actividadDosificacion.id) {
								actividadDosificacion.id_actividad = actividadDosificacion.actividad.id;
								actividadDosificacion.id_dosificacion = actividadDosificacion.dosificacion.id;
								actividadDosificacion.expirado = false
								$scope.sucursal.actividadesDosificaciones.push(actividadDosificacion);
							}
							$scope.actividadDosificacion = {}
						}
					}
				} else {
					if (actividadDosificacion.actividad && actividadDosificacion.dosificacion) {
						if (!actividadDosificacion.id) {
							actividadDosificacion.id_actividad = actividadDosificacion.actividad.id;
							actividadDosificacion.id_dosificacion = actividadDosificacion.dosificacion.id;
							$scope.sucursal.actividadesDosificaciones.push(actividadDosificacion);
						}
						$scope.actividadDosificacion = {}
					}
				}
			}

			$scope.removerActividadDosificacion = function (actividadDosificacion) {
				actividadDosificacion.eliminado = true;
			}

			$scope.obtenerTiposDocumentosIso = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("TIPDOCISO", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposDocumentosIso = entidad
					blockUI.stop();
				});
			}
			//inicio iso config
			$scope.abrirModalConfiguracionIso = async function (sucursal) {
				$scope.sucursal = new Sucursal(sucursal);
				$scope.configuracionesIso = await $scope.obtenerConfiguracionesIso()
				$scope.configuracionIso = { edit: false }
				$scope.errorConfiguracioniso=undefined
				$scope.abrirPopup($scope.idModalConfiguracionIso);
				$scope.$evalAsync()
			}
			$scope.obtenerConfiguracionesIso =async  function () {
				var data = await ObtenerConfiguracionIso($scope.sucursal.id)
				return data.configuracionesIso
			}
			$scope.modificarEstadosISO = function(configuracion, index){
				let versAnteriores = []
				if(configuracion.activo == true) {
					 versAnteriores = $scope.configuracionesIso.filter((val, i) => val.activo == true && i != index && val.tipoDocumento.id == configuracion.tipoDocumento.id);
					 
				}
				if(!configuracion.activo) configuracion.predefinido = false;
				if(versAnteriores.length === 0){
					var promesa = ModificarEstadoISO (configuracion);
					promesa.then(a => {
						SweetAlert.swal("Guardado!", 'Actualizado correctamente', "success");
					})
					promesa.catch(e => {
						SweetAlert.swal("Error!", 'Error al actualizar', "warning");
					})
				}else{
					SweetAlert.swal("Error!", 'Debe inactivar la versión anterior del tipo Doc', "warning");
					$scope.configuracionesIso[index].activo = false
				}
			}
			$scope.cerrarModalConfiguracionIso = function () {
				$scope.cerrarPopup($scope.idModalConfiguracionIso);
			};
			$scope.cerrarModalMantenimiento = function () {
				$scope.cerrarPopup($scope.idModalMantenimiento);
			};
			$scope.agregarConfiguracionIso = function () {
				if ($scope.configuracionIso.edit) {
					$scope.configuracionIso.fecha_aprobacion=new Date($scope.convertirFecha($scope.configuracionIso.fecha_aprobacion_iso))
					$scope.configuracionIso = { edit: false }
					$scope.errorConfiguracioniso=undefined
				} else {
					$scope.configuracionIso.fecha_aprobacion=new Date($scope.convertirFecha($scope.configuracionIso.fecha_aprobacion_iso))
					$scope.configuracionesIso.push($scope.configuracionIso)
					$scope.configuracionIso = { edit: false }
				}
			}
			$scope.modificarConfiguracionIso = function (configuracion) {
				$scope.configuracionIso = configuracion
				$scope.configuracionIso.fecha_aprobacion_iso=$scope.fechaATexto($scope.configuracionIso.fecha_aprobacion)
				$scope.configuracionIso.edit = true
			}
			$scope.eliminarConfiguracionIso = function (configuracion) {
				if (configuracion.id) {
					configuracion.eliminado = true
				} else {
					$scope.configuracionesIso.splice($scope.configuracionesIso.indexOf(configuracion), 1);
				}
			}
			$scope.guardarConfiguracionIso = function () {
				// verificar que no hayan tipos de documentos activos duplicados
				 var unq = []
				 var configActivos = $scope.configuracionesIso.filter(c=> c.activo === true);
				for( i = 0; i < configActivos.length; i++) {
					let cfg = configActivos[i];
					if(i === 0) {
						cfg.id_tipo_documento ? unq.push(cfg.id_tipo_documento) : unq.push(cfg.tipoDocumento.id)
					}else{
						let val
						cfg.id_tipo_documento ? ( val = cfg.id_tipo_documento) :  (val = cfg.tipoDocumento.id) 
						$scope.res = unq.find(el => el === val);
						if($scope.res === undefined){
							unq.push(val);
						}else{
							break;
						}
					}
				}
				if(configActivos.length === unq.length){
					var promesa = GuardarConfiguracionIso($scope.configuracionesIso, $scope.sucursal.id)
					promesa.then(function (dato) {
						SweetAlert.swal("Guardado!", dato.mensaje, "success");
						$scope.cerrarModalConfiguracionIso()
					})
				}else{
					SweetAlert.swal("Error!", "No se puede activar más de un tipo", "warning");
				}
			}

			//fin iso config
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalWizardSucursalEdicion);
				$scope.eliminarPopup($scope.idModalWizardSucursalCorrelativoEdicion);
				$scope.eliminarPopup($scope.idModalWizardSucursalVista);
				$scope.eliminarPopup($scope.idModalEliminarSucursal);
				$scope.eliminarPopup($scope.idModalConfiguracionIso);
				$scope.eliminarPopup($scope.idModalMantenimiento);
				$scope.eliminarPopup($scope.idModalContenedorSucursalCorrelativoEdicion);
				$scope.eliminarPopup($scope.idModalContenedorSucursalEdicion);
				$scope.eliminarPopup($scope.idModalContenedorSucursalVista);
				$scope.eliminarPopup($scope.idModalActivarSFE);
				$scope.eliminarPopup($scope.idModalCatalogoSFE);
			});

			$scope.abrirModalMantenimiento = idSucursal => {
				var prom = ObtenerTiposManteniminetoSucursal(idSucursal);
				
				prom.then(tiposMantenimiento=>{
					$scope.tiposMantenimiento = tiposMantenimiento.mantenimientos
				})
				$scope.abrirPopup($scope.idModalMantenimiento);
			}
			$scope.guardarConfiguracionMantenimiento = (sucursal) => {
				var prom = GuardarCorrelativosOt($scope.tiposMantenimiento);
				prom.then(res=>{
					if(!res.hasErr){
						$scope.cerrarModalMantenimiento()
						SweetAlert.swal("Hecho", res.mensaje, "success");

					}else{
						$scope.cerrarModalMantenimiento()
						SweetAlert.swal("Error", res.mensaje, "warning");

					}
				})
			}
			$scope.buscarCuentaVinculante = async function (query) {
				try {
					if (query != "" && query != undefined) {
						return ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, query);
							
					}
				} catch (error) {
					console.log(error)
				}
				
			}
			$scope.abrirActivarSFESucursal = async (sucursal) => {
				blockUI.start();
				$scope.sucursal = sucursal
				if(sucursal.usar_facturacion_en_linea){
					let { error, data }= await ObtenerCatalogosSucursal(sucursal.id_empresa)
					$scope.catalogos = error ? [] : data
				}
				blockUI.stop();
				$scope.$evalAsync();
				$scope.abrirPopup($scope.idModalActivarSFE);

			}
			$scope.cerrarActivarSFESucursal= () => {
				delete $scope.catalogos;
				$scope.cerrarPopup($scope.idModalActivarSFE);
			}

			$scope.abrirCatalogoFacturacion = async ( sucursal, catalogo ) => {
				$scope.catalogo = catalogo
				if(!( sucursal || catalogo )) return SweetAlert.swal("","Parámetros inválidos", "error")
				$scope.detalles = []
				switch ( catalogo.accion ) {
					case 1:
						let actividades = await ObtenerCatalogoActividades(sucursal.id_empresa, sucursal.id)
						$scope.detalles = actividades.error ? [] : actividades.data
						break;
					case 2:
						let motivos = await ObtenerCatalogoMotivos(sucursal.id_empresa, sucursal.id)
						$scope.detalles = motivos.error ? [] : motivos.data
						break;
					case 3:
						let docs = await ObtenerCatalogoDocumentosIdentidad(sucursal.id_empresa, sucursal.id)
						$scope.detalles = docs.error ? [] : docs.data
						break;
					case 4:
						let documents = await ObtenerCatalogoDocumentosSector(sucursal.id_empresa, sucursal.id)
						$scope.detalles = documents.error ? [] : documents.data
						break;
					case 5:
						let emisiones = await ObtenerCatalogoTiposEmision(sucursal.id_empresa, sucursal.id)
						$scope.detalles = emisiones.error ? [] : emisiones.data
						break;
					case 6:
						let eventos = await ObtenerCatalogoTiposEventos(sucursal.id_empresa, sucursal.id)
						$scope.detalles = eventos.error ? [] : eventos.data
						break;
					case 7:
						let facturas = await ObtenerCatalogoTiposFactura(sucursal.id_empresa, sucursal.id)
						$scope.detalles = facturas.error ? [] : facturas.data
						break;
					case 8:
						let habitaciones = await ObtenerCatalogoTiposHabitacion(sucursal.id_empresa, sucursal.id)
						$scope.detalles = habitaciones.error ? [] : habitaciones.data
						break;
					case 9:
						let metodos = await ObtenerCatalogoMetodosPago(sucursal.id_empresa, sucursal.id)
						$scope.detalles = metodos.error ? [] : metodos.data
						break;
					case 10:
						let monedas = await ObtenerCatalogoTiposMoneda(sucursal.id_empresa, sucursal.id)
						$scope.detalles = monedas.error ? [] : monedas.data
						break;
					case 11:
						let pos = await ObtenerCatalogoTiposPuntoVenta(sucursal.id_empresa, sucursal.id)
						$scope.detalles = pos.error ? [] : pos.data
						break;
					case 12:
						let medidas = await ObtenerCatalogoUnidadesMedida(sucursal.id_empresa, sucursal.id)
						$scope.detalles = medidas.error ? [] : medidas.data
						break;
					default:
						break;
				}
				blockUI.stop()
				$scope.original = _.cloneDeep($scope.detalles)
				$scope.$evalAsync();
				$scope.abrirPopup($scope.idModalCatalogoSFE);

			}
			$scope.cerrarCatalogoFacturacion = () =>{
				delete $scope.detalles
				delete $scope.catalogo
				$scope.cerrarPopup($scope.idModalCatalogoSFE)
			}

			$scope.guardarCambiosActividades = async( datos ) => {
				SweetAlert.swal({
					title: '',
					icon: 'info',
					iconHtml: '<i class="fa fa-info size-icon"></i>',
					html: '<b>Validando datos</br> por favor espere...</b>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				let data = []
				for (let i = 0; i < datos.length; i++) {
					const reg = datos[i];
					if(reg.activo != $scope.original[i].activo) data.push(reg)
				}
				if(data == 0) {
					SweetAlert.hideLoading();
					return SweetAlert.swal("", "Cambios guardados", "success")
				}
				SweetAlert.update({
					title: '',
					icon: 'info',
					iconHtml: '<i class="fa fa-info size-icon"></i>',
					html: '<b>Actualizando catálogo</br> por favor espere...</b>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				switch ($scope.catalogo.accion) {
					case 1:
						let act = await ActualizarActividades($scope.sucursalUsuario, data)
						if (act.error) return SweetAlert.swal("", act.message, "error")
						SweetAlert.swal("", act.message, "success")
						break;
					case 2:
						let mot = await ActualizarMotivos($scope.sucursalUsuario, data)
						if (mot.error) return SweetAlert.swal("", mot.message, "error")
						SweetAlert.swal("", mot.message, "success")
						break;
					case 3:
						let ide = await ActualizarDocumentosIdentidad($scope.sucursalUsuario, data)
						if (ide.error) return SweetAlert.swal("", ide.message, "error")
						SweetAlert.swal("", ide.message, "success")
						break;
					case 4:
						let sec = await ActualizarDocumentosSector($scope.sucursalUsuario, data)
						if (sec.error) return SweetAlert.swal("", sec.message, "error")
						SweetAlert.swal("", sec.message, "success")
						break;
					case 5:
						let emi = await ActualizarTiposEmision($scope.sucursalUsuario, data)
						if (emi.error) return SweetAlert.swal("", emi.message, "error")
						SweetAlert.swal("", emi.message, "success")
						break;
					case 6:
						let evento = await ActualizarTiposEventos($scope.sucursalUsuario, data)
						if (evento.error) return SweetAlert.swal("", evento.message, "error")
						SweetAlert.swal("", evento.message, "success")
						break;
					case 7:
						let factura = await ActualizarTiposFactura($scope.sucursalUsuario, data)
						if (factura.error) return SweetAlert.swal("", factura.message, "error")
						SweetAlert.swal("", factura.message, "success")
						break;
					case 8:
						let habitacion = await ActualizarTiposHabitacion($scope.sucursalUsuario, data)
						if (habitacion.error) return SweetAlert.swal("", habitacion.message, "error")
						SweetAlert.swal("", habitacion.message, "success")
						break;
					case 9:
						let metodo = await ActualizarMetodosPago($scope.sucursalUsuario, data)
						if (metodo.error) return SweetAlert.swal("", metodo.message, "error")
						SweetAlert.swal("", metodo.message, "success")
						break;
					case 10:
						let moneda = await ActualizarTiposMoneda($scope.sucursalUsuario, data)
						if (moneda.error) return SweetAlert.swal("", moneda.message, "error")
						SweetAlert.swal("", moneda.message, "success")
						break;
					case 11:
						let pos = await ActualizarTiposPuntoVenta($scope.sucursalUsuario, data)
						if (pos.error) return SweetAlert.swal("", pos.message, "error")
						SweetAlert.swal("", pos.message, "success")
						break;
					case 12:
						let medida = await ActualizarUnidadesMedida($scope.sucursalUsuario, data)
						if (medida.error) return SweetAlert.swal("", medida.message, "error")
						SweetAlert.swal("", medida.message, "success")
						break;
					default:
						break;
				}
				$scope.cerrarCatalogoFacturacion()
				SweetAlert.hideLoading();
			}

			$scope.habilitarSucursal = async ( sucursal ) => {
				SweetAlert.swal({
                    title: "",
                    html: `<b>Está seguro de habilitar esta sucursal para facturación electrónica.?</b>`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No",
                }).then( async function (result) {
					if (result.isConfirmed) {
						SweetAlert.swal({
							title: '',
							icon: 'info',
							iconHtml: '<i class="fa fa-info size-icon"></i>',
							html: '<b>Validando información</br> por favor espere...</b>',
							allowEscapeKey: false,
							allowOutsideClick: false
						})
						SweetAlert.showLoading()
						blockUI.noOpen = true;
						try {
							if(!sucursal) return SweetAlert.swal("","Sucursal inválida", 'error')
							if(!sucursal.activo) return SweetAlert.swal("","No se puede habilitar una sucursal que está inactivo", "error")
							if(!(sucursal.numero >= 0)) return SweetAlert.swal("","La sucursal no tiene código(número) asignado", "error")
							SweetAlert.swal({
								title: '',
								icon: 'info',
								iconHtml: '<i class="fa fa-info size-icon"></i>',
								html: `<b>Configurando facturación electronica</br>por favor espere...</b>`,
								allowEscapeKey: false,
								allowOutsideClick: false
							})
							let { error, message } = await HabilitarSFE(sucursal);
							if( error ) return SweetAlert.swal("", message, 'error')
							SweetAlert.swal({
								title: '',
								icon: 'info',
								iconHtml: '<i class="fa fa-info size-icon"></i>',
								html: '<b>Actualizando datos de la Sucursal</br> por favor espere...</b>',
								allowEscapeKey: false,
								allowOutsideClick: false
							})
							let { error:err, message: msg } = await ActualizarSucursalSFE( sucursal.id )
							if(err) return SweetAlert.swal("", msg, 'error')
							SweetAlert.swal({
								title: '',
								icon: 'info',
								iconHtml: '<i class="fa fa-info size-icon"></i>',
								html: '<b>Recuperando catálogos</br> por favor espere...</b>',
								allowEscapeKey: false,
								allowOutsideClick: false
							})
							let regs = await ObtenerCatalogosSucursal(sucursal.id_empresa)
							if(regs.error) return SweetAlert.swal("", regs.message, 'error')
							$scope.catalogos = regs.data
							sucursal.usar_facturacion_en_linea = 1;
							
							swal.close();
							console.log($scope.catalogos);
						} catch (e) {
							let data = e.data
							console.log(data);
							SweetAlert.hideLoading();
							if(e.status === 500 ) return SweetAlert.swal("",data.error.message, "error");
							return SweetAlert.swal(data ? data.message : "", data ? data.error : "", 'error');
						}
					}
				})
			}



			$scope.inicio();
		}]);