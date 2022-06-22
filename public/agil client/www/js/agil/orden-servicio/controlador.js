
angular.module('agil.controladores')
	.controller('ControladorOrdenServicio', ['$scope', '$filter', '$location', '$localStorage',
		'ObtenerCambioMoneda', 'blockUI', 'ClasesTipo', 'Paginator', 'FiltroOrdenServicio', 'ProveedoresNit', 'ListaProveedores',
		'ObtenerConfiguracionIso', 'ClasesTipoEmpresa','ClasesTiposListaEmpresa', 'SweetAlert', 'ObtenerListaHerenciaClases', 'GuardarOrdenServicio', 'ObtenerOrdenServicio',
		'ClientesNit', 'ObtenerRegistroPedidoPorId', 'ObtenerOrdenServicioXid','GuardarEdicionServicio','eliminarServicio','NumeroLiteral','FieldViewer', function ($scope, $filter, $location, $localStorage,
			ObtenerCambioMoneda, blockUI, ClasesTipo, Paginator, FiltroOrdenServicio, ProveedoresNit, ListaProveedores,
			ObtenerConfiguracionIso, ClasesTipoEmpresa, ClasesTiposListaEmpresa, SweetAlert, ObtenerListaHerenciaClases, GuardarOrdenServicio, ObtenerOrdenServicio,
			ClientesNit, ObtenerRegistroPedidoPorId, ObtenerOrdenServicioXid, GuardarEdicionServicio, eliminarServicio, NumeroLiteral,FieldViewer) {
            $scope.usuario = JSON.parse($localStorage.usuario);
            
			$scope.idDialogNuevoPedido = "modal-nuevo-pedido-servicio";
			$scope.idDialogProductosProveedor = 'dialog-productos-proveedor-configuracion';
			$scope.idDialogBusquedaProveedor = 'dialog-Busqueda-proveedor';
			$scope.idDialogProductosAsigandosProveedor = 'dialog-productos-proveedor-asignados'
			$scope.idModalInventarioPedidos = "dialog-productos-pedidos";
			$scope.modalEdicionOrdenServicio = 'modal-editar-pedido-servicio';

			$scope.$on('$viewContentLoaded', () => {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsOrdenServicio($scope.idDialogNuevoPedido, $scope.idDialogProductosProveedor, $scope.idDialogBusquedaProveedor, $scope.idDialogProductosAsigandosProveedor, $scope.idModalInventarioPedidos, $scope.modalEdicionOrdenServicio);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion()
			});

			$scope.$on('$routeChangeStart', (next, current) => {
				$scope.eliminarPopup($scope.idDialogProductosProveedor);
				$scope.eliminarPopup($scope.idDialogNuevoPedido);
				$scope.eliminarPopup($scope.idDialogBusquedaProveedor);
				$scope.eliminarPopup($scope.idDialogProductosAsigandosProveedor);
				$scope.eliminarPopup($scope.idModalInventarioPedidos);
				$scope.eliminarPopup($scope.modalEdicionOrdenServicio);
			});
			$scope.obtenerColumnasAplicacion = function () {
				$scope.fieldViewer = FieldViewer({
					crear: false,
					id_empresa: $scope.usuario.id_empresa,
					configuracion: {
						sucursal: { value: "Sucursal", show: true },
						almacen: { value: "Almacen", show: true },
						proveedor: { value: "Proveedor", show: true },
						doc: { value: "Doc", show: true },
						doc_iso: { value: "Doc/ISO", show: true },
						factura: { value: "Factura", show: false },
						importe: { value: "Importe", show: true },
						fecha: { value: "Fecha", show: false },
						fechaHora: { value: "Fecha Hora", show: true }
					}
				}, $scope.aplicacion.aplicacion.id);
				$scope.fieldViewer.updateObject();
			}

			$scope.inicio = () => {
				$scope.obtenerConceptosOrdenServicio();
				$scope.obtenerAreas();
				$scope.obtenerEstadoPedidos();
				$scope.obtenerCambioMoneda(new Date);
				$scope.imprimir = { detalle: false };
				$scope.listaProductosProveedor = [];
				$scope.seleccionProductosProveedor = { seleccionar_todos: false };
				$scope.seleccionProductosProveedorAsignados = { seleccionar_todos: false };
				$scope.productosAsignadosPorveedor = { itemsPorPagina: 10, textoBusqueda: "", paginaActual: 1, paginas: [1] };
				$scope.configuracionPorveedor = { itemsPorPagina: 10, textoBusqueda: "", paginaActual: 1, paginas: [1] };
				$scope.mostarBusquedaServicios = false;
				$scope.ordenProductos = true;
				$scope.esContado = true;
				$scope.alreadyCalculated = false;
				$scope.sucursalesUsuario = "";
				$scope.obtenerTiposDePago();				
				$scope.obtenerProveedores();
				$scope.filtro = {
					desde: 0,
					hasta: 0,
					tipo: 0,
					proveedor: 0,
					nit: "",
					sucursal: 0,
					estado: 0,
					id_usuario: ""
				};
				$scope.direccionFiltroProveedores = "asc"
				$scope.obtenerPaginador();
				$scope.sucursales = $scope.obtenerSucursales();
            };
            
			$scope.obtenerEstadoPedidos = () => {
				const promesa = ClasesTipo('ESTMODPED')
				promesa.then((dato) => {
					$scope.estadosPedido = dato.clases
				})
			}
			$scope.obtenerAreas = function () {
                blockUI.start();
                const promesa = ClasesTipoEmpresa("RRHH_AREA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope._areas_ = entidad.clases;
                    blockUI.stop();
                });
            }
			$scope.obtenerConceptosOrdenServicio = () => {
				const promesa = ClasesTiposListaEmpresa('CON_ORD_SER', $scope.usuario.id_empresa)
				promesa.then((dato) => {
					$scope.conceptos_orden_servicio = dato.tipos[0].clases
				})
			}
			
			$scope.obtenerDetallesConcepto = (concepto) => {
				const promesa = ObtenerListaHerenciaClases(concepto.id)
				promesa.then((dato) => {
					$scope.detalles_orden_servicio = dato.clases
					$scope.pedido.detalle = $scope.pedido.detalle?$scope.pedido.detalle:$scope.detalles_orden_servicio[0]
				}).catch((err)=>{
					alert(err.stack && err.stack || 'Se perdió la conexión..')
				})
            }

			$scope.obtenerProveedores = () => {
				const prom = ListaProveedores($scope.usuario.id_empresa);
				prom.then((res) => {
					$scope.proveedores = res.proveedores;
					$scope.proveedoresProcesado = res.proveedores;
					$scope.ordenarBusquedaPorveedores('razon_social')
				}).catch((err) => {
					$scope.proveedores = [];
					const mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
					SweetAlert.swal("", mensaje, "error");
				});
			};

			$scope.filtrarProveedores = (query) => {
				if ($scope.proveedores !== undefined) {
					$scope.proveedoresProcesado = $filter('filter')($scope.proveedores, query);
				} else {
					$scope.proveedoresProcesado = [];
				}
			};

			$scope.ordenarBusquedaPorveedores = (column) => {
				if ($scope.direccionFiltroProveedores === "asc") {
					$scope.direccionFiltroProveedores = "desc"
					$scope.proveedoresProcesado.sort((a, b) => {
						if (a[column] > b[column]) {
							return 1;
						}
						if (a[column] < b[column]) {
							return -1;
						}
						return 0;
					});
				} else {
					$scope.direccionFiltroProveedores = "asc"
					$scope.proveedoresProcesado.sort((a, b) => {
						if (a[column] < b[column]) {
							return 1;
						}
						if (a[column] > b[column]) {
							return -1;
						}
						return 0;
					});
				}
			}
			
			$scope.agregardetallePedido = (detalle) => {
				if ($scope.pedido === undefined) {
					$scope.pedido = {detalles:[]};
				}else if($scope.pedido.detalles === undefined){
					$scope.pedido.detalles = []
				}
				detalle.total = detalle.cantidad * detalle.costo_unitario;
				$scope.pedido.detalles.push(detalle);
				$scope.detallePedido = {};
				$scope.calcularImporte()
			};

			$scope.eliminarDetallePedido = function (detalle) {
				detalle.eliminado = true
				for (let index = 0; index < $scope.pedido.detalles.length; index++) {
					if($scope.pedido.detalles[index].eliminado){
						$scope.pedido.detalles.splice(index, 1);
					}					
				}
				$scope.calcularImporte()
			}

			
			$scope.obtenerCambioMoneda = function (fechaMoneda, asignarAPedido) {
                const promesa = ObtenerCambioMoneda(fechaMoneda, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    if (dato.monedaCambio) {
                        $scope.moneda = dato.monedaCambio;
                        if (asignarAPedido) $scope.pedido.cambio_dolar = $scope.moneda.dolar;
                    } else {
						$scope.moneda = { ufv: "--", dolar: 6.96 }
						$scope.pedido.cambio_dolar = $scope.moneda.dolar;
                        $scope.mostrarMensaje('La fecha ' + $scope.pedido.fecha + ' no tiene datos del tipo de cambio de dolar. El tipo de cambio de dolar no afecta la información.')
                    }
                }).catch((err)=>{
					alert('No se puede obtener el cambio del dolar')
				})
			}
			
			$scope.establecerProveedor = (proveedor, modal) => {
				if ($scope.pedido === undefined) {
					$scope.pedido = {};
				}
				$scope.pedido.proveedor = proveedor;

				if (modal !== undefined) {
					$scope.cerrarModalBusquedaProveedor();
				}
			};

			$scope.checkProveedor = (pedido) => {
				if ($scope.pedido) {
					if ($scope.pedido.proveedor) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			};

			$scope.buscarProveedor = (query) => {
				if (query != "" && query != undefined) {
					const promesa = ProveedoresNit($scope.usuario.id_empresa, query);
					return promesa;
				}
            }

			$scope.guardarOrdenServicioPedido = async (pedido) => {
				if (pedido !== undefined && pedido.detalles.length > 0) {
					$scope.pedido.estado = $scope.estadosPedido.find((x) => {
						return x.nombre_corto == "PENDIENTE"
					})
					$scope.pedido.fecha = new Date($scope.convertirFecha($scope.pedido.fecha));
					$scope.pedido.fecha_entrega = new Date($scope.convertirFecha($scope.pedido.fecha_entrega));
					if($scope.usuario.empresa.usar_configuracion_iso) {
						const configuracionesISO = await ObtenerConfiguracionIso(pedido.almacen.id_sucursal)
						let configuracionIso = {}
						if (configuracionesISO.configuracionesIso.length > 0) {
							configuracionIso = configuracionesISO.configuracionesIso.filter( cfg => cfg.tipoDocumento.nombre_corto === "ORDENSERVICIO" && cfg.activo == true);
							if(configuracionIso.length == 1) {
								$scope.pedido.configuracionesIso = configuracionIso[0];
								$scope.pedido.config_doc_iso = configuracionIso[0].id;
								const prom = GuardarOrdenServicio($scope.usuario.id_empresa, $scope.pedido, $scope.usuario.id);
								prom.then((dato) => {
									if (dato.hasErr) {
										SweetAlert.swal("", dato.mensaje, "error");
										$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
										$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
									} else {
										$scope.recargarItemsTabla();
										$scope.pedido.configuracionesIso != undefined ? $scope.pedido.configuracionesIso.predefinido ? $scope.imprimirIsoOrdenServicio(dato.id_pedido, $scope.pedido.configuracionesIso.version_impresion) : $scope.generarPdfOrdenServicio(dato.id_pedido) : $scope.generarPdfOrdenServicio(dato.id_pedido);
										blockUI.stop();
										SweetAlert.swal("Guardado!", dato.mensaje, "success");
									}
								})
								.catch((err) => {
									blockUI.stop();
									const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
									SweetAlert.swal("", msg, "error");
									$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
									$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
								})
							}else{
								SweetAlert.swal({
									title: "Advertencia",
									text: "Esta seguro de guardar sin ISO? \r Configure ISO en sucursales",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (result.value) {
										const prom = GuardarOrdenServicio($scope.usuario.id_empresa, $scope.pedido, $scope.usuario.id);
										prom.then((dato) => {
											if (dato.hasErr) {
												SweetAlert.swal("", dato.mensaje, "error");
												$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
												$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
											} else {
												$scope.recargarItemsTabla();
												$scope.pedido.configuracionesIso != undefined ? $scope.pedido.configuracionesIso.predefinido ? $scope.imprimirIsoOrdenServicio(dato.id_pedido, $scope.pedido.configuracionesIso.version_impresion) : $scope.generarPdfOrdenServicio(dato.id_pedido) : $scope.generarPdfOrdenServicio(dato.id_pedido);
												blockUI.stop();
												SweetAlert.swal("Guardado!", dato.mensaje, "success");
											}
										}).catch((err) => {
											blockUI.stop();
											const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
											SweetAlert.swal("", msg, "error");
											$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
											$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
										})
									}else{
										$scope.cerrarModalNuevoPedido();
									}
								});
							}
						}else{
							SweetAlert.swal("Error!", "No existen configuraciones ISO en la sucursal", "danger");
						}	
					}else{
						$scope.pedido.configuracionesIso = undefined;
						$scope.pedido.config_doc_iso = undefined;
						const prom = GuardarOrdenServicio($scope.usuario.id_empresa, $scope.pedido, $scope.usuario.id);
								prom.then((dato) => {
									if (dato.hasErr) {
										SweetAlert.swal("", dato.mensaje, "error");
										$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
										$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
									} else {
										$scope.recargarItemsTabla();
										$scope.pedido.configuracionesIso != undefined ? $scope.pedido.configuracionesIso.predefinido ? $scope.imprimirIsoOrdenServicio(dato.id_pedido, $scope.pedido.configuracionesIso.version_impresion) : $scope.generarPdfOrdenServicio(dato.id_pedido) : $scope.generarPdfOrdenServicio(dato.id_pedido);
										blockUI.stop();
										SweetAlert.swal("Guardado!", dato.mensaje, "success");
									}
								}).catch((err) => {
									blockUI.stop();
									const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
									SweetAlert.swal("", msg, "error");
									$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
									$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
								})
					}
				} else {
					if ($scope.detallesPedido.length > 0) {
						SweetAlert.swal("", 'Existe un problema con los datos del pedido, no se puede generar!', "warning");
					} else {
						SweetAlert.swal("", 'Existe un problema con los datos del pedido, no se puede generar sin lista de productos!', "warning");
					}
					$scope.pedido.fecha = $scope.formatoFechaPDF($scope.pedido.fecha);
					$scope.pedido.fecha_entrega = $scope.formatoFechaPDF($scope.pedido.fecha_entrega);
					blockUI.stop();
				}
			};

			$scope.mostrarBusquedaServicio = () => {
				if ($scope.mostarBusquedaServicios) {
					$scope.mostarBusquedaServicios = false;
				} else {
					$scope.mostarBusquedaServicios = true;
				}
            };

			$scope.interceptarTecla = (keyEvent, elemento, esEnfocar) => {
				if (keyEvent.which === 13) {
					if (esEnfocar) {
						$scope.enfocar(elemento);
					} else {
						$timeout(() => {
							$('#' + elemento).trigger('click');
						}, 0);
					}
				}
			};

			$scope.filtrarFiltro = (filtro, _, __) => {
				if (__ !== undefined) {
					for (let key in filtro) {
						if (filtro[key] == 0) {
							filtro[key] = "";
						}
					}
				} else {
					for (let key in filtro) {
						if (filtro[key] === "" || filtro[key] === null || filtro[key] === undefined) {
							filtro[key] = 0;
						}
					}
				}
				if (_ === undefined || !_) {
					$scope.obtenerPedidos();
				} else {
					return filtro;
				}
			};

			$scope.obtenerPaginador = () => {
				blockUI.start();
				$scope.paginator = Paginator();
				$scope.paginator.column = "fecha";
				$scope.paginator.direction = "desc";
				$scope.paginator.itemPerPage = 10;
				$scope.paginator.page = 1;
				$scope.filtro = {
					desde: 0,
					hasta: 0,
					tipo: 0,
					proveedor: 0,
					nit: "",
					sucursal: 0,
					estado: 0,
					usuario: "",
					almacen: 0
				};
				$scope.paginator.callBack = $scope.obtenerPedidos;
				$scope.paginator.getSearch("");
				blockUI.stop();
			}
			$scope.obtenerPedidos = () => {
				blockUI.start();
				$scope.filtro = $scope.filtrarFiltro($scope.filtro, true);
				$scope.paginator.filter = $scope.filtro;
				const prom = FiltroOrdenServicio($scope.usuario.id_empresa, $scope.paginator);
				prom.then((res) => {
					if (res.hasErr) {
						SweetAlert.swal("", res.mensaje, "error");
					} else {
						$scope.listaPedidos = res.pedidos;
						$scope.paginator.setPages(res.paginas);
					}
					$scope.filtro = $scope.filtrarFiltro($scope.filtro, true, true);
					blockUI.stop();
				}).catch((err) => {
					blockUI.stop();
					const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
					SweetAlert.swal("", msg, "error");
				});
			};

			$scope.obtenerSucursales = () => {
				const sucursales = [];
				for (let i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}
			$scope.obtenerAlmacenes = (sucursal) => {
				if (sucursal === undefined) {
					$scope.filtro.sucursal = undefined;
					$scope.almacenes = [];
				}
				if (sucursal !== undefined) {
					$scope.almacenes = [];
					const _sucursal_ = $.grep($scope.sucursales, (e) => { return e.id == sucursal.id; })[0];
					$scope.almacenes = _sucursal_ ? _sucursal_.almacenes : [];
					$scope.pedido.almacen = $scope.almacenes[0]				
				}
			}
			$scope.eliminar = (solicitud) => {
				EliminarPedido.delete({ id_pedido: solicitud.id }, solicitud, (res) => {
					if(res.hasErr) return alert(res.mensaje)
					SweetAlert.swal("Confirmado!", res.mensaje, "success");
					solicitud.estado = res.estado
					blockUI.stop();
				}, (error) => {
					SweetAlert.swal("Error", err.stack ? err.stack : 'Se perdió la conexión.', "error");
					blockUI.stop();
				})
			};

			$scope.sinFuncionalidad = () => {
				SweetAlert.swal("", 'Sin funcionalidad', "warning");
			};

			$scope.cerrarModalEdicionServicio = () => {
				$scope.cerrarPopup($scope.modalEdicionOrdenServicio)
			}

			$scope.verificarPulso = (evento, textoBusqueda) => {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarProductos(1);
				}
			}

			$scope.verificarPulsoAsignados = (evento, textoBusqueda) => {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarProductosAsignados(1);
				}
			}

			$scope.cerrarModalProductosProveedor = () => {
				$scope.productosAsignacionProveedor = [];
				$scope.listaProductosProveedor = [];
				$scope.cerrarPopup($scope.idDialogProductosProveedor);
			};

			$scope.abrirModalNuevoPedido = () => {
				$scope.detallesPedido = []
				$scope.detallePedido = {};
				$scope.pedido = { fecha: $scope.fechaATexto(new Date()), cambio_dolar: $scope.moneda.dolar }
				$scope.pedido.tipoPago = $scope.tiposPago[0];
				$scope.pedido.sucursal = $scope.sucursales[0]
				$scope.pedido.usar_empresa_nueva=true;
				$scope.obtenerAlmacenes($scope.pedido.sucursal)
				$scope.abrirPopup($scope.idDialogNuevoPedido);
			};
			$scope.comprobarCliente= (pedido) =>{
				if(pedido.usar_empresa_nueva){
					pedido.cliente=null;
				}
			}

			$scope.cerrarModalNuevoPedido = () => {
				$scope.pedido = {};
				$scope.detallesPedido = []
				$scope.cerrarPopup($scope.idDialogNuevoPedido);
			};

			$scope.abrirmodalBusquedaProveedor = () => {
				$scope.filtrarProveedores("");
				$scope.abrirPopup($scope.idDialogBusquedaProveedor);
			};

			$scope.cerrarModalBusquedaProveedor = () => {
				$scope.cerrarPopup($scope.idDialogBusquedaProveedor);
			};


			$scope.obtenerConfiguracionesIso = async (idSucursal) => {
				const data = await ObtenerConfiguracionIso(idSucursal)
				return data.configuracionesIso
			}
			$scope.generarPdfOrdenServicio = (idOrden) => {
				const promise = ObtenerOrdenServicio(idOrden)
				promise.then((data) => {
					if(data.hasErr) {
						SweetAlert.swal("", 'Ocurrió un problema al recuperar los datos del pedido', "warning");
					}else{
						blockUI.start();
						const orden = data.orden_servicio
						const doc = new PDFDocument({ size: 'letter', margin: 10 });
						const stream = doc.pipe(blobStream());
						let totalCosto = 0;
						let x = 30, y = 170, width = 555, itemsPorPagina = 28, items = 0, pagina = 1, totalPaginas = Math.ceil(orden.detallesOrdenServicios.length / itemsPorPagina);
						$scope.dibujarCabeceraPDFOrdenServicio(doc, 1, totalPaginas, orden);
						doc.font('Helvetica', 8);
						for (let i = 0; i < orden.detallesOrdenServicios.length && items <= itemsPorPagina; i++) {
							const detalle = orden.detallesOrdenServicios[i], height = 20;
							doc.rect(x, y, width, height).stroke();
							doc.text(i + 1, 40, y + 8, { width: 30, align: "center" });
							if(detalle.descripcion.length <= 23) doc.text(detalle.descripcion ? detalle.descripcion : "", 132, y + 8, { width: 119 });
							if(detalle.descripcion.length >= 24 && detalle.descripcion.length <= 46 ) doc.text(detalle.descripcion ? detalle.descripcion : "", 132, y + 3, { width: 118 });
							if(detalle.descripcion.length > 46) doc.text(detalle.descripcion.slice( 0, 49) + '...', 132, y + 3, { width: 118 });
							doc.text(detalle.unidad_medida ? detalle.unidad_medida : '', 250, y + 8, { width: 35, align: "center" });
							doc.text(detalle.cantidad ? detalle.cantidad : '', 285, y + 8, { width: 33, align: "center" });
							doc.text(detalle.costo_unitario ? number_format_negativo_to_positvo(detalle.costo_unitario, 2) : '', 320, y + 8, { width: 38, align: "right" });
							doc.text(detalle.cantidad && detalle.costo_unitario ? number_format_negativo_to_positvo(detalle.cantidad * detalle.costo_unitario, 2) : '', 360, y + 8, { width: 38, align: "right" });
							totalCosto += (detalle.cantidad * detalle.costo_unitario);
							y = y + height;
							items++;
							if (y >= 720) {
								y = y + 10;
								doc.font('Helvetica', 7);
								doc.text(pagina + " de " + totalPaginas, 520, 740);
								const currentDate = new Date();
								doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hrs:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 740);
								doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 740);

								doc.addPage({ margin: 0, bufferPages: true });
								y = 170;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFOrdenServicio(doc, pagina, totalPaginas, orden);
								doc.font('Helvetica', 8);
							}
						}
						doc.font('Helvetica-Bold', 8);
						doc.text('TOTAL',300, y + 8, { width: 58, align: "right" });
						doc.text(number_format_negativo_to_positvo(totalCosto, 2), 360, y + 8, { width: 38, align: "right" });
						doc.font('Helvetica', 7);
						doc.text(pagina + " de " + totalPaginas, 520, 740);
						const currentDate = new Date();
						doc.text("FECHA : " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hrs:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 55, 740);
						doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 740);
						doc.end();
						stream.on('finish', () => {
							const fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
					}
					blockUI.stop();
				})
			}

			$scope.dibujarCabeceraPDFOrdenServicio = (doc, pagina, totalPaginas, pedido) => {
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.razon_social, 45, 25, { width: 150, align: "center" });
				doc.text($scope.usuario.empresa.direccion, 45, 35, { width: 150, align: "center" });
				doc.text("Nro." + pedido.numero_correlativo, 450, 35, { width: 150, align: "center" });
				let telf = $scope.usuario.empresa.telfono1 ? $scope.usuario.empresa.telfono1 : ""
				telf = $scope.usuario.empresa.telfono2 ? telf + " - " + $scope.usuario.empresa.telfono2 : ""
				telf = $scope.usuario.empresa.telfono3 ? telf + " - " + $scope.usuario.empresa.telfono3 : ""
				doc.text("TELF:" + telf, 45, 55, { width: 150, align: "center" });
				doc.text($scope.usuario.empresa ? $scope.usuario.empresa.departamento.nombre.toUpperCase() + "-BOLIVIA" : 'BOLIVIA', 45, 65, { width: 150, align: "center" });
				doc.font('Helvetica-Bold', 12);
				doc.text("SOLICITUD  Y/O ORDEN DE MATERIAL O SERVICIO", 0, 75, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.rect(30, 100, 555, 70).stroke();
				doc.font('Helvetica', 8);
				doc.text($scope.fechaATexto(pedido.fecha), 75, 110);
				doc.text(pedido.proveedor.razon_social, 100, 125);
				doc.text(pedido.proveedor.nit, 480, 110);
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha : ", 45, 110);
				doc.text("Señor(es) : ", 45, 125);
				doc.text("NIT : ", 450, 110);
				doc.font('Helvetica', 8);
				doc.rect(30, 140, 555, 0).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("NRO", 40, 150, { width: 30, align: "center" });
				doc.text("CÓDIGO", 70, 150, { width: 60, align: "center" });
				doc.text("PRODUCTO", 130, 150, { width: 120, align: "center" });
				doc.text("UND.", 250, 150, { width: 35, align: "center" });
				doc.text("CANT", 285, 150, { width: 35, align: "center" });
				doc.text('P/U', 320, 150, {width: 40, align: 'center'});
				doc.text('TOTAL', 360, 150, {width: 40, align:'center'});
				doc.text("OBSERVACIÓN", 400, 150, { width: 185, align: "center" });
				doc.font('Helvetica', 8);
			}

			$scope.obtenerTiposDePago = () => {
				blockUI.start();
				const promesa = ClasesTipo("TIPA");
				promesa.then((entidad) => {
					$scope.tiposPago = entidad.clases.reduce((value, x) => {
						if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
							value.push(x)
						}
						return value
					}, []);

					blockUI.stop();
				});
			}

			$scope.editarPedido = (pedido, ver) => {
				const promise = ObtenerOrdenServicioXid(pedido.id)
				promise.then((data) => {
					$scope.pedido = data.pedido
					$scope.pedido.ver=ver?true:false;
					$scope.pedido.fecha = $scope.fechaATexto($scope.pedido.fecha)
					$scope.pedido.fecha_entrega = $scope.fechaATexto($scope.pedido.fecha_entrega)
					$scope.obtenerDetallesConcepto($scope.pedido.concepto)
					if($scope.pedido.clientes){
						$scope.pedido.usar_empresa=false;
					}else{
						$scope.pedido.usar_empresa=true;
					}
					$scope.abrirPopup($scope.modalEdicionOrdenServicio);
				})
			};

			$scope.comprobarClienteEdicion= (pedido) =>{
				if(pedido.usar_empresa){
					pedido.clientes=null;
				}
			}
			
			$scope.eliminarDetallePedidoEdicion = (detalle) => {
				detalle.eliminado = true
			}
			$scope.buscarCliente = async (query) => {
				if (query != "" && query != undefined) {
					const dato = await ClientesNit($scope.usuario.id_empresa, query);
					if (dato.length == 1) {
						$scope.establecerCliente(dato[0])
					} else {
						return dato;
					}
				}
			};
			$scope.establecerCliente =  (cliente) => {
				$scope.pedido.cliente = cliente;
				$scope.enfocar('observacion');
			}

			$scope.enfocar = function (elemento) {
				$timeout(function () {
					$("#" + elemento).focus();
				}, 0);
			}

			$scope.agregardetalleServicio = (detalle) => {
				
				detalle.total = detalle.cantidad * detalle.costo_unitario;
				$scope.pedido.detallesOrdenServicios.push(detalle);
				$scope.detallePedidoo = {};
				$scope.calcularImporteServicio()
			};
			$scope.detallePedidoo = {};

			$scope.calcularImporteServicio = function (sus) {
				let total = 0;
				for (let index = 0; index < $scope.pedido.detallesOrdenServicios.length; index++) {
					if(!$scope.pedido.detallesOrdenServicios[index].eliminado) total += $scope.pedido.detallesOrdenServicios[index].total;
				}
				$scope.pedido.importe = total;
				$scope.calcularSaldoPedido();  
				$scope.pedido.total = total;
			}

			$scope.calcularImporte = function (sus) {
				let total = 0;
				for (let index = 0; index < $scope.pedido.detalles.length; index++) {
					if(!$scope.pedido.detalles[index].eliminado) total += $scope.pedido.detalles[index].total;
				}
				$scope.pedido.importe = total;
				$scope.calcularSaldoPedido();
			}

            $scope.calcularImporteServicioMod= function(detalle) {
				detalle.total = detalle.costo_unitario * detalle.cantidad
				$scope.calcularImporteServicio()
			}
			$scope.guardarEdicionOrdenServicio = async (pedido) => {
				    pedido.fecha = new Date($scope.convertirFecha(pedido.fecha));
					pedido.fecha_entrega = new Date($scope.convertirFecha(pedido.fecha_entrega));
					const res = await GuardarEdicionServicio(pedido, $scope.usuario.id)
					$scope.cerrarModalEdicionServicio();
					$scope.obtenerPedidos();
					SweetAlert.swal("", "Orden de servicio modificado", "success");
			}

			$scope.eliminarDetalleServicio = function (detalle) {
				detalle.eliminado = true
				for (let index = 0; index < $scope.pedido.detallesOrdenServicios.length; index++) {
					if($scope.pedido.detallesOrdenServicios[index].eliminado && !$scope.pedido.detallesOrdenServicios[index].id){
						$scope.pedido.detallesOrdenServicios.splice(index, 1);
					}					
				}
				$scope.calcularImporteServicio();	
			}

			$scope.calcularSaldoPedido=()=>{
				$scope.pedido.saldo=$scope.pedido.importe - $scope.pedido.a_cuenta
			}


			$scope.eliminarOrdenServicio = function (pedido) {
				eliminarServicio({id:pedido.id},$scope.usuario.id).then(function(dato) {
					pedido.estado=dato.estado;
				})  
			}
			$scope.confirmarEliminarOrdenServicio = function (pedido) {
				SweetAlert.swal({
					title: "Esta seguro?",
					text: "Esta segur@ de anular el orden de servicio seleccionada!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si',
					cancelButtonText: "No"
				}).then(function (result) {
					if (result.value) {
						$scope.eliminarOrdenServicio(pedido);
					} 
				});
				
			}




			$scope.inicio();
		}]);