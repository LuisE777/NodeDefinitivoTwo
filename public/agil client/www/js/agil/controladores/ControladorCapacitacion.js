angular.module("agil.controladores").controller("ControladorCapacitacion", [
  "$scope",
  "blockUI",
  "$localStorage",
  "$timeout",
  "$location",
  "$uibModal",
  "ClasesTipoEmpresa",
  "Paginator",
  "SweetAlert",
  "Tipos",
  "GuardarRegistroCapacitacion",
  "ActualizarRegistroCapacitacion",
  "EliminarRegistroCapacitacion",
  "GuardarRegistroPonderacion",
  "GuardarRegistroCalificacion",
  "GuardarRegistroCertificado",
  "GuardarRegistroEmpleado",
  'ActualizarNotaEmpleado',
  "ObtenerListaCapacitaciones",
  "ObtenerListaCapPonderaciones",
  "ObtenerListaCapCalificaciones",
  "ObtenerListaCapCertificados",
  "ObtenerListaCapEmpleados",
  "ListaPonderacionesActivas",
  "ListaCertificadosActivas",
  "UltimoModeloCertificado",
  'buscarEmpleadoCapacitacion',
  'ObtenerListaCapacitacionesReporte',
  'CargosEmpresa',
  'DatosReportesEspesificosCap',
  function (
    $scope,
    blockUI,
    $localStorage,
    $timeout,
    $location,
    $uibModal,
    ClasesTipoEmpresa,
    Paginator,
    SweetAlert,
    Tipos,
    GuardarRegistroCapacitacion,
    ActualizarRegistroCapacitacion,
    EliminarRegistroCapacitacion,
    GuardarRegistroPonderacion,
    GuardarRegistroCalificacion,
    GuardarRegistroCertificado,
    GuardarRegistroEmpleado,
    ActualizarNotaEmpleado,
    ObtenerListaCapacitaciones,
    ObtenerListaCapPonderaciones,
    ObtenerListaCapCalificaciones,
    ObtenerListaCapCertificados,
    ObtenerListaCapEmpleados,
    ListaPonderacionesActivas,
    ListaCertificadosActivas,
    UltimoModeloCertificado,
    buscarEmpleadoCapacitacion,
    ObtenerListaCapacitacionesReporte,
    CargosEmpresa,
    DatosReportesEspesificosCap
  ) {
    $scope.usuario = JSON.parse($localStorage.usuario);
    $scope.idModalCapacitacion = "modal-wizard-capacitacion";
    $scope.idModalConceptoEdicion = "dialog-conceptos";
    $scope.idModalPonderacion = "modal-ponderacion";
    $scope.idModalCalificacion = "modal-calificacion";
    $scope.idModalCertificado = "modal-certificado";
    $scope.idImagenCapacitacion = "imagen-certificado";
    $scope.idModalEmpleado = "modal-empleado";

    $scope.$on("$viewContentLoaded", () => {
      resaltarPestaña($location.path().substring(1));
      ejecutarScriptsCapacitaciones(
        $scope.idModalCapacitacion,
        $scope.idModalConceptoEdicion,
        $scope.idModalPonderacion,
        $scope.idModalCalificacion,
        $scope.idModalCertificado,
        $scope.idImagenCapacitacion,
        $scope.idModalEmpleado
      );
      $scope.buscarAplicacion(
        $scope.usuario.aplicacionesUsuario,
        $location.path().substring(1)
      );
      blockUI.stop();
    });
    $scope.$on("$routeChangeStart", (next, current) => {
      $scope.eliminarPopup($scope.idModalCapacitacion);
      $scope.eliminarPopup($scope.idModalConceptoEdicion);
      $scope.eliminarPopup($scope.idModalPonderacion);
      $scope.eliminarPopup($scope.idModalCalificacion);
      $scope.eliminarPopup($scope.idModalCertificado);
      $scope.eliminarPopup($scope.idModalEmpleado);
    });

    $scope.inicio = async () => {
      try {
        $scope.tipoClaseCalificacion = await $scope.obtenerTipoClase();
        $scope.filtroCapacitacion = {
          id_empresa: $scope.usuario.id_empresa,
          inicio: "",
          fin: "",
          detallado: "",
          search: "",
        };
        $scope.paginadorListaCapacitaciones();
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    //abrir modales
    $scope.abrirDialogConceptoEdicion = (tipo) => {
      $scope.tipo_edicion = tipo;
      $scope.clase = {};
      $scope.abrirPopup($scope.idModalConceptoEdicion);
    };
    $scope.cerrarDialogConceptoEdicion = () => {
      $scope.cerrarPopup($scope.idModalConceptoEdicion);
    };
    $scope.abrirModalCapacitacion = () => {
      $scope.abrirPopup($scope.idModalCapacitacion);
    };
    $scope.abrirModalPonderacion = () => {
      $scope.abrirPopup($scope.idModalPonderacion);
    };
    $scope.abrirModalCalificacion = () => {
      $scope.abrirPopup($scope.idModalCalificacion);
    };
    $scope.abrirModalCertificado = () => {
      $scope.abrirPopup($scope.idModalCertificado);
    };
    $scope.abrirModalEmpleado = () => {
      $scope.abrirPopup($scope.idModalEmpleado);
    };
    //cerarr modales
    $scope.cerrarModalCapacitacion = () => {
      $scope.cerrarPopup($scope.idModalCapacitacion);
    };
    $scope.cerrarModalPonderacion = () => {
      $scope.cerrarPopup($scope.idModalPonderacion);
    };
    $scope.cerrarModalCalificacion = () => {
      $scope.cerrarPopup($scope.idModalCalificacion);
    };
    $scope.cerrarModalCertificado = () => {
      $scope.cerrarPopup($scope.idModalCertificado);
    };
    $scope.cerrarModalEmpleado = () => {
      $scope.cerrarPopup($scope.idModalEmpleado);
    };
    //funciones capacitacion
    //abrir nuevos registros
    $scope.crearCapacitacion = async () => {
      try {
        $scope.registroCapacitacion = {
          docentes: [],
          id_usuario: $scope.usuario.id,
        };
        $scope.registroCapdocente = "";
        $scope.listaPonderaciones = await $scope.listaPonderacionesActivas();
        $scope.listaCertificados = await $scope.listaCertificadosActivas();
        $scope.tipoClaseCalificacion = await $scope.obtenerTipoClase();
        $scope.abrirModalCapacitacion();
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.registrosPonderacion = () => {
      $scope.registroPonderacion = {};
      $scope.filtroPonderacion = {
        id_empresa: $scope.usuario.id_empresa,
        search: "",
      };
      $scope.paginadorListaPonderaciones();
      $scope.abrirModalPonderacion();
    };
    $scope.cancelarEdicionPonderacion = () => {
      $scope.registroPonderacion = {};
    };
    $scope.registrosCalificacion = async () => {
      try {
        $scope.registroCalificacion = {
          detallesCalificacion: []
        };
        $scope.registroCalificacionEliminados = [];
        $scope.maxNumberPonderacion = 0;
        $scope.minNumberPonderacion = 0;
        $scope.notaMaximaIsSet = false;
        $scope.detalleCalificacion = {};
        $scope.listaPonderaciones = await $scope.listaPonderacionesActivas();
        $scope.filtroCalificacion = {
          id_empresa: $scope.usuario.id_empresa,
          search: "",
        };
        $scope.paginadorListaCalificaciones();
        $scope.abrirModalCalificacion();
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    nuevoRegistroCertificado = async () => {
      let tipoTextoDefault = $scope.fontsHoja.clases.find(x => x.nombre_corto == 'Helvetica');
      let orientacionDefault = $scope.orientacionesHoja.clases.find(x => x.nombre_corto == 'landscape')
      let dimencionesDefault = $scope.dimencionesHoja.clases.find(x => x.nombre_corto == 'letter')

      return {
        modelo: await $scope.ultimoModeloCerficado(),
        imagen: "./img/icon-producto-default.png",
        color_texto_uno: `#000000`,
        color_subtitulo: `#000000`,
        color_detalle_estudiante: `#000000`,
        color_texto_dos: `#000000`,
        color_nombre_docente: `#000000`,
        color_subtitulo_docente: `#000000`,
        dimencion_texto_uno: 40,
        dimencion_subtitulo: 40,
        dimencion_detalle_estudiante: 30,
        dimencion_texto_dos: 30,
        dimencion_nombre_docente: 15,
        dimencion_subtitulo_docente: 15,
        fontTextoUno: tipoTextoDefault,
        fontSubtitulo: tipoTextoDefault,
        fontDetalleEstudiante: tipoTextoDefault,
        fontTextoDos: tipoTextoDefault,
        fontNombreDocente: tipoTextoDefault,
        fontSubtituloDocente: tipoTextoDefault,
        orientacion: orientacionDefault,
        dimencion: dimencionesDefault,
        plantilla: false,
        color_plantilla_uno: '#ffffff',
        color_plantilla_dos: '#ffffff'
      };
    }
    $scope.registrosCertificado = async () => {
      $scope.nuevoCertificado = false;
      try {
        $scope.orientacionesHoja = await $scope.obtenerOrientacionPdf();
        $scope.dimencionesHoja = await $scope.obtenerDimiencionPdf();
        $scope.fontsHoja = await $scope.obtenerFontsPdf();
        $scope.registroCertificado = await nuevoRegistroCertificado();
        $scope.filtroCertificado = {
          id_empresa: $scope.usuario.id_empresa,
          search: "",
        };
        $scope.paginadorListaCertificados();
        $scope.abrirModalCertificado();
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };

    $scope.registrosEmpleado = (registro) => {
      $scope.registroCapacitacion = registro;
      $scope.registroEmpleado = {};
      $scope.filtroEmpleado = {
        id_empresa: $scope.usuario.id_empresa,
        id_capacitacion: $scope.registroCapacitacion.id,
        search: "",
      };
      $scope.paginadorListaEmpleados();
      $scope.abrirModalEmpleado();
    };

    //obtener paginadores
    $scope.paginadorListaCapacitaciones = () => {
      $scope.paginadorCapacitacion = Paginator();
      $scope.paginadorCapacitacion.column = "id";
      $scope.paginadorCapacitacion.direction = "desc";
      $scope.paginadorCapacitacion.itemsPerPage = 10;
      $scope.paginadorCapacitacion.callBack = $scope.obtenerListaCapacitaciones;
      $scope.paginadorCapacitacion.getSearch(
        "",
        $scope.filtroCapacitacion,
        null
      );
    };
    $scope.obtenerListaCapacitaciones = async () => {
      try {
        var res = await ObtenerListaCapacitaciones(
          $scope.paginadorCapacitacion, $scope.convertirFecha
        );
        $scope.paginadorCapacitacion.setPages(res.paginas);
        $scope.listaPaginadaCapacitaciones = res.capacitaciones;
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.paginadorListaPonderaciones = () => {
      $scope.paginadorPonderacion = Paginator();
      $scope.paginadorPonderacion.column = "id";
      $scope.paginadorPonderacion.direction = "desc";
      $scope.paginadorPonderacion.itemsPerPage = 10;
      $scope.paginadorPonderacion.callBack = $scope.obtenerListaPonderaciones;
      $scope.paginadorPonderacion.getSearch("", $scope.filtroPonderacion, null);
    };
    $scope.obtenerListaPonderaciones = async () => {
      try {
        var res = await ObtenerListaCapPonderaciones(
          $scope.paginadorPonderacion
        );
        $scope.paginadorPonderacion.setPages(res.paginas);
        $scope.listaPaginadaPonderaciones = res.ponderaciones;
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.paginadorListaCalificaciones = () => {
      $scope.paginadorCalificacion = Paginator();
      $scope.paginadorCalificacion.column = "id";
      $scope.paginadorCalificacion.direction = "desc";
      $scope.paginadorCalificacion.itemsPerPage = 10;
      $scope.paginadorCalificacion.callBack = $scope.obtenerListaCalificaciones;
      $scope.paginadorCalificacion.getSearch(
        "",
        $scope.filtroCalificacion,
        null
      );
    };
    $scope.obtenerListaCalificaciones = async () => {
      try {
        var res = await ObtenerListaCapCalificaciones(
          $scope.paginadorCalificacion
        );
        $scope.paginadorCalificacion.setPages(res.paginas);
        $scope.listaPaginadaCalificacion = res.calificaciones;
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.paginadorListaCertificados = () => {
      $scope.paginadorCertificado = Paginator();
      $scope.paginadorCertificado.column = "id";
      $scope.paginadorCertificado.direction = "desc";
      $scope.paginadorCertificado.itemsPerPage = 10;
      $scope.paginadorCertificado.callBack = $scope.obtenerListaCertificados;
      $scope.paginadorCertificado.getSearch("", $scope.filtroCertificado, null);
    };
    $scope.obtenerListaCertificados = async () => {
      try {
        var res = await ObtenerListaCapCertificados(
          $scope.paginadorCertificado
        );
        $scope.paginadorCertificado.setPages(res.paginas);
        $scope.listaPaginadaCertificados = res.certificados;
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.paginadorListaEmpleados = () => {
      $scope.paginadorEmpleado = Paginator();
      $scope.paginadorEmpleado.column = "id";
      $scope.paginadorEmpleado.direction = "desc";
      $scope.paginadorEmpleado.itemsPerPage = 10;
      $scope.paginadorEmpleado.callBack = $scope.obtenerListaEmpleados;
      $scope.paginadorEmpleado.getSearch("", $scope.filtroEmpleado, null);
    };
    $scope.obtenerListaEmpleados = async () => {
      try {
        var res = await ObtenerListaCapEmpleados($scope.paginadorEmpleado);
        $scope.paginadorEmpleado.setPages(res.paginas);
        for (const iterator of res.empleados) {
          if ($scope.registroCapacitacion.ponderacion.numerico) {
            iterator.nota = parseFloat(iterator.nota)
          }
        }
        $scope.listaPaginadaEmpleados = res.empleados;
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };

    /* guardar nueva Capacitacion */
    $scope.agregarDocente = async () => {
      $scope.registroCapacitacion.docentes.push({
        detalle_docente: $scope.registroCapdocente,
      });
      $scope.registroCapdocente = "";
    };
    $scope.guardarCapacitacion = async () => {
      let res;
      try {
        $scope.registroCapacitacion.id_tipo_curso =
          $scope.registroCapacitacion.tipoCurso.id;
        $scope.registroCapacitacion.id_ponderacion =
          $scope.registroCapacitacion.ponderacion.id;
        $scope.registroCapacitacion.id_certificado =
          $scope.registroCapacitacion.certificado.id;
        const registro = Object.assign({}, $scope.registroCapacitacion);
        delete registro.tipoCurso;
        delete registro.ponderacion;
        delete registro.certificado;
        registro.fecha = new Date(
          $scope.convertirFecha($scope.registroCapacitacion.fecha)
        );
        registro.fecha_inicio = new Date(
          $scope.convertirFecha($scope.registroCapacitacion.fecha_inicio)
        );
        registro.fecha_fin = new Date(
          $scope.convertirFecha($scope.registroCapacitacion.fecha_fin)
        );
        if (registro.id) {
          res = await ActualizarRegistroCapacitacion(
            $scope.usuario.id_empresa,
            registro
          );
        } else {
          res = await GuardarRegistroCapacitacion(
            $scope.usuario.id_empresa,
            registro
          );
        }
        $scope.registroCapacitacion = {
          docentes: [],
          id_usuario: $scope.usuario.id,
        };
        SweetAlert.swal("", res.mensaje, "success");
        $scope.paginadorListaCapacitaciones();
        $scope.cerrarModalCapacitacion();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.modificarCapacitacion = async (registro) => {
      $scope.registroCapacitacion = Object.assign({}, registro);
      $scope.registroCapdocente = "";
      $scope.listaPonderaciones = await $scope.listaPonderacionesActivas();
      $scope.listaCertificados = await $scope.listaCertificadosActivas();
      $scope.tipoClaseCalificacion = await $scope.obtenerTipoClase();
      $scope.registroCapacitacion.fecha = $scope.fechaATexto(
        $scope.registroCapacitacion.fecha
      );
      $scope.registroCapacitacion.fecha_inicio = $scope.fechaATexto(
        $scope.registroCapacitacion.fecha_inicio
      );
      $scope.registroCapacitacion.fecha_fin = $scope.fechaATexto(
        $scope.registroCapacitacion.fecha_fin
      );
      $scope.registroCapacitacion.tipoCurso =
        $scope.tipoClaseCalificacion.clases.find(
          (x) => (x.id = registro.id_tipo_curso)
        );
      $scope.registroCapacitacion.ponderacion = $scope.listaPonderaciones.find(
        (x) => (x.id = registro.id_ponderacion)
      );
      $scope.registroCapacitacion.certificado = $scope.listaCertificados.find(
        (x) => (x.id = registro.id_certificado)
      );
      $scope.abrirModalCapacitacion();
      $scope.$evalAsync();
    };
    $scope.eliminarRegistroCapacitacion = (registro) => {
      SweetAlert.swal({
        title: "¿Esta seguro de eliminar el registro?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.value) {
          registro.eliminado = true;
          try {
            const res = await EliminarRegistroCapacitacion(
              $scope.usuario.id_empresa,
              registro
            );
            $scope.$evalAsync();
          } catch (error) {
            console.error(error);
          }

        }
      });

    };
    /* fin guardar nueva Capacitacion */
    /* guardar nueva ponderacion */
    $scope.guardarPonderacion = async (registro) => {
      try {
        const res = await GuardarRegistroPonderacion(
          $scope.usuario.id_empresa,
          registro
        );
        $scope.paginadorListaPonderaciones();
        $scope.registroPonderacion = {};
        SweetAlert.swal("", res.mensaje, "success");
      } catch (error) {
        console.error(error);
      }
    };
    $scope.habilitarPonderacion = async (registro) => {
      try {
        $scope.guardarPonderacion(registro);
      } catch (error) {
        console.error(error);
      }
    };
    $scope.modificarPonderacion = (registro) => {
      $scope.registroPonderacion = Object.assign({}, registro);
      if (registro.numerico) {
        $scope.registroPonderacion.nota_minima = parseFloat(
          registro.nota_minima
        );
        $scope.registroPonderacion.nota_minima = parseFloat(
          registro.nota_minima
        );
      }
    };
    $scope.eliminarPonderacion = (registro) => {
      SweetAlert.swal({
        title: "¿Esta seguro de eliminar el registro?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.value) {
          try {
            registro.eliminado = true;

            $scope.guardarPonderacion(registro);
          } catch (error) {
            console.error(error);
          }
        }
      });

    };

    /* guardar nueva calificiacion */
    $scope.setValidatorCalificacion = () => {
      if ($scope.registroCalificacion.ponderacion.numerico) {
        $scope.maxNumberPonderacion = parseFloat(
          $scope.registroCalificacion.ponderacion.nota_maxima
        );
        $scope.minNumberPonderacion = parseFloat(
          $scope.registroCalificacion.ponderacion.nota_minima
        );
      }
    };
    $scope.changeValidatorCalificacion = (hasta, mas) => {
      let min = 0;
      if ($scope.registroCalificacion.ponderacion.numerico) {
        min = parseFloat(hasta) + mas;
      }
      return min;
    };
    $scope.verificarCantidadesCalificacion = () => {
      let bool = false;
      if (
        $scope.detalleCalificacion.hasta ==
        $scope.registroCalificacion.ponderacion.nota_maxima
      ) {
        bool = true;
      }
      return bool;
    };
    $scope.agregarCalificacion = async (detalle) => {
      try {
        if (!detalle.id) {
          if (!$scope.notaMaximaIsSet) {
            if (!detalle.id_) {
              detalle.id_ =
                $scope.registroCalificacion.detallesCalificacion.length + 1;
              $scope.registroCalificacion.detallesCalificacion.push(detalle);
            } else {
              let registroEncontrado =
                $scope.registroCalificacion.detallesCalificacion.find(
                  (x) => x.id_ == detalle.id_
                );
              registroEncontrado.desde = detalle.desde;
              registroEncontrado.hasta = detalle.hasta;
              registroEncontrado.calificacion = detalle.calificacion;
            }
          }
        } else {
          let registroEncontrado =
            $scope.registroCalificacion.detallesCalificacion.find(
              (x) => x.id == $scope.registroCalificacion.id
            );
          registroEncontrado = $scope.registroCalificacion;
        }
        $scope.notaMaximaIsSet = await $scope.verificarCantidadesCalificacion();
        $scope.minNumberPonderacion = await $scope.changeValidatorCalificacion(
          $scope.detalleCalificacion.hasta,
          1
        );
        $scope.detalleCalificacion = {};
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.modificarDetalleCalificacion = async (registro) => {
      try {
        $scope.notaMaximaIsSet = false;
        $scope.verificarEliminarModificarCalificaccion(2);
        $scope.detalleCalificacion = Object.assign({}, registro);
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.eliminarDetalleCalifiacion = async () => {
      try {
        let registroEliminado =
          $scope.registroCalificacion.detallesCalificacion.pop();
        if (registroEliminado.id) {
          registroEliminado.eliminado = true;
          $scope.registroCalificacionEliminados.push(registroEliminado);
        }
        $scope.verificarEliminarModificarCalificaccion(1);
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.verificarEliminarModificarCalificaccion = async (menos) => {
      $scope.notaMaximaIsSet = false;
      let mas = 0;
      let hasta = $scope.registroCalificacion.ponderacion.nota_minima;
      if ($scope.registroCalificacion.detallesCalificacion.length >= 1) {
        const detalle =
          $scope.registroCalificacion.detallesCalificacion[
          $scope.registroCalificacion.detallesCalificacion.length - menos
          ];
        hasta = detalle.hasta;
        mas++;
      }

      $scope.minNumberPonderacion = await $scope.changeValidatorCalificacion(
        hasta,
        mas
      );
    };
    $scope.habilitarPredefinidoCalificacion = async (registro) => {
      try {
        $scope.guardarCalificacion(registro);
      } catch (error) {
        console.error(error);
      }
    };
    $scope.modificarCalificacion = async (registro) => {
      try {
        $scope.registroCalificacion = Object.assign({}, registro);
        $scope.notaMaximaIsSet = true;
        const detalle =
          $scope.registroCalificacion.detallesCalificacion[
          $scope.registroCalificacion.detallesCalificacion.length - 1
          ];

        $scope.setValidatorCalificacion();
        $scope.minNumberPonderacion = await $scope.changeValidatorCalificacion(
          detalle.hasta,
          1
        );
      } catch (error) {
        console.error(error);
      }
    };
    $scope.eliminarCalificacion = (registro) => {
      SweetAlert.swal({
        title: "¿Esta seguro de eliminar el registro?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.value) {
          try {
            registro.eliminado = true;
            $scope.guardarCalificacion(registro);
          } catch (error) {
            console.error(error);
          }
        }
      });

    };
    $scope.guardarCalificacion = async (registro) => {
      let nuevoRegistro = Object.assign(registro);
      nuevoRegistro.detallesCalificacion =
        nuevoRegistro.detallesCalificacion.concat(
          $scope.registroCalificacionEliminados
        );
      try {
        const res = await GuardarRegistroCalificacion(
          $scope.usuario.id_empresa,
          nuevoRegistro
        );
        $scope.paginadorListaCalificaciones();
        $scope.registroCalificacion = {
          detallesCalificacion: []
        };
        $scope.registroCalificacionEliminados = [];
        $scope.maxNumberPonderacion = 0;
        $scope.minNumberPonderacion = 0;
        $scope.notaMaximaIsSet = false;
        $scope.detalleCalificacion = {};
        SweetAlert.swal("", res.mensaje, "success");
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    /* guardar nuevo certificado */
    $scope.ultimoModeloCerficado = async () => {
      try {
        let res = await UltimoModeloCertificado($scope.usuario.id_empresa);
        return res.modelo;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.modificarCertificado = async (registro) => {
      try {
        $scope.nuevoCertificado = true;
        $scope.registroCertificado = Object.assign({}, registro);
      } catch (error) {
        console.error(error);
      }
    };
    $scope.eliminarCertificado = (registro) => {
      SweetAlert.swal({
        title: "¿Esta seguro de eliminar el registro?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.value) {
          try {
            registro.eliminado = true;
            $scope.guardarCertificado(registro);
          } catch (error) {
            console.error(error);
          }
        }
      });


    };

    $scope.cancelarEdicionCertificado = async () => {
      try {
        $scope.nuevoCertificado = false;
        $scope.registroCertificado = await nuevoRegistroCertificado();
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.guardarCertificado = async (registro) => {
      try {
        const res = await GuardarRegistroCertificado(
          $scope.usuario.id_empresa,
          registro
        );
        $scope.paginadorListaCertificados();
        $scope.registroCertificado = await nuevoRegistroCertificado();
        $scope.verCertificadoPrevio();
        SweetAlert.swal("", res.mensaje, "success");
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    /* guardar nuevo empleado */
    $scope.buscarPersonal = async (query) => {
      try {
        if (query != "" && query != undefined) {
          var promesa = await buscarEmpleadoCapacitacion($scope.usuario.id_empresa, query);
          return promesa;
        }
      } catch (error) {
        console.error(error);
      }
    };
    $scope.establecerPersonal = (personal) => {
      $scope.registroEmpleado = {
        id_capacitacion: $scope.registroCapacitacion.id,
        empleado: personal,
        id_empleado: personal.id,
        ci: personal.persona.ci,
        nombre_empleado: personal.persona.nombre_completo,
        campo: personal.campo.nombre,
      };
    }
    $scope.modificarEmpleado = async (registro) => {
      $scope.registroEmpleado = registro;
      const res = await $scope.buscarPersonal(registro.nombre_empleado);
      $scope.registroEmpleado.empleado = res[0];

    }
    $scope.guardarEmpleado = async (registro) => {
      delete registro.empleado;
      try {
        const res = await GuardarRegistroEmpleado(
          $scope.usuario.id_empresa,
          registro
        );
        $scope.paginadorListaEmpleados();
        $scope.registroEmpleado = {};
        SweetAlert.swal("", res.mensaje, "success");
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    $scope.eliminarEmpleado = (registro) => {
      SweetAlert.swal({
        title: "¿Esta seguro de eliminar el registro?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.value) {
          registro.eliminado = true;
          $scope.guardarEmpleado(registro)
        }

      });


    }
    $scope.guardarNotaEmpleados = async () => {
      try {
        const res = await ActualizarNotaEmpleado(
          $scope.usuario.id_empresa,
          $scope.listaPaginadaEmpleados
        );
        $scope.paginadorListaEmpleados();
        SweetAlert.swal("", res.mensaje, "success");
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };
    /* listas ponderacion certifiados activas */

    $scope.listaPonderacionesActivas = async () => {
      try {
        blockUI.start();
        const res = await ListaPonderacionesActivas($scope.usuario.id_empresa);
        blockUI.stop();
        return res.ponderaciones;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.listaCertificadosActivas = async () => {
      try {
        blockUI.start();
        const res = await ListaCertificadosActivas($scope.usuario.id_empresa);
        blockUI.stop();
        return res.certificados;
      } catch (error) {
        console.error(error);
      }
    };
    /* edicion conceptos */
    $scope.obtenerTipoClase = async () => {
      try {
        blockUI.start();
        var res = await ClasesTipoEmpresa(
          "TIPOCLASECAP",
          $scope.usuario.id_empresa
        );
        blockUI.stop();
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.obtenerOrientacionPdf = async () => {
      try {
        blockUI.start();
        var res = await ClasesTipoEmpresa(
          "ORIENTACIONHOJAPDF",
          $scope.usuario.id_empresa
        );
        blockUI.stop();
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.obtenerDimiencionPdf = async () => {
      try {
        blockUI.start();
        var res = await ClasesTipoEmpresa(
          "DIMENSIONHOJAPDF",
          $scope.usuario.id_empresa
        );
        blockUI.stop();
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.obtenerFontsPdf = async () => {
      try {
        blockUI.start();
        var res = await ClasesTipoEmpresa(
          "FONTSPDF",
          $scope.usuario.id_empresa
        );
        blockUI.stop();
        return res;
      } catch (error) {
        console.error(error);
      }
    };
    $scope.agregarConceptoEdicion = (clase) => {
      if (clase.nombre && clase.nombre_corto) {
        if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
          clase.habilitado = true;
          $scope.tipo_edicion.clases.push(clase);
        }
        $scope.clase = {};
      }
    };
    $scope.guardarConceptoEdicion = (tipo) => {
      blockUI.start();
      Tipos.update({
        id_tipo: tipo.id
      }, tipo, (res) => {
        var promesa = ClasesTipoEmpresa(
          tipo.nombre_corto,
          $scope.usuario.id_empresa
        );
        promesa.then((entidad) => {
          tipo = entidad;
          $scope.mostrarMensaje(res.mensaje);
        });
      });
    };
    $scope.agregarConceptoEdicion = (clase) => {
      if (clase.nombre && clase.nombre_corto) {
        if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
          $scope.tipo_edicion.clases.push(clase);
        }
        $scope.clase = {
          habilitado: true
        };
      }
    };
    $scope.modificarConceptoEdicion = (clase) => {
      $scope.clase = clase;
    };

    $scope.removerConceptoEdicion = (clase) => {
      clase.eliminado = true;
    };
    //EXPORTAR
    $scope.seleccionarRegistroImp = (registro) => {
      $scope.registroCapacitacion = registro;
    }
    $scope.subirExcelEmpleadosCalificaciones = async (event) => {
      try {
        let files = event.target.files;
        let i, f, empleados = [];
        for (i = 0, f = files[i]; i != files.length; ++i) {
          let reader = new FileReader();
          let name = f.name;
          reader.onload = async (e) => {
            blockUI.start();
            let data = e.target.result;

            let workbook = XLSX.read(data, {
              type: 'binary'
            });
            let first_sheet_name = workbook.SheetNames[0];
            let row = 2,
              i = 0;
            let worksheet = workbook.Sheets[first_sheet_name];
            do {
              let empleado = {};
              empleado.nombre_empleado = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
              empleado.ci = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
              empleado.nota = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
              empleado.sinRegistroRRHH = false;
              empleado.inactivosRRHH = false;
              empleado.registrosNuevos = false;
              empleado.seleccionado = true;
              empleado.id_capacitacion = $scope.registroCapacitacion.id;
              empleados.push(empleado);

              row++;
              i++;
            } while (worksheet['A' + row] != undefined);
            $scope.validarEmpleados(empleados);
            $scope.limpiarArchivoImportacion()
            blockUI.stop();
          };
          reader.readAsBinaryString(f);
        }
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    }
    $scope.validarEmpleados = async (detallesCapacitacion) => {
      try {
        let boolVerificarModal = false;
        $scope.detallesCapacitacionImportacion = detallesCapacitacion;
        $scope.sinRegistroRRHH = [];
        $scope.inactivosRRHH = [];
        $scope.notaMalAsignada = [];
        $scope.masDeUnRegistroEnPersona = [];
        $scope.registrosNuevos = [];
        for (let index = 0; index < detallesCapacitacion.length; index++) {
          const registroImpotacion = detallesCapacitacion[index];
          let boolVerificarNotaTipo = $scope.verificarNotaTipo(registroImpotacion)
          if (!boolVerificarNotaTipo) {

            const textError = 'La nota "' + registroImpotacion.nota + '" del empleado ' + registroImpotacion.nombre_empleado + ' con CI ' + registroImpotacion.ci + " es incorrecta."
            $scope.notaMalAsignada.push(textError);
          } else {

            let boolVerificarNotaRango = $scope.verificarNotaRango(registroImpotacion)
            if (boolVerificarNotaRango) {
              textError = 'La nota "' + registroImpotacion.nota + '" del empleado ' + registroImpotacion.nombre_empleado + ' con CI ' + registroImpotacion.ci + " esta fuera del rango de la ponderación."
              $scope.notaMalAsignada.push(textError);
            }

          }
          let persona = {},
            data = {},
            registroEmpleadoCapacitacion = $scope.registroCapacitacion.empleados.find(x => {
              return x.ci === registroImpotacion.ci.trim()
            });
          if (!registroEmpleadoCapacitacion) {
            const res = await $scope.buscarPersonal(registroImpotacion.ci.trim());
            if (res.length == 0) {
              registroImpotacion.sinRegistroRRHH = true;
              registroImpotacion.seleccionado = false;
              boolVerificarModal = true;
            } else if (res.length == 1) {
              persona = res[0];
              registroImpotacion.id_empleado = persona.id;
              registroImpotacion.campo = persona.campo.nombre;
              registroImpotacion.empleado = persona;
              if (persona.eliminado === true) {
                registroImpotacion.inactivosRRHH = true;
                registroImpotacion.seleccionado = false;
                boolVerificarModal = true;
              } else {
                registroImpotacion.registrosNuevos = true;
                registroImpotacion.seleccionado = false;
                boolVerificarModal = true;
              }
            } else {
              const textError = 'El empleado ' + registroImpotacion.nombre_empleado + ' con CI ' + registroImpotacion.ci + " tiene mas de 1 registro en personas.(verificar antes de importar)";
              $scope.masDeUnRegistroEnPersona.push(textError);
            }
          } else {
            registroImpotacion.id = registroEmpleadoCapacitacion.id;
            registroImpotacion.id_empleado = registroEmpleadoCapacitacion.id_empleado,
              registroImpotacion.campo = registroEmpleadoCapacitacion.campo
          }

        }
        if ($scope.notaMalAsignada.length >= 1 || $scope.masDeUnRegistroEnPersona.length >= 1) {
          let html = '';
          for (const iterator of $scope.notaMalAsignada) {
            html += '<p class="text-warning">' + iterator + '</p>';
          }
          for (const iterator of $scope.masDeUnRegistroEnPersona) {
            html += '<p class="text-danger">' + iterator + '</p>';
          }

          html += '<p>Corrija y vuelva a importar todo el archivo.</p>';
          SweetAlert.swal({
            title: "Advertencia",
            html: html,
            icon: 'warning',
          });
        } else
          if (boolVerificarModal) {
            $scope.openVerificarModal()

          }
        $scope.$evalAsync()
      } catch (error) {
        SweetAlert.swal('Advertencia', error, 'warning')
      }
    }
    $scope.verificarNotaTipo = (registro) => {
      return $scope.registroCapacitacion.ponderacion.numerico ? !!/[^a-zA-Z]/.test(registro.nota) : !/[^a-zA-Z]/.test(registro.nota);
    }
    $scope.verificarNotaRango = (registro) => {
      let bool = false
      if ($scope.registroCapacitacion.ponderacion.numerico) {
        minimo = parseFloat($scope.registroCapacitacion.ponderacion.nota_minima)
        maximo = parseFloat($scope.registroCapacitacion.ponderacion.nota_maxima)
        nota = parseFloat(registro.nota)
        bool = nota >= minimo && nota <= maximo ? false : true;
      }
      return bool
    }
    $scope.openVerificarModal = () => {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title-verificacion',
        ariaDescribedBy: 'modal-body-verificacion',
        templateUrl: 'modalVerificacionEmpleados.html',
        size: 'sm',
        scope: $scope,
      });
    }
    $scope.guardarImportacionEmpleadosNotas = async () => {
      try {
        let mensaje = ""
        const registrosImportacion = $scope.detallesCapacitacionImportacion.reduce((array, registroImporte) => {
          if (registroImporte.seleccionado) {
            array.push(registroImporte)
          }
          return array
        }, [])
        for (const registroImportacion of registrosImportacion) {
          delete registroImportacion.empleado
          const res = await GuardarRegistroEmpleado(
            $scope.usuario.id_empresa,
            registroImportacion
          );
          mensaje = res.mensaje;
        }
        $scope.paginadorListaCapacitaciones();
        SweetAlert.swal("", mensaje, "success");
        $scope.$evalAsync();
      } catch (error) {
        console.error(error);
      }
    };

    $scope.subirExcelCalificaciones = async (event) => {
      try {
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }
    }
    //reportes 

    $scope.pdfCapacitaciones = async (event) => {
      try {
        const res = await ObtenerListaCapacitacionesReporte($scope.filtroCapacitacion, $scope.convertirFecha)
        let detalles = res.detalles
        if ($scope.filtroCapacitacion.detallado) {
          return $scope.pdfCapacitacionesDetallado(detalles)
        }
        convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
          var doc = new PDFDocument({
            size: [612, 792],
            margins: {
              top: 20,
              bottom: 20,
              left: 30,
              right: 30
            }
          });
          var stream = doc.pipe(blobStream());
          doc.font("Helvetica", 8);
          var y = 150,
            itemsPorPagina = 20,
            items = 0,
            pagina = 1,
            totalPaginas = Math.ceil(detalles.length / itemsPorPagina);
          $scope.dibujarCabeceraPdfCapacitaciones(doc, "datos", imagenEmpresa);
          doc.font('Helvetica', 8);
          for (var i = 0; i < detalles.length && items <= itemsPorPagina; i++) {
            const detalle = detalles[i]
            doc.rect(30, y + 15, 550, 0).stroke();
            doc.text(i + 1, 35, y);
            doc.text(detalle.tipoCurso.nombre, 70, y);
            doc.text(detalle.curso, 190, y);
            doc.text($scope.fechaATexto(detalle.fecha_inicio), 330, y, {
              align: "center",
              width: 50
            });
            doc.text($scope.fechaATexto(detalle.fecha_fin), 380, y, {
              align: "center",
              width: 50
            });
            var yDesc = (detalle.docentes.length > 1) ? y - 8 : y
            for (const docente of detalle.docentes) {
              doc.text(docente.detalle_docente, 440, yDesc);
              yDesc += 8
            }

            y += 30;
            items++;

            if (items == itemsPorPagina) {
              doc.rect(30, 135, 0, items * 30).stroke();
              doc.rect(60, 135, 0, items * 30).stroke();
              doc.rect(180, 135, 0, items * 30).stroke();
              doc.rect(330, 135, 0, items * 30).stroke();
              doc.rect(380, 135, 0, items * 30).stroke();
              doc.rect(430, 135, 0, items * 30).stroke();
              doc.rect(580, 135, 0, items * 30).stroke();
              doc.addPage({
                size: [612, 792],
                margins: {
                  top: 20,
                  bottom: 20,
                  left: 30,
                  right: 30
                },
                bufferPages: true
              });
              y = 150;
              items = 0;
              pagina = pagina + 1;
              $scope.dibujarCabeceraPdfCapacitaciones(doc, "datos", imagenEmpresa);
              doc.font('Helvetica', 10);
            }
          }
          doc.rect(30, 135, 0, items * 30).stroke();
          doc.rect(60, 135, 0, items * 30).stroke();
          doc.rect(180, 135, 0, items * 30).stroke();
          doc.rect(330, 135, 0, items * 30).stroke();
          doc.rect(380, 135, 0, items * 30).stroke();
          doc.rect(430, 135, 0, items * 30).stroke();
          doc.rect(580, 135, 0, items * 30).stroke();
          doc.end();
          stream.on('finish', () => {
            var fileURL = stream.toBlobURL('application/pdf');
            window.open(fileURL, '_blank', 'location=no');
          });
        });
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }

    }
    $scope.dibujarCabeceraPdfCapacitaciones = (doc, datos, imagenEmpresa) => {
      doc.image(imagenEmpresa, 30, 30, {
        fit: [80, 80]
      });
      doc.font("Helvetica-Bold", 16);
      doc.text("LISTA DE CURSOS PROGRAMADOS", 0, 30, {
        align: "center"
      });
      doc.text("Y EJECUTADOS", 0, 50, {
        align: "center"
      });
      doc.font("Helvetica-Bold", 8);
      doc.text("Del " + $scope.filtroCapacitacion.inicio + " hasta " + $scope.filtroCapacitacion.inicio, 0, 70, {
        align: "center"
      });
      doc.rect(30, 110, 550, 25).stroke();
      doc.rect(60, 110, 0, 25).stroke();
      doc.rect(180, 110, 0, 25).stroke();
      doc.rect(330, 110, 0, 25).stroke();
      doc.rect(380, 110, 0, 25).stroke();
      doc.rect(430, 110, 0, 25).stroke();
      doc.text("Nº", 40, 120);
      doc.text("Curso", 110, 120);
      doc.text("Tema", 240, 120);
      doc.text("Fecha Inicio", 340, 115, {
        align: "center",
        width: 30
      });
      doc.text("Fecha Fin", 390, 115, {
        align: "center",
        width: 30
      });
      doc.text("Docentes", 470, 120);
      doc.font("Helvetica", 7);
      doc.text("Usuario.:" + $scope.usuario.persona.nombre_completo, 0, 740, {
        align: "right"
      });
      doc.text("Impresión.:" + $scope.fechaATexto(new Date()) + " Hrs. " + $scope.fechaATiempo(new Date()), 0, 750, {
        align: "right"
      });
    }
    $scope.pdfCapacitacionesDetallado = (detalles) => {
      convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
        var doc = new PDFDocument({
          size: [612, 792],
          margins: {
            top: 20,
            bottom: 20,
            left: 30,
            right: 30
          }
        });
        var stream = doc.pipe(blobStream());
        doc.font("Helvetica", 8);
        var y = 120,
          itemsPorPagina = 20,
          items = 0,
          pagina = 1,
          totalPaginas = Math.ceil(detalles.length / itemsPorPagina);
        $scope.dibujarCabeceraPdfCapacitacionesDetallado(doc, "datos", imagenEmpresa);
        for (var i = 0; i < detalles.length && items <= itemsPorPagina; i++) {
          let detalle = detalles[i];
          let faltafiltas1 = items + 1
          let faltafiltas2 = items + 2
          if (faltafiltas1 == itemsPorPagina || faltafiltas2 == itemsPorPagina) {
            items = 20
            if (items == itemsPorPagina) {
              y = 120;
              items = 0;
              pagina = pagina + 1;
              $scope.addPageCapacitacionDetallado(doc, items, "datos", imagenEmpresa, y)
            }
          }
          doc.font('Helvetica', 8);
          doc.text("Curso: " + detalle.nombre, 40, y);
          y += 30
          $scope.dibujarheaderDetallado(doc, y)
          items++
          if (items == itemsPorPagina) {
            y = 120;
            items = 0;
            pagina = pagina + 1;
            $scope.addPageCapacitacionDetallado(doc, items, "datos", imagenEmpresa, y)
          }

          y += 30
          items++
          if (items == itemsPorPagina) {
            y = 120;
            items = 0;
            pagina = pagina + 1;
            $scope.addPageCapacitacionDetallado(doc, items, "datos", imagenEmpresa, y)
          }
          itemsDetalle = 0;
          for (var j = 0; j < detalle.capacitacionesCurso.length && items <= itemsPorPagina; j++) {
            let capacitacion = detalle.capacitacionesCurso[j];
            doc.font('Helvetica', 8);
            doc.text(j + 1, 35, y);
            doc.rect(30, y + 15, 550, 0).stroke();
            doc.text(capacitacion.curso, 70, y);
            doc.text($scope.fechaATexto(capacitacion.fecha_inicio), 220, y);
            doc.text(capacitacion.empleados.length, 300, y);
            doc.text("promedio", 415, y);
            doc.text(capacitacion.duracion, 520, y);
            y += 30;
            itemsDetalle++;

            if (items == itemsPorPagina) {
              doc.rect(30, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(60, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(210, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(280, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(380, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(480, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              doc.rect(580, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
              y = 120;
              items = 0;
              pagina = pagina + 1;
              itemsDetalle = 0;
              $scope.addPageCapacitacionDetallado(doc, items, "datos", imagenEmpresa, y);
            }

          }
          doc.rect(30, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(60, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(210, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(280, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(380, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(480, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
          doc.rect(580, (y - 15) - (itemsDetalle * 30), 0, itemsDetalle * 30).stroke();
        }


        doc.font("Helvetica", 7);
        doc.text("Usuario.:" + $scope.usuario.persona.nombre_completo, 0, 740, {
          align: "right"
        });
        doc.text("Impresión.:" + $scope.fechaATexto(new Date()) + " Hrs. " + $scope.fechaATiempo(new Date()), 0, 750, {
          align: "right"
        });
        doc.end();
        stream.on('finish', () => {
          var fileURL = stream.toBlobURL('application/pdf');
          window.open(fileURL, '_blank', 'location=no');
        });
      });
    }
    $scope.addPageCapacitacionDetallado = (doc, items, datos, imagenEmpresa, y) => {

      doc.rect(30, 135, 0, items * 30).stroke();
      doc.rect(60, 135, 0, items * 30).stroke();
      doc.rect(210, 135, 0, items * 30).stroke();
      doc.rect(280, 135, 0, items * 30).stroke();
      doc.rect(380, 135, 0, items * 30).stroke();
      doc.rect(480, 135, 0, items * 30).stroke();
      doc.rect(580, 135, 0, items * 30).stroke();
      doc.addPage({
        size: [612, 792],
        margins: {
          top: 20,
          bottom: 20,
          left: 30,
          right: 30
        },
        bufferPages: true
      });
      y = 120
      doc.font('Helvetica', 10);

    }
    $scope.dibujarCabeceraPdfCapacitacionesDetallado = (doc, datos, imagenEmpresa, y) => {
      doc.image(imagenEmpresa, 30, 30, {
        fit: [80, 80]
      });
      doc.font("Helvetica-Bold", 16);
      doc.text("LISTA DE CURSOS PROGRAMADOS", 0, 30, {
        align: "center"
      });
      doc.text("Y EJECUTADOS", 0, 50, {
        align: "center"
      });
      doc.font("Helvetica-Bold", 8);
      doc.text("Del " + $scope.filtroCapacitacion.inicio + " hasta " + $scope.filtroCapacitacion.inicio, 0, 70, {
        align: "center"
      });

    }
    $scope.dibujarheaderDetallado = (doc, y) => {
      doc.rect(30, y - 10, 550, 25).stroke();
      doc.rect(60, y - 10, 0, 25).stroke();
      doc.rect(210, y - 10, 0, 25).stroke();
      doc.rect(280, y - 10, 0, 25).stroke();
      doc.rect(380, y - 10, 0, 25).stroke();
      doc.rect(480, y - 10, 0, 25).stroke();
      doc.text("Nº", 40, y);
      doc.text("Tema", 110, y);
      doc.text("Fecha Inicio", 220, y);
      doc.text("Cantidada Asistentes  ", 285, y - 5, {
        align: "center",
        width: 60
      });
      doc.text("Promedio Nota", 405, y - 5, {
        align: "center",
        width: 50
      });
      doc.text("Total Horas Capacitación", 500, y - 5, {
        align: "center",
        width: 60
      });
    }
    $scope.excelCapacitaciones = () => {
      if ($scope.filtroCapacitacion.detallado) {
        return $scope.excelCapacitacionesDetallado()
      }
      blockUI.start();
      var data = [
        ["CURSO", "TEMA", "DURACION", "FECHA DE REGISTRO", "FECHA DE INICIO", "FECHA FINAL",
          "PONDERACION", "TIPO DE CURSO", "CERTIFICADO", "ESTADO", "DOCENTES"
        ]
      ];
      for (var i = 0; i < $scope.listaPaginadaCapacitaciones.length; i++) {
        var columns = [];
        data.push(columns);
      }
      var ws_name = "SheetJS";
      var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
      });
      saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }), "REPORTE-CAPACITACIONES.xlsx");
      blockUI.stop();
    }
    $scope.excelCapacitacionesDetallado = () => {
      blockUI.start();
      var data = [
        [
          "Curso",
          "Tema",
          "Duración",
          "Fecha de registro",
          "Fecha de inicio",
          "Fecha Final",
          "Ponderación",
          "Tipo de Curso",
          "Docente 1",
          "Docente 2",
          "Certificado",
          "Estado",
          "Empleado",
          "CI",
          "Cargo",
          "Campo",
          "Nota",
          "Hrs.capacitación"
        ]
      ];
      for (var i = 0; i < $scope.listaPaginadaCapacitaciones.length; i++) {
        var columns = [];
        data.push(columns);
      }
      var ws_name = "SheetJS";
      var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
      });
      saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }), "REPORTE-CAPACITACIONES-DETALLADO.xlsx");
      blockUI.stop();
    }

    $scope.abrirModalReportes = async () => {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title-reportes',
        ariaDescribedBy: 'modal-body-reportes',
        templateUrl: 'modalReportesCapacitacion.html',
        size: 'md',
        scope: $scope,
      });
      $scope.obtenerCentroCostos()
      $scope.obtenerCargosRRHH()
      $scope.filtroReporte = {
        desde: new Date(),
        hasta: new Date(),
        empleado: '',
        id_empleado:'',
        curso: '',
        cargo: '',
        campo: ''

      }
      $scope.listaPonderaciones = await $scope.listaPonderacionesActivas();
      $scope.listaCertificados = await $scope.listaCertificadosActivas();
      $scope.tipoClaseCalificacion = await $scope.obtenerTipoClase();
      $scope.$evalAsync();
    }
    $scope.obtenerCargosRRHH = function () {
      blockUI.start();
      var promesa = CargosEmpresa($scope.usuario.id_empresa);
      promesa.then(function (entidad) {
        var cargos = entidad.clases
        $scope.listaCargos = entidad
        $scope.llenarCargos(cargos)
        blockUI.stop();
      });
    }
    $scope.imprimirCertificado = async (capacitacion, empleado) => {
      try {
        let certificado = capacitacion.certificado;
        convertUrlToBase64Image(certificado.imagen, (imagenCertificado) => {
          convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
            let size = certificado?.dimencion?.nombre_corto || 'letter';
            let layout = certificado?.orientacion?.nombre_corto || 'landscape';
            let fit = layout != 'landscape' ? 'FitV' : 'FitH';
            let colorTitulo = certificado.color_texto_uno || `#000000`;
            let colorSubtitulo = certificado.color_subtitulo || `#000000`;
            let ColortextoCentro1 = certificado.color_detalle_estudiante || `#000000`;
            let ColorTextoCentro2 = certificado.color_texto_dos || `#000000`;
            let ColorNombreDocente = certificado.color_nombre_docente || `#000000`;
            let colorSubDocente = certificado.color_subtitulo_docente || `#000000`;
            let dimencion_texto_uno = certificado.dimencion_texto_uno || 40;
            let dimencion_subtitulo = certificado.dimencion_subtitulo || 40;
            let dimencion_detalle_estudiante = certificado.dimencion_detalle_estudiante || 30;
            let dimencion_texto_dos = certificado.dimencion_texto_dos || 30;
            let dimencion_nombre_docente = certificado.dimencion_nombre_docente || 15;
            let dimencion_subtitulo_docente = certificado.dimencion_subtitulo_docente || 15;
            let fontTextoUno = certificado.fontTextoUno?.nombre_corto || 'Helvetica';
            let fontSubtitulo = certificado.fontSubtitulo?.nombre_corto || 'Helvetica';
            let fontDetalleEstudiante = certificado.fontDetalleEstudiante?.nombre_corto || 'Helvetica';
            let fontTextoDos = certificado.fontTextoDos?.nombre_corto || 'Helvetica';
            let fontNombreDocente = certificado.fontNombreDocente?.nombre_corto || 'Helvetica';
            let fontSubtituloDocente = certificado.fontSubtituloDocente?.nombre_corto || 'Helvetica';
            let color_plantilla_uno = certificado.color_plantilla_uno || '#ffffFF';
            let color_plantilla_dos = certificado.color_plantilla_dos || '#ffffFF';
            let empleados = empleado ? [empleado] : capacitacion.empleados;
            for (const empleado of empleados) {
              convertUrlToBase64Image(empleado.empleado.persona.imagen, (imagenEmpleado) => {
                let doc = new PDFDocument({
                  size: size,
                  layout: layout
                });
                let stream = doc.pipe(blobStream());
                let width = doc.page.width;


                if (certificado.plantilla) {
                  doc.image(imagenCertificado, 0, 0, {
                    width: width,
                    height: doc.page.height
                  });
                } else {
                  let grad = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
                  grad.stop(0, color_plantilla_uno)
                    .stop(0.5, color_plantilla_dos)
                    .stop(1, color_plantilla_uno)

                  doc.rect(0, 0, doc.page.width, doc.page.height);
                  doc.fill(grad);
                }

                if (certificado.usar_imagen_empresa) {
                  doc.image(imagenEmpresa, 0, 0, {
                    fit: [100, 100],
                    align: 'center',
                    valign: 'center'
                  });
                }
                doc.font(fontTextoUno, dimencion_texto_uno).fillColor(colorTitulo).text(certificado.texto_uno || 'Titulo', 50, doc.page.height - (doc.page.height * 0.94), {
                  align: "center",
                  width: width - 100
                });
                doc.font(fontSubtitulo, dimencion_subtitulo).fillColor(colorSubtitulo).text(capacitacion.tipoCurso.nombre, {
                  align: "center",
                  width: width - 100
                });
                if (certificado.usar_imagen_empleado) {
                  doc.moveDown(0.4);
                  doc.image(imagenEmpleado, {
                    fit: [width - 100, 100],
                    align: 'center',
                    valign: 'center',
                  });
                  doc.moveDown(0.4);
                } else {
                  doc.moveDown(2);
                }
                doc.font(fontDetalleEstudiante, dimencion_detalle_estudiante).fillColor(ColortextoCentro1).text(`Certificado a: ${empleado.nombre_empleado}`, {
                  align: "center",
                  width: width - 100
                }).font(fontTextoDos, dimencion_texto_dos).fillColor(ColorTextoCentro2).text(`${certificado.texto_dos || ''} ${capacitacion.tipoCurso.nombre}`, {
                  align: "center",
                  width: width - 100
                });
                let widthDocente1 = width - (width * 0.94);
                let widthDocente2 = width - (width * 0.64);
                let widthDocente3 = width - (width * 0.34);
                switch (certificado?.dimencion?.nombre_corto || 'letter') {
                  case 'LEGAL':
                    if (layout === 'landscape') {
                      widthDocente1 = width - (width * 0.90);
                      widthDocente2 = width - (width * 0.60);
                      widthDocente3 = width - (width * 0.30);
                    } else {
                      widthDocente1 = width - (width * 0.98);
                      widthDocente2 = width - (width * 0.68);
                      widthDocente3 = width - (width * 0.38);
                    }
                    break;
                  case 'EXECUTIVE':
                    if (layout != 'landscape') {
                      widthDocente1 = width - (width * 0.99);
                      widthDocente2 = width - (width * 0.69);
                      widthDocente3 = width - (width * 0.39);
                    }
                    break;

                  default:
                    break;
                }
                let docente;
                switch (capacitacion.docentes.length) {
                  case 1:
                    docente = capacitacion.docentes[0];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente2, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    break;
                  case 2:
                    docente = capacitacion.docentes[0];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente1, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    docente = capacitacion.docentes[1];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente3, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    break;
                  case 3:
                    docente = capacitacion.docentes[0];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente1, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    docente = capacitacion.docentes[1];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente2, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    docente = capacitacion.docentes[2];
                    doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(docente.detalle_docente, widthDocente3, doc.page.height - 110, {
                      align: "center",
                      width: 200
                    }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                      align: "center",
                      width: 200
                    });
                    break;
                  default:
                    break;
                }
                doc.end();
                stream.on('finish', () => {
                  let fileURL = stream.toBlobURL('application/pdf');
                  window.open(fileURL, '_blank', 'location=no');
                });
              });

            }

          });


        });
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }
    }
    $scope.verCertificadoPrevio = async (certificado) => {
      try {
        convertUrlToBase64Image(certificado.imagen, (imagenCertificado) => {
          convertUrlToBase64Image($scope.usuario.persona.imagen, (imagenEmpleado) => {
            convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
              let size = certificado?.dimencion?.nombre_corto || 'letter';
              let layout = certificado?.orientacion?.nombre_corto || 'landscape';
              let fit = layout != 'landscape' ? 'FitV' : 'FitH';
              let colorTitulo = certificado.color_texto_uno || `#000000`;
              let colorSubtitulo = certificado.color_subtitulo || `#000000`;
              let ColortextoCentro1 = certificado.color_detalle_estudiante || `#000000`;
              let ColorTextoCentro2 = certificado.color_texto_dos || `#000000`;
              let ColorNombreDocente = certificado.color_nombre_docente || `#000000`;
              let colorSubDocente = certificado.color_subtitulo_docente || `#000000`;
              let dimencion_texto_uno = certificado.dimencion_texto_uno || 40;
              let dimencion_subtitulo = certificado.dimencion_subtitulo || 40;
              let dimencion_detalle_estudiante = certificado.dimencion_detalle_estudiante || 30;
              let dimencion_texto_dos = certificado.dimencion_texto_dos || 30;
              let dimencion_nombre_docente = certificado.dimencion_nombre_docente || 15;
              let dimencion_subtitulo_docente = certificado.dimencion_subtitulo_docente || 15;
              let fontTextoUno = certificado.fontTextoUno?.nombre_corto || 'Helvetica';
              let fontSubtitulo = certificado.fontSubtitulo?.nombre_corto || 'Helvetica';
              let fontDetalleEstudiante = certificado.fontDetalleEstudiante?.nombre_corto || 'Helvetica';
              let fontTextoDos = certificado.fontTextoDos?.nombre_corto || 'Helvetica';
              let fontNombreDocente = certificado.fontNombreDocente?.nombre_corto || 'Helvetica';
              let fontSubtituloDocente = certificado.fontSubtituloDocente?.nombre_corto || 'Helvetica';
              let color_plantilla_uno = certificado.color_plantilla_uno || '#ffffFF';
              let color_plantilla_dos = certificado.color_plantilla_dos || '#ffffFF';
              if (size === 'Medio Oficio') {
                size = [612, 504]
              }
              let doc = new PDFDocument({
                size: size,
                layout: layout
              });

              let stream = doc.pipe(blobStream());
              let width = doc.page.width;


              if (certificado.plantilla) {
                doc.image(imagenCertificado, 0, 0, {
                  width: width,
                  height: doc.page.height
                });
              } else {
                let grad = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
                grad.stop(0, color_plantilla_uno)
                  .stop(0.5, color_plantilla_dos)
                  .stop(1, color_plantilla_uno)

                doc.rect(0, 0, doc.page.width, doc.page.height);
                doc.fill(grad);
              }

              if (certificado.usar_imagen_empresa) {
                doc.image(imagenEmpresa, 0, 0, {
                  fit: [100, 100],
                  align: 'center',
                  valign: 'center'
                });
              }
              doc.font(fontTextoUno, dimencion_texto_uno).fillColor(colorTitulo).text(certificado.texto_uno || 'Titulo', 50, doc.page.height - (doc.page.height * 0.94), {
                align: "center",
                width: width - 100
              });
              doc.font(fontSubtitulo, dimencion_subtitulo).fillColor(colorSubtitulo).text(`Nombre del tipo de curso`, {
                align: "center",
                width: width - 100
              });
              let spaceTopImgs = 0.4;
              let spaceBottonImg = 0.4;
              let spaceBottonNoImg = 2;
              let widthDocente1 = width - (width * 0.94);
              let widthDocente2 = width - (width * 0.64);
              let widthDocente3 = width - (width * 0.34);
              switch (certificado?.dimencion?.nombre_corto || 'letter') {
                case 'letter':
                  if (layout !== 'landscape') {
                    spaceTopImgs = 1.5;
                    spaceBottonImg = 1.5;
                    spaceBottonNoImg = 4;
                  }
                  break;
                case 'legal':
                  if (layout === 'landscape') {
                    widthDocente1 = width - (width * 0.90);
                    widthDocente2 = width - (width * 0.60);
                    widthDocente3 = width - (width * 0.30);
                  } else {
                    spaceTopImgs = 2;
                    spaceBottonImg = 2;
                    spaceBottonNoImg = 5;
                    widthDocente1 = width - (width * 0.98);
                    widthDocente2 = width - (width * 0.68);
                    widthDocente3 = width - (width * 0.38);
                  }
                  break;
                case 'executive':
                  if (layout != 'landscape') {
                    widthDocente1 = width - (width * 0.99);
                    widthDocente2 = width - (width * 0.69);
                    widthDocente3 = width - (width * 0.39);
                  }
                  break;

                default:
                  if (certificado?.dimencion?.nombre === 'Medio Oficio') {
                    if (layout === 'landscape') {
                      widthDocente1 = width - (width * 0.99);
                      widthDocente2 = width - (width * 0.69);
                      widthDocente3 = width - (width * 0.39);
                    } else {
                      widthDocente1 = width - (width * 0.97);
                      widthDocente2 = width - (width * 0.67);
                      widthDocente3 = width - (width * 0.37);
                    }
                  }
                  break;
              }
              if (certificado.usar_imagen_empleado) {
                doc.moveDown(spaceTopImgs);
                doc.image(imagenEmpleado, {
                  fit: [width - 100, 100],
                  align: 'center',
                  valign: 'center',
                });
                doc.moveDown(spaceBottonImg);
              } else {
                doc.moveDown(spaceBottonNoImg);
              }
              doc.font(fontDetalleEstudiante, dimencion_detalle_estudiante).fillColor(ColortextoCentro1).text(`Certificado a: Nombre del estudiante`, {
                align: "center",
                width: width - 100
              }).font(fontTextoDos, dimencion_texto_dos).fillColor(ColorTextoCentro2).text(`${certificado.texto_dos || 'Texto 2'} "Nombre del tipo de curso"`, {
                align: "center",
                width: width - 100
              });
              doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(`Nombre del Docente`, widthDocente1, doc.page.height - 110, {
                align: "center",
                width: 200
              }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                align: "center",
                width: 200
              });
              doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(`Nombre del Docente`, widthDocente2, doc.page.height - 110, {
                align: "center",
                width: 200
              }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                align: "center",
                width: 200
              });
              doc.font(fontNombreDocente, dimencion_nombre_docente).fillColor(ColorNombreDocente).text(`Nombre del Docente`, widthDocente3, doc.page.height - 110, {
                align: "center",
                width: 200
              }).font(fontSubtituloDocente, dimencion_subtitulo_docente).fillColor(colorSubDocente).text('Docente', {
                align: "center",
                width: 200
              });

              if (doc && stream) {
                doc.end();
                stream.on('finish', () => {
                  let fileURL = stream.toBlobURL('application/pdf');
                  if (!PDFObject.supportsPDFs) {
                    console.log("Boo, inline PDFs are not supported by this browser");
                    var w = window.open(fileURL, '_blank', 'location=no');
                    $timeout(() => {
                      w.print();
                    }, 500);
                  } else {
                    $scope.mostrarCertificadoPrevio = true;
                    $timeout(() => {
                      PDFObject.embed(fileURL, "#pdfviewCertificato", {
                        pdfOpenParams: {
                          view: fit,
                          pagemode: 'bookmarks'
                        }
                      });
                    }, 500);

                  }
                });
              }
            });
          });
        });
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }
    }
    $scope.cerrarVistaPrevia = () => {
      $scope.mostrarCertificadoPrevio = false
    }
    $scope.generarReportesEspesificos = (filtro) => {

      const key =
        filtro.tema && filtro.empleado ? 'TemaEmpleado' :
          filtro.tema ? 'Tema' :
            filtro.curso && filtro.empleado ? 'CursoEmpleado' :
              filtro.curso ? 'Curso' :
                filtro.empleado ? 'Empleado' :
                  'Periodo';
      let titulo = ''
      switch (key) {
        case 'Periodo':
          titulo = `CERTIFICADO DE CAPACITACIONES LABORALES GENERAL`;
          pdfReportePorFecha(key, titulo);
          break;
        case 'Empleado':
          titulo = `CERTIFICADO DE CAPACITACIONES LABORALES
        CURSO: ${$scope.filtroReporte.curso.nombre}`
          pdfReportePorEmpleado(key, titulo);
          break;
        case 'Curso':
          titulo = `CERTIFICADO DE CAPACITACIONES LABORALES
        CURSO: ${$scope.filtroReporte.curso.nombre}`
          pdfReportePorFecha('Periodo', titulo);
          break;
        case 'CursoEmpleado':
          titulo = `CERTIFICADO DE CAPACITACIONES LABORALES
        CURSO: ${$scope.filtroReporte.curso.nombre}`
          pdfReportePorEmpleado('Empleado', titulo);
          break;
        default:
          break;
      }
    }
    pdfReportePorFecha = async (tipo, titulo) => {
      try {
        const res = await DatosReportesEspesificosCap($scope.filtroReporte,$scope.usuario.id_empresa)
        let detalles = res;        
        let numeracion=1;
        convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
          var doc = new PDFDocument({
            size: [612, 792],
            margins: {
              top: 20,
              bottom: 20,
              left: 30,
              right: 30
            }
          });
          var stream = doc.pipe(blobStream());
          doc.font("Helvetica", 8);
          var y = 130,
            itemsPorPagina = 21,
            items = 0,
            pagina = 1,
            totalPaginas = Math.ceil(detalles.length / itemsPorPagina);
          dibujarCabeceraPdfReportes(doc, imagenEmpresa, titulo);
          for (var i = 0; i < detalles.length && items <= itemsPorPagina; i++) {
            let capacitacion = detalles[0]
            if (items != itemsPorPagina - 2) {
              doc.font('Helvetica-Bold', 10);
              doc.fillColor('#9dc3e6').text(capacitacion.tipoCurso.nombre, 60, y).fillColor('#000000');
              y += 30;
              items++;
            } else {
              y = 130;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y)
              doc.font('Helvetica-Bold', 10);
              doc.fillColor('#9dc3e6').text(capacitacion.tipoCurso.nombre, 60, y).fillColor('#000000');
              y += 30;
              items++;
            }
            if (items == itemsPorPagina) {
              y = 130;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y)
            }
            dibujarDetallePdfReporte(doc, tipo, y)
            const detalle = detalles[i]
            y += 30;
            items++;
            if (items == itemsPorPagina) {
              y = 130;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y)
            }
            doc.font('Helvetica', 8);
            for (var j = 0; j < capacitacion.empleados.length && items <= itemsPorPagina; j++) {
              let empleado = capacitacion.empleados[j];
              doc.text(numeracion, 60, y, { width: 30, align: 'left' });
              doc.text(empleado.nombre_empleado, 90, y, { width: 150, align: 'left' });
              doc.text(empleado.ci, 240, y, { width: 60, align: 'left' });
              doc.text($scope.fechaATexto(capacitacion.fecha_inicio), 290, y, { width: 60, align: 'left' });
              doc.text(capacitacion.tipoCurso.nombre, 350, y, { width: 140, align: 'left' });
              doc.text(capacitacion.duracion, 485, y, { width: 90, align: 'center' });
              y += 30;
              items++;
              numeracion++;
              if (items == itemsPorPagina) {
                y = 130;
                items = 0;
                pagina = pagina + 1;
                addPageReporte(doc, imagenEmpresa, titulo, y)
              }
            }
            if (items == itemsPorPagina) {
              y = 130;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y)
            }
          }
          doc.end();
          stream.on('finish', () => {
            var fileURL = stream.toBlobURL('application/pdf');
            window.open(fileURL, '_blank', 'location=no');
          });
        });
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }

    }
    addPageReporte = (doc, imagenEmpresa, titulo, y) => {
      doc.addPage({
        size: [612, 792],
        margins: {
          top: 20,
          bottom: 20,
          left: 30,
          right: 30
        },
        bufferPages: true
      });
      dibujarCabeceraPdfReportes(doc, imagenEmpresa, titulo, y);
    }
    dibujarInfoEmpleado = (doc, y) => {
      doc.font('Helvetica-Bold', 8);
      doc.text('Nombre:', 60, y);
      doc.text('CI:', 260, y);
      doc.font('Helvetica', 8);
      doc.text($scope.filtroReporte.empleado.persona.nombre_completo, 100, y);
      doc.text($scope.filtroReporte.empleado.persona.ci, 275, y);
    }
    $scope.establecerPersonalReporte = (personal) => {
      $scope.filtroReporte.empleado = personal
      $scope.filtroReporte.id_empleado = personal.id
    }
    pdfReportePorEmpleado = async (tipo, titulo) => {
      try {
        const res = await DatosReportesEspesificosCap($scope.filtroReporte,$scope.usuario.id_empresa)
        let detalles = res;        
        let numeracion=1;
        convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
          var doc = new PDFDocument({
            size: [612, 792],
            margins: {
              top: 20,
              bottom: 20,
              left: 30,
              right: 30
            }
          });
          var stream = doc.pipe(blobStream());
          doc.font("Helvetica", 8);
          var y = 130,
            itemsPorPagina = 20,
            items = 0,
            pagina = 1,
            totalPaginas = Math.ceil(detalles.length / itemsPorPagina);
          dibujarCabeceraPdfReportes(doc, imagenEmpresa, titulo);
          dibujarInfoEmpleado(doc, y)
          y += 20;
          for (var i = 0; i < detalles.length && items <= itemsPorPagina; i++) {
            let capacitacion = detalles[i];
            if (items != itemsPorPagina - 2) {
              doc.font('Helvetica-Bold', 10);
              doc.fillColor('#9dc3e6').text(capacitacion.tipoCurso.nombre, 60, y).fillColor('#000000');
              y += 30;
              items++;
            } else {
              y = 130;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y);
              dibujarInfoEmpleado(doc, y);
              y += 20;
              doc.font('Helvetica-Bold', 10);
              doc.fillColor('#9dc3e6').text(capacitacion.tipoCurso.nombre, 60, y).fillColor('#000000');
              y += 30;
              items++;
            }
            if (items == itemsPorPagina) {
              y = 150;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y);
              dibujarInfoEmpleado(doc, y);
              y += 20;
            }
            dibujarDetallePdfReporte(doc, tipo, y)
            const detalle = detalles[i]
            y += 30;
            items++;
            if (items == itemsPorPagina) {
              y = 150;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y);
              dibujarInfoEmpleado(doc, y);
              y += 20;
            }
            doc.font('Helvetica', 8);
            for (var j = 0; j < capacitacion.empleados.length && items <= itemsPorPagina; j++) {
              let empleado = capacitacion.empleados[j]
              doc.text(numeracion, 60, y, { width: 30, align: 'left' });
              doc.text($scope.fechaATexto(capacitacion.fecha_inicio), 90, y, { width: 60, align: 'left' });
              doc.text(capacitacion.descripcion, 150, y, { width: 200, align: 'left' });
              doc.text(capacitacion.duracion, 485, y, { width: 90, align: 'center' });
              y += 30;
              items++;
              if (items == itemsPorPagina) {
                y = 150;
                items = 0;
                pagina = pagina + 1;
                addPageReporte(doc, imagenEmpresa, titulo, y);
                dibujarInfoEmpleado(doc, y);
                y += 20;
              }
            }
            if (items == itemsPorPagina) {
              y = 150;
              items = 0;
              pagina = pagina + 1;
              addPageReporte(doc, imagenEmpresa, titulo, y);
              dibujarInfoEmpleado(doc, y);
              y += 20;
            }
          }
          doc.end();
          stream.on('finish', () => {
            var fileURL = stream.toBlobURL('application/pdf');
            window.open(fileURL, '_blank', 'location=no');
          });
        });
        $scope.$evalAsync()
      } catch (error) {
        console.error(error)
      }

    }

    dibujarCabeceraPdfReportes = (doc, imagenEmpresa, titulo, tipo) => {
      doc.font('Helvetica-Bold', 10);
      if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
        if (imagenEmpresa) {
          doc.image(imagenEmpresa, 72, 62, { fit: [100, 51] }); //{ fit: [200, 72] } { fit: [100, 72] }
        }
      }
      //cuadros
      doc.rect(60, 60, 507, 55).stroke();
      doc.rect(164, 60, 0, 55).stroke();
      doc.rect(431, 60, 0, 55).stroke();

      doc.text(titulo, 164, 70, { width: 267, align: "center" });
      doc.font('Helvetica-Bold', 9);
      doc.text(`DEL ${$scope.fechaATexto($scope.filtroReporte.desde)} AL ${$scope.fechaATexto($scope.filtroReporte.hasta)}`, 243, 95);
      doc.font('Helvetica', 9);
      doc.text("Fecha de Impresion", 435, 70, { width: 132, align: "center" });
      doc.font('Helvetica', 9);
      doc.text($scope.fechaATexto(new Date()), 435, 80, { width: 132, align: "center" });


    }
    dibujarDetallePdfReporte = (doc, tipo, y) => {
      switch (tipo) {
        case 'Periodo':
          doc.font('Helvetica-Bold', 10);
          doc.text('N°', 60, y, { width: 30, align: 'left' });
          doc.text('Nombre Completo', 90, y, { width: 150, align: 'left' });
          doc.text('C.I.', 240, y, { width: 60, align: 'left' });
          doc.text('Fecha', 290, y, { width: 60, align: 'left' });
          doc.text('Tema', 350, y, { width: 150, align: 'left' });
          doc.text('Duración(Hrs)', 480, y, { width: 90, align: 'center' });
          break;
        case 'Empleado':
          doc.font('Helvetica-Bold', 10);
          doc.text('N°', 60, y, { width: 30, align: 'left' });
          doc.text('Fecha', 90, y, { width: 60, align: 'left' });
          doc.text('tema', 150, y, { width: 200, align: 'left' });
          doc.text('Duración(Hrs)', 480, y, { width: 90, align: 'center' });
          break;
        default:
          break;

      }
    }



    $scope.inicio();
  },

]);