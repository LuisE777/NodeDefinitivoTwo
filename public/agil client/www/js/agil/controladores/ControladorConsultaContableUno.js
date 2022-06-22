angular.module('agil.controladores')

.controller('ControladorConsultaContableUno', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','SweetAlert','ListaComprobanteArea','GuardarAreaCosto','GuardarElimAreaCosto','ListaComprobanteCentroCosto','ListaDetallCentroCosto','GuardarCentroCosto','ModificarCentroCosto','elimCentroCosto','tikCentroCosto','ClasesTipo', 'ListaCentroCostoTablaDinamicas',
function($scope,$localStorage,$location,$templateCache,$route,blockUI,$timeout, SweetAlert, ListaComprobanteArea,GuardarAreaCosto,GuardarElimAreaCosto,ListaComprobanteCentroCosto,ListaDetallCentroCosto,GuardarCentroCosto, ModificarCentroCosto,elimCentroCosto,tikCentroCosto,ClasesTipo,ListaCentroCostoTablaDinamicas){
    blockUI.start();
    $scope.usuario = JSON.parse($localStorage.usuario);
    $scope.IdModalConfiguracionAreaCostos = 'modalConfiguracionAreaCostos';
    $scope.IdModalConfiguracionCentroCosto = 'modalConfiguracionCentroCosto';

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsConsultaContableUno($scope.IdModalConfiguracionAreaCostos, $scope.IdModalConfiguracionCentroCosto);
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        //blockUI.stop();
    });

	$scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.IdModalConfiguracionAreaCostos)
        $scope.eliminarPopup($scope.IdModalConfiguracionCentroCosto)
	});
        
    $scope.inicio=function(){
        $scope.costoss = []
        $scope.areaCostos = { costoss: [] }
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

        $scope.PopoverCostos = {
            templateUrl: 'PopoverCostos.html',
            title: 'Menu',
            isOpen: false
        };
        $scope.PopoverConfiguracionCostos = {
            templateUrl: 'PopoverConfiguracionCostos.html',
            title: 'Menu',
            isOpen: false
        };

    
        
        $scope.areasCentroCostos = [];
        $scope.obtenerListaAreaCostos = function () {
            ListaComprobanteArea($scope.usuario.id_empresa).then(function (lista) {
                $scope.areasCentroCostos = lista.listaAreasCostos;
            })
        }
        $scope.abrirConfiguracionAreaCostos = function () {
            $scope.obtenerListaAreaCostos();
            $scope.abrirPopup($scope.IdModalConfiguracionAreaCostos);
        }
        $scope.cerrarConfiguracionAreaCostos = function () {
            $scope.cerrarPopup($scope.IdModalConfiguracionAreaCostos);
        }

        $scope.agregarDetalleAreaCosto = function (AreaCosto){
            $scope.areasCentroCostos.push({nombre:AreaCosto.nombre, descripcion:AreaCosto.descripcion});
            AreaCosto.nombre="";
            AreaCosto.descripcion="";
        }
        $scope.guardarDetallesAreaCostos = function (areasCentroCostos) {
            GuardarAreaCosto({areasCentroCostos:areasCentroCostos},$scope.usuario.id_empresa).then(function(dato) {
                $scope.obtenerListaAreaCostos();
                SweetAlert.swal("Guardado!", dato.mensaje, "success");
            })
        }
        $scope.editarAreaCostos = (datoAreaCostos,index) => {
            $scope.AreaCosto=angular.copy(datoAreaCostos)
            $scope.AreaCosto.editar=true
            $scope.AreaCosto.index=index
        }
        $scope.guardarEdAreaCostos = (datoAreaCostos) => {

            $scope.areasCentroCostos[datoAreaCostos.index] = angular.copy(datoAreaCostos);
            $scope.AreaCosto.nombre="";
            $scope.AreaCosto.descripcion="";
            $scope.AreaCosto.editar=false;
        }
        $scope.eliminarAreaCostos = function (datoAreaCostos) {
            GuardarElimAreaCosto({id:datoAreaCostos.id}).then(function(dato) {
                $scope.obtenerListaAreaCostos();  
            })  
        }
        $scope.confirmarEliminarAreaCostos = function (datoAreaCostos) {
            if (datoAreaCostos.id) {
                SweetAlert.swal({
                    title: "Esta seguro?",
                    text: "Esta seguro de eliminar el registro seleccionad@!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.value) {
                        $scope.eliminarAreaCostos(datoAreaCostos);
                    } 
                });
            }else{
                $scope.areasCentroCostos.splice($scope.areasCentroCostos.indexOf(datoAreaCostos), 1);
            }
            
        }

        $scope.CentroCostos=[];
        $scope.obtenerListaCentroCostos = function () {
            ListaComprobanteCentroCosto($scope.usuario.id_empresa).then(function (lista) {
                $scope.CentroCostos = lista.listaCentroCostos;
                $scope.CentroCostos.unshift({id:0,nombre:'--- TODOS ---'})
                $scope.centroCostoss=$scope.CentroCostos[0]
            })
        }
        $scope.centroCostosArea=[];
        $scope.obtenerListaDetalleCentroCostos = function (idCentroCosto) {
            ListaDetallCentroCosto($scope.usuario.id_empresa, idCentroCosto).then(function (lista) {
                $scope.centroCostosArea = lista.listaDetallCentroCostos;
            })
        }
        $scope.abrirConfiguracionCentroCosto = function () {
            $scope.obtenerListaCentroCostos();
            $scope.obtenerListaAreaCostos();
            $scope.obtenerListaDetalleCentroCostos(0);
            $scope.abrirPopup($scope.IdModalConfiguracionCentroCosto);
        }
        $scope.cerrarConfiguracionCentroCosto = function () {
            $scope.cerrarPopup($scope.IdModalConfiguracionCentroCosto);
        }
        $scope.guardarDetallesCentroCostos = function (CcentrCosto) {
            GuardarCentroCosto(CcentrCosto,$scope.usuario.id_empresa).then(function(dato) {
                $scope.obtenerListaDetalleCentroCostos(0);
                SweetAlert.swal("Guardado!", dato.mensaje, "success");
                CcentrCosto.descripcion='';
                CcentrCosto.centroCostoss= null;
                CcentrCosto.areaCosto= null;
            })
        }
        $scope.editarCentroCostos = (datoCentroCostos) => {
            $scope.CentrCosto=angular.copy(datoCentroCostos)
            $scope.CentrCosto.areaCosto=datoCentroCostos.area_costo
            $scope.CentrCosto.centroCostoss=datoCentroCostos.centro_costo
            $scope.CentrCosto.editar=true
        }

        $scope.guardarDetallesCentroCostos = function (CcentrCosto) {
            GuardarCentroCosto(CcentrCosto,$scope.usuario.id_empresa).then(function(dato) {
                $scope.obtenerListaDetalleCentroCostos(0);
                SweetAlert.swal("Guardado!", dato.mensaje, "success");
                CcentrCosto.descripcion='';
                CcentrCosto.centroCostoss= null;
                CcentrCosto.areaCosto= null;
            })
        }
        $scope.guardarModifCentroCostos = function (CcentrCosto) {
            ModificarCentroCosto(CcentrCosto,$scope.usuario.id_empresa).then(function(dato) {
                $scope.obtenerListaDetalleCentroCostos(0);
                SweetAlert.swal("Guardado!", dato.mensaje, "success");
                CcentrCosto.descripcion='';
                CcentrCosto.centroCostoss= null;
                CcentrCosto.areaCosto= null;
                CcentrCosto.editar=false;
                
            })
        }
        $scope.eliminarCentroCostos = function (datoCentroCostos) {
            elimCentroCosto({id:datoCentroCostos.id}).then(function(dato) {
                $scope.obtenerListaDetalleCentroCostos(0); 
            })  
        }
        $scope.confirmarEliminarCentroCostos = function (datoCentroCostos) {
            SweetAlert.swal({
                title: "Esta seguro?",
                text: "Esta seguro de eliminar lo seleccionado!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: "No"
            }).then(function (result) {
                if (result.value) {
                    $scope.eliminarCentroCostos(datoCentroCostos);
                } 
            });
            
        }

        $scope.TikCentroCostos = function (datoCentroCostos) {
            tikCentroCosto({id:datoCentroCostos.id,prorrateo:datoCentroCostos.prorrateo}).then(function(dato) {
                $scope.obtenerListaDetalleCentroCostos(0); 
            })  
        }

        // TABLAS DINAMICAS PARA CONTABLE1
        $scope.generarTablaPivot = function (datos){
            var pivot = new WebDataRocks({
                container: "#tablaDinamica",
                toolbar: true,
                beforetoolbarcreated: customizeToolbar,
                report: {
                    dataSource: {
                        data: datos
                    },
                    slice: {
                        rows: [{
                            "uniqueName": "T/COMP"
                        }],
                        measures: [{
                            "uniqueName": "DEBE",
                                "aggregation": "sum",
                                "format": "currency"
                            },
                            {"uniqueName": "HABER",
                                "aggregation": "sum",
                                "format": "currency"
                            }],
                        reportFilters: [{
                            "uniqueName": "ESTADO",
                                    "filter": {
                                        "members": ["ESTADO.VIGENTE"]
                                    }
                            }]
                    },
                    localization: 'https://cdn.webdatarocks.com/loc/es.json',
                    formats: [{
                        maxDecimalPlaces: 2
                    }]

                    // datos 
                },
                reportcomplete: function() {
                    pivot.off("reportcomplete");
                    pivotTableReportComplete = true;
                    createGoogleChart();
                }
            });
            
            var pivotTableReportComplete = false;
            var googleChartsLoaded = false;
            
            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(onGoogleChartsLoaded);
            
            function onGoogleChartsLoaded() {
                googleChartsLoaded = true;
                if (pivotTableReportComplete) {
                    createGoogleChart();
                }
            }
            
            function createGoogleChart() {
                if (googleChartsLoaded) {
                    pivot.googlecharts.getData({
                            type: "column"
                        },
                        drawChart,
                        drawChart
                    );
                }
            }
            
            function drawChart(_data) {
                var data = google.visualization.arrayToDataTable(_data.data);
            
                var options = {
                    title: "GRAFICO DE BARRAS",
                    legend: {
                        position: 'top'
                    },
                    is3D: true,
                    colors: ['#66ccff', '#e0440e']
                };
            
                var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-container'));
                chart.draw(data, options);
            }
            // PARA CREAR NUEVO BUTOOTS 
            function customizeToolbar(toolbar) {
                // get all tabs
                var tabs = toolbar.getTabs();
                toolbar.getTabs = function() { 
                    delete tabs[0]
                    tabs.unshift({
                        id: "wdr-tab-lightblue",
                        title: "Color",
                        icon: this.icons.format,
                        menu: [
                          { title: 'Cielo', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerBlue, mobile: false, icon: this.icons.format },
                          { title: 'Natural', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerDefault, mobile: false, icon: this.icons.format }
                        ]
                    })/* ,
                    tabs.unshift({
                        id: "wdr-tab-lightblue",
                        title: "Gráfico",
                        icon: this.icons.format,
                        menu: [
                            { title: 'Gráfico de Áre', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerBlue, mobile: false, icon: this.icons.format },
                            { title: 'Gráfico de Barras', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerDefault, mobile: false, icon: this.icons.format },
                            { title: 'Gráfico de columnas', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerDefault, mobile: false, icon: this.icons.format },
                            { title: 'Gráfico de lines', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerDefault, mobile: false, icon: this.icons.format },
                            { title: 'Gráfico Circular', id: "wdr-tab-connect-local-csvjj", handler: newtabHandlerDefault, mobile: false, icon: this.icons.format }
                        ]
                    }) */;
                    return tabs;
                }
                var newtabHandlerBlue = function() {
                    setLightBlueTheme();
                };
                var newtabHandlerDefault = function() {
                    setDefaultTheme();
                };
            }
            
            function setLightBlueTheme() {
                var prevThemeTags = getPrevTheme();
                var link = document.createElement('link');
                link.href = "https://cdn.webdatarocks.com/latest/theme/lightblue/webdatarocks.min.css";
                link.rel = "stylesheet";
                link.type = "text/css";
                link["onload"] = function() {
                    if (prevThemeTags != null) {
                        for (var i = 0; i < prevThemeTags.length; i++) {
                            if (window.ActiveXObject || "ActiveXObject" in window) {
                                prevThemeTags[i].removeNode(true);
                            } else {
                                prevThemeTags[i].remove();
                            }
                        }
                    }
                };
                document.body.appendChild(link);
            }
            
            function setDefaultTheme() {
                var prevThemeTags = getPrevTheme();
                var link = document.createElement('link');
                link.href = "https://cdn.webdatarocks.com/latest/webdatarocks.min.css";
                link.rel = "stylesheet";
                link.type = "text/css";
                link["onload"] = function() {
                    if (prevThemeTags != null) {
                        for (var i = 0; i < prevThemeTags.length; i++) {
                            if (window.ActiveXObject || "ActiveXObject" in window) {
                                prevThemeTags[i].removeNode(true);
                            } else {
                                prevThemeTags[i].remove();
                            }
                        }
                    }
                };
                document.body.appendChild(link);
            }
            
            function getPrevTheme() {
                var linkTags = document.head.getElementsByTagName("link");
                var prevThemeTags = [];
                for (var i = 0; i < linkTags.length; i++) {
                    if (linkTags[i].href.indexOf("webdatarocks.min.css") > -1 || linkTags[i].href.indexOf("webdatarocks.css") > -1) {
                        prevThemeTags.push(linkTags[i]);
                    }
                }
                linkTags = document.body.getElementsByTagName("link");
                for (var i = 0; i < linkTags.length; i++) {
                    if (linkTags[i].href.indexOf("webdatarocks.min.css") > -1 || linkTags[i].href.indexOf("webdatarocks.css") > -1) {
                        prevThemeTags.push(linkTags[i]);
                    }
                }
                return prevThemeTags;
            }
        }
        //cargar vacio la tabla pivot
        $scope.generarTablaPivot('');


        $scope.filtrarCentroCostosTAblasDinamic = function (reporte) {
            blockUI.start()
            ListaCentroCostoTablaDinamicas($scope.usuario.id_empresa,reporte.gestion,reporte.mes).then(function (lista) {
                var datoss = [["T/COMP","GRUPO","SUBGRUPO","GENERICA","CUENTA",'N°/COMP','FECHA','AUXILIAR',"AREA","CENTRO","DEBE","HABER","ESTADO","CLASIFICACIÓN", "MOVIMIENTO", "MES", "DEBE $US", "HABER $US"]]
        
                for (var i = 0; i < lista.asientos.length; i++) {
                    var costoAreaa =lista.asientos[i]
                    var columns = [];
        
                    columns.push(costoAreaa.tipo_comprobante)
                   /*  if(costoAreaa.nombreCuentaPadreJ){
                        if(costoAreaa.nombreCuentaPadreJ == 'ACTIVO'){
                            columns.push('1 '+costoAreaa.nombreCuentaPadreJ)
                        }
                        if(costoAreaa.nombreCuentaPadreJ == 'PASIVO'){
                            columns.push('2 '+costoAreaa.nombreCuentaPadreJ)
                        }
                        if(costoAreaa.nombreCuentaPadreJ == 'INGRESO'){
                            columns.push('3 '+costoAreaa.nombreCuentaPadreJ)
                        }
                        if(costoAreaa.nombreCuentaPadreJ == 'EGRESO'){
                            columns.push('4 '+costoAreaa.nombreCuentaPadreJ)
                        }
                        if(costoAreaa.nombreCuentaPadreJ != 'EGRESO' && costoAreaa.nombreCuentaPadreJ != 'ACTIVO' && costoAreaa.nombreCuentaPadreJ != 'PASIVO' || costoAreaa.nombreCuentaPadreJ != 'INGRESO'){
                            columns.push(costoAreaa.nombreCuentaPadreJ)
                        }
                    } */
                    columns.push(costoAreaa.nombreCuentaPadreJ)
                    columns.push(costoAreaa.nombreCuentaGrupoJ)
                    columns.push(costoAreaa.nombreCuentaSubGrupoJ)
                    columns.push(costoAreaa.nombre_cuenta)
                    columns.push(costoAreaa.numero_comprobante)
                    columns.push($scope.fechaATexto(costoAreaa.fecha_comprobante))
                    columns.push(costoAreaa.nombre_cuenta_auxiliar?$scope.quitarEspacioTexto(costoAreaa.nombre_cuenta_auxiliar): "") 
                    columns.push(costoAreaa.nombre_area)  
                    columns.push(costoAreaa.nombre_centro_costos)
                    columns.push(costoAreaa.debe_bs) 
                    columns.push(costoAreaa.haber_bs)
                    if (costoAreaa.eliminado == 1) {
                        columns.push("ANULADO") 
                    }else {
                        columns.push("VIGENTE") 
                    }
                    columns.push(costoAreaa.clasif_cuenta)
                    columns.push(costoAreaa.clasif_nombre_mov)
                        const meses = ["1-ENERO", "2-FEBRERO", "3-MARZO", "4-ABRIL", "5-MAYO", "6-JUNIO", "7-JULIO", "8-AGOSTO", "9-SEPTIEMBRE", "10-OCTUBRE", "11-NOVIEMBRE", " 12-DICIEMBRE"];
                        const d = new Date(costoAreaa.fecha_comprobante);
                    columns.push(meses[d.getMonth()])
                    columns.push(costoAreaa.debe_sus) 
                    columns.push(costoAreaa.haber_sus)
                    
                    datoss.push(columns);
                } 
                if(lista.asientos.length>0){
                    $scope.generarTablaPivot(datoss);
                }else{
                    SweetAlert.swal("",'No Existen Datos', "warning");
                }
                    blockUI.stop(); 
            }) 
        }

        // TABLAS DINAMICAS PARA CONTABLE2
        $scope.filtrarCentroCostosTAblasDinamicc = function (reporte) {
            ListaCentroCostoTablaDinamicas($scope.usuario.id_empresa,reporte.gestion,reporte.mes).then(function (lista) {
                var datas = [["T/COMP","GRUPO","SUBGRUPO","GENERICA","CUENTA",'N°/COMP','FECHA','AUXILIAR',"AREA","CENTRO","DEBE","HABER","ESTADO","CLASIFICACIÓN", "MOVIMIENTO", "MES"]]
            
                for (var i = 0; i < lista.asientos.length; i++) {
                    var costoAreaa =lista.asientos[i]
                    var columns = [];
            
                    columns.push(costoAreaa.tipo_comprobante)
                    columns.push(costoAreaa.nombreCuentaPadreJ)
                    columns.push(costoAreaa.nombreCuentaGrupoJ)
                    columns.push(costoAreaa.nombreCuentaSubGrupoJ)
                    columns.push(costoAreaa.nombre_cuenta)
                    columns.push(costoAreaa.numero_comprobante)
                    columns.push($scope.fechaATexto(costoAreaa.fecha_comprobante))
                    columns.push(costoAreaa.nombre_cuenta_auxiliar?$scope.quitarEspacioTexto(costoAreaa.nombre_cuenta_auxiliar): "") 
                    columns.push(costoAreaa.nombre_area)  
                    columns.push(costoAreaa.nombre_centro_costos)
                    columns.push(costoAreaa.debe_bs) 
                    columns.push(costoAreaa.haber_bs) 
                    if (costoAreaa.eliminado == 1) {
                        columns.push("ANULADO") 
                    }else {
                        columns.push("VIGENTE") 
                    }  
                    columns.push(costoAreaa.clasif_cuenta)
                    columns.push(costoAreaa.clasif_nombre_mov)
                        const meses = ["1-ENERO", "2-FEBRERO", "3-MARZO", "4-ABRIL", "5-MAYO", "6-JUNIO", "7-JULIO", "8-AGOSTO", "9-SEPTIEMBRE", "10-OCTUBRE", "11-NOVIEMBRE", " 12-DICIEMBRE"];
                        const d = new Date(costoAreaa.fecha_comprobante);
                    columns.push(meses[d.getMonth()])
                      
                    datas.push(columns);
                } 
                if(lista.asientos.length>0){
                    $("#tabla-dinamicaII").pivotUI(
                        datas, {
                            rows: ["T/COMP"],
                            cols: ["AREA"],
                            vals: ["DEBE"],
                            aggregatorName: "Suma",
                            rendererName: "Mapa de calor de filas",
                            renderers: $.extend(
                                $.pivotUtilities.renderers, 
                                $.pivotUtilities.plotly_renderers,
                                $.pivotUtilities.export_renderers
                          )
                        },
                        false, "es");
                }else{
                    SweetAlert.swal("",'No Existen Datos', "warning");
                }
                    blockUI.stop(); 
             })
        }

        




        




    $scope.inicio();


    /* DABLA DINAMICA DE FLEXMOSTER */
   /*  var pivot = new Flexmonster({
        container: "#pivot-container",
        componentFolder: "https://cdn.flexmonster.com/",
        report: {
            dataSource: {
                filename: "data/sales.csv"
            }
        },
        width: "100%",
        height: 600,
        toolbar: true
    }); */


/* 
    var pivot = new Flexmonster({
        container: "#pivot-container",
        componentFolder: "https://cdn.flexmonster.com/",
        report: {
        dataSource: {
            filename: "data/sales.csv"
        },
        "slice": {
            "rows": [{
            "uniqueName": "Salesperson"
            }],
            "columns": [{
                "uniqueName": "Month",
                "filter": {
                "members": [
                    "month.[june]",
                    "month.[july]",
                    "month.[august]"
                ]
                }
            },
            {
                "uniqueName": "[Measures]"
            }
            ],
            "measures": [{
            "uniqueName": "Revenue",
            "aggregation": "sum"
            }],
            "sorting": {
            "column": {
                "type": "desc",
                "tuple": [],
                "measure": "Revenue"
            }
            }
        },
        "formats": [{
            "name": "",
            "thousandsSeparator": ",",
            "decimalSeparator": ".",
            "decimalPlaces": 2,
            "currencySymbol": "$",
            "currencySymbolAlign": "left",
            "nullValue": "",
            "textAlign": "right",
            "isPercent": false
        }]
        },
        width: "100%",
        height: 600,
        toolbar: true
    });
   */







}]);



