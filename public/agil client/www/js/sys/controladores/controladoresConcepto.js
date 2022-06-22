angular.module('agil.controladores')

	.controller('ControladorConceptos', function ($scope, $location, $localStorage, $templateCache, $route, blockUI, Tipos, TiposEmpresa, ListaTiposEmpresa, Sucursales, Diccionario,
		OtenerListaHerenciasTipo, ObtenerListaHerenciaClasesTipo, SweetAlert) {

		blockUI.start();

		$scope.usuarioSesion = JSON.parse($localStorage.usuario);
		$scope.idModalWizardConceptoEdicion = 'modal-wizard-concepto-edicion';
		$scope.idModalContenedorConceptoEdicion = 'modal-wizard-container-concepto-edicion';


		$scope.inicio = function () {
			$scope.obtenerTipos();
			$scope.diccionario = Diccionario
			setTimeout(function () {
				ejecutarScriptsTabla('tabla-conceptos', 2);
			}, 2000);
		}

		$scope.obtenerTipos = function () {
			blockUI.start();
			var idEmpresa = $scope.usuarioSesion.id_empresa ? $scope.usuarioSesion.id_empresa : 0;
			var promesa = ListaTiposEmpresa(idEmpresa);
			promesa.then(function (tipos) {
				$scope.tipos = tipos;
				blockUI.stop();
			});
		}

		$scope.$on('$viewContentLoaded', function () {
			resaltarPestaña($location.path().substring(1));
			ejecutarScriptsConcepto($scope.idModalWizardConceptoEdicion, $scope.idModalContenedorConceptoEdicion);
			$scope.buscarAplicacion($scope.usuarioSesion.aplicacionesUsuario, $location.path().substring(1));
			blockUI.stop();
		});

		$scope.crearNuevoConcepto = function () {
			$scope.tipo = new TiposEmpresa({ clases: [] });
			$scope.abrirPopup($scope.idModalWizardConceptoEdicion);
		}

		$scope.cerrarPopPupNuevo = function () {
			$scope.cerrarPopup($scope.idModalWizardConceptoEdicion);
		}

		$scope.agregarClase = function (clase) {
			clase.habilitado = true
			clase.eliminado = false
			if (clase.nombre && clase.nombre_corto) {
				if (!clase.id) {
					$scope.tipo.clases.push(clase);
				}
				$scope.clase = {}
			}
		}
		$scope.editarClase = function (clase) {
			clase.edit = false
			$scope.clase = {}
		}
		$scope.modificarClase = function (clase) {
			$scope.clase = clase;
			$scope.clase.edit = true
		}

		$scope.removerClase = function (clase) {
			clase.eliminado = true;
		}
		$scope.activarClase = function (clase) {
			clase.eliminado = false;
		}
		$scope.modificarConcepto = function (tipo) {
			$scope.tipo = tipo;
			$scope.clase = {};
			if ($scope.tipo.usar_herencia) {
				$scope.obtenerListaTiposHerencia()
			}
			$scope.abrirPopup($scope.idModalWizardConceptoEdicion);
		}

		$scope.stepWizard = function (step) {
			$('#' + $scope.idModalWizardConceptoEdicion).wizard('selectedItem', {
				step: step
			});
		}

		$scope.initialWizard = function () {
			$('[data-step=1]').trigger("click");
		}

		$scope.saveForm = function (tipo) {
			var button = $('#siguiente').text().trim();
			if (button != "Siguiente") {
				blockUI.start();
				if ($scope.usuario.id_empresa) {
					tipo.id_empresa = $scope.usuario.id_empresa
				}
				if (tipo.id) {
					Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
						blockUI.stop();
						$scope.initialWizard();
						$scope.cerrarPopPupNuevo();
						// $scope.mostrarMensaje('Guardado Exitosamente!');
						SweetAlert.swal("Guardado!", 'Guardado Exitosamente!', "success");
						// $scope.recargarItemsTabla();
						$scope.obtenerTipos();
					});
				} else {
					tipo.$save(function (tipo) {
						blockUI.stop();
						$scope.initialWizard();
						$scope.cerrarPopPupNuevo();
						// $scope.mostrarMensaje('Guardado Exitosamente!');
						SweetAlert.swal("Guardado!", 'Guardado Exitosamente!', "success");
						// $scope.recargarItemsTabla();
						$scope.obtenerTipos();
					}, function (error) {
						blockUI.stop();
						$scope.cerrarPopPupNuevo();
						SweetAlert.swal("", "Ocurrio un problema al eliminar!", "error");
						$scope.recargarItemsTabla();
					});
				}
			}
		}

		$scope.$on('$routeChangeStart', function (next, current) {
			$scope.eliminarPopup($scope.idModalWizardConceptoEdicion);
		});
		$scope.importarSucursales = function (clases) {
			let promesa = Sucursales($scope.usuario.id_empresa)
			promesa.then(function (dato) {
				$scope.sucursales = dato
				/* $scope.sucursales.forEach(function(sucursal,index,array){
					
				}); */

				for (let i = 0; i < dato.length; i++) {
					let sucursal = dato[i];
					let encontrado = false
					for (let j = 0; j < clases.length; j++) {
						let clase = clases[j];
						if (sucursal.nombre == clase.nombre) {
							encontrado = true;
							clase.habilitado = sucursal.activo
						}

					}
					if (!encontrado) {
						let clase = { nombre: sucursal.nombre, nombre_corto: sucursal.nombre }
						clase.habilitado = sucursal.activo
						clases.push(clase)
					}
				}
			})
		}
		$scope.obtenerListaTiposHerencia = function () {
			if ($scope.tipo.usar_herencia) {
				var promesa = OtenerListaHerenciasTipo($scope.usuario.id_empresa)
				promesa.then(function (data) {
					$scope.listaDeTiposHerencia = data.tipos
				})
			}
		}
		$scope.seleccinarClasesTipo = function (idTipo) {
			var promesa = ObtenerListaHerenciaClasesTipo(idTipo)
			promesa.then(function (data) {
				$scope.listaDeClasesTipoHerencia = data.ClasesTipo
			})
		}
		$scope.inicio();
	});



