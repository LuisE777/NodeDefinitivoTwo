angular.module('agil.controladores')
    .controller('ControladorPacientes', ['$scope', '$sce', 'blockUI', '$localStorage', '$window', '$location', '$templateCache', '$route', 'Usuario', 'Paginator', 'DatosPacientes', 'Paciente', '$filter', 'PacientesPaginador', 'ListaDatosPrerequisito', 'CrearPrerequisito', 'Prerequisito', 'DatosPrerequisitoPaciente', 'ListaDatosGenero', 'Vacunas', 'GetListVacunas', 'PacienteVacuna', 'VacunasPaciente', 'AsignarVacunasPaciente', 'AplicacionPacienteVacuna', 'CrearMedicoPacienteConsulta', 'ListaConsultasMedicoPaciente', 'CrearMedicoPacienteFicha', 'BuscarFichaPaciente', 'ListaDatosTiposControl', 'ActualizarPatologiaPaciente', 'ListaPrerequisitosEmpresa', 'ListaPrerequisitosPaciente', 'ActualizarPrerequisito', 'CrearLaboratorio', 'ListaLaboratorios', 'CrearLaboratorioExamen', 'ListaLaboratorioExamenes', 'CrearLaboratorioExamenResultado', 'LaboratorioExamenListaHistorial', 'CrearDiagnostico', 'ListaDiagnosticos', 'CrearDiagnosticoExamen', 'ListaDiagnosticoExamenes', 'DiagnosticoExamenListaHistorial', 'CrearDiagnosticoExamenResultado', 'PacientesEmpresa', 'ListaVacunasEmpresa', 'FichasTecnicasPacientes', 'SignosVitalesPacientes', 'SOAPlistaPacientes', 'aplicacionVacunasPacientes', 'obtenerPaciente', 'Comentario', 'FieldViewer', 'PacienteActivo', 'HistorialFichaMedicoPaciente', 'ActualizarLaboratorio', 'ActualizarLaboratorioExamen', 'ActualizarDiagnostico', 'ActualizarDiagnosticoExamen', 'Tipos', 'EliminarLaboratorio', 'EliminarLaboratorioExamen', 'EliminarDiagnosticoExamen', 'EliminarDiagnostico', 'Prerequisitos', 'GuardarPrerequisitoPaciente', 'PrerequisitosHistorial', 'ListaAlertasVacunasEmpresa', 'Vacuna', 'ClasesTipo', 'ValidarCodigoCuentaEmpleado', '$timeout', 'ClasesTipoEmpresa', 'PrerequisitosSave',
        'ListaPrerequisitosEmpleado', 'ActivarLaboratorio', 'PacientesPreRequisito', 'ListaRolTurnos', 'CrearRolTurno', 'ListaRolTurnos', 'ListaRolTurnosEmpresa', 'GuardarRolesTurnosExtra', 'ObtenerRolesTurnosExtra', 'VerificarUsuarioEmpresa', 'ListaRolTurnosCalendario', 'ObtenerImagen', 'ObtenerConfiguracionIso', 'CrearRiesgosLaborales', 'ObtenerRiesgosLaborales', 'SweetAlert', 'ActualizarRiesgoLaboral', 'ActualizarFichaMedicaPaciente', 'ConsultaMedicoPaciente', 'ActualizarConsultaMedicaPaciente', 'ObtenerFichaMedica','GetCargoByName','GetCampoByName', 'GetDataReporteFichaMedica', 'GetNumberAlerts', 'GuardarConfigAlertas', 'ObtenerConfigAlertas', 'GetVacunaPaciente', 'GetVacunaDosis', 'SaveVacuna', 'DeleteVacuna', 'DeleteDosis', 'GetListVacunasPaciente', 'HistorialVacuna', 'PrerequisitoPacienteById', 'ReprogramarPrerequisitoPaciente', 'GetPrerequisitosPaciente', 'AsignarPrerequisitoPaciente', 'DeletePrerequisito', 'GuardarConfiguracionVacunaProducto', 'ObtenerConfiguracionVacunaProducto', 'EliminarConfigVacunaProducto', 'ObtenerProductosVacuna', 'GetVacunaProductos', 'EliminarVacunaProducto', 'GetVacunaProyeccion', 'GetPacienteLaboratorios', 'ObtenerConsultasPaciente', 'GetPacienteDiagnosticos', 'GetDataReporteGeneralPacientes', 'EliminarHistoricoPaciente', function ($scope, $sce, blockUI, $localStorage, $window, $location, $templateCache, $route, Usuario, Paginator, DatosPacientes, Paciente, $filter, PacientesPaginador, ListaDatosPrerequisito, CrearPrerequisito, Prerequisito, DatosPrerequisitoPaciente, ListaDatosGenero, Vacunas, GetListVacunas, PacienteVacuna, VacunasPaciente, AsignarVacunasPaciente, AplicacionPacienteVacuna, CrearMedicoPacienteConsulta, ListaConsultasMedicoPaciente, CrearMedicoPacienteFicha, BuscarFichaPaciente, ListaDatosTiposControl, ActualizarPatologiaPaciente, ListaPrerequisitosEmpresa, ListaPrerequisitosPaciente, ActualizarPrerequisito, CrearLaboratorio, ListaLaboratorios, CrearLaboratorioExamen, ListaLaboratorioExamenes, CrearLaboratorioExamenResultado, LaboratorioExamenListaHistorial, CrearDiagnostico, ListaDiagnosticos, CrearDiagnosticoExamen, ListaDiagnosticoExamenes, DiagnosticoExamenListaHistorial, CrearDiagnosticoExamenResultado, PacientesEmpresa, ListaVacunasEmpresa, FichasTecnicasPacientes, SignosVitalesPacientes, SOAPlistaPacientes, aplicacionVacunasPacientes, obtenerPaciente, Comentario, FieldViewer, PacienteActivo, HistorialFichaMedicoPaciente, ActualizarLaboratorio, ActualizarLaboratorioExamen, ActualizarDiagnostico, ActualizarDiagnosticoExamen, Tipos, EliminarLaboratorio, EliminarLaboratorioExamen, EliminarDiagnosticoExamen, EliminarDiagnostico, Prerequisitos, GuardarPrerequisitoPaciente, PrerequisitosHistorial, ListaAlertasVacunasEmpresa, Vacuna, ClasesTipo, ValidarCodigoCuentaEmpleado, $timeout, ClasesTipoEmpresa, PrerequisitosSave, ListaPrerequisitosEmpleado, ActivarLaboratorio, PacientesPreRequisito, ListaRolTurnos, CrearRolTurno, ListaRolTurnos, ListaRolTurnosEmpresa, GuardarRolesTurnosExtra, ObtenerRolesTurnosExtra, VerificarUsuarioEmpresa, ListaRolTurnosCalendario, ObtenerImagen, ObtenerConfiguracionIso, CrearRiesgosLaborales, ObtenerRiesgosLaborales, SweetAlert, ActualizarRiesgoLaboral, ActualizarFichaMedicaPaciente, ConsultaMedicoPaciente, ActualizarConsultaMedicaPaciente, ObtenerFichaMedica, GetCargoByName, GetCampoByName, GetDataReporteFichaMedica, GetNumberAlerts, GuardarConfigAlertas, ObtenerConfigAlertas, GetVacunaPaciente, GetVacunaDosis, SaveVacuna, DeleteVacuna, DeleteDosis, GetListVacunasPaciente, HistorialVacuna, PrerequisitoPacienteById, ReprogramarPrerequisitoPaciente, GetPrerequisitosPaciente, AsignarPrerequisitoPaciente, DeletePrerequisito, GuardarConfiguracionVacunaProducto, ObtenerConfiguracionVacunaProducto, EliminarConfigVacunaProducto, ObtenerProductosVacuna, GetVacunaProductos, EliminarVacunaProducto, GetVacunaProyeccion, GetPacienteLaboratorios, ObtenerConsultasPaciente, GetPacienteDiagnosticos, GetDataReporteGeneralPacientes, EliminarHistoricoPaciente) {
            $scope.idModalDialogVacunasPaciente = 'dialog-vacunas-paciente';
            $scope.idModalDialogConsulta = 'modal-wizard-consulta'
            $scope.idModalwizardContainerConsulta = 'modal-wizard-container-consulta'
            $scope.idModalDialogVacunasConfig = 'dialog-vacunas-config'
            $scope.idModalDialogVacunaEdicion = 'dialog-vacuna-nueva'
            $scope.idModalDialogFechaEntrega = 'dialog-fecha-entrega'
            $scope.IdModalDialogLaboratorio = 'dialog-laboratorio'
            $scope.IdModalDialogGraficoSV = 'dialog-grafico'
            $scope.idModalDialogHistorico = 'dialog-previewHistorico'
            $scope.idModalFichaTecnica = 'modal-fichaMedica'
            $scope.idModalwizardContainerFichaTecnica = 'modal-wizard-container-ficha'
            $scope.IdModalDialogLaboratorioExamen = 'dialog-nuevo-examen'
            $scope.IdModalDialogLaboratorioExamenes = 'dialog-examenes'
            $scope.IdModalDialogLaboratorioExamenesNuevoResultado = 'dialog-nuevo-resultado'
            $scope.IdModalDialogLaboratorioExamenHistoricoPreview = 'dialog-previewHistorico'
            $scope.IdModalDialogLaboratorioExamenHistoricoResultado = 'dialog-historico-resultado'
            $scope.idModalDialogPacienteNuevo = 'dialog-paciente-nuevo';
            $scope.idModalwizardContainerPaciente = 'modal-wizard-paciente-container';
            $scope.idModalDialogHistorialVacuna = 'dialog-historial-vacuna';
            $scope.idModalDialogHistorialVacunaGeneral = 'dialog-historial-vacuna-general';
            $scope.idModalDialogDiagnosticos = 'dialog-diagnosticos';
            $scope.idModalDialogDiagnosticoNuevo = 'dialog-diagnostico-nuevo';
            $scope.idModalDialogExamenesDiagnostico = 'dialog-examenesDiagnostico';
            $scope.idModalDialogNuevoExamenDiagnostico = 'dialog-examenDiagnostico-nuevo';
            $scope.idModalDialogHistorialFicha = 'dialog-historico-ficha';
            $scope.idModalDialogCredencial = 'dialog-credencial';
            $scope.idModalDialogPatologias = 'dialog-patologias';
            $scope.idModalDialogComentario = "dialog-editar-comentario";
            $scope.idModalReprogramarVacunas = "dialog-reprogramar-vacunas";
            $scope.idImagenUsuario = 'imagen-persona';
            $scope.idModalHistorialConsulta = 'dialog-historial-consulta';
            $scope.idModalWizardPacienteVista = 'dialog-paciente-vista';
            $scope.idModalContenedorPacienteVista = 'modal-wizard-container-paciente-vista';
            $scope.idModalEliminarPaciente = 'dialog-eliminar-paciente';
            $scope.IdModalDialogNuevoLaboratorio = 'dialog-nuevo-laboratorio';
            $scope.IdModalDialogDiagnosticoExamenHistoricoResultado = 'dialog-historico-resultado-diag';
            $scope.idModalDialogVerResultadosHistorialLab = 'dialog-ver-resultados-Examen';
            $scope.idModalDialogConfirmacionEntregaAdelantado = 'dialog-entrega-adelantada-prerequisito'
            $scope.idModalConceptoEdicionRiesgos = 'dialog-conceptos-riesgos';
            $scope.idModalRolTurnos = "dialog-rol-turnos";
            $scope.idModalHistorialTurnos = "dialog-historial-turnos";
            $scope.idModalCerrarRolDeTurno = 'modal-cerrar-rol-de-turno';
            $scope.IdModalVerificarCuenta = 'modal-verificar-cuenta';
            $scope.idModalRolTurnosNoche = "modal-rol-turnos-noche";
            $scope.idModalReporteRolTurnos = "dialog-reporte-rol-turnos";
            $scope.idModalReporteTurnosDetallado = "dialog-reporte-turnos-detallado";
            $scope.idModalReporteFichasMedicas = "dialog-reporte-fichas-medicas";
            $scope.idModalDialogVacunas = 'dialog-vacunas';
            $scope.idModalConfigProdVac = 'dialog-config-productos-vacunas';
            $scope.idModalReporteLaboratorios = "dialog-reporte-laboratorios";
            $scope.idModalReporteConsultas = "dialog-reporte-consultas";
            $scope.idModalReporteDiagnosticos = "dialog-reporte-diagnosticos";
            
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsPacientes($scope.idModalDialogVacunasPaciente, $scope.idModalDialogConsulta, $scope.idModalwizardContainerConsulta,
                    $scope.idModalDialogVacunasConfig, $scope.idModalDialogVacunaEdicion, $scope.idModalDialogFechaEntrega, $scope.IdModalDialogLaboratorio, $scope.IdModalDialogGraficoSV, $scope.idModalDialogHistorico, $scope.idModalFichaTecnica, $scope.idModalwizardContainerFichaTecnica,
                    $scope.IdModalDialogLaboratorioExamen, $scope.IdModalDialogLaboratorioExamenes, $scope.IdModalDialogLaboratorioExamenesNuevoResultado,
                    $scope.IdModalDialogLaboratorioExamenHistoricoPreview, $scope.IdModalDialogLaboratorioExamenHistoricoResultado, 
                    $scope.idModalDialogPacienteNuevo, $scope.idModalwizardContainerPaciente, $scope.idModalDialogHistorialVacuna, $scope.idModalDialogHistorialVacunaGeneral, $scope.idModalDialogDiagnosticos, $scope.idModalDialogDiagnosticoNuevo,
                    $scope.idModalDialogExamenesDiagnostico, $scope.idModalDialogNuevoExamenDiagnostico, $scope.idModalDialogHistorialFicha, $scope.idModalDialogCredencial,
                    $scope.idModalDialogPatologias, $scope.idModalDialogComentario, $scope.idModalReprogramarVacunas, $scope.idImagenUsuario,
                    $scope.idModalHistorialConsulta, $scope.idModalWizardPacienteVista, $scope.idModalContenedorPacienteVista, $scope.idModalEliminarPaciente, $scope.IdModalDialogNuevoLaboratorio, $scope.IdModalDialogDiagnosticoExamenHistoricoResultado, $scope.idModalDialogVerResultadosHistorialLab, $scope.idModalDialogConfirmacionEntregaAdelantado, $scope.idModalConceptoEdicionRiesgos, $scope.idModalRolTurnos, $scope.idModalHistorialTurnos, $scope.idModalCerrarRolDeTurno, $scope.IdModalVerificarCuenta,
                    $scope.idModalRolTurnosNoche, $scope.idModalReporteRolTurnos, $scope.idModalReporteTurnosDetallado, $scope.idModalReporteFichasMedicas, $scope.idModalDialogVacunas, $scope.idModalConfigProdVac, $scope.idModalReporteLaboratorios, $scope.idModalReporteConsultas, $scope.idModalReporteDiagnosticos);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
                $scope.obtenerColumnasAplicacion();
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalEliminarPaciente);
                $scope.eliminarPopup($scope.idModalDialogVacunasPaciente);
                $scope.eliminarPopup($scope.idModalDialogConsulta);
                $scope.eliminarPopup($scope.idModalDialogVacunasConfig);
                $scope.eliminarPopup($scope.idModalDialogVacunaEdicion);
                $scope.eliminarPopup($scope.idModalDialogFechaEntrega);
                $scope.eliminarPopup($scope.IdModalDialogPreRequisitos);
                $scope.eliminarPopup($scope.IdModalDialogLaboratorio);
                $scope.eliminarPopup($scope.IdModalDialogGraficoSV);
                $scope.eliminarPopup($scope.idModalDialogHistorico);
                $scope.eliminarPopup($scope.idModalFichaTecnica);
                $scope.eliminarPopup($scope.IdModalDialogLaboratorioExamen);
                $scope.eliminarPopup($scope.IdModalDialogLaboratorioExamenes);
                $scope.eliminarPopup($scope.IdModalDialogLaboratorioExamenesNuevoResultado);
                $scope.eliminarPopup($scope.IdModalDialogLaboratorioExamenHistoricoResultado);
                $scope.eliminarPopup($scope.IdEntregaPrerequisito);
                $scope.eliminarPopup($scope.idModalDialogPacienteNuevo);
                $scope.eliminarPopup($scope.idModalDialogPrerequisitoNuevo);
                $scope.eliminarPopup($scope.idModalHistorialPrerequisito);
                $scope.eliminarPopup($scope.idModalEditarPrerequisito);
                $scope.eliminarPopup($scope.idModalDialogHistorialVacuna);
                $scope.eliminarPopup($scope.idModalDialogHistorialVacunaGeneral);
                $scope.eliminarPopup($scope.idModalDialogDiagnosticos);
                $scope.eliminarPopup($scope.idModalDialogDiagnosticoNuevo);
                $scope.eliminarPopup($scope.idModalDialogExamenesDiagnostico);
                $scope.eliminarPopup($scope.idModalDialogNuevoExamenDiagnostico);
                $scope.eliminarPopup($scope.idModalDialogHistorialFicha);
                $scope.eliminarPopup($scope.idModalDialogCredencial);
                $scope.eliminarPopup($scope.idModalDialogPatologias);
                $scope.eliminarPopup($scope.idModalDialogComentario);
                $scope.eliminarPopup($scope.idModalAlertPrerequisitos);
                $scope.eliminarPopup($scope.idModalDiasActivacionPrerequisitos);
                $scope.eliminarPopup($scope.idModalReprogramarPrerequisitos);
                $scope.eliminarPopup($scope.idModalAlertVacunas);
                $scope.eliminarPopup($scope.idModalDiasActivacionVacunas);
                $scope.eliminarPopup($scope.idModalHistorialConsulta);
                $scope.eliminarPopup($scope.idModalWizardPacienteVista);
                $scope.eliminarPopup($scope.IdModalDialogNuevoLaboratorio)
                $scope.eliminarPopup($scope.IdModalDialogDiagnosticoExamenHistoricoResultado)
                $scope.eliminarPopup($scope.idModalDialogVerResultadosHistorialLab)
                $scope.eliminarPopup($scope.idModalReprogramarVacunas)
                $scope.eliminarPopup($scope.idModalDialogConfirmacionEntregaAdelantado)
                $scope.eliminarPopup($scope.idModalConceptoEdicionRiesgos)
                $scope.eliminarPopup($scope.idModalRolTurnos)
                $scope.eliminarPopup($scope.idModalHistorialTurnos)
                $scope.eliminarPopup($scope.idModalCerrarRolDeTurno)
                $scope.eliminarPopup($scope.IdModalVerificarCuenta)
                $scope.eliminarPopup($scope.idModalRolTurnosNoche)
                $scope.eliminarPopup($scope.idModalReporteRolTurnos)
                $scope.eliminarPopup($scope.idModalReporteTurnosDetallado)
                $scope.eliminarPopup($scope.idModalReporteFichasMedicas)
                $scope.eliminarPopup($scope.idModalDialogVacunas)
                $scope.eliminarPopup($scope.idModalDialogPrerequisitosConfig)
                $scope.eliminarPopup($scope.idModalReporteLaboratorios)
                $scope.eliminarPopup($scope.idModalReporteConsultas)
                $scope.eliminarPopup($scope.idModalReporteDiagnosticos)


            });

            $scope.inicio = function () {
                $scope.usuario = JSON.parse($localStorage.usuario);
                $scope.imagenEmpresa;
                const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
                imgDelay.then(function (img) {
                    $scope.imagenEmpresa = img
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
                
                $scope.obtenerNumeroAlertas()
                blockUI.start();
                $scope.paginator = { pages: [] }
                $scope.obtenerCargos()
                $scope.obtenerPacientes();
                $scope.cargarVacunasEmpresa();
                $scope.obtenerGruposSanguineos()
                $scope.estadisicasResultados = [{ id: 1, nombre: 'Mejoró' }, { id: 2, nombre: 'Sigue igual' }, { id: 3, nombre: 'Empeoró' }]
                $scope.paciente = { vacunas: [], cargos: [] };
                $scope.vacunas = []
                $scope.vacuna = { vacunaDosis: [] }
                $scope.vacunaDosis = []
                $scope.requisitos = { preRequisitos: [] }
                $scope.ficha = {}
                $scope.dosis = { tiempo: 0, numero: 0 }
                $scope.obtenerExpeditos()
                $scope.obtenerGenero();
                $scope.obtenerTipoControl()

                $scope.examen = {};
                $scope.grupos_sanguineos = [];
                $scope.filtroHistorialVacunas = [];
                $scope.filtroVacunas = { inicio: "", fin: "", opcion: "0" }
                var fechaAplicacionVacuna = new Date()
                $scope.filtro.fechaAplicacionVacuna_texto = fechaAplicacionVacuna.getDate() + "/" + (fechaAplicacionVacuna.getMonth() + 1) + "/" + fechaAplicacionVacuna.getFullYear()
                blockUI.stop();
                $scope.dosisEdit = false
                $scope.fechaResultado = $scope.fechaATexto(new Date())
                
                $scope.obtenerGruposRol()
                $scope.obtenerClasificacionRol()
                $scope.obtenerTiposRolTurnoExtra()
            }
            $scope.obtenerNombreGrupoSangioneo = (id) => {
                const nombre = $scope.grupos_sanguineos.find(grupo => grupo.id === id)
                return nombre && nombre.nombre || ''
            }
            $scope.obtenerGruposSanguineos = () => {
                const prom = ClasesTipo("tipo_sangre");
                prom.then((entidad) => {
                    $scope.grupos_sanguineos = entidad.clases;
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            // $scope.obtenerGruposriesgo = () => {
            //     const prom = ClasesTipo("tipo_sangre");
            //     prom.then((entidad) => {
            //         $scope.grupos_riesgo = entidad.clases;
            //     }).catch((err) => {
            //         const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
            //         $scope.mostrarMensaje(msg)
            //     })
            // }
            $scope.abrirDialogConceptoEdicion = function (tipo) {
                $scope.empleo = {};

                let cargosEmpleado = [];
                for (let index = 0; index < $scope.ficha.paciente.empleadosFichas[0].cargos.length; index++) {
                    const element = $scope.ficha.paciente.empleadosFichas[0].cargos[index];
                    cargosEmpleado.push(element.cargo);
                }

                $scope.empleos = cargosEmpleado;
                $scope.abrirPopup($scope.idModalConceptoEdicionRiesgos);
                // const prom = ClasesTipo("RRHH_CARGO");
                // prom.then((entidad) => {
                //     if(entidad)
                //     $scope.empleos = entidad.clases;
                //     $scope.abrirPopup($scope.idModalConceptoEdicionRiesgos);                    
                // }).catch((err) => {
                //     const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                //     $scope.mostrarMensaje(msg)
                // })

            }

            $scope.editarRiesgoLaboral = (riesgo) => {
                $scope.riesgo = riesgo;
                $scope.empleo.id = riesgo.id;
                $scope.empleo.nombre = riesgo.nombre_riesgo;
                $scope.empleo.descripcion = riesgo.descripcion;
                $scope.empleo.cargo = riesgo.riesgo;
                $scope.empleo.editar = true;

            }

            $scope.cancelarEditarRiesgoLaboral = () => {
                $scope.empleo.id = "";
                $scope.empleo.nombre = "";
                $scope.empleo.descripcion = "";
                $scope.empleo.cargo = "";
                $scope.empleo.editar = false;
            }

            $scope.obtenerRiesgosEmpleadoModificar2222 = function (cargos, riesgoModificado) {
                var riegosText = "";
                for (let index = 0; index < cargos.length; index++) {
                    const element = cargos[index];

                    const datosModificados = element.cargo.riesgos.map(riesgo => {
                        if (riesgo.id == riesgoModificado.id) {
                            riesgo.nombre_riesgo = riesgoModificado.nombre_riesgo;
                            riesgo.eliminado = riesgoModificado.eliminado
                        }
                    });


                    if (riegosText) {
                        riegosText = riegosText + "," + datosModificados.filter(riesgo => {
                            if (!riesgo.eliminado) {
                                return riesgo.nombre_riesgo = riesgoModificado.nombre_riesgo
                            }
                        }).join(',')
                    } else {
                        riegosText = datosModificados.filter(riesgo => {
                            if (!riesgo.eliminado) {
                                return riesgo.nombre_riesgo = riesgoModificado.nombre_riesgo
                            }
                        }).join(',')
                    }
                }
                return riegosText;
            }

            $scope.cambiarRiesgoEliminado = function (riesgos, riesgoModificado) {
                riesgos.cargo.riesgos.forEach((item, index) => {
                    if (item.id == riesgoModificado.id) {
                        riesgos.cargo.riesgos[index].eliminado = riesgoModificado.eliminado;
                    }
                })
            }

            $scope.obtenerRiesgosEmpleadoModificar = function (cargos, riesgoModificado) {
                var riegosText = "";
                for (let index = 0; index < cargos.length; index++) {
                    const element = cargos[index];
                    // para modificar si eliminado o no ===========
                    $scope.cambiarRiesgoEliminado(element, riesgoModificado);

                    const noEliminados = element.cargo.riesgos.filter(function (riesgo) {
                        return riesgo.eliminado == false
                    });

                    if (riegosText) {
                        riegosText = riegosText + "," + noEliminados.map(riesgo => {
                            if (riesgo.id == riesgoModificado.id) {
                                return riesgo.nombre_riesgo = riesgoModificado.nombre_riesgo
                            } else {
                                return riesgo.nombre_riesgo
                            }
                        }).join(',')
                    } else {
                        riegosText = noEliminados.map(riesgo => {
                            if (riesgo.id == riesgoModificado.id) {
                                return riesgo.nombre_riesgo = riesgoModificado.nombre_riesgo
                            } else {
                                return riesgo.nombre_riesgo
                            }
                        }).join(',')
                    }
                }
                return riegosText;
            }

            $scope.modificarRiesgoLaborar = (riesgo, desactivar) => {
                riesgo.desactivar = desactivar ? desactivar : false;
                const prom = ActualizarRiesgoLaboral(riesgo, $scope.usuario.id_empresa)
                prom.then((riesgoLaboral) => {
                    if (riesgoLaboral.hasErr) {
                        alert(riesgoLaboral.mensaje)
                    } else {
                        if (!desactivar) {
                            $scope.riesgo.nombre_riesgo = riesgo.nombre;
                            $scope.riesgo.descripcion = riesgo.descripcion;
                            $scope.riesgo.riesgo = riesgo.cargo;
                            $scope.ficha.riesgo = $scope.obtenerRiesgosEmpleadoModificar($scope.ficha.paciente.empleadosFichas[0].cargos, $scope.riesgo);
                            $scope.mostrarMensaje("Modificado");
                            $scope.cancelarEditarRiesgoLaboral();
                        } else {
                            $scope.ficha.riesgo = $scope.obtenerRiesgosEmpleadoModificar($scope.ficha.paciente.empleadosFichas[0].cargos, riesgo);
                            if (riesgo.eliminado) {
                                $scope.mostrarMensaje("Dehabilitado");
                            } else {
                                $scope.mostrarMensaje("Habilitado");
                            }
                        }
                    }
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.asignarRiesgoLaboral = () => {
                // alert($scope.empleo.cargo.nombre + ' ' + $scope.empleo.nombre + ' ' + $scope.empleo.descripcion)
                const prom = CrearRiesgosLaborales($scope.empleo, $scope.usuario.id_empresa)
                prom.then((riesgoLaboral) => {
                    if (riesgoLaboral.hasErr) {
                        alert(riesgoLaboral.mensaje)
                    } else {
                        $scope.mostrarMensaje("Guardado");
                        $scope.empleo.nombre = '';
                        $scope.empleo.descripcion = ''
                        riesgoLaboral.riesgo.riesgo = $scope.empleo.cargo;
                        $scope.RiesgosCargo.push(riesgoLaboral.riesgo)
                        const cargo_empleado = $scope.ficha.paciente.empleadosFichas[0].cargos[0] && $scope.ficha.paciente.empleadosFichas[0].cargos[0] && $scope.ficha.paciente.empleadosFichas[0].cargos[0].cargo
                        if (cargo_empleado) {
                            cargo_empleado.riesgos.push(riesgoLaboral.riesgo);
                            $scope.ficha.riesgo = $scope.obtenerRiesgosEmpleado($scope.ficha.paciente.empleadosFichas[0].cargos);

                        } else {
                            $scope.ficha.riesgo = 'Error'
                        }
                    }
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.obtenerRiesgosCargo = (cargo, return_) => {
                if (return_) {
                    const prom = ObtenerRiesgosLaborales(cargo, $scope.usuario.id_empresa)
                    prom.then((riesgosLaborales) => {
                        if (riesgosLaborales.hasErr) {
                            $scope.RiesgosCargo = []
                        } else {
                            $scope.RiesgosCargo = riesgosLaborales.riesgos
                        }
                    }).catch((err) => {
                        const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                } else {
                    const prom = ObtenerRiesgosLaborales(cargo, $scope.usuario.id_empresa)
                    prom.then((riesgosLaborales) => {
                        if (riesgosLaborales.hasErr) {
                            return []
                        } else {
                            return riesgosLaborales.riesgos
                        }
                    }).catch((err) => {
                        const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }
            }
            $scope.cerrarDialogConceptoEdicion = function () {
                $scope.cerrarPopup($scope.idModalConceptoEdicionRiesgos);
            }
            $scope.agregarConceptoEdicion = function (clase) {
                if (clase.nombre && clase.nombre_corto) {
                    if ($scope.tipo_edicion.clases.indexOf(clase) == -1) {
                        $scope.tipo_edicion.clases.push(clase);
                    }
                    $scope.clase = {}
                }
            }
            $scope.modificarConceptoEdicion = function (clase) {
                $scope.clase = clase;
            }

            $scope.removerConceptoEdicion = function (clase) {
                clase.eliminado = true;
            }

            $scope.guardarConceptoEdicion = function (tipo) {
                blockUI.start();
                Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
                    var promesa = ClasesTipo(tipo.nombre_corto);
                    promesa.then(function (entidad) {
                        tipo = entidad
                        blockUI.stop();
                        $scope.cerrarDialogConceptoEdicion();
                        $scope.mostrarMensaje('Guardado Exitosamente!');
                    });
                });
            }
            $scope.obtenerExpeditos = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_EXP", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.expeditos = entidad
                    blockUI.stop();
                });
            }

            


            $scope.seleccionarCargos = function (cargosPaciente) {
                if (cargosPaciente.length > 0) {
                    for (var i = 0; i < $scope.cargos.length; i++) {
                        for (var j = 0; j < cargosPaciente.length; j++) {
                            if ($scope.cargos[i].id == cargosPaciente[j].id_cargo) {
                                $scope.cargos[i].ticked = true;
                            }
                        }
                    }
                }
            }
            
            

            $scope.imcCal = function (consulta) {
                //Cálculo indice masa corporal
                if (consulta.talla != undefined && consulta.peso != undefined) {
                    if (consulta.talla > 0 && consulta.peso > 0) {
                        var rxp = (consulta.talla / 100) * (consulta.talla / 100)
                        consulta.indice_masa = consulta.peso / rxp
                        consulta.indice_masa = consulta.indice_masa.toFixed(2)
                    }
                    $scope.ClasificacionIMC = ""
                    $scope.ColorIMC = ""
                    if (consulta.indice_masa < 16) {
                        $scope.ClasificacionIMC = "Infrapeso: Delgadez Severa"
                    }
                    if (consulta.indice_masa >= 16 && consulta.indice_masa < 17) {
                        $scope.ClasificacionIMC = "Infrapeso: Delgadez moderada"
                    }
                    if (consulta.indice_masa >= 17 && consulta.indice_masa < 18.49) {
                        $scope.ClasificacionIMC = "Infrapeso: Delgadez aceptable"
                    }
                    if (consulta.indice_masa >= 18.50 && consulta.indice_masa < 25) {
                        $scope.ClasificacionIMC = "Peso Normal"
                    }
                    if (consulta.indice_masa >= 25 && consulta.indice_masa < 30) {
                        $scope.ClasificacionIMC = "Sobrepeso"
                    }
                    if (consulta.indice_masa >= 30 && consulta.indice_masa < 35) {
                        $scope.ClasificacionIMC = "Obeso: Tipo I"
                    }
                    if (consulta.indice_masa >= 35 && consulta.indice_masa < 40) {
                        $scope.ClasificacionIMC = "Obeso: Tipo II"
                    }
                    if (consulta.indice_masa >= 40) {
                        $scope.ClasificacionIMC = "Obeso: Tipo III"
                    }

                }

            }

            $scope.obtenerColumnasAplicacion = function () {
                $scope.fieldViewer = FieldViewer({
                    crear: false,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        codigo: { value: "Codigo", show: true },
                        nombre: { value: "Nombre", show: true },
                        fecha_inicio: { value: "Fecha Inicio", show: true },
                        empresa: { value: "Empresa", show: true },
                        imagen: { value: "Imagen", show: true },
                        ci: { value: "CI", show: true },
                        extension: { value: "Extension", show: true },
                        residencia: { value: "residencia", show: true },
                        grupo_sanguineo: { value: "Grupo Sang.", show: true },
                        campo: { value: "Campo", show: true },
                        cargo: { value: "Cargo", show: true }
                    }
                }, $scope.aplicacion.aplicacion.id);
                $scope.fieldViewer.updateObject();
            }

            // $scope.fechaATexto = function (fecha) {
            //     fech = new Date(fecha)
            //     fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
            //     return fecha
            // }

            $scope.agregarDosisVacuna = function (dosis) {
                blockUI.start();

                if (dosis.id != undefined || dosis.id != null) {
                    indx = $scope.vacunaDosis.indexOf(dosis)
                    dosis.es_dosis = (dosis.es_dosis == null || dosis.es_dosis == undefined) ? false : dosis.es_dosis
                    dosis.numero = indx
                    $scope.vacunaDosis[indx] = dosis
                } else {
                    dosis.es_dosis = (dosis.es_dosis == null || dosis.es_dosis == undefined) ? false : dosis.es_dosis
                    dosis.numero = $scope.vacunaDosis.length + 1
                    $scope.vacunaDosis.push(dosis)
                }
                $scope.dosis = {}
                blockUI.stop();
            }

            $scope.agregarDosisEditada = function (dosis) {
                if ($scope.vacunaDosis.length > 1) {
                    dosis.unico = false
                }
                $scope.vacunaDosis[dosis.index] = dosis
                $scope.dosis = {}
                $scope.dosisEdit = false
            }

            $scope.eliminarDosis = function (dosis) {
                if (dosis.id === undefined) {
                    $scope.vacunaDosis.splice($scope.vacunaDosis.indexOf(dosis), 1);
                } else {
                    var indx = $scope.vacunaDosis.indexOf(dosis)
                    $scope.vacunaDosis[indx].eliminado = true

                    $scope.vacunaDosis[indx].eliminar = true
                }

            }

            $scope.editarLaDosis = function (dosis) {
                $scope.dosis = dosis
                $scope.dosisEdit = true

            }

            $scope.asignarVacunas = function (i, id_paciente, id_vacuna) {
                if ($scope.paciente.eliminado) {
                    SweetAlert.swal("",'No se puede asignar vacuna a un paciente inactivo!', "error");
                } else {
                   if(id_paciente && id_vacuna){
                    SweetAlert.swal({
                        html: `<b>¿Está seguro de realizar este cambio?</b>`,
                        icon: 'warning',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#D33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No",
                    }).then(result => {
                        if(result.isConfirmed){
                            blockUI.start();
                            AsignarVacunasPaciente(id_paciente, id_vacuna)
                            .then(res => {
                                SweetAlert.swal("",res.message, res.messageType);
                                if(!res.error) $scope.obtenerHistorialProyecciones(id_paciente, true)
                            })
                            blockUI.stop();
                        }else{
                            $scope.vacunasPaciente[i].asignado=!$scope.vacunasPaciente[i].asignado
                        }
                    })
                   }else{
                        SweetAlert.swal("",'<b>Parámetros incorrectos</b><br><p>No se guardaron cambios</p><br>', "error");
                   }
                }
                blockUI.stop();
            }

            $scope.obtenerVacunasPaciente = function (config, id) {
                var promesa = GetListVacunasPaciente(config, id, $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    if(!res.error){
                        if(config){
                            $scope.vacunasPaciente = res.vacunas
                        }else{
                            $scope.vacunasAsignadas = res.vacunas
                        }
                    }else{
                        SweetAlert.swal("", res.message, res.messageType);
                    }
                })
            }

            $scope.limpiarAsignacionVacunas = function () {
                blockUI.start();
                $scope.vacunas.forEach(function (vacuna) {
                    vacuna.asignada = false
                }, this);
                blockUI.stop();
            }

            $scope.verificarAsignacionVacunas = function () {
                blockUI.start();
                if ($scope.paciente.vacunas.length > 0) {
                    $scope.paciente.vacunas.forEach(function (vacuna) {
                        for (var index = 0; index < $scope.vacunas.length; index++) {
                            if (vacuna.id_vacuna == $scope.vacunas[index].id && !vacuna.eliminado) {
                                $scope.vacunas[index].asignada = true
                            }
                        }
                    }, this);
                }
                blockUI.stop();
            }


            $scope.validarDatosVacuna = function (vacuna) {
                if ($scope.vacunaDosis.length > 0 && vacuna.nombre != "") {
                    return false
                } else {
                    return true
                }
            }

            $scope.editarVacuna = function (valid, vacuna) {
                blockUI.start();
                if (!valid) {
                    SweetAlert.swal("", 'Complete los campos requeridos!', "error");
                    return
                }
                vacuna.id_empresa = $scope.usuario.id_empresa;
                $scope.vacuna = vacuna
                if(!vacuna.id && vacuna.unico){
                    $scope.vacuna.vacunaDosis = [{ es_dosis: 1, tiempo: 1, numero:1, eliminado: 0 }]
                    $scope.vacuna.vacunaProductos = $scope.vacunaProductos
                }else{
                    if(vacuna.unico && $scope.vacunaDosis.length != 1){
                        SweetAlert.swal("", '<b>La vacuna de dosis única</b><br><small>Debe tener un unico detalle de dosis</small>', "error");
                        blockUI.stop();
                        return
                    }
                    if(!vacuna.unico && $scope.vacunaDosis.length == 0){
                        SweetAlert.swal("", '<b>Asigne las dosis a la vacuna</b><br><small>Debe tener almenos una dosis</small>', "error");
                        blockUI.stop();
                        return
                    }
                    $scope.vacuna.vacunaDosis = $scope.vacunaDosis
                    $scope.vacuna.vacunaProductos = $scope.vacunaProductos
                }
                SaveVacuna($scope.vacuna)
                .then(res =>{
                    SweetAlert.swal("", res.message, res.typeMessage);
                    if(!res.error) $scope.cargarVacunasEmpresa();
                    blockUI.stop();
                })
                $scope.vacunaDosis = []
                $scope.vacunaProductos = []
                $scope.cerrarPopUpVacunaNueva()
            }

            $scope.obtenerPrerequisitos = function () {
                blockUI.start();
                var requisitos = Prerequisitos($scope.usuario.id_empresa)
                requisitos.then(function (prerequisitos) {
                    $scope.preRequisitos = prerequisitos.prerequisitos
                    blockUI.stop();
                })
            }

            $scope.obtenerGenero = function () {
                blockUI.start();
                $scope.generos = []
                var promesa = ListaDatosGenero();
                promesa.then(function (entidad) {
                    entidad.forEach(function (genero) {
                        $scope.generos.push(genero)
                    }, this);
                    blockUI.stop();
                });
            }

            $scope.obtenerPacientes = function () {
                blockUI.start();
                $scope.paginator = Paginator();
                $scope.paginator.column = "codigo";
                $scope.paginator.direction = "asc";
                $scope.filtro = { empresa: $scope.usuario.id_empresa, codigo: "", nombres: "", ci: "", campo: "", cargo: "", busquedaEmpresa: "", estado: "", grupo_sanguineo: "" };
                $scope.paginator.callBack = $scope.buscarPacientes;
                $scope.paginator.getSearch("", $scope.filtro, null);
                blockUI.stop();

            }

            $scope.buscarPacientes = function () {
                blockUI.start();
                console.log('paginator', $scope.paginator);
                var promesa = PacientesPaginador($scope.paginator);
                promesa.then(function (dato) {
                    $scope.paginator.setPages(dato.paginas);

                    $scope.dynamicPopoverCargos = {
                        templateUrl: 'myPopoverTemplate.html',
                    };
                    if (dato.pacientes.length > 0) {
                        /*  if (dato.fichas.length > 0) {
                             for (var i = 0; i < dato.fichas.length; i++) {
                                 var ficha = dato.fichas[i];
                                 if (ficha != null) {
                                     dato.pacientes.forEach(function (pac, index, array) {
                                         pac.eliminado = (pac.activo == 0) ? true : false
                                         pac.ficha = (pac.id == ficha.id_empleado) ? ficha : pac.ficha
                                         if (pac.ficha) {
                                             if (pac.ficha.cargos.length>0) {
                                                 pac.cargosids = pac.ficha.cargos.map(function (cargo) {
                                                     return cargo.id
                                                 })
                                             }
                                         }
                                         if (index === array.length - 1) {
                                             $scope.pacientes = dato.pacientes;
 
                                         }
                                     });
                                 } else {
                                     if (i === (dato.fichas.length - 1)) {
                                         dato.pacientes.forEach(function (pac, index, array) {                                          
                                             pac.eliminado = (pac.activo == 0) ? true : false
                                             if (index === array.length - 1) {
                                                 $scope.pacientes = dato.pacientes;
 
                                             }
                                         });
 
                                     }
                                 }
                             }
                         } else { */
                        dato.pacientes.forEach(function (pac, index, array) {
                            pac.activo = !!pac.activo;
                            if (pac.es_empleado) {
                                pac.cargos = pac.cargos ? pac.cargos.split(",") : "";
                            }
                            if (pac.fichas) {
                                console.table(pac.fichas)
                            }
                            if (index === array.length - 1) {
                                $scope.pacientes = dato.pacientes;

                            }
                        });
                        /*   } */
                    } else {
                        $scope.pacientes = dato.pacientes;

                    }
                    blockUI.stop();
                });
            }

            $scope.guardarFichaTecnica = async function (form, ficha) {
                var button = $('#siguiente-f').text().trim();
                    if (button != "Siguiente" && form.$valid) {
                        ficha.paciente.empleadosFichas.length == 1 ? ficha.id_ficha=ficha.paciente.empleadosFichas[0].id : ficha.id_ficha = null;
                        if (ficha.id) {
                            $scope.guardarFichaTecnicaExistente(form, ficha);
                        } else {
                            let suc = $scope.usuario.sucursalesUsuario.find(function (suc) {
                                return suc.sucursal.numero == "0"
                            });
                            var q;
                            if(suc) {
                                q = await ObtenerConfiguracionIso(suc.id_sucursal)
                                if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter( cfg => cfg.tipoDocumento.nombre_corto === "FICMED" && cfg.activo == true);
                                if($scope.usuario.empresa.usar_configuracion_iso && q.length == 1) {
                                    ficha.configuracionesIso = q[0];
                                    ficha.config_doc_iso = q[0].id;
                                }else{
                                    ficha.configuracionesIso = undefined;
                                    ficha.config_doc_iso = undefined;
                                }
                            }else{
                                ficha.configuracionesIso = undefined;
                                ficha.config_doc_iso = undefined;
                            }
                            ficha.fecha_elaboracion = new Date($scope.convertirFecha(ficha.fecha_elaboracion));
                            var promesa = CrearMedicoPacienteFicha(ficha);
                            promesa.then(function (dato) {
                                $scope.cerrarPopUpIdModalFichaTecnica()
                                $scope.imprimirIsoFichaMedica(dato.ficha_medica.id, dato.config_iso.version_impresion)
                                SweetAlert.swal("Guardado!", dato.message, "success");
                            })
                        }
                    }else{
                        if (button != "Siguiente"){
                            let errors = ""
                            for(const [key, value] of Object.entries(form.$error)){
                                errors+=`<center><strong> ${ key === 'maxlength' ? 'Cantidad de caracteres excedido' :'Errores' } </strong><center>`
                                for (let i = 0; i < value.length; i++) {
                                    const err = value[i];
                                    let { $name : vla} = err
                                    errors += `<p>${ vla }</p>`
                                }
                            }
                            SweetAlert.swal("Datos incorrectos", errors, "error");
                        }
                    }
            }

            $scope.guardarFichaTecnicaExistente = function (form, ficha) {
                if (form.$valid) {
                    ficha.paciente.empleadosFichas.length == 1 ? ficha.id_ficha=ficha.paciente.empleadosFichas[0].id : ficha.id_ficha = null;
                    SweetAlert.swal({
                        title: "¿Que desea realizar con la Ficha?",
                        text: "",
                        icon: 'warning',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#69AA46',
                        confirmButtonText: 'Actualizar',
                        cancelButtonText: "Nuevo",
                    }).then( async function (result) {
                        if (result.isConfirmed) {
                            ficha.fecha_elaboracion = new Date($scope.convertirFecha(ficha.fecha_elaboracion));
                            const prom = ActualizarFichaMedicaPaciente(ficha)
                            prom.then( (fichaMedica) => {
                                if (fichaMedica.hasErr) {
                                    alert(fichaMedica.mensaje)
                                } else {
                                    ficha.configuracionesIso != undefined ? ficha.configuracionesIso.predefinido ? $scope.imprimirIsoFichaMedica(ficha.id, ficha.configuracionesIso.version_impresion) : '' : '';
                                    //SweetAlert.swal("Guardado!", fichaMedica.message, "success");
                                    $scope.cerrarPopUpIdModalFichaTecnica()
                                }
                            }).catch((err) => {
                                const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                $scope.mostrarMensaje(msg)
                            })
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            ficha.fecha_elaboracion = new Date($scope.convertirFecha(ficha.fecha_elaboracion));
                            let suc = $scope.usuario.sucursalesUsuario.find(function (suc) {
                                return suc.sucursal.numero == "0"
                            });
                            var q;
                            if(suc) {
                                q = await ObtenerConfiguracionIso(suc.id_sucursal)
                                if (q.configuracionesIso.length > 0) q = q.configuracionesIso.filter( cfg => cfg.tipoDocumento.nombre_corto === "FICMED" && cfg.activo == true);
                                if($scope.usuario.empresa.usar_configuracion_iso && q.length == 1) {
                                    ficha.configuracionesIso = q[0];
                                    ficha.config_doc_iso = q[0].id;
                                }else{
                                    ficha.configuracionesIso = undefined;
                                    ficha.config_doc_iso = undefined;
                                }
                            }else{
                                ficha.configuracionesIso = undefined;
                                ficha.config_doc_iso = undefined;
                            }
                            /* ficha.cargos = ''
                            if(ficha.paciente.empleadosFichas.length){
                                ficha.cargos = ficha.paciente.empleadosFichas[0].cargos.map(cargo => cargo.cargo.nombre).join(', ');
                            } */   
                            var promesa = CrearMedicoPacienteFicha(ficha);
                            promesa.then(function (dato) {
                                $scope.cerrarPopUpIdModalFichaTecnica()
                                // $scope.recargarItemsTabla()
                                console.log('guardado return', dato);
                                dato.config_iso != undefined ? dato.config_iso.predefinido ? $scope.imprimirIsoFichaMedica(dato.ficha_medica.id, dato.config_iso.version_impresion) :'' : '';
                                SweetAlert.swal("Guardado!", dato.message, "success");
                            })
                        }
                    });
                } else {
                    let errors = ""
                    for(const [key, value] of Object.entries(form.$error)){
                        errors+=`<center><strong> ${ key === 'maxlength' ? 'Cantidad de caracteres excedido' :'Errores' } </strong><center>`
                        for (let i = 0; i < value.length; i++) {
                            const err = value[i];
                            let { $name : vla} = err
                            errors += `<p>${ vla }</p>`
                        }
                      }
                    SweetAlert.swal("Datos incorrectos", errors, "error");
                }

            }

            $scope.dosisText = "Mes(es)";
            $scope.textoDosis = function ($event) {
                if ($event) {
                    $scope.dosisText = "Día(s)";
                } else {
                    $scope.dosisText = "Mes(es)";
                }
            }

            $scope.imprimirCredencial = async function (ficha) {
                SweetAlert.swal({
					icon: 'info',
					iconHtml:`<div>
                    <i class="fa fa-file-pdf-o size-icon"></i>
                    </div>`,
                    html: `<div>
                    <p><b>Generando Credencial...</b></p>
                    </div>`,
					allowEscapeKey: false,
					allowOutsideClick: false
				})
				SweetAlert.showLoading()
				blockUI.noOpen = true;
                var doc = new PDFDocument({ compress: false, size: 'letter', margin: 3 }); //{compress: false},
                var stream = doc.pipe(blobStream());
                await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                    await convertUrlToBase64Image('assets/custom/serviciomed.png', async function (imagenMedicos) {
                        await convertUrlToBase64Image('assets/custom/checked.png', async function (checked) {
                            await convertUrlToBase64Image(ficha.paciente.persona.imagen, function (paciente) {
                                //front
                                doc.rect(40, 31.65, 255.12, 170.08).fillAndStroke("#ffffff", "#428bca")
                                doc.rect(140, 31.65, 155.12, 40).fillAndStroke("#428bca", "#428bca")
                                if(imagenEmpresa != "error") doc.image(imagenEmpresa, 55, 34.65, { fit: [70, 50] }); 
                                if(paciente != "error" ) {
                                    doc.image(paciente, 45, 96.65, { fit: [95, 95] })
                                }
                                 else{
                                    doc.rect(45, 96.65, 95, 95).stroke();
                                }
                                
                                doc.font('Helvetica-Bold', 10)
                                doc.fillColor('#fff').text("CREDENCIAL DE SALUD", 140, 41.65, {width:165.12, align: 'center'});
                                doc.fillColor('#fff').text(ficha.paciente ? 'N° '+ficha.paciente.codigo : '', 140, 56.65, {width:165.12, align: 'center'});

                                doc.font('Helvetica', 10)
                                doc.fillColor('#428bca').text(ficha.paciente.persona ? ficha.paciente.persona.nombre_completo.toUpperCase():'', 145, 101.65, {width:140, align: 'center'});
                                doc.font('Helvetica', 8)
                                doc.fillColor('#428bca').text("--------------------------------------", 145, 118.65, {width:140, align: 'center'});
                                let cargos = ficha.cargos.split(', ');
                                doc.fillColor('#2E2D2D').text(cargos[0], 145, 125.65, {width:140, align: 'center'});
                                let grupoSanguineo
                                ficha.paciente.grupo_sanguineo ? grupoSanguineo = ficha.paciente.grupo_sanguineo.split(' ') : grupoSanguineo = [[''],['']];
                                doc.font('Helvetica', 9)
                                doc.fillColor('#428bca').text("GRUPO DE SANGRE", 145, 151.65, {width:140, align: 'center'});
                                doc.font('Helvetica-Bold', 9)
                                doc.fillColor('#ff0000').text('"'+grupoSanguineo[0]+'" '+grupoSanguineo[1], 145, 166.65, {width:140, align: 'center'});
                                
                                //back
                                doc.rect(300.12, 31.65, 255.12, 170.08).fillAndStroke("#ffffff", "#428bca")
                                if(imagenMedicos != "error") doc.image(imagenMedicos, 301, 32.65, { fit: [88.5, 25] }); 
                                doc.rect(388.66, 31.65, 166.58, 25).fillAndStroke("#428bca", "#428bca")
                                doc.font('Helvetica-Bold', 10)
                                doc.fillColor('#fff').text("CONTROL SANITARIO", 388.66, 41.65, {width:166.58, align: 'center'});

                                doc.fillColor('#428bca')
                                doc.lineWidth(0.3)
                                doc.rect(310.12, 61.65, 235.12, 36).stroke();

                                doc.rect(345.12, 61.65, 0, 36).stroke();
                                doc.rect(411.82, 61.65, 0, 36).stroke();
                                doc.rect(478.53, 61.65, 0, 36).stroke();
                                
                                doc.rect(310.12, 73.65, 235.12, 0).stroke();
                                doc.rect(310.12, 85.65, 235.12, 0).stroke();
                                doc.font('Helvetica', 6)
                                doc.text("FECHA", 310.12, 65.65, {width:35, align: 'center'});
                                doc.text("EXAMEN FÍSICO", 345.12, 65.65, {width:66.7, align: 'center'});
                                doc.text("LABORATORIO", 411.82, 65.65, {width:66.7, align: 'center'});
                                doc.text("FIRMA MÉDICO", 478.53, 65.65, {width:66.71, align: 'center'});
                                
                                doc.font('Helvetica-Bold', 6).text("ENFERMEDADES IMPORTANTES", 300.12, 104.65, {width:255, align: 'center'});
                                doc.font('Helvetica', 5).fillColor('#ff0000')
                                doc.text("SI", 387, 113.65);
                                doc.text("NO", 400, 113.65);
                                doc.text("SI", 497, 113.65);
                                doc.text("NO", 510, 113.65);

                                doc.font('Helvetica', 7).fillColor('#428bca')
                                doc.text("CARDÍACAS", 335, 120.65);
                                doc.text("DIABETES", 335, 130.65);
                                doc.text("ALERGIAS", 335, 140.65);
                                doc.text("CHAGAS", 335, 150.65);
                                doc.text("OTROS", 335, 160.65);
                                doc.rect(385, 120.65, 8, 8).stroke();
                                doc.rect(400, 120.65, 8, 8).stroke();
                                doc.rect(385, 130.65, 8, 8).stroke();
                                doc.rect(400, 130.65, 8, 8).stroke();
                                doc.rect(385, 140.65, 8, 8).stroke();
                                doc.rect(400, 140.65, 8, 8).stroke();
                                doc.rect(385, 150.65, 8, 8).stroke();
                                doc.rect(400, 150.65, 8, 8).stroke();
                                doc.rect(385, 159.65, 8, 8).stroke();
                                doc.rect(400, 159.65, 8, 8).stroke();
                                doc.text("HIPERTENSIÓN", 440, 120.65);
                                doc.text("EPILEPSIA", 440, 130.65);
                                doc.text("HEPATITIS", 440, 140.65);
                                doc.text("LUMBALGIAS", 440, 150.65);
                                doc.rect(495, 120.65, 8, 8).stroke();
                                doc.rect(510, 120.65, 8, 8).stroke();
                                doc.rect(495, 130.65, 8, 8).stroke();
                                doc.rect(510, 130.65, 8, 8).stroke();
                                doc.rect(495, 140.65, 8, 8).stroke();
                                doc.rect(510, 140.65, 8, 8).stroke();
                                doc.rect(495, 150.65, 8, 8).stroke();
                                doc.rect(510, 150.65, 8, 8).stroke();
                                if(checked != "error"){
                                    if(ficha.enfermedad_cardilogia) doc.image(checked, 386, 120.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_cardilogia) doc.image(checked, 401, 120.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_diabetes) doc.image(checked, 386, 130.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_diabetes) doc.image(checked, 401, 130.65, { fit: [6, 6] });
                                    var alergias
                                    if ($scope.ficha.alergia_otros || $scope.ficha.alergia_conservas || $scope.ficha.alergia_alimentos || $scope.ficha.alergia_humo_cigarrillo || $scope.ficha.alergia_polvo || $scope.ficha.alergia_quimico || $scope.ficha.alergia_algun_material || $scope.ficha.alergia_medicamento || $scope.ficha.alergia_plantas) {
                                        alergias = true
                                    } else {
                                        alergias = false
                                    }
                                    if(alergias) doc.image(checked, 386, 140.65, { fit: [6, 6] });
                                    if(!alergias) doc.image(checked, 401, 140.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_chagas) doc.image(checked, 386, 150.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_chagas) doc.image(checked, 401, 150.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_otros) doc.image(checked, 386, 160.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_otros) doc.image(checked, 401, 160.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_hipertension) doc.image(checked, 496, 120.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_hipertension) doc.image(checked, 511, 120.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_epilepsia) doc.image(checked, 496, 130.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_epilepsia) doc.image(checked, 511, 130.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_hepatitis) doc.image(checked, 496, 140.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_hepatitis) doc.image(checked, 511, 140.65, { fit: [6, 6] });
                                    if(ficha.enfermedad_lumbalgia) doc.image(checked, 496, 150.65, { fit: [6, 6] });
                                    if(!ficha.enfermedad_lumbalgia) doc.image(checked, 511, 150.65, { fit: [6, 6] });
                                }
                                doc.font('Helvetica', 6).fillColor('#428bca')
                                doc.text("----------------------------------------", 300.12, 186.65, {width:255.12, align: 'center'});
                                doc.text("Gerente de salud", 300.12, 191.65, {width:255.12, align: 'center'});
                                doc.end();
                                stream.on('finish', function () {
                                    SweetAlert.swal({
                                        title: 'Finalizado!',
                                        icon: 'success',
                                        timer: 2000,
                                        showConfirmButton: false
                                    })
                                    var fileURL = stream.toBlobURL('application/pdf');
                                    window.open(fileURL, '_blank', 'location=no');
                                });
                            }); 
                        });
                    });
                });
            }

            function saveAsImage(uri, filename) {
                var link = document.createElement('a');
                if (typeof link.download === 'string') {
                  link.href = uri;
                  link.download = filename;
                  //Firefox requires the link to be in the body
                  document.body.appendChild(link);
                  //simulate click
                  link.click();
                  //remove the link when done
                  document.body.removeChild(link);
                } else {
                  window.open(uri);
                }
              }

            $scope.descargarCredencial = function () {
                html2canvas(document.getElementsByClassName('PrintCredencial'), {
                    onrendered: function (canvas) {
                        saveAsImage(canvas.toDataURL(), 'credencial.png');
                    }
                });
            }

            // ======== PARA GRAFICO ==========

            $scope.DatosSV = [
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Presión",
                    // markerType: "square",
                    color: "#F08080",
                    dataPoints: []
                },

                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Pulso",
                    // markerType: "square",
                    color: "#EC11B0",
                    dataPoints: []
                },
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Talla",
                    // markerType: "square",
                    color: "#11EC2B",
                    dataPoints: []
                },
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Temperatura",
                    // markerType: "square",
                    color: "#48B5DF",
                    dataPoints: []
                },
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Frecuencia Respiratoria",
                    // markerType: "square",
                    color: "#DF488A",
                    dataPoints: []
                },
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Frecuencia cardiaca",
                    // markerType: "square",
                    color: "#CCDF48",
                    dataPoints: []
                },
                {
                    type: "line",
                    showInLegend: true,
                    lineThickness: 2,
                    name: "Indice de masa corporal",
                    // markerType: "square",
                    color: "#48DFD3",
                    dataPoints: []
                }
            ];

            // $scope.fechasLabel = ["3/1/2010", "5/1/2010", "7/1/2010", "9/1/2010", "11/1/2010", "13/1/2010", "15/1/2010", "17/1/2010", "19/1/2010", "20/1/2010"]

            $scope.selection = [];
            $scope.chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "GRAFICA - SIGNOS VITALES",
                    fontSize: 22,

                },
                legend: {
                    horizontalAlign: "right", // left, center ,right 
                    verticalAlign: "center",  // top, center, bottom
                    fontSize: 14,
                },
                animationEnabled: true,
                exportEnabled: true,
                width: 1100,

                axisX: {
                    gridColor: "Silver",
                    tickColor: "silver",
                    valueFormatString: "DD/MM/YY",
                    titleFontSize: 8,

                },
                theme: "theme1",
                axisY: {
                    gridColor: "Silver",
                    tickColor: "silver"
                },

                data: $scope.selection,

            });

            $scope.chart.render();

            // toggle selection for a given signo vital by name
            $scope.toggleSelection = function toggleSelection(signoVital) {
                var idx = $scope.selection.map(function (item) { return item.name; }).indexOf(signoVital.name);

                // is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                    $scope.chart.render();
                    $scope.chart.destroy();
                }

                // is newly selected
                else {
                    $scope.selection.push(signoVital);
                    $scope.chart.render();
                    $scope.chart.destroy();
                }

            };

            // === seleccionar todos ==
            $scope.checkAll = function ($event) {
                // == clear array ====
                $scope.selection.length = 0;
                // === uncheck and check all checkboxes === 
                angular.forEach($scope.DatosSV, function (sv) {
                    sv.selected = $event.target.checked;
                    if (sv.selected) {
                        $scope.selection.push(sv);
                        $scope.chart.render();
                        $scope.chart.destroy();
                    } else {
                        $scope.selection.splice(0, 1);
                        $scope.chart.render();
                        $scope.chart.destroy();
                    }

                });
            };

            // ======== PARA GRAFICO FIN ==========


            $scope.abrirIdModalDialogLaboratorioExamenesNuevoResultado = function (examen, vista) {
                $scope.examen = {}
                if (examen) {
                    $scope.examen = examen
                }
                if (vista) {
                    $scope.examen.soloVista = true
                } else {
                    $scope.examen.soloVista = false
                }
                $scope.abrirPopup($scope.IdModalDialogLaboratorioExamenesNuevoResultado);
                $scope.fechaResultado = $scope.fechaATexto(new Date())
            }
            $scope.abrirIdModalDialogLaboratorioExamenesHistoricoResultados = function () {
                filtro = { inicio: 0, fin: 0 }
                $scope.ObtenerHistorialLaboratorioExamenes(filtro)
                $scope.abrirPopup($scope.IdModalDialogLaboratorioExamenHistoricoResultado);
            }
            $scope.abrirIdModalDialogDiagnosticoExamenesHistoricoResultados = function () {
                filtro = { inicio: 0, fin: 0 }
                $scope.ObtenerHistorialDiagnosticoExamenes(filtro)
                $scope.abrirPopup($scope.IdModalDialogDiagnosticoExamenHistoricoResultado);
            }
            $scope.abrirIdModalDialogNuevoLaboratorio = function (laboratorio, vista) {
                $scope.laboratorio = {}
                if (laboratorio) {
                    $scope.laboratorio = laboratorio
                }
                if (vista) {
                    $scope.laboratorio.soloVista = true
                } else {
                    $scope.laboratorio.soloVista = false
                }

                $scope.abrirPopup($scope.IdModalDialogNuevoLaboratorio);
            }

            $scope.abrirIdModalDialogLaboratorioExamenesHistorico = function () {
                $scope.abrirPopup($scope.IdModalDialogLaboratorioExamenHistoricoPreview);
            }

            $scope.abrirIdModalDialogLaboratorioExamenes = function (laboratorio) {
                $scope.laboratorio = laboratorio;
                $scope.ObtenerMedicoLaboratorioExamenes(laboratorio)
                $scope.abrirPopup($scope.IdModalDialogLaboratorioExamenes);
            }

            $scope.abrirIdModalFichaTecnica = function (paciente) {
                $scope.paciente = paciente
                $scope.paciente.grupo_sanguineo = { id: paciente.id_grupo_sanguineo }
                if (!$scope.paciente.id_ficha_paciente && $scope.paciente.eliminado) {
                    $scope.mostrarMensaje("No tiene una ficha medica guardada");
                } else if ($scope.paciente.id_ficha_paciente && $scope.paciente.eliminado) {
                    $scope.abrirDialogHistorialFicha();
                }
                else {
                    $scope.buscarfichaPaciente(paciente);
                }
            }
            $scope.buscarfichaPaciente = function (paciente) {
                blockUI.start();
                var promesa = BuscarFichaPaciente(paciente.id)
                promesa.then(function (datos) {
                    blockUI.stop();
                    if (datos.hasErr) {
                        return $scope.mostrarMensaje(datos.mensaje)
                    }
                    if (datos.ficha) {
                        $scope.ficha = datos.ficha
                        $scope.ficha.paciente.persona.telefono
                        $scope.ficha.paciente.persona.telefono_movil
                        $scope.paciente.id_ficha_paciente = datos.ficha ? datos.ficha.id : null
                        $scope.ficha.cargos = $scope.ficha.paciente.empleadosFichas[0].cargos.map(cargo => cargo.cargo.nombre).join(', ');
                        $scope.ficha.cargos_ids = $scope.ficha.paciente.empleadosFichas[0].cargos.map(cargo => cargo.cargo.id).join(',');
                        var fechaActual = new Date();
                        var fecha = new Date(datos.ficha.fecha)
                        $scope.ficha.fecha_elaboracion = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
                        $scope.ficha.paciente.grupo_sanguineo = $scope.grupos_sanguineos.find(grupo => grupo.id === $scope.ficha.paciente.id_grupo_sanguineo)
                        $scope.ficha.edad = $scope.obtenerEdad($scope.ficha.paciente.persona.fecha_nacimiento);
                        const cargo_empleado = $scope.ficha.paciente.empleadosFichas[0].cargos[0] && $scope.ficha.paciente.empleadosFichas[0].cargos[0] && $scope.ficha.paciente.empleadosFichas[0].cargos[0].cargo
                        if (cargo_empleado) {
                            // const riesgos = $scope.obtenerRiesgosCargo(cargo_empleado, true)
                            $scope.obtenerRiesgosCargo($scope.ficha.cargos_ids, true)
                            // $scope.ficha.riesgo = cargo_empleado.riesgos.map(riesgo => riesgo.nombre_riesgo).join(',')
                            $scope.ficha.riesgo = $scope.obtenerRiesgosEmpleado($scope.ficha.paciente.empleadosFichas[0].cargos);
                        } else {
                            $scope.ficha.riesgo = 'Error'
                        }
                        $scope.mostarGuardarFicha = true
                    } else {
                        $scope.mostarGuardarFicha = false;
                        $scope.ficha = { paciente: datos.paciente, pacienteReferencia: {}, fecha_elaboracion: $scope.fechaATexto(new Date()) }
                        $scope.fichasRRHHEmpleadoCargos = $scope.ficha.paciente.empleadosFichas.length > 0 ? $scope.ficha.paciente.empleadosFichas[0].cargos : [];
                        $scope.ficha.cargos = $scope.fichasRRHHEmpleadoCargos.map(cargo => cargo.cargo.nombre).join(', ');
                        $scope.ficha.cargos_ids = $scope.fichasRRHHEmpleadoCargos.map(cargo => cargo.cargo.id).join(',');
                        const cargo_empleado = $scope.fichasRRHHEmpleadoCargos[0] && $scope.fichasRRHHEmpleadoCargos[0] && $scope.fichasRRHHEmpleadoCargos[0].cargo
                        if (cargo_empleado) {
                            $scope.obtenerRiesgosCargo($scope.ficha.cargos_ids, true)
                            // $scope.ficha.riesgo = cargo_empleado.riesgos.map(riesgo => riesgo.nombre_riesgo).join(',')
                            $scope.ficha.riesgo = $scope.obtenerRiesgosEmpleado($scope.fichasRRHHEmpleadoCargos);
                        } else {
                            $scope.ficha.riesgo = 'Error'
                        }
                        // $scope.paciente.grupo_sanguineo = {id: paciente.id_grupo_sanguineo}
                        var fechaActual = new Date();
                        $scope.ficha.edad =$scope.obtenerEdad($scope.ficha.paciente.persona.fecha_nacimiento);
                    }
                    $scope.abrirPopup($scope.idModalFichaTecnica);
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })

            }
            $scope.obtenerRiesgosEmpleado = function (cargos) {
                var riegosText = "";
                for (let index = 0; index < cargos.length; index++) {
                    const element = cargos[index];
                    const noEliminados = element.cargo.riesgos.filter(function (riesgo) {
                        return riesgo.eliminado == false
                    })
                    if (riegosText) {
                        riegosText = riegosText + "," + noEliminados.map(riesgo => riesgo.nombre_riesgo).join(',')
                    } else {
                        riegosText = noEliminados.map(riesgo => riesgo.nombre_riesgo).join(',')
                    }
                }
                return riegosText;
            }

            $scope.obtenerTipoControl = function (filtro) {
                blockUI.start();
                var promesa = ListaDatosTiposControl($scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.tiposControl = entidad;
                    blockUI.stop();
                });
            }

            $scope.obtenerDatosPrerequisito = function (paciente, filtro) {
                blockUI.start();
                if(!filtro) filtro = {}
                if (filtro.inicio != undefined) {
                    if (filtro.inicio != 0 && filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                    } else {
                        $scope.filtro.inicio = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                }
                if (filtro.fin != undefined) {
                    if (filtro.fin != 0 && filtro.fin != "") {
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.fin = 0
                }
                var promesa = ListaPrerequisitosPaciente(paciente.id, $scope.filtro);
                promesa.then(function (preRequisitos) {
                    $scope.prerequisitosPaciente = preRequisitos.Prerequisitos;
                    $scope.prerequisitosPaciente.forEach(function (requisito) {
                        if (requisito.fecha_entrega != null) {
                            requisito.entregado = true
                        }
                    })

                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                    blockUI.stop();
                }, function (error) {
                    $scope.mostrarMensaje('Se produjo un error al obtener datos de prerequisitos')
                    blockUI.stop();
                });
            }
            $scope.abrirDialogVerResultadosLab = function (laboratorio) {
                $scope.Hostorialexamenes = laboratorio.laboratorioResultados
                $scope.abrirPopup($scope.idModalDialogVerResultadosHistorialLab);
            }
            $scope.cerrarDialogVerResultadosLab = function (laboratorio) {
                $scope.cerrarPopup($scope.idModalDialogVerResultadosHistorialLab);
            }
            $scope.showPopover = false;

            $scope.popover = {
                title: 'Title',
                message: 'Message'
            };
            
            
            $scope.abrirDialogHistorico = function (vacuna) {
                $scope.abrirPopup($scope.idModalDialogHistorico);
            }
            $scope.abriridModalDialogFechaEntrega = function () {
                $scope.abrirPopup($scope.idModalDialogFechaEntrega);
            }

            $scope.abrirIdModalGraficoSV = function (paciente) {
                $scope.DatosSV.forEach(function (DatosSV) {
                    DatosSV.dataPoints = []
                })

                $scope.fechasLabel = []
                var filtro = { inicio: 0, fin: 0 }
                $scope.paciente = paciente
                var yy = 0;
                var promesa = ListaConsultasMedicoPaciente($scope.paciente.id, filtro)
                promesa.then(function (dato) {
                    for (var i = 0; i < dato.consultas.length; i++) {
                        var consulta = dato.consultas[i];
                        var fecha = new Date(consulta.fecha)
                        var str = consulta.presion
                        var res = str.split("/");
                        var fechaTabla = fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear()
                        $scope.fechasLabel.push(fechaTabla)
                        var datoPrecion = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(res[0]) };
                        var datoPulso = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.pulso) };
                        var datoTalla = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.talla) };
                        var datoPeso = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.peso) };
                        var datoTemperatura = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.temperatura) };
                        var datoFrecuenciaC = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.frecuencia_cardiaca) };
                        var datoFrecuenciaR = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.frecuencia_respiratoria) };
                        var datoIndiceMasaCorporal = { x: new Date(fecha.getFullYear(), (fecha.getMonth()), fecha.getDate()), y: parseInt(consulta.indice_masa_corporal) };
                        $scope.DatosSV.forEach(function (DatosSV) {
                            if (DatosSV.name == "Presión") DatosSV.dataPoints.push(datoPrecion)
                            if (DatosSV.name == "Talla") DatosSV.dataPoints.push(datoTalla)
                            if (DatosSV.name == "Pulso") DatosSV.dataPoints.push(datoPulso)
                            if (DatosSV.name == "Peso") DatosSV.dataPoints.push(datoPeso)
                            if (DatosSV.name == "Temperatura") DatosSV.dataPoints.push(datoTemperatura)
                            if (DatosSV.name == "Frecuencia Respiratoria") DatosSV.dataPoints.push(datoFrecuenciaR)
                            if (DatosSV.name == "Frecuencia cardiaca") DatosSV.dataPoints.push(datoFrecuenciaC)
                            if (DatosSV.name == "Indice de masa corporal") DatosSV.dataPoints.push(datoIndiceMasaCorporal)
                        }, this);
                        yy = yy + 20;
                    }
                })
                $scope.abrirPopup($scope.IdModalDialogGraficoSV);
            }

            $scope.cerrarIdModalGraficoSV = function () {
                $scope.cerrarPopup($scope.IdModalDialogGraficoSV);
            }

            $scope.abrirDialogNuevoExamen = function () {
                $scope.abrirPopup($scope.IdModalDialogLaboratorioExamen);
            }

            $scope.abrirIdModalDialogLaboratorio = function (paciente) {
                $scope.paciente = paciente
                $scope.ObtenerMedicoLaboratorios(paciente)
                $scope.abrirPopup($scope.IdModalDialogLaboratorio);
            }

            $scope.abrirModalCrearEditarVacuna = async function (vacuna, ver) {
                $scope.ver = ver;
                $scope.listarProductosVacuna()
                if(vacuna && vacuna.id) {
                    $scope.vacuna = vacuna
                    $scope.vacuna.unico = vacuna.unico ? true: false;
                    $scope.edicion = false
                    $scope.dosis = {}
                    let data = await  GetVacunaDosis(vacuna.id)
                    $scope.vacunaDosis = data ? data.dosis : []
                    let res = await GetVacunaProductos(vacuna.id)
                    $scope.vacunaProductos = res ? res.productos : [];
                }else{
                    $scope.vacunaProductos = []
                    $scope.vacuna = {}
                    $scope.edicion = false
                    $scope.dosis = { es_dosis:true }
                }
                $scope.abrirPopup($scope.idModalDialogVacunaEdicion);
            }

            $scope.abrirDialogVacunasConfig = function (config, id) {
                $scope.obtenerVacunasPaciente(config, id)
                $scope.abrirPopup($scope.idModalDialogVacunasConfig);
            }

            $scope.abrirDialogVacunasPaciente = function (paciente) {
                $scope.paciente = paciente;
                $scope.obtenerHistorialProyecciones(paciente.id, true);
                //$scope.obtenerVacunasPaciente(false, paciente.id)
                $scope.abrirPopup($scope.idModalDialogVacunasPaciente);
            }
            
            
            

            $scope.cerrarConfirmacionEntragaAdelantadaPrerequisito = function () {
                $scope.cerrarPopup($scope.idModalDialogConfirmacionEntregaAdelantado);
            }

            

           

            $scope.abrirDialogPacienteNuevo = function () {
                $scope.paciente = new Paciente({ persona: { imagen: "img/icon-user-default.png" }, id_empresa: $scope.usuario.id_empresa });
                $scope.abrirPopup($scope.idModalDialogPacienteNuevo);
            }

            $scope.cerrarPopupPacienteNuevo = function () {
                // $scope.obtenerCargos()
                $scope.cerrarPopup($scope.idModalDialogPacienteNuevo);
            }

            $scope.editarResultadoLaboratorio = (resultado) => {
                for (let index = 0; index < $scope.listaLaboratorioExamenes.length; index++) {
                    for (let jindex = 0; jindex < resultado.length; jindex++) {
                        if ($scope.listaLaboratorioExamenes[index].id === resultado[jindex].id_laboratorio_examen) {
                            $scope.listaLaboratorioExamenes[index].resultado = resultado[jindex].resultado;
                            $scope.listaLaboratorioExamenes[index].id_laboratorio_examen = resultado[jindex].id_laboratorio_examen
                            $scope.listaLaboratorioExamenes[index].id_resultado = resultado[jindex].id
                        }
                    }
                }
                $scope.cerrarIdModalDialogLaboratorioExamenesHistoricoResultados()
            }
            $scope.eliminarResultadoLaboratorio = (resultado, historico) => {
                // let eli
                if (resultado) {
                    for (let index = 0; index < $scope.listaLaboratorioExamenes.length; index++) {
                        for (let jindex = 0; jindex < resultado.length; jindex++) {
                            if ($scope.listaLaboratorioExamenes[index].id === resultado[jindex].id_laboratorio_examen) {
                                $scope.listaLaboratorioExamenes[index].id_resultado = resultado[jindex].id
                                $scope.listaLaboratorioExamenes[index].eliminado = true
                            }
                        }
                    }
                }
                var datos = { examenes: $scope.listaLaboratorioExamenes, historico: historico }
                promesa = CrearLaboratorioExamenResultado($scope.laboratorio.id, $scope.paciente.id, datos)
                promesa.then(function (datos) {
                    $scope.cerrarIdModalDialogLaboratorioExamenes()
                    $scope.ObtenerMedicoLaboratorioExamenes($scope.laboratorio)
                    $scope.mostrarMensaje(datos.message)
                })
                $scope.cerrarIdModalDialogLaboratorioExamenesHistoricoResultados()
            }

            
            $scope.abrirDialogPrerequisitoEditar = function (prerequisito) {
                $scope.seleccionarCargosPrerequisito(prerequisito.prerequisitoCargos)
                $scope.NuevoP = new Prerequisito({ id: prerequisito.id, nombre: prerequisito.nombre, observacion: prerequisito.observacion, vencimiento_mes: prerequisito.vencimiento_mes, dias_activacion: prerequisito.dias_activacion, puede_modificar_rrhh: prerequisito.puede_modificar_rrhh, cargos: [] })
                $scope.abrirPopup($scope.idModalDialogPrerequisitoNuevo);
            }

            
            $scope.validarCodigoCuentaEmpleado = function (CodigoCuenta) {
                var codigo = CodigoCuenta;
                if (codigo != '') {
                    $timeout(function () {
                        $scope.validar = new ValidarCodigoCuentaEmpleado();

                        $scope.validar.codigo = CodigoCuenta;

                        $scope.validar.$save(function (data) {
                            $scope.data = data;
                        })
                    }, 1500);
                }
            };
            

            

            

            $scope.actualizarPrerequisito = function (prerequisito) {
                blockUI.start();
                var promesa = ActualizarPrerequisito(prerequisito)
                promesa.then(function (dato) {
                    if (prerequisito instanceof Array) {
                        $scope.cerrarPopUpPreRequisitos()
                    }
                    blockUI.stop();
                    $scope.mostrarMensaje(dato.message)
                })
            }

            
            
            $scope.diasVencidos = function (fechaVencimiento) {
                var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
                var hoy = new Date().getTime()
                var vencimiento = fechaVencimiento.getTime()
                var calculo = hoy - vencimiento
                var dias = Math.floor(calculo / MILISENGUNDOS_POR_DIA)
                return dias
            }
            $scope.calcularFechaVencimientoRequisito = function (requisito) {
                var meses = (requisito.vencimiento_mes === undefined) ? requisito.preRequisito.vencimiento_mes : requisito.vencimiento_mes
                var fechaControl = new Date()
                var fecha_inicio = new Date($scope.convertirFecha(requisito.fecha_entrega_texto))
                /* if (requisito.fecha_inicio_texto === undefined) {
                    var otra_fecha = $scope.fechaATexto(requisito.fecha_inicio)
                } */
                /*                 var fecha_cortada = (requisito.fecha_inicio_texto === undefined) ? otra_fecha.split('/') : requisito.fecha_inicio_texto.split('/')
                                var dia = parseInt(fecha_cortada[0])
                                var mes = parseInt(fecha_cortada[1])
                                var anio = parseInt(fecha_cortada[2])
                                fecha_inicio.setFullYear(anio, mes - 1, dia) */
                // if($scope.fechaATexto(requisito.fecha_inicio) == requisito.fecha_inicio_texto){
                //     console.log('son iguales')
                // }else{
                //     console.log('no son iguales')
                // }
                var fecha_vencimiento = new Date(fecha_inicio.setTime(fecha_inicio.getTime() + (meses * 30) * 86400000))
                return fecha_vencimiento
                // requisito.fechav_texto = $scope.fechaATexto(requisito.fechav)
            }

            $scope.actualizarPreRequisitoPaciente = function (prerequisito) {
                blockUI.start()
                var prerequisito_ = prerequisito
                prerequisito_.fecha_vencimiento = new Date($scope.convertirFecha(prerequisito.fecha_vencimiento_texto))
                var promesa = GuardarPrerequisitoPaciente(prerequisito_)
                promesa.then(function (res) {
                    SweetAlert.swal("", res.message, 'warning')
                    $scope.cerrarDialogEditarPreRequisito()
                    $scope.verificarAsignacionPrerequisitos($scope.paciente)
                    blockUI.stop()
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al asignar el prerequisito')
                    $scope.cerrarDialogEditarPreRequisito()
                    blockUI.stop()
                })
            }
            
            

            $scope.finVerPaciente = function () {
                var button = $('#siguiente-v').text().trim()
                if (button != "Siguiente") {
                    $scope.cerrarPopPupVista()
                }
            }

            $scope.sinFuncionalidad = function (mensaje) {
                $scope.mostrarMensaje('Sin funcionalidad')

            }

            

            

            $scope.verPaciente = function (elpaciente) {
                promesaPaciente = obtenerPaciente(elpaciente.id)
                promesaPaciente.then(function (paciente) {
                    $scope.paciente = paciente
                    $scope.paciente.fecha_nacimiento_texto = $scope.fechaATexto($scope.paciente.persona.fecha_nacimiento)
                })
                $scope.abrirPopup($scope.idModalWizardPacienteVista);
            }

            $scope.cerrarPopPupVista = function () {
                $scope.cerrarPopup($scope.idModalWizardPacienteVista);
            }

            $scope.modificarPaciente = function (elpaciente) {
                promesaPaciente = obtenerPaciente(elpaciente.id)
                promesaPaciente.then(function (paciente) {
                    $scope.paciente = paciente
                    // $scope.ficha.empleado.cargo = []
                    /* $scope.seleccionarCargos($scope.paciente.cargos) */
                    $scope.paciente.fecha_nacimiento_texto = $scope.fechaATexto($scope.paciente.persona.fecha_nacimiento)
                    $scope.paciente.persona.imagen = (paciente.persona.imagen == null) ? "img/icon-user-default.png" : paciente.persona.imagen
                })
                $scope.abrirPopup($scope.idModalDialogPacienteNuevo);
            }

            $scope.mostrarConfirmacionEliminacion = function (paciente) {
                paciente.persona = (paciente.persona == undefined) ? { imagen: (paciente.imagen == null) ? "img/icon-user-default.png" : paciente.imagen } : paciente.persona.imagen
                paciente.eliminar = true
                $scope.paciente = paciente
                $scope.abrirPopup($scope.idModalEliminarPaciente);
            }

            $scope.cerrarConfirmacionEliminacion = function () {
                $scope.cerrarPopup($scope.idModalEliminarPaciente);
            };

            $scope.eliminarPaciente = function (paciente) {
                blockUI.start();
                $scope.paciente.eliminado = (paciente.eliminado == false) ? true : false;
                Paciente.update({ id_paciente: $scope.paciente.id }, $scope.paciente, function (res) {
                    blockUI.stop();
                    $scope.cerrarConfirmacionEliminacion();
                    $scope.obtenerPacientes();
                    $scope.mostrarMensaje('Eliminado Exitosamente!');
                }, function (error) {
                    blockUI.stop();
                    $scope.cerrarConfirmacionEliminacion();
                    $scope.obtenerPacientes();
                    $scope.mostrarMensaje('Ocurrio un problema al eliminar el paciente!');
                    $scope.recargarItemsTabla()
                })

            }

            $scope.cortarFecha = function (fechaTexto) {
                var fechaArray = fechaTexto.split(' ')
                var horaArray = fechaArray[1].split(':')
                var lafecha = fechaArray[0].split('/')
                var dia = parseInt(lafecha[0])
                var mes = parseInt(lafecha[1])
                var anio = parseInt(lafecha[2])
                var fecha = new Date()
                var laHora = (fechaArray[2] == "AM") ? parseInt(horaArray[0]) : (parseInt(horaArray[0]) < 12) ? parseInt(horaArray[0]) + 12 : parseInt(horaArray[0])
                fecha.setFullYear(anio, mes - 1, dia)
                fecha.setHours(laHora, horaArray[1])
                return fecha
            }

            $scope.guardarConsulta = function (form, consulta) {
                var button = $('#siguiente-c').text().trim();
                if (button != "Siguiente") {
                    if (form.$valid) {
                        var cortarFecha = consulta.fecha.split(' ')
                        consulta.fecha = (consulta.fecha instanceof Date) ? $scope.cortarFecha(consulta.fecha) : $scope.cortarFecha(consulta.fecha)
                        consulta.presion = consulta.presionAlta + "/" + consulta.presionBaja
                        var promesa = CrearMedicoPacienteConsulta(consulta)
                        promesa.then(function (params) {
                            $scope.cerrarPopUpConsulta()
                            $scope.recargarItemsTabla()
                            $scope.mostrarMensaje(params.message)
                        })
                    }
                }
            }

            $scope.guardarDatosConsulta = function (form, consulta) {
                if (form.$valid) {
                    if (consulta.id) {
                        SweetAlert.swal({
                            title: "¿Que desea realizar con la Consulta?",
                            text: "",
                            icon: 'warning',
                            showCloseButton: true,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#69AA46',
                            confirmButtonText: 'Actualizar',
                            cancelButtonText: "Nuevo",
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                consulta.fecha = (consulta.fecha instanceof Date) ? $scope.cortarFecha(consulta.fecha) : $scope.cortarFecha(consulta.fecha)
                                consulta.presion = consulta.presionAlta + "/" + consulta.presionBaja
                                var prom = ActualizarConsultaMedicaPaciente($scope.paciente.id_ficha_paciente, consulta)
                                prom.then((consultaMedica) => {
                                    if (consultaMedica.hasErr) {
                                        alert(consultaMedica.mensaje)
                                    } else {
                                        SweetAlert.swal("Guardado!", consultaMedica.message, "success");
                                        $scope.cerrarPopUpConsulta()
                                        $scope.crearNuevaConsulta($scope.paciente);
                                    }
                                }).catch((err) => {
                                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                    $scope.mostrarMensaje(msg)
                                })
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                var cortarFecha = consulta.fecha.split(' ')
                                consulta.fecha = (consulta.fecha instanceof Date) ? $scope.cortarFecha(consulta.fecha) : $scope.cortarFecha(consulta.fecha)
                                consulta.presion = consulta.presionAlta + "/" + consulta.presionBaja
                                var promesa = CrearMedicoPacienteConsulta(consulta)
                                promesa.then(function (params) {
                                    $scope.cerrarPopUpConsulta()
                                    // $scope.recargarItemsTabla()
                                    $scope.crearNuevaConsulta($scope.paciente);
                                    SweetAlert.swal("Guardado!", params.message, "success");
                                })
                            }
                        });
                    } else {
                        var cortarFecha = consulta.fecha.split(' ')
                        consulta.fecha = (consulta.fecha instanceof Date) ? $scope.cortarFecha(consulta.fecha) : $scope.cortarFecha(consulta.fecha)
                        consulta.presion = consulta.presionAlta + "/" + consulta.presionBaja
                        var promesa = CrearMedicoPacienteConsulta(consulta)
                        promesa.then(function (params) {
                            $scope.cerrarPopUpConsulta()
                            $scope.recargarItemsTabla()
                            SweetAlert.swal("Guardado!", params.message, "success");
                        })
                    }
                }
            }
            $scope.listarConsultasPaciente = function (filtro) {
                if (filtro.inicio != undefined) {
                    if (filtro.inicio != 0 || filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                    } else {
                        $scope.filtro.inicio = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                }
                if (filtro.fin != undefined) {
                    if (filtro.fin != 0 || filtro.fin != "") {
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.fin = 0
                }
                var promesa = ListaConsultasMedicoPaciente($scope.paciente.id, $scope.filtro)
                promesa.then(function (dato) {
                    $scope.consultas = dato.consultas
                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                })
            }
            $scope.changeActivo = function (paciente) {
                PacienteActivo.update({ id_paciente: paciente.id }, paciente, function (res) {
                    $scope.mostrarMensaje(res.mensaje)
                });
            }
            $scope.saveForm = function (paciente) {
                $scope.paciente = paciente;
                var imagenPaciente = paciente.imagen;
                var button = $('#siguiente').text().trim()
                if (button != "Siguiente") {
                    blockUI.start();
                    if (paciente.id) {
                        paciente.persona.fecha_nacimiento = new Date($scope.convertirFecha(paciente.fecha_nacimiento_texto));
                        Paciente.update({ id_paciente: paciente.id }, paciente, function (res) {
                            blockUI.stop();
                            $scope.cerrarPopupPacienteNuevo();
                            $scope.obtenerPacientes();
                            SweetAlert.swal("Guardado!", 'Actualizado Exitosamente!', "success");
                            $scope.recargarItemsTabla()
                        });
                    } else {
                        paciente.persona.fecha_nacimiento = new Date($scope.convertirFecha(paciente.fecha_nacimiento_texto));
                        paciente.$save({ id_paciente: 0 }, function (res) {
                            blockUI.stop();
                            $scope.cerrarPopupPacienteNuevo();
                            $scope.obtenerPacientes();
                            SweetAlert.swal("Guardado!", res.message, "success");
                            $scope.recargarItemsTabla()
                        }, function (error) {
                            blockUI.stop();
                            $scope.cerrarPopupPacienteNuevo();
                            $scope.obtenerPacientes();
                            SweetAlert.swal("", 'Ocurrio un problema al momento de guardar!', "error");
                            $scope.recargarItemsTabla()
                        });
                    }
                }
            }

            $scope.saveComment = function (paciente) {
                Comentario.update({ id_paciente: paciente.id }, paciente, function (res) {
                    $scope.mostrarMensaje('Comentario actualizado Exitosamente!');
                }, function (error) {
                    $scope.mostrarMensaje('Hubo un problema al guardar su comentario.');
                });
                blockUI.stop();
                $scope.cerrarDialogDialogComentario();
            }

            $scope.filtrarHistorialVacunas = function (filtroVacunas) {
                var fecha_inicio = (filtroVacunas.inicio === "" || filtroVacunas.inicio === undefined) ? 0 : new Date(filtroVacunas.inicio)
                var fecha_fin = (filtroVacunas.fin === "" || filtroVacunas.fin === undefined) ? 0 : new Date(filtroVacunas.fin)
                var tipo_opcion = (filtroVacunas.opcion === "" || filtroVacunas.opcion === undefined) ? 0 : filtroVacunas.opcion
                if (fecha_inicio != 0 && fecha_fin != 0) {
                    $scope.filtroHistorialVacunas.forEach(function (vacuna) {
                        vacuna.pacienteVacunaDosis.forEach(function (dosis) {
                            var myDate = new Date(dosis.fecha_aplicacion)
                            if (fecha_inicio <= myDate && fecha_fin >= myDate) {
                                dosis.visible = true
                                if (tipo_opcion != 0) {
                                    if (tipo_opcion == 'enfec') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? false : true
                                    }
                                    if (tipo_opcion == 'proye') {
                                        dosis.visible = (dosis.proyectada == undefined || dosis.proyectada == null) ? false : (dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == 'retra') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == '0') {
                                        dosis.visible = true
                                    }
                                }
                            } else {
                                dosis.visible = false
                            }
                        })
                    })
                } else {
                    $scope.filtroHistorialVacunas.forEach(function (vacuna) {
                        vacuna.pacienteVacunaDosis.forEach(function (dosis) {
                            if (tipo_opcion != 0) {
                                $scope.filtroHistorialVacunas.forEach(function (vacuna) {
                                    vacuna.pacienteVacunaDosis.forEach(function (dosis) {
                                        if (tipo_opcion == 'enfec') {
                                            dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? false : true
                                        }
                                        if (tipo_opcion == 'proye') {
                                            dosis.visible = (dosis.proyectada == undefined || dosis.proyectada == null) ? false : (dosis.proyectada) ? true : false
                                        }
                                        if (tipo_opcion == 'retra') {
                                            dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? true : false
                                        }
                                        if (tipo_opcion == '0') {
                                            dosis.visible = true
                                        }
                                    });
                                })
                            } else {
                                dosis.visible = true
                            }
                        })
                    })
                }
                if (fecha_inicio != 0 && fecha_fin == 0) {
                    $scope.filtroHistorialVacunas.forEach(function (vacuna) {
                        vacuna.pacienteVacunaDosis.forEach(function (dosis) {
                            var myDate = new Date(dosis.fecha_aplicacion)
                            if (fecha_inicio <= myDate) {
                                dosis.visible = true
                                if (tipo_opcion != 0) {
                                    if (tipo_opcion == 'enfec') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? false : true
                                    }
                                    if (tipo_opcion == 'proye') {
                                        dosis.visible = (dosis.proyectada == undefined || dosis.proyectada == null) ? false : (dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == 'retra') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == '0') {
                                        dosis.visible = true
                                    }
                                }
                            } else {
                                dosis.visible = false
                            }
                        })
                    })
                } else if (fecha_inicio == 0 && fecha_fin != 0) {
                    $scope.filtroHistorialVacunas.forEach(function (vacuna) {
                        vacuna.pacienteVacunaDosis.forEach(function (dosis) {
                            var myDate = new Date(dosis.fecha_aplicacion)
                            if (fecha_fin >= myDate) {
                                dosis.visible = true
                                if (tipo_opcion != 0) {
                                    if (tipo_opcion == 'enfec') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? false : true
                                    }
                                    if (tipo_opcion == 'proye') {
                                        dosis.visible = (dosis.proyectada == undefined || dosis.proyectada == null) ? false : (dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == 'retra') {
                                        dosis.visible = (dosis.retrasada == undefined) ? false : (dosis.retrasada && !dosis.proyectada) ? true : false
                                    }
                                    if (tipo_opcion == '0') {
                                        dosis.visible = true
                                    }
                                }
                            } else {
                                dosis.visible = false
                            }
                        })
                    })
                }
            }

            $scope.abrirDialogHistorialVacuna = function (id) {
                $scope.obtenerHistorialProyecciones(id, false);
                $scope.abrirPopup($scope.idModalDialogHistorialVacuna);

            }
            
            
            $scope.cerrarDialogHistorialVacuna = function () {
                $scope.filtroVacunas = { inicio: "", fin: "", opcion: "0" }
                $scope.cerrarPopup($scope.idModalDialogHistorialVacuna);
            }

            $scope.abrirDialogHistorialConsulta = function () {
                $scope.listarConsultasPaciente({ inicio: 0, fin: 0 })
                $scope.dynamicPopoverCargos = {
                    templateUrl: 'consultaPopoverTemplate.html',
                };
                $scope.abrirPopup($scope.idModalHistorialConsulta);
            }

            $scope.cerrarDialogHistorialConsulta = function () {
                $scope.cerrarPopup($scope.idModalHistorialConsulta);
            }

            $scope.abrirDialogHistorialVacunaGeneral = function (id) {
                $scope.obtenerHistorialProyecciones(id, true);
                $scope.abrirPopup($scope.idModalDialogHistorialVacunaGeneral);
            }

            $scope.cerrarDialogHistorialVacunaGeneral = function () {
                $scope.filtroVacunas = { inicio: "", fin: "", opcion: "0" }
                $scope.filtroHistorialVacunas = []
                $scope.cerrarPopup($scope.idModalDialogHistorialVacunaGeneral);
            }

            $scope.abrirDialogDiagnosticos = function (paciente) {
                $scope.paciente = paciente
                $scope.ObtenerMedicoDiagnostico(paciente)
                $scope.abrirPopup($scope.idModalDialogDiagnosticos);
            }

            $scope.cerrarDialogDiagnosticos = function () {
                $scope.cerrarPopup($scope.idModalDialogDiagnosticos);
            }

            $scope.abrirDialogDiagnosticoNuevo = function (diagnosticco, vista) {
                $scope.diagnostico = {}
                if (diagnosticco) {
                    $scope.diagnostico = diagnosticco
                }
                if (vista) {
                    $scope.diagnostico.soloVista = true
                } else {
                    $scope.diagnostico.soloVista = false
                }
                $scope.abrirPopup($scope.idModalDialogDiagnosticoNuevo);
            }

            $scope.cerrarDialogDiagnosticoNuevo = function () {
                $scope.cerrarPopup($scope.idModalDialogDiagnosticoNuevo);
            }

            $scope.abrirDialogExamenesDiagnostico = function (diagnostico) {
                $scope.diagnostico = diagnostico
                $scope.ObtenerMedicoDiagnosticoExamenes(diagnostico)
                $scope.abrirPopup($scope.idModalDialogExamenesDiagnostico);
            }

            $scope.cerrarDialogExamenesDiagnostico = function () {
                $scope.cerrarPopup($scope.idModalDialogExamenesDiagnostico);
            }

            $scope.abrirDialogNuevoExamenDiagnostico = function (examen, vista) {
                $scope.examen = {}
                if (examen) {
                    $scope.examen = examen
                }
                if (vista) {
                    $scope.examen.soloVista = true
                } else {
                    $scope.examen.soloVista = false
                }
                $scope.abrirPopup($scope.idModalDialogNuevoExamenDiagnostico);
            }

            $scope.cerrarDialogNuevoExamenDiagnostico = function () {
                $scope.cerrarPopup($scope.idModalDialogNuevoExamenDiagnostico);
            }

            $scope.abrirDialogHistorialFicha = function (ficha) {
                var filtro = { inicio: 0, fin: 0, tipo_control: 0 }
                $scope.ObtenerHistorialFichaMedica(filtro)
                $scope.abrirPopup($scope.idModalDialogHistorialFicha);
            }

            $scope.cerrarDialogHistorialFicha = function () {
                $scope.cerrarPopup($scope.idModalDialogHistorialFicha);
            }

            $scope.abrirDialogDialogCredencial = function (paciente) {
                $scope.paciente = paciente
                $scope.paciente.grupo_sanguineo = $scope.grupos_sanguineos.find(grupo => grupo.id === $scope.paciente.id_grupo_sanguineo)
                if ($scope.paciente.cargos && $scope.paciente.cargos.length === 1) {
                    $scope.paciente.cargo = $scope.paciente.cargos[0]
                } else if ($scope.paciente.cargos.length > 1) {
                    $scope.paciente.cargo = $scope.paciente.cargos[0] + '/' + $scope.paciente.cargos[1]
                }
                const cargos = $scope.paciente.cargos
                var promesa = BuscarFichaPaciente(paciente.id)
                promesa.then(function (datos) {
                    if (datos.ficha) {
                        $scope.ficha = datos.ficha
                        if (!$scope.ficha.enfermedad_cardilogia) $scope.ficha.enfermedad_cardilogia2 = true
                        if (!$scope.ficha.enfermedad_hipertension) $scope.ficha.enfermedad_hipertension2 = true
                        if (!$scope.ficha.enfermedad_lumbalgia) $scope.ficha.enfermedad_lumbalgia2 = true
                        if (!$scope.ficha.enfermedad_diabetes) $scope.ficha.enfermedad_diabetes2 = true
                        if (!$scope.ficha.enfermedad_epilepsia) $scope.ficha.enfermedad_epilepsia2 = true
                        if (!$scope.ficha.enfermedad_chagas) $scope.ficha.enfermedad_chagas2 = true
                        if (!$scope.ficha.enfermedad_hepatitis) $scope.ficha.enfermedad_hepatitis2 = true
                        if (!$scope.ficha.enfermedad_otros) $scope.ficha.enfermedad_otros2 = true 
                        

                        if ($scope.ficha.alergia_otros || $scope.ficha.alergia_conservas || $scope.ficha.alergia_alimentos || $scope.ficha.alergia_humo_cigarrillo || $scope.ficha.alergia_polvo || $scope.ficha.alergia_quimico || $scope.ficha.alergia_algun_material || $scope.ficha.alergia_medicamento || $scope.ficha.alergia_plantas) {
                            $scope.ficha.alergia = true
                        } else {
                            $scope.ficha.alergia2 = true
                        }
                        $scope.abrirPopup($scope.idModalDialogCredencial);
                    } else {
                        $scope.mostrarMensaje("primero debe crear una ficha medica del paciente para poder ver el credencial")
                    }
                })
            }

            $scope.cerrarDialogDialogCredencial = function () {
                $scope.cerrarPopup($scope.idModalDialogCredencial);
            }

            $scope.abrirDialogDialogPatologias = function (paciente) {
                $scope.paciente = paciente
                var promesa = BuscarFichaPaciente(paciente.id)
                promesa.then(function (datos) {
                    if (datos.ficha) {
                        $scope.ficha = datos.ficha
                        $scope.abrirPopup($scope.idModalDialogPatologias);
                    } else {
                        $scope.mostrarMensaje("primero debe crear una ficha medica para poder ver las patogias del paciente")
                    }
                })
            }

            $scope.guardarPatoliga = function () {
                var promesa = ActualizarPatologiaPaciente($scope.paciente.id, $scope.ficha)
                promesa.then(function (datos) {
                    $scope.cerrarDialogDialogPatologias()
                    $scope.mostrarMensaje(datos.message)
                })
            }

            $scope.cerrarDialogDialogPatologias = function () {
                $scope.cerrarPopup($scope.idModalDialogPatologias);
            }

            $scope.abrirDialogDialogComentario = function (paciente) {
                $scope.paciente = paciente
                $scope.abrirPopup($scope.idModalDialogComentario);
            }

            $scope.cerrarDialogDialogComentario = function () {
                $scope.cerrarPopup($scope.idModalDialogComentario);
            }


            $scope.obtenerListaEmpresaVacunas = function (filtro) {
                $scope.filtro = filtro
                if (filtro.inicio != undefined && filtro.fin != undefined) {
                    if (filtro.inicio != 0 || filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.inicio = 0
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                    $scope.filtro.fin = 0
                }
                var promesa = ListaVacunasEmpresa($scope.usuario.id_empresa, $scope.filtro)
                promesa.then(function (datos) {
                    $scope.listaAlertVacunas = datos.Vacunas
                    $scope.listaAlertVacunas.forEach(function (vacuna) {
                        var fechaInicio = new Date(vacuna.fecha_ultima_aplicacion)
                        var fechaVence = new Date(vacuna.fecha_siguiente_aplicacion)
                        vacuna.DiasVence = $scope.diasVencidos(fechaVence).
                            console.log(vacuna.DiasVence)
                    }, this);
                })
            }

            $scope.abrirDialogReprogramarVacunas = function () {
                $scope.abrirPopup($scope.idModalReprogramarVacunas);
            }

            $scope.cerrarDialogReprogramarVacunas = function () {
                $scope.cerrarPopup($scope.idModalReprogramarVacunas);
            }

            $scope.cerrarIdModalDialogLaboratorioExamenesHistoricoResultados = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorioExamenHistoricoResultado);
            }

            $scope.cerrarIdModalDialogDiagnosticoExamenesHistoricoResultados = function () {
                $scope.cerrarPopup($scope.IdModalDialogDiagnosticoExamenHistoricoResultado);
            }

            $scope.cerrarIdModalDialogNuevoLaboratorio = function () {
                $scope.cerrarPopup($scope.IdModalDialogNuevoLaboratorio);
            }

            $scope.cerrarIdModalDialogLaboratorioExameneHistoricoPreview = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorioExamenHistoricoPreview);
            }

            $scope.cerrarIdModalDialogLaboratorioExamenesNuevoResultado = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorioExamenesNuevoResultado);
            }

            $scope.cerrarIdModalDialogLaboratorioExamenes = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorioExamenes);
            }

            $scope.cerrarPopUpExamenLaboratorio = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorioExamen);
            }

            $scope.cerrarPopUpVacunaNueva = function () {
                $scope.vacunaDosis = []
                $scope.dosis = {}
                $scope.dosisEdit = false
                $scope.cerrarPopup($scope.idModalDialogVacunaEdicion);
            }

            $scope.cerrarPopUpVacunasConfig = function () {
                $scope.vacunasPaciente = []
                $scope.cerrarPopup($scope.idModalDialogVacunasConfig);
            }

            $scope.cerrarPopUpIdModalFichaTecnica = function () {
                $scope.paciente = undefined;
                $scope.ficha = undefined;
                $scope.cerrarPopup($scope.idModalFichaTecnica);
            }

            $scope.cerrarPopUpConsulta = function () {
                $scope.cerrarPopup($scope.idModalDialogConsulta);

            }

            /*  $scope.cerrarPopUpPreRequisitos = function () {
                 $scope.cerrarPopup($scope.IdModalDialogPreRequisitos);
             } */

            $scope.cerrarIdModalDialogLaboratorio = function () {
                $scope.cerrarPopup($scope.IdModalDialogLaboratorio);
            }

            $scope.cerrarPopPupVacunasPaciente = function () {
                $scope.filtroHistorialVacunas = []
                $scope.cerrarPopup($scope.idModalDialogVacunasPaciente);
            }

            $scope.cerrarPopPupVacunasConfig = function () {
                $scope.cerrarPopup($scope.idModalDialogVacunasConfig);
            }

            $scope.crearNuevaConsulta = function (paciente) {

                if (paciente.id_ficha_paciente) {
                    var promesa = ConsultaMedicoPaciente(paciente.id_ficha_paciente)
                    promesa.then(function (dato) {
                        $scope.paciente = paciente
                        if (dato.consulta) {
                            $scope.consulta = dato.consulta;
                            $scope.consulta.presionAlta = $scope.consulta.presion.split('/')[0];
                            $scope.consulta.presionBaja = $scope.consulta.presion.split('/')[1];
                            $scope.consulta.indice_masa = $scope.consulta.indice_masa_corporal;
                            $scope.consulta.fecha = $scope.convertirFechaHora($scope.consulta.fecha);
                            $scope.consulta.id_paciente = $scope.paciente.id;
                            var filtro = { inicio: 0, fin: 0 }
                            var promesaConsultas = ListaConsultasMedicoPaciente(paciente.id, filtro)
                            promesaConsultas.then(function (datoConsultas) {
                                $scope.consultas = datoConsultas.consultas
                                $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                                $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                            })
                        } else {
                            var hoy = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
                            $scope.horaConsulta = new Date().getHours() + ':' + new Date().getMinutes()
                            var aopm = (new Date().getHours() >= 12) ? 'PM' : 'AM'
                            $scope.consulta = { id_paciente: paciente.id, fecha: hoy + ' ' + $scope.horaConsulta + ' ' + aopm };
                            $scope.consultas = [];
                        }

                        $scope.abrirPopup($scope.idModalDialogConsulta);
                    });

                } else {
                    $scope.mostrarMensaje("No tiene una ficha medica guardada")
                }

            }
            $scope.EliminarNuevoLaboratorio = function (laboratorio) {
                var promesa = EliminarLaboratorio($scope.paciente.id_empresa, laboratorio)
                promesa.then(function (datos) {
                    // $scope.cerrarIdModalDialogNuevoLaboratorio()
                    $scope.ObtenerMedicoLaboratorios($scope.paciente)
                    $scope.mostrarMensaje(datos.message)
                })
            }
            $scope.guardarNuevoLaboratorio = function (form) {
                if (form.$valid) {
                    if ($scope.laboratorio.id) {
                        var promesa = ActualizarLaboratorio($scope.paciente.id_empresa, $scope.laboratorio)
                        promesa.then(function (datos) {
                            $scope.cerrarIdModalDialogNuevoLaboratorio()
                            $scope.ObtenerMedicoLaboratorios($scope.paciente)
                            $scope.mostrarMensaje(datos.message)
                        })
                    } else {
                        var promesa = CrearLaboratorio($scope.paciente.id_empresa, $scope.laboratorio)
                        promesa.then(function (datos) {
                            $scope.cerrarIdModalDialogNuevoLaboratorio()
                            $scope.ObtenerMedicoLaboratorios($scope.paciente)
                            $scope.mostrarMensaje(datos.message)
                        })
                    }
                }
            }

            $scope.ObtenerMedicoLaboratorios = function (paciente) {
                var promesa = ListaLaboratorios(paciente.id_empresa)
                promesa.then(function (datos) {
                    $scope.listaLaboratorios = datos
                })
            }

            $scope.guardarNuevoLaboratorioExamen = function (form) {
                if (form.$valid) {
                    if ($scope.examen.id) {
                        var promesa = ActualizarLaboratorioExamen($scope.laboratorio.id, $scope.examen, $scope.paciente.id)
                        promesa.then(function (datos) {
                            $scope.cerrarIdModalDialogLaboratorioExamenesNuevoResultado()
                            $scope.ObtenerMedicoLaboratorioExamenes($scope.laboratorio)
                            SweetAlert.swal("",datos.message, "success")
                        })
                    } else {
                        var promesa = CrearLaboratorioExamen($scope.laboratorio.id, $scope.examen, $scope.paciente.id)
                        promesa.then(function (datos) {
                            $scope.cerrarIdModalDialogLaboratorioExamenesNuevoResultado()
                            $scope.ObtenerMedicoLaboratorioExamenes($scope.laboratorio)
                            SweetAlert.swal("",datos.message, "success")
                        })
                    }
                }
            }

            $scope.EliminarNuevoLaboratorioExamen = function (examen) {
                var promesa = EliminarLaboratorioExamen($scope.laboratorio.id, examen)
                promesa.then(function (datos) {
                    //$scope.cerrarIdModalDialogNuevoLaboratorio()
                    $scope.ObtenerMedicoLaboratorioExamenes($scope.laboratorio)
                    SweetAlert.swal("", datos.message, "success")
                })
            }

            $scope.ObtenerMedicoLaboratorioExamenes = function (laboratorio) {
                promesa = ListaLaboratorioExamenes(laboratorio.id, $scope.paciente.id)
                promesa.then(function (datos) {
                    $scope.listaLaboratorioExamenes = datos
                })
            }

            $scope.guardarLaboratorioExamenResultados = function (form, fecha) {
                if (form.$valid) {
                    var fecha1 = new Date($scope.convertirFecha(fecha));
                    var datos = { fecha: fecha1, examenes: $scope.listaLaboratorioExamenes }
                    promesa = CrearLaboratorioExamenResultado($scope.laboratorio.id, $scope.paciente.id, datos)
                    promesa.then(function (datos) {
                        $scope.cerrarIdModalDialogLaboratorioExamenes()
                        $scope.ObtenerMedicoLaboratorioExamenes($scope.laboratorio)
                        $scope.mostrarMensaje(datos.message)
                    })
                }
            }

            $scope.ObtenerHistorialLaboratorioExamenes = function (filtro) {
                if (filtro.inicio != undefined) {
                    if (filtro.inicio != 0 || filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                    } else {
                        $scope.filtro.inicio = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                }
                if (filtro.fin != undefined) {
                    if (filtro.fin != 0 || filtro.fin != "") {
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.fin = 0
                }
                promesa = LaboratorioExamenListaHistorial($scope.laboratorio.id, $scope.paciente.id, $scope.filtro)
                promesa.then(function (datos) {
                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                    $scope.listaHistorialLaboratorioExamenes = datos
                })
            }

            $scope.ObtenerHistorialFichaMedica = function (filtro) {
                if (filtro.inicio != undefined) {
                    if (filtro.inicio != 0 || filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                    } else {
                        $scope.filtro.inicio = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                }
                if (filtro.fin != undefined) {
                    if (filtro.fin != 0 || filtro.fin != "") {
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.fin = 0
                }
                if (filtro.tipo_control == undefined) { filtro.tipo_control = 0 }
                promesa = HistorialFichaMedicoPaciente($scope.paciente.id, filtro)
                promesa.then(function (datos) {
                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                    $scope.listaHistorialfichaMEdica = datos
                })
            }
            $scope.eliminarDiagnostico = function (diagnostico) {
                var promesa = EliminarDiagnostico($scope.paciente.id_empresa, diagnostico)
                promesa.then(function (datos) {
                    // $scope.cerrarIdModalDialogNuevoLaboratorio()
                    $scope.ObtenerMedicoDiagnostico($scope.paciente)
                    $scope.mostrarMensaje(datos.message)
                })
            }
            $scope.guardarNuevoDiagnostico = function (form) {
                if (form.$valid) {
                    if ($scope.diagnostico.id) {
                        promesa = ActualizarDiagnostico($scope.paciente.id_empresa, $scope.diagnostico)
                        promesa.then(function (datos) {
                            $scope.cerrarDialogDiagnosticoNuevo()
                            $scope.ObtenerMedicoDiagnostico($scope.paciente)
                            $scope.mostrarMensaje(datos.message)
                        })
                    } else {
                        promesa = CrearDiagnostico($scope.paciente.id_empresa, $scope.diagnostico)
                        promesa.then(function (datos) {
                            $scope.cerrarDialogDiagnosticoNuevo()
                            $scope.ObtenerMedicoDiagnostico($scope.paciente)
                            $scope.mostrarMensaje(datos.message)
                        })
                    }

                }
            }

            $scope.ObtenerMedicoDiagnostico = function (paciente) {
                promesa = ListaDiagnosticos(paciente.id_empresa)
                promesa.then(function (datos) {
                    $scope.listaDiagnosticos = datos
                })
            }

            $scope.guardarNuevoDiagnosticoExamen = function (form) {
                if (form.$valid) {
                    if ($scope.examen.id) {
                        promesa = ActualizarDiagnosticoExamen($scope.diagnostico.id, $scope.examen)
                        promesa.then(function (datos) {
                            $scope.cerrarDialogNuevoExamenDiagnostico()
                            $scope.ObtenerMedicoDiagnosticoExamenes($scope.diagnostico)
                            $scope.mostrarMensaje(datos.message)
                        })
                    } else {
                        promesa = CrearDiagnosticoExamen($scope.diagnostico.id, $scope.examen)
                        promesa.then(function (datos) {
                            $scope.cerrarDialogNuevoExamenDiagnostico()
                            $scope.ObtenerMedicoDiagnosticoExamenes($scope.diagnostico)
                            $scope.mostrarMensaje(datos.message)
                        })
                    }

                }
            }
            $scope.eliminarNuevoDiagnosticoExamen = function (examen) {
                var promesa = EliminarDiagnosticoExamen($scope.diagnostico.id, examen)
                promesa.then(function (datos) {
                    //$scope.cerrarIdModalDialogNuevoLaboratorio()
                    $scope.ObtenerMedicoDiagnosticoExamenes($scope.diagnostico)
                    $scope.mostrarMensaje(datos.message)
                })
            }

            $scope.ObtenerMedicoDiagnosticoExamenes = function (diagnostico) {
                promesa = ListaDiagnosticoExamenes(diagnostico.id, $scope.paciente.id)
                promesa.then(function (datos) {
                    $scope.listaDiagnosticosExamenes = datos
                    const filtro = { inicio: 0, fin: 0 }
                    for (let index = 0; index < $scope.listaDiagnosticosExamenes.length; index++) {
                        promesa = DiagnosticoExamenListaHistorial($scope.listaDiagnosticosExamenes[index].id, $scope.paciente.id, filtro)
                        promesa.then(function (datos) {
                            datos.forEach(resultado => {
                                if ($scope.listaDiagnosticosExamenes[index].id === resultado.diagnosticoResultados[0].diagnosticoExamen.id && $scope.listaDiagnosticosExamenes[index].id_diagnostico === resultado.diagnosticoResultados[0].diagnosticoExamen.id_diagnostico) {
                                    $scope.listaDiagnosticosExamenes[index].ultimo_resultado = resultado.diagnosticoResultados[0].resultado
                                }
                            }); 
                        })
                    }
                })
            }

            $scope.guardarDiagnosticoExamenResultados = function (form, fecha) {
                if (form.$valid) {
                    var fecha1 = new Date($scope.convertirFecha(fecha));
                    var datos = { fecha: fecha1, examenes: $scope.listaDiagnosticosExamenes }
                    promesa = CrearDiagnosticoExamenResultado($scope.diagnostico.id, $scope.paciente.id, datos)
                    promesa.then(function (datos) {
                        $scope.cerrarDialogExamenesDiagnostico()
                        $scope.ObtenerMedicoDiagnosticoExamenes($scope.diagnostico)
                        SweetAlert.swal("", datos.message, datos.messageType);
                    })
                }
            }

            $scope.ObtenerHistorialDiagnosticoExamenes = function (filtro) {
                if (filtro.inicio != undefined) {
                    if (filtro.inicio != 0 || filtro.inicio != "") {
                        $scope.filtro.inicio = (filtro.inicio instanceof Date) ? filtro.inicio : new Date($scope.convertirFecha(filtro.inicio));
                    } else {
                        $scope.filtro.inicio = 0
                    }
                } else {
                    $scope.filtro.inicio = 0
                }
                if (filtro.fin != undefined) {
                    if (filtro.fin != 0 || filtro.fin != "") {
                        $scope.filtro.fin = (filtro.fin instanceof Date) ? filtro.fin : new Date($scope.convertirFecha(filtro.fin));
                    } else {
                        $scope.filtro.fin = 0
                    }
                } else {
                    $scope.filtro.fin = 0
                }
                promesa = DiagnosticoExamenListaHistorial($scope.diagnostico.id, $scope.paciente.id, $scope.filtro)
                promesa.then(function (datos) {
                    $scope.filtro.inicio = ($scope.filtro.inicio instanceof Date) ? $scope.filtro.inicio.getDate() + '/' + ($scope.filtro.inicio.getMonth() + 1) + '/' + $scope.filtro.inicio.getFullYear() : ""
                    $scope.filtro.fin = ($scope.filtro.fin instanceof Date) ? $scope.filtro.fin.getDate() + '/' + ($scope.filtro.fin.getMonth() + 1) + '/' + $scope.filtro.fin.getFullYear() : ""
                    $scope.listaHistorialDiagnosticoExamenes = datos
                })
            }

            // $scope.fecha_excel_angular = function (fecha_desde_excel) {
            //     var fecha_minima_angular_indice_excel_1970 = 25569 - 1 //fecha minima angular. el -1 es para ajustar que el resultado que daba 1 anterior a la fecha real.
            //     var fecha_excel = new Date(1 / 1 / 1970)
            //     var diferencia_de_fecha = fecha_desde_excel - fecha_minima_angular_indice_excel_1970
            //     return fecha_excel.setTime(fecha_excel.getTime() + diferencia_de_fecha * 86400000)
            // }

            $scope.subirExcelPacientes = function (event) {
                blockUI.start();
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var pacientes = [];
                        do {
                            var paciente = {};
                            paciente.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            paciente.apellido_paterno = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            paciente.apellido_materno = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            paciente.nombres = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            paciente.ci = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                            paciente.extension = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
                            paciente.grupo_sanguineo = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
                            paciente.fecha_nacimiento = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? $scope.fecha_excel_angular(worksheet['H' + row].v.toString()) : null;
                            paciente.genero = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
                            paciente.telefono = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
                            paciente.telefono2 = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
                            paciente.telefono_movil = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : null;
                            paciente.estilo_de_vida = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : null;
                            paciente.cargo = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
                            paciente.designacion_empresa = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? worksheet['O' + row].v.toString() : null;
                            paciente.telefono_empresa = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? worksheet['P' + row].v.toString() : null;
                            paciente.campamento = worksheet['Q' + row] != undefined && worksheet['Q' + row] != "" ? worksheet['Q' + row].v.toString() : null;
                            paciente.riesgos_procesos_trabajo = worksheet['R' + row] != undefined && worksheet['R' + row] != "" ? worksheet['R' + row].v.toString() : null;
                            paciente.ciudad_referencia = worksheet['S' + row] != undefined && worksheet['S' + row] != "" ? worksheet['S' + row].v.toString() : null;
                            paciente.zona_referencia = worksheet['T' + row] != undefined && worksheet['T' + row] != "" ? worksheet['T' + row].v.toString() : null;
                            paciente.calle_av_referencia = worksheet['U' + row] != undefined && worksheet['U' + row] != "" ? worksheet['U' + row].v.toString() : null;
                            paciente.nro_referencia = worksheet['V' + row] != undefined && worksheet['V' + row] != "" ? worksheet['V' + row].v.toString() : null;
                            paciente.telefonos_referencia = worksheet['W' + row] != undefined && worksheet['W' + row] != "" ? worksheet['W' + row].v.toString() : null;
                            paciente.celular_referencia = worksheet['X' + row] != undefined && worksheet['X' + row] != "" ? worksheet['X' + row].v.toString() : null;
                            paciente.nombre_referencia = worksheet['Y' + row] != undefined && worksheet['Y' + row] != "" ? worksheet['Y' + row].v.toString() : null;
                            paciente.imagen = "img/icon-user-default.png"
                            pacientes.push(paciente);
                            row++;
                            i++;
                            console.log
                        } while (worksheet['A' + row] != undefined);
                        $scope.guardarPacientes(pacientes);
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.guardarPacientes = function (lstpacientes) {
                var pacientesEmpresa = new PacientesEmpresa({ pacientes: lstpacientes, id_empresa: $scope.usuario.id_empresa });
                pacientesEmpresa.$save(function (res) {
                    $scope.mostrarMensaje(res.mensaje);
                    $scope.recargarItemsTabla();
                })
                blockUI.stop();
            }

            $scope.subirExcelFichasTecnicas = function (event) {
                blockUI.start();
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var fichasTecnicas = [];
                        do {
                            var fichaTecnica = {};
                            fichaTecnica.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            fichaTecnica.fecha = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? new Date($scope.convertirFecha(worksheet['G' + row].v.toString())) : null;
                            fichaTecnica.estilo_vida = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : null;
                            fichaTecnica.empresa = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : null;
                            fichaTecnica.telefono = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? worksheet['N' + row].v.toString() : null;
                            fichaTecnica.area_operacion = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? worksheet['O' + row].v.toString() : null;
                            fichaTecnica.actividad_laboral = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? worksheet['P' + row].v.toString() : null;
                            fichaTecnica.riesgo = worksheet['Q' + row] != undefined && worksheet['Q' + row] != "" ? worksheet['Q' + row].v.toString() : null;
                            fichaTecnica.ciudad_referencia = worksheet['R' + row] != undefined && worksheet['R' + row] != "" ? worksheet['R' + row].v.toString() : null;
                            fichaTecnica.zona_referencia = worksheet['S' + row] != undefined && worksheet['S' + row] != "" ? worksheet['S' + row].v.toString() : null;
                            fichaTecnica.calle_av_referencia = worksheet['T' + row] != undefined && worksheet['T' + row] != "" ? worksheet['T' + row].v.toString() : null;
                            fichaTecnica.numero_referencia = worksheet['U' + row] != undefined && worksheet['U' + row] != "" ? worksheet['U' + row].v.toString() : null;
                            fichaTecnica.telefono_referencia = worksheet['V' + row] != undefined && worksheet['V' + row] != "" ? worksheet['V' + row].v.toString() : null;
                            fichaTecnica.celular_referencia = worksheet['W' + row] != undefined && worksheet['W' + row] != "" ? worksheet['W' + row].v.toString() : null;
                            fichaTecnica.nombre_referencia = worksheet['X' + row] != undefined && worksheet['X' + row] != "" ? worksheet['X' + row].v.toString() : null;
                            fichaTecnica.tipo_control = worksheet['Y' + row] != undefined && worksheet['Y' + row] != "" ? worksheet['Y' + row].v.toString() : null;
                            fichaTecnica.grupo_sanguineo = worksheet['Z' + row] != undefined && worksheet['Z' + row] != "" ? worksheet['Z' + row].v.toString() : null;
                            fichaTecnica.alergia_humo_cigarrillo = worksheet['AA' + row] != undefined && worksheet['AA' + row] != "" ? (worksheet['AA' + row].v.toString() != 'NO') ? true : false : false;
                            fichaTecnica.alergia_quimico = worksheet['AB' + row] != undefined && worksheet['AB' + row] != "" ? (worksheet['AB' + row].v.toString() != 'NO') ? true : false : false;
                            fichaTecnica.alergia_medicamento = worksheet['AC' + row] != undefined && worksheet['AC' + row] != "" ? (worksheet['AC' + row].v.toString() != 'NO') ? true : false : false;
                            fichaTecnica.alergia_plantas = worksheet['AD' + row] != undefined && worksheet['AD' + row] != "" ? worksheet['AD' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_polvo = worksheet['AE' + row] != undefined && worksheet['AE' + row] != "" ? worksheet['AE' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_algun_material = worksheet['AF' + row] != undefined && worksheet['AF' + row] != "" ? worksheet['AF' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_alimentos = worksheet['AG' + row] != undefined && worksheet['AG' + row] != "" ? worksheet['AG' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_conservas = worksheet['AH' + row] != undefined && worksheet['AH' + row] != "" ? worksheet['AH' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_picadura = worksheet['AI' + row] != undefined && worksheet['AI' + row] != "" ? worksheet['AI' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_otros = worksheet['AJ' + row] != undefined && worksheet['AJ' + row] != "" ? worksheet['AJ' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.alergia_otros_comentario = worksheet['AL' + row] != undefined && worksheet['AL' + row] != "" ? worksheet['AL' + row].v.toString() : null;
                            fichaTecnica.enfermedad_hipertension = worksheet['AL' + row] != undefined && worksheet['AL' + row] != "" ? worksheet['AL' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_diabetes = worksheet['AM' + row] != undefined && worksheet['AM' + row] != "" ? worksheet['AM' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_epilepsia = worksheet['AN' + row] != undefined && worksheet['AN' + row] != "" ? worksheet['AN' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_asma = worksheet['AO' + row] != undefined && worksheet['AO' + row] != "" ? worksheet['AO' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_cardiologia = worksheet['AP' + row] != undefined && worksheet['AP' + row] != "" ? worksheet['AP' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_digestivas = worksheet['AQ' + row] != undefined && worksheet['AQ' + row] != "" ? worksheet['AQ' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_chagas = worksheet['AR' + row] != undefined && worksheet['AR' + row] != "" ? worksheet['AR' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_hepatitis = worksheet['AS' + row] != undefined && worksheet['AS' + row] != "" ? worksheet['AS' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_lumbalgia = worksheet['AT' + row] != undefined && worksheet['AT' + row] != "" ? worksheet['AT' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.enfermedad_otros = worksheet['AU' + row] != undefined && worksheet['AU' + row] != "" ? (worksheet['AU' + row].v.toString() != 'NO') ? true : false : false;
                            fichaTecnica.enfermedad_comentario = worksheet['AV' + row] != undefined && worksheet['AV' + row] != "" ? worksheet['AV' + row].v.toString() : null;
                            fichaTecnica.quirurgico_operado = worksheet['AW' + row] != undefined && worksheet['AW' + row] != "" ? worksheet['AW' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.quirurgico_comentario = worksheet['AX' + row] != undefined && worksheet['AX' + row] != "" ? worksheet['AX' + row].v.toString() : null;
                            fichaTecnica.es_donante = worksheet['AY' + row] != undefined && worksheet['AY' + row] != "" ? worksheet['AY' + row].v.toString() != 'NO' ? true : false : false;
                            fichaTecnica.fecha = new Date(fichaTecnica.fecha)
                            fichasTecnicas.push(fichaTecnica);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        $scope.guardarfichasTecnicas(fichasTecnicas);
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.guardarfichasTecnicas = function (lstFichasTecnicas) {
                var fichasTecnicas = new FichasTecnicasPacientes({ fichas: lstFichasTecnicas, id_empresa: $scope.usuario.id_empresa });
                fichasTecnicas.$save(function (res) {
                    $scope.mostrarMensaje(res.mensaje);
                    $scope.recargarItemsTabla();
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    $scope.recargarItemsTabla();
                });
                blockUI.stop();
            }

            $scope.subirExcelSignosVitales = function (event) {
                blockUI.start();
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var signosVitales = [];
                        do {
                            var SV_Paciente = {};
                            SV_Paciente.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            SV_Paciente.fecha = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
                            SV_Paciente.presion = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
                            SV_Paciente.pulso = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
                            SV_Paciente.talla = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? Math.round(parseFloat(worksheet['J' + row].v.toString()), 4) : null;
                            SV_Paciente.peso = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? Math.round(parseFloat(worksheet['K' + row].v.toString()), 4) : null;
                            SV_Paciente.temperatura = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? Math.round(parseFloat(worksheet['L' + row].v.toString()), 3) : null;
                            SV_Paciente.frecuencia_respiratoria = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : null;
                            SV_Paciente.fecha = new Date(SV_Paciente.fecha)
                            signosVitales.push(SV_Paciente);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        $scope.guardarSignosVitales(signosVitales);
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.guardarSignosVitales = function (signosVitales) {
                var signos = new SignosVitalesPacientes({ signosVitales: signosVitales, id_empresa: $scope.usuario.id_empresa });
                signos.$save(function (res) {
                    $scope.mostrarMensaje(res.mensaje);
                    $scope.recargarItemsTabla();
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    $scope.recargarItemsTabla();
                });
                blockUI.stop();
            }

            $scope.guardarPacientes = function (lstpacientes) {
                var pacientesEmpresa = new PacientesEmpresa({ pacientes: lstpacientes, id_empresa: $scope.usuario.id_empresa });
                pacientesEmpresa.$save(function (res) {
                    $scope.mostrarMensaje(res.mensaje);
                    $scope.recargarItemsTabla();
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    $scope.recargarItemsTabla();
                });
                blockUI.stop();
            }

            $scope.subirExcelSOAP = function (event) {
                blockUI.start();
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var SOAPLista = [];
                        do {
                            var soap = {};
                            soap.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                            soap.fecha = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
                            soap.subjetivo = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
                            soap.objetivo = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
                            soap.analitico = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
                            soap.plan = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : null;
                            soap.evolucion = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : null;
                            soap.fecha = new Date(soap.fecha)
                            SOAPLista.push(soap);
                            row++;
                            i++;
                        } while (worksheet['A' + row] != undefined);
                        $scope.guardarSOAPLista(SOAPLista);
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.guardarSOAPLista = function (SOAPLista) {
                var soap = new SOAPlistaPacientes({ SOAPLista: SOAPLista, id_empresa: $scope.usuario.id_empresa });
                soap.$save(function (res) {
                    $scope.mostrarMensaje(res.mensaje);
                    $scope.recargarItemsTabla();
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    $scope.recargarItemsTabla();
                });
                blockUI.stop();
            }

            $scope.subirExcelVacunasPacientes = function (event) {
                try {
                    SweetAlert.swal({
                        title: '',
                        icon: 'info',
                        iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                        text: 'Validando archivo de importación, por favor espere...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;
                    var files = event.target.files;
                    if(files.length>0){
                        if(files[0].name.includes('.xlsx') || files[0].name.includes('.xls')){
                            var reader = new FileReader();
                            reader.readAsBinaryString(files[0]);
                            reader.onload = function (e) {
                                var data = e.target.result;
                                var workbook = XLSX.read(data, {type:'binary', cellDates:true, cellNF: false,  cellText:true });
                                if(workbook.SheetNames.length>1) {
                                    SweetAlert.hideLoading();
                                    return SweetAlert.swal("", "<p><b>El documento tiene varias hojas</b><br>Elimine las hojas excepto la que desea importar.</p>", "error");
                                }
                                let hoja = workbook.SheetNames[0];
                                let hojaTrabajo = workbook.Sheets[hoja];
                                let datos = XLSX.utils.sheet_to_json(hojaTrabajo, {header: "A",  dateNF:"YYYY-MM-DD"});
                                data = datos.map(e=>{
                                    e.A ? e.A=e.A.toString() : e.A = ''
                                    e.E ? e.E=e.E.toString() : e.E = ''
                                    e.fila = e.__rowNum__
                                    return e
                                });
                                data.shift()
                                SweetAlert.update({ title: '', icon: 'info', iconHtml: '<i class="fa fa-cloud-download size-icon"></i>', text: 'Importando registros, por favor espere...', });
                                SweetAlert.showLoading()
				                blockUI.noOpen = true;
                                var AplicacionVacunas = new aplicacionVacunasPacientes({ datos: data,  id_empresa: $scope.usuario.id_empresa });
                                AplicacionVacunas.$save(function (res) {
                                    if(res.errors.length>0){
                                        SweetAlert.swal({
                                            html: `<center><h3><b>${res.saved ? 'Se guardaron los registros' : 'No se guardaron registros' }</b></h><h5><b>Se encontraron ${res.errors.length} errores en el archivo de importación</b></h5><small><p>${res.saved ? 'Los siguientes registros no fueron importados. Puede descargar los errores, corregirlos e importarlos nuevamente.' : '' }</p></small></center>
                                            <div class='content-sweet' style="text-align: left!important; max-height: 300px; overflow-y:scroll;">
                                            <div style="padding: 0px 6px;"><small>
                                                ${ res.errors.map(e=>e.message + ": fila "+ (e.fila+1) ).join('<br>') }
                                                </small></div>
                                                </div>
                                                ${res.saved ? '<dl id="dt-list-1"><dt class="text-danger">Corrija el archivo de importación y vuelva a intentar.</dt></dl>' : ''} `,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#F18104',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Descargar errores',
                                            cancelButtonText: 'Cerrar',
                                        }).then( (result) => {
                                                if(result.isConfirmed) $scope.descargarErroresImportacion(res.errors);
                                            })
                                    }else{
                                        SweetAlert.swal("", res.message, res.messageType);
                                    }
                                    $scope.obtenerNumeroAlertas()
                                }, function (error) {
                                    SweetAlert.swal("", "<p><b>Error al importar vacunación</b><br>"+error +"</p>", res.messageType);
                                });
                            };
                            $scope.limpiarArchivoImportacion()
                        }else{
                            SweetAlert.swal("", "<h3><b>Formato Incorrecto</b></h3><br><p>El formato de carga es incorrecto, cargue en formato <b>xls</b> o <b>xlsx</b>.</p>", "error");
                        }
                    }else{
                        SweetAlert.swal("", "<p><b>Se cargaron varios ducumentos</b><br>Vuelva a intentar con un solo archivo.</p>", "success");
                    }
                } catch (error) {
                    SweetAlert.swal("", "<p><b>Ocurrió un error</b></p><br>"+error, "error");
                }
                
            }
            $scope.descargarErroresImportacion = (errores) => {
                blockUI.start();
                try {
                    let data = [["TIPO ERROR", "FILA ARCHIVO ORIGINAL", "CÓDIGO", "VACUNA", "DOSIS", "FECHA", "OBSERVACIÓN"]]
                    for(let error of errores){
                        data.push([
                            error.type ? error.type : "",
                            error.fila + 1,
                            error.codigo ? error.codigo : "",
                            error.vacuna ? error.vacuna : "",
                            error.dosis ? error.dosis : "",
                            error.fecha ? fechaATexto(error.fecha) : "",
                            error.comentario ? error.comentario : ""
                        ]);
                    }
                    let ws_name = "SheetJS";
					let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
					/* add worksheet to workbook */
					wb.SheetNames.push(ws_name);
					wb.Sheets[ws_name] = ws;
					let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
					saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Errores-Importacion-vacunas.xlsx");
                    blockUI.stop();
                } catch (error) {
					console.log(error)
                    blockUI.stop();
                }
            }
            $scope.activarLab = function (estado, laboratorio) {
                blockUI.start();
                laboratorio.eliminar = estado;
                ActivarLaboratorio.update({ id_laboratorio: laboratorio.id }, laboratorio, function (res) {
                    $scope.mostrarMensaje('Laboratorio actualizado!');
                }, function (error) {
                    $scope.mostrarMensaje('Hubo un problema al guardar.');
                });
                blockUI.stop();

            }

            $scope.imprimirFiltroPDFPacientes = function () {
                blockUI.start();
                var pacientes = null;
                $scope.paginator.itemsPerPage = 0
                var promesa = PacientesPaginador($scope.paginator);
                promesa.then(function (dato) {
                    if (dato.pacientes.length > 0) {

                        dato.pacientes.forEach(function (pac, index, array) {
                            if (pac.es_empleado) {
                                pac.cargos = pac.cargos.split(",")
                            }
                            if (index === array.length - 1) {
                                pacientes = dato.pacientes;

                            }
                        });

                    } else {
                        pacientes = dato.pacientes;

                    }

                    var doc = new PDFDocument({ compress: false, size: 'letter', margin: 3 }); //{compress: false},
                    var stream = doc.pipe(blobStream());

                    var y = 120, itemsPorPagina = 28, items = 0, pagina = 1, totalPaginas = Math.ceil(pacientes.length / itemsPorPagina);
                    $scope.dibujarCabeceraPDFPacientes(doc, pagina, totalPaginas, pacientes);
                    for (var i = 0; i <= pacientes.length - 1 && items <= itemsPorPagina; i++) {
                        doc.font('Helvetica', 8);

                        doc.text(pacientes[i].codigo, 30, y);
                        doc.text(capitalize(pacientes[i].nombre_completo.toLowerCase()), 70, y, { width: 150 });
                        doc.text(pacientes[i].designacion_empresa, 230, y);
                        doc.text(pacientes[i].ci, 280, y);
                        doc.text(pacientes[i].extension, 330, y);
                        var grupo_sanguineo = pacientes[i].grupo_sanguineo ? pacientes[i].grupo_sanguineo : "";
                        doc.text(grupo_sanguineo, 407, y);
                        doc.text(pacientes[i].campamento, 470, y);

                        y = y + 20;
                        items++;
                        if (items > itemsPorPagina) {
                            doc.addPage({ size: [612, 792], margin: 10 });
                            y = 120;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPDFPacientes(doc, pagina, totalPaginas, pacientes);
                        }
                    }

                    doc.end();
                    stream.on('finish', function () {
                        var fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                    blockUI.stop();
                })
            }

            $scope.dibujarCabeceraPDFPacientes = function (doc, pagina, totalPaginas, pacientes) {
                doc.font('Helvetica-Bold', 14);
                doc.text('LISTA DE PACIENTES', 0, 50, { align: 'center' });
                doc.font('Helvetica-Bold', 8);
                doc.text('Codigo', 30, 100);
                doc.text('Nombre', 70, 100);
                doc.text('Empresa', 230, 100);
                doc.text('C.I', 290, 100);
                doc.text('Extension', 335, 100);
                doc.text('Grupo', 410, 100);
                doc.text('Sanguineo', 405, 105);
                doc.text('Campo', 475, 100);

                doc.font('Helvetica-Bold', 8);
                doc.text(pagina + " de " + totalPaginas, 0, 740, { align: 'center' });
                var usuario = $scope.usuario.nombre_usuario;
                var fecha = new Date();
                doc.text("Usuario: " + usuario + " - Fecha: " + fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " - Hora: " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getMilliseconds(), 395, 720);
            }

            $scope.PopoverPacientes = {
                templateUrl: 'PopoverPacientes.html',
                title: 'Lista Pasientes',
                isOpen: false
            }

            $scope.imprimirFiltroExcelPacientesBasico = function () {
                blockUI.start();
                var pacientes = null;
                $scope.paginator.itemsPerPage = 0
                var promesa = PacientesPaginador($scope.paginator);
                promesa.then(function (dato) {
                    if (dato.pacientes.length > 0) {
                        dato.pacientes.forEach(function (pac, index, array) {
                            if (pac.es_empleado) {
                                pac.cargos = pac.cargos.split(",")
                            }
                            if (index === array.length - 1) {
                                pacientes = dato.pacientes;

                            }
                        });

                    } else {
                        pacientes = dato.pacientes;
                    }


                    var data = [];
                    var cabecera = ["Codigo", "Nombres", "Empresa", "C.I", "Extension", "Grupo Sanguineo", "Campo", "Cargos"];
                    data.push(cabecera)

                    var index = 0;
                    for (var i = 0; i < pacientes.length; i++) {
                        var pasiente = pacientes[i];
                        columns = [];

                        columns.push(pasiente.codigo);
                        columns.push(pasiente.nombre_completo);
                        columns.push(pasiente.designacion_empresa);
                        columns.push(pasiente.ci);
                        columns.push(pasiente.extension);
                        var grupo_sanguineo = pasiente.grupo_sanguineo ? pasiente.grupo_sanguineo : "";
                        columns.push(grupo_sanguineo);
                        columns.push(pasiente.campamento);
                        var cargos = new Array();
                        if (pasiente.cargos) {
                            for (let j = 0; j < pasiente.cargos.length; j++) {
                                var element = pasiente.cargos[j];

                                cargos.push(element);
                            }
                            cargos = cargos.join(', ');
                        } else {
                            cargos = "";
                        }
                        columns.push(cargos.toString());
                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PACIENTES.xlsx");
                    blockUI.stop();

                })
            }

            $scope.imprimirFiltroExcelPacientesPreRequisitos = function (filtro) {
                blockUI.start();

                var empresa = $scope.usuario.id_empresa
                var codigo = filtro.codigo ? filtro.codigo : "0"
                var nombres = filtro.nombres ? filtro.nombres : "0"
                var ci = filtro.ci ? filtro.ci : "0";
                var campo = filtro.campo ? filtro.campo : "0";
                var cargo = filtro.cargo ? filtro.cargo : "0";
                var busquedaEmpresa = filtro.busquedaEmpresa ? filtro.busquedaEmpresa : "0";
                var estado = filtro.estado ? filtro.estado : "0"
                var grupo_sanguineo = filtro.grupo_sanguineo ? filtro.grupo_sanguineo : "0";
                var cont = 1;
                var promesa = PacientesPreRequisito(empresa, codigo, nombres, ci, campo, cargo, busquedaEmpresa, grupo_sanguineo, estado);
                promesa.then(function (dato) {
                    var pacientes = dato.prerequisitos;
                    var data = [];
                    var cabecera = ["Codigo", "Nombres", "Pre-Requisito 1"];
                    data.push(cabecera)

                    for (var i = 0; i < pacientes.length; i++) {
                        var pasiente = pacientes[i];
                        columns = [];

                        columns.push(pasiente.codigo);
                        columns.push(pasiente.persona.nombre_completo);


                        for (let j = 0; j < pasiente.pacientesPrerequisitos.length; j++) {
                            var tam = pasiente.pacientesPrerequisitos.length;
                            const element = pasiente.pacientesPrerequisitos[j];

                            columns.push(element.preRequisito.nombre)

                            if ((tam > 1) && (data[0].length - 2 < tam)) {
                                var cabeceraTam = data[0].length - 2;
                                for (let k = 0; k < tam - cabeceraTam; k++) {
                                    cont = cont + 1;
                                    data[0].push("Pre-Requisito " + cont);
                                }
                            }
                        }



                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PACIENTES PRE-REQUISITOS.xlsx");
                    blockUI.stop();
                })

            }
            //inicio rol de turno
            $scope.abrirDialogRolTurnos = function (empleado) {

                if (!empleado.eliminado) {
                    $scope.obtenerlistaRolTurno(empleado.id_ficha)
                    if (empleado.fecha_inicio) {


                        $scope.empleado = empleado
                        var campo = {}
                        $scope.centrosDeCostos.forEach(function (centro, index, array) {
                            if (centro.nombre == empleado.campamento) {
                                campo = centro
                            }
                            if (index === (array.length - 1)) {
                                $scope.rolTurno = { campo: campo, tipo: false, turno_dia: true, fecha_fin: "", dias_trabajo: null, dias_descanso: null, grupo: "", id_ficha: null }
                                $scope.abrirPopup($scope.idModalRolTurnos);
                            }

                        })

                    }
                    else {
                        $timeout(function () {
                            $scope.$apply(function () {
                                $scope.mostrarMensaje("No cuenta con ficha actualmente, crear ficha empleado!")
                            });
                        }, 200);
                    }
                }
            }
            $scope.cerrarDialogRolTurnos = function () {
                $scope.cerrarPopup($scope.idModalRolTurnos);
            }

            $scope.GuardarRolTurno = function (rolTurno) {
                rolTurno.fecha_inicio = new Date($scope.convertirFecha(rolTurno.fecha_inicio))
                if (rolTurno.fecha_fin) rolTurno.fecha_fin = new Date($scope.convertirFecha(rolTurno.fecha_fin))
                rolTurno.id_ficha = $scope.empleado.id_ficha
                var promesa = CrearRolTurno($scope.empleado.id, rolTurno)
                promesa.then(function (datos) {
                    //$scope.imprimirPrestamo(prestamo)
                    rolTurno = {}
                    $scope.cerrarDialogRolTurnos()
                    $scope.mostrarMensaje(datos.mensaje)
                })
            }
            $scope.abrirDialogHistorialTurnos = function (empleado) {
                $scope.obtenerlistaRolTurno(empleado.id_ficha)
                $scope.edicionFichasInactivas = false
                $scope.abrirPopup($scope.idModalHistorialTurnos);
            }
            $scope.cerrarDialogHistorialTurnos = function () {
                $scope.cerrarPopup($scope.idModalHistorialTurnos);
            }
            $scope.abrirDialogCerrarRolDeTurno = function () {
                $scope.abrirPopup($scope.idModalCerrarRolDeTurno);
            }
            $scope.cerrarDialogCerrarRolDeTurno = function () {
                $scope.cerrarPopup($scope.idModalCerrarRolDeTurno);
            }
            $scope.GuardarCierreRolTurno = function (rolTurno) {
                rolTurno.fecha_fin = new Date($scope.convertirFecha(rolTurno.fecha_fin))
                var promesa = CrearRolTurno($scope.empleado.id, rolTurno)
                promesa.then(function (datos) {
                    $scope.cerrarDialogCerrarRolDeTurno()
                    $scope.mostrarMensaje(datos.mensaje)
                })
            }
            $scope.calcularDatosRolTurno = function (rolTurno) {
                var bandera = true
                if ($scope.empleadosRolTurnoE.length > 0) {
                    var fechaInicio = ""
                    contFijos = 0
                    $scope.empleadosRolTurnoE.forEach(function (rol, index, array) {
                        if (rol.tipo == true) {
                            contFijos++
                            bandera = false
                            if (rol.fecha_fin) {
                                bandera = true
                                fechaInicio = $scope.fechaATexto(sumaFecha(1, rol.fecha_fin))
                            } else {
                                fechaInicio = $scope.fechaATexto(sumaFecha(rol.dias_trabajado, rol.fecha_inicio))
                            }
                        }
                        if (index === (array.length - 1)) {
                            if (bandera) {
                                if (rolTurno.tipo) {
                                    rolTurno.fecha_fin = ""
                                    rolTurno.dias_trabajado = 14;
                                    rolTurno.dias_descanso = 7;
                                } else {
                                    //rolTurno.fecha_fin = $scope.SumarDiasMesesAñosfecha(rolTurno.fecha_inicio, 22, "d", "/")
                                    rolTurno.dias_trabajado = 7;
                                    rolTurno.dias_descanso = 0;
                                }
                            } else {
                                if (contFijos > 1) {
                                    rolTurno.tipo = false
                                    $scope.mostrarMensaje("ya cuenta con dos roles de turno fijos, las asignaciones de fechas estan copadas!. Para asignar otro rol de turno fijo debe dar de baja 1")
                                } else {
                                    if (rolTurno.tipo) {
                                        rolTurno.blokearDatos = true
                                        rolTurno.dias_trabajado = 7;
                                        rolTurno.dias_descanso = 14;
                                        /* rolTurno.tipo = false */
                                        $scope.mostrarMensaje("ya cuenta con un rol turno fijo,se genero otro con la configuracion fija!")
                                        rolTurno.fecha_inicio = fechaInicio
                                    }

                                }
                            }
                        }
                    });
                } else {
                    if (rolTurno.tipo) {
                        rolTurno.fecha_fin = ""
                        rolTurno.dias_trabajado = 14;
                        rolTurno.dias_descanso = 7;
                    } else {
                        //rolTurno.fecha_fin = $scope.SumarDiasMesesAñosfecha(rolTurno.fecha_inicio, 22, "d", "/")
                        rolTurno.dias_trabajado = 7;
                        rolTurno.dias_descanso = 0;
                    }
                }


            }
            $scope.editarRoldeTurno = function (datos) {
                datos.fecha_inicio = $scope.fechaATexto(datos.fecha_inicio)
                if (datos.fecha_fin) {
                    datos.fecha_fin = $scope.fechaATexto(datos.fecha_fin)
                }
                $scope.abrirPopup($scope.idModalRolTurnos);
                $scope.cerrarDialogHistorialTurnos()
                $scope.rolTurno = datos
            }
            $scope.obtenerlistaRolTurno = function (idficha) {
                blockUI.start()
                var promesa = ListaRolTurnos($scope.usuario.id_empresa, idficha)
                promesa.then(function (datos) {
                    $scope.empleadosRolTurnoE = datos.rolesTurno
                    var f = new Date(datos.fechaInicio)
                    f.setDate(1)
                    $scope.fechaInicioCalendario = $scope.fechaATexto(new Date(f))

                    blockUI.stop()
                })
            }
            $scope.cambiarFiltroCampo = function (filtroRolCal) {
                filtroRolCal.campo = filtroRolCal.campoData.id
            }
            $scope.customOrderRolTurno = function (items) {
                return items
            }
            $scope.obtenerlistaRolTurnoEmpresa = function () {
                var promesa = ListaRolTurnosEmpresa($scope.paginatorRolTurnos)
                promesa.then(function (datos) {
                    $scope.paginatorRolTurnos.setPages(datos.paginas);
                    $scope.listaRolTurnoFiltro = datos.rolesTurno
                })
            }
            $scope.reportePersonalRolTurnos = function () {
                var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
                var stream = doc.pipe(blobStream());
                var y = 135, totaldias = 0, itemsPorPagina = 25, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.listaRolTurnoFiltro.length / itemsPorPagina);

                $scope.dibujarCabeceraPersonalRolTurnos(doc, pagina, totalPaginas);
                var index = 0;
                for (var i = 0; i < $scope.listaRolTurnoFiltro.length; i++) {
                    var rolTurno = $scope.listaRolTurnoFiltro[i]
                    doc.font("Helvetica", 8);
                    doc.text(i + 1, 40, y);
                    doc.text((rolTurno.tipo ? "FIJO" : "TEMPORAL "), 70, y - 5, { width: 80 });
                    doc.font("Helvetica", 6);
                    doc.text(rolTurno.alerta ? "(COMPENSACIONES)" : "(ROLES PROYECTADOS)", 70, y + 5, { width: 80 });
                    doc.font("Helvetica", 8);
                    doc.text(rolTurno.ficha.empleado.persona.nombre_completo, 170, y);
                    doc.text($scope.fechaATexto(new Date(rolTurno.fecha_inicio)), 340, y);
                    if (rolTurno.fecha_fin) doc.text($scope.fechaATexto(new Date(rolTurno.fecha_fin)), 400, y);
                    doc.text(rolTurno.campo.nombre, 460, y);
                    let diasTotal = 0
                    if (rolTurno.fecha_fin) {
                        diasTotal = $scope.diferenciaEntreDiasEnDias(new Date(rolTurno.fecha_inicio), new Date(rolTurno.fecha_fin))
                    }
                    doc.text(diasTotal, 550, y);
                    totaldias += diasTotal
                    y = y + 20;

                    items = items + 1;

                    if (items == itemsPorPagina) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 135;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPersonalRolTurnos(doc, pagina, totalPaginas);
                    }
                }
                doc.font("Helvetica-Bold", 8);
                doc.text("Total Días", 80, y);
                doc.text(totaldias, 550, y);
                doc.rect(35, y - 5, 540, 25).stroke();
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }
            $scope.dibujarCabeceraPersonalRolTurnos = function (doc, pagina, totalPaginas) {

                doc.font("Helvetica-Bold", 17);
                doc.text("LISTA DE PERSONAL ROL DE TURNOS", 0, 35, { align: 'center' });
                doc.font("Helvetica", 10);
                if ($scope.filtroRolCal.inicio2 != 0 && $scope.filtroRolCal.fin2 != 0) {
                    doc.text("Desde: " + $scope.filtroRolCal.inicio2 + " Hasta: " + $scope.filtroRolCal.fin2, 0, 55, { align: 'center' });
                }

                doc.font("Helvetica-Bold", 8);
                doc.text("Nº", 40, 110);
                doc.text("Tipo", 80, 110);
                doc.text("Nombre", 200, 110);
                doc.text("Inicio", 350, 110);
                doc.text("Fin", 410, 110);
                doc.text("Campo", 470, 110)
                doc.text("Días", 550, 110)
                var currentDate = new Date()
                doc.text("USUARIO: " + $scope.usuario.persona.nombre_completo + " fecha " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "Hrs." + currentDate.getHours() + ":" + currentDate.getMinutes(), 15, 740);
                doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
                doc.rect(35, 100, 540, 25).stroke();

            }

            $scope.reporteExcelPersonalRolTurnos = function () {
                blockUI.start();
                var data = [["N°", "TIPO", "EMPLEADO", "INICIO", "FIN", "CAMPO", "DÍAS", "AUSENCIAS", "ALERTA", "COMENTARIO"]];
                var index = 0;
                for (var i = 0; i < $scope.listaRolTurnoFiltro.length; i++) {
                    var rolTurno = $scope.listaRolTurnoFiltro[i]
                    var columns = [];
                    columns.push(i + 1);
                    columns.push(rolTurno.tipo ? "FIJO" : "TEMPORAL");
                    columns.push(rolTurno.ficha.empleado.persona.nombre_completo)
                    columns.push(rolTurno.fecha_inicio)
                    columns.push(rolTurno.fecha_fin)
                    columns.push(rolTurno.campo.nombre)
                    let diasTotal = 0
                    if (rolTurno.fecha_fin) {
                        diasTotal = $scope.diferenciaEntreDiasEnDias(new Date(rolTurno.fecha_inicio), new Date(rolTurno.fecha_fin))
                    }
                    columns.push(diasTotal)
                    let diasAusencia = 0
                    let fecha_fin = rolTurno.fecha_fin ? new Date(rolTurno.fecha_fin) : new Date()
                    let fecha_inicio = rolTurno.fecha_inicio ? new Date(rolTurno.fecha_inicio) : new Date()
                    var fechasRol = getDates(fecha_inicio, fecha_fin);
                    if (fechasRol.length > 0) {
                        if (rolTurno.ficha.ausencias.length > 0) {

                            for (const fecha of fechasRol) {
                                for (var j = 0; j < rolTurno.ficha.ausencias.length; j++) {
                                    var element1 = rolTurno.ficha.ausencias[j];
                                    var startDate = new Date(element1.fecha_inicio);
                                    var endDate = new Date(element1.fecha_fin);
                                    var fechasausencias = getDates(startDate, endDate);

                                    if (fechasausencias.length > 0) {
                                        var element2 = fechasausencias.find(function (x) {
                                            return x == fecha
                                        })

                                        if (element2) {
                                            diasAusencia++
                                        }

                                    }

                                }
                            }

                        }
                    }
                    columns.push(diasAusencia)
                    columns.push(rolTurno.alerta ? "SI" : "NO")
                    columns.push(rolTurno.comentario)
                    data.push(columns);

                }
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-PERSONAL-ROL-TURNOS.xlsx");
                blockUI.stop();
            }
            $scope.agregarRolTurnoNoche = function (rolTurnoNoche) {
                if (rolTurnoNoche.editar) {
                    rolTurnoNoche.fecha_inicio = new Date($scope.convertirFecha(rolTurnoNoche.fecha_inicio))
                    rolTurnoNoche.fecha_fin = new Date($scope.convertirFecha(rolTurnoNoche.fecha_fin))
                    $scope.rolTurnoNoche = {
                        eliminado: false, fecha_inicio: "",
                        fecha_fin: "",
                        comentario: ""
                    }
                } else {
                    rolTurnoNoche.fecha_creacion = new Date()
                    rolTurnoNoche.fecha_inicio = new Date($scope.convertirFecha(rolTurnoNoche.fecha_inicio))
                    rolTurnoNoche.fecha_fin = new Date($scope.convertirFecha(rolTurnoNoche.fecha_fin))
                    $scope.rolesTurnosExtra.push(rolTurnoNoche)
                    $scope.rolTurnoNoche = {
                        eliminado: false, fecha_inicio: "",
                        fecha_fin: "",
                        comentario: ""
                    }
                }
            }
            $scope.editarRolTurnoNoche = function (rolTurnoNoche) {
                $scope.rolTurnoNoche = rolTurnoNoche
                $scope.rolTurnoNoche.editar = true
                $scope.rolTurnoNoche.fecha_inicio = $scope.fechaATexto($scope.rolTurnoNoche.fecha_inicio)
                $scope.rolTurnoNoche.fecha_fin = $scope.fechaATexto($scope.rolTurnoNoche.fecha_fin)

            }
            $scope.eliminarRolTurnoNoche = function (rolTurnoNoche, index) {
                if (rolTurnoNoche.id) {
                    rolTurnoNoche.eliminado = true
                } else {
                    $scope.rolesTurnosExtra.splice(index, 1)
                }
            }
            $scope.GuardarRolTurnoExtra = function () {
                var promise = GuardarRolesTurnosExtra($scope.rolesTurnosExtra, $scope.rolTurnoE.id, $scope.tipoRolTurnoExtra.id)
                promise.then(function (data) {
                    $scope.cerrarDialogRolTurnosNoche()
                    $scope.mostrarMensaje(data.mensaje)
                })
            }
            $scope.obtenerRolesTurnosExtra = function () {
                var promesa = ObtenerRolesTurnosExtra($scope.rolTurnoE.id, $scope.tipoRolTurnoExtra.id)
                promesa.then(function (data) {
                    $scope.rolesTurnosExtra = data.turnosExtra
                })
            }
            $scope.obtenerGruposRol = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_GROL", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.gruposRol = entidad
                    blockUI.stop();
                });
            }
            $scope.obtenerClasificacionRol = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_CLAROL", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.clasificacionesRol = entidad
                    blockUI.stop();
                });
            }
            $scope.obtenerTiposRolTurnoExtra = function () {
                blockUI.start();
                var promesa = ClasesTipo("ESTEXTROL");
                promesa.then(function (entidad) {
                    $scope.tiposRolTurnoExtra = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.abrirDialogRolTurnosNoche = function (rolTurno) {
                $scope.rolTurnoE = rolTurno
                $scope.rolTurnoNoche = {
                    eliminado: false, fecha_inicio: "",
                    fecha_fin: "",
                    comentario: ""
                }
                $scope.tipoRolTurnoExtra = {};
                if ($scope.tituloModalRolTurnoNoche === "Noches Trabajadas") {
                    $scope.tipoRolTurnoExtra = $scope.tiposRolTurnoExtra.find(function (x) {
                        return x.nombre_corto == "NOCHE"
                    })
                    $scope.obtenerRolesTurnosExtra()
                }
                else if ($scope.tituloModalRolTurnoNoche === "Días Trabajados") {
                    $scope.tipoRolTurnoExtra = $scope.tiposRolTurnoExtra.find(function (x) {
                        return x.nombre_corto == "DIA"
                    })
                    $scope.obtenerRolesTurnosExtra()
                }
                else if ($scope.tituloModalRolTurnoNoche === "Días Descansos") {
                    $scope.tipoRolTurnoExtra = $scope.tiposRolTurnoExtra.find(function (x) {
                        return x.nombre_corto == "DESCANSO"
                    })
                    $scope.obtenerRolesTurnosExtra()
                }

                $scope.abrirPopup($scope.idModalRolTurnosNoche)

            }
            $scope.cerrarDialogRolTurnosNoche = function () {
                $scope.dato = {}
                $scope.cerrarPopup($scope.idModalRolTurnosNoche)

            }
            $scope.abrirDialogReporteRolTurnos = function () {
                shortcut.add("ESC", function () {
                    $scope.cerrarDialogReporteRolTurnos()
                })
                /*     $scope.filtroRol = { inicio: 0, fin: 0, grupo: 0 } */
                let fechaInicioMesActual = new Date();
                fechaInicioMesActual.setDate(1)
                let fechaFinalMesActual = new Date(fechaInicioMesActual.getFullYear(), fechaInicioMesActual.getMonth() + 1, 0);
                $scope.paginatorRolTurnos = Paginator();
                $scope.paginatorRolTurnos.column = "id";
                $scope.paginatorRolTurnos.direccion = "asc";
                var anio = new Date().getFullYear()
                $scope.filtroRolCal = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: $scope.fechaATexto(fechaInicioMesActual),
                    fin: $scope.fechaATexto(fechaFinalMesActual),
                    grupo: "",
                    nombre: "",
                    campo: "",
                    inicio2: $scope.fechaATexto(fechaInicioMesActual),
                    fin2: $scope.fechaATexto(fechaFinalMesActual)
                }
                $scope.filtroRol = {
                    empresa: $scope.usuario.id_empresa,
                    inicio: $scope.fechaATexto(fechaInicioMesActual),
                    fin: $scope.fechaATexto(fechaFinalMesActual),
                    grupo: "",
                    campo: "",
                    alerta: ""
                }
                $scope.paginatorRolTurnos.callBack = $scope.obtenerlistaRolTurnoEmpresa;
                $scope.paginatorRolTurnos.getSearch("", $scope.filtroRol, null);
                $scope.abrirPopup($scope.idModalReporteRolTurnos);
            }
            $scope.buscarRolesTurno = function () {
                $scope.paginatorRolTurnos.callBack = $scope.obtenerlistaRolTurnoEmpresa;
                $scope.paginatorRolTurnos.getSearch("", $scope.filtroRol, null);
            }
            $scope.cerrarDialogReporteRolTurnos = function () {
                shortcut.remove("ESC", function () {
                })
                $scope.cerrarPopup($scope.idModalReporteRolTurnos);
            }
            $scope.abrirDialogReporteTurnosDetallado = function (filtro) {
                $scope.obtenerlistaRolTurnoCal(filtro)
                $scope.abrirPopup($scope.idModalReporteTurnosDetallado);
            }
            $scope.obtenerlistaRolTurnoCal = function (filtro) {
                $scope.paginatorCalendarioRolTurnos = Paginator();
                $scope.paginatorCalendarioRolTurnos.column = "id";
                $scope.paginatorCalendarioRolTurnos.direccion = "asc";
                $scope.paginatorCalendarioRolTurnos.itemsPerPage = 50;
                $scope.paginatorCalendarioRolTurnos.callBack = $scope.listaRolTurnoCal;
                $scope.paginatorCalendarioRolTurnos.getSearch("", filtro, null);

            }
            $scope.cambiarFiltroCampo = function (filtroRolCal) {
                filtroRolCal.campo = filtroRolCal.campoData.id
            }
            $scope.customOrderRolTurno = function (items) {
                return items
            }
            $scope.listaRolTurnoCal = function () {
                blockUI.start()

                var promesa = ListaRolTurnosCalendario($scope.paginatorCalendarioRolTurnos)
                promesa.then(function (datos) {
                    $scope.paginatorCalendarioRolTurnos.setPages(datos.paginas);
                    $scope.empleadosRolTurno = datos.rolesTurno
                    var f = new Date(datos.fechaInicio)
                    f.setDate(1)
                    f.setMonth(0)
                    $scope.fechaInicioCalendario = $scope.fechaATexto(new Date(f))

                    var fecha = new Date()
                    var ultimoDia = new Date(fecha.getFullYear(), 12, 0).getDate();
                    var fecha2 = "", grupo = "", nombre = "", fecha3 = "", campo = "";
                    if ($scope.filtroRolCal.inicio2) {
                        fecha2 = $scope.filtroRolCal.inicio2
                    }
                    if ($scope.filtroRolCal.fin2) {
                        fecha3 = $scope.filtroRolCal.fin2
                    }
                    if ($scope.filtroRolCal.grupo) {
                        grupo = $scope.filtroRolCal.grupo
                    }
                    if ($scope.filtroRolCal.nombre) {
                        nombre = $scope.filtroRolCal.nombre
                    }
                    if ($scope.filtroRolCal.campo) {
                        campo = $scope.filtroRolCal.campo
                    }
                    let filtroRolCal = { campo: campo, nombre: nombre, grupo: grupo, empresa: $scope.usuario.id_empresa, fin2: fecha3, inicio2: fecha2, inicio: $scope.fechaInicioCalendario, fin: ultimoDia + "/12/" + fecha.getFullYear() }

                    $scope.realizarCalendarioTrabajo(filtroRolCal)

                    blockUI.stop()
                })
            }
            function getDates(startDate, stopDate) {
                var dateArray = [];
                var currentDate = moment(startDate);
                var stopDate = moment(stopDate);
                while (currentDate <= stopDate) {
                    dateArray.push(moment(currentDate).format('YYYY/MM/DD'))
                    currentDate = moment(currentDate).add(1, 'days');
                }
                return dateArray;
            }


            $scope.realizarCalendarioTrabajo = async function (filtro) {

                var anio = []
                if (filtro) {
                    if (filtro.inicio) {
                        var inicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear();
                        var fin = new Date($scope.convertirFecha(filtro.fin2)).getFullYear();
                        while (inicio <= fin) {
                            anio.push(inicio)
                            inicio++
                        }
                    }
                    /*  if (filtro.gestion) {
                         anio = parseInt(filtro.gestion.nombre)
                     } */
                } else {

                    anio.push(new Date().getFullYear())
                }

                $scope.diasAnio = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPieTrabajos = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPieDescansos = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPieAusencias = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPieVacaciones = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPieProtectadas = await $scope.CalendarioRolTurnos(anio, filtro)
                $scope.diasAnioPiediferencia = await $scope.CalendarioRolTurnos(anio, filtro)
                if ($scope.filtroRolCal.campo) {
                    var parametroCampamento = await $scope.obtenerParametroEmpleadosCampamento()
                    if (parametroCampamento) {
                        for (const PieProtectadas of $scope.diasAnioPieProtectadas) {
                            PieProtectadas.texto = parametroCampamento.comensales
                        }
                    }

                }
                if ($scope.empleadosRolTurno) {
                    for (rol of $scope.empleadosRolTurno) {
                        rol.contador_dias_Trabajados = 0
                        rol.contador_dias_vacaciones = 0
                        rol.contador_dias_descanso = 0
                        rol.contador_noche_trabajadas = 0
                        rol.contador_dias_ausencia_medica = 0
                        rol.contador_dias_otras_ausencia = 0
                        rol.contador_suma_total = 0
                        var anio = []
                        if (filtro) {
                            if (filtro.inicio) {
                                var inicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear();
                                var fin = new Date($scope.convertirFecha(filtro.fin2)).getFullYear();
                                while (inicio <= fin) {
                                    anio.push(inicio)
                                    inicio++
                                }
                            }
                        } else {
                            anio.push(new Date().getFullYear())
                        }
                        rol.diasAnio = await $scope.CalendarioRolTurnos(anio, filtro, rol)
                        var rolturno = rol
                        var fechaFin = ""
                        if (rolturno.fecha_fin) {
                            fechaFin = $scope.fechaATexto(rolturno.fecha_fin)
                        }
                        var bandera = false
                        var a = 1
                        /*  var element = rol.diasAnio.find(function(x){
                             var compareDate = moment(element.fecha, "DD/MM/YYYY");
                             var startDate = moment(filtro.inicio2, "DD/MM/YYYY");
                             var endDate = moment(filtro.fin2, "DD/MM/YYYY");
                             var value = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                             return compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
     
                         }) */
                        for (var i = 0; i < rol.diasAnio.length; i++) {
                            var element = rol.diasAnio[i];
                            var compareDate = moment(element.fecha, "DD/MM/YYYY");
                            var startDate = moment($scope.fechaATexto(rol.fecha_inicio), "DD/MM/YYYY");
                            var endDate = moment(rol.fecha_fin ? $scope.fechaATexto(rol.fecha_fin) : filtro.fin2, "DD/MM/YYYY");
                            var value = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                            var startDate = moment(filtro.inicio2, "DD/MM/YYYY");
                            var endDate = moment(filtro.fin2, "DD/MM/YYYY");
                            var value2 = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                            if (element.fecha == $scope.fechaATexto(rolturno.fecha_inicio)) {
                                bandera = true
                            } else if (value) {
                                bandera = true
                            }
                            if (bandera) {
                                if (a <= rolturno.dias_trabajado) {
                                    if (rolturno.fecha_fin) {
                                        if (fechaFin == element.fecha) {
                                            i = rol.diasAnio.length
                                            // element.texto = "T"
                                            if (rolturno.turno_dia) {
                                                element.texto = "T"
                                                if (value && value2) {
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                }
                                            } else {
                                                element.texto = "NT"
                                                if (value && value2) {
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                }
                                            }
                                        } else {
                                            var anio = fechaFin.split("/")[2]
                                            var anioInicio = element.fecha.split("/")[2]
                                            var mes = fechaFin.split("/")[1]
                                            var mesInicio = element.fecha.split("/")[1]
                                            var dia = fechaFin.split("/")[0]
                                            var diaInicio = element.fecha.split("/")[0]
                                            if (anio >= anioInicio) {

                                                // element.texto = "T"
                                                if (rolturno.turno_dia) {
                                                    element.texto = "T"
                                                    if (value && value2) {
                                                        rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                    }
                                                } else {
                                                    element.texto = "NT"
                                                    if (value && value2) {
                                                        rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                    }
                                                }

                                            }
                                        }
                                        a++
                                    } else {
                                        // corregido calculo de dias trabajados si no tiene fecha fin ========
                                        // element.texto = "T"
                                        var finFiltro = new Date($scope.convertirFecha(filtro.fin2))
                                        var fechaInicioRol = new Date(rolturno.fecha_inicio)
                                        if (fechaInicioRol <= finFiltro) {
                                            if (rolturno.turno_dia) {
                                                element.texto = "T"
                                                if (value && value2) {
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                }
                                            } else {
                                                element.texto = "NT"
                                                if (value && value2) {
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                }
                                            }
                                        }

                                        a++
                                    }
                                } else if (a <= (rolturno.dias_trabajado + rolturno.dias_descanso)) {
                                    if (rolturno.fecha_fin) {
                                        if (fechaFin == element.fecha) {
                                            i = rol.diasAnio.length
                                            element.texto = "D"
                                            if (value && value2) {
                                                rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                            }
                                        }
                                        else {
                                            var anio = fechaFin.split("/")[2]
                                            var anioInicio = element.fecha.split("/")[2]
                                            var mes = fechaFin.split("/")[1]
                                            var mesInicio = element.fecha.split("/")[1]
                                            var dia = fechaFin.split("/")[0]
                                            var diaInicio = element.fecha.split("/")[0]
                                            if (anio >= anioInicio) {

                                                element.texto = "D"
                                                if (value && value2) {
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                                }
                                            }

                                        }
                                        if (a === (rolturno.dias_trabajado + rolturno.dias_descanso)) {
                                            a = 0
                                        }
                                        a++
                                    } else {
                                        element.texto = "D"
                                        if (a === (rolturno.dias_trabajado + rolturno.dias_descanso)) {
                                            a = 0
                                        }
                                        if (value && value2) {
                                            rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                        }
                                        a++
                                    }

                                }

                            }
                            // inicio roles extras
                            if (rol.turnosExtra) {
                                if (rol.turnosExtra.length > 0) {
                                    for (const turnoExtra of rol.turnosExtra) {
                                        var compareDate = moment(element.fecha, "DD/MM/YYYY");
                                        var startDate = moment($scope.fechaATexto(turnoExtra.fecha_inicio), "DD/MM/YYYY");
                                        var endDate = moment($scope.fechaATexto(turnoExtra.fecha_fin), "DD/MM/YYYY");
                                        var value = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                                        if (value && value2) {
                                            let tipoRolTurnoExtra = $scope.tiposRolTurnoExtra.find(function (x) {
                                                return x.id == turnoExtra.id_tipo
                                            })
                                            if (tipoRolTurnoExtra.nombre_corto == "NOCHE") {
                                                if (element.texto == "D") {
                                                    element.texto = "NT"
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso - 1
                                                } else if (element.texto == "T") {
                                                    element.texto = "NT"
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados - 1
                                                } else {
                                                    element.texto = "NT"
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas + 1
                                                }

                                            }
                                            else if (tipoRolTurnoExtra.nombre_corto == "DIA") {
                                                if (element.texto == "D") {
                                                    element.texto = "T"
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso - 1
                                                } else if (element.texto == "NT") {
                                                    element.texto = "T"
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas - 1
                                                } else {
                                                    element.texto = "T"
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados + 1
                                                }
                                            }
                                            else if (tipoRolTurnoExtra.nombre_corto == "DESCANSO") {
                                                if (element.texto == "NT") {
                                                    element.texto = "D"
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas - 1
                                                } else if (element.texto == "T") {
                                                    element.texto = "D"
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados - 1
                                                } else {
                                                    element.texto = "D"
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso + 1
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                            // fin roles extras
                            if (rol.ficha.ausencias.length > 0) {
                                for (var j = 0; j < rol.ficha.ausencias.length; j++) {
                                    var element1 = rol.ficha.ausencias[j];
                                    var startDate = new Date(element1.fecha_inicio);
                                    var endDate = new Date(element1.fecha_fin);
                                    var fechasausencias = getDates(startDate, endDate);

                                    if (fechasausencias.length > 0) {
                                        var element2 = fechasausencias.find(function (x) {
                                            return x == $scope.formatofecha(element.fecha)
                                        })
                                        var compareDate = moment(element.fecha, "DD/MM/YYYY");
                                        var startDate = moment($scope.fechaATexto(rol.fecha_inicio), "DD/MM/YYYY");
                                        var endDate = moment(rol.fecha_fin ? $scope.fechaATexto(rol.fecha_fin) : filtro.fin2, "DD/MM/YYYY");
                                        var value = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                                        var startDate = moment(filtro.inicio2, "DD/MM/YYYY");
                                        var endDate = moment(filtro.fin2, "DD/MM/YYYY");
                                        var value2 = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)

                                        if (element2 && element1.eliminado === false) {
                                            element.mensaje = $sce.trustAsHtml(element1.tipoAusencia.tipo.nombre + '<br> motivo:' + element1.tipoAusencia.nombre);
                                            if (element.texto == "D") {
                                                if (element1.horas) {
                                                    element.texto += "OA"
                                                    if (value && value2) {
                                                        rol.contador_dias_otras_ausencia = rol.contador_dias_otras_ausencia + 1
                                                        rol.contador_dias_descanso = rol.contador_dias_descanso - 1
                                                    }
                                                } else {
                                                    element.texto += "BD"
                                                    if (value && value2) {
                                                        rol.contador_dias_ausencia_medica = rol.contador_dias_ausencia_medica + 1
                                                        rol.contador_dias_descanso = rol.contador_dias_descanso - 1
                                                    }
                                                }
                                            } else if (element.texto == "T") {
                                                if (element1.horas) {
                                                    element.texto += "OA"
                                                    if (value && value2) {
                                                        rol.contador_dias_otras_ausencia = rol.contador_dias_otras_ausencia + 1
                                                        rol.contador_dias_Trabajados = rol.contador_dias_Trabajados - 1
                                                    }
                                                } else {
                                                    element.texto += "BM"
                                                    if (value && value2) {
                                                        rol.contador_dias_ausencia_medica = rol.contador_dias_ausencia_medica + 1
                                                        rol.contador_dias_Trabajados = rol.contador_dias_Trabajados - 1
                                                    }
                                                }
                                            } else if (element.texto == "NT") {
                                                if (element1.horas) {
                                                    element.texto += "A"
                                                    if (value && value2) {
                                                        rol.contador_dias_otras_ausencia = rol.contador_dias_otras_ausencia + 1
                                                        rol.contador_noche_trabajadas = rol.contador_noche_trabajadas - 1
                                                    }
                                                } else {
                                                    element.texto += "B"
                                                    if (value && value2) {
                                                        rol.contador_dias_ausencia_medica = rol.contador_dias_ausencia_medica + 1
                                                        rol.contador_noche_trabajadas = rol.contador_noche_trabajadas - 1
                                                    }
                                                }
                                            }
                                        }

                                    }

                                }
                            }

                            if (rol.ficha.vacaciones.length > 0) {
                                for (var j = 0; j < rol.ficha.vacaciones.length; j++) {
                                    var element1 = rol.ficha.vacaciones[j];


                                    var startDate = new Date(element1.fecha_inicio);
                                    var endDate = new Date(element1.fecha_fin);
                                    // console.log($scope.formatofecha());
                                    var fechasvacacion = getDates(startDate, endDate);

                                    if (fechasvacacion.length > 0) {
                                        var element2 = fechasvacacion.find(function (x) {
                                            return x == $scope.formatofecha(element.fecha)
                                        })

                                        if (element2) {
                                            element.mensaje = $sce.trustAsHtml("vacacion del <br>" + $scope.fechaATexto(element1.fecha_inicio) + " al " + $scope.fechaATexto(element1.fecha_fin));
                                            if (element.texto == "D") {
                                                element.texto += "V"
                                            }
                                            else if (element.texto == "T") {
                                                element.texto += "V"
                                            }
                                            else if (element.texto == "NT") {
                                                element.texto += "V"
                                            }
                                            if (value && value2) {
                                                rol.contador_dias_vacaciones = rol.contador_dias_vacaciones + 1
                                                if (element.texto == "DV") {
                                                    rol.contador_dias_descanso = rol.contador_dias_descanso - 1
                                                }
                                                else if (element.texto == "TV") {
                                                    rol.contador_dias_Trabajados = rol.contador_dias_Trabajados - 1
                                                }
                                                else if (element.texto == "NTV") {
                                                    rol.contador_noche_trabajadas = rol.contador_noche_trabajadas - 1
                                                }
                                            }
                                        }

                                    }

                                }
                            }
                            var diaPie = $scope.diasAnioPieTrabajos.find(function (x) {
                                return x.fecha == element.fecha
                            })

                            if (diaPie) {
                                if (element.texto == "T" || element.texto == "NT") {
                                    var val = (diaPie.texto == "") ? 0 : parseInt(diaPie.texto)
                                    diaPie.texto = val + 1
                                }
                            }
                            var diaPieA = $scope.diasAnioPieAusencias.find(function (x) {
                                return x.fecha == element.fecha
                            })
                            if (diaPieA) {
                                if (element.texto == "A" || element.texto == "TBM" || element.texto == "DBD" || element.texto == "NTB") {
                                    var val = (diaPieA.texto == "") ? 0 : parseInt(diaPieA.texto)
                                    diaPieA.texto = val + 1
                                }
                            }
                            var diaPieV = $scope.diasAnioPieVacaciones.find(function (x) {
                                return x.fecha == element.fecha
                            })
                            if (diaPieV) {
                                if (element.texto == "V" || element.texto == "TV" || element.texto == "DV" || element.texto == "NTV") {
                                    var val = (diaPieV.texto == "") ? 0 : parseInt(diaPieV.texto)
                                    diaPieV.texto = val + 1
                                }
                            }
                            var diaPieD = $scope.diasAnioPieDescansos.find(function (x) {
                                return x.fecha == element.fecha
                            })
                            if (diaPieD) {
                                if (element.texto == "D") {
                                    var val = (diaPieD.texto == "") ? 0 : parseInt(diaPieD.texto)
                                    diaPieD.texto = val + 1
                                }
                            }
                        }
                        rol.contador_suma_total = rol.contador_dias_Trabajados +
                            rol.contador_dias_descanso +
                            rol.contador_noche_trabajadas +
                            rol.contador_dias_vacaciones +
                            rol.contador_dias_otras_ausencia +
                            rol.contador_dias_ausencia_medica
                    }
                }
                if ($scope.filtroRolCal.campo && parametroCampamento) {
                    for (var x = 0; x < $scope.diasAnioPieTrabajos.length; x++) {
                        var diaPie = $scope.diasAnioPieTrabajos[x];

                        var pieDif = $scope.diasAnioPiediferencia.find(function (x) {
                            return x.fecha == diaPie.fecha
                        })
                        pieDif.texto = diaPie.texto - parametroCampamento.comensales
                    }
                }

                $scope.$evalAsync()
            }

            $scope.CalendarioRolTurnos = async function (anio, filtro) {
                $scope.mesesRolTurno = []
                var diasAnio = []
                if (filtro) {
                    if (filtro.inicio) {
                        var inicio = new Date($scope.convertirFecha(filtro.inicio)).getMonth()
                        var fin = new Date($scope.convertirFecha(filtro.fin)).getMonth()
                        var diaInicio = new Date($scope.convertirFecha(filtro.inicio)).getDate()
                        var diafin = new Date($scope.convertirFecha(filtro.fin)).getDate()
                        var anioInicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear()
                        var aniofin = new Date($scope.convertirFecha(filtro.fin)).getFullYear()
                        if (filtro.inicio2) {
                            inicio = new Date($scope.convertirFecha(filtro.inicio2)).getMonth()
                            diaInicio = new Date($scope.convertirFecha(filtro.inicio2)).getDate()
                            var anioInicio = new Date($scope.convertirFecha(filtro.inicio2)).getFullYear()

                        }
                        if (filtro.fin2) {
                            var fin = new Date($scope.convertirFecha(filtro.fin2)).getMonth()
                            var diafin = new Date($scope.convertirFecha(filtro.fin2)).getDate()
                            var aniofin = new Date($scope.convertirFecha(filtro.fin2)).getFullYear()
                        }
                    }
                }
                for (var l = 0; l < anio.length; l++) {
                    var elementanio = anio[l];
                    var meses = Object.assign([], $scope.meses)
                    meses.forEach(function (mes, index, array) {
                        var cmes = Object.assign({}, mes)
                        cmes.dias = []
                        cmes.anio = elementanio
                        if (filtro) {
                            if (filtro.inicio) {
                                if (elementanio >= anioInicio && elementanio <= aniofin) {
                                    if (cmes.id > inicio - 1 && cmes.id <= fin) {
                                        cmes.visible = true
                                    } else {
                                        cmes.visible = false
                                    }
                                } else {
                                    cmes.visible = false
                                }
                            } else {
                                cmes.visible = true
                            }
                        } else {
                            cmes.visible = true
                        }
                        $scope.mesesRolTurno.push(cmes)
                        if (index === (array.length - 1)) {

                            let diasDelAño = moment([elementanio]).isLeapYear()?366:365;
                            for (var i = 1; i <= diasDelAño; i++) {
                                var fecha = $scope.fechaPorDia(elementanio, i);
                                var mes = fecha.getMonth();
                                var dia = fecha.getDate()
                                var anio = fecha.getFullYear()
                                var dia_semana = fecha.getDay();
                                var mesRolT = $scope.mesesRolTurno.find(function (rol) {
                                    return (rol.anio == anio && rol.id == mes)
                                })
                                var compareDate = moment($scope.fechaATexto(fecha), "DD/MM/YYYY");
                                var startDate = moment(filtro.inicio2, "DD/MM/YYYY");
                                var endDate = moment(filtro.fin2, "DD/MM/YYYY");
                                var value = compareDate.isBetween(startDate, endDate) || compareDate.isSame(startDate) || compareDate.isSame(endDate)
                                if (value, mesRolT) {
                                    mesRolT.visible = true
                                }
                                var diaactual = { id: i, dia: dia, visible: true, texto: "", fecha: $scope.fechaATexto(fecha), mes: mesRolT }
                                if (value) {
                                    diasAnio.push(diaactual)
                                } else {
                                    diaactual.visible = false
                                    diasAnio.push(diaactual)
                                }
                                for (var j = 0; j < $scope.mesesRolTurno.length; j++) {
                                    var element = $scope.mesesRolTurno[j];
                                    if (element.anio == elementanio) {
                                        if (element.id == mes) {
                                            if (element.id == inicio) {
                                                if (dia >= diaInicio) {
                                                    element.dias.push(dia)
                                                }
                                            } else if (element.id == fin) {
                                                if (dia <= diafin) {
                                                    element.dias.push(dia)
                                                }
                                            } else {
                                                element.dias.push(dia)
                                            }
                                        }
                                    }
                                }
                            }


                        }
                    });
                }


                return diasAnio
            }
            $scope.fechaPorDia = function (año, dia) {
                var date = new Date(año, 0);
                return new Date(date.setDate(dia));
            }
            $scope.formatofecha = function (fecha) {
                var datos = fecha.split("/")
                return datos[2] + "/" + datos[1] + "/" + datos[0]
            }
            $scope.imprimirRolTurnoDetalle = function () {


                var doc = new PDFDocument({ size: "letter", layout: 'landscape', compress: false, margin: 10 });
                var stream = doc.pipe(blobStream());

                var y = 120, itemsPorPagina = 10, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.empleadosRolTurno.length / itemsPorPagina);

                $scope.dibujarCabeceraImpresionPDFRolTurnoDetalle(doc, pagina, totalPaginas);
                var index = 0;

                for (var i = 0; i < $scope.empleadosRolTurno.length; i++) {
                    roles = $scope.empleadosRolTurno[i]
                    if (roles.contador_suma_total > 0) {
                        doc.font("Helvetica", 8);
                        z = y - 10
                        doc.font("Helvetica-Bold", 8);
                        doc.text("Campo", 40, z);
                        z += 10
                        doc.font("Helvetica", 8);
                        doc.text(roles.campo.nombre, 40, z);

                        /* z += 10
                        doc.font("Helvetica-Bold", 8);
                        doc.text("Grupo", 40, z);
                        z += 10
                        doc.font("Helvetica", 8);
                        doc.text(roles.grupo.nombre_corto, 40, z); */

                        z += 10
                        doc.font("Helvetica-Bold", 8);
                        doc.text("Cargo", 40, z);
                        doc.font("Helvetica", 8);
                        z += 10

                        if (roles.ficha.cargos.length > 1) {
                            doc.text(roles.ficha.cargos[0].cargo.nombre + ",etc.", 40, z);
                        } else {
                            doc.text(roles.ficha.cargos[0].cargo.nombre + ".", 40, z);
                        }

                        doc.text(roles.grupo.nombre_corto, 110, y)
                        doc.text(roles.ficha.empleado.persona.nombre_completo, 130, y, { width: 100 });


                        doc.text(roles.contador_dias_Trabajados, 250, y);
                        doc.text(roles.contador_dias_descanso, 270, y);
                        doc.text(roles.contador_noche_trabajadas, 290, y);
                        doc.text(roles.contador_dias_vacaciones, 310, y);
                        doc.text(roles.contador_dias_otras_ausencia, 330, y);
                        doc.text(roles.contador_dias_ausencia_medica, 350, y);
                        doc.text(roles.contador_suma_total, 370, y);
                        var x = 390
                        for (const dia of roles.diasAnio) {
                            if (dia.mes.visible && dia.visible) {
                                doc.text(dia.texto, x, y);
                                x += 12
                                if (x > 750) {
                                    x = 320
                                    y += 10
                                }
                            }
                        }
                        //  doc.rect(35,z+8,x-30,0).stroke()
                        y = y + 40;

                        items = items + 1;

                        if (items == itemsPorPagina) {
                            doc.addPage({ size: "letter", layout: 'landscape', margin: 10 });
                            y = 120;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraImpresionPDFRolTurnoDetalle(doc, pagina, totalPaginas);
                        }
                    }
                } if (items > 8) {
                    doc.addPage({ size: "letter", layout: 'landscape', margin: 10 });
                    y = 120;
                    items = 0;
                    pagina = pagina + 1;
                    $scope.dibujarCabeceraImpresionPDFRolTurnoDetalle(doc, pagina, totalPaginas);
                }
                doc.font("Helvetica-Bold", 8);
                doc.text("PERSONAL VACACION", 40, y);
                var x = 390
                doc.font("Helvetica", 8);
                for (const dia of $scope.diasAnioPieVacaciones) {
                    if (dia.mes.visible && dia.visible) {
                        doc.text(dia.texto ? dia.texto : 0, x, y);
                        x += 12
                        if (x > 750) {
                            x = 320
                            y += 10
                        }
                    }
                }

                y = y + 20;
                doc.font("Helvetica-Bold", 8);
                doc.text("PERSONAL AUSENCIA", 40, y);
                doc.font("Helvetica", 8);
                var x = 390
                for (const dia of $scope.diasAnioPieAusencias) {
                    if (dia.mes.visible && dia.visible) {
                        doc.text(dia.texto ? dia.texto : 0, x, y);
                        x += 12
                        if (x > 750) {
                            x = 320
                            y += 10
                        }
                    }
                }
                y = y + 20;
                doc.font("Helvetica-Bold", 8);
                doc.text("PERSONAL TRABAJO", 40, y);
                var x = 390
                doc.font("Helvetica", 8);
                for (const dia of $scope.diasAnioPieTrabajos) {
                    if (dia.mes.visible && dia.visible) {
                        doc.text(dia.texto ? dia.texto : 0, x, y);
                        x += 12
                        if (x > 750) {
                            x = 320
                            y += 10
                        }
                    }
                }


                doc.font("Helvetica", 8);
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.dibujarCabeceraImpresionPDFRolTurnoDetalle = function (doc, pagina, totalPaginas) {

                doc.font("Helvetica-Bold", 17);
                doc.text("ROLES DE TURNO", 0, 30, { align: 'center' });
                doc.text("DESDE EL" + $scope.filtroRolCal.inicio2 + "HASTA EL" + $scope.filtroRolCal.fin2, 0, 55, { align: 'center' });
                var campo = $scope.centrosDeCostos.find(function (x) {
                    return x.id == $scope.filtroRolCal.campo
                })
                var nombreCampo = "TODOS"
                if (campo) {
                    nombreCampo = campo.nombre
                }
                doc.text("CAMPO: " + nombreCampo, 0, 75, { align: 'center' });
                doc.font("Helvetica-Bold", 13);
                //doc.text(empleado.nombre_completo, 0, 75, { align: 'center' });
                doc.font("Helvetica-Bold", 10);
                //doc.text("Fecha de Ingreso: " + $scope.fechaATexto(empleado.fecha_inicio), 40, 90);
                doc.font("Helvetica-Bold", 8);

                var y = 100
                doc.text("Info", 45, y);
                doc.text("Grupo", 95, y);
                doc.text("Empleado", 150, y, { width: 100 });
                doc.text("T", 250, y);
                doc.text("D", 270, y);
                doc.text("NT", 290, y);
                doc.text("V", 310, y);
                doc.text("A", 330, y);
                doc.text("BM", 350, y);
                doc.text("TT", 370, y);
                var x = 390
                for (const dia of $scope.diasAnio) {
                    if (dia.mes.visible && dia.visible) {
                        doc.text(dia.dia, x, y);
                        x += 12
                        if (x > 750) {
                            x = 320
                            y += 10
                        }
                    }
                }
            }
            $scope.generarExcelRolTurnoDetalle = function () {
                blockUI.start();
                var cabezera = ["CAMPO", "GRUPO", "EMPLEADO", "CARGO",
                    "T", "D", "NT", "V", "A", "BM", "TT"]
                var data = [];
                for (const dia of $scope.diasAnio) {
                    if (dia.mes.visible && dia.visible) {
                        cabezera.push(dia.dia);
                    }
                }
                data.push(cabezera)
                var index = 0;
                for (var i = 0; i < $scope.empleadosRolTurno.length; i++) {
                    roles = $scope.empleadosRolTurno[i]
                    var columns = [];
                    if (roles.contador_suma_total > 0) {
                        columns.push(roles.campo.nombre);
                        if (roles.ficha.cargos.length > 1) {
                            columns.push(roles.ficha.cargos[0].cargo.nombre + ",etc.")
                        } else {
                            columns.push(roles.ficha.cargos[0].cargo.nombre);
                        }

                        columns.push(roles.grupo ? roles.grupo.nombre_corto : "")
                        columns.push(roles.ficha.empleado.persona.nombre_completo);


                        columns.push(roles.contador_dias_Trabajados);
                        columns.push(roles.contador_dias_descanso);
                        columns.push(roles.contador_noche_trabajadas);
                        columns.push(roles.contador_dias_vacaciones);
                        columns.push(roles.contador_dias_otras_ausencia);
                        columns.push(roles.contador_dias_ausencia_medica);
                        columns.push(roles.contador_suma_total);
                        var x = 390
                        for (const dia of roles.diasAnio) {
                            if (dia.mes.visible && dia.visible) {
                                columns.push(dia.texto);
                            }
                        }
                        data.push(columns);
                    }

                }

                columns = []

                columns.push("PERSONAL VACACION");
                for (let index = 0; index < 10; index++) {
                    columns.push("")

                }
                for (const dia of $scope.diasAnioPieVacaciones) {
                    if (dia.mes.visible && dia.visible) {
                        columns.push(dia.texto ? dia.texto : 0);
                    }
                }
                data.push(columns);
                columns = []
                columns.push("PERSONAL AUSENCIA");
                for (let index = 0; index < 10; index++) {
                    columns.push("")

                }
                for (const dia of $scope.diasAnioPieAusencias) {
                    if (dia.mes.visible && dia.visible) {
                        columns.push(dia.texto ? dia.texto : 0);
                    }
                }
                data.push(columns);
                columns = []
                columns.push("PERSONAL TRABAJO");
                for (let index = 0; index < 10; index++) {
                    columns.push("")

                }
                for (const dia of $scope.diasAnioPieTrabajos) {
                    if (dia.mes.visible && dia.visible) {
                        columns.push(dia.texto ? dia.texto : 0);
                    }
                }
                data.push(columns);
                columns = []
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-RRHH-ROLES-DE-TURNO.xlsx");
                blockUI.stop();
            }
            //fin rol de turon 
            /* verificar cuenta */
            $scope.abrirModalVerificarCuenta = function (dato, tipo) {
                if (!dato.prestamoPagos || dato.prestamoPagos.length == 0) {
                    $scope.dato = dato
                    $scope.tipoDatosPermiso = tipo
                    $scope.cuenta = {}
                    $scope.abrirPopup($scope.IdModalVerificarCuenta);
                } else {
                    $scope.mostrarMensaje("Los prestamos sólo pueden ser anulados antes del desembolso o pago de la primera cuota, utilizar la" +
                        " opción pagar si se devuelve el monto total del desembolso");

                }

            }
            $scope.cerrarModalVerificarCuenta = function () {
                $scope.cerrarPopup($scope.IdModalVerificarCuenta);
            }
            $scope.verificarCuentaAdmin = function (cuenta) {
                const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa, cuenta)
                promesa.then(function (dato) {

                    if (dato.type) {
                        $scope.mostrarMensaje(dato.message)
                        /*  cuenta.abierto= cuenta.abierto; */

                        if ($scope.tipoDatosPermiso == "rolturnoNocturEmpleado") {
                            $scope.tituloModalRolTurnoNoche = "Noches Trabajadas"
                            $scope.abrirDialogRolTurnosNoche($scope.dato)
                        }
                        if ($scope.tipoDatosPermiso == "rolturnoDiaEmpleado") {
                            $scope.tituloModalRolTurnoNoche = "Días Trabajados"
                            $scope.abrirDialogRolTurnosNoche($scope.dato)
                        }
                        if ($scope.tipoDatosPermiso == "rolturnoDescansosEmpleado") {
                            $scope.tituloModalRolTurnoNoche = "Días Descansos"
                            $scope.abrirDialogRolTurnosNoche($scope.dato)
                        }
                        if ($scope.tipoDatosPermiso == "rolturnoEmpleado") {
                            $scope.cuenta = {}
                            $scope.editarRoldeTurno($scope.dato)
                        }
                        if ($scope.tipoDatosPermiso == "cerrarRolturnoEmpleado") {
                            $scope.cuenta = {}
                            $scope.abrirDialogCerrarRolDeTurno()
                        }
                        $scope.cerrarModalVerificarCuenta();
                    } else {
                        $scope.mostrarMensaje(dato.message)
                    }
                })
            }
            /* fin vericiar cuenta */

            $scope.imprimirVacunasAplicadas = function (paciente) {
                if(!(paciente || paciente.id)) return SweetAlert.swal("","Parámetros incorrectos", "error")
                var vacunas = $scope.vacunasAsignadas
                if(vacunas && vacunas.length == 0) SweetAlert.swal("", "No existen vacunas configuradas para este trabajador", "warning");
                SweetAlert.swal({
                    title: '',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud-download size-icon"></i>',
                    html: '<b>Generando documento<br> por favor espere...</b>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let historico = Object.values(vacunas.reduce((acc, { id_vacuna, pacienteVacuna, pacienteVacunaDosis }) => {
                    if(!acc[id_vacuna]) {
                        acc[id_vacuna] = { 
                            nombre: pacienteVacuna ? pacienteVacuna.nombre : "",
                            aplicaciones: pacienteVacunaDosis ? pacienteVacunaDosis.reverse().map(e=>e.fecha_aplicacion) : []
                        }
                    }
                    return acc
                }, {}))
                if( historico && historico.length > 0) historico = historico.sort((a, b) => {
                    if(a.createdAt > b.createdAt) return 1
                    if(b.createdAt > a.createdAt) return -1
                    return 0
                })
                const doc = new PDFDocument({ size: 'legal', layout: 'landscape', compress: false, margin: 20 });
                const stream = doc.pipe(blobStream());
                var cantidadCols = 8;
                var x = 30, y = 145, ancho = Math.ceil(1008 / (cantidadCols + 1)) + 6, alto = 62, itemsPorPagina = 6, items = 0, pagina = 1, totalPaginas = Math.ceil(historico.length / itemsPorPagina);
                $scope.cabeceraVacunasAplicadas(doc, paciente, cantidadCols, pagina, totalPaginas);
                for (let i = 0; i < historico.length; i++) {
                    const vacuna = historico[i]
                    vacuna.aplicaciones.reverse();
                    doc.text(vacuna.nombre ? vacuna.nombre.toUpperCase() : "", x, y + (alto / 2), { width: ancho, align: 'center' });
                    items++;
                    for (let k = 0; k < cantidadCols; k++) {
                        if (vacuna.aplicaciones[k]) {
                            doc.font('Helvetica-Bold', 9);
                            doc.text(fechaATexto(vacuna.aplicaciones[k]), x + ancho, y + 5, { width: ancho, align: 'center' });
                            doc.font('Helvetica', 9);
                        }
                        doc.rect(x, y, ancho, alto).stroke();
                        x += ancho;
                    }
                    x = 30;
                    y += alto;
                    if (items === itemsPorPagina) {
                        if (i != historico.length - 1) {
                            doc.addPage({ size: 'legal', layout: 'landscape', compress: false, margin: 20 });
                            y = 145;
                            items = 0;
                            pagina++;
                            $scope.cabeceraVacunasAplicadas(doc, paciente, cantidadCols, pagina, totalPaginas);
                        }
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    swal.close();
                    const fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }
            $scope.cabeceraVacunasAplicadas = function (doc, paciente, columnas, pagina, totalPaginas) {
                doc.font('Helvetica-Bold', 16);
                doc.text('CERTIFICACIÓN DE VACUNAS APLICADAS', 0, 45, { align: 'center' });
                doc.font('Helvetica', 9);
                doc.text('Fecha de impresión: ' + $scope.fechaATexto(new Date()), 0, 65, { align: 'center' })
                doc.rect(30, 75, 948, 0).stroke();
                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 898, 20, { fit: [80, 80] });
                }
                doc.font('Helvetica', 10);
                doc.text('Paciente: ', 30, 80);
                doc.text(paciente.nombre_completo, 75, 80);
                doc.text('C.I.: ', 365, 80);
                doc.text(paciente.ci, 385, 80)
                doc.text('Cargo: ', 30, 95)
                if (paciente.cargos.length > 1) {
                    let texto = ''
                    for (let i = 0; i < paciente.cargos.length; i++) {
                        if (i == paciente.cargos.length - 1) {
                            texto += paciente.cargos[i];
                        } else {
                            texto += paciente.cargos[i] + '/';
                        }
                    }
                    doc.text(texto, 65, 95)
                } else {
                    doc.text(paciente.cargos ? paciente.cargos : '', 65, 95)
                }
                doc.text('Dirección: ', 30, 110)
                doc.text(paciente.zona ? paciente.zona : '', 75, 110)
                doc.text('Teléfono: ', 675, 110)
                doc.text(paciente.telefono ? paciente.telefono : '..............', 720, 110)
                doc.text('Celular: ', 815, 110)
                doc.text(paciente.telefono_movil ? paciente.telefono_movil : '..............', 855, 110)
                var yC = 125, anchoC = Math.ceil(1008 / (columnas + 1)) + 6, xC = 30 + anchoC, altoC = 20;
                for (i = 1; i < columnas; i++) {
                    doc.text('Dosis ' + (i), xC, yC + 5, { width: anchoC, align: 'center' });
                    doc.rect(xC, yC, anchoC, altoC).stroke();
                    xC += anchoC;
                }
                doc.rect(800, 570, anchoC, 0).stroke();
                doc.text('Firma', 800, 572, { width: anchoC, align: 'center' });
                doc.font('Helvetica', 6);
                doc.text(pagina + " de " + totalPaginas, 950, 575);
                doc.font('Helvetica', 9);
            }
            $scope.proyectarFechasVacuna = function (vacunas) {
                var proyectado = [];
                if (vacunas.eliminado != true && vacunas.fecha_ultima_aplicacion != null) {
                    proyectado.push(vacunas.fecha_ultima_aplicacion);
                    for (let i = 0; i < vacunas.pacienteVacuna.vacunaDosis.length; i++) {
                        let dosis = vacunas.pacienteVacuna.vacunaDosis[i];
                        if (!dosis.unico && !dosis.eliminado) {
                            if (dosis.tiempo != 1 && i == 0) {
                                var proy = new Date(vacunas.fecha_ultima_aplicacion);
                                if (dosis.es_dosis) {
                                    proy.setDate(proy.getDate() + dosis.tiempo);
                                } else {
                                    proy.setDate(proy.getDate() + (dosis.tiempo * 30));
                                }
                                proyectado.push(proy);
                            } else {
                                if (dosis.tiempo != 1) {
                                    var t = proyectado.length - 1;
                                    var proy = new Date(proyectado[t]);
                                    if (dosis.es_dosis) {
                                        proy.setDate(proy.getDate() + dosis.tiempo);
                                    } else {
                                        proy.setDate(proy.getDate() + (dosis.tiempo * 30));
                                    }
                                    proyectado.push(proy);
                                }
                            }
                        }
                    }
                }
                return proyectado;
            }
            $scope.logoConsulta = '';
            const image = ObtenerImagen('../../../assets/custom/logoMedicos.png');
            image.then(function (img) {
                $scope.logoConsulta = img
            }).catch(function (err) {
                const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
                blockUI.stop()
            })
            $scope.imprimirConsultaMedica = function (paciente, consulta) {
                blockUI.start();
                var promesa = BuscarFichaPaciente(paciente.id)
                promesa.then(function (datos) {
                    var empleado = datos.ficha.paciente;
                    var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 40 });
                    var stream = doc.pipe(blobStream());
                    if ($scope.imagenEmpresa) {
                        doc.image($scope.imagenEmpresa, 55, 40, { width: 75, height: 50 });
                    }
                    if ($scope.logoConsulta) {
                        doc.image($scope.logoConsulta, 336, 40, { width: 75, height: 50 });
                    }
                    doc.font('Helvetica', 8).lineGap(-1.2);
                    doc.text($scope.usuario.empresa ? $scope.usuario.empresa.direccion.toUpperCase() + ( $scope.usuario.empresa ? $scope.usuario.empresa.departamento ? " - "+$scope.usuario.empresa.departamento.nombre : '' : '' ) : '', 135, 50, { width: 180 });
                    doc.text($scope.usuario.empresa ? $scope.usuario.empresa.telefono1 ? "TELÉFONO: " + $scope.usuario.empresa.telefono1 : "" : '', 135, 83);
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Dr(a).', 415, 50);
                    doc.font('Helvetica', 10);
                    doc.text('MEDICINA LABORAL', 415, 70);
                    var y = 95;
                    doc.lineWidth(2);
                    doc.rect(40, y, 532, 0).stroke()
                    y += 20;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Datos Personales', 40, y);
                    doc.font('Helvetica', 10);
                    doc.text('INFORME DE CONSULTA', 432, y);
                    y += 10;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke()
                    y += 20;
                    doc.font('Helvetica-Bold', 10).lineGap(0);
                    doc.text('Nombre:', 40, y);
                    doc.text('N° Historia:', 400, y);
                    doc.font('Helvetica', 9);
                    doc.text(empleado.persona.nombres + ' ' + empleado.persona.apellido_paterno + ' ' + empleado.persona.apellido_materno, 90, y);
                    doc.text(empleado.persona.ci, 460, y);
                    y += 15;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Ciudad:', 40, y);
                    doc.text('Dirección:', 170, y);
                    doc.font('Helvetica', 9);
                    doc.text(empleado.persona.direccion_numero, 80, y);
                    doc.text(empleado.persona.direccion_zona, 220, y, { width: 350 });
                    y += 15;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Teléfono:', 40, y);
                    doc.text('Compañía:', 400, y);
                    doc.font('Helvetica', 9);
                    doc.text(empleado.persona.telefono ? empleado.persona.telefono : '', 90, y);
                    doc.text(empleado.empresa ? empleado.empresa.razon_social : empleado.designacion_empresa ? empleado.designacion_empresa : '', 460, y);
                    y += 25;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke()
                    y += 5;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Fecha Consulta:', 40, y);
                    doc.font('Helvetica', 9);
                    doc.text( consulta.fecha ? $scope.formatoFechaHora(consulta.fecha) : "", 120, y+2);
                    y += 17;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Historia Clínica y Exploración', 40, y);
                    y += 12;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke();
                    y += 5;
                    doc.font('Helvetica', 9);
                    var indicadores = [];
                    if (consulta.presion) indicadores.push('Presión arterial ' + consulta.presion + ' mmHg');
                    if (consulta.pulso) indicadores.push('Pulso ' + consulta.pulso);
                    if (consulta.talla) indicadores.push('Talla ' + consulta.talla + ' cm');
                    if (consulta.peso) indicadores.push('Peso ' + consulta.peso + ' kg');
                    if (consulta.temperatura) indicadores.push('Temperatura Corporal ' + consulta.temperatura + ' °C');
                    if (consulta.frecuencia_respiratoria) indicadores.push('Frecuencia Respiratoria ' + consulta.frecuencia_respiratoria);
                    if (consulta.frecuencia_cardiaca) indicadores.push('Frecuencia Cardíaca' + consulta.frecuencia_cardiaca);
                    if (consulta.indice_masa_corporal) indicadores.push('Índice de masa corporal ' + consulta.indice_masa_corporal);
                    doc.text(consulta.objetivo ? consulta.objetivo + ': ' + indicadores.join(', ') : indicadores.join(', '), 40, y, { width: 532 });
                    y += 100;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Diagnóstico', 40, y);
                    y += 10;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke();
                    y += 5;
                    doc.font('Helvetica', 9);
                    doc.text(consulta.analitico ? consulta.analitico : '', 40, y, { width: 532 });
                    y += 100;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Tratamiento', 40, y);
                    y += 10;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke();
                    y += 5;
                    doc.font('Helvetica', 9);
                    doc.text(consulta.plan ? consulta.plan : '', 40, y, { width: 532 });
                    y += 100;
                    doc.font('Helvetica-Bold', 10);
                    doc.text('Evolución', 40, y);
                    y += 10;
                    doc.lineWidth(1);
                    doc.rect(40, y, 532, 0).stroke();
                    y += 5;
                    doc.font('Helvetica', 9);
                    doc.text(consulta.evolucion ? consulta.evolucion : '', 40, y, { width: 532 });
                    doc.text($scope.fechaATexto(new Date()), 40, 730);
                    doc.font('Helvetica-Bold', 9);
                    doc.rect(344, 735, 190, 0).stroke();
                    doc.text('Dr(a).', 306, 740, { width: 266, align: 'center' });

                    doc.end();
                    stream.on('finish', function () {
                        const fileURL = stream.toBlobURL('application/pdf');
                        window.open(fileURL, '_blank', 'location=no');
                    });
                    blockUI.stop();
                });
            }
            $scope.abrirReportesFichasMedicas = () => {
                $scope.obtenerTipoControl(true)
                $scope.filtroFM = { empleado: "0", estado: "0", grupo_sanguineo: "0" }
                $scope.abrirPopup($scope.idModalReporteFichasMedicas);
            }
            $scope.cerrarDialogReporteFichasMedicas = () => {
                $scope.cerrarPopup($scope.idModalReporteFichasMedicas);
                $scope.filtroFM = {}
            }
            $scope.generarReporteFichaMedicaPdf = (filtro, tipo) => {
                blockUI.start();
                GetDataReporteFichaMedica(filtro, $scope.usuario.id_empresa, tipo)
                .then(async data=>{
                    if(!data.error){
                        if(data.data.length>0){
                            await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenEmpresa) {
                                var doc = new PDFDocument({ compress: false, size: 'letter', margin: 20 });
                                var stream = doc.pipe(blobStream());
                                var y = 130, itemsPorPagina = 50, items = 0, pagina = 1, num=1, totalPaginas = Math.ceil(data.data.length / itemsPorPagina);
                                $scope.cabeceraReporteFichaMedicaPdf(doc, pagina, totalPaginas, data.data[0].tipo, filtro, imagenEmpresa);
                                for (let i = 0; i < data.data.length; i++) {
                                    const registro = data.data[i];
                                    if(i == 0){
                                        doc.font('Helvetica', 7).text(num, 30, y, { width: 60, align: 'center'})
                                        doc.text(registro.nombre_completo ? registro.nombre_completo.toUpperCase() : "", 93, y, { width: 369 })
                                        doc.text(registro.campo ? registro.campo.toUpperCase() : "", 464, y, { width: 58 })
                                        doc.text(registro.fecha ? fechaATexto(registro.fecha) : "", 522, y, { width: 60, align: 'center'})
                                        y+=12
                                        num++;
                                        items++;
                                    }else{
                                        if(registro.tipo != data.data[i-1].tipo){
                                            doc.rect(30, y, 552, 12).fillAndStroke("#C5D6E1","#C5D6E1").fillColor('#000').font('Helvetica-Bold', 7).text(registro.tipo ? registro.tipo.toUpperCase() : '', 35, y+4)
                                            num=1;
                                            items++;
                                            y+=18;
                                            if (items > itemsPorPagina) {
                                                doc.addPage({ compress: false, size: 'letter', margin: 20 });
                                                y = 130;
                                                items = 0;
                                                pagina++;
                                                $scope.cabeceraReporteFichaMedicaPdf(doc, pagina, totalPaginas, registro.tipo, filtro, imagenEmpresa);
                                            }
                                        }
                                        doc.font('Helvetica', 7).text(num, 30, y, { width: 60, align: 'center'})
                                        doc.text(registro.nombre_completo ? registro.nombre_completo.toUpperCase() : "", 93, y, { width: 369 })
                                        doc.text(registro.campo ? registro.campo.toUpperCase() : "" , 464, y, { width: 58 })
                                        doc.text(registro.fecha ? fechaATexto(registro.fecha) : "", 522, y, { width: 60, align: 'center'})
                                        y+=12
                                        num++;
                                        items++;
                                        if (items > itemsPorPagina) {
                                            doc.addPage({ compress: false, size: 'letter', margin: 20 });
                                            y = 130;
                                            items = 0;
                                            pagina++;
                                            $scope.cabeceraReporteFichaMedicaPdf(doc, pagina, totalPaginas, registro.tipo, filtro, imagenEmpresa);
                                        }
                                    }
                                    
                                }
                                
                                
                                doc.end();
                                stream.on('finish', function () {
                                    const fileURL = stream.toBlobURL('application/pdf');
                                    window.open(fileURL, '_blank', 'location=no');
                                });
                                blockUI.stop();
                            })
                        }else{
                            blockUI.stop();
                            SweetAlert.swal("", "No se encontraron registros", "warning");
                        }
                    }else{
                        blockUI.stop();
                        SweetAlert.swal("", data.message, "error");
                    }
                });
                blockUI.stop();
            }
            $scope.cabeceraReporteFichaMedicaPdf = (doc, pagina, totalPaginas, tipo, filtro, logo) => {
                doc.lineWidth(0.2).rect(30, 30, 552, 55).stroke()
                doc.rect(105, 30, 0, 55).stroke();
                doc.rect(482, 30, 0, 55).stroke();
                if(logo != "error") doc.image(logo, 33, 33, { fit: [69, 49] }); 
                doc.font('Helvetica-Bold', 10).text("REPORTE DE TIPO CONTROL MÉDICO", 105, 40,{ width: 377, align: 'center'})
                if(filtro.inicio && filtro.fin){
                    doc.font('Helvetica', 7).text("DESDE: "+fechaATexto(filtro.inicio)+"              HASTA: "+fechaATexto(filtro.fin), 105, 65,{ width: 377, align: 'center'})
                }else{  
                    if(filtro.inicio) doc.font('Helvetica', 7).text("DESDE: "+fechaATexto(filtro.inicio), 105, 65,{ width: 377, align: 'center'})
                    if(filtro.fin) doc.font('Helvetica', 7).text("HASTA: "+fechaATexto(filtro.fin), 105, 65,{ width: 377, align: 'center'})
                }
                doc.font('Helvetica-Bold', 7).text("FECHA DE IMPRESIÓN", 482, 40, {width: 100, align: 'center'})
                doc.font('Helvetica', 7).text(fechaATexto(new Date()), 482, 60, {width: 100, align: 'center'})

                doc.rect(30, 97, 552, 12).fillAndStroke("#C5D6E1","#C5D6E1").fillColor('#000').font('Helvetica-Bold', 7).text(tipo.toUpperCase(), 35, 101)
                doc.text("N°", 30, 115, { width: 60, align: 'center'})
                doc.text("NOMBRE COMPLETO", 90, 115, { width: 372, align: 'center'})
                doc.text("CAMPO", 462, 115, { width: 60, align: 'center'})
                doc.text("FECHA", 522, 115, { width: 60, align: 'center'})
                doc.text("Página "+pagina+" de "+ totalPaginas , 0, 755, { align:'center'})
            }
            $scope.generarReporteFichaMedicaXlsx = (filtro, tipo) => {
                    GetDataReporteFichaMedica(filtro, $scope.usuario.id_empresa, tipo)
                    .then(res=>{
                        if(!res.error){
                            if(res.data.length == 0 ){
                                blockUI.stop();
                                return SweetAlert.swal("", "No se encontraron registros", "warning");
                            }
                            let datos = [["NOMBRES Y APELLIDOS", "CI", "EXTENSIÓN", "EDAD", "SEXO","FECHA DE LA FICHA", "TIPO CONTROL", "ESTILO DE VIDA", "ÁREA DE OPERACIONES", "ACTIVIDADES LABORALES","RIESGOS DE LOS PROCESOS DE TRABAJO", "DATO REFERENCIAL CIUDAD", "DATO REFERENCIAL ZONA", "DATO REFERENCIAL CALLE/AVENIDA","DATO REFERENCIAL NRO", "DATO REFERENCIAL TELÉFONO", "DATO REFERENCIAL CELULAR", "DATO REFERENCIA PERSONA", "GRUPO SANGUÍNEO", "ALERGIA HUMO DE CIGARRILLO", "ALERGIA QUIMICOS", "ALERGIA MEDICAMENTOS","ALERGIA PLANTAS", "ALERGIA POLVO", "ALERGIA ALGUN MATERIAL", "ALERGIA ALIMENTOS", "ALERGIA CONSERVAS", "ALERGIA PICADURAS", "OTRAS ALERGIAS", "PRODUCTO ALÉRGICO","ENFERMEDAD DE HIPERTENSIÓN","ENFERMEDAD DE DIABETES", "ENFERMEDAD DE EPILEPSIA", "ENFERMEDAD DE ASMA", "ENFERMEDADES CARDIOLÓGICAS","ENFERMEDADES DIGESTIVAS", "ENFERMEDAD DE CHAGAS", "ENFERMEDAD HEPATITIS", "ENFERMEDAD LUMBALGIAS","OTRAS ENFERMEDADES", "DESCRIPCIÓN OTRAS ENFERMEDADES", "DESCRIPCIÓN ENFERMEDADES", "TRATAMIENTO", "OPERADO", "COMENTARIO OPERACIÓN", "DESCRIPCIÓN OPERACIÓN","INDICADOR PA", "INDICADOR FC", "INDICADOR T","INDICADOR P", "INDICADOR IMC",  "ESTADO PACIENTE"]]
                            for (let i = 0; i < res.data.length; i++) {
                                const reg = res.data[i];
                                datos.push([
                                    reg.nombre_completo,
                                    reg.ci,
                                    reg.extension,
                                    reg.edad,
                                    reg.genero,
                                    $scope.fechaATexto(reg.fecha),
                                    reg.tipo_control,
                                    reg.estilo_vida,
                                    reg.area_operacion,
                                    reg.cargos,
                                    reg.riesgo,
                                    reg.ref_ciudad,
                                    reg.ref_zona,
                                    reg.ref_calle,
                                    reg.ref_calle_nro,
                                    reg.ref_telefono,
                                    reg.ref_celular,
                                    reg.ref_nombres,
                                    reg.grupo_sanguineo,
                                    reg.alg_humo,
                                    reg.alg_quimicos,
                                    reg.alg_medicamentos,
                                    reg.alg_plantas,
                                    reg.alg_polvo,
                                    reg.alg_materiales,
                                    reg.alg_alimentos,
                                    reg.alg_conservas,
                                    reg.alg_picaduras,
                                    reg.alg_otros,
                                    reg.producto_alergico,
                                    reg.enf_hipertension,
                                    reg.enf_diabetes,
                                    reg.enf_epilepsia,
                                    reg.enf_asma,
                                    reg.enf_cardiologicas,
                                    reg.enf_digestivas,
                                    reg.enf_chagas,
                                    reg.enf_hepatitis,
                                    reg.enf_lumbalgias,
                                    reg.enf_otros,
                                    reg.enf_comentario,
                                    reg.enf_descripcion,
                                    reg.enf_tratamiento,
                                    reg.operado,
                                    reg.op_comentario,
                                    reg.op_descripcion,
                                    reg.presion,
                                    reg.frecuencia_cardiaca,
                                    reg.talla,
                                    reg.peso,
                                    reg.imc,
                                    reg.estado
                                ])
                            }
                            let ws_name = "SheetJS";
                            let wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
                            wb.SheetNames.push(ws_name);
                            wb.Sheets[ws_name] = ws;
                            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "reporte fichas medicas.xlsx");
                            blockUI.stop();
                        }else{
                            blockUI.stop();
                            SweetAlert.swal("", res.message, "error"); 
                        }
                    })
            }
            $scope.restaurarFiltro = () => {
                if($scope.filtroFM.empleado == "0"){
                    $scope.filtroFM.nombres = ""
                    $scope.filtroFM.cargo = ""
                    $scope.filtroFM.campo =  ""
                    $scope.filtroFM.estado = "0"
                    $scope.filtroFM.grupo_sanguineo = "0" 
                }
            }
            $scope.cargarCargos = (texto) => GetCargoByName(texto, $scope.usuario.id_empresa).then(data => data)
            $scope.cargarCampos = (texto) => GetCampoByName(texto, $scope.usuario.id_empresa).then(data => data)
            
           
            
            $scope.abrirModalVacunas = () => {
                $scope.cargarVacunasEmpresa();
                $scope.abrirPopup($scope.idModalDialogVacunas)
            }
            $scope.cerrarModalVacunas = () => {
                $scope.cerrarPopup($scope.idModalDialogVacunas)
            }
            $scope.cargarVacunasEmpresa = () =>{
                GetListVacunas($scope.usuario.id_empresa)
                .then(data => {
                    if(!data.error){
                        $scope.vacunas = data.vacunas
                    }else{
                        SweetAlert.swal("", "<b>Ocurrió un error al recuperar las vacunas<br><small>Puede realizar la vacunación desde vacunas</b></small>", "error");
                    }
                })
            }

            $scope.eliminarVacunaEmpresa = (id, eliminar) => {
                SweetAlert.swal({
                    title: "",
                    html: eliminar ? `<b>¿Seguro que quiere eliminar esta vacuna?</b><br><small>La vacuna ya no será visible en la vacunacion de pacientes</small>` 
                                    : `<b>¿Seguro que quiere restaurar esta vacuna?</b><br><small>La vacuna volverá a mostrarse en la vacunacion de pacientes</small>`,
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No",
                }).then( async function (result) {
                    if (result.isConfirmed) {
                        DeleteVacuna(id, eliminar)
                        .then(res => {
                            SweetAlert.swal("", res.message, res.typeMessage);
                            if(!res.error) $scope.cargarVacunasEmpresa();
                        })
                    }
                })
            }
            $scope.eliminarDosisVacuna = (dosis) => {
                    SweetAlert.swal({
                        title: "",
                        html: `<b>¿Seguro que quiere eliminar la dosis?</b><br><small>La dosis no será eliminado si ya se aplicó a algún paciente.</small>`,
                        icon: 'warning',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No",
                    }).then( async function (result) {
                        if (result.isConfirmed) {
                            if(dosis.id){
                                DeleteDosis($scope.vacuna.id, dosis.id)
                                .then(res => {
                                    SweetAlert.swal("", res.message, res.typeMessage);
                                    if(!res.error) $scope.vacunaDosis.splice($scope.vacunaDosis.indexOf(dosis), 1);
                                })
                            }else{
                                $scope.vacunaDosis.splice($scope.vacunaDosis.indexOf(dosis), 1);
                            }
                        }
                    })
            }
            
            $scope.cerrarDialogReporteTurnosDetallado=()=>{
                $scope.cerrarPopup($scope.idModalReporteTurnosDetallado);
            }

            $scope.actualizarCostoVacuna = (vacuna) => {
                if(vacuna.productos.length>0){
                    let i = vacuna.productos.findIndex( ele=>ele.id_producto === vacuna.seleccionado.id_producto )
                    if(i !== -1){
                        let nuevoCosto = vacuna.seleccionado.producto.costo
                        vacuna.productos[i].producto.costo = nuevoCosto
                    }
                }
            }

            $scope.abrirConfigProducto = async () => {
                $scope.configVacuna = {}
                $scope.obtenerConfigsVacunaProducto();
                $scope.gruposProducto = await ClasesTipoEmpresa("GRUPOS PRODUCTOS", $scope.usuario.id_empresa)
                $scope.subgruposProducto = await ClasesTipoEmpresa("SUBGRUPOS PRODUCTOS", $scope.usuario.id_empresa)
                $scope.abrirPopup($scope.idModalConfigProdVac)
            }
            $scope.cerrarConfigProducto = () => {
                $scope.cerrarPopup($scope.idModalConfigProdVac)
            }
            $scope.definirSubgrupos = (id) => {
                if($scope.subgruposProducto && id){
                    $scope.subgrupos = $scope.subgruposProducto.clases.reduce(function (val, x) {
						if (x.id_padre == id) {
							val.push(x)
						}
						return val
					}, [])
                }
            }
            /// GUARDAR CONFIGURACION VACUNA PRODUCTO
            $scope.addVacConfig = async(config) => {
                if(config.grupo && config.subGrupo){
                    let res = await GuardarConfiguracionVacunaProducto(config, $scope.usuario.id_empresa)
                    SweetAlert.swal("", res.message, res.messageType);
                    if(!res.error) $scope.obtenerConfigsVacunaProducto();
                }else{
                    SweetAlert.swal("", "<b>Parámetros incorrectos</b>", "error");
                }
            }
            // LISTAR CONFIGURACIONES VACUNA PRODUCTO
            $scope.obtenerConfigsVacunaProducto = async () =>{
               let data = await ObtenerConfiguracionVacunaProducto($scope.usuario.id_empresa)
                if(!data.error){
                    $scope.vacConfigs = data.configs;
                }else{
                    SweetAlert.swal("", data.message, data.messageType);
                }
            }
            // ACTIVAR INACTIVAR CONFIGURACION VACUNA PRODUCTO
            $scope.eliminarConfigVacuna = async (id, eliminar) => {
                if(id){
                    SweetAlert.swal({
                        title: "",
                        html: eliminar ? `<b>¿Seguro que quiere eliminar esta configuracion?</b><br><p><small>Esta acción afectará a la localización de productos para la proyección de vacunas</small></p>` 
                                        : `<b>¿Seguro que quiere restaurar esta vacuna?</b><br><p><small>Esta acción hará que se listen más productos para la proyección de vacunas.</small></p>`,
                        icon: 'question',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No",
                    }).then( async function (result) {
                        if (result.isConfirmed) {
                            let res = await EliminarConfigVacunaProducto(id, eliminar)
                            SweetAlert.swal("", res.message, res.messageType);
                            if(!res.error) $scope.obtenerConfigsVacunaProducto();
                        }
                    })
                }else{
                    SweetAlert.swal("", "<b>Parámetro incorrecto</b><br>El registro no tiene ID", "error");
                }
            }
            $scope.listarProductosVacuna = async () => {
                let res = await ObtenerProductosVacuna($scope.usuario.id_empresa)
                if(!res.error){
                    $scope.productos = res.productos;
                }else{
                    $scope.productos = []
                }
                
            }
            $scope.addProducto = (producto) => {
                if(producto.id){
                    producto.eliminado = false;
                    $scope.vacunaProductos.push({eliminado: false, producto: producto});
                }
            }
            
            //Eliminar Vacuna de lista
            $scope.eliminarVacuna = (i) => {
               if(i) $scope.vacunaProductos.splice(i,1);
            }
            // ELIMINAR PRODUCTO DE VACUNA
            $scope.eliminarVacunaProducto = (vacunaProducto, i) =>{
                if(vacunaProducto){
                    if(vacunaProducto.id){
                        SweetAlert.swal({
                            title: "",
                            html: vacunaProducto.eliminado ?  `<b>¿Seguro que quiere restaurar el producto?</b><br><p><small>Esta acción hará que se liste para la proyección de vacunas.</small></p>`
                                            : `<b>¿Seguro que quiere eliminar el producto?</b><br><p><small>El producto ya no aparecerá en las proyecciones</small></p>`,
                            icon: 'question',
                            showCloseButton: true,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si',
                            cancelButtonText: "No",
                        }).then( async function (result) {
                            if (result.isConfirmed) {
                                let res = await EliminarVacunaProducto(vacunaProducto.id, vacunaProducto.eliminado)
                                SweetAlert.swal("", res.message, res.messageType);
                                if(!res.error) {
                                    $scope.vacunaProductos[i].eliminado = !vacunaProducto.eliminado;
                                }
                            }
                        })
                    }else{
                        SweetAlert.swal("", "<b>Parámetro incorrecto</b><br>El ID es requerido", "error");
                    }
                }
            }
            $scope.imprimirIsoFichaMedica = async function (idFichaMedica, version) {
                if (!!idFichaMedica && !!version) {
                    switch (version) {
                        case 1:
                            $scope.imprimirIsoFichaMedicaV1(idFichaMedica);
                            break;
                        case 2:
                            $scope.imprimirIsoFichaMedicaV2(idFichaMedica);
                            break;
                        default:
                            SweetAlert.swal("", "Version de formato ISO no disponible", "warning");
                            break;
                    }
                } else {
                    SweetAlert.swal("", "No se pudo obtener la configuracion ISO <br> Ficha: " + idFichaMedica + " <br> v: " + version, "warning");
                }
            }
            $scope.imprimirIsoFichaMedicaV1 = (id) => {
                var fichaMedica = ObtenerFichaMedica(id);
                fichaMedica.then(async data=>{
                    if(data.fichaMedica){
                        var ficha=data.fichaMedica;
                        var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
                        var stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        
                        let y = 30;
                        doc.font("Bookman-Bold", 10);
                        doc.lineWidth(1);
                        doc.moveDown(4);
                        doc.rect(30, 30, 552, 60).stroke();
                        doc.rect(130, 60, 452, 0).stroke();
                        doc.rect(130, 30, 0, 60).stroke();
                        doc.rect(452, 30, 0, 60).stroke();
                        if ($scope.imagenEmpresa) {
                            doc.image($scope.imagenEmpresa, 41, 35, { fit: [80, 80] });
                        }
                        let configuracionIso = ficha.configuracionesIso;
                        doc.text("FICHA              DE IDENTIFICACION PERSONAL", 130, y + 10, { width: 322, align: 'center' });
                        doc.font("Bookman-Italic-Bold", 10);
                        doc.text("        MEDICA", 176, y + 10);
                        doc.font("Helvetica-Oblique", 9);
                        doc.text("´", 482, y + 10);
                        doc.font("Bookman-Italic", 9);
                        doc.text("Revision:", 455, y + 10);
                        doc.text(configuracionIso ? configuracionIso.revicion : '', 496, y + 10);
                        y += 40;
                        doc.font("Helvetica-Bold", 10);
                        doc.text("´", 242, y+2);
                        doc.font("Bookman-Italic-Bold", 10);
                        doc.text("Codigo: ", 234, y);
                        doc.font("Bookman-Bold", 10);
                        doc.text(configuracionIso.codigo, 154, y, { width: 322, align: 'center' });
                        y -= 10;
                        doc.font("Helvetica-Oblique", 9);
                        doc.text("´", 535.3, y + 5);
                        doc.font("Bookman-Italic", 9);
                        doc.text("Fecha de Aprobacion:", 455, y + 3);
                        y += 20;
                        doc.text(configuracionIso ? $scope.fechaATexto(configuracionIso.fecha_aprobacion) : '', 455, y - 3);
                        ////
                        y += 15;
                        doc.font("Bookman-Bold", 9);
                        doc.text("I. DATOS PERSONALES", 30, y + 3);
                        y += 20;
                        doc.lineWidth(1);
                        doc.rect(30, y - 6, 552, 50).stroke()
                        doc.font("Bookman", 9);
                        doc.text("NOMBRE Y APELLIDO:", 35, y);
                        doc.text(ficha.paciente.persona.nombre_completo, 140, y);
                        doc.font("Bookman-Italic", 9);
                        doc.text("TELF:", 360, y);
                        doc.font("Bookman", 9);
                        var tel = ficha.paciente.persona.telefono ? ficha.paciente.persona.telefono : ficha.paciente.persona.telefono_movil ? ficha.paciente.persona.telefono_movil : '';
                        if (tel.length>8)  tel = tel.split(/(\s+)/)[0];
                        doc.text(tel, 390, y);
                        doc.text("EDAD:", 452, y);
                        var edad = $scope.obtenerEdad(ficha.paciente.persona.fecha_nacimiento);
                        doc.text(edad, 485, y);
                        doc.text("SEXO:", 530, y);
                        doc.text(ficha.paciente.persona.genero.nombre_corto, 559, y);
                        y += 15;
                        doc.text("ESTILO DE VIDA:", 35, y);
                        let dots_ = ''
                        if (ficha.estilo_vida && ficha.estilo_vida.length > 220) {
                            dots_ = '...'
                        }
                        var estilo = ficha.estilo_vida ? (ficha.estilo_vida && ficha.estilo_vida).slice(0, 260) : "";
                        doc.text(estilo + dots_, 115, y, { width: 340 });
                        doc.text("Nº C.I.:", 452, y);
                        doc.text(ficha.paciente.persona.ci + ' ' + ficha.paciente.extension.nombre_corto, 490, y);
                        ///////
                        y += 32;
                        doc.font("Bookman-Bold", 9);
                        doc.text("II. DATOS LABORALES", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 85).stroke()
                        doc.font("Bookman", 9);
                        doc.text("EMPRESA:", 35, y);
                        doc.text(ficha.paciente.empresa.razon_social, 90, y);
                        doc.text("TELEFONO:", 240, y);
                        doc.text(ficha.paciente.empresa.telefono1, 300, y);
                        doc.text("AREA DE OPERACIONES:", 360, y);
                        doc.text(ficha.paciente.campo.nombre, 500, y);
                        y += 15;
                        doc.text("ACTIVIDADES LABORALES:", 35, y);
                        doc.text(ficha.cargos, 170, y);
                        y += 15;
                        var r = ficha.riesgo.split(',').map(rsgs => {
                            return rsgs.charAt(0).toUpperCase() + rsgs.slice(1).toLowerCase();
                        }).join(', ');
                        doc.text(r ? 'RIESGOS DE LOS PROCESOS DE TRABAJO: ' + r + '.' : 'RIESGOS DE LOS PROCESOS DE TRABAJO: ', 35, y, { width: 547 });
                        y += 40;
                        ///////map
                        y += 15;
                        doc.font("Bookman-Bold", 9);
                        doc.text("III. DATOS REFERENCIALES", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 50).stroke()
                        doc.font("Bookman-Bold", 9);
                        doc.text("EN CASO DE EMERGENCIA A QUE LUGAR Y CON QUIEN DEBE HABLAR PARA COMUNICAR:", 35, y);
                        y += 15;
                        doc.font("Bookman", 9);
                        doc.text("CIUDAD:", 35, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.direccion_ciudad ? ficha.personaReferencia.direccion_ciudad : '' : '', 85, y);
                        doc.text("ZONA:", 180, y);
                        if(ficha.personaReferencia){
                            if(ficha.personaReferencia.direccion_zona){
                                var zona = ficha.personaReferencia.direccion_zona.length>19 ? ficha.personaReferencia.direccion_zona.slice(0,19): ficha.personaReferencia.direccion_zona;
                            }
                            if(ficha.personaReferencia.direccion_localidad){
                                var localidad = ficha.personaReferencia.direccion_localidad.length > 34 ? ficha.personaReferencia.direccion_localidad.slice(0,34): ficha.personaReferencia.direccion_localidad;
                            }
                        }
                        doc.text(zona ? zona : '' , 212, y);
                        doc.text("CALLE/AVENIDA:", 300, y);
                        doc.text(localidad ? localidad : '', 382, y);
                        doc.text("Nº:", 536, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.direccion_numero ? ficha.personaReferencia.direccion_numero: '' : '', 550, y);
                        y += 15;
                        doc.text("TELEFONO:", 35, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.telefono ? ficha.personaReferencia.telefono: '' : '', 100, y);
                        doc.text("CELULAR:", 180, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.telefono_movil ? ficha.personaReferencia.telefono_movil: '' : '', 235, y);
                        doc.text("NOMBRE DE LA PERSONA:", 300, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.nombres ? ficha.personaReferencia.nombres: '' : '', 425, y);
                        ///////
                        y += 20;
                        doc.font("Bookman-Bold", 9);
                        doc.text("IV. INDICADORES ESPECIFICOS", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 75).stroke()
                        doc.font("Bookman", 9);
                        doc.text("GRUPO SANGUÍNEO:", 35, y);
                        var tipo_sangineo = $scope.grupos_sanguineos.find(grupo => grupo.id === ficha.paciente.id_grupo_sanguineo)
                        var factor_rh = tipo_sangineo && (tipo_sangineo.nombre_corto.indexOf('+') > -1 ? 'POSITIVO' : 'NEGATIVO') || 'No Definido'
                        var tipo_ = tipo_sangineo.nombre_corto.replace(/\+|\-/, '')
                        doc.text('"' + tipo_.trim() + '"', 132, y);
                        doc.text('FACTOR RH: ' + factor_rh, 360, y);
                        y += 15;
                        doc.lineWidth(1);
                        doc.text("ES ALERGICO A:", 35, y);
                        doc.text('HUMO DE CIGARRILLO:', 115, y);
                        if (ficha.alergia_humo_cigarrillo) {
                            doc.rect(228, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(228, y + 2, 10, 7).stroke()
                        }
                        doc.text(' QUIMICOS:', 249, y);
                        if (ficha.alergia_quimico) {
                            doc.rect(307, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(307, y + 2, 10, 7).stroke()
                        }
                        doc.text('MEDICAMENTOS:', 325, y);
                        if (ficha.alergia_medicamento) {
                            doc.rect(410, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(410, y + 2, 10, 7).stroke()
                        }
                        doc.text('PLANTAS:', 443, y);
                        if (ficha.alergia_plantas) {
                            doc.rect(490, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(490, y + 2, 10, 7).stroke()
                        }
                        doc.text('POLVO:', 510, y);
                        if (ficha.alergia_polvo) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }
                        y += 15
                        doc.text(' ALGUN MATERIAL:', 135, y);
                        if (ficha.alergia_algun_material) {
                            doc.rect(228, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(228, y + 2, 10, 7).stroke()
                        }
                        doc.text('ALIMENTOS:', 245, y);
                        if (ficha.alergia_alimentos) {
                            doc.rect(307, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(307, y + 2, 10, 7).stroke()
                        }
                        doc.text('CONSERVAS:', 345, y);
                        if (ficha.alergia_conservas) {
                            doc.rect(410, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(410, y + 2, 10, 7).stroke()
                        }
                        doc.text('PICADURAS:', 430, y);
                        if (ficha.alergia_picadura) {
                            doc.rect(490, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(490, y + 2, 10, 7).stroke()
                        }
                        doc.text('OTROS:', 510, y);
                        if (ficha.alergia_otros) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }
                        y += 15
                        doc.text('ESPECIFIQUE EL PRODUCTO O ELEMENTO:', 35, y);
                        doc.text($scope.concatenarTextos(ficha.descripcion_indicadores, ficha.alergia_otros_comentario) || 'No refiere.', 245, y, { width: 335 });
                        ///////
                        y += 30;
                        doc.font("Bookman-Bold", 9);
                        doc.text("V. ANTECEDENTES DE ENFERMEDADES", 30, y + 3);
                        y += 20;
                        doc.lineWidth(1);
                        doc.rect(30, y - 6, 552, 155).stroke()
                        doc.font("Bookman", 9);
                        doc.text("USTED TIENE O HA ENFERMADO DE:", 35, y);
                        y += 15;
                        doc.lineWidth(1);
                        // doc.text("ES ALÉRGICO A:", 45, y);
                        doc.text('HIPERTENSIÓN', 35, y);
                        if (ficha.enfermedad_hipertension) {
                            doc.rect(113, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(113, y + 2, 10, 7).stroke()
                        }
                        doc.text('DIABETES', 137, y);
                        if (ficha.enfermedad_diabetes) {
                            doc.rect(195, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(195, y + 2, 10, 7).stroke()
                        }
                        doc.text('EPILEPSIA', 240, y);
                        if (ficha.enfermedad_epilepsia) {
                            doc.rect(296, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(296, y + 2, 10, 7).stroke()
                        }
                        doc.text('ASMA', 320, y);
                        if (ficha.enfermedad_asma) {
                            doc.rect(355, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(355, y + 2, 10, 7).stroke()
                        }
                        doc.text('CARDIOLOGICA', 380, y);
                        if (ficha.enfermedad_cardilogia) {
                            doc.rect(460, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(460, y + 2, 10, 7).stroke()
                        }
                        doc.text('DIGESTIVAS', 484, y);
                        if (ficha.enfermedad_digestiva) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }

                        doc.font('Bookman-Italic', 9)
                        y += 15
                        doc.text('CHAGAS', 66, y);
                        if (ficha.enfermedad_chagas) {
                            doc.rect(113, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(113, y + 2, 10, 7).stroke()
                        }
                        doc.text('HEPATITIS', 136, y);
                        if (ficha.enfermedad_hepatitis) {
                            doc.rect(195, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(195, y + 2, 10, 7).stroke()
                        }
                        doc.text('LUMBALGIAS', 226, y);
                        if (ficha.enfermedad_lumbalgia) {
                            doc.rect(296, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(296, y + 2, 10, 7).stroke()
                        }
                        doc.font("Bookman", 9);

                        // doc.text('OTROS:', 600, y);
                        // if (ficha.alergia_otros) {
                        //     doc.rect(640, y, 6, 6).fillAndStroke()
                        // } else {
                        //     doc.rect(640, y, 6, 6).stroke()
                        // }
                        y += 15
                        doc.text('OTRAS ENFERMEDADES:', 35, y);
                        // y+=20
                        var otrasEnfermedades = ''
                        if(ficha.enfermedad_otros){
                            if(ficha.descripcion_antecedentes) otrasEnfermedades += ficha.descripcion_antecedentes;
                            if(ficha.enfermedad_comentario) otrasEnfermedades += ', '+ficha.enfermedad_comentario
                        }else{
                            if(ficha.descripcion_antecedentes) otrasEnfermedades += ficha.descripcion_antecedentes;
                        }
                        otrasEnfermedades = (otrasEnfermedades ? otrasEnfermedades.length < 160 ? otrasEnfermedades : otrasEnfermedades.slice(0, 160) + '...' : '')
                        doc.text(otrasEnfermedades || 'No.', 155, y, { width: 425 });
                        y += 12 * 2
                        doc.text('DETALLE LA ENFERMEDAD, DESDE CUANDO, SI RECIBIO TRATAMIENTO O ESTA EN TRATAMIENTO, QUE MEDICAMENTO TOMA, Y SI SE SIENTE BIEN CON EL TRATAMIENTO:', 35, y, { width: 522 });
                        let tratamiento = ""
                        if (ficha.tratamiento) {
                            tratamiento = (ficha.tratamiento.length < 460 ? ficha.tratamiento : ficha.tratamiento.slice(0, 460) + '...')
                        }
                        doc.text(tratamiento, 35, y + 20, { width: 545 });
                        y += 17 * 4
                        var ultima_consulta = ficha.consultas && ficha.consultas[0] || { indice_masa_corporal: '  ', peso: '  ', talla: '  ', frecuencia_cardiaca: '  ', presion: '  ' }
                        doc.text('PA:', 35, y);
                        doc.text(ultima_consulta.presion ? ultima_consulta.presion + ' mmHg': '  mmHg', 50, y);
                        doc.text('FC:', 170, y);
                        doc.text(ultima_consulta.frecuencia_cardiaca ? ultima_consulta.frecuencia_cardiaca + ' x min.' : '  x min.', 190, y);
                        doc.text('T:', 290, y);
                        doc.text(ultima_consulta.talla ? ultima_consulta.talla + ' cm.' : '  cm.', 300, y);
                        doc.text('P:', 410, y);
                        doc.text(ultima_consulta.peso ? ultima_consulta.peso + ' Kg.': ' ' + ' Kg.', 425, y);
                        doc.text('IMC:', 520, y);
                        doc.text(ultima_consulta.indice_masa_corporal ? ultima_consulta.indice_masa_corporal : '  ', 545, y);
                        ///////
                        doc.lineWidth(1);
                        y += 18;
                        doc.font("Bookman-Bold", 9);
                        doc.text("VI. ANTECEDENTES QUIRURGICOS", 30, y + 3);
                        y += 20;
                        doc.font("Bookman", 9);
                        doc.rect(30, y - 6, 552, 53).stroke()
                        doc.lineWidth(1);
                        doc.rect(165, y - 1, 12, 10).stroke()
                        doc.text("USTED HA SIDO OPERADO: ", 35, y);
                        doc.font("Bookman", 8);
                        doc.text(ficha.quirurgico_operado && 'Si' || 'No', 166, y- 0.1);
                        doc.font("Bookman", 9);
                        y += 12;
                        doc.text("ALGUN COMENTARIO:", 35, y);
                        let comentario =    ficha.quirurgico_descripcion ? 
                                            ficha.quirurgico_comentario ? 
                                            ficha.quirurgico_descripcion+ ', '+ficha.quirurgico_comentario: 
                                            ficha.quirurgico_descripcion : ficha.quirurgico_comentario ? ficha.quirurgico_comentario : '';
                        doc.text(comentario ? '                                     '+comentario : '', 35, y, { width: 545 });
                        y += 12;
                        doc.text('Fecha: ' + (ficha.fecha && $scope.formatoFechaPDF(ficha.fecha) || "Error."), 493, y + 25);
                        y += 100;
                        doc.rect(58, y - 5, 190, 0).stroke()
                        doc.text("NOMBRE Y FIRMA DEL MEDICO", 0, y-3, { width: 306, align: 'center' });
                        doc.rect(364, y - 5, 190, 0).stroke();
                        doc.text("NOMBRE Y FIRMA DEL TRABAJADOR", 306, y-3, { width: 306, align: 'center' });
                        y += 10;
                        doc.font("Bookman-Italic-Bold", 9);
                        doc.text("Pagina 1 de 1", 30, y, { width: 552, oblique: true, align: 'center' });
                        doc.font("Bookman-Bold", 9);
                        doc.text("´", 30, y, { width: 509, oblique: true, align: 'center' });
                        doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(ficha.createdAt) + '      ' +'Actualizado: '+$scope.formatoFechaHora(ficha.updatedAt), 0, y+8,{width: 306, align: 'center'});
                        doc.font('Bookman', 6).text('Impreso: '+$scope.formatoFechaHora()+'       '+ 'Impreso por: ' + $scope.usuario.nombre_usuario, 306, y+8,{width: 306, align: 'center'});
                        //////
                        doc.end();
                        stream.on('finish', function () {
                            const fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        })
                        blockUI.stop();
                    }else{
                        SweetAlert.swal("", "No se pudo generar la ficha médica", "warning");
                    }
                })
            }
            $scope.imprimirIsoFichaMedicaV2 = (id) => {
                var fichaMedica = ObtenerFichaMedica(id);
                fichaMedica.then(async data=>{
                    if(data.fichaMedica){
                        var ficha=data.fichaMedica;
                        var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
                        var stream = doc.pipe(blobStream());
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style.ttf', 'Bookman');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-bold.ttf', 'Bookman-Bold');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic.ttf', 'Bookman-Italic');
                        await $scope.registrarFuentePdfKit(doc, '../../../assets/fonts/bookman-old-style-italic-bold.ttf', 'Bookman-Italic-Bold');
                        
                        let y = 30;
                        doc.font("Bookman-Bold", 10);
                        doc.lineWidth(1);
                        doc.moveDown(4);
                        doc.rect(30, 30, 552, 60).stroke();
                        doc.rect(130, 60, 452, 0).stroke();
                        doc.rect(130, 30, 0, 60).stroke();
                        doc.rect(452, 30, 0, 60).stroke();
                        if ($scope.imagenEmpresa) {
                            doc.image($scope.imagenEmpresa, 41, 35, { fit: [80, 80] });
                        }
                        let configuracionIso = ficha.configuracionesIso;
                        doc.text(configuracionIso.nombre ? configuracionIso.nombre.toUpperCase() :"", 130, y + 10, { width: 322, align: 'center' });
                        doc.font("Bookman", 9);
                        doc.text("Revisión:", 455, y + 10);
                        doc.text(configuracionIso ? configuracionIso.revicion : '', 496, y + 10);
                        y += 40;
                        doc.font("Helvetica-Bold", 10);
                        doc.text("´", 242, y+2);
                        doc.font("Bookman-Italic-Bold", 10);
                        doc.text("Codigo: ", 234, y);
                        doc.font("Bookman-Bold", 10);
                        doc.text(configuracionIso.codigo, 155, y, { width: 322, align: 'center' });
                        y -= 10;
                        doc.font("Bookman", 9);
                        doc.text("Fecha de Aprobación:", 455, y + 3);
                        y += 20;
                        doc.text(configuracionIso ? $scope.fechaATexto(configuracionIso.fecha_aprobacion) : '', 455, y - 3);
                        ////
                        y += 15;
                        doc.font("Bookman-Bold", 9);
                        doc.text("I. DATOS PERSONALES", 30, y + 3);
                        y += 20;
                        doc.lineWidth(1);
                        doc.rect(30, y - 6, 552, 50).stroke()
                        doc.font("Bookman", 9);
                        doc.text("NOMBRE Y APELLIDO:", 35, y);
                        doc.text(ficha.paciente.persona.nombre_completo, 140, y);
                        doc.font("Bookman", 9);
                        doc.text("TELF:", 360, y);
                        doc.font("Bookman", 9);
                        var tel = ficha.paciente.persona.telefono ? ficha.paciente.persona.telefono : ficha.paciente.persona.telefono_movil ? ficha.paciente.persona.telefono_movil : '';
                        if (tel.length>8)  tel = tel.split(/(\s+)/)[0];
                        doc.text(tel, 390, y);
                        doc.text("EDAD:", 452, y);
                        var edad = $scope.obtenerEdad(ficha.paciente.persona.fecha_nacimiento);
                        doc.text(edad, 485, y);
                        doc.text("SEXO:", 530, y);
                        doc.text(ficha.paciente.persona.genero.nombre_corto, 559, y);
                        y += 15;
                        doc.text("ESTILO DE VIDA:", 35, y);
                        let dots_ = ''
                        if (ficha.estilo_vida && ficha.estilo_vida.length > 220) {
                            dots_ = '...'
                        }
                        var estilo = ficha.estilo_vida ? (ficha.estilo_vida && ficha.estilo_vida).slice(0, 260) : "";
                        doc.text(estilo + dots_, 115, y, { width: 340 });
                        doc.text("Nº C.I.:", 452, y);
                        doc.text(ficha.paciente.persona.ci + ' ' + ficha.paciente.extension.nombre_corto, 490, y);
                        ///////
                        y += 32;
                        doc.font("Bookman-Bold", 9);
                        doc.text("II. DATOS LABORALES", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 85).stroke()
                        doc.font("Bookman", 9);
                        doc.text("EMPRESA:", 35, y);
                        doc.text(ficha.paciente.empresa.razon_social, 90, y);
                        doc.text("TELEFONO:", 240, y);
                        doc.text(ficha.paciente.empresa.telefono1, 300, y);
                        doc.text("AREA DE OPERACIONES:", 360, y);
                        doc.text(ficha.paciente.campo.nombre, 500, y);
                        y += 15;
                        doc.text("ACTIVIDADES LABORALES:", 35, y);
                        doc.text(ficha.cargos, 170, y);
                        y += 15;
                        var r = ficha.riesgo.split(',').map(rsgs => {
                            return rsgs.charAt(0).toUpperCase() + rsgs.slice(1).toLowerCase();
                        }).join(', ');
                        doc.text(r ? 'RIESGOS DE LOS PROCESOS DE TRABAJO: ' + r + '.' : 'RIESGOS DE LOS PROCESOS DE TRABAJO: ', 35, y, { width: 547 });
                        y += 40;
                        ///////map
                        y += 15;
                        doc.font("Bookman-Bold", 9);
                        doc.text("III. DATOS REFERENCIALES", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 50).stroke()
                        doc.font("Bookman-Bold", 9);
                        doc.text("EN CASO DE EMERGENCIA A QUE LUGAR Y CON QUIEN DEBE HABLAR PARA COMUNICAR:", 35, y);
                        y += 15;
                        doc.font("Bookman", 9);
                        doc.text("CIUDAD:", 35, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.direccion_ciudad ? ficha.personaReferencia.direccion_ciudad : '' : '', 85, y);
                        doc.text("ZONA:", 180, y);
                        if(ficha.personaReferencia){
                            if(ficha.personaReferencia.direccion_zona){
                                var zona = ficha.personaReferencia.direccion_zona.length>19 ? ficha.personaReferencia.direccion_zona.slice(0,19): ficha.personaReferencia.direccion_zona;
                            }
                            if(ficha.personaReferencia.direccion_localidad){
                                var localidad = ficha.personaReferencia.direccion_localidad.length > 34 ? ficha.personaReferencia.direccion_localidad.slice(0,34): ficha.personaReferencia.direccion_localidad;
                            }
                        }
                        doc.text(zona ? zona : '' , 212, y);
                        doc.text("CALLE/AVENIDA:", 300, y);
                        doc.text(localidad ? localidad : '', 382, y);
                        doc.text("Nº:", 536, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.direccion_numero ? ficha.personaReferencia.direccion_numero: '' : '', 550, y);
                        y += 15;
                        doc.text("TELEFONO:", 35, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.telefono ? ficha.personaReferencia.telefono: '' : '', 100, y);
                        doc.text("CELULAR:", 180, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.telefono_movil ? ficha.personaReferencia.telefono_movil: '' : '', 235, y);
                        doc.text("NOMBRE DE LA PERSONA:", 300, y);
                        doc.text(ficha.personaReferencia ? ficha.personaReferencia.nombres ? ficha.personaReferencia.nombres: '' : '', 425, y);
                        ///////
                        y += 20;
                        doc.font("Bookman-Bold", 9);
                        doc.text("IV. INDICADORES ESPECIFICOS", 30, y + 3);
                        y += 20;
                        doc.rect(30, y - 6, 552, 75).stroke()
                        doc.font("Bookman", 9);
                        doc.text("GRUPO SANGUÍNEO:", 35, y);
                        var tipo_sangineo = $scope.grupos_sanguineos.find(grupo => grupo.id === ficha.paciente.id_grupo_sanguineo)
                        var factor_rh = tipo_sangineo && (tipo_sangineo.nombre_corto.indexOf('+') > -1 ? 'POSITIVO' : 'NEGATIVO') || 'No Definido'
                        var tipo_ = tipo_sangineo.nombre_corto.replace(/\+|\-/, '')
                        doc.text('"' + tipo_.trim() + '"', 132, y);
                        doc.text('FACTOR RH: ' + factor_rh, 360, y);
                        y += 15;
                        doc.lineWidth(1);
                        doc.text("ES ALERGICO A:", 35, y);
                        doc.text('HUMO DE CIGARRILLO:', 115, y);
                        if (ficha.alergia_humo_cigarrillo) {
                            doc.rect(228, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(228, y + 2, 10, 7).stroke()
                        }
                        doc.text(' QUIMICOS:', 249, y);
                        if (ficha.alergia_quimico) {
                            doc.rect(307, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(307, y + 2, 10, 7).stroke()
                        }
                        doc.text('MEDICAMENTOS:', 325, y);
                        if (ficha.alergia_medicamento) {
                            doc.rect(410, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(410, y + 2, 10, 7).stroke()
                        }
                        doc.text('PLANTAS:', 443, y);
                        if (ficha.alergia_plantas) {
                            doc.rect(490, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(490, y + 2, 10, 7).stroke()
                        }
                        doc.text('POLVO:', 510, y);
                        if (ficha.alergia_polvo) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }
                        y += 15
                        doc.text(' ALGUN MATERIAL:', 135, y);
                        if (ficha.alergia_algun_material) {
                            doc.rect(228, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(228, y + 2, 10, 7).stroke()
                        }
                        doc.text('ALIMENTOS:', 245, y);
                        if (ficha.alergia_alimentos) {
                            doc.rect(307, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(307, y + 2, 10, 7).stroke()
                        }
                        doc.text('CONSERVAS:', 345, y);
                        if (ficha.alergia_conservas) {
                            doc.rect(410, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(410, y + 2, 10, 7).stroke()
                        }
                        doc.text('PICADURAS:', 430, y);
                        if (ficha.alergia_picadura) {
                            doc.rect(490, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(490, y + 2, 10, 7).stroke()
                        }
                        doc.text('OTROS:', 510, y);
                        if (ficha.alergia_otros) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }
                        y += 15
                        doc.text('ESPECIFIQUE EL PRODUCTO O ELEMENTO:', 35, y);
                        doc.text($scope.concatenarTextos(ficha.descripcion_indicadores, ficha.alergia_otros_comentario) || 'No refiere.', 245, y, { width: 335 });
                        ///////
                        y += 30;
                        doc.font("Bookman-Bold", 9);
                        doc.text("V. ANTECEDENTES DE ENFERMEDADES", 30, y + 3);
                        y += 20;
                        doc.lineWidth(1);
                        doc.rect(30, y - 6, 552, 155).stroke()
                        doc.font("Bookman", 9);
                        doc.text("USTED TIENE O HA ENFERMADO DE:", 35, y);
                        y += 15;
                        doc.lineWidth(1);
                        // doc.text("ES ALÉRGICO A:", 45, y);
                        doc.text('HIPERTENSIÓN', 35, y);
                        if (ficha.enfermedad_hipertension) {
                            doc.rect(113, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(113, y + 2, 10, 7).stroke()
                        }
                        doc.text('DIABETES', 137, y);
                        if (ficha.enfermedad_diabetes) {
                            doc.rect(195, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(195, y + 2, 10, 7).stroke()
                        }
                        doc.text('EPILEPSIA', 240, y);
                        if (ficha.enfermedad_epilepsia) {
                            doc.rect(296, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(296, y + 2, 10, 7).stroke()
                        }
                        doc.text('ASMA', 320, y);
                        if (ficha.enfermedad_asma) {
                            doc.rect(355, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(355, y + 2, 10, 7).stroke()
                        }
                        doc.text('CARDIOLOGICA', 380, y);
                        if (ficha.enfermedad_cardilogia) {
                            doc.rect(460, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(460, y + 2, 10, 7).stroke()
                        }
                        doc.text('DIGESTIVAS', 484, y);
                        if (ficha.enfermedad_digestiva) {
                            doc.rect(550, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(550, y + 2, 10, 7).stroke()
                        }

                        doc.font('Bookman-Italic', 9)
                        y += 15
                        doc.text('CHAGAS', 66, y);
                        if (ficha.enfermedad_chagas) {
                            doc.rect(113, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(113, y + 2, 10, 7).stroke()
                        }
                        doc.text('HEPATITIS', 136, y);
                        if (ficha.enfermedad_hepatitis) {
                            doc.rect(195, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(195, y + 2, 10, 7).stroke()
                        }
                        doc.text('LUMBALGIAS', 226, y);
                        if (ficha.enfermedad_lumbalgia) {
                            doc.rect(296, y + 2, 10, 7).fillAndStroke()
                        } else {
                            doc.rect(296, y + 2, 10, 7).stroke()
                        }
                        doc.font("Bookman", 9);

                        // doc.text('OTROS:', 600, y);
                        // if (ficha.alergia_otros) {
                        //     doc.rect(640, y, 6, 6).fillAndStroke()
                        // } else {
                        //     doc.rect(640, y, 6, 6).stroke()
                        // }
                        y += 15
                        doc.text('OTRAS ENFERMEDADES:', 35, y);
                        // y+=20
                        var otrasEnfermedades = ''
                        if(ficha.enfermedad_otros){
                            if(ficha.descripcion_antecedentes) otrasEnfermedades += ficha.descripcion_antecedentes;
                            if(ficha.enfermedad_comentario) otrasEnfermedades += ', '+ficha.enfermedad_comentario
                        }else{
                            if(ficha.descripcion_antecedentes) otrasEnfermedades += ficha.descripcion_antecedentes;
                        }
                        otrasEnfermedades = (otrasEnfermedades ? otrasEnfermedades.length < 160 ? otrasEnfermedades : otrasEnfermedades.slice(0, 160) + '...' : '')
                        doc.text(otrasEnfermedades || 'No.', 155, y, { width: 425 });
                        y += 12 * 2
                        doc.text('DETALLE LA ENFERMEDAD, DESDE CUANDO, SI RECIBIO TRATAMIENTO O ESTA EN TRATAMIENTO, QUE MEDICAMENTO TOMA, Y SI SE SIENTE BIEN CON EL TRATAMIENTO:', 35, y, { width: 522 });
                        let tratamiento = ""
                        if (ficha.tratamiento) {
                            tratamiento = (ficha.tratamiento.length < 460 ? ficha.tratamiento : ficha.tratamiento.slice(0, 460) + '...')
                        }
                        doc.text(tratamiento, 35, y + 20, { width: 545 });
                        y += 17 * 4
                        var ultima_consulta = ficha.consultas && ficha.consultas[0] || { indice_masa_corporal: '  ', peso: '  ', talla: '  ', frecuencia_cardiaca: '  ', presion: '  ' }
                        doc.text('|PA:', 40, y);
                        doc.text(ultima_consulta.presion ? ultima_consulta.presion + ' mmHg': '  mmHg', 60, y);
                        doc.text('|FC:', 170, y);
                        doc.text(ultima_consulta.frecuencia_cardiaca ? ultima_consulta.frecuencia_cardiaca + ' x min.' : '  x min.', 193, y);
                        doc.text('|T:', 293, y);
                        doc.text(ultima_consulta.talla ? ultima_consulta.talla + ' cm.' : '  cm.', 309, y);
                        doc.text('|P:', 410, y);
                        doc.text(ultima_consulta.peso ? ultima_consulta.peso + ' Kg.': ' ' + ' Kg.', 429, y);
                        doc.text('|IMC:', 520, y);
                        doc.text(ultima_consulta.indice_masa_corporal ? ultima_consulta.indice_masa_corporal : '  ', 548, y);
                        ///////
                        doc.lineWidth(1);
                        y += 18;
                        doc.font("Bookman-Bold", 9);
                        doc.text("VI. ANTECEDENTES QUIRURGICOS", 30, y + 3);
                        y += 20;
                        doc.font("Bookman", 9);
                        doc.rect(30, y - 6, 552, 53).stroke()
                        doc.lineWidth(1);
                        doc.rect(165, y - 1, 12, 10).stroke()
                        doc.text("USTED HA SIDO OPERADO: ", 35, y);
                        doc.font("Bookman", 8);
                        doc.text(ficha.quirurgico_operado && 'Si' || 'No', 166, y- 0.1);
                        doc.font("Bookman", 9);
                        y += 12;
                        doc.text("ALGUN COMENTARIO:", 35, y);
                        let comentario =    ficha.quirurgico_descripcion ? 
                                            ficha.quirurgico_comentario ? 
                                            ficha.quirurgico_descripcion+ ', '+ficha.quirurgico_comentario: 
                                            ficha.quirurgico_descripcion : ficha.quirurgico_comentario ? ficha.quirurgico_comentario : '';
                        doc.text(comentario ? '                                     '+comentario : '', 35, y, { width: 545 });
                        y += 12;
                        doc.text('Fecha: ' + (ficha.fecha && $scope.formatoFechaPDF(ficha.fecha) || "Error."), 493, y + 30);
                        y += 100;
                        doc.rect(58, y - 5, 190, 0).stroke()
                        doc.font("Bookman-Bold", 9);
                        doc.text("NOMBRE Y FIRMA DEL MEDICO", 0, y-3, { width: 306, align: 'center' });
                        doc.rect(364, y - 5, 190, 0).stroke();
                        doc.text("NOMBRE Y FIRMA DEL TRABAJADOR", 306, y-3, { width: 306, align: 'center' });
                        y += 10;
                        doc.text("Página 1 de 1", 30, y, { width: 552, oblique: true, align: 'center' });
                        doc.font("Bookman-Bold", 9);
                        //doc.text("´", 30, y, { width: 509, oblique: true, align: 'center' });
                        doc.font('Bookman', 6).text('Creado: ' + $scope.formatoFechaHora(ficha.createdAt) + '      ' +'Actualizado: '+$scope.formatoFechaHora(ficha.updatedAt), 0, y+8,{width: 306, align: 'center'});
                        doc.font('Bookman', 6).text('Impreso: '+$scope.formatoFechaHora()+'       '+ 'Impreso por: ' + $scope.usuario.nombre_usuario, 306, y+8,{width: 306, align: 'center'});
                        //////
                        doc.end();
                        stream.on('finish', function () {
                            const fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        })
                        blockUI.stop();
                    }else{
                        SweetAlert.swal("", "No se pudo generar la ficha médica", "warning");
                    }
                }) 
            }
            $scope.diferenciaEntreDiasEnDias = function (a, b) {
                var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
                var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
            }

            $scope.concatenarTextos = function (texto1, texto2) {
                if (texto1 && texto2) {
                    return texto1 + ", " + texto2;
                } else if (texto1 && !texto2) {
                    return texto1;
                } else {
                    return texto2
                }
            }

            
            
            
            $scope.reportePacienteLaboratorioPdf = (id) => {
                GetPacienteLaboratorios(id, 0)
                .then(res => {
                    SweetAlert.swal({
                        title: 'Generando reporte ...',
                        icon: 'info',
                        iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;
                    if(res.error) return SweetAlert.swal("", res.message, res.messageType);
                    try {
                        if(res.data.pacienteLaboratorios.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado exámenes de laboratorio.", "info");
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let datos = res.data
                            var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                            var stream = doc.pipe(blobStream());
                            let titulo = "REPORTE DE LABORATORIO"
                            let paciente = datos.persona.nombre_completo ? datos.persona.nombre_completo.toUpperCase() : ""
                            let hoy = $scope.fechaATexto(new Date());
                            let metadata = "Usuario: "+$scope.usuario.nombre_usuario+"          "+"Fecha: "+ $scope.convertirFechaHora(new Date());
                            const laboratorios = Object.values(datos.pacienteLaboratorios.reduce((acc, { id_laboratorio, fecha, laboratorio, laboratorioResultados }) => {
                                if (!acc[id_laboratorio]) {
                                    let laboratorios = laboratorioResultados.map(e => { 
                                        e.fecha=fecha 
                                        return e
                                    } )
                                    acc[id_laboratorio] = { fecha, id_laboratorio, laboratorio, laboratorios };
                                } else {
                                    let laboratorios = laboratorioResultados.map(e=>{
                                        e.fecha=fecha 
                                        return e
                                    })
                                    acc[id_laboratorio].laboratorios = acc[id_laboratorio].laboratorios.concat(laboratorios);
                                }
                                return acc;
                            }, Object.create(null)));
                            var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(res.data.pacienteLaboratorios.length / itemsPerPage)
                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                            for (let i = 0; i < laboratorios.length; i++) {
                                const analisis = laboratorios[i];
								doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 8).text(analisis.laboratorio ? analisis.laboratorio.nombre: "", x, y + 4, { width:552, align: "center"})
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                }
                                const examenes = Object.values(analisis.laboratorios.reduce((acc, { id_laboratorio_examen, fecha, laboratorioExamen, resultado }) => {
                                    if (!acc[id_laboratorio_examen]) {
                                        acc[id_laboratorio_examen] = { laboratorioExamen, resultados: [ { fecha, resultado }] };
                                    } else {
                                        acc[id_laboratorio_examen].resultados.push({fecha, resultado})
                                    }
                                    return acc;
                                }, Object.create(null))); 
                                for (let j = 0; j < examenes.length; j++) {
                                    const { laboratorioExamen:examen, resultados} = examenes[j];
                                    doc.font("Helvetica-Bold", 7).text(examen ? examen.examen : "", 90, y + 4, { width:552 })
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                    doc.lineWidth(0.1).rect( 130, y + 13, 400, 0).stroke()
                                    doc.font("Helvetica-Bold", 7)
                                    doc.text("FECHA",130, y + 4, { align: "center", width: 50})
                                    doc.text("RESULTADO ANTERIOR", 180, y + 4, { align:"center", width: 100})
                                    doc.text("RESULTADO ACTUAL", 280, y + 4, { align: "center", width: 100})
                                    doc.text("VALOR DE REFERENCIA", 380, y + 4, { align: "center", width: 150}) 
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                    for (let k = 0; k < resultados.length; k++) {
                                        const resultado = resultados[k];
                                        let unidad = examen ? examen.minimo && examen.maximo ? examen.unidad ? examen.unidad : "": "" : ""
                                        doc.font("Helvetica", 7)
                                        doc.text( resultado.fecha ? $scope.fechaATexto(resultado.fecha) : "" ,130, y + 4, { align: "center", width: 50})
                                        if(k > 0) doc.text( resultados[k-1].resultado ? (unidad ? resultados[k-1].resultado+ " "+ unidad : resultado.resultado): "" ,180, y + 4, { align: "center", width: 100})
                                        doc.text( resultado.resultado ? (unidad ? resultado.resultado+ " "+ unidad : resultado.resultado): "" ,280, y + 4, { align: "center", width: 100})
                                        doc.text( examen ? examen.minimo && examen.maximo ? (examen.minimo+" "+ unidad +" - "+examen.maximo+" "+unidad ): "" : "" ,380, y + 4, { align: "center", width: 150})
                                        y += 15, items++;
                                        if(items === itemsPerPage){
                                            x = 40, y=95, items=0, page++
										    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                        }
                                    }                                   
                                }
                            }
                            doc.end();
                            stream.on('finish', function () {
                                SweetAlert.swal({
                                    title: 'Finalizado!',
                                    icon: 'success',
                                    timer: 1200,
                                    showConfirmButton: false
                                })
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    } catch (e) {
                        return SweetAlert.swal("", e, "error");
                    }
                })
            } 
            $scope.reportePacienteLaboratorioXlsx = (id) => {
                GetPacienteLaboratorios(id, 0)
                .then( ({error, data:datos, message, messageType }) => {
                    if(error) return SweetAlert.swal("", message, messageType);
                    try {
                        if(datos.pacienteLaboratorios.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado exámenes de laboratorio.", "info");
                        let data = [["EMPLEADO", "CI", "FECHA", "LABORATORIO", "EXAMEN","RESULTADO ANTERIOR", "RESULTADO ACTUAL", "UNIDAD", "VALOR DE REFERENCIA"]]
                        let laboratorios = Object.values(datos.pacienteLaboratorios.reduce((acc, { fecha, laboratorio, laboratorioResultados, id_laboratorio }) => {
                            if(!acc[id_laboratorio]){
                                let analisis = laboratorioResultados.map(e =>{ 
                                    e.fecha = fecha
                                    return e
                                })
                                acc[id_laboratorio] = { laboratorio, analisis }
                            }else{
                                let analisis = laboratorioResultados.map(e => {
                                    e.fecha= fecha
                                    return e
                                })
                                acc[id_laboratorio].analisis = acc[id_laboratorio].analisis.concat(analisis)
                            }
                            return acc;
                        }, {})                        )
                        for (let o = 0; o < laboratorios.length; o++) {
                            const labo = laboratorios[o];
                            let resultados = Object.values(labo.analisis.reduce( (acc, { id_laboratorio_examen, laboratorioExamen:examen, resultado,fecha, }) => {
                                if(!acc[id_laboratorio_examen]){
                                    acc[id_laboratorio_examen] = { examen, resultados: [ { resultado, fecha}] }
                                }else{
                                    acc[id_laboratorio_examen].resultados.push({ resultado, fecha})
                                }
                                return acc
                            }, {})) 
                            for (let i = 0; i < resultados.length; i++) {
                                const resultado = resultados[i];
                                let exm = resultado.examen;
                                let uni = exm ? exm.unidad : ""
                                let min = exm ? exm.minimo :""
                                let max = exm ? exm.maximo :""
                                for (let j = 0; j < resultado.resultados.length; j++) {
                                    const resul = resultado.resultados[j];
                                    data.push([
                                        datos.persona ? datos.persona.nombre_completo : "",
                                        datos.persona ? datos.persona.ci : "",
                                        resul.fecha ? $scope.fechaATexto(resul.fecha): "",
                                        labo.laboratorio ? labo.laboratorio.nombre : "",
                                        exm ? exm.examen : "",
                                        j === 0 ? "" : resultado.resultados[j-1].resultado,
                                        resul.resultado ? resul.resultado : "",
                                        uni,
                                        min && max ? uni ?  (min+" "+uni +" - "+max+" "+uni) : min +" - "+max : ""
      
                                      ])
                                }
                            }
                        }

                        let ws_name = "SheetJS";
                        let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                        /* add worksheet to workbook */
                        wb.SheetNames.push(ws_name);
                        wb.Sheets[ws_name] = ws;
                        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte Laboratorios paciente.xlsx");
                        blockUI.stop();
                    } catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }
                })
            }
            $scope.headerPdfLaboratoriosPaciente = (doc, logo, titulo, hoy, paciente, page, pages, metadata) => {
                try {
					if (logo.length > 0 && logo !== "error") {
						if (logo) {
							doc.image(logo, 47, 33, { fit: [78, 45] }); 
						}
					}
					doc.lineWidth(0.5)
					doc.rect(40, 30, 552, 50).stroke();
					doc.rect(130, 30, 0, 50).stroke();
					doc.rect(482, 30, 0, 50).stroke();
	
					doc.font('Helvetica-Bold', 10);
					doc.text(titulo, 0, 40, { align: "center" });
					doc.font('Helvetica-Bold', 9);
					doc.text(paciente, 0, 53, { align: "center" });
					doc.font('Helvetica-Bold', 8);
					//doc.text("Del "+ desde +" al "+ hasta, 0, 65, { align: "center" });
					doc.text("FECHA DE IMPRESIÓN", 482, 40, { align: "center", width: 110});
					doc.font('Helvetica', 8);
					doc.text($scope.fechaATexto(hoy), 482, 65, { align: "center", width: 110 });
					doc.font('Helvetica-Bold', 7).text("Página "+page, 0, 740, { align: 'center'})
					doc.font('Helvetica', 6).text(metadata, 0, 755, { align: 'center'})
				} catch (e) {
					console.error('Error al generar pdf...',e);
					return SweetAlert.swal("", "Ocurrió un error al generar pdf..."+e, "warning");
				}
            }
            $scope.reportePorLaboratorioPacientePdf = (id_paciente, id_laboratorio) => {
                if(!(id_paciente && id_laboratorio)) return SweetAlert.swal("", "Parámetros incorrectos","error");
                SweetAlert.swal({
                    title: 'Generando reporte ...',
                    icon: 'info',
                    iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                GetPacienteLaboratorios(id_paciente, id_laboratorio)
                .then( ({ error, data, message, messageType}) => {
                    if(error) return SweetAlert.swal("", message, messageType);
                    try {
                        if(data.pacienteLaboratorios.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado exámenes.", "info");
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let datos = data.pacienteLaboratorios.map(({ fecha, laboratorioResultados } ) => {
                                for (let i = 0; i < laboratorioResultados.length; i++) {
                                    laboratorioResultados[i].fecha = fecha
                                }
                                return laboratorioResultados
                            })
                            let analisis = Object.values(datos.flat().reduce((acc, { id_laboratorio_examen, fecha, resultado, laboratorioExamen }) =>{
                                if(!acc[id_laboratorio_examen]){
                                    acc[id_laboratorio_examen] = { laboratorioExamen, resultados: [{ fecha, resultado }] }
                                }else{
                                    acc[id_laboratorio_examen].resultados.push({ fecha, resultado });
                                }
                                return acc;
                            }, {}))
                            var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                            var stream = doc.pipe(blobStream());
                            let titulo = data.pacienteLaboratorios[0].laboratorio ? "REPORTE DE LABORATORIO "+ data.pacienteLaboratorios[0].laboratorio.nombre:"REPORTE DE LABORATORIO"
                            let paciente = data.persona.nombre_completo ? data.persona.nombre_completo.toUpperCase() : ""
                            let hoy = $scope.fechaATexto(new Date());
                            let metadata = "Usuario: "+$scope.usuario.nombre_usuario+"          "+"Fecha: "+ $scope.convertirFechaHora(new Date());
                            var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(data.pacienteLaboratorios.length / itemsPerPage)
                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                            for (let i = 0; i < analisis.length; i++) {
                                const { resultados, laboratorioExamen } = analisis[i];
                                let nombre = laboratorioExamen ? laboratorioExamen.examen : null;
                                let min = laboratorioExamen ? laboratorioExamen.minimo : null;
                                let max = laboratorioExamen ? laboratorioExamen.maximo : null;
                                let uni = laboratorioExamen ? laboratorioExamen.unidad : null;
								doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 8).text( nombre ? nombre : "", x + 5, y + 4, { width:547, })
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                } 
                                doc.lineWidth(0.1).rect( 130, y + 13, 400, 0).stroke()
                                doc.font("Helvetica-Bold", 7)
                                doc.text("FECHA",130, y + 4, { align: "center", width: 50})
                                doc.text("RESULTADO ANTERIOR", 180, y + 4, { align:"center", width: 100})
                                doc.text("RESULTADO ACTUAL", 280, y + 4, { align: "center", width: 100})
                                doc.text("VALOR DE REFERENCIA", 380, y + 4, { align: "center", width: 150}) 
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                }
                                for (let k = 0; k < resultados.length; k++) {
                                    const { resultado, fecha } = resultados[k];
                                    doc.font("Helvetica", 7)
                                    doc.text( fecha ? $scope.fechaATexto(fecha) : "" ,130, y + 4, { align: "center", width: 50})
                                    if(k > 0) doc.text( resultados[k-1].resultado ? (uni ? resultados[k-1].resultado+ " "+ uni : resultado): "" ,180, y + 4, { align: "center", width: 100})
                                    doc.text( resultado ? (uni ? resultado+ " "+ uni : resultado): "" ,280, y + 4, { align: "center", width: 100})
                                    doc.text( min && max ? (min+" "+ uni +" - "+max+" "+uni ): "",380, y + 4, { align: "center", width: 150})
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                }                                   
                            }
                            doc.end();
                            stream.on('finish', function () {
                                SweetAlert.swal({
                                    title: 'Finalizado!',
                                    icon: 'success',
                                    timer: 1200,
                                    showConfirmButton: false
                                })
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    } catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }

                })
            }
            $scope.reporteConsultasPacienteExcel = (id) => {
                if(!id) return SweetAlert.swal("", "Parámetros incorrectos","error");
                try {
                    ObtenerConsultasPaciente(id)
                    .then(({error, data, message, messageType}) => {
                        if(error) return SweetAlert.swal("", message, messageType);
                        const { persona, consultas } = data
                        if(consultas.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado consultas.", "info");
                        let matriz = [["EMPLEADO", "CI", "FECHA", "PRESIÓN", "PULSO", "TALLA", "PESO", "TEMPERATURA", "FRECUENCIA RESPIRATORIA", "FRECUENCIA CARDIACA", "INDICE DE MASA MUSCULAR", "SOAP SUBJETIVO", "SOAP OBJETIVO", "SOAP ANALITICO", "SOAP PLANES", "SOAP EVOLUCIÓN", "REVISIÓN SISTEMA CARDIOVASCULAR", "REVISIÓN SISTEMA RESPIRATORIA", "REVISIÓN SISTEMA GASTROINTESTINAL", "REVISIÓN SISTEMA GENITOURINARIO", "REVISIÓN SISTEMA LOCOMOTOR", "REVISIÓN SISTEMA PIEL Y FANERAS"]]
                        for (let i = 0; i < consultas.length; i++) {
                            const {fecha, presion, pulso, talla, peso, temperatura, frecuencia_respiratoria, frecuencia_cardiaca, indice_masa_corporal, subjetivo, objetivo, analitico, plan, evolucion, cardiovascular, respiratorio, gastrointestinal, genitourinario, locomotor, piel } = consultas[i];
                            matriz.push([
                                persona ? persona.nombre_completo : "",
                                persona ? persona.ci : "",
                                fecha ? $scope.fechaATexto(fecha) : "",
                                presion ? presion : "",
                                pulso ? pulso : "",
                                talla ? talla : "",
                                peso ? peso : "",
                                temperatura ? temperatura : "",
                                frecuencia_respiratoria ? frecuencia_respiratoria : "",
                                frecuencia_cardiaca ? frecuencia_cardiaca : "",
                                indice_masa_corporal ? indice_masa_corporal : "",
                                subjetivo ? subjetivo : "",
                                objetivo ? objetivo : "",
                                analitico ? analitico : "",
                                plan ? plan : "",
                                evolucion ? evolucion : "",
                                cardiovascular ? cardiovascular : "", 
                                respiratorio ? respiratorio : "",
                                gastrointestinal ? gastrointestinal : "",
                                genitourinario ? genitourinario : "",
                                locomotor ? locomotor : "",
                                piel ? piel : ""

                            ])
                        }
                        let ws_name = "SheetJS";
                        let wb = new Workbook(), ws = sheet_from_array_of_arrays(matriz);
                        /* add worksheet to workbook */
                        wb.SheetNames.push(ws_name);
                        wb.Sheets[ws_name] = ws;
                        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte de consultas paciente.xlsx");
                        blockUI.stop();
                    })
                } catch (e) {
                    SweetAlert.swal("", "Error al obtener consultas del paciente<br>"+e,"error");
                }
            }
            $scope.reportePacienteDiagnosticoPdf = (id) => {
                GetPacienteDiagnosticos(id, 0)
                .then(res => {
                    SweetAlert.swal({
                        title: 'Generando reporte ...',
                        icon: 'info',
                        iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    SweetAlert.showLoading()
                    blockUI.noOpen = true;
                    if(res.error) return SweetAlert.swal("", res.message, res.messageType);
                    try {
                        if(res.data.diagnosticos.length < 1 ) return SweetAlert.swal("", "El paciente no diagnósticos registrados", "info");
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let datos = res.data
                            var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                            var stream = doc.pipe(blobStream());
                            let titulo = "REPORTE DE DIAGNÓSTICOS"
                            let paciente = datos.persona.nombre_completo ? datos.persona.nombre_completo.toUpperCase() : ""
                            let hoy = $scope.fechaATexto(new Date());
                            let metadata = "Usuario: "+$scope.usuario.nombre_usuario+"          "+"Fecha: "+ $scope.convertirFechaHora(new Date());
                            const diagnosticos = Object.values(datos.diagnosticos.reduce((acc, { id_diagnostico, fecha, diagnostico, diagnosticoResultados }) => {
                                if (!acc[id_diagnostico]) {
                                    let diagnosticos = diagnosticoResultados.map(e => { 
                                        e.fecha=fecha 
                                        return e
                                    } )
                                    acc[id_diagnostico] = { fecha, id_diagnostico, diagnostico, diagnosticos };
                                } else {
                                    let diagnosticos = diagnosticoResultados.map(e=>{
                                        e.fecha=fecha 
                                        return e
                                    })
                                    acc[id_diagnostico].diagnosticos = acc[id_diagnostico].diagnosticos.concat(diagnosticos);
                                }
                                return acc;
                            }, Object.create(null)));
                            var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(res.data.diagnosticos.length / itemsPerPage)
                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                            for (let i = 0; i < diagnosticos.length; i++) {
                                const prueba = diagnosticos[i];
								doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 8).text(prueba.diagnostico ? prueba.diagnostico.nombre: "", x, y + 4, { width:552, align: "center"})
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                }
                                const examenes = Object.values(prueba.diagnosticos.reduce((acc, { id_diagnostico_examen, fecha, diagnosticoExamen, resultado, estadistica }) => {
                                    if (!acc[id_diagnostico_examen]) {
                                        acc[id_diagnostico_examen] = { diagnosticoExamen, resultados: [ { fecha, resultado, estadistica }] };
                                    } else {
                                        acc[id_diagnostico_examen].resultados.push({fecha, resultado, estadistica})
                                    }
                                    return acc;
                                }, Object.create(null))); 
                                for (let j = 0; j < examenes.length; j++) {
                                    const { diagnosticoExamen:examen, resultados, estadistica } = examenes[j];
                                    doc.font("Helvetica-Bold", 7).text(examen ? examen.examen ? examen.examen.toUpperCase() : "" : "", 65, y + 4, { width:552 })
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                    doc.lineWidth(0.1).rect( 90, y + 11, 480, 0).stroke()
                                    doc.font("Helvetica-Bold", 7)
                                    doc.text("FECHA",90, y + 4, { align: "center", width: 50})
                                    doc.text("RESULTADO ANTERIOR", 140, y + 4, { align:"center", width: 100})
                                    doc.text("RESULTADO ACTUAL", 240, y + 4, { align: "center", width: 100})
                                    doc.text("VALOR DE REFERENCIA", 340, y + 4, { align: "center", width: 150}) 
                                    doc.text("ESTADÍSTICA", 490, y + 4, { align: "center", width: 80}) 
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                    for (let k = 0; k < resultados.length; k++) {
                                        const resultado = resultados[k];
                                        let unidad = examen ? examen.minimo && examen.maximo ? examen.unidad ? examen.unidad : "": "" : ""
                                        doc.font("Helvetica", 7)
                                        doc.text( resultado.fecha ? $scope.fechaATexto(resultado.fecha) : "" , 90, y + 4, { align: "center", width: 50})
                                        if(k > 0) doc.text( resultados[k-1].resultado ? (unidad ? resultados[k-1].resultado+ " "+ unidad : resultado.resultado): "" ,140, y + 4, { align: "center", width: 100})
                                        doc.text( resultado.resultado ? (unidad ? resultado.resultado+ " "+ unidad : resultado.resultado): "" ,240, y + 4, { align: "center", width: 100})
                                        doc.text( examen ? examen.minimo && examen.maximo ? (examen.minimo+" "+ unidad +" - "+examen.maximo+" "+unidad ): "" : "" ,340, y + 4, { align: "center", width: 150})
                                        doc.text( resultado.estadistica ? resultado.estadistica : "" , 490, y + 4, { align: "center", width: 80})
                                        y += 15, items++;
                                        if(items === itemsPerPage){
                                            x = 40, y=95, items=0, page++
										    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                        }
                                    }                                   
                                }
                            }
                            doc.end();
                            stream.on('finish', function () {
                                SweetAlert.swal({
                                    title: 'Finalizado!',
                                    icon: 'success',
                                    timer: 1200,
                                    showConfirmButton: false
                                })
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    } catch (e) {
                        return SweetAlert.swal("", e, "error");
                    }
                })
            } 
            $scope.reportePacienteDiagnosticoXlsx = (id) => {
                GetPacienteDiagnosticos(id, 0)
                .then( ({error, data:datos, message, messageType }) => {
                    console.log(datos);
                    if(error) return SweetAlert.swal("", message, messageType);
                    try {
                        if(datos.diagnosticos.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado exámenes de laboratorio.", "info");
                        let data = [["EMPLEADO", "CI", "FECHA", "DIAGNOSTICO", "EXAMEN","RESULTADO ANTERIOR", "RESULTADO ACTUAL", "ESTADISTICA", "VALOR DE REFERENCIA"]]
                        let diagnost = Object.values(datos.diagnosticos.reduce((acc, { fecha, diagnostico, diagnosticoResultados, id_diagnostico }) => {
                            if(!acc[id_diagnostico]){
                                let prueba = diagnosticoResultados.map(e =>{ 
                                    e.fecha = fecha
                                    return e
                                })
                                acc[id_diagnostico] = { diagnostico, prueba }
                            }else{
                                let prueba = diagnosticoResultados.map(e => {
                                    e.fecha= fecha
                                    return e
                                })
                                acc[id_diagnostico].prueba = acc[id_diagnostico].prueba.concat(prueba)
                            }
                            return acc;
                        }, {})                        )
                        for (let o = 0; o < diagnost.length; o++) {
                            const diag = diagnost[o];
                            console.log('diag', diag);
                            let resultados = Object.values(diag.prueba.reduce( (acc, { id_diagnostico_examen, diagnosticoExamen:examen, resultado,fecha, }) => {
                                if(!acc[id_diagnostico_examen]){
                                    acc[id_diagnostico_examen] = { examen, resultados: [ { resultado, fecha}] }
                                }else{
                                    acc[id_diagnostico_examen].resultados.push({ resultado, fecha})
                                }
                                return acc
                            }, {})) 
                            for (let i = 0; i < resultados.length; i++) {
                                const resultado = resultados[i];
                                let exm = resultado.examen;
                                let uni = exm ? exm.unidad : ""
                                let min = exm ? exm.minimo :""
                                let max = exm ? exm.maximo :""
                                for (let j = 0; j < resultado.resultados.length; j++) {
                                    const resul = resultado.resultados[j];
                                    data.push([
                                        datos.persona ? datos.persona.nombre_completo : "",
                                        datos.persona ? datos.persona.ci : "",
                                        resul.fecha ? $scope.fechaATexto(resul.fecha): "",
                                        diag.diagnostico ? diag.diagnostico.nombre : "",
                                        exm ? exm.examen : "",
                                        j === 0 ? "" : resultado.resultados[j-1].resultado,
                                        resul.resultado ? resul.resultado : "",
                                        resul.estadistica ? resul.estadistica : "",
                                        min && max ? uni ?  (min+" "+uni +" - "+max+" "+uni) : min +" - "+max : ""
      
                                      ])
                                }
                            }
                        }

                        let ws_name = "SheetJS";
                        let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                        /* add worksheet to workbook */
                        wb.SheetNames.push(ws_name);
                        wb.Sheets[ws_name] = ws;
                        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte de diagnosticos paciente.xlsx");
                        blockUI.stop();
                    } catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }
                })
            }
            $scope.reportePorDiagnosticoPacientePdf = (id_paciente, id_diagnostico) => {

                if(!(id_paciente && id_diagnostico)) return SweetAlert.swal("", "Parámetros incorrectos","error");
                SweetAlert.swal({
                    title: 'Generando reporte ...',
                    icon: 'info',
                    iconHtml:'<i class="fa fa-file-pdf-o size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                GetPacienteDiagnosticos(id_paciente, id_diagnostico)
                .then( ({ error, data, message, messageType}) => {
                    if(error) return SweetAlert.swal("", message, messageType);
                    try {
                        if(data.diagnosticos.length < 1 ) return SweetAlert.swal("", "El paciente no tiene registrado exámenes.", "info");
                        convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (logo) {
                            let datos = data.diagnosticos.map(({ fecha, diagnosticoResultados } ) => {
                                    for (let i = 0; i < diagnosticoResultados.length; i++) {
                                        diagnosticoResultados[i].fecha = fecha
                                    }
                                    return diagnosticoResultados
                            })
                            let pruebas = Object.values(datos.flat().reduce((acc, { id_diagnostico_examen, fecha, resultado, diagnosticoExamen, estadistica }) =>{
                                if(!acc[id_diagnostico_examen]){
                                    acc[id_diagnostico_examen] = { diagnosticoExamen, resultados: [{ fecha, resultado, estadistica }] }
                                }else{
                                    acc[id_diagnostico_examen].resultados.push({ fecha, resultado, estadistica });
                                }
                                return acc;
                            }, {}))
                            var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 }); //{compress: false},
                            var stream = doc.pipe(blobStream());
                            let titulo = data.diagnosticos[0].diagnostico ? "REPORTE DE LABORATORIO "+ data.diagnosticos[0].diagnostico.nombre:"REPORTE DE LABORATORIO"
                            let paciente = data.persona.nombre_completo ? data.persona.nombre_completo.toUpperCase() : ""
                            let hoy = $scope.fechaATexto(new Date());
                            let metadata = "Usuario: "+$scope.usuario.nombre_usuario+"          "+"Fecha: "+ $scope.convertirFechaHora(new Date());
                            var x = 40, y=95, items=0, itemsPerPage=42, page=1, pages=Math.ceil(pruebas.length / itemsPerPage)
                            $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                            for (let i = 0; i < pruebas.length; i++) {
                                const { resultados, diagnosticoExamen } = pruebas[i];
                                let nombre = diagnosticoExamen ? diagnosticoExamen.examen : null;
                                let min = diagnosticoExamen ? diagnosticoExamen.minimo : null;
                                let max = diagnosticoExamen ? diagnosticoExamen.maximo : null;
                                let uni = diagnosticoExamen ? diagnosticoExamen.unidad : null;
								doc.rect(x, y, 552, 15).fill('#95BED3').fillColor('#000').font('Helvetica-Bold', 8).text( nombre ? nombre.toUpperCase() : "", x + 5, y + 4, { width:547, })
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                } 
                                doc.lineWidth(0.1).rect( 90, y + 13, 480, 0).stroke()
                                doc.font("Helvetica-Bold", 7)
                                doc.text("FECHA",90, y + 4, { align: "center", width: 50})
                                doc.text("RESULTADO ANTERIOR", 140, y + 4, { align:"center", width: 100})
                                doc.text("RESULTADO ACTUAL", 240, y + 4, { align: "center", width: 100})
                                doc.text("VALOR DE REFERENCIA", 340, y + 4, { align: "center", width: 150}) 
                                doc.text("ESTADÍSTICA", 490, y + 4, { align: "center", width: 80}) 
                                y += 15, items++;
                                if(items === itemsPerPage){
                                    x = 40, y=95, items=0, page++
                                    doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                    $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                }
                                for (let k = 0; k < resultados.length; k++) {
                                    const { resultado, fecha, estadistica } = resultados[k];
                                    doc.font("Helvetica", 7)
                                    doc.text( fecha ? $scope.fechaATexto(fecha) : "" ,90, y + 4, { align: "center", width: 50})
                                    if(k > 0) doc.text( resultados[k-1].resultado ? (uni ? resultados[k-1].resultado+ " "+ uni : resultado): "" ,140, y + 4, { align: "center", width: 100})
                                    doc.text( resultado ? (uni ? resultado+ " "+ uni : resultado): "" ,240, y + 4, { align: "center", width: 100})
                                    doc.text( min && max ? (min+" "+ uni +" - "+max+" "+uni ): "",340, y + 4, { align: "center", width: 150})
                                    doc.text( estadistica ? estadistica : "",490, y + 4, { align: "center", width: 80})
                                    y += 15, items++;
                                    if(items === itemsPerPage){
                                        x = 40, y=95, items=0, page++
                                        doc.addPage({ compress: false, size: 'letter', margin: 10 });
                                        $scope.headerPdfLaboratoriosPaciente(doc, logo, titulo, hoy, paciente, page, pages, metadata);
                                    }
                                }                                   
                            }
                            doc.end();
                            stream.on('finish', function () {
                                SweetAlert.swal({
                                    title: 'Finalizado!',
                                    icon: 'success',
                                    timer: 1200,
                                    showConfirmButton: false
                                })
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        })
                    } catch (e) {
                        return SweetAlert.swal("", "<b>Ocurrió un error al generar reporte</b><br>"+e, "error");
                    }

                })
            }

            // MODAL REPORTE LABORATORIOS
            $scope.abrirReportesLaboratorios = () => {
                $scope.ObtenerMedicoLaboratorios({ id_empresa: $scope.usuario.id_empresa })
                $scope.filtroLabo = { empleado: "0", estado: "0", grupo_sanguineo: "0" }
                $scope.abrirPopup($scope.idModalReporteLaboratorios);
            }
            $scope.cerrarDialogReporteLaboratorios = () => {
                $scope.cerrarPopup($scope.idModalReporteLaboratorios);
                $scope.filtroLabo = {}
            }
            $scope.generarReporteGeneralLaboratoriosPdf = () => {

            }
            $scope.generarReporteGeneralLaboratoriosXlsx = (filtro) => {
                if(!(filtro )) return SweetAlert.swal("", "Parámetros incorrectos", "error");
                GetDataReporteGeneralPacientes(filtro, $scope.usuario.id_empresa, 2, 1)
                    .then(res=>{
                        if(!res.error){
                            if(res.data.length == 0 ){
                                blockUI.stop();
                                return SweetAlert.swal("", "No se encontraron registros", "warning");
                            }
                            let datos = [["NOMBRES Y APELLIDOS", "CI","ESTADO", "CARGO", "CAMPO", "FECHA", "LABORATORIO", "EXAMEN","RESULTADO ANTERIOR", "RESULTADO ACTUAL", "UNIDAD", "VALOR DE REFERENCIA"]]
                            let prev = ""
                            for (let i = 0; i < res.data.length; i++) {
                                const { nombre_completo, ci, extension, eliminado, cargo, campo, fecha, laboratorio, examen, resultado, unidad, minimo, maximo } = res.data[i];
                                datos.push([
                                    nombre_completo,
                                    ci+ " "+ extension,
                                    eliminado ? "INACTIVO" : "ACTIVO",
                                    cargo,
                                    campo,
                                    $scope.fechaATexto(fecha),
                                    laboratorio,
                                    examen,
                                    examen === prev ?  res.data[i-1].resultado : "",
                                    resultado ? resultado : "",
                                    unidad ? unidad : "",
                                    minimo && maximo ? unidad ? minimo+unidad+" - "+maximo+unidad : minimo + " - "+maximo : ""
                                ])
                                prev=examen
                            }
                            let ws_name = "SheetJS";
                            let wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
                            wb.SheetNames.push(ws_name);
                            wb.Sheets[ws_name] = ws;
                            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "reporte general de laboratorios.xlsx");
                            blockUI.stop();
                        }else{
                            blockUI.stop();
                            SweetAlert.swal("", res.message, "error"); 
                        }
                    })
            }

            // MODAL REPORTE CONSULTAS
            $scope.abrirReportesConsultas = () => {
                $scope.filtroCons = { empleado: "0", estado: "0", grupo_sanguineo: "0" }
                $scope.abrirPopup($scope.idModalReporteConsultas);
            }
            $scope.cerrarDialogReporteConsultas = () => {
                $scope.cerrarPopup($scope.idModalReporteConsultas);
                $scope.filtroCons = {}
            }
            $scope.generarReporteGeneralConsultasXlsx = (filtro) => {
                if(!(filtro )) return SweetAlert.swal("", "Parámetros incorrectos", "error");
                GetDataReporteGeneralPacientes(filtro, $scope.usuario.id_empresa, 2, 2)
                    .then(res=>{
                        if(!res.error){
                            if(res.data.length == 0 ){
                                blockUI.stop();
                                return SweetAlert.swal("", "No se encontraron registros", "warning");
                            }
                            let datos = [["NOMBRES Y APELLIDOS", "CI","ESTADO", "CARGO", "CAMPO", "FECHA", "PRESIÓN", "PULSO","TALLA", "PESO", "TEMPERATURA", "FRECUENCIA RESPIRATORIA", "FRECUENCIA CARDÍACA", "ÍNDICE DE MASA MUSCULAR", "SOAP SUBJETIVO", "SOAP OBJETIVO", "SOAP ANALÍTICO", "SOAP PLANES", "SOAP EVOLUCIÓN", "REVISIÓN SISTEMA NERVIOSO CENTRAL","REVISIÓN SISTEMA OJOS, OÍDO, NARÍZ Y GARGANTA", "REVISIÓN SISTEMA CARDIOVASCULAR", "REVISIÓN SISTEMA RESPIRATORIO", "REVISIÓN SISTEMA GASTROINSTESTINAL", "REVISIÓN SISTEMA GENITOURINARIO", "REVISIÓN SISTEMA LOCOMOTOR", "REVISIÓN SISTEMA PIEL Y FANERAS"]]
                            for (let i = 0; i < res.data.length; i++) {
                                const { analitico, cardiovascular, cargo, ci, evolucion, fecha, frecuencia_cardiaca, frecuencia_respiratoria, gastrointestinal, genitourinario, indice_masa_corporal,locomotor, nervioso_central, campo, nombre_completo, extension, objetivo,peso,piel, plan, presion, pulso, respiratorio, sentidos, subjetivo, talla, temperatura, eliminado } = res.data[i];
                                datos.push([
                                    nombre_completo ? nombre_completo :"",
                                    ci ? extension ? ci + " " + extension : ci: "",
                                    eliminado ? "INACTIVO" : "ACTIVO",
                                    cargo ? cargo : "",
                                    campo ? campo : "",
                                    fecha ? $scope.fechaATexto(fecha) : "",
                                    presion ? presion : "",
                                    pulso ? pulso : "",
                                    talla ? talla : "",
                                    peso ? peso : "",
                                    temperatura ? temperatura : "",
                                    frecuencia_respiratoria ? frecuencia_respiratoria : "",
                                    frecuencia_cardiaca ? frecuencia_cardiaca : "",
                                    indice_masa_corporal ? indice_masa_corporal : "",
                                    subjetivo,
                                    objetivo ? objetivo : "",
                                    analitico ? analitico : "",
                                    plan ? plan : "",
                                    evolucion ? evolucion : "",
                                    nervioso_central ? nervioso_central : "",
                                    sentidos ? sentidos : "",
                                    cardiovascular ? cardiovascular : "",
                                    respiratorio ? respiratorio : "",
                                    gastrointestinal ? gastrointestinal : "",
                                    genitourinario ? genitourinario : "",
                                    locomotor ? locomotor : "",
                                    piel ? piel : ""
                                ])
                            }
                            let ws_name = "SheetJS";
                            let wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
                            wb.SheetNames.push(ws_name);
                            wb.Sheets[ws_name] = ws;
                            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Reporte general de consultas.xlsx");
                            blockUI.stop();
                        }else{
                            blockUI.stop();
                            SweetAlert.swal("", res.message, "error"); 
                        }
                    })
            }

            // MODAL REPORTE DIAGNÓSTICOS
            $scope.abrirReportesDiagnosticos = () => {
                $scope.ObtenerMedicoDiagnostico({ id_empresa: $scope.usuario.id_empresa})
                $scope.filtroDiag = { empleado: "0", estado: "0", grupo_sanguineo: "0" }
                $scope.abrirPopup($scope.idModalReporteDiagnosticos);
            }
            $scope.cerrarDialogReporteDiagnosticos = () => {
                $scope.cerrarPopup($scope.idModalReporteDiagnosticos);
                $scope.filtroDiag = {}
            }
            $scope.generarReporteGeneralDiagnosticosXlsx = (filtro) => {
                if(!(filtro)) return SweetAlert.swal("", "Parámetros incorrectos", "error");
                GetDataReporteGeneralPacientes(filtro, $scope.usuario.id_empresa, 2, 3)
                    .then(res=>{
                        if(!res.error){
                            if(res.data.length == 0 ){
                                blockUI.stop();
                                return SweetAlert.swal("", "No se encontraron registros", "warning");
                            }
                            let datos = [["NOMBRES Y APELLIDOS", "CI","ESTADO", "CARGO", "CAMPO", "FECHA", "DIAGNÓSTICO", "EXAMEN", "RESULTADO ANTERIOR", "RESULTADO ACTUAL", "ESTADISTICA", "VALOR DE REFERENCIA"]]
                            let prev = ""
                            for (let i = 0; i < res.data.length; i++) {
                                const { nombre_completo, ci, extension, eliminado, cargo, campo, fecha, diagnostico, examen, resultado, unidad, minimo, maximo, estadistica } = res.data[i];
                                datos.push([
                                    nombre_completo,
                                    ci+ " "+ extension,
                                    eliminado ? "INACTIVO" : "ACTIVO",
                                    cargo,
                                    campo,
                                    $scope.fechaATexto(fecha),
                                    diagnostico,
                                    examen,
                                    examen === prev ? res.data[i-1].resultado : "",
                                    resultado ? resultado : "",
                                    estadistica ? estadistica : "",
                                    minimo && maximo ? unidad ? minimo+unidad+" - "+maximo+unidad : minimo + " - "+maximo : ""
                                ])
                                prev=examen
                            }
                            let ws_name = "SheetJS";
                            let wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
                            wb.SheetNames.push(ws_name);
                            wb.Sheets[ws_name] = ws;
                            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "reporte general de diagnosticos.xlsx");
                            blockUI.stop();
                        }else{
                            blockUI.stop();
                            SweetAlert.swal("", res.message, "error"); 
                        }
                    })
            }
            $scope.eliminarHistoricoPaciente = (id, tipo) => {
                console.log('id',id);
                console.log('tipo',tipo);
                if(!(id && tipo)) return SweetAlert.swal("", "Parámetros incorrectos", "error")
                try {
                    SweetAlert.swal({
                        html: `<b>¿Está seguro de eliminar el histórico?</b>`,
                        icon: 'warning',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#D33',
                        cancelButtonText: "Omitir",
                        confirmButtonText: 'Eliminar',
                    }).then(result => {
                        if(result.isConfirmed){
                            blockUI.start();
                            EliminarHistoricoPaciente(id,tipo)
                            .then(({ error, message, messageType }) => {
                                if(!error) {
                                    filtro = { inicio: 0, fin: 0 }
                                    $scope.ObtenerHistorialDiagnosticoExamenes(filtro)
                                }
                                SweetAlert.swal("",message, messageType)
                            })
                            blockUI.stop();
                        }
                    })

                    
                } catch (e) {
                    SweetAlert.swal("", "<b>Ocurrió un error al eliminar histórico</b><br>"+e,"error")
                }
            }
            
            $scope.inicio();
        }]);