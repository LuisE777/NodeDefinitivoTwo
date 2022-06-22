angular.module('agil.controladores')

.controller('ControladorPlanillaSubsidios', ['$scope','$localStorage','$location','$templateCache','$route','blockUI', 'RecursosHumanosEmpleados', 'ClasesTipo',
    'RecursosHumanosEmpleadosHorasExtras', 'RecursosHumanosPlanillaSueldos', 'RRHHlistaRRHHEmpleadosSubsidios', '$filter', '$timeout', 'RecursosHumanosPlanillaSubsidios', 'RRHHlistaPlanillaSubsidios', 'ListaPlanillaSubsidiosDetalle', 'PlanillaSubsidioActualizacion', function($scope,$localStorage,$location,$templateCache,$route,blockUI, RecursosHumanosEmpleados, ClasesTipo,
    RecursosHumanosEmpleadosHorasExtras, RecursosHumanosPlanillaSueldos, RRHHlistaRRHHEmpleadosSubsidios, $filter, $timeout, RecursosHumanosPlanillaSubsidios, RRHHlistaPlanillaSubsidios, ListaPlanillaSubsidiosDetalle, PlanillaSubsidioActualizacion){
    $scope.$on('$viewContentLoaded', function () {
        // resaltarPestaña($location.path().substring(1));
        $scope.idModalNuevaPlanillaSubsidios = 'dialog-nueva-planilla-subsidios';
        $scope.idModalEditarPlanillaSueldo = 'dialog-editar-planilla-sueldo';
        $scope.idEliminarPlanillaSubsidio = 'dialog-eliminar-planilla-subsidio';
        $scope.idModalVerPlanillaSueldo = 'dialog-ver-planilla-sueldos';
        $scope.idModalEditarSueldo = 'dialog-editar-sueldo';
        
        ejecutarScriptsPlanillaSubsidios($scope.idModalNuevaPlanillaSubsidios, $scope.idModalEditarPlanillaSueldo, $scope.idEliminarPlanillaSubsidio, $scope.idModalVerPlanillaSueldo, $scope.idModalEditarSueldo);
    });

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.eliminarPopup(
            $scope.idModalNuevaPlanillaSubsidios, 
            $scope.idModalEditarPlanillaSueldo, 
            $scope.idEliminarPlanillaSubsidio, 
            $scope.idModalVerPlanillaSueldo, 
            $scope.idModalEditarSueldo
        );  
    });

    $scope.usuario=JSON.parse($localStorage.usuario);

    // $scope.fechaATexto = function (fecha) {
    //     fech = new Date(fecha)
    //     fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
    //     return fecha
    // }

    

    $scope.obtenerGestiones=function(){
        blockUI.start();
        var promesa=ClasesTipo("GTN");
        promesa.then(function(entidad){
            $scope.gestiones=entidad.clases;
            blockUI.stop();
        });
    }

    $scope.obtenerGestiones();

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
        $scope.planilla=new RecursosHumanosPlanillaSubsidios({id_empresa:$scope.usuario.id_empresa});
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };

    }


    $scope.parseDate=function (input) {
        var parts = input.split('/');
        return new Date(parts[2], parts[1]-1, parts[0]); 
    }

    $scope.abrirDialogNuevaPlanillaSubsidios= function () {
        $scope.nuevaPlanillaSueldos();
        $scope.abrirPopup($scope.idModalNuevaPlanillaSubsidios);
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
                var fin = new Date($scope.convertirFecha(filtro.fin)).getFullYear();
                while (inicio <= fin) {
                    anio.push(inicio)
                    inicio++
                }
            }
        } else {
            anio.push(new Date().getFullYear())
        }

        $scope.diasAnio = $scope.CalendarioRolTurnos(anio, filtro)
        $scope.diasAnioPieTrabajos = $scope.CalendarioRolTurnos(anio, filtro)
        $scope.diasAnioPieAusencias = $scope.CalendarioRolTurnos(anio, filtro)
        $scope.diasAnioPieVacaciones = $scope.CalendarioRolTurnos(anio, filtro)
        empleadosRolTurno.forEach(function (rol, index, array) {
            var anio = []
            if (filtro) {
                if (filtro.inicio) {
                    var inicio = new Date($scope.convertirFecha(filtro.inicio)).getFullYear();
                    var fin = new Date($scope.convertirFecha(filtro.fin)).getFullYear();
                    while (inicio <= fin) {
                        anio.push(inicio)
                        inicio++
                    }
                }
            } else {
                anio.push(new Date().getFullYear())
            }
            rol.diasAnio = $scope.CalendarioRolTurnos(anio, filtro, rol)
            var rolturno = rol
            var fechaFin = ""
            if (rolturno.fecha_fin) {
                fechaFin = $scope.fechaATexto(rolturno.fecha_fin)
            }
            var bandera = false
            var a = 1
            for (var i = 0; i < rol.diasAnio.length; i++) {
                var element = rol.diasAnio[i];

                if (element.fecha == $scope.fechaATexto(rolturno.fecha_inicio)) {
                    bandera = true
                } else if (new Date($scope.convertirFecha(element.fecha)).getFullYear() > new Date(rolturno.fecha_inicio).getFullYear()) {
                    if (new Date($scope.convertirFecha(element.fecha)).getDate() >= new Date(rolturno.fecha_inicio).getDate())
                        bandera = true
                }
                if (bandera) {
                    if (a <= rolturno.dias_trabajado) {
                        if (rolturno.fecha_fin) {
                            if (fechaFin == element.fecha) {
                                i = rol.diasAnio.length
                                if (rolturno.turno_dia) {
                                    element.texto = "T"
                                }else{
                                    element.texto = "NT"
                                }
                            } else {
                                var anio = fechaFin.split("/")[2]
                                var anioInicio = element.fecha.split("/")[2]
                                var mes = fechaFin.split("/")[1]
                                var mesInicio = element.fecha.split("/")[1]
                                var dia = fechaFin.split("/")[0]
                                var diaInicio = element.fecha.split("/")[0]
                                if (anio >= anioInicio) {
                                    if (rolturno.turno_dia) {
                                        element.texto = "T"
                                    }else{
                                        element.texto = "NT"
                                    }
                                }
                            }
                            a++
                        } else {
                            if (rolturno.turno_dia) {
                                element.texto = "T"
                            }else{
                                element.texto = "NT"
                            }
                            a++
                        }
                    } else if (a <= (rolturno.dias_trabajado + rolturno.dias_descanso)) {
                        if (rolturno.fecha_fin) {
                            if (fechaFin == element.fecha) {
                                i = rol.diasAnio.length
                                element.texto = "D"
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
                            a++
                        }
                    }
                }

                if (rol.ficha.ausencias.length>0) {
                    for (var j = 0; j < rol.ficha.ausencias.length; j++) {
                        var element1 = rol.ficha.ausencias[j];
                        var startDate = new Date(element1.fecha_inicio);
                        var endDate = new Date(element1.fecha_fin);
                        var fechasausencias = getDates(startDate, endDate);

                        if (fechasausencias.length>0) {
                            for (var k = 0; k < fechasausencias.length; k++) {
                                var element2 = fechasausencias[k];
                                if (element2 == $scope.formatofecha(element.fecha)) {
                                    if (element.texto == "D") {
                                        if (element1.horas) {
                                            element.texto += "OA"
                                        } else {
                                            element.texto += "BD"
                                        }
                                    } else if (element.texto == "T") {
                                        if (element1.horas) {
                                            element.texto += "OA"
                                        } else {
                                            element.texto += "BM"
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }

                if (rol.ficha.vacaciones.length>0) {
                    for (var j = 0; j < rol.ficha.vacaciones.length; j++) {
                        var element1 = rol.ficha.vacaciones[j];
                    
                      
                        var startDate = new Date(element1.fecha_inicio);
                        var endDate = new Date(element1.fecha_fin);
                        // console.log($scope.formatofecha());
                        var fechasvacacion = getDates(startDate, endDate);
                        
                        if (fechasvacacion.length>0) {
                            for (var k = 0; k < fechasvacacion.length; k++) {
                                var element2 = fechasvacacion[k];
                               
                                if (element2 == $scope.formatofecha(element.fecha)) {
                                    if (element.texto == "D") {
                                        element.texto += "V"    
                                    } else {
                                        element.texto += "V"
                                    }
                                }
                            }
                        }

                    }
                }
              
                
                for (var x = 0; x < $scope.diasAnioPieTrabajos.length; x++) {
                    var diaPie = $scope.diasAnioPieTrabajos[x];
                    if (diaPie.fecha == element.fecha) {
                        if (element.texto == "T" || element.texto == "NT") {
                            var val = (diaPie.texto == "") ? 0 : parseInt(diaPie.texto)
                            diaPie.texto = val + 1
                        }
                    }
                }
            }
        })
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
    $scope.fechaString=function(fechaget){
        var dd = fechaget.getDate();
        var mm = fechaget.getMonth()+1; 
        var yyyy = fechaget.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        
        var today = dd+'/'+mm+'/'+yyyy;
        return today
    }

    $scope.diferenciaEntreDiasEnDias = function (a, b) {
        var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
    }

    $scope.filtrarSubsidios=function(planilla){
        blockUI.start();
        // console.log('cabezera', planilla);
        // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]
        RRHHlistaPlanillaSubsidios($scope.usuario.id_empresa, planilla.gestion, planilla.mes).then(function (planillaget) {
            if (planillaget.planillas.length > 0) {
                $scope.mostrarMensaje('La Planilla del periodo ' + planilla.mes.split("-")[1]+" "+ planilla.gestion + " ya esta registrado");
                $scope.nuevaPlanillaSueldos();
                blockUI.stop();
            }else{
           
                var promesa = RRHHlistaRRHHEmpleadosSubsidios($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                promesa.then(function (dato) {
                    console.log('empleadossssstt ', dato);
                    planilla.RecursosHumanosEmpleados = dato.empleados;
                    var sumatotal = 0;
                    var totalAsignanciones = 0;
                    var totalEmpleados = 0;
                    var totalCantidad = 0;
                    var totalMonto = 0;
                    planilla.RecursosHumanosEmpleados.map(function (empleado) {
                        empleado.nombre_completo = empleado.empleado.persona.nombre_completo;
                        empleado.nombreVeneficiaria = empleado.veneficiaria?empleado.veneficiaria.persona.apellido_paterno + " " + empleado.veneficiaria.persona.apellido_materno + " " + empleado.veneficiaria.persona.nombres: "";
                        empleado.total = empleado.cantidad * empleado.tipoSubsidio.monto; 
                        sumatotal += empleado.total;
                        totalAsignanciones += empleado.nro_asignacion;
                        totalEmpleados += 1;
                        totalCantidad += empleado.cantidad;
                        totalMonto += empleado.tipoSubsidio.monto;
                    });
                    planilla.sumaTotal = sumatotal;
                    planilla.totalAsignanciones = totalAsignanciones;
                    planilla.totalEmpleados = totalEmpleados;
                    planilla.totalCantidad = totalCantidad;
                    planilla.totalMonto = totalMonto;
                    $scope.ordenarPlanilla(false);
                    blockUI.stop(); 
                });
            }
    
        });
    }

    $scope.filtrarSueldos22=function(planilla){
        blockUI.start();
        var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa);
        promesa.then(function (dato) {
            blockUI.stop();
            planilla.RecursosHumanosEmpleados = dato.empleados;
        });
        
    }

    $scope.generar=function(planilla){
        $scope.buscarPlanilla = "";
        $scope.ordenPlanillas = true;
        blockUI.start();
        planilla.$save(function(dato){
            $scope.nuevaPlanillaSueldos();
            blockUI.stop();
            $scope.mostrarMensaje('Planilla registrada exitosamente!');
        },function(error) { 
            blockUI.stop();
            console.log('fallo ', error);
        });
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
      var birthday = +new Date(dateString);
      return ~~((new Date(fechaFin) - birthday) / (31557600000));
    }

    // para redondeo de numeros
    function round(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    $scope.cerrarDialogNuevaPlanillaSueldos=function () {
        $scope.buscarPlanilla = "";
        $scope.cerrarPopup($scope.idModalNuevaPlanillaSubsidios); 
    }

    $scope.abrirDialogEditarPlanillaSueldo= function (empleado) {
        $scope.empleado = empleado;
        $scope.sueldo = angular.copy(empleado);
        $scope.abrirPopup($scope.idModalEditarPlanillaSueldo);
    }

    $scope.modificarSueldo= function (sueldo) {
       $scope.empleado = angular.extend($scope.empleado, sueldo);
       $scope.cerrarDialogEditarPlanillaSueldo();
    }

    $scope.cerrarDialogEditarPlanillaSueldo=function () {
        $scope.cerrarPopup($scope.idModalEditarPlanillaSueldo);
    }

    $scope.cerrarDialogEliminarPlanillaSubsidio = function () {
        $scope.cerrarPopup($scope.idEliminarPlanillaSubsidio);
    }

    $scope.abrirDialogEliminarPlanillaSubsidio = function (planilla) {
        $scope.GetplanillaSubsidio = planilla;
        $scope.abrirPopup($scope.idEliminarPlanillaSubsidio);
    }

    // ========= solucionar eliminar sueldo no sta eliminando correctamente ==================
    $scope.eliminarPlanillaSubsidio = function () {
        
        $scope.cerrarDialogEliminarPlanillaSubsidio();
        var planillaAEliminar = new PlanillaSubsidioActualizacion({id_planilla: $scope.GetplanillaSubsidio.id});
        planillaAEliminar.$delete(function (res) {
            $scope.mostrarMensaje(res.mensaje);
            $scope.filtrarListaPlanillaSubsidios($scope.pl);
        }, function (res) {
            $scope.mostrarMensaje("Ocurrio un problema al eliminar!");
        });
    }

    $scope.pl= {};
    $scope.filtrarListaPlanillaSubsidios=function(planilla){
        // console.log('cabezera generalllllll ', planilla);
        // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]

        var promesa = RRHHlistaPlanillaSubsidios($scope.usuario.id_empresa, planilla.gestion, planilla.mes);
        promesa.then(function (dato) {
            $scope.pl.planillas = dato.planillas;
            // $scope.sumaTotalPlanillas($scope.pl.planillas);
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
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    
    $scope.puedeEditarPlanilla = false;
    $scope.verPlanilla = function (planilla){
        $scope.puedeEditarPlanilla = false;
        $scope.abrirPopup($scope.idModalVerPlanillaSueldo);
        $scope.dynamicPopoverEmpleadoVer = {
            templateUrl: 'myPopoverEmpleadoVerTemplate.html',
        };
        var promesa = ListaPlanillaSubsidiosDetalle(planilla.id);
        promesa.then(function (dato) {
            $scope.planillaC = planilla;
            $scope.planillaC.detalles = dato.planillas;
            // blockUI.stop();
        });
    }
    
    $scope.capitalizar = function (texto){ 
        texto= texto.toLowerCase();
        texto = texto.split(" ");
        for (var i = 0, x = texto.length; i < x; i++) {
            texto[i] = texto[i][0].toUpperCase() + texto[i].substr(1);
        }

        return texto.join(" ");
    }
    


    // IMPRIMIR BOLETAS DE PAGO INDIVIDUALES
    $scope.imprimirBoletaIndividual = function (datos, trabajador){
        var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
        var cadena = datos.mes.split("-");
        var mes = cadena[1];
        var gestion = datos.anio;
        var doc = new PDFDocument({size:'letter',  margin: 10});
        var stream = doc.pipe(blobStream());
        var empleado = trabajador.DetalleFicha.empleado.persona;
        var x = 20, y = 30;
        doc.font('Helvetica-Bold',9);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(empleado.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(empleado.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(trabajador.DetalleFicha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(trabajador.DetalleFicha.empleado.campo.nombre, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text( $scope.fechaATexto( trabajador.DetalleFicha.fecha_inicio) , x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajador.importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajador.dt , x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajador.ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajador.horas_extras , x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajador.importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajador.importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajador.importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajador.importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajador.importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajador.total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajador.afp ,x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajador.rc_iva ,x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajador.importe_anticipos ,x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajador.importe_prestamos ,x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajador.importe_total_descuento ,x+85, y);        y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,x+100,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajador.liquido_pagable ,x+85, y);   y=y+12;
                doc.font('Helvetica', 6);
            // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text( $scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});        
                x = 346;
                y = 30;
                //COPIA EMPLEADO
                doc.font('Helvetica-Bold',9);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(empleado.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(empleado.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(trabajador.DetalleFicha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(trabajador.DetalleFicha.empleado.campo.nombre, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text($scope.fechaATexto( trabajador.DetalleFicha.fecha_inicio), x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajador.importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajador.dt, x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajador.ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajador.horas_extras, x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajador.importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajador.importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajador.importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajador.importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajador.importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajador.total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajador.afp, x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajador.rc_iva, x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajador.importe_anticipos, x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajador.importe_prestamos, x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajador.importe_total_descuento, x+85, y);     y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,130,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajador.liquido_pagable, x+85, y);   y=y+12;
                // doc.rect(x,y,x+85,12).stroke();  
                doc.font('Helvetica', 6);
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text( $scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});
                doc.end();
                //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                }); 
       }
    // IMPRIMIR BOLETAS POR CAMPAMENTO
   $scope.imprimirBoletasCampo = function (datos, planilla, idCampo){
    blockUI.start('Generando Boletas');
    var dptoEmpresa = $scope.usuario.empresa.departamento.nombre;
    var trabajadores = planilla.planillas.filter(function(trab){
           return trab.DetalleFicha.empleado.campo.id == idCampo;
        });
    var cadena = datos.mes.split("-");
    var mes = cadena[1];
    var gestion = datos.anio;
    var doc = new PDFDocument({size:'letter',  margin: 10});
    var stream = doc.pipe(blobStream());
    var x = 30, y = 30, items=0; itemsPage= 0;
    for (var i = 0; i <trabajadores.length; i++) {
            //COPIEA EMPRESA
            var trabajador= trabajadores[i].DetalleFicha.empleado.persona;
            var ficha= trabajadores[i].DetalleFicha;
            var nombreCampo =ficha.empleado.campo.nombre;
            if (itemsPage == 0) {
                doc.font('Helvetica-Bold',7);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(trabajador.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(trabajador.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(ficha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(nombreCampo, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text( $scope.fechaATexto( ficha.fecha_inicio) , x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajadores[i].importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajadores[i].dt , x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajadores[i].ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].horas_extras , x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajadores[i].importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajadores[i].importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajadores[i].total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajadores[i].afp ,x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajadores[i].rc_iva ,x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajadores[i].importe_anticipos ,x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajadores[i].importe_prestamos ,x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajadores[i].importe_total_descuento ,x+85, y);        y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,x+100,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajadores[i].liquido_pagable ,x+85, y);   y=y+12;
                doc.font('Helvetica', 6);
            // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  y=y+12; 
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text($scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});        
                x = 346;
                y = 30;
                //COPIA EMPLEADO
                doc.font('Helvetica-Bold',7);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(trabajador.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(trabajador.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(ficha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(nombreCampo, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text($scope.fechaATexto( ficha.fecha_inicio), x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajadores[i].importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajadores[i].dt, x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajadores[i].ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].horas_extras, x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajadores[i].importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajadores[i].importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajadores[i].total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajadores[i].afp, x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajadores[i].rc_iva, x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajadores[i].importe_anticipos, x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajadores[i].importe_prestamos, x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajadores[i].importe_total_descuento, x+85, y);     y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,130,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajadores[i].liquido_pagable, x+85, y); 
                // doc.rect(x,y,x+85,12).stroke();  
                doc.font('Helvetica', 6);
                //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4);  
                y=y+12; 
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text($scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});        
                x=30;
                y=426; 
            }
            if (itemsPage == 1) {
                doc.font('Helvetica-Bold',7);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(trabajador.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(trabajador.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(ficha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(nombreCampo, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text($scope.fechaATexto( ficha.fecha_inicio), x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajadores[i].importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajadores[i].dt, x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajadores[i].ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].horas_extras, x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin Datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajadores[i].importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajadores[i].importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajadores[i].total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajadores[i].afp, x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajadores[i].rc_iva, x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajadores[i].importe_anticipos, x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajadores[i].importe_prestamos, x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajadores[i].importe_total_descuento, x+85, y);        y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,x+100,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajadores[i].liquido_pagable, x+85, y); 
                doc.font('Helvetica', 6);
                //doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4); 
                y=y+12; 
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text($scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});        
                x = 346;
                y= 426;
                //COPIA EMPLEADO
                doc.font('Helvetica-Bold',7);
                doc.text('BOLETA DEL MES DE '+ mes + ' DE ' + gestion, x, y, {width: 210, align: 'center'});                   y=y+12;
                doc.font('Helvetica-Bold', 6);   
                doc.text('Nombre:',x,y,{width:80}); doc.text(trabajador.nombre_completo, x+85, y);  y=y+12;
                doc.text('CI:',x,y,{width:80}); doc.text(trabajador.ci, x+85, y);                 y=y+12;
                doc.text('Matrícula:',x,y,{width:80}); doc.text(ficha.matricula_seguro, x+85, y);     y=y+12;
                doc.text('Campamento:',x,y,{width:80}); doc.text(nombreCampo, x+85, y);           y=y+12;
                doc.text('Fecha Ingreso:',x,y,{width:80}); doc.text($scope.fechaATexto( ficha.fecha_inicio), x+85, y);     y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('GANADO', x, y);                                                       y=y+12;
                doc.font('Helvetica', 6);
                doc.text('Sueldo Básico:',x,y,{width:80}); doc.text(trabajadores[i].importe_sueldo_basico, x+85, y);        y=y+12;
                doc.text('Días Trabajados:',x,y,{width:80}); doc.text(trabajadores[i].dt, x+85, y);           y=y+12;
                doc.text('Sueldo Ganado:',x,y,{width:80}); doc.text(trabajadores[i].ganado , x+85, y);        y=y+12;
                doc.text('Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].horas_extras, x+85, y);               y=y+12;
                doc.text('Total Horas Extras:',x,y,{width:80}); doc.text(trabajadores[i].importe_horas_extras, x+85, y);           y=y+12;
                doc.text('Noches Trabajadas:',x,y,{width:80}); doc.text('Sin datos1', x+85, y);          y=y+12;
                doc.text('Recargo Nocturno:',x,y,{width:80}); doc.text(trabajadores[i].importe_recargo_nocturno, x+85, y);           y=y+12;
                doc.text('Bono Antiguedad:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_antiguedad, x+85, y);         y=y+12;
                doc.text('Bono Frontera:',x,y,{width:80}); doc.text(trabajadores[i].importe_bono_frontera, x+85, y);              y=y+12;
                doc.text('Otros Bonos:',x,y,{width:80}); doc.text(trabajadores[i].importe_otros_bonos, x+85, y);                y=y+12;
                doc.font('Helvetica-Bold',6);
                doc.text('TOTAL:',x,y,{width:80, align:'right'}); doc.text(trabajadores[i].total_ganado, x+85, y);            y=y+14;

                doc.font('Helvetica-Bold',7);
                doc.text('DESCUENTOS', x, y);                                                   y=y+12;
                doc.font('Helvetica', 6);
                doc.text('AFP:',x,y,{width:80}); doc.text(trabajadores[i].afp, x+85, y);                   y=y+12;
                doc.text('RC-IVA:',x,y,{width:80}); doc.text(trabajadores[i].rc_iva, x+85, y);                  y=y+12;
                doc.text('Anticipos:',x,y,{width:80}); doc.text(trabajadores[i].importe_anticipos, x+85, y);                  y=y+12;
                doc.text('Préstamos:',x,y,{width:80}); doc.text(trabajadores[i].importe_prestamos, x+85, y);                  y=y+12;
                doc.font('Helvetica-Bold', 6);
                doc.text('TOTAL:',x,y,{width:80, align: 'right'}); doc.text(trabajadores[i].importe_total_descuento, x+85, y);     y=y+14;
                doc.font('Helvetica-Bold',7);
                doc.rect(x-3,y-3,130,12).stroke();  
                doc.text('LIQUIDO PAGABLE', x+4, y,{width:80});  doc.text(trabajadores[i].liquido_pagable, x+85, y); 
                doc.font('Helvetica', 6);
            // doc.text('Saldo RC-IVA', x+4, y+4,{width:80});  doc.text('12,824.78', x+85, y+4); 
                y=y+12; 
                doc.text('-----------------------------------------------', x+ 125, y-12,{width:110, align: 'center'});  doc.text('FIRMA', x+125, y-6,{width:110, align: 'center'});
                doc.text($scope.capitalizar(dptoEmpresa) +' - '+ $scope.aFechaLarga(datos.updatedAt), x, y+3,{width:200, align: 'center'});        
            y=755;
            }
            itemsPage++;
            if (itemsPage == 2) {
                items = items + itemsPage;
                if (items <trabajadores.length) {
                    doc.addPage({ size:'letter',  margin: 10 });
                    x = 30; y = 30;  itemsPage= 0;
                }
            }
            if(i == trabajadores.length-1){
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                $timeout(function(){
                    blockUI.stop();

                }, trabajadores.length * 75)
            }         
        }	

   }
    //FIN IMPRIMIR BOLETAS DE PAGO
    $scope.abrirDialogEdicionSueldo= function (empleado) {
        $scope.empleado = empleado;
        $scope.sueldo = angular.copy(empleado);
        $scope.abrirPopup($scope.idModalEditarSueldo);
    }

    $scope.cerrarModalEditarSueldo = function () {
        $scope.cerrarPopup($scope.idModalEditarSueldo)
    }

    $scope.calcularTotalEditadoSueldo=function(){
        $scope.sueldo.ganado = round($scope.sueldo.importe_sueldo_basico/30*$scope.sueldo.dt, 2);
        $scope.sueldo.horas_extras = $scope.sueldo.horas_extras_r + $scope.sueldo.dias_rol_turnos * $scope.sueldo.horas_extras_rol;
        $scope.sueldo.importe_horas_extras = round(($scope.sueldo.ganado/30/8*$scope.sueldo.horas_extras)*2, 2);
        $scope.sueldo.importe_recargo_nocturno= Math.round(($scope.sueldo.ganado/30/8*$scope.sueldo.horas_extras)*1.5);
        $scope.sueldo.total_ganado = round($scope.sueldo.ganado+$scope.sueldo.importe_horas_extras+$scope.sueldo.importe_recargo_nocturno+$scope.sueldo.importe_bono_antiguedad+$scope.sueldo.importe_bono_frontera+$scope.sueldo.importe_otros_bonos, 2);
        $scope.sueldo.afp = round($scope.sueldo.total_ganado * 12.71/100, 2);
        $scope.sueldo.importe_total_descuento = round($scope.sueldo.afp+$scope.sueldo.rc_iva+$scope.sueldo.importe_anticipos+$scope.sueldo.importe_prestamos, 2);
        $scope.sueldo.liquido_pagable = round($scope.sueldo.total_ganado - $scope.sueldo.importe_total_descuento, 2);    
    }

    $scope.modificarSueldoEditado= function (sueldo) {
        $scope.empleado = angular.extend($scope.empleado, sueldo);
        $scope.cerrarModalEditarSueldo();
    }


    $scope.actualizarPlanilla = function (planillaedit) {
        // blockUI.start();
        // $scope.parametros = parametro;
        $scope.buscarPlanilla = "";
        RecursosHumanosPlanillaSueldos.update({ id_empresa: $scope.usuario.id_empresa }, planillaedit, function (res) {
            // console.log('el mensaje es----', res.mensaje);
            $scope.mostrarMensaje(res.mensaje);
        }, function (error) {
            $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
        })
    
        // blockUI.stop();
        $scope.cerrarVerPlanillaSueldos();
    }

    $scope.cerrarVerPlanillaSueldos=function () {
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

    $scope.editarPlanillaSueldo = function (planilla){
        $scope.puedeEditarPlanilla = true;
        $scope.abrirPopup($scope.idModalVerPlanillaSueldo);
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
        var promesa = ListaPlanillaSubsidiosDetalle(planilla.id);
        promesa.then(function (dato) {
            $scope.planillaC = planilla;
            $scope.planillaC.detalles = dato.planillas;
            $scope.ordenarPlanillaEditar(false);
            // blockUI.stop();
        });
    }

    $scope.excelPlanillaSubsidio = function (planilla, verPlanilla) {
        var data = [["N°","Empleado","C.I.","Cargo","Campamento",
        "Beneficiaria","Tipo Subsidio","Fecha Inicio","Nro. Asignacion","Cantidad","Monto","Total"]];
        var planillasGet = {};
        if (verPlanilla) {
            planillasGet = planilla.detalles;
        }else{
            planillasGet = planilla.RecursosHumanosEmpleados;
        }

        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            columns.push((i + 1));
            if (verPlanilla) {
                var nombreVeneficiaria = planillasGet[i].planificacionSubsidio.veneficiaria?planillasGet[i].planificacionSubsidio.veneficiaria.persona.apellido_paterno + " " + planillasGet[i].planificacionSubsidio.veneficiaria.persona.apellido_materno + " " + planillasGet[i].planificacionSubsidio.veneficiaria.persona.nombres: "";
                columns.push(planillasGet[i].planificacionSubsidio.empleado.persona.nombre_completo);
                columns.push(planillasGet[i].planificacionSubsidio.empleado.persona.ci);
                if (planillasGet[i].planificacionSubsidio.empleado.cargo != null) {
                    columns.push(planillasGet[i].planificacionSubsidio.empleado.cargo.toUpperCase());                    
                }else{
                    columns.push("");                                        
                }
                columns.push(planillasGet[i].planificacionSubsidio.empleado.campo.nombre.toUpperCase());
                columns.push(nombreVeneficiaria);
                columns.push(planillasGet[i].planificacionSubsidio.tipoSubsidio.tipo_subsidio);
                var fechaInicio = $scope.fechaATexto(planillasGet[i].planificacionSubsidio.fecha_reporte);
                columns.push(fechaInicio);
                columns.push(planillasGet[i].planificacionSubsidio.nro_asignacion);
                columns.push(planillasGet[i].planificacionSubsidio.cantidad);
                columns.push(planillasGet[i].monto);
                columns.push(planillasGet[i].total);
            }else{
                columns.push(planillasGet[i].nombre_completo);
                columns.push(planillasGet[i].empleado.persona.ci);
                if (planillasGet[i].empleado.cargo != null) {
                    columns.push(planillasGet[i].empleado.cargo);                    
                }else{
                    columns.push("");                                        
                }
                columns.push(planillasGet[i].empleado.campo.nombre.toUpperCase());
                columns.push(planillasGet[i].nombreVeneficiaria);
                columns.push(planillasGet[i].tipoSubsidio.tipo_subsidio);
                var fechaInicio = $scope.fechaATexto(planillasGet[i].fecha_reporte);
                columns.push(fechaInicio);
                columns.push(planillasGet[i].nro_asignacion);
                columns.push(planillasGet[i].cantidad);
                columns.push(planillasGet[i].tipoSubsidio.monto);
                columns.push(planillasGet[i].total);
            }

            data.push(columns);
        }

        var ws_name = "SheetJS";
        var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA DE SUBSIDIOS PRE IMPRESION .xlsx");
        blockUI.stop();
        
    }

     $scope.imprimirPlanillaSubsidio = function(filtro, verPlanilla){

        // $scope.mostrarMensaje("Espere mientras se carga el reporte !");
        
        var cadena = filtro.mes.split("-");
        var mes = cadena[1];
        var año = "";
        var cabeceraFecha = [];

        //var promesa = RecursosHumanosEmpleados($scope.usuario.id_empresa);
        //promesa.then(function (dato) {
            var planilla = {};
            if (verPlanilla) {
                año = filtro.anio;
                cabeceraFecha = [mes,año];
                planilla = $scope.planillaC.detalles;
            }else{
                año = filtro.gestion;
                cabeceraFecha = [mes,año];
                planilla = $scope.planilla.RecursosHumanosEmpleados;
            }
            
            //[612, 912]
            var doc = new PDFDocument({compress: false, size:'legal', layout:'landscape', margin: 0});
            var stream = doc.pipe(blobStream());

            var y = 80, totalAray = 0, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(planilla.length / itemsPorPagina);
            $scope.dibujarCabeceraPlanillaSubsidio(doc, planilla, pagina, totalPaginas,cabeceraFecha);
            var index = 0;
            var importeCantidad=0, importeTotalMonto=0, importeTotal=0;
            for (var i = 0; i < planilla.length; i++) {
                index = index + 1;
                doc.font('Helvetica',6);
                doc.text(index,60,y);

                if (verPlanilla) {
                    var nombreVeneficiaria = planilla[i].planificacionSubsidio.veneficiaria?planilla[i].planificacionSubsidio.veneficiaria.persona.apellido_paterno + " " + planilla[i].planificacionSubsidio.veneficiaria.persona.apellido_materno + " " + planilla[i].planificacionSubsidio.veneficiaria.persona.nombres: "";
                    doc.text(planilla[i].planificacionSubsidio.empleado.persona.nombre_completo,80,y,{width:120});
                    doc.text(planilla[i].planificacionSubsidio.empleado.persona.ci,200,y);
                    doc.text(planilla[i].planificacionSubsidio.empleado.cargo.toUpperCase(),240,y,{width:120});
                    doc.text(planilla[i].planificacionSubsidio.empleado.campo.nombre.toUpperCase(),360,y,{width:100});                    
                    doc.text(nombreVeneficiaria.toUpperCase(),430,y);
                    doc.text(planilla[i].planificacionSubsidio.tipoSubsidio.tipo_subsidio,545,y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].planificacionSubsidio.fecha_reporte);
                    doc.text(fechaInicio,640,y);
                    doc.text(planilla[i].planificacionSubsidio.nro_asignacion,700,y);
                    doc.text(planilla[i].planificacionSubsidio.cantidad,790,y);
                    doc.text(planilla[i].monto,860,y);
                    doc.text(planilla[i].total,910,y);
                    importeCantidad+=planilla[i].planificacionSubsidio.cantidad;
                    importeTotalMonto+=planilla[i].monto;
                    importeTotal+=planilla[i].total;

                }else{
                    doc.text(planilla[i].nombre_completo,80,y,{width:120});
                    doc.text(planilla[i].empleado.persona.ci,200,y);
                    doc.text(planilla[i].empleado.cargo.toUpperCase(),240,y,{width:120});
                    doc.text(planilla[i].empleado.campo.nombre.toUpperCase(),360,y,{width:100});                    
                    doc.text(planilla[i].nombreVeneficiaria.toUpperCase(),430,y);
                    doc.text(planilla[i].tipoSubsidio.tipo_subsidio,545,y);
                    var fechaInicio = $scope.fechaATexto(planilla[i].fecha_reporte);
                    doc.text(fechaInicio,640,y);
                    doc.text(planilla[i].nro_asignacion,700,y);
                    doc.text(planilla[i].cantidad,790,y);
                    doc.text(planilla[i].tipoSubsidio.monto,860,y);
                    doc.text(planilla[i].total,910,y);
                    importeCantidad+=planilla[i].cantidad;
                    importeTotalMonto+=planilla[i].tipoSubsidio.monto;
                    importeTotal+=planilla[i].total;
                }


                if (items === 23) {
                    doc.font('Helvetica-Bold',6);			
                    doc.text("TOTALES",450, y+20); 
                    doc.text(round(importeCantidad,2),510,y+20);
                    doc.text(round(importeTotalMonto,2),565,y+20);
                    doc.text(round(importeTotal,2),605,y+20);
                    
                }
        
                y = y + 20;
                var cont = y;
                items++;

                if (items == itemsPorPagina) {
                    totalAray = totalAray + items;
                    if (totalAray != planilla.length) {                     
                        doc.addPage({ size:'legal', layout:'landscape', margin: 10 });
                        y = 80;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPlanillaSubsidio(doc, planilla, pagina, totalPaginas, cabeceraFecha);
                    }
                }          
            }	

            doc.font('Helvetica-Bold',6);	
            doc.text("TOTALES",700,cont);
            if (verPlanilla) {
                doc.text(round($scope.planillaC.total_cantidad,2),790,cont);
                doc.text(round($scope.planillaC.total_monto,2),860,cont);
                doc.text(round($scope.planillaC.total,2),910,cont);
            }else{
                doc.text(round($scope.planilla.totalCantidad,2),790,cont);
                doc.text(round($scope.planilla.totalMonto,2),860,cont);
                doc.text(round($scope.planilla.sumaTotal,2),910,cont);
            }
            doc.end();
            stream.on('finish', function () {
                var fileURL = stream.toBlobURL('application/pdf');
                window.open(fileURL, '_blank', 'location=no');
            });
    }

    $scope.dibujarCabeceraPlanillaSubsidio = function(doc, planilla, pagina, totalPaginas,fecha){
        var empresa = $scope.usuario.empresa;
        doc.font('Helvetica-Bold',10);
        doc.text("NOMBRE O RAZON SOCIAL:", 60,10);
        doc.text(empresa.razon_social.toUpperCase(),210,10);
        doc.text("NIT:", 60,30);
        doc.text(empresa.nit.toUpperCase(),210,30);

        doc.font('Helvetica-Bold', 12);
        doc.text("PLANILLA DE SUBSIDIOS",0,20,{align:'center'});
        doc.text("(En Bolivia)",0,40,{align:'center'});

        doc.font('Helvetica-Bold', 10);
        doc.text("CORRESPONDIENTE AL MES:",690,30);
        doc.font('Helvetica-Bold', 10);
        doc.text(fecha[0].toUpperCase(),843,30);
        doc.text("DE",910,30);
        doc.text(fecha[1].toUpperCase(),935,30);
        doc.font('Helvetica-Bold', 8);
        doc.text("N°",60,60);
        doc.text("Empleado",80,60);
        doc.text("C.I.",200,60);
        doc.text("Cargo",245,60);
        doc.text("Campamento",360,60);
        doc.text("Beneficiaria",430,60);
        doc.text("Tipo Subsidio",545,60);
        doc.text("Fecha Inicio",640,60);
        doc.text("Nro. Asignacion",700,60);
        doc.text("Cantidad",790,60);
        doc.text("Monto",860,60);
        doc.text("Total", 910,60);
    }
}]);