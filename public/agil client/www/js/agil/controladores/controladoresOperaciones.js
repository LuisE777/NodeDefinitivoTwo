angular.module('agil.controladores')
	.controller('ControladorOperaciones', ['$scope', '$filter', '$rootScope', '$route', '$templateCache', '$location', '$window', '$localStorage',
		'blockUI', 'ConfiguracionVentaVistaDatos', 'ClasesTipo', 'ListaGruposProductoEmpresa', 'ProductosOperaciones', 'ListaGruposProductoEmpresa', 'SolicitudesReposicion', 'SolicitudesFormulacionProducto', 'SolicitudReposicion', 'EliminarSolicitudReposicion', 'Paginator', 'ImpresionSolicitudDatos', 'ListaInventariosProducto', 'ListaSucursalesUsuario', 'ListaGruposProductoUsuario', 'CerrarSolicitud', 'Solicitud', 'ProveedoresNit', 'ListaProductosEmpresaUsuario', '$timeout', 'GuardarPedido', 'ListaProveedores', 'ProductosPaginadorSubgrupos', 'ListaProductosProveedores', 'ProductosPaginadorAsignados', 'ActualizarProductosProveedor', 'ListaSubGruposProductoEmpresa', 'ObtenerImagen', 'obtenerListaRelacionesProveedor', 'ListaCompletaSolicitudesReposicion', 'CrearActualizarOrdentrabajo', 'ObtenerOrdenesReposicion', 'UltimaFechaConsumoOrdenReposicion', 'ListaCompletaOrdenReposicion', 'DatosOrdenRepo', 'ListaOrdenesRepoPorProducto', 'GuardarSolicitudesReposicionesAlmacen', 'OptenerDatosSolicitudAlm', 'GuardarSolicitudesImp', 'ObtenerDatosInventarioPedido', 'ClasesTipoEmpresa', 'ObtenerConfiguracionIso', 'SweetAlert', 'ObtenerSolicitudAlmValuado', 'OptenerInventarioDisponibleProducto', 'ObtenerSolicitudesImportacionCamp', 'CerrarSolicitudesImpCamp', 'ObtenerDatosCampamentoSolicitud', 'ObtenerDatosCampamentoOrden', 'ObtenerSolicitudesReposicion', 'OptenerDatosSolicitudAlm', 'OptenerDetalleValuadoSolicitud', 'ValidarImportacionConsumos', 'FieldViewer', 'ObtenerDatosIsoOrdenSolicitud', function ($scope, $filter, $rootScope, $route, $templateCache, $location, $window, $localStorage, blockUI, ConfiguracionVentaVistaDatos, ClasesTipo, ListaGruposProductoEmpresa, ProductosOperaciones, ListaGruposProductoEmpresa, SolicitudesReposicion, SolicitudesFormulacionProducto, SolicitudReposicion, EliminarSolicitudReposicion, Paginator, ImpresionSolicitudDatos, ListaInventariosProducto, ListaSucursalesUsuario, ListaGruposProductoUsuario, CerrarSolicitud, Solicitud, ProveedoresNit, ListaProductosEmpresaUsuario, $timeout, GuardarPedido, ListaProveedores, ProductosPaginadorSubgrupos, ListaProductosProveedores, ProductosPaginadorAsignados, ActualizarProductosProveedor, ListaSubGruposProductoEmpresa, ObtenerImagen, obtenerListaRelacionesProveedor, ListaCompletaSolicitudesReposicion, CrearActualizarOrdentrabajo, ObtenerOrdenesReposicion, UltimaFechaConsumoOrdenReposicion, ListaCompletaOrdenReposicion, DatosOrdenRepo, ListaOrdenesRepoPorProducto, GuardarSolicitudesReposicionesAlmacen, OptenerDatosSolicitudAlm, GuardarSolicitudesImp, ObtenerDatosInventarioPedido, ClasesTipoEmpresa, ObtenerConfiguracionIso, SweetAlert, ObtenerSolicitudAlmValuado, OptenerInventarioDisponibleProducto, ObtenerSolicitudesImportacionCamp, CerrarSolicitudesImpCamp, ObtenerDatosCampamentoSolicitud, ObtenerDatosCampamentoOrden, ObtenerSolicitudesReposicion, OptenerDatosSolicitudAlm, OptenerDetalleValuadoSolicitud, ValidarImportacionConsumos, FieldViewer, ObtenerDatosIsoOrdenSolicitud) {

			$scope.usuario = JSON.parse($localStorage.usuario);

			// var pormimg = ObtenerImagen($scope.usuario.empresa.imagen)
			// 	pormimg.then(function (img) {
			// 		$scope.usuario.empresa.imagen = img
			// 	})

			$scope.idDialogDialogPanelOperaciones = "dialog-panel-operaciones"
			$scope.idDialogDatos = "modal-wizard-venta-edicion"
			$scope.idDialogEntregaViveres = "dialogEntregaViveres"
			$scope.idConfirmacionCierre = "dialog-confirmacion-entrega"
			$scope.idDialogTotalIngredientes = "dialog-total-ingredientes"
			$scope.idDialogoListadoPedido = "modal-listado-nuevo-pedido"
			$scope.idDialogoNuevoPedido = "modal-nuevo-pedido-operaciones"
			$scope.idDialogProductosProveedor = 'dialog-productos-proveedor-configuracion';
			$scope.idDialogBusquedaProveedor = 'dialog-Busqueda-proveedor';
			$scope.idDialogProductosAsigandosProveedor = 'dialog-productos-proveedor-asignados'
			$scope.idDialogOrdenReposicion = 'dialog-orden-reposicion'
			$scope.idDialogNuevaOrdenReposicion = 'dialog-nueva-orden-reposicion'
			$scope.idDialogEliminarOrdenReposicion = 'dialog-eliminar-orden-reposicion'
			$scope.idDialogCerrarOrdenReposicion = 'dialog-cerrar-orden-reposicion'
			$scope.idDialogSincronizacionDatos = 'dialog-sincronizacion-datos'
			$scope.idModalHSyncCampamento = 'dialog-historial-sincronizacion-datos'
			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				$timeout(function () {
					ejecutarScriptsOperaciones($scope.idDialogDialogPanelOperaciones, $scope.idDialogEntregaViveres, $scope.idConfirmacionCierre, $scope.idDialogTotalIngredientes,
						$scope.idDialogoListadoPedido, $scope.idDialogoNuevoPedido, $scope.idDialogProductosProveedor, $scope.idDialogBusquedaProveedor, $scope.idDialogProductosAsigandosProveedor, $scope.idDialogDatos, $scope.idDialogOrdenReposicion,
						$scope.idDialogNuevaOrdenReposicion, $scope.idDialogEliminarOrdenReposicion, $scope.idDialogCerrarOrdenReposicion, $scope.idDialogSincronizacionDatos, $scope.idModalHSyncCampamento);
					$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				}, 500)
			});

			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idDialogDialogPanelOperaciones);
				$scope.eliminarPopup($scope.idDialogDatos);
				$scope.eliminarPopup($scope.idDialogEntregaViveres);
				$scope.eliminarPopup($scope.idConfirmacionCierre)
				$scope.eliminarPopup($scope.idDialogTotalIngredientes)
				$scope.eliminarPopup($scope.idDialogoListadoPedido)
				$scope.eliminarPopup($scope.idDialogoNuevoPedido)
				$scope.eliminarPopup($scope.idDialogProductosProveedor)
				$scope.eliminarPopup($scope.idDialogBusquedaProveedor)
				$scope.eliminarPopup($scope.idDialogProductosAsigandosProveedor)
				$scope.eliminarPopup($scope.idDialogOrdenReposicion)
				$scope.eliminarPopup($scope.idDialogNuevaOrdenReposicion)
				$scope.eliminarPopup($scope.idDialogEliminarOrdenReposicion)
				$scope.eliminarPopup($scope.idDialogCerrarOrdenReposicion)
				$scope.eliminarPopup($scope.idDialogSincronizacionDatos)
				$scope.eliminarPopup($scope.idModalHSyncCampamento)
			})

			$scope.inicio = function () {
				$scope.listarCampos();
				$scope.resaltado = true;
				$scope.filtro = { detalle: false }
				$scope.estadosOrdenReposicion = []
				$scope.listaProductosProveedor = [];
				$scope.seleccionProductosProveedor = { seleccionar_todos: false };
				$scope.productosAsignadosPorveedor = { itemsPorPagina: 10, textoBusqueda: "", paginaActual: 1, paginas: [1] };
				$scope.configuracionPorveedor = { itemsPorPagina: 10, textoBusqueda: "", paginaActual: 1, paginas: [1] };
				$scope.detallesPedido = []
				$scope.mostarBusquedaProducto = false
				$scope.ordenProductos = true;
				$scope.esContado = true;
				$scope.obtenerConfiguracionVentaVista();
				$scope.alreadyCalculated = false
				$scope.obtenerTiposDePago()
				$scope.obtenerFormasEntregaPedido()
				$scope.obtenerEstadoOrdenReposicion()
				$scope.sucursalesUsuario = "";
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					$scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
					if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
						$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
					}
				}
				// $scope.detalleVenta = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				// $scope.solicitud = { solicitudesProductos: [] }
				$scope.obtenerEstadoSolicitudReposicion()
				$scope.obtenerProveedores();
				//$scope.obtenerProductos();
				//$scope.obtenerProductosAsignados();
				$scope.obtenerPaginador()
				$scope.sucursales = $scope.obtenerSucursales();
				$scope.obtenerSubGruposProductosEmpresaUsuario()
				$scope.obtenerGruposProductosEmpresaUsuario()
				$scope.obtenerEstadoPedidos()
				$scope.obtenerAreas()
				$scope.fieldViewer = FieldViewer({
                    crear: false,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        doc: { value: "Doc", show: true },
                        iso: { value: "Doc ISO", show: true },
                        sucursal: { value: "Sucursal", show: true },
                        almacen: { value: "Almacén", show: true },
						nro_almacen: { value: "Nº Almacén", show: true },
                        fecha: { value: "Fecha", show: false },
                        fechaHora: { value: "Fecha Hora", show: true },
                        monto: { value: "Monto", show: true },
                        descripcion: { value: "Descripción", show: true },
                        usuario: { value: "Usuario", show: true },
                        estado: { value: "Estado", show: true },
                        fechaCierre: { value: "Fecha cierre", show: true },
                        cerradoPor: { value: "Cerrado por", show: true }
                    }
                }, $scope.usuario.id);
				/* $scope.fieldViewer.updateObject(); */
			}

			$scope.obtenerAreas = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RRHH_AREA", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.listaAreas = entidad
					blockUI.stop();
				});
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
			$scope.obtenerProveedores = function () {
				var prom = ListaProveedores($scope.usuario.id_empresa);
				prom.then(function (res) {
					$scope.proveedores = res.proveedores;
					$scope.proveedoresProcesado = res.proveedores;
				}).catch(function (err) {
					$scope.proveedores = [];
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
					$scope.mostrarMensaje(mensaje);
				});
			};
			$scope.filtrarProveedores = function (query) {
				if ($scope.proveedores !== undefined) {
					$scope.proveedoresProcesado = $filter('filter')($scope.proveedores, query);
				} else {
					$scope.proveedoresProcesado = [];
				}
			};

			$scope.agregarProductosSeleccionados = function () {
				if ($scope.productosProveedorSeleccionados.length > 0) {
					$scope.productosProveedorSeleccionados.forEach(async function (producto, i, arr) {
						var inventarioDisponible = await $scope.obtenerInventarioTotalProvedor(producto);
						$scope.detallePedido = {
							producto: producto, precio_unitario: producto.precio_unitario, inventario_disponible: inventarioDisponible,
							cantidad: 1, id_grupo: producto.id_grupo, id_subgrupo: producto.id_subgrupo
						};
						$scope.agregardetallePedido($scope.detallePedido)
						if (i === arr.length) {
							$scope.cerrarModalProductosAsignadosProveedor()
						}
						$scope.$evalAsync()
					})
				} else {
					$scope.mostrarMensaje('No se seleccionó ningún producto para ser agregado.')
				}
				$scope.cerrarModalProductosAsignadosProveedor(true)

			};
			$scope.obtenerInventarioTotalProvedor = async function (producto) {
				let inventarios = await ObtenerDatosInventarioPedido(producto.id, $scope.pedido.almacen.id)
				let cantidadTotal = 0;
				if (producto.activar_inventario) {
					for (var i = 0; i < inventarios.length; i++) {
						cantidadTotal += (inventarios[i].cantidad);
					}
					for (var j = 0; j < $scope.detallesPedido.length; j++) {
						if ($scope.detallesPedido[j].producto.id == producto.id) {
							cantidadTotal = cantidadTotal - $scope.detallesPedido[j].cantidad;
						}
					}
				} else {
					cantidadTotal = 500000;
				}
				return cantidadTotal;
			}
			$scope.seleccionarProductoAsignado = function (producto) {
				if (producto.seleccionado) {
					if (!$scope.productosProveedorSeleccionados.some(function (id) {
						return id === producto.id
					})) {
						$scope.productosProveedorSeleccionados.push(producto)
					}
				} else {
					var indxDorp = $scope.productosProveedorSeleccionados.indexOf(producto);
					if (indxDorp >= 0 && !producto.seleccionado) {
						$scope.productosProveedorSeleccionados.splice(indxDorp, 1);
					} else if (indxDorp == -1 && producto.seleccionado) {
						$scope.productosProveedorSeleccionados.push(producto.id);
					}
				}
			}
			$scope.establecerProveedor = function (proveedor, modal) {
				if ($scope.pedido.por_proveedor == undefined || $scope.pedido.por_proveedor == false) {
					$scope.productosAsignadosProveedor = []
					$scope.pedido.proveedor = proveedor;
					if (modal !== undefined) {
						$scope.cerrarModalBusquedaProveedor();
					}
				} else {
					blockUI.start();
					$scope.detallesPedido = []
					var promesa = obtenerListaRelacionesProveedor(proveedor.id_empresa, proveedor.razon_social, $scope.pedido)
					promesa.then(function (datos) {
						$scope.detallesPedido = datos
						$scope.detallesPedido.forEach(function (element) {
							element.id_detalle_orden_reposicion = element.id
							element.eliminarReposicion = false
							delete element.id
						})
						$scope.pedido.proveedor = proveedor;
						if (modal !== undefined) {
							$scope.cerrarModalBusquedaProveedor();
						}
						/* datos.forEach(function(producto){
							var detalle = {producto:producto,cantidad:producto.detalleOrdenReposicion}
							$scope.detallesPedido.push(detalle)
						})
						if (modal !== undefined) {
							$scope.cerrarModalBusquedaProveedor();
						} */
						/* $scope.productosAsignadosProveedor = []
						if ($scope.pedido === undefined) {
							$scope.pedido = {};
						}
						
						
						if ($scope.pedido.por_proveedor) {
							$scope.generarPorProveedor()
						} */
						$scope.obtenerProductos();
						$scope.obtenerProductosAsignados();
						blockUI.stop();
					})
				}
				$scope.obtenerProductos();
				$scope.obtenerProductosAsignados();


			};

			$scope.abrirModalProductosProveedor = function (pedido) {
				if ($scope.checkProveedor(pedido)) {
					$scope.buscarProductos(null, $scope.pedido);
					// $scope.obtenerProductosProveedor($scope.pedido.proveedor);
					// $scope.verificarAsignacionProductosProveedor()
					$scope.abrirPopup($scope.idDialogProductosProveedor);
				} else {
					$scope.mostrarMensaje('Seleccione un proveedor para ver su asignación de productos..');
				}
			};

			/* $scope.generarPorProveedor = function () {
				if ($scope.pedido.proveedor) {
					if ($scope.pedido.por_proveedor) {
						if ($scope.pedido.proveedor.productos.length > 0) {
							$scope.paginatorProductosAsignados.filter = $scope.productosAsignadosPorveedor.grupo ? $scope.productosAsignadosPorveedor.grupo : { id: 0 };
							var ids_productos_proveedor = "";

							// var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginatorProductosAsignados, $scope.usuario.id); //por grupos
							var prom = ListaProductosProveedores($scope.usuario.id_empresa, $scope.pedido.proveedor);
							prom.then(function (res) {
								if (res.hasErr) {
									$scope.mostrarMensaje(res.mensaje);
									$scope.listaProductosProveedor = [];
								} else {
									if (res.productos) {
										var arr = res.productos.split(',');
										$scope.listaProductosProveedor = arr.map(function (id) {
											return parseInt(id);
										});
										var promesa = ProductosPaginadorAsignados($scope.usuario.id_empresa, $scope.paginatorProductosAsignados, $scope.usuario.id, $scope.listaProductosProveedor, true); ///por subgrupos
										promesa.then(function (dato) {
											if (dato.hasErr) {
												$scope.mostrarMensaje(dato.mensaje);
											} else {
												$scope.paginatorProductosAsignados.setPages(dato.paginas);
												$scope.productosAsignadosProveedor = dato.productos;
												$scope.productosAsignadosProveedor.forEach(function (producto) {
													if ($scope.listaProductosProveedor.some(function (id) {
														return id === producto.id
													})) {
														$scope.detallePedido = {
															producto: producto, precio_unitario: producto.precio_unitario,
															cantidad: 1, id_grupo: producto.id_grupo, id_subgrupo: producto.id_subgrupo
														};
														$scope.agregardetallePedido($scope.detallePedido)
													}
												})
											}
											blockUI.stop();
										}).catch(function (err) {
											blockUI.stop();
											var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
											$scope.mostrarMensaje(memo);
										});
									} else {
										$scope.mostrarMensaje('El proveedor no tiene productos asignados.')
										$scope.listaProductosProveedor = [];
									}
								}
								blockUI.stop();
							}).catch(function (err) {
								blockUI.stop();
								var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
								$scope.mostrarMensaje(memo);
							})

						} else {
							$scope.mostrarMensaje('El proveedor no tiene productos asignados.')
						}
					} else {
						$scope.detallePedido = {}
						$scope.detallesPedido = []
					}

				} else {
					$scope.mostrarMensaje('Seleccione un proveedor.')
				}
			}; */

			$scope.verificarAsignacionProductosProveedor = function () {
				if ($scope.listaProductosProveedor.length > 0) {
					$scope.listaProductosProveedor.forEach(function (id) {
						$scope.productosAsignacionProveedor.forEach(function (producto) {
							if (producto.id === id) {
								producto.seleccionado = true
							}
						})
					})
				}
			}

			$scope.checkProveedor = function (pedido) {
				if ($scope.pedido) {
					if ($scope.pedido.proveedor) {
						if ($scope.pedido.proveedor.id) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			};

			$scope.buscarProveedor = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
					return promesa;
				}
			}


			// $scope.buscarProducto = function (query) {
			// 	if (query != "" && query != undefined) {
			// 		var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, 0);
			// 		return promesa;
			// 	}
			// };
			/* $scope.buscarProducto = function (query, proveedor) {
				if ($scope.pedido === undefined) {
					$scope.mostrarMensaje('Seleccione un almacen.')
					return
				}
				if (query != "" && query != undefined && proveedor == undefined && $scope.pedido.almacen) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.pedido.almacen);
					return promesa;
				} else if (query != "" && query != undefined && proveedor && $scope.pedido.almacen) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.pedido.almacen);
					return promesa;
				} else {
					$scope.mostrarMensaje('Seleccione un almacen.')
				}
			}; */
			$scope.buscarProducto = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.pedido.almacen.id);
					return promesa;
				}
			};
			$scope.buscarProductoOrdenReposicion = function (query) {
				blockUI.start()
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.ordenReposicion.almacen.id);
					var p = promesa.then(function (datos) {
						if (datos.length > 0) {
							return promesa
						} else {
							$scope.mostrarMensaje("No existen coincidencias en la búsqueda");
						}
					})
					blockUI.stop()
					return p;
				}
			}
			$scope.establecerProducto = function (producto, modelo) {
				$scope.detallePedido = {}
				producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
				// var centroCostos = $scope.pedido.centroCosto;
				var inv_disponible = 0
				if (producto.inventarios.length > 0) {
					producto.inventarios.forEach(function (inventario) {
						inv_disponible += inventario.cantidad
					})
				}
				$scope.detallePedido = {
					producto: producto, precio_unitario: producto.precio_unitario,
					cantidad: 1, inventario_disponible: inv_disponible
				};
				// $scope.cerrarPopup($scope.idModalInventario);
				// $scope.enfocar('cantidad');
			}

			$scope.nuevoPedido = function () {
				$scope.detallesPedido = []
				$scope.detallePedido = {};
				$scope.pedido = { fecha: $scope.fechaATexto(new Date()) }
				if ($scope.sucursales.length == 1) {
					$scope.pedido.sucursal = $scope.sucursales[0].id
					$scope.obtenerAlmacenes($scope.pedido.sucursal)
				}
				$scope.abrirModalNuevoPedido()
			}

			$scope.generarPedido = async function () {
				$scope.detallesPedido = []
				$scope.pedido = { generado: true }
				$scope.detallePedido = {}

				$scope.abriridDialogoListadoPedido()

			}
			$scope.obtenerDatosPedido = async function () {
				if ($scope.pedido.almacen) {
					if ($scope.pedido.por_proveedor) {
						if ($scope.pedido.proveedor) {
							if ($scope.pedido.proveedor.id) {
								$scope.establecerProveedor()
							}
						}
					} else {
						var datos = await ListaCompletaOrdenReposicion($scope.pedido)
						console.log(datos)
						$scope.detallesPedido = []
						$scope.detallesPedido = datos.ordenesReposicion.reduce(function (val, orden) {
							var activo = true
							for (var i = 0; i < orden.detallesOrdenReposicion.length; i++) {
								var element = orden.detallesOrdenReposicion[i];
								element.id_detalle_orden_reposicion = element.id
								element.eliminarReposicion = false
								delete element.id
								if ($scope.detallesPedido.length > 0) {

									val.push(element)
								} else {
									val.push(element)
								}
							}
							return val
						}, [])
					}
				}
				$scope.$evalAsync()
			}
			$scope.obtenerDatosDetalleOrdenReposicion = async function () {
				try {
					if ($scope.ordenReposicion.fecha_consumo && $scope.ordenReposicion.sucursal && $scope.ordenReposicion.almacen) {
						SweetAlert.swal({
							html: '<b>Recuperando productos</b>',
							icon: 'info',
							iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
							allowEscapeKey: false,
							allowOutsideClick: false
						})
						SweetAlert.showLoading()
						blockUI.noOpen = true;
						let { ordenReposicion } = await UltimaFechaConsumoOrdenReposicion($scope.ordenReposicion.almacen.id)
						$scope.ordenReposicion.fecha_inicio = ordenReposicion ? ordenReposicion.fecha_consumo : null
						$scope.ordenReposicion.detallesOrdenReposicion = await $scope.calcularViveresOrdenReposicionDesdeFiltro()
						if($scope.ordenReposicion && $scope.ordenReposicion.detallesOrdenReposicion){
							let cont = 1
							for (const x of $scope.ordenReposicion.detallesOrdenReposicion) {
								SweetAlert.update({ html: "<b>Recuperando productos<br><small>"+ cont + " de " + $scope.ordenReposicion.detallesOrdenReposicion.length + "<br>"+x.producto.nombre+"</small></b>" })
								cont++
								x.inventario_disponible = 0
								x.cantidad_maxima = 0
								x.cantidad_sugerida = 0
								let res = await OptenerInventarioDisponibleProducto(x.producto.id, $scope.ordenReposicion.almacen.id);
								x.inventario_disponible = res.inventario_disponible

								datos = await $scope.calcularMaximoOrdenReposicion(x, $scope.ordenReposicion.almacen.id, 12)
								x.cantidad_maxima = datos.cantidad_maxima
								x.cantidad_sugerida = datos.cantidad_sugerida
								x.cantidad_fijo = datos.cantidad_fijo
								$scope.calcularCantidadTotalExtra(x)
							}
						}
						$scope.$evalAsync()
						swal.close();
					}
				} catch (error) {
					console.log('error', error);
					blockUI.stop()
					if ($scope.detalleSolicitudErr && !$scope.detalleSolicitudErr.productoSolicitado.tipoProducto) {
						$scope.mostrarMensaje("El producto " + $scope.detalleSolicitudErr.productoSolicitado.nombre + " con codigo " + $scope.detalleSolicitudErr.productoSolicitado.codigo + " no cuenta con tipo producto definido, arreglar en sus configuraciones del producto para poder continuar.")

					}
				}
				$scope.$evalAsync()
			}
			$scope.verficarCantidadSugeridaConPrestacionCOmpraConRepo = function (x) {
				var extra = x.extra ? x.extra : 0
				var valor = x.cantidad + extra
				var total = 0
				x.producto.cantidad_prestacion_compra = x.producto.cantidad_prestacion_compra ? x.producto.cantidad_prestacion_compra : valor
				do {
					total = total + x.producto.cantidad_prestacion_compra
					if (valor >= x.producto.cantidad_prestacion_compra) {
						valor = valor - x.producto.cantidad_prestacion_compra
					} else {
						valor = valor - valor
					}
				} while (valor > 0);
				return total

			}
			$scope.verificarConExtraSugerido = function (x) {
				x.cantidad_sugerida = $scope.verficarCantidadSugeridaConPrestacionCOmpraConRepo(x)
			}
			$scope.verficarCantidadSugeridaConPrestacionCOmpra = function (x) {
				var valor = x.cantidad_maxima - x.inventario_disponible
				x.producto.cantidad_prestacion_compra = x.producto.cantidad_prestacion_compra ? x.producto.cantidad_prestacion_compra : valor
				var total = 0
				do {
					total = total + x.producto.cantidad_prestacion_compra

					valor = valor - x.producto.cantidad_prestacion_compra
				} while (valor > x.producto.cantidad_prestacion_compra);
				return total
			}
			$scope.calcularMaximoOrdenReposicion = async function (x, idAlmacen, limit) {
				var ordenesRepoProducto = await ListaOrdenesRepoPorProducto(x.producto.id, idAlmacen, limit)
				var cantidadRegistros = ordenesRepoProducto.registro.cantidad > 0 ?  ordenesRepoProducto.registro.cantidad : 0
				let contRegistros = (ordenesRepoProducto.registro.contador_registros ? ordenesRepoProducto.registro.contador_registros : 0)
				var promedio = (x.cantidad + cantidadRegistros) / (contRegistros + 1)
				var indice_rotacion = $scope.usuario.empresa.usar_indice_rotacion_producto ? x.producto.indice_rotacion?x.producto.indice_rotacion : $scope.ordenReposicion.indice_rotacion : $scope.ordenReposicion.indice_rotacion
				var cantidad_maxima = promedio * indice_rotacion
				var cantidad_sugerida = x.inventario_disponible > cantidad_maxima ? 0 : cantidad_maxima - x.inventario_disponible
				if (cantidad_sugerida > 0 && $scope.usuario.empresa.usar_prestacion_compra) {
					cantidad_sugerida = $scope.verficarCantidadSugeridaConPrestacion(x, cantidad_maxima, x.inventario_disponible)
				}
				return { cantidad_maxima: cantidad_maxima, cantidad_sugerida: cantidad_sugerida,cantidad_fijo:ordenesRepoProducto.registroFijo?ordenesRepoProducto.registroFijo.cantidad_fijo:null }
			}
			$scope.verficarCantidadSugeridaConPrestacion = function (x, cantidad_maxima, inventario_disponible) {
				var valor = cantidad_maxima - inventario_disponible
				var total = 0
				x.producto.cantidad_prestacion_compra = x.producto.cantidad_prestacion_compra ? x.producto.cantidad_prestacion_compra : valor
				do {
					total = total + x.producto.cantidad_prestacion_compra
					if (valor >= x.producto.cantidad_prestacion_compra) {
						valor = valor - x.producto.cantidad_prestacion_compra
					} else {
						valor = valor - valor
					}
				} while (valor > 0);
				return total
			}
			$scope.agregardetallePedido = function (detalle) {
				if (detalle !== undefined && detalle !== null) {
					let exist = $scope.detallesPedido.some(function (x) {
						return x.producto.id === detalle.producto.id
					})
					if (!exist) {
						detalle.total = detalle.precio_unitario * detalle.cantidad
						detalle.saldo_inventario = detalle.inventario_disponible
						$scope.detallesPedido.push(detalle);
						$scope.pedido.total = $scope.sumarTotalPedido()
					} else {
						let detallePedido = $scope.detallesPedido.find(function (x) {
							return x.producto.id === detalle.producto.id
						})
						detallePedido.cantidad += detalle.cantidad
						detallePedido.total = detallePedido.precio_unitario * detallePedido.cantidad
						detallePedido.saldo_inventario = detallePedido.inventario_disponible
						$scope.pedido.total = $scope.sumarTotalPedido()
					}
					$scope.detallePedido = {};
					$scope.enfocar("producto-pedido");
				} else {
					$scope.mostrarMensaje('Ocurrió un problema, no se puede agregar un valor no definido o nulo.');
				}
			}
			$scope.modificarTotalesOrdenCompra = function (detalle) {
				detalle.total = detalle.precio_unitario * detalle.cantidad
				detalle.saldo_inventario = detalle.inventario_disponible
				$scope.pedido.total = $scope.sumarTotalPedido()
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

			$scope.mostrarBusqueda = function () {
				if ($scope.mostarBusquedaProducto) {
					$scope.mostarBusquedaProducto = false
				} else {
					$scope.mostarBusquedaProducto = true
				}
			}

			$scope.obtenerSubGruposProductosEmpresaUsuario = function () {
				blockUI.start();
				// var promesa = ListaGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);
				var promesa = ListaSubGruposProductoEmpresa($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (grupos) {
					blockUI.stop();
					if (grupos.length > 0) {
						$scope.subGruposProducto = grupos;
					} else {
						$scope.subGruposProducto = [];
						$scope.mostrarMensaje('Parece que el usuario actual no cuenta con grupos de productos.');
					}
				}).catch(function (err) {
					$scope.subGruposProducto = [];
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
					$scope.mostrarMensaje(mensaje);
					blockUI.stop();
				});
			};

			$scope.obtenerPaginador = function (filtro) {
				blockUI.start();
				$scope.paginator = Paginator();
				$scope.paginator.column = "fecha";
				$scope.paginator.direction = "asc";
				$scope.filtro = filtro ? filtro : {
					fechaInicioTexto: '',
					fechaFinTexto: '', usuario: '', nro_almacen: '', empresa: $scope.usuario.id_empresa, rol: $scope.usuario.rolesUsuario[0].rol.nombre, id: $scope.usuario.id, desde: 0, hasta: 0, sucursal: 0, almacen: 0, movimiento: 0, estado: 0, valuado: 0, pagina: 1, items_pagina: 10, busqueda: ""
				};
				$scope.paginator.callBack = $scope.obtenerSolicitudes;
				$scope.paginator.getSearch($scope.filtro.busqueda, $scope.filtro, null);
				blockUI.stop();
			}

			$scope.obtenerSolicitudes = function () {
				blockUI.start()
				$scope.paginator.filter.desde = ($scope.filtro.fechaInicioTexto !== undefined) ? ($scope.filtro.fechaInicioTexto !== '') ? $scope.convertirFecha($scope.filtro.fechaInicioTexto) : 0 : 0
				$scope.paginator.filter.hasta = ($scope.filtro.fechaFinTexto !== undefined) ? ($scope.filtro.fechaFinTexto !== '') ? $scope.convertirFecha($scope.filtro.fechaFinTexto) : 0 : 0

				var promesa = SolicitudesReposicion($scope.paginator)
				promesa.then(function (solicitudes) {
					$scope.paginator.setPages(solicitudes.paginas);
					$scope.solicitudesOperaciones = solicitudes.solicitudes
					blockUI.stop()
				}).catch(function (err) {
					blockUI.stop();
					var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
					$scope.mostrarMensaje(memo);
				})
			}

			$scope.obtenerSucursales = function () {
				var sucursales = [];
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}

			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.filtroOrdenRepo.almacen = ""
				if (idSucursal === undefined) {
					$scope.filtro.sucursal = undefined
					$scope.almacenes = []
				}
				if (idSucursal !== undefined) {
					$scope.almacenes = [];
					var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
					$scope.almacenes = sucursal ? sucursal.almacenes : [];
					// if ($scope.solicitud.almacen) {
					// 	$scope.cargarProductos();
					// } else {
					// 	$scope.solicitud.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : $scope.solicitud.almacen ? $scope.solicitud.almacen : null;
					// 	$scope.productosProcesados = []
					// }
				}
			}

			$scope.abrirPopupConfirmarEliminadoAlmacen = function (funcionEliminacion, dataParam) {
				var promesa = OptenerDatosSolicitudAlm(dataParam.id, dataParam.id_almacen)
				promesa.then(function (dato) {
					if (dato.solicitud.activo) {
						SweetAlert.swal({
							title: "Esta seguro?",
							text: "Esta seguro de eliminar el elemento seleccionado!",
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Si',
							cancelButtonText: "No"
						}).then(function (result) {
							if (result.value) {
								$scope.funcionEliminacion = funcionEliminacion;
								$scope.dataParam = dataParam;
								$scope.funcionEliminacion($scope.dataParam);
							}
						});
					} else {
						SweetAlert.swal("", "La solicitud con Nro Doc.: " + dato.solicitud.numero_correlativo + " ya ha sido cerrada!", "warning");
						dataParam.activo = false;
					}
				});

			}

			$scope.eliminar = function (solicitud) {
				$scope.solicitud = solicitud
				var prom = EliminarSolicitudReposicion(solicitud)
				prom.then(function (res) {
					if (res.hasErr) {
						SweetAlert.swal("", res.mensaje, "error");
					} else {
						SweetAlert.swal("Eliminado!", res.mensaje, "success");
						$scope.recargarItemsTabla()
						$scope.solicitud = undefined
					}
					blockUI.stop()
				}).catch(function (err) {
					$scope.solicitud = undefined
					var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
					SweetAlert.swal("", msg, "error");
					blockUI.stop()
				})
				// EliminarSolicitudReposicion.save({ id_solicitud: solicitud.id }, solicitud, function (res) {
				// 	if (res.hasErr) {
				// 		$scope.mostrarMensaje(res.mensaje)
				// 	} else {
				// 		$scope.recargarItemsTabla()
				// 		$scope.solicitud = undefined
				// 	}
				// 	blockUI.stop()
				// })
				// $scope.solicitud.solicitudesProductos.map(function (prod) {
				// 	var promesa = ListaInventariosProducto(prod.productoSolicitado.id, $scope.solicitud.almacen.id);
				// 	promesa.then(function (inventarios) {
				// 		prod.inventarios = inventarios
				// 		// prod.inventario_disponible_utilizado = prod.cantidad
				// 		if ($scope.solicitud.solicitudesProductos.indexOf(prod) == $scope.solicitud.solicitudesProductos.length - 1) {

				// 		}
				// 	})
				// })
				// $scope.cerrarConfirmacionEliminacion();
			}

			$scope.ver = function (dato) {
				var promesa = OptenerDatosSolicitudAlm(dato.id, dato.id_almacen)
				promesa.then(function (dato) {
					$scope.solicitud = dato.solicitud
					$scope.solicitud.ver = true
					$scope.solicitud.sucursal = $scope.solicitud.almacen.sucursal
					$scope.obtenerAlmacenes($scope.solicitud.sucursal.id)
					$scope.solicitud.almacen = $scope.solicitud.almacen

					// $scope.solicitud.ingredientes = $scope.solicitud.solicitudesProductos
					// $scope.solicitud.ingredientes = $scope.solicitud.solicitudesProductos.map(function (producto) {
					// 	producto.elNombre = (producto.producto !== undefined) ? producto.producto.nombre : (producto.productoSolicitado !== undefined) ? producto.productoSolicitado.nombre : productito.productoSolicitudBase.nombre
					// })
					$scope.abrirDialogPanelOperaciones('verOeditar')
				})
			}

			$scope.calcularTotalViveres = function (solicitud, solo_calcular) {
				// if(!$scope.alreadyCalculated){
				$scope.totalViveresSolicitados = {}

				if (solicitud !== undefined) {
					$scope.solicitud = solicitud
					$scope.totalViveresSolicitados.usuario = solicitud.usuario
					$scope.totalViveresSolicitados.fecha = solicitud.fecha
					$scope.totalViveresSolicitados.sucursal = solicitud.almacen.sucursal
					$scope.totalViveresSolicitados.almacen = solicitud.almacen
					$scope.totalViveresSolicitados.identificador = solicitud.numero_correlativo
					$scope.totalViveresSolicitados.productos = []
					$scope.totalViveresSolicitados.area = solicitud.area && solicitud.area.nombre || null;

				} else {
					throw new Error('Hubo un problema con la solicitud, no esta definida!')
					$scope.mostrarMensaje('Hubo un problema con la solicitud, no esta definida!')
					return
				}
				var xArr = []
				$scope.solicitud.solicitudesProductos.map(function (producto) {
					if (producto.eliminado === false || producto.eliminado === undefined) {
						if (producto.productoSolicitado.activar_inventario) {
							var obj = {
								estado: solicitud.activo,
								almacen: solicitud.almacen,
								cantidad_ideal: producto.cantidad,
								cantidad_real: producto.cantidad,
								id: producto.id,
								id_detalle_solicitud_producto: producto.id,
								id_producto_base: producto.productoSolicitado,
								productoSolicitudBase: producto.productoSolicitado,
								total: producto.cantidad,
								monto: solicitud.monto,
								solicitud: solicitud.id,
								area: solicitud.area && solicitud.area.nombre || null
							}
							$scope.totalViveresSolicitados.productos.push(obj)
						}
						if (producto.detallesIngredientesProducto.length > 0) {
							producto.detallesIngredientesProducto.map(function (ingrediente) {
								if (ingrediente.eliminado === undefined || ingrediente.eliminado === false) {
									var obj = {
										estado: solicitud.activo,
										almacen: solicitud.almacen,
										cantidad_ideal: ingrediente.cantidad_ideal,
										cantidad_real: ingrediente.cantidad_real,
										id: ingrediente.id,
										id_detalle_solicitud_producto: ingrediente.id_detalle_solicitud_producto,
										id_producto_base: ingrediente.id_producto_base,
										productoSolicitudBase: ingrediente.productoSolicitudBase,
										total: 0,
										monto: solicitud.monto,
										solicitud: solicitud.id,
										area: solicitud.area && solicitud.area.nombre || null
									}
									xArr.push(obj)
								}
							})
						}
					}
				})
				var toDrop = []
				$scope.solicitud.solicitudesProductos.map(function (item) {
					var indx = 0
					while (indx < xArr.length) {
						xArr.forEach(function (ing, index, aarr) {
							if (indx > index) {
								if (xArr[indx].id_producto_base === ing.id_producto_base) {
									toDrop.push(index)
								}
							}
						});
						indx += 1
					}
				})
				toDrop.forEach(function (element) {
					delete xArr[element]
				});
				xArr.map(function (itm) {
					if (itm !== undefined) {
						var obj = {
							estado: solicitud.activo,
							almacen: solicitud.almacen,
							cantidad_ideal: 0,
							cantidad_real: 0,
							id: itm.id,
							id_detalle_solicitud_producto: itm.id_detalle_solicitud_producto,
							id_producto_base: itm.id_producto_base,
							productoSolicitudBase: itm.productoSolicitudBase,
							total: 0,
							monto: solicitud.monto,
							solicitud: solicitud.id,
							area: solicitud.area && solicitud.area.nombre || null
						}
						$scope.totalViveresSolicitados.productos.push(obj)
					}
				})
				$scope.solicitadoTotalFinalBs = 0
				var alreadyCount = []
				$scope.totalViveresSolicitados.productos.map(function (producto) {
					producto.totalMostrar = 0
					$scope.solicitud.solicitudesProductos.map(function (item) {
						item.detallesIngredientesProducto.map(function (ingr) {
							if (producto.id_producto_base == ingr.id_producto_base) {
								producto.cantidad_ideal += ingr.cantidad_ideal
								producto.cantidad_real += ingr.cantidad_real
								producto.totalMostrar += ingr.total
								producto.total += ingr.total
								producto.totalSumar = ingr.total
								producto.totalbs = producto.totalSumar * ingr.productoSolicitudBase.precio_unitario
								$scope.solicitadoTotalFinalBs += producto.totalbs
							}
						})
						if (producto.id_producto_base == item.id_producto) {
							producto.cantidad_ideal = 1
							producto.cantidad_real = item.cantidad
							producto.totalMostrar = item.cantidad
							producto.totalSumar = item.cantidad
							producto.total = item.cantidad
							producto.totalbs = producto.totalSumar * item.productoSolicitado.precio_unitario
							$scope.solicitadoTotalFinalBs += producto.totalbs
						}
					})
				})
				$scope.alreadyCalculated = true
				if (solo_calcular === undefined) {
					if (solicitud !== undefined) {
						$scope.abrirDialogTotalIngredientes()
					} else {
						$scope.solicitud = undefined
					}
				} else {
					return $scope.totalViveresSolicitados
				}
			}

			$scope.grupoSeleccionado = { nombre: 'TODOS' }
			$scope.idGrupoGlobal = 0;
			$scope.clasificarGrupo = function (grupo) {
				$scope.popoverIsOpen = false;
				if (grupo) {
					$scope.grupoSeleccionado = grupo
					$scope.idGrupoGlobal = grupo.id;
				} else {
					$scope.idGrupoGlobal = 0;
					$scope.grupoSeleccionado = { nombre: 'TODOS' }
				}
				$scope.productosProcesados = [];
				$scope.page = 1;
				$scope.textoGlobal = 0;
				$scope.search = "";
				// $scope.productosProcesados = $filter('filter')($scope.productos, $scope.grupoGet);
				$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
				setTimeout(function () {
					aplicarSwiper(4, 3, true, 2);
				}, 5);
			}

			$scope.verFormulacion = function (producto) {
				if ($scope.productoSeleccionado !== undefined) {
					if (producto.productoSolicitado.id != $scope.productoSeleccionado.productoSolicitado.id) {
						var indice = $scope.solicitud.solicitudesProductos.indexOf(producto);
						$scope.solicitud.solicitudesProductos[indice].verFormulacion = undefined;
						$scope.productoSeleccionado.verFormulacion = undefined
					}
				}
				if (producto.verFormulacion === undefined) {
					producto.verFormulacion = true
				} else {
					producto.verFormulacion = undefined
				}
				$scope.productoSeleccionado = producto
			}

			$scope.deshabilitarAlmacen = false;
			$scope.eliminarDetalleVenta = function (detalleVenta, disminuido) {
				if (detalleVenta.id === undefined) {
					$scope.solicitud.solicitudesProductos.splice($scope.solicitud.solicitudesProductos.indexOf(detalleVenta), 1);
				} else {
					detalleVenta.eliminado = true
					detalleVenta.cantidad = 0
					detalleVenta.detallesIngredientesProducto.map(function (ing) {
						ing.eliminado = true
					})
				}
				if ($scope.solicitud.solicitudesProductos.length == 0) {
					$scope.deshabilitarAlmacen = false;
				}

			}

			$scope.eliminarIngrediente = function (detalleVenta) {
				if (detalleVenta.id === undefined) {
					$scope.productoSeleccionado.detallesIngredientesProducto.splice($scope.productoSeleccionado.detallesIngredientesProducto.indexOf(detalleVenta), 1);
				} else {
					detalleVenta.eliminado = true
				}
				if ($scope.productoSeleccionado.detallesIngredientesProducto.length == 0) {
					$scope.eliminarDetalleVenta($scope.productoSeleccionado, true);
				} else {
					var count = 0
					$scope.productoSeleccionado.detallesIngredientesProducto.map(function (ingr) {
						count += (ingr.eliminado === true) ? 1 : 0
					})
					if (count == $scope.productoSeleccionado.detallesIngredientesProducto.length) {
						$scope.eliminarDetalleVenta($scope.productoSeleccionado);
					}
				}
			}

			$scope.disminuirDetalleVenta = function (detalleVenta, producto) {
				if ($scope.productosProcesados.length > 0) {
					var indice = -1;
					if (detalleVenta == null) {
						indice = $scope.productosProcesados.indexOf(producto);
						var detalleVenta = $scope.solicitud.solicitudesProductos.filter(function (e) {
							return e.productoSolicitado === producto
						})[0];
					} else {
						indice = $scope.productosProcesados.indexOf(detalleVenta.productoSolicitado);
					}
					// var indice = $scope.productosProcesados.indexOf(detalleVenta.productoSolicitado);

					if (indice >= 0) {
						if (detalleVenta.cantidad == 1) {
							$scope.eliminarDetalleVenta(detalleVenta, true);
							$scope.productosProcesados[indice].inventario_disponible = roundNumber($scope.productosProcesados[indice].inventario_disponible + 1, 2);
						} else {
							if (detalleVenta.cantidad < 1) {
								$scope.productosProcesados[indice].inventario_disponible = roundNumber($scope.productosProcesados[indice].inventario_disponible + detalleVenta.cantidad, 2);
								detalleVenta.cantidad = 0;
								$scope.eliminarDetalleVenta(detalleVenta, true);
							} else {
								detalleVenta.cantidad = roundNumber(detalleVenta.cantidad - 1, 2);
								$scope.productosProcesados[indice].inventario_disponible = roundNumber($scope.productosProcesados[indice].inventario_disponible + 1, 2);
							}

							detalleVenta.detallesIngredientesProducto.map(function (prod) {
								prod.total = detalleVenta.cantidad * prod.cantidad_ideal
							})
						}
					} else {
						if (detalleVenta.hasOwnProperty("inventario_disponible")) {
							if (detalleVenta == null) {
								var detalleVenta = $scope.solicitud.solicitudesProductos.filter(function (e) {
									return e.productoSolicitado === producto
								})[0];
							}

							if (detalleVenta.cantidad == 1) {
								$scope.eliminarDetalleVenta(detalleVenta, true);
								detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + 1, 2);
							} else {
								if (detalleVenta.cantidad < 1) {
									detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + detalleVenta.cantidad, 2);
									detalleVenta.cantidad = 0;
									$scope.eliminarDetalleVenta(detalleVenta, true);
								} else {
									detalleVenta.cantidad = roundNumber(detalleVenta.cantidad - 1, 2);
									detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + 1, 2);
								}

								detalleVenta.detallesIngredientesProducto.map(function (prod) {
									prod.total = detalleVenta.cantidad * prod.cantidad_ideal
								})

							}
						}
					}

				} else {
					if (detalleVenta.hasOwnProperty("inventario_disponible")) {
						// if (detalleVenta.inventario_disponible) {
						if (detalleVenta == null) {
							var detalleVenta = $scope.solicitud.solicitudesProductos.filter(function (e) {
								return e.productoSolicitado === producto
							})[0];
						}

						if (detalleVenta.cantidad == 1) {
							$scope.eliminarDetalleVenta(detalleVenta, true);
							detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + 1, 2);
						} else {
							if (detalleVenta.cantidad < 1) {
								detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + detalleVenta.cantidad, 2);
								detalleVenta.cantidad = 0;
								$scope.eliminarDetalleVenta(detalleVenta, true);
							} else {
								detalleVenta.cantidad = roundNumber(detalleVenta.cantidad - 1, 2);
								detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible + 1, 2);
							}

							detalleVenta.detallesIngredientesProducto.map(function (prod) {
								prod.total = detalleVenta.cantidad * prod.cantidad_ideal
							})

						}
					}
				}

			}

			// $scope.disminuirDetalleVentaDerecho = function (producto) {
			// 	var indice = $scope.productosProcesados.indexOf(producto);
			// 	var detalleVenta = $scope.solicitud.solicitudesProductos.filter(function(e){
			// 	return e.productoSolicitado === producto
			// 	})[0];

			// 	if (detalleVenta.cantidad == 1) {
			// 		$scope.eliminarDetalleVenta(detalleVenta, true);
			// 		$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
			// 	} else {
			// 		if (detalleVenta.cantidad < 1) {
			// 			$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + detalleVenta.cantidad;
			// 			detalleVenta.cantidad = 0;
			// 			$scope.eliminarDetalleVenta(detalleVenta, true);
			// 		}else{
			// 			detalleVenta.cantidad = detalleVenta.cantidad - 1;
			// 			$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
			// 		}

			// 		detalleVenta.detallesIngredientesProducto.map(function (prod) {
			// 			prod.total = detalleVenta.cantidad * prod.cantidad_ideal
			// 		})

			// 	}
			// }
			var nun = 1
			$scope.teclaCantidad = function (e, detalleVenta) {
				// if(!((e.keyCode > 95 && e.keyCode < 106)
				// || (e.keyCode > 47 && e.keyCode < 58) 
				// || e.keyCode == 8)) {
				// 	return false;
				// }

				if (e.keyCode == 9) {
					$scope.enfocar("buscarfoco");
				}

				if (e.keyCode == 107) {
					detalleVenta.cantidad = nun + 1
				}
				if (e.keyCode == 109) {
					detalleVenta.cantidad = nun - 1
				}


				console.log(e, detalleVenta);
			}

			$scope.focoBuscar = function (e) {
				angular.element($window).unbind("keydown");
				if (e.keyCode == 9) {
					e.preventDefault();
					$("#buscarfoco").focus();
					$("#buscarfoco").select();
				}
			}
			$scope.aumentarDetalleVenta = function (detalleVenta) {
				if ($scope.productosProcesados.length > 0) {
					// var indice = $scope.productosProcesados.indexOf(detalleVenta.productoSolicitado);
					var indice = $scope.productosProcesados.findIndex(function (index) {
						return index.id == detalleVenta.productoSolicitado.id;
					});
					if (detalleVenta.cantidad >= 1 && indice >= 0) {
						if ($scope.productosProcesados[indice].inventario_disponible >= 1) {
							detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + 1, 2);
							$scope.productosProcesados[indice].inventario_disponible = roundNumber($scope.productosProcesados[indice].inventario_disponible - 1, 2);
						} else if ($scope.productosProcesados[indice].inventario_disponible > 0 && $scope.productosProcesados[indice].inventario_disponible < 1) {
							detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + $scope.productosProcesados[indice].inventario_disponible, 2);
							$scope.productosProcesados[indice].inventario_disponible = 0;
						}

					} else {
						if (detalleVenta.hasOwnProperty("inventario_disponible")) {

							if (detalleVenta.cantidad >= 1) {
								if (detalleVenta.inventario_disponible >= 1) {
									detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + 1, 2);
									detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible - 1, 2);
								} else if (detalleVenta.inventario_disponible > 0 && detalleVenta.inventario_disponible < 1) {
									detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + detalleVenta.inventario_disponible, 2);
									detalleVenta.inventario_disponible = 0;
								}

							}
						}
					}

				} else {
					if (detalleVenta.hasOwnProperty("inventario_disponible")) {

						if (detalleVenta.cantidad >= 1) {
							if (detalleVenta.inventario_disponible >= 1) {
								detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + 1, 2);
								detalleVenta.inventario_disponible = roundNumber(detalleVenta.inventario_disponible - 1, 2);
							} else if (detalleVenta.inventario_disponible > 0 && detalleVenta.inventario_disponible < 1) {
								detalleVenta.cantidad = roundNumber(detalleVenta.cantidad + detalleVenta.inventario_disponible, 2);
								detalleVenta.inventario_disponible = 0;
							}

						}
					}

				}

				detalleVenta.detallesIngredientesProducto.map(function (prod) {
					prod.total = detalleVenta.cantidad * prod.cantidad_ideal
				})

			}

			$scope.increment = 1;
			$scope.aumentarRestarTeclado = function (e, detalleVenta) {
				if (e.key == "+") {
					e.preventDefault();
					var value = +detalleVenta.cantidad;
					detalleVenta.cantidad = value + $scope.increment;
					$scope.validarDetalleVenta(detalleVenta);
				} else if (e.key == "-") {
					e.preventDefault();
					var value = +detalleVenta.cantidad;
					detalleVenta.cantidad = value - $scope.increment;
					$scope.validarDetalleVenta(detalleVenta);
				}
			}

			$scope.validarDetalleVenta = function (detalleVenta) {

				if ($scope.productosProcesados.length > 0) {

					var indice = $scope.productosProcesados.findIndex(function (index) {
						return index.id == detalleVenta.productoSolicitado.id;
					});

					if (detalleVenta.cantidad >= 0 && detalleVenta.cantidad != null) {
						if (detalleVenta.productoSolicitado.disponible_r) {
							if (detalleVenta.cantidad <= detalleVenta.productoSolicitado.disponible_r) {
								// detalleVenta.cantidad = detalleVenta.cantidad + 1;
								$scope.productosProcesados[indice].inventario_disponible = roundNumber(detalleVenta.productoSolicitado.disponible_r - detalleVenta.cantidad, 2);
							} else {
								detalleVenta.cantidad = roundNumber(detalleVenta.productoSolicitado.disponible_r, 2);
								$scope.productosProcesados[indice].inventario_disponible = 0;
								$scope.mostrarMensaje("¡Cantidad de inventario insuficiente, inventario disponible: " + detalleVenta.productoSolicitado.disponible_r + " !");
							}
						} else {
							if (detalleVenta.cantidad <= detalleVenta.disponible_r) {
								$scope.productosProcesados[indice].inventario_disponible = roundNumber(detalleVenta.disponible_r - detalleVenta.cantidad, 2);
							} else {
								detalleVenta.cantidad = roundNumber(detalleVenta.disponible_r, 2);
								$scope.productosProcesados[indice].inventario_disponible = 0;
								$scope.mostrarMensaje("¡Cantidad de inventario insuficiente, inventario disponible: " + detalleVenta.disponible_r + " !");
							}
						}

					}
				} else {
					if (detalleVenta.hasOwnProperty("inventario_disponible")) {
						if (detalleVenta.cantidad >= 0 && detalleVenta.cantidad != null) {
							if (detalleVenta.cantidad <= detalleVenta.disponible_r) {
								// detalleVenta.cantidad = detalleVenta.cantidad + 1;
								detalleVenta.inventario_disponible = roundNumber(detalleVenta.disponible_r - detalleVenta.cantidad, 2);
							} else {
								detalleVenta.cantidad = roundNumber(detalleVenta.disponible_r, 2);
								detalleVenta.inventario_disponible = 0;
								$scope.mostrarMensaje("¡Cantidad de inventario insuficiente, inventario disponible: " + detalleVenta.disponible_r + " !");
							}
						}

						// if (detalleVenta.cantidad >= 1 && detalleVenta.cantidad != null) {
						// 	if (detalleVenta.inventario_disponible >= 1) {
						// 		detalleVenta.inventario_disponible = detalleVenta.inventario_disponible - 1;
						// 	} else if (detalleVenta.inventario_disponible > 0 && detalleVenta.inventario_disponible < 1) {
						// 		// detalleVenta.cantidad = detalleVenta.cantidad + detalleVenta.inventario_disponible;
						// 		detalleVenta.inventario_disponible = 0;
						// 		$scope.mostrarMensaje("¡Cantidad de inventario insuficiente, inventario disponible: " + detalleVenta.inventario_disponible + " !");
						// 	}

						// }
					}
				}

				detalleVenta.detallesIngredientesProducto.map(function (prod) {
					prod.total = detalleVenta.cantidad * prod.cantidad_ideal
				})
			}

			$scope.actualizarTotalReal = function (prod) {
				prod.detallesIngredientesProducto.map(function (ing) {
					ing.total = prod.cantidad * ing.cantidad_ideal
				})
			}

			$scope.obtenerConfiguracionVentaVista = function () {
				blockUI.start();
				var promise = ConfiguracionVentaVistaDatos($scope.usuario.id_empresa);
				promise.then(function (configuracion) {
					$scope.configuracionVentaVista = configuracion;
					blockUI.stop();
				});
			}

			$scope.guardarConfiguracionVentaVista = function () {
				ConfiguracionVentaVista.update({ id_empresa: $scope.usuario.id_empresa }, $scope.configuracionVentaVista, function (res) {

				});
			}

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

			$scope.getFecha = function () {
				if ($scope.solicitud !== undefined) {
					return new Date($scope.solicitud.fecha)
				} else {
					return new Date()
				}
			}

			$scope.guardarOperacionPanel = async function (formValid, solicitud) {
				blockUI.start()
				var montobs = 0
				if (formValid) {
					var productosSolicitados = $scope.calcularTotalViveres(solicitud, true)
					solicitud.listaProductosSolicitados = productosSolicitados
					solicitud.solicitudesProductos.map(function (produc) {
						var prodMonto = 0
						if (produc.detallesIngredientesProducto !== undefined) {
							if (produc.detallesIngredientesProducto.length < 1) {
								if (produc.eliminado === undefined || produc.eliminado === false) {
									prodMonto += produc.productoSolicitado.precio_unitario * produc.cantidad
								}
							} else {
								if (produc.eliminado === undefined || produc.eliminado === false) {
									produc.detallesIngredientesProducto.map(function (ingrediente) {
										if (ingrediente.eliminado === undefined || ingrediente.eliminado === false) {
											prodMonto += ingrediente.total * ingrediente.productoSolicitudBase.precio_unitario
										}
									})
								}
							}
						} else {
							if (produc.eliminado === undefined) {
								prodMonto += produc.productoSolicitado.precio_unitario * produc.cantida
							}
						}
						montobs += prodMonto
					})
					solicitud.monto = montobs
					var fortime = new Date()
					var dateSplit = solicitud.fecha.split('/').reverse()
					solicitud.fecha = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2], fortime.getHours(), fortime.getMinutes())
					solicitud.id_usuario = $scope.usuario.id
					solicitud.activo = true
					var q = await ObtenerConfiguracionIso(solicitud.sucursal.id)
					if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "CONSUMO" && cfg.activo == true);
					if ($scope.usuario.empresa.usar_configuracion_iso && q.length == 1) {
						solicitud.configuracionesIso = q[0];
						solicitud.config_doc_iso = q[0].id;
					} else {
						solicitud.configuracionesIso = undefined;
						solicitud.config_doc_iso = undefined;
					}
					var prom = Solicitud(solicitud, $scope.usuario.id_empresa, solicitud.modificar)
					prom.then(function (res) {
						if (res.hasErr) {
							SweetAlert.swal("", res.mensaje, "error");
							solicitud.fecha = new Date(solicitud.fecha).toLocaleDateString()
						} else {
							$scope.deshabilitarAlmacen = false;
							solicitud.configuracionesIso != undefined ? solicitud.configuracionesIso.predefinido ? $scope.printIsoDocConsumo(res.solicitud) : $scope.generarPdfSolicitud(res.solicitud) : $scope.generarPdfSolicitud(res.solicitud);
							SweetAlert.swal({
								title: "Guardado!",
								text: res.mensaje,
								icon: 'success',
								timer: 2000,
								showConfirmButton: false
							})
							$scope.recargarItemsTabla()
						}
						blockUI.stop()
					}).catch(function (err) {
						var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
						SweetAlert.swal("", msg, "error");
						solicitud.fecha = new Date(solicitud.fecha).toLocaleDateString()
						blockUI.stop()
					})
				} else {
					SweetAlert.swal("", 'Complete los campos requeridos', "warning");
					blockUI.stop();
				}
			}

			$scope.obtenerInventariosProdSolicitud = function () {
				$scope.solicitud.solicitudesProductos.map(function (prod) {
					var promesa = ListaInventariosProducto(prod.productoSolicitado.id, $scope.solicitud.almacen.id);
					promesa.then(function (inventarios) {
						prod.inventarios = inventarios
						// prod.inventario_disponible_utilizado = prod.cantidad
					})
				})
			}

			$scope.obtenerInventarioTotal = function (producto) {
				var cantidadTotal = 0;
				var promesa = ListaInventariosProducto(producto.id, $scope.solicitud.almacen.id);
				promesa.then(function (inventarios) {
					producto.inventarios = inventarios;
					for (var i = 0; i < producto.inventarios.length; i++) {
						producto.inventarios[i].fecha_vencimiento = (producto.inventarios[i].fecha_vencimiento ? new Date(producto.inventarios[i].fecha_vencimiento) : null);
						producto.inventarios[i].fechaVencimientoTexto = (producto.inventarios[i].fecha_vencimiento ? producto.inventarios[i].fecha_vencimiento.getDate() + "/" + (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + producto.inventarios[i].fecha_vencimiento.getFullYear() : "");
						producto.inventarios[i].detallesMovimiento[0].movimiento.fecha = new Date(producto.inventarios[i].detallesMovimiento[0].movimiento.fecha);
						producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto = producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getDate() + "/" + (producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getMonth() + 1) + "/" + producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getFullYear();
					}
				}).catch(function (err) {
					var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
					$scope.mostrarMensaje(msg)
					return 0
				})
				if (producto.activar_inventario) {
					for (var i = 0; i < producto.inventarios.length; i++) {
						cantidadTotal += (producto.inventarios[i].cantidad);
					}
					if ($scope.solicitud.solicitudesProductos !== undefined && $scope.solicitud.copia) {
						for (var j = 0; j < $scope.solicitud.solicitudesProductos.length; j++) {
							if ($scope.solicitud.solicitudesProductos[j].productoSolicitado.id == producto.id) {
								cantidadTotal = cantidadTotal - $scope.solicitud.solicitudesProductos[j].cantidad;
							}
						}
					}
				} else {
					cantidadTotal = 500000;
				}
				return cantidadTotal;
			}

			$scope.page = 1;
			$scope.fetching = false;
			$scope.textoGlobal = 0;
			$scope.getProductosPanel = function () {
				$scope.page++;
				$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
			};

			$scope.getProductoFilter = function (pagina, texto, grupo) {
				$scope.fetching = true;
				if ($scope.solicitud) {
					var promesa = ProductosOperaciones($scope.usuario.id_empresa, $scope.solicitud.almacen.id, $scope.usuario.id, pagina, texto, grupo);
					promesa.then(function (productos) {

						if (productos.length) {
							// $scope.items = $scope.items.concat(items);
							for (var i = 0; i < productos.length; i++) {
								var producto = productos[i]
								if (producto.activar_inventario) {
									producto.inventario_disponible = roundNumber($scope.obtenerInventarioTotal(productos[i]), 2);
								}
							}
							// $scope.productos = $scope.productos.concat(productos);

							// ======= save localstorage ====
							if (angular.isDefined($localStorage.productosProcesados)) {

								// ===== conbinar array productos con storage ====
								$scope.productosProcesados = $scope.productosProcesados.concat(productos);

								for (var i = 0; i < $localStorage.productosProcesados.length; i++) {
									for (var j = 0; j < $scope.productosProcesados.length; j++) {
										if ($localStorage.productosProcesados[i].id == $scope.productosProcesados[j].id) {
											$scope.productosProcesados[j].rankin = $localStorage.productosProcesados[i].rankin;
										}
									}
								}

							} else {
								$scope.productosProcesados = $scope.productosProcesados.concat(productos);
							}
							$scope.fetching = false;
						} else {
							$scope.disabled = true; // Disable further calls if there are no more items
						}
					});
				}
			}

			function roundNumber(number, decimals) {
				var newnumber = new Number(number + '').toFixed(parseInt(decimals));
				return parseFloat(newnumber);
			}

			$scope.cargarProductos = function () {
				$scope.productosProcesados = [];
				$scope.page = 1;
				$scope.idGrupoGlobal = 0;
				$scope.textoGlobal = 0;

				if ($scope.solicitud.almacen != undefined) {
					var promesa = ProductosOperaciones($scope.usuario.id_empresa, $scope.solicitud.almacen.id, $scope.usuario.id, 1, $scope.textoGlobal, $scope.idGrupoGlobal);
					promesa.then(function (productos) {
						if (productos.length > 0) {
							for (var i = 0; i < productos.length; i++) {
								if (productos[i].activar_inventario) {
									productos[i].inventario_disponible = roundNumber($scope.obtenerInventarioTotal(productos[i]), 2);
								}
							}
							$scope.productos = productos;
						} else {
							$scope.productos = [];
						}
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

						//===== Fin save localstorage ====
						setTimeout(function () {
							aplicarSwiper(4, 3, true, 2);
						}, 1000);
					});
				}
			}

			$scope.agregarDetalleVentaPanel = function (producto) {
				$scope.deshabilitarAlmacen = true;
				angular.element($window).unbind("keydown");
				angular.element($window).bind("keydown", function (e) {

					if (e.keyCode == 9) {
						// e.preventDefault();
						// $scope.enfocar('nitP1');
						$timeout(function () {
							$(".lastcant").focus();
							$(".lastcant").select();
						}, 0);
					}
					if (e.key == "+") {
						e.preventDefault();
						$(".lastcant").focus();

					} else if (e.key == "-") {
						e.preventDefault();
						$(".lastcant").focus();
					}
				});
				var monto = 0
				$scope.cantidadInventario = 0;
				var detalleVenta = {
					productoSolicitado: producto, precio_unitario: producto.precio_unitario,
					inventario_disponible: roundNumber($scope.cantidadInventario, 2),
					inventarios: producto.inventarios,
					cantidad: 1,
					detallesIngredientesProducto: []
				};
				if (producto.activar_inventario) {
					$scope.cantidadInventario = roundNumber(producto.inventario_disponible, 2);
					var j = 0, encontrado = false;
					if ($scope.solicitud.solicitudesProductos === undefined) {
						$scope.solicitud.solicitudesProductos = []
					}
					if ($scope.cantidadInventario > 0) {
						while (j < $scope.solicitud.solicitudesProductos.length && !encontrado) {
							if ($scope.solicitud.solicitudesProductos[j].eliminado === undefined) {
								if ($scope.solicitud.solicitudesProductos[j].productoSolicitado.id == producto.id) {
									if ($scope.cantidadInventario < 1) {
										$scope.solicitud.solicitudesProductos[j].cantidad = roundNumber($scope.solicitud.solicitudesProductos[j].cantidad + $scope.cantidadInventario, 2);
									} else {
										$scope.solicitud.solicitudesProductos[j].cantidad = roundNumber($scope.solicitud.solicitudesProductos[j].cantidad + 1, 2);
									}

									$scope.solicitud.solicitudesProductos[j].eliminado = undefined
									$scope.solicitud.solicitudesProductos[j].detallesIngredientesProducto.map(function (ingre) {
										ingre.total = ingre.cantidad_ideal * $scope.solicitud.solicitudesProductos[j].cantidad
									})
									encontrado = true;
									detalleVenta = $scope.solicitud.solicitudesProductos[j];
								}
							}
							j++;
						}
						if (!encontrado) {
							var formulacion = SolicitudesFormulacionProducto(producto.id)
							var ingredientes = []
							formulacion.then(function (formula) {
								if (formula.productosBase) {
									formula.productosBase.forEach(function (element) {
										ingrediente = {
											cantidad_ideal: parseFloat(element.formulacion),
											cantidad_real: parseFloat(element.formulacion),
											total: parseFloat(element.formulacion),
											id_producto_base: element.productoBase.id,
											productoSolicitudBase: element.productoBase
										}
										ingredientes.push(ingrediente)
									});
								}
							})
							if (producto.activar_inventario) {
								if (1 <= $scope.cantidadInventario) {
									detalleVenta = {
										productoSolicitado: producto, precio_unitario: producto.precio_unitario,
										inventario_disponible: roundNumber($scope.cantidadInventario, 2),
										inventarios: producto.inventarios,
										cantidad: 1,
										detallesIngredientesProducto: ingredientes
									};
									$scope.solicitud.solicitudesProductos.push(detalleVenta);
								} else if ($scope.cantidadInventario > 0 && $scope.cantidadInventario < 1) {
									detalleVenta = {
										productoSolicitado: producto, precio_unitario: producto.precio_unitario,
										inventario_disponible: roundNumber($scope.cantidadInventario, 2),
										inventarios: producto.inventarios,
										cantidad: roundNumber($scope.cantidadInventario, 2),
										detallesIngredientesProducto: ingredientes
									};
									$scope.solicitud.solicitudesProductos.push(detalleVenta);
								}
								else {
									$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
								}
							} else {
								detalleVenta = {
									productoSolicitado: producto, precio_unitario: producto.precio_unitario,
									inventario_disponible: roundNumber($scope.cantidadInventario, 2),
									inventarios: producto.inventarios,
									cantidad: 1,
									detallesIngredientesProducto: ingredientes
								};
								$scope.solicitud.solicitudesProductos.push(detalleVenta);
							}
						} else {
							producto.eliminado = undefined
						}
					} else {
						$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
					}
				} else {
					var j = 0, encontrado = false
					if ($scope.solicitud.solicitudesProductos) {
						while (j < $scope.solicitud.solicitudesProductos.length && !encontrado) {
							if ($scope.solicitud.solicitudesProductos[j].eliminado === undefined) {
								if ($scope.solicitud.solicitudesProductos[j].productoSolicitado.id == producto.id) {
									$scope.solicitud.solicitudesProductos[j].cantidad = roundNumber($scope.solicitud.solicitudesProductos[j].cantidad + 1, 2);
									$scope.solicitud.solicitudesProductos[j].eliminado = undefined
									$scope.solicitud.solicitudesProductos[j].detallesIngredientesProducto.map(function (ingre) {
										ingre.total = ingre.cantidad_ideal * $scope.solicitud.solicitudesProductos[j].cantidad
									})
									encontrado = true;
									detalleVenta = $scope.solicitud.solicitudesProductos[j];
								}
							}
							j++;
						}
					} else {
						$scope.solicitud.solicitudesProductos = []
					}

					if (!encontrado) {
						var formulacion = SolicitudesFormulacionProducto(producto.id)
						var ingredientes = []
						formulacion.then(function (formula) {
							if (formula.productosBase) {
								formula.productosBase.forEach(function (element) {
									ingrediente = {
										cantidad_ideal: parseFloat(element.formulacion),
										cantidad_real: parseFloat(element.formulacion),
										total: parseFloat(element.formulacion),
										id_producto_base: ((element.productoBase) ? element.productoBase.id : null),
										productoSolicitudBase: element.productoBase
									}
									ingredientes.push(ingrediente)
								});
							}
							detalleVenta = {
								productoSolicitado: producto, precio_unitario: producto.precio_unitario,
								inventario_disponible: roundNumber($scope.cantidadInventario, 2),
								inventarios: producto.inventarios,
								cantidad: 1,
								detallesIngredientesProducto: ingredientes
							};
							$scope.solicitud.solicitudesProductos.push(detalleVenta);
						})
					} else {
						producto.eliminado = undefined
					}
				}
				producto.rankin += 1;
				var indice = $scope.productosProcesados.indexOf(producto);
				$scope.productosProcesados[indice] = producto;
				$localStorage.productosProcesados = $scope.productosProcesados;

				if (producto.activar_inventario) {
					if ($scope.cantidadInventario > 0) {
						if ($scope.cantidadInventario > 0 && $scope.cantidadInventario < 1) {
							if (!producto.disponible_r) {
								producto.disponible_r = roundNumber($scope.cantidadInventario, 2);
							}
							producto.inventario_disponible = roundNumber($scope.cantidadInventario - $scope.cantidadInventario, 2);
						} else {

							producto.inventario_disponible = roundNumber($scope.cantidadInventario - 1, 2);
							if (!producto.disponible_r) {
								producto.disponible_r = roundNumber(producto.inventario_disponible + 1, 2);
							}

						}

					}

				}
			}

			$scope.textoGlobal = 0;
			$scope.filtrarProductos = function (busqueda) {
				$scope.textoGlobal = (busqueda !== "") ? busqueda : 0;
				// if ($scope.textoGlobal == 0 || $scope.textoGlobal.length >= 3) {
				$scope.productosProcesados = [];
				$scope.page = 1;
				$scope.idGrupoGlobal = 0;
				// $scope.productosProcesados = $filter('filter')($scope.productos, busqueda);
				$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
				setTimeout(function () {
					aplicarSwiper(4, 3, true, 2);
				}, 5);
				// }
			}

			// This is what you will bind the filter to
			$scope.search = '';
			// Instantiate these variables outside the watch
			var filterTextTimeout;
			$scope.$watch('search', function (val) {
				if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
				filterTextTimeout = $timeout(function () {
					// $scope.search = val;
					$scope.filtrarProductos(val);
				}, 900); // delay 250 ms 
			})

			$scope.confirmarEntrega = function (solicitud) {
				$scope.solicitudCerrar = solicitud
				SweetAlert.swal({
					title: "Esta seguro?",
					text: "¿Esta seguro de cerrar esta solicitud?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si',
					cancelButtonText: "No"
				}).then(function (result) {
					if (result.value) {
						$scope.cerrarSolicitud($scope.solicitudCerrar);
					}
				});

			}

			$scope.cerrarSolicitud = function (solicitud) {
				blockUI.start()
				var promesa = OptenerDatosSolicitudAlm(solicitud.id, solicitud.id_almacen)
				promesa.then(function (dato) {
					var solicitudget = dato.solicitud;
					if (solicitudget.activo) {
						var productosSolicitados = $scope.calcularTotalViveres(solicitudget, true)
						solicitudget.listaProductosSolicitados = productosSolicitados
						solicitudget.id_cierre_usuario = $scope.usuario.id;
						var prom = CerrarSolicitud(solicitudget, $scope.usuario.id_empresa)
						prom.then(function (res) {
							if (res.hasErr) {
								SweetAlert.swal("", res.mensaje, "error");
							} else {
								SweetAlert.swal("Cerrado!", res.mensaje, "success");
								$scope.solicitudCerrar = undefined
								solicitud.activo = false
								$scope.solicitud = undefined
								// $scope.cerrarDialogConfirmacionCierre()
							}
							blockUI.stop()
						}).catch(function (err) {
							var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : (err.data !== null && err.data !== undefined) ? err.data : 'Se perdió la conexión.'
							SweetAlert.swal("", msg, "error");
							blockUI.stop()
						})
					} else {
						SweetAlert.swal("", "La solicitud con Nro Doc.: " + solicitudget.numero_correlativo + " ya ha sido cerrada!", "warning");
						$scope.solicitudCerrar = undefined
						solicitud.activo = false
						$scope.solicitud = undefined
						blockUI.stop()
					}

				})
			}

			$scope.editar = function (solicitud) {
				var promesa = OptenerDatosSolicitudAlm(solicitud.id, solicitud.id_almacen)
				promesa.then(function (dato) {
					$scope.solicitud = dato.solicitud;
					if ($scope.solicitud.activo) {
						$scope.solicitud.fechaTexto = $scope.fechaATexto($scope.solicitud.fecha);
						$scope.solicitud.modificar = true;
						$scope.solicitud.sucursal = $scope.solicitud.almacen.sucursal;
						$scope.solicitud.almacen = $scope.solicitud.almacen;
						$scope.obtenerAlmacenes($scope.solicitud.sucursal.id);

						if (dato.solicitud.solicitudesProductos.length > 0) {
							for (var i = 0; i < dato.solicitud.solicitudesProductos.length; i++) {
								if (dato.solicitud.solicitudesProductos[i].productoSolicitado.activar_inventario) {
									var cantidadR = $scope.obtenerInventarioTotal(dato.solicitud.solicitudesProductos[i].productoSolicitado);

									if (!dato.solicitud.solicitudesProductos[i].disponible_r) {
										dato.solicitud.solicitudesProductos[i].disponible_r = cantidadR;
									}
									dato.solicitud.solicitudesProductos[i].inventario_disponible = cantidadR - dato.solicitud.solicitudesProductos[i].cantidad;

									if (dato.solicitud.solicitudesProductos[i].inventario_disponible < 0) {
										dato.solicitud.solicitudesProductos[i].inventario_disponible = 0;
									}


								}
							}
							$scope.solicitud = dato.solicitud;
						} else {
							$scope.solicitud = dato.solicitud;
						}

						$scope.deshabilitarAlmacen = true;
						$scope.abrirDialogPanelOperaciones('verOeditar');
					} else {
						SweetAlert.swal("", "La solicitud con Nro Doc.: " + $scope.solicitud.numero_correlativo + " ya ha sido cerrada!", "warning");
						solicitud.activo = false;
					}

					// $scope.obtenerInventariosProdSolicitud();
					// $scope.cargarProductos();
				});

			}

			$scope.generarListaGruposSeleccionados = function (gruposActualizado, gruposCache) {
				var listaGruposSeleccionados = [];
				for (var i = 0; i < gruposActualizado.length; i++) {
					for (var j = 0; j < gruposCache.length; j++) {
						if (gruposActualizado[i].id == gruposCache[j].id) {
							gruposActualizado[i].selected = gruposCache[j].selected;
						}
					}
				}
				return gruposActualizado;
			}

			$scope.obtenerGruposProductoEmpresa = function () {
				var promesa = ListaGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (grupos) {
					$scope.grupos_productos = grupos;
					// == condicion save localstorage ====
					if (angular.isDefined($localStorage.grupos_productos)) {
						$scope.grupos_productos = $scope.generarListaGruposSeleccionados($scope.grupos_productos, $localStorage.grupos_productos);
					} else {
						for (var i = 0; i < grupos.length; i++) {
							$scope.grupos_productos[i].selected = true;
						}
					}
					//save checked list function
					$scope.listChecked = [];
					$scope.saveCheckList = function () {
						//remove all list checked
						$scope.listChecked.splice(0, $scope.listChecked.length);
						for (var i = 0; i < $scope.grupos_productos.length; i++) {
							if ($scope.grupos_productos[i].selected == true) {
								$scope.listChecked.push($scope.grupos_productos[i]);
							}
						}
						$localStorage.grupos_productos = $scope.grupos_productos;
					}
					$scope.saveCheckList();
					//checked or unchecked function	
					$scope.allChecked = false;
					$scope.checkedUnchecked = function () {
						for (var i = 0; i < $scope.grupos_productos.length; i++) {
							$scope.grupos_productos[i].selected = $scope.allChecked;
						}
						$scope.saveCheckList();
					}
					// =================== fin codigo ============================
				});
			}

			if (angular.isDefined($localStorage.color)) {
				$scope.color = $localStorage.color;
			} else {
				$localStorage.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
				$scope.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
			}

			$scope.cambiarColor = function (color, buttonColor) {
				// == save localstorage ====
				$localStorage.color = { 'style': color, 'stylebutton': buttonColor };
				// ==== fin ======

				$('#dialog-panel-operaciones .widget-main').removeClass('red-style green-style skyblue-style brown-style');
				$('#dialog-panel-operaciones .widget-main').addClass(color);

				$('#dialog-panel-operaciones .widget-main .button-style').removeClass('red-style-button green-style-button skyblue-style-button brown-style-button');
				$('#dialog-panel-operaciones .widget-main .button-style').addClass(buttonColor);
			}

			$scope.showHideFirstRow = function () {
				if ($(".first-row").css("display") == "none") {
					$('.first-row').show("slow");
				} else {
					$(".first-row").hide(1000);
				}
			}

			$scope.dragged = false;

			$scope.proformaClick = function (venta) {
				if (!$scope.dragged) {
					$scope.venderProformaDirecto(venta);
				}
				$scope.dragged = false;
			};

			$scope.startDragging = function () {
				$scope.dragged = true;
			};

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

			$scope.clasificarColumna = function (columna) {
				if ($scope.columna == columna) {
					if ($scope.direccion == "asc") {
						$scope.direccion = "desc";
						$("#" + columna + "p").removeClass("fa-caret-up");
						$("#" + columna + "p").addClass("fa-caret-down");
					} else {
						$scope.direccion = "asc";
						$("#" + columna + "p").removeClass("fa-caret-down");
						$("#" + columna + "p").addClass("fa-caret-up");
					}
				} else {
					$scope.direccion = "asc";
					$(".sort").removeClass("fa-caret-up");
					$(".sort").removeClass("fa-caret-down");
					$(".sort").addClass("fa-sort");
					$("#" + columna + "p").addClass("fa-caret-up");
					$("#" + columna + "p").removeClass("fa-sort");
				}
				$scope.columna = columna;
				$scope.buscarInventarios($scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
			}

			$scope.sinFuncionalidad = function () {
				$scope.mostrarMensaje('Sin funcionalidad')
			}

			$scope.filtrarSolicitudesOperaciones = function (filtro) {
				for (var key in filtro) {
					if (filtro[key] === undefined) {
						filtro[key] = 0
					}
				}
				$scope.obtenerSolicitudes()
			}

			$scope.copiar = function (sol) {
				var promesa = OptenerDatosSolicitudAlm(sol.id, sol.id_almacen)
				promesa.then(function (dato) {
					let solicitud = dato.solicitud
					solicitud.id = undefined
					solicitud.solicitudesProductos = solicitud.solicitudesProductos.map(function (producto) {
						producto.id = undefined
						producto.id_solicitud = undefined
						if (producto.detallesIngredientesProducto.length > 0) {
							producto.detallesIngredientesProducto = producto.detallesIngredientesProducto.map(function (ingrediente) {
								ingrediente.id = undefined
								ingrediente.id_detalle_solicitud_producto = undefined
								return ingrediente
							})
						}
						return producto
					})
					$scope.solicitud = solicitud
					$scope.solicitud.copia = true
					$scope.solicitud.sucursal = $scope.solicitud.almacen.sucursal
					$scope.obtenerAlmacenes($scope.solicitud.sucursal.id)
					$scope.solicitud.almacen = $scope.solicitud.almacen
					$scope.obtenerInventariosProdSolicitud()
					$scope.abrirDialogPanelOperaciones('verOeditar')
				})
			}


			$scope.abrirDialogPanelOperaciones = function (key) {
				$scope.mostrardatosFormulacion = false;
				$scope.resaltado = false;
				$scope.fechaNoValida = false;
				// angular.element(document.querySelector('body')).css('overflow','hidden');
				$("form").bind("keydown", function (e) {
					if (e.keyCode === 13) return false;
				});
				switch (key) {
					case 'nuevo':
						$scope.solicitud = {}
						$scope.solicitud.estado = $scope.estadosSolicitudReposicion.clases.find(function (x) {
							return x.nombre_corto == 'PENDIENTE'
						})
						$scope.solicitud.fecha = new Date().toLocaleDateString()
						$scope.solicitud.activo = true
						$scope.solicitud.usar_configuracion_iso = $scope.usuario.empresa.usar_configuracion_iso;
						break;
					case 'verOeditar':
						$scope.solicitud.usar_configuracion_iso = $scope.usuario.empresa.usar_configuracion_iso;
						if ($scope.solicitud.id === undefined) {
							$scope.productoSeleccionado = undefined
							$scope.solicitud.fecha = new Date().toLocaleDateString()
						} else {
							if ($scope.solicitud.copia === undefined) {
								$scope.solicitud.fecha = new Date($scope.solicitud.fecha).toLocaleDateString()
								if ($scope.solicitud.modificar) {

								} else {
									$scope.solicitud.nueva = true
								}

							} else {
								$scope.solicitud.id = undefined
								$scope.solicitud.fecha = new Date().toLocaleDateString()
								$scope.solicitud.activo = true
							}
						}
						break;

					default:
						break;
				}

				$scope.obtenerGruposProductoEmpresa();
				$scope.abrirPopup($scope.idDialogDialogPanelOperaciones);

			}

			$scope.cerrarPopupPanel = function () {
				angular.element(document.querySelector('body')).css('overflow', 'scroll');
				if ($scope.solicitud !== undefined) {
					$scope.solicitud.copia = undefined
					$scope.solicitud = undefined
				}
				$scope.productoSeleccionado = undefined
				// $scope.recargarItemsTabla()
				$scope.productosProcesados = [];
				$scope.deshabilitarAlmacen = false;
				$scope.cerrarPopup($scope.idDialogDialogPanelOperaciones);
			}

			$scope.dynamicPopoverGrupos = {
				templateUrl: 'myPopoverTemplateGrupos.html',
			};

			$scope.abriridDialogoListadoPedido = function () {
				$scope.pedido = { fecha: $scope.fechaATexto(new Date()) }
				$scope.abrirPopup($scope.idDialogoListadoPedido);
			}
			$scope.obtenerFormasEntregaPedido = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("FORMASENTREGAP", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.formasEntrega = entidad
					blockUI.stop();
				});
			}
			$scope.cerraridDialogoListadoPedido = function () {
				$scope.detallesPedido = []
				$scope.pedido = {}
				$scope.detallePedido = {}
				$scope.solicitudesPedido = []
				$scope.cerrarPopup($scope.idDialogoListadoPedido);
			}

			$scope.verificarPulso = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarProductos(1);
				}
			}

			$scope.verificarPulsoAsignados = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarProductosAsignados(1);
				}
			}
			$scope.abrirDialogDatos = function () {
				$scope.abrirPopup($scope.idDialogDatos);
			}

			$scope.cerrarDialogDatos = function () {
				$scope.cerrarPopup($scope.idDialogDatos);
			}
			$scope.abrirDialogEntregaViveres = function () {
				$scope.abrirPopup($scope.idDialogEntregaViveres);
			}

			$scope.cerrarDialogEntregaViveres = function () {
				$scope.cerrarPopup($scope.idDialogEntregaViveres);
			}
			$scope.abrirDialogConfirmacionCierre = function () {
				$scope.abrirPopup($scope.idConfirmacionCierre);
			}
			$scope.cerrarDialogConfirmacionCierre = function () {
				$scope.cerrarPopup($scope.idConfirmacionCierre);
			}

			$scope.abrirDialogTotalIngredientes = function () {
				$scope.abrirPopup($scope.idDialogTotalIngredientes);
			}
			$scope.cerrarDialogTotalIngredientes = function () {
				$scope.alreadyCalculated = false
				$scope.cerrarPopup($scope.idDialogTotalIngredientes);
			}

			$scope.generarPdfSolicitud = function (solicitud) {
				var promesa = OptenerDatosSolicitudAlm(solicitud.id, solicitud.id_almacen)
				promesa.then(function (dato) {
					$scope.calcularTotalViveres(dato.solicitud, true)
					var doc = new PDFDocument({ size: [612, 792], margin: 10, compress: false });
					var stream = doc.pipe(blobStream());
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.font('Helvetica', 8);
					var y = 115, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.totalViveresSolicitados.productos.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas, dato.solicitud);

					for (var i = 0; i < $scope.totalViveresSolicitados.productos.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 8);
						doc.text(i + 1, 65, y);
						doc.text($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.codigo, 100, y);
						doc.text($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.nombre, 220, y);
						doc.text($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.unidad_medida, 400, y);
						doc.text($scope.totalViveresSolicitados.productos[i].total.toFixed(2), 500, y);
						y = y + 20;
						items++;
						if (items > itemsPorPagina) {
							doc.rect(40, 105, 540, y - 115).stroke();
							doc.text(pagina + "/" + totalPaginas, 570, y + 15);
							doc.font('Helvetica', 6);
							doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
							doc.text("SOLICITANTE: " + $scope.totalViveresSolicitados.usuario.persona.nombre_completo, 345, y + 10);
							doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
							doc.addPage({ size: [612, 792], margin: 10 });
							y = 115;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas, dato.solicitud);
						}
					}
					doc.rect(40, 105, 540, y - 115).stroke();
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.text(pagina + "/" + totalPaginas, 570, y + 15);
					doc.font('Helvetica', 6);
					doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 5);
					doc.text("SOLICITANTE: " + $scope.totalViveresSolicitados.usuario.persona.nombre_completo, 345, y + 5);
					doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 5);
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
				});
			}

			$scope.dibujarCabeceraPDFSolicitud = function (doc, pagina, totalPaginas, dato) {
				doc.font('Helvetica-Bold', 12);
				doc.text("CONSUMOS", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("SUCURSAL: ", 40, 50);
				doc.font('Helvetica', 8);
				doc.text(dato.almacen.sucursal.nombre, 90, 50);
				doc.font('Helvetica-Bold', 8);
				doc.text("ALMACÉN: ", 40, 65);
				doc.font('Helvetica', 8);
				doc.text(dato.almacen.nombre, 85, 65);
				doc.font('Helvetica-Bold', 8);
				doc.text("ÁREA: ", 250, 50);
				doc.font('Helvetica', 8);
				doc.text(dato.area ? dato.area.nombre : '', 280, 50);
				doc.font('Helvetica-Bold', 8);
				doc.text("FECHA: ", 250, 65);
				doc.font('Helvetica', 8);
				doc.text($scope.fechaATexto(dato.fecha), 285, 65);
				doc.font('Helvetica-Bold', 14);
				doc.text("N°", 520, 50);
				doc.text(dato.numero_correlativo, 540, 50);
				doc.rect(40, 80, 540, 25).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Nº", 65, 90);
				doc.text("Código Ítem", 100, 90);
				doc.text("Producto", 220, 90);
				doc.text("Unidad medida", 380, 90);
				doc.text("Cantidad solicitada", 480, 90);
			}

			$scope.generarPdfSolicitudValuado = function (solicitud) {
				blockUI.start();
				var promesa = ObtenerSolicitudAlmValuado(solicitud.id)
				promesa.then(function (dato) {
					$scope.productosValuados = dato.solicitud.movimiento.detallesMovimiento;
					var doc = new PDFDocument({ size: [612, 792], margin: 10, compress: false });
					var stream = doc.pipe(blobStream());
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.font('Helvetica', 8);
					var y = 115, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.productosValuados.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFSolicitudValuado(doc, dato.solicitud);
					let total = 0
					for (var i = 0; i < $scope.productosValuados.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 8);
						doc.text(i + 1, 50, y);
						doc.text($scope.productosValuados[i].producto.codigo, 80, y);
						doc.text($scope.productosValuados[i].producto.nombre, 145, y, { width: 160 });
						doc.text($scope.productosValuados[i].producto.unidad_medida, 330, y);
						doc.text($scope.productosValuados[i].cantidad.toFixed(2), 405, y, {align: "right", width: 35});
						doc.text(($scope.productosValuados[i].costo_unitario*0.87).toFixed(4), 475, y, {align: "right", width: 45});
						doc.text(($scope.productosValuados[i].total*0.87).toFixed(2), 530, y, {align: "right", width: 40});
						total +=($scope.productosValuados[i].total*0.87)
						y = y + 20;
						items++;
						if (items > itemsPorPagina) {
							doc.rect(40, 105, 540, y - 115).stroke();
							doc.text(pagina + "/" + totalPaginas, 570, y + 15);
							doc.font('Helvetica', 6);
							doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
							doc.text("SOLICITANTE: " + dato.solicitud.usuario.persona.nombre_completo, 345, y + 10);
							doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
							doc.addPage({ size: [612, 792], margin: 10 });
							y = 115;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFSolicitudValuado(doc, dato.solicitud);
						}
					}
					doc.text('Total', 475, y+5);
					doc.text(total.toFixed(2), 530, y+5, {align: "right", width: 40});
					doc.rect(40, 105, 540, y - 105).stroke();
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.text(pagina + "/" + totalPaginas, 570, y + 15);
					doc.font('Helvetica', 6);
					doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
					doc.text("SOLICITANTE: " + dato.solicitud.usuario.persona.nombre_completo, 345, y + 10);
					doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
				});
			}

			$scope.dibujarCabeceraPDFSolicitudValuado = function (doc, solicitud) {
				doc.font('Helvetica-Bold', 12);
				doc.text("CONSUMOS", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("SUCURSAL : ", -40, 50, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text(solicitud.almacen.sucursal.nombre, 60, 50, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("FECHA : ", 40, 60, { width: 40 });
				doc.font('Helvetica', 8);
				doc.text($scope.fechaATexto(solicitud.fecha), 75, 60, { width: 45 });
				doc.font('Helvetica-Bold', 14);
				doc.text("N°", 380, 40, { align: "center" });
				doc.text(solicitud.numero_correlativo, 440, 40, { align: "center" });
				doc.rect(40, 80, 540, 25).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Nº", 50, 90);
				doc.text("Código Ítem", 80, 90);
				doc.text("Producto", 145, 90);
				doc.text("Unidad medida", 310, 90);
				doc.text("Cantidad solicitada", 385, 90);
				doc.text("Costo Un.", 475, 90,{ align: "center", width: 40});
				doc.text("Total", 530, 90,{ align: "center", width: 45 });
			}

			$scope.excelSolicitudAlmacen1 = function (solicitud) {

				blockUI.start();
				var promesa = OptenerDatosSolicitudAlm(solicitud.id, solicitud.id_almacen)
				promesa.then(function (dato) {
					$scope.calcularTotalViveres(dato.solicitud, true)
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					var data = [["", "SUCURSAL : " + $scope.totalViveresSolicitados.sucursal.nombre, "SOLICITANTE: " + $scope.totalViveresSolicitados.usuario.persona.nombre_completo, "FECHA : " + $scope.fechaATexto($scope.totalViveresSolicitados.fecha)], [""], ["N°", "Código Ítem", "Producto", "Unidad medida", "Cantidad solicitada"]];
					for (var i = 0; i < $scope.totalViveresSolicitados.productos.length; i++) {
						var columns = [];
						columns.push((i + 1));
						columns.push($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.codigo);
						columns.push($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.nombre);
						columns.push($scope.totalViveresSolicitados.productos[i].productoSolicitudBase.unidad_medida);
						columns.push($scope.totalViveresSolicitados.productos[i].total.toFixed(2));
						data.push(columns);

					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					var wscols = [
						{ wch: 10 },
						{ wch: 25 },
						{ wch: 50 },
						{ wch: 15 },
						{ wch: 15 },
					];
					ws['!cols'] = wscols;

					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "almacenes-" + $scope.totalViveresSolicitados.sucursal.nombre + ".xlsx");
					blockUI.stop();
				});

			}


			$scope.excelSolicitudAlmacen = function (solicitud) {

				blockUI.start();
				var promesa = ObtenerSolicitudAlmValuado(solicitud.id)
				promesa.then(function (dato) {
					$scope.productosValuados = dato.solicitud.movimiento.detallesMovimiento;
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					var data = [["", "SUCURSAL : " + dato.solicitud.almacen.sucursal.nombre, "SOLICITANTE: " + dato.solicitud.usuario.persona.nombre_completo, "FECHA : " + $scope.fechaATexto(dato.solicitud.fecha)], [""], ["N°", "Código Ítem", "Producto", "Unidad medida", "Cantidad solicitada", "C/U", "Total"]];
					for (var i = 0; i < $scope.productosValuados.length; i++) {
						var columns = [];
						columns.push((i + 1));
						columns.push($scope.productosValuados[i].producto.codigo);
						columns.push($scope.productosValuados[i].producto.nombre);
						columns.push($scope.productosValuados[i].producto.unidad_medida);
						columns.push($scope.productosValuados[i].cantidad.toFixed(2));
						let costo = $scope.productosValuados[i].costo_unitario * 0.87
						columns.push(costo.toFixed(4));
						let total = $scope.productosValuados[i].total * 0.87
						columns.push(total.toFixed(2));
						data.push(columns);

					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					var wscols = [
						{ wch: 10 },
						{ wch: 25 },
						{ wch: 50 },
						{ wch: 15 },
						{ wch: 15 },
					];
					ws['!cols'] = wscols;

					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "almacenes-" + dato.solicitud.almacen.sucursal.nombre + ".xlsx");
					blockUI.stop();
				});

			}
			$scope.crearDetalleOrdenReposicion = function (detallesOrdenReposicion, cantidad, producto, detalleSolicitud, detalleIngrediente) {

				detalleOrdenReposicion = {
					detallesSolicitudProductos: detalleSolicitud.ids, observado: false,
					detallesSolicitudProductosBase: '',
					observacion_revisor: "",
					observacion: "",
					cantidad: cantidad,
					extra: 0,
					eliminado: false,
					producto: producto
				}

				detallesOrdenReposicion.push(detalleOrdenReposicion)

				return detallesOrdenReposicion
			}

			$scope.calcularViveresOrdenReposicionDesdeFiltro = async function () {
				if( $scope.ordenReposicion.fecha_consumo && $scope.ordenReposicion.sucursal && $scope.ordenReposicion.almacen ){
					let fechaConsumo2 = new Date($scope.convertirFecha($scope.ordenReposicion.fecha_consumo))
					var dato = await ListaCompletaSolicitudesReposicion( $scope.ordenReposicion, fechaConsumo2 )
					if(dato.error) return []
					var solicitudesOperaciones = dato.solicitudes

					var stored = await solicitudesOperaciones.reduce(function (detallesOrdenReposicion, solicitud) {
						var activo = true
						var detalleOrdenReposicion = {}
						if (!solicitud.activo) {
							for (var i = 0; i < solicitud.solicitudesProductos.length; i++) {
								var detalleSolicitud = solicitud.solicitudesProductos[i];
								$scope.detalleSolicitudErr = solicitud.solicitudesProductos[i];
								if (detalleSolicitud.productoSolicitado.tipoProducto.nombre_corto !== $scope.diccionario.TIPO_PRODUCTO_BASE) {
									$scope.mostrarMensaje("es producto final", detalleSolicitud.productoSolicitado.nombre)
									for (const detalleProductoBase of detalleSolicitud.detallesIngredientesProducto) {
										if (!detalleProductoBase.id_detalle_orden_reposicion) {
											activo = false
											detallesOrdenReposicion = $scope.crearDetalleOrdenReposicion(detallesOrdenReposicion, detalleProductoBase.cantidad_real, detalleProductoBase.productoSolicitudBase, null, detalleProductoBase)
										}
									}
								} else if (!detalleSolicitud.id_detalle_orden_reposicion) {
									activo = false
									detallesOrdenReposicion = $scope.crearDetalleOrdenReposicion(detallesOrdenReposicion, detalleSolicitud.cantidad, detalleSolicitud.productoSolicitado, detalleSolicitud, null)
								}

							}
						}

						return detallesOrdenReposicion; // *********  Important ******
					}, []);
					return stored
				}
			}
			$scope.calcularViveresDesdeFiltro = async function (UnDatoPorProducto) {
				var detallesSolicitudes = []
				$scope.totalViveresSolicitados = {}
				$scope.solicitudesPedido = []
				var dato = await ListaCompletaSolicitudesReposicion($scope.pedido)
				if (dato.hasErr) return alert(dato.mensaje)
				var solicitudesOperaciones = dato.solicitudes
				solicitudesOperaciones.forEach(function (solicitud, i) {
					if ((!solicitud.activo && UnDatoPorProducto === undefined)) {
						var desdd = $scope.calcularTotalViveres(solicitud, true)
						detallesSolicitudes.push(desdd)
					} else if (UnDatoPorProducto && !solicitud.id_pedido) {
						$scope.solicitudesPedido.push(solicitud.id)
						var desdd = $scope.calcularTotalViveres(solicitud, true)
						detallesSolicitudes.push(desdd)
					}
				})
				var productosParaSerProcesados = []
				detallesSolicitudes.forEach(function (productoParaProcesar) {
					productoParaProcesar.productos.forEach(function (producto) {
						var productoSinProcesado = {
							almacen: producto.almacen,
							sucursal: producto.almacen.sucursal,
							cantidad: producto.cantidad_real,
							fecha: productoParaProcesar.fecha,
							hora_fecha: productoParaProcesar.fecha,
							usuario: productoParaProcesar.usuario,
							estado: producto.estado,
							producto: producto.productoSolicitudBase,
							costo: (producto.productoSolicitudBase.inventarios ? producto.productoSolicitudBase.inventarios.length ? producto.productoSolicitudBase.inventarios[0].costo_unitario : 0 : 0),
							grupo: producto.productoSolicitudBase.grupo,
							subgrupo: producto.productoSolicitudBase.subgrupo,
							total: (producto.productoSolicitudBase.inventarios ? producto.productoSolicitudBase.inventarios.length ? producto.productoSolicitudBase.inventarios[0].costo_unitario : 0 : 0) * producto.cantidad_real,
							monto: producto.monto,
							solicitud: producto.solicitud,
							numero_correlativo: productoParaProcesar.identificador,
							area: producto.area && producto.area || null
						}
						productosParaSerProcesados.push(productoSinProcesado)
					})
				})
				if (UnDatoPorProducto) {
					var productosReporteDetalle = []
					while (productosParaSerProcesados.length > 0) {
						var dato = productosParaSerProcesados.pop()
						if (productosReporteDetalle.length === 0) {
							productosReporteDetalle.push(dato)
						} else {
							var encontrado = false
							var indx
							productosReporteDetalle.forEach(function (producto, i) {
								if (producto.producto.id == dato.producto.id && !encontrado) {
									encontrado = true
									indx = i
								}
							})
							if (encontrado && indx !== undefined) {
								productosReporteDetalle[indx].cantidad += dato.cantidad
								productosReporteDetalle[indx].total = productosReporteDetalle[indx].cantidad * productosReporteDetalle[indx].costo
							} else {
								productosReporteDetalle.push(dato)
							}
						}
					}
					return productosReporteDetalle
				} else {
					return productosParaSerProcesados
				}
			}
			/*
						$scope.reporteExcel = async function (pdf) {
							blockUI.start()
							$scope.pedido = { grupo: 0, almacen: $scope.filtro.almacen ? $scope.filtro.almacen : { id: 0 } }
							if ($scope.filtro.detalle) {
								var cabecera = ["Nro.", "Doc.", "Sucursal", "Almacén", "Hora-fecha", "Usuario", "Estado", "Detalle", "Unidad", "Grupo", "Subgrupo", "Cantidad", "Costo", "Total", 'Area']
								var data = []
								data.push(cabecera)
								const reporteEx = await $scope.calcularViveresOrdenReposicionDesdeFiltro()
								var columns = [];
								for (var i = 0; i < reporteEx.length; i++) {
									columns = [];
									columns.push(i + 1);
									columns.push(reporteEx[i].numero_correlativo);
									columns.push(reporteEx[i].almacen.sucursal.nombre);
									columns.push(reporteEx[i].almacen.nombre);
									// columns.push(new Date(reporteEx[i].fecha).toLocaleDateString());
									columns.push(new Date(reporteEx[i].fecha).toLocaleTimeString() + ' ' + new Date(reporteEx[i].fecha).toLocaleDateString());
									columns.push(reporteEx[i].usuario.nombre_usuario);
									columns.push((reporteEx[i].estado ? 'Abierto' : 'Cerrado'));
									columns.push(reporteEx[i].producto.nombre);
									columns.push(reporteEx[i].producto.unidad_medida);
									columns.push(reporteEx[i].grupo.nombre);
									columns.push(reporteEx[i].subgrupo.nombre);
									columns.push(reporteEx[i].cantidad);
									columns.push(reporteEx[i].costo);
									columns.push(reporteEx[i].total.toFixed(2));
									columns.push(reporteEx[i].area && reporteEx[i].area || '');
									data.push(columns);
								}
								blockUI.stop();
							} else {
								var cabecera = ["Nro.", "Doc.", "Sucursal", "Hora-fecha", "Monto", "Usuario", "Estado"]
								var data = []
								data.push(cabecera)
								var columns = [];
								for (var i = 0; i < $scope.solicitudesOperaciones.length; i++) {
									columns = [];
									columns.push(i + 1);
									columns.push($scope.solicitudesOperaciones[i].numero_correlativo);
									columns.push($scope.solicitudesOperaciones[i].almacen.sucursal.nombre);
									columns.push(new Date($scope.solicitudesOperaciones[i].fecha).toLocaleTimeString() + ' ' + new Date($scope.solicitudesOperaciones[i].fecha).toLocaleDateString());
									columns.push($scope.solicitudesOperaciones[i].monto);
									columns.push($scope.solicitudesOperaciones[i].usuario.nombre_usuario);
									columns.push(($scope.solicitudesOperaciones[i].activo ? 'Abierto' : 'Cerrado'));
									data.push(columns);
								}
								blockUI.stop();
							}
							if (pdf) {
								$scope.reportePdf(data)
								blockUI.stop();
							} else {
								var ws_name = "SheetJS";
								var wb = new Workbook()
								var ws = sheet_from_array_of_arrays(data);
								var wscols = [
									{ wch: 5 },
									{ wch: 18 },
									{ wch: 18 },
									{ wch: 12 },
									{ wch: 15 },
									{ wch: 15 },
									{ wch: 12 },
									{ wch: 25 },
									{ wch: 12 },
									{ wch: 12 },
									{ wch: 12 }
								];
								ws['!cols'] = wscols;
								ws['!rows'] = [{ hpx: 28, level: 3 }]
								wb.SheetNames.push(ws_name);
								wb.Sheets[ws_name] = ws;
								var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
								saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE OPERACIONES.xlsx");
								blockUI.stop();
								$scope.pedido = {}
							}
							$scope.$evalAsync()
						}
			
						$scope.reportePdf = function (reporte) {
							if ($scope.filtro.detalle) {
								var doc = new PDFDocument({ size: 'letter', layout: 'landscape', margin: 10, compress: false }); //[612, 792]
								var x = 65, y = 115, itemsPorPagina = 22, items = 0, pagina = 1, totalPaginas = Math.ceil(reporte.length / itemsPorPagina);
							} else {
								var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]	
								var x = 65, y = 115, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(reporte.length / itemsPorPagina);
							}
			
							var stream = doc.pipe(blobStream());
							var fechaActual = new Date();
							var min = fechaActual.getMinutes();
							if (min < 10) {
								min = "0" + min;
							}
							$scope.posXforPdf = []
							doc.font('Helvetica', 8);
			
							$scope.dibujarCabeceraReportePdf(doc, reporte)
							if ($scope.filtro.detalle) {
								x = 50
								for (var i = 0; i < reporte.length && items <= itemsPorPagina; i++) {
									var px = x
									doc.font('Helvetica', 8);
									if (i > 0) {
										for (var j = 0; j < reporte[i].length; j++) {
											if (j == 7) {
												var data = reporte[i][j].length > 15 ? reporte[i][j].substr(0, 15) + "..." : reporte[i][j]
												doc.font('Helvetica', 7);
												doc.text(data, px, y, { width: 60 }, { align: "center" });
											} else if (j == 8) {
												doc.font('Helvetica', 8);
												doc.text(reporte[i][j], px + 10, y, { width: 60 }, { align: "center" });
											} else {
												doc.font('Helvetica', 8);
												doc.text(reporte[i][j], px, y, { width: 60 }, { align: "center" });
											}
											if (j == 0) {
												px = $scope.posXforPdf[j]
											} else {
												px = $scope.posXforPdf[j]
											}
										}
										y = y + 20;
										items++;
									}
									if (items > itemsPorPagina) {
										doc.rect(40, 105, 710, y - 115).stroke();
										doc.text(pagina + "/" + totalPaginas, 570, y + 15);
										doc.font('Helvetica', 6);
										// doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
										// doc.text("SOLICITANTE: " + $scope.reporte.usuario.persona.nombre_completo, 345, y + 10);
										doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
										if ($scope.filtro.detalle) {
			
											doc.addPage({ size: 'letter', layout: 'landscape', margin: 10, compress: false });
										} else {
											doc.addPage({ size: 'letter', margin: 10, compress: false });
										}
										y = 115;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraReportePdf(doc, reporte)
									}
								}
								doc.rect(40, 105, 710, 650).stroke();
							} else {
								for (var i = 0; i < reporte.length && items <= itemsPorPagina; i++) {
									var px = x
									doc.font('Helvetica', 8);
									if (i > 0) {
										for (var j = 0; j < reporte[i].length; j++) {
			
											doc.text(reporte[i][j], px, y, { width: 60 });
											if (j == 0) {
												px = $scope.posXforPdf[j]
											} else {
												px = $scope.posXforPdf[j]
											}
										}
										y = y + 20;
										items++;
									}
									if (items > itemsPorPagina) {
										doc.rect(40, 105, 540, y - 115).stroke();
										doc.text(pagina + "/" + totalPaginas, 570, y + 15);
										doc.font('Helvetica', 6);
										// doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
										// doc.text("SOLICITANTE: " + $scope.reporte.usuario.persona.nombre_completo, 345, y + 10);
										doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
										doc.addPage({ size: [612, 792], margin: 10 });
										y = 115;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraReportePdf(doc, reporte)
									}
								}
								doc.rect(40, 105, 540, 650).stroke();
							}
			
							var fechaActual = new Date();
							var min = fechaActual.getMinutes();
							if (min < 10) {
								min = "0" + min;
							}
							doc.text(pagina + "/" + totalPaginas, 570, 765);
							doc.font('Helvetica', 6);
							// doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 5);
							// doc.text("SOLICITANTE: " + $scope.totalViveresSolicitados.usuario.persona.nombre_completo, 345, y + 5);
							doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 765);
							doc.end();
							stream.on('finish', function () {
								var fileURL = stream.toBlobURL('application/pdf');
								window.open(fileURL, '_blank', 'location=no');
							});
							$scope.pedido = {}
							blockUI.stop();
						}
			
				*/
			$scope.selecionarConsumos = (value) => {
				for (const sol of $scope.solicitudesOperaciones) {
					sol.seleccinado = !sol.id_comprobante ? value : false
				}
			}
			$scope.obtenerProductos = function () {
				$scope.paginatorProductos = Paginator();
				$scope.paginatorProductos.column = "nombre";
				$scope.paginatorProductos.filter = $scope.grupo;
				$scope.paginatorProductos.callBack = $scope.buscarProductos;
				$scope.paginatorProductos.getSearch("", null, null);
			};

			$scope.modificarListaProductosProveedor = function (producto) {
				var indx = $scope.listaProductosProveedor.indexOf(producto.id);
				if (indx >= 0 && !producto.seleccionado) {
					$scope.listaProductosProveedor.splice(indx, 1);
				} else if (indx == -1 && producto.seleccionado) {
					$scope.listaProductosProveedor.push(producto.id);
				}
			};

			$scope.seleccionarTodosParaAsignar = function () {
				if ($scope.seleccionProductosProveedor.seleccionar_todos) {
					$scope.productosAsignacionProveedor.forEach(function (producto) {
						producto.seleccionado = true;
						$scope.modificarListaProductosProveedor(producto)
					});
				} else {
					$scope.productosAsignacionProveedor.forEach(function (producto) {
						producto.seleccionado = false;
						$scope.modificarListaProductosProveedor(producto)
					});

				}
			};
			$scope.seleccionarTodosAsignados = function () {
				$scope.listaProductosProveedorSeleccionados = []
				if ($scope.seleccionProductosProveedorAsignados.seleccionar_todos) {
					$scope.productosAsignadosProveedor.forEach(function (producto) {
						producto.seleccionado = true;
						$scope.productosProveedorSeleccionados.push(producto)
						$scope.modificarListaProductosProveedorSeleccionados(producto)
					});
				} else {
					$scope.productosAsignadosProveedor.forEach(function (producto) {
						producto.seleccionado = false;
						$scope.productosProveedorSeleccionados.push(producto)
						$scope.modificarListaProductosProveedorSeleccionados(producto)
					});
				}
			};
			$scope.modificarListaProductosProveedorSeleccionados = function (producto) {
				var indx = $scope.listaProductosProveedorSeleccionados.indexOf(producto.id);
				if (indx >= 0 && !producto.seleccionado) {
					$scope.listaProductosProveedorSeleccionados.splice(indx, 1);
				} else if (indx == -1 && producto.seleccionado) {
					$scope.listaProductosProveedorSeleccionados.push(producto.id);
				}
			};
			$scope.actualizarProductosProveedor = function () {
				var prom = ActualizarProductosProveedor($scope.usuario.id_empresa, $scope.listaProductosProveedor, $scope.pedido.proveedor);
				prom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje);
					} else {
						$scope.mostrarMensaje(res.mensaje);
						$scope.cerrarModalProductosProveedor()
					}
				}).catch(function (err) {
					blockUI.stop();
					var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
					$scope.mostrarMensaje(memo);
				})
			};

			$scope.buscarProductos = function (pagina) {
				blockUI.start();
				if (pagina) {
					$scope.paginatorProductos.currentPage = pagina;
				}
				$scope.paginatorProductos.filter = $scope.configuracionPorveedor.grupo ? $scope.configuracionPorveedor.grupo : { id: 0 };
				$scope.paginatorProductos.search = $scope.configuracionPorveedor.textoBusqueda ? $scope.configuracionPorveedor.textoBusqueda : 0
				// var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginatorProductos, $scope.usuario.id); //por grupos
				var promesa = ProductosPaginadorSubgrupos($scope.usuario.id_empresa, $scope.paginatorProductos, $scope.usuario.id); ///por subgrupos
				promesa.then(function (dato) {
					if (dato.hasErr) {
						$scope.mostrarMensaje(dato.mensaje);
					} else {
						$scope.paginatorProductos.setPages(dato.paginas);
						$scope.productosAsignacionProveedor = dato.productos;
						if ($scope.pedido && $scope.pedido.proveedor) {
							var prom = ListaProductosProveedores($scope.usuario.id_empresa, $scope.pedido.proveedor);
							prom.then(function (res) {
								if (res.hasErr) {
									$scope.mostrarMensaje(res.mensaje);
									$scope.listaProductosProveedor = [];
								} else {
									if (res.productos) {
										var arr = res.productos.split(',');
										$scope.listaProductosProveedor = arr.map(function (id) {
											return parseInt(id);
										});
										$scope.verificarAsignacionProductosProveedor();
									} else {
										$scope.listaProductosProveedor = [];
									}
								}
								blockUI.stop();
							}).catch(function (err) {
								blockUI.stop();
								var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
								$scope.mostrarMensaje(memo);
							})
						}
					}
					blockUI.stop();
				}).catch(function (err) {
					blockUI.stop();
					var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
					$scope.mostrarMensaje(memo);
				});
			};

			$scope.obtenerProductosAsignados = function () {
				$scope.paginatorProductosAsignados = Paginator();
				$scope.paginatorProductosAsignados.column = "nombre";
				$scope.paginatorProductosAsignados.filter = $scope.grupo;
				$scope.paginatorProductosAsignados.callBack = $scope.buscarProductosAsignados;
				$scope.paginatorProductosAsignados.getSearch("", null, null);
			};

			$scope.buscarProductosAsignados = function (pagina, pedido) {
				blockUI.start();
				if (pagina) {
					$scope.paginatorProductosAsignados.currentPage = pagina;
				}
				if ($scope.pedido === undefined) {
					$scope.pedido = {};
					blockUI.stop();
				} else {
					if ($scope.pedido.proveedor) {
						$scope.paginatorProductosAsignados.filter = $scope.productosAsignadosPorveedor.grupo ? $scope.productosAsignadosPorveedor.grupo : { id: 0 };
						$scope.paginatorProductosAsignados.search = $scope.productosAsignadosPorveedor.textoBusqueda ? $scope.productosAsignadosPorveedor.textoBusqueda : 0
						var prom = ListaProductosProveedores($scope.usuario.id_empresa, $scope.pedido.proveedor);
						prom.then(function (res) {
							if (res.hasErr) {
								$scope.mostrarMensaje(res.mensaje);
								$scope.listaProductosProveedor = [];
							} else {
								if (res.productos) {
									var arr = res.productos.split(',');
									$scope.listaProductosProveedor = arr.map(function (id) {
										return parseInt(id);
									});
									var promesa = ProductosPaginadorAsignados($scope.usuario.id_empresa, $scope.paginatorProductosAsignados, $scope.usuario.id, $scope.listaProductosProveedor); ///por subgrupos
									promesa.then(function (dato) {
										if (dato.hasErr) {
											$scope.mostrarMensaje(dato.mensaje);
										} else {
											$scope.paginatorProductosAsignados.setPages(dato.paginas);
											$scope.productosAsignadosProveedor = dato.productos;
											$scope.listaProductosProveedorSeleccionados = []
											$scope.verificarSeleccionProductosProveedor()
										}
										blockUI.stop();
									}).catch(function (err) {
										blockUI.stop();
										var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
										$scope.mostrarMensaje(memo);
									});
								} else {
									$scope.listaProductosProveedor = [];
								}
							}
							blockUI.stop();
						}).catch(function (err) {
							blockUI.stop();
							var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
							$scope.mostrarMensaje(memo);
						})

					} else {
						$scope.mostrarMensaje('El proveedor no tiene productos asignados.')
					}
				}
			};

			$scope.verificarSeleccionProductosProveedor = function () {
				if ($scope.listaProductosProveedorSeleccionados.length > 0) {
					$scope.listaProductosProveedorSeleccionados.forEach(function (id) {
						$scope.productosProveedorSeleccionados.forEach(function (producto) {
							if (producto.id === id) {
								producto.seleccionado = true
							}
						})
					})
				}
			};

			$scope.filtrarProductosSeleccionadosPorGrupo = function () {
				if ($scope.detallesPedido.length > 0) {
					var productosPorGrupo = [];
					$scope.detallesPedido.forEach(function (prod) {
						if (prod.id_subgrupo === $scope.pedido.grupo) {
							productosPorGrupo.push(prod);
						}
					});
					if (productosPorGrupo.length > 0) {
						$scope.detallesPedido = productosPorGrupo.map(function (prod) {
							return prod;
						});
					} else {
						$scope.mostrarMensaje('No existen productos pertenecientes al grupo seleccionado. No se realizaron cambios.')
					}
				}
			}

			$scope.abrirmodalBusquedaProveedor = function () {
				$scope.filtrarProveedores("");
				$scope.abrirPopup($scope.idDialogBusquedaProveedor);
			};

			$scope.cerrarModalBusquedaProveedor = function () {
				$scope.cerrarPopup($scope.idDialogBusquedaProveedor);
			};

			$scope.abrirmodalProductosAsignadosProveedor = function () {
				if ($scope.pedido === undefined) {
					$scope.pedido = { por_proveedor: false };
				}
				if ($scope.productosProveedorSeleccionados === undefined || $scope.productosProveedorSeleccionados === null) {
					$scope.productosProveedorSeleccionados = []
				}
				if ($scope.pedido.proveedor) {
					$scope.buscarProductosAsignados();
					$scope.abrirPopup($scope.idDialogProductosAsigandosProveedor);
				} else {
					$scope.mostrarMensaje('Seleccione un proveedor.');
				}
			};

			$scope.cerrarModalProductosAsignadosProveedor = function () {
				$scope.cerrarPopup($scope.idDialogProductosAsigandosProveedor);
			};

			$scope.cerrarModalProductosProveedor = function () {
				$scope.productosAsignacionProveedor = [];
				$scope.listaProductosProveedor = [];
				$scope.cerrarPopup($scope.idDialogProductosProveedor);
			};

			$scope.abrirModalNuevoPedido = function () {
				$scope.abrirPopup($scope.idDialogoNuevoPedido);
			}

			$scope.cerrarModalNuevoPedido = function () {
				$scope.detallesPedido = []
				$scope.pedido = {}
				$scope.detallePedido = {}
				$scope.solicitudesPedido = []
				$scope.cerrarPopup($scope.idDialogoNuevoPedido);
			}

			$scope.eliminarDetallePedido = function (detalle) {
				if (detalle.id) {
					detalle.eliminar = true
				} else {
					$scope.detallesPedido.splice($scope.detallesPedido.indexOf(detalle), 1);
				}
			}
			$scope.EliminarDetalleOrdenReposicion = function (detalle) {
				if (detalle.id) {
					detalle.eliminado = true
				} else {
					$scope.ordenReposicion.detallesOrdenReposicion.splice($scope.ordenReposicion.detallesOrdenReposicion.indexOf(detalle), 1);


				}
			}
			$scope.definirSinReposicion = (detalle) => {
				detalle.noReponer = true
				detalle.extra = detalle.cantidad * -1;
				$scope.calcularCantidadTotalExtra(detalle);
			}
			$scope.eliminarDetalleDeReposicion = function (detalle) {
				detalle.eliminarReposicion = (detalle.eliminarReposicion == true) ? false : true
			}
			$scope.guardarPedido = async function (pedido) {
				blockUI.start();
				if (pedido !== undefined && $scope.detallesPedido.length > 0) {
					var fortime = new Date();
					var dateSplit = pedido.fecha.split('/').reverse();
					/* var sendPedido = {
						fecha: new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2], fortime.getHours(), fortime.getMinutes()),
						sucursal: pedido.sucursal,
						almacen: pedido.almacen,
						proveedor: pedido.proveedor.id,
						observacion: pedido.observacion,
						grupo: (pedido.grupo !== undefined ? pedido.grupo !== null ? pedido.grupo : 0 : 0),
						detallesPedido: $scope.detallesPedido,
						usuario: $scope.usuario.id
					}; */
					$scope.pedido.estado = $scope.estadosPedido.clases.find(function (x) {
						return x.nombre_corto == "PENDIENTE"
					})
					$scope.pedido.detallesPedido = $scope.detallesPedido
					$scope.pedido.fecha = new Date($scope.convertirFecha($scope.pedido.fecha));
					$scope.pedido.fecha_recepcion = new Date($scope.convertirFecha($scope.pedido.fecha_recepcion));
					var q = await ObtenerConfiguracionIso(pedido.almacen.id_sucursal)
					if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "ORDENCOMPRA" && cfg.activo == true);
					if ($scope.usuario.empresa.usar_configuracion_iso && q.length == 1) {
						$scope.pedido.configuracionesIso = q[0];
						$scope.pedido.config_doc_iso = q[0].id;
						$scope.pedido.usar_configuracion_iso = $scope.usuario.empresa.usar_configuracion_iso;
					} else {
						$scope.pedido.configuracionesIso = undefined;
						$scope.pedido.config_doc_iso = undefined;
						$scope.pedido.usar_configuracion_iso = $scope.usuario.empresa.usar_configuracion_iso;
					}
					var prom = GuardarPedido($scope.usuario.id_empresa, $scope.pedido, $scope.usuario.id);
					prom.then(function (res) {
						if (res.hasErr) {
							SweetAlert.swal("", res.mensaje, "success");
						} else {
							SweetAlert.swal("", res.mensaje, "success");
							$scope.recargarItemsTabla();
							if (res.id_pedido) {
								$scope.pedido.configuracionesIso != undefined ? $scope.pedido.configuracionesIso.predefinido ? $scope.imprimirIsoOrdenCompra(res.id_pedido, $scope.pedido.configuracionesIso.version_impresion) : $scope.generarPdfSolicitud(res.id_pedido) : $scope.generarPdfSolicitud(res.id_pedido);
							}
						}
						blockUI.stop();
					}).catch(function (err) {
						blockUI.stop();
						var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
						$scope.mostrarMensaje(msg);
					})
				} else {
					if ($scope.detallesPedido.length > 0) {
						$scope.mostrarMensaje('Existe un problema con los datos del pedido, no se puede generar!');
					} else {
						$scope.mostrarMensaje('Existe un problema con los datos del pedido, no se puede generar sin lista de productos!');
					}
					blockUI.stop();
				}
			};


			$scope.mensaje = function () {

				if ($scope.pedido.por_proveedor == false) {
					$scope.generarPedido()
					//$scope.mostrarMensaje("Mostrar mensaje");
				}
			}
			$scope.obtenerEstadoSolicitudReposicion = function () {
				if ($scope.estadosOrdenReposicion) {
					var promesa = ClasesTipo('GESTION_ESR')
					promesa.then(function (dato) {
						$scope.estadosSolicitudReposicion = dato
					})
				}
			}
			$scope.obtenerEstadoPedidos = function () {
				var promesa = ClasesTipo('ESTMODPED')
				promesa.then(function (dato) {
					$scope.estadosPedido = dato
				})
			}
			// INICIO ORDEN DE REPOSICION
			$scope.obtenerEstadoOrdenReposicion = function () {
				var promesa = ClasesTipo('GESTION_EOR')
				promesa.then(function (dato) {
					$scope.estadosOrdenReposicion = dato
				})
			}
			$scope.abrirModalOrdenReposicion = function () {
				$scope.obtenerEstadoOrdenReposicion()
				$scope.obtenerDatosOrdenReposicion()
				$scope.abrirPopup($scope.idDialogOrdenReposicion);
			}
			$scope.cerrarModalOrdenReposicion = function () {
				$scope.cerrarPopup($scope.idDialogOrdenReposicion);
			};
			$scope.abrirModalNuevaOrdenReposicion = function () {
				$scope.abrirPopup($scope.idDialogNuevaOrdenReposicion);
			}
			$scope.cerrarModalNuevaOrdenReposicion = function () {
				$scope.cerrarPopup($scope.idDialogNuevaOrdenReposicion);
			};
			$scope.abrirModalEliminarOrdenReposicion = function () {
				$scope.abrirPopup($scope.idDialogEliminarOrdenReposicion);
			}
			$scope.cerrarModalEliminarOrdenReposicion = function () {
				$scope.cerrarPopup($scope.idDialogEliminarOrdenReposicion);
			};
			$scope.abrirModalCerrarOrdenReposicion = function () {
				$scope.abrirPopup($scope.idDialogCerrarOrdenReposicion);
			}
			$scope.cerrarModalCerrarOrdenReposicion = function () {
				$scope.cerrarPopup($scope.idDialogCerrarOrdenReposicion);
			};
			$scope.abrirModalSincronizacion = function () {
				console.log("aqui")
				$scope.abrirPopup($scope.idDialogSincronizacionDatos);
			}
			$scope.cerrarModalSincronizacion = function () {
				$scope.cerrarPopup($scope.idDialogSincronizacionDatos);
			};
			$scope.AccionesOrdenReposicion = function (key, dato) {
				$scope.searchOrdenRepo = {}
				$scope.colSpanOrdenRepo = 12
				switch (key) {
					case 'nuevo':
						var estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
							return x.nombre_corto === 'PENDIENTE'
						})
						$scope.ordenReposicion = { detallesOrdenReposicion: [], nuevo: true, id_estado: estado.id, fecha_inicio: null, usar_observacion: false, indice_rotacion: 2.5, almacen: {} }
						$scope.ordenReposicion.maximos = true
						$scope.abrirModalNuevaOrdenReposicion();
						break;
					case 'ver':
						var promesa = DatosOrdenRepo(dato.id)
						promesa.then(function (data) {
							$scope.ordenReposicion = data.ordenReposicion
							$scope.ordenReposicion.maximos = true
							$scope.ordenReposicion.detallesOrdenReposicion = data.detalles
							$scope.ordenReposicion.fecha_consumo = $scope.fechaATexto($scope.ordenReposicion.fecha_consumo)
							$scope.ordenReposicion.sucursal = { id: $scope.ordenReposicion.almacen.id_sucursal }
							$scope.obtenerAlmacenes($scope.ordenReposicion.almacen.id_sucursal)
							$scope.enfocar('sucursal-pedido-repo')
							$scope.ordenReposicion.ver = true
							$scope.abrirModalNuevaOrdenReposicion()
						})

						break;
					case 'editar':
						var promesa = DatosOrdenRepo(dato.id)
						promesa.then(function (data) {
							$scope.ordenReposicion = data.ordenReposicion
							$scope.ordenReposicion.maximos = true
							$scope.ordenReposicion.detallesOrdenReposicion = data.detalles
							$scope.ordenReposicion.fecha_consumo = $scope.fechaATexto($scope.ordenReposicion.fecha_consumo)
							$scope.ordenReposicion.sucursal = { id: $scope.ordenReposicion.almacen.id_sucursal }
							$scope.obtenerAlmacenes($scope.ordenReposicion.almacen.id_sucursal)
							$scope.enfocar('sucursal-pedido-repo')
							$scope.ordenReposicion.edit = true
							$scope.abrirModalNuevaOrdenReposicion()

						})
						break;
					case 'revisar':
						var promesa = DatosOrdenRepo(dato.id)
						promesa.then(function (data) {
							$scope.ordenReposicion = data.ordenReposicion
							$scope.ordenReposicion.maximos = true
							$scope.ordenReposicion.detallesOrdenReposicion = data.detalles
							$scope.ordenReposicion.fecha_consumo = $scope.fechaATexto($scope.ordenReposicion.fecha_consumo)
							$scope.ordenReposicion.sucursal = { id: $scope.ordenReposicion.almacen.id_sucursal }
							$scope.obtenerAlmacenes($scope.ordenReposicion.almacen.id_sucursal)
							$scope.enfocar('sucursal-pedido-repo')
							$scope.ordenReposicion.revisar = true
							$scope.abrirModalNuevaOrdenReposicion()
							$scope.colSpanOrdenRepo = 14
						})
						break;
					case 'corregir':
						var promesa = DatosOrdenRepo(dato.id, 'correccion')
						promesa.then(function (data) {
							$scope.searchOrdenRepo.observado = true
							$scope.ordenReposicion = data.ordenReposicion
							$scope.ordenReposicion.maximos = true
							$scope.ordenReposicion.detallesOrdenReposicion = data.detalles
							$scope.ordenReposicion.fecha_consumo = $scope.fechaATexto($scope.ordenReposicion.fecha_consumo)
							$scope.ordenReposicion.sucursal = { id: $scope.ordenReposicion.almacen.id_sucursal }
							$scope.obtenerAlmacenes($scope.ordenReposicion.almacen.id_sucursal)
							$scope.enfocar('sucursal-pedido-repo')
							$scope.ordenReposicion.correccion = true
							$scope.abrirModalNuevaOrdenReposicion()
							$scope.colSpanOrdenRepo = 16
						})
						break;

					case 'cerrar':
						$scope.ordenReposicion = dato;
						SweetAlert.swal({
							html: `<h3 class="bolder">Confirme la Orden</h3><p>¿Está seguro de cerrar la orden de reposición?</p>`,
							icon: 'info',
							showCloseButton: true,
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#D33',
							confirmButtonText: 'Si',
							cancelButtonText: "No",
						}).then( result => {
							if(result.isConfirmed){
								$scope.cerrarOrdenReposicion();
							}
						})
						break;
					case 'eliminar':
						$scope.ordenReposicion = dato
						$scope.abrirModalEliminarOrdenReposicion()
						break;
					case 'imprimir':
						$scope.ordenReposicion = dato
						var promesa = DatosOrdenRepo(dato.id)
						promesa.then(function (data) {
							$scope.generarPdfOrdenReposicion(data.detalles)
						})
						break;

					case 'reporte-exel':
						$scope.ordenReposicion = dato
						var promesa = DatosOrdenRepo(dato.id)
						promesa.then(function (data) {
							$scope.generarExcelOrdenReposicion(data.detalles)
						})

						break;
					default:
						break;
				};



			};
			$scope.eliminarOrdenReposicion = function () {
				$scope.ordenReposicion.eliminado = true
				let estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
					return x.nombre_corto === 'ANULADO'
				})
				$scope.ordenReposicion.id_estado = estado.id
				var promesa = CrearActualizarOrdentrabajo($scope.usuario.id, $scope.ordenReposicion)
				promesa.then(function (dato) {
					SweetAlert.swal("", dato.mensaje, "success")
					$scope.cerrarModalNuevaOrdenReposicion()
				})
			}
			$scope.cerrarOrdenReposicion = async () => {
				var estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
					return x.nombre_corto === 'FINALIZADO'
				})
				$scope.ordenReposicion.id_estado = estado.id
				$scope.ordenReposicion.confirmacion_reposicion = true
				let q
				if($scope.usuario.empresa.usar_configuracion_iso){
					q = await ObtenerConfiguracionIso($scope.ordenReposicion.almacen.id_sucursal)
					if(q.configuracionesIso && q.configuracionesIso.length>0) q = q.configuracionesIso.filter(e => e.tipoDocumento.nombre_corto === "ORDENV" && e.activo)
				}
				$scope.ordenReposicion.config_doc_iso_envio = q.length === 1 ? q[0].id : null;
				var promesa = CrearActualizarOrdentrabajo($scope.usuario.id, $scope.ordenReposicion)
				promesa.then(function (dato) {
					$scope.cerrarModalCerrarOrdenReposicion()
					SweetAlert.swal("", dato.mensaje , "success");
					if( !dato.hasErr ) {
						$scope.imprimirIsoGestionEnvio( $scope.ordenReposicion )
						$scope.obtenerOrdenesReposicion()
					}
				})
			}
			$scope.agregarNuevoDetalleOrdenReposicion = function () {
				$scope.nuevoProductoOrdenRepo = true
				$scope.nuevoDetalleOrdenReposicion = { detallesSolicitudProductos: [], cantidad: 0 }

			}
			$scope.agregarDetalleOrdenReposicion = async function (detalle) {
				try {
					$scope.nuevoProductoOrdenRepo = false
					let detalleOrdenReposicion = {
						detallesSolicitudProductos: '', observado: false,
						detallesSolicitudProductosBase: '',
						observacion_revisor: "",
						observacion: "",
						cantidad: 0,
						extra: detalle.extra,
						eliminado: false,
						producto: detalle.producto
					}
					detalleOrdenReposicion.inventario_disponible = 0
					let res = await OptenerInventarioDisponibleProducto(detalleOrdenReposicion.producto.id, $scope.ordenReposicion.almacen.id);
					detalleOrdenReposicion.inventario_disponible = res.inventario_disponible
					datos = await $scope.calcularMaximoOrdenReposicion(detalleOrdenReposicion, $scope.ordenReposicion.almacen.id, 12)

					detalleOrdenReposicion.cantidad_maxima = datos.cantidad_maxima
					detalleOrdenReposicion.cantidad_sugerida = datos.cantidad_sugerida					
					$scope.calcularCantidadTotalExtra(detalleOrdenReposicion)
					$scope.ordenReposicion.detallesOrdenReposicion.push(detalleOrdenReposicion)
					$scope.$evalAsync()

				} catch (error) {
					console.log(error)
				}
			}
			$scope.guardarDatosOrdentrabajo = async () => {
				$scope.ordenReposicion.fecha_consumo = new Date($scope.convertirFecha($scope.ordenReposicion.fecha_consumo))
				$scope.ordenReposicion.fecha_creacion = new Date()
				let q
				if($scope.usuario.empresa.usar_configuracion_iso){
					q = await ObtenerConfiguracionIso($scope.ordenReposicion.sucursal.id)
					if(q.configuracionesIso && q.configuracionesIso.length>0) q = q.configuracionesIso.filter(e => e.tipoDocumento.nombre_corto === "CONREP" && e.activo)
				}
				$scope.ordenReposicion.config_doc_iso_recepcion = q.length === 1 ? q[0].id : null;

				if ($scope.ordenReposicion.revisar) {
					ordenes = $scope.ordenReposicion.detallesOrdenReposicion.filter(function (x) {
						return x.observado == true
					})
					if (ordenes.length > 0) {
						var estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
							return x.nombre_corto === 'REVISADO'
						})
					} else {
						var estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
							return x.nombre_corto === 'FINALIZADO'
						})
						$scope.ordenReposicion.confirmacion_reposicion = true
					}
					$scope.ordenReposicion.id_estado = estado.id
				} else
					if ($scope.ordenReposicion.correccion) {
						var estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
							return x.nombre_corto === 'CORREGIDO'
						})
						$scope.ordenReposicion.id_estado = estado.id
					}
				var promesa = CrearActualizarOrdentrabajo($scope.usuario.id, $scope.ordenReposicion)
				promesa.then(function (dato) {
					$scope.cerrarModalNuevaOrdenReposicion()
					$scope.obtenerOrdenesReposicion()
					if( dato.hasErr ) return SweetAlert.swal("", dato.mensaje , "success")
					if(dato.nuevo) $scope.imprimirIsoGestionRecepcion(dato.nuevo)
				})
			}
			$scope.filtroOrdenRepo = {};
			$scope.obtenerDatosOrdenReposicion = function (filtro) {
				blockUI.start();
				$scope.paginatorOrdenRep = Paginator();
				$scope.paginatorOrdenRep.column = "fecha_creacion";
				$scope.paginatorOrdenRep.direction = "asc";
				if (filtro) {
					// $scope.filtroOrdenReposicion = filtro
					$scope.filtroOrdenReposicion = {
						id_empresa: $scope.usuario.id_empresa,
						inicio: filtro.inicio ? new Date($scope.convertirFecha(filtro.inicio)) : 0,
						fin: filtro.fin ? new Date($scope.convertirFecha(filtro.fin)) : 0,
						id_sucursal: filtro.sucursal ? filtro.sucursal.id : 0, 
						id_almacen: filtro.almacen ? filtro.almacen.id : 0,
						id_estado: filtro.id_estado ? filtro.id_estado : 0,
					};
					
				} else {
					$scope.filtroOrdenReposicion = {
						id_empresa: $scope.usuario.id_empresa,
						inicio: "",
						fin: "",
						id_sucursal: "", id_almacen: "",
						id_estado: ""
					};
				}
				$scope.paginatorOrdenRep.callBack = $scope.obtenerOrdenesReposicion;
				$scope.paginatorOrdenRep.getSearch("", $scope.filtroOrdenReposicion, null);
				blockUI.stop();
			}

			$scope.obtenerOrdenesReposicion = function () {
				var promesa = ObtenerOrdenesReposicion($scope.paginatorOrdenRep)
				promesa.then(function (data) {
					$scope.paginatorOrdenRep.setPages(data.paginas);
					$scope.ordenesReposicion = data.ordenesReposicion
					$scope.ordenesReposicion.forEach(function (x) {
						if (x.estado.nombre_corto == 'REVISADO') {
							x.correccion = true
						} else {
							x.correccion = false
						}
					})
					blockUI.stop()
				})
			}
			//exportar en exel y pdf orden reposicion
			$scope.generarExcelOrdenReposicion = function (detalles) {
				blockUI.start();
				var data = [["ARTICULO", "TIPO", "DESCRIPCION", "UM", "CONSUMO",
					"CONS P/REPO", "EXTRA", "REPOSICION", "SALDO FECHA", "MÁXIMO", "MÁXIMO FIJO", "ESPESIFICACION / OBSERVACION","CORRECCION","JUSTIFICATIVO"]];
				var index = 0;
				for (var i = 0; i < detalles.length; i++) {
					var columns = [];
					var detalle = detalles[i]
					columns.push(detalle.producto.codigo);
					columns.push('SEMANAL');
					columns.push(detalle.producto.nombre);
					columns.push(detalle.producto.unidad_medida);
					columns.push(detalle.cantidad);
					columns.push(detalle.cantidad);
					columns.push(detalle.extra);
					columns.push(detalle.cantidad_total);
					columns.push(detalle.inventario_disponible);
					columns.push(detalle.cantidad_maxima);
					columns.push(detalle.cantidad_fijo);
					columns.push(detalle.observacion);
					columns.push(detalle.cantidad_corregida);
					columns.push(detalle.justificativo);
					data.push(columns);
				}


				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ORDEN-REPOSICION.xlsx");
				blockUI.stop();
			}
			//fin exportar en exel y pdf
			// FIN ORDEN DE REPOSICION
			function validarCampos(datosFaltantes, solicitud, row) {
				var filaNum = row + 1;
				if (solicitud.A == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta solicitud en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.B == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Usuario en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.C == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Sucursal en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.D == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Almacen en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.E == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta fecha en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.E != null) {
					if (typeof solicitud.E !== 'number') {
						datosFaltantes.push('<span style="color:#dd3333"> La celda(fecha) debe estar en formato Fecha en la Fila ' + row + '</span><br/>');
					}
				}
				if (solicitud.F == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta comensales en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.G == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Estado en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.H == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta monto en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.I == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Código ítem en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.J == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Nombre ítem en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.K == null) {
					datosFaltantes.push('<span style="color:#dd3333"> Falta Cantidad en la Fila ' + filaNum + '</span><br/>');
				}
				if (solicitud.K == 0) {
					datosFaltantes.push('<span style="color:#dd3333"> La Cantidad debe ser mayor a cero en la Fila ' + filaNum + '</span><br/>');
				}

			}

			$scope.validarImportacionesConsumos = function (solicitudes, datosAlmac) {
				if (solicitudes.length > 0) {
					SweetAlert.swal({
						title: '',
						icon: 'info',
						iconHtml: '<i class="fa fa-calculator size-icon"></i>',
						text: 'Validando Inventarios, por favor espere esto puede tardar varios minutos...',
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					blockUI.noOpen = true;
					var promesa = ValidarImportacionConsumos(solicitudes, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						SweetAlert.hideLoading();
						if (dato.solicitudes.length > 0) {
							if (dato.noValidos.length > 0) {
								SweetAlert.swal({
									title: "Inventarios Faltantes!",
									html: "<div class='content-sweet'>" + dato.noValidos.join('\n\n') + "</div><dl id='dt-list-1'><dt>Desea Guardar Los Consumos?</dt><small class='text-danger'>SOLO SE GUARDARAN LOS ITEMS CON INVENTARIO DISPONIBLE.</small></dl>",

									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (result.value) {
										$scope.guardarSolicitudesImp(dato.solicitudes);
									}
								});
							} else {
								SweetAlert.swal({
									title: "Se valido Correctamente Tiene Inventarios Disponibles!",
									html: "<div class='content-sweet'>" + datosAlmac.join('<br/>') + "</div><dl id='dt-list-1'><dt class='text-primary'>Desea Guardar Los Consumos?</dt><small class='text-danger'>verifique que los almacenes sean los correctos</small></dl>",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (result.value) {
										$scope.guardarSolicitudesImp(dato.solicitudes);
									}
								});
							}

						} else {
							if (dato.noValidos.length > 0) {
								SweetAlert.swal({
									title: "Inventarios Faltantes!",
									html: "<div class='content-sweet'>" + dato.noValidos.join('\n\n') + "</div>",
									icon: 'warning'
								});
							} else {
								SweetAlert.swal("", "Revise el archivo no existe ningun inventario disponible", "warning");
							}

						}
					})
				}

			}

			$scope.subirExcelConsumosAlmacen = function (event) {
				SweetAlert.showLoading()
				SweetAlert.swal({
					title: 'Validando datos del archivo ...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})

				var files = event.target.files;
				var i, f;
				$scope.mensajeGuardadoSolicitudes = ""
				$scope.ProductosConProblemas = ""
				for (i = 0, f = files[i]; i != files.length; ++i) {
					var reader = new FileReader();
					var name = f.name;
					reader.onload = async function (e) {

						var data = e.target.result;
						var workbook = XLSX.read(data, { type: 'binary' });
						if (workbook.SheetNames.length > 1) {
							SweetAlert.hideLoading();
							var hojas = workbook.SheetNames.join('<br/>')
							SweetAlert.swal({
								title: "Error en el archivo!",
								html: "<div class='content-sweet'><span class='red'>El Archivo Tiene " + workbook.SheetNames.length + " Hojas</span><br/> <span class='orange'>" + hojas + " <br/></span><span class='red'> eliminelos y deje solo uno</span></div><dl id='dt-list-1'><dt class='text-danger'>Revise el archivo de importación</dt></dl>",
								icon: 'warning'
							});
						} else {
							var first_sheet_name = workbook.SheetNames[0];
							var row = 2, i = 0, row2 = 2;
							var worksheet = workbook.Sheets[first_sheet_name];
							var rowObject = XLSX.utils.sheet_to_json(worksheet, { raw: true, header: "A" });

							var datosFaltantes = [];
							for (let index = 1; index < rowObject.length; index++) {
								const fila = rowObject[index];
								validarCampos(datosFaltantes, fila, index);
								if (rowObject.length - 1 == index) {
									if (datosFaltantes.length > 0) {
										SweetAlert.hideLoading();
										SweetAlert.swal({
											title: "Campos Faltantes!",
											html: "<div class='content-sweet'>" + datosFaltantes.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-danger'>Revise el archivo de importación</dt><small class='text-danger'>verifique que contengan todos los datos necesarios.</small></dl>",
											icon: 'warning'
										});
									} else {

										rowObject.shift();
										var datosAlmac = [...new Set(rowObject.map((car) => "<span class='black'>sucursal: </span><span class='green'>" + car.C + " </span><span class='black'>almacen: </span><span class='green'>" + car.D + "</span>"))]
										var solicitudes = [];
										do {
											row2 = row
											var solicitud = { detalleSolicitud: [], estado: {}, usuario: { persona: {} }, almacen: { sucursal: {} } };
											solicitud.numero_solicitud = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
											solicitud.usuario.nombre_usuario = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
											solicitud.almacen.sucursal.nombre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
											// let sucursalO = $scope.sucursales.find(x=>x.nombre ==solicitud.almacen.sucursal.nombre)
										/* 	var q = await ObtenerConfiguracionIso(sucursalO.id);
											q = q.configuracionesIso.find(cfg => cfg.tipoDocumento.nombre_corto === "CONSUMO" && cfg.activo == true);
											solicitud.config_doc_iso = q.id; */
											// var suc = $scope.sucursales.find(function (x) {
											// 	return x.nombre === solicitud.almacen.sucursal.nombre
											// })
											// $scope.obtenerAlmacenes(suc.id)
											solicitud.almacen.nombre = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
											// let almacen = $scope.almacenes.find(function (x) {
											// 	return x.nombre === solicitud.almacen.nombre
											// })
											// solicitud.almacen.id = almacen ? almacen.id : null;
											solicitud.fecha = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? $scope.fecha_excel_angular(worksheet['E' + row].v.toString()) : null;
											solicitud.comensales = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? parseInt(worksheet['F' + row].v.toString()) : null;
											solicitud.estadoCierre = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
											if (solicitud.estadoCierre.toUpperCase() == "CERRADO") {
												solicitud.activo = false
											} else {
												solicitud.activo = true
											}
											solicitud.estado = $scope.estadosSolicitudReposicion.clases.find(function (x) {
												return x.nombre_corto == 'PENDIENTE'
											})
											solicitud.area = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : null;
											solicitud.centroCosto = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : null;
											

											solicitud.monto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : null;
											var numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
											while (numeroSolicitudDelDetalle !== null && solicitud.numero_solicitud === numeroSolicitudDelDetalle) {
												var detalleSolicitud = { detallesIngredientesProducto: [], productoSolicitado: {} }
												detalleSolicitud.productoSolicitado.codigo = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
												detalleSolicitud.productoSolicitado.nombre = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? worksheet['J' + row2].v.toString() : null;
												detalleSolicitud.cantidad = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v) : null;
												solicitud.detalleSolicitud.push(detalleSolicitud)
												row2++
												numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
											};
											
											row = row2
											solicitudes.push(solicitud);
										} while (worksheet['A' + row] != undefined);

										$scope.validarImportacionesConsumos(solicitudes, datosAlmac);



										// SweetAlert.hideLoading();
										// SweetAlert.swal({
										// 	title: "Se valido Correctamente El Archivo!",
										// 	html: "<div class='content-sweet'>" + datosAlmac.join('<br/>') + "</div><dl id='dt-list-1'><dt class='text-primary'>Desea Guardar Los Consumos?</dt><small class='text-danger'>verifique que los almacenes sean los correctos</small></dl>",
										// 	icon: 'info',
										// 	showCancelButton: true,
										// 	confirmButtonColor: '#3085d6',
										// 	cancelButtonColor: '#d33',
										// 	confirmButtonText: 'Si',
										// 	cancelButtonText: "No"
										// }).then(function (result) {
										// 	if (result.value) {
										// 		var solicitudes = [];
										// 		do {
										// 			row2 = row
										// 			var solicitud = { detalleSolicitud: [], estado: {}, usuario: { persona: {} }, almacen: { sucursal: {} } };
										// 			solicitud.numero_solicitud = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
										// 			solicitud.usuario.nombre_usuario = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
										// 			solicitud.almacen.sucursal.nombre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;

										// 			var suc = $scope.sucursales.find(function (x) {
										// 				return x.nombre === solicitud.almacen.sucursal.nombre
										// 			})
										// 			$scope.obtenerAlmacenes(suc.id)
										// 			solicitud.almacen.nombre = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
										// 			let almacen = $scope.almacenes.find(function (x) {
										// 				return x.nombre === solicitud.almacen.nombre
										// 			})
										// 			solicitud.almacen.id = almacen ? almacen.id : null;
										// 			solicitud.fecha = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? $scope.fecha_excel_angular(worksheet['E' + row].v.toString()) : null;
										// 			solicitud.comensales = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? parseInt(worksheet['F' + row].v.toString()) : null;
										// 			solicitud.estadoCierre = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
										// 			if (solicitud.estadoCierre.toUpperCase() == "CERRADO") {
										// 				solicitud.activo = false
										// 			} else {
										// 				solicitud.activo = true
										// 			}
										// 			solicitud.estado = $scope.estadosSolicitudReposicion.clases.find(function (x) {
										// 				return x.nombre_corto == 'PENDIENTE'
										// 			})

										// 			solicitud.monto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : null;
										// 			var numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
										// 			while (numeroSolicitudDelDetalle !== null && solicitud.numero_solicitud === numeroSolicitudDelDetalle) {
										// 				var detalleSolicitud = { detallesIngredientesProducto: [], productoSolicitado: {} }
										// 				detalleSolicitud.productoSolicitado.codigo = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
										// 				detalleSolicitud.productoSolicitado.nombre = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? worksheet['J' + row2].v.toString() : null;
										// 				detalleSolicitud.cantidad = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v) : null;
										// 				solicitud.detalleSolicitud.push(detalleSolicitud)
										// 				row2++
										// 				numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
										// 			};
										// 			row = row2
										// 			solicitudes.push(solicitud);
										// 		} while (worksheet['A' + row] != undefined);
										// 		// SweetAlert.update({ title: "Guardando ...." });
										// 		SweetAlert.showLoading()
										// 		SweetAlert.swal({
										// 			title: "Guardando!",
										// 			text: 'Por favor espere esto puede tardar varios minutos...',
										// 			icon: 'info',
										// 			allowEscapeKey: false,
										// 			allowOutsideClick: false
										// 		});
										// 		// blockUI.start();
										// 		blockUI.noOpen = true;
										// 		$scope.guardarSolicitudesImp(solicitudes);
										// 	}
										// });
									}
								}
							}
						}

						$scope.limpiarArchivoImportacion()
						blockUI.stop();

					};
					reader.readAsBinaryString(f);
				}

			}

			$scope.guardarSolicitudesImp = function (solicitudes) {
				var solicitudParaGuardar = solicitudes
				var solicitudesArray = []
				if (solicitudParaGuardar.length > 0) {
					if (solicitudParaGuardar.length > 1) {
						solicitudesArray = solicitudParaGuardar.slice(0, 1)
						solicitudParaGuardar = solicitudParaGuardar.slice(1, solicitudParaGuardar.length)
					} else {
						solicitudesArray = solicitudParaGuardar
						solicitudParaGuardar = []
					}
					var promesa = GuardarSolicitudesImp(solicitudesArray, $scope.usuario.id_empresa)
					promesa.then(function (dato) {/* 
						if (dato.hasErr) {
							$scope.ProductosConProblemas += "<p>" + dato.mensaje2 + ".</p> "
							$scope.guardarSolicitudesImp(solicitudParaGuardar)
						} else { */
						if (dato.errorDetalle) {
							if (dato.errorDetalle.length > 0) {
								for (const x of dato.errorDetalle) {
									$scope.ProductosConProblemas += "<p>" + x.mensaje + ".</p> "
								}
							}
						}
						$scope.mensajeGuardadoSolicitudes = dato.mensaje
						$scope.guardarSolicitudesImp(solicitudParaGuardar)

						/* 						} */
					})
				} else {

					if ($scope.ProductosConProblemas) {
						SweetAlert.swal({
							title: '<strong><u>' + $scope.mensajeGuardadoSolicitudes + '</u></strong>',
							icon: 'warning',
							html: $scope.ProductosConProblemas,
							showCloseButton: true,
							showCancelButton: false,
							focusConfirm: false,
						})
					} else {
						SweetAlert.swal({
							title: '',
							icon: 'warning',
							html: $scope.mensajeGuardadoSolicitudes,
							showCloseButton: true,
							showCancelButton: false,
							focusConfirm: false,
						})
					}
				}
			}
			/* inicio excel solicitudes reposicion */
			$scope.subirExcelSolicitudesReposicionAlmacen = function (event) {
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
						var row = 2, i = 0, row2 = 2, row3 = 2;
						var worksheet = workbook.Sheets[first_sheet_name];
						var solicitudes = [];
						var ordenesReposicion = []

						do {
							row2 = row + 1
							var solicitud = { detalleSolicitud: [], estado: {}, usuario: { persona: {} }, almacen: { sucursal: {} } };
							solicitud.numero_solicitud = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							solicitud.usuario.nombre_usuario = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							solicitud.usuario.persona.ci = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							solicitud.almacen.sucursal.numero = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							var suc = $scope.sucursales.find(function (x) {
								return x.numero === parseInt(solicitud.almacen.sucursal.numero)
							})
							$scope.obtenerAlmacenes(suc.id)
							solicitud.almacen.nombre = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							solicitud.almacen.numero = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							solicitud.almacen = $scope.almacenes.find(function (x) {
								return x.numero === parseInt(solicitud.almacen.numero)
							})
							//solicitud.almacen.sucursal = suc
							solicitud.estado.nombre_corto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
							solicitud.estado = $scope.estadosSolicitudReposicion.clases.find(function (x) {
								return x.nombre_corto == solicitud.estado.nombre_corto
							})
							solicitud.fecha = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
							solicitud.activo = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v : null;
							solicitud.monto = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? parseFloat(worksheet['K' + row].v.toString()) : null;
							solicitud.eliminado = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v : null;
							solicitud.comensales = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? parseFloat(worksheet['M' + row].v.toString()) : null;
							solicitud.copia = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
							var numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
							while (numeroSolicitudDelDetalle !== null && solicitud.numero_solicitud === numeroSolicitudDelDetalle) {
								row3 = row2 + 1
								var detalleSolicitud = { detallesIngredientesProducto: [], productoSolicitado: {} }
								detalleSolicitud.numero_detalle_solicitud = worksheet['O' + row2] != undefined && worksheet['O' + row2] != "" ? worksheet['O' + row2].v.toString() : null;
								detalleSolicitud.productoSolicitado.nombre = worksheet['P' + row2] != undefined && worksheet['P' + row2] != "" ? worksheet['P' + row2].v.toString() : null;
								detalleSolicitud.productoSolicitado.codigo = worksheet['Q' + row2] != undefined && worksheet['Q' + row2] != "" ? worksheet['Q' + row2].v.toString() : null;
								detalleSolicitud.cantidad = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? parseFloat(worksheet['R' + row2].v.toString()) : null;
								detalleSolicitud.detalle_orden_reposicion = worksheet['S' + row2] != undefined && worksheet['S' + row2] != "" ? worksheet['S' + row2].v.toString() : null;
								var numeroDelDetalle = worksheet['O' + row3] != undefined && worksheet['O' + row3] != "" ? worksheet['O' + row3].v.toString() : null;
								while (numeroDelDetalle !== null && detalleSolicitud.numero_detalle_solicitud === numeroDelDetalle) {
									var detalleIngredietes = { productoSolicitudBase: {} }
									detalleIngredietes.productoSolicitudBase.nombre = worksheet['T' + row3] != undefined && worksheet['T' + row3] != "" ? worksheet['T' + row3].v.toString() : null;
									detalleIngredietes.productoSolicitudBase.codigo = worksheet['U' + row3] != undefined && worksheet['U' + row3] != "" ? worksheet['U' + row3].v.toString() : null;
									detalleIngredietes.cantidad_ideal = worksheet['V' + row3] != undefined && worksheet['V' + row3] != "" ? parseFloat(worksheet['V' + row3].v.toString()) : null;
									detalleIngredietes.cantidad_real = worksheet['W' + row3] != undefined && worksheet['W' + row3] != "" ? parseFloat(worksheet['W' + row3].v.toString()) : null;
									detalleIngredietes.total = worksheet['X' + row3] != undefined && worksheet['X' + row3] != "" ? parseFloat(worksheet['X' + row3].v.toString()) : null;
									row3++;
									numeroDelDetalle = worksheet['O' + row3] != undefined && worksheet['O' + row3] != "" ? worksheet['O' + row3].v.toString() : null;
									detalleSolicitud.detallesIngredientesProducto.push(detalleIngredietes)
									row2 = row3
								}
								if (row2 != row3) {
									row2++;
								}
								numeroSolicitudDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
								solicitud.detalleSolicitud.push(detalleSolicitud)
								row = row2
							};
							row = row2
							solicitudes.push(solicitud);
							i++;
							var colA = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
						} while (colA !== 'OrdenReposicion');
						row = row + 2
						do {
							row2 = row + 1
							var ordenReposicion = { detallesOrdenReposicion: [], estado: {}, usuario: { persona: {} }, almacen: { sucursal: {} } };
							ordenReposicion.numero_orden = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							ordenReposicion.fecha_creacion = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							ordenReposicion.fecha_inicio = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							ordenReposicion.fecha_consumo = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							ordenReposicion.almacen.sucursal.nombre = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							ordenReposicion.almacen.sucursal.numero = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							var suc = $scope.sucursales.find(function (x) {
								return x.numero === parseInt(ordenReposicion.almacen.sucursal.numero)
							})

							ordenReposicion.almacen.nombre = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							ordenReposicion.almacen.numero = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
							ordenReposicion.almacen = $scope.almacenes.find(function (x) {
								return x.numero === parseInt(ordenReposicion.almacen.numero)
							})
							//ordenReposicion.almacen.sucursal = suc
							ordenReposicion.usar_observacion = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
							ordenReposicion.usar_observacion = ordenReposicion.usar_observacion == 'FALSE' ? false : true
							ordenReposicion.observacion = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
							ordenReposicion.usuario.persona.nombre_completo = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
							ordenReposicion.usuario.persona.ci = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : null;
							ordenReposicion.eliminado = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : null;
							ordenReposicion.eliminado = ordenReposicion.eliminado == 0 ? false : true
							ordenReposicion.estado.nombre_corto = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
							ordenReposicion.estado = $scope.estadosOrdenReposicion.clases.find(function (x) {
								return x.nombre_corto == ordenReposicion.estado.nombre_corto
							})
							ordenReposicion.id_estado = ordenReposicion.estado.id
							ordenReposicion.confirmacion_reposicion = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? worksheet['O' + row].v.toString() : null;
							ordenReposicion.confirmacion_reposicion = ordenReposicion.confirmacion_reposicion == 0 ? false : true
							ordenReposicion.indice_rotacion = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? parseFloat(worksheet['P' + row].v.toString()) : null;
							var numeroOrdenDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
							while (numeroOrdenDelDetalle !== null && ordenReposicion.numero_orden === numeroOrdenDelDetalle) {
								var detalleOrdenReposicion = { producto: {} }
								detalleOrdenReposicion.observado = worksheet['Q' + row] != undefined && worksheet['Q' + row] != "" ? worksheet['Q' + row].v.toString() : null;
								detalleOrdenReposicion.observado = detalleOrdenReposicion.observado == 0 ? false : true
								detalleOrdenReposicion.observacion_revisor = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? worksheet['R' + row2].v.toString() : null;
								detalleOrdenReposicion.observacion = worksheet['S' + row2] != undefined && worksheet['S' + row2] != "" ? worksheet['S' + row2].v.toString() : null;
								detalleOrdenReposicion.cantidad = worksheet['T' + row2] != undefined && worksheet['T' + row2] != "" ? parseFloat(worksheet['T' + row2].v.toString()) : null;
								detalleOrdenReposicion.extra = worksheet['U' + row2] != undefined && worksheet['U' + row2] != "" ? parseFloat(worksheet['U' + row2].v.toString()) : null;
								detalleOrdenReposicion.cantidad_maxima = worksheet['V' + row2] != undefined && worksheet['V' + row2] != "" ? parseFloat(worksheet['V' + row2].v.toString()) : null;
								detalleOrdenReposicion.cantidad_sugerida = worksheet['W' + row2] != undefined && worksheet['W' + row2] != "" ? parseFloat(worksheet['W' + row2].v.toString()) : null;
								detalleOrdenReposicion.inventario_disponible = worksheet['X' + row2] != undefined && worksheet['X' + row2] != "" ? parseFloat(worksheet['X' + row2].v.toString()) : null;
								detalleOrdenReposicion.eliminado = worksheet['Y' + row2] != undefined && worksheet['Y' + row2] != "" ? worksheet['Y' + row2].v.toString() : null;
								detalleOrdenReposicion.eliminado = detalleOrdenReposicion.eliminado == 0 ? false : true
								detalleOrdenReposicion.producto.nombre = worksheet['Z' + row2] != undefined && worksheet['Z' + row2] != "" ? worksheet['Z' + row2].v.toString() : null;
								detalleOrdenReposicion.producto.numero = worksheet['AA' + row2] != undefined && worksheet['AA' + row2] != "" ? parseFloat(worksheet['AA' + row2].v.toString()) : null;
								detalleOrdenReposicion.cantidad_corregida = worksheet['AB' + row2] != undefined && worksheet['AB' + row2] != "" ? parseFloat(worksheet['AB' + row2].v.toString()) : null;
								detalleOrdenReposicion.justificativo = worksheet['AC' + row2] != undefined && worksheet['AC' + row2] != "" ? worksheet['AC' + row2].v.toString() : null;
								detalleOrdenReposicion.numero_detalle_reposicion = worksheet['AD' + row2] != undefined && worksheet['AD' + row2] != "" ? worksheet['AD' + row2].v.toString() : null;
								row2++;
								numeroOrdenDelDetalle = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
								detalleOrdenReposicion.detallesSolicitudProductos = []
								detalleOrdenReposicion.detallesSolicitudProductosBase = []
								ordenReposicion.detallesOrdenReposicion.push(detalleOrdenReposicion)
								row = row2
							};
							row = row2
							ordenesReposicion.push(ordenReposicion);
							i++;
							//var colA = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
						} while (worksheet['A' + row2] != undefined);
						$scope.guardarSolicitudesReposicionAlmacen(solicitudes, ordenesReposicion);
						$scope.limpiarArchivoImportacion()
						blockUI.stop();
					};
					reader.readAsBinaryString(f);

				}
			}

			$scope.guardarSolicitudesReposicionAlmacen = function (solicitudes, ordenesReposicion) {
				var solicitudParaGuardar = solicitudes
				var solicitudesArray = []
				if (solicitudParaGuardar.length > 0) {
					if (solicitudParaGuardar.length > 1) {
						solicitudesArray = solicitudParaGuardar.slice(0, 1)
						solicitudParaGuardar = solicitudParaGuardar.slice(1, solicitudParaGuardar.length)
					} else {
						solicitudesArray = solicitudParaGuardar
						solicitudParaGuardar = []
					}

					var promesa = GuardarSolicitudesReposicionesAlmacen(solicitudesArray, ordenesReposicion, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						for (const detalleSolicitud of dato.ids_detalles_solicitud) {
							for (const ordenReposicion of ordenesReposicion) {
								for (const detalleReposicion of ordenReposicion.detallesOrdenReposicion) {
									if (detalleSolicitud.id_detalle_orden_reposicion == detalleReposicion.numero_detalle_reposicion) {
										detalleReposicion.detallesSolicitudProductos.push({ id: detalleSolicitud.id_detalle_solicitud })
									}
								}
							}
						}

						for (const detalleIngSolicitud of dato.ids_detalles_ingredientes) {
							for (const ordenReposicion of ordenesReposicion) {
								for (const detalleReposicion of ordenReposicion.detallesOrdenReposicion) {
									if (detalleIngSolicitud.id_detalle_orden_reposicion == detalleReposicion.numero_detalle_reposicion) {
										detalleReposicion.detallesSolicitudProductosBase.push({ id: detalleIngSolicitud.id_detalle_solicitud_base })
									}
								}
							}
						}
						$scope.guardarSolicitudesReposicionAlmacen(solicitudParaGuardar, ordenesReposicion)
						//$scope.mostrarMensaje(dato.mensaje)
					})
				} else {
					$scope.guardarOrdenesReposicionAlmacen(ordenesReposicion)
				}
			}
			$scope.guardarOrdenesReposicionAlmacen = function (ordenesReposicion, mensaje) {
				var ordenParaGuardar = ordenesReposicion
				var ordenesArray = []
				if (ordenParaGuardar.length > 0) {
					if (ordenParaGuardar.length > 1) {
						ordenesArray = ordenParaGuardar.slice(0, 1)
						ordenParaGuardar = ordenParaGuardar.slice(1, ordenParaGuardar.length)
					} else {
						ordenesArray = ordenParaGuardar
						ordenParaGuardar = []
					}
					var promesa = CrearActualizarOrdentrabajo($scope.usuario.id, ordenesArray[0])
					promesa.then(function (dato) {
						$scope.guardarOrdenesReposicionAlmacen(ordenParaGuardar, dato.mensaje)
					})
				} else {
					$scope.mostrarMensaje(mensaje)
				}

				console.log(ordenesReposicion)
			}
			$scope.mostrarFormulacion = function () {
				$scope.mostrardatosFormulacion = $scope.mostrardatosFormulacion === false ? true : false
			}
			$scope.descargarSolicitudDesdeRegistro = async function (registro) {
				try {
					let dato = $scope.datosCampamentoOrdenes.find(x => x.fecha_sincronizado == registro.fecha_sincronizado);
					registro.ordenes = dato.ordenes

					$scope.descargarSolicitudesSucursal($scope.sucursalImpCamp, registro)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.descargarOrdenesDesdeRegistro = async function (registro) {
				try {
					let dato = $scope.datosCampamentoSolicitudes.find(x => x.fecha_sincronizado == registro.fecha_sincronizado);
					registro.solicitudes = dato.solicitudes

					$scope.descargarSolicitudesSucursal($scope.sucursalImpCamp, registro)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.descargarSolicitudesSucursal = async function (sucursalImpCamp, registro) {
				try {
					let datos = registro ? registro : await $scope.obtenerRegistroSolicitudCampamento(sucursalImpCamp.id)
					solicitudes = datos.solicitudes

					ordenes = datos.ordenes

					blockUI.start();
					let data = [["numero correlativo", "identificador campamento"]];
					let index = 0;
					for (const solicitud of solicitudes) {
						let columns = [];
						columns.push(solicitud.numero_correlativo);
						columns.push(solicitud.id_solicitud_campamento);
						data.push(columns);
					}
					data.push(['OrdenReposicion']);
					for (const orden of ordenes) {
						let columns = [];
						columns.push(orden.numero_correlativo);
						columns.push(orden.id_orden_reposicion_campamento);
						data.push(columns);
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Solicitudes-y-ordenes-reposicion-" + sucursalImpCamp.nombre + ".xlsx");

				} catch (error) {
					console.log(error)
				}
				blockUI.stop();
				$scope.$evalAsync()
			}
			$scope.obtenerRegistroSolicitudCampamento = async function (idSuc) {
				try {
					let res = await ObtenerSolicitudesImportacionCamp(idSuc)
					return res
				} catch (error) {
					console.log(error)
				}

			}
			$scope.cerrarSolicitudesCampamento = async function (sucursalImpCamp) {
				try {
					let res = await CerrarSolicitudesImpCamp(sucursalImpCamp.id, new Date())
					SweetAlert.swal("", res.mensaje, "success");
				} catch (error) {
					console.log(error)
				}

			}
			/* fin excel solicitudes reposicion */
			/* pdf orden reposicion */
			$scope.generarPdfOrdenReposicion = function (detalles) {
				blockUI.start();
				var doc = new PDFDocument({ size: [612, 792], margin: 10, compress: false });
				var stream = doc.pipe(blobStream());
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.font('Helvetica', 8);
				var y = 115, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(detalles.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFOrdenReposicion(doc, pagina, totalPaginas);

				for (var i = 0; i < detalles.length && items <= itemsPorPagina; i++) {
					var detalle = detalles[i]
					doc.font('Helvetica', 8);
					doc.text(detalle.producto.codigo, 50, y);
					doc.text(detalle.producto.nombre, 120, y, { width: 130 });
					doc.text(detalle.producto.unidad_medida, 285, y);
					doc.text(number_format(detalle.cantidad, 2), 345, y);
					doc.text(number_format(detalle.extra, 2), 405, y);
					doc.text(number_format(detalle.cantidad_total, 2), 455, y);
					doc.text(number_format(detalle.inventario_disponible, 2), 525, y);
					y = y + 20;
					items++;
					if (items > itemsPorPagina) {
						doc.rect(40, 105, 540, y - 115).stroke();
						doc.text(pagina + "/" + totalPaginas, 570, y + 15);
						doc.font('Helvetica', 6);
						doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
						doc.text("SOLICITANTE: " + $scope.ordenReposicion.usuario.persona.nombre_completo, 345, y + 10);
						doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 10);
						doc.addPage({ size: [612, 792], margin: 10 });
						y = 115;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFOrdenReposicion(doc, pagina, totalPaginas);
					}
				}
				doc.rect(40, 105, 540, y - 115).stroke();
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.text(pagina + "/" + totalPaginas, 570, y + 15);
				doc.font('Helvetica', 6);
				doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 5);
				doc.text("SOLICITANTE: " + $scope.ordenReposicion.usuario.persona.nombre_completo, 345, y + 5);
				doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y + 5);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();

			}

			$scope.dibujarCabeceraPDFOrdenReposicion = function (doc, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPOSICIÓN", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("SUCURSAL : ", -40, 50, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text($scope.ordenReposicion.almacen.sucursal.nombre, 60, 50, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("FECHA : ", 40, 60, { width: 40 });
				doc.font('Helvetica', 8);
				doc.text($scope.fechaATexto($scope.ordenReposicion.fecha_creacion), 75, 60, { width: 40 });
				doc.font('Helvetica-Bold', 14);
				doc.text("N°", 380, 40, { align: "center" });
				doc.text($scope.ordenReposicion.numero_correlativo, 440, 40, { align: "center" });
				doc.rect(40, 80, 540, 25).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Articulo", 50, 90);
				doc.text("Descripción", 120, 90);
				doc.text("Unidad", 280, 90);
				doc.text("Consumo", 340, 90);
				doc.text("Extra", 400, 90);
				doc.text("Reposición", 450, 90);
				doc.text("Saldo Fecha", 520, 90);
			}
			/* fin pdf orden reposicion */
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
			$scope.buscarProductoCodigoEquipo = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, 0);
					return promesa;
				}
			};
			$scope.establecerCodigoEquipo = function () {

			}
			$scope.cambiarTipoPago = function (tipoPago) {
				var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPago.id; })[0];
				let esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
				$scope.pedido.id_tipo_pago = tipoPago.id;
				if (!esContado) {
					$scope.pedido.a_cuenta = 0
					$scope.pedido.dias_credito = 30
					$scope.calcularSaldoPedido();
				} else {
					$scope.pedido.a_cuenta = null
					$scope.pedido.saldo = null
					$scope.pedido.dias_credito = null
				}

			}
			$scope.sumarTotalPedido = function () {
				let total = 0
				for (const x of $scope.detallesPedido) {
					total += x.total
				}
				return total
			}
			$scope.calcularSaldoPedido = function () {
				$scope.pedido.saldo = $scope.pedido.total - $scope.pedido.a_cuenta
			}
			$scope.printIsoDocConsumo = async function (solicitud) {
				blockUI.start();
				convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
					let dato = await OptenerDatosSolicitudAlm(solicitud.id, solicitud.id_almacen)
					if (!dato.solicitud.configuracionesIso) {
						SweetAlert.swal("", "La Sucursal " + dato.solicitud.almacen.sucursal.nombre + " no tiene Configuración Iso de CONSUMO", "warning");
						return
					}
					else {
						var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
						var y = 220, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil((dato.solicitud.solicitudesProductos.length + 10) / itemsPorPagina);
						if (20 >= dato.solicitud.solicitudesProductos.length) {
							itemsPorPagina = 20;
						}
						else {
							itemsPorPagina = 25;
						}
						$scope.dibujarCabeceraPDFCompraIso(doc, pagina, totalPaginas, dato, imagenEmpresa, dato.solicitud.configuracionesIso);
						for (var i = 0; i < dato.solicitud.solicitudesProductos.length && items <= itemsPorPagina; i++) {
							detalle = dato.solicitud.solicitudesProductos[i]
							doc.font('Bookman', 6);
							doc.text(i + 1, 60, y + 5, { width: 31, align: "center" }); doc.rect(91, y, 0, 20).stroke();
							doc.text(detalle.productoSolicitado.codigo, 91, y + 5, { width: 73, align: "center" }); doc.rect(164, y, 0, 20).stroke();
							doc.text(detalle.productoSolicitado.nombre, 166, y + 5, { width: 153 }); doc.rect(319, y, 0, 20).stroke();
							doc.text(detalle.productoSolicitado.unidad_medida, 319, y + 5, { width: 56, align: "center" }); doc.rect(375, y, 0, 20).stroke();
							doc.text(detalle.cantidad, 375, y + 5, { width: 56, align: "center" }); doc.rect(431, y, 0, 20).stroke();
							doc.text(dato.observacion ? dato.observacion.toUpperCase() : "", 434, y + 5, { width: 133 });

							doc.font('Bookman', 6);
							doc.rect(60, y, 507, 20).stroke();
							y = y + 20;
							items++;
							if (items > itemsPorPagina && pagina != totalPaginas) {
								doc.addPage({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
								items = 0;
								pagina = pagina + 1;
								y = 60;
								if (pagina != totalPaginas) itemsPorPagina = 30;
								if (pagina === totalPaginas) itemsPorPagina = 25;
								doc.font('Bookman-Bold', 8);
								doc.text('Página', 284, 745);
								doc.text(pagina + ' de ' + totalPaginas, 317, 745);
								doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.solicitud.createdAt) + '      ' +'Actualizado: '+$scope.formatoFechaHora(dato.solicitud.updatedAt)+'      '+'Impreso: '+$scope.formatoFechaHora()+'       '+ 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765,{width: 612, align: 'center'});
							}
						}
						if (pagina === 1 && dato.solicitud.solicitudesProductos.length > 20 && dato.solicitud.solicitudesProductos.length <= 25) {
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
							doc.font('Bookman-Bold', 9);
							doc.text('--------------------------------------------', 60, 670, { width: 162, align: 'center' })
							doc.text("Responsable de Almacén", 60, 680, { width: 162, align: "center" });
							doc.text('--------------------------------------------', 232, 670, { width: 162, align: 'center' })
							doc.text("Responsable de Transporte", 232, 680, { width: 162, align: "center" });
							doc.text('--------------------------------------------', 404, 670, { width: 162, align: 'center' })
							doc.text("Responsable de Recepción", 404, 680, { width: 162, align: "center" });
							doc.font('Bookman-Bold', 8);
							doc.text('Página', 284, 745);
							doc.text(pagina + ' de ' + totalPaginas, 317, 745);
							doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.solicitud.createdAt) + '      ' +'Actualizado: '+$scope.formatoFechaHora(dato.solicitud.updatedAt)+'      '+'Impreso: '+$scope.formatoFechaHora()+'       '+ 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765,{width: 612, align: 'center'});
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

			$scope.dibujarCabeceraPDFCompraIso = function (doc, pagina, totalPaginas, dato, imagenEmpresa, configuracionIso) {
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
				doc.font('Bookman-Bold', 9);
				doc.text("Código:", 243, 95);
				doc.text(configuracionIso.codigo, 283, 95);
				doc.font('Bookman', 9);
				doc.text("Revisión:", 435, 70);
				doc.text(configuracionIso.revicion, 477, 70);
				doc.text("Fecha de Aprobación", 435, 90, { width: 132 });
				doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });

				doc.font('Bookman-Bold', 10);
				doc.text("Almacén:    ", 62, 135);
				doc.text("Fecha:      ", 62, 150);
				doc.text("Descripción:", 62, 165);
				doc.text("Nº: ", 380, 135);

				doc.text('------------------------------------------', 125, 138);
				doc.text('------------------------------------------', 125, 153);
				doc.text('--------------------------------------------------------------------------------------------------------------------', 140, 168);
				doc.text('--------------------------------------------------------------------------------------------------------------------', 140, 180);
				doc.text('---------------------------------------------', 394, 138);
				doc.font('Bookman', 9);
				doc.text(dato.solicitud ? dato.solicitud.almacen ? dato.solicitud.almacen ? dato.solicitud.almacen.sucursal ? dato.solicitud.almacen.nombre.toUpperCase() +' ('+dato.solicitud.almacen.sucursal.nombre.toUpperCase()+')': dato.solicitud.almacen.nombre.toUpperCase()  : dato.solicitud.almacen.nombre.toUpperCase() : '' : '', 128, 135);
				doc.text(dato.solicitud ? fechaATexto(dato.solicitud.fecha) : '', 128, 150);
				doc.text(dato.solicitud ? dato.solicitud.descripcion ? dato.solicitud.descripcion.length > 140 ? dato.solicitud.descripcion.slice(0,70).toUpperCase()  :dato.solicitud.descripcion.toUpperCase() : '' : '', 143, 165);
				doc.text(dato.solicitud ? dato.solicitud.numero_iso_consumo : '', 398, 135);
				//detalle
				doc.rect(60, 195, 507, 25).stroke();
				doc.font('Bookman-Bold', 8);
				doc.text("Nº", 60, 203, { width: 31, align: "center" });
				doc.text("Código del Artículo", 91, 198, { width: 73, align: "center" });
				doc.text("Descripción", 164, 203, { width: 155, align: "center" });
				doc.text("Unidad", 319, 203, { width: 56, align: "center" });
				doc.text("Cantidad", 375, 203, { width: 56, align: "center" });
				doc.text("Observaciones", 431, 203, { width: 136, align: "center" });

				//tabla
				doc.rect(91, 195, 0, 25).stroke();
				doc.rect(164, 195, 0, 25).stroke();
				doc.rect(319, 195, 0, 25).stroke();
				doc.rect(375, 195, 0, 25).stroke();
				doc.rect(431, 195, 0, 25).stroke();
				if (pagina != totalPaginas) {
					doc.font('Bookman-Bold', 8);
					doc.text('Página', 284, 745);
					doc.text(pagina + ' de ' + totalPaginas, 317, 745);
					doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.solicitud.createdAt) + '      ' +'Actualizado: '+$scope.formatoFechaHora(dato.solicitud.updatedAt)+'      '+'Impreso: '+$scope.formatoFechaHora()+'       '+ 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765,{width: 612, align: 'center'});
				}
			};

			/* historial sincronizacion */
			$scope.abrirDialogHSyncCampamento = async () => {
				try {

					await $scope.obtenerDatosCampamentoSolicitud()
					await $scope.obtenerDatosCampamentoOrden()
					$scope.abrirPopup($scope.idModalHSyncCampamento);
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.obtenerDatosCampamentoSolicitud = function (filtro) {
				$scope.paginatorDatosCampamentoSync = Paginator();
				$scope.paginatorDatosCampamentoSync.column = "id";
				$scope.paginatorDatosCampamentoSync.direction = "asc";

				$scope.filtroDatosCampamentoSync = filtro ? filtro : { sucursal: $scope.sucursalImpCamp.id, almacen: '', fecha: '' }
				$scope.paginatorDatosCampamentoSync.callBack = $scope.filtrarDatosCampamentoSolicitud;
				$scope.paginatorDatosCampamentoSync.getSearch("", $scope.filtroDatosCampamentoSync, null);


			}
			$scope.filtrarDatosCampamentoSolicitud = async () => {
				try {
					let res = await ObtenerDatosCampamentoSolicitud($scope.paginatorDatosCampamentoSync)
					$scope.datosCampamentoSolicitudes = res.solicitudes
					$scope.paginatorDatosCampamentoSync.setPages(res.paginas);
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.obtenerDatosCampamentoOrden = function (filtro) {
				$scope.paginatorDatosCampamentoSync = Paginator();
				$scope.paginatorDatosCampamentoSync.column = "id";
				$scope.paginatorDatosCampamentoSync.direction = "asc";

				$scope.filtroDatosCampamentoSync = filtro ? filtro : { sucursal: $scope.sucursalImpCamp.id, almacen: '', fecha: '' }
				$scope.paginatorDatosCampamentoSync.callBack = $scope.filtrarDatosCampamentoOrden;
				$scope.paginatorDatosCampamentoSync.getSearch("", $scope.filtroDatosCampamentoSync, null);


			}
			$scope.filtrarDatosCampamentoOrden = async () => {
				try {
					let res = await ObtenerDatosCampamentoOrden($scope.paginatorDatosCampamentoSync)
					$scope.datosCampamentoOrdenes = res.ordenes
					$scope.paginatorDatosCampamentoSync.setPages(res.paginas);
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.cerrarDialogHSyncCampamento = () => {
				$scope.cerrarPopup($scope.idModalHSyncCampamento);
			}

			$scope.GenerarReporteExcel = async (filtro) => {
				SweetAlert.swal({
					title: 'Recuperando registros ...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var datos = await ObtenerSolicitudesReposicion(filtro, filtro.detalle)
				if (!datos.hasErr) {
					if (datos.solicitudes.length > 0) {
						SweetAlert.update({ title: "Construyendo archivo excel...." });
						if (filtro.detalle) {
							var cabecera = ["Nro.", "Doc.", "Doc ISO", "Sucursal", "Almacén", "Fecha", "Usuario", "Pedido", "Código", "Producto", "Descripción", "Unidad", "Grupo", "Subgrupo", "Cantidad", "Costo", "Total", 'Area', 'Obsercación', 'Estado', 'Activo']
							var data = []
							data.push(cabecera)
							var columns = [];
							for (var i = 0; i < datos.solicitudes.length; i++) {
								columns = [];
								columns.push(i + 1);
								columns.push(datos.solicitudes[i].doc ? datos.solicitudes[i].doc : '');
								columns.push(datos.solicitudes[i].doc_iso ? datos.solicitudes[i].doc_iso : '');
								columns.push(datos.solicitudes[i].sucursal ? datos.solicitudes[i].sucursal.toUpperCase() : '');
								columns.push(datos.solicitudes[i].almacen ? datos.solicitudes[i].almacen.toUpperCase() : '');
								// columns.push(new Date(datos.solicitudes[i].fecha).toLocaleDateString());
								columns.push(new Date(datos.solicitudes[i].fecha).toLocaleDateString());
								columns.push(datos.solicitudes[i].usuario ? datos.solicitudes[i].usuario.toUpperCase() : '');
								columns.push(datos.solicitudes[i].estado ? datos.solicitudes[i].estado : '');
								columns.push(datos.solicitudes[i].codigo ? datos.solicitudes[i].codigo : '');
								columns.push(datos.solicitudes[i].producto ? datos.solicitudes[i].producto.toUpperCase() : '');
								columns.push(datos.solicitudes[i].detalle ? datos.solicitudes[i].detalle.toUpperCase() : '');
								columns.push(datos.solicitudes[i].unidad ? datos.solicitudes[i].unidad : '');
								columns.push(datos.solicitudes[i].grupo ? datos.solicitudes[i].grupo.toUpperCase() : '');
								columns.push(datos.solicitudes[i].subgrupo ? datos.solicitudes[i].subgrupo.toUpperCase() : '');
								columns.push(datos.solicitudes[i].cantidad);
								columns.push(datos.solicitudes[i].costo ? datos.solicitudes[i].costo * 0.87 : '');
								columns.push(datos.solicitudes[i].cantidad ? datos.solicitudes[i].costo ? (datos.solicitudes[i].cantidad * (datos.solicitudes[i].costo * 0.87)).toFixed(2) : '' : '');
								columns.push(datos.solicitudes[i].area ? datos.solicitudes[i].area.toUpperCase() : '');
								columns.push(datos.solicitudes[i].observacion ? datos.solicitudes[i].observacion.toUpperCase() : '');
								columns.push(datos.solicitudes[i].activo ? 'ABIERTO' : 'CERRADO');
								columns.push(datos.solicitudes[i].eliminado ? 'ANULADO' : 'ACTIVO');
								data.push(columns);
							}
							var ws_name = "SheetJS";
							var wb = new Workbook()
							var ws = sheet_from_array_of_arrays(data);
							var wscols = [
								{ wch: 5 },
								{ wch: 7 },
								{ wch: 7 },
								{ wch: 12 },
								{ wch: 15 },
								{ wch: 10 },
								{ wch: 12 },
								{ wch: 10 },
								{ wch: 10 },
								{ wch: 12 },
								{ wch: 12 },
								{ wch: 12 },
								{ wch: 8 },
								{ wch: 8 },
								{ wch: 8 },
								{ wch: 12 }
							];
							ws['!cols'] = wscols;
							ws['!rows'] = [{ hpx: 28, level: 3 }]
							wb.SheetNames.push(ws_name);
							wb.Sheets[ws_name] = ws;
							var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
							var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE OPERACIONES DETALLADO.xlsx");
							filesaver.onwriteend = function () {
								SweetAlert.swal({
									title: 'Finalizado!',
									icon: 'success',
									timer: 2000,
									showConfirmButton: false
								})
							}
						} else {
							var cabecera = ["Nro.", "Doc.", "Doc ISO", "Sucursal", "Fecha", "Monto", "Usuario", "Estado"]
							var data = []
							data.push(cabecera)
							var columns = [];
							for (var i = 0; i < datos.solicitudes.length; i++) {
								columns = [];
								columns.push(i + 1);
								columns.push(datos.solicitudes[i].doc ? datos.solicitudes[i].doc : '');
								columns.push(datos.solicitudes[i].doc_iso ? datos.solicitudes[i].doc_iso : '');
								columns.push(datos.solicitudes[i].sucursal ? datos.solicitudes[i].sucursal.toUpperCase() : '');
								columns.push(new Date(datos.solicitudes[i].fecha).toLocaleDateString());
								columns.push(datos.solicitudes[i].monto);
								columns.push(datos.solicitudes[i].usuario ? datos.solicitudes[i].usuario.toUpperCase() : '');
								columns.push(datos.solicitudes[i].activo ? 'ABIERTO' : 'CERRADO');
								data.push(columns);
							}
							var ws_name = "SheetJS";
							var wb = new Workbook()
							var ws = sheet_from_array_of_arrays(data);
							var wscols = [
								{ wch: 5 },
								{ wch: 7 },
								{ wch: 7 },
								{ wch: 12 },
								{ wch: 9 },
								{ wch: 10 },
								{ wch: 10 },
								{ wch: 10 }
							];
							ws['!cols'] = wscols;
							ws['!rows'] = [{ hpx: 28, level: 3 }]
							wb.SheetNames.push(ws_name);
							wb.Sheets[ws_name] = ws;
							var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
							var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE OPERACIONES .xlsx");
							filesaver.onwriteend = function () {
								SweetAlert.swal({
									title: 'Finalizado!',
									icon: 'success',
									timer: 2000,
									showConfirmButton: false
								})
							}
						}
					} else {
						SweetAlert.swal("", "No se encontraron datos", "warning");
					}

				} else {
					SweetAlert.swal("", datos.mensaje, "error");
				}


			}
			$scope.GenerarReportePdfResumen = async (filtro) => {
				SweetAlert.swal({
					title: 'Recuperando registros...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var datos = await ObtenerSolicitudesReposicion(filtro, true)
				if (!datos.hasErr) {
					if (datos.solicitudes.length > 0) {
						try {
							convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
								SweetAlert.update({ title: "Construyendo archivo pdf...." });
								var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]
								var helper = {};
									var sucursales = datos.solicitudes.reduce(function (r, o) {
										var key = o.sucursal;
										if (!helper[key]) {
											helper[key] = {}
											helper[key].nombre = o.sucursal; 
											helper[key].productos = [{...o}]
											r.push(helper[key]);
										} else {
											helper[key].productos.push({...o})
										}
										return r;
									}, []);
								let nroRegistros = Object.values(datos.solicitudes.reduce( (acc, { id_sucursal, id_almacen, id_grupo}) => {
									if(!acc[id_sucursal])  acc[id_sucursal] =  1 
									if(!acc[id_sucursal+id_almacen]) acc[id_sucursal+id_almacen] = 4
									if(!acc[id_sucursal+id_almacen+id_grupo])  acc[id_sucursal+id_almacen+id_grupo] = 1
									return acc
								}, {})).reduce((ac,va) => ac+va);
								var x = 40, y = 95, itemsPorPagina = 53, items = 0, pagina = 1, totalPaginas = Math.ceil(nroRegistros / itemsPorPagina);
								var stream = doc.pipe(blobStream());
								var fechaActual = new Date();
								filtro.hoy = fechaActual;
								let metadata = "Impreso: "+$scope.formatoFechaHora(filtro.hoy)+"                  Usuario:"+$scope.usuario.nombre_usuario
								doc.font('Helvetica', 8);
								$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
									for (let i = 0; i < sucursales.length; i++) {
										const sucursal = sucursales[i];
										doc.rect(x, y, 552, 12).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 8).text(sucursal.nombre, x, y + 3 , { width: 552, align:"center"})
										y += 12, items++
										if(items === itemsPorPagina) {
											x = 40, y = 95, items = 0, pagina++
											doc.addPage({ size: 'letter', margin: 10, compress: false });
											$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
										}
										var help = {};
										var almacenes = sucursal.productos.reduce(function (r, o) {
											var ky = o.almacen;
											if (!help[ky]) {
												help[ky] = {}
												help[ky].nombre = o.almacen; 
												help[ky].productos = [{...o}]
												r.push(help[ky]);
											} else {
												help[ky].productos.push({...o})
											}
											return r;
										}, []);
										for (let j = 0; j < almacenes.length; j++) {
											const almacen = almacenes[j];
											doc.font('Helvetica-Bold', 8).text(almacen.nombre ? almacen.nombre.toUpperCase() : "", x + 20, y + 4 )
											y += 12, items++;
											if(items === itemsPorPagina) {
												x = 40, y = 95, items = 0, pagina++
												doc.addPage({ size: 'letter', margin: 10, compress: false });
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
											}
											const grupos = Object.values(almacen.productos.reduce(( acc, { grupo, costo, cantidad }) => {
												if (!acc[grupo]) {
													acc[grupo] = { grupo, costo: costo && cantidad ? costo*cantidad*0.87 : 0 };
												} else {
													acc[grupo].costo += costo && cantidad ? costo*cantidad*0.87 : 0;
												}
												return acc;
											}, Object.create(null)));
											doc.text("ITEM", 201, y, {width: 140, align:"center"})
											doc.text("TOTAL", 341, y, {width: 70, align:"center"})
											doc.rect(197, y + 8, 210, 0).stroke();
											y += 12, items++;
											if(items === itemsPorPagina) {
												x = 40, y = 95, items = 0, pagina++
												doc.addPage({ size: 'letter', margin: 10, compress: false });
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
											}
											let totalGrupo = 0
											for (let l = 0; l < grupos.length; l++) {
												const reg = grupos[l];
												let costoGrupo = reg ? reg.costo : 0
												doc.font('Helvetica', 8).text( reg ? reg.grupo : "", 201, y, {width: 140 })
												doc.text( number_format_negativo_to_positvo(costoGrupo, 2), 341, y, { width: 65, align:"right"})
												totalGrupo += costoGrupo
												y += 12, items++;
												if(items === itemsPorPagina) {
													x = 40, y = 95, items = 0, pagina++
													doc.addPage({ size: 'letter', margin: 10, compress: false });
													$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
												}
											}
											doc.rect( 197, y - 3, 210, 0).stroke();
											doc.font('Helvetica-Bold', 8).text("TOTAL", 201, y, {width: 140})
											if(totalGrupo === NaN) console.log(totalGrupo);
											doc.text(number_format_negativo_to_positvo(totalGrupo, 2), 341, y, {width: 65, align:"right"})
											y += 12, items++;
											if(items === itemsPorPagina) {
												x = 40, y = 95, items = 0, pagina++
												doc.addPage({ size: 'letter', margin: 10, compress: false });
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"RESUMEN", metadata, pagina, totalPaginas)
											}
										}
									}
								doc.end();
								stream.on('finish', function () {
									var fileURL = stream.toBlobURL('application/pdf');
									window.open(fileURL, '_blank', 'location=no');
									SweetAlert.swal({
										title: 'Finalizado!',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false
									})
								});
								$scope.pedido = {}
							})
						} catch (e) {
							SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
						}
					} else {
						SweetAlert.swal("", "No existen registros en el rango de fechas", "warning");
					}
				} else {
					SweetAlert.swal("", datos.mensaje, "error");
				}

			}
			$scope.GenerarReportePdfDocumentos = async (filtro) => {
				SweetAlert.swal({
					title: 'Recuperando registros...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var datos = await ObtenerSolicitudesReposicion(filtro, filtro.detalle)
				if (!datos.hasErr) {
					if (datos.solicitudes.length > 0) {
						SweetAlert.update({ title: "Construyendo archivo pdf...." });
						convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
							if (filtro.detalle) {
								var doc = new PDFDocument({ size: 'letter', layout: 'landscape', margin: 10, compress: false }); //[612, 792]
								var x= 30, y = 95, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(datos.solicitudes.length / itemsPorPagina);
								var stream = doc.pipe(blobStream());
								filtro.hoy = new Date();
								let metadata = "Impreso: "+$scope.formatoFechaHora(filtro.hoy)+"                  Usuario:"+$scope.usuario.nombre_usuario
								$scope.dibujarCabeceraReportePdfLandscape(doc, datos.solicitudes, filtro, imagenEmpresa, "REPORTE DETALLADO DE CONSUMOS", "POR DUCUMENTOS", metadata, pagina, totalPaginas)
								doc.lineGap(-2)
								doc.rect(x, y, 732, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 7)
								doc.text("N°", 30 , y+3, {width:30, align:"center"} )
								doc.text("Doc.", 60 , y+3, {width:30, align:"center"} )
								doc.text("Doc. ISO", 90, y+3, {width:35, align:"center"} )
								doc.text("SUCURSAL", 125 , y+3, {width:82, align:"center"} )
								doc.text("ALMACÉN", 207, y+3, {width:80, align:"center"} )
								doc.text("FECHA", 287, y+3, {width:50, align:"center"} )
								doc.text("USUARIO", 337, y+3, {width:50, align:"center"} )
								doc.text("ESTADO", 387, y+3, {width:50, align:"center"} )
								doc.text("MONTO", 437, y+3, {width:40, align:"center"} )
								doc.text("CÓDIGO", 477, y+3, {width:50, align:"center"} )
								doc.text("DETALLE", 527, y+3, {width:155, align:"center"} )
								doc.text("UNIDAD", 682, y+3, {width:40, align:"center"} )
								doc.text("CANTIDAD", 722, y+3, {width:40, align:"center"} )
								y += 15;
								doc.font('Helvetica', 7)
								for (var i = 0; i < datos.solicitudes.length && items <= itemsPorPagina; i++) {
									doc.text(i + 1, 32, y + 3, { width: 28 })
									doc.text(datos.solicitudes[i].doc ? datos.solicitudes[i].doc : '', 62, y + 3, { width: 28 })
									doc.text(datos.solicitudes[i].doc_iso ? datos.solicitudes[i].doc_iso : '', 92, y + 3, { width: 33 })
									doc.text(datos.solicitudes[i].sucursal ? datos.solicitudes[i].sucursal.toUpperCase() : '', 127, y + 3, { width: 80 })
									doc.text(datos.solicitudes[i].almacen ? datos.solicitudes[i].almacen.toUpperCase() : '', 209, y + 3, { width: 78 })
									doc.text(datos.solicitudes[i].fecha ? $scope.fechaATexto(datos.solicitudes[i].fecha) : '', 289, y + 3, { width: 48 })
									doc.text(datos.solicitudes[i].usuario ? datos.solicitudes[i].usuario : '', 339, y + 3, { width: 48 })
									doc.text(datos.solicitudes[i].estado ? datos.solicitudes[i].estado : '', 389, y + 3, { width: 48 })
									doc.text(datos.solicitudes[i].monto ? number_format_negativo_to_positvo((datos.solicitudes[i].monto *0.87), 2) : '', 438, y + 3, { width: 40, align:"right" })
									doc.text(datos.solicitudes[i].codigo ? datos.solicitudes[i].codigo : '', 477, y + 3, { width: 49, align:"right" })
									doc.text(datos.solicitudes[i].detalle ? datos.solicitudes[i].detalle : '', 529, y + 3, { width: 153 })
									doc.text(datos.solicitudes[i].unidad ? datos.solicitudes[i].unidad.toUpperCase() : '', 684, y + 3, { width: 38 })
									doc.text(datos.solicitudes[i].cantidad ? datos.solicitudes[i].cantidad : '', 722, y + 3, { width: 39, align:"right"})
									items++
									y += 15
									if (items === itemsPorPagina) {
										doc.addPage({ size: 'letter', layout: 'landscape', margin: 10, compress: false });
										y = 95;
										items = 0;
										pagina = pagina + 1;
										doc.rect(x, y, 732, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 7)
										doc.text("N°", 30 , y+3, {width:30, align:"center"} )
										doc.text("Doc.", 60 , y+3, {width:30, align:"center"} )
										doc.text("Doc. ISO", 90, y+3, {width:35, align:"center"} )
										doc.text("SUCURSAL", 125 , y+3, {width:82, align:"center"} )
										doc.text("ALMACÉN", 207, y+3, {width:80, align:"center"} )
										doc.text("FECHA", 287, y+3, {width:50, align:"center"} )
										doc.text("USUARIO", 337, y+3, {width:50, align:"center"} )
										doc.text("ESTADO", 387, y+3, {width:50, align:"center"} )
										doc.text("MONTO", 437, y+3, {width:40, align:"center"} )
										doc.text("CÓDIGO", 477, y+3, {width:50, align:"center"} )
										doc.text("DETALLE", 527, y+3, {width:155, align:"center"} )
										doc.text("UNIDAD", 682, y+3, {width:40, align:"center"} )
										doc.text("CANTIDAD", 722, y+3, {width:40, align:"center"} )
										y += 15;
										$scope.dibujarCabeceraReportePdfLandscape(doc, datos.solicitudes, filtro, imagenEmpresa, "REPORTE DETALLADO DE CONSUMOS","POR DUCUMENTOS", metadata, pagina, totalPaginas)
										doc.font('Helvetica', 7)
									}
								}
							} else {
								let data = Object.values(datos.solicitudes.reduce((acc, {id_sucursal, id_almacen, sucursal}, i, solicitudes)=>{
									if(!acc[id_sucursal+id_almacen]){
										acc[id_sucursal]= {
											nombre_sucursal: sucursal,
											almacenes: Object.values(solicitudes.filter(e=>e.id_sucursal===id_sucursal).reduce((ac,{id_almacen, almacen},j, arr) => {
												if(!ac[id_almacen]){
													ac[id_almacen] = {
														nombre_almacen: almacen,
														registros: solicitudes.filter(e=> e.id_almacen===id_almacen)
													}
												}
												return ac
											}, {}))
										}
									}
									return acc
								}, {}));
								let helper = new Map()
								let totalItems = datos.solicitudes.reduce((contador, {id, id_sucursal, id_almacen})=>{
									if(!helper.has(id_sucursal)){
										helper.set(id_sucursal)
										contador += 1;
									}
									if(!helper.has(id_sucursal+id_almacen)){
										helper.set(id_sucursal+id_almacen)
										contador += 1;
									}
									if(!helper.has(id)){
										helper.set(id)
										contador += 1;
									}
									return contador								
								}, 0)
								var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]	
								var x= 40, y = 95, itemsPorPagina = 40, items = 0, pagina = 1, totalPaginas = Math.ceil(totalItems / itemsPorPagina);
								var stream = doc.pipe(blobStream());
								filtro.hoy = new Date();
								let metadata = "Impreso: "+$scope.formatoFechaHora(filtro.hoy)+"                  Usuario:"+$scope.usuario.nombre_usuario
								$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa, "POR DUCUMENTOS", metadata, pagina, totalPaginas)
								doc.font('Helvetica-Bold', 8);
								doc.lineGap(-2)
								doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000')
								doc.text("N°", 40, y + 4, {width: 30, align:"center"} )
								doc.text("Doc.", 70, y + 4, {width: 40, align:"center"} )
								doc.text("Doc. ISO", 110, y + 4, {width: 40, align:"center"} )
								doc.text("Sucursal", 150, y + 4, {width: 106, align:"center"} )
								doc.text("Almacén", 256, y + 4, {width: 106, align:"center"} )
								doc.text("Fecha", 362, y + 4, {width: 50, align:"center"} )
								doc.text("Monto", 412, y + 4, {width: 60, align:"center"} )
								doc.text("Usuario", 472, y + 4, {width: 60, align:"center"} )
								doc.text("Estado", 532, y + 4, {width: 60, align:"center"} )
								y += 15;
								let totalGeneral = 0
								for (let i = 0; i < data.length; i++) {
									const { nombre_sucursal, almacenes} = data[i];
									let totalSucursal = 0
									let sucursal = nombre_sucursal ? nombre_sucursal.toUpperCase() :""
									for (let j = 0; j < almacenes.length; j++) {
										const { nombre_almacen, registros } = almacenes[j];
										let totalAlmacen = 0
										let almacen = nombre_almacen ? nombre_almacen.toUpperCase() : ""
										for (let k = 0; k < registros.length; k++) {
											const { doc:correlativo, doc_iso, fecha, monto, usuario, estado} = registros[k];
											let importe = monto ? monto * 0.87 : 0;
											doc.font("Helvetica", 7)
											doc.text(i + 1, 42, y + 3, { width: 28 })
											doc.text(correlativo ? correlativo : '', 74, y + 3, { width: 36 })
											doc.text(doc_iso ? doc_iso : '', 114, y + 3, { width: 36 })
											doc.text(sucursal ? sucursal : '', 152, y + 3, { width: 104 })
											doc.text(almacen ? almacen : '', 258, y + 3, { width: 104 })
											doc.text(fecha ? $scope.fechaATexto(fecha) : '', 364, y + 3, { width: 48, align: 'center' })
											doc.text(importe ? number_format_negativo_to_positvo(importe, 2) : '', 414, y + 3, { width: 56, align: 'right' })
											doc.text(usuario ? usuario.toUpperCase() : '', 475, y + 3, { width: 57 })
											doc.text(estado ? estado : '', 532, y + 3, { width: 58, align: 'center' })
											totalAlmacen += importe
											y += 15;
											items++;
											if (items === itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa, "POR DUCUMENTOS", metadata, pagina, totalPaginas)
												doc.font('Helvetica-Bold', 8);
												doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000')
												doc.text("N°", 40, y + 4, {width: 30, align:"center"} )
												doc.text("Doc.", 70, y + 4, {width: 40, align:"center"} )
												doc.text("Doc. ISO", 110, y + 4, {width: 40, align:"center"} )
												doc.text("Sucursal", 150, y + 4, {width: 106, align:"center"} )
												doc.text("Almacén", 256, y + 4, {width: 106, align:"center"} )
												doc.text("Fecha", 362, y + 4, {width: 50, align:"center"} )
												doc.text("Monto", 412, y + 4, {width: 60, align:"center"} )
												doc.text("Usuario", 472, y + 4, {width: 60, align:"center"} )
												doc.text("Estado", 532, y + 4, {width: 60, align:"center"} )
												y += 15;
											}
										}
										doc.rect(254, y, 337, 0).stroke()
										doc.font("Helvetica-Bold", 7).text("TOTAL "+almacen, 258, y + 3)
										doc.text(totalAlmacen ? number_format_negativo_to_positvo(totalAlmacen, 2) : '', 414, y + 3, { width: 56, align: 'right' })
										totalSucursal += totalAlmacen
										y += 15;
										items++;
										if (items === itemsPorPagina) {
											doc.addPage({ size: [612, 792], margin: 10 });
											y = 95;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa, "POR DUCUMENTOS", metadata, pagina, totalPaginas)
											doc.font('Helvetica-Bold', 8);
											doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000')
											doc.text("N°", 40, y + 4, {width: 30, align:"center"} )
											doc.text("Doc.", 70, y + 4, {width: 40, align:"center"} )
											doc.text("Doc. ISO", 110, y + 4, {width: 40, align:"center"} )
											doc.text("Sucursal", 150, y + 4, {width: 106, align:"center"} )
											doc.text("Almacén", 256, y + 4, {width: 106, align:"center"} )
											doc.text("Fecha", 362, y + 4, {width: 50, align:"center"} )
											doc.text("Monto", 412, y + 4, {width: 60, align:"center"} )
											doc.text("Usuario", 472, y + 4, {width: 60, align:"center"} )
											doc.text("Estado", 532, y + 4, {width: 60, align:"center"} )
											y += 15;
										}
									}
									doc.rect(148, y, 444, 0).stroke()
									doc.font("Helvetica-Bold", 7).text("TOTAL "+sucursal, 150, y + 3)
									doc.text(totalSucursal ? number_format_negativo_to_positvo(totalSucursal, 2) : '', 414, y + 3, { width: 56, align: 'right' })
									totalGeneral += totalSucursal
									y += 15;
									items++;
									if (items === itemsPorPagina) {
										doc.addPage({ size: [612, 792], margin: 10 });
										y = 95;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa, "POR DUCUMENTOS", metadata, pagina, totalPaginas)
										doc.font('Helvetica-Bold', 8);
										doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000')
										doc.text("N°", 40, y + 4, {width: 30, align:"center"} )
										doc.text("Doc.", 70, y + 4, {width: 40, align:"center"} )
										doc.text("Doc. ISO", 110, y + 4, {width: 40, align:"center"} )
										doc.text("Sucursal", 150, y + 4, {width: 106, align:"center"} )
										doc.text("Almacén", 256, y + 4, {width: 106, align:"center"} )
										doc.text("Fecha", 362, y + 4, {width: 50, align:"center"} )
										doc.text("Monto", 412, y + 4, {width: 60, align:"center"} )
										doc.text("Usuario", 472, y + 4, {width: 60, align:"center"} )
										doc.text("Estado", 532, y + 4, {width: 60, align:"center"} )
										y += 15;
									}
								}
								doc.rect(70, y, 522, 0).stroke()
								doc.font("Helvetica-Bold", 7).text("TOTAL GENERAL", 68, y + 3)
								doc.text(totalGeneral ? number_format_negativo_to_positvo(totalGeneral, 2) : '', 414, y + 3, { width: 56, align: 'right' })
								y += 15;
								items++;
								if (items === itemsPorPagina) {
									doc.addPage({ size: [612, 792], margin: 10 });
									y = 95;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa, "POR DUCUMENTOS", metadata, pagina, totalPaginas)
									doc.font('Helvetica-Bold', 8);
									doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000')
									doc.text("N°", 40, y + 4, {width: 30, align:"center"} )
									doc.text("Doc.", 70, y + 4, {width: 40, align:"center"} )
									doc.text("Doc. ISO", 110, y + 4, {width: 40, align:"center"} )
									doc.text("Sucursal", 150, y + 4, {width: 106, align:"center"} )
									doc.text("Almacén", 256, y + 4, {width: 106, align:"center"} )
									doc.text("Fecha", 362, y + 4, {width: 50, align:"center"} )
									doc.text("Monto", 412, y + 4, {width: 60, align:"center"} )
									doc.text("Usuario", 472, y + 4, {width: 60, align:"center"} )
									doc.text("Estado", 532, y + 4, {width: 60, align:"center"} )
									y += 15;
								}
							}
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
							$scope.pedido = {}
						})
					} else {
						SweetAlert.swal("", "No existen registros en el rango de fechas", "warning");
					}
				} else {
					SweetAlert.swal("", datos.mensaje, "error");
				}
			}
			$scope.GenerarReportePdfProductos = async (filtro) => {
				SweetAlert.swal({
					title: 'Recuperando registros...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var datos = await ObtenerSolicitudesReposicion(filtro, true)	
				if (datos.hasErr) return SweetAlert.swal("", datos.mensaje, "error");
					if (datos.solicitudes.length > 0) {
						try {
							convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
								SweetAlert.update({ title: "Construyendo archivo pdf...." });
								var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]
								var helper = {};
								var sucursales = datos.solicitudes.reduce(function (r, o) {
									let key = o.sucursal;
									if (!helper[key]) {
										helper[key] = {}
										helper[key].nombre = o.sucursal; 
										helper[key].productos = [{...o}]
										r.push(helper[key]);
									} else {
										helper[key].productos.push({...o})
									}
									return r;
								}, []);
								let nroRegistros = Object.values(datos.solicitudes.reduce( (acc, { id_sucursal, id_almacen, id_grupo, id_producto}) => {
									if(!acc[id_sucursal]) acc[id_sucursal] =  1 
									if(!acc[id_sucursal+id_almacen]) acc[id_sucursal+id_almacen] = 1
									if(!acc[id_sucursal+id_almacen+id_grupo]) acc[id_sucursal+id_almacen+id_grupo] = 4
									if(!acc[id_sucursal+id_almacen+id_grupo+id_producto]) acc[id_sucursal+id_almacen+id_grupo+id_producto] = 1
									return acc
								}, {})).reduce((ac,va) => ac+=va, 0);
								var x = 40, y = 95, itemsPorPagina = 53, items = 0, pagina = 1, totalPaginas = Math.ceil(nroRegistros / itemsPorPagina);
								var stream = doc.pipe(blobStream());
								var fechaActual = new Date();
								filtro.hoy = fechaActual;
								let metadata = "Impreso: "+$scope.formatoFechaHora(filtro.hoy)+"                  Usuario:"+$scope.usuario.nombre_usuario
								doc.font('Helvetica', 8);
								doc.lineWidth(0.2)
								$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
								for (let i = 0; i < sucursales.length; i++) {
									const sucursal = sucursales[i];
									doc.rect(x, y, 552, 12).fill('#95BED3').fillColor('#000').font("Helvetica-Bold",8).text(sucursal.nombre, x, y +3, { width:612, align:"center"})
									y += 12, items++;
									if(items == itemsPorPagina) {
										doc.addPage({ size: [612, 792], margin: 10 });
										y = 95;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
									}
									var helpe = {};
									var almacenes = sucursal.productos.reduce(function (r, o) {
										let key = o.almacen;
										if (!helpe[key]) {
											helpe[key] = {}
											helpe[key].nombre = o.almacen; 
											helpe[key].productos = [{...o}]
											r.push(helpe[key]);
										} else {
											helpe[key].productos.push({...o})
										}
										return r;
									}, []);
									for (let j = 0; j < almacenes.length; j++) {
										const almacen = almacenes[j];
										doc.font("Helvetica-Bold", 7).text(almacen.nombre, x, y+3)
										y += 12, items++;
										if(items == itemsPorPagina) {
											doc.addPage({ size: [612, 792], margin: 10 });
											y = 95;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
										}
										var help = {};
										var grupos = almacen.productos.reduce(function (r, o) {
											let key = o.grupo;
											if (!help[key]) {
												help[key] = {}
												help[key].nombre = o.grupo; 
												help[key].productos = [{...o}]
												r.push(help[key]);
											} else {
												help[key].productos.push({...o})
											}
											return r;
										}, []);
										for (let k = 0; k < grupos.length; k++) {
											const grupo = grupos[k]
											const data = Object.values(grupo.productos.reduce((acc, { id_sucursal, id_almacen, id_grupo, id_producto, codigo, cantidad, costo, producto }) => {
												if (!acc[id_sucursal + id_almacen + id_grupo + id_producto]) {
													acc[id_sucursal + id_almacen + id_grupo + id_producto] = { codigo, producto, costo, cantidad, nroRegistros: 1, total: (costo * 0.87) * cantidad };
												} else {
													let total = costo * 0.87 * cantidad;
													acc[id_sucursal + id_almacen + id_grupo + id_producto].cantidad += cantidad;
													acc[id_sucursal + id_almacen + id_grupo + id_producto].total += +total.toFixed(2)
													acc[id_sucursal + id_almacen + id_grupo + id_producto].nroRegistros ++;
												}
												return acc;
											}, Object.create(null)));
											doc.font("Helvetica-Bold", 7).text(grupo.nombre, x + 30, y + 3)
											y += 12, items++;
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
											}
											let total = 0
											doc.text("CÓDIGO", 90 , y + 4, { width: 50, align:"center"})
											doc.text("ÍTEM", 140, y + 4, { width: 282, align:"center"})
											doc.text("CANTIDAD", 422, y + 4, { width: 60, align:"center"})
											doc.text("C/U PROM.", 482, y + 4, { width: 50, align:"center"})
											doc.text("TOTAL", 532, y + 4, { width: 60, align:"center"})
											y += 12, items++;
											doc.rect(90,  y, 502, 0).stroke();
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
											}
											for (let h = 0; h < data.length; h++) {
												const producto = data[h];
												let subtotal = producto.total ? producto.total : 0

												total += subtotal
												doc.font("Helvetica",7)
												doc.text(producto.codigo, 92, y + 3, { width:48})
												doc.text(producto.producto, 142, y + 3, { width:280})
												doc.text(producto.cantidad % 1 == 0 ? producto.cantidad : number_format_negativo_to_positvo(producto.cantidad, 2), 424, y + 3, { width:58, align:"right"})
												doc.text(number_format_negativo_to_positvo(subtotal / producto.cantidad, 3), 484, y + 3, { width:48, align: "right"})
												doc.text(number_format_negativo_to_positvo(subtotal, 2), 534, y + 3, { width:58, align: "right"})
												y += 12, items++;
												if(items == itemsPorPagina) {
													doc.addPage({ size: [612, 792], margin: 10 });
													y = 95;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
												}
											}
											doc.rect( 90, y, 502, 0).stroke();
											doc.font("Helvetica-Bold", 7).text("TOTAL", 122, y + 3, { width: 45, align:"center"})
											doc.text(number_format_negativo_to_positvo(total, 2), 534, y + 3, { width: 58, align:"right"})
											y += 12, items++;
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLE POR GRUPOS", metadata, pagina, totalPaginas)
											}
										}
									}
								}
								
								doc.end();
								stream.on('finish', function () {
									var fileURL = stream.toBlobURL('application/pdf');
									window.open(fileURL, '_blank', 'location=no');
									SweetAlert.swal({
										title: 'Finalizado!',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false
									})
								});
								$scope.pedido = {}
							})
						} catch (e) {
							SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
						}
					}else{
						SweetAlert.swal("", "No existen registros en el rango de fechas", "warning");
					}
			}
			$scope.GenerarReportePdfDetalle = async (filtro) => {
				SweetAlert.swal({
					title: 'Recuperando registros...',
					icon: 'info',
					iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var datos = await ObtenerSolicitudesReposicion(filtro, true)	
				if (datos.hasErr) return SweetAlert.swal("", datos.mensaje, "error");
					if (datos.solicitudes.length > 0) {
						try {
							convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
								SweetAlert.update({ title: "Construyendo archivo pdf...." });
								var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]
								var helper = {};
								var sucursales = datos.solicitudes.reduce(function (r, o) {
									let key = o.sucursal;
									if (!helper[key]) {
										helper[key] = {}
										helper[key].nombre = o.sucursal; 
										helper[key].productos = [{...o}]
										r.push(helper[key]);
									} else {
										helper[key].productos.push({...o})
									}
									return r;
								}, []);
								let nroRegistros = Object.values(datos.solicitudes.reduce( (acc, { id_sucursal, id_almacen, id_grupo, id_detalle}) => {
									if(!acc[id_sucursal]) acc[id_sucursal] =  1 
									if(!acc[id_sucursal+id_almacen]) acc[id_sucursal+id_almacen] = 1
									if(!acc[id_sucursal+id_almacen+id_grupo]) acc[id_sucursal+id_almacen+id_grupo] = 3
									if(!acc[id_detalle]) acc[id_detalle] = 1
									return acc
								}, {})).reduce((ac,va) => ac+=va, 0);
								var x = 40, y = 95, itemsPorPagina = 53, items = 0, pagina = 1, totalPaginas = Math.ceil(nroRegistros / itemsPorPagina);
								var stream = doc.pipe(blobStream());
								var fechaActual = new Date();
								filtro.hoy = fechaActual;
								let metadata = "Impreso: "+$scope.formatoFechaHora(filtro.hoy)+"                  Usuario:"+$scope.usuario.nombre_usuario
								doc.font('Helvetica', 8);
								doc.lineWidth(0.2)
								doc.lineGap(-2)
								$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
								for (let i = 0; i < sucursales.length; i++) {
									const sucursal = sucursales[i];
									doc.rect(x, y, 552, 12).fill('#95BED3').fillColor('#000').font("Helvetica-Bold",8).text(sucursal.nombre, x, y +3, { width:612, align:"center"})
									y += 12, items++;
									if(items == itemsPorPagina) {
										doc.addPage({ size: [612, 792], margin: 10 });
										y = 95;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
									}
									var helpe = {};
									var almacenes = sucursal.productos.reduce(function (r, o) {
										let key = o.almacen;
										if (!helpe[key]) {
											helpe[key] = {}
											helpe[key].nombre = o.almacen; 
											helpe[key].productos = [{...o}]
											r.push(helpe[key]);
										} else {
											helpe[key].productos.push({...o})
										}
										return r;
									}, []);
									for (let j = 0; j < almacenes.length; j++) {
										const almacen = almacenes[j];
										doc.font("Helvetica-Bold", 7).text(almacen.nombre, x, y+3)
										y += 12, items++;
										if(items == itemsPorPagina) {
											doc.addPage({ size: [612, 792], margin: 10 });
											y = 95;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
										}
										var help = {};
										var grupos = almacen.productos.reduce(function (r, o) {
											let key = o.grupo;
											if (!help[key]) {
												help[key] = {}
												help[key].nombre = o.grupo; 
												help[key].productos = [{...o}]
												r.push(help[key]);
											} else {
												help[key].productos.push({...o})
											}
											return r;
										}, []);
										for (let k = 0; k < grupos.length; k++) {
											const grupo = grupos[k]
											doc.font("Helvetica-Bold", 7).text(grupo.nombre, x + 30, y + 3)
											y += 12, items++;
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
											}
											let total = 0
											doc.text("FECHA", 90 , y + 4, { width: 50, align:"center"})
											doc.text("CÓDIGO", 140 , y + 4, { width: 50, align:"center"})
											doc.text("ÍTEM", 190, y + 4, { width: 242, align:"center"})
											doc.text("CANTIDAD", 432, y + 4, { width: 50, align:"center"})
											doc.text("C/U PROM.", 482, y + 4, { width: 50, align:"center"})
											doc.text("TOTAL", 532, y + 4, { width: 60, align:"center"})
											y += 12, items++;
											doc.rect(90,  y, 502, 0).stroke();
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
											}
											for (let h = 0; h < grupo.productos.length; h++) {
												const producto = grupo.productos[h];
												let subtotal = producto.costo && producto.cantidad ? producto.costo * producto.cantidad * 0.87 : 0
												total += subtotal
												doc.font("Helvetica",7)
												doc.text($scope.fechaATexto(producto.fecha), 92, y + 3, { width:48, align:"center"})
												doc.text(producto.codigo, 142, y + 3, { width:46, align:"right"})
												doc.text(producto.producto, 192, y + 3, { width:240})
												doc.text(producto.cantidad % 1 == 0 ? producto.cantidad : number_format_negativo_to_positvo(producto.cantidad, 2), 434, y + 3, { width:48, align:"right"})
												doc.text(number_format_negativo_to_positvo(producto.costo ? producto.costo : 0, 3), 484, y + 3, { width:48, align: "right"})
												doc.text(number_format_negativo_to_positvo(subtotal, 2), 534, y + 3, { width:58, align: "right"})
												y += 12, items++;
												if(items == itemsPorPagina) {
													doc.addPage({ size: [612, 792], margin: 10 });
													y = 95;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
												}
											}
											doc.rect( 90, y, 502, 0).stroke();
											doc.font("Helvetica-Bold", 7).text("TOTAL", 192, y + 3, { width: 240})
											doc.text(number_format_negativo_to_positvo(total, 2), 534, y + 3, { width: 58, align:"right"})
											y += 12, items++;
											if(items == itemsPorPagina) {
												doc.addPage({ size: [612, 792], margin: 10 });
												y = 95;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraReportePdf(doc, datos.solicitudes, filtro, imagenEmpresa,"DETALLADO GENERAL", metadata, pagina, totalPaginas)
											}
										}
									}
								}
								
								doc.end();
								stream.on('finish', function () {
									var fileURL = stream.toBlobURL('application/pdf');
									window.open(fileURL, '_blank', 'location=no');
									SweetAlert.swal({
										title: 'Finalizado!',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false
									})
								});
								$scope.pedido = {}
							})
						} catch (e) {
							SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
						}
					}else{
						SweetAlert.swal("", "No existen registros en el rango de fechas", "warning");
					}
			}

			$scope.dibujarCabeceraReportePdf = function (doc, reporte, filtro, logo, subtitulo, meta, pagina, paginas) {
				try {
					if (logo.length > 0 && logo !== "error") {
						if (logo) {
							doc.image(logo, 47, 33, { fit: [78, 45] }); 
						}
					}
					doc.lineWidth(0.5)
					doc.rect(40, 30, 552, 50).stroke();
					doc.rect(130, 30, 0, 50).stroke();
					doc.rect(482, 30, 0, 50).stroke();
	
					doc.font('Helvetica-Bold', 10);
					doc.text("REPORTE DE CONSUMOS", 0, 40, { align: "center" });
					doc.font('Helvetica-Bold', 9);
					doc.text(subtitulo, 0, 53, { align: "center" });
					doc.font('Helvetica-Bold', 8);
					let desde = filtro.fechaInicioTexto != "" ? filtro.fechaInicioTexto : "01/"+(filtro.hoy.getMonth()< 9 ? ("0"+(filtro.hoy.getMonth()+1)) : (filtro.hoy.getMonth()+1) )+"/"+filtro.hoy.getFullYear();
					let hasta = filtro.fechaFinTexto != "" ? filtro.fechaFinTexto : $scope.fechaATexto(filtro.hoy);
					doc.text("Del "+ desde +" al "+ hasta, 0, 65, { align: "center" });
					doc.text("FECHA DE IMPRESIÓN", 482, 40, { align: "center", width: 110});
					doc.font('Helvetica', 8);
					doc.text($scope.fechaATexto(filtro.hoy), 482, 65, { align: "center", width: 110 });
					doc.font('Helvetica-Bold', 7).text(pagina + " de " + paginas, 0, 740, { align: 'center'})
					doc.font('Helvetica', 6).text(meta, 0, 755, { align: 'center'})
				} catch (e) {
					console.error('Error al generar pdf...',e);
					return SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
				}
			}
			$scope.dibujarCabeceraReportePdfLandscape = function (doc, reporte, filtro, logo, titulo, subtitulo, meta, pagina, paginas) {
				try {
					if (logo.length > 0 && logo !== "error") {
						if (logo) {
							doc.image(logo, 47, 33, { fit: [78, 45] }); 
						}
					}
					doc.lineWidth(0.5)
					doc.rect(30, 30, 732, 50).stroke();
					doc.rect(130, 30, 0, 50).stroke();
					doc.rect(652, 30, 0, 50).stroke();
	
					doc.font('Helvetica-Bold', 10);
					doc.text(titulo, 0, 40, { align: "center" });
					doc.font('Helvetica-Bold', 9);
					doc.text(subtitulo, 0, 53, { align: "center" });
					doc.font('Helvetica-Bold', 8);
					let desde = filtro.fechaInicioTexto != "" ? filtro.fechaInicioTexto : "01/"+(filtro.hoy.getMonth()< 9 ? ("0"+(filtro.hoy.getMonth()+1)) : (filtro.hoy.getMonth()+1) )+"/"+filtro.hoy.getFullYear();
					let hasta = filtro.fechaFinTexto != "" ? filtro.fechaFinTexto : $scope.fechaATexto(filtro.hoy);
					doc.text("Del "+ desde +" al "+ hasta, 0, 65, { align: "center" });
					doc.text("FECHA DE IMPRESIÓN", 652, 40, { align: "center", width: 110});
					doc.font('Helvetica', 8);
					doc.text($scope.fechaATexto(filtro.hoy), 652, 65, { align: "center", width: 110 });
					doc.font('Helvetica-Bold', 7).text(pagina + " de " + paginas, 0, 575, { align: 'center'})
					doc.font('Helvetica', 6).text(meta, 0, 582, { align: 'center'})
				} catch (e) {
					console.error('Error al generar pdf...',e);
					return SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
				}
			}
			$scope.generarComprobante = async function (solicitud) {
				try {
					let datos = []
					let registrosPorAlmacen = []
					for (const sol of $scope.solicitudesOperaciones) {
						sol.ids = []
						sol.seleccinado = solicitud ? sol.id == solicitud.id ? true : sol.seleccinado : sol.seleccinado
						if (sol.seleccinado) {
							let bandera = false
							if (registrosPorAlmacen.length > 0) {
								for (const solicitudPorAlmacen of registrosPorAlmacen) {
									if (sol.almacen.id == solicitudPorAlmacen.almacen.id) {
										if (new Date(sol.fecha).getTime() < solicitudPorAlmacen.fechaMenor.getTime()) {
											solicitudPorAlmacen.fechaMenor = new Date(sol.fecha)
										}
										if (new Date(sol.fecha).getTime() > solicitudPorAlmacen.fechaMayor.getTime()) {
											solicitudPorAlmacen.fechaMayor = new Date(sol.fecha)
										}
										bandera = true
										solicitudPorAlmacen.ids.push(sol.id)
									}
								}
								if (!bandera) {
									sol.fechaMenor = new Date(sol.fecha)
									sol.fechaMayor = new Date(sol.fecha)
									sol.ids.push(sol.id)
									registrosPorAlmacen.push(sol)

								}
							} else {
								sol.fechaMenor = new Date(sol.fecha)
								sol.fechaMayor = new Date(sol.fecha)
								sol.ids.push(sol.id)
								registrosPorAlmacen.push(sol)
							}
						}

					}
					for (const sol of registrosPorAlmacen) {
						let res = await OptenerDetalleValuadoSolicitud(sol.ids)
						sol.detalles = res
					}
					$scope.crearNuevoComprobante('solicitudesAlmacen', registrosPorAlmacen)

				} catch (error) {
					console.log(error)
				}
			}

			$scope.convertirFechaC = function (fecha) {
				var dia = fecha.split('/')[0];
				var mes = fecha.split('/')[1];
				var año = fecha.split('/')[2];
				if (año == undefined) {
					año = new Date().getFullYear();
				}
				var f = new Date()
				return mes + '/' + dia + '/' + año
			}

			$scope.validarFechaAlmacenes = function (fecha) {
				$scope.fechaNoValida = false;
				$scope.fechaSiguiente = new Date();
				$scope.fechaSiguiente.setDate($scope.fechaSiguiente.getDate() + 1)
				var fechaCompra =new Date($scope.convertirFechaC(fecha))
				if (fechaCompra > $scope.fechaSiguiente) {
					$scope.fechaNoValida = true;
				}
			}
			$scope.modelOptions = {
				debounce: {
				default: 500,
				blur: 250
				},
				getterSetter: true
			};
			$scope.imprimirIsoGestionRecepcion = ( { id } ) => {
				if( !id ) return SweetAlert.swal("","<b>ID incorrecto</b><br>No se puedo generar el reporte ISO", "warning");
				try {
					SweetAlert.swal({
						icon: 'info',
						iconHtml: '<i class="fa fa-search size-icon"></i>',
						html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div><b>Obteniendo Datos</b><br>Espere por favor...',
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					blockUI.noOpen = true;
					ObtenerDatosIsoOrdenSolicitud( id, false )
					.then(({ error, data, message, messageType}) => {
						if(error) return SweetAlert.swal( "", message, messageType);
						convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
							SweetAlert.update({ html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div><b>Generando Reporte</b><br>Espere por favor...'})
							var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
							var stream = doc.pipe(blobStream());
							await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
							await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
							var y = 195, itemsPorPagina = 35, items = 0, pagina = 1, totalPaginas = Math.ceil(data.detalle.length / itemsPorPagina);
							let meta = "Creado por: "+data.nombre_usuario+"		Creado: "+$scope.fechaATexto(data.createdAt)+"		Impreso por: "+$scope.usuario.nombre_usuario+"		Impreso: "+$scope.fechaATexto(new Date())
							$scope.headerIsoReposicionRecepcion(doc, pagina, totalPaginas, meta, logo, data );
							for (var i = 0; i < data.detalle.length && items <= itemsPorPagina; i++) {
								let { cantidad_maxima, codigo, consumo, extra, nombre, observacion, saldo, unidad_medida, cantidad_fijo } = data.detalle[i]
								doc.lineWidth(0.4).rect(60, y, 507, 15).stroke();
								doc.font('Bookman', 7).text(i + 1, 60, y + 4, { width: 25, align: "center" });
								doc.text(codigo ? codigo : "", 88, y + 4, { width: 52 });
								doc.lineGap(-2.7).text(nombre ? nombre : "", 141, nombre && nombre.length >= 21 ? y + 1 : y + 4, { width: 102, });
								doc.text(unidad_medida ? unidad_medida : "", 243, y + 4, { width: 30, align: "center" });
								doc.text(consumo ? number_format_negativo_to_positvo(consumo, 2) : "", 273, y + 4, { width: 39, align: "right" });
								doc.text(extra ? extra < 0 ? "-"+number_format_negativo_to_positvo(extra, 2) : number_format_negativo_to_positvo(extra, 2) : "0.00", 313, y + 4, { width: 29, align: "right" });
								doc.text(extra ? number_format_negativo_to_positvo(consumo + extra, 2) : number_format_negativo_to_positvo(consumo, 2 ), 343, y + 4, { width: 49, align: "right" });
								doc.text(saldo ? number_format_negativo_to_positvo(saldo, 2)  : "", 393, y + 4, { width: 39, align: "right" });
								doc.text(data.usar_maximos_fijos ? cantidad_fijo ? number_format_negativo_to_positvo(cantidad_fijo, 2) : ""  : cantidad_maxima ? number_format_negativo_to_positvo(cantidad_maxima, 2) : "" , 433, y + 4, { width: 39, align: "right" });
								doc.text(observacion ? observacion  : "", 475, observacion && observacion.length > 21 ? y + 1 : y + 2, { width: 92 });
								doc.rect(85, y, 0, 15).stroke();
								doc.rect(140, y, 0, 15).stroke();
								doc.rect(243, y, 0, 15).stroke();
								doc.rect(273, y, 0, 15).stroke();
								doc.rect(313, y, 0, 15).stroke();
								doc.rect(343, y, 0, 15).stroke();
								doc.rect(393, y, 0, 15).stroke();
								doc.rect(433, y, 0, 15).stroke();
								doc.rect(473, y, 0, 15).stroke();
								doc.font('Bookman', 6);
								y = y + 15;
								items++;
								if (items === itemsPorPagina ) {
									doc.addPage({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
									items = 0;
									pagina = pagina + 1;
									y = 195;
									$scope.headerIsoReposicionRecepcion(doc, pagina, totalPaginas, meta, logo, data );

								}
							}
							doc.end();
							stream.on('finish', function () {
								swal.close();
								var fileURL = stream.toBlobURL('application/pdf');
								window.open(fileURL, '_blank', 'location=no');
							});
							blockUI.stop();
							$scope.$evalAsync()
						});

					})	
				} catch (e) {
					SweetAlert.swal("","<b>Ocurrió un error al generar ISO</b><br>"+e, "error")
				}
			}
			$scope.imprimirIsoGestionEnvio = ( { id } ) => {
				if(!id ) return SweetAlert.swal("","<b>ID incorrecto</b><br>El ID proporcionado es incorrecto, no se puede generar el documento ISO", "warning");
				try {
					SweetAlert.swal({
						icon: 'info',
						iconHtml: '<i class="fa fa-search size-icon"></i>',
						html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div><b>Obteniendo Datos</b><br>Espere por favor...',
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					blockUI.noOpen = true;
					ObtenerDatosIsoOrdenSolicitud( id, true )
					.then(({ error, data, message, messageType}) => {
						if(error) return SweetAlert.swal( "", message, messageType);
						convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
							SweetAlert.update({ html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div><b>Generando Reporte</b><br>Espere por favor...' })
							var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
							var stream = doc.pipe(blobStream());
							data.detalle = data.detalle.filter( e => {
								if(e.cantidad && e.extra && (e.cantidad + e.extra === 0 )) return 0
								return e
							} )
							await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
							await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
							var y = 215, itemsPorPagina = 35, items = 0, pagina = 1, totalPaginas = Math.ceil(data.detalle.length / itemsPorPagina);
							let meta = "Creado por: "+data.nombre_usuario+"		Creado: "+$scope.fechaATexto(data.createdAt)+"		Impreso por: "+$scope.usuario.nombre_usuario+"		Impreso: "+$scope.fechaATexto(new Date())
							$scope.headerIsoReposicionEnvio(doc, pagina, totalPaginas, meta, logo, data );
							for (var i = 0; i < data.detalle.length && items <= itemsPorPagina; i++) {
								let { codigo, nombre, observacion, unidad_medida, cantidad, extra, cantidad_corregida } = data.detalle[i]
								doc.lineWidth(0.4).rect(60, y, 507, 15).stroke();
								doc.text(i + 1, 60, y+ 4, { width: 30, align: "center" });
								doc.lineGap(-2).text(codigo ? codigo : "", 90, y + 4, { width: 55, align: "center" });
								doc.text( nombre ? nombre : "", 147, nombre && nombre.length > 23 ? y + 1 : y + 4, { width: 103  });
								doc.text( unidad_medida ? unidad_medida : "", 250, y+ 4, { width: 40, align: "center" });
								var reposicion = cantidad + extra
								doc.text( reposicion  ? number_format_negativo_to_positvo(reposicion, 2) : "0.00", 290, y+ 4, { width: 38, align: "right" });
								doc.text( observacion ? observacion : "", 332, y+1, { width: 91 });
								doc.text( "", 423, y+ 4, { width: 48, align: "right" });
								doc.text( "", 473, y+ 4, { width: 94 });
								//tabla
								doc.rect(90, y, 0, 15).stroke();
								doc.rect(145, y, 0, 15).stroke();
								doc.rect(250, y, 0, 15).stroke();
								doc.rect(290, y, 0, 15).stroke();
								doc.rect(330, y, 0, 15).stroke();
								doc.rect(423, y, 0, 15).stroke();
								doc.rect(473, y, 0, 15).stroke();
								y = y + 15;
								items++;
								if (items === itemsPorPagina ) {
									doc.addPage({ size: 'letter', margins: { top: 57, bottom: 10, left: 57, right: 43 }, compress: false });
									items = 0;
									pagina = pagina + 1;
									y = 215;
									$scope.headerIsoReposicionEnvio(doc, pagina, totalPaginas, meta, logo, data );
								}
							}
							doc.end();
							stream.on('finish', function () {
								swal.close();
								var fileURL = stream.toBlobURL('application/pdf');
								window.open(fileURL, '_blank', 'location=no');
							});
							$scope.$evalAsync()
						}); 

					})	
				} catch (e) {
					SweetAlert.swal("","<b>Ocurrió un error al generar ISO</b><br>"+e, "error")
				}
			}
			$scope.headerIsoReposicionRecepcion = ( doc, pagina, totalPaginas, meta, logo, data ) => {
				doc.font('Bookman-Bold', 10);
				if (logo.length > 0 && logo !== "error") {
					if (logo) {
						doc.image(logo, 72, 62, { fit: [100, 51] }); 
					}
				}
				//cuadros
				doc.lineWidth(0.6).rect(60, 60, 507, 55).stroke();
				doc.rect(164, 88, 403, 0).stroke();
				doc.rect(164, 60, 0, 55).stroke();
				doc.rect(431, 60, 0, 55).stroke();

				doc.text( data.cfg_nombre ? data.cfg_nombre.toUpperCase() :"", 164, 70, { width: 267, align: "center" });
				doc.font('Bookman-Bold', 9);
				doc.text("Código:", 243, 95);
				doc.text( data.cfg_codigo ? data.cfg_codigo : "", 283, 95);
				doc.font('Bookman', 9);
				doc.text("Revisión:", 435, 70);
				doc.text( data.cfg_revision ? data.cfg_revision : "", 477, 70);
				doc.text("Fecha de Aprobación", 435, 90, { width: 132 });
				doc.text($scope.fechaATexto( data.cfg_aprobacion ? data.cfg_aprobacion : ""), 435, 100, { width: 132 });

				doc.font('Bookman-Bold', 10);
				doc.text("Sucursal:    ", 62, 135);
				doc.text("Almacén:      ", 62, 150);
				doc.text("Nº:", 380, 135, { width: 55, align:'right'});
				doc.text("Consumo: ", 380, 150, { width: 55, align:'right'});

				doc.text('------------------------------------------', 115, 138);
				doc.text('------------------------------------------', 115, 153);
				doc.text('----------------------------------', 440, 138);
				doc.text('----------------------------------', 440, 153);
				doc.font('Bookman', 9);
				doc.text(data.sucursal ? data.sucursal  : "", 118, 135);
				doc.text(data.almacen ? data.almacen : '', 118, 150);
				doc.text(data.nro_iso ? data.nro_iso : "", 440, 135);
				doc.text(data.desde && data.hasta ? $scope.fechaATexto(data.desde)+ " - " + $scope.fechaATexto(data.hasta)  : "", 440, 150);
				//detalle


				doc.lineWidth(0.4).rect(60, 175, 507, 20).stroke();
				doc.font('Bookman-Bold', 7);
				doc.text("Nº", 60, 181, { width: 25, align: "center" });
				doc.text("Código del Artículo", 85, 177, { width: 55, align: "center" });
				doc.text("Descripción", 140, 181, { width: 103, align: "center" });
				doc.text("Unidad", 243, 181, { width: 30, align: "center" });
				doc.text("Consumo", 273, 181, { width: 40, align: "center" });
				doc.text("Extra", 313, 181, { width: 30, align: "center" });
				doc.text("Reposición", 343, 181, { width: 50, align: "center" });
				doc.text("Saldo Fecha", 393, 177, { width: 40, align: "center" });
				doc.text("Máximo", 433, 181, { width: 40, align: "center" });
				doc.text("Observación Especificaciones", 473, 177, { width: 94, align: "center" });

				//tabla
				doc.rect(85, 175, 0, 20).stroke();
				doc.rect(140, 175, 0, 20).stroke();
				doc.rect(243, 175, 0, 20).stroke();
				doc.rect(273, 175, 0, 20).stroke();
				doc.rect(313, 175, 0, 20).stroke();
				doc.rect(343, 175, 0, 20).stroke();
				doc.rect(393, 175, 0, 20).stroke();
				doc.rect(433, 175, 0, 20).stroke();
				doc.rect(473, 175, 0, 20).stroke();
				
				doc.font('Bookman-Bold', 8);
				doc.text('Página', 284, 745);
				doc.text(pagina + ' de ' + totalPaginas, 317, 745);
				doc.font('Bookman', 6).text( meta, 0, 765,{width: 612, align: 'center'});
			}
			$scope.headerIsoReposicionEnvio = ( doc, pagina, totalPaginas, meta, logo, data ) => {
				doc.font('Bookman-Bold', 10);
				if (logo.length > 0 && logo !== "error") {
					if (logo) {
						doc.image(logo, 72, 62, { fit: [100, 51] }); 
					}
				}
				//cuadros
				doc.lineWidth(0.6).rect(60, 60, 507, 55).stroke();
				doc.rect(164, 88, 403, 0).stroke();
				doc.rect(164, 60, 0, 55).stroke();
				doc.rect(431, 60, 0, 55).stroke();

				doc.text( data.cfg_nombre ? data.cfg_nombre.toUpperCase() :"", 164, 70, { width: 267, align: "center" });
				doc.font('Bookman-Bold', 9);
				doc.text("Código:", 243, 95);
				doc.text( data.cfg_codigo ? data.cfg_codigo : "", 283, 95);
				doc.font('Bookman', 9);
				doc.text("Revisión:", 435, 70);
				doc.text( data.cfg_revision ? data.cfg_revision : "", 477, 70);
				doc.text("Fecha de Aprobación", 435, 90, { width: 132 });
				doc.text($scope.fechaATexto( data.cfg_aprobacion ? data.cfg_aprobacion : ""), 435, 100, { width: 132 });

				doc.font('Bookman-Bold', 10);
				doc.text("Almacén origen:", 61, 125);
				doc.text("Responsable Origen:", 61, 140);
				doc.text("Observación:", 61, 155);
				doc.text("Fecha generación:", 61, 170);


				doc.text("Almacén destino:", 313, 125);
				doc.text("Responsable destino", 313, 140);
				doc.text("Nº:", 313, 155);
				doc.text("Fecha de envío: ", 313, 170);

				doc.font('Bookman', 9);
				doc.text( data.almacen ? data.almacen : '', 150, 125);
				doc.text( data.responsable_origen ? data.responsable_origen.length > 25 ? data.responsable_origen.slice(0, 25).toUpperCase() : data.responsable_origen.toUpperCase()  : "", 170, 140);
				doc.text( data.createdAt ? $scope.fechaATexto(data.createdAt) : "", 160, 170);

				doc.text( data.almacen ? data.almacen : '', 405, 125);
				doc.font('Bookman', 10).text( data.nro_iso ? data.nro_iso : "", 332, 155);


				doc.lineWidth(0.4).rect(60, 195, 507, 20).stroke();
				doc.font('Bookman-Bold', 8);
				doc.text("Nº", 60, 201, { width: 30, align: "center" });
				doc.lineGap(-2).text("Código del Artículo", 90, 196, { width: 55, align: "center" });
				doc.text("Descripción", 145, 201, { width: 105 , align: "center" });
				doc.text("Unidad", 250, 201, { width: 40, align: "center" });
				doc.text("Cantidad", 290, 201, { width: 40, align: "center" });
				doc.text("Observación", 330, 201, { width: 93, align: "center" });
				doc.text("Corrección", 423, 201, { width: 50, align: "center" });
				doc.text("|Detalle del envío", 473, 201, { width: 94, align: "center" });

				//tabla
				doc.rect(90, 195, 0, 20).stroke();
				doc.rect(145, 195, 0, 20).stroke();
				doc.rect(250, 195, 0, 20).stroke();
				doc.rect(290, 195, 0, 20).stroke();
				doc.rect(330, 195, 0, 20).stroke();
				doc.rect(423, 195, 0, 20).stroke();
				doc.rect(473, 195, 0, 20).stroke();
				
				doc.font('Bookman-Bold', 8);
				doc.text('Página', 284, 745);
				doc.text(pagina + ' de ' + totalPaginas, 317, 745);
				doc.font('Bookman', 6).text( meta, 0, 765,{width: 612, align: 'center'});
			}
			$scope.inicio();
			$scope.calcularCantidadTotalExtra=(detalle)=>{
				detalle.cantidad_total=detalle.cantidad+detalle.extra
			}
		}])
