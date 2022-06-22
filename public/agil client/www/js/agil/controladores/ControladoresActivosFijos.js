angular.module('agil.controladores')

    .controller('ControladorActivosFijos', ['$scope', '$timeout', 'Paginator', '$localStorage', '$location', 'blockUI', 'ListaSubGruposProductoEmpresa', 'FieldViewer', 'GuardarConfiguracionActivosFijos', 'ObtenerConfiguracionActivosFijos',
        'ActivosFijosEmpresa', 'RevaluarActivo', 'ListaSubGruposActivosEmpresa', 'ObtenerCambioMoneda', 'ObtenerConfiguracionGestion', 'SweetAlert', function ($scope, $timeout, Paginator, $localStorage, $location, blockUI, ListaSubGruposProductoEmpresa, FieldViewer, GuardarConfiguracionActivosFijos, ObtenerConfiguracionActivosFijos,
        ActivosFijosEmpresa, RevaluarActivo, ListaSubGruposActivosEmpresa, ObtenerCambioMoneda, ObtenerConfiguracionGestion, SweetAlert) {

        $scope.idModalconfiguracionActivos = 'modal-configuracion-activos';
        $scope.idModalRevaluarActivo = 'modal-revaluar-activos';
        $scope.usuarioSesion = JSON.parse($localStorage.usuario);

        $scope.$on('$viewContentLoaded', function () {
            resaltarPestaña($location.path().substring(1));
            ejecutarScriptsActivos($scope.idModalconfiguracionActivos, $scope.idModalRevaluarActivo);
            $scope.buscarAplicacion($scope.usuarioSesion.aplicacionesUsuario, $location.path().substring(1));
            $scope.obtenerColumnasAplicacion();
        });

        $scope.$on('$routeChangeStart', function (next, current) {
            $scope.eliminarPopup($scope.idModalconfiguracionActivos);
            $scope.eliminarPopup($scope.idModalRevaluarActivo);
        });

        // $scope.mesesVidaUtil = Array.apply(null, new Array(12)).map(function (_, i) {
        //     return { id: i + 1 }
        // })

        $scope.calcularTotales = function () {
            $scope.totalesActivosFijos = {
                totalValores: 0,
                totalActualizacion: 0,
                totalActualizado: 0,
                totalDepreciacionAcumulada: 0,
                totalActualizacionDepreciacionAcumulada: 0,
                totalDepreciacionActualizada: 0,
                totalDepreciacionMensual: 0,
                totalDepreciacion: 0,
                totalNeto: 0
            };
            $scope.activosFijos.forEach(function (activo) {
                $scope.totalesActivosFijos.totalValores += activo.valor
                $scope.totalesActivosFijos.totalActualizacion += activo.incremento_actualizacion
                $scope.totalesActivosFijos.totalActualizado += activo.total_actualizado
                $scope.totalesActivosFijos.totalDepreciacionAcumulada += activo.depreciacion_acumulada
                $scope.totalesActivosFijos.totalActualizacionDepreciacionAcumulada += activo.actualizacion_depreciacion_acumulada
                $scope.totalesActivosFijos.totalDepreciacionActualizada += activo.depreciacion_acumulada_actualizada
                $scope.totalesActivosFijos.totalDepreciacionMensual += activo.depreciacion_mes
                $scope.totalesActivosFijos.totalDepreciacion += activo.total_depreciacion_acumulada
                $scope.totalesActivosFijos.totalNeto += activo.valor_neto
            })
        }

        $scope.factorConfiguracion = Array.apply(null, new Array(20)).map(function (_, i) {
            return { id: (i + 1) * 5 }
        })

        $scope.abrirConfiguracionActivos = function () {
            $scope.abrirPopup($scope.idModalconfiguracionActivos);
        }

        $scope.cerrarConfiguracionActivos = function () {
            $scope.cerrarPopup($scope.idModalconfiguracionActivos);
        }

        $scope.inicio = function () {
            $scope.configuracionActivosFijos = []
            $scope.obtenerConfiguracionActivos()
            $scope.filtro = { mes: { id: new Date().getMonth() + 1 }, anio: { id: new Date().getFullYear() }, subgrupo: 0, codigo: 0, activo: 0, vida_util: 0, tipoMes: false,  tipoAnio: false}
            $scope.obtenerSubGruposProductosEmpresaUsuario();
            $scope.getConfiguracionGestion();
            $scope.listaEstados = [
                { id: 1, nombre: 'Activo' },
                { id: 2, nombre: 'Inactivo' }];
            $scope.ConteoBusqueda = 0;
        }

        $scope.getConfiguracionGestion = function () {    
            blockUI.start()
			$scope.gestionEmpresa = "";
			var promesaG = ObtenerConfiguracionGestion($scope.usuarioSesion.id_empresa)
			promesaG.then(function (dato) {
				blockUI.stop();
                $scope.gestionEmpresa = dato.gestion;
                $scope.obtenerPaginadorActivos();
			})
        }

        $scope.agregarDetalleConfiguracion = function (detalle) {
            if (!$scope.configuracionActivosFijos.some(function (det) {
                return det.subgrupo.id === detalle.subgrupo.id
            })) {
                var detalleConfiguracion = {
                    subgrupo: detalle.subgrupo,
                    vida_util: detalle.vida_util,
                    factor: detalle.factor
                }
                $scope.configuracionActivosFijos.push(detalleConfiguracion)
            } else {
                $scope.mostrarMensaje('Ya existe en la lista de configuración.')
            }
        }

        $scope.obtenerColumnasAplicacion = function () {
            blockUI.start();
            $scope.fieldViewer = FieldViewer({
                crear: true,
                id_empresa: $scope.usuarioSesion.empresa.id,
                configuracion: {
                    numero: { value: "Número", show: true },
                    activo: { value: "Activo", show: true },
                    codigo: { value: "Código", show: true },
                    cantidad: { value: "Cantidad", show: true },
                    mes: { value: "Mes", show: true },
                    anio: { value: "Año", show: true },
                    fecha_ingreso: { value: "Fecha ingreso", show: true },
                    valor: { value: "Valor", show: true },
                    actualizacion: { value: "Actualización", show: true },
                    valor_actualizado: { value: "Valor actualizado", show: true },
                    depreciacion_acumulada: { value: "Depreciación acumulada", show: true },
                    actualizacion_depreciacion_acumulada: { value: "Actualización de la depreciación acumulada", show: true },
                    depreciacion_acumulada_actualizada: { value: "Depreciación acumulada actualizada", show: true },
                    depreciacion_mes: { value: "Depreciación mensual", show: true },
                    total_depreciacion: { value: "Total depreciación", show: true },
                    valor_neto: { value: "Valor neto", show: true },
                    vida_util: { value: "Vida útil", show: true },
                    vida_util_meses: { value: "Vida útil meses", show: true },
                    vida_restante: { value: "Vida restante (Meses)", show: true },
                    revaluado: { value: "Revaluado", show: true }
                }
            }, $scope.aplicacion.aplicacion.id);
            $scope.fieldViewer.updateObject();
            blockUI.stop();
        }

        $scope.obtenerSubGruposProductosEmpresaUsuario = function () {
            blockUI.start();
            var promesa = ListaSubGruposActivosEmpresa($scope.usuarioSesion.id_empresa);
            promesa.then(function (grupos) {
                blockUI.stop();
                if (grupos.length > 0) {
                    $scope.subGruposProducto = grupos;
                } else {
                    $scope.subGruposProducto = [];
                    $scope.mostrarMensaje('Parece que el usuario actual no cuenta con grupos de productos.');
                }
            }).catch(function (err) {
                $scope.subGruposProducto = [];
                var mensaje = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.';
                $scope.mostrarMensaje(mensaje);
                blockUI.stop();
            });
        };

        $scope.obtenerConfiguracionActivos = function () {
            blockUI.start()
            var prom = ObtenerConfiguracionActivosFijos($scope.usuarioSesion.id_empresa, $scope.usuarioSesion.id)
            prom.then(function (res) {
                if (res.hasErr) {
                    $scope.configuracionActivosFijos = []
                    $scope.mostrarMensaje(res.mensaje)
                } else {
                    $scope.configuracionActivosFijos = res.configuracion
                }
                blockUI.stop()
            }).catch(function (err) {
                blockUI.stop();
                var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
                $scope.mostrarMensaje(memo);
            })
        };

        $scope.obtenerPaginadorActivos = function () {
            $scope.paginator = Paginator();
            $scope.paginator.column = "nombre";
            $scope.paginator.direction = "asc"
            $scope.paginator.callBack = $scope.buscarActivos;
            $scope.paginator.getSearch("", null, null);
        };

        $scope.filtrarFiltro = function (filtro, _, __) {
            if (__ !== undefined) {
                for (var key in filtro) {
                    if (filtro[key] == 0) {
                        filtro[key] = ""
                    }
                }
            } else {
                for (var key in filtro) {
                    if (filtro[key] === "" || filtro[key] === null || filtro[key] === undefined) {
                        filtro[key] = 0
                    }
                }
            }
            // for (var key in filtro) {
            //     if (filtro[key] === "" || filtro[key] === null) {
            //         filtro[key] = 0
            //     }
            // }
            if (_ === undefined || !_) {
                $scope.buscarActivos()
                // $scope.recargarItemsTabla()
            } else {
                return filtro
            }
        }

        $scope.editarConfiguracion = function (configuracion) {
			configuracion.edit = false
			$scope.configuracion = {}
        }
        
        $scope.configuracionR = {};
        $scope.modificarConfiguracion = function (configuracion) {
			$scope.configuracion = configuracion;
            $scope.configuracion.edit = true
            $scope.configuracionR = angular.copy(configuracion);
        }
        $scope.cancelarConfiguracion = function (configuracion) {
			$scope.configuracion = {};
            $scope.configuracion.edit = false;
            var index = $scope.configuracionActivosFijos.findIndex(function (conf) {
               return conf.id==$scope.configuracionR.id
            });

            $scope.configuracionActivosFijos[index].factor = $scope.configuracionR.factor;
            $scope.configuracionActivosFijos[index].vida_util = $scope.configuracionR.vida_util;
            $scope.configuracionActivosFijos[index].subgrupo = $scope.configuracionR.subgrupo;
        }

        $scope.verificarTipo = function (filtro, tipo){
            if(tipo=='anio'){
                if(filtro){
                    $scope.filtro.tipoMes = false;
                }
            }
            if(tipo=='mes'){
                if(filtro){
                    $scope.filtro.tipoAnio = false;
                }
            }
        }

        function diff_months(d1, d2) 
        {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months += d2.getMonth() - d1.getMonth() + 1;
            return months;
        }


        $scope.buscarActivos = function () {
            blockUI.start()
            $scope.filtro = $scope.filtrarFiltro($scope.filtro, true)
            $scope.filtro.tipoMes = $scope.filtro.tipoMes==0?false:$scope.filtro.tipoMes;
            $scope.filtro.tipoAnio = $scope.filtro.tipoAnio==0?false:$scope.filtro.tipoAnio;
            var fechaUFVInicio= new Date($scope.filtro.anio.id,parseInt($scope.filtro.mes.id)-1,1);
            var fechaUFVFin= new Date($scope.filtro.anio.id,parseInt($scope.filtro.mes.id),0);
            console.log("fechaUFVinicio ===========", fechaUFVInicio);
            console.log("fechaUFVfin ===========", fechaUFVFin);
            if (!$scope.gestionEmpresa) {
                blockUI.stop();
                // $scope.mostrarMensaje("No se encuentra una Gestión activa en Configuraciones");
                SweetAlert.swal("Falta Configuración!", "No se encuentra una Gestión activa en Configuraciones", "warning");
                $scope.activosFijos = [];
                $scope.totalesActivosFijos = {
                    totalValores: 0,
                    totalActualizacion: 0,
                    totalActualizado: 0,
                    totalDepreciacionAcumulada: 0,
                    totalActualizacionDepreciacionAcumulada: 0,
                    totalDepreciacionActualizada: 0,
                    totalDepreciacionMensual: 0,
                    totalDepreciacion: 0,
                    totalNeto: 0
                };
            }else{
                var inicioConfG = $scope.gestionEmpresa.inicio;
                var finConfG = $scope.gestionEmpresa.fin;
                var anioConfG =  $scope.filtro.anio.id;
                // comprobando si el mes de la configuracion es de gestion pasada ------------------
                if (inicioConfG.split('/')[1] > finConfG.split('/')[1] && inicioConfG.split('/')[1] > parseInt($scope.filtro.mes.id)) {
                    anioConfG -= 1;
                }
                
                $scope.filtro.mes_gestion = parseInt(inicioConfG.split('/')[1]);
                $scope.filtro.anio_gestion = anioConfG;
                $scope.paginator.filter = $scope.filtro
                var prom = ActivosFijosEmpresa($scope.usuarioSesion.id_empresa, $scope.paginator)
                prom.then(function (res) {
                    if (res.hasErr) {
                        // $scope.mostrarMensaje(res.mensaje);
                        SweetAlert.swal("", res.mensaje, "error");
                    } else {
                        if (res.activos.length > 0) {
                            $scope.activosFijos = res.activos;
                            $scope.paginator.setPages(res.paginas)
                            var indx = -1
                            if ($scope.configuracionActivosFijos.length > 0) {
                            
                                $scope.ufvInicio = (res.ufvInicio==null)?0:res.ufvInicio;
                                console.log("$scope.ufv inicio ====>>> ", $scope.ufvInicio);
                                $scope.ufvFin = (res.ufvFin==null)?0:res.ufvFin;
                                console.log("$scope.ufv fin ====>>> ", $scope.ufvFin);
                                $scope.ufvInicioConfig = (res.ufvInicioConfig==null)?0:res.ufvInicioConfig;
                                $scope.ufvFinConfig = (res.ufvFinConfig==null)?0:res.ufvFinConfig;
                                $scope.ufvInicioAnterior = (res.ufvInicioAnterior==null)?0:res.ufvInicioAnterior;
                                console.log("ufvInicioAnterior inicio ====>>> ", $scope.ufvInicioAnterior);
                                $scope.ufvFinAnterior = (res.ufvFinAnterior==null)?0:res.ufvFinAnterior;
                                console.log("ufvFinAnterior fin ====>>> ", $scope.ufvFinAnterior);
                                $scope.ufvInicioGestion = (res.ufvInicioGestion==null)?0:res.ufvInicioGestion;
                                console.log("ufvInicioGestion inicio ====>>> ", $scope.ufvInicioGestion);
                                $scope.ufvFinGestion = (res.ufvFinGestion==null)?0:res.ufvFinGestion;
                                console.log("ufvFinGestion fin ====>>> ", $scope.ufvFinGestion);

                                $scope.activosFijos.forEach(function (activo, i) {
                                    var fechaIN = new Date(activo.fecha_ingreso);
                                    console.log(diff_months(fechaIN, fechaUFVFin));
                                    activo.cantidad_meses = diff_months(fechaIN, fechaUFVFin);
                                    ObtenerCambioMoneda(fechaIN,$scope.usuarioSesion.id_empresa).then(function (cambio){
                                        if ($scope.configuracionActivosFijos.some(function (config, j) {
                                            indx = j
                                            return config.subgrupo.id == activo.activo.subgrupo.id
                                        })) {
                                            var diff = new Date().getMonth() - new Date(activo.fecha_ingreso).getMonth() + (12 * (new Date().getFullYear() - new Date(activo.fecha_ingreso).getFullYear()));
                                            // var diff = new Date().getTime() - new Date(activo.fecha_ingreso).getMonth() 
                                            activo.vida_util = $scope.configuracionActivosFijos[indx].vida_util
                                            
                                        }
                                        activo.vida_util_meses = activo.vida_util * 12;
                                        activo.vida_restante = activo.vida_util_meses - activo.cantidad_meses
                                        

                                        if ($scope.filtro.tipoMes && !$scope.filtro.tipoAnio) {
                                            // calculo tipo mes ============================== cambio.monedaCambio.ufv
                                            // var actualizacionAnterior = activo.valores[0].valor/$scope.ufvInicioAnterior * $scope.ufvFinAnterior - activo.valores[0].valor;
                                            // var totalActualizadoAnterior = activo.valores[0].valor + actualizacionAnterior;
                                            
                                            // condicion si la fecha de inicio activo es igual al mes de filtro
                                            if ($scope.filtro.mes.id == fechaIN.getMonth()+1) {
                                                activo.valor =activo.valores[0].valor;
                                                activo.incremento_actualizacion=activo.valor/cambio.monedaCambio.ufv* $scope.ufvFin - activo.valor;
                                            }else{
                                                var actualizacionAnterior = activo.valores[0].valor/cambio.monedaCambio.ufv * $scope.ufvFinAnterior;
                                                activo.valor = actualizacionAnterior;
                                                activo.incremento_actualizacion=activo.valor/$scope.ufvFinAnterior* $scope.ufvFin - activo.valor;
                                            }
                                            
                                            activo.total_actualizado = activo.valor + activo.incremento_actualizacion;
                                            if ($scope.filtro.mes.id  == fechaIN.getMonth()+1 &&  fechaIN.getFullYear() == $scope.filtro.anio.id) {
                                                activo.depreciacion_acumulada = activo.total_actualizado /  activo.vida_util / 12 * (activo.cantidad_meses-1);
                                            }else{
                                                var totalActualizacionAnterior = activo.valores[0].valor/cambio.monedaCambio.ufv * $scope.ufvFinAnterior;
                                                activo.depreciacion_acumulada = totalActualizacionAnterior /  activo.vida_util / 12 * (activo.cantidad_meses-1);
                                            }
                                            activo.actualizacion_depreciacion_acumulada = ((activo.depreciacion_acumulada / $scope.ufvFinAnterior) * $scope.ufvFin)-activo.depreciacion_acumulada;
                                            activo.depreciacion_mes = activo.total_actualizado /  activo.vida_util / 12;
                                        }else if (!$scope.filtro.tipoMes && $scope.filtro.tipoAnio) {
                                            // calculo tipo año ==============================
                                            // configuracion gestion empresa ------------------
                                            var inicioConf = $scope.gestionEmpresa.inicio;
                                            var finConf = $scope.gestionEmpresa.fin;
                                            var anioConf =  $scope.filtro.anio.id;
                                            // comprobando si el mes de la configuracion es de gestion pasada ------------------
                                            if (inicioConf.split('/')[1] > finConf.split('/')[1] && inicioConf.split('/')[1] > parseInt($scope.filtro.mes.id)) {
                                                anioConf -= 1;
                                            }
                                            // var fechaInicioGestionConf = new Date(inicioConf+"/"+anioConf);
                                            var fechaInicioGestionConf = new Date($scope.convertirFecha(inicioConf+"/"+anioConf));  
                                            // var fechaFin = new Date($scope.convertirFecha(finConf+"/"+anioConf));
                                            var cantidadMesesGestion = diff_months(fechaInicioGestionConf, fechaUFVFin);
                                            console.log("can gesttt", cantidadMesesGestion);
                                            // calcular meses para gestion para Dep. A
                                            // fecha inicio activo fijo hasta fecha inicio gestion
                                            var cantMesesGestionInicio = diff_months(fechaIN, fechaInicioGestionConf);
                                            
                                            if (activo.activo.codigo == "FC99766") {
                                                console.log("can inittttttt", cantMesesGestionInicio);
                                            }

                                            var actualizacionInicioGestion = 0;
                                            if ( fechaIN.getFullYear() < $scope.filtro.anio.id) {
                                                console.log("valor anio  "+ fechaIN.getFullYear())
                                                var actualizacionAnterior = activo.valores[0].valor/cambio.monedaCambio.ufv * $scope.ufvFinGestion;
                                                activo.valor = actualizacionAnterior;
                                                activo.incremento_actualizacion=activo.valor/$scope.ufvFinGestion* $scope.ufvFin - activo.valor;
                                                actualizacionInicioGestion = activo.valor/$scope.ufvFinGestion* $scope.ufvFinConfig - activo.valor;
                                            }else{
                                                activo.valor = activo.valores[0].valor;
                                                activo.incremento_actualizacion=activo.valor/cambio.monedaCambio.ufv * $scope.ufvFin - activo.valor;
                                                actualizacionInicioGestion = activo.valor/cambio.monedaCambio.ufv * $scope.ufvFinConfig - activo.valor;
                                            }
                                            // var actualizacionGestion = activo.valores[0].valor/$scope.ufvInicioGestion * $scope.ufvFinGestion - activo.valores[0].valor;
                                            // var totalActualizadoGestion = activo.valores[0].valor + actualizacionGestion;
                                            // activo.valor = totalActualizadoGestion;
                                            // activo.incremento_actualizacion=activo.valor/$scope.ufvInicio * $scope.ufvFin - activo.valor;
                                            activo.total_actualizado = activo.valor + activo.incremento_actualizacion;
                                            
                                            // var totalActualizadoInicioGestion = activo.valor + actualizacionInicioGestion;
                                            var totalActualizadoInicioGestion = activo.valor;
                                           
                                            if ( fechaIN.getFullYear() == $scope.filtro.anio.id) {
                                                activo.depreciacion_acumulada = 0;
                                            }else{
                                                activo.depreciacion_acumulada = totalActualizadoInicioGestion /  activo.vida_util / 12 * (cantMesesGestionInicio - 1);
                                            }
                                            activo.actualizacion_depreciacion_acumulada = ((activo.depreciacion_acumulada / $scope.ufvFinGestion) * $scope.ufvFin)  -activo.depreciacion_acumulada;
                                            activo.depreciacion_mes = activo.total_actualizado /  activo.vida_util / 12 * cantidadMesesGestion;
                                        }else{
                                            // calculo tipo normal ==============================
                                            activo.valor = activo.valores[0].valor;
                                            activo.incremento_actualizacion=activo.valor/cambio.monedaCambio.ufv * $scope.ufvFin - activo.valor;
                                            activo.total_actualizado = activo.valor + activo.incremento_actualizacion;
                                            activo.depreciacion_acumulada = 0;
                                            activo.actualizacion_depreciacion_acumulada = 0;
                                            activo.depreciacion_mes = activo.total_actualizado /  activo.vida_util / 12 * activo.cantidad_meses;
                                            
                                        }
                                        activo.depreciacion_acumulada_actualizada = activo.depreciacion_acumulada + activo.actualizacion_depreciacion_acumulada;
                                        activo.total_depreciacion_acumulada = activo.depreciacion_acumulada_actualizada + activo.depreciacion_mes;
                                        activo.valor_neto = activo.total_actualizado - activo.total_depreciacion_acumulada;
                                        $scope.calcularTotales()
        
                                        
                                    });
                                
                                })
                                
                                // if ($scope.filtro.vida_util != 0) {
                                //     $scope.activosFijos = 
                                // }
                                
                            }
                            
                        } else {
                            // $scope.mostrarMensaje(res.mensaje);
                            // SweetAlert.swal("Faltan UFVs!", res.mensaje, "warning");
                            SweetAlert.swal({
                                title: "Faltan UFVs!",
                                icon: "warning",
                                html: res.mensaje
                              });
                            $scope.activosFijos = res.activos;
                            $scope.totalesActivosFijos = {
                                totalValores: 0,
                                totalActualizacion: 0,
                                totalActualizado: 0,
                                totalDepreciacionAcumulada: 0,
                                totalActualizacionDepreciacionAcumulada: 0,
                                totalDepreciacionActualizada: 0,
                                totalDepreciacionMensual: 0,
                                totalDepreciacion: 0,
                                totalNeto: 0
                            };
                            // if ($scope.ConteoBusqueda < 1) {
                            //     $scope.ConteoBusqueda += 1
                            //     $timeout(function () {
                            //         $scope.buscarActivos()
                            //     }, 5000)
                            //     return
                            // } else {
                            //     $scope.activosFijos = res.activos;
                            //     $scope.totalesActivosFijos = {
                            //         totalValores: 0,
                            //         totalActualizacion: 0,
                            //         totalActualizado: 0,
                            //         totalDepreciacionAcumulada: 0,
                            //         totalActualizacionDepreciacionAcumulada: 0,
                            //         totalDepreciacionActualizada: 0,
                            //         totalDepreciacionMensual: 0,
                            //         totalDepreciacion: 0,
                            //         totalNeto: 0
                            //     };
                            // }
                        }
                        blockUI.stop()
                    }
                    blockUI.stop()
                    $scope.filtrarFiltro($scope.filtro, true, true)
                }).catch(function (err) {
                    blockUI.stop();
                    var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
                    // $scope.mostrarMensaje(memo);
                    SweetAlert.swal("", memo, "error");
                })   
            }

             
                            
        }


        $scope.revaluarActivo = function () {
            blockUI.start()
            var prom = RevaluarActivo($scope.activo, $scope.usuarioSesion.id_empresa, $scope.usuarioSesion.id)
            prom.then(function (res) {
                if (res.hasErr) {
                    $scope.mostrarMensaje(res.mensaje);
                } else {
                    $scope.cerrarDialogRevaluarActivo()
                }
                blockUI.stop();
            }).catch(function (err) {
                blockUI.stop();
                var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
            });
        }

        $scope.guardarConfiguracionActivos = function () {
            blockUI.start()
            if ($scope.configuracionActivosFijos.length > 0) {
                var prom = GuardarConfiguracionActivosFijos($scope.usuarioSesion.id_empresa, $scope.usuarioSesion.id, $scope.configuracionActivosFijos)
                prom.then(function (res) {
                    if (res.hasErr) {
                        SweetAlert.swal("", res.mensaje, "warning");
                    } else {
                        // $scope.mostrarMensaje(res.mensaje)
                        $scope.cerrarConfiguracionActivos()
                        SweetAlert.swal("Guardado!", res.mensaje, "success");
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    blockUI.stop();
                    var memo = (err.stack !== undefined && err.stack !== null && err.stack !== "") ? err.stack : (err.data !== null && err.data !== undefined & err.data !== "") ? err.data : "Error: se perdio la conexión con el servidor.";
                    SweetAlert.swal("", memo, "warning");
                })
            } else {
                SweetAlert.swal("", "No hay cambios para guardar.", "warning");
            }
        };
        $scope.abrirDialogRevaluarActivo = function (activo) {
            if (activo !== undefined && activo !== null) {
                $scope.activo = activo
                $scope.abrirPopup($scope.idModalRevaluarActivo);
            } else {
                $scope.mostrarMensaje('La información del activo es incorrecta.')
            }
        }

        $scope.cerrarDialogRevaluarActivo = function () {
            $scope.activo = {}
            $scope.cerrarPopup($scope.idModalRevaluarActivo);
        }
        $scope.inicio();
    }]);
