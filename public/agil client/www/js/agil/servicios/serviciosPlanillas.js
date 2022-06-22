angular.module('agil.servicios')

	.factory('Parametro', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-parametros/:idEmpresa", { idEmpresa: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('Parametros', ['Parametro', '$q', function (Parametro, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			Parametro.get({ idEmpresa: idEmpresa }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RecursosHumanosFichasEmpleados', ['$resource', function ($resource) {
		return $resource(restServer + "recursos-humanos-fichas/empleados/:idEmpresa/gestion/:gestion/mes/:mes", { idEmpresa: '@id' });
	}])

	.factory('RecursosHumanosEmpleados', ['RecursosHumanosFichasEmpleados', '$q', function (RecursosHumanosFichasEmpleados, $q) {
		var res = function (idEmpresa, gestion, mes) {
			var delay = $q.defer();
			RecursosHumanosFichasEmpleados.get({ idEmpresa: idEmpresa, gestion: gestion, mes: mes }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RecursosHumanosHorasEmpleados', ['$resource', function ($resource) {
		return $resource(restServer + "recursos-humanos/horas-extra/empleado-sueldo/:id_ficha/gestion/:gestion/mes/:mes/empleado/:id_empleado");
	}])

	.factory('RecursosHumanosEmpleadosHorasExtras', ['RecursosHumanosHorasEmpleados', '$q', function (RecursosHumanosHorasEmpleados, $q) {
		var res = function (idFicha, gestion, mes, idEmpleado) {
			var delay = $q.defer();
			RecursosHumanosHorasEmpleados.get({ id_ficha: idFicha, gestion: gestion, mes: mes, id_empleado: idEmpleado }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RecursosHumanosPlanillaSueldos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-sueldos/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RecursosHumanosPlanillaCargaSociales', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-cargas-sociales/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RRHHPlanillaSueldos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-sueldos/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaSueldos', ['RRHHPlanillaSueldos', '$q', function (RRHHPlanillaSueldos, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RRHHPlanillaSueldos.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RRHHPlanillaCargaSocial', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-cargas-sociales/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaCargaSocial', ['RRHHPlanillaCargaSocial', '$q', function (RRHHPlanillaCargaSocial, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RRHHPlanillaCargaSocial.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RecursosHumanosPlanillaRCIVA', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-rc-iva/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RRHHPlanillaRCIVARuta', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-rc-iva/valid/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaRCIVA', ['RRHHPlanillaRCIVARuta', '$q', function (RRHHPlanillaRCIVARuta, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RRHHPlanillaRCIVARuta.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaRRHHPlanillaRCIVA', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-rc-iva/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('ListaRRHHPlanillaRCIVA', ['RutaRRHHPlanillaRCIVA', '$q', function (RutaRRHHPlanillaRCIVA, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RutaRRHHPlanillaRCIVA.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaRcIvaDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-rc-iva/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaRcIvaDetalle', ['RutaPlanillaRcIvaDetalle', '$q', function (RutaPlanillaRcIvaDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaRcIvaDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaSueldoDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-sueldo/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaSueldosDetalle', ['RutaPlanillaSueldoDetalle', '$q', function (RutaPlanillaSueldoDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaSueldoDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaPlanillaCSDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-carga-social/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaCSDetalle', ['RutaPlanillaCSDetalle', '$q', function (RutaPlanillaCSDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaCSDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RRHHEmpleadosSubsidios', ['$resource', function ($resource) {
		return $resource(restServer + "recursos-humanos-fichas/empleados-subsidios/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaRRHHEmpleadosSubsidios', ['RRHHEmpleadosSubsidios', '$q', function (RRHHEmpleadosSubsidios, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RRHHEmpleadosSubsidios.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RecursosHumanosPlanillaSubsidios', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-subsidio/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RRHHPlanillaSubsidios', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-subsidios/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaSubsidios', ['RRHHPlanillaSubsidios', '$q', function (RRHHPlanillaSubsidios, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RRHHPlanillaSubsidios.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaSubsidiosDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-subsidio/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaSubsidiosDetalle', ['RutaPlanillaSubsidiosDetalle', '$q', function (RutaPlanillaSubsidiosDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaSubsidiosDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('PlanillaSubsidioActualizacion', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-subsidio/planilla/:id_planilla", { id_planilla: '@id_planilla' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('PlanillaSubsidioActualizacion', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-subsidio/planilla/:id_planilla", { id_planilla: '@id_planilla' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ReporteExcelOVT', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-ovt/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaOVT', ['ReporteExcelOVT', '$q', (ReporteExcelOVT, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelOVT.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelOVTAguinaldos', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-ovt/aguinaldos/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaOVTAguinaldos', ['ReporteExcelOVTAguinaldos', '$q', (ReporteExcelOVTAguinaldos, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelOVTAguinaldos.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelAFPFUTURO', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-afp/futuro/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaAFPFUTURO', ['ReporteExcelAFPFUTURO', '$q', (ReporteExcelAFPFUTURO, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelAFPFUTURO.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ReporteExcelSiatRCIVA', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-siat-rciva/rciva/:id_planilla");
	}])
	.factory('ReporteExcelPlanillaSiatRcIva', ['ReporteExcelSiatRCIVA', '$q', (ReporteExcelSiatRCIVA, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelSiatRCIVA.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelAFPPREVISION', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-afp/prevision/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaAFPPREVISION', ['ReporteExcelAFPPREVISION', '$q', (ReporteExcelAFPPREVISION, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelAFPPREVISION.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('Tr3PlanillaSueldo', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldo/tr3/empresa/:id_empresa");
	}])

	.factory('GuardarTr3PlanillaSueldo', ['Tr3PlanillaSueldo', '$q', function (Tr3PlanillaSueldo, $q) {
		var res = function (tr3, idEmpresa) {
			var delay = $q.defer();
			Tr3PlanillaSueldo.save({ id_empresa: idEmpresa }, tr3, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('Tr3PlanillaAguinaldo', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-aguinaldo/tr3/empresa/:id_empresa");
	}])

	.factory('GuardarTr3PlanillaAguinaldo', ['Tr3PlanillaAguinaldo', '$q', function (Tr3PlanillaAguinaldo, $q) {
		var res = function (tr3, idEmpresa) {
			var delay = $q.defer();
			Tr3PlanillaAguinaldo.save({ id_empresa: idEmpresa }, tr3, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaTr3PSueldo', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldo/tr3/empresa/:id_empresa/banco/:nombre", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaTr3PlanillaSueldo', ['ListaTr3PSueldo', '$q', function (ListaTr3PSueldo, $q) {
		var res = function (id_empresa, nombre) {
			var delay = $q.defer();
			ListaTr3PSueldo.query({ id_empresa: id_empresa, nombre: nombre }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaTr3PAguinaldo', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-aguinaldo/tr3/empresa/:id_empresa/banco/:nombre", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaTr3PlanillaAguinaldo', ['ListaTr3PAguinaldo', '$q', function (ListaTr3PAguinaldo, $q) {
		var res = function (id_empresa, nombre) {
			var delay = $q.defer();
			ListaTr3PAguinaldo.query({ id_empresa: id_empresa, nombre: nombre }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RecursosHumanosFichasEmpleadosRCIVA', ['$resource', function ($resource) {
		return $resource(restServer + "recursos-humanos-fichas/empleados/rc-iva/:idEmpresa/gestion/:gestion/mes/:mes", { idEmpresa: '@id' });
	}])

	.factory('RecursosHumanosEmpleadosRCIVA', ['RecursosHumanosFichasEmpleadosRCIVA', '$q', function (RecursosHumanosFichasEmpleadosRCIVA, $q) {
		var res = function (idEmpresa, gestion, mes) {
			var delay = $q.defer();
			RecursosHumanosFichasEmpleadosRCIVA.get({ idEmpresa: idEmpresa, gestion: gestion, mes: mes }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutasFichasEmpleadosPlanillas', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldos/generar-planilla-aguinaldo/gestion/:gestion/dias/:dias/empresa/:id_empresa");
	}])

	.factory('FichasEmpleadosPlanillasSueldos', ['RutasFichasEmpleadosPlanillas', '$q', function (RutasFichasEmpleadosPlanillas, $q) {
		var res = function (gestion, dias, id_empresa) {
			var delay = $q.defer();
			RutasFichasEmpleadosPlanillas.get({ gestion: gestion, dias: dias, id_empresa: id_empresa }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VerificarTr3AntesdeCompro', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldos/verificar-tr3/planilla/:id_planilla/banco/:id_banco");
	}])

	.factory('VerificarTr3AntesdeComprobante', ['VerificarTr3AntesdeCompro', '$q', function (VerificarTr3AntesdeCompro, $q) {
		var res = function (planillaId, bancoId) {
			var delay = $q.defer();
			VerificarTr3AntesdeCompro.get({ id_planilla: planillaId, id_banco: bancoId }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VerificarTr3AntiAntesdeCompro', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-anticipos/verificar-tr3/planilla/:id_planilla/banco/:id_banco");
	}])

	.factory('VerificarTr3AntiAntesdeComprobante', ['VerificarTr3AntiAntesdeCompro', '$q', function (VerificarTr3AntiAntesdeCompro, $q) {
		var res = function (planillaId, bancoId) {
			var delay = $q.defer();
			VerificarTr3AntiAntesdeCompro.get({ id_planilla: planillaId, id_banco: bancoId }, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RRHHPlanillaAguinaldos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-aguinaldos/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RutaPlanillaAguinaldos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-aguinaldos/:id_empresa/gestion/:gestion");
	}])

	.factory('RRHHlistaPlanillaAguinaldos', ['RutaPlanillaAguinaldos', '$q', function (RutaPlanillaAguinaldos, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RutaPlanillaAguinaldos.get({ id_empresa: id_empresa, gestion: gestion }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaAguinaldoDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-aguinaldos/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaAguinaldosDetalle', ['RutaPlanillaAguinaldoDetalle', '$q', function (RutaPlanillaAguinaldoDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaAguinaldoDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaSueldosCargas', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldos/generar-planilla-cargas/empresa/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaSueldosCS', ['RutaPlanillaSueldosCargas', '$q', function (RutaPlanillaSueldosCargas, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RutaPlanillaSueldosCargas.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaGenerarPlanillaIncrementos', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldos/generar-planilla-incrementos/gestion/:gestion/empresa/:id_empresa");
	}])

	.factory('GenerarPlanillaIncrementos', ['RutaGenerarPlanillaIncrementos', '$q', function (RutaGenerarPlanillaIncrementos, $q) {
		var res = function (gestion, id_empresa) {
			var delay = $q.defer();
			RutaGenerarPlanillaIncrementos.get({gestion: gestion,  id_empresa: id_empresa }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RRHHPlanillaIncrementos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-incrementos/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RutaPlanillaIncrementos', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-incrementos/:id_empresa/gestion/:gestion");
	}])

	.factory('RRHHlistaPlanillaIncrementos', ['RutaPlanillaIncrementos', '$q', function (RutaPlanillaIncrementos, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RutaPlanillaIncrementos.get({ id_empresa: id_empresa, gestion: gestion }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaIncrementoDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-incrementos/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaIncrementoDetalle', ['RutaPlanillaIncrementoDetalle', '$q', function (RutaPlanillaIncrementoDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaIncrementoDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaActualizarFichas', ['$resource', function ($resource) {
		return $resource(restServer + "actualizar-sueldos/rrhh-planilla-incrementos");
	}])

	.factory('ActualizarSueldosEmpleados', ['rutaActualizarFichas', '$q', function (rutaActualizarFichas, $q) {
		var res = function (empleados) {
			var delay = $q.defer();
			rutaActualizarFichas.save(empleados, function (empleados) {
				delay.resolve(empleados);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaGenerarPlanillaRetroactivas', ['$resource', function ($resource) {
		return $resource(restServer + "planilla-sueldos/generar-planilla-retroactivas/gestion/:gestion/mes/:mes/empresa/:id_empresa");
	}])

	.factory('GenerarPlanillaRetroactivas', ['RutaGenerarPlanillaRetroactivas', '$q', function (RutaGenerarPlanillaRetroactivas, $q) {
		var res = function (gestion, mes, id_empresa) {
			var delay = $q.defer();
			RutaGenerarPlanillaRetroactivas.get({gestion: gestion, mes: mes,  id_empresa: id_empresa }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RRHHPlanillaRetroActivas', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-retroactivas/:id_empresa", { id_empresa: '@id_empresa' }, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('RutaPlanillaRetroActivas', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-retroactivas/:id_empresa/gestion/:gestion/mes/:mes");
	}])

	.factory('RRHHlistaPlanillaRetroActivas', ['RutaPlanillaRetroActivas', '$q', function (RutaPlanillaRetroActivas, $q) {
		var res = function (id_empresa, gestion, mes) {
			var delay = $q.defer();
			RutaPlanillaRetroActivas.get({ id_empresa: id_empresa, gestion: gestion, mes: mes }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaPlanillaRetroActivasDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "rrhh-planilla-retroactivas/detalle/:id_planilla");
	}])

	.factory('ListaPlanillaRetroActivasDetalle', ['RutaPlanillaRetroActivasDetalle', '$q', function (RutaPlanillaRetroActivasDetalle, $q) {
		var res = function (id_planilla) {
			var delay = $q.defer();
			RutaPlanillaRetroActivasDetalle.get({ id_planilla: id_planilla }, function (planillas) {
				delay.resolve(planillas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelAFPFUTURORetroActivas', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-afp/futuro/retroactivas/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaRetroActivasAFPFUTURO', ['ReporteExcelAFPFUTURORetroActivas', '$q', (ReporteExcelAFPFUTURORetroActivas, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelAFPFUTURORetroActivas.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelAFPPREVISIONRetroActivas', ['$resource', ($resource) => {
		return $resource(restServer + "recursos-humanos/reporte-excel-afp/prevision/retroactivas/:id_planilla");
	}])

	.factory('ReporteExcelPlanillaRetroActivasAFPPREVISION', ['ReporteExcelAFPPREVISIONRetroActivas', '$q', (ReporteExcelAFPPREVISIONRetroActivas, $q) => {
		const res = (planillaId) => {
			const delay = $q.defer();
			ReporteExcelAFPPREVISIONRetroActivas.get({ id_planilla: planillaId }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteExcelOVTPlanillaRetroActivas', ['$resource', ($resource) => {
		return $resource(restServer + "rrhh-planilla-retroactivas/ovt/empresa/:id_empresa/gestion/:gestion");
	}])

	.factory('ReporteExcelPlanillaRetroActivasOVT', ['ReporteExcelOVTPlanillaRetroActivas', '$q', (ReporteExcelOVTPlanillaRetroActivas, $q) => {
		const res = (id_empresa, gestion) => {
			const delay = $q.defer();
			ReporteExcelOVTPlanillaRetroActivas.get({ id_empresa: id_empresa, gestion: gestion }, (entidades) => {
				delay.resolve(entidades);
			}, (err) => {
				delay.reject(err);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaViajesRolTurnosEmpleados', ['$resource', function ($resource) {
		return $resource(restServer + "empleados-viajes/horas-extra/:id_ficha/gestion/:gestion/mes/:mes/empleado/:id_empleado/campos/:campos");
	}])

	.factory('RecursosHumanosViajesRolTurnosEmpleados', ['RutaViajesRolTurnosEmpleados', '$q', function (RutaViajesRolTurnosEmpleados, $q) {
		var res = function (idFicha, gestion, mes, idEmpleado, idsCampos) {
			var delay = $q.defer();
			RutaViajesRolTurnosEmpleados.get({ id_ficha: idFicha, gestion: gestion, mes: mes, id_empleado: idEmpleado, campos: idsCampos}, function (parametros) {
				delay.resolve(parametros);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])