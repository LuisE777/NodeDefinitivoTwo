angular.module('agil.controladores')

.controller('ControladorConsultaContableDos', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','ClasesTipo','SweetAlert','ListaProformaTablaDinamicas',
function($scope,$localStorage,$location,$templateCache,$route,blockUI,$timeout,ClasesTipo,SweetAlert,ListaProformaTablaDinamicas){
    blockUI.start();

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsConsultaContableDos();
        blockUI.stop();
    });
	$scope.$on('$routeChangeStart', function(next, current) { 

	});
	$scope.usuario=JSON.parse($localStorage.usuario);
	
	$scope.inicio=function(){
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
	
	

        // TABLAS DINAMICAS PARA PROFORMAS1
        $scope.generarTablaPivotProforma = function (datos){
            var pivot = new WebDataRocks({
                container: "#tablaDinamicaProforma",
                toolbar: true,
                beforetoolbarcreated: customizeToolbar,
                report: {
                    dataSource: {
                        data: datos
                    },
                    slice: {
                        rows: [{
                            "uniqueName": "AREA"
                        }],
                        measures: [{
                            "uniqueName": "IMPORTE",
                                "aggregation": "sum",
                                "format": "currency"
                            }],
                        reportFilters: [{
                            "uniqueName": "ESTADO",
                                    "filter": {
                                        "members": ["ESTADO.FACTURADO","ESTADO.PENDIENTE"]
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
            
                var chart = new google.visualization.ColumnChart(document.getElementById('googlechart-containerr'));
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
        $scope.generarTablaPivotProforma('');


        $scope.filtrarProformaTablasDinamic = function (reportee) {
            blockUI.start()
            ListaProformaTablaDinamicas($scope.usuario.id_empresa,reportee.gestion,reportee.mes).then(function (lista) {
                var datoss = [["AREA","CENTRO","FECHA-POF","IMPORTE","PERIODO","CLIENTE","N°/PROF","ESTADO","ACT/ECO", "T/SERVICIO"]]
        
                for (var i = 0; i < lista.asientos.length; i++) {
                    var costoAreaa =lista.asientos[i]
                    var columns = [];
        
                    columns.push(costoAreaa.nombre_areaCosto)
                    columns.push(costoAreaa.nombre_centroCosto)
                    columns.push($scope.fechaATexto(costoAreaa.fecha_proforma))
                    columns.push(costoAreaa.importe_detalleProforma) 
                    columns.push(((costoAreaa.periodoMes_proforma)+1 + '.- ' + costoAreaa.periodoAnio_proforma + '-' + $scope.meses[costoAreaa.periodoMes_proforma].nombre ))
                    columns.push(costoAreaa.nombre_cliente)
                    columns.push(costoAreaa.numero_proforma)
                    if (costoAreaa.estado_proforma) {
                        columns.push("ANULADO") 
                    }else if (costoAreaa.estado_proforma==0 && costoAreaa.nroFactura_proforma !=null) {
                        columns.push("FACTURADO") 
                    }else {
                        columns.push("PENDIENTE") 
                    }
                    columns.push(costoAreaa.nombreActividad_proforma)
                    columns.push(costoAreaa.nombreServicio_servicio)

                datoss.push(columns);
                } 
                if(lista.asientos.length>0){
                   $scope.generarTablaPivotProforma(datoss);
                }else{
                    SweetAlert.swal("",'No Existen Datos', "warning");
                }
                    blockUI.stop(); 
            }) 
        }
        // TABLAS DINAMICAS PARA PROFORMAS2
        $scope.filtrarProformaTablasDinamicc = function (reportee) {
            ListaProformaTablaDinamicas($scope.usuario.id_empresa,reportee.gestion,reportee.mes).then(function (lista) {
                var datoss = [["AREA","CENTRO","FECHA-POF","IMPORTE","PERIODO","CLIENTE","N°/PROF","ESTADO","ACT/ECO", "T/SERVICIO"]]
        
                for (var i = 0; i < lista.asientos.length; i++) {
                    var costoAreaa =lista.asientos[i]
                    var columns = [];
        
                    columns.push(costoAreaa.nombre_areaCosto)
                    columns.push(costoAreaa.nombre_centroCosto)
                    columns.push($scope.fechaATexto(costoAreaa.fecha_proforma))
                    columns.push(costoAreaa.importe_detalleProforma) 
                    columns.push(((costoAreaa.periodoMes_proforma)+1 + '.- ' + costoAreaa.periodoAnio_proforma + '-' + $scope.meses[costoAreaa.periodoMes_proforma].nombre ))
                    columns.push(costoAreaa.nombre_cliente)
                    columns.push(costoAreaa.numero_proforma)
                    if (costoAreaa.estado_proforma) {
                        columns.push("ANULADO") 
                    }else if (costoAreaa.estado_proforma==0 && costoAreaa.nroFactura_proforma !=null) {
                        columns.push("FACTURADO") 
                    }else {
                        columns.push("PENDIENTE") 
                    }
                    columns.push(costoAreaa.nombreActividad_proforma)
                    columns.push(costoAreaa.nombreServicio_servicio)

                datoss.push(columns);
                } 
                if(lista.asientos.length>0){
                    $("#tablaDinamicaProformaII").pivotUI(
                        datoss, {
                            rows: ["AREA"],
                            vals: ["IMPORTE"],
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

}]);



