angular.module('agil.controladores')

.controller('ControladorPlanillaRetroactivas', ['$scope','$localStorage','$location','$templateCache','$route','blockUI', 
'GenerarPlanillaRetroactivas', 'ClasesTipo', 'SweetAlert', 'Parametros', 'RRHHPlanillaRetroActivas', 
'RRHHlistaPlanillaRetroActivas', 'ListaPlanillaRetroActivasDetalle', 'ReporteExcelPlanillaRetroActivasAFPFUTURO', 
'ReporteExcelPlanillaRetroActivasAFPPREVISION', 'ReporteExcelPlanillaRetroActivasOVT', function($scope,$localStorage,$location,$templateCache,$route,blockUI, 
    GenerarPlanillaRetroactivas, ClasesTipo, SweetAlert, Parametros, RRHHPlanillaRetroActivas, RRHHlistaPlanillaRetroActivas, 
    ListaPlanillaRetroActivasDetalle, ReporteExcelPlanillaRetroActivasAFPFUTURO, ReporteExcelPlanillaRetroActivasAFPPREVISION, ReporteExcelPlanillaRetroActivasOVT){
	$scope.$on('$viewContentLoaded', function () {
        // resaltarPestaña($location.path().substring(1));
        
        $scope.idDialogNuevaPlanilla = 'dialog-nueva-planilla';
        
        ejecutarScriptsPlanillaRetoactivas($scope.idDialogNuevaPlanilla);
    });

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.eliminarPopup($scope.idDialogNuevaPlanilla);
    });

    $scope.usuario = JSON.parse($localStorage.usuario);

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
        $scope.obtenerGestiones();
        $scope.obtenerParametros($scope.usuario.id_empresa);
        $scope.PopoverReportes_OVT_AFP = {
            templateUrl: 'PopoverReportes_OVT_AFP.html',
            title: 'Menu',
            isOpen: false
        };
        
    }
  
    $scope.obtenerGestiones = function () {
        blockUI.start();
        var promesa = ClasesTipo("GTN");
        promesa.then(function (entidad) {
            $scope.gestiones = entidad.clases;
            blockUI.stop();
        });
    }

    $scope.nuevaPlanilla = function () {
        $scope.planilla = new RRHHPlanillaRetroActivas({ id_empresa: $scope.usuario.id_empresa });
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
        $scope.abrirPopup($scope.idDialogNuevaPlanilla);
    }

    $scope.cerrarDialogNuevoIncrementoSalarial=function () {
        $scope.cerrarPopup($scope.idDialogNuevaPlanilla); 
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

    $scope.diferenciaEntreDiasEnDias = function (a, b) {
        var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
    }

    function esperandoCalculo() {
        return new Promise(resolve => setTimeout(resolve, 5));
    }

    function getPercentageChange(oldNumber, newNumber) {
        var decreaseValue = oldNumber - newNumber;
        var porcentage = 100 - (decreaseValue / oldNumber) * 100;
        return porcentage.toFixed();
    }

    $scope.filtrarEmpleados = function (planilla) {
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
        var promesa = GenerarPlanillaRetroactivas(planilla.gestion, planilla.mes.split("-")[0], $scope.usuario.id_empresa);
        promesa.then(function (datos) {
            // planilla.RecursosHumanosEmpleados = datos.empleados;
            if (!datos.error) {
                procesarCalculos(datos.planilla.rrhhDetallePlanillaSueldos, planilla);
            } else {
                SweetAlert.swal("", datos.mensaje, "warning");
                planilla.detalles = [];
            }
        });
    }

    async function procesarCalculos(array, planilla) {
        SweetAlert.update({ title: "Realizando Cálculos....." })
        planilla.detalles = [];
        var countE = 0;
        for (const empleado of array) {
            countE = countE + 1;

            await realizarCalculos(empleado, planilla, getPercentageChange(array.length, countE));
        }
        $scope.reverse = true;
        $scope.sortColumn('nombre_completo');
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

    async function realizarCalculos(empleado, planilla, countE) {
        await esperandoCalculo();
        SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
        SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
        // empleado.incremento = empleado.sueldo_basico_planilla < 2164 ? round(2164 - empleado.sueldo_basico_planilla, 2) : 0;
        // empleado.incremnto_adicional = 0;
        // empleado.nuevo_sueldo = empleado.incremento + empleado.sueldo_basico_planilla;
        empleado.sueldo_basico_anterior=empleado.importe_sueldo_basico;
        if (empleado.importe_sueldo_basico < $scope.parametros.salario_base_antiguedad) {
            var diferenciaSalario = $scope.parametros.salario_base_antiguedad - empleado.importe_sueldo_basico;
            empleado.importe_sueldo_basico = round(diferenciaSalario, 2)
        }else{
            empleado.importe_sueldo_basico = 0;
        }
        empleado.ganado = round(empleado.importe_sueldo_basico / 30 * empleado.dt, 2);
        // empleado.horas_extras = empleado.horas_extras_r + empleado.dias_rol_turnos * empleado.horas_extras_rol;
        empleado.importe_horas_extras = round((empleado.importe_sueldo_basico / 30 / 8 * empleado.horas_extras) * 2, 2);
     
        empleado.importe_recargo_nocturno = round((empleado.importe_sueldo_basico / 30 * empleado.nt) * 35 / 100, 2);
        empleado.bono_antiguedad_anterior=empleado.importe_bono_antiguedad;
        var mes = new Date(planilla.gestion, parseInt(planilla.mes), 0);
        var ultimoDiaMesBono = new Date(planilla.gestion, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
        $scope.antiguedad = calcAge(empleado.DetalleFicha.fecha_inicio, ultimoDiaMesBono); // == sacar años de antiguedad ==================
        var diferenciaBono = $scope.calcularBonoAntiguedad($scope.antiguedad) - empleado.importe_bono_antiguedad
        empleado.importe_bono_antiguedad = round(diferenciaBono, 2);

        // $scope.area_frontera = $scope.parametros.areas_frontera.find(function (item_area) {
        //     return item_area.area.nombre == empleado.DetalleFicha.area
        // });
        $scope.bonoFrontera = 0;
        if (empleado.importe_bono_frontera>0) {
            // calculo bono frontera ==============================================
            if ($scope.parametros.frontera_porcentaje) {
                $scope.bonoFrontera = round(empleado.importe_sueldo_basico * $scope.parametros.frontera_monto / 100, 2);
            } else {
                $scope.bonoFrontera = $scope.parametros.frontera_monto;
            }
        }
        empleado.importe_bono_frontera = $scope.bonoFrontera;
        empleado.importe_otros_bonos = 0;
        empleado.total_ganado = round(empleado.ganado + empleado.importe_horas_extras + empleado.importe_recargo_nocturno + empleado.importe_bono_antiguedad + empleado.importe_bono_frontera + empleado.importe_otros_bonos, 2);

        var fechaActual = new Date(empleado.createdAt);
        var fechaNacimiento = new Date(empleado.DetalleFicha.empleado.persona.fecha_nacimiento);
        var datofedad = $scope.diferenciaEntreDiasEnDias(fechaNacimiento, fechaActual)
        var edad_empleado = Math.trunc(datofedad / 365);
        if (empleado.DetalleFicha.jubilacion == null || !empleado.DetalleFicha.jubilacion) {
            if (edad_empleado >= 65) {
                empleado.afp = round(empleado.total_ganado * 11 / 100, 2);
            } else {
                empleado.afp = round(empleado.total_ganado * 12.71 / 100, 2);
            }

        } else {
            if (edad_empleado >= 65) {
                empleado.afp = round(empleado.total_ganado * $scope.parametros.solo_jubilados_mayor_65 / 100, 2);
            } else {
                empleado.afp = round(empleado.total_ganado * $scope.parametros.solo_jubilados_menor_65 / 100, 2);
            }
        }
        
        empleado.rc_iva = 0;
        empleado.importe_anticipos = 0;
        empleado.importe_prestamos = 0;
        empleado.importe_total_descuento = round(empleado.afp + empleado.rc_iva + empleado.importe_anticipos + empleado.importe_prestamos, 2);
        empleado.liquido_pagable = round(empleado.total_ganado - empleado.importe_total_descuento, 2);
        planilla.detalles.push(empleado);
        $scope.$evalAsync()
        $scope.sumarTotales(planilla);
    }

    $scope.sumarTotales = function (planilla) {
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
        if (planilla.detalles != undefined) {
            for (var i = planilla.detalles.length - 1; i >= 0; i--) {
                // for(var i=0;i<planilla.RecursosHumanosEmpleados.length;i++){
                totalEmpleados = totalEmpleados + 1;
                $scope.totalGanadoSueldo = round($scope.totalGanadoSueldo + planilla.detalles[i].ganado, 2);
                $scope.totalSueldoBasico = round($scope.totalSueldoBasico + planilla.detalles[i].importe_sueldo_basico, 2);
                $scope.sumaHorasExtras = $scope.sumaHorasExtras + planilla.detalles[i].horas_extras;
                $scope.sumaTotalHorasExtras = round($scope.sumaTotalHorasExtras + planilla.detalles[i].importe_horas_extras, 2);
                $scope.sumaRecargoNocturno = round($scope.sumaRecargoNocturno + planilla.detalles[i].importe_recargo_nocturno, 2);
                $scope.sumaBonoAntiguedad = round($scope.sumaBonoAntiguedad + planilla.detalles[i].importe_bono_antiguedad, 2);
                $scope.sumaBonoFrontera = round($scope.sumaBonoFrontera + planilla.detalles[i].importe_bono_frontera, 2);
                $scope.sumaOtrosBonos = round($scope.sumaOtrosBonos + planilla.detalles[i].importe_otros_bonos, 2);
                $scope.sumaTotalGanado = round($scope.sumaTotalGanado + planilla.detalles[i].total_ganado, 2);
                $scope.sumaAFP = round($scope.sumaAFP + planilla.detalles[i].afp, 2);
                $scope.sumaRCIVA = round($scope.sumaRCIVA + planilla.detalles[i].rc_iva, 2);
                $scope.sumaAniticipos = round($scope.sumaAniticipos + planilla.detalles[i].importe_anticipos, 2);
                $scope.sumaPrestamos = round($scope.sumaPrestamos + planilla.detalles[i].importe_prestamos, 2);
                $scope.sumaTotalDescuento = round($scope.sumaTotalDescuento + planilla.detalles[i].importe_total_descuento, 2);
                $scope.sumaLiquidoPagable = round($scope.sumaLiquidoPagable + planilla.detalles[i].liquido_pagable, 2);
            }
        }
        planilla.importe_sueldo_basico = $scope.totalSueldoBasico;
        planilla.importe_ganado = $scope.totalGanadoSueldo;
        planilla.total_horas_extras = $scope.sumaTotalHorasExtras;
        planilla.importe_horas_extras = $scope.sumaHorasExtras;
        planilla.importe_recargo_nocturno = $scope.sumaRecargoNocturno;
        planilla.importe_bono_antiguedad = $scope.sumaBonoAntiguedad;
        planilla.importe_bono_frontera = $scope.sumaBonoFrontera;
        planilla.importe_otros_bonos = $scope.sumaOtrosBonos;
        planilla.importe_total_ganado = $scope.sumaTotalGanado;
        planilla.importe_afp = $scope.sumaAFP;
        planilla.importe_rc_iva = $scope.sumaRCIVA;
        planilla.importe_anticipos = $scope.sumaAniticipos;
        planilla.importe_prestamos = $scope.sumaPrestamos;
        planilla.importe_total_descuento = $scope.sumaTotalDescuento;
        planilla.importe_liquido_pagable = $scope.sumaLiquidoPagable;

    }

    $scope.guardarPlanilla = function (planilla) {
        $scope.buscarPlanilla = "";
        SweetAlert.swal({
            title: 'Guardando...',
            icon: 'info',
            iconHtml: '<i class="fa fa-floppy-o size-icon"></i>',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()

        blockUI.noOpen = true;
        planilla.$save(function (dato) {
            $scope.nuevaPlanilla();
         
            SweetAlert.swal("Guardado!", "Planilla registrada exitosamente!", "success");
        }, function (error) {
            SweetAlert.swal("", error, "warning");
        });
    }

    $scope.cerrarPlanillaNuevo = function () {
        $scope.buscarPlanilla = "";
        $scope.cerrarPopup($scope.idDialogNuevaPlanilla);
    }

    // listar planillas registradas =============
    
    $scope.pl = {};
    $scope.filtrarListaPlanillaRetroActivas = function (planilla) {
        var promesa = RRHHlistaPlanillaRetroActivas($scope.usuario.id_empresa, planilla.gestion, planilla.mes);
        promesa.then(function (dato) {
            $scope.pl.planillas = dato.planillas;
            // $scope.sumaTotalPlanillas($scope.pl.planillas);
            blockUI.stop();
        });
    }

    // column to sort
    $scope.column = 'sno';
    
    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false; 
    
    // called on header click
    $scope.sortColumn = function(col){
        $scope.column = col;
        if($scope.reverse){
            $scope.reverse = false;
            $scope.reverseclass = 'fa-sort-amount-asc';
        }else{
            $scope.reverse = true;
            $scope.reverseclass = 'fa-sort-amount-desc';
        }
    };

    $scope.verPlanilla = function (planilla) {
        
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
    
        $scope.registroIndividual = true
        var promesa = ListaPlanillaRetroActivasDetalle(planilla.id);
        promesa.then(function (dato) {
            $scope.planilla = planilla;
            $scope.planilla.ver = true;
            $scope.planilla.gestion = $scope.gestiones.find(function (gestion) {
                return gestion.nombre == planilla.anio;
            });
            $scope.planilla.detalles = dato.planillas;
            $scope.abrirPopup($scope.idDialogNuevaPlanilla);
        });
        
    }

    $scope.generarReporteExcelPlanillaRetroActivasAFPFUTURO = (planillaSueldos) => {
        SweetAlert.swal({
            title: 'Generando Reporte AFP FUTURO ...',
            icon: 'info',
            iconHtml: '<i class="fa fa-search size-icon"></i>',
            // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
            html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()
        blockUI.noOpen = true;
        const promesa = ReporteExcelPlanillaRetroActivasAFPFUTURO(planillaSueldos.id)
        promesa.then((datosReporte) => {
            if (datosReporte.errors) {
                let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                errores = errores.concat(warnings)
                // errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                // $scope.mostrarMensaje(errores.join('<br />'));
                SweetAlert.hideLoading();
                SweetAlert.swal({
                    title: "Datos Faltantes!",
                    html: "<div class='content-sweet'>" + errores.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-primary'>Registros: " + ((datosReporte.reporte.length - 1)) + " de " + datosReporte.total + " | <span class='text-danger'>" + datosReporte.errors.length + " errores. </span> | <span class='text-warning orange'>" + datosReporte.warnings.length + " Advertencias </span></dt></dl>",
                    icon: 'warning'
                });
            }
            if (datosReporte.hasErr) return SweetAlert.swal("", datosReporte.mensaje, "warning");
            const ws_name = "SheetJS";
            const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA RETROACTIVA AFP FUTURO.xlsx");
        }).catch((err) => {
            const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
            SweetAlert.swal("", msg, "error");
        })
    }

    $scope.generarExcelPlanillaRetroActivasAFPPREVISION = (planillaSueldos) => {
        SweetAlert.swal({
            title: 'Generando Reporte AFP PREVISIÓN ...',
            icon: 'info',
            iconHtml: '<i class="fa fa-search size-icon"></i>',
            // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
            html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()
        blockUI.noOpen = true;
        const promesa = ReporteExcelPlanillaRetroActivasAFPPREVISION(planillaSueldos.id)
        promesa.then((datosReporte) => {
            if (datosReporte.errors) {
                let errores = datosReporte.errors.map(err => (err.nombre_empleado + ' ' + err.error))
                let warnings = datosReporte.warnings.map(err => (err.nombre_empleado + ' ' + err.error))
                errores = errores.concat(warnings)
                // errores.push('Registros:' + ((datosReporte.reporte.length - 1)) + ' de ' + datosReporte.total + ' | ' + datosReporte.errors.length + ' errores.' + ' | ' + datosReporte.warnings.length + 'Advertencias')
                // $scope.mostrarMensaje(errores.join('<br />'));
                SweetAlert.hideLoading();
                SweetAlert.swal({
                    title: "Datos Faltantes!",
                    html: "<div class='content-sweet'>" + errores.join('\n\n') + "</div><dl id='dt-list-1'><dt class='text-primary'>Registros: " + ((datosReporte.reporte.length - 1)) + " de " + datosReporte.total + " | <span class='text-danger'>" + datosReporte.errors.length + " errores. </span> | <span class='text-warning orange'>" + datosReporte.warnings.length + " Advertencias </span></dt></dl>",
                    icon: 'warning'
                });
            }
            if (datosReporte.hasErr) return SweetAlert.swal("", datosReporte.mensaje, "warning");
            const ws_name = "SheetJS";
            const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.reporte);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            blockUI.stop();
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA RETROACTIVAS AFP PREVISIÓN.xlsx");
        }).catch((err) => {
            const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
            SweetAlert.swal("", msg, "error");
        })
    }

    $scope.excelPlanillaRetroActiva = function (planilla) {
        var data = [["N°", "Empleado", "F. Naci.", "C.I.", "Expedido", "Cargo", "Campamento", "Ubicación",
            "F. Ingre.", "F. Retiro", "Matricula", "Basico Anterior", "Basico Actual", "Basico Diferencia", "DT", "Ganado", "DC", "Hrs Extra", "Total Extras",
            "NT", "Recargo Nocturno", "BonoAntig Anterior", "BonoAntig Actual", "Bono Front", "Otros Bonos",
            "Total Ganado", "AFP", "RC IVA", "Anti.", "Prest.", "Total Desc.", "Liquido Pagable", "Regional de Seguro", "Banco", "Cuenta"]];
        var planillasGet = planilla.detalles;
        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            columns.push((i + 1));
            columns.push(planillasGet[i].DetalleFicha.empleado.persona.nombre_completo);
            var fecha = $scope.fechaATexto(planillasGet[i].DetalleFicha.empleado.persona.fecha_nacimiento);
            columns.push(fecha);
            columns.push(planillasGet[i].DetalleFicha.empleado.persona.ci);
            columns.push(planillasGet[i].DetalleFicha.empleado.extension.nombre_corto);
            if (planillasGet[i].DetalleFicha.cargos[0].cargo.nombre != null) {
                columns.push(planillasGet[i].DetalleFicha.cargos[0].cargo.nombre.toUpperCase());
            } else {
                columns.push("");
            }
            columns.push(planillasGet[i].DetalleFicha.empleado.campo.nombre.toUpperCase());
            columns.push(planillasGet[i].DetalleFicha.ubicacion.nombre.toUpperCase());
            var fechaInicio = $scope.fechaATexto(planillasGet[i].DetalleFicha.fecha_inicio);
            columns.push(fechaInicio);
            var fechaRetiro = planillasGet[i].DetalleFicha.fecha_expiracion ? $scope.fechaATexto(planillasGet[i].DetalleFicha.fecha_expiracion):"";
            columns.push(fechaRetiro);
            if (planillasGet[i].DetalleFicha.matricula_seguro != null) {
                columns.push(planillasGet[i].DetalleFicha.matricula_seguro.toUpperCase());
            } else {
                columns.push("");
            }
            var sueldoAnterior = planillasGet[i].DetalleSueldo ? planillasGet[i].DetalleSueldo.importe_sueldo_basico: planillasGet[i].sueldo_basico_anterior;
            columns.push(sueldoAnterior);
            if (sueldoAnterior < $scope.parametros.salario_base_antiguedad) {
                columns.push($scope.parametros.salario_base_antiguedad);
            }else{
                columns.push(sueldoAnterior);
            }
            columns.push(planillasGet[i].importe_sueldo_basico);
            columns.push(planillasGet[i].dt);
            columns.push(planillasGet[i].ganado);
            columns.push(planillasGet[i].dias_rol_turnos);
            columns.push(planillasGet[i].horas_extras);
            columns.push(planillasGet[i].importe_horas_extras);
            columns.push(planillasGet[i].nt);
            columns.push(planillasGet[i].importe_recargo_nocturno);
            columns.push(planillasGet[i].DetalleSueldo ? planillasGet[i].DetalleSueldo.importe_bono_antiguedad: planillasGet[i].bono_antiguedad_anterior);
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
        var nombre_archivo = planilla.ver ? "PLANILLA DE RETROACTIVAS.xlsx" : "PLANILLA DE RETROACTIVAS PRE IMPRESION .xlsx"
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), nombre_archivo);
        blockUI.stop();

    }

    $scope.generarReporteExcelPlanillaRetroActivaOVT = (filtro) => {
        if (filtro.gestion) {
            SweetAlert.swal({
                title: 'Generando Reporte OVT de la gestion '+filtro.gestion,
                icon: 'info',
                iconHtml: '<i class="fa fa-search size-icon"></i>',
                html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            SweetAlert.showLoading()
            blockUI.noOpen = true;
            const promesa = ReporteExcelPlanillaRetroActivasOVT($scope.usuario.id_empresa, filtro.gestion)
            promesa.then((datosReporte) => {
            
                if (datosReporte.hasErr) return $scope.mostrarMensaje(datosReporte.mensaje);
                const ws_name = "SheetJS";
                const wb = new Workbook(), ws = sheet_from_array_of_arrays(datosReporte.empleados);
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                
                var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE PLANILLA RETROACTIVA OVT.xlsx");
                filesaver.onwriteend = function() { 
                    SweetAlert.swal({
                        title: 'Finalizado!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                }
            }).catch((err) => {
                const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
            })
        }else{
            SweetAlert.swal("", "Seleccione Una Gestion !", "warning");
        }
        
    }

    // ========== para sincronizar borrar las tablas de planilla retroactivas

    $scope.inicio();
    

}]);