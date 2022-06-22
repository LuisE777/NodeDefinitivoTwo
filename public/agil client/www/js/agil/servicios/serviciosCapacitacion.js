angular
  .module("agil.servicios")

  .factory("RegistroCapacitacion", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])

  .factory("GuardarRegistroCapacitacion", [
    "RegistroCapacitacion",
    "$q",
    function (RegistroCapacitacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCapacitacion.save({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ActualizarRegistroCapacitacion", [
    "RegistroCapacitacion",
    "$q",
    function (RegistroCapacitacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCapacitacion.update({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("EliminarRegistroCapacitacion", [
    "RegistroCapacitacion",
    "$q",
    function (RegistroCapacitacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCapacitacion.delete({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("RegistroPonderacion", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion-ponderacion/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])
  .factory("GuardarRegistroPonderacion", [
    "RegistroPonderacion",
    "$q",
    function (RegistroPonderacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroPonderacion.save({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("RegistroCalificacion", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion-calificacion/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])
  .factory("GuardarRegistroCalificacion", [
    "RegistroCalificacion",
    "$q",
    function (RegistroCalificacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCalificacion.save({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("RegistroCertificado", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion-certificados/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])
  .factory("ListaCertificadosActivas", [
    "RegistroCertificado",
    "$q",
    function (RegistroCertificado, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCertificado.get({
          id_empresa: idEmpresa,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("UltimoRegistroCapCertificado", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "ultimo-registro/capacitacion-certificados/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])
  .factory("UltimoModeloCertificado", [
    "UltimoRegistroCapCertificado",
    "$q",
    function (UltimoRegistroCapCertificado, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        UltimoRegistroCapCertificado.get({
          id_empresa: idEmpresa,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("GuardarRegistroCertificado", [
    "RegistroCertificado",
    "$q",
    function (RegistroCertificado, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroCertificado.save({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])

  .factory("RegistroEmpleado", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion-empleado/empresa/:id_empresa", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])
  .factory("GuardarRegistroEmpleado", [
    "RegistroEmpleado",
    "$q",
    function (RegistroEmpleado, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroEmpleado.save({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ActualizarNotaEmpleado", [
    "RegistroEmpleado",
    "$q",
    function (RegistroEmpleado, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroEmpleado.update({
          id_empresa: idEmpresa,
        },
          datos,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapacitaciones", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
      );
    },
  ])

  .factory("ObtenerListaCapacitaciones", [
    "ListaCapacitaciones",
    "$q",
    function (ListaCapacitaciones, $q) {
      var res = function (paginator, convertirFecha) {
        var delay = $q.defer();
        ListaCapacitaciones.get({
          inicio: paginator.filter.inicio != 0 ? convertirFecha(paginator.filter.inicio) : paginator.filter.inicio,
          fin: paginator.filter.inicio != 0 ? convertirFecha(paginator.filter.fin) : paginator.filter.fin,
          id_empresa: paginator.filter.id_empresa,
          pagina: paginator.currentPage,
          items_pagina: paginator.itemsPerPage,
          texto_busqueda: paginator.filter.search,
          columna: paginator.column,
          direccion: paginator.direction,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapacitacionesReporte", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/detallado/:detallado"
      );
    },
  ])

  .factory("ObtenerListaCapacitacionesReporte", [
    "ListaCapacitacionesReporte",
    "$q",
    function (ListaCapacitacionesReporte, $q) {
      var res = function (filter, convertirFecha) {
        var delay = $q.defer();
        ListaCapacitacionesReporte.get({
          inicio: filter.inicio != '' ? convertirFecha(filter.inicio) : 0,
          fin: filter.inicio != '' ? convertirFecha(filter.fin) : 0,
          id_empresa: filter.id_empresa,
          detallado: filter.detallado != '' ? filter.detallado : 0
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapPonderacion", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion-ponderacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
      );
    },
  ])

  .factory("ObtenerListaCapPonderaciones", [
    "ListaCapPonderacion",
    "$q",
    function (ListaCapPonderacion, $q) {
      var res = function (paginator) {
        var delay = $q.defer();
        ListaCapPonderacion.get({
          id_empresa: paginator.filter.id_empresa,
          pagina: paginator.currentPage,
          items_pagina: paginator.itemsPerPage,
          texto_busqueda: paginator.filter.search,
          columna: paginator.column,
          direccion: paginator.direction,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaPonderacionesActivas", [
    "RegistroPonderacion",
    "$q",
    function (RegistroPonderacion, $q) {
      var res = function (idEmpresa, datos) {
        var delay = $q.defer();
        RegistroPonderacion.get({
          id_empresa: idEmpresa,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapCalificacion", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion-calificacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
      );
    },
  ])

  .factory("ObtenerListaCapCalificaciones", [
    "ListaCapCalificacion",
    "$q",
    function (ListaCapCalificacion, $q) {
      var res = function (paginator) {
        var delay = $q.defer();
        ListaCapCalificacion.get({
          inicio: paginator.filter.inicio,
          fin: paginator.filter.fin,
          id_empresa: paginator.filter.id_empresa,
          pagina: paginator.currentPage,
          items_pagina: paginator.itemsPerPage,
          texto_busqueda: paginator.filter.search,
          columna: paginator.column,
          direccion: paginator.direction,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapCertificado", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion-certificado/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
      );
    },
  ])

  .factory("ObtenerListaCapCertificados", [
    "ListaCapCertificado",
    "$q",
    function (ListaCapCertificado, $q) {
      var res = function (paginator) {
        var delay = $q.defer();
        ListaCapCertificado.get({
          inicio: paginator.filter.inicio,
          fin: paginator.filter.fin,
          id_empresa: paginator.filter.id_empresa,
          pagina: paginator.currentPage,
          items_pagina: paginator.itemsPerPage,
          texto_busqueda: paginator.filter.search,
          columna: paginator.column,
          direccion: paginator.direction,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ListaCapEmpleado", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer +
        "capacitacion-empleado/empresa/:id_empresa/capacitacion/:id_capacitacion/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
      );
    },
  ])

  .factory("ObtenerListaCapEmpleados", [
    "ListaCapEmpleado",
    "$q",
    function (ListaCapEmpleado, $q) {
      var res = function (paginator) {
        var delay = $q.defer();
        ListaCapEmpleado.get({
          inicio: paginator.filter.inicio,
          fin: paginator.filter.fin,
          id_empresa: paginator.filter.id_empresa,
          id_capacitacion: paginator.filter.id_capacitacion,
          pagina: paginator.currentPage,
          items_pagina: paginator.itemsPerPage,
          texto_busqueda: paginator.filter.search,
          columna: paginator.column,
          direccion: paginator.direction,
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("buscarEmpleadoCap", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion/personal/:id_empresa/busqueda/:texto_busqueda", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])

  .factory("buscarEmpleadoCapacitacion", [
    "buscarEmpleadoCap",
    "$q",
    function (buscarEmpleadoCap, $q) {
      var res = function (idEmpresa, texto) {
        var delay = $q.defer();
        buscarEmpleadoCap.query({
          id_empresa: idEmpresa,
          texto_busqueda: texto
        },
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])
  .factory("ReportesEspesificosCap", [
    "$resource",
    function ($resource) {
      return $resource(
        restServer + "capacitacion-reportes/empresa/:id_empresa/:desde/:hasta/:id_empleado/:id_curso/:id_cargo/:id_campo", {
        id: "@idEmpresa"
      }, {
        update: {
          method: "PUT"
        },
      }
      );
    },
  ])

  .factory("DatosReportesEspesificosCap", [
    "ReportesEspesificosCap",
    "$q",
    function (ReportesEspesificosCap, $q) {
      var res = function (filtroReporte, id_empresa) {
        var delay = $q.defer();
        let filtro={
          id_empresa: id_empresa,
          desde: filtroReporte.desde,
          hasta: filtroReporte.hasta,
          id_empleado: filtroReporte.empleado?.id ||0,
          id_curso: filtroReporte.curso?.id ||0,
          id_cargo: filtroReporte.cargo?.id ||0,
          id_campo: filtroReporte.campo?.id ||0,
        }
        ReportesEspesificosCap.query(filtro,
          function (entidades) {
            delay.resolve(entidades);
          },
          function (error) {
            delay.reject(error);
          }
        );
        return delay.promise;
      };
      return res;
    },
  ])