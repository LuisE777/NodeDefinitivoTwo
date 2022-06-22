angular.module('agil.controladores')

.controller('ControladoresRCIVA', ['$scope','$localStorage','$location','$templateCache','$route','blockUI', 'RecursosHumanosEmpleadosRCIVA', 'RecursosHumanosEmpleadosHorasExtras', 'ClasesTipo',
    'Parametros', 'ObtenerCambioMoneda', 'RecursosHumanosPlanillaRCIVA', 'RRHHlistaPlanillaRCIVA', 'ListaRRHHPlanillaRCIVA', 'SweetAlert', '$window', 'ListaPlanillaRcIvaDetalle', function($scope,$localStorage,$location,$templateCache,$route,blockUI, RecursosHumanosEmpleadosRCIVA, RecursosHumanosEmpleadosHorasExtras, ClasesTipo,
    Parametros, ObtenerCambioMoneda, RecursosHumanosPlanillaRCIVA, RRHHlistaPlanillaRCIVA, ListaRRHHPlanillaRCIVA, SweetAlert, $window, ListaPlanillaRcIvaDetalle){
	$scope.$on('$viewContentLoaded', function () {
        
        $scope.idModalNuevoPlanillaRCIVA = 'dialog-nueva-planilla-rc-iva';
        $scope.idModalFormulario110 = 'dialog-formulario-110';
        $scope.idModalFormularioGeneral110 = 'dialog-formulario-general-110';
        $scope.idModalArchivosTXT = 'dialog-archivos-txt';
        $scope.idModalEditarPlanillaRCIVA = 'dialog-editar-planilla-rc-iva';
        $scope.idModalSaldoArrastrado = 'dialog-saldo-arrastrado';
        $scope.idModalOtrosIngresos = 'dialog-otros-ingresos';
        
        ejecutarScriptsPlanillaRCIVA($scope.idModalNuevoPlanillaRCIVA, $scope.idModalFormulario110, $scope.idModalFormularioGeneral110, 
            $scope.idModalArchivosTXT, $scope.idModalEditarPlanillaRCIVA, $scope.idModalSaldoArrastrado,$scope.idModalOtrosIngresos);
    });

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.eliminarPopup($scope.idModalNuevoPlanillaRCIVA);
        $scope.eliminarPopup($scope.idModalFormulario110);
        $scope.eliminarPopup($scope.idModalFormularioGeneral110);
        $scope.eliminarPopup($scope.idModalArchivosTXT);
        $scope.eliminarPopup($scope.idModalEditarPlanillaRCIVA);
        $scope.eliminarPopup($scope.idModalSaldoArrastrado);
        $scope.eliminarPopup($scope.idModalOtrosIngresos);
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

    $scope.obtenerTiposRolTurnoExtra = function () {
        blockUI.start();
        var promesa = ClasesTipo("ESTEXTROL");
        promesa.then(function (entidad) {
            $scope.tiposRolTurnoExtra = entidad.clases;
            blockUI.stop();
        });
    }

    $scope.obtenerTiposRolTurnoExtra();

    $scope.obtenerPlanillaRcIva=function(planillaRcIva) {
        console.log("la cabezeraaa ", planillaRcIva);
        var promRcIva=ListaRRHHPlanillaRCIVA($scope.usuario.id_empresa, planillaRcIva.gestion, planillaRcIva.mes);
        promRcIva.then(function(planillaR){
            console.log("la cabezeraaa ", planillaR);
       
            $scope.planillasRcIva=planillaR.planillas;
            $scope.sumarTotalesPlanillaRcIva($scope.planillasRcIva);
          
        });
    }

    $scope.sumarTotalesPlanillaRcIva=function(planilla){
        $scope.sumaNetoImponible = 0;
        $scope.sumaDosSmn = 0;
        $scope.sumaDiferencia = 0;
        $scope.sumaRcIva = 0; 
        $scope.sumaDosSmn13 = 0;
        $scope.sumaF110 = 0;
        $scope.sumaRcIvaFisico = 0;
        $scope.sumaSaldoDependiente = 0; 
        $scope.sumaSaldoAnterior = 0;
        $scope.sumaActualizacion = 0; 
        $scope.sumaSaldoActualizado = 0; 
        $scope.sumaSaldoTotal = 0;
        $scope.sumaSaldoUtilizado = 0; 
        $scope.sumaRcIvaMes = 0;
        $scope.sumaNuevoSaldo = 0; 

        if (planilla != undefined) {
            for(var i=0;i<planilla.length;i++){
                $scope.sumaNetoImponible=round($scope.sumaNetoImponible+planilla[i].neto_imponible, 2);
                $scope.sumaDosSmn=round($scope.sumaDosSmn+planilla[i].dos_smn, 2);
                $scope.sumaDiferencia=round($scope.sumaDiferencia+planilla[i].diferencia, 2);
                $scope.sumaRcIva=round($scope.sumaRcIva+planilla[i].rc_iva, 2);
                $scope.sumaDosSmn13=round($scope.sumaDosSmn13+planilla[i].dos_smn13, 2);
                $scope.sumaF110=round($scope.sumaF110+planilla[i].f110, 2);
                $scope.sumaRcIvaFisico=round($scope.sumaRcIvaFisico+planilla[i].rc_iva_fisico, 2);
                $scope.sumaSaldoDependiente=round($scope.sumaSaldoDependiente+planilla[i].saldo_dependiente, 2);
                $scope.sumaSaldoAnterior=round($scope.sumaSaldoAnterior+planilla[i].saldo_anterior, 2);
                $scope.sumaActualizacion=round($scope.sumaActualizacion+planilla[i].actualizacion, 2);
                
                $scope.sumaSaldoActualizado=round($scope.sumaSaldoActualizado+planilla[i].saldo_actualizado, 2);
                $scope.sumaSaldoTotal=round($scope.sumaSaldoTotal+planilla[i].saldo_total, 2);
                $scope.sumaSaldoUtilizado=round($scope.sumaSaldoUtilizado+planilla[i].saldo_utilizado, 2);
                $scope.sumaRcIvaMes=round($scope.sumaRcIvaMes+planilla[i].rc_iva_mes, 2);
                $scope.sumaNuevoSaldo=round($scope.sumaNuevoSaldo+planilla[i].nuevo_saldo, 2);
            }
        }

        $scope.planillaRcIva.sumaNetoImponible = $scope.sumaNetoImponible;
        $scope.planillaRcIva.sumaRcIva = $scope.sumaRcIva;
        $scope.planillaRcIva.sumaDosSmn = $scope.sumaDosSmn;
        $scope.planillaRcIva.sumaDiferencia = $scope.sumaDiferencia; 
        $scope.planillaRcIva.sumaDosSmn13 = $scope.sumaDosSmn13;
        $scope.planillaRcIva.sumaF110 = $scope.sumaF110;
        $scope.planillaRcIva.sumaRcIvaFisico = $scope.sumaRcIvaFisico;
        $scope.planillaRcIva.sumaSaldoDependiente = $scope.sumaSaldoDependiente; 
        $scope.planillaRcIva.sumaSaldoAnterior = $scope.sumaSaldoAnterior;
        $scope.planillaRcIva.sumaActualizacion = $scope.sumaActualizacion; 
        $scope.planillaRcIva.sumaSaldoActualizado = $scope.sumaSaldoActualizado; 
        $scope.planillaRcIva.sumaSaldoTotal = $scope.sumaSaldoTotal;
        $scope.planillaRcIva.sumaSaldoUtilizado = $scope.sumaSaldoUtilizado; 
        $scope.planillaRcIva.sumaRcIvaMes = $scope.sumaRcIvaMes;
        $scope.planillaRcIva.sumaNuevoSaldo = $scope.sumaNuevoSaldo;
        
    }

//  ==== para editar planilla =====================================
    $scope.EditarRciva=function(planilla){
        console.log("llego a editar ", planilla);
        var fechaUFVAnterior= new Date(planilla.anio,parseInt(planilla.mes)-1,0);
        var fechaUFVActual= new Date(planilla.anio,parseInt(planilla.mes),0);
        $scope.planillaEdit = planilla;
        Promise.all([ObtenerCambioMoneda(fechaUFVActual,$scope.usuario.id_empresa), ObtenerCambioMoneda(fechaUFVAnterior,$scope.usuario.id_empresa)]).then( function(dato) {
            $scope.ufvActual = (dato[0].monedaCambio==null)?0:dato[0].monedaCambio.ufv;
            $scope.ufvAnterior = (dato[1].monedaCambio==null)?0:dato[1].monedaCambio.ufv;

            $scope.abrirPopup($scope.idModalEditarPlanillaRCIVA);
            $scope.dynamicPopoverEmpleado = {
                templateUrl: 'myPopoverEmpleadoTemplate.html',
            };
            $("#"+$scope.idModalEditarPlanillaRCIVA ).dialog( "option", "closeOnEscape", false );
            
            var promesa = ListaPlanillaRcIvaDetalle(planilla.id);
            promesa.then(function (dato) {
                $scope.planillaEdit.rrhhPlanillaRcIva = dato.planillas;
            });
        });
       
    }
    $scope.generarForm608 = function(datos) {
        convertUrlToBase64Image("./img/f608.png", function (fondoF608) {
            var promesa = ListaPlanillaRcIvaDetalle(datos.id);
            promesa.then(function (dato) {
                var doc = new PDFDocument({ compress: false, size: [612, 936], margin: 10 });
                var stream = doc.pipe(blobStream());
                let y = 49;
                doc.image(fondoF608, 30, 30, { fit: [572, 876] });
                doc.font('Helvetica',  8 );
                //doc.rect(533, 45, 65, 15).stroke();
                let mes = datos.mes.split('-');
                doc.text('0',533, y, {width: 60, align:'right'}); y += 10; //Nro Orden por regularizar
                doc.text(datos.empresa.nit,533, y, {width: 60, align:'right'}); y += 10; 
                doc.text(mes[0],533, y, {width: 60, align:'right'}); y += 10;
                doc.text(datos.anio, 533, y, {width: 60, align:'right'}); y += 10; 
                doc.text('0',533, y, {width: 60, align:'right'}); y += 38; //Fecha por regularizar

                doc.text( Math.ceil(datos.monto_ingresos_netos),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.dos_smn),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.diferencia),533, y, {width: 60, align:'right'}); y += 11;
                doc.text( Math.ceil(datos.rc_iva),533, y, {width: 60, align:'right'}); y += 11;
                doc.text( Math.ceil(datos.dos_smn13),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.rc_iva_fisico),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.f110),533, y, {width: 60, align:'right'}); y += 11;
                doc.text( Math.ceil(datos.saldo_fisco),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.saldo_dependiente),533, y, {width: 60, align:'right'}); y += 11;
                doc.text( Math.ceil(datos.saldo_anterior),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.actualizacion),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.saldo_actualizado),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.saldo_utilizado),533, y, {width: 60, align:'right'}); y += 11;
                doc.text( '0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text( Math.ceil(datos.nuevo_saldo),533, y, {width: 60, align:'right'}); y += 10;
                doc.text( '0',533, y, {width: 60, align:'right'}); y += 30;

                doc.text('0',533, y, {width: 60, align:'right'}); y += 20;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 20;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 20;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 15;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 25;

                doc.text('0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 39;

                doc.text('0',533, y, {width: 60, align:'right'}); y +=15;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 15;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text('0',533, y, {width: 60, align:'right'}); y += 10;
                doc.text( dato.planillas.length,533, y, {width: 60, align:'right'}); y += 10;
                let form110Rec = dato.planillas.filter(reg => reg.f110 > 0);
                doc.text( form110Rec.length, 533, y, {width: 60, align:'right'}); y += 10;
                
                doc.end();
                stream.on('finish', function () {
                    
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            });
        });
    }
    $scope.cerrarDialogEditarPlanillaRCIVA=function() {
        $scope.cerrarPopup($scope.idModalEditarPlanillaRCIVA);
    }

    $scope.nuevaPlanillaRcIva = function () {
        $scope.planilla=new RecursosHumanosPlanillaRCIVA({id_empresa:$scope.usuario.id_empresa});
        $scope.sumarTotales($scope.planilla);
    }


    $scope.abrirDialogNuevoPlanillaRCIVA= function () {
        $scope.nuevaPlanillaRcIva();
        $scope.dynamicPopoverEmpleado = {
            templateUrl: 'myPopoverEmpleadoTemplate.html',
        };
        $scope.abrirPopup($scope.idModalNuevoPlanillaRCIVA);
    }
    $scope.cerrarDialogNuevoPlanillaRCIVA=function () {
        $scope.buscarPlanilla = "";
        $scope.cerrarPopup($scope.idModalNuevoPlanillaRCIVA); 
    }

    $scope.generarPdfPLanillaRCIVA = function (planillaRcIva) {
            blockUI.start();
            var promesa = ListaRRHHPlanillaRCIVA($scope.usuario.id_empresa, planillaRcIva.gestion, planillaRcIva.mes);
            promesa.then(function (datos) {
                var DetalleplanillaRcIva = datos.planillas
                var doc = new PDFDocument({ compress: false, margin: 10, size: 'A4', layout: 'landscape' });
                var stream = doc.pipe(blobStream());
                // draw some text
                $scope.dibujarCabeceraPDFPlanillaRCIVA(doc, $scope.usuario, planillaRcIva, 1);
                doc.font('Helvetica', 8);
                var y = 150, itemsPorPagina = 12, items = 0, pagina = 1;
                var sumaNetoImponible = 0, sumaSubRcIva = 0, sumaDosSmn = 0, sumaDiferencia = 0, sumaDosSmn13 = 0, sumaF110 = 0, sumaRcIvaFisico = 0, sumaSaldoDependiente = 0;
                var sumaSaldoAnterior = 0, sumaActualizacion = 0, sumaSaldoActualizado = 0, sumaSaldoTotal = 0, sumaSaldoUtilizado = 0, sumaRcIvaMes = 0, sumaNuevoSaldo = 0;
                var sumaSubSaldoAnterior = 0, sumaSubdos_smn = 0, sumaSubDiferencia = 0, sumaSubNetoImponible = 0, sumaSubDos_smn13 = 0, sumaSubF110 = 0, sumaSubRcIvaFisico = 0, sumaSubSaldoDependiente = 0;
                var sumaSubActualizacion = 0, sumaSubSaldoActualizado = 0, sumaSubSaldoTotal = 0, sumaSubSaldoUtilizado = 0, sumaSubRcIvaMes = 0, sumaSubNuevoSaldo = 0;
                for (var i = 0; i < DetalleplanillaRcIva.length && items <= itemsPorPagina; i++) {
                    doc.rect(40, y - 10, 760, 30).stroke();
                    doc.text(i + 1, 45, y);
                    doc.text(DetalleplanillaRcIva[i].anio, 60, y);
                    doc.text(DetalleplanillaRcIva[i].mes.split("-")[1], 90, y);
                    doc.text(DetalleplanillaRcIva[i].neto_imponible, 140, y);
                    doc.text((DetalleplanillaRcIva[i].dos_smn), 190, y);
                    doc.text(DetalleplanillaRcIva[i].diferencia, 230, y);
                    doc.text(DetalleplanillaRcIva[i].rc_iva, 283, y);
                    doc.text(DetalleplanillaRcIva[i].dos_smn13, 325, y);
                    doc.text(DetalleplanillaRcIva[i].f110, 365, y);
                    doc.text(DetalleplanillaRcIva[i].rc_iva_fisico, 400, y);
                    doc.text(DetalleplanillaRcIva[i].saldo_dependiente, 440, y);
                    doc.text(DetalleplanillaRcIva[i].saldo_anterior, 490, y);
                    doc.text(DetalleplanillaRcIva[i].actualizacion, 530, y);
                    doc.text(DetalleplanillaRcIva[i].saldo_actualizado, 580, y);
                    doc.text(DetalleplanillaRcIva[i].saldo_total, 625, y);
                    doc.text(DetalleplanillaRcIva[i].saldo_utilizado, 665, y);
                    doc.text(DetalleplanillaRcIva[i].rc_iva_mes, 705, y);
                    doc.text(DetalleplanillaRcIva[i].nuevo_saldo, 740, y);
                    y = y + 30;
                    sumaSubNetoImponible = sumaSubNetoImponible + DetalleplanillaRcIva[i].neto_imponible;
                    sumaSubdos_smn = sumaSubdos_smn + DetalleplanillaRcIva[i].dos_smn;
                    sumaSubDiferencia = sumaSubDiferencia + DetalleplanillaRcIva[i].diferencia;
                    sumaSubRcIva = sumaSubRcIva + DetalleplanillaRcIva[i].rc_iva;
                    sumaSubDos_smn13 = sumaSubDos_smn13 + DetalleplanillaRcIva[i].dos_smn13;
                    sumaSubF110 = sumaSubF110 + DetalleplanillaRcIva[i].f110;
                    sumaSubRcIvaFisico = sumaSubRcIvaFisico + DetalleplanillaRcIva[i].rc_iva_fisico;
                    sumaSubSaldoDependiente = sumaSubSaldoDependiente + DetalleplanillaRcIva[i].saldo_dependiente;
                    sumaSubSaldoAnterior = sumaSubSaldoAnterior + DetalleplanillaRcIva[i].saldo_anterior;
                    sumaSubActualizacion = sumaSubActualizacion + DetalleplanillaRcIva[i].actualizacion;
                    sumaSubSaldoActualizado = sumaSubSaldoActualizado + DetalleplanillaRcIva[i].saldo_actualizado;
                    sumaSubSaldoTotal = sumaSubSaldoTotal + DetalleplanillaRcIva[i].saldo_total;
                    sumaSubSaldoUtilizado = sumaSubSaldoUtilizado + DetalleplanillaRcIva[i].saldo_utilizado;
                    sumaSubRcIvaMes = sumaSubRcIvaMes + DetalleplanillaRcIva[i].rc_iva_mes;
                    sumaSubNuevoSaldo = sumaSubNuevoSaldo + DetalleplanillaRcIva[i].nuevo_saldo;

                    sumaNetoImponible = sumaNetoImponible + DetalleplanillaRcIva[i].neto_imponible;
                    sumaDosSmn = sumaDosSmn + DetalleplanillaRcIva[i].dos_smn;
                    sumaDiferencia = sumaDiferencia + DetalleplanillaRcIva[i].diferencia;
                    sumaDosSmn13 = sumaDosSmn13 + DetalleplanillaRcIva[i].dos_smn13;
                    sumaF110 = sumaF110 + DetalleplanillaRcIva[i].f110;
                    sumaRcIvaFisico = sumaRcIvaFisico + DetalleplanillaRcIva[i].rc_iva_fisico;
                    sumaSaldoDependiente = sumaSaldoDependiente + DetalleplanillaRcIva[i].saldo_dependiente;
                    sumaSaldoAnterior = sumaSaldoAnterior + DetalleplanillaRcIva[i].saldo_anterior;
                    sumaActualizacion = sumaActualizacion + DetalleplanillaRcIva[i].actualizacion;
                    sumaSaldoActualizado = sumaSaldoActualizado + DetalleplanillaRcIva[i].saldo_actualizado;
                    sumaSaldoTotal = sumaSaldoTotal + DetalleplanillaRcIva[i].saldo_total;
                    sumaSaldoUtilizado = sumaSaldoUtilizado + DetalleplanillaRcIva[i].saldo_utilizado;
                    sumaRcIvaMes = sumaRcIvaMes + DetalleplanillaRcIva[i].rc_iva_mes;
                    sumaNuevoSaldo = sumaNuevoSaldo + DetalleplanillaRcIva[i].nuevo_saldo;
          
                    items++;

                    if (items == itemsPorPagina || i + 1 == DetalleplanillaRcIva.length) {
                        doc.font('Helvetica-Bold', 8);
                        doc.text("SUBTOTALES", 75, y);
                        doc.text(Math.round((sumaSubNetoImponible) * 100) / 100, 140, y);
                        doc.text(Math.round((sumaSubdos_smn) * 100) / 100, 190, y);
                        doc.text(Math.round((sumaSubDiferencia) * 100) / 100, 230, y);
                        doc.text(Math.round((sumaSubRcIva) * 100) / 100, 283, y);
                        doc.text(Math.round((sumaSubDos_smn13) * 100) / 100, 325, y);
                        doc.text(Math.round((sumaSubF110) * 100) / 100, 365, y);
                        doc.text(Math.round((sumaSubRcIvaFisico) * 100) / 100, 400, y);
                        doc.text(Math.round((sumaSubSaldoDependiente) * 100) / 100, 440, y);
                        doc.text(Math.round((sumaSubSaldoAnterior) * 100) / 100, 490, y);
                        doc.text(Math.round((sumaSubActualizacion) * 100) / 100, 530, y);
                        doc.text(Math.round((sumaSubSaldoActualizado) * 100) / 100, 580, y);
                        doc.text(Math.round((sumaSubSaldoTotal) * 100) / 100, 625, y);
                        doc.text(Math.round((sumaSubSaldoUtilizado) * 100) / 100, 665, y);
                        doc.text(Math.round((sumaSubRcIvaMes) * 100) / 100, 705, y);
                        doc.text(Math.round((sumaSubNuevoSaldo) * 100) / 100, 740, y);
                        doc.rect(40, y - 10, 760, 30).stroke();
                        doc.font('Helvetica', 8);

                        if (i + 1 == DetalleplanillaRcIva.length) {
                            doc.font('Helvetica-Bold', 8);
                            doc.text("TOTALES", 75, y + 30);
                            doc.text(Math.round((sumaNetoImponible) * 100) / 100, 140, y + 30); 
                            doc.text(Math.round((sumaDosSmn) * 100) / 100, 190, y + 30);
                            doc.text(Math.round((sumaDiferencia) * 100) / 100, 230, y + 30);
                            doc.text(Math.round((sumaSubRcIva) * 100) / 100, 283, y + 30);
                            doc.text(Math.round((sumaDosSmn13) * 100) / 100, 325, y + 30);
                            doc.text(Math.round((sumaF110) * 100) / 100, 365, y + 30);
                            doc.text(Math.round((sumaRcIvaFisico) * 100) / 100, 400, y + 30);
                            doc.text(Math.round((sumaSaldoDependiente) * 100) / 100, 440, y + 30);
                            doc.text(Math.round((sumaSaldoAnterior) * 100) / 100, 490, y + 30);
                            doc.text(Math.round((sumaActualizacion) * 100) / 100, 530, y + 30);
                            doc.text(Math.round((sumaSaldoActualizado) * 100) / 100, 580, y + 30);
                            doc.text(Math.round((sumaSaldoTotal) * 100) / 100, 625, y + 30);
                            doc.text(Math.round((sumaSaldoUtilizado) * 100) / 100, 665, y + 30);
                            doc.text(Math.round((sumaRcIvaMes) * 100) / 100, 705, y + 30);
                            doc.text(Math.round((sumaNuevoSaldo) * 100) / 100, 740, y + 30);

                            doc.rect(40, y - 10 + 30, 760, 30).stroke();
                            doc.font('Helvetica', 8);
                        } else {
                            doc.addPage({ margin: 0, bufferPages: true, layout: 'landscape' });
                            y = 170;
                            items = 0;
                            pagina = pagina + 1;
                            $scope.dibujarCabeceraPDFLibroVentas(doc, datos, reporte, pagina);
                            doc.font('Helvetica', 8);
                        }
                    }
                }
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            });
        }

    $scope.dibujarCabeceraPDFPlanillaRCIVA = function (doc, datos, reporte, pagina) {
        doc.font('Helvetica-Bold', 12);
        doc.text("PLANILLAS RC-IVA", 0, 25, { align: "center" });
        doc.font('Helvetica-Bold', 8);
        doc.text("FOLIO " + pagina, 760, 25);
        doc.rect(40, 60, 760, 40).stroke();
        doc.text("PERIÓDO FISCAL : ", 65, 70);
        doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 85);
        doc.text("NIT : ", 440, 85);
        doc.font('Helvetica', 8);
        doc.text("AÑO " + reporte.gestion, 140, 70);

        var mesReporte = reporte.mes.split("-")[1];
        if (reporte.mes == "TODOS") {
           mesReporte = reporte.mes;
        }
        doc.text("MES " + mesReporte, 200, 70); 
        doc.text(datos.empresa.razon_social, 195, 85);
        doc.text(datos.empresa.nit, 460, 85);

        doc.rect(40, 100, 760, 40).stroke();
        doc.font('Helvetica-Bold', 8);
        doc.text("Nº", 45, 110);
        doc.text("Año", 60, 110, { width: 20 });
        doc.text("Mes", 90, 110, { width: 50 });
        doc.text("Neto Imponible", 140, 110, { width: 50 });
        doc.text("2 SMN", 190, 110, { width: 35 });
        doc.text("Diferencia", 230, 110, { width: 50 });
        doc.text("RC-IVA 13%", 280, 110, { width: 35 });
        doc.text("13% de 2 SMN", 325, 110, { width: 35 });
        doc.text("F-110", 365, 110, { width: 35 });
        doc.text("RC-IVA Fisco", 400, 110, { width: 42 });
        doc.text("Saldo Dependiente", 440, 110, { width: 42 });
        doc.text("Saldo Anterior", 490, 110, { width: 40 });
        doc.text("Actualización", 530, 110, { width: 37 });
        doc.text("Saldo Actualizado", 580, 110, { width: 35 });
        doc.text("Saldo Total", 625, 110, { width: 35 });
        doc.text("Saldo Utilizado", 665, 110, { width: 35 });
        doc.text("RC-IVA Mes", 705, 110, { width: 35 });
        doc.text("Saldo Nuevo", 740, 110);
    }


    $scope.generarExcelPlanillaRcIva = function (planillaRcIva) {
        blockUI.start();
        var promesa = ListaRRHHPlanillaRCIVA($scope.usuario.id_empresa, planillaRcIva.gestion, planillaRcIva.mes);
        promesa.then(function (datos) {
            var DetalleplanillaRcIva = datos.planillas
            var data = [["N°", "Año", "Mes", "Neto Imponible", "2 SMN", "Diferencia", "RC-IVA 13%", "13% de 2 SMN", "F-110", "RC-IVA Fisco", "Saldo Dependiente", "Saldo Anterior", "Actualización", "Saldo Actualizado", "Saldo Total", "Saldo Utilizado", "RC-IVA Mes", "Saldo Nuevo"]]
            var sumaNetoImponible = 0, sumaSubRcIva = 0, sumaDosSmn = 0, sumaDiferencia = 0, sumaDosSmn13 = 0, sumaF110 = 0, sumaRcIvaFisico = 0, sumaSaldoDependiente = 0;
            var sumaSaldoAnterior = 0, sumaActualizacion = 0, sumaSaldoActualizado = 0, sumaSaldoTotal = 0, sumaSaldoUtilizado = 0, sumaRcIvaMes = 0, sumaNuevoSaldo = 0;

            for (var i = 0; i < DetalleplanillaRcIva.length; i++) {
                var columns = [];
                columns.push(i + 1);
                columns.push(DetalleplanillaRcIva[i].anio);
                columns.push(DetalleplanillaRcIva[i].mes.split("-")[1]);
                columns.push(DetalleplanillaRcIva[i].neto_imponible);
                columns.push((DetalleplanillaRcIva[i].dos_smn));
                columns.push(DetalleplanillaRcIva[i].diferencia);
                columns.push(DetalleplanillaRcIva[i].rc_iva);
                columns.push(DetalleplanillaRcIva[i].dos_smn13);
                columns.push(DetalleplanillaRcIva[i].f110);
                columns.push(DetalleplanillaRcIva[i].rc_iva_fisico);
                columns.push(DetalleplanillaRcIva[i].saldo_dependiente);
                columns.push(DetalleplanillaRcIva[i].saldo_anterior);
                columns.push(DetalleplanillaRcIva[i].actualizacion);
                columns.push(DetalleplanillaRcIva[i].saldo_actualizado);
                columns.push(DetalleplanillaRcIva[i].saldo_total);
                columns.push(DetalleplanillaRcIva[i].saldo_utilizado);
                columns.push(DetalleplanillaRcIva[i].rc_iva_mes);
                columns.push(DetalleplanillaRcIva[i].nuevo_saldo);
                
                sumaNetoImponible = sumaNetoImponible + DetalleplanillaRcIva[i].neto_imponible;
                sumaDosSmn = sumaDosSmn + DetalleplanillaRcIva[i].dos_smn;
                sumaDiferencia = sumaDiferencia + DetalleplanillaRcIva[i].diferencia;
                sumaDosSmn13 = sumaDosSmn13 + DetalleplanillaRcIva[i].dos_smn13;
                sumaF110 = sumaF110 + DetalleplanillaRcIva[i].f110;
                sumaRcIvaFisico = sumaRcIvaFisico + DetalleplanillaRcIva[i].rc_iva_fisico;
                sumaSaldoDependiente = sumaSaldoDependiente + DetalleplanillaRcIva[i].saldo_dependiente;
                sumaSaldoAnterior = sumaSaldoAnterior + DetalleplanillaRcIva[i].saldo_anterior;
                sumaActualizacion = sumaActualizacion + DetalleplanillaRcIva[i].actualizacion;
                sumaSaldoActualizado = sumaSaldoActualizado + DetalleplanillaRcIva[i].saldo_actualizado;
                sumaSaldoTotal = sumaSaldoTotal + DetalleplanillaRcIva[i].saldo_total;
                sumaSaldoUtilizado = sumaSaldoUtilizado + DetalleplanillaRcIva[i].saldo_utilizado;
                sumaRcIvaMes = sumaRcIvaMes + DetalleplanillaRcIva[i].rc_iva_mes;
                sumaNuevoSaldo = sumaNuevoSaldo + DetalleplanillaRcIva[i].nuevo_saldo;
              
                data.push(columns);
                if (i + 1 == DetalleplanillaRcIva.length) {
                    columns = [];
                    columns.push("");
                    columns.push("");
                    columns.push("TOTALES");
                    columns.push(Math.round((sumaNetoImponible) * 100) / 100); 
                    columns.push(Math.round((sumaDosSmn) * 100) / 100);
                    columns.push(Math.round((sumaDiferencia) * 100) / 100);
                    columns.push(Math.round((sumaSubRcIva) * 100) / 100);
                    columns.push(Math.round((sumaDosSmn13) * 100) / 100);
                    columns.push(Math.round((sumaF110) * 100) / 100);
                    columns.push(Math.round((sumaRcIvaFisico) * 100) / 100);
                    columns.push(Math.round((sumaSaldoDependiente) * 100) / 100);
                    columns.push(Math.round((sumaSaldoAnterior) * 100) / 100);
                    columns.push(Math.round((sumaActualizacion) * 100) / 100);
                    columns.push(Math.round((sumaSaldoActualizado) * 100) / 100);
                    columns.push(Math.round((sumaSaldoTotal) * 100) / 100);
                    columns.push(Math.round((sumaSaldoUtilizado) * 100) / 100);
                    columns.push(Math.round((sumaRcIvaMes) * 100) / 100);
                    columns.push(Math.round((sumaNuevoSaldo) * 100) / 100);
                    data.push(columns);
                }
            }

            var ws_name = "SheetJS";
            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA-RCIVA.xlsx");
            blockUI.stop();
        });
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

        $scope.diasAnio =  $scope.CalendarioRolTurnos(anio, filtro)
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
                rol.diasAnio =  angular.copy($scope.diasAnio);
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

                                if (element2 && element1.eliminado===false) {
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

    $scope.fechaPorDia = function (año, dia) {
        var date = new Date(año, 0);
        return new Date(date.setDate(dia));
    }

    $scope.parseDate=function (input) {
        var parts = input.split('/');
        return new Date(parts[2], parts[1]-1, parts[0]); 
    }

    function getPercentageChange(oldNumber, newNumber){
        var decreaseValue = oldNumber - newNumber;
        var porcentage =100-(decreaseValue / oldNumber) * 100;
        return porcentage.toFixed();
    }

    function esperandoCalculo() {
        return new Promise(resolve=>setTimeout(resolve, 5));
    }

    async function realizarCalculos(empleado, planilla, countE) {
        await esperandoCalculo();
        // console.log(empleado);
        SweetAlert.getContent().querySelector('strong').textContent = Number(countE)+"%";
        SweetAlert.getContent().querySelector('.swal2-timer-progress-bar').style.width = Number(countE)*5.2;
        blockUI.noOpen = true;

        promesa = RecursosHumanosEmpleadosHorasExtras(empleado.id_ficha, planilla.gestion, planilla.mes.split("-")[0], empleado.id);
        await promesa.then(function (dato) {
            // empleado.sueldoBasico = empleado.haber_basico;
            // $scope.antiguedad = calcAge(empleado.fecha_inicio); // == sacar años de antiguedad ==================
            // $scope.bonoFrontera = 0; // == sacar bono frontera ==================
            // $scope.otrosBonos = 0; // == sacar otros bonos ==================
            // empleado.horasExtras = dato.totalHoras;
            // empleado.totalHorasExtras = round((empleado.sueldoBasico/30/8*empleado.horasExtras)*2, 2);
            // empleado.recargoNocturno= round((empleado.sueldoBasico/30/8*empleado.horasExtras)*1.5, 2);
            // empleado.bonoAntiguedad = $scope.calcularBonoAntiguedad($scope.antiguedad);
            // empleado.bonoFrontera = $scope.bonoFrontera;
            // empleado.otrosBonos = $scope.otrosBonos;
            // empleado.totalGanado = empleado.sueldoBasico+empleado.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+empleado.otrosBonos;
            
            
            empleado.sueldoBasico = empleado.haber_basico;

            // var start = Math.floor(empled.getTime() / (3600 * 24 * 1000)); //days as integer from..
            // var end = Math.floor(ultimoDia.getTime() / (3600 * 24 * 1000)); //days as integer from..
            // var diasTrabajo = end - start; // exact dates
            $scope.diasRolTurnos = 0;
            $scope.nochesRolTurnos = 0;
            $scope.descansosRolTurnos = 0;
            if (empleado.id == 6191) {
                console.log(empleado);
            }
            var empled =  new Date(empleado.fecha_inicio);
            if(dato.rolesTurno.length>0){
                $scope.empleadosRolTurno = dato.rolesTurno;
                var fechaHoy = new Date()
                var ultimoDiaMes = new Date(fechaHoy.getFullYear(), 12, 0).getDate();
                var mesfiltro= new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0]),0);

                var primerDia = new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0])-1,1,0,0,0);
                // console.log("primerDia =======", primerDia);
                var ultimoDia = new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0])-1,mesfiltro.getDate(),23,59,59);

                // $scope.filtroRolCal = {fin: ultimoDiaMes + "/12/" + fechaHoy.getFullYear(),fin2: $scope.fechaString(ultimoDia),inicio: "01/01/2015",inicio2: $scope.fechaString(primerDia)}
                var fechaINIROL =  new Date(dato.rolesTurno[0].fecha_inicio);
                $scope.filtroRolCal = {fin: ultimoDiaMes + "/12/" + fechaHoy.getFullYear(),fin2: $scope.fechaString(ultimoDia),inicio: "01/01/"+fechaINIROL.getFullYear(),inicio2: $scope.fechaString(primerDia)}

                $scope.realizarCalendarioTrabajo($scope.filtroRolCal, $scope.empleadosRolTurno);
                var df = $scope.parseDate($scope.filtroRolCal.inicio2); //desde
                var dt = $scope.parseDate($scope.filtroRolCal.fin2); // hasta
                var result = []; 
                var countTD = 0;  
                var countNT = 0;
                var countDD = 0;

                for (var index = 0; index < $scope.empleadosRolTurno.length; index++) {
                    var rolesT = $scope.empleadosRolTurno[index];
                    for (var i=0; i<rolesT.diasAnio.length; i++){
                        var tf = $scope.parseDate(rolesT.diasAnio[i].fecha),
                            tt = $scope.parseDate(rolesT.diasAnio[i].fecha);
                        if (tf >= df && tt <= dt)  {
                            if(rolesT.diasAnio[i].texto == "T"){
                                countTD=countTD+1;
                            }else if(rolesT.diasAnio[i].texto == "NT"){
                                countNT=countNT+1;
                            }else if(rolesT.diasAnio[i].texto == "D"){
                                countDD=countDD+1
                            }
                            result.push(rolesT.diasAnio[i]);
                        }
                    }
                    
                }

                $scope.nochesRolTurnos = countNT;
                $scope.diasRolTurnos = countTD;
                $scope.descansosRolTurnos = countDD;
            }
            
            var mes= new Date(planilla.gestion,parseInt(planilla.mes),0);
            var ultimoDiaT = new Date(planilla.gestion,parseInt(planilla.mes)-1,mes.getDate()>30?mes.getDate()-1:mes.getDate(),23,59,59);
            
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
            
            if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0])  == empled.getMonth()+1 &&  empled.getFullYear() == planilla.gestion) {
                // timeDiff = Math.abs(ultimoDiaT.getTime() - empled.getTime());
                var fecha_expiracionE = new Date(empleado.fecha_expiracion);
                fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                timeDiff = Math.abs(fecha_expiracionE.getTime() - empled.getTime());
            }else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth()+1 && empled.getFullYear() == planilla.gestion) {
                var fecha_expiracionE =  new Date(empleado.fecha_expiracion);
                fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                var primerDiafl = new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0])-1,1,0,0,0);
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
            }else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) == empled.getMonth()+1 && empled.getFullYear() != planilla.gestion) {
                var fecha_expiracionE =  new Date(empleado.fecha_expiracion);
                fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                var primerDiafl = new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0])-1,1,0,0,0);
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
            }else if (empleado.fecha_expiracion && parseInt(planilla.mes.split("-")[0]) != empled.getMonth()+1 && empled.getFullYear() != planilla.gestion) {
                var fecha_expiracionE =  new Date(empleado.fecha_expiracion);
                fecha_expiracionE.setHours(23, 59, 59, 0, 0);
                var primerDiafl = new Date(planilla.gestion,parseInt(planilla.mes.split("-")[0])-1,1,0,0,0);
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

            if(diasTrabajo >= 30){
                diasTrabajo = 30;
            }
            
            empleado.dt =  diasTrabajo;

            empleado.ganado = round(empleado.sueldoBasico/30*empleado.dt, 2);
            $scope.horasExtras = 8; // == sacar horas extras ==================
            // console.log('ficha fecha inicio ==== ', empleado.fecha_inicio);
            
            if (parseInt(planilla.mes.split("-")[0])  == empled.getMonth()+1 &&  empled.getFullYear() == planilla.gestion) {
                empleado.nuevo_empleado = true;
            }
            
            var ultimoDiaMesBono = new Date(planilla.gestion,parseInt(planilla.mes)-1,mes.getDate(),23,59,59);
            $scope.antiguedad = calcAge(empleado.fecha_inicio, ultimoDiaMesBono); // == sacar años de antiguedad ==================
            
            // console.log("$scope.antiguedad", $scope.antiguedad);
            $scope.bonoFrontera = 0; // == sacar bono frontera ==================
            $scope.otrosBonos = 0; // == sacar otros bonos ==================
            $scope.otrosBonos += round(empleado.monto_otro_bonos, 2);
            // === calculo de horas extras =======
            // empleado.horasExtrasRol = 6;

            var ParamCamposHorasExtras = $scope.parametros.campos_horas_extras.filter((campoHE)=>{
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
                    }else{
                        empleado.horasExtrasRol = getCampoParamIndefinido.horas;
                    }
                }else{
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
                        }else{
                            empleado.horasExtrasRol = getCampoParamFinalizado.horas;
                        }
                    }else{
                        empleado.horasExtrasRol = 6;
                    }
                }

            }else{
                empleado.horasExtrasRol = 6;
            }

            empleado.diasRolTurnos = $scope.diasRolTurnos;
            $scope.extrasDT = (empleado.diasRolTurnos + $scope.nochesRolTurnos) * empleado.horasExtrasRol;
            
            empleado.horasExtrasR = dato.totalHoras + dato.totalHorasOrdinario;
            // empleado.horasExtras = empleado.horasExtrasR + $scope.extrasDT;

            if (empleado.bono_dias) {
                var trabajos =  $scope.diasRolTurnos * empleado.costo_campo;
                var descansos = $scope.descansosRolTurnos * empleado.costo_descanso;
                if (trabajos>0) {
                    var montoTrabajosR =  trabajos - empleado.ganado;
                    var horasExtraRest = empleado.ganado/120;
                    var nuevaHoraExtra = montoTrabajosR/horasExtraRest;
                    $scope.horasExtras = Math.floor(nuevaHoraExtra); // obteniendo entero
                    $scope.totalHorasExtras = $scope.horasExtras*horasExtraRest;
                    var horasExtraDecimal = (nuevaHoraExtra -  $scope.horasExtras); // obteniendo decimal
                    var otrosBonosSuma= descansos + (horasExtraDecimal*horasExtraRest);
                    $scope.otrosBonos += round(otrosBonosSuma, 2);
                }else{
                    $scope.horasExtras = 0;
                    $scope.totalHorasExtras =0;
                }
            }else{
                $scope.horasExtras = empleado.horasExtrasR + $scope.extrasDT;
                $scope.totalHorasExtras = round((empleado.sueldoBasico/30/8*$scope.horasExtras)*2, 2);
            }

            
            empleado.recargoNocturno = round((empleado.sueldoBasico/30*$scope.nochesRolTurnos) * 35/100, 2);
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
                    $scope.bonoFrontera = round(empleado.sueldoBasico*$scope.parametros.frontera_monto/100, 2);
                }else{
                    $scope.bonoFrontera = $scope.parametros.frontera_monto;
                }
                    
            }
            
            empleado.bonoFrontera = $scope.bonoFrontera;
            var fechaNacimiento = new Date(empleado.fecha_nacimiento);
            // condicion de fecha de nacimiento mes y mes filtro
            if (parseInt(planilla.mes.split("-")[0])-1 == fechaNacimiento.getMonth() && $scope.area_hbd != undefined) {
                // calculo bono cumpleañero ==============================================
                if ($scope.parametros.hbd_porcentaje) {
                    $scope.otrosBonos += round(empleado.sueldoBasico*$scope.parametros.hbd_monto/100, 2);
                }else{
                    $scope.otrosBonos += $scope.parametros.hbd_monto;
                }
                    
            }
            
            var totalGanado = round(empleado.ganado+$scope.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+$scope.otrosBonos, 2);
            
            if (empleado.total_ganado_fijo) {
                
                if(empleado.dt < 30){
                    empleado.monto_total_ganado = (empleado.monto_total_ganado/30)*empleado.dt;
                }

                if (totalGanado<empleado.monto_total_ganado) {

                    var diferencia = empleado.monto_total_ganado - totalGanado;
                    $scope.otrosBonos += diferencia;
                    empleado.totalGanado = round(empleado.ganado+$scope.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+$scope.otrosBonos, 2);
                    empleado.horasExtras = $scope.horasExtras;
                    empleado.totalHorasExtras = $scope.totalHorasExtras;

                }else if (totalGanado>empleado.monto_total_ganado) {
                    var diferencia = totalGanado - empleado.monto_total_ganado;
                    var RHorasExtras = $scope.totalHorasExtras / $scope.horasExtras;
                    var nuevoTotalExtras = $scope.totalHorasExtras - diferencia;
                    var nuevoHorasExtras = nuevoTotalExtras / RHorasExtras;
                    var horasExtrasEntero =  Math.floor(nuevoHorasExtras); // obteniendo el entero de horas extras
                    empleado.horasExtras = horasExtrasEntero;
                    var horasExtraDecimal = (nuevoHorasExtras - empleado.horasExtras); // obteniendo el decimal de horas extras
                    var otrosBonosTotal = horasExtraDecimal*(nuevoTotalExtras/nuevoHorasExtras)
                    $scope.otrosBonos +=  otrosBonosTotal;
                    empleado.totalHorasExtras = round(nuevoTotalExtras-otrosBonosTotal, 2);
                    empleado.totalGanado = round(empleado.ganado+empleado.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+$scope.otrosBonos, 2);

                }else{
                    empleado.totalGanado = totalGanado;
                    empleado.horasExtras = $scope.horasExtras;
                    empleado.totalHorasExtras = $scope.totalHorasExtras;
                }
            }else{
                empleado.totalGanado = totalGanado;
                empleado.horasExtras = $scope.horasExtras;
                empleado.totalHorasExtras = $scope.totalHorasExtras;
            }
            
            empleado.otrosBonos = round($scope.otrosBonos, 2);
            var fechaActual = new Date();
            var datofedad = $scope.diferenciaEntreDiasEnDias(fechaNacimiento, fechaActual)
            var edad_empleado = Math.trunc(datofedad / 365);
            if (empleado.jubilacion == null || !empleado.jubilacion) {
                
                // var fechaNacimiento = new Date(empleado.fecha_nacimiento)
                if (edad_empleado>=65) {
                    empleado.afp = round(empleado.totalGanado * 11/100, 2);
                }else{
                    empleado.afp = round(empleado.totalGanado * 12.71/100, 2);
                }
                
            }else{
                if (edad_empleado >= 65) {
                    empleado.afp = round(empleado.totalGanado * $scope.parametros.solo_jubilados_mayor_65 / 100, 2);
                } else {
                    empleado.afp = round(empleado.totalGanado * $scope.parametros.solo_jubilados_menor_65 / 100, 2);
                }
            }

            if (empleado.totalGanado>$scope.parametros.rango_primero_inicio_solidario) {
                var diferenciaTotalGanado = empleado.totalGanado - $scope.parametros.rango_primero_inicio_solidario;
                empleado.afp = round(empleado.afp + (diferenciaTotalGanado * $scope.parametros.rango_primero_fin_solidario/100), 2)
            }
            
            
            // empleado.afp = round(empleado.totalGanado * 12.71/100, 2);
            empleado.montoDeclarado = 0;
            empleado.muneroFacturas = 0;
            empleado.ivaCF = 0;
            empleado.otros_ingresos = 0;

            empleado.netoImponible = round(empleado.totalGanado - empleado.afp, 2);
            empleado.monto_ingresos_netos = empleado.netoImponible + empleado.otros_ingresos;
            empleado.dos_SMN = $scope.parametros.salario_minimo * 2;

            empleado.diferencia = 0;
            if (empleado.monto_ingresos_netos > empleado.dos_SMN) {
                empleado.diferencia = round(empleado.monto_ingresos_netos - empleado.dos_SMN, 2);
            }

            empleado.rcIva13 = round(empleado.diferencia * 0.13, 2);

            empleado.dos_SMN13 = 0;
            if(empleado.rcIva13>0){
                empleado.dos_SMN13 = ($scope.parametros.salario_minimo * 2)*0.13;
            }
            
            empleado.f110 = empleado.ivaCF;
            var calculo = empleado.rcIva13 - empleado.dos_SMN13;
            var calculo2 = calculo-empleado.f110;

            empleado.rcIvaFisco = 0;
            if (calculo2>=0) {
                empleado.rcIvaFisco = round(calculo2, 2);
            }else{
                if (empleado.rcIva13>empleado.dos_SMN13) {
                    empleado.rcIvaFisco = round(calculo, 2);
                }
            }

            empleado.saldo_fisco = 0;
            if (empleado.rcIvaFisco>empleado.f110) {
                empleado.saldo_fisco = round(empleado.rcIvaFisco-empleado.f110, 2);
            }

            if (calculo2>=0) {
                empleado.saldoDependiente = 0;
            }else{
                if (calculo>0) {
                    empleado.saldoDependiente = round(empleado.f110-calculo, 2);
                }else{
                    empleado.saldoDependiente = 0;
                }
            }

            if (empleado.dos_SMN13>empleado.rcIva13) {
                empleado.saldoDependiente = 0;
            }
            // ==== obtener de la casilla nuevo saldo del mes anterior de planilla rc-iva)
            if (empleado.nuevo_saldo == null){
                empleado.nuevo_saldo = 0;
            } 
            
            empleado.saldoAnterior = empleado.nuevo_saldo;

            empleado.actualizacion = round((empleado.saldoAnterior/$scope.ufvAnterior*$scope.ufvActual)-empleado.saldoAnterior, 2);
            empleado.saldoActualizado = round(empleado.saldoAnterior + empleado.actualizacion, 2);
            empleado.saldoTotal = round(empleado.saldoDependiente + empleado.saldoActualizado, 2);
            
            // var calculo3 = empleado.rcIvaFisco-empleado.saldoActualizado;
            // if ( calculo3 > 0) {
            //     empleado.saldoUtilizado =  round(empleado.rcIvaFisco - calculo3, 2);
            // }else{
            //     empleado.saldoUtilizado =  empleado.rcIvaFisco;
            // }

            if (empleado.saldo_fisco > empleado.saldoTotal) {
                empleado.saldoUtilizado = empleado.saldoTotal;
            }else{
                empleado.saldoUtilizado = empleado.saldo_fisco;
            }

            empleado.rcIvaMes = 0;
            // if (empleado.rcIvaFisco>empleado.saldoTotal) {
            //     empleado.rcIvaMes = round(empleado.rcIvaFisco-empleado.saldoTotal, 2);
            // }
            if (empleado.saldo_fisco>empleado.saldoTotal) {
                empleado.rcIvaMes = round(empleado.saldo_fisco-empleado.saldoTotal, 2);
            }

            // if (empleado.rcIvaMes>0) {
            //     empleado.saldoNuevo = 0;
            // }else{
            //         empleado.saldoNuevo = empleado.saldoTotal-empleado.rcIvaFisco;
            // }
            empleado.saldoNuevo = 0;
            if (empleado.saldoTotal>empleado.saldo_fisco) {
                empleado.saldoNuevo = round(empleado.saldoTotal-empleado.saldo_fisco, 2);
            }

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
        SweetAlert.update({title: "Realizando Cálculos....."})

        var countE = 0;
        for (const empleado of array) {
            countE=countE+1;
            await realizarCalculos(empleado, planilla, getPercentageChange(array.length, countE));
        }

        console.log('Doneee')
        SweetAlert.swal({
            title:'Finalizado!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        })
    }

    $scope.filtrarSueldos=function(planilla){
        SweetAlert.swal({
            title:'Obteniendo tipos de cambio...',
            icon: 'info',
            iconHtml:'<i class="fa fa-search size-icon"></i>',
            html: '<strong class="number-percentage"></strong><div class="swal2-timer-progress-bar-container progress-change"><div class="swal2-timer-progress-bar progress-percentage" style="display: flex; width: 0%;"></div></div>',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()

        var fechaUFVAnterior= new Date(planilla.gestion,parseInt(planilla.mes)-1,0);
        var fechaUFVActual= new Date(planilla.gestion,parseInt(planilla.mes),0);

        blockUI.noOpen = true;
        Promise.all([ObtenerCambioMoneda(fechaUFVActual,$scope.usuario.id_empresa), ObtenerCambioMoneda(fechaUFVAnterior,$scope.usuario.id_empresa), RRHHlistaPlanillaRCIVA($scope.usuario.id_empresa, planilla.gestion, planilla.mes)]).then( function(dato) {
            // $scope.ufvs.ufvActual = (data[0].monedaCambio==null)?0:data[0].monedaCambio.ufv; 
            // $scope.ufvs.ufvAnterior =  (data[1].monedaCambio==null)?0:data[1].monedaCambio.ufv; 
            
            $scope.ufvActual = (dato[0].monedaCambio==null)?0:dato[0].monedaCambio.ufv;
            $scope.ufvAnterior = (dato[1].monedaCambio==null)?0:dato[1].monedaCambio.ufv; 

            if (dato[2].planillas.length == 0) {
                if ($scope.ufvActual > 0 && $scope.ufvAnterior > 0) {
                    SweetAlert.update({title: "Obteniendo empleados..."})
                    blockUI.noOpen = true;
                    var promesa = RecursosHumanosEmpleadosRCIVA($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                    promesa.then(function (dato) {
                        planilla.RecursosHumanosEmpleados = dato.empleados;
                        procesarCalculos(planilla.RecursosHumanosEmpleados, planilla);
                        
                    });

                }else{
                    $scope.message = "Falta las UFVs para poder crear nuevas planillas";  
                    SweetAlert.swal("", $scope.message, "warning");
                }
            }else{
                $scope.message = "Ya se creo una planilla para este periodo "+ "'"+planilla.mes.split("-")[1]+"-"+planilla.gestion+"'";
                SweetAlert.swal("", $scope.message, "warning");
            }        
        });
    };


    $scope.filtrarSueldos2222=function(planilla){
        // console.log('cabezera', planilla);
        // $scope.mostrarMensaje('Venta registrada exitosamente!')
        // $scope.usuario.id_empresa, reporte.gestion, reporte.mes.split("-")[0]

        var fechaUFVAnterior= new Date(planilla.gestion,parseInt(planilla.mes)-1,0);
        // var fechaUFVAnterior = (mesAnterior.getDate()) + '/' + (mesAnterior.getMonth() + 1) + '/' + mesAnterior.getFullYear();

        var fechaUFVActual= new Date(planilla.gestion,parseInt(planilla.mes),0);
        // var fechaUFVActual = (mesActual.getDate()) + '/' + (mesActual.getMonth() + 1) + '/' + mesActual.getFullYear();

        console.log("fechaUFVAnterior ===========", fechaUFVAnterior);
        console.log("fechaUFVActual ===========", fechaUFVActual);

        // $scope.ufvs = {}

        // // var dat = new Date($scope.convertirFecha(fechaUFVActual));
        Promise.all([ObtenerCambioMoneda(fechaUFVActual,$scope.usuario.id_empresa), ObtenerCambioMoneda(fechaUFVAnterior,$scope.usuario.id_empresa), RRHHlistaPlanillaRCIVA($scope.usuario.id_empresa, planilla.gestion, planilla.mes)]).then( function(dato) {
            // $scope.ufvs.ufvActual = (data[0].monedaCambio==null)?0:data[0].monedaCambio.ufv; 
            // $scope.ufvs.ufvAnterior =  (data[1].monedaCambio==null)?0:data[1].monedaCambio.ufv; 
            console.log("del mel planillaaaaaaaaaaaasss ", dato[2].planillas.length);
            
            $scope.ufvActual = (dato[0].monedaCambio==null)?0:dato[0].monedaCambio.ufv;
            console.log("$scope.ufvActual ==== ", $scope.ufvActual);
            $scope.ufvAnterior = (dato[1].monedaCambio==null)?0:dato[1].monedaCambio.ufv; 
            var msg = 'Venta registrada exitosamente!';

            if (dato[2].planillas.length == 0) {

                if ($scope.ufvActual > 0 && $scope.ufvAnterior > 0) {
                    var promesa = RecursosHumanosEmpleadosRCIVA($scope.usuario.id_empresa, planilla.gestion, planilla.mes.split("-")[0]);
                    promesa.then(function (dato) {
                        planilla.RecursosHumanosEmpleados = dato.empleados;
                        
                        planilla.RecursosHumanosEmpleados.forEach(function (empleado) {
                            
                            promesa = RecursosHumanosEmpleadosHorasExtras(empleado.id_ficha, planilla.gestion, planilla.mes.split("-")[0], empleado.id);
                            promesa.then(function (dato) {
                                empleado.sueldoBasico = empleado.haber_basico;
                                $scope.antiguedad = calcAge(empleado.fecha_inicio); // == sacar años de antiguedad ==================
                                $scope.bonoFrontera = 0; // == sacar bono frontera ==================
                                $scope.otrosBonos = 0; // == sacar otros bonos ==================

                                empleado.horasExtras = dato.totalHoras;
                                empleado.totalHorasExtras = round((empleado.sueldoBasico/30/8*empleado.horasExtras)*2, 2);
                                empleado.recargoNocturno= round((empleado.sueldoBasico/30/8*empleado.horasExtras)*1.5, 2);
                                empleado.bonoAntiguedad = $scope.calcularBonoAntiguedad($scope.antiguedad);
                                empleado.bonoFrontera = $scope.bonoFrontera;
                                empleado.otrosBonos = $scope.otrosBonos;
                                empleado.totalGanado = empleado.sueldoBasico+empleado.totalHorasExtras+empleado.recargoNocturno+empleado.bonoAntiguedad+empleado.bonoFrontera+empleado.otrosBonos;
                                empleado.afp = round(empleado.totalGanado * 12.71/100, 2);

                                empleado.montoDeclarado = 0;
                                empleado.muneroFacturas = 0;
                                empleado.ivaCF = 0;

                                empleado.netoImponible = round(empleado.totalGanado - empleado.afp, 2);
                                empleado.dos_SMN = $scope.parametros.salario_minimo * 2;

                                empleado.diferencia = 0;
                                if (empleado.netoImponible > empleado.dos_SMN) {
                                    empleado.diferencia = round(empleado.netoImponible - empleado.dos_SMN, 2);
                                }

                                empleado.rcIva13 = round(empleado.diferencia * 0.13, 2);

                                empleado.dos_SMN13 = 0;
                                if(empleado.rcIva13>0){
                                    empleado.dos_SMN13 = ($scope.parametros.salario_minimo * 2)*0.13;
                                }
                                
                                empleado.f110 = empleado.ivaCF;
                                var calculo = empleado.rcIva13 - empleado.dos_SMN13;
                                var calculo2 = calculo-empleado.f110;

                                empleado.rcIvaFisco = 0;
                                if (calculo2>=0) {
                                    empleado.rcIvaFisco = round(calculo2, 2);
                                }

                                if (calculo2>=0) {
                                    empleado.saldoDependiente = 0;
                                }else{
                                    empleado.saldoDependiente = round(empleado.f110-calculo, 2);
                                }
                                // ==== obtener de la casilla nuevo saldo del mes anterior de planilla rc-iva)
                                if (empleado.nuevo_saldo == null){
                                    empleado.nuevo_saldo = 0;
                                } 
                                
                                empleado.saldoAnterior = empleado.nuevo_saldo;

                                empleado.actualizacion = round((empleado.saldoAnterior/$scope.ufvAnterior*$scope.ufvActual)-empleado.saldoAnterior, 2);
                                empleado.saldoActualizado = round(empleado.saldoAnterior + empleado.actualizacion, 2);
                                empleado.saldoTotal = round(empleado.saldoDependiente + empleado.saldoActualizado, 2);
                                
                                var calculo3 = empleado.rcIvaFisco-empleado.saldoActualizado;
                                if ( calculo3 > 0) {
                                    empleado.saldoUtilizado =  round(empleado.rcIvaFisco - calculo3, 2);
                                }else{
                                    empleado.saldoUtilizado =  empleado.rcIvaFisco;
                                }

                                empleado.rcIvaMes = 0;
                                if (empleado.rcIvaFisco>empleado.saldoTotal) {
                                    empleado.rcIvaMes = round(empleado.rcIvaFisco-empleado.saldoTotal, 2);
                                }

                                if (empleado.rcIvaMes>0) {
                                    empleado.saldoNuevo = 0;
                                }else{
                                     empleado.saldoNuevo = empleado.saldoTotal-empleado.rcIvaFisco;
                                }
                                $scope.sumarTotales(planilla);
                            });       

                        });
                        
                    });

                }else{
                    
                    $scope.$apply(function () {
                        $scope.message = "Falta las UFVs para poder crear nuevas planillas";
                        $scope.mostrarMensaje($scope.message);
                    });
                   
                }
            }else{
                $scope.$apply(function () {
                    $scope.message = "Ya se creo planilla para este periodo "+ "'"+planilla.mes.split("-")[1]+"-"+planilla.gestion+"'";
                    $scope.mostrarMensaje($scope.message);
                });
            }
            blockUI.stop();
            

        });
 
    }
    

    $scope.calcularRCIVA = function () {
        var validador = $scope.sueldo.montoDeclarado * 13/100;
        $scope.valido = false;
        if (validador != $scope.sueldo.ivaCF) {
            $scope.mensage = "ddfsfsdfsdf";
            $scope.valido = true;
        }

        $scope.sueldo.f110 = $scope.sueldo.ivaCF;
        var calculo = $scope.sueldo.rcIva13 - $scope.sueldo.dos_SMN13;
        var calculo2 = calculo-$scope.sueldo.f110;

        $scope.sueldo.rcIvaFisco = 0;

        if (calculo2>=0) {
            $scope.sueldo.rcIvaFisco = round(calculo, 2);
        }else{
            if ($scope.sueldo.rcIva13>$scope.sueldo.dos_SMN13) {
                $scope.sueldo.rcIvaFisco = round(calculo, 2);
            }
        }
        // if ($scope.sueldo.rcIva13>$scope.sueldo.dos_SMN13+$scope.sueldo.f110) {
        //     $scope.sueldo.rcIvaFisco = round(calculo2, 2);
        // }

        $scope.sueldo.saldo_fisco = 0;
        if ($scope.sueldo.rcIvaFisco>$scope.sueldo.f110) {
            $scope.sueldo.saldo_fisco = round($scope.sueldo.rcIvaFisco-$scope.sueldo.f110, 2);
        }

        if (calculo2>=0) {
            $scope.sueldo.saldoDependiente = 0;
        }else{
            if ($scope.sueldo.f110>$scope.sueldo.rcIvaFisco) {
                $scope.sueldo.saldoDependiente = round($scope.sueldo.f110-$scope.sueldo.rcIvaFisco, 2);
            }else if($scope.sueldo.rcIvaFisco >= $scope.sueldo.f110){
                $scope.sueldo.saldoDependiente = 0;
            }else{
                if (calculo>0) {
                    $scope.sueldo.saldoDependiente = round($scope.sueldo.f110-calculo, 2);
                }else{
                    $scope.sueldo.saldoDependiente = 0;
                }
            }
        }
        // ==== obtener de la casilla nuevo saldo del mes anterior de planilla rc-iva)
        // $scope.sueldo.saldoAnterior = 10;

        // if ( $scope.sueldo.dos_SMN13> $scope.sueldo.rcIva13) {
        //     $scope.sueldo.saldoDependiente = 0;
        // }

        $scope.sueldo.actualizacion = round(($scope.sueldo.saldoAnterior/$scope.ufvAnterior*$scope.ufvActual)-$scope.sueldo.saldoAnterior, 2);
        $scope.sueldo.saldoActualizado = round($scope.sueldo.saldoAnterior + $scope.sueldo.actualizacion, 2);
        $scope.sueldo.saldoTotal = round($scope.sueldo.saldoDependiente + $scope.sueldo.saldoActualizado, 2);
        
        // var calculo3 = $scope.sueldo.rcIvaFisco-$scope.sueldo.saldoActualizado;
        // if ( calculo3 > 0) {
        //     $scope.sueldo.saldoUtilizado =  round($scope.sueldo.rcIvaFisco - calculo3, 2);
        // }else{
        //     $scope.sueldo.saldoUtilizado =  $scope.sueldo.rcIvaFisco;
        // }

        if ($scope.sueldo.saldo_fisco > $scope.sueldo.saldoTotal) {
            $scope.sueldo.saldoUtilizado = $scope.sueldo.saldoTotal;
        }else{
            $scope.sueldo.saldoUtilizado = $scope.sueldo.saldo_fisco;
        }

        $scope.sueldo.rcIvaMes = 0;
        // if ($scope.sueldo.rcIvaFisco>$scope.sueldo.saldoTotal) {
        //     $scope.sueldo.rcIvaMes = round($scope.sueldo.rcIvaFisco-$scope.sueldo.saldoTotal, 2);
        // }

        if ($scope.sueldo.saldo_fisco>$scope.sueldo.saldoTotal) {
            $scope.sueldo.rcIvaMes = round($scope.sueldo.saldo_fisco-$scope.sueldo.saldoTotal, 2);
        }

        // if ($scope.sueldo.rcIvaMes>0) {
        //     $scope.sueldo.saldoNuevo = 0;
        // }else{
        //      $scope.sueldo.saldoNuevo = round($scope.sueldo.saldoTotal-$scope.sueldo.rcIvaFisco, 2);
        // }

        $scope.sueldo.saldoNuevo = 0;
        if ($scope.sueldo.saldoTotal>$scope.sueldo.saldo_fisco) {
            $scope.sueldo.saldoNuevo = round($scope.sueldo.saldoTotal-$scope.sueldo.saldo_fisco, 2);
        }
    }


    $scope.calcularRCIVA2 = function (empleado, recibido) {
        
        empleado.f110 = recibido.ivaCF;
        var calculo = empleado.rcIva13 - empleado.dos_SMN13;
        var calculo2 = calculo-empleado.f110;

        empleado.rcIvaFisco = 0;
        if (calculo2>=0) {
            empleado.rcIvaFisco = round(calculo2, 2);
        }else{
            if (empleado.rcIva13>empleado.dos_SMN13) {
                empleado.rcIvaFisco = round(calculo, 2);
            }
        }

        empleado.saldo_fisco = 0;
        if (empleado.rcIvaFisco>empleado.f110) {
            empleado.saldo_fisco = round(empleado.rcIvaFisco-empleado.f110, 2);
        }

        if (calculo2>=0) {
            empleado.saldoDependiente = 0;
        }else{
            if (empleado.f110>empleado.rcIvaFisco) {
                empleado.saldoDependiente = round(empleado.f110-empleado.rcIvaFisco, 2);
            }else{
                empleado.saldoDependiente = round(empleado.f110-calculo, 2);
            }
        }
        // ==== obtener de la casilla nuevo saldo del mes anterior de planilla rc-iva)
        // empleado.saldoAnterior = 10;

        // if ( $scope.sueldo.dos_SMN13> $scope.sueldo.rcIva13) {
        //     $scope.sueldo.saldoDependiente = 0;
        // }

        empleado.actualizacion = round((empleado.saldoAnterior/$scope.ufvAnterior*$scope.ufvActual)-empleado.saldoAnterior, 2);
        empleado.saldoActualizado = empleado.saldoAnterior + empleado.actualizacion;
        empleado.saldoTotal = round(empleado.saldoDependiente + empleado.saldoActualizado, 2);
        
        // var calculo3 = empleado.rcIvaFisco-empleado.saldoActualizado;
        // if ( calculo3 > 0) {
        //     empleado.saldoUtilizado =  round(empleado.rcIvaFisco - calculo3, 2);
        // }else{
        //     empleado.saldoUtilizado =  empleado.rcIvaFisco;
        // }

        if (empleado.saldo_fisco > empleado.saldoTotal) {
            empleado.saldoUtilizado = empleado.saldoTotal;
        }else{
            empleado.saldoUtilizado = empleado.saldo_fisco;
        }

        empleado.rcIvaMes = 0;
        // if (empleado.rcIvaFisco>empleado.saldoTotal) {
        //     empleado.rcIvaMes = round(empleado.rcIvaFisco-empleado.saldoTotal, 2);
        // }
        if (empleado.saldo_fisco>empleado.saldoTotal) {
            empleado.rcIvaMes = round(empleado.saldo_fisco-empleado.saldoTotal, 2);
        }

        empleado.saldoNuevo = 0;
        if (empleado.saldoTotal>empleado.saldo_fisco) {
            empleado.saldoNuevo = round(empleado.saldoTotal-empleado.saldo_fisco, 2);
        }
        
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
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    $scope.sumarTotales=function(planilla){
        $scope.netoImponible=0;
        $scope.sumaDos_SMN=0;
        $scope.sumaDiferencia=0;
        $scope.sumarcIva13=0;
        $scope.sumaDos_SMN13=0;
        $scope.sumaF110=0;
        $scope.sumaRcIvaFisco=0;
        $scope.sumaSaldoFisco=0;
        $scope.sumaSaldoDependiente=0;
        $scope.sumaSaldoAnterior=0;
        $scope.sumaActualizacion=0;
        $scope.sumaSaldoActualizado=0;
        $scope.sumaSaldoTotal=0;
        $scope.sumaSaldoUtilizado=0;
        $scope.sumaRcIvaMes=0;
        $scope.sumaSaldoNuevo=0;
        $scope.sumaOtrosIngresos=0;
        $scope.sumaMontoIngresosNetos=0;
        var totalEmpleados = 0;
        if (planilla.RecursosHumanosEmpleados != undefined) {
            for(var i = planilla.RecursosHumanosEmpleados.length-1; i>=0; i--){
            // for(var i=0;i<planilla.RecursosHumanosEmpleados.length;i++){
                totalEmpleados = totalEmpleados + 1;
                $scope.netoImponible=round($scope.netoImponible+planilla.RecursosHumanosEmpleados[i].netoImponible, 2);
                $scope.sumaDos_SMN=round($scope.sumaDos_SMN+planilla.RecursosHumanosEmpleados[i].dos_SMN, 2);
                $scope.sumaDiferencia=round($scope.sumaDiferencia+planilla.RecursosHumanosEmpleados[i].diferencia, 2);

                $scope.sumarcIva13=round($scope.sumarcIva13+planilla.RecursosHumanosEmpleados[i].rcIva13, 2);
                $scope.sumaDos_SMN13=round($scope.sumaDos_SMN13+planilla.RecursosHumanosEmpleados[i].dos_SMN13, 2);
                $scope.sumaF110=round($scope.sumaF110+planilla.RecursosHumanosEmpleados[i].f110, 2);
                $scope.sumaRcIvaFisco=round($scope.sumaRcIvaFisco+planilla.RecursosHumanosEmpleados[i].rcIvaFisco, 2);
                
                $scope.sumaSaldoFisco=round($scope.sumaSaldoFisco+planilla.RecursosHumanosEmpleados[i].saldo_fisco, 2);
                $scope.sumaSaldoDependiente=round($scope.sumaSaldoDependiente+planilla.RecursosHumanosEmpleados[i].saldoDependiente, 2);
                $scope.sumaSaldoAnterior=round($scope.sumaSaldoAnterior+planilla.RecursosHumanosEmpleados[i].saldoAnterior, 2);
                $scope.sumaActualizacion=round($scope.sumaActualizacion+planilla.RecursosHumanosEmpleados[i].actualizacion, 2);
                $scope.sumaSaldoActualizado=round($scope.sumaSaldoActualizado+planilla.RecursosHumanosEmpleados[i].saldoActualizado, 2);
                $scope.sumaSaldoTotal=round($scope.sumaSaldoTotal+planilla.RecursosHumanosEmpleados[i].saldoTotal, 2);
                $scope.sumaSaldoUtilizado=round($scope.sumaSaldoUtilizado+planilla.RecursosHumanosEmpleados[i].saldoUtilizado, 2);
                $scope.sumaRcIvaMes=round($scope.sumaRcIvaMes+planilla.RecursosHumanosEmpleados[i].rcIvaMes, 2);
                $scope.sumaSaldoNuevo=round($scope.sumaSaldoNuevo+planilla.RecursosHumanosEmpleados[i].saldoNuevo, 2);
                $scope.sumaOtrosIngresos=round($scope.sumaOtrosIngresos+planilla.RecursosHumanosEmpleados[i].otros_ingresos, 2);
                $scope.sumaMontoIngresosNetos=round($scope.sumaMontoIngresosNetos+planilla.RecursosHumanosEmpleados[i].monto_ingresos_netos, 2);
            }
        }   
        planilla.totalEmpleados = totalEmpleados;
        planilla.netoImponible = $scope.netoImponible;
        planilla.sumaDos_SMN = $scope.sumaDos_SMN;
        planilla.sumaDiferencia = $scope.sumaDiferencia;
        planilla.sumarcIva13 = $scope.sumarcIva13;
        planilla.sumaDos_SMN13 = $scope.sumaDos_SMN13;
        planilla.sumaF110 = $scope.sumaF110;
        planilla.sumaRcIvaFisco = $scope.sumaRcIvaFisco;
        planilla.sumaSaldoFisco = $scope.sumaSaldoFisco;
        planilla.sumaSaldoDependiente = $scope.sumaSaldoDependiente;
        planilla.sumaSaldoAnterior = $scope.sumaSaldoAnterior; 
        planilla.sumaActualizacion = $scope.sumaActualizacion;
        planilla.sumaSaldoActualizado = $scope.sumaSaldoActualizado;
        planilla.sumaSaldoTotal = $scope.sumaSaldoTotal;
        planilla.sumaSaldoUtilizado = $scope.sumaSaldoUtilizado;    
        planilla.sumaRcIvaMes = $scope.sumaRcIvaMes;
        planilla.sumaSaldoNuevo = $scope.sumaSaldoNuevo;
        planilla.sumaOtrosIngresos =  $scope.sumaOtrosIngresos;
        planilla.sumaMontoIngresosNetos = $scope.sumaMontoIngresosNetos;
        
    }

    $scope.obtenerParametros=function(idEmpresa){
        blockUI.start();
        if(idEmpresa==null){
            idEmpresa=0;
        }
        var promesa=Parametros(idEmpresa);
        promesa.then(function(parametros){
            $scope.parametros=parametros;
            blockUI.stop();
        });
    }

    $scope.calcularBonoAntiguedad=function(antiguedad){
        if (antiguedad >= 0 && antiguedad <= 1) {
            // "es de 0 a 2"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_cero_uno/100;
        }
        if (antiguedad >= 2 && antiguedad <= 4) {
            // "es de 2 a 5"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_dos_cuatro/100;
        }
        if (antiguedad >= 5 && antiguedad <= 7) {
            // "es de 5 a 8"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_cinco_siete/100;
        }
        if (antiguedad >= 8 && antiguedad <= 10) {
            // "es de 8 a 11"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_ocho_diez/100;
        }
        if (antiguedad >= 11 && antiguedad <= 14) {
            // "es de 11 a 15"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_once_catorce/100;
        }
        if (antiguedad >= 15 && antiguedad <= 19) {
            // "es de 15 a 20"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_quice_diecinueve/100;
        }
        if (antiguedad >= 20 && antiguedad <= 24) {
            // "es de 20 a 25"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_veinte_veinticuatro/100;
        }
        if (antiguedad >= 25) {
            // "es de mayor a 25"
            return 3 * $scope.parametros.salario_base_antiguedad * $scope.parametros.antiguedad_mas_veinticinco/100;
        }
    }

    $scope.calculoR = function() {
        $scope.sueldo.f110 = $scope.sueldo.ivaCF;
    }
   
    
    $scope.modificarFormulario110= function (sueldo, editar) {
       $scope.sueldo.f110_monto_declarado = $scope.sueldo.montoDeclarado;
       $scope.sueldo.f110_munero_facturas = $scope.sueldo.muneroFacturas;
       $scope.empleado = angular.extend($scope.empleado, sueldo);
       if (editar) {
            $scope.sumarTotalesEditar($scope.planillaEdit);
       }else{
            $scope.sumarTotales($scope.planilla);
       }
       
       $scope.cerrarDialogFormulario110();
       console.log('el empleadofff ===== ', sueldo);
    }

    $scope.EmpleadosSeleccionados = [];
    $scope.checkEmpleado = function(index, value, checked) {
        var idx = $scope.EmpleadosSeleccionados.indexOf(value);
        console.log("idx ===========", idx);
        $scope.selectAll = false;
        if (idx >= 0 && !checked) {
          $scope.EmpleadosSeleccionados.splice(idx, 1);
        }
        if (idx < 0 && !checked) {
          $scope.EmpleadosSeleccionados.splice(index, 1);
        }
        if (idx < 0 && checked) {
          $scope.EmpleadosSeleccionados.push(value);
        }
        console.log('los seleccionadossssss ===== ', $scope.EmpleadosSeleccionados);
    }

    $scope.checkAll = function(planilla, selectAll) {
        
        if (!selectAll) {
            $scope.EmpleadosSeleccionados = [];
        }else{
            $scope.EmpleadosSeleccionados = angular.copy(planilla);
        }
        angular.forEach(planilla, function(user) {
          user.checked = selectAll;
        });
    };


    // === validar el iva cf que se el 13% de el monto declarado ===============
    $scope.abrirDialogFormulario110= function (empleado, editar) {
        $scope.editarf110 = false;
        if (editar) {
            $scope.editarf110 = true;
        }

        $scope.empleado = empleado;
        $scope.sueldo = angular.copy(empleado);
        $scope.sueldo.ivaCF = $scope.sueldo.f110;
        $scope.sueldo.montoDeclarado = $scope.sueldo.f110_monto_declarado;
        $scope.sueldo.muneroFacturas = $scope.sueldo.f110_munero_facturas;
        console.log("$scope.sueldo ==== ", $scope.sueldo);
        $scope.abrirPopup($scope.idModalFormulario110);
    }

    $scope.generarExcelFormulario110 = function (planillas) {
        var data = [["CODIGO", "NOMBRE COMPLETO", "MONTO DECLARADO", "IVA CF", "NUMERO DE FACTURAS"]];
        if (planillas) {
            for (var i = 0; i < planillas.RecursosHumanosEmpleados.length; i++) {
                var columns = [];
                columns.push(planillas.RecursosHumanosEmpleados[i].codigo);
                columns.push(planillas.RecursosHumanosEmpleados[i].nombre_completo);
                columns.push(0);
                columns.push(0);
                columns.push(0);
                data.push(columns);
            }
        }

        var ws_name = "SheetJS";
        var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
        // ancho de las columnas
        var wscols = [
            {wch:12},
            {wch:25},
            {wch:17},
            {wch:10},
            {wch:20}
        ];

        ws['!cols'] = wscols;
        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "datos_formulario11o.xlsx");
        blockUI.stop();

    }

    $scope.subirExcelFormulario110 = function (event) {
        var files = event.target.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                blockUI.start();
                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });
                var first_sheet_name = workbook.SheetNames[0];
                var row = 2, i = 0;
                var worksheet = workbook.Sheets[first_sheet_name];

                function getSelectedIndex(codigo){
                    for(var i=0; i<$scope.planilla.RecursosHumanosEmpleados.length; i++)
                        if($scope.planilla.RecursosHumanosEmpleados[i].codigo==codigo)
                            return i;
                        return -1;  
                };

                $scope.selectEdit = function(empleado){
                    var index = getSelectedIndex(empleado.codigo);
                    $scope.planilla.RecursosHumanosEmpleados[index].ivaCF = empleado.ivaCF;
                    $scope.planilla.RecursosHumanosEmpleados[index].montoDeclarado = empleado.montoDeclarado;
                    $scope.planilla.RecursosHumanosEmpleados[index].muneroFacturas = empleado.muneroFacturas;
                    // $scope.planilla.RecursosHumanosEmpleados[index].f110 = empleado.ivaCF;

                    $scope.calcularRCIVA2($scope.planilla.RecursosHumanosEmpleados[index], empleado);
                };
                
                // para modificar las columnas de los empleados en su planilla ================
                do {
                    var empleado = {};
                    empleado.codigo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                    empleado.nombre_completo = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                    empleado.montoDeclarado = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? Number(worksheet['C' + row].v) : null;
                    empleado.ivaCF = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? Number(worksheet['D' + row].v) : null;
                    empleado.muneroFacturas = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? Number(worksheet['E' + row].v) : null;
       
                    $scope.selectEdit(empleado);

                    row++;
                    i++;
                } while (worksheet['A' + row] != undefined);
                
                $scope.sumarTotales($scope.planilla);
                $scope.cerrarDialogFormularioGeneral110();
                blockUI.stop();
            };
            reader.readAsBinaryString(f);
        }
    }

    $scope.cerrarDialogFormulario110=function () {
        $scope.cerrarPopup($scope.idModalFormulario110); 
    }
    $scope.abrirDialogFormularioGeneral110= function () {
        $scope.abrirPopup($scope.idModalFormularioGeneral110);
    }

    $scope.modificarFormularioGeneral110= function (empleados) {
        
        function getSelectedIndex(id){
            for(var i=0; i<$scope.planilla.RecursosHumanosEmpleados.length; i++)
                if($scope.planilla.RecursosHumanosEmpleados[i].id==id)
                    return i;
                return -1;  
        };

        $scope.selectEdit = function(empleado){
            var index = getSelectedIndex(empleado.id);
            console.log("index empleado", index);
            $scope.planilla.RecursosHumanosEmpleados[index].ivaCF = empleado.ivaCF;
            $scope.planilla.RecursosHumanosEmpleados[index].montoDeclarado = empleado.montoDeclarado;
            $scope.planilla.RecursosHumanosEmpleados[index].muneroFacturas = empleado.muneroFacturas;
            // $scope.planilla.RecursosHumanosEmpleados[index].f110 = empleado.ivaCF;

            $scope.calcularRCIVA2($scope.planilla.RecursosHumanosEmpleados[index], empleado);
        };
        // $scope.planilla.RecursosHumanosEmpleados = angular.extend($scope.planilla.RecursosHumanosEmpleados, empleados);

        empleados.forEach(function (empleado) {
            $scope.selectEdit(empleado);
          // $scope.empleado = angular.extend($scope.empleado, empleado);
        });
        console.log("empleado generalllllllll ====== ", $scope.planilla.RecursosHumanosEmpleados);
        
        $scope.sumarTotales($scope.planilla);
        $scope.cerrarDialogFormularioGeneral110();
       
    }

    $scope.generar=function(planilla){
        $scope.buscarPlanilla = "";
        planilla.$save(function(dato){
            $scope.nuevaPlanillaRcIva();
            blockUI.stop();
            // console.log('llego ', dato);
            // $scope.cerrarPopPupEdicion();
            SweetAlert.swal("Guardado!", 'Planilla registrada exitosamente!', "success");
            // $scope.recargarItemsTabla();
            // $scope.imprimirCompra(compra);
        },function(error) {
            
            blockUI.stop();
            console.log('fallo ', error);
            SweetAlert.swal("", error, "error");
            // $scope.cerrarPopPupEdicion();
            // $scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
            // $scope.recargarItemsTabla();
        });
        
    }

    $scope.cerrarDialogFormularioGeneral110=function () {
        $scope.cerrarPopup($scope.idModalFormularioGeneral110); 
    }
    $scope.abrirDialogArchivosTXT= function () {
        $scope.abrirPopup($scope.idModalArchivosTXT);
    }
    $scope.cerrarDialogArchivosTXT=function () {
        $scope.cerrarPopup($scope.idModalArchivosTXT); 
    }
    $scope.obtenerParametros($scope.usuario.id_empresa);

    $scope.optenerNovedadEmpleado = function (fecha_inicio, fecha_expiracion, numeroMes, gestion) {
        var empleadoFechaIngreso = new Date(fecha_inicio);
        var novedadEmpleado = "V";
        if (!fecha_expiracion && numeroMes == empleadoFechaIngreso.getMonth() + 1 && empleadoFechaIngreso.getFullYear() == gestion) {
            return novedadEmpleado = "I";
        }else if (fecha_expiracion) {
            var empleadoFechaRetiro = new Date(fecha_expiracion);
            if (numeroMes == empleadoFechaIngreso.getMonth() + 1 && empleadoFechaIngreso.getFullYear() == gestion && numeroMes == empleadoFechaRetiro.getMonth() + 1 && empleadoFechaRetiro.getFullYear() == gestion) {
                return novedadEmpleado = "V";
            }else if (numeroMes == empleadoFechaIngreso.getMonth() + 1 && empleadoFechaIngreso.getFullYear() == gestion) {
                return novedadEmpleado = "I";
            }else if (numeroMes == empleadoFechaRetiro.getMonth() + 1 && empleadoFechaRetiro.getFullYear() == gestion) {
                return novedadEmpleado = "D";
            }else{
                return novedadEmpleado;
            }
        }else{
            return novedadEmpleado;
        }
    }

    $scope.excelPlanillaSueldo = function (planilla) {
        var data = [[
            "Año", 
            "Periodo", 
            "Código tributario", 
            "Nombres", 
            "Primer Apellido", 
            "Segundo Apellido",
            "Número de documento de Identidad", 
            "Tipo de docuemnto de Identidad", 
            "Novedades (I=Incorporación V=Vigente D=Desvinculado)", 
            "Monto ingreso Neto",
            "Otros ingresos",
            "Total ingresos netos", 
            "Dos (2) salarios a impuestos (base imponible)", 
            "Importe sujeto a impuesto (base imponible)", 
            "Impuesto RC-IVA", 
            "13% de dos (2) Salarios Mínimos Nacionales", 
            "Impuesto Neto RC-IVA",
            "F-110 13% de facturas presentadas", 
            "Saldo a Favor del Fisco", 
            "Saldo a favor del dependiente", 
            "Saldo del periodo anterior", 
            "Mant. De valor", 
            "Saldo actualizado", 
            "Saldo Utilizado", 
            "Impuesto RC-IVA Retenido", 
            "Saldo de crédito Fiscal a favor del dependiente para el mes siguiente"
        ]];

        var cadena = planilla.mes.split("-");
        var mes = cadena[1];
        var anio = planilla.gestion;
        var numeroMes = parseInt(planilla.mes.split("-")[0]);
        
        var planillasGet = planilla.RecursosHumanosEmpleados;
        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            // columns.push((i + 1));
            columns.push(anio.toUpperCase());
            columns.push(mes.toUpperCase());
            columns.push(planillasGet[i].codigo_tributario?planillasGet[i].codigo_tributario:"");
            columns.push(planillasGet[i].nombres);
            columns.push(planillasGet[i].apellido_paterno);
            columns.push(planillasGet[i].apellido_materno);
            columns.push(planillasGet[i].ci);
            columns.push("CI");
            
            var novedadEmpleado = $scope.optenerNovedadEmpleado(planillasGet[i].fecha_inicio, planillasGet[i].fecha_expiracion, numeroMes, planilla.gestion);

            columns.push(novedadEmpleado);
            columns.push(planillasGet[i].netoImponible);
            columns.push(planillasGet[i].otros_ingresos);
            columns.push(planillasGet[i].monto_ingresos_netos);
            columns.push(planillasGet[i].dos_SMN);
            columns.push(planillasGet[i].diferencia);
            columns.push(planillasGet[i].rcIva13);
            columns.push(planillasGet[i].dos_SMN13);
            columns.push(planillasGet[i].rcIvaFisco);
            columns.push(planillasGet[i].f110);
            columns.push(planillasGet[i].saldo_fisco);
            columns.push(planillasGet[i].saldoDependiente);
            columns.push(planillasGet[i].saldoAnterior);
            columns.push(planillasGet[i].actualizacion);
            columns.push(planillasGet[i].saldoActualizado);
            columns.push(planillasGet[i].saldoUtilizado);
            columns.push(planillasGet[i].rcIvaMes);
            columns.push(planillasGet[i].saldoNuevo);

            data.push(columns);
        }

        var ws_name = "SheetJS";
        var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA RC-IVA.xlsx");
        blockUI.stop();

    }

    $scope.excelPlanillaSueldoEdicion = function (planilla) {
        var data = [[
            "Año", 
            "Periodo", 
            "Código tributario", 
            "Nombres", 
            "Primer Apellido", 
            "Segundo Apellido",
            "Número de documento de Identidad", 
            "Tipo de docuemnto de Identidad", 
            "Novedades (I=Incorporación V=Vigente D=Desvinculado)", 
            "Monto ingreso Neto",
            "Otros ingresos",
            "Total ingresos netos",
            "Dos (2) salarios a impuestos (base imponible)", 
            "Importe sujeto a impuesto (base imponible)", 
            "Impuesto RC-IVA", 
            "13% de dos (2) Salarios Mínimos Nacionales", 
            "Impuesto Neto RC-IVA",
            "F-110 13% de facturas presentadas", 
            "Saldo a Favor del Fisco", 
            "Saldo a favor del dependiente", 
            "Saldo del periodo anterior", 
            "Mant. De valor", 
            "Saldo actualizado", 
            "Saldo Utilizado", 
            "Impuesto RC-IVA Retenido", 
            "Saldo de crédito Fiscal a favor del dependiente para el mes siguiente"
        ]];
        var cadena = planilla.mes.split("-");
        var mes = cadena[1];
        var anio = planilla.anio;
        var numeroMes = parseInt(planilla.mes.split("-")[0]);

        var planillasGet = planilla.rrhhPlanillaRcIva;
        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            columns.push(anio.toUpperCase());
            columns.push(mes.toUpperCase());
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.codigo_tributario?planillasGet[i].rrhhDetallePlanillaRcIva.codigo_tributario:"");
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.nombres);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.apellido_paterno);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.apellido_materno);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.ci);
            columns.push("CI");
            
            var novedadEmpleado = $scope.optenerNovedadEmpleado(planillasGet[i].rrhhDetallePlanillaRcIva.fecha_inicio, planillasGet[i].rrhhDetallePlanillaRcIva.fecha_expiracion, numeroMes, planilla.anio);

            columns.push(novedadEmpleado);
            columns.push(planillasGet[i].neto_imponible);
            columns.push(planillasGet[i].otros_ingresos);
            columns.push(planillasGet[i].monto_ingresos_netos);
            columns.push(planillasGet[i].dos_smn);
            columns.push(planillasGet[i].diferencia);
            columns.push(planillasGet[i].rc_iva);
            columns.push(planillasGet[i].dos_smn13);
            columns.push(planillasGet[i].rc_iva_fisico);
            columns.push(planillasGet[i].f110);
            columns.push(planillasGet[i].saldo_fisco);
            columns.push(planillasGet[i].saldo_dependiente);
            columns.push(planillasGet[i].saldo_anterior);
            columns.push(planillasGet[i].actualizacion);
            columns.push(planillasGet[i].saldo_actualizado);
            columns.push(planillasGet[i].saldo_utilizado);
            columns.push(planillasGet[i].rc_iva_mes);
            columns.push(planillasGet[i].nuevo_saldo);

            data.push(columns);
        }

        var ws_name = "SheetJS";
        var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "PLANILLA RC-IVA.xlsx");
        blockUI.stop();

    }

    $scope.excelPlanillaSueldoEdicionCSV = function (planilla) {
        var data = [];
        var cadena = planilla.mes.split("-");
        var mes = cadena[0];
        var anio = planilla.anio;
        var numeroMes = parseInt(planilla.mes.split("-")[0]);

        var planillasGet = planilla.rrhhPlanillaRcIva;
        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            columns.push(anio.toUpperCase());
            columns.push(mes.toUpperCase());
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.codigo_tributario?planillasGet[i].rrhhDetallePlanillaRcIva.codigo_tributario:"");
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.nombres);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.apellido_paterno);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.apellido_materno);
            columns.push(planillasGet[i].rrhhDetallePlanillaRcIva.empleado.persona.ci);
            columns.push("CI");
            
            var novedadEmpleado = $scope.optenerNovedadEmpleado(planillasGet[i].rrhhDetallePlanillaRcIva.fecha_inicio, planillasGet[i].rrhhDetallePlanillaRcIva.fecha_expiracion, numeroMes, planilla.anio);

            columns.push(novedadEmpleado);
            var monto_ingresos_netos = Math.round(planillasGet[i].monto_ingresos_netos);
            columns.push(monto_ingresos_netos);
            columns.push(Math.round(planillasGet[i].dos_smn));

            var diferencia = 0;
            if (monto_ingresos_netos > planillasGet[i].dos_smn) {
                var diferencia = Math.round(monto_ingresos_netos - planillasGet[i].dos_smn);
            }
            
            columns.push(diferencia);
            var rc_iva = Math.round(diferencia * 0.13);
            columns.push(rc_iva);
            // var dos_smn13 = 0;
            // if(rc_iva>0){
            //     dos_smn13 = Math.round(($scope.parametros.salario_minimo * 2)*0.13);
            // }
            // columns.push(dos_smn13);
            
            var dos_smn13 = Math.round(planillasGet[i].dos_smn13);
            columns.push(dos_smn13);

            var calculo = rc_iva - dos_smn13;
            var calculo2 = calculo - Math.round(planillasGet[i].f110);

            var rc_iva_fisico = 0;

            if (calculo2>=0) {
                rc_iva_fisico = Math.round(calculo);
            }else{
                if (rc_iva>dos_smn13) {
                    rc_iva_fisico = Math.round(calculo);
                }
            }
            
            // var rc_iva_fisico = Math.round(planillasGet[i].rc_iva_fisico);
            columns.push(rc_iva_fisico);
            columns.push(Math.round(planillasGet[i].f110));
            var saldo_fisco = 0;
            if (rc_iva_fisico>planillasGet[i].f110) {
                saldo_fisco = Math.round(rc_iva_fisico-planillasGet[i].f110);
            }
            columns.push(saldo_fisco);
            var saldo_dependiente = Math.round(planillasGet[i].saldo_dependiente);
            columns.push(saldo_dependiente);
            var saldo_anterior = Math.round(planillasGet[i].saldo_anterior)
            columns.push(saldo_anterior);
            var actualizacion = Math.round((saldo_anterior/$scope.ufvAnterior*$scope.ufvActual)-saldo_anterior);
            columns.push(actualizacion);
            var saldo_actualizado = Math.round(saldo_anterior + actualizacion);
            columns.push(saldo_actualizado);
            var saldo_total = Math.round(saldo_dependiente+saldo_actualizado);
            
            var saldo_utilizado = 0;
            if (saldo_fisco > saldo_total) {
                saldo_utilizado = saldo_total;
            }else{
                saldo_utilizado = saldo_fisco;
            }

            columns.push(saldo_utilizado);
            var rc_iva_mes = 0;
            if (saldo_fisco>saldo_total) {
                rc_iva_mes = Math.round(saldo_fisco-saldo_total);
            }
            columns.push(rc_iva_mes);
            columns.push(0);
            columns.push(0);
            columns.push(0);
            columns.push(0);
            columns.push(rc_iva_mes);
            var nuevo_saldo = 0;
            if (saldo_total>saldo_fisco) {
                nuevo_saldo = Math.round(saldo_total-saldo_fisco);
            }
            columns.push(nuevo_saldo);
            columns.push(0);

            data.push(columns);
        }

        var ws = sheet_from_array_of_arrays(data);
        var csv = XLSX.utils.sheet_to_csv(ws, {FS: ';'});
        /* add worksheet to workbook */
        saveAs(new Blob([s2ab(csv)], { type: "application/octet-stream" }), "CVS-PLANILLA-RC-IVA.csv");
        blockUI.stop();

    }

    $scope.excelPlanillaSueldoCSV = function (planilla) {
        var data = [];

        var cadena = planilla.mes.split("-");
        var mes = cadena[0];
        var anio = planilla.gestion;
        var numeroMes = parseInt(planilla.mes.split("-")[0]);
        
        var planillasGet = planilla.RecursosHumanosEmpleados;
        for (var i = 0; i < planillasGet.length; i++) {
            var columns = [];
            // columns.push((i + 1));
            columns.push(anio.toUpperCase());
            columns.push(mes.toUpperCase());
            columns.push(planillasGet[i].codigo_tributario?planillasGet[i].codigo_tributario:"");
            columns.push(planillasGet[i].nombres);
            columns.push(planillasGet[i].apellido_paterno);
            columns.push(planillasGet[i].apellido_materno);
            columns.push(planillasGet[i].ci);
            columns.push("CI");
            
            var novedadEmpleado = $scope.optenerNovedadEmpleado(planillasGet[i].fecha_inicio, planillasGet[i].fecha_expiracion, numeroMes, planilla.gestion);

            columns.push(novedadEmpleado);
            columns.push(Math.round(planillasGet[i].monto_ingresos_netos));
            columns.push(Math.round(planillasGet[i].dos_SMN));
            columns.push(Math.round(planillasGet[i].diferencia));
            columns.push(Math.round(planillasGet[i].rcIva13));
            columns.push(Math.round(planillasGet[i].dos_SMN13));
            columns.push(Math.round(planillasGet[i].rcIvaFisco));
            columns.push(Math.round(planillasGet[i].f110));
            columns.push(Math.round(planillasGet[i].saldo_fisco));
            columns.push(Math.round(planillasGet[i].saldoDependiente));
            columns.push(Math.round(planillasGet[i].saldoAnterior));
            columns.push(Math.round(planillasGet[i].actualizacion));
            columns.push(Math.round(planillasGet[i].saldoActualizado));
            columns.push(Math.round(planillasGet[i].saldoUtilizado));
            columns.push(Math.round(planillasGet[i].rcIvaMes));
            columns.push(0);
            columns.push(0);
            columns.push(0);
            columns.push(0);
            columns.push(Math.round(planillasGet[i].saldoNuevo));
            columns.push(0);

            data.push(columns);
        }

        var ws = sheet_from_array_of_arrays(data);
        /* add worksheet to workbook */
        var csv = XLSX.utils.sheet_to_csv(ws, {FS: ';'});
        saveAs(new Blob([s2ab(csv)], { type: "application/octet-stream" }), "CVS-PLANILLA-RC-IVA.csv");
        blockUI.stop();
    }

    $scope.abrirDialogSaldoArrastrado= function (empleado, editar) {
        $scope.editarSaldoArrastrado = false;
        if (editar) {
            $scope.editarSaldoArrastrado = true;
        }

        empleado.saldo_anterior_arrastrado_back = empleado.saldo_anterior_arrastrado;
        $scope.empleado = empleado;
        $scope.sueldo = angular.copy(empleado);
        console.log("$scope.sueldo ==== ", $scope.sueldo);
        $scope.abrirPopup($scope.idModalSaldoArrastrado);
    }

    $scope.cambiosRealizados = [];
    $scope.cerrarDialogSaldoArrastrado=function () {
        $scope.cerrarPopup($scope.idModalSaldoArrastrado); 
    }

    $scope.modificarSaldoArrastrado= function (sueldo) {
        if ($scope.editarSaldoArrastrado) {
            if (sueldo.saldo_anterior_arrastrado && sueldo.saldo_anterior_arrastrado != sueldo.saldo_anterior_arrastrado_back) {
                sueldo.saldo_anterior = sueldo.saldo_anterior - sueldo.saldo_anterior_arrastrado;
            }
            sueldo.saldo_anterior = sueldo.saldo_anterior + (sueldo.saldo_anterior_arrastrado_back?sueldo.saldo_anterior_arrastrado_back:0);
            sueldo.saldo_anterior_arrastrado = sueldo.saldo_anterior_arrastrado_back;
    
            sueldo.actualizacion = round((sueldo.saldo_anterior/$scope.ufvAnterior*$scope.ufvActual)-sueldo.saldo_anterior, 2);
            sueldo.saldo_actualizado = sueldo.saldo_anterior + sueldo.actualizacion;
            sueldo.saldo_total = round(sueldo.saldo_dependiente + sueldo.saldo_actualizado, 2);
            
            if (sueldo.saldo_fisco > sueldo.saldo_total) {
                sueldo.saldo_utilizado = sueldo.saldo_total;
            }else{
                sueldo.saldo_utilizado = sueldo.saldo_fisco;
            }
    
            sueldo.rc_iva_mes = 0;
        
            if (sueldo.saldo_fisco>sueldo.saldo_total) {
                sueldo.rc_iva_mes = round(sueldo.saldo_fisco-sueldo.saldo_total, 2);
            }
    
            sueldo.nuevo_saldo = 0;
            if (sueldo.saldo_total>sueldo.saldo_fisco) {
                sueldo.nuevo_saldo = round(sueldo.saldo_total-sueldo.saldo_fisco, 2);
            }
            $scope.cambiosRealizados.push(sueldo.id);

            $scope.empleado = angular.extend($scope.empleado, sueldo);
            $scope.sumarTotalesEditar($scope.planillaEdit);
        }else{
            if (sueldo.saldo_anterior_arrastrado && sueldo.saldo_anterior_arrastrado != sueldo.saldo_anterior_arrastrado_back) {
                sueldo.saldoAnterior = sueldo.saldoAnterior - sueldo.saldo_anterior_arrastrado;
            }
            sueldo.saldoAnterior = sueldo.saldoAnterior + (sueldo.saldo_anterior_arrastrado_back?sueldo.saldo_anterior_arrastrado_back:0);
            sueldo.saldo_anterior_arrastrado = sueldo.saldo_anterior_arrastrado_back;
    
            sueldo.actualizacion = round((sueldo.saldoAnterior/$scope.ufvAnterior*$scope.ufvActual)-sueldo.saldoAnterior, 2);
            sueldo.saldoActualizado = sueldo.saldoAnterior + sueldo.actualizacion;
            sueldo.saldoTotal = round(sueldo.saldoDependiente + sueldo.saldoActualizado, 2);
            
            if (sueldo.saldo_fisco > sueldo.saldoTotal) {
                sueldo.saldoUtilizado = sueldo.saldoTotal;
            }else{
                sueldo.saldoUtilizado = sueldo.saldo_fisco;
            }
    
            sueldo.rcIvaMes = 0;
        
            if (sueldo.saldo_fisco>sueldo.saldoTotal) {
                sueldo.rcIvaMes = round(sueldo.saldo_fisco-sueldo.saldoTotal, 2);
            }
    
            sueldo.saldoNuevo = 0;
            if (sueldo.saldoTotal>sueldo.saldo_fisco) {
                sueldo.saldoNuevo = round(sueldo.saldoTotal-sueldo.saldo_fisco, 2);
            }

            $scope.empleado = angular.extend($scope.empleado, sueldo);
            $scope.sumarTotales($scope.planilla);
        }
        

        $scope.cerrarDialogSaldoArrastrado();
    }

    $scope.esNuevoEmpleado = function (empleado, planilla) {
        var empled =  new Date(empleado.rrhhDetallePlanillaRcIva.fecha_inicio);
        if (parseInt(planilla.mes.split("-")[0])  == empled.getMonth()+1 &&  empled.getFullYear() == planilla.anio) {
            return true;
        }else{
            return false;
        }
    }

    $scope.abrirDialogOtrosIngresos= function (empleado) {
        empleado.otros_ingresos_back = empleado.otros_ingresos;
        $scope.empleado = empleado;
        $scope.sueldo = angular.copy(empleado);
        $scope.abrirPopup($scope.idModalOtrosIngresos);
    }

    $scope.cerrarDialogOtrosIngresos=function () {
        $scope.cerrarPopup($scope.idModalOtrosIngresos); 
    }

    $scope.modificarOtrosingresos= function (sueldo) {
        if (sueldo.otros_ingresos != sueldo.otros_ingresos_back) {
            sueldo.otros_ingresos = sueldo.otros_ingresos_back;
        }
        

        sueldo.monto_ingresos_netos = sueldo.neto_imponible + sueldo.otros_ingresos;
        sueldo.dos_smn = $scope.parametros.salario_minimo * 2;

        sueldo.diferencia = 0;
        if (sueldo.monto_ingresos_netos > sueldo.dos_smn) {
            sueldo.diferencia = round(sueldo.monto_ingresos_netos - sueldo.dos_smn, 2);
        }

        sueldo.rc_iva = round(sueldo.diferencia * 0.13, 2);

        sueldo.dos_smn13 = 0;
        if(sueldo.rc_iva>0){
            sueldo.dos_smn13 = ($scope.parametros.salario_minimo * 2)*0.13;
        }
        
        var calculo = sueldo.rc_iva - sueldo.dos_smn13;
        var calculo2 = calculo-sueldo.f110;
        sueldo.rc_iva_fisico = 0;
        if (calculo2>=0) {
            sueldo.rc_iva_fisico = round(calculo, 2);
        }else{
            if (sueldo.rc_iva>sueldo.dos_smn13) {
                sueldo.rc_iva_fisico = round(calculo, 2);
            }
        }

        sueldo.saldo_fisco = 0;
        if (sueldo.rc_iva_fisico>sueldo.f110) {
            sueldo.saldo_fisco = round(sueldo.rc_iva_fisico-sueldo.f110, 2);
        }

        if (calculo2>=0) {
            sueldo.saldo_dependiente = 0;
        }else{
            if (sueldo.f110>sueldo.rc_iva_fisico) {
                sueldo.saldo_dependiente = round(sueldo.f110-sueldo.rc_iva_fisico, 2);
            }else if($scope.sueldo.rc_iva_fisico >= $scope.sueldo.f110){
                $scope.sueldo.saldo_dependiente = 0;
            }else{
                if (calculo>0) {
                    sueldo.saldo_dependiente = round(sueldo.f110-calculo, 2);
                }else{
                    sueldo.saldo_dependiente = 0;
                }
            }
        }

        sueldo.actualizacion = round((sueldo.saldo_anterior/$scope.ufvAnterior*$scope.ufvActual)-sueldo.saldo_anterior, 2);
        sueldo.saldo_actualizado = round(sueldo.saldo_anterior + sueldo.actualizacion, 2);
        sueldo.saldo_total = round(sueldo.saldo_dependiente + sueldo.saldo_actualizado, 2);
        
        if (sueldo.saldo_fisco > sueldo.saldo_total) {
            sueldo.saldo_utilizado = sueldo.saldo_total;
        }else{
            sueldo.saldo_utilizado = sueldo.saldo_fisco;
        }

        sueldo.rc_iva_mes = 0;
    
        if (sueldo.saldo_fisco>sueldo.saldo_total) {
            sueldo.rc_iva_mes = round(sueldo.saldo_fisco-sueldo.saldo_total, 2);
        }

        sueldo.nuevo_saldo = 0;
        if (sueldo.saldo_total>sueldo.saldo_fisco) {
            sueldo.nuevo_saldo = round(sueldo.saldo_total-sueldo.saldo_fisco, 2);
        }

        $scope.cambiosRealizados.push(sueldo.id);
        $scope.empleado = angular.extend($scope.empleado, sueldo);
        $scope.sumarTotalesEditar($scope.planillaEdit);
        $scope.cerrarDialogOtrosIngresos();
    }

    $scope.actualizarPlanilla = function (planillaedit) {
        // $scope.parametros = parametro;
        $scope.buscarPlanilla = "";
        RecursosHumanosPlanillaRCIVA.update({ id_empresa: $scope.usuario.id_empresa }, planillaedit, function (res) {
            $scope.cerrarDialogEditarPlanillaRCIVA();
            SweetAlert.swal("Guardado!", res.mensaje, "success");
            $scope.cambiosRealizados = [];
        }, function (error) {
            SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "error");
        })
    }

    $scope.comprobarCambios=function() {
        if ($scope.cambiosRealizados.length > 0) {
            SweetAlert.swal({
                title: "Desea guardar los Cambios?",
                html: "Tiene <span style='color:#dd3333'>"+$scope.cambiosRealizados.length+"</span> cambios en la planilla!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: "No",
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(function (result) {
                if (result.value) {
                    // $scope.cerrarPopup($scope.idModalEditarPlanillaRCIVA);
                    $scope.actualizarPlanilla($scope.planillaEdit);
                }else{
                    $scope.cambiosRealizados = [];
                    $scope.cerrarPopup($scope.idModalEditarPlanillaRCIVA);
                }
            });
        }else{
            $scope.cerrarPopup($scope.idModalEditarPlanillaRCIVA);
        }
    }
    

    $scope.sumarTotalesEditar=function(planilla){
        $scope.netoImponible=0;
        $scope.sumaDos_SMN=0;
        $scope.sumaDiferencia=0;
        $scope.sumarcIva13=0;
        $scope.sumaDos_SMN13=0;
        $scope.sumaF110=0;
        $scope.sumaRcIvaFisco=0;
        $scope.sumaSaldoFisco=0;
        $scope.sumaSaldoDependiente=0;
        $scope.sumaSaldoAnterior=0;
        $scope.sumaActualizacion=0;
        $scope.sumaSaldoActualizado=0;
        $scope.sumaSaldoTotal=0;
        $scope.sumaSaldoUtilizado=0;
        $scope.sumaRcIvaMes=0;
        $scope.sumaSaldoNuevo=0;
        $scope.sumaOtrosIngresos=0;
        $scope.sumaMontoIngresosNetos=0;
        var totalEmpleados = 0;
        if (planilla.rrhhPlanillaRcIva != undefined) {
            for(var i = planilla.rrhhPlanillaRcIva.length-1; i>=0; i--){
            // for(var i=0;i<planilla.rrhhPlanillaRcIva.length;i++){
                totalEmpleados = totalEmpleados + 1;
                $scope.netoImponible=round($scope.netoImponible+planilla.rrhhPlanillaRcIva[i].neto_imponible, 2);
                $scope.sumaDos_SMN=round($scope.sumaDos_SMN+planilla.rrhhPlanillaRcIva[i].dos_smn, 2);
                $scope.sumaDiferencia=round($scope.sumaDiferencia+planilla.rrhhPlanillaRcIva[i].diferencia, 2);
                $scope.sumarcIva13=round($scope.sumarcIva13+planilla.rrhhPlanillaRcIva[i].rc_iva, 2);
                $scope.sumaDos_SMN13=round($scope.sumaDos_SMN13+planilla.rrhhPlanillaRcIva[i].dos_smn13, 2);
                $scope.sumaF110=round($scope.sumaF110+planilla.rrhhPlanillaRcIva[i].f110, 2);
                $scope.sumaRcIvaFisco=round($scope.sumaRcIvaFisco+planilla.rrhhPlanillaRcIva[i].rc_iva_fisico, 2);
                $scope.sumaSaldoFisco=round($scope.sumaSaldoFisco+planilla.rrhhPlanillaRcIva[i].saldo_fisco, 2);
                $scope.sumaSaldoDependiente=round($scope.sumaSaldoDependiente+planilla.rrhhPlanillaRcIva[i].saldo_dependiente, 2);
                $scope.sumaSaldoAnterior=round($scope.sumaSaldoAnterior+planilla.rrhhPlanillaRcIva[i].saldo_anterior, 2);
                $scope.sumaActualizacion=round($scope.sumaActualizacion+planilla.rrhhPlanillaRcIva[i].actualizacion, 2);
                $scope.sumaSaldoActualizado=round($scope.sumaSaldoActualizado+planilla.rrhhPlanillaRcIva[i].saldo_actualizado, 2);
                $scope.sumaSaldoTotal=round($scope.sumaSaldoTotal+planilla.rrhhPlanillaRcIva[i].saldo_total, 2);
                $scope.sumaSaldoUtilizado=round($scope.sumaSaldoUtilizado+planilla.rrhhPlanillaRcIva[i].saldo_utilizado, 2);
                $scope.sumaRcIvaMes=round($scope.sumaRcIvaMes+planilla.rrhhPlanillaRcIva[i].rc_iva_mes, 2);
                $scope.sumaSaldoNuevo=round($scope.sumaSaldoNuevo+planilla.rrhhPlanillaRcIva[i].nuevo_saldo, 2);
                $scope.sumaOtrosIngresos=round($scope.sumaOtrosIngresos+planilla.rrhhPlanillaRcIva[i].otros_ingresos, 2);
                $scope.sumaMontoIngresosNetos=round($scope.sumaMontoIngresosNetos+planilla.rrhhPlanillaRcIva[i].monto_ingresos_netos, 2);
            }
        }   
        planilla.totalEmpleados = totalEmpleados;
        planilla.neto_imponible = $scope.netoImponible;
        planilla.dos_smn = $scope.sumaDos_SMN;
        planilla.diferencia = $scope.sumaDiferencia;
        planilla.rc_iva = $scope.sumarcIva13;
        planilla.dos_smn13 = $scope.sumaDos_SMN13;
        planilla.f110 = $scope.sumaF110;
        planilla.rc_iva_fisico = $scope.sumaRcIvaFisco;
        planilla.saldo_fisco = $scope.sumaSaldoFisco;
        planilla.saldo_dependiente = $scope.sumaSaldoDependiente;
        planilla.saldo_anterior = $scope.sumaSaldoAnterior; 
        planilla.actualizacion = $scope.sumaActualizacion;
        planilla.saldo_actualizado = $scope.sumaSaldoActualizado;
        planilla.saldo_total = $scope.sumaSaldoTotal;
        planilla.saldo_utilizado = $scope.sumaSaldoUtilizado;    
        planilla.rc_iva_mes = $scope.sumaRcIvaMes;
        planilla.nuevo_saldo = $scope.sumaSaldoNuevo;
        planilla.otros_ingresos =  $scope.sumaOtrosIngresos;
        planilla.monto_ingresos_netos = $scope.sumaMontoIngresosNetos;
    }

    $scope.calcularRCIVAEditar = function () {
        var validador = $scope.sueldo.montoDeclarado * 13/100;
        $scope.valido = false;
        if (validador != $scope.sueldo.ivaCF) {
            $scope.mensage = "ddfsfsdfsdf";
            $scope.valido = true;
        }

        $scope.sueldo.f110 = $scope.sueldo.ivaCF;
        var calculo = $scope.sueldo.rc_iva - $scope.sueldo.dos_smn13;
        var calculo2 = calculo-$scope.sueldo.f110;

        $scope.sueldo.rcIvaFisco = 0;

        if (calculo2>=0) {
            $scope.sueldo.rc_iva_fisico = round(calculo, 2);
        }else{
            if ($scope.sueldo.rc_iva>$scope.sueldo.dos_smn13) {
                $scope.sueldo.rc_iva_fisico = round(calculo, 2);
            }
        }

        $scope.sueldo.saldo_fisco = 0;
        if ($scope.sueldo.rc_iva_fisico>$scope.sueldo.f110) {
            $scope.sueldo.saldo_fisco = round($scope.sueldo.rc_iva_fisico-$scope.sueldo.f110, 2);
        }

        if (calculo2>=0) {
            $scope.sueldo.saldo_dependiente = 0;
        }else{
            if ($scope.sueldo.f110>$scope.sueldo.rc_iva_fisico) {
                $scope.sueldo.saldo_dependiente = round($scope.sueldo.f110-$scope.sueldo.rc_iva_fisico, 2);
            }else if($scope.sueldo.rc_iva_fisico >= $scope.sueldo.f110){
                $scope.sueldo.saldo_dependiente = 0;
            }else{
                if (calculo>0) {
                    $scope.sueldo.saldo_dependiente = round($scope.sueldo.f110-calculo, 2);
                }else{
                    $scope.sueldo.saldo_dependiente = 0;
                }
            }
        }
        // ==== obtener de la casilla nuevo saldo del mes anterior de planilla rc-iva)

        $scope.sueldo.actualizacion = round(($scope.sueldo.saldo_anterior/$scope.ufvAnterior*$scope.ufvActual)-$scope.sueldo.saldo_anterior, 2);
        $scope.sueldo.saldo_actualizado = round($scope.sueldo.saldo_anterior + $scope.sueldo.actualizacion, 2);
        $scope.sueldo.saldo_total = round($scope.sueldo.saldo_dependiente + $scope.sueldo.saldo_actualizado, 2);

        if ($scope.sueldo.saldo_fisco > $scope.sueldo.saldo_total) {
            $scope.sueldo.saldo_utilizado = $scope.sueldo.saldo_total;
        }else{
            $scope.sueldo.saldo_utilizado = $scope.sueldo.saldo_fisco;
        }

        $scope.sueldo.rc_iva_mes = 0;
       
        if ($scope.sueldo.saldo_fisco>$scope.sueldo.saldo_total) {
            $scope.sueldo.rc_iva_mes = round($scope.sueldo.saldo_fisco-$scope.sueldo.saldo_total, 2);
        }

        $scope.sueldo.nuevo_saldo = 0;
        if ($scope.sueldo.saldo_total>$scope.sueldo.saldo_fisco) {
            $scope.sueldo.nuevo_saldo = round($scope.sueldo.saldo_total-$scope.sueldo.saldo_fisco, 2);
        }
    }

}]);