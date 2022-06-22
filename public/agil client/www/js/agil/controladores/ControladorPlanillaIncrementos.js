angular.module('agil.controladores')

.controller('ControladorPlanillaIncrementos', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','ClasesTipo','SweetAlert',
'GenerarPlanillaIncrementos', 'RRHHPlanillaIncrementos', 'RRHHlistaPlanillaIncrementos', 'ListaPlanillaIncrementoDetalle', 'ActualizarSueldosEmpleados',
function($scope,$localStorage,$location,$templateCache,$route,blockUI,$timeout,ClasesTipo, SweetAlert, GenerarPlanillaIncrementos, RRHHPlanillaIncrementos, 
    RRHHlistaPlanillaIncrementos, ListaPlanillaIncrementoDetalle, ActualizarSueldosEmpleados){
    blockUI.start();
    $scope.usuario=JSON.parse($localStorage.usuario);

    $scope.idDialogNuevaPlanilla = "dialog-nueva-planilla-incrementos";
    $scope.idModalVerPlanillaIncremento = 'dialog-ver-planilla-incremento';
    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsPlanillaIncrementos($scope.idDialogNuevaPlanilla, $scope.idModalVerPlanillaIncremento);
        blockUI.stop();
    });
	
	

    $scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.idDialogNuevaPlanilla);
        $scope.eliminarPopup($scope.idModalVerPlanillaIncremento);
	});

	$scope.inicio = function () {
        $scope.obtenerGestiones();
        
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

        $scope.planilla = new RRHHPlanillaIncrementos({ id_empresa: $scope.usuario.id_empresa });
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
        $scope.abrirPopup($scope.idDialogNuevaPlanilla);
    }

    $scope.cerrarPlanillaNuevo = function () {
        $scope.cerrarPopup($scope.idDialogNuevaPlanilla);
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
        var promesa = GenerarPlanillaIncrementos(planilla.gestion, $scope.usuario.id_empresa);
        promesa.then(function (datos) {
            // planilla.RecursosHumanosEmpleados = datos.empleados;
            // console.log("datos para planillas ", datos)
            if (!datos.error) {
                procesarCalculos(datos.empleados, planilla);
            } else {
                SweetAlert.swal("", dato.mensaje, "warning");
            }
        });
    }

    async function procesarCalculos(array, planilla) {
        SweetAlert.update({ title: "Realizando Cálculos....." })
        planilla.RecursosHumanosEmpleados = [];
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
        // console.log(empleado);
        SweetAlert.getContent().querySelector('strong').textContent = Number(countE) + "%";
        SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE) * 5.2;
        empleado.incremento = empleado.sueldo_basico_planilla < 2164 ? round(2164 - empleado.sueldo_basico_planilla, 2) : 0;
        empleado.incremnto_adicional = 0;
        empleado.nuevo_sueldo = empleado.incremento + empleado.sueldo_basico_planilla;
        planilla.RecursosHumanosEmpleados.push(empleado);
        $scope.$evalAsync()
        $scope.sumarTotales(planilla);
    }

    $scope.cacularTotalSueldo = function (empleado) {
        empleado.nuevo_sueldo = empleado.incremento + empleado.sueldo_basico_planilla + empleado.incremnto_adicional;
        $scope.sumarTotales($scope.planilla);
    }

    $scope.sumarTotales = function (planilla) {
        $scope.sumaSueldoBasico = 0;
        $scope.sumaTotalIncremento = 0;
        $scope.sumaIncrementoAdicional = 0;
        $scope.sumaNuevoSueldo = 0;
       
        if (planilla.RecursosHumanosEmpleados != undefined) {
            for (var i = planilla.RecursosHumanosEmpleados.length - 1; i >= 0; i--) {
                $scope.sumaSueldoBasico = round($scope.sumaSueldoBasico + planilla.RecursosHumanosEmpleados[i].sueldo_basico_planilla, 2);
                $scope.sumaTotalIncremento = round($scope.sumaTotalIncremento + planilla.RecursosHumanosEmpleados[i].incremento, 2);
                $scope.sumaIncrementoAdicional = round($scope.sumaIncrementoAdicional + planilla.RecursosHumanosEmpleados[i].incremnto_adicional, 2);
                $scope.sumaNuevoSueldo = round($scope.sumaNuevoSueldo + planilla.RecursosHumanosEmpleados[i].nuevo_sueldo, 2);
            }
        }
        planilla.importe_sueldo_basico = $scope.sumaSueldoBasico;
        planilla.importe_incrementos = $scope.sumaTotalIncremento;
        planilla.importe_incremento_adicional = $scope.sumaIncrementoAdicional;
        planilla.importe_nuevo_sueldo = $scope.sumaNuevoSueldo;

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

    // guardar planilla
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
            console.log('fallo ', error);
        });
    }

    // listar planillas registradas =============
    
    $scope.pl = {};
    $scope.filtrarListaPlanillaIncrementos = function (planilla) {
        var promesa = RRHHlistaPlanillaIncrementos($scope.usuario.id_empresa, planilla.gestion);
        promesa.then(function (dato) {
            $scope.pl.planillas = dato.planillas;
            // $scope.sumaTotalPlanillas($scope.pl.planillas);
            blockUI.stop();
        });
    }
    
    $scope.verPlanilla = function (planilla) {
        $scope.abrirPopup($scope.idModalVerPlanillaIncremento);
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
        $scope.dynamicPopoverBancoComprobante = {
            templateUrl: 'myPopoverBancoComprobante.html',
        };
        $scope.registroIndividual = true
        var promesa = ListaPlanillaIncrementoDetalle(planilla.id);
        promesa.then(function (dato) {
            $scope.planillaC = planilla;
            $scope.planillaC.detalles = dato.planillas;

        });
    }

    $scope.cerrarVerPlanilla = function () {
        $scope.cerrarPopup($scope.idModalVerPlanillaIncremento);
    }

    $scope.actualizarSueldos = function (empleados) {
        // hacer ruta para actualizar fichas
        SweetAlert.swal({
            title: 'Actualizando Sueldos Empleados...',
            icon: 'info',
            iconHtml: '<i class="fa fa-search size-icon"></i>',
            // html: '<strong></strong><div class="progress-bar"><div class="progress-percentage" style="display:flex width: 0%;"></div></div>',
            html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()
        blockUI.noOpen = true;
        const promesa = ActualizarSueldosEmpleados(empleados)
        promesa.then(function (dato) {
            console.log('llegooo a guardar')
            SweetAlert.swal({
                title: 'Finalizado!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
        })
    }

    $scope.ConfirmarActualizarSueldos = function (empleados) {
        SweetAlert.swal({
            title: "Esta seguro?",
            text: "Esta seguro de actualizar los sueldos de los empleados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                $scope.actualizarSueldos(empleados);
            }
        });
    }

    $scope.inicio();

}]);