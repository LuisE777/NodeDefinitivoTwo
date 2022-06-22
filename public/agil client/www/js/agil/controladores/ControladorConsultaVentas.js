angular.module('agil.controladores')

.controller('ControladorConsultaVentas', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','ClasesTipo', 'SweetAlert',
function($scope,$localStorage,$location,$templateCache,$route,blockUI,$timeout,ClasesTipo,SweetAlert){
    blockUI.start();

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        // ejecutarScriptsConsultaContableDos();
        blockUI.stop();
    });
	$scope.$on('$routeChangeStart', function(next, current) { 

	});
	$scope.usuario=JSON.parse($localStorage.usuario);
	$scope.inicio = function () {
        $scope.obtenerGestiones();
        $scope.sucursales = $scope.obtenerSucursales();
        $scope.reporte = {}
        $scope.reporte.sucursal = ($scope.sucursales.length == 1) ? $scope.sucursales[0] : null;
        ejecutarScriptsVentasMensuales();
    }
    $scope.obtenerSucursales = function () {
        var sucursales = [];

        if ($scope.usuario.sucursalesUsuario.length > 1) {
            sucursales.push({ id: 0, nombre: "TODOS" });
        }
        for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
            sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
        }
        return sucursales;
    }
    $scope.obtenerGestiones = function () {
        blockUI.start();
        var promesa = ClasesTipo("GTN");
        promesa.then(function (entidad) {
            $scope.gestiones = entidad.clases;
            blockUI.stop();
        });
    }

    // TABLAS DINAMICAS PARA VENTAS1
    $scope.generarTablaPivotCompras = function (datos){
        var pivot = new WebDataRocks({
            container: "#tablaDinamicaVentas",
            toolbar: true,
            beforetoolbarcreated: customizeToolbar,
            report: {
                dataSource: {
                    data: datos
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
                });
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
    $scope.generarTablaPivotCompras('');


    // TABLAS DINAMICAS PARA VENTAS2



    





    







    $scope.inicio();

}]);