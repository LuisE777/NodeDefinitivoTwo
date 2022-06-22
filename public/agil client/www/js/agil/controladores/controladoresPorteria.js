angular.module('agil.controladores')
	.controller('ControladorPorteria', ['$scope', 'blockUI', '$localStorage', '$location', '$templateCache', '$window', 'ClasesTipoEmpresa',
		'ObtenerListaAusenciaPortero', 'Paginator', 'Diccionario', 'ActualizarSolicitudAsencia', 'ListarCargaHorarioRRHH','ObtenerSolicitudesAusenciaPortero', function ($scope, blockUI, $localStorage, $location, $templateCache, $window, ClasesTipoEmpresa,
			ObtenerListaAusenciaPortero, Paginator, Diccionario, ActualizarSolicitudAsencia, ListarCargaHorarioRRHH, ObtenerSolicitudesAusenciaPortero) {

			$scope.usuario = JSON.parse($localStorage.usuario);
			$scope.inicio = function () {
				$scope.date = new Date();
				$scope.estado = false
				$scope.mostrarFiltro = false
				$scope.ObtenerEstadosAusencias()
				$scope.listarCargaHorarioRRHH()
			}
			$scope.$on('$viewContentLoaded', function () {
				blockUI.start();
				resaltarPestaña($location.path().substring(1));
				ejecutarScriptsPorteria();
				//$scope.buscarAplicacion($scope.usuarioSesion.aplicacionesUsuario, $location.path().substring(1));
				blockUI.stop();
			});
			$scope.mostrarFiltrosBusqueda = function () {
				$scope.mostrarFiltro ? false : true
			}
			$scope.ListaDeAusenciasPaginada = function (filtro) {
				$scope.paginator = Paginator();
				$scope.paginator.column = "id";
				$scope.paginator.direction = "asc";
				$scope.paginator.itemsPerPage = '10';
				if (filtro != undefined) {
					$scope.filtro = filtro
					$scope.filtro.fecha = new Date()
				} else {
					$scope.filtro = {
						empresa: $scope.usuario.id_empresa,
						fecha: new Date(),
						estado: ""
					}
				}
				$scope.paginator.callBack = $scope.obtenerListaAusencia;
				$scope.paginator.getSearch("", $scope.filtro, null);


			}
			$scope.obtenerListaAusencia = function () {
				blockUI.start()
				var promesa = ObtenerListaAusenciaPortero($scope.paginator)
				promesa.then(function (datos) {
					blockUI.stop()
					$scope.paginator.setPages(datos.paginas);
					$scope.ausencias = datos.ausencias
					var bandera = false
					$scope.ausencias.forEach(function (x, index, array) {
						var fecha = moment($scope.fechaATexto(new Date()), "DD/MM/YYYY").format("YYYY-MM-DD");
						var fecha_inicio = moment($scope.fechaATexto(x.fecha_inicio), "DD/MM/YYYY").format("YYYY-MM-DD");
						if (new Date(fecha) <= new Date(fecha_inicio)) {
							if (x.sin_ingreso) {
								x.estado = $scope.estadosDeAusencias.clases.find(function (x) {
									return x.nombre_corto == "SAL"
								})
								var promesa = ActualizarSolicitudAsencia(x)
								promesa.then(function (dato) {
								})
							}
							// if (x.sin_retorno) {
							// 	x.estado = $scope.estadosDeAusencias.clases.find(function (x) {
							// 		return x.nombre_corto == "SAL"
							// 	})
							// }
						} else {
							if (x.sin_ingreso) {
								x.estado = $scope.estadosDeAusencias.clases.find(function (x) {
									return x.nombre_corto == "SAL"
								})
								$scope.guardarSalidaDesdeSistema(x)
							// } else if (x.estado.nombre_corto == "SAL") {
							// 	$scope.guardarSalidaDesdeSistema(x)
							// } else if (x.estado.nombre_corto == 'AUT') {
							// 	x.eliminado = true
							// 	var promesa = ActualizarSolicitudAsencia(x)
							// 	promesa.then(function (dato) {
							// 	})
							}
							bandera = true
						}
						if (index === (array.length - 1)) {
							if (bandera) {
								// $scope.ListaDeAusenciasPaginada()
							}
						}
					});

				})
			}
			$scope.guardarSalidaDesdeSistema = function (x) {
				x.estado = $scope.estadosDeAusencias.clases.find(function (x) {
					return x.nombre_corto == "RTR"
				})
				var fechaInicio = new Date(x.fecha_inicio);
				var fechaFin = new Date(x.fecha_inicio);
				var datosHoras = x.ficha.cargaHorario.horario.hora_fin.split(":")
				fechaFin.setHours(datosHoras[0], datosHoras[1], datosHoras[2], 00);
				var fecha1 = moment('"' + fechaInicio.getFullYear() + '-' + parseInt(fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate() + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
				var fecha2 = moment('"' + fechaFin.getFullYear() + '-' + parseInt(fechaFin.getMonth() + 1) + '-' + fechaFin.getDate() + " " + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
				x.horas = convertirSegundosATiempo(fecha2.diff(fecha1, 's')); // Diff in hours
				var horas = parseInt(x.horas.split(':')[0])
				var minutos = parseInt(x.horas.split(':')[1])
				x.fecha_inicio = new Date(x.fecha_inicio);
				x.fecha_fin = moment(x.fecha_inicio).add(horas, 'hours').format('YYYY-MM-DD HH:mm:ss');
				x.fecha_fin = moment(x.fecha_fin).add(minutos, 'minutes').format('YYYY-MM-DD HH:mm:ss');
				x.fecha_fin = new Date(x.fecha_fin)
				fecha1 = moment('"' + fechaInicio.getFullYear() + '-' + parseInt(fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate() + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
				fecha2 = moment('"' + fechaFin.getFullYear() + '-' + parseInt(fechaFin.getMonth() + 1) + '-' + fechaFin.getDate() + " " + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
				x.horas = convertirSegundosATiempo(fecha2.diff(fecha1, 's'));
				var promesa = ActualizarSolicitudAsencia(x)
				promesa.then(function (dato) {
				})
			}
			$scope.ObtenerEstadosAusencias = function () {
				blockUI.start();
				var promesa = ClasesTipoEmpresa("RRHH_EDA", $scope.usuario.id_empresa);
				promesa.then(function (entidad) {
					$scope.estadosDeAusencias = entidad
					console.log(entidad)
					$scope.ListaDeAusenciasPaginada()
					blockUI.stop();
				});
			}
			$scope.registrarSalidaSolicitud = function (ausencia) {
				ausencia.id_portero_salida = $scope.usuario.id
				ausencia.estado = $scope.estadosDeAusencias.clases.find(function (x) {
					return x.nombre_corto == "SAL"
				})
				if (ausencia.sin_retorno == true) {
					ausencia.fecha_fin = new Date()
					var datosHoras = ausencia.ficha.cargaHorario.horario.hora_fin.split(":")
					ausencia.fecha_fin.setHours(datosHoras[0], datosHoras[1], datosHoras[2], 00);
					ausencia.estado = $scope.estadosDeAusencias.clases.find(function (x) {
						return x.nombre_corto == "RTR"
					})
				}
				ausencia.fecha_inicio = new Date();
				$scope.GuardarAusencia(ausencia)

			}
			$scope.registrarRetornoSolicitud = function (ausencia) {
				ausencia.id_portero_retorno = $scope.usuario.id
				ausencia.estado = $scope.estadosDeAusencias.clases.find(function (x) {
					return x.nombre_corto == "RTR"
				})
				if (ausencia.fecha_inicio && ausencia.fecha_fin) {
					ausencia.fecha_fin = new Date()
					var fechaInicio = new Date(ausencia.fecha_inicio);
					var fechaFin = new Date()//ausencia.fecha_fin;
					var fecha1 = moment('"' + fechaInicio.getFullYear() + '-' + parseInt(fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate() + " " + fechaInicio.getHours() + ":" + fechaInicio.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
					var fecha2 = moment('"' + fechaFin.getFullYear() + '-' + parseInt(fechaFin.getMonth() + 1) + '-' + fechaFin.getDate() + " " + fechaFin.getHours() + ":" + fechaFin.getMinutes() + ":00", "YYYY-MM-DD HH:mm:ss");
					ausencia.horas = convertirSegundosATiempo(fecha2.diff(fecha1, 's'));
				}
				$scope.GuardarAusencia(ausencia)
			}
			$scope.GuardarAusencia = function (ausencia) {
				blockUI.start()
				if (ausencia.eliminado == false) {
					ausencia.id_portero = $scope.usuario.id_portero
				}
				var promesa = ActualizarSolicitudAsencia(ausencia)
				promesa.then(function (dato) {
					$scope.mostrarMensaje(dato.mensaje)
					$scope.ListaDeAusenciasPaginada()
					blockUI.stop();
				})
			}
			$scope.listarCargaHorarioRRHH = function () {
				var promesa = ListarCargaHorarioRRHH($scope.usuario.id_empresa)
				promesa.then(function (datos) {
					$scope.configuracionesCargaHorario = datos
				})
			}

			$scope.ListaSolicitudesAusenciasPaginada = function (filtro) {
				$scope.paginatorSolicitud = Paginator();
				$scope.paginatorSolicitud.column = "id";
				$scope.paginatorSolicitud.direction = "asc";
				$scope.paginatorSolicitud.itemsPerPage = 10;
				if (filtro != undefined) {
					$scope.filtroSolicitud = filtro
					$scope.filtroSolicitud.fecha = new Date()
				} else {
					$scope.filtroSolicitud = {
						empresa: $scope.usuario.id_empresa,
						fecha: new Date(),
						estado: ""
					}
				}
				$scope.paginatorSolicitud.callBack = $scope.obtenerListaAusenciaSolicitudes;
				$scope.paginatorSolicitud.getSearch("", $scope.filtroSolicitud, null);


			}
			$scope.obtenerListaAusenciaSolicitudes = function () {
				blockUI.start()
				var promesa = ObtenerSolicitudesAusenciaPortero($scope.paginatorSolicitud)
				promesa.then(function (datos) {
					blockUI.stop()
					$scope.paginatorSolicitud.setPages(datos.paginas);
					$scope.ausenciasSolicitudes = datos.ausencias

				})
			}

			$scope.inicio()
		}])