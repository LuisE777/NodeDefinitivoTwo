angular.module('agil.controladores')

	.controller('ControladorCompras', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'DatosCompra', '$timeout',
		'Compra', 'Compras', 'Proveedores', 'ProveedoresNit', 'ListaProductosEmpresaUsuario', 'ClasesTipo', 'CompraDatos',
		'ConfiguracionCompraVistaDatos', 'ConfiguracionCompraVista', 'ConfiguracionCuentaEmpresa', 'ClasesTipoEmpresa', 'Tipos', 'SaveCompra', 'ListaCompraPedidosEmpresa', 'EliminarPedidoEmpresa', 'EliminarDetallePedidoEmpresa',
		'CompraDatosCredito', 'Paginator', 'GuardarImportacionComprasIngresoDiario', 'GuardarImportacionPagosCompras', 'AgregarProducto', 'ListaGruposProductoUsuario', 'VerificarCodigoProducto', '$q', 'BuscarCalifiacionesProveedores',
		'DetallesCalifiacionProveedor', 'GenerarImpresionCompra', 'SweetAlert', 'ObtenerConfiguracionIso', 'DetallesPedidosCompraEmpresa', 'obtenerReportePrecios', 'Diccionario', 'ObtenerConfiguracionIso',
		'GuardarConfiguracionEvalProv', 'BuscarConfigCalifiaciones', 'UltimoCorrelativoDetalleProduccion', 'RendicionesCompraDoc','ListaUnidadMedidaSin','ListaActividadesSin','ListaProductoServicioSin', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, DatosCompra, $timeout,
			Compra, Compras, Proveedores, ProveedoresNit, ListaProductosEmpresaUsuario, ClasesTipo, CompraDatos,
			ConfiguracionCompraVistaDatos, ConfiguracionCompraVista, ConfiguracionCuentaEmpresa, ClasesTipoEmpresa, Tipos, SaveCompra, ListaCompraPedidosEmpresa, EliminarPedidoEmpresa,
			EliminarDetallePedidoEmpresa, CompraDatosCredito, Paginator, GuardarImportacionComprasIngresoDiario, GuardarImportacionPagosCompras, AgregarProducto, ListaGruposProductoUsuario, VerificarCodigoProducto, $q, BuscarCalifiacionesProveedores,
			DetallesCalifiacionProveedor, GenerarImpresionCompra, SweetAlert, ObtenerConfiguracionIso, DetallesPedidosCompraEmpresa, obtenerReportePrecios, Diccionario, ObtenerConfiguracionIso,
			GuardarConfiguracionEvalProv, BuscarConfigCalifiaciones, UltimoCorrelativoDetalleProduccion, RendicionesCompraDoc,ListaUnidadMedidaSin,ListaActividadesSin,ListaProductoServicioSin) {
			blockUI.start();

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.diccionario = Diccionario;
			$scope.list == []
			$scope.itemsPerPageCompra = 10
			$scope.idModalPago = 'dialog-pago';
			$scope.idModalWizardCompraEdicion = 'modal-wizard-compra-edicion';
			$scope.idModalWizardCompraVista = 'modal-wizard-compra-vista';
			$scope.idModalEliminarCompra = 'dialog-eliminar-compra';
			$scope.idModalContenedorCompraEdicion = 'modal-wizard-container-compra-edicion';
			$scope.idModalContenedorCompraVista = 'modal-wizard-container-compra-vista';
			$scope.idInputCompletar = 'nit';
			$scope.idModalServicios = 'dialog-servicios';
			$scope.idModalPedidos = 'dialog-pedidos';
			$scope.idModalDetallePedidos = 'dialog-detalle-pedidos';
			$scope.idModalEliminarPedido = 'dialog-eliminar-pedido';
			$scope.idModalEliminarProductoPedido = 'dialog-eliminar-producto-pedido';
			$scope.ModalMensajePago = 'Modal-Mensaje-Pago';
			$scope.VentanaProductos = 'Modal-Ventana-Productos';
			$scope.idModalConceptoEdicion = 'dialog-conceptos';
			$scope.idModalDetalleEvaluacionProveedores = 'modal-detalle-evaluacion-proveedores';
			$scope.idModalGraficoEvaluacionProveedores = 'modal-grafico-evaluacion-proveedores'
			$scope.idModalConfigEvaluacionProveedores = 'modal-config-evaluacion-proveedores'
			$scope.url = restServer + '/proveedores/empresa/' + $scope.usuario.id_empresa + '/texto/';

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsCompra($scope.idModalWizardCompraEdicion, $scope.idModalWizardCompraVista,
					$scope.idModalEliminarCompra, $scope.idModalContenedorCompraEdicion,
					$scope.idModalContenedorCompraVista, $scope.idInputCompletar, $scope.url, $scope.idModalPago, $scope.idModalServicios, $scope.idModalPedidos, $scope.idModalDetallePedidos,
					$scope.idModalEliminarPedido, $scope.idModalEliminarProductoPedido, $scope.ModalMensajePago, $scope.VentanaProductos, $scope.idModalConceptoEdicion, $scope.idModalDetalleEvaluacionProveedores, $scope.idModalGraficoEvaluacionProveedores, $scope.idModalConfigEvaluacionProveedores);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				blockUI.stop();
			});


			$scope.inicio = function () {
				$scope.resaltado = true;
				$scope.esContado = true;
				// $scope.obtenerProveedores();
				$scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario)
				$scope.obtenerTiposDePago();
				$scope.obtenerConfiguracionCompraVista();
				$scope.obtenerCentrosDeCosto();
				$scope.sucursales = $scope.obtenerSucursales();
				$scope.obtenerCompras();

				$scope.busquedaProductoHabilidato = false;
				if ($scope.usuario.empresa.usar_funciones_erp) {

					$scope.obtenerconfiuracionCuentas()
				}
				$scope.obtenerMovimientosIngreso()
				$scope.detalleCompra = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				$scope.nuevoProducto;
				$scope.obtenerGruposProductosEmpresaUsuario();
				$scope.obtenerTipoProducto();
				blockUI.stop();
			}
			$scope.obtenerconfiuracionCuentas = async function () {
				/* var promesa = ConfiguracionCuentaEmpresa($scope.usuario.id_empresa);
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

			$scope.obtenerProveedores = function () {
				var promesa = Proveedores($scope.usuario.id_empresa);
				promesa.then(function (proveedores) {
					for (var i = 0; i < proveedores.length; i++) {
						proveedores[i].nit = proveedores[i].nit.toString();
					}
					$scope.proveedores = proveedores;
				});
			}
			$scope.modificarCompra = function (compra) {
				$scope.datosCompraEdicion=compra
				SweetAlert.swal({
					title: 'Obteniendo datos de la Compra...',
					icon: 'info',
					iconHtml: '<i class="fa fa-search size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var promesa = CompraDatos(compra.id);
				promesa.then(function (compraConsultada) {
					if (compraConsultada.observacion) {
						compraConsultada.usarObservacion = true
					}
					$scope.compra = compraConsultada;
					$scope.compra.fecha = new Date($scope.compra.fecha);
					$scope.compra.fechaTexto = $scope.compra.fecha.getDate() + "/" + ($scope.compra.fecha.getMonth() + 1) + "/" + $scope.compra.fecha.getFullYear();
					if ($scope.compra.sucursal == undefined) {
						$scope.compra.sucursal = compraConsultada.almacen.sucursal;
					}
					if ($scope.compra.almacen == undefined) {
						$scope.compra.almacen = compraConsultada.almacen;
					}
					if ($scope.compra.movimiento == undefined) {
						$scope.compra.movimiento = { clase: {} }
						$scope.compra.movimiento.clase = $scope.compra.tipoMovimiento
					}
					if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
						$scope.configuracionCompraVista.mostrar_it_retencion = true
						$scope.configuracionCompraVista.mostrar_iue = true
						$scope.configuracionCompraVista.mostrar_pagado = true
					} else {
						$scope.configuracionCompraVista.mostrar_it_retencion = false
						$scope.configuracionCompraVista.mostrar_iue = false
						$scope.configuracionCompraVista.mostrar_pagado = false
					}
					$scope.obtenerAlmacenes($scope.compra.sucursal.id);
					$scope.cambiarTipoPago($scope.compra.tipoPago);
					$scope.sumarTotalImporte()
					if ($scope.usuario.empresa.usar_vencimientos) {
						if ($scope.compra.usar_producto) {
							$scope.aplicarFechaTextoDetalleCompra($scope.compra);
						}
					}
					if ($scope.usuario.empresa.usar_calificaciones_proveedor) {
						if ($scope.compra.detalleCalifiacionProveedor.length > 0) {
							$scope.obtenerCalifiacinesProveedor(false)
						} else {
							$scope.obtenerCalifiacinesProveedor(true)
						}
					}
					if(compraConsultada.doc_rendicion){
						$scope.buscarRendiciones(compraConsultada.doc_rendicion)
					}
					SweetAlert.swal({
						title: 'Finalizado!',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false
					})
					$scope.abrirPopup($scope.idModalWizardCompraEdicion);
				});
			}
			$scope.modificarCompraDesdePedido = function (compra, detallePedido) {
				var promesa = CompraDatos(compra.id);
				promesa.then(function (compraConsultada) {
					if (compraConsultada.observacion != "") {
						compraConsultada.usarObservacion = true
					}
					$scope.compra = compraConsultada;
					$scope.compra.fecha = new Date($scope.compra.fecha);
					$scope.compra.fechaTexto = $scope.compra.fecha.getDate() + "/" + ($scope.compra.fecha.getMonth() + 1) + "/" + $scope.compra.fecha.getFullYear();
					if ($scope.compra.sucursal == undefined) {
						$scope.compra.sucursal = compraConsultada.almacen.sucursal;
					}
					if ($scope.compra.movimiento == undefined) {
						$scope.compra.movimiento = { clase: {} }
						$scope.compra.movimiento.clase = $scope.compra.tipoMovimiento
					}
					if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES || $scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
						$scope.configuracionCompraVista.mostrar_it_retencion = true
						$scope.configuracionCompraVista.mostrar_iue = true
						$scope.configuracionCompraVista.mostrar_pagado = true
					} else {
						$scope.configuracionCompraVista.mostrar_it_retencion = false
						$scope.configuracionCompraVista.mostrar_iue = false
						$scope.configuracionCompraVista.mostrar_pagado = false
					}
					$scope.obtenerAlmacenes($scope.compra.sucursal.id);
					$scope.cambiarTipoPago($scope.compra.tipoPago);
					if ($scope.usuario.empresa.usar_vencimientos) {
						if ($scope.compra.usar_producto) {
							$scope.aplicarFechaTextoDetalleCompra($scope.compra);
						}
					}
					$scope.compra.generado_por_pedido = true
					$scope.compra.generado_por_pedido_servicio = $scope.filtroPedidosCompra.tipo == '1' ? false : true
					$scope.compra.pedido = $scope.pedido
					detallePedido.forEach(function (detalle) {
						if (detalle.eliminado != true && detalle.pendiente != true) {
							detalle.detalleCompra.observacion = detalle.observacion || '';
							$scope.verificarProducto(detalle.detalleCompra)
						}
					})
					//$scope.abrirPopup($scope.idModalWizardCompraEdicion);
				});
			}

			$scope.aplicarFechaTextoDetalleCompra = function (compra) {
				for (var i = 0; i < compra.detallesCompra.length; i++) {
					if (compra.detallesCompra[i].centroCosto.nombre_corto == "ALM") {
						if (compra.detallesCompra[i].inventario?.fecha_vencimiento) {
							compra.detallesCompra[i].inventario.fecha_vencimiento = compra.detallesCompra[i].inventario.fecha_vencimiento?new Date(compra.detallesCompra[i].inventario.fecha_vencimiento):null;
							compra.detallesCompra[i].inventario.fechaVencimientoTexto = compra.detallesCompra[i].inventario.fecha_vencimiento?compra.detallesCompra[i].inventario.fecha_vencimiento.getDate() + "/" + ("0" + (compra.detallesCompra[i].inventario.fecha_vencimiento.getMonth() + 1)).slice(-2) + "/" + compra.detallesCompra[i].inventario.fecha_vencimiento.getFullYear():null;
						}
					}

				}
			}

			$scope.buscarProveedor = function (query, nit) {
				if (query != "" && query != undefined) {
					var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
					promesa.then(function (proveedores) {
						if (nit) {
							$scope.ListaProveedoresRZ = [];
							$scope.ListaProveedoresNIT = proveedores;
						} else {
							$scope.ListaProveedoresRZ = proveedores;
							$scope.ListaProveedoresNIT = [];
						}
					})
					return promesa;
				}
			};

			$scope.buscarRendiciones = function (query) {
				$scope.bloquearGuardado = false
				if (query != "" && query != undefined) {
					blockUI.start()
					let promesa = RendicionesCompraDoc($scope.compra.sucursal.id, query);					
					let p = promesa.then(function (rendiciones) {
						$scope.compraRendic = 0
						$scope.compra.existee = ''
						if (rendiciones.length == 1) {
							$scope.compraRendic = rendiciones[0].id
							$scope.compra.existee = "Rendición asigno correctamente. "+ rendiciones[0].solicitud.solicitante.persona.nombre_completo+" del "+ (rendiciones[0].solicitud.fecha).split('T')[0]
							$scope.bloquearGuardado = false
						} else {
							$scope.compra.existee = 'NO se asigno la rendición.'
							toastr.warning(" NO se asigno la rendición.")
							$scope.bloquearGuardado = true
						}
					}, function (err) {
						SweetAlert.swal("", err.message, "warning");
						blockUI.stop()
					})

					blockUI.stop()
					return p;
				}else{
					$scope.compra.existee = ''
					$scope.bloquearGuardado = false
				}
			};
			
			$scope.validarRazonSocial = function (proveedor) {
				if (proveedor.razon_social && $scope.ListaProveedoresRZ.length > 0) {
					// proveedor.razon_social = "";
					return true
				} else {
					return false
				}
			}

			$scope.validarNIT = function (proveedor) {
				if (proveedor.nit && $scope.ListaProveedoresNIT.length > 0) {
					// proveedor.nit = "";
					return true
				} else {
					return false
				}
			}

			$scope.establecerProveedor = function (proveedor) {
				$scope.compra.proveedor = proveedor;
				$scope.ocultarMensajesValidacion()
			}

			$scope.buscarProducto = function (query) {
				blockUI.start()
				if (query != "" && query != undefined && $scope.busquedaProductoHabilidato) {
					var defered = $q.defer();
					var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, $scope.compra.almacen.id);
					promesa.then(function (datos) {
						if (datos.length != 0) {
							var valoresFiltro = datos.filter(function (val) {
								return (val.tipoProducto.nombre_corto === 'PBASE' && val.activar_inventario === true);
							});
							// return promesa
							defered.resolve(valoresFiltro);

						} else {
							//$scope.mostrarMensaje("No existen coincidencias en la búsqueda");
							$scope.abrirVentanaAnadirProducto();
						}
					}).catch(function (err) {
						$scope.mostrarMensaje(err.stack);
					})
					blockUI.stop()


					return defered.promise;


				} else {
					blockUI.stop()
				}
			};

			$scope.verificarProducto = function (detalleCompra) {
				if (detalleCompra.cantidad_parcial) {
					detalleCompra.cantidad = detalleCompra.cantidad_parcial
				}
				if (detalleCompra.centroCosto.nombre.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
					if (detalleCompra.producto.id) {
						if ($scope.compra.movimiento.clase != undefined) {
							if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
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

					} else {
						SweetAlert.swal("", "El producto no se encuentra en el catalogo", "warning");
					}
				} else {
					if ($scope.compra.movimiento.clase != undefined) {
						if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
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
			}
			$scope.verificarServicio = function (detalleCompra) {

				if (detalleCompra.servicio.id) {
					if ($scope.compra.movimiento.clase != undefined) {
						if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
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

				} else {
					SweetAlert.swal("", "El producto no se encuentra en el catalogo", "warning");
				}


			}
			$scope.agregarDetalleCompra = function (detalleCompra) {
				if (detalleCompra.producto.nombre.id) {
					detalleCompra.producto = detalleCompra.producto.nombre;
				}
				if (detalleCompra.centroCosto.nombre.id) {
					detalleCompra.centroCosto = detalleCompra.centroCosto.nombre;
				} else {
					if (detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
						var centroCostoAlmacen = $.grep($scope.centrosCosto, function (e) { return e.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN; })[0];
						detalleCompra.centroCosto = centroCostoAlmacen;
					}
				}
				if (detalleCompra.fechaVencimientoTexto) {
					detalleCompra.fecha_vencimiento = new Date($scope.convertirFecha(detalleCompra.fechaVencimientoTexto));
				}

				$scope.compra.detallesCompra.push(detalleCompra);
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				if ($scope.compra.descuento_general) {
					$scope.calcularImporteGeneral();
				}
				if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
					$scope.calcularSaldo();
				} else {
					$scope.compra.a_cuenta = null
					$scope.compra.saldo = null
					$scope.compra.dias_credito = null
					$scope.calcularSaldo();
				}
				$scope.detalleCompra = {
					producto: {},
					centroCosto: {},
					fechaVencimientoTexto: $scope.compra.fecha_vencimiento ? $scope.compra.fecha_vencimiento : null,
					cantidad: 1,
					descuento: 0,
					recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false
				}
				$scope.enfocar('centro_costo');
				$scope.verificarMomivmientoCC(true)
			}

			$scope.establecerLote = function name(lote) {
				$scope.detalleCompra.lote = lote
				$scope.agregarDetalleCompraMasiva($scope.detalleCompra)
				return [lote]
			}
			$scope.agregarDetalleCompraMasiva = function (detalleCompra) {
				if ($scope.usuario.empresa.ver_costos_dolares) {
					if (detalleCompra.centroCosto.nombre){
						if (detalleCompra && detalleCompra.costo_unitario_dolares && detalleCompra.cantidad) {
							if (detalleCompra.producto.nombre.id) {
								detalleCompra.producto = detalleCompra.producto.nombre;
							}
							if (detalleCompra.centroCosto.nombre.id) {
								detalleCompra.centroCosto = detalleCompra.centroCosto.nombre;
							} else {
								if (detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
									var centroCostoAlmacen = $.grep($scope.centrosCosto, function (e) { return e.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN; })[0];
									detalleCompra.centroCosto = centroCostoAlmacen;
								}
							}
							if (detalleCompra.fechaVencimientoTexto) {
								detalleCompra.fecha_vencimiento = new Date($scope.convertirFecha(detalleCompra.fechaVencimientoTexto));
							}
							$scope.sumarTotal();
							$scope.sumarTotalImporte();
							// var noKeyDuplicado = Object.assign({ detalleCompra })
							var noKeyDuplicado = { producto: detalleCompra.producto, centroCosto: detalleCompra.centroCosto, cantidad: detalleCompra.cantidad, costo_unitario_dolares: detalleCompra.costo_unitario_dolares, importe_dolares: detalleCompra.importe_dolares, precio_unitario_dolares: detalleCompra.precio_unitario_dolares, importe: detalleCompra.importe, total_dolares: detalleCompra.total_dolares, descuento: detalleCompra.descuento, recargo: detalleCompra.recargo, ice: detalleCompra.ice, excento: 0, total: detalleCompra.total, tipo_descuento: detalleCompra.tipo_descuento, tipo_recargo: detalleCompra.tipo_recargo, lote: detalleCompra.lote }
							if (!$scope.compra.detallesCompra.some(function (detalle) {
								return detalle.lote == detalleCompra.lote
							})) {
								$scope.compra.detallesCompra.push(noKeyDuplicado);
							}
							// $scope.compra.detallesCompra.push(noKeyDuplicado);
							// $scope.sumarTotal();
							// $scope.sumarTotalImporte();
							$scope.sumarTotal();
							$scope.sumarTotalImporte();
							if ($scope.compra.descuento_general) {
								$scope.calcularImporteGeneral();
							}
							if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
								$scope.calcularSaldo();
							} else {
								$scope.compra.a_cuenta = null
								$scope.compra.saldo = null
								$scope.compra.dias_credito = null
							}
							// $scope.enfocar('lote_masivo');
						} else {
							$scope.mostrarMensaje('Faltan datos de costo unitario o cantidad.')
	
						}
					}else{
						SweetAlert.swal("", 'Seleccione un Centro de Costo', 'warning')
					}
					
				} else {
					if (detalleCompra.centroCosto.nombre){
						if (detalleCompra && detalleCompra.costo_unitario && detalleCompra.cantidad) {
							if (detalleCompra.producto.nombre.id) {
								detalleCompra.producto = detalleCompra.producto.nombre;
							}
							if (detalleCompra.centroCosto.nombre.id) {
								detalleCompra.centroCosto = detalleCompra.centroCosto.nombre;
							} else {
								if (detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
									var centroCostoAlmacen = $.grep($scope.centrosCosto, function (e) { return e.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN; })[0];
									detalleCompra.centroCosto = centroCostoAlmacen;
								}
							}
							if (detalleCompra.fechaVencimientoTexto) {
								detalleCompra.fecha_vencimiento = new Date($scope.convertirFecha(detalleCompra.fechaVencimientoTexto));
							}
							// var noKeyDuplicado = Object.assign({ detalleCompra })
							var noKeyDuplicado = { producto: detalleCompra.producto, centroCosto: detalleCompra.centroCosto, cantidad: detalleCompra.cantidad, costo_unitario: detalleCompra.costo_unitario, importe: detalleCompra.importe, descuento: detalleCompra.descuento, recargo: detalleCompra.recargo, ice: detalleCompra.ice, excento: 0, total: detalleCompra.total, tipo_descuento: detalleCompra.tipo_descuento, tipo_recargo: detalleCompra.tipo_recargo, lote: detalleCompra.lote }
							if (!$scope.compra.detallesCompra.some(function (detalle) {
								return detalle.lote == detalleCompra.lote
							})) {
								$scope.compra.detallesCompra.push(noKeyDuplicado);
							}
							// $scope.compra.detallesCompra.push(noKeyDuplicado);
							$scope.sumarTotal();
							$scope.sumarTotalImporte();
							if ($scope.compra.descuento_general) {
								$scope.calcularImporteGeneral();
							}
							if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
								$scope.calcularSaldo();
							} else {
								$scope.compra.a_cuenta = null
								$scope.compra.saldo = null
								$scope.compra.dias_credito = null
							}
							// $scope.enfocar('lote_masivo');
						} else {
							$scope.mostrarMensaje('Faltan datos de costo unitario o cantidad.')
	
						}
					}else{
						SweetAlert.swal("", 'Seleccione un Centro de Costo', 'warning')
					}
					
				}

				$timeout(function () {
					$scope.enfocar('lote_masivo');
				}, 200)

				// $scope.detalleCompra = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }

			}
			$scope.agregarDetalleCompraServicio = function (detalleCompra) {

				$scope.compra.detallesCompra.push(detalleCompra);
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				if ($scope.compra.descuento_general) {
					$scope.calcularImporteGeneral();
				}
				if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
					$scope.calcularSaldo();
				} else {
					$scope.compra.a_cuenta = null
					$scope.compra.saldo = null
					$scope.compra.dias_credito = null
				}
				$scope.detalleCompra = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				$scope.enfocar('centro_costo');
			}
			$scope.eliminarDetalleCompra = function (detalleCompra) {
				if ($scope.compra.id) {
					detalleCompra.eliminado = true;
				} else {
					$scope.compra.detallesCompra.splice($scope.compra.detallesCompra.indexOf(detalleCompra), 1);
				}
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				if ($scope.compra.descuento_general) {
					$scope.calcularImporteGeneral();
				}
				if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO) {
					$scope.calcularSaldo();
				} else {
					$scope.compra.a_cuenta = null
					$scope.compra.saldo = null
					$scope.compra.dias_credito = null
				}
			}

			$scope.cambiarTipoPago = function (tipoPago) {
				var tipoPago = $.grep($scope.tiposPago, function (e) { return e.id == tipoPago.id; })[0];
				$scope.esContado = tipoPago.nombre_corto == 'CONT' ? true : false;
				$scope.compra.id_tipo_pago = tipoPago.id;
				if (!$scope.esContado) {
					$scope.calcularSaldo();
				} else {
					$scope.compra.a_cuenta = null
					$scope.compra.saldo = null
					$scope.compra.dias_credito = null
				}

			}

			$scope.recalcular = function () {
				$scope.calcularImporteGeneral();
				$scope.calcularImporte();
			}

			$scope.calcularImporteGeneral = function () {
				var descuento, recargo;
				if ($scope.usuario.empresa.ver_costos_dolares) {
					if ($scope.compra.tipo_descuento) {
						descuento = $scope.compra.importe_dolares * ($scope.compra.descuento / 100);
					} else {
						descuento = $scope.compra.descuento;
					}
					if ($scope.compra.tipo_recargo) {
						recargo = $scope.compra.importe_dolares * ($scope.compra.recargo / 100);
					} else {
						recargo = $scope.compra.recargo;
					}
					$scope.compra.total_dolares = Math.round(($scope.compra.importe - descuento + recargo - $scope.compra.ice - $scope.compra.excento) * 1000) / 1000;
				} else {
					if ($scope.compra.tipo_descuento) {
						descuento = $scope.compra.importe * ($scope.compra.descuento / 100);
					} else {
						descuento = $scope.compra.descuento;
					}
					if ($scope.compra.tipo_recargo) {
						recargo = $scope.compra.importe * ($scope.compra.recargo / 100);
					} else {
						recargo = $scope.compra.recargo;
					}
					$scope.compra.total = Math.round(($scope.compra.importe - descuento + recargo - $scope.compra.ice - $scope.compra.excento) * 1000) / 1000;
				}

			}
			$scope.cambiarEstadoDetallePedido = function (detalle) {
				if (detalle.estadoProducto == "Pendiente") {
					detalle.estadoProducto = "Completado"
					detalle.entregado = true
				} else {
					detalle.estadoProducto = "Pendiente"
					detalle.entregado = false
				}
			}
			$scope.calcularImportePedido = function (detalleCompra, obtenerCostoUnitario) {
				detalleCompra.estadoProducto = "";
				if (detalleCompra.cantidad_parcial < detalleCompra.cantidad) {
					detalleCompra.estadoProducto = "Pendiente"
					detalleCompra.entregado = false
				}
				if (obtenerCostoUnitario) {
					detalleCompra.costo_unitario = Math.round((detalleCompra.importe / detalleCompra.cantidad_parcial) * 10000) / 10000;
				} else {
					detalleCompra.importe = Math.round((detalleCompra.cantidad_parcial * detalleCompra.costo_unitario) * 1000) / 1000;
				}
				var descuento, recargo;
				if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
					if ($scope.compra.tipo_retencion) {
						if (detalleCompra.centroCosto.nombre.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
							detalleCompra.total = detalleCompra.importe
							detalleCompra.importe = (detalleCompra.total * ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje))) + detalleCompra.total
							detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
							detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
						} else {
							detalleCompra.total = detalleCompra.importe
							detalleCompra.importe = (detalleCompra.total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + detalleCompra.total
							detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
							detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
							//detalleCompra.total =(detalleCompra.importe *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100
						}
					} else {
						if (detalleCompra.centroCosto.nombre.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
							detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
							detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
							detalleCompra.total = (detalleCompra.importe * $scope.plantilla.retencionBienes.almacen.porcentaje) / 100
						} else {
							detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
							detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
							detalleCompra.total = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
						}

					}
					detalleCompra.importe = Math.round(detalleCompra.importe * 1000) / 1000
					/* detalleCompra.total = detalleCompra.importe */
				} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
					detalleCompra.total = detalleCompra.importe
				} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
					if ($scope.compra.tipo_retencion) {

						detalleCompra.total = detalleCompra.importe
						detalleCompra.importe = (detalleCompra.total * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + detalleCompra.total
						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

					} else {

						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionServicios.it.porcentaje) / 100
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
						detalleCompra.total = (detalleCompra.importe * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


					}
				} else {
					if (!$scope.compra.descuento_general) {
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
					} else {
						if ($scope.compra.tipo_descuento) {
							descuento = detalleCompra.importe * ($scope.compra.descuento / 100);
						} else {
							descuento = $scope.compra.descuento;
						}
						if ($scope.compra.tipo_recargo) {
							recargo = detalleCompra.importe * ($scope.compra.recargo / 100);
						} else {
							recargo = $scope.compra.recargo;
						}

						detalleCompra.total = detalleCompra.importe - descuento + recargo - $scope.compra.ice - $scope.compra.excento;
					}
				}
				if ($scope.pedido && $scope.pedido.detallesPedido && $scope.pedido.detallesPedido.length > 0) $scope.calcularTotalPedido($scope.pedido.detallesPedido)
			}
			$scope.calcularImporte = function () {
				var descuento = 0, recargo = 0, ice = 0, excento = 0, impTotal = 0;
				if ($scope.usuario.empresa.ver_costos_dolares) {
					$scope.detalleCompra.importe_dolares = Math.round(($scope.detalleCompra.cantidad * $scope.detalleCompra.costo_unitario_dolares) * 1000) / 1000;
					if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
						if ($scope.compra.tipo_retencion) {
							if ($scope.detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
								$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares
								$scope.detalleCompra.importe_dolares = ($scope.detalleCompra.total_dolares * ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje))) + $scope.detalleCompra.total_dolares
								$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienes.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
							} else {
								$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares
								$scope.detalleCompra.importe_dolares = ($scope.detalleCompra.total_dolares * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + $scope.detalleCompra.total_dolares
								$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
								//$scope.detalleCompra.total_dolares =($scope.detalleCompra.importe_dolares *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100
							}
						} else {
							if ($scope.detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
								$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienes.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
								$scope.detalleCompra.total_dolares = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienes.almacen.porcentaje) / 100
							} else {
								$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
								$scope.detalleCompra.total_dolares = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
							}

						}
						/* $scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares */
					} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
						$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares
					} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
						if ($scope.compra.tipo_retencion) {

							$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares
							$scope.detalleCompra.importe_dolares = ($scope.detalleCompra.total_dolares * ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje) / (100 - ($scope.plantilla.retencionServicios.it.porcentaje + $scope.plantilla.retencionServicios.iue.porcentaje))) + $scope.detalleCompra.total_dolares
							$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionServicios.it.porcentaje) / 100
							$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionServicios.iue.porcentaje) / 100

						} else {

							$scope.detalleCompra.it = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionServicios.it.porcentaje) / 100
							$scope.detalleCompra.iue = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionServicios.iue.porcentaje) / 100
							$scope.detalleCompra.total_dolares = ($scope.detalleCompra.importe_dolares * $scope.plantilla.retencionServicios.servicio.porcentaje) / 100


						}
					} else {
						if (!$scope.compra.descuento_general) {
							if ($scope.detalleCompra.tipo_descuento) {
								descuento = $scope.detalleCompra.importe_dolares * ($scope.detalleCompra.descuento / 100);
							} else {
								descuento = $scope.detalleCompra.descuento;
							}
							if ($scope.detalleCompra.tipo_recargo) {
								recargo = $scope.detalleCompra.importe_dolares * ($scope.detalleCompra.recargo / 100);
							} else {
								recargo = $scope.detalleCompra.recargo;
							}
							ice = $scope.detalleCompra.ice;
							excento = $scope.detalleCompra.excento;
							$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares - descuento + recargo - ice - excento;
						} else {

							if ($scope.compra.tipo_descuento) {
								descuento = $scope.detalleCompra.importe_dolares * ($scope.compra.descuento / 100);
							} else {
								ice = $scope.compra.ice;
								excento = $scope.compra.excento;
								if ($scope.compra.detallesCompra.length == 0) {
									descuento = $scope.compra.descuento;
									$scope.cambioDescuento = descuento;
									$scope.impTotal = 0;
								} else {
									$scope.impTotal = $scope.compra.importe_dolares + $scope.detalleCompra.importe_dolares;
									descuento = ($scope.detalleCompra.importe_dolares / $scope.impTotal) * $scope.compra.descuento;
									recargo = ($scope.detalleCompra.importe_dolares / $scope.impTotal) * $scope.compra.recargo;
									ice = ($scope.detalleCompra.importe_dolares / $scope.impTotal) * $scope.compra.ice;
									excento = ($scope.detalleCompra.importe_dolares / $scope.impTotal) * $scope.compra.excento;
									$scope.cambioDescuento = descuento;

									if ($scope.compra.tipo_recargo) {
										recargo = $scope.detalleCompra.importe_dolares * ($scope.compra.recargo / 100);
									} else {
										recargo = $scope.compra.recargo;
									}
									$scope.compra.detallesCompra.forEach(function (dato) {
										dato.descuento = (dato.importe_dolares / $scope.impTotal) * $scope.compra.descuento;
										dato.recargo = (dato.importe_dolares / $scope.impTotal) * $scope.compra.recargo;
										dato.ice = (dato.importe_dolares / $scope.impTotal) * $scope.compra.ice;
										dato.excento = (dato.importe_dolares / $scope.impTotal) * $scope.compra.excento;
										dato.total_dolares = dato.importe_dolares - dato.descuento + recargo - ice - excento;
										$scope.cambioDescuento = dato.descuento;
									})

								}

							}
							if ($scope.compra.tipo_recargo) {
								recargo = $scope.detalleCompra.importe_dolares * ($scope.compra.recargo / 100);
							} else {
								recargo = $scope.compra.recargo;
							}
							$scope.detalleCompra.descuento = descuento;
							$scope.detalleCompra.recargo = recargo;
							$scope.detalleCompra.ice = ice;
							$scope.detalleCompra.excento = excento;
							$scope.detalleCompra.total_dolares = $scope.detalleCompra.importe_dolares - descuento + recargo - ice - excento;
						}
					}
				} else {
					$scope.detalleCompra.importe = Math.round(($scope.detalleCompra.cantidad * $scope.detalleCompra.costo_unitario) * 1000) / 1000;
					if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES) {
						if ($scope.compra.tipo_retencion) {
							if ($scope.detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
								$scope.detalleCompra.total = $scope.detalleCompra.importe
								$scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienes.it.porcentaje + $scope.plantilla.retencionBienes.iue.porcentaje))) + $scope.detalleCompra.total
								$scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
							} else {
								$scope.detalleCompra.total = $scope.detalleCompra.importe
								$scope.detalleCompra.importe = ($scope.detalleCompra.total * ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje) / (100 - ($scope.plantilla.retencionBienesGasto.it.porcentaje + $scope.plantilla.retencionBienesGasto.iue.porcentaje))) + $scope.detalleCompra.total
								$scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
								//$scope.detalleCompra.total =($scope.detalleCompra.importe *$scope.plantilla.retencionBienesGasto.gasto.porcentaje)/100
							}
						} else {
							if ($scope.detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
								$scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
								$scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienes.almacen.porcentaje) / 100
							} else {
								$scope.detalleCompra.it = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
								$scope.detalleCompra.iue = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
								$scope.detalleCompra.total = ($scope.detalleCompra.importe * $scope.plantilla.retencionBienesGasto.gasto.porcentaje) / 100
							}

						}
						/* $scope.detalleCompra.total = $scope.detalleCompra.importe */
					} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
						$scope.detalleCompra.total = $scope.detalleCompra.importe
					} else if ($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS) {
						if ($scope.compra.tipo_retencion) {

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
						if (!$scope.compra.descuento_general) {
							if ($scope.detalleCompra.tipo_descuento) {
								descuento = $scope.detalleCompra.importe * ($scope.detalleCompra.descuento / 100);
							} else {
								descuento = $scope.detalleCompra.descuento;
							}
							if ($scope.detalleCompra.tipo_recargo) {
								recargo = $scope.detalleCompra.importe * (recargo / 100);
							} else {
								recargo = $scope.detalleCompra.recargo;
							}
							ice = $scope.detalleCompra.ice;
							excento = $scope.detalleCompra.excento;
							$scope.detalleCompra.total = $scope.detalleCompra.importe - descuento + recargo - ice - excento;
						} else {


							if ($scope.compra.tipo_descuento) {
								descuento = $scope.detalleCompra.importe * ($scope.compra.descuento / 100);
							} else {
								if ($scope.compra.detallesCompra.length == 0) {
									descuento = $scope.compra.descuento;
									recargo = $scope.compra.recargo;
									ice = $scope.compra.ice;
									excento = $scope.compra.excento;
									$scope.cambioDescuento = descuento;
									$scope.impTotal = 0;
								} else {
									$scope.impTotal = $scope.compra.importe + $scope.detalleCompra.importe;
									descuento = ($scope.detalleCompra.importe / $scope.impTotal) * $scope.compra.descuento;
									recargo = ($scope.detalleCompra.importe / $scope.impTotal) * $scope.compra.recargo;
									ice = ($scope.detalleCompra.importe / $scope.impTotal) * $scope.compra.ice;
									excento = ($scope.detalleCompra.importe / $scope.impTotal) * $scope.compra.excento;
									$scope.cambioDescuento = descuento;

									if ($scope.compra.tipo_recargo) {
										recargo = $scope.detalleCompra.importe * (recargo / 100);
									}
									$scope.compra.detallesCompra.forEach(function (dato) {
										dato.descuento = (dato.importe / $scope.impTotal) * $scope.compra.descuento;
										dato.recargo = (dato.importe / $scope.impTotal) * $scope.compra.recargo;
										dato.ice = (dato.importe / $scope.impTotal) * $scope.compra.ice;
										dato.excento = (dato.importe / $scope.impTotal) * $scope.compra.excento;
										dato.total = dato.importe - dato.descuento + recargo - ice - excento;
										$scope.cambioDescuento = dato.descuento;
									})

								}

							}
							if ($scope.compra.tipo_recargo) {
								recargo = $scope.detalleCompra.importe * (recargo / 100);
							}
							$scope.detalleCompra.descuento = descuento;
							$scope.detalleCompra.recargo = recargo;
							$scope.detalleCompra.ice = ice;
							$scope.detalleCompra.excento = excento;

							$scope.detalleCompra.total = $scope.detalleCompra.importe - descuento + recargo - ice - excento;
						}
					}
				}
			}

			$scope.calcularImporteDetalleEdicion = function (detalleCompra, compra) {
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


				if((compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPRB' && compra.tipo_retencion == true){
					if(detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN){
						detalleCompra.importe = (((detalleCompra.costo_unitario * detalleCompra.cantidad) * 100 ) / $scope.plantilla.retencionBienes.almacen.porcentaje)
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
						detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento - detalleCompra.iue - detalleCompra.it;
					}else{
						detalleCompra.importe = (((detalleCompra.costo_unitario * detalleCompra.cantidad) * 100) / $scope.plantilla.retencionBienes.gasto.porcentaje)
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
						detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento - detalleCompra.iue - detalleCompra.it;
					}
				}else if((compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPRB' && compra.tipo_retencion == false){
					if(detalleCompra.centroCosto.nombre == $scope.diccionario.CENTRO_COSTO_ALMACEN){
						detalleCompra.importe = (detalleCompra.costo_unitario * detalleCompra.cantidad)
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienes.iue.porcentaje) / 100
						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienes.it.porcentaje) / 100
						detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento - detalleCompra.iue - detalleCompra.it;
					}else{
						detalleCompra.importe = (detalleCompra.costo_unitario * detalleCompra.cantidad)
						detalleCompra.iue = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.iue.porcentaje) / 100
						detalleCompra.it = (detalleCompra.importe * $scope.plantilla.retencionBienesGasto.it.porcentaje) / 100
						detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento - detalleCompra.iue - detalleCompra.it;
					}
				}else{
					detalleCompra.total = detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento;
				}
				$scope.sumarTotal();
				$scope.sumarTotalImporte();
				if ($scope.compra.descuento_general) {
					$scope.calcularImporteGeneral();
				}
				if ($scope.compra.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO && (compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) != 'IPRB') {
					$scope.calcularSaldo();
				} else {
					$scope.compra.a_cuenta = null
					$scope.compra.saldo = null
					$scope.compra.dias_credito = null
				}
			}
			$scope.ReCalcularConRetencion = function (compra) {
				for (let i = 0; i < compra.detallesCompra.length; i++) {
					const detalle = compra.detallesCompra[i];
					$scope.calcularImporteDetalleEdicion(detalle,compra)	
				}
			}

			$scope.sumarMonto = function (compras) {
				var suma = 0;
				for (var i = 0; i < compras.length; i++) {
					suma = suma + compras[i].total;

				}
				return Math.round(suma * 100) / 100;
			}

			$scope.sumarTotalImporte = function () {
				var sumaImporte = 0;
				let sumaIUE = 0
				let sumaIT = 0
				for (var i = 0; i < $scope.compra.detallesCompra.length; i++) {
					if (!$scope.compra.detallesCompra[i].eliminado) {
						if ($scope.usuario.empresa.ver_costos_dolares) {
							sumaImporte = sumaImporte + $scope.compra.detallesCompra[i].importe_dolares;
							$scope.compra.importe_dolares = Math.round((sumaImporte) * 1000) / 1000;
							
						} else {
							sumaImporte = sumaImporte + $scope.compra.detallesCompra[i].importe;
							$scope.compra.importe = Math.round((sumaImporte) * 1000) / 1000;
							sumaIUE += $scope.compra.detallesCompra[i].iue?$scope.compra.detallesCompra[i].iue:0
							$scope.compra.iue = Math.round((sumaIUE) * 1000) / 1000
							sumaIT += $scope.compra.detallesCompra[i].it?$scope.compra.detallesCompra[i].it:0
							$scope.compra.it = Math.round((sumaIT) * 1000) / 1000
						}
					}
				}
			}

			$scope.sumarTotal = function () {
				if ($scope.usuario.empresa.ver_costos_dolares) {
					var sumaTotal = 0, sumaDescuentos = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
					for (var i = 0; i < $scope.compra.detallesCompra.length; i++) {
						if (!$scope.compra.detallesCompra[i].eliminado) {
							sumaTotal = sumaTotal + $scope.compra.detallesCompra[i].total_dolares;
							sumaDescuentos = sumaDescuentos + $scope.compra.detallesCompra[i].descuento;
							sumaRecargo = sumaRecargo + $scope.compra.detallesCompra[i].recargo;
							sumaIce = sumaIce + $scope.compra.detallesCompra[i].ice;
							sumaExcento = sumaExcento + $scope.compra.detallesCompra[i].excento;
						}
					}
					$scope.compra.descuento_dolares = Math.round(sumaDescuentos * 100) / 100;
					$scope.compra.recargo_dolares = Math.round(sumaRecargo * 100) / 100;
					$scope.compra.ice_dolares = Math.round(sumaIce * 100) / 100;
					$scope.compra.excento_dolares = Math.round(sumaExcento * 100) / 100;
					$scope.compra.total_dolares = Math.round((sumaTotal) * 1000) / 1000;
				} else {
					var sumaTotal = 0, sumaDescuentos = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
					for (var i = 0; i < $scope.compra.detallesCompra.length; i++) {
						if (!$scope.compra.detallesCompra[i].eliminado) {
							sumaTotal = sumaTotal + $scope.compra.detallesCompra[i].total;
							sumaDescuentos = sumaDescuentos + ($scope.compra.detallesCompra[i].tipo_descuento ? $scope.compra.detallesCompra[i].importe * ($scope.compra.detallesCompra[i].descuento / 100) : $scope.compra.detallesCompra[i].descuento);
							sumaRecargo = sumaRecargo + $scope.compra.detallesCompra[i].recargo;
							sumaIce = sumaIce + $scope.compra.detallesCompra[i].ice;
							sumaExcento = sumaExcento + $scope.compra.detallesCompra[i].excento;
						}
					}
					if (($scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_SERVICIOS || $scope.compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_RETENCION_BIENES)) {
						$scope.compra.total = $scope.compra.detallesCompra.reduce((ac, va) => { return ac += !va.eliminado ? va.importe - (va.tipo_descuento ? va.importe * (va.descuento / 100) : va.descuento) + (va.tipo_recargo ? va.importe * (va.recargo / 100) : va.recargo) - va.ice - va.excento - va.it - va.iue : 0 }, 0) 
					} else {
						$scope.compra.total = $scope.compra.detallesCompra.reduce((ac, va) => { return ac += !va.eliminado ? va.importe - (va.tipo_descuento ? va.importe * (va.descuento / 100) : va.descuento) + (va.tipo_recargo ? va.importe * (va.recargo / 100) : va.recargo) - va.ice - va.excento : 0 }, 0)
					}
					// calculo de los demas datos despues del importe =========
					$scope.compra.descuento = Math.round(sumaDescuentos * 100) / 100;
					$scope.compra.recargo = Math.round(sumaRecargo * 100) / 100;
					$scope.compra.ice = Math.round(sumaIce * 100) / 100;
					$scope.compra.excento = Math.round(sumaExcento * 100) / 100;
					$scope.compra.total = Math.round($scope.compra.total * 100) / 100;
				}
			}

			$scope.calcularSaldo = function () {
				$scope.compra.saldo = ($scope.compra.importe - $scope.compra.descuento) - $scope.compra.a_cuenta;
				for (let i = 0; i < $scope.compra.detallesCompra.length; i++) {
					$scope.compra.detallesCompra[i].total = ($scope.compra.detallesCompra[i].cantidad * $scope.compra.detallesCompra[i].costo_unitario) - ($scope.compra.detallesCompra[i].tipo_descuento ? ($scope.compra.detallesCompra[i].cantidad * $scope.compra.detallesCompra[i].costo_unitario) * ($scope.compra.detallesCompra[i].descuento / 100) : $scope.compra.detallesCompra[i].descuento) + $scope.compra.detallesCompra[i].recargo - $scope.compra.detallesCompra[i].ice - $scope.compra.detallesCompra[i].excento;
				}
				$scope.compra.saldo = Math.round($scope.compra.saldo * 100) / 100;
			}

			$scope.obtenerSucursales = function () {
				var sucursales = [];
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}

			$scope.mostrarDescuentos = function () {
				var style = $(".des-datos").css("display");
				if (style == "none") {
					$(".des-datos").css("display", "");
				} else {
					$(".des-datos").css("display", "none");
				}
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
			$scope.obtenerMovimientosIngreso = function (compra) {
				blockUI.start();
				var promesa = ClasesTipo("MOVING");
				promesa.then(function (entidad) {
					$scope.movimientosIngreso = entidad.clases.reduce(function (val, mov, index, array) {
						if (mov.nombre_corto !== $scope.diccionario.MOVING_INVENTARIO_INICIAL && mov.nombre_corto !== $scope.diccionario.MOVING_POR_TRASPASO && mov.nombre_corto !== $scope.diccionario.MOVING_POR_DEVOLUCION && mov.nombre_corto !== 'ICAJCH' && mov.nombre_corto !== 'IC') {
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
				});
			}
			$scope.verificarMomivmiento = function (compra) {
				compra.fecha_vencimiento = null
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
				} else if (compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_AJUSTE) {
					compra.usar_producto = true
					compra.usarObservacion = true
				}
				else if (compra.movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_PRODUCCION) {
					compra.usar_producto = true
					compra.usarObservacion = true
					let fecha = new Date($scope.convertirFecha(compra.fechaTexto))
					let value = moment(fecha).add(30, 'days');
					compra.fecha_vencimiento = $scope.fechaATexto(value._d)
					compra.centroCosto = $scope.centrosCosto.find(x => {
						return x.nombre_corto == 'ALM'
					})

				}
				$scope.verificarMomivmientoCC()
			}
			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.almacenes = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.almacenes = sucursal.almacenes;
				if ($scope.compra.id == undefined) {
					$scope.compra.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
				}
			}

			$scope.formatearCodigoControl = function (codigo) {
				var codigoFormateado = "";
				for (var i = 0; i < codigo.length; i++) {
					if (i % 2 == 0) {
						codigoFormateado = codigoFormateado + codigo.substring(i, i + 2);
						if (codigo.length - i > 2) {
							codigoFormateado = codigoFormateado + "-"
						}
					}
				}
				return codigoFormateado;
			}

			$scope.obtenerCompras = function () {
				$scope.sucursalesUsuario = 0;
				/* for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					$scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
					if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
						$scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
					}
				} */
				var currentDate = new Date();
				var currentDateString = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
				$scope.filtrarCompras($scope.sucursalesUsuario, currentDateString, currentDateString);
			}

			$scope.filtrarCompras = function (sucursalesUsuario, inicio, fin, razon_social, nit, monto, tipo_pago, sucursal, usuario, tipo, dociso) {
				razon_social = (razon_social == "" || razon_social == undefined) ? 0 : razon_social;
				nit = (nit == null || nit == undefined) ? 0 : nit;
				monto = (monto == null || monto == undefined) ? 0 : monto;
				tipo_pago = (tipo_pago == undefined) ? 0 : tipo_pago;
				tipo = (tipo == undefined) ? 0 : tipo;
				dociso = dociso ? dociso : 0;
				sucursal = (sucursal == null || sucursal == undefined) ? 0 : sucursal;
				var roles = $.grep($scope.usuario.rolesUsuario, function (e) { return e.rol.nombre == $scope.diccionario.ROL_ADMINISTRADOR; });
				usuario = roles.length > 0 ? ((usuario == "" || usuario == undefined) ? 0 : usuario) : $scope.usuario.nombre_usuario;
				blockUI.start();
				inicio = new Date($scope.convertirFecha(inicio));
				fin = new Date($scope.convertirFecha(fin));

				var promesa = Compras(sucursalesUsuario, inicio, fin, razon_social, nit, monto, tipo_pago, sucursal, usuario, $scope.usuario.id, tipo, dociso);
				promesa.then(function (compras) {
					$scope.compras = compras;
					$scope.list = compras
					//$scope.compras = compras.detalle;
					//$scope.paginator.setPages(compras.paginas);

					blockUI.stop();
				});
				/*$scope.paginator = Paginator();
				$scope.paginator.column = "fecha";
				$scope.paginator.direction = "asc";
				$scope.filtroDetallesProducto = {
					idsSucursales: sucursalesUsuario,
					inicio: inicio,
					fin: fin,
					razon_social: razon_social,
					nit: nit,
					monto: monto,
					tipo_compra:tipo_pago,
					sucursal: sucursal, 
					usuario: usuario, 
					id_usuario: $scope.usuario.id, 
					tipo: tipo 
	
				}
				$scope.paginator.callBack = $scope.paginadorCompras;
				$scope.paginator.getSearch("", $scope.filtroDetallesProducto, null);*/
			}

			$scope.paginadorCompras = function () {
				blockUI.start();

				var promesa = Compras($scope.paginator);
				promesa.then(function (compras) {
					//$scope.compras = compras;
					$scope.compras = compras.detalle;
					$scope.list = compras
					$scope.paginator.setPages(compras.paginas);

					blockUI.stop();
				});
			}

			$scope.abrirPopupPago = function (compra) {
				$scope.compra = compra;
				$scope.pago = null;
				$scope.abrirPopup($scope.idModalPago);
			}

			$scope.cerrarPopupPago = function () {
				$scope.cerrarPopup($scope.idModalPago);
			}

			$scope.abrirDialogServicios = function (tipo) {
				$scope.obtenerServicios()
				$scope.tipo_edicion = tipo;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalServicios);
			}

			$scope.cerrarDialogServicios = function () {
				$scope.cerrarPopup($scope.idModalServicios);
			}
			$scope.abrirDialogPedidos = function () {
				$scope.obtenerPedidosEmpresa()
				$scope.abrirPopup($scope.idModalPedidos);
			}

			$scope.cerrarDialogPedidos = function () {
				$scope.cerrarPopup($scope.idModalPedidos);
			}
			$scope.abrirDialogDetallePedidos = (pedido) => {
				$scope.obtenerAlmacenes(pedido.almacen.sucursal.id)
				const promesa = DetallesPedidosCompraEmpresa(pedido.id, $scope.filtroPedidosCompra.tipo)
				promesa.then((data) => {
					$scope.pedido = pedido
					$scope.pedido.detallesPedido = data.detallesPedido
					$scope.pedido.descGrl = 0
					$scope.pedido.recGrl = 0
					$scope.pedido.iceGrl = 0
					$scope.pedido.exeGrl = 0
					$scope.totalPedido = 0
					$scope.pedido.tipoDescuento = false;
					$scope.pedido.tipoRecargo = false;
					$scope.calcularTotalPedido($scope.pedido.detallesPedido);
					$scope.cerrarDialogPedidos()
					for (let index = 0; index < $scope.pedido.detallesPedido.length; index++) {
						const detalle = $scope.pedido.detallesPedido[index];
						if ($scope.filtroPedidosCompra.tipo == '2') {
							detalle.producto = { nombre: detalle.descripcion }
						}
						let costoDetalleAnterior = 0
						const registroSinError = detalle && detalle.producto;
						if (!registroSinError) {
							$scope.pedido = undefined;
							return $scope.mostrarMensaje('Errores en el pedido. Constate que el pedido esta completo antes de continuar.')
						}
						if ($scope.filtroPedidosCompra.tipo == '1') {
							if (detalle.producto.inventarios.length > 0) {
								costoDetalleAnterior = detalle.producto.inventarios[detalle.producto.inventarios.length - 1].costo_unitario ? detalle.producto.inventarios[detalle.producto.inventarios.length - 1].costo_unitario : 0;
							}
						detalle.producto.costoanterior = costoDetalleAnterior
						}
						$scope.establecerProductoPedido(detalle, detalle.producto)
						$scope.calcularImportePedido(detalle.detalleCompra,false)
						$scope.calcularImportePedidoSinRet(detalle.detalleCompra)
					}
					$scope.abrirPopup($scope.idModalDetallePedidos);
				}).catch((err) => {
					const msg = (err && err.stack && err.stack || err.message && err.message) || 'Se perdió la conexión.';
					$scope.mostrarMensaje(msg);
				})
			}

			$scope.calcularImportePedidoSinRet = function (detalleCompra) {
				detalleCompra.importeSinRet = Math.round((detalleCompra.cantidad_parcial * detalleCompra.costo_unitario) * 1000) / 1000;
			}

			$scope.guardarDetalleCompraDePedido = function (detallePedido) {
				if(($scope.pedido.tipoPago.nombre_corto == 'CRE' && $scope.compra.movimiento.clase.nombre_corto == 'IPRB') || ($scope.pedido.tipoPago.nombre_corto == 'CRE' && $scope.compra.movimiento.clase.nombre_corto == 'IPRS') || ($scope.pedido.tipoPago.nombre_corto == 'CRE' && $scope.compra.movimiento.clase.nombre_corto == 'IPI') || ($scope.pedido.tipoPago.nombre_corto == 'CRE' && $scope.compra.movimiento.clase.nombre_corto == 'IPCSF')) {
					toastr.warning("La retención no es permitido a credito")
				}else{ 
					$scope.compra.generado_por_pedido = true
					$scope.compra.generado_por_pedido_servicio = $scope.filtroPedidosCompra.tipo == '1' ? false : true
					$scope.compra.proveedor = $scope.pedido.proveedor
					$scope.compra.sucursal = { id: $scope.pedido.almacen.id_sucursal }
					$scope.compra.almacen = $scope.pedido.almacen
					$scope.compra.pedido = $scope.pedido
					$scope.compra.tipoPago = $scope.pedido.tipoPago
					$scope.compra.dias_credito = $scope.pedido.dias_credito
					$scope.compra.total = $scope.pedido.total ? $scope.pedido.total : $scope.pedido.importe
					$scope.compra.a_cuenta = $scope.pedido.a_cuenta
					$scope.compra.saldo = $scope.pedido.saldo
					$scope.compra.observacion = $scope.pedido.observacion
					if ($scope.pedido.descGrl > 0 || $scope.pedido.recGrl > 0 || $scope.pedido.iceGrl > 0 || $scope.pedido.exeGrl > 0) {
						$scope.compra.descuento_general = true
					}
					$scope.compra.descuento = $scope.pedido.descGrl
					$scope.compra.recargo = $scope.pedido.recGrl
					$scope.compra.ice = $scope.pedido.iceGrl
					$scope.compra.excento = $scope.pedido.exeGrl
					$scope.esContado = $scope.pedido.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO ? false : true;
					$scope.conPendientes = false;
					// $scope.compra.detallesCompra = [];
					detallePedido.forEach(function (detalle) {
						if (detalle.eliminado != true && detalle.pendiente != true) {
							if (detalle.detalleCompra.estadoProducto == "Pendiente") {
								$scope.conPendientes = true;
							}
							if ($scope.filtroPedidosCompra.tipo == '2') {
								detalle.detalleCompra.servicio = { nombre: detalle.descripcion }
							}
							detalle.detalleCompra.observacion = detalle.observacion || '';
							detalle.detalleCompra.tipo_descuento = $scope.pedido.tipoDescuento;
							$scope.verificarProducto(detalle.detalleCompra)
						} else if (detalle.pendiente) {
							$scope.conPendientes = true;
						}
					})
					$scope.compra.conPendientes = $scope.conPendientes;
					$scope.cerrarDialogDetallePedidos()
				}
			}

			$scope.tipoPagoPorMovimiento = function (compra) {
				if((compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPRB' || (compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPRS' || (compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPI' || (compra.tipoMovimiento ? compra.tipoMovimiento.nombre_corto : compra.movimiento.clase.nombre_corto) == 'IPA'){
					
					$scope.tiposPago =  $scope.tiposPago.filter(tipo => tipo.nombre_corto == "CONT")
					$scope.compra.tipoPago = $scope.tiposPago.find(tipo => tipo.nombre_corto == "CONT")
				}else{
					$scope.obtenerTiposDePago();
				}
				
			}
			$scope.establecerProductoPedido = (detalle, producto) => {
				let textoNombreTipo = $scope.filtroPedidosCompra.tipo == '1' ? 'Producto' : 'Servicio';
				let cantidad_parcial = detalle.cantidad
				if (detalle.entregas.length > 0) {
					const cantidadEntregada = detalle.entregas.reduce((acumulado, entrega) => {
						return (acumulado + entrega.entregado)
					}, 0)
					if (cantidad_parcial < cantidadEntregada) $scope.mostrarMensaje('Es posbile que el total de este ' + textoNombreTipo.toLowerCase() + ' ya fué entregado.' + textoNombreTipo + ': ' + producto.nombre + '; Cantidad esperada: ' + detalle.cantidad + '; Cantidad entregada: ' + cantidadEntregada);
					cantidad_parcial = cantidad_parcial - cantidadEntregada;
					if (!cantidad_parcial) $scope.mostrarMensaje('La cantidad entregada excede la cantidad del pedido. ' + textoNombreTipo + ': ' + producto.nombre + '; Cantidad esperada: ' + detalle.cantidad + '; Cantidad entregada: ' + cantidadEntregada);
				}
				if ($scope.filtroPedidosCompra.tipo == '1') {
					producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
				}
				let centroCostos = $scope.centrosCosto.find(function (centro) {
					return $scope.filtroPedidosCompra.tipo == '1' ? centro.nombre_corto == "ALM" : centro.nombre_corto == "VR"
				})
				detalle.detalleCompra = {
					centroCosto: centroCostos, producto: producto, costo_unitario: detalle.costo_unitario, importe: Math.round((detalle.costo_unitario * detalle.cantidad) * 1000) / 1000, total: Math.round((detalle.costo_unitario * detalle.cantidad) * 1000) / 1000, cantidad_parcial: cantidad_parcial,
					cantidad: cantidad_parcial, descuento: (producto.descuento ? producto.descuento : 0), recargo: 0, ice: 0, excento: 0, it: 0, iue:0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
				};
				$scope.cerrarPopup($scope.idModalInventario);
				$scope.enfocar('cantidad');
			}
			$scope.cerrarDialogDetallePedidos = function () {
				$scope.cerrarPopup($scope.idModalDetallePedidos);
			}
			$scope.cerrarDialogEliminarPedido = function () {
				$scope.cerrarPopup($scope.idModalEliminarPedido);
			}
			$scope.cerrarDialogEliminarDetallePedido = function () {
				$scope.cerrarPopup($scope.idModalEliminarProductoPedido);
			}
			$scope.abrirDialogEliminarDetallePedido = function (detalle) {
				$scope.detalle = detalle
				$scope.abrirPopup($scope.idModalEliminarProductoPedido);
			}


			$scope.obtenerPedidosEmpresa = function (filtro) {
				$scope.paginatorPedidosCompra = Paginator();
				$scope.paginatorPedidosCompra.column = "id";
				$scope.paginatorPedidosCompra.direction = "asc";
				if (filtro) {
					$scope.filtroPedidosCompra = filtro
				} else {
					$scope.filtroPedidosCompra = {
						id_empresa: $scope.usuario.id_empresa,
						id_proveedor: "",
						fecha_inicio: "",
						fecha_fin: "",
						correlativo: "",
						dociso: "",
						tipo: "1"
					}
				}
				$scope.paginatorPedidosCompra.callBack = $scope.buscarPedidosEmpresa;
				$scope.paginatorPedidosCompra.getSearch("", $scope.filtroPedidosCompra, null);
			}
			$scope.buscarPedidosEmpresa = function () {
				var promesa = ListaCompraPedidosEmpresa($scope.paginatorPedidosCompra)
				promesa.then(function (dato) {
					$scope.pedidos = dato.pedidos
					$scope.paginatorPedidosCompra.setPages(dato.paginas);
				})
			}
			$scope.obtenerServicios = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("SERVICIOS_COMPRA", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.datosServicios = entidad
					blockUI.stop();
				});
			}
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
					$scope.obtenerServicios()
					if (tipo.nombre_corto === "PVDCAL") {
						if (!$scope.compra.id) {
							$scope.obtenerCalifiacinesProveedor(true)
						}
					}
					blockUI.stop();
					$scope.cerrarDialogConceptoEdicion();
					SweetAlert.swal("Guardado!", res.message, "success");

				});
			}

			$scope.realizarPago = function (idCompra, pago, idUsuario, almacen) {
				var restante = 0;
				var saldo = $scope.compra.saldo;
				restante = saldo - $scope.pago;
				if (restante < 0) {
					restante = restante;
				} else if (restante >= 0) {
					restante = 0;
				}
				blockUI.start();
				var promesa = CompraDatosCredito(idCompra, { pago: pago, id_usuario_cajero: idUsuario, saldoRestante: restante, almacen: almacen });
				promesa.then(function (data) {
					SweetAlert.swal("Guardado!", data.mensaje, "success");
					$scope.cerrarPopup($scope.ModalMensajePago);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerCompras();

					if (restante < 0) {
						$scope.imprimirRecibo(data, data.compra, saldo, restante);
						$scope.imprimirReciboAnticipo(data.anticipo);
					} else {
						$scope.imprimirRecibo(data, data.compra, pago, restante);
					}
					blockUI.stop();
				})
				/*Compra.update({ id: idCompra }, { pago: pago, id_usuario_cajero: idUsuario,saldoRestante:restante }, function (data) {			
				//Compra.update({ id: $scope.compra.id }, { pago: pago, id_usuario_cajero: $scope.usuario.id }, function (data) {
					$scope.mostrarMensaje(data.mensaje);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerCompras();
					$scope.imprimirRecibo(data, data.compra, pago);
					blockUI.stop();
				}, function (error) {
					$scope.mostrarMensaje(error);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerCompras();
					blockUI.stop();
				});*/
			}

			$scope.pagoAnticipo = function (value) {
				$scope.accion = value;
				if ($scope.accion == true) {
					$scope.realizarPago($scope.compra.id, $scope.pago, $scope.usuario.id);
				} else {
					$scope.cerrarPopup($scope.ModalMensajePago);
				}
			}

			$scope.efectuarPago = function (pago) {
				var tipoPago = $scope.usuario.empresa.usar_pago_anticipado;
				$scope.pago = pago;
				if (tipoPago == true) {
					//usar pagos anticipados
					if (pago <= $scope.compra.saldo) {
						$scope.realizarPago($scope.compra.id, pago, $scope.usuario.id, $scope.compra.almacen);
					} else {
						$scope.abrirPopup($scope.ModalMensajePago);
						$scope.cerrarPopupPago();
					}
				} else {
					//no usar pagos anticipados
					if (pago <= $scope.compra.saldo) {
						$scope.realizarPago($scope.compra.id, pago, $scope.usuario.id, $scope.compra.almacen);
					} else {
						SweetAlert.swal("Monto excedido", "El cobro excede el monto a cobrar", "warning");
					}
				}
			}

			$scope.imprimirRecibo = function (data, compra, pago, anticipo) {
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

				var textoFact = "Doc. Nro " + $scope.compra.factura;
				doc.text(textoFact, 105, 210, { width: 100 });

				doc.text("Bs " + pago + ".-", 170, 210, { width: 100 });


				//doc.text("Saldo " + (compra.saldo-pago) + ".-", 170, 220, { width: 100 });

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
				doc.text("He recibido de : " + anticipo.proveedor.razon_social, { align: 'left' });
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

			$scope.establecerCentroCosto = function (centroCosto) {
				console.log(centroCosto);
				var centroCostoAnalizado = centroCosto.nombre ? centroCosto.nombre : centroCosto;
				if (centroCostoAnalizado == $scope.diccionario.CENTRO_COSTO_ALMACEN) {
					$scope.busquedaProductoHabilidato = true;

				} else {
					$scope.busquedaProductoHabilidato = false;
				}
			}
			$scope.verificarMomivmientoCC = function (enfocar) {
				$scope.detalleCompra.centroCosto.nombre = ""
				$scope.detalleCompra.editar_centro_costo = false;
				if ($scope.compra.movimiento.clase.nombre_corto === 'IPA') {
					$scope.compra.proveedor = {}
					$scope.detalleCompra.centroCosto.nombre = $scope.centrosCosto.find(x => {
						return x.nombre_corto == 'ALM'
					})
					$scope.detalleCompra.editar_centro_costo = true
					$scope.establecerCentroCosto($scope.detalleCompra.centroCosto.nombre)
				} else if ($scope.compra.movimiento.clase.nombre_corto === 'IPRO') {
					$scope.compra.proveedor = {}
					$scope.detalleCompra.centroCosto.nombre = $scope.centrosCosto.find(x => {
						return x.nombre_corto == 'ALM'
					})
					$scope.detalleCompra.editar_centro_costo = true
					$scope.establecerCentroCosto($scope.detalleCompra.centroCosto.nombre)

					if (enfocar) {
						let producto = Object.assign({}, $scope.compra.detallesCompra[$scope.compra.detallesCompra.length - 1].producto)
						let costo_unitario = $scope.compra.detallesCompra[$scope.compra.detallesCompra.length - 1].costo_unitario
						$scope.establecerProductoProduccion(producto, costo_unitario)
						$scope.enfocar('cantidad');
					}
				}

			}
			$scope.establecerProductoProduccion = function (producto, costo_unitario) {

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
					centroCosto: centroCostos, producto: producto, costo_unitario: costo_unitario, precio_unitario: producto.precio_unitario, fechaVencimientoTexto: $scope.compra.fecha_vencimiento ? $scope.compra.fecha_vencimiento : null,
					cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
				};
				$scope.cerrarPopup($scope.idModalInventario);
				$scope.enfocar('cantidad');
			}
			$scope.crearNuevaCompra = function () {
				$scope.resaltado = false;
				$scope.obtenerServicios()
				$scope.verDescuento = false
				$scope.fechaNoValida = false
				$scope.compra = new Compra({
					generado_por_pedido: false, usarObservacion: false, fecha_vencimiento: null,
					usar_configuracion_iso: $scope.usuario.empresa.usar_configuracion_iso,
					usar_producto: true, movimiento: { clase: {} }, tipo_retencion: true,
					id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, proveedor: {}, id_tipo_pago: $scope.tiposPago[0].id, tipoPago: $scope.tiposPago[0],
					detallesCompra: [], descuento_general: false, tipo_descuento: false, codigo_control: 0, autorizacion: 0,
					calificacion_proveedor: 0, detalleCalifiacionProveedor: [], tipo_recargo: false, descuento: 0, recargo: 0, ice: 0, excento: 0, carga_masiva_serie: false
				});
				if ($scope.usuario.empresa.usar_calificaciones_proveedor) {
					$scope.obtenerCalifiacinesProveedor(true)
				}
				$scope.cambiarTipoPago($scope.tiposPago[0]);

				if ($scope.usuario.empresa.usar_funciones_erp) {
					$scope.compra.movimiento.clase = $scope.movimientosIngreso[0]
				}
				$scope.compra.sucursal = $scope.sucursales.length == 1 ? $scope.sucursales[0] : null;
				if ($scope.compra.sucursal) {
					$scope.obtenerAlmacenes($scope.compra.sucursal.id);
				}

				var fechaActual = new Date();
				$scope.compra.fechaTexto = fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear();
				$scope.abrirPopup($scope.idModalWizardCompraEdicion);
				$scope.enfocar('nit');
				$scope.verificarMomivmientoCC()

				$.ketchup.validation('selectSuc', 'No has seleccionado una Sucursal!!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputNit', 'Debe ingrese el N° de NIT!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputRS', 'Debe ingresar Razon Social!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputFact', 'Debe ingresar N° de Factura!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputAutor', 'Debe ingresar N° de Autorización!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputFecha', 'No has seleccionado fecha!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputCodCont', 'Debe ingresar el codigo de Control!', function (form, el, value) {return value.length == 0 ? false : true });
				$.ketchup.validation('inputAlmac', 'No ha seleccionado el almacen!', function (form, el, value) {return value.length == 0 ? false : true });
				$('#formularioCompra').ketchup({
					validateEvents: 'blur focus keyup change submit'
				}, {
					'#sucursal': 'selectSuc',
					'#nit': 'inputNit',
					'#razon_social':'inputRS',
					'#factura':'inputFact',
					'#autorizacion':'inputAutor',
					'#fechaCompra':'inputFecha',
					'#codigo_control_compra':'inputCodCont',
					'#almacen':'inputAlmac',
				});
			}

			$scope.verCompra = function (compra) {
				$scope.compra = compra;
				$scope.carga_masiva_serie = false
				$scope.abrirPopup($scope.idModalWizardCompraVista);
			}

			$scope.cerrarPopupVista = function () {
				$scope.cerrarPopup($scope.idModalWizardCompraVista);
			}

			$scope.cerrarPopupEdicion = function () {
				$scope.ocultarMensajesValidacion();
				$scope.detalleCompra = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
				$scope.cerrarPopup($scope.idModalWizardCompraEdicion);
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



			$scope.imprimirCompra = function (compra) {
				GenerarImpresionCompra(compra, $scope.usuario, $scope.convertirALiteral, $scope.verificarDescuentos)
			}

			$scope.guardarCompra = async function (valido, compra) {
				if (valido) {
					SweetAlert.swal({
						title: 'Guardando Compra...',
						icon: 'info',
						iconHtml: '<i class="fa fa-shopping-cart size-icon"></i>',
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					blockUI.noOpen = true;
					if (compra.detallesCompra.length > 0) {
						var q = await ObtenerConfiguracionIso(compra.sucursal.id)
						if (q.configuracionesIso.length > 0) {
							if ($scope.filtroPedidosCompra && $scope.filtroPedidosCompra.tipo == "2") {
								if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "SERVICIO" && cfg.activo == true);
							} else {
								if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter(cfg => cfg.tipoDocumento.nombre_corto === "COMPRA" && cfg.activo == true);
							}
						}
						if (compra.usar_configuracion_iso && q.length == 1) {
							compra.configuracionesIso = q[0];
							compra.config_doc_iso = q[0].id;
						} else {
							if(!compra.id){
							compra.configuracionesIso = undefined
							compra.config_doc_iso = undefined
						}else{
							compra.configuracionesIso = $scope.datosCompraEdicion.configuracionesIso
						}
						}
						/* if (compra.proveedor.nit.id) {
							compra.proveedor = compra.proveedor.nit;
						} */
						//compra.codigo_control=$scope.formatearCodigoControl(compra.codigo_control);
						compra.usar_peps = $scope.usuario.empresa.usar_peps
						var tiempoActual = new Date();
						compra.fecha = new Date($scope.convertirFecha(compra.fechaTexto));
						compra.fecha.setHours(tiempoActual.getHours())
						compra.fecha.setMinutes(tiempoActual.getMinutes())
						compra.fecha.setSeconds(tiempoActual.getSeconds())
						if (compra.fecha_vencimiento) {
							compra.fecha_vencimiento = new Date($scope.convertirFecha(compra.fecha_vencimiento));
							compra.fecha_vencimiento.setHours(tiempoActual.getHours())
							compra.fecha_vencimiento.setMinutes(tiempoActual.getMinutes())
							compra.fecha_vencimiento.setSeconds(tiempoActual.getSeconds())
						}
						blockUI.start();
						if (compra.id) {
							compra.esModificacion = true;
							var detallesInvalidos = [];
							for (var index = 0; index < compra.detallesCompra.length; index++) {
								if (!compra.detallesCompra[index].eliminado && (compra.detallesCompra[index].cantidad == undefined || compra.detallesCompra[index].costo_unitario == undefined)) {
									detallesInvalidos.push(compra.detallesCompra[index].producto.nombre + " no tiene cantidad o precio");
								}
							}
							if (detallesInvalidos.length > 0) {
								//alert(detallesInvalidos);
								// $scope.mostrarMensaje(detallesInvalidos);
								var tituloMsg = detallesInvalidos.length > 1 ? "Detalles incorrectos!" : "Detalle incorrecto!";
								SweetAlert.swal({
									title: tituloMsg,
									html: "<div class='content-sweet'>" + detallesInvalidos.join('\n\n') + "</div>",
									icon: 'warning'
								});
								$scope.abrirPopup($scope.idModalAlerta);
								blockUI.stop();
							} else {
								Compra.update({ id: compra.id }, compra, function (res) {
									blockUI.stop();
									$scope.cerrarPopPupEdicion();
									SweetAlert.swal("Guardado!", res.mensaje, "success");
									$scope.recargarItemsTabla();
									$scope.datosCompraEdicion
									if ($scope.filtroPedidosCompra && $scope.filtroPedidosCompra.tipo == "2") {
										compra.configuracionesIso != undefined ? compra.configuracionesIso.predefinido ? $scope.printIsoDocServicio(compra) : $scope.imprimirCompra(compra) : $scope.imprimirCompra(compra);
									} else {
										compra.configuracionesIso != undefined ? compra.configuracionesIso.predefinido ? $scope.printIsoDoc(compra) : $scope.imprimirCompra(compra) : $scope.imprimirCompra(compra);
									}
								});
							}
						} else {
							var promesa = SaveCompra(compra)
							promesa.then(function (dato) {
								$scope.cerrarPopPupEdicion();
								blockUI.stop();
								SweetAlert.swal("Guardado!", res.mensaje, "success");
								$scope.recargarItemsTabla();
								if (dato.compra) {
									if ($scope.filtroPedidosCompra && $scope.filtroPedidosCompra.tipo == "2") {
										compra.configuracionesIso != undefined ? compra.configuracionesIso.predefinido ? $scope.printIsoDocServicio(dato.compra) : $scope.imprimirCompra(dato.compra) : $scope.imprimirCompra(dato.compra);
									} else {
										compra.configuracionesIso != undefined ? compra.configuracionesIso.predefinido ? $scope.printIsoDoc(dato.compra) : $scope.imprimirCompra(dato.compra) : $scope.imprimirCompra(dato.compra);
									}
								}
								
							})
							/* 				compra.$save(function (sucursal) {
												blockUI.stop();
												$scope.cerrarPopPupEdicion();
												$scope.mostrarMensaje('Compra registrada exitosamente!');
												$scope.recargarItemsTabla();
												$scope.imprimirCompra(compra);
											}, function (error) {
												blockUI.stop();
												$scope.cerrarPopPupEdicion();
												$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
												$scope.recargarItemsTabla();
											}); */
						}
					}else{
						toastr.warning("Debe registrar minimo un detalle")
					}
				}
			}

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
					centroCosto: centroCostos, producto: producto, precio_unitario: producto.precio_unitario, fechaVencimientoTexto: $scope.compra.fecha_vencimiento ? $scope.compra.fecha_vencimiento : null,
					cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: (producto.descuento > 0 ? true : false), tipo_recargo: false
				};
				$scope.enfocar('cantidad');
				$scope.cerrarPopup($scope.idModalInventario);
			}
			$scope.verDescuentosPedido = function () {
				$scope.verDescuento = !scope.verDescuento
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
			$scope.cerrarPopPupEdicion = function () {
				$scope.cerrarPopup($scope.idModalWizardCompraEdicion);
			}

			$scope.generarCompraDePedido = function (pedido) {
				pedido.detallesPedido.forEach(function (detalle, index, array) {

				})
			}
			$scope.EliminarPedido = function (pedido) {
				var promesa = EliminarPedidoEmpresa(pedido.id)
				promesa.then(function (dato) {
					$scope.mostrarMensaje(dato.mensaje)
					$scope.obtenerPedidosEmpresa($scope.$scope.filtroPedidosCompra)
					$scope.cerrarDialogEliminarPedido()
				})
			}
			$scope.SeleccionarAccionPedidoDetalle = function (detalle, tipo) {
				if (tipo == "eliminar") {
					$scope.EliminarPedidoDetalle(detalle)
				} else {
					detalle.pendiente = true
				}
				$scope.cerrarDialogEliminarDetallePedido()
			}
			$scope.EliminarPedidoDetalle = function (detalle) {
				detalle.eliminado = true
				var promesa = EliminarDetallePedidoEmpresa(detalle.id)
				promesa.then(function (dato) {
					$scope.mostrarMensaje(dato.mensaje)
					$scope.cerrarDialogEliminarDetallePedido()
				})
			}
			//$scope.list = $scope.$parent.personList
			$scope.config = {
				itemsPerPage: $scope.itemsPerPageCompra,
				maxPages: 5,
				fillLastPage: true
			}
			$scope.SelectItemPorPagina = function (itemsPerPageCompra) {
				$scope.config = {
					itemsPerPage: itemsPerPageCompra,
					maxPages: 5,
					fillLastPage: true
				}
			}

			$scope.subirExcelComprasIngresosDiarios = function (event) {
				blockUI.start();
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
						var compras = [];
						var arregloProveedores = []
						var arregloCentrosCosto = []
						var arregloProductos = []
						do {
							row2 = row
							var compra = { usar_producto: true, sucursal: {}, almacen: {}, tipoPago: {}, detallesCompra: [], proveedor: {} };
							compra.proveedor.nit = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							compra.proveedor.razon_social = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							var bandera = false
							if (arregloProveedores.length > 0) {
								for (var i = 0; i < arregloProveedores.length; i++) {
									var element = arregloProveedores[i].nit;
									if (compra.proveedor.nit != null) {
										if (element == compra.proveedor.nit) {
											bandera = true
										}
									}
								}
								if (!bandera) {

									arregloProveedores.push(compra.proveedor)

								}
							} else {
								arregloProveedores.push(compra.proveedor)
							}
							compra.factura = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							/* if (row == 2) {
								var facturaComparacion = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							} else {
								var facturaComparacion = worksheet['A' + (row - 1)] != undefined && worksheet['A' + (row - 1)] != "" ? worksheet['A' + (row - 1)].v.toString() : null;
							} */
							compra.autorizacion = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							compra.fechaTexto = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? new Date($scope.fecha_excel_angular(worksheet['E' + row].v.toString())) : null;
							var tiempoActual = new Date();
							//compra.fechaTexto = new Date($scope.convertirFecha(compra.fechaTexto));
							compra.fechaTexto.setHours(tiempoActual.getHours())
							compra.fechaTexto.setMinutes(tiempoActual.getMinutes())
							compra.fechaTexto.setSeconds(tiempoActual.getSeconds())
							compra.codigo_control = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							compra.sucursal.nombre = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							compra.almacen.nombre = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
							compra.tipoPago.nombre = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
							compra.dias_credito = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? worksheet['J' + row2].v.toString() : null;
							compra.a_cuenta = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseFloat(worksheet['K' + row2].v.toString()) : null;
							compra.observacion = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? worksheet['L' + row2].v.toString() : null;

							do {
								var NumeroCompraA = worksheet['C' + row2] != undefined && worksheet['C' + row2] != "" ? worksheet['C' + row2].v.toString() : null;
								if (NumeroCompraA == compra.factura) {
									var detalleCompra = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, eliminado: false }
									detalleCompra.centroCosto.nombre = worksheet['M' + row2] != undefined && worksheet['M' + row2] != "" ? worksheet['M' + row2].v.toString() : null;
									var bandera = false
									detalleCompra.producto.codigo = worksheet['N' + row2] != undefined && worksheet['N' + row2] != "" ? worksheet['N' + row2].v.toString() : null;
									detalleCompra.producto.nombre = worksheet['O' + row2] != undefined && worksheet['O' + row2] != "" ? worksheet['O' + row2].v.toString() : null;
									if (detalleCompra.centroCosto.nombre.toUpperCase() != "ALMACEN") {
										if (arregloCentrosCosto.length > 0) {
											for (var i = 0; i < arregloCentrosCosto.length; i++) {
												var element = arregloCentrosCosto[i].nombre;
												if (detalleCompra.centroCosto.nombre != null) {
													if (element == detalleCompra.centroCosto.nombre) {
														bandera = true
													}
												}
											}
											if (!bandera) {
												arregloCentrosCosto.push(detalleCompra.centroCosto)
											}
										} else {
											arregloCentrosCosto.push(detalleCompra.centroCosto)
										}

										var bandera = false
										if (arregloProductos.length > 0) {
											for (var i = 0; i < arregloProductos.length; i++) {
												var element = arregloProductos[i].codigo;
												if (detalleCompra.producto.codigo != null) {
													if (element == detalleCompra.producto.codigo) {
														bandera = true
													}
												}
											}
											if (!bandera) {
												arregloProductos.push(detalleCompra.producto)
											}
										} else {
											arregloProductos.push(detalleCompra.producto)
										}
									}
									detalleCompra.fecha_vencimiento = worksheet['P' + row2] != undefined && worksheet['P' + row2] != "" ? new Date($scope.fecha_excel_angular(worksheet['P' + row2].v.toString())) : null;
									detalleCompra.lote = worksheet['Q' + row2] != undefined && worksheet['Q' + row2] != "" ? worksheet['Q' + row2].v.toString() : null;
									if ($scope.usuario.empresa.ver_costos_dolares) {
										detalleCompra.costo_unitario = 0;
										detalleCompra.costo_unitario_dolares = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? parseFloat(worksheet['R' + row2].v.toString()) : null;
									} else {
										detalleCompra.costo_unitario_dolares = 0;
										detalleCompra.costo_unitario = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? parseFloat(worksheet['R' + row2].v.toString()) : null;
									}
									detalleCompra.costo_unitario = worksheet['R' + row2] != undefined && worksheet['R' + row2] != "" ? parseFloat(worksheet['R' + row2].v.toString()) : null;
									detalleCompra.cantidad = worksheet['S' + row2] != undefined && worksheet['S' + row2] != "" ? parseFloat(worksheet['S' + row2].v.toString()) : null;
									detalleCompra.importe = detalleCompra.costo_unitario * detalleCompra.cantidad
									detalleCompra.tipo_descuento = worksheet['T' + row2] != undefined && worksheet['T' + row2] != "" ? worksheet['T' + row2].v.toString() : null;
									detalleCompra.descuento = worksheet['U' + row2] != undefined && worksheet['U' + row2] != "" ? parseFloat(worksheet['U' + row2].v.toString()) : null;
									detalleCompra.tipo_recargo = worksheet['V' + row2] != undefined && worksheet['V' + row2] != "" ? worksheet['V' + row2].v.toString() : null;
									detalleCompra.recargo = worksheet['W' + row2] != undefined && worksheet['W' + row2] != "" ? parseFloat(worksheet['W' + row2].v.toString()) : null;
									detalleCompra.ice = worksheet['X' + row2] != undefined && worksheet['X' + row2] != "" ? parseFloat(worksheet['X' + row2].v.toString()) : null;
									detalleCompra.excento = worksheet['Y' + row2] != undefined && worksheet['Y' + row2] != "" ? parseFloat(worksheet['Y' + row2].v.toString()) : null;
									detalleCompra.importe_dolares = detalleCompra.costo_unitario_dolares * detalleCompra.cantidad
									var recargo = detalleCompra.recargo
									if (detalleCompra.tipo_recargo == "%") {
										if ($scope.usuario.empresa.ver_costos_dolares) {
											recargo = detalleCompra.importe_dolares * (detalleCompra.recargo / 100);
										} else {
											recargo = detalleCompra.importe * (detalleCompra.recargo / 100);
										}
									}
									var descuento = detalleCompra.descuento
									if (detalleCompra.tipo_descuento == "%") {
										if ($scope.usuario.empresa.ver_costos_dolares) {
											descuento = detalleCompra.importe_dolares * (detalleCompra.descuento / 100);
										} else {
											descuento = detalleCompra.importe * (detalleCompra.descuento / 100);
										}
									}
									if ($scope.usuario.empresa.ver_costos_dolares) {
										detalleCompra.total_dolares = Math.round((detalleCompra.importe_dolares - descuento + recargo - detalleCompra.ice - detalleCompra.excento) * 1000) / 1000;
									} else {
										detalleCompra.total = Math.round((detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento) * 1000) / 1000;
									}
									// detalleCompra.total = Math.round((detalleCompra.importe - descuento + recargo - detalleCompra.ice - detalleCompra.excento) * 1000) / 1000;
									compra.detallesCompra.push(detalleCompra);
									row2++;
								}

							} while (NumeroCompraA == compra.factura);

							row = (row2 - 1)

							/* if (NumeroVenta != NumeroVentaComparacion || row == 2)  {*/
							var sumaImporte = 0;
							var sumaImporte_dolares = 0;
							for (var i = 0; i < compra.detallesCompra.length; i++) {
								sumaImporte = sumaImporte + compra.detallesCompra[i].importe;
								sumaImporte_dolares = sumaImporte_dolares + compra.detallesCompra[i].importe_dolares;
							}
							compra.importe = Math.round((sumaImporte) * 1000) / 1000;
							var sumaTotal = 0;
							var sumaTotal_dolares = 0;
							for (var i = 0; i < compra.detallesCompra.length; i++) {
								sumaTotal = sumaTotal + compra.detallesCompra[i].total;
								sumaTotal_dolares = sumaTotal_dolares + compra.detallesCompra[i].total_dolares;
							}
							compra.total = Math.round((sumaTotal) * 1000) / 1000;
							compra.total_dolares = Math.round((sumaTotal_dolares) * 1000) / 1000;
							var tipo_pago = $scope.tiposPago.filter(function (dato) {
								return dato.nombre == compra.tipoPago.nombre
							})
							compra.tipoPago = tipo_pago[0]
							if (compra.tipoPago.nombre == "CREDITO") {
								if ($scope.usuario.empresa.ver_costos_dolares) {
									compra.saldo = compra.total_dolares - compra.a_cuenta;
								} else {
									compra.saldo = compra.total - compra.a_cuenta;
								}
							} else {
								compra.saldo = null
							}
							compra.id_usuario = $scope.usuario.id
							var mov = $scope.movimientosIngreso.filter(function (dato) {
								return dato.nombre_corto == $scope.diccionario.MOVING_DIARIO
							})
							compra.movimiento = mov[0]
							compra.id_empresa = $scope.usuario.id_empresa
							compra.fecha = compra.fechaTexto
							/* ventas.push(venta); */
							/* } */
							compras.push(compra);
							row++;
							i++;

						} while (worksheet['A' + row] != undefined);
						$scope.guardarImportacionComprasIngresoDiario(compras, arregloProveedores, arregloCentrosCosto, arregloProductos);
						$scope.limpiarArchivoImportacion()
					};
					reader.readAsBinaryString(f);

				}
			}
			$scope.guardarImportacionComprasIngresoDiario = function (compras, arregloProveedores, arregloCentrosCosto, arregloProductos) {

				$scope.comprasParaGuardar = compras
				let comprasArray = []
				if ($scope.comprasParaGuardar.length > 0) {
					if ($scope.comprasParaGuardar.length > 1) {
						comprasArray = $scope.comprasParaGuardar.slice(0, 1)
						$scope.comprasParaGuardar = $scope.comprasParaGuardar.slice(1, $scope.comprasParaGuardar.length)
					} else {
						comprasArray = $scope.comprasParaGuardar
						$scope.comprasParaGuardar = []
					}
					let promesa = GuardarImportacionComprasIngresoDiario(comprasArray, arregloProveedores, arregloCentrosCosto, arregloProductos, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						if ($scope.comprasParaGuardar.length > 0) {
							$scope.mostrarMensaje("Faltan procesar " + $scope.comprasParaGuardar.length + " compras")
							$scope.guardarImportacionComprasIngresoDiario($scope.comprasParaGuardar, [], [], [])

						} else {
							blockUI.stop()
							SweetAlert.swal("Guardado!", dato.mensaje, "success");
						}


					})
				}

			}
			$scope.subirExcelPagosCompras = function (event) {
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
							pago.sucursal = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							var sucursalEncontrada = $scope.sucursales.find(function (sucursal) {
								return sucursal.nombre.toUpperCase() == pago.sucursal.toUpperCase()
							})
							pago.sucursal = sucursalEncontrada
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
						$scope.guardarImportacionPagosCompras(pagos);
					};
					reader.readAsBinaryString(f);

				}
			}
			$scope.guardarImportacionPagosCompras = function (pagos) {
				blockUI.start();
				var promesa = GuardarImportacionPagosCompras(pagos, $scope.usuario.id_empresa)
				promesa.then(function (dato) {
					blockUI.stop()
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
					$scope.recargarItemsTabla()
				})
			}
			$scope.abrirVentanaAnadirProducto = function () {
				$scope.nuevoProducto = {unidad_medida: null, activEconomica:null, productoServicio:null}
				$scope.abrirPopup($scope.VentanaProductos);
			}
			$scope.obtenerSucursalUsuario = ( sucursalesUsuario ) => { 
				if(sucursalesUsuario == 0) return null 
				if( sucursalesUsuario.length === 1 ) return sucursalesUsuario[0].sucursal ? sucursalesUsuario[0].sucursal : null 
				let reg = sucursalesUsuario.find( ( ele ) => ele.sucursal.numero === 0 ) 
				if(reg && reg.sucursal) return reg.sucursal 
				return null 
			}
			$scope.listaUnidadMedidaSin = async function () {
				try {
					const listaUnidadesMedida =  await ListaUnidadMedidaSin($scope.sucursalUsuario.id);
					$scope.unidadesMedida = listaUnidadesMedida.data;
				} catch (err) {
					alert(err.stack && err.stack || 'Se perdió la conexión')
				}
			}
			$scope.listaActividadesSin = async function () {
				try{
					const listaActividades = await ListaActividadesSin($scope.usuario.id_empresa, $scope.sucursalUsuario.id);
					$scope.actividadesSin = listaActividades.data;
				} catch (err) {
					alert(err.stack && err.stack || 'Se perdió la conexión')
				}
			}
			$scope.listaProductoServicioSin = async function (actividad) {
				try {
					const listaProductosServ = await ListaProductoServicioSin($scope.usuario.id_empresa, actividad.codigoCaeb);
					$scope.productoServicioSin = listaProductosServ.data;
				} catch (err) {
					alert(err.stack && err.stack || 'Se perdió la conexión')
				}
			}

			$scope.cerrarVentanaAnadirProducto = function () {
				$scope.cerrarPopup($scope.VentanaProductos);
				$scope.nuevoProducto = null;
				$scope.mensajeCodigo = "";
			}
			$scope.cargadorCodigo = false;
			$scope.validarCodigo = function (codigo) {
				if (codigo) {
					// blockUI.start();
					$scope.cargadorCodigo = true;
					$scope.mensajeCodigo = "";
					$timeout(function () {
						var id_empresa = $scope.usuario.id_empresa;
						var promise1 = VerificarCodigoProducto(id_empresa, codigo)
						promise1.then(function (dato) {
							// blockUI.stop();
							$scope.cargadorCodigo = false;
							$scope.respuesta = dato;
							if ($scope.respuesta.length != 0) {
								$scope.mensajeCodigo = 'El codigo "' + $scope.nuevoProducto.codigo + '" ya existe';
								$scope.nuevoProducto.codigo = null;
							} else {
								$scope.mensajeCodigo = "Codigo valido";
							}
						})
					}, 1500);
				} else {
					$scope.mensajeCodigo = "";
				}

			}

			$scope.agregarProducto = function (producto) {
				var id_empresa = $scope.usuario.id_empresa;
				var codigo = producto.codigo;
				var nombre = producto.nombre;
				var activEconomica = producto.activEconomica;
				var productoServicio = producto.productoServicio;
				var unidMedida = producto.unidad_medida;
				var tipoProducto = $scope.tipoProducto;
				var grupo = producto.grupo;
				var productosBase = [];
				var imagen = "./img/icon-producto-default.png"
				var tiposPrecio = [];
				blockUI.start();
				var promesa = AgregarProducto({ id_empresa, codigo, nombre, unidMedida, tipoProducto, grupo, productosBase, imagen, tiposPrecio,activEconomica, productoServicio});
				promesa.then(function (dato) {
					blockUI.stop();
					$scope.cerrarVentanaAnadirProducto();
					SweetAlert.swal("Guardado!", "Se guardaron los datos del producto", "success");
					$scope.detalleCompra.producto.nombre = "";
					$scope.nuevoProducto = ''
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
						SweetAlert.swal("", "Parece que el usuario actual no cuenta con grupos de productos.", "warning");
					}
				}).catch(function (err) {

					$scope.gruposProducto = []
				})
			}

			$scope.obtenerTipoProducto = function () {
				blockUI.start();
				var promesa = ClasesTipo("TPS");
				promesa.then(function (entidad) {
					$scope.tipoProductos = entidad.clases;
					$scope.tipoProducto = $.grep($scope.tipoProductos, function (e) { return e.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_BASE; })[0];
					blockUI.stop();
				});
			}
			$scope.abrirDialogConceptoEdicion = function (tipo) {
				$scope.tipo_edicion = tipo;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalConceptoEdicion);
			}
			$scope.cerrarDialogConceptoEdicion = function () {
				$scope.cerrarPopup($scope.idModalConceptoEdicion);
			}
			$scope.obtenerCalifiacinesProveedor = async function (nuevo) {
				var entidad = await ClasesTipoEmpresa("PVDCAL", $scope.usuario.id_empresa);
				$scope.TipoCalifiacion = entidad
				if (nuevo) {
					$scope.compra.detalleCalifiacionProveedor = []
					for (const iterator of $scope.TipoCalifiacion.clases) {
						califiacion = { valor: true, concepto: iterator, id_concepto: iterator.id, id_compra: null, puntuacion: 10 }
						$scope.compra.detalleCalifiacionProveedor.push(califiacion)
					}
					$scope.calcularTotalCalificacion()

				}
			}
			$scope.calcularTotalCalificacionProv = function () {
				$scope.totalCalProv = 0
				for (const calificacion of $scope.configCalifiacionProveedor) {
					$scope.totalCalProv += calificacion.porcentaje
				}
			}
			$scope.calcularTotalCalificacion = function () {
				contador_habilitados = 0
				for (const iterator of $scope.compra.detalleCalifiacionProveedor) {
					if (iterator.concepto.habilitado) contador_habilitados++
				}
				valorPorcentualPorCalificacion = 100 / contador_habilitados
				$scope.compra.calificacion_proveedor = 0
				for (const cal of $scope.compra.detalleCalifiacionProveedor) {
					if (cal.valor == true) {
						$scope.compra.calificacion_proveedor = $scope.compra.calificacion_proveedor + valorPorcentualPorCalificacion
					}
				}
			}
			$scope.abrirModalDetalleEvaluacionProveedores = function () {
				$scope.buscarCalifiaciones()
				$scope.abrirPopup($scope.idModalDetalleEvaluacionProveedores);
			}
			$scope.cerrarModalDetalleEvaluacionProveedores = function () {
				$scope.cerrarPopup($scope.idModalDetalleEvaluacionProveedores);
			}
			$scope.abrirModalConfigEvaluacionProveedores = async function () {
				try {
					await $scope.obtenerCalifiacinesProveedor(false)
					$scope.configCalifiacionProveedor = await $scope.buscarConfigCalifiaciones()
					if ($scope.configCalifiacionProveedor.length != $scope.TipoCalifiacion.clases.length) {
						for (const iterator of $scope.TipoCalifiacion.clases) {
							let conf = $scope.configCalifiacionProveedor.find(x => x.id_concepto == iterator.id)
							if (!conf) {
								califiacion = { valor: false, concepto: iterator, id_concepto: iterator.id, id_compra: null }
								$scope.configCalifiacionProveedor.push(califiacion)
							}
						}
					}
					$scope.calcularTotalCalificacionProv()
					$scope.abrirPopup($scope.idModalConfigEvaluacionProveedores)
				} catch (error) {
					console.log(error)
				}
				$scope.$evalAsync()
			}
			$scope.guardarConfiguracionEvalProv = async function () {
				try {
					let res = await GuardarConfiguracionEvalProv($scope.configCalifiacionProveedor, $scope.usuario.id_empresa)
					$scope.mostrarMensaje(res.mensaje)
					$scope.cerrarModalConfigEvaluacionProveedores()
					$scope.$evalAsync()
				} catch (error) {

				}
			}
			$scope.buscarConfigCalifiaciones = async function () {
				let res = await BuscarConfigCalifiaciones($scope.usuario.id_empresa)
				return res.configuraciones ? res.configuraciones : []
			}
			$scope.cerrarModalConfigEvaluacionProveedores = function () {
				$scope.cerrarPopup($scope.idModalConfigEvaluacionProveedores)
			}
			$scope.buscarCalifiaciones = function (filtro) {
				$scope.paginatorCalificacionProveedor = Paginator();
				$scope.paginatorCalificacionProveedor.column = "razon_social";
				$scope.paginatorCalificacionProveedor.direction = "asc";
				if (filtro) {
					$scope.filtroCal = filtro
				} else {
					$scope.filtroCal = {
						id_sucursal: "",
						fecha_inicio: "",
						fecha_fin: ""
					}
				}
				$scope.paginatorCalificacionProveedor.callBack = $scope.buscarCalifiacionesProveedores;
				$scope.paginatorCalificacionProveedor.getSearch("", $scope.filtroCal, null);
			}

			$scope.buscarCalifiacionesProveedores = function () {
				var promesa = BuscarCalifiacionesProveedores($scope.paginatorCalificacionProveedor)
				promesa.then(function (data) {
					$scope.calificacionProveedores = data.proveedores
					$scope.paginatorCalificacionProveedor.setPages(data.paginas);
				})

			}
			$scope.imprimirPdfCalificacionProveedor = function (id) {
				var promesa = DetallesCalifiacionProveedor(id)
				promesa.then(function (data) {
					$scope.reporteCalificacionProveedor(data.compras)
				})
			}
			$scope.reporteCalificacionProveedor = function (compras) {
				var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
				var stream = doc.pipe(blobStream());
				var y = 135, itemsPorPagina = 25, items = 0, pagina = 1, totalPaginas = Math.ceil(compras.length / itemsPorPagina);

				$scope.dibujarCabeceraImpresionPDFCalificacionProveedor(doc, compras, pagina, totalPaginas);
				var index = 0;
				for (var i = 0; i < compras.length; i++) {
					var compra = compras[i]
					doc.font("Helvetica", 8);
					doc.text(i + 1, 40, y);
					doc.text($scope.fechaATexto(new Date(compra.fecha)), 100, y);
					doc.text(compra.factura, 200, y);
					doc.text(compra.total_calificacion, 300, y);

					y = y + 20;

					items = items + 1;

					if (items == itemsPorPagina) {
						doc.addPage({ size: [612, 792], margin: 10 });
						y = 135;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraImpresionPDFCalificacionProveedor(doc, compras, pagina, totalPaginas);
					}
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}

			$scope.dibujarCabeceraImpresionPDFCalificacionProveedor = function (doc, compras, pagina, totalPaginas) {

				doc.font("Helvetica-Bold", 17);
				doc.text("PROMEDIOS", 0, 35, { align: 'center' });
				doc.font("Helvetica", 10);
				if ($scope.paginatorCalificacionProveedor.filter.fecha_inicio != 0 && $scope.paginatorCalificacionProveedor.filter.fecha_fin != 0) {
					doc.text("Desde: " + $scope.paginatorCalificacionProveedor.filter.fecha_inicio + " Hasta: " + $scope.paginatorCalificacionProveedor.filter.fecha_fin, 0, 55, { align: 'center' });
				}
				doc.font("Helvetica-Bold", 10);
				doc.text(compras[0].razon_social, 0, 75, { align: 'center' });
				doc.font("Helvetica-Bold", 8);
				doc.text("Nº", 40, 110);
				doc.text("Fecha", 110, 110);
				doc.text("Factura", 200, 110);
				doc.text("Califiacación", 285, 110)
				doc.rect(35, 95, 540, 30).stroke();

			}

			$scope.reporteExcelCalificacionProveedores = function () {
				blockUI.start();
				var data = [["N°", "PROVEEDOR", "CALIFIACACIÓN"]];
				var index = 0;
				for (var i = 0; i < $scope.calificacionProveedores.length; i++) {
					var calificacion = $scope.calificacionProveedores[i]
					var columns = [];
					columns.push(i + 1);
					columns.push(calificacion.razon_social);
					columns.push(calificacion.total_calificacion)


					data.push(columns);

				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-CALIFICACIONES-PROVEEDORES.xlsx");
				blockUI.stop();
			}
			$scope.reportePdfCalificacionProveedores = function (calificacionProveedores) {
				var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
				var stream = doc.pipe(blobStream());
				var y = 135, itemsPorPagina = 25, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.calificacionProveedores.length / itemsPorPagina);

				$scope.dibujarCabeceraImpresionPdfCalificacionProveedores(doc, pagina, totalPaginas);
				var index = 0;
				for (var i = 0; i < $scope.calificacionProveedores.length; i++) {
					var compra = $scope.calificacionProveedores[i]
					doc.font("Helvetica", 8);
					doc.text(i + 1, 40, y);
					doc.text(compra.razon_social, 100, y);
					doc.text(compra.total_calificacion, 370, y);

					y = y + 20;

					items = items + 1;

					if (items == itemsPorPagina) {
						doc.addPage({ size: [612, 792], margin: 10 });
						y = 135;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraImpresionPdfCalificacionProveedores(doc, pagina, totalPaginas);
					}
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}

			$scope.dibujarCabeceraImpresionPdfCalificacionProveedores = function (doc, pagina, totalPaginas) {

				doc.font("Helvetica-Bold", 17);
				doc.text("PROMEDIOS", 0, 35, { align: 'center' });
				doc.font("Helvetica", 10);
				if ($scope.paginatorCalificacionProveedor.filter.fecha_inicio != 0 && $scope.paginatorCalificacionProveedor.filter.fecha_fin != 0) {
					doc.text("Desde: " + $scope.paginatorCalificacionProveedor.filter.fecha_inicio + " Hasta: " + $scope.paginatorCalificacionProveedor.filter.fecha_fin, 0, 55, { align: 'center' });
				}
				doc.font("Helvetica-Bold", 8);
				doc.text("Nº", 40, 110);
				doc.text("Proveedor", 100, 110);
				doc.text("Califiacación", 350, 110)
				doc.rect(35, 95, 540, 30).stroke();

			}
			$scope.reporteGraficoCalificacionProveedor = function (grafico) {
				if (!grafico) {
					grafico = $scope.arregloTipoGrafico.find(function (x) {
						return x.tipo == "column"
					})
				}
				var data = []
				for (const iterator of $scope.calificacionProveedores) {
					var cal = { label: iterator.razon_social, y: iterator.total_calificacion }
					data.push(cal)
				}
				var chart = new CanvasJS.Chart("chartContainer", {
					title: {
						text: "Reporte Gráfico" + grafico.nombre,
						fontColor: '#6DBCEB'
					},
					legend: {
						horizontalAlign: "right", // left, center ,right 
						verticalAlign: "center",  // top, center, bottom
						fontSize: 14,
					},
					animationEnabled: true,
					exportEnabled: true,
					width: 1100,

					axisX: {
						gridColor: "Silver",
						tickColor: "silver",
						valueFormatString: "DD/MM/YY",
						titleFontSize: 8,

					},
					theme: "theme1",
					axisY: {
						gridColor: "Silver",
						tickColor: "silver"
					},
					data: [
						{
							// Change type to "doughnut", "line", "splineArea", etc.
							type: grafico.tipo,
							dataPoints: data

						}
					]
				});
				chart.render();
				$scope.abrirModalGraficoEvaluacionProveedores()
			}
			$scope.abrirModalGraficoEvaluacionProveedores = function () {
				$scope.abrirPopup($scope.idModalGraficoEvaluacionProveedores);
			}
			$scope.cerrarModalGraficoEvaluacionProveedores = function () {
				$scope.cerrarPopup($scope.idModalGraficoEvaluacionProveedores);
			}
			$scope.iniciarImpresionIso = (compra) => {
				const { detallesCompra } = compra
				let servicio = detallesCompra[0].producto.codigo ? false : true;
				servicio ? $scope.printIsoDocServicio(compra) : $scope.printIsoDoc(compra);
			}
			$scope.printIsoDoc = async function (compra) {
				convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
					if (!compra.configuracionesIso) {
						SweetAlert.swal("", "<b>Documento generado sin ISO</b><br><small>La Sucursal <b>" + compra.almacen.sucursal.nombre + "</b> no tenia configurado ISO cuando se generó la compra</small>", "warning");
					} else {
						blockUI.start();
						var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
						var y = 212, itemsPorPagina = 45, items = 0, pagina = 1, totalPaginas = Math.ceil((compra.detallesCompra.length + 15) / itemsPorPagina);
						if (25 >= compra.detallesCompra.length) {
							itemsPorPagina = 30;
						}
						else {
							itemsPorPagina = 35;
						}
						$scope.dibujarCabeceraPDFCompraIso(doc, pagina, totalPaginas, compra, imagenEmpresa, compra.configuracionesIso);
						var totalIso = 0;
						for (var i = 0; i < compra.detallesCompra.length; i++) {
							doc.rect(60, y, 507, 15).stroke();
							doc.rect(146.19, y, 0, 15).stroke();
							doc.rect(293.22, y, 0, 15).stroke();
							doc.rect(333.78, y, 0, 15).stroke();
							doc.rect(379.41, y, 0, 15).stroke();
							doc.rect(425.04, y, 0, 15).stroke();
							doc.rect(480.81, y, 0, 15).stroke();
							detalle = compra.detallesCompra[i]
							var total = detalle.total;

							// detalle.cantidad ? detalle.precio_unitario ? total = detalle.cantidad * detalle.costo_unitario : total = detalle.importe : total = detalle.importe;
							// if (detalle.descuento) total -= detalle.descuento;
							// if (detalle.recargo) total += detalle.recargo;
							if (detalle.ice) total += detalle.ice;
							var pu = total / detalle.cantidad;
							totalIso += total;
							doc.font('Bookman', 6);
							doc.text(detalle.producto ? detalle.producto.codigo ? detalle.producto.codigo : '' : '', 60, y + 4, { width: 86, align: "center" });
							if (detalle.producto) {
								if (detalle.producto.nombre.length > 28 && detalle.producto.nombre.length < 56) {
									doc.text(detalle.producto ? detalle.producto.nombre.toUpperCase() : "", 148, y + 3, { width: 145 });
								} else if (detalle.producto.nombre.length >= 56) {
									doc.text(detalle.producto ? detalle.producto.nombre.toUpperCase() : "", 148, y + 2, { width: 145 });
								} else {
									doc.text(detalle.producto ? detalle.producto.nombre.toUpperCase() : "", 148, y + 4, { width: 145 });
								}
							}
							doc.text(detalle.producto ? detalle.producto.unidad_medida ? detalle.producto.unidad_medida : '' : '', 294.22, y + 4, { width: 40, align: "center" });
							doc.text(detalle.cantidad ? number_format_negativo_to_positvo(detalle.cantidad, 2) : '', 333.78, y + 4, { width: 42, align: "right" });
							doc.text(pu ? number_format_negativo_to_positvo(pu, 2) : '', 379.41, y + 4, { width: 42, align: "right" });
							doc.text(number_format_negativo_to_positvo(total, 2), 425.04, y + 4, { width: 52, align: "right" });
							if (detalle.observacion) {
								if (detalle.observacion.length > 40 && detalle.observacion.length < 80) {
									doc.font('Bookman', 5);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 3, { width: 84 });
								} else if (detalle.observacion.length >= 80) {
									doc.font('Bookman', 4);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 2, { width: 84 });
								} else {
									doc.font('Bookman', 6);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 4, { width: 84 });
								}
							}
							doc.font('Bookman', 6);
							y = y + 15;
							items++;
							if (i === compra.detallesCompra.length - 1) {
								doc.rect(425.04, y, 55.77, 15).stroke();
								doc.font("Bookman-Bold", 8);
								doc.text("Total Compra  ", 333.78, y + 3, { width: 89, align: "right" });
								doc.text(number_format_negativo_to_positvo(totalIso, 2), 425.04, y + 3, { width: 52, align: "right" });
							}
							if (items === itemsPorPagina && pagina != totalPaginas) {
								doc.addPage({ size: "letter", margin: 10, compress: false });
								pagina = pagina + 1;
								items = 0;
								y = 60;
								if (pagina != totalPaginas) itemsPorPagina = 45;
								if (pagina === totalPaginas) itemsPorPagina = 35;
								doc.font('Bookman-Bold', 8);
								doc.text('´', 291, 745);
								doc.font('Bookman-Italic-Bold', 8);
								doc.text('Pagina', 284, 745);
								doc.text(pagina + ' de ' + totalPaginas, 317, 745);
							}

						}
						if (pagina === 1 && compra.detallesCompra.length > 30 && compra.detallesCompra.length <= 35) {
							doc.addPage({ size: "letter", margin: 10, compress: false });
							y = 60;
							items = 0;
							pagina = pagina + 1;
						}
						if (pagina === totalPaginas - 1 && items > 35 && items < 40) {
							doc.addPage({ size: "letter", margin: 10, compress: false });
							y = 60;
							items = 0;
							pagina = pagina + 1;
						}
						if (pagina === totalPaginas) {
							doc.font('Bookman-Bold', 9);
							doc.text('--------------------------------------------', 60, 712, { width: 507, align: 'center' })
							doc.text("Responsable del Ingreso", 60, 720, { width: 507, align: "center" });
							doc.font('Bookman-Bold', 8);
							doc.text('´', 291, 745);
							doc.font('Bookman-Italic-Bold', 8);
							doc.text('Pagina', 284, 745);
							doc.text(pagina + ' de ' + totalPaginas, 317, 745);
							doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(compra.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(compra.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
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
				doc.font('Bookman-Bold', 9);
				doc.text("Almacén: ", 60, y);
				doc.text("Nº: ", 341, y, { width: 90, align: "right" });
				doc.font('Bookman', 9);
				if (dato.almacen) doc.text(dato.almacen.nombre ? dato.almacen.nombre.length <= 51 ? dato.almacen.nombre.toUpperCase() : dato.almacen.nombre.slice(0, 50).toUpperCase() + '...' : "", 110, y);
				doc.text(dato.numero_iso_compra ? dato.numero_iso_compra : '', 438, y);
				y += 15;
				doc.font('Bookman-Bold', 9);
				doc.text("Descripción: ", 60, y);
				doc.text("Fecha documento: ", 341, y, { width: 90, align: "right" });
				doc.font('Bookman', 9);
				if (dato.observacion) doc.text(dato.observacion.length <= 39 ? dato.observacion.toUpperCase() : dato.observacion.slice(0, 38).toUpperCase() + '...', 120, y);
				doc.text(dato.fecha ? $scope.fechaATexto(dato.fecha) : '', 438, y);
				y += 15;
				doc.font('Bookman-Bold', 10);
				doc.text("Proveedor: ", 60, y);
				doc.font('Bookman', 9);
				doc.text(dato.proveedor ? dato.proveedor.razon_social : '', 120, y, { width: 447 });
				y += 27;
				doc.font('Bookman', 9);
				//tabla
				doc.rect(60, y, 507, 25).stroke();
				doc.rect(146.19, y, 0, 25).stroke();
				doc.rect(293.22, y, 0, 25).stroke();
				doc.rect(333.78, y, 0, 25).stroke();
				doc.rect(379.41, y, 0, 25).stroke();
				doc.rect(425.04, y, 0, 25).stroke();
				doc.rect(480.81, y, 0, 25).stroke();
				//Cabecera Detalle
				doc.font('Bookman-Italic-Bold', 9);
				doc.text("Codigo del articulo", 60, y + 3, { width: 86, align: "center" });
				doc.font('Bookman-Bold', 9);
				doc.text('´', 85, y + 3);
				doc.text('´', 99.3, y + 15);
				doc.font('Bookman-Bold', 9);
				doc.text("Descripción", 147, y + 7, { width: 145, align: 'center' });
				doc.text("Unidad", 293.22, y + 7, { width: 40.56, align: "center" });
				doc.text("Cantidad", 333.78, y + 7, { width: 45.63, align: "center" });
				doc.text("Precio", 379.41, y + 7, { width: 45.63, align: "center" });
				doc.text("Total", 425.04, y + 7, { width: 55.77, align: "center" });
				doc.font('Bookman-Italic-Bold', 9);
				doc.text("Observacion", 482, y + 7, { width: 84, align: "center" });
				doc.font('Bookman-Bold', 9);
				doc.text('´', 543, y + 7);
				if (pagina != totalPaginas) {
					doc.font('Bookman-Bold', 8);
					doc.text('´', 291, 745);
					doc.font('Bookman-Italic-Bold', 8);
					doc.text('Pagina', 284, 745);
					doc.text(pagina + ' de ' + totalPaginas, 317, 745);
				}
				doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(dato.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
			};
			$scope.printIsoDocServicio = async function (compra) {
				convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
					if (!compra.configuracionesIso) {
						SweetAlert.swal("", "<b>Documento generado sin ISO</b><br><small>La Sucursal <b>" + compra.almacen.sucursal.nombre + "</b> no tenia configurado ISO cuando se generó la compra</small>", "warning");
					} else {
						blockUI.start();
						var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
						var y = 212, itemsPorPagina = 45, items = 0, pagina = 1, totalPaginas = Math.ceil((compra.detallesCompra.length + 15) / itemsPorPagina);
						if (25 >= compra.detallesCompra.length) {
							itemsPorPagina = 30;
						}
						else {
							itemsPorPagina = 35;
						}
						doc.lineGap(-2)
						$scope.dibujarCabeceraPDFCompraServicioIso(doc, pagina, totalPaginas, compra, imagenEmpresa, compra.configuracionesIso);
						var totalIso = 0;
						for (var i = 0; i < compra.detallesCompra.length; i++) {
							doc.rect(60, y, 507, 15).stroke();
							doc.rect(293.22, y, 0, 15).stroke();
							doc.rect(333.78, y, 0, 15).stroke();
							doc.rect(379.41, y, 0, 15).stroke();
							doc.rect(425.04, y, 0, 15).stroke();
							doc.rect(480.81, y, 0, 15).stroke();
							detalle = compra.detallesCompra[i]
							var total = 0;

							detalle.cantidad ? detalle.precio_unitario ? total = detalle.cantidad * detalle.costo_unitario : total = detalle.importe : total = detalle.importe;
							if (detalle.descuento) total -= detalle.descuento;
							if (detalle.recargo) total += detalle.recargo;
							var pu = total / detalle.cantidad;
							totalIso += total;
							doc.font('Bookman', 6);
							if (detalle.producto) {
								if (detalle.producto.nombre.length < 53) {
									doc.text(detalle.producto ? detalle.producto.nombre.toUpperCase() : "", 62, y + 4, { width: 231.22 });
								} else {
									doc.text(detalle.producto ? detalle.producto.nombre.toUpperCase() : "", 62, y + 1, { width: 231.22 });
								}
							}
							doc.text(detalle.producto ? detalle.producto.unidad_medida ? detalle.producto.unidad_medida : '' : '', 294.22, y + 4, { width: 40, align: "center" });
							doc.text(detalle.cantidad ? number_format_negativo_to_positvo(detalle.cantidad, 2) : '', 333.78, y + 4, { width: 42, align: "right" });
							doc.text(pu ? number_format_negativo_to_positvo(pu, 2) : '', 379.41, y + 4, { width: 42, align: "right" });
							doc.text(number_format_negativo_to_positvo(total, 2), 425.04, y + 4, { width: 52, align: "right" });
							if (detalle.observacion) {
								if (detalle.observacion.length > 40 && detalle.observacion.length < 80) {
									doc.font('Bookman', 5);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 3, { width: 84 });
								} else if (detalle.observacion.length >= 80) {
									doc.font('Bookman', 4);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 2, { width: 84 });
								} else {
									doc.font('Bookman', 6);
									doc.text(detalle.observacion ? detalle.observacion.toUpperCase() : "", 482, y + 4, { width: 84 });
								}
							}
							doc.font('Bookman', 6);
							y = y + 15;
							items++;
							if (i === compra.detallesCompra.length - 1) {
								doc.rect(425.04, y, 55.77, 15).stroke();
								doc.font("Bookman-Bold", 8);
								doc.text("Total Compra  ", 333.78, y + 3, { width: 89, align: "right" });
								doc.text(number_format_negativo_to_positvo(totalIso, 2), 425.04, y + 3, { width: 52, align: "right" });
							}
							if (items === itemsPorPagina && pagina != totalPaginas) {
								doc.addPage({ size: "letter", margin: 10, compress: false });
								pagina = pagina + 1;
								items = 0;
								y = 60;
								if (pagina != totalPaginas) itemsPorPagina = 45;
								if (pagina === totalPaginas) itemsPorPagina = 35;
								doc.font('Bookman-Bold', 8);
								doc.text('´', 291, 745);
								doc.font('Bookman-Italic-Bold', 8);
								doc.text('Pagina', 284, 745);
								doc.text(pagina + ' de ' + totalPaginas, 317, 745);
							}

						}
						if (pagina === 1 && compra.detallesCompra.length > 30 && compra.detallesCompra.length <= 35) {
							doc.addPage({ size: "letter", margin: 10, compress: false });
							y = 60;
							items = 0;
							pagina = pagina + 1;
						}
						if (pagina === totalPaginas - 1 && items > 35 && items < 40) {
							doc.addPage({ size: "letter", margin: 10, compress: false });
							y = 60;
							items = 0;
							pagina = pagina + 1;
						}
						if (pagina === totalPaginas) {
							doc.font('Bookman-Bold', 9);
							doc.text('--------------------------------------------', 60, 712, { width: 507, align: 'center' })
							doc.text("Responsable del Ingreso", 60, 720, { width: 507, align: "center" });
							doc.font('Bookman-Bold', 8);
							doc.text('´', 291, 745);
							doc.font('Bookman-Italic-Bold', 8);
							doc.text('Pagina', 284, 745);
							doc.text(pagina + ' de ' + totalPaginas, 317, 745);
							doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(compra.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(compra.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
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
			$scope.dibujarCabeceraPDFCompraServicioIso = function (doc, pagina, totalPaginas, dato, imagenEmpresa, configuracionIso) {
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
				doc.font('Bookman-Bold', 9);
				doc.text("Almacén: ", 60, y);
				doc.text("Nº: ", 341, y, { width: 90, align: "right" });
				doc.font('Bookman', 9);
				if (dato.almacen) doc.text(dato.almacen.nombre ? dato.almacen.nombre.length <= 51 ? dato.almacen.nombre.toUpperCase() : dato.almacen.nombre.slice(0, 50).toUpperCase() + '...' : "", 110, y);
				doc.text(dato.numero_iso_compra ? dato.numero_iso_compra : '', 438, y);
				y += 15;
				doc.font('Bookman-Bold', 9);
				doc.text("Descripción: ", 60, y);
				doc.text("Fecha documento: ", 341, y, { width: 90, align: "right" });
				doc.font('Bookman', 9);
				if (dato.observacion) doc.text(dato.observacion.length <= 39 ? dato.observacion.toUpperCase() : dato.observacion.slice(0, 38).toUpperCase() + '...', 120, y);
				doc.text(dato.fecha ? $scope.fechaATexto(dato.fecha) : '', 438, y);
				y += 15;
				doc.font('Bookman-Bold', 10);
				doc.text("Proveedor: ", 60, y);
				doc.font('Bookman', 9);
				doc.text(dato.proveedor ? dato.proveedor.razon_social : '', 120, y, { width: 447 });
				y += 27;
				doc.font('Bookman', 9);
				//tabla
				doc.rect(60, y, 507, 25).stroke();
				doc.rect(293.22, y, 0, 25).stroke();
				doc.rect(333.78, y, 0, 25).stroke();
				doc.rect(379.41, y, 0, 25).stroke();
				doc.rect(425.04, y, 0, 25).stroke();
				doc.rect(480.81, y, 0, 25).stroke();
				//Cabecera Detalle
				doc.font('Bookman-Bold', 9);
				doc.text("Descripción", 60, y + 7, { width: 233.22, align: 'center' });
				doc.text("Unidad", 293.22, y + 7, { width: 40.56, align: "center" });
				doc.text("Cantidad", 333.78, y + 7, { width: 45.63, align: "center" });
				doc.text("Precio", 379.41, y + 7, { width: 45.63, align: "center" });
				doc.text("Total", 425.04, y + 7, { width: 55.77, align: "center" });
				doc.font('Bookman-Italic-Bold', 9);
				doc.text("Observacion", 482, y + 7, { width: 84, align: "center" });
				doc.font('Bookman-Bold', 9);
				doc.text('´', 543, y + 7);
				if (pagina != totalPaginas) {
					doc.font('Bookman-Bold', 8);
					doc.text('´', 291, 745);
					doc.font('Bookman-Italic-Bold', 8);
					doc.text('Pagina', 284, 745);
					doc.text(pagina + ' de ' + totalPaginas, 317, 745);
				}
				doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(dato.createdAt) + '      ' + 'Actualizado: ' + $scope.formatoFechaHora(dato.updatedAt) + '      ' + 'Impreso: ' + $scope.formatoFechaHora() + '       ' + 'Impreso por: ' + $scope.usuario.nombre_usuario, 0, 765, { width: 612, align: 'center' });
			};
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalWizardCompraEdicion);
				$scope.eliminarPopup($scope.idModalWizardCompraVista);
				$scope.eliminarPopup($scope.idModalEliminarCompra);
				$scope.eliminarPopup($scope.idModalPago);
				$scope.eliminarPopup($scope.idModalServicios);
				$scope.eliminarPopup($scope.idModalPedidos);
				$scope.eliminarPopup($scope.idModalDetallePedidos);
				$scope.eliminarPopup($scope.idModalEliminarPedido);
				$scope.eliminarPopup($scope.idModalEliminarProductoPedido);
				$scope.eliminarPopup($scope.ModalMensajePago);
				$scope.eliminarPopup($scope.VentanaProductos);
				$scope.eliminarPopup($scope.idModalConceptoEdicion);
				$scope.eliminarPopup($scope.idModalDetalleEvaluacionProveedores);
				$scope.eliminarPopup($scope.idModalGraficoEvaluacionProveedores);
				$scope.eliminarPopup($scope.idModalConfigEvaluacionProveedores); 
			});
			$scope.generarReportePrecios = () => {
				blockUI.start();
				const prom = obtenerReportePrecios($scope.usuario.id_empresa)
				prom.then((reporte) => {
					if (reporte.hasErr) {
						blockUI.stop();
						return alert(reporte.mensaje)
					}
					const ws_name = "SheetJS";
					const wb = new Workbook(), ws = sheet_from_array_of_arrays(reporte.reporte);
					ws['!cols'] = [
						{ wch: 12 }, //código
						{ wch: 36 }, // descripción
						{ wch: 12 }, // unidad
						{ wch: 20 }, // grupo
						{ wch: 20 }, // subgrupo
						{ wch: 16 }, // último precio
						{ wch: 16 } // promedio
					];
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-PRECIOS.xlsx");
					blockUI.stop();
				}).catch((err) => {
					blockUI.stop();
					const msg = err.stack || 'Se perdió la conexión.'
					alert(msg)
				})
			}

			$scope.generarSerie = function (detalleCompra, nuevo) {
				let serieGenerado = "";
				if (nuevo) {
					// para generar nueva serie =============
					let today = new Date();
					// fecha
					let month = (today.getMonth() + 1).toString().padStart(2, "0");
					let day = today.getDate().toString().padStart(2, "0");
					let date = day + month + today.getFullYear().toString();
					// hora
					let hours = today.getHours().toString().padStart(2, "0");
					let minutes = today.getMinutes().toString().padStart(2, "0");
					let seconds = today.getSeconds().toString().padStart(2, "0");
					let time = hours + minutes + seconds;
					// serie
					serieGenerado = date + time;
					detalleCompra.lote = serieGenerado;
				} else {
					serieGenerado = detalleCompra.inventario ? detalleCompra.inventario.lote : detalleCompra.lote;
				}

				let doc = new PDFDocument({ compress: false, margin: 10 });
				let stream = doc.pipe(blobStream());

				doc.font('Helvetica', 8);
				doc.text("Item: " + detalleCompra.producto.nombre, 0, 25, { align: "center" });
				doc.text("Codigo: " + detalleCompra.producto.codigo, 0, 40, { align: "center" });

				try {
					let canvas = document.createElement('canvas');
					bwipjs.toCanvas(canvas, {
						bcid: 'code128',
						text: serieGenerado,
						scale: 10,
						height: 10,
						includetext: true,
						textxalign: 'center',
					});
					doc.image(canvas.toDataURL('image/png'), 100, 200, { width: 408 });
				} catch (e) {
					console.log("error ", e);
				}

				doc.end();
				stream.on('finish', function () {
					let fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});

			}
			$scope.generarSerieProduccion = async function (detalleCompra, nuevo) {
				try {

					let serieGenerado = "";
					let correlativo = (1).toString().padStart(3, "0");
					if ($scope.compra.detallesCompra.length == 0) {
						let data = await UltimoCorrelativoDetalleProduccion(new Date($scope.convertirFecha($scope.compra.fechaTexto)), $scope.compra.almacen.id)
						correlativo = data.correlativo ? data.correlativo : 1
						if (data.correlativo) correlativo++
						correlativo = (correlativo).toString().padStart(3, "0");
					} else {
						correlativo = (parseInt($scope.compra.detallesCompra[$scope.compra.detallesCompra.length - 1].correlativo_produccion) + 1).toString().padStart(3, "0");
					}
					if (nuevo) {
						// para generar nueva serie =============
						let today = new Date();
						// fecha
						let month = (today.getMonth() + 1).toString().padStart(2, "0");
						let day = today.getDate().toString().padStart(2, "0");
						let date = day + month + today.getFullYear().toString().substr(-2);
						//precio 
						let total = $scope.detalleCompra.producto.precio_unitario
						let totalSeparado = total.toFixed(2).toString().split('.')
						let decimales = '00'
						if (totalSeparado.length > 1) {
							total = totalSeparado[0]
							if (total.length < 3) {
								total = totalSeparado[0].padStart(3, "0")
							}
							decimales = totalSeparado[1].padStart(2, "0")
						} else {
							total = totalSeparado[0].padStart(3, "0")
						}
						let precio = total + decimales
						//perso
						let peso = $scope.detalleCompra.cantidad.toFixed(2).toString()
						let cantidadSeparado = peso.split('.')
						decimales = '00'
						if (cantidadSeparado.length > 1) {
							peso = cantidadSeparado[0]
							if (peso.length < 3) {
								peso = cantidadSeparado[0].padStart(3, "0")
							}
							decimales = cantidadSeparado[1].padStart(2, "0")
						} else {
							peso = cantidadSeparado[0].padStart(3, "0")
						}
						peso = peso + decimales
						// serie

						serieGenerado = correlativo + date + peso + precio;
						detalleCompra.lote = serieGenerado;
						detalleCompra.correlativo_produccion = correlativo
					} else {
						serieGenerado = detalleCompra.inventario ? detalleCompra.inventario.lote : detalleCompra.lote;
					}

					let doc = new PDFDocument({ size: [612, 353], compress: false, margin: 10 });
					let stream = doc.pipe(blobStream());

					doc.font('Helvetica', 8);
					doc.text("Item: " + detalleCompra.producto.nombre, 0, 25, { align: "center" });
					doc.text("Codigo: " + detalleCompra.producto.codigo, 0, 40, { align: "center" });
					let canvas = document.createElement('canvas');
					bwipjs.toCanvas(canvas, {
						bcid: 'code128',
						text: serieGenerado,
						scale: 10,
						height: 10,
						includetext: true,
						textxalign: 'center',
					});
					doc.image(canvas.toDataURL('image/png'), 100, 200, { width: 408 });


					doc.end();
					stream.on('finish', function () {
						let fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					$scope.verificarProducto($scope.detalleCompra)
				} catch (error) {
					console.log(error)
				}

			}
			$scope.calcularTotalPedido = (data) => {
				if (data) {
					$scope.totalPedido = data.reduce((a, v) => {
						if (v.detalleCompra) {
							return (a + (v.detalleCompra.cantidad_parcial * v.detalleCompra.costo_unitario))
						}
						return a + (v.cantidad * v.costo_unitario)
					}, 0);
				}
			}
			$scope.asignarDescuentos = () => {
				var total = $scope.pedido.detallesPedido.reduce((ar, val) => ar + val.detalleCompra.importe, 0)
				$scope.pedido.totalDesc = 0;
				if ($scope.pedido.detallesPedido) {
					for (let i = 0; i < $scope.pedido.detallesPedido.length; i++) {
						if ($scope.pedido.tipoDescuento) {
							var desc = ($scope.pedido.detallesPedido[i].detalleCompra.importe) * ($scope.pedido.descGrl / 100);
							$scope.pedido.detallesPedido[i].detalleCompra.descuento = Math.round((Number(desc)) * 1000) / 1000;
							$scope.pedido.totalDesc += $scope.pedido.detallesPedido[i].detalleCompra.descuento;
						} else {
							var desc = (($scope.pedido.detallesPedido[i].detalleCompra.importe) / total) * $scope.pedido.descGrl;
							$scope.pedido.detallesPedido[i].detalleCompra.descuento = Math.round((Number(desc)) * 1000) / 1000;
							$scope.pedido.totalDesc += $scope.pedido.detallesPedido[i].detalleCompra.descuento;
						}
					}
				} else {
					SweetAlert.swal("", "El pedido no tiene detalle", "warning");
				}

			}
			$scope.asignarRecargo = () => {
				var total = $scope.pedido.detallesPedido.reduce((ar, val) => ar + val.detalleCompra.importe, 0)
				$scope.pedido.totalRec = 0;
				if ($scope.pedido.detallesPedido) {
					for (let i = 0; i < $scope.pedido.detallesPedido.length; i++) {
						if ($scope.pedido.tipoRecargo) {
							var rec = ($scope.pedido.detallesPedido[i].detalleCompra.importe) * ($scope.pedido.recGrl / 100);
							$scope.pedido.detallesPedido[i].detalleCompra.recargo = Math.round((Number(rec)) * 1000) / 1000;
							$scope.pedido.totalRec += $scope.pedido.detallesPedido[i].detalleCompra.recargo;
						} else {
							var rec = (($scope.pedido.detallesPedido[i].detalleCompra.importe) / total) * $scope.pedido.recGrl;
							$scope.pedido.detallesPedido[i].detalleCompra.recargo = Math.round((Number(rec)) * 1000) / 1000;
							$scope.pedido.totalRec += $scope.pedido.detallesPedido[i].detalleCompra.recargo;
						}
					}
				} else {
					SweetAlert.swal("", "El pedido no tiene detalle", "warning");
				}

			}
			$scope.asignarIce = () => {
				var total = $scope.pedido.detallesPedido.reduce((ar, val) => ar + val.detalleCompra.importe, 0)
				$scope.pedido.totalIce = 0;
				if ($scope.pedido.detallesPedido) {
					for (let i = 0; i < $scope.pedido.detallesPedido.length; i++) {
						var ice = (($scope.pedido.detallesPedido[i].detalleCompra.importe) / total) * $scope.pedido.iceGrl;
						$scope.pedido.detallesPedido[i].detalleCompra.ice = Math.round((Number(ice)) * 1000) / 1000;
						$scope.pedido.totalIce += $scope.pedido.detallesPedido[i].detalleCompra.ice;

					}
				} else {
					SweetAlert.swal("", "El pedido no tiene detalle", "warning");
				}

			}
			$scope.asignarExe = () => {
				var total = $scope.pedido.detallesPedido.reduce((ar, val) => ar + val.detalleCompra.importe, 0)
				$scope.pedido.totalExe = 0;
				if ($scope.pedido.detallesPedido) {
					for (let i = 0; i < $scope.pedido.detallesPedido.length; i++) {
						var exe = (($scope.pedido.detallesPedido[i].detalleCompra.importe) / total) * $scope.pedido.exeGrl;
						$scope.pedido.detallesPedido[i].detalleCompra.excento = Math.round((Number(exe)) * 1000) / 1000;
						$scope.pedido.totalExe += $scope.pedido.detallesPedido[i].detalleCompra.excento;
					}
				} else {
					SweetAlert.swal("", "El pedido no tiene detalle", "warning");
				}

			}
			$scope.recalcularTotalDescuentos = (pedido) => {
				$scope.modDesc = true;
				$scope.pedido.totalDesc = pedido.detallesPedido.reduce((acc, det) => {
					if (det.detalleCompra.descuento) {
						acc += det.detalleCompra.descuento;
					}
					return acc;
				}, 0)
			}
			$scope.recalcularTotalRecargos = (pedido) => {
				$scope.modRec = true;
				$scope.pedido.totalRec = pedido.detallesPedido.reduce((acc, det) => {
					if (det.detalleCompra.recargo) {
						acc += det.detalleCompra.recargo;
					}
					return acc;
				}, 0)
			}
			$scope.recalcularTotalIce = (pedido) => {
				$scope.modIce = true;
				$scope.pedido.totalIce = pedido.detallesPedido.reduce((acc, det) => {
					if (det.detalleCompra.ice) {
						acc += det.detalleCompra.ice;
					}
					return acc;
				}, 0)
			}
			$scope.recalcularTotalExentos = (pedido) => {
				$scope.modExe = true;
				$scope.pedido.totalExe = pedido.detallesPedido.reduce((acc, det) => {
					if (det.detalleCompra.excento) {
						acc += det.detalleCompra.excento;
					}
					return acc;
				}, 0)
			}
			$scope.recalcularDeducciones = (pedido) => {
				if ($scope.pedido.descGrl) $scope.asignarDescuentos();
				if ($scope.pedido.recGrl) $scope.asignarRecargo();
				if ($scope.pedido.iceGrl) $scope.asignarIce();
				if ($scope.pedido.exeGrl) $scope.asignarExe();
				/* $scope.recalcularTotalDescuentos(pedido);
				$scope.recalcularTotalRecargos(pedido);
				$scope.recalcularTotalIce(pedido)
				$scope.recalcularTotalExentos(pedido) */
			}

			$scope.convertirFechaCompra = function (fecha) {
				var dia = fecha.split('/')[0];
				var mes = fecha.split('/')[1];
				var año = fecha.split('/')[2];
				if (año == undefined) {
					año = new Date().getFullYear();
				}
				var f = new Date()
				return mes + '/' + dia + '/' + año
			}
			$scope.validarFechaCompra = function (fecha) {
				$scope.fechaNoValida = false;
				var fechaActual = new Date();
				var fechaCompra =new Date($scope.convertirFechaCompra(fecha))
				if (fechaCompra > fechaActual) {
					$scope.fechaNoValida = true;
				}
			}

			$scope.calcularTotalDescuento = function (detalle) {
				var descTotal = (detalle.tipo_descuento ? detalle.importe * (detalle.descuento / 100) : detalle.descuento)
				return detalle.descuento > 0 ? Math.round(descTotal * 100) / 100 : 0;
			}
			$scope.inicio();
		}]);


