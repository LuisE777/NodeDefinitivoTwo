angular.module('agil.controladores')

	.controller('ControladorProductos', ['$scope', '$timeout', '$filter', '$window', '$localStorage', '$location', '$templateCache',
		'$route', 'blockUI', 'Producto', 'Productos', 'ProductosPaginador', 'ProductosEmpresa',
		'ClasesTipo', 'Clases', 'ProductoKardex', 'ProductosEmpresaCreacion', 'DatoCodigoSiguienteProductoEmpresa', 'ListaProductosEmpresa',
		'Paginator', 'ListaCuentasComprobanteContabilidad', 'DatosProducto', 'CatalogoProductos',
		'ListaGruposProductoEmpresa', 'Tipos', 'ClasesTipoEmpresa', 'FieldViewer', 'ListaSubGruposProductoEmpresa', 'ListaGruposProductoUsuariov2', 'ReporteProductosKardex', 'GuardarProductosFormulacion', 'PreciosProductosEmpresa', 'GuardarProductosEmpresaImportacion', "GuardarPromocionProducto", "ObtenerPromocionesProducto",
		'GuardarProductosHeredadosEmpresaImportacion', 'GuardarPromocionPuntaje', 'ObtenerPromocionesPuntajeProducto', 'SweetAlert', 'VerificarCodigoProducto',
		'ProductosPradre','ListaUnidadMedidaSin','ListaActividadesSin','ListaProductoServicioSin', function ($scope, $timeout, $filter, $window, $localStorage, $location, $templateCache,
			$route, blockUI, Producto, Productos, ProductosPaginador, ProductosEmpresa,
			ClasesTipo, Clases, ProductoKardex, ProductosEmpresaCreacion, DatoCodigoSiguienteProductoEmpresa, ListaProductosEmpresa,
			Paginator, ListaCuentasComprobanteContabilidad, DatosProducto, CatalogoProductos,
			ListaGruposProductoEmpresa, Tipos, ClasesTipoEmpresa, FieldViewer, ListaSubGruposProductoEmpresa, ListaGruposProductoUsuariov2, ReporteProductosKardex, GuardarProductosFormulacion, PreciosProductosEmpresa, GuardarProductosEmpresaImportacion, GuardarPromocionProducto, ObtenerPromocionesProducto,
			GuardarProductosHeredadosEmpresaImportacion, GuardarPromocionPuntaje, ObtenerPromocionesPuntajeProducto, SweetAlert, VerificarCodigoProducto, 
			ProductosPradre, ListaUnidadMedidaSin, ListaActividadesSin,ListaProductoServicioSin) {
			blockUI.start();
			$scope.idModalWizardProductoEdicion = 'modal-wizard-producto-edicion';
			$scope.idModalWizardProductoVista = 'modal-wizard-producto-vista';
			$scope.idModalEliminarProducto = 'dialog-eliminar-producto';
			$scope.idModalContenedorProductoEdicion = 'modal-wizard-container-producto-edicion';
			$scope.idModalContenedorProductoVista = 'modal-wizard-container-producto-vista';
			$scope.idModalContenedorProductoKardex = 'modal-wizard-container-producto-kardex';
			$scope.idImagenProducto = 'imagen-producto';
			$scope.idModalReporteProductosKardex = "dialog-reporte-productos-kardex";
			$scope.idModalConceptoEdicion = 'dialog-conceptos';
			$scope.idModalPromocionesProducto = 'dialog-promociones-producto';
			$scope.idModalPromocionesPuntajes = 'dialog-promociones-puntajes';
			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario)
				$scope.obtenerTipoProducto();
				$scope.obtenerProductos();
				$scope.obtenerSucursales();
				$scope.obtenerGruposProductosEmpresaUsuario();
				$scope.obtenerSubGruposProductosEmpresa();
				$scope.obtenerTiposPrecio();
				$scope.obtenerConceptoRelacionesProducto();
				$scope.filtroKardexProducto = { sucursal: null, almacen: null, fechaInicioTexto: "", fechaFinTexto: "", lote: "" }
				$scope.usarValuado = true
			}
			$scope.obtenerColumnasAplicacion = function () {
				$scope.fieldViewer = FieldViewer({
					crear: true,
					id_empresa: $scope.usuario.id_empresa,
					configuracion: {
						publicado_panel: { value: "¿Publicado Panel?", show: true },
						inventario_activado: { value: "¿Inventario Activado?", show: true },
						usar_promociones: { value: "¿usar promociones?", show: true },
						codigo: { value: "Código", show: true },
						nombre: { value: "Nombre", show: true },
						imagen: { value: "Imagen", show: true },
						unidad_medida: { value: "Unidad de Medida", show: true },
						precio_unitario: { value: "Precio Unitario", show: true },
						inventario_minimo: { value: "Inventario Mínimo", show: true },
						descripcion_uno: { value: "Descripcion", show: true },
						carac_esp_uno: { value: "Carac. Esp. 1", show: true },
						carac_esp_dos: { value: "Carac. Esp. 2", show: true },
						grupo: { value: "Grupo", show: true },
						subgrupo: { value: "Subgrupo", show: true },
						tipo_producto: { value: "Tipo Producto", show: true },
						padre: { value: "padre", show: true }
					}
				}, $scope.aplicacion.aplicacion.id);
				$scope.fieldViewer.updateObject();
			}
			$scope.obtenerGruposProductosEmpresaUsuario = function () {
				blockUI.start()
				var promesa = ListaGruposProductoUsuariov2($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (grupos) {
					blockUI.stop()
					if (grupos.clases.length > 0) {
						$scope.gruposProducto = grupos;
					} else {
						$scope.gruposProducto = []
						SweetAlert.swal("", "Parece que el usuario actual no cuenta con grupos de productos.", "warning");
					}
				}).catch(function (err) {

					$scope.gruposProducto = []
				})
			}



			$scope.reporteProductosKardex = function (filtro) {
				blockUI.start()
				if (filtro.grupo == undefined) {
					filtro.grupo = 0
				}
				var promesa = ReporteProductosKardex($scope.usuario.id_empresa, filtro)
				promesa.then(function (datos) {
					//$scope.datosReporteProductoKardex=datos
					if (datos.length == 0) {
						SweetAlert.swal("", "No existen datos", "warning");
						blockUI.stop()
					} else {
						for (var i = 0; i < datos.length; i++) {
							datos[i] = $scope.generarKardexProductoReporte(datos[i])
							if (i === (datos.length - 1)) {
								var report = []
								var cabecera = [
									"Código",
									"Nombre",
									"Unidad Medida",
									"Saldo Fisico",
									"Saldo Valuado"]
								var wscols = [
									{ wch: 15 },
									{ wch: 20 },
									{ wch: 15 },
									{ wch: 15 },
								];
								report.push(cabecera)
								for (var i = 0; i < datos.length; i++) {
									var columns = [];
									columns.push(datos[i].codigo);
									columns.push(datos[i].nombre);
									columns.push(datos[i].unidad_medida);
									columns.push(datos[i].detallesMovimiento[datos[i].detallesMovimiento.length - 1].saldoFisico)
									columns.push(datos[i].detallesMovimiento[datos[i].detallesMovimiento.length - 1].saldoV);
									report.push(columns);
								}

								var ws_name = "SheetJS";
								var wb = new Workbook(), ws = sheet_from_array_of_arrays(report);
								ws['!cols'] = wscols;
								/* add worksheet to workbook */
								wb.SheetNames.push(ws_name);
								wb.Sheets[ws_name] = ws;
								var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary', cellStyles: true });
								saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte kardex.xlsx");
								blockUI.stop();
							}
						}

					}



				})
			}
			$scope.generarKardexProductoReporte = function (datos) {
				var dato = datos;
				$scope.Math = Math;
				dato.detallesMovimiento.sort(function (a, b) {
					return a.id - b.id
				})
				for (var i = 0; i < dato.detallesMovimiento.length; i++) {
					if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto != "III" && dato.detallesMovimiento[i].movimiento.clase.nombre_corto != "IPCSF") {
						dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 0.87) / dato.detallesMovimiento[i].cantidad) * 100) / 100);

					} else {
						dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 1) / dato.detallesMovimiento[i].cantidad) * 100) / 100);
					}
					if (i == 0 && dato.detallesMovimiento[i].tipo == "SALDO ANTERIOR") {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].saldoFisico;
						dato.detallesMovimiento[i].saldoValuado = dato.detallesMovimiento[i].saldoValuado;
						dato.detallesMovimiento[i].costo_unitario = Math.round((dato.detallesMovimiento[i].costo_unitario * 100 / 87) * 100) / 100;
					} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == $scope.diccionario.ING_INV_INICIAL) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_EGR) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					}
					else {
						if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
							dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
						} else {
							if (dato.detallesMovimiento[i].movimiento.venta) {
								//dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
								dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
								dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
							} else {
								dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
								dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
							}
						}

					}
					dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
				}
				return dato;
			}
			$scope.obtenerSubGruposProductosEmpresa = function () {
				var promesa = ListaSubGruposProductoEmpresa($scope.usuario.id_empresa);
				promesa.then(function (subgrupos) {
					$scope.subgruposProducto = subgrupos;
				});
			}

			$scope.activoFijoAplicarDatePicker = function () {
				if ($scope.producto.activo_fijo) {
					$timeout(function () {
						aplicarDatePickers();
					}, 400);

				}
			}

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsProducto($scope.idModalWizardProductoEdicion,
					$scope.idModalWizardProductoVista,
					$scope.idModalEliminarProducto,
					$scope.idModalContenedorProductoEdicion,
					$scope.idModalContenedorProductoVista,
					$scope.idImagenProducto,
					$scope.idModalReporteProductosKardex,
					$scope.idModalConceptoEdicion,
					$scope.idModalPromocionesProducto,
					$scope.idModalPromocionesPuntajes
				);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion()
				blockUI.stop();
			});

			$scope.crearNuevoProducto = function () {
				$scope.tipoDePrecio = { eliminado: false }
				$scope.precioSucursal = { eliminado: false }
				$scope.obtenerProductosPadre();
				$scope.steps = [{ cabeza: "cabeza-datos-producto", cuerpo: "cuerpo-datos-producto" },
				{ cabeza: "cabeza-datos-adicionales", cuerpo: "cuerpo-datos-adicionales" },
				{ cabeza: "cabeza-tipo-producto", cuerpo: "cuerpo-tipo-producto" }]
				var promesa = DatoCodigoSiguienteProductoEmpresa($scope.usuario.id_empresa);
				promesa.then(function (dato) {
					$scope.ultimo_codigo = "FC" + dato.ultimo_codigo;
					$scope.producto = new Producto({ tiposPrecio: [], preciosPorSucursales: [], productosBase: [], indice_rotacion: 1, id_empresa: $scope.usuario.id_empresa, imagen: './img/icon-producto-default.png' });
					if (!$scope.usuario.empresa.usar_consumos) {
						$scope.producto.tipoProducto = $.grep($scope.tipoProductos, function (e) { return e.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_BASE; })[0];
					}
					$scope.producto.codigo = "FC" + (dato.ultimo_codigo + 1);
					$scope.productoBaseSeleccion = {};
					$scope.mensajeCodigo = "";
					$scope.abrirPopup($scope.idModalWizardProductoEdicion);
				});
			}

			$scope.verProducto = function (producto) {
				var promesa = DatosProducto(producto.id);
				promesa.then(function (datosProducto) {
					$scope.producto = datosProducto;
					$scope.producto.publicar_panel = $scope.producto.publicar_panel == 1 ? true : false;
					$scope.producto.activar_inventario = $scope.producto.activar_inventario == 1 ? true : false;

					$scope.producto.totalBase = 0;
					for (var i = 0; i < $scope.producto.productosBase.length; i++) {
						$scope.producto.totalBase = $scope.producto.totalBase + ($scope.producto.productosBase[i].productoBase.precio_unitario * $scope.producto.productosBase[i].formulacion);


					}
					$scope.productoBaseSeleccion = {};

					if ($scope.producto.almacenErp) {
						$scope.producto.sucursal_erp = $scope.producto.almacenErp.sucursal;
						$scope.obtenerAlmacenes($scope.producto.sucursal_erp.id);
					}
					$scope.abrirPopup($scope.idModalWizardProductoVista);
				});
			}

			$scope.cerrarPopPupVista = function () {
				$scope.cerrarPopup($scope.idModalWizardProductoVista);
			}

			$scope.cerrarPopPupEdicion = function () {
				$scope.cerrarPopup($scope.idModalWizardProductoEdicion);
			}
			
			$scope.abrirModalReporteProductosKardex = function () {
				$scope.abrirPopup($scope.idModalReporteProductosKardex);
			}

			$scope.cerrarModalReporteProductosKardex = function () {
				$scope.cerrarPopup($scope.idModalReporteProductosKardex);
			}

			

			$scope.filtrarFiltro = function (filtro, _, __) {
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
					// $scope.obtenerHistoriales(true)
				} else {
					return filtro
				}
			}

			$scope.buscarKardexProducto = function (idProducto, almacen) {
				blockUI.start();
				$scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true)
				// var fechaInicio = filtro.fechaInicioTexto == "" || filtro.fechaInicioTexto == undefined ? 0 : new Date($scope.convertirFecha(filtro.fechaInicioTexto));
				// var fechaFin = filtro.fechaFinTexto == "" || filtro.fechaFinTexto == undefined ? 0 : new Date($scope.convertirFecha(filtro.fechaFinTexto));
				// var lote = filtro.lote == "" || filtro.lote == undefined ? 0 : filtro.lote;
				// $scope.idProducto = idProducto;
				// $scope.idAlmacen = almacen.id;
				$scope.kardexproduto = null;

				if ($scope.filtroKardexProducto.fechaInicioTexto != 0) {
					var promesa = ProductoKardex(idProducto, $scope.filtroKardexProducto, true); //primero obtener el saldo anterior
					$scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true, true)
					promesa.then(function (detMovsSaldo) {
						blockUI.stop();
						if (detMovsSaldo.hasErr) {
							SweetAlert.swal("", detMovsSaldo.mensaje, "warning");
							return
						}
						var detalleMovimientoSaldoAnterior = $scope.obtenerSaldo(detMovsSaldo.saldoAnterior);
						if (detalleMovimientoSaldoAnterior != 0) {
							detalleMovimientoSaldoAnterior.catidad = ""
							detalleMovimientoSaldoAnterior.total = ""
							detMovsSaldo.kardex.unshift(detalleMovimientoSaldoAnterior);
						}
						$scope.generarKardexProducto(detMovsSaldo.kardex);
						// promesa = ProductoKardex($scope.idProducto, $scope.filtroKardexProducto);
						// promesa.then(function (detMovs) {
						// 	if (detalleMovimientoSaldoAnterior != 0) {
						// 		detMovs.unshift(detalleMovimientoSaldoAnterior);
						// 	}
						// 	$scope.generarKardexProducto(detMovs);

						// });
					}).catch(function (err) {
						var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
						$scope.mostrarMensaje(msg)
						blockUI.stop()
					})
				} else {
					var promesa = ProductoKardex(idProducto, $scope.filtroKardexProducto, false);
					$scope.filtroKardexProducto = $scope.filtrarFiltro($scope.filtroKardexProducto, true, true)
					promesa.then(function (detMovsSaldo) {
						// var detalleMovimientoSaldoAnterior = $scope.obtenerSaldo(detMovsSaldo.saldoAnterior);
						// if (detalleMovimientoSaldoAnterior != 0) {
						// 	detMovs.unshift(detalleMovimientoSaldoAnterior);
						// }
						if (detMovsSaldo.hasErr) {
							SweetAlert.swal("", detMovsSaldo.mensaje, "warning");
							return
						}
						if (detMovsSaldo.kardex.length > 0) {
							$scope.generarKardexProducto(detMovsSaldo.kardex);
						} else {
							SweetAlert.swal("", "No se encontraron movimientos.", "warning");
						}

						// promesa = ProductoKardex($scope.idProducto, $scope.filtroKardexProducto);
						// promesa.then(function (detMovs) {
						// 	if (detalleMovimientoSaldoAnterior != 0) {
						// 		detMovs.unshift(detalleMovimientoSaldoAnterior);
						// 	}
						// 	$scope.generarKardexProducto(detMovs);
						blockUI.stop();
						// });					
					}).catch(function (err) {
						var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
						SweetAlert.swal("", msg, "warning");
						blockUI.stop()
					})
				}
			}

			/*$scope.filtroProductoKardex = function () {
				//blockUI.start();
				var promesa = ProductoKardex($scope.paginator);
				promesa.then(function (datos) {
					$scope.generarKardexProducto(datos.kardex);
					$scope.paginator.setPages(datos.paginas);
					blockUI.stop();
				})
			}*/

			$scope.generarKardexProducto = function (detMovs) {
				var dato = $scope.producto;
				var producto = [];
				dato.detallesMovimiento = detMovs;
				$scope.Math = Math;
				for (var i = 0; i < dato.detallesMovimiento.length; i++) {
					if (dato.detallesMovimiento[i].movimiento) {
						// if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto != "III" && dato.detallesMovimiento[i].movimiento.clase.nombre_corto != "IPCSF") {
						if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "ID" ||  dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "IPI") {
							dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 0.87) / dato.detallesMovimiento[i].cantidad) * 100) / 100);

						} else {
							dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 1) / dato.detallesMovimiento[i].cantidad) * 100) / 100);
						}
						if (i == 0 && dato.detallesMovimiento[i].tipo == "SALDO ANTERIOR") {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].saldoFisico;
							dato.detallesMovimiento[i].saldoValuado = dato.detallesMovimiento[i].saldoValuado;
							dato.detallesMovimiento[i].costo_unitario = (Math.round((((dato.detallesMovimiento[i].importe - dato.detallesMovimiento[i].descuento) * 0.87) / dato.detallesMovimiento[i].cantidad) * 100) / 100);

						} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == $scope.diccionario.ING_INV_INICIAL) {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
							if (dato.detallesMovimiento[i].movimiento.compra != null) {
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								if (dato.detallesMovimiento[i].inventario != null) {
									dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
								} else {
									dato.detallesMovimiento[i].lote = ""
								}
							} else {
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								if (dato.detallesMovimiento[i].inventario != null) {
									dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
								} else {
									dato.detallesMovimiento[i].lote = ""
								}
							}
						} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
							if (dato.detallesMovimiento[i].movimiento.compra != null) {
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								if (dato.detallesMovimiento[i].inventario != null) {
									dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
								} else {
									dato.detallesMovimiento[i].lote = ""
								}
							} else {
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								if (dato.detallesMovimiento[i].inventario != null) {
									dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
								} else {
									dato.detallesMovimiento[i].lote = ""
								}
							}
						}
						else {
							if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
								if (i > 0) {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre

									if (dato.detallesMovimiento[i].inventario != null) {
										dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
									} else {
										dato.detallesMovimiento[i].lote = ""
									}
								} else {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
									if (dato.detallesMovimiento[i].inventario != null) {
										dato.detallesMovimiento[i].lote = dato.detallesMovimiento[i].inventario.lote
									} else {
										dato.detallesMovimiento[i].lote = ""
									}
								}
							} else {
								if (dato.detallesMovimiento[i].movimiento.venta) {
									//dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
									if (dato.detallesMovimiento[i].inventario.detallesCompra && dato.detallesMovimiento[i].inventario.detallesCompra.length > 0) {
										var tipoMovimientoCompra = dato.detallesMovimiento[i].inventario.detallesCompra[0].compra.tipoMovimiento;
										if (tipoMovimientoCompra.nombre_corto == "ID" || tipoMovimientoCompra.nombre_corto == "IPI") {
											dato.detallesMovimiento[i].costo_unitario = Math.round((((dato.detallesMovimiento[i].inventario.detallesCompra[0].importe - dato.detallesMovimiento[i].inventario.detallesCompra[0].descuento) * 0.87) / dato.detallesMovimiento[i].inventario.detallesCompra[0].cantidad) * 100) / 100;
										}
									}

									if (i > 0) {
										dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
										dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
										dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
									} else {
										dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
										dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
										dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
									}
								} else {
									if (dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "CONSUM") {
										if (dato.detallesMovimiento[i].inventario.detallesCompra && dato.detallesMovimiento[i].inventario.detallesCompra.length > 0) {
											var tipoMovimientoCompra = dato.detallesMovimiento[i].inventario.detallesCompra[0].compra.tipoMovimiento;
											if (tipoMovimientoCompra.nombre_corto == "ID" || tipoMovimientoCompra.nombre_corto == "IPI") {
												dato.detallesMovimiento[i].costo_unitario = Math.round((((dato.detallesMovimiento[i].inventario.detallesCompra[0].importe - dato.detallesMovimiento[i].inventario.detallesCompra[0].descuento) * 0.87) / dato.detallesMovimiento[i].inventario.detallesCompra[0].cantidad) * 100) / 100;
											}
										}
									}
									if (i > 0) {
										dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
										dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
										dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
									} else {
										dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
										dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
										dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre
									}
								}
							}

						}

						dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
					} else {
						console.log(dato.detallesMovimiento[i])
					}
				}

				$scope.kardexproduto = dato;
			}
			// $scope.verificarLote = function (filtro, alma) {
			// 	if (filtro.lote == "") {
			// 		$scope.buscarKardexProducto($scope.producto.id, alma, filtro)
			// 	}
			// }
			$scope.obtenerSaldo = function (detMovs) {
				var dato = {};
				dato.detallesMovimiento = detMovs;
				for (var i = 0; i < dato.detallesMovimiento.length; i++) {
					dato.detallesMovimiento[i].costo_unitario = Math.round((dato.detallesMovimiento[i].costo_unitario * 0.87) * 100) / 100;
					if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == $scope.diccionario.ING_INV_INICIAL) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					}
					else {
						if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == $scope.diccionario.MOV_ING) {
							if (i > 0) {
								dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
								dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
							} else {
								dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
								dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
								dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
							}
						} else {
							if (dato.detallesMovimiento[i].movimiento.venta) {
								//dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
								if (i > 0) {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
								} else {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
								}
							} else {
								if (i > 0) {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								} else {
									dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
									dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
									dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
								}
							}
						}

					}
					dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
				}

				if (dato.detallesMovimiento.length > 0) {
					dato.detallesMovimiento[dato.detallesMovimiento.length - 1].tipo = "SALDO ANTERIOR";
					dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.compra = null;
					dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.venta = null;
					return dato.detallesMovimiento[dato.detallesMovimiento.length - 1];
				} else {
					return 0;
				}
			}

			$scope.modificarProducto = function (producto) {
				$scope.tipoDePrecio = { eliminado: false }
				$scope.precioSucursal = { eliminado: false }
				$scope.steps = [{ cabeza: "cabeza-datos-producto", cuerpo: "cuerpo-datos-producto" },
				{ cabeza: "cabeza-datos-precio", cuerpo: "cuerpo-datos-precio" },
				{ cabeza: "cabeza-datos-adicionales", cuerpo: "cuerpo-datos-adicionales" },
				{ cabeza: "cabeza-tipo-producto", cuerpo: "cuerpo-tipo-producto" }]
				var promesa =  DatosProducto(producto.id);
				promesa.then(async function (datosProducto) {
						$scope.obtenerProductosPadre();
					if (datosProducto.activo) {
						var valor_actualizado = datosProducto.activo.valores[0].valor_actualizado;
						var depreciacion_acumulada = datosProducto.activo.valores[0].depreciacion_acumulada;
						var fecha_ingreso = $scope.fechaATexto(datosProducto.activo.fecha_ingreso);
						datosProducto.fecha_ingreso = fecha_ingreso;
						datosProducto.valor_actualizado = valor_actualizado;
						datosProducto.depreciacion_acumulada = depreciacion_acumulada;
					}
					$scope.producto = datosProducto;

					
					 var UnidadMed = await $scope.listaUnidadMedidaSin()
					 var Actividades = await $scope.listaActividadesSin()
					$scope.producto.unidad_medida = $scope.unidadesMedida.find(unid => unid.descripcion == datosProducto.unidad_medida)
					$scope.producto.activEconomica = $scope.actividadesSin.find(act => act.codigoCaeb == datosProducto.codigoActividad)
					if(datosProducto.codigoActividad){
						var actividad = {codigoCaeb: datosProducto.codigoActividad}
						var productosSin = await $scope.listaProductoServicioSin(actividad)
						$scope.producto.productoServicio = $scope.productoServicioSin.find(act => act.codigoProducto == datosProducto.codigoProductoServ)
					}
					
					$scope.producto.publicar_panel = $scope.producto.publicar_panel == 1 ? true : false;
					$scope.producto.activar_inventario = $scope.producto.activar_inventario == 1 ? true : false;

					$scope.producto.totalBase = 0;
					for (var i = 0; i < $scope.producto.productosBase.length; i++) {
						$scope.producto.totalBase = $scope.producto.totalBase + ($scope.producto.productosBase[i].productoBase.precio_unitario * $scope.producto.productosBase[i].formulacion);
					}
					$scope.productoBaseSeleccion = {};

					if ($scope.producto.almacenErp) {
						$scope.producto.sucursal_erp = $scope.producto.almacenErp.sucursal;
						$scope.obtenerAlmacenes($scope.producto.sucursal_erp.id);
					}
					$scope.mensajeCodigo = "";
					$scope.abrirPopup($scope.idModalWizardProductoEdicion);
				});
			}

			$scope.mostrarConfirmacionEliminacion = function (producto) {
				$scope.producto = new Producto(producto);
				$scope.abrirPopup($scope.idModalEliminarProducto);
				console.log(producto)
			}

			$scope.cerrarConfirmacionEliminacion = function () {
				$scope.cerrarPopup($scope.idModalEliminarProducto);
			};

			$scope.eliminarProducto = function (producto) {

				blockUI.start();
				$scope.cerrarConfirmacionEliminacion();
				producto.$delete().then(function (dato) {
					console.log(dato)
					$scope.mostrarMensaje(dato.message);
				})

				$scope.recargarItemsTabla();
				blockUI.stop();
			}
			$scope.obtenerSucursales = function () {
				var sucursales = [];
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				$scope.sucursales = sucursales;
				$scope.obtenerAlmacenes($scope.sucursales[0].id);
			}
			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.almacenes = [];
				var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
				$scope.almacenes = sucursal.almacenes;
			}

			$scope.establecerAlmacen = function (id_almacen) {
				$scope.id_almacen = id_almacen;
			}

			$scope.saveForm = function (valido, producto, guardar) {
				if (valido) {
					if (guardar == false) {
						var button = $('#modal-wizard-producto-edicion').find('button[type=submit]').text().trim();
						if (button != "Siguiente") {
							$scope.guardarProducto(producto, true);
						}
					} else {
						$scope.guardarProducto(producto, true);
					}
					if (!$scope.usuario.empresa.usar_tipo_precio || !$scope.usuario.empresa.usar_precio_por_sucursal) {
						$scope.PasarWizardOcultos(false, 'cabeza-datos-precio')
					}
				}
			}
			$scope.regresarwizard = function () {
				if (!$scope.usuario.empresa.usar_tipo_precio || !$scope.usuario.empresa.usar_precio_por_sucursal) {
					$scope.regresarWizardOcultos(false, 'cabeza-datos-precio')
				}
			}

			$scope.stepWizard = function (step) {
				$('#' + $scope.idModalContenedorProductoEdicion).wizard('selectedItem', {
					step: step
				});
			}

			$scope.establecerProductoBase = function (productoConsultado) {
				$scope.productoBase = { id: productoConsultado.id, nombre: productoConsultado.nombre, formulacion: 0, unidad_medida: productoConsultado.unidad_medida };
			}

			$scope.actualizarProducto = function (producto) {
				var promesa = DatosProducto(producto.id);
				promesa.then(function (datosProducto) {
					datosProducto.publicar_panel = producto.publicar_panel;
					datosProducto.activar_inventario = producto.activar_inventario;
					datosProducto.usar_promocion = producto.usar_promocion;
					datosProducto.usar_promocion_en_dias_habilitados = producto.usar_promocion_en_dias_habilitados;
					$scope.guardarProducto(datosProducto, false);
				});
			}

			$scope.initialWizard = function () {
				$('[data-step=1]').trigger("click");
			}

			$scope.guardarProducto =  function (producto, recargarItemsTabla) {
				blockUI.start();
				var imagenProducto = producto.imagen;
				producto.usuario = $scope.usuario.id
				if (producto.id) {
					Producto.update({ idProducto: producto.id }, producto, function (res) {
						if (res.signedRequest == null) {
							blockUI.stop();
							$scope.cerrarPopPupEdicion();

							if (recargarItemsTabla) {
								$scope.recargarItemsTabla();
							}
							SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");
						} else {
							var xhr = new XMLHttpRequest();
							xhr.open('PUT', res.signedRequest);
							xhr.onreadystatechange = function () {
								if (xhr.readyState === 4) {
									if (xhr.status === 200) {
										blockUI.stop();
										$scope.cerrarPopPupEdicion();
										SweetAlert.swal("Guardado!", "Actualizado Exitosamente!", "success");
										if (recargarItemsTabla) {
											$scope.recargarItemsTabla();
										}
									}
									else {
										alert('Could not upload file.');
									}
								}
							};

							var binary = atob(imagenProducto.split(',')[1]);
							var data = [];
							for (var i = 0; i < binary.length; i++) {
								data.push(binary.charCodeAt(i));
							}
							var blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
							var file = new File([blob], res.image_name, { type: "image/jpeg" });
							console.log(file);
							xhr.send(file);
						}
					});
				} else {
					var id_empresa = $scope.usuario.id_empresa;
					var promiseV = VerificarCodigoProducto(id_empresa, producto.codigo)
					promiseV.then(function (dato) {
						$scope.respuesta = dato;
						if ($scope.respuesta.length != 0) {
							blockUI.stop();
							$scope.mensajeCodigo = 'El codigo "' + producto.codigo + '" ya existe';
							$scope.initialWizard();
							SweetAlert.swal("", 'Ya existe un Item con el Codigo: ' + producto.codigo, "warning");
						} else {
							producto.$save(function (res) {
								if (res.signedRequest == null) {
									blockUI.stop();
									$scope.producto = new Producto({});
									$scope.cerrarPopPupEdicion();
									SweetAlert.swal("Guardado!", "Guardado Exitosamente!", "success");
									if (recargarItemsTabla) {
										$scope.recargarItemsTabla();
									}
								} else {
									var xhr = new XMLHttpRequest();
									xhr.open('PUT', res.signedRequest);
									xhr.onreadystatechange = function () {
										if (xhr.readyState === 4) {
											if (xhr.status === 200) {
												blockUI.stop();
												$scope.producto = new Producto({});
												$scope.cerrarPopPupEdicion();
												SweetAlert.swal("Guardado!", "Guardado Exitosamente!", "success");
												if (recargarItemsTabla) {
													$scope.recargarItemsTabla();
												}
											}
											else {
												alert('Could not upload file.');
											}
										}
									};
		
									var binary = atob(imagenProducto.split(',')[1]);
									var data = [];
									for (var i = 0; i < binary.length; i++) {
										data.push(binary.charCodeAt(i));
									}
									var blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
									var file = new File([blob], res.image_name, { type: "image/jpeg" });
									xhr.send(file);
								}
							}, function (error) {
								blockUI.stop();
								$scope.cerrarPopPupEdicion();
								SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "warning");
								if (recargarItemsTabla) {
									$scope.recargarItemsTabla();
								}
							});
						}
					})

					
				}
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

			$scope.eliminarDetalleProductosBase = function (producto) {

				producto.eliminado = true;
				$scope.producto.totalBase = $scope.producto.totalBase - producto.productoBase.precio_unitario * producto.formulacion;

			}
			$scope.agregarDetalleProductosBase = function (producto, datos) {

				datos.formulacion = producto.formulacion;
				console.log(datos);

				/*if(tipoProductos.nombre_corto==$scope.diccionario.id_tipo_Producto_inter){
					if(producto.nombre_corto==$scope.diccionario.id_tipo_Producto_base){*/
				$scope.producto.productosBase.push({ productoBase: datos, formulacion: producto.formulacion });
				$scope.productoBase = {};
				$scope.productoBaseSeleccion = {};
				$scope.producto.totalBase = 0;
				for (var i = 0; i < $scope.producto.productosBase.length; i++) {
					$scope.producto.totalBase = $scope.producto.totalBase + ($scope.producto.productosBase[i].productoBase.precio_unitario * $scope.producto.productosBase[i].formulacion);
					console.log($scope.producto.totalBase);

				}
				console.log($scope.producto.productosBase)
				/*if(tipoProductos.nombre_corto==$scope.diccionario.id_tipo_Producto_final){
					if(producto.id_tipo_Producto!=$scope.diccionario.id_tipo_Producto_final){		
						$scope.producto.productosBase.push({productoBase:producto});			
						$scope.productoBase="";
					}
				}	*/
			}
			$scope.obtenerProductos = function (filtro) {
				$scope.paginator = Paginator();
				$scope.paginator.column = "nombre";
				$scope.dynamicPopoverPromociones = {
					isOpen: false,
					templateUrl: 'myPopoverPromociones.html',
					open: function open() {
						$scope.dynamicPopoverPromociones.isOpen = true;
					},
					close: function close() {
						$scope.dynamicPopoverPromociones.isOpen = false;
					}
				};
				/* $scope.paginator.filter = $scope.grupo */
				if (filtro) {
					$scope.filtro = {
						grupo: filtro.grupo ? filtro.grupo : '',
						subGrupo: filtro.subGrupo ? filtro.subGrupo : '',
						idrelacion: filtro.idrelacion ? filtro.idrelacion : '',
					}
				} else {


					$scope.filtro = {
						grupo: '',
						subGrupo: '',
						idrelacion: ''
					}
				}
				$scope.paginator.callBack = $scope.buscarProductos;
				$scope.paginator.getSearch("", $scope.filtro, null);

			}

			$scope.buscarProducto = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresa($scope.usuario.id_empresa, query);
					return promesa;
				}

			}

			$scope.PopoverListaPreciosProductos = {
				templateUrl: 'PopoverListaPreciosProductos.html',
				title: 'Precios',
				isOpen: false
			};

			$scope.buscarProductos = function () {
				blockUI.start();
				//$scope.paginator.filter = $scope.grupo !== undefined ? $scope.grupo : { id: 0 }
				var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginator, $scope.usuario.id);
				promesa.then(function (dato) {
					blockUI.stop();
					if (dato.hasErr) {
						$scope.mostrarMensaje(dato.mensaje)
					} else {
						$scope.paginator.setPages(dato.paginas);
						$scope.productos = dato.productos;
						for (var i = 0; i < $scope.productos.length; i++) {
							$scope.productos[i].publicar_panel = $scope.productos[i].publicar_panel == 1 ? true : false;
							$scope.productos[i].activar_inventario = $scope.productos[i].activar_inventario == 1 ? true : false;
							$scope.productos[i].usar_promocion = $scope.productos[i].usar_promocion == 1 ? true : false;
							$scope.productos[i].usar_promocion_en_dias_habilitados = $scope.productos[i].usar_promocion_en_dias_habilitados == 1 ? true : false;
						}
					}

				}).catch(function (err) {
					blockUI.stop();
					var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor."
					$scope.mostrarMensaje(memo)
				})
			}

			$scope.descargarCatalogo = function (pdf) {
				blockUI.start()
				if (pdf) {
					var cabecera = ["N°", "Campo", "Empleado", "C.I.", "Estado", "Cargo"]
					var report = []
				} else {
					var cabecera = [
						"Código",
						"Nombre",
						"Unidad Medida",
						"Precio Unitario",
						"Descripcion",
						"Inventario Mínimo",
						"Grupo",
						"Sub-grupo",
						"Caracteristica Especial-1",
						"Caracteristica Especial-2",
						"Código de Fabrica",
						"Comisión (%)",
						"Alerta",
						"Descuento",
						"Descuento Elección"]
					var wscols = [
						{ wch: 10 },
						{ wch: 20 },
						{ wch: 15 },
						{ wch: 15 },
						{ wch: 25 },
						{ wch: 15 },
						{ wch: 7 },
						{ wch: 9 },
						{ wch: 20 },
						{ wch: 20 },
						{ wch: 15 },
						{ wch: 10 },
						{ wch: 8 },
						{ wch: 10 },
						{ wch: 15 }
					];
					var report = []
				}
				var data = []
				var catalogo = CatalogoProductos($scope.usuario.id_empresa, $scope.grupo !== undefined ? $scope.grupo : { id: 0 }, $scope.usuario.id)
				catalogo.then(function (res) {
					if (res.catalogo.length == 0) {
						SweetAlert.swal("", "No existen datos", "warning");
						blockUI.stop()
						return
					}
					if (res.hasErr) {
						SweetAlert.swal("", res.mensaje, "warning");
						return
					}
					for (var i = 0; i < res.catalogo.length; i++) {
						if (pdf) {
							var columns = [];
						} else {
							var columns = [];
						}
						// columns.push(i + 1);
						columns.push(res.catalogo[i].codigo);
						columns.push(res.catalogo[i].nombre);
						columns.push(res.catalogo[i].unidad_medida);
						columns.push(res.catalogo[i].precio_unitario);
						columns.push(res.catalogo[i].descripcion);
						columns.push(res.catalogo[i].inventario_minimo);
						columns.push((res.catalogo[i].grupo !== null && res.catalogo[i].grupo !== undefined ? res.catalogo[i].grupo.nombre : "Sin grupo"));
						columns.push((res.catalogo[i].subgrupo !== null && res.catalogo[i].subgrupo !== undefined ? res.catalogo[i].subgrupo.nombre : "Sin subgrupo"));
						columns.push(res.catalogo[i].caracteristica_especial1);
						columns.push(res.catalogo[i].caracteristica_especial2);
						columns.push(res.catalogo[i].codigo_fabrica);
						columns.push(res.catalogo[i].comision);
						columns.push(res.catalogo[i].alerta);
						columns.push(res.catalogo[i].descuento);
						columns.push(res.catalogo[i].descuento_fijo);
						data.push(columns);
					}
					report.push(cabecera)
					data.map(function (row) {
						report.push(row)
					})
					if (pdf) {
						if (grafico) {
							// blockUI.stop();
							$scope.reportePorMesGrafico(report, mesesReporte)
						} else {
							blockUI.stop();
							$scope.reportePorMesesPdf(report, fromMonth, fromYear, untilMonth, untilYear)
						}
					} else {
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(report);
						ws['!cols'] = wscols;
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary', cellStyles: true });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Catálogo productos.xlsx");
						blockUI.stop();
					}

				}).catch(function (err) {
					var men = (err.data !== undefined && err.data !== null) ? err.data + (err.stack !== undefined && err.stack !== null ? " " + err.stack : "") : err.message !== undefined && err.message !== null ? err.message : "ERROR"
					$scope.mostrarMensaje('Se produjo un error! ' + men)
					blockUI.stop();
				})
			}

			$scope.subirExcelProductos = function (event) {
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
						if (Object.keys(worksheet).length > 0) {

							var productos = [];
							do {
								var producto = {};
								producto.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
								producto.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
								producto.unidad_medida = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
								producto.precio_unitario = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? parseFloat(worksheet['D' + row].v.toString()) : null;
								producto.descripcion = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
								producto.inventario_minimo = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? parseInt(worksheet['F' + row].v.toString()) : null;
								producto.grupo = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
								producto.subgrupo = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
								producto.caracteristica_especial1 = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
								producto.caracteristica_especial2 = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
								producto.codigo_fabrica = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
								producto.comision = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? parseFloat(worksheet['L' + row].v.toString()) : null;
								producto.alerta = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? parseFloat(worksheet['M' + row].v.toString()) : null;
								producto.descuento = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? parseFloat(worksheet['N' + row].v.toString()) : null;
								producto.descuento_fijo = worksheet['O' + row] != undefined && worksheet['N' + row] != "" ? (parseInt(worksheet['O' + row].v.toString()) == 1 ? true : false) : null;
								producto.marca = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? worksheet['P' + row].v.toString() : null;
								producto.tipo_producto = worksheet['Q' + row] != undefined && worksheet['Q' + row] != "" ? worksheet['Q' + row].v.toString() : null;
								producto.indice_rotacion = worksheet['R' + row] != undefined && worksheet['R' + row] != "" ? parseFloat(worksheet['R' + row].v.toString()) : null;
								productos.push(producto);
								row++;
								i++;
							} while (worksheet['A' + row] != undefined);
							$scope.guardarProductos(productos);

						} else {
							SweetAlert.swal("", "No tiene datos en el excel verifique en la primera hoja!", "warning");
						}
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.subirExcelProductosHeredados = function (event) {
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
						var productos = [];
						do {
							var producto = {};
							producto.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							producto.nombre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							producto.codigo_padre = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							producto.nombre_padre = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							productos.push(producto);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarProductosHeredados(productos);
						$scope.limpiarArchivoImportacion()
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
					reader.onerror = () => {
						$scope.limpiarArchivoImportacion()
						$scope.mostrarMensaje(this.error);
						return
					}
				}
			}

			$scope.guardarProductos = function (productos) {
				blockUI.start();
				$scope.productosParaGuardar = productos
				var productosArray = []
				if ($scope.productosParaGuardar.length > 0) {
					if ($scope.productosParaGuardar.length > 100) {
						productosArray = $scope.productosParaGuardar.slice(0, 100)
						$scope.productosParaGuardar = $scope.productosParaGuardar.slice(100, $scope.productosParaGuardar.length)
					} else {
						productosArray = $scope.productosParaGuardar
						$scope.productosParaGuardar = []
					}
					var promesa = GuardarProductosEmpresaImportacion(productosArray, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						$scope.mostrarMensaje("faltan procesar " + $scope.productosParaGuardar.length + "productos")
						$scope.guardarProductos($scope.productosParaGuardar)
						blockUI.stop();
					}).catch((err) => {
						let msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
						$scope.mostrarMensaje(msg)
						blockUI.stop();
					})
				} else {
					$scope.recargarItemsTabla();
					blockUI.stop();
				}
			}

			$scope.guardarProductosHeredados = function (productos) {
				blockUI.start();
				$scope.productosParaGuardar = productos
				var productosArray = []
				if ($scope.productosParaGuardar.length > 0) {
					if ($scope.productosParaGuardar.length > 200) {
						productosArray = $scope.productosParaGuardar.slice(0, 200)
						$scope.productosParaGuardar = $scope.productosParaGuardar.slice(200, $scope.productosParaGuardar.length)
					} else {
						productosArray = $scope.productosParaGuardar
						$scope.productosParaGuardar = []
					}
					var promesa = GuardarProductosHeredadosEmpresaImportacion(productosArray, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						if ($scope.productosParaGuardar.length === 0) {
							$scope.mostrarMensaje(dato.mensaje)
							blockUI.stop();
						} else {
							$scope.mostrarMensaje("faltan procesar " + $scope.productosParaGuardar.length + "productos" + '<hr>' + dato.mensaje)
							$scope.guardarProductos($scope.productosParaGuardar)
						}

					}).catch((err) => {
						let msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
						$scope.mostrarMensaje(msg)
						blockUI.stop();
					})
				} else {
					$scope.recargarItemsTabla();
					blockUI.stop();
				}
				/* var productosEmpresa = new ProductosEmpresaCreacion({ productos: productos, id_empresa: $scope.usuario.id_empresa });
				productosEmpresa.$save(function (producto) {
					blockUI.stop();
					$scope.mostrarMensaje(producto.mensaje);
					$scope.recargarItemsTabla();
				}, function (error) {
					blockUI.stop();
					$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
					$scope.recargarItemsTabla();
				}); */
			}

			$scope.subirExcelProductosPrecio = function (event) {
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
						var productos = [];
						do {
							var producto = {};
							producto.sucursal = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							producto.sucursal = $scope.sucursales.find(function (x) {
								return x.nombre == producto.sucursal
							})
							producto.codigo = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;

							producto.tipoPrecio = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							producto.tipoPrecio = $scope.tiposPrecios.clases.find(function (dato) {
								return producto.tipoPrecio.toUpperCase() == dato.nombre.toUpperCase()
							})
							producto.precio_unitario = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? parseFloat(worksheet['D' + row].v.toString()) : null;
							producto.rango_positivo = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? parseFloat(worksheet['E' + row].v.toString()) : null;
							producto.rango_negativo = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? parseFloat(worksheet['F' + row].v.toString()) : null;
							productos.push(producto);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarPreciosProductos(productos);
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.guardarPreciosProductos = function (productos) {
				blockUI.start();
				$scope.productosParaGuardar = productos
				var productosArray = []
				if ($scope.productosParaGuardar.length > 0) {
					if ($scope.productosParaGuardar.length > 100) {
						productosArray = $scope.productosParaGuardar.slice(0, 100)
						$scope.productosParaGuardar = $scope.productosParaGuardar.slice(100, $scope.productosParaGuardar.length)
					} else {
						productosArray = $scope.productosParaGuardar
						$scope.productosParaGuardar = []
					}
					var promesa = PreciosProductosEmpresa(productosArray, $scope.usuario.id_empresa)
					promesa.then(function (dato) {
						$scope.mostrarMensaje("faltan procesar " + $scope.productosParaGuardar.length + "productos")
						$scope.guardarProductos($scope.productosParaGuardar)


						blockUI.stop();
					})
				} else {
					$scope.recargarItemsTabla();
					blockUI.stop();
				}
				//var promesa = PreciosProductosEmpresa(productos, $scope.usuario.id_empresa);
				/* promesa.then(function (producto) {
					blockUI.stop();
					$scope.mostrarMensaje('Guardado Exitosamente!');
					$scope.recargarItemsTabla();
				}); */
			}
			$scope.subirExcelFormulacionProductos = function (event) {
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
						var productos = [];
						do {
							var producto = {};
							producto.codigo_final = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							producto.nombre_final = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							producto.nombre_base = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							producto.codigo_base = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							producto.formulacion = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							productos.push(producto);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarFormulacionProductos(productos);
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.guardarFormulacionProductos = function (productos) {
				blockUI.start();
				$scope.productosParaGuardar = productos
				var productosArray = []
				if ($scope.productosParaGuardar.length > 0) {
					if ($scope.productosParaGuardar.length > 100) {
						productosArray = $scope.productosParaGuardar.slice(0, 100)
						$scope.productosParaGuardar = $scope.productosParaGuardar.slice(100, $scope.productosParaGuardar.length)
					} else {
						productosArray = $scope.productosParaGuardar
						$scope.productosParaGuardar = []
					}
					var promesa = GuardarProductosFormulacion($scope.usuario.id_empresa, productosArray)
					promesa.then(function (dato) {
						$scope.mostrarMensaje("faltan procesar " + $scope.productosParaGuardar.length + "productos")
						$scope.guardarFormulacionProductos($scope.productosParaGuardar)


						blockUI.stop();
					})
				} else {
					$scope.recargarItemsTabla();
					blockUI.stop();
				}
				/* var prom = GuardarProductosFormulacion($scope.usuario.id_empresa, productos)
				prom.then(function (res) {
					if (!res.hasErr) {
						if (res.mensajes) {
							$scope.mostrarMensaje(res.mensaje + res.mensajes)
						} else {
							$scope.mostrarMensaje(res.mensaje)
						}
					} else {
						$scope.mostrarMensaje(res.mensajes)
					}
					blockUI.stop()
				}).catch(function (err) {
					var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					$scope.mostrarMensaje(msg)
					blockUI.stop()
				}) */
			}

			$scope.buscarCuenta = function (buscarCuentaQuery) {
				if (buscarCuentaQuery != "" && buscarCuentaQuery != undefined) {
					var promesa = ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, buscarCuentaQuery);
					return promesa;
				}
			}

			$scope.abrirDialogConceptoEdicion = function (tipo, concepto) {
				$scope.tipo_edicion = tipo;
				$scope.conceptoTexto = concepto
				$scope.clase = {};
				/* $scope.diaExistente=false */
				$scope.abrirPopup($scope.idModalConceptoEdicion);
			}
			$scope.cerrarDialogConceptoEdicion = function () {
				$scope.cerrarPopup($scope.idModalConceptoEdicion);
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
					var promesa = ClasesTipo(tipo.nombre_corto);
					promesa.then(function (entidad) {
						if ($scope.conceptoTexto = "tiposPagosC") {
							$scope.obtenerTiposPrecio()
						}
						blockUI.stop();
						$scope.cerrarDialogConceptoEdicion();
						SweetAlert.swal("Guardado!", "Guardado Exitosamente!", "success");
					});
				});
			}
			$scope.obtenerTiposPrecio = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("T_PAGO_PRODUCTO", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposPrecios = entidad
					blockUI.stop();
				});
			}
			$scope.obtenerConceptoRelacionesProducto = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RELACIONES PRODUCTOS", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.conceptosRelacionesProductos = entidad
					blockUI.stop();
				});
			}
			$scope.obtenerProductosPadre = function () {
				blockUI.start();
				var promesa = ProductosPradre($scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.productosPadre = entidad.productos
					blockUI.stop();
				});
			}
			$scope.agregarTipoPrecio = function (tipoProducto, form) {
				if (tipoProducto.tipoPrecio && tipoProducto.precio_unitario) {
					form.tipoprecio.$invalid = false
					form.PrecioProductoTipo.$invalid = false
					if (tipoProducto.edit) {
						$scope.tipoDePrecio = { eliminado: false }
					} else {
						$scope.producto.tiposPrecio.push(tipoProducto)
						$scope.tipoDePrecio = { eliminado: false }
					}
				} else {
					form.tipoprecio.$invalid = true
					form.PrecioProductoTipo.$invalid = true
				}
			}
			$scope.editarTipoPrecioProducto = function (tipo) {
				$scope.tipoDePrecio = tipo
				$scope.tipoDePrecio.edit = true
			}
			$scope.eliminarTipoPrecioProducto = function (tipo, index) {
				if (tipo.id) {
					tipo.eliminado = true
				} else {
					$scope.producto.tiposPrecio.splice(index, 1)
				}
			}
			$scope.agregarPrecioPorSucursal = function (precioSucursal, form) {
				if (precioSucursal.sucursal && precioSucursal.precio_unitario) {
					form.precioSuc.$invalid = false
					form.PrecioUniSucursal.$invalid = false
					if (precioSucursal.edit) {
						$scope.precioSucursal = { eliminado: false }
					} else {
						$scope.producto.preciosPorSucursales.push(precioSucursal)
						$scope.precioSucursal = { eliminado: false }
					}
				} else {
					form.precioSuc.$invalid = true
					form.PrecioUniSucursal.$invalid = true
				}
			}
			$scope.editarPrecioPorSucursal = function (tipo) {
				$scope.precioSucursal = tipo
				$scope.precioSucursal.edit = true
			}
			$scope.eliminarPrecioPorSucursal = function (tipo, index) {
				if (tipo.id) {
					tipo.eliminado = true
				} else {
					$scope.producto.preciosPorSucursales.splice(index, 1)
				}
			}
			/* promiciones */
			$scope.abrirModalPromocionesProducto = function (producto) {
				$scope.producto = producto
				$scope.promocion = { habilitado: true, tipo_promocion: false }
				$scope.prom = {}
				$scope.obtenerDias()
				$scope.obtenerConfiguracionPromocion()
				$scope.abrirPopup($scope.idModalPromocionesProducto);
			}
			$scope.cerrarModalPromocionesProducto = function () {
				$scope.cerrarPopup($scope.idModalPromocionesProducto);
			}
			$scope.agregarPromocion = function (promocion) {
				$scope.diaExistente = false
				if (promocion.edit) {
					$scope.promocion = { habilitado: true, tipo_promocion: false }
				} else {
					/* if (promocion.tipo_promocion == false) { */
					$scope.mensajedias = "los siguientes dias ya tienen configuaracion por dia completo:"
					for (var j = 0; j < $scope.prom.dias.length; j++) {
						var element = $scope.prom.dias[j];
						var dia = $scope.promociones.find(function (x) {
							return x.dia.nombre == element.nombre && x.tipo_promocion == false
						})
						if (dia) {
							$scope.diaExistente = true
						}
						if (j === ($scope.prom.dias.length - 1)) {
							$scope.mensajedias = $scope.mensajedias + element.nombre + "."
						} else {
							$scope.mensajedias = $scope.mensajedias + element.nombre + ","
						}
					}
					/* } */
					if ($scope.diaExistente != true) {
						$scope.diaExistente = false
						$scope.prom.dias.forEach(function (x, i, a) {
							promocion.dia = x
							var p = Object.assign({}, promocion)
							/* p.hora_inicio_guardar=new Date($scope.connvertirFecha(p.hora_inicio)) */
							$scope.promociones.push(p)
							if (i === (a.length - 1)) {
								$scope.promocion = { habilitado: true, tipo_promocion: false }
								$scope.prom = {}
							}
						})

					}
				}
			}
			$scope.modificarPromocion = function (promocion) {
				$scope.promocion = promocion
				$scope.promocion.hora_inicio = new Date(promocion.hora_inicio)
				$scope.promocion.hora_fin = new Date(promocion.hora_fin)
				$scope.promocion.edit = true
			}
			/*  promociones */
			/* puntajes */
			// $scope.promocionesPuntajes = [];
			$scope.abrirModalPromocionesPuntajes = function (producto) {
				$scope.producto = producto
				$scope.promopuntaje = { habilitado: true, tipo_promocion: false }
				$scope.prompuntaje = {}
				$scope.obtenerDias()
				$scope.obtenerConfiguracionPromocionPuntaje()
				$scope.abrirPopup($scope.idModalPromocionesPuntajes);
			}

			$scope.agregarPromocionPuntaje = function (promopuntaje) {
				$scope.diaExistente = false
				if (promopuntaje.edit) {
					$scope.promopuntaje = { habilitado: true, tipo_promocion: false }
				} else {
					/* if (promocion.tipo_promocion == false) { */
					$scope.mensajedias = "los siguientes dias ya tienen configuracion por dia completo:"
					for (var j = 0; j < $scope.prompuntaje.dias.length; j++) {
						var element = $scope.prompuntaje.dias[j];
						var dia = $scope.promocionesPuntajes.find(function (x) {
							return x.dia.nombre == element.nombre && x.tipo_promocion == false
						})
						if (dia) {
							$scope.diaExistente = true
						}
						if (j === ($scope.prompuntaje.dias.length - 1)) {
							$scope.mensajedias = $scope.mensajedias + element.nombre + "."
						} else {
							$scope.mensajedias = $scope.mensajedias + element.nombre + ","
						}
					}
					/* } */
					if ($scope.diaExistente != true) {
						$scope.diaExistente = false
						$scope.prompuntaje.dias.forEach(function (x, i, a) {
							promopuntaje.dia = x
							var p = Object.assign({}, promopuntaje)
							/* p.hora_inicio_guardar=new Date($scope.connvertirFecha(p.hora_inicio)) */
							$scope.promocionesPuntajes.push(p)
							if (i === (a.length - 1)) {
								$scope.promopuntaje = { habilitado: true, tipo_promocion: false }
								$scope.prompuntaje = {}
							}
						})

					}
				}
			}

			$scope.modificarPromocionPuntaje = function (promopuntaje) {
				$scope.promopuntaje = promopuntaje;
				$scope.promopuntaje.hora_inicio = new Date(promopuntaje.hora_inicio);
				$scope.promopuntaje.hora_fin = new Date(promopuntaje.hora_fin);
				$scope.promopuntaje.edit = true;
				$scope.promopuntaje.fecha_inicio = promopuntaje.fecha_inicio ? moment(promopuntaje.fecha_inicio).format('DD/MM/YYYY') : null
				$scope.promopuntaje.fecha_fin = promopuntaje.fecha_fin ? moment(promopuntaje.fecha_fin).format('DD/MM/YYYY') : null
			}

			$scope.guardarConfiguracionPromocionPuntaje = function () {
				var promesa = GuardarPromocionPuntaje($scope.producto.id, $scope.promocionesPuntajes)
				promesa.then(function (data) {
					$scope.cerrarModalPromocionesPuntajes();
					SweetAlert.swal("Guardado!", data.mensaje, "success");
				})
			}
			$scope.obtenerConfiguracionPromocionPuntaje = function () {
				var promesa = ObtenerPromocionesPuntajeProducto($scope.producto.id)
				promesa.then(function (data) {
					$scope.promocionesPuntajes = data.promociones
				})
			}

			$scope.cerrarModalPromocionesPuntajes = function () {
				$scope.cerrarPopup($scope.idModalPromocionesPuntajes);
			}
			$scope.obtenerDias = function () {
				blockUI.start();
				var promesa = ClasesTipo("DIAS");
				promesa.then(function (entidad) {
					$scope.dias = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.guardarConfiguracionPromocion = function () {
				var promesa = GuardarPromocionProducto($scope.producto.id, $scope.promociones)
				promesa.then(function (data) {
					$scope.cerrarModalPromocionesProducto()
					SweetAlert.swal("Guardado!", data.mensaje, "success");
				})
			}
			$scope.obtenerConfiguracionPromocion = function () {
				var promesa = ObtenerPromocionesProducto($scope.producto.id)
				promesa.then(function (data) {
					$scope.promociones = data.promociones
				})
			}

			$scope.cambiarUsarInvetario = function (producto) {
				if (producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_FINAL) {
					producto.activar_inventario = false;
					producto.activo_fijo = false;
				} else if (producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_BASE) {
					producto.activar_inventario = true;
					producto.combo = false;
				} else {
					producto.activo_fijo = false;
					producto.activar_inventario = false;
					producto.combo = false;
				}
			}

			// This is what you will bind the filter to
			$scope.textSearch = '';
			// Instantiate these variables outside the watch
			var filterTextTimeout;
			$scope.$watch('textSearch', function (val) {
				if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
				filterTextTimeout = $timeout(function () {
					$scope.paginator.getSearch(val, $scope.paginator.filter)
				}, 900); // delay 250 ms 
			});
			$scope.obtenerNueroDotacionRopa = function (detalleMovimiento) {
				return detalleMovimiento.movimiento.dotacionesRopaItem.dotacionRopa.numero;
			}

			$scope.seleccionarGrupos = function (subGrupos, idPadre) {
				if (subGrupos) {
					return subGrupos.reduce(function (val, x) {
						if (x.id_padre == idPadre) {
							val.push(x)
						}
						return val
					}, [])
				}
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
								$scope.mensajeCodigo = 'El codigo "' + $scope.producto.codigo + '" ya existe';
								$scope.producto.codigo = null;
							} else {
								$scope.mensajeCodigo = "Codigo valido";
							}
						})
					}, 1500);
				} else {
					// $scope.mensajeCodigo = "";
				}
			}
			
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalWizardProductoEdicion);
				$scope.eliminarPopup($scope.idModalWizardProductoVista);
				$scope.eliminarPopup($scope.idModalEliminarProducto);
				$scope.eliminarPopup($scope.idModalReporteProductosKardex);
				$scope.eliminarPopup($scope.idModalConceptoEdicion);
				$scope.eliminarPopup($scope.idModalPromocionesProducto);
				$scope.eliminarPopup($scope.idModalPromocionesPuntajes);
				$scope.eliminarPopup($scope.idModalWizardProductoKardex);
			});


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








			
			$scope.inicio();
		}]);



