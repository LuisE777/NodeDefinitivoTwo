angular.module('agil.controladores')

	.controller('ControladorInventarios', ['$scope', '$timeout', '$filter', '$window', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'ListaInventariosProducto',
		'Inventario', 'InventarioPaginador', 'Productos', 'ActualizacionInventario', 'ListaProductosEmpresa', 'IngresosPorInventario', 'ActualizarDetalleMovimiento', 'ListaGruposProductoUsuario',
		'ProductosUsuario', 'IngPorInventario', 'InventarioInicial', 'ClasesTipo', 'IngPorInventarioDetalle', 'IngresosPorInventarioTodo', 'ListaSubGruposProductoUsuario', 'ReporteMovimientosConsolidados', 'InventarioReporte', 'ObtenerGestionesEEFF', 'SweetAlert',
		'ListaInventariosAntiguosProducto','ActualizarInvYmodRegistros', function ($scope, $timeout, $filter, $window, $localStorage, $location, $templateCache, $route, blockUI, ListaInventariosProducto,
			Inventario, InventarioPaginador, Productos, ActualizacionInventario, ListaProductosEmpresa, IngresosPorInventario, ActualizarDetalleMovimiento, ListaGruposProductoUsuario,
			ProductosUsuario, IngPorInventario, InventarioInicial, ClasesTipo, IngPorInventarioDetalle, IngresosPorInventarioTodo, ListaSubGruposProductoUsuario, ReporteMovimientosConsolidados, InventarioReporte, ObtenerGestionesEEFF, SweetAlert,
			ListaInventariosAntiguosProducto,ActualizarInvYmodRegistros) {
			blockUI.start();

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.idModalActualizacionInventario = 'dialog-actualizacion-inventario';
			$scope.idModalIngresosPorInventario = 'dialog-ingreso-por-inventario';
			$scope.idModalCreacionInventario = 'dialog-creacion-inventario-inicial';
			$scope.idModalMovimientoConsolidados = 'dialog-reporte-movimientos-consolidados';

			$scope.inicio = function () {
				console.log('esoco', $scope);
				$scope.seleccionGrupo = {}
				$scope.seleccionSubGrupo = {}
				$scope.obtenerSucursales();
				$scope.obtenerInventarios();
				// $scope.compraIngresosPorInventario();
				$scope.obtenerGruposProductosEmpresaUsuario();
				$scope.obtenerSubGruposProductosEmpresa();
				$scope.obtenerFormatoFactura()
				$scope.data = { color: 'todos' };
				//$scope.aplicarTabla('tabla-inventarios',4);
			}

			$scope.obtenerFormatoFactura = function () {
				blockUI.start();
				var promesa = ClasesTipo("FORM_IMP_FAC");
				promesa.then(function (entidad) {
					$scope.formatosFactura = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.establecerCantidad = function (model) {
				$scope.cantidadInventario = model
			}
			$scope.obtenerSucursales = function () {
				var sucursales = [];
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				$scope.sucursales = sucursales;
			}

			$scope.establecerAlmacen = function (id_almacen) {
				$scope.id_almacen = id_almacen;
			}

			

			$scope.obtenerInventarios = function () {
				$scope.abs = $window.Math.abs;
				$scope.itemsPorPagina = 10;
				$scope.paginaActual = 1;
				$scope.columna = "nombre";
				$scope.direccion = "asc";
				$scope.textoBusqueda = "";
				$scope.cantidadInventario = "0"
				/* $scope.cantidadInventario = "0"; */
				if ($scope.sucursales.length == 1) {
					$scope.sucursalBusqueda = $scope.sucursales[0];
					$scope.almacenes = $scope.sucursalBusqueda.almacenes;
					if ($scope.almacenes.length == 1) {
						$scope.almacenBusqueda = $scope.sucursalBusqueda.almacenes[0];
						$scope.buscarInventarios($scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, 0);
					}
				}
			};

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
					blockUI.stop()
					$scope.gruposProducto = []
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
					$scope.mostrarMensaje(mensaje)
				})
			};
			$scope.limpiarSeleccion = function (grupo) {
				if (grupo) {
					$scope.seleccionGrupo = {};

				} else {
					$scope.seleccionSubGrupo = {};
				}
			}

			$scope.obtenerSubGruposProductosEmpresa = function () {
				blockUI.start()
				var promesa = ListaSubGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (Subgrupos) {
					blockUI.stop()
					if (Subgrupos.hasErr) {
						return $scope.mostrarMensaje(Subgrupos.mensaje)
					}
					if (Subgrupos.length > 0) {
						$scope.subgruposProducto = Subgrupos;
					} else {
						$scope.subgruposProducto = []
						$scope.mostrarMensaje('Parece que no existen Subgrupos de productos asignados a esta empresa.')
					}
				}).catch(function (err) {
					blockUI.stop()
					$scope.subgruposProducto = []
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
					$scope.mostrarMensaje(mensaje)
				})
			};

			$scope.verificarPulso = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.textoBusqueda = textoBusqueda;
					if ($scope.almacenBusqueda) {
						$scope.buscarInventarios($scope.almacenBusqueda.id, 1, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, $scope.cantidadInventario);
					}
				}
			}

			$scope.verDetalleInventarioAntiguos = function (producto) {
				producto.edicion_inventario=producto.edicion_inventario?!producto.edicion_inventario:true
				var promesa = ListaInventariosAntiguosProducto(producto.id, $scope.almacenBusqueda.id);
				promesa.then(function (inventarios) {
					producto.inventarios = inventarios
					for (const inv of producto.inventarios) {
						if (inv.detallesMovimiento[0].movimiento.clase.nombre_corto == $scope.diccionario.MOVING_DIARIO || inv.detallesMovimiento[0].movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
							inv.costo_unitario=inv.costo_unitario * 0.87
						}
						inv.costo_total=inv.costo_unitario*inv.cantidad
					}
				});
				var style = $("#" + producto.id).css("display");
				if (style == "none") {
					$("#" + producto.id).css("display", "");
				} else {
					$("#" + producto.id).css("display", "none");
				}
				
			}
			$scope.editarCostoUnitarioInv=function(inv){
				SweetAlert.swal({
                    title: "¿Cambiar el valor del costo unitario?",
                    text: "Al modificar el valor todos los registros relacionados a este inventario seran modificados.",
					input: 'text',
					inputLabel: 'Costo unitario',
					inputValue: inv.costo_unitario,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
						inv.costo_unitario=parseFloat(result.value)
                        $scope.actualizarInvYmodRegistros(inv);
                    }
                });
			}
			$scope.actualizarInvYmodRegistros=async function(inv){
				try {
					let res = await ActualizarInvYmodRegistros(inv)
					$scope.$evalAsync()
				} catch (error) {
					console.log(error)
				}
			}
			$scope.verDetalleInventario = function (producto) {
				producto.edicion_inventario=false
				var promesa = ListaInventariosProducto(producto.id, $scope.almacenBusqueda.id);
				promesa.then(function (inventarios) {
					producto.inventarios = inventarios
					for (const inv of producto.inventarios) {
						if (inv.detallesMovimiento[0].movimiento.clase.nombre_corto == $scope.diccionario.MOVING_DIARIO || inv.detallesMovimiento[0].movimiento.clase.nombre_corto == $scope.diccionario.MOVING_POR_IMPORTACION) {
							inv.costo_unitario=inv.costo_unitario * 0.87
						}
						inv.costo_total=inv.costo_unitario*inv.cantidad
					}
				});
				var style = $("#" + producto.id).css("display");
				if (style == "none") {
					$("#" + producto.id).css("display", "");
				} else {
					$("#" + producto.id).css("display", "none");
				}
			}
			function compare(a, b) {
				if ($scope.direccion == "asc") {
					return a.cantidad_total - b.cantidad_total
				} else {
					return b.cantidad_total - a.cantidad_total
				}
			}
			$scope.clasificarColumna = function (columna) {
				if (columna == "cantidad") {
					if ($scope.direccion == "asc") {
						$scope.direccion = "desc";
					} else {
						$scope.direccion = "asc";
					}
					$scope.productos.sort(compare)
				} else {
					if ($scope.columna == columna) {
						if ($scope.direccion == "asc") {
							$scope.direccion = "desc";
							$("#" + columna).removeClass("fa-caret-up");
							$("#" + columna).addClass("fa-caret-down");
						} else {
							$scope.direccion = "asc";
							$("#" + columna).removeClass("fa-caret-down");
							$("#" + columna).addClass("fa-caret-up");
						}
					} else {
						$scope.direccion = "asc";
						$(".sort").removeClass("fa-caret-up");
						$(".sort").removeClass("fa-caret-down");
						$(".sort").addClass("fa-sort");
						$("#" + columna).addClass("fa-caret-up");
						$("#" + columna).removeClass("fa-sort");
					}
					$scope.columna = columna;
					$scope.buscarInventarios($scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion, $scope.cantidadInventario, $scope.seleccionGrupo.id, $scope.seleccionSubGrupo.id);
				}
			}

			$scope.inventarioReporte = (idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad, grupo, subgrupo, pdf, rollo) => {
				blockUI.start();
				if (idAlmacen === null || idAlmacen === undefined) {
					return $scope.mostrarMensaje('Sucursal y almacen son requeridos.')
				}
				$scope.itemsPorPagina = itemsPagina;
				if (texto == "" || texto == null) {
					texto = 0;
				} else {
					$scope.textoBusqueda = texto;
				}
				let promesa = InventarioReporte($scope.usuario.id_empresa, idAlmacen, texto, grupo, subgrupo);
				promesa.then((res) => {
					blockUI.stop();
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje)
						return
					}
					if (pdf) {
						rollo ? $scope.generarReportePdfRollo(res.reporte) : $scope.generarReportePdf(res.reporte);
						return
					}
					$scope.generarReporteExcel(res.reporte)
					return
				}).catch(err => {
					blockUI.stop()
					// $scope.Productos = []
					let mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
					$scope.mostrarMensaje(mensaje)
				})
			}

			$scope.generarReportePdf = (reporte) => {
				var doc = new PDFDocument({ margin: 10, compress: false });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;
				var y = 90, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(reporte.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFAlmacenes(doc, 1, totalPaginas, reporte);
				doc.font('Helvetica', 7);
				for (var i = 0; i < reporte.length && items <= itemsPorPagina; i++) {
					doc.rect(30, y - 10, 555, 20).stroke();
					doc.text(reporte[i].codigo, 35, y);
					doc.text(reporte[i].cantidad, 110, y);
					doc.text(reporte[i].unidad_medida, 160, y);
					if ($scope.usuario.empresa.usar_vencimientos) {
						if (reporte[i].nombre.length > 35) {
							doc.text(reporte[i].nombre, 210, y - 6, { width: 170 });
						} else {
							doc.text(reporte[i].nombre, 210, y, { width: 170 });
						}
						reporte[i].fecha_vencimiento = new Date(reporte[i].fecha_vencimiento);
						// doc.text(reporte[i].fecha_vencimiento.getDate() + "/" + (reporte[i].fecha_vencimiento.getMonth() + 1) + "/" + reporte[i].fecha_vencimiento.getFullYear(), 380, y);
						// doc.text(((reporte[i].lote == null) ? 'No definido.' : reporte[i].lote), 430, y);
					} else {
						doc.text(reporte[i].nombre, 210, y);
					}
					doc.text(reporte[i].costo_unitario !== null ? reporte[i].costo_unitario.toFixed(2) : '-', 470, y);
					doc.text(reporte[i].costo_total !== null ? reporte[i].costo_total.toFixed(2) : '-', 530, y);
					y = y + 20;
					items++;
					totalCosto = totalCosto + reporte[i].costo_total;
					if (items == itemsPorPagina) {
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}
						doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, y);
						doc.text("EMISIÓN : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 450, y);
						doc.addPage({ margin: 0, bufferPages: true });
						y = 90;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFAlmacenes(doc, pagina, totalPaginas, reporte);
						doc.font('Helvetica', 7);
					}
				}
				doc.rect(30, y - 10, 555, 20).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Total General", 400, y);
				doc.text(Math.round(totalCosto * 100) / 100, 530, y);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.font('Helvetica', 7);
				doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, y + 20);
				doc.text("EMISIÓN : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 450, y + 20);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
			}

			$scope.generarReportePdfRollo = (reporte) => {
				var alto = 50 + (reporte.length * 8) * 2;
				var doc = new PDFDocument({ size: [226, alto], margin: 0, compress: false });
				var stream = doc.pipe(blobStream());
				var inicioFila = 7;
				var anchoVisible = 197;
				var anchoUso = anchoVisible - inicioFila;
				var y = 35;
				doc.font('Helvetica-Bold', 7);
				doc.text(reporte[0].almacen ? "REPORTE DE ALMACÉN " + reporte[0].almacen.toUpperCase() : "REPORTE DE ALMACÉN " + reporte[1].almacen.toUpperCase(), inicioFila, 15, { width: anchoUso, align: "center" });
				doc.lineWidth(0.4);
				doc.rect(inicioFila, y, anchoVisible, 0).stroke();
				doc.font('Helvetica-Bold', 5);
				doc.text("CÓDIGO", inicioFila, 28, { width: 38, align: 'center' });
				doc.text("NOMBRE", 45, 28, { width: 122, align: 'center' });
				doc.text("CANT.", 167, 28, { width: 30, align: 'center' });
				doc.font('Helvetica', 5);
				for (var i = 0; i < reporte.length; i++) {
					if (reporte[i].cantidad != null) {
						doc.text(reporte[i].codigo ? reporte[i].codigo : '', 9, y + 2, { width: 36 });
						if (reporte[i].nombre.length < 40) doc.text(reporte[i].nombre ? reporte[i].nombre.toUpperCase() : '', 47, y + 2, { width: 120 });
						doc.text(number_format_negativo_to_positvo(reporte[i].cantidad, 2), 169, y + 2, { width: 28, align: 'right' });
						if (reporte[i].nombre.length >= 40) {
							doc.text(reporte[i].nombre.toUpperCase(), 47, y + 2, { width: 120 });
							y += 3;
						}
						y = y + 8;
					}
				}
				y = y + 8;
				let hoy = new Date();
				let dia = hoy.getDate();
				let mes = hoy.getMonth() + 1;
				let aio = hoy.getFullYear();
				let hrs = hoy.getHours();
				let min = hoy.getMinutes()
				let sec = hoy.getSeconds();
				if (dia < 10) dia = '0' + dia;
				if (mes < 10) mes = '0' + mes;
				if (hrs < 10) hrs = '0' + hrs;
				if (min < 10) min = '0' + min;
				if (sec < 10) sec = '0' + sec;
				doc.text('Usuario: ' + $scope.usuario.nombre_usuario + '   Fecha Impresión: ' + dia + '/' + mes + '/' + aio + ' ' + hrs + ':' + min + ':' + sec, inicioFila, y, { width: anchoUso, align: 'center' });

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
			}
			$scope.dibujarCabeceraPDFAlmacenes = function (doc, pagina, totalPaginas, reporte) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE ALMACENES", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 10);
				doc.text("ALMACEN:" + ((reporte[0].almacen !== null && reporte[0].almacen !== undefined && reporte[0].almacen !== 0) ? reporte[0].almacen : 'TODOS LOS ALMACENES'), 0, 38, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 750, { align: "center" });

				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Código", 45, 60);
				doc.text("Cant.", 110, 60, { width: 50 });
				doc.text("Unid.", 160, 60, { width: 50 });
				doc.text("Descripción", 210, 60, { width: 170 });
				// if ($scope.usuario.empresa.usar_vencimientos) {
				// 	doc.text("Venc.", 380, 60);
				// 	doc.text("Lote", 430, 60);
				// }
				doc.text("Costo Unitario", 470, 60, { width: 50 });
				doc.text("Total General", 530, 60, { width: 50 });
			}

			$scope.generarReporteExcel = (reporte) => {
				if (reporte.length === 0) {
					blockUI.stop()
					$scope.mostrarMensaje("No hay datos, no se puede generar el reporte.")
					return
				}
				let data = [["Código", 'Nombre', "Unidad medida", "Precio unitario", "Descripción", "Inventario mínimo", "Grupo", "Sub-grupo", "Carac. Esp. 1", "Carac. Esp. 2", "Código fabricante", "Cantidad", "Costo unitario", "C/U PEPS", "Total PEPS", "Total general", "Almacen"]]
				for (let i = 0; i < reporte.length; i++) {
					let columns = [];
					columns.push(reporte[i].codigo);
					columns.push(reporte[i].nombre);
					columns.push(reporte[i].unidad_medida);
					columns.push(reporte[i].precio_unitario);
					columns.push(reporte[i].descripcion);
					columns.push(reporte[i].inventario_minimo);
					columns.push(reporte[i].grupo);
					columns.push(reporte[i].subgrupo);
					columns.push(reporte[i].caracteristica_especial1);
					columns.push(reporte[i].caracteristica_especial2);
					columns.push(reporte[i].codigo_fabrica);
					columns.push(reporte[i].cantidad);
					columns.push(reporte[i].costo_unitario);
					columns.push(reporte[i].costo_unitario_peps);
					// columns.push(reporte[i].total_peps);
					var costo_total_peps = reporte[i].ingresos_valuados - reporte[i].egresos_valuados;
					columns.push(costo_total_peps);
					columns.push(reporte[i].costo_total);
					columns.push(reporte[i].almacen);
					data.push(columns);
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				blockUI.stop()
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE INVENTARIO ALMACEN " + reporte[0].almacen.toUpperCase() + ".xlsx");
			}
			$scope.productos = [];
			$scope.buscarInventarios = function (idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad, grupo, subgrupo, color) {
				if (idAlmacen === null || idAlmacen === undefined) {
					return $scope.mostrarMensaje('Sucursal y almacen son requeridos.')
				}
				blockUI.start();
				$scope.itemsPorPagina = itemsPagina;
				if (texto == "" || texto == null) {
					texto = 0;
				} else {
					$scope.textoBusqueda = texto;
				}
				$scope.paginaActual = pagina;
				var verEstado = (color == 'todos' || color == undefined) ? 'false' : 'true';
				var promesa = InventarioPaginador($scope.usuario.id_empresa, idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad, grupo, subgrupo, $scope.usuario.id, verEstado);
				promesa.then(function (dato) {
					var productos = dato.productos;
					var mproductos = [];
					// $scope.gruposProducto.forEach(function (x) {
					// 	x.activo = false
					// 	for (var i = 0; i < dato.todos.length; i++) {
					// 		var gp = dato.todos[i];
					// 		if (x.nombre == gp.grupo) {
					// 			x.activo = true
					// 		} 
					// 	}
					// });
					for (var i = 0; i < productos.length; i++) {
						var inventarios = [], cantidadTotal = 0;
						/*for(var j=0;j<productos[i].inventarios.length;j++){
							inventarios.push({id:productos[i].inventarios[j].id,sucursal:productos[i].inventarios[j].almacen.sucursal.nombre,
											  almacen:productos[i].inventarios[j].almacen.nombre,
											  cantidad:productos[i].inventarios[j].cantidad,
											  costo_unitario:productos[i].inventarios[j].costo_unitario,
											  costo_total:productos[i].inventarios[j].costo_total,
											  fecha_vencimiento:new Date(productos[i].inventarios[j].fecha_vencimiento),
											  lote:productos[i].inventarios[j].lote});
							cantidadTotal=cantidadTotal+productos[i].inventarios[j].cantidad;
						}*/
						$scope.colorearInventarioDisponible(productos[i].cantidad, productos[i]);

						if ($scope.color == color) {
							mproductos.push({
								id: productos[i].id, nombre: productos[i].nombre, descripcion: productos[i].descripcion, codigo: productos[i].codigo, grupo: productos[i].grupo, subgrupo: productos[i].subgrupo,
								inventarios: inventarios, cantidad_total: productos[i].cantidad, fecha_vencimiento: new Date(productos[i].fecha_vencimiento), precio_unitario: productos[i].precio_unitario,
								porcentaje: $scope.porcentaje, color: $scope.color, unidad_medida: productos[i].unidad_medida
							});
						} else if (color == 'todos' || color == undefined) {
							mproductos.push({
								id: productos[i].id, nombre: productos[i].nombre, descripcion: productos[i].descripcion, codigo: productos[i].codigo, grupo: productos[i].grupo, subgrupo: productos[i].subgrupo,
								inventarios: inventarios, cantidad_total: productos[i].cantidad, fecha_vencimiento: new Date(productos[i].fecha_vencimiento), precio_unitario: productos[i].precio_unitario,
								porcentaje: $scope.porcentaje, color: $scope.color, unidad_medida: productos[i].unidad_medida
							});
						}

					}

					if (color == 'todos' || color == undefined) {
						$scope.paginas = [];
						for (var i = 1; i <= dato.paginas; i++) {
							$scope.paginas.push(i);
						}
					} else {
						$scope.paginas = [];
						var tam = 0
						for (var i = 1; i <= tam; i++) {
							$scope.paginas.push(i);
						}
					}

					$scope.productos = mproductos;

					blockUI.stop();
				}).catch(function (err) {
					blockUI.stop()
					$scope.Productos = []
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
					$scope.mostrarMensaje(mensaje)
				})
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

			$scope.abrirPopupActualizacionInventario = function (inventario) {
				$scope.inventario = inventario;
				$scope.abrirPopup($scope.idModalActualizacionInventario);
			}

			$scope.modificarCantidadInventario = function (inventario) {
				ActualizacionInventario.update({ id: inventario.id }, inventario, function (data) {
					$scope.cerrarPopupActualizacionInventario();
					$scope.mostrarMensaje(data.message);
					$scope.obtenerInventarios();
				}, function (error) {
					$scope.cerrarPopupActualizacionInventario();
					$scope.mostrarMensaje(error);
				});
			}
			$scope.editing = false;
			$scope.editDesalleMovimiento = function (producto) {

				if ($scope.display) {
					if ($scope.editing) {
						$scope.editing = false;
					} else {
						$scope.editing = true;
					}
				} else {
					if ($scope.editing) {
						$scope.editing = false;
					} else {
						$scope.editing = true;
					}
					var style = $("#" + producto.id).css("display");
					if (style == "none") {
						var ptom = IngPorInventarioDetalle(producto.id)
						ptom.then(function (res) {
							if (res.hasErr) {
								$scope.mostrarMensaje(res.mensaje)
							} else {
								producto.detallesMovimiento = res;
							}
						})
						$("#" + producto.id).css("display", "");
					} else {
						$scope.display = false
						$("#" + producto.id).css("display", "none");
					}
				}
			}

			$scope.verDetalleMovimiento = function (compra) {
				$scope.editing = false;
				var style = $("#" + compra.id).css("display");
				if (style == "none") {
					$("#" + compra.id).css("display", "");
					compra.display = true
					var ptom = IngPorInventarioDetalle(compra.id)
					ptom.then(function (res) {
						if (res.hasErr) {
							$scope.mostrarMensaje(res.mensaje)
						} else {
							compra.detallesMovimiento = res;
						}
					})
					$scope.display = true;
				} else {
					compra.display = false
					$scope.display = false
					$scope.editing = false;
					$("#" + compra.id).css("display", "none");
				}

			}

			$scope.InventariosSeleccionados = [];
			$scope.checkInventario = function (index, value, checked) {
				var idx = $scope.InventariosSeleccionados.indexOf(value.id);
				$scope.selectAll = false;
				if (idx >= 0 && !checked) {
					$scope.InventariosSeleccionados.splice(idx, 1);
				}
				if (idx < 0 && !checked) {
					$scope.InventariosSeleccionados.splice(index, 1);
				}
				if (idx < 0 && checked) {
					$scope.InventariosSeleccionados.push(value.id);
				}
			}

			$scope.checkAll = function (inventarios, selectAll) {
				if (!selectAll) {
					$scope.InventariosSeleccionados = [];
				} else {
					var result = inventarios.map(function (a) { return a.id; });
					$scope.InventariosSeleccionados = angular.copy(result);
				}
				angular.forEach(inventarios, function (user) {
					user.checked = selectAll;
				});
			};

			$scope.excelIngresosPorInventarioTodos = function () {
				var data = [["Fecha", 'Sucursal', "Código", "Cantidad", "Unidad", "Detalle", "Lote", "Vencimiento", "Costo Unitario", "Total"]]
				var ptom = IngresosPorInventarioTodo($scope.InventariosSeleccionados)
				ptom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje)
						$scope.getdetalleInventario = []
					} else {
						$scope.getdetalleInventario = res;
						for (var i = 0; i < $scope.getdetalleInventario.length; i++) {
							var columns = [];
							columns.push($scope.getdetalleInventario[i].movimiento.fecha.split("T")[0].split('-').reverse().join("/"));
							columns.push($scope.getdetalleInventario[i].movimiento.almacen.sucursal.nombre);
							columns.push($scope.getdetalleInventario[i].producto.codigo);
							columns.push($scope.getdetalleInventario[i].cantidad);
							columns.push($scope.getdetalleInventario[i].producto.unidad_medida);
							columns.push($scope.getdetalleInventario[i].producto.nombre);
							columns.push($scope.getdetalleInventario[i].inventario.lote);
							columns.push($scope.getdetalleInventario[i].inventario.fecha_vencimientoTexto ? $scope.getdetalleInventario[i].inventario.fecha_vencimientoTexto : "");
							columns.push($scope.getdetalleInventario[i].costo_unitario);
							columns.push($scope.getdetalleInventario[i].importe);
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "INGRESOS POR INVENTARIO.xlsx");
					}
				})
			}

			$scope.generarPdfIngresosPorInventario = function (compra) {
				blockUI.start();
				var ptom = IngPorInventarioDetalle(compra.id)
				ptom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje)
					} else {
						compra.detallesMovimiento = res;
						var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
						var stream = doc.pipe(blobStream());
						// draw some text
						var totalCosto = 0;
						var y = 205, itemsPorPagina = 17, items = 0, pagina = 1, totalPaginas = Math.ceil(compra.detallesMovimiento.length / itemsPorPagina);
						$scope.dibujarCabeceraPDFIngresosPorInventario(doc, compra, 1, totalPaginas);
						doc.font('Helvetica', 8);
						for (var i = 0; i < compra.detallesMovimiento.length && items <= itemsPorPagina; i++) {

							doc.rect(50, y, 540, 30).stroke();

							if ($scope.usuario.empresa.usar_vencimientos) {
								doc.text(compra.detallesMovimiento[i].producto.codigo, 60, y + 10, { width: 50 });
								doc.text(compra.detallesMovimiento[i].cantidad, 120, y + 10);
								doc.text(compra.detallesMovimiento[i].producto.unidad_medida, 150, y + 10, { width: 50 });
								doc.text(compra.detallesMovimiento[i].producto.nombre, 190, y + 10, { width: 180 });
								doc.text(compra.detallesMovimiento[i].inventario.lote, 380, y + 10);
								var fechaV = new Date(compra.detallesMovimiento[i].inventario.fecha_vencimiento)
								doc.text(fechaV.getDate() + "/" + (fechaV.getMonth() + 1) + "/" + fechaV.getFullYear(), 420, y + 10);
							} else {
								doc.text(compra.detallesMovimiento[i].producto.codigo, 70, y + 10);
								doc.text(compra.detallesMovimiento[i].cantidad, 145, y + 10);
								doc.text(compra.detallesMovimiento[i].producto.unidad_medida, 200, y + 10, { width: 50 });
								doc.text(compra.detallesMovimiento[i].producto.nombre, 270, y + 10, { width: 200 });
							}
							doc.text(compra.detallesMovimiento[i].producto.precio_unitario, 470, y + 10);
							doc.text(compra.detallesMovimiento[i].importe, 530, y + 10);

							y = y + 30;
							items++;

							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 205;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFIngresosPorInventario(doc, compra, pagina, totalPaginas);
								doc.font('Helvetica', 8);
							}
						}
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});

						blockUI.stop();
					}
				})
			}
			$scope.dibujarCabeceraPDFIngresosPorInventario = function (doc, compra, pagina, totalPaginas) {

				if ($scope.usuario.empresa.imagen.length > 100) { doc.image($scope.usuario.empresa.imagen, 60, 50, { width: 50, height: 50 }); }
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.razon_social.toUpperCase(), 60, 105);
				doc.font('Helvetica', 7);
				doc.text(compra.almacen.sucursal.nombre.toUpperCase(), 60, 113);
				doc.text(compra.almacen.sucursal.direccion.toUpperCase(), 60, 121);
				var telefono = (compra.almacen.sucursal.telefono1 != null ? compra.almacen.sucursal.telefono1 : "") +
					(compra.almacen.sucursal.telefono2 != null ? "-" + compra.almacen.sucursal.telefono2 : "") +
					(compra.almacen.sucursal.telefono3 != null ? "-" + compra.almacen.sucursal.telefono3 : "");
				doc.text("TELF.: " + telefono, 60, 129);
				doc.text("COCHABAMBA - BOLIVIA", 60, 137);

				doc.font('Helvetica-Bold', 16);
				doc.text("NOTA DE INGRESO", 150, 50);
				doc.font('Helvetica-Bold', 8);
				//doc.text(compra.actividad.nombre,380,105,{width:200});

				doc.rect(380, 50, 190, 50).stroke();
				doc.text("NIT : ", 390, 60);
				/*doc.text("FACTURA No : ",390,70);
				doc.text("AUTORIZACIÓN No : ",390,80);*/
				doc.text($scope.usuario.empresa.nit, 500, 60);
				doc.rect(50, 150, 540, 30).stroke();
				doc.text("FECHA : ", 60, 165);
				doc.font('Helvetica-Bold', 14);
				doc.text("Inventario Inicial", 360, 165);
				doc.font('Helvetica-Bold', 8);
				doc.rect(50, 180, 540, 25).stroke();
				doc.rect(50, 205, 540, 510).stroke();
				if ($scope.usuario.empresa.usar_vencimientos) {
					doc.text("CODIGO", 60, 195);
					doc.text("CANT.", 115, 195);
					doc.text("UNID.", 150, 195);
					doc.text("DETALLE", 185, 195);
					doc.text("Lote", 380, 195);
					doc.text("Venc.", 420, 195);
				} else {
					doc.text("CODIGO", 70, 195);
					doc.text("CANT.", 140, 195);
					doc.text("UNID.", 200, 195);
					doc.text("DETALLE", 270, 195);
				}
				doc.text("P. UNIT.", 470, 195);
				doc.text("TOTAL", 530, 195);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.font('Helvetica', 7);
				doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 55, 740);
				doc.text("EMISIÓN : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 490, 740);
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
			}

			$scope.compraIngresosPorInventario = function () {
				var ptom = IngPorInventario($scope.usuario.id_empresa)
				ptom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje)
						$scope.ingPorInventario = []
					} else {
						$scope.ingPorInventario = res;
					}
				})
				// IngresosPorInventario.get({ id_empresa: $scope.usuario.id_empresa }, function (dato) {
				// 	console.log(dato)
				// 	for (var i = 0; i < dato.length; i++) {
				// 		for (var j = 0; j < dato[i].detallesMovimiento.length; j++) {
				// 			dato[i].detallesMovimiento[j].inventario.fecha_vencimiento = new Date(dato[i].detallesMovimiento[j].inventario.fecha_vencimiento);
				// 			dato[i].detallesMovimiento[j].inventario.fecha_vencimientoTexto = dato[i].detallesMovimiento[j].inventario.fecha_vencimiento.getDate() + "/" + (dato[i].detallesMovimiento[j].inventario.fecha_vencimiento.getMonth() + 1) + "/" + dato[i].detallesMovimiento[j].inventario.fecha_vencimiento.getFullYear();
				// 		}

				// 	}
				// 	console.log(dato)
				// 	$scope.ingPorInventario = dato;


				// });


			}
			$scope.excelIngPorInventario = function () {
				var data = [["Compra", "Fecha", 'Sucursal', "Código", "Cantidad", "Unidad", "Detalle", "Lote", "Vencimiento", "Costo Unitario", "Total"]]
				for (var i = 0; i < $scope.ingPorInventario.length; i++) {

					for (var index = 0; index < $scope.ingPorInventario[i].detallesMovimiento.length; index++) {
						var columns = [];
						columns.push($scope.ingPorInventario[i].id);
						columns.push($scope.ingPorInventario[i].fecha.split("T")[0].split('-').reverse().join("/"));
						columns.push($scope.ingPorInventario[i].almacen.sucursal.nombre);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].producto.codigo);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].cantidad);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].producto.unidad_medida);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].producto.nombre);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].inventario.lote);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].inventario.fecha_vencimientoTexto ? $scope.ingPorInventario[i].detallesMovimiento[index].inventario.fecha_vencimientoTexto : "");
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].costo_unitario);
						columns.push($scope.ingPorInventario[i].detallesMovimiento[index].importe);
						data.push(columns);
					}
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "INGRESOS POR INVENTARIO.xlsx");
			}

			$scope.excelIngPorInventarioSucursal = function (compra) {
				var data = [["Fecha", 'Sucursal', "Código", "Cantidad", "Unidad", "Detalle", "Lote", "Vencimiento", "Costo Unitario", "Total"]]
				var ptom = IngPorInventarioDetalle(compra.id)
				ptom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.mensaje)
						$scope.getdetalleInventario = []
					} else {
						$scope.getdetalleInventario = res;
						for (var i = 0; i < $scope.getdetalleInventario.length; i++) {
							var columns = [];
							columns.push(compra.fecha.split("T")[0].split('-').reverse().join("/"));
							columns.push(compra.almacen.sucursal.nombre);
							columns.push($scope.getdetalleInventario[i].producto.codigo);
							columns.push($scope.getdetalleInventario[i].cantidad);
							columns.push($scope.getdetalleInventario[i].producto.unidad_medida);
							columns.push($scope.getdetalleInventario[i].producto.nombre);
							columns.push($scope.getdetalleInventario[i].inventario.lote);
							columns.push($scope.getdetalleInventario[i].inventario.fecha_vencimientoTexto ? $scope.getdetalleInventario[i].inventario.fecha_vencimientoTexto : "");
							columns.push($scope.getdetalleInventario[i].costo_unitario);
							columns.push($scope.getdetalleInventario[i].importe);
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "INGRESOS POR INVENTARIO.xlsx");
					}
				})
			}

			$scope.cerrarPopupActualizacionInventario = function () {
				$scope.cerrarPopup($scope.idModalActualizacionInventario);
			}
			$scope.abrirPopupIngresosPorInventario = function (inventario) {
				$scope.inventario = inventario;
				$scope.compraIngresosPorInventario();
				$scope.abrirPopup($scope.idModalIngresosPorInventario);
			}
			$scope.cerrarPopupIngresosPorInventario = function () {
				$scope.cerrarPopup($scope.idModalIngresosPorInventario);
			}

			$scope.crearNuevoInventario = function () {
				$scope.abrirPopup($scope.idModalCreacionInventario);
			}

			$scope.buscarProducto = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ListaProductosEmpresa($scope.usuario.id_empresa, query);
					return promesa;
				}

			}

			$scope.cerrarPopupInvInicial = function () {
				$scope.cerrarPopup($scope.idModalCreacionInventario);
			}

			/*$scope.obtenerInventarios=function(){
				blockUI.start();
				var promesa=Inventarios($scope.usuario.id_empresa);
				promesa.then(function(productos){
					var mproductos=[];
					for(var i=0;i<productos.length;i++){
						var inventarios=[],cantidadTotal=0;
						for(var j=0;j<productos[i].inventarios.length;j++){
							inventarios.push({ sucursal:productos[i].inventarios[j].almacen.sucursal.nombre,
											  almacen:productos[i].inventarios[j].almacen.nombre,
											  cantidad:productos[i].inventarios[j].cantidad,
											  costo_unitario:productos[i].inventarios[j].costo_unitario,
											  costo_total:productos[i].inventarios[j].costo_total});
							cantidadTotal=cantidadTotal+productos[i].inventarios[j].cantidad;
						}
						mproductos.push({nombre:productos[i].nombre,codigo:productos[i].codigo,inventarios:inventarios,cantidad_total:cantidadTotal});
					}
					$scope.productos=mproductos;
					blockUI.stop();
				});
			}*/

			$scope.sumarCantidadAlmacen = function (inventarios, sucursal, almacen) {
				inventarios = $filter('filter')(inventarios, sucursal);
				inventarios = $filter('filter')(inventarios, almacen);
				var suma = 0;
				for (var i = 0; i < inventarios.length; i++) {
					suma = suma + inventarios[i].cantidad;
				}
				return suma;
			}

			$scope.sumarCostoTotalAlmacen = function (inventarios, sucursal, almacen) {
				inventarios = $filter('filter')(inventarios, sucursal);
				inventarios = $filter('filter')(inventarios, almacen);
				var suma = 0;
				for (var i = 0; i < inventarios.length; i++) {
					suma = suma + inventarios[i].costo_total;
				}
				return suma;
			}

			$scope.sumarCantidadSucursal = function (inventarios, sucursal) {
				inventarios = $filter('filter')(inventarios, sucursal);
				var suma = 0;
				for (var i = 0; i < inventarios.length; i++) {
					suma = suma + inventarios[i].cantidad;
				}
				return suma;
			}

			$scope.sumarCostoTotalSucursal = function (inventarios, sucursal) {
				inventarios = $filter('filter')(inventarios, sucursal);
				var suma = 0;
				for (var i = 0; i < inventarios.length; i++) {
					suma = suma + inventarios[i].costo_total;
				}
				return suma;
			}

			$scope.bajarExcelInventarios = function () {
				var promesa = ProductosUsuario($scope.usuario.id_empresa, $scope.usuario.id);
				promesa.then(function (productos) {
					var data = [["Codigo", "Nombre o Descripción", "Unidad de medida", "Costo Unitario", "Cantidad a ingresar",
						"Fecha de vencimiento (dia/mes/año)", "Lote"]]
					var totalCosto = 0;
					for (var i = 0; i < productos.length; i++) {
						var columns = [];
						columns.push(productos[i].codigo);
						columns.push(productos[i].nombre);
						columns.push(productos[i].unidad_medida);
						data.push(columns);
					}

					var ws_name = "INVENTARIO";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "EJEMPLO-DATOS-INVENTARIOS.xlsx");
					blockUI.stop();
				});
			}

			$scope.guardarInventarioInicial = function (producto, id_almacen) {
				if (producto.fechaVencimientoTexto) {
					producto.fecha_vencimiento = new Date($scope.convertirFecha(producto.fechaVencimientoTexto));
				}
				var productos = [];
				productos.push(producto);
				var productosEmpresa = new Inventario({ productos: productos, id_empresa: $scope.usuario.id_empresa, id_almacen: $scope.id_almacen });
				var obj = { productos: productos, id_empresa: $scope.usuario.id_empresa, id_almacen: $scope.id_almacen }
				var prom = InventarioInicial(obj)
				prom.then(function (res) {
					if (res.hasErr) {
						$scope.mostrarMensaje(res.message)
					} else {
						$scope.mostrarMensaje(res.message)
						$scope.cerrarPopupInvInicial();
						$scope.recargarItemsTabla();
					}
				}).catch(function (err) {
					var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
					$scope.mostrarMensaje(mensaje);
					blockUI.stop();
				});
				// productosEmpresa.$save(function (res) {
				// 	blockUI.stop();
				// 	$scope.cerrarPopupInvInicial();
				// 	$scope.mostrarMensaje(res.message);
				// 	$scope.recargarItemsTabla();
				// }, function (error) {
				// 	blockUI.stop();
				// 	$scope.cerrarPopupInvInicial();
				// 	$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
				// 	$scope.recargarItemsTabla();
				// });
			}

			$scope.subirExcelInventarios = function (event, id_almacen) {
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
							producto.unidad_medida = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							producto.costo_unitario = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? parseFloat(worksheet['D' + row].v.toString()) : null;
							producto.cantidad = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? parseFloat(worksheet['E' + row].v.toString()) : null;
							var fecha_vencimiento = null;
							if (worksheet['F' + row] != undefined && worksheet['F' + row] != "") {
								if (typeof worksheet['F' + row].v === 'number') {
									if (worksheet['F' + row].v % 1 === 0) {
										fecha_vencimiento = new Date((worksheet['F' + row].v - (25567 + 1)) * 86400 * 1000);
									}
								} else {
									fecha_vencimiento = new Date($scope.convertirFecha(worksheet['F' + row].v));
								}
							}
							producto.fecha_vencimiento = fecha_vencimiento;
							producto.lote = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							productos.push(producto);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarInventario(productos, id_almacen);
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.guardarInventario = function (productos, id_almacen) {
				var productosEmpresa = new Inventario({ productos: productos, id_empresa: $scope.usuario.id_empresa, id_almacen: $scope.id_almacen });
				productosEmpresa.$save(function (res) {
					blockUI.stop();
					$scope.mostrarMensaje(res.message);
					$scope.recargarItemsTabla();
				}, function (error) {
					blockUI.stop();
					$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
					$scope.recargarItemsTabla();
				});
			}
			$scope.animate = false;
			$scope.editMovientoDetalle = function (detallesMovimiento) {
				detallesMovimiento.inventario.fecha_vencimiento = new Date($scope.convertirFecha(detallesMovimiento.inventario.fecha_vencimientoTexto));
				detallesMovimiento.total = detallesMovimiento.cantidad * detallesMovimiento.costo_unitario - detallesMovimiento.descuento + detallesMovimiento.recargo - detallesMovimiento.ice - detallesMovimiento.excento
				ActualizarDetalleMovimiento.update({ id: detallesMovimiento.id }, detallesMovimiento, function (data) {
					$timeout(function () {
						$scope.animate = true;
						$timeout(function () {
							$scope.animate = false;
						}, 1000);
					}, 1000);

				}, function (error) {
					$scope.mostrarMensaje(error);
				});

			}
			$scope.editItem = function (item) {
				item.editing = true;
			}

			$scope.doneEditing = function (item) {
				item.editing = false;
				//dong some background ajax calling for persistence...
			};
			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				ejecutarScriptsInventario($scope.idModalActualizacionInventario, $scope.idModalCreacionInventario, $scope.idModalIngresosPorInventario, $scope.idModalMovimientoConsolidados);
				blockUI.stop();
			});			

			$scope.abrirModalMovimientosConsolidados = function () {
				$scope.abrirPopup($scope.idModalMovimientoConsolidados);
			}

			$scope.cerrarModalMovimientosConsolidados = function () {
				$scope.cerrarPopup($scope.idModalMovimientoConsolidados);
			}

			$scope.reporteMovimientosConsolidados = function (filtro) {
				blockUI.start()
				var prom = ObtenerGestionesEEFF($scope.usuario.id_empresa)
				prom.then (impresionEmpresa=> {
					var configEmpresa = impresionEmpresa.filter(cfg => cfg.habilitado === true)
					if(configEmpresa.length === 1){
						var promesa = ReporteMovimientosConsolidados($scope.usuario.id_empresa, filtro)
						promesa.then(function (datos) {
							if (datos.length == 0) {
								SweetAlert.swal("", "No se encontraron productos con movimientos...", "warning");
								blockUI.stop()
							} else {
								var doc = new PDFDocument({ compress: false, margin: 10, size: 'legal', layout: 'landscape' });
								var stream = doc.pipe(blobStream());
								doc.font('Helvetica', 8);
								var y = 105, itemsPorPagina = 23, items = 0, pagina = 1;
								var totalPaginas = Math.ceil(datos.length / itemsPorPagina);
								$scope.dibujarCabeceraPDFMovimientosConsolidados(doc, pagina, totalPaginas, filtro);
								for (var i = 0; i < datos.length; i++) {
									$scope.generarMovimientosConsolidados(datos[i], doc, y, i);
									var indice = i + 1;
									doc.text(indice, 25, y);
									y = y + 20;
									items++;
									if (items == itemsPorPagina || i + 1 == datos.length) {
										if (i + 1 == datos.length) {

										} else {
											doc.addPage({ margin: 10, size: 'legal', layout: 'landscape' });
											y = 105;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraPDFMovimientosConsolidados(doc, pagina, totalPaginas, filtro);
											doc.font('Helvetica', 8);
										}
									}
									if (i === (datos.length - 1)) {
										var fechaActual = new Date();
										var min = fechaActual.getMinutes();
										if (min < 10) {
											min = "0" + min;
										}
										doc.font('Helvetica', 7);
										doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, 570);
										doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 45, 580);

										doc.end();
										stream.on('finish', function () {
											var fileURL = stream.toBlobURL('application/pdf');
											window.open(fileURL, '_blank', 'location=no');
										});

									}
								}
							}
							blockUI.stop();

						});
					}else{
						SweetAlert.swal("", "Error en la configuracion de tipo gestión en la empresa", "warning");
					}
					
				})
			}
			$scope.reporteMovimientosConsolidadosXlsx = function (filtro) {
				var promesa = ReporteMovimientosConsolidados($scope.usuario.id_empresa, filtro);
				promesa.then(function (datos) {
					if (datos.length == 0) {
						$scope.mostrarMensaje('No existen Movimientos')
					} else {
						let data = [["N°", 'CÓDIGO', "PRODUCTO",'UND-MEDIDA', "I. INICIAL", "COMPRAS", "DEVOLUCIONES", "I. TRASPASO", "I. AJUSTE", "VENTAS", "CONSUMOS", "E. TRASPASOS", "T. ALMACÉN", "T. MANTENIMIENTO", "DOTACIÓN", "BAJAS", "SALDO"]]
						for (let i = 0; i < datos.length; i++) {
							let columns = [];
							columns.push(i+1);
							columns.push(datos[i].codigo);
							columns.push(datos[i].nombre);
							columns.push(datos[i].unidad_medida);
							let ii = datos[i].inv_inicial_ing - datos[i].inv_inicial_egr
							if(datos[i].ing_saldo_ant != undefined ) ii += datos[i].ing_saldo_ant;
							if(datos[i].egr_saldo_ant != undefined ) ii -= datos[i].egr_saldo_ant;
							columns.push(ii);
							columns.push(datos[i].ing_compras );
							columns.push(datos[i].ing_devoluciones );
							columns.push(datos[i].ing_traspaso );
							columns.push(datos[i].ing_ajustes );
							columns.push(datos[i].egr_ventas );
							columns.push(datos[i].egr_consumo );
							columns.push(datos[i].egr_traspaso );
							columns.push(datos[i].egr_trasp_almacen );
							columns.push(datos[i].egr_trasp_mant );
							columns.push(datos[i].egr_dotacion );
							columns.push(datos[i].egr_bajas );
							let saldo = ii + datos[i].ing_compras + datos[i].ing_devoluciones + datos[i].ing_traspaso + datos[i].ing_ajustes - datos[i].egr_ventas - datos[i].egr_consumo - datos[i].egr_traspaso - datos[i].egr_trasp_almacen - datos[i].egr_trasp_mant - datos[i].egr_dotacion - datos[i].egr_bajas;
							columns.push(saldo);

							data.push(columns);
						}
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						blockUI.stop()
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE MOVIMIENTOS CONSOLIDADOS " + ".xlsx");
					}

				});
			}

			$scope.dibujarCabeceraPDFMovimientosConsolidados = function (doc, pagina, totalPaginas, filtro) {
				doc.font('Helvetica-Bold', 12);
				doc.text("MOVIMIENTOS DE ALMACÉN CONSOLIDADO", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Del  " + filtro.inicio + " Al  "+filtro.fin, 0, 40, { align: "center" });
				var nombreGrupo = filtro.grupo ? filtro.grupo.nombre : "TODOS";
				doc.text("SUCURSAL: " + filtro.sucursal.nombre +"          ALMACÉN: " + filtro.almacen.nombre+"          GRUPO: "+ nombreGrupo, 0, 55, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.rect(20, 70, 968, 20).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("N°", 25, 78, { width: 30, align: 'center' });
				doc.text("Código", 55, 78, { width: 65 });
				doc.text("Producto ", 120, 78, { width: 218, align: 'center' });
				doc.text("I. Inicial", 338, 78, { width: 50, align: 'center' });
				doc.text("Compras", 388, 78, { width: 50, align: 'center' });
				doc.text("Dev.", 438, 78, { width: 50, align: 'center' });
				doc.text("I.Trasp.", 488, 78, { width: 50, align: 'center' });
				doc.text("I.Ajustes", 538, 78, { width: 50, align: 'center' });
				doc.text("Ventas", 588, 78, { width: 50, align: 'center' });
				doc.text("Consumo", 638, 78, { width: 50, align: 'center' });
				doc.text("E.Trasp.", 688, 78, { width: 50, align: 'center' });
				doc.text("T. Alm.", 738, 78, { width: 50, align: 'center' });
				doc.text("T. Mant.", 788, 78, { width: 50, align: 'center' });
				doc.text("Dotación", 838, 78, { width: 50, align: 'center' });
				doc.text("Bajas", 888, 78, { width: 50, align: 'center' });
				doc.text("Saldo", 938, 78, { width: 50, align: 'center' });

				doc.font('Helvetica', 8);
				doc.text("Pagina " + pagina + " de " + totalPaginas, 0, 580, {align:'center'});
			}

			$scope.generarMovimientosConsolidados = function (datos, doc, y, i) {
				doc.font('Helvetica');
				let ii = datos.inv_inicial_ing - datos.inv_inicial_egr;
				if(datos.ing_saldo_ant != undefined) ii += datos.ing_saldo_ant
				if(datos.egr_saldo_ant != undefined) ii -= datos.egr_saldo_ant
				doc.text(datos.codigo, 55, y, {width: 65});
				doc.text(datos.nombre, 120, y, { width: 218 });
				doc.text(number_format_negativo_to_positvo(ii, 2), 338, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.ing_compras, 2), 388, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.ing_devoluciones, 2), 438, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.ing_traspaso, 2), 488, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.ing_ajustes, 2), 538, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_ventas, 2), 588, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_consumo, 2), 638, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_traspaso, 2), 688, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_trasp_almacen, 2), 738, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_trasp_mant, 2), 788, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_dotacion, 2), 838, y, {width:40, align: 'right'});
				doc.text(number_format_negativo_to_positvo(datos.egr_bajas, 2), 888, y, {width:40, align: 'right'});
				let saldo = ii + datos.ing_compras + datos.ing_devoluciones + datos.ing_traspaso + datos.ing_ajustes - datos.egr_ventas - datos.egr_consumo - datos.egr_traspaso - datos.egr_trasp_almacen - datos.egr_trasp_mant - datos.egr_dotacion - datos.egr_bajas;
				doc.text(saldo ? number_format_negativo_to_positvo(saldo, 2) : 0, 938, y, {width: 40, align:'right'});
				
			}

			function round(value, decimals) {
				return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
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
			/* fin kardex  */
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalActualizacionInventario);
				$scope.eliminarPopup($scope.idModalCreacionInventario);
				$scope.eliminarPopup($scope.idModalIngresosPorInventario);
				$scope.eliminarPopup($scope.idModalWizardProductoKardex);
				$scope.eliminarPopup($scope.idModalMovimientoConsolidados);
				
			});
			$scope.dynamicPopoverReportes = {
				content: '',
				templateUrl: 'myPopoverTemplate.html',
				title: ''
			};
			$scope.inicio();
		}]);