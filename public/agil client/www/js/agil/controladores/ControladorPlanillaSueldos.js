angular.module('agil.controladores')

    .controller('ControladorPlanillaSueldos', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'Parametro', 'Parametros', 'RecursosHumanosEmpleados', 'ClasesTipo',
        'RecursosHumanosEmpleadosHorasExtras', 'RecursosHumanosPlanillaSueldos', 'RRHHlistaPlanillaSueldos', 'ListaPlanillaSueldosDetalle', '$filter', '$timeout', 'ClasesTipoEmpresa', 'ReporteExcelPlanillaOVT', 'ReporteExcelPlanillaOVTAguinaldos', 'SweetAlert', 'VerificarUsuarioEmpresa',
        'ReporteExcelPlanillaAFPPREVISION', 'ReporteExcelPlanillaAFPFUTURO', 'ListaBancos', 'Paises', 'GuardarTr3PlanillaSueldo', 'ListaTr3PlanillaSueldo', 'ReporteExcelPlanillaSiatRcIva', 'VerificarTr3AntesdeComprobante', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, Parametro, Parametros, RecursosHumanosEmpleados, ClasesTipo,
            RecursosHumanosEmpleadosHorasExtras, RecursosHumanosPlanillaSueldos, RRHHlistaPlanillaSueldos, ListaPlanillaSueldosDetalle, $filter, $timeout, ClasesTipoEmpresa, ReporteExcelPlanillaOVT, ReporteExcelPlanillaOVTAguinaldos, SweetAlert, VerificarUsuarioEmpresa,
            ReporteExcelPlanillaAFPPREVISION, ReporteExcelPlanillaAFPFUTURO, ListaBancos, Paises, GuardarTr3PlanillaSueldo, ListaTr3PlanillaSueldo, ReporteExcelPlanillaSiatRcIva, VerificarTr3AntesdeComprobante) {

            $scope.idModalNuevaPlanillaSueldos = 'dialog-nueva-planilla-sueldos';
            $scope.idModalEditarPlanillaSueldo = 'dialog-editar-planilla-sueldo';
            $scope.idModalParametros = 'dialog-parametros';
            $scope.idModalContenedorParametros = 'modal-wizard-container-parametros';
            $scope.idModalTR3 = 'dialog-tr3';
            $scope.idModalHistorialTR3 = 'dialog-historial-tr3';
            $scope.idEliminarSueldoEmpleado = 'dialog-eliminar-salario-empleado';
            $scope.idModalVerPlanillaSueldo = 'dialog-ver-planilla-sueldos';
            $scope.idModalEditarSueldo = 'dialog-editar-sueldo';
            $scope.idModalImpresion = 'dialog-impresion';
            $scope.idModalParametroHoraExtraC = 'dialog-cerrar-horas-Extras';
            $scope.idTabImpresiones = "tab-impresiones";
            $scope.idModalGenerarComprobante = 'dialog-generar-comprobante';
            $scope.idModalVerificarTr3 = 'verificar-tr3-banco';
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsPlanillaSueldos($scope.idModalNuevaPlanillaSueldos, $scope.idModalEditarPlanillaSueldo, $scope.idModalParametros, $scope.idModalContenedorParametros,
                    $scope.idModalTR3, $scope.idModalHistorialTR3, $scope.idEliminarSueldoEmpleado, $scope.idModalVerPlanillaSueldo, $scope.idModalEditarSueldo, $scope.idModalImpresion, $scope.idModalParametroHoraExtraC, $scope.idTabImpresiones,
                    $scope.idModalGenerarComprobante, $scope.idModalVerificarTr3);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalNuevaPlanillaSueldos);
                $scope.eliminarPopup($scope.idModalEditarPlanillaSueldo);
                $scope.eliminarPopup($scope.idModalParametros);
                $scope.eliminarPopup($scope.idModalTR3);
                $scope.eliminarPopup($scope.idEliminarSueldoEmpleado);
                $scope.eliminarPopup($scope.idModalHistorialTR3);
                $scope.eliminarPopup($scope.idModalVerPlanillaSueldo);
                $scope.eliminarPopup($scope.idModalEditarSueldo);
                $scope.eliminarPopup($scope.idModalImpresion);
                $scope.eliminarPopup($scope.idModalParametroHoraExtraC);
                $scope.eliminarPopup($scope.idModalGenerarComprobante);
                $scope.eliminarPopup($scope.idModalVerificarTr3)
            });

            $scope.usuario = JSON.parse($localStorage.usuario);

            // $scope.fechaATexto = function (fecha) {
            //     fech = new Date(fecha)
            //     fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
            //     return fecha
            // }

            $scope.stepWizard = function (step) {
                $('#' + $scope.idModalContenedorParametros).wizard('selectedItem', {
                    step: step
                });
            }

            $scope.inicio = function () {
                $scope.dynamicPopovertr3 = {
                    templateUrl: 'myPopoverTr3.html',
                };
                $scope.obtenerGestiones();
                $scope.obtenerAreas();
                $scope.obtenerTiposRolTurnoExtra();
                $scope.listaBancos()
                $scope.obtenerDepartamentos()
            }

            $scope.listaBancos = function () {
                $scope.anticiposSeleccionados = []
                $scope.planillasSueldoTr3 = []
                var promesa = ListaBancos($scope.usuario.id_empresa)
                $scope.arregloBancosUnion = ""
                $scope.arregloBancosMsc = ""
                promesa.then(function (dato) {
                    $scope.datosBancos = dato
                    $scope.bancos = []

                    dato.forEach(function (banco, index, array) {

                        banco.cuentas = []
                        if (index == 0) {
                            $scope.bancos.push(banco)
                        }
                        var bandera = false
                        for (var i = 0; i < $scope.bancos.length; i++) {
                            var banco2 = $scope.bancos[i]
                            if (banco2.nombre == banco.nombre) {
                                bandera = true
                            }
                            if (i === ($scope.bancos.length - 1)) {
                                if (bandera == false) {
                                    $scope.bancos.push(banco)

                                }
                            }
                        }
                        if (index === (array.length - 1)) {
                            dato.forEach(function (banco, index, array) {
                                for (var i = 0; i < $scope.bancos.length; i++) {
                                    var banco2 = $scope.bancos[i]
                                    if (banco2.nombre == banco.nombre) {
                                        bandera = true
                                        banco2.cuentas.push(banco)

                                        i = $scope.bancos.length
                                    }
                                }
                            })
                        }
                    });
                }).catch((err) => {
                    console.error(err)
                });
            }

            $scope.obtenerGestiones = function () {
                blockUI.start();
                var promesa = ClasesTipo("GTN");
                promesa.then(function (entidad) {
                    $scope.gestiones = entidad.clases;
                    blockUI.stop();
                });
            }



            $scope.obtenerAreas = function () {
                blockUI.start();
                var promesa = ClasesTipoEmpresa("RRHH_AREA", $scope.usuario.id_empresa);
                promesa.then(function (entidad) {
                    $scope.listaAreas = entidad;
                    var areas = entidad.clases
                    $scope.llenarAreas(areas)
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

            $scope.llenarAreas = function (areas) {
                $scope.cargosFrontera = [];
                $scope.cargosHBD = [];
                for (var i = 0; i < areas.length; i++) {
                    var area_frontera = {
                        nombre: areas[i].nombre,
                        maker: "",
                        ticked: false,
                        id: areas[i].id
                    }
                    var area_hbd = {
                        nombre: areas[i].nombre,
                        maker: "",
                        ticked_hbd: false,
                        id: areas[i].id
                    }
                    if (areas[i].habilitado) {
                        $scope.cargosFrontera.push(area_frontera);
                        $scope.cargosHBD.push(area_hbd);
                    }

                }
            }

            $scope.seleccionarAreaFrontera = function (area) {
                for (var i = 0; i < $scope.cargosFrontera.length; i++) {
                    for (var j = 0; j < area.length; j++) {
                        if ($scope.cargosFrontera[i].id == area[j].id_area) {
                            $scope.cargosFrontera[i].ticked = true;
                        }
                    }
                }
            }

            $scope.seleccionarAreaHBD = function (area) {
                for (var i = 0; i < $scope.cargosHBD.length; i++) {
                    for (var j = 0; j < area.length; j++) {
                        if ($scope.cargosHBD[i].id == area[j].id_area) {
                            $scope.cargosHBD[i].ticked_hbd = true;
                        }
                    }
                }
            }

            // $scope.years = [];
            // var max = new Date().getFullYear();
            // for (var i = max; i>=2013; i--){
            //     $scope.years.push(i);
            // }
            // $scope.planilla={};
            // $scope.planilla.gestion = 2018;
            var testOffset = $('#test').offset(),
                scrollOffset = $('#scrollp').offset();
            $('#scrollp').scrollLeft(testOffset.left - scrollOffset.left);

            $scope.nuevaPlanillaSueldos = function () {
                $scope.planilla = new RecursosHumanosPlanillaSueldos({ id_empresa: $scope.usuario.id_empresa });
                $scope.sumarTotales($scope.planilla);
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };

            }


            $scope.parseDate = function (input) {
                var parts = input.split('/');
                return new Date(parts[2], parts[1] - 1, parts[0]);
            }

            $scope.abrirDialogNuevaPlanillaSueldos = function () {

                // $scope.filtroRolCal = {campo: "", empresa: 35,fin: "31/12/2018",fin2: "30/09/2018",grupo: 6716,inicio: "01/01/2015",inicio2: "01/09/2018",nombre: ""}

                // $scope.realizarCalendarioTrabajo($scope.filtroRolCal);
                // console.log($scope.empleadosRolTurno);
                // var df = $scope.parseDate($scope.filtroRolCal.inicio2); //desde
                // var dt = $scope.parseDate($scope.filtroRolCal.fin2); // hasta
                // var result = []; 
                // var countTD = 0;       
                // for (var i=0; i<$scope.empleadosRolTurno[0].diasAnio.length; i++){
                //     var tf = $scope.parseDate($scope.empleadosRolTurno[0].diasAnio[i].fecha),
                //         tt = $scope.parseDate($scope.empleadosRolTurno[0].diasAnio[i].fecha);
                //     if (tf >= df && tt <= dt)  {
                //         if($scope.empleadosRolTurno[0].diasAnio[i].texto == "T"){
                //             countTD=countTD+1;
                //         }
                //         result.push($scope.empleadosRolTurno[0].diasAnio[i]);
                //     }
                // }   
                // console.log(result);
                // console.log("cantidad total de trabajo : "+countTD);
                $scope.nuevaPlanillaSueldos();
                $scope.abrirPopup($scope.idModalNuevaPlanillaSueldos);
            }

            $scope.fechaPorDia = function (año, dia) {
                var date = new Date(año, 0);
                return new Date(date.setDate(dia));
            }

            $scope.realizarCalendarioTrabajo = function (filtro, empleadosRolTurno) {

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

                $scope.diasAnio = $scope.CalendarioRolTurnos(anio, filtro)
                // $scope.diasAnioPieTrabajos =  angular.copy($scope.diasAnio);
                // $scope.diasAnioPieDescansos =  angular.copy($scope.diasAnio);
                // $scope.diasAnioPieAusencias =  angular.copy($scope.diasAnio);
                // $scope.diasAnioPieVacaciones =  angular.copy($scope.diasAnio);
                // $scope.diasAnioPieProtectadas =  angular.copy($scope.diasAnio);
                // $scope.diasAnioPiediferencia =  angular.copy($scope.diasAnio);

                if (empleadosRolTurno) {
                    for (rol of empleadosRolTurno) {
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
                        // rol.diasAnio =  $scope.CalendarioRolTurnos(anio, filtro, rol)
                        rol.diasAnio = angular.copy($scope.diasAnio);
                        var rolturno = rol
                        var fechaFin = ""
                        if (rolturno.fecha_fin) {
                            fechaFin = $scope.fechaATexto(rolturno.fecha_fin)
                        }
                        var bandera = false
                        var a = 1

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
                            //     var diaPie = $scope.diasAnioPieTrabajos.find(function (x) {
                            //         return x.fecha == element.fecha
                            //     })

                            //     if (diaPie) {
                            //         if (element.texto == "T" || element.texto == "NT") {
                            //             var val = (diaPie.texto == "") ? 0 : parseInt(diaPie.texto)
                            //             diaPie.texto = val + 1
                            //         }
                            //     }
                            //     var diaPieA = $scope.diasAnioPieAusencias.find(function (x) {
                            //         return x.fecha == element.fecha
                            //     })
                            //     if (diaPieA) {
                            //         if (element.texto == "A" || element.texto == "TBM" || element.texto == "DBD" || element.texto == "NTB") {
                            //             var val = (diaPieA.texto == "") ? 0 : parseInt(diaPieA.texto)
                            //             diaPieA.texto = val + 1
                            //         }
                            //     }
                            //     var diaPieV = $scope.diasAnioPieVacaciones.find(function (x) {
                            //         return x.fecha == element.fecha
                            //     })
                            //     if (diaPieV) {
                            //         if (element.texto == "V" || element.texto == "TV" || element.texto == "DV" || element.texto == "NTV") {
                            //             var val = (diaPieV.texto == "") ? 0 : parseInt(diaPieV.texto)
                            //             diaPieV.texto = val + 1
                            //         }
                            //     }
                            //     var diaPieD = $scope.diasAnioPieDescansos.find(function (x) {
                            //         return x.fecha == element.fecha
                            //     })
                            //     if (diaPieD) {
                            //         if (element.texto == "D") {
                            //             var val = (diaPieD.texto == "") ? 0 : parseInt(diaPieD.texto)
                            //             diaPieD.texto = val + 1
                            //         }
                            //     }
                        }
                        rol.contador_suma_total = rol.contador_dias_Trabajados +
                            rol.contador_dias_descanso +
                            rol.contador_noche_trabajadas +
                            rol.contador_dias_vacaciones +
                            rol.contador_dias_otras_ausencia +
                            rol.contador_dias_ausencia_medica
                    }
                }

            }

            // $scope.realizarCalendarioTrabajo = function (filtro, empleadosRolTurno) {

            //     var anio = []
            //     if (filtro) {
            //         if (filtro.inicio) {
            //             var inicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear();
            //             var fin = new Date($scope.convertirFecha(filtro.fin)).getFullYear();
            //             while (inicio <= fin) {
            //                 anio.push(inicio)
            //                 inicio++
            //             }
            //         }
            //     } else {
            //         anio.push(new Date().getFullYear())
            //     }

            //     $scope.diasAnio = $scope.CalendarioRolTurnos(anio, filtro)
            //     $scope.diasAnioPieTrabajos = $scope.CalendarioRolTurnos(anio, filtro)
            //     $scope.diasAnioPieAusencias = $scope.CalendarioRolTurnos(anio, filtro)
            //     $scope.diasAnioPieVacaciones = $scope.CalendarioRolTurnos(anio, filtro)
            //     empleadosRolTurno.forEach(function (rol, index, array) {
            //         var anio = []
            //         if (filtro) {
            //             if (filtro.inicio) {
            //                 var inicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear();
            //                 var fin = new Date($scope.convertirFecha(filtro.fin)).getFullYear();
            //                 while (inicio <= fin) {
            //                     anio.push(inicio)
            //                     inicio++
            //                 }
            //             }
            //         } else {
            //             anio.push(new Date().getFullYear())
            //         }
            //         rol.diasAnio = $scope.CalendarioRolTurnos(anio, filtro, rol)
            //         var rolturno = rol
            //         var fechaFin = ""
            //         if (rolturno.fecha_fin) {
            //             fechaFin = $scope.fechaATexto(rolturno.fecha_fin)
            //         }
            //         var bandera = false
            //         var a = 1
            //         for (var i = 0; i < rol.diasAnio.length; i++) {
            //             var element = rol.diasAnio[i];

            //             if (element.fecha == $scope.fechaATexto(rolturno.fecha_inicio)) {
            //                 bandera = true
            //             } else if (new Date($scope.convertirFecha(element.fecha)).getFullYear() > new Date(rolturno.fecha_inicio).getFullYear()) {
            //                 if (new Date($scope.convertirFecha(element.fecha)).getDate() >= new Date(rolturno.fecha_inicio).getDate())
            //                     bandera = true
            //             }
            //             if (bandera) {
            //                 if (a <= rolturno.dias_trabajado) {
            //                     if (rolturno.fecha_fin) {
            //                         if (fechaFin == element.fecha) {
            //                             i = rol.diasAnio.length
            //                             if (rolturno.turno_dia) {
            //                                 element.texto = "T"
            //                             }else{
            //                                 element.texto = "NT"
            //                             }
            //                         } else {
            //                             var anio = fechaFin.split("/")[2]
            //                             var anioInicio = element.fecha.split("/")[2]
            //                             var mes = fechaFin.split("/")[1]
            //                             var mesInicio = element.fecha.split("/")[1]
            //                             var dia = fechaFin.split("/")[0]
            //                             var diaInicio = element.fecha.split("/")[0]
            //                             if (anio >= anioInicio) {
            //                                 if (rolturno.turno_dia) {
            //                                     element.texto = "T"
            //                                 }else{
            //                                     element.texto = "NT"
            //                                 }
            //                             }
            //                         }
            //                         a++
            //                     } else {
            //                         if (rolturno.turno_dia) {
            //                             element.texto = "T"
            //                         }else{
            //                             element.texto = "NT"
            //                         }
            //                         a++
            //                     }
            //                 } else if (a <= (rolturno.dias_trabajado + rolturno.dias_descanso)) {
            //                     if (rolturno.fecha_fin) {
            //                         if (fechaFin == element.fecha) {
            //                             i = rol.diasAnio.length
            //                             element.texto = "D"
            //                         }
            //                         else {
            //                             var anio = fechaFin.split("/")[2]
            //                             var anioInicio = element.fecha.split("/")[2]
            //                             var mes = fechaFin.split("/")[1]
            //                             var mesInicio = element.fecha.split("/")[1]
            //                             var dia = fechaFin.split("/")[0]
            //                             var diaInicio = element.fecha.split("/")[0]
            //                             if (anio >= anioInicio) {
            //                                 element.texto = "D"
            //                             }
            //                         }
            //                         if (a === (rolturno.dias_trabajado + rolturno.dias_descanso)) {
            //                             a = 0
            //                         }
            //                         a++
            //                     } else {
            //                         element.texto = "D"
            //                         if (a === (rolturno.dias_trabajado + rolturno.dias_descanso)) {
            //                             a = 0
            //                         }
            //                         a++
            //                     }
            //                 }
            //             }

            //             if (rol.ficha.ausencias.length>0) {
            //                 for (var j = 0; j < rol.ficha.ausencias.length; j++) {
            //                     var element1 = rol.ficha.ausencias[j];
            //                     var startDate = new Date(element1.fecha_inicio);
            //                     var endDate = new Date(element1.fecha_fin);
            //                     var fechasausencias = getDates(startDate, endDate);

            //                     if (fechasausencias.length>0) {
            //                         for (var k = 0; k < fechasausencias.length; k++) {
            //                             var element2 = fechasausencias[k];
            //                             if (element2 == $scope.formatofecha(element.fecha)) {
            //                                 if (element.texto == "D") {
            //                                     if (element1.horas) {
            //                                         element.texto += "OA"
            //                                     } else {
            //                                         element.texto += "BD"
            //                                     }
            //                                 } else if (element.texto == "T") {
            //                                     if (element1.horas) {
            //                                         element.texto += "OA"
            //                                     } else {
            //                                         element.texto += "BM"
            //                                     }
            //                                 }
            //                             }
            //                         }
            //                     }

            //                 }
            //             }

            //             if (rol.ficha.vacaciones.length>0) {
            //                 for (var j = 0; j < rol.ficha.vacaciones.length; j++) {
            //                     var element1 = rol.ficha.vacaciones[j];


            //                     var startDate = new Date(element1.fecha_inicio);
            //                     var endDate = new Date(element1.fecha_fin);
            //                     // console.log($scope.formatofecha());
            //                     var fechasvacacion = getDates(startDate, endDate);

            //                     if (fechasvacacion.length>0) {
            //                         for (var k = 0; k < fechasvacacion.length; k++) {
            //                             var element2 = fechasvacacion[k];

            //                             if (element2 == $scope.formatofecha(element.fecha)) {
            //                                 if (element.texto == "D") {
            //                                     element.texto += "V"    
            //                                 } else {
            //                                     element.texto += "V"
            //                                 }
            //                             }
            //                         }
            //                     }

            //                 }
            //             }


            //             for (var x = 0; x < $scope.diasAnioPieTrabajos.length; x++) {
            //                 var diaPie = $scope.diasAnioPieTrabajos[x];
            //                 if (diaPie.fecha == element.fecha) {
            //                     if (element.texto == "T" || element.texto == "NT") {
            //                         var val = (diaPie.texto == "") ? 0 : parseInt(diaPie.texto)
            //                         diaPie.texto = val + 1
            //                     }
            //                 }
            //             }
            //         }
            //     })
            // }

            $scope.formatofecha = function (fecha) {
                var datos = fecha.split("/")
                return datos[2] + "/" + datos[1] + "/" + datos[0]
            }

            $scope.CalendarioRolTurnos = function (anio, filtro) {
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
                                if (value && mesRolT) {
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

            $scope.CalendarioRolTurnosrr = function (anio, filtro) {
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
                                var diaactual = { id: i, dia: dia, visible: true, texto: "", fecha: $scope.fechaATexto(fecha), mes: mesRolT }
                                if (anio >= anioInicio && anio <= aniofin) {
                                    if (mes == inicio) {
                                        if (dia >= diaInicio) {
                                            diasAnio.push(diaactual)
                                        } else {
                                            diaactual.visible = false
                                            diasAnio.push(diaactual)
                                        }
                                    } else if (mes == fin) {
                                        if (dia <= diafin) {
                                            diasAnio.push(diaactual)
                                        } else {
                                            diaactual.visible = false
                                            diasAnio.push(diaactual)
                                        }
                                    } else {
                                        diasAnio.push(diaactual)
                                    }
                                } else {
                                    diaactual.visible = false
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
            $scope.fechaString = function (fechaget) {
                var dd = fechaget.getDate();
                var mm = fechaget.getMonth() + 1;
                var yyyy = fechaget.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                var today = dd + '/' + mm + '/' + yyyy;
                return today
            }

            $scope.diferenciaEntreDiasEnDias = function (a, b) {
                var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
                var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
            }

            function getPercentageChange(oldNumber, newNumber) {
                var decreaseValue = oldNumber - newNumber;
                var porcentage = 100 - (decreaseValue / oldNumber) * 100;
                return porcentage.toFixed();
            }

            function esperandoCalculo() {
                return new Promise(resolve => setTimeout(resolve, 5));
            }

            async function realizarCalculos(empleado, planilla, countE) {
                await esperandoCalculo();
                // console.log(empleado);
                SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
                SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
                blockUI.noOpen = true;
                promesa = RecursosHumanosEmpleadosHorasExtras(empleado.id_ficha, planilla.gestion, planilla.mes.split("-")[0], empleado.id);
                await promesa.then(function (dato) {
                    empleado.sueldoBasico = empleado.haber_basico;

                    // var start = Math.floor(empled.getTime() / (3600 * 24 * 1000)); //days as integer from..
                    // var end = Math.floor(ultimoDia.getTime() / (3600 * 24 * 1000)); //days as integer from..
                    // var diasTrabajo = end - start; // exact dates
                    $scope.diasRolTurnos = 0;
                    $scope.nochesRolTurnos = 0;
                    $scope.descansosRolTurnos = 0;
                    if (empleado.id == 4809) {
                        console.log(empleado);
                    }
                    var empled = new Date(empleado.fecha_inicio);
                    if (dato.rolesTurno.length > 0) {
                        $scope.empleadosRolTurno = dato.rolesTurno;
                        var fechaHoy = new Date()
                        var ultimoDiaMes = new Date(fechaHoy.getFullYear(), 12, 0).getDate();
                        var mesfiltro = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]), 0);

                        var primerDia = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                        // console.log("primerDia =======", primerDia);
                        var ultimoDia = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, mesfiltro.getDate(), 23, 59, 59);

                        // $scope.filtroRolCal = {fin: ultimoDiaMes + "/12/" + fechaHoy.getFullYear(),fin2: $scope.fechaString(ultimoDia),inicio: "01/01/2015",inicio2: $scope.fechaString(primerDia)}
                        var fechaINIROL = new Date(dato.rolesTurno[0].fecha_inicio);
                        $scope.filtroRolCal = { fin: ultimoDiaMes + "/12/" + fechaHoy.getFullYear(), fin2: $scope.fechaString(ultimoDia), inicio: "01/01/" + fechaINIROL.getFullYear(), inicio2: $scope.fechaString(primerDia) }

                        $scope.realizarCalendarioTrabajo($scope.filtroRolCal, $scope.empleadosRolTurno);
                        var df = $scope.parseDate($scope.filtroRolCal.inicio2); //desde
                        var dt = $scope.parseDate($scope.filtroRolCal.fin2); // hasta
                        var result = [];
                        var countTD = 0;
                        var countNT = 0;
                        var countDD = 0;



                        for (var index = 0; index < $scope.empleadosRolTurno.length; index++) {
                            var rolesT = $scope.empleadosRolTurno[index];
                            for (var i = 0; i < rolesT.diasAnio.length; i++) {
                                var tf = $scope.parseDate(rolesT.diasAnio[i].fecha),
                                    tt = $scope.parseDate(rolesT.diasAnio[i].fecha);
                                if (tf >= df && tt <= dt) {
                                    if (rolesT.diasAnio[i].texto == "T") {
                                        countTD = countTD + 1;
                                    } else if (rolesT.diasAnio[i].texto == "NT") {
                                        countNT = countNT + 1;
                                    } else if (rolesT.diasAnio[i].texto == "D") {
                                        countDD = countDD + 1
                                    }
                                    result.push(rolesT.diasAnio[i]);
                                }
                            }

                        }

                        $scope.nochesRolTurnos = countNT;
                        $scope.diasRolTurnos = countTD;
                        $scope.descansosRolTurnos = countDD;
                    }

                    var mes = new Date(planilla.gestion, parseInt(planilla.mes), 0);
                    var ultimoDiaT = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate() > 30 ? mes.getDate() - 1 : mes.getDate(), 23, 59, 59);

                    // var diasTrabajo = ultimoDia - new Date(empleado.fecha_inicio);

                    // var timeDiff = Math.abs(mes.getTime() - empled.getTime());
                    var ultimoDiaMesPlanilla = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
                    if (parseInt(planilla.mes) == 2 && parseInt(planilla.mes.split("-")[0]) == empled.getMonth() + 1 && empled.getFullYear() == planilla.gestion) {

                        // para comprobar si febrero termina en 28 o 29
                        var diaCalc = ultimoDiaMesPlanilla.getDate();
                        // aumentar dias dependiendo el mes en que termina febrero
                        var diasSum = 1;
                        if (diaCalc == 28) {
                            diasSum = 2;
                        }
                        ultimoDiaT.setDate(ultimoDiaT.getDate() + diasSum);
                    }

                    var timeDiff = Math.abs(ultimoDiaT.getTime() - empled.getTime());


                    if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) == empled.getMonth() + 1 && empled.getFullYear() == planilla.gestion) {
                        // timeDiff = Math.abs(ultimoDiaT.getTime() - empled.getTime());
                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                        timeDiff = Math.abs(fecha_expiracionE.getTime() - empled.getTime());
                        // parece que aqui es lo que hay recalcular si mayor a 28 o igual colocar 30

                    } else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth() + 1 && empled.getFullYear() == planilla.gestion) {
                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                        var primerDiafl = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                        if (fecha_expiracionE.getMonth() + 1 == 2 && parseInt(planilla.mes) == 2 && (fecha_expiracionE.getDate() == 28 || fecha_expiracionE.getDate() == 29)) {
                            // para comprobar si febrero termina en 28 o 29
                            var diaCalc = ultimoDiaMesPlanilla.getDate();
                            // aumentar dias dependiendo el mes en que termina febrero
                            var diasSum = 1;
                            if (diaCalc == 28) {
                                diasSum = 2;
                            }
                            fecha_expiracionE.setDate(fecha_expiracionE.getDate() + diasSum);
                        }
                        timeDiff = Math.abs(fecha_expiracionE.getTime() - primerDiafl.getTime());
                    } else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) == empled.getMonth() + 1 && empled.getFullYear() != planilla.gestion) {
                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                        var primerDiafl = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                        if (fecha_expiracionE.getMonth() + 1 == 2 && parseInt(planilla.mes) == 2 && (fecha_expiracionE.getDate() == 28 || fecha_expiracionE.getDate() == 29)) {
                            // para comprobar si febrero termina en 28 o 29
                            var diaCalc = ultimoDiaMesPlanilla.getDate();
                            // aumentar dias dependiendo el mes en que termina febrero
                            var diasSum = 1;
                            if (diaCalc == 28) {
                                diasSum = 2;
                            }
                            fecha_expiracionE.setDate(fecha_expiracionE.getDate() + diasSum);
                        }
                        timeDiff = Math.abs(fecha_expiracionE.getTime() - primerDiafl.getTime());
                    } else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth() + 1 && empled.getFullYear() != planilla.gestion) {
                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                        var primerDiafl = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                        // para igualar los dias a 30 si en febrero termina en 28 o 29
                        if (fecha_expiracionE.getMonth() + 1 == 2 && parseInt(planilla.mes) == 2 && (fecha_expiracionE.getDate() == 28 || fecha_expiracionE.getDate() == 29)) {
                            // para comprobar si febrero termina en 28 o 29
                            var diaCalc = ultimoDiaMesPlanilla.getDate();
                            // aumentar dias dependiendo el mes en que termina febrero
                            var diasSum = 1;
                            if (diaCalc == 28) {
                                diasSum = 2;
                            }
                            fecha_expiracionE.setDate(fecha_expiracionE.getDate() + diasSum);
                        }
                        timeDiff = Math.abs(fecha_expiracionE.getTime() - primerDiafl.getTime());
                    }

                    var diasTrabajo = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    if (diasTrabajo >= 30) {
                        diasTrabajo = 30;
                    }


                    empleado.dt = diasTrabajo;
                    empleado.nt = $scope.nochesRolTurnos;


                    empleado.ganado = round(empleado.sueldoBasico / 30 * empleado.dt, 2);
                    $scope.horasExtras = 8; // == sacar horas extras ==================
                    // console.log('ficha fecha inicio ==== ', empleado.fecha_inicio);

                    var ultimoDiaMesBono = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
                    $scope.antiguedad = calcAge(empleado.fecha_inicio, ultimoDiaMesBono); // == sacar años de antiguedad ==================

                    // console.log("$scope.antiguedad", $scope.antiguedad);
                    $scope.bonoFrontera = 0; // == sacar bono frontera ==================
                    $scope.otrosBonos = 0; // == sacar otros bonos ==================
                    $scope.otrosBonos += round(empleado.monto_otro_bonos, 2);
                    // $scope.horasExtras = 10;
                    // var totalHoras = "";
                    // var timeHoras = 0;
                    // var timeMinutos = 0;
                    // if (dato.horasExtra.length > 0) {
                    //     for (var i = 0; i < dato.horasExtra.length; i++) {
                    //         var minutos = dato.horasExtra[i].tiempo.split(':')[1];
                    //         var horas = dato.horasExtra[i].tiempo.split(':')[0];

                    //         timeHoras = timeHoras + parseInt(horas);
                    //         timeMinutos = timeMinutos + parseInt(minutos);
                    //         if (timeMinutos >= 60) {
                    //             timeMinutos = timeMinutos - 60;
                    //             timeHoras = timeHoras + 1;
                    //         }
                    //         // totalHoras = String("0" + timeHoras).slice(-2) + ':' + String("0" + timeMinutos).slice(-2);
                    //         totalHoras = timeHoras;
                    //     }
                    // }else{
                    //     totalHoras = 0;
                    // }

                    // === calculo de horas extras =======
                    // empleado.horasExtrasRol = 6;

                    var ParamCamposHorasExtras = $scope.parametros.campos_horas_extras.filter((campoHE) => {
                        return (campoHE.campo.nombre == empleado.campamento)
                    });

                    if (ParamCamposHorasExtras.length > 0) {
                        var getCampoParamIndefinido = ParamCamposHorasExtras.find(function (item_campo) {
                            // si mesInicioParametro >= mesFiltro && mesFinParmetro == null
                            var filtrosum = Number(planilla.gestion) + parseInt(planilla.mes);
                            var inisumParam = Number(item_campo.inicio_mes.split('/')[0]) + Number(item_campo.inicio_mes.split('/')[1]);
                            // return filtrosum >= inisumParam && item_campo.fin_mes == null
                            return item_campo.fin_mes == null
                        });

                        if (getCampoParamIndefinido) {
                            if (empleado.horas_extra_dia_campo) {
                                empleado.horasExtrasRol = empleado.horas_campo;
                            } else {
                                empleado.horasExtrasRol = getCampoParamIndefinido.horas;
                            }
                        } else {
                            var getCampoParamFinalizado = ParamCamposHorasExtras.find(function (item_campo) {
                                // si mesInicioParametro >= mesFiltro  && mesFinParmetro <= mesFiltro
                                var filtrosum = Number(planilla.gestion) + parseInt(planilla.mes);
                                var inisumParam = Number(item_campo.inicio_mes.split('/')[0]) + Number(item_campo.inicio_mes.split('/')[1]);

                                var sumFiltroValid = false;
                                if (item_campo.fin_mes) {
                                    var finsumParam = Number(item_campo.fin_mes.split('/')[0]) + Number(item_campo.fin_mes.split('/')[1]);
                                    sumFiltroValid = filtrosum <= finsumParam ? true : false;
                                }

                                return filtrosum >= inisumParam && sumFiltroValid

                            });

                            if (getCampoParamFinalizado) {
                                if (empleado.horas_extra_dia_campo) {
                                    empleado.horasExtrasRol = empleado.horas_campo;
                                } else {
                                    empleado.horasExtrasRol = getCampoParamFinalizado.horas;
                                }
                            } else {
                                empleado.horasExtrasRol = 6;
                            }
                        }

                    } else {
                        empleado.horasExtrasRol = 6;
                    }

                    empleado.diasRolTurnos = $scope.diasRolTurnos;
                    $scope.extrasDT = (empleado.diasRolTurnos + $scope.nochesRolTurnos) * empleado.horasExtrasRol;

                    empleado.horasExtrasR = dato.totalHoras + dato.totalHorasOrdinario;
                    // empleado.horasExtras = empleado.horasExtrasR + $scope.extrasDT;

                    if (empleado.bono_dias) {
                        var trabajos = $scope.diasRolTurnos * empleado.costo_campo;
                        var descansos = $scope.descansosRolTurnos * empleado.costo_descanso;
                        if (trabajos > 0) {
                            var montoTrabajosR = trabajos - empleado.ganado;
                            var horasExtraRest = empleado.ganado / 120;
                            var nuevaHoraExtra = montoTrabajosR / horasExtraRest;
                            $scope.horasExtras = Math.floor(nuevaHoraExtra); // obteniendo entero
                            $scope.totalHorasExtras = $scope.horasExtras * horasExtraRest;
                            var horasExtraDecimal = (nuevaHoraExtra - $scope.horasExtras); // obteniendo decimal
                            var otrosBonosSuma = descansos + (horasExtraDecimal * horasExtraRest);
                            $scope.otrosBonos += round(otrosBonosSuma, 2);
                        } else {
                            $scope.horasExtras = 0;
                            $scope.totalHorasExtras = 0;
                        }
                    } else {
                        $scope.horasExtras = empleado.horasExtrasR + $scope.extrasDT;
                        $scope.totalHorasExtras = round((empleado.sueldoBasico / 30 / 8 * $scope.horasExtras) * 2, 2);
                    }

                    // empleado.totalHorasExtras = round((empleado.sueldoBasico/30/8*empleado.horasExtras)*2, 2);

                    // empleado.recargoNocturno= round((empleado.ganado/30/8*empleado.horasExtras)*1.5, 2);

                    empleado.recargoNocturno = round((empleado.sueldoBasico / 30 * $scope.nochesRolTurnos) * 35 / 100, 2);
                    empleado.bonoAntiguedad = $scope.calcularBonoAntiguedad($scope.antiguedad);

                    $scope.area_frontera = $scope.parametros.areas_frontera.find(function (item_area) {
                        return item_area.area.nombre == empleado.area
                    });

                    $scope.area_hbd = $scope.parametros.areas_hbd.find(function (item_area) {
                        return item_area.area.nombre == empleado.area
                    });

                    if ($scope.area_frontera != undefined) {
                        // calculo bono frontera ==============================================
                        if ($scope.parametros.frontera_porcentaje) {
                            $scope.bonoFrontera = round(empleado.sueldoBasico * $scope.parametros.frontera_monto / 100, 2);
                        } else {
                            $scope.bonoFrontera = $scope.parametros.frontera_monto;
                        }

                    }

                    empleado.bonoFrontera = $scope.bonoFrontera;
                    var fechaNacimiento = new Date(empleado.fecha_nacimiento);
                    // condicion de fecha de nacimiento mes y mes filtro
                    if (parseInt(planilla.mes.split("-")[0]) - 1 == fechaNacimiento.getMonth() && $scope.area_hbd != undefined) {
                        // calculo bono cumpleañero ==============================================
                        if ($scope.parametros.hbd_porcentaje) {
                            $scope.otrosBonos += round(empleado.sueldoBasico * $scope.parametros.hbd_monto / 100, 2);
                        } else {
                            $scope.otrosBonos += $scope.parametros.hbd_monto;
                        }

                    }

                    var totalGanado = round(empleado.ganado + $scope.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);

                    if (empleado.total_ganado_fijo) {

                        if (empleado.dt < 30) {
                            empleado.monto_total_ganado = (empleado.monto_total_ganado / 30) * empleado.dt;
                        }

                        if (totalGanado < empleado.monto_total_ganado) {
                            // var diferencia = empleado.monto_total_ganado - totalGanado;
                            // $scope.otrosBonos += diferencia;
                            // var totalGanadoAnterior = round(empleado.ganado+$scope.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+$scope.otrosBonos, 2);
                            // var horasExtraRest = empleado.sueldoBasico/120;
                            // var montoganadoR =  totalGanadoAnterior - empleado.ganado;
                            // var nuevaHoraExtra = montoganadoR/horasExtraRest;
                            // empleado.horasExtras = Math.floor(nuevaHoraExtra); // obteniendo entero
                            // empleado.totalHorasExtras = round(empleado.horasExtras*horasExtraRest, 2);
                            // var horasExtraDecimal = (nuevaHoraExtra -  empleado.horasExtras); // obteniendo decimal
                            // var otrosBonosSuma=horasExtraDecimal*horasExtraRest;
                            // $scope.otrosBonos = otrosBonosSuma;
                            // empleado.totalGanado = round(empleado.ganado+empleado.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+$scope.otrosBonos, 2);

                            var diferencia = empleado.monto_total_ganado - totalGanado;
                            $scope.otrosBonos += diferencia;
                            empleado.totalGanado = round(empleado.ganado + $scope.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);
                            empleado.horasExtras = $scope.horasExtras;
                            empleado.totalHorasExtras = $scope.totalHorasExtras;

                        } else if (totalGanado > empleado.monto_total_ganado) {
                            var diferencia = totalGanado - empleado.monto_total_ganado;
                            var RHorasExtras = $scope.totalHorasExtras / $scope.horasExtras;
                            var nuevoTotalExtras = $scope.totalHorasExtras - diferencia;
                            var nuevoHorasExtras = nuevoTotalExtras / RHorasExtras;
                            var horasExtrasEntero = Math.floor(nuevoHorasExtras); // obteniendo el entero de horas extras
                            empleado.horasExtras = horasExtrasEntero;
                            var horasExtraDecimal = (nuevoHorasExtras - empleado.horasExtras); // obteniendo el decimal de horas extras
                            var otrosBonosTotal = horasExtraDecimal * (nuevoTotalExtras / nuevoHorasExtras)
                            $scope.otrosBonos += otrosBonosTotal;
                            empleado.totalHorasExtras = round(nuevoTotalExtras - otrosBonosTotal, 2);
                            empleado.totalGanado = round(empleado.ganado + empleado.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);

                        } else {
                            empleado.totalGanado = totalGanado;
                            empleado.horasExtras = $scope.horasExtras;
                            empleado.totalHorasExtras = $scope.totalHorasExtras;
                        }
                    } else {
                        empleado.totalGanado = totalGanado;
                        empleado.horasExtras = $scope.horasExtras;
                        empleado.totalHorasExtras = $scope.totalHorasExtras;
                    }

                    empleado.otrosBonos = round($scope.otrosBonos, 2);

                    var fechaActual = new Date();
                    // var fechaNacimiento = new Date(empleado.fecha_nacimiento)
                    var datofedad = $scope.diferenciaEntreDiasEnDias(fechaNacimiento, fechaActual)
                    var edad_empleado = Math.trunc(datofedad / 365);
                    if (empleado.jubilacion == null || !empleado.jubilacion) {
                        if (edad_empleado >= 65) {
                            empleado.afp = round(empleado.totalGanado * 11 / 100, 2);
                        } else {
                            empleado.afp = round(empleado.totalGanado * 12.71 / 100, 2);
                        }

                    } else {
                        if (edad_empleado >= 65) {
                            empleado.afp = round(empleado.totalGanado * $scope.parametros.solo_jubilados_mayor_65 / 100, 2);
                        } else {
                            empleado.afp = round(empleado.totalGanado * $scope.parametros.solo_jubilados_menor_65 / 100, 2);
                        }
                    }

                    if (empleado.totalGanado > $scope.parametros.rango_primero_inicio_solidario) {
                        var diferenciaTotalGanado = empleado.totalGanado - $scope.parametros.rango_primero_inicio_solidario;
                        empleado.afp = round(empleado.afp + (diferenciaTotalGanado * $scope.parametros.rango_primero_fin_solidario / 100), 2)
                    }
                    // empleado.afp = round(empleado.totalGanado * 12.71/100, 2);
                    if (empleado.rc_iva_mes == null) {
                        empleado.rc_iva_mes = 0;
                    }
                    empleado.rc_iva = empleado.rc_iva_mes; // sacar de planilla rc-iva
                    // ==== falta rescatar planilla anticipos =================================================0
                    empleado.anticipos = round(dato.totalAnticipo, 2); // sacar de planilla anticipos 
                    // =========================================================================================
                    empleado.prestamos = round(dato.totalCuotas, 2); // sacar de recursos humanos 
                    empleado.totalDescuento = round(empleado.afp + empleado.rc_iva + empleado.anticipos + empleado.prestamos, 2);
                    empleado.liquidoPagable = round(empleado.totalGanado - empleado.totalDescuento, 2);

                    // SweetAlert.getContent().querySelector('strong').textContent = Math.ceil(SweetAlert.getTimerLeft() / 1000)

                    $scope.sumarTotales(planilla);

                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    SweetAlert.swal("", msg, "error");
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: msg, tipo: 'Error' })
                    })
                });
            }

            async function procesarCalculos(array, planilla) {
                SweetAlert.update({ title: "Realizando Cálculos....." })

                var countE = 0;
                for (const empleado of array) {
                    countE = countE + 1;

                    await realizarCalculos(empleado, planilla, getPercentageChange(array.length, countE));
                }
                $scope.ordenarPlanilla(false);
                console.log('Doneee')
                SweetAlert.swal({
                    title: 'Finalizado!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }

            $scope.filtrarSueldos = function (planilla) {
                // blockUI.start();
                SweetAlert.swal({
                    title: 'Obteniendo empleados...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-search size-icon"></i>',
                    // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
                    html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                RRHHlistaPlanillaSueldos($scope.usuario.id_empresa, planilla.gestion, planilla.mes).then(function (planillaget) {
                    blockUI.noOpen = true;
                    var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                    promesa.then(function (dato) {
                        planilla.RecursosHumanosEmpleados = dato.empleados;
                        procesarCalculos(planilla.RecursosHumanosEmpleados, planilla);
                    });
                });

            };

            $scope.filtrarSueldosR = function (planilla) {
                // blockUI.start();
                SweetAlert.swal({
                    title: 'Obteniendo empleados...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-search"></i>',
                    timer: 1000,
                    timerProgressBar: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })

                SweetAlert.showLoading()
                SweetAlert.stopTimer()
                // SweetAlert.getContent().querySelector('strong').textContent = 0;
                // console.log('cabezera', planilla);
                // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]
                blockUI.noOpen = true;
                RRHHlistaPlanillaSueldos($scope.usuario.id_empresa, planilla.gestion, planilla.mes).then(function (planillaget) {
                    // if (planillaget.planillas.length) {
                    if (true) {
                        // SweetAlert.getTitle().textContent = 'Realizanco Calculos.....'

                        blockUI.noOpen = true;
                        var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                        promesa.then(function (dato) {
                            // console.log('empleadossssstt ', dato);
                            // blockUI.stop();

                            planilla.RecursosHumanosEmpleados = dato.empleados;
                            SweetAlert.resumeTimer()
                            SweetAlert.increaseTimer(planilla.RecursosHumanosEmpleados.length * 60);
                            SweetAlert.update({ title: "Realizando Calculos....." })
                            // $scope.RecursosHumanosEmpleados.fecha_nacimiento_texto = $scope.fechaATexto($scope.RecursosHumanosEmpleados.persona.fecha_nacimiento);
                            // for(var i = planilla.RecursosHumanosEmpleados.length-1; i>=0; i--){
                            //     var empleado = planilla.RecursosHumanosEmpleados[i];
                            var countE = 0;
                            planilla.RecursosHumanosEmpleados.map(function (empleado, indexE, arrE) {
                                blockUI.noOpen = true;
                                promesa = RecursosHumanosEmpleadosHorasExtras(empleado.id_ficha, planilla.gestion, planilla.mes.split("-")[0], empleado.id);
                                promesa.then(function (dato) {
                                    empleado.sueldoBasico = empleado.haber_basico;

                                    // var start = Math.floor(empled.getTime() / (3600 * 24 * 1000)); //days as integer from..
                                    // var end = Math.floor(ultimoDia.getTime() / (3600 * 24 * 1000)); //days as integer from..
                                    // var diasTrabajo = end - start; // exact dates
                                    $scope.diasRolTurnos = 0;
                                    $scope.nochesRolTurnos = 0;
                                    $scope.descansosRolTurnos = 0;
                                    if (dato.rolesTurno.length > 0) {
                                        $scope.empleadosRolTurno = dato.rolesTurno;
                                        var fechaHoy = new Date()
                                        var ultimoDiaMes = new Date(fechaHoy.getFullYear(), 12, 0).getDate();
                                        var mesfiltro = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]), 0);

                                        var primerDia = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                                        // console.log("primerDia =======", primerDia);
                                        var ultimoDia = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, mesfiltro.getDate(), 23, 59, 59);

                                        $scope.filtroRolCal = { fin: ultimoDiaMes + "/12/" + fechaHoy.getFullYear(), fin2: $scope.fechaString(ultimoDia), inicio: "01/01/2015", inicio2: $scope.fechaString(primerDia) }

                                        $scope.realizarCalendarioTrabajo($scope.filtroRolCal, $scope.empleadosRolTurno);
                                        var df = $scope.parseDate($scope.filtroRolCal.inicio2); //desde
                                        var dt = $scope.parseDate($scope.filtroRolCal.fin2); // hasta
                                        var result = [];
                                        var countTD = 0;
                                        var countNT = 0;
                                        var countDD = 0;

                                        for (var index = 0; index < $scope.empleadosRolTurno.length; index++) {
                                            var rolesT = $scope.empleadosRolTurno[index];
                                            for (var i = 0; i < rolesT.diasAnio.length; i++) {
                                                var tf = $scope.parseDate(rolesT.diasAnio[i].fecha),
                                                    tt = $scope.parseDate(rolesT.diasAnio[i].fecha);
                                                if (tf >= df && tt <= dt) {
                                                    if (rolesT.diasAnio[i].texto == "T") {
                                                        countTD = countTD + 1;
                                                    } else if (rolesT.diasAnio[i].texto == "NT") {
                                                        countNT = countNT + 1;
                                                    } else if (rolesT.diasAnio[i].texto == "D") {
                                                        countDD = countDD + 1
                                                    }
                                                    result.push(rolesT.diasAnio[i]);
                                                }
                                            }

                                        }

                                        $scope.nochesRolTurnos = countNT;
                                        $scope.diasRolTurnos = countTD;
                                        $scope.descansosRolTurnos = countDD;
                                    }

                                    var mes = new Date(planilla.gestion, parseInt(planilla.mes), 0);
                                    var ultimoDiaT = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate() > 30 ? mes.getDate() - 1 : mes.getDate(), 23, 59, 59);

                                    // var diasTrabajo = ultimoDia - new Date(empleado.fecha_inicio);
                                    var empled = new Date(empleado.fecha_inicio);
                                    // var timeDiff = Math.abs(mes.getTime() - empled.getTime());
                                    var timeDiff = Math.abs(ultimoDiaT.getTime() - empled.getTime());

                                    if (empleado.id == 4915) {
                                        console.log(empleado);
                                    }

                                    countE = countE + 1;
                                    console.log("counttt ", arrE.length - countE);
                                    // SweetAlert.getContent().querySelector('strong').textContent = arrE.length-countE;

                                    if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) == empled.getMonth() + 1 && empled.getFullYear() == planilla.gestion) {
                                        timeDiff = Math.abs(ultimoDiaT.getTime() - empled.getTime());
                                    } else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth() + 1 && empled.getFullYear() == planilla.gestion) {
                                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                                        var primerDiafl = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                                        timeDiff = Math.abs(fecha_expiracionE.getTime() - primerDiafl.getTime());
                                    } else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth() + 1 && empled.getFullYear() != planilla.gestion) {
                                        var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                                        fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                                        var primerDiafl = new Date(planilla.gestion, parseInt(planilla.mes.split("-")[0]) - 1, 1, 0, 0, 0);
                                        timeDiff = Math.abs(fecha_expiracionE.getTime() - primerDiafl.getTime());
                                    }

                                    var diasTrabajo = Math.ceil(timeDiff / (1000 * 3600 * 24));

                                    if (diasTrabajo >= 30) {
                                        diasTrabajo = 30;
                                    }

                                    empleado.dt = diasTrabajo;
                                    empleado.ganado = round(empleado.sueldoBasico / 30 * empleado.dt, 2);
                                    $scope.horasExtras = 8; // == sacar horas extras ==================
                                    // console.log('ficha fecha inicio ==== ', empleado.fecha_inicio);
                                    var ultimoDiaMesBono = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
                                    $scope.antiguedad = calcAge(empleado.fecha_inicio, ultimoDiaMesBono); // == sacar años de antiguedad ==================
                                    // console.log("$scope.antiguedad", $scope.antiguedad);
                                    $scope.bonoFrontera = 0; // == sacar bono frontera ==================
                                    $scope.otrosBonos = 0; // == sacar otros bonos ==================
                                    // $scope.horasExtras = 10;
                                    // var totalHoras = "";
                                    // var timeHoras = 0;
                                    // var timeMinutos = 0;
                                    // if (dato.horasExtra.length > 0) {
                                    //     for (var i = 0; i < dato.horasExtra.length; i++) {
                                    //         var minutos = dato.horasExtra[i].tiempo.split(':')[1];
                                    //         var horas = dato.horasExtra[i].tiempo.split(':')[0];

                                    //         timeHoras = timeHoras + parseInt(horas);
                                    //         timeMinutos = timeMinutos + parseInt(minutos);
                                    //         if (timeMinutos >= 60) {
                                    //             timeMinutos = timeMinutos - 60;
                                    //             timeHoras = timeHoras + 1;
                                    //         }
                                    //         // totalHoras = String("0" + timeHoras).slice(-2) + ':' + String("0" + timeMinutos).slice(-2);
                                    //         totalHoras = timeHoras;
                                    //     }
                                    // }else{
                                    //     totalHoras = 0;
                                    // }

                                    // === calculo de horas extras =======
                                    empleado.horasExtrasRol = 6;
                                    empleado.diasRolTurnos = $scope.diasRolTurnos;
                                    $scope.extrasDT = empleado.diasRolTurnos * empleado.horasExtrasRol;

                                    empleado.horasExtrasR = dato.totalHoras + dato.totalHorasOrdinario;
                                    // empleado.horasExtras = empleado.horasExtrasR + $scope.extrasDT;
                                    if (empleado.bono_dias) {
                                        $scope.horasExtras = 0;
                                        var trabajos = $scope.diasRolTurnos * empleado.costo_campo;
                                        var descansos = $scope.descansosRolTurnos * empleado.costo_descanso;
                                        var sumaTD = trabajos + descansos;
                                        $scope.otrosBonos += round(sumaTD, 2);
                                    } else {
                                        $scope.horasExtras = empleado.horasExtrasR + $scope.extrasDT;
                                    }
                                    // empleado.totalHorasExtras = round((empleado.sueldoBasico/30/8*empleado.horasExtras)*2, 2);
                                    $scope.totalHorasExtras = round((empleado.sueldoBasico / 30 / 8 * $scope.horasExtras) * 2, 2);
                                    // empleado.recargoNocturno= round((empleado.ganado/30/8*empleado.horasExtras)*1.5, 2);
                                    empleado.recargoNocturno = round((empleado.sueldoBasico / 30 * $scope.nochesRolTurnos) * 35 / 100, 2);
                                    empleado.bonoAntiguedad = $scope.calcularBonoAntiguedad($scope.antiguedad);

                                    $scope.area_frontera = $scope.parametros.areas_frontera.find(function (item_area) {
                                        return item_area.area.nombre == empleado.area
                                    });

                                    $scope.area_hbd = $scope.parametros.areas_hbd.find(function (item_area) {
                                        return item_area.area.nombre == empleado.area
                                    });

                                    if ($scope.area_frontera != undefined) {
                                        // calculo bono frontera ==============================================
                                        if ($scope.parametros.frontera_porcentaje) {
                                            $scope.bonoFrontera = round(empleado.sueldoBasico * $scope.parametros.frontera_monto / 100, 2);
                                        } else {
                                            $scope.bonoFrontera = $scope.parametros.frontera_monto;
                                        }

                                    }

                                    empleado.bonoFrontera = $scope.bonoFrontera;
                                    var fechaNacimiento = new Date(empleado.fecha_nacimiento);
                                    // condicion de fecha de nacimiento mes y mes filtro
                                    if (parseInt(planilla.mes.split("-")[0]) - 1 == fechaNacimiento.getMonth() && $scope.area_hbd != undefined) {
                                        // calculo bono cumpleañero ==============================================
                                        if ($scope.parametros.hbd_porcentaje) {
                                            $scope.otrosBonos += round(empleado.sueldoBasico * $scope.parametros.hbd_monto / 100, 2);
                                        } else {
                                            $scope.otrosBonos += $scope.parametros.hbd_monto;
                                        }

                                    }

                                    var totalGanado = round(empleado.ganado + $scope.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);

                                    if (empleado.total_ganado_fijo) {
                                        if (totalGanado < empleado.monto_total_ganado) {
                                            var diferencia = empleado.monto_total_ganado - totalGanado;
                                            $scope.otrosBonos += diferencia;
                                            empleado.totalGanado = round(empleado.ganado + $scope.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);
                                            empleado.horasExtras = $scope.horasExtras;
                                            empleado.totalHorasExtras = $scope.totalHorasExtras;
                                        } else if (totalGanado > empleado.monto_total_ganado) {
                                            var diferencia = totalGanado - empleado.monto_total_ganado;
                                            var RHorasExtras = $scope.totalHorasExtras / $scope.horasExtras;
                                            var nuevoTotalExtras = $scope.totalHorasExtras - diferencia;
                                            var nuevoHorasExtras = nuevoTotalExtras / RHorasExtras;
                                            empleado.horasExtras = round(nuevoHorasExtras, 2);
                                            empleado.totalHorasExtras = round(nuevoTotalExtras, 2);
                                            empleado.totalGanado = round(empleado.ganado + empleado.totalHorasExtras + empleado.recargoNocturno + empleado.bonoAntiguedad + empleado.bonoFrontera + $scope.otrosBonos, 2);

                                        } else {
                                            empleado.totalGanado = totalGanado;
                                            empleado.horasExtras = $scope.horasExtras;
                                            empleado.totalHorasExtras = $scope.totalHorasExtras;
                                        }
                                    } else {
                                        empleado.totalGanado = totalGanado;
                                        empleado.horasExtras = $scope.horasExtras;
                                        empleado.totalHorasExtras = $scope.totalHorasExtras;
                                    }

                                    empleado.otrosBonos = round($scope.otrosBonos, 2);

                                    if (empleado.jubilacion == null || !empleado.jubilacion) {
                                        var fechaActual = new Date();
                                        // var fechaNacimiento = new Date(empleado.fecha_nacimiento)
                                        var datofedad = $scope.diferenciaEntreDiasEnDias(fechaNacimiento, fechaActual)
                                        var edad_empleado = Math.trunc(datofedad / 365);

                                        if (edad_empleado >= 65) {
                                            empleado.afp = round(empleado.totalGanado * 11 / 100, 2);
                                        } else {
                                            empleado.afp = round(empleado.totalGanado * 12.71 / 100, 2);
                                        }

                                    } else {
                                        empleado.afp = round(empleado.totalGanado * $scope.parametros.solo_jubilados / 100, 2);
                                    }
                                    // empleado.afp = round(empleado.totalGanado * 12.71/100, 2);
                                    if (empleado.rc_iva_mes == null) {
                                        empleado.rc_iva_mes = 0;
                                    }
                                    empleado.rc_iva = empleado.rc_iva_mes; // sacar de planilla rc-iva
                                    // ==== falta rescatar planilla anticipos =================================================0
                                    empleado.anticipos = round(dato.totalAnticipo, 2); // sacar de planilla anticipos 
                                    // =========================================================================================
                                    empleado.prestamos = round(dato.totalCuotas, 2); // sacar de recursos humanos 
                                    empleado.totalDescuento = round(empleado.afp + empleado.rc_iva + empleado.anticipos + empleado.prestamos, 2);
                                    empleado.liquidoPagable = round(empleado.totalGanado - empleado.totalDescuento, 2);

                                    // SweetAlert.getContent().querySelector('strong').textContent = Math.ceil(SweetAlert.getTimerLeft() / 1000)
                                    if (arrE.length - 1 == indexE) {
                                        // SweetAlert.close()
                                        SweetAlert.swal({
                                            title: 'Finalizado!',
                                            icon: 'success',
                                            timer: 2000,
                                            showConfirmButton: false
                                        })
                                    }

                                    $scope.sumarTotales(planilla);



                                });

                                // empleado.horasExtras = $scope.horasExtras;        

                            });
                            $scope.ordenarPlanilla(false);



                        });

                    } else {

                        $scope.message = "Ya se creo planilla para este periodo " + "'" + planilla.mes.split("-")[1] + "-" + planilla.gestion + "'";
                        $scope.mostrarMensaje($scope.message);

                    }
                    // blockUI.stop();
                });
            }

            $scope.filtrarSueldos22 = function (planilla) {
                blockUI.start();
                var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa);
                promesa.then(function (dato) {
                    blockUI.stop();
                    planilla.RecursosHumanosEmpleados = dato.empleados;

                });

            }

            $scope.generar = function (planilla) {
                $scope.buscarPlanilla = "";
                $scope.ordenPlanillas = true;
                blockUI.start();
                planilla.$save(function (dato) {
                    $scope.nuevaPlanillaSueldos();
                    blockUI.stop();
                    // console.log('llego ', dato);
                    // $scope.cerrarPopPupEdicion();
                    SweetAlert.swal("Guardado!", "Planilla registrada exitosamente!", "success");
                    // $scope.recargarItemsTabla();
                    // $scope.imprimirCompra(compra);
                }, function (error) {

                    blockUI.stop();
                    console.log('fallo ', error);
                    // $scope.cerrarPopPupEdicion();
                    // $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                    // $scope.recargarItemsTabla();
                });
                // console.log('los datos  de planilla ', planilla);
            }

            // funcion para convertir las horas en minutos
            function HMToDecimal(hora, minuto) {
                var d1 = hora;
                var m1 = minuto;
                var d = eval(d1);
                var m = eval(m1);

                var dH = Math.abs(d) + (m / 60);
                console.log('en decimal es ', round(dH, 2));
                return round(dH, 2);

            }

            // funcion para calcular los años de antiguedad 
            function calcAge(dateString, fechaFin) {
                var dateInicio = new Date(dateString);
                if (dateInicio.getDate() == 1) {
                    dateInicio.setDate(dateInicio.getDate() + 1);
                }
                var birthday = +new Date(dateInicio);
                return ~~((new Date(fechaFin) - birthday) / (31557600000));
            }

            // para redondeo de numeros
            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.sumarTotales = function (planilla) {
                $scope.totalSueldoBasico = 0;
                $scope.totalGanadoSueldo = 0;
                $scope.sumaHorasExtras = 0;
                $scope.sumaTotalHorasExtras = 0;
                $scope.sumaRecargoNocturno = 0;
                $scope.sumaBonoAntiguedad = 0;
                $scope.sumaBonoFrontera = 0;
                $scope.sumaOtrosBonos = 0;
                $scope.sumaTotalGanado = 0;
                $scope.sumaAFP = 0;
                $scope.sumaRCIVA = 0;
                $scope.sumaAniticipos = 0;
                $scope.sumaPrestamos = 0;
                $scope.sumaTotalDescuento = 0;
                $scope.sumaLiquidoPagable = 0;
                var totalEmpleados = 0;
                if (planilla.RecursosHumanosEmpleados != undefined) {
                    for (var i = planilla.RecursosHumanosEmpleados.length - 1; i >= 0; i--) {
                        // for(var i=0;i<planilla.RecursosHumanosEmpleados.length;i++){
                        totalEmpleados = totalEmpleados + 1;
                        $scope.totalGanadoSueldo = round($scope.totalGanadoSueldo + planilla.RecursosHumanosEmpleados[i].ganado, 2);
                        $scope.totalSueldoBasico = round($scope.totalSueldoBasico + planilla.RecursosHumanosEmpleados[i].sueldoBasico, 2);
                        $scope.sumaHorasExtras = round($scope.sumaHorasExtras + planilla.RecursosHumanosEmpleados[i].horasExtras, 2);
                        $scope.sumaTotalHorasExtras = round($scope.sumaTotalHorasExtras + planilla.RecursosHumanosEmpleados[i].totalHorasExtras, 2);
                        $scope.sumaRecargoNocturno = round($scope.sumaRecargoNocturno + planilla.RecursosHumanosEmpleados[i].recargoNocturno, 2);
                        $scope.sumaBonoAntiguedad = round($scope.sumaBonoAntiguedad + planilla.RecursosHumanosEmpleados[i].bonoAntiguedad, 2);
                        $scope.sumaBonoFrontera = round($scope.sumaBonoFrontera + planilla.RecursosHumanosEmpleados[i].bonoFrontera, 2);
                        $scope.sumaOtrosBonos = round($scope.sumaOtrosBonos + planilla.RecursosHumanosEmpleados[i].otrosBonos, 2);
                        $scope.sumaTotalGanado = round($scope.sumaTotalGanado + planilla.RecursosHumanosEmpleados[i].totalGanado, 2);
                        $scope.sumaAFP = round($scope.sumaAFP + planilla.RecursosHumanosEmpleados[i].afp, 2);
                        $scope.sumaRCIVA = round($scope.sumaRCIVA + planilla.RecursosHumanosEmpleados[i].rc_iva, 2);
                        $scope.sumaAniticipos = round($scope.sumaAniticipos + planilla.RecursosHumanosEmpleados[i].anticipos, 2);
                        $scope.sumaPrestamos = round($scope.sumaPrestamos + planilla.RecursosHumanosEmpleados[i].prestamos, 2);
                        $scope.sumaTotalDescuento = round($scope.sumaTotalDescuento + planilla.RecursosHumanosEmpleados[i].totalDescuento, 2);
                        $scope.sumaLiquidoPagable = round($scope.sumaLiquidoPagable + planilla.RecursosHumanosEmpleados[i].liquidoPagable, 2);
                    }
                }
                planilla.totalEmpleados = totalEmpleados;
                planilla.importeSueldoBasico = $scope.totalSueldoBasico;
                planilla.importe_ganado = $scope.totalGanadoSueldo;
                planilla.totalHorasExtras = $scope.sumaHorasExtras;
                planilla.importeHorasExtras = $scope.sumaTotalHorasExtras;
                planilla.importeRecargoNocturno = $scope.sumaRecargoNocturno;
                planilla.importeBonoAntiguedad = $scope.sumaBonoAntiguedad;
                planilla.importeBonoFrontera = $scope.sumaBonoFrontera;
                planilla.importeOtrosBonos = $scope.sumaOtrosBonos;
                planilla.importeAFP = $scope.sumaAFP;
                planilla.importeRCIVA = $scope.sumaRCIVA;
                planilla.importeAniticipos = $scope.sumaAniticipos;
                planilla.importePrestamos = $scope.sumaPrestamos;
                planilla.importeTotalDescuento = $scope.sumaTotalDescuento;
                planilla.importeTotalGanado = $scope.sumaTotalGanado;
                planilla.importeLiquidoPagable = $scope.sumaLiquidoPagable;

            }


            $scope.calcularBonoAntiguedad = function (antiguedad) {
                if (antiguedad >= 0 && antiguedad <= 1) {
                    // "es de 0 a 2"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_cero_uno / 100;
                }
                if (antiguedad >= 2 && antiguedad <= 4) {
                    // "es de 2 a 5"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_dos_cuatro / 100;
                }
                if (antiguedad >= 5 && antiguedad <= 7) {
                    // "es de 5 a 8"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_cinco_siete / 100;
                }
                if (antiguedad >= 8 && antiguedad <= 10) {
                    // "es de 8 a 11"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_ocho_diez / 100;
                }
                if (antiguedad >= 11 && antiguedad <= 14) {
                    // "es de 11 a 15"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_once_catorce / 100;
                }
                if (antiguedad >= 15 && antiguedad <= 19) {
                    // "es de 15 a 20"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_quice_diecinueve / 100;
                }
                if (antiguedad >= 20 && antiguedad <= 24) {
                    // "es de 20 a 25"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_veinte_veinticuatro / 100;
                }
                if (antiguedad >= 25) {
                    // "es de mayor a 25"
                    return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_mas_veinticinco / 100;
                }
            }

            $scope.cerrarDialogNuevaPlanillaSueldos = function () {
                $scope.buscarPlanilla = "";
                $scope.cerrarPopup($scope.idModalNuevaPlanillaSueldos);
            }

            $scope.obtenerParametros = function (idEmpresa) {
                blockUI.start();
                if (idEmpresa == null) {
                    idEmpresa = 0;
                }
                var promesa = Parametros(idEmpresa);
                promesa.then(function (parametros) {
                    $scope.parametros = parametros;
                    blockUI.stop();
                });
            }

            $scope.parametroHoraExtra = {};
            $scope.agregarHoraExtraCampo = function (parametroHoraExtra) {
                $scope.seCambio = true;
                if ($scope.parametros.campos_horas_extras.some(function (campoHE, j) {
                    return campoHE.campo.id == parametroHoraExtra.campo.id
                })) {
                    if ($scope.parametros.campos_horas_extras.some(function (campoHE, j) {
                        return campoHE.campo.id == parametroHoraExtra.campo.id && campoHE.fin_mes == null
                    })) {
                        SweetAlert.swal("", "ya existe el campo pero no esta finalizado", "warning");
                    } else {

                        var newArrayCamposHorasExtras = $scope.parametros.campos_horas_extras.filter((campoHE) => {
                            return (campoHE.campo.id == parametroHoraExtra.campo.id)
                        });
                        var UltimoCampo = newArrayCamposHorasExtras[newArrayCamposHorasExtras.length - 1];

                        var finsum = UltimoCampo.fin_mes ? Number(UltimoCampo.fin_mes.split('/')[0]) + Number(UltimoCampo.fin_mes.split('/')[1]) : 0;
                        var inisumParam = Number(parametroHoraExtra.inicio_mes.split('/')[0]) + Number(parametroHoraExtra.inicio_mes.split('/')[1]);
                        if (inisumParam > finsum) {
                            $scope.parametros.campos_horas_extras.push(parametroHoraExtra);
                            $scope.parametroHoraExtra = {};
                        } else {
                            SweetAlert.swal("", "el mes de inicio tiene que ser mayor a " + UltimoCampo.fin_mes, "warning");
                        }
                    }
                } else {
                    $scope.parametros.campos_horas_extras.push(parametroHoraExtra);
                    $scope.parametroHoraExtra = {};
                }
            }

            $scope.abrirModalVerificarCuenta = function (data) {
                // $scope.inputActivado = data
                $scope.campo_hora_extra = data;
                $scope.campo_hora_extraPrev = {};
                angular.copy(data, $scope.campo_hora_extraPrev);
                SweetAlert.swal({
                    title: 'Verificar Cuenta',
                    html: '<input type="text" id="username" class="swal2-input" placeholder="Nombre Usuario" value="' + $scope.usuario.nombre_usuario + '"></input>' +
                        '<input type="password" id="password" class="swal2-input" placeholder="Clave"></input>',
                    confirmButtonText: 'Login',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        let username = SweetAlert.getContent().querySelector('#username').value
                        let password = SweetAlert.getContent().querySelector('#password').value
                        if (username === '' || password === '') {
                            SweetAlert.showValidationMessage(`Nombre de usuario / Clave vacía`)
                            return false
                        } else {
                            return { username: username, password: password }
                        }
                    }
                }).then((result) => {
                    if (result.value) {
                        // SweetAlert.swal(`Username: ${result.value.username}\nPassword: ${result.value.password}`)
                        var cuenta = {
                            nombre_usuario: result.value.username,
                            clave: result.value.password
                        };
                        $scope.verificarCuentaAdmin(cuenta);
                    }
                })
            }
            $scope.verificarCuentaAdmin = function (cuenta) {
                const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa, cuenta)
                promesa.then(function (dato) {

                    if (dato.type) {
                        SweetAlert.swal({
                            title: dato.message,
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                            onClose: function () {

                            }
                        })
                        $scope.abrirPopup($scope.idModalParametroHoraExtraC);
                    } else {
                        SweetAlert.swal(dato.message, "", "warning");
                    }
                })
            }

            $scope.cerrarDialogParametroHorasExt = function () {
                $scope.cerrarPopup($scope.idModalParametroHoraExtraC);
            }

            $scope.guardarHoraExtraCampo = function (campo_hora_extraPrev) {
                $scope.seCambio = true;
                var finsum = campo_hora_extraPrev.fin_mes ? Number(campo_hora_extraPrev.fin_mes.split('/')[0]) + Number(campo_hora_extraPrev.fin_mes.split('/')[1]) : 0;
                var inisumParam = Number(campo_hora_extraPrev.inicio_mes.split('/')[0]) + Number(campo_hora_extraPrev.inicio_mes.split('/')[1]);
                if (finsum >= inisumParam) {
                    $scope.campo_hora_extra.fin_mes = campo_hora_extraPrev.fin_mes;
                    $scope.cerrarDialogParametroHorasExt();
                } else {
                    SweetAlert.swal("", "el mes fin tiene que ser mayor a " + campo_hora_extraPrev.inicio_mes, "warning");
                }
            }

            $scope.abrirDialogEditarPlanillaSueldo = function (empleado) {
                $scope.empleado = empleado;
                $scope.sueldo = angular.copy(empleado);
                $scope.abrirPopup($scope.idModalEditarPlanillaSueldo);
            }

            $scope.modificarSueldo = function (sueldo) {
                $scope.empleado = angular.extend($scope.empleado, sueldo);
                $scope.sumarTotales($scope.planilla);
                $scope.cerrarDialogEditarPlanillaSueldo();
            }

            $scope.cerrarDialogEditarPlanillaSueldo = function () {
                $scope.cerrarPopup($scope.idModalEditarPlanillaSueldo);
            }

            $scope.cerrarDialogEliminarSueldoEmpleado = function () {
                $scope.cerrarPopup($scope.idEliminarSueldoEmpleado);
            }

            $scope.abrirDialogEliminarSueldoEmpleado = function ($index, empleado) {
                $scope.empleado = empleado;
                $scope.index = $index;

                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Esta seguro de eliminar el sueldo seleccionado de:" + "\n" + empleado.nombre_completo + "!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.eliminarSueldoEmpleado($scope.index);
                    }
                });
            }

            // ========= solucionar eliminar sueldo no sta eliminando correctamente ==================
            $scope.eliminarSueldoEmpleado = function (index, empleado) {
                $scope.planilla.RecursosHumanosEmpleados.splice(index, 1);
                $scope.sumarTotales($scope.planilla);
                $scope.empleado = null;
                SweetAlert.swal("Eliminado!", "El sueldo se elimino", "success");
            }

            $scope.calcularTotalEditados = function () {
                $scope.sueldo.ganado = round($scope.sueldo.sueldoBasico / 30 * $scope.sueldo.dt, 2);
                // $scope.extrasDT = $scope.sueldo.diasRolTurnos * $scope.sueldo.horasExtrasRol;
                $scope.sueldo.horasExtras = $scope.sueldo.horasExtrasR + $scope.sueldo.diasRolTurnos * $scope.sueldo.horasExtrasRol;

                $scope.sueldo.totalHorasExtras = round(($scope.sueldo.ganado / 30 / 8 * $scope.sueldo.horasExtras) * 2, 2);
                $scope.sueldo.recargoNocturno = Math.round(($scope.sueldo.ganado / 30 / 8 * $scope.sueldo.horasExtras) * 1.5);
                $scope.sueldo.totalGanado = round($scope.sueldo.ganado + $scope.sueldo.totalHorasExtras + $scope.sueldo.recargoNocturno + $scope.sueldo.bonoAntiguedad + $scope.sueldo.bonoFrontera + $scope.sueldo.otrosBonos, 2);
                $scope.sueldo.afp = round($scope.sueldo.totalGanado * 12.71 / 100, 2);
                $scope.sueldo.totalDescuento = round($scope.sueldo.afp + $scope.sueldo.rc_iva + $scope.sueldo.anticipos + $scope.sueldo.prestamos, 2);
                $scope.sueldo.liquidoPagable = round($scope.sueldo.totalGanado - $scope.sueldo.totalDescuento, 2);
            }

            $scope.pl = {};
            $scope.filtrarListaPlanillaSueldos = function (planilla) {
                // console.log('cabezera generalllllll ', planilla);
                // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]

                var promesa = RRHHlistaPlanillaSueldos($scope.usuario.id_empresa, planilla.gestion, planilla.mes);
                promesa.then(function (dato) {
                    $scope.pl.planillas = dato.planillas;
                    $scope.sumaTotalPlanillas($scope.pl.planillas);
                    blockUI.stop();
                });
            }

            $scope.totalesPlanillaSueldos = {
                sueldoBasico: 0,
                horasExtras: 0,
                totalHorasExtras: 0,
                recargoNocturno: 0,
                bonoAntiguedad: 0,
                bonoFrontera: 0,
                otrosBonos: 0,
                totalGanado: 0,
                afp: 0,
                rc_iva: 0,
                anticipos: 0,
                prestamos: 0,
                totalDescuento: 0,
                liquidoPagable: 0
            };

            $scope.sumaTotalPlanillas = function (planillas) {
                $scope.totalesPlanillaSueldos = {
                    sueldoBasico: 0,
                    horasExtras: 0,
                    totalHorasExtras: 0,
                    recargoNocturno: 0,
                    bonoAntiguedad: 0,
                    bonoFrontera: 0,
                    otrosBonos: 0,
                    totalGanado: 0,
                    afp: 0,
                    rc_iva: 0,
                    anticipos: 0,
                    prestamos: 0,
                    totalDescuento: 0,
                    liquidoPagable: 0
                };
                if (planillas.length) {
                    planillas.forEach(function (planilla, index, array) {
                        $scope.totalesPlanillaSueldos.sueldoBasico += planilla.importe_sueldo_basico;
                        $scope.totalesPlanillaSueldos.horasExtras += planilla.importe_horas_extras;
                        $scope.totalesPlanillaSueldos.totalHorasExtras += planilla.total_horas_extras;
                        $scope.totalesPlanillaSueldos.recargoNocturno += planilla.importe_recargo_nocturno;
                        $scope.totalesPlanillaSueldos.bonoAntiguedad += planilla.importe_bono_antiguedad;
                        $scope.totalesPlanillaSueldos.bonoFrontera += planilla.importe_bono_frontera;
                        $scope.totalesPlanillaSueldos.otrosBonos += planilla.importe_otros_bonos;
                        $scope.totalesPlanillaSueldos.totalGanado += planilla.importe_total_ganado;
                        $scope.totalesPlanillaSueldos.afp += planilla.importe_afp;
                        $scope.totalesPlanillaSueldos.rc_iva += planilla.importe_rc_iva;
                        $scope.totalesPlanillaSueldos.anticipos += planilla.importe_anticipos;
                        $scope.totalesPlanillaSueldos.prestamos += planilla.importe_prestamos;
                        $scope.totalesPlanillaSueldos.totalDescuento += planilla.importe_total_descuento;
                        $scope.totalesPlanillaSueldos.liquidoPagable += planilla.importe_liquido_pagable;
                    });
                }
            }

            $scope.roundT = function (value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.obtenerTiposMetodosDias = function () {
                blockUI.start();
                var promesa = ClasesTipo("TIPO_METODO_DIAS");
                promesa.then(function (entidad) {
                    $scope.tiposMetodosDias = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.abrirDialogParametros = function () {
                $scope.seCambio = false;
                $scope.seleccionarAreaFrontera($scope.parametros.areas_frontera);
                $scope.seleccionarAreaHBD($scope.parametros.areas_hbd);
                $scope.obtenerTiposMetodosDias();
                $scope.abrirPopup($scope.idModalParametros);
            }
            $scope.cerrarDialogParametros = function (cambios) {
                if ($scope.seCambio || cambios.$dirty) {
                    // console.log(cambios)
                    SweetAlert.swal({
                        title: "Se realizo cambios en parametros!",
                        text: "Desea guardar los cambios?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si',
                        cancelButtonText: "No"
                    }).then(function (result) {
                        if (result.value) {
                            cambios.$setPristine();
                            Parametro.update({ idEmpresa: $scope.usuario.id_empresa }, $scope.parametros, function (res) {
                                $scope.cerrarPopup($scope.idModalParametros);
                                SweetAlert.swal("Guardado!", res.mensaje, "success");
                                $scope.obtenerParametros($scope.usuario.id_empresa);
                                $scope.obtenerAreas();
                            }, function (error) {
                                SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
                            })
                        }else{
                            cambios.$setPristine();
                            $scope.cerrarPopup($scope.idModalParametros);
                            $scope.obtenerParametros($scope.usuario.id_empresa);
                            $scope.obtenerAreas();
                        }
                    });
                }else{
                    $scope.cerrarPopup($scope.idModalParametros);
                }
                
            }

            $scope.abrirDialogImpresion = function (datos) {
                blockUI.start('Cargando');
                $scope.data = datos;
                $scope.empleados = ListaPlanillaSueldosDetalle(datos.id);
                $scope.empleados.then(function (datosEmpleado) {
                    $scope.planilla = datosEmpleado;
                    $scope.lugaresSeguroSalud = datosEmpleado.lugares_seguro_salud;
                    $scope.areasPlanilla = datosEmpleado.areas_planilla;
                    $scope.ubicacionesPlanilla = datosEmpleado.ubicaciones_planilla;
                    var dataCampos = datosEmpleado.planillas;
                    var campos = dataCampos.map(function (emp) {
                        return emp.DetalleFicha.campo;
                    });

                    $scope.camposUnicos = removeDumplicateCampos(campos);
                });
                blockUI.stop();
                $scope.abrirPopup($scope.idModalImpresion);
            }

            $scope.cerrarDialogImpresion = function () {
                $scope.cerrarPopup($scope.idModalImpresion);
            }
            $scope.editarParametros = function (parametro, guardar) {
                if (guardar == false) {
                    var button = $('#siguiente').text().trim();
                    if (button != "Siguiente") {
                        $scope.guardarParametros(parametro);
                    }
                } else {
                    $scope.guardarParametros(parametro);
                }
            }

            $scope.guardarParametros = function (parametro) {
                blockUI.start();
                $scope.parametros = parametro;
                Parametro.update({ idEmpresa: $scope.usuario.id_empresa }, parametro, function (res) {
                    SweetAlert.swal("Guardado!", res.mensaje, "success");
                    $scope.obtenerParametros($scope.usuario.id_empresa);
                    $scope.obtenerAreas();
                }, function (error) {
                    SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
                })
                blockUI.stop();
                $scope.cerrarDialogParametros();
            }

            $scope.abrirModalbanco = function (banco) {
                $scope.tr3 = { planillasSueldo: [], tipo: "", fecha: new Date() }
                $scope.datosBanco = banco
                const nombre = banco.nombre.split(' ').map(word => word.trim().toUpperCase()).join(' ');
                if (nombre === "BANCO MERCANTIL SANTA CRUZ") {
                    $scope.tr3.tipo = "MSC"
                    $scope.bancoUnion = false
                    $scope.abrirDialogTR3()
                }
                if (nombre === "BANCO UNIÓN") {
                    $scope.tr3.tipo = "BU"
                    $scope.bancoUnion = true
                    $scope.abrirDialogTR3()
                }
                setTimeout(function () {
                    aplicarDatePickers();
                }, 1000);
            }
            $scope.abrirDialogTR3 = function () {
                $scope.abrirPopup($scope.idModalTR3);
            }
            $scope.cerrarDialogTR3 = function () {
                $scope.cerrarPopup($scope.idModalTR3);
            }
            $scope.cerrarDialogHistorialTR3 = function () {
                $scope.cerrarPopup($scope.idModalHistorialTR3);
            }
            $scope.abrirDialogHistorialTR3 = function (banco, tipo) {
                $scope.tipoBanco = tipo
                var promesa = ListaTr3PlanillaSueldo($scope.usuario.id_empresa, banco.nombre)
                promesa.then(function (dato) {
                    $scope.historialTr3 = dato
                    $scope.abrirPopup($scope.idModalHistorialTR3)
                }).catch(function (err) {
                    var men = (err.data !== undefined && err.data !== null) ? err.data : err.message
                    $scope.mostrarMensaje('Se produjo un error! > ' + men)
                    blockUI.stop();
                })
            }

            $scope.obtenerParametros($scope.usuario.id_empresa);

            $scope.puedeEditarPlanilla = false;
            $scope.verPlanilla = function (planilla) {
                $scope.puedeEditarPlanilla = false;
                $scope.abrirPopup($scope.idModalVerPlanillaSueldo);
                $scope.registroIndividual = true
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };
                $scope.dynamicPopoverBancoComprobante = {
                    templateUrl: 'myPopoverBancoComprobante.html',
                };
                var promesa = ListaPlanillaSueldosDetalle(planilla.id);
                promesa.then(function (dato) {
                    $scope.planillaC = planilla;
                    $scope.planillaC.detalles = dato.planillas;
                    // blockUI.stop();
                });
            }

            $scope.capitalizar = function (texto) {
                texto = texto.toLowerCase();
                texto = texto.split(" ");
                for (var i = 0, x = texto.length; i < x; i++) {
                    texto[i] = texto[i][0].toUpperCase() + texto[i].substr(1);
                }

                return texto.join(" ");
            }



            // IMPRIMIR BOLETAS DE PAGO INDIVIDUALES
            $scope.imprimirBoletaIndividual = function (datos, trabajador) {
                var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var gestion = datos.anio;
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                var stream = doc.pipe(blobStream());
                var empleado = trabajador.DetalleFicha.empleado.persona;
                var x = 20, y = 30;
                doc.font('Helvetica-Bold', 9);
                doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('Nombre:', x, y, { width: 80 }); doc.text(empleado.nombre_completo, x + 85, y); y = y + 12;
                doc.text('CI:', x, y, { width: 80 }); doc.text(empleado.ci, x + 85, y); y = y + 12;
                doc.text('Matrícula:', x, y, { width: 80 }); doc.text(trabajador.DetalleFicha.matricula_seguro, x + 85, y); y = y + 12;
                doc.text('Campamento:', x, y, { width: 80 }); doc.text(trabajador.DetalleFicha.campo.nombre, x + 85, y); y = y + 12;
                doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(trabajador.DetalleFicha.fecha_inicio), x + 85, y); y = y + 14;

                doc.font('Helvetica-Bold', 7);
                doc.text('GANADO', x, y); y = y + 12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajador.importe_sueldo_basico, x + 85, y); y = y + 12;
                doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajador.dt, x + 85, y); y = y + 12;
                doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajador.ganado, x + 85, y); y = y + 12;
                doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajador.horas_extras, x + 85, y); y = y + 12;
                doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajador.importe_horas_extras, x + 85, y); y = y + 12;
                doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajador.nt, x + 85, y); y = y + 12;
                doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajador.importe_recargo_nocturno, x + 85, y); y = y + 12;
                doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajador.importe_bono_antiguedad, x + 85, y); y = y + 12;
                doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajador.importe_bono_frontera, x + 85, y); y = y + 12;
                doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajador.importe_otros_bonos, x + 85, y); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajador.total_ganado, x + 85, y); y = y + 14;

                doc.font('Helvetica-Bold', 7);
                doc.text('DESCUENTOS', x, y); y = y + 12;
                doc.font('Helvetica', 6);
                doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajador.afp, x + 85, y); y = y + 12;
                doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajador.DetalleFicha.rrhhDetalleRcIva ? trabajador.DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajador.importe_anticipos, x + 85, y); y = y + 12;
                doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajador.importe_prestamos, x + 85, y); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajador.importe_total_descuento, x + 85, y); y = y + 14;
                doc.font('Helvetica-Bold', 7);
                doc.rect(x - 3, y - 3, x + 100, 12).stroke();
                doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajador.liquido_pagable, x + 85, y); y = y + 12;
                doc.font('Helvetica', 6);
                // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajador.DetalleFicha.rrhhDetalleRcIva ? trabajador.DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                x = 346;
                y = 30;
                //COPIA EMPLEADO
                doc.font('Helvetica-Bold', 9);
                doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('Nombre:', x, y, { width: 80 }); doc.text(empleado.nombre_completo, x + 85, y); y = y + 12;
                doc.text('CI:', x, y, { width: 80 }); doc.text(empleado.ci, x + 85, y); y = y + 12;
                doc.text('Matrícula:', x, y, { width: 80 }); doc.text(trabajador.DetalleFicha.matricula_seguro, x + 85, y); y = y + 12;
                doc.text('Campamento:', x, y, { width: 80 }); doc.text(trabajador.campo, x + 85, y); y = y + 12;
                doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(trabajador.DetalleFicha.fecha_inicio), x + 85, y); y = y + 14;

                doc.font('Helvetica-Bold', 7);
                doc.text('GANADO', x, y); y = y + 12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajador.importe_sueldo_basico, x + 85, y); y = y + 12;
                doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajador.dt, x + 85, y); y = y + 12;
                doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajador.ganado, x + 85, y); y = y + 12;
                doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajador.horas_extras, x + 85, y); y = y + 12;
                doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajador.importe_horas_extras, x + 85, y); y = y + 12;
                doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajador.nt, x + 85, y); y = y + 12;
                doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajador.importe_recargo_nocturno, x + 85, y); y = y + 12;
                doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajador.importe_bono_antiguedad, x + 85, y); y = y + 12;
                doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajador.importe_bono_frontera, x + 85, y); y = y + 12;
                doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajador.importe_otros_bonos, x + 85, y); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajador.total_ganado, x + 85, y); y = y + 14;

                doc.font('Helvetica-Bold', 7);
                doc.text('DESCUENTOS', x, y); y = y + 12;
                doc.font('Helvetica', 6);
                doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajador.afp, x + 85, y); y = y + 12;
                doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajador.DetalleFicha.rrhhDetalleRcIva ? trabajador.DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajador.importe_anticipos, x + 85, y); y = y + 12;
                doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajador.importe_prestamos, x + 85, y); y = y + 12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajador.importe_total_descuento, x + 85, y); y = y + 14;
                doc.font('Helvetica-Bold', 7);
                doc.rect(x - 3, y - 3, 130, 12).stroke();
                doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajador.liquido_pagable, x + 85, y); y = y + 12;
                // doc.rect(x,y,x+85,12).stroke();  
                doc.font('Helvetica', 6);
                doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajador.DetalleFicha.rrhhDetalleRcIva ? trabajador.DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                doc.end();
                //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }
            // IMPRIMIR BOLETAS POR CAMPAMENTO
            $scope.imprimirBoletasCampo = function (datos, planilla, campo) {
                blockUI.start('Generando Boletas');
                var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
                var trabajadores = planilla.planillas.filter(function (trab) {
                    return trab.DetalleFicha.campo.id == campo.id;
                });
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var gestion = datos.anio;
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                var stream = doc.pipe(blobStream());
                var x = 30, y = 30, items = 0; itemsPage = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    //COPIEA EMPRESA
                    var trabajador = trabajadores[i].DetalleFicha.empleado.persona;
                    var ficha = trabajadores[i].DetalleFicha;
                    var nombreCampo = trabajadores[i].campo;
                    if (itemsPage == 0) {
                        doc.font('Helvetica-Bold', 7);
                        doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('Nombre:', x, y, { width: 80 }); doc.text(trabajador.nombre_completo, x + 85, y); y = y + 12;
                        doc.text('CI:', x, y, { width: 80 }); doc.text(trabajador.ci + " " + ficha.empleado.extension.nombre_corto, x + 85, y); y = y + 12;
                        doc.text('Matrícula:', x, y, { width: 80 }); doc.text(ficha.matricula_seguro, x + 85, y); y = y + 12;
                        doc.text('Campamento:', x, y, { width: 80 }); doc.text(nombreCampo, x + 85, y); y = y + 12;
                        doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(ficha.fecha_inicio), x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('GANADO', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_sueldo_basico, x + 85, y); y = y + 12;
                        doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajadores[i].dt, x + 85, y); y = y + 12;
                        doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajadores[i].ganado, x + 85, y); y = y + 12;
                        doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].horas_extras, x + 85, y); y = y + 12;
                        doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_horas_extras, x + 85, y); y = y + 12;
                        doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajadores[i].nt, x + 85, y); y = y + 12;
                        doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_recargo_nocturno, x + 85, y); y = y + 12;
                        doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_antiguedad, x + 85, y); y = y + 12;
                        doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_frontera, x + 85, y); y = y + 12;
                        doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_otros_bonos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].total_ganado, x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('DESCUENTOS', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajadores[i].afp, x + 85, y); y = y + 12;
                        doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                        doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_anticipos, x + 85, y); y = y + 12;
                        doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_prestamos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].importe_total_descuento, x + 85, y); y = y + 14;
                        doc.font('Helvetica-Bold', 7);
                        doc.rect(x - 3, y - 3, x + 100, 12).stroke();
                        doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajadores[i].liquido_pagable, x + 85, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                        doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                        doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                        doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                        x = 346;
                        y = 30;
                        //COPIA EMPLEADO
                        doc.font('Helvetica-Bold', 7);
                        doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('Nombre:', x, y, { width: 80 }); doc.text(trabajador.nombre_completo, x + 85, y); y = y + 12;
                        doc.text('CI:', x, y, { width: 80 }); doc.text(trabajador.ci + " " + ficha.empleado.extension.nombre_corto, x + 85, y); y = y + 12;
                        doc.text('Matrícula:', x, y, { width: 80 }); doc.text(ficha.matricula_seguro, x + 85, y); y = y + 12;
                        doc.text('Campamento:', x, y, { width: 80 }); doc.text(nombreCampo, x + 85, y); y = y + 12;
                        doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(ficha.fecha_inicio), x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('GANADO', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_sueldo_basico, x + 85, y); y = y + 12;
                        doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajadores[i].dt, x + 85, y); y = y + 12;
                        doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajadores[i].ganado, x + 85, y); y = y + 12;
                        doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].horas_extras, x + 85, y); y = y + 12;
                        doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_horas_extras, x + 85, y); y = y + 12;
                        doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajadores[i].nt, x + 85, y); y = y + 12;
                        doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_recargo_nocturno, x + 85, y); y = y + 12;
                        doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_antiguedad, x + 85, y); y = y + 12;
                        doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_frontera, x + 85, y); y = y + 12;
                        doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_otros_bonos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].total_ganado, x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('DESCUENTOS', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajadores[i].afp, x + 85, y); y = y + 12;
                        doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                        doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_anticipos, x + 85, y); y = y + 12;
                        doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_prestamos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].importe_total_descuento, x + 85, y); y = y + 14;
                        doc.font('Helvetica-Bold', 7);
                        doc.rect(x - 3, y - 3, 130, 12).stroke();
                        doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajadores[i].liquido_pagable, x + 85, y);
                        // doc.rect(x,y,x+85,12).stroke();  
                        doc.font('Helvetica', 6);
                        //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  
                        y = y + 12;
                        doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                        doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                        doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                        x = 30;
                        y = 426;
                    }
                    if (itemsPage == 1) {
                        doc.font('Helvetica-Bold', 7);
                        doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('Nombre:', x, y, { width: 80 }); doc.text(trabajador.nombre_completo, x + 85, y); y = y + 12;
                        doc.text('CI:', x, y, { width: 80 }); doc.text(trabajador.ci + " " + ficha.empleado.extension.nombre_corto, x + 85, y); y = y + 12;
                        doc.text('Matrícula:', x, y, { width: 80 }); doc.text(ficha.matricula_seguro, x + 85, y); y = y + 12;
                        doc.text('Campamento:', x, y, { width: 80 }); doc.text(nombreCampo, x + 85, y); y = y + 12;
                        doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(ficha.fecha_inicio), x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('GANADO', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_sueldo_basico, x + 85, y); y = y + 12;
                        doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajadores[i].dt, x + 85, y); y = y + 12;
                        doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajadores[i].ganado, x + 85, y); y = y + 12;
                        doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].horas_extras, x + 85, y); y = y + 12;
                        doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_horas_extras, x + 85, y); y = y + 12;
                        doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajadores[i].nt, x + 85, y); y = y + 12;
                        doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_recargo_nocturno, x + 85, y); y = y + 12;
                        doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_antiguedad, x + 85, y); y = y + 12;
                        doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_frontera, x + 85, y); y = y + 12;
                        doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_otros_bonos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].total_ganado, x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('DESCUENTOS', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajadores[i].afp, x + 85, y); y = y + 12;
                        doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                        doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_anticipos, x + 85, y); y = y + 12;
                        doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_prestamos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].importe_total_descuento, x + 85, y); y = y + 14;
                        doc.font('Helvetica-Bold', 7);
                        doc.rect(x - 3, y - 3, x + 100, 12).stroke();
                        doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajadores[i].liquido_pagable, x + 85, y);
                        doc.font('Helvetica', 6);
                        //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4); 
                        y = y + 12;
                        doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                        doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                        doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                        x = 346;
                        y = 426;
                        //COPIA EMPLEADO
                        doc.font('Helvetica-Bold', 7);
                        doc.text('BOLETA DEL MES DE ' + mes + ' DE ' + gestion, x, y, { width: 210, align: 'center' }); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('Nombre:', x, y, { width: 80 }); doc.text(trabajador.nombre_completo, x + 85, y); y = y + 12;
                        doc.text('CI:', x, y, { width: 80 }); doc.text(trabajador.ci + " " + ficha.empleado.extension.nombre_corto, x + 85, y); y = y + 12;
                        doc.text('Matrícula:', x, y, { width: 80 }); doc.text(ficha.matricula_seguro, x + 85, y); y = y + 12;
                        doc.text('Campamento:', x, y, { width: 80 }); doc.text(nombreCampo, x + 85, y); y = y + 12;
                        doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.text($scope.fechaATexto(ficha.fecha_inicio), x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('GANADO', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('Sueldo Básico:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_sueldo_basico, x + 85, y); y = y + 12;
                        doc.text('Días Trabajados:', x, y, { width: 80 }); doc.text(trabajadores[i].dt, x + 85, y); y = y + 12;
                        doc.text('Sueldo Ganado:', x, y, { width: 80 }); doc.text(trabajadores[i].ganado, x + 85, y); y = y + 12;
                        doc.text('Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].horas_extras, x + 85, y); y = y + 12;
                        doc.text('Total Horas Extras:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_horas_extras, x + 85, y); y = y + 12;
                        doc.text('Noches Trabajadas:', x, y, { width: 80 }); doc.text(trabajadores[i].nt, x + 85, y); y = y + 12;
                        doc.text('Recargo Nocturno:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_recargo_nocturno, x + 85, y); y = y + 12;
                        doc.text('Bono Antiguedad:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_antiguedad, x + 85, y); y = y + 12;
                        doc.text('Bono Frontera:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_bono_frontera, x + 85, y); y = y + 12;
                        doc.text('Otros Bonos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_otros_bonos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].total_ganado, x + 85, y); y = y + 14;

                        doc.font('Helvetica-Bold', 7);
                        doc.text('DESCUENTOS', x, y); y = y + 12;
                        doc.font('Helvetica', 6);
                        doc.text('AFP:', x, y, { width: 80 }); doc.text(trabajadores[i].afp, x + 85, y); y = y + 12;
                        doc.text('RC-IVA:', x, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.rc_iva_mes : 0, x + 85, y); y = y + 12;
                        doc.text('Anticipos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_anticipos, x + 85, y); y = y + 12;
                        doc.text('Préstamos:', x, y, { width: 80 }); doc.text(trabajadores[i].importe_prestamos, x + 85, y); y = y + 12;
                        doc.font('Helvetica-Bold', 6);
                        doc.text('TOTAL:', x, y, { width: 80, align: 'right' }); doc.text(trabajadores[i].importe_total_descuento, x + 85, y); y = y + 14;
                        doc.font('Helvetica-Bold', 7);
                        doc.rect(x - 3, y - 3, 130, 12).stroke();
                        doc.text('LIQUIDO PAGABLE', x + 4, y, { width: 80 }); doc.text(trabajadores[i].liquido_pagable, x + 85, y);
                        doc.font('Helvetica', 6);
                        // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4); 
                        y = y + 12;
                        doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });
                        doc.text('Saldo CF IVA', x + 4, y, { width: 80 }); doc.text(trabajadores[i].DetalleFicha.rrhhDetalleRcIva ? trabajadores[i].DetalleFicha.rrhhDetalleRcIva.nuevo_saldo : 0, x + 85, y); y = y + 12;
                        doc.text($scope.capitalizar(dptoEmpresa) + ' - ' + $scope.aFechaLarga(datos.updatedAt), x, y + 3, { width: 200, align: 'center' });
                        y = 755;
                    }
                    itemsPage++;
                    if (itemsPage == 2) {
                        items = items + itemsPage;
                        if (items < trabajadores.length) {
                            doc.addPage({ size: 'letter', margin: 10 });
                            x = 30; y = 30; itemsPage = 0;
                        }
                    }
                    if (i == trabajadores.length - 1) {
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                        $timeout(function () {
                            blockUI.stop();

                        }, trabajadores.length * 75)
                    }
                }

            }
            //FIN IMPRIMIR BOLETAS DE PAGO
            // IMPRIMIR PLANILLAS POR CAMPAMENTO

            $scope.dibujarCabeceraPlanillaSueldoCampo = function (doc, planilla, pagina, totalPaginas, fecha, campo) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 30, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.font('Helvetica-Bold', 10);
                doc.text("Centro de Costes " + campo.nombre, 0, 30, { align: 'center' });
                doc.font('Helvetica-Bold', 12);
                doc.text("(En Bolivianos)", 0, 42, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 50, 60);
                doc.text("F. Naci.", 170, 60);
                doc.text("C.I.", 215, 60);
                doc.text("Cargo", 260, 60);
                doc.text("Campamento", 345, 60);
                doc.text("F. Ingre.", 410, 60);
                doc.text("Matricula", 455, 60);
                doc.text("Basico", 510, 60);
                doc.text("DT", 545, 60);
                doc.text("Ganado", 560, 60);
                doc.text("Hrs", 598, 60);
                doc.text("Extra", 595, 70);
                doc.text("Total", 628, 60);
                doc.text("Extras", 625, 70);
                doc.text("NT", 658, 60)
                doc.text("Recargo", 680, 60);
                doc.text("Nocturno", 678, 70);
                doc.text("Bono", 720, 60);
                doc.text("Antig", 719, 70);
                doc.text("Bono", 749, 60);
                doc.text("Front", 748, 70)
                doc.text("Otros", 775, 60);
                doc.text("Bonos", 775, 70);
                doc.text("Total", 805, 60);
                doc.text("Ganado", 805, 70);
                doc.text("AFP", 840, 60);
                doc.text("RC", 865, 60);
                doc.text("IVA", 865, 70);
                doc.text("Anti.", 885, 60);
                doc.text("Prest.", 907, 60);
                doc.text("Total", 935, 60);
                doc.text("Desc.", 935, 70);
                doc.text("Liquido", 960, 60);
                doc.text("Pagable", 960, 70);

            }

            $scope.imprimirPlanillaCampo = function (datos, planilla, campo) {

                // SweetAlert.swal("Espere mientras se carga el reporte !");
                // var idCampo = campo.id;
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var año = datos.anio;
                var cabeceraFecha = [mes, año];

                var trabajadores = planilla.planillas.filter(function (trab) {
                    return trab.DetalleFicha.campo.id == campo.id;
                });

                trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);

                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());
                // falta ccorregir el campo de la cabecera ==========================================================
                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(trabajadores.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldoCampo(doc, datos, pagina, totalPaginas, cabeceraFecha, campo);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.nombre_completo, 50, y, { width: 120 });
                    var fecha = $scope.fechaATexto(trabajadores[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    doc.text(fecha, 170, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.ci + " " + trabajadores[i].DetalleFicha.empleado.extension.nombre_corto, 210, y);
                    if (trabajadores[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        doc.text(trabajadores[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 250, y, { width: 100 });
                    } else {
                        doc.text("", 250, y, { width: 100 });
                    }
                    doc.text(trabajadores[i].DetalleFicha.campo.nombre.toUpperCase(), 350, y);
                    var fechaInicio = $scope.fechaATexto(trabajadores[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 410, y);
                    if (trabajadores[i].DetalleFicha.matricula_seguro != null) {
                        doc.text(trabajadores[i].DetalleFicha.matricula_seguro.toUpperCase(), 450, y);
                    } else {
                        doc.text("", 450, y);
                    }
                    var basico = trabajadores[i].DetalleFicha.haber_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 510, y);
                    doc.text(trabajadores[i].dt, 545, y);
                    var ganado = round(trabajadores[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 560, y);
                    var hrsExtras = trabajadores[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 598, y);
                    var totalHorasExtras = round(trabajadores[i].importe_horas_extras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 628, y)
                    var nt = round(trabajadores[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 660, y);
                    var recargoNocturno = trabajadores[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 690, y);
                    var bonoAntiguedad = trabajadores[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 725, y);
                    var bonoFrontera = trabajadores[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 757, y);
                    var otrosBonos = trabajadores[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 785, y);
                    var totalGanado = round(trabajadores[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 805, y)
                    var afp = round(trabajadores[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 840, y);
                    var rc_iva;
                    if (trabajadores[i].rc_iva == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = trabajadores[i].rc_iva;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(rc_iva, 870, y);
                    var anticipos = trabajadores[i].importe_anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    doc.text(anticipos, 890, y);
                    var prestamo = trabajadores[i].importe_prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(prestamo, 920, y);
                    var totalDescuento = round(trabajadores[i].importe_total_descuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(totalDescuento, 935, y);
                    var liquidoPagado = round(trabajadores[i].liquido_pagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(liquidoPagado, 965, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 450, y + 20);
                        doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(round(importeTotalGanado, 2), 560, y + 20);
                        doc.text(round(importeHrsExtras, 2), 598, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 628, y + 20);
                        doc.text(round(totalNT, 2), 660, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 690, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 725, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 757, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 785, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 805, y + 20)
                        doc.text(round(importeTotalAFP, 2), 840, y + 20);
                        doc.text(round(importeTotalRCIVA, 2), 870, y + 20);
                        doc.text(round(importeTotalAnticipos, 2), 890, y + 20);
                        doc.text(round(importeTotalPrestamo, 2), 920, y + 20);
                        doc.text(round(importeSumaTotalDescuento, 2), 935, y + 20);
                        doc.text(round(importeSumaTotalLiquido, 2), 965, y + 20);

                    }

                    y = y + 20;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != trabajadores.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 80;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaSueldoCampo(doc, datos, pagina, totalPaginas, cabeceraFecha, campo);
                        }
                    }
                }

                if (trabajadores.length < 23 || totalAray != trabajadores.length) {
                    doc.font('Helvetica-Bold', 6);
                    doc.text("TOTALES", 450, cont);
                    doc.text(round(importeTotalBasico, 2), 510, cont);
                    doc.text(round(importeTotalGanado, 2), 560, cont);
                    doc.text(round(importeHrsExtras, 2), 598, cont);
                    doc.text(round(importeTotalHrsExtras, 2), 628, cont);
                    doc.text(round(totalNT, 2), 660, cont);
                    doc.text(round(importeRecargoNocturno, 2), 690, cont);
                    doc.text(round(importeBonoAntiguedad, 2), 725, cont);
                    doc.text(round(importeTotalBonoFrontera, 2), 757, cont);
                    doc.text(round(importeTotalOtrosBonos, 2), 785, cont);
                    doc.text(round(importeSumaTotalGanado, 2), 805, cont)
                    doc.text(round(importeTotalAFP, 2), 840, cont);
                    doc.text(round(importeTotalRCIVA, 2), 870, cont);
                    doc.text(round(importeTotalAnticipos, 2), 890, cont);
                    doc.text(round(importeTotalPrestamo, 2), 920, cont);
                    doc.text(round(importeSumaTotalDescuento, 2), 935, cont);
                    doc.text(round(importeSumaTotalLiquido, 2), 965, cont);

                }

                // doc.font('Helvetica-Bold', 6);
                // doc.text("TOTALES", 450, cont);

                // doc.text(round(datos.importe_sueldo_basico, 2), 510, cont);
                // doc.text(round(datos.importe_ganado, 2), 565, cont);
                // doc.text(round(importeHrsExtras, 2), 605, cont);
                // doc.text(round(datos.total_horas_extras, 2), 635, cont);
                // doc.text(round(totalNT, 2), 660, cont);
                // doc.text(round(datos.importe_recargo_nocturno, 2), 690, cont);
                // doc.text(round(datos.importe_bono_antiguedad, 2), 725, cont);
                // doc.text(round(datos.importe_bono_frontera, 2), 757, cont);
                // doc.text(round(datos.importe_otros_bonos, 2), 785, cont);
                // doc.text(round(datos.importe_total_ganado, 2), 805, cont)
                // doc.text(round(datos.importe_afp, 2), 840, cont);
                // doc.text(round(datos.importe_rc_iva, 2), 870, cont);
                // doc.text(round(datos.importe_anticipos, 2), 890, cont);
                // doc.text(round(datos.importe_prestamos, 2), 920, cont);

                // doc.text(datos.importe_total_descuento, 935, cont);
                // doc.text(datos.importe_liquido_pagable, 965, cont);


                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.obtenerBonoAntiguedad = function (antiguedad) {
                if (antiguedad >= 0 && antiguedad <= 1) {
                    // "es de 0 a 2"
                    return $scope.parametros.antiguedad_cero_uno;
                }
                if (antiguedad >= 2 && antiguedad <= 4) {
                    // "es de 2 a 5"
                    return $scope.parametros.antiguedad_dos_cuatro;
                }
                if (antiguedad >= 5 && antiguedad <= 7) {
                    // "es de 5 a 8"
                    return $scope.parametros.antiguedad_cinco_siete;
                }
                if (antiguedad >= 8 && antiguedad <= 10) {
                    // "es de 8 a 11"
                    return $scope.parametros.antiguedad_ocho_diez;
                }
                if (antiguedad >= 11 && antiguedad <= 14) {
                    // "es de 11 a 15"
                    return $scope.parametros.antiguedad_once_catorce;
                }
                if (antiguedad >= 15 && antiguedad <= 19) {
                    // "es de 15 a 20"
                    return $scope.parametros.antiguedad_quice_diecinueve;
                }
                if (antiguedad >= 20 && antiguedad <= 24) {
                    // "es de 20 a 25"
                    return $scope.parametros.antiguedad_veinte_veinticuatro;
                }
                if (antiguedad >= 25) {
                    // "es de mayor a 25"
                    return $scope.parametros.antiguedad_mas_veinticinco;
                }
            }

            $scope.dibujarCabeceraPlanillaLugarSeguroSalud = function (doc, planilla, pagina, totalPaginas, fecha, lugar) {
                var empresa = $scope.usuario.empresa;

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.font('Helvetica-Bold', 11);
                doc.text("REGIONAL: " + lugar.nombre, 0, 32, { align: 'center' });
                doc.font('Helvetica-Bold', 11);
                doc.text("(En Bolivianos)", 0, 42, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 60);
                //Cambiar en todos los demas reportes de razon_social a nombre comercial
                doc.text(empresa.nombre_comercial ? empresa.nombre_comercial : ''.toUpperCase(), 200, 60);
                doc.text("NIT:", 30, 70);
                doc.text(empresa.nit.toUpperCase(), 200, 70);
                doc.text("DIRECCIÓN:", 30, 80);
                doc.text(empresa.direccion, 200, 80);
                doc.text("NÚMERO EMPLEADOR:", 30, 90);
                doc.text(lugar.numero_patronal ? lugar.numero_patronal : "", 200, 90);
                doc.text("N° EMPL. MIN. DE TRAB.:", 30, 100);
                doc.text($scope.parametros.numero_empleador ? $scope.parametros.numero_empleador : "", 200, 100);
                doc.text("TIPO DE PLANILLA:", 30, 110);
                doc.text("REGULAR", 200, 110);
                doc.text("CORRESPONDIENTE AL MES:", 30, 120);
                doc.text(fecha[0].toUpperCase() + " DE " + fecha[1].toUpperCase(), 200, 120);
                // doc.text("DE", 280, 110);
                // doc.text(fecha[1].toUpperCase(), 300, 110);

                doc.text("REPRESENTANTE LEGAL:", 690, 60);
                doc.text(empresa.representante_legal ? empresa.representante_legal : "", 843, 60);
                doc.text("CÉDULA DE IDENTIDAD:", 690, 70);
                doc.text(empresa.repr_ci ? empresa.repr_ci + " " + empresa.repr_extension_ci : "", 843, 70);
                doc.text("DIRECCIÓN:", 690, 80);
                doc.text(empresa.repr_direccion ? empresa.repr_direccion : "", 843, 80, { lineGap: -1 });
                doc.text("TELÉFONO:", 690, 100);
                doc.text(empresa.repr_telefono ? empresa.repr_telefono : "", 843, 100);
                doc.text("CORREO ELECTRÓNICO:", 690, 110);
                doc.text(empresa.repr_correo_electronico ? empresa.repr_correo_electronico : "", 843, 110);

                doc.rect(5, 135, 995, 45).stroke();
                doc.font('Helvetica-Bold', 7);
                doc.text("N°", 10, 140);
                doc.text("Carnet de Identidad", 23, 140, { width: 50 });
                doc.text("Matricula", 62, 140);
                doc.text("Nombre Completo", 98, 140);
                doc.text("Campamento", 191, 140);
                doc.text("Ocupación que desempeña ", 240, 140, { width: 70 });
                doc.text("Fecha de Ingreso a la Empresa (DD/MM/AAAA)", 330, 140, { width: 40 });
                doc.text("Fecha de Retiro de la Empresa (DD/MM/AAAA)", 370, 140, { width: 40 });
                doc.text("Haber Básico Ganado", 411, 140, { width: 40 });
                doc.text("Días Pagados", 440, 140, { width: 40 });

                doc.rect(472, 159, 265, 0).stroke();

                doc.rect(472, 135, 0, 45).stroke();
                doc.text("Bono de Antigüedad", 477, 140, { width: 50 });
                doc.text("%", 474, 162, { width: 50 });
                doc.rect(482, 160, 0, 20).stroke();
                doc.text("Monto Pag", 485, 162, { width: 40 });
                doc.rect(523, 135, 0, 45).stroke();

                doc.text("Recargo Nocturno", 540, 140, { width: 50 });
                doc.text("Noches Trabaj.", 525, 162, { width: 50 });
                doc.rect(553, 160, 0, 20).stroke();
                doc.text("Importe Pagado", 555, 162, { width: 50 });
                doc.rect(583, 135, 0, 45).stroke();

                doc.text("Horas extras", 585, 140, { width: 50 });
                doc.text("Nº", 585, 162, { width: 50 });
                doc.rect(602, 160, 0, 20).stroke();
                doc.text("Importe Pagado", 604, 162, { width: 50 });
                doc.rect(632, 135, 0, 45).stroke();

                doc.text("Bonos", 650, 140, { width: 50 });
                doc.text("Bono de Frontera ", 634, 162, { width: 50 });
                doc.rect(664, 160, 0, 20).stroke();
                doc.text("Otros Bonos", 667, 162, { width: 40 });
                doc.rect(690, 135, 0, 45).stroke();

                doc.text("Dominicales", 693, 140, { width: 50 });
                doc.text("Nº", 692, 162, { width: 50 });
                doc.rect(703, 160, 0, 20).stroke();
                doc.text("Importe Pagado", 705, 162, { width: 50 });
                doc.rect(736, 135, 0, 45).stroke();

                doc.text("Total Ganado", 738, 140, { width: 40 });
                doc.rect(765, 135, 0, 45).stroke();

                doc.rect(765, 159, 105, 0).stroke();
                doc.text("Descuentos", 795, 140, { width: 50 });
                doc.text("AFP (12,71%)", 768, 162, { width: 40 });
                doc.rect(798, 160, 0, 20).stroke();
                doc.text("RC-IVA (13%)", 800, 162, { width: 40 });
                doc.rect(825, 160, 0, 20).stroke();
                doc.text("Otros Descuentos", 827, 162, { width: 40 });
                doc.rect(869, 135, 0, 45).stroke();

                doc.text("Total Descuentos", 871, 140, { width: 50 });
                doc.rect(912, 135, 0, 45).stroke();
                doc.text("Liquido Pagable (L) G-K", 914, 140, { width: 35 });
                doc.rect(945, 135, 0, 45).stroke();
                doc.text("FIRMA", 960, 140, { width: 50 });

            }

            $scope.imprimirPlanillaLugarSeguroSalud = function (datos, planilla, lugar) {
                blockUI.start();
                var idLugar = lugar.id;
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var año = datos.anio;
                var cabeceraFecha = [mes, año];

                var trabajadores = planilla.planillas.filter(function (trab) {
                    return trab.DetalleFicha.lugarSeguroSalud.id == idLugar;
                });

                trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);

                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 190, totalAray = 0, itemsPorPagina = 20, items = 0, pagina = 1, totalPaginas = Math.ceil(trabajadores.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaLugarSeguroSalud(doc, datos, pagina, totalPaginas, cabeceraFecha, lugar);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 10, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.ci + " " + trabajadores[i].DetalleFicha.empleado.extension.nombre_corto, 23, y);

                    if (trabajadores[i].DetalleFicha.matricula_seguro != null) {
                        doc.text(trabajadores[i].DetalleFicha.matricula_seguro.toUpperCase(), 62, y, { width: 35 });
                    } else {
                        doc.text("", 62, y);
                    }

                    // var fecha = $scope.fechaATexto(trabajadores[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    // doc.text(fecha, 170, y);

                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.nombre_completo, 98, y, { width: 90 });
                    doc.text(trabajadores[i].DetalleFicha.campo.nombre.toUpperCase(), 191, y);
                    if (trabajadores[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        doc.text(trabajadores[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 240, y, { width: 90 });
                    } else {
                        doc.text("", 240, y, { width: 100 });
                    }
                    var fechaInicio = $scope.fechaATexto(trabajadores[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 330, y);
                    doc.text("", 370, y);
                    if (trabajadores[i].DetalleFicha.fecha_expiracion) {
                        var fecha_expiracionE = new Date(trabajadores[i].DetalleFicha.fecha_expiracion);
                        if (parseInt(cadena[0]) == fecha_expiracionE.getMonth() + 1 && fecha_expiracionE.getFullYear() == datos.anio) {
                            doc.text($scope.fechaATexto(trabajadores[i].DetalleFicha.fecha_expiracion), 370, y);
                        }
                    }

                    var ganado = round(trabajadores[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(number_format_negativo_to_positvo(ganado, 2), 405, y, { width: 30, align: 'right' });

                    // var basico = trabajadores[i].DetalleFicha.haber_basico;
                    // importeTotalBasico = importeTotalBasico + basico;
                    // doc.text(basico, 411, y);
                    doc.text(trabajadores[i].dt, 440, y, { width: 20, align: 'right' });

                    var mes = new Date(datos.anio, parseInt(cadena[0]), 0);
                    var ultimoDiaMesBono = new Date(datos.anio, parseInt(cadena[0]) - 1, mes.getDate(), 23, 59, 59);
                    var antiguedad = calcAge(trabajadores[i].DetalleFicha.fecha_inicio, ultimoDiaMesBono); // == sacar años de antiguedad ==================
                    var porcentajeBonoAntiguedad = $scope.obtenerBonoAntiguedad(antiguedad);
                    doc.text(porcentajeBonoAntiguedad, 474, y);

                    var bonoAntiguedad = trabajadores[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(number_format_negativo_to_positvo(bonoAntiguedad, 2), 480, y, { width: 35, align: 'right' });

                    var nt = round(trabajadores[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 525, y, { width: 30, align: 'center' });

                    var recargoNocturno = trabajadores[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(number_format_negativo_to_positvo(recargoNocturno, 2), 550, y, { width: 30, align: 'right' });

                    var hrsExtras = trabajadores[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 585, y, { width: 17, align: 'center' });
                    var totalHorasExtras = round(trabajadores[i].importe_horas_extras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(number_format_negativo_to_positvo(totalHorasExtras, 2), 602, y, { width: 30, align: 'right' })

                    var bonoFrontera = trabajadores[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(number_format_negativo_to_positvo(bonoFrontera, 2), 630, y, { width: 33, align: 'right' });
                    var otrosBonos = trabajadores[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(number_format_negativo_to_positvo(otrosBonos, 2), 665, y, { width: 24, align: 'right' });
                    //columna estática sin funcionalidad en emserso (no se ocupa dominicales)
                    doc.text(0, 695, y);
                    doc.text('0.00', 705, y, { width: 28, align: 'right' });

                    var totalGanado = round(trabajadores[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(number_format_negativo_to_positvo(totalGanado, 2), 733, y, { width: 30, align: 'right' })

                    var afp = round(trabajadores[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(number_format_negativo_to_positvo(afp, 2), 768, y, { width: 30, align: 'right' });
                    var rc_iva;
                    if (trabajadores[i].rc_iva == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = trabajadores[i].rc_iva;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(number_format_negativo_to_positvo(rc_iva, 2), 800, y, { width: 24, align: 'right' });
                    var anticipos = trabajadores[i].importe_anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    // doc.text(anticipos, 890, y);
                    var prestamo = trabajadores[i].importe_prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(number_format_negativo_to_positvo(anticipos + prestamo, 2), 827, y, { width: 40, align: 'right' });
                    var totalDescuento = round(trabajadores[i].importe_total_descuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(number_format_negativo_to_positvo(totalDescuento, 2), 871, y, { width: 40, align: 'right' });
                    var liquidoPagado = round(trabajadores[i].liquido_pagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(number_format_negativo_to_positvo(liquidoPagado, 2), 914, y, { width: 32, align: 'right' });

                    if (items === 19) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 370, y + 20);
                        doc.font('Helvetica-Bold', 5);
                        // doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(number_format_negativo_to_positvo(importeTotalGanado, 2), 405, y + 20, { width: 30, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeBonoAntiguedad, 2), 480, y + 20, { width: 35, align: 'right' });
                        doc.text(totalNT, 525, y + 20, { width: 30, align: 'center' });
                        doc.text(number_format_negativo_to_positvo(importeRecargoNocturno, 2), 550, y + 20, { width: 30, align: 'right' });
                        doc.text(importeHrsExtras, 585, y + 20, { width: 17, align: 'center' });
                        doc.text(number_format_negativo_to_positvo(importeTotalHrsExtras, 2), 602, y + 20, { width: 30, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeTotalBonoFrontera, 2), 630, y + 20, { width: 33, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeTotalOtrosBonos, 2), 665, y + 20, { width: 24, align: 'right' });
                        doc.text('0', 695, y + 20);
                        doc.text('0.00', 705, y + 20, { width: 28, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeSumaTotalGanado, 2), 733, y + 20, { width: 30, align: 'right' })
                        doc.text(number_format_negativo_to_positvo(importeTotalAFP, 2), 768, y + 20, { width: 30, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeTotalRCIVA, 2), 800, y + 20, { width: 24, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeTotalAnticipos + importeTotalPrestamo, 2), 827, y + 20, { width: 40, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeSumaTotalDescuento, 2), 871, y + 20, { width: 40, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(importeSumaTotalLiquido, 2), 914, y + 20, { width: 32, align: 'right' });

                    }

                    y = y + 18;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != trabajadores.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 190;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaLugarSeguroSalud(doc, datos, pagina, totalPaginas, cabeceraFecha, lugar);
                        }
                    }
                }

                if (trabajadores.length < 20 || totalAray != trabajadores.length) {
                    doc.font('Helvetica-Bold', 6);
                    doc.text("TOTALES", 370, cont);
                    doc.font('Helvetica-Bold', 5);
                    // doc.text(round(importeTotalBasico, 2), 510,cont);
                    doc.text(number_format_negativo_to_positvo(importeTotalGanado, 2), 405, cont, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeBonoAntiguedad, 2), 480, cont, { width: 35, align: 'right' });
                    doc.text(totalNT, 525, cont, { width: 30, align: 'center' });
                    doc.text(number_format_negativo_to_positvo(importeRecargoNocturno, 2), 550, cont, { width: 30, align: 'right' });
                    doc.text(importeHrsExtras, 585, cont, { width: 17, align: 'center' });
                    doc.text(number_format_negativo_to_positvo(importeTotalHrsExtras, 2), 602, cont, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalBonoFrontera, 2), 630, cont, { width: 33, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalOtrosBonos, 2), 665, cont, { width: 24, align: 'right' });
                    doc.text('0', 695, cont);
                    doc.text('0.00', 705, cont, { width: 28, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalGanado, 2), 733, cont, { width: 30, align: 'right' })
                    doc.text(number_format_negativo_to_positvo(importeTotalAFP, 2), 768, cont, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalRCIVA, 2), 800, cont, { width: 24, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalAnticipos + importeTotalPrestamo, 2), 827, cont, { width: 40, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalDescuento, 2), 871, cont, { width: 40, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalLiquido, 2), 914, cont, { width: 32, align: 'right' });
                }

                if (cont <= 520) {
                    doc.font('Helvetica-Bold', 7);
                    var posicionFirmas = 520;
                    var datosEmpresa = $scope.usuario.empresa;
                    doc.text(datosEmpresa.representante_legal ? datosEmpresa.representante_legal : "", 62, posicionFirmas + 50, { width: 200, align: 'center' });
                    doc.text('------------------------------------------------------------------------------------', 62, posicionFirmas + 60, { width: 200, align: 'center' });
                    doc.text('REPRESENTANTE LEGAL DE LA EMPRESA', 80, posicionFirmas + 70, { width: 160, align: 'center' });

                    doc.text(datosEmpresa.repr_ci ? datosEmpresa.repr_ci + " " + datosEmpresa.repr_extension_ci : "", 411, posicionFirmas + 50, { width: 200, align: 'center' });
                    doc.text('------------------------------------------------------------------------------------', 411, posicionFirmas + 60, { width: 200, align: 'center' });
                    doc.text('Nº DE DOCUMENTO DE IDENTIDAD', 429, posicionFirmas + 70, { width: 160, align: 'center' });

                    doc.text('------------------------------------------------------------------------------------', 738, posicionFirmas + 60, { width: 200, align: 'center' });
                    doc.text('FIRMA', 756, posicionFirmas + 70, { width: 160, align: 'center' });
                } else if (cont > 520) {
                    doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                    y = 190;
                    items = 0;
                    pagina = pagina + 1;
                    $scope.dibujarCabeceraPlanillaLugarSeguroSalud(doc, datos, pagina, totalPaginas, cabeceraFecha, lugar);

                    doc.font('Helvetica-Bold', 6);
                    doc.text("TOTALES", 370, y);
                    doc.font('Helvetica-Bold', 5);
                    // doc.text(round(importeTotalBasico, 2), 510,y);
                    doc.text(number_format_negativo_to_positvo(importeTotalGanado, 2), 405, y, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeBonoAntiguedad, 2), 480, y, { width: 35, align: 'right' });
                    doc.text(totalNT, 525, y, { width: 30, align: 'center' });
                    doc.text(number_format_negativo_to_positvo(importeRecargoNocturno, 2), 550, y, { width: 30, align: 'right' });
                    doc.text(importeHrsExtras, 585, y, { width: 17, align: 'center' });
                    doc.text(number_format_negativo_to_positvo(importeTotalHrsExtras, 2), 602, y, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalBonoFrontera, 2), 630, y, { width: 33, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalOtrosBonos, 2), 665, y, { width: 24, align: 'right' });
                    doc.text('0', 695, y);
                    doc.text('0.00', 705, y, { width: 28, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalGanado, 2), 733, y, { width: 30, align: 'right' })
                    doc.text(number_format_negativo_to_positvo(importeTotalAFP, 2), 768, y, { width: 30, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalRCIVA, 2), 800, y, { width: 24, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeTotalAnticipos + importeTotalPrestamo, 2), 827, y, { width: 40, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalDescuento, 2), 871, y, { width: 40, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(importeSumaTotalLiquido, 2), 914, y, { width: 32, align: 'right' });

                    doc.font('Helvetica-Bold', 7);
                    var datosEmpresa = $scope.usuario.empresa;
                    doc.text(datosEmpresa.representante_legal ? datosEmpresa.representante_legal : "", 62, y + 50, { width: 200, align: 'center' });
                    doc.text('------------------------------------------------------------------------------------', 62, y + 60, { width: 200, align: 'center' });
                    doc.text('REPRESENTANTE LEGAL DE LA EMPRESA', 80, y + 70, { width: 160, align: 'center' });

                    doc.text(datosEmpresa.repr_ci ? datosEmpresa.repr_ci + " " + datosEmpresa.repr_extension_ci : "", 411, y + 50, { width: 200, align: 'center' });
                    doc.text('------------------------------------------------------------------------------------', 411, y + 60, { width: 200, align: 'center' });
                    doc.text('Nº DE DOCUMENTO DE IDENTIDAD', 429, y + 70, { width: 160, align: 'center' });

                    doc.text('------------------------------------------------------------------------------------', 738, y + 60, { width: 200, align: 'center' });
                    doc.text('FIRMA', 756, y + 70, { width: 160, align: 'center' });
                }

                // if (cont == 580) {
                // }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.dibujarCabeceraPlanillaPorArea = function (doc, planilla, pagina, totalPaginas, fecha, lugar) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 30, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.font('Helvetica-Bold', 10);
                doc.text("ÁREA: " + lugar.nombre, 0, 32, { align: 'center' });
                doc.font('Helvetica-Bold', 12);
                doc.text("(En Bolivianos)", 0, 42, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 50, 60);
                doc.text("F. Naci.", 170, 60);
                doc.text("C.I.", 215, 60);
                doc.text("Cargo", 260, 60);
                doc.text("Campamento", 345, 60);
                doc.text("F. Ingre.", 410, 60);
                doc.text("Matricula", 455, 60);
                doc.text("Basico", 510, 60);
                doc.text("DT", 545, 60);
                doc.text("Ganado", 560, 60);
                doc.text("Hrs", 598, 60);
                doc.text("Extra", 595, 70);
                doc.text("Total", 628, 60);
                doc.text("Extras", 625, 70);
                doc.text("NT", 658, 60)
                doc.text("Recargo", 680, 60);
                doc.text("Nocturno", 678, 70);
                doc.text("Bono", 720, 60);
                doc.text("Antig", 719, 70);
                doc.text("Bono", 749, 60);
                doc.text("Front", 748, 70)
                doc.text("Otros", 775, 60);
                doc.text("Bonos", 775, 70);
                doc.text("Total", 805, 60);
                doc.text("Ganado", 805, 70);
                doc.text("AFP", 840, 60);
                doc.text("RC", 865, 60);
                doc.text("IVA", 865, 70);
                doc.text("Anti.", 885, 60);
                doc.text("Prest.", 907, 60);
                doc.text("Total", 935, 60);
                doc.text("Desc.", 935, 70);
                doc.text("Liquido", 960, 60);
                doc.text("Pagable", 960, 70);

            }

            $scope.imprimirPlanillaPorArea = function (datos, planilla, area) {

                // SweetAlert.swal("Espere mientras se carga el reporte !");
                var idArea = area.id;
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var año = datos.anio;
                var cabeceraFecha = [mes, año];

                var trabajadores = planilla.planillas.filter(function (trab) {
                    return trab.DetalleFicha.area.id == idArea;
                });

                trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);

                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(trabajadores.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaPorArea(doc, datos, pagina, totalPaginas, cabeceraFecha, area);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.nombre_completo, 50, y, { width: 120 });
                    var fecha = $scope.fechaATexto(trabajadores[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    doc.text(fecha, 170, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.ci + " " + trabajadores[i].DetalleFicha.empleado.extension.nombre_corto, 210, y);
                    if (trabajadores[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        doc.text(trabajadores[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 250, y, { width: 100 });
                    } else {
                        doc.text("", 250, y, { width: 100 });
                    }
                    doc.text(trabajadores[i].DetalleFicha.campo.nombre.toUpperCase(), 350, y);
                    var fechaInicio = $scope.fechaATexto(trabajadores[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 410, y);
                    if (trabajadores[i].DetalleFicha.matricula_seguro != null) {
                        doc.text(trabajadores[i].DetalleFicha.matricula_seguro.toUpperCase(), 450, y);
                    } else {
                        doc.text("", 450, y);
                    }
                    var basico = trabajadores[i].DetalleFicha.haber_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 510, y);
                    doc.text(trabajadores[i].dt, 545, y);
                    var ganado = round(trabajadores[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 560, y);
                    var hrsExtras = trabajadores[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 598, y);
                    var totalHorasExtras = round(trabajadores[i].importe_horas_extras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 628, y)
                    var nt = round(trabajadores[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 660, y);
                    var recargoNocturno = trabajadores[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 690, y);
                    var bonoAntiguedad = trabajadores[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 725, y);
                    var bonoFrontera = trabajadores[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 757, y);
                    var otrosBonos = trabajadores[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 785, y);
                    var totalGanado = round(trabajadores[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 805, y)
                    var afp = round(trabajadores[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 840, y);
                    var rc_iva;
                    if (trabajadores[i].rc_iva == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = trabajadores[i].rc_iva;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(rc_iva, 870, y);
                    var anticipos = trabajadores[i].importe_anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    doc.text(anticipos, 890, y);
                    var prestamo = trabajadores[i].importe_prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(prestamo, 920, y);
                    var totalDescuento = round(trabajadores[i].importe_total_descuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(totalDescuento, 935, y);
                    var liquidoPagado = round(trabajadores[i].liquido_pagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(liquidoPagado, 965, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 450, y + 20);
                        doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(round(importeTotalGanado, 2), 560, y + 20);
                        doc.text(round(importeHrsExtras, 2), 598, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 628, y + 20);
                        doc.text(round(totalNT, 2), 660, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 690, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 725, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 757, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 785, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 805, y + 20)
                        doc.text(round(importeTotalAFP, 2), 840, y + 20);
                        doc.text(round(importeTotalRCIVA, 2), 870, y + 20);
                        doc.text(round(importeTotalAnticipos, 2), 890, y + 20);
                        doc.text(round(importeTotalPrestamo, 2), 920, y + 20);
                        doc.text(round(importeSumaTotalDescuento, 2), 935, y + 20);
                        doc.text(round(importeSumaTotalLiquido, 2), 965, y + 20);

                    }

                    y = y + 20;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != trabajadores.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 80;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaPorArea(doc, datos, pagina, totalPaginas, cabeceraFecha, area);
                        }
                    }
                }

                if (trabajadores.length < 23 || totalAray != trabajadores.length) {
                    doc.font('Helvetica-Bold', 6);
                    doc.text("TOTALES", 450, cont);
                    doc.text(round(importeTotalBasico, 2), 510, cont);
                    doc.text(round(importeTotalGanado, 2), 560, cont);
                    doc.text(round(importeHrsExtras, 2), 598, cont);
                    doc.text(round(importeTotalHrsExtras, 2), 628, cont);
                    doc.text(round(totalNT, 2), 660, cont);
                    doc.text(round(importeRecargoNocturno, 2), 690, cont);
                    doc.text(round(importeBonoAntiguedad, 2), 725, cont);
                    doc.text(round(importeTotalBonoFrontera, 2), 757, cont);
                    doc.text(round(importeTotalOtrosBonos, 2), 785, cont);
                    doc.text(round(importeSumaTotalGanado, 2), 805, cont)
                    doc.text(round(importeTotalAFP, 2), 840, cont);
                    doc.text(round(importeTotalRCIVA, 2), 870, cont);
                    doc.text(round(importeTotalAnticipos, 2), 890, cont);
                    doc.text(round(importeTotalPrestamo, 2), 920, cont);
                    doc.text(round(importeSumaTotalDescuento, 2), 935, cont);
                    doc.text(round(importeSumaTotalLiquido, 2), 965, cont);

                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.dibujarCabeceraPlanillaSueldoUbicacion = function (doc, planilla, pagina, totalPaginas, fecha, ubicacion) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 30, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.font('Helvetica-Bold', 10);
                doc.text("Ubicación " + ubicacion.nombre, 0, 30, { align: 'center' });
                doc.font('Helvetica-Bold', 12);
                doc.text("(En Bolivianos)", 0, 42, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 50, 60);
                doc.text("F. Naci.", 170, 60);
                doc.text("C.I.", 215, 60);
                doc.text("Cargo", 260, 60);
                doc.text("Campamento", 345, 60);
                doc.text("F. Ingre.", 410, 60);
                doc.text("Matricula", 455, 60);
                doc.text("Basico", 510, 60);
                doc.text("DT", 545, 60);
                doc.text("Ganado", 560, 60);
                doc.text("Hrs", 598, 60);
                doc.text("Extra", 595, 70);
                doc.text("Total", 628, 60);
                doc.text("Extras", 625, 70);
                doc.text("NT", 658, 60)
                doc.text("Recargo", 680, 60);
                doc.text("Nocturno", 678, 70);
                doc.text("Bono", 720, 60);
                doc.text("Antig", 719, 70);
                doc.text("Bono", 749, 60);
                doc.text("Front", 748, 70)
                doc.text("Otros", 775, 60);
                doc.text("Bonos", 775, 70);
                doc.text("Total", 805, 60);
                doc.text("Ganado", 805, 70);
                doc.text("AFP", 840, 60);
                doc.text("RC", 865, 60);
                doc.text("IVA", 865, 70);
                doc.text("Anti.", 885, 60);
                doc.text("Prest.", 907, 60);
                doc.text("Total", 935, 60);
                doc.text("Desc.", 935, 70);
                doc.text("Liquido", 960, 60);
                doc.text("Pagable", 960, 70);

            }

            $scope.imprimirPlanillaUbicacion = function (datos, planilla, ubicacion) {

                // SweetAlert.swal("Espere mientras se carga el reporte !");
                var idUbicaicion = ubicacion.id;
                var cadena = datos.mes.split("-");
                var mes = cadena[1];
                var año = datos.anio;
                var cabeceraFecha = [mes, año];

                var trabajadores = planilla.planillas.filter(function (trab) {
                    return trab.DetalleFicha.ubicacion.id == idUbicaicion;
                });

                trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);

                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(trabajadores.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldoUbicacion(doc, datos, pagina, totalPaginas, cabeceraFecha, ubicacion);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.nombre_completo, 50, y, { width: 120 });
                    var fecha = $scope.fechaATexto(trabajadores[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    doc.text(fecha, 170, y);
                    doc.text(trabajadores[i].DetalleFicha.empleado.persona.ci + " " + trabajadores[i].DetalleFicha.empleado.extension.nombre_corto, 210, y);
                    if (trabajadores[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        doc.text(trabajadores[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 250, y, { width: 100 });
                    } else {
                        doc.text("", 250, y, { width: 100 });
                    }
                    doc.text(trabajadores[i].DetalleFicha.campo.nombre.toUpperCase(), 350, y);
                    var fechaInicio = $scope.fechaATexto(trabajadores[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 410, y);
                    if (trabajadores[i].DetalleFicha.matricula_seguro != null) {
                        doc.text(trabajadores[i].DetalleFicha.matricula_seguro.toUpperCase(), 450, y);
                    } else {
                        doc.text("", 450, y);
                    }
                    var basico = trabajadores[i].DetalleFicha.haber_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 510, y);
                    doc.text(trabajadores[i].dt, 545, y);
                    var ganado = round(trabajadores[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 560, y);
                    var hrsExtras = trabajadores[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 598, y);
                    var totalHorasExtras = round(trabajadores[i].importe_horas_extras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 628, y)
                    var nt = round(trabajadores[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 660, y);
                    var recargoNocturno = trabajadores[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 690, y);
                    var bonoAntiguedad = trabajadores[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 725, y);
                    var bonoFrontera = trabajadores[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 757, y);
                    var otrosBonos = trabajadores[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 785, y);
                    var totalGanado = round(trabajadores[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 805, y)
                    var afp = round(trabajadores[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 840, y);
                    var rc_iva;
                    if (trabajadores[i].rc_iva == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = trabajadores[i].rc_iva;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(rc_iva, 870, y);
                    var anticipos = trabajadores[i].importe_anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    doc.text(anticipos, 890, y);
                    var prestamo = trabajadores[i].importe_prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(prestamo, 920, y);
                    var totalDescuento = round(trabajadores[i].importe_total_descuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(totalDescuento, 935, y);
                    var liquidoPagado = round(trabajadores[i].liquido_pagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(liquidoPagado, 965, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 450, y + 20);
                        doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(round(importeTotalGanado, 2), 560, y + 20);
                        doc.text(round(importeHrsExtras, 2), 598, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 628, y + 20);
                        doc.text(round(totalNT, 2), 660, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 690, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 725, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 757, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 785, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 805, y + 20)
                        doc.text(round(importeTotalAFP, 2), 840, y + 20);
                        doc.text(round(importeTotalRCIVA, 2), 870, y + 20);
                        doc.text(round(importeTotalAnticipos, 2), 890, y + 20);
                        doc.text(round(importeTotalPrestamo, 2), 920, y + 20);
                        doc.text(round(importeSumaTotalDescuento, 2), 935, y + 20);
                        doc.text(round(importeSumaTotalLiquido, 2), 965, y + 20);

                    }

                    y = y + 20;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != trabajadores.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 80;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaSueldoUbicacion(doc, datos, pagina, totalPaginas, cabeceraFecha, ubicacion);
                        }
                    }
                }

                if (trabajadores.length < 23 || totalAray != trabajadores.length) {
                    doc.font('Helvetica-Bold', 6);
                    doc.text("TOTALES", 450, cont);
                    doc.text(round(importeTotalBasico, 2), 510, cont);
                    doc.text(round(importeTotalGanado, 2), 560, cont);
                    doc.text(round(importeHrsExtras, 2), 598, cont);
                    doc.text(round(importeTotalHrsExtras, 2), 628, cont);
                    doc.text(round(totalNT, 2), 660, cont);
                    doc.text(round(importeRecargoNocturno, 2), 690, cont);
                    doc.text(round(importeBonoAntiguedad, 2), 725, cont);
                    doc.text(round(importeTotalBonoFrontera, 2), 757, cont);
                    doc.text(round(importeTotalOtrosBonos, 2), 785, cont);
                    doc.text(round(importeSumaTotalGanado, 2), 805, cont)
                    doc.text(round(importeTotalAFP, 2), 840, cont);
                    doc.text(round(importeTotalRCIVA, 2), 870, cont);
                    doc.text(round(importeTotalAnticipos, 2), 890, cont);
                    doc.text(round(importeTotalPrestamo, 2), 920, cont);
                    doc.text(round(importeSumaTotalDescuento, 2), 935, cont);
                    doc.text(round(importeSumaTotalLiquido, 2), 965, cont);

                }

                // doc.font('Helvetica-Bold', 6);
                // doc.text("TOTALES", 450, cont);

                // doc.text(round(datos.importe_sueldo_basico, 2), 510, cont);
                // doc.text(round(datos.importe_ganado, 2), 565, cont);
                // doc.text(round(importeHrsExtras, 2), 605, cont);
                // doc.text(round(datos.total_horas_extras, 2), 635, cont);
                // doc.text(round(totalNT, 2), 660, cont);
                // doc.text(round(datos.importe_recargo_nocturno, 2), 690, cont);
                // doc.text(round(datos.importe_bono_antiguedad, 2), 725, cont);
                // doc.text(round(datos.importe_bono_frontera, 2), 757, cont);
                // doc.text(round(datos.importe_otros_bonos, 2), 785, cont);
                // doc.text(round(datos.importe_total_ganado, 2), 805, cont)
                // doc.text(round(datos.importe_afp, 2), 840, cont);
                // doc.text(round(datos.importe_rc_iva, 2), 870, cont);
                // doc.text(round(datos.importe_anticipos, 2), 890, cont);
                // doc.text(round(datos.importe_prestamos, 2), 920, cont);

                // doc.text(datos.importe_total_descuento, 935, cont);
                // doc.text(datos.importe_liquido_pagable, 965, cont);


                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }


            //FIN IMPRIMIR BOLETAS DE PAGO
            $scope.abrirDialogEdicionSueldo = function (empleado) {
                $scope.empleado = empleado;
                $scope.sueldo = angular.copy(empleado);
                $scope.abrirPopup($scope.idModalEditarSueldo);
            }

            $scope.cerrarModalEditarSueldo = function () {
                $scope.cerrarPopup($scope.idModalEditarSueldo)
            }

            $scope.calcularTotalEditadoSueldo = function () {
                $scope.sueldo.ganado = round($scope.sueldo.importe_sueldo_basico / 30 * $scope.sueldo.dt, 2);
                $scope.sueldo.horas_extras = $scope.sueldo.horas_extras_r + $scope.sueldo.dias_rol_turnos * $scope.sueldo.horas_extras_rol;
                $scope.sueldo.importe_horas_extras = round(($scope.sueldo.ganado / 30 / 8 * $scope.sueldo.horas_extras) * 2, 2);
                $scope.sueldo.importe_recargo_nocturno = Math.round(($scope.sueldo.ganado / 30 / 8 * $scope.sueldo.horas_extras) * 1.5);
                $scope.sueldo.total_ganado = round($scope.sueldo.ganado + $scope.sueldo.importe_horas_extras + $scope.sueldo.importe_recargo_nocturno + $scope.sueldo.importe_bono_antiguedad + $scope.sueldo.importe_bono_frontera + $scope.sueldo.importe_otros_bonos, 2);
                $scope.sueldo.afp = round($scope.sueldo.total_ganado * 12.71 / 100, 2);
                $scope.sueldo.importe_total_descuento = round($scope.sueldo.afp + $scope.sueldo.rc_iva + $scope.sueldo.importe_anticipos + $scope.sueldo.importe_prestamos, 2);
                $scope.sueldo.liquido_pagable = round($scope.sueldo.total_ganado - $scope.sueldo.importe_total_descuento, 2);
            }

            $scope.modificarSueldoEditado = function (sueldo) {
                $scope.empleado = angular.extend($scope.empleado, sueldo);
                $scope.sumarTotalesEditados($scope.planillaC);
                $scope.cerrarModalEditarSueldo();
            }

            $scope.sumarTotalesEditados = function (planillaC) {
                // ==== calcular totales en el modal de la edicion ===================
                $scope.totalSueldoBasico = 0;
                $scope.totalGanadoSueldo = 0;
                $scope.sumaHorasExtras = 0;
                $scope.sumaTotalHorasExtras = 0;
                $scope.sumaRecargoNocturno = 0;
                $scope.sumaBonoAntiguedad = 0;
                $scope.sumaBonoFrontera = 0;
                $scope.sumaOtrosBonos = 0;
                $scope.sumaTotalGanado = 0;
                $scope.sumaAFP = 0;
                $scope.sumaRCIVA = 0;
                $scope.sumaAniticipos = 0;
                $scope.sumaPrestamos = 0;
                $scope.sumaTotalDescuento = 0;
                $scope.sumaLiquidoPagable = 0;
                var totalEmpleados = 0;
                if (planillaC.detalles != undefined) {
                    for (var i = planillaC.detalles.length - 1; i >= 0; i--) {
                        // for(var i=0;i<planilla.RecursosHumanosEmpleados.length;i++){
                        totalEmpleados = totalEmpleados + 1;
                        $scope.totalGanadoSueldo = round($scope.totalGanadoSueldo + planillaC.detalles[i].ganado, 2);
                        $scope.totalSueldoBasico = round($scope.totalSueldoBasico + planillaC.detalles[i].importe_sueldo_basico, 2);
                        $scope.sumaHorasExtras = $scope.sumaHorasExtras + planillaC.detalles[i].horas_extras;
                        $scope.sumaTotalHorasExtras = round($scope.sumaTotalHorasExtras + planillaC.detalles[i].importe_horas_extras, 2);
                        $scope.sumaRecargoNocturno = round($scope.sumaRecargoNocturno + planillaC.detalles[i].importe_recargo_nocturno, 2);
                        $scope.sumaBonoAntiguedad = round($scope.sumaBonoAntiguedad + planillaC.detalles[i].importe_bono_antiguedad, 2);
                        $scope.sumaBonoFrontera = round($scope.sumaBonoFrontera + planillaC.detalles[i].importe_bono_frontera, 2);
                        $scope.sumaOtrosBonos = round($scope.sumaOtrosBonos + planillaC.detalles[i].importe_otros_bonos, 2);
                        $scope.sumaTotalGanado = round($scope.sumaTotalGanado + planillaC.detalles[i].total_ganado, 2);
                        $scope.sumaAFP = round($scope.sumaAFP + planillaC.detalles[i].afp, 2);
                        $scope.sumaRCIVA = round($scope.sumaRCIVA + planillaC.detalles[i].rc_iva, 2);
                        $scope.sumaAniticipos = round($scope.sumaAniticipos + planillaC.detalles[i].importe_anticipos, 2);
                        $scope.sumaPrestamos = round($scope.sumaPrestamos + planillaC.detalles[i].importe_prestamos, 2);
                        $scope.sumaTotalDescuento = round($scope.sumaTotalDescuento + planillaC.detalles[i].importe_total_descuento, 2);
                        $scope.sumaLiquidoPagable = round($scope.sumaLiquidoPagable + planillaC.detalles[i].liquido_pagable, 2);
                    }
                }
                planillaC.importe_sueldo_basico = $scope.totalSueldoBasico;
                planillaC.importe_ganado = $scope.totalGanadoSueldo;
                planillaC.total_horas_extras = $scope.sumaTotalHorasExtras;
                planillaC.importe_horas_extras = $scope.sumaHorasExtras;
                planillaC.importe_recargo_nocturno = $scope.sumaRecargoNocturno;
                planillaC.importe_bono_antiguedad = $scope.sumaBonoAntiguedad;
                planillaC.importe_bono_frontera = $scope.sumaBonoFrontera;
                planillaC.importe_otros_bonos = $scope.sumaOtrosBonos;
                planillaC.importe_total_ganado = $scope.sumaTotalGanado;
                planillaC.importe_afp = $scope.sumaAFP;
                planillaC.importe_rc_iva = $scope.sumaRCIVA;
                planillaC.importe_anticipos = $scope.sumaAniticipos;
                planillaC.importe_prestamos = $scope.sumaPrestamos;
                planillaC.importe_total_descuento = $scope.sumaTotalDescuento;
                planillaC.importe_liquido_pagable = $scope.sumaLiquidoPagable;

            }

            $scope.actualizarPlanilla = function (planillaedit) {
                // blockUI.start();
                // $scope.parametros = parametro;
                $scope.buscarPlanilla = "";
                RecursosHumanosPlanillaSueldos.update({ id_empresa: $scope.usuario.id_empresa }, planillaedit, function (res) {
                    // console.log('el mensaje es----', res.mensaje);
                    SweetAlert.swal("Guardado!", res.mensaje, "success");
                }, function (error) {
                    SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
                })

                // blockUI.stop();
                $scope.cerrarVerPlanillaSueldos();
            }

            $scope.cerrarVerPlanillaSueldos = function () {
                $scope.buscarPlanilla = "";
                $scope.cerrarPopup($scope.idModalVerPlanillaSueldo);
            }

            $scope.ordenPlanillas = true;
            $scope.ordenarPlanilla = function (orden) {
                $scope.planilla.RecursosHumanosEmpleados = $filter('orderBy')($scope.planilla.RecursosHumanosEmpleados, ['nombre_completo'], orden);
                $scope.ordenPlanillas = !orden;
            }

            $scope.ordenPlanillas = true;
            $scope.ordenarPlanillaEditar = function (orden) {
                $scope.planillaC.detalles = $filter('orderBy')($scope.planillaC.detalles, ['DetalleFicha.empleado.persona.apellido_paterno'], orden);
                $scope.ordenPlanillas = !orden;
            }

            $scope.editarPlanillaSueldo = function (planilla) {
                $scope.puedeEditarPlanilla = true;
                $scope.abrirPopup($scope.idModalVerPlanillaSueldo);
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };
                var promesa = ListaPlanillaSueldosDetalle(planilla.id);
                promesa.then(function (dato) {
                    $scope.planillaC = planilla;
                    $scope.planillaC.detalles = dato.planillas;
                    $scope.ordenarPlanillaEditar(false);
                    // blockUI.stop();
                });
            }

            $scope.excelPlanillaSueldo = function (planilla) {
                var data = [["N°", "Empleado", "F. Naci.", "C.I.", "Extension", "Cargo", "Campamento",
                    "F. Ingre.", "Matricula", "Basico", "DT", "Ganado", "DC", "Hrs Extra", "Total Extras",
                    "NT", "Recargo Nocturno", "BonoAntig", "Bono Front", "Otros Bonos",
                    "Total Ganado", "AFP", "RC IVA", "Anti.", "Prest.", "Total Desc.", "Liquido Pagable", "Regional de Seguro", "Banco", "Cuenta"]];
                var planillasGet = planilla.RecursosHumanosEmpleados;
                for (var i = 0; i < planillasGet.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(planillasGet[i].nombre_completo);
                    var fecha = $scope.fechaATexto(planillasGet[i].fecha_nacimiento);
                    columns.push(fecha);
                    columns.push(planillasGet[i].ci);
                    columns.push(planillasGet[i].extension);
                    if (planillasGet[i].cargos != null) {
                        columns.push(planillasGet[i].cargos.toUpperCase());
                    } else {
                        columns.push("");
                    }
                    columns.push(planillasGet[i].campamento.toUpperCase());
                    var fechaInicio = $scope.fechaATexto(planillasGet[i].fecha_inicio);
                    columns.push(fechaInicio);
                    if (planillasGet[i].matricula_seguro != null) {
                        columns.push(planillasGet[i].matricula_seguro.toUpperCase());
                    } else {
                        columns.push("");
                    }
                    columns.push(planillasGet[i].sueldoBasico);
                    columns.push(planillasGet[i].dt);
                    columns.push(planillasGet[i].ganado);
                    columns.push(planillasGet[i].diasRolTurnos);
                    columns.push(planillasGet[i].horasExtras);
                    columns.push(planillasGet[i].totalHorasExtras);
                    columns.push(planillasGet[i].nt);
                    columns.push(planillasGet[i].recargoNocturno);
                    columns.push(planillasGet[i].bonoAntiguedad);
                    columns.push(planillasGet[i].bonoFrontera);
                    columns.push(planillasGet[i].otrosBonos);
                    columns.push(planillasGet[i].totalGanado);
                    columns.push(planillasGet[i].afp);
                    columns.push(planillasGet[i].rc_iva);
                    columns.push(planillasGet[i].anticipos);
                    columns.push(planillasGet[i].prestamos);
                    columns.push(planillasGet[i].totalDescuento);
                    columns.push(planillasGet[i].liquidoPagable);
                    columns.push(planillasGet[i].lugar_seguro_salud ? planillasGet[i].lugar_seguro_salud : "");
                    columns.push(planillasGet[i].nombre_banco ? planillasGet[i].nombre_banco : "");
                    columns.push(planillasGet[i].numero_cuenta ? planillasGet[i].numero_cuenta : "");
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE SUELDOS PRE IMPRESION .xlsx");
                blockUI.stop();

            }

            $scope.excelPlanillaSueldoEdicion = function (planilla) {
                var data = [["N°", "Empleado", "F. Naci.", "C.I.", "Expedido", "Cargo", "Campamento", "Ubicación",
                    "F. Ingre.", "Matricula", "Basico", "DT", "Ganado", "DC", "Hrs Extra", "Total Extras",
                    "NT", "Recargo Nocturno", "BonoAntig", "Bono Front", "Otros Bonos",
                    "Total Ganado", "AFP", "RC IVA", "Anti.", "Prest.", "Total Desc.", "Liquido Pagable", "Regional de Seguro", "Banco", "Cuenta"]];
                var planillasGet = planilla.detalles;
                console.log('datos planilla', planillasGet);
                for (var i = 0; i < planillasGet.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(planillasGet[i].DetalleFicha.empleado.persona.nombre_completo);
                    var fecha = $scope.fechaATexto(planillasGet[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    columns.push(fecha);
                    columns.push(planillasGet[i].DetalleFicha.empleado.persona.ci);
                    columns.push(planillasGet[i].DetalleFicha.empleado.extension.nombre_corto);
                    
                    if (planillasGet[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        var cargosEmpleado = planillasGet[i].DetalleFicha.cargos.map(function(elem){
                            return elem.cargo.nombre;
                        }).join(", ")

                        columns.push(cargosEmpleado.toUpperCase());
                    } else {
                        columns.push("");
                    }
                    columns.push(planillasGet[i].DetalleFicha.campo.nombre.toUpperCase());
                    columns.push(planillasGet[i].DetalleFicha.ubicacion.nombre.toUpperCase());
                    var fechaInicio = $scope.fechaATexto(planillasGet[i].DetalleFicha.fecha_inicio);
                    columns.push(fechaInicio);
                    if (planillasGet[i].DetalleFicha.matricula_seguro != null) {
                        columns.push(planillasGet[i].DetalleFicha.matricula_seguro.toUpperCase());
                    } else {
                        columns.push("");
                    }
                    columns.push(planillasGet[i].importe_sueldo_basico);
                    columns.push(planillasGet[i].dt);
                    columns.push(planillasGet[i].ganado);
                    columns.push(planillasGet[i].dias_rol_turnos);
                    columns.push(planillasGet[i].horas_extras);
                    columns.push(planillasGet[i].importe_horas_extras);
                    columns.push(planillasGet[i].nt);
                    columns.push(planillasGet[i].importe_recargo_nocturno);
                    columns.push(planillasGet[i].importe_bono_antiguedad);
                    columns.push(planillasGet[i].importe_bono_frontera);
                    columns.push(planillasGet[i].importe_otros_bonos);
                    columns.push(planillasGet[i].total_ganado);
                    columns.push(planillasGet[i].afp);
                    columns.push(planillasGet[i].rc_iva);
                    columns.push(planillasGet[i].importe_anticipos);
                    columns.push(planillasGet[i].importe_prestamos);
                    columns.push(planillasGet[i].importe_total_descuento);
                    columns.push(planillasGet[i].liquido_pagable);
                    columns.push(planillasGet[i].DetalleFicha.lugarSeguroSalud ? planillasGet[i].DetalleFicha.lugarSeguroSalud.nombre : "");
                    columns.push(planillasGet[i].DetalleFicha.banco ? planillasGet[i].DetalleFicha.banco.nombre : "");
                    columns.push(planillasGet[i].DetalleFicha.numero_cuenta ? planillasGet[i].DetalleFicha.numero_cuenta : "");
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE SUELDOS PRE IMPRESION .xlsx");
                blockUI.stop();

            }

            $scope.imprimirPlanillaSueldo = function (filtro) {

                SweetAlert.swal("Espere mientras se carga el reporte !");

                var cadena = filtro.mes.split("-");
                var mes = cadena[1];
                var año = filtro.gestion;
                var cabeceraFecha = [mes, año];

                //var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa);
                //promesa.then(function (dato) {
                var planilla = $scope.planilla.RecursosHumanosEmpleados;
                //[612, 912]
                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(planilla.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldo(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0;
                for (var i = 0; i < planilla.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(planilla[i].nombre_completo, 50, y, { width: 120 });
                    var fecha = $scope.fechaATexto(planilla[i].fecha_nacimiento);
                    doc.text(fecha, 170, y);
                    doc.text(planilla[i].ci + " " + planilla[i].extension, 210, y);
                    if (planilla[i].cargos != null) {
                        doc.text(planilla[i].cargos.toUpperCase(), 250, y, { width: 100 });
                    } else {
                        doc.text("", 250, y, { width: 100 });
                    }
                    doc.text(planilla[i].campamento.toUpperCase(), 350, y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].fecha_inicio);
                    doc.text(fechaInicio, 410, y);
                    if (planilla[i].matricula_seguro != null) {
                        doc.text(planilla[i].matricula_seguro.toUpperCase(), 450, y);
                    } else {
                        doc.text("", 450, y);
                    }
                    var basico = planilla[i].haber_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 510, y);
                    doc.text(planilla[i].dt, 545, y);
                    var ganado = round(planilla[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 560, y);
                    var hrsExtras = planilla[i].horasExtras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 598, y);
                    var totalHorasExtras = round(planilla[i].totalHorasExtras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 628, y)
                    var nt = round(planilla[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 660, y);
                    var recargoNocturno = planilla[i].recargoNocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 690, y);
                    var bonoAntiguedad = planilla[i].bonoAntiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 725, y);
                    var bonoFrontera = planilla[i].bonoFrontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 757, y);
                    var otrosBonos = planilla[i].otrosBonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 785, y);
                    var totalGanado = round(planilla[i].totalGanado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 805, y)
                    var afp = round(planilla[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 840, y);
                    var rc_iva;
                    if (planilla[i].rc_iva_mes == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = planilla[i].rc_iva_mes;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(rc_iva, 870, y);
                    var anticipos = planilla[i].anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    doc.text(anticipos, 890, y);
                    var prestamo = planilla[i].prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(prestamo, 920, y);
                    var totalDescuento = round(planilla[i].totalDescuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(totalDescuento, 935, y);
                    var liquidoPagado = round(planilla[i].liquidoPagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(liquidoPagado, 965, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 450, y + 20);
                        doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(round(importeTotalGanado, 2), 560, y + 20);
                        doc.text(round(importeHrsExtras, 2), 598, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 628, y + 20);
                        doc.text(round(totalNT, 2), 660, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 690, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 725, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 757, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 785, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 805, y + 20)
                        doc.text(round(importeTotalAFP, 2), 840, y + 20);
                        doc.text(round(importeTotalRCIVA, 2), 870, y + 20);
                        doc.text(round(importeTotalAnticipos, 2), 890, y + 20);
                        doc.text(round(importeTotalPrestamo, 2), 920, y + 20);
                        doc.text(round(importeSumaTotalDescuento, 2), 935, y + 20);
                        doc.text(round(importeSumaTotalLiquido, 2), 965, y + 20);

                    }

                    y = y + 20;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != planilla.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 80;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaSueldo(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                        }
                    }
                }

                doc.font('Helvetica-Bold', 6);
                doc.text("TOTALES", 450, cont);

                doc.text(round($scope.planilla.importeSueldoBasico, 2), 510, cont);
                doc.text(round($scope.planilla.importeTotalGanado, 2), 560, cont);
                doc.text(round(importeHrsExtras, 2), 598, cont);
                doc.text(round($scope.planilla.importeHorasExtras, 2), 628, cont);
                doc.text(round(totalNT, 2), 660, cont);
                doc.text(round($scope.planilla.importeRecargoNocturno, 2), 690, cont);
                doc.text(round($scope.planilla.importeBonoAntiguedad, 2), 725, cont);
                doc.text(round($scope.planilla.importeBonoFrontera, 2), 757, cont);
                doc.text(round($scope.planilla.importeOtrosBonos, 2), 785, cont);
                doc.text(round($scope.planilla.importeTotalGanado, 2), 805, cont)
                doc.text(round($scope.planilla.importeAFP, 2), 840, cont);
                doc.text(round($scope.planilla.importeRCIVA, 2), 870, cont);
                doc.text(round($scope.planilla.importeAniticipos, 2), 890, cont);
                doc.text(round($scope.planilla.importePrestamos, 2), 920, cont);

                doc.text($scope.planilla.importeTotalDescuento, 935, cont);
                doc.text($scope.planilla.importeLiquidoPagable, 965, cont);


                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.imprimirPlanillaSueldoEdicion = function (filtro) {

                SweetAlert.swal("Espere mientras se carga el reporte !");

                var cadena = filtro.mes.split("-");
                var mes = cadena[1];
                var año = filtro.anio;
                var cabeceraFecha = [mes, año];

                //var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa);
                //promesa.then(function (dato) {
                var planilla = filtro.detalles;
                //[612, 912]
                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(planilla.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldoEdicion(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, totalNT = 0,
                    importeTotalPrestamo = 0, importeSumaTotalDescuento = 0, importeSumaTotalLiquido = 0, importeDC = 0;
                for (var i = 0; i < planilla.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(planilla[i].DetalleFicha.empleado.persona.nombre_completo, 50, y, { width: 120 });
                    var fecha = $scope.fechaATexto(planilla[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    doc.text(fecha, 170, y);
                    doc.text(planilla[i].DetalleFicha.empleado.persona.ci + " " + planilla[i].DetalleFicha.empleado.extension.nombre_corto, 210, y);
                    if (planilla[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                        doc.text(planilla[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 250, y, { width: 100 });
                    } else {
                        doc.text("", 250, y, { width: 100 });
                    }
                    doc.text(planilla[i].DetalleFicha.campo.nombre.toUpperCase(), 350, y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 410, y);
                    if (planilla[i].DetalleFicha.matricula_seguro != null) {
                        doc.text(planilla[i].DetalleFicha.matricula_seguro.toUpperCase(), 450, y);
                    } else {
                        doc.text("", 450, y);
                    }
                    var basico = planilla[i].importe_sueldo_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 510, y);
                    doc.text(planilla[i].dt, 545, y);
                    var ganado = round(planilla[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 560, y);

                    var dias_rol_turnos = planilla[i].dias_rol_turnos;
                    importeDC = importeDC + dias_rol_turnos;
                    doc.text(dias_rol_turnos, 595, y);
                    var hrsExtras = planilla[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 610, y);
                    var totalHorasExtras = round(planilla[i].importe_horas_extras, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 635, y)
                    var nt = round(planilla[i].nt, 2);
                    totalNT = totalNT + nt;
                    doc.text(nt, 665, y);

                    var recargoNocturno = planilla[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 690, y);
                    var bonoAntiguedad = planilla[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 725, y);
                    var bonoFrontera = planilla[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 757, y);
                    var otrosBonos = planilla[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 785, y);
                    var totalGanado = round(planilla[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 805, y)
                    var afp = round(planilla[i].afp, 2);
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 840, y);
                    var rc_iva;
                    if (planilla[i].rc_iva == null) {
                        rc_iva = 0
                    } else {
                        rc_iva = planilla[i].rc_iva;
                    }
                    importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                    doc.text(rc_iva, 870, y);
                    var anticipos = planilla[i].importe_anticipos;
                    importeTotalAnticipos = importeTotalAnticipos + anticipos;
                    doc.text(anticipos, 890, y);
                    var prestamo = planilla[i].importe_prestamos
                    importeTotalPrestamo = importeTotalPrestamo + prestamo;
                    doc.text(prestamo, 920, y);
                    var totalDescuento = round(planilla[i].importe_total_descuento, 2);
                    importeSumaTotalDescuento = importeSumaTotalDescuento + totalDescuento;
                    doc.text(totalDescuento, 935, y);
                    var liquidoPagado = round(planilla[i].liquido_pagable, 2);
                    importeSumaTotalLiquido = importeSumaTotalLiquido + liquidoPagado;
                    doc.text(liquidoPagado, 965, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 450, y + 20);
                        doc.text(round(importeTotalBasico, 2), 510, y + 20);
                        doc.text(round(importeTotalGanado, 2), 560, y + 20);
                        // doc.text(round(importeDC, 2), 595, y + 20);
                        doc.text(round(importeHrsExtras, 2), 610, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 635, y + 20);
                        doc.text(round(totalNT, 2), 665, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 690, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 725, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 757, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 785, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 805, y + 20)
                        doc.text(round(importeTotalAFP, 2), 840, y + 20);
                        doc.text(round(importeTotalRCIVA, 2), 870, y + 20);
                        doc.text(round(importeTotalAnticipos, 2), 890, y + 20);
                        doc.text(round(importeTotalPrestamo, 2), 920, y + 20);
                        doc.text(round(importeSumaTotalDescuento, 2), 935, y + 20);
                        doc.text(round(importeSumaTotalLiquido, 2), 965, y + 20);

                    }

                    y = y + 20;
                    var cont = y;
                    items++;

                    if (items == itemsPorPagina) {
                        totalAray = totalAray + items;
                        if (totalAray != planilla.length) {
                            doc.addPage({ size: 'legal', layout: 'landscape', margin: 10 });
                            y = 80;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPlanillaSueldoEdicion(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                        }
                    }
                }

                doc.font('Helvetica-Bold', 6);
                doc.text("TOTALES", 450, cont);

                doc.text(round(filtro.importe_sueldo_basico, 2), 510, cont);
                doc.text(round(filtro.importe_ganado, 2), 560, cont);
                // doc.text(round(importeDC, 2), 595, cont);
                doc.text(round(importeHrsExtras, 2), 610, cont);
                doc.text(round(importeTotalHrsExtras, 2), 635, cont);
                doc.text(round(totalNT, 2), 665, cont);
                doc.text(round(filtro.importe_recargo_nocturno, 2), 690, cont);
                doc.text(round(filtro.importe_bono_antiguedad, 2), 725, cont);
                doc.text(round(filtro.importe_bono_frontera, 2), 757, cont);
                doc.text(round(filtro.importe_otros_bonos, 2), 785, cont);
                doc.text(round(filtro.importe_total_ganado, 2), 805, cont)
                doc.text(round(filtro.importe_afp, 2), 840, cont);
                doc.text(round(filtro.importe_rc_iva, 2), 870, cont);
                doc.text(round(filtro.importe_anticipos, 2), 890, cont);
                doc.text(round(filtro.importe_prestamos, 2), 920, cont);

                doc.text(filtro.importe_total_descuento, 935, cont);
                doc.text(filtro.importe_liquido_pagable, 965, cont);


                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                    SweetAlert.swal({
                        title: 'Finalizado!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                });
            }

            $scope.dibujarCabeceraPlanillaSueldoEdicion = function (doc, planilla, pagina, totalPaginas, fecha) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 30, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.text("(En Bolivianos)", 0, 40, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 50, 60);
                doc.text("F. Naci.", 170, 60);
                doc.text("C.I.", 215, 60);
                doc.text("Cargo", 260, 60);
                doc.text("Campamento", 345, 60);
                doc.text("F. Ingre.", 410, 60);
                doc.text("Matricula", 455, 60);
                doc.text("Basico", 510, 60);
                doc.text("DT", 545, 60);
                doc.text("Ganado", 560, 60);

                doc.text("DC", 595, 60);
                doc.text("Hrs", 613, 60);
                doc.text("Extra", 610, 70);
                doc.text("Total", 638, 60);
                doc.text("Extras", 635, 70);
                doc.text("NT", 663, 60)

                doc.text("Recargo", 680, 60);
                doc.text("Nocturno", 678, 70);
                doc.text("Bono", 720, 60);
                doc.text("Antig", 719, 70);
                doc.text("Bono", 749, 60);
                doc.text("Front", 748, 70)
                doc.text("Otros", 775, 60);
                doc.text("Bonos", 775, 70);
                doc.text("Total", 805, 60);
                doc.text("Ganado", 805, 70);
                doc.text("AFP", 840, 60);
                doc.text("RC", 865, 60);
                doc.text("IVA", 865, 70);
                doc.text("Anti.", 885, 60);
                doc.text("Prest.", 907, 60);
                doc.text("Total", 935, 60);
                doc.text("Desc.", 935, 70);
                doc.text("Liquido", 960, 60);
                doc.text("Pagable", 960, 70);

            }

            $scope.dibujarCabeceraPlanillaSueldo = function (doc, planilla, pagina, totalPaginas, fecha) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 30, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 30, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE SUELDOS Y SALARIOS", 0, 20, { align: 'center' });
                doc.text("(En Bolivianos)", 0, 40, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 50, 60);
                doc.text("F. Naci.", 170, 60);
                doc.text("C.I.", 215, 60);
                doc.text("Cargo", 260, 60);
                doc.text("Campamento", 345, 60);
                doc.text("F. Ingre.", 410, 60);
                doc.text("Matricula", 455, 60);
                doc.text("Basico", 510, 60);
                doc.text("DT", 545, 60);
                doc.text("Ganado", 560, 60);
                doc.text("Hrs", 598, 60);
                doc.text("Extra", 595, 70);
                doc.text("Total", 628, 60);
                doc.text("Extras", 625, 70);
                doc.text("NT", 658, 60)
                doc.text("Recargo", 680, 60);
                doc.text("Nocturno", 678, 70);
                doc.text("Bono", 720, 60);
                doc.text("Antig", 719, 70);
                doc.text("Bono", 749, 60);
                doc.text("Front", 748, 70)
                doc.text("Otros", 775, 60);
                doc.text("Bonos", 775, 70);
                doc.text("Total", 805, 60);
                doc.text("Ganado", 805, 70);
                doc.text("AFP", 840, 60);
                doc.text("RC", 865, 60);
                doc.text("IVA", 865, 70);
                doc.text("Anti.", 885, 60);
                doc.text("Prest.", 907, 60);
                doc.text("Total", 935, 60);
                doc.text("Desc.", 935, 70);
                doc.text("Liquido", 960, 60);
                doc.text("Pagable", 960, 70);

            }
            $scope.PopoverReportes_OVT_AFP = {
                templateUrl: 'PopoverReportes_OVT_AFP.html',
                title: 'Menu',
                isOpen: false
            };
            $scope.generarReporteExcelPlanillaSueldosOVT = (planillaSueldos) => {
                const promesa = ReporteExcelPlanillaOVT(planillaSueldos.id)
                promesa.then((datosReporte) => {
                    if (datosReporte.errors) {
                        let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                        let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                        errores = errores.concat(warnings)
                        errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                        $scope.mostrarMensaje(errores.join('<br />'));
                    }
                    if (datosReporte.hasErr) return $scope.mostrarMensaje(datosReporte.mensaje);
                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA OVT.xlsx");
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarReporteExcelPlanillaSueldosOVTAguinaldos = (planillaSueldos) => {
                const promesa = ReporteExcelPlanillaOVTAguinaldos(planillaSueldos.id)
                promesa.then((datosReporte) => {
                    if (datosReporte.errors) {
                        let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                        let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                        errores = errores.concat(warnings)
                        errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                        $scope.mostrarMensaje(errores.join('<br />'));
                    }
                    if (datosReporte.hasErr) return $scope.mostrarMensaje(datosReporte.mensaje);
                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA OVT AGUINALDOS.xlsx");
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarReporteExcelPlanillaSueldosAFPFUTURO = (planillaSueldos) => {
                const promesa = ReporteExcelPlanillaAFPFUTURO(planillaSueldos.id)
                promesa.then((datosReporte) => {
                    if (datosReporte.errors) {
                        let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                        let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                        errores = errores.concat(warnings)
                        errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                        $scope.mostrarMensaje(errores.join('<br />'));
                    }
                    if (datosReporte.hasErr) return $scope.mostrarMensaje(datosReporte.mensaje);
                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA AFP FUTURO.xlsx");
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarReporteExcelPlanillaSueldosAFPPREVISION = (planillaSueldos) => {
                const promesa = ReporteExcelPlanillaAFPPREVISION(planillaSueldos.id)
                promesa.then((datosReporte) => {
                    if (datosReporte.errors) {
                        let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                        let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                        errores = errores.concat(warnings)
                        errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                        $scope.mostrarMensaje(errores.join('<br />'));
                    }
                    if (datosReporte.hasErr) return $scope.mostrarMensaje(datosReporte.mensaje);
                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    blockUI.stop();
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA AFP PREVISIÓN.xlsx");
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarReporteExcelSiatRcIva = function (planilla) {
                const promesa = ReporteExcelPlanillaSiatRcIva(planilla.id)
                promesa.then((empleados) => {
                    var data = [["PRIMER APELLIDO", "SEGUNDO APELLIDO", "APELLIDO DE CASADA", "NOMBRES", "DOMICILIO", "TIPO DOCUMENTO IDENTIDAD", "NUMERO DOCUMENTO", "LUGAR DE EXPEDICION"]];
                    var emp = empleados.empleados;
                    for (var i = 0; i < emp.length; i++) {
                        var empleado = emp[i];
                        var columns = [];
                        columns.push(empleado.persona.apellido_paterno);
                        columns.push(empleado.persona.apellido_materno);
                        columns.push(empleado.persona.apellido_casada);
                        columns.push(empleado.persona.nombres);
                        columns.push(empleado.persona.direccion_zona);
                        columns.push(empleado.tipoDocumento.nombre_corto);
                        columns.push(empleado.persona.ci);
                        columns.push(empleado.extension.nombre_corto);
                        data.push(columns);
                    }

                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA SIAT RCIVA.xlsx");
                    // blockUI.stop();
                });
            }
            $scope.obtenerDepartamentos = function () {
                blockUI.start();
                var nombre_corto = '-BOL';
                var promesa = Paises(nombre_corto);
                promesa.then(function (entidades) {
                    $scope.departamentosBanco = entidades;

                    blockUI.stop();
                });

            }
            $scope.listaPlanillaSueldosDetalle = function (id) {
                var promesa = ListaPlanillaSueldosDetalle(id);
                promesa.then(function (dato) {
                    $scope.planillaC.detalles = dato.planillas;
                    $scope.ordenarPlanillaEditar(false);
                    // blockUI.stop();
                });
            }
            $scope.guardarTr3Empleado = function () {
                let arrlegoPlanillasSueldoBanco = []

                $scope.planillaC.detalles.forEach(function (detalle, index, array) {
                    bandera = false
                    const banco_empleado = detalle.DetalleFicha &&
                        detalle.DetalleFicha.banco &&
                        detalle.DetalleFicha.banco.nombre.split(' ').map(word => word.toUpperCase().trim()).join(' ') ||
                        '' || ''
                    const banco = $scope.datosBanco.nombre.split(' ').map(word => word.toUpperCase().trim()).join(' ')
                    if (banco === banco_empleado) {
                        bandera = true
                    }
                    if (bandera) {
                        arrlegoPlanillasSueldoBanco.push(detalle)
                    }
                })
                $scope.tr3.planillasSueldo = arrlegoPlanillasSueldoBanco
                $scope.tr3.fecha_elaboracion = new Date($scope.convertirFecha($scope.tr3.fecha_elaboracion))
                const promesa = GuardarTr3PlanillaSueldo($scope.tr3, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    $scope.imprimirTr3(dato.tr3Encontrado, $scope.tr3.tipo)
                    $scope.imprimirCartaTr3(dato.tr3Encontrado, $scope.tr3.tipo)
                    $scope.mostrarMensaje(dato.mensaje)
                })

            }
            $scope.descargarArchivoTr3 = function (contenidoEnBlob, nombreArchivo) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(contenidoEnBlob);
            };
            $scope.generarTextoCartaTr3 = function (datos) {
                var fecha = new Date(datos.tr3Encontrado.fecha)
                var mes = fecha.getMonth() + 1
                var dia = fecha.getDate()
                var mesActual = ""
                for (var i = 0; i < $scope.meses.length; i++) {
                    var element = $scope.meses[i];
                    if ((mes - 1) === element.id) {
                        mesActual = element.nombre
                    }
                }
                mes = (mes < 10) ? "0" + mes : mes
                dia = (dia < 10) ? "0" + dia : dia
                anio = fecha.getFullYear()
                var totalLiteral = ConvertirALiteral(datos.total.toFixed(2));
                datos.total = datos.total.toFixed(2)
                var texto = [];
                if (datos.tipo == "MSC") {
                    var cabezera = "\r\n\r\n" + datos.tr3Encontrado.departamento.nombre + " " + dia + " de " + mesActual + " del " + anio + "\r\n" +
                        "Nro Cite: ESS-P-29/18\r\n\r\n\r\n" +
                        "Señores \r\n" +
                        datos.tr3Encontrado.cuenta.nombre + "\r\n" +
                        "Ciudad\r\n\r\n" +
                        "Ref.: Orden de Pago\r\n\r\n" +
                        "De nuestra consideración:\r\n\r\n" +
                        "Mediante la presente y según contrato suscrito con el Banco Mercantil Santa Cruz S.A.,\r\n" +
                        "autorizamos a ustedes realizar el débito por el valor total de Bs. " + datos.total + "\r\n(" + totalLiteral + ")\r\n" +
                        "correspondiente a la cancelación de la planilla de pago(s), de acuerdo al siguiente detalle:\r\n\r\n" +

                        "* Cuenta de débito Nro:                 " + datos.tr3Encontrado.cuenta.numero + "\r\n" +
                        "* Cuenta Pago de Planilla:              " + datos.tr3Encontrado.planilla + "\r\n" +
                        "* Nombre del archivo:                   " + datos.tr3Encontrado.planilla + "" + dia + "" + (mes) + "" + anio + "" + datos.tr3Encontrado.numero_planilla + ".tr3\r\n" +
                        "* Código de control:                     87fd35e019787f9612a4ffb9fc2cb415\r\n" +
                        "* Nombre / Número de planilla:  " + datos.tr3Encontrado.nombre_planilla + "\r\n" +
                        "* Monto total de débito:                 Bs " + datos.total + "\r\n\r\n" +

                        "Los datos apuntados anteriormente y el detalle de pagos, se encuentran en el archivo \r\n" +
                        datos.tr3Encontrado.planilla + "" + dia + "" + (mes) + "" + anio + "" + datos.tr3Encontrado.numero_planilla + ".tr3, adjunto a la presente carta.\r\n\r\n " +

                        "Si, a los efectos de la presente, fuera necesario realizar compra venta de moneda nacional\r\n" +
                        "o extranjera,  también  autorizamos e instruimos  realizar las operaciones  necesarias  para\r\n" +
                        "cumplir  con  lo  instruido,  de  tal  manera  que se realicen  los abonos  en  la moneda  que\r\n" +
                        "corresponda a cada cuenta beneficiaria.\r\n" +
                        " Debo informar lo siguiente:\r\n" +
                        "El origen de los fondos corresponde al " + datos.tr3Encontrado.origen_fondos + ".\r\n" +
                        "El Destino de los Fondos, " + datos.tr3Encontrado.destino_fondos + ".\r\n\r\n" +

                        "Agradecemos su gentil atención a esta solicitud.\r\n\r\n" +

                        "Atentamente\r\n\r\n\r\n\r\n" +




                        datos.tr3Encontrado.firma_uno + "                                 " + datos.tr3Encontrado.firma_tres + "\r\n" +
                        datos.tr3Encontrado.firma_dos + "                                             " + datos.tr3Encontrado.firma_cuatro + "\r\n\r\n\r\n" +



                        "Adj. Lo citado"
                    texto.push(cabezera)
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                } else if (datos.tipo == "BU") {

                    var cabezera = "\r\n\r\nSanta Cruz" + " " + dia + " de " + mesActual + " de " + anio + "\r\n" +
                        "ESS-P-30/18\r\n" +
                        "Señores:\r\n" +
                        "BANCO UNION  S.A.\r\n" +
                        "Atn.:" + datos.tr3Encontrado.dirigido_para + "\r\n" +
                        datos.tr3Encontrado.cargo + "\r\n" +
                        "Presente.-\r\n\r\n" +
                        "\t\t\t\tRef.: Autorización para Abono de  Sueldos " + datos.datosPlanillaMes.mes.split("-")[1] + " " + datos.datosPlanillaMes.anio + "\r\n\r\n" +
                        "Mediante la presente solicitamos debiten de nuestra cuenta corriente No." + datos.tr3Encontrado.cuenta.numero + "\r\n" + "el importe total de Bs." + datos.total + "(" + totalLiteral + ")\r\n" + ", y el concepto de comisiones debitar de nuestra cuenta." + "\r\n\r\n" +
                        "Se ha realizado la verificación de nuestro extracto de cuenta  No." + datos.tr3Encontrado.cuenta.numero + ", tenemos saldo suficiente lo cual cubre el importe requerido.\r\n\r\n" +
                        "Enviamos planilla detallada adjunta.\r\n\r\n" +
                        "Debo informar lo siguiente:\r\n\r\n" +
                        "El origen de los fondos corresponde a: " + datos.tr3Encontrado.origen_fondos + "\r\n" +
                        "El destino de los fondos es para: " + datos.tr3Encontrado.destino_fondos + ".\r\n\r\n" +
                        "Agradeciendo de antemano su pronta respuesta vía mail, saludo a Usted cordialmente.\r\n\r\n" +
                        "Atentamente,\r\n\r\n\r\n\r\n\r\n\r\n" +
                        "\t\t" + datos.tr3Encontrado.firma_uno + "\t\t\t\t" + datos.tr3Encontrado.firma_tres + "\r\n" +
                        "\t" + datos.tr3Encontrado.firma_dos + "\t\t\t\t" + "\t\t" + datos.tr3Encontrado.firma_cuatro + "\r\n"
                    texto.push(cabezera)
                    return new Blob(texto, {
                        type: 'text/plain'
                    });
                }
            }
            $scope.generarTextoTr3 = function (datos) {
                var texto = [];
                var cuerpo = ""
                try {
                    if (datos.tipo == "MSC") {
                        var nombreArchivoTr3 = datos.tr3Encontrado.nombre_archivo
                        var fecha = $scope.fechaATexto(datos.tr3Encontrado.fecha)
                        var fechaPago = $scope.fechaATexto(datos.tr3Encontrado.fecha_elaboracion)
                        let mes = datos.datosPlanillaMes.mes.split('-')[0] > 9 ? datos.datosPlanillaMes.mes.split('-')[0] : "0" + datos.datosPlanillaMes.mes.split('-')[0]
                        let nombre = $scope.usuario.empresa.razon_social.charAt(0) + $scope.usuario.empresa.razon_social.charAt(1) + $scope.usuario.empresa.razon_social.charAt(2) + 'SDO' + mes + datos.datosPlanillaMes.anio.charAt(2) + datos.datosPlanillaMes.anio.charAt(3)
                        var cabezera = datos.tr3Encontrado.planilla + "|" + datos.tr3Encontrado.cuenta.numero + "|0|" + nombre + "|" + fecha + "|" + fechaPago + "|" + datos.total.toFixed(2) + "|" + datos.tr3Encontrado.numero_planilla + "\r\n"

                        datos.planillasSueldo.forEach(function (planillaSueldo, index, array) {
                            cabezera += (index + 1) + "|" + planillaSueldo.DetalleFicha.empleado.persona.nombre_completo + "|" + planillaSueldo.DetalleFicha.numero_cuenta + "|" + fechaPago + "|" + datos.tr3Encontrado.numero_planilla + "|" + planillaSueldo.liquido_pagable.toFixed(2) + "|||" + datos.tr3Encontrado.nombre_archivo + "\r\n"
                            if (index === (array.length - 1)) {
                                texto.push(cabezera)
                            }
                        })
                        return new Blob(texto, {
                            type: 'text/plain'
                        });
                    } else if (datos.tipo == "BU") {
                        let primerDigito = ""
                        let segunYFinalDigitos = ""
                        let liquidoPagable = ""
                        let numero_cuenta = ""
                        var fecha = new Date(datos.tr3Encontrado.fecha)
                        var mes = fecha.getMonth() + 1
                        var mes2 = fecha.getMonth()
                        var dia = fecha.getDate()
                        var mesActual = ""
                        for (var i = 0; i < $scope.meses.length; i++) {
                            var element = $scope.meses[i];
                            if (mes2 == element.id) {
                                mesActual = element.nombre
                            }
                        }
                        mes = (mes < 10) ? "0" + mes : mes
                        dia = (dia < 10) ? "0" + dia : dia
                        let cantidadEmpleado = datos.planillasSueldo.length.toString()
                        let textoEspacios = $scope.cantidadEspacioParaAgregar(cantidadEmpleado, 5, "", "0")
                        cantidadEmpleado = textoEspacios + cantidadEmpleado

                        var cabezera = "SUELDOS " + datos.datosPlanillaMes.mes.split('-')[1] + " " + datos.datosPlanillaMes.anio + "-" + cantidadEmpleado + $scope.fechaATexto(datos.tr3Encontrado.fecha).replaceAll('/', "")
                        textoEspacios = $scope.cantidadEspacioParaAgregar(cabezera, 40, " ", " ")
                        cabezera = cabezera.replace('-', textoEspacios)

                        cabezera += "\r\n"
                        let total = datos.total.toFixed(2)
                        totalCeros = $scope.cantidadEspacioParaAgregar(total, 12, "", "0")
                        total = totalCeros + total
                        let totalCeroscuentaFilaDos = $scope.cantidadEspacioParaAgregar(datos.tr3Encontrado.cuenta.numero, 14, "", "0")
                        primerDigito = datos.tr3Encontrado.cuenta.numero.slice(0, 1)
                        segunYFinalDigitos = datos.tr3Encontrado.cuenta.numero.slice(1)
                        numero_cuenta = primerDigito + totalCeroscuentaFilaDos + segunYFinalDigitos
                        cabezera += numero_cuenta + "" + total + "\r\n"
                        datos.planillasSueldo.forEach(function (planillaSueldo, index, array) {
                            fecha = $scope.fechaATexto(datos.tr3Encontrado.fecha_elaboracion)
                            numero_cuenta = planillaSueldo.DetalleFicha.numero_cuenta
                            if (datos.tr3Encontrado.aumentar_ceros) {
                                let totalCeroscuentaFilaDos = $scope.cantidadEspacioParaAgregar(numero_cuenta, 14, "", "0")
                                primerDigito = numero_cuenta.slice(0, 1)
                                segunYFinalDigitos = numero_cuenta.slice(1)
                                numero_cuenta = primerDigito + totalCeroscuentaFilaDos + segunYFinalDigitos
                            }
                            liquidoPagable = planillaSueldo.liquido_pagable.toFixed(2)
                            CerosliquidoPagable = $scope.cantidadEspacioParaAgregar(liquidoPagable, 12, "", "0")
                            liquidoPagable = CerosliquidoPagable + liquidoPagable
                            cabezera += numero_cuenta + "" + liquidoPagable + datos.tr3Encontrado.planilla + "\r\n"
                            if (index === (array.length - 1)) {
                                texto.push(cabezera)
                            }
                        })
                        return new Blob(texto, {
                            type: 'text/plain'
                        });
                    }
                    //El contructor de Blob requiere un Array en el primer parámetro
                    //así que no es necesario usar toString. el segundo parámetro
                    //es el tipo MIME del archivo
                } catch (error) {
                    console.error(error)
                }


            };
            $scope.cantidadEspacioParaAgregar = function (texto, tamañoRequerido, textoEspacios, valorInicial) {
                if (texto.length < tamañoRequerido) {
                    let espacios = tamañoRequerido - texto.length
                    while (espacios > 0) {
                        textoEspacios += valorInicial;
                        espacios--;
                    }
                }
                return textoEspacios

            }
            $scope.imprimirTr3 = function (tr3, tipo) {
                var fecha = new Date(tr3.fecha_elaboracion)
                var mes = fecha.getMonth()
                var dia = fecha.getDate()
                var mesActual = ""
                for (var i = 0; i < $scope.meses.length; i++) {
                    var element = $scope.meses[i];
                    if (mes == element.id) {
                        mesActual = element.nombre
                    }
                }
                mes = (mes < 10) ? "0" + mes : mes
                dia = (dia < 10) ? "0" + dia : dia
                anio = fecha.getFullYear()
                var planillasSUeldoTr3 = []
                var total = 0
                tr3.historialPlanillaSueldoTr3.forEach(function (tr3H, index, array) {
                    total += tr3H.planillaSueldo.liquido_pagable
                    planillasSUeldoTr3.push(tr3H.planillaSueldo)
                    if (index === (array.length - 1)) {
                        var dato = { planillasSueldo: planillasSUeldoTr3, tipo: tipo, tr3Encontrado: tr3, total: total, datosPlanillaMes: tr3H.planillaSueldo.rrhhPlanilla }
                        if (tipo == "MSC") {
                            var nombreArchivo = tr3.nombre_planilla + ".tr3"
                        } else {
                            var nombreArchivo = "SUELDO" + dato.datosPlanillaMes.mes.split('-')[1] + dato.datosPlanillaMes.anio + "BUNION.txt"
                        }
                        $scope.descargarArchivoTr3($scope.generarTextoTr3(dato), nombreArchivo);
                    }
                });

            }
            $scope.imprimirCartaTr3 = function (tr3, tipo) {
                var planillasSUeldoTr3 = []
                var total = 0
                var fecha = new Date(tr3.fecha)
                var mes = fecha.getMonth() + 1
                var dia = fecha.getDate()
                var mesActual = ""
                for (var i = 0; i < $scope.meses.length; i++) {
                    var element = $scope.meses[i];
                    if (mes == element.id) {
                        mesActual = element.nombre
                    }
                }
                mes = (mes < 10) ? "0" + mes : mes
                dia = (dia < 10) ? "0" + dia : dia
                anio = fecha.getFullYear()
                tr3.historialPlanillaSueldoTr3.forEach(function (tr3H, index, array) {
                    total += tr3H.planillaSueldo.liquido_pagable
                    planillasSUeldoTr3.push(tr3H.planillaSueldo)
                    if (index === (array.length - 1)) {
                        var dato = { planillasSueldo: planillasSUeldoTr3, tipo: tipo, tr3Encontrado: tr3, total: total, datosPlanillaMes: tr3H.planillaSueldo.rrhhPlanilla }
                        if (tipo == "MSC") {
                            var nombreArchivo = tr3.nombre_planilla + ".txt"
                        } else {
                            var nombreArchivo = dato.tr3Encontrado.planilla + "" + dia + "" + dato.datosPlanillaMes.mes.split('-')[1] + "" + dato.datosPlanillaMes.anio + "" + dato.tr3Encontrado.numero_planilla + ".txt"
                        }
                        $scope.descargarArchivoTr3($scope.generarTextoCartaTr3(dato), nombreArchivo);
                    }
                });

            }
            //generar comprobante mes
            $scope.abrirDialogGenerarComprobante = function () {
                $scope.abrirPopup($scope.idModalGenerarComprobante);
            }
            $scope.cerrarDialogGenerarComprobante = function () {
                $scope.cerrarPopup($scope.idModalGenerarComprobante);
            }

            function removeDumplicateCampos(myArray) {
                var newArray = [];
            
                angular.forEach(myArray, function (value, key) {
                    var exists = false;
                    angular.forEach(newArray, function (val2, key) {
                        if (angular.equals(value.id, val2.id)) { exists = true };
                    });
                    if (exists == false && value.id != "") { newArray.push(value); }
                });
            
                return newArray;
            }

            $scope.generarComprobanteDelMes = async function (datos) {
                $scope.data = datos;
                let datosEmpleado = await ListaPlanillaSueldosDetalle(datos.id);
                let dataCampos = datosEmpleado.planillas;
                let campos = dataCampos.map(function (emp) {
                    return emp.DetalleFicha.campo;
                });
                $scope.datosPlanillaSueldoCC = {
                    centrosDeCostos: removeDumplicateCampos(campos),
                    planilla: datosEmpleado,
                    lugaresSeguroSalud: datosEmpleado.lugares_seguro_salud,
                    areasPlanilla: datosEmpleado.areas_planilla,
                    ubicacionesPlanilla: datosEmpleado.ubicaciones_planilla,
                    datosPlanillaMes: datos
                }
                let arrayCampos = [];
                let datosCampo = {};
                let ids = 1
                for (const campo of $scope.datosPlanillaSueldoCC.centrosDeCostos) {
                    let trabajadores = $scope.datosPlanillaSueldoCC.planilla.planillas.filter(function (trab) {
                        return trab.DetalleFicha.campo.id == campo.id;
                    });
                    let importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalRCIVA = 0, importeTotalAnticipos = 0, importeSumaTotalLiquido = 0;
                    trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);
                    for (const trabajador of trabajadores) {
                        importeSumaTotalGanado = importeSumaTotalGanado + trabajador.total_ganado;
                        importeTotalAFP = importeTotalAFP + trabajador.afp;
                        let rc_iva = trabajador.rc_iva == null ? 0 : trabajador.rc_iva;
                        importeTotalRCIVA = importeTotalRCIVA + rc_iva;
                        importeTotalAnticipos = importeTotalAnticipos + trabajador.importe_anticipos;
                        importeSumaTotalLiquido = importeSumaTotalLiquido + trabajador.liquido_pagable;
                    }
                    datosCampo = {
                        id: ids,
                        trabajadores: trabajadores,
                        importeSumaTotalGanado: importeSumaTotalGanado,
                        importeTotalAFP: importeTotalAFP,
                        importeTotalRCIVA: importeTotalRCIVA,
                        importeTotalAnticipos: importeTotalAnticipos,
                        importeSumaTotalLiquido: importeSumaTotalLiquido,
                        camposReferidos: [],
                        arraycampoConReferencia: [],
                        campo: campo,
                        porcentaje: (importeSumaTotalGanado * 100) / datos.importe_total_ganado
                    }
                    ids++
                    arrayCampos.push(datosCampo)
                }
                $scope.datosPlanillaSueldoCC.arrayCampos = arrayCampos
                $scope.verRedistribucion = false
                $scope.abrirDialogGenerarComprobante();
                $scope.$evalAsync()
            }
            $scope.calcularPorcentajeCC = function (campos, campo) {
                console.log(campos)
                let sumaporcentaje = 0
                for (const [index, val] of campos.entries()) {
                    if (index === campos.length - 1) {
                        val.porcentaje = 100 - sumaporcentaje
                        if (val.porcentaje < 0) {
                            val.porcentaje = 0
                        }
                    } else {
                        sumaporcentaje += (val.porcentaje ? val.porcentaje : 0)
                    }
                }

                if (sumaporcentaje > 100) {
                    campo.porcentaje = 100 - (sumaporcentaje - campo.porcentaje)
                }
            }
            $scope.crearComprobanteDesdePS = function () {
                for (const campoArreglo of $scope.datosPlanillaSueldoCC.arrayCampos) {
                    for (const campoArreglo2 of $scope.datosPlanillaSueldoCC.arrayCampos) {
                        for (const c of campoArreglo.camposReferidos) {
                            if (campoArreglo2.campo.id == c.id) {
                                if (campoArreglo2.arraycampoConReferencia.length > 0) {
                                    let campoExiste = campoArreglo2.arraycampoConReferencia.find(x => {
                                        return x.id == c.id
                                    })
                                    if (!campoExiste) {
                                        campoArreglo2.arraycampoConReferencia.push(campoArreglo.campo)
                                    }
                                } else {
                                    campoArreglo2.arraycampoConReferencia.push(campoArreglo.campo)
                                }
                            }
                        }
                    }
                }
                $scope.crearNuevoComprobanteDesdePS("PlanillaSueldo",
                    'Registro de comprobante de la planilla de sueldos del mes ' + $scope.data.mes.split("-")[1] + ' del año ' + $scope.data.anio + '.',
                    $scope.datosPlanillaSueldoCC)

                $scope.cerrarDialogGenerarComprobante();

            }
            $scope.crearNuevoComprobanteDesdePS = function (tipo, mensaje, datos) {
                SweetAlert.swal({
                    title: mensaje,
                    icon: "info",
                    showCloseButton: true,
                    html: '<h5>Generar el comprobante puede tardar varios minutos. se esta recuperando y procesando la información para generar el comprobante.</h5>'
                })
                $scope.crearNuevoComprobante(tipo, datos)
            }
            $scope.verificarCamposReferidos = function (campo) {
                let idsConReferencia2 = []
                for (const campoArreglo of $scope.datosPlanillaSueldoCC.arrayCampos) {
                    if (campoArreglo.camposReferidos.length > 0) {
                        for (const c of campo.camposReferidos) {
                            if (campoArreglo.campo.id == c.id) {
                                idsConReferencia2.push(campoArreglo.campo.id)
                            }
                        }
                    }
                }
                for (const id of idsConReferencia2) {
                    campo.camposReferidos = campo.camposReferidos.filter(function (x) {
                        return x.id !== id;
                    });
                }
                let idsConReferencia = []
                for (const campoArreglo of $scope.datosPlanillaSueldoCC.arrayCampos) {
                    campoArreglo.campoConReferencia = false
                    for (const campoArreglo2 of $scope.datosPlanillaSueldoCC.arrayCampos) {
                        let bandera = false
                        for (const c of campoArreglo.camposReferidos) {
                            if (campoArreglo2.campo.id == c.id) {
                                idsConReferencia.push(campoArreglo2.campo.id)
                            }
                        }
                    }
                }
                for (const campoArreglo of $scope.datosPlanillaSueldoCC.arrayCampos) {
                    for (const id of idsConReferencia) {
                        if (campoArreglo.campo.id == id) {
                            campoArreglo.campoConReferencia = true
                        }
                    }
                }

            }
            //fin generar comprobante mes 
            /* inicio comprobante desde sueldos */
            $scope.verificarRegistroIndividual = function () {
                $scope.registroIndividual = $scope.registroIndividual == true ? false : true

            }
            $scope.abrirDialogVerificarTr3 = function () {
                $scope.abrirPopup($scope.idModalVerificarTr3);
            }
            $scope.cerrarDialogVerificarTr3 = function () {
                $scope.cerrarPopup($scope.idModalVerificarTr3);
            }
            $scope.verificarTr3AntesdeComprobante = async function (banco) {
                try {
                    let datos = await VerificarTr3AntesdeComprobante($scope.planillaC.id, banco.id)
                    if (datos.registroEncontrado) {
                        $scope.crearComprobanteDesdeSueldoPorBanco(banco)
                    } else {
                        $scope.bancoSeleccionado = banco
                        $scope.abrirDialogVerificarTr3()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            $scope.confirmarCreacionComprobanteSBanco = function () {
                $scope.cerrarDialogVerificarTr3()
                $scope.crearComprobanteDesdeSueldoPorBanco($scope.bancoSeleccionado)
            }
            $scope.crearComprobanteDesdeSueldoPorBanco = async function (banco) {
                try {
                    let detallePlanilla = []
                    for (const detalle of $scope.planillaC.detalles) {
                            let nombreBancoFina = detalle.DetalleFicha.banco?detalle.DetalleFicha.banco.nombre.toUpperCase():{nombre:''}
                            if (!detalle.id_asiento_contabilidad && nombreBancoFina === banco.nombre.toUpperCase()) {
                                detallePlanilla.push(detalle)
                            }
                    }
                    if (detallePlanilla.length > 0) {
                        let datos = { banco: banco, detallePlanilla: detallePlanilla, planilla: $scope.planillaC, registroIndividual: $scope.registroIndividual }
                        $scope.cerrarVerPlanillaSueldos();
                        $scope.crearNuevoComprobanteDesdePS("PlanillaSueldosEmpleados",
                            'Registro de comprobante por empleado de la planilla de sueldos del mes ' + $scope.planillaC.mes.split("-")[1] + ' del año ' + $scope.planillaC.anio + '.',
                            datos)
                    } else {
                        $scope.mostrarMensaje("No existen registros para procesar.")
                    }
                    $scope.$evalAsync()
                } catch (error) {
                    console.log(error)
                }

            }
            $scope.generarNombrePlanillaTr3 = function () {
                $scope.tr3.nombre_planilla = ($scope.tr3.planilla ? $scope.tr3.planilla : "") + "" + ($scope.tr3.fecha_elaboracion ? $scope.tr3.fecha_elaboracion.replaceAll('/', "") : $scope.tr3.fecha_elaboracion) + "" + ($scope.tr3.numero_planilla ? $scope.tr3.numero_planilla : '')
            }

            /* fin comprobante desde sueldos */

            $scope.inicio()
        }]);