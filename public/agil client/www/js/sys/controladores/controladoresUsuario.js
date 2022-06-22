angular.module('agil.controladores')

	.controller('ControladorUsuarios', function ($scope, $filter, $location, $window, $localStorage, $templateCache, $route, blockUI, Usuario, Empresas, Roles, $timeout,
		UsuariosEmpresa, Rutas, UsuarioRutas, Diccionario, UsuarioComision, UsuarioComisiones, Sucursales, UsuariosEmpresaPaginador, validarUsuario, Paginator, ListaGruposProductoEmpresa, ObtenerUsuario, ListaAplicacionesSistemaEmpresa, EliminarUsuario, ObtenerTodoPersonal, ObtenerAlmacenesSucursales) {

		$scope.idModalWizardUsuarioEdicion = 'modal-wizard-usuario';
		$scope.idModalWizardUsuarioVista = 'modal-wizard-usuario-vista';
		$scope.idModalEliminarUsuario = 'dialog-eliminar-usuario';
		$scope.idModalContenedorUsuarioEdicion = 'modal-wizard-container-usuario-edicion';
		$scope.idModalContenedorUsuarioVista = 'modal-wizard-container-usuario-vista';
		$scope.idImagenUsuario = 'imagen-persona';
		$scope.idModalWizardUsuarioRutas = 'modal-wizard-usuario-rutas';
		$scope.idModalContenedorUsuarioRutas = 'modal-wizard-container-usuario-rutas';
		$scope.idModalWizardUsuarioComisiones = 'modal-wizard-usuario-comisiones';
		$scope.idModalContenedorUsuarioComisiones = 'modal-wizard-container-usuario-comisiones';
		$scope.usuarioSesion = JSON.parse($localStorage.usuario);
		$scope.obtenerGruposProductoEmpresa = function (id_empresa) {
			var promesa = ListaGruposProductoEmpresa((id_empresa !== undefined) ? id_empresa : $scope.usuarioSesion.id_empresa);
			promesa.then(function (grupos) {
				$scope.gruposProducto = grupos
				$scope.llenarGrupos(grupos);
				// if ($scope.usuario.grupos) {
				// 	$scope.seleccionarGrupos($scope.usuario.grupos)
				// }

			})
		}
		$scope.obtenerSucursalesEmpresa =function () {
			var promesa = Sucursales($scope.usuarioSesion.id_empresa);
			promesa.then(function (datos) {
				$scope.usuarioSesion.empresa.sucursales = datos;
			});
		}
		$scope.inicio = function () {
			$scope.encendido = true;
			$scope.verAlertas = false
			$scope.empleadooNoEncontrado = false
			$scope.gruposUsuario = []
			$scope.obtenerEmpresas();
			$scope.verAtrbCC = false
			$scope.verAtrbVenta = false
			$scope.verAtrbGestion = false
			$scope.obtenerRoles();
			$scope.obtenerUsuarios();
			if ($scope.usuarioSesion.empresa) {
				$scope.obtenerRutas();
				$scope.obtenerAplicacionesEmpresas($scope.usuarioSesion.id_empresa)
				$scope.obtenerSucursalesEmpresa();
			}
			$scope.filtrarPersonal()
			$scope.obtenerGruposProductoEmpresa()
			/* var sucursales=($scope.usuarioSesion.empresa)?$scope.usuarioSesion.empresa.sucursales:[];
			$scope.llenarSucursales(sucursales); */
			$scope.buscarSucursales($scope.usuarioSesion.id_empresa) // para que sera???
			$scope.dynamicPopoverOpciones = {
				templateUrl: 'myPopoverTemplateOpciones.html',
			};
			$scope.dynamicPopoverEdicion = {
				templateUrl: 'myPopoverTemplateEdicion.html',
			};
			/* setTimeout(function() {
				ejecutarScriptsTabla('tabla-usuarios',9);
			},2000); */

		}
		$scope.verAlertasUsuario = function () {
			$scope.verAlertas = $scope.verAlertas ? false : true
		}
		$scope.verAtrbVentaUsuario = function () {
			$scope.verAtrbVenta = $scope.verAtrbVenta ? false : true
		}
		$scope.verAtrbGestionUsuario = function () {
			$scope.verAtrbGestion = $scope.verAtrbGestion ? false : true
		}
		$scope.verAtrbCCUsuario = function () {
			$scope.verAtrbCC = $scope.verAtrbCC ? false : true
		}
		$scope.verificarModulos = function () {
			$scope.verdatosCajaChica = $scope.aplicacionesEmpresa.some(function (x) {
				return x.aplicacion.titulo == 'CAJA CHICA' || x.aplicacion.titulo == "SOLICITUD CAJA CHICA"
			})
			$scope.usuarPorteria = $scope.aplicacionesEmpresa.some(function (x) {
				return x.aplicacion.titulo == 'PORTERIA'
			})
		}
		$scope.$on('$viewContentLoaded', function () {
			resaltarPestaña($location.path().substring(1));
			ejecutarScriptsUsuario($scope.idModalWizardUsuarioEdicion,
				$scope.idImagenUsuario,
				$scope.idModalContenedorUsuarioEdicion,
				$scope.idModalWizardUsuarioVista,
				$scope.idModalContenedorUsuarioVista,
				$scope.idModalEliminarUsuario,
				$scope.idModalWizardUsuarioRutas,
				$scope.idModalContenedorUsuarioRutas,
				$scope.idModalWizardUsuarioComisiones,
				$scope.idModalContenedorUsuarioComisiones);
			$scope.buscarAplicacion($scope.usuarioSesion.aplicacionesUsuario, $location.path().substring(1));
			blockUI.stop();
		});

		$scope.crearNuevoUsuario = function () {
			$scope.encendido = false;
			$scope.empleadooNoEncontrado = false
			if ($scope.usuarioSesion.id_empresa) {
				$scope.usuario = new Usuario({ alertas: {}, persona: { imagen: "img/icon-user-default.png" }, sucursales: [], id_empresa: $scope.usuarioSesion.id_empresa, activo: true });
				//$scope.sucursales=$scope.usuarioSesion.empresa.sucursales;
				$scope.seleccionarSucursales([]);

			} else {

				$scope.usuario = new Usuario({ alertas: {}, persona: { imagen: "img/icon-user-default.png" }, sucursales: [], activo: true });
				$scope.sucursales = [];
			}
			$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
		}

		$scope.verUsuario = function (usuario) {
			blockUI.start()
			var prom = ObtenerUsuario(usuario.id)
			prom.then(function (res) {
				if (res.mensaje == undefined) {
					$scope.usuario = res.usuario;
					$scope.rol = res.usuario.rolesUsuario[0].rol;
					$scope.usuario.sucursales = [];
					// 					$scope.sucursales = res.usuario.empresa.sucursales;
					for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
						if ($scope.usuario.sucursalesUsuario[i].id_sucursal != null || $scope.usuario.sucursalesUsuario[i].id_sucursal != undefined) {
							$scope.usuario.sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
						}
					}
					blockUI.stop()
					$scope.abrirPopup($scope.idModalWizardUsuarioVista);
				} else {
					blockUI.stop()
					$scope.mostrarMensaje(res.mensaje)
				}
			}).catch(function (err) {
				var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Error: no hubo respuesta del servidor o hubo un cambio de red. -- controlador usuarios LN 78.'
				$scope.mostrarMensaje(mensaje)
				blockUI.stop()
			})

			//old: change at 06/04/2018
			// //console.log(usuario);
			// $scope.usuario = usuario;
			// $scope.rol = usuario.rolesUsuario[0].rol;
			// $scope.usuario.sucursales = [];
			// $scope.sucursales = usuario.empresa.sucursales;
			// for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
			// 	$scope.usuario.sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
			// }
			// $scope.abrirPopup($scope.idModalWizardUsuarioVista);
		}

		$scope.verificarEmpresa = function (idEmpresa) {
			var empresa = $scope.empresas.filter(function (dato) {

				return dato.id == idEmpresa


			})
			$scope.empresaSeleccionada = empresa[0]
		}

		$scope.initialWizard = function () {
			$('[data-step=1]').trigger("click");
		}

		$scope.modificarUsuario = function (usuario) {
			$scope.initialWizard();
			blockUI.start()
			var prom = ObtenerUsuario(usuario.id)
			prom.then(function (res) {
				if (res.mensaje == undefined) {
					$scope.empleadooNoEncontrado = false
					if ($scope.usuarioSesion.id_empresa == null) {
						var promesa = ListaGruposProductoEmpresa(usuario.id_empresa);
						promesa.then(function (grupos) {

							$scope.verificarEmpresa(usuario.id_empresa)
							$scope.gruposProducto = grupos
							$scope.llenarGrupos(grupos);
							$scope.llenarGrupos($scope.gruposProducto)
							$scope.usuario = res.usuario;
							if ($scope.usuario.empleado) {
								$scope.usuario.usar_relacion_rrhh = true
							}
							$scope.obtenerAplicacionesEmpresas(usuario.id_empresa, true)
							// $scope.seleccionarGrupos($scope.usuario.grupos);
							$scope.rol = res.usuario.rolesUsuario[0].rol;
							$scope.usuario.sucursales = [];
							// $scope.sucursales = res.usuario.empresa.sucursales;
							for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
								if ($scope.usuario.sucursalesUsuario[i].id_sucursal != null || $scope.usuario.sucursalesUsuario[i].id_sucursal != undefined) {
									$scope.usuario.sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
								}
							}
							var sucursales;
							//subido
							$scope.selectRol = JSON.stringify(usuario.rolesUsuario[0]);
							//$scope.aplicacionesEmpresa = $scope.usuario.empresa.aplicacionesEmpresa

							$scope.seleccionarGrupos($scope.usuario.grupos);
							// //$scope.obtenerGruposProductoEmpresa()
							if ($scope.usuarioSesion.empresa) {
								sucursales = $scope.usuarioSesion.empresa.sucursales;
								$scope.llenarSucursales(sucursales);
								$scope.seleccionarSucursales($scope.usuario.sucursales);
								// //$scope.seleccionarGrupos($scope.usuario.grupos);

								$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
							} else {
								var promesa = Sucursales(res.usuario.id_empresa);
								promesa.then(function (datos) {
									sucursales = datos;
									$scope.llenarSucursales(sucursales);
									$scope.seleccionarSucursales($scope.usuario.sucursales);
									// //$scope.seleccionarGrupos($scope.usuario.grupos);
									$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
								});
							}
							$scope.obtenerAlmacenes($scope.usuario)
							blockUI.stop()

						})
					} else {
						var indexAplicacion = []
						$scope.llenarGrupos($scope.gruposProducto)
						$scope.usuario = res.usuario;
						if ($scope.usuario.empleado) {
							$scope.usuario.usar_relacion_rrhh = true
						}
						$scope.usuario.aplicacionesUsuario = $scope.verificarAplicacionesUsuario()
						// $scope.seleccionarGrupos($scope.usuario.grupos);
						$scope.rol = res.usuario.rolesUsuario[0].rol;
						$scope.usuario.sucursales = [];
						// $scope.sucursales = res.usuario.empresa.sucursales;
						for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
							if ($scope.usuario.sucursalesUsuario[i].id_sucursal != null || $scope.usuario.sucursalesUsuario[i].id_sucursal != undefined) {
								$scope.usuario.sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
							}
						}
						var sucursales;
						$scope.seleccionarGrupos($scope.usuario.grupos);
						// //$scope.obtenerGruposProductoEmpresa()
						if ($scope.usuarioSesion.empresa) {
							sucursales = $scope.usuarioSesion.empresa.sucursales;
							$scope.llenarSucursales(sucursales);
							$scope.seleccionarSucursales($scope.usuario.sucursales);
							// //$scope.seleccionarGrupos($scope.usuario.grupos);

							$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
						} else {
							var promesa = Sucursales(res.usuario.id_empresa);
							promesa.then(function (datos) {
								sucursales = datos;
								$scope.llenarSucursales(sucursales);
								$scope.seleccionarSucursales($scope.usuario.sucursales);
								// //$scope.seleccionarGrupos($scope.usuario.grupos);
								$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
							});
						}
						$scope.obtenerAlmacenes($scope.usuario)
						blockUI.stop()
					}
				} else {
					blockUI.stop()
					$scope.mostrarMensaje(res.mensaje)
				}
			}).catch(function (err) {
				var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Error: no hubo respuesta del servidor o hubo un cambio de red. -- controlador usuarios LN 78.'
				$scope.mostrarMensaje(mensaje)
				blockUI.stop()
			})

			//old: change at 06/04/2018
			// $scope.usuario = usuario;
			// // //$scope.obtenerGruposProductoEmpresa()
			// $scope.seleccionarGrupos($scope.usuario.grupos);
			// $scope.rol = usuario.rolesUsuario[0].rol;
			// $scope.usuario.sucursales = [];
			// // //$scope.sucursales=usuario.empresa.sucursales;
			// for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
			// 	$scope.usuario.sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
			// }
			// var sucursales;
			// // //$scope.obtenerGruposProductoEmpresa()
			// if ($scope.usuarioSesion.empresa) {
			// 	sucursales = $scope.usuarioSesion.empresa.sucursales;
			// 	// /* $scope.llenarSucursales(sucursales); */
			// 	$scope.seleccionarSucursales($scope.usuario.sucursales);
			// 	// //$scope.seleccionarGrupos($scope.usuario.grupos);
			// 	$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
			// } else {
			// 	var promesa = Sucursales(usuario.id_empresa);
			// 	promesa.then(function (datos) {
			// 		sucursales = datos;
			// 		$scope.llenarSucursales(sucursales);
			// 		$scope.seleccionarSucursales($scope.usuario.sucursales);
			// 		// //$scope.seleccionarGrupos($scope.usuario.grupos);
			// 		$scope.abrirPopup($scope.idModalWizardUsuarioEdicion);
			// 	});
			// }
		}
		$scope.verificarAplicacionesUsuario = function () {
			var indexAplicacion = []
			$scope.usuario.aplicacionesUsuario.map(function (app, index, array) {
				if (app.puede_ver == true) {
					app.editable = true
				} else {
					app.editable = false
				}
				if (app.aplicacion.titulo == Diccionario.MENU_REPORTE || app.aplicacion.titulo == Diccionario.MENU_APPMOVIL || app.aplicacion.titulo == Diccionario.MENU_LIBRO_COMPRA || app.aplicacion.titulo == Diccionario.MENU_LIBRO_VENTAS
					|| app.aplicacion.titulo == Diccionario.MENU_REPORTE_VENTAS || app.aplicacion.titulo == Diccionario.MENU_REPORTE_COMPRAS || app.aplicacion.titulo == Diccionario.MENU_ESTADO_RESULTADOS || app.aplicacion.titulo == Diccionario.MENU_ALMACEN ||
					app.aplicacion.titulo == Diccionario.MENU_CERT_COD_CONTROL || app.aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_CLIENTES || app.aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_PROVEEDORES ||
					app.aplicacion.titulo == Diccionario.MENU_SEGUIMIENTOAPP || app.aplicacion.titulo == Diccionario.MENU_PANTALLA || app.aplicacion.titulo == Diccionario.MENU_PANTALLACLIENTE || app.aplicacion.titulo == Diccionario.MENU_PANTALLADESPACHO ||
					app.aplicacion.titulo == Diccionario.MENU_DESPACHO) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = false
						app.ver_puede_modificar = false
						app.ver_puede_eliminar = false
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}
				} else if (app.aplicacion.titulo == Diccionario.MENU_EMPRESA) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = false
						app.ver_puede_modificar = true
						app.ver_puede_eliminar = false
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}

				} else if (app.aplicacion.titulo == Diccionario.MENU_MESAS) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						app.ver_puede_modificar = false
						app.ver_puede_eliminar = false
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}

				} else if (app.aplicacion.titulo == Diccionario.MENU_VENTA) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							if (app.opciones.length == 0) {
								app.opciones = element.aplicacion.opciones;
								app.aplicacion.opciones = element.aplicacion.opciones;
							}
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						if ($scope.usuario.empresa.usar_edicion_venta) {
							app.ver_puede_modificar = true
						} else {
							app.ver_puede_modificar = false
						}
						app.ver_puede_eliminar = true
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}

				} else if (app.aplicacion.titulo == Diccionario.MENU_CONFIGURACION) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						app.ver_puede_modificar = true
						app.ver_puede_eliminar = false
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}

				} else if (app.aplicacion.titulo == Diccionario.MENU_CONCEPTO) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						app.ver_puede_modificar = false
						app.ver_puede_eliminar = true
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}

				} else if (app.aplicacion.titulo == Diccionario.MENU_DOSIFICACION) {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						app.ver_puede_modificar = false
						app.ver_puede_eliminar = true
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}
				} else {
					var bandera = false
					for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
						var element = $scope.aplicacionesEmpresa[k];
						if (element.id_aplicacion == app.aplicacion.id) {
							bandera = true
						}
					}
					if (bandera) {
						app.ver_puede_crear = true
						app.ver_puede_modificar = true
						app.ver_puede_eliminar = true
					}
					else {
						indexAplicacion.push(index)
						app.puede_ver = false
						app.editable = false
						app.puede_crear = false
						app.puede_modificar = false
						app.puede_eliminar = false

					}
				}

				// if (app.opciones.length==0) {
				// 	app.opciones = app.aplicacion.opciones;
				// 	// delete app.aplicacion.opciones;
				// }
				return app
			})
			indexAplicacion.reverse().forEach(function (dato, index, array) {
				$scope.usuario.aplicacionesUsuario.splice(dato, 1)
			})

			return $scope.usuario.aplicacionesUsuario

		}
		$scope.ValidarUsuario = function (usuarioNombre) {
			var nombre = usuarioNombre;
			if (nombre != '') {
				$timeout(function () {
					$scope.validar = new validarUsuario();

					$scope.validar.nombre_usuario = usuarioNombre;

					$scope.validar.$save(function (data) {
						$scope.data = data;
					})
				}, 1500);
			}
		};

		$scope.seleccionarSucursales = function (sucursalesUsuario) {
			for (var i = 0; i < $scope.sucursales.length; i++) {
				for (var j = 0; j < sucursalesUsuario.length; j++) {
					if ($scope.sucursales[i].id == sucursalesUsuario[j].id) {
						$scope.sucursales[i].ticked = true;
					}
				}
			}
			// $scope.obtenerAlmacenes($scope.usuario)
		}

		$scope.seleccionarAlmacenes = function (sucursalesUsuario) {
			for (let i = 0; i < $scope.almacenes.length; i++) {
				for (let j = 0; j < sucursalesUsuario.length; j++) {
					for (let index = 0; index < sucursalesUsuario[j].sucursal.almacenes.length; index++) {
						if ($scope.almacenes[i].id == sucursalesUsuario[j].sucursal.almacenes[index].id) {
							$scope.almacenes[i].ticked = true;
						}
					}
				}
			}
			// $scope.obtenerAlmacenes($scope.usuario)
		}

		$scope.seleccionarGrupos = function (gruposUsuario) {
			for (var i = 0; i < $scope.gruposUsuario.length; i++) {
				for (var j = 0; j < gruposUsuario.length; j++) {
					if ($scope.gruposUsuario[i].id == gruposUsuario[j].id_grupo) {
						$scope.gruposUsuario[i].ticked = true;
					}
				}
			}
		}

		$scope.llenarGrupos = function (datosGrupos) {

			// if ($scope.usuario.grupos) {
			// 	$scope.seleccionargrupos($scope.usuario.grupos)
			// }else{
			// 	$scope.usuario.grupos= []
			// 	$scope.seleccionargrupos($scope.usuario.grupos)
			// }
			$scope.gruposUsuario = []
			for (var i = 0; i < datosGrupos.length; i++) {
				var grupo = {
					name: datosGrupos[i].nombre,
					maker: "",
					ticked: false,
					id: datosGrupos[i].id
				}
				$scope.gruposUsuario.push(grupo);
			}
		}
		$scope.llenarSucursales = function (datosSucursales) {
			$scope.sucursales = [];
			for (var i = 0; i < datosSucursales.length; i++) {
				var sucursal = {
					name: datosSucursales[i].nombre,
					maker: "",
					ticked: false,
					id: datosSucursales[i].id
				}
				$scope.sucursales.push(sucursal);
			}
		}

		$scope.llenarAlmacenes = function (datosAlmacenes) {
			$scope.almacenes = [];
			for (let i = 0; i < datosAlmacenes.length; i++) {
				const almacen = {
					name: datosAlmacenes[i].nombre,
					maker: "<b class='green'>("+datosAlmacenes[i].sucursal.nombre+")</b>",
					ticked: false,
					id: datosAlmacenes[i].id
				}
				$scope.almacenes.push(almacen);
			}

		}

		$scope.cerrarPopPupNuevo = function () {
			$scope.cerrarPopup($scope.idModalWizardUsuarioEdicion);
		}

		$scope.cerrarPopPupVista = function () {
			$scope.cerrarPopup($scope.idModalWizardUsuarioVista);
		}

		$scope.cerrarPopPupRutas = function () {
			$scope.cerrarPopup($scope.idModalWizardUsuarioRutas);
		}


		$scope.cerrarPopPupComisiones = function () {
			$scope.cerrarPopup($scope.idModalWizardUsuarioComisiones);
		}

		$scope.mostrarConfirmacionEliminacion = function (usuario) {
			$scope.usuario = new Usuario(usuario);
			$scope.abrirPopup($scope.idModalEliminarUsuario);
		}

		$scope.cerrarConfirmacionEliminacion = function () {
			$scope.cerrarPopup($scope.idModalEliminarUsuario);
		};

		$scope.eliminarUsuario = function (usuario) {
			blockUI.start();
			$scope.cerrarConfirmacionEliminacion();
			/* usuario.$delete(); */
			var promesa = EliminarUsuario(usuario.id)
			promesa.then(function (dato) {
				$scope.mostrarMensaje(dato.message);
			})

			$scope.recargarItemsTabla();
			blockUI.stop();
		}
		$scope.seleccinarAlertas = function (tipo) {
			if (!$scope.usuario.alertas) {
				$scope.usuario.alertas = {
					usar_vencimiento_producto: false,
					usar_vencimiento_credito: false,
					usar_vencimiento_deuda: false,
					usar_pedido: false,
					usar_venta: false,
					usar_proforma: false,
					usar_compra: false,
					usar_banco_caja: false,
					usar_otros: false,
					usar_preventivo: false,
					usar_correctivo: false,
					usar_rutina: false,
					usar_verificacion_caja_chica: false,
				}
			}

			if (tipo == 'Marcar') {
				for (var alerta in $scope.usuario.alertas) {
					var bandera = alerta.split("_")
					if (bandera[0] == 'usar') {
						$scope.usuario.alertas[alerta] = true
					}
				}
			} else {
				for (var alerta in $scope.usuario.alertas) {
					var bandera = alerta.split("_")
					if (bandera[0] == 'usar') {
						$scope.usuario.alertas[alerta] = false
					}
				}
			}
		}
		$scope.buscarSucursales = function (idEmpresa) {
			/* var empresas=$.grep($scope.empresas, function(e){return e.id == idEmpresa;}); */
			/* 	$scope.sucursales=empresas[0].sucursales; */
			var promesa = Sucursales(idEmpresa);
			promesa.then(function (datos) {
				sucursales = datos;
				$scope.llenarSucursales(sucursales);
				$scope.seleccionarSucursales($scope.usuario.sucursales);

			});
		}

		$scope.verificarSelecionado = function (aplicacion) {
			if (aplicacion.puede_ver) {
				aplicacion.puede_crear = true
				aplicacion.puede_modificar = true
				aplicacion.puede_eliminar = true
				aplicacion.editable = true
				$scope.usuario.aplicacionesUsuario.forEach(function (apli) {
					if (aplicacion.id_aplicacion == apli.aplicacion.id_padre) {
						apli.puede_crear = true
						apli.puede_ver = true
						apli.puede_modificar = true
						apli.puede_eliminar = true
						apli.editable = true
					}
				});
			} else {
				aplicacion.puede_crear = false
				aplicacion.puede_modificar = false
				aplicacion.puede_eliminar = false
				aplicacion.editable = false
				$scope.usuario.aplicacionesUsuario.forEach(function (apli) {
					if (aplicacion.id_aplicacion == apli.aplicacion.id_padre) {
						apli.puede_crear = false
						apli.puede_ver = false
						apli.puede_modificar = false
						apli.puede_eliminar = false
						apli.editable = false
					}
				});
			}

		}
		$scope.verificarSelecionOpciones = function (opciones) {
			opciones.forEach(function (opcion) {
				if (opcion.puede_ver) {
					// opcion.puede_crear = true
					// opcion.puede_modificar = true
					// opcion.puede_eliminar = true
					opcion.editable = true
				} else {
					opcion.puede_crear = false
					opcion.puede_modificar = false
					opcion.puede_eliminar = false
					opcion.editable = false
				}
			})
		}

		$scope.verificarSelecionadoOpcion = function (opcion) {
			if (opcion.puede_ver) {
				opcion.puede_crear = true
				opcion.puede_modificar = true
				opcion.puede_eliminar = true
				opcion.editable = true
			} else {
				opcion.puede_crear = false
				opcion.puede_modificar = false
				opcion.puede_eliminar = false
				opcion.editable = false
			}

		}
		$scope.CargarAplicacion = function (i, bandera, crear, modificar, eliminar) {
			var modelo = {
				id_aplicacion: $scope.rol.aplicacionesRol[i].aplicacion.id,
				aplicacion: $scope.rol.aplicacionesRol[i].aplicacion,
				opciones: $scope.rol.aplicacionesRol[i].aplicacion.opciones,
				puede_crear: bandera,
				puede_ver: bandera,
				puede_modificar: bandera,
				puede_eliminar: bandera,
				editable: bandera,
				ver_puede_crear: crear,
				ver_puede_modificar: modificar,
				ver_puede_eliminar: eliminar
			}
			return modelo
		}
		$scope.buscarRol = function (idRol) {
			/* 	var datosRol = JSON.parse(rol);
				var idRol = datosRol.id
				var rol = JSON.parse($scope.usuario.rol)
				$scope.usuario.id_rol = rol.id */
			var roles = $.grep($scope.roles, function (e) { return e.id == idRol; });
			$scope.rol = roles[0];
			$scope.usuario.aplicacionesUsuario = [];
			for (var i = 0; i < $scope.rol.aplicacionesRol.length; i++) {
				if ($scope.rol.nombre == Diccionario.ROL_ADMINISTRADOR) {
					if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_APPMOVIL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_COMPRA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_VENTAS
						|| $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_VENTAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_COMPRAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_RESULTADOS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ALMACEN ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CERT_COD_CONTROL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_CLIENTES || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_PROVEEDORES ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_SEGUIMIENTOAPP || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLACLIENTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLADESPACHO ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DESPACHO || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONSULTAS_DINAMICAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE1 || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE2) {

						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, false, false, false));
							}
						}

					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_EMPRESA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, false, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_MESAS) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_VENTA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONFIGURACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONCEPTO) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DOSIFICACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, true));
							}
						}
					} else {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, true, true));
							}
						}
					}
				} else if ($scope.rol.nombre == Diccionario.ROL_OPERADOR) {
					if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_APPMOVIL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_COMPRA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_VENTAS
						|| $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_VENTAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_COMPRAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_RESULTADOS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ALMACEN ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CERT_COD_CONTROL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_CLIENTES || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_PROVEEDORES ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_SEGUIMIENTOAPP || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLACLIENTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLADESPACHO ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DESPACHO || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONSULTAS_DINAMICAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE1 || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE2) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, false, false, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_EMPRESA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, false, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_MESAS) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_VENTA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_COMPRA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, true, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONFIGURACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONCEPTO) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DOSIFICACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, true));
							}
						}
					} else {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, true, true));
							}
						}
					}
				} else if ($scope.rol.nombre == Diccionario.ROL_VENDEDOR) {
					if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_APPMOVIL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_COMPRA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_LIBRO_VENTAS
						|| $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_VENTAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_REPORTE_COMPRAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_RESULTADOS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ALMACEN ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CERT_COD_CONTROL || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_CLIENTES || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_ESTADO_CUENTAS_PROVEEDORES ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_SEGUIMIENTOAPP || $scope.rol.aplicacionesRol[i].aplicacion.titulo === Diccionario.MENU_PANTALLA || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLACLIENTE || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_PANTALLADESPACHO ||
						$scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DESPACHO || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONSULTAS_DINAMICAS || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE1 || $scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONTABLE2) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, false, false, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_EMPRESA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, false, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_MESAS) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_VENTA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_COMPRA) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, true, true, true, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONFIGURACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, true, false));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_CONCEPTO) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, true));
							}
						}
					} else if ($scope.rol.aplicacionesRol[i].aplicacion.titulo == Diccionario.MENU_DOSIFICACION) {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, false, true));
							}
						}
					} else {
						for (var k = 0; k < $scope.aplicacionesEmpresa.length; k++) {
							var element = $scope.aplicacionesEmpresa[k];
							if (element.id_aplicacion == $scope.rol.aplicacionesRol[i].aplicacion.id) {
								$scope.usuario.aplicacionesUsuario.push($scope.CargarAplicacion(i, false, true, true, true));
							}
						}
					}
				}

			}
		}

		$scope.modificarRutas = function (usuario) {
			$scope.usuario = usuario;
			$scope.abrirPopup($scope.idModalWizardUsuarioRutas);
		}

		$scope.asignarRutaUsuario = function (ruta) {
			var rutaUsuario = { nuevo: true, id_usuario: $scope.usuario.id, id_ruta: ruta.id, activo: true, usuario: { nombre_usuario: $scope.usuario.nombre_usuario }, ruta: { nombre: ruta.nombre } };
			if (ruta.elegida) {
				ruta.usuarios.push(rutaUsuario);
				$scope.usuario.rutas.push(rutaUsuario);
			} else {
				ruta.usuarios.splice(ruta.usuarios.indexOf(rutaUsuario), 1);
				$scope.usuario.rutas.splice(ruta.usuarios.indexOf(rutaUsuario), 1);
			}
		}

		$scope.guardarRutas = function (usuario) {
			var button = $('#siguiente-rutas').text().trim();
			if (button != "Siguiente") {
				blockUI.start();
				UsuarioRutas.update({ id_usuario: usuario.id }, usuario, function (res) {
					blockUI.stop();
					$scope.cerrarPopPupRutas();
					$scope.mostrarMensaje('Guardado Exitosamente!');
					$scope.recargarItemsTabla();
				});
			}
		}

		$scope.veirificarUsuarioRuta = function (ruta, usuario) {
			var i = 0, encontrado = false;
			while (i < ruta.usuarios.length && !encontrado) {
				if (ruta.usuarios[i].usuario) {
					if (ruta.usuarios[i].usuario.nombre_usuario == usuario.nombre_usuario) {
						encontrado = true;
					}
				}
				i++;
			}
			return encontrado;
		}

		$scope.existenNuevosUsuariosRuta = function (ruta, usuario) {
			var i = 0, encontrado = false;
			while (i < ruta.usuarios.length && !encontrado) {
				if (ruta.usuarios[i].nuevo) {
					encontrado = true;
				}
				i++;
			}
			return encontrado;
		}

		$scope.modificarComisiones = function (usuario) {
			blockUI.start()
			$scope.usuario = usuario;
			var promise = UsuarioComisiones(usuario.id, $scope.usuarioSesion.id_empresa);
			promise.then(function (productos) {
				if (productos[0].mensaje !== undefined) {
					$scope.mostrarMensaje(productos[0].mensaje)
				} else {
					$scope.productos = productos;
					$scope.abrirPopup($scope.idModalWizardUsuarioComisiones);
				}
				blockUI.stop()
			}).catch(function (err) {
				var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Error: no hubo respuesta del servidor o hubo un cambio de red. -- controlador usuarios LN 78.'
				$scope.mostrarMensaje(mensaje)
				blockUI.stop()
			})
		}

		$scope.guardarComisiones = function (usuario) {
			var button = $('#siguiente-comisiones').text().trim();
			if (button != "Siguiente") {
				blockUI.start();
				usuario.productos = $scope.productos;
				UsuarioComision.update({ id_usuario: usuario.id, id_empresa: $scope.usuarioSesion.id_empresa }, usuario, function (res) {
					blockUI.stop();
					$scope.cerrarPopPupComisiones();
					$scope.mostrarMensaje('Guardado Exitosamente!');
					$scope.recargarItemsTabla();
				});
			}
		}

		$scope.obtenerAlmacenes = async (usuario) => {
			$scope.almacenes = [];
			try {
				const sucursales = $scope.sucursales.filter(sucursal => sucursal.ticked)
				const almacenes = await ObtenerAlmacenesSucursales($scope.usuario.id_empresa, sucursales)
				if (almacenes.hasErr) {
					return alert(almacenes.mensaje)
				}
				usuario.almacenes = []
				$scope.llenarAlmacenes(almacenes.almacenes)
				$scope.seleccionarAlmacenes(usuario.sucursalesUsuario)
			} catch (error) {
				alert(error.stack && error.stack || 'Se perdió la conexión.')
			}
		}

		$scope.saveForm = function (usuario) {

			var button = $('#siguienteUsuario').text().trim();
			if (button != "Siguiente") {
				if (usuario.sucursales.length == 0) {
					blockUI.stop();
					$scope.cerrarPopPupNuevo();
					$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
					$scope.recargarItemsTabla();
				} else {
					blockUI.start();
					if (usuario.id) {
						Usuario.update({ id_usuario: usuario.id }, usuario, function (res) {
							blockUI.stop();
							$scope.cerrarPopPupNuevo();
							$scope.mostrarMensaje('Guardado Exitosamente!');
							$scope.recargarItemsTabla();
						});
					} else {
						usuario.$save(function (student) {
							blockUI.stop();
							$scope.cerrarPopPupNuevo();
							$scope.mostrarMensaje('Guardado Exitosamente!');
							$scope.recargarItemsTabla();
						}, function (error) {
							blockUI.stop();
							$scope.cerrarPopPupNuevo();
							$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
							$scope.recargarItemsTabla();
						});
					}
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
		$scope.obtenerAplicacionesEmpresas = function (idEmpresa, sinEmpresa) {
			blockUI.start();
			var promesa = ListaAplicacionesSistemaEmpresa(idEmpresa);
			promesa.then(function (datos) {
				$scope.aplicacionesEmpresa = datos;
				$scope.verificarModulos()
				if (sinEmpresa) {
					$scope.usuario.aplicacionesUsuario = $scope.verificarAplicacionesUsuario()
				}
				blockUI.stop();
			});
		}
		$scope.obtenerRoles = function () {
			blockUI.start();
			var promesa = Roles();
			promesa.then(function (roles) {
				$scope.roles = roles;
				$scope.roles.forEach(function (rol, index, array) {
					if (rol.nombre === "SUPER-ADMINISTRADOR") {
						$scope.roles.splice(index, 1)
					}
				})
				blockUI.stop();
			});
		}

		/*$scope.obtenerUsuarios=function(){
			$scope.abs = $window.Math.abs;
			$scope.itemsPorPagina=10;
			$scope.buscarUsuarios(1,$scope.itemsPorPagina,"");
		}

		$scope.verificarPulso=function(evento,textoBusqueda){
			if(evento.keyCode===13){ //enter pressed
			   $scope.buscarUsuarios(1,$scope.itemsPorPagina,textoBusqueda);
		   }
		}

		$scope.buscarUsuarios=function(pagina,itemsPagina,texto){
			blockUI.start();
			$scope.itemsPorPagina=itemsPagina;
			if(texto=="" || texto==null){
				texto=0;
			}else{
				$scope.textoBusqueda=texto;
			}
			$scope.paginaActual=pagina;
			var promesa=UsuariosEmpresaPaginador($scope.usuarioSesion.id_empresa,pagina,itemsPagina,texto);
			promesa.then(function(dato){
				$scope.paginas=[];
				for(var i=1;i<=dato.paginas;i++){
					$scope.paginas.push(i);
				}
				$scope.usuarios=dato.usuarios;
				blockUI.stop();
			});
		}*/

		$scope.obtenerUsuarios = function () {
			blockUI.start();
			$scope.paginator = Paginator();
			$scope.paginator.column = "id";
			$scope.paginator.direction = "asc";
			$scope.filtro = { empresa: $scope.usuarioSesion.id_empresa };
			$scope.paginator.callBack = $scope.buscarUsuarios;
			$scope.paginator.getSearch("", $scope.filtro, null);
			blockUI.stop();

		}

		$scope.buscarUsuarios = function () {
			blockUI.start();
			var promesa = UsuariosEmpresaPaginador($scope.paginator);
			promesa.then(function (dato) {
				if (dato.mensaje == undefined) {
					$scope.usuarios = dato.usuarios;
					// console.log(dato.usuarios)
					$scope.paginator.setPages(dato.paginas);
					blockUI.stop();
				} else {
					blockUI.stop();
					$scope.mostrarMensaje(dato.mensaje)
				}
			}).catch(function (err) {
				var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Error: no hubo respuesta del servidor o hubo un cambio de red. -- controlador usuarios LN 78.'
				$scope.mostrarMensaje(mensaje)
				blockUI.stop()
			})
		}

		$scope.reporteExcel = function (pdf) {
			blockUI.start()

			var cabecera = [" N°", "Nombre", "Primer Apellido", "Segundo Apellido", "Nombre Usuario", "Rol", "Empresa", "Sucursal", "Activo"];
			var data = [];
			data.push(cabecera);
			var column = [];
			for (var i = 0; i < $scope.usuarios.length; i++) {
				columns = [];
				columns.push(i + 1);
				if ($scope.usuarios[i].persona) {
					if ($scope.usuarios[i].persona.nombres !== null) {
						columns.push($scope.usuarios[i].persona.nombres);
						//columns.push($scope.usuarios[i].persona.apellido_paterno);
						//columns.push($scope.usuarios[i].persona.apellido_materno);
					}
				} else {
					columns.push(" ");
				}
				if ($scope.usuarios[i].persona) {
					if ($scope.usuarios[i].persona.apellido_paterno !== null) {
						//columns.push($scope.usuarios[i].persona.nombres);
						columns.push($scope.usuarios[i].persona.apellido_paterno);
						//columns.push($scope.usuarios[i].persona.apellido_materno);
					}
				} else {
					columns.push(" ");
				}
				if ($scope.usuarios[i].persona) {
					if ($scope.usuarios[i].persona.apellido_paterno !== null) {
						//columns.push($scope.usuarios[i].persona.nombres);
						//columns.push($scope.usuarios[i].persona.apellido_paterno);
						columns.push($scope.usuarios[i].persona.apellido_materno);
					}
				} else {
					columns.push(" ");
				}

				if ($scope.usuarios[i].nombre_usuario !== null) {
					columns.push($scope.usuarios[i].nombre_usuario);
				} else {
					columns.push(" ")
				}

				if ($scope.usuarios[i].rolesUsuario[0]) {
					if ($scope.usuarios[i].rolesUsuario[0].rol) {
						columns.push($scope.usuarios[i].rolesUsuario[0].rol.nombre);
					} else {
						columns.push("No Asignado");
					}
				} else {
					columns.push(" ");
				}

				columns.push($scope.usuarios[i].empresa.razon_social);

				if ($scope.usuarios[i].sucursalesUsuario[0]) {
					if ($scope.usuarios[i].sucursalesUsuario.length > 1) {
						columns.push("Varios");
					} else if ($scope.usuarios[i].sucursalesUsuario.length === 1) {
						columns.push($scope.usuarios[i].sucursalesUsuario[0].sucursal.nombre);
					}
				} else {
					columns.push("No Asignado");
				}

				if ($scope.usuarios[i].activo === true) {
					columns.push("Si");
				} else if ($scope.usuarios[i].activo === false) {
					columns.push("No");
				}

				data.push(columns);
			}
			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-USUARIOS.xlsx");
			blockUI.stop();


		}

		$scope.reportePdf = function () {

			convertUrlToBase64Image($scope.usuarioSesion.empresa.imagen, function (imagenEmpresa) {
				var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //[612, 792]
				var stream = doc.pipe(blobStream());

				var itemsPorPagina = 30;
				var y = 205, items = 0, pagina = 1;
				var totalPaginas = Math.ceil($scope.usuarios.length / itemsPorPagina);
				$scope.imprimirCabeceraPDFUsuario(doc, totalPaginas, pagina, $scope.usuarios, imagenEmpresa);

				var index = 1;
				for (var i = 0; i < $scope.usuarios.length; i++) {
					doc.font('Helvetica').text(index++, 30, y);
					if ($scope.usuarios[i].persona) {
						if ($scope.usuarios[i].persona.nombres !== null) {
							doc.font('Helvetica').text($scope.usuarios[i].persona.nombres, 70, y);
							doc.font('Helvetica').text($scope.usuarios[i].persona.apellido_paterno, 130, y);
							doc.font('Helvetica').text($scope.usuarios[i].persona.apellido_materno, 215, y);
						}
					}

					doc.font('Helvetica').text($scope.usuarios[i].nombre_usuario, 310, y);
					if ($scope.usuarios[i].rolesUsuario[0]) {
						if ($scope.usuarios[i].rolesUsuario[0].rol) {
							doc.font('Helvetica').text($scope.usuarios[i].rolesUsuario[0].rol.nombre, 370, y);
						} else {
							doc.font('Helvetica').text("No Asignado", 395, y);
						}
					}

					//doc.font('Helvetica').text($scope.usuarios[i].empresa.razon_social, 450, y);
					if ($scope.usuarios[i].sucursalesUsuario.length > 1) {
						doc.font('Helvetica').text("Varios", 495, y);
					} else if ($scope.usuarios[i].sucursalesUsuario.length === 1) {
						var longitudCaracteres = $scope.usuarios[i].sucursalesUsuario[0].sucursal.nombre.length;
						var yDesc = (longitudCaracteres <= 27) ? y : ((longitudCaracteres > 27 && longitudCaracteres <= 63) ? y - 4 : y - 11);
						doc.font('Helvetica').text($scope.usuarios[i].sucursalesUsuario[0].sucursal.nombre, 480, yDesc, { width: 150 });
					}
					/*if ($scope.usuarios[i].activo === true) {
						columns.push("Si");
					}else if ($scope.usuarios[i].activo === false) {
						columns.push("No");
					}*/

					y = y + 17;
					items++;

					if (items == itemsPorPagina) {
						doc.addPage({ size: [612, 792], margin: 10 });
						y = 205;
						items = 0;
						pagina = pagina + 1;
						$scope.imprimirCabeceraPDFUsuario(doc, totalPaginas, pagina, $scope.usuarios, imagenEmpresa);
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

		$scope.imprimirCabeceraPDFUsuario = function (doc, totalPaginas, pagina, usuarios, imagenEmpresa) {

			var date = new Date().toLocaleDateString();
			doc.fontSize(25).text("REPORTE DE USUARIOS", 0, 80, { align: "center" });
			doc.rect(150, 100, 303, 0).stroke();
			doc.font('Helvetica-Bold', 10);
			doc.text("Fecha: ", 30, 150);
			doc.font('Helvetica', 10).text(date, 63, 150);
			if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
				var imagen = imagenEmpresa;
				if (imagen) {
					doc.image(imagen, 30, 30, { fit: [80, 80] }); //{ fit: [200, 72] } { fit: [100, 72] }
				}
			}
			doc.font('Helvetica-Bold').text("N°", 30, 180);
			doc.font('Helvetica-Bold').text("Nombres", 50, 180);
			doc.font('Helvetica-Bold').text("Apellido Paterno", 130, 180);
			doc.font('Helvetica-Bold').text("Apellido Materno", 215, 180);
			doc.font('Helvetica-Bold').text("Usuario", 310, 180);
			doc.font('Helvetica-Bold').text("Rol", 390, 180);
			//doc.font('Helvetica-Bold').text("Empresa", 450, 180);
			doc.font('Helvetica-Bold').text("Sucursal", 490, 180);
			//doc.font('Helvetica-Bold').text("Empresa",550,180);
			doc.rect(27, 170, 545, 25).stroke();

			doc.font('Helvetica', 8);
			var fecha = new Date();

			doc.text("Pagina: " + pagina + " de " + totalPaginas, 0, 740, { align: "center" });
			doc.text("Usuario: " + $scope.usuarioSesion.nombre_usuario + ", Fecha: " + fecha.getDate() + "/" + ("0" + (fecha.getMonth())).slice(-2) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(), 430, 740);
		}

		$scope.dibujarCabeceraReportePdf = function (doc, reporte) {
			doc.font('Helvetica-Bold', 12);
			doc.text("REPORTE OPERACIONES", 0, 25, { align: "center" });

			doc.font('Helvetica-Bold', 8);
			doc.text("NOMBRE : ", 40, 60, { width: 40 });
			doc.font('APELLIDO PATERNO', 8);
			doc.font('APELLIDO MATERNO', 8);

			doc.text(new Date().toLocaleDateString(), 75, 60, { width: 40 });

			doc.rect(40, 80, 540, 25).stroke();
			doc.font('Helvetica-Bold', 8);
			/*if ($scope.imprimir.detalle) {
				px = 50
				for (let i = 0; i < reporte[0].length; i++) {
					doc.text(reporte[0][i], px, 90);
					if (i == 0) {
						px += reporte[0][i].length * 4 + 5
						$scope.posXforPdf.push(px)
					} else {
						if ($scope.imprimir.detalle) {
							px += reporte[0][i].length * 4 + 15
							$scope.posXforPdf.push(px)
						} else {
							px += reporte[0][i].length * 4 + 15
							$scope.posXforPdf.push(px)
						}
					}
				}
			} else {
				px = 65
				for (let i = 0; i < reporte[0].length; i++) {
					doc.text(reporte[0][i], px, 90);
					if (i == 0) {
						px += 20
						$scope.posXforPdf.push(px)
					} else {
						if ($scope.imprimir.detalle) {
							px += 40
							// $scope.posXforPdf.push(px)
						} else {
							px += 60
							// $scope.posXforPdf.push(px)
						}
					}
				}
			}*/
			doc.font('Helvetica', 8);
		}

		/* $scope.obtenerUsuarios=function(){
			blockUI.start();
			var promesa=UsuariosEmpresa($scope.usuarioSesion.id_empresa);
			promesa.then(function(usuarios){
				$scope.usuarios=usuarios;
				blockUI.stop();
			});
		}
		 */
		$scope.obtenerRutas = function () {
			blockUI.start();
			var promesa = Rutas($scope.usuarioSesion.id_empresa);
			promesa.then(function (rutas) {
				$scope.rutas = rutas;
				blockUI.stop();
			});
		}

		$scope.subirExcelProductosComisiones = function (event) {
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
						producto.comision = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
						var productoEncontrado = $.grep($scope.productos, function (e) { return e.codigo == producto.codigo; })[0];
						if (productoEncontrado) {
							productoEncontrado.comisionesVendedores[0].comision = parseInt(producto.comision);
						}
						row++;
						i++;
					} while (worksheet['A' + row] != undefined);
					blockUI.stop();
				};
				reader.readAsBinaryString(f);
			}
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
		$scope.buscarPersonal = function (query) {
			if (query != "" && query != undefined) {
				var promesa = $filter('filter')($scope.todoPersonal, query);
				return promesa;
			}
		}

		$scope.filtrarPersonal = function (query) {
			if ($scope.todoPersonal !== undefined) {
				$scope.personalProcesado = $filter('filter')($scope.todoPersonal, query);
			} else {
				if ($scope.usuarioSesion.empresa) {
					var prom = ObtenerTodoPersonal($scope.usuarioSesion.empresa.id)
					prom.then(function (personal) {
						$scope.todoPersonal = personal.personal
						$scope.personalProcesado = personal.personal
						if (personal.mensaje !== undefined) {
							$scope.mostrarMensaje(personal.mensaje)
						}
					}, function (err) {
						$scope.mostrarMensaje("Se perdió la conexión.")
					})
				}
			}
		}
		$scope.establecerPersonal = function (personal) {

			$scope.usuario.empleado = { id: personal.id, persona: { nombre_completo: personal.persona.nombre_completo } }

		}
		$scope.verificarEmpleado = function (empleado) {
			if (empleado.id) {
				$scope.empleadooNoEncontrado = false
			} else {
				$scope.empleadooNoEncontrado = true
			}
		}
		$scope.$on('$routeChangeStart', function (next, current) {
			$scope.eliminarPopup($scope.idModalWizardUsuarioEdicion);
			$scope.eliminarPopup($scope.idModalWizardUsuarioVista);
			$scope.eliminarPopup($scope.idModalEliminarUsuario);
			$scope.eliminarPopup($scope.idModalWizardUsuarioRutas);
			$scope.eliminarPopup($scope.idModalWizardUsuarioComisiones);

		});

		$scope.inicio();
	});
