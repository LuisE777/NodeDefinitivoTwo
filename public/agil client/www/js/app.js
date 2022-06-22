
angular.module('agil', ['indexedDB', 'oc.lazyLoad', 'ngRoute', 'agil.controladores',
    'agil.servicios', 'agil.directivas', 'agil.filtros', 'checklist-model',
    'blockUI', 'ngStorage', 'ui.bootstrap', 'uiGmapgoogle-maps', 'isteven-multi-select',
    'chart.js', 'ngMessages', 'colorpicker', 'angular-table', 'ui.select', 'infinite-scroll', 'swangular', 'ngMask', 'ui-iconpicker', 'timer', '720kb.datepicker', 'ui.tinymce'])// 'btford.socket-io',

    .config(['$routeProvider', 'uiGmapGoogleMapApiProvider', '$httpProvider', 'ChartJsProvider',
        '$ocLazyLoadProvider', '$compileProvider', 'blockUIConfig', '$indexedDBProvider', 'indexedDBConfig', function ($routeProvider, uiGmapGoogleMapApiProvider,
            $httpProvider, ChartJsProvider, $ocLazyLoadProvider, $compileProvider, blockUIConfig, $indexedDBProvider, indexedDBConfig) {
            indexedDBConfig($indexedDBProvider);


            uiGmapGoogleMapApiProvider.configure({
                // libraries: 'geometry,visualization'
                libraries: 'places'
            })

            // Provide a custom template to use
            blockUIConfig.message = 'Cargando ...';
            // blockUIConfig.template = '<div class="block-ui-overlay"></div><div class="block-ui-message-container" aria-live="assertive" aria-atomic="true"><div class="progress" data-percentage="{{100 - ((state.blockCount * 10) / 100) | number:0}}"><span class="progress-left"><span class="progress-bar"></span></span><span class="progress-right"><span class="progress-bar"></span></span><div class="progress-value"><div>{{100 - ((state.blockCount * 10) / 100) | number:0}}%<br><span>{{state.message}}</span></div></div></div></div>';
            blockUIConfig.template = '<div class="block-ui-overlay"></div><div class="block-ui-message-container" aria-live="assertive" aria-atomic="true"><div class="progress" data-percentage="{{countPorcentage(state)}}"><span class="progress-left"><span class="progress-bar"></span></span><span class="progress-right"><span class="progress-bar"></span></span><div class="progress-value"><div>{{countPorcentage(state)}}%<br><span>{{state.message}}</span></div></div></div></div>';
            blockUIConfig.delay = 1;
            blockUIConfig.blockBrowserNavigation = true;

            $compileProvider.debugInfoEnabled(false);

            ChartJsProvider.setOptions({
                chartColors: ['#FF5252', '#FF8A80'],
                colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                responsive: true
            });
            // Configure all line charts
            ChartJsProvider.setOptions('line', {
                showLines: true
            });

            //Config For ocLazyLoading
            $ocLazyLoadProvider.config({
                'debug': true, // For debugging 'true/false'
                'events': true, // For Event 'true/false'
                // 'modules': [
                //     { // Set modules initially
                //         name : 'usuarios', // State1 module
                //         files: ['js/sys/controladores/controladoresUsuario.js']
                //     }
                // ]
            });

            $routeProvider
                .when('/', {
                    controller: 'ControladorPrincipal',
                    templateUrl: 'templates/inicio.html',
                    title: 'AGIL'
                })
                .when('/empresas', {
                    controller: 'ControladorEmpresas',
                    templateUrl: 'templates/agil/empresas.html',
                    title: 'AGIL - Empresas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresEmpresa.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('empresas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })

                .when('/usuarios', {
                    controller: 'ControladorUsuarios',
                    templateUrl: 'templates/sys/usuarios.html',
                    title: 'AGIL - Usuarios',
                    resolve: {
                        loadMyService: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/sys/servicios/serviciosUsuario.js');
                        }],
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/sys/controladores/controladoresUsuario.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('usuarios')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/clientes', {
                    controller: 'ControladorClientes',
                    templateUrl: 'templates/agil/clientes.html',
                    title: 'AGIL - Clientes',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresCliente.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('clientes')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/proveedores', {
                    controller: 'ControladorProveedores',
                    templateUrl: 'templates/agil/proveedores.html',
                    title: 'AGIL - Proveedores',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresProveedor.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('proveedores')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/productos', {
                    controller: 'ControladorProductos',
                    templateUrl: 'templates/agil/productos.html',
                    title: 'AGIL - Productos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresProducto.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('productos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/conceptos', {
                    controller: 'ControladorConceptos',
                    templateUrl: 'templates/sys/conceptos.html',
                    title: 'AGIL - Conceptos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/sys/controladores/controladoresConcepto.js');
                        }],
                        /* "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('conceptos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        } */
                    }
                })
                .when('/sucursales', {
                    controller: 'ControladorSucursales',
                    templateUrl: 'templates/agil/sucursales.html',
                    title: 'AGIL - Sucursales',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresSucursal.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('sucursales')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/dosificaciones', {
                    controller: 'ControladorDosificaciones',
                    templateUrl: 'templates/agil/dosificaciones.html',
                    title: 'AGIL - Dosificaciones',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresDosificacion.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('dosificaciones')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/codigo-control', {
                    controller: 'ControladorCodigoControl',
                    templateUrl: 'templates/agil/codigo-control.html',
                    title: 'AGIL - Codigo Control',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresCodigoControl.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('codigo-control')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/compras', {
                    controller: 'ControladorCompras',
                    templateUrl: 'templates/agil/compras.html',
                    title: 'AGIL - Compras',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresCompra.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('compras')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/inventario', {
                    controller: 'ControladorInventarios',
                    templateUrl: 'templates/agil/inventarios.html',
                    title: 'AGIL - Inventarios',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresInventario.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('inventario')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/salidas', {
                    controller: 'ControladorVentas',
                    templateUrl: 'templates/agil/ventas.html',
                    title: 'AGIL - Salidas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresVenta.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('salidas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/facturas', {
                    controller: 'ControladorFacturas',
                    templateUrl: 'templates/agil/configuraciones-factura.html',
                    title: 'AGIL - Facturas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresFactura.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('facturas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/libro-compras', {
                    controller: 'ControladorLibroCompras',
                    templateUrl: 'templates/agil/libro-compras.html',
                    title: 'AGIL - Libro Compras',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('libro-compras')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/libro-ventas', {
                    controller: 'ControladorLibroVentas',
                    templateUrl: 'templates/agil/libro-ventas.html',
                    title: 'AGIL - Libro Ventas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('libro-ventas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/reporte-almacenes', {
                    controller: 'ControladorReporteAlmacenes',
                    templateUrl: 'templates/agil/reporte-almacenes.html',
                    title: 'AGIL - Reporte Almacenes',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('reporte-almacenes')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })

                .when('/reporte-rrhh', {
                    controller: 'ControladorRrhh',
                    templateUrl: 'templates/agil/reporte-rrhh.html',
                    title: 'AGIL - Reportes RRHH',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('reporte-rrhh')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })

                .when('/ventas-mensuales', {
                    controller: 'ControladorVentasMensuales',
                    templateUrl: 'templates/agil/ventas-mensuales.html',
                    title: 'AGIL - Ventas Mensuales',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('ventas-mensuales')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/compras-mensuales', {
                    controller: 'ControladorComprasMensuales',
                    templateUrl: 'templates/agil/compras-mensuales.html',
                    title: 'AGIL - Compras Mensuales',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('compras-mensuales')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/estado-resultados-no-contable', {
                    controller: 'ControladorEstadoResultadosNoContable',
                    templateUrl: 'templates/agil/estado-resultados-no-contable.html',
                    title: 'AGIL - Estado Resultados No Contable',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('estado-resultados-no-contable')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/configuraciones-app', {
                    controller: 'ControladorConfiguracionesApp',
                    templateUrl: 'templates/agil/configuraciones-app.html',
                    title: 'AGIL - Configuraciones App',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresConfiguracionApp.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('configuraciones-app')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/rutas', {
                    controller: 'ControladorRutas',
                    templateUrl: 'templates/agil/rutas.html',
                    title: 'AGIL - Rutas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresRuta.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('rutas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/estado-cuentas-cliente', {
                    controller: 'ControladorEstadoCuentasClientes',
                    templateUrl: 'templates/agil/estado-cuentas-cliente.html',
                    title: 'AGIL - Estado Cuentas Cliente',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('estado-cuentas-cliente')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/estado-cuentas-proveedor', {
                    controller: 'ControladorEstadoCuentasProveedores',
                    templateUrl: 'templates/agil/estado-cuentas-proveedor.html',
                    title: 'AGIL - Estado Cuentas Proveedor',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresReporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('estado-cuentas-proveedor')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/seguimiento-app', {
                    controller: 'ControladorSeguimientoApp',
                    templateUrl: 'templates/agil/seguimiento-app.html',
                    title: 'AGIL - Seguimiento App',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresSeguimientoApp.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('seguimiento-app')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/pantalla-cliente', {
                    controller: 'ControladorPantallaCliente',
                    templateUrl: 'templates/agil/pantalla-cliente.html',
                    title: 'AGIL - Pantalla Clientes',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresSeguimientoApp.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('pantalla-cliente')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/pantalla-despacho', {
                    controller: 'ControladorPantallaDespacho',
                    templateUrl: 'templates/agil/pantalla-despacho.html',
                    title: 'AGIL - Pantalla Despachos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresPantalla.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('pantalla-despacho')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/bancos', {
                    controller: 'ControladorBancos',
                    templateUrl: 'templates/agil/bancos.html',
                    title: 'AGIL - Bancos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresBanco.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('bancos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/cierres-caja', {
                    controller: 'ControladorCierresCaja',
                    templateUrl: 'templates/agil/cierres-caja.html',
                    title: 'AGIL - Cierres Caja',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresCierreCaja.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('cierres-caja')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/mesa', {
                    controller: 'ControladorMesa',
                    templateUrl: 'templates/agil/mesa.html',
                    title: 'AGIL - Mesa',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresMesa.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('mesa')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/cotizacion', {
                    controller: 'ControladorCotizacion',
                    templateUrl: 'templates/agil/cotizacion.html',
                    title: 'AGIL - Cotizacion',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresCotizacion.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('cotizacion')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/contabilidad-cuenta', {
                    controller: 'ControladorContabilidadCuenta',
                    templateUrl: 'templates/agil/contabilidad-cuenta.html',
                    title: 'AGIL - Contabilidad Cuenta',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresContabilidadCuenta.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('contabilidad-cuenta')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/comprobantes', {
                    controller: 'ControladorComprobantes',
                    templateUrl: 'templates/agil/comprobantes.html',
                    title: 'AGIL - Comprobantes',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresAsientosContables.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('comprobantes')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/pacientes', {
                    controller: 'ControladorPacientes',
                    templateUrl: 'templates/agil/pacientes.html',
                    title: 'AGIL - Pacientes',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresPacientes.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('pacientes')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/mantenimiento', {
                    controller: 'ControladorVehiculos',
                    templateUrl: 'templates/agil/vehiculos.html',
                    title: 'AGIL - Mantenimiento',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresVehiculos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('mantenimiento')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/mantenimientos', {
                    controller: 'ControladorMantenimientos',
                    templateUrl: 'templates/agil/mantenimientos.html',
                    title: 'AGIL - Mantenimientos',
                    resolve: {
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('mantenimientos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/rrhh', {
                    controller: 'ControladorRecursosHumanos',
                    templateUrl: 'templates/agil/rrhh.html',
                    title: 'AGIL - RRHH',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresRecursosHumanos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('rrhh')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/planilla-sueldos', {
                    controller: 'ControladorPlanillaSueldos',
                    templateUrl: 'templates/agil/planilla-sueldos.html',
                    title: 'AGIL - Planilla de Sueldos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaSueldos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('planilla-sueldos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/incremento-salarial', {
                    controller: 'ControladorIncrementoSalarial',
                    templateUrl: 'templates/agil/incremento-salarial.html',
                    title: 'AGIL - Incremento Salarial',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorIncrementoSalarial.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('incremento-salarial')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/planilla-rc-iva', {
                    controller: 'ControladoresRCIVA',
                    templateUrl: 'templates/agil/planilla-rc-iva.html',
                    title: 'AGIL - Planilla Rc-Iva',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresRCIVA.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('planilla-rc-iva')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/planilla-retroactivos', {
                    controller: 'ControladoresPlanillaRetroactivos',
                    templateUrl: 'templates/agil/planilla-retroactivos.html',
                    title: 'AGIL - Planillas Retroactivas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresPlanillaRetroactivos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('planilla-retroactivos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/planilla-cargas-sociales', {
                    controller: 'ControladoresPlanillaCargasSociales',
                    templateUrl: 'templates/agil/planilla-cargas-sociales.html',
                    title: 'AGIL - Planillas Cargas Sociales',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaCargasSociales.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('planilla-cargas-sociales')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/operaciones', {
                    controller: 'ControladorOperaciones',
                    templateUrl: 'templates/agil/operaciones.html',
                    title: 'AGIL - Operaciones',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresOperaciones.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('operaciones')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/gtm-estibaje', {
                    controller: 'ControladorGtmEstibaje',
                    templateUrl: 'templates/gtm/estibaje.html',
                    title: 'AGIL - Gtm Estibaje',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmEstibaje.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('gtm-estibaje')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/gtm-transportista', {
                    controller: 'ControladorGtmTransportista',
                    templateUrl: 'templates/gtm/transportista.html',
                    title: 'AGIL - Gtm Transportista',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmTransportista.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('gtm-transportista')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/gtm-grupo-estibaje', {
                    controller: 'ControladorGtmGrupoEstibaje',
                    templateUrl: 'templates/gtm/grupo-estibaje.html',
                    title: 'AGIL - Gtm Grupo Estibaje',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmGrupoEstibaje.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('gtm-grupo-estibaje')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/proformas', {
                    controller: 'controladorProformas',
                    templateUrl: 'templates/agil/proformas.html',
                    title: 'AGIL - Proformas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresProformas.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('proformas')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/gtm-destino', {
                    controller: 'ControladorGtmDestino',
                    templateUrl: 'templates/gtm/destino.html',
                    title: 'AGIL - Gtm Destino',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmDestino.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('gtm-destino')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/gtm-despachos', {
                    controller: 'ControladorGtmDespacho',
                    templateUrl: 'templates/gtm/despacho.html',
                    title: 'AGIL - Gtm Despachos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmDespacho.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('gtm-despachos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/farmacia', {
                    controller: 'ControladoresFarmacia',
                    templateUrl: 'templates/agil/farmacia.html',
                    title: 'AGIL - Farmacia',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresFarmacia.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('farmacia')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/polifuncionalidad', {
                    controller: 'controladorPolifuncionalidad',
                    templateUrl: 'templates/agil/polifuncionalidad.html',
                    title: 'AGIL - Polifuncionalidad',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresPolifuncionalidad.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('polifuncionalidad')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/transacciones', {
                    controller: 'controladorTransacciones',
                    templateUrl: 'templates/agil/transacciones.html',
                    title: 'AGIL - Transacciones',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresTransacciones.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('transacciones')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/pedidos', {
                    controller: 'ControladorPedidos',
                    templateUrl: 'templates/agil/pedidos.html',
                    title: 'AGIL - Pedidos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresPedidos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('pedidos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/activos-fijos', {
                    controller: 'ControladorActivosFijos',
                    templateUrl: 'templates/agil/activosFijos.html',
                    title: 'AGIL - Activo Fijo',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresActivosFijos.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('activos-fijos')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/geo-localizacion', {
                    controller: 'ControladorGtmGeoLocalizacion',
                    templateUrl: 'templates/agil/geoLocalizacion.html',
                    title: 'AGIL - Geo Localizacion',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/gtm/controladores/ControladorGtmGeoLocalizacion.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('geo-localizacion')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/configuraciones-estados-financieros', {
                    controller: 'ControladorConfiguracionesEstadosFinancieros',
                    templateUrl: 'templates/estadosFinancierosAgil/configuraciones-estados-financieros.html',
                    title: 'AGIL - Configuraciones de Estados Financieros',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorConfiguracionesEstadosFinancieros.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('configuraciones-estados-financieros')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/balance-general', {
                    controller: 'ControladorBalanceGeneral',
                    templateUrl: 'templates/estadosFinancierosAgil/balance-general.html',
                    title: 'AGIL - Balance General',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorBalanceGeneral.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('balance-general')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/caja-chica', {
                    controller: 'ControladorCajaChica',
                    templateUrl: 'templates/agil/caja-chica.html',
                    title: 'AGIL - Caja Chica',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresCajaChica.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('caja-chica')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/solicitud-caja-chica', {
                    controller: 'ControladorSolicitudCajaChica',
                    templateUrl: 'templates/agil/solicitud-caja-chica.html',
                    title: 'AGIL - Solicitudes de Caja Chica',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresCajaChica.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('solicitud-caja-chica')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/comensales', {
                    controller: 'controladorComensalesEmpresa',
                    templateUrl: 'templates/agil/comensalesEmpresaExterna.html',
                    title: 'AGIL - Comensales',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresComensalesEmpresa.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('comensales')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/balance-comprobacion-suma-saldo', {
                    controller: 'ControladorBalaceComprobacionSumaSaldo',
                    templateUrl: 'templates/estadosFinancierosAgil/balanceComprobacionSumaSaldo.html',
                    title: 'AGIL - Balance Comprobacion Suma Saldo',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorBalaceComprobacionSumaSaldo.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('balance-comprobacion-suma-saldo')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/estado-resultado', {
                    controller: 'ControladorEstadoResultados',
                    templateUrl: 'templates/estadosFinancierosAgil/estadoRultado-EEFF.html',
                    title: 'AGIL - Estado Resultado',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorEstadoResultados.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('estado-resultado')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/comprobante-diario', {
                    controller: 'ControladorComprobanteDiario',
                    templateUrl: 'templates/estadosFinancierosAgil/comprobanteDiario.html',
                    title: 'AGIL - Comprobante Diario',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorComprobanteDiario.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('rrhh')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/estado-evolucion-patrimonio', {
                    controller: 'controladoEvolucionPatrimonioNeto',
                    templateUrl: 'templates/estadosFinancierosAgil/estado-evolucion-patrimonio-neto.html',
                    title: 'AGIL - Estado Evolucion Patrimonio',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorEstadoEvolucionPatrimonioNeto.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('estado-evolucion-patrimonio')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/resultados-acumulados', {
                    controller: 'controladorResultadosAcumulados',
                    templateUrl: 'templates/estadosFinancierosAgil/resultados-acumulados.html',
                    title: 'AGIL - Resultados Acumulados',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/estadosFinancierosAgil/controladores/ControladorResultadosAcumulados.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('resultados-acumulados')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/mailer/:data', {
                    controller: 'ControladorMailer',
                    templateUrl: 'templates/agil/mailer.html',
                    title: 'AGIL - Mailer',
                })
                .when('/porteria', {
                    controller: 'ControladorPorteria',
                    templateUrl: 'templates/agil/porteria.html',
                    title: 'AGIL - Porteria',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresPorteria.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('porteria')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/reporte-rendicion-caja-chica', {
                    controller: 'ControladorReporteRendicionCajaChica',
                    templateUrl: 'templates/agil/reportesRendicionCajaChica.html',
                    title: 'AGIL - Reportes rendición caja chica',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladoresReporteRendicionCajaChica.js');
                        }]
                    }
                })
                .when('/planilla-subsidios', {
                    controller: 'ControladorPlanillaSubsidios',
                    templateUrl: 'templates/agil/planilla-subsidos.html',
                    title: 'AGIL - Planilla de Subsidios',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaSubsidios.js');
                        }]
                    }
                })
                .when('/planilla-aguinaldos', {
                    controller: 'ControladorPlanillaAguinaldos',
                    templateUrl: 'templates/agil/planilla-aguinaldos.html',
                    title: 'AGIL - Planilla de Aguinaldos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaAguinaldos.js');
                        }]
                    }
                })
                .when('/consulta-contable', {
                    controller: 'ControladorConsultaContableUno',
                    templateUrl: 'templates/agil/consulta-contable-1.html',
                    title: 'AGIL - Consultas Dinamicas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorConsultaContableUno.js');
                        }]
                    }
                })
                .when('/consulta-proforma', {
                    controller: 'ControladorConsultaContableDos',
                    templateUrl: 'templates/agil/consulta-contable-2.html',
                    title: 'AGIL - Consultas Dinamicas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorConsultaContableDos.js');
                        }]
                    }
                })
                .when('/consulta-costos', {
                    controller: 'ControladorConsultaCostos',
                    templateUrl: 'templates/agil/consulta-costos.html',
                    title: 'AGIL - Consultas Dinamicas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorConsultaCostos.js');
                        }]
                    }
                })
                .when('/consulta-compras', {
                    controller: 'ControladorConsultaCompras',
                    templateUrl: 'templates/agil/consulta-compras.html',
                    title: 'AGIL - Consultas Dinamicas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorConsultaCompras.js');
                        }]
                    }
                })
                .when('/orden-servicio', {
                    controller: 'ControladorOrdenServicio',
                    templateUrl: 'templates/agil/orden-servicio.html',
                    title: 'AGIL - Ordenes de servicios',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/orden-servicio/controlador.js');
                        }]
                    }
                })
                .when('/consulta-ventas', {
                    controller: 'ControladorConsultaVentas',
                    templateUrl: 'templates/agil/consulta-ventas.html',
                    title: 'AGIL - Consultas Dinamicas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorConsultaVentas.js');
                        }]
                    }
                })
                .when('/planilla-incrementos', {
                    controller: 'ControladorPlanillaIncrementos',
                    templateUrl: 'templates/agil/planilla-incrementos.html',
                    title: 'AGIL - Planilla de Incrementos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaIncrementos.js');
                        }]
                    }
                })
                .when('/recibos-transporte', {
                    controller: 'ControladorRecibosTrasporte',
                    templateUrl: 'templates/agil/recibos-transporte.html',
                    title: 'AGIL - Recibos Transporte',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorRecibosTrasporte.js');
                        }],
                        "check": function (accessFac) {   //function to be resolved, accessFac and $location Injected
                            if (!accessFac.checkPermission('recibos-transporte')) {    //check if the user has permission -- This happens before the page loads
                                accessFac.relocate()
                                //window.location.href = window.location.origin;
                                //redirect user to home if it does not have permission.
                            }
                        }
                    }
                })
                .when('/planilla-retroactivas', {
                    controller: 'ControladorPlanillaRetroactivas',
                    templateUrl: 'templates/agil/planilla-retroactivas.html',
                    title: 'AGIL - Planillas Retroactivas',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorPlanillaRetroactivas.js');
                        }]
                    }
                })
                .when('/balneario', {
                    controller: 'ControladorBalneario',
                    templateUrl: 'templates/agil/balneario.html',
                    title: 'AGIL - Balneario',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorBalneario.js');
                        }]
                    }
                })
                .when('/capacitaciones', {
                    controller: 'ControladorCapacitacion',
                    templateUrl: 'templates/agil/capacitaciones.html',
                    title: 'AGIL - Capacitaciones',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/ControladorCapacitacion.js');
                        }]
                    }
                })
                .when('/mail', {
                    controller: 'controladoresMail',
                    templateUrl: 'templates/agil/mail.html',
                    title: 'AGIL - Mail',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresMail.js');
                        }]
                    }
                })
                .when('/soporte', {
                    controller: 'controladoresSoporte',
                    templateUrl: 'templates/agil/soporte.html',
                    title: 'AGIL - Soporte',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresSoporte.js');
                        }]
                    }
                })
                .when('/facturacion', {
                    controller: 'controladoresFacturacion',
                    templateUrl: 'templates/agil/facturacion.html',
                    title: 'AGIL - Facturación',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresFacturacion.js');
                        }]
                    }
                })
                .when('/eventos-significativos', {
                    controller: 'controladoresEventosSignificativos',
                    templateUrl: 'templates/agil/eventos-significativos.html',
                    title: 'AGIL - Eventos Significativos',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresEventosSignificativos.js');
                        }]
                    }
                })
                .when('/configuraciones-facturacion', {
                    controller: 'controladoresConfiguracionesFacturacion',
                    templateUrl: 'templates/agil/configuraciones-facturacion.html',
                    title: 'AGIL - Configuraciones Facturación',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/agil/controladores/controladoresConfiguracionesFacturacion.js');
                        }]
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', 'blockUI', function ($q, $location, $localStorage, blockUI) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token && $localStorage.usuario) {
                            var usuario = JSON.parse($localStorage.usuario);
                            if (usuario.rolesUsuario.length > 0 && usuario.rolesUsuario[0].rol && config.url.search('/api') == -1) {
                                config.headers.Authorization = 'Bearer ' + $localStorage.token + ' ' + usuario.rolesUsuario[0].rol.nombre;
                            } else if (config.url.search('/api/1.0') != -1) {
                                config.headers.Authorization = usuario.empresa ? usuario.empresa.token : '';
                                if( usuario.sucursalFacturacion ) {
                                    config.headers.codigoPos = 0;
                                    config.headers.idSucursal = usuario.sucursalFacturacion.id;
                                    config.headers.idEmpresa = usuario.sucursalFacturacion.id_empresa;
                                }
                            } else {
                                config.headers.Authorization = 'Bearer ' + $localStorage.token + ' ' + 'NONE';
                            }
                        }
                        // deshabilitar blockUI en request
                        if (blockUI.noOpen) {
                            blockUI.stop();
                        } else {
                            blockUI.noOpen = null;
                        }

                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            if (response.config.url.search('/api/1.0') == -1) $location.path('/');
                        }
                        return $q.reject(response);
                    },
                    'response': function (response) {
                        var mod = $location.$$url.split('/')[1]
                        if (!$localStorage.token && mod != "mailer") {
                            $location.path('/');
                            //return $q.reject(response);
                        } else {
                            //return response;
                        }
                        // deshabilitar blockUI en response
                        if (blockUI.noOpen) {
                            blockUI.stop();
                        } else {
                            blockUI.noOpen = null;
                        }

                        return response;
                    }
                };
            }]);


        }])