angular.module('agil.controladores')

	.controller('ControladorClientes',['$scope', '$window', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', '$timeout',
		'ClientesPaginador', 'Cliente', 'Clientes', 'Empresas', 'ClientesEmpresa', 'uiGmapGoogleMapApi',
		'DatoCodigoSiguienteClienteEmpresa', 'DestinosCliente', 'RazonesSocialesCliente', 'ClasesTipoEmpresa', 'Diccionario', 'Tipos', 'ClasesTipo',
		'VerificarUsuarioEmpresa','GuardarAnticipoCliente','ObtenerInformacionClienteEmpresa','SweetAlert','ListaClienteCodigo','ListaClienteNit', function ($scope, $window, $localStorage, $location, $templateCache, $route, blockUI, $timeout,
		ClientesPaginador, Cliente, Clientes, Empresas, ClientesEmpresa, uiGmapGoogleMapApi,
		DatoCodigoSiguienteClienteEmpresa, DestinosCliente, RazonesSocialesCliente, ClasesTipoEmpresa, Diccionario, Tipos, ClasesTipo,
		VerificarUsuarioEmpresa,GuardarAnticipoCliente,ObtenerInformacionClienteEmpresa,SweetAlert, ListaClienteCodigo, ListaClienteNit) {
		blockUI.start();

		$scope.usuario = JSON.parse($localStorage.usuario);
		$scope.idModalConceptoEdicionCorrelativos = 'dialog-conceptos-correlativos';
		$scope.IdModalVerificarCuenta = 'modal-verificar-cuenta';
		$scope.IdModalNuevoAnticipo = 'modal-anticipo-cliente';
		$scope.inicio = function () {
			$scope.encendido = true;
			$scope.diccionario = Diccionario
			$scope.sucursales = $scope.obtenerSucursales();
			$scope.obtenerEmpresas();
			$scope.obtenerClientes();
			$scope.obtenerDestinos();
			$scope.obtenerTiposPrecio()
			/*setTimeout(function() {
				ejecutarScriptsTabla('tabla-clientes',10);
			},2000);*/
			uiGmapGoogleMapApi.then(function (maps) {
				console.log(maps);//google.maps.event.trigger(maps[0].map, 'resize');
				$scope.map = {
					center: { latitude: -17.403800007775388, longitude: -66.11349012184144 }, zoom: 17, bounds: {
						northeast: {
							latitude: -17.403800007775388,
							longitude: -66.11349012184144
						}
					}
				};
				// $scope.searchbox= { 
				// 	template:'searchbox.tpl.html', 
				// 	events:{
				// 	  places_changed: function (searchBox) {}
				// 	}
				//   };
				$scope.options = {
					scrollwheel: false,
					mapTypeId: google.maps.MapTypeId.SATELLITE
				};
			});
		}

		$scope.$on('$viewContentLoaded', function () {
			resaltarPesta??a($location.path().substring(1));
			ejecutarScriptsCliente('modal-wizard-cliente', 'modal-wizard-cliente-vista', 'dialog-eliminar-cliente', 'modal-wizard-container-cliente-edicion', 'modal-wizard-container-cliente-vista', $scope.idModalConceptoEdicionCorrelativos, $scope.IdModalVerificarCuenta, $scope.IdModalNuevoAnticipo);
			$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
			blockUI.stop();
		});
		$scope.obtenerCorrelativoCliente = function () {
			blockUI.start();
			var promesa = ClasesTipoEmpresa("correlativo_clientes", $scope.usuario.id_empresa);
			promesa.then(function (entidad) { 
				if(entidad.clases){
					if (entidad.clases.length > 1) {
						entidad.clases.sort(function (a, b) {
							a.correlativo = a.nombre_corto.split('-')[0]
							a.correlativo_maximo = a.nombre_corto.split('-')[1]
							b.correlativo = b.nombre_corto.split('-')[0]
							b.correlativo_maximo = b.nombre_corto.split('-')[1]
							return a.correlativo - b.correlativo
						})
					} else if (entidad.clases.length == 1) {
						entidad.clases[0].correlativo = entidad.clases[0].nombre_corto.split('-')[0]
						entidad.clases[0].correlativo_maximo = entidad.clases[0].nombre_corto.split('-')[1]
					}
				}
				$scope.correlativosClientes = entidad

				blockUI.stop();
			});
		}
		$scope.cargarCodigo = function (cliente) {
			cliente.codigo = cliente.correlativo.correlativo
		}
		$scope.obtenerClientes = function () {
			$scope.abs = $window.Math.abs;
			$scope.itemsPorPagina = 10;
			$scope.buscarClientes(1, $scope.itemsPorPagina, "");
		}

		$scope.verificarPulso = function (evento, textoBusqueda) {
			if (evento.keyCode === 13) { //enter pressed
				$scope.buscarClientes(1, $scope.itemsPorPagina, textoBusqueda);
			}
		}
		$scope.buscarClientes = function (pagina, itemsPagina, texto) {
			blockUI.start();
			$scope.itemsPorPagina = itemsPagina;
			if (texto == "" || texto == null) {
				texto = 0;
			} else {
				$scope.textoBusqueda = texto;
			}
			$scope.paginaActual = pagina;
			var promesa = ClientesPaginador($scope.usuario.id_empresa, pagina, itemsPagina, texto);
			promesa.then(function (dato) {
				$scope.paginas = [];
				for (var i = 1; i <= dato.paginas; i++) {
					$scope.paginas.push(i);
				}
				$scope.clientes = dato.clientes;
				blockUI.stop();
			});
		}

		$scope.ubicacionActual = function () {
			if(!!navigator.geolocation) {

				
			
		
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log('posicion obtenidaaaa ', position);
					// var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
					$scope.map = {
						"center": {
							"latitude": position.coords.latitude,
							"longitude": position.coords.longitude
						},
						"zoom": 17
					};
					$scope.marker = {
						id: 0,
						coords: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						},
						options: { draggable: true },
						events: {
							dragend: function (marker, eventName, args) {
								$scope.cliente.latitud = marker.getPosition().lat();
								$scope.cliente.longitud = marker.getPosition().lng();
								$scope.marker.options = {
									draggable: true,
									labelAnchor: "100 0",
									labelClass: "marker-labels"
								};
							}
						}
					};
					$scope.cliente.latitud = position.coords.latitude;
					$scope.cliente.longitud = position.coords.longitude;
					uiGmapGoogleMapApi.then(function(maps) {
						maps.visualRefresh = true;
					});
				});
		
			} else {
				document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
			}
		}

		$scope.abrirPopupCliente = function (cliente) {
			$scope.mostrarMap = false;
			$scope.cliente = cliente;
			$scope.map = {
				center: { latitude: $scope.cliente.latitud, longitude: $scope.cliente.longitud }, zoom: 17, bounds: {
					northeast: {
						latitude: $scope.cliente.latitud,
						longitude: $scope.cliente.longitud
					}
				}
			};
			
			// $scope.options = { scrollwheel: false, mapTypeId: google.maps.MapTypeId.SATELLITE };
			var events = {
				places_changed: function (searchBox) {
					var place = searchBox.getPlaces();
					if (!place || place == 'undefined' || place.length == 0) {
						console.log('no place data :(');
						return;
					}
			
					$scope.map = {
						"center": {
							"latitude": place[0].geometry.location.lat(),
							"longitude": place[0].geometry.location.lng()
						},
						"zoom": 17
					};
					$scope.marker = {
						id: 0,
						coords: {
							latitude: place[0].geometry.location.lat(),
							longitude: place[0].geometry.location.lng()
						},
						options: { draggable: true },
						events: {
							dragend: function (marker, eventName, args) {
								$scope.cliente.latitud = marker.getPosition().lat();
								$scope.cliente.longitud = marker.getPosition().lng();
								$scope.marker.options = {
									draggable: true,
									labelAnchor: "100 0",
									labelClass: "marker-labels"
								};
							}
						}
					};
	
					$scope.cliente.latitud = place[0].geometry.location.lat();
					$scope.cliente.longitud = place[0].geometry.location.lng();
				}
			};

			$scope.searchbox= { 
				template:'searchbox.tpl.html', 
				events: events
			  };

			$scope.coordsUpdates = 0;
			$scope.dynamicMoveCtr = 0;
			$scope.marker = {
				id: 0,
				coords: {
					latitude: $scope.cliente.latitud,
					longitude: $scope.cliente.longitud
				},
				options: { draggable: true },
				events: {
					dragend: function (marker, eventName, args) {
						$scope.cliente.latitud = marker.getPosition().lat();
						$scope.cliente.longitud = marker.getPosition().lng();
						$scope.marker.options = {
							draggable: true,
							labelAnchor: "100 0",
							labelClass: "marker-labels"
						};
					}
				}
			}
			uiGmapGoogleMapApi.then(function(maps) {
				maps.visualRefresh = true;
			  });
			$scope.abrirPopup('modal-wizard-cliente');
		}

		$scope.mostrarMapa = function () {
			$scope.mostrarMap = true;
			$timeout(function () {
				$scope.$apply(function () {
					google.maps.event.trigger($scope.map, 'resize');
				});
			}, 2000);
		}

		$scope.codigoExistente= function(query){
			if (query != "" && query != undefined) {
				blockUI.noOpen = true;
				var promesa = ListaClienteCodigo($scope.usuario.id_empresa, query.codigo);
				var datosCliente = promesa.then(function (datos){
					if (datos.length > 0) {
						if(query.id){
							for (let index = 0; index < datos.length; index++) {
								const idExist = datos[index];
								if(query.id == idExist.id){
										$scope.cliente.codigo
								}else{
									SweetAlert.swal({
										title: "Desea Continuar??",
										text: "???El C??digo "+$scope.cliente.codigo+", con raz??n social '"+datos[0].razon_social+"', ya se encuentra registrado, si continua duplicar?? el registro de C??DIGO !!!",
										icon: 'warning',
										showCancelButton: true,
										confirmButtonColor: '#3085d6',
										cancelButtonColor: '#d33',
										confirmButtonText: 'Si',
										cancelButtonText: "No"
									}).then(function (result) {
										if (!result.value) {
											$scope.cliente.codigo = "";
										}
									});
								}
							}
						}else{
							SweetAlert.swal({
								title: "Desea Continuar??",
								text: "???El C??digo "+$scope.cliente.codigo+", con raz??n social '"+datos[0].razon_social+"', ya se encuentra registrado, si continua SOLO MODIFICAR?? EL REGISTO YA ESXISTENTE CON ESTE C??DIGO !!!",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: 'Si',
								cancelButtonText: "No"
							}).then(function (result) {
								if (!result.value) {
									$scope.cliente.codigo = "";
								}
							}); 
						}
						
					}
				})
			}
		}

		$scope.nitExistente= function(query){
			if (query != "" && query != undefined) {
				blockUI.noOpen = true;
				var promesa = ListaClienteNit($scope.usuario.id_empresa, query.nit);
				var datosCliente = promesa.then(function (datos){
					if (datos.length > 0) {
						if(query.id){
							for (let index = 0; index < datos.length; index++) {
								const idExist = datos[index];
								if(query.id == idExist.id){
									$scope.cliente.codigo
								}else{
									SweetAlert.swal({
										title: "Desea Continuar??",
										text: "???El NIT "+$scope.cliente.nit+", con raz??n social '"+datos[0].razon_social+"', ya se encuentra registrado, si continua duplicar?? el registro de NIT !!!",
										icon: 'warning',
										showCancelButton: true,
										confirmButtonColor: '#3085d6',
										cancelButtonColor: '#d33',
										confirmButtonText: 'Si',
										cancelButtonText: "No"
									}).then(function (result) {
										if (!result.value) {
											$scope.cliente.nit = "";
										}
									});
								}
							}
						}else{
							SweetAlert.swal({
								title: "Desea Continuar??",
								text: "???El NIT "+$scope.cliente.nit+", con raz??n social '"+datos[0].razon_social+"', ya se encuentra registrado, si continua SOLO SE MODIFICAR?? EL REGISTRO YA EXISTENTE CON ESTE NIT !!!",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: 'Si',
								cancelButtonText: "No"
							}).then(function (result) {
								if (!result.value) {
									$scope.cliente.nit = "";
								}
							}); 
						}
					}
				})
			}
		}

		$scope.crearNuevoCliente = function () {
			$scope.encendido = false;
			$scope.obtenerCorrelativoCliente()
			$scope.steps = [{ cabeza: "cabeza-datos-cli", cuerpo: "cuerpo-datos-cli" },
			{ cabeza: "cabeza-datos-adicionales", cuerpo: "cuerpo-datos-adicionales" }]
			console.log($scope.steps)
			var promesa = DatoCodigoSiguienteClienteEmpresa($scope.usuario.id_empresa);
			promesa.then(function (dato) {
				$scope.ultimo_codigo = dato.ultimo_codigo ? "CLI" + dato.ultimo_codigo : 0;
				var usuario = JSON.parse($localStorage.usuario);
				var cliente = new Cliente({ id_empresa: usuario.id_empresa, latitud: -17.403800007775388, longitud: -66.11349012184144, clientes_razon: [], cliente_destinos: [] });
				cliente.codigo = "CLI" + ((dato.ultimo_codigo ? dato.ultimo_codigo : 0) + 1);
				$scope.abrirPopupCliente(cliente);
				/*var posOptions = {timeout: 10000, enableHighAccuracy: false};
				  $cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						$timeout(function(){
							$scope.$apply(function(){
								$scope.cliente=new Cliente({id_empresa:usuario.id_empresa,latitud:position.coords.latitude,longitud:position.coords.longitude});
								$scope.abrirPopup('modal-wizard-cliente');
							});
						});
						
					}, function(err) {
					  // error
					});*/
			});
		}

		$scope.verCliente = function (cliente) {
			$scope.cliente = cliente;
			cliente.fecha1 = new Date(cliente.fecha1);
			cliente.fecha2 = new Date(cliente.fecha2);
			$scope.cliente.fechatexto1 = cliente.fecha1.getDate() + "/" + (cliente.fecha1.getMonth() + 1) + "/" + cliente.fecha1.getFullYear();
			$scope.cliente.fechatexto2 = cliente.fecha2.getDate() + "/" + (cliente.fecha2.getMonth() + 1) + "/" + cliente.fecha2.getFullYear();
			$scope.abrirPopup('modal-wizard-cliente-vista');
		}

		$scope.cerrarPopPupVista = function () {
			$scope.cerrarPopup('modal-wizard-cliente-vista');
		}

		$scope.cerrarPopPupNuevoCliente = function () {
			$scope.cerrarPopup('modal-wizard-cliente');
		}

		$scope.modificarCliente = function (clienteB) {
			var promesa = ObtenerInformacionClienteEmpresa(clienteB.id)
			promesa.then(function(dato){
			var cliente = dato.cliente
			if (cliente.fecha1) {
				cliente.fecha1 = new Date(cliente.fecha1);
				cliente.fechatexto1 = cliente.fecha1.getDate() + "/" + (cliente.fecha1.getMonth() + 1) + "/" + cliente.fecha1.getFullYear();
			}
			if (cliente.fecha2) {
				cliente.fecha2 = new Date(cliente.fecha2);
				cliente.fechatexto2 = cliente.fecha2.getDate() + "/" + (cliente.fecha2.getMonth() + 1) + "/" + cliente.fecha2.getFullYear();
			}
			$scope.abrirPopupCliente(cliente);
		})
		}

		/* $scope.verCliente = function (cliente) {
			$scope.cliente = cliente;
			cliente.fecha1 = new Date(cliente.fecha1);
			cliente.fecha2 = new Date(cliente.fecha2);
			$scope.cliente.fechatexto1 = cliente.fecha1.getDate() + "/" + (cliente.fecha1.getMonth() + 1) + "/" + cliente.fecha1.getFullYear();
			$scope.cliente.fechatexto2 = cliente.fecha2.getDate() + "/" + (cliente.fecha2.getMonth() + 1) + "/" + cliente.fecha2.getFullYear();
			$scope.abrirPopup('modal-wizard-cliente-vista');
		} */

		/* $scope.cerrarPopPupVista = function () {
			$scope.cerrarPopup('modal-wizard-cliente-vista');
		}
 */

		/* $scope.cerrarPopPupNuevoCliente = function () {
			$scope.cerrarPopup('modal-wizard-cliente');
		} */

		/* $scope.modificarCliente = function (cliente) {
			if (cliente.fecha1) {
				cliente.fecha1 = new Date(cliente.fecha1);
				cliente.fechatexto1 = cliente.fecha1.getDate() + "/" + (cliente.fecha1.getMonth() + 1) + "/" + cliente.fecha1.getFullYear();
			}
			if (cliente.fecha2) {
				cliente.fecha2 = new Date(cliente.fecha2);
				cliente.fechatexto2 = cliente.fecha2.getDate() + "/" + (cliente.fecha2.getMonth() + 1) + "/" + cliente.fecha2.getFullYear();
			}
			$scope.abrirPopupCliente(cliente);
		} */

		$scope.mostrarConfirmacionEliminacion = function (cliente) {
			$scope.cliente = new Cliente(cliente);
			$scope.abrirPopup("dialog-eliminar-cliente");
		}

		$scope.cerrarConfirmacionEliminacion = function () {
			$scope.cerrarPopup('dialog-eliminar-cliente');
		};

		$scope.eliminarCliente = function (cliente) {
			blockUI.start();
			$scope.cerrarConfirmacionEliminacion();
			cliente.$delete();
			SweetAlert.swal("Eliminado!", "Eliminado exitosamente!", "success");
			$scope.recargarItemsTabla();
			blockUI.stop();
		}

		$scope.saveForm = function (cliente, form) {


			var button = $('#siguiente').text().trim();
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
											cliente.fecha1 = null;
											if (cliente.fechatexto1) {
												cliente.fecha1 = new Date($scope.convertirFecha(cliente.fechatexto1));
											}
											cliente.fecha2 = null;
											if (cliente.fechatexto2) {
												cliente.fecha2 = new Date($scope.convertirFecha(cliente.fechatexto2));
											}
											if (cliente.id) {
												Cliente.update({ idCliente: cliente.id }, cliente, function (res) {
													blockUI.stop();
													$scope.cerrarPopPupNuevoCliente();
													SweetAlert.swal("Guardado!", res.mensaje, "success");
													$scope.recargarItemsTabla();
												});
											} else {
												cliente.$save(function (res) {
													blockUI.stop();
													$scope.cliente = new Cliente({});
													$scope.cerrarPopPupNuevoCliente();
													SweetAlert.swal("Guardado!", res.mensaje, "success");
													$scope.recargarItemsTabla();
												}, function (error) {
													blockUI.stop();
													$scope.cerrarPopPupNuevoCliente();
													SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
													$scope.recargarItemsTabla();
												});
											}
										}
									}
									r.readAsBinaryString(documento);

								} else {
									if (index === array.length - 1) {
										cliente.fecha1 = null;
										if (cliente.fechatexto1) {
											cliente.fecha1 = new Date($scope.convertirFecha(cliente.fechatexto1));
										}
										cliente.fecha2 = null;
										if (cliente.fechatexto2) {
											cliente.fecha2 = new Date($scope.convertirFecha(cliente.fechatexto2));
										}
										if (cliente.id) {
											Cliente.update({ idCliente: cliente.id }, cliente, function (res) {
												blockUI.stop();
												$scope.cerrarPopPupNuevoCliente();
												SweetAlert.swal("Guardado!", res.mensaje, "success");
												$scope.recargarItemsTabla();
											});
										} else {
											cliente.$save(function (res) {
												blockUI.stop();
												$scope.cliente = new Cliente({});
												$scope.cerrarPopPupNuevoCliente();
												SweetAlert.swal("Guardado!", res.mensaje, "success");
												$scope.recargarItemsTabla();
											}, function (error) {
												blockUI.stop();
												$scope.cerrarPopPupNuevoCliente();
												SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
												$scope.recargarItemsTabla();
											});
										}
									}
								}
							});
						} else {
							cliente.fecha1 = null;
							if (cliente.fechatexto1) {
								cliente.fecha1 = new Date($scope.convertirFecha(cliente.fechatexto1));
							}
							cliente.fecha2 = null;
							if (cliente.fechatexto2) {
								cliente.fecha2 = new Date($scope.convertirFecha(cliente.fechatexto2));
							}
							if (cliente.id) {
								Cliente.update({ idCliente: cliente.id }, cliente, function (res) {
									blockUI.stop();
									$scope.cerrarPopPupNuevoCliente();
									SweetAlert.swal("Guardado!", res.mensaje, "success");
									$scope.recargarItemsTabla();
								});
							} else {
								cliente.$save(function (res) {
									blockUI.stop();
									$scope.cliente = new Cliente({});
									$scope.cerrarPopPupNuevoCliente();
									SweetAlert.swal("Guardado!", res.mensaje, "success");
									$scope.recargarItemsTabla();
								}, function (error) {
									blockUI.stop();
									$scope.cerrarPopPupNuevoCliente();
									SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
									$scope.recargarItemsTabla();
								});
							}
						}
					}
				});
			}
			if (!$scope.usuario.empresa.usar_creditos) {
				var step = $('#credito').attr('class');
				console.log(step)
				if (step == "ng-hide active") {
					$('#siguiente').click();
				}
			}
			if (!$scope.usuario.empresa.usar_razon_social) {
				var step = $('#razonsocial').attr('class');
				console.log(step)
				if (step == "ng-hide active") {
					$('#siguiente').click();
				}
			}
			if (!$scope.usuario.empresa.destinos) {
				var step = $('#destinos').attr('class');
				console.log(step)
				if (step == "ng-hide active") {
					$('#siguiente').click();
				}
			}
		}
		$scope.regresarwizard = function () {
			if (!$scope.usuario.empresa.destinos) {
				var step = $('#destinos').attr('class');
				console.log(step)
				if (step == "ng-hide complete") {
					$('#anterior').click();
				}
			}
			if (!$scope.usuario.empresa.usar_razon_social) {
				var step = $('#razonsocial').attr('class');
				console.log(step)
				if (step == "ng-hide complete") {
					$('#anterior').click();
				}
			}
			if (!$scope.usuario.empresa.usar_creditos) {
				var step = $('#credito').attr('class');
				console.log(step)
				if (step == "ng-hide complete") {
					$('#anterior').click();
				}
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

		// $scope.obtenerClientes=function(){
		// 	blockUI.start();
		// 	var promesa=Clientes($scope.usuario.id_empresa);
		// 	promesa.then(function(clientes){
		// 		$scope.clientes=clientes;
		// 		blockUI.stop();
		// 	});
		// }

		$scope.agregarClienteRazon = function (clienteRazon) {
			if (clienteRazon.nit && clienteRazon.razon_social) {

				if ($scope.cliente.clientes_razon.indexOf(clienteRazon) == -1) {
					$scope.cliente.clientes_razon.push(clienteRazon);
				}
				$scope.cliente_razon = {}
			}
		}

		$scope.modificarClienteRazon = function (clienteRazon) {
			$scope.cliente_razon = clienteRazon;
		}

		$scope.removerClienteRazon = function (clienteRazon) {
			clienteRazon.eliminado = true;
		}

		$scope.obtenerDestinos = function () {
			var promesa = DestinosCliente($scope.usuario.id_empresa);
			promesa.then(function (destinos) {
				$scope.destinos = destinos;
			})
		}

		$scope.agregarDestino = function (destino) {
			if (destino.id) {
				var clienteDestino = { id_destino: destino.id, destino: destino };
				if ($scope.cliente.cliente_destinos.indexOf(clienteDestino) == -1) {
					$scope.cliente.cliente_destinos.push(clienteDestino);
				}
				$scope.dato_destino = {}

			}

		}

		$scope.removerDestino = function (destino) {
			destino.eliminado = true;
		}

		$scope.generarExcelComprobacionDatosClientes = function (clientes, configuracion) {
			$scope.obtenerClientes()
			var data = [["N??", "CODIGO", "CLIENTE", "NIT PRINCIPAL", "RAZ??N SOCIAL PRINCIPAL", "DIRECCION", "TELEFONO UNO", "TELEFONO DOS", "TELEFONO TRES", "UBIC. GEO.", "RUBRO", "CATEGORIA", "FECHA IMP. 1", "FECHA IMP. 2", "TEXTO 1", "TEXTO 2","CODIGO RAZONES CLIENTE", "RAZONES CLIENTE", "NIT -RAZON", "CODIGO SAP", "CODIGO DESTINO", "DESTINOS", "DIRECCION DESTINO"]]
			var iu = []
			var index = 0;
			for (var i = 0; i < $scope.clientes.length; i++) {
				var columns = [];
				index = i + 1;
				if ($scope.clientes[i].clientes_razon != undefined && $scope.clientes[i].clientes_razon.length != 0) {
					for (let j = 0; j < $scope.clientes[i].clientes_razon.length; j++) {
						var razon = $scope.clientes[i].clientes_razon[j];
					
						if ($scope.clientes[i].cliente_destinos != undefined && $scope.clientes[i].cliente_destinos.length != 0) {
							for (let k = 0; k < $scope.clientes[i].cliente_destinos.length; k++) {
								var destino = $scope.clientes[i].cliente_destinos[k];								
								columns = [];
								columns.push(index);
								columns.push($scope.clientes[i].codigo);
								columns.push($scope.clientes[i].contacto);
								columns.push($scope.clientes[i].nit);
								columns.push($scope.clientes[i].razon_social);
								columns.push($scope.clientes[i].direccion);
								columns.push($scope.clientes[i].telefono1);
								columns.push($scope.clientes[i].telefono2);
								columns.push($scope.clientes[i].telefono3);
								columns.push($scope.clientes[i].ubicacion_geografica)
								columns.push($scope.clientes[i].rubro)
								columns.push($scope.clientes[i].categoria)
								columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
								columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
								columns.push($scope.clientes[i].texto2)
								columns.push($scope.clientes[i].texto2)
								columns.push(razon.id)
								columns.push(razon.razon_social);
								columns.push(razon.nit);
								columns.push(razon.codigo_sap);
								columns.push(destino.destino.id)
								columns.push(destino.destino.destino);
								columns.push(destino.destino.direccion);
								data.push(columns);	
							}
						}else{
							columns = [];
							columns.push(index);
							columns.push($scope.clientes[i].codigo);
							columns.push($scope.clientes[i].contacto);
							columns.push($scope.clientes[i].nit);
							columns.push($scope.clientes[i].razon_social);
							columns.push($scope.clientes[i].direccion);
							columns.push($scope.clientes[i].telefono1);
							columns.push($scope.clientes[i].telefono2);
							columns.push($scope.clientes[i].telefono3);
							columns.push($scope.clientes[i].ubicacion_geografica)
							columns.push($scope.clientes[i].rubro)
							columns.push($scope.clientes[i].categoria)
							columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
							columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
							columns.push($scope.clientes[i].texto2)
							columns.push($scope.clientes[i].texto2)
							columns.push(razon.id)
							columns.push(razon.razon_social);
							columns.push(razon.nit);
							columns.push(razon.codigo_sap);
							columns.push("sin dato")
							columns.push("sin dato");
							columns.push("sin dato");
							data.push(columns);	
						}					
					}
				}else{
					if ($scope.clientes[i].cliente_destinos != undefined && $scope.clientes[i].cliente_destinos.length != 0) {
						for (let k = 0; k < $scope.clientes[i].cliente_destinos.length; k++) {
							var destino = $scope.clientes[i].cliente_destinos[k];								
							columns = [];
							columns.push(index);
							columns.push($scope.clientes[i].codigo);
							columns.push($scope.clientes[i].contacto);
							columns.push($scope.clientes[i].nit);
							columns.push($scope.clientes[i].razon_social);
							columns.push($scope.clientes[i].direccion);
							columns.push($scope.clientes[i].telefono1);
							columns.push($scope.clientes[i].telefono2);
							columns.push($scope.clientes[i].telefono3);
							columns.push($scope.clientes[i].ubicacion_geografica)
							columns.push($scope.clientes[i].rubro)
							columns.push($scope.clientes[i].categoria)
							columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
							columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
							columns.push($scope.clientes[i].texto2)
							columns.push($scope.clientes[i].texto2)
							columns.push("sin dato")
							columns.push("sin dato");
							columns.push("sin dato");
							columns.push("sin dato");
							columns.push(destino.destino.id)
							columns.push(destino.destino.destino);
							columns.push(destino.destino.direccion);
							data.push(columns);	
						}
					}else{
						columns = [];
						columns.push(index);
						columns.push($scope.clientes[i].codigo);
						columns.push($scope.clientes[i].contacto);
						columns.push($scope.clientes[i].nit);
						columns.push($scope.clientes[i].razon_social);
						columns.push($scope.clientes[i].direccion);
						columns.push($scope.clientes[i].telefono1);
						columns.push($scope.clientes[i].telefono2);
						columns.push($scope.clientes[i].telefono3);
						columns.push($scope.clientes[i].ubicacion_geografica)
						columns.push($scope.clientes[i].rubro)
						columns.push($scope.clientes[i].categoria)
						columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
						columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
						columns.push($scope.clientes[i].texto2)
						columns.push($scope.clientes[i].texto2)
						columns.push("sin dato")
						columns.push("sin dato");
						columns.push("sin dato");
						columns.push("sin dato");
						columns.push("sin dato")
						columns.push("sin dato");
						columns.push("sin dato");
						data.push(columns);	
					}
				}

				/*if ($scope.clientes[i].clientes_razon != undefined) {
					$scope.clientes[i].clientes_razon.map(function (razon, dex) {
						if ($scope.clientes[i].cliente_destinos != undefined && $scope.clientes[i].cliente_destinos.length != 0) {
							$scope.clientes[i].cliente_destinos.map(function (destino) {
								columns = [];
								columns.push((i + 1));
								columns.push($scope.clientes[i].codigo);
								columns.push($scope.clientes[i].contacto);
								columns.push($scope.clientes[i].nit);
								columns.push($scope.clientes[i].razon_social);
								columns.push($scope.clientes[i].direccion);
								columns.push($scope.clientes[i].telefono1);
								columns.push($scope.clientes[i].telefono2);
								columns.push($scope.clientes[i].telefono3);
								columns.push($scope.clientes[i].ubicacion_geografica)
								columns.push($scope.clientes[i].rubro)
								columns.push($scope.clientes[i].categoria)
								columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
								columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
								columns.push($scope.clientes[i].texto2)
								columns.push($scope.clientes[i].texto2)
								columns.push(razon.id)
								columns.push(razon.razon_social);
								columns.push(razon.nit);
								columns.push(razon.codigo_sap);
								columns.push(destino.destino.id)
								columns.push(destino.destino.destino);
								columns.push(destino.destino.direccion);
								data.push(columns);
							})
						} else {
							columns = [];
							columns.push((i + 1));
							columns.push($scope.clientes[i].codigo);
							columns.push($scope.clientes[i].contacto);
							columns.push($scope.clientes[i].nit);
							columns.push($scope.clientes[i].razon_social);
							columns.push($scope.clientes[i].direccion);
							columns.push($scope.clientes[i].telefono1);
							columns.push($scope.clientes[i].telefono2);
							columns.push($scope.clientes[i].telefono3);
							columns.push($scope.clientes[i].ubicacion_geografica)
							columns.push($scope.clientes[i].rubro)
							columns.push($scope.clientes[i].categoria)
							columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
							columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
							columns.push($scope.clientes[i].texto2)
							columns.push($scope.clientes[i].texto2)
							columns.push(razon.razon_social);
							columns.push(razon.nit);
							columns.push(razon.codigo_sap);
							columns.push("sin dato");
							columns.push("sin dato");
							data.push(columns);
						}
					})
				} else {

					if ($scope.clientes[i].cliente_destinos != undefined && $scope.clientes[i].cliente_destinos.length != 0) {
						$scope.clientes[i].cliente_destinos.map(function (destino) {
							columns = [];
							columns.push((i + 1));
							columns.push($scope.clientes[i].codigo);
							columns.push($scope.clientes[i].contacto);
							columns.push($scope.clientes[i].nit);
							columns.push($scope.clientes[i].razon_social);
							columns.push($scope.clientes[i].direccion);
							columns.push($scope.clientes[i].telefono1);
							columns.push($scope.clientes[i].telefono2);
							columns.push($scope.clientes[i].telefono3);
							columns.push($scope.clientes[i].ubicacion_geografica)
							columns.push($scope.clientes[i].rubro)
							columns.push($scope.clientes[i].categoria)
							columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
							columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
							columns.push($scope.clientes[i].texto2)
							columns.push($scope.clientes[i].texto2)
							columns.push("sin dato");
							columns.push("sin dato");
							columns.push("sin dato");
							columns.push(destino.destino.destino);
							columns.push(destino.destino.direccion);
							data.push(columns);
						})
					} else {
						columns = [];
						columns.push((i + 1));
						columns.push($scope.clientes[i].codigo);
						columns.push($scope.clientes[i].contacto);
						columns.push($scope.clientes[i].nit);
						columns.push($scope.clientes[i].razon_social);
						columns.push($scope.clientes[i].direccion);
						columns.push($scope.clientes[i].telefono1);
						columns.push($scope.clientes[i].telefono2);
						columns.push($scope.clientes[i].telefono3);
						columns.push($scope.clientes[i].ubicacion_geografica)
						columns.push($scope.clientes[i].rubro)
						columns.push($scope.clientes[i].categoria)
						columns.push($scope.fechaATexto($scope.clientes[i].fecha1))
						columns.push($scope.fechaATexto($scope.clientes[i].fecha2))
						columns.push($scope.clientes[i].texto2)
						columns.push($scope.clientes[i].texto2)
						columns.push("sin dato");
						columns.push("sin dato");
						columns.push("sin dato");
						columns.push("sin dato");
						columns.push("sin dato");
						data.push(columns);
					}
				}*/
				// data.push(columns);
			}

			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "COMPROBACION DATOS CLIENTES RAZONES DESTINOS.xlsx");
			blockUI.stop();

		}

		$scope.subirExcelClientes = function (event) {
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
					var clientes = [];
					do {
						var cliente = {};
						cliente.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
						cliente.razon_social = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
						cliente.nit = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
						cliente.direccion = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
						cliente.telefono1 = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
						cliente.telefono2 = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
						cliente.telefono3 = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
						cliente.contacto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
						cliente.ubicacion_geografica = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
						cliente.rubro = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
						cliente.categoria = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
						cliente.fecha1 = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? new Date($scope.convertirFecha(worksheet['L' + row].v.toString())) : null;
						cliente.fecha2 = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? new Date($scope.convertirFecha(worksheet['M' + row].v.toString())) : null;
						cliente.texto1 = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
						cliente.texto2 = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? worksheet['O' + row].v.toString() : null;
						cliente.tipoPrecioVenta = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? worksheet['P' + row].v.toString() : null;
						if (cliente.tipoPrecioVenta != null) {
							cliente.tipoPrecioVenta = $scope.tiposPrecios.clases.find(function (tipo) {
								return cliente.tipoPrecioVenta.toUpperCase() === tipo.nombre									
							})
						}
						clientes.push(cliente);
						row++;
						i++;
					} while (worksheet['A' + row] != undefined);
					$scope.guardarClientes(clientes);
					blockUI.stop();
				};
				reader.readAsBinaryString(f);
			}
		}
		$scope.subirExcelRazonesSocialesCliente = function (event) {
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
					var clientes = [];
					do {
						var cliente = {};
						cliente.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
						cliente.razon_social = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
						cliente.nit = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
						cliente.codigo_sap = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
						clientes.push(cliente);
						row++;
						i++;
					} while (worksheet['A' + row] != undefined);
					$scope.guardarRazonesSocialesClientes(clientes);
					blockUI.stop();
				};
				reader.readAsBinaryString(f);
			}
		}
		$scope.guardarRazonesSocialesClientes = function (clientes) {
			var promesa = RazonesSocialesCliente(clientes, $scope.usuario.id_empresa);
			promesa.then(function (res) {
				blockUI.stop();
				SweetAlert.swal("Guardado!", res.mensaje, "success");
				$scope.recargarItemsTabla()
			})
		}
		$scope.guardarClientes = function (clientes) {
			var clientesEmpresa = new ClientesEmpresa({ clientes: clientes, id_empresa: $scope.usuario.id_empresa });
			clientesEmpresa.$save(function (res) {
				blockUI.stop();
				SweetAlert.swal("Guardado!", res.mensaje, "success");
				$scope.recargarItemsTabla();
			}, function (error) {
				blockUI.stop();
				SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
				$scope.recargarItemsTabla();
			});
		}

		$scope.abrirModalConceptoEdicionCorrelativos = function (Tipo) {
			blockUI.start();
			var promesa = ClasesTipoEmpresa("correlativo_clientes", $scope.usuario.id_empresa);
			promesa.then(function (entidad) {
				//$scope.correlativosClientes = entidad
				if (entidad.clases.length > 1) {
					entidad.clases.sort(function (a, b) {
						a.correlativo = a.nombre_corto.split('-')[0]
						a.correlativo_maximo = a.nombre_corto.split('-')[1]
						b.correlativo = b.nombre_corto.split('-')[0]
						b.correlativo_maximo = b.nombre_corto.split('-')[1]
						return a.correlativo - b.correlativo
					})
					$scope.minimo = parseInt(entidad.clases[entidad.clases.length - 1].correlativo_maximo) + 1

				} else if (entidad.clases.length == 1) {
					entidad.clases[0].correlativo = entidad.clases[0].nombre_corto.split('-')[0]
					entidad.clases[0].correlativo_maximo = entidad.clases[0].nombre_corto.split('-')[1]
					$scope.minimo = parseInt(entidad.clases[0].correlativo_maximo) + 1
				}
				$scope.tipo_edicion = entidad;
				$scope.clase = {};
				$scope.abrirPopup($scope.idModalConceptoEdicionCorrelativos);
				blockUI.stop();
			});

		}
		$scope.cerrarModalConceptoEdicionCorrelativos = function () {
			$scope.cerrarPopup($scope.idModalConceptoEdicionCorrelativos);
		}
		$scope.agregarConceptoEdicion = function (clase) {
			clase.nombre_corto = clase.correlativo + "-" + clase.correlativo_maximo

			if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
				if ($scope.tipo_edicion.clases.length > 0) {
					/* if (clase.correlativo > $scope.tipo_edicion.clases[$scope.tipo_edicion.clases.length - 1].correlativo_maximo) { */
					$scope.tipo_edicion.clases.push(clase);
					$scope.minimo = clase.correlativo_maximo + 1
					/* } else {
						$scope.mostrarMensaje("El valor de correlativo debe ser mayor al valor maximo del ultimo correlativo")
					} */
				} else {
					$scope.tipo_edicion.clases.push(clase);
					$scope.minimo = clase.correlativo_maximo + 1
				}

			}
			$scope.clase = {}

		}
		$scope.modificarConceptoEdicion = function (clase) {
			clase.correlativo = parseInt(clase.correlativo)
			clase.correlativo_maximo = parseInt(clase.correlativo_maximo)
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
					tipo = entidad
					blockUI.stop();
					$scope.cerrarModalConceptoEdicionCorrelativos();
					SweetAlert.swal("Guardado!", "Guardado Exitosamente!", "success");
				});
			});
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
			 const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa,cuenta)
            promesa.then( function (dato) {

				if (dato.type) {
					SweetAlert.swal("Verificado!", dato.message, "success");
					/*  cuenta.abierto= cuenta.abierto; */
					if ($scope.tipoDatosPermiso == "correlativo") {
						$scope.modificarConceptoEdicion($scope.dato)
					}
					$scope.cerrarModalVerificarCuenta();
				} else {
					SweetAlert.swal("", dato.message, "warning");
				}
			})
		}
		$scope.obtenerTiposPrecio = function () {
			blockUI.start();
			var promesa = ClasesTipoEmpresa("T_PAGO_PRODUCTO", $scope.usuario.id_empresa);
			promesa.then(function (entidad) {
				$scope.tiposPrecios = entidad
				blockUI.stop();
			});
		}
		$scope.abrirModalNuevoAnticipo = function (cliente) {
			$scope.cliente=cliente
			$scope.anticipo={}
			$scope.abrirPopup($scope.IdModalNuevoAnticipo);
		}
		$scope.cerrarModalNuevoAnticipo = function () {
			$scope.anticipo={}
			$scope.cerrarPopup($scope.IdModalNuevoAnticipo);
		}
		
		$scope.obtenerSucursales = function () {
			var sucursales = [];
			for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
				sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
			}
			return sucursales;
		}
		$scope.guardarAnticipoCliente=function(dato){
			var anticipoCliente={					
				monto_anticipo:dato.monto,
				monto_salida:0,
				saldo:dato.monto,
				fecha:new Date(),
				id_sucursal:dato.sucursal.id
			}
			var promesa=GuardarAnticipoCliente($scope.cliente.id,anticipoCliente)
			promesa.then(function(datos){
				$scope.cerrarModalNuevoAnticipo()
				$scope.imprimirReciboAnticipo(datos.anticipo)
				SweetAlert.swal("Guardado!", datos.mensaje, "success");
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
			//doc.text("AUTORIZACI??N No: "+anticipo.autorizacion,{align:'center'});
			doc.moveDown(0.4);
			doc.text("------------------------------------", { align: 'center' });
			doc.moveDown(0.4);
			//doc.text(anticipo.actividad.nombre,{align:'center'});
			doc.moveDown(0.6);
			var date = new Date();
			doc.text("FECHA : " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(), { align: 'left' });
			doc.moveDown(0.4);
			doc.text("He recibido de : " +anticipo.cliente.razon_social, { align: 'left' });
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
			$scope.eliminarPopup('modal-wizard-cliente');
			$scope.eliminarPopup('modal-wizard-cliente-vista');
			$scope.eliminarPopup('dialog-eliminar-cliente');
			$scope.eliminarPopup($scope.idModalConceptoEdicionCorrelativos);
			$scope.eliminarPopup($scope.IdModalVerificarCuenta);
		});

		$scope.inicio();
	}]);



