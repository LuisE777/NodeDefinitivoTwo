angular.module('agil.controladores')

	.controller('ControladorVentas', ['$scope', '$filter', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', '$timeout', '$window', 'InventarioPaginador',
		'Venta', 'Ventas', 'VentasProductos', 'detalle', 'detalleEmpresa', 'Clientes', 'ClientesNit', 'ProductosNombre', 'ClasesTipo', 'VentasContado', 'VentasCredito',
		'PagosVenta', 'DatosVenta', 'VentaEmpresaDatos', 'ProductosPanel', 'ListaProductosEmpresaUsuario', 'ListaInventariosProducto', 'Paginator',
		'ConfiguracionVentaVistaDatos', 'ConfiguracionVentaVista', 'ListaGruposProductoEmpresa', 'ReporteVentasMensualesDatos',
		'ConfiguracionImpresionEmpresaDato', 'VerificarUsuarioEmpresa', 'GuardarVentasImportados', 'ImprimirSalida', 'ModificarVenta', 'ListaVendedorVenta', 'VendedorVenta', 'VendedorVentaActualizacion',
		'GuardarUsuarLectorDeBarra', 'VerificarLimiteCredito', 'ListaSucursalesUsuario', 'ListaGruposProductoUsuario', 'ListaServiciosVentas', 'GuardarListaServiciosVentas',
		'EliminarVentaServicio', 'ventasDetalleEmpresa', 'EliminarDetalleVentaEdicion', 'filtroCotizacionesPendientes', 'CotizacionRechazo', 'ListaInventariosProductoVentaEdicion', 'PagosVentaCreditos',
		'GuardarImportacionVentasFacturacion', 'GuardarImportacionPagosVenta', 'EmailFacturaVentas', 'ProductosPanelPaginador', 'CrearMeseroVenta', 'ListaMeserosVenta', 'InfoVentasMesas', 'UpdateVentasMesasRuta', 'ListaUnidadesMedidaProducto',
		'VentasProductosMesero', 'VentasProductosMesa', 'ProductosPanelPaginadorRelaciones', 'VerificarHijos', 'VerificarPadreGet', 'ValidarCodigoMesero', 'ObtenerProductoPuntajeHabilitados', 'ventasDetalleClientePuntajes',
		'detalleClientePuntaje', 'RevisionInventarios', 'ObtenerOpcionesAplicacionUsuario', 'ObtenerListaDeHermanosPorProducto', 'ObtenerDetallesVentasExpressPorFactura', 'ObtenerMesasOcupadas', 'GuardarImportacionVentasTraspaso', 'SweetAlert',
		'ObtenerConfiguracionIso', 'ListaProductosVentaUsuario', 'CrearDevolucionItem', 'CrearReposicionItem', 'NumeroLiteral', 'ListaReposicionPedidosEmpresa', 'DetallesReposicionAlmacenEmpresa', 'ConfirmarTraspasoOrdenReposicion', 'ObtenerTraspasosCampamento', 'GuardarFechaTraspasoCampamento',
		'ObtenerTraspasosSincronizados', 'ValidarImportacionVentas','ObtenerIdPadreAnterior', function ($scope, $filter, $localStorage, $location, $templateCache, $route, blockUI, $timeout, $window, InventarioPaginador,
			Venta, Ventas, VentasProductos, detalle, detalleEmpresa, Clientes, ClientesNit, ProductosNombre, ClasesTipo, VentasContado, VentasCredito,
			PagosVenta, DatosVenta, VentaEmpresaDatos, ProductosPanel, ListaProductosEmpresaUsuario, ListaInventariosProducto, Paginator,
			ConfiguracionVentaVistaDatos, ConfiguracionVentaVista, ListaGruposProductoEmpresa, ReporteVentasMensualesDatos,
			ConfiguracionImpresionEmpresaDato, VerificarUsuarioEmpresa, GuardarVentasImportados, ImprimirSalida, ModificarVenta, ListaVendedorVenta, VendedorVenta, VendedorVentaActualizacion,
			GuardarUsuarLectorDeBarra, VerificarLimiteCredito, ListaSucursalesUsuario, ListaGruposProductoUsuario, ListaServiciosVentas, GuardarListaServiciosVentas,
			EliminarVentaServicio, ventasDetalleEmpresa, EliminarDetalleVentaEdicion, filtroCotizacionesPendientes, CotizacionRechazo, ListaInventariosProductoVentaEdicion, PagosVentaCreditos, GuardarImportacionVentasFacturacion, GuardarImportacionPagosVenta, EmailFacturaVentas, ProductosPanelPaginador,
			CrearMeseroVenta, ListaMeserosVenta, InfoVentasMesas, UpdateVentasMesasRuta, ListaUnidadesMedidaProducto, VentasProductosMesero, VentasProductosMesa, ProductosPanelPaginadorRelaciones, VerificarHijos, VerificarPadreGet, ValidarCodigoMesero, ObtenerProductoPuntajeHabilitados,
			ventasDetalleClientePuntajes, detalleClientePuntaje, RevisionInventarios, ObtenerOpcionesAplicacionUsuario, ObtenerListaDeHermanosPorProducto, ObtenerDetallesVentasExpressPorFactura, ObtenerMesasOcupadas, GuardarImportacionVentasTraspaso, SweetAlert,
			ObtenerConfiguracionIso, ListaProductosVentaUsuario, CrearDevolucionItem, CrearReposicionItem, NumeroLiteral, ListaReposicionPedidosEmpresa, DetallesReposicionAlmacenEmpresa, ConfirmarTraspasoOrdenReposicion, ObtenerTraspasosCampamento, GuardarFechaTraspasoCampamento,
			ObtenerTraspasosSincronizados, ValidarImportacionVentas,ObtenerIdPadreAnterior) {
			// blockUI.start();
			$scope.usuario = JSON.parse($localStorage.usuario);

			if (!$scope.usuario.hasOwnProperty("ver_listado_ventas")) {
				$scope.usuario.ver_listado_ventas = true;
			}
			// var pormimg = ObtenerImagen($scope.usuarioSesion.empresa.imagen)
			// 	pormimg.then(function (img) {
			// 		$scope.usuario.empresa.imagen = img
			// 	})

			convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
				$scope.usuario.empresa.imagen = imagenEmpresa;
			});
			// para sacar la altura de la imagen
			var img = new Image();
			img.onload = function () {
				// en pulgadas
				$scope.usuario.altura_imagen = this.height / 96;
			}
			img.src = $scope.usuario.empresa.imagen;
			$scope.dataMail = { destinatario: "", venta: { id: 0 }, empresa: $scope.usuario.id_empresa, domain: $location.$$host }

			$scope.idModalPago = 'dialog-pago';
			$scope.idModalCierre = 'dialog-cierre-caja';
			$scope.idModalWizardCompraEdicion = 'modal-wizard-venta-edicion';
			$scope.idModalWizardVentaVista = 'modal-wizard-venta-vista';
			$scope.idModalEliminarCompra = 'dialog-eliminar-venta';
			$scope.idModalContenedorCompraEdicion = 'modal-wizard-container-venta-edicion';
			$scope.idModalContenedorVentaVista = 'modal-wizard-container-venta-vista';
			$scope.idInputCompletar = 'nit';
			$scope.idModalPanelVentas = 'dialog-panel-ventas';
			$scope.idModalPanelVentasExpress = 'dialog-panel-ventas-express'
			$scope.idModalConfirmacionEliminacionVenta = "dialog-eliminar-venta";
			$scope.idModalInventario = "dialog-productos-venta";
			$scope.idModalPanelVentasCobro = 'dialog-panel-cobro';
			$scope.idModalEdicionVendedor = 'dialog-edicion-vendedor';
			$scope.idModalImpresionVencimiento = 'dialog-imprimir-con-fecha-vencimiento';
			$scope.IdModalVerificarCuenta = 'modal-verificar-cuenta';
			$scope.modalReportesProductos = 'dialog-reportes-productos';
			$scope.modelGraficaProductos = 'reporte-grafico-productos';

			$scope.modalServicioVenta = 'dialog-servicios-venta';
			$scope.modalReportesEmpresas = 'dialog-reporte-por-empresas';
			$scope.modelGraficaEmpresas = 'reporte-grafico-empresas';
			$scope.modelImportacionVentaServicio = 'dialog-importacion-ventas-servicios';
			$scope.idModalCotizaciones = 'dialog-cotizaciones-venta';
			$scope.idModalDetalleCotizaciones = 'dialog-detalle-cotizaciones';
			$scope.idModalDetalleCotizacionEditar = 'dialog-cotizacione-editar';
			$scope.ModalMensajePago = 'Modal-Mensaje-Pago';
			$scope.ModalDestinatarioEmail = 'modal-destinatario-email';
			$scope.idModalMeserosVenta = 'modal-meseros-venta';
			$scope.idModalNuevoMesero = 'modal-nuevo-mesero';
			$scope.idModalCerrarMesa = 'modal-cerrar-mesa';
			$scope.ModalRepostePorUnidad = 'modal-reporte-por-unidad';
			$scope.ModalRepostePorMesero = 'modal-reporte-por-mesero';
			$scope.ModalRepostePorMesa = 'modal-reporte-por-mesa';
			$scope.modalPdfView = "modal-pdf-view";
			$scope.modalEntregaDetalleVentaCliente = "modal-entrega-detalle-cliente";
			$scope.modalReportesClientesPuntaje = 'dialog-reporte-clientes-puntaje';
			$scope.modelGraficaClientesPuntajes = 'reporte-grafico-clientes-puntajes';
			$scope.modalCambiosProductoBaseVenta = "modal-cambios-productos-base-venta"
			$scope.modalMesasVentaExpress = "modal-mesas-venta-express";
			$scope.idModalVentaDevolucion = 'modal-venta-devolucion';
			$scope.idModalItemDevolucion = 'modal-item-devolucion';
			$scope.idModalItemReposicion = 'modal-item-reposicion';
			$scope.idModalItemCambio = 'modal-item-cambio';
			$scope.idModalItemEfectivo = 'modal-item-efectivo';
			$scope.idModalProductoReposicion = 'dialog-productos-reposicion';
			$scope.idModalReposicionAlmacen = 'dialog-reposicion-almacen';
			$scope.idModalDetalleReposicionPedidos = 'dialog-detalle-reposicion-almacen';
			$scope.idModalHTraspasoCampamento = 'dialog-historial-traspaso-campamento';
			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsVenta($scope.idModalWizardCompraEdicion, $scope.idModalWizardVentaVista,
					$scope.idModalEliminarCompra, $scope.idModalContenedorCompraEdicion,
					$scope.idModalContenedorVentaVista, $scope.idInputCompletar, $scope.url, $scope.idModalPago,
					$scope.idModalCierre,
					$scope.idModalPanelVentas, $scope.idModalPanelVentasExpress, $scope.idModalConfirmacionEliminacionVenta, $scope.idModalInventario, $scope.idModalPanelVentasCobro,
					$scope.idModalEdicionVendedor, $scope.idModalImpresionVencimiento, $scope.IdModalVerificarCuenta, $scope.modalReportesProductos, $scope.modalServicioVenta,
					$scope.modelGraficaProductos, $scope.modalReportesEmpresas, $scope.modelGraficaEmpresas, $scope.modelImportacionVentaServicio, $scope.idModalCotizaciones, $scope.idModalDetalleCotizaciones, $scope.idModalDetalleCotizacionEditar,
					$scope.ModalMensajePago, $scope.ModalDestinatarioEmail, $scope.idModalMeserosVenta, $scope.idModalNuevoMesero, $scope.idModalCerrarMesa,
					$scope.ModalRepostePorUnidad, $scope.ModalRepostePorMesero, $scope.ModalRepostePorMesa, $scope.modalPdfView, $scope.modalEntregaDetalleVentaCliente, $scope.modalReportesClientesPuntaje, $scope.modelGraficaClientesPuntajes,
					$scope.modalCambiosProductoBaseVenta, $scope.modalMesasVentaExpress, $scope.idModalVentaDevolucion, $scope.idModalItemDevolucion, $scope.idModalItemReposicion, $scope.idModalItemCambio, $scope.idModalItemEfectivo, $scope.idModalProductoReposicion,
					$scope.idModalReposicionAlmacen, $scope.idModalDetalleReposicionPedidos, $scope.idModalHTraspasoCampamento);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.buscarOpcionesAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1))
				blockUI.stop();
			});
			$scope.config = {
				itemsPerPage: 10,
				maxPages: 5,
				fillLastPage: true
			}
			$scope.inicio = function () {
				$scope.filtroVenta = { tipo_filtro_express: false }
				$scope.trueDetalle = true;
				$scope.ordenProductos = true;
				$scope.encendido = true;
				$scope.resaltar = true;
				$scope.esContado = true;
				$scope.venta_dolar = 6.96
				//$scope.obtenerClientes();
				$scope.obtenerTiposDePago();
				$scope.obtenerConfiguracionVentaVista();
				//$scope.sucursales = []//$scope.obtenerSucursales();
				$scope.obtenerSucursales();
				$scope.sucursalesUsuario = "";
				$scope.obtenerFormatoFactura();
				// for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
				// 	$scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
				// 	if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
				// 		$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
				// 	}
				// }

				//$scope.obtenerVentas();
				$scope.obtenerMovimientosEgreso();



				$scope.detalleVenta = { eliminado: false, producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, descuento_dolares: 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, tipo_descuento: false, tipo_recargo: false, servicio: {} }
				$scope.estadoProducto = false;
				$scope.estadoEmpresa = false;
				$scope.dynamicPopoverPrecios = {
					templateUrl: 'preciosTemplate.html',
				};

				var d = new Date();

				var month = d.getMonth() + 1;
				var day = d.getDate();

				var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear() + '  00:00';
				$scope.fechaInicioTexto = output;

				var outputF = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear() + '  23:59';
				$scope.fechaFinTexto = outputF;

			}

			$scope.SelectItemPorPagina = function (itemsPerPageCompra) {
				$scope.config = {
					itemsPerPage: itemsPerPageCompra,
					maxPages: 5,
					fillLastPage: true
				}
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
			// $scope.usarServicios = function (usar_servicios) {
			// 	if (usar_servicios) {

			// 	}else{
			// 	}
			// }
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
							//console.log(totalsaldo)
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
			$scope.diferenciaEntreDiasEnDias = function (a, b) {
				var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
				var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
				var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

				return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
			}

			$scope.obtenerGruposProductoEmpresa = function () {
				// var promesa = ListaGruposProductoEmpresa($scope.usuario.id_empresa);
				var promesa = ListaGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);

				promesa.then(function (grupos) {
					$scope.grupos_productos = grupos;
					/*if ( angular.isDefined($localStorage.grupos_check) ) {
						$scope.grupos_check=JSON.parse($localStorage.grupos_check);
						$scope.grupos_check=$scope.generarListaGruposSeleccionados($scope.grupos_productos,$scope.grupos_check);
					} else {
						$scope.grupos_check=[];
						for (var i = 0; i < $scope.grupos_productos.length; i++) {
							$scope.grupos_productos[i].selected = true;
							$scope.grupos_check.push($scope.grupos_productos[i]);
							$localStorage.grupos_check=JSON.stringify($scope.grupos_check);
						}
					}
		
					$scope.cambiarListaGruposCheck=function(grupo){//console.log(grupo);
						grupo.selected=!grupo.selected;
						$localStorage.grupos_check=JSON.stringify($scope.grupos_check);
					}*/

					// ================== codigo filtro grupos checkbox ==============

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



			$scope.obtenerTiposDePago = function () {
				blockUI.start();
				var promesa = ClasesTipo("TIPA");
				promesa.then(function (entidad) {
					$scope.tiposPago = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.abrirPopuEdicionVendedor = function () {
				$scope.vendedor = new VendedorVenta({ id_empresa: $scope.usuario.id_empresa });
				$scope.abrirPopup($scope.idModalEdicionVendedor);
			}

			$scope.cerrarPopupEdicionVendedor = function () {
				$scope.cerrarPopup($scope.idModalEdicionVendedor);
			}

			$scope.guardarVendedor = function (vendedor) {
				$scope.cerrarPopup($scope.idModalEdicionVendedor);
				if (vendedor.id) {
					VendedorVentaActualizacion.update({ id_vendedor: vendedor.id }, vendedor, function (res) {
						SweetAlert.swal("Guardado!", res.mensaje, "success");
						$scope.obtenerVendedores();
					});
				} else {
					vendedor.$save(function (res) {
						SweetAlert.swal("Guardado!", "Vendedor registrado satisfactoriamente!", "success");
						$scope.obtenerVendedores();
					});
				}
			}

			$scope.obtenerVendedores = function () {
				blockUI.start();
				var promesa = ListaVendedorVenta($scope.usuario.id_empresa);
				promesa.then(function (vendedores) {
					$scope.vendedores = vendedores;
					blockUI.stop();
				});
			}

			$scope.obtenerMovimientosEgreso = function () {
				blockUI.start();
				var promesa = ClasesTipo("MOVEGR");
				promesa.then(function (entidad) {
					// $scope.buscarOpcionesAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));

					var aplicaciones = $.grep($scope.usuario.aplicacionesUsuario, function (e) { return e.aplicacion.url == $location.path().substring(1); });
					aplicacion = aplicaciones[0];
					var promesa = ObtenerOpcionesAplicacionUsuario(aplicacion.id)
					promesa.then(function (data) {
						if (data.opciones.length > 0) {
							var movimientosVenta = [];
							$scope.opcionesAplicacion = {};
							if (aplicacion.aplicacion.titulo == 'SALIDAS') {

								$scope.opcionesAplicacion.VENTA_OPCION_FACTURACION = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_FACTURACION })
								$scope.opcionesAplicacion.VENTA_OPCION_BAJA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_BAJA })
								$scope.opcionesAplicacion.VENTA_OPCION_PROFORMA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_PROFORMA })
								$scope.opcionesAplicacion.VENTA_OPCION_TRASPASO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO })
								$scope.opcionesAplicacion.VENTA_OPCION_AJUSTE = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_AJUSTE })
								$scope.opcionesAplicacion.VENTA_OPCION_SERVICIO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_SERVICIO })
								$scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO_ALMACEN })
								$scope.opcionesAplicacion.VENTA_OPCIONES_COMPROBANTE_TRASPASO = data.opciones.find(function (dato) { return dato.opcion.nombre == "INTEGRACION TRASPASOS" })

								for (var i = 0; i < entidad.clases.length; i++) {
									var movimientoGet = entidad.clases[i];
									if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_BAJA?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_BAJA?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									} else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN?.opcion?.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN?.puede_ver) {
										movimientosVenta.push(movimientoGet);
									}
								}

								$scope.movimientosEgreso = movimientosVenta;

							}
						} else {
							$scope.movimientosEgreso = entidad.clases;
						}
					});

					// var movimientosVenta = [];
					// for (var i = 0; i < entidad.clases.length; i++) {
					// 	var movimientoGet = entidad.clases[i];
					// 	if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_BAJA.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN.puede_ver) {
					// 		movimientosVenta.push(movimientoGet);
					// 	}

					// }

					// $scope.movimientosEgreso = movimientosVenta;

					// console.log($scope.movimientosEgreso)

					// $scope.opcionesAplicacion
					blockUI.stop();
				});
			}

			$scope.obtenerTipoEgreso = function (movimiento) {
				var nombre_corto = movimiento.nombre_corto;
				$scope.tipoEgreso = nombre_corto;
				if ($scope.venta.sucursal) {
					$scope.obtenerActividades($scope.venta.sucursal.id)
				}
				if (nombre_corto == "TRAS_ALM") {
					$scope.obtenerAlmacenesDiferente($scope.venta.sucursal.id);
				}
			}

			$scope.buscarCliente = async function (query) {
				if (query != "" && query != undefined) {
					var dato = await ClientesNit($scope.usuario.id_empresa, query);

					if (dato.length == 1) {
						$scope.establecerCliente(dato[0])
					} else {
						return dato;
					}
				}
			};
			$scope.buscarClienteCierreMesa = async function (query) {
				if (query != "" && query != undefined) {
					var dato = await ClientesNit($scope.usuario.id_empresa, query);

					if (dato.length == 1) {
						$scope.establecerClienteVentaExpress(dato[0])
					} else {
						return dato;
					}
				}
			};

			$scope.obtenerClientes = function () {
				var promesa = Clientes($scope.usuario.id_empresa);
				promesa.then(function (clientes) {
					for (var i = 0; i < clientes.length; i++) {
						clientes[i].nit = clientes[i].nit.toString();
					}
					$scope.clientes = clientes;
				});
			}

			$scope.buscarProductoLectorBarra = function (query) {
				blockUI.start()
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.venta.almacen.id);
					var p = promesa.then(function (datos) {
						$scope.filtro_lote = null
						if ($scope.usuario.usar_filtro_lote) {
							$scope.filtro_lote = query
						}
						if (datos.length == 1) {
							$scope.establecerProducto(datos[0])
							return []
						} else {
							return promesa
						}						
					}, function (err) {
						SweetAlert.swal("", err.message, "warning");
						blockUI.stop()
					})
					blockUI.stop()
					return p;
				}

			}

			// $scope.buscarProducto = function (query) {
			// 	blockUI.start()
			// 	if (query != "" && query != undefined) {
			// 		var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.venta.almacen.id);
			// 		var p = promesa.then(function (datos) {
			// 			$scope.filtro_lote = null
			// 			if ($scope.usuario.usar_filtro_lote) {
			// 				$scope.filtro_lote = query
			// 			}
			// 			if (datos.length == 1) {
			// 				$scope.establecerProducto(datos[0])
			// 				return []
			// 			} else if (datos.length > 1) {
			// 				return promesa
			// 			} else {
			// 				SweetAlert.swal("", "No existen coincidencias en la búsqueda", "warning");
			// 			}
			// 		})
			// 		blockUI.stop()
			// 		return p;

			// 	}

			// }

			$scope.buscarProducto = function (query) {
				blockUI.start()
				if (query != "" && query != undefined) {
					var idCliente = 0;
					if ($scope.venta.cliente.id) {
						idCliente = $scope.venta.cliente.id;
					}
					var promesa = ListaProductosVentaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.venta.almacen.id, idCliente);
					var p = promesa.then(function (datos) {
						$scope.filtro_lote = null
						if ($scope.usuario.usar_filtro_lote) {
							$scope.filtro_lote = query
						}
						if (datos.length == 1) {
							$scope.establecerProducto(datos[0])
							return []
						} else if (datos.length > 1) {
							return promesa
						} else {
							SweetAlert.swal("", "No existen coincidencias en la búsqueda", "warning");
						}
					})
					blockUI.stop()
					return p;

				}

			}

			$scope.establecerProductoEdicionVenta = function (producto) {

				producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
				$scope.editar_precio = false;
				var fecha = new Date($scope.convertirFecha($scope.venta.fechaTexto))
				var promesa = ListaInventariosProductoVentaEdicion(producto.id, $scope.venta.almacen.id, fecha);
				promesa.then(function (inventarios) {
					producto.inventarios = inventarios;

					for (var i = 0; i < producto.inventarios.length; i++) {
						producto.inventarios[i].fecha_vencimiento = (producto.inventarios[i].fecha_vencimiento ? new Date(producto.inventarios[i].fecha_vencimiento) : null);
						producto.inventarios[i].fechaVencimientoTexto = (producto.inventarios[i].fecha_vencimiento ? producto.inventarios[i].fecha_vencimiento.getDate() + "/" + (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + producto.inventarios[i].fecha_vencimiento.getFullYear() : "");
						producto.inventarios[i].detallesMovimiento[0].movimiento.fecha = new Date(producto.inventarios[i].detallesMovimiento[0].movimiento.fecha);
						producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto = producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getDate() + "/" + (producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getMonth() + 1) + "/" + producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getFullYear();
					}

					$scope.inventariosDisponibleProducto = [];
					$scope.inventariosDisponibleProducto.push({ id: 0, fecha_vencimiento: "TODOS", fechaVencimientoTexto: "TODOS", lote: "TODOS" });
					$scope.inventariosDisponibleProducto = $scope.inventariosDisponibleProducto.concat(producto.inventarios);
					var inventarioDisponible = $scope.obtenerInventarioTotal(producto);

					$scope.detalleVenta = {
						eliminado: false,
						producto: producto, precio_unitario: (producto.precio_unitario ? producto.precio_unitario : producto.precio_unitario_dolares ? producto.precio_unitario_dolares * $scope.venta_dolar : 0), precio_unitario_dolares: (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / $scope.venta_dolar : producto.precio_unitario / $scope.venta_dolar), inventarioProducto: $scope.inventariosDisponibleProducto[0],
						inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
						cantidad: 1, descuento: producto.descuento ? producto.descuento : producto.descuento_dolares ? producto.descuento_dolares * $scope.venta_dolar : 0, descuento_dolares: (producto.descuento_dolares ? producto.descuento_dolares : producto.descuento ? producto.descuento / $scope.venta_dolar : 0), recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
					};

					// === para colocar el costo unitario de inventario == 
					$scope.precio_inventario = 0;
					$scope.precio_inventario_dolares = 0;
					if (producto.inventarios.length > 0) {
						var pre = producto.inventarios.map(function (dato) {
							return dato.id
						});
						pre = pre.reduce(function (a, b) {
							return Math.max(a, b);
						});
						var pre = producto.inventarios.find(function (dato) {
							return pre == dato.id
						});

						$scope.precio_inventario_dolares = (pre.costo_unitario_dorales ? pre.costo_unitario_dorales : pre.costo_unitario ? pre.costo_unitario / ($scope.venta_dolar) : 0) + " $us";
						$scope.precio_inventario = (pre.costo_unitario ? pre.costo_unitario : pre.costo_unitario_dolares ? pre.costo_unitario_dolares * $scope.venta_dolar : 0) + " Bs";
					} else {
						$scope.precio_inventario = "Sin histórico";
					}

					$scope.inventarioProducto = producto.activar_inventario ? producto.inventarios : []
					$scope.colorearInventarioDisponible(inventarioDisponible, producto);
					//	$scope.enfocar('cantidad');
					document.getElementById("cantidad").focus();
					$scope.calcularImporte();
					$scope.cerrarPopup($scope.idModalInventario);
				});
			}

			$scope.establecerProducto = function (producto) {
				if (producto.tiposPrecio.length > 0) {
					// var tipo = producto.tiposPrecio.reduce(function (a, x) {
					// 	var alm = x.sucursal.almacenes.find(function (y) {
					// 		return y.id == $scope.venta.almacen.id
					// 	})
					// 	if (alm) {
					// 		a = x
					// 	}
					// 	return a
					// }, undefined)

					// producto.tiposPrecio = []
					// if (tipo) {
					// 	producto.tiposPrecio.push(tipo)
					// }

					var tipo = producto.tiposPrecio.filter(function (a) {
						var alm = a.sucursal.almacenes.find(function (y) {
							return y.id == $scope.venta.almacen.id
						})
						return alm;

					});

					if (tipo) {
						producto.tiposPrecio = tipo;
					}
				}
				if (producto.preciosPorSucursales.length > 0 && producto.tiposPrecio.length == 0) {
					var tipo = producto.preciosPorSucursales.reduce(function (a, x) {
						var alm = x.sucursal.almacenes.find(function (y) {
							return y.id == $scope.venta.almacen.id
						})
						if (alm) {
							a = x
						}
						return a
					}, undefined)
					producto.preciosPorSucursales = []
					if (tipo) {
						producto.preciosPorSucursales.push(tipo)
					}
				}
				producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
				producto.descuento = producto.descuento ? producto.descuento : 0
				$scope.editar_precio = false;
				Promise.all([ListaInventariosProducto(producto.id, $scope.venta.almacen.id, $scope.filtro_lote), ObtenerProductoPuntajeHabilitados(producto.id)]).then(function (dato) {

					// var promesa = ListaInventariosProducto(producto.id, $scope.venta.almacen.id, $scope.filtro_lote);
					// promesa.then(function (inventarios) {
					producto.inventarios = dato[0];
					producto.promocionesPuntajes = dato[1].promociones;
					for (var i = 0; i < producto.inventarios.length; i++) {
						producto.inventarios[i].fecha_vencimiento = (producto.inventarios[i].fecha_vencimiento ? new Date(producto.inventarios[i].fecha_vencimiento) : null);
						producto.inventarios[i].fechaVencimientoTexto = (producto.inventarios[i].fecha_vencimiento ? producto.inventarios[i].fecha_vencimiento.getDate() + "/" + (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + producto.inventarios[i].fecha_vencimiento.getFullYear() : "");
						producto.inventarios[i].detallesMovimiento[0].movimiento.fecha = new Date(producto.inventarios[i].detallesMovimiento[0].movimiento.fecha);
						producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto = producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getDate() + "/" + (producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getMonth() + 1) + "/" + producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getFullYear();
					}

					$scope.inventariosDisponibleProducto = [];
					var precio = 0
					var precio_dolares = 0
					$scope.TipoPrecioProducto = {}
					$scope.inventariosDisponibleProducto.push({ id: 0, fecha_vencimiento: "TODOS", fechaVencimientoTexto: "TODOS", lote: "TODOS" });
					$scope.inventariosDisponibleProducto = $scope.inventariosDisponibleProducto.concat(producto.inventarios);
					var inventarioDisponible = $scope.obtenerInventarioTotal(producto);
					if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
						if (producto.tiposPrecio.length > 0) {
							$scope.tipoPrecioProducto = producto.tiposPrecio.find(function (tipo) {
								return tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id
							})
							// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
							if ($scope.tipoPrecioProducto) {
								precio_dolares = $scope.tipoPrecioProducto.precio_unitario_dolares ? $scope.tipoPrecioProducto.precio_unitario_dolares : 0
								precio = $scope.tipoPrecioProducto.precio_unitario
							} else {
								precio_dolares = (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / $scope.venta_dolar : 0)
								precio = (producto.precio_unitario ? producto.precio_unitario : producto.precio_unitario_dolares ? producto.precio_unitario_dolares * $scope.venta_dolar : 0)
							}

							// } else {

							// }
						} else {
							// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
							precio_dolares = (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / $scope.venta_dolar : 0)
							// } else {
							precio = (producto.precio_unitario ? producto.precio_unitario : producto.precio_unitario_dolares ? producto.precio_unitario_dolares * $scope.venta_dolar : 0)
							// }
						}
					} else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {
						$scope.tipoPrecioProducto = producto.preciosPorSucursales[0]
						// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
						precio_dolares = producto.preciosPorSucursales[0].precio_unitario_dolares ? producto.preciosPorSucursales[0].precio_unitario_dolares : 0
						// } else {
						precio = producto.preciosPorSucursales[0].precio_unitario
						// }
					} else {
						// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
						precio_dolares = (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / $scope.venta_dolar : 0)
						// } else {
						precio = (producto.precio_unitario ? producto.precio_unitario : producto.precio_unitario_dolares ? producto.precio_unitario_dolares * $scope.venta_dolar : 0)
						// }
					}
					if ($scope.usuario.usar_filtro_lote) {
						$scope.$apply(function () {
							$scope.detalleVenta = {
								eliminado: false,
								producto: producto, precio_unitario: producto.precio_unitario, precio_unitario_dolares: (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / ($scope.venta_dolar) : 0), inventarioProducto: $scope.inventariosDisponibleProducto[1],
								inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
								cantidad: 1, descuento: producto.descuento ? producto.descuento : (producto.descuento_dolares ? producto.descuento_dolares * ($scope.venta_dolar) : 0), descuento_dolares: producto.descuento_dolares ? producto.descuento_dolares : producto.descuento ? producto.descuento / ($scope.venta_dolar) : 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
							};
						});
					} else {
						$scope.$apply(function () {
							$scope.detalleVenta = {
								eliminado: false,
								producto: producto, precio_unitario: precio, precio_unitario_dolares: precio_dolares, inventarioProducto: $scope.inventariosDisponibleProducto[0],
								inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
								cantidad: 1, descuento: producto.descuento ? producto.descuento : (producto.descuento_dolares ? producto.descuento_dolares * ($scope.venta_dolar) : 0), descuento_dolares: producto.descuento_dolares ? producto.descuento_dolares : producto.descuento ? producto.descuento / ($scope.venta_dolar) : 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
							};
						});
					}
					// === para colocar el costo unitario de inventario == 
					$scope.precio_inventario_dolares;
					$scope.precio_inventario;
					if (producto.inventarios.length > 0) {
						var pre = producto.inventarios.map(function (dato) {
							return dato.id
						});
						pre = pre.reduce(function (a, b) {
							return Math.max(a, b);
						});
						var pre = producto.inventarios.find(function (dato) {
							return pre == dato.id
						});
						$scope.precio_inventario_dolares = (pre.costo_unitario_dorales ? pre.costo_unitario_dorales : pre.costo_unitario ? pre.costo_unitario / ($scope.venta_dolar) : 0) + " $us";
						$scope.precio_inventario = (pre.costo_unitario ? pre.costo_unitario : pre.costo_unitario_dolares ? pre.costo_unitario_dolares * $scope.venta_dolar : 0) + " Bs";
					} else {
						$scope.precio_inventario = "Sin histórico";
					}
					$scope.inventarioProducto = producto.activar_inventario ? producto.inventarios : []
					$scope.colorearInventarioDisponible(inventarioDisponible, producto);
					//	$scope.enfocar('cantidad');
					document.getElementById("cantidad").focus();
					//$scope.calcularImporte(); 14/03/2020 configuracion general para descuentos
					$scope.actualizarInventarioDisponibleFechaVencimiento($scope.detalleVenta);
					$scope.cerrarPopup($scope.idModalInventario);

				});
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

			$scope.actualizarInventarioDisponibleFechaVencimiento = function (detalleVenta) {
				detalleVenta.maximoPermitido = 0;
				if (detalleVenta.inventarioProducto.id != 0) {
					detalleVenta.costos = [];
					detalleVenta.costos.push(detalleVenta.inventarioProducto);
					detalleVenta.inventario_disponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
					detalleVenta.lote = detalleVenta.inventarioProducto.lote;
					detalleVenta.maximoPermitido = detalleVenta.inventario_disponible;
				} else {
					detalleVenta.inventario_disponible = $scope.obtenerInventarioTotal(detalleVenta.producto);
					detalleVenta.costos = detalleVenta.producto.inventarios;
					detalleVenta.lote = "";
					detalleVenta.maximoPermitido = detalleVenta.inventario_disponible;
				}

				if (detalleVenta.producto.restar_solo_despacho) {
					detalleVenta.maximoPermitido = 9999999999;
				}
				$scope.colorearInventarioDisponible(detalleVenta.inventario_disponible, detalleVenta.producto);
				$scope.calcularImporte();
				if ($scope.usuario.usar_filtro_lote) {
					if (detalleVenta.inventario_disponible > 0) {
						$scope.agregarDetalleVenta($scope.detalleVenta)
					}

				}
			}

			$scope.establecerCliente = function (cliente) {
				$scope.venta.cliente = cliente;
				$scope.enfocar('razon_social');
				//$scope.capturarInteraccion();
			}
			$scope.establecerClienteVentaExpress = function (cliente) {
				$scope.cierremesa.cliente = cliente;
				$scope.enfocar('guardar-cierre-mesa');
				//$scope.capturarInteraccion();
			}

			$scope.abrirPopupConfirmarEliminado = function (funcionEliminacion, dataParam) {
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
			}

			$scope.eliminarVendedor = function (vendedor) {
				var vendedorAEliminar = new VendedorVentaActualizacion(vendedor);
				vendedorAEliminar.$delete(function (res) {
					if (res.mensaje.split(" ")[0] == "No") {
						SweetAlert.swal("", res.mensaje, "warning");
					} else {
						SweetAlert.swal("Eliminado!", res.mensaje, "success");
						$scope.obtenerVendedores();
					}
				}, function (res) {
					SweetAlert.swal("", "Ocurrio un problema al eliminar!", "error");
				});
			}

			$scope.modificarVendedor = function (vendedor) {
				$scope.vendedor = vendedor;
				$scope.abrirPopup($scope.idModalEdicionVendedor);
			}

			$scope.obtenerInventarioTotal = function (producto) {
				var cantidadTotal = 0;
				if (producto.activar_inventario) {
					for (var i = 0; i < producto.inventarios.length; i++) {
						cantidadTotal += (producto.inventarios[i].cantidad);
					}
					for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
						if ($scope.venta.detallesVenta[j].producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_FINAL || $scope.venta.detallesVenta[j].producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_INTER) {
							for (var x = 0; x < $scope.venta.detallesVenta[j].producto.productosBase.length; x++) {
								var productoBase = $scope.venta.detallesVenta[j].producto.productosBase[x];
								if (productoBase.productoBase.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_INTER) {
									for (var z = 0; z < productoBase.productoBase.productosBase.length; z++) {
										var productoBase2 = productoBase.productoBase.productosBase[z];
										if (productoBase2.productoBase.id == producto.id && !$scope.venta.detallesVenta[j].id) {
											cantidadTotal = cantidadTotal - parseInt(productoBase2.formulacion);
										}
									}
								} else {
									if (productoBase.productoBase.id == producto.id && !$scope.venta.detallesVenta[j].id) {
										cantidadTotal = cantidadTotal - parseInt(productoBase.formulacion);
									}
								}

							}

						} else {
							if ($scope.venta.detallesVenta[j].producto.id == producto.id && !$scope.venta.detallesVenta[j].id) {
								cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
							}
						}

					}
				} else {
					cantidadTotal = 500000;
				}
				return cantidadTotal;
			}

			$scope.obtenerInventarioTotalPorFechaVencimiento = function (detalleVenta) {
				if ($scope.usuario.empresa.usar_peps) {
					var cantidadTotal = detalleVenta.inventarioProducto.cantidad;
					for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
						if (!$scope.venta.detallesVenta[j].costos && $scope.venta.ordenReposicion) {
							$scope.venta.detallesVenta[j].costos = []
							$scope.venta.detallesVenta[j].costos.push($scope.venta.detallesVenta[j].inventario)
						}
						if ($scope.venta.detallesVenta[j].producto.id == detalleVenta.producto.id && $scope.venta.detallesVenta[j].costos[0].id == detalleVenta.inventarioProducto.id && !$scope.venta.detallesVenta[j].id) {
							cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
						}
					}
					return cantidadTotal;
				} else {
					var cantidadTotal = detalleVenta.inventario_disponible;
					for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
						if (!$scope.venta.detallesVenta[j].costos && $scope.venta.ordenReposicion) {
							$scope.venta.detallesVenta[j].costos = []
							$scope.venta.detallesVenta[j].costos.push($scope.venta.detallesVenta[j].inventario)
						}
						if ($scope.venta.detallesVenta[j].producto.id == detalleVenta.producto.id && $scope.venta.detallesVenta[j].costos[0].id == detalleVenta.inventarioProducto.id) {
							cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
						}
					}
					return cantidadTotal;
				}

			}
			$scope.agregarDetalleVentaServicio = function (detalleVenta) {
				if (detalleVenta.servicio.id && detalleVenta.importe) {
					$scope.calcularImporteServicio()
					$scope.venta.detallesVenta.push(detalleVenta);

					$scope.inventariosDisponibleProducto = [];
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					if ($scope.venta.usar_descuento_general) {
						$scope.venta.detallesVenta = $scope.recalcularDetalleVenta($scope.venta.detallesVenta)
						$scope.sumarTotal();
						$scope.sumarTotalImporte();
					}
					$scope.detalleVenta = { eliminado: false, producto: { activar_inventario: true }, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, descuento_dolares: 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, tipo_descuento: false, tipo_recargo: false, servicio: {} }
					$scope.enfocar('id_servicio');
				}
			}
			$scope.calcularImporteServicio = function () {
				$scope.detalleVenta.total = Math.round(($scope.detalleVenta.importe - $scope.detalleVenta.descuento + $scope.detalleVenta.recargo - $scope.detalleVenta.ice - $scope.detalleVenta.excento) * 1000) / 1000;
			}
			$scope.agregarDetalleVenta = function (detalleVenta) {
				// detalleVenta = Object.assign({},detalleVenta)
				/* var ultimoInventario = detalleVenta.producto.inventarios[detalleVenta.producto.inventarios.length - 1];
				var ultimoIngreso = ultimoInventario.detallesMovimiento[ultimoInventario.detallesMovimiento.length - 1];
				var movimientoFecha = ultimoIngreso.movimiento.fecha; */
				if (detalleVenta.producto.id) {

					var promosDia = []
					var promocionEnHora = false
					var promocionActual = {}
					if (detalleVenta.producto.promocionesPuntajes) {
						if (detalleVenta.producto.promocionesPuntajes.length > 0) {
							var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
							var Datetoday = new Date();
							promosDia = detalleVenta.producto.promocionesPuntajes.filter(function (x) {
								if (Datetoday >= new Date(x.fecha_inicio) && Datetoday <= new Date(x.fecha_fin)) {
									return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
								}
							})

							if (promosDia.length > 0) {
								var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
								promocionEnHora = datosVerificacion.activo
								promocionActual = datosVerificacion.promo
							}
							if (!promocionEnHora) {
								promocionActual = {};
							}
							detalleVenta.promocionPuntaje = promocionActual;
						}
					}

					if (detalleVenta.producto.activar_inventario && detalleVenta.producto.restar_solo_despacho == false) {
						if ($scope.usuario.empresa.usar_peps) {
							if (detalleVenta.costos.length > 1) {
								var cantidadTotal = detalleVenta.cantidad, i = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));

								var paraRectificacionDescuento = []
								while (i < detalleVenta.costos.length && cantidadTotal > 0) {
									detalleVenta.inventarioProducto = detalleVenta.costos[i];
									var cantidadDisponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
									if (cantidadDisponible > 0) {
										var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
										var cantidadParcial;
										$scope.detalleVenta = nuevoDetalleVenta;
										if (cantidadTotal > cantidadDisponible) {
											cantidadParcial = cantidadDisponible;
											cantidadTotal = cantidadTotal - cantidadDisponible
										} else {
											cantidadParcial = cantidadTotal;
											cantidadTotal = 0;
										}
										nuevoDetalleVenta.cantidad = cantidadParcial;
										if ($scope.usuario.empresa.usar_vencimientos) {
											nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[i].fecha_vencimiento;
											nuevoDetalleVenta.lote = detalleVenta.costos[i].lote;
										}
										nuevoDetalleVenta.costos = [];
										nuevoDetalleVenta.costos.push(detalleVenta.costos[i]);
										nuevoDetalleVenta.inventario = detalleVenta.costos[i];
										// $scope.calcularImporte();
										// $scope.venta.detallesVenta.push(nuevoDetalleVenta);
										paraRectificacionDescuento.push(nuevoDetalleVenta);
										// if (detalleVenta.tipo_descuento && detalleVenta.tipo_recargo) {
										// 	$scope.calcularImporte();
										// 	$scope.venta.detallesVenta.push(nuevoDetalleVenta);
										// } else {
										// 	paraRectificacionDescuento.push(nuevoDetalleVenta);
										// }
									}
									i++;
								}
								if ($scope.venta.usar_descuento_general) {
									var totalDescuento = $scope.venta.descuento ? $scope.venta.descuento > 0 ? ($scope.venta.descuento / detalleVenta.cantidad) : 0 : 0
									var totalRecargo = $scope.venta.recargo ? $scope.venta.recargo > 0 ? ($scope.venta.recargo / detalleVenta.cantidad) : 0 : 0
									var total_ice = $scope.venta.ice ? $scope.venta.ice > 0 ? ($scope.venta.ice / detalleVenta.cantidad) : 0 : 0
									var total_exento = $scope.venta.excento ? $scope.venta.excento > 0 ? ($scope.venta.excento / detalleVenta.cantidad) : 0 : 0
									var totalDescuento_dolares = 0
									var totalRecargo_dolares = 0
									var total_ice_dolares = 0
									var total_exento_dolares = 0
									if (!$scope.venta.tipo_descuento) {
										$scope.venta.total_descuento_general = $scope.venta.descuento;
										$scope.venta.total_descuento_dolares = 0;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].descuento = totalDescuento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].descuento_dolares = totalDescuento_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_descuento_general = $scope.venta.descuento;
										$scope.venta.total_descuento_dolares = 0;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].descuento = totalDescuento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].descuento_dolares = totalDescuento_dolares * paraRectificacionDescuento[index].cantidad
										}
									}

									if (!$scope.venta.tipo_recargo) {
										$scope.venta.total_recargo_general = $scope.venta.recargo;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].recargo = totalRecargo * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].recargo_dolares = totalRecargo_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_recargo_general = $scope.venta.recargo;
										$scope.venta.total_recargo_dolares = 0;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].recargo = totalRecargo * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].recargo_dolares = totalRecargo_dolares * paraRectificacionDescuento[index].cantidad
										}
									}

									if (total_ice > 0) {
										$scope.venta.total_ice = $scope.venta.ice;
										$scope.venta.total_ice_dolares = $scope.venta.ice_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].ice = total_ice * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].ice_dolares = total_ice_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_ice = 0
										$scope.venta.total_ice_dolares = 0
									}
									if (total_exento > 0) {
										$scope.venta.total_exento = $scope.venta.excento;
										$scope.venta.total_exento_dolares = $scope.venta.excento_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].excento = total_exento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].excento_dolares = total_exento_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_exento = 0
										$scope.venta.total_exento_dolares = 0
									}
								} else {
									var totalDescuento = detalleVenta.descuento ? detalleVenta.descuento > 0 ? (detalleVenta.descuento / detalleVenta.cantidad) : 0 : 0
									var totalRecargo = detalleVenta.recargo ? detalleVenta.recargo > 0 ? (detalleVenta.recargo / detalleVenta.cantidad) : 0 : 0
									var total_ice = detalleVenta.ice ? detalleVenta.ice > 0 ? (detalleVenta.ice / detalleVenta.cantidad) : 0 : 0
									var total_exento = detalleVenta.excento ? detalleVenta.excento > 0 ? (detalleVenta.excento / detalleVenta.cantidad) : 0 : 0
									var totalDescuento_dolares = detalleVenta.descuento_dolares ? detalleVenta.descuento_dolares > 0 ? (detalleVenta.descuento_dolares / detalleVenta.cantidad) : 0 : 0
									var totalRecargo_dolares = detalleVenta.recargo_dolares ? detalleVenta.recargo_dolares > 0 ? (detalleVenta.recargo_dolares / detalleVenta.cantidad) : 0 : 0
									var total_ice_dolares = detalleVenta.ice_dolares ? detalleVenta.ice_dolares > 0 ? (detalleVenta.ice_dolares / detalleVenta.cantidad) : 0 : 0
									var total_exento_dolares = detalleVenta.excento_dolares ? detalleVenta.excento_dolares > 0 ? (detalleVenta.excento_dolares / detalleVenta.cantidad) : 0 : 0

									if (!detalleVenta.tipo_descuento) {
										$scope.venta.total_descuento_general = detalleVenta.descuento;
										$scope.venta.total_descuento_dolares = detalleVenta.descuento_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].descuento = totalDescuento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].descuento_dolares = totalDescuento_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_descuento_general = detalleVenta.descuento;
										$scope.venta.total_descuento_dolares = detalleVenta.descuento_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].descuento = totalDescuento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].descuento_dolares = totalDescuento_dolares * paraRectificacionDescuento[index].cantidad
										}
									}

									if (!detalleVenta.tipo_recargo) {
										$scope.venta.total_recargo_general = detalleVenta.recargo;
										$scope.venta.total_recargo_dolares = detalleVenta.recargo_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].recargo = totalRecargo * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].recargo_dolares = totalRecargo_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_recargo_general = detalleVenta.recargo;
										$scope.venta.total_recargo_dolares = detalleVenta.recargo_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].recargo = totalRecargo * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].recargo_dolares = totalRecargo_dolares * paraRectificacionDescuento[index].cantidad
										}
									}

									if (total_ice > 0) {
										$scope.venta.total_ice = detalleVenta.ice;
										$scope.venta.total_ice_dolares = detalleVenta.ice_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].ice = total_ice * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].ice_dolares = total_ice_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_ice = 0
										$scope.venta.total_ice_dolares = 0
									}
									if (total_exento > 0) {
										$scope.venta.total_exento = detalleVenta.excento;
										$scope.venta.total_exento_dolares = detalleVenta.excento_dolares;
										for (var index = 0; index < paraRectificacionDescuento.length; index++) {
											paraRectificacionDescuento[index].excento = total_exento * paraRectificacionDescuento[index].cantidad
											paraRectificacionDescuento[index].excento_dolares = total_exento_dolares * paraRectificacionDescuento[index].cantidad
										}
									} else {
										$scope.venta.total_exento = 0
										$scope.venta.total_exento_dolares = 0
									}
								}
								for (var index = 0; index < paraRectificacionDescuento.length; index++) {


									// $scope.venta.total_recargo_general

									// condicion para trapasos =====
									if ($scope.venta.movimiento.nombre_corto == "TRAS" || $scope.venta.movimiento.nombre_corto == "TRAS_ALM" || $scope.venta.movimiento.nombre_corto == $scope.diccionario.EGRE_BAJA || $scope.venta.movimiento.nombre_corto == $scope.diccionario.EGRE_AJUSTE) {
										paraRectificacionDescuento[index].precio_unitario = paraRectificacionDescuento[index].costos[0].costo_unitario * 0.87;
									}
									var detalleCorregido = $scope.calcularImporte2(paraRectificacionDescuento[index]);
									$scope.venta.detallesVenta.push(detalleCorregido);

								}

							} else {
								if (detalleVenta.costos.length > 0) {
									if ($scope.usuario.empresa.usar_vencimientos) {
										detalleVenta.fecha_vencimiento = detalleVenta.costos[0].fecha_vencimiento;
										detalleVenta.lote = detalleVenta.costos[0].lote;
										detalleVenta.inventario = detalleVenta.costos[0];
									}
									// condicion para trapasos =====
									if ($scope.venta.movimiento.nombre_corto == "TRAS" || $scope.venta.movimiento.nombre_corto == "TRAS_ALM") {
										detalleVenta.precio_unitario = detalleVenta.costos[0].costo_unitario;
									}
								}
								var detalleCorregido = $scope.calcularImporte2(detalleVenta);
								$scope.venta.detallesVenta.push(detalleCorregido);
							}
						} else {
							var cantidadTotal = detalleVenta.cantidad, i = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));
							detalleVenta.inventarioProducto = detalleVenta.costos[i];
							var cantidadDisponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
							var paraRectificacionDescuento = []
							if (cantidadDisponible > 0) {
								var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
								var cantidadParcial;
								/* if (i > 0) {
									nuevoDetalleVenta.descuento = 0;
									nuevoDetalleVenta.recargo = 0;
									nuevoDetalleVenta.ice = 0;
									nuevoDetalleVenta.excento = 0;
								} */
								$scope.detalleVenta = nuevoDetalleVenta;
								if (cantidadTotal > cantidadDisponible) {
									cantidadParcial = cantidadDisponible;
									cantidadTotal = cantidadTotal - cantidadDisponible
								} else {
									cantidadParcial = cantidadTotal;
									cantidadTotal = 0;
								}
								nuevoDetalleVenta.cantidad = cantidadParcial;
								if ($scope.usuario.empresa.usar_vencimientos) {
									nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[i].fecha_vencimiento;
									nuevoDetalleVenta.lote = detalleVenta.costos[i].lote;
								}
								nuevoDetalleVenta.costos = [];
								nuevoDetalleVenta.costos.push(detalleVenta.costos[i]);
								nuevoDetalleVenta.inventario = detalleVenta.costos[i];

								var totalDescuento = detalleVenta.descuento ? detalleVenta.descuento > 0 ? (detalleVenta.descuento / detalleVenta.cantidad) : 0 : 0
								var totalRecargo = detalleVenta.recargo ? detalleVenta.recargo > 0 ? (detalleVenta.recargo / detalleVenta.cantidad) : 0 : 0
								var total_ice = detalleVenta.ice ? detalleVenta.ice > 0 ? (detalleVenta.ice / detalleVenta.cantidad) : 0 : 0
								var total_exento = detalleVenta.excento ? detalleVenta.excento > 0 ? (detalleVenta.excento / detalleVenta.cantidad) : 0 : 0
								if (!detalleVenta.tipo_descuento) {
									$scope.venta.total_descuento_general = detalleVenta.descuento;
									for (var index = 0; index < paraRectificacionDescuento.length; index++) {
										paraRectificacionDescuento[index].descuento = totalDescuento * paraRectificacionDescuento[index].cantidad
									}
								}
								if (!detalleVenta.tipo_recargo) {
									$scope.venta.total_recargo_general = detalleVenta.recargo;
									for (var index = 0; index < paraRectificacionDescuento.length; index++) {
										paraRectificacionDescuento[index].recargo = totalRecargo * paraRectificacionDescuento[index].cantidad
									}
								}
								if (total_ice > 0) {
									$scope.venta.total_ice = detalleVenta.ice;
									for (var index = 0; index < paraRectificacionDescuento.length; index++) {
										paraRectificacionDescuento[index].ice = total_ice * paraRectificacionDescuento[index].cantidad
									}
								} else {
									$scope.venta.total_ice = 0
								}
								if (total_exento > 0) {
									$scope.venta.total_exento = detalleVenta.excento;
									for (var index = 0; index < paraRectificacionDescuento.length; index++) {
										paraRectificacionDescuento[index].excento = total_exento * paraRectificacionDescuento[index].cantidad
									}
								} else {
									$scope.venta.total_exento = 0
								}
								// for (var index = 0; index < paraRectificacionDescuento.length; index++) {
								// var detalleCorregido = $scope.calcularImporte(paraRectificacionDescuento[index]);
								// $scope.venta.total_recargo_general
								// $scope.venta.detallesVenta.push(detalleCorregido);
								// }

								$scope.calcularImporte();
								$scope.venta.detallesVenta.push(nuevoDetalleVenta);
							}
						}

					} else {
						$scope.venta.detallesVenta.push(detalleVenta);

					}
					$scope.inventariosDisponibleProducto = [];
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					if ($scope.venta.usar_descuento_general) {
						$scope.venta.detallesVenta = $scope.recalcularDetalleVenta($scope.venta.detallesVenta)

						$scope.sumarTotalImporte();
					}
					$scope.precio_inventario = "Sin histórico";
					$scope.detalleVenta = { eliminado: false, producto: { activar_inventario: true }, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, descuento_dolares: 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, tipo_descuento: false, tipo_recargo: false, servicio: {} }
					$scope.enfocar('id_producto');
				}
			}
			$scope.recalcularDetalleVenta = function (detalles) {
				let descuento = $scope.venta.descuento / detalles.length
				let recargo = $scope.venta.recargo / detalles.length
				for (const detalle of detalles) {
					if ($scope.venta.tipo_descuento) {
						detalle.descuento = $scope.venta.descuento
						descuento = detalle.importe * ((detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0) / 100);
					} else {
						detalle.descuento = descuento
						descuento = (detalle.importe / $scope.venta.importe) * $scope.venta.descuento;
					}
					if ($scope.venta.tipo_recargo) {
						detalle.recargo = $scope.venta.recargo
						recargo = detalle.importe * ((detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0) / 100);
					} else {
						detalle.recargo = recargo
						recargo = (detalle.importe / $scope.venta.importe) * $scope.venta.recargo;
					}
					detalle.total_descuento = descuento
					detalle.total_recargo = recargo
					// detalle.recargo = recargo
					// detalle.descuento = descuento
					detalle.total = detalle.importe - descuento + recargo - detalle.ice - detalle.excento;
				}
				return detalles

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

			$scope.eliminarDetalleVenta = function (detalleVenta) {
				if (detalleVenta.id) {
					detalleVenta.eliminado = true
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					//$scope.capturarInteraccion();
				} else {
					$scope.devolverCantidad(detalleVenta)
					$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);					
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					
					//$scope.capturarInteraccion();
				}
			}
			$scope.devolverCantidad = function (detalleVenta) {
				var indice = $scope.productosProcesados.indexOf(detalleVenta.producto);
				if(detalleVenta.producto.activar_inventario && indice !== -1){
					$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + detalleVenta.cantidad;
				}
			}

			$scope.eliminarDetalleVentaEdicion = function (detalleVenta) {
				if (detalleVenta.id) {
					SweetAlert.swal({
						title: "Esta seguro?",
						html: "Esta seguro de eliminar el detalle con item <span class='text-warning orange'>"+detalleVenta.producto.nombre+" </span> seleccionado!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Si',
						cancelButtonText: "No"
					}).then(function (result) {
						if (result.value) {
							$scope.CancelacionVentaEdicion = true
							var promesa = EliminarDetalleVentaEdicion(detalleVenta, $scope.venta.movimientoActual.id, $scope.venta)
							promesa.then(function (dato) {
								if (dato.hasError == true) {
								} else {
									$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
									$scope.sumarTotal();
									$scope.sumarTotalImporte();
									$scope.calcularSaldo();
									$scope.calcularCambio();
									//$scope.capturarInteraccion();
								}
								SweetAlert.swal("Eliminado!", dato.mensaje, "success");
							})
						} 
					});
				} else {
					$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					//$scope.capturarInteraccion();
				}
			}
			$scope.eliminarDetalleVentaPanel = function (detalleVenta) {
				var indice = $scope.productosProcesados.indexOf(detalleVenta.producto);
				$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + detalleVenta.cantidad;

				$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				$scope.calcularSaldo();
				$scope.calcularCambio();
				//$scope.capturarInteraccion();
			}

			$scope.cambiarTipoPago = function (venta) {
				if (venta.tipoPago) {
					var tipoPagoO = venta.tipoPago
					var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPagoO.id; })[0];
					$scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
					$scope.calcularCambio();
					if (venta.cliente.usar_limite_credito == true) {
						$scope.verificarLimiteCredito(venta)
					}
					if (venta.tipoPago.nombre_corto == $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
						venta.monto_tarjeta_credito = venta.importe
					} else {
						venta.numero_tarjeta_credito = ""
						venta.monto_tarjeta_credito = 0
					}
				}
			}

			$scope.recalcular = function (detalle) {
				if (!detalle) {
					$scope.calcularImporte();
					return
				}
				$scope.detalleVenta = $scope.calcularImporte2(detalle);
			}

			$scope.calcularImporte2 = function (detalle) {
				if ($scope.venta.usar_descuento_general) {
					detalle.importe_dolares = detalle.cantidad * (detalle.precio_unitario_dolares ? detalle.precio_unitario_dolares : detalle.precio_unitario ? detalle.precio_unitario / ($scope.venta_dolar) : 0);
					detalle.descuento = detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares * ($scope.venta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
					detalle.descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / ($scope.venta.tipo_descuento ? 1 : $scope.venta_dolar) : 0

					detalle.recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / ($scope.venta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
					detalle.ice = detalle.ice ? detalle.ice : detalle.ice_dolares ? detalle.ice_dolares * $scope.venta_dolar : 0
					detalle.ice_dolares = detalle.ice_dolares ? detalle.ice_dolares : detalle.ice ? detalle.ice / $scope.venta_dolar : 0
					detalle.excento = detalle.excento ? detalle.excento : detalle.excento_dolares ? detalle.excento_dolares * $scope.venta_dolar : 0
					detalle.excento_dolares = detalle.excento_dolares ? detalle.excento_dolares : detalle.excento ? detalle.excento / $scope.venta_dolar : 0
					var descuento_dolares, recargo_dolares;
					var descuento, recargo;
					if ($scope.venta.tipo_descuento) {
						descuento_dolares = detalle.importe_dolares * ((detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento : 0) / 100);
					} else {
						descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / ($scope.venta_dolar) : 0;
					}
					if ($scope.venta.tipo_recargo) {
						recargo_dolares = detalle.importe_dolares * ((detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo : 0) / 100);
					} else {
						recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / ($scope.venta_dolar) : 0;
					}
					detalle.total_descuento_dolares = descuento_dolares
					detalle.total_recargo_dolares = recargo_dolares
					// detalle.recargo = recargo
					// detalle.descuento = descuento
					detalle.total_dolares = detalle.importe_dolares - descuento_dolares + recargo_dolares - detalle.ice_dolares - detalle.excento_dolares;
					// } else {
					detalle.importe = detalle.cantidad * detalle.precio_unitario;
					// var descuento, recargo;
					if ($scope.venta.tipo_descuento) {
						descuento = detalle.importe * ((detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0) / 100);
					} else {
						descuento = (detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0);
					}
					if ($scope.venta.tipo_recargo) {
						recargo = detalle.importe * ((detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0) / 100);
					} else {
						recargo = detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0;
					}
					detalle.total_descuento = descuento
					detalle.total_recargo = recargo
					// detalle.recargo = recargo
					// detalle.descuento = descuento
					detalle.total = detalle.importe - descuento + recargo - detalle.ice - detalle.excento;
					// }
					return detalle
				} else {
					// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
					detalle.importe_dolares = detalle.cantidad * (detalle.precio_unitario_dolares ? detalle.precio_unitario_dolares : detalle.precio_unitario ? detalle.precio_unitario / ($scope.venta_dolar) : 0);
					detalle.descuento = detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares * (detalle.tipo_descuento ? 1 : $scope.venta_dolar) : 0
					detalle.descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / (detalle.tipo_descuento ? 1 : $scope.venta_dolar) : 0

					detalle.recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / (detalle.tipo_recargo ? 1 : $scope.venta_dolar) : 0
					detalle.ice = detalle.ice ? detalle.ice : detalle.ice_dolares ? detalle.ice_dolares * $scope.venta_dolar : 0
					detalle.ice_dolares = detalle.ice_dolares ? detalle.ice_dolares : detalle.ice ? detalle.ice / $scope.venta_dolar : 0
					detalle.excento = detalle.excento ? detalle.excento : detalle.excento_dolares ? detalle.excento_dolares * $scope.venta_dolar : 0
					detalle.excento_dolares = detalle.excento_dolares ? detalle.excento_dolares : detalle.excento ? detalle.excento / $scope.venta_dolar : 0
					var descuento_dolares, recargo_dolares;
					var descuento, recargo;
					if (detalle.tipo_descuento) {
						descuento_dolares = detalle.importe_dolares * ((detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento : 0) / 100);
					} else {
						descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / ($scope.venta_dolar) : 0;
					}
					if (detalle.tipo_recargo) {
						recargo_dolares = detalle.importe_dolares * ((detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo : 0) / 100);
					} else {
						recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / ($scope.venta_dolar) : 0;
					}
					detalle.total_descuento_dolares = descuento_dolares
					detalle.total_recargo_dolares = recargo_dolares
					// detalle.recargo = recargo
					// detalle.descuento = descuento
					detalle.total_dolares = detalle.importe_dolares - descuento_dolares + recargo_dolares - detalle.ice_dolares - detalle.excento_dolares;
					// } else {
					detalle.importe = detalle.cantidad * detalle.precio_unitario;
					// var descuento, recargo;
					if (detalle.tipo_descuento) {
						descuento = detalle.importe * ((detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0) / 100);
					} else {
						descuento = (detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0);
					}
					if (detalle.tipo_recargo) {
						recargo = detalle.importe * ((detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0) / 100);
					} else {
						recargo = detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0;
					}
					detalle.total_descuento = descuento
					detalle.total_recargo = recargo
					// detalle.recargo = recargo
					// detalle.descuento = descuento
					detalle.total = detalle.importe - descuento + recargo - detalle.ice - detalle.excento;
					// }
					return detalle
				}
			}

			$scope.calcularImporte = function () {
				$scope.detalleVenta.importe = $scope.detalleVenta.cantidad * $scope.detalleVenta.precio_unitario;
				$scope.detalleVenta.importe_dolares = $scope.detalleVenta.cantidad * ($scope.detalleVenta.precio_unitario_dolares ? $scope.detalleVenta.precio_unitario_dolares : $scope.detalleVenta.precio_unitario ? $scope.detalleVenta.precio_unitario / ($scope.venta_dolar) : 0);
				//$scope.detalleVenta.descuento = $scope.detalleVenta.descuento ? $scope.detalleVenta.descuento : $scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares * ($scope.detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				$scope.detalleVenta.descuento_dolares = $scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares : $scope.detalleVenta.descuento ? $scope.detalleVenta.descuento / ($scope.detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				//	$scope.detalleVenta.recargo = $scope.detalleVenta.recargo ? $scope.detalleVenta.recargo : $scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares * ($scope.detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				$scope.detalleVenta.recargo_dolares = $scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares : $scope.detalleVenta.recargo ? $scope.detalleVenta.recargo / ($scope.detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				//	$scope.detalleVenta.ice = $scope.detalleVenta.ice ? $scope.detalleVenta.ice : $scope.detalleVenta.ice_dolares ? $scope.detalleVenta.ice_dolares * $scope.venta_dolar : 0
				$scope.detalleVenta.ice_dolares = $scope.detalleVenta.ice_dolares ? $scope.detalleVenta.ice_dolares : $scope.detalleVenta.ice ? $scope.detalleVenta.ice / $scope.venta_dolar : 0
				//	$scope.detalleVenta.excento = $scope.detalleVenta.excento ? $scope.detalleVenta.excento : $scope.detalleVenta.excento_dolares ? $scope.detalleVenta.excento_dolares * $scope.venta_dolar : 0
				$scope.detalleVenta.excento_dolares = $scope.detalleVenta.excento_dolares ? $scope.detalleVenta.excento_dolares : $scope.detalleVenta.excento ? $scope.detalleVenta.excento / $scope.venta_dolar : 0
				var descuento_dolares, recargo_dolares;
				var descuento, recargo;
				if ($scope.detalleVenta.tipo_descuento) {
					descuento_dolares = $scope.detalleVenta.importe_dolares * (($scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares : $scope.detalleVenta.descuento ? $scope.detalleVenta.descuento : 0) / 100);
				} else {
					descuento_dolares = $scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares : $scope.detalleVenta.descuento ? $scope.detalleVenta.descuento / ($scope.venta_dolar) : 0;
				}
				if ($scope.detalleVenta.tipo_recargo) {
					recargo_dolares = $scope.detalleVenta.importe_dolares * (($scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares : $scope.detalleVenta.recargo ? $scope.detalleVenta.recargo : 0) / 100);
				} else {
					recargo_dolares = $scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares : $scope.detalleVenta.recargo ? $scope.detalleVenta.recargo / ($scope.venta_dolar) : 0;
				}
				$scope.detalleVenta.total_descuento_dolares = descuento_dolares
				$scope.detalleVenta.total_recargo_dolares = recargo_dolares
				// $scope.detalleVenta.recargo = recargo
				// $scope.detalleVenta.descuento = descuento
				$scope.detalleVenta.total_dolares = $scope.detalleVenta.importe_dolares - descuento_dolares + recargo_dolares - $scope.detalleVenta.ice_dolares - $scope.detalleVenta.excento_dolares;
				// } else {

				// var descuento, recargo;
				if ($scope.detalleVenta.tipo_descuento) {
					descuento = $scope.detalleVenta.importe * (($scope.detalleVenta.descuento ? $scope.detalleVenta.descuento : $scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares : 0) / 100);
				} else {
					descuento = ($scope.detalleVenta.descuento ? $scope.detalleVenta.descuento : $scope.detalleVenta.descuento_dolares ? $scope.detalleVenta.descuento_dolares : 0);
				}
				if ($scope.detalleVenta.tipo_recargo) {
					recargo = $scope.detalleVenta.importe * (($scope.detalleVenta.recargo ? $scope.detalleVenta.recargo : $scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares : 0) / 100);
				} else {
					recargo = $scope.detalleVenta.recargo ? $scope.detalleVenta.recargo : $scope.detalleVenta.recargo_dolares ? $scope.detalleVenta.recargo_dolares : 0;
				}
				$scope.detalleVenta.total_descuento = descuento
				$scope.detalleVenta.total_recargo = recargo
				// $scope.detalleVenta.recargo = recargo
				// $scope.detalleVenta.descuento = descuento
				$scope.detalleVenta.total = $scope.detalleVenta.importe - descuento + recargo - $scope.detalleVenta.ice - $scope.detalleVenta.excento;
				// }

				// $scope.detalleVenta.importe = $scope.detalleVenta.cantidad * $scope.detalleVenta.precio_unitario;
				// var descuento, recargo;
				// if ($scope.detalleVenta.tipo_descuento) {
				// 	descuento = $scope.detalleVenta.importe * ($scope.detalleVenta.descuento / 100);
				// } else {
				// 	descuento = $scope.detalleVenta.descuento;
				// }
				// if ($scope.detalleVenta.tipo_recargo) {
				// 	recargo = $scope.detalleVenta.importe * ($scope.detalleVenta.recargo / 100);
				// } else {
				// 	recargo = $scope.detalleVenta.recargo;
				// }
				// $scope.detalleVenta.total_descuento = descuento
				// $scope.detalleVenta.total_recargo = recargo
				// // $scope.detalleVenta.descuento = descuento
				// // $scope.detalleVenta.recargo = recargo

				// $scope.detalleVenta.total = $scope.detalleVenta.importe - descuento + recargo - $scope.detalleVenta.ice - $scope.detalleVenta.excento;
				$scope.$evalAsync()
			}

			$scope.sumarTotalImporte = function () {
				var sumaImporte = 0;
				var sumaImporte_dolares = 0;
				$scope.venta.total_descuento_general = 0
				$scope.venta.total_recargo_general = 0
				$scope.venta.total_descuento_dolares = 0
				$scope.venta.total_recargo_dolares = 0
				$scope.venta.total_ice = 0
				$scope.venta.total_exento = 0
				$scope.venta.total_ice_dolares = 0
				$scope.venta.total_exento_dolares = 0
				for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
					if (!$scope.venta.detallesVenta[i].eliminado) {
						// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
						sumaImporte_dolares = sumaImporte_dolares + $scope.venta.detallesVenta[i].importe_dolares;
						$scope.venta.total_descuento_dolares += $scope.venta.detallesVenta[i].total_descuento_dolares ? $scope.venta.detallesVenta[i].total_descuento_dolares : 0
						$scope.venta.total_recargo_dolares += $scope.venta.detallesVenta[i].total_recargo_dolares ? $scope.venta.detallesVenta[i].total_recargo_dolares : 0
						// } else {
						sumaImporte = sumaImporte + $scope.venta.detallesVenta[i].importe;
						$scope.venta.total_descuento_general += $scope.venta.detallesVenta[i].total_descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
						$scope.venta.total_recargo_general += $scope.venta.detallesVenta[i].total_recargo ? $scope.venta.detallesVenta[i].total_recargo : 0

						$scope.venta.total_ice += $scope.venta.detallesVenta[i].total_ice ? $scope.venta.detallesVenta[i].total_ice : 0
						$scope.venta.total_exento += $scope.venta.detallesVenta[i].total_excento ? $scope.venta.detallesVenta[i].total_excento : 0
						$scope.venta.total_ice_dolares += $scope.venta.detallesVenta[i].total_ice_dolares ? $scope.venta.detallesVenta[i].total_ice_dolares : 0
						$scope.venta.total_exento_dolares += $scope.venta.detallesVenta[i].total_exento_dolares ? $scope.venta.detallesVenta[i].total_recargo : 0
						// }
					}
				}
				// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
				$scope.venta.importe_dolares = sumaImporte_dolares;
				$scope.venta.total_descuento_dolares = $scope.venta.total_descuento_dolares;
				$scope.venta.total_recargo_dolares = $scope.venta.total_recargo_dolares;

				$scope.venta.importe = sumaImporte;
				$scope.venta.total_descuento_general = $scope.venta.total_descuento_general;
				$scope.venta.total_recargo_general = $scope.venta.total_recargo_general;

				$scope.venta.total_ice = $scope.venta.total_ice
				$scope.venta.total_exento = $scope.venta.total_exento
				$scope.venta.total_ice_dolares = $scope.venta.total_ice_dolares
				$scope.venta.total_exento_dolares = $scope.venta.total_exento_dolares

			}

			$scope.sumarTotal = function () {
				$scope.venta.total_descuento_general = 0
				$scope.venta.total_descuento_dolares = 0
				$scope.venta.total_ice = 0
				$scope.venta.total_exento = 0
				$scope.venta.total_ice_dolares = 0
				$scope.venta.total_exento_dolares = 0
				var sumaTotal = 0;
				var sumaTotal_dolares = 0;
				$scope.venta.total_dolares = 0
				for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
					if (!$scope.venta.detallesVenta[i].eliminado) {
						// if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
						// sumaTotal_dolares = sumaTotal_dolares + $scope.venta.detallesVenta[i].total_dolares;
						$scope.venta.total_dolares += $scope.venta.detallesVenta[i].total_dolares;
						$scope.venta.total_descuento_general_dolares += $scope.venta.detallesVenta[i].descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
						$scope.venta.total_recargo_general_dolares += $scope.venta.detallesVenta[i].recargo ? $scope.venta.detallesVenta[i].total_recargo : 0

						sumaTotal = sumaTotal + $scope.venta.detallesVenta[i].total;
						$scope.venta.total_descuento_general += $scope.venta.detallesVenta[i].descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
						$scope.venta.total_recargo_general += $scope.venta.detallesVenta[i].recargo ? $scope.venta.detallesVenta[i].total_recargo : 0

						$scope.venta.total_ice += $scope.venta.detallesVenta[i].total_ice ? $scope.venta.detallesVenta[i].total_ice : 0
						$scope.venta.total_exento += $scope.venta.detallesVenta[i].total_excento ? $scope.venta.detallesVenta[i].total_excento : 0
						$scope.venta.total_ice_dolares += $scope.venta.detallesVenta[i].total_ice_dolares ? $scope.venta.detallesVenta[i].total_ice_dolares : 0
						$scope.venta.total_exento_dolares += $scope.venta.detallesVenta[i].total_exento_dolares ? $scope.venta.detallesVenta[i].total_recargo : 0

					}
				}
				//dolares
				// $scope.venta.total_dolares = sumaTotal_dolares;
				$scope.venta.pagado_dolares = Math.round($scope.venta.total_dolares * 100) / 100;
				$scope.venta.total_descuento_dolares = $scope.venta.total_descuento_dolares;
				//bolivianos
				$scope.venta.total = sumaTotal;
				$scope.venta.pagado = $scope.venta.total;
				$scope.venta.monto_tarjeta_credito = $scope.venta.total;
				$scope.venta.total_descuento_general = $scope.venta.total_descuento_general;

				$scope.venta.total_ice = $scope.venta.total_ice
				$scope.venta.total_exento = $scope.venta.total_exento
				$scope.venta.total_ice_dolares = $scope.venta.total_ice_dolares
				$scope.venta.total_exento_dolares = $scope.venta.total_exento_dolares

			}

			$scope.calcularSaldo = function () {
				$scope.venta.saldo = $scope.venta.total - $scope.venta.a_cuenta;
			}

			$scope.obtenerSucursales = function () {
				var sucursales = [];
				// for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
				// 	sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				// }
				var promesa = ListaSucursalesUsuario($scope.usuario.id);
				promesa.then(function (res) {
					res.sucursales.map(function (_) {
						$scope.sucursales.push(_.sucursal)
						// $scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
						// if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
						// 	$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
						// }
					})
					$scope.usuario.sucursalesUsuario = res.sucursales
					/* for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
						$scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
						if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
							$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
						}
					} */
					// blockUI.stop();
				});

				// return sucursales;
			}

			$scope.obtenerAlmacenesSucursalesDiferente = async function (idSucursalOrigen) {
				try {
					$scope.almacenes = await $scope.obtenerAlmacenes(idSucursalOrigen);
					await $scope.obtenerSucursalesDiferente(idSucursalOrigen);
					if (!$scope.venta.editable) {
						$scope.venta.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
						if ($scope.venta.almacen) {
							$scope.cargarProductos();
						}
					}
				} catch (error) {
					console.log(error)
				}

			}

			$scope.obtenerAlmacenesDiferente = function (idSucursalDestino) {
				$scope.almacenesDiferente = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursalDestino; })[0];
				$scope.almacenesDiferente = sucursal.almacenes;
				$scope.venta.almacenDestino = $scope.almacenesDiferente.length == 1 ? $scope.almacenesDiferente[0] : null;
			}

			$scope.obtenerSucursalesDiferente = function (idSucursal) {
				$scope.sucursalesDiferente = $.grep($scope.sucursales, function (e) { return e.id != idSucursal; });
				$scope.almacenesDiferente = $scope.sucursalesDiferente.almacenes;
			}

			$scope.obtenerAlmacenesActividades = async function (idSucursal) {
				try {
					$scope.almacenes = await $scope.obtenerAlmacenes(idSucursal);
					await $scope.obtenerActividades(idSucursal);
					if (!$scope.venta.editable) {
						$scope.venta.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
						if ($scope.venta.almacen) {
							$scope.cargarProductos();
						}
					}
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}

			}

			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.almacenes = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				return sucursal.almacenes;


			}

			$scope.obtenerActividades = function (idSucursal) {
				$scope.actividades = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.actividadesDosificaciones = sucursal.actividadesDosificaciones;
				$scope.actividades = [];
				for (var i = 0; i < $scope.actividadesDosificaciones.length; i++) {
					if ($scope.actividadesDosificaciones[i].dosificacion) {
						if ($scope.venta.movimiento) {
							if ($scope.venta.movimiento.nombre_corto == "SERV") {
								if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == true) {
									$scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
								} else {
									$scope.dosificacionesExpiradas = true
								}
							} else {
								if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == false) {
									$scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
								} else {
									$scope.dosificacionesExpiradas = true
								}
							}
						} else {
							if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == false) {
								$scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
							} else {
								$scope.dosificacionesExpiradas = true
							}
						}
					}
				}
				if (!$scope.venta.id) {
					$scope.venta.actividad = $scope.actividades.length == 1 ? $scope.actividades[0] : null;
				}
			}

			$scope.obtenerVentas = function () {
				var currentDate = new Date();
				var currentDateString = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
				$scope.filtrarVentas($scope.sucursalesUsuario, currentDateString, currentDateString, {});
			}

			$scope.filtrarVentas = function (sucursalesUsuario, inicio, fin, filtro) {
				let filtro2 = {
					razon_social: '',
					estado: '',
					nit: '',
					monto: '',
					tipo_pago: '',
					sucursal: '',
					tipo_filtro_express: '',
					transaccion: '',
					almacenDestino: '',
					sucursalDestino: ''
				}
				filtro2.razon_social = (filtro.razon_social == "" || filtro.razon_social == undefined) ? 0 : filtro.razon_social;
				filtro2.estado = (filtro.estado == "" || filtro.estado == undefined) ? 0 : filtro.estado;
				filtro2.nit = (filtro.nit == null || filtro.nit == undefined) ? 0 : filtro.nit;
				filtro2.monto = (filtro.monto == null || filtro.monto == undefined) ? 0 : filtro.monto;
				filtro2.tipo_pago = (filtro.tipo_pago == undefined) ? 0 : filtro.tipo_pago;
				filtro2.sucursal = (filtro.sucursal == null || filtro.sucursal == undefined) ? 0 : filtro.sucursal;
				filtro2.tipo_filtro_express = (filtro.tipo_filtro_express == null || filtro.tipo_filtro_express == undefined) ? 0 : filtro.tipo_filtro_express == false ? 0 : true;
				filtro2.transaccion = (filtro.transaccion == null || filtro.transaccion == undefined) ? 0 : filtro.transaccion;
				filtro2.almacenDestino = (filtro.almacenDestino == null || filtro.almacenDestino == undefined) ? 0 : filtro.almacenDestino;
				filtro2.sucursalDestino = (filtro.sucursalDestino == null || filtro.sucursalDestino == undefined) ? 0 : filtro.sucursalDestino;
				let roles = $.grep($scope.usuario.rolesUsuario, function (e) { return e.rol.nombre == $scope.diccionario.ROL_ADMINISTRADOR; });
				filtro2.usuario = roles.length > 0 ? ((filtro.usuario == "" || filtro.usuario == undefined) ? 0 : filtro.usuario) : $scope.usuario.nombre_usuario;
				//usarPopUp = (usarPopUp) ? false : usarPopUp;
				blockUI.start();

				$scope.razon_sociald = filtro.razon_social;
				$scope.nitd = filtro.nit;
				$scope.montod = filtro.monto;
				$scope.usuariod = filtro.usuario;

				if (filtro.transaccion != 0) $scope.transacciond = $.grep($scope.movimientosEgreso, function (e) { return e.id == filtro.transaccion; }).length > 0 ? $.grep($scope.movimientosEgreso, function (e) { return e.id == filtro.transaccion; })[0].nombre : "todos";
				if (filtro.sucursal != 0) $scope.sucursald = $.grep($scope.sucursales, function (e) { return e.id == filtro.sucursal; }).length > 0 ? $.grep($scope.sucursales, function (e) { return e.id == filtro.sucursal; })[0].nombre : "todos";
				if (filtro.tipo_pago != 0) $scope.tipoPagod = $.grep($scope.tiposPago, function (e) { return e.id == filtro.tipo_pago; }).length > 0 ? $.grep($scope.tiposPago, function (e) { return e.id == filtro.tipo_pago; })[0].nombre : "todos";
				inicio = new Date($scope.convertirFechaVenta(inicio));
				fin = new Date($scope.convertirFechaVenta(fin));
				filtro2 = $scope.verificarFiltro(filtro2)
				let promesa = Ventas(0, inicio, fin, filtro2,$scope.usuario.id);
				promesa.then(function (ventas) {

					$scope.ventas = ventas;
					blockUI.stop();

					//$scope.aplicarTabla('tabla-ventas',6);
				});
			}

			$scope.abrirPopupPago = function (venta) {
				$scope.venta = venta;
				$scope.pago = null;
				$scope.abrirPopup($scope.idModalPago);
			}

			$scope.cerrarPopupPago = function () {
				$scope.cerrarPopup($scope.idModalPago);
			}

			$scope.realizarPago = function (idVenta, idEmpresa, pago, idUsuario) {
				var restante = 0;
				var restante_dolares = 0;
				var saldo = $scope.venta.saldo;
				var saldo_dolares = $scope.venta.saldo_dolares;
				restante = saldo - pago;
				if (restante < 0) {
					restante = restante;
				} else if (restante >= 0) {
					restante = 0;
				}
				if (restante_dolares < 0) {
					restante_dolares = restante_dolares;
				} else if (restante_dolares >= 0) {
					restante_dolares = 0;
				}
				blockUI.start();
				var promesa = PagosVentaCreditos(idVenta, idEmpresa, { pago: pago, id_usuario_cajero: idUsuario, saldoRestante: restante, saldoRestante_dolares: restante_dolares, fecha: new Date() })
				promesa.then(function (data) {
					SweetAlert.swal("Guardado!", data.mensaje, "success");
					$scope.cerrarPopup($scope.ModalMensajePago);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas();

					if (restante < 0) {
						$scope.imprimirRecibo(data, data.venta, saldo, restante, saldo_dolares, restante_dolares);
						$scope.imprimirReciboAnticipo(data.anticipo);
					} else {
						$scope.imprimirRecibo(data, data.venta, pago, restante);
					}
					blockUI.stop();
				})


				/*VentaEmpresaDatos.update({ id: idVenta, id_empresa: idEmpresa }, { pago: pago, id_usuario_cajero: idUsuario, saldoRestante: restante }, function (data) {
					$scope.mostrarMensaje(data.mensaje);
					$scope.cerrarPopup($scope.ModalMensajePago);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas();
					$scope.imprimirRecibo(data, data.venta, pago);
					blockUI.stop();
				}, function (error) {
					$scope.mostrarMensaje(error);
					$scope.cerrarPopup($scope.ModalMensajePago);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas();
					blockUI.stop();
				});*/
			}

			$scope.mensaje = function (value) {
				$scope.accion = value;
				if ($scope.accion == true) {
					$scope.realizarPago($scope.venta.id, $scope.usuario.id_empresa, $scope.pago, $scope.usuario.id);
				} else {
					$scope.cerrarPopup($scope.ModalMensajePago);
				}
			}

			$scope.efectuarPago = function (pago) {
				var tipoPago = $scope.usuario.empresa.usar_pago_anticipado;
				$scope.pago = pago;
				if (tipoPago == true) {
					//usar pagos anticipados
					if (pago <= $scope.venta.saldo) {
						$scope.realizarPago($scope.venta.id, $scope.usuario.id_empresa, pago, $scope.usuario.id);
					} else {
						$scope.abrirPopup($scope.ModalMensajePago);
					}
				} else {
					//no usar pagos anticipados
					if (pago <= $scope.venta.saldo) {
						$scope.realizarPago($scope.venta.id, $scope.usuario.id_empresa, pago, $scope.usuario.id);
					} else {
						SweetAlert.swal("", "El cobro excede el monto a cobrar", "warning");
					}
				}
				/*blockUI.start();
				VentaEmpresaDatos.update({ id: $scope.venta.id, id_empresa: $scope.usuario.id_empresa }, { pago: pago, id_usuario_cajero: $scope.usuario.id }, function (data) {
					$scope.mostrarMensaje(data.mensaje);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas();
					$scope.imprimirRecibo(data, data.venta, pago);
					blockUI.stop();
				}, function (error) {
					$scope.mostrarMensaje(error);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas();
					blockUI.stop();
				});*/
			}

			$scope.imprimirRecibo = function (data, venta, pago, anticipo) {
				blockUI.start();
				var doc = new PDFDocument({ compress: false, size: [227, 353], margin: 10 });
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
			}


			$scope.imprimirReciboAnticipo = function (anticipo) {
				blockUI.start();
				var doc = new PDFDocument({ compress: false, size: [227, 353], margin: 10 });
				var stream = doc.pipe(blobStream());
				doc.moveDown(2);
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				doc.text(anticipo.sucursal.nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(anticipo.sucursal.direccion.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				var telefono = (anticipo.sucursal.telefono1 != null ? anticipo.sucursal.telefono1 : "") +
					(anticipo.sucursal.telefono2 != null ? "-" + anticipo.sucursal.telefono2 : "") +
					(anticipo.sucursal.telefono3 != null ? "-" + anticipo.sucursal.telefono3 : "");
				doc.text("TELF.: " + telefono, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				doc.text("ANTICIPO", { align: 'center' });
				doc.font('Helvetica', 7);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				doc.text(anticipo.numero_correlativo_anticipo, { align: 'center' });
				//doc.text("NIT: "+$scope.usuario.empresa.nit,{align:'center'});

				//doc.text("FACTURA No: "+anticipo.factura,{align:'center'});
				doc.moveDown(0.4);
				//doc.text("AUTORIZACIÓN No: "+anticipo.autorizacion,{align:'center'});
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				//doc.text(anticipo.actividad.nombre,{align:'center'});
				doc.moveDown(0.6);
				var date = new Date();
				doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
				doc.moveDown(0.4);
				doc.text("He recibido de : " + anticipo.cliente.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("       CONCEPTO                                   ", { align: 'left' });
				doc.moveDown(0.2);

				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				anticipo.fecha = new Date(anticipo.fecha);
				doc.text("Fecha: " + anticipo.fecha.getDate() + "/" + (anticipo.fecha.getMonth() + 1) + "/" + anticipo.fecha.getFullYear(), 15, 210);
				//var textoFact = $scope.anticipo.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + $scope.anticipo.factura : "Proforma nro. " + $scope.anticipo.factura;
				//doc.text(textoFact, 105, 210, { width: 100 });
				/* if (anticipo >= 0) {
					doc.text("Saldo Bs " + ((anticipo.saldo - pago)*-1) + ".-", 105, 220, { width: 100 });
				}else{
					doc.text("Saldo Bs " +"0" + ".-", 105, 220, { width: 100 });
				} */
				doc.text("Anticipo", 105, 210, { width: 100 });
				doc.moveDown(0.2);
				doc.text("Bs " + anticipo.monto_anticipo.toFixed(2) + ".-", 170, 210, { width: 100 });

				doc.text("--------------", 10, 230, { align: 'right' });
				//oc.text("--------------------",{align:'right'});
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.              " + anticipo.monto_anticipo.toFixed(2), { align: 'right' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.text(ConvertirALiteral(anticipo.monto_anticipo.toFixed(2)), { align: 'left' });
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
				doc.moveDown(0.4);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.text("  Usuario : " + $scope.usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}

			$scope.abrirPopupCierre = function () {
				$scope.cierre = {}
				$scope.abrirPopup($scope.idModalCierre);
			}

			$scope.cerrarPopupCierre = function () {
				$scope.cerrarPopup($scope.idModalCierre);
			}

			$scope.cerrarCaja = function (cierre) {
				blockUI.start();
				inicio = new Date();
				fin = new Date();
				var promesa = VentasContado($scope.sucursalesUsuario, inicio, fin, $scope.usuario.id);
				promesa.then(function (ventasContado) {
					promesa = VentasCredito($scope.sucursalesUsuario, inicio, fin, $scope.usuario.id);
					promesa.then(function (ventasCredito) {
						promesa = PagosVenta($scope.sucursalesUsuario, inicio, fin, $scope.usuario.id);
						promesa.then(function (pagos) {
							$scope.generarReporteCierreCaja(cierre, ventasContado, ventasCredito, pagos);
							$scope.cerrarPopupCierre();
						});
					});
				});
			}

			$scope.generarReporteCierreCaja = function (cierre, ventas, ventasCredito, pagos) {
				var promesa = ConfiguracionImpresionEmpresaDato($scope.usuario.id_empresa, 0);
				promesa.then(function (configuracion) {
					var papel = [612, 792];
					if (configuracion.usar) {
						if (configuracion.tamanoPapelCierreCaja.nombre_corto == $scope.diccionario.FACT_PAPEL_OFICIO) {
							papel = [612, 936];
							$scope.imprimirReporteCierreCajaCartaOficio(papel, cierre, ventas, ventasCredito, pagos);
						} else if (configuracion.tamanoPapelCierreCaja.nombre_corto == $scope.diccionario.FACT_PAPEL_CARTA) {
							papel = [612, 792];
							$scope.imprimirReporteCierreCajaCartaOficio(papel, cierre, ventas, ventasCredito, pagos);
						} else if (configuracion.tamanoPapelCierreCaja.nombre_corto == $scope.diccionario.FACT_PAPEL_MEDIOOFICIO) {
							papel = [612, 468];
							$scope.imprimirReporteCierreCajaCartaOficio(papel, cierre, ventas, ventasCredito, pagos);
						} else if (configuracion.tamanoPapelCierreCaja.nombre_corto == $scope.diccionario.FACT_PAPEL_ROLLO) {
							var alto, totalItems = ventas.length + ventasCredito.length + pagos.length;
							if (totalItems <= 2) {
								alto = 310;
							} else {
								alto = 310 + (20 * (totalItems - 2))
							}
							papel = [227, alto];
							$scope.imprimirReporteCierreCajaRollo(papel, cierre, ventas, ventasCredito, pagos);
						}
					} else {
						var alto, totalItems = ventas.length + ventasCredito.length + pagos.length;
						if (totalItems <= 2) {
							alto = 310;
						} else {
							alto = 310 + (20 * (totalItems - 2))
						}
						papel = [227, alto];
						$scope.imprimirReporteCierreCajaRollo(papel, cierre, ventas, ventasCredito, pagos);
					}
				});
			}


			$scope.imprimirFiltroCajaCartaOficio = async function (ventas, fechaInicio, fechaFin) {
				$scope.resaltar = false;
				var doc = new PDFDocument({ compress: false, size: [612, 792], margin: 0 });
				var stream = doc.pipe(blobStream());
				var itemsPorPagina = 20;
				if ($scope.trueDetalle) {
					var c = ventas.length * 2;
					for (var i = 0; i < ventas.length; i++) {
						datosVenta = await DatosVenta(ventas[i].id, $scope.usuario.id_empresa);
						ventas[i] = datosVenta.venta
						if ($scope.filtroVenta.tipo_filtro_express && ventas[i].id_mesero && ventas[i].id_liquidacion) {
							var data = await ObtenerDetallesVentasExpressPorFactura(ventas[i].id_mesero, ventas[i].id_liquidacion)
							ventas[i].detallesVenta = data.detalles
							ventas[i].total = 0
							ventas[i].importe = 0
							for (const detalle of data.detalles) {
								ventas[i].total += (detalle.cantidad * detalle.total)
								ventas[i].importe += (detalle.cantidad * detalle.importe)
							}
						}
						c = c + ventas[i].detallesVenta.length;
					}
					var totalPaginas = Math.ceil(c / (itemsPorPagina));
				} else {
					var itemsPorPagina = 20;
					var totalPaginas = Math.ceil(ventas.length / itemsPorPagina);
				}
				var y = 100, items = 0, pagina = 1;
				$scope.imprimirCabeceraFiltroCajaCartaOficio(doc, 1, totalPaginas, ventas, fechaInicio, fechaFin);

				doc.font('Helvetica', 7);

				for (var i = 0; i < ventas.length; i++) {
					doc.font('Helvetica', 7);
					doc.rect(50, y + 9, 520, 0).stroke();

					doc.text(i + 1, 55, y + 20);
					doc.font('Helvetica', 6);
					doc.text((ventas[i].movimiento) ? ventas[i].movimiento.clase.nombre : ventas[i].movimientoServicio.nombre, 65, y + 20);
					doc.text((ventas[i].almacen) ? ventas[i].almacen.sucursal.nombre : ventas[i].sucursal.nombre, 120, y + 20, { width: 60 });
					if (ventas[i].cliente) {
						doc.font('Helvetica', 6);
						doc.text(ventas[i].cliente.razon_social, 170, y + 15, { width: 75 });
						doc.font('Helvetica', 7);
						doc.text(ventas[i].cliente.nit, 245, y + 20);
					} else {
						doc.text("", 205, y + 16, { width: 75 });
						doc.text("", 265, y + 20);
					}
					doc.text(ventas[i].factura, 305, y + 20);
					ventas[i].fecha = new Date(ventas[i].fecha);
					doc.text(ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear(), 345, y + 20);
					doc.text(ventas[i].fecha.getHours() + ":" + ventas[i].fecha.getMinutes() + " - ", 385, y + 13, { width: 28 });
					doc.text(ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear(), 385, y + 21, { width: 32 });
					doc.text(ventas[i].total, 425, y + 20);
					if (ventas[i].tipoPago) {
						doc.text(ventas[i].tipoPago.nombre, 455, y + 20);
						if (ventas[i].tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
							doc.font('Helvetica', 6);
							doc.text("Plazo: " + ventas[i].dias_credito + " A cuenta: Bs " + ventas[i].a_cuenta + " Saldo: Bs " + ventas[i].saldo, 510, y + 16, { width: 55 });
						}
					} else {
						doc.text("", 455, y + 20);
						doc.text("", 520, y + 16, { width: 65 });
					}

					if ($scope.trueDetalle) {
						doc.rect(50, y + 34, 520, 0).stroke();
						doc.font('Helvetica', 7);
						y = y + 50;

						doc.text("N°", 90, y);
						doc.text("Nombre", 100, y);
						doc.text("descripcion", 180, y);
						doc.text("Codigo Item", 290, y);
						doc.text("Unidad de Med", 345, y);
						doc.text("Cantidad", 400, y);
						doc.text("Importe", 455, y);
						items++;
						for (var j = 0; j < ventas[i].detallesVenta.length; j++) {
							doc.font('Helvetica', 6);

							doc.text(j + 1, 90, y + 20);
							var nombre = (ventas[i].detallesVenta[j].producto) ? ventas[i].detallesVenta[j].producto.nombre : ventas[i].detallesVenta[j].servicio.nombre
							nombre = nombre.length > 42 ? nombre.substr(0, 42) + "..." : nombre
							doc.text(nombre, 100, y + 20, { width: 70 });
							var descripcion = (ventas[i].detallesVenta[j].producto) ? ventas[i].detallesVenta[j].producto.descripcion : ""
							if (descripcion) {
								descripcion = descripcion.length > 42 ? descripcion.substr(0, 42) + "..." : descripcion
							}
							doc.text((ventas[i].detallesVenta[j].producto) ? descripcion : "", 180, y + 20, { width: 110 });
							doc.text((ventas[i].detallesVenta[j].producto) ? ventas[i].detallesVenta[j].producto.codigo : "0", 295, y + 20);
							doc.text((ventas[i].detallesVenta[j].producto) ? ventas[i].detallesVenta[j].producto.unidad_medida : "0", 350, y + 20);
							doc.text((ventas[i].detallesVenta[j].producto) ? ventas[i].detallesVenta[j].cantidad : "0", 405, y + 20);
							doc.text(ventas[i].detallesVenta[j].importe, 460, y + 20);

							y = y + 24
							items++;
							if (items + 1 > itemsPorPagina - 1) {
								y = y + 10;

								doc.text(pagina + " de " + totalPaginas, 520, 705);
								var currentDate = new Date();
								doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hr:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 705);
								doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 150, 705);

								doc.addPage({ size: [612, 792], margin: 10 });
								y = 100;
								items = 0;
								pagina = pagina + 1;
								$scope.imprimirCabeceraFiltroCajaCartaOficio(doc, 1, totalPaginas, ventas, fechaInicio, fechaFin);
							}
						}

						doc.font('Helvetica', 7);
						y = y + 4;
						items++;

						if (items > itemsPorPagina) {
							y = y + 10;
							doc.text(pagina + " de " + totalPaginas, 520, 705);
							var currentDate = new Date();
							//doc.rect(50,y+6,520,0).stroke();
							doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hr:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 705);
							doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 150, 705);

							doc.addPage({ size: [612, 792], margin: 10 });
							y = 100;
							items = 0;
							pagina = pagina + 1;
							$scope.imprimirCabeceraFiltroCajaCartaOficio(doc, 1, totalPaginas, ventas, fechaInicio, fechaFin);
						}
					} else {

						doc.font('Helvetica', 7);
						y = y + 30;
						items++;

						if (items == itemsPorPagina) {
							doc.text(pagina + " de " + totalPaginas, 520, 705);
							var currentDate = new Date();
							doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hr:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 705);
							doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 150, 705);

							doc.addPage({ size: [612, 792], margin: 10 });
							y = 100;
							items = 0;
							pagina = pagina + 1;
							$scope.imprimirCabeceraFiltroCajaCartaOficio(doc, 1, totalPaginas, ventas, fechaInicio, fechaFin);
						}

					}
				}
				doc.font('Helvetica', 7);
				doc.text(pagina + " de " + totalPaginas, 520, 705);
				var currentDate = new Date();
				doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hr:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 705);
				doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 150, 705);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
				$scope.$evalAsync()
			}
			$scope.imprimirCabeceraFiltroCajaCartaOficio = function (doc, pagina, totalPaginas, ventas, fechaInicio, fechaFin) {

				doc.font('Helvetica-Bold', 16);
				doc.text('REPORTE', 0, 40, { align: 'center' });
				doc.font('Helvetica-Bold', 8);
				doc.rect(50, 80, 520, 620).stroke();

				doc.text("Desde: " + fechaInicio + " Hasta: " + fechaFin, 0, 55, { align: 'center' });

				var filtrod = [$scope.razon_sociald, $scope.nitd, $scope.montod, $scope.usuariod, $scope.transacciond, $scope.sucursald, $scope.tipoPagod];
				var x = 85, c = 0, cadena = "";
				doc.text("Filtro: ", 55, 65);
				for (var i = 0; i < filtrod.length; i++) {
					if (filtrod[i] != 0 && filtrod[i] != undefined) {
						//doc.text(filtrod[i]+", ",x,65);
						cadena = cadena + filtrod[i] + ", ";
						x = x + 65;

					} else {
						c = c + 1;
						if (c == 7) doc.text("GENERAL", 85, 65);
					}
				}

				doc.text(cadena, 85, 65);
				doc.font('Helvetica-Bold', 7);
				//doc.rect(50,80,520,25).stroke();


				doc.font('Helvetica-Bold', 8);

				doc.text("N°", 55, 90);
				doc.text("Transaccion", 65, 90);
				doc.text("Sucursal", 120, 90, { width: 43 });
				doc.text("Razon Social", 170, 90);
				doc.text("Nit Cliente", 245, 90, { width: 43 });
				doc.text("Fac.", 305, 90);
				doc.text("Fecha-Fact.", 345, 90 - 4, { width: 43 });
				doc.text("Hora-Fecha", 385, 90 - 4, { width: 43 });
				doc.text("Monto", 420, 90);
				doc.text("Tipo de Pago", 455, 90);
				doc.text("Pago", 520, 90);
			}
			$scope.imprimirFiltroExcelCajaCartaOficio = async function (ventas) {
				$scope.resaltar = false;
				blockUI.start();
				for (var i = 0; i < ventas.length; i++) {
					ventas[i].fecha = new Date(ventas[i].fecha);
				}
				ventas.sort(function (a, b) {
					if (a.fecha > b.fecha) {
						return 1;
					}
					if (a.fecha < b.fecha) {
						return -1;
					}
					return 0;
				})

				if ($scope.trueDetalle) {
					var data = [["N°", "TIPO DE TRANSACCIÓN", "SUCURSAL", "ALMACEN ORIGEN", "RAZON SOCIAL", "N° FACTURA", "NIT CLIENTE", "FECHA-FACT.", "HORA-FECHA", "TIPO DE PAGO", "PAGO", "SUCURSAL DESTINO", "ALMACEN DESTINO", "NOMBRE", "DESCRIPCIÓN", "CODIGO ITEM", "UNIDAD DE MET", "CANTIDAD","P/U", "IMPORTE", "LOTE","C/U","TOTAL COSTO"," MU(BRUTA)" ]]
					var index = 1
					for (var i = 0; i < ventas.length; i++) {
						//if ($scope.trueDetalle) {						
							datosVenta = await DatosVenta(ventas[i].id, $scope.usuario.id_empresa);
							ventas[i] = datosVenta.venta
							if ($scope.filtroVenta.tipo_filtro_express && ventas[i].id_mesero && ventas[i].id_liquidacion) {
								var datos = await ObtenerDetallesVentasExpressPorFactura(ventas[i].id_mesero, ventas[i].id_liquidacion)
								ventas[i].detallesVenta = datos.detalles
								ventas[i].total = 0
								ventas[i].importe = 0
								for (const detalle of datos.detalles) {
									ventas[i].total += (detalle.cantidad * detalle.total)
									ventas[i].importe += (detalle.cantidad * detalle.importe)
								}
							}
							
							for (var j = 0; j < ventas[i].detallesVenta.length; j++) {
								columns = [];
								columns.push(index);//columns.push(i + 1);
								columns.push((ventas[i].movimiento) ? ventas[i].movimiento.clase.nombre : ventas[i].movimientoServicio.nombre);
								columns.push((ventas[i].almacen) ? ventas[i].almacen.sucursal.nombre : ventas[i].sucursal.nombre);
								columns.push((ventas[i].almacen) ? ventas[i].almacen.nombre : '');
								if (ventas[i].cliente) {
									columns.push(ventas[i].cliente.razon_social);
									columns.push(ventas[i].factura);
									columns.push(ventas[i].cliente.nit);
								} else {
									columns.push("");
									columns.push(ventas[i].factura);
									columns.push("");
								}
								columns.push($scope.fechaATexto(ventas[i].fecha));
								columns.push($scope.formatoFechaHora(ventas[i].fecha));
								if (ventas[i].tipoPago) {
									columns.push(ventas[i].tipoPago.nombre);
			
									if (ventas[i].tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
										columns.push("Plazo: " + ventas[i].dias_credito + " A cuenta: Bs " + ventas[i].a_cuenta + " Saldo: Bs " + ventas[i].saldo);
									}
								} else {
									columns.push("");
								}
								if (ventas[i].movimiento) {
									if (ventas[i].movimiento.clase.nombre == "TRASPASO") {
										columns.push("");
										columns.push(ventas[i].almacenTraspaso.sucursal.nombre);
										columns.push(ventas[i].almacenTraspaso.nombre);
									}else{
										if (ventas[i].tipoPago) {
											if (ventas[i].tipoPago.nombre != $scope.diccionario.TIPO_PAGO_CREDITO) {
												columns.push('');
											}
										}else{
											columns.push('');
										}	
										columns.push('');
										columns.push('');
									}
								}else{
									columns.push('');
									columns.push('');
									columns.push('');
								}
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].producto.nombre : ventas[i].detallesVenta[j].servicio ? ventas[i].detallesVenta[j].servicio.nombre : 'ERROR SIN NOMBRE');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].producto.descripcion ? ventas[i].detallesVenta[j].producto.descripcion : 'SIN DESCRIPCION' : 'SIN DESCRIPCION');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].producto.codigo : ventas[i].detallesVenta[j].servicio ? "0" : 'ERROR SIN NOMBRE');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].producto.unidad_medida : ventas[i].detallesVenta[j].servicio ? "0" : 'ERROR SIN NOMBRE');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].cantidad : ventas[i].detallesVenta[j].servicio ? "0" : 'ERROR SIN NOMBRE');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].precio_unitario : ventas[i].detallesVenta[j].servicio ? "0" : '0');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].importe : ventas[i].detallesVenta[j].servicio ? (ventas[i].detallesVenta[j].importe) :'0');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].lote : ventas[i].detallesVenta[j].servicio ? "0" : 'ERROR SIN NOMBRE');
								columns.push(ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].inventario.costo_unitario_neto : ventas[i].detallesVenta[j].servicio ? "0" : 'SIN P/U' )
								let costo_total = 0;
								if(ventas[i].detallesVenta[j].producto){/// costo total
									if(ventas[i].movimiento.clase.nombre_corto == 'BAJA'){
										costo_total = ((ventas[i].detallesVenta[j].inventario.costo_unitario_neto)*(ventas[i].detallesVenta[j].cantidad))* -1
									}else{
										costo_total = ventas[i].detallesVenta[j].producto ? ((ventas[i].detallesVenta[j].inventario.costo_unitario_neto )*(ventas[i].detallesVenta[j].cantidad)) : ventas[i].detallesVenta[j].servicio ? (ventas[i].detallesVenta[j].servicio.total * 0.87 ) : '';
									}
								}else{
									costo_total = ventas[i].detallesVenta[j].servicio ? (ventas[i].detallesVenta[j].importe * 0.87 ) : '0';
								}
								columns.push(costo_total);
								let margen_total = 0
								if(ventas[i].detallesVenta[j].producto){/// Margen de utilidad
									if(ventas[i].movimiento.clase.nombre_corto == 'BAJA'){
										margen_total = (ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].importe : '0') -  costo_total
									}else{
										margen_total = ventas[i].detallesVenta[j].producto ? ((ventas[i].detallesVenta[j].producto ? ventas[i].detallesVenta[j].importe : '0') - costo_total) :'0' 
									}
								}else{
									margen_total = ventas[i].detallesVenta[j].servicio ? (ventas[i].detallesVenta[j].importe * 0.87 ): '0';
								}
								columns.push(margen_total);
								data.push(columns);
								index = index + 1 
							}
						//}
					}
				}else{
					var data = [["N°", "TIPO DE TRANSACCIÓN", "SUCURSAL", "ALMACEN ORIGEN", "RAZON SOCIAL", "N° FACTURA", "NIT CLIENTE", "FECHA-FACT.", "HORA-FECHA", "TOTAL-IMP", "TIPO DE PAGO", "PAGO", "SUCURSAL DEST", "ALMACEN DEST"]]
					for (var i = 0; i < ventas.length; i++) {					
							datosVenta = await DatosVenta(ventas[i].id, $scope.usuario.id_empresa);
							ventas[i] = datosVenta.venta
							if ($scope.filtroVenta.tipo_filtro_express && ventas[i].id_mesero && ventas[i].id_liquidacion) {
								var datos = await ObtenerDetallesVentasExpressPorFactura(ventas[i].id_mesero, ventas[i].id_liquidacion)
								ventas[i].detallesVenta = datos.detalles
								ventas[i].total = 0
								ventas[i].importe = 0
								for (const detalle of datos.detalles) {
									ventas[i].total += (detalle.cantidad * detalle.total)
									ventas[i].importe += (detalle.cantidad * detalle.importe)
								}
							}
							var index = 1
							
								columns = [];
								columns.push(index);//columns.push(i + 1);
								columns.push((ventas[i].movimiento) ? ventas[i].movimiento.clase.nombre : ventas[i].movimientoServicio.nombre);
								columns.push((ventas[i].almacen) ? ventas[i].almacen.sucursal.nombre : ventas[i].sucursal.nombre);
								columns.push((ventas[i].almacen) ? ventas[i].almacen.nombre : '');
								if (ventas[i].cliente) {
									columns.push(ventas[i].cliente.razon_social);
									columns.push(ventas[i].factura);
									columns.push(ventas[i].cliente.nit);
								} else {
									columns.push("");
									columns.push(ventas[i].factura);
									columns.push("");
								}
								columns.push(ventas[i].fecha);// fecha de factura 
								columns.push(ventas[i].fecha);//fecha de venta hora - fecha
								columns.push(ventas[i].total);
								if (ventas[i].tipoPago) {
									columns.push(ventas[i].tipoPago.nombre);
			
									if (ventas[i].tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
										columns.push("Plazo: " + ventas[i].dias_credito + " A cuenta: Bs " + ventas[i].a_cuenta + " Saldo: Bs " + ventas[i].saldo);
									}
								} else {
									columns.push("");
								}
								if (ventas[i].movimiento) {
									if (ventas[i].movimiento.clase.nombre == "TRASPASO") {
										columns.push("");
			
										columns.push(ventas[i].almacenTraspaso.sucursal.nombre);
										columns.push(ventas[i].almacenTraspaso.nombre);
									}else{
										if (ventas[i].tipoPago) {
											if (ventas[i].tipoPago.nombre != $scope.diccionario.TIPO_PAGO_CREDITO) {
												columns.push('');
											}
										}else{
											columns.push('');
										}	
										columns.push('');
									}
								}else{
									columns.push('');
									columns.push('');
								}
								
								data.push(columns);
								index = index + 1 
					}
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte-ventas.xlsx");
				blockUI.stop();
				$scope.$evalAsync()
			}


			$scope.imprimirReporteCierreCajaCartaOficio = function (papel, cierre, ventas, ventasCredito, pagos) {
				var doc = new PDFDocument({ compress: false, size: papel, margin: 0 });
				var stream = doc.pipe(blobStream());
				doc.font('Helvetica-Bold', 15);
				doc.text("CIERRE DE CAJA", 55, 50);
				doc.font('Helvetica-Bold', 8);
				doc.text("SALDO INICIAL: ", 55, 80);
				doc.text(cierre.saldo_inicial, 350, 80);
				doc.font('Helvetica-Bold', 8);
				doc.text("VENTAS AL CONTADO: ", 55, 100);
				doc.font('Helvetica', 8);
				var y = 100, suma = 0, sumaPago = 0;
				for (var i = 0; i < ventas.length; i++) {
					doc.text("No. " + ventas[i].factura, 55, y + 20);
					doc.text(ventas[i].cliente.razon_social, 100, y + 20);
					doc.text(ventas[i].total, 300, y + 20);
					suma = suma + ventas[i].total;
					y = y + 20;
				}
				doc.font('Helvetica-Bold', 8);
				doc.text(suma, 350, 100);

				doc.font('Helvetica-Bold', 8);
				doc.text("VENTAS AL CREDITO: ", 55, y + 20);
				doc.font('Helvetica', 8);
				var creditoY = y + 20;
				y = y + 20; var sumaCredito = 0;
				for (var i = 0; i < ventasCredito.length; i++) {
					if (ventasCredito[i].pagosVenta.length > 0) {
						if (ventasCredito[i].pagosVenta[0].a_cuenta_anterior > 0) {
							doc.text("No. " + ventasCredito[i].factura, 55, y + 20);
							doc.text(ventasCredito[i].cliente.razon_social, 100, y + 20);
							doc.text(ventasCredito[i].pagosVenta[0].a_cuenta_anterior, 300, y + 20);
							sumaCredito = sumaCredito + ventasCredito[i].pagosVenta[0].a_cuenta_anterior;
							y = y + 20;
						}
					} else {
						if (ventasCredito[i].a_cuenta) {
							doc.text("No. " + ventasCredito[i].factura, 55, y + 20);
							doc.text(ventasCredito[i].cliente.razon_social, 100, y + 20);
							doc.text(ventasCredito[i].a_cuenta, 300, y + 20);
							sumaCredito = sumaCredito + ventasCredito[i].a_cuenta;
							y = y + 20;
						}
					}
				}
				doc.font('Helvetica-Bold', 8);
				doc.text(sumaCredito, 350, creditoY);
				var cobroY = y + 20;

				doc.text("COBROS REALIZADOS: ", 55, y + 20);
				doc.font('Helvetica', 8);
				y = y + 20;
				for (var i = 0; i < pagos.length; i++) {
					doc.text("No. " + pagos[i].venta.factura, 55, y + 20);
					doc.text(pagos[i].venta.cliente.razon_social, 100, y + 20);
					doc.text(pagos[i].monto_pagado, 300, y + 20);
					sumaPago = sumaPago + pagos[i].monto_pagado;
					y = y + 20;
				}
				doc.text(sumaPago, 350, cobroY);
				doc.font('Helvetica-Bold', 8);
				doc.text("GASTOS: ", 55, y + 40);
				doc.text(cierre.gastos, 350, y + 40);
				doc.text("SALDO FINAL CAJA: ", 55, y + 60);
				doc.text((Math.round((cierre.saldo_inicial + suma + sumaCredito + sumaPago - cierre.gastos) * 100) / 100), 350, y + 60);
				doc.text("---------------------------------------------                       ---------------------------------------------", 0, y + 100, { align: 'center' });
				doc.text("ENTREGUE CONFORME                                     RECIBI CONFORME", 0, y + 130, { align: 'center' });

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}

			$scope.imprimirReporteCierreCajaRollo = function (papel, cierre, ventas, ventasCredito, pagos) {
				var doc = new PDFDocument({ compress: false, size: papel, margins: { top: 10, bottom: 10, left: 10, right: 20 } });
				var stream = doc.pipe(blobStream());
				doc.moveDown(2);
				doc.font('Helvetica-Bold', 8);
				doc.text("CIERRE DE CAJA", { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica-Bold', 8);
				var currentY = doc.y;
				doc.text("SALDO INICIAL: ", { align: 'left', width: 100 });
				doc.text(cierre.saldo_inicial, 0, currentY, { align: 'right' });
				doc.x = 10;
				doc.moveDown(0.8);
				doc.font('Helvetica-Bold', 8);
				var yContado = doc.y;
				doc.text("VENTAS AL CONTADO: ", { align: 'left' });
				doc.font('Helvetica', 8);
				doc.moveDown(0.4);
				var y = doc.y, suma = 0, sumaPago = 0;
				for (var i = 0; i < ventas.length; i++) {
					doc.text("No. " + ventas[i].factura, 20, y);
					doc.text(ventas[i].cliente.razon_social, 60, y, { width: 90 });
					doc.text(ventas[i].total, 150, y);
					suma = suma + ventas[i].total;
					y = y + 20;
				}
				doc.font('Helvetica-Bold', 8);
				doc.text(suma, 0, yContado, { align: 'right' });
				doc.y = y;
				doc.moveDown(0.4);
				doc.x = 10;
				doc.font('Helvetica-Bold', 8);
				var creditoY = doc.y;
				doc.text("VENTAS AL CREDITO: ", { align: 'left' });
				doc.font('Helvetica', 8);
				doc.moveDown(0.4);
				y = doc.y; var sumaCredito = 0;
				for (var i = 0; i < ventasCredito.length; i++) {
					if (ventasCredito[i].pagosVenta.length > 0) {
						if (ventasCredito[i].pagosVenta[0].a_cuenta_anterior > 0) {
							doc.text("No. " + ventasCredito[i].factura, 20, y);
							doc.text(ventasCredito[i].cliente.razon_social, 60, y, { width: 90 });
							doc.text(ventasCredito[i].pagosVenta[0].a_cuenta_anterior, 150, y);
							sumaCredito = sumaCredito + ventasCredito[i].pagosVenta[0].a_cuenta_anterior;
							y = y + 20;
						}
					} else {
						if (ventasCredito[i].a_cuenta) {
							doc.text("No. " + ventasCredito[i].factura, 20, y);
							doc.text(ventasCredito[i].cliente.razon_social, 60, y, { width: 90 });
							doc.text(ventasCredito[i].a_cuenta, 150, y);
							sumaCredito = sumaCredito + ventasCredito[i].a_cuenta;
							y = y + 20;
						}
					}
				}
				doc.font('Helvetica-Bold', 8);
				doc.text(sumaCredito, 0, creditoY, { align: 'right' });
				doc.y = y;
				doc.moveDown(0.4);
				doc.x = 10;
				var cobroY = doc.y;
				doc.text("COBROS REALIZADOS: ", { align: 'left' });
				doc.font('Helvetica', 8);
				doc.moveDown(0.4);
				y = doc.y;
				for (var i = 0; i < pagos.length; i++) {
					doc.text("No. " + pagos[i].venta.factura, 20, y);
					doc.text(pagos[i].venta.cliente.razon_social, 60, y, { width: 90 });
					doc.text(pagos[i].monto_pagado, 150, y);
					sumaPago = sumaPago + pagos[i].monto_pagado;
					y = y + 20;
				}
				doc.font('Helvetica-Bold', 8);
				doc.text(sumaPago, 0, cobroY, { align: 'right' });
				doc.y = y;
				doc.moveDown(0.4);
				doc.x = 10;
				doc.font('Helvetica-Bold', 8);
				currentY = doc.y;
				doc.text("GASTOS: ", { align: 'left' });
				doc.text(cierre.gastos, 0, currentY, { align: 'right' });
				doc.x = 10;
				doc.moveDown(0.4);
				currentY = doc.y;
				doc.text("SALDO FINAL CAJA: ", { align: 'left' });
				doc.text((Math.round((cierre.saldo_inicial + suma + sumaCredito + sumaPago - cierre.gastos) * 100) / 100), 0, currentY, { align: 'right' });
				doc.x = 10;
				doc.text("-----------------------------      -----------------------------", 0, y + 100, { align: 'center' });
				doc.text("ENTREGUE CONFORME   RECIBI CONFORME", { align: 'center' });

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}

			$scope.sumarMonto = function () {
				var suma = 0;
				for (var i = 0; i < $scope.ventas.length; i++) {
					if ($scope.ventas[i].movimiento) {
						if (($scope.ventas[i].movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ||
							$scope.ventas[i].movimiento.clase.nombre_corto == $scope.diccionario.EGRE_PROFORMA) && $scope.ventas[i].activa) {
							suma = suma + $scope.ventas[i].total;
						}
					} else {
						if ($scope.ventas[i].movimientoServicio.nombre_corto == $scope.diccionario.EGRE_SERVICIO && $scope.ventas[i].activa) {
							suma = suma + $scope.ventas[i].total;
						}
					}
				}
				return Math.round(suma * 100) / 100;
			}

			$scope.crearNuevaVenta = function (venta) {
				//console.log("venta ressss =========== ", venta);
				$scope.encendido = false;
				$scope.obtenerListaServiciosVentas();
				$scope.obtenerVendedores();
				$scope.filtroVenta.tipo_filtro_express = false
				$scope.blockerVenta = true
				$scope.venta = new Venta({
					usar_descuento_general: false,
					tipo_descuento: false,
					descuento: 0,
					tipo_recargo: false,
					recargo: 0,
					ice: 0,
					excento: 0,
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, cliente: {},
					detallesVenta: [], detallesVentaNoConsolidadas: [], pagado: 0, pagado_dolares: 0, cambio: 0, cambio_dolares: 0, despachado: false, vendedor: null, total_descuento: 0, total_descuento_dolares: 0, total_recargo_dolares: 0, total_ice: 0, total_ice_dolares: 0
				});
				var al = 0;
				if (venta == undefined) {
					$scope.venta.sucursal = $scope.sucursales.length == 1 ? $scope.sucursales[0] : null;
				} else {
					$scope.venta.sucursal = venta.sucursal;
					al = venta.almacen;
				}

				if ($scope.venta.sucursal) {
					$scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
					if (al != null) {
						if (al.id) {
							$scope.venta.almacen = al;
						}
					}
				}
				$scope.venta.movimiento = $scope.movimientosEgreso[0];
				// $scope.venta.sucursal =  $scope.sucursales[0];
				$scope.obtenerTipoEgreso($scope.venta.movimiento);
				var fechaActual = new Date();
				var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
				var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
				$scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
				$scope.venta.tipoPago = $scope.tiposPago[0];
				$scope.cambiarTipoPago($scope.venta);
				$scope.editar_precio = false;
				$scope.detalleVenta = { eliminado: false, producto: { activar_inventario: true }, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, servicio: {} }
				$scope.abrirPopup($scope.idModalWizardCompraEdicion);
				angular.element($window).unbind("keydown");
				angular.element($window).bind("keydown", function (e) {
					if (e.keyCode == 115) {
						$scope.venderProformaDirectoNormal($scope.venta);
					}
				});
				$scope.enfocar('nit');
				$scope.cotizacionAgregado = false;
			}


			$scope.venderProformaDirectoNormal = function (venta) {
				//console.log("venta.sucursal.id ==", venta.sucursal.id);
				if (venta.detallesVenta.length > 0) {
					var promesa = ClientesNit($scope.usuario.id_empresa, 0);
					promesa.then(function (results) {
						if (results.length == 1 || results.length > 1) {
							$scope.establecerCliente(results[0]);
						} else {
							$scope.venta.cliente.razon_social = null;
						}
						venta.movimiento = $.grep($scope.movimientosEgreso, function (e) { return e.nombre_corto == $scope.diccionario.EGRE_PROFORMA; })[0];
						venta.tipoPago = $.grep($scope.tiposPago, function (e) { return e.nombre == $scope.diccionario.TIPO_PAGO_CONTADO; })[0];
						$scope.obtenerTipoEgreso(venta.movimiento);
						$scope.cambiarTipoPago(venta);
						var fechaActual = new Date();
						var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
						var mes = ((fechaActual.getMonth()) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
						venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
						fecha = fechaActual;
						venta.pagado = venta.total;
						venta.cambio = 0;
						$scope.usuario.empresa.usar_vencimientos = false;
						//console.log("la ventaaa directo ======== ", venta);
						$scope.guardarVenta(true, venta);
						$scope.venta.sucursal = venta.sucursal;
					});

				} else {
					$scope.$apply(function () {
						$scope.message = "¡Debe agregar al menos un producto para realizar la transacción!";
						SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
					});
				}

				// $scope.venta.sucursal = venta.sucursal.id;

			}

			$scope.verVenta = async function (venta) {
				/* 	var prom = InfoVenta(venta.id)
					prom.then(function (res) {

				}) */
				var datos = await DatosVenta(venta.id, $scope.usuario.id_empresa);
				$scope.venta = datos.venta;
				if ($scope.filtroVenta.tipo_filtro_express && $scope.venta.id_mesero && $scope.venta.id_liquidacion) {
					var data = await ObtenerDetallesVentasExpressPorFactura($scope.venta.id_mesero, $scope.venta.id_liquidacion)
					$scope.venta.detallesVenta = data.detalles
					$scope.venta.total = 0
					$scope.venta.importe = 0
					$scope.venta.pagado = 0
					idventa = 0
					for (const detalle of data.detalles) {
						$scope.venta.total += (detalle.cantidad * detalle.total)
						$scope.venta.importe += (detalle.cantidad * detalle.importe)
						if (idventa != detalle.venta.id) {
							$scope.venta.pagado += detalle.venta.pagado
						}
						idventa = detalle.venta.id
					}
				}
				$scope.abrirPopup($scope.idModalWizardVentaVista);
				$scope.$evalAsync()
			}

			$scope.cerrarPopupVista = function () {
				$scope.cerrarPopup($scope.idModalWizardVentaVista);
			}

			$scope.cerrarPopupEdicion = function () {
				$scope.ocultarMensajesValidacion();
				//$scope.recargarItemsTabla();
				$scope.cerrarPopup($scope.idModalWizardCompraEdicion);
			}

			$scope.calcularCambio = function () {
				if ($scope.esContado) {
					$scope.venta.cambio = Math.round(($scope.venta.pagado - $scope.venta.total) * 1000) / 1000;
					$scope.venta.cambio_dolares = Math.round(($scope.venta.pagado_dolares - $scope.venta.total_dolares) * 1000) / 1000;
					$scope.pagoMinimo_dolares = Math.round($scope.venta.total_dolares * 1000) / 1000;
					$scope.pagoMinimo = Math.round($scope.venta.total * 1000) / 1000;
				} else {
					$scope.venta.cambio = 0;
					$scope.venta.cambio_dolares = 0;
					$scope.pagoMinimo = 0;
					$scope.pagoMinimo_dolares = 0;
				}
			}

			$scope.mostrarDescuentos = function () {
				var style = $(".des-datos").css("display");
				if (style == "none") {
					$(".des-datos").css("display", "");
				} else {
					$(".des-datos").css("display", "none");
				}
			}

			$scope.imprimirVenta = async function (id_venta, esAccionGuardar) {
				if (typeof id_venta === 'object' && id_venta !== null) {
					id_venta = id_venta.id
				}
				var datos = await DatosVenta(id_venta, $scope.usuario.id_empresa);
				var ventaConsultada = datos.venta;
				ventaConsultada.configuracion = datos.configuracion;
				ventaConsultada.sucursal = datos.sucursal;
				ventaConsultada.numero_literal = datos.numero_literal;
				ventaConsultada.pieFactura = datos.pieFactura;
				ventaConsultada.sucursalDestino = datos.sucursalDestino;
				ventaConsultada.sucursalPrincipal = datos.sucursalPrincipal;
				var fecha = new Date(ventaConsultada.fecha);
				var mes = ((fecha.getMonth() + 1) >= 10) ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)
				ventaConsultada.fechaTexto = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();
				if ($scope.sin_impresion_proforma_en_express) {
					ventaConsultada.sin_impresion_proforma_en_express = $scope.sin_impresion_proforma_en_express
				} else {
					ventaConsultada.sin_impresion_proforma_en_express = false
					ventaConsultada.sin_impresion_proforma_en_express = $scope.filtroVenta.tipo_filtro_express
				}
				//solo en caso de cierres de mesa en venta de expp al crear una venta!!!
				/* inicio */
				if ($scope.cierremesa) {
					if ($scope.cierremesa.movimiento) {
						if ($scope.cierremesa.movimiento.nombre_corto == $scope.diccionario.EGRE_FACTURACION) {
							if ($scope.detallesVentasMesa) {
								ventaConsultada.detallesVenta = $scope.detallesVentasMesa
								ventaConsultada.total = 0
								ventaConsultada.importe = 0
								for (const detalle of $scope.detallesVentasMesa) {
									ventaConsultada.total += (detalle.cantidad * detalle.total)
									ventaConsultada.importe += (detalle.cantidad * detalle.importe)
								}
								ventaConsultada.ImprimirfacturaNoPedidoExpress = true
								$scope.detallesVentasMesa = undefined
								$scope.cierremesa = undefined
							}
						}
					}
				}
				if ($scope.filtroVenta.tipo_filtro_express && ventaConsultada.id_mesero && ventaConsultada.id_liquidacion) {
					var data = await ObtenerDetallesVentasExpressPorFactura(ventaConsultada.id_mesero, ventaConsultada.id_liquidacion)
					ventaConsultada.detallesVenta = data.detalles
					ventaConsultada.total = 0
					ventaConsultada.importe = 0
					for (const detalle of data.detalles) {
						ventaConsultada.total += (detalle.cantidad * detalle.total)
						ventaConsultada.importe += (detalle.cantidad * detalle.importe)
					}
				}
				//solo en caso de cierres de mesa en venta de expp al crear una venta!!!
				/* fin */
				/* if ($scope.formatosFactura) { */
				if (ventaConsultada.movimiento) {
					ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, esAccionGuardar ? esAccionGuardar : false, $scope.usuario, false, $scope.mostrarMensaje);
				} else {
					ImprimirSalida(ventaConsultada.movimientoServicio.nombre_corto, ventaConsultada, esAccionGuardar ? esAccionGuardar : false, $scope.usuario, false, $scope.mostrarMensaje);
				}

				/* } else {
					if (ventaConsultada.movimiento) {
						ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, false, $scope.usuario, false);
					} else {
						ImprimirSalida(ventaConsultada.movimientoServicio.nombre_corto, ventaConsultada, false, $scope.usuario, false);
					}
	
				} */


			}

			$scope.modificarPrecio = function () {
				$scope.editar_precio = true;
			}

			$scope.establecerPrecio = function () {
				$scope.editar_precio = false;
			}

			$scope.obtenerFormatoFactura = function () {
				blockUI.start();
				var promesa = ClasesTipo("FORM_IMP_FAC");
				promesa.then(function (entidad) {
					$scope.formatosFactura = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.obtenerAlmacenesDestino = function (almacen) {
				var alm = $.grep($scope.almacenes, function (e) { return e.id != almacen.id; });
				$scope.almacenesDiferente = alm;
			}

			$scope.sendMail = function () {
				var prom = EmailFacturaVentas($scope.dataMail)
				prom.then(function (res) {
					if (res.hasErr) {
						return $scope.mostrarMensaje(res.mensaje)
					}
					$scope.cerrarModalDestinatarioEmail()
					return $scope.mostrarMensaje(res.mensaje)
				}).catch(function (err) {
					var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					SweetAlert.swal("", msg, "error");
					$scope.cerrarModalDestinatarioEmail()
				})
			}

			$scope.guardarVenta = async function (valido, venta) {
				if (valido) {
					$scope.ventaBack = angular.copy(venta);
					$scope.ocultarMensajesValidacion();
					var tiempoActual = new Date();
					venta.fecha = new Date($scope.convertirFecha(venta.fechaTexto));
					venta.fecha.setHours(tiempoActual.getHours());
					venta.fecha.setMinutes(tiempoActual.getMinutes());
					venta.fecha.setSeconds(tiempoActual.getSeconds());
					venta.usar_configuracion_iso = $scope.usuario.empresa.usar_configuracion_iso;
					//venta.receptor=(venta.receptor!=undefined && venta.receptor!=null)?venta.receptor:((venta.receptor==undefined || venta.receptor==null)?(venta.textoVendedor!=""?{nombre_completo:venta.textoVendedor}:null):venta.receptor);
					blockUI.start();
					if (venta.id) {
						var promesa = ModificarVenta(venta)
						promesa.then(function (dato) {
							blockUI.stop();
							$scope.cerrarPopPupEdicion();
							SweetAlert.swal("Guardado!", dato.mensaje, "success");
							$scope.recargarItemsTabla();

						});
					} else {
						var movimiento = venta.movimiento.nombre_corto;
						if (movimiento == "TRAS_ALM") {
							movimiento = $scope.diccionario.EGRE_TRASPASO;
							venta.sucursalDestino = venta.sucursal;
							venta.movimiento = $.grep($scope.movimientosEgreso, function (e) { return e.nombre_corto == $scope.diccionario.EGRE_TRASPASO; })[0];
						}

						venta.usar_peps = $scope.usuario.empresa.usar_peps;
						if ($scope.usuario.empresa.usar_configuracion_iso) {
							var q = await ObtenerConfiguracionIso(venta.almacen.id_sucursal);
							if (q.configuracionesIso.length > 0 && venta.movimiento.nombre_corto === "TRAS") {
								q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "TRASPASOSUC" && cfg.activo == true);
							} else {
								if (q.configuracionesIso.length > 0 && venta.movimiento.nombre_corto === "BAJA") q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "BAJASUC" && cfg.activo == true)
							}
							if (q.length === 1) {
								venta.configuracionesIso = q[0];
								venta.config_doc_iso = q[0].id;
							} else {
								venta.configuracionesIso = undefined;
								venta.config_doc_iso = undefined;
							}
						}
						venta.$save(function (res) {
							console.log('retorno de guardar', res);
							if (res.hasError) {
								blockUI.stop();
								if (res.detalles) {
									SweetAlert.swal("", res.detalles.join('\n\n'), "warning");
									$scope.venta = $scope.ventaBack;
								} else {
									$scope.crearNuevaVenta(res);
									SweetAlert.swal("", res.message, "warning");
								}
							} else {
								blockUI.stop();
								$scope.cerrarPopPupEdicion();
								var datos = { id: res.venta.id_venta }
								if ($scope.ventaBack.actualizarCotizacion) {
									CotizacionRechazo.update({ id_cotizacion: $scope.ventaBack.cotizacion_id }, { estado: "ACEPTADO" }, function (res) {

									}, function (error) {
										SweetAlert.swal("", "Hubo un problema al guardar.", "warning");
									});
								}

								if ($scope.usuario.empresa.usar_vencimientos) {
									$scope.impresion = {
										movimiento: movimiento,
										res: res,
										al_guardar: true,
										usuario: $scope.usuario
									}
									if ($scope.usuario.empresa.usar_configuracion_iso) {
										if (res.venta.movimiento.nombre_corto === "BAJA") res.venta.configuracionesIso != undefined ? res.venta.configuracionesIso.predefinido ? $scope.imprimirBajaIsoModVentas(res.venta.id_venta, res.venta.configuracionesIso.version_impresion) : $scope.imprimirVenta(res.venta.id_venta, true) : $scope.imprimirVenta(res.venta.id_venta, true);
										if (res.venta.movimiento.nombre_corto === "TRAS") res.venta.configuracionesIso != undefined ? res.venta.configuracionesIso.predefinido ? $scope.imprimirTraspasoIsoModVentas(res.venta.id_venta, res.venta.configuracionesIso.version_impresion) : $scope.imprimirVenta(res.venta.id_venta, true) : $scope.imprimirVenta(res.venta.id_venta, true);
									} else {
										$scope.abrirPopup($scope.idModalImpresionVencimiento);
									}
									//ImprimirSalida(movimiento, res, true, $scope.usuario);
								} else {
									$scope.imprimirVenta(datos, true)
								}

								/* if (movimiento == $scope.diccionario.EGRE_SERVICIO) {
									ImprimirSalida(movimiento, res, true, $scope.usuario, false, $scope.mostrarMensaje);
								} else {
									// guardar actualicacion cotizacion ====
									if (venta.actualizarCotizacion) {
										CotizacionRechazo.update({ id_cotizacion: venta.cotizacion_id }, { estado: "ACEPTADO" }, function (res) {

										}, function (error) {
											$scope.mostrarMensaje('Hubo un problema al guardar.');
										});
									}

									if ($scope.usuario.empresa.usar_vencimientos) {
										$scope.impresion = {
											movimiento: movimiento,
											res: res,
											al_guardar: true,
											usuario: $scope.usuario
										}
										$scope.abrirPopup($scope.idModalImpresionVencimiento);
										//ImprimirSalida(movimiento, res, true, $scope.usuario);
									} else {
										ImprimirSalida(movimiento, res, true, $scope.usuario, false, $scope.mostrarMensaje);
									}
								} */
								$scope.crearNuevaVenta(res.venta);
								SweetAlert.swal("Guardado!", "Venta registrada exitosamente!", "success");
							}
						}, function (error) {
							blockUI.stop();
							$scope.cerrarPopPupEdicion();
							SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "warning");
							$scope.recargarItemsTabla();
						});
					}
				}
			}

			$scope.imprimirConVencimiento = function () {
				var promesa = DatosVenta($scope.impresion.res.venta.id_venta, $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					var ventaConsultada = datos.venta;
					ventaConsultada.con_vencimiento = true;
					ventaConsultada.configuracion = datos.configuracion;
					ventaConsultada.sucursal = datos.sucursal;
					ventaConsultada.numero_literal = datos.numero_literal;
					ventaConsultada.pieFactura = datos.pieFactura;
					ventaConsultada.sucursalDestino = datos.sucursalDestino;
					var fecha = new Date(ventaConsultada.fecha);
					ventaConsultada.fechaTexto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
					$scope.impresion.res = ventaConsultada;
					$scope.impresion.res.con_vencimiento = true;
					ImprimirSalida($scope.impresion.movimiento, $scope.impresion.res, $scope.impresion.al_guardar, $scope.impresion.usuario, false, $scope.mostrarMensaje);
					$scope.cerrarPopup($scope.idModalImpresionVencimiento);
				})
			}

			$scope.imprimirSinVencimiento = function () {
				var promesa = DatosVenta($scope.impresion.res.venta.id_venta, $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					var ventaConsultada = datos.venta;
					ventaConsultada.con_vencimiento = true;
					ventaConsultada.configuracion = datos.configuracion;
					ventaConsultada.sucursal = datos.sucursal;
					ventaConsultada.numero_literal = datos.numero_literal;
					ventaConsultada.pieFactura = datos.pieFactura;
					ventaConsultada.sucursalDestino = datos.sucursalDestino;
					var fecha = new Date(ventaConsultada.fecha);
					ventaConsultada.fechaTexto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
					$scope.impresion.res = ventaConsultada;
					$scope.impresion.res.con_vencimiento = false;
					ImprimirSalida($scope.impresion.movimiento, $scope.impresion.res, $scope.impresion.al_guardar, $scope.impresion.usuario, false, $scope.mostrarMensaje);
					$scope.cerrarPopup($scope.idModalImpresionVencimiento);
				})
			}

			$scope.imprimirVentaConVencimiento = function (venta) {
				var promesa = DatosVenta(venta.id, $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					var ventaConsultada = datos.venta;
					ventaConsultada.con_vencimiento = true;
					ventaConsultada.configuracion = datos.configuracion;
					ventaConsultada.sucursal = datos.sucursal;
					ventaConsultada.numero_literal = datos.numero_literal;
					ventaConsultada.pieFactura = datos.pieFactura;
					ventaConsultada.sucursalDestino = datos.sucursalDestino;
					var fecha = new Date(ventaConsultada.fecha);
					ventaConsultada.fechaTexto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
					ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, false, $scope.usuario, false, $scope.mostrarMensaje);
				});
			}

			$scope.cerrarPopPupEdicion = function () {
				$scope.cerrarPopup($scope.idModalWizardCompraEdicion);
			}



			$scope.obtenerAlmacenesEditar = function (idSucursal) {
				$scope.almacenes = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.almacenes = sucursal.almacenes;

			}



			$scope.buscarNit = function (evento, nit) {
				if (evento.which === 13) {
					var promesa = ClientesNit($scope.usuario.id_empresa, nit);
					promesa.then(function (results) {
						if (results.length == 1 || results.length > 1) {
							$scope.establecerCliente(results[0]);
							$scope.interceptarTecla(evento, "razon_socialP", true);
							$scope.interceptarTecla(evento, "razon_socialP1", true);
						} else {
							$scope.venta.cliente.razon_social = null;
							$scope.interceptarTecla(evento, "razon_socialP", true);
							$scope.interceptarTecla(evento, "razon_socialP1", true);
						}
					});
				}
				//$scope.capturarInteraccion();
			}

			/* //$scope.capturarInteraccion = function () {
				if ($scope.usuario.empresa.usar_pantalla_cliente) {
					socket.emit('comenzarVenta', $scope.venta);
				}
			} */

			$scope.abrirPopupPanel = function (sucursal, almacen, actividad, tipoPago, movimiento) {
				$scope.PopoverPanelesNormal.close();
				$('.panel-collapse').removeClass('in');
				$scope.filtroVenta.tipo_filtro_express = false
				// $scope.showHideFirstRow();
				$(".first-row").hide();
				angular.element(document.querySelector('body')).css('overflow', 'hidden');
				$scope.venta = new Venta({
					usar_descuento_general: false,
					tipo_descuento: false,
					descuento: 0,
					tipo_recargo: false,
					recargo: 0,
					ice: 0,
					excento: 0,
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, cliente: {},
					detallesVenta: [], detallesVentaNoConsolidadas: [], despachado: false,
					sucursal: sucursal, almacen: almacen, actividad: actividad, tipoPago: tipoPago, movimiento: movimiento, vendedor: null, total_descuento_general: 0
				});
				$scope.obtenerGruposProductoEmpresa();
				if (!sucursal) {
					$scope.venta.sucursal =/*$scope.sucursales.length==1?*/$scope.sucursales[0]/*:null*/;
				}
				if ($scope.venta.sucursal) {
					if ($scope.venta.almacen == null) {
						$scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
					}
				}
				if (!movimiento) {
					$scope.venta.movimiento = $scope.movimientosEgreso[0];
				}
				$scope.obtenerTipoEgreso($scope.venta.movimiento);
				if (!tipoPago) {
					$scope.venta.tipoPago = $scope.tiposPago[0];
				}
				$scope.cambiarTipoPago($scope.venta);
				var fechaActual = new Date();
				var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
				var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
				$scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
				$scope.abrirPopup($scope.idModalPanelVentas);
				$scope.enfocar('nitP');
				setTimeout(function () {
					aplicarDatePickers();
					$("#venta-proforma").draggable({
						cursor: "crosshair",
						start: $scope.startDragging
					});
				}, 2000);

				angular.element($window).unbind("keydown");
				angular.element($window).bind("keydown", function (e) {
					if (e.keyCode == 115) {
						$scope.venderProformaDirecto($scope.venta, false);
					}

					if (e.keyCode == 113) {
						$scope.venderProformaDirecto($scope.venta, true);
					}

					// ========= para la tecla F10 del panel ventas ============ 
					if (e.keyCode == 121) {
						e.preventDefault();
						// $scope.abrirPopPupVentasCobro();

						if ($scope.venta.detallesVenta.length > 0) {
							// $scope.abrirPopup($scope.idModalConfirmacionEliminacionVenta);
							var fechaActual = new Date();
							$scope.horaActual = fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
							$scope.abrirPopup($scope.idModalPanelVentasCobro);
							$scope.enfocar('nitP1');
							var select = $('#movimiento').val('24');
							angular.element(select).triggerHandler('change');
							angular.element($('#pagadoP').val($scope.venta.total)).triggerHandler('change');

							$("form").bind("keydown", function (e) {
								if (e.keyCode === 13) return false;
							});


						} else {
							SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
						}

					}
					// ========= para la tecla F10 fin ============ 
				});
			}

			$scope.capturarPago = function (keyEvent, formularioVentaPanel, venta) {
				//console.log('llego a cobroooooo 11111');

				if (keyEvent.keyCode == 13) {
					//console.log('llego a cobroooooo 22222222222');
					$scope.guardarVentaPanel(formularioVentaPanel, venta, false);
					$scope.cerrarPopPupVentasCobro();
				}

			}


			$scope.abrirPopPupVentasCobro = function () {
				if ($scope.venta.detallesVenta.length > 0) {
					var fechaActual = new Date();
					$scope.horaActual = fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
					$scope.abrirPopup($scope.idModalPanelVentasCobro);
					$scope.enfocar('nitP1');

					angular.element(select).triggerHandler('change');
					angular.element($('#pagadoP').val($scope.venta.total)).triggerHandler('change');

					$("form").bind("keydown", function (e) {
						if (e.keyCode === 13) return false;
					});
				} else {
					SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
				}
			}

			$scope.cerrarPopPupVentasCobro = function () {
				$scope.cerrarPopup($scope.idModalPanelVentasCobro);
			}

			$scope.cerrarPopupPanel = function () {
				angular.element(document.querySelector('body')).css('overflow', 'scroll');
				$scope.cerrarPopup($scope.idModalPanelVentas);
				$scope.productosProcesados = [];
				$scope.usar_productos_derivados_panel = false;
				// $scope.recargarItemsTabla();
				/* if ($scope.usuario.empresa.usar_pantalla_cliente) {
					socket.emit('terminarVenta', $scope.venta.sucursal);
				} */
				angular.element($window).unbind("keydown");
			}

			$scope.idGrupoGlobal = 0;
			$scope.dynamicPopoverGrupos = {
				templateUrl: 'myPopoverTemplateGrupos.html',
			};
			/* $scope.dynamicPopoverMesasExpress = {
				templateUrl: 'myPopoverTemplateMesasExpress.html',
			}; */
			/* $scope.dynamicPopoverCargos = {
				templateUrl: 'myPopoverTemplateMesasExpress.html',
			}; */
			$scope.PopoverPanelesExpress = {
				isOpen: false,
				templateUrl: 'PopoverPanelesExpress.html',
				open: function open() {
					$scope.PopoverPanelesExpress.isOpen = true;
				},
				close: function close() {
					$scope.PopoverPanelesExpress.isOpen = false;
				}
			};
			$scope.PopoverPanelesNormal = {
				isOpen: false,
				templateUrl: 'PopoverPanelesNormal.html',
				open: function open() {
					$scope.PopoverPanelesNormal.isOpen = true;
				},
				close: function close() {
					$scope.PopoverPanelesNormal.isOpen = false;
				}
			};
			$scope.abrirPopupPanelDerivado = function () {
				$scope.filtroVenta.tipo_filtro_express = false
				$scope.PopoverPanelesNormal.close();
				$scope.usar_productos_derivados_panel = true
				$scope.abrirPopupPanel(null, null, null, null, null)
			}
			$scope.abrirPopupPanelExpressDerivado = function () {
				$scope.filtroVenta.tipo_filtro_express = false
				$scope.PopoverPanelesExpress.close();
				$scope.sin_impresion_proforma_en_express = true
				$scope.usar_productos_derivados_panel = true
				$scope.abrirPopupPanelExpress(null, null, null, null, null)
			}
			$scope.abrirPopupPanelNormal = function () {
				$scope.filtroVenta.tipo_filtro_express = false
				$scope.usar_productos_derivados_panel = false
				$scope.abrirPopupPanel(null, null, null, null, null)
			}
			$scope.abrirPopupPanelExpressNormal = function () {
				$scope.filtroVenta.tipo_filtro_express = false
				$scope.usar_productos_derivados_panel = true
				$scope.abrirPopupPanelExpress(null, null, null, null, null)
			}
			$scope.grupoSeleccionado = { nombre: 'TODOS' }
			$scope.clasificarGrupo = function (grupo) {
				$scope.popoverIsOpen = false
				if (grupo) {
					$scope.grupoSeleccionado = grupo
					$scope.idGrupoGlobal = grupo.id;
				} else {
					$scope.grupoSeleccionado = { nombre: 'TODOS' }
					$scope.idGrupoGlobal = 0;
				}
				$scope.productosProcesados = [];
				$scope.page = 1;
				$scope.textoGlobal = 0;
				$scope.search = "";
				$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
				// $scope.productosProcesados = $filter('filter')($scope.productos, grupo);
				setTimeout(function () {
					aplicarSwiper(4, 3, true, 2);
				}, 5);
			}

			$scope.page = 1;
			$scope.fetching = false;
			$scope.textoGlobal = 0;
			$scope.getProductosPanel = function () {
				blockUI.stop();
				$scope.page++;
				$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
			};

			$scope.getProductoFilter = function (pagina, texto, grupo) {
				$scope.fetching = true;
				if ($scope.venta) {
					var promesa = ProductosPanelPaginador($scope.usuario.id_empresa, $scope.venta.almacen.id, $scope.usuario.id, pagina, texto, grupo);
					promesa.then(function (productos) {

						if (productos.length) {
							// $scope.items = $scope.items.concat(items);
							for (var i = 0; i < productos.length; i++) {
								var producto = productos[i]
								producto.visible = true
								producto.promocionEnHora = false
								producto.promocionActual = {}
								if (producto.promociones.length > 0 && producto.usar_promocion) {
									var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
									promosDia = producto.promociones.filter(function (x) {
										return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
									})
									if (producto.usar_promocion_en_dias_habilitados && promosDia.length == 0) {
										producto.visible = false
									}
									if (promosDia.length > 0) {
										var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
										producto.promocionEnHora = datosVerificacion.activo
										producto.promocionActual = datosVerificacion.promo

									}
								}
								if (producto.activar_inventario) {
									producto.inventario_disponible = $scope.obtenerInventarioTotal(producto);
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
			$scope.cargarProductosRelacion = function () {

				$scope.productosProcesados = [];

				var promesa = ProductosPanelPaginadorRelaciones($scope.usuario.id_empresa, $scope.venta.almacen.id, $scope.usuario.id, 1, $scope.textoGlobal, $scope.idGrupoGlobal, $scope.idPadreGlobal);
				promesa.then(function (productos) {
					for (var i = 0; i < productos.length; i++) {
						var producto = productos[i]
						producto.visible = true
						producto.promocionEnHora = false
						producto.promocionActual = {}
						if (producto.promociones.length > 0 && producto.usar_promocion) {
							var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
							promosDia = producto.promociones.filter(function (x) {
								return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
							})


							if (promosDia.length > 0) {
								var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
								producto.promocionEnHora = datosVerificacion.activo
								producto.promocionActual = datosVerificacion.promo

							}
							if (producto.usar_dias_hablitados && promosDia.length == 0) {
								producto.visible = false
							}
						}
						if (producto.activar_inventario) {
							producto.inventario_disponible = $scope.obtenerInventarioTotal(producto);
						}
						if (producto.preciosPorSucursales.length > 0) {
							var sucP = producto.preciosPorSucursales.find(function (x) {
								return x.sucursal.id == $scope.venta.sucursal.id
							})
							if (sucP) {
								producto.precio_unitario = sucP.precio_unitario
								producto.rango_positivo = sucP.rango_positivo
								producto.rango_negativo = sucP.rango_negativo
							}
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
			$scope.cargarProductos = function () {
				if ($scope.usar_productos_derivados_panel) {
					$scope.productosProcesados = [];
					$scope.page = 1;
					$scope.idGrupoGlobal = 0;
					$scope.textoGlobal = 0;
					$scope.idPadreGlobal = 0
					$scope.paginaActualPanelgrupo = 1
					$scope.cargarProductosRelacion()
				} else {
					$scope.productosProcesados = [];
					$scope.page = 1;
					$scope.idGrupoGlobal = 0;
					$scope.textoGlobal = 0;
					if($scope.usuario.id_empresa && $scope.venta.almacen && $scope.venta.almacen.id && $scope.usuario.id){
						var promesa = ProductosPanelPaginador($scope.usuario.id_empresa, $scope.venta.almacen.id, $scope.usuario.id, 1, $scope.textoGlobal, $scope.idGrupoGlobal);
						promesa.then(function (productos) {
							for (var i = 0; i < productos.length; i++) {
								var producto = productos[i]
								producto.visible = true
								producto.promocionEnHora = false
								producto.promocionActual = {}
								if (producto.promociones.length > 0 && producto.usar_promocion) {
									var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
									promosDia = producto.promociones.filter(function (x) {
										return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
									})


									if (promosDia.length > 0) {
										var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
										producto.promocionEnHora = datosVerificacion.activo
										producto.promocionActual = datosVerificacion.promo

									}
									if (producto.usar_dias_hablitados && promosDia.length == 0) {
										producto.visible = false
									}
								}
								if (producto.activar_inventario) {
									producto.inventario_disponible = $scope.obtenerInventarioTotal(producto);
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
				}
			}

			$scope.textorder = 'A<- ->Z';
			$scope.ordenarProductos = function (orden) {
				//console.log(orden);
				$scope.productosProcesados = $filter('orderBy')($scope.productos, ['nombre'], orden);
				$scope.ordenProductos = !orden;
				// ====  para agregar el texto de orden el sistema ====
				if (orden) {
					$scope.textorder = 'A<- ->Z';
				} else {
					$scope.textorder = "Z<- ->A";
				}
				// ==== fin ==============
				setTimeout(function () {
					aplicarSwiper(4, 3, true, 2);
				}, 5);
			}

			$scope.filtrarProductos = function (busqueda) {
				// $scope.productosProcesados = $filter('filter')($scope.productos, busqueda);
				$scope.textoGlobal = (busqueda !== "") ? busqueda : 0;
				// if ($scope.textoGlobal == 0 || $scope.textoGlobal.length >= 3) {
				$scope.productosProcesados = [];

				if ($scope.usar_productos_derivados_panel) {
					$scope.getProductoDerivadosFilter($scope.textoGlobal);
				} else {
					$scope.page = 1;
					$scope.idGrupoGlobal = 0;
					$scope.getProductoFilter($scope.page, $scope.textoGlobal, $scope.idGrupoGlobal);
				}
				setTimeout(function () {
					aplicarSwiper(4, 3, true, 2);
				}, 5);
				// }
			}


			$scope.getProductoDerivadosFilter = function (texto) {
				if ($scope.venta) {
					var promesa = ProductosPanelPaginadorRelaciones($scope.usuario.id_empresa, $scope.venta.almacen.id, $scope.usuario.id, 1, texto, $scope.idGrupoGlobal, $scope.idPadreGlobal);
					promesa.then(function (productos) {
						for (var i = 0; i < productos.length; i++) {
							var producto = productos[i]
							producto.visible = true
							producto.promocionEnHora = false
							producto.promocionActual = {}
							if (producto.promociones.length > 0 && producto.usar_promocion) {
								var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
								promosDia = producto.promociones.filter(function (x) {
									return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
								})


								if (promosDia.length > 0) {
									var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
									producto.promocionEnHora = datosVerificacion.activo
									producto.promocionActual = datosVerificacion.promo

								}
								if (producto.usar_dias_hablitados && promosDia.length == 0) {
									producto.visible = false
								}
							}
							if (producto.activar_inventario) {
								producto.inventario_disponible = $scope.obtenerInventarioTotal(producto);
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
			}

			// This is what you will bind the filter to
			$scope.search = '';
			// Instantiate these variables outside the watch
			var filterTextTimeout;
			$scope.$watch('search', function (val) {
				if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
				filterTextTimeout = $timeout(function () {
					$scope.filtrarProductos(val);
				}, 900); // delay 250 ms 
			})

			// == condicion save localstorage ====
			if (angular.isDefined($localStorage.color)) {
				$scope.color = $localStorage.color;
			} else {
				$localStorage.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
				$scope.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
			}
			// ==== fin save condicion

			$scope.cambiarColor = function (color, buttonColor) {
				// == save localstorage ====
				$localStorage.color = { 'style': color, 'stylebutton': buttonColor };
				// ==== fin ======

				$('#dialog-panel-ventas .widget-main').removeClass('red-style green-style skyblue-style brown-style');
				$('#dialog-panel-ventas .widget-main').addClass(color);

				$('#dialog-panel-ventas .widget-main .button-style').removeClass('red-style-button green-style-button skyblue-style-button brown-style-button');
				$('#dialog-panel-ventas .widget-main .button-style').addClass(buttonColor);
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
					$scope.venderProformaDirecto(venta, false);
				}

				$scope.dragged = false;
			};

			$scope.startDragging = function () {
				$scope.dragged = true;
			};

			$scope.venderProformaDirecto = function (venta, llevar) {
				if (venta.detallesVenta.length > 0) {
					var promesa = ClientesNit($scope.usuario.id_empresa, 0);
					promesa.then(function (results) {
						if (results.length == 1 || results.length > 1) {
							$scope.establecerCliente(results[0]);
						} else {
							$scope.venta.cliente.razon_social = null;
						}
						venta.movimiento = $.grep($scope.movimientosEgreso, function (e) { return e.nombre_corto == $scope.diccionario.EGRE_PROFORMA; })[0];
						venta.tipoPago = $.grep($scope.tiposPago, function (e) { return e.nombre == $scope.diccionario.TIPO_PAGO_CONTADO; })[0];
						$scope.obtenerTipoEgreso(venta.movimiento);
						$scope.cambiarTipoPago(venta);
						var fechaActual = new Date();
						var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
						var mes = ((fechaActual.getMonth()) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
						venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
						fecha = fechaActual;
						venta.pagado = venta.total;
						venta.cambio = 0;
						$scope.guardarVentaPanel(true, venta, llevar);
					});
				} else {
					SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
				}
			}

			$scope.calcularImporteDetalleVenta = function (detalleVenta) {
				detalleVenta.importe = detalleVenta.cantidad * detalleVenta.precio_unitario;
				detalleVenta.importe_dolares = detalleVenta.cantidad * (detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : detalleVenta.precio_unitario ? detalleVenta.precio_unitario / ($scope.venta_dolar) : 0);
				detalleVenta.descuento = detalleVenta.descuento ? detalleVenta.descuento : detalleVenta.descuento_dolares ? detalleVenta.descuento_dolares * (detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				detalleVenta.descuento_dolares = detalleVenta.descuento_dolares ? detalleVenta.descuento_dolares : detalleVenta.descuento ? detalleVenta.descuento / (detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				detalleVenta.recargo = detalleVenta.recargo ? detalleVenta.recargo : detalleVenta.recargo_dolares ? detalleVenta.recargo_dolares * (detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				detalleVenta.recargo_dolares = detalleVenta.recargo_dolares ? detalleVenta.recargo_dolares : detalleVenta.recargo ? detalleVenta.recargo / (detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				detalleVenta.ice = detalleVenta.ice ? detalleVenta.ice : detalleVenta.ice_dolares ? detalleVenta.ice_dolares * $scope.venta_dolar : 0
				detalleVenta.ice_dolares = detalleVenta.ice_dolares ? detalleVenta.ice_dolares : detalleVenta.ice ? detalleVenta.ice / $scope.venta_dolar : 0
				detalleVenta.excento = detalleVenta.excento ? detalleVenta.excento : detalleVenta.excento_dolares ? detalleVenta.excento_dolares * $scope.venta_dolar : 0
				detalleVenta.excento_dolares = detalleVenta.excento_dolares ? detalleVenta.excento_dolares : detalleVenta.excento ? detalleVenta.excento / $scope.venta_dolar : 0
				var descuento, recargo;
				var descuento_dolares, recargo_dolares;

				if (detalleVenta.tipo_descuento) {
					descuento = detalleVenta.importe * (detalleVenta.descuento / 100);
					descuento_dolares = detalleVenta.importe_dolares * (detalleVenta.descuento_dolares / 100);
				} else {
					descuento = detalleVenta.descuento;
					descuento_dolares = detalleVenta.descuento_dolares / 100;
				}
				if (detalleVenta.tipo_recargo) {
					recargo = detalleVenta.importe * (detalleVenta.recargo / 100);
					recargo_dolares = detalleVenta.importe_dolares * (detalleVenta.recargo_dolares / 100);
				} else {
					recargo = detalleVenta.recargo;
					recargo_dolares = detalleVenta.recargo_dolares;
				}
				detalleVenta.total = detalleVenta.importe - descuento + recargo - detalleVenta.ice - detalleVenta.excento;
				detalleVenta.total_dolares = detalleVenta.importe_dolares - descuento_dolares + recargo_dolares - detalleVenta.ice_dolares - detalleVenta.excento_dolares;
				detalleVenta.total = $scope.verificarPromosCumple(detalleVenta)
				$scope.sumarTotal()
			}
			$scope.verificarHoraPromocion = function (promos) {
				var promoActual = undefined
				var Estado = false
				var hora = new Date().getHours()
				var minuto = new Date().getMinutes()
				minuto = minuto >= 10 ? minuto : "0" + minuto
				for (var i = 0; i < promos.length; i++) {
					var promo = promos[i];
					if (promo.tipo_promocion) {
						var horaInicio = new Date(promo.hora_inicio).getHours()
						var minutoInicio = new Date(promo.hora_inicio).getMinutes()
						minutoInicio = minutoInicio >= 10 ? minutoInicio : "0" + minutoInicio
						if (hora > horaInicio) {
							var horafin = new Date(promo.hora_fin).getHours()
							var minutoFin = new Date(promo.hora_fin).getMinutes()
							minutoFin = minutoFin >= 10 ? minutoFin : "0" + minutoFin
							var breakfast = moment("'" + hora + ":" + minuto + "'", 'HH:mm');
							var lunch = moment("'" + horafin + ":" + minutoFin + "'", 'HH:mm');
							var tiempoRestante = moment.duration(lunch - breakfast).asMinutes();
							promoActual = promo
						} else if (hora == horaInicio && minuto >= minutoInicio) {
							var horafin = new Date(promo.hora_fin).getHours()
							var minutoFin = new Date(promo.hora_fin).getMinutes()
							minutoFin = minutoFin >= 10 ? minutoFin : "0" + minutoFin
							var breakfast = moment("'" + hora + ":" + minuto + "'", 'HH:mm');
							var lunch = moment("'" + horafin + ":" + minutoFin + "'", 'HH:mm');
							var tiempoRestante = moment.duration(lunch - breakfast).asMinutes();
							promoActual = promo
						}
					} else {
						tiempoRestante = 1;
						promoActual = promo
					}

				}
				var activo = tiempoRestante > 0 ? true : false
				return { activo: activo, promo: promoActual }
			}
			$scope.verificarProductosCambiantesCombo = function (producto) {
				var datos = producto.productosBase.filter(function (x) {
					return x.habilitar_cambio == true
				})
				if (datos.length > 0) {
					var promesa = ObtenerListaDeHermanosPorProducto(datos, $scope.venta.almacen.id)
					promesa.then(function (data) {
						$scope.productosBaseEditables = data.productos
						$scope.abrirModalCambiosProductoBaseVenta()
					})
				}
			}

			$scope.cambiarProductoComboVenta = function (productoACambiar, productoAnterior) {
				for (const productoBase of $scope.productoCombo.productosBase) {
					if (productoBase.id == productoAnterior.id) {
						productoBase.id_producto_base = productoACambiar.id
						productoBase.productoBase = productoACambiar
						productoAnterior.productoACambiar = productoACambiar
					}
				}
			}
			$scope.guardarComboEnDetalle = function () {
				$scope.cerrarModalCambiosProductoBaseVenta()
				$scope.cargarProductosRelacion()
				$scope.agregarDetalleVentaPanelRelaciones($scope.productoCombo, false)
			}
			$scope.abrirModalCambiosProductoBaseVenta = function () {
				$scope.abrirPopup($scope.modalCambiosProductoBaseVenta)
			}
			$scope.cerrarModalCambiosProductoBaseVenta = function () {
				$scope.cerrarPopup($scope.modalCambiosProductoBaseVenta)
			}
			$scope.abrirModalMesasVentaExpress = function () {
				$scope.abrirPopup($scope.modalMesasVentaExpress)
				$scope.obtenerMesasOcupadas()
			}
			$scope.cerrarModalMesasVentaExpress = function () {
				$scope.cerrarPopup($scope.modalMesasVentaExpress)
			}
			$scope.agregarDetalleVentaPanel = function (producto, combo) {
				$(".first-row").hide();
				if (combo) {
					$scope.productoCombo = producto
					$scope.verificarProductosCambiantesCombo(producto)
				} else {


					//console.log("producto sssssssssss ", producto);
					//if (producto.activar_inventario) {
					if (producto.tiposPrecio.length > 0) {
						var tipo = producto.tiposPrecio.reduce(function (a, x) {
							var alm = x.sucursal.almacenes.find(function (y) {
								return y.id == $scope.venta.almacen.id
							})
							if (alm) {
								a = x
							}
							return a
						}, undefined)
						producto.tiposPrecio = []
						if (tipo) {
							producto.tiposPrecio.push(tipo)
						}
					}
					if (producto.preciosPorSucursales.length > 0 && producto.tiposPrecio.length == 0) {
						var tipo = producto.preciosPorSucursales.reduce(function (a, x) {
							var alm = x.sucursal.almacenes.find(function (y) {
								return y.id == $scope.venta.almacen.id
							})
							if (alm) {
								a = x
							}
							return a
						}, undefined)
						producto.preciosPorSucursales = []
						if (tipo) {
							producto.preciosPorSucursales.push(tipo)
						}
					}
					var promosDia = []
					var promocionEnHora = false
					var promocionActual = {}
					if (producto.promociones.length > 0 && producto.usar_promocion) {
						var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
						promosDia = producto.promociones.filter(function (x) {
							return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
						})


						if (promosDia.length > 0) {
							var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
							promocionEnHora = datosVerificacion.activo
							promocionActual = datosVerificacion.promo
						}
					}
					var detalleVenta;
					$scope.cantidadInventario = 0;
					var productosN = false;
					var txtProductosInv = "<h5 class='widget-title blue smaller editable-click'>" + producto.nombre + "</h5>";
					if (producto.activar_inventario) {
						for (var i = 0; i < producto.inventarios.length; i++) {
							$scope.cantidadInventario = $scope.cantidadInventario + producto.inventarios[i].cantidad;
						}
					} else {
						if ($scope.usuario.empresa.usar_peps) {
							if (producto.productosBase.length > 0) {

								for (var j = 0; j < producto.productosBase.length; j++) {
									var i = 0, productoGet = producto.productosBase[j];
									var cantidadDisponible = 0;
									while (i < productoGet.productoBase.inventarios.length) {
										var invent = productoGet.productoBase.inventarios[i];
										if (invent.cantidad > 0) {
											cantidadDisponible = round(cantidadDisponible + invent.cantidad, 2);
										}
										i++;
									}
									if (!productoGet.productoBase.activar_inventario) {
										cantidadDisponible = 9999999
									}
									if (productoGet.cantidadformulacion) {
										// productoGet.cantidadformulacion = productoGet.cantidadformulacion + parseFloat(productoGet.formulacion);
										var k = 0;
										while (k < $scope.venta.detallesVenta.length) {
											var getDetVenta = $scope.venta.detallesVenta[k];

											if (getDetVenta.producto.productosBase.length > 0) {
												for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
													if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
														cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
													}
												}
											}

											k++;
										}
										if (productoGet.cantidadformulacion >= cantidadDisponible) {
											productosN = true;
											txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
										}
									} else {

										var k = 0, encontradoCantidad = 1;
										if ($scope.venta.detallesVenta) {
											while (k < $scope.venta.detallesVenta.length) {
												var getDetVenta = $scope.venta.detallesVenta[k];
												if ((getDetVenta.producto.id == producto.id)) {
													encontradoCantidad = getDetVenta.cantidad;
												} else {
													if (getDetVenta.producto.productosBase.length > 0) {
														for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
															if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
																cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
																// encontradoCantidad = getDetVenta.cantidad;
															}
														}
													}
												}
												k++;
											}
										}

										if (parseFloat(productoGet.formulacion) <= cantidadDisponible) {
											productoGet.cantidadformulacion = parseFloat(productoGet.formulacion) * encontradoCantidad;
											if (productoGet.cantidadformulacion >= cantidadDisponible) {
												productosN = true;
												txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
											}
										} else {
											productosN = true;
											txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
											// $scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + cantidadDisponible + '!');
										}
									}
								}
							} else {
								if (producto.tipoProducto.nombre_corto == "PFINAL") {
									productosN = true;
									txtProductosInv = txtProductosInv + "<strong class='red'> No tiene composición </strong> ";
								}

							}
						}
					}
					var j = 0, encontrado = false;
					while (j < $scope.venta.detallesVenta.length && !encontrado) {
						if (($scope.venta.detallesVenta[j].producto.id == producto.id)) {
							if (producto.activar_inventario) {
								if (($scope.venta.detallesVenta[j].cantidad + 1) <= $scope.cantidadInventario) {
									$scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
								} else {
									$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
								}
							} else {
								if (productosN) {
									$scope.trustedHtml = "Hello World <br> dddddd <br>"
									$scope.mostrarMensaje(txtProductosInv);
								} else {
									$scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
								}

							}
							encontrado = true;
							detalleVenta = $scope.venta.detallesVenta[j];
						}
						j++;
					}
					if (!encontrado) {
						if (producto.activar_inventario) {
							if (1 <= $scope.cantidadInventario) {
								var precio = 0
								if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
									if (producto.tiposPrecio.length > 0) {
										producto.tiposPrecio.forEach(function (tipo) {
											if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
												precio = tipo.precio_unitario
												//$scope.tipoPrecioProducto=tipo
											} else {
												precio = producto.precio_unitario
											}
										})
									} else {
										precio = producto.precio_unitario
									}
								} else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

									precio = producto.preciosPorSucursales[0].precio_unitario

								} else {
									precio = producto.precio_unitario
								}
								if (promocionEnHora) {
									precio = promocionActual.precio
								}
								detalleVenta = {
									promocionActiva: promocionEnHora, promo: promocionActual,
									producto: producto, precio_unitario: precio,
									inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
									cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
								};
								$scope.venta.detallesVenta.push(detalleVenta);
								$scope.calcularImporteDetalleVenta(detalleVenta);
							} else {
								$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
							}
						} else {
							var precio = 0
							if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
								if (producto.tiposPrecio.length > 0) {
									producto.tiposPrecio.forEach(function (tipo) {
										if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
											precio = tipo.precio_unitario
											//$scope.tipoPrecioProducto=tipo
										} else {
											precio = producto.precio_unitario
										}
									})
								} else {
									precio = producto.precio_unitario
								}
							} else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

								precio = producto.preciosPorSucursales[0].precio_unitario

							} else {
								precio = producto.precio_unitario
							}
							if (promocionEnHora) {
								precio = promocionActual.precio
							}
							detalleVenta = {
								promocionActiva: promocionEnHora, promo: promocionActual,
								producto: producto, precio_unitario: precio,
								inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
								cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
							};

							if (productosN) {
								$scope.trustedHtml = "Hello World <br> dddddd <br>"
								$scope.mostrarMensaje(txtProductosInv);
							} else {
								$scope.venta.detallesVenta.push(detalleVenta);
								$scope.calcularImporteDetalleVenta(detalleVenta);
							}

						}
					} else {
						$scope.calcularImporteDetalleVenta(detalleVenta);
					}

					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					//$scope.capturarInteraccion();
					// ========= para rankin de vendidos =====================//
					producto.rankin += 1;

					var indice = $scope.productosProcesados.indexOf(producto);
					$scope.productosProcesados[indice] = producto;

					// setTimeout(function(){
					// 	aplicarSwiper(4,3,true,2);
					// },5);
					$localStorage.productosProcesados = $scope.productosProcesados;
					//}else{
					//$scope.mostrarMensaje('¡No esta activado el inventario para este producto!');

					//}
					if (producto.activar_inventario && detalleVenta) {
						producto.inventario_disponible = $scope.cantidadInventario - detalleVenta.cantidad;
					}
				}
				// ===== fin rankin ============================//
			}
			$scope.volverAtrasPanelGrupo =async  function () {
				$scope.textoGlobal = 0;
				$scope.search = "";
				if ($scope.paginaActualPanelgrupo > 1) {
					$scope.paginaActualPanelgrupo--
				}
				if ($scope.paginaActualPanelgrupo == 1) {
					$scope.idAnteriorPradreGlobal = 0
				}
				let ids=$scope.productos.reduce((res,x)=>{
					res.push(x.id)
					return res
				},[])
				let res = await ObtenerIdPadreAnterior(ids.join(","))
				if(res.id){
					$scope.idPadreGlobal=res.id
				}else{
					$scope.idPadreGlobal=0
				}
				$scope.cargarProductosRelacion()
				$scope.$evalAsync()
			}

			$scope.volverInicioPanelGrupo = function () {
				$scope.textoGlobal = 0;
				$scope.search = "";
				$scope.idAnteriorPradreGlobal = 0
				$scope.paginaActualPanelgrupo = 1
				$scope.idPadreGlobal = $scope.idAnteriorPradreGlobal;
				$scope.cargarProductosRelacion()
			}

			// para redondeo de numeros
			function round(value, decimals) {
				return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
			}

			$scope.agregarDetalleVentaPanelRelaciones = function (producto, combo) {
				$(".first-row").hide();
				if (combo) {
					$scope.productoCombo = producto
					$scope.verificarProductosCambiantesCombo(producto)
				} else {
					var promesa = VerificarHijos(producto.id, producto.id_padre?producto.id_padre:0)
					promesa.then(function (data) {
						if (data.productos.length > 0) {
							if ($scope.idPadreGlobal != 0) {
								$scope.idAnteriorPradreGlobal = $scope.idPadreGlobal
							}
							$scope.paginaActualPanelgrupo++
							$scope.idPadreGlobal = producto.id
							$scope.cargarProductosRelacion()
						} else {

							//console.log("producto sssssssssss ", producto);
							//if (producto.activar_inventario) {
							if (producto.tiposPrecio.length > 0) {
								var tipo = producto.tiposPrecio.reduce(function (a, x) {
									var alm = x.sucursal.almacenes.find(function (y) {
										return y.id == $scope.venta.almacen.id
									})
									if (alm) {
										a = x
									}
									return a
								}, undefined)
								producto.tiposPrecio = []
								if (tipo) {
									producto.tiposPrecio.push(tipo)
								}
							}
							if (producto.preciosPorSucursales.length > 0 && producto.tiposPrecio.length == 0) {
								var tipo = producto.preciosPorSucursales.reduce(function (a, x) {
									var alm = x.sucursal.almacenes.find(function (y) {
										return y.id == $scope.venta.almacen.id
									})
									if (alm) {
										a = x
									}
									return a
								}, undefined)
								producto.preciosPorSucursales = []
								if (tipo) {
									producto.preciosPorSucursales.push(tipo)
								}
							}
							var promosDia = []
							var promocionEnHora = false
							var promocionActual = {}
							if (producto.promociones.length > 0 && producto.usar_promocion) {
								var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
								promosDia = producto.promociones.filter(function (x) {
									return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
								})


								if (promosDia.length > 0) {
									var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
									promocionEnHora = datosVerificacion.activo
									promocionActual = datosVerificacion.promo
								}
							}
							var detalleVenta;
							$scope.cantidadInventario = 0;
							var productosN = false;
							var txtProductosInv = "<h5 class='widget-title blue smaller editable-click'>" + producto.nombre + "</h5>";
							if (producto.activar_inventario) {
								for (var i = 0; i < producto.inventarios.length; i++) {
									$scope.cantidadInventario = $scope.cantidadInventario + producto.inventarios[i].cantidad;
								}
							} else {
								if ($scope.usuario.empresa.usar_peps) {
									if (producto.productosBase.length > 0) {

										for (var j = 0; j < producto.productosBase.length; j++) {
											var i = 0, productoGet = producto.productosBase[j];
											var cantidadDisponible = 0;
											while (i < productoGet.productoBase.inventarios.length) {
												var invent = productoGet.productoBase.inventarios[i];
												if (invent.cantidad > 0) {
													cantidadDisponible = round(cantidadDisponible + invent.cantidad, 2);
												}
												i++;
											}
											if (!productoGet.productoBase.activar_inventario) {
												cantidadDisponible = 9999999
											}
											if (productoGet.cantidadformulacion) {
												// productoGet.cantidadformulacion = productoGet.cantidadformulacion + parseFloat(productoGet.formulacion);
												var k = 0;
												while (k < $scope.venta.detallesVenta.length) {
													var getDetVenta = $scope.venta.detallesVenta[k];

													if (getDetVenta.producto.productosBase.length > 0) {
														for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
															if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
																cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
															}
														}
													}

													k++;
												}
												if (productoGet.cantidadformulacion >= cantidadDisponible) {
													productosN = true;
													txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
												}
											} else {

												var k = 0, encontradoCantidad = 1;
												if ($scope.venta.detallesVenta) {
													while (k < $scope.venta.detallesVenta.length) {
														var getDetVenta = $scope.venta.detallesVenta[k];

														if ((getDetVenta.producto.id == producto.id)) {
															encontradoCantidad = getDetVenta.cantidad;
														} else {
															if (getDetVenta.producto.productosBase.length > 0) {
																for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
																	if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
																		cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
																		// encontradoCantidad = getDetVenta.cantidad;
																	}
																}
															}
														}
														k++;
													}
												}

												if (parseFloat(productoGet.formulacion) <= cantidadDisponible) {
													productoGet.cantidadformulacion = parseFloat(productoGet.formulacion) * encontradoCantidad;
													if (productoGet.cantidadformulacion >= cantidadDisponible) {
														productosN = true;
														txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
													}
												} else {
													productosN = true;
													txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
													// $scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + cantidadDisponible + '!');
												}
											}
										}
									} else {
										if (producto.tipoProducto.nombre_corto == "PFINAL") {
											productosN = true;
											txtProductosInv = txtProductosInv + "<strong class='red'> No tiene composición </strong> ";
										}
									}
								}
							}
							var j = 0, encontrado = false;
							while (j < $scope.venta.detallesVenta.length && !encontrado) {
								if (($scope.venta.detallesVenta[j].producto.id == producto.id)) {
									if (producto.activar_inventario) {
										if (($scope.venta.detallesVenta[j].cantidad + 1) <= $scope.cantidadInventario) {
											$scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
										} else {
											$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
										}
									} else {
										if (productosN) {
											$scope.trustedHtml = "Hello World <br> dddddd <br>"
											$scope.mostrarMensaje(txtProductosInv);
										} else {
											$scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
										}

									}
									encontrado = true;
									detalleVenta = $scope.venta.detallesVenta[j];
								}
								j++;
							}
							if (!encontrado) {
								if (producto.activar_inventario) {
									if (1 <= $scope.cantidadInventario) {
										var precio = 0
										if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
											if (producto.tiposPrecio.length > 0) {
												producto.tiposPrecio.forEach(function (tipo) {
													if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
														precio = tipo.precio_unitario
														//$scope.tipoPrecioProducto=tipo
													} else {
														precio = producto.precio_unitario
													}
												})
											} else {
												precio = producto.precio_unitario
											}
										} else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

											precio = producto.preciosPorSucursales[0].precio_unitario

										} else {
											precio = producto.precio_unitario
										}
										if (promocionEnHora) {
											precio = promocionActual.precio
										}
										detalleVenta = {
											promocionActiva: promocionEnHora, promo: promocionActual,
											producto: producto, precio_unitario: precio,
											inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
											cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
										};

										$scope.venta.detallesVenta.push(detalleVenta);
										$scope.calcularImporteDetalleVenta(detalleVenta);
									} else {
										$scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
									}
								} else {
									var precio = 0
									if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
										if (producto.tiposPrecio.length > 0) {
											producto.tiposPrecio.forEach(function (tipo) {
												if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
													precio = tipo.precio_unitario
													//$scope.tipoPrecioProducto=tipo
												} else {
													precio = producto.precio_unitario
												}
											})
										} else {
											precio = producto.precio_unitario
										}
									} else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

										precio = producto.preciosPorSucursales[0].precio_unitario

									} else {
										precio = producto.precio_unitario
									}
									if (promocionEnHora) {
										precio = promocionActual.precio
									}
									detalleVenta = {
										promocionActiva: promocionEnHora, promo: promocionActual,
										producto: producto, precio_unitario: precio,
										inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
										cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
									};

									if (productosN) {
										$scope.trustedHtml = "Hello World <br> dddddd <br>"
										$scope.mostrarMensaje(txtProductosInv);
									} else {

										$scope.venta.detallesVenta.push(detalleVenta);
										$scope.calcularImporteDetalleVenta(detalleVenta);

									}

								}
							} else {
								$scope.calcularImporteDetalleVenta(detalleVenta);
							}

							$scope.sumarTotal();
							$scope.sumarTotalImporte();
							$scope.calcularSaldo();
							$scope.calcularCambio();
							//$scope.capturarInteraccion();
							// ========= para rankin de vendidos =====================//
							producto.rankin += 1;

							var indice = $scope.productosProcesados.indexOf(producto);
							$scope.productosProcesados[indice] = producto;

							// setTimeout(function(){
							// 	aplicarSwiper(4,3,true,2);
							// },5);
							$localStorage.productosProcesados = $scope.productosProcesados;
							//}else{
							//$scope.mostrarMensaje('¡No esta activado el inventario para este producto!');

							//}
							if (producto.activar_inventario && detalleVenta) {
								producto.inventario_disponible = $scope.cantidadInventario - detalleVenta.cantidad;
							}

							// ===== fin rankin ============================//
						}
					})

				}
			}
			$scope.disminuirDetalleVenta = function (detalleVenta) {
				var indice = $scope.productosProcesados.indexOf(detalleVenta.producto);

				if (detalleVenta.cantidad == 1) {
					$scope.eliminarDetalleVentaPanel(detalleVenta);
					// $scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
				} else {
					detalleVenta.cantidad = detalleVenta.cantidad - 1;
					$scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
					$scope.calcularImporteDetalleVenta(detalleVenta);
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					//$scope.capturarInteraccion();
				}
			}

			$scope.guardarVentaPanel = function (valido, venta, llevar) {
				if (valido) {
					/* if ($scope.usuario.empresa.usar_pantalla_cliente) {
						socket.emit('terminarVenta', venta.sucursal);
					} */
					$scope.ventaBack = angular.copy(venta);
					$scope.ocultarMensajesValidacion();
					var tiempoActual = new Date();
					venta.fecha = new Date($scope.convertirFecha(venta.fechaTexto));
					venta.fecha.setHours(tiempoActual.getHours());
					venta.fecha.setMinutes(tiempoActual.getMinutes());

					// // === revisando inventarios antes de guardar ======================
					// var promesarev = RevisionInventarios($scope.usuario.id_empresa, {detalles:venta.detallesVenta, almacen: venta.almacen.id})
					// promesarev.then(function (dato) {
					// 	console.log(dato);

					// })
					// // =================== fin ========================

					blockUI.start();
					if (venta.id) {
						Venta.update({ idCompra: compra.id }, compra, function (res) {
							blockUI.stop();
							$scope.cerrarPopPupEdicion();
							SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");
							$scope.recargarItemsTabla();
						});
					} else {
						var movimiento = venta.movimiento.nombre_corto;
						venta.$save(function (res) {
							blockUI.stop();
							if (res.hasError) {
								if (res.detalles) {
									SweetAlert.swal("", res.detalles.join('\n\n'), "warning");
									$scope.venta = $scope.ventaBack;
								} else {
									SweetAlert.swal("", res.message, "warning");
									$scope.venta.almacen.id = venta.almacen.id;
									$scope.abrirPopupPanel(venta.sucursal, venta.almacen, venta.actividad, venta.tipoPago, venta.movimiento);
								}

							} else {
								$scope.venta = res.venta


								$scope.cargarProductos();
								var datos = { id: res.venta.id_venta }
								$scope.imprimirVenta(datos, true)
								/* if (res.mesero) {
									res.id_mesero = res.mesero.id
									if (!res.cliente.id) {
										res.cliente = null
									}
								}
								//ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, false, $scope.usuario, false, $scope.formatosFactura);
								ImprimirSalida(movimiento, res, true, $scope.usuario, llevar, $scope.mostrarMensaje);

 */

								SweetAlert.swal("Guardado!", "Venta registrada exitosamente!", "success");

								$scope.abrirPopupPanel(res.venta.sucursal, res.venta.almacen, res.venta.actividad, res.venta.tipoPago, res.venta.movimiento);
								$scope.enfocar('nitP');
							}
						}, function (error) {
							blockUI.stop();
							SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "warning");
						});
					}
				}
			}

			$scope.mostrarConfirmacionEliminacionVenta = function (venta) {
				$scope.venta = new Venta(venta);
				// $scope.abrirPopup($scope.idModalConfirmacionEliminacionVenta);
				var txtVenta = "";
				if (venta.movimientoServicio) {
					txtVenta = "el <span style='color:#f8bb86'>" + venta.movimientoServicio.nombre;
				} else {
					txtVenta = "la <span style='color:#f8bb86'>" + venta.movimiento.clase.nombre
				}
				SweetAlert.swal({
					title: "Esta seguro?",
					html: "Esta seguro de anular " + txtVenta + " Nro " + venta.factura + "</span> !",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si',
					cancelButtonText: "No",
					showLoaderOnConfirm: true,
					preConfirm: function () {
						return $scope.eliminarVenta($scope.venta);
					}
				}).then(function (result) {
					if (result.value) {
						SweetAlert.swal({
							title: "Anulado!",
							text: "Anulado exitosamente!",
							icon: 'success',
							showCancelButton: false,
							confirmButtonColor: '#3085d6',
							confirmButtonText: 'OK',
							allowEscapeKey: false,
							allowOutsideClick: false
						}).then(function (result) {
							if (result.value) {
								// $scope.recargarItemsTabla();
								$scope.filtrarVentas($scope.sucursalesUsuario, $scope.fechaInicioTexto, $scope.fechaFinTexto, $scope.filtroVenta);
							}
						});
					}
				});
			}

			$scope.cerrarConfirmacionEliminacionVenta = function () {
				$scope.cerrarPopup($scope.idModalConfirmacionEliminacionVenta);
			};

			$scope.eliminarVenta = function (venta) {
				if (venta.movimientoServicio) {
					blockUI.noOpen = true;
					var promesa = EliminarVentaServicio(venta)
					promesa.then(function (dato) {
						return dato
					})
				} else {
					blockUI.noOpen = true;
					return venta.$delete();
				}
			}

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

			$scope.barcodeScanned = function (barcode) {
				// document.getElementById("inputGroup").focus();
				$scope.search = barcode;

				// $scope.cargarProductos();       
				$scope.filtrarProductos(barcode);
			};

			$scope.limpiarBusqueda = function () {
				$scope.search = "";
				$scope.filtrarProductos();
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
					//var mproductos=[];
					for (var i = 0; i < productos.length; i++) {
						var inventarios = [], cantidadTotal = 0;
						productos[i].fecha_vencimiento = new Date(productos[i].fecha_vencimiento);
						productos[i].cantidad_total = productos[i].cantidad;
						/*mproductos.push({id:productos[i].id,descuento:productos[i].descuento,descuento_fijo:productos[i].descuento_fijo,
										nombre:productos[i].nombre,codigo:productos[i].codigo,grupo:productos[i].grupo,subgrupo:productos[i].subgrupo,
										inventarios:inventarios,cantidad_total:productos[i].cantidad,fecha_vencimiento:new Date(productos[i].fecha_vencimiento),precio_unitario:productos[i].precio_unitario,
										porcentaje:$scope.porcentaje,color:$scope.color});*/
					}
					$scope.paginas = [];
					for (var i = 1; i <= dato.paginas; i++) {
						$scope.paginas.push(i);
					}

					$scope.productos = productos;

					blockUI.stop();
				});
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
				$scope.buscarInventarios($scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, $scope.cantidadInv);
			}

			$scope.verificarPulso = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.textoBusqueda = textoBusqueda;
					if ($scope.almacenBusqueda) {
						$scope.buscarInventarios($scope.almacenBusqueda.id, 1, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, $scope.cantidadInv);
					}
				}
			}


			$scope.abrirModalVerificarCuenta = function (dato, tipo) {
				$scope.dato = dato
				$scope.tipoDatosPermiso = tipo
				$scope.abrirPopup($scope.IdModalVerificarCuenta);
			}
			$scope.cerrarModalVerificarCuenta = function () {
				$scope.cerrarPopup($scope.IdModalVerificarCuenta);
			}

			$scope.verificarCuentaAdmin = function (cuenta) {
				const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa, cuenta)
				promesa.then(function (dato) {
					if (dato.type) {
						SweetAlert.swal("Verificado!", dato.message, "success");
						/*  cuenta.abierto= cuenta.abierto; */
						if ($scope.tipoDatosPermiso == "venta") {
							var promesa = DatosVenta($scope.dato.id, $scope.usuario.id_empresa);
							promesa.then(function (datos) {
								$scope.modificarVenta(datos.venta)
							})
						}
						$scope.cerrarModalVerificarCuenta();
					} else {
						SweetAlert.swal("", dato.message, "warning");
					}
				})
			}


			$scope.abrirReporteProductos = function () {

				if ($scope.filtro != undefined) {
					if ($scope.filtro.razon_social) {
						$scope.razon_social = $scope.filtro.razon_social;
					} else {
						$scope.razon_social = 0;
					}
					if ($scope.filtro.usuario) {
						$scope.usuario_elegido = $scope.filtro.usuario;
					} else {
						$scope.usuario_elegido = 0;
					}
					if ($scope.filtro.sucursal) {
						$scope.sucursal = $scope.filtro.sucursal;
					} else {
						$scope.sucursal = 0;
					}
					if ($scope.filtro.nit) {
						$scope.nit = $scope.filtro.nit;
					} else {
						$scope.nit = 0;
					}
					if ($scope.filtro.monto) {
						$scope.monto = $scope.filtro.monto;
					} else {
						$scope.monto = 0;
					}
					if ($scope.filtro.tipo_pago) {
						$scope.tipo_pago = $scope.filtro.tipo_pago;
					} else {
						$scope.tipo_pago = 0;
					}
					if ($scope.filtro.transaccion) {
						$scope.transaccion = $scope.filtro.transaccion;
					} else {
						$scope.transaccion = 0;
					}
					if ($scope.filtro.estado) {
						$scope.estado = $scope.filtro.estado;
					} else {
						$scope.estado = 0;
					}
				} else {
					$scope.razon_social = 0;
					$scope.usuario_elegido = 0;
					$scope.sucursal = 0;
					$scope.nit = 0;
					$scope.monto = 0;
					$scope.tipo_pago = 0;
					$scope.transaccion = 0;
					$scope.estado = 0;
				}

				for (var i = 0; i < $scope.sucursales.length; i++) {
					if ($scope.sucursal) {
						if ($scope.sucursal == $scope.sucursales[i].id) {
							$scope.sucursal = $scope.sucursales[i].nombre;
						} else if ($scope.sucursal == 0) {
							$scope.sucursal = "0";
						}
					} else {
						$scope.sucursal = "0";
					}
				}

				if ($scope.razonSocial) {
					$scope.razonSocial;
				} else {
					$scope.razonSocial = "Todos";
				}

				if ($scope.fechaInicioTexto === undefined || $scope.fechaFinTexto === undefined) {
					// SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
					SweetAlert.confirm("", { title: "", text: "Ingrese primero las fechas !" });
				} else {
					$scope.fechaInicioTexto;
					$scope.fechaFinTexto;
					var columna = "nombre";
					var direccion = "ASC";
					$scope.obtenerDetalles();
					//$scope.filtrarDetalles($scope.sucursalesUsuario, $scope.fechaInicioTexto, $scope.fechaFinTexto, $scope.sucursal,columna,direccion);
					$scope.abrirPopup($scope.modalReportesProductos);
				}



			}

			$scope.obtenerDetalles = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "nombre";
				$scope.paginator.direction = "asc";
				$scope.filtroDetallesProducto = {
					sucursalUsuario: $scope.sucursalesUsuario,
					inicio: $scope.fechaInicioTexto,
					fin: $scope.fechaFinTexto,
					sucursal: $scope.sucursal,
				}
				$scope.paginator.callBack = $scope.filtrarDetalles;
				$scope.paginator.getSearch("", $scope.filtroDetallesProducto, null);


			}
			$scope.obtenerDetallesUnidad = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "nombre";
				$scope.paginator.direction = "asc";
				$scope.paginator.itemsPerPage = "0";
				$scope.filtroDetallesProducto = {
					sucursalUsuario: $scope.sucursalesUsuario,
					inicio: $scope.fechaInicioTexto,
					fin: $scope.fechaFinTexto,
					sucursal: $scope.sucursal ? $scope.sucursal : "",
				}
				$scope.paginator.callBack = $scope.filtrarDetalles;
				$scope.paginator.setPaginator("", $scope.filtroDetallesProducto, null);


			}
			$scope.filtrarDetalles = function () {
				blockUI.start();
				//$scope.Feinicio = new Date($scope.convertirFecha(inicio));
				//$scope.Fefin = new Date($scope.convertirFecha(fin));
				var promesa = VentasProductos($scope.paginator);
				promesa.then(function (datos) {
					$scope.ventasPopUp = datos.ventas;
					$scope.paginator.setPages(datos.paginas);
					blockUI.stop();
				});
			}

			$scope.generarExcelVentasMensuales = function () {
				if ($scope.verDetalle === true) {

					blockUI.start();
					inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
					fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
					if ($scope.filtro != undefined) {
						if ($scope.filtro.sucursal) {
							$scope.sucursal = $scope.filtro.sucursal;
						} else {
							$scope.sucursal = 0;
						}
					} else {
						$scope.sucursal = 0;
					}


					var promesa = ReporteVentasMensualesDatos($scope.usuario.id_empresa, $scope.sucursal, inicio, fin);
					promesa.then(function (datos) {
						var detallesVenta = JSON.parse(datos.detallesVenta);
						var data = [["FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL", "UBICACION CLIENTE",
							"CODIGO", "DETALLE", "UNIDAD", "GRUPO", "CANTIDAD", "PU", "TOTAL", "IMPORTE ICE/IEHD/TASAS", "EXPORTACIONES Y OPERACIONES EXENTAS",
							"VENTAS GRAVADAS A TASA CERO", "SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS",
							"IMPORTE BASE PARA DEBITO FISCAL", "DEBITO FISCAL", "SUCURSAL", "USUARIO"]]
						if ($scope.usuario.empresa.usar_vencimientos) {
							data[0].push('FECHA VENCIMIENTO');
							data[0].push('LOTE');
						}
						data[0].push('VENDEDOR');
						for (var i = 0; i < detallesVenta.length; i++) {
							var columns = [];
							detallesVenta[i].venta.fecha = new Date(detallesVenta[i].venta.fecha);
							columns.push(detallesVenta[i].venta.fecha);
							columns.push(detallesVenta[i].venta.factura);
							columns.push(detallesVenta[i].venta.autorizacion);
							columns.push(detallesVenta[i].venta.cliente.nit);
							columns.push(detallesVenta[i].venta.cliente.razon_social);
							columns.push(detallesVenta[i].venta.cliente.ubicacion_geografica);
							columns.push(detallesVenta[i].producto.codigo);
							columns.push(detallesVenta[i].producto.nombre);
							columns.push(detallesVenta[i].producto.unidad_medida);
							if (detallesVenta[i].producto.grupo) {
								columns.push(detallesVenta[i].producto.grupo.nombre);
							} else {
								columns.push("");
							}
							columns.push(detallesVenta[i].cantidad);
							columns.push(detallesVenta[i].precio_unitario);
							columns.push(detallesVenta[i].importe);
							columns.push(detallesVenta[i].ice);
							columns.push(0);
							columns.push(0);
							columns.push(detallesVenta[i].importe - detallesVenta[i].ice);
							var descuento = detallesVenta[i].importe - detallesVenta[i].ice - detallesVenta[i].excento + detallesVenta[i].recargo;
							columns.push(descuento);
							columns.push(detallesVenta[i].total);
							columns.push(Math.round((detallesVenta[i].total * 0.13) * 100) / 100);
							columns.push(detallesVenta[i].venta.almacen.sucursal.nombre);
							columns.push(detallesVenta[i].venta.usuario.nombre_usuario);

							if ($scope.usuario.empresa.usar_vencimientos) {
								if (detallesVenta[i].inventario) {
									detallesVenta[i].inventario.fecha_vencimiento = new Date(detallesVenta[i].inventario.fecha_vencimiento);
									columns.push(detallesVenta[i].inventario.fecha_vencimiento);
									columns.push(detallesVenta[i].inventario.lote);
								} else if (detallesVenta[i].lote != null) {
									detallesVenta[i].fecha_vencimiento = new Date(detallesVenta[i].fecha_vencimiento);
									columns.push(detallesVenta[i].fecha_vencimiento);
									columns.push(detallesVenta[i].lote);
								} else {
									columns.push("");
									columns.push("");
								}
							}

							columns.push((detallesVenta[i].venta.vendedor ? detallesVenta[i].venta.vendedor.persona.nombre_completo : ""));

							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "VENTAS-MENSUALES.xlsx");
						blockUI.stop();
					});
				} else {
					blockUI.start();
					inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
					fin = new Date($scope.convertirFecha($scope.fechaFinTexto));

					$scope.paginator.itemsPerPage = 0;
					var reporte = [inicio, fin];
					var promesa = VentasProductos($scope.paginator);
					promesa.then(function (datos) {
						$scope.ventasExcelDetalle = datos.ventas;
						var data = [];

						var cabecera = ["Producto", "Unidad Medida", "Cantidad", "Monto"];
						data.push(cabecera)
						for (var i = 0; i < $scope.ventasExcelDetalle.length; i++) {
							columns = [];

							columns.push($scope.ventasExcelDetalle[i].nombre);
							columns.push($scope.ventasExcelDetalle[i].unidad_medida);
							columns.push($scope.ventasExcelDetalle[i].cantidad);
							columns.push($scope.ventasExcelDetalle[i].total);
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "VENTAS-DETALLE-PRODUCTO.xlsx");
						blockUI.stop();
					});

				}
			}

			$scope.generarPdfVentasMensuales = function () {
				if ($scope.verDetalle === true) {
					blockUI.start();
					inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
					fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
					if ($scope.filtro != undefined) {
						if ($scope.filtro.sucursal) {
							$scope.sucursal = $scope.filtro.sucursal;
						} else {
							$scope.sucursal = 0;
						}
					} else {
						$scope.sucursal = 0;
					}
					var reporte = [inicio, fin, $scope.sucursal];
					var promesa = ReporteVentasMensualesDatos($scope.usuario.id_empresa, $scope.sucursal, inicio, fin);
					promesa.then(function (datos) {

						var detallesVenta = JSON.parse(datos.detallesVenta);
						//console.log(detallesVenta)
						var doc = new PDFDocument({ compress: false, margin: 10 });
						var stream = doc.pipe(blobStream());
						// draw some text

						doc.font('Helvetica', 8);
						var y = 150, itemsPorPagina = 15, items = 0, pagina = 1;
						$scope.dibujarCabeceraPDFVentasMensuales(doc, datos, reporte, pagina);
						var sumaImporte = 0, sumaImporteIce = 0, sumaImporteExp = 0, sumaImporteGrab = 0, sumaTotal = 0, sumaDescuentos = 0, sumaImporteBase = 0, sumaCredito = 0;
						var sumaSubImporte = 0, sumaSubImporteIce = 0, sumaSubImporteExp = 0, sumaSubImporteGrab = 0, sumaSubTotal = 0, sumaSubDescuentos = 0, sumaSubImporteBase = 0, sumaSubCredito = 0;
						for (var i = 0; i < detallesVenta.length && items <= itemsPorPagina; i++) {
							doc.rect(40, y - 10, 540, 40).stroke();
							doc.font('Helvetica', 8);
							detallesVenta[i].venta.fecha = new Date(detallesVenta[i].venta.fecha); //console.log(new Date().getFullYear().toString().substr(-2));
							doc.text(detallesVenta[i].venta.fecha.getDate() + "/" + (detallesVenta[i].venta.fecha.getMonth() + 1) + "/" + detallesVenta[i].venta.fecha.getFullYear().toString().substr(-2), 45, y);
							doc.text((detallesVenta[i].venta.factura ? detallesVenta[i].venta.factura : ""), 80, y);
							doc.font('Helvetica', 7);
							doc.text(detallesVenta[i].venta.cliente.razon_social, 115, y - 2, { width: 80 });
							doc.text(detallesVenta[i].producto.nombre, 205, y - 2, { width: 80 });
							doc.font('Helvetica', 8);
							doc.text(detallesVenta[i].cantidad, 300, y, { width: 50 });
							doc.text(detallesVenta[i].producto.unidad_medida, 330, y, { width: 50 });
							if ($scope.usuario.empresa.usar_vencimientos) {
								if (detallesVenta[i].inventario) {
									detallesVenta[i].inventario.fecha_vencimiento = new Date(detallesVenta[i].inventario.fecha_vencimiento);
									doc.text(detallesVenta[i].inventario.fecha_vencimiento.getDate() + "/" + (detallesVenta[i].inventario.fecha_vencimiento.getMonth() + 1) + "/" + detallesVenta[i].inventario.fecha_vencimiento.getFullYear().toString().substr(-2), 385, y);
									//var descuento=detallesVenta[i].importe-detallesVenta[i].ice-detallesVenta[i].excento+detallesVenta[i].recargo;
									doc.text(detallesVenta[i].inventario.lote, 435, y);
								}
							}
							doc.text(detallesVenta[i].descuento, 475, y);
							doc.text(detallesVenta[i].recargo, 505, y);
							doc.text(detallesVenta[i].total, 535, y);
							//doc.text(detallesVenta[i].total,705,y);
							y = y + 40;
							items++;

							if (items == itemsPorPagina || i + 1 == detallesVenta.length) {
								if (i + 1 == detallesVenta.length) {

								} else {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFVentasMensuales(doc, datos, reporte, pagina);
									doc.font('Helvetica', 8);
								}
							}
						}
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}
						doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, y);
						doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y);
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
						blockUI.stop();
					});
				} else {
					blockUI.start();
					inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
					fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
					//$scope.paginator.itemsPerPage = 0;

					var reporte = [inicio, fin];
					var promesa = VentasProductos($scope.paginator);
					promesa.then(function (datos) {

						$scope.ventaSinDetalle = datos.ventas;
						var doc = new PDFDocument({ compress: false, margin: 10 });
						var stream = doc.pipe(blobStream());
						doc.font('Helvetica', 8);
						var y = 150, itemsPorPagina = 20, items = 0, pagina = 1;
						var totalPaginas = Math.ceil($scope.ventaSinDetalle.length / itemsPorPagina);
						$scope.dibujarCabeceraPDFVentasMensualesSinDetalle(doc, $scope.ventaSinDetalle, reporte, pagina, totalPaginas);
						var indice = 0;
						for (var i = 0; i < $scope.ventaSinDetalle.length && items <= itemsPorPagina; i++) {
							indice = i + 1;
							doc.font('Helvetica', 8);
							doc.text(indice, 45, y);
							doc.font('Helvetica', 8);
							doc.text($scope.ventaSinDetalle[i].nombre, 65, y);
							doc.font('Helvetica', 8, { align: "center" });
							doc.text($scope.ventaSinDetalle[i].unidad_medida, 390, y);
							doc.font('Helvetica', 8);
							doc.text($scope.ventaSinDetalle[i].cantidad, 470, y);
							doc.font('Helvetica', 8);
							doc.text($scope.ventaSinDetalle[i].total, 500, y);
							//doc.font('Helvetica', 8);
							//doc.text($scope.ventaSinDetalle[i].razon_social, 450, y);
							y = y + 25;
							items++;

							if (items == itemsPorPagina || i + 1 == $scope.ventaSinDetalle.length) {
								if (i + 1 == $scope.ventaSinDetalle.length) {

								} else {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFVentasMensualesSinDetalle(doc, $scope.ventaSinDetalle, reporte, pagina, totalPaginas);
									doc.font('Helvetica', 8);
								}
							}
						}
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}
						doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 750);
						doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 750);

						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
						blockUI.stop();
					});
				}
			}

			$scope.dibujarCabeceraPDFVentasMensuales = function (doc, datos, reporte, pagina) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE DE VENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + reporte.inicio, -70, 40, { align: "center" });
				doc.text("Hasta " + reporte.fin, 70, 40, { align: "center" });
				doc.text("FOLIO " + pagina, 550, 25);
				doc.rect(40, 60, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 75);
				doc.text("NIT : ", 440, 75);
				doc.font('Helvetica', 8);
				doc.text(datos.empresa.razon_social, 195, 75);
				doc.text(datos.empresa.nit, 460, 75);
				doc.rect(40, 100, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				//doc.text("Nº",45,110);
				doc.text("Fecha", 45, 110, { width: 40 });
				doc.text("Nº De Nota", 80, 110, { width: 30 });
				doc.text("Cliente", 115, 110);
				doc.text("Producto", 205, 110);
				doc.text("Cant.", 290, 110);
				doc.text("Unidad", 330, 110);
				doc.text("Fecha Venc", 385, 110, { width: 30 });
				doc.text("Lote", 435, 110, { width: 35 });
				doc.text("Desc.", 470, 110);
				doc.text("Rec.", 500, 110);
				doc.text("Total", 535, 110);

			}

			$scope.dibujarCabeceraPDFVentasMensualesSinDetalle = function (doc, datos, reporte, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE DE VENTAS POR PRODUCTOS SIN DETALLE", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + reporte.fechaInicioTexto, -70, 40, { align: "center" });
				doc.text("Hasta " + reporte.fechaFinTexto, 70, 40, { align: "center" });
				doc.text("FOLIO " + pagina, 550, 25);

				doc.rect(40, 100, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);

				doc.text("N°", 45, 110);
				doc.text("Producto", 65, 110);
				doc.text("Unidad Medida.", 370, 110);
				doc.text("Cantidad", 450, 110);
				doc.text("Monto", 500, 110);
				//doc.text("Razon Social", 445, 110);

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 500, 750);
			}

			$scope.PopoverReportesRapido = {
				templateUrl: 'PopoverReportesRapido.html',
				title: 'Reportes Rapidos',
				isOpen: false
			}

			$scope.ImprimirSimpleReporte = function (id) {
				blockUI.start();
				var idEmpresa = 0;
				idEmpresa = $scope.usuario.id_empresa;
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				var promesa = detalle(inicio, fin, idEmpresa, id);
				promesa.then(function (datos) {
					$scope.detallePorProducto = datos;

					var doc = new PDFDocument({ compress: false, margin: 10 });
					var stream = doc.pipe(blobStream());
					doc.font('Helvetica', 8);
					var y = 150, itemsPorPagina = 20, items = 0, pagina = 1;
					var totalPaginas = Math.ceil($scope.detallePorProducto.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFDetalleProductos(doc, datos, pagina, totalPaginas);
					var indice = 0;
					for (var i = 0; i < $scope.detallePorProducto.length && items <= itemsPorPagina; i++) {
						indice = i + 1;
						doc.font('Helvetica', 8);
						doc.text(indice, 45, y);
						doc.font('Helvetica', 8);
						doc.text($scope.detallePorProducto[i].venta.factura, 65, y, { width: 150 });
						doc.font('Helvetica', 8);
						if ($scope.detallePorProducto[i].venta.cliente) {
							doc.font('Helvetica', 8);
							doc.text($scope.detallePorProducto[i].venta.cliente.razon_social, 120, y);
						}
						doc.font('Helvetica', 8);
						doc.text($scope.detallePorProducto[i].cantidad, 470, y);
						doc.font('Helvetica', 8);
						doc.text($scope.detallePorProducto[i].total, 520, y);


						y = y + 30;
						items++;

						if (items == itemsPorPagina || i + 1 == $scope.detallePorProducto.length) {
							if (i + 1 == $scope.detallePorProducto.length) {

							} else {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 150;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFDetalleProductos(doc, datos, pagina, totalPaginas);
								doc.font('Helvetica', 8);
							}
						}

					}
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 750);
					doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 750);

					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
				});

			}

			$scope.dibujarCabeceraPDFDetalleProductos = function (doc, datos, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("DETALLE DEL PRODUCTO", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + $scope.fechaInicioTexto, -70, 40, { align: "center" });
				doc.text("Hasta " + $scope.fechaFinTexto, 70, 40, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text(datos[0].producto.nombre, 0, 55, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("Codigo: " + datos[0].producto.codigo, 45, 65);
				doc.font('Helvetica-Bold', 8);
				doc.text("Unidad Medida: " + datos[0].producto.unidad_medida, 45, 75);
				/*doc.text("FOLIO " + pagina, 550, 25);
				doc.rect(40, 60, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 75);
				doc.text("NIT : ", 440, 75);
				doc.font('Helvetica', 8);
				doc.text(datos.empresa.razon_social, 195, 75);
				doc.text(datos.empresa.nit, 460, 75);*/
				doc.rect(40, 100, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Nº", 45, 110);
				doc.text("N° Factura", 65, 110);
				doc.text("Razon Social", 120, 110);
				doc.text("Cantidad", 450, 110);
				doc.text("Monto", 520, 110);

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 500, 750);
			}

			$scope.abrirReporteGraficoProductos = function () {
				$scope.abrirPopup($scope.modelGraficaProductos);
			}
			$scope.cerrarReporteGraficoProductos = function () {
				$scope.cerrarPopup($scope.modelGraficaProductos);
			}


			$scope.graficarProductos = function (value) {
				var estadoGrafico = value
				blockUI.start();
				//var cabecera = ["N°","Producto","Unidad Medida","Cantidad","Total"];
				var data = [];
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));

				$scope.paginator.itemsPerPage = 0;
				var promesa = VentasProductos($scope.paginator);
				promesa.then(function (datos) {
					$scope.datosProductosGrafico = datos.ventas.sort(function (a, b) {
						return b.total - a.total;
					});

					for (var i = 0; i < $scope.datosProductosGrafico.length; i++) {
						var columns = [];
						columns.push($scope.datosProductosGrafico[i].nombre);
						columns.push($scope.datosProductosGrafico[i].unidad_medida);
						columns.push($scope.datosProductosGrafico[i].cantidad);
						columns.push($scope.datosProductosGrafico[i].total);
						data.push(columns);
					}
					var contenedor = [];
					var continido = [];

					contenido = data.map(function (row, i) {
						if (contenedor.length >= 10) {

						} else {
							contenedor.push(row);
						}
					})


					$scope.reporteGrafico(contenedor, estadoGrafico);
					blockUI.stop();
				});

			}

			$scope.reporteGrafico = function (reporte, estadoGrafico) {
				$scope.cerrarReporteGraficoProductos();

				var ctx3 = null;
				$scope.abrirReporteGraficoProductos();
				var types = '';
				var canvaName = "";
				if (estadoGrafico == false) {
					types = 'bar';
					camvaName = "myChartBar";
					$scope.mostrarBar = true;
					$scope.mostrarPie = false;
				} else {
					types = 'pie';
					camvaName = "myChartPie";
					$scope.mostrarBar = false;
					$scope.mostrarPie = true;
				}
				var datasReporte = []
				if (reporte.length != 0) {

					for (let i = 0; i < reporte.length; i++) {
						const element = reporte[i];
						datasReporte.push(element[0])
					}

					$scope.values = new Array();
					for (let i = 0; i < reporte.length; i++) {
						const element = reporte[i];
						$scope.values.push(element[3]);
					}

				}

				ctx3 = document.getElementById(camvaName);
				var myChartPurchase = new Chart(ctx3, {
					type: types,
					data: {
						labels: datasReporte,
						datasets: [{
							label: 'Bs. ',
							data: $scope.values,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
								'rgba(155, 159, 64, 0.2)',
								'rgba(105, 109, 64, 0.2)',
								'rgba(55, 162, 192, 0.2)'
							],
							borderColor: [
								'rgba(255,99,132,1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
								'rgba(155, 159, 64, 0.2)',
								'rgba(105, 109, 64, 0.2)',
								'rgba(55, 162, 192, 0.2)'
							],
							borderWidth: 1
						}]
					},
					options: {
						title: {
							display: true,
							text: 'REPORTE GRAFÍCO',
							fontSize: 20
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});

				/*if (estadoGrafico == false) {
					var chart = new CanvasJS.Chart("tablaReportes", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light1", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "column",
								indexLabelFontSize: 10,
								//showInLegend: true,
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Bs."
						},
						axisX: {
							labelFontColor: "white",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1

							//prefix: "Very long label "
						}
					});
					chart.render();

				} else if (estadoGrafico == true) {
					var chart = new CanvasJS.Chart("tablaReportes", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light2", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "pie",
								startAngle: 25,
								toolTipContent: "<b>{label}</b>: {y} Bs.",
								showInLegend: "true",
								legendText: "{label}",
								indexLabelFontSize: 10,
								indexLabel: "{label} - {y} Bs.",
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Bs."
						},
						axisX: {
							labelFontColor: "black",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1,
							//prefix: "Very long label "
						}
					});
					chart.render();

				}*/

			}

			$scope.abrirReporteGraficoEmpresa = function () {
				$scope.abrirPopup($scope.modelGraficaEmpresas);
			}
			$scope.cerrarReporteGraficoEmpresa = function () {
				$scope.cerrarPopup($scope.modelGraficaEmpresas);
			}

			$scope.graficarEmpresa = function (estado) {
				var estadoGrafico = estado;
				blockUI.start();
				//var cabecera = ["N°","Producto","Unidad Medida","Cantidad","Total"];
				var data = [];
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));

				$scope.paginator.itemsPerPage = 0;
				var promesa = ventasDetalleEmpresa($scope.paginator);
				promesa.then(function (datos) {
					$scope.datosReporteGraficoEmpresa = datos.detalle.sort(function (a, b) {
						return b.total - a.total;
					});

					for (var i = 0; i < $scope.datosReporteGraficoEmpresa.length; i++) {
						var columns = []
						columns.push($scope.datosReporteGraficoEmpresa[i].razon_social);
						columns.push($scope.datosReporteGraficoEmpresa[i].total);

						data.push(columns);
					}

					var contenedor = [];
					var contenido = [];

					contenido = data.map(function (row, i) {

						if (contenedor.length >= 10) {

						} else {
							contenedor.push(row);
						}
					})

					$scope.reporteGraficoEmpresas(contenedor, estadoGrafico);
					blockUI.stop();
				})
			}

			$scope.reporteGraficoEmpresas = function (reporte, estadoGrafico) {

				$scope.abrirReporteGraficoEmpresa();
				var contenedor = [];
				var legend = [];
				var datasReporte = [];

				if (reporte.length != 0) {
					datasReporte = reporte.map(function (dato, i) {
						var variable = { label: dato[0], y: dato[1] };
						return variable;

					})
				}

				if (estadoGrafico == false) {
					var chart = new CanvasJS.Chart("tablaReportesEmpresas", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light1", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "column",
								indexLabelFontSize: 10,
								//showInLegend: true,
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Bs."
						},
						axisX: {
							labelFontColor: "white",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1

							//prefix: "Very long label "
						}
					});
					chart.render();

				} else if (estadoGrafico == true) {
					var chart = new CanvasJS.Chart("tablaReportesEmpresas", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light2", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "pie",
								startAngle: 25,
								toolTipContent: "<b>{label}</b>: {y} Bs.",
								showInLegend: "true",
								legendText: "{label}",
								indexLabelFontSize: 10,
								indexLabel: "{label} - {y} Bs.",
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Bs."
						},
						axisX: {
							labelFontColor: "black",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1,
							//prefix: "Very long label "
						}
					});
					chart.render();

				}
			}

			$scope.cerrarReporteProductos = function () {
				$scope.cerrarPopup($scope.modalReportesProductos);
			}

			$scope.verDetalle = true;
			$scope.conDetalle = function () {
				if ($scope.verDetalle === true) {
					$scope.verDetalle = false;
				} else if ($scope.verDetalle === false) {
					$scope.verDetalle = true;
				}
			}

			$scope.abrirReporteEmpresas = function () {
				$scope.fechaInicioTexto;
				$scope.fechaFinTexto;
				$scope.idEmpresa = $scope.usuario.id_empresa;

				if ($scope.filtro != undefined) {
					if ($scope.filtro.sucursal) {
						$scope.sucursalSelec = $scope.filtro.sucursal;
					} else {
						$scope.sucursalSelec = 0;
					}
				} else {
					$scope.sucursalSelec = 0
				}

				for (var i = 0; i < $scope.sucursales.length; i++) {
					if ($scope.sucursal) {
						if ($scope.sucursal == $scope.sucursales[i].id) {
							$scope.sucursal = $scope.sucursales[i].nombre;
						} else if ($scope.sucursal == 0) {
							$scope.sucursal = "Todos";
						}
					} else {
						$scope.sucursal = "Todos";
					}
				}

				if ($scope.razonSocial) {
					$scope.razonSocial;
				} else {
					$scope.razonSocial = "Todos";
				}

				if ($scope.fechaInicioTexto === undefined || $scope.fechaFinTexto === undefined) {
					SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
				} else {

					$scope.obtenerDetallesEmpresa();

					$scope.abrirReportePorEmpresa();
				}

			}

			$scope.obtenerDetallesEmpresa = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "razon_social";
				$scope.paginator.direction = "asc";
				$scope.filtroDetallesProducto = {
					idsSucursales: $scope.sucursalesUsuario,
					inicio: $scope.fechaInicioTexto,
					fin: $scope.fechaFinTexto,
					sucursal: $scope.sucursalSelec,
					idEmpresa: $scope.idEmpresa
				}
				$scope.paginator.callBack = $scope.filtroDetalleEmpresa;
				$scope.paginator.getSearch("", $scope.filtroDetallesProducto, null);


			}

			$scope.filtroDetalleEmpresa = function () {
				blockUI.start();
				var promesa = ventasDetalleEmpresa($scope.paginator);
				promesa.then(function (datos) {
					$scope.detalleEmpresa = datos.detalle;
					$scope.paginator.setPages(datos.paginas);
					blockUI.stop();
				})

			}

			$scope.imprimirSimpleReporteEmpresa = function (id) {
				blockUI.start();
				var idEmpresa = 0;
				idEmpresa = $scope.usuario.id_empresa;
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				var promesa = detalleEmpresa(inicio, fin, idEmpresa, id);
				promesa.then(function (datos) {
					$scope.detallePorEmpresa = datos;

					var doc = new PDFDocument({ compress: false, margin: 10 });
					var stream = doc.pipe(blobStream());
					doc.font('Helvetica', 8);
					var y = 150, itemsPorPagina = 20, items = 0, pagina = 1;
					var totalPaginas = Math.ceil($scope.detallePorEmpresa.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFDetalleEmpresas(doc, datos, pagina, totalPaginas);
					var indice = 0;
					for (var i = 0; i < $scope.detallePorEmpresa.length && items <= itemsPorPagina; i++) {
						columns = [];

						$scope.producto = $scope.detallePorEmpresa[i];
						for (var j = 0; j < $scope.producto.detallesVenta.length; j++) {
							$scope.DetalleVenta = $scope.producto.detallesVenta[j];
							doc.font('Helvetica');
							indice = i + 1;
							doc.text(indice, 45, y);
							doc.text($scope.DetalleVenta.venta.factura, 65, y);
							doc.text($scope.producto.nombre, 120, y);
							doc.text($scope.DetalleVenta.cantidad, 465, y);
							doc.text($scope.DetalleVenta.total, 520, y);


							y = y + 30;
							items++;

							if (items == itemsPorPagina || j + 1 == $scope.detallePorEmpresa.length) {
								if (j + 1 == $scope.detallePorEmpresa.length) {

								} else {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFDetalleProductos(doc, datos, pagina, totalPaginas);
									doc.font('Helvetica', 8);
								}
							}
						}

					}
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 750);
					doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 750);

					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});

					blockUI.stop();
				})
			}

			$scope.dibujarCabeceraPDFDetalleEmpresas = function (doc, datos, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("VENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + $scope.fechaInicioTexto, -70, 40, { align: "center" });
				doc.text("Hasta " + $scope.fechaFinTexto, 70, 40, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text(datos[0].detallesVenta[0].venta.cliente.razon_social, 0, 55, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("Codigo: " + datos[0].codigo, 45, 65);
				doc.font('Helvetica-Bold', 8);
				doc.rect(40, 100, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Nº", 45, 110);
				doc.text("N° Factura", 65, 110);
				doc.text("Producto", 120, 110);
				doc.text("Cantidad", 450, 110);
				doc.text("Monto", 520, 110);

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 500, 750);
			}

			$scope.abrirReportePorEmpresa = function () {
				$scope.abrirPopup($scope.modalReportesEmpresas);
			}

			$scope.cerrarReportePorEmpresa = function () {
				$scope.cerrarPopup($scope.modalReportesEmpresas);
			}
			// reporte puntajes cliente ========
			$scope.abrirReportePorClientePuntaje = function () {
				$scope.abrirPopup($scope.modalReportesClientesPuntaje);
			}

			$scope.abrirReporteClientesPuntajes = function () {
				$scope.fechaInicioTexto;
				$scope.fechaFinTexto;
				$scope.idEmpresa = $scope.usuario.id_empresa;

				if ($scope.filtro != undefined) {
					if ($scope.filtro.sucursal) {
						$scope.sucursalSelec = $scope.filtro.sucursal;
					} else {
						$scope.sucursalSelec = 0;
					}
				} else {
					$scope.sucursalSelec = 0
				}

				for (var i = 0; i < $scope.sucursales.length; i++) {
					if ($scope.sucursal) {
						if ($scope.sucursal == $scope.sucursales[i].id) {
							$scope.sucursal = $scope.sucursales[i].nombre;
						} else if ($scope.sucursal == 0) {
							$scope.sucursal = "Todos";
						}
					} else {
						$scope.sucursal = "Todos";
					}
				}

				if ($scope.razonSocial) {
					$scope.razonSocial;
				} else {
					$scope.razonSocial = "Todos";
				}

				if ($scope.fechaInicioTexto === undefined || $scope.fechaFinTexto === undefined) {
					SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
				} else {

					$scope.obtenerPuntajesClientes();

					$scope.abrirReportePorClientePuntaje();
				}

			}


			$scope.obtenerPuntajesClientes = function (filtro) {
				$scope.paginator = Paginator();
				$scope.paginator.column = "razon_social";
				$scope.paginator.direction = "asc";
				if (filtro) {
					$scope.filtroDetallesProducto = {
						idsSucursales: $scope.sucursalesUsuario,
						inicio: $scope.fechaInicioTexto,
						fin: $scope.fechaFinTexto,
						sucursal: $scope.sucursalSelec,
						idEmpresa: $scope.idEmpresa,
						ubicacion: filtro.ubicacion
					}
				} else {
					$scope.filtroDetallesProducto = {
						idsSucursales: $scope.sucursalesUsuario,
						inicio: $scope.fechaInicioTexto,
						fin: $scope.fechaFinTexto,
						sucursal: $scope.sucursalSelec,
						idEmpresa: $scope.idEmpresa,
						ubicacion: 0
					}
				}

				$scope.paginator.callBack = $scope.filtroDetallePuntajesClientes;
				$scope.paginator.getSearch("", $scope.filtroDetallesProducto, null);


			}

			$scope.filtroDetallePuntajesClientes = function () {
				blockUI.start();
				var promesa = ventasDetalleClientePuntajes($scope.paginator);
				promesa.then(function (datos) {
					$scope.detalleEmpresa = datos.detalle;
					$scope.paginator.setPages(datos.paginas);
					blockUI.stop();
				})

			}

			$scope.imprimirSimpleClientePuntaje = function (id, empresa) {
				blockUI.start();
				var idEmpresa = 0;
				idEmpresa = $scope.usuario.id_empresa;
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				var promesa = detalleClientePuntaje(inicio, fin, idEmpresa, id);
				promesa.then(function (datos) {
					$scope.detallePorEmpresa = datos;

					var doc = new PDFDocument({ compress: false, margin: 10 });
					var stream = doc.pipe(blobStream());
					doc.font('Helvetica', 8);
					var y = 105, itemsPorPagina = 20, items = 0, pagina = 1;
					var totalPaginas = Math.ceil($scope.detallePorEmpresa.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFClientePuntaje(doc, empresa, pagina, totalPaginas);
					var indice = 0;
					for (var i = 0; i < $scope.detallePorEmpresa.length && items <= itemsPorPagina; i++) {
						columns = [];

						$scope.producto = $scope.detallePorEmpresa[i];
						for (var j = 0; j < $scope.producto.detallesVenta.length; j++) {
							$scope.DetalleVenta = $scope.producto.detallesVenta[j];
							doc.font('Helvetica');
							indice = i + 1;
							$scope.DetalleVenta.venta.fecha = new Date($scope.DetalleVenta.venta.fecha);
							doc.text($scope.DetalleVenta.venta.fecha.getDate() + "/" + ($scope.DetalleVenta.venta.fecha.getMonth() + 1) + "/" + $scope.DetalleVenta.venta.fecha.getFullYear(), 45, y);
							doc.text($scope.DetalleVenta.venta.factura, 105, y);
							doc.text($scope.DetalleVenta.cantidad, 155, y);
							doc.text($scope.producto.codigo, 200, y);
							var nombreProd = $scope.producto.nombre;
							if (!$scope.DetalleVenta.venta.activa) {
								nombreProd = nombreProd + " (ANULADA)"
							}
							doc.text(nombreProd, 270, y);
							doc.text($scope.DetalleVenta.promocionActualPuntaje.puntaje, 480, y);
							doc.text($scope.DetalleVenta.promocionActualPuntaje.puntaje * $scope.DetalleVenta.cantidad, 520, y);

							y = y + 30;
							items++;

							if (items == itemsPorPagina || j + 1 == $scope.detallePorEmpresa.length) {
								if (j + 1 == $scope.detallePorEmpresa.length) {

								} else {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFClientePuntaje(doc, empresa, pagina, totalPaginas);
									doc.font('Helvetica', 8);
								}
							}
						}

					}
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 750);
					doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 750);

					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});

					blockUI.stop();
				})
			}

			$scope.dibujarCabeceraPDFClientePuntaje = function (doc, empresa, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("VENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + $scope.fechaInicioTexto.split(' ')[0], -70, 40, { align: "center" });
				doc.text("Hasta " + $scope.fechaFinTexto.split(' ')[0], 70, 40, { align: "center" });
				doc.font('Helvetica-Bold', 10);
				doc.text(empresa.razon_social, 0, 55, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.rect(40, 70, 540, 25).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha Factura", 45, 80);
				doc.text("N° Factura", 105, 80);
				doc.text("Cantidad", 155, 80);
				doc.text("Codigo", 200, 80);
				doc.text("Producto", 270, 80);
				doc.text("Puntaje", 480, 80);
				doc.text("Total Puntaje", 520, 80);

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 500, 750);
			}

			$scope.excelSimpleClientePuntaje = function (id) {
				blockUI.start();
				var idEmpresa = 0;
				idEmpresa = $scope.usuario.id_empresa;
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				var promesa = detalleClientePuntaje(inicio, fin, idEmpresa, id);
				promesa.then(function (datos) {
					$scope.detallePorEmpresa = datos;
					var data = [["Fecha Factura", "N° Factura", "Cantidad", "Codigo", "Producto", "Puntaje", "Total Puntaje"]];
					for (var i = 0; i < $scope.detallePorEmpresa.length; i++) {
						$scope.producto = $scope.detallePorEmpresa[i];
						for (var j = 0; j < $scope.producto.detallesVenta.length; j++) {
							var columns = [];
							$scope.DetalleVenta = $scope.producto.detallesVenta[j];
							$scope.DetalleVenta.venta.fecha = new Date($scope.DetalleVenta.venta.fecha);
							columns.push($scope.DetalleVenta.venta.fecha.getDate() + "/" + ($scope.DetalleVenta.venta.fecha.getMonth() + 1) + "/" + $scope.DetalleVenta.venta.fecha.getFullYear());
							columns.push($scope.DetalleVenta.venta.factura);
							columns.push($scope.DetalleVenta.cantidad);
							columns.push($scope.producto.codigo);

							columns.push($scope.producto.nombre);
							columns.push($scope.DetalleVenta.promocionActualPuntaje.puntaje);
							columns.push($scope.DetalleVenta.promocionActualPuntaje.puntaje * $scope.DetalleVenta.cantidad);

							if (!$scope.DetalleVenta.venta.activa) {
								columns.push("Anulado");
							}
							data.push(columns);
						}
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-CLIENTE-PUNTAJES.xlsx");
					blockUI.stop();
				});
			}

			$scope.imprimirPDFClientesPuntajes = function () {
				blockUI.start();

				var doc = new PDFDocument({ compress: false, margin: 10 });
				var stream = doc.pipe(blobStream());
				doc.font('Helvetica', 8);
				var y = 105, itemsPorPagina = 20, items = 0, pagina = 1;
				var totalPaginas = Math.ceil($scope.detalleEmpresa.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFClientesPuntajes(doc, pagina, totalPaginas);

				for (var j = 0; j < $scope.detalleEmpresa.length && items <= itemsPorPagina; j++) {
					$scope.DetalleVenta = $scope.detalleEmpresa[j];
					doc.font('Helvetica');
					indice = j + 1;

					doc.text(indice, 45, y);
					doc.text($scope.DetalleVenta.razon_social, 75, y);
					doc.text($scope.DetalleVenta.ubicacion_geografica ? $scope.DetalleVenta.ubicacion_geografica : "", 355, y);
					doc.text($scope.DetalleVenta.total, 520, y);

					y = y + 30;
					items++;

					if (items == itemsPorPagina || j + 1 == $scope.detalleEmpresa.length) {
						if (j + 1 == $scope.detalleEmpresa.length) {

						} else {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 150;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFClientesPuntajes(doc, datos, pagina, totalPaginas);
							doc.font('Helvetica', 8);
						}
					}
				}


				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 750);
				doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, 750);

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});

				blockUI.stop();
			}

			$scope.dibujarCabeceraPDFClientesPuntajes = function (doc, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("CLIENTES", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + $scope.fechaInicioTexto.split(' ')[0], -70, 40, { align: "center" });
				doc.text("Hasta " + $scope.fechaFinTexto.split(' ')[0], 70, 40, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.rect(40, 70, 540, 25).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("N°", 45, 80);
				doc.text("Cliente", 75, 80);
				doc.text("Ubicacion", 355, 80);
				doc.text("Puntaje", 520, 80);

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 500, 750);
			}

			$scope.excelClientesPuntajes = function () {
				blockUI.start();
				var data = [["N°", "Cliente", "Ubicacion", "Puntaje"]];
				for (var j = 0; j < $scope.detalleEmpresa.length; j++) {
					var columns = [];
					$scope.DetalleVenta = $scope.detalleEmpresa[j];
					indice = j + 1;
					columns.push(indice);
					columns.push($scope.DetalleVenta.razon_social);
					columns.push($scope.DetalleVenta.ubicacion_geografica);
					columns.push($scope.DetalleVenta.total);
					data.push(columns);
				}

				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-CLIENTEs-PUNTAJES.xlsx");
				blockUI.stop();
			}

			$scope.abrirReporteGraficoClientePuntajes = function () {
				$scope.abrirPopup($scope.modelGraficaClientesPuntajes);
			}
			$scope.cerrarReporteGraficoClientePuntajes = function () {
				$scope.cerrarPopup($scope.modelGraficaClientesPuntajes);
			}

			$scope.graficarClientesPuntajes = function (estado) {
				var estadoGrafico = estado;
				blockUI.start();
				var data = [];

				$scope.datosReporteGraficoEmpresa = $scope.detalleEmpresa.sort(function (a, b) {
					return b.total - a.total;
				});

				for (var i = 0; i < $scope.datosReporteGraficoEmpresa.length; i++) {
					var columns = []
					columns.push($scope.datosReporteGraficoEmpresa[i].razon_social);
					columns.push($scope.datosReporteGraficoEmpresa[i].total);

					data.push(columns);
				}

				var contenedor = [];
				var contenido = [];

				contenido = data.map(function (row, i) {

					if (contenedor.length >= 10) {

					} else {
						contenedor.push(row);
					}
				})

				$scope.reporteGraficoClientesPuntajes(contenedor, estadoGrafico);
				blockUI.stop();

			}

			$scope.reporteGraficoClientesPuntajes = function (reporte, estadoGrafico) {

				$scope.abrirReporteGraficoClientePuntajes();
				var contenedor = [];
				var legend = [];
				var datasReporte = [];

				if (reporte.length != 0) {
					datasReporte = reporte.map(function (dato, i) {
						var variable = { label: dato[0], y: dato[1] };
						return variable;

					})
				}

				if (estadoGrafico == false) {
					var chart = new CanvasJS.Chart("tablaReportesClientesPuntajes", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light1", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "column",
								indexLabelFontSize: 10,
								//showInLegend: true,
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Puntos."
						},
						axisX: {
							labelFontColor: "white",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1

							//prefix: "Very long label "
						}
					});
					chart.render();

				} else if (estadoGrafico == true) {
					var chart = new CanvasJS.Chart("tablaReportesClientesPuntajes", {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light2", // "light1", "light2", "dark1", "dark2"
						title: {
							text: "",
							//fontSize: 14,
							//horizontalAlign: "center" ,
							//fontColor:'blue'        
						},
						data: [
							{
								// Change type to "doughnut", "line", "splineArea", etc.
								type: "pie",
								startAngle: 25,
								toolTipContent: "<b>{label}</b>: {y} Puntos.",
								showInLegend: "true",
								legendText: "{label}",
								indexLabelFontSize: 10,
								indexLabel: "{label} - {y} Puntos.",
								dataPoints: datasReporte
							}
						],
						axisY: {
							prefix: "",
							suffix: " Puntos."
						},
						axisX: {
							labelFontColor: "black",
							labelMaxWidth: 50,
							labelWrap: true,   // change it to false
							interval: 1,
							//prefix: "Very long label "
						}
					});
					chart.render();

				}
			}

			$scope.cerrarReportePorClientePuntaje = function () {
				$scope.cerrarPopup($scope.modalReportesClientesPuntaje);
			}

			$scope.modificarVenta = async function (venta) {

				//console.log("venta ressss =========== ", venta);
				$("#modal-wizard-venta-edicion").dialog({ closeOnEscape: false });
				$scope.blockerVenta = true
				$scope.venta = new Venta(venta);
				$scope.venta.editable = true
				$scope.venta.movimientoActual = Object.assign({}, venta.movimiento)
				var al = 0;
				$scope.venta.sucursal = venta.almacen.sucursal;
				al = venta.almacen;
				if ($scope.venta.sucursal) {
					var obtenerA = await $scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
					if (al.id) {
						$scope.venta.almacen = al;
					}
				}
				$scope.venta.detallesVenta.forEach(function (dato) {
					dato.eliminado = false
				})
				if ($scope.venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_TRASPASO && $scope.usuario.empresa.usar_traspaso_automatico) {
					$scope.venta.cliente = {}
					$scope.obtenerSucursalesDiferente($scope.venta.sucursal.id);
					$scope.venta.sucursalDestino = $scope.sucursalesDiferente.find(x => {
						return x.id = $scope.venta.almacenTraspaso.id_sucursal
					})
					$scope.obtenerAlmacenesDiferente($scope.venta.sucursalDestino.id)
					$scope.venta.almacenDestino = $scope.venta.almacenTraspaso;
				}
				$scope.venta.movimiento = $scope.venta.movimiento.clase;
				// $scope.venta.sucursal =  $scope.sucursales[0];
				$scope.obtenerTipoEgreso($scope.venta.movimiento);
				var fechaActual = new Date($scope.venta.fecha);
				var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
				var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
				$scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
				/* $scope.venta.tipoPago = $scope.tiposPago[0]; */
				$scope.cambiarTipoPago($scope.venta);
				$scope.editar_precio = false;
				$scope.detalleVenta = { eliminado: false, producto: { activar_inventario: true }, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				$scope.abrirPopup($scope.idModalWizardCompraEdicion);
				angular.element($window).unbind("keydown");
				angular.element($window).bind("keydown", function (e) {
					if (e.keyCode == 115) {
						$scope.venderProformaDirectoNormal($scope.venta);
					}
				});
				$scope.venta.id_empresa = $scope.usuario.id_empresa
				$scope.enfocar('nit');
				$scope.$evalAsync();

			}

			$scope.abrirmodalServicioVenta = function () {
				$scope.servicio = { habilitado: true, eliminado: false }
				$scope.abrirPopup($scope.modalServicioVenta)
			}
			$scope.cerrarmodalServicioVenta = function () {
				$scope.cerrarPopup($scope.modalServicioVenta)
			}

			$scope.abrirModalImportacionVentaServicio = function () {
				$scope.venta = {
					usar_descuento_general: false,
					tipo_descuento: false,
					descuento: 0,
					tipo_recargo: false,
					recargo: 0,
					ice: 0,
					excento: 0, sucursal: "", actividad: "", fecha: "", movimiento: { nombre_corto: "SERV" }
				}

				$scope.obtenerListaServiciosVentas()
				$scope.abrirPopup($scope.modelImportacionVentaServicio)
			}
			$scope.cerrarModalImportacionVentaServicio = function () {
				$scope.cerrarPopup($scope.modelImportacionVentaServicio)
			}

			$scope.obtenerListaServiciosVentas = function () {
				var promesa = ListaServiciosVentas($scope.usuario.id_empresa, 0)
				promesa.then(function (dato) {
					$scope.serviciosVentas = dato.servicios
				})
			}

			$scope.buscarServiciosVentas = function (query) {
				if (query != "" && query != undefined) {
					blockUI.noOpen = true;
					var promesa = ListaServiciosVentas($scope.usuario.id_empresa, query);
					var p = promesa.then(function (datos) {
						return datos.servicios
					})
					return p;
				}
			}

			$scope.establecerServicioSeleccionado = function (servicio) {
				$scope.establecerServicio(servicio)
				$scope.cerrarmodalServicioVenta()
			}
			$scope.establecerServicio = function (servicio) {
				$scope.detalleVenta = {
					centroCosto: null, servicio: servicio
					, importe: servicio.precio, descuento: servicio.descuento, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false
					, eliminado: false
				};

				$scope.enfocar('cantidad');

			}
			$scope.agregarServicioVenta = function (servicio) {
				if (servicio.id) {
					$scope.servicio = { habilitado: true, eliminado: false }
				} else {
					if (servicio.edit) {
						$scope.servicio = { habilitado: true, eliminado: false }
					} else {
						$scope.serviciosVentas.push(servicio)
						$scope.servicio = { habilitado: true, eliminado: false }
					}
				}
			}
			$scope.modificarServicioVenta = function (servicio) {
				$scope.servicio = servicio
				$scope.servicio.edit = true
			}
			$scope.cancelarEdicionVentaServicio = function (servicio) {
				$scope.servicio = { habilitado: true, eliminado: false }
			}
			$scope.guardarServiciosVenta = function (datos) {
				var promesa = GuardarListaServiciosVentas($scope.usuario.id_empresa, datos)
				promesa.then(function (dato) {
					$scope.obtenerListaServiciosVentas()
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
					$scope.cerrarmodalServicioVenta()

				})
			}
			$scope.verificarCamposForimImpServ = function (formimpvent) {
				formimpvent.activ.$touched = (formimpvent.activ.$invalid) ? true : false
				formimpvent.fechaSerImp.$touched = (formimpvent.fechaSerImp.$invalid) ? true : false
				formimpvent.sucServImp.$touched = (formimpvent.sucServImp.$invalid) ? true : false

			}
			$scope.subirExcelVentasServicios = function (event) {

				//console.log('iniciando carga de pacientes')
				var files = event.target.files;
				var i, f;
				for (i = 0, f = files[i]; i != files.length; ++i) {
					//console.log('iniciando lectura de excel(s)')
					var reader = new FileReader();
					var name = f.name;
					reader.onload = function (e) {
						var data = e.target.result;
						var workbook = XLSX.read(data, { type: 'binary' });
						var first_sheet_name = workbook.SheetNames[0];
						var row = 2, i = 0, row2 = 2;
						var worksheet = workbook.Sheets[first_sheet_name];
						var ventas = [];
						var arregloServicios = []
						var arregloClientes = []
						// do {
						// 	var venta = {}
						// 	venta.numeroVenta = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
						// 	venta.nitCliente = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
						// 	venta.razon_social = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
						// 	vendedor = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
						// 	observacion = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
						// 	venta.vendedor = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
						// 	venta.observacion = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
						// 	venta.tipoPago.nombre = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
						// 	venta.dias_credito = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? parseInt(worksheet['G' + row].v.toString()) : null;
						// 	venta.a_cuenta = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : null;


						// }while(worksheet['A' + row] != undefined)
						do {
							row2 = 2
							var venta = { tipoPago: {}, detallesVenta: [], cliente: {}, fechaTexto: $scope.venta.fecha, sucursal: $scope.venta.sucursal, actividad: $scope.venta.actividad };
							var NumeroVenta = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							if (row == 2) {
								var NumeroVentaComparacion = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							} else {
								var NumeroVentaComparacion = worksheet['A' + (row - 1)] != undefined && worksheet['A' + (row - 1)] != "" ? worksheet['A' + (row - 1)].v.toString() : null;
							}
							venta.cliente.nit = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							venta.cliente.razon_social = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							var bandera = false
							if (arregloClientes.length > 0) {
								for (var i = 0; i < arregloClientes.length; i++) {
									var element = arregloClientes[i].nit;
									if (venta.cliente.nit != null) {
										if (element == venta.cliente.nit) {
											bandera = true
										}
									}
								}
								if (!bandera) {

									arregloClientes.push(venta.cliente)

								}
							} else {
								arregloClientes.push(venta.cliente)
							}
							venta.vendedor = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							venta.observacion = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							venta.tipoPago.nombre = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							venta.dias_credito = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? parseInt(worksheet['G' + row].v.toString()) : null;
							venta.a_cuenta = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : null;

							do {
								var detalleVenta = { servicio: {} }
								detalleVenta.servicio.nombre = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
								detalleVenta.servicio.precio = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v.toString()) : null;
								detalleVenta.servicio.id_empresa = $scope.usuario.id_empresa
								var bandera = false
								if (arregloServicios.length > 0) {
									for (var i = 0; i < arregloServicios.length; i++) {
										var element = arregloServicios[i].nombre;
										if (detalleVenta.servicio.nombre != null) {
											if (element == detalleVenta.servicio.nombre) {
												bandera = true
											}
										}
									}
									if (!bandera) {

										arregloServicios.push(detalleVenta.servicio)

									}
								} else {
									arregloServicios.push(detalleVenta.servicio)

								}
								detalleVenta.observaciones = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? worksheet['J' + row2].v.toString() : null;
								detalleVenta.importe = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v.toString()) : null;

								detalleVenta.descuento = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? parseFloat(worksheet['L' + row2].v.toString()) : null;
								detalleVenta.tipo_recargo = worksheet['M' + row2] != undefined && worksheet['M' + row2] != "" ? parseFloat(worksheet['M' + row2].v.toString()) : null;
								detalleVenta.recargo = worksheet['N' + row2] != undefined && worksheet['N' + row2] != "" ? parseFloat(worksheet['N' + row2].v.toString()) : null;
								detalleVenta.ice = worksheet['O' + row2] != undefined && worksheet['O' + row2] != "" ? parseFloat(worksheet['O' + row2].v.toString()) : null;
								detalleVenta.excento = worksheet['P' + row2] != undefined && worksheet['P' + row2] != "" ? parseFloat(worksheet['P' + row2].v.toString()) : null;

								var NumeroVentaA = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;

								if (NumeroVenta == NumeroVentaA) {
									var recargo = detalleVenta.recargo
									if (detalleVenta.tipo_recargo == "%") {
										recargo = $scope.detalleVenta.importe * (detalleVenta.recargo / 100);
									}
									var serv = $scope.serviciosVentas.filter(function (dato) {
										return dato.nombre == detalleVenta.servicio.nombre
									})
									if (serv.length > 0) {
										detalleVenta.servicio = serv[0]
									}
									detalleVenta.total = Math.round((detalleVenta.importe - detalleVenta.descuento + recargo - detalleVenta.ice - detalleVenta.excento) * 1000) / 1000;

									venta.detallesVenta.push(detalleVenta);
								}
								row2++;
								/*  i++; */
							} while (worksheet['A' + row2] != undefined);


							if (NumeroVenta != NumeroVentaComparacion || row == 2) {
								var sumaImporte = 0;
								for (var i = 0; i < venta.detallesVenta.length; i++) {
									if (!venta.detallesVenta[i].eliminado) {
										sumaImporte = sumaImporte + venta.detallesVenta[i].importe;
									}
								}
								venta.importe = Math.round((sumaImporte) * 1000) / 1000;
								var sumaTotal = 0;
								for (var i = 0; i < venta.detallesVenta.length; i++) {
									if (!venta.detallesVenta[i].eliminado) {
										sumaTotal = sumaTotal + venta.detallesVenta[i].total;
									}
								}
								venta.total = Math.round((sumaTotal) * 1000) / 1000;
								venta.pagado = venta.total;

								var tipo_pago = $scope.tiposPago.filter(function (dato) {
									return dato.nombre == venta.tipoPago.nombre
								})
								venta.tipoPago = tipo_pago[0]
								if (venta.tipoPago.nombre == "CREDITO") {
									venta.saldo = venta.total - venta.a_cuenta;
								} else {
									venta.saldo = null
								}
								venta.cambio = 0
								venta.id_usuario = $scope.usuario.id
								var mov = $scope.movimientosEgreso.filter(function (dato) {
									return dato.nombre_corto == $scope.diccionario.EGRE_SERVICIO
								})
								if (venta.vendedor) {
									var vend = $scope.vendedores.filter(function (dato) {
										return dato.persona.nombre_completo == venta.vendedor
									})
									if (vend.length > 0) {
										venta.vendedor = vend[0]
									}
								}

								venta.movimiento = mov[0]
								venta.id_empresa = $scope.usuario.id_empresa
								venta.fecha = new Date($scope.convertirFecha(venta.fechaTexto))
								ventas.push(venta);
							}
							row++;
							i++;

						} while (worksheet['A' + row] != undefined);
						$scope.guardarImportacionVentasServicios(ventas, arregloServicios, arregloClientes);
					};
					reader.readAsBinaryString(f);

				}
			}
			$scope.guardarImportacionVentasServicios = function (ventas, arregloServicios, arregloClientes) {
				blockUI.start();
				var promesa = GuardarVentasImportados(ventas, arregloServicios, arregloClientes)
				promesa.then(function (dato) {
					blockUI.stop()
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
				}).catch(function (err) {
					var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					SweetAlert.swal("", msg, "warning");
					blockUI.stop()
				})
			}



			$scope.obtenerCotizaciones = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "nombre";
				$scope.paginator.direction = "desc";
				$scope.paginator.callBack = $scope.obtenerLista;
				$scope.filtro = { empresa: $scope.usuario.id_empresa, inicio: "", fin: "", fecha_inicio: new Date($scope.convertirFecha("14/08/2018")), fecha_fin: new Date($scope.convertirFecha("27/08/2018")), busqueda: "", importe: 0 };
				$scope.paginator.getSearch("", $scope.filtro, null);
			}


			$scope.obtenerLista = function () {
				blockUI.start();
				var promesa = filtroCotizacionesPendientes($scope.paginator);
				promesa.then(function (dato) {
					$scope.paginator.setPages(dato.paginas);
					$scope.cotizaciones = dato.cotizaciones;
					blockUI.stop();
				})
			}

			$scope.abrirPopupCotizaciones = function () {
				$scope.obtenerCotizaciones();
				$scope.abrirPopup($scope.idModalCotizaciones);
			}

			$scope.cerrarPopupCotizaciones = function () {
				$scope.cerrarPopup($scope.idModalCotizaciones);
			}


			$scope.obtenerDetalleCotizacion = function (cotizacion, editCoticacion) {
				$scope.editCoticacion = editCoticacion;

				for (var i = 0; i < cotizacion.detallesCotizacion.length; i++) {
					$scope.productoC = cotizacion.detallesCotizacion[i].producto;

					// agregar optencion de los inventarios de los productos ===============
					// var promesa = ListaInventariosProducto($scope.productoC.id, cotizacion.id_almacen, null);
					// promesa.then(function (inventarios) {
					// 	console.log("disponibleeeeee ", inventarios);
					// 	$scope.productoC.inventarios = inventarios;
					// });
					$scope.ListInvetarioALmacen = $scope.productoC.inventarios.filter(function (inv) {
						return (inv.id_almacen == cotizacion.id_almacen);
					});

					$scope.productoC.inventarios = $scope.ListInvetarioALmacen;
					// inventarios por lotes
					$scope.inventariosDisponibleProducto = [];
					$scope.inventariosDisponibleProducto.push({ id: 0, fecha_vencimiento: "TODOS", fechaVencimientoTexto: "TODOS" });
					cotizacion.detallesCotizacion[i].inventariosDisponibleProducto = $scope.inventariosDisponibleProducto.concat($scope.productoC.inventarios);
					cotizacion.detallesCotizacion[i].inventarioProducto = $scope.inventariosDisponibleProducto[0];

					var inventarioDisponible = $scope.obtenerInventarioTotal($scope.productoC);
					cotizacion.detallesCotizacion[i].disponible = inventarioDisponible;
					cotizacion.detallesCotizacion[i].aceptar = false;

					if (inventarioDisponible < cotizacion.detallesCotizacion[i].cantidad) {
						cotizacion.detallesCotizacion[i].faltante = cotizacion.detallesCotizacion[i].cantidad - inventarioDisponible;
						cotizacion.detallesCotizacion[i].entregar = inventarioDisponible;
					} else {
						cotizacion.detallesCotizacion[i].faltante = 0;
						cotizacion.detallesCotizacion[i].entregar = cotizacion.detallesCotizacion[i].cantidad;
					}

					if (cotizacion.detallesCotizacion[i].entregar > 0) {
						cotizacion.detallesCotizacion[i].aceptar = true;
					}

					if (cotizacion.detallesCotizacion[i].faltante > 0) {
						cotizacion.detallesCotizacion[i].aceptar = false;
					}
					cotizacion.detallesCotizacion[i].total = cotizacion.detallesCotizacion[i].entregar * cotizacion.detallesCotizacion[i].precio_unitario;

				}


				$scope.cotizacion = cotizacion;
				// $scope.obtenerCotizaciones();
				$scope.abrirPopup($scope.idModalDetalleCotizaciones);
			}

			$scope.actualizarInventarioCotizacion = function (detalleVenta) {
				if (detalleVenta.inventarioProducto.id != 0) {
					detalleVenta.costos = [];
					detalleVenta.costos.push(detalleVenta.inventarioProducto);
					detalleVenta.inventario_disponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
					detalleVenta.lote = detalleVenta.inventarioProducto.lote;

				} else {
					detalleVenta.inventario_disponible = $scope.obtenerInventarioTotal(detalleVenta.producto);
					detalleVenta.costos = detalleVenta.producto.inventarios;
					detalleVenta.lote = "";
				}

				detalleVenta.disponible = detalleVenta.inventario_disponible;
				detalleVenta.aceptar = false;

				if (detalleVenta.inventario_disponible < detalleVenta.cantidad) {
					detalleVenta.faltante = detalleVenta.cantidad - detalleVenta.inventario_disponible;
					detalleVenta.entregar = detalleVenta.inventario_disponible;
				} else {
					detalleVenta.faltante = 0;
					detalleVenta.entregar = detalleVenta.cantidad;
				}

				if (detalleVenta.entregar > 0) {
					detalleVenta.aceptar = true;
				}

				if (detalleVenta.faltante > 0) {
					detalleVenta.aceptar = false;
				}
				detalleVenta.total = detalleVenta.entregar * detalleVenta.precio_unitario;

				// $scope.calcularImporte();
				// if ($scope.usuario.usar_filtro_lote) {
				// 	if (detalleVenta.inventario_disponible > 0) {
				// 		$scope.agregarDetalleVenta($scope.detalleVenta)
				// 	}

				// }
			}


			$scope.isCheckedCotizacion = function (cotizacion) {
				if (cotizacion) {
					for (var e in cotizacion.detallesCotizacion) {
						var checkBox = cotizacion.detallesCotizacion[e];
						if (checkBox.aceptar)
							return false;
					}
				}
				return true;
			};

			$scope.cerrarPopupDetalleCotizaciones = function () {
				$scope.cerrarPopup($scope.idModalDetalleCotizaciones);
			}

			$scope.aceptarDetalleCotizacion = function (cotizacion) {
				cotizacion.aceptar = true;
			}
			$scope.cancelarDetalleCotizacion = function (cotizacion) {
				cotizacion.aceptar = false;
			}

			$scope.cotizacionAgregado = false;

			$scope.agregarVentaCotizacion = function (cotizacion) {
				$scope.cotizacionAgregado = true;
				$scope.obtenerAlmacenesActividades(cotizacion.sucursal.id);
				var fechaC = new Date();
				cotizacion.fecha = fechaC.getDate() + "/" + (fechaC.getMonth() + 1) + "/" + fechaC.getFullYear();
				$scope.detalleVenta = [];
				var totalVenta = 0;
				for (var i = 0; i < cotizacion.detallesCotizacion.length; i++) {
					// corregir detalle a agregar =======
					if (cotizacion.detallesCotizacion[i].aceptar) {
						var detalleVentaC = {
							eliminado: false,
							producto: cotizacion.detallesCotizacion[i].producto, precio_unitario: cotizacion.detallesCotizacion[i].precio_unitario,
							costos: cotizacion.detallesCotizacion[i].producto.activar_inventario ? cotizacion.detallesCotizacion[i].producto.inventarios : [],
							cantidad: cotizacion.detallesCotizacion[i].cantidad, descuento: 0, recargo: 0, ice: 0, excento: 0, descuento_dolares: 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, tipo_descuento: false, tipo_recargo: false, importe: cotizacion.detallesCotizacion[i].importe, total: cotizacion.detallesCotizacion[i].total
						};
						totalVenta = totalVenta + cotizacion.detallesCotizacion[i].total;

						// $scope.detalleVenta.push(detalleVentaC);

						if (detalleVentaC.producto.activar_inventario) {
							if (detalleVentaC.costos.length > 1) {
								var cantidadTotal = detalleVentaC.cantidad, j = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVentaC));
								var paraRectificacionDescuento = []
								while (j < detalleVentaC.costos.length && cantidadTotal > 0) {
									detalleVentaC.inventarioProducto = detalleVentaC.costos[j];
									var cantidadDisponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVentaC);
									if (cantidadDisponible > 0) {
										var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
										var cantidadParcial;
										// $scope.detalleVenta = nuevoDetalleVenta;
										if (cantidadTotal > cantidadDisponible) {
											cantidadParcial = cantidadDisponible;
											cantidadTotal = cantidadTotal - cantidadDisponible
										} else {
											cantidadParcial = cantidadTotal;
											cantidadTotal = 0;
										}
										nuevoDetalleVenta.cantidad = cantidadParcial;
										if ($scope.usuario.empresa.usar_vencimientos) {
											nuevoDetalleVenta.fecha_vencimiento = detalleVentaC.costos[j].fecha_vencimiento;
											nuevoDetalleVenta.lote = detalleVentaC.costos[j].lote;
										}
										nuevoDetalleVenta.costos = [];
										nuevoDetalleVenta.costos.push(detalleVentaC.costos[j]);
										nuevoDetalleVenta.inventario = detalleVentaC.costos[j];
										// $scope.detalleVenta.push(nuevoDetalleVenta);
										paraRectificacionDescuento.push(nuevoDetalleVenta);
									}
									j++;
								}

								for (var index = 0; index < paraRectificacionDescuento.length; index++) {
									var detalleCorregido = $scope.calcularImporte2(paraRectificacionDescuento[index]);
									$scope.detalleVenta.push(detalleCorregido);
								}

							} else {
								if (detalleVentaC.costos.length > 0) {
									if ($scope.usuario.empresa.usar_vencimientos) {
										detalleVentaC.fecha_vencimiento = detalleVentaC.costos[0].fecha_vencimiento;
										detalleVentaC.lote = detalleVentaC.costos[0].lote;
										detalleVentaC.inventario = detalleVentaC.costos[0];
									}
								}
								$scope.detalleVenta.push(detalleVentaC);
							}
						} else {
							$scope.detalleVenta.push(detalleVentaC);
						}

					}
				}

				$scope.venta = new Venta({
					usar_descuento_general: false,
					tipo_descuento: false,
					descuento: 0,
					tipo_recargo: false,
					recargo: 0,
					ice: 0,
					excento: 0,
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, cliente: cotizacion.cliente,
					sucursal: cotizacion.sucursal, almacen: cotizacion.almacen, fechaTexto: cotizacion.fecha,
					tipoPago: $scope.tiposPago[0], cotizacion_id: cotizacion.id, actualizarCotizacion: true,
					movimiento: cotizacion.tipoMovimiento,
					importe: totalVenta,
					detallesVenta: $scope.detalleVenta, detallesVentaNoConsolidadas: [], pagado: totalVenta, cambio: 0, despachado: false, vendedor: null, total: totalVenta, total_descuento_general: 0
				});
				$scope.cerrarPopupDetalleCotizaciones();
				$scope.cerrarPopupCotizaciones();
			}
			$scope.editarDetalleCotizacion = function (cotizacion) {
				$scope.Cprecio_unitario = cotizacion.precio_unitario;
				$scope.c = cotizacion;
				$scope.abrirPopup($scope.idModalDetalleCotizacionEditar);
			}
			$scope.guardarEditarCotizacion = function (Cprecio_unitario) {
				$scope.c = Cprecio_unitario;
				$scope.cerrarPopupCotizacionEditar();
			}

			$scope.cancelarPopupCotizacionEditar = function (cotizacion) {
				// $scope.c = cotizacion;
				$scope.c.precio_unitario = $scope.Cprecio_unitario;
				$scope.cerrarPopup($scope.idModalDetalleCotizacionEditar);
			}

			$scope.cerrarPopupCotizacionEditar = function () {
				$scope.cerrarPopup($scope.idModalDetalleCotizacionEditar);
			}

			$scope.subirExcelVentasFacturacion = function (event) {
				//console.log('iniciando carga de pacientes')
				var files = event.target.files;
				var i, f;
				for (i = 0, f = files[i]; i != files.length; ++i) {
					//console.log('iniciando lectura de excel(s)')
					var reader = new FileReader();
					var name = f.name;
					reader.onload = function (e) {
						var data = e.target.result;
						var workbook = XLSX.read(data, { type: 'binary' });
						var first_sheet_name = workbook.SheetNames[0];
						var row = 2, i = 0, row2 = 2;
						var worksheet = workbook.Sheets[first_sheet_name];
						var ventas = [];
						var arregloClientes = []
						/* var arregloCentrosCosto = [] */
						/* var arregloProductos = [] */
						do {
							row2 = row
							var venta = { sucursal: {}, almacen: {}, tipoPago: {}, detallesVenta: [], cliente: {} };
							venta.cliente.nit = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							venta.cliente.razon_social = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							var bandera = false
							if (arregloClientes.length > 0) {
								for (var i = 0; i < arregloClientes.length; i++) {
									var element = arregloClientes[i].nit;
									if (venta.cliente.nit != null) {
										if (element == venta.cliente.nit) {
											bandera = true
										}
									}
								}
								if (!bandera) {

									arregloClientes.push(venta.cliente)

								}
							} else {
								arregloClientes.push(venta.cliente)
							}
							venta.factura = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							/* if (row == 2) {
								var facturaComparacion = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							} else {
								var facturaComparacion = worksheet['A' + (row - 1)] != undefined && worksheet['A' + (row - 1)] != "" ? worksheet['A' + (row - 1)].v.toString() : null;
							} */
							venta.actividad = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							venta.fechaTexto = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? new Date($scope.fecha_excel_angular(worksheet['E' + row].v.toString())) : null;
							venta.sucursal.nombre = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							venta.almacen.nombre = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							venta.tipoPago.nombre = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
							venta.dias_credito = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
							venta.a_cuenta = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? parseFloat(worksheet['J' + row2].v.toString()) : null;
							venta.vendedor = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? worksheet['K' + row2].v.toString() : null;
							venta.observacion = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? worksheet['L' + row2].v.toString() : null;

							do {
								var NumeroCompraA = worksheet['C' + row2] != undefined && worksheet['C' + row2] != "" ? worksheet['C' + row2].v.toString() : null;
								if (NumeroCompraA == venta.factura) {
									var detalleVenta = {
										producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, eliminado: false,
										descuento_dolares: 0,
										recargo_dolares: 0,
										ice_dolares: 0,
										excento_dolares: 0
									}

									var bandera = false
									detalleVenta.producto.codigo = worksheet['M' + row2] != undefined && worksheet['M' + row2] != "" ? worksheet['M' + row2].v.toString() : null;
									detalleVenta.producto.nombre = worksheet['N' + row2] != undefined && worksheet['N' + row2] != "" ? worksheet['N' + row2].v.toString() : null;

									detalleVenta.fecha_vencimiento = worksheet['O' + row2] != undefined && worksheet['O' + row2] != "" ? new Date($scope.fecha_excel_angular(worksheet['O' + row2].v.toString())) : null;
									detalleVenta.lote = worksheet['P' + row2] != undefined && worksheet['P' + row2] != "" ? worksheet['P' + row2].v.toString() : null;
									detalleVenta.precio_unitario = worksheet['Q' + row2] != undefined && worksheet['Q' + row2] != "" ? parseFloat(worksheet['Q' + row2].v.toString()) : null;
									detalleVenta.cantidad = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? parseFloat(worksheet['R' + row2].v.toString()) : null;
									detalleVenta.importe = detalleVenta.precio_unitario * detalleVenta.cantidad
									detalleVenta.tipo_descuento = worksheet['S' + row2] != undefined && worksheet['S' + row2] != "" ? worksheet['S' + row2].v.toString() : null;
									detalleVenta.descuento = worksheet['T' + row2] != undefined && worksheet['T' + row2] != "" ? parseFloat(worksheet['T' + row2].v.toString()) : null;
									detalleVenta.tipo_recargo = worksheet['U' + row2] != undefined && worksheet['U' + row2] != "" ? worksheet['U' + row2].v.toString() : null;
									detalleVenta.recargo = worksheet['V' + row2] != undefined && worksheet['V' + row2] != "" ? parseFloat(worksheet['V' + row2].v.toString()) : null;
									detalleVenta.ice = worksheet['W' + row2] != undefined && worksheet['W' + row2] != "" ? parseFloat(worksheet['W' + row2].v.toString()) : null;
									detalleVenta.excento = worksheet['X' + row2] != undefined && worksheet['X' + row2] != "" ? parseFloat(worksheet['X' + row2].v.toString()) : null;
									var recargo = detalleVenta.recargo
									if (detalleVenta.tipo_recargo == "%") {
										recargo = detalleVenta.importe * (detalleVenta.recargo / 100);
									}
									var descuento = detalleVenta.descuento
									if (detalleVenta.tipo_descuento == "%") {
										descuento = detalleVenta.importe * (detalleVenta.descuento / 100);
									}
									detalleVenta.total = Math.round((detalleVenta.importe - descuento + recargo - detalleVenta.ice - detalleVenta.excento) * 1000) / 1000;


									venta.detallesVenta.push(detalleVenta);
									row2++;
								}

							} while (NumeroCompraA == venta.factura);

							row = (row2 - 1)

							/* if (NumeroVenta != NumeroVentaComparacion || row == 2)  {*/
							var sumaImporte = 0;
							for (var i = 0; i < venta.detallesVenta.length; i++) {
								sumaImporte = sumaImporte + venta.detallesVenta[i].importe;
							}
							venta.importe = Math.round((sumaImporte) * 1000) / 1000;
							var sumaTotal = 0;
							for (var i = 0; i < venta.detallesVenta.length; i++) {
								sumaTotal = sumaTotal + venta.detallesVenta[i].total;
							}
							venta.total = Math.round((sumaTotal) * 1000) / 1000;
							var tipo_pago = $scope.tiposPago.filter(function (dato) {
								return dato.nombre == venta.tipoPago.nombre
							})
							venta.tipoPago = tipo_pago[0]
							if (venta.tipoPago.nombre == "CREDITO") {
								venta.saldo = venta.total - venta.a_cuenta;
							} else {
								venta.saldo = null
							}
							venta.id_usuario = $scope.usuario.id
							var mov = $scope.movimientosEgreso.filter(function (dato) {
								return dato.nombre_corto == $scope.diccionario.EGRE_FACTURACION
							})
							venta.movimiento = mov[0]
							venta.id_empresa = $scope.usuario.id_empresa
							venta.fecha = venta.fechaTexto
							/* ventas.push(venta); */
							/* } */
							ventas.push(venta);
							row++;
							i++;

						} while (worksheet['A' + row] != undefined);
						$scope.guardarImportacionVentasFacturacion(ventas, arregloClientes);
						$scope.limpiarArchivoImportacion()
					};
					reader.readAsBinaryString(f);

				}
			}

			$scope.validarColumnasExcelTraspasos = function (worksheet) {
				var colValues = [];
				var cells = Object.keys(worksheet);
				var cantcolumn = 12;
				for (var i = 0; i < cantcolumn + 1; i++) {
					if (cells[i].indexOf('1') > -1) {
						colValues.push(worksheet[cells[i]].v); //Contails all column names
					}
				}
				// faltan columnas =========
				var columnasFaltantes = [];
				var arrColumns = ["Numero venta", "Sucursal Origen", "Almacén origen", "Sucursal Destino", "Almacén destino", "Fecha", "Código", "Producto", "Vencimiento", "Lote", "P.U", "Cantidad"];

				if (cantcolumn != colValues.length) {
					arrColumns.push(...colValues)
					// para que solo quede los que no esten duplicados
					var uniq = arrColumns
						.map((name) => {
							return {
								count: 1,
								name: '<span style="color:#dd3333">' + name + '</span><br/>'
							}
						})
						.reduce((a, b) => {
							a[b.name] = (a[b.name] || 0) + b.count
							return a
						}, {})

					columnasFaltantes = Object.keys(uniq).filter((a) => uniq[a] == 1)

				}
				return columnasFaltantes;
			}

			$scope.subirExcelVentasTraspasos2222 = function (event) {
				let files = event.target.files;
				let i, f;
				for (i = 0, f = files[i]; i != files.length; ++i) {
					//console.log('iniciando lectura de excel(s)')
					let reader = new FileReader();
					let name = f.name;
					reader.onload = async function (e) {
						let data = e.target.result;
						let workbook = XLSX.read(data, { type: 'binary' });
						let first_sheet_name = workbook.SheetNames[0];
						let row = 2, row2 = 2;
						let worksheet = workbook.Sheets[first_sheet_name];
						let columnasFaltantes = $scope.validarColumnasExcelTraspasos(worksheet);
						if (columnasFaltantes.length == 0) {
							let ventas = [];
							do {
								row2 = row
								let venta = { detallesVenta: [] };
								venta.numero = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
								/* venta.sucursal_origen=$scope.sucursales.find(function(x){
									return x.nombre=sucursal_nombre
								}) */
								//let almacenes = obtenerAlmacenesParaImportar(venta.sucursal_origen.id)
								venta.sucursal_origen = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
								/* venta.almacen_origen=almacenes.find(function(x){
									return x.nombre=almacen_nombre
								}) */
								// let sucursalO = $scope.sucursales.find(x=>x.nombre ==venta.sucursal_origen)
							/* 	var q = await ObtenerConfiguracionIso(sucursalO.id);
								q = q.configuracionesIso.find(cfg => cfg.tipoDocumento.nombre_corto === "" && cfg.activo == true);
								venta.config_doc_iso = q.id; */
								venta.almacen_origen = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
								venta.sucursal_destino = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
								venta.almacen_destino = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
								venta.fecha = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? new Date($scope.fecha_excel_angular(worksheet['F' + row].v.toString())) : null;
								let numeroVenta = 0
								do {
									let detalleVenta = {
										producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, eliminado: false,
										descuento_dolares: 0,
										recargo_dolares: 0,
										ice_dolares: 0,
										excento_dolares: 0
									}

									detalleVenta.producto.codigo = worksheet['G' + row2] != undefined && worksheet['G' + row2] != "" ? worksheet['G' + row2].v.toString() : null;
									detalleVenta.producto.nombre = worksheet['H' + row2] != undefined && worksheet['H' + row2] != "" ? worksheet['H' + row2].v.toString() : null;
									detalleVenta.fecha_vencimiento = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
									detalleVenta.lote = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? worksheet['J' + row2].v.toString() : null;
									detalleVenta.precio_unitario = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v.toString()) : null;
									detalleVenta.cantidad = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? parseFloat(worksheet['L' + row2].v.toString()) : null;
									detalleVenta.importe = detalleVenta.precio_unitario * detalleVenta.cantidad
									detalleVenta.total = detalleVenta.importe
									venta.detallesVenta.push(detalleVenta);
									row2++;
									numeroVenta = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;

								} while (numeroVenta == venta.numero);

								row = row2

								/* if (NumeroVenta != NumeroVentaComparacion || row == 2)  {*/
								var sumaImporte = 0;
								for (var i = 0; i < venta.detallesVenta.length; i++) {
									sumaImporte = sumaImporte + venta.detallesVenta[i].importe;
								}
								venta.importe = Math.round((sumaImporte) * 1000) / 1000;
								var sumaTotal = 0;
								for (var i = 0; i < venta.detallesVenta.length; i++) {
									sumaTotal = sumaTotal + venta.detallesVenta[i].total;
								}
								venta.total = Math.round((sumaTotal) * 1000) / 1000;

								venta.id_usuario = $scope.usuario.id
								var mov = $scope.movimientosEgreso.find(function (dato) {
									return dato.nombre_corto == $scope.diccionario.EGRE_TRASPASO
								})
								venta.movimiento = mov
								venta.id_empresa = $scope.usuario.id_empresa
								ventas.push(venta);

							} while (worksheet['A' + row] != undefined);
							// $scope.guardarImportacionVentasTraspaso(ventas);
							$scope.validarImportacionesSalidas(ventas);
						} else {
							SweetAlert.swal({
								title: "Columnas Faltantes!",
								html: "<div class='content-sweet'>" + columnasFaltantes.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-danger'>Revise el archivo de importación</dt><small class='text-danger'>verifique que contengan todas las columnas necesarias.</small></dl>",
								icon: 'warning'
							});
						}


						$scope.limpiarArchivoImportacion()
					};
					reader.readAsBinaryString(f);

				}
			}

			$scope.subirExcelVentasTraspasos = function (event) {
				let files = event.target.files;
				let i, f;
				for (i = 0, f = files[i]; i != files.length; ++i) {
					//console.log('iniciando lectura de excel(s)')
					let reader = new FileReader();
					let name = f.name;
					reader.onload = async function (e) {
						let data = e.target.result;
						let workbook = XLSX.read(data, { type: 'binary' });
						if (workbook.SheetNames.length > 1) {
							SweetAlert.hideLoading();
							var hojas = workbook.SheetNames.join('<br/>')
							SweetAlert.swal({
								title: "Error en el archivo!",
								html: "<div class='content-sweet'><span class='red'>El Archivo Tiene " + workbook.SheetNames.length + " Hojas</span><br/> <span class='orange'>" + hojas + " <br/></span><span class='red'> eliminelos y deje solo uno</span></div><dl id='dt-list-1'><dt class='text-danger'>Revise el archivo de importación</dt></dl>",
								icon: 'warning'
							});
						}else{
							let first_sheet_name = workbook.SheetNames[0];
							let worksheet = workbook.Sheets[first_sheet_name];
							var datosExcel = XLSX.utils.sheet_to_json(worksheet, { raw: true, range: 1, header: "A" });
							let columnasFaltantes = $scope.validarColumnasExcelTraspasos(worksheet);
							if (columnasFaltantes.length == 0) {
								$scope.validarImportacionesSalidas(datosExcel);
							} else {
								SweetAlert.swal({
									title: "Columnas Faltantes!",
									html: "<div class='content-sweet'>" + columnasFaltantes.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-danger'>Revise el archivo de importación</dt><small class='text-danger'>verifique que contengan todas las columnas necesarias.</small></dl>",
									icon: 'warning'
								});
							}
						}
						$scope.limpiarArchivoImportacion()
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.validarImportacionesSalidas = function (ventas) {
				if (ventas.length > 0) {
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
					var promesa = ValidarImportacionVentas(ventas, $scope.usuario.id_empresa, $scope.usuario.id)
					promesa.then(function (dato) {
						SweetAlert.hideLoading();
						if (dato.ventas.length > 0) {
							if (dato.noValidos.length > 0) {
								SweetAlert.swal({
									title: "Inventarios Faltantes!",
									html: "<div class='content-sweet'>" + dato.noValidos.join('\n\n') + "</div><dl id='dt-list-1'><dt>Desea Guardar Los Traspasos?</dt><small class='text-danger'>SOLO SE GUARDARAN LOS ITEMS CON INVENTARIO DISPONIBLE.</small></dl>",

									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (result.value) {
										$scope.guardarImportacionVentasTraspaso(dato.ventas);
									}
								});
							} else {
								SweetAlert.swal({
									title: "Se valido Correctamente Tiene Inventarios Disponibles!",
									text: "Desea Guardar Los Traspasos?",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (result.value) {
										$scope.guardarImportacionVentasTraspaso(dato.ventas);
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

			$scope.guardarImportacionVentasTraspaso = function (ventas) {
				blockUI.start();
				$scope.ventasParaGuardar = ventas
				let ventasArray = []
				if ($scope.ventasParaGuardar.length > 0) {
					if ($scope.ventasParaGuardar.length > 1) {
						ventasArray = $scope.ventasParaGuardar.slice(0, 1)
						$scope.ventasParaGuardar = $scope.ventasParaGuardar.slice(1, $scope.ventasParaGuardar.length)
					} else {
						ventasArray = $scope.ventasParaGuardar
						$scope.ventasParaGuardar = []
					}
					var promesa = GuardarImportacionVentasTraspaso(ventasArray, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						blockUI.stop()
						if ($scope.ventasParaGuardar.length > 0) {
							$scope.mostrarMensaje("Faltan procesar " + $scope.ventasParaGuardar.length + " ventas traspasos.")
							$scope.guardarImportacionVentasTraspaso($scope.ventasParaGuardar)

						} else {
							blockUI.stop()
							$scope.mostrarMensaje(dato.mensaje)
						}
					})
				}
			}
			$scope.guardarImportacionVentasFacturacion = function (ventas, arregloClientes) {
				blockUI.start();
				$scope.ventasParaGuardar = ventas
				let ventasArray = []
				if ($scope.ventasParaGuardar.length > 0) {
					if ($scope.ventasParaGuardar.length > 1) {
						ventasArray = $scope.ventasParaGuardar.slice(0, 1)
						$scope.ventasParaGuardar = $scope.ventasParaGuardar.slice(1, $scope.ventasParaGuardar.length)
					} else {
						ventasArray = $scope.ventasParaGuardar
						$scope.ventasParaGuardar = []
					}
					var promesa = GuardarImportacionVentasFacturacion(ventasArray, arregloClientes, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						blockUI.stop()
						if ($scope.ventasParaGuardar.length > 0) {
							$scope.mostrarMensaje("Faltan procesar " + $scope.ventasParaGuardar.length + " ventas facturación.")
							$scope.guardarImportacionVentasFacturacion($scope.ventasParaGuardar, [])

						} else {
							blockUI.stop()
							$scope.mostrarMensaje(dato.mensaje)
						}
					})
				}
			}

			$scope.subirExcelPagosVentas = function (event) {
				var files = event.target.files;
				var i, f;
				for (i = 0, f = files[i]; i != files.length; ++i) {
					//console.log('iniciando lectura de excel(s)')
					var reader = new FileReader();
					var name = f.name;
					reader.onload = function (e) {
						var data = e.target.result;
						var workbook = XLSX.read(data, { type: 'binary' });
						var first_sheet_name = workbook.SheetNames[0];
						var row = 2, i = 0, row2 = 2;
						var worksheet = workbook.Sheets[first_sheet_name];
						var pagos = []
						do {
							row2 = 2
							var pago = {}
							pago.factura = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							pago.fecha = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							pago.monto = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? parseFloat(worksheet['C' + row].v.toString()) : null;
							pago.autorizacion = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							pago.total = 0
							do {
								var NumeroCompraA = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;
								var monto = worksheet['C' + row2] != undefined && worksheet['C' + row2] != "" ? parseFloat(worksheet['C' + row2].v.toString()) : null;
								if (NumeroCompraA == pago.factura) {
									pago.total += monto
								}
								row2++
							} while (NumeroCompraA == pago.factura);
							pagos.push(pago)
							row++

						} while (worksheet['A' + row] != undefined);
						$scope.guardarImportacionPagosVenta(pagos);

					};

					reader.readAsBinaryString(f);

				}
			}

			$scope.guardarImportacionPagosVenta = function (pagos) {
				blockUI.start();
				var promesa = GuardarImportacionPagosVenta(pagos, $scope.usuario.id_empresa)
				promesa.then(function (dato) {
					blockUI.stop()
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
					$scope.recargarItemsTabla()
				})
			}

			$scope.abrirModalDestinatarioEmail = function (venta) {

				$scope.dataMail.venta = { id: venta.id }
				$scope.abrirPopup($scope.ModalDestinatarioEmail);
			}

			$scope.cerrarModalDestinatarioEmail = function () {
				$scope.dataMail = { destinatario: "", venta: { id: 0 }, empresa: $scope.usuario.id_empresa, domain: $location.$$host }
				$scope.cerrarPopup($scope.ModalDestinatarioEmail);
			}

			$scope.UsarLectorDeBarra = function () {
				if ($scope.usuario.usar_lector_de_barra == true) {
					$scope.usuario.usar_lector_de_barra = true
					$localStorage.usuario = JSON.stringify($scope.usuario);
					var promesa = GuardarUsuarLectorDeBarra($scope.usuario)
				} else {
					$scope.usuario.usar_lector_de_barra = false
					localStorage.usuario = JSON.stringify($scope.usuario);
					var promesa = GuardarUsuarLectorDeBarra($scope.usuario)
				}
				//console.log($scope.usuario.usar_lector_de_barra)
			}
			/* inicio meseros venta */
			$scope.optenerListaMeseros = function () {
				var promesa = ListaMeserosVenta($scope.usuario.id_empresa)
				promesa.then(function (dato) {
					$scope.meserosVenta = dato
				})
			}
			$scope.abrirModalMeserosVenta = function () {
				$scope.optenerListaMeseros()
				$scope.abrirPopup($scope.idModalMeserosVenta);
			}
			$scope.cerrarModalMeserosVenta = function () {
				$scope.cerrarPopup($scope.idModalMeserosVenta);
			}
			$scope.abrirModalNuevoMesero = function (mesero) {
				$scope.mesero = {}
				if (mesero) {
					$scope.mesero = mesero
				}
				$scope.data = {};
				$scope.abrirPopup($scope.idModalNuevoMesero);
			}
			$scope.cerrarModalNuevoMesero = function () {
				$scope.cerrarPopup($scope.idModalNuevoMesero);
			}
			$scope.guardarMeseroVenta = function () {
				var promesa = CrearMeseroVenta($scope.usuario.id_empresa, $scope.mesero)
				promesa.then(function (dato) {
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
					$scope.cerrarModalNuevoMesero()
					$scope.data = {};
					$scope.optenerListaMeseros()
				})
			}
			$scope.inhabilitarMesero = function () {
				$scope.mesero.activo = false
				$scope.guardarMeseroVenta()
			}
			$scope.establecerMesero = function (data, focus) {
				$scope.venta.mesero = data
				$scope.enfocar(focus);
			}
			$scope.establecerMeseroCierre = function (data, focus) {
				$scope.cierremesa.mesero = data
				$scope.enfocar(focus);
			}
			$scope.buscarMeserosVenta = async function (texto, focus, cierre) {
				var promesa = ListaMeserosVenta($scope.usuario.id_empresa)

				var datos = await promesa.then(function (data) {
					var arreglo = data.filter(function (x) {
						var nombre = x.persona.nombre_completo.toUpperCase()
						var s = nombre.indexOf(texto.toUpperCase())
						if (s == -1) {
							var codigo = x.codigo.toUpperCase()
							var s = codigo.indexOf(texto.toUpperCase())
						}
						if (s != -1) {
							return x
						}
					})
					return arreglo
				})
				if (datos.length == 1) {
					if (cierre) {
						$scope.establecerMeseroCierre(datos[0], focus)
					} else {
						$scope.establecerMesero(datos[0], focus)
					}

				} else {
					return datos
				}
			}

			function groupVentasMesas(det) {
				var resultGroup = [];
				det.forEach(function (a) {
					if (!this[a.id_producto]) {
						this[a.id_producto] = { promocionActual: a.promocionActual, id: a.id, producto: a.producto, cantidad: 0, total: 0 };
						resultGroup.push(this[a.id_producto]);
					}
					this[a.id_producto].cantidad += a.cantidad;
					this[a.id_producto].total += a.total;
				}, Object.create(null));
				return resultGroup;
			}

			$scope.BuscarVentasMesa = function (evento, cierremesa) {
				/* if (evento.which === 13) { */
				$scope.cierremesa.total = 0;
				var promesa = InfoVentasMesas(cierremesa.mesero.id, cierremesa.mesa, $scope.usuario.id)
				promesa.then(function (dato) {
					$scope.cierremesa.datosVentasMesas = dato;
					$scope.cierremesa.datosVentasMesasGroup = groupVentasMesas(dato);

					for (var i = 0; i < dato.length; i++) {
						$scope.cierremesa.total = $scope.cierremesa.total + dato[i].total;
					}
					if (dato.length > 1) {
						$scope.enfocar("nit-cliente-express")
					}
				})
				/* } */
			}
			/* fin meseros venta */
			/* ventas express */
			$scope.abrirPopupPanelExpress = function (sucursal, almacen, actividad, tipoPago, movimiento) {
				$scope.PopoverPanelesExpress.close();
				$('.panel-collapse').removeClass('in');
				// $scope.showHideFirstRow();
				$(".first-row").hide();
				angular.element(document.querySelector('body')).css('overflow', 'hidden');
				$scope.venta = new Venta({
					usar_descuento_general: false,
					tipo_descuento: false,
					descuento: 0,
					tipo_recargo: false,
					recargo: 0,
					ice: 0,
					excento: 0,
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, cliente: {},
					detallesVenta: [], detallesVentaNoConsolidadas: [], despachado: false,
					sucursal: sucursal, almacen: almacen, actividad: actividad, tipoPago: tipoPago, movimiento: movimiento, vendedor: null, total_descuento_general: 0
				});
				$scope.obtenerGruposProductoEmpresa();
				if (!sucursal) {
					$scope.venta.sucursal =/*$scope.sucursales.length==1?*/$scope.sucursales[0]/*:null*/;
				}
				if ($scope.venta.sucursal) {
					if ($scope.venta.almacen == null) {
						$scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
					}
				}
				if (!movimiento) {
					$scope.venta.movimiento = $scope.movimientosEgreso.find(function (x) {
						return x.nombre_corto == "PFR"
					});
				}
				$scope.obtenerTipoEgreso($scope.venta.movimiento);
				if (!tipoPago) {
					$scope.venta.tipoPago = $scope.tiposPago[0];
				}
				$scope.cambiarTipoPago($scope.venta);
				var fechaActual = new Date();
				var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
				var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
				$scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
				$scope.abrirPopup($scope.idModalPanelVentasExpress);
				$scope.page = 1;
				$scope.idGrupoGlobal = 0;
				$scope.textoGlobal = 0;
				$scope.idPadreGlobal = 0
				$scope.idAnteriorPradreGlobal = 0
				$scope.paginaActualPanelgrupo = 1
				$scope.enfocar('nitP');
				setTimeout(function () {
					aplicarDatePickers();
					$("#venta-proforma").draggable({
						cursor: "crosshair",
						start: $scope.startDragging
					});
				}, 2000);

				angular.element($window).unbind("keydown");
				angular.element($window).bind("keydown", function (e) {
					if (e.keyCode == 115) {
						$scope.venderProformaDirecto($scope.venta, false);
					}

					if (e.keyCode == 113) {
						$scope.venderProformaDirecto($scope.venta, true);
					}

					// ========= para la tecla F10 del panel ventas ============ 
					if (e.keyCode == 121) {
						e.preventDefault();
						// $scope.abrirPopPupVentasCobro();

						if ($scope.venta.detallesVenta.length > 0) {
							// $scope.abrirPopup($scope.idModalConfirmacionEliminacionVenta);
							var fechaActual = new Date();
							$scope.horaActual = fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
							$scope.abrirPopup($scope.idModalPanelVentasCobro);
							$scope.enfocar('nitP1');
							var select = $('#movimiento').val('24');
							angular.element(select).triggerHandler('change');
							angular.element($('#pagadoP').val($scope.venta.total)).triggerHandler('change');

							$("form").bind("keydown", function (e) {
								if (e.keyCode === 13) return false;
							});


						} else {
							SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
						}

					}
					// ========= para la tecla F10 fin ============ 
				});
				$scope.cerrarPopupPanelExpress = function () {
					angular.element(document.querySelector('body')).css('overflow', 'scroll');
					$scope.cerrarPopup($scope.idModalPanelVentasExpress);
					$scope.productosProcesados = [];
					$scope.usar_productos_derivados_panel = false;
					// $scope.recargarItemsTabla();
					/* if ($scope.usuario.empresa.usar_pantalla_cliente) {
						socket.emit('terminarVenta', $scope.venta.sucursal);
					} */
					angular.element($window).unbind("keydown");
				}
			}
			/* fin ventas express */
			/* cerrar mesa */
			$scope.abrirModalCerrarMesa = function (mesero) {
				$scope.cierremesa = { fecha: new Date(), fechaTexto: $scope.fechaATexto(new Date()), id_empresa: $scope.usuario.id_empresa, movimiento: $scope.movimientosEgreso[0], actividad: $scope.actividades[0] }
				$scope.abrirPopup($scope.idModalCerrarMesa);
			}
			$scope.cerrarModalCerrarMesa = function () {
				$scope.cerrarPopup($scope.idModalCerrarMesa);
			}
			$scope.guardarCierreMesa = function (valid, cierremesa, visa) {
				// actualizar ventas estado_mesa a false 
				if ($scope.cierremesa.total >= 0) {
					var promesa = UpdateVentasMesasRuta(cierremesa, $scope.usuario.id)
					promesa.then(function (res) {
						toastr.success(res.mensaje);
						$scope.cerrarModalCerrarMesa()
						ventas = res.detalles.reduce(function (val, x) {
							if (val.length > 0) {
								bandera = false
								for (var index = 0; index < val.length; index++) {
									var element = val[index];
									if (element == x.venta.pedido) {
										bandera = true
									}
								}
								if (!bandera) {
									val.push(x.venta.pedido)
								}
							} else {
								val.push(x.venta.pedido)
							}
							return val
						}, [])
						var pedidos = ventas.join(", ")
						var datosVentasMesaGroup = groupVentasMesas(res.detalles);
						$scope.detallesVentasMesa = res.detalles
						if (cierremesa.movimiento.nombre_corto === $scope.diccionario.EGRE_FACTURACION) {
							$scope.imprimirVenta(res.detalles[0].venta, false)
						} else {
							$scope.generarpdfVentaMesa(datosVentasMesaGroup, res.liquidacion, visa, "LIQUIDACIÓN CUENTA", pedidos)
						}
					});

				}
			}
			$scope.pdfPreview = function (detalle, mesaget, visa) {
				$scope.generarpdfVentaMesa(detalle, mesaget, visa, "PRELIMINAR")
			}
			$scope.generarpdfVentaMesa = function (detalle, mesaget, visa, titulo, pedidos) {
				var alto;
				var total = 0;
				if (detalle.length <= 2) {
					alto = 250;
				} else {
					alto = 250 + (20 * (detalle.length - 2))
				}
				for (var iterator of detalle) {
					total += iterator.total
				}
				papel = [227, alto];
				doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
				stream = doc.pipe(blobStream());
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.font('Helvetica-Bold', 10);
				doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(titulo, { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 8);
				doc.text("MESA:                    " + mesaget.mesa, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("MESERO:                " + mesaget.mesero.persona.nombre_completo, { align: 'left' });
				doc.moveDown(0.4);
				var tipoPago = !visa ? "Efectivo" : "Visa"
				doc.text("PAGO                     " + tipoPago, { align: 'left' });
				doc.moveDown(0.4);
				doc.font('Helvetica-Bold', 8);
				doc.text("--------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);

				doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
				doc.text("--------------------------------------------------------------", { align: 'center' });
				doc.font('Helvetica', 8);
				doc.moveDown(0.4);
				doc.text("cant.                Producto                    SubTotal", { align: 'left' });
				doc.font('Helvetica-Bold', 8);;
				doc.moveDown(0.4);
				doc.text("--------------------------------------------------------------", { align: 'center' });
				doc.font('Helvetica', 8);
				doc.moveDown(0.4);
				var y = doc.y
				var x = doc.x
				for (var iterator of detalle) {
					doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })
					var nombre = iterator.promocionActual ? "(" + iterator.promocionActual.nombre + ")" : ""
					doc.text(iterator.producto.nombre + nombre, x + 30, y, { align: 'left', width: 110, })

					doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
					y += 20

				}
				doc.y = y
				doc.x = x
				doc.moveDown(0.4);
				if (pedidos) {
					doc.text("Pedidos Realizados: " + pedidos, { align: 'center' });
				}
				doc.moveDown(0.8);
				doc.text("Gracias por su Preferencia", { align: 'center' });
				doc.moveDown(0.4);
				doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
				doc.end();
				$scope.visa = false
				$scope.datosVentasMesas = [];
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					if (PDFObject.supportsPDFs) {
						$scope.abrirmodalPdfView(fileURL)
					} else {
						console.log("Boo, inline PDFs are not supported by this browser");
						var w = window.open(fileURL, '_blank', 'location=no');
						$timeout(function () {
							w.print();
						}, 500);
					}

				});

			}
			/* fin cerrar mesa */
			/* modales repotes ventas express */
			$scope.obtenerUnidadesMedidaProductos = function () {
				var promesa = ListaUnidadesMedidaProducto($scope.usuario.id_empresa)
				promesa.then(function (data) {
					$scope.unidadesMedidadProductos = data.unidadesMedida
				})
			}
			$scope.abrirModalRepostePorUnidad = function () {
				$scope.obtenerUnidadesMedidaProductos();
				if ($scope.fechaInicioTexto === undefined && $scope.fechaFinTexto === undefined) {
					SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
				} else {
					$scope.obtenerDetallesUnidad()
					$scope.abrirPopup($scope.ModalRepostePorUnidad);
					$scope.enfocar('unidadRepo')
				}
			}
			$scope.abrirModalRepostePorMesero = function () {
				$scope.optenerListaMeseros()
				if ($scope.fechaInicioTexto === undefined && $scope.fechaFinTexto === undefined) {
					SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
				} else {
					$scope.obtenerDetallesUnidad()
					$scope.abrirPopup($scope.ModalRepostePorMesero);
				}
			}

			$scope.cerrarModalRepostePorUnidad = function () {
				$scope.cerrarPopup($scope.ModalRepostePorUnidad);
			}
			$scope.cerrarModalRepostePorMesero = function () {
				$scope.cerrarPopup($scope.ModalRepostePorMesero);
			}

			$scope.abrirModalRepostePorMesa = function () {
				if ($scope.fechaInicioTexto === undefined && $scope.fechaFinTexto === undefined) {
					SweetAlert.swal("", "Ingrese primero las fechas !", "warning");
				} else {
					$scope.obtenerDetallesUnidad()
					$scope.abrirPopup($scope.ModalRepostePorMesa);
				}

			}
			$scope.cerrarModalRepostePorMesa = function () {
				$scope.cerrarPopup($scope.ModalRepostePorMesa);
			}

			/* fin  modales repotes ventas express */
			/* reportes ventas express */
			$scope.generarpdfRolloVentasMensuales = function () {
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				//$scope.paginator.itemsPerPage = 0;

				var reporte = [inicio, fin];
				var promesa = VentasProductos($scope.paginator);
				promesa.then(function (datos) {
					/* $scope.ventaSinDetalle = datos.ventas; */
					var alto;
					var total = 0;
					if (datos.ventas.length <= 2) {
						alto = 250;
					} else {
						alto = 250 + (20 * (datos.ventas.length - 2))
					}
					for (var iterator of datos.ventas) {
						total += iterator.total
					}
					papel = [227, alto];
					doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
					stream = doc.pipe(blobStream());
					doc.moveDown(0.4);
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 10);
					doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
					doc.moveDown(0.4);
					doc.text("RESUMEN DE VENTA", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("PRODUCTO", { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 8);
					doc.text("DEL: " + $scope.fechaInicioTexto + " AL: " + $scope.fechaFinTexto, { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("cant.                Producto                    SubTotal", { align: 'left' });
					doc.font('Helvetica', 8);
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					var y = doc.y
					var x = doc.x
					for (var iterator of datos.ventas) {

						doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })

						doc.text(iterator.nombre, x + 30, y, { align: 'left', width: 110, })

						doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
						y += 20
					}
					doc.y = y
					doc.x = x
					doc.moveDown(0.8);
					doc.text("Gracias por su Preferencia", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 7);
					doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						var w = window.open(fileURL, '_blank', 'location=no');
						$timeout(function () {
							w.print();
						}, 500);
					});
				});
			}
			$scope.generarReportePdfUnidad = function (unidad) {
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				//$scope.paginator.itemsPerPage = 0;

				var reporte = [inicio, fin];
				var promesa = VentasProductos($scope.paginator);
				promesa.then(function (datos) {
					/* $scope.ventaSinDetalle = datos.ventas; */
					var alto;
					var total = 0;
					if (datos.ventas.length <= 2) {
						alto = 250;
					} else {
						alto = 250 + (20 * (datos.ventas.length - 2))
					}
					for (var iterator of datos.ventas) {
						if (iterator.unidad_medida == unidad) {
							total += iterator.total
						}
					}
					papel = [227, alto];
					doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
					stream = doc.pipe(blobStream());
					doc.moveDown(0.4);
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 10);
					doc.text(unidad, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("RESUMEN DE VENTA", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("PRODUCTO", { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 8);
					doc.text("DEL: " + $scope.fechaInicioTexto + " AL: " + $scope.fechaFinTexto, { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("cant.                Producto                    SubTotal", { align: 'left' });
					doc.font('Helvetica', 8);
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					var y = doc.y
					var x = doc.x
					for (var iterator of datos.ventas) {
						if (iterator.unidad_medida == unidad) {
							doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })

							doc.text(iterator.nombre, x + 30, y, { align: 'left', width: 110, })

							doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
							y += 20
						}
					}
					doc.y = y
					doc.x = x
					doc.moveDown(0.8);
					doc.text("Gracias por su Preferencia", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 7);
					doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						var w = window.open(fileURL, '_blank', 'location=no');
						$timeout(function () {
							w.print();
						}, 500);
					});
				});
			}
			$scope.generarReportePdfMesero2 = function (mesero) {
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				//$scope.paginator.itemsPerPage = 0;

				var reporte = [inicio, fin];
				var promesa = VentasProductosMesero($scope.paginator, mesero.id);
				promesa.then(function (datos) {
					/* $scope.ventaSinDetalle = datos.ventas; */
					var alto;
					var total = 0;
					if (datos.ventas.length <= 2) {
						alto = 250;
					} else {
						alto = 250 + (20 * (datos.ventas.length - 2))
					}
					for (var iterator of datos.ventas) {
						if (iterator.meseroid == mesero.id) {
							total += iterator.total
						}
					}
					papel = [227, alto];
					doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
					stream = doc.pipe(blobStream());
					doc.moveDown(0.4);
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 10);
					doc.text($scope.usuario.empresa.razon_social, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("RESUMEN DE VENTA", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("PRODUCTO", { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 8);
					doc.text("DEL: " + $scope.fechaInicioTexto + " AL: " + $scope.fechaFinTexto, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("MESERO: " + mesero.persona.nombre_competo, { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("cant.                Producto                    SubTotal", { align: 'left' });
					doc.font('Helvetica', 8);
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					var y = doc.y
					var x = doc.x
					for (var iterator of datos.ventas) {
						if (iterator.meseroid == mesero.id) {
							doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })

							doc.text(iterator.nombre, x + 30, y, { align: 'left', width: 110, })

							doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
							y += 20
						}
					}
					doc.y = y
					doc.x = x
					doc.moveDown(0.8);
					doc.text("Gracias por su Preferencia", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 7);
					doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						var w = window.open(fileURL, '_blank', 'location=no');
						$timeout(function () {
							w.print();
						}, 500);
					});
				});
			}
			$scope.generarReportePdfMesa = function (mesa) {
				inicio = new Date($scope.convertirFecha($scope.fechaInicioTexto));
				fin = new Date($scope.convertirFecha($scope.fechaFinTexto));
				//$scope.paginator.itemsPerPage = 0;

				var reporte = [inicio, fin];
				var promesa = VentasProductosMesa($scope.paginator, mesa);
				promesa.then(function (datos) {
					/* $scope.ventaSinDetalle = datos.ventas; */
					var alto;
					var total = 0;
					if (datos.ventas.length <= 2) {
						alto = 250;
					} else {
						alto = 250 + (20 * (datos.ventas.length - 2))
					}
					for (var iterator of datos.ventas) {
						if (iterator.mesa == mesa) {
							total += iterator.total
						}
					}
					papel = [227, alto];
					doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
					stream = doc.pipe(blobStream());
					doc.moveDown(0.4);
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 10);
					doc.text($scope.usuario.empresa.razon_social, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("RESUMEN DE VENTA", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("PRODUCTO", { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 8);
					doc.text("DEL: " + $scope.fechaInicioTexto + " AL: " + $scope.fechaFinTexto, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("MESA: " + mesa, { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("cant.                Producto                    SubTotal", { align: 'left' });
					doc.font('Helvetica', 8);
					doc.moveDown(0.4);
					doc.text("--------------------------------------------------------------", { align: 'center' });
					doc.moveDown(0.4);
					var y = doc.y
					var x = doc.x
					for (var iterator of datos.ventas) {
						if (iterator.mesa == mesa) {
							doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })

							doc.text(iterator.nombre, x + 30, y, { align: 'left', width: 110, })

							doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
							y += 20
						}
					}
					doc.y = y
					doc.x = x
					doc.moveDown(0.8);
					doc.text("Gracias por su Preferencia", { align: 'center' });
					doc.moveDown(0.4);
					doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
					doc.moveDown(0.4);
					doc.font('Helvetica', 7);
					doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						var w = window.open(fileURL, '_blank', 'location=no');
						$timeout(function () {
							w.print();
						}, 500);
					});
				});
			}
			/* fin reportes ventas express */

			// PDFObject.embed(fileURL, "#pdfview", {
			// 	height: "600px", width: "600px",
			// 	pdfOpenParams: { navpanes: 2,
			// 		toolbar: 1,
			// 		statusbar: 1,view: 'FitV', pagemode: 'thumbs' },
			// 	forcePDFJS: true
			// });
			$scope.abrirmodalPdfView = function (fileURL) {
				PDFObject.embed(fileURL, "#pdfview", {
					height: "600px", width: "600px",
					pdfOpenParams: { view: 'FitH', pagemode: 'bookmarks' }
				});
				$scope.abrirPopup($scope.modalPdfView);
			}
			$scope.cerrarmodalPdfView = function () {
				$scope.cerrarPopup($scope.modalPdfView);
			}

			$scope.validarCodigoMesero = function (CodigoMesero) {
				var codigo = CodigoMesero;
				if (codigo != '') {
					$timeout(function () {
						$scope.validar = new ValidarCodigoMesero({ id_empresa: $scope.usuario.id_empresa });

						$scope.validar.codigo = CodigoMesero;

						$scope.validar.$save(function (data) {
							$scope.data = data;
						})
					}, 1500);
				}
			};

			var filterTextTimeout;
			$scope.$watch('mesero.codigo', function (val) {
				if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
				filterTextTimeout = $timeout(function () {
					$scope.validar = new ValidarCodigoMesero({ id_empresa: $scope.usuario.id_empresa });

					$scope.validar.codigo = val;
					if ($scope.validar.codigo != '' && $scope.validar.codigo != undefined) {
						$scope.validar.$save(function (data) {
							$scope.data = data;
						})
					} else {
						$scope.data = {};
					}
				}, 900); // delay 250 ms 
			})
			/* cumplanos o promocion */
			$scope.abrirModalEntregaDetalleVentaCliente = function (detalle) {
				$scope.detalleVenta = detalle
				$scope.detalleVenta.promosCumple = $scope.detalleVenta.promosCumple ? $scope.detalleVenta.promosCumple : []
				$scope.limitCantidadCumple = $scope.detalleVenta.cantidad - ($scope.detalleVenta.cantidadPorCumple ? $scope.detalleVenta.cantidadPorCumple : 0)
				$scope.promoCumple = { cliente: {}, fecha: new Date(), cantidad: $scope.limitCantidadCumple }
				$scope.abrirPopup($scope.modalEntregaDetalleVentaCliente);
			}
			$scope.cerrarModalEntregaDetalleVentaCliente = function () {
				$scope.cerrarPopup($scope.modalEntregaDetalleVentaCliente);
			}
			$scope.agregarPromoCumple = function () {
				var cantidadRestante = 0
				$scope.detalleVenta.promosCumple.push($scope.promoCumple)
				$scope.detalleVenta.total = $scope.verificarPromosCumple($scope.detalleVenta)
				$scope.sumarTotal()
				$scope.cerrarModalEntregaDetalleVentaCliente()
			}
			$scope.verificarPromosCumple = function (detalleVenta) {
				if (detalleVenta.promosCumple) {
					detalleVenta.cantidadPorCumple = detalleVenta.promosCumple.reduce(function (val, x) {
						vatotal = detalleVenta.producto
						return val + x.cantidad
					}, 0)
					var totalPorCumples = detalleVenta.promosCumple.reduce(function (val, x) {
						var total = x.cantidad * detalleVenta.producto.precio_unitario
						total = total * (1 - (x.descuento / 100))
						return val + total
					}, 0)
					cantidadRestante = detalleVenta.cantidad - detalleVenta.cantidadPorCumple
					var totalCantidadRestante = cantidadRestante * detalleVenta.producto.precio_unitario
					return totalPorCumples + totalCantidadRestante
				} else {
					return detalleVenta.total
				}
			}
			$scope.establecerClienteDetalle = function (cliente) {
				$scope.promoCumple.cliente = cliente
				if (cliente.entregasDetalleVentaCliente.length > 0) {
					var bandera = false
					for (let i = 0; i < cliente.entregasDetalleVentaCliente.length; i++) {
						const element = cliente.entregasDetalleVentaCliente[i];
						if (new Date(element.fecha).getFullYear() == new Date().getFullYear()) {
							bandera = true
						}
					}
					if (bandera == true) {
						$scope.promoCumple.messageError = "El cliente Ya cuenta con un registro de cumpleaños"
					} else {
						delete $scope.promoCumple.messageError
					}
				} else {
					delete $scope.promoCumple.messageError
				}
			}
			$scope.buscarClienteCumple = async function (query) {
				if (query != "" && query != undefined) {
					var dato = await ClientesNit($scope.usuario.id_empresa, query);

					if (dato.length == 1) {
						$scope.establecerClienteDetalle(dato[0])
					} else {
						return dato;
					}
				}
			};

			$scope.convertirFechaFin = function (fecha) {
				var dia = fecha.split('/')[0];
				var mes = fecha.split('/')[1];
				var año = fecha.split('/')[2];
				if (año == undefined) {
					año = new Date().getFullYear();
				}
				var f = new Date()
				return mes + '/' + dia + '/' + año + ":" + f.getSeconds()
			}

			$scope.validadorFechaFin = function (fecha) {
				var DActual = new Date();
				var fechaFinA = new Date($scope.convertirFechaFin(fecha));
				DActual.setHours(0, 0, 0, 0, 0);
				fechaFinA.setHours(0, 0, 0, 0, 0);
				if (fechaFinA < DActual) {
					var month = fechaFinA.getMonth() + 1;
					var day = fechaFinA.getDate();
					var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + fechaFinA.getFullYear() + '  23:59';
					$scope.fechaFinTexto = output;
				}
			}

			/* cumplaño o promocion */
			$scope.obtenerMesasOcupadas = function () {
				var promesa = ObtenerMesasOcupadas($scope.usuario.id_empresa)
				promesa.then(function (data) {
					$scope.mesasOcupadas = data.mesas
				})
			}

			$scope.obtenerDatosVenta = async function (ventaId) {
				var datos = await DatosVenta(ventaId, $scope.usuario.id_empresa);
				$scope.venta = datos.venta;
				$scope.$evalAsync()
			}

			$scope.obtenerTipoReposicion = function () {
				var promesa = ClasesTipo("TIPO_REP_ITEM");
				promesa.then(function (entidad) {
					$scope.tiposReposicionItem = entidad.clases;

				});
			}

			$scope.verVentaDevolucion = async function (venta) {
				await $scope.obtenerDatosVenta(venta.id);
				await $scope.obtenerTipoReposicion();
				$scope.abrirPopup($scope.idModalVentaDevolucion);

			}

			$scope.cerrarPopupDevolucion = function () {
				$scope.cerrarPopup($scope.idModalVentaDevolucion);
			}

			$scope.nuevaDevolucionItem = function (detalleVenta) {
				$scope.detalleVenta = detalleVenta;
				$scope.devolucion = {};
				$scope.abrirPopup($scope.idModalItemDevolucion);
			}

			$scope.cerrarNuevaDevolucionItem = function () {
				$scope.cerrarPopup($scope.idModalItemDevolucion);
			}

			$scope.guardarDevolucionItem = function (devolucion, detalleVenta) {
				devolucion.fecha = new Date($scope.convertirFecha(devolucion.fecha))
				// crear servicio y ruta para guardar ====================
				devolucion.id_sucursal = $scope.venta.almacen.id_sucursal
				var promesa = CrearDevolucionItem(detalleVenta.id, devolucion)
				promesa.then(function (datos) {
					$scope.devolucion = {}; datos
					SweetAlert.swal("Guardado!", datos.mensaje, "success");
					$scope.impresionDevolucionItem($scope.venta, detalleVenta, datos.devolucionItem);
					$scope.obtenerDatosVenta($scope.venta.id);
					$scope.cerrarNuevaDevolucionItem();
				})
			}

			$scope.nuevaReposicionItem = function (detalleVenta) {
				$scope.dynamicPopoverTiposReposicion.close();
				$scope.detalleVenta = detalleVenta;
				$scope.reposicion = {};
				$scope.abrirPopup($scope.idModalItemReposicion);
			}

			$scope.cerrarNuevaReposicionItem = function () {
				$scope.cerrarPopup($scope.idModalItemReposicion);
			}



			$scope.guardarReposicionItem = function (reposicion, detalleVenta) {
				reposicion.fecha = new Date($scope.convertirFecha(reposicion.fecha))
				reposicion.id_sucursal = $scope.venta.almacen.id_sucursal;
				var tipoRepoItem = $scope.tiposReposicionItem.find(function (element) {
					return element.nombre_corto == "FABRICANTE";
				});
				console.log("efectivosssss ", tipoRepoItem);
				reposicion.tipo_reposicion = tipoRepoItem;
				var promesa = CrearReposicionItem(detalleVenta.id, reposicion)
				promesa.then(function (datos) {
					$scope.reposicion = {};
					SweetAlert.swal("Guardado!", datos.mensaje, "success");
					datos.reposicionItem.tipoReposicion = tipoRepoItem;
					$scope.impresionReposicionItem($scope.venta, detalleVenta, datos.reposicionItem);
					$scope.obtenerDatosVenta($scope.venta.id);
					$scope.cerrarNuevaReposicionItem();
				})
			}

			$scope.DibujarCabeceraDevolucionItem = function (doc, venta, usuario, devolucion) {
				if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 50, { fit: [75, 75] }); }
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), 170, 60);
				doc.font('Helvetica', 7);
				doc.text(venta.almacen.sucursal.nombre.toUpperCase(), 170, 70);
				doc.text(venta.almacen.sucursal.direccion.toUpperCase(), 170, 80);
				var telefono = (venta.almacen.sucursal.telefono1 != null ? venta.almacen.sucursal.telefono1 : "") +
					(venta.almacen.sucursal.telefono2 != null ? "-" + venta.almacen.sucursal.telefono2 : "") +
					(venta.almacen.sucursal.telefono3 != null ? "-" + venta.almacen.sucursal.telefono3 : "");
				doc.text("TELF.: " + telefono, 170, 90);
				doc.text("COCHABAMBA - BOLIVIA", 170, 100);
				doc.font('Helvetica-Bold', 16);
				doc.text('NOTA DE DEVOLUCIÓN', 0, 125, { align: 'center' });

				var textFact = + devolucion.numero_documento ? devolucion.numero_documento : 0
				doc.text("N° " + textFact, 500, 80)
				doc.font('Helvetica-Bold', 8);
				doc.text("FECHA : ", 60, 165);
				doc.text("SEÑOR(ES) : ", 60, 175);
				doc.text("NIT : ", 360, 165);
				doc.font('Helvetica', 8);
				doc.text(devolucion.fecha ? $scope.fechaATexto(devolucion.fecha) : "", 120, 165);
				doc.text(venta.cliente ? venta.cliente.razon_social : "pendiente", 120, 175);
				doc.text(venta.cliente ? venta.cliente.nit : "pendiente", 400, 165);
				doc.font('Helvetica-Bold', 7);

				doc.rect(50, 200, 520, 25).stroke();
				doc.text("CODIGO", 55, 210);
				doc.text("CANTIDAD", 130, 210);
				doc.text("UNIDAD", 175, 210);
				doc.text("DETALLE", 210, 210);
				doc.text("SERIE", 370, 210);
				doc.text("P.UNIT.", 465, 210);
				doc.text("TOTAL", 520, 210);
			}

			$scope.impresionDevolucionItem = function (venta, detalle, devolucion) {
				var doc = new PDFDocument({ compress: false, size: [612, 468], margin: 10 });
				var stream = doc.pipe(blobStream());

				var y = 240;
				$scope.DibujarCabeceraDevolucionItem(doc, venta, $scope.usuario, devolucion);
				doc.font('Helvetica', 7);

				doc.text(detalle.producto.codigo, 55, y);
				doc.text(detalle.cantidad, 140, y);
				doc.text(detalle.producto.unidad_medida, 175, y, { width: 30 });
				doc.text(detalle.producto.nombre, 210, y, { width: 147 });
				doc.text(detalle.inventario.lote ? detalle.inventario.lote : "", 370, y, { width: 147 });
				doc.text(detalle.precio_unitario.toFixed(2), 465, y);
				doc.text(detalle.total.toFixed(2), 520, y);

				doc.font('Helvetica-Bold', 7);
				doc.text("OBSERVACIÓN:", 55, y + 40, { width: 250 });
				doc.text(devolucion.observaciones ? devolucion.observaciones : "Ninguna", 115, y + 40, { width: 250 });

				var posicionFirmas = 320;
				doc.text('------------------------------------------------------------------------------------', 62, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('DEVOLUCIÓN', 80, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(devolucion.entrega, 62, posicionFirmas + 80, { width: 200, align: 'center' });
				doc.text('------------------------------------------------------------------------------------', 350, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('RECEPCIÓN', 368, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(devolucion.recibe, 350, posicionFirmas + 80, { width: 200, align: 'center' });

				doc.moveDown(2);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}

				doc.text("  Usuario : " + $scope.usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", 55, 445);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			}

			$scope.DibujarCabeceraReposicionItem = function (doc, venta, usuario, reposicion) {
				if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 50, { fit: [75, 75] }); }
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), 170, 60);
				doc.font('Helvetica', 7);
				doc.text(venta.almacen.sucursal.nombre.toUpperCase(), 170, 70);
				doc.text(venta.almacen.sucursal.direccion.toUpperCase(), 170, 80);
				var telefono = (venta.almacen.sucursal.telefono1 != null ? venta.almacen.sucursal.telefono1 : "") +
					(venta.almacen.sucursal.telefono2 != null ? "-" + venta.almacen.sucursal.telefono2 : "") +
					(venta.almacen.sucursal.telefono3 != null ? "-" + venta.almacen.sucursal.telefono3 : "");
				doc.text("TELF.: " + telefono, 170, 90);
				doc.text("COCHABAMBA - BOLIVIA", 170, 100);
				doc.font('Helvetica-Bold', 16);
				doc.text('NOTA DE REPOSICIÓN', 0, 125, { align: 'center' });

				var textFact = + reposicion.numero_documento ? reposicion.numero_documento : 0
				doc.text("N° " + textFact, 500, 80)
				doc.font('Helvetica-Bold', 8);
				if (reposicion.tipoReposicion.nombre_corto == "FABRICANTE") {
					doc.text('(FABRICANTE)', 0, 140, { align: 'center' });
				} else if (reposicion.tipoReposicion.nombre_corto == "CAMBIO_ITEM") {
					doc.text('(CAMBIO DE PRODUCTO)', 0, 140, { align: 'center' });
				} else {
					doc.text('(EN EFECTIVO)', 0, 140, { align: 'center' });
				}

				doc.text("FECHA : ", 60, 165);
				doc.text("SEÑOR(ES) : ", 60, 175);
				doc.text("NIT : ", 360, 165);
				doc.font('Helvetica', 8);
				doc.text(reposicion.fecha ? $scope.fechaATexto(reposicion.fecha) : "", 120, 165);
				doc.text(venta.cliente ? venta.cliente.razon_social : "pendiente", 120, 175);
				doc.text(venta.cliente ? venta.cliente.nit : "pendiente", 400, 165);
				doc.font('Helvetica-Bold', 7);

				doc.rect(50, 200, 520, 25).stroke();
				if (reposicion.tipoReposicion.nombre_corto == "FABRICANTE" && reposicion.tipoReposicion.nombre_corto == "CAMBIO_ITEM") {
					doc.text("CODIGO", 55, 210);
					doc.text("CANTIDAD", 130, 210);
					doc.text("UNIDAD", 175, 210);
					doc.text("DETALLE", 210, 210);
					doc.text("SERIE", 370, 210);
					doc.text("P.UNIT.", 465, 210);
					doc.text("TOTAL", 520, 210);
				} else {
					doc.text("Monto", 55, 210);
					doc.text("Literal", 130, 210);
				}



			}

			$scope.impresionReposicionFabricanteItem = function (venta, detalle, reposicion) {
				var doc = new PDFDocument({ compress: false, size: [612, 468], margin: 10 });
				var stream = doc.pipe(blobStream());

				var y = 240;
				$scope.DibujarCabeceraReposicionItem(doc, venta, $scope.usuario, reposicion);
				doc.font('Helvetica', 7);

				doc.text(detalle.producto.codigo, 55, y);
				doc.text(detalle.cantidad, 140, y);
				doc.text(detalle.producto.unidad_medida, 175, y, { width: 30 });
				doc.text(detalle.producto.nombre, 210, y, { width: 147 });
				doc.text(reposicion.numero_serie ? reposicion.numero_serie : "", 370, y, { width: 147 });
				doc.text(detalle.precio_unitario.toFixed(2), 465, y);
				doc.text(detalle.total.toFixed(2), 520, y);

				doc.font('Helvetica-Bold', 7);
				doc.text("OBSERVACIÓN:", 55, y + 40, { width: 250 });
				doc.text(reposicion.observaciones ? reposicion.observaciones : "Ninguna", 115, y + 40, { width: 250 });

				var posicionFirmas = 320;
				doc.text('------------------------------------------------------------------------------------', 62, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('RECEPCIÓN', 80, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.recibe, 62, posicionFirmas + 80, { width: 200, align: 'center' });
				doc.text('------------------------------------------------------------------------------------', 350, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('ENTREGA CONFORME', 368, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.entrega, 350, posicionFirmas + 80, { width: 200, align: 'center' });

				doc.moveDown(2);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}

				doc.text("  Usuario : " + $scope.usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", 55, 445);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			}

			$scope.impresionReposicionCambioItem = function (venta, detalle, reposicion) {
				var doc = new PDFDocument({ compress: false, size: [612, 468], margin: 10 });
				var stream = doc.pipe(blobStream());

				var y = 240;
				$scope.DibujarCabeceraReposicionItem(doc, venta, $scope.usuario, reposicion);
				doc.font('Helvetica', 7);

				doc.text(reposicion.producto_venta.producto.codigo, 55, y);
				doc.text(reposicion.producto_venta.cantidad, 140, y);
				doc.text(reposicion.producto_venta.producto.unidad_medida, 175, y, { width: 30 });
				doc.text(reposicion.producto_venta.producto.nombre, 210, y, { width: 147 });
				doc.text(reposicion.numero_serie ? reposicion.numero_serie : "", 370, y, { width: 147 });
				doc.text(reposicion.producto_venta.precio_unitario.toFixed(2), 465, y);
				doc.text(reposicion.producto_venta.total.toFixed(2), 520, y);

				doc.font('Helvetica-Bold', 7);
				doc.text("OBSERVACIÓN:", 55, y + 40, { width: 250 });
				doc.text(reposicion.observaciones ? reposicion.observaciones : "Ninguna", 115, y + 40, { width: 250 });
				if (reposicion.monto_faltante > 0) {
					doc.text("Se devolvio Bs. " + reposicion.monto_faltante + " al cliente", 55, y + 60, { width: 250 });
				} else if (reposicion.monto_faltante < 0) {
					doc.text("El cliente reintegro Bs. " + reposicion.monto_faltante, 55, y + 60, { width: 250 });
				}

				var posicionFirmas = 320;
				doc.text('------------------------------------------------------------------------------------', 62, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('RECEPCIÓN', 80, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.recibe, 62, posicionFirmas + 80, { width: 200, align: 'center' });
				doc.text('------------------------------------------------------------------------------------', 350, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('ENTREGA CONFORME', 368, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.entrega, 350, posicionFirmas + 80, { width: 200, align: 'center' });

				doc.moveDown(2);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}

				doc.text("  Usuario : " + $scope.usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", 55, 445);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			}

			$scope.impresionReposicioneEfectivoItem = function (venta, detalle, reposicion) {
				var doc = new PDFDocument({ compress: false, size: [612, 468], margin: 10 });
				var stream = doc.pipe(blobStream());

				var y = 240;
				$scope.DibujarCabeceraReposicionItem(doc, venta, $scope.usuario, reposicion);
				doc.font('Helvetica', 7);

				doc.text(reposicion.monto + ".-", 55, y);
				doc.text(NumeroLiteral.Convertir(parseFloat(reposicion.monto).toFixed(2).toString()), 130, y);

				doc.font('Helvetica-Bold', 7);
				doc.text("OBSERVACIÓN:", 55, y + 40, { width: 250 });
				doc.text(reposicion.observaciones ? reposicion.observaciones : "Ninguna", 115, y + 40, { width: 250 });

				var posicionFirmas = 320;
				doc.text('------------------------------------------------------------------------------------', 62, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('RECEPCIÓN', 80, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.recibe, 62, posicionFirmas + 80, { width: 200, align: 'center' });
				doc.text('------------------------------------------------------------------------------------', 350, posicionFirmas + 60, { width: 200, align: 'center' });
				doc.text('ENTREGA CONFORME', 368, posicionFirmas + 70, { width: 160, align: 'center' });
				doc.text(reposicion.entrega, 350, posicionFirmas + 80, { width: 200, align: 'center' });

				doc.moveDown(2);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}

				doc.text("  Usuario : " + $scope.usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", 55, 445);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			}

			$scope.impresionReposicionItem = function (venta, detalle, reposicion) {
				if (reposicion.tipoReposicion.nombre_corto == "FABRICANTE") {
					$scope.impresionReposicionFabricanteItem(venta, detalle, reposicion);
				} else if (reposicion.tipoReposicion.nombre_corto == "CAMBIO_ITEM") {
					$scope.impresionReposicionCambioItem(venta, detalle, reposicion);
				} else if (reposicion.tipoReposicion.nombre_corto == "EFECTIVO") {
					$scope.impresionReposicioneEfectivoItem(venta, detalle, reposicion);
				} else {
					$scope.impresionReposicionFabricanteItem(venta, detalle, reposicion);
				}
			}

			$scope.dynamicPopoverTiposReposicion = {
				isOpen: false,
				templateUrl: 'myPopoverTiposReposicion.html',
				open: function open() {
					$scope.dynamicPopoverTiposReposicion.isOpen = true;
				},
				close: function close() {
					$scope.dynamicPopoverTiposReposicion.isOpen = false;
				}
			};

			$scope.nuevaCambioItem = function (detalleVenta) {
				$scope.dynamicPopoverTiposReposicion.close();
				$scope.detalleVenta = detalleVenta;
				$scope.reposicion = {};
				$scope.abrirPopup($scope.idModalItemCambio);
			}

			$scope.cerrarNuevaCambioItem = function () {
				$scope.cerrarPopup($scope.idModalItemCambio);
			}

			$scope.nuevaEfectivoItem = function (detalleVenta) {
				$scope.dynamicPopoverTiposReposicion.close();
				$scope.detalleVenta = detalleVenta;
				$scope.reposicion = {};
				$scope.abrirPopup($scope.idModalItemEfectivo);
			}

			$scope.cerrarNuevaEfectivoItem = function () {
				$scope.cerrarPopup($scope.idModalItemEfectivo);
			}

			$scope.abrirPopupInventarioReposicion = function () {
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
				$scope.abrirPopup($scope.idModalProductoReposicion);
			}

			$scope.establecerProductoReposicion = function (producto) {
				if (!$scope.comprobarExistente(producto)) {

					producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
					producto.descuento = producto.descuento ? producto.descuento : 0

					var promesa = ListaInventariosProducto(producto.id, $scope.venta.almacen.id, $scope.filtro_lote);
					promesa.then(function (dato) {
						producto.inventarios = dato;

						for (var i = 0; i < producto.inventarios.length; i++) {
							producto.inventarios[i].fecha_vencimiento = (producto.inventarios[i].fecha_vencimiento ? new Date(producto.inventarios[i].fecha_vencimiento) : null);
							producto.inventarios[i].fechaVencimientoTexto = (producto.inventarios[i].fecha_vencimiento ? producto.inventarios[i].fecha_vencimiento.getDate() + "/" + (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + producto.inventarios[i].fecha_vencimiento.getFullYear() : "");
							producto.inventarios[i].detallesMovimiento[0].movimiento.fecha = new Date(producto.inventarios[i].detallesMovimiento[0].movimiento.fecha);
							producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto = producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getDate() + "/" + (producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getMonth() + 1) + "/" + producto.inventarios[i].detallesMovimiento[0].movimiento.fecha.getFullYear();
						}

						$scope.inventariosDisponibleProducto = [];
						var precio = 0
						var precio_dolares = 0
						$scope.TipoPrecioProducto = {}
						$scope.inventariosDisponibleProducto.push({ id: 0, fecha_vencimiento: "TODOS", fechaVencimientoTexto: "TODOS" });
						$scope.inventariosDisponibleProducto = $scope.inventariosDisponibleProducto.concat(producto.inventarios);
						var inventarioDisponible = $scope.obtenerInventarioTotal(producto);

						precio_dolares = (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / $scope.venta_dolar : 0)
						precio = (producto.precio_unitario ? producto.precio_unitario : producto.precio_unitario_dolares ? producto.precio_unitario_dolares * $scope.venta_dolar : 0)

						if ($scope.usuario.usar_filtro_lote) {
							$scope.detalleVentaGet = {
								eliminado: false,
								producto: producto, precio_unitario: producto.precio_unitario, precio_unitario_dolares: (producto.precio_unitario_dolares ? producto.precio_unitario_dolares : producto.precio_unitario ? producto.precio_unitario / ($scope.venta_dolar) : 0), inventarioProducto: $scope.inventariosDisponibleProducto[1],
								inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
								cantidad: 1, descuento: producto.descuento ? producto.descuento : (producto.descuento_dolares ? producto.descuento_dolares * ($scope.venta_dolar) : 0), descuento_dolares: producto.descuento_dolares ? producto.descuento_dolares : producto.descuento ? producto.descuento / ($scope.venta_dolar) : 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
							};
							$scope.agregarItemReposicion($scope.detalleVentaGet);

						} else {
							$scope.detalleVentaGet = {
								eliminado: false,
								producto: producto, precio_unitario: precio, precio_unitario_dolares: precio_dolares, inventarioProducto: $scope.inventariosDisponibleProducto[0],
								inventario_disponible: inventarioDisponible, costos: producto.activar_inventario ? producto.inventarios : [],
								cantidad: 1, descuento: producto.descuento ? producto.descuento : (producto.descuento_dolares ? producto.descuento_dolares * ($scope.venta_dolar) : 0), descuento_dolares: producto.descuento_dolares ? producto.descuento_dolares : producto.descuento ? producto.descuento / ($scope.venta_dolar) : 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
							};

							$scope.agregarItemReposicion($scope.detalleVentaGet);

						}

					});
				} else {
					SweetAlert.swal("", "El producto " + producto.nombre + " ya existe en el detalle de salida ", "warning");
				}
			}

			$scope.agregarItemReposicion = function (detalleVenta) {
				console.log(detalleVenta);

				// totalVenta = totalVenta + cotizacion.detallesCotizacion[i].total;

				if (detalleVenta.producto.activar_inventario) {
					if (detalleVenta.costos.length > 1) {
						var cantidadTotal = detalleVenta.cantidad, j = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));
						var paraRectificacionDescuento = []
						while (j < detalleVenta.costos.length && cantidadTotal > 0) {
							detalleVenta.inventarioProducto = detalleVenta.costos[j];
							var cantidadDisponible = $scope.obtenerInventarioTotalPorFechaVencimiento(detalleVenta);
							if (cantidadDisponible > 0) {
								var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
								var cantidadParcial;
								// $scope.detalleVenta = nuevoDetalleVenta;
								if (cantidadTotal > cantidadDisponible) {
									cantidadParcial = cantidadDisponible;
									cantidadTotal = cantidadTotal - cantidadDisponible
								} else {
									cantidadParcial = cantidadTotal;
									cantidadTotal = 0;
								}
								nuevoDetalleVenta.cantidad = cantidadParcial;
								if ($scope.usuario.empresa.usar_vencimientos) {
									nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[j].fecha_vencimiento;
									nuevoDetalleVenta.lote = detalleVenta.costos[j].lote;
								}
								nuevoDetalleVenta.costos = [];
								nuevoDetalleVenta.costos.push(detalleVenta.costos[j]);
								nuevoDetalleVenta.inventario = detalleVenta.costos[j];
								paraRectificacionDescuento.push(nuevoDetalleVenta);
							}
							j++;
						}

						for (var index = 0; index < paraRectificacionDescuento.length; index++) {
							var detalleCorregido = $scope.calcularImporte2(paraRectificacionDescuento[index]);
							// $scope.detalleVenta.push(detalleCorregido);
							$scope.reposicion.producto = detalleVenta.producto;
							$scope.reposicion.detalleVentaNuevo = detalleCorregido;
							$scope.reposicion.precio_venta = detalleCorregido.precio_unitario;
							$scope.calcularImporteReposicion();
							$scope.cerrarPopup($scope.idModalProductoReposicion);
						}

					} else {
						if (detalleVenta.costos.length > 0) {
							if ($scope.usuario.empresa.usar_vencimientos) {
								detalleVenta.fecha_vencimiento = detalleVenta.costos[0].fecha_vencimiento;
								detalleVenta.lote = detalleVenta.costos[0].lote;
								detalleVenta.inventario = detalleVenta.costos[0];
							}
						}
						// $scope.detalleVenta.push(detalleVenta);
						$scope.cerrarPopup($scope.idModalProductoReposicion);
						$scope.reposicion.precio_venta = detalleVenta.precio_unitario;
						$scope.reposicion.producto = detalleVenta.producto;
						$scope.reposicion.detalleVentaNuevo = detalleVenta;
						$scope.calcularImporteReposicion();
					}
				} else {
					// $scope.detalleVenta.push(detalleVenta);
					$scope.reposicion.producto = detalleVenta.producto;
					$scope.reposicion.detalleVentaNuevo = detalleVenta;
					$scope.reposicion.precio_venta = detalleVenta.precio_unitario;
					$scope.calcularImporteReposicion();
					$scope.cerrarPopup($scope.idModalProductoReposicion);
				}

			}

			$scope.comprobarExistente = function (producto) {
				return $scope.venta.detallesVenta.some(function (v) {
					return v.producto.id === producto.id
				})
			}

			$scope.calcularImporteReposicion = function () {
				$scope.reposicion.detalleVentaNuevo.precio_unitario = $scope.reposicion.precio_venta;
				$scope.reposicion.detalleVentaNuevo.importe = $scope.reposicion.detalleVentaNuevo.cantidad * $scope.reposicion.detalleVentaNuevo.precio_unitario;
				$scope.reposicion.detalleVentaNuevo.importe_dolares = $scope.reposicion.detalleVentaNuevo.cantidad * ($scope.reposicion.detalleVentaNuevo.precio_unitario_dolares ? $scope.reposicion.detalleVentaNuevo.precio_unitario_dolares : $scope.reposicion.detalleVentaNuevo.precio_unitario ? $scope.reposicion.detalleVentaNuevo.precio_unitario / ($scope.venta_dolar) : 0);
				$scope.reposicion.detalleVentaNuevo.descuento_dolares = $scope.reposicion.detalleVentaNuevo.descuento_dolares ? $scope.reposicion.detalleVentaNuevo.descuento_dolares : $scope.reposicion.detalleVentaNuevo.descuento ? $scope.reposicion.detalleVentaNuevo.descuento / ($scope.reposicion.detalleVentaNuevo.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				$scope.reposicion.detalleVentaNuevo.recargo_dolares = $scope.reposicion.detalleVentaNuevo.recargo_dolares ? $scope.reposicion.detalleVentaNuevo.recargo_dolares : $scope.reposicion.detalleVentaNuevo.recargo ? $scope.reposicion.detalleVentaNuevo.recargo / ($scope.reposicion.detalleVentaNuevo.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				$scope.reposicion.detalleVentaNuevo.ice_dolares = $scope.reposicion.detalleVentaNuevo.ice_dolares ? $scope.reposicion.detalleVentaNuevo.ice_dolares : $scope.reposicion.detalleVentaNuevo.ice ? $scope.reposicion.detalleVentaNuevo.ice / $scope.venta_dolar : 0
				$scope.reposicion.detalleVentaNuevo.excento_dolares = $scope.reposicion.detalleVentaNuevo.excento_dolares ? $scope.reposicion.detalleVentaNuevo.excento_dolares : $scope.reposicion.detalleVentaNuevo.excento ? $scope.reposicion.detalleVentaNuevo.excento / $scope.venta_dolar : 0
				var descuento_dolares, recargo_dolares;
				var descuento, recargo;
				if ($scope.reposicion.detalleVentaNuevo.tipo_descuento) {
					descuento_dolares = $scope.reposicion.detalleVentaNuevo.importe_dolares * (($scope.reposicion.detalleVentaNuevo.descuento_dolares ? $scope.reposicion.detalleVentaNuevo.descuento_dolares : $scope.reposicion.detalleVentaNuevo.descuento ? $scope.reposicion.detalleVentaNuevo.descuento : 0) / 100);
				} else {
					descuento_dolares = $scope.reposicion.detalleVentaNuevo.descuento_dolares ? $scope.reposicion.detalleVentaNuevo.descuento_dolares : $scope.reposicion.detalleVentaNuevo.descuento ? $scope.reposicion.detalleVentaNuevo.descuento / ($scope.venta_dolar) : 0;
				}
				if ($scope.reposicion.detalleVentaNuevo.tipo_recargo) {
					recargo_dolares = $scope.reposicion.detalleVentaNuevo.importe_dolares * (($scope.reposicion.detalleVentaNuevo.recargo_dolares ? $scope.reposicion.detalleVentaNuevo.recargo_dolares : $scope.reposicion.detalleVentaNuevo.recargo ? $scope.reposicion.detalleVentaNuevo.recargo : 0) / 100);
				} else {
					recargo_dolares = $scope.reposicion.detalleVentaNuevo.recargo_dolares ? $scope.reposicion.detalleVentaNuevo.recargo_dolares : $scope.reposicion.detalleVentaNuevo.recargo ? $scope.reposicion.detalleVentaNuevo.recargo / ($scope.venta_dolar) : 0;
				}
				$scope.reposicion.detalleVentaNuevo.total_descuento_dolares = descuento_dolares
				$scope.reposicion.detalleVentaNuevo.total_recargo_dolares = recargo_dolares

				$scope.reposicion.detalleVentaNuevo.total_dolares = $scope.reposicion.detalleVentaNuevo.importe_dolares - descuento_dolares + recargo_dolares - $scope.reposicion.detalleVentaNuevo.ice_dolares - $scope.reposicion.detalleVentaNuevo.excento_dolares;

				if ($scope.reposicion.detalleVentaNuevo.tipo_descuento) {
					descuento = $scope.reposicion.detalleVentaNuevo.importe * (($scope.reposicion.detalleVentaNuevo.descuento ? $scope.reposicion.detalleVentaNuevo.descuento : $scope.reposicion.detalleVentaNuevo.descuento_dolares ? $scope.reposicion.detalleVentaNuevo.descuento_dolares : 0) / 100);
				} else {
					descuento = ($scope.reposicion.detalleVentaNuevo.descuento ? $scope.reposicion.detalleVentaNuevo.descuento : $scope.reposicion.detalleVentaNuevo.descuento_dolares ? $scope.reposicion.detalleVentaNuevo.descuento_dolares : 0);
				}
				if ($scope.reposicion.detalleVentaNuevo.tipo_recargo) {
					recargo = $scope.reposicion.detalleVentaNuevo.importe * (($scope.reposicion.detalleVentaNuevo.recargo ? $scope.reposicion.detalleVentaNuevo.recargo : $scope.reposicion.detalleVentaNuevo.recargo_dolares ? $scope.reposicion.detalleVentaNuevo.recargo_dolares : 0) / 100);
				} else {
					recargo = $scope.reposicion.detalleVentaNuevo.recargo ? $scope.reposicion.detalleVentaNuevo.recargo : $scope.reposicion.detalleVentaNuevo.recargo_dolares ? $scope.reposicion.detalleVentaNuevo.recargo_dolares : 0;
				}
				$scope.reposicion.detalleVentaNuevo.total_descuento = descuento
				$scope.reposicion.detalleVentaNuevo.total_recargo = recargo

				$scope.reposicion.detalleVentaNuevo.total = $scope.reposicion.detalleVentaNuevo.importe - descuento + recargo - $scope.reposicion.detalleVentaNuevo.ice - $scope.reposicion.detalleVentaNuevo.excento;
				$scope.reposicion.monto_faltante = $scope.detalleVenta.total - $scope.reposicion.detalleVentaNuevo.total;
				$scope.$evalAsync()
			}

			$scope.guardarReposicionCambioItem = function (reposicion, detalleVenta) {
				reposicion.fecha = new Date($scope.convertirFecha(reposicion.fecha))
				reposicion.id_sucursal = $scope.venta.almacen.id_sucursal;
				reposicion.detalleVentaNuevo.venta = $scope.venta.id;
				reposicion.detalleVentaNuevo.id_movimiento = $scope.venta.movimiento.id;
				reposicion.detalleVentaNuevo.tipo_descuento = $scope.venta.tipo_descuento;
				reposicion.detalleVentaNuevo.tipo_recargo = $scope.venta.tipo_recargo;
				var tipoRepoItem = $scope.tiposReposicionItem.find(function (element) {
					return element.nombre_corto == "CAMBIO_ITEM";
				});

				reposicion.tipo_reposicion = tipoRepoItem;
				var promesa = CrearReposicionItem(detalleVenta.id, reposicion)
				promesa.then(function (datos) {
					$scope.reposicion = {};
					SweetAlert.swal("Guardado!", datos.mensaje, "success");
					datos.reposicionItem.tipoReposicion = tipoRepoItem;
					datos.reposicionItem.producto_venta = reposicion.detalleVentaNuevo;
					$scope.impresionReposicionItem($scope.venta, detalleVenta, datos.reposicionItem);
					$scope.obtenerDatosVenta($scope.venta.id);
					$scope.cerrarNuevaCambioItem();
				})
			}

			$scope.guardarReposicionEfectivoItem = function (reposicion, detalleVenta) {
				reposicion.fecha = new Date($scope.convertirFecha(reposicion.fecha))
				reposicion.id_sucursal = $scope.venta.almacen.id_sucursal;
				var tipoRepoItem = $scope.tiposReposicionItem.find(function (element) {
					return element.nombre_corto == "EFECTIVO";
				});

				reposicion.tipo_reposicion = tipoRepoItem;
				var promesa = CrearReposicionItem(detalleVenta.id, reposicion)
				promesa.then(function (datos) {
					$scope.reposicion = {};
					SweetAlert.swal("Guardado!", datos.mensaje, "success");
					datos.reposicionItem.tipoReposicion = tipoRepoItem;
					$scope.impresionReposicionItem($scope.venta, detalleVenta, datos.reposicionItem);
					$scope.obtenerDatosVenta($scope.venta.id);
					$scope.cerrarNuevaEfectivoItem();
				})
			}
			/* reposiciones desde consumo almacen */
			$scope.abrirDialogReposicionesPedido = function () {
				$scope.obtenerReposicionPedidosEmpresa()
				$scope.abrirReposicionAlmacen()
			}
			$scope.obtenerReposicionPedidosEmpresa = function (filtro) {
				$scope.paginatorReposicionesPedido = Paginator();
				$scope.paginatorReposicionesPedido.column = "id";
				$scope.paginatorReposicionesPedido.direction = "asc";
				if (filtro) {
					$scope.filtroPedidosCompra = filtro
				} else {
					$scope.filtroPedidosCompra = {
						id_empresa: $scope.usuario.id_empresa,
						id_sucursal: $scope.venta.sucursal.id,
						id_almacen: $scope.venta.almacenDestino.id
					}
				}
				$scope.paginatorReposicionesPedido.callBack = $scope.buscarReposicionesPedidosEmpresa;
				$scope.paginatorReposicionesPedido.getSearch("", $scope.filtroPedidosCompra, null);
			}
			$scope.buscarReposicionesPedidosEmpresa = function () {
				var promesa = ListaReposicionPedidosEmpresa($scope.paginatorReposicionesPedido)
				promesa.then(function (dato) {
					$scope.ordenesReposicion = dato.reposiciones
					$scope.paginatorReposicionesPedido.setPages(dato.paginas);
				})
			}
			$scope.abrirDialogDetalleReposicionPedido = async (reposicion) => {
				try {
					$scope.reposicionSeleccionada = reposicion
					const dato = await DetallesReposicionAlmacenEmpresa(reposicion.id, $scope.venta.almacen.id)
					$scope.detallesReposicion = dato.detallesReposicion
					$scope.cerrarReposicionAlmacen()
					$scope.abrirPopup($scope.idModalDetalleReposicionPedidos);
					setTimeout(function () {
						aplicarDatePickers();
					}, 500);
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.cerrarDialogDetalleReposicionPedido = () => {
				$scope.cerrarPopup($scope.idModalDetalleReposicionPedidos);
			}
			$scope.generarVentaTDesdeOrdenReposicion = async () => {
				try {
					$scope.venta.detallesVenta = []
					for (const detalle of $scope.detallesReposicion) {
						if (detalle.eliminado != true) {
							let detalleVenta = {
								eliminado: false,
								producto: detalle.producto, precio_unitario: detalle.producto.precio_unitario, precio_unitario_dolares: detalle.producto.precio_unitario_dolares,
								inventario_disponible: $scope.sumarInvTotal(detalle.producto.inventarios), costos: detalle.producto.activar_inventario ? detalle.producto.inventarios : [],
								cantidad: detalle.cantidad_corregida, descuento: detalle.producto.descuento ? detalle.producto.descuento : (detalle.producto.descuento_dolares ? detalle.producto.descuento_dolares * ($scope.venta_dolar) : 0), descuento_dolares: detalle.producto.descuento_dolares ? detalle.producto.descuento_dolares : detalle.producto.descuento ? detalle.producto.descuento / ($scope.venta_dolar) : 0, recargo_dolares: 0, ice_dolares: 0, excento_dolares: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (detalle.producto.descuento > 0 ? true : false), tipo_recargo: false
							};
							$scope.agregarDetalleVenta(detalleVenta)
						}
					}
					$scope.venta.id_orden_reposicion = $scope.reposicionSeleccionada.id
					$scope.cerrarDialogDetalleReposicionPedido();
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.abrirReposicionAlmacen = () => {
				$scope.abrirPopup($scope.idModalReposicionAlmacen);
			}

			$scope.cerrarReposicionAlmacen = () => {
				$scope.cerrarPopup($scope.idModalReposicionAlmacen);
			}
			$scope.sumarInvTotal = (invs) => {
				let total = invs.reduce((val, x) => {
					val += x.cantidad
					return val
				}, 0)
				return total
			}
			$scope.confirmarTraspasoOrdenReposicion = async (venta) => {
				try {
					let res = await ConfirmarTraspasoOrdenReposicion(venta)
					if (res.hasError) {
						if (res.detalles) {
							SweetAlert.swal("", res.detalles.join('\n\n'), "warning");
							$scope.venta = $scope.ventaBack;
						} else {
							SweetAlert.swal("", res.message, "warning");
						}

					} else {
						SweetAlert.swal("Guardado!", "Venta registrada exitosamente!", "success");
					}
				} catch (error) {
					console.log(error)
				}
			}
			/* fin reposicones desde consumo almacen */
			/* generarComprobante traspaso */
			$scope.selecionarVentaTraspaso = (bool) => {
				for (const item of $scope.ventas) {
					item.check = item.movimiento.clase.nombre_corto === $scope.diccionario.EGRE_TRASPASO && item.activa ? bool : false
				}
			}
			$scope.crearNuevoComprobanteTraspaso = (traspaso) => {
				let traspasos = []
				if (traspaso) {
					traspasos.push(traspaso)
				} else if ($scope.ventas) {
					for (const item of $scope.ventas) {
						if (item.check && !item.id_comprobante) {
							traspasos.push(item)
						} else {
							item.check = false
						}
					}
				}
				if (traspasos.length > 0) {
					$scope.crearNuevoComprobanteT('Traspasos', 'Registro de comprobantes de traspasos desde salidas.', traspasos)
				} else {
					$scope.mostrarMensaje("seleccionar algun traspaso para poder generar comprobante.")
				}
			}
			$scope.crearNuevoComprobanteT = (tipo, mensaje, datos) => {
				SweetAlert.swal({
					title: mensaje,
					icon: "info",
					showCloseButton: true,
					html: '<h5>Generar el comprobante puede tardar varios minutos. se esta recuperando y procesando la información para generar el comprobante.</h5>'
				})
				$scope.crearNuevoComprobante(tipo, datos)
			}
			/* fin generar comprobante traspaso */
			/* traspasos a campamentos */
			$scope.seleccionarFiltroTransacion = async () => {
				try {
					$scope.filtroVentaTransaccion = $scope.movimientosEgreso.find(x => {
						return x.id == $scope.filtroVenta.transaccion
					})
					$scope.almacenes = $scope.filtroVenta.sucursalDestino ? await $scope.obtenerAlmacenes($scope.filtroVenta.sucursalDestino) : []
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.descargarTraspasoCampamento = async () => {
				try {
					let traspasos = []
					if ($scope.ventas) {
						for (const item of $scope.ventas) {
							if (item.check && !item.campamento_sincronizado) {
								traspasos.push(item)
							} else {
								item.check = false
							}
						}
					}
					traspasos.length > 0 ? $scope.generarExcelTraspasosCampamento(traspasos, true) : $scope.mostrarMensaje('Seleccionar traspasos para continuar');
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.excelTraspasoConsumoHistorial = async (dato) => {
				try {
					let res = await ObtenerTraspasosSincronizados(dato.ids)
					$scope.generarExcelTraspasosCampamento(res.traspasos, false)
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.generarExcelTraspasosCampamento = async (traspasos, guardarFecha) => {
				try {
					blockUI.start();
					let cabecera = ['Numero venta', 'Sucursal Origen', 'Almacén origen', 'Almacén destino', 'Numero Almacén destino'
						, 'Fecha', 'Código	Producto', 'Vencimiento', 'Lote', 'P.U', 'Cantidad'];
					let data = [cabecera];

					for (const venta of traspasos) {
						let res = await DatosVenta(venta.id, $scope.usuario.id_empresa);
						let traspaso = res.venta;
						for (const detalle of traspaso.detallesVenta) {
							let columns = [];
							columns.push(traspaso.factura);
							columns.push(traspaso.almacen.sucursal.nombre);
							columns.push(traspaso.almacen.nombre);
							columns.push(traspaso.almacenTraspaso.nombre);
							columns.push(traspaso.almacenTraspaso.numero);
							columns.push(traspaso.fecha ? $scope.fechaATexto(new Date(traspaso.fecha)) : '');
							columns.push(detalle.producto.codigo);
							columns.push(detalle.fecha_vencimiento ? $scope.fechaATexto(new Date(detalle.fecha_vencimiento)) : '');
							columns.push(detalle.lote);
							columns.push(detalle.precio_unitario);
							columns.push(detalle.cantidad);
							data.push(columns);

						}
					}
					let ws_name = "SheetJS";
					let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "traspasos-campamento-" + traspasos[0].almacenTraspaso.sucursal.nombre + ".xlsx");
					if (guardarFecha) $scope.guardarFechaTraspasoCampamento(traspasos);
					blockUI.stop();
				} catch (error) {
					blockUI.stop();
					console.log(error)
				}
			}
			$scope.guardarFechaTraspasoCampamento = async (traspaso) => {
				try {
					let res = await GuardarFechaTraspasoCampamento(traspaso, false)
					SweetAlert.swal("Actualizado!", res.mensaje, "success");
					$scope.filtrarVentas($scope.sucursalesUsuario, $scope.fechaInicioTexto, $scope.fechaFinTexto, $scope.filtroVenta)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.CerrarFechaTraspasoCampamento = async (traspaso) => {
				try {
					let res = await GuardarFechaTraspasoCampamento(traspaso, true)
					SweetAlert.swal("Actualizado!", res.mensaje, "success");
					$scope.cerrarDialogHTraspasoCampamento();
					$scope.filtrarVentas($scope.sucursalesUsuario, $scope.fechaInicioTexto, $scope.fechaFinTexto, $scope.filtroVenta)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.abrirDialogHTraspasoCampamento = async () => {
				try {
					$scope.sucursalCamp = $scope.sucursales.find(x => x.id == $scope.filtroVenta.sucursalDestino)
					await $scope.obtenerTraspasosCampamento()

					$scope.abrirPopup($scope.idModalHTraspasoCampamento);
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.obtenerTraspasosCampamento = function (filtro) {
				$scope.paginatortraspasosSync = Paginator();
				$scope.paginatortraspasosSync.column = "id";
				$scope.paginatortraspasosSync.direction = "asc";

				$scope.filtroTraspasosCamp = filtro ? filtro : { sucursalDestino: $scope.filtroVenta.sucursalDestino, almacenDestino: '', fecha: '' }
				$scope.paginatortraspasosSync.callBack = $scope.filtrarTraspasosCampamento;
				$scope.paginatortraspasosSync.getSearch("", $scope.filtroTraspasosCamp, null);


			}
			$scope.filtrarTraspasosCampamento = async () => {
				try {
					let res = await ObtenerTraspasosCampamento($scope.paginatortraspasosSync)
					$scope.traspasosCampamento = res.traspasos
					$scope.paginatortraspasosSync.setPages(res.paginas);
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.cerrarDialogHTraspasoCampamento = () => {
				$scope.cerrarPopup($scope.idModalHTraspasoCampamento);
			}
			/* fin traspasos a campamentos */
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalWizardCompraEdicion);
				$scope.eliminarPopup($scope.idModalWizardVentaVista);
				$scope.eliminarPopup($scope.idModalEliminarCompra);
				$scope.eliminarPopup($scope.idModalPago);
				$scope.eliminarPopup($scope.idModalCierre);
				$scope.eliminarPopup($scope.idModalPanelVentas);
				$scope.eliminarPopup($scope.idModalPanelVentasExpress);
				$scope.eliminarPopup($scope.idModalInventario);
				$scope.eliminarPopup($scope.idModalPanelVentasCobro);
				$scope.eliminarPopup($scope.idModalEdicionVendedor);
				$scope.eliminarPopup($scope.idModalImpresionVencimiento);
				$scope.eliminarPopup($scope.IdModalVerificarCuenta);
				$scope.eliminarPopup($scope.modalReportesProductos);
				$scope.eliminarPopup($scope.modelGraficaProductos);
				$scope.eliminarPopup($scope.modalServicioVenta);
				$scope.eliminarPopup($scope.modelImportacionVentaServicio);
				$scope.eliminarPopup($scope.idModalCotizaciones);
				$scope.eliminarPopup($scope.idModalDetalleCotizaciones);
				$scope.eliminarPopup($scope.idModalDetalleCotizacionEditar);
				$scope.eliminarPopup($scope.ModalMensajePago);
				$scope.eliminarPopup($scope.ModalDestinatarioEmail);
				$scope.eliminarPopup($scope.idModalMeserosVenta)
				$scope.eliminarPopup($scope.idModalNuevoMesero)
				$scope.eliminarPopup($scope.idModalCerrarMesa)
				$scope.eliminarPopup($scope.ModalRepostePorUnidad);
				$scope.eliminarPopup($scope.ModalRepostePorMesero);
				$scope.eliminarPopup($scope.ModalRepostePorMesa);
				$scope.eliminarPopup($scope.modalPdfView)
				$scope.eliminarPopup($scope.modalEntregaDetalleVentaCliente);
				$scope.eliminarPopup($scope.modalReportesClientesPuntaje);
				$scope.eliminarPopup($scope.modelGraficaClientesPuntajes);
				$scope.eliminarPopup($scope.modalCambiosProductoBaseVenta);
				$scope.eliminarPopup($scope.modalMesasVentaExpress);
				$scope.eliminarPopup($scope.idModalVentaDevolucion);
				$scope.eliminarPopup($scope.idModalItemDevolucion);
				$scope.eliminarPopup($scope.idModalItemReposicion);
				$scope.eliminarPopup($scope.idModalItemCambio);
				$scope.eliminarPopup($scope.idModalItemEfectivo);
				$scope.eliminarPopup($scope.idModalProductoReposicion);
				$scope.eliminarPopup($scope.idModalReposicionAlmacen);
				$scope.eliminarPopup($scope.idModalDetalleReposicionPedidos);
				$scope.eliminarPopup($scope.idModalHTraspasoCampamento);
			});

			$scope.detalleInvalid = false
			$scope.calcularImporteDetalle = function (detalle) {
				if (!detalle.precio_unitario) {
					$scope.detalleInvalid = true;
				} else {
					$scope.detalleInvalid = false
				}
				detalle.importe = detalle.cantidad * detalle.precio_unitario;
				detalle.importe_dolares = detalle.cantidad * (detalle.precio_unitario_dolares ? detalle.precio_unitario_dolares : detalle.precio_unitario ? detalle.precio_unitario / ($scope.venta_dolar) : 0);
				detalle.descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / (detalle.tipo_descuento ? 1 : $scope.venta_dolar) : 0
				detalle.recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / (detalle.tipo_recargo ? 1 : $scope.venta_dolar) : 0
				detalle.ice_dolares = detalle.ice_dolares ? detalle.ice_dolares : detalle.ice ? detalle.ice / $scope.venta_dolar : 0
				detalle.excento_dolares = detalle.excento_dolares ? detalle.excento_dolares : detalle.excento ? detalle.excento / $scope.venta_dolar : 0
				var descuento_dolares, recargo_dolares;
				var descuento, recargo;
				if (detalle.tipo_descuento) {
					descuento_dolares = detalle.importe_dolares * ((detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento : 0) / 100);
				} else {
					descuento_dolares = detalle.descuento_dolares ? detalle.descuento_dolares : detalle.descuento ? detalle.descuento / ($scope.venta_dolar) : 0;
				}
				if (detalle.tipo_recargo) {
					recargo_dolares = detalle.importe_dolares * ((detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo : 0) / 100);
				} else {
					recargo_dolares = detalle.recargo_dolares ? detalle.recargo_dolares : detalle.recargo ? detalle.recargo / ($scope.venta_dolar) : 0;
				}
				detalle.total_descuento_dolares = descuento_dolares
				detalle.total_recargo_dolares = recargo_dolares
				detalle.total_dolares = detalle.importe_dolares - descuento_dolares + recargo_dolares - detalle.ice_dolares - detalle.excento_dolares;

				if (detalle.tipo_descuento) {
					descuento = detalle.importe * ((detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0) / 100);
				} else {
					descuento = (detalle.descuento ? detalle.descuento : detalle.descuento_dolares ? detalle.descuento_dolares : 0);
				}
				if (detalle.tipo_recargo) {
					recargo = detalle.importe * ((detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0) / 100);
				} else {
					recargo = detalle.recargo ? detalle.recargo : detalle.recargo_dolares ? detalle.recargo_dolares : 0;
				}
				detalle.total_descuento = descuento
				detalle.total_recargo = recargo
				detalle.total = detalle.importe - descuento + recargo - detalle.ice - detalle.excento;

				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				$scope.calcularSaldo();
				$scope.calcularCambio();

				$scope.$evalAsync()
			}

			$scope.eliminarDetalleSalida = function (detalleVenta) {
				if (detalleVenta.id) {
					detalleVenta.eliminado = true
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					//$scope.capturarInteraccion();
				} else {
					$scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);					
					$scope.sumarTotal();
					$scope.sumarTotalImporte();
					$scope.calcularSaldo();
					$scope.calcularCambio();
					
					//$scope.capturarInteraccion();
				}
			}








			$scope.inicio();
		}]);