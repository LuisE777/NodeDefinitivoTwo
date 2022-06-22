angular.module('agil.servicios')

    .factory('UsuarioRhOtroSeguro', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-seguro/:id_seguro", { id_seguro: '@id_seguro' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('EliminarOtroSeguroRh', ['UsuarioRhOtroSeguro', '$q', function (UsuarioRhOtroSeguro, $q) {
        var res = function (seguro)//idEmpresa, xxx
        {
            var delay = $q.defer();
            UsuarioRhOtroSeguro.update({
                id_seguro: seguro.id
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('UsuarioRhfamiliar', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-familiar/:id_persona/familiar-relacion/:id_familiar", { id_persona: '@id_persona', id_familiar: "@id_familiar" },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('EliminarFamiliarRh', ['UsuarioRhfamiliar', '$q', function (UsuarioRhfamiliar, $q) {
        var res = function (familiar)//idEmpresa, xxx
        {
            var delay = $q.defer();
            UsuarioRhfamiliar.update({
                id_persona: familiar.persona.id, id_familiar: familiar.id,
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RecursosHumanosEmpresaPaginador', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado/apellido/:apellido/reguralizado/:reguralizado/area/:area");
    }])

    .factory('RecursosHumanosPaginador', ['RecursosHumanosEmpresaPaginador', '$q', function (RecursosHumanosEmpresaPaginador, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {

            var grupo_sanguineo = (paginator.filter.grupo_sanguineo == undefined) ? paginator.filter.grupo_sanguineo = 0 : paginator.filter.grupo_sanguineo
            var cargo = (paginator.filter.cargo == undefined) ? paginator.filter.cargo = 0 : paginator.filter.cargo
            var estado = (paginator.filter.estado == undefined) ? paginator.filter.estado = 0 : paginator.filter.estado
            var apellido = (paginator.filter.apellido == undefined) ? paginator.filter.apellido = 0 : paginator.filter.apellido
            var reguralizado = (paginator.filter.reguralizado == undefined) ? paginator.filter.reguralizado = 0 : paginator.filter.reguralizado
            var area = (paginator.filter.area == undefined) ? paginator.filter.area = 0 : paginator.filter.area
            var delay = $q.defer();
            RecursosHumanosEmpresaPaginador.get({
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
                cargo: cargo,
                busquedaEmpresa: paginator.filter.busquedaEmpresa,
                estado: estado,
                grupo_sanguineo: grupo_sanguineo,
                apellido: apellido,
                reguralizado: reguralizado,
                area: area != 0 ? area.id : area

            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('NuevoRecursoHumano', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/:id_usuario", { id_usuario: '@id_usuario' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('UsuarioRhActivo', ['$resource', function ($resource) {
        return $resource(restServer + "usuario-recurso-humano/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('UsuarioRecursosHUmanosActivo', ['UsuarioRhActivo', '$q', function (UsuarioRhActivo, $q) {
        var res = function (empleado)//idEmpresa, xxx
        {
            var delay = $q.defer();
            UsuarioRhActivo.update({
                id_empleado: empleado.id
            }, empleado, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('obtenerEmpleadoRh', ['NuevoRecursoHumano', '$q', function (NuevoRecursoHumano, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            NuevoRecursoHumano.get({ id_usuario: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('UsuarioRhFicha', ['$resource', function ($resource) {
        return $resource(restServer + "usuario-recurso-humano-ficha/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('UsuarioRecursosHumanosFicha', ['UsuarioRhFicha', '$q', function (UsuarioRhFicha, $q) {
        var res = function (idEmpleado)//idEmpresa, xxx
        {
            var delay = $q.defer();
            UsuarioRhFicha.get({
                id_empleado: idEmpleado
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('bitacoraFicha', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/bitacora-ficha/usuario/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarBitacoraFicha', ['bitacoraFicha', '$q', function (bitacoraFicha, $q) {
        var res = function (idEmpleado, bitacora)//idEmpresa, xxx
        {
            var delay = $q.defer();
            bitacoraFicha.save({
                id: idEmpleado
            }, bitacora, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('VerBitacoraFicha', ['bitacoraFicha', '$q', function (bitacoraFicha, $q) {
        var res = function (idFicha)//idEmpresa, xxx
        {
            var delay = $q.defer();
            bitacoraFicha.query({
                id: idFicha
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CrearEmpleadoFicha', ['UsuarioRhFicha', '$q', function (UsuarioRhFicha, $q) {
        var res = function (ficha) {
            var delay = $q.defer();
            UsuarioRhFicha.save({ id_empleado: 0 }, ficha, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('HistorialFicha', ['$resource', function ($resource) {
        return $resource(restServer + "usuario-ficha/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('UsuarioRhHistorialFicha', ['HistorialFicha', '$q', function (HistorialFicha, $q) {
        var res = function (idEmpleado)//idEmpresa, xxx
        {
            var delay = $q.defer();
            HistorialFicha.query({
                id_empleado: idEmpleado
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('UsuarioHojaVida', ['$resource', function ($resource) {
        return $resource(restServer + "usuario-hoja-vida/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerEmpleadoHojaVida', ['UsuarioHojaVida', '$q', function (UsuarioHojaVida, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            UsuarioHojaVida.get({ id_empleado: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarEmpleadoHojaVida', ['UsuarioHojaVida', '$q', function (UsuarioHojaVida, $q) {
        var res = function (idEmpleado, hojaVida) {
            var delay = $q.defer();
            UsuarioHojaVida.save({ id_empleado: idEmpleado }, hojaVida, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('Prestamo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/prestamo/empleado/:id_empleado/:id_empresa", { id_empleado: '@id_empleado', id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearPrestamo', ['Prestamo', '$q', function (Prestamo, $q) {
        var res = function (idEmpleado, idEmpresa, prestamo) {

            var delay = $q.defer();
            Prestamo.save({ id_empleado: idEmpleado, id_empresa: idEmpresa }, prestamo, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('HistorialPrestamos', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/prestamos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/plazo/:plazo/inicio/:inicio/fin/:fin/nombre/:nombre/cuenta-liquida/:cuentas_liquidas",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerListaPrestamo', ['HistorialPrestamos', '$q', function (HistorialPrestamos, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            HistorialPrestamos.get({ id_empresa: paginator.filter.empresa, pagina: paginator.currentPage, items_pagina: paginator.itemsPerPage, texto_busqueda: paginator.search, columna: paginator.column, direccion: paginator.direction, plazo: paginator.filter.plazo, inicio: paginator.filter.inicio, fin: paginator.filter.fin, nombre: paginator.filter.nombre, cuentas_liquidas: paginator.filter.cuentas_liquidas }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RolTurno', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/rolTurno/empleado/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])

    .factory('CrearRolTurno', ['RolTurno', '$q', function (RolTurno, $q) {
        var res = function (idEmpleado, rolTurno) {
            var delay = $q.defer();
            RolTurno.save({ id_empleado: idEmpleado }, rolTurno, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PagoPrestamo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/pago-prestamo/:id_prestamo/usuario/:id_usuario", { id_prestamo: '@id_prestamo', id_usuario: '@id_usuario' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearPagoPrestamo', ['PagoPrestamo', '$q', function (PagoPrestamo, $q) {
        var res = function (idUsuario, idPrestamo, pago) {
            var delay = $q.defer();
            PagoPrestamo.save({ id_prestamo: idPrestamo, id_usuario: idUsuario }, pago, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EditPrestamo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/prestamo/:id_prestamo", { id_prestamo: '@id_prestamo' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('EditarPrestamo', ['EditPrestamo', '$q', function (EditPrestamo, $q) {
        var res = function (prestamo) {
            var delay = $q.defer();
            EditPrestamo.update({ id_prestamo: prestamo.id }, prestamo, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/empleados/:id_empresa", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaEmpleadosRrhh', ['ListEmpleados', '$q', function (ListEmpleados, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ListEmpleados.get({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //Empleados bitacora
    .factory('FichasAltasBajasEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/fichas-empleados/:id_empresa/:inicio/:fin/tipo/:tipo", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaFichasAltasBajasEmpleados', ['FichasAltasBajasEmpleados', '$q', function (FichasAltasBajasEmpleados, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            FichasAltasBajasEmpleados.get({ id_empresa: idEmpresa, inicio: filtro.inicio, fin: filtro.fin, tipo: filtro.tipo }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    // Fin empleados Bitacora
    //Empleado bitacora ficha
    .factory('FichasAltasBajasEmpleadoIndividual', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/fichas-empleados/:id_empresa/:inicio/:fin/tipo/:tipo/:id_paciente", { id_empresa: '@id_empresa' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaFichasAltasBajasEmpleadoIndividual', ['FichasAltasBajasEmpleadoIndividual', '$q', function (FichasAltasBajasEmpleadoIndividual, $q) {
        var res = function (idEmpresa, filtro, id_empleado) {
            var delay = $q.defer();
            FichasAltasBajasEmpleadoIndividual.get({ 
                id_empresa: idEmpresa, 
                inicio: filtro && filtro.inicio || 0,
                fin: filtro && filtro.fin || 0,
                tipo: filtro && filtro.tipo || 3,
                id_paciente: id_empleado
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    // Fin empleado Bitacora ficha
    .factory('EmpleadoEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "empleados/empresa/excel/upload")
    }])
    .factory('GuardarEmpleadoEmpresaI', ['EmpleadoEmpresa', '$q', function (EmpleadoEmpresa, $q) {
        var res = function (pacientes,
            id_empresa,
            arregloSucursales,
            arregloCargo,
            arregloContrato,
            arregloExpedido,
            arregloSegurosSalud) {
            var delay = $q.defer();
            EmpleadoEmpresa.save(null, {
                id_empresa: id_empresa,
                pacientes: pacientes,
                arregloSucursales: arregloSucursales,
                arregloCargo: arregloCargo,
                arregloContrato: arregloContrato,
                arregloExpedido: arregloExpedido,
                arregloSegurosSalud: arregloSegurosSalud
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('FichasEmpleadoEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "fichas/empleados/empresa/excel/upload")
    }])
    .factory('FamiliaresEmpleadoEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "familiares/empleados/empresa/excel/upload")
    }])
    .factory('HorasExtra', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/horas-extra/empleado/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearHorasExtra', ['HorasExtra', '$q', function (HorasExtra, $q) {
        var res = function (idEmpleado, horasExtra) {
            var delay = $q.defer();
            HorasExtra.save({ id_empleado: idEmpleado }, horasExtra, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpleadoHorasExtra', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/horas-extra/empleado/:id_empleado/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialHorasExtra', ['EmpleadoHorasExtra', '$q', function (EmpleadoHorasExtra, $q) {
        var res = function (idEmpleado, filtro) {
            var delay = $q.defer();
            EmpleadoHorasExtra.query({ id_empleado: idEmpleado, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListRolTurnoEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/empresa/:id_empresa/rolTurno/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaRolTurnos', ['ListRolTurnoEmpleados', '$q', function (ListRolTurnoEmpleados, $q) {
        var res = function (idEmpresa, idEmpleado) {
            var delay = $q.defer();
            ListRolTurnoEmpleados.get({ id_empresa: idEmpresa, id_empleado: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListRolTurnoEmpleadosCalendario', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/empresa/:id_empresa/rolTurnoCalendario/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/grupo/:grupo/nombre/:nombre/campo/:campo", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaRolTurnosCalendario', ['ListRolTurnoEmpleadosCalendario', '$q', function (ListRolTurnoEmpleadosCalendario, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            ListRolTurnoEmpleadosCalendario.get({
                id_empresa: paginator.filter.empresa,
                inicio: paginator.filter.inicio2,
                fin: paginator.filter.fin2,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
                grupo: paginator.filter.grupo,
                nombre: paginator.filter.nombre,
                campo: paginator.filter.campo
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ValidarCodigoCuentaEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "validar-codigo-empleado/empresa/:id_empresa",
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CapacidadesEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recurso-humanos/capacidades/hoja-vida/:id_hoja_vida/inicio/:inicio/fin/:fin/tipo/:tipo", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('DatosCapacidadesImpresion', ['CapacidadesEmpleado', '$q', function (CapacidadesEmpleado, $q) {
        var res = function (filtro, idhojaVida) {
            var delay = $q.defer();
            CapacidadesEmpleado.get({ id_hoja_vida: idhojaVida, inicio: filtro.inicio, fin: filtro.fin, tipo: filtro.tipo }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ConfiguracionVacaciones', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/configuracion/vacacion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ConfiguracionesVacacion', ['ConfiguracionVacaciones', '$q', function (ConfiguracionVacaciones, $q) {
        var res = function () {
            var delay = $q.defer();
            ConfiguracionVacaciones.query(function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }]).factory('HistorialGestionVacacion', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/historial/gestion/vacacion/empleado/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialGestionesVacacion', ['HistorialGestionVacacion', '$q', function (HistorialGestionVacacion, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            HistorialGestionVacacion.query({ id: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarHistorialVacacion', ['HistorialGestionVacacion', '$q', function (HistorialGestionVacacion, $q) {
        var res = function (idEmpleado, historial) {
            var delay = $q.defer();
            HistorialGestionVacacion.save({ id: idEmpleado }, historial, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EmpleadoAnticipo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/anticipos/empleado/:id_ficha", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('NuevoAnticipoEmpleado', ['EmpleadoAnticipo', '$q', function (EmpleadoAnticipo, $q) {
        var res = function (ficha, datos) {
            var delay = $q.defer();
            EmpleadoAnticipo.save({ id_ficha: ficha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarAnticipoEmpleado', ['EmpleadoAnticipo', '$q', function (EmpleadoAnticipo, $q) {
        var res = function (id_ficha, datos) {
            var delay = $q.defer();
            EmpleadoAnticipo.update({ id_ficha: id_ficha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CrearEmpleadosAnticipos', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanoss/anticipos/empleados", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearNuevosAnticiposEmpleados', ['CrearEmpleadosAnticipos', '$q', function (CrearEmpleadosAnticipos, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            CrearEmpleadosAnticipos.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerPlanillaSueldo', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-planilla-sueldo/ficha/:id_ficha/gestion/:gestion/mes/:mes", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('RRHHPlanillaSueldo', ['ObtenerPlanillaSueldo', '$q', function (ObtenerPlanillaSueldo, $q) {
        var res = function (idFicha, gestion, mes) {
            var delay = $q.defer();
            ObtenerPlanillaSueldo.get({ id_ficha: idFicha, gestion: gestion, mes: mes }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EmpleadosAnticipos', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/anticipos/empleado/:id_ficha/inicio/:inicio/fin/:fin/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaAnticiposEmpleado', ['EmpleadosAnticipos', '$q', function (EmpleadosAnticipos, $q) {
        var res = function (filtro, id_ficha) {
            var delay = $q.defer();
            EmpleadosAnticipos.get({ id_ficha: id_ficha, inicio: filtro.inicio, fin: filtro.fin, id_empresa: filtro.id_empresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpleadoAusencia', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencia/empleado/:id_ficha", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('NuevaAusenciaEmpleado', ['EmpleadoAusencia', '$q', function (EmpleadoAusencia, $q) {
        var res = function (idFicha, datos) {
            var delay = $q.defer();
            EmpleadoAusencia.save({ id_ficha: idFicha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EmpleadoListaAusencias', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencias/empleado/:id_empleado/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/tipo/:tipo", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpleadoAusencias', ['EmpleadoListaAusencias', '$q', function (EmpleadoListaAusencias, $q) {
        var res = function (idEmpleado, filtro, tipo) {
            var delay = $q.defer();
            EmpleadoListaAusencias.query({ id_empleado: idEmpleado, inicio: filtro.inicio, fin: filtro.fin, tipo_ausencia: filtro.tipo_ausencia, tipo: tipo }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpresaListaAusencias', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencias/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/estado/:estado/tipo/:tipo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpresaEmpleadosAusencias', ['EmpresaListaAusencias', '$q', function (EmpresaListaAusencias, $q) {
        var res = function (paginator, tipo) {
            var delay = $q.defer();
            EmpresaListaAusencias.get({
                id_empresa: paginator.filter.id_empresa,
                inicio: paginator.filter.inicio2,
                fin: paginator.filter.fin2,
                tipo_ausencia: paginator.filter.tipo_ausencia,
                estado: paginator.filter.estado,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
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
    .factory('EmpresaListaAusenciasMed', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencias-med/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/estado/:estado/tipo/:tipo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpresaEmpleadosAusenciasMed', ['EmpresaListaAusenciasMed', '$q', function (EmpresaListaAusenciasMed, $q) {
        var res = function (paginator, tipo) {
            var delay = $q.defer();
            EmpresaListaAusenciasMed.get({
                id_empresa: paginator.filter.id_empresa,
                inicio: paginator.filter.inicio2,
                fin: paginator.filter.fin2,
                tipo_ausencia: paginator.filter.tipo_ausencia,
                estado: paginator.filter.estado,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
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
    //vacaciones

    .factory('PersonaAusencias', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencias/empresa/:id_empresa/id_ausencia/:id_ausencia", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpleadoAusencia', ['PersonaAusencias', '$q', function (PersonaAusencias, $q) {
        var res = function (idEmpresa, id_ausencia) {
            var delay = $q.defer();
            PersonaAusencias.query({
                id_empresa: idEmpresa,
                id_ausencia: id_ausencia

            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EmpleadoVacacion', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/vacacion/ficha/:id_ficha", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('NuevaVacacionEmpleado', ['EmpleadoVacacion', '$q', function (EmpleadoVacacion, $q) {
        var res = function (id_ficha, datos) {
            var delay = $q.defer();
            EmpleadoVacacion.save({ id_ficha: id_ficha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarVacacionEmpleadoRRHH', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/eliminar-vacacion/:id_vacacion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('EliminarVacacionEmpleado', ['EliminarVacacionEmpleadoRRHH', '$q', function (EliminarVacacionEmpleadoRRHH, $q) {
        var res = function (id_vacacion) {
            var delay = $q.defer();
            EliminarVacacionEmpleadoRRHH.save({ id_vacacion: id_vacacion }, {}, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpleadoListaVacaciones', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/vacacion/empleado/:id_empleado/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpleadoVacaciones', ['EmpleadoListaVacaciones', '$q', function (EmpleadoListaVacaciones, $q) {
        var res = function (idEmpleado, filtro) {
            var delay = $q.defer();
            EmpleadoListaVacaciones.query({ id_empleado: idEmpleado, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpresaListaVacaciones', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/vacacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/estado/:estado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialEmpresaVacaciones', ['EmpresaListaVacaciones', '$q', function (EmpresaListaVacaciones, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            EmpresaListaVacaciones.query({ id_empresa: idEmpresa, inicio: filtro.inicio, fin: filtro.fin, estado: filtro.estado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpresaVacacionGestiones', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/vacacion/empresa/:id_empresa/estado/:estado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerHistorialEmpresaVacacionGestiones', ['EmpresaVacacionGestiones', '$q', function (EmpresaVacacionGestiones, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            EmpresaVacacionGestiones.query({ id_empresa: idEmpresa, estado: filtro.estado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EmpresaFeriados', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/vacacion/feriados/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('NuevoFeriado', ['EmpresaFeriados', '$q', function (EmpresaFeriados, $q) {
        var res = function (idEmpresa, datos, feriadosEliminados) {
            var delay = $q.defer();
            EmpresaFeriados.save({ id_empresa: idEmpresa }, { feriados: datos, feriadosEliminados: feriadosEliminados }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ListaFeriados', ['EmpresaFeriados', '$q', function (EmpresaFeriados, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            EmpresaFeriados.query({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ClasesAusencias', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ausencia/clases/tipo/:tipo", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarClasesAusencias', ['ClasesAusencias', '$q', function (ClasesAusencias, $q) {
        var res = function (datos, tipo) {
            var delay = $q.defer();
            ClasesAusencias.save({ tipo: tipo }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('Tr3', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/tr3/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarTr3', ['Tr3', '$q', function (Tr3, $q) {
        var res = function (datos, id_empresa) {
            var delay = $q.defer();
            Tr3.save({ id_empresa: id_empresa }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaTr3', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/tr3/empresa/:id_empresa/banco/:nombre", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaTr3Empresa', ['ListaTr3', '$q', function (ListaTr3, $q) {
        var res = function (id_empresa, nombre) {
            var delay = $q.defer();
            ListaTr3.query({ id_empresa: id_empresa, nombre: nombre }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('UltimoRegistroTr3', ['$resource', function ($resource) {
        return $resource(restServer + "/recursos-humanos/ultimo-tr3/empresa/:id_empresa/banco/:nombre", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('UltimoRegistroTr3Empresa', ['UltimoRegistroTr3', '$q', function (UltimoRegistroTr3, $q) {
        var res = function (id_empresa, nombre) {
            var delay = $q.defer();
            UltimoRegistroTr3.get({ id_empresa: id_empresa, nombre: nombre }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('NuevoBeneficioSocial', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/beneficios/ficha/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('FiniquitoEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/beneficio/ficha/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearBeneficioSocial', ['NuevoBeneficioSocial', '$q', function (NuevoBeneficioSocial, $q) {
        var res = function (datos, idFicha) {
            var delay = $q.defer();
            NuevoBeneficioSocial.save({ id: idFicha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaBeneficiosEmpleado', ['NuevoBeneficioSocial', '$q', function (NuevoBeneficioSocial, $q) {
        var res = function (idFicha) {
            var delay = $q.defer();
            NuevoBeneficioSocial.query({ id: idFicha }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ObtenerFiniquitoEmpleado', ['FiniquitoEmpleado', '$q', function (FiniquitoEmpleado, $q) {
        var res = function (idFicha) {
            var delay = $q.defer();
            FiniquitoEmpleado.get({ id: idFicha }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ConfiguracionRopa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/configuracion-ropa-trabajo/cargo/:id_empresa?", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarConfiguracionRopaCargo', ['ConfiguracionRopa', '$q', function (ConfiguracionRopa, $q) {
        var res = function (datos, idCargo) {
            var delay = $q.defer();
            ConfiguracionRopa.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaConfiguracionRopaCargo', ['ConfiguracionRopa', '$q', function (ConfiguracionRopa, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            ConfiguracionRopa.query({ id_empresa: id_empresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ReporteConfiguracionRopa', ['$resource', function ($resource) {
        return $resource(restServer + "reporte/configuracion/ropa-trabajo/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('DatosReporteConfiguracionRopa', ['ReporteConfiguracionRopa', '$q', function (ReporteConfiguracionRopa, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ReporteConfiguracionRopa.query({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CargosEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/cargos/empleado/:id_ficha/:id_almacen", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaCargosEmpleado', ['CargosEmpleado', '$q', function (CargosEmpleado, $q) {
        var res = function (id_ficha, id_almacen) {
            var delay = $q.defer();
            CargosEmpleado.get({ id_ficha, id_almacen }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RopaTrabajoProductos', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/almacen/:id_almacen/productos/subgrupos/:subgrupos", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaRopaTrabajoProductos', ['RopaTrabajoProductos', '$q', function (RopaTrabajoProductos, $q) {
        var res = function (subgrupos, idalmacen) {
            var delay = $q.defer();
            RopaTrabajoProductos.query({ subgrupos: subgrupos, id_almacen: idalmacen }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CrearDotacionRopa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarDotacionRopa', ['CrearDotacionRopa', '$q', function (CrearDotacionRopa, $q) {
        var res = function (id_empleado, datos) {
            var delay = $q.defer();
            CrearDotacionRopa.save({ id_empleado: id_empleado }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('DotacionRopaActualizar', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/actualizar/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActualizarDotacionRopa', ['DotacionRopaActualizar', '$q', function (DotacionRopaActualizar, $q) {
        var res = function (id_empleado, datos) {
            var delay = $q.defer();
            DotacionRopaActualizar.update({ id_empleado: id_empleado }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('BuscarRopasTrabajoEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/empleado/:id_empleado/inicio/:inicio/fin/:fin", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaDotacionRopa', ['BuscarRopasTrabajoEmpleado', '$q', function (BuscarRopasTrabajoEmpleado, $q) {
        var res = function (id_empleado, filtro) {
            var delay = $q.defer();
            BuscarRopasTrabajoEmpleado.query({ id_empleado: id_empleado, inicio: filtro.inicio, fin: filtro.fin }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('EliminarDotacionRopa', ['CrearDotacionRopa', '$q', function (CrearDotacionRopa, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            CrearDotacionRopa.update({ id_empleado: 0 }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('BuscarRopasTrabajoEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/reportes/:id_empresa/:inicio/:fin/:campamento", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaDotacionRopaEmpresa', ['BuscarRopasTrabajoEmpresa', '$q', function (BuscarRopasTrabajoEmpresa, $q) {
        var res = function ( filtro, id_empresa) {
            var delay = $q.defer();
            BuscarRopasTrabajoEmpresa.get({
                id_empresa,
                inicio: filtro.inicio ? filtro.inicio : "0",
                fin: filtro.fin ? filtro.fin : "0",
                campamento: filtro.campo ? filtro.campo : "0",
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('FiltroRolTurno', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/empresa/:id_empresa/rolTurno/inicio/:inicio/fin/:fin/alerta/:alerta/grupo/:grupo/pagina/:pagina/items/:items_pagina/campo/:campo/texto_busqueda/:texto_busqueda/direccion/:direccion/columna/:columna", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaRolTurnosEmpresa', ['FiltroRolTurno', '$q', function (FiltroRolTurno, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            FiltroRolTurno.get({
                grupo: paginator.filter.grupo,
                campo: paginator.filter.campo,
                id_empresa: paginator.filter.empresa,
                inicio: paginator.filter.inicio,
                fin: paginator.filter.fin,
                alerta: paginator.filter.alerta,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ChoferesViaje', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/choferes/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaChoferesViaje', ['ChoferesViaje', '$q', function (ChoferesViaje, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ChoferesViaje.query({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ViajeRrhh', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/viaje/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarViajeRrhh', ['ViajeRrhh', '$q', function (ViajeRrhh, $q) {
        var res = function (datos, idEmpresa) {
            var delay = $q.defer();
            ViajeRrhh.save({ id_empresa: idEmpresa }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ViajesRrhh', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/viaje/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipoPasajero/:tipoPasajero/destino/:destino/vehiculo/:vehiculo/conductor/:conductor/tipoViaje/:tipoViaje/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaViajeRrhh', ['ViajesRrhh', '$q', function (ViajesRrhh, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            ViajesRrhh.get({
                id_empresa: paginator.filter.empresa,
                inicio: paginator.filter.inicio,
                fin: paginator.filter.fin,
                tipoPasajero: paginator.filter.tipoPasajero,
                destino: paginator.filter.destino,
                vehiculo: paginator.filter.vehiculo,
                conductor: paginator.filter.conductor,
                tipoViaje: paginator.filter.tipoViaje,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaViajesRrhh', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/viaje/empresa/:id_empresa/inicio/:inicio/fin/:fin/destino/:destino/vehiculo/:vehiculo/conductor/:conductor/relevo/:relevo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ViajeRrhhLista', ['ListaViajesRrhh', '$q', function (ListaViajesRrhh, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            ListaViajesRrhh.get({
                id_empresa: paginator.filter.empresa,
                inicio: paginator.filter.inicio,
                fin: paginator.filter.fin,
                destino: paginator.filter.destino,
                vehiculo: paginator.filter.vehiculo,
                conductor: paginator.filter.conductor,
                relevo: paginator.filter.relevo,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaBeneficioEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/beneficio/empresa/:id_empresa/tipo/:tipo/inicio/:inicio/fin/:fin/motivo/:motivo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('BeneficioEmpresa', ['ListaBeneficioEmpresa', '$q', function (ListaBeneficioEmpresa, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            ListaBeneficioEmpresa.get({
                id_empresa: paginator.filter.empresa,
                inicio: paginator.filter.inicio,
                fin: paginator.filter.fin,
                motivo: paginator.filter.motivo,
                tipo: paginator.filter.tipo,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('DatosFiniquitoBeneficio', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-finiquito/beneficio/:id_beneficio", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerDatosFiniquito', ['DatosFiniquitoBeneficio', '$q', function (DatosFiniquitoBeneficio, $q) {
        var res = function (id) {
            var delay = $q.defer();
            DatosFiniquitoBeneficio.get({
                id_beneficio: id
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('SaveConductoresEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/conductor/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarConductoresEmpresa', ['SaveConductoresEmpresa', '$q', function (SaveConductoresEmpresa, $q) {
        var res = function (idEmpresa, datos) {
            var delay = $q.defer();
            SaveConductoresEmpresa.save({
                id_empresa: idEmpresa
            }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaHijosEmpresa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-familiar/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaHijosEmpleadosEmpresa', ['ListaHijosEmpresa', '$q', function (ListaHijosEmpresa, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            ListaHijosEmpresa.query({
                id_empresa: idEmpresa
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ImportacionFichaEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "empleados/empresa/:id_empresa/fichas/excel/upload", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarImportacionFichaEmpleados', ['ImportacionFichaEmpleados', '$q', function (ImportacionFichaEmpleados, $q) {
        var res = function (datos, idEmpresa, arregloAporteAfp, arregloLugarAfp,
            arregloLugarSeguroSalud,
            arregloTipoPersona,
            arregloCargaHorario,
            arregloArega,
            arregloUbicacion,
            arregloEstadoCivil,
            arregloOtrosSeguros1,
            arregloOtrosSeguros2) {
            var delay = $q.defer();
            ImportacionFichaEmpleados.save({
                id_empresa: idEmpresa
            }, {
                fichas: datos,
                arregloAporteAfp: arregloAporteAfp,
                arregloLugarAfp: arregloLugarAfp,
                arregloLugarSeguroSalud: arregloLugarSeguroSalud,
                arregloTipoPersona: arregloTipoPersona,
                arregloCargaHorario: arregloCargaHorario,
                arregloArega: arregloArega,
                arregloUbicacion: arregloUbicacion,
                arregloEstadoCivil: arregloEstadoCivil,
                arregloOtrosSeguros1: arregloOtrosSeguros1,
                arregloOtrosSeguros2: arregloOtrosSeguros2
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ImportacionRolTurnoEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "empleados/empresa/:id_empresa/rolTurnos/tipo/:tipo/excel/upload", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarImportacionRolTurnoEmpleados', ['ImportacionRolTurnoEmpleados', '$q', function (ImportacionRolTurnoEmpleados, $q) {
        var res = function (datos, idEmpresa, tipo) {
            var delay = $q.defer();
            ImportacionRolTurnoEmpleados.save({
                id_empresa: idEmpresa, tipo: tipo
            }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('DocPreRequisitoEdicion', ['$resource', function ($resource) {
        return $resource(restServer + "empleados/edicion/doc-pre-requisito", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActualizarDocPreRequisito', ['DocPreRequisitoEdicion', '$q', function (DocPreRequisitoEdicion, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            DocPreRequisitoEdicion.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('PreRequisitoAsignarDocumentoPrerequisito', ['$resource', function ($resource) {
        return $resource(restServer + "pre-requisito/asignar/documento-pre-requisito", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('AsignarDocumentoPrerequisito', ['PreRequisitoAsignarDocumentoPrerequisito', '$q', function (PreRequisitoAsignarDocumentoPrerequisito, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            PreRequisitoAsignarDocumentoPrerequisito.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ImportacionPreRequisitosEmpleados', ['$resource', function ($resource) {
        return $resource(restServer + "empleados/empresa/:id_empresa/pre-requisito/excel/upload", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarImportacionPreRequisitos', ['ImportacionPreRequisitosEmpleados', '$q', function (ImportacionPreRequisitosEmpleados, $q) {
        var res = function (datos, idEmpresa) {
            var delay = $q.defer();
            ImportacionPreRequisitosEmpleados.save({
                id_empresa: idEmpresa
            }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('OpcionesAplicacionUsuario', ['$resource', function ($resource) {
        return $resource(restServer + "opciones-aplicacion/aplicacion/:id_usuario_aplicacion", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerOpcionesAplicacionUsuario', ['OpcionesAplicacionUsuario','IndexDbOpcionesAplicacionUsuario','IndexDbSaveOpcionesAplicacionUsuario', '$q','$window',
    function (OpcionesAplicacionUsuario,IndexDbOpcionesAplicacionUsuario,IndexDbSaveOpcionesAplicacionUsuario, $q,$window) {
        var res = function (idUsuarioAplicacion) {
            const online = $window.navigator.onLine;
            if (!online) {
                let promise = IndexDbOpcionesAplicacionUsuario(idUsuarioAplicacion);
                return promise;
            }
            var delay = $q.defer();
            OpcionesAplicacionUsuario.get({
                id_usuario_aplicacion: idUsuarioAplicacion
            }, function (entidad) {
                IndexDbSaveOpcionesAplicacionUsuario(entidad);
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaHijosEmpleadoRuta', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-hijo/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaHijosEmpleado', ['ListaHijosEmpleadoRuta', '$q', function (ListaHijosEmpleadoRuta, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            ListaHijosEmpleadoRuta.query({
                id_empleado: idEmpleado
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaAusenciaPortero', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-portero/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/estado/:estado/fecha/:fecha");
    }])

    .factory('ObtenerListaAusenciaPortero', ['ListaAusenciaPortero', '$q', function (ListaAusenciaPortero, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ListaAusenciaPortero.get({
                id_empresa: paginator.filter.empresa,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                estado: paginator.filter.estado,
                fecha: paginator.filter.fecha
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('SolicitudAsencia', ['$resource', function ($resource) {
        return $resource(restServer + "app/recursos-humanos-portero/ausencia", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActualizarSolicitudAsencia', ['SolicitudAsencia', '$q', function (SolicitudAsencia, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            SolicitudAsencia.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('CargaHorarioRRHH', ['$resource', function ($resource) {
        return $resource(restServer + "carga-horario-configuracion/:id_empresa?", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarCargaHorarioRRHH', ['CargaHorarioRRHH', '$q', function (CargaHorarioRRHH, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            CargaHorarioRRHH.save(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListarCargaHorarioRRHH', ['CargaHorarioRRHH', '$q', function (CargaHorarioRRHH, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            CargaHorarioRRHH.query({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ContratoHijo', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-contratos/familiar/:id_familiaro", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('RegistrarContratoHijo', ['ContratoHijo', '$q', function (ContratoHijo, $q) {
        var res = function (datos, idFamiliar) {
            var delay = $q.defer();
            ContratoHijo.save({ id_familiaro: idFamiliar }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerContratosfamiliar', ['ContratoHijo', '$q', function (ContratoHijo, $q) {
        var res = function (idFamiliar) {
            var delay = $q.defer();
            ContratoHijo.query({ id_familiaro: idFamiliar }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarDocFamiliar', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-familiar/documento", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActualizarDocumentoFamiliar', ['ActualizarDocFamiliar', '$q', function (ActualizarDocFamiliar, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            ActualizarDocFamiliar.update(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('AnularPrestamoPersonal', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-anular-prestamo-personal", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('EliminarPrestamoPersonal', ['AnularPrestamoPersonal', '$q', function (AnularPrestamoPersonal, $q) {
        var res = function (datos) {
            var delay = $q.defer();
            AnularPrestamoPersonal.update(null, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('GuardarHoraExtraOrdinaria', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-horas-extra-ordinarias/ficha/:id_ficha", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('RegistrarHoraExtraOrdinaria', ['GuardarHoraExtraOrdinaria', '$q', function (GuardarHoraExtraOrdinaria, $q) {
        var res = function (datos, idFicha) {
            var delay = $q.defer();
            GuardarHoraExtraOrdinaria.save({ id_ficha: idFicha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ActualizarHoraExtraOrdinaria', ['GuardarHoraExtraOrdinaria', '$q', function (GuardarHoraExtraOrdinaria, $q) {
        var res = function (datos, idFicha) {
            var delay = $q.defer();
            GuardarHoraExtraOrdinaria.update({ id_ficha: idFicha }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerHorasExtraOrdinarias', ['GuardarHoraExtraOrdinaria', '$q', function (GuardarHoraExtraOrdinaria, $q) {
        var res = function (idFicha) {
            var delay = $q.defer();
            GuardarHoraExtraOrdinaria.query({ id_ficha: idFicha }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('reportesExcel', ['$resource', function ($resource) {
        return $resource(restServer + "rr-hh-reporte-excel/id_empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('rrhhReportesExcel', ['reportesExcel', '$q', function (reportesExcel, $q) {
        var res = function (id_empresa)//idEmpresa, xxx
        {
            var delay = $q.defer();
            reportesExcel.get({
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
    .factory('ConfiguracionSubsidioRuta', ['$resource', function ($resource) {
        return $resource(restServer + "configuracion-subsidio/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarConfiguracionSubsidio', ['ConfiguracionSubsidioRuta', '$q', function (ConfiguracionSubsidioRuta, $q) {
        var res = function (datos, id_empresa) {
            var delay = $q.defer();
            ConfiguracionSubsidioRuta.save({ id_empresa: id_empresa }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaConfiguracionSubsidios', ['ConfiguracionSubsidioRuta', '$q', function (ConfiguracionSubsidioRuta, $q) {
        var res = function (id_empresa) {
            var delay = $q.defer();
            ConfiguracionSubsidioRuta.query({ id_empresa: id_empresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //Verificar si existe empleado o no
    .factory('BusquedaCIEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "validar/empleado/empresa/:id_empresa/texto/:texto");
    }])

    .factory('VerificarCIEmpleado', ['BusquedaCIEmpleado', '$q', function (BusquedaCIEmpleado, $q) {
        var res = function (idEmpresa, texto) {
            var delay = $q.defer();
            BusquedaCIEmpleado.query({ id_empresa: idEmpresa, texto: texto }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    //fin del verificadors
    .factory('importacionVacaciones', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/importacion/vacaciones/empleado/:id_usuario/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarExcelImportacionVacaciones', ['importacionVacaciones', '$q', function (importacionVacaciones, $q) {
        var res = function (usuario, vacaciones, empresa) {
            var delay = $q.defer();
            importacionVacaciones.save({
                id_usuario: usuario,
                id_empresa: empresa
            }, { vacaciones: vacaciones }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }]).factory('RegistrarRolesTurnosExtra', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/rol-turno-noche/:id_rol_turno/:id_tipo", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarRolesTurnosExtra', ['RegistrarRolesTurnosExtra', '$q', function (RegistrarRolesTurnosExtra, $q) {
        var res = function (datos, idRolTurno, idTipo) {
            var delay = $q.defer();
            RegistrarRolesTurnosExtra.save({
                id_rol_turno: idRolTurno, id_tipo: idTipo
            }, { rolesTurnosNoche: datos }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerRolesTurnosExtra', ['RegistrarRolesTurnosExtra', '$q', function (RegistrarRolesTurnosExtra, $q) {
        var res = function (idRolTurno, idTipo) {
            var delay = $q.defer();
            RegistrarRolesTurnosExtra.get({ id_rol_turno: idRolTurno, id_tipo: idTipo }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RegistrarParamsEmpleadosCampamento', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/campamento-empleados/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('SubsidioEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "empleado-subsidio/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarParamsEmpleadosCampamento', ['RegistrarParamsEmpleadosCampamento', '$q', function (RegistrarParamsEmpleadosCampamento, $q) {
        var res = function (datos, idEmpresa) {
            var delay = $q.defer();
            RegistrarParamsEmpleadosCampamento.save({
                id_empresa: idEmpresa
            }, { campamentosEmpleados: datos }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaSubsidioEmpleado', ['SubsidioEmpleado', '$q', function (SubsidioEmpleado, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            SubsidioEmpleado.query({ id_empleado: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('SubsidioEmpleadoPlanificacion', ['$resource', function ($resource) {
        return $resource(restServer + "empleado-subsidio-planificacion/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaSubsidioPlanificacion', ['SubsidioEmpleadoPlanificacion', '$q', function (SubsidioEmpleadoPlanificacion, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            SubsidioEmpleadoPlanificacion.query({ id_empleado: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerParamsEmpleadosCampamento', ['RegistrarParamsEmpleadosCampamento', '$q', function (RegistrarParamsEmpleadosCampamento, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            RegistrarParamsEmpleadosCampamento.get({ id_empresa: idEmpresa }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ParametroEmpleadosCampamento', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/campamento-empleados/campamento/:id_campamento", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerParametroEmpleadosCampamento', ['ParametroEmpleadosCampamento', '$q', function (ParametroEmpleadosCampamento, $q) {
        var res = function (idcampamento) {
            var delay = $q.defer();
            ParametroEmpleadosCampamento.get({ id_campamento: idcampamento }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('CrearSubsidioEmpleado', ['SubsidioEmpleado', '$q', function (SubsidioEmpleado, $q) {
        var res = function (idEmpleado, subsidios) {
            var delay = $q.defer();
            SubsidioEmpleado.save({ id_empleado: idEmpleado }, subsidios, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('SubsidioEmpleadoSeguimiento', ['$resource', function ($resource) {
        return $resource(restServer + "empleado-subsidio-seguimiento/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaSubsidioEmpleadoSeguimiento', ['SubsidioEmpleadoSeguimiento', '$q', function (SubsidioEmpleadoSeguimiento, $q) {
        var res = function (idEmpleado) {
            var delay = $q.defer();
            SubsidioEmpleadoSeguimiento.query({ id_empleado: idEmpleado }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('CrearSubsidioEmpleadoSeguimiento', ['SubsidioEmpleadoSeguimiento', '$q', function (SubsidioEmpleadoSeguimiento, $q) {
        var res = function (idEmpleado, subsidios) {
            var delay = $q.defer();
            SubsidioEmpleadoSeguimiento.save({ id_empleado: idEmpleado }, subsidios, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('EliminarPrerequito', ['$resource', function ($resource) {
        return $resource(restServer + "prerequisitos/hablilitar/deshabilitar", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActivoInactivoPrerequisto', ['EliminarPrerequito', '$q', function (EliminarPrerequito, $q) {
        var res = function (prerequisito) {
            var delay = $q.defer();
            EliminarPrerequito.save(null, prerequisito, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('MatrizAnticipo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/matriz-anticipos/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearMatrizAnticipo', ['MatrizAnticipo', '$q', function (MatrizAnticipo, $q) {
        var res = function (anticipos, idEmpresa) {
            var delay = $q.defer();
            MatrizAnticipo.save({ id_empresa: idEmpresa }, anticipos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ObtenerMatrizAnticipo', ['MatrizAnticipo', '$q', function (MatrizAnticipo, $q) {
        var res = function (idEmpresa) {
            var delay = $q.defer();
            MatrizAnticipo.get({ id_empresa: idEmpresa }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ImportacionconfiguracionRopa', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/importacion/configuracion-ropa/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarImportacionconfiguracionRopa', ['ImportacionconfiguracionRopa', '$q', function (ImportacionconfiguracionRopa, $q) {
        var res = function (ropasArray, configuracionRopaArray, idEmpresa) {
            var delay = $q.defer();
            ImportacionconfiguracionRopa.save({ id_empresa: idEmpresa }, { ropas: ropasArray, configuraciones: configuracionRopaArray }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ImportacionConceptosHojasDeVida', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/importacion/conceptos-hojas-de-vida/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarConceptosHojasDeVida', ['ImportacionConceptosHojasDeVida', '$q', function (ImportacionConceptosHojasDeVida, $q) {
        var res = function (datosArray, idEmpresa) {
            var delay = $q.defer();
            ImportacionConceptosHojasDeVida.save({ id_empresa: idEmpresa }, { conceptosArray: datosArray }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ImportacionHojasDeVida', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/importacion/hojas-de-vida/empresa/:id_empresa", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('GuardarHojasDeVidaImportacion', ['ImportacionHojasDeVida', '$q', function (ImportacionHojasDeVida, $q) {
        var res = function (datosArray, idEmpresa) {
            var delay = $q.defer();
            ImportacionHojasDeVida.save({ id_empresa: idEmpresa }, { hojasDeVida: datosArray }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('FichasInactivasEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/fichas/empleado/:id_empleado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaFichasInactivasEmpleado', ['FichasInactivasEmpleado', '$q', function (FichasInactivasEmpleado, $q) {
        var res = function (empleadoId) {
            var delay = $q.defer();
            FichasInactivasEmpleado.get({ id_empleado: empleadoId }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RutaOtrosBonosNuevo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/otros-bonos/empleado/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearOtrosBonos', ['RutaOtrosBonosNuevo', '$q', function (RutaOtrosBonosNuevo, $q) {
        var res = function (idEmpleado, otroBono) {
            var delay = $q.defer();
            RutaOtrosBonosNuevo.save({ id_empleado: idEmpleado }, otroBono, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RutaOtrosBonosNuevo', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/otros-bonos/empleado/:id_empleado", { id_empleado: '@id_empleado' },
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ActulizarOtrosBonos', ['RutaOtrosBonosNuevo', '$q', function (RutaOtrosBonosNuevo, $q) {
        var res = function (idEmpleado, otroBono) {
            var delay = $q.defer();
            RutaOtrosBonosNuevo.update({ id_empleado: idEmpleado }, otroBono, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('RutaCerrarLlamadaAtencion', ['$resource', function ($resource) {
        return $resource(restServer + 'recursos-humanos/cerrar/llamada-atencion/:id', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CerrarLlamadaAtencion', ['RutaCerrarLlamadaAtencion', '$q', function (RutaCerrarLlamadaAtencion, $q) {
        var res = function (idLLamadaAtencion) {
            var delay = $q.defer();
            RutaCerrarLlamadaAtencion.save({ id: idLLamadaAtencion }, null, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RutaLlamadaAtencion', ['$resource', function ($resource) {
        return $resource(restServer + 'recursos-humanos/registro/llamada-atencion/:id_empresa', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('CrearLlamadaAtencion', ['RutaLlamadaAtencion', '$q', function (RutaLlamadaAtencion, $q) {
        var res = function (id_empresa, datos) {
            var delay = $q.defer();
            RutaLlamadaAtencion.save({ id_empresa: id_empresa }, datos, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('rutaPaginadorLLamadaAtencion', ['$resource', function ($resource) {
        return $resource(restServer + 'recursos-humanos/llamada-atencion/tipo-fecha/:tipo_fecha/fecha_inicio/:fecha_inicio/fecha_fin/:fecha_fin/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/ficha/:id_ficha', null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('HistorialLlamadaAtencion', ['rutaPaginadorLLamadaAtencion', '$q', function (rutaPaginadorLLamadaAtencion, $q) {
        var res = function (paginator) {
            var delay = $q.defer();
            rutaPaginadorLLamadaAtencion.get({
                tipo_fecha: paginator.filter.tipo_fecha,
                fecha_inicio: paginator.filter.fecha_inicio2,
                fecha_fin: paginator.filter.fecha_fin2,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                columna: paginator.column,
                direccion: paginator.direction,
                id_ficha: paginator.filter.id_ficha,
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('SueldoMesEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/sueldo-planilla/mes/:mes/gestion/:gestion/ficha/:id_ficha", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerSueldoMesEmpleado', ['SueldoMesEmpleado', '$q', function (SueldoMesEmpleado, $q) {
        var res = function (mes, gestion, ficha) {
            var delay = $q.defer();
            SueldoMesEmpleado.get({ mes: mes.id, gestion: gestion, id_ficha: ficha }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('ObtenerDotacionEmpleado', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/dotacion-ropa/id/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerDotacionRopaEmpleado', ['ObtenerDotacionEmpleado', '$q', function (ObtenerDotacionEmpleado, $q) {
        var res = function (idDotacion) {
            var delay = $q.defer();
            ObtenerDotacionEmpleado.get({ id: idDotacion }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('BuscarRopasTrabajoEmpresaComprobanto', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/ropa-trabajo/comprobante/empresa/:id_empresa/inicio/:inicio/fin/:fin/campamento/:campamento", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaDotacionRopaEmpresaComprobante', ['BuscarRopasTrabajoEmpresaComprobanto', '$q', function (BuscarRopasTrabajoEmpresaComprobanto, $q) {
        var res = function (idEmpresa, filtro) {
            var delay = $q.defer();
            BuscarRopasTrabajoEmpresaComprobanto.query({ id_empresa: idEmpresa, inicio: filtro.inicio2, fin: filtro.fin2, campamento: filtro.campo ? filtro.campo : 0 }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('RegistroFechaPlanillaSueldo', ['$resource', function ($resource) {
        return $resource(restServer + "rrhh-planilla-sueldo/mes/:mes/anio/:anio", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('VerificarFechaPlanillaSueldo', ['RegistroFechaPlanillaSueldo', '$q', function (RegistroFechaPlanillaSueldo, $q) {
        var res = function (mes, anio) {
            var delay = $q.defer();
            RegistroFechaPlanillaSueldo.get({ mes: mes, anio: anio }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    .factory('ListaAusenciaSolicitudesPortero', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos-portero/solitudes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/estado/:estado/fecha/:fecha");
    }])

    .factory('ObtenerSolicitudesAusenciaPortero', ['ListaAusenciaSolicitudesPortero', '$q', function (ListaAusenciaSolicitudesPortero, $q) {
        var res = function (paginator)//idEmpresa, xxx
        {
            var delay = $q.defer();
            ListaAusenciaSolicitudesPortero.get({
                id_empresa: paginator.filter.empresa,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                texto_busqueda: paginator.search,
                estado: paginator.filter.estado,
                fecha: paginator.filter.fecha
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])


    .factory('ReporteBeneficiosSociales', ['$resource', function ($resource) {
        return $resource(restServer + "recursos-humanos/beneficios-sociales/reportes/:id_empresa/:tipo/:inicio/:fin");
    }])

    .factory('GetBeneficiosSociales', ['ReporteBeneficiosSociales', '$q', function (ReporteBeneficiosSociales, $q) {
        var res = function (id_empresa, tipo, inicio, fin)
        {
            var delay = $q.defer();
            ReporteBeneficiosSociales.get({
                id_empresa,
                tipo: tipo == 0 || tipo == false ? 0 : 1,
                inicio: inicio ? inicio : 0,
                fin: fin ? fin : 0
            }, function (entidades) {
                delay.resolve(entidades);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])
    
    .factory('ReporteGeneralOtrosBonos',  ['$resource',function ($resource) {
        return $resource(restServer + "recursos-humanos/otros-bonos/reportes/:id_empresa/:inicio/:fin/:empleado/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:paginado", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ListaBonosEmpresaPaciente', ['ReporteGeneralOtrosBonos', '$q', function (ReporteGeneralOtrosBonos, $q) {
        var res = function (id_empresa, paginator) {
            var delay = $q.defer();
            ReporteGeneralOtrosBonos.get({ 
                id_empresa: id_empresa ? id_empresa : 0, 
                inicio: paginator.filter.inicio ? paginator.filter.inicio : 0, 
                fin: paginator.filter.fin ? paginator.filter.fin : 0,
                empleado: paginator.filter.empleado ? paginator.filter.empleado : 0,
                texto_busqueda: paginator.search,
                pagina: paginator.currentPage,
                items_pagina: paginator.itemsPerPage,
                columna: paginator.column,
                direccion: paginator.direction,
                paginado: paginator.filter.paginado ? paginator.filter.paginado : 0,
            }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    
    .factory('DatosEdicionRopaTrabajo',  ['$resource',function ($resource) {
        return $resource(restServer + "recursos-humanos/dotacion-ropa/individual/:id_dotacion/:id_almacen", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerDatosEdicionDotacionRopa', ['DatosEdicionRopaTrabajo', '$q', function (DatosEdicionRopaTrabajo, $q) {
        var res = function (id_dotacion, id_almacen) {
            var delay = $q.defer();
            DatosEdicionRopaTrabajo.get({ id_dotacion, id_almacen }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    .factory('DatosBajasMedicas',  ['$resource',function ($resource) {
        return $resource(restServer + "/rrhh/bajas-medicas/reporte/:id_empresa/:desde/:hasta/:tipo/:tipo_reporte", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerBajasMedicas', ['DatosBajasMedicas', '$q', function (DatosBajasMedicas, $q) {
        var res = function (id_empresa, desde, hasta, tipo, tipo_reporte) {
            var delay = $q.defer();
            DatosBajasMedicas.get({ 
                id_empresa: id_empresa ? id_empresa : 0,
                desde: desde ? desde : 0,
                hasta: hasta ? hasta : 0,
                tipo: tipo ? tipo : 0,
                tipo_reporte: tipo_reporte ? tipo_reporte : 0
             }, function (entidad) {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])

    
    .factory('DatosViajeReporteIso',  ['$resource',function ($resource) {
        return $resource(restServer + "/rrhh/viajes/:id", null,
            {
                'update': { method: 'PUT' }
            });
    }])
    .factory('ObtenerViaje', ['DatosViajeReporteIso', '$q', function (DatosViajeReporteIso, $q) {
        var res = function ( id ) {
            var delay = $q.defer();
            DatosViajeReporteIso.get({ id }, (entidad) => {
                delay.resolve(entidad);
            }, function (error) {
                delay.reject(error);
            });
            return delay.promise;
        };
        return res;
    }])