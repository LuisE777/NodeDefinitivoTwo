angular.module('agil.servicios')



	.factory('IndexDbVerificarAutentificacionUsuarios', ['$q', function ($q) {
		var res = function () {
			var delay = $q.defer();
				delay.resolve({ autorizado: true });
			return delay.promise;
		};
		return res;
	}])
