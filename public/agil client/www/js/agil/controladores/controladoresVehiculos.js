
angular.module('agil.controladores')
	.controller('ControladorVehiculos', ['$scope', 'blockUI', '$localStorage', '$location', '$templateCache', '$route', '$timeout', 'Diccionario', 'ClasesTipo', '$window', 'Paginator', 'VehiculosPaginador', 'FieldViewer',
		'ListaMantenimientoVehiculo', 'ClasesTipo', 'ListaMantenimientoEncargado', 'ProductosPanel', 'ListaProductosEmpresa', 'ListaInventariosProducto', 'GuardarNuevaOrdendeTrabajo', 'ActualizarOrdendeTrabajo', 'DatosFechasVehiculos',
		'ObtenerDatosVehiculo', 'ListaMantenimientoSucursal', 'tipoMantenimiento', 'guardarDatosVehiculo', 'guardarClienteMantenimiento', 'ListaMantenimientoVehiculoExterno', 'Tipos', 'ClasesTipoEmpresa', 'BuscarRegistroOtsVehiculo', 'ClientesNit', 'ObtenerListaVehiculosOt',
		'ObtenerKardexVehiculosOt', 'InventarioPaginador', 'ProveedoresNit', 'ClasesTipoHijosEmpresa', 'SalarioPersona', '$q', 'ClasesTipoHijosPadresEmpresa', 'EspecialidesPrecios', 'EspecialidesPreciosUpdate', 'ListaProductosMantenimiento', 'ObtenerVehiculoProducto', 'SweetAlert', 'ObtenerOrdenesDeTrabajo', 'ClasesMantenimientoSucursal', 'ObtenerOtMateriales', 'OptenerMaterialesRegistro', 'ObtenerSistemas', 'ObtenerEspecialidades', 'ObtenerPreciosEspecialidad', 'SaveConfig', 'GetConfig', 'GetTiposActivosFijos', 'PagosOTCreditos', function ($scope, blockUI, $localStorage, $location, $templateCache, $route, $timeout, Diccionario, ClasesTipo, $window, Paginator, VehiculosPaginador, FieldViewer,
			ListaMantenimientoVehiculo, ClasesTipo, ListaMantenimientoEncargado, ProductosPanel, ListaProductosEmpresa, ListaInventariosProducto, GuardarNuevaOrdendeTrabajo, ActualizarOrdendeTrabajo, DatosFechasVehiculos,
			ObtenerDatosVehiculo, ListaMantenimientoSucursal, tipoMantenimiento, guardarDatosVehiculo, guardarClienteMantenimiento, ListaMantenimientoVehiculoExterno, Tipos, ClasesTipoEmpresa, BuscarRegistroOtsVehiculo, ClientesNit, ObtenerListaVehiculosOt,
			ObtenerKardexVehiculosOt, InventarioPaginador, ProveedoresNit, ClasesTipoHijosEmpresa, SalarioPersona, $q, ClasesTipoHijosPadresEmpresa, EspecialidesPrecios, EspecialidesPreciosUpdate, ListaProductosMantenimiento, ObtenerVehiculoProducto, SweetAlert, ObtenerOrdenesDeTrabajo, ClasesMantenimientoSucursal, ObtenerOtMateriales, OptenerMaterialesRegistro, ObtenerSistemas, ObtenerEspecialidades, ObtenerPreciosEspecialidad, SaveConfig, GetConfig, GetTiposActivosFijos, PagosOTCreditos) {

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsVehiculos($scope.modalNuevoMantenimiento, $scope.modalReportarIncidente, $scope.modalCheckListDiario, $scope.modalCheckListMensual, $scope.modalEditarHistorico,
					$scope.modalMantenimientoCorrectivo, $scope.modalBusquedaProducto, $scope.modalBusquedaEncargado, $scope.modalLogin,
					$scope.modalNuevoMantenimientoMaquinaria, $scope.modalCheckListMensualMaquinaria, $scope.modalEditarItemList, $scope.modalProxMantenimientoMaquinaria,
					$scope.modalProxMantenimientoVehiculo, $scope.modalCalendar, $scope.modalFichaVehiculo, $scope.modalEditarCheckList, $scope.modalBuscarMaquinaria, $scope.modalReportarIncidenteMaquinaria,
					$scope.idModalInicioMantenimiento, $scope.idModalOTNuevo, $scope.idModalwizardContainerOTNuevo, $scope.idModalFacturaServicioExterno, $scope.idModaRepuestosOT, $scope.idModalEventoCalendario, $scope.idModalEditarEventoCalendario,
					$scope.idModalAgregarDatosVehiculo, $scope.idModalConceptoEdicion, $scope.idModalListaVehiculos, $scope.idmodalKardexVehiculo, $scope.idModalInventario,
					$scope.idModalLiquidacionMantenimiento, $scope.idModalwiZardcontainerliquidacionmantenimiento, $scope.idModalConceptoEdicionEspecialidad,
					$scope.idModalConfiguracionMecanica, $scope.idFinalizarLiquidacion, $scope.idTipoImpresionLiquidacion, $scope.idModalSettings, $scope.idModalPagoCreditoMantenmimiento);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion()
			});
			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.isAdmin = false;
			if($scope.usuario){
				if($scope.usuario.rolesUsuario.length>1){
					if($scope.usuario.rolesUsuario.find(ele => ele.rol.nombre === "ADMINISTRADOR") != undefined){
						$scope.isAdmin = true;
					}
				}else{
					if($scope.usuario.rolesUsuario.length == 1){
						$scope.isAdmin = $scope.usuario.rolesUsuario[0].rol.nombre == "ADMINISTRADOR" ? true : false;
					}
				}
			}
			$scope.modalNuevoMantenimiento = 'dialog-iniciar-mantenimiento';
			$scope.modalReportarIncidente = 'modal-reportar-incidente';
			$scope.modalCheckListDiario = 'modal-checklist-diario';
			$scope.modalCheckListMensual = 'modal-checklist-mensual';
			$scope.modalEditarHistorico = 'dialog-editar-historico';
			$scope.modalMantenimientoCorrectivo = 'dialog-mantenimiento-correctivo';
			$scope.modalBusquedaProducto = 'dialog-busqueda-producto';
			$scope.modalBusquedaEncargado = 'dialog-busqueda-encargado';
			$scope.modalLogin = 'dialog-login';
			$scope.modalNuevoMantenimientoMaquinaria = 'dialog-iniciar-mantenimiento-maquinaria';
			$scope.modalCheckListMensualMaquinaria = 'modal-checklist-mensual-maquinaria';
			$scope.modalEditarItemList = 'dialog-editar-item-list';
			$scope.modalProxMantenimientoMaquinaria = 'dialog-prox-mantenimiento-maquinaria';
			$scope.modalProxMantenimientoVehiculo = 'dialog-prox-mantenimiento-vehiculo';
			$scope.modalCalendar = 'dialog-calendar';
			$scope.modalFichaVehiculo = 'dialog-ficha-vehiculo';
			$scope.modalEditarCheckList = 'modal-editar-checklist';
			$scope.modalBuscarMaquinaria = 'dialog-buscar-maquinaria';
			$scope.modalReportarIncidenteMaquinaria = 'modal-reportar-incidente-maquinaria';
			$scope.idModalInicioMantenimiento = 'dialog-iniciar-mantenimiento';
			$scope.idModalOTNuevo = 'dialog-ot-nuevo';
			$scope.idModalFacturaServicioExterno = 'dialog-factura-servicioExterno';
			$scope.idModaRepuestosOT = 'panel-repuestos-ot';
			$scope.idModalwizardContainerOTNuevo = 'modal-wizard-ot-nuevo-container';
			$scope.idModalEventoCalendario = 'dialog-evento-calendario';
			$scope.idModalEditarEventoCalendario = 'dialog-editar-evento-calendario';
			$scope.idModalAgregarDatosVehiculo = 'dialog-agregar-datos-vehiculo';
			$scope.idModalConceptoEdicion = 'dialog-conceptos';
			$scope.idModalListaVehiculos = 'modal-lista-vehiculos';
			$scope.idmodalKardexVehiculo = 'modal-kardex-vehiculo';
			$scope.idModalInventario = "dialog-productos-venta";
			$scope.idModalLiquidacionMantenimiento = "dialog-liquidacion-mantenimiento";
			$scope.idModalwiZardcontainerliquidacionmantenimiento = "modal-wizard-liquidacion-mantenimiento-container"
			$scope.idModalConceptoEdicionEspecialidad = 'dialog-conceptos-especialidad';
			$scope.idModalConfiguracionMecanica = 'dialog-configuraciones-mecanica';
			$scope.idFinalizarLiquidacion = 'dialog-finalizar-liquidacion';
			$scope.idTipoImpresionLiquidacion = 'dialog-tipo-impresion-liquidacion';
			$scope.idModalSettings = 'dialog-settings';
			$scope.idModalPagoCreditoMantenmimiento = 'dialog-pago-credito-mantenimiento';
			// 20
			

			

			
			
			$scope.inicio = async function () {
				GetConfig($scope.usuario.id_empresa)
				.then(data => {
					if(!data.err){
						if(data.config){
							/* $scope.filtro.internoExterno = Number(data.config.mantenimiento_default) ? true : false; */
							$scope.configs = data.config;
							if($scope.usuario.empresa.usar_mantenimiento && $scope.usuario.empresa.usar_mantenimiento_externo_propio){
								if($scope.configs){
									if($scope.configs.mantenimiento_default == null || $scope.configs.mantenimiento_default == undefined) $scope.configs.mantenimiento_default = "0"
								}
							}else{
								if($scope.usuario.empresa.usar_mantenimiento_externo_propio) {
									$scope.configs.mantenimiento_default = "1"
								}else{
									$scope.configs.mantenimiento_default = "0"
								}
							}
							$scope.obtenerTipoMedidaTanqueGasolina();
							$scope.obtenerEstadosMantenimiento()
							$scope.obtenerListaTiposEspecialidad()
							$scope.obtenerTiposPrioridad()
							/* $scope.obtenerTiposEspecialidad() */
							$scope.aplicarCalendario();
							$scope.obtenerSucursales();
							$scope.sucursales = $scope.obtenerSucursales();
							$scope.tipoMantenimientoEmpresa();
							$scope.liquidacionMantenimiento = {}
							$scope.ObteneVehiculos()
							$scope.obtenerTiposMantenimiento();
							$scope.listarCampos();
							if($scope.usuario.empresa.usar_mantenimiento) $scope.obtenerTiposActivosMto();
						}else{
							SweetAlert.swal("", "Defina las configuraciones iniciales de mantenimiento<br> <center>Comuníquese con soporte</center>", "warning");
						}
					}else{
						SweetAlert.swal("", "Error al recuperar las configuraciones de mantenimiento<br> <center>Comuníquese con soporte</center>", "error");
					}
				})
			}

			$scope.stepWizard = function (step) {
				$('#' + $scope.idModalwizardContainerOTNuevo).wizard('selectedItem', {
					step: step
				});
			}
			
			$scope.abrirReportarIncidenteMaquinaria = function () {
				abrirPopup($scope.modalReportarIncidenteMaquinaria)
			}

			$scope.abrirEventoCalendario = function () {
				abrirPopup($scope.idModalEventoCalendario)
			}
			$scope.abrirEditarEventoCalendario = function () {
				abrirPopup($scope.idModalEditarEventoCalendario)
			}
			$scope.abrirBuscarMaquinaria = function () {
				abrirPopup($scope.modalBuscarMaquinaria)
			}
			$scope.abrirEditarCheckList = function () {
				abrirPopup($scope.modalEditarCheckList)
			}

			$scope.abrirFichaVehiculo = function () {
				abrirPopup($scope.modalFichaVehiculo)
			}

			$scope.abrirOTCalendar = function () {
				$scope.calendario = { id_empresa: $scope.usuario.id_empresa, correctivo: false, preventivo: false, rutina: false, entrega: false }
				abrirPopup($scope.modalCalendar)

			}

			$scope.abrirProxMantenimientoVehiculos = function () {
				abrirPopup($scope.modalProxMantenimientoVehiculo)
			}

			$scope.abrirProxMantenimientoMaquinaria = function () {
				abrirPopup($scope.modalProxMantenimientoMaquinaria)
			}

			$scope.abrirEditarItemList = function () {
				abrirPopup($scope.modalEditarItemList)
			}

			$scope.abrirCheckListMensualMaquinaria = function () {
				abrirPopup($scope.modalCheckListMensualMaquinaria)
			}

			$scope.abrirNuevoMantenimientoMaquinaria = function () {
				abrirPopup($scope.modalNuevoMantenimientoMaquinaria)
			}

			$scope.abrirModalLogin = function () {
				abrirPopup($scope.modalLogin)
			}

			$scope.abrirBusquedaEncargado = function () {
				abrirPopup($scope.modalBusquedaEncargado)
			}

			$scope.abrirBusquedaProducto = function () {
				abrirPopup($scope.modalBusquedaProducto)
			}

			$scope.abrirMantenimientoCorrectivo = function () {
				abrirPopup($scope.modalMantenimientoCorrectivo)
			}
			$scope.abrirOTEdicionCorrectivo = function (vehiculo, tipo) {
				promesa = ObtenerDatosVehiculo($scope.usuario.id_empresa, vehiculo.id)
				promesa.then(function (datos) {
					$scope.tipoMantenimientos = $scope.tiposMantenimiento;
					/* $scope.editOt = true
					$scope.vehiculo = datos.mantenimiento
					if (datos.mantenimiento.vehiculo_ot != null) {
						$scope.vehiculo.datosVehiculo = datos.mantenimiento.vehiculo_ot;
					} else {
						$scope.vehiculo.datosVehiculo = datos.mantenimiento.producto;
					}
					$scope.vehiculo.fecha_hora_inicio = moment(vehiculo.fecha_hora_inicio).format('MM/DD/YYYY h:mm A')
					$scope.vehiculo.fecha_hora_fin = moment(vehiculo.fecha_hora_inicio).format('MM/DD/YYYY h:mm A')
					$scope.vehiculo.fecha_hora_aviso = moment(vehiculo.fecha_hora_inicio).format('MM/DD/YYYY h:mm A')
					$scope.vehiculo.manosDeObra.forEach(function (manoDeObra) {
						manoDeObra.horas = ($scope.diferenciaEntreDiasEnDias(new Date(manoDeObra.fecha_inicio), new Date(manoDeObra.fecha_fin)) * 24)
					}, this);
					console.log($scope.vehiculo) */
					$scope.nuevoOt = datos.mantenimiento
					if (!datos.mantenimiento.mantenimiento_externo) {
						$scope.nuevoOt.vehiculo = {}
						$scope.nuevoOt.vehiculo.marca = datos.vehiculo ? datos.vehiculo.marca : ''
						$scope.nuevoOt.vehiculo.chasis = datos.vehiculo ? datos.vehiculo.chasis : ''
						$scope.nuevoOt.vehiculo.color = datos.vehiculo ? datos.vehiculo.color : ''
						$scope.nuevoOt.vehiculo.modelo = datos.vehiculo ? datos.vehiculo.modelo : ''
						$scope.nuevoOt.vehiculo.km = datos.vehiculo ? datos.vehiculo.km : ''
						$scope.nuevoOt.vehiculo.id = datos.vehiculo.id
						$scope.nuevoOt.vehiculo.anio = datos.vehiculo ? datos.vehiculo.anio : ''
						$scope.nuevoOt.vehiculo.placa = datos.vehiculo.placa
						$scope.nuevoOt.vehiculo.codigo = datos.vehiculo.placa
					}
					$scope.nuevoOt.vehiculo.km = $scope.nuevoOt.km;
					$scope.nuevoOt.ver = (tipo == 'view') ? true : false
					$scope.obtenerTiposSistemasOrdenTrabajo($scope.nuevoOt.tipoMantenimiento.id, true)

					$scope.nuevoOt.tipo_mantenimiento = datos.mantenimiento.tipoMantenimiento.id
					$scope.nuevoOt.fecha_hora_inicio = $scope.nuevoOt.fecha_hora_inicio != null ? moment(new Date($scope.nuevoOt.fecha_hora_inicio)).format('DD/MM/YYYY h:mm A') : null
					$scope.nuevoOt.fecha_hora_fin = $scope.nuevoOt.fecha_hora_fin != null ? moment($scope.nuevoOt.fecha_hora_fin).format('DD/MM/YYYY h:mm A') : null
					$scope.nuevoOt.fecha_hora_aviso = $scope.nuevoOt.fecha_hora_aviso ? moment(new Date($scope.nuevoOt.fecha_hora_aviso)).format('DD/MM/YYYY h:mm A') : null
					$scope.nuevoOt.sistemas = $scope.nuevoOt.sistemas ? $scope.nuevoOt.sistemas : []
					$scope.nuevoOt.manosDeObra = $scope.nuevoOt.manosDeObra ? $scope.nuevoOt.manosDeObra : []
					$scope.nuevoOt.materiales = $scope.nuevoOt.materiales ? $scope.nuevoOt.materiales : []
					$scope.nuevoOt.serviciosExternos = $scope.nuevoOt.serviciosExternos ? $scope.nuevoOt.serviciosExternos : []
					if (datos.mantenimiento.mantenimiento_externo) {
						$scope.nuevoOt.nit_cli = datos.mantenimiento.cliente_ot.nit
						$scope.nuevoOt.propietario_telefono = Number(datos.mantenimiento.cliente_ot.telefono1);
						$scope.nuevoOt.propietario_celular = Number(datos.mantenimiento.cliente_ot.telefono2);
					}
					$scope.abrirPopup($scope.modalNuevoMantenimiento);
				})
			}
			$scope.imprimirOT = (ot) => {
				if (ot.mantenimiento_externo) {
					$scope.imprimirOTExterno(ot)
				} else {
					$scope.imprimirOTInterno(ot)
				}
			}
			$scope.imprimirOTInterno = (mantenimiento) => {
				var promesa = ObtenerDatosVehiculo($scope.usuario.id_empresa, mantenimiento.id)
				promesa.then(function (datos) {
					convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {

						var doc = new PDFDocument({ compress: false, size: 'letter', margin: 20, bufferPages: true });
						var stream = doc.pipe(blobStream());
						doc.lineWidth(0.5);
						doc.lineGap(-1.5)
						var x = 45, y = doc.y

						//Parte superior izquierdo
						if (imagenEmpresa != "error") doc.image(imagenEmpresa, 82.5, 20, { width: 130, height: 68 });
						y += 70;
						doc.rect(x, y, 205, 23.9).fillAndStroke('#1E7DBB', ''); y += 6;
						let especialidad = datos.mantenimiento.tipoMantenimiento.nombre
						let nro = datos.mantenimiento.correlativo_ot
						doc.font('Helvetica-Bold', 8).fillColor('#fff').text(especialidad ? nro ? especialidad + "    N° " + nro : especialidad.toUpperCase() + '    N°' : '', x, 99, { width: 205, align: 'center' });
						y = 114;
						doc.lineWidth(0.5)
						doc.rect(x, y, 205, 72).stroke('#000')
						doc.lineWidth(0.2)
						doc.rect(x, y, 205, 12).stroke();
						doc.rect(x, y + 12, 205, 12).stroke()
						doc.rect(x, y + 24, 205, 12).stroke();
						doc.rect(x, y + 36, 205, 12).stroke()
						doc.rect(x, y + 48, 205, 12).stroke();
						doc.rect(x, y + 60, 205, 12).stroke()

						doc.rect(113.33, y, 0, 72).stroke();
						doc.rect(181.66, y, 0, 48).stroke();

						doc.rect(147.83, y + 60, 0, 12).stroke();
						doc.rect(181.66, y + 60, 0, 12).stroke();
						doc.rect(216.16, y + 60, 0, 12).stroke();
						y += 3
						doc.font('Helvetica-Bold', 7).fillColor('#000')
						doc.fillColor('#000').text('MARCA', 45, y, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('CHASIS', 113.33, y, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('MODELO', 181.66, y, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('PLACA', 45, y + 24, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('COLOR', 113.33, y + 24, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('AÑO', 181.66, y + 24, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('KM/MILL', 45, y + 48, { width: 68.33, align: 'center' });
						doc.fillColor('#000').text('TANQUE DE GASOLINA', 113.33, y + 48, { width: 136.67, align: 'center' });

						doc.font('Helvetica', 7)
						var vehiculo
						datos.mantenimiento.vehiculo ? vehiculo = datos.mantenimiento.vehiculo : vehiculo = datos.vehiculo
						if (vehiculo) {
							doc.text(vehiculo.marca ? vehiculo.marca.toUpperCase() : '', 45, y + 12, { width: 68.33, align: 'center' });
							doc.text(vehiculo.chasis ? vehiculo.chasis.toUpperCase() : '', 113.33, y + 12, { width: 68.33, align: 'center' });
							doc.text(vehiculo.modelo ? vehiculo.modelo.toUpperCase() : '', 181.66, y + 12, { width: 68.33, align: 'center' });
							doc.text(vehiculo.placa ? vehiculo.placa.toUpperCase() : '', 45, y + 36, { width: 68.33, align: 'center' });
							doc.text(vehiculo.color ? vehiculo.color.toUpperCase() : '', 113.33, y + 36, { width: 68.33, align: 'center' });
							doc.text(vehiculo.anio ? vehiculo.anio : '', 181.66, y + 36, { width: 68.33, align: 'center' });
						}
						doc.text(datos.mantenimiento.km ? datos.mantenimiento.km : '', 45, y + 60, { width: 68.33, align: 'center' });
						var tanque = datos.mantenimiento.InventariosRecepcion.tamanioTanque
						if (tanque) {
							if (tanque.nombre_corto == "1/4") {
								doc.rect(113.33, y + 57, 34.5, 12).fillAndStroke('#1E7DBB', '#000');
								doc.fillColor('#fff').text("1/4", 113.33, y + 60, { width: 34.5, align: 'center' });
							} else {
								doc.fillColor('#000').text("1/4", 113.33, y + 60, { width: 34.5, align: 'center' })
							}
							if (tanque.nombre_corto == "1/2") {
								doc.rect(147.83, y + 57, 34.5, 12).fillAndStroke('#1E7DBB', '#000');
								doc.fillColor('#fff').text("1/2", 147.83, y + 60, { width: 34.5, align: 'center' });
							} else {
								doc.fillColor('#000').text("1/2", 147.83, y + 60, { width: 34.5, align: 'center' })
							}
							if (tanque.nombre_corto == "3/4") {
								doc.rect(181.66, y + 57, 34.5, 12).fillAndStroke('#1E7DBB', '#000');
								doc.fillColor('#fff').text("3/4", 181.66, y + 60, { width: 34.5, align: 'center' });
							} else {
								doc.fillColor('#000').text("3/4", 181.66, y + 60, { width: 34.5, align: 'center' })
							}
							if (tanque.nombre_corto == "F") {
								doc.rect(216.16, y + 57, 34, 12).fillAndStroke('#1E7DBB', '#000');
								doc.fillColor('#fff').text("F", 216.16, y + 60, { width: 34, align: 'center' });
							} else {
								doc.fillColor('#000').text("F", 216.16, y + 60, { width: 34, align: 'center' })
							}
						} else {
							doc.fillColor('#000').text("1/4", 113.33, y + 60, { width: 34.5, align: 'center' })

							doc.fillColor('#000').text("1/2", 147.83, y + 60, { width: 34.5, align: 'center' })

							doc.fillColor('#000').text("3/4", 181.66, y + 60, { width: 34.5, align: 'center' })

							doc.fillColor('#000').text("F", 216.16, y + 60, { width: 34.5, align: 'center' })

						}
						doc.lineWidth(0.5).rect(x, y + 69, 547, 24).stroke('#000');
						doc.lineWidth(0.2)
						doc.rect(45, y + 69, 68.33, 12).stroke()
						doc.rect(45, y + 81, 68.33, 12).stroke()
						doc.fillColor('#000').font('Helvetica-Bold', 7).text('FECHA INGRESO', 45, y + 72, { width: 68.33, align: 'center' });
						doc.rect(113.33, y + 69, 68.4, 12).stroke()
						doc.rect(113.33, y + 81, 68.4, 12).stroke()
						doc.fillColor('#000').font('Helvetica-Bold', 7).text('FECHA SALIDA', 113.33, y + 72, { width: 68.4, align: 'center' });
						doc.fillColor('#000').font('Helvetica-Bold', 7).text('OBSERVACIONES: ', 184, y + 71, { width: 360 });

						//Parte superior derecho 
						x = 250
						//Textos
						y = 20;
						doc.font('Helvetica-Bold', 9).fillColor('#000').text('INVENTARIO DE RECEPCIÓN', 250, y, { width: 297, align: 'center' });
						y += 14;
						x += 3;
						doc.font('Helvetica', 7)
						doc.text('PARABRISAS DELANTERO', x, y); y += 12;
						doc.text('PARABRISAS TRASERO', x, y); y += 12;
						doc.text('VENTANAS DELANTERAS', x, y); y += 12;
						doc.text('VIDRIO TECHO SOLAR', x, y); y += 12;
						doc.text('RADIO', x, y); y += 12;
						doc.text('RETROVISORES', x, y); y += 12;
						doc.text('LLANTA DE AUXILIO', x, y); y += 12;
						doc.text('TAPA VÁLVULAS', x, y); y += 12;
						doc.text('GATA', x, y); y += 12;
						doc.text('FAROLES DELANTEROS', x, y); y += 12;
						doc.text('GUIÑADORES', x, y);
						y = 34;
						x = 424;
						doc.text('LIMPIA PARABRISAS DELANTERO', x, y); y += 12;
						doc.text('LIMPIA PARABRISAS TRASERO', x, y); y += 12;
						doc.text('VENTANAS TRASERAS', x, y); y += 12;
						doc.text('ENCENDEDOR', x, y); y += 12;
						doc.text('ANTENA', x, y); y += 12;
						doc.text('EMBLEMA', x, y); y += 12;
						doc.text('TAPA CUBOS', x, y); y += 12;
						doc.text('HERRAMIENTAS', x, y); y += 12;
						doc.text('TAPA TANQUE COMBUSTIBLE', x, y); y += 12;
						doc.text('STOPS', x, y); y += 12;
						doc.text('SOBREPISOS', x, y); y += 12;
						doc.font('Helvetica-Bold', 7).text('OTROS: ', 253, y - 2);

						//linaes
						doc.lineWidth(0.6)
						x = 250;
						doc.rect(x, 30, 342, 156).stroke('#000')

						doc.lineWidth(0.4)
						doc.rect(x, 42, 342, 0).stroke('#000')
						doc.rect(x, 54, 342, 0).stroke('#000')
						doc.rect(x, 66, 342, 0).stroke('#000')
						doc.rect(x, 78, 342, 0).stroke('#000')
						doc.rect(x, 90, 342, 0).stroke('#000')
						doc.rect(x, 102, 342, 0).stroke('#000')
						doc.rect(x, 114, 342, 0).stroke('#000')
						doc.rect(x, 126, 342, 0).stroke('#000')
						doc.rect(x, 138, 342, 0).stroke('#000')
						doc.rect(x, 150, 342, 0).stroke('#000')
						doc.rect(x, 162, 342, 0).stroke('#000')

						doc.rect(409, 30, 0, 132).stroke('#000')
						doc.rect(421, 30, 0, 132).stroke('#000')
						doc.rect(580, 30, 0, 132).stroke('#000')

						//datos de recepcion
						var recepcion = datos.mantenimiento.InventariosRecepcion
						if (recepcion) {
							doc.font("Helvetica-Bold", 9)
							y = 33;
							if (recepcion.parabrisas_delantero) doc.text('X', 412, y);
							if (recepcion.limpia_parabrisas_delantero) doc.text('X', 583, y);
							if (recepcion.parabrisas_trasero) doc.text('X', 412, y + 12);
							if (recepcion.limpia_parabrisas_trasero) doc.text('X', 583, y + 12);
							if (recepcion.ventanas_delanteras) doc.text('X', 412, y + 24);
							if (recepcion.ventanas_traseras) doc.text('X', 583, y + 24);
							if (recepcion.vidrio_techo_solar) doc.text('X', 412, y + 36);
							if (recepcion.encendedor) doc.text('X', 583, y + 36);
							if (recepcion.radio) doc.text('X', 412, y + 48);
							if (recepcion.antena) doc.text('X', 583, y + 48);
							if (recepcion.retrovisor) doc.text('X', 412, y + 60);
							if (recepcion.emblema) doc.text('X', 583, y + 60);
							if (recepcion.llanta_auxilio) doc.text('X', 412, y + 72);
							if (recepcion.tapa_cubos) doc.text('X', 583, y + 72);
							if (recepcion.tapa_valvulas) doc.text('X', 412, y + 84);
							if (recepcion.herramientas) doc.text('X', 583, y + 84);
							if (recepcion.gata) doc.text('X', 412, y + 96);
							if (recepcion.tapa_tanque_combustible) doc.text('X', 583, y + 96);
							if (recepcion.faroles_delanteros) doc.text('X', 412, y + 108);
							if (recepcion.stops) doc.text('X', 583, y + 108);
							if (recepcion.guiniadores) doc.text('X', 412, y + 120);
							if (recepcion.sobrepisos) doc.text('X', 583, y + 120);
							doc.font("Helvetica", 7)
							if (recepcion.otros) doc.text(recepcion ? '               ' + recepcion.otros.toUpperCase() : '', 253, y + 130);
						}

						doc.text(mantenimiento.fecha_hora_inicio ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_inicio) : '', 45, 201, { width: 68.33, align: 'center' });
						doc.text(mantenimiento.fecha_hora_fin ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_fin) : '', 113.33, 201, { width: 68.33, align: 'center' });
						doc.text(mantenimiento.observacion ? '                                  ' + mantenimiento.observacion.toUpperCase() : '', 184, 188);

						// DATOS DE TRABAJOS A REALIZAR
						y = 210;
						x = 45;
						doc.lineWidth(0.5).rect(x, y, 547, 12).stroke();
						doc.lineWidth(0.5).rect(x + 20, y, 0, 12).stroke();
						doc.lineWidth(0.5).rect(x + 185, y, 0, 12).stroke();
						doc.font('Helvetica-Bold', 7).fillColor('#000')
						doc.fillColor('#000').text('N°', 45, y + 3, { width: 20, align: 'center' });
						doc.fillColor('#000').text('TRABAJO', 65, y + 3, { width: 185, align: 'center' });
						doc.fillColor('#000').text('DETALLE', 250, y + 3, { width: 297, align: 'center' });
						doc.rect(x, y + 12, 547, 550).stroke();

						var manosDeObra = datos.mantenimiento.manosDeObra
						if (manosDeObra.length > 0) {
							y = 222;
							for (var i = 0; i < manosDeObra.length; i++) {
								var manoDeObra = manosDeObra[i];
								var numLineasEnFila = 1;
								let especialidad = manoDeObra.especialidad ? manoDeObra.especialidad.padre ? manoDeObra.especialidad.padre.nombre : null : null;
								var trabajo = manoDeObra.nombre ? manoDeObra.nombre : manoDeObra.especialidad.nombre;
								if (especialidad) trabajo = especialidad + ': ' + trabajo;
								var detalle = manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado : "";
								trabajo.length > 40 ? numLineasEnFila++ : '';
								let lines = detalle.split(/\r*\n/).length;
								lines > numLineasEnFila ? numLineasEnFila += lines - numLineasEnFila : '';

								var h_cuadro = 0;
								numLineasEnFila > 1 ? h_cuadro += (6 * numLineasEnFila) + 12 : h_cuadro += 12;
								var mfechafin = "";
								if (manoDeObra.fecha_fin) {
									mfechafin = " AL " + $scope.formatoFechaPDF(manoDeObra.fecha_fin);
								}
								var fechasM = "";
								if (manoDeObra.fecha_inicio) {
									fechasM = " DEL " + $scope.formatoFechaPDF(manoDeObra.fecha_inicio) + mfechafin;
								}
								var textTrabajo = detalle + fechasM;
								doc.font("Helvetica", 7).text(i + 1, 48, y + 3, { width: 17 });
								doc.font("Helvetica", 7).text(trabajo.toUpperCase(), 67, y + 3, { width: 164 });
								doc.font("Helvetica-Oblique", 7).text(textTrabajo.toUpperCase(), 232, y + 3, { width: 314 });
								doc.lineWidth(0.5).rect(x, y, 547, h_cuadro).stroke();
								doc.lineWidth(0.5).rect(x + 20, y, 0, h_cuadro).stroke();
								doc.lineWidth(0.5).rect(x + 185, y, 0, h_cuadro).stroke();
								y += 12;
								if (y >= 740) {
									doc.addPage({ compress: false, size: [612, 936], margin: 0, bufferPages: true });
									y = 370;
									doc.text('PENDIENTE DE DESARROLLO, INFORMAR CARACTERISTICAS PARA LA 2DA HOJA', 0, y, { width: 612, align: 'center' });
								}
							}
						}
						/* if (y_cuadro >= 760) {
							doc.addPage({ compress: false, size: 'letter', margin: 20, bufferPages: true });
						} */
						doc.lineWidth(0.1);
						doc.rect(140, 760, 130, 0).stroke();
						doc.text('RECIBIDO POR', 140, 763, { width: 130, align: 'center' });
						doc.rect(370, 760, 130, 0).stroke();
						doc.text('RESPONSABLE', 370, 763, { width: 130, align: 'center' });
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});

					})
				})
			}

			$scope.imprimirOTExterno = function (mantenimiento) {
				var promesa = ObtenerDatosVehiculo($scope.usuario.id_empresa, mantenimiento.id)
				promesa.then(function (datos) {
					convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
						var mantenimiento = datos.mantenimiento;
						if (mantenimiento.producto) {
							mantenimiento.vehiculo = mantenimiento.producto
							mantenimiento.placa = mantenimiento.producto.codigo
						}
						var doc = new PDFDocument({ compress: false, size: [612, 936], margin: 10 });
						var stream = doc.pipe(blobStream());
						doc.lineWidth(0.5);
						// draw some text
						var y = 120, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(mantenimiento.length / itemsPorPagina);;
						$scope.dibujarCabeceraPDFReporteOT(doc, mantenimiento, pagina, totalPaginas, imagenEmpresa);
						var index = 1;
						var y_texto = 317;
						var y_cuadro = 310;
						if (mantenimiento.mantenimiento_externo) {
							if (mantenimiento.tipoMantenimiento.nombre_corto == "MECA") {
								doc.font("Helvetica-Bold", 8)
								doc.rect(40, y_cuadro, 15, 15).stroke();
								doc.text("Nº", 40, y_texto, { width: 15, align: 'center' });
								doc.rect(55, y_cuadro, 170, 15).stroke();
								doc.text("TRABAJO", 55, y_texto, { width: 170, align: 'center' });
								doc.rect(225, y_cuadro, 375, 15).stroke();
								doc.text("DETALLE", 225, y_texto, { width: 375, align: 'center' });
								doc.font('Helvetica', 8);
								y_cuadro = y_cuadro + 15;
								y_texto = y_cuadro + 7
								for (var i = 0; i < mantenimiento.manosDeObra.length; i++) {
									var manoDeObra = mantenimiento.manosDeObra[i];
									var numLineasEnFila1 = 1
									var especialidad = manoDeObra.especialidad ? manoDeObra.especialidad.padre ? manoDeObra.especialidad.padre.nombre : null : null;
									var trabajo = manoDeObra.nombre ? manoDeObra.nombre : manoDeObra.especialidad.nombre;
									var detalle = manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado : "";
									if (especialidad) trabajo = especialidad + ': ' + trabajo;
									if (trabajo.length > 40) {
										numLineasEnFila1 = Math.ceil(trabajo.length / 40);
									}
									var trs = detalle.split(/\r*\n/);
									var numLineasEnFila2 = 0
									for (let j = 0; j < trs.length; j++) {
										if (trs[j].length > 88) {
											numLineasEnFila2 += Math.ceil(trs[j].length / 88);
										} else {
											numLineasEnFila2 += 1;
										}
									}

									var numLineasEnFila
									numLineasEnFila2 > numLineasEnFila1 ? numLineasEnFila = numLineasEnFila2 : numLineasEnFila = numLineasEnFila1;

									var h_cuadro = 0;
									numLineasEnFila > 1 ? h_cuadro += (8 * numLineasEnFila) + 15 : h_cuadro += 15;


									var mfechafin = "";
									if (manoDeObra.fecha_fin) {
										mfechafin = " A " + $scope.formatoFechaPDF(manoDeObra.fecha_fin);
									}
									var fechasM = "";
									if (manoDeObra.fecha_inicio) {
										fechasM = " DE " + $scope.formatoFechaPDF(manoDeObra.fecha_inicio) + mfechafin;
									}
									var textTrabajo = detalle + fechasM;
									doc.rect(40, y_cuadro, 15, h_cuadro).stroke();
									doc.rect(55, y_cuadro, 170, h_cuadro).stroke();
									doc.rect(225, y_cuadro, 375, h_cuadro).stroke();
									doc.font("Helvetica", 7).text(index, 45, y_texto);
									doc.font("Helvetica", 7).text(trabajo.toUpperCase(), 58, y_texto, { width: 167 });
									doc.font("Helvetica-Oblique", 7).text(textTrabajo.toUpperCase(), 230, y_texto);
									index = index + 1;
									y_cuadro += h_cuadro;
									y_texto = y_cuadro + 7
									items = items + 1;
									if (i === mantenimiento.manosDeObra.length - 1) y_cuadro += 25;
									if (y_cuadro >= 760) {
										doc.addPage({ compress: false, size: [612, 936], margin: 0, bufferPages: true });
										y = 120;
										items = 0;
										pagina = pagina + 1;
										y_texto = 317;
										y_cuadro = 310;
										$scope.dibujarCabeceraPDFReporteOT(doc, mantenimiento, pagina, totalPaginas, imagenEmpresa);
										doc.font("Helvetica-Bold", 8)
										doc.rect(40, y_cuadro, 15, 15).stroke();
										doc.text("Nº", 40, y_texto, { width: 15, align: 'center' });
										doc.rect(55, y_cuadro, 170, 15).stroke();
										doc.text("TRABAJO", 55, y_texto, { width: 170, align: 'center' });
										doc.rect(225, y_cuadro, 375, 15).stroke();
										doc.text("DETALLE", 225, y_texto, { width: 375, align: 'center' });
										doc.font('Helvetica', 8);
										y_cuadro = y_cuadro + 15;
										y_texto = y_cuadro + 7
										if (i === mantenimiento.manosDeObra.length - 1) y_cuadro += 25;
									}
								}
							} else {
								doc.font("Helvetica-Bold", 8)
								doc.rect(40, y_cuadro, 15, 15).stroke();
								doc.text("Nº", 40, y_texto, { width: 15, align: 'center' });
								doc.rect(55, y_cuadro, 170, 15).stroke();
								doc.text("TRABAJO", 55, y_texto, { width: 170, align: 'center' });
								doc.rect(225, y_cuadro, 375, 15).stroke();
								doc.text("DETALLE", 225, y_texto, { width: 375, align: 'center' });
								doc.font('Helvetica', 8);
								y_cuadro += 15;
								y_texto = y_cuadro + 7;
								var b = 0;
								for (var i = 0; i < mantenimiento.manosDeObra.length; i++) {
									var manoDeObra = mantenimiento.manosDeObra[i];
									var numLineasEnFila = 1;
									var especialidad = manoDeObra.especialidad ? manoDeObra.especialidad.padre ? manoDeObra.especialidad.padre.nombre : null : null;
									var trabajo = manoDeObra.nombre ? manoDeObra.nombre : manoDeObra.especialidad.nombre;
									if (especialidad) trabajo = especialidad + ': ' + trabajo;
									var detalle = manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado : "";
									trabajo.length > 40 ? numLineasEnFila++ : '';
									let lines = detalle.split(/\r*\n/).length;
									lines > numLineasEnFila ? numLineasEnFila += lines - numLineasEnFila : '';

									var h_cuadro = 0;
									numLineasEnFila > 1 ? h_cuadro += (7 * numLineasEnFila) + 15 : h_cuadro += 15;
									/*if(manoDeObra.especialidad.nombre.length>35){
										b = b + 1;
										h_cuadro = h_cuadro + 10;
									}

									if (b>=1 && i>=1) {
										var textomenor = mantenimiento.manosDeObra[i-1];
										if (textomenor.especialidad.nombre.length>35) {
											y_cuadro = y_cuadro + 10;
											y_texto = y_texto + 10;
										}
									}*/
									var mfechafin = "";
									if (manoDeObra.fecha_fin) {
										mfechafin = " A " + $scope.formatoFechaPDF(manoDeObra.fecha_fin);
									}
									var fechasM = "";
									if (manoDeObra.fecha_inicio) {
										fechasM = " DE " + $scope.formatoFechaPDF(manoDeObra.fecha_inicio) + mfechafin;
									}
									var textTrabajo = detalle + fechasM;
									doc.rect(40, y_cuadro, 15, h_cuadro).stroke();
									doc.rect(55, y_cuadro, 170, h_cuadro).stroke();
									doc.rect(225, y_cuadro, 375, h_cuadro).stroke();
									doc.font("Helvetica", 7).text(index, 40, y_texto, { width: 15, align: 'center' });
									doc.font("Helvetica", 7).text(trabajo.toUpperCase(), 58, y_texto, { width: 167 });
									doc.font("Helvetica-Oblique", 7).text(textTrabajo.toUpperCase(), 228, y_texto, { width: 372 });

									index = index + 1;
									y_cuadro += h_cuadro;
									y_texto = y_cuadro + 7
									items = items + 1;
									if (i === mantenimiento.manosDeObra.length - 1) y_cuadro += 25;
									if (y_cuadro >= 760) {
										doc.addPage({ compress: false, size: [612, 936], margin: 0, bufferPages: true });
										y = 120;
										items = 0;
										pagina = pagina + 1;
										y_texto = 317;
										y_cuadro = 310;
										$scope.dibujarCabeceraPDFReporteOT(doc, mantenimiento, pagina, totalPaginas, imagenEmpresa);
										doc.font("Helvetica-Bold", 8)
										doc.rect(40, y_cuadro, 15, 15).stroke();
										doc.text("Nº", 40, y_texto, { width: 15, align: 'center' });
										doc.rect(55, y_cuadro, 170, 15).stroke();
										doc.text("TRABAJO", 55, y_texto, { width: 170, align: 'center' });
										doc.rect(225, y_cuadro, 375, 15).stroke();
										doc.text("DETALLE", 225, y_texto, { width: 375, align: 'center' });
										doc.font('Helvetica', 8);
										y_cuadro = y_cuadro + 15;
										y_texto = y_cuadro + 7
										if (i === mantenimiento.manosDeObra.length - 1) y_cuadro += 25;
									}
								}
							}
						} else {
							for (var i = 0; i < mantenimiento.manosDeObra.length; i++) {
								var manoDeObra = mantenimiento.manosDeObra[i];
								doc.text(index, 45, y_texto);
								doc.rect(40, y_cuadro, 15, 15).stroke();
								doc.text(manoDeObra.nombre.toUpperCase(), 60, y_texto);
								doc.rect(55, y_cuadro, 170, 15).stroke();
								doc.rect(225, y_cuadro, 375, 15).stroke();
								index = index + 1;
								y_cuadro = y_cuadro + 15;
								y_texto = y_cuadro + 7;
								items = items + 1;
								if (items == itemsPorPagina) {
									doc.addPage({ compress: false, size: [612, 936], margin: 0, bufferPages: true });
									y = 120;
									items = 0;
									y_texto = 317;
									y_cuadro = 310;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFReporteOT(doc, mantenimiento, pagina, totalPaginas, imagenEmpresa);
									doc.font('Helvetica', 8);
								}
							}
						}
						mantenimiento.manosDeObra.length > 0 ? y_cuadro -= 25 : '';
						doc.font('Helvetica', 7);
						doc.text("TOTAL", 525, y_cuadro + 5);
						doc.text("A CTA.", 525, y_cuadro + 20);
						doc.text("SALDO", 525, y_cuadro + 35);
						doc.lineWidth(0.5);
						doc.rect(520, y_cuadro, 80, 45).stroke();
						// colocar saldo y importe
						doc.text(mantenimiento.estado.nombre == 'FINALIZADO'?mantenimiento.importe_facturado:"", 555, y_cuadro + 5);
						var aCuenta = "";
						if (mantenimiento.estado.nombre == 'FINALIZADO') {
							aCuenta=mantenimiento.a_cuenta
						}else{
							aCuenta = mantenimiento.a_cuenta>0?mantenimiento.a_cuenta:""
						}
						doc.text(aCuenta, 555, y_cuadro + 20);
						doc.text(mantenimiento.estado.nombre == 'FINALIZADO'?mantenimiento.saldo:"", 555, y_cuadro + 35);
						doc.rect(550, y_cuadro, 0, 45).stroke();
						doc.lineWidth(0.2)
						doc.rect(520, y_cuadro + 15, 80, 0).stroke();
						doc.rect(520, y_cuadro + 30, 80, 0).stroke();

						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
					});
				})
			}

			$scope.dibujarCabeceraPDFReporteOT = function (doc, mantenimiento, pagina, totalPaginas, imagenEmpresa) {
				doc.image(imagenEmpresa, 50, 40, { fit: [150, 200] });
				doc.font("Helvetica-Bold", 14)
				if (mantenimiento.tipoMantenimiento.nombre_corto == "CHAP") {
					doc.text("ORDEN DE CHAPERIA", 40, 157, { width: 210, align: 'center' });
				} else {
					doc.text("ORDEN DE MECÁNICA", 40, 157, { width: 210, align: 'center' });
				}
				doc.font("Helvetica-Bold", 8)
				doc.text("INVENTARIO DE RECEPCIÓN", 350, 30);
				doc.font("Helvetica", 7)
				doc.text("PARABRISAS DELANTERO", 255, 45);
				doc.text("PARABRISAS TRASERO", 255, 60);
				doc.text("VENTANAS DELANTERAS", 255, 75);
				doc.text("VIDRIO TECHO SOLAR", 255, 90);
				doc.text("RADIO", 255, 105);
				doc.text("RETROVISORES", 255, 120);
				doc.text("LLANTA DE AUXILIO", 255, 135);
				doc.text("TAPA VALVULAS", 255, 150);
				doc.text("GATA", 255, 165);
				doc.text("FAROLES DELANTEROS", 255, 180);
				doc.text("GUIÑADORES", 255, 195);

				doc.text("LIMPIA PARABRISAS DELANTERO", 430, 45);
				doc.text("LIMPIA PARABRISAS TRASERO", 430, 60);
				doc.text("VENTANAS TRASERAS", 430, 75);
				doc.text("ENCENDEDOR", 430, 90);
				doc.text("ANTENA", 430, 105);
				doc.text("EMBLEMA", 430, 120);
				doc.text("TAPA CUBOS", 430, 135);
				doc.text("HERRAMIENTAS", 430, 150);
				doc.text("TAPA TANQUE COMBUSTIBLE", 430, 165);
				doc.text("STOPS", 430, 180);
				doc.text("SOBREPISOS", 430, 195);

				doc.rect(250, 40, 350, 165).stroke();
				doc.rect(410, 40, 15, 165).stroke();
				doc.rect(585, 40, 15, 165).stroke();
				doc.lineWidth(0.2);
				doc.rect(250, 55, 350, 0).stroke();
				doc.rect(250, 70, 350, 0).stroke();
				doc.rect(250, 85, 350, 0).stroke();
				doc.rect(250, 100, 350, 0).stroke();
				doc.rect(250, 115, 350, 0).stroke();
				doc.rect(250, 130, 350, 0).stroke();
				doc.rect(250, 145, 350, 0).stroke();
				doc.rect(250, 160, 350, 0).stroke();
				doc.rect(250, 175, 350, 0).stroke();
				doc.rect(250, 190, 350, 0).stroke();



				doc.font("Helvetica-Bold", 9)
				doc.text("O.T N°", 213, 45)
				doc.text("N° Manual", 203, 75)
				doc.lineWidth(0.5).rect(200, 40, 50, 60);

				doc.lineWidth(0.2).rect(200, 55, 50, 0);
				doc.lineWidth(0.2).rect(200, 70, 50, 0);
				doc.lineWidth(0.2).rect(200, 85, 50, 0);



				doc.font("Helvetica-Bold", 7)
				doc.text("OTROS:", 255, 212);
				doc.lineWidth(0.5);
				doc.rect(250, 205, 350, 45).stroke();

				doc.font("Helvetica-Bold", 7)
				doc.text("NOMBRE:", 45, 212);
				doc.rect(40, 205, 210, 15).stroke();
				doc.text("TELEFONO:", 45, 227);
				doc.rect(40, 220, 100, 15).stroke();
				doc.text("CEL:", 145, 227);
				doc.rect(140, 220, 110, 15).stroke();
				doc.text("MECÁNICO:", 45, 242);
				doc.rect(40, 235, 120, 15).stroke();
				doc.text("TIPO:", 165, 242);
				doc.rect(160, 235, 90, 15).stroke();

				doc.text("MARCA", 40, 257, { width: 90, align: 'center' });
				doc.rect(40, 250, 90, 15).stroke();
				doc.text("CHASIS", 130, 257, { width: 90, align: 'center' });
				doc.rect(130, 250, 90, 15).stroke();
				doc.text("MODELO", 220, 257, { width: 60, align: 'center' });
				doc.rect(220, 250, 60, 15).stroke();
				doc.text("PLACA", 280, 257, { width: 60, align: 'center' });
				doc.rect(280, 250, 60, 15).stroke();
				doc.text("COLOR", 340, 257, { width: 70, align: 'center' });
				doc.rect(340, 250, 70, 15).stroke();
				doc.text("KM/MILL", 410, 257, { width: 50, align: 'center' });
				doc.rect(410, 250, 50, 15).stroke();
				doc.text("AÑO", 460, 257, { width: 40, align: 'center' });
				doc.rect(460, 250, 40, 15).stroke();
				doc.text("TANQUE DE GASOLINA", 500, 257, { width: 100, align: 'center' });
				doc.rect(500, 250, 100, 15).stroke();

				doc.text("FECHA INGRESO AL TALLER", 40, 287, { width: 110, align: 'center' });
				doc.rect(40, 280, 110, 15).stroke();
				doc.text("FECHA SALIDA DEL TALLER", 150, 287, { width: 110, align: 'center' });
				doc.rect(150, 280, 110, 15).stroke();
				doc.text("OBSERVACIONES: ", 265, 287, { width: 335 });
				doc.rect(260, 280, 340, 30).stroke();
				doc.font("Helvetica-Bold", 8)

				doc.rect(40, 310, 560, 606).stroke();

				doc.lineWidth(12)
				doc.lineJoin('round').rect(105, 785, 65, 15).fillAndStroke("#032751", "#032751");
				doc.lineWidth(0.5);
				doc.rect(40, 779.26, 70, 32).fillAndStroke("#032751", "#032751");
				doc.rect(40, 800, 560, 45).fillAndStroke("#032751", "#032751");
				doc.lineWidth(1);
				doc.lineJoin('round').rect(57, 785, 113, 15).fillAndStroke("#032751", "#fff");
				doc.fillAndStroke("#000", "#000")
				doc.font("Helvetica-Bold", 15);
				doc.fillColor('#fff').text("IMPORTANTE", 64, 787);

				doc.font("Helvetica-Bold", 8)
				doc.text("» Al firmar la presente ORDEN DE TRABAJO, Usted como cliente esta autorizando a que se realicen los trabajos.", 55, 808);
				doc.text("» Despues de 15 días de concluido el trabajo. La empresa se reserva el derecho a cobrar 10 Bs. por día de uso del parqueo.", 55, 820);
				doc.text("» La empresa no se responsabiliza por artículos o efectos no declarados, revise su vehículo al momento de retirarlo.", 55, 832);
				doc.fillColor('#000');

				doc.lineWidth(0.1);
				doc.rect(140, 900, 130, 0).stroke();
				doc.text('RECIBIDO POR', 140, 903, { width: 130, align: 'center' });
				doc.rect(370, 900, 130, 0).stroke();
				doc.text('CLIENTE', 370, 903, { width: 130, align: 'center' });
				doc.lineWidth(0.5);

				doc.font("Helvetica", 8)
				doc.text(mantenimiento.correlativo_ot, 200, 60, { width: 50, align: 'center' });
				if (mantenimiento.numero_manual >= 1000) {
					doc.text(mantenimiento.numero_manual, 200, 90, { width: 50, align: 'center' });
				} else {
					doc.text(mantenimiento.numero_manual, 200, 90, { width: 50, align: 'center' });
				}


				doc.font("Helvetica-Bold", 7)
				var parabrisas_delantero = mantenimiento.InventariosRecepcion.parabrisas_delantero == true ? "X" : "";
				doc.text(parabrisas_delantero, 415, 45);
				var limpia_parabrisas_delantero = mantenimiento.InventariosRecepcion.limpia_parabrisas_delantero == true ? "X" : "";
				doc.text(limpia_parabrisas_delantero, 590, 45);
				var parabrisas_trasero = mantenimiento.InventariosRecepcion.parabrisas_trasero == true ? "X" : "";
				doc.text(parabrisas_trasero, 415, 60);
				var limpia_parabrisas_trasero = mantenimiento.InventariosRecepcion.limpia_parabrisas_trasero == true ? "X" : "";
				doc.text(limpia_parabrisas_trasero, 590, 60);
				var ventanas_delanteras = mantenimiento.InventariosRecepcion.ventanas_delanteras == true ? "X" : "";
				doc.text(ventanas_delanteras, 415, 75);
				var ventanas_traseras = mantenimiento.InventariosRecepcion.ventanas_traseras == true ? "X" : "";
				doc.text(ventanas_traseras, 590, 75);
				var vidrio_techo_solar = mantenimiento.InventariosRecepcion.vidrio_techo_solar == true ? "X" : "";
				doc.text(vidrio_techo_solar, 415, 90);
				var encendedor = mantenimiento.InventariosRecepcion.encendedor == true ? "X" : "";
				doc.text(encendedor, 590, 90);
				var radio = mantenimiento.InventariosRecepcion.radio == true ? "X" : "";
				doc.text(radio, 415, 105);
				var antena = mantenimiento.InventariosRecepcion.antena == true ? "X" : "";
				doc.text(antena, 590, 105);
				var retrovisor = mantenimiento.InventariosRecepcion.retrovisor == true ? "X" : "";
				doc.text(retrovisor, 415, 120);
				var emblema = mantenimiento.InventariosRecepcion.emblema == true ? "X" : "";
				doc.text(emblema, 590, 120);
				var llanta_auxilio = mantenimiento.InventariosRecepcion.llanta_auxilio == true ? "X" : "";
				doc.text(llanta_auxilio, 415, 135);
				var tapa_cubos = mantenimiento.InventariosRecepcion.tapa_cubos == true ? "X" : "";
				doc.text(tapa_cubos, 590, 135);
				var tapa_valvulas = mantenimiento.InventariosRecepcion.tapa_valvulas == true ? "X" : "";
				doc.text(tapa_valvulas, 415, 150);
				var herramientas = mantenimiento.InventariosRecepcion.herramientas == true ? "X" : "";
				doc.text(herramientas, 590, 150);
				var gata = mantenimiento.InventariosRecepcion.gata == true ? "X" : "";
				doc.text(gata, 415, 165);
				var tapa_tanque_combustible = mantenimiento.InventariosRecepcion.tapa_tanque_combustible == true ? "X" : "";
				doc.text(tapa_tanque_combustible, 590, 165);
				var faroles_delanteros = mantenimiento.InventariosRecepcion.faroles_delanteros == true ? "X" : "";
				doc.text(faroles_delanteros, 415, 180);
				var stops = mantenimiento.InventariosRecepcion.stops == true ? "X" : "";
				doc.text(stops, 590, 180);
				var guiniadores = mantenimiento.InventariosRecepcion.guiniadores == true ? "X" : "";
				doc.text(guiniadores, 415, 195);
				var sobrepisos = mantenimiento.InventariosRecepcion.sobrepisos == true ? "X" : "";
				doc.text(sobrepisos, 590, 195);
				doc.font("Helvetica", 7)
				var otros = mantenimiento.InventariosRecepcion.otros != null ? mantenimiento.InventariosRecepcion.otros : '';
				doc.text(otros.toUpperCase(), 286, 212);

				doc.text(mantenimiento.cliente_ot.razon_social.toUpperCase(), 85, 212);
				doc.text(mantenimiento.cliente_ot.telefono1 != null ? mantenimiento.cliente_ot.telefono1 : '', 90, 227);
				doc.text(mantenimiento.cliente_ot.telefono2 != null ? mantenimiento.cliente_ot.telefono2 : '', 165, 227);

				doc.text(mantenimiento.vehiculo.marca ? mantenimiento.vehiculo.marca.toUpperCase() : '', 40, 270, { width: 90, align: 'center' });
				doc.rect(40, 265, 90, 15).stroke();
				doc.text(mantenimiento.vehiculo.chasis != null ? mantenimiento.vehiculo.chasis.toUpperCase() : '', 130, 270, { width: 90, align: 'center' });
				doc.rect(130, 265, 90, 15).stroke();
				doc.text(mantenimiento.vehiculo.modelo != null ? mantenimiento.vehiculo.modelo.toUpperCase() : '', 220, 270, { width: 60, align: 'center' });
				doc.rect(220, 265, 60, 15).stroke();
				doc.text(mantenimiento.vehiculo.placa != null ? mantenimiento.vehiculo.placa.toUpperCase() : '', 280, 270, { width: 60, align: 'center' });
				doc.rect(280, 265, 60, 15).stroke();
				doc.text(mantenimiento.vehiculo.color != null ? mantenimiento.vehiculo.color.toUpperCase() : '', 340, 270, { width: 70, align: 'center' });
				doc.rect(340, 265, 70, 15).stroke();
				doc.text(mantenimiento.km != null ? mantenimiento.km : '', 410, 270, { width: 50, align: 'center' });
				doc.rect(410, 265, 50, 15).stroke();
				doc.text(mantenimiento.vehiculo.anio != null ? mantenimiento.vehiculo.anio : '', 460, 270, { width: 40, align: 'center' });
				doc.rect(460, 265, 40, 15).stroke();




				if (mantenimiento.InventariosRecepcion.tamanioTanque != null) {
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T1") {
						doc.rect(500, 265, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/4", 500, 270, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/4", 500, 270, { width: 25, align: 'center' })
						doc.rect(500, 265, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T2") {
						doc.rect(525, 265, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/2", 525, 270, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/2", 525, 270, { width: 25, align: 'center' })
						doc.rect(525, 265, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T3") {
						doc.rect(550, 265, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("3/4", 550, 270, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("3/4", 550, 270, { width: 25, align: 'center' })
						doc.rect(550, 265, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T4") {
						doc.rect(575, 265, 25.25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("F", 575, 270, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("F", 575, 270, { width: 25, align: 'center' })
						doc.rect(575, 265, 25, 15).stroke();
					}
				} else {
					doc.rect(500, 265, 25, 15).stroke().text("1/4", 500, 270, { width: 25, align: 'center' })

					doc.rect(525, 265, 25, 15).stroke().text("1/2", 525, 270, { width: 25, align: 'center' })

					doc.rect(550, 265, 25, 15).stroke().text("3/4", 550, 270, { width: 25, align: 'center' })

					doc.rect(575, 265, 25, 15).stroke().text("F", 575, 270, { width: 25, align: 'center' })

				}


				doc.text(mantenimiento.fecha_hora_aviso != null ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_aviso) : '', 40, 302, { width: 110, align: 'center' });
				doc.rect(40, 295, 110, 15).stroke();
				doc.text(mantenimiento.fecha_hora_fin != null ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_fin) : '', 150, 302, { width: 110, align: 'center' });
				doc.rect(150, 295, 110, 15).stroke();
				doc.text(mantenimiento.observacion != null ? mantenimiento.observacion.toUpperCase() : "", 335, 287);
			}

			$scope.abrirEditarHistorico = function () {
				abrirPopup($scope.modalEditarHistorico)
			}

			$scope.abrirCheckListMensual = function () {
				abrirPopup($scope.modalCheckListMensual)
			}

			$scope.abrirCheckListDiario = function () {
				abrirPopup($scope.modalCheckListDiario)
			}

			$scope.abrirReportarIncidente = function () {
				abrirPopup($scope.modalReportarIncidente)
			}

			$scope.abrirNuevoMantenimiento = function () {
				// $scope.nuevoOt = {mantenimiento_externo:true};
				abrirPopup($scope.modalNuevoMantenimiento);
			}

			$scope.cerrarEventoCalendario = function () {
				$scope.cerrarPopup($scope.idModalEventoCalendario)
			}
			$scope.cerrarEditarEventoCalendario = function () {
				$scope.cerrarPopup($scope.idModalEditarEventoCalendario)
			}
			$scope.cerrarReportarIncidenteMaquinaria = function () {
				$scope.cerrarPopup($scope.modalReportarIncidenteMaquinaria)
			}

			$scope.cerrarBuscarMaquinaria = function () {
				$scope.cerrarPopup($scope.modalBuscarMaquinaria)
			}
			$scope.cerrarEditarCheckList = function () {
				$scope.cerrarPopup($scope.modalEditarCheckList)
			}

			$scope.cerrarFichaVehiculo = function () {
				$scope.cerrarPopup($scope.modalFichaVehiculo)
			}

			$scope.cerrarOTCalendar = function () {
				$scope.cerrarPopup($scope.modalCalendar)
			}

			$scope.cerrarProxMantenimientoVehiculos = function () {
				$scope.cerrarPopup($scope.modalProxMantenimientoVehiculo)
			}

			$scope.cerrarProxMantenimientoMaquinaria = function () {
				$scope.cerrarPopup($scope.modalProxMantenimientoMaquinaria)
			}

			$scope.cerrarEditarItemList = function () {
				$scope.cerrarPopup($scope.modalEditarItemList)
			}

			$scope.cerrarCheckListMensualMaquinaria = function () {
				$scope.cerrarPopup($scope.modalCheckListMensualMaquinaria)
			}

			$scope.cerrarNuevoMantenimientoMaquinaria = function () {
				$scope.cerrarPopup($scope.modalNuevoMantenimientoMaquinaria)
			}

			$scope.cerrarModalLogin = function () {
				$scope.cerrarPopup($scope.modalLogin)
			}

			$scope.cerrarBusquedaEncargado = function () {
				$scope.cerrarPopup($scope.modalBusquedaEncargado)
			}

			$scope.cerrarBusquedaProducto = function () {
				$scope.cerrarPopup($scope.modalBusquedaProducto)
			}

			$scope.cerrarMantenimientoCorrectivo = function () {
				$scope.cerrarPopup($scope.modalMantenimientoCorrectivo)
			}

			$scope.cerrarEditarHistorico = function () {
				$scope.cerrarPopup($scope.modalEditarHistorico)
			}

			$scope.cerrarCheckListMensual = function () {
				$scope.cerrarPopup($scope.modalCheckListMensual)
			}

			$scope.cerrarCheckListDiario = function () {
				$scope.cerrarPopup($scope.modalCheckListDiario)
			}

			$scope.cerrarReportarIncidente = function () {
				$scope.cerrarPopup($scope.modalReportarIncidente)
			}

			$scope.cerrarNuevoMantenimiento = function () {
				$scope.cerrarPopup($scope.modalNuevoMantenimiento)
			}


			$scope.enfocar = function (elemento) {
				$timeout(function () {
					$("#" + elemento).focus();
				}, 0);
			}

			$scope.tipoMantenimientoEmpresa = function () {
				var empresa = $scope.usuario.id_empresa;
				var promesa = tipoMantenimiento(empresa)
				promesa.then(function (res) {
					$scope.empresaEstadoMantenimiento = res[0].usar_mantenimiento_externo_propio;
				})
			}

			$scope.cambioExterno = function () {
				if ($scope.nuevoOt.mantenimiento_externo == false) {
					$scope.nuevoOt.propietario_vehiculo = "";
					$scope.nuevoOt.propietario_telefono = "";
					$scope.nuevoOt.propietario_celular = "";
				}
			}

			$scope.abrirDatosVehiculo = function () {
				$scope.abrirPopup($scope.idModalAgregarDatosVehiculo);

			}

			$scope.abrirDialogInicioMantenimiento = function () {
				$scope.nuevoOt={}
				if($scope.ordenTrabajoManoObra) $scope.ordenTrabajoManoObra={}
				if ($scope.usuario.sucursalesUsuario.length == 1) {
					var p = ClasesMantenimientoSucursal('MTM_TM', $scope.usuario.id_empresa, $scope.usuario.sucursalesUsuario[0].id_sucursal);
				} else {
					if ($scope.usuario.sucursalesUsuario.length > 0) {
						var p = ClasesMantenimientoSucursal('MTM_TM', $scope.usuario.id_empresa, 0);
					} else {
						$scope.tipoMantenimientos = {};
						SweetAlert.swal("Error", "El usuario no tiene asignado una sucursal", "danger");
					}
				}
				p.then(data => {
					$scope.tipoMantenimientos = data;
					blockUI.stop();
				});
				var mantenimientoHabilitado
				if($scope.usuario.empresa.usar_mantenimiento && $scope.usuario.empresa.usar_mantenimiento_externo_propio){
					mantenimientoHabilitado = $scope.configs.mantenimiento_default == "1" ? true: false;
				}else{
					if($scope.usuario.empresa.usar_mantenimiento_externo_propio){
						mantenimientoHabilitado = true
					}else{
						mantenimientoHabilitado = false
					}
				}
				let hoy =  new Date();
				let anio = hoy.getFullYear();
				let mes = hoy.getMonth() +1;
				let dia = hoy.getDate()
				let hora = hoy.getHours()
				let min = hoy.getMinutes()
				let tipo = "AM";
				if(hora > 12){
					hora-=12;
					tipo="PM"
				}
				var aviso = dia +"/"+mes+"/"+anio+" "+hora+":"+min+" "+tipo
				$scope.nuevoOt = {
					productoNoExistente: false,
					id_usuario: $scope.usuario.id,
					mantenimiento_externo: mantenimientoHabilitado,
					cliente_nuevo: false,
					id_usuario: $scope.usuario.id,
					fecha_hora_aviso: aviso,
					sucursal: $scope.sucursales[0],
					id_empresa: $scope.usuario.id_empresa,
					tipo_mantenimiento: "",
					sistemas: [],
					materiales: [],
					inventarios_recepcion: {},
					manosDeObra: [],
					serviciosExternos: [],
					datosVehiculoExterno: {},
					estado: $scope.estadosMantenimiento.find(function (x) {
						return x.nombre_corto == "PENDIENTE"
					})
				}

				$scope.abrirPopup($scope.idModalInicioMantenimiento);
			}

			$scope.cerrarDatosVehiculo = function () {

				$scope.cerrarPopup($scope.idModalAgregarDatosVehiculo);
			}

			$scope.guardarDatosDelVehiculoExterno = function (validor) {

				if (validor) {
					var datosVehiculo = $scope.nuevoOt.datosVehiculoExterno;
					var promesa = guardarDatosVehiculo(datosVehiculo);
					promesa.then(function (res) {
						$scope.nuevoOt.datosVehiculoExterno = res;
						$scope.cerrarDatosVehiculo();
					})

				}
			}

			$scope.cerrarPopUpInicioMantenimiento = function () {
				$scope.cerrarPopup($scope.idModalInicioMantenimiento);
			}

			$scope.abrirDialogOTnuevo = function (valido) {
				if ($scope.nuevoOt.mantenimiento_externo) {
					$scope.abrirPopup($scope.idModalOTNuevo);
					$scope.cerrarPopUpInicioMantenimiento();
				} else {
					if ($scope.nuevoOt.vehiculo.id) {
						$scope.abrirPopup($scope.idModalOTNuevo);
						$scope.nuevoOt.productoNoExistente = false
					} else {
						$scope.nuevoOt.productoNoExistente = true
					}
				}
				$scope.ordenTrabajoManoObra = { edit: false }
				/* 	
				var id_usuario = $scope.usuario.id;
				if (valido && $scope.nuevoOt.vehiculo.id != undefined && $scope.nuevoOt.mantenimiento_externo == false) {
					$scope.ordenTrabajoManoObra = { edit: false }
					console.log($scope.ordenTrabajoManoObra)
					$scope.nuevoOt.id_usuario = id_usuario;
					$scope.cerrarPopUpInicioMantenimiento()
					$scope.abrirPopup($scope.idModalOTNuevo);
				} else if (valido && $scope.nuevoOt.vehiculo.id != undefined && $scope.nuevoOt.mantenimiento_externo == true) {
					$scope.ordenTrabajoManoObra = { edit: false }
					console.log($scope.ordenTrabajoManoObra)
					if (!$scope.nuevoOt.sucursal) {
						$scope.nuevoOt.sucursal = {};
						$scope.nuevoOt.id_usuario = id_usuario;
						$scope.nuevoOt.sucursal.id = $scope.nuevoOt.vehiculo.sucursal;
						$scope.nuevoOt.sucursal.numero_correlativo_ot = $scope.nuevoOt.vehiculo.numero_correlativo_ot;
					}
					$scope.nuevoOt.vehiculo.nombre = $scope.nuevoOt.vehiculo.marca + "-" + $scope.nuevoOt.vehiculo.modelo;
					$scope.nuevoOt.vehiculo.codigo = $scope.nuevoOt.vehiculo.placa;
					$scope.nuevoOt.datosVehiculoExterno.id = $scope.nuevoOt.vehiculo.id_vehiculo;
					$scope.cerrarPopUpInicioMantenimiento()
					$scope.abrirPopup($scope.idModalOTNuevo);
				} else if (valido && $scope.nuevoOt.vehiculo.id == undefined && $scope.nuevoOt.mantenimiento_externo == true && $scope.nuevoOt.datosVehiculoExterno.marca != undefined) {
					$scope.ordenTrabajoManoObra = { edit: false }
					console.log($scope.ordenTrabajoManoObra)
					$scope.nuevoOt.id_usuario = id_usuario;
					var empresa = $scope.usuario.id_empresa;
					$scope.nuevoOt.id_empresa = empresa;
					var promesa = guardarClienteMantenimiento($scope.nuevoOt);
					promesa.then(function (res) {
						var id_cliente = res.id;
						$scope.nuevoOt.id_cliente = id_cliente;
						$scope.cerrarPopUpInicioMantenimiento()
						$scope.abrirPopup($scope.idModalOTNuevo);
					});
				} else {
					$scope.mostrarMensaje("No existe el vehículo o maquinaria.!", "Alerta")
					$scope.nuevoOt.vehiculo = undefined;
					$scope.nuevoOt.tipo_mantenimiento = undefined;
					$scopenuevoOt.propietario_vehiculo = undefined;
					$scopenuevoOt.propietario_telefono = undefined;
					$scope.nuevoOt.propietario_celular = undefined;
					$scope.nuevoOt.datosVehiculoExterno = {};
					$scope.nuevoOt.mantenimiento_externo = false;
				} */
			}
			$scope.cerrarOTnuevo = function () {
				$scope.adicionGrupal = false
				$scope.grupalEspecialidades = []
				$scope.cerrarPopup($scope.idModalOTNuevo);
			}
			$scope.abrirDialogFacturaServicioExterno = function (servicioExterno) {
				$scope.edicionServicioExterno = servicioExterno
				$scope.abrirPopup($scope.idModalFacturaServicioExterno);
			}
			$scope.cerrarDialogFacturaServicioExterno = function () {
				$scope.cerrarPopup($scope.idModalFacturaServicioExterno);
			}
			$scope.abrirDialogRepuestosOT = function () {
				$scope.venta = {

					detallesVenta: []
				}
				$scope.venta.sucursal = $scope.sucursales.length == 1 ? $scope.sucursales[0] : null;
				if ($scope.venta.sucursal) {
					if ($scope.venta.almacen == null) {
						$scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
					}
				}
				$scope.abrirPopup($scope.idModaRepuestosOT);
			}
			$scope.cerrarDialogRepuestosOT = function () {
				$scope.cerrarPopup($scope.idModaRepuestosOT);
			}


			$scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
				if (keyEvent.which === 13) {
					if (esEnfocar) {
						$scope.enfocar(elemento)
					} else {
						$timeout(function () {
							$('#' + elemento).trigger('click');
						}, 0);
					}
				}
			}


			//funciones PAGINADOR
			$scope.obtenerListaVehiculos = function () {
				blockUI.start();
				$scope.paginator.isAdmin = $scope.isAdmin;
				var promise = VehiculosPaginador($scope.paginator, $scope.usuario.id);
				$scope.totalImporte = 0;
				promise.then(function (data) {
					$scope.paginator.setPages(data.paginas);
					$scope.mantenimientos = data.mantenimientos;
					blockUI.stop();
				});
			}
			$scope.ObteneVehiculos = function (filtro) {
				$scope.paginator = Paginator();
				$scope.paginator.column = "fecha_hora_aviso";
				$scope.paginator.direction = "DESC";
				$scope.paginator.callBack = $scope.obtenerListaVehiculos;
				if (filtro) {
					$scope.filtro = filtro
					if($scope.filtro.tipo_activo == undefined) $scope.filtro.tipo_activo = 0
					$scope.filtro.inicio = ($scope.filtro.inicio2 != "") ? new Date($scope.convertirFecha($scope.filtro.inicio2)) : ""
					$scope.filtro.fin = ($scope.filtro.fin2 != "") ? new Date($scope.convertirFecha($scope.filtro.fin2)) : ""
				}else{
					$scope.filtro = {
						empresa: $scope.usuario.id_empresa, inicio: "", fin: "", inicio2: "", fin2: "", tipo_activo: 0,
						placa: "",
						marca: "",
						modelo: "",
						anio: "",
						tipo_mantenimiento: 0,
						numero_ot: "",
						estado_ot: "",
						campamento: "",
						sucursal: "",
						internoExterno: $scope.configs.mantenimiento_default === "1" ? true : false
					};
				}
				$scope.paginator.getSearch("", $scope.filtro, null);
			}

			$scope.obtenerColumnasAplicacion = function () {
				$scope.fieldViewer = FieldViewer({
					crear: false,
					id_empresa: $scope.usuario.id_empresa,
					configuracion: {
						cod_usuario: { value: "Cod-Usuario", show: true },
						fecha: { value: "Fecha.", show: true },
						anio: { value: "año", show: true },
						imagen: { value: "Imagen", show: false },
						ot: { value: "OT", show: true },
						estado_OT: { value: "Estado-OT", show: true },
						Tipo_de_activo: { value: "Tipo-de-activo", show: true },
						km: { value: "Km", show: true },
						usuario: { value: "Usuario", show: true },
						marca: { value: "Marca", show: true },
						modelo: { value: "Modelo", show: true },
						placa: { value: "Placa", show: true },
						mantenimiento: { value: "Manteniminto", show: true },
						campamento: { value: "Campamento", show: true },
						numero_manual: { value: "Nro. manual", show: true }
					},
				}, $scope.aplicacion.aplicacion.id);
				$scope.fieldViewer.updateObject();
			}
			//FUNCONES MODAL NUEVO OT
			$scope.establecervehiculo = function (producto) {
				$scope.nuevoOt.productoNoExistente = false
				var o = ObtenerVehiculoProducto($scope.usuario.empresa.id, producto.id)
				o.then(data => {
					if (!data.hasError) {
						if (data.vehiculo == null) {
							$scope.nuevoOt.productoNoExistente = true
						} else {
							$scope.nuevoOt.vehiculo = data.vehiculo;
							$scope.nuevoOt.vehiculo.codigo = data.vehiculo.placa;
						}
					}
					else {
						$scope.nuevoOt.productoNoExistente = true
					}
				})
				o.catch(e => {
					$scope.nuevoOt.vehiculo = producto;
				})
			}
			$scope.establecervehiculoExterno = function (vehiculo) {
				$scope.nuevoOt.vehiculo = vehiculo;
				var promesa = BuscarRegistroOtsVehiculo(vehiculo.id)
				promesa.then(function (data) {
					if (data.ultimoRegistroOT) {
						$scope.nuevoOt.cliente_ot = data.ultimoRegistroOT.cliente_ot
						$scope.nuevoOt.nit_cli = data.ultimoRegistroOT.cliente_ot.nit
					}
				})
			}
			$scope.establecerEncargado = function (producto) {
				$scope.ordenTrabajoManoObra.encargado = producto;
			}
			//autocompletar vehiculo interno
			$scope.buscarVehiculos = function (query) {
				if (query != "" && query != undefined) {
					blockUI.start();
					var promesa = ListaMantenimientoVehiculo($scope.usuario.id_empresa, query);
					var p = promesa.then(function (data) {
						if (data.length == 1) {
							$scope.establecervehiculo(data[0])
							$scope.enfocar("id_tipo_mantenimiento")
							return []
						} else if (data.length == 0) {
							$scope.nuevoOt.productoNoExistente = true
						}
						else {
							return promesa
						}
					})
					blockUI.stop();
					return p;

				}
			}
			/* buscar clientes */
			$scope.buscarCliente = async function (query) {
				$scope.nuevoOt.cliente_nuevo = false
				if (query != "" && query != undefined) {
					var dato = await ClientesNit($scope.usuario.id_empresa, query);

					if (dato.length == 1) {
						$scope.nuevoOt.nit_cli = parseInt(query)
						$scope.establecerCliente(dato[0])
						$scope.enfocar('nuevaot-telf');
						return []
					} if (dato.length == 0) {
						$scope.nuevoOt.cliente_nuevo = true
						if (isNaN(parseInt(query))) {
							$scope.nuevoOt.cliente_ot = { razon_social: query, nit: $scope.nuevoOt.nit_cli }
							if ($scope.nuevoOt.nit_cli) {
								$scope.enfocar('nuevaot-telf');
							} else {
								$scope.enfocar('nuevaot-nit-cli');
							}
						} else {
							$scope.nuevoOt.nit_cli = parseInt(query)
							$scope.nuevoOt.cliente_ot = { nit: parseInt(query), razon_social: "" }
						}

						return dato;
					} else {
						return dato;
					}
				};
			}
			$scope.establecerCliente = function (cliente) {
				$scope.nuevoOt.cliente_ot = cliente;
				$scope.nuevoOt.nit_cli = cliente.nit
			}
			/*  buscar clientes */
			//autompletar vehiculo externo
			$scope.buscarVehiculosExterno = function (query) {

				if (query != "" && query != undefined) {
					blockUI.start();
					var promesa = ListaMantenimientoVehiculoExterno($scope.usuario.id_empresa, query);
					var p = promesa.then(function (data) {
						if (data.length == 1) {
							$scope.establecervehiculoExterno(data[0])
							$scope.enfocar("id_tipo_mantenimientoEx")
							return []
						} else if (data.length == 0) {
							$scope.nuevoOt.vehiculo = { placa: query }
							$scope.abrirDatosVehiculo()
							return promesa
						} else {
							return promesa
						}
					})
					blockUI.stop();
					return p;

				}
			}

			$scope.buscarEncargado = function (query) {

				if (query != "" && query != undefined) {
					var promesa = ListaMantenimientoEncargado($scope.usuario.id_empresa, query);
					/*promesa.then(function(data){
						console.log(data)
					})*/
					return promesa;
				}
			}
			$scope.buscarProducto = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ListaProductosMantenimiento($scope.venta.almacen.id, query);
					return promesa;
				}

			}
			//fin autocompletar
			//funciones modal solicitudes de respuesta e insumos
			$scope.establecerProducto = function (producto) {
				producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
				$scope.editar_precio = false;
				var promesa = ListaInventariosProducto(producto.id, $scope.venta.almacen.id);
				promesa.then(function (inventarios) {
					producto.inventarios = inventarios;
					for (var i = 0; i < producto.inventarios.length; i++) {
						producto.inventarios[i].fecha_vencimiento = (producto.inventarios[i].fecha_vencimiento ? new Date(producto.inventarios[i].fecha_vencimiento) : null);
						producto.inventarios[i].fechaVencimientoTexto = (producto.inventarios[i].fecha_vencimiento ? producto.inventarios[i].fecha_vencimiento.getDate() + "/" + (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + producto.inventarios[i].fecha_vencimiento.getFullYear() : "");
						producto.inventarios[i].detallesMovimiento[0].movimiento.fecha = new Date(producto.inventarios[i].detallesMovimiento[0].movimiento.fecha);
						producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto = producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getDate() + "/" + (producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getMonth() + 1) + "/" + producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getFullYear();
					}
					$scope.inventariosDisponibleProducto = [];
					$scope.inventariosDisponibleProducto.push({ id: 0, fecha_vencimiento: "TODOS", fechaVencimientoTexto: "TODOS" });
					$scope.inventariosDisponibleProducto = $scope.inventariosDisponibleProducto.concat(producto.inventarios);
					var inventarioDisponible = $scope.obtenerInventarioTotal(producto);
					$scope.detalleVenta = {
						producto: producto, precio_unitario: producto.precio_unitario, inventarioProducto: $scope.inventariosDisponibleProducto[0],
						inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
						cantidad: 1, descuento: producto.descuento, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
					};
					$scope.colorearInventarioDisponible(inventarioDisponible, producto);
					$scope.calcularImporte();
					$scope.cerrarPopup($scope.idModalInventario);
					$scope.enfocar('cantidad');
				});
			}
			$scope.obtenerInventarioTotalPorFechaVencimiento = function (detalleVenta) {
				var cantidadTotal = detalleVenta.inventarioProducto.cantidad;
				for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
					if ($scope.venta.detallesVenta[j].producto.id == detalleVenta.producto.id && $scope.venta.detallesVenta[j].costos[0].id == detalleVenta.inventarioProducto.id) {
						cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
					}
				}
				return cantidadTotal;
			}
			$scope.sumarTotal = function () {
				var sumaTotal = 0;
				var sumaTotalCosto = 0;
				for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
					sumaTotal = sumaTotal + $scope.venta.detallesVenta[i].total;
					sumaTotalCosto = sumaTotalCosto + $scope.venta.detallesVenta[i].costo_unitario;
				}
				$scope.venta.total = Math.round((sumaTotal) * 1000) / 1000;
				$scope.venta.total_costo = Math.round((sumaTotalCosto) * 1000) / 1000;
			}
			$scope.calcularSaldo = function () {
				$scope.venta.saldo = $scope.venta.total - $scope.venta.a_cuenta;
			}
			$scope.calcularCambio = function () {
				if ($scope.esContado) {
					$scope.venta.cambio = Math.round(($scope.venta.pagado - $scope.venta.total) * 100) / 100;
					$scope.pagoMinimo = $scope.venta.total;
				} else {
					$scope.venta.cambio = 0;
					$scope.pagoMinimo = 0;
				}
			}

			$scope.GuardarDetalleMateriales = function (detalle) {
				// if (!$scope.editOt) {
				// 	$scope.nuevoOt.materiales = detalle

				// 	$scope.nuevoOt.totalMaterial = $scope.venta.total;
				// 	$scope.cerrarDialogRepuestosOT()
				// } else {
				// 	detalle.forEach(function (element) {
				// 		$scope.vehiculo.materiales.push(element)

				// 	}, this);

				// 	//vehiculo.materiales.totalMaterial = $scope.venta.total;
				// 	$scope.cerrarDialogRepuestosOT()
				// }
				if (detalle.length > 1) {
					detalle.forEach(function (element) {
						element.importe = element.costo_unitario;
						$scope.nuevoOt.materiales.push(element)

					}, this);
				} else {
					detalle[0].importe = detalle[0].costo_unitario;
					$scope.nuevoOt.materiales.push(detalle[0])
				}


				$scope.cerrarDialogRepuestosOT()
			}
			$scope.eliminarDetalleVenta = function (detalleVenta) {
				$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				$scope.calcularSaldo();
				$scope.calcularCambio();
			}

			$scope.eliminarDetalleMaterial = function (detalleVenta) {
				detalleVenta.eliminado = true;
			}

			$scope.sumarTotalImporte = function () {
				var sumaImporte = 0;
				for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
					sumaImporte = sumaImporte + $scope.venta.detallesVenta[i].importe;
				}
				$scope.venta.importe = Math.round((sumaImporte) * 1000) / 1000;
			}

			$scope.agregarDetalleVenta = function (detalleVenta) {
				detalleVenta.almacen = $scope.venta.almacen;
				if (detalleVenta.producto.activar_inventario) {
					if (detalleVenta.costos.length > 1) {
						var cantidadTotal = detalleVenta.cantidad, i = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));
						while (i < detalleVenta.costos.length && cantidadTotal > 0) {
							detalleVenta.inventarioProducto = detalleVenta.costos[i];
							var cantidadDisponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
							if (cantidadDisponible > 0) {
								var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
								var cantidadParcial;
								if (i > 0) {
									nuevoDetalleVenta.descuento = 0;
									nuevoDetalleVenta.recargo = 0;
									nuevoDetalleVenta.ice = 0;
									nuevoDetalleVenta.excento = 0;
								}
								$scope.detalleVenta = nuevoDetalleVenta;
								if (cantidadTotal > cantidadDisponible) {
									cantidadParcial = cantidadDisponible;
									cantidadTotal = cantidadTotal - cantidadDisponible
								} else {
									cantidadParcial = cantidadTotal;
									cantidadTotal = 0;
								}
								nuevoDetalleVenta.cantidad = cantidadParcial;
								nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[i].fecha_vencimiento;
								nuevoDetalleVenta.lote = detalleVenta.costos[i].lote;
								nuevoDetalleVenta.costos = [];
								nuevoDetalleVenta.costos.push(detalleVenta.costos[i]);
								nuevoDetalleVenta.inventario = detalleVenta.costos[i];
								nuevoDetalleVenta.costo_unitario = nuevoDetalleVenta.inventario.costo_unitario;
								$scope.calcularImporte();
								$scope.venta.detallesVenta.push(nuevoDetalleVenta);
							}
							i++;
						}
					} else {
						detalleVenta.fecha_vencimiento = detalleVenta.costos[0].fecha_vencimiento;
						detalleVenta.lote = detalleVenta.costos[0].lote;
						detalleVenta.inventario = detalleVenta.costos[0];
						detalleVenta.costo_unitario = detalleVenta.inventario.costo_unitario;
						$scope.venta.detallesVenta.push(detalleVenta);
					}
				} else {
					$scope.venta.detallesVenta.push(detalleVenta);
				}
				$scope.inventariosDisponibleProducto = [];
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				$scope.calcularSaldo();
				$scope.calcularCambio();
				$scope.detalleVenta = { producto: { activar_inventario: true }, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				$scope.enfocar('id_producto');
			}
			$scope.calcularImporte = function () {
				$scope.detalleVenta.importe = Math.round(($scope.detalleVenta.cantidad * $scope.detalleVenta.precio_unitario) * 1000) / 1000;
				var descuento, recargo;
				if ($scope.detalleVenta.tipo_descuento) {
					descuento = $scope.detalleVenta.importe * ($scope.detalleVenta.descuento / 100);
				} else {
					descuento = $scope.detalleVenta.descuento;
				}
				if ($scope.detalleVenta.tipo_recargo) {
					recargo = $scope.detalleVenta.importe * ($scope.detalleVenta.recargo / 100);
				} else {
					recargo = $scope.detalleVenta.recargo;
				}
				$scope.detalleVenta.total = Math.round(($scope.detalleVenta.importe - descuento + recargo - $scope.detalleVenta.ice - $scope.detalleVenta.excento) * 1000) / 1000;
			}
			$scope.colorearInventarioDisponible = function (inventarioDisponible, producto) {
				if (inventarioDisponible == 0) {
					$scope.porcentaje = "100";
					$scope.color = "red";
				} else if (inventarioDisponible > ((producto.inventario_minimo * 3) + 1)) {
					$scope.porcentaje = "100";
					$scope.color = "green";
				} else if (inventarioDisponible > ((producto.inventario_minimo * 2) + 1)) {
					$scope.porcentaje = "75";
					$scope.color = "green";
				} else if (inventarioDisponible > ((producto.inventario_minimo * 1.5) + 1)) {
					$scope.porcentaje = "50";
					$scope.color = "green"
				} else if (inventarioDisponible == (producto.inventario_minimo + 1)) {
					$scope.porcentaje = "38";
					$scope.color = "yellow";
				} else if (inventarioDisponible == producto.inventario_minimo) {
					$scope.porcentaje = "25";
					$scope.color = "red";
				} else if (inventarioDisponible < producto.inventario_minimo && inventarioDisponible > 0) {
					$scope.porcentaje = "12";
					$scope.color = "red";
				}
			}
			$scope.obtenerInventarioTotal = function (producto) {
				var cantidadTotal = 0;
				if (producto.activar_inventario) {
					for (var i = 0; i < producto.inventarios.length; i++) {
						cantidadTotal += (producto.inventarios[i].cantidad);
					}
					for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
						if ($scope.venta.detallesVenta[j].producto.id == producto.id) {
							cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
						}
					}
				} else {
					cantidadTotal = 500000;
				}
				return cantidadTotal;
			}
			//fin funciones modal solicitudes de respuesta e insumos

			//OPTENER TIPOS DE MEDIDA TANQUE GASOLINA
			$scope.obtenerTipoMedidaTanqueGasolina = function () {
				blockUI.start();
				var promesa = ClasesTipo("MTM_TAGA", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tipoTanqueGasolina = entidad;
					blockUI.stop();
				});
			}

			//OPTENER TIPOS
			$scope.obtenerEstadosMantenimiento = function () {
				blockUI.start();
				var promesa = ClasesTipo("MTM_EMO");
				promesa.then(function (entidad) {
					$scope.estadosMantenimiento = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerTiposMantenimiento = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("MTM_TM", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposMantenimiento = entidad;
					$scope.tiposMantenimiento.clases.unshift({id:0, nombre:"TODOS"});
					blockUI.stop();
				});
			}
			$scope.obtenerListaTiposEspecialidad = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("MTM_TEM", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.listaTiposEspecialidad = entidad;
					blockUI.stop();
				});
			}
			$scope.obtenerTiposSistemasOrdenTrabajo = function (idPadre, edit) {
				blockUI.start();
				var promesa = ClasesTipoHijosEmpresa(idPadre, $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposSistemas = entidad;
					// $scope.tiposSistemas.clases.forEach(function (dato, index, array) {
					// 	dato.padre = {id:dato.id_padre};
					// })
					$scope.llenarSistemasPrincipales($scope.tiposSistemas.clases, edit)
					blockUI.stop();
				});
			}
			$scope.obtenerTiposPrioridad = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("MTM_TPM", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposPrioridad = entidad;
					blockUI.stop();
				});
			}
			$scope.obtenerTiposEspecialidad = function (sistemas, edit) {
				if (sistemas.length > 0) {
					blockUI.start();
					var idsPadres = ""
					var b = 0;
					for (const iterator of sistemas) {
						b = b + 1;
						if (b == sistemas.length) {
							if (edit) {
								idsPadres = idsPadres + iterator.id_orden_trabajo_sistema
							} else {
								idsPadres = idsPadres + iterator.id
							}
						} else {
							if (edit) {
								idsPadres = idsPadres + iterator.id_orden_trabajo_sistema + ","
							} else {
								idsPadres = idsPadres + iterator.id + ","
							}
						}
					}
					$scope.tiposEspecialidad = {};
					var promesa = ClasesTipoHijosEmpresa(idsPadres, $scope.usuario.id_empresa);
					promesa.then(function (entidad) {
						$scope.tiposEspecialidad = entidad;
						blockUI.stop();
					});
				} else {
					$scope.tiposEspecialidad = {};
				}
			}

			//FIN TIPOS
			$scope.obtenerSucursales = function () {
				var sucursales = [];
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}

			$scope.obtenerAlmacenesActividades = function (idSucursal) {
				$scope.obtenerAlmacenes(idSucursal);
				$scope.obtenerActividades(idSucursal);
			}

			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.almacenes = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.almacenes = sucursal.almacenes;
				$scope.venta.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
				if ($scope.venta.almacen) {
					$scope.cargarProductos();
				}
			}

			$scope.obtenerActividades = function (idSucursal) {
				$scope.actividades = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.actividadesDosificaciones = sucursal.actividadesDosificaciones;
				$scope.actividades = [];
				for (var i = 0; i < $scope.actividadesDosificaciones.length; i++) {
					$scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
				}
				$scope.venta.actividad = $scope.actividades.length == 1 ? $scope.actividades[0] : null;
			}
			$scope.cargarProductos = function () {
				var promesa = ProductosPanel($scope.usuario.id_empresa, $scope.venta.almacen.id);
				promesa.then(function (productos) {
					for (var i = 0; i < productos.length; i++) {
						if (productos[i].activar_inventario) {
							productos[i].inventario_disponible = $scope.obtenerInventarioTotal(productos[i]);
						}
					}
					$scope.productos = productos;

					// ======= save localstorage ====
					if (angular.isDefined($localStorage.productosProcesados)) {

						// ===== conbinar array productos con storage ====
						$scope.productosProcesados = productos;

						for (var i = 0; i < $localStorage.productosProcesados.length; i++) {
							for (var j = 0; j < $scope.productosProcesados.length; j++) {
								if ($localStorage.productosProcesados[i].id == $scope.productosProcesados[j].id) {
									$scope.productosProcesados[j].rankin = $localStorage.productosProcesados[i].rankin;
								}
							}
						}



					} else {
						$scope.productosProcesados = productos;
					}
					// ===== Fin save localstorage ====

					setTimeout(function () {
						aplicarSwiper(4, 3, true, 2);
					}, 1000);
				});
			}
			$scope.obtenerInventarioTotal = function (producto) {
				var cantidadTotal = 0;
				if (producto.activar_inventario) {
					for (var i = 0; i < producto.inventarios.length; i++) {
						cantidadTotal += (producto.inventarios[i].cantidad);
					}
					for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
						if ($scope.venta.detallesVenta[j].producto.id == producto.id) {
							cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
						}
					}
				} else {
					cantidadTotal = 500000;
				}
				return cantidadTotal;
			}
			$scope.diferenciaEntreDiasEnDias = function (a, b) {
				var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
				var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
				var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

				return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
			}
			$scope.calcularHHMM = (fInicio, fFin) => {
				if(fInicio && fFin){
					f1=fInicio.split("/");
					f2=fFin.split("/");
					fechas1 = f1[1]+"/"+f1[0]+"/"+f1[2]
					fechas2 = f2[1]+"/"+f2[0]+"/"+f2[2]
					fechaInicio = new Date(fechas1)
					fechaFin = new Date(fechas2)
					// validacion para las fechas
					if(fechaFin<fechaInicio){
						SweetAlert.swal("", "La fecha fin no debe ser menor al inicio", "warning");
						return { error:true, errorFin:true}
					}
					fecha1 = moment('"' + fechaInicio.getFullYear() + '-' + parseInt(fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate() + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
					fecha2 = moment('"' + fechaFin.getFullYear() + '-' + parseInt(fechaFin.getMonth() + 1) + '-' + fechaFin.getDate() + " " + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
					horas = convertirSegundosATiempo(fecha2.diff(fecha1, 's'));
					$scope.ordenTrabajoManoObra.horas = Number(horas.split(":")[0])
					$scope.ordenTrabajoManoObra.minutos = Number(horas.split(":")[1])
					return {error: false, horas: horas}
				}else{
					return {error: true}
				}
			}
			$scope.agregarManoDeObra = function (manoDeObra) {
				if($scope.configs.factor_hhmm){
					if(manoDeObra.fecha_inicio && manoDeObra.fecha_fin){
						var data = $scope.calcularHHMM(manoDeObra.fecha_inicio, manoDeObra.fecha_fin);
						manoDeObra.horas = data.horas
						manoDeObra.eliminado = false
						manoDeObra.edit = true
						/* if (!manoDeObra.horas) {
							manoDeObra.horas = 0;
						}
						if (!manoDeObra.minutos) {
							manoDeObra.minutos = 0;
						} */
						$scope.nuevoOt.manosDeObra.push(manoDeObra)
						$scope.ordenTrabajoManoObra = { edit: false }
					}else{
						SweetAlert.swal("", "fechas incorrectas", "warning");
					}
				}else{
						manoDeObra.eliminado = false
						manoDeObra.edit = true
						if (!manoDeObra.horas) {
							manoDeObra.horas = 0;
						}
						if (!manoDeObra.minutos) {
							manoDeObra.minutos = 0;
						}
						manoDeObra.horas = manoDeObra.horas+":"+manoDeObra.minutos;
						$scope.nuevoOt.manosDeObra.push(manoDeObra)
						$scope.ordenTrabajoManoObra = { edit: false }
				}
			}
			/* 
			$scope.agregarManoDeObraVehiculo = function (manoDeObra) {
				manoDeObra.horas = ($scope.diferenciaEntreDiasEnDias(new Date(manoDeObra.fecha_inicio), new Date(manoDeObra.fecha_fin)) * 24)
				manoDeObra.eliminado = false
				$scope.vehiculo.manosDeObra.push(manoDeObra)
				$scope.ordenTrabajoManoObra = { edit: false }
			} */
			$scope.agregarServicioExterno = function (servicioExterno) {
				servicioExterno.eliminado = false
				servicioExterno.edit = true
				$scope.nuevoOt.serviciosExternos.push(servicioExterno)
				$scope.servicioExterno = { edit: false }
			}
			/* 	$scope.agregarServicioExternoVehiculo = function (servicioExterno) {
					servicioExterno.eliminado = false
					$scope.vehiculo.serviciosExternos.push(servicioExterno)
					$scope.servicioExterno = {}
				} */
			$scope.eliminarProductoVehiculo = function (dato) {
				$scope.vehiculo.materiales.splice($scope.vehiculo.materiales.indexOf(dato), 1);
			}
			$scope.eliminarManoDeObra = function (index, manoObra) {
				manoObra.eliminado = true;
				// $scope.nuevoOt.manosDeObra.splice($scope.nuevoOt.manosDeObra.indexOf(index), 1);
			}
			$scope.eliminarManoDeObraVehiculo = function (dato) {
				$scope.vehiculo.manosDeObra.splice($scope.vehiculo.manosDeObra.indexOf(dato), 1);
			}
			$scope.eliminarServicioExterno = function (dato) {
				dato.eliminado = true;
			}
			$scope.eliminarServicioExternoVehiculo = function (dato) {
				$scope.vehiculo.serviciosExternos.splice($scope.vehiculo.serviciosExternos.indexOf(dato), 1);
			}
			$scope.seleccionarSistemasPrincipales = function (sistemasOt) {
				for (var i = 0; i < $scope.sistemasPrincipales.length; i++) {
					for (var j = 0; j < sistemasOt.length; j++) {
						if ($scope.sistemasPrincipales[i].id == sistemasOt[j].id_orden_trabajo_sistema) {
							$scope.sistemasPrincipales[i].ticked = true;
						}
					}
				}
			}
			$scope.llenarSistemasPrincipales = function (sistemas, edit) {
				$scope.sistemasPrincipales = [];
				if (sistemas) {
					for (var i = 0; i < sistemas.length; i++) {
						var sistema = {
							nombre: sistemas[i].nombre,
							maker: "",
							ticked: false,
							id: sistemas[i].id
						}
						$scope.sistemasPrincipales.push(sistema);
					}
				}
				if (edit) {
					if ($scope.nuevoOt.sistemas.length > 0) {
						$scope.seleccionarSistemasPrincipales($scope.nuevoOt.sistemas)
						$scope.obtenerTiposEspecialidad($scope.nuevoOt.sistemas, edit)
					}else{
						$scope.tiposEspecialidad = {};
					}
				}
			}
			$scope.saveFormNuevoOt = function (guardar) {
				if (guardar == false) {
					var button = $('#siguiente').text().trim();
					if (button != "Siguiente") {
						if($scope.nuevoOt.fecha_hora_aviso) $scope.nuevoOt.fecha_hora_aviso = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_aviso);
						if($scope.nuevoOt.fecha_hora_inicio) $scope.nuevoOt.fecha_hora_inicio = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_inicio);
						if($scope.nuevoOt.fecha_hora_fin) $scope.nuevoOt.fecha_hora_fin = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_fin);
						if (!$scope.nuevoOt.ver) {
							if ($scope.nuevoOt.mantenimiento_externo) {
								$scope.nuevoOt.cliente_ot.nit = $scope.nuevoOt.nit_cli;
								$scope.nuevoOt.cliente_ot.propietario_telefono = $scope.nuevoOt.propietario_telefono;
								$scope.nuevoOt.cliente_ot.propietario_celular = $scope.nuevoOt.propietario_celular;
							}
							$scope.nuevoOt.tipoMantenimiento = $scope.tiposMantenimiento.clases.find(function (x) {
								return x.id == $scope.nuevoOt.tipo_mantenimiento
							})
							promesa = GuardarNuevaOrdendeTrabajo($scope.nuevoOt, $scope.usuario.id_empresa)
							promesa.then(function (dato) {
								$scope.cerrarOTnuevo();
								SweetAlert.swal("", dato.mensaje, "success");
								$scope.recargarItemsTabla();
							})
						} else {
							$scope.cerrarOTnuevo();
							$scope.recargarItemsTabla();
						}
					}
				} else {
					if($scope.nuevoOt.fecha_hora_aviso) $scope.nuevoOt.fecha_hora_aviso = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_aviso);
					if($scope.nuevoOt.fecha_hora_inicio) $scope.nuevoOt.fecha_hora_inicio = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_inicio);
					if($scope.nuevoOt.fecha_hora_fin) $scope.nuevoOt.fecha_hora_fin = $scope.fechaFormatoServidorConHoras($scope.nuevoOt.fecha_hora_fin);
					if ($scope.nuevoOt.mantenimiento_externo) {
						$scope.nuevoOt.cliente_ot.nit = $scope.nuevoOt.nit_cli;
						$scope.nuevoOt.cliente_ot.propietario_telefono = $scope.nuevoOt.propietario_telefono;
						$scope.nuevoOt.cliente_ot.propietario_celular = $scope.nuevoOt.propietario_celular;
					}
					$scope.nuevoOt.tipoMantenimiento = $scope.tiposMantenimiento.clases.find(function (x) {
						return x.id == $scope.nuevoOt.tipo_mantenimiento
					})
					promesa = GuardarNuevaOrdendeTrabajo($scope.nuevoOt, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						$scope.cerrarOTnuevo();
						SweetAlert.swal("", dato.mensaje, "success");
						$scope.recargarItemsTabla();
					})
				}

			}
			$scope.GuardarOtActializado = function (guardar) {

				if (guardar == false) {
					var button = $('#siguiente').text().trim();
					if (button != "Siguiente") {
						promesa = ActualizarOrdendeTrabajo($scope.vehiculo)
						promesa.then(function (dato) {
							$scope.cerrarOTEdicionCorrectivo();
							SweetAlert.swal("", dato.message, "success");
							$scope.recargarItemsTabla()
						})
					}
				} else {
					if ($scope.vehiculo.observacion != "" && $scope.vehiculo.id_prioridad != null && $scope.vehiculo.tiempo_estimado != null && $scope.vehiculo.fecha_hora_aviso != null &&
						$scope.vehiculo.fecha_hora_inicio != null && $scope.vehiculo.fecha_hora_fin != null) {
						promesa = ActualizarOrdendeTrabajo($scope.vehiculo)
						promesa.then(function (dato) {
							$scope.cerrarOTEdicionCorrectivo();
							SweetAlert.swal("", dato.message, "success");
							$scope.recargarItemsTabla()
						})
					} else {
						SweetAlert.swal("", "La Orden de trabajo no puede estar vacia!", "warning");
					}
				}

			}


			$scope.editarManoObra = function (dato, index) {
				$scope.ordenTrabajoManoObra = dato
				$scope.ordenTrabajoManoObra.especialidad = dato.especialidad
				$scope.ordenTrabajoManoObra.fecha_inicio = dato.fecha_inicio ? moment(dato.fecha_inicio, 'DD/MM/YYYY h:mm A', true).isValid() ? dato.fecha_inicio : moment(dato.fecha_inicio).format('DD/MM/YYYY h:mm A') : null
				$scope.ordenTrabajoManoObra.fecha_fin = dato.fecha_fin ? moment(dato.fecha_fin, 'DD/MM/YYYY h:mm A', true).isValid() ? dato.fecha_fin : moment(dato.fecha_fin).format('DD/MM/YYYY h:mm A') : null
				$scope.ordenTrabajoManoObra.edit = true
				$scope.ordenTrabajoManoObra.index = index
			}
			$scope.guardarManoObraEditada = function (dato) {
				$scope.nuevoOt.manosDeObra[dato.index] = dato
				$scope.ordenTrabajoManoObra = { edit: false }
			}
			$scope.guardarManoObraEditadaVehiculo = function (dato) {
				$scope.vehiculo.manosDeObra[dato.index] = dato
				$scope.vehiculo.manosDeObra[dato.index].horas = ($scope.diferenciaEntreDiasEnDias(new Date($scope.vehiculo.manosDeObra[dato.index].fecha_inicio), new Date($scope.vehiculo.manosDeObra[dato.index].fecha_fin)) * 24)
				$scope.ordenTrabajoManoObra = { edit: false }
			}
			$scope.editarServicioExterno = function (dato, index) {
				$scope.servicioExterno = dato
				// $scope.servicioExterno.fecha_inicio = moment($scope.servicioExterno.fecha_inicio).format('MM/DD/YYYY h:mm A')
				// $scope.servicioExterno.fecha_fin = moment($scope.servicioExterno.fecha_fin).format('MM/DD/YYYY h:mm A')

				$scope.servicioExterno.fecha_inicio = dato.fecha_inicio ? moment(dato.fecha_inicio, 'DD/MM/YYYY h:mm A', true).isValid() ? dato.fecha_inicio : moment(dato.fecha_inicio).format('DD/MM/YYYY h:mm A') : null
				$scope.servicioExterno.fecha_fin = dato.fecha_fin ? moment(dato.fecha_fin, 'DD/MM/YYYY h:mm A', true).isValid() ? dato.fecha_fin : moment(dato.fecha_fin).format('DD/MM/YYYY h:mm A') : null
				$scope.servicioExterno.edit = true
				$scope.servicioExterno.index = index
				//console.log($scope.ordenTrabajoManoObra)
			}
			$scope.guardarServicioExternoEditado = function (dato) {
				$scope.nuevoOt.serviciosExternos[dato.index] = dato
				$scope.servicioExterno = { edit: false }
			}
			//FIN FUNCIONES MODAL NUEVO OT
			$scope.obtenerFechasCalendario = function () {

				promesa = DatosFechasVehiculos($scope.calendario)
				promesa.then(function (dato) {
					$scope.FechasCalendario = dato;

				})
			}
			$scope.obtenerFechasCalendarioS = function (CAL) {
				$('#calendar').fullCalendar('removeEvents');

				promesa = DatosFechasVehiculos(CAL)
				promesa.then(function (dato) {
					$scope.FechasCalendario = dato;
					var datos = []

					dato.forEach(function (element, index, array) {
						var a = { id: element.id, title: element.observacion, start: element.fecha_hora_inicio, end: element.fecha_hora_fin }
						datos.push(a)
						if (index === (array.length - 1)) {
							$scope.cal(datos);
						}
					}, this);
				})
			}
			$scope.EditEventoCalendario = function () {
				$scope.calendar.fullCalendar('updateEvent', $scope.evento);
				$scope.cerrarEditarEventoCalendario()
			}
			$scope.DeleteEventoCalendario = function () {

				$scope.calendar.fullCalendar('removeEvents', function (ev) {
					return (ev._id == $scope.evento._id);
				})
				$scope.cerrarEditarEventoCalendario()
			}
			//calendario
			$scope.cal = function (datos) {

				$scope.calendar.fullCalendar('addEventSource', datos)
			}
			$scope.GuardarEventoCalendario = function (valid) {
				if (valid) {

					$scope.calendar.fullCalendar('renderEvent', $scope.evento,
						true // make the event "stick"					
					);
					$scope.evento = { title: null, start: null, end: null, allDay: null, className: 'label-info' }
					$scope.cerrarEventoCalendario()

				}
			}

			$scope.aplicarCalendario = function () {
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				$scope.calendar = $('#calendar').fullCalendar({
					//isRTL: true,
					//firstDay: 1,// >> change first day of week 

					buttonHtml: {
						prev: '<i class="ace-icon fa fa-chevron-left"></i>',
						next: '<i class="ace-icon fa fa-chevron-right"></i>'
					},

					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},

					events: [],

					editable: true,
					droppable: true, // this allows things to be dropped onto the calendar !!!
					drop: function (date) { // this function is called when something is dropped

						// retrieve the dropped element's stored Event Object
						var originalEventObject = $(this).data('eventObject');
						var $extraEventClass = $(this).attr('data-class');


						// we need to copy it, so that multiple events don't have a reference to the same object
						var copiedEventObject = $.extend({}, originalEventObject);

						// assign it the date that was reported
						copiedEventObject.start = date;
						copiedEventObject.allDay = false;
						if ($extraEventClass) copiedEventObject['className'] = [$extraEventClass];

						// render the event on the calendar
						// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
						$scope.calendar.fullCalendar('renderEvent', copiedEventObject, true);

						// is the "remove after drop" checkbox checked?
						if ($('#drop-remove').is(':checked')) {
							// if so, remove the element from the "Draggable Events" list
							$(this).remove();
						}

					},
					selectable: true,
					selectHelper: true,
					select: function (start, end, allDay) {

						$scope.evento = { title: "", start: start, end: end, allDay: allDay, className: 'label-info' }
						$scope.abrirEventoCalendario()
						$scope.calendar.fullCalendar('unselect');
					},
					eventClick: function (calEvent, jsEvent, view) {
						$scope.evento = calEvent
						$scope.abrirEditarEventoCalendario()

					}
				});
			}

			$scope.abrirDialogConceptoEdicion = function (tipo) {
				$scope.tipo_edicion = tipo;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalConceptoEdicion);
			}

			$scope.abrirDialogConceptoEdicionEspecialidad = function (tipo) {
				$scope.tipo_edicion = tipo;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalConceptoEdicionEspecialidad);
			}

			$scope.agregarConceptoEdicionEspecialidad = function (clase) {
				if (clase.nombre && clase.nombre_corto) {
					if ($scope.tipo_edicion != undefined && $scope.tipo_edicion.clases) {
						if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
							$scope.tipo_edicion.clases.push(clase);
						}
					} else {
						$scope.tipo_edicion = { clases: [] };
						// $scope.tipo_edicion.clases = [];
						$scope.tipo_edicion.clases.push(clase);
					}

					$scope.clase = {}
				}
			}

			$scope.abrirDialogConfiguracionTipo = function (tipoMantenimiento) {
				$scope.mantenimientoSeleccionado = tipoMantenimiento;
				$scope.sistemasEditados=[]
				$scope.especialidadesEditados=[]
				$scope.preciosEditados=[]
				$scope.busquedaSis = ''
				$scope.busquedaEsp = ''
				$scope.busquedaPre=''
				$scope.obtenerSistemas()
				$scope.abrirPopup($scope.idModalConfiguracionMecanica);
				$("#" + $scope.idModalConfiguracionMecanica).tabs({ active: 0 });
			}

			$scope.obtenerSistemas =  () => {
				$scope.clase={}
				var promesa = ObtenerSistemas($scope.mantenimientoSeleccionado.id, $scope.busquedaSis);
				promesa.then(function (entidad) {
					$scope.tiposistemas = entidad;
				});
				promesa.catch(err=>{
					console.log(err);
				})
			}
			$scope.obtenerEspecialidades = () => {
				$scope.obtenerSistemas();
				ObtenerEspecialidades('MTM_TEM', $scope.busquedaEsp, $scope.usuario.id_empresa)
				.then(data=>{
					$scope.especialidades = data.especialidades
					$scope.tipoEspecialidades = data.tipo;
				})
			}
			$scope.obtenerPreciosEspecialidad = () => {
				$scope.espec={}
				$scope.obtenerSistemas();
				ObtenerPreciosEspecialidad('MTM_TEM', $scope.busquedaPre, $scope.usuario.id_empresa)
				.then(data=>{
					$scope.especialidadPrecios = data.especialidades
				})
			} 
			$scope.agregarSistemaEdicion = function (clase) {
				if (clase.nombre && clase.nombre_corto) {
					if($scope.sistemasEditados.length>0){
						let existe = $scope.sistemasEditados.findIndex(editado => editado.id === clase.id);
						if ( existe == -1) {
							$scope.sistemasEditados.push(clase);
						}else{
							$scope.sistemasEditados[existe]=clase;
						}
					}else{
						$scope.sistemasEditados.push(clase);
					}
					$scope.clase = {}
				}
			}

			$scope.guardarSistemaEdicion = function () {
				blockUI.start();
				var idTipoMantenimiento = $scope.mantenimientoSeleccionado.id;
				if($scope.tiposistemas.tipo ? $scope.tiposistemas.tipo.id : false){
					var data = $scope.tiposistemas.tipo;
					data.clases=[]
					$scope.sistemasEditados.forEach(e => {
						e.padre={}
						e.padre.id=idTipoMantenimiento;
						data.clases.push(e)
					})	
					Tipos.update({ id_tipo: $scope.tiposistemas.tipo.id }, data, function (res) {
						$scope.obtenerSistemas($scope.mantenimientoSeleccionado.id);
						$scope.sistemasEditados=[]
						blockUI.stop();
						SweetAlert.swal("", 'Guardado Exitosamente!', "success");
					});
				}else{
					SweetAlert.swal("", "Ocurrió un error al recuperar las ordenes.\nNo existe "+$scope.tiposistemas.message, "danger");
				}

			}

			/* $scope.obtenerEspecialidadeSistemas = function (sistemas, edit) {
				if (sistemas) {
					blockUI.start();
					var idsPadres = ""
					var b = 0;
					for (const iterator of sistemas) {
						b = b + 1;
						if (b == sistemas.length) {
							if (edit) {
								idsPadres = idsPadres + iterator.id_orden_trabajo_sistema
							} else {
								if (iterator.id) {
									idsPadres = idsPadres + iterator.id
								} else {
									idsPadres = idsPadres.replace(/,\s*$/, "");
								}
							}
						} else {
							if (edit) {
								idsPadres = idsPadres + iterator.id_orden_trabajo_sistema + ","
							} else {
								if (iterator.id) {
									idsPadres = idsPadres + iterator.id + ","
								}
							}
						}
					}
					$scope.especialidadSistema = {};
					var promesa = ClasesTipoHijosPadresEmpresa(idsPadres, $scope.usuario.id_empresa);
					promesa.then(function (entidad) {
						$scope.especialidadSistema = entidad;
						console.log('datos mant', $scope.especialidadSistema);
						$scope.obtenerEspecialidadPrecio(entidad.clases);
						blockUI.stop();
					});
				} else {
					$scope.especialidadPrecios = {};
					$scope.especialidadSistema = {};
				}
			} */

			/* $scope.obtenerEspecialidadPrecio = function (especialidades, edit) {
				if (especialidades) {
					blockUI.start();
					var idsEspecialidad = ""
					var b = 0;
					for (const iterator of especialidades) {
						b = b + 1;
						if (b == especialidades.length) {
							if (iterator.id) {
								idsEspecialidad = idsEspecialidad + iterator.id
							} else {
								idsEspecialidad = idsEspecialidad.replace(/,\s*$/, "");
							}
						} else {
							if (iterator.id) {
								idsEspecialidad = idsEspecialidad + iterator.id + ","
							}
						}
					}

					$scope.especialidadPrecios = {};
					var promesa = EspecialidesPrecios(idsEspecialidad, $scope.usuario.id_empresa);
					promesa.then(function (entidad) {
						console.log('datos precios', entidad.especialidades);
						$scope.especialidadPrecios = entidad.especialidades;
						blockUI.stop();
					});
				} else {
					$scope.especialidadPrecios = {};
				}
			} */

			$scope.agregarEspecialidadPrecio = function (especialidad) {
				if (especialidad.nombre && especialidad.nombre_corto) {
					if($scope.preciosEditados.length>0){
						let existe = $scope.preciosEditados.findIndex(editado => editado.id === especialidad.id);
						if ( existe == -1) {
							$scope.preciosEditados.push(especialidad);
						}else{
							$scope.preciosEditados[existe]=especialidad;
						}
					}else{
						$scope.preciosEditados.push(especialidad);
					}
					$scope.espec = {}
				}
			}

			$scope.modificarEspecialidadPrecio = function (especialidad) {
				$scope.espec = especialidad;
				$scope.espec.precioEsp = especialidad.PreciosEspecialidad.length>0 ? especialidad.PreciosEspecialidad[especialidad.PreciosEspecialidad.length -1] : {}
			}

			$scope.guardarConfEspecialidadesPrecios = function () {
					let precios = []
					for (let i = 0; i < $scope.preciosEditados.length; i++) {
						let espPrecio = $scope.preciosEditados[i]
						let prec = espPrecio.PreciosEspecialidad.length > 0 ? espPrecio.PreciosEspecialidad[espPrecio.PreciosEspecialidad.length - 1] : 0
						precios.push({
							especialidad: espPrecio,
							precio: prec.precio ? prec.precio : espPrecio.precioEsp.precio,
							id: prec.id ? prec.id : null
						})
						
					}
					EspecialidesPreciosUpdate.update({ id_empresa: $scope.usuario.id_empresa }, { 'especialidades': precios }, function (res) {
						$scope.obtenerPreciosEspecialidad();
						blockUI.stop();
						$scope.preciosEditados=[]
						SweetAlert.swal("", 'Guardado Exitosamente!', "success");
					});
				


			}

			$scope.agregarEdicionEspecialidad = function (clase) {
				if ((clase.sistema || clase.padre) && clase.nombre && clase.nombre_corto) {
					if($scope.especialidadesEditados.length > 0){
						let existe = $scope.especialidadesEditados.findIndex(editado=> editado.id===clase.id );
						if ( existe == -1) {
							$scope.especialidadesEditados.push(clase);
						}else{
							$scope.especialidadesEditados[existe]=clase;
						}
					}else{
						$scope.especialidadesEditados.push(clase)
					}
					$scope.clase = {}
				}
			}

			$scope.guardarConfEdicionEspecialidad = function () {
				blockUI.start();
				if($scope.tipoEspecialidades ? $scope.tipoEspecialidades.id : false){
					var data = $scope.tipoEspecialidades;
					data.clases=$scope.especialidadesEditados;
					Tipos.update({ id_tipo: $scope.tipoEspecialidades.id }, data, function (res) {
						$scope.obtenerEspecialidades();
						$scope.especialidadesEditados=[]
						blockUI.stop();
						SweetAlert.swal("", 'Guardado Exitosamente!', "success");
					});
				}else{
					SweetAlert.swal("", "Ocurrió un error al recuperar las ordenes.\nNo existe "+$scope.tiposistemas.message, "danger");
				}
			}

			$scope.cerrarDialogConfiguracionMecanica = function () {
				$scope.cerrarPopup($scope.idModalConfiguracionMecanica);
			}

			$scope.guardarConceptoEdicionEspecialidad = function (tipo) {
				blockUI.start();
				var idTipoMantenimiento = $scope.nuevoOt.tipoMantenimiento ? $scope.nuevoOt.tipoMantenimiento.id : $scope.nuevoOt.tipo_mantenimiento;
				tipo.clases.forEach(function (dato, index, array) {
					dato.padre = { id: dato.sistema ? dato.sistema.id : dato.id_padre };
				})
				if (tipo.id) {
					Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
						var promesa = ClasesTipo(tipo.nombre_corto);
						promesa.then(function (entidad) {
							tipo = entidad
							if ($scope.nuevoOt.sistemas.length > 0) {
								$scope.obtenerTiposEspecialidad($scope.nuevoOt.sistemas, false)
							}
							blockUI.stop();
							$scope.cerrarDialogConceptoEdicionEspecialidad();
							$scope.mostrarMensaje('Guardado Exitosamente!');
						});
					});
				} else {
					var prom = ClasesTipoEmpresa("MTM_TEM", $scope.usuario.id_empresa);
					prom.then(function (result) {
						tipo.padre = result.padre;
						tipo.usar_herencia = result.usar_herencia;
						tipo.nombre_corto = result.nombre_corto;
						Tipos.update({ id_tipo: result.id }, tipo, function (res) {
							var promesa = ClasesTipo(tipo.nombre_corto);
							promesa.then(function (entidad) {
								tipo = entidad
								// $scope.obtenerTiposSistemasOrdenTrabajo(idTipoMantenimiento, true)
								blockUI.stop();
								$scope.cerrarDialogConceptoEdicionEspecialidad();
								$scope.mostrarMensaje('Guardado Exitosamente!');
							});
						});
					});
				}

			}

			$scope.cerrarDialogConceptoEdicionEspecialidad = function () {
				$scope.tiposistemas=[]
				$scope.especialidades = []
				$scope.tipoEspecialidades = {}
				$scope.especialidadPrecios =[]
				$scope.cerrarPopup($scope.idModalConceptoEdicionEspecialidad);
			}

			$scope.abrirDialogConceptoEspecialidadEdicion = function (tipo) {
				$scope.tipo_edicion = tipo;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalConceptoEdicion);
			}

			$scope.cerrarDialogConceptoEdicion = function () {
				$scope.cerrarPopup($scope.idModalConceptoEdicion);
			}

			$scope.agregarConceptoEdicion = function (clase) {
				if (clase.nombre && clase.nombre_corto) {
					if ($scope.tipo_edicion.clases) {
						if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
							$scope.tipo_edicion.clases.push(clase);
						}
					} else {
						$scope.tipo_edicion.clases = [];
						$scope.tipo_edicion.clases.push(clase);
					}

					$scope.clase = {}
				}
			}

			$scope.modificarConceptoEdicion = function (clase) {
				$scope.clase = clase;
				$scope.clase.sistema = clase.padre;
			}

			$scope.removerConceptoEdicion = function (clase) {
				clase.eliminado = true;
			}

			$scope.guardarConceptoEdicion = function (tipo) {
				blockUI.start();
				var idTipoMantenimiento = $scope.nuevoOt.tipoMantenimiento ? $scope.nuevoOt.tipoMantenimiento.id : $scope.nuevoOt.tipo_mantenimiento;
				tipo.clases.forEach(function (dato, index, array) {
					dato.padre = { id: idTipoMantenimiento };
				})
				if (tipo.id) {
					Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
						var promesa = ClasesTipo(tipo.nombre_corto);
						promesa.then(function (entidad) {
							tipo = entidad
							$scope.obtenerTiposSistemasOrdenTrabajo(idTipoMantenimiento, true)
							blockUI.stop();
							$scope.cerrarDialogConceptoEdicion();
							$scope.mostrarMensaje('Guardado Exitosamente!');
						});
					});
				} else {
					var prom = ClasesTipoEmpresa("MTM_SOT", $scope.usuario.id_empresa);
					prom.then(function (result) {
						tipo.padre = result.padre;
						tipo.usar_herencia = result.usar_herencia;
						tipo.nombre_corto = result.nombre_corto;
						Tipos.update({ id_tipo: result.id }, tipo, function (res) {
							var promesa = ClasesTipo(tipo.nombre_corto);
							promesa.then(function (entidad) {
								tipo = entidad
								$scope.obtenerTiposSistemasOrdenTrabajo(idTipoMantenimiento, true)
								blockUI.stop();
								$scope.cerrarDialogConceptoEdicion();
								$scope.mostrarMensaje('Guardado Exitosamente!');
							});
						});
					});
				}

			}
			/* vista vehiculos */
			$scope.abrirModalListaVehiculos = function () {
				$scope.ListarVehiculosOT()
				$scope.abrirPopup($scope.idModalListaVehiculos);
			}
			$scope.cerrarModalListaVehiculos = function () {
				$scope.cerrarPopup($scope.idModalListaVehiculos);
			}
			$scope.ListarVehiculosOT = function (filtro) {
				blockUI.start();
				$scope.paginatorVehiculos = Paginator();
				$scope.paginatorVehiculos.column = "id";
				$scope.paginatorVehiculos.direction = "asc";
				if (filtro) {
					$scope.filtrolistaVehiculos = filtro
				} else {
					$scope.filtrolistaVehiculos = {
						id_empresa: $scope.usuario.id_empresa,
						marca: "",
						modelo: "",
						placa: ""
					};
				}
				$scope.paginatorVehiculos.callBack = $scope.obtenerListaVehiculosOt;
				$scope.paginatorVehiculos.getSearch("", $scope.filtrolistaVehiculos, null);
				blockUI.stop();
			}

			$scope.obtenerListaVehiculosOt = function () {
				var promesa = ObtenerListaVehiculosOt($scope.paginatorVehiculos)
				promesa.then(function (data) {
					$scope.paginatorVehiculos.setPages(data.paginas);
					$scope.listaVehiculos = data.listaVehiculos
					blockUI.stop()
				})
			}
			/* fin vista veihuclos*/
			/* INICIO KARDEX VEHICULO */
			$scope.abrirModalKardexVehiculo = function (vehiculo) {
				$scope.vehiculo = vehiculo
				$scope.kardexVehiculosOT()
				$scope.abrirPopup($scope.idmodalKardexVehiculo);
			}
			$scope.cerrarModalKardexVehiculo = function () {
				$scope.cerrarPopup($scope.idmodalKardexVehiculo);
			}
			$scope.kardexVehiculosOT = function (filtro) {
				blockUI.start();
				$scope.paginatorKardexVehiculo = Paginator();
				$scope.paginatorKardexVehiculo.column = "id";
				$scope.paginatorKardexVehiculo.direction = "asc";
				if (filtro) {
					$scope.filtroKardexVehiculo = filtro
					$scope.filtroKardexVehiculo.inicio = ($scope.filtroKardexVehiculo.inicio2 != "") ? new Date($scope.convertirFecha($scope.filtroKardexVehiculo.inicio2)) : ""
					$scope.filtroKardexVehiculo.fin = ($scope.filtroKardexVehiculo.fin2 != "") ? new Date($scope.convertirFecha($scope.filtroKardexVehiculo.fin2)) : ""
				} else {
					$scope.filtroKardexVehiculo = {
						id_vehiculo: $scope.vehiculo.id,
						inicio: "",
						fin: "",
						inicio2: "",
						fin2: "",
						estado: ""
					};
				}
				$scope.paginatorKardexVehiculo.callBack = $scope.obtenerKardexVehiculosOt;
				$scope.paginatorKardexVehiculo.getSearch("", $scope.filtroKardexVehiculo, null);
				blockUI.stop();
			}

			$scope.obtenerKardexVehiculosOt = function () {
				var promesa = ObtenerKardexVehiculosOt($scope.paginatorKardexVehiculo)
				promesa.then(function (data) {
					$scope.paginatorKardexVehiculo.setPages(data.paginas);
					$scope.KardexVehiculo = data.KardexVehiculo
					blockUI.stop()
				})
			}
			/* FIN KARDEX VEHICULO */
			/* lista productos */
			$scope.abrirPopupInventario = function () {
				$scope.abs = $window.Math.abs;
				$scope.itemsPorPagina = 10;
				$scope.paginaActual = 1;
				$scope.columna = "nombre";
				$scope.direccion = "asc";
				$scope.cantidadInv = "0";
				$scope.textoBusqueda = "";
				if ($scope.venta.almacen) {
					$scope.almacenBusqueda = $scope.venta.almacen;
					$scope.buscarInventarios($scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, $scope.cantidadInv);
				}
				$scope.abrirPopup($scope.idModalInventario);
			}
			$scope.buscarInventarios = function (idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad) {
				blockUI.start();
				$scope.itemsPorPagina = itemsPagina;
				if (texto == "" || texto == null) {
					texto = 0;
				} else {
					$scope.textoBusqueda = texto;
				}
				$scope.paginaActual = pagina;
				var verEstado = 'false';
				var promesa = InventarioPaginador($scope.usuario.id_empresa, idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad, undefined, undefined, $scope.usuario.id, verEstado);
				promesa.then(function (dato) {
					var productos = dato.productos;
					for (var i = 0; i < productos.length; i++) {
						var inventarios = [], cantidadTotal = 0;
						productos[i].fecha_vencimiento = new Date(productos[i].fecha_vencimiento);
						productos[i].cantidad_total = productos[i].cantidad;
					}
					$scope.paginas = [];
					for (var i = 1; i <= dato.paginas; i++) {
						$scope.paginas.push(i);
					}

					$scope.productos = productos;

					blockUI.stop();
				});
			}
			/* fin lista productos */
			/* buscar proveedor empresa */
			$scope.buscarProveedor = async function (query) {
				$scope.mensajeServicioEmpresaError = false
				if (query != "" && query != undefined) {
					var data = await ProveedoresNit($scope.usuario.id_empresa, query);
					if (data.length == 1) {
						$scope.establecerProveedor(data[0])
						data = []
					} else if (data.length == 0) {
						$scope.mensajeServicioEmpresaError = true
					}
					return data;
				}
			};

			$scope.establecerProveedor = function (proveedor) {
				$scope.servicioExterno.empresa = proveedor;
			}
			/* fin buscar proveedor empresa */
			
			$scope.liquidacionCalcularPorcentajeEfectivo = function () {
				if ($scope.liquidacionMantenimiento.asignarATodos) {
					if ($scope.liquidacionMantenimiento.materiales) {
						if ($scope.liquidacionMantenimiento.materiales.length > 0) {
							$scope.liquidacionMantenimiento.materiales = $scope.liquidacionMantenimiento.materiales.map((ant, act, ind) => {
								ant.importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
								return ant
							})
						}
					}

					if ($scope.liquidacionMantenimiento.manosDeObra) {
						if ($scope.liquidacionMantenimiento.manosDeObra.length > 0) {

							if (!$scope.liquidacionMantenimiento.manosDeObraTemp) {
								$scope.liquidacionMantenimiento.manosDeObraTemp = $scope.liquidacionMantenimiento.manosDeObra;
							}
							if ($scope.liquidacionMantenimiento.precio_predeterminados) {
								var helper = {};
								var result = $scope.liquidacionMantenimiento.manosDeObra.reduce(function (r, o) {
									var key = o.id_especialidad;
									if (!helper[key]) {
										helper[key] = Object.assign({}, o); // create a copy of o
										helper[key].importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
										r.push(helper[key]);
									} else {
										if (helper[key].especialidad.PreciosEspecialidad.length > 0) {
											helper[key].especialidad.precio += o.especialidad.PreciosEspecialidad[0].precio;
											helper[key].importe_interno += o.importe_interno;
										} else {
											helper[key].especialidad.precio = 0;
											helper[key].importe_interno += o.importe_interno;
										}
									}
									return r;
								}, []);

								$scope.liquidacionMantenimiento.manosDeObra = result;
								// console.log(result);
							} else {
								$scope.liquidacionMantenimiento.manosDeObra = $scope.liquidacionMantenimiento.manosDeObraTemp.map((ant, act, ind) => {
									ant.importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado;
									if (ant.especialidad.PreciosEspecialidad.length > 0) {
										ant.especialidad.precio = ant.especialidad.PreciosEspecialidad[0].precio;
									} else {
										ant.especialidad.precio = 0;
									}
									return ant
								})
							}

						}
					}
					if ($scope.liquidacionMantenimiento.serviciosExternos) {
						if ($scope.liquidacionMantenimiento.serviciosExternos.length > 0) {
							$scope.liquidacionMantenimiento.serviciosExternos = $scope.liquidacionMantenimiento.serviciosExternos.map((ant, act, ind) => {
								ant.importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
								return ant
							})
						}
					}
				} else {
					if ($scope.liquidacionMantenimiento.manosDeObra) {
						if ($scope.liquidacionMantenimiento.manosDeObra.length > 0) {

							if (!$scope.liquidacionMantenimiento.manosDeObraTemp) {
								$scope.liquidacionMantenimiento.manosDeObraTemp = $scope.liquidacionMantenimiento.manosDeObra;
							}
							if ($scope.liquidacionMantenimiento.precio_predeterminados) {
								var helper = {};
								var result = $scope.liquidacionMantenimiento.manosDeObra.reduce(function (r, o) {
									var key = o.id_especialidad;
									if (!helper[key]) {
										helper[key] = Object.assign({}, o); // create a copy of o
										// helper[key].importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
										r.push(helper[key]);
									} else {
										if (helper[key].especialidad.PreciosEspecialidad.length > 0) {
											helper[key].especialidad.precio += o.especialidad.PreciosEspecialidad[0].precio;
											helper[key].importe_interno += o.importe_interno;
										} else {
											helper[key].especialidad.precio = 0;
											helper[key].importe_interno += o.importe_interno;
										}
									}

									return r;
								}, []);
								result.importe_interno = $scope.detalle.importe_interno;
								$scope.liquidacionMantenimiento.manosDeObra = result;
								// console.log(result);
							} else {
								$scope.liquidacionMantenimiento.manosDeObra = $scope.liquidacionMantenimiento.manosDeObraTemp.map((ant, act, ind) => {
									// ant.importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado;
									if (ant.especialidad.PreciosEspecialidad.length > 0) {
										ant.especialidad.precio = ant.especialidad.PreciosEspecialidad[0].precio;
									} else {
										ant.especialidad.precio = 0;
									}
									return ant
								})
							}

						}
					}
				}

			}
			$scope.liquidacionVerificarEstado = function () {
				if($scope.liquidacionMantenimiento){
					if ($scope.liquidacionMantenimiento.estado) {
						return ($scope.liquidacionMantenimiento.estado.nombre === 'FINALIZADO')
					}
				}
				return false;
			}

			$scope.abrirDialogFinalizarLiquidacion = function () {
				$scope.abrirPopup($scope.idFinalizarLiquidacion);
			}
			$scope.finalizarLiquidacion = () =>{
				SweetAlert.swal({
					title: "Confirme",
                    text: "¿Está seguro de finalizar la liquidación?" ,
                    confirmButtonText: 'Si',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    showLoaderOnConfirm: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#28a746',
                }).then(async (result) => {
					if (result.value) {
                        $scope.guardarLiquidacion(true);
                    }
                })
			}

			$scope.cerrarDialogFinalizarLiquidacion = function () {
				$scope.cerrarPopup($scope.idFinalizarLiquidacion);
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

			$scope.guardarLiquidacion = function (finalizar) {
				if (finalizar) {
					$scope.liquidacionMantenimiento.estado = $scope.estadosMantenimiento.find(function (x) {
						return x.nombre_corto == "FINALIZADO"
					})
					$scope.liquidacionMantenimiento.tipo_pago = $.grep($scope.tiposPago, function (e) { return e.nombre == $scope.diccionario.TIPO_PAGO_CREDITO; })[0];
					$scope.liquidacionMantenimiento.dias_credito = 0;
					$scope.liquidacionMantenimiento.a_cuenta = 0;
					$scope.liquidacionMantenimiento.saldo = $scope.liquidacionMantenimiento.importe_facturado;
				}
				$scope.liquidacionMantenimiento.id_estado = $scope.liquidacionMantenimiento.estado.id;
				$scope.liquidacionMantenimiento.edit = true;

				$scope.liquidacionMUpdate = $scope.liquidacionMantenimiento;
				$scope.liquidacionMUpdate.importe_facturado = Math.round($scope.liquidacionMUpdate.importe_facturado * 100) / 100;
				prom = GuardarNuevaOrdendeTrabajo($scope.liquidacionMUpdate, $scope.usuario.id_empresa)
				prom.then((res) => {
					if (res.hasErr) {
						$scope.liquidacionMantenimiento.estado = $scope.estadosMantenimiento.find(function (x) {
							return x.nombre_corto == "PENDIENTE"
						})
						$scope.mantenimientos[$scope.mantenimientos.indexOf($scope.mantenimientos.find(function (x) {
							return x.id == $scope.liquidacionMantenimiento.id
						}))]
						$scope.liquidacionMantenimiento.id_estado = $scope.liquidacionMantenimiento.estado.id
						$scope.ObteneVehiculos($scope.filtro);
						return $scope.mostrarMensaje(res.mensaje)
					} else {
						$scope.cerarModalLiquidacionMantenimiento();
						if (finalizar) {
							$scope.liquidacionMantenimiento.estado = $scope.estadosMantenimiento.find(function (x) {
								return x.nombre_corto == "FINALIZADO"
							})
							$scope.liqui = $scope.mantenimientos[$scope.mantenimientos.indexOf($scope.mantenimientos.find(function (x) {
								return x.id == $scope.liquidacionMantenimiento.id
							}))]

							$scope.liqui.estado = $scope.liquidacionMantenimiento.estado;

							$scope.cerrarDialogFinalizarLiquidacion();
						}
						$scope.ObteneVehiculos($scope.filtro);
						return $scope.imprimirLiquidacionTrabajo($scope.liquidacionMantenimiento)
					}
					
				}).catch((error) => { $scope.mostrarMensaje(error) })
			}

			// $scope.liquidacionManoDeObraPrecioUnitario = function(detalle){
			// 	var horas_decimal = (detalle.horas + (detalle.minutos ? detalle.minutos : 0) / 60)
			// 	return (detalle.precio_unitario.$$state.value ? detalle.precio_unitario.$$state.value: 0)
			// }

			$scope.liquidacionManodeObraTotalCliente = function (detalle) {
				// var horas_decimal = (detalle.horas + (detalle.minutos ? detalle.minutos : 0) / 60)
				detalle.horas_decimal = parseFloat(detalle.horas + (detalle.minutos ? detalle.minutos / 60 : 0))
				detalle.punitario = (detalle.precio_unitario.$$state.value ? detalle.precio_unitario.$$state.value : 0)
				if (detalle.importe_interno == null && detalle.importe_interno !== undefined) {
					detalle.importe_interno = Math.round((detalle.horas_decimal * (140 - 40)) * 1000) / 1000;
				} else {
					if ($scope.liquidacionMantenimiento.precio_predeterminados) {
						if ($scope.liquidacionMantenimiento.porcentaje) {
							detalle.total_cliente = (((detalle.especialidad.precio ? detalle.especialidad.precio : 0) * (detalle.importe_interno ? detalle.importe_interno : 0)) / 100)
						} else {
							detalle.total_cliente = (detalle.especialidad.precio ? detalle.especialidad.precio : 0) + ((detalle.importe_interno ? detalle.importe_interno : 0))
						}
					} else {
						if ($scope.liquidacionMantenimiento.porcentaje) {
							detalle.total_cliente = ((detalle.horas_decimal ? detalle.horas_decimal : 1) * (detalle.punitario)) + ((((detalle.horas_decimal ? detalle.horas_decimal : 1) * (detalle.punitario)) * (detalle.importe_interno ? detalle.importe_interno : 0)) / 100)
						} else {
							detalle.total_cliente = ((detalle.horas_decimal ? detalle.horas_decimal : 1) * (detalle.punitario)) + ((detalle.importe_interno ? detalle.importe_interno : 0))
						}
					}
				}
				return detalle.total_cliente

			}
			$scope.liquidacionMaterialesTotalCliente = function (detalle) {
				if ($scope.liquidacionMantenimiento.porcentaje) {
					detalle.total_cliente = ((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) + ((detalle.cantidad ? detalle.cantidad : 1) * ((detalle.importe ? detalle.importe : 0) * (detalle.importe_interno ? detalle.importe_interno : 0)) / 100)
				} else {
					if (detalle.importe_interno == null && detalle.importe_interno !== undefined) {
						detalle.importe_interno = Math.round(((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) * 0.4 * 1000) / 1000;
					}
					detalle.total_cliente = ((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) + (detalle.importe_interno ? detalle.importe_interno : 0)
				}
				return detalle.total_cliente
			}
			$scope.liquidacionServicioExternoTotalCliente = function (detalle) {
				if ($scope.liquidacionMantenimiento.porcentaje) {
					detalle.total_cliente = ((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) + ((((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) * (detalle.importe_interno ? detalle.importe_interno : 0)) / 100)
				} else {
					if (detalle.importe_interno == null && detalle.importe_interno !== undefined) {
						detalle.importe_interno = Math.round(((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) * 0.4 * 1000) / 1000;
					}
					detalle.total_cliente = ((detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0)) + (detalle.importe_interno ? detalle.importe_interno : 0)
				}
				return detalle.total_cliente
			}
			// $scope.liquidacionChaperiaTotalCliente = function (detalle) {
			// 	detalle.total_cliente = (detalle.cantidad ? detalle.cantidad : 1) * (detalle.importe ? detalle.importe : 0) + (detalle.importe_interno ? detalle.importe_interno : 0)
			// 	return detalle.total_cliente
			// }

			//calcula importe total a facturar en liquidacion y retorna el valor para ser visualizado
			$scope.liquidacionImporteFacturado = function () {
				if ($scope.liquidacionMantenimiento) {
					if ($scope.liquidacionMantenimiento.materiales) {
						if ($scope.liquidacionMantenimiento.materiales.length > 0) {
							var liqmateriales = $scope.liquidacionMantenimiento.materiales.map((ant, act, ind) => {
								return ant.total_cliente
							}).reduce((t, d, i) => {
								return t + d
							})
						} else {
							var liqmateriales = 0
						}
					} else {
						var liqmateriales = 0
					}
					if ($scope.liquidacionMantenimiento.manosDeObra) {
						if ($scope.liquidacionMantenimiento.manosDeObra.length > 0 && $scope.liquidacionMantenimiento.manosDeObra[0] != undefined) {
							var liqmanosDeObra = $scope.liquidacionMantenimiento.manosDeObra.map((ant, act, ind) => {
								return ant.total_cliente
							}).reduce((t, d, i) => {
								return t + d
							})
						} else {
							$scope.liquidacionMantenimiento.manosDeObra = [];
							var liqmanosDeObra = 0
						}
					} else {
						var liqmanosDeObra = 0
					}
					if ($scope.liquidacionMantenimiento.serviciosExternos) {
						if ($scope.liquidacionMantenimiento.serviciosExternos.length > 0) {
							var liqservicioExterno = $scope.liquidacionMantenimiento.serviciosExternos.map((ant, act, ind) => {
								return ant.total_cliente
							}).reduce((t, d, i) => {
								return t + d
							})
						} else {
							var liqservicioExterno = 0
						}
					} else {
						{
							var liqservicioExterno = 0
						}
					}

					// if ($scope.liquidacionMantenimiento.sistemas) {
					// 	var liqSistemas = $scope.liquidacionMantenimiento.sistemas.map((ant, act, ind) => {
					// 		return ant.total_cliente
					// 	}).reduce((t, d, i) => {
					// 		return t + d
					// 	})
					// } else {
					// 	var liqSistemas = 0
					// }
				} else {
					var liqmateriales = 0
					var liqservicioExterno = 0
					var liqmanosDeObra = 0
					var liqSistemas = 0
				}
				if($scope.liquidacionMantenimiento){
					$scope.liquidacionMantenimiento.importe_facturado = Math.round(liqmateriales * 100) / 100 + Math.round(liqmanosDeObra * 100) / 100 + Math.round(liqservicioExterno * 100) / 100 -  $scope.liquidacionMantenimiento.descuento;
					return $scope.liquidacionMantenimiento.importe_facturado;
				}
				return 0;
			}

			$scope.abrirModalLiquidacionMantenimiento = function (orden) {
				if($scope.configs.hrs_hombre){
					$scope.obtenerTiposDePago();
					$scope.liquidacionMantenimiento = {}
					var prom = ObtenerDatosVehiculo($scope.usuario.id, orden.id)
					prom.then(res => {
						$scope.liquidacionMantenimiento = res.mantenimiento;
						if($scope.liquidacionMantenimiento.fecha_hora_aviso){
							let fecha = new Date($scope.liquidacionMantenimiento.fecha_hora_aviso)
							let anio = fecha.getFullYear();
							let mes = fecha.getMonth()+ 1 < 10 ? "0"+(fecha.getMonth()+1): fecha.getMonth()+1;
							let dia = fecha.getDate() < 10 ? "0"+fecha.getDate(): fecha.getDate();
							let hora = fecha.getHours() < 10 ? "0"+fecha.getHours(): fecha.getHours();
							let minutos = fecha.getMinutes() < 10 ? "0"+fecha.getMinutes(): fecha.getMinutes();
							$scope.liquidacionMantenimiento.fecha_hora_aviso = anio + "-" + mes +"-"+dia+" "+hora+":"+minutos+":00";
						}
						if (!res.mantenimiento.descuento) {
							$scope.liquidacionMantenimiento.descuento = 0;
						}
						// Extrae id de la clase y el nombre para devolver un objeto {id:[sistema.idClaseSistema], nombre:[sistema.claseSistema.Nombre]
						$scope.liquidacionMantenimiento.sistemas = $scope.liquidacionMantenimiento.sistemas.map((prev, ind, ary) => {
							return { id: prev.id_orden_trabajo_sistema, nombre: prev.ordenTrabajoSistema.nombre, importe_interno: prev.importe_interno, total_cliente: prev.total_cliente }
						})
						$scope.liquidacionMantenimiento.precio_predeterminados = false;
						$scope.manoObraInCompleto = false;
						$scope.liquidacionMantenimiento.manosDeObra = $scope.liquidacionMantenimiento.manosDeObra.map((prev, ind, ary) => {
							if (prev.encargado) {
								prev.precio_unitario = $scope.obtenerPrecioUnitarioBaseSalarioPersona(prev.encargado.id)
								if (prev.especialidad.PreciosEspecialidad.length > 0) {
									prev.especialidad.precio = prev.especialidad.PreciosEspecialidad[0].precio;
								} else {
									prev.especialidad.precio = 0;
								}
								return prev
							} else {
								$scope.manoObraInCompleto = true
							}

							// return { id: prev.id_orden_trabajo_sistema, precio_unitario: ObtenerPrecioUnitarioBaseSalarioPersona(), nombre: prev.ordenTrabajoSistema.nombre, importe_interno: prev.importe_interno, total_cliente: prev.total_cliente }
						})
						// var totalmateriales = $scope.liquidacionMantenimiento.materiales
						if ($scope.manoObraInCompleto) {
							SweetAlert.swal("", "Complete el registro de Las Manos de Obras", "warning");
						} else {
							$scope.abrirPopup($scope.idModalLiquidacionMantenimiento);
						}

					}).catch((error) => {
						return $scope.mostrarMensaje(error.stack)
					})
				}else{
					SweetAlert.swal("", "Para realizar liquidaciones debe configurar factor horas hombre de mano de obra", "warning");
				}
			};
			$scope.obtenerPrecioUnitarioBaseSalarioPersona = function (idpersona) {
				return $q((fullfil, reject) => {
					const prom = SalarioPersona($scope.configs.hrs_hombre, idpersona);
					prom.then((precioPorHora) => {
						if (precioPorHora.hasErr) {
							throw Error(precioPorHora.mensaje)
						}
						fullfil(precioPorHora.salario)
					}).catch((err) => {
						$scope.mostrarMensaje(err)
						reject(0)
					})
				});
			}

			$scope.cerarModalLiquidacionMantenimiento = function () {
				$scope.cerrarPopup($scope.idModalLiquidacionMantenimiento);
			};

			$scope.cerrarDialogTipoImpresionLiquidacion = function () {
				$scope.cerrarPopup($scope.idTipoImpresionLiquidacion);
			}

			$scope.imprimirLiquidacionTrabajo = function (mantenimiento) {
				$scope.datosMantemiento = mantenimiento;
				$scope.abrirPopup($scope.idTipoImpresionLiquidacion);
			}





			$scope.imprimirLiquidacionTrabajoDetalle = function (conDetalle) {
				$scope.datosMantemiento.mantenimiento_externo ? $scope.imprimirLiquidacionExterno(conDetalle) : $scope.imprimirLiquidacionInterno(conDetalle);
			}

			$scope.dibujarCabeceraLiquidacionExterno = function (doc, mantenimiento, pagina, totalPaginas, imagenEmpresa) {
				doc.image(imagenEmpresa, 50, 35, { fit: [120, 75] });
				doc.font("Helvetica-Bold", 10).text("LIQUIDACIÓN", 0, 60, { align: 'center' });
				if (mantenimiento.tipoMantenimiento.nombre_corto == "CHAP") {
					doc.font("Helvetica", 8).text("(Chaperia)", 0, 73, { align: 'center' });
				} else {
					doc.font("Helvetica", 8).text("(Mecánica)", 0, 73, { align: 'center' });
				}
				doc.font("Helvetica-Bold", 10)
				doc.text("OT", 450, 40, { align: 'center' })
				doc.text(mantenimiento.correlativo_ot ? mantenimiento.correlativo_ot : "Error:Correlativo", 553, 40)
				doc.rect(550, 35, 50, 15, { align: 'center' }).stroke();

				doc.font("Helvetica", 8).text("Fecha: " + $scope.formatoFechaPDF(Date.now()), 45, 130);
				doc.font("Helvetica", 8).text("Fecha OT: " + $scope.formatoFechaPDF(mantenimiento.createdAt), 140, 130);
				doc.font("Helvetica-Bold", 8)
				doc.text("NOMBRE:", 45, 143);
				doc.text("TELEFONO:", 345, 143);
				doc.text("CEL:", 480, 143);
				doc.rect(40, 138, 560, 15).stroke();
				doc.font("Helvetica", 7)
				doc.text(mantenimiento.cliente_ot.razon_social, 88, 143, { width: 255 });
				var telefono1 = mantenimiento.cliente_ot.telefono1 ? mantenimiento.cliente_ot.telefono1 : "";
				doc.text(telefono1, 393, 143, { width: 85 });
				var telefono2 = mantenimiento.cliente_ot.telefono2 ? mantenimiento.cliente_ot.telefono2 : "";
				doc.text(telefono2, 503, 143, { width: 55 });

				doc.font("Helvetica-Bold", 8)
				doc.text("MARCA", 40, 158, { width: 90, align: 'center' });
				doc.rect(40, 153, 90, 15).stroke();
				doc.text("CHASIS", 130, 158, { width: 90, align: 'center' });
				doc.rect(130, 153, 90, 15).stroke();
				doc.text("MODELO", 220, 158, { width: 60, align: 'center' });
				doc.rect(220, 153, 60, 15).stroke();
				doc.text("PLACA", 280, 158, { width: 60, align: 'center' });
				doc.rect(280, 153, 60, 15).stroke();
				doc.text("COLOR", 340, 158, { width: 70, align: 'center' });
				doc.rect(340, 153, 70, 15).stroke();
				doc.text("KM/MILL", 410, 158, { width: 50, align: 'center' });
				doc.rect(410, 153, 50, 15).stroke();
				doc.text("AÑO", 460, 158, { width: 40, align: 'center' });
				doc.rect(460, 153, 40, 15).stroke();
				doc.text("TANQUE DE GASOLINA", 500, 158, { width: 100, align: 'center' });
				doc.rect(500, 153, 100, 15).stroke();
				doc.text("FECHA CANCELACIÓN", 40, 188, { width: 110, align: 'center' });
				doc.rect(40, 183, 110, 15).stroke();
				doc.rect(40, 198, 110, 15).stroke();
				doc.text("OBSERVACIONES: ", 153, 188);
				doc.rect(150, 183, 450, 30).stroke();
				doc.font('Helvetica-Bold', 8).text("DETALLE", 45, 225);


				doc.font("Helvetica", 7)
				doc.text(mantenimiento.vehiculo.marca ? mantenimiento.vehiculo.marca.toUpperCase() : "", 40, 173, { width: 90, align: 'center' });
				doc.rect(40, 168, 90, 15).stroke();
				var chasis = mantenimiento.vehiculo.chasis ? mantenimiento.vehiculo.chasis.toUpperCase() : "";
				doc.text(chasis, 130, 173, { width: 90, align: 'center' });
				doc.rect(130, 168, 90, 15).stroke();
				var modelo = mantenimiento.vehiculo.modelo ? mantenimiento.vehiculo.modelo.toUpperCase() : "";
				doc.text(modelo, 220, 173, { width: 60, align: 'center' });
				doc.rect(220, 168, 60, 15).stroke();
				var placa = mantenimiento.vehiculo.placa ? mantenimiento.vehiculo.placa.toUpperCase() : "";
				doc.text(placa, 280, 173, { width: 60, align: 'center' });
				doc.rect(280, 168, 60, 15).stroke();
				var color = mantenimiento.vehiculo.color ? mantenimiento.vehiculo.color.toUpperCase() : "";
				doc.text(color, 340, 173, { width: 70, align: 'center' });
				doc.rect(340, 168, 70, 15).stroke();
				var km = mantenimiento.vehiculo.km ? mantenimiento.vehiculo.km.toUpperCase() : "";
				doc.text(km, 410, 173, { width: 50, align: 'center' });
				doc.rect(410, 168, 50, 15).stroke();
				var anio = mantenimiento.vehiculo.anio ? mantenimiento.vehiculo.anio : "";
				doc.text(anio, 460, 173, { width: 40, align: 'center' });
				doc.rect(460, 168, 40, 15).stroke();
				if (mantenimiento.InventariosRecepcion.tamanioTanque != null) {
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T1") {
						doc.rect(500, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/4", 500, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/4", 500, 173, { width: 25, align: 'center' })
						doc.rect(500, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T2") {
						doc.rect(525, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/2", 525, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/2", 525, 173, { width: 25, align: 'center' })
						doc.rect(525, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T3") {
						doc.rect(550, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("3/4", 550, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("3/4", 550, 173, { width: 25, align: 'center' })
						doc.rect(550, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T4") {
						doc.rect(575, 168, 25.25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("F", 575, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("F", 575, 173, { width: 25, align: 'center' })
						doc.rect(575, 168, 25, 15).stroke();
					}
				} else {
					doc.rect(500, 168, 25, 15).stroke().text("1/4", 500, 173, { width: 25, align: 'center' })
					doc.rect(525, 168, 25, 15).stroke().text("1/2", 525, 173, { width: 25, align: 'center' })
					doc.rect(550, 168, 25, 15).stroke().text("3/4", 550, 173, { width: 25, align: 'center' })
					doc.rect(575, 168, 25, 15).stroke().text("F", 575, 173, { width: 25, align: 'center' })

				}
				var fecha_salida_taller = mantenimiento.fecha_hora_fin ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_fin) : ""
				// var fecha_ingreso_taller = mantenimiento.fecha_hora_inicio ? mantenimiento.fecha_hora_inicio : ""
				doc.text(fecha_salida_taller, 40, 203, { width: 110, align: 'center' });
				// doc.text($scope.formatoFechaPDF(fecha_ingreso_taller), 155, 272);
				doc.text(mantenimiento.observacion ? mantenimiento.observacion.toUpperCase() : "", 233, 188, { width: 368 });

			}

			$scope.imprimirLiquidacionExterno = (conDetalle) =>{
				convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
					if ($scope.datosMantemiento.producto) {
						$scope.datosMantemiento.vehiculo = producto
						$scope.datosMantemiento.placa = producto.caracteristica_especial1
					}
					var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
					var stream = doc.pipe(blobStream());
					var y = 120, itemsPorPagina = 20, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.datosMantemiento.length / itemsPorPagina);;
					$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
					var index = 0;
					var y_texto = 247;
					var y_cuadro = 240;
					var totalFacturado = 0
					if ($scope.datosMantemiento.materiales.length > 0) {
						if (conDetalle === undefined) {
							var helper = {};
							var result = $scope.datosMantemiento.materiales.reduce(function (acc, curr) {
								var key = curr.producto.id;
								if (!helper[key]) {
									helper[key] = Object.assign({}, curr); // create a copy of o
									//helper[key].importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
									acc.push(helper[key]);
								} else {
									helper[key].cantidad += curr.cantidad;
									helper[key].importe += curr.importe;
									helper[key].importe_interno += curr.importe_interno;
									helper[key].total_cliente += curr.total_cliente;
									helper[key].recalcularPU = true;
								}
								return acc;
							}, []);
							$scope.datosMantemiento.materiales = result;
						}
						doc.font("Helvetica-Bold", 8)
						doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						doc.text("MATERIALES Y REPUESTOS", 75, y_texto, { width: 290, align: 'center' });
						doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 290, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						// doc.rect(445, y_cuadro, 155, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						var totalMaterial = 0
						for (var i = 0; i < $scope.datosMantemiento.materiales.length; i++) {
							var materialOT = $scope.datosMantemiento.materiales[i];
							doc.text((materialOT.cantidad ? materialOT.cantidad : '1'), 45, y_texto, { width: 30 });
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							doc.text(materialOT.producto.nombre ? materialOT.producto.nombre.toUpperCase() : "", 85, y_texto, { width: 280 });
							if (materialOT.recalcularPU && conDetalle === undefined) {
								doc.text(materialOT.cantidad ? materialOT.total_cliente ? number_format_negativo_to_positvo(materialOT.total_cliente / materialOT.cantidad, 2) : '' : '', 365, y_texto, { width: 70, align: 'right' });
							} else {
								doc.text(number_format_negativo_to_positvo((materialOT.importe ? (materialOT.importe_interno) / (materialOT.cantidad ? materialOT.cantidad : 1) + materialOT.importe : (materialOT.total_cliente / (materialOT.cantidad ? materialOT.cantidad : 1))), 2), 365, y_texto, { width: 70, align: 'right' });
							}
							doc.text(number_format_negativo_to_positvo(Math.round(materialOT.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							totalMaterial += materialOT.total_cliente
							// totalFacturado += materialOT.total_cliente
							doc.rect(40, y_cuadro, 35, 15).stroke();
							doc.rect(445, y_cuadro, 76, 15).stroke();
							doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
							doc.rect(365, y_cuadro, 80, 15).stroke();
							doc.rect(75, y_cuadro, 370, 15).stroke()
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}
						}
						doc.text(number_format_negativo_to_positvo(Math.round(totalMaterial * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
						doc.rect(75, y_cuadro, 370, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
					}

					if ($scope.datosMantemiento.serviciosExternos.length > 0) {
						doc.font("Helvetica-Bold", 8)
						doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						doc.text("TRABAJOS TERCEROS", 75, y_texto, { width: 290, align: 'center' });  //, { align: 'center' }
						doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 290, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
						var totalServicioExterno = 0
						for (var i = 0; i < $scope.datosMantemiento.serviciosExternos.length; i++) {
							var manoDeObra = $scope.datosMantemiento.serviciosExternos[i];
							doc.text((manoDeObra.cantidad ? manoDeObra.cantidad : '1'), 45, y_texto, { width: 30, });
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							if (conDetalle === undefined) doc.text(manoDeObra.servicio.toUpperCase(), 85, y_texto, { width: 280 });
							if (conDetalle != undefined) doc.text(manoDeObra.empresa.razon_social.toUpperCase() + " " + manoDeObra.servicio.toUpperCase(), 85, y_texto, { width: 280 });
							doc.text((manoDeObra.importe ? manoDeObra.importe + manoDeObra.importe_interno : (manoDeObra.total_cliente / (manoDeObra.cantidad ? manoDeObra.cantidad : 1))).toFixed(2), 365, y_texto, { width: 70, align: 'right' });
							doc.text(number_format_negativo_to_positvo(Math.round(manoDeObra.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							doc.rect(40, y_cuadro, 35, 15).stroke();
							doc.rect(445, y_cuadro, 76, 15).stroke();
							doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
							doc.rect(75, y_cuadro, 370, 15).stroke();
							doc.rect(365, y_cuadro, 80, 15).stroke();
							totalServicioExterno += Math.round(manoDeObra.total_cliente * 100) / 100;
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5;
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}
						}
						doc.text(number_format_negativo_to_positvo(Math.round(totalServicioExterno * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 370, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}

					}
					if ($scope.datosMantemiento.manosDeObra.length > 0) {
						doc.font("Helvetica-Bold", 8)
						if ($scope.datosMantemiento.precio_predeterminados) {
							doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						} else {
							if (conDetalle == undefined) {
								doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
							} else {
								doc.font("Helvetica-Bold", 7)
								doc.text("HRS.", 40, y_texto, { width: 35, align: 'center' });
							}
						}

						doc.font("Helvetica-Bold", 8);

						var textoManodeObra = "MANO DE OBRA";

						if (conDetalle == undefined) {
							textoManodeObra += " / TRABAJOS REALIZADOS"
							doc.text(textoManodeObra, 75, y_texto, { width: 370, align: 'center' });
						} else {
							if (conDetalle) {
								textoManodeObra += " / TRABAJOS REALIZADOS"
							}
							doc.text(textoManodeObra, 75, y_texto, { width: 290, align: 'center' });
						}

						// doc.text(textoManodeObra, 180, y_texto);
						if (conDetalle != undefined) {
							doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						}
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						if (conDetalle != undefined) {
							doc.rect(75, y_cuadro, 290, 15).stroke()
							doc.rect(365, y_cuadro, 80, 15).stroke();
						} else {
							doc.rect(75, y_cuadro, 370, 15).stroke()

						}
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
						var totalManosObra = 0
						var b = 0;
						for (var i = 0; i < $scope.datosMantemiento.manosDeObra.length; i++) {
							var manoDeObra = $scope.datosMantemiento.manosDeObra[i];
							var h_cuadro = 15;
							manoDeObra.trabajo_realizado = manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado : "";
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							if (conDetalle && manoDeObra.trabajo_realizado.length > 83) {
								b = b + 1;
								var cantidadC = manoDeObra.trabajo_realizado.length / 78;
								h_cuadro = h_cuadro + parseInt(cantidadC) * 10;
							} else if (!conDetalle && manoDeObra.especialidad.nombre.length > 83) {
								b = b + 1;
								var cantidadC = manoDeObra.especialidad.nombre.length / 78;
								h_cuadro = h_cuadro + parseInt(cantidadC) * 10;
								// h_cuadro = h_cuadro + 10;
							}

							if (b >= 1 && i >= 1) {
								var textomenor = $scope.datosMantemiento.manosDeObra[i - 1];
								var textTrabajoRealizadoAnterior = textomenor.trabajo_realizado ? textomenor.trabajo_realizado : "";

								// if (textomenor.especialidad.nombre.length>38 || textTrabajoRealizadoAnterior.length > 83) {
								// 	var cantidadC = textTrabajoRealizadoAnterior.length / 83;

								// 	y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
								// 	y_texto = y_texto + parseInt(cantidadC) * 10;
								// }

								if (conDetalle && textTrabajoRealizadoAnterior.length > 83) {
									var cantidadC = textTrabajoRealizadoAnterior.length / 78;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								} else if (!conDetalle && textomenor.especialidad.nombre.length > 83) {
									var cantidadC = textomenor.especialidad.nombre.length / 78;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								}

							}

							if ($scope.datosMantemiento.precio_predeterminados) {
								doc.text(1, 45, y_texto, { width: 30 });
							} else {
								if (conDetalle == undefined) {
									doc.text('1', 45, y_texto, { width: 30 });
								} else {

									doc.text((manoDeObra.horas ? manoDeObra.horas : 0) + ':' + (manoDeObra.minutos ? ("0" + manoDeObra.minutos).slice(-2) : '00'), 45, y_texto, { width: 30 });
								}
							}

							if (conDetalle != undefined) {
								if (conDetalle) {
									doc.text(manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado.toUpperCase() : "", 82, y_texto, { width: 280 });
								} else {
									if (cantidadC > 1) y_texto -= 2;
									doc.lineGap(-2).text(manoDeObra.especialidad.nombre ? manoDeObra.especialidad.nombre.toUpperCase() : '', 78, y_texto, { width: 285 });
									if (cantidadC > 1) y_texto += 2;
								}
							} else {
								doc.text(manoDeObra.especialidad.nombre ? manoDeObra.especialidad.nombre.toUpperCase() : "", 82, y_texto, { width: 360 });
							}
							if (conDetalle != undefined) {
								if ($scope.datosMantemiento.precio_predeterminados) {
									doc.text(number_format_negativo_to_positvo(manoDeObra.total_cliente, 2), 365, y_texto, { width: 70, align: 'right' });
								} else {
									doc.text(number_format_negativo_to_positvo(manoDeObra.precio_unitario.$$state.value ? manoDeObra.precio_unitario.$$state.value + manoDeObra.importe_interno / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1) : (manoDeObra.total_cliente / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1)), 2), 365, y_texto, { width: 70, align: 'right' });
								}
							}
							// doc.text((manoDeObra.precio_unitario.$$state.value ? manoDeObra.precio_unitario.$$state.value + manoDeObra.importe_interno : (manoDeObra.total_cliente / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1))).toFixed(2), 390, y_texto);
							doc.text(number_format_negativo_to_positvo(Math.round(manoDeObra.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							doc.rect(40, y_cuadro, 35, h_cuadro).stroke();
							if (conDetalle != undefined) {
								doc.rect(75, y_cuadro, 290, h_cuadro).stroke()
							} else {
								doc.rect(75, y_cuadro, 370, h_cuadro).stroke()
							}
							if (conDetalle != undefined) {
								doc.rect(365, y_cuadro, 80, h_cuadro).stroke();
							}
							doc.rect(445, y_cuadro, 76, h_cuadro).stroke();
							doc.rect(521, y_cuadro, 80, h_cuadro).stroke();
							totalManosObra += manoDeObra.total_cliente
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}

							if (i == $scope.datosMantemiento.manosDeObra.length - 1) {
								var ManoObraUltimo = $scope.datosMantemiento.manosDeObra[i];
								var textTRAnterior = ManoObraUltimo.trabajo_realizado ? ManoObraUltimo.trabajo_realizado : "";

								if (conDetalle && textTRAnterior.length > 83) {
									var cantidadC = textTRAnterior.length / 83;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								} else if (!conDetalle && ManoObraUltimo.especialidad.nombre.length > 84) {
									var cantidadC = ManoObraUltimo.especialidad.nombre.length / 83;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								}

								doc.text(number_format_negativo_to_positvo(Math.round(totalManosObra * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
								doc.rect(521, y_cuadro, 80, 15).stroke();

							}
							// console.log(y_cuadro)
							if (y_cuadro >= 719) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 120;
								items = 0;
								var y_texto = 57;
								var y_cuadro = 50;
								pagina = pagina + 1;
								// $scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								// doc.font('Helvetica', 6);
								if (i != $scope.datosMantemiento.manosDeObra.length - 1) {
									doc.font("Helvetica-Bold", 8)
									if ($scope.datosMantemiento.precio_predeterminados) {
										doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
									} else {
										if (conDetalle == undefined) {
											doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
										} else {
											doc.font("Helvetica-Bold", 7)
											doc.text("HRS.", 40, y_texto, { width: 35, align: 'center' });
										}
									}

									doc.font("Helvetica-Bold", 8);

									var textoManodeObra = "MANO DE OBRA.";

									if (conDetalle == undefined) {
										textoManodeObra += " / TRABAJOS REALIZADOS"
										doc.text(textoManodeObra, 75, y_texto, { width: 370, align: 'center' });
									} else {
										if (conDetalle) {
											textoManodeObra += " / TRABAJOS REALIZADOS"
										}
										doc.text(textoManodeObra, 75, y_texto, { width: 290, align: 'center' });
									}

									// doc.text(textoManodeObra, 180, y_texto);
									doc.font("Helvetica", 8)
									if (conDetalle != undefined) {
										doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
									}
									doc.text("SUB-TOTAL.", 445, y_texto, { width: 76, align: 'center' })
									doc.text("TOTAL.", 521, y_texto, { width: 80, align: 'center' })
									doc.rect(40, y_cuadro, 35, 15).stroke();
									if (conDetalle != undefined) {
										doc.rect(75, y_cuadro, 290, 15).stroke()
										doc.rect(365, y_cuadro, 80, 15).stroke();
									} else {
										doc.rect(75, y_cuadro, 370, 15).stroke()

									}
									doc.rect(445, y_cuadro, 76, 15).stroke();
									doc.rect(521, y_cuadro, 80, 15).stroke();
									y_cuadro = y_cuadro + 15;
									y_texto = y_cuadro + 5;
									if (y_cuadro >= 735) {
										doc.addPage({ compress: false, size: [612, 792], margin: 10 });
										$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
										y_texto = 247;
										y_cuadro = 240;
										doc.font('Helvetica', 6);
									}
								}
							}
						}
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro > 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
					}
					if (y_cuadro >= 735) {
						doc.addPage({ compress: false, size: [612, 792], margin: 10 });
						$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
						y_texto = 247;
						y_cuadro = 240;
						doc.font('Helvetica', 6);
					}
					doc.font("Helvetica-Bold", 7).text("OBSERVACION DESCUENTO:", 45, y_texto + 15);
					doc.font("Helvetica", 7).text($scope.datosMantemiento.observacion_descuento ? $scope.datosMantemiento.observacion_descuento.toUpperCase() : '', 150, y_texto + 15, { width: 385 });
					if (y_cuadro + 115 >= 735) {
						doc.addPage({ compress: false, size: [612, 792], margin: 10 });
						$scope.dibujarCabeceraLiquidacionExterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
						y_texto = 247;
						y_cuadro = 240;
						doc.font('Helvetica', 6);
					}
					doc.font("Helvetica-Bold", 7);
					doc.text("IMPORTE TOTAL", 480, y_texto + 15, { width: 64, align: 'right' });
					doc.rect(480, y_cuadro + 15, 70, 15).stroke();
					var importe_total = $scope.datosMantemiento.importe_facturado + $scope.datosMantemiento.descuento;
					doc.text(number_format_negativo_to_positvo(importe_total, 2), 550, y_texto + 15, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 15, 50, 15).stroke();

					doc.text("DESCUENTO", 480, y_texto + 30, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 30, 70, 15).stroke();
					doc.text(number_format_negativo_to_positvo($scope.datosMantemiento.descuento, 2), 550, y_texto + 30, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 30, 50, 15).stroke();

					doc.text("TOTAL", 480, y_texto + 45, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 45, 70, 15).stroke();
					doc.text(number_format_negativo_to_positvo($scope.datosMantemiento.importe_facturado, 2), 550, y_texto + 45, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 45, 50, 15).stroke();

					doc.text("A CUENTA", 480, y_texto + 60, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 60, 70, 15).stroke();
					doc.text(number_format_negativo_to_positvo($scope.datosMantemiento.a_cuenta, 2), 550, y_texto + 60, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 60, 50, 15).stroke();

					doc.text("SALDO", 480, y_texto + 75, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 75, 70, 15).stroke();
					$scope.saldoM = $scope.datosMantemiento.estado.nombre_corto == "PENDIENTE" ? ($scope.datosMantemiento.importe_facturado - $scope.datosMantemiento.a_cuenta) : $scope.datosMantemiento.saldo; 
					doc.text(number_format_negativo_to_positvo($scope.saldoM, 2), 550, y_texto + 75, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 75, 50, 15).stroke();

					doc.text("CLIENTE", -350, y_texto + 115, { align: 'center' });
					doc.text("ENCARGADO TALLER", 0, y_texto + 115, { align: 'center' });
					doc.text("CAJA", 350, y_texto + 115, { align: 'center' });
					doc.rect(75, y_texto + 110, 100, 0).stroke();
					doc.rect(250, y_texto + 110, 100, 0).stroke();
					doc.rect(430, y_texto + 110, 100, 0).stroke();

					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						$scope.liquidacionMantenimiento = {}
						window.open(fileURL, '_blank', 'location=no');
					});

					$scope.cerrarDialogTipoImpresionLiquidacion();
				});
			}
			$scope.dibujarCabeceraLiquidacionInterno = function (doc, mantenimiento, pagina, totalPaginas, imagenEmpresa) {
				doc.image(imagenEmpresa, 50, 35, { fit: [120, 75] });
				doc.font("Helvetica-Bold", 10).text("LIQUIDACIÓN", 0, 60, { align: 'center' });
				if (mantenimiento.tipoMantenimiento.nombre_corto == "CHAP") {
					doc.font("Helvetica", 8).text("(Chaperia)", 0, 73, { align: 'center' });
				} else {
					doc.font("Helvetica", 8).text("(Mecánica)", 0, 73, { align: 'center' });
				}
				doc.font("Helvetica-Bold", 10)
				doc.text("OT", 450, 40, { align: 'center' })
				doc.text(mantenimiento.correlativo_ot ? mantenimiento.correlativo_ot : "Error:Correlativo", 553, 40)
				doc.rect(550, 35, 50, 15, { align: 'center' }).stroke();

				doc.font("Helvetica", 8).text("Fecha: " + $scope.formatoFechaPDF(Date.now()), 45, 130);
				doc.font("Helvetica", 8).text("Fecha OT: " + $scope.formatoFechaPDF(mantenimiento.createdAt), 140, 130);

				doc.font("Helvetica-Bold", 8)
				doc.text("MARCA", 40, 158, { width: 90, align: 'center' });
				doc.rect(40, 153, 90, 15).stroke();
				doc.text("CHASIS", 130, 158, { width: 90, align: 'center' });
				doc.rect(130, 153, 90, 15).stroke();
				doc.text("MODELO", 220, 158, { width: 60, align: 'center' });
				doc.rect(220, 153, 60, 15).stroke();
				doc.text("PLACA", 280, 158, { width: 60, align: 'center' });
				doc.rect(280, 153, 60, 15).stroke();
				doc.text("COLOR", 340, 158, { width: 70, align: 'center' });
				doc.rect(340, 153, 70, 15).stroke();
				doc.text("KM/MILL", 410, 158, { width: 50, align: 'center' });
				doc.rect(410, 153, 50, 15).stroke();
				doc.text("AÑO", 460, 158, { width: 40, align: 'center' });
				doc.rect(460, 153, 40, 15).stroke();
				doc.text("TANQUE DE GASOLINA", 500, 158, { width: 100, align: 'center' });
				doc.rect(500, 153, 100, 15).stroke();
				doc.text("FECHA CANCELACIÓN", 40, 188, { width: 110, align: 'center' });
				doc.rect(40, 183, 110, 15).stroke();
				doc.rect(40, 198, 110, 15).stroke();
				doc.text("OBSERVACIONES: ", 153, 188);
				doc.rect(150, 183, 450, 30).stroke();
				doc.font('Helvetica-Bold', 8).text("DETALLE", 45, 225);


				doc.font("Helvetica", 7)
				doc.text(mantenimiento.vehiculo.marca ? mantenimiento.vehiculo.marca.toUpperCase() : "", 40, 173, { width: 90, align: 'center' });
				doc.rect(40, 168, 90, 15).stroke();
				var chasis = mantenimiento.vehiculo.chasis ? mantenimiento.vehiculo.chasis.toUpperCase() : "";
				doc.text(chasis, 130, 173, { width: 90, align: 'center' });
				doc.rect(130, 168, 90, 15).stroke();
				var modelo = mantenimiento.vehiculo.modelo ? mantenimiento.vehiculo.modelo.toUpperCase() : "";
				doc.text(modelo, 220, 173, { width: 60, align: 'center' });
				doc.rect(220, 168, 60, 15).stroke();
				var placa = mantenimiento.vehiculo.placa ? mantenimiento.vehiculo.placa.toUpperCase() : "";
				doc.text(placa, 280, 173, { width: 60, align: 'center' });
				doc.rect(280, 168, 60, 15).stroke();
				var color = mantenimiento.vehiculo.color ? mantenimiento.vehiculo.color.toUpperCase() : "";
				doc.text(color, 340, 173, { width: 70, align: 'center' });
				doc.rect(340, 168, 70, 15).stroke();
				var km = mantenimiento.vehiculo.km ? mantenimiento.vehiculo.km.toUpperCase() : "";
				doc.text(km, 410, 173, { width: 50, align: 'center' });
				doc.rect(410, 168, 50, 15).stroke();
				var anio = mantenimiento.vehiculo.anio ? mantenimiento.vehiculo.anio : "";
				doc.text(anio, 460, 173, { width: 40, align: 'center' });
				doc.rect(460, 168, 40, 15).stroke();
				if (mantenimiento.InventariosRecepcion.tamanioTanque != null) {
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T1") {
						doc.rect(500, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/4", 500, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/4", 500, 173, { width: 25, align: 'center' })
						doc.rect(500, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T2") {
						doc.rect(525, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("1/2", 525, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("1/2", 525, 173, { width: 25, align: 'center' })
						doc.rect(525, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T3") {
						doc.rect(550, 168, 25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("3/4", 550, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("3/4", 550, 173, { width: 25, align: 'center' })
						doc.rect(550, 168, 25, 15).stroke();
					}
					if (mantenimiento.InventariosRecepcion.tamanioTanque.nombre_corto == "T4") {
						doc.rect(575, 168, 25.25, 15).fill('#032751').fillColor('#000');
						doc.fillColor('#fff').text("F", 575, 173, { width: 25, align: 'center' });
						doc.fillColor('#000');
					} else {
						doc.text("F", 575, 173, { width: 25, align: 'center' })
						doc.rect(575, 168, 25, 15).stroke();
					}
				} else {
					doc.rect(500, 168, 25, 15).stroke().text("1/4", 500, 173, { width: 25, align: 'center' })
					doc.rect(525, 168, 25, 15).stroke().text("1/2", 525, 173, { width: 25, align: 'center' })
					doc.rect(550, 168, 25, 15).stroke().text("3/4", 550, 173, { width: 25, align: 'center' })
					doc.rect(575, 168, 25, 15).stroke().text("F", 575, 173, { width: 25, align: 'center' })

				}
				var fecha_salida_taller = mantenimiento.fecha_hora_fin ? $scope.formatoFechaPDF(mantenimiento.fecha_hora_fin) : ""
				// var fecha_ingreso_taller = mantenimiento.fecha_hora_inicio ? mantenimiento.fecha_hora_inicio : ""
				doc.text(fecha_salida_taller, 40, 203, { width: 110, align: 'center' });
				// doc.text($scope.formatoFechaPDF(fecha_ingreso_taller), 155, 272);
				doc.text(mantenimiento.observacion ? mantenimiento.observacion.toUpperCase() : "", 233, 188, { width: 368 });

			}
			$scope.imprimirLiquidacionInterno = (conDetalle) => {
				convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
					/* console.log('tipo mantenimineto empresa', $scope.usuario.empresa.usar_mantenimiento_externo_propio);
					console.log('datosMantemiento ', $scope.datosMantemiento);

					if ($scope.datosMantemiento.producto) {
						$scope.datosMantemiento.vehiculo = producto
						$scope.datosMantemiento.placa = producto.caracteristica_especial1
					} */
					var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 10 });
					var stream = doc.pipe(blobStream());
					var y = 120, itemsPorPagina = 20, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.datosMantemiento.length / itemsPorPagina);;
					$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
					var index = 0;
					var y_texto = 247;
					var y_cuadro = 240;
					var totalFacturado = 0
					if ($scope.datosMantemiento.materiales.length > 0) {
						if (conDetalle === undefined) {
							var helper = {};
							var result = $scope.datosMantemiento.materiales.reduce(function (acc, curr) {
								var key = curr.producto.id;
								if (!helper[key]) {
									helper[key] = Object.assign({}, curr); // create a copy of o
									//helper[key].importe_interno = $scope.liquidacionMantenimiento.montoPorcentajeDeseado
									acc.push(helper[key]);
								} else {
									helper[key].cantidad += curr.cantidad;
									helper[key].importe += curr.importe;
									helper[key].importe_interno += curr.importe_interno;
									helper[key].total_cliente += curr.total_cliente;
									helper[key].recalcularPU = true;
								}
								return acc;
							}, []);
							$scope.datosMantemiento.materiales = result;
						}
						doc.font("Helvetica-Bold", 8)
						doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						doc.text("MATERIALES Y REPUESTOS", 75, y_texto, { width: 290, align: 'center' });
						doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 290, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						// doc.rect(445, y_cuadro, 155, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						var totalMaterial = 0
						for (var i = 0; i < $scope.datosMantemiento.materiales.length; i++) {
							var materialOT = $scope.datosMantemiento.materiales[i];
							doc.text((materialOT.cantidad ? materialOT.cantidad : '1'), 45, y_texto, { width: 30 });
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							doc.text(materialOT.producto.nombre ? materialOT.producto.nombre.toUpperCase() : "", 85, y_texto, { width: 280 });
							if (materialOT.recalcularPU && conDetalle === undefined) {
								doc.text(materialOT.cantidad ? materialOT.total_cliente ? number_format_negativo_to_positvo(materialOT.total_cliente / materialOT.cantidad, 2) : '' : '', 365, y_texto, { width: 70, align: 'right' });
							} else {
								doc.text(number_format_negativo_to_positvo((materialOT.importe ? (materialOT.importe_interno) / (materialOT.cantidad ? materialOT.cantidad : 1) + materialOT.importe : (materialOT.total_cliente / (materialOT.cantidad ? materialOT.cantidad : 1))), 2), 365, y_texto, { width: 70, align: 'right' });
							}
							doc.text(number_format_negativo_to_positvo(Math.round(materialOT.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							totalMaterial += materialOT.total_cliente
							// totalFacturado += materialOT.total_cliente
							doc.rect(40, y_cuadro, 35, 15).stroke();
							doc.rect(445, y_cuadro, 76, 15).stroke();
							doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
							doc.rect(365, y_cuadro, 80, 15).stroke();
							doc.rect(75, y_cuadro, 370, 15).stroke()
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}
						}
						doc.text(number_format_negativo_to_positvo(Math.round(totalMaterial * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
						doc.rect(75, y_cuadro, 370, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
					}

					if ($scope.datosMantemiento.serviciosExternos.length > 0) {
						doc.font("Helvetica-Bold", 8)
						doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						doc.text("TRABAJOS TERCEROS", 75, y_texto, { width: 290, align: 'center' });  //, { align: 'center' }
						doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 290, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
						var totalServicioExterno = 0
						for (var i = 0; i < $scope.datosMantemiento.serviciosExternos.length; i++) {
							var manoDeObra = $scope.datosMantemiento.serviciosExternos[i];
							doc.text((manoDeObra.cantidad ? manoDeObra.cantidad : '1'), 45, y_texto, { width: 30, });
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							if (conDetalle === undefined) doc.text(manoDeObra.servicio.toUpperCase(), 85, y_texto, { width: 280 });
							if (conDetalle != undefined) doc.text(manoDeObra.empresa.razon_social.toUpperCase() + " " + manoDeObra.servicio.toUpperCase(), 85, y_texto, { width: 280 });
							doc.text((manoDeObra.importe ? manoDeObra.importe + manoDeObra.importe_interno : (manoDeObra.total_cliente / (manoDeObra.cantidad ? manoDeObra.cantidad : 1))).toFixed(2), 365, y_texto, { width: 70, align: 'right' });
							doc.text(number_format_negativo_to_positvo(Math.round(manoDeObra.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							doc.rect(40, y_cuadro, 35, 15).stroke();
							doc.rect(445, y_cuadro, 76, 15).stroke();
							doc.rect(445 + 76, y_cuadro, 80, 15).stroke();
							doc.rect(75, y_cuadro, 370, 15).stroke();
							doc.rect(365, y_cuadro, 80, 15).stroke();
							totalServicioExterno += Math.round(manoDeObra.total_cliente * 100) / 100;
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5;
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}
						}
						doc.text(number_format_negativo_to_positvo(Math.round(totalServicioExterno * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
						doc.rect(40, y_cuadro, 35, 15).stroke();
						doc.rect(75, y_cuadro, 370, 15).stroke()
						doc.rect(365, y_cuadro, 80, 15).stroke();
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}

					}
					if ($scope.datosMantemiento.manosDeObra.length > 0) {
						doc.font("Helvetica-Bold", 8)
						if ($scope.datosMantemiento.precio_predeterminados) {
							doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
						} else {
							if (conDetalle == undefined) {
								doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
							} else {
								doc.font("Helvetica-Bold", 7)
								doc.text("HRS.", 40, y_texto, { width: 35, align: 'center' });
							}
						}

						doc.font("Helvetica-Bold", 8);

						var textoManodeObra = "MANO DE OBRA";

						if (conDetalle == undefined) {
							textoManodeObra += " / TRABAJOS REALIZADOS"
							doc.text(textoManodeObra, 75, y_texto, { width: 370, align: 'center' });
						} else {
							if (conDetalle) {
								textoManodeObra += " / TRABAJOS REALIZADOS"
							}
							doc.text(textoManodeObra, 75, y_texto, { width: 290, align: 'center' });
						}

						// doc.text(textoManodeObra, 180, y_texto);
						if (conDetalle != undefined) {
							doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
						}
						doc.text("SUB-TOTAL", 445, y_texto, { width: 76, align: 'center' })
						doc.text("TOTAL", 521, y_texto, { width: 80, align: 'center' })
						doc.font("Helvetica", 7)
						doc.rect(40, y_cuadro, 35, 15).stroke();
						if (conDetalle != undefined) {
							doc.rect(75, y_cuadro, 290, 15).stroke()
							doc.rect(365, y_cuadro, 80, 15).stroke();
						} else {
							doc.rect(75, y_cuadro, 370, 15).stroke()

						}
						doc.rect(445, y_cuadro, 76, 15).stroke();
						doc.rect(521, y_cuadro, 80, 15).stroke();
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
						var totalManosObra = 0
						var b = 0;
						for (var i = 0; i < $scope.datosMantemiento.manosDeObra.length; i++) {
							var manoDeObra = $scope.datosMantemiento.manosDeObra[i];
							var h_cuadro = 15;
							manoDeObra.trabajo_realizado = manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado : "";
							// doc.rect(40, y_cuadro, 15, 15).stroke();
							if (conDetalle && manoDeObra.trabajo_realizado.length > 83) {
								b = b + 1;
								var cantidadC = manoDeObra.trabajo_realizado.length / 78;
								h_cuadro = h_cuadro + parseInt(cantidadC) * 10;
							} else if (!conDetalle && manoDeObra.especialidad.nombre.length > 83) {
								b = b + 1;
								var cantidadC = manoDeObra.especialidad.nombre.length / 78;
								h_cuadro = h_cuadro + parseInt(cantidadC) * 10;
								// h_cuadro = h_cuadro + 10;
							}

							if (b >= 1 && i >= 1) {
								var textomenor = $scope.datosMantemiento.manosDeObra[i - 1];
								var textTrabajoRealizadoAnterior = textomenor.trabajo_realizado ? textomenor.trabajo_realizado : "";

								// if (textomenor.especialidad.nombre.length>38 || textTrabajoRealizadoAnterior.length > 83) {
								// 	var cantidadC = textTrabajoRealizadoAnterior.length / 83;

								// 	y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
								// 	y_texto = y_texto + parseInt(cantidadC) * 10;
								// }

								if (conDetalle && textTrabajoRealizadoAnterior.length > 83) {
									var cantidadC = textTrabajoRealizadoAnterior.length / 78;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								} else if (!conDetalle && textomenor.especialidad.nombre.length > 83) {
									var cantidadC = textomenor.especialidad.nombre.length / 78;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								}

							}

							if ($scope.datosMantemiento.precio_predeterminados) {
								doc.text(1, 45, y_texto, { width: 30 });
							} else {
								if (conDetalle == undefined) {
									doc.text('1', 45, y_texto, { width: 30 });
								} else {

									doc.text((manoDeObra.horas ? manoDeObra.horas : 0) + ':' + (manoDeObra.minutos ? ("0" + manoDeObra.minutos).slice(-2) : '00'), 45, y_texto, { width: 30 });
								}
							}

							if (conDetalle != undefined) {
								if (conDetalle) {
									doc.text(manoDeObra.trabajo_realizado ? manoDeObra.trabajo_realizado.toUpperCase() : "", 82, y_texto, { width: 280 });
								} else {
									if (cantidadC > 1) y_texto -= 2;
									doc.lineGap(-2).text(manoDeObra.especialidad.nombre ? manoDeObra.especialidad.nombre.toUpperCase() : '', 78, y_texto, { width: 285 });
									if (cantidadC > 1) y_texto += 2;
								}
							} else {
								doc.text(manoDeObra.especialidad.nombre ? manoDeObra.especialidad.nombre.toUpperCase() : "", 82, y_texto, { width: 360 });
							}
							if (conDetalle != undefined) {
								if ($scope.datosMantemiento.precio_predeterminados) {
									doc.text(number_format_negativo_to_positvo(manoDeObra.total_cliente, 2), 365, y_texto, { width: 70, align: 'right' });
								} else {
									doc.text(number_format_negativo_to_positvo(manoDeObra.precio_unitario.$$state.value ? manoDeObra.precio_unitario.$$state.value + manoDeObra.importe_interno / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1) : (manoDeObra.total_cliente / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1)), 2), 365, y_texto, { width: 70, align: 'right' });
								}
							}
							// doc.text((manoDeObra.precio_unitario.$$state.value ? manoDeObra.precio_unitario.$$state.value + manoDeObra.importe_interno : (manoDeObra.total_cliente / (manoDeObra.horas_decimal ? manoDeObra.horas_decimal : 1))).toFixed(2), 390, y_texto);
							doc.text(number_format_negativo_to_positvo(Math.round(manoDeObra.total_cliente * 100) / 100, 2), 445, y_texto, { width: 70, align: 'right' });
							doc.rect(40, y_cuadro, 35, h_cuadro).stroke();
							if (conDetalle != undefined) {
								doc.rect(75, y_cuadro, 290, h_cuadro).stroke()
							} else {
								doc.rect(75, y_cuadro, 370, h_cuadro).stroke()
							}
							if (conDetalle != undefined) {
								doc.rect(365, y_cuadro, 80, h_cuadro).stroke();
							}
							doc.rect(445, y_cuadro, 76, h_cuadro).stroke();
							doc.rect(521, y_cuadro, 80, h_cuadro).stroke();
							totalManosObra += manoDeObra.total_cliente
							index = index + 1;
							y_cuadro = y_cuadro + 15;
							y_texto = y_cuadro + 5
							if (y_cuadro >= 735) {
								doc.addPage({ compress: false, size: [612, 792], margin: 10 });
								$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								y_texto = 247;
								y_cuadro = 240;
								doc.font('Helvetica', 6);
							}

							if (i == $scope.datosMantemiento.manosDeObra.length - 1) {
								var ManoObraUltimo = $scope.datosMantemiento.manosDeObra[i];
								var textTRAnterior = ManoObraUltimo.trabajo_realizado ? ManoObraUltimo.trabajo_realizado : "";

								if (conDetalle && textTRAnterior.length > 83) {
									var cantidadC = textTRAnterior.length / 83;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								} else if (!conDetalle && ManoObraUltimo.especialidad.nombre.length > 84) {
									var cantidadC = ManoObraUltimo.especialidad.nombre.length / 83;
									y_cuadro = y_cuadro + parseInt(cantidadC) * 10;
									y_texto = y_texto + parseInt(cantidadC) * 10;
								}

								doc.text(number_format_negativo_to_positvo(Math.round(totalManosObra * 100) / 100, 2), 521, y_texto, { width: 71, align: 'right' });
								doc.rect(521, y_cuadro, 80, 15).stroke();

							}
							// console.log(y_cuadro)
							if (y_cuadro >= 719) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 120;
								items = 0;
								var y_texto = 57;
								var y_cuadro = 50;
								pagina = pagina + 1;
								// $scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
								// doc.font('Helvetica', 6);
								if (i != $scope.datosMantemiento.manosDeObra.length - 1) {
									doc.font("Helvetica-Bold", 8)
									if ($scope.datosMantemiento.precio_predeterminados) {
										doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
									} else {
										if (conDetalle == undefined) {
											doc.text("CANT.", 40, y_texto, { width: 35, align: 'center' });
										} else {
											doc.font("Helvetica-Bold", 7)
											doc.text("HRS.", 40, y_texto, { width: 35, align: 'center' });
										}
									}

									doc.font("Helvetica-Bold", 8);

									var textoManodeObra = "MANO DE OBRA.";

									if (conDetalle == undefined) {
										textoManodeObra += " / TRABAJOS REALIZADOS"
										doc.text(textoManodeObra, 75, y_texto, { width: 370, align: 'center' });
									} else {
										if (conDetalle) {
											textoManodeObra += " / TRABAJOS REALIZADOS"
										}
										doc.text(textoManodeObra, 75, y_texto, { width: 290, align: 'center' });
									}

									// doc.text(textoManodeObra, 180, y_texto);
									doc.font("Helvetica", 8)
									if (conDetalle != undefined) {
										doc.text("P. UNIT.", 365, y_texto, { width: 80, align: 'center' })
									}
									doc.text("SUB-TOTAL.", 445, y_texto, { width: 76, align: 'center' })
									doc.text("TOTAL.", 521, y_texto, { width: 80, align: 'center' })
									doc.rect(40, y_cuadro, 35, 15).stroke();
									if (conDetalle != undefined) {
										doc.rect(75, y_cuadro, 290, 15).stroke()
										doc.rect(365, y_cuadro, 80, 15).stroke();
									} else {
										doc.rect(75, y_cuadro, 370, 15).stroke()

									}
									doc.rect(445, y_cuadro, 76, 15).stroke();
									doc.rect(521, y_cuadro, 80, 15).stroke();
									y_cuadro = y_cuadro + 15;
									y_texto = y_cuadro + 5;
									if (y_cuadro >= 735) {
										doc.addPage({ compress: false, size: [612, 792], margin: 10 });
										$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
										y_texto = 247;
										y_cuadro = 240;
										doc.font('Helvetica', 6);
									}
								}
							}
						}
						index = index + 1;
						y_cuadro = y_cuadro + 15;
						y_texto = y_cuadro + 5;
						if (y_cuadro >= 735) {
							doc.addPage({ compress: false, size: [612, 792], margin: 10 });
							$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
							y_texto = 247;
							y_cuadro = 240;
							doc.font('Helvetica', 6);
						}
					}
					if (y_cuadro >= 735) {
						doc.addPage({ compress: false, size: [612, 792], margin: 10 });
						$scope.dibujarCabeceraLiquidacionInterno(doc, $scope.datosMantemiento, pagina, totalPaginas, imagenEmpresa);
						y_texto = 247;
						y_cuadro = 240;
						doc.font('Helvetica', 6);
					}
					doc.font("Helvetica-Bold", 7).text("OBSERVACION DESCUENTO:", 45, y_texto + 15);
					doc.font("Helvetica", 7).text($scope.datosMantemiento.observacion_descuento ? $scope.datosMantemiento.observacion_descuento.toUpperCase() : '', 150, y_texto + 15, { width: 385 });

					doc.font("Helvetica-Bold", 7);
					doc.text("IMPORTE TOTAL", 480, y_texto + 15, { width: 64, align: 'right' });
					doc.rect(480, y_cuadro + 15, 70, 15).stroke();
					var importe_total = $scope.datosMantemiento.importe_facturado + $scope.datosMantemiento.descuento;
					doc.text(number_format_negativo_to_positvo(importe_total, 2), 550, y_texto + 15, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 15, 50, 15).stroke();

					doc.text("DESCUENTO", 480, y_texto + 30, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 30, 70, 15).stroke();
					doc.text(number_format_negativo_to_positvo($scope.datosMantemiento.descuento, 2), 550, y_texto + 30, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 30, 50, 15).stroke();

					doc.text("TOTAL", 480, y_texto + 45, { width: 64, align: 'right' });
					doc.font("Helvetica-Bold", 7)
					doc.rect(480, y_cuadro + 45, 70, 15).stroke();
					doc.text(number_format_negativo_to_positvo($scope.datosMantemiento.importe_facturado, 2), 550, y_texto + 45, { width: 42, align: 'right' });
					doc.rect(550, y_cuadro + 45, 50, 15).stroke();

					doc.text("CLIENTE", -350, y_texto + 80, { align: 'center' });
					doc.text("ENCARGADO TALLER", 0, y_texto + 80, { align: 'center' });
					doc.text("CAJA", 350, y_texto + 80, { align: 'center' });
					doc.rect(75, y_texto + 75, 100, 0).stroke();
					doc.rect(250, y_texto + 75, 100, 0).stroke();
					doc.rect(430, y_texto + 75, 100, 0).stroke();

					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						$scope.liquidacionMantenimiento = {}
						window.open(fileURL, '_blank', 'location=no');
					});

					$scope.cerrarDialogTipoImpresionLiquidacion();
				});
			}

			$scope.factorTrasformasHoras = function (ordenTrabajoManoObra) {
				if (ordenTrabajoManoObra.factor_hora) {
					var horaT = Math.trunc(ordenTrabajoManoObra.factor_hora);
					var minT = Number((ordenTrabajoManoObra.factor_hora - horaT).toFixed(2));
					ordenTrabajoManoObra.horas = Number(horaT);
					ordenTrabajoManoObra.minutos = Math.round(minT * 60);
				}else{
					ordenTrabajoManoObra.horas = 0;
					ordenTrabajoManoObra.minutos = 0;
				}

			}

			$scope.imprimirLiquidacionOT = function (orden) {
				$scope.liquidacionMantenimiento = {}

				var prom = ObtenerDatosVehiculo($scope.usuario.id, orden.id)
				prom.then(res => {
					$scope.liquidacionMantenimiento = res.mantenimiento;

					if (!res.mantenimiento.descuento) {
						$scope.liquidacionMantenimiento.descuento = 0;
					}
					// Extrae id de la clase y el nombre para devolver un objeto {id:[sistema.idClaseSistema], nombre:[sistema.claseSistema.Nombre]
					$scope.liquidacionMantenimiento.sistemas = $scope.liquidacionMantenimiento.sistemas.map((prev, ind, ary) => {
						return { id: prev.id_orden_trabajo_sistema, nombre: prev.ordenTrabajoSistema.nombre, importe_interno: prev.importe_interno, total_cliente: prev.total_cliente }
					})
					$scope.liquidacionMantenimiento.precio_predeterminados = false;
					$scope.liquidacionMantenimiento.manosDeObra = $scope.liquidacionMantenimiento.manosDeObra.map((prev, ind, ary) => {
						prev.precio_unitario = $scope.obtenerPrecioUnitarioBaseSalarioPersona(prev.encargado.id)
						if (prev.especialidad.PreciosEspecialidad.length > 0) {
							prev.especialidad.precio = prev.especialidad.PreciosEspecialidad[0].precio;
						} else {
							prev.especialidad.precio = 0;
						}
						return prev
					})
					// imprimir ot =============
					$scope.cerarModalLiquidacionMantenimiento();
					$scope.imprimirLiquidacionTrabajo($scope.liquidacionMantenimiento);

					// $scope.abrirPopup($scope.idModalLiquidacionMantenimiento);
				}).catch((error) => {
					return $scope.mostrarMensaje(error.stack)
				})
			};
			$scope.dynamicPopoverExcelReport = {
				templateUrl: 'myPopoverTemplateExcelReport.html',
			};
			$scope.generarReporteExcelOT = (filtro) => {
				if (filtro.inicio2.length == 10 && filtro.fin2.length == 10) {
					var promesa = ObtenerOrdenesDeTrabajo($scope.usuario.empresa.id, filtro.inicio2, filtro.fin2, filtro.internoExterno)
					promesa.then(datos => {
						if (!datos.hasErr) {
							if (datos.ordenes.length > 0) {
								var data = [["Tipo Mantenimiento", "Nro OT", "Nro OT Manual", "Fecha", "Placa Vehículo", "Marca Vehículo",
									"Modelo Vehículo", "Cliente", "Km", "Parabrisas Delantero", "Parabrisas Trasero", "Limpia Parabrisas Delantero", "Limpia Parabrisas Trasero", "Ventanas Delanteras", "Ventanas Traseras", "Vidrio Techo Solar", "Encendedor", "Radio", "Antena", "Retrovisor", "Emblema", "Llanta de Auxilio", "Tapa Cubos", "Tapa Válvulas", "Herramientas", "Gata", "Tapa Tanque Combustible", "Faros Delanteros", "Stops", "Guiñadores", "Sobrepisos", "Tanque Gasolina", "Otros", "Observación", "Diagnóstico", "Prioridad", "Tiempo Estimado",
									"Fecha Inicio", "Fecha Fin", "Sistema", "Especialidad", "Encargado", "Hora Inicio", "Hora Fin", "FACT. HHMM", "Horas", "Minutos", "Importe Facturado", "Observación Descuento", "Descuento", "Tipo Pago", "Dias Crédito", "A Cuenta", "Saldo", "Nombre Usuario", "Sucursal", "Estado"]]
								for (var i = 0; i < datos.ordenes.length; i++) {
									let orden = datos.ordenes[i];
									var columns = [];
									columns.push(orden.tipo_mantenimiento ? orden.tipo_mantenimiento : '');
									columns.push(orden.nro_ot ? orden.nro_ot : '');
									columns.push(orden.nro_ot_manual ? orden.nro_ot_manual : '');
									columns.push(orden.fecha ? $scope.fechaATexto(orden.fecha) : '');
									columns.push(orden.placa_vehiculo ? orden.placa_vehiculo.toUpperCase() : '');
									columns.push(orden.marca_vehiculo ? orden.marca_vehiculo.toUpperCase() : '');
									columns.push(orden.modelo_vehiculo ? orden.modelo_vehiculo.toUpperCase() : '');
									columns.push(orden.cliente ? orden.cliente.toUpperCase() : '');
									columns.push(orden.km ? orden.km.toUpperCase() : '');
									columns.push(orden.parabrisas_delantero ? 'SI' : 'NO');
									columns.push(orden.parabrisas_trasero ? 'SI' : 'NO');
									columns.push(orden.limpia_parabrisas_delantero ? 'SI' : 'NO');
									columns.push(orden.limpia_parabrisas_trasero ? 'SI' : 'NO');
									columns.push(orden.ventanas_delanteras ? 'SI' : 'NO');
									columns.push(orden.ventanas_traseras ? 'SI' : 'NO');
									columns.push(orden.vidrio_techo_solar ? 'SI' : 'NO');
									columns.push(orden.encendedor ? 'SI' : 'NO');
									columns.push(orden.radio ? 'SI' : 'NO');
									columns.push(orden.antena ? 'SI' : 'NO');
									columns.push(orden.retrovisor ? 'SI' : 'NO');
									columns.push(orden.emblema ? 'SI' : 'NO');
									columns.push(orden.llanta_auxilio ? 'SI' : 'NO');
									columns.push(orden.tapa_cubos ? 'SI' : 'NO');
									columns.push(orden.tapa_valvulas ? 'SI' : 'NO');
									columns.push(orden.herramientas ? 'SI' : 'NO');
									columns.push(orden.gata ? 'SI' : 'NO');
									columns.push(orden.tapa_tanque_combustible ? 'SI' : 'NO');
									columns.push(orden.faroles_delanteros ? 'SI' : 'NO');
									columns.push(orden.stops ? 'SI' : 'NO');
									columns.push(orden.guiniadores ? 'SI' : 'NO');
									columns.push(orden.sobrepisos ? 'SI' : 'NO');
									columns.push(orden.tamanio_tanque ? orden.tamanio_tanque : '');
									columns.push(orden.otros ? orden.otros.toUpperCase() : '');
									columns.push(orden.observacion ? orden.observacion : '');
									columns.push(orden.diagnostico ? orden.diagnostico : '');
									columns.push(orden.prioridad ? orden.prioridad : '');
									columns.push(orden.tiempo_estimado ? orden.tiempo_estimado : '');
									columns.push(orden.fecha_inicio_ot ? $scope.fechaATexto(orden.fecha_inicio_ot) : '');
									columns.push(orden.fecha_fin_ot ? $scope.fechaATexto(orden.fecha_fin_ot) : '');
									columns.push(orden.sistema);
									columns.push(orden.especialidad);
									columns.push(orden.encargado ? orden.encargado.toUpperCase() : '');
									columns.push(orden.fecha_inicio_mano_obra ? $scope.fechaATexto(orden.fecha_inicio_mano_obra) : '');
									columns.push(orden.fecha_fin_mano_obra ? $scope.fechaATexto(orden.fecha_fin_mano_obra) : '');
									var hhmm = 0
									if (orden.horas) {
										if (orden.minutos) {
											hhmm = ((orden.horas * 60) + orden.minutos) / 60;
										} else {
											hhmm = orden.horas;
										}
									} else if (orden.minutos) {
										hhmm = orden.minutos / 60;
									}
									columns.push(hhmm);
									columns.push(orden.horas);
									columns.push(orden.minutos);
									columns.push(orden.importe_facturado);
									columns.push(orden.observacion_descuento);
									columns.push(orden.descuento);
									columns.push(orden.tipo_pago);
									columns.push(orden.dias_credito);
									columns.push(orden.a_cuenta);
									columns.push(orden.saldo);
									columns.push(orden.nombre_usuario ? orden.nombre_usuario.toUpperCase() : '');
									columns.push(orden.sucursal ? orden.sucursal.toUpperCase() : '');
									columns.push(orden.estado);
									data.push(columns);
								}

								var ws_name = "SheetJS";
								var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
								/* add worksheet to workbook */
								wb.SheetNames.push(ws_name);
								wb.Sheets[ws_name] = ws;
								var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
								saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Ordenes de Trabajo.xlsx");
							} else {
								SweetAlert.swal("", "No se registraron movimientos en las fechas ingresadas", "warning");

							}
						} else {
							SweetAlert.swal("", "Ocurrió un error al recuperar las ordenes", "danger");
						}
					})
				} else {
					SweetAlert.swal("", "Fechas inválidas", "warning");

				}
			}
			$scope.generarReporteExcelOTProductos = (filtro) => {
				if (filtro.inicio2.length == 10 && filtro.fin2.length == 10) {
					SweetAlert.swal({
						title: '',
						icon: 'info',
						iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
						text: "Recuperando órdenes de trabajo...",
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					blockUI.noOpen = true;
					SweetAlert.showLoading()
					ObtenerOtMateriales($scope.usuario.id_empresa, filtro.inicio2, filtro.fin2, filtro.internoExterno)
						.then(data => {
							if (!data.hasError) {
								if (data.ots.length > 0) {
									SweetAlert.update({ text: "Construyendo archivo excel...." })
									matriz = [["NRO", "TIPO", "NÚMERO", "NÚMERO MANUAL", "FECHA", "PLACA", "MARCA", "MODELO", "CLIENTE", "CÓDIGO", "ITEM", "CANTIDAD", "COSTO UNITARIO", "TOTAL", "USUARIO", "SUCURSAL","ALMACÉN", "ESTADO", "SERVICIO"]]
									data.ots.forEach((ot, i, arr) => {
										matriz.push([
											i + 1,
											ot.tipo_mantenimiento ? ot.tipo_mantenimiento : '',
											ot.numero_ot ? ot.numero_ot : '',
											ot.numero_manual ? ot.numero_manual : '',
											ot.fecha ? fechaATexto(ot.fecha) : '',
											ot.placa ? ot.placa : '',
											ot.marca ? ot.marca : '',
											ot.modelo ? ot.modelo : '',
											ot.cliente ? ot.cliente : '',
											ot.codigo ? ot.codigo : '',
											ot.item ? ot.item.toUpperCase() : '',
											ot.cantidad ? ot.cantidad : '',
											ot.costo_inventario ? ot.costo_inventario : '',
											ot.cantidad ? ot.costo_inventario ? ot.cantidad * ot.costo_inventario : '' : '',
											ot.usuario ? ot.usuario.toUpperCase() : '',
											ot.sucursal ? ot.sucursal.toUpperCase() : '',
											ot.nombre_almacen ? ot.nombre_almacen.toUpperCase() : '',
											ot.estado ? ot.estado.toUpperCase() : '',
											ot.externo ? "EXTERNO" : "INTERNO"
										])
									})
									var ws_name = "OT-Materiales";
									var wb = new Workbook();
									//var ws = await sheet_from_array_of_arrays(data.cuentas);
									var ws = XLSX.utils.aoa_to_sheet(matriz);
									/* add worksheet to workbook */
									wb.SheetNames.push(ws_name);
									wb.Sheets[ws_name] = ws;
									var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
									var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "MAYORES-GLOBAL.xlsx");
									filesaver.onwriteend = function () {
										swal.close();
									}
								} else {
									SweetAlert.swal("", "No se existen registros en el periodo seleccionado.", "warning");
								}
							} else {
								SweetAlert.swal("", data.message + '\n' + data.error, "danger");
							}
						})
				} else {
					SweetAlert.swal("", "Fechas no válidas", "warning");
				}
			}
			$scope.selecionarConsumos = (value) => {
				for (const mantenimiento of $scope.mantenimientos) {
					mantenimiento.seleccinado = !mantenimiento.id_comprobante && mantenimiento.estado.nombre == 'FINALIZADO' ? value : false
				}
			}
			$scope.generarComprobante = async function (registroMantenimiento) {
				try {
					let registrosPorAlmacen = []
					let idsMantenimiento = []
					for (const mantenimiento of $scope.mantenimientos) {
						mantenimiento.ids = []
						mantenimiento.seleccinado = registroMantenimiento ? mantenimiento.id == registroMantenimiento.id ? true : mantenimiento.seleccinado : mantenimiento.seleccinado
						if (mantenimiento.seleccinado) {
							idsMantenimiento.push(mantenimiento.id)
							/* let bandera = false
							if (registrosPorAlmacen.length > 0) {
								for (const MantenimientoPorAlmacen of registrosPorAlmacen) {
									if (mantenimiento.almacen.id == MantenimientoPorAlmacen.almacen.id) {
										if (new Date(mantenimiento.fecha_hora_aviso).getTime() < MantenimientoPorAlmacen.fechaMenor.getTime()) {
											MantenimientoPorAlmacen.fechaMenor = new Date(mantenimiento.fecha_hora_aviso)
										}
										if (new Date(mantenimiento.fecha_hora_aviso).getTime() > MantenimientoPorAlmacen.fechaMayor.getTime()) {
											MantenimientoPorAlmacen.fechaMayor = new Date(mantenimiento.fecha_hora_aviso)
										}
										bandera = true
										MantenimientoPorAlmacen.ids.push(mantenimiento.id)
									}
								}
								if (!bandera) {
									mantenimiento.fechaMenor = new Date(mantenimiento.fecha_hora_aviso)
									mantenimiento.fechaMayor = new Date(mantenimiento.fecha_hora_aviso)
									mantenimiento.ids.push(mantenimiento.id)
									registrosPorAlmacen.push(mantenimiento)

								}
							} else {
								mantenimiento.fechaMenor = new Date(mantenimiento.fecha_hora_aviso)
								mantenimiento.fechaMayor = new Date(mantenimiento.fecha_hora_aviso)
								mantenimiento.ids.push(mantenimiento.id)
								registrosPorAlmacen.push(mantenimiento)
							} */

						}
					}
					let res = await OptenerMaterialesRegistro(idsMantenimiento)

					for (const materialPorGrupo of res) {
						let bandera = false
						if (registrosPorAlmacen.length > 0) {
							for (const MantenimientoPorAlmacen of registrosPorAlmacen) {
								if (materialPorGrupo.movimiento.almacen.id == MantenimientoPorAlmacen.almacen.id) {
									MantenimientoPorAlmacen.detallesPorGrupo.push(materialPorGrupo)
									bandera = true
								}
							}
							if (!bandera) {
								let registroMantenimiento = materialPorGrupo.movimiento
								registroMantenimiento.detallesPorGrupo = []
								registroMantenimiento.detallesPorGrupo.push(materialPorGrupo)
								registrosPorAlmacen.push(registroMantenimiento)

							}
						} else {
							let registroMantenimiento = materialPorGrupo.movimiento
							registroMantenimiento.detallesPorGrupo = []
							registroMantenimiento.detallesPorGrupo.push(materialPorGrupo)
							registrosPorAlmacen.push(registroMantenimiento)
						}
					}
					let datos = { detalles: registrosPorAlmacen, idsMantenimiento: idsMantenimiento }
					$scope.crearNuevoComprobante('materialMantenimiento', datos)

				} catch (error) {
					console.log(error)
				}
			}

			// INICIO CONFIGURACIONES MANTENIMIENTO
			$scope.abrirDialogSettings = () =>{
				abrirPopup($scope.idModalSettings)
			}
			$scope.cerrarSettings = function () {
				$scope.cerrarPopup($scope.idModalSettings)
			}
			$scope.guardarConfiguraciones = () => {
				SaveConfig($scope.usuario.id_empresa, $scope.configs)
				.then(data => {
					if(!data.error){
						$scope.cerrarSettings();
						$scope.filtro.internoExterno = $scope.configs.mantenimiento_default;
						$scope.ObteneVehiculos()
					}
					SweetAlert.swal("", data.message, data.messageType);
				})
			}
			
			$scope.cargarConfiguraciones = () => {
				return GetConfig($scope.usuario.id_empresa)
				.then(data => {
					if(!data.err){
						if(data.config){
							$scope.filtro.internoExterno = Number(data.config.mantenimiento_default) ? true : false;
							return data.config
						}else{
							SweetAlert.swal("", "Defina las configuraciones iniciales de mantenimiento", "warning");
						}
					}else{
						SweetAlert.swal("", "Error al recuperar las configuraciones de mantenimiento", "error");
					}
				})
			}
			$scope.fechaFormatoServidorConHoras = (date) => {
				if(date){
					let fechaArr = date.split(" ");
					let fecha = fechaArr[0].split('/').reverse().join('-');
					let horas = "00:00:00"
					let hora = fechaArr[1].split(":")
					if(fechaArr[2] == "PM"){
						if(Number(hora[0]) == 12){
							horas = fechaArr[1]+":00";
						}else{
							horas = (Number(hora[0])+12) +":"+hora[1]+":00"
						}
					}else{
						if(Number(hora[0]) == 12){
							horas = (Number(hora[0])-12) +":"+hora[1]+":00"
						}else{
							horas = fechaArr[1]+":00";
						}
					}
					return fecha+" "+ horas;
				}else{
					return 0;
				}
			}
			$scope.seleccionarTodasEspecialidades = () => {
				if($scope.nuevoOt.manosDeObra && $scope.nuevoOt.manosDeObra.length>0 ){
					SweetAlert.swal({
						title: "Confirme",
						html: "<small>Esta función reemplazará la mano de obra existente<br><strong>¿Desea continuar?</strong></small>",
						confirmButtonText: 'Si',
						showCancelButton: true,
						cancelButtonText: 'No',
						showLoaderOnConfirm: true,
						cancelButtonColor: '#d33',
						confirmButtonColor: '#28a746',
					}).then(async (result) => {
						if (result.isConfirmed) {
							$scope.adicionGrupal = true;
							$scope.nuevoOt.manosDeObra = []
							if($scope.nuevoOt && $scope.nuevoOt.sistemas.length > 0){
								if($scope.tiposEspecialidad && $scope.tiposEspecialidad.clases && $scope.tiposEspecialidad.clases.length>0){
									$scope.grupalEspecialidades = $scope.tiposEspecialidad.clases
								}else{
									$scope.adicionGrupal = false
									SweetAlert.swal("", "El sistema seleccionado no tiene especialidades habilitadas.", "warning");
								}
							}else{
								$scope.adicionGrupal = false
								SweetAlert.swal("", "Por favor asigne al menos un sistema a la orden de trabajo.", "warning");
							}
						}
					})
				}else{
					$scope.adicionGrupal = true;
					if($scope.nuevoOt && $scope.nuevoOt.sistemas.length > 0){
						if($scope.tiposEspecialidad && $scope.tiposEspecialidad.clases && $scope.tiposEspecialidad.clases.length>0){
							$scope.grupalEspecialidades = $scope.tiposEspecialidad.clases
						}else{
							$scope.adicionGrupal = false
							SweetAlert.swal("", "El sistema seleccionado no tiene especialidades habilitadas.", "warning");
						}
					}else{
						$scope.adicionGrupal = false
						SweetAlert.swal("", "Por favor asigne al menos un sistema a la orden de trabajo.", "warning");
					}
				}
			}
			$scope.agregarTodasEspecialidades = () => {
				if(($scope.ordenTrabajoManoObra.horas>0 || $scope.ordenTrabajoManoObra.minutos>0) && $scope.tiposEspecialidad.clases.length>0){
					let hhmm = $scope.prorratearHHMM($scope.ordenTrabajoManoObra.horas, $scope.ordenTrabajoManoObra.minutos, $scope.tiposEspecialidad.clases.length );
					if(!hhmm.error){
						var ordenManoObra = $scope.ordenTrabajoManoObra;
						let especialidades = $scope.tiposEspecialidad.clases;
						for (let i = 0; i < especialidades.length; i++) {
							const especialidad = especialidades[i];
							let manoObra = Object.assign({}, ordenManoObra);
							manoObra.especialidad=especialidad
							manoObra.horas = hhmm.horas
							manoObra.minutos = hhmm.minutos
							manoObra.eliminado = false
							manoObra.edit = true
							$scope.nuevoOt.manosDeObra.push(manoObra)
							$scope.ordenTrabajoManoObra = { edit: false }
						}
						$scope.adicionGrupal = false
					}else{
						$scope.adicionGrupal = false
						SweetAlert.swal("", "El sistema seleccionado no tiene especialidades habilitadas.", "warning");
					}
				}else{
					SweetAlert.swal("Error de prorrateo", "Revise los datos y vuelva a intentar", "warning");
				}
			}
			$scope.prorratearHHMM = (horas, mins, cantidad) => {
				if(((horas && horas > 0) || (mins && mins > 0)) && cantidad){
					let enMins=((horas*60) + mins)/cantidad;
					return { horas: Math.trunc(enMins/60), minutos: enMins % 60}
				}else{
					return {error: true}
				}
			}
			$scope.obtenerTiposActivosMto = () => {
				GetTiposActivosFijos($scope.usuario.id_empresa)
				.then(data => {
					$scope.tiposActivosFijos = !data.error ?  data.activos_fijos.length> 0 ? data.activos_fijos : undefined : undefined
				})
			}

			$scope.abrirPopupPagoCreditosMantenimiento = function (venta) {
				$scope.venta = venta;
				$scope.pago = null;
				$scope.abrirPopup($scope.idModalPagoCreditoMantenmimiento);
			}
			$scope.cerrarPagoCreditosMantenimiento = function (venta) {
				$scope.cerrarPopup($scope.idModalPagoCreditoMantenmimiento);
			}

			$scope.efectuarPagoCreditoMantenimiento = function (pago) {
				$scope.pago = pago;
				if ($scope.venta.saldo==0 && $scope.venta.estado.nombre=='PENDIENTE') {
					$scope.realizarPagoMantenimiento($scope.venta.id, pago, $scope.usuario.id);
				}else{
					if (pago <= $scope.venta.saldo) {
						$scope.realizarPagoMantenimiento($scope.venta.id, pago, $scope.usuario.id);
					} else {
						SweetAlert.swal("", "El cobro excede el monto a cobrar", "warning");
					}
				}
				
			}
			
			$scope.realizarPagoMantenimiento = function (idOT, pago, UsuarioIdEmpresa) {
				var restante = 0;
				var saldo = $scope.venta.saldo;
				var anticipo = false;
				if ($scope.venta.saldo==0 && $scope.venta.estado.nombre=='PENDIENTE') {
					restante = 0;
					anticipo = true;
				}else{
					restante = saldo - $scope.pago;
					if (restante < 0) {
						restante = restante;
					} else if (restante >= 0) {
						restante = 0;
					}
				}
			
				blockUI.start();
				var promesa = PagosOTCreditos(idOT, UsuarioIdEmpresa, { pago: pago, id_usuario_cajero: $scope.usuario.id, saldoRestante: restante, anticipo: anticipo });
				promesa.then(function (data) {
					SweetAlert.swal("Guardado!", data.mensaje, "success");
					$scope.cerrarPagoCreditosMantenimiento();
			
					$scope.imprimirReciboMantenimientoCredito(data, data.venta, pago);
					$scope.ObteneVehiculos($scope.filtro);
				
					// $scope.obtenerClientesMantenimiento();
					// $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosCreditos.length;
					// $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
					blockUI.stop();
				})
			}

			$scope.imprimirReciboMantenimientoCredito = function (data, venta, pago, usar_venta_enviada) {
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
				doc.text(venta.sucursal.nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.sucursal.direccion.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
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

				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				doc.moveDown(0.6);
				var date = new Date();
				doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
				doc.moveDown(0.4);
				doc.text("He recibido de : " + $scope.venta.cliente_ot.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("       CONCEPTO                                   ", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha_hora_aviso);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = "OT nro. " + $scope.venta.correlativo_ot;
				doc.text(textoFact, 105, 210, { width: 100 });
				doc.text("Saldo Bs " + (venta.saldo - pago) + ".-", 105, 220, { width: 100 });
				doc.text("Bs " + pago + ".-", 170, 210, { width: 100 });

				doc.text("--------------", 10, 230, { align: 'right' });
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
			// FIN CONFIGURACIONES MANTENIMIENTO
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.modalNuevoMantenimiento);
				$scope.eliminarPopup($scope.modalReportarIncidente);
				$scope.eliminarPopup($scope.modalCheckListDiario);
				$scope.eliminarPopup($scope.modalCheckListMensual);
				$scope.eliminarPopup($scope.modalEditarHistorico);
				$scope.eliminarPopup($scope.modalMantenimientoCorrectivo);
				$scope.eliminarPopup($scope.modalBusquedaProducto);
				$scope.eliminarPopup($scope.modalBusquedaEncargado);
				$scope.eliminarPopup($scope.modalLogin);
				$scope.eliminarPopup($scope.modalNuevoMantenimientoMaquinaria);
				$scope.eliminarPopup($scope.modalCheckListMensualMaquinaria);
				$scope.eliminarPopup($scope.modalEditarItemList);
				$scope.eliminarPopup($scope.modalProxMantenimientoMaquinaria);
				$scope.eliminarPopup($scope.modalProxMantenimientoVehiculo);
				$scope.eliminarPopup($scope.modalCalendar);
				$scope.eliminarPopup($scope.modalFichaVehiculo);
				$scope.eliminarPopup($scope.modalEditarCheckList);
				$scope.eliminarPopup($scope.modalBuscarMaquinaria);
				$scope.eliminarPopup($scope.modalReportarIncidenteMaquinaria);
				$scope.eliminarPopup($scope.idModalOTNuevo);
				$scope.eliminarPopup($scope.idModalEventoCalendario);
				$scope.eliminarPopup($scope.idModalEditarEventoCalendario);
				$scope.eliminarPopup($scope.idModaRepuestosOT);
				$scope.eliminarPopup($scope.idModalAgregarDatosVehiculo);
				$scope.eliminarPopup($scope.idModalConceptoEdicion);
				$scope.eliminarPopup($scope.idModalListaVehiculos)
				$scope.eliminarPopup($scope.idmodalKardexVehiculo)
				$scope.eliminarPopup($scope.idModalInventario);
				$scope.eliminarPopup($scope.idModalLiquidacionMantenimiento);
				$scope.eliminarPopup($scope.idModalConceptoEdicionEspecialidad);
				$scope.eliminarPopup($scope.idModalConfiguracionMecanica);
				$scope.eliminarPopup($scope.idModalFacturaServicioExterno);
				$scope.eliminarPopup($scope.idFinalizarLiquidacion);
				$scope.eliminarPopup($scope.idTipoImpresionLiquidacion);
				$scope.eliminarPopup($scope.idModalSettings);
				$scope.eliminarPopup($scope.idModalPagoCreditoMantenmimiento);
				// $scope.eliminarPopup($scope.idModalInicioMantenimiento, $scope.idModalOTNuevo, $scope.idModalFacturaServicioExterno, $scope.idModaRepuestosOT);
			});
			$scope.inicio();
		}])