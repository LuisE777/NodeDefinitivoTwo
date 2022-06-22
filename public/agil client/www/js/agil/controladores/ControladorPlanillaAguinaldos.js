angular.module('agil.controladores')

    .controller('ControladorPlanillaAguinaldos', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'ClasesTipo', '$filter', '$timeout', 'FichasEmpleadosPlanillasSueldos',
        'RRHHPlanillaAguinaldos', 'SweetAlert', 'Parametros', 'RRHHlistaPlanillaAguinaldos', 'ListaPlanillaAguinaldosDetalle', 'ListaBancos', 'ReporteExcelPlanillaOVTAguinaldos',
        'Paises','ListaTr3PlanillaAguinaldo','GuardarTr3PlanillaAguinaldo','VerificarTr3AntiAntesdeComprobante', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, ClasesTipo, $filter,
            $timeout, FichasEmpleadosPlanillasSueldos, RRHHPlanillaAguinaldos, SweetAlert, Parametros, RRHHlistaPlanillaAguinaldos, ListaPlanillaAguinaldosDetalle, ListaBancos, ReporteExcelPlanillaOVTAguinaldos,
            Paises,ListaTr3PlanillaAguinaldo,GuardarTr3PlanillaAguinaldo,VerificarTr3AntiAntesdeComprobante) {

            $scope.idModalNuevaPlanillaAguinaldos = 'dialog-nueva-planilla-aguinaldos';
            $scope.idModalVerPlanillaAguinaldos = 'dialog-ver-planilla-aguinaldos';
            $scope.idModalImpresion = 'dialog-impresion-boletas';
            $scope.idModalTR3 = 'dialog-tr3';
            $scope.idModalHistorialTR3 = 'dialog-historial-tr3';
            $scope.idModalVerificarTr3 = 'verificar-tr3-banco';
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsPlanillaAguinaldos($scope.idModalNuevaPlanillaAguinaldos, $scope.idModalVerPlanillaAguinaldos, $scope.idModalImpresion,
                    $scope.idModalTR3,
                    $scope.idModalHistorialTR3,
                    $scope.idModalVerificarTr3);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalNuevaPlanillaAguinaldos);
                $scope.eliminarPopup($scope.idModalVerPlanillaAguinaldos);
                $scope.eliminarPopup($scope.idModalImpresion);
                $scope.eliminarPopup($scope.idModalTR3);
                $scope.eliminarPopup($scope.idModalHistorialTR3);
                $scope.eliminarPopup($scope.idModalVerificarTr3);
            });

            $scope.usuario = JSON.parse($localStorage.usuario);


            $scope.obtenerGestiones = function () {
                blockUI.start();
                var promesa = ClasesTipo("GTN");
                promesa.then(function (entidad) {
                    $scope.gestiones = entidad.clases;
                    blockUI.stop();
                });
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
            $scope.inicio = function () {
                $scope.dynamicPopovertr3 = {
                    templateUrl: 'myPopoverTr3.html',
                };
                $scope.obtenerGestiones();
                $scope.listaBancos();
                $scope.obtenerParametros($scope.usuario.id_empresa);
                $scope.obtenerDepartamentos();
            }
            $scope.nuevaPlanillaAguinaldos = function () {
                $scope.planilla = new RRHHPlanillaAguinaldos({ id_empresa: $scope.usuario.id_empresa });
                // $scope.sumarTotales($scope.planilla);
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };
            }

            $scope.abrirDialogNuevaPlanillaAguinaldos = function () {
                $scope.nuevaPlanillaAguinaldos();
                $scope.buscarPlanilla = "";
                $scope.abrirPopup($scope.idModalNuevaPlanillaAguinaldos);
                // $scope.$evalAsync()
            }

            $scope.guardarPlanilla = function (planilla) {
                $scope.buscarPlanilla = "";
                $scope.ordenPlanillas = true;
                blockUI.start();
                planilla.$save(function (dato) {
                    $scope.nuevaPlanillaAguinaldos();
                    blockUI.stop();
                    SweetAlert.swal("Guardado!", "Planilla registrada exitosamente!", "success");
                }, function (error) {
                    blockUI.stop();
                    console.log('fallo ', error);
                });
            }

            $scope.cerrarDialogNuevaPlanillaAguinaldos = function () {
                // $scope.buscarPlanilla = "";
                $scope.cerrarPopup($scope.idModalNuevaPlanillaAguinaldos);
            }

            $scope.ordenPlanillas = true;
            $scope.ordenarPlanilla = function (orden) {
                $scope.planilla.RecursosHumanosEmpleados = $filter('orderBy')($scope.planilla.RecursosHumanosEmpleados, ['empleado.persona.apellido_paterno'], orden);
                $scope.ordenPlanillas = !orden;
            }

            $scope.filtrarSueldos = function (planilla) {

                SweetAlert.swal({
                    title: 'Obteniendo empleados...',
                    icon: 'info',
                    iconHtml: '<i class="fa fa-search size-icon"></i>',
                    html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                SweetAlert.showLoading()

                blockUI.noOpen = true;
                var promesa = FichasEmpleadosPlanillasSueldos(planilla.gestion, $scope.parametros.dias_min_trabajos, $scope.usuario.id_empresa);
                promesa.then(function (dato) {
                    if (!dato.error) {
                        procesarCalculos(dato.empleados, planilla);
                    } else {
                        SweetAlert.swal("", dato.mensaje, "warning");
                    }
                });
            };

            async function procesarCalculos(array, planilla) {
                SweetAlert.update({ title: "Realizando Cálculos....." })
                planilla.RecursosHumanosEmpleados = [];
                var countE = 0;
                for (const empleado of array) {
                    countE = countE + 1;

                    await realizarCalculos(empleado, planilla, getPercentageChange(array.length, countE));
                }
                $scope.ordenarPlanilla(false);
                SweetAlert.swal({
                    title: 'Finalizado!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }

            // para redondeo de numeros
            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.diferenciaEntreDiasEnDias = function (fechaInicio, fechaFin) {
                var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
                //  ofechaFintener cantidad meses =========

                var cantidadMeses = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24 * 30));
                // restando un mes si fecha inicio es enero y cantidadMeses es 12
                if (fechaInicio.getMonth() == 0 && cantidadMeses == 12) {
                    cantidadMeses = cantidadMeses - 1;
                }
                var totalDias = 0;
                if (cantidadMeses > 1) {
                    // cantidadMeses = cantidadMeses - 1;
                    // sacar diferencia dentro del mes de inicio del empleado
                    var lastDay = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 0);
                    lastDay.setHours(23, 59, 59, 0, 0);
                    if (lastDay.getDate() == 31) {
                        lastDay.setDate(lastDay.getDate() - 1);
                    } else if (lastDay.getDate() == 28) {
                        lastDay.setDate(lastDay.getDate() + 2);
                    } else if (lastDay.getDate() == 29) {
                        lastDay.setDate(lastDay.getDate() + 1);
                    }

                    // cuando el mes de inicio tiene 29 dias sumar 1
                    var diferenciaDiasInicio = Math.ceil((lastDay.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
                    if (diferenciaDiasInicio < 30) {
                        totalDias = (cantidadMeses * 30) + diferenciaDiasInicio;
                    } else {
                        // coreegir
                        if (fechaInicio.getMonth() == 0 && cantidadMeses == 11 && diferenciaDiasInicio == 30) {
                            totalDias = (12 * 30)
                        }else{
                            totalDias = (cantidadMeses * 30)
                        }
                        
                    }

                } else {
                    // corregir
                    var lastDay = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 0);
                    lastDay.setHours(23, 59, 59, 0, 0);
                    if (lastDay.getDate() == 31) {
                        lastDay.setDate(lastDay.getDate() - 1);

                    }
                    totalDias = Math.ceil((lastDay.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)) + 30;
                }

                return totalDias;


            }



            async function realizarCalculos(empleado, planilla, countE) {
                await esperandoCalculo();
                // console.log(empleado);
                SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
                SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;

                // $scope.$apply(() => {
                //     planilla.RecursosHumanosEmpleados.push(empleado);
                // })
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth();
                var day = d.getDate();
                // var c = new Date(planilla.gestion, month, day);
                // var diaPlanilla = new Date(planilla.gestion, month, day, 23, 59, 59);
                var diaPlanilla = new Date(planilla.gestion, 11, 30, 23, 59, 59);
                var fechaInicioEmpleado = new Date(empleado.fecha_inicio);
                fechaInicioEmpleado.setHours(0, 0, 0, 0);
                if (empleado.rrhhDetalleSueldos.length > 0) {

                    var planillasEmpleado = empleado.rrhhDetalleSueldos;
                    var sumaSueldoBasico = 0;
                    var sumaHorasExtra = 0;
                    var sumaRecargoNocturno = 0;
                    var sumaBonoAntiguedad = 0;
                    var sumaBonoFrontera = 0;
                    var sumaOtrosBonos = 0;
                    var sumaTotalGanado = 0;
                    var cantidadDetalles = 0;
                    for (let index = 0; index < planillasEmpleado.length; index++) {
                        const planilla = planillasEmpleado[index];
                        if (planilla.dt == 30) {
                            sumaSueldoBasico += planilla.importe_sueldo_basico;
                            sumaHorasExtra += planilla.importe_horas_extras;
                            sumaRecargoNocturno += planilla.importe_recargo_nocturno;
                            sumaBonoAntiguedad += planilla.importe_bono_antiguedad;
                            sumaBonoFrontera += planilla.importe_bono_frontera;
                            sumaOtrosBonos += planilla.importe_otros_bonos;
                            sumaTotalGanado += planilla.total_ganado;
                            cantidadDetalles += 1;
                        }
                    }

                    // var cantidadDetalles = planillasEmpleado.length;
                    var promedioSueldo = sumaSueldoBasico / cantidadDetalles;
                    var promedioHorasExtras = sumaHorasExtra / cantidadDetalles;
                    var promedioRecargosNocturno = sumaRecargoNocturno / cantidadDetalles;
                    var promedioBonoAntiguedad = sumaBonoAntiguedad / cantidadDetalles;
                    var promedioBonoFrontera = sumaBonoFrontera / cantidadDetalles;
                    var promedioOtrosBonos = sumaOtrosBonos / cantidadDetalles;
                    var promedioTotalGanado = sumaTotalGanado / cantidadDetalles;
                    var diastrabajados = 360;
                    if (fechaInicioEmpleado.getFullYear() == diaPlanilla.getFullYear()) {
                        // var timeDiff = Math.abs(diaPlanilla.getTime() - fechaInicioEmpleado.getTime());
                        // diastrabajados = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                        // var diff =  diaPlanilla - fechaInicioEmpleado;
                        // diff = Math.floor((diff) % (1000 * 60 * 60 * 24 * 365));
                        // diff = Math.floor((diff) % (1000 * 60 * 60 * 24 * 30));
                        // diastrabajados = Math.floor((diff) / (1000 * 60 * 60 * 24));

                        diastrabajados = $scope.diferenciaEntreDiasEnDias(fechaInicioEmpleado, diaPlanilla)

                        // diastrabajados = diaPlanilla - fechaInicioEmpleado;
                    }
                    var liquidoPagable = promedioTotalGanado / $scope.parametros.factor_calculo_dias * diastrabajados;


                    var detalleEmpleado = {
                        empleado: empleado.empleado,
                        matricula_seguro: empleado.matricula_seguro,
                        cargos: empleado.cargos,
                        fecha_inicio: empleado.fecha_inicio,
                        numero_cuenta: empleado.numero_cuenta,
                        banco: empleado.banco,
                        promedio_basico: round(promedioSueldo, 2),
                        prom_horas_extras: round(promedioHorasExtras, 2),
                        prom_recargo_nocturno: round(promedioRecargosNocturno, 2),
                        prom_bono_antiguedad: round(promedioBonoAntiguedad, 2),
                        prom_bono_frontera: round(promedioBonoFrontera, 2),
                        prom_otros_bonos: round(promedioOtrosBonos, 2),
                        prom_total_ganado: round(promedioTotalGanado, 2),
                        dias_trabajados: diastrabajados,
                        liquido_pagable: round(liquidoPagable, 2),
                        rrhhDetalleSueldos: empleado.rrhhDetalleSueldos,
                        id_ficha: empleado.rrhhDetalleSueldos[0].ficha
                    };
                    planilla.RecursosHumanosEmpleados.push(detalleEmpleado);
                }


                $scope.$evalAsync()
                // console.log(planilla.RecursosHumanosEmpleados);
                $scope.sumarTotales(planilla);
            }

            $scope.sumarTotales = function (planilla) {
                $scope.sumaSueldoBasico = 0;
                $scope.sumaTotalHorasExtras = 0;
                $scope.sumaRecargoNocturno = 0;
                $scope.sumaBonoAntiguedad = 0;
                $scope.sumaBonoFrontera = 0;
                $scope.sumaOtrosBonos = 0;
                $scope.sumaTotalGanado = 0;
                $scope.sumaTotalDiasTrabajados = 0;
                $scope.sumaLiquidoPagable = 0;
                var totalEmpleados = 0;
                if (planilla.RecursosHumanosEmpleados != undefined) {
                    for (var i = planilla.RecursosHumanosEmpleados.length - 1; i >= 0; i--) {
                        $scope.sumaSueldoBasico = round($scope.sumaSueldoBasico + planilla.RecursosHumanosEmpleados[i].promedio_basico, 2);
                        $scope.sumaTotalHorasExtras = round($scope.sumaTotalHorasExtras + planilla.RecursosHumanosEmpleados[i].prom_horas_extras, 2);
                        $scope.sumaRecargoNocturno = round($scope.sumaRecargoNocturno + planilla.RecursosHumanosEmpleados[i].prom_recargo_nocturno, 2);
                        $scope.sumaBonoAntiguedad = round($scope.sumaBonoAntiguedad + planilla.RecursosHumanosEmpleados[i].prom_bono_antiguedad, 2);
                        $scope.sumaBonoFrontera = round($scope.sumaBonoFrontera + planilla.RecursosHumanosEmpleados[i].prom_bono_frontera, 2);
                        $scope.sumaOtrosBonos = round($scope.sumaOtrosBonos + planilla.RecursosHumanosEmpleados[i].prom_otros_bonos, 2);
                        $scope.sumaTotalGanado = round($scope.sumaTotalGanado + planilla.RecursosHumanosEmpleados[i].prom_total_ganado, 2);
                        $scope.sumaTotalDiasTrabajados = round($scope.sumaTotalDiasTrabajados + planilla.RecursosHumanosEmpleados[i].dias_trabajados, 2);
                        $scope.sumaLiquidoPagable = round($scope.sumaLiquidoPagable + planilla.RecursosHumanosEmpleados[i].liquido_pagable, 2);
                    }
                }
                planilla.importe_sueldo_basico = $scope.sumaSueldoBasico;
                planilla.importe_horas_extras = $scope.sumaTotalHorasExtras;
                planilla.importe_recargo_nocturno = $scope.sumaRecargoNocturno;
                planilla.importe_bono_antiguedad = $scope.sumaBonoAntiguedad;
                planilla.importe_bono_frontera = $scope.sumaBonoFrontera;
                planilla.importe_otros_bonos = $scope.sumaOtrosBonos;
                planilla.importe_total_ganado = $scope.sumaTotalGanado;
                planilla.total_dias_trabajados = $scope.sumaTotalDiasTrabajados;
                planilla.importe_liquido_pagable = $scope.sumaLiquidoPagable;

            }

            function esperandoCalculo() {
                return new Promise(resolve => setTimeout(resolve, 5));
            }

            function getPercentageChange(oldNumber, newNumber) {
                var decreaseValue = oldNumber - newNumber;
                var porcentage = 100 - (decreaseValue / oldNumber) * 100;
                return porcentage.toFixed();
            }

            ////REPORTE PDF PLANILLA DE AGUINALDOS
            $scope.imprimirPlanillaAguinaldosPdf = function (data) {
                var doc = new PDFDocument({ compress: false, size: 'letter', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 105, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(data.RecursosHumanosEmpleados.length / itemsPorPagina);
                $scope.cabeceraPlanillaAguinaldos(doc, items, pagina, totalPaginas, data.gestion, $scope.usuario.empresa.nit);
                doc.font('Helvetica', 7);
                for (i = 0; i < data.RecursosHumanosEmpleados.length; i++) {
                    var datos = data.RecursosHumanosEmpleados[i];
                    doc.text(i + 1, 13, y + 5, { width: 22, });
                    doc.text(datos.empleado.persona.nombre_completo.toUpperCase(), 38, y + 5, { width: 174 });
                    doc.text(datos.empleado.campo.nombre.toUpperCase(), 216, y + 5, { width: 64 });
                    doc.text(datos.fecha_inicio ? $scope.fechaATexto(datos.fecha_inicio) : '', 283, y + 5, { width: 42 });
                    doc.text(datos.cargos[0].cargo.nombre.toUpperCase(), 328, y + 5, { width: 195 });
                    if (datos.rrhhDetalleSueldos.length == 1) {
                        doc.text(number_format_negativo_to_positvo(0, 2), 522, y + 5, { width: 42, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(0, 2), 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    if (datos.rrhhDetalleSueldos.length == 2) {
                        doc.text(number_format_negativo_to_positvo(0, 2), 522, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    if (datos.rrhhDetalleSueldos.length == 3) {
                        doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', 522, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.rrhhDetalleSueldos[2].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[2].total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado, 2), 672, y + 5, { width: 42, align: 'right' });
                    doc.text(datos.dias_trabajados, 717, y + 5, { width: 17, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(datos.liquido_pagable, 2), 737, y + 5, { width: 42, align: 'right' });
                    y += 15;
                    items++;
                    if (items === itemsPorPagina) {
                        doc.addPage({ compress: false, size: 'letter', layout: 'landscape', margin: 0 });
                        y = 105;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraPlanillaAguinaldos(doc, items, pagina, totalPaginas, data.gestion, $scope.usuario.empresa.nit);
                    }
                    doc.font('Helvetica', 7);
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }

            $scope.imprimirPlanillaAguinaldosXlsx = function (datos) {
                var trabajador = datos.RecursosHumanosEmpleados;
                var data = [["N°", "Nombre del Empleado", "C.I.", "Exp.", "Campamento", "Fecha Ingreso", "Cargo", "Total Ganado Septiembre",
                    "Total Ganado Octubre", "Total Ganado Noviembre", "Sueldo Promedio", "DT", "Líquido Pagable", "Cuenta Bancaria", "Banco"]];
                for (var i = 0; i < trabajador.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(trabajador[i].empleado.persona.nombre_completo.toUpperCase());
                    columns.push(trabajador[i].empleado.persona.ci);
                    columns.push(trabajador[i].empleado.extension ? trabajador[i].empleado.extension.nombre_corto : "");
                    columns.push(trabajador[i].empleado.campo.nombre.toUpperCase());
                    var fechaInicio = $scope.fechaATexto(trabajador[i].fecha_inicio);
                    columns.push(fechaInicio);
                    if (trabajador[i].cargos.length > 0) {
                        var cargosEmpleado = [];
                        for (j = 0; j < trabajador[i].cargos.length; j++) {
                            cargosEmpleado.push(trabajador[i].cargos[j].cargo.nombre);
                        }
                        columns.push(cargosEmpleado.join(', ').toUpperCase());
                    } else {
                        columns.push("");
                    }
                    if (trabajador[i].rrhhDetalleSueldos.length === 1) {
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        trabajador[i].rrhhDetalleSueldos[0].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[0].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    if (trabajador[i].rrhhDetalleSueldos.length === 2) {
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        trabajador[i].rrhhDetalleSueldos[0].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[0].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        trabajador[i].rrhhDetalleSueldos[1].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[1].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    if (trabajador[i].rrhhDetalleSueldos.length === 3) {
                        trabajador[i].rrhhDetalleSueldos[0].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[0].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        trabajador[i].rrhhDetalleSueldos[1].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[1].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        trabajador[i].rrhhDetalleSueldos[2].dt === 30 ? columns.push(trabajador[i].rrhhDetalleSueldos[2].total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    columns.push(trabajador[i].prom_total_ganado);
                    columns.push(trabajador[i].dias_trabajados);
                    columns.push(trabajador[i].liquido_pagable);
                    columns.push(trabajador[i].numero_cuenta);
                    columns.push(trabajador[i].banco ? trabajador[i].banco.nombre : "");
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE AGUINALDOS PRE-IMPRESION.xlsx");
                blockUI.stop();
            }

            $scope.cabeceraPlanillaAguinaldos = function (doc, items, pagina, totalPag, gestion, nit) {
                doc.font('Helvetica-Bold', 8);
                doc.text('NIT: ' + nit, 120, 40);
                doc.text('CORRESPONDIENTE A LA GESTIÓN:   ' + gestion, 600, 68);
                doc.font('Helvetica-Bold', 9);
                doc.text('PLANILLA DE AGUINALDOS', 10, 50, { align: 'center' });
                doc.font('Helvetica-Bold', 8);
                doc.text('(En Bolivianos)', 10, 58, { align: 'center' });
                doc.font('Helvetica-Bold', 8);

                doc.rect(10, 85, 772, 20).stroke();
                doc.rect(35, 85, 0, 20).stroke();
                doc.rect(214, 85, 0, 20).stroke();
                doc.rect(280, 85, 0, 20).stroke();
                doc.rect(325, 85, 0, 20).stroke();
                doc.rect(522, 85, 0, 20).stroke();
                doc.rect(572, 85, 0, 20).stroke();
                doc.rect(622, 85, 0, 20).stroke();
                doc.rect(672, 85, 0, 20).stroke();
                doc.rect(717, 85, 0, 20).stroke();
                doc.rect(737, 85, 0, 20).stroke();

                doc.font('Helvetica-Bold', 7);
                doc.text('N°', 10, 92, { width: 25, align: 'center' });
                doc.text('Nombre del Empleado', 35, 92, { width: 176, align: 'center' });
                doc.text('Campamento', 214, 92, { width: 66, align: 'center' });
                doc.text('Fecha Ingreso', 280, 88, { width: 45, align: 'center' });
                doc.text('Cargo', 325, 92, { width: 197, align: 'center' });
                doc.text('Total Ganado Septiembre', 522, 88, { width: 50, align: 'center' });
                doc.text('Total Ganado Octubre', 572, 88, { width: 50, align: 'center' });
                doc.text('Total Ganado Noviembre', 622, 88, { width: 50, align: 'center' });
                doc.text('Sueldo Promedio', 672, 88, { width: 45, align: 'center' });
                doc.text('DT', 717, 92, { width: 20, align: 'center' });
                doc.text('Líquido Pagable', 737, 88, { width: 45, align: 'center' });

                doc.text('Página ' + pagina + ' de ' + totalPag, 725, 585);
            }
            $scope.imprimirBoletaAguinaldoIndividual = function (gestion, datos, oficial) {
                if (oficial) {
                    datos.rrhhDetalleSueldos = [];
                    for (let k = 0; k < datos.detalleSueldos.length; k++) {
                        datos.rrhhDetalleSueldos[k] = datos.detalleSueldos[k].sueldo;
                    }
                }
                if ($scope.usuario.empresa.departamento.nombre) var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                var stream = doc.pipe(blobStream());
                var x = 20, y = 30;
                doc.font('Helvetica-Bold', 7);
                doc.text('Boleta de Aguinaldo de la Gestión: ' + gestion, x, y); y = y + 18;
                doc.font('Helvetica-Bold', 6); doc.text('Nombre:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.persona.nombre_completo : datos.empleado.persona.nombre_completo, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('CI:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.persona.ci + ' ' + datos.DetalleFicha.empleado.extension.nombre_corto : datos.empleado.persona.ci + ' ' + datos.empleado.extension.nombre_corto, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Matrícula:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.matricula_seguro : datos.matricula_seguro, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Campamento:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.campo.nombre : datos.empleado.campo.nombre, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text($scope.fechaATexto(oficial ? datos.DetalleFicha.fecha_inicio : datos.fecha_inicio), x + 75, y); y = y + 24;

                doc.font('Helvetica', 6);
                if (datos.rrhhDetalleSueldos.length === 1) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (datos.rrhhDetalleSueldos.length === 2) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (datos.rrhhDetalleSueldos.length === 3) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[2].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[2].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                doc.text('Duodésimas:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado / 12, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Sueldo promedio:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Días Trabajadas:', x, y, { width: 80 }); doc.text(datos.dias_trabajados, x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Total Ganado:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo((datos.prom_total_ganado / 360) * datos.dias_trabajados, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.lineWidth(0.5);
                doc.rect(x + 70, y - 3, 40, 0).stroke();
                doc.font('Helvetica-Bold', 6);
                doc.text('Líquido pagable:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.liquido_pagable, 2), x + 75, y, { width: 30, align: 'right' });
                doc.text('Bs.', x + 108, y); y = y + 12;
                doc.font('Helvetica', 6);
                // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });

                dptoEmpresa = $scope.usuario.empresa.departamento.nombre.toLowerCase().split(' ');
                if (dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ' ' + dptoEmpresa[1].charAt(0).toUpperCase() + dptoEmpresa[1].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
                if (!dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
                x = 346;
                y = 30;
                //COPIA EMPLEADO
                doc.font('Helvetica-Bold', 7);
                doc.text('Boleta de Aguinaldo de la Gestión: ' + gestion, x, y); y = y + 18;
                doc.font('Helvetica-Bold', 6); doc.text('Nombre:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.persona.nombre_completo : datos.empleado.persona.nombre_completo, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('CI:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.persona.ci + ' ' + datos.DetalleFicha.empleado.extension.nombre_corto : datos.empleado.persona.ci + ' ' + datos.empleado.extension.nombre_corto, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Matrícula:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.matricula_seguro : datos.matricula_seguro, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Campamento:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(oficial ? datos.DetalleFicha.empleado.campo.nombre : datos.empleado.campo.nombre, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text($scope.fechaATexto(oficial ? datos.DetalleFicha.fecha_inicio : datos.fecha_inicio), x + 75, y); y = y + 24;

                doc.font('Helvetica', 6);
                if (datos.rrhhDetalleSueldos.length === 1) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (datos.rrhhDetalleSueldos.length === 2) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (datos.rrhhDetalleSueldos.length === 3) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[0].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[0].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[1].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[1].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(datos.rrhhDetalleSueldos[2].dt === 30 ? number_format_negativo_to_positvo(datos.rrhhDetalleSueldos[2].total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                doc.text('Duodésimas:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado / 12, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Sueldo promedio:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Días Trabajadas:', x, y, { width: 80 }); doc.text(datos.dias_trabajados, x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Total Ganado:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo((datos.prom_total_ganado / 360) * datos.dias_trabajados, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.lineWidth(0.5);
                doc.rect(x + 70, y - 3, 40, 0).stroke();
                doc.font('Helvetica-Bold', 6);
                doc.text('Líquido pagable:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(datos.liquido_pagable, 2), x + 75, y, { width: 30, align: 'right' });
                doc.text('Bs.', x + 108, y); y = y + 12;
                doc.font('Helvetica', 6);
                // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });

                dptoEmpresa = $scope.usuario.empresa.departamento.nombre.toLowerCase().split(' ');
                if (dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ' ' + dptoEmpresa[1].charAt(0).toUpperCase() + dptoEmpresa[1].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
                if (!dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
                doc.end();
                //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.pl = {};
            $scope.filtrarListaPlanillaSueldos = function (planilla) {
                var promesa = RRHHlistaPlanillaAguinaldos($scope.usuario.id_empresa, planilla.gestion);
                promesa.then(function (dato) {
                    $scope.pl.planillas = dato.planillas;
                    // $scope.sumaTotalPlanillas($scope.pl.planillas);
                    blockUI.stop();
                });
            }

            $scope.cerrarVerPlanillaAguinaldos = function () {
                $scope.cerrarPopup($scope.idModalVerPlanillaAguinaldos);
            }

            $scope.verPlanilla = function (planilla) {
                $scope.abrirPopup($scope.idModalVerPlanillaAguinaldos);
                $scope.dynamicPopoverEmpleado = {
                    templateUrl: 'myPopoverEmpleadoTemplate.html',
                };
                $scope.dynamicPopoverBancoComprobante = {
                    templateUrl: 'myPopoverBancoComprobante.html',
                };
                $scope.registroIndividual = true
                var promesa = ListaPlanillaAguinaldosDetalle(planilla.id);
                promesa.then(function (dato) {
                    $scope.planillaC = planilla;
                    $scope.planillaC.detalles = dato.planillas;

                });
            }

            $scope.ordenPlanillas = true;
            $scope.ordenarPlanillaEditar = function (orden) {
                $scope.planillaC.detalles = $filter('orderBy')($scope.planillaC.detalles, ['DetalleFicha.empleado.persona.apellido_paterno'], orden);
                $scope.ordenPlanillas = !orden;
            }
            $scope.imprimirPlanillaAguinaldosPdfOficial = function (data) {
                var doc = new PDFDocument({ compress: false, size: 'letter', layout: 'landscape', margin: 0 });
                var stream = doc.pipe(blobStream());

                var y = 105, itemsPorPagina = 30, items = 0, pagina = 1, totalPaginas = Math.ceil(data.detalles.length / itemsPorPagina);
                $scope.cabeceraPlanillaAguinaldos(doc, items, pagina, totalPaginas, data.anio, $scope.usuario.empresa.nit);
                doc.font('Helvetica', 7);
                for (i = 0; i < data.detalles.length; i++) {
                    var datos = data.detalles[i];
                    doc.text(i + 1, 13, y + 5, { width: 22, });
                    doc.text(datos.DetalleFicha.empleado.persona.nombre_completo.toUpperCase(), 38, y + 5, { width: 174 });
                    doc.text(datos.DetalleFicha.empleado.campo.nombre.toUpperCase(), 216, y + 5, { width: 64 });
                    doc.text(datos.DetalleFicha.fecha_inicio ? $scope.fechaATexto(datos.DetalleFicha.fecha_inicio) : '', 283, y + 5, { width: 42 });
                    doc.text(datos.DetalleFicha.cargos[0].cargo.nombre.toUpperCase(), 328, y + 5, { width: 195 });
                    if (datos.detalleSueldos.length == 1) {
                        doc.text(number_format_negativo_to_positvo(0, 2), 522, y + 5, { width: 42, align: 'right' });
                        doc.text(number_format_negativo_to_positvo(0, 2), 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    if (datos.detalleSueldos.length == 2) {
                        doc.text(number_format_negativo_to_positvo(0, 2), 522, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.detalleSueldos[1].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[1].sueldo.total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    if (datos.detalleSueldos.length == 3) {
                        doc.text(datos.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', 522, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.detalleSueldos[1].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[1].sueldo.total_ganado, 2) : '0.00', 572, y + 5, { width: 42, align: 'right' });
                        doc.text(datos.detalleSueldos[2].sueldo.dt === 30 ? number_format_negativo_to_positvo(datos.detalleSueldos[2].sueldo.total_ganado, 2) : '0.00', 622, y + 5, { width: 42, align: 'right' });
                    }
                    doc.text(number_format_negativo_to_positvo(datos.prom_total_ganado, 2), 672, y + 5, { width: 42, align: 'right' });
                    doc.text(datos.dias_trabajados, 717, y + 5, { width: 17, align: 'right' });
                    doc.text(number_format_negativo_to_positvo(datos.liquido_pagable, 2), 737, y + 5, { width: 42, align: 'right' });
                    y += 15;
                    items++;
                    if (items === itemsPorPagina) {
                        doc.addPage({ compress: false, size: 'letter', layout: 'landscape', margin: 0 });
                        y = 105;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraPlanillaAguinaldos(doc, items, pagina, totalPaginas, data.anio, $scope.usuario.empresa.nit);
                    }
                    doc.font('Helvetica', 7);
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();

            }
            $scope.imprimirPlanillaAguinaldosXlsxOficial = function (datos) {
                var data = [["N°", "Nombre del Empleado", "C.I.", "Exp.", "Campamento", "Fecha Ingreso", "Cargo", "Total Ganado Septiembre",
                "Total Ganado Octubre", "Total Ganado Noviembre", "Sueldo Promedio", "DT", "Líquido Pagable", "Cuenta Bancaria", "Banco"]];

                for (var i = 0; i < datos.length; i++) {
                    var columns = [];
                    columns.push((i + 1));
                    columns.push(datos[i].DetalleFicha.empleado.persona.nombre_completo.toUpperCase());
                    columns.push(datos[i].DetalleFicha.empleado.persona.ci);
                    columns.push(datos[i].DetalleFicha.empleado.extension ? datos[i].DetalleFicha.empleado.extension.nombre_corto : "");
                    columns.push(datos[i].DetalleFicha.empleado.campo.nombre.toUpperCase());
                    var fechaInicio = $scope.fechaATexto(datos[i].DetalleFicha.fecha_inicio);
                    columns.push(fechaInicio);
                    if (datos[i].DetalleFicha.cargos.length > 0) {
                        var cargosEmpleado = [];
                        for (j = 0; j < datos[i].DetalleFicha.cargos.length; j++) {
                            cargosEmpleado.push(datos[i].DetalleFicha.cargos[j].cargo.nombre);
                        }
                        columns.push(cargosEmpleado.join(', ').toUpperCase());
                    } else {
                        columns.push("");
                    }
                    if (datos[i].detalleSueldos.length === 1) {
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        datos[i].detalleSueldos[0].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[0].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    if (datos[i].detalleSueldos.length === 2) {
                        columns.push(number_format_negativo_to_positvo(0, 2));
                        datos[i].detalleSueldos[0].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[0].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        datos[i].detalleSueldos[1].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[1].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    if (datos[i].detalleSueldos.length === 3) {
                        datos[i].detalleSueldos[0].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[0].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        datos[i].detalleSueldos[1].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[1].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                        datos[i].detalleSueldos[2].sueldo.dt === 30 ? columns.push(datos[i].detalleSueldos[2].sueldo.total_ganado) : columns.push(number_format_negativo_to_positvo(0, 2));
                    }
                    columns.push(datos[i].prom_total_ganado);
                    columns.push(datos[i].dias_trabajados);
                    columns.push(datos[i].liquido_pagable);
                    columns.push(datos[i].DetalleFicha.numero_cuenta);
                    columns.push(datos[i].DetalleFicha.banco ? datos[i].DetalleFicha.banco.nombre : "");
                    data.push(columns);
                }

                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE AGUINALDOS PRE-IMPRESION.xlsx");
                blockUI.stop();
            }

            $scope.listaBancos = function () {
                $scope.anticiposSeleccionados = []
                $scope.planillasAguinaldoTr3 = []
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
                });
            }
            $scope.abrirModalbanco = function (banco) {
                $scope.tr3 = { planillasAguinaldo: [], tipo: "", fecha: new Date() }
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
                var promesa = ListaTr3PlanillaAguinaldo($scope.usuario.id_empresa, banco.nombre)
                promesa.then(function (dato) {
                    $scope.historialTr3 = dato
                    $scope.abrirPopup($scope.idModalHistorialTR3)
                }).catch(function (err) {
                    var men = (err.data !== undefined && err.data !== null) ? err.data : err.message
                    $scope.mostrarMensaje('Se produjo un error! > ' + men)
                    blockUI.stop();
                })
            }

            $scope.guardarTr3Empleado = function () {
                let arrlegoPlanillasAguinaldoBanco = []

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
                        arrlegoPlanillasAguinaldoBanco.push(detalle)
                    }
                })
                $scope.tr3.planillasAguinaldo = arrlegoPlanillasAguinaldoBanco
                $scope.tr3.fecha_elaboracion = new Date($scope.convertirFecha($scope.tr3.fecha_elaboracion))
                const promesa = GuardarTr3PlanillaAguinaldo($scope.tr3, $scope.usuario.id_empresa)
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
                        let mes = 12
                        let nombre = $scope.usuario.empresa.razon_social.charAt(0) + $scope.usuario.empresa.razon_social.charAt(1) + $scope.usuario.empresa.razon_social.charAt(2) + 'SDO' + mes + datos.datosPlanillaMes.anio.charAt(2) + datos.datosPlanillaMes.anio.charAt(3)
                        var cabezera = datos.tr3Encontrado.planilla + "|" + datos.tr3Encontrado.cuenta.numero + "|0|" + nombre + "|" + fecha + "|" + fechaPago + "|" + datos.total.toFixed(2) + "|" + datos.tr3Encontrado.numero_planilla + "\r\n"

                        datos.planillasAguinaldo.forEach(function (planillaAguinaldo, index, array) {
                            cabezera += (index + 1) + "|" + planillaAguinaldo.DetalleFicha.empleado.persona.nombre_completo + "|" + planillaAguinaldo.DetalleFicha.numero_cuenta + "|" + fechaPago + "|" + datos.tr3Encontrado.numero_planilla + "|" + planillaAguinaldo.liquido_pagable.toFixed(2) + "|||" + datos.tr3Encontrado.nombre_archivo + "\r\n"
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
                        mes = 12
                        dia = (dia < 10) ? "0" + dia : dia
                        let cantidadEmpleado = datos.planillasAguinaldo.length.toString()
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
                        datos.planillasAguinaldo.forEach(function (planillaAguinaldo, index, array) {
                            fecha = $scope.fechaATexto(datos.tr3Encontrado.fecha_elaboracion)
                            numero_cuenta = planillaAguinaldo.DetalleFicha.numero_cuenta
                            if (datos.tr3Encontrado.aumentar_ceros) {
                                let totalCeroscuentaFilaDos = $scope.cantidadEspacioParaAgregar(numero_cuenta, 14, "", "0")
                                primerDigito = numero_cuenta.slice(0, 1)
                                segunYFinalDigitos = numero_cuenta.slice(1)
                                numero_cuenta = primerDigito + totalCeroscuentaFilaDos + segunYFinalDigitos
                            }
                            liquidoPagable = planillaAguinaldo.liquido_pagable.toFixed(2)
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
                var planillasAguinaldoTr3 = []
                var total = 0
                tr3.historialPlanillaAguinaldoTr3.forEach(function (tr3H, index, array) {
                    total += tr3H.planillaAguinaldo.liquido_pagable
                    planillasAguinaldoTr3.push(tr3H.planillaAguinaldo)
                    if (index === (array.length - 1)) {
                        var dato = { planillasAguinaldo: planillasAguinaldoTr3, tipo: tipo, tr3Encontrado: tr3, total: total, datosPlanillaMes: tr3H.planillaAguinaldo.rrhhPlanilla }
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
                var planillasAguinaldoTr3 = []
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
                tr3.historialPlanillaAguinaldoTr3.forEach(function (tr3H, index, array) {
                    total += tr3H.planillaAguinaldo.liquido_pagable
                    planillasAguinaldoTr3.push(tr3H.planillaAguinaldo)
                    if (index === (array.length - 1)) {
                        var dato = { planillasAguinaldo: planillasAguinaldoTr3, tipo: tipo, tr3Encontrado: tr3, total: total, datosPlanillaMes: tr3H.planillaAguinaldo.rrhhPlanilla }
                        if (tipo == "MSC") {
                            var nombreArchivo = tr3.nombre_planilla + ".txt"
                        } else {
                            var nombreArchivo = dato.tr3Encontrado.planilla + "" + dia + "" + dato.datosPlanillaMes.mes.split('-')[1] + "" + dato.datosPlanillaMes.anio + "" + dato.tr3Encontrado.numero_planilla + ".txt"
                        }
                        $scope.descargarArchivoTr3($scope.generarTextoCartaTr3(dato), nombreArchivo);
                    }
                });

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
     $scope.abrirDialogVerificarTr3 = function () {
                $scope.abrirPopup($scope.idModalVerificarTr3);
            }
            $scope.cerrarDialogVerificarTr3 = function () {
                $scope.cerrarPopup($scope.idModalVerificarTr3);
            }
    $scope.verificarTr3AntesdeComprobante = async function (banco) {
                try {
                    let datos = await VerificarTr3AntiAntesdeComprobante($scope.planillaC.id, banco.id)
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
  $scope.generarNombrePlanillaTr3 = function () {
                $scope.tr3.nombre_planilla = ($scope.tr3.planilla ? $scope.tr3.planilla : "") + "" + ($scope.tr3.fecha_elaboracion ? $scope.tr3.fecha_elaboracion.replaceAll('/', "") : $scope.tr3.fecha_elaboracion) + "" + ($scope.tr3.numero_planilla ? $scope.tr3.numero_planilla : '')
            }
            $scope.verificarRegistroIndividual = function () {
                $scope.registroIndividual = $scope.registroIndividual == true ? false : true

            }
            $scope.crearComprobantePorBanco = async function (banco) {
                try {
                    let detallePlanilla = []
                    for (const detalle of $scope.planillaC.detalles) {
                        if (!detalle.id_asiento_contabilidad && detalle.DetalleFicha.banco.nombre.toUpperCase() === banco.nombre.toUpperCase()) {
                            detallePlanilla.push(detalle)
                        }
                    }
                    if (detallePlanilla.length > 0) {
                        let datos = { banco: banco, detallePlanilla: detallePlanilla, planilla: $scope.planillaC, registroIndividual: $scope.registroIndividual }
                        $scope.crearNuevoComprobantePA("PlanillaAguinaldos",
                            'Registro de comprobante por empleado de la planilla de aguinaldos del año ' + $scope.planillaC.anio + '.',
                            datos)
                    } else {
                        $scope.mostrarMensaje("No existen registros para procesar.")
                    }
                    $scope.$evalAsync()
                } catch (error) {
                    console.log(error)
                }

            }
            $scope.crearNuevoComprobantePA = function (tipo, mensaje, datos) {
                SweetAlert.swal({
                    title: mensaje,
                    icon: "info",
                    showCloseButton: true,
                    html: '<h5>Generar el comprobante puede tardar varios minutos. se esta recuperando y procesando la información para generar el comprobante.</h5>'
                })
                $scope.cerrarVerPlanillaAguinaldos();
                $scope.crearNuevoComprobante(tipo, datos)
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
            $scope.abrirDialogImpresion = (datos) => {
                $scope.infoGral = datos;
                blockUI.start('Cargando');
                var data = ListaPlanillaAguinaldosDetalle(datos.id);
                data.then((dato) => {
                    $scope.empleados = dato.planillas;
                    var campos = dato.planillas.map(emp => emp.DetalleFicha.empleado.campo);
                    $scope.camposUnicos = removeDumplicateValue(campos);
                });
                blockUI.stop();
                $scope.abrirPopup($scope.idModalImpresion);
            }
            $scope.cerrarDialogImpresion = function () {
                $scope.cerrarPopup($scope.idModalImpresion);
            }
            // IMPRIMIR BOLETAS POR CAMPAMENTO
            $scope.imprimirBoletasCampo = function (datos, planilla, idCampo) {
                blockUI.start('Generando Boletas');
                var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
                var trabajadores = planilla.filter(trab => trab.DetalleFicha.empleado.campo.id == idCampo);
                var gestion = datos.anio;
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });
                var stream = doc.pipe(blobStream());
                var x = 30, y = 30, items = 0; itemsPage = 0;
                for (var i = 0; i < trabajadores.length; i++) {
                    //COPIEA EMPRESA
                    var trabajador = trabajadores[i];
                    if (itemsPage == 0) {
                        $scope.dibujarBoleta(doc, gestion, x, y, trabajador, dptoEmpresa);
                        x = 346;
                        y = 30;
                        //COPIA EMPLEADO
                        $scope.dibujarBoleta(doc, gestion, x, y, trabajador, dptoEmpresa);
                        x = 30;
                        y = 426;
                    }
                    if (itemsPage == 1) {
                        $scope.dibujarBoleta(doc, gestion, x, y, trabajador, dptoEmpresa);
                        x = 346;
                        y = 426;
                        //COPIA EMPLEADO
                        $scope.dibujarBoleta(doc, gestion, x, y, trabajador, dptoEmpresa);
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

            // DIBUJAR CONTENIDO BOLETA DE PAGO
            $scope.dibujarBoleta = (doc, gestion, x, y, trabajador, dptoEmpresa) => {
                doc.font('Helvetica-Bold', 7);
                doc.text('Boleta de Aguinaldo de la Gestión: ' + gestion, x, y); y = y + 18;
                doc.font('Helvetica-Bold', 6); doc.text('Nombre:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(trabajador.DetalleFicha.empleado.persona.nombre_completo, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('CI:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(trabajador.DetalleFicha.empleado.persona.ci + ' ' + trabajador.DetalleFicha.empleado.extension.nombre_corto, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Matrícula:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(trabajador.DetalleFicha.matricula_seguro, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Campamento:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text(trabajador.DetalleFicha.empleado.campo.nombre, x + 75, y); y = y + 12;
                doc.font('Helvetica-Bold', 6); doc.text('Fecha Ingreso:', x, y, { width: 80 }); doc.font('Helvetica', 6); doc.text($scope.fechaATexto(trabajador.DetalleFicha.fecha_inicio), x + 75, y); y = y + 24;

                doc.font('Helvetica', 6);
                if (trabajador.detalleSueldos.length === 1) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (trabajador.detalleSueldos.length === 2) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(0, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[1].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[1].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                if (trabajador.detalleSueldos.length === 3) {
                    doc.text('Sueldo octubre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[0].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[0].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo noviembre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[1].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[1].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                    doc.text('Sueldo diciembre:', x, y, { width: 80 }); doc.text(trabajador.detalleSueldos[2].sueldo.dt === 30 ? number_format_negativo_to_positvo(trabajador.detalleSueldos[2].sueldo.total_ganado, 2) : '0.00', x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                }
                doc.text('Duodésimas:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(trabajador.prom_total_ganado / 12, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Sueldo promedio:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(trabajador.prom_total_ganado, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Días Trabajadas:', x, y, { width: 80 }); doc.text(trabajador.dias_trabajados, x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.text('Total Ganado:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo((trabajador.prom_total_ganado / 360) * trabajador.dias_trabajados, 2), x + 75, y, { width: 30, align: 'right' }); y = y + 12;
                doc.lineWidth(0.5);
                doc.rect(x + 70, y - 3, 40, 0).stroke();
                doc.font('Helvetica-Bold', 6);
                doc.text('Líquido pagable:', x, y, { width: 80 }); doc.text(number_format_negativo_to_positvo(trabajador.liquido_pagable, 2), x + 75, y, { width: 30, align: 'right' });
                doc.text('Bs.', x + 108, y); y = y + 12;
                doc.font('Helvetica', 6);
                // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x + 125, y - 12, { width: 110, align: 'center' }); doc.text('FIRMA', x + 125, y - 6, { width: 110, align: 'center' });

                dptoEmpresa = $scope.usuario.empresa.departamento.nombre.toLowerCase().split(' ');
                if (dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ' ' + dptoEmpresa[1].charAt(0).toUpperCase() + dptoEmpresa[1].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
                if (!dptoEmpresa.length > 1) doc.text(dptoEmpresa[0].charAt(0).toUpperCase() + dptoEmpresa[0].slice(1) + ', ' + $scope.aFechaLargaSinDia(new Date()), x, y + 3, { width: 200, align: 'center' });
            }
            //FIN DIBUJAR BOLETA DE PAGO
            $scope.obtenerDepartamentos = function () {
                blockUI.start();
                var nombre_corto = '-BOL';
                var promesa = Paises(nombre_corto);
                promesa.then(function (entidades) {
                    $scope.departamentosBanco = entidades;

                    blockUI.stop();
                });

            }
            $scope.inicio()
        }]);