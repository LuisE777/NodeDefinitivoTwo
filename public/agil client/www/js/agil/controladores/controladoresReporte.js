angular.module('agil.controladores')
	.controller('ControladorEstadoCuentasProveedores', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', '$timeout',
		'uiGmapGoogleMapApi', 'ReportEstadoCuentasProveedoresDatos', 'InventariosCosto', 'ObtenerAnticiposProveedor', 'PagosCompraCreditosAnticipo','ReportEstadoCuentasXproveedor', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, $timeout,
			uiGmapGoogleMapApi, ReportEstadoCuentasProveedoresDatos, InventariosCosto, ObtenerAnticiposProveedor, PagosCompraCreditosAnticipo, ReportEstadoCuentasXproveedor) {
			blockUI.start();


			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.idModalTablaEstadoCuenta = "tabla-estado-cuenta";
			$scope.idModalPagoDeudaProveedor = 'modal-pago-deuda-proveedor'
			$scope.inicio = function () {
				$scope.proveedores = ReportEstadoCuentasProveedoresDatos.show({ id_empresa: $scope.usuario.id_empresa });
				//console.log($scope.proveedores);
				setTimeout(function () {
					ejecutarScriptsTabla('tabla-estadoCuentaProveedores', 10);
				}, 2000);
				uiGmapGoogleMapApi.then(function (maps) {
					//console.log(maps);//google.maps.event.trigger(maps[0].map, 'resize');
					$scope.map = {
						center: { latitude: -17.403800007775388, longitude: -66.11349012184144 }, zoom: 17, bounds: {
							northeast: {
								latitude: -17.403800007775388,
								longitude: -66.11349012184144
							}
						}
					};
					$scope.options = {
						scrollwheel: false,
						mapTypeId: google.maps.MapTypeId.SATELLITE
					};
				});
			}

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsEstadoCuentaProveedor($scope.idModalPagoDeudaProveedor, $scope.idModalTablaEstadoCuenta);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion();
				blockUI.stop();
			});

			$scope.generarPdfEstadoCuentasProveedor = function (proveedor) {
				blockUI.start();


				var doc = new PDFDocument({ size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;
				var y = 120, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(proveedor.compras.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFEstadoCuentasProveedor(doc, 1, totalPaginas, proveedor);
				doc.font('Helvetica', 8);
				for (var i = 0; i < proveedor.compras.length && items <= itemsPorPagina; i++) {

					doc.rect(30, y - 10, 555, 20).stroke();
					proveedor.compras[i].fecha = new Date(proveedor.compras[i].fecha);
					doc.text(proveedor.compras[i].fecha.getDate() + "/" + (proveedor.compras[i].fecha.getMonth() + 1) + "/" + proveedor.compras[i].fecha.getFullYear(), 45, y);
					doc.text(proveedor.compras[i].id_movimiento, 170, y, { width: 45, align: "right" });

					if (proveedor.compras[i].factura == null) {
						doc.text('PROFORMA', 240, y);
					} else {
						doc.text('Factura nro. ' + proveedor.compras[i].factura, 240, y);
					}
					doc.text(proveedor.compras[i].saldo, 445, y, { width: 50, align: "right" });
					totalCosto = totalCosto + proveedor.compras[i].saldo;
					doc.text(totalCosto, 500, y, { width: 50, align: "right" });
					y = y + 20;
					items++;

					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 120;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoCuentasProveedor(doc, pagina, totalPaginas, Proveedor);
						doc.font('Helvetica', 8);
					}
				}
				doc.rect(30, y - 10, 555, 20).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Total General", 350, y);
				doc.text(totalCosto, 446, y, { width: 50, align: "right" });
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});

				blockUI.stop();

			}
			$scope.generarExcelEstadoCuentasProveedor = function (proveedor) {
				var data = [["", "", "ESTADO CUENTAS PROVEEDOR"], ["Deudor :" + proveedor.razon_social], ["Fecha", "N Recibo", "Descripción", "monto", "total", "total General"]]
				var totalCosto = 0;
				for (var i = 0; i < proveedor.compras.length; i++) {
					var columns = [];
					totalCosto = totalCosto + proveedor.compras[i].saldo;
					proveedor.compras[i].fecha = new Date(proveedor.compras[i].fecha);
					columns.push(proveedor.compras[i].fecha.getDate() + "/" + (proveedor.compras[i].fecha.getMonth() + 1) + "/" + proveedor.compras[i].fecha.getFullYear());
					columns.push(proveedor.compras[i].id_movimiento);
					if (proveedor.compras[i].factura == null) {
						columns.push('PROFORMA');
					} else {
						columns.push('factura : ' + proveedor.compras[i].factura);
					}
					columns.push(proveedor.compras[i].saldo);
					columns.push(totalCosto);
					columns.push(totalCosto);
					data.push(columns);
				}

				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-PROVEEDOR.xlsx");
				blockUI.stop();

			}

			$scope.dibujarCabeceraPDFEstadoCuentasProveedor = function (doc, pagina, totalPaginas, proveedor) {
				doc.font('Helvetica-Bold', 12);
				doc.text("ESTADO DE CUENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Acreedor : ", 45, 60);
				doc.font('Helvetica', 8);
				doc.text(proveedor.razon_social, 140, 60);
				doc.rect(30, 80, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha", 45, 90);
				doc.text("Nro. Recibo", 170, 90, { width: 50 });
				doc.text("Descripción", 240, 90, { width: 60 });
				doc.text("Monto", 470, 90, { width: 50 });
				doc.text("Total", 530, 90, { width: 50 });
				doc.font('Helvetica', 8);
			}

			$scope.abrirEstadoCuentaProveedor = function (proveedor) {
				//console.log(cliente)
				$scope.totalPagado = 0;
			 	const promesa = ReportEstadoCuentasXproveedor( proveedor.id).then(function (detallesProveedor) {
					proveedor.compras=detallesProveedor
					for (var i = 0; i < proveedor.compras.length; i++) {
						var fecha = new Date(proveedor.compras[i].fecha)
						proveedor.compras[i].totalgeneral = 0;
						proveedor.compras[i].totalPago = 0;
						if (i == 0) {
							proveedor.compras[i].totalgeneral = proveedor.compras[i].totalgeneral + proveedor.compras[i].saldo;
						} else {
							proveedor.compras[i].totalgeneral = proveedor.compras[i - 1].totalgeneral + proveedor.compras[i].saldo;
						}
						for (var f = 0; f < proveedor.compras[i].pagosCompra.length; f++) {
							proveedor.compras[i].pagosCompra[f].total = proveedor.compras[i].pagosCompra[f].saldo_anterior - proveedor.compras[i].pagosCompra[f].monto_pagado;
							proveedor.compras[i].totalPago = proveedor.compras[i].totalPago + proveedor.compras[i].pagosCompra[f].monto_pagado;
						}
						proveedor.compras[i].fecha_vencimiento = $scope.sumaFecha(proveedor.compras[i].dias_credito, fecha);
						//console.log(proveedor.compras[i].tipoPago.nombre)
					}
					//console.log($scope.totalPagado)
	
					var i = proveedor.compras.length - 1;
					$scope.totalgeneral = 0;
					$scope.totalgeneral = proveedor.compras[i].totalgeneral;
					$scope.proveedorCompras = proveedor;
					$scope.obtenerAnticiposProveedor(proveedor)
					$scope.abrirPopup($scope.idModalTablaEstadoCuenta);
				})
				
			}
			$scope.click = function () {
				setTimeout(function () {
					var element = angular.element(document.getElementsByClassName('verDetallePago'));
					element.triggerHandler('click');

				}, 0);
			};
			$scope.obtenerAnticiposProveedor = function (proveedor) {
				var promesa = ObtenerAnticiposProveedor(proveedor.id)
				$scope.totalAnticipos = 0
				promesa.then(function (dato) {
					$scope.proveedorCompras.anticipos = dato
					dato.forEach(function (anticipo) {
						$scope.totalAnticipos += anticipo.saldo
					});
				})
			}
			$scope.verDetallePagos = function (compra) {

				var style = $("#" + compra.id_movimiento).css("display");
				if (style == "none") {
					$("#" + compra.id_movimiento).css("display", "");
				} else {
					$("#" + compra.id_movimiento).css("display", "none");
				}
			}
			$scope.cerrarEstadoCuentaProveedor = function () {
				$scope.cerrarPopup($scope.idModalTablaEstadoCuenta);
			}
			$scope.abrirPagoDeudaProveedor = function (compra) {
				$scope.compra = compra
				$scope.abrirPopup($scope.idModalPagoDeudaProveedor);
			}
			$scope.cerrarPagoDeudaProveedor = function () {
				$scope.cerrarPopup($scope.idModalPagoDeudaProveedor);
			}
			$scope.guardarCompensacionDeuda = function (pago) {
				if (pago <= $scope.totalAnticipos) {
					$scope.realizarPago($scope.compra.id, $scope.usuario.id_empresa, $scope.compra.id_proveedor, pago, $scope.usuario.id)
				} else {
					$scope.mostrarMensaje("el valor no puede ser mayor al monto total de anticipos que es  " + $scope.totalAnticipos)
				}
			}
			$scope.realizarPago = function (idVenta, idEmpresa, idProveedor, pago, idUsuario) {

				blockUI.start();
				var promesa = PagosCompraCreditosAnticipo(idVenta, idEmpresa, idProveedor, { pago: pago, id_usuario_cajero: idUsuario, fecha: new Date() })
				promesa.then(function (data) {
					$scope.mostrarMensaje(data.mensaje);

					$scope.proveedores = ReportEstadoCuentasProveedoresDatos.show({ id_empresa: $scope.usuario.id_empresa });
					$scope.cerrarPagoDeudaProveedor()
					$scope.imprimirReciboNuevo(data, data.compra, pago);
					$scope.cerrarEstadoCuentaProveedor()
					blockUI.stop();
				})
			}
			$scope.imprimirReciboNuevo = function (data, venta, pago) {
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
				doc.text("COMPENSACION", { align: 'center' });
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
				doc.text("He recibido de : " + $scope.proveedorCompras.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("       CONCEPTO                                   ", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + venta.factura : "Proforma nro. " + venta.factura;
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
			$scope.imprimirRecibo = function (pagosVenta, venta) {
				blockUI.start();
				var doc = new PDFDocument({ size: [227, 353], margin: 10 });
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
				doc.text(pagosVenta.numero_documento, { align: 'center' });
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
				doc.text("He recibido de : " + $scope.proveedorCompras.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("CONCEPTO", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = "Doc. Nro. " + venta.factura;
				doc.text(textoFact, 105, 210, { width: 100 });
				doc.text("Saldo Bs " + (pagosVenta.saldo_anterior) + ".-", 105, 220, { width: 100 });
				doc.text("Bs " + pagosVenta.monto_pagado + ".-", 170, 210, { width: 100 });

				doc.text("--------------", 10, 230, { align: 'right' });
				//oc.text("--------------------",{align:'right'});
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.              " + pagosVenta.monto_pagado, { align: 'right' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				//doc.text("SON: "+data.pago,{align:'left'});
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
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalTablaEstadoCuenta);
				$scope.eliminarPopup($scope.idModalPagoDeudaProveedor);
			});


			$scope.inicio();
		}])
	.controller('ControladorEstadoCuentasClientes', ['$scope', '$window', '$localStorage', '$location',
		'$templateCache', '$route', 'blockUI', '$timeout', 'Paginator',
		'uiGmapGoogleMapApi', 'ReportEstadoCuentasClientesDatos', 'InventariosCosto', 'ReporteClientesPaginador', 'ObtenerAnticiposCliente', 'PagosVentaCreditosAnticipo', 'ReporteClientesMantenimientoPaginador', 'PagosOTCreditos', 'ReporteClienteMantenimientoDetalles', 'SweetAlert','listaProformaReporte','ReporteClienteProformaDetalles','reporteClienteProformaTrans','ObtenerDatosProformaTransaccion','ObtenerImagen','ReporteClienteProformaDetallesPDF', function ($scope, $window, $localStorage, $location,
			$templateCache, $route, blockUI, $timeout, Paginator,
			uiGmapGoogleMapApi, ReportEstadoCuentasClientesDatos, InventariosCosto, ReporteClientesPaginador, ObtenerAnticiposCliente, PagosVentaCreditosAnticipo, ReporteClientesMantenimientoPaginador, PagosOTCreditos, ReporteClienteMantenimientoDetalles, SweetAlert, listaProformaReporte, ReporteClienteProformaDetalles, reporteClienteProformaTrans, ObtenerDatosProformaTransaccion, ObtenerImagen, ReporteClienteProformaDetallesPDF) {
			blockUI.start();
			$scope.idModalTablaEstadoCuenta = "tabla-estado-cuenta";
			$scope.idModalTablaEstadoCuentaMantenimiento = "tabla-estado-cuenta-mantenimiento";
			$scope.idModalPagoDeudaCliente = 'modal-pago-deuda-cliente'
			$scope.idTabReporte = 'tab-reporte-estado-cliente';
			$scope.idModalPagoCreditoMantenmimiento = 'dialog-pago-credito-mantenimiento';
			$scope.idModalTablaEstadoCuentaProforma = "tabla-estado-cuenta-proforma";
			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.obtenerClientes();
				//console.log($scope.clientes);
				uiGmapGoogleMapApi.then(function (maps) {
					//console.log(maps);//google.maps.event.trigger(maps[0].map, 'resize');
					$scope.map = {
						center: { latitude: -17.403800007775388, longitude: -66.11349012184144 }, zoom: 17, bounds: {
							northeast: {
								latitude: -17.403800007775388,
								longitude: -66.11349012184144
							}
						}
					};
					$scope.options = {
						scrollwheel: false,
						mapTypeId: google.maps.MapTypeId.SATELLITE
					};
				});

			}

			$scope.$on('$viewContentLoaded', function () {
				ejecutarScriptsEstadoCuentasClientes($scope.idModalTablaEstadoCuenta, $scope.idModalPagoDeudaCliente, $scope.idModalTablaEstadoCuentaMantenimiento, $scope.idModalPagoCreditoMantenmimiento,  $scope.idModalTablaEstadoCuentaProforma);
				blockUI.stop();
			});

			$scope.obtenerClientes = function () {
				$scope.paginator = Paginator();
				$scope.paginator.column = "codigo";
				$scope.paginator.callBack = $scope.obtenerLista;
				$scope.filtro = { empresa: $scope.usuario.id_empresa, cuentas_liquidadas: 0 };
				$scope.paginator.getSearch("", $scope.filtro, null);
			}

			$scope.obtenerLista = function () {
				blockUI.start();
				var promesa = ReporteClientesPaginador($scope.paginator);
				promesa.then(function (dato) {
					$scope.paginator.setPages(dato.paginas);
					$scope.clientes = dato.clientes;
					blockUI.stop();
				})
			}
			// estado clientes mantenimiento =================================
			$scope.obtenerClientesMantenimiento = function () {
				$scope.paginatorM = Paginator();
				$scope.paginatorM.column = "codigo";
				$scope.paginatorM.callBack = $scope.obtenerListaClienteMantenimiento;
				$scope.filtro = { empresa: $scope.usuario.id_empresa, cuentas_liquidadas: 0 };
				$scope.paginatorM.getSearch("", $scope.filtro, null);
			}

			$scope.obtenerListaClienteMantenimiento = function () {
				blockUI.start();
				var promesa = ReporteClientesMantenimientoPaginador($scope.paginatorM);
				promesa.then(function (dato) {
					$scope.paginatorM.setPages(dato.paginas);
					$scope.clientesM = dato.clientes;
					blockUI.stop();
				})
			}

			$scope.abrirEstadoCuentaClienteMantenimiento = function (cliente, liquidado) {
				$scope.totalPagado = 0;

				var promesa = ReporteClienteMantenimientoDetalles(cliente.id,  liquidado);
				promesa.then(function (datos) {
					cliente.mantenimiento_ot = datos.detalles;
					for (var i = 0; i < cliente.mantenimiento_ot.length; i++) {
						var fecha = new Date(cliente.mantenimiento_ot[i].fecha_hora_aviso)
						cliente.mantenimiento_ot[i].totalgeneral = 0;
						cliente.mantenimiento_ot[i].totalPago = 0;
						if (i == 0) {
							cliente.mantenimiento_ot[i].totalgeneral = cliente.mantenimiento_ot[i].totalgeneral + cliente.mantenimiento_ot[i].saldo;
						} else {
							cliente.mantenimiento_ot[i].totalgeneral = cliente.mantenimiento_ot[i - 1].totalgeneral + cliente.mantenimiento_ot[i].saldo;
						}
						for (var f = 0; f < cliente.mantenimiento_ot[i].pagosOT.length; f++) {
							cliente.mantenimiento_ot[i].pagosOT[f].total = cliente.mantenimiento_ot[i].pagosOT[f].saldo_anterior - cliente.mantenimiento_ot[i].pagosOT[f].monto_pagado;
	
							cliente.mantenimiento_ot[i].totalPago = cliente.mantenimiento_ot[i].totalPago + cliente.mantenimiento_ot[i].pagosOT[f].monto_pagado;
						}
						cliente.mantenimiento_ot[i].fecha_vencimiento = $scope.sumaFecha(cliente.mantenimiento_ot[i].dias_credito, fecha);
					}
	
					var i = cliente.mantenimiento_ot.length - 1;
					$scope.totalgeneral = 0;
					$scope.totalgeneral = cliente.mantenimiento_ot[i].totalgeneral;
					$scope.clienteMantenimientos = cliente;
					$scope.abrirPopup($scope.idModalTablaEstadoCuentaMantenimiento);
				})
				
			}

			$scope.cerrarTablaEstadoCuentaManteMiento = function () {
				$scope.cerrarPopup($scope.idModalTablaEstadoCuentaMantenimiento);
			}


			$scope.generarExcelEstadoCuentasClienteMantenimiento = function (cliente, tipoImprecion, liquidado) {
				blockUI.start();
				var promesa = ReporteClienteMantenimientoDetalles(cliente.id, liquidado);
				promesa.then(function (datos) {
					cliente.mantenimiento_ot = datos.detalles;
					var data = $scope.generarExcelClienteMantenimiento(cliente, tipoImprecion);
					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-CLIENTES.xlsx");
					blockUI.stop();
				})
			}

			$scope.generarExcelClienteMantenimiento = function (cliente, tipoImprecion) {
				var data = [["", "", "ESTADO CUENTAS CLIENTE"], ["Deudor :" + cliente.razon_social], ["Fecha", "Nro OT", "monto", "total", "total General"]]
				var totalCosto = 0;

				for (var i = 0; i < cliente.mantenimiento_ot.length; i++) {
					var columns = [];

					totalCosto = totalCosto + cliente.mantenimiento_ot[i].saldo;
					cliente.mantenimiento_ot[i].fecha = new Date(cliente.mantenimiento_ot[i].fecha_hora_aviso);
					columns.push(cliente.mantenimiento_ot[i].fecha.getDate() + "/" + (cliente.mantenimiento_ot[i].fecha.getMonth() + 1) + "/" + cliente.mantenimiento_ot[i].fecha.getFullYear());

					columns.push(cliente.mantenimiento_ot[i].correlativo_ot);

					columns.push(cliente.mantenimiento_ot[i].saldo);
					columns.push(totalCosto);
					columns.push(totalCosto);
					data.push(columns);
					if (tipoImprecion != 0 && cliente.mantenimiento_ot[i].pagosOT.length != 0) {
						for (var j = 0; j < cliente.mantenimiento_ot[i].pagosOT.length; j++) {
							var columns2 = [];
							date = new Date(cliente.mantenimiento_ot[i].pagosOT[j].createdAt);
							columns2.push("");
							columns2.push(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
							columns2.push(cliente.mantenimiento_ot[i].pagosOT[j].numero_documento);
							columns2.push("Pago a/c Factura nro.  " + cliente.mantenimiento_ot[i].factura + "(" + cliente.mantenimiento_ot[i].pagosOT[j].total + " -)");
							columns2.push(cliente.mantenimiento_ot[i].pagosOT[j].total);
							data.push(columns2);
						}
					}

				}
				return data;
			}

			$scope.dibujarCabeceraPDFEstadoCuentasClienteM = function (doc, pagina, totalPaginas, cliente) {
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.razon_social, 35, 10);
				doc.font('Helvetica', 8);

				doc.text($scope.usuario.empresa.direccion, 35, 20);
				var telefono = ($scope.usuario.empresa.telefono1 != null ? $scope.usuario.empresa.telefono1 : "") +
					($scope.usuario.empresa.telefono2 != null ? "-" + $scope.usuario.empresa.telefono2 : "") +
					($scope.usuario.empresa.telefono3 != null ? "-" + $scope.usuario.empresa.telefono3 : "");
				doc.text("TELF. :" + telefono, 35, 30);
				doc.text("COCHABAMBA - BOLIVIA ", 35, 40);
				doc.font('Helvetica', 8);
				doc.font('Helvetica-Bold', 12);
				doc.text("ESTADO DE CUENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Deudor : ", 45, 60);
				doc.font('Helvetica', 8);
				doc.text(cliente.razon_social, 140, 60);
				doc.rect(30, 80, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha", 45, 90);
				doc.text("Nro. OT", 170, 90, { width: 50 });
				doc.text("Saldo", 400, 90, { width: 50 });
				doc.text("Total", 540, 90, { width: 50 });
				doc.font('Helvetica', 8);
			}

			$scope.generarPdfEstadoCuentasClienteMantenimiento = function (cliente, tipoImprecion, liquidado) {
				blockUI.start();
				//console.log($scope.usuario.empresa)
				var promesa = ReporteClienteMantenimientoDetalles(cliente.id,  liquidado);
				promesa.then(function (datos) {
					cliente.mantenimiento_ot = datos.detalles;
					var doc = new PDFDocument({ size: 'letter', margin: 10 });
					var stream = doc.pipe(blobStream());
					var totalCosto = 0;

					var y = 120, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(cliente.mantenimiento_ot.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFEstadoCuentasClienteM(doc, 1, totalPaginas, cliente);
					doc.font('Helvetica', 8);
					for (var i = 0; i < cliente.mantenimiento_ot.length && items <= itemsPorPagina; i++) {
						doc.rect(30, y - 10, 555, 20).stroke();
						cliente.mantenimiento_ot[i].fecha = new Date(cliente.mantenimiento_ot[i].fecha_hora_aviso);
						doc.text(cliente.mantenimiento_ot[i].fecha.getDate() + "/" + (cliente.mantenimiento_ot[i].fecha.getMonth() + 1) + "/" + cliente.mantenimiento_ot[i].fecha.getFullYear(), 45, y);
						doc.text(cliente.mantenimiento_ot[i].correlativo_ot, 170, y);

						doc.text(number_format(cliente.mantenimiento_ot[i].saldo, 2), 370, y, { width: 50, align: "right" });
						doc.text(" "/*cliente.mantenimiento_ot[i].fecha_vencimiento.getDate() + "/" + (cliente.mantenimiento_ot[i].fecha_vencimiento.getMonth() + 1) + "/" + cliente.mantenimiento_ot[i].fecha_vencimiento.getFullYear()*/, 425, y, { width: 50, align: "right" });
						totalCosto = totalCosto + cliente.mantenimiento_ot[i].saldo;
						doc.text(number_format(totalCosto, 2), 510, y, { width: 50, align: "right" });
						if (tipoImprecion != 0 && cliente.mantenimiento_ot[i].pagosOT.length != 0) {
							for (var j = 0; j < cliente.mantenimiento_ot[i].pagosOT.length; j++) {
								y = y + 20;
								doc.rect(30, y - 10, 0, 20).stroke();
								doc.rect(585, y - 10, 0, 20).stroke();
								date = new Date(cliente.mantenimiento_ot[i].pagosOT[j].createdAt);
								doc.text(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), 100, y, { width: 50, align: "right" });
								doc.text(cliente.mantenimiento_ot[i].pagosOT[j].numero_documento, 170, y, { width: 50, align: "right" });
								if (cliente.mantenimiento_ot[i].movimiento.clase.nombre_corto != "FACT") {
									doc.text("Pago a/c Proforma nro.  " + cliente.mantenimiento_ot[i].factura + " (" + cliente.mantenimiento_ot[i].pagosOT[j].total + " -)" + "  (Bs. " + cliente.mantenimiento_ot[i].pagosOT[j].monto_pagado + ")", 240, y);
								} else {
									doc.text("Pago a/c Factura nro.  " + cliente.mantenimiento_ot[i].factura + " (" + cliente.mantenimiento_ot[i].pagosOT[j].total + " -)" + "  (Bs. " + cliente.mantenimiento_ot[i].pagosOT[j].monto_pagado + ")", 240, y);
								}
								doc.text(cliente.mantenimiento_ot[i].pagosOT[j].total, 475, y, { width: 50, align: "right" });

							};
						}
						y = y + 20;
						items++;

						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 120;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoCuentasClienteM(doc, pagina, totalPaginas, cliente);
							doc.font('Helvetica', 8);
						}
					}
					doc.rect(30, y - 10, 555, 20).stroke();
					doc.font('Helvetica-Bold', 8);
					doc.text("Total General", 370, y);
					doc.text(number_format(totalCosto, 2), 510, y, { width: 50, align: "right" });
					var currentDate = new Date();
					doc.font('Helvetica', 6);
					doc.text("EMISIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 180, y + 15);
					doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 240, y + 15);
					doc.text("USUARIO: " + $scope.usuario.persona.nombre_completo, 35, y + 15);
					if (pagina > totalPaginas) {

					} else {
						doc.text(pagina + " de " + totalPaginas, 560, y + 15);
					}


					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
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
					$scope.cerrarTablaEstadoCuentaManteMiento();
					// $scope.obtenerClientesMantenimiento();
					// $scope.vencimientoTotal = $scope.vencimientoTotal - $scope.vencimientosCreditos.length;
					// $scope.verificarVencimientosCreditos($scope.usuario.id_empresa);
					blockUI.stop();
				})
			}
			

			$scope.verDetallePagosMantenimiento = function (otd) {
				var style = $("#" + otd.id).css("display");
				if (style == "none") {
					$("#" + otd.id).css("display", "");
				} else {
					$("#" + otd.id).css("display", "none");
				}
			}

			$scope.clickM = function () {
				setTimeout(function () {
					var element = angular.element(document.getElementsByClassName('verDetallePagoM'));
					element.triggerHandler('click');
				}, 0);
			};

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

			$scope.imprimirReciboMantenimiento = function (pagosVenta, venta) {
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
				doc.text(pagosVenta.numero_documento, { align: 'center' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				//doc.text(venta.actividad.nombre,{align:'center'});
				doc.moveDown(0.6);
				var date = new Date();
				doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
				doc.moveDown(0.4);
				doc.text("He recibido de : " + venta.cliente_ot.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("CONCEPTO", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha_hora_aviso);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = "OT Nro. " + venta.correlativo_ot;
				doc.text(textoFact, 105, 210, { width: 100 });
				doc.text("Saldo Bs " + (pagosVenta.saldo_anterior - pagosVenta.monto_pagado) + ".-", 105, 220, { width: 100 });
				doc.text("Bs " + pagosVenta.monto_pagado + ".-", 170, 210, { width: 100 });

				doc.text("--------------", 10, 230, { align: 'right' });
				//oc.text("--------------------",{align:'right'});
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.              " + pagosVenta.monto_pagado, { align: 'right' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
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
			// fin estado clientes mantenimiento =================================================

			$scope.generarExcelEstadoCuentasClientesSeleccionados = function (clientesSeleccionados) {
				var data = [];
				for (var i = 0; i < clientesSeleccionados.length; i++) {
					data = data.concat($scope.generarExcelCliente(clientesSeleccionados[i], 0));
					data.push([]);
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-CLIENTES.xlsx");
				blockUI.stop();
			}

			$scope.generarExcelCliente = function (cliente, tipoImprecion) {
				var data = [["", "", "ESTADO CUENTAS CLIENTE"], ["Deudor :" + cliente.razon_social], ["Fecha", "N Recibo", "Descripción", "monto", "total", "total General"]]
				var totalCosto = 0;

				for (var i = 0; i < cliente.ventas.length; i++) {
					var columns = [];

					totalCosto = totalCosto + cliente.ventas[i].saldo;
					cliente.ventas[i].fecha = new Date(cliente.ventas[i].fecha);
					columns.push(cliente.ventas[i].fecha.getDate() + "/" + (cliente.ventas[i].fecha.getMonth() + 1) + "/" + cliente.ventas[i].fecha.getFullYear());
					columns.push(cliente.ventas[i].id_movimiento);

					if (cliente.ventas[i].movimiento.clase.nombre_corto != "FACT") {
						columns.push("PROFORMA :" + cliente.ventas[i].factura);
					} else {
						columns.push('Factura : ' + cliente.ventas[i].factura);
					}
					columns.push(cliente.ventas[i].saldo);
					columns.push(totalCosto);
					columns.push(totalCosto);
					data.push(columns);
					if (tipoImprecion != 0 && cliente.ventas[i].pagosVenta.length != 0) {
						for (var j = 0; j < cliente.ventas[i].pagosVenta.length; j++) {
							var columns2 = [];
							date = new Date(cliente.ventas[i].pagosVenta[j].createdAt);
							columns2.push("");
							columns2.push(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
							columns2.push(cliente.ventas[i].pagosVenta[j].numero_documento);
							columns2.push("Pago a/c Factura nro.  " + cliente.ventas[i].factura + "(" + cliente.ventas[i].pagosVenta[j].total + " -)");
							columns2.push(cliente.ventas[i].pagosVenta[j].total);
							data.push(columns2);
						}
					}

				}
				return data;
			}

			/*$scope.obtenerClientes=function(){
				$scope.abs = $window.Math.abs;
				$scope.itemsPorPagina=10;
				$scope.buscarClientes(1,$scope.itemsPorPagina,"",0);
			}*/

			$scope.verificarPulso = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarClientes(1, $scope.itemsPorPagina, textoBusqueda);
				}
			}

			$scope.generarPdfEstadoCuentasCliente = function (cliente, tipoImprecion) {
				blockUI.start();
				//console.log($scope.usuario.empresa)

				var doc = new PDFDocument({ size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;

				var y = 120, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(cliente.ventas.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFEstadoCuentasCliente(doc, 1, totalPaginas, cliente);
				doc.font('Helvetica', 8);
				for (var i = 0; i < cliente.ventas.length && items <= itemsPorPagina; i++) {
					//console.log(cliente.ventas[i].factura);
					doc.rect(30, y - 10, 555, 20).stroke();
					cliente.ventas[i].fecha = new Date(cliente.ventas[i].fecha);
					doc.text(cliente.ventas[i].fecha.getDate() + "/" + (cliente.ventas[i].fecha.getMonth() + 1) + "/" + cliente.ventas[i].fecha.getFullYear(), 45, y);
					doc.text(cliente.ventas[i].id_movimiento, 170, y, { width: 45, align: "right" });

					if (cliente.ventas[i].movimiento.clase.nombre_corto != "FACT") {
						doc.text('PROFORMA nro. ' + cliente.ventas[i].factura + "  (Bs. " + cliente.ventas[i].total + ")", 240, y);
					} else {
						doc.text('Factura nro. ' + cliente.ventas[i].factura + " (Bs. " + cliente.ventas[i].total + ")", 240, y);
					}
					doc.text(number_format(cliente.ventas[i].saldo, 2), 475, y, { width: 50, align: "right" });
					doc.text(" "/*cliente.ventas[i].fecha_vencimiento.getDate() + "/" + (cliente.ventas[i].fecha_vencimiento.getMonth() + 1) + "/" + cliente.ventas[i].fecha_vencimiento.getFullYear()*/, 425, y, { width: 50, align: "right" });
					totalCosto = totalCosto + cliente.ventas[i].saldo;
					doc.text(number_format(totalCosto, 2), 530, y, { width: 50, align: "right" });
					if (tipoImprecion != 0 && cliente.ventas[i].pagosVenta.length != 0) {
						for (var j = 0; j < cliente.ventas[i].pagosVenta.length; j++) {
							y = y + 20;
							doc.rect(30, y - 10, 0, 20).stroke();
							doc.rect(585, y - 10, 0, 20).stroke();
							date = new Date(cliente.ventas[i].pagosVenta[j].createdAt);
							doc.text(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), 100, y, { width: 50, align: "right" });
							doc.text(cliente.ventas[i].pagosVenta[j].numero_documento, 170, y, { width: 50, align: "right" });
							if (cliente.ventas[i].movimiento.clase.nombre_corto != "FACT") {
								doc.text("Pago a/c Proforma nro.  " + cliente.ventas[i].factura + " (" + cliente.ventas[i].pagosVenta[j].total + " -)" + "  (Bs. " + cliente.ventas[i].pagosVenta[j].monto_pagado + ")", 240, y);
							} else {
								doc.text("Pago a/c Factura nro.  " + cliente.ventas[i].factura + " (" + cliente.ventas[i].pagosVenta[j].total + " -)" + "  (Bs. " + cliente.ventas[i].pagosVenta[j].monto_pagado + ")", 240, y);
							}
							doc.text(cliente.ventas[i].pagosVenta[j].total, 475, y, { width: 50, align: "right" });

						};
					}
					y = y + 20;
					items++;

					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 120;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoCuentasCliente(doc, pagina, totalPaginas, cliente);
						doc.font('Helvetica', 8);
					}
				}
				doc.rect(30, y - 10, 555, 20).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Total General", 380, y);
				doc.text(number_format(totalCosto, 2), 475, y, { width: 50, align: "right" });
				var currentDate = new Date();
				doc.font('Helvetica', 6);
				doc.text("EMISIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 180, y + 15);
				doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 240, y + 15);
				doc.text("USUARIO: " + $scope.usuario.persona.nombre_completo, 35, y + 15);
				if (pagina > totalPaginas) {

				} else {
					doc.text(pagina + " de " + totalPaginas, 560, y + 15);
				}


				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();

			}

			$scope.generarExcelEstadoCuentasCliente = function (cliente, tipoImprecion) {
				var data = $scope.generarExcelCliente(cliente, tipoImprecion);
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-CLIENTES.xlsx");
				blockUI.stop();
			}
			$scope.click = function () {
				setTimeout(function () {
					var element = angular.element(document.getElementsByClassName('verDetallePago'));
					element.triggerHandler('click');

				}, 0);
			};
			$scope.dibujarCabeceraPDFEstadoCuentasCliente = function (doc, pagina, totalPaginas, cliente) {
				doc.font('Helvetica-Bold', 8);
				doc.text($scope.usuario.empresa.razon_social, 35, 10);
				doc.font('Helvetica', 8);

				doc.text($scope.usuario.empresa.direccion, 35, 20);
				var telefono = ($scope.usuario.empresa.telefono1 != null ? $scope.usuario.empresa.telefono1 : "") +
					($scope.usuario.empresa.telefono2 != null ? "-" + $scope.usuario.empresa.telefono2 : "") +
					($scope.usuario.empresa.telefono3 != null ? "-" + $scope.usuario.empresa.telefono3 : "");
				doc.text("TELF. :" + telefono, 35, 30);
				doc.text("COCHABAMBA - BOLIVIA ", 35, 40);
				doc.font('Helvetica', 8);
				doc.font('Helvetica-Bold', 12);
				doc.text("ESTADO DE CUENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Deudor : ", 45, 60);
				doc.font('Helvetica', 8);
				doc.text(cliente.razon_social, 140, 60);
				doc.rect(30, 80, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Fecha", 45, 90);
				doc.text("Nro. Recibo", 170, 90, { width: 50 });
				doc.text("Descripción", 240, 90, { width: 60 });
				doc.text("F.Venc", 440, 90, { width: 50 });
				doc.text("Saldo", 500, 90, { width: 50 });
				doc.text("Total", 560, 90, { width: 50 });
				doc.font('Helvetica', 8);
			}
			$scope.abrirEstadoCuentaCliente = function (cliente) {
				//console.log(cliente)
				$scope.totalPagado = 0;

				for (var i = 0; i < cliente.ventas.length; i++) {
					var fecha = new Date(cliente.ventas[i].fecha)
					cliente.ventas[i].totalgeneral = 0;
					cliente.ventas[i].totalPago = 0;
					if (i == 0) {
						cliente.ventas[i].totalgeneral = cliente.ventas[i].totalgeneral + cliente.ventas[i].saldo;
					} else {
						cliente.ventas[i].totalgeneral = cliente.ventas[i - 1].totalgeneral + cliente.ventas[i].saldo;
					}
					for (var f = 0; f < cliente.ventas[i].pagosVenta.length; f++) {
						cliente.ventas[i].pagosVenta[f].total = cliente.ventas[i].pagosVenta[f].saldo_anterior - cliente.ventas[i].pagosVenta[f].monto_pagado;

						cliente.ventas[i].totalPago = cliente.ventas[i].totalPago + cliente.ventas[i].pagosVenta[f].monto_pagado;
					}
					cliente.ventas[i].fecha_vencimiento = $scope.sumaFecha(cliente.ventas[i].dias_credito, fecha);
					//console.log(cliente.ventas[i].tipoPago.nombre)
				}
				//console.log($scope.totalPagado)

				var i = cliente.ventas.length - 1;
				$scope.totalgeneral = 0;
				$scope.totalgeneral = cliente.ventas[i].totalgeneral;
				$scope.clienteVentas = cliente;
				$scope.obtenerAnticiposCliente(cliente)
				$scope.abrirPopup($scope.idModalTablaEstadoCuenta);
			}
			$scope.verDetallePagos = function (venta) {

				var style = $("#" + venta.id_movimiento).css("display");
				if (style == "none") {
					$("#" + venta.id_movimiento).css("display", "");
				} else {
					$("#" + venta.id_movimiento).css("display", "none");
				}
			}
			$scope.cerrarEstadoCuentaCliente = function () {
				$scope.cerrarPopup($scope.idModalTablaEstadoCuenta);
			}

			$scope.imprimirRecibo = function (pagosVenta, venta) {
				blockUI.start();
				var doc = new PDFDocument({ size: [227, 353], margin: 10 });
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
				doc.text(pagosVenta.numero_documento, { align: 'center' });
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
				doc.text("He recibido de : " + $scope.clienteVentas.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("CONCEPTO", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + venta.factura : "Proforma nro. " + venta.factura;
				doc.text(textoFact, 105, 210, { width: 100 });
				doc.text("Saldo Bs " + (pagosVenta.saldo_anterior) + ".-", 105, 220, { width: 100 });
				doc.text("Bs " + pagosVenta.monto_pagado + ".-", 170, 210, { width: 100 });

				doc.text("--------------", 10, 230, { align: 'right' });
				//oc.text("--------------------",{align:'right'});
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.              " + pagosVenta.monto_pagado, { align: 'right' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				//doc.text("SON: "+data.pago,{align:'left'});
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
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalTablaEstadoCuenta);
				$scope.eliminarPopup($scope.idModalTablaEstadoCuentaMantenimiento);
				$scope.eliminarPopup($scope.idModalPagoCreditoMantenmimiento);
			});
			$scope.obtenerAnticiposCliente = function (cliente) {
				var promesa = ObtenerAnticiposCliente(cliente.id)
				$scope.totalAnticipos = 0
				promesa.then(function (dato) {
					$scope.clienteVentas.anticipos = dato
					dato.forEach(function (anticipo) {
						$scope.totalAnticipos += anticipo.saldo
					});
				})
			}
			$scope.abrirPagoDeudaCliente = function (venta) {
				$scope.venta = venta
				$scope.abrirPopup($scope.idModalPagoDeudaCliente);
			}
			$scope.cerrarPagoDeudaCliente = function () {
				$scope.cerrarPopup($scope.idModalPagoDeudaCliente);
			}
			$scope.guardarCompensacionDeuda = function (pago) {
				if (pago <= $scope.totalAnticipos) {
					$scope.realizarPago($scope.venta.id, $scope.usuario.id_empresa, $scope.venta.id_cliente, pago, $scope.usuario.id)
				} else {
					$scope.mostrarMensaje("el valor no puede ser mayor al monto total de anticipos que es  " + $scope.totalAnticipos)
				}
			}
			$scope.realizarPago = function (idVenta, idEmpresa, idCliente, pago, idUsuario) {

				blockUI.start();
				var promesa = PagosVentaCreditosAnticipo(idVenta, idEmpresa, idCliente, { pago: pago, id_usuario_cajero: idUsuario, fecha: new Date() })
				promesa.then(function (data) {
					$scope.mostrarMensaje(data.mensaje);
					/* $scope.cerrarPopup($scope.ModalMensajePago);
					$scope.cerrarPopup($scope.idModalPago);
					$scope.obtenerVentas(); */
					$scope.obtenerClientes()
					$scope.cerrarPagoDeudaCliente()
					$scope.imprimirReciboNuevo(data, data.venta, pago);
					$scope.cerrarEstadoCuentaCliente()
					/* if(restante < 0){
						$scope.imprimirReciboAnticipo(data, data.venta,pago);
					}	 */
					blockUI.stop();
				})
			}

			$scope.imprimirReciboNuevo = function (data, venta, pago) {
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
				doc.text("COMPENSACION", { align: 'center' });
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
				doc.text("He recibido de : " + $scope.clienteVentas.razon_social, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("       CONCEPTO                                   ", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				venta.fecha = new Date(venta.fecha);
				doc.text("Fecha: " + venta.fecha.getDate() + "/" + (venta.fecha.getMonth() + 1) + "/" + venta.fecha.getFullYear(), 15, 210);
				var textoFact = venta.movimiento.clase.nombre_corto == $scope.diccionario.EGRE_FACTURACION ? "Factura nro. " + venta.factura : "Proforma nro. " + venta.factura;
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





			$scope.obtenerProformas = function (liquidados) {
				$scope.paginatorProf = Paginator();
				$scope.paginatorProf.itemsPerPage = '10';
				$scope.paginatorProf.callBack = $scope.obtenerListaProformas;
				$scope.filtro = { id_empresa: $scope.usuario.id_empresa, liquidados: liquidados };
				$scope.paginatorProf.getSearch("", $scope.filtro, null);
			}

			$scope.obtenerListaProformas = function () {
				blockUI.start();
				var promesa = listaProformaReporte($scope.paginatorProf);
				promesa.then(function (dato) {
					$scope.paginatorProf.setPages(dato.paginas);
					$scope.datosProforma = dato.datosProforma;
					blockUI.stop();
				})
			}

			
			$scope.proforma = {liquidados:false}
			$scope.abrirEstadoCuentaClienteProforma = function (cliente, liquidados) {
				$scope.totalPagado = 0;

				var promesa = ReporteClienteProformaDetalles(cliente.id, liquidados , $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					 	let total = 0
						var i = datos.datosProformaXcliente.length - 1;
						for (var i = 0; i < datos.datosProformaXcliente.length; i++) {
							datos.datosProformaXcliente[i].totalgeneral = 0;
							if (i == 0) {
								datos.datosProformaXcliente[i].totalgeneral = datos.datosProformaXcliente[i].totalgeneral + datos.datosProformaXcliente[i].saldo;
							} else {
								datos.datosProformaXcliente[i].totalgeneral = datos.datosProformaXcliente[i - 1].totalgeneral + datos.datosProformaXcliente[i].saldo;
							}
							total += datos.datosProformaXcliente[i].saldo
						}
						$scope.totalgeneralProf = total
						$scope.datosProformaXcliente = datos.datosProformaXcliente;
					$scope.abrirPopup($scope.idModalTablaEstadoCuentaProforma);
				})
			}

			$scope.cerrarTablaEstadoCuentaProforma = function () {
				$scope.cerrarPopup($scope.idModalTablaEstadoCuentaProforma);
			}

			$scope.verProformaTransaccionDetall = function (proforma) {
				var style = $("#" + proforma.id_proforma).css("display");
				if (style == "none") {
					$("#" + proforma.id_proforma).css("display", "");
				} else {
					$("#" + proforma.id_proforma).css("display", "none");
				}
				$scope.verDetalleProformasTransaccion(proforma)
			}

			$scope.clickP = function () {
				setTimeout(function () {
					var element = angular.element(document.getElementsByClassName('verDetalleTransaccion'));
					element.triggerHandler('click');
				}, 0);
			};

			$scope.verDetalleProformasTransaccion = function (proforma) {
				var promesa = reporteClienteProformaTrans($scope.usuario.id_empresa, proforma.id_proforma);
				promesa.then(function (datos) {
					let saldoAnt = 0
					let saldoTotall = 0
					let total = 0
					for (var f = 0; f < datos.datosProformaXTransac.length; f++) {
						datos.datosProformaXTransac[f].saldoAnterior = 0
						datos.datosProformaXTransac[f].saldoTotal = 0
						if( f == 0){
							datos.datosProformaXTransac[f].saldoAnterior = datos.datosProformaXTransac[f].totalImpProf
							saldoAnt += datos.datosProformaXTransac[f].saldoAnterior
							datos.datosProformaXTransac[f].saldoTotal = datos.datosProformaXTransac[f].totalImpProf - datos.datosProformaXTransac[f].importe
							saldoTotall += datos.datosProformaXTransac[f].saldoTotal

						}else{
							datos.datosProformaXTransac[f].saldoAnterior = saldoTotall
							saldoAnt = datos.datosProformaXTransac[f].saldoAnterior
							datos.datosProformaXTransac[f].saldoTotal = saldoTotall - datos.datosProformaXTransac[f].importe
							saldoTotall = datos.datosProformaXTransac[f].saldoTotal
						}
						total += datos.datosProformaXTransac[f].importe
					}
					proforma.totalTransac = total
					proforma.datosProformaXTransac = datos.datosProformaXTransac;
				})
			}

			$scope.impimrResiboProformaTransaccion = function (transaccion) {
				var promesa = ObtenerDatosProformaTransaccion($scope.usuario.id_empresa, transaccion.id_transaccion);
				promesa.then(function (datos) {
					if (datos.hasErr) return alert(datos.mensaje)
					$scope.imprimirResiboTransaccion(datos.datoTransaccion)
				}).catch((err) => {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                })
			}

			$scope.imprimirResiboTransaccion = async (transaccion) => {
                blockUI.stop();
                if (transaccion.length === 0) alert('No hay información de proformas.')
                const doc = new PDFDocument({ size: 'letter', margin: 30, compress: false });
                const stream = doc.pipe(blobStream());
                const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen)
                let paginas = 1;
                imgDelay.then((imagen) => {
                    let y = 40;
                    doc.moveDown(2);
                    doc.font('Helvetica-Bold', 10);
                    doc.text('COMPROBANTE DE INGRESO',100, y, { width: 500, align: 'center' });
                    y += 15;
                    doc.text(transaccion[0].cuenta.nombre+' - '+transaccion[0].cuenta.numero, 100, y, { width: 500, align: 'center' });
                    y += 15;
                    doc.text(transaccion[0].concepto.nombre, 100, y, { width: 500, align: 'center' });
                    y += 15;
                    doc.text('N° ' + transaccion[0].correlativo, 100, y, { width: 500, align: 'center' });
                  
                    doc.font('Helvetica', 6);
                    const info_empresa = $scope.usuario.empresa.direccion + ' ' + $scope.usuario.empresa.departamento.nombre;
                    doc.text(info_empresa, 40, y, { width: 80, align: 'center' });
                    y += 35;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Fecha:', 40, y);
                    doc.font('Helvetica', 8);
                    const inf_Depart = $scope.usuario.empresa.departamento.nombre;
                    doc.text(inf_Depart + ' - ' + $scope.aFechaLarga(transaccion[0].fecha), 80, y);
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Nombre:', 40, y);
                    doc.text('NIT:', 490, y);
                    doc.font('Helvetica', 8);
                    doc.text(transaccion[0].cliente.razon_social || '', 80, y);
                    doc.text(transaccion[0].cliente.nit || '', 500, y,{ width: 80, align: 'right' });
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('Nro. de factura(s):', 40, y);
                    doc.font('Helvetica', 8);

                    const numeros_facturas = transaccion[0].detallesTransaccion.map(prof => prof.proforma.factura).join(',')
                    doc.text(numeros_facturas, 110, y, { width: 470, align: 'left' });
                    y += ((numeros_facturas.length > 100 && numeros_facturas.length < 230) ? 15 : ((numeros_facturas.length > 230 && numeros_facturas.length < 330) ? 25 :((numeros_facturas.length > 330)? 40 : 10)));
                    doc.rect(40, y + 5, 540, 0).stroke();
                    y += 10;
                    doc.font('Helvetica-Bold', 8);
                    doc.text('C. COSTO', 40, y);
                    doc.text('OBSERVACIÓN/DETALLE', 100, y);
                    doc.text('BS', 485, y);
                    doc.text('USD', 560, y);
                    y += 15;
                    doc.rect(40, y - 5, 540, 0).stroke();
                    doc.font('Helvetica', 8);
                    let total_bs = 0;
                    let total_usd = 0;
                    if (imagen) doc.image(imagen, 45, 20, { fit: [70, 70] });
                    
                    var itemsPorPagina = 40;
                    var totalPaginas = Math.ceil(transaccion[0].detallesTransaccion.length / itemsPorPagina);
                    doc.text("Pagina: " + paginas +  " de " + totalPaginas, 0, 740, { align: "center" });
                    if (transaccion[0].detallesTransaccion) {
                        ({ y, total_bs, total_usd } = imprimirDetallesTransaccionRecibo(doc, y, total_bs, total_usd, transaccion[0], imagen, $scope));
                    }
                    doc.rect(40, y - 5, 540, 0).stroke();
                    doc.text('TOTAL', 40, y);
                    doc.text(number_format_negativo_to_positvo(total_bs,2), 450, y, { width: 50, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(total_usd,2), 530, y, { width: 50, align: 'right' });
                    y += 20;
                    doc.font('Helvetica-Bold', 6);
                    doc.text('Usuario:', 40, y);
                    doc.text('Fecha Emisión:', 120, y);
                    doc.text('Fecha impresión:', 225, y);
                    doc.font('Helvetica', 6);
                    doc.text($scope.usuario.nombre_usuario, 66, y);
                    doc.text($scope.formatoFechaPDF(transaccion[0].fecha) + ' ' + $scope.formatoTiempoPDF(transaccion[0].fecha), 166, y);
                    doc.text($scope.formatoFechaPDF(new Date()) + ' ' + $scope.formatoTiempoPDF(new Date()), 276, y);

                    doc.end();
                    stream.on('finish', () => {
                        const fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                }).catch((err) => {
                    alert(err.stack)
                })
            }

			function imprimirDetallesTransaccionRecibo(doc, y, total_bs, total_usd, transaccion, imagen, $scope) {
                var itemsPorPagina = 40;
                var items = 0, pagina = 1;
                var totalPaginas = Math.ceil(transaccion.detallesTransaccion.length / itemsPorPagina);
                            
                for (let index = 0; index < transaccion.detallesTransaccion.length; index++) {
                    const detTransaccion = transaccion.detallesTransaccion[index] 
                    if (!detTransaccion) return alert('No se encontró identificador de proforma');
                    for (let i = 0; i < detTransaccion.proforma.detallesProformas.length; i++) {
						const detProforma = detTransaccion.proforma.detallesProformas[i] 
						// if(i % 2 != 0) doc.rect(40, y , 542, 15).fill('#f4f4f4').fillColor('#000');
                        doc.font('Helvetica', 8);
                        const centro_costo = detProforma.centroCosto?detProforma.centroCosto.nombre:''
                        if (centro_costo?.length > 7) doc.font('Helvetica', 8);
                        doc.text(centro_costo || '', 40, y);
                        doc.font('Helvetica', 8);
                        const detalle = 'Factura Nro. ' + (detTransaccion.proforma.factura? detTransaccion.proforma.factura:'X') + ', Proforma Nro. ' + (detTransaccion.proforma.correlativo?detTransaccion.proforma.correlativo:'X') + ', ' + (detProforma.servicio?detProforma.servicio.nombre:'Desconocido');
                        doc.text(detalle, 100, y, { width: 350 });
                       const bs = ((((detProforma.importe * 100) / (detTransaccion.proforma.totalImporteBs))/100) * (detTransaccion.monto));
                        doc.text(number_format_negativo_to_positvo(bs,2), 450, y, { width: 50, align: 'right' });
                        const usd = (((((detProforma.importe * 100) / (detTransaccion.proforma.totalImporteBs))/100) * (detTransaccion.monto)) / detTransaccion.proforma.cambio_dolar);
                        doc.text(number_format_negativo_to_positvo(usd,2), 530, y, { width: 50, align: 'right' });
                        const legt = ((detalle.length > 85 && detalle.length < 150) ? 25 : ((detalle.length > 120) ? 30 : 15))
                        y += legt;
                        total_bs += bs;
                        total_usd += usd;
                        if ((y > 700)) {
                            y+=10;
                            doc.font('Helvetica-Bold', 6);
                            doc.text('Usuario:', 40, y);
                            doc.text('Fecha Emisión:', 120, y);
                            doc.text('Fecha impresión:', 225, y);
                            doc.font('Helvetica', 6);
                            doc.text($scope.usuario.nombre_usuario, 66, y);
                            /*  y += 10; */
                            doc.text($scope.formatoFechaPDF(transaccion.fecha) + ' ' + $scope.formatoTiempoPDF(transaccion.fecha), 166, y);
                            /* y += 10; */
                            doc.text($scope.formatoFechaPDF(new Date()) + ' ' + $scope.formatoTiempoPDF(new Date()), 276, y);
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 20;
                            doc.font('Helvetica-Bold', 10);
                            doc.text('COMPROBANTE DE INGRESO', 100, y, { width: 500, align: 'center' });
                            y += 12;
                            doc.text(transaccion.cuenta.nombre, 100, y, { width: 500, align: 'center' });
                            y += 12;
                            doc.text(transaccion.concepto.nombre, 100, y, { width: 500,align: 'center' });
                            y += 12;
                            doc.text('N° ' + transaccion.correlativo, 100, y, { width: 500, align: 'center' });
                            y += 20;
                            doc.rect(40, y + 5, 540, 0).stroke();
                            y+=10;
                            doc.font('Helvetica-Bold', 8);
                            doc.text('C. COSTO', 40, y);
                            doc.text('OBSERVACIÓN/DETALLE', 100, y);
                            doc.text('BS', 485, y);
                            doc.text('USD', 560, y);
                            y += 15;
                            doc.rect(40, y - 5, 540, 0).stroke();
                            if (imagen) doc.image(imagen, 40, 20, { fit: [70, 70] });
            
                            items++;
                            pagina = pagina + 1;
                            doc.text("Pagina: " + pagina +  " de " + totalPaginas, 0, 740, { align: "center" });
                        }
                    }
                }
                return { y, total_bs, total_usd };
            }


			$scope.impimirPDFXcliente = function (cliente, liquidados) {
				SweetAlert.swal({
                    title: 'Generando reporte ...',
                    icon: 'info',
                    iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;

				var promesa = ReporteClienteProformaDetallesPDF([cliente], liquidados , $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					if (datos.hasErr) return alert(datos.mensaje)
					try {
						$scope.imprimirPDFClienteProf(datos.datosProformaXcliente)
						blockUI.stop();
					} catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }
				}).catch((err) => {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                })
			}




			$scope.headerPdfClienteProforma = (doc, logo, titulo, hoy, paciente, page, pages, metadata) => {
                try {
					if (logo.length > 0 && logo !== "error") {
						if (logo) {
							doc.image(logo, 47, 33, { fit: [78, 45] }); 
						}
					}
					doc.lineWidth(0.5)
					doc.rect(40, 30, 542, 50).stroke();
					doc.rect(130, 30, 0, 50).stroke();
					doc.rect(482, 30, 0, 50).stroke();
	
					doc.font('Helvetica-Bold', 10);
					doc.text(titulo, 0, 40, { align: "center" });
					doc.font('Helvetica-Bold', 9);
					doc.text(paciente, 0, 53, { align: "center" });
					doc.font('Helvetica-Bold', 8);
					//doc.text("Del "+ desde +" al "+ hasta, 0, 65, { align: "center" });
					doc.text("FECHA DE IMPRESIÓN", 480, 40, { align: "center", width: 110});
					doc.font('Helvetica', 8);
					doc.text($scope.fechaATexto(hoy), 482, 65, { align: "center", width: 110 });
					doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
					doc.font('Helvetica', 6).text(metadata, 0, 755, { align: 'center'})
				} catch (e) {
					console.error('Error al generar pdf...',e);
					return SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
				}
            }
            $scope.imprimirPDFClienteProf = (clientes) => {
				if(clientes.length < 0) return SweetAlert.swal("", "Seleccione Cliente","error");
                convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                    var stream = doc.pipe(blobStream());
                    let titulo = "ESTADO DE CUENTAS"
                    let paciente = ''//data.persona.nombre_completo ? data.persona.nombre_completo.toUpperCase() : ""
                    let hoy = $scope.fechaATexto(new Date());
                    let metadata = "Usuario: "+$scope.usuario.nombre_usuario+"          "+"Fecha: "+ $scope.convertirFechaHora(new Date());
                    var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(clientes.length / itemsPerPage)
                    $scope.headerPdfClienteProforma(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                    for (let i = 0; i < clientes.length; i++) {
						const clientesProf = clientes[i];
						
						doc.rect(x, y, 542, 15).fill('#dbe7ff').fillColor('#000').font('Helvetica-Bold', 8).text("RAZON SOCIAL: "+clientesProf.razon_social+" - NIT: "+clientesProf.nit, x + 5, y + 4)
						y += 15, items++;
                        if(items === itemsPerPage){//xsi
                            x = 40, y=95, items=0, page++
                            doc.addPage({ compress: false, size: 'letter', margin: 10 });
                            $scope.headerPdfClienteProforma(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                        } 
                        
						doc.lineWidth(0.1).rect( 40, y + 13, 542, 0).stroke()
						doc.font('Helvetica-Bold', 8);
						doc.text('FECHA PROFORMA', 40, y + 4, { width: 90});
						doc.text('FECHA FACTURA', 130, y + 4, { width: 90});
						doc.text('Nº PROFORMA', 230, y + 4, { width: 60});
						doc.text('Nº FACTURA', 310, y + 4, { width: 60});
						doc.text('SALDO', 480, y + 4);
						doc.text('TOTAL', 555, y + 4);
						
                        y += 15, items++;
                        if(items === itemsPerPage){//xsi
                            x = 40, y=95, items=0, page++
                            doc.addPage({ compress: false, size: 'letter', margin: 10 });
                            $scope.headerPdfClienteProforma(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                        }

						let totalP = 0
                        for (let k = 0; k < clientesProf.proformas.length; k++) {

							if(k % 2 != 0) doc.rect(40, y , 542, 15).fill('#f7f7f7').fillColor('#000');
                    		const proformasXclient = clientesProf.proformas[k] 
							var sumaSaldos = totalP + proformasXclient.saldo
						
							doc.font('Helvetica', 8);
							var fechProf = proformasXclient.fecha_proforma?$scope.formatoFechaPDF(proformasXclient.fecha_proforma):''
                        	doc.text(fechProf, 40, y+5);
							var fechFact = proformasXclient.fecha_factura?$scope.formatoFechaPDF(proformasXclient.fecha_factura):''
							doc.text(fechFact, 140, y+5,{ width: 50, align: 'center' });
							doc.text(proformasXclient.correlativo?proformasXclient.correlativo:'', 220, y+5,{ width: 50, align: 'right' });
							doc.text(proformasXclient.factura?proformasXclient.factura:'', 300, y+5,{ width: 50, align: 'right' });
							doc.text(number_format_negativo_to_positvo(proformasXclient.saldo,2), 460, y+5, { width: 50, align: 'right' });
							doc.text(number_format_negativo_to_positvo(sumaSaldos,2), 530, y+5, { width: 50, align: 'right' });

							totalP += proformasXclient.saldo;
                            y += 15, items++;
                            if(items === itemsPerPage){
                                x = 40, y=95, items=0, page++
                                doc.addPage({ compress: false, size: 'letter', margin: 10 });
								doc.lineWidth(0.1).rect( 40, y + 13, 542, 0).stroke()
								doc.font('Helvetica-Bold', 8);
								doc.text('FECHA PROFORMA', 40, y + 4, { width: 90});
								doc.text('FECHA FACTURA', 130, y + 4, { width: 90});
								doc.text('Nº PROFORMA', 230, y + 4, { width: 60});
								doc.text('Nº FACTURA', 310, y + 4, { width: 60});
								doc.text('SALDO', 480, y + 4);
								doc.text('TOTAL', 555, y + 4);
								y += 15, items++;
                                $scope.headerPdfClienteProforma(doc, logo, titulo, hoy, paciente, page, pages, metadata); 
                            }
                        }
						doc.rect(40, y-2, 542, 0).stroke();
						doc.font('Helvetica-Bold', 8);
						doc.text('TOTAL', 40, y);
						doc.text(number_format_negativo_to_positvo(totalP,2), 530, y, { width: 50, align: 'right' });
						y += 15, items++;
                        if(items === itemsPerPage){ ///xsi
                            x = 40, y=95, items=0, page++
                            doc.addPage({ compress: false, size: 'letter', margin: 10 });
                            $scope.headerPdfClienteProforma(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                        }			
						
                    }
                    doc.end();
                    stream.on('finish', function () {
                        SweetAlert.swal({
                            title: 'Finalizado!',
                            icon: 'success',
                            timer: 1200,
                            showConfirmButton: false
                        })
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                })
            }
			

			$scope.impimirEXCcliente = function (cliente, liquidados) {
				blockUI.start();
				var promesa = ReporteClienteProformaDetallesPDF([cliente], liquidados , $scope.usuario.id_empresa);
				promesa.then(function (datos) {
					if (datos.hasErr) return alert(datos.mensaje)
					try {
						var data = $scope.generarExcelClienteProforma(datos.datosProformaXcliente);
						blockUI.stop();
					} catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }
					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-CLIENTES-PROFORMAS.xlsx");
					blockUI.stop();
				}).catch((err) => {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                })
			}

			$scope.generarExcelClienteProforma = function (cliente) {
				var data = [["", "", "ESTADO CUENTAS CLIENTE"], [" CLIENTE: " + cliente[0].razon_social+" - "+cliente[0].nit], ["FECHA PROFORMA","FECHA FACTURA","N° PROFORMA","N° FACTURA", "SALDO", "TOTAL"]]
				var totalCosto = 0;
				for (var i = 0; i < cliente[0].proformas.length; i++) {
					const profromaXcliente = cliente[0].proformas[i];
					var columns = [];
					totalCosto += profromaXcliente.saldo;
						var fechProf = profromaXcliente.fecha_proforma?$scope.formatoFechaPDF(profromaXcliente.fecha_proforma):''
						columns.push(fechProf);
						var fechFact = profromaXcliente.fecha_factura?$scope.formatoFechaPDF(profromaXcliente.fecha_factura):''
						columns.push(fechFact);
						columns.push(profromaXcliente.correlativo);
						columns.push(profromaXcliente.factura);
						columns.push(profromaXcliente.saldo);
						columns.push(totalCosto);
					data.push(columns);
				}
				return data;
			}

			$scope.ProformSeleccionados = [];
            $scope.checkProforma = function (index, value, checked) {
                var idx = $scope.ProformSeleccionados.indexOf(value);
                $scope.selectAllProforma = false;
                if (idx >= 0 && !checked) {
                    $scope.ProformSeleccionados.splice(idx, 1);
                }
                if (idx < 0 && !checked) {
                    $scope.ProformSeleccionados.splice(index, 1);
                }
                if (idx < 0 && checked) {
                    $scope.ProformSeleccionados.push(value);
                }
            }
			$scope.checkAllProforma = function (clientes, selectAll) {
                angular.forEach(clientes, function (reg) {
                    reg.checkedProforma = selectAll;
                });
                if (!selectAll) {
                    $scope.ProformSeleccionados = [];
                } else {
                    $scope.proformaSelecAll = angular.copy(clientes);
                    $scope.ProformSeleccionados = $scope.proformaSelecAll.filter(client => client.id)
                }
            };


			$scope.allPDFproforma = function (proformas) {
				SweetAlert.swal({
                    title: 'Generando reporte ...',
                    icon: 'info',
                    iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
				let parametros = {cliente: $scope.ProformSeleccionados, liquidados:proformas.liquidados, facturados:proformas.facturados, empresa:$scope.usuario.id_empresa}
				var promesa = ReporteClienteProformaDetallesPDF(parametros);
				promesa.then(function (datos) {
					if (datos.hasErr) return alert(datos.mensaje)
					try {
						$scope.imprimirPDFClienteProf(datos.datosProformaXcliente)
						blockUI.stop();
					} catch (e) {
						return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
					}
				}).catch((err) => {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                })
			}


			$scope.allEXCproforma = function (proformas) {
				blockUI.start();
				let parametros = {cliente: $scope.ProformSeleccionados, liquidados:proformas.liquidados, facturados:proformas.facturados, empresa:$scope.usuario.id_empresa}
				var promesa = ReporteClienteProformaDetallesPDF(parametros);
				promesa.then(function (datos) {
					if (datos.hasErr) return alert(datos.mensaje)
					try {
						var data = $scope.generExcelClienteProforma(datos.datosProformaXcliente);
					} catch (e) {
						return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
					}
					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-CLIENTES-PROFORMAS.xlsx");
					blockUI.stop();
				}).catch((err) => {
                    alert(err.stack && err.stack || 'Se perdió la conexión')
                })
			}


			$scope.generExcelClienteProforma = function (cliente) {
				var data = [["", "", "ESTADO CUENTAS CLIENTE"],["RAZON SOCIAL","NIT","FECHA PROFORMA","FECHA FACTURA","N° PROFORMA","N° FACTURA", "SALDO"]]
				for (let index = 0; index < cliente.length; index++) {
					const clientes = cliente[index];
					for (var i = 0; i < clientes.proformas.length; i++) {
						const profromaXcliente = clientes.proformas[i];
						var columns = [];
							columns.push(clientes.razon_social);
							columns.push(clientes.nit);
							var fechProf = profromaXcliente.fecha_proforma?$scope.formatoFechaPDF(profromaXcliente.fecha_proforma):''
							columns.push(fechProf);
							var fechFact = profromaXcliente.fecha_factura?$scope.formatoFechaPDF(profromaXcliente.fecha_factura):''
							columns.push(fechFact);
							columns.push(profromaXcliente.correlativo);
							columns.push(profromaXcliente.factura);
							columns.push(profromaXcliente.saldo);
						data.push(columns);
					}
				}
				return data;
			}






















			$scope.inicio();
		}])

	.controller('ControladorLibroVentas', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'ClasesTipo', 'ReporteLibroVentasDatos', 'ObtenerFacturasProformas', 'Paginator', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
			ClasesTipo, ReporteLibroVentasDatos, ObtenerFacturasProformas, Paginator) {

			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.obtenerGestiones();
				$scope.obtenerMovimientosEgreso()
			}

			$scope.obtenerGestiones = function () {
				blockUI.start();
				var promesa = ClasesTipo("GTN");
				promesa.then(function (entidad) {
					$scope.gestiones = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerMovimientosEgreso = function () {
				blockUI.start();
				var promesa = ClasesTipo("MOVEGR");
				promesa.then(function (entidad) {
					$scope.movimientosEgreso = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.generarTXTLibroVentas = function (reporte) {
				blockUI.start();
				$scope.filtroFacturasProformas.anio.id = reporte.gestion
				$scope.filtroFacturasProformas.mes.id = reporte.mes.split("-")[0]
				if (reporte.proformas) return $scope.generarTXTLibroVentasProformas()
				var promesa = ReporteLibroVentasDatos($scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]);
				promesa.then(function (datos) {
					var ventas = datos.ventas;
					var linea = "";
					for (var i = 0; i < ventas.length; i++) {
						ventas[i].fecha = new Date(ventas[i].fecha);
						linea = linea + (ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear()) + "\|";
						linea = linea + ventas[i].factura + "|";
						linea = linea + (ventas[i].autorizacion) + "|";
						linea = linea + (ventas[i].activa ? "V" : "A") + "|";
						linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO') + "|";
						linea = linea + (ventas[i].activa ? (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : 0) + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice : 0 : 0) + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento : 0 : 0) + "|";
						linea = linea + 0 + "|";
						var venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
						var venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
						var venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0
						linea = linea + (ventas[i].activa ? venta_subtotal : 0) + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento : 0 : 0) + "|";
						linea = linea + (ventas[i].activa ? venta_importe_base_debito_fiscal : 0) + "|";
						linea = linea + (ventas[i].activa ? (venta_importe_base_debito_fiscal * 0.13) : 0) + "|";
						linea = linea + (ventas[i].activa ? ventas[i].codigo_control : 0);
						linea = linea + "\n"
					}
					var file = new Blob([linea.replace(/\n/g, "\r\n")], { type: 'text/plain' });
					saveAs(file, "ventas_" + reporte.mes.split("-")[0] + reporte.gestion + "_" + datos.empresa.nit + ".txt");
					blockUI.stop();
				});
			}
			if ($scope.filtroFacturasProformas === undefined) $scope.filtroFacturasProformas = {
				usuario: '', factura: null, actividadEconomica: null, sucursal: null, razon: '',
				anio: { id: new Date().getFullYear() }, mes: { id: new Date().getMonth() + 1, fecha_factura_desde: null, fecha_factura_hasta: null }
			};
			if ($scope.paginatorReporteFacturasProformas === undefined || $scope.paginatorReporteFacturasProformas === null) {
				$scope.paginatorReporteFacturasProformas = new Paginator();
				$scope.paginatorReporteFacturasProformas.currentPage = 1;
				$scope.paginatorReporteFacturasProformas.itemsPerPage = { cantidad: 10 };
				$scope.paginatorReporteFacturasProformas.direction = "desc";
				$scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
				// $scope.paginatorReporteFacturasProformas.callBack = $scope.obtenerFacturasProformas
			}

			$scope.generarExcelLibroVentas = function (reporte) {
				blockUI.start();
				$scope.filtroFacturasProformas.anio.id = reporte.gestion
				$scope.filtroFacturasProformas.mes.id = reporte.mes.split("-")[0]
				if (reporte.proformas) return $scope.generarExcelLibroVentasProforma()
				var promesa = ReporteLibroVentasDatos($scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]);
				promesa.then(function (datos) {
					var ventas = datos.ventas;
					var data = [["N°", "FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "ESTADO", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL", "IMPORTE TOTAL DE LA VENTA", "IMPORTE ICE/IEHD/TASAS", "EXPORTACIONES Y OPERACIONES EXENTAS", "VENTAS GRAVADAS A TASA CERO", "SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS", "IMPORTE BASE PARA DEBITO FISCAL", "DEBITO FISCAL", "CODIGO DE CONTROL"]]
					var sumaImporte = 0, sumaImporteIce = 0, sumaImporteExp = 0, sumaImporteGrab = 0, sumaTotal = 0, sumaDescuentos = 0, sumaImporteBase = 0, sumaCredito = 0;
					for (var i = 0; i < ventas.length; i++) {
						var columns = [];
						ventas[i].fecha = new Date(ventas[i].fecha);
						columns.push(i + 1);
						columns.push(ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear());
						columns.push(ventas[i].factura);
						columns.push((ventas[i].autorizacion) ? ventas[i].autorizacion : "");
						columns.push((ventas[i].activa ? "V" : "A"));
						columns.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0');
						columns.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO');
						columns.push(ventas[i].activa ? (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : 0);
						columns.push(ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice : 0 : 0);
						columns.push(ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento : 0 : 0);
						columns.push(0);
						var venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
						var venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
						var venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0
						columns.push(ventas[i].activa ? venta_subtotal : 0);
						columns.push(ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento : 0 : 0);
						columns.push(ventas[i].activa ? venta_importe_base_debito_fiscal : 0);
						columns.push((ventas[i].activa ? venta_importe_base_debito_fiscal * 0.13 : 0));
						columns.push(ventas[i].activa ? (ventas[i].codigo_control) ? ventas[i].codigo_control : "" : '0');
						sumaImporte = (ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte);
						sumaImporteIce = (ventas[i].activa ? sumaImporteIce + ventas[i].total_ice : sumaImporteIce);;
						sumaImporteExp = (ventas[i].activa ? sumaImporteExp + ventas[i].total_exento : sumaImporteExp);
						sumaImporteGrab = 0;
						sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
						sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
						sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
						sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
						data.push(columns);
						if (i + 1 == ventas.length) {
							columns = [];
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("TOTALES");
							columns.push(Math.round((sumaImporte) * 100) / 100);
							columns.push(Math.round((sumaImporteIce) * 100) / 100);
							columns.push(Math.round((sumaImporteExp) * 100) / 100);
							columns.push(Math.round((sumaImporteGrab) * 100) / 100);
							columns.push(Math.round((sumaTotal) * 100) / 100);
							columns.push(Math.round((sumaDescuentos) * 100) / 100);
							columns.push(Math.round((sumaImporteBase) * 100) / 100);
							columns.push(Math.round((sumaCredito) * 100) / 100);
							data.push(columns);
						}
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBRO-VENTAS.xlsx");
					blockUI.stop();
				});
			}


			$scope.generarPdfLibroVentas = function (reporte) {
				blockUI.start();
				$scope.filtroFacturasProformas.anio.id = reporte.gestion
				$scope.filtroFacturasProformas.mes.id = reporte.mes.split("-")[0]
				if (reporte.proformas) return $scope.generarPdfLibroVentasProforma()
				var promesa = ReporteLibroVentasDatos($scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0], reporte.movimiento);
				promesa.then(function (datos) {
					var ventas = datos.ventas;
					var doc = new PDFDocument({ compress: false, margin: 10, layout: 'landscape' });
					var stream = doc.pipe(blobStream());
					// draw some text
					$scope.dibujarCabeceraPDFLibroVentas(doc, datos, reporte, 1);
					doc.font('Helvetica', 8);
					var y = 170, itemsPorPagina = 12, items = 0, pagina = 1;
					var sumaImporte = 0.0, sumaImporteIce = 0.0, sumaImporteExp = 0.0, sumaImporteGrab = 0.0, sumaTotal = 0.0, sumaDescuentos = 0.0, sumaImporteBase = 0.0, sumaCredito = 0.0;
					var sumaSubImporte = 0.0, sumaSubImporteIce = 0.0, sumaSubImporteExp = 0.0, sumaSubImporteGrab = 0.0, sumaSubTotal = 0.0, sumaSubDescuentos = 0.0, sumaSubImporteBase = 0.0, sumaSubCredito = 0.0;
					for (var i = 0; i < ventas.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 7);
						doc.rect(40, y - 10, 720, 30).stroke();
						ventas[i].fecha = new Date(ventas[i].fecha);
						doc.text(i + 1, 45, y);
						doc.text($scope.formatoFechaPDF(ventas[i].fecha), 65, y);
						doc.text(ventas[i].factura, 110, y);
						doc.text(ventas[i].autorizacion, 143, y);
						doc.text((ventas[i].activa ? "V" : "A"), 215, y);
						doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0', 235, y);
						if (ventas[i].cliente) {
							if (ventas[i].cliente.razon_social && ventas[i].cliente.razon_social.length > 19) {
								doc.font('Helvetica', 6);
							}
						}
						doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO', 283, y - 6, { width: 100 });
						doc.font('Helvetica', 8)
						doc.text(ventas[i].activa ? ((ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : '0.00') + (ventas[i].total_recargo ? ventas[i].total_recargo : 0)).toFixed(2) : '0.00', 385, y);
						doc.text(ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice.toFixed(2) : '0.00' : '0.00', 430, y);
						doc.text(ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento.toFixed(2) : '0.00' : '0.00', 465, y);
						doc.text('0.00', 507, y);
						var venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
						var venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
						var venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0
						doc.text(ventas[i].activa ? venta_subtotal.toFixed(2) : '0.00', 540, y);
						doc.text(ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento.toFixed(2) : '0.00' : '0.00', 580, y);
						doc.text(venta_importe_base_debito_fiscal.toFixed(2), 615, y);
						doc.text(ventas[i].activa ? (venta_importe_base_debito_fiscal * 0.13).toFixed(2) : '0.00', 650, y);
						doc.text(ventas[i].activa ? ventas[i].codigo_control : 0, 685, y);
						y = y + 30;
						sumaSubImporte = (ventas[i].activa ? sumaSubImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubImporte);
						sumaSubImporteIce = (ventas[i].activa ? sumaSubImporteIce + ventas[i].total_ice : sumaSubImporteIce);
						sumaSubImporteExp = (ventas[i].activa ? sumaSubImporteExp + ventas[i].total_exento : sumaSubImporteExp);
						sumaSubImporteGrab = 0///(ventas[i].activa ? sumaSubImporteGrab + ventas[i].total_recargo : sumaSubImporteGrab);
						sumaSubTotal = ventas[i].activa ? sumaSubTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubTotal;
						sumaSubDescuentos = ventas[i].activa ? sumaSubDescuentos + ventas[i].total_descuento : sumaSubDescuentos;
						sumaSubImporteBase = ventas[i].activa ? sumaSubImporteBase + venta_importe_base_debito_fiscal : sumaSubImporteBase;
						sumaSubCredito = ventas[i].activa ? sumaSubCredito + venta_importe_base_debito_fiscal * 0.13 : sumaSubCredito;
						sumaImporte = ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte;

						sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
						sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
						sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
						sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
						items++;

						if (items == itemsPorPagina || i + 1 == ventas.length) {
							sumaImporteIce += sumaSubImporteIce;
							sumaImporteExp += sumaSubImporteExp;
							sumaImporteGrab += sumaSubImporteGrab;
							doc.font('Helvetica-Bold', 7);
							doc.text("SUBTOTALES", 283, y);
							doc.text(sumaSubImporte.toFixed(2), 385, y);
							doc.text(sumaSubImporteIce.toFixed(2), 430, y);
							doc.text(sumaSubImporteExp.toFixed(2), 465, y);
							doc.text(sumaSubImporteGrab.toFixed(2), 507, y);
							doc.text(sumaSubTotal.toFixed(2), 540, y);
							doc.text(sumaSubDescuentos.toFixed(2), 580, y);
							doc.text(sumaSubImporteBase.toFixed(2), 615, y);
							doc.text(sumaSubCredito.toFixed(2), 650, y);
							doc.rect(40, y - 10, 720, 30).stroke();
							doc.font('Helvetica', 8);
							sumaSubImporte = 0; sumaSubImporteNo = 0; sumaSubTotal = 0; sumaSubDescuentos = 0; sumaSubImporteBase = 0; sumaSubCredito = 0;

							if (i + 1 == ventas.length) {
								doc.font('Helvetica-Bold', 7);
								doc.text("TOTALES", 283, y + 30);
								doc.text(sumaImporte.toFixed(2), 385, y + 30);
								doc.text(sumaImporteIce.toFixed(2), 430, y + 30);
								doc.text(sumaImporteExp.toFixed(2), 465, y + 30);
								doc.text(sumaImporteGrab.toFixed(2), 507, y + 30);
								doc.text(sumaTotal.toFixed(2), 540, y + 30);
								doc.text(sumaDescuentos.toFixed(2), 580, y + 30);
								doc.text(sumaImporteBase.toFixed(2), 615, y + 30);
								doc.text(sumaCredito.toFixed(2), 650, y + 30);
								doc.rect(40, y - 10 + 30, 720, 30).stroke();
								doc.font('Helvetica', 8);
							} else {
								doc.addPage({ margin: 0, bufferPages: true, layout: 'landscape' });
								y = 170;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFLibroVentas(doc, datos, reporte, pagina);
								doc.font('Helvetica', 8);
							}
						}
					}
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
				});
			}

			$scope.dibujarCabeceraPDFLibroVentas = function (doc, datos, reporte, pagina) {
				doc.font('Helvetica-Bold', 12);
				doc.text("LIBRO DE VENTAS IVA ESTÁNDAR", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("FOLIO " + pagina, 720, 25);
				doc.rect(40, 60, 720, 40).stroke();
				doc.text("PERIÓDO FISCAL : ", 65, 70);
				doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 85);
				doc.text("NIT : ", 440, 85);
				doc.font('Helvetica', 8);
				doc.text("AÑO " + reporte.gestion, 140, 70);
				doc.text("MES " + reporte.mes.split("-")[1], 200, 70);
				doc.text(datos.empresa.razon_social, 195, 85);
				doc.text(datos.empresa.nit, 460, 85);

				doc.rect(40, 100, 720, 60).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Nº", 45, 110);
				doc.text("Fecha de la Factura", 65, 110, { width: 40 });
				doc.text("Nº de la Factura", 110, 110, { width: 50 });
				doc.text("Nº de Autorización", 145, 110, { width: 50 });
				doc.text("Estado", 205, 110, { width: 35 });
				doc.text("NIT / CI Cliente", 235, 110, { width: 50 });
				doc.text("Nombre o Razón Social", 280, 110);
				doc.text("Importe Total de la Venta", 385, 110, { width: 35 });
				doc.text("Importe ICE IE HD/T", 425, 110, { width: 35 });
				doc.text("Exp. y Op. exentas", 460, 110, { width: 42 });
				doc.text("Ventas grabadas a Tasa Cero", 502, 110, { width: 42 });
				doc.text("Subtotal", 540, 110, { width: 40 });
				doc.text("Desc., Bonif. y Rebajas", 575, 110, { width: 42 });
				doc.text("Importe Base para Débito Fiscal", 615, 110, { width: 35 });
				doc.text("Débito Fiscal I.V.A.", 650, 110, { width: 35 });
				doc.text("Código de Control", 685, 110);
			}

			$scope.generarPdfLibroVentasProforma = () => {
				blockUI.stop();
				$scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
				const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
				$scope.paginatorReporteFacturasProformas.direction = 'asc'
				const prom = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
				prom.then((datos) => {
					blockUI.stop();
					$scope.paginatorReporteFacturasProformas.direction = directionTemp;
					const ventas = datos.facturas;
					const doc = new PDFDocument({ compress: false, margin: 10, layout: 'landscape' });
					const stream = doc.pipe(blobStream());
					// draw some text
					$scope.dibujarCabeceraPDFLibroFacturasProformas(doc, datos, $scope.filtroFacturasProformas, 1);
					doc.font('Helvetica', 8);
					let y = 170, itemsPorPagina = 12, items = 0, pagina = 1;
					let sumaImporte = 0.0, sumaImporteIce = 0.0, sumaImporteExp = 0.0, sumaImporteGrab = 0.0, sumaTotal = 0.0, sumaDescuentos = 0.0, sumaImporteBase = 0.0, sumaCredito = 0.0;
					let sumaSubImporte = 0.0, sumaSubImporteIce = 0.0, sumaSubImporteExp = 0.0, sumaSubImporteGrab = 0.0, sumaSubTotal = 0.0, sumaSubDescuentos = 0.0, sumaSubImporteBase = 0.0, sumaSubCredito = 0.0;
					for (let i = 0; i < ventas.length && items <= itemsPorPagina; i++) {
						ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
						ventas[i].total_ice = 0;
						ventas[i].importe = ventas[i].totalImporteBs;
						ventas[i].total_descuento = 0;
						ventas[i].total_exento = 0;
						doc.font('Helvetica', 6);
						doc.rect(40, y - 10, 720, 30).stroke();
						// ventas[i].fecha = new Date(ventas[i].fecha);
						doc.text(i + 1, 43, y);
						doc.text($scope.formatoFechaPDF(ventas[i].fecha_factura), 62, y);
						doc.text(ventas[i].factura, 102, y);
						doc.text(ventas[i].autorizacion, 130, y);
						doc.text((ventas[i].activa ? "V" : "A"), 190, y);
						doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0', 210, y);
						if (ventas[i].cliente) {
							if (ventas[i].cliente.razon_social && ventas[i].cliente.razon_social.length > 19) {
								doc.font('Helvetica', 6);
							}
						}
						doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADOANULADOANULADOANULADOANULADO ANULADO', 260, y - 6, { width: 100 });
						doc.font('Helvetica', 6)
						doc.text(ventas[i].activa ? $scope.number_format(((ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0.00) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0)), 2) : '0.00', 360, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? ventas[i].total_ice ? $scope.number_format(ventas[i].total_ice, 2) : '0.00' : '0.00', 402, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? ventas[i].total_exento ? $scope.number_format(ventas[i].total_exento, 2) : '0.00' : '0.00', 444, y, { width: 40, align: 'right' });
						doc.text('0.00', 486, y, { width: 40, align: 'right' });
						const venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
						const venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
						const venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0
						doc.text(ventas[i].activa ? $scope.number_format(venta_subtotal, 2) : '0.00', 528, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? ventas[i].total_descuento ? $scope.number_format(ventas[i].total_descuento, 2) : '0.00' : '0.00', 570, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? $scope.number_format(venta_importe_base_debito_fiscal, 2) : '0.00', 612, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? $scope.number_format((venta_importe_base_debito_fiscal * 0.13), 2) : '0.00', 654, y, { width: 40, align: 'right' });
						doc.text(ventas[i].activa ? ventas[i].codigo_control : 0, 702, y);
						y = y + 30;
						sumaSubImporte = (ventas[i].activa ? sumaSubImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubImporte);
						sumaSubImporteIce = (ventas[i].activa ? sumaSubImporteIce + ventas[i].total_ice : sumaSubImporteIce);
						sumaSubImporteExp = (ventas[i].activa ? sumaSubImporteExp + ventas[i].total_exento : sumaSubImporteExp);
						sumaSubImporteGrab = 0///(ventas[i].activa ? sumaSubImporteGrab + ventas[i].total_recargo : sumaSubImporteGrab);
						sumaSubTotal = ventas[i].activa ? sumaSubTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubTotal;
						sumaSubDescuentos = ventas[i].activa ? sumaSubDescuentos + ventas[i].total_descuento : sumaSubDescuentos;
						sumaSubImporteBase = ventas[i].activa ? sumaSubImporteBase + venta_importe_base_debito_fiscal : sumaSubImporteBase;
						sumaSubCredito = ventas[i].activa ? sumaSubCredito + venta_importe_base_debito_fiscal * 0.13 : sumaSubCredito;
						sumaImporte = ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte;

						sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
						sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
						sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
						sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
						items++;

						if (items == itemsPorPagina || i + 1 == ventas.length) {
							sumaImporteIce += sumaSubImporteIce;
							sumaImporteExp += sumaSubImporteExp;
							sumaImporteGrab += sumaSubImporteGrab;
							doc.font('Helvetica-Bold', 7);
							doc.text("SUBTOTALES", 283, y);
							doc.font('Helvetica-Bold', 6);
							doc.text($scope.number_format(sumaSubImporte, 2), 360, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubImporteIce, 2), 402, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubImporteExp, 2), 444, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubImporteGrab, 2), 486, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubTotal, 2), 528, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubDescuentos, 2), 570, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubImporteBase, 2), 612, y, { width: 40, align: 'right' });
							doc.text($scope.number_format(sumaSubCredito, 2), 654, y, { width: 40, align: 'right' });
							doc.rect(40, y - 10, 720, 30).stroke();
							doc.font('Helvetica', 8);
							sumaSubImporte = 0; sumaSubImporteNo = 0; sumaSubTotal = 0; sumaSubDescuentos = 0; sumaSubImporteBase = 0; sumaSubCredito = 0;

							if (i + 1 == ventas.length) {
								doc.font('Helvetica-Bold', 7);
								doc.text("TOTALES", 283, y + 30);
								doc.font('Helvetica-Bold', 6);
								doc.text($scope.number_format(sumaImporte, 2), 360, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaImporteIce, 2), 402, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaImporteExp, 2), 444, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaImporteGrab, 2), 486, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaTotal, 2), 528, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaDescuentos, 2), 570, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaImporteBase, 2), 612, y + 30, { width: 40, align: 'right' });
								doc.text($scope.number_format(sumaCredito, 2), 654, y + 30, { width: 40, align: 'right' });
								doc.rect(40, y - 10 + 30, 720, 30).stroke();
								doc.font('Helvetica', 8);
							} else {
								doc.addPage({ margin: 0, bufferPages: true, layout: 'landscape' });
								y = 170;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFLibroFacturasProformas(doc, datos, $scope.filtroFacturasProformas, pagina);
								doc.font('Helvetica', 8);
							}
						}
					}
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
					blockUI.stop();
				}).catch((err) => {
					blockUI.stop()
					const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					$scope.mostrarMensaje(msg)
				})
			}
			$scope.generarExcelLibroVentasProforma = () => {
				blockUI.stop();
				$scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
				const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
				$scope.paginatorReporteFacturasProformas.direction = 'asc'
				const prom = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
				prom.then((datos) => {
					blockUI.stop();
					const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
					$scope.paginatorReporteFacturasProformas.direction = directionTemp;
					const ventas = datos.facturas;
					const data = [["N°", "FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "ESTADO", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL", "IMPORTE TOTAL DE LA VENTA", "IMPORTE ICE/IEHD/TASAS", "EXPORTACIONES Y OPERACIONES EXENTAS", "VENTAS GRAVADAS A TASA CERO", "SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS", "IMPORTE BASE PARA DEBITO FISCAL", "DEBITO FISCAL", "CODIGO DE CONTROL"]]
					let sumaImporte = 0, sumaImporteIce = 0, sumaImporteExp = 0, sumaImporteGrab = 0, sumaTotal = 0, sumaDescuentos = 0, sumaImporteBase = 0, sumaCredito = 0;
					for (let i = 0; i < ventas.length; i++) {
						ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
						ventas[i].total_ice = 0;
						ventas[i].importe = ventas[i].totalImporteBs;
						ventas[i].total_descuento = 0;
						ventas[i].total_exento = 0;
						const cabecera = [];
						// ventas[i].fecha = new Date(ventas[i].fecha);
						cabecera.push(i + 1);
						cabecera.push($scope.formatoFechaPDF(ventas[i].fecha_factura));
						cabecera.push(ventas[i].factura);
						cabecera.push((ventas[i].autorizacion) ? ventas[i].autorizacion : "");
						cabecera.push((ventas[i].activa ? "V" : "A"));
						cabecera.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? '' + ventas[i].cliente.nit : '0' : '0' : '0');
						cabecera.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO');
						cabecera.push(ventas[i].activa ? (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : 0);
						cabecera.push(ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice : 0 : 0);
						cabecera.push(ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento : 0 : 0);
						cabecera.push(0);
						const venta_subtotal = ventas[i].totalImporteBs;
						const venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal : 0
						cabecera.push(ventas[i].activa ? venta_subtotal : 0);
						cabecera.push(ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento : 0 : 0);
						cabecera.push(ventas[i].activa ? venta_importe_base_debito_fiscal : 0);
						cabecera.push((ventas[i].activa ? venta_importe_base_debito_fiscal * 0.13 : 0));
						cabecera.push(ventas[i].activa ? (ventas[i].codigo_control) ? ventas[i].codigo_control : "" : '0');
						sumaImporte = (ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte);
						sumaImporteIce = (ventas[i].activa ? sumaImporteIce + ventas[i].total_ice : sumaImporteIce);;
						sumaImporteExp = (ventas[i].activa ? sumaImporteExp + ventas[i].total_exento : sumaImporteExp);
						sumaImporteGrab = 0;
						sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
						sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
						sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
						sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
						data.push(cabecera);
						if (i + 1 == ventas.length) {
							const columns = [];
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("");
							columns.push("TOTALES");
							columns.push(Math.round((sumaImporte) * 100) / 100);
							columns.push(Math.round((sumaImporteIce) * 100) / 100);
							columns.push(Math.round((sumaImporteExp) * 100) / 100);
							columns.push(Math.round((sumaImporteGrab) * 100) / 100);
							columns.push(Math.round((sumaTotal) * 100) / 100);
							columns.push(Math.round((sumaDescuentos) * 100) / 100);
							columns.push(Math.round((sumaImporteBase) * 100) / 100);
							columns.push(Math.round((sumaCredito) * 100) / 100);
							data.push(columns);
						}
					}

					const ws_name = "SheetJS";
					const wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBRO-VENTAS.xlsx");
					blockUI.stop();
				}).catch((err) => {
					blockUI.stop()
					const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					$scope.mostrarMensaje(msg)
				})
			}
			$scope.generarTXTLibroVentasProformas = () => {
				blockUI.stop();
				$scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
				const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
				$scope.paginatorReporteFacturasProformas.direction = 'asc'
				const promesa = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
				promesa.then((datos) => {
					blockUI.stop();
					$scope.paginatorReporteFacturasProformas.direction = directionTemp;
					const ventas = datos.facturas;
					let linea = "";
					for (let i = 0; i < ventas.length; i++) {
						ventas[i].fecha = new Date(ventas[i].fecha_factura);
						ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
						ventas[i].total_ice = 0;
						ventas[i].importe = ventas[i].totalImporteBs;
						ventas[i].total_descuento = 0;
						ventas[i].total_exento = 0;
						linea = linea + (ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear()) + "\|";
						linea = linea + ventas[i].factura + "|";
						linea = linea + (ventas[i].autorizacion) + "|";
						linea = linea + (ventas[i].activa ? "V" : "A") + "|";
						linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO') + "|";
						linea = linea + (ventas[i].activa ? (ventas[i].importe ? ventas[i].importe.toFixed(2) : '0.00') : '0.00') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice.toFixed(2) : '0.00' : '0.00') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento.toFixed(2) : '0.00' : '0.00') + "|";
						linea = linea + 0 + "|";
						const venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
						const venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
						const venta_importe_base_debito_fiscal = (ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0)
						linea = linea + (ventas[i].activa ? venta_subtotal.toFixed(2) : '0.00') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento.toFixed(2) : '0.00' : '0.00') + "|";
						linea = linea + (ventas[i].activa ? venta_importe_base_debito_fiscal.toFixed(2) : '0.00') + "|";
						linea = linea + (ventas[i].activa ? (venta_importe_base_debito_fiscal * 0.13).toFixed(2) : '0.00') + "|";
						linea = linea + (ventas[i].activa ? ventas[i].codigo_control : 0);
						if (i < (ventas.length - 1)) {
							linea = linea + "\n"
						}
					}
					const file = new Blob([linea.replace(/\n/g, "\r\n")], { type: 'text/plain' });
					saveAs(file, "ventas_" + ('0' + $scope.filtroFacturasProformas.mes.id).slice(-2) + $scope.filtroFacturasProformas.anio.id + "_" + $scope.usuario.empresa.nit + ".txt");
					blockUI.stop();
				}).catch((err) => {
					blockUI.stop()
					const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
					$scope.mostrarMensaje(msg)
				});
			}
			$scope.dibujarCabeceraPDFLibroFacturasProformas = (doc, datos, reporte, pagina) => {
				doc.font('Helvetica-Bold', 12);
				doc.text("LIBRO DE VENTAS IVA ESTÁNDAR", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("FOLIO " + pagina, 720, 25);
				doc.rect(40, 60, 720, 40).stroke();
				doc.text("PERIÓDO FISCAL : ", 65, 70);
				doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 85);
				doc.text("NIT : ", 440, 85);
				doc.font('Helvetica', 8);
				doc.text("AÑO " + reporte.anio.id, 140, 70);
				doc.text("MES " + $scope.meses[reporte.mes.id - 1].nombre, 200, 70);
				doc.text($scope.usuario.empresa.razon_social, 195, 85);
				doc.text($scope.usuario.empresa.nit, 460, 85);

				doc.rect(40, 100, 720, 60).stroke();
				doc.font('Helvetica-Bold', 6);
				doc.text("Nº", 45, 120);
				doc.text("Fecha de la Factura", 62, 120, { width: 40 });
				doc.text("Nº de la Factura", 100, 120, { width: 40 });
				doc.text("Nº Autorización", 130, 120, { width: 50 });
				doc.text("Estado", 184, 120, { width: 35 });
				doc.text("NIT / CI Cliente", 210, 120, { width: 50 });
				doc.text("Nombre o Razón Social", 260, 120);
				doc.text("Importe Total de la Venta", 370, 120, { width: 35 });
				doc.text("Importe ICE IE HD/T", 410, 120, { width: 35 });
				doc.text("Exp. y Op. exentas", 455, 120, { width: 42 });
				doc.text("Ventas grabadas a Tasa Cero", 497, 120, { width: 42 });
				doc.text("Subtotal", 544, 120, { width: 40 });
				doc.text("Desc., Bonif. y Rebajas", 575, 120, { width: 42 });
				doc.text("Importe Base para Débito Fiscal", 625, 120, { width: 35 });
				doc.text("Débito Fiscal I.V.A.", 660, 120, { width: 35 });
				doc.text("Código de Control", 700, 120);
			}
			$scope.inicio();
		}])

	.controller('ControladorLibroCompras', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'ClasesTipo', 'ReporteLibroComprasDatos', 'FieldViewer', 'Paginator', 'SweetAlert', 'ActualizarLibroCompra', 'ProveedoresNit', 'ObtenerDatosImpresionReportes', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
			ClasesTipo, ReporteLibroComprasDatos, FieldViewer, Paginator, SweetAlert, ActualizarLibroCompra, ProveedoresNit, ObtenerDatosImpresionReportes) {


			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.obtenerGestiones();
				$scope.obtenerMovimientosEgreso()
			}

			$scope.idModalcompra = "modal-compra";

			$scope.$on('$viewContentLoaded', function () {
				ejecutarScriptLibroCompras($scope.idModalcompra);
				resaltarPestaña($location.path().substring(1));
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				$scope.obtenerColumnasAplicacion();
				blockUI.stop();
			});

			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalcompra);
			});
			
			$scope.obtenerGestiones = function () {
				blockUI.start();
				var promesa = ClasesTipo("GTN");
				promesa.then(function (entidad) {
					$scope.gestiones = entidad.clases;
					blockUI.stop();
				});
			}
			$scope.obtenerMovimientosEgreso = function () {
				blockUI.start();
				var promesa = ClasesTipo("MOVING");
				promesa.then(function (entidad) {
					$scope.movimientosIngreso = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.obtenerColumnasAplicacion = function () {
				$scope.fieldViewer = FieldViewer({
					crear: false,
					id_empresa: $scope.usuario.id_empresa,
					configuracion: {
						fecha: { value: "Fecha", show: true },
						nit: { value: "NIT", show: true },
						razon_social: { value: "Razón Social", show: true },
						factura: { value: "Factura", show: true },
						dui: { value: "DUI", show: true },
						autorizacion: { value: "Autorización", show: true },
						importe: { value: "Importe", show: true },
						no_cf: { value: "No sujeto CF", show: true },
						subtotal: { value: "Subtotal", show: true },
						desc: { value: "Desc.", show: true },
						base_cf: { value: "Base_CF", show: true },
						cf: { value: "CF", show: true },
						cod_control: { value: "Cod. Control", show: true },
						comp: { value: "Comp.", show: true },
						nro_comp: { value: "N° Comp.", show: true },
						cajachica: { value: "Caja Chica", show: true},
					}
				}, $scope.aplicacion.aplicacion.id);
				$scope.fieldViewer.updateObject();
			}
			$scope.obtenerLC = function (filtro) {
				$scope.filtro = filtro;
				$scope.paginatorLc = Paginator();
				$scope.paginatorLc.itemsPerPage = 10;
				$scope.paginatorLc.callBack = $scope.obtenerDatosTabla; 
				$scope.paginatorLc.getSearch("", $scope.filtro, null);
			}

			$scope.compras = [];
			$scope.obtenerDatosTabla = function (reporte) {
				blockUI.start();
				var promesa = ReporteLibroComprasDatos($scope.usuario.id_empresa, $scope.paginatorLc, false);
				promesa.then(function (datos) {
					$scope.paginatorLc.setPages(datos.paginas);
					$scope.compras = datos.registros;
					$scope.importesTotales=datos;
					blockUI.stop();		
					
				});
			}
			$scope.generarTXTLibroCompras = function (reporte) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar varios minutos...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				let datos = {
					id_empresa: $scope.usuario.empresa.id,
					gestion: reporte.gestion,
					mes:reporte.mes,
					conceptos: [21,17707]
				}
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerDatosImpresionReportes(datos);
				promesa.then(registros=>{
					var facturas = registros.registros; 
					if(facturas.length > 0){
						var datos = "";
						facturas.forEach((factura, i)=> {
							//datos = datos + "1|";
							let f = new Date(factura.fecha);
							var dia = (f.getDate() < 10) ? "0" + f.getDate() : f.getDate();
							var mes = ((f.getMonth() + 1) < 10) ? "0" + (f.getMonth() + 1) : (f.getMonth() + 1);
							datos +=  "1|";
							datos +=  i+1 + "|";
							datos += dia +"/"+mes+"/"+f.getFullYear() +"\|";
							datos += factura.nit +"\|";
							datos += factura.razon_social +"\|";
							datos += factura.factura +"\|";
							datos += factura.dui ? (factura.dui +"\|") : ((0 +"\|"));
							datos += factura.autorizacion +"\|";
							datos += number_format_negativo_to_positvo(factura.importe,2) +"\|";
							datos += number_format_negativo_to_positvo(factura.no_sujeto,2) +"\|";
							datos += number_format_negativo_to_positvo(factura.subtotal,2) +"\|";
							datos += number_format_negativo_to_positvo(factura.descuento,2)  ? (factura.descuento +"\|") : (0 +"\|");
							datos += number_format_negativo_to_positvo(factura.base_cf,2) +"\|";
							datos += number_format_negativo_to_positvo(factura.base_cf * 0.13,2)+"\|";
							datos += factura.codigo_control +"\|";
							datos +=  1 + "\n";
						});
						var file = new Blob([datos.replace(/\n/g, "\r\n")], { type: 'text/plain' });
						var filesaver = saveAs(file, "compras_" + reporte.mes.split("-")[0] + reporte.gestion + "_" + $scope.usuario.empresa.nit + ".txt");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No existen facturas de compras!", "warning");
					}
				});
			}
			$scope.generarExcelLibroCompras = function (reporte) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar varios minutos...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
			
				var data = [[
					"N°",
					"FECHA FACTURA O DUI",
					"NIT DEL PROVEEDOR", 
					"NOMBRE o RAZÓN SOCIAL", 
					"N° DE LA FACTURA", 
					"N° DE DUI", 
					"N° DE AUTORIZACION", 
					"IMPORTE TOTAL DE LA COMPRA", 
					"IMPORTE NO SUJETO A CRÉDITO FISCAL", 
					"SUBTOTAL", 
					"DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS", 
					"IMPORTE BASE PARA CREDITO FISCAL", 
					"CREDITO FISCAL", "CODIGO DE CONTROL", 
					"TIPO DE COMPRA", "NRO. COMPROBANTE", 
					"T. COMPROBANTE", 
					"CAJA CHICA"]]
				let datos = {
					id_empresa: $scope.usuario.empresa.id,
					gestion: reporte.gestion,
					mes:reporte.mes,
					conceptos: [21,17707]
				}
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerDatosImpresionReportes(datos);
				promesa.then(registros=>{
					var facturas = registros.registros;
					var totales = registros.totales;
					if(facturas.length > 0){
						facturas.forEach((factura, i)=> {
							var columns = [];
							columns.push(i+1);
							columns.push(factura.fecha ? $scope.fechaATexto(factura.fecha) : '' );
							columns.push(factura.nit ? factura.nit : '');
							columns.push(factura.razon_social ? factura.razon_social : '');
							columns.push(factura.factura ? factura.factura : '');
							columns.push(factura.dui ? factura.dui : 0);
							columns.push(factura.autorizacion ? factura.autorizacion : '');
							columns.push(factura.importe ? factura.importe : '');
							columns.push(factura.no_sujeto ? factura.no_sujeto : 0);
							columns.push(factura.subtotal ? factura.subtotal : '');
							columns.push(factura.descuento ? factura.descuento : 0);
							columns.push(factura.base_cf ? factura.base_cf : '');
							columns.push(factura.base_cf ? factura.base_cf * .13 : '');
							columns.push(factura.codigo_control ? factura.codigo_control.toUpperCase() : '');
							columns.push(1);
							columns.push(factura.numero_comprobante ? factura.numero_comprobante : '');
							columns.push(factura.tipo_comprobante ? factura.tipo_comprobante : '');
							columns.push(factura.numero_caja ? factura.numero_caja : '');
							data.push(columns);
						});
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBRO-COMPRAS.xlsx");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No existen datos de facturas relacionadas al libro de compras!", "warning");
					}
				});
			}
			$scope.generarPdfLibroCompras = function (reporte) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar varios minutos...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				let data = {
					id_empresa: $scope.usuario.empresa.id,
					gestion: reporte.gestion,
					mes:reporte.mes,
					conceptos: [21,17707]
				}
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerDatosImpresionReportes(data);
				promesa.then(registros=>{
					var facturas = registros.registros;
					var totales = registros.totales;
					if (facturas.length == 0) {
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No existen datos de facturas relacionadas al libro de compras!", "warning");
					}else{
						var doc = new PDFDocument({ size: 'letter', margin: 10, layout: 'landscape', compress: false });
						var stream = doc.pipe(blobStream());
						var  y=112, items=0, itemsPorPagina=30, pagina=1, stImporte = 0, stNoSujeto = 0, stSubtotal = 0, stDescuentos=0, stBaseCf=0,stCf=0;
						$scope.dibujarCabeceraPDFLibroCompras(doc, reporte, pagina); 
						facturas.forEach((factura, i) => {
							doc.text(i+1, 16, y, {width: 20});
							doc.text($scope.fechaATexto(factura.fecha), 35, y, { width: 40, align:'center' });
							doc.text(factura.nit ? factura.nit : '', 75, y, { width: 43, align: 'right' });
							doc.text(factura.razon_social ? factura.razon_social : '', 122, y, {width: 153});
							doc.text(factura.factura ? factura.factura : '', 275, y, { width: 34, align:'right' });
							doc.text(factura.dui ? factura.dui : '0', 311, y, { width: 28, align:'right' });
							doc.text(factura.autorizacion ? factura.autorizacion: '', 341, y, { width: 64, align:'right' });
							doc.text(factura.importe ? number_format_negativo_to_positvo(factura.importe, 2) : 0.00, 405, y, { width: 45, align: 'right' });
							doc.text(factura.no_sujeto ? number_format_negativo_to_positvo(factura.no_sujeto, 2) : 0.00, 450, y, { width: 47, align:'right' });
							stNoSujeto += factura.no_sujeto;
							doc.text(factura.subtotal ? number_format_negativo_to_positvo(factura.subtotal, 2) : 0.00, 500, y, {width: 44, align:'right'});
							stSubtotal += factura.subtotal;
							doc.text(factura.descuento ? number_format_negativo_to_positvo(factura.descuento, 2) : '0.00', 545, y, { width: 50, align:'right' });
							stDescuentos+= factura.descuento;
							doc.text(factura.base_cf ? number_format_negativo_to_positvo(factura.base_cf, 2) : '', 597, y, { width: 48, align:'right' });
							stBaseCf+= factura.base_cf;
							doc.text(factura.base_cf ? number_format_negativo_to_positvo(factura.base_cf * .13, 2) : '', 647, y, { width: 39, align:'right' });
							stCf += (factura.base_cf*.13);
							doc.text(factura.codigo_control ? factura.codigo_control : '', 687, y, {width: 55, align:'right'});
							doc.text("1", 742, y, { width: 35, align:'center' });
							items++;
							y+=15;
							if(items == itemsPorPagina){
								doc.rect(15, y, 311, 30).stroke();
								doc.lineWidth(0.1);
								doc.rect(25, y + 20, 145, 0).stroke();
								doc.rect(175, y + 20, 55, 0).stroke();
								doc.rect(235, y + 20, 66, 0).stroke();
								doc.text("NOMBRE COMPLETO DEL RESPONSABLE", 25, y + 22, {width: 145, align:'center'});
								doc.text("C.I.", 175, y + 22, {width:55, align:'center'});
								doc.text("FIRMA", 235, y + 22, {width:66, align:'center'});
								
								doc.lineWidth(0.3);
								doc.rect(341, y, 346, 30).stroke();
								doc.rect(341, y + 15, 346, 0).stroke();
								doc.rect(405, y, 0, 30).stroke();
								doc.font('Helvetica', 7)
								doc.text('SUBTOTALES', 341, y+5, {width:62, align:'right'});
								doc.text(number_format_negativo_to_positvo(stImporte, 2), 405, y + 5, { width: 45, align:'right' });
								doc.text(number_format_negativo_to_positvo(stNoSujeto, 2), 450, y + 5, { width: 47, align:'right' });
								doc.text(number_format_negativo_to_positvo(stSubtotal, 2), 500, y + 5, {width: 44, align:'right'});
								doc.text(number_format_negativo_to_positvo(stDescuentos, 2), 545, y + 5, { width: 50, align:'right' });
								doc.text(number_format_negativo_to_positvo(stBaseCf, 2), 597, y + 5, { width: 48, align:'right' });
								doc.text(number_format_negativo_to_positvo(stCf, 2), 647, y + 5, { width: 39, align:'right' });

								doc.text('TOTALES', 341, y + 20, {width:62, align:'right'});
								doc.text(number_format_negativo_to_positvo(totales.importe, 2), 405, y + 20, { width: 45, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.noSujeto, 2), 450, y + 20, { width: 47, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.subtotal, 2), 500, y + 20, {width: 44, align:'right'});
								doc.text(number_format_negativo_to_positvo(totales.descuento, 2), 545, y + 20, { width: 50, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.baseCf, 2), 597, y + 20, { width: 48, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.cf, 2), 647, y + 20, { width: 39, align:'right' });

								doc.addPage({ size: 'letter', margin: 10, layout: 'landscape', compress: false });
								stImporte = 0, stNoSujeto = 0, stSubtotal = 0, stDescuentos = 0, stBaseCf = 0, stCf = 0;
								y = 112;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFLibroCompras(doc, reporte, pagina);
							}
							if(i === facturas.length - 1){
								doc.rect(15, y, 311, 30).stroke();
								doc.lineWidth(0.1);
								doc.rect(25, y + 20, 145, 0).stroke();
								doc.rect(175, y + 20, 55, 0).stroke();
								doc.rect(235, y + 20, 66, 0).stroke();
								doc.text("NOMBRE COMPLETO DEL RESPONSABLE", 25, y + 22, {width: 145, align:'center'});
								doc.text("C.I.", 175, y + 22, {width:55, align:'center'});
								doc.text("FIRMA", 235, y + 22, {width:66, align:'center'});
								
								doc.lineWidth(0.3);
								doc.rect(341, y, 346, 30).stroke();
								doc.rect(341, y + 15, 346, 0).stroke();
								doc.rect(405, y, 0, 30).stroke();
								doc.font('Helvetica', 7)
								doc.text('SUBTOTALES', 341, y+5, {width:62, align:'right'});
								doc.text(number_format_negativo_to_positvo(stImporte, 2), 405, y + 5, { width: 45, align:'right' });
								doc.text(number_format_negativo_to_positvo(stNoSujeto, 2), 450, y + 5, { width: 47, align:'right' });
								doc.text(number_format_negativo_to_positvo(stSubtotal, 2), 500, y + 5, {width: 44, align:'right'});
								doc.text(number_format_negativo_to_positvo(stDescuentos, 2), 545, y + 5, { width: 50, align:'right' });
								doc.text(number_format_negativo_to_positvo(stBaseCf, 2), 597, y + 5, { width: 48, align:'right' });
								doc.text(number_format_negativo_to_positvo(stCf, 2), 647, y + 5, { width: 39, align:'right' });

								doc.text('TOTALES', 341, y + 20, {width:62, align:'right'});
								doc.text(number_format_negativo_to_positvo(totales.importe, 2), 405, y + 20, { width: 45, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.noSujeto, 2), 450, y + 20, { width: 47, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.subtotal, 2), 500, y + 20, {width: 44, align:'right'});
								doc.text(number_format_negativo_to_positvo(totales.descuento, 2), 545, y + 20, { width: 50, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.baseCf, 2), 597, y + 20, { width: 48, align:'right' });
								doc.text(number_format_negativo_to_positvo(totales.cf, 2), 647, y + 20, { width: 39, align:'right' });
							}
						});
						doc.end();
						stream.on('finish', function () {
							swal.close();
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
					}
				});
				
				
			}

			$scope.dibujarCabeceraPDFLibroCompras = function (doc, reporte, pagina) {
				doc.font('Helvetica-Bold', 10);
				doc.lineWidth(0.3);
				doc.text("LIBRO DE COMPRAS IVA ESTÁNDAR", 0, 20, { align: "center" });
				doc.font('Helvetica', 7);
				doc.text("FOLIO: ", 710, 20);
				doc.rect(737, 17, 40, 10).stroke();
				doc.text(pagina, 737,20, {width: 40, align: 'center'});
				doc.text("PERIÓDO FISCAL ", 15, 40);
				doc.text("AÑO:", 100, 40);
				doc.rect(120,37,60,10).stroke();
				doc.text(reporte.gestion, 120, 40, {width: 60, align:'center'});
				doc.text("MES:", 200, 40);
				doc.rect(220,37,90,10).stroke();
				doc.text(reporte.mes.split("-")[1], 220, 40, {width: 90, align:'center'});

				doc.text("NOMBRE O RAZÓN SOCIAL: ", 15, 55);
				doc.rect(120, 52, 180, 10).stroke();
				doc.text($scope.usuario.empresa.razon_social, 120, 55, {width: 180, align:'center'});
				doc.text("NIT: ", 396, 55);
				doc.rect(425, 52, 100, 10).stroke();
				doc.text($scope.usuario.empresa.nit, 425, 55, {width: 100, align:'center'});

				doc.rect(15, 68, 762, 40).stroke();
				doc.font('Helvetica', 7);
				doc.text("Nº", 15, 85, {width: 20, align:'center'});
				doc.rect(35, 68, 0, 40).stroke();

				doc.text("FECHA FACTURA o DUI", 35, 80, { width: 40, align:'center' });
				doc.rect(75, 68, 0, 40).stroke();

				doc.text("NIT DEL PROVEEDOR", 75, 80, { width: 45, align:'center' });
				doc.rect(120, 68, 0, 40).stroke();

				doc.text("NOMBRE O RAZÓN SOCIAL", 120, 85, {width: 155, align:'center'});
				doc.rect(275, 68, 0, 40).stroke();

				doc.text("Nº DE LA FACTURA", 275, 80, { width: 36, align:'center' });
				doc.rect(311, 68, 0, 40).stroke();

				doc.text("Nº DE DUI", 311, 80, { width: 28, align:'center' });
				doc.rect(339, 68, 0, 40).stroke();

				doc.text("Nº DE", 339, 80, { width: 66, align:'center' });
				doc.text("AUTORIZACIÓN", 339, 90, { width: 66, align:'center' });
				doc.rect(405, 68, 0, 40).stroke();

				doc.text("IMPORTE TOTAL DE LA COMPRA", 405, 73, { width: 45, align:'center' });
				doc.rect(450, 68, 0, 40).stroke();

				doc.text("IMPORTE NO SUJETO A CRÉDITO FISCAL", 450, 73, { width: 50, align:'center' });
				doc.rect(500, 68, 0, 40).stroke();

				doc.text("SUBTOTAL", 500, 85, {width: 45, align:'center'});
				doc.rect(545, 68, 0, 40).stroke();

				doc.text("DESCUENTOS, BONIFICACIONES Y REBAJAS", 545, 73, { width: 52, align:'center' });
				doc.rect(597, 68, 0, 40).stroke();

				doc.text("IMPORTE BASE PARA CRÉDITO FISCAL", 597, 73, { width: 50, align:'center' });
				doc.rect(647, 68, 0, 40).stroke();

				doc.text("CRÉDITO FISCAL IVA", 647, 80, { width: 40, align:'center' });
				doc.rect(687, 68, 0, 40).stroke();

				doc.text("CÓDIGO DE CONTROL", 687, 85, {width: 55, align:'center'});
				doc.rect(742, 68, 0, 40).stroke();

				doc.text("TIPO DE COMPRA", 742, 80, { width: 35, align:'center' });
			}

			$scope.abrirModificarCompra = function (compra) {
				$scope.compra = compra;
				$scope.compra_get = angular.copy(compra);
				$scope.abrirPopup($scope.idModalcompra);			
			}
			$scope.cerrarModificarCompra = function () {
				$scope.cerrarPopup($scope.idModalcompra);
			}

			$scope.buscarProveedor = function (query) {
				if (query != "" && query != undefined) {
					var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
					return promesa;
				}
			};

			$scope.establecerProveedor = function (proveedor) {
				$scope.compra_get.proveedor = proveedor;
			}

			$scope.modificarCompra = function (compra) {
				console.log('compra',compra);
				const prom = ActualizarLibroCompra(compra, compra.id)
                prom.then((compraModificado) => {
					console.log('datoC', compra);
					$scope.compra.nit = compra.proveedor.nit;
					$scope.compra.razon_social = compra.razon_social;
					$scope.compra.factura = compra.factura;
					$scope.compra.autorizacion = compra.autorizacion;
					$scope.compra.codigo_control = compra.codigo_control;
					$scope.compra.observacion = compra.observacion;
					$scope.cerrarModificarCompra();
					SweetAlert.swal("Guardado!", compraModificado.mensaje, "success");
					$scope.obtenerLC($scope.filtro);
				}).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
			}
			$scope.generarSiatLibroCompras = async (reporte) => {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					html: '<b>Descargando archivo<br><small>por favor espere esto puede tardar varios minutos...</small></b>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				let datos = {
					id_empresa: $scope.usuario.empresa.id,
					gestion: reporte.gestion,
					mes:reporte.mes,
					conceptos: [21]
				}
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ObtenerDatosImpresionReportes(datos);
				promesa.then( ({ registros }) => {
					if(registros.length > 0){
						var data = [[
							"N°",
							"ESPECIFICACION",
							"NIT PROVEEDOR",
							"RAZON SOCIAL PROVEEDOR",
							"CODIGO DE AUTORIZACION",
							"NUMERO FACTURA",
							"NUMERO DUI/DIM",
							"FECHA DE FACTURA/DUI/DIM",
							"IMPORTE TOTAL COMPRA",
							"IMPORTE ICE",
							"IMPORTE IEHD",
							"IMPORTE IPJ",
							"TASAS",
							"OTRO NO SUJETO A CREDITO FISCAL",
							"IMPORTES EXENTOS",
							"IMPORTE COMPRAS GRAVADAS A TASA CERO",
							"SUBTOTAL",
							"DESCUENTOS/BONIFICACIONES/REBAJAS SUJETAS AL IVA",
							"IMPORTE GIFT CARD",
							"IMPORTE BASE CF",
							"CREDITO FISCAL",
							"TIPO COMPRA",
							"CODIGO DE CONTROL"
						]]
						registros.forEach(({ autorizacion, base_cf, codigo_control, descuento, dui, excento, factura, fecha, ice, importe, nit, no_sujeto, razon_social, subtotal }, i)=> {
							data.push([
								i + 1,
								1,
								nit ? nit : "",
								razon_social ? razon_social : "",
								autorizacion ? autorizacion : "",
								factura ? factura : "",
								dui ? dui : "",
								fecha ? $scope.fechaATexto(fecha): "",
								importe ? importe : 0,
								ice ? ice : 0,
								0,
								0,
								0,
								no_sujeto ? no_sujeto : 0,
								excento ? excento : 0,
								0,
								subtotal ? subtotal : 0,
								descuento ? descuento : 0,
								0,
								base_cf ? base_cf : 0,
								base_cf ? base_cf *0.13 : 0,
								1,
								codigo_control ? codigo_control : "0"
							])
						});
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), reporte.mes + " SIAT COMPRAS.xlsx");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No existen datos de facturas relacionadas al libro de compras!", "warning");
					}
				});
			}
			$scope.inicio();
		}])

	.controller('ControladorReporteAlmacenes', ['$scope', '$window', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'InventariosCosto', 'InventarioPaginadorAlmacen', 'InventarioReporteAlmacen', function ($scope, $window, $localStorage, $location, $templateCache, $route, blockUI,
			InventariosCosto, InventarioPaginadorAlmacen, InventarioReporteAlmacen) {

			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.sucursales = $scope.obtenerSucursales();
				$scope.reporte = {};
				$scope.itemsPorPagina = 10;
				$scope.paginaActual = 1;
				$scope.columna = "cantidad";
				$scope.direccion = "asc";
				$scope.textoBusqueda = "";
				$scope.reporte.sucursal = ($scope.sucursales.length == 1) ? $scope.sucursales[0] : null;
				if ($scope.sucursales.length == 1) {
					$scope.obtenerAlmacenes($scope.sucursales[0].id)
					$scope.reporte.almacen = ($scope.almacenes.length == 1) ? $scope.almacenes[0] : null;
				}
				// $scope.obtenerInventarios();
			}

			$scope.obtenerAlmacenes = function (idSucursal) {
				$scope.almacenes = [];
				// $scope.almacenes.push({ id: 0, nombre: "TODOS" });		
				if (idSucursal !== undefined && idSucursal !== null) {
					var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
					$scope.almacenes = $scope.almacenes.concat(sucursal.almacenes);
					$scope.reporte.almacen = ($scope.almacenes.length == 1) ? $scope.almacenes[0] : null;
				}
				$scope.obtenerInventarios()
			}

			$scope.obtenerSucursales = function () {
				var sucursales = [];
				// if ($scope.usuario.sucursalesUsuario.length > 1) {
				// 	sucursales.push({ id: 0, nombre: "TODOS" });

				// }
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}
			$scope.establecerAlmacenBusqueda = function (reporte) {
				//console.log(almacen.id);
				$scope.almacenBusqueda = reporte.almacen;
				$scope.sucursalBusqueda = reporte.sucursal;
				$scope.obtenerInventarios()
			}
			$scope.obtenerInventarios = function () {
				$scope.abs = $window.Math.abs;
				if ($scope.reporte.sucursal !== undefined && $scope.reporte.sucursal !== null) {
					$scope.sucursalBusqueda = $scope.reporte.sucursal
					if ($scope.reporte.almacen !== undefined && $scope.reporte.almacen) {
						$scope.almacenBusqueda = $scope.reporte.almacen
						$scope.buscarInventarios($scope.sucursalBusqueda.id, $scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
					} else {
						$scope.buscarInventarios($scope.sucursalBusqueda.id, 0, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
					}
				} else {
					if ($scope.sucursales.length == 1) {
						$scope.reporte.sucursal = ($scope.sucursales.length == 1) ? $scope.sucursales[0] : null;
						if ($scope.sucursales.length == 1) {
							$scope.obtenerAlmacenes($scope.sucursales[0].id)
							$scope.reporte.almacen = ($scope.almacenes.length == 2) ? $scope.almacenes[1] : null;
						}
					}
					$scope.buscarInventarios($scope.sucursalBusqueda.id, $scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
				}
				// if ($scope.sucursales.length >0) {
				// 	if($scope.reporte.sucursal !== undefined && $scope.reporte.sucursal !== null){
				// 		$scope.sucursalBusqueda = $scope.reporte.sucursal;
				// 	}else {
				// 		$scope.sucursalBusqueda = 0;
				// 	}

				// 	$scope.almacenes = $scope.sucursalBusqueda !== 0 ? $scope.sucursalBusqueda.almacenes : 0;
				// 	if ($scope.almacenes.length == 1) {
				// 		$scope.almacenBusqueda = $scope.sucursalBusqueda.almacenes[0];
				// 		$scope.buscarInventarios($scope.sucursalBusqueda.id, $scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
				// 	}else {
				// 		$scope.buscarInventarios($scope.sucursalBusqueda.id, 0, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
				// 	}
				// }else{
				// 	$scope.buscarInventarios(0, 0, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
				// }
			}
			$scope.clasificarColumna = function (columna) {
				//console.log(columna);
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
				if ($scope.reporte.sucursal !== undefined) {
					if ($scope.reporte.almacen !== undefined) {
						$scope.almacenBusqueda = $scope.reporte.almacen
					} else {
						$scope.almacenBusqueda = { id: 0 }
					}
					$scope.buscarInventarios($scope.reporte.sucursal.id, $scope.almacenBusqueda.id, $scope.paginaActual, $scope.itemsPorPagina, $scope.textoBusqueda, $scope.columna, $scope.direccion);
				} else {
					$scope.reporte.sucursal
				}

			}

			$scope.buscarInventarios = function (idSucursal, idAlmacen, pagina, itemsPagina, texto, columna, direccion) {
				blockUI.start();
				$scope.itemsPorPagina = itemsPagina !== "TODOS" ? itemsPagina : 0;
				if (idSucursal == undefined || idSucursal == null) {
					idSucursal = 0
				}
				if (idAlmacen == undefined || idAlmacen == null) {
					idAlmacen = 0
				}
				if (texto == "" || texto == null) {
					texto = 0;
				} else {
					$scope.textoBusqueda = texto;
				}
				if (itemsPagina == "todos") {
					itemsPagina = $scope.inventarios.length * $scope.inventarios.paginas;
				}
				$scope.paginaActual = (pagina != $scope.paginaActual) ? pagina : 1;
				var promesa = InventarioPaginadorAlmacen($scope.usuario.id_empresa, idSucursal, idAlmacen, $scope.paginaActual, itemsPagina, texto, columna, direccion, $scope.usuario.id);
				promesa.then(function (inventarios) {
					//console.log(inventarios)
					var inventario = inventarios.inventario;
					$scope.paginas = [];
					for (var i = 1; i <= inventarios.paginas; i++) {
						$scope.paginas.push(i);
					}

					$scope.inventarios = inventario;
					$scope.inventarios.paginas = inventarios.paginas;
					//console.log($scope.inventarios)

					blockUI.stop();
				}).catch(function (err) {
					var memo = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : ' Error desconocido al buscar inventarios en reportes almacen,';
					$scope.mostrarMensaje('ERROR. ' + memo)
					blockUI.stop();
				})
			}

			$scope.generarPdfAlmacenes = function (reporte) {
				blockUI.start();
				if (reporte.solo_pagina_actual) {
					var inventarios = $scope.inventarios;
					var doc = new PDFDocument({ margin: 10, compress: false });
					var stream = doc.pipe(blobStream());
					// draw some text
					var totalCosto = 0;
					var y = 90, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(inventarios.length / itemsPorPagina);
					$scope.dibujarCabeceraPDFAlmacenes(doc, 1, totalPaginas);
					doc.font('Helvetica', 7);
					for (var i = 0; i < inventarios.length && items <= itemsPorPagina; i++) {
						doc.rect(30, y - 10, 555, 20).stroke();
						doc.text(inventarios[i].codigo, 35, y);
						doc.text(inventarios[i].cantidad, 110, y);
						doc.text(inventarios[i].unidad_medida, 160, y);
						if ($scope.usuario.empresa.usar_vencimientos) {
							if (inventarios[i].nombre.length > 35) {
								doc.text(inventarios[i].nombre, 210, y - 6, { width: 170 });
							} else {
								doc.text(inventarios[i].nombre, 210, y, { width: 170 });
							}
							inventarios[i].fecha_vencimiento = new Date(inventarios[i].fecha_vencimiento);
							doc.text(inventarios[i].fecha_vencimiento.getDate() + "/" + (inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + inventarios[i].fecha_vencimiento.getFullYear(), 380, y);
							doc.text(((inventarios[i].lote == null) ? 'No definido.' : inventarios[i].lote), 430, y);
						} else {
							doc.text(inventarios[i].nombre, 210, y);
						}
						doc.text(inventarios[i].costo_unitario.toFixed(2), 470, y);
						doc.text(inventarios[i].costo_total.toFixed(2), 530, y);
						y = y + 20;
						items++;
						totalCosto = totalCosto + inventarios[i].costo_total;
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
							$scope.dibujarCabeceraPDFAlmacenes(doc, pagina, totalPaginas);
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

				} else {

					var prom = InventarioReporteAlmacen($scope.usuario.id_empresa, reporte.sucursal.id, (reporte.almacen !== null && reporte.almacen !== undefined && reporte.almacen !== 0) ? reporte.almacen.id : 0, $scope.usuario.id)
					prom.then(function (res) {
						var inventarios = res.inventario;
						var doc = new PDFDocument({ margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						// draw some text
						var totalCosto = 0;
						var y = 90, itemsPorPagina = 33, items = 0, pagina = 1, totalPaginas = Math.ceil(inventarios.length / itemsPorPagina);
						$scope.dibujarCabeceraPDFAlmacenes(doc, 1, totalPaginas);
						doc.font('Helvetica', 7);
						for (var i = 0; i < inventarios.length && items <= itemsPorPagina; i++) {
							doc.rect(30, y - 10, 555, 20).stroke();
							doc.text(inventarios[i].codigo, 35, y);
							doc.text(inventarios[i].cantidad, 110, y);
							doc.text(inventarios[i].unidad_medida, 160, y);
							if ($scope.usuario.empresa.usar_vencimientos) {
								if (inventarios[i].nombre.length > 35) {
									doc.text(inventarios[i].nombre, 210, y - 6, { width: 170 });
								} else {
									doc.text(inventarios[i].nombre, 210, y, { width: 170 });
								}
								inventarios[i].fecha_vencimiento = new Date(inventarios[i].fecha_vencimiento);
								doc.text(inventarios[i].fecha_vencimiento.getDate() + "/" + (inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + inventarios[i].fecha_vencimiento.getFullYear(), 380, y);
								doc.text(((inventarios[i].lote == null) ? 'No definido.' : inventarios[i].lote), 430, y);
							} else {
								doc.text(inventarios[i].nombre, 210, y);
							}
							doc.text(inventarios[i].costo_unitario.toFixed(2), 470, y);
							doc.text(inventarios[i].costo_total.toFixed(2), 530, y);
							y = y + 20;
							items++;
							totalCosto = totalCosto + inventarios[i].costo_total;
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
								$scope.dibujarCabeceraPDFAlmacenes(doc, pagina, totalPaginas);
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
					})
				}


				blockUI.stop();

			}

			$scope.generarExcelAlmacenes = function (reporte) {
				blockUI.start();
				if (reporte.solo_pagina_actual) {
					var inventarios = $scope.inventarios;
					var data = [["Código", "Nombre", "Unidad de Medida", "Precio Unitario", "Descripción", "Inventario Mínimo",
						"Grupo", "Sub-Grupo", "Carac. Esp. 1", "Carac. Esp. 2", "Codigo de fabrica", "Cant.", "Costo Unitario",
						"Total General", "Fecha Vencimiento", "Lote", "Sucursal", "Almacen"]]
					for (var i = 0; i < inventarios.length; i++) {
						inventarios[i].fecha_vencimiento = (inventarios[i].fecha_vencimiento ? new Date(inventarios[i].fecha_vencimiento) : null);
						//inventarios[i].fechaVentimientoTexto = (inventarios[i].fecha_vencimiento ? inventarios[i].fecha_vencimiento.getDate() + "/" + (inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + inventarios[i].fecha_vencimiento.getFullYear() : "");
						var columns = [];
						columns.push(inventarios[i].codigo);
						columns.push(inventarios[i].nombre);
						columns.push(inventarios[i].unidad_medida);
						columns.push(inventarios[i].precio_unitario);
						columns.push(inventarios[i].descripcion);
						columns.push(inventarios[i].inventario_minimo);
						columns.push(inventarios[i].grupo);
						columns.push(inventarios[i].subgrupo);
						columns.push(inventarios[i].caracteristica_especial1);
						columns.push(inventarios[i].caracteristica_especial2);
						columns.push(inventarios[i].codigo_fabrica);
						columns.push(inventarios[i].cantidad);
						columns.push(inventarios[i].costo_unitario);
						columns.push(inventarios[i].costo_total);
						columns.push(inventarios[i].fecha_vencimiento);
						columns.push(inventarios[i].lote);
						columns.push(inventarios[i].nombre_sucursal);
						columns.push(inventarios[i].nombre_almacen);
						data.push(columns);
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ALMACENES.xlsx");

				} else {
					var prom = InventarioReporteAlmacen($scope.usuario.id_empresa, reporte.sucursal.id, (reporte.almacen && reporte.almacen !== null && reporte.almacen !== 0) ? reporte.almacen.id : 0, $scope.usuario.id)
					prom.then(function (res) {
						var inventarios = res.inventario;
						var data = [["Código", "Nombre", "Unidad de Medida", "Precio Unitario", "Descripción", "Inventario Mínimo",
							"Grupo", "Sub-Grupo", "Carac. Esp. 1", "Carac. Esp. 2", "Codigo de fabrica", "Cant.", "Costo Unitario",
							"Total General", "Fecha Vencimiento", "Lote", "Sucursal", "Almacen"]]
						for (var i = 0; i < inventarios.length; i++) {
							inventarios[i].fecha_vencimiento = (inventarios[i].fecha_vencimiento ? new Date(inventarios[i].fecha_vencimiento) : null);
							//inventarios[i].fechaVentimientoTexto = (inventarios[i].fecha_vencimiento ? inventarios[i].fecha_vencimiento.getDate() + "/" + (inventarios[i].fecha_vencimiento.getMonth() + 1) + "/" + inventarios[i].fecha_vencimiento.getFullYear() : "");
							var columns = [];
							columns.push(inventarios[i].codigo);
							columns.push(inventarios[i].nombre);
							columns.push(inventarios[i].unidad_medida);
							columns.push(inventarios[i].precio_unitario);
							columns.push(inventarios[i].descripcion);
							columns.push(inventarios[i].inventario_minimo);
							columns.push(inventarios[i].grupo);
							columns.push(inventarios[i].subgrupo);
							columns.push(inventarios[i].caracteristica_especial1);
							columns.push(inventarios[i].caracteristica_especial2);
							columns.push(inventarios[i].codigo_fabrica);
							columns.push(inventarios[i].cantidad);
							columns.push(inventarios[i].costo_unitario);
							columns.push(inventarios[i].costo_total);
							columns.push(inventarios[i].fecha_vencimiento);
							columns.push(inventarios[i].lote);
							columns.push(inventarios[i].nombre_sucursal);
							columns.push(inventarios[i].nombre_almacen);
							data.push(columns);
						}
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ALMACENES.xlsx");
					})
				}

				blockUI.stop();

			}

			$scope.dibujarCabeceraPDFAlmacenes = function (doc, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE ALMACENES", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 10);
				doc.text("SUCURSAL:" + $scope.reporte.sucursal.nombre + " - ALMACEN:" + (($scope.reporte.almacen !== null && $scope.reporte.almacen !== undefined && $scope.reporte.almacen !== 0) ? $scope.reporte.almacen.nombre : 'TODOS LOS ALMACENES'), 0, 38, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 750, { align: "center" });

				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Código", 45, 60);
				doc.text("Cant.", 110, 60, { width: 50 });
				doc.text("Unid.", 160, 60, { width: 50 });
				doc.text("Descripción", 210, 60, { width: 170 });
				if ($scope.usuario.empresa.usar_vencimientos) {
					doc.text("Venc.", 380, 60);
					doc.text("Lote", 430, 60);
				}
				doc.text("Costo Unitario", 470, 60, { width: 50 });
				doc.text("Total General", 530, 60, { width: 50 });
			}

			$scope.inicio();


		}])

	.controller('ControladorVentasMensuales', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'ClasesTipo', 'ReporteVentasMensualesDatos', 'SweetAlert', 'ReporteVentasMensualesDatosExcel', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
			ClasesTipo, ReporteVentasMensualesDatos, SweetAlert, ReporteVentasMensualesDatosExcel) {

			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {

				$scope.obtenerGestiones();
				$scope.sucursales = $scope.obtenerSucursales();
				$scope.reporte = {}
				$scope.reporte.sucursal = ($scope.sucursales.length == 1) ? $scope.sucursales[0] : null;
				ejecutarScriptsVentasMensuales();
			}

			$scope.obtenerSucursales = function () {
				var sucursales = [];
				if ($scope.usuario.sucursalesUsuario.length > 1) {
					sucursales.push({ id: 0, nombre: "TODOS" });
				}
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}

			$scope.obtenerGestiones = function () {
				blockUI.start();
				var promesa = ClasesTipo("GTN");
				promesa.then(function (entidad) {
					$scope.gestiones = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.generarExcelVentasMensuales = function (reporte) {
				inicio = new Date($scope.convertirFecha(reporte.fechaInicioTexto));
				fin = new Date($scope.convertirFecha(reporte.fechaFinTexto));
				SweetAlert.swal({
					title: 'Recuperando registros de las ventas...',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var promesa = ReporteVentasMensualesDatosExcel($scope.usuario.id_empresa, reporte.sucursal.id, inicio, fin);
				promesa.then(function (datos) {
					if(!datos.hasError){
						SweetAlert.update({ title: "Construyendo archivo excel...." });
						var detallesVenta = datos.detallesVenta;

						var data = [["FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL", "UBICACION CLIENTE",
							"CODIGO", "DETALLE", "DESCRPCIÓN", "UNIDAD", "GRUPO", "CANTIDAD", "PU", "TOTAL", "IMPORTE ICE/IEHD/TASAS", "EXPORTACIONES Y OPERACIONES EXENTAS",
							"VENTAS GRAVADAS A TASA CERO", "SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS",
							"IMPORTE BASE PARA DEBITO FISCAL", "DEBITO FISCAL", "SUCURSAL", "USUARIO", "TIPO DE PAGO"]]
						if ($scope.usuario.empresa.usar_vencimientos) {
							data[0].push('FECHA VENCIMIENTO');
							data[0].push('LOTE');
						}
						data[0].push('VENDEDOR');
						data[0].push('ALMACEN');
						
						data.push(...detallesVenta)
						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "VENTAS-MENSUALES.xlsx");
						filesaver.onwriteend = function() { 
							SweetAlert.swal({
								title: 'Finalizado!',
								icon: 'success',
								timer: 2000,
								showConfirmButton: false
							})
						}
					}else if(!datos.err){
						SweetAlert.swal("", datos.message, "warning");
					}else{
						SweetAlert.swal("", datos.message, "error");
					}
				});
			}

			$scope.generarPdfVentasMensuales = function (reporte) {
				inicio = new Date($scope.convertirFecha(reporte.fechaInicioTexto));
				fin = new Date($scope.convertirFecha(reporte.fechaFinTexto));
				SweetAlert.swal({
					title: 'Recuperando registros de las ventas...',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
				var promesa = ReporteVentasMensualesDatos($scope.usuario.id_empresa, reporte.sucursal.id, inicio, fin);
				promesa.then(function (datos) {
					SweetAlert.update({ title: "Construyendo archivo pdf...." });
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
						SweetAlert.swal({
							title: 'Finalizado!',
							icon: 'success',
							timer: 2000,
							showConfirmButton: false
						})
					});
				});
			}

			$scope.dibujarCabeceraPDFVentasMensuales = function (doc, datos, reporte, pagina) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE DE VENTAS", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + reporte.fechaInicioTexto, -70, 40, { align: "center" });
				doc.text("Hasta " + reporte.fechaFinTexto, 70, 40, { align: "center" });
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

			$scope.inicio();


		}])

	.controller('ControladorEstadoResultadosNoContable', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'ReporteEstadoResultadosNoContableDatos', 'SweetAlert', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, ReporteEstadoResultadosNoContableDatos, SweetAlert) {

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.sucursales = $scope.usuario.sucursalesUsuario.filter(s=>s.sucursal.activo==true).map(e=>e.sucursal);
			$scope.idModalGastos = "dialog-gastos";

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsEstadoResultadosNoContable($scope.idModalGastos);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				blockUI.stop();
			});

			$scope.abrirPopupGastos = function () {
				SweetAlert.swal({
                    title: '',
					icon: 'info',
                    html: '<h3 class="bolder" >¿Ingrese el gasto a registrar?</h3><input type="number" id="gasto" class="swal2-input" placeholder="Ingrese gasto" value="0"></input>',
                    confirmButtonText: 'Registrar',
                    cancelButtonText: 'Cerrar',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        let gasto = SweetAlert.getContent().querySelector('#gasto').value
                        if (gasto < 0) {
                            SweetAlert.showValidationMessage(`Ingrese importe válido`)
                            return false
                        } else {
                            return { gasto: gasto }
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
						$scope.gasto = +result.value.gasto;
						$scope.generarEstadoResultadosNoContable($scope.gasto, $scope.filtro.fechaInicioTexto,$scope.filtro.fechaFinTexto, $scope.filtro.sucursal) 
                    }
                })
			}

			$scope.inicio = function () {

			}

			$scope.humanizeNumber = function (n) {
				n = n.toString()
				while (true) {
					var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
					if (n == n2) break
					n = n2
				}
				return n
			}
			// $scope.humanizeNumber = function (nStr) {  
			// 	nStr += '';
			// 	x = nStr.split('.');
			// 	x1 = x[0];
			// 	x2 = x.length > 1 ? ',' + x[1] : '';
			// 	var rgx = /(\d+)(\d{3})/;
			// 	while (rgx.test(x1)) {
			// 			x1 = x1.replace(rgx, '$1' + '.' + '$2');
			// 	}
			// 	return x1 + x2;
			// }

			// para redondeo de numeros
			function round(value, decimals) {
				return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
			}

			$scope.generarEstadoResultadosNoContable = function (gasto, inicio, fin, sucursal) {
				SweetAlert.swal({
                    title: 'Generando reporte',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-search size-icon"></i>',
                    html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
				ReporteEstadoResultadosNoContableDatos($scope.usuario.id_empresa, inicio, fin, sucursal)
				.then(( { error, data, otros, message, messageType } ) => {
					if( error) return SweetAlert.swal("", message, messageType);
					if( data.length === 0 && otros.length === 0 ) return SweetAlert.swal("", "<b>No se encontraron registros</b>", "info");
					try {
						let ventas = Object.values(data.reduce((acc, val) =>{
							if(!acc[val.id_detalle_venta]) { acc[val.id_detalle_venta] = val }
							return acc
						},{}));
						
						let ventasProductos = ventas.filter( e => ( e.clase_venta === ( "PFR" || "FACT"))).reduce((a,b,i,arr) => {
							if(!a[b.tipo_pago]){
								a[b.tipo_pago] = arr.filter(r=>r.tipo_pago===b.tipo_pago).reduce((x,y) => {
										if(y.clase_venta === "PFR"){
											if(y.total_ventas > 0){
												x += y.total_ventas
											}else{
												x += (y.v_cantidad * y.v_precio)
											}
										}
										if(y.clase_venta === "FACT"){
											if(y.total_ventas > 0){
												x += y.total_ventas * 0.87;
											}else{
												x += (y.v_cantidad * y.v_precio*0.87);
											}
										}
										return x
									}, 0)
							}
							return a
						}, {})

						let ventasServicios = ventas.filter( e => ( e.clase_venta != ( "PFR" || "FACT"))).reduce((a,b,i,arr) => {
							if(!a[b.tipo_pago]){
								a[b.tipo_pago] = arr.filter(r=>r.tipo_pago===b.tipo_pago).reduce((x,y) => {
											if(y.total_ventas > 0){
												x += y.total_ventas * 0.87;
											}else{
												x += (y.v_cantidad * y.v_precio*0.87);
											}
										return x
									}, 0)
							}
							return a
						}, {})

						let totalCostos = Object.values(data.reduce((acc, val) =>{
							if(!acc[val.id_inventario]){
								acc[val.id_inventario] = val
							}
							return acc
						},{})).reduce(( x, y ) => x += (y.v_cantidad * y.costo_unitario_neto) , 0)

						let otrosGastos = Object.values(otros.reduce((acc, val) => {
							let neto = 0
							if(val.tipo === "IPCSF") neto = val.importe
							if(val.tipo === "ID") neto = val.importe * 0.87
							if(val.tipo === "IPRB") neto = val.importe * 0.92
							if(val.tipo === "IPRS") neto = val.importe * 0.845
							if(!acc[val.id_cenco]){
								acc[val.id_cenco]={
									cenco: val.cenco,
									total: neto
								}
							}else{
								acc[val.id_cenco].total += neto
							}
							return acc
						}, {}))
						var doc = new PDFDocument({ margin: 10, size:'letter', compress: false });
						var stream = doc.pipe(blobStream());
						let hoy = new Date();
						let meta = "Usuario: "+$scope.usuario.nombre_usuario+"       Fecha: "+$scope.formatoFechaHora(hoy);
						var fechaDesde = $scope.filtro.fechaInicioTexto ? $scope.filtro.fechaInicioTexto : hoy.getFullYear()+"/01/01";
						var fechaHasta = $scope.filtro.fechaFinTexto ? $scope.filtro.fechaFinTexto : $scope.fechaATexto(hoy)
						var x = 100, x1=302 , x2 = 382, x3 = 462, y = 60, items=0, pagina = 1, itemsPorPagina=50, totalPaginas = Math.ceil((13+otros.length)/itemsPorPagina);
						$scope.cabeceraEstadoResultadoNoContable(doc, sucursal, fechaDesde, fechaHasta, pagina, totalPaginas, meta );
						y+=20;
						doc.font('Helvetica-Bold', 8);
						doc.text("VENTAS", x, y);
						let totalVentas = 0
						let totalProductos = 0
						let totalServicios = 0
						if(ventasProductos.CONT) {
							totalVentas += ventasProductos.CONT
							totalProductos += ventasProductos.CONT
							
						}
						if(ventasProductos.CRE){
							totalVentas+=ventasProductos.CRE
							totalProductos+=ventasProductos.CRE
						} 
						if(ventasProductos.TARCRE) {
							totalVentas+=ventasProductos.TARCRE
							totalProductos+=ventasProductos.TARCRE
						} 
						if(ventasServicios.CONT) {
							totalVentas += ventasServicios.CONT
							totalServicios += ventasServicios.CONT
							
						}
						if(ventasServicios.CRE){
							totalVentas+=ventasServicios.CRE
							totalServicios+=ventasServicios.CRE
						} 
						if(ventasServicios.TARCRE) {
							totalVentas+=ventasServicios.TARCRE
							totalServicios+=ventasServicios.TARCRE
						} 
						doc.text( totalVentas ? number_format_negativo_to_positvo(totalVentas, 2) : "0.00", x3, y, {width: 50, align:'right'});
						y+=10;
						doc.font('Helvetica', 8);
						doc.text("PRODUCTOS", x + 10, y);
						doc.text( totalProductos ? number_format_negativo_to_positvo(totalProductos, 2) : "0.00", x2, y, {width: 50, align:'right'});
						y+=10;
						doc.font('Helvetica', 8);
						doc.text("AL CONTADO", x + 40, y);
						doc.text( ventasProductos.CONT ? number_format_negativo_to_positvo(ventasProductos.CONT, 2)  : "0.00", x1, y, {width: 50, align:'right'});
						y+=10;
						doc.text("A CRÉDITO", x + 40, y);
						doc.text( ventasProductos.CRE ? number_format_negativo_to_positvo(ventasProductos.CRE, 2) : "0.00", x1, y, {width: 50, align:'right'});
						y+=10;
						doc.text("TARJETA DE CRÉDITO", x + 40, y);
						doc.text( ventasProductos.TARCRE ? number_format_negativo_to_positvo(ventasProductos.TARCRE, 2) : "0.00", x1, y, {width: 50, align:'right'});
						y+=10;
						doc.text("SERVICIOS", x + 10, y);
						doc.text( totalServicios ? number_format_negativo_to_positvo(totalServicios, 2) : "0.00", x2, y, {width: 50, align:'right'});
						y += 10
						doc.text("AL CONTADO", x + 40, y);
						doc.text( ventasServicios.CONT ? number_format_negativo_to_positvo(ventasServicios.CONT, 2) : "0.00", x1, y, {width: 50, align:'right'});
						y += 10;
						doc.text("A CRÉDITO", x + 40, y);
						doc.text( ventasServicios.CRE ? number_format_negativo_to_positvo(ventasServicios.CRE, 2) : "0.00", x1, y, {width: 50, align:'right'});
						y += 10;
						doc.text("TARJETA DE CRÉDITO", x + 40, y);
						doc.text( ventasServicios.TARCRE ? number_format_negativo_to_positvo(ventasServicios.TARCRE, 2) : "0.00", x1, y, {width: 50, align:'right'});
						y+=15;
						doc.font('Helvetica-Bold', 8);
						doc.text("COSTO DE VENTAS", x, y);
						doc.lineWidth(0.3).rect(x, y + 10,412, 0).stroke()
						doc.text( totalCostos ? number_format_negativo_to_positvo(totalCostos, 2) : "0.00", x3, y, {width: 50, align:'right'});
						y += 15;
						let utilidadBruta = totalProductos + totalServicios - totalCostos
						doc.text("UTILIDAD BRUTA EN VENTAS", x, y);
						doc.text( utilidadBruta ? number_format_negativo_to_positvo(utilidadBruta, 2) : "0.00", x3, y, {width: 50, align:'right'});
						y += 15;
						let totalGastos = otrosGastos.reduce((a, b) => a+b.total, 0) + (gasto ? gasto : 0);
						doc.text("GASTOS", x, y);
						doc.text( totalGastos ? number_format_negativo_to_positvo(totalGastos, 2) : "0.00", x3, y, {width: 50, align:'right'});
						y += 10;
						doc.font('Helvetica', 8);
						for (let k = 0; k < otrosGastos.length; k++) {
							const { cenco, total } = otrosGastos[k];
							doc.text(cenco ? cenco.toUpperCase(): "", x + 10, y, )
							doc.text( total ? number_format_negativo_to_positvo(total, 2) : "", x2, y, {width: 50, align:'right'})
							y += 10;
							items++;
							if(items === itemsPorPagina){
								doc.addPage({ size: 'letter', compress: false, margin: 10 });
								y = 80;
								items = 0;
								pagina++;
								$scope.cabeceraEstadoResultadoNoContable(doc, sucursal, fechaDesde, fechaHasta, pagina, totalPaginas, meta );
							}
						}
						if(gasto > 0){
							doc.text("OTROS GASTOS", x + 10, y);
							doc.text(number_format_negativo_to_positvo(gasto, 2), x2, y, {width: 50, align:'right'});
							y += 10
							items++;
							if(items === itemsPorPagina){
								doc.addPage({ size: 'letter', compress: false, margin: 10 });
								y = 80;
								items = 0;
								pagina++;
								$scope.cabeceraEstadoResultadoNoContable(doc, sucursal, fechaDesde, fechaHasta, pagina, totalPaginas, meta );
							}
						}
						y += 5
						doc.font('Helvetica-Bold', 8);
						doc.lineWidth(0.8).rect(x, y - 2, 412, 0).stroke()
						let utilidadNeta = utilidadBruta - totalGastos;
						let textoUtilidad = ((utilidadNeta >= 0) ? "UTILIDAD DEL PERIODO" : "PÉRDIDA DEL PERIODO")
						doc.lineWidth(0.8).rect(x,y+8,412, 0).stroke()
						doc.lineWidth(0.3).rect(x,y+9,412, 0).stroke()
						doc.text(textoUtilidad, x, y);
						doc.text(number_format_negativo_to_positvo(utilidadNeta, 2), x3, y, {width: 50, align:'right'});
						doc.end();
						stream.on('finish', function () {
							SweetAlert.swal({
								title: 'Finalizado!',
								icon: 'success',
								timer: 2000,
								showConfirmButton: false
							})
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
					} catch (e) {
						SweetAlert.swal("", "<b>Ocurrió un error</b/><br>"+e, "error");
					}					
				})
			}
			$scope.cabeceraEstadoResultadoNoContable = (doc, sucursal, desde, hasta, pagina, totalPaginas, meta) => {
				y = 60
				doc.font('Helvetica-Bold', 10);
				doc.text("ESTADO DE RESULTADOS NO CONTABLE", 0, y, { align: "center" });
				y+=10;
				if(sucursal && sucursal.id) {
					doc.font('Helvetica-Bold', 8);
					doc.text(sucursal.nombre.toUpperCase(), 0, y, { align: "center" });
					y+=10;
				}
				doc.font('Helvetica-Bold', 7);
				doc.text('Del ' + desde + ' al ' + hasta, 0, y, { align: "center" });

				doc.font('Helvetica-Bold', 7).text("Página "+pagina+" de "+totalPaginas, 0, 750, { width: 612, align:"center"})
				doc.font('Helvetica', 6).text(meta, 0, 760, { width: 612, align:"center"})
			}

			$scope.generarExcelAlmacenes = function () {
				blockUI.start();
				var promesa = InventariosCosto($scope.usuario.id_empresa);
				promesa.then(function (inventarios) {
					var data = [["Código", "Cant.", "Unid.", "Descripción", "Costo Unitario", "Total General"]]
					for (var i = 0; i < inventarios.length; i++) {
						var columns = [];
						columns.push(inventarios[i].producto.codigo);
						columns.push(inventarios[i].cantidad);
						columns.push(inventarios[i].producto.unidad_medida);
						columns.push(inventarios[i].producto.nombre);
						columns.push(inventarios[i].costo_unitario);
						columns.push(inventarios[i].costo_total);
						data.push(columns);
					}

					var ws_name = "SheetJS";
					var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ALMACENES.xlsx");
					blockUI.stop();
				});
			}

			$scope.dibujarCabeceraPDFAlmacenes = function (doc, pagina, totalPaginas) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE ALMACENES", 0, 25, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 750, { align: "center" });

				doc.rect(30, 50, 555, 30).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Código", 45, 60);
				doc.text("Cant.", 110, 60, { width: 50 });
				doc.text("Unid.", 160, 60, { width: 50 });
				doc.text("Descripción", 210, 60, { width: 300 });
				doc.text("Costo Unitario", 470, 60, { width: 50 });
				doc.text("Total General", 530, 60, { width: 50 });
			}

			$scope.inicio();

			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup($scope.idModalGastos);
			});

		}])

	.controller('ControladorComprasMensuales', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'ClasesTipo', 'ReporteComprasMensualesDatos', 'SweetAlert', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
			ClasesTipo, ReporteComprasMensualesDatos, SweetAlert) {

			$scope.usuario = JSON.parse($localStorage.usuario);

			$scope.inicio = function () {
				$scope.obtenerGestiones();
				$scope.sucursales = $scope.obtenerSucursales();
				$scope.reporte = {}
				$scope.reporte.sucursal = ($scope.sucursales.length == 1) ? $scope.sucursales[0] : null;
				ejecutarScriptsVentasMensuales();
			}
			$scope.obtenerSucursales = function () {
				var sucursales = [];

				if ($scope.usuario.sucursalesUsuario.length > 1) {
					sucursales.push({ id: 0, nombre: "TODOS" });
				}
				for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
					sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
				}
				return sucursales;
			}
			$scope.obtenerGestiones = function () {
				blockUI.start();
				var promesa = ClasesTipo("GTN");
				promesa.then(function (entidad) {
					$scope.gestiones = entidad.clases;
					blockUI.stop();
				});
			}

			$scope.generarExcelComprasMensuales =  function (reporte) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar ...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				inicio = new Date($scope.convertirFecha(reporte.fechaInicioTexto));
				fin = new Date($scope.convertirFecha(reporte.fechaFinTexto));
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ReporteComprasMensualesDatos($scope.usuario.id_empresa, reporte.sucursal.id, inicio, fin);
				promesa.then(function (datos) {
					var detallesCompra = datos.compras;
					var data = [["FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL",
						"CODIGO", "DETALLE", "UNIDAD", "GRUPO", "CANTIDAD", "PU", "TOTAL", "IMPORTE ICE/IEHD/TASAS", "EXENTOS",
						"SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS",
						"IMPORTE BASE PARA DEBITO FISCAL", "CREDITO FISCAL", "FECHA DE VENCIMIENTO", "LOTE", "SUCURSAL", "ALMACÉN", "USUARIO", "CENTRO DE COSTOS"]]
					if(datos.compras.length > 0){
						for (var i = 0; i < detallesCompra.length; i++) {
							var columns = [];
							columns.push(detallesCompra[i].fecha_factura ?  new Date(detallesCompra[i].fecha_factura).toJSON().slice(0,10).split('-').reverse().join('/') : "");
							columns.push(detallesCompra[i].numero_factura ? detallesCompra[i].numero_factura : "");
							columns.push(detallesCompra[i].numero_autorizacion ? detallesCompra[i].numero_autorizacion : "");
							columns.push(detallesCompra[i].nit_proveedor ? detallesCompra[i].nit_proveedor : "");
							columns.push(detallesCompra[i].razon_social_proveedor ? detallesCompra[i].razon_social_proveedor : "");
							columns.push(detallesCompra[i].codigo_producto ? detallesCompra[i].codigo_producto : "");
							columns.push(detallesCompra[i].nombre_producto ? detallesCompra[i].nombre_producto : "");
							columns.push(detallesCompra[i].unidad_producto ? detallesCompra[i].unidad_producto : "")
							columns.push(detallesCompra[i].grupo_producto ? detallesCompra[i].grupo_producto : "");
							columns.push(detallesCompra[i].cantidad_detalle ? detallesCompra[i].cantidad_detalle : "");
							columns.push(detallesCompra[i].pu_detalle ? detallesCompra[i].pu_detalle : "");
							columns.push(detallesCompra[i].importe_detalle ? detallesCompra[i].importe_detalle : "");
							columns.push(detallesCompra[i].ice_detalle ? detallesCompra[i].ice_detalle : 0);
							columns.push(detallesCompra[i].excento_detalle ? detallesCompra[i].excento_detalle : 0);
							columns.push(detallesCompra[i].subtotal_detalle ? detallesCompra[i].subtotal_detalle : "");
							columns.push(detallesCompra[i].descuento_detalle ? detallesCompra[i].descuento_detalle : 0);
							columns.push(detallesCompra[i].total_detalle ? detallesCompra[i].total_detalle : "");
							columns.push(detallesCompra[i].total_detalle ? number_format_negativo_to_positvo(detallesCompra[i].total_detalle * 0.13, 2) : "");
							columns.push(detallesCompra[i].vencimiento_inv ? new Date(detallesCompra[i].vencimiento_inv) : "");
							columns.push(detallesCompra[i].lote_inv ? detallesCompra[i].lote_inv : "");
							columns.push(detallesCompra[i].nombre_sucursal ? detallesCompra[i].nombre_sucursal : "");
							columns.push(detallesCompra[i].nombre_almacen ? detallesCompra[i].nombre_almacen : "");
							columns.push(detallesCompra[i].nombre_usuario ? detallesCompra[i].nombre_usuario : "");
							columns.push(detallesCompra[i].cenco ? detallesCompra[i].cenco : "");
							data.push(columns);
						}

						var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
						/* add worksheet to workbook */
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "COMPRAS-MENSUALES.xlsx");
						filesaver.onwriteend = function() { 
							swal.close();
						}
					}else{
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No se encontraron compras", "warning");
					}
				});
			}

			$scope.generarPdfComprasMensuales = function (reporte) {
				SweetAlert.swal({
					title:'',
					icon: 'info',
					iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
					text: 'Descargando archivo, por favor espere esto puede tardar varios minutos...',
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				inicio = new Date($scope.convertirFecha(reporte.fechaInicioTexto));
				fin = new Date($scope.convertirFecha(reporte.fechaFinTexto));
				blockUI.noOpen = true;
				SweetAlert.showLoading()
				var promesa = ReporteComprasMensualesDatos($scope.usuario.id_empresa, reporte.sucursal.id, inicio, fin);
				promesa.then(function (datos) {
					var detallesCompra = datos.compras;
					if (detallesCompra.length == 0) {
						SweetAlert.hideLoading();
						SweetAlert.swal("", "No se encontraron compras", "warning");
					}else{
						var doc = new PDFDocument({ compress: false, margin: 10 });
						var stream = doc.pipe(blobStream());
						// draw some text

						doc.font('Helvetica', 8);
						var y = 150, itemsPorPagina = 15, items = 0, pagina = 1;
						$scope.dibujarCabeceraPDFcomprasMensuales(doc, reporte, pagina);
						detallesCompra.forEach((detalle, i)=>{
							doc.rect(40, y - 10, 540, 40).stroke();
							detalle.fecha_factura = new Date(detalle.fecha_factura);
							doc.text(detalle.fecha_factura.getDate() + "/" + (detalle.fecha_factura.getMonth() + 1) + "/" + detalle.fecha_factura.getFullYear(), 45, y);
							doc.text((detalle.numero_factura ? detalle.numero_factura : ""), 90, y);
							doc.text((detalle.razon_social_proveedor) ? detalle.razon_social_proveedor : "", 135, y - 6, { width: 80 });
							doc.text(detalle.nombre_producto ? detalle.nombre_producto : "", 225, y - 6, { width: 80 });
							doc.text(detalle.unidad_producto ? detalle.unidad_producto : "", 300, y, { width: 50 });
							detalle.vencimiento_inv = new Date(detalle.vencimiento_inv);
							doc.text(detalle.vencimiento_inv.getDate() + "/" + (detalle.vencimiento_inv.getMonth() + 1) + "/" + detalle.vencimiento_inv.getFullYear(), 345, y);
							doc.text(detalle.lote_inv ? detalle.lote_inv : "", 405, y);
							doc.text(detalle.descuento_detalle ? detalle.descuento_detalle : "", 445, y);
							doc.text(detalle.recargo_detalle ? detalle.recargo_detalle : "", 495, y);
							doc.text(detalle.total_detalle ? detalle.total_detalle : "", 535, y);
							//doc.text(detallesCompra[i].total,705,y);
							y = y + 40;
							items++;

							if (items == itemsPorPagina || i + 1 == detallesCompra.length) {
								if (i + 1 == detallesCompra.length) {

								} else {
									doc.addPage({ compress: false, margin: 0, bufferPages: true });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFcomprasMensuales(doc, reporte, pagina);
									doc.font('Helvetica', 8);
								}
							}
						})
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}
						doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 45, y);
						doc.text("IMPRESION : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " Hr. " + fechaActual.getHours() + ":" + min, 175, y);
						doc.end();
						stream.on('finish', function () {
							swal.close();
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
					}
				});
			}
			$scope.dibujarCabeceraPDFcomprasMensuales = function (doc, reporte, pagina) {
				doc.font('Helvetica-Bold', 12);
				doc.text("REPORTE DE COMPRAS", 0, 25, { align: "center" });
				doc.font('Helvetica', 8);
				doc.text("Desde  " + reporte.fechaInicioTexto, -70, 40, { align: "center" });
				doc.text("Hasta " + reporte.fechaFinTexto, 70, 40, { align: "center" });
				doc.text("FOLIO " + pagina, 550, 25);
				doc.rect(40, 60, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 75);
				doc.text("NIT : ", 440, 75);
				doc.font('Helvetica', 8);
				doc.text($scope.usuario.empresa.razon_social, 195, 75);
				doc.text($scope.usuario.empresa.nit, 460, 75);
				doc.rect(40, 100, 540, 40).stroke();
				doc.font('Helvetica-Bold', 8);
				//doc.text("Nº",45,110);
				doc.text("Fecha", 45, 110, { width: 40 });
				doc.text("Nº De Nota", 80, 110);
				doc.text("Proveedor", 135, 110);
				doc.text("Producto", 225, 110);
				doc.text("Unidad", 300, 110);
				doc.text("Fecha Venc", 345, 110);
				doc.text("Lote", 405, 110, { width: 35 });
				doc.text("Descuento", 440, 110);

				doc.text("Recargo", 490, 110);
				doc.text("Total", 535, 110);
				doc.font('Helvetica', 8);
			}

			/*$scope.dibujarCabeceraPDFcomprasMensuales=function(doc,datos,reporte,pagina){
				doc.font('Helvetica-Bold',12);
				doc.text("REPORTE DE COMPRAS",0,25,{align:"center"});
				doc.font('Helvetica-Bold',8);
				doc.text("Desde  "+reporte.fechaInicioTexto,-70,40,{align:"center"});
				doc.text("Hasta "+reporte.fechaFinTexto,70,40,{align:"center"});
				doc.text("FOLIO "+pagina,720,25);
				doc.rect(40,60,720,40).stroke();		
				doc.text("NOMBRE O RAZÓN SOCIAL : ",65,75);
				doc.text("NIT : ",440,75);
				doc.font('Helvetica',8);		
				doc.text(datos.empresa.razon_social,195,75);
				doc.text(datos.empresa.nit,460,75);		
				doc.rect(40,100,720,60).stroke();
				doc.font('Helvetica-Bold',8);
				//doc.text("Nº",45,110);
				doc.text("Fecha",50,110,{width:40});
				doc.text("Nº De Nota",105,110,);
				doc.text("Proveedor",190,110,);
				doc.text("Producto",265,110,);
				doc.text("Unidad",325,110,);
				doc.text("Fecha Vencimiento",385,110);
				doc.text("Lote",495,110,{width:35});
				doc.text("Descuento",555,110,);
				doc.text("Recargo",655,110);
				doc.text("Total",720,110);		
			}
			*/
			$scope.inicio();


		}])

	.controller('ControladorRrhh', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'HistorialEmpresaEmpleadosAusencias', 'Paginator', 'ClasesTipoEmpresa', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
			HistorialEmpresaEmpleadosAusencias, Paginator, ClasesTipoEmpresa) {

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.filtroOtrasAusencias = {};
			$scope.inicio = function () {
				$scope.obtenerHistorialEmpresaOtrasAusencias();
				$scope.ObtenerEstadosAusencias();
				$scope.obtenerTiposOtrasAusencias();


			}

			$scope.obtenerHistorialEmpresaOtrasAusencias = function (filtro) {
				$scope.paginatorAusencia = Paginator();
				$scope.paginatorAusencia.column = "id";
				$scope.paginatorAusencia.direction = "desc";
				$scope.paginatorAusencia.itemsPerPage = 10;
				$scope.paginatorAusencia.callBack = $scope.recuperarDatosAusencias;
				if (filtro) {
					filtro.inicio2 = filtro.inicio ? new Date($scope.convertirFecha(filtro.inicio)) : ""
					filtro.fin2 = filtro.fin ? new Date($scope.convertirFecha(filtro.fin)) : ""
					$scope.filtroOtrasAusencias = filtro;
				} else {
					$scope.filtroOtrasAusencias = { id_empresa: $scope.usuario.id_empresa, inicio: "", fin: "", inicio2: "", fin2: "", tipo_ausencia: "", estado: "" }
				}
				$scope.paginatorAusencia.getSearch("", $scope.filtroOtrasAusencias, null);
                /* if (filtro.tipo_ausencia == null || filtro.tipo_ausencia == undefined) {
                    filtro.tipo_ausencia = 0
                }
                var filtroAusencias = { inicio: 0, fin: 0, tipo_ausencia: filtro.tipo_ausencia }
                if (filtro.inicio) {
                    filtroAusencias.inicio = new Date($scope.convertirFecha(filtro.inicio))
                    filtroAusencias.fin = new Date($scope.convertirFecha(filtro.fin))
                }
                 */
			}


			$scope.obtenerTiposOtrasAusencias = function () {
				$scope.tiposOtrasAusencias = []
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RRHH_OTRAUS", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.tiposOtrasAusencias = entidad
					blockUI.stop();
				});
			}

			$scope.ObtenerEstadosAusencias = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RRHH_EDA", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.estadosDeAusencias = entidad
					// console.log(entidad)
					blockUI.stop();
				});
			}

			$scope.recuperarDatosAusencias = function () {
				var promesa = HistorialEmpresaEmpleadosAusencias($scope.paginatorAusencia, 'RRHH_OTRAUS')
				promesa.then(function (datos) {
					$scope.TotalHoras = "00:00"
					$scope.paginatorAusencia.setPages(datos.paginas);
					$scope.historialEmpresaOtrasAusencias = datos.ausencias
					$scope.historialEmpresaOtrasAusencias.forEach(function (x) {
						var now = moment(x.fecha_inicio); //todays date
						var end = moment(x.fecha_fin); // another date
						var duration = moment.duration(end.diff(now));
						x.hours = moment(moment.duration(end.diff(now))._data).format("HH:mm");
						$scope.TotalHoras = $scope.sumarTotalHorasAu(x.hours)

					})
				})
			}
			$scope.sumarTotalHorasAu = function (hours) {
				var totalHoras = "";
				var timeHoras = $scope.TotalHoras.split(':')[0];
				var timeMinutos = $scope.TotalHoras.split(':')[1];
				var horas = hours.split(':')[0];
				var minutos = hours.split(':')[1];
				timeHoras = parseInt(timeHoras) + parseInt(horas);
				timeMinutos = parseInt(timeMinutos) + parseInt(minutos);
				if (timeMinutos >= 60) {
					timeMinutos = timeMinutos - 60;
					timeHoras = timeHoras + 1;
				}
				totalHoras = String("0" + timeHoras).slice(-2) + ':' + String("0" + timeMinutos).slice(-2) + ":00";

				return totalHoras;
			}

			$scope.generarPDFAusencias = function (ausencias) {
				// console.log(ausencias)
				var doc = new PDFDocument({ compress: false, margin: 10 });
				var stream = doc.pipe(blobStream());

				var y = 115, itemsPorPagina = 28, items = 0, pagina = 1, totalPaginas = Math.ceil(ausencias.length / itemsPorPagina);;
				$scope.dibujarCabeceraPDFAusencias(doc, ausencias, pagina, totalPaginas);
				var index = 0;
				for (var i = 0; i < ausencias.length && items <= itemsPorPagina; i++) {

					doc.font("Helvetica", 7);
					index = index + 1;
					doc.text(index, 40, y);
					doc.text(capitalize(ausencias[i].ficha.empleado.persona.nombre_completo.toLowerCase()), 55, y, { width: 100 });
					var desde = $scope.fechaATexto(ausencias[i].fecha_inicio);
					var ini = new Date(ausencias[i].fecha_inicio)
					doc.text(desde + " - ", 170, y, { width: 50 });
					doc.text(ini.getHours() + ":" + ini.getMinutes(), 160, y + 7, { width: 50, align: 'center' });
					var hasta = $scope.fechaATexto(ausencias[i].fecha_fin);
					var fin = new Date(ausencias[i].fecha_fin)
					doc.text(hasta + "", 210, y, { width: 50 });
					doc.text(fin.getHours() + ":" + fin.getMinutes(), 200, y + 7, { width: 50, align: 'center' });
					var dias = ausencias[i].dias ? ausencias[i].dias : "";
					//doc.text(dias, 260, y);
					doc.text(ausencias[i].estado.nombre, 285, y);
					doc.text(capitalize(ausencias[i].tipoAusencia.nombre.toLowerCase()), 342, y, { width: 100 });
					doc.text(capitalize(ausencias[i].observacion.toLowerCase()), 450, y);

					y = y + 20;
					items++;

					if (items == itemsPorPagina) {

						doc.addPage({ margin: 0, bufferPages: true });
						y = 185;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFAusencias(doc, ausencias, pagina, totalPaginas);

					}
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
			}

			$scope.dibujarCabeceraPDFAusencias = function (doc, ausencias, pagina, totalPaginas) {

				doc.font("Helvetica-Bold", 14);
				doc.text("REPORTE SALIDAS", 0, 50, { align: 'center' })
				doc.font("Helvetica-Bold", 8);
				doc.text("N°", 40, 100);
				doc.text("Nombre", 55, 100);
				doc.text("Desde", 175, 100);
				doc.text("Hasta", 215, 100);
				doc.text("Estado", 290, 100);
				doc.text("Concepto", 340, 100);
				doc.text("Detalle", 450, 100);

				doc.text("Pagina " + pagina + " de " + totalPaginas, 0, 740, { align: 'center' });
				doc.font("Helvetica-Bold", 7);
				var usuario = $scope.usuario.persona.nombre_completo;
				var fecha = new Date();

				doc.text("Usuario: " + usuario + " - " + $scope.fechaATexto(fecha), 400, 750);

			}
			$scope.generarPdfSalidaPersonal = function (ausencia) {
				convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
					var doc = new PDFDocument({ size: [612, 792], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
					var stream = doc.pipe(blobStream());
					$scope.dibujarCabeceraImpresionPDFSalidaPersona(doc, ausencia, imagenEmpresa)
					doc.font("Helvetica", 8);
					doc.text(ausencia.ficha.empleado.persona.nombre_completo, 80, 80, { align: "left" });
					doc.text(ausencia.ficha.empleado.persona.ci, 45, 100, { align: "left" });
					doc.text($scope.fechaATexto(new Date(ausencia.fecha_inicio)), 65, 120, { align: "left" });
					doc.text($scope.fechaATiempo(new Date(ausencia.fecha_inicio)), 220, 120, { align: "left" });
					doc.text($scope.fechaATiempo(new Date(ausencia.fecha_fin)), 365, 120, { align: "left" });
					doc.text(ausencia.observacion, 475, 120, { align: "left" });
					doc.text(ausencia.tipoAusencia.nombre, 90, 140, { align: "left" });
					doc.text(ausencia.vehiculo ? ausencia.vehiculo.nombre : "Sin vehiculo", 90, 160, { align: "left" });
					doc.text(ausencia.autorizador ? ausencia.autorizador.persona.nombre_completo : "", 110, 180, { align: "left" });
					doc.end();
					stream.on('finish', function () {
						var fileURL = stream.toBlobURL('application/pdf');
						window.open(fileURL, '_blank', 'location=no');
					});
				});
			}
			$scope.dibujarCabeceraImpresionPDFSalidaPersona = function (doc, ausencia, imagenEmpresa) {
				doc.image(imagenEmpresa, 20, 10, { fit: [80, 80] });
				doc.font("Helvetica-Bold", 16);
				doc.text("SALIDA DEL PERSONAL", 0, 30, { align: "center" });
				doc.text(ausencia.estado.nombre, 0, 50, { align: "center" });
				doc.font("Helvetica-Bold", 8);
				doc.text("NOMBRE.:", 20, 80, { align: "left" });
				doc.text("CI.:", 20, 100, { align: "left" });
				doc.text("FECHA.:", 20, 120, { align: "left" });
				doc.text("SALIDA.:", 170, 120, { align: "left" });
				doc.text("LLEGADA.:", 300, 120, { align: "left" });
				doc.text("OBS.:", 440, 120, { align: "left" });
				doc.text("CONCEPTO.:", 20, 140, { align: "left" });
				doc.text("VEHICULO.:", 20, 160, { align: "left" });
				doc.text("AUTORIZADOR.:", 20, 180, { align: "left" });
				doc.font("Helvetica", 7);
				doc.text("Usuario.:" + $scope.usuario.persona.nombre_completo, 0, 200, { align: "right" });
				doc.text("Impresión.:" + $scope.fechaATexto(new Date()) + " Hrs. " + $scope.fechaATiempo(new Date()), 0, 210, { align: "right" });
			}

			$scope.fechaATiempo = function (fecha) {
				var hours = fecha.getHours();
				var minutes = fecha.getMinutes();
				var seconds = fecha.getSeconds();
				hours = hours < 10 ? '0' + hours : hours;
				minutes = minutes < 10 ? '0' + minutes : minutes;
				//Anteponiendo un 0 a los segundos si son menos de 10
				seconds = seconds < 10 ? '0' + seconds : seconds;
				return hours + ":" + minutes + ":" + seconds;  // 2:41:30
			}

			$scope.generarExcelAusencias = function (ausencias) {
				var data = [["N°", "NOMBRE", "DESDE", "HORA", "HASTA", "HORA", "HORAS",
					"CONCEPTO", "DETALLE", "ESTADO", "DEDUCIBLES", 'AUTORIZADOR']]

				for (var i = 0; i < ausencias.length; i++) {
					var columns = [];
					columns.push((i + 1));
					columns.push(ausencias[i].ficha.empleado.persona.nombre_completo)
					var desde = $scope.fechaATexto(ausencias[i].fecha_inicio);
					var ini = new Date(ausencias[i].fecha_inicio)
					columns.push(desde);
					columns.push(ini.getHours() + ":" + ini.getMinutes());
					var hasta = $scope.fechaATexto(ausencias[i].fecha_fin);
					var fin = new Date(ausencias[i].fecha_fin)
					columns.push(hasta);
					columns.push(fin.getHours() + ":" + fin.getMinutes());
					columns.push(ausencias[i].hours);
                    /*  var dias = ausencias[i].dias ? ausencias[i].dias : "";
                     columns.push(dias); */
					columns.push(ausencias[i].tipoAusencia.nombre);
					columns.push(ausencias[i].observacion);
					columns.push(ausencias[i].estado.nombre);
					columns.push(ausencias[i].autorizador != null ? ausencias[i].autorizador.persona.nombre_completo : "");
					columns.push();
					data.push(columns);
				}

				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE DE AUSENCIAS.xlsx");
			}




			$scope.inicio();


		}])
