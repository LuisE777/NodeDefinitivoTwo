angular.module('agil.controladores')

    .controller('ControladoresPlanillaCargasSociales', ['$scope', '$localStorage', '$location', '$templateCache', '$route', '$filter', 'blockUI', 'Parametro', 'Parametros', 'RecursosHumanosEmpleados', 'ClasesTipo',
        'RecursosHumanosEmpleadosHorasExtras', 'RecursosHumanosPlanillaCargaSociales', 'RRHHlistaPlanillaCargaSocial', 'SweetAlert', 'ListaPlanillaCSDetalle', 'RRHHlistaPlanillaSueldosCS', function ($scope, $localStorage, $location, $templateCache, $route, $filter, blockUI, Parametro, Parametros, RecursosHumanosEmpleados, ClasesTipo,
            RecursosHumanosEmpleadosHorasExtras, RecursosHumanosPlanillaCargaSociales, RRHHlistaPlanillaCargaSocial, SweetAlert, ListaPlanillaCSDetalle, RRHHlistaPlanillaSueldosCS) {

            $scope.idModalNuevaPlanillaSueldos = 'dialog-nueva-planilla-sueldos';
            $scope.idModalEditarPlanillaSueldo = 'dialog-editar-planilla-sueldo';
            $scope.idModalParametros = 'dialog-parametros';
            $scope.idEliminarSueldoEmpleado = 'dialog-eliminar-salario-empleado';
            $scope.idModalGenerarComprobante = 'dialog-generar-comprobante';
            $scope.idModalVerPlanillCargaSocial = 'dialog-ver-planilla-carga-social';
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsPlanillaCargasSociales($scope.idModalNuevaPlanillaSueldos, $scope.idModalEditarPlanillaSueldo, $scope.idModalParametros,
                    $scope.idEliminarSueldoEmpleado, $scope.idModalGenerarComprobante, $scope.idModalVerPlanillCargaSocial);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalNuevaPlanillaSueldos);
                $scope.eliminarPopup($scope.idModalEditarPlanillaSueldo);
                $scope.eliminarPopup($scope.idModalParametros);
                $scope.eliminarPopup($scope.idEliminarSueldoEmpleado);
                $scope.eliminarPopup($scope.idModalGenerarComprobante);
                $scope.eliminarPopup($scope.idModalVerPlanillCargaSocial);
            });

            $scope.usuario = JSON.parse($localStorage.usuario);

            // $scope.fechaATexto = function (fecha) {
            //     fech = new Date(fecha)
            //     fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
            //     return fecha
            // }



            $scope.obtenerGestiones = function () {
                blockUI.start();
                var promesa = ClasesTipo("GTN");
                promesa.then(function (entidad) {
                    $scope.gestiones = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.obtenerGestiones();


            $scope.obtenerTiposRolTurnoExtra = function () {
                blockUI.start();
                var promesa = ClasesTipo("ESTEXTROL");
                promesa.then(function (entidad) {
                    $scope.tiposRolTurnoExtra = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.obtenerTiposRolTurnoExtra();

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
                $scope.planilla = new RecursosHumanosPlanillaCargaSociales({ id_empresa: $scope.usuario.id_empresa });
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
                empleado.nombre_completo = empleado.DetalleFicha.empleado.persona.nombre_completo;
                empleado.ci = empleado.DetalleFicha.empleado.persona.ci;
                empleado.fecha_nacimiento = empleado.DetalleFicha.empleado.persona.fecha_nacimiento
                empleado.cargos = empleado.DetalleFicha.cargos[0].cargo.nombre;
                empleado.campamento = empleado.DetalleFicha.empleado.campo.nombre;
                empleado.matricula_seguro = empleado.DetalleFicha.matricula_seguro;
                empleado.fecha_inicio = empleado.DetalleFicha.fecha_inicio;
                empleado.id_ficha = empleado.ficha;
                empleado.sueldoBasico = empleado.importe_sueldo_basico;
                empleado.dt = empleado.dt;
                empleado.ganado = empleado.ganado;
                empleado.horasExtras = empleado.horas_extras;
                empleado.totalHorasExtras = empleado.importe_horas_extras;
                empleado.recargoNocturno = empleado.importe_recargo_nocturno;
                empleado.bonoAntiguedad = empleado.importe_bono_antiguedad;
                empleado.bonoFrontera = empleado.importe_bono_frontera;
                empleado.otrosBonos = empleado.importe_otros_bonos;
                empleado.totalGanado = empleado.total_ganado;
                empleado.afp = round(empleado.totalGanado * $scope.parametros.riesgo_comun / 100, 2);

                var fechaNacimiento = new Date(empleado.fecha_nacimiento);
                var fechaActual = new Date();
                var datofedad = $scope.diferenciaEntreDiasEnDias(fechaNacimiento, fechaActual)
                var edad_empleado = Math.trunc(datofedad / 365);
                if (empleado.DetalleFicha.jubilacion == null || !empleado.DetalleFicha.jubilacion) {
                    if (edad_empleado >= 65) {
                        empleado.afp = round(empleado.totalGanado * 0, 2);
                    }else{
                        empleado.afp = round(empleado.totalGanado * $scope.parametros.riesgo_comun / 100, 2);
                    }
                } else {
                    if (edad_empleado >= 65) {
                        empleado.afp = round(empleado.totalGanado * 0, 2);
                    } else {
                        empleado.afp = round(empleado.totalGanado * $scope.parametros.riesgo_comun / 100, 2);
                    }
                }

                // =========================================================================================
                empleado.sol = round(empleado.totalGanado * $scope.parametros.aporte_solidario_patronal / 100, 2);
                empleado.pro_v = round(empleado.totalGanado * $scope.parametros.pro_vivienda_patronal / 100, 2);
                empleado.cns = round(empleado.totalGanado * $scope.parametros.aporte_serguro_salud / 100, 2);
                empleado.prev_indemnizacion = round(empleado.totalGanado * $scope.parametros.indemnizaciones / 100, 2);
                empleado.prov_aguinaldo = round(empleado.totalGanado * $scope.parametros.aguinaldos / 100, 2);

                $scope.$evalAsync()

                $scope.sumarTotales(planilla);
            }


            async function procesarCalculos(array, planilla) {
                SweetAlert.update({ title: "Realizando Cálculos....." })

                var countE = 0;
                for (const empleado of array) {
                    countE = countE + 1;

                    await realizarCalculos(empleado, planilla, getPercentageChange(array.length, countE));
                }
                // $scope.ordenarPlanilla(false);
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
                var promesa = RRHHlistaPlanillaSueldosCS($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                promesa.then(function (dato) {
                    if (!dato.error) {
                        if (dato.planillas.length>0) {
                            planilla.RecursosHumanosEmpleados = dato.planillas;
                            procesarCalculos(planilla.RecursosHumanosEmpleados, planilla);
                        }else{ 
                            SweetAlert.swal("", "no existe la Planilla de Sueldos de " + planilla.mes.split("-")[1] + " " + planilla.gestion, "warning");
                        }
                    }else{
                        SweetAlert.swal("", dato.mensaje, "warning");
                    }
                });
            };

            $scope.generar = function (planilla) {
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
            function calcAge(dateString) {
                var birthday = +new Date(dateString);
                return ~~((Date.now() - birthday) / (31557600000));
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
                $scope.sumaSol = 0;
                $scope.sumaProV = 0;
                $scope.sumaCNS = 0;
                $scope.sumaPrevIndemnizacion = 0;
                $scope.sumaProvAguinaldo = 0;
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
                        $scope.sumaSol = round($scope.sumaSol + planilla.RecursosHumanosEmpleados[i].sol, 2);
                        $scope.sumaProV = round($scope.sumaProV + planilla.RecursosHumanosEmpleados[i].pro_v, 2);
                        $scope.sumaCNS = round($scope.sumaCNS + planilla.RecursosHumanosEmpleados[i].cns, 2);
                        $scope.sumaPrevIndemnizacion = round($scope.sumaPrevIndemnizacion + planilla.RecursosHumanosEmpleados[i].prev_indemnizacion, 2);
                        $scope.sumaProvAguinaldo = round($scope.sumaProvAguinaldo + planilla.RecursosHumanosEmpleados[i].prov_aguinaldo, 2);
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
                planilla.importeTotalGanado = $scope.sumaTotalGanado;
                planilla.importeAFP = $scope.sumaAFP;
                planilla.importeSol = $scope.sumaSol;
                planilla.importeProv = $scope.sumaProV;
                planilla.importeCNS = $scope.sumaCNS;
                planilla.importe_prev_indemnizacion = $scope.sumaPrevIndemnizacion;
                planilla.importe_prov_aguinaldo = $scope.sumaProvAguinaldo;


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
                $scope.sueldo.totalGanado = $scope.sueldo.ganado + $scope.sueldo.totalHorasExtras + $scope.sueldo.recargoNocturno + $scope.sueldo.bonoAntiguedad + $scope.sueldo.bonoFrontera + $scope.sueldo.otrosBonos;
                $scope.sueldo.afp = round($scope.sueldo.totalGanado * $scope.parametros.riesgo_comun / 100, 2);
                $scope.sueldo.sol = round($scope.sueldo.totalGanado * $scope.parametros.aporte_solidario_patronal / 100, 2);
                $scope.sueldo.pro_v = round($scope.sueldo.totalGanado * $scope.parametros.pro_vivienda_patronal / 100, 2);
                $scope.sueldo.cns = round($scope.sueldo.totalGanado * $scope.parametros.aporte_serguro_salud / 100, 2);
                $scope.sueldo.totalDescuento = $scope.sueldo.afp + $scope.sueldo.rc_iva + $scope.sueldo.anticipos + $scope.sueldo.prestamos;
                $scope.sueldo.liquidoPagable = round($scope.sueldo.totalGanado - $scope.sueldo.totalDescuento, 2);
            }

            $scope.filtrarListaPlanillaCargaSociales = function (planilla) {
                // console.log('cabezera generalllllll ', planilla);
                // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]
                var promesa = RRHHlistaPlanillaCargaSocial($scope.usuario.id_empresa, planilla.gestion, planilla.mes);
                promesa.then(function (dato) {
                    // console.log('empleadossssstt ', dato);
                    planilla.planillas = dato.planillas;
                    $scope.sumarTotalesPlanillaCargas(planilla);

                    blockUI.stop();
                });
            }

            $scope.sumarTotalesPlanillaCargas=function(planilla){
                $scope.sumaSueldoBasico = 0;
                $scope.sumaTotalHorasExtras = 0;
                $scope.sumaImporteHorasExtras = 0;
                $scope.sumaRecargoNocturno = 0; 
                $scope.sumaBonoAntiguedad = 0;
                $scope.sumaBonoFrontera = 0;
                $scope.sumaOtrosBonos = 0;
                $scope.sumaTotalGanado = 0; 
                $scope.sumaAFP = 0;
                $scope.sumaSol = 0; 
                $scope.sumaProV = 0; 
                $scope.sumaCNS = 0;
                $scope.sumaSaldoUtilizado = 0; 
                $scope.sumaRcIvaMes = 0;
                $scope.sumaNuevoSaldo = 0; 
        
                if (planilla.planillas != undefined) {
                    for(var i=0;i<planilla.planillas.length;i++){
                        $scope.sumaSueldoBasico=round($scope.sumaSueldoBasico+planilla.planillas[i].importe_sueldo_basico, 2);
                        $scope.sumaTotalHorasExtras=round($scope.sumaTotalHorasExtras+planilla.planillas[i].total_horas_extras, 2);
                        $scope.sumaImporteHorasExtras=round($scope.sumaImporteHorasExtras+planilla.planillas[i].importe_horas_extras, 2);
                        $scope.sumaRecargoNocturno=round($scope.sumaRecargoNocturno+planilla.planillas[i].importe_recargo_nocturno, 2);
                        $scope.sumaBonoAntiguedad=round($scope.sumaBonoAntiguedad+planilla.planillas[i].importe_bono_antiguedad, 2);
                        $scope.sumaBonoFrontera=round($scope.sumaBonoFrontera+planilla.planillas[i].importe_bono_frontera, 2);
                        $scope.sumaOtrosBonos=round($scope.sumaOtrosBonos+planilla.planillas[i].importe_otros_bonos, 2);
                        $scope.sumaTotalGanado=round($scope.sumaTotalGanado+planilla.planillas[i].importe_total_ganado, 2);
                        $scope.sumaAFP=round($scope.sumaAFP+planilla.planillas[i].importe_afp, 2);
                        $scope.sumaSol=round($scope.sumaSol+planilla.planillas[i].importe_sol, 2);
                        $scope.sumaProV=round($scope.sumaProV+planilla.planillas[i].importe_pro_v, 2);
                        $scope.sumaCNS=round($scope.sumaCNS+planilla.planillas[i].importe_cns, 2);
                      
                    }
                }
        
                planilla.sumaSueldoBasico = $scope.sumaSueldoBasico;
                planilla.sumaTotalHorasExtras = $scope.sumaTotalHorasExtras;
                planilla.sumaImporteHorasExtras = $scope.sumaImporteHorasExtras;
                planilla.sumaRecargoNocturno = $scope.sumaRecargoNocturno; 
                planilla.sumaBonoAntiguedad = $scope.sumaBonoAntiguedad;
                planilla.sumaBonoFrontera = $scope.sumaBonoFrontera;
                planilla.sumaOtrosBonos = $scope.sumaOtrosBonos;
                planilla.sumaTotalGanado = $scope.sumaTotalGanado; 
                planilla.sumaAFP = $scope.sumaAFP;
                planilla.sumaSol = $scope.sumaSol; 
                planilla.sumaProV = $scope.sumaProV; 
                planilla.sumaCNS = $scope.sumaCNS;
                
            }


            $scope.abrirDialogParametros = function () {
                $scope.abrirPopup($scope.idModalParametros);
            }

            $scope.cerrarDialogParametros = function () {
                $scope.cerrarPopup($scope.idModalParametros);
            }

            $scope.editarParametros = function (parametro) {
                blockUI.start();
                $scope.parametros = parametro;
                Parametro.update({ idEmpresa: $scope.usuario.id_empresa }, parametro, function (res) {
                    // console.log('el mensaje es----', res.mensaje);
                    $scope.mostrarMensaje(res.mensaje);
                }, function (error) {
                    $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
                })

                blockUI.stop();
                $scope.cerrarDialogParametros();
            }

            $scope.obtenerParametros($scope.usuario.id_empresa);

            $scope.excelPlanillaSueldo = function (planilla) {
                var data = [["N°", "Empleado", "F. Naci.", "C.I.", "Cargo", "Campamento",
                    "F. Ingre.", "Matricula", "Basico", "DT", "Ganado", "Hrs Extra", "Total Extras",
                    "NT", "Recargo Nocturno", "BonoAntig", "Bono Front", "Otros Bonos",
                    "Total Ganado", "AFP 1.71%", "Sol 3%", "Pro-V. 2%", "CNS 10%", "Prev.Indemn. 8.33%", "Prov.Aguin. 8.33%", "Total Aportes"]];
                var planillasGet = planilla.RecursosHumanosEmpleados;
                for (var i = 0; i < planillasGet.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(planillasGet[i].nombre_completo);
                    var fecha = $scope.fechaATexto(planillasGet[i].fecha_nacimiento);
                    columns.push(fecha);
                    columns.push(planillasGet[i].ci);
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
                    columns.push(planillasGet[i].horasExtras);
                    columns.push(planillasGet[i].totalHorasExtras);
                    columns.push(0);
                    columns.push(planillasGet[i].recargoNocturno);
                    columns.push(planillasGet[i].bonoAntiguedad);
                    columns.push(planillasGet[i].bonoFrontera);
                    columns.push(planillasGet[i].otrosBonos);
                    columns.push(planillasGet[i].totalGanado);
                    columns.push(planillasGet[i].afp);
                    columns.push(planillasGet[i].sol);
                    columns.push(planillasGet[i].pro_v);
                    columns.push(planillasGet[i].cns);
                    columns.push(planillasGet[i].prev_indemnizacion);
                    columns.push(planillasGet[i].prov_aguinaldo);
                    columns.push(planillasGet[i].total_aportes);
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE CARGAS SOCIALES.xlsx");
                blockUI.stop();

            }

            $scope.imprimirPlanillaCS = function (filtro) {

                SweetAlert.swal("Espere mientras se carga el reporte !");

                var cadena = filtro.mes.split("-");
                var mes = cadena[1];
                var año = filtro.gestion;
                var cabeceraFecha = [mes, año];

                var planilla = $scope.planilla.RecursosHumanosEmpleados;
                //[612, 912]
                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(planilla.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldo(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalSol = 0, importeTotalProV = 0, totalNT = 0,
                    importeTotalCNS = 0, importePrevIndem = 0, importeProvAgui = 0, importeTotalAportes = 0;
                for (var i = 0; i < planilla.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(planilla[i].nombre_completo, 45, y, { width: 120 });
                    var fecha = $scope.fechaATexto(planilla[i].fecha_nacimiento);
                    // doc.text(fecha, 190, y);
                    // doc.text(planilla[i].ci, 230, y);
                    if (planilla[i].cargos != null) {
                        doc.text(planilla[i].cargos.toUpperCase(), 160, y, { width: 100 });
                    } else {
                        doc.text("", 160, y, { width: 100 });
                    }
                    doc.text(planilla[i].campamento.toUpperCase(), 260, y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].fecha_inicio);
                    doc.text(fechaInicio, 325, y);
                    // if (planilla[i].matricula_seguro != null) {
                    //     doc.text(planilla[i].matricula_seguro.toUpperCase(), 450, y);
                    // } else {
                    //     doc.text("", 450, y);
                    // }
                    var basico = planilla[i].importe_sueldo_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 380, y);

                    doc.text(planilla[i].dt, 425, y);
                    var ganado = round(planilla[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 450, y);
                    var hrsExtras = planilla[i].horasExtras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 485, y);
                    var totalHorasExtras = round((ganado / 30 / 8 * hrsExtras) * 2, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 515, y)
                    var nt = 0;
                    totalNT = totalNT + nt;
                    doc.text(nt, 550, y);
                    var recargoNocturno = planilla[i].recargoNocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 570, y);
                    var bonoAntiguedad = planilla[i].bonoAntiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 613, y);
                    var bonoFrontera = planilla[i].bonoFrontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 643, y);
                    var otrosBonos = planilla[i].otrosBonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 674, y);
                    var totalGanado = round(planilla[i].totalGanado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 703, y)
                    var afp = planilla[i].afp;
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 740, y);
                    var sol = planilla[i].sol;
                    importeTotalSol = importeTotalSol + sol;
                    doc.text(sol, 770, y);
                    var pro_v = planilla[i].pro_v;
                    importeTotalProV = importeTotalProV + pro_v;
                    doc.text(pro_v, 805, y);
                    var cns = planilla[i].cns
                    importeTotalCNS = importeTotalCNS + cns;
                    doc.text(cns, 840, y);
                    var prev_indem = planilla[i].prev_indemnizacion;
                    importePrevIndem = importePrevIndem + prev_indem;
                    doc.text(prev_indem, 870, y);
                    var pro_agui = planilla[i].prov_aguinaldo;
                    importeProvAgui = importeProvAgui + pro_agui;
                    doc.text(pro_agui, 910, y);
                    var total_aportes = planilla[i].total_aportes;
                    importeTotalAportes = importeProvAgui + total_aportes;
                    doc.text(total_aportes, 955, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 325, y + 20);
                        doc.text(round(importeTotalBasico, 2), 380, y + 20);
                        doc.text(round(importeTotalGanado, 2), 450, y + 20);
                        doc.text(round(importeHrsExtras, 2), 485, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 515, y + 20);
                        doc.text(round(totalNT, 2), 550, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 570, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 613, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 643, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 674, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 703, y + 20)
                        doc.text(round(importeTotalAFP, 2), 740, y + 20);
                        doc.text(round(importeTotalSol, 2), 770, y + 20);
                        doc.text(round(importeTotalProV, 2), 805, y + 20);
                        doc.text(round(importeTotalCNS, 2), 840, y + 20);
                        doc.text(round(importePrevIndem, 2), 870, y + 20);
                        doc.text(round(importeProvAgui, 2), 910, y + 20);
                        doc.text(round(importeTotalAportes, 2), 955, y + 20);
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
                doc.text("TOTALES", 325, cont);

                doc.text(round($scope.planilla.importeSueldoBasico, 2), 380, cont);
                doc.text(round($scope.planilla.importeTotalGanado, 2), 450, cont);
                doc.text(round(importeHrsExtras, 2), 485, cont);
                doc.text(round($scope.planilla.importeHorasExtras, 2), 515, cont);
                doc.text(round(totalNT, 2), 550, cont);
                doc.text(round($scope.planilla.importeRecargoNocturno, 2), 570, cont);
                doc.text(round($scope.planilla.importeBonoAntiguedad, 2), 613, cont);
                doc.text(round($scope.planilla.importeBonoFrontera, 2), 643, cont);
                doc.text(round($scope.planilla.importeOtrosBonos, 2), 674, cont);
                doc.text(round($scope.planilla.importeTotalGanado, 2), 703, cont)
                doc.text(round($scope.planilla.importeAFP, 2), 740, cont);
                doc.text(round($scope.planilla.importeSol, 2), 770, cont);
                doc.text(round($scope.planilla.importeProv, 2), 805, cont);
                doc.text(round($scope.planilla.importeCNS, 2), 840, cont);
                doc.text(round($scope.planilla.importe_prev_indemnizacion, 2), 870, cont);
                doc.text(round($scope.planilla.importe_prov_aguinaldo, 2), 910, cont);
                doc.text(round($scope.planilla.importe_total_aportes, 2), 955, cont);

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.dibujarCabeceraPlanillaSueldo = function (doc, planilla, pagina, totalPaginas, fecha) {
                var empresa = $scope.usuario.empresa;
                doc.font('Helvetica-Bold', 10);
                doc.text("NOMBRE O RAZON SOCIAL:", 60, 10);
                doc.text(empresa.razon_social.toUpperCase(), 210, 10);
                doc.text("NIT:", 60, 30);
                doc.text(empresa.nit.toUpperCase(), 210, 30);

                doc.font('Helvetica-Bold', 12);
                doc.text("PLANILLA DE CARGAS SOCIALES", 0, 20, { align: 'center' });
                doc.text("(En Bolivia)", 0, 40, { align: 'center' });

                doc.font('Helvetica-Bold', 10);
                doc.text("CORRESPONDIENTE AL MES:", 690, 30);
                doc.font('Helvetica-Bold', 10);
                doc.text(fecha[0].toUpperCase(), 843, 30);
                doc.text("DE", 910, 30);
                doc.text(fecha[1].toUpperCase(), 935, 30);

                doc.font('Helvetica-Bold', 8);
                doc.text("N°", 30, 60);
                doc.text("Empleado", 45, 60);
                // doc.text("F. Naci.", 190, 60);
                // doc.text("C.I.", 235, 60);
                // doc.text("Cargo", 270, 60);
                // doc.text("Campamento", 355, 60);
                doc.text("Cargo", 160, 60);
                doc.text("Campamento", 260, 60);
                doc.text("F. Ingre.", 325, 60);
                doc.text("Basico", 380, 60);
                doc.text("DT", 425, 60);
                doc.text("Ganado", 450, 60);
                doc.text("Hrs", 488, 60);
                doc.text("Extra", 485, 70);
                doc.text("Total", 518, 60);
                doc.text("Extras", 515, 70);
                doc.text("NT", 550, 60);
                doc.text("Recargo", 572, 60);
                doc.text("Nocturno", 570, 70);
                doc.text("Bono", 614, 60);
                doc.text("Antig", 613, 70);
                doc.text("Bono", 644, 60);
                doc.text("Front", 643, 70);
                doc.text("Otros", 674, 60);
                doc.text("Bonos", 674, 70);
                doc.text("Total", 703, 60);
                doc.text("Ganado", 703, 70);
                doc.text("AFP", 740, 60);
                doc.text("1.71%", 740, 70);
                doc.text("Sol 3%", 770, 60);
                doc.text("Pro-V.", 805, 60);
                doc.text("2%", 805, 70);
                doc.text("CNS", 840, 60);
                doc.text("10%", 840, 70);
                doc.text("Prev.Ind.", 870, 60);
                doc.text("8.33%", 870, 70); 
                doc.text("Prov.Agui.", 910, 60);
                doc.text("8.33%", 910, 70);
                doc.text("Total", 960, 60);
                doc.text("Aportes", 955, 70);

                // doc.text("F. Ingre.", 410, 60);
                // doc.text("Matricula", 455, 60);
                // doc.text("Basico", 510, 60);
                // doc.text("DT", 545, 60);
                // doc.text("Ganado", 560, 60);
                // doc.text("Hrs", 598, 60);
                // doc.text("Extra", 595, 70);
                // doc.text("Total", 628, 60);
                // doc.text("Extras", 625, 70);
                // doc.text("NT", 658, 60)
                // doc.text("Recargo", 680, 60);
                // doc.text("Nocturno", 678, 70);
                // doc.text("Bono", 720, 60);
                // doc.text("Antig", 719, 70);
                // doc.text("Bono", 749, 60);
                // doc.text("Front", 748, 70)
                // doc.text("Otros", 775, 60);
                // doc.text("Bonos", 775, 70);
                // doc.text("Total", 805, 60);
                // doc.text("Ganado", 805, 70);
                // doc.text("AFP", 840, 60);
                // doc.text("1.71%", 840, 70);
                // doc.text("Sol 3%", 865, 60);
                // doc.text("Pro-V.", 895, 60);
                // doc.text("2%", 895, 70);
                // doc.text("CNS 10%", 922, 60);

            }
            //generar comprobante mes
            $scope.abrirDialogGenerarComprobante = function () {
                $scope.abrirPopup($scope.idModalGenerarComprobante);
            }
            $scope.cerrarDialogGenerarComprobante = function () {
                $scope.cerrarPopup($scope.idModalGenerarComprobante);
            }
            $scope.generarComprobanteDelMes = async function (datos) {
                $scope.data = datos;
                let datosEmpleado = await ListaPlanillaCSDetalle(datos.id);
                let dataCampos = datosEmpleado.planillas;
                let campos = dataCampos.map(function (emp) {
                    return emp.DetalleFicha.empleado.campo;
                });
                $scope.datosPlanillaCargaSocialCC = {
                    centrosDeCostos: removeDumplicateValue(campos),
                    planilla: datosEmpleado,
                    datosPlanillaMes: datos
                }
                let arrayCampos = [];
                let datosCampo = {};
                let ids = 1
                for (const campo of $scope.datosPlanillaCargaSocialCC.centrosDeCostos) {
                    let trabajadores = $scope.datosPlanillaCargaSocialCC.planilla.planillas.filter(function (trab) {
                        return trab.DetalleFicha.empleado.campo.id == campo.id;
                    });
                    let importeSumaTotalGanado = 0, importeTotalAFP = 0,
                        importeSumaTotalAportes = 0, importeTotalAguinaldos = 0, importeTotalIndemnizacion = 0,
                        importeSumaFondoVivienda = 0, importeSumaSeguroSocialCPS = 0, importeSumaSeguroSocialAFP = 0,
                        importeSumaAguinaldosPagar = 0, importeSumaReservaIndemnizacion = 0;
                    trabajadores = $filter('orderBy')(trabajadores, ['DetalleFicha.empleado.persona.apellido_paterno'], false);
                    for (const trabajador of trabajadores) {
                        importeSumaTotalGanado = importeSumaTotalGanado + trabajador.total_ganado;
                        importeSumaTotalAportes = importeSumaTotalAportes + trabajador.pro_v + trabajador.cns + trabajador.afp + trabajador.sol;
                        importeTotalAguinaldos = importeTotalAguinaldos + trabajador.prov_aguinaldo
                        importeTotalIndemnizacion = importeTotalIndemnizacion + trabajador.prev_indemnizacion;
                        importeSumaFondoVivienda = importeSumaFondoVivienda + trabajador.pro_v;
                        importeSumaSeguroSocialCPS = importeSumaSeguroSocialCPS + trabajador.cns;
                        importeSumaSeguroSocialAFP = importeSumaSeguroSocialAFP + trabajador.afp + trabajador.sol;
                        importeSumaAguinaldosPagar = importeSumaAguinaldosPagar + trabajador.prov_aguinaldo;
                        importeSumaReservaIndemnizacion = importeSumaReservaIndemnizacion + trabajador.prev_indemnizacion;
                    }
                    datosCampo = {
                        id: ids,
                        trabajadores: trabajadores,
                        importeSumaTotalGanado: importeSumaTotalGanado,
                        importeSumaTotalAportes: importeSumaTotalAportes,
                        importeTotalAguinaldos: importeTotalAguinaldos,
                        importeTotalIndemnizacion: importeTotalIndemnizacion,
                        importeSumaFondoVivienda: importeSumaFondoVivienda,
                        importeSumaSeguroSocialCPS: importeSumaSeguroSocialCPS,
                        importeSumaSeguroSocialAFP: importeSumaSeguroSocialAFP,
                        importeSumaAguinaldosPagar: importeSumaAguinaldosPagar,
                        importeSumaReservaIndemnizacion: importeSumaReservaIndemnizacion,
                        camposReferidos: [],
                        arraycampoConReferencia: [],
                        campo: campo,
                        administrativo: false,
                        porcentaje: (importeSumaTotalGanado * 100) / datos.importe_total_ganado
                    }
                    ids++
                    arrayCampos.push(datosCampo)
                }
                $scope.datosPlanillaCargaSocialCC.arrayCampos = arrayCampos
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
                for (const campoArreglo of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
                    for (const campoArreglo2 of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
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
                $scope.crearNuevoComprobanteDesdePS("PlanillaCargaSocial",
                    'Registro de comprobante de la planilla de cargas sociales del mes ' + $scope.data.mes.split("-")[1] + ' del año ' + $scope.data.anio + '.',
                    $scope.datosPlanillaCargaSocialCC)

            }
            $scope.crearNuevoComprobanteDesdePS = function (tipo, mensaje, datos) {
                SweetAlert.swal({
                    title: mensaje,
                    icon: "info",
                    showCloseButton: true,
                    html: '<h5>Generar el comprobante puede tardar varios minutos. se esta recuperando y procesando la información para generar el comprobante.</h5>'
                })
                $scope.cerrarDialogGenerarComprobante();
                $scope.crearNuevoComprobante(tipo, datos)
            }
            $scope.verificarCamposReferidos = function (campo) {
                let idsConReferencia2 = []
                for (const campoArreglo of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
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
                for (const campoArreglo of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
                    campoArreglo.campoConReferencia = false
                    for (const campoArreglo2 of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
                        let bandera = false
                        for (const c of campoArreglo.camposReferidos) {
                            if (campoArreglo2.campo.id == c.id) {
                                idsConReferencia.push(campoArreglo2.campo.id)
                            }
                        }
                    }
                }
                for (const campoArreglo of $scope.datosPlanillaCargaSocialCC.arrayCampos) {
                    for (const id of idsConReferencia) {
                        if (campoArreglo.campo.id == id) {
                            campoArreglo.campoConReferencia = true
                        }
                    }
                }

            }
            //fin generar comprobante mes 

            

            $scope.verPlanilla = function (planilla) {
                $scope.abrirPopup($scope.idModalVerPlanillCargaSocial);
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };
               
                var promesa = ListaPlanillaCSDetalle(planilla.id);
                promesa.then(function (dato) {
                    $scope.planillaC = planilla;
                    $scope.planillaC.detalles = dato.planillas;
                });
            }

            $scope.cerrarVerPlanilla = function () {
                $scope.cerrarPopup($scope.idModalVerPlanillCargaSocial);
            }
            $scope.calcularTotalAportes = function (empleado) {
                empleado.total_aportes = round(empleado.afp + empleado.sol + empleado.pro_v + empleado.cns + empleado.prev_indemnizacion + empleado.prov_aguinaldo, 2)
                return empleado.total_aportes;
            }
            $scope.totalAportes = function(planillaC, nuevo) {
                if (planillaC) {
                    if (nuevo) {
                        planillaC.importe_total_aportes = round(planillaC.importeAFP + planillaC.importeSol + planillaC.importeProv + planillaC.importeCNS + planillaC.importe_prev_indemnizacion + planillaC.importe_prov_aguinaldo, 2);
                        return planillaC.importe_total_aportes;
                    }else{
                        planillaC.importe_total_aportes = round(planillaC.importe_afp + planillaC.importe_sol + planillaC.importe_pro_v + planillaC.importe_cns + planillaC.importe_prev_indemnizacion + planillaC.importe_prov_aguinaldo, 2);
                        return planillaC.importe_total_aportes;
                    }
                }
            }

            $scope.imprimirEdicionPlanillaCS = function (planillaC) {

                SweetAlert.swal("Espere mientras se carga el reporte !");

                var cadena = planillaC.mes.split("-");
                var mes = cadena[1];
                var año = planillaC.anio;
                var cabeceraFecha = [mes, año];

                var planilla = planillaC.detalles;
                //[612, 912]
                var doc = new PDFDocument({ compress: false, size: 'legal', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(planilla.length / itemsPorPagina);
                $scope.dibujarCabeceraPlanillaSueldo(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                var index = 0;
                var importeTotalBasico = 0, importeTotalGanado = 0, importeHrsExtras = 0, importeTotalHrsExtras = 0,
                    importeRecargoNocturno = 0, importeBonoAntiguedad = 0, importeTotalBonoFrontera = 0, importeTotalOtrosBonos = 0,
                    importeSumaTotalGanado = 0, importeTotalAFP = 0, importeTotalSol = 0, importeTotalProV = 0, totalNT = 0,
                    importeTotalCNS = 0, importePrevIndem = 0, importeProvAgui = 0, importeTotalAportes = 0;
                for (var i = 0; i < planilla.length; i++) {
                    index = index + 1;
                    doc.font('Helvetica', 6);
                    doc.text(index, 30, y);
                    doc.text(planilla[i].DetalleFicha.empleado.persona.nombre_completo, 45, y, { width: 115 });
                    var fecha = $scope.fechaATexto(planilla[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    // doc.text(fecha, 190, y);
                    // doc.text(planilla[i].DetalleFicha.empleado.persona.ci, 230, y);
                    if (planilla[i].DetalleFicha.cargos.length > 0) {
                        doc.text(planilla[i].DetalleFicha.cargos[0].cargo.nombre, 160, y, { width: 100 });
                    } else {
                        doc.text("", 190, y, { width: 100 });
                    }
                    doc.text(planilla[i].DetalleFicha.empleado.campo.nombre, 260, y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].DetalleFicha.fecha_inicio);
                    doc.text(fechaInicio, 325, y);
                    // if (planilla[i].DetalleFicha.matricula_seguro != null) {
                    //     doc.text(planilla[i].DetalleFicha.matricula_seguro.toUpperCase(), 450, y);
                    // } else {
                    //     doc.text("", 450, y);
                    // }
                    var basico = planilla[i].importe_sueldo_basico;
                    importeTotalBasico = importeTotalBasico + basico;
                    doc.text(basico, 380, y);

                    doc.text(planilla[i].dt, 425, y);
                    var ganado = round(planilla[i].ganado, 2);
                    importeTotalGanado = importeTotalGanado + ganado;
                    doc.text(ganado, 450, y);
                    var hrsExtras = planilla[i].horas_extras;
                    importeHrsExtras = importeHrsExtras + hrsExtras;
                    doc.text(hrsExtras, 485, y);
                    var totalHorasExtras = round((ganado / 30 / 8 * hrsExtras) * 2, 2);
                    importeTotalHrsExtras = importeTotalHrsExtras + totalHorasExtras;
                    doc.text(totalHorasExtras, 515, y)
                    var nt = 0;
                    totalNT = totalNT + nt;
                    doc.text(nt, 550, y);
                    var recargoNocturno = planilla[i].importe_recargo_nocturno;
                    importeRecargoNocturno = importeRecargoNocturno + recargoNocturno;
                    doc.text(recargoNocturno, 570, y);
                    var bonoAntiguedad = planilla[i].importe_bono_antiguedad;
                    importeBonoAntiguedad = importeBonoAntiguedad + bonoAntiguedad;
                    doc.text(bonoAntiguedad, 613, y);
                    var bonoFrontera = planilla[i].importe_bono_frontera;
                    importeTotalBonoFrontera = importeTotalBonoFrontera + bonoFrontera;
                    doc.text(bonoFrontera, 643, y);
                    var otrosBonos = planilla[i].importe_otros_bonos;
                    importeTotalOtrosBonos = importeTotalOtrosBonos + otrosBonos;
                    doc.text(otrosBonos, 674, y);
                    var totalGanado = round(planilla[i].total_ganado, 2);
                    importeSumaTotalGanado = importeSumaTotalGanado + totalGanado;
                    doc.text(totalGanado, 703, y)
                    var afp = planilla[i].afp;
                    importeTotalAFP = importeTotalAFP + afp;
                    doc.text(afp, 740, y);
                    var sol = planilla[i].sol;
                    importeTotalSol = importeTotalSol + sol;
                    doc.text(sol, 770, y);
                    var pro_v = planilla[i].pro_v;
                    importeTotalProV = importeTotalProV + pro_v;
                    doc.text(pro_v, 805, y);
                    var cns = planilla[i].cns
                    importeTotalCNS = importeTotalCNS + cns;
                    doc.text(cns, 840, y);
                    var prev_indem = planilla[i].prev_indemnizacion;
                    importePrevIndem = importePrevIndem + prev_indem;
                    doc.text(prev_indem, 870, y);
                    var pro_agui = planilla[i].prov_aguinaldo;
                    importeProvAgui = importeProvAgui + pro_agui;
                    doc.text(pro_agui, 910, y);

                    var total_aportes = planilla[i].total_aportes;
                    importeTotalAportes = importeProvAgui + total_aportes;
                    doc.text(total_aportes, 955, y);

                    if (items === 23) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTALES", 325, y + 20);
                        doc.text(round(importeTotalBasico, 2), 380, y + 20);
                        doc.text(round(importeTotalGanado, 2), 450, y + 20);
                        doc.text(round(importeHrsExtras, 2), 485, y + 20);
                        doc.text(round(importeTotalHrsExtras, 2), 515, y + 20);
                        doc.text(round(totalNT, 2), 550, y + 20);
                        doc.text(round(importeRecargoNocturno, 2), 570, y + 20);
                        doc.text(round(importeBonoAntiguedad, 2), 613, y + 20);
                        doc.text(round(importeTotalBonoFrontera, 2), 643, y + 20);
                        doc.text(round(importeTotalOtrosBonos, 2), 674, y + 20);
                        doc.text(round(importeSumaTotalGanado, 2), 703, y + 20)
                        doc.text(round(importeTotalAFP, 2), 740, y + 20);
                        doc.text(round(importeTotalSol, 2), 770, y + 20);
                        doc.text(round(importeTotalProV, 2), 805, y + 20);
                        doc.text(round(importeTotalCNS, 2), 840, y + 20);
                        doc.text(round(importePrevIndem, 2), 870, y + 20);
                        doc.text(round(importeProvAgui, 2), 910, y + 20);
                        doc.text(round(importeTotalAportes, 2), 955, y + 20);

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
                doc.text("TOTALES", 325, cont);

                doc.text(round(planillaC.importe_sueldo_basico, 2), 380, cont);
                doc.text(round(planillaC.importe_ganado, 2), 450, cont);
                doc.text(round(planillaC.importe_horas_extras, 2), 485, cont);
                doc.text(round(planillaC.total_horas_extras, 2), 515, cont);
                doc.text(round(totalNT, 2), 550, cont);
                doc.text(round(planillaC.importe_recargo_nocturno, 2), 570, cont);
                doc.text(round(planillaC.importe_bono_antiguedad, 2), 613, cont);
                doc.text(round(planillaC.importe_bono_frontera, 2), 643, cont);
                doc.text(round(planillaC.importe_otros_bonos, 2), 674, cont);
                doc.text(round(planillaC.importe_total_ganado, 2), 703, cont)
                doc.text(round(planillaC.importe_afp, 2), 740, cont);
                doc.text(round(planillaC.importe_sol, 2), 770, cont);
                doc.text(round(planillaC.importe_pro_v, 2), 805, cont);
                doc.text(round(planillaC.importe_cns, 2), 840, cont);
                doc.text(round(planillaC.importe_prev_indemnizacion, 2), 870, cont);
                doc.text(round(planillaC.importe_prov_aguinaldo, 2), 910, cont);
                doc.text(round(planillaC.importe_total_aportes, 2), 955, cont);

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.excelEdicionPlanillaCS = function (planillaC) {
                var data = [["N°", "Empleado", "F. Naci.", "C.I.", "Cargo", "Campamento",
                    "F. Ingre.", "Matricula", "Basico", "DT", "Ganado", "Hrs Extra", "Total Extras",
                    "NT", "Recargo Nocturno", "BonoAntig", "Bono Front", "Otros Bonos",
                    "Total Ganado", "AFP 1.71%", "Sol 3%", "Pro-V. 2%", "CNS 10%", "Prev.Indemn. 8.33%", "Prov.Aguin. 8.33%", "Total Aportes"]];
                var planillasGet = planillaC.detalles;
                for (var i = 0; i < planillasGet.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(planillasGet[i].DetalleFicha.empleado.persona.nombre_completo);
                    var fecha = $scope.fechaATexto(planillasGet[i].DetalleFicha.empleado.persona.fecha_nacimiento);
                    columns.push(fecha);
                    columns.push(planillasGet[i].DetalleFicha.empleado.persona.ci);
                    if (planillasGet[i].DetalleFicha.cargos.length > 0) {
                        columns.push(planillasGet[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase());
                    } else {
                        columns.push("");
                    }
                    columns.push(planillasGet[i].DetalleFicha.empleado.campo.nombre.toUpperCase());
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
                    columns.push(planillasGet[i].horas_extras);
                    columns.push(planillasGet[i].importe_horas_extras);
                    columns.push(0);
                    columns.push(planillasGet[i].importe_recargo_nocturno);
                    columns.push(planillasGet[i].importe_bono_antiguedad);
                    columns.push(planillasGet[i].importe_bono_frontera);
                    columns.push(planillasGet[i].importe_otros_bonos);
                    columns.push(planillasGet[i].total_ganado);
                    columns.push(planillasGet[i].afp);
                    columns.push(planillasGet[i].sol);
                    columns.push(planillasGet[i].pro_v);
                    columns.push(planillasGet[i].cns);
                    columns.push(planillasGet[i].prev_indemnizacion);
                    columns.push(planillasGet[i].prov_aguinaldo);
                    columns.push(planillasGet[i].total_aportes);
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE CARGAS SOCIALES.xlsx");
                blockUI.stop();

            }

        }]);