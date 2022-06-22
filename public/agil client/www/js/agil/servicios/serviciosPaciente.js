angular.module('agil.servicios')

    .factory('PacienteActivo',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/:id_paciente/activo/:activo", { id_paciente: '@id_paciente', activo: '@activo' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('Paciente',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/:id_paciente", { id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('Comentario',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/:id_paciente/comentario", { id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('DatosPacientes', ['Paciente', '$q', function (Paciente, $q) {
        var res = function () {
            var delay = $q.defer();
            Paciente.get(function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('PacientesEmpresaPaginador',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado/apellido/:apellido");
    }])

    .factory('PacientesPaginador', ['PacientesEmpresaPaginador', '$q', function (PacientesEmpresaPaginador, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            paginator.filter.cargo=(paginator.filter.cargo)?paginator.filter.cargo:0
            paginator.filter.campo=(paginator.filter.campo)?paginator.filter.campo:0
            PacientesEmpresaPaginador.get({
                id_empresa: paginator.filter.empresa,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
                codigo: paginator.filter.codigo,
                nombres: paginator.filter.nombres,
                ci: paginator.filter.ci,
                campo: paginator.filter.campo,
                cargo: paginator.filter.cargo,
                busquedaEmpresa: paginator.filter.busquedaEmpresa,
                estado: paginator.filter.estado,
                grupo_sanguineo: paginator.filter.grupo_sanguineo,
                apellido:0

            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RiesgoLaboral',  ['$resource',function ($resource) {
        return $resource(restServer + "/empleados/riesgo/cargo/:id_empresa/:id_cargo", null, {
            'update': { method: 'PUT' }
        });
    }])

    .factory('CrearRiesgosLaborales', ['RiesgoLaboral', '$q',  (RiesgoLaboral, $q) => {
        const res = (riesgo, id_empresa) =>
        {
            const delay = $q.defer();
            RiesgoLaboral.save({id_empresa:id_empresa, id_cargo: 0}, riesgo, (entidades) => {
                delay.resolve(entidades);
            }, (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ActualizarRiesgoLaboral', ['RiesgoLaboral', '$q', function (RiesgoLaboral, $q) {
        var res = function (riesgo, id_empresa) {
            var delay = $q.defer();
            RiesgoLaboral.update({id_empresa:id_empresa, id_cargo: 0}, riesgo, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ObtenerRiesgosLaborales', ['RiesgoLaboral', '$q',  (RiesgoLaboral, $q) => {
        const res =  (id_cargo,id_empresa) => 
        {
            const delay = $q.defer();
            RiesgoLaboral.get({
                id_empresa:id_empresa, id_cargo:id_cargo
            },  (entidades) => {
                delay.resolve(entidades);
            },  (error) => {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('PacientesEmpresaPreRequisito',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/empresa/:id_empresa/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado",
        {
            'update': { method:'PUT' }
        });
    }])

    .factory('PacientesPreRequisito', ['PacientesEmpresaPreRequisito', '$q', function (PacientesEmpresaPreRequisito, $q) {
        const res = function (empresa,codigo,nombres,ci,campo,cargo,busquedaEmpresa,grupo_sanguineo,estado)//idEmpresa, xxx
        {
            var delay = $q.defer();
            PacientesEmpresaPreRequisito.get({
                id_empresa: empresa,
                codigo: codigo,
                nombres: nombres,
                ci: ci,
                campo: campo,
                cargo: cargo,
                busquedaEmpresa: busquedaEmpresa,
                estado: estado,
                grupo_sanguineo: grupo_sanguineo

            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('aplicacionVacunasPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/Vacunas/excel/upload")
    }])

    .factory('SOAPlistaPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/SOAP/excel/upload")
    }])

    .factory('SignosVitalesPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/signos_vitales/excel/upload")
    }])

    .factory('FichasTecnicasPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/ficha_tecnica/excel/upload")
    }])

    .factory('PacientesEmpresa',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/empresa/excel/upload")
    }])

    .factory('ListaPrerequisitos',  ['$resource',function ($resource) {
        return $resource(restServer + "prerequisitos",
            {
                'update': { method: 'PUT' }
            });
    }])

    // .factory('Paciente',  ['$resource',function ($resource) {
    //     return $resource(restServer + "paciente/:id_paciente", { id_paciente: '@id_paciente' },
    //         {
    //             'update': { method: 'PUT' }
    //         });
    // })

    .factory('obtenerPaciente', ['Paciente', '$q', function (Paciente, $q) {
        var res = function (idPaciente) {
            var delay = $q.defer();
            Paciente.get({ id_paciente: idPaciente }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ListaDatosPrerequisito', ['ListaPrerequisitos', '$q', function (ListaPrerequisitos, $q) {
        var res = function () {
            var delay = $q.defer();
            ListaPrerequisitos.get(function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaGeneros',  ['$resource',function ($resource) {
        return $resource(restServer + "generos",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaDatosGenero', ['ListaGeneros', '$q', function (ListaGeneros, $q) {
        var res = function () {
            var delay = $q.defer();
            ListaGeneros.query(function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaTiposControl',  ['$resource',function ($resource) {
        return $resource(restServer + "tipo-control/:id_empresa",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaDatosTiposControl', ['ListaTiposControl', '$q', function (ListaTiposControl, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            ListaTiposControl.query({id_empresa:id_empresa}, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('Prerequisito',  ['$resource',function ($resource) {
        return $resource(restServer + "prerequisitos/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('Prerequisitos', ['Prerequisito', '$q', function (Prerequisito, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            Prerequisito.get({id_empresa:id_empresa},function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PrerequisitosEmpleado',  ['$resource',function ($resource) {
        return $resource(restServer + "prerequisitos/cargos/:id_cargos?",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaPrerequisitosEmpleado', ['PrerequisitosEmpleado', '$q', function (PrerequisitosEmpleado, $q) {
        var res = function (cargosIds) {
            var delay = $q.defer();
            PrerequisitosEmpleado.get({id_cargos:cargosIds},function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PrerequisitosSave', ['Prerequisito', '$q', function (Prerequisito, $q) {
        var res = function (prerequisito, id_empresa) {
            var delay = $q.defer();
            Prerequisito.save({id_empresa: id_empresa}, prerequisito, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PrerequisitoHistorial',  ['$resource',function ($resource) {
        return $resource(restServer + "prerequisito/:id_pre/historial/:id_pac/inicio/:inicio/fin/:fin",{});
    }])

    .factory('PrerequisitosHistorial', ['PrerequisitoHistorial', '$q', function (PrerequisitoHistorial, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            PrerequisitoHistorial.get(datos, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('PrerequisitoPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "prerequisito/paciente", null,
        {
            'update': { method: 'PUT' }
        });
    }])
    .factory('GuardarPrerequisitoPaciente',  ['PrerequisitoPaciente', '$q', function (PrerequisitoPaciente, $q) {
        var res = function (prerequisito) {
            var delay = $q.defer();
            PrerequisitoPaciente.save(null, { 
                id: prerequisito.id,
                fecha_vencimiento:prerequisito.fecha_vencimiento,
                id_paciente: prerequisito.paciente , 
                id_prerequisito: prerequisito.prerequisito , 
                nueva_fecha_vencimiento: prerequisito.nueva_fecha_vencimiento , 
                nueva_fecha_entrega: prerequisito.nueva_fecha_entrega , 
                nueva_fecha_emision: prerequisito.nueva_fecha_emision , 
                nueva_observacion: prerequisito.nueva_observacion , 
                documento2: prerequisito.documento2 
             }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CrearPrerequisito', ['Prerequisito', '$q', function (Prerequisito, $q) {
        var res = function (id_paciente) {
            var delay = $q.defer();
            Prerequisito.save({ id_paciente: id_paciente }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarPrerequisito', ['Prerequisito', '$q', function (Prerequisito, $q) {
        var res = function (prerequisito) {
            var delay = $q.defer();
            Prerequisito.update({ id_paciente: 0 }, prerequisito, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('listaPrarequisitos',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-pre-requisito/empresa/:id_empresa/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaPrerequisitosEmpresa', ['listaPrarequisitos', '$q', function (listaPrarequisitos, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            listaPrarequisitos.get({ id_empresa: idEmpresa, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('listaAlertasPrarequisitosPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-pre-requisito-alertas/empresa/:id_empresa/:inicio/:fin/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:reporte", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaAlertasPrerequisitosPaciente', ['listaAlertasPrarequisitosPaciente', '$q', function (listaAlertasPrarequisitosPaciente, $q) {
        var res = function (idEmpresa, paginator, reporte) {
            var delay = $q.defer();
            listaAlertasPrarequisitosPaciente.get({ 
                id_empresa: idEmpresa,
                inicio: paginator.filter.inicio ? paginator.filter.inicio : 0, 
                fin: paginator.filter.fin ? paginator.filter.fin : 0,
                texto_busqueda: paginator.search,
                pagina: paginator.currentPage ? paginator.currentPage : 1,
                items_pagina: paginator.itemsPerPage ? paginator.itemsPerPage : 10,
                columna: paginator.column ? paginator.column : "fecha_vencimiento" ,
                direccion: paginator.direction ? paginator.direction : "desc",
                reporte: reporte ? 1 : 0
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('listaAlertasVacunas',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-vacunas-alertas/empresa/:id_empresa/:inicio/:fin/:vacuna/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:reporte", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaAlertasVacunasEmpresa', ['listaAlertasVacunas', '$q', function (listaAlertasVacunas, $q) {
        var res = function (idEmpresa, paginator, reporte) {
            var delay = $q.defer();
            listaAlertasVacunas.get({ 
                id_empresa: idEmpresa, 
                inicio: paginator.filter.inicio ? paginator.filter.inicio : 0, 
                fin: paginator.filter.fin ? paginator.filter.fin : 0,
                vacuna:paginator.filter.vacuna ? paginator.filter.vacuna : 0,
                texto_busqueda: paginator.search,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                columna: paginator.column,
                direccion: paginator.direction,
                reporte: reporte ? 1 : 0
            
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('listaVacunas',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-vacunas/empresa/:id_empresa/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaVacunasEmpresa', ['listaVacunas', '$q', function (listaVacunas, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            listaVacunas.get({ id_empresa: idEmpresa, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('listaPrarequisitosPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-pre-requisito/paciente/:id_paciente/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaPrerequisitosPaciente', ['listaPrarequisitosPaciente', '$q', function (listaPrarequisitosPaciente, $q) {
        var res = function (idPaciente, filtro) {
            var delay = $q.defer();
            listaPrarequisitosPaciente.get({ id_paciente: idPaciente, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoPacientepatologia',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-patologia/paciente/:id_paciente", { id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActualizarPatologiaPaciente', ['MedicoPacientepatologia', '$q', function (MedicoPacientepatologia, $q) {
        var res = function (idPaciente, ficha) {
            var delay = $q.defer();
            MedicoPacientepatologia.update({ id_paciente: idPaciente }, ficha, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('MedicoPacienteFicha',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-ficha/paciente/:id_paciente", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearMedicoPacienteFicha', ['MedicoPacienteFicha', '$q', function (MedicoPacienteFicha, $q) {
        var res = function (ficha) {
            var delay = $q.defer();
            MedicoPacienteFicha.save({ id_paciente: 0 }, ficha, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('BuscarFichaPaciente', ['MedicoPacienteFicha', '$q', function (MedicoPacienteFicha, $q) {
        var res = function (idPaciente) {
            var delay = $q.defer();
            MedicoPacienteFicha.get({ id_paciente: idPaciente }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('FichasMedicoPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "historial-ficha-medico-paciente/paciente/:id_paciente/inicio/:inicio/fin/:fin/tipo-control/:tipo_control", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialFichaMedicoPaciente', ['FichasMedicoPaciente', '$q', function (FichasMedicoPaciente, $q) {
        var res = function (idPaciente, filtro) {
            var delay = $q.defer();
            FichasMedicoPaciente.query({ id_paciente: idPaciente, inicio: filtro.inicio, fin: filtro.fin, tipo_control: filtro.tipo_control }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoPacienteConsulta',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-consulta", {},
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearMedicoPacienteConsulta', ['MedicoPacienteConsulta', '$q', function (MedicoPacienteConsulta, $q) {
        var res = function (consulta) {
            var delay = $q.defer();
            MedicoPacienteConsulta.save(consulta, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('DatosPrerequisitoPaciente', ['Prerequisito', '$q', function (Prerequisito, $q) {
        var res = function (id_paciente, paginator) {
            var delay = $q.defer();
            Prerequisito.query({
                id_paciente: id_paciente, pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                busqueda: paginator.search,
                inicio: paginator.filter.fecha_inicio,
                fin: paginator.filter.fecha_fin,
                columna: paginator.column,
                direccion: paginator.direction
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ListaConsultaPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-consulta/paciente/:id_paciente/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ListaConsultasMedicoPaciente', ['ListaConsultaPaciente', '$q', function (ListaConsultaPaciente, $q) {
        var res = function (id_paciente, filtro) {
            var delay = $q.defer();
            ListaConsultaPaciente.get({
                id_paciente: id_paciente,
                inicio: filtro.inicio,
                fin: filtro.fin
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('prerequisitoFiltro',  ['$resource',function ($resource) {
        return $resource(restServer + "cotizacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/importe/:importe/busqueda/:busqueda/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('filtroPrerequisitos', ['prerequisitoFiltro', '$q', function (prerequisitoFiltro, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            prerequisitoFiltro.get({
                id_empresa: paginator.filter.empresa,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                busqueda: paginator.search,
                inicio: paginator.filter.fecha_inicio,
                fin: paginator.filter.fecha_fin,
                columna: paginator.column,
                direccion: paginator.direction
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('asignacionPacienteVacuna',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/vacuna/asignacion/:id_paciente/:id_vacuna", null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('AsignarVacunasPaciente', ['asignacionPacienteVacuna', '$q', function (asignacionPacienteVacuna, $q) {
        var res = function (id_paciente, id_vacuna) {
            var delay = $q.defer();
            asignacionPacienteVacuna.update({ id_paciente: id_paciente, id_vacuna:id_vacuna }, null , function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GuardarAplicacionVacuna',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/vacuna/aplicacion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('AplicacionPacienteVacuna', ['GuardarAplicacionVacuna', '$q', function (GuardarAplicacionVacuna, $q) {
        var res = function (id, fecha_aplicacion, comentario) {
            var delay = $q.defer();
            prom = GuardarAplicacionVacuna.update({}, {id, fecha_aplicacion, comentario}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PacienteVacuna',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/vacuna/:id_paciente", { id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])

    // .factory('PacienteVacunaAsignar',  ['$resource',function ($resource) {
    //     return $resource(restServer + "/paciente/vacuna/", { id_paciente: '@id_paciente' },
    //         {
    //             'update': { method: 'PUT' }
    //         });
    // })

    .factory('VacunasPaciente', ['PacienteVacuna', '$q', function (PacienteVacuna, $q) {
        var res = function (id) {
            var delay = $q.defer();
            PacienteVacuna.get({ id_paciente: id }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('Vacunas',  ['$resource',function ($resource) {
        return $resource(restServer + "vacunas/:id", { id: '@id' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('Vacuna',  ['$resource',function ($resource) {
        return $resource(restServer + "vacunas", {},
            {
                'update': { method: 'PUT' }
            });
    }])



    // .factory('crearVacuna', ['datosVacunas', '$q', function (datosVacunas, $q) {
    //     var res = function (paciente) {
    //         var delay = $q.defer();
    //         datosVacunas.save({ id_paciente: id_paciente }, function (entidades) {
    //             delay.resolve(entidades);
    //         }, function (error) {
    //                 delay.reject(error);
    //             });
    //         return delay.promise;
    //     };
    //     return res;
    // }])

    // rutas laboratorio inicio
    .factory('MedicoLaboratorio',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-laboratorio/empresa/:id_empresa", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearLaboratorio', ['MedicoLaboratorio', '$q', function (MedicoLaboratorio, $q) {
        var res = function (idEmpresa, laboratorio) {
            var delay = $q.defer();
            MedicoLaboratorio.save({ id_empresa: idEmpresa }, laboratorio, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarLaboratorio', ['MedicoLaboratorio', '$q', function (MedicoLaboratorio, $q) {
        var res = function (idEmpresa, laboratorio) {
            var delay = $q.defer();
            MedicoLaboratorio.save({ id_empresa: idEmpresa }, laboratorio, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarLaboratorio', ['MedicoLaboratorio', '$q', function (MedicoLaboratorio, $q) {
        var res = function (idEmpresa, laboratorio) {
            var delay = $q.defer();
            MedicoLaboratorio.update({ id_empresa: idEmpresa }, laboratorio, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaLaboratorios', ['MedicoLaboratorio', '$q', function (MedicoLaboratorio, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            MedicoLaboratorio.query({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoLaboratorioExamen',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-laboratorio-examen/laboratorio/:id_laboratorio/paciente/:paciente", { id_laboratorio: '@id_laboratorio' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearLaboratorioExamen', ['MedicoLaboratorioExamen', '$q', function (MedicoLaboratorioExamen, $q) {
        var res = function (idLaboratorio, examen, paciente) {
            var delay = $q.defer();
            MedicoLaboratorioExamen.save({ id_laboratorio: idLaboratorio, paciente:paciente }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarLaboratorioExamen', ['MedicoLaboratorioExamen', '$q', function (MedicoLaboratorioExamen, $q) {
        var res = function (idLaboratorio, examen, paciente) {
            var delay = $q.defer();
            MedicoLaboratorioExamen.save({ id_laboratorio: idLaboratorio, paciente:paciente }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarLaboratorioExamen', ['MedicoLaboratorioExamen', '$q', function (MedicoLaboratorioExamen, $q) {
        var res = function (idLaboratorio, examen) {
            var delay = $q.defer();
            MedicoLaboratorioExamen.update({ id_laboratorio: idLaboratorio }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaLaboratorioExamenes', ['MedicoLaboratorioExamen', '$q', function (MedicoLaboratorioExamen, $q) {
        var res = function (idLaboratorio, paciente) {
            var delay = $q.defer();
            MedicoLaboratorioExamen.query({ id_laboratorio: idLaboratorio, paciente: paciente ? paciente : 0 }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoLaboratorioExamenResultado',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-laboratorio-resultado/laboratorio/:id_laboratorio/paciente/:id_paciente", { id_laboratorio: '@id_laboratorio', id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearLaboratorioExamenResultado', ['MedicoLaboratorioExamenResultado', '$q', function (MedicoLaboratorioExamenResultado, $q) {
        var res = function (idLaboratorio, idPaciente, datos) {
            var delay = $q.defer();
            MedicoLaboratorioExamenResultado.save({ id_laboratorio: idLaboratorio, id_paciente: idPaciente }, datos, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('LaboratorioExamenHistorial',  ['$resource',function ($resource) {
        return $resource(restServer + "laboratorio-resultado/laboratorio/:id_laboratorio/paciente/:id_paciente/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('LaboratorioExamenListaHistorial', ['LaboratorioExamenHistorial', '$q', function (LaboratorioExamenHistorial, $q) {
        var res = function (idLaboratorio, idPaciente, filtro) {
            var delay = $q.defer();
            LaboratorioExamenHistorial.query({ id_laboratorio: idLaboratorio, id_paciente: idPaciente, inicio: filtro.inicio, fin: filtro.fin }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    // rutas laboratorio fin
    .factory('MedicoDiagnostico',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-diagnostico/empresa/:id_empresa", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearDiagnostico', ['MedicoDiagnostico', '$q', function (MedicoDiagnostico, $q) {
        var res = function (idEmpresa, diagnostico) {
            var delay = $q.defer();
            MedicoDiagnostico.save({ id_empresa: idEmpresa }, diagnostico, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarDiagnostico', ['MedicoDiagnostico', '$q', function (MedicoDiagnostico, $q) {
        var res = function (idEmpresa, diagnostico) {
            var delay = $q.defer();
            MedicoDiagnostico.save({ id_empresa: idEmpresa }, diagnostico, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarDiagnostico', ['MedicoDiagnostico', '$q', function (MedicoDiagnostico, $q) {
        var res = function (idEmpresa, Diagnostico) {
            var delay = $q.defer();
            MedicoDiagnostico.update({ id_empresa: idEmpresa }, Diagnostico, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaDiagnosticos', ['MedicoDiagnostico', '$q', function (MedicoDiagnostico, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            MedicoDiagnostico.query({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoDiagnosticoExamen',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-diagnostico-examen/diagnostico/:id_diagnostico", { id_diagnostico: '@id_diagnostico' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearDiagnosticoExamen', ['MedicoDiagnosticoExamen', '$q', function (MedicoDiagnosticoExamen, $q) {
        var res = function (idDiagnostico, examen) {
            var delay = $q.defer();
            MedicoDiagnosticoExamen.save({ id_diagnostico: idDiagnostico }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarDiagnosticoExamen', ['MedicoDiagnosticoExamen', '$q', function (MedicoDiagnosticoExamen, $q) {
        var res = function (idDiagnostico, examen) {
            var delay = $q.defer();
            MedicoDiagnosticoExamen.save({ id_diagnostico: idDiagnostico }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarDiagnosticoExamen', ['MedicoDiagnosticoExamen', '$q', function (MedicoDiagnosticoExamen, $q) {
        var res = function (idDiagnostico, examen) {
            var delay = $q.defer();
            MedicoDiagnosticoExamen.update({ id_diagnostico: idDiagnostico }, examen, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaDiagnosticoExamenes', ['MedicoDiagnosticoExamen', '$q', function (MedicoDiagnosticoExamen, $q) {
        var res = function (idDiagnostico, idPaciente) {
            var delay = $q.defer();
            MedicoDiagnosticoExamen.query({ id_diagnostico: idDiagnostico }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MedicoDiagnosticoExamenResultado',  ['$resource',function ($resource) {
        return $resource(restServer + "nuevo-diagnostico-resultado/diagnostico/:id_diagnostico/paciente/:id_paciente", { id_diagnostico: '@id_diagnostico', id_paciente: '@id_paciente' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearDiagnosticoExamenResultado', ['MedicoDiagnosticoExamenResultado', '$q', function (MedicoDiagnosticoExamenResultado, $q) {
        var res = function (idDiagnostico, idPaciente, datos) {
            var delay = $q.defer();
            MedicoDiagnosticoExamenResultado.save({ id_diagnostico: idDiagnostico, id_paciente: idPaciente }, datos, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('DiagnosticoExamenHistorial',  ['$resource',function ($resource) {
        return $resource(restServer + "diagnostico-resultado/diagnostico/:id_diagnostico/paciente/:id_paciente/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('DiagnosticoExamenListaHistorial', ['DiagnosticoExamenHistorial', '$q', function (DiagnosticoExamenHistorial, $q) {
        var res = function (idDiagnostico, idPaciente, filtro) {
            var delay = $q.defer();
            DiagnosticoExamenHistorial.query({ id_diagnostico: idDiagnostico, id_paciente: idPaciente, inicio: filtro.inicio, fin: filtro.fin }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ActivarLaboratorio',  ['$resource',function ($resource) {
        return $resource(restServer + "laboratorio/activar/:id_laboratorio", { id_laboratorio: '@id_laboratorio' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('rutaFichaMedicaPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "ficha-medica/paciente/:id_paciente", null, {
            'update': { method: 'PUT' }
        });
    }])
    
    .factory('ActualizarFichaMedicaPaciente', ['rutaFichaMedicaPaciente', '$q', function (rutaFichaMedicaPaciente, $q) {
        var res = function (ficha) {
            var delay = $q.defer();
            rutaFichaMedicaPaciente.update({id_paciente:0}, ficha, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RutaConsultaPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente-consulta/paciente/:id_ficha_medica", null,
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('ConsultaMedicoPaciente', ['RutaConsultaPaciente', '$q', function (RutaConsultaPaciente, $q) {
        var res = function (id_ficha_medica) {
            var delay = $q.defer();
            RutaConsultaPaciente.get({
                id_ficha_medica: id_ficha_medica
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarConsultaMedicaPaciente', ['RutaConsultaPaciente', '$q', function (RutaConsultaPaciente, $q) {
        var res = function (id_ficha_medica, ficha) {
            var delay = $q.defer();
            RutaConsultaPaciente.update({id_ficha_medica: id_ficha_medica}, ficha, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('FichaMedica',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente/ficha/:id_ficha_medica", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerFichaMedica', ['FichaMedica', '$q', function (FichaMedica, $q) {
        var res = function (id) {
            var delay = $q.defer();
            FichaMedica.get({
                id_ficha_medica: id
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('FichaEmpleado',  ['$resource',function ($resource) {
        return $resource(restServer + "medico-paciente/ficha/:id_ficha_medica", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerFichaEmpleado', ['FichaEmpleado', '$q', function (FichaEmpleado, $q) {
        var res = function (id) {
            var delay = $q.defer();
            FichaEmpleado.get({
                id_ficha_medica: id
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('FichaMedicaCargo',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/ficha-medica/reportes/cargo/:busqueda/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GetCargoByName', ['FichaMedicaCargo', '$q', function (FichaMedicaCargo, $q) {
        var res = function (busqueda, id) {
            var delay = $q.defer();
            FichaMedicaCargo.query({
                busqueda: busqueda,
                id_empresa: id
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('FichaMedicaCampo',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/ficha-medica/reportes/campo/:busqueda/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GetCampoByName', ['FichaMedicaCampo', '$q', function (FichaMedicaCampo, $q) {
        var res = function (busqueda, id) {
            var delay = $q.defer();
            FichaMedicaCampo.query({
                busqueda: busqueda,
                id_empresa: id
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('FichaMedicaData',  ['$resource',function ($resource) {
        return $resource(restServer + 'paciente/ficha-medica/reportes/data/:id_empresa/:tipo_control/:inicio/:fin/:nombres/:cargo/:campo/:estado/:grupo_sanguineo/:tipo', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GetDataReporteFichaMedica', ['FichaMedicaData', '$q', function (FichaMedicaData, $q) {
        var res = function (filtro, id, tipo) {
            var delay = $q.defer();
            FichaMedicaData.get({
                id_empresa: id,
                tipo_control: filtro.tipo_control ? filtro.tipo_control.id : 0,
                inicio: filtro.inicio ? filtro.inicio.split("/").reverse().join("-") + " 00:00:00" : 0,
                fin: filtro.fin ? filtro.fin.split("/").reverse().join("-") + " 23:59:59" : 0,
                nombres: filtro.nombres ? filtro.nombres : 0,
                cargo: filtro.cargo ? filtro.cargo : 0,
                campo: filtro.campo ? filtro.campo.id : 0,
                estado: filtro.estado == "Activo" ? 1 : filtro.estado == "Inactivo" ? 0 : 'NA',
                grupo_sanguineo: filtro.grupo_sanguineo == "0"? 0 : filtro.grupo_sanguineo,
                tipo: tipo
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('AlertasPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/alertas/:id_empresa', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GetNumberAlerts', ['AlertasPacientes', '$q', function (AlertasPacientes, $q) {
        var res = function (id) {
            var delay = $q.defer();
            AlertasPacientes.get({ id_empresa: id }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('VacunaPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/paciente_vacuna/:id_paciente_vacuna', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GetVacunaPaciente', ['VacunaPaciente', '$q', function (VacunaPaciente, $q) {
        var res = function (id) {
            var delay = $q.defer();
            VacunaPaciente.get({ id_paciente_vacuna: id }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('ConfigAlertasPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/alertas/config/:id_empresa', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarConfigAlertas', ['ConfigAlertasPacientes', '$q', function (ConfigAlertasPacientes, $q) {
        var res = function (dias, tipo, id) {
            var delay = $q.defer();
            ConfigAlertasPacientes.save({ id_empresa: id }, { dias:dias, tipo: tipo}, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ConfigAlertasPacientes',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/alertas/config/:id_empresa/:tipo', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerConfigAlertas', ['ConfigAlertasPacientes', '$q', function (ConfigAlertasPacientes, $q) {
        var res = function (id, tipo) {
            var delay = $q.defer();
            ConfigAlertasPacientes.get({ 
                id_empresa: id,
                tipo: tipo
             }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('ListVacunas',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/lista/:id_empresa', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetListVacunas', ['ListVacunas', '$q', function (ListVacunas, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            ListVacunas.get({id_empresa: id_empresa}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('VacunaDosis',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/dosis/:id_vacuna', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetVacunaDosis', ['VacunaDosis', '$q', function (VacunaDosis, $q) {
        var res = function (id_vacuna) {
            var delay = $q.defer();
            VacunaDosis.get({id_vacuna: id_vacuna}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    // GUARDAR VACUNA
    .factory('PacientesVacuna',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/save', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('SaveVacuna', ['PacientesVacuna', '$q', function (PacientesVacuna, $q) {
        var res = function (vacuna) {
            var delay = $q.defer();
            PacientesVacuna.save(null, vacuna, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EliminarPacientesVacuna',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/delete/:id', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('DeleteVacuna', ['EliminarPacientesVacuna', '$q', function (EliminarPacientesVacuna, $q) {
        var res = function (id, eliminar) {
            var delay = $q.defer();
            EliminarPacientesVacuna.update({id:id}, {eliminado: eliminar}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EliminarPacientesVacunaDosis',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/delete/vacuna/:id_vacuna/dosis/:id_dosis', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('DeleteDosis', ['EliminarPacientesVacunaDosis', '$q', function (EliminarPacientesVacunaDosis, $q) {
        var res = function (id_vacuna, id_dosis) {
            var delay = $q.defer();
            EliminarPacientesVacunaDosis.update({
                id_vacuna:id_vacuna,
                id_dosis: id_dosis
            }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('ListVacunasPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/lista/:config/:id_empresa/:id_paciente', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetListVacunasPaciente', ['ListVacunasPaciente', '$q', function (ListVacunasPaciente, $q) {
        var res = function (config, id_paciente, id_empresa) {
            var delay = $q.defer();
            ListVacunasPaciente.get({
                config: config ? 1 : 0, 
                id_paciente: id_paciente, 
                id_empresa:id_empresa
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GetHistorialVacunas',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/aplicaciones/historial/:general/:id', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('HistorialVacuna', ['GetHistorialVacunas', '$q', function (GetHistorialVacunas, $q) {
        var res = function (id, general) {
            var delay = $q.defer();
            GetHistorialVacunas.get({
                general: general ? 1 : 0, 
                id: id
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('GetPacientePrerequisito',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisito/:id', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('PrerequisitoPacienteById', ['GetPacientePrerequisito', '$q', function (GetPacientePrerequisito, $q) {
        var res = function (id) {
            var delay = $q.defer();
            GetPacientePrerequisito.get({ id: id }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ReprogramacionPrerequisito',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/reprogramacion', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('ReprogramarPrerequisitoPaciente', ['ReprogramacionPrerequisito', '$q', function (ReprogramacionPrerequisito, $q) {
        var res = function (prerequisito) {
            var delay = $q.defer();
            ReprogramacionPrerequisito.update(null, prerequisito, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('ListPrerequisitosPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/lista/:config/:id_empresa/:id_paciente/:inicio/:fin', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetPrerequisitosPaciente', ['ListPrerequisitosPaciente', '$q', function (ListPrerequisitosPaciente, $q) {
        var res = function (id_paciente, config, id_empresa, filtro) {
            var delay = $q.defer();
            ListPrerequisitosPaciente.get({
                config: config ? 1 : 0, 
                id_empresa:id_empresa,
                id_paciente: id_paciente,
                inicio: filtro && filtro.inicio ? filtro.inicio : 0,
                fin: filtro && filtro.fin ? filtro.fin : 0,
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('asignacionPacientePrerequisito',  ['$resource',function ($resource) {
        return $resource(restServer + "paciente/prerequisito/asignacion/:id_paciente/:id_prerequisito", null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('AsignarPrerequisitoPaciente', ['asignacionPacientePrerequisito', '$q', function (asignacionPacientePrerequisito, $q) {
        var res = function (id_paciente, id_prerequisito) {
            var delay = $q.defer();
            asignacionPacientePrerequisito.update({ id_paciente: id_paciente, id_prerequisito:id_prerequisito }, null , function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EliminarPacientesPrerequisito',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/delete/:id', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('DeletePrerequisito', ['EliminarPacientesPrerequisito', '$q', function (EliminarPacientesPrerequisito, $q) {
        var res = function (id) {
            var delay = $q.defer();
            EliminarPacientesPrerequisito.update({id:id}, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    
    .factory('PrerequisitosCargos',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/reporte/empresa/:id_empresa/:prerequisito/:epre/:cargo/:ecargo', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('ListaPrerequisitosCargos', ['PrerequisitosCargos', '$q', function (PrerequisitosCargos, $q) {
        var res = function (id_empresa, filtro) {
            var delay = $q.defer();
            PrerequisitosCargos.get({ 
                id_empresa:id_empresa,
                prerequisito: filtro.prerequisito ? filtro.prerequisito : 0 ,
                epre: filtro.ePre,
                cargo: filtro.cargo ? filtro.cargo : 0,
                ecargo:filtro.eCargo
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ReportesEntregaPrerequisitos',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/reportes/:id_empresa/:inicio/:fin/:eempleado/:prerequisito/:cargo/:campo/:epre/:ecargo/:ecampo/:id_paciente', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('ListaPrerequisitosEntregas', ['ReportesEntregaPrerequisitos', '$q', function (ReportesEntregaPrerequisitos, $q) {
        var res = function (id_empresa, filtro, id_paciente) {
            var delay = $q.defer();
            ReportesEntregaPrerequisitos.get({ 
                id_empresa:id_empresa,
                inicio: filtro.inicio ? filtro.inicio : 0,
                fin: filtro.fin ? filtro.fin : 0,
                eempleado: filtro.eEmpleados ? filtro.eEmpleados : false,
                prerequisito: filtro.prerequisito ? filtro.prerequisito : 0 ,
                cargo: filtro.cargo ? filtro.cargo : 0,
                campo: filtro.campo ? filtro.campo : 0,
                epre: filtro.ePre ? filtro.ePre : false,
                ecargo:filtro.eCargo ? filtro.eCargo : false, 
                ecampo: filtro.eCampo ? filtro.eCampo : false,
                id_paciente: id_paciente ? id_paciente : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    
    .factory('CamposPaciente',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/prerequisitos/reporte/campos/:tipo/:id_empresa', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetCamposEmpresa', ['CamposPaciente', '$q', function (CamposPaciente, $q) {
        var res = function (tipo, id_empresa) {
            var delay = $q.defer();
            CamposPaciente.get({ 
                tipo:tipo,
                id_empresa:id_empresa
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('ConfigVacunaProducto',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/producto/config/:id_empresa', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GuardarConfiguracionVacunaProducto', ['ConfigVacunaProducto', '$q', function (ConfigVacunaProducto, $q) {
        var res = function (config, id_empresa) {
            var delay = $q.defer();
            ConfigVacunaProducto.save({id_empresa:id_empresa},{ 
                grupo:config.grupo,
                subgrupo:config.subGrupo,
                id_empresa: id_empresa
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ObtenerConfiguracionVacunaProducto', ['ConfigVacunaProducto', '$q', function (ConfigVacunaProducto, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            ConfigVacunaProducto.get({ id_empresa: id_empresa}, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('EliminarConfigVacunaProducto', ['ConfigVacunaProducto', '$q', function (ConfigVacunaProducto, $q) {
        var res = function (id_empresa, eliminar) {
            var delay = $q.defer();
            ConfigVacunaProducto.update({ id_empresa: id_empresa}, { eliminar: eliminar}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('VacunaProductosEmpresa',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/producto/lista/:id_empresa', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('ObtenerProductosVacuna', ['VacunaProductosEmpresa', '$q', function (VacunaProductosEmpresa, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            VacunaProductosEmpresa.get( {id_empresa: id_empresa}, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    
    /// OBTIENE LOS PRODUCTOS ASIGNADOS DE UNA VACUNA
    .factory('VacunaProductos',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/producto/:id', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetVacunaProductos', ['VacunaProductos', '$q', function (VacunaProductos, $q) {
        var res = function (id) {
            var delay = $q.defer();
            VacunaProductos.get( {id: id}, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('VacunaProducto',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacuna/productos/:id', null,
            { 'update': { method: 'PUT' } });
    }])

    // MODIFICA EL ESTADO DE LA VACUNA PRODUCTO (ELIMINADO)}
    .factory('EliminarVacunaProducto', ['VacunaProducto', '$q', function (VacunaProducto, $q) {
        var res = function (id, eliminado) {
            var delay = $q.defer();
            VacunaProducto.update({ id: id}, { eliminado: eliminado}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    /// OBTIENE LOS EMPLEADOS Y VACUNAS PARA LA PROYECCIÓN
    .factory('VacunaProyeccion',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/vacunas/proyeccion/:id_empresa', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetVacunaProyeccion', ['VacunaProyeccion', '$q', function (VacunaProyeccion, $q) {
        var res = function (id) {
            var delay = $q.defer();
            VacunaProyeccion.get( {id_empresa: id}, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    // OBTIENE DATOS PARA REPORTE DE LABORATORIOS PDF
    .factory('ReporteLaboratorio',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/laboratorio/reportes/:id_paciente/:id_examen', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetPacienteLaboratorios', ['ReporteLaboratorio', '$q', function (ReporteLaboratorio, $q) {
        var res = function (id_paciente, id_examen) {
            var delay = $q.defer();
            ReporteLaboratorio.get( {
                id_paciente,
                id_examen: id_examen ? id_examen : 0
            }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    // OBTIENE CONSULTAS DEL PACIENTE
    .factory('ReporteConsulta',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/consulta/reportes/:id_paciente', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('ObtenerConsultasPaciente', ['ReporteConsulta', '$q', function (ReporteConsulta, $q) {
        var res = function (id_paciente) {
            var delay = $q.defer();
            ReporteConsulta.get( { id_paciente }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    // OBTIENE DATOS PARA REPORTE DE DIAGNOSTICOS PDF
    .factory('ReporteDiagnostico',  ['$resource',function ($resource) {
        return $resource(restServer + 'pacientes/diagnostico/reportes/:id_paciente/:id_examen', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetPacienteDiagnosticos', ['ReporteDiagnostico', '$q', function (ReporteDiagnostico, $q) {
        var res = function (id_paciente, id_examen) {
            var delay = $q.defer();
            ReporteDiagnostico.get( {
                id_paciente,
                id_examen: id_examen ? id_examen : 0
            }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    // OBTIENE DATOS PARA LOS REPORTES GENERALES DE LABORATORIOS, CONSULTAS Y DIAGNOSTICOS
    .factory('ReporteGeneral',  ['$resource',function ($resource) {
        return $resource(restServer + 'paciente/reportes/general/:id_empresa/:id_tipo/:inicio/:fin/:nombres/:cargo/:campo/:estado/:formato/:tipo', null,
            { 'update': { method: 'PUT' } });
    }])
    .factory('GetDataReporteGeneralPacientes', ['ReporteGeneral', '$q', function (ReporteGeneral, $q) {
        var res = function (filtro, id_empresa, formato, tipo) {
            var delay = $q.defer();
            ReporteGeneral.get( {
                id_empresa,
                id_tipo: filtro.tipo ? filtro.tipo.id : 0,
                inicio: filtro.inicio ? filtro.inicio.split("/").reverse().join("-") + " 00:00:00" : 0,
                fin: filtro.fin ? filtro.fin.split("/").reverse().join("-") + " 23:59:59" : 0,
                nombres: filtro.nombres ? filtro.nombres : 0,
                cargo: filtro.cargo ? filtro.cargo : 0,
                campo: filtro.campo ? filtro.campo.id : 0,
                estado: filtro.estado == "Activo" ? 0 : filtro.estado == "Inactivo" ? 1 : 'NA',
                formato: formato ? formato : 0,      // 1 => PDF, 2 => EXCEL
                tipo: tipo ? tipo : 0     // 1 => laboratorios, 2 => consultas, 3 => diagnosticos
            }, null, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    

    //Elimina el historico de laboratorio, consulta o diagnostico
    .factory('EliminarResultadoPacienteID',  ['$resource',function ($resource) {
        return $resource(restServer + "pacientes/resultados/historico/:id/:tipo", null, {
            'update': { method: 'PUT' }
        });
    }])

    .factory('EliminarHistoricoPaciente', ['EliminarResultadoPacienteID', '$q', function (EliminarResultadoPacienteID, $q) {
        var res = function (id, tipo) {
            var delay = $q.defer();
            EliminarResultadoPacienteID.update({id : id ? id : 0, tipo:tipo ? tipo : 0 }, {}, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])