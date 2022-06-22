angular.module('agil.controladores')
	.controller('Controlador404',['$scope', 'blockUI', '$localStorage', '$location', '$templateCache', '$window', 'CuentasPaginador', 'ContabilidadCuenta', 'CuentasClasificaciones', 'ClasesTipo', 'lasClasificaciones', 'losSaldos', 'losMovimientos', 'losTiposDeCuentas', 'lasOperacionesCalculos', 'CuentaContabilidad', function ($scope, blockUI, $localStorage, $location, $templateCache, $window, CuentasPaginador, ContabilidadCuenta, CuentasClasificaciones, ClasesTipo, lasClasificaciones, losSaldos, losMovimientos, losTiposDeCuentas, lasOperacionesCalculos, CuentaContabilidad) {

		$scope.usuario = JSON.parse($localStorage.usuario);
		$scope.inicio = function () {
		
		}

	}])