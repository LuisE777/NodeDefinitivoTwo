angular.module('agil.controladores')

	.controller('ControladorProveedores', ['$scope', '$window', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'Proveedor', 'Proveedores', 'Empresas',
		'ProveedoresEmpresa', 'ProveedoresPaginador', 'EliminarProveedor', 'GuardarAnticipoProveedor', 'ListaProvCodigo', 'SweetAlert', 'ListaProvNit', '$timeout', 'Paginator', 'ObtenerDatosTablaCalProv', 'GuardarRegistroEvaluacionProveedor',
		'ObtenerRegistroEvaluacionProveedor', 'ObtenerConfiguracionIsoEmpresa', 'ObtenerDatosTablaCalProvGral', 'GuardarRegistroEvaluacionProvGral', 'ObtenerRegistroEvaluacionProvGral','buscarBancoASFI','GuardarNroCuentas','buscarListaNroCuentas','eliminarNroCuentas','guardarCheckSeleccionado', function ($scope, $window, $localStorage, $location, $templateCache, $route, blockUI, Proveedor, Proveedores, Empresas,
			ProveedoresEmpresa, ProveedoresPaginador, EliminarProveedor, GuardarAnticipoProveedor, ListaProvCodigo, SweetAlert, ListaProvNit, $timeout, Paginator, ObtenerDatosTablaCalProv, GuardarRegistroEvaluacionProveedor,
			ObtenerRegistroEvaluacionProveedor, ObtenerConfiguracionIsoEmpresa, ObtenerDatosTablaCalProvGral, GuardarRegistroEvaluacionProvGral, ObtenerRegistroEvaluacionProvGral,buscarBancoASFI, GuardarNroCuentas,buscarListaNroCuentas, eliminarNroCuentas,guardarCheckSeleccionado) {
			blockUI.start();

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.IdModalNuevoAnticipo = 'modal-anticipo-proveedor';
			$scope.IdModalCalificacionProvDocIso = 'modal-calificacion-proveedor';
			$scope.IdModalCalificacionesProveedores = 'modal-calificaciones-proveedor';

			$scope.inicio = function () {
				$scope.encendido = true;
				$scope.obtenerEmpresas();
				$scope.obtenerProveedores();
				$scope.buscarTodosProveedores();
				/*setTimeout(function() {
					ejecutarScriptsTabla('tabla-proveedores',10);
				},2000);*/
			}

			$scope.$on('$viewContentLoaded', function () {
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsProveedor('modal-wizard-proveedor', 'modal-wizard-proveedor-vista', 'dialog-eliminar-proveedor', 'modal-wizard-container-proveedor-edicion', 'modal-wizard-container-proveedor-vista', $scope.IdModalNuevoAnticipo, $scope.IdModalCalificacionProvDocIso, $scope.IdModalCalificacionesProveedores);
				$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
				blockUI.stop();
			});

			$scope.crearNuevoProveedor = function () {
				$scope.encendido = false;
				var usuario = JSON.parse($localStorage.usuario);
				$scope.proveedor = new Proveedor({ id_empresa: usuario.id_empresa });
				$scope.obtenerBancosAsfi()
				$scope.abrirPopup('modal-wizard-proveedor');
			}

			$scope.verProveedor = function (proveedor) {
				$scope.proveedor = proveedor;
				proveedor.fecha1 = new Date(proveedor.fecha1);
				proveedor.fecha2 = new Date(proveedor.fecha2);
				$scope.proveedor.fechatexto1 = proveedor.fecha1.getDate() + "/" + (proveedor.fecha1.getMonth() + 1) + "/" + proveedor.fecha1.getFullYear();
				$scope.proveedor.fechatexto2 = proveedor.fecha2.getDate() + "/" + (proveedor.fecha2.getMonth() + 1) + "/" + proveedor.fecha2.getFullYear();
				$scope.abrirPopup('modal-wizard-proveedor-vista');
			}

			$scope.cerrarPopPupVista = function () {
				$scope.cerrarPopup('modal-wizard-proveedor-vista');
			}

			$scope.cerrarPopPupNuevoProveedor = function () {
				$scope.cerrarPopup('modal-wizard-proveedor');
			}

			$scope.modificarProveedor = function (proveedor) {
				$scope.proveedor = proveedor;
				if (proveedor.fecha1) {
					proveedor.fecha1 = new Date(proveedor.fecha1);
					$scope.proveedor.fechatexto1 = proveedor.fecha1.getDate() + "/" + (proveedor.fecha1.getMonth() + 1) + "/" + proveedor.fecha1.getFullYear();
				}
				if (proveedor.fecha2) {
					proveedor.fecha2 = new Date(proveedor.fecha2);
					$scope.proveedor.fechatexto2 = proveedor.fecha2.getDate() + "/" + (proveedor.fecha2.getMonth() + 1) + "/" + proveedor.fecha2.getFullYear();
				}
				$scope.obtenerBancosAsfi()
				$scope.obtenerListaNroCuentas(proveedor)
				$scope.abrirPopup('modal-wizard-proveedor');
			}

			$scope.mostrarConfirmacionEliminacion = function (proveedor) {
				$scope.proveedor = new Proveedor(proveedor);
				$scope.abrirPopup("dialog-eliminar-proveedor");
			}

			$scope.cerrarConfirmacionEliminacion = function () {
				$scope.cerrarPopup('dialog-eliminar-proveedor');
			};

			$scope.eliminarProveedor = function (proveedor) {
				blockUI.start();
				$scope.cerrarConfirmacionEliminacion();
				/* proveedor.$delete(); */
				var promesa = EliminarProveedor(proveedor.id)
				promesa.then(function (dato) {
					$scope.mostrarMensaje(dato.mensaje);
				})

				$scope.recargarItemsTabla();
				blockUI.stop();
			}

			$scope.saveForm = function (proveedor) {
				var button = $('#modal-wizard-proveedor').find('button[type=submit]').text().trim();
				if (button != "Siguiente") {
					blockUI.start();
					var f = document.getElementById('doc-nit').files[0]
					var f1 = document.getElementById('doc-funda').files[0]
					var f2 = document.getElementById('doc-licencia').files[0]
					var f3 = document.getElementById('doc-ci').files[0]
					var f4 = document.getElementById('doc-seguro-social').files[0]
					var documentos = [f, f1, f2, f3, f4]
					var documentosFinal = []
					documentos.forEach(function (documento2, index, array) {
						if (documento2) {
							documentosFinal.push(documento2)
						}
						if (index == array.length - 1) {
							if (documentosFinal.length > 0) {
								documentosFinal.forEach(function (documento, index, array) {
									r = new FileReader();
									if (documento) {
										r.onloadend = function (e) {
											documento.nombre = documento.name
											documento.data = e.target.result
											//send your binary data via $http or $resource or do anything else with it
											if (index === array.length - 1) {
												proveedor.fecha1 = null;
												if (proveedor.fechatexto1) {
													proveedor.fecha1 = new Date($scope.convertirFecha(proveedor.fechatexto1));
												}
												proveedor.fecha2 = null;
												if (proveedor.fechatexto2) {
													proveedor.fecha2 = new Date($scope.convertirFecha(proveedor.fechatexto2));
												}
												if (proveedor.id) {
													Proveedor.update({ idProveedor: proveedor.id }, proveedor, function (res) {
														blockUI.stop();
														$scope.cerrarPopPupNuevoProveedor();
														$scope.mostrarMensaje('Actualizado Exitosamente!');
														$scope.recargarItemsTabla();
													});
												} else {
													proveedor.$save(function (proveedor) {
														blockUI.stop();
														$scope.proveedor = new Proveedor({});
														$scope.cerrarPopPupNuevoProveedor();
														$scope.mostrarMensaje('Guardado Exitosamente!');
														$scope.recargarItemsTabla();
													}, function (error) {
														blockUI.stop();
														$scope.cerrarPopPupNuevoProveedor();
														$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
														$scope.recargarItemsTabla();
													});
												}
											}
										}
										r.readAsBinaryString(documento);
									} else {
										if (index === array.length - 1) {
											proveedor.fecha1 = null;
											if (proveedor.fechatexto1) {
												proveedor.fecha1 = new Date($scope.convertirFecha(proveedor.fechatexto1));
											}
											proveedor.fecha2 = null;
											if (proveedor.fechatexto2) {
												proveedor.fecha2 = new Date($scope.convertirFecha(proveedor.fechatexto2));
											}
											if (proveedor.id) {
												Proveedor.update({ idProveedor: proveedor.id }, proveedor, function (res) {
													blockUI.stop();
													$scope.cerrarPopPupNuevoProveedor();
													$scope.mostrarMensaje('Actualizado Exitosamente!');
													$scope.recargarItemsTabla();
												});
											} else {
												proveedor.$save(function (proveedor) {
													blockUI.stop();
													$scope.proveedor = new Proveedor({});
													$scope.cerrarPopPupNuevoProveedor();
													$scope.mostrarMensaje('Guardado Exitosamente!');
													$scope.recargarItemsTabla();
												}, function (error) {
													blockUI.stop();
													$scope.cerrarPopPupNuevoProveedor();
													$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
													$scope.recargarItemsTabla();
												});
											}
										}
									}

								})
							} else {
								proveedor.fecha1 = null;
								if (proveedor.fechatexto1) {
									proveedor.fecha1 = new Date($scope.convertirFecha(proveedor.fechatexto1));
								}
								proveedor.fecha2 = null;
								if (proveedor.fechatexto2) {
									proveedor.fecha2 = new Date($scope.convertirFecha(proveedor.fechatexto2));
								}
								if (proveedor.id) {
									Proveedor.update({ idProveedor: proveedor.id }, proveedor, function (res) {
										blockUI.stop();
										$scope.cerrarPopPupNuevoProveedor();
										$scope.mostrarMensaje('Actualizado Exitosamente!');
										$scope.recargarItemsTabla();
									});
								} else {
									proveedor.$save(function (proveedor) {
										blockUI.stop();
										$scope.proveedor = new Proveedor({});
										$scope.cerrarPopPupNuevoProveedor();
										$scope.mostrarMensaje('Guardado Exitosamente!');
										$scope.recargarItemsTabla();
									}, function (error) {
										blockUI.stop();
										$scope.cerrarPopPupNuevoProveedor();
										$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
										$scope.recargarItemsTabla();
									});
								}
							}
						}

					})
				}
			}
			$scope.codigoExistenteProv = function (query) {
				if (query != "" && query != undefined) {
					blockUI.noOpen = true;
					var promesa = ListaProvCodigo($scope.usuario.id_empresa, query);
					var datosCliente = promesa.then(function (datos) {
						if (datos.length > 0) {
							if (query.id) {
								for (let index = 0; index < datos.length; index++) {
									const idExist = datos[index];
									if (query.id == idExist.id) {
										$scope.proveedor.codigo
									} else {
										SweetAlert.swal({
											title: "Desea Continuar??",
											text: "“El Código " + $scope.proveedor.codigo + ", con razón social '" + datos[0].razon_social + "', ya se encuentra registrado, si continua duplicará el registro de CÓDIGO !!!",
											icon: 'warning',
											showCancelButton: true,
											confirmButtonColor: '#3085d6',
											cancelButtonColor: '#d33',
											confirmButtonText: 'Si',
											cancelButtonText: "No"
										}).then(function (result) {
											if (!result.value) {
												$scope.proveedor.codigo = "";
											}
										});
									}
								}
							} else {
								SweetAlert.swal({
									title: "Desea Continuar??",
									text: "“El Código " + $scope.proveedor.codigo + ", con razón social '" + datos[0].razon_social + "', ya se encuentra registrado, si continua SOLO MODIFICARÁ EL REGISTO YA ESXISTENTE CON ESTE CÓDIGO !!!",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (!result.value) {
										$scope.proveedor.codigo = "";
									}
								});
							}
						}
					})
				}
			}

			$scope.nitExistenteProv = function (query) {
				if (query != "" && query != undefined) {
					blockUI.noOpen = true;
					var promesa = ListaProvNit($scope.usuario.id_empresa, query);
					var datosCliente = promesa.then(function (datos) {
						if (datos.length > 0) {
							if (query.id) {
								for (let index = 0; index < datos.length; index++) {
									const idExist = datos[index];
									if (query.id == idExist.id) {
										$scope.proveedor.nit
									} else {
										SweetAlert.swal({
											title: "Desea Continuar??",
											text: "“El Código " + $scope.proveedor.nit + ", con razón social '" + datos[0].razon_social + "', ya se encuentra registrado, si continua duplicará el registro de CÓDIGO !!!",
											icon: 'warning',
											showCancelButton: true,
											confirmButtonColor: '#3085d6',
											cancelButtonColor: '#d33',
											confirmButtonText: 'Si',
											cancelButtonText: "No"
										}).then(function (result) {
											if (!result.value) {
												$scope.proveedor.codigo = "";
											}
										});
									}
								}
							} else {
								SweetAlert.swal({
									title: "Desea Continuar??",
									text: "“El NIT " + $scope.proveedor.nit + ", con razón social '" + datos[0].razon_social + "', ya se encuentra registrado, si continua SOLO MODIFICARÁ EL REGISTO YA ESXISTENTE CON ESTE NIT !!!",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Si',
									cancelButtonText: "No"
								}).then(function (result) {
									if (!result.value) {
										$scope.proveedor.nit = "";
									}
								});
							}
						}
					})
				}
			}

			$scope.obtenerEmpresas = function () {
				blockUI.start();
				var promesa = Empresas();
				promesa.then(function (empresas) {
					$scope.empresas = empresas;
					blockUI.stop();
				});
			}

			$scope.obtenerProveedores = function () {
				$scope.abs = $window.Math.abs;
				$scope.itemsPorPagina = 10;
				$scope.buscarProveedores(1, $scope.itemsPorPagina, "");
			}

			$scope.verificarPulso = function (evento, textoBusqueda) {
				if (evento.keyCode === 13) { //enter pressed
					$scope.buscarProveedores(1, $scope.itemsPorPagina, textoBusqueda);
				}
			}

			$scope.buscarProveedores = function (pagina, itemsPagina, texto) {
				blockUI.start();
				$scope.itemsPorPagina = itemsPagina;
				if (texto == "" || texto == null) {
					texto = 0;
				} else {
					$scope.textoBusqueda = texto;
				}
				$scope.paginaActual = pagina;
				var promesa = ProveedoresPaginador($scope.usuario.id_empresa, pagina, itemsPagina, texto);
				promesa.then(function (dato) {
					$scope.paginas = [];
					for (var i = 1; i <= dato.paginas; i++) {
						$scope.paginas.push(i);
					}
					$scope.proveedores = dato.proveedores;
					blockUI.stop();
				});
			}

			$scope.buscarTodosProveedores = function () {
				var promesa = Proveedores($scope.usuario.id_empresa);
				promesa.then(function (dato) {
					$scope.TodoProveedores = dato;
				})
				blockUI.stop();
			}

			$scope.reporteExcel = function () {
				//console.log("Reporte Excel "+ $scope.proveedores);

				//var proveedores = $scope.proveedores;
				var todosProveedores = $scope.TodoProveedores;
				blockUI.start()

				var cabecera = ["Codigo", "Razón Social", "Nit", "Direccion", "Telefono1", "Telefono2", "Contacto", "Ubicacion Geo.", "Rubro", "Categoria", "Fecha Imp.1", "Fecha Imp.2", "Texto1", "Texto2"];
				var data = [];
				data.push(cabecera);

				for (var i = 0; i < todosProveedores.length; i++) {
					columns = [];
					columns.push(todosProveedores[i].codigo);
					columns.push(todosProveedores[i].razon_social);
					columns.push(todosProveedores[i].nit);
					columns.push(todosProveedores[i].direccion);
					columns.push(todosProveedores[i].telefono1);
					columns.push(todosProveedores[i].telefono2);
					columns.push(todosProveedores[i].contacto);
					if (todosProveedores[i].ubicacion_geografica) {
						columns.push(todosProveedores[i].ubicacion_geografica);
					} else {
						columns.push(" ")
					}
					columns.push(todosProveedores[i].rubro);

					if (todosProveedores[i].categoria) {
						columns.push(todosProveedores[i].categoria);
					} else {
						columns.push(" ");
					}
					if (todosProveedores[i].fecha1) {
						columns.push(new Date(todosProveedores[i].fecha1));
					} else {
						columns.push(" ")
					}
					if (todosProveedores[i].fecha2) {
						columns.push(new Date(todosProveedores[i].fecha2));
					} else {
						columns.push(" ")
					}
					if (todosProveedores[i].texto1) {
						columns.push(todosProveedores[i].texto1);
					} else {
						columns.push(" ")
					}
					if (todosProveedores[i].texto2) {
						columns.push(todosProveedores[i].texto2);
					} else {
						columns.push(" ")
					}
					data.push(columns);
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-PROVEEDORES.xlsx");
				blockUI.stop();
			}

			$scope.dibujarCabeceraPDFProveedores = function (doc, pagina, totalPaginas, cliente) {
				var date = new Date().toLocaleDateString();
				doc.fontSize(23).text("REPORTE DE PROVEEDORES", 0, 80, { align: "center" });
				doc.rect(133, 100, 335, 0).stroke();
				doc.font('Helvetica-Bold', 10);
				doc.text("Fecha: ", 30, 140);
				doc.font('Helvetica', 10).text(date, 63, 140);
				doc.font('Helvetica-Bold', 10).text('N°', 30, 160);
				doc.font('Helvetica-Bold', 10).text('Código', 52, 160);
				doc.font('Helvetica-Bold', 10).text('Razón Social', 100, 160);
				doc.font('Helvetica-Bold', 10).text('Nit', 230, 160);
				doc.font('Helvetica-Bold', 10).text('Direccion', 300, 160);
				doc.font('Helvetica-Bold', 10).text('Telefono', 390, 160);
				doc.font('Helvetica-Bold', 10).text('Rubro', 470, 160);
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
			}
			$scope.reportePdf = function () {
				var todosProveedores = /*$scope.proveedores;*/$scope.TodoProveedores;
				blockUI.start();
				//console.log($scope.usuario.empresa)

				var doc = new PDFDocument({ size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;

				var y = 200, itemsPorPagina = 15, items = 0, pagina = 1, totalPaginas = Math.ceil(todosProveedores.length / itemsPorPagina);
				$scope.dibujarCabeceraPDFProveedores(doc, 1, totalPaginas, todosProveedores);
				doc.font('Helvetica', 8);
				var tam = todosProveedores.length - 1;
				for (var i = 0; i < tam && items <= itemsPorPagina; i++) {
					var indice = i + 1;
					doc.font('Helvetica', 9).text(indice, 30, y);
					if (todosProveedores[i].codigo) {
						doc.font('Helvetica', 9).text(todosProveedores[i].codigo, 52, y);
					} else {
						doc.font('Helvetica', 9).text("null", 52, y);
					}
					if (todosProveedores[i].razon_social) {
						doc.font('Helvetica', 9).text(todosProveedores[i].razon_social, 100, y, { width: 130 });
					} else {
						doc.font('Helvetica', 9).text("null", 100, y);
					}

					if (todosProveedores[i].nit) {
						doc.font('Helvetica', 9).text(todosProveedores[i].nit, 230, y);
					} else {
						doc.font('Helvetica', 9).text("null", 230, y);
					}

					if (todosProveedores[i].direccion) {
						doc.font('Helvetica', 9).text(todosProveedores[i].direccion, 300, y, { width: 80 });
						console.log(todosProveedores[i].direccion.length);
					} else {
						doc.font('Helvetica', 9).text("null", 300, y);
					}

					if (todosProveedores[i].telefono1) {
						doc.font('Helvetica', 9).text(todosProveedores[i].telefono1, 390, y);
					} else {
						doc.font('Helvetica', 9).text("null", 390, y);
					}

					if (todosProveedores[i].rubro) {
						doc.font('Helvetica', 9).text(todosProveedores[i].rubro, 470, y);
					} else {
						doc.font('Helvetica', 9).text("null", 470, y);
					}

					y = y + 33;

					items++;
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 200;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFProveedores(doc, pagina, totalPaginas, todosProveedores);
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

			$scope.subirExcelProveedores = function (event) {
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
						var proveedores = [];
						do {
							var proveedor = {};
							proveedor.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
							proveedor.razon_social = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
							proveedor.nit = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
							proveedor.direccion = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
							proveedor.telefono1 = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
							proveedor.telefono2 = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
							proveedor.email = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
							proveedor.contacto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
							proveedor.ubicacion_geografica = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
							proveedor.rubro = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
							proveedor.categoria = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
							proveedor.fecha1 = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? new Date($scope.convertirFecha(worksheet['L' + row].v.toString())) : null;
							proveedor.fecha2 = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? new Date($scope.convertirFecha(worksheet['M' + row].v.toString())) : null;
							proveedor.texto1 = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
							proveedor.texto2 = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? worksheet['O' + row].v.toString() : null;
							proveedores.push(proveedor);
							row++;
							i++;
						} while (worksheet['A' + row] != undefined);
						$scope.guardarProveedores(proveedores);
						blockUI.stop();
					};
					reader.readAsBinaryString(f);
				}
			}

			$scope.guardarProveedores = function (proveedores) {
				var proveedoresEmpresa = new ProveedoresEmpresa({ proveedores: proveedores, id_empresa: $scope.usuario.id_empresa });
				proveedoresEmpresa.$save(function (proveedor) {
					blockUI.stop();
					$scope.mostrarMensaje('Guardado Exitosamente!');
					$scope.recargarItemsTabla();
				}, function (error) {
					blockUI.stop();
					$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
					$scope.recargarItemsTabla();
				});
			}
			$scope.abrirModalCalificacionProvDocIso = function (proveedor) {
				$scope.proveedor = proveedor
				let filtroCal = { inicio: '', fin: '', id_proveedor: proveedor.id }
				$scope.obtenerCalificacionesProv(filtroCal)
				$scope.abrirPopup($scope.IdModalCalificacionProvDocIso);
			}
			$scope.cerrarModalCalificacionProvDocIso = function () {
				$scope.cerrarPopup($scope.IdModalCalificacionProvDocIso);
			}
			$scope.obtenerCalificacionesProv = function (filtro) {
				$scope.filtroCal = filtro;
				$scope.paginatorCalProv = Paginator();
				$scope.paginatorCalProv.column = "id";
				$scope.paginatorCalProv.direction = "desc";
				$scope.paginatorCalProv.itemsPerPage = 10;
				$scope.paginatorCalProv.callBack = $scope.obtenerDatosTablaCalProv;
				$scope.paginatorCalProv.getSearch("", $scope.filtroCal, null);
			}

			$scope.obtenerDatosTablaCalProv = function () {
				blockUI.start();
				var promesa = ObtenerDatosTablaCalProv($scope.paginatorCalProv);
				promesa.then(function (datos) {
					$scope.paginatorCalProv.setPages(datos.paginas);
					$scope.registrosCalProv = datos.registros;
					blockUI.stop();

				});
			}
			$scope.guardarAnticipoProveedor = function (dato) {
				var anticipoProveedor = {
					monto_anticipo: dato.monto,
					monto_salida: 0,
					saldo: dato.monto,
					fecha: new Date(),
					id_sucursal: dato.sucursal.id
				}
				var promesa = GuardarAnticipoProveedor($scope.proveedor.id, anticipoProveedor)
				promesa.then(function (datos) {
					$scope.cerrarModalNuevoAnticipo()
					$scope.imprimirReciboAnticipo(datos.anticipo)
					$scope.mostrarMensaje(datos.mensaje)
				})
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
					(anticipo.sucursal.telefono2 != null ? "-" + anticipo.sucursal.telefono2 : "");
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
			$scope.$on('$routeChangeStart', function (next, current) {
				$scope.eliminarPopup('modal-wizard-proveedor');
				$scope.eliminarPopup('modal-wizard-proveedor-vista');
				$scope.eliminarPopup('dialog-eliminar-proveedor');
				$scope.eliminarPopup($scope.IdModalNuevoAnticipo);
				$scope.eliminarPopup($scope.IdModalCalificacionProvDocIso);
				$scope.eliminarPopup($scope.IdModalCalificacionesProveedores);
			});
			$scope.guardarRegistroEvaluacionProveedor = async function () {
				try {
					let res = await ObtenerConfiguracionIsoEmpresa($scope.usuario.id_empresa, 'EVALPROV')
					if (!res.configuracionIso) {

						return SweetAlert.swal("Alerta!", 'la empresa no cuenta con configuracion ISO para evaluación de proveedor', "warning");
					}
					res = await GuardarRegistroEvaluacionProveedor($scope.filtroCal, new Date(), res.configuracionIso.id, $scope.usuario.id, $scope.convertirFecha)
					if (res.hasErr) {
						return SweetAlert.swal("advertencia!", res.mensaje, "warning");
					}
					SweetAlert.swal("Guardado!", res.mensaje, "success");
					$scope.impRegCalProveedor(res.evaluacion.id)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.impRegCalProveedor = async function (idEval) {
				try {
					let res = await ObtenerConfiguracionIsoEmpresa($scope.usuario.id_empresa, 'EVALPROV')
					let config = res.configuracionIso
					res = await ObtenerRegistroEvaluacionProveedor(idEval)
					$scope.printIsoDoc(res.evaluacion, config)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.printIsoDoc = async function (evaluacion, configuracionIso) {
				try {
					convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
						/* blockUI.start(); */
						var doc = new PDFDocument({ size: "letter", margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
						var y = 212, itemsPorPagina = 45, items = 0, pagina = 1, totalPaginas = Math.ceil((15) / itemsPorPagina);
						$scope.dibujarCabeceraPDFCompraIso(doc, pagina, totalPaginas, evaluacion, imagenEmpresa, configuracionIso);
						var totalIso = 0;

						if (pagina === totalPaginas) {
							doc.font('Bookman-Bold', 9);
							doc.text('--------------------------------------------', 60, 712, { width: 207, align: 'center' })
							doc.text("Firma del Evaluador", 60, 720, { width: 207, align: "center" });
							doc.text('--------------------------------------------', 350, 712, { width: 207, align: 'center' })
							doc.text("Firma del Proveedor", 350, 720, { width: 207, align: "center" });
							doc.font('Bookman-Bold', 8);
							doc.text('´', 291, 745);
							doc.font('Bookman-Bold', 8);
							/* doc.text('Pagina', 284, 745);
							doc.text(pagina + ' de ' + totalPaginas, 317, 745); */
						}
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
						/* 	blockUI.stop(); */
					})
					$scope.$evalAsync()
				} catch (error) {

				}
			}
			$scope.dibujarCabeceraPDFCompraIso = function (doc, pagina, totalPaginas, evaluacion, imagenEmpresa, configuracionIso) {
				doc.font('Bookman-Bold', 11);
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
				doc.font('Bookman-Bold', 11);
				doc.text("Codigo:", 243, 95);
				doc.text(configuracionIso.codigo, 285, 95);
				doc.font('Bookman-Bold', 9);
				doc.text('´', 251, 95);
				doc.font('Bookman', 9);
				doc.text("Revision:", 435, 70);
				doc.text(configuracionIso.revicion, 477, 70);
				doc.text("Fecha de Aprobacion", 435, 90, { width: 132 });
				doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 435, 100, { width: 132 });
				doc.text('´', 463, 70.2);
				doc.text('´', 516, 90.2);

				var y = 130;
				doc.rect(60, y - 4, 507, 75).stroke();
				doc.font('Bookman', 8);
				doc.rect(60, y + 11, 507, 0).stroke();
				doc.text("| Razón Social Proveedor: ", 62, y);
				doc.text(evaluacion.razon_social_proveedor, 170, y, { width: 150 });
				doc.text("Nombre del Evaluador: ", 341, y, { width: 150, align: "left" });
				doc.text(evaluacion.nombre_usuario, 447, y, { width: 150, align: "left" });
				//	if (dato.almacen) doc.text(dato.almacen.nombre ? dato.almacen.nombre.length <= 51 ? dato.almacen.nombre.toUpperCase() : dato.almacen.nombre.slice(0, 50).toUpperCase() + '...' : "", 110, y);
				//	doc.text(dato.numero_iso_compra ? dato.numero_iso_compra : '', 438, y);
				y += 15;
				doc.rect(60, y + 11, 507, 0).stroke();
				doc.text("Dirección: ", 62, y);
				doc.text(evaluacion.direccion, 112, y, { width: 150 });
				doc.text("Cargo: ", 341, y, { width: 90, align: "left" });
				doc.text(evaluacion.cargo, 375, y, { width: 150, align: "left" });
				//	if (dato.observacion) doc.text(dato.observacion.length <= 39 ? dato.observacion.toUpperCase() : dato.observacion.slice(0, 38).toUpperCase() + '...', 120, y);
				//	doc.text(dato.fecha ? $scope.fechaATexto(dato.fecha) : '', 438, y);
				y += 15;
				doc.rect(60, y + 11, 507, 0).stroke();
				doc.text("Telefono: ", 62, y);
				doc.text(evaluacion.telefono, 110, y, { width: 150 });
				doc.text("| Area: ", 341, y, { width: 90, align: "left" });
				doc.text(evaluacion.area, 373, y, { width: 150, align: "left" });
				y += 15;
				doc.rect(60, y + 11, 507, 0).stroke();
				doc.text("| Responsable de venta: ", 62, y);
				doc.text(evaluacion.responsable_venta, 175, y, { width: 150 });
				y += 15;

				doc.text("Productos que suministra: ", 62, y);
				doc.text(evaluacion.productos, 195, y, { width: 150 });
				y += 30;
				doc.text("| Fecha de evaluación: ", 62, y);
				doc.text($scope.fechaATexto(evaluacion.fecha_elaboracion), 167, y, { width: 150 });
				//	doc.text(dato.proveedor ? dato.proveedor.razon_social : '', 120, y, { width: 447 });
				y += 30;
				doc.font('Bookman-Bold', 10);
				//tabla
				doc.rect(60, y, 507, 85).stroke();
				doc.text("Detalle de Evaluación", 150.22, y + 7, { width: 200, align: "center" });
				y += 30;
				doc.rect(60, y - 10, 365, 0).stroke();

				doc.rect(60, y + 25, 507, 0).stroke();
				doc.rect(159.19, y - 10, 0, 65).stroke();
				doc.rect(221.5, y - 10, 0, 65).stroke();
				doc.rect(300.83, y - 10, 0, 65).stroke();
				doc.rect(363.16, y - 10, 0, 65).stroke();
				doc.rect(425.49, y - 30, 0, 85).stroke();
				doc.rect(487.82, y - 30, 0, 85).stroke();
				//Cabecera Detalle
				doc.text("Precio", 65, y + 2, { width: 86, align: "center" });
				/* 	doc.text('´', 85, y + 3);
					doc.text('´', 99.3, y + 15); */
				doc.text("Calidad", 170, y + 2, { width: 40.63, align: 'center' });
				doc.text("Puntualidad y Cumplimiento", 220.22, y - 4, { width: 80.56, align: "center" });
				doc.text("Forma de Entrega", 304, y - 4, { width: 60.63, align: "center" });
				doc.text("Capacidad", 362.41, y + 2, { width: 60.63, align: "center" });
				doc.text("Total", 427.04, y - 5, { width: 55.77, align: "center" });
				doc.text("Tipo de Proveedor", 497, y - 8, { width: 64, align: "center" });
				doc.font('Bookman', 8);
				y += 30;
				let precio = evaluacion.calificaciones.find(x => {
					return x.concepto.nombre_corto == 'PR'
				})
				doc.text(precio.total, 65, y + 7, { width: 86, align: "center" });
				let calidad = evaluacion.calificaciones.find(x => {
					return x.concepto.nombre_corto == 'CLD'
				})
				doc.text(calidad.total, 170, y + 7, { width: 40.63, align: 'center' });
				let puntualidad = evaluacion.calificaciones.find(x => {
					return x.concepto.nombre_corto == 'PT'
				})
				doc.text(puntualidad.total, 220, y + 7, { width: 80.56, align: "center" });
				let formaEntrega = evaluacion.calificaciones.find(x => {
					return x.concepto.nombre_corto == 'FE'
				})
				doc.text(formaEntrega.total, 300, y + 7, { width: 60.63, align: "center" });
				let capacidad = evaluacion.calificaciones.find(x => {
					return x.concepto.nombre_corto == 'CP'
				})
				doc.text(capacidad.total, 360, y + 7, { width: 60.63, align: "center" });

				doc.text(evaluacion.total, 429, y + 7, { width: 55.77, align: "center" });

				doc.text(evaluacion.tipo_proveedor, 496, y + 7, { width: 64, align: "center" });
				y += 100;
				doc.font('Bookman-Bold', 10);
				doc.rect(60, y - 5, 507, 180).stroke();
				doc.text("Criterios de Aceptación", 240, y - 2);
				y += 15;
				doc.font('Bookman', 8);
				doc.rect(60, y - 5, 507, 0).stroke();
				doc.text("Precio", 70, y + 3, { width: 90, align: "left" });
				doc.text("30%", 165, y + 3, { width: 20, align: "left" });
				doc.text("Se dara mayor puntaje al de menor costo   20%.", 200, y + 3, { width: 400, align: "left" });
				doc.text(">", 360, y + 3, { width: 10, align: "center" });
				doc.text("_", 360, y + 3, { width: 10, align: "center" });
				doc.font('Bookman', 8);
				y += 30;
				doc.rect(60, y - 5, 507, 0).stroke();
				doc.text("Calidad", 70, y + 3, { width: 90, align: "left" });
				doc.text("30%", 165, y + 3, { width: 20, align: "left" });
				doc.text("El Producto debe tener buena calidad(Organoléptica y espesificaciones)   20%.", 200, y + 3, { width: 400, align: "left" });
				doc.text(">", 477, y + 3, { width: 10, align: "center" });
				doc.text("_", 477, y + 3, { width: 10, align: "center" });
				y += 30;
				doc.rect(60, y - 5, 507, 0).stroke();
				doc.text("Puntualidad y cumplimiento", 70, y + 3, { width: 90, align: "left" });
				doc.text("15%", 165, y + 3, { width: 20, align: "left" });
				doc.text("| Puntualidad y cumplimiento de entrega   10%.", 200, y + 3, { width: 400, align: "left" });
				doc.text(">", 362, y + 3, { width: 10, align: "center" });
				doc.text("_", 362, y + 3, { width: 10, align: "center" });
				y += 30;
				doc.rect(60, y - 5, 507, 0).stroke();
				doc.text("Forma de entrega del producto ", 70, y, { width: 90, align: "left" });
				doc.text("15%", 165, y + 3, { width: 20, align: "left" });
				doc.text("Si el proveedor realiza la entrega del producto en almacen central   10%.", 200, y + 3, { width: 400, align: "left" });
				doc.text(">", 455, y + 3, { width: 10, align: "center" });
				doc.text("_", 455, y + 3, { width: 10, align: "center" });
				y += 30;
				doc.rect(60, y - 5, 507, 0).stroke();
				doc.text("| Capacidad de atención | y disponibilidad", 70, y, { width: 90, align: "left" });
				doc.text("10%", 165, y + 3, { width: 20, align: "left" });
				doc.text("Si cuenta con la disponibilidad en cuanto a cantidad y atención al cliente   5%.", 200, y + 3, { width: 400, align: "left" });
				doc.text(">", 487, y + 3, { width: 10, align: "center" });
				doc.text("_", 487, y + 3, { width: 10, align: "center" });
				y += 60;
				doc.font('Bookman-Bold', 10);
				doc.rect(60, y - 5, 507, 90).stroke();
				doc.text("OBSERVACIONES", 70, y, { width: 120, align: "left" });
				y += 35;
				doc.rect(60, y, 507, 0).stroke();
				y += 17;
				doc.rect(60, y, 507, 0).stroke();
				y += 17;
				doc.rect(60, y, 507, 0).stroke();
				/* 	if (pagina != totalPaginas) {
						doc.font('Bookman-Bold', 8);
						doc.text('´', 291, 745);
						doc.font('Bookman-Bold', 8);
						doc.text('Pagina', 284, 745);
						doc.text(pagina + ' de ' + totalPaginas, 317, 745);
					} */
			};
			$scope.abrirModalCalificacionesProveedores = function () {
				let filtroCalProv = { inicio: '', fin: '', tipoProveedor: '0', id_empresa: $scope.usuario.id_empresa }
				$scope.obtenerCalificacionesProvGeneral(filtroCalProv)
				$scope.abrirPopup($scope.IdModalCalificacionesProveedores);
			}
			$scope.cerrarModalCalificacionesProveedores = function () {
				$scope.cerrarPopup($scope.IdModalCalificacionesProveedores);
			}
			$scope.obtenerCalificacionesProvGeneral = function (filtro) {
				$scope.filtroCalProv = filtro;
				$scope.paginatorCalProv = Paginator();
				$scope.paginatorCalProv.column = "id";
				$scope.paginatorCalProv.direction = "desc";
				$scope.paginatorCalProv.itemsPerPage = 10;
				$scope.paginatorCalProv.callBack = $scope.obtenerDatosTablaCalProvGral;
				$scope.paginatorCalProv.getSearch("", $scope.filtroCalProv, null);
			}

			$scope.obtenerDatosTablaCalProvGral = function () {
				blockUI.start();
				var promesa = ObtenerDatosTablaCalProvGral($scope.paginatorCalProv);
				promesa.then(function (datos) {
					$scope.paginatorCalProv.setPages(datos.paginas);
					$scope.registrosCalProvGral = datos.registros;
					blockUI.stop();

				});
			}
			$scope.guardarRegistroEvalProvGral = async function () {

				try {
					let res = await ObtenerConfiguracionIsoEmpresa($scope.usuario.id_empresa, 'LISCAL')
					if (!res.configuracionIso) {

						return SweetAlert.swal("Alerta!", 'la empresa no cuenta con configuracion ISO para evaluación de proveedor', "warning");
					}
					res = await GuardarRegistroEvaluacionProvGral($scope.filtroCalProv, new Date(), res.configuracionIso.id, $scope.usuario.id, $scope.convertirFecha)
					if (res.datos && res.datos.proveedoresSinCompra.length > 0) {
						SweetAlert.swal({
							title: 'Advertencia!',
							text: res.mensaje,
							icon: 'success',
						})
					}
					$scope.impRegCalProvGral(res.datos.evaluacion.id)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.impRegCalProvGral = async function (idEval) {
				try {
					let res = await ObtenerConfiguracionIsoEmpresa($scope.usuario.id_empresa, 'LISCAL')
					let config = res.configuracionIso
					res = await ObtenerRegistroEvaluacionProvGral(idEval)
					$scope.printIsoDocGral(res.evaluacion, config)
				} catch (error) {
					console.log(error)
				}
			}
			$scope.printIsoDocGral = async function (evaluacion, configuracionIso) {
				try {
					convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
						/* blockUI.start(); */
						var doc = new PDFDocument({ size: "letter", layout: 'landscape', margin: 10, compress: false });
						var stream = doc.pipe(blobStream());
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
						await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
						var y = 190, itemsPorPagina = 12, items = 0, pagina = 1, totalPaginas = Math.ceil((evaluacion.detallesEvaluacion.length) / itemsPorPagina);
						$scope.dibujarCabeceraPDFCompraIsoGral(doc, pagina, totalPaginas, evaluacion, imagenEmpresa, configuracionIso);
						var totalIso = 0;
						let cont=1
						for (const detalle of evaluacion.detallesEvaluacion) {
							doc.font('Bookman', 8);
							//Detalle
							doc.text(cont++, 65, y+5, { width: 45 });
							let ydesc = detalle.razon_social_proveedor ? detalle.razon_social_proveedor.length > 40 ? y - 5 : y+5 : y+5
							detalle.razon_social_proveedor = detalle.razon_social_proveedor ? detalle.razon_social_proveedor.length > 55 ? detalle.razon_social_proveedor.substr(0, 55) + "..." : detalle.razon_social_proveedor : ''

							doc.text(detalle.razon_social_proveedor ? detalle.razon_social_proveedor : '', 95, y+5, { width: 100.63 });

							ydesc = detalle.productos ? detalle.productos.length > 40 ? y - 5 : y+5 : y+5
							detalle.productos = detalle.productos ? detalle.productos.length > 55 ? detalle.productos.substr(0, 55) + "..." : detalle.productos : ''

							doc.text(detalle.productos, 213.22, ydesc, { width: 100.56 });

							ydesc = detalle.responsable_venta ? detalle.responsable_venta.length > 40 ? y - 5 : y+5 : y+5
							detalle.responsable_venta = detalle.responsable_venta ? detalle.responsable_venta.length > 55 ? detalle.responsable_venta.substr(0, 55) + "..." : detalle.responsable_venta : ''

							doc.text(detalle.responsable_venta, 334, ydesc, { width: 100.63 });
							doc.text(detalle.area, 440.41, y+5, { width: 40.63, align: "center" });

							ydesc = detalle.telefono ? detalle.telefono.length > 15 ? y - 5 : y+5 : y+5

							doc.text(detalle.telefono, 485.41, ydesc, { width: 40.63, align: "center" });
							doc.text("", 547.41, y+5, { width: 60.63 });

							doc.text(detalle.total, 620.04, y+5, { width: 55.77, align: "center" });
							doc.text(detalle.tipo_proveedor, 688, y+5, { width: 64, align: "center" });
							y = y + 30;
							doc.rect(60, y - 5, 687, 0).stroke();

							items++;
							if (items >= itemsPorPagina) {
								doc.rect(60, 160 - 5, 687, 30 * items + 30).stroke();
								doc.addPage({ size: "letter", layout: 'landscape', margin: 10 });
								y = 190;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFCompraIsoGral(doc, pagina, totalPaginas, evaluacion, imagenEmpresa, configuracionIso);
							}
						}
						if (pagina === totalPaginas) {
							doc.rect(60, 160 - 5, 687, 30 * items + 30).stroke();
							doc.font('Bookman-Bold', 9);
							doc.text('--------------------------------------------', 150, 567, { width: 207, align: 'center' })
							doc.text("Firma del Evaluador", 150, 575, { width: 207, align: "center" });
							doc.text('--------------------------------------------', 440, 567, { width: 207, align: 'center' })
							doc.text("Firma del Proveedor", 440, 575, { width: 207, align: "center" });
							doc.font('Bookman-Bold', 8);
							doc.font('Bookman-Bold', 8);
							doc.text('Pagina', 374, 580);
							doc.text(pagina + ' de ' + totalPaginas, 407, 580);
						}
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
						/* 	blockUI.stop(); */
					})
					$scope.$evalAsync()
				} catch (error) {

				}
			}
			$scope.dibujarCabeceraPDFCompraIsoGral = function (doc, pagina, totalPaginas, evaluacion, imagenEmpresa, configuracionIso) {
				doc.font('Bookman-Bold', 11);
				if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
					if (imagenEmpresa) {
						doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
					}
				}
				//cuadros
				doc.rect(60, 60, 687, 55).stroke();
				doc.rect(164, 88, 583, 0).stroke();
				doc.rect(164, 60, 0, 55).stroke();
				doc.rect(611, 60, 0, 55).stroke();

				doc.text(configuracionIso.nombre.toUpperCase(), 254, 70, { width: 267, align: "center" });
				doc.font('Bookman-Bold', 11);
				doc.text("Código:", 333, 95);
				doc.text(configuracionIso.codigo, 375, 95);
				doc.font('Bookman-Bold', 9);
				doc.font('Bookman', 9);
				doc.text("Revisión:", 615, 70);
				doc.text(configuracionIso.revicion, 657, 70);
				doc.text("Fecha de Aprobacón", 615, 90, { width: 132 });
				doc.text($scope.fechaATexto(configuracionIso.fecha_aprobacion), 615, 100, { width: 132 });

				var y = 130;
				doc.font('Bookman-Bold', 10);

				doc.text("|Fecha Actualización: ", 62, y);
				doc.font('Bookman', 10);
				doc.text($scope.fechaATexto(evaluacion.fecha), 180, y, { width: 150 });
				doc.font('Bookman-Bold', 10);
				y += 30;

				doc.rect(60, y + 25, 687, 0).stroke();

				doc.rect(88.04, y - 5, 0, 30).stroke();
				doc.rect(205.81, y - 5, 0, 30).stroke();
				doc.rect(323.58, y - 5, 0, 30).stroke();
				doc.rect(435.74, y - 5, 0, 30).stroke();
				doc.rect(486.21, y - 5, 0, 30).stroke();
				doc.rect(542.29, y - 5, 0, 30).stroke();
				doc.rect(609.59, y - 5, 0, 30).stroke();
				doc.rect(689.59, y - 5, 0, 30).stroke();
				//Cabecera Detalle
				doc.text("|Nº", 50, y, { width: 45, align: "center" });
				doc.text("|Razon Social del Proveedor", 95, y, { width: 90.63, align: 'center' });
				doc.text("|Producto que Suministra", 223.22, y, { width: 80.56, align: "center" });
				doc.text("|Responsable de venta", 344, y, { width: 80.63, align: "center" });
				doc.text("|Area", 440.41, y, { width: 40.63, align: "center" });
				doc.text("|Teléfono/ Celular", 480.41, y, { width: 70.63, align: "center" });
				doc.text("|Correo Electrónocio", 547.41, y, { width: 60.63, align: "center" });

				doc.text("Puntaje Obtenido", 620.04, y, { width: 55.77, align: "center" });
				doc.text("Tipo de Proveedor", 688, y, { width: 64, align: "center" });
				doc.font('Bookman', 8);

				if (pagina != totalPaginas) {
					doc.font('Bookman-Bold', 8);
					doc.font('Bookman-Bold', 8);
					doc.text('Pagina', 374, 580);
					doc.text(pagina + ' de ' + totalPaginas, 407, 580);
				}
			};

			$scope.obtenerBancosAsfi = function () {
                var promesa = buscarBancoASFI();
                promesa.then(function (entidad) {
                    $scope.bancos = entidad.bancos
                });
            }
			$scope.agregarNroCuentas = async function (datos){
				if(datos.nro_cuenta && datos.banco){
					if($scope.cuentas.length == 0){datos.predefinido = true}
					const res = await GuardarNroCuentas(datos).then(function(dato){
						$scope.obtenerListaNroCuentas(datos)
						toastr.success("Guardado Correctamente");
						$scope.proveedor.banco = ''
						$scope.proveedor.nro_cuenta = ''
						$scope.proveedor.predefinido = false
					})
				}else{toastr.warning("Debe ingresar los datos")}
            }

			$scope.obtenerListaNroCuentas = function (proveedor) {
                var promesa = buscarListaNroCuentas(proveedor.id);
                promesa.then(function (datos) {
                    $scope.cuentas = datos.cuentasBancariasProveed
                });
            }
			
			$scope.confirmarCuentaBancoEliminar = function (cuentaBancoProveedor,proveedor) {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Eliminar Cuenta "+cuentaBancoProveedor.nro_cuenta+"-"+cuentaBancoProveedor.banco.nombre+" de "+proveedor.razon_social+" !!!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.eliminarCuentaBancoProveedor(cuentaBancoProveedor,proveedor);
                    } 
                });  
            }

			$scope.eliminarCuentaBancoProveedor = async function (cuentaBancoProveedor, proveedor){
				try {
					const res = await eliminarNroCuentas(cuentaBancoProveedor).then(function(dato) {
						if(dato.hasError) {SweetAlert.swal({text: 'No se podo eliminar',icon: 'warning'});return true} 
						toastr.success(dato.message);
						$scope.obtenerListaNroCuentas(proveedor)
					}) 
				} catch (error) {
                    return SweetAlert.swal("", "<b>Ocurrió un error al eliminar</b><br>"+error, "error");
                }
					
            }

			$scope.seleccionarPredefinido = async function (cuentaBancoProveedor,proveedor){
				//let encontrado = $scope.cuentas.some(cuenta =>cuenta.predefinido = true)//para encontrar al predefinido
				//if(encontrado){
					SweetAlert.swal({
						title: "Esta seguro?",
						text: "Desea Seleccionar como Predefinido al "+cuentaBancoProveedor.nro_cuenta+"-"+cuentaBancoProveedor.banco.nombre+" de "+proveedor.razon_social+" !!!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Si',
						cancelButtonText: "No"
					}).then(async function (result) {
						if (result.value) {
							try {
								let encontrado = $scope.cuentas.map(cuenta =>cuenta.predefinido = false)
								cuentaBancoProveedor.predefinido = true
								const res = await guardarCheckSeleccionado({cuentas:$scope.cuentas}).then(function(dato){
									toastr.success(dato.message);
								})
							} catch (error) {
								return SweetAlert.swal("", "<b>Ocurrió un error al eliminar</b><br>"+error, "error");
							}
						} 
					}); 
				//}
			}
			

		








			
			$scope.inicio();
		}]);




