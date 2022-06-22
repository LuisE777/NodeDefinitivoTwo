angular.module('agil.controladores')

.controller('ControladorConsultaCompras', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','ClasesTipo','ReporteComprasMensualesDatos', 'SweetAlert','ReporteComprasDatosTablasDinamicas',
function($scope,$localStorage,$location,$templateCache,$route,blockUI,$timeout,ClasesTipo, ReporteComprasMensualesDatos, SweetAlert,ReporteComprasDatosTablasDinamicas){
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






 $scope.generarTablaPivotCompras = function (datos){
            var pivot = new WebDataRocks({
                container: "#tablaDinamicaCompras",
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

        // TABLAS DINAMICAS PARA COMPRAS1
        $scope.filtrarComprasTablasDinamic =  function (reporte) {
            SweetAlert.swal({
                title:'',
                icon: 'info',
                iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
                text: 'Descargando Datos, por favor espere esto puede tardar ...',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            SweetAlert.showLoading()
            inicio = new Date($scope.convertirFecha(reporte.fechaInicioTexto));
            fin = new Date($scope.convertirFecha(reporte.fechaFinTexto));
            blockUI.noOpen = true;
            SweetAlert.showLoading()
            var promesa = ReporteComprasDatosTablasDinamicas($scope.usuario.id_empresa, reporte.sucursal.id, inicio, fin);
            promesa.then(function (datos) {
                //var detallesCompra = datos.compras;
                var data = [[
                    "1 FECHA-FACT",
                    "2 N° FACT",
                    "3 NIT/CI",
                    "4 NOMB/RAZON SOCIAL",
                    "5 CÓDIGO",

                    "6 PRODUCTO",
                    "7 UNID-MEDIDA",
                    "8 GRUPO/PROD",
                    "9 CANTIDAD",
                    "10 PRECIO/U",

                    "11 TOTAL",
                    "12 IMPORTE-ICE-IEHD-TASAS",
                    "13 EXENTOS",
                    "14 SUBTOTAL",
                    "15 DESCT-BONIF-REBAJ",

                    "16 IMPORTE BASE CF",
                    "17 CF",
                    "18 SUCURSAL",
                    "19 ALMACEN",
                    "20 USUARIO",

                    "21 TIPO-PAGO",
                    "22 PLAZO-CREDITO",
                    "23 TIPO-COMPRA" ,
                    "24 COMPRA-REALIZADA",
                    "25 TIPO-INGRESO"
                ]]
                if(datos.compras.length > 0){
                    for (var i = 0; i < datos.compras.length; i++) {
                        var compraa =datos.compras[i]
                        var columns = [];
                        columns.push(compraa.fecha_compra ?  new Date(compraa.fecha_compra).toJSON().slice(0,10).split('-').reverse().join('/') : "-");
                        columns.push(compraa.num_Factura_compra ? compraa.num_Factura_compra : "-");
                        columns.push(compraa.nit_proveedor ? compraa.nit_proveedor : "-");
                        columns.push(compraa.razon_social_proveedor ? compraa.razon_social_proveedor : "-");
                        columns.push(compraa.codogo_producto ? compraa.codogo_producto : "-");

                        columns.push(compraa.nombre_producto ? compraa.nombre_producto : "-");
                        columns.push(compraa.unid_medida_producto ? compraa.unid_medida_producto : "-");
                        columns.push(compraa.nombre_grupo_producto ? compraa.nombre_grupo_producto : "-");
                        columns.push(compraa.cantidad_detalle ? compraa.cantidad_detalle : "-");
                        columns.push(compraa.pu_detalle ? compraa.pu_detalle : "-");

                        columns.push(compraa.importe_detalle ? compraa.importe_detalle : 0);
                        columns.push(compraa.ice_detalle ? compraa.ice_detalle : 0);
                        columns.push(compraa.excento_detalle ? compraa.excento_detalle : 0);
                        columns.push((compraa.importe_detalle)-(compraa.ice_detalle));
                        columns.push(compraa.descuento_detalle ? compraa.descuento_detalle : 0);

                        columns.push(compraa.total_detalle ? compraa.total_detalle : 0);
                        columns.push(compraa.total_detalle ? number_format_negativo_to_positvo(compraa.total_detalle * 0.13, 2) : 0);
                        columns.push(compraa.nombre_sucursal ? compraa.nombre_sucursal : "-");
                        columns.push(compraa.nombre_almacen ? compraa.nombre_almacen : "-");
                        columns.push(compraa.nombre_usuario ? compraa.nombre_usuario : "-");

                        columns.push(compraa.nombTipoPago_compra ? compraa.nombTipoPago_compra : "-");
                        columns.push(compraa.diasCredito_compra ? compraa.diasCredito_compra : "-");
                            if (compraa.id_productoOservicio_compra == 0) {
                                columns.push("SERVICIO") 
                            }else {
                                columns.push("PRODUCTO") 
                            };
                            if (compraa.id_compra == compraa.id_cajaChica_compra) {
                                columns.push("CAJA CHICA") 
                            }else {
                                columns.push("COMPRA GENERAL") 
                            };
                            columns.push(compraa.nombre_tipo_ingreso ? compraa.nombre_tipo_ingreso : "-");

                        data.push(columns);
                    }
                    if(datos.compras.length>0){
                        $scope.generarTablaPivotCompras(data);
                     }else{
                         SweetAlert.swal("",'No Existen Datos', "warning");
                     }
                     swal.close();
                }else{
                    SweetAlert.hideLoading();
                    SweetAlert.swal("", "No se encontraron compras", "warning");
                }
            });
        }

        // TABLAS DINAMICAS PARA COMPRAS2
        $scope.filtrarComprasTablasDinamicc = function (reportee) {
            inicio = new Date($scope.convertirFecha(reportee.fechaInicioTexto));
            fin = new Date($scope.convertirFecha(reportee.fechaFinTexto));
            var promesa = ReporteComprasDatosTablasDinamicas($scope.usuario.id_empresa, reportee.sucursal.id, inicio, fin);
            promesa.then(function (datos) {

                var data = [[
                    "1 FECHA-FACT",
                    "2 N° FACT",
                    "3 NIT/CI",
                    "4 NOMB/RAZON SOCIAL",
                    "5 CÓDIGO",

                    "6 PRODUCTO",
                    "7 UNID-MEDIDA",
                    "8 GRUPO/PROD",
                    "9 CANTIDAD",
                    "10 PRECIO/U",

                    "11 TOTAL",
                    "12 IMPORTE-ICE-IEHD-TASAS",
                    "13 EXENTOS",
                    "14 SUBTOTAL",
                    "15 DESCT-BONIF-REBAJ",

                    "16 IMPORTE BASE CF",
                    "17 CF",
                    "18 SUCURSAL",
                    "19 ALMACEN",
                    "20 USUARIO",

                    "21 TIPO-PAGO",
                    "22 PLAZO-CREDITO",
                    "23 TIPO-COMPRA" ,
                    "24 COMPRA-REALIZADA",
                    "25 TIPO-INGRESO"
                ]]
                    for (var i = 0; i < datos.compras.length; i++) {
                        var compraa =datos.compras[i]
                        var columns = [];
                        columns.push(compraa.fecha_compra ?  new Date(compraa.fecha_compra).toJSON().slice(0,10).split('-').reverse().join('/') : "-");
                        columns.push(compraa.num_Factura_compra ? compraa.num_Factura_compra : "-");
                        columns.push(compraa.nit_proveedor ? compraa.nit_proveedor : "-");
                        columns.push(compraa.razon_social_proveedor ? compraa.razon_social_proveedor : "-");
                        columns.push(compraa.codogo_producto ? compraa.codogo_producto : "-");

                        columns.push(compraa.nombre_producto ? compraa.nombre_producto : "-");
                        columns.push(compraa.unid_medida_producto ? compraa.unid_medida_producto : "-");
                        columns.push(compraa.nombre_grupo_producto ? compraa.nombre_grupo_producto : "-");
                        columns.push(compraa.cantidad_detalle ? compraa.cantidad_detalle : "-");
                        columns.push(compraa.pu_detalle ? compraa.pu_detalle : "-");

                        columns.push(compraa.importe_detalle ? compraa.importe_detalle : 0);
                        columns.push(compraa.ice_detalle ? compraa.ice_detalle : 0);
                        columns.push(compraa.excento_detalle ? compraa.excento_detalle : 0);
                        columns.push((compraa.importe_detalle)-(compraa.ice_detalle));
                        columns.push(compraa.descuento_detalle ? compraa.descuento_detalle : 0);

                        columns.push(compraa.total_detalle ? compraa.total_detalle : 0);
                        columns.push(compraa.total_detalle ? number_format_negativo_to_positvo(compraa.total_detalle * 0.13, 2) : 0);
                        columns.push(compraa.nombre_sucursal ? compraa.nombre_sucursal : "-");
                        columns.push(compraa.nombre_almacen ? compraa.nombre_almacen : "-");
                        columns.push(compraa.nombre_usuario ? compraa.nombre_usuario : "-");

                        columns.push(compraa.nombTipoPago_compra ? compraa.nombTipoPago_compra : "-");
                        columns.push(compraa.diasCredito_compra ? compraa.diasCredito_compra : "-");
                            if (compraa.id_productoOservicio_compra == 0) {
                                columns.push("SERVICIO") 
                            }else {
                                columns.push("PRODUCTO") 
                            };
                            if (compraa.id_compra == compraa.id_cajaChica_compra) {
                                columns.push("CAJA CHICA") 
                            }else {
                                columns.push("COMPRA GENERAL") 
                            };
                            columns.push(compraa.nombre_tipo_ingreso ? compraa.nombre_tipo_ingreso : "-");

                        data.push(columns);
                    } 
                if(datos.compras.length > 0){
                    $("#tablaDinamicaComprasII").pivotUI(
                        data, {
                            rows: ["1 FECHA-FACT"],
                            vals: ["11 TOTAL"],
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

       /*  $scope.filtrarComprasTablasDinamicc = function (reportee) {
            ListaCostosTablaDinamicas($scope.usuario.id_empresa,reportee.gestion,reportee.mes).then(function (lista) {
                var datoss = [["AREA","CENTRO","TOTAL-INGRESOS","TOTAL-GASTOS"]]

                for (var i = 0; i < lista.asientos.length; i++) {
                    var costoAreaa =lista.asientos[i]
                    var columns = [];

                    columns.push(costoAreaa.area)
                    columns.push(costoAreaa.centro)
                    columns.push(costoAreaa.importe_proforma + costoAreaa.importe_ingresos)
                    columns.push(costoAreaa.importe_gastos)

                datoss.push(columns);
                } 
                if(lista.asientos.length>0){
                    $("#tablaDinamicaComprasII").pivotUI(
                        datoss, {
                            rows: ["AREA"],
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
        } */




    





    







    $scope.inicio();

}]);