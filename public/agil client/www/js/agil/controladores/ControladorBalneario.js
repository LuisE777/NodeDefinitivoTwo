angular.module('agil.controladores')

.controller('ControladorBalneario', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout', '$window','ClasesTipo','SweetAlert', 
    'ListaSucursalesUsuario', 'ListaTiposAmbientes', 'CrearAmbiente', 'GetNumeroSucursal', 'GetListaAmbientes', 'Tipos', 'GetTipoClasesEmpresa', 
    'CrearEncargado', 'GetListaEncargados', 'Venta', 'ProductosPanelPaginadorRelaciones', 'VerificarHijos', 'ObtenerOpcionesAplicacionUsuario', 'VentaAmbiente',
     'GetListaAmbientesActivos', 'DatosVenta', 'ClientesNit', 'UpdateVentaBalneario', 'ImprimirSalida', 'DatosComanda', 'ObtenerIdPadreAnterior', '$filter', function($scope, $localStorage, $location, $templateCache, $route, blockUI, $timeout, $window, ClasesTipo, SweetAlert, 
    ListaSucursalesUsuario, ListaTiposAmbientes, CrearAmbiente, GetNumeroSucursal, GetListaAmbientes, Tipos, GetTipoClasesEmpresa, CrearEncargado, 
    GetListaEncargados, Venta, ProductosPanelPaginadorRelaciones, VerificarHijos, ObtenerOpcionesAplicacionUsuario, VentaAmbiente, GetListaAmbientesActivos, DatosVenta, ClientesNit, UpdateVentaBalneario, ImprimirSalida, DatosComanda, ObtenerIdPadreAnterior,$filter){
    blockUI.start();

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsBalnearios($scope.idModalNuevoAmbiente, $scope.idModalNuevoTipoAmbiente, $scope.idModalEncargados,  $scope.idModalNuevoEncargado, $scope.idModalPanelVentasExpress, $scope.idModalAmbientes, $scope.idModalCerrarAmbiente, $scope.modalPdfView);
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        blockUI.stop();
    });
	
	$scope.usuario=JSON.parse($localStorage.usuario);
    $scope.idModalNuevoAmbiente = 'dialog-nuevo-ambiente';
    $scope.idModalNuevoTipoAmbiente = 'dialog-nuevo-tipo-ambiente';
    $scope.idModalEncargados = 'dialog-encargados';
    $scope.idModalNuevoEncargado = 'dialog-nuevo-encargado';
    $scope.idModalPanelVentasExpress = 'dialog-panel-ventas-express';
    $scope.idModalAmbientes = 'dialog-ambientes';
    $scope.idModalCerrarAmbiente = 'modal-cerrar-ambiente';
    $scope.modalPdfView = "modal-pdf-view";

    $scope.obtenerSucursales = function () {
        $scope.sucursales = [];
        var promesa = ListaSucursalesUsuario($scope.usuario.id);
        promesa.then(function (res) {
            res.sucursales.map(function (_) {
                $scope.sucursales.push(_.sucursal)
            })
            $scope.usuario.sucursalesUsuario = res.sucursales
        });
    }

    $scope.obtenerTiposAmbiente = function () {
        var promesa = ListaTiposAmbientes($scope.usuario.id_empresa);
        promesa.then(function (res) {
            $scope.tiposAmbiente = res.data
        });
    }

    $scope.obtenerTiposUnidadMedida = function () {
        var promesa = ClasesTipo('TIPUNIDMED');
        promesa.then(function (res) {
            $scope.unidadesMedidaAmbiente = res.clases
        });
    }

    $scope.obtenerEstadosAmbiente = function () {
        var promesa = ClasesTipo('ESTAMB');
        promesa.then(function (res) {
            $scope.estadosAmbiente = res.clases
        });
    }
    $scope.obtenerMovimientosEgreso = function () {
        blockUI.start();
        var promesa = ClasesTipo("MOVEGR");
        promesa.then(function (entidad) {
            // $scope.buscarOpcionesAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));

            var aplicaciones = $.grep($scope.usuario.aplicacionesUsuario, function (e) { return e.aplicacion.url == $location.path().substring(1); });
            aplicacion = aplicaciones[0];
            var promesa = ObtenerOpcionesAplicacionUsuario(aplicacion.id)
            promesa.then(function (data) {
                if (data.opciones.length > 0) {
                    var movimientosVenta = [];
                    $scope.opcionesAplicacion = {};
                    if (aplicacion.aplicacion.titulo == 'SALIDAS') {

                        $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_FACTURACION })
                        $scope.opcionesAplicacion.VENTA_OPCION_BAJA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_BAJA })
                        $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_PROFORMA })
                        $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO })
                        $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_AJUSTE })
                        $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_SERVICIO })
                        $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN = data.opciones.find(function (dato) { return dato.opcion.nombre == $scope.diccionario.VENTA_OPCION_TRASPASO_ALMACEN })
                        $scope.opcionesAplicacion.VENTA_OPCIONES_COMPROBANTE_TRASPASO = data.opciones.find(function (dato) { return dato.opcion.nombre == "INTEGRACION TRASPASOS" })

                        for (var i = 0; i < entidad.clases.length; i++) {
                            var movimientoGet = entidad.clases[i];
                            if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_FACTURACION.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_BAJA.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_BAJA.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_PROFORMA.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_AJUSTE.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_SERVICIO.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            } else if (movimientoGet.nombre == $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN.opcion.nombre && $scope.opcionesAplicacion.VENTA_OPCION_TRASPASO_ALMACEN.puede_ver) {
                                movimientosVenta.push(movimientoGet);
                            }
                        }

                        $scope.movimientosEgreso = movimientosVenta;

                    }
                } else {
                    $scope.movimientosEgreso = entidad.clases;
                }
            });
            blockUI.stop();
        });
    }

    $scope.obtenerActividades = function (idSucursal) {
        $scope.actividades = [];
        var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
        $scope.actividadesDosificaciones = sucursal.actividadesDosificaciones;
        $scope.actividades = [];
        for (var i = 0; i < $scope.actividadesDosificaciones.length; i++) {
            if ($scope.actividadesDosificaciones[i].dosificacion) {
                if ($scope.venta.movimiento) {
                    if ($scope.venta.movimiento.nombre_corto == "SERV") {
                        if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == true) {
                            $scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
                        } else {
                            $scope.dosificacionesExpiradas = true
                        }
                    } else {
                        if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == false) {
                            $scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
                        } else {
                            $scope.dosificacionesExpiradas = true
                        }
                    }
                } else {
                    if (!$scope.actividadesDosificaciones[i].expirado && !$scope.actividadesDosificaciones[i].dosificacion.expirado && $scope.actividadesDosificaciones[i].dosificacion.tipo_dosificacion == false) {
                        $scope.actividades.push($scope.actividadesDosificaciones[i].actividad);
                    } else {
                        $scope.dosificacionesExpiradas = true
                    }
                }
            }
        }
        if (!$scope.venta.id) {
            $scope.venta.actividad = $scope.actividades.length == 1 ? $scope.actividades[0] : null;
        }
    }

    
	$scope.inicio=function(){
        $scope.verFiltros = false;
        $scope.sucursales = []//$scope.obtenerSucursales();
        $scope.obtenerSucursales();
        $scope.obtenerTiposAmbiente();
        $scope.obtenerEstadosAmbiente();
        $scope.obtenerTiposUnidadMedida();
        $scope.sucursalesUsuario = "";
        $scope.obtenerListaAmbientesActivos();
        $scope.obtenerMovimientosEgreso();
        let hoy = new Date()
        $scope.filtro = {
            inicio: fechaATexto(hoy.setDate(hoy.getDate() - 7)),
            fin: fechaATexto(new Date()),
            recibo:"",
            moneda:"TODOS",
            monto: "",
            chofer: "",
            vehiculo: "",
            estado: "TODOS",
            metodo_pago: "TODOS",
            banco: "TODOS",
            bancoDestino: "",
            nro_cheque: "",
            sucursal: "TODOS",
            usuario: "TODOS"
        }
        
	}
    $scope.AbrirNuevoAmbiente = function () {
        $scope.nuevoAmbiente = { producto:{} }
        $scope.abriModalFullScreen($scope.idModalNuevoAmbiente);
    }

    $scope.cerrarNuevoAmbiente = function () {
        $scope.cerrarPopup($scope.idModalNuevoAmbiente);
    }
    
    $scope.guardarAmbiente = async (nuevoAmbiente) => {
        try {
            // if (otroBono.id) {
            //     return $scope.actualizarOtrosBonos(otroBono)
            // }
            // otroBono.fecha = new Date($scope.convertirFecha(otroBono.fecha))
            if (!nuevoAmbiente.id) {
                var estado = $scope.estadosAmbiente.find(est => est.nombre == 'LIBRE');
                nuevoAmbiente.id_estado = estado ? estado.id : null;
            }

            nuevoAmbiente.id_tipo = nuevoAmbiente.tipoAmbiente ? nuevoAmbiente.tipoAmbiente.id : null;
            nuevoAmbiente.id_sucursal = nuevoAmbiente.sucursal ? nuevoAmbiente.sucursal.id : null;
            nuevoAmbiente.id_unidad_medida = nuevoAmbiente.unidad_medida ? nuevoAmbiente.unidad_medida.id : null;
            nuevoAmbiente.producto.unidad_medida = nuevoAmbiente.unidad_medida ? nuevoAmbiente.unidad_medida.nombre : null;
            
            let res = await CrearAmbiente($scope.usuario.id_empresa, nuevoAmbiente)
            $scope.nuevoAmbiente = {}
            if (res.error) {
                SweetAlert.swal("Guardado!", res.message, "warning");
            }else{
                // SweetAlert.swal("Guardado!", res.message, "success");
                $scope.obtenerListaAmbientes();
                SweetAlert.swal({
                    title: "Guardado!",
                    text: res.message,
                    icon: 'success',
                    target: '#content-balneario'
                })
            }
            $scope.obtenerListaAmbientesActivos();
            $scope.cerrarNuevoAmbiente()
            $scope.$evalAsync()
        } catch (error) {
            console.log(error)
        }
    }

    $scope.habilitarAmbiente = async (ambiente) => {
        try {
            let ambienteUpdate = {};
            ambienteUpdate.id = ambiente.id;
            ambienteUpdate.habilitado = ambiente.habilitado;
            ambienteUpdate.id_tipo = ambiente.tipo_ambiente ? ambiente.tipo_ambiente.id : null;
            ambienteUpdate.id_estado = ambiente.estado_ambiente ? ambiente.estado_ambiente.id : null;
            ambienteUpdate.id_sucursal = ambiente.sucursal ? ambiente.sucursal.id : null;
            ambienteUpdate.id_unidad_medida = ambiente.unidadMedida ? ambiente.unidadMedida.id : null;
            // ambienteUpdate.producto.unidad_medida = ambiente.unidad_medida ? ambiente.unidad_medida.nombre : null;

            let res = await CrearAmbiente($scope.usuario.id_empresa, ambienteUpdate)
            if (res.error) {
                SweetAlert.swal("Guardado!", res.message, "warning");
            }else{
                $scope.obtenerListaAmbientes();
                $scope.obtenerListaAmbientesActivos();
                SweetAlert.swal({
                    title: "Guardado!",
                    text: res.message,
                    icon: 'success',
                    target: '#content-balneario'
                })
            }
            
            $scope.$evalAsync()
        } catch (error) {
            console.log(error)
        }
    }

    $scope.editarAmbiente = (ambiente) => {
        $scope.nuevoAmbiente = ambiente;
        $scope.nuevoAmbiente.tipoAmbiente = ambiente.tipo_ambiente;
        $scope.nuevoAmbiente.sucursal = ambiente.sucursal;
        $scope.nuevoAmbiente.unidad_medida = ambiente.unidadMedida;
        $scope.nuevoAmbiente.editar = true;
        $scope.abriModalFullScreen($scope.idModalNuevoAmbiente);
    }

    $scope.obtenerNumeroSucursal = function (sucursal, tipo, editar) {
        if (sucursal && tipo && !editar) {
            var promesa = GetNumeroSucursal(sucursal.id, tipo.id);
            promesa.then(function (res) {
                $scope.nuevoAmbiente.numero = res.data + 1
            });   
        }
    }
    $scope.filtroAmbientes = {
        sucursalUsuario: $scope.usuario.sucursalesUsuario[0],
        estado: 0
    }
    $scope.filtroEstadoAmbiente = function (estado){
        $scope.filtroAmbientes.estado = 0;
        if (estado == 1) {
            var estado = $scope.estadosAmbiente.find(est => est.nombre == 'OCUPADO');
            $scope.filtroAmbientes.estado = estado ? estado.id : null;
        }else if (estado == 2) {
            var estado = $scope.estadosAmbiente.find(est => est.nombre == 'LIBRE');
            $scope.filtroAmbientes.estado = estado ? estado.id : null;
        }
        $scope.obtenerListaAmbientesActivos();
    }

    $scope.obtenerListaAmbientesActivos = function () {
       
        var promesa = GetListaAmbientesActivos($scope.usuario.id_empresa, $scope.filtroAmbientes.sucursalUsuario.sucursal.id, $scope.filtroAmbientes.estado);
        promesa.then(function (res) {
            $scope.listaAmbientesActivos = res.data
        });
    }

    $scope.obtenerListaAmbientes = function () {
        var promesa = GetListaAmbientes($scope.usuario.id_empresa);
        promesa.then(function (res) {
            $scope.listaAmbientes = res.data
        });
    }

    $scope.abrirDialogTipoAmbiente = function () {
        var promesa = GetTipoClasesEmpresa("TIPAMB", $scope.usuario.id_empresa);
        promesa.then(function (entidad) {
            $scope.tipoAmbienteEdicion = entidad
            $scope.clase = {icono: 'icon-balneario-home'};
            $scope.abriModalFullScreen($scope.idModalNuevoTipoAmbiente);
        })
        // var promesa = ListaTiposAmbientes($scope.usuario.id_empresa);
        // promesa.then(function (res) {
        //     $scope.tipoAmbienteEdicion = res.data;
        //     $scope.abrirPopup($scope.idModalNuevoTipoAmbiente);
        // });

    }
    $scope.cerrarDialogTipoAmbiente = function () {
        $scope.cerrarPopup($scope.idModalNuevoTipoAmbiente);
    }

    $scope.AgregarTipoAmbiente = function (datos) {
        if (!datos.nombre && !datos.nombre_corto) {
            return
        }
        if (datos.edit) {
            var bandera = true
            $scope.clase = {icono: 'icon-balneario-home'};
            $scope.tipoAmbienteEdicion.clases.forEach(function (tipoA, index, array) {
                var nombre_corto = tipoA.nombre_corto.split("_")[0]
                if (tipoA.id != datos.id) {
                    if (nombre_corto == datos.nombre_corto2) {
                        bandera = false
                    }
                }
                if (index === (array.length - 1)) {
                    if (bandera) {
                        datos.nombre_corto = datos.nombre_corto2 + "_AMB"
                        $scope.clase = {icono: 'icon-balneario-home'};
                    } else {
                        $scope.mostrarMensaje("El nombre corto tiene que ser unico")
                    }
                }
            });
        } else {
            var bandera = true
            if ($scope.tipoAmbienteEdicion.clases.length > 0) {
                $scope.tipoAmbienteEdicion.clases.forEach(function (tipoA, index, array) {
                    var nombre_corto = tipoA.nombre_corto.split("_")[0]
                    if (nombre_corto == datos.nombre_corto2) {
                        bandera = false
                    }
                    if (index === (array.length - 1)) {
                        if (bandera) {
                            datos.nombre_corto = datos.nombre_corto2 + "_AMB"
                            datos.habilitado = true
                            $scope.tipoAmbienteEdicion.clases.push(datos)
                            $scope.clase = {icono: 'icon-balneario-home'};
                        } else {
                            $scope.mostrarMensaje("El nombre corto tiene que ser unico")
                        }
                    }
                });
            } else {
                datos.nombre_corto = datos.nombre_corto2 + "_AMB"
                datos.habilitado = true
                $scope.tipoAmbienteEdicion.clases.push(datos)
                $scope.clase = {icono: 'icon-balneario-home'};
            }
        }
    }

    $scope.editarTipoAmbiente = function (pro) {
        var nombre_corto = pro.nombre_corto.split("_")[0]
        $scope.clase = pro; 
        $scope.clase.nombre_corto2 = nombre_corto
        $scope.clase.edit = true
    }
    $scope.cancelarEdicionTipoAmbiente = function (clase) {
        $scope.clase = null
    }

    $scope.guardarTipoAmbienteEdicion = function (tipo) {
        blockUI.start();
        Tipos.update({ id_tipo: tipo.id }, tipo, function (res) {
            var promesa = GetTipoClasesEmpresa(tipo.nombre_corto,  $scope.usuario.id_empresa);
            promesa.then(function (entidad) {
                $scope.tipoAmbienteEdicion = entidad
                blockUI.stop();
                $scope.obtenerTiposAmbiente();
                $scope.cerrarDialogTipoAmbiente();
                SweetAlert.swal({
                    title: 'Guardado!',
                    text: 'Guardado Exitosamente!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            });
        });
    }

    $scope.fullActive = false;
    $scope.fullScreen = function () {
        let fullScreenContent = document.querySelector("#content-balneario");
        if (!document.fullscreenElement) {
            fullScreenContent?.requestFullscreen();
            $scope.fullActive = true;
        }else{
            document.exitFullscreen();
            $scope.fullActive = false;
        }
    }


    $scope.abriModalFullScreen = function(idModal){
        if (!document.fullscreenElement) {
            if ($("#" + idModal).hasClass('ui-dialog-content')) {
                $("#" + idModal).dialog('destroy');
            } 
            $scope.abrirPopup(idModal);
        }else{
            $scope.abrirPopup(idModal);
            $("#" + idModal).dialog("option", "appendTo", "#content-balneario");
        }
    }
    $scope.obtenerListaEncargados = function () {
        GetListaEncargados($scope.usuario.id_empresa).then(function (res) {
            $scope.listaEncargados = res.data
        })
    }

    $scope.buscarEncargadosVenta = function (texto, focus, cierre) {
        return GetListaEncargados($scope.usuario.id_empresa).then(async function (res) {
            $scope.listaEncargados = res.data
            var arreglo = $filter('filter')($scope.listaEncargados, { persona: {nombre_completo:texto} });
            // var arreglo =  await $scope.listaEncargados.filter(function (x) {
            //     var nombre = x.persona.nombre_completo.toUpperCase()
            //     var s = nombre.indexOf(texto.toUpperCase())
            //     if (s == -1) {
            //         var codigo = x.codigo.toUpperCase()
            //         var s = codigo.indexOf(texto.toUpperCase())
            //     }
            //     if (s != -1) {
            //         return x
            //     }
            // })
           
            if (arreglo.length == 1) {
                $scope.establecerEncargado(arreglo[0], focus)
            } else {
                return arreglo
            }
        })
        
    }
    $scope.establecerEncargado = function (data, focus) {
        $scope.venta.encargado = data
        // $scope.enfocar(focus);
    }

    $scope.abrirDialogEncargados = function () {
        $scope.obtenerListaEncargados();
        $scope.abriModalFullScreen($scope.idModalEncargados);
    }
    $scope.cerrarDialogEncargados = function () {
        $scope.cerrarPopup($scope.idModalEncargados);
    }

    $scope.abrirDialogNuevoEncargado = function (params) {
        $scope.encargado = { persona:{} }
        $scope.abriModalFullScreen($scope.idModalNuevoEncargado);
    }
    $scope.cerrarDialogNuevoEncargado = function () {
        $scope.cerrarPopup($scope.idModalNuevoEncargado);
    }

    $scope.guardarEncargado = async (nuevoEncargado) => {
        try {
            let res = await CrearEncargado($scope.usuario.id_empresa, nuevoEncargado)
            $scope.encargado = { persona:{} }
            if (res.error) {
                SweetAlert.swal("", res.message, "warning");
            }else{
                $scope.obtenerListaEncargados();
                SweetAlert.swal({
                    title: 'Guardado!',
                    text: res.message,
                    icon: 'success',
                    target: '#content-balneario',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
            
            $scope.cerrarDialogNuevoEncargado()
            $scope.$evalAsync()
        } catch (error) {
            console.log(error)
        }
    }

    $scope.editarEncargado = function (encargardo) {
        $scope.encargado = angular.copy(encargardo);
        $scope.abriModalFullScreen($scope.idModalNuevoEncargado);
    }

    $scope.eliminarEncargado = function (encargardo) {
        SweetAlert.swal({
            title: "Esta seguro?",
            html: "Esta seguro de eliminar el encargado <br\><span class='orange'>" + encargardo.persona.nombre_completo + "!</span>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            target: '#content-balneario',
            cancelButtonText: "No"
        }).then(async function (result) {
            if (result.value) {
                $scope.encargado = angular.copy(encargardo);
                $scope.encargado.eliminado = true;
                let res = await CrearEncargado($scope.usuario.id_empresa, $scope.encargado)
                $scope.encargado = { persona:{} }
                if (res.error) {
                    SweetAlert.swal("", res.message, "warning");
                }else{
                    $scope.obtenerListaEncargados();
                    SweetAlert.swal({
                        title: 'Eliminado!',
                        text: 'el encargado fue eliminado!',
                        icon: 'success',
                        target: '#content-balneario',
                        timer: 2000,
                        showConfirmButton: false
                    })
                }  
            } 
        });

        
    }

    $scope.abrirDialogAmbientes = function () {
        $scope.obtenerListaAmbientes();
        $scope.abriModalFullScreen($scope.idModalAmbientes);
    }
    $scope.cerrarDialogAmbientes = function () {
        $scope.cerrarPopup($scope.idModalAmbientes);
    }

    // PANEL DERIVADOS

    $scope.obtenerAlmacenes = function (idSucursal) {
        $scope.almacenes = [];
        var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
        return sucursal.almacenes;
    }

    $scope.obtenerAlmacenesActividades = async function (idSucursal) {
        try {
            $scope.almacenes = await $scope.obtenerAlmacenes(idSucursal);
            await $scope.obtenerActividades(idSucursal);
            if (!$scope.venta.editable) {
                $scope.venta.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : null;
                if ($scope.venta.almacen) {
                    $scope.cargarProductos();
                }
            }
            $scope.$evalAsync()
        } catch (error) {
            console.log(error)
        }

    }

    $scope.obtenerTipoEgreso = function (movimiento) {
        var nombre_corto = movimiento.clase ? movimiento.clase.nombre_corto : movimiento.nombre_corto;
        $scope.tipoEgreso = nombre_corto;
        if ($scope.venta.sucursal) {
            $scope.obtenerActividades($scope.venta.sucursal.id)
        }
        if (nombre_corto == "TRAS_ALM") {
            $scope.obtenerAlmacenesDiferente($scope.venta.sucursal.id);
        }
    }
    // == condicion save localstorage ====
    if (angular.isDefined($localStorage.color)) {
        $scope.color = $localStorage.color;
    } else {
        $localStorage.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
        $scope.color = { 'style': 'red-style', 'stylebutton': 'red-style-button' };
    }
    $scope.cambiarColor = function (color, buttonColor) {
        // == save localstorage ====
        $localStorage.color = { 'style': color, 'stylebutton': buttonColor };
        // ==== fin ======

        $('#dialog-panel-ventas-express .widget-main').removeClass('red-style green-style skyblue-style brown-style');
        $('#dialog-panel-ventas-express .widget-main').addClass(color);

        $('#dialog-panel-ventas-express .widget-main .button-style').removeClass('red-style-button green-style-button skyblue-style-button brown-style-button');
        $('#dialog-panel-ventas-express .widget-main .button-style').addClass(buttonColor);
    }
    $scope.showHideFirstRow = function () {

        if ($(".first-row").css("display") == "none") {
            $('.first-row').show("slow");
        } else {
            $(".first-row").hide(1000);
        }
    }

    $scope.abrirPopupPanelExpressDerivado = function (ambiente) {
        // $scope.filtroVenta.tipo_filtro_express = false
        $scope.sin_impresion_proforma_en_express = true
        $scope.usar_productos_derivados_panel = true
        $scope.abrirPopupPanelExpress(null, null, null, null, null, ambiente)
    }

    $scope.timeToDate = function (time, fecha) {
        var date = null
        var today = fecha ? new Date(fecha) : new Date();
        if (time) {
            var parts = time.split(':');
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parts[0], parts[1], parts[2]);
        }
        return date;
    }

    $scope.abrirPopupPanelExpress = async function (sucursal, almacen, actividad, tipoPago, movimiento, ambiente) {
        $('.panel-collapse').removeClass('in');
        if (ambiente.estado_ambiente.nombre_corto == "OCUPADO_AMB" && ambiente.ventaAmbiente.length>0) {
            
            let datos = await DatosVenta(ambiente.ventaAmbiente[0].id_venta, $scope.usuario.id_empresa);
            $scope.venta = new VentaAmbiente(datos.venta);
            // $scope.venta = datos.venta;
            var fechaActual = new Date($scope.venta.fecha);
            var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
            var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
            $scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
            $scope.venta.sucursal = $scope.venta.almacen.sucursal;
            $scope.venta.id_empresa = $scope.usuario.id_empresa; 
            $scope.venta.id_usuario = $scope.usuario.id;
            $scope.venta.editable = true;
            $scope.venta.ambiente = ambiente;
            $scope.venta.id_ambiente = ambiente.id;
            $scope.venta.id_venta_ambiente = ambiente.ventaAmbiente[0].id;
            $scope.venta.encargado = ambiente.ventaAmbiente[0].encargado;
            $scope.venta.hora_inicio = $scope.timeToDate(ambiente.ventaAmbiente[0].hora_inicio);
            $scope.venta.hora_fin = $scope.timeToDate(ambiente.ventaAmbiente[0].hora_fin);
            $scope.venta.cantidad = $scope.venta.detallesVenta[0].cantidad;
            $scope.venta.descuento = $scope.venta.detallesVenta[0].descuento;
            $scope.venta.tipo_descuento = $scope.venta.detallesVenta[0].tipo_descuento;
            $scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
            $scope.cargarProductos();
            $window.scrollTo(0, 0);

            
			
        }else{
            $window.scrollTo(0, 0);

            var estado = $scope.estadosAmbiente.find(est => est.nombre == 'OCUPADO');
            $scope.venta = new VentaAmbiente({
                usar_descuento_general: false,
                tipo_descuento: false,
                descuento: 0,
                cantidad: 1,
                tipo_recargo: false,
                recargo: 0,
                ice: 0,
                excento: 0,
                id_empresa: $scope.usuario.id_empresa, id_usuario: $scope.usuario.id, cliente: {},
                id_ambiente: ambiente.id,
                ambiente: ambiente,
                id_estado: estado.id,
                detallesVenta: [], detallesVentaNoConsolidadas: [], despachado: false,
                sucursal: sucursal, almacen: almacen, actividad: actividad, tipoPago: tipoPago, movimiento: movimiento, vendedor: null, total_descuento_general: 0
            });
            $scope.productosProcesados = [];
            if ($scope.venta.detallesVenta.length==0) {
                ambiente.producto.inventarios=[];
                $scope.agregarDetalleVentaPanelRelaciones(ambiente.producto, null, ambiente)
            }
            if (!sucursal) {
                $scope.venta.sucursal = $scope.sucursales[0];
            }
            if (!movimiento) {
                $scope.venta.movimiento = $scope.movimientosEgreso.find(function (x) {
                    return x.nombre_corto == "PFR"
                });
            }
            if (!tipoPago) {
                $scope.venta.tipoPago = $scope.tiposPago[0];
            }
            if ($scope.venta.sucursal) {
                if ($scope.venta.almacen == null) {
                    $scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
                }
            }
            

            var fechaActual = new Date();
            var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
            var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
            $scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();
        }
        // $(".first-row").hide();
        // angular.element(document.querySelector('body')).css('overflow', 'hidden');
        
        // $scope.obtenerGruposProductoEmpresa();
        
        
        
        
        $scope.obtenerTipoEgreso($scope.venta.movimiento);
        $scope.cambiarTipoPago($scope.venta);
        $scope.abriModalFullScreen($scope.idModalPanelVentasExpress);

        $('.first-row').show("slow");
        $scope.page = 1;
        $scope.idGrupoGlobal = 0;
        $scope.textoGlobal = 0;
        $scope.idPadreGlobal = 0
        $scope.idAnteriorPradreGlobal = 0
        $scope.paginaActualPanelgrupo = 1
        $scope.enfocar('nitP');
        setTimeout(function () {
            aplicarDatePickers();
            $("#venta-proforma").draggable({
                cursor: "crosshair",
                start: $scope.startDragging
            });
        }, 2000);

        angular.element($window).unbind("keydown");
        angular.element($window).bind("keydown", function (e) {
            if (e.keyCode == 115) {
                $scope.venderProformaDirecto($scope.venta, false);
            }

            if (e.keyCode == 113) {
                $scope.venderProformaDirecto($scope.venta, true);
            }

            // ========= para la tecla F10 del panel ventas ============ 
            if (e.keyCode == 121) {
                e.preventDefault();
                if ($scope.venta.detallesVenta.length > 0) {
                    var fechaActual = new Date();
                    $scope.horaActual = fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds();
                    $scope.abrirPopup($scope.idModalPanelVentasCobro);
                    $scope.enfocar('nitP1');
                    var select = $('#movimiento').val('24');
                    angular.element(select).triggerHandler('change');
                    angular.element($('#pagadoP').val($scope.venta.total)).triggerHandler('change');

                    $("form").bind("keydown", function (e) {
                        if (e.keyCode === 13) return false;
                    });
                } else {
                    SweetAlert.swal("", "¡Debe agregar al menos un producto para realizar la transacción!", "warning");
                }
            }
            // ========= para la tecla F10 fin ============ 
        });
    }

    if (document.addEventListener){
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }

    function exitHandler(){
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null){
        // Run code on exit
            var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            if (isFullScreen) {
                $scope.fullActive = true;           
            }else{
                $scope.fullActive = false;
            }            
        }
    }

    $scope.cerrarPopupPanelExpress = function () {
        // angular.element(document.querySelector('body')).css('overflow', 'scroll');
        $scope.cerrarPopup($scope.idModalPanelVentasExpress);
        $scope.productosProcesados = [];
        $scope.usar_productos_derivados_panel = false;
        angular.element($window).unbind("keydown");
    }

    $scope.verificarHoraPromocion = function (promos) {
        var promoActual = undefined
        var Estado = false
        var hora = new Date().getHours()
        var minuto = new Date().getMinutes()
        minuto = minuto >= 10 ? minuto : "0" + minuto
        for (var i = 0; i < promos.length; i++) {
            var promo = promos[i];
            if (promo.tipo_promocion) {
                var horaInicio = new Date(promo.hora_inicio).getHours()
                var minutoInicio = new Date(promo.hora_inicio).getMinutes()
                minutoInicio = minutoInicio >= 10 ? minutoInicio : "0" + minutoInicio
                if (hora > horaInicio) {
                    var horafin = new Date(promo.hora_fin).getHours()
                    var minutoFin = new Date(promo.hora_fin).getMinutes()
                    minutoFin = minutoFin >= 10 ? minutoFin : "0" + minutoFin
                    var breakfast = moment("'" + hora + ":" + minuto + "'", 'HH:mm');
                    var lunch = moment("'" + horafin + ":" + minutoFin + "'", 'HH:mm');
                    var tiempoRestante = moment.duration(lunch - breakfast).asMinutes();
                    promoActual = promo
                } else if (hora == horaInicio && minuto >= minutoInicio) {
                    var horafin = new Date(promo.hora_fin).getHours()
                    var minutoFin = new Date(promo.hora_fin).getMinutes()
                    minutoFin = minutoFin >= 10 ? minutoFin : "0" + minutoFin
                    var breakfast = moment("'" + hora + ":" + minuto + "'", 'HH:mm');
                    var lunch = moment("'" + horafin + ":" + minutoFin + "'", 'HH:mm');
                    var tiempoRestante = moment.duration(lunch - breakfast).asMinutes();
                    promoActual = promo
                }
            } else {
                tiempoRestante = 1;
                promoActual = promo
            }
        }
        var activo = tiempoRestante > 0 ? true : false
        return { activo: activo, promo: promoActual }
    }

    $scope.obtenerInventarioTotal = function (producto) {
        var cantidadTotal = 0;
        if (producto.activar_inventario) {
            for (var i = 0; i < producto.inventarios.length; i++) {
                cantidadTotal += (producto.inventarios[i].cantidad);
            }
            for (var j = 0; j < $scope.venta.detallesVenta.length; j++) {
                if ($scope.venta.detallesVenta[j].producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_FINAL || $scope.venta.detallesVenta[j].producto.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_INTER) {
                    for (var x = 0; x < $scope.venta.detallesVenta[j].producto.productosBase.length; x++) {
                        var productoBase = $scope.venta.detallesVenta[j].producto.productosBase[x];
                        if (productoBase.productoBase.tipoProducto.nombre_corto == $scope.diccionario.TIPO_PRODUCTO_INTER) {
                            for (var z = 0; z < productoBase.productoBase.productosBase.length; z++) {
                                var productoBase2 = productoBase.productoBase.productosBase[z];
                                if (productoBase2.productoBase.id == producto.id && !$scope.venta.detallesVenta[j].id) {
                                    cantidadTotal = cantidadTotal - parseInt(productoBase2.formulacion);
                                }
                            }
                        } else {
                            if (productoBase.productoBase.id == producto.id && !$scope.venta.detallesVenta[j].id) {
                                cantidadTotal = cantidadTotal - parseInt(productoBase.formulacion);
                            }
                        }
                    }
                } else {
                    if ($scope.venta.detallesVenta[j].producto.id == producto.id && !$scope.venta.detallesVenta[j].id) {
                        cantidadTotal = cantidadTotal - $scope.venta.detallesVenta[j].cantidad;
                    }
                }
            }
        } else {
            cantidadTotal = 500000;
        }
        return cantidadTotal;
    }

    $scope.cargarProductosRelacion = function () {
        $scope.productosProcesados = [];

        var promesa = ProductosPanelPaginadorRelaciones($scope.usuario.id_empresa, $scope.venta.almacen.id, $scope.usuario.id, 1, $scope.textoGlobal, $scope.idGrupoGlobal, $scope.idPadreGlobal);
        promesa.then(function (productos) {
            for (var i = 0; i < productos.length; i++) {
                var producto = productos[i]
                producto.visible = true
                producto.promocionEnHora = false
                producto.promocionActual = {}
                if (producto.promociones.length > 0 && producto.usar_promocion) {
                    var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
                    promosDia = producto.promociones.filter(function (x) {
                        return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
                    })

                    if (promosDia.length > 0) {
                        var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
                        producto.promocionEnHora = datosVerificacion.activo
                        producto.promocionActual = datosVerificacion.promo
                    }
                    if (producto.usar_dias_hablitados && promosDia.length == 0) {
                        producto.visible = false
                    }
                }
                if (producto.activar_inventario) {
                    producto.inventario_disponible = $scope.obtenerInventarioTotal(producto);
                }
                if (producto.preciosPorSucursales.length > 0) {
                    var sucP = producto.preciosPorSucursales.find(function (x) {
                        return x.sucursal.id == $scope.venta.sucursal.id
                    })
                    if (sucP) {
                        producto.precio_unitario = sucP.precio_unitario
                        producto.rango_positivo = sucP.rango_positivo
                        producto.rango_negativo = sucP.rango_negativo
                    }
                }
            }
            $scope.productos = productos;

            // ======= save localstorage ====
            if (angular.isDefined($localStorage.productosProcesados)) {

                // ===== conbinar array productos con storage ====
                $scope.productosProcesados = productos;

                for (var i = 0; i < $localStorage.productosProcesados.length; i++) {
                    for (var j = 0; j < $scope.productosProcesados.length; j++) {
                        if ($localStorage.productosProcesados[i].id == $scope.productosProcesados[j].id) {
                            $scope.productosProcesados[j].rankin = $localStorage.productosProcesados[i].rankin;
                        }
                    }
                }

            } else {
                $scope.productosProcesados = productos;
            }
            // ===== Fin save localstorage ====

            setTimeout(function () {
                aplicarSwiper(4, 3, true, 2);
            }, 1000);
        });

    }
    $scope.cargarProductos = function () {
        if ($scope.usar_productos_derivados_panel) {
            $scope.productosProcesados = [];
            $scope.page = 1;
            $scope.idGrupoGlobal = 0;
            $scope.textoGlobal = 0;
            $scope.idPadreGlobal = 0
            $scope.paginaActualPanelgrupo = 1
            $scope.cargarProductosRelacion()
        }
    }

    // para redondeo de numeros
    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    $scope.agregarDetalleVentaPanelRelaciones = function (producto, combo, ambiente) {
        $(".first-row").hide();
        if (combo) {
            $scope.productoCombo = producto
            $scope.verificarProductosCambiantesCombo(producto)
        } else {
            var promesa = VerificarHijos(producto.id, producto.id_padre?producto.id_padre:0)
            promesa.then(function (data) {
                if (data.productos.length > 0) {
                    if ($scope.idPadreGlobal != 0) {
                        $scope.idAnteriorPradreGlobal = $scope.idPadreGlobal
                    }
                    $scope.paginaActualPanelgrupo++
                    $scope.idPadreGlobal = producto.id
                    $scope.cargarProductosRelacion()
                } else {

                    //console.log("producto sssssssssss ", producto);
                    //if (producto.activar_inventario) {
                    if (producto.tiposPrecio && producto.tiposPrecio.length > 0) {
                        var tipo = producto.tiposPrecio.reduce(function (a, x) {
                            var alm = x.sucursal.almacenes.find(function (y) {
                                return y.id == $scope.venta.almacen.id
                            })
                            if (alm) {
                                a = x
                            }
                            return a
                        }, undefined)
                        producto.tiposPrecio = []
                        if (tipo) {
                            producto.tiposPrecio.push(tipo)
                        }
                    }
                    if (producto.preciosPorSucursales && producto.preciosPorSucursales.length > 0 && producto.tiposPrecio.length == 0) {
                        var tipo = producto.preciosPorSucursales.reduce(function (a, x) {
                            var alm = x.sucursal.almacenes.find(function (y) {
                                return y.id == $scope.venta.almacen.id
                            })
                            if (alm) {
                                a = x
                            }
                            return a
                        }, undefined)
                        producto.preciosPorSucursales = []
                        if (tipo) {
                            producto.preciosPorSucursales.push(tipo)
                        }
                    }
                    var promosDia = []
                    var promocionEnHora = false
                    var promocionActual = {}
                    if (producto.promociones && producto.promociones.length > 0 && producto.usar_promocion) {
                        var diaActual = $scope.obtenerDiaSemana($scope.fechaATexto(new Date()));
                        promosDia = producto.promociones.filter(function (x) {
                            return x.dia.nombre.toUpperCase() === diaActual.toUpperCase()
                        })


                        if (promosDia.length > 0) {
                            var datosVerificacion = $scope.verificarHoraPromocion(promosDia)
                            promocionEnHora = datosVerificacion.activo
                            promocionActual = datosVerificacion.promo
                        }
                    }
                    var detalleVenta;
                    $scope.cantidadInventario = 0;
                    var productosN = false;
                    var txtProductosInv = "<h5 class='widget-title blue smaller editable-click'>" + producto.nombre + "</h5>";
                    if (producto.activar_inventario) {
                        for (var i = 0; i < producto.inventarios.length; i++) {
                            $scope.cantidadInventario = $scope.cantidadInventario + producto.inventarios[i].cantidad;
                        }
                    } else {
                        if ($scope.usuario.empresa.usar_peps) {
                            if (producto.productosBase && producto.productosBase.length > 0) {

                                for (var j = 0; j < producto.productosBase.length; j++) {
                                    var i = 0, productoGet = producto.productosBase[j];
                                    var cantidadDisponible = 0;
                                    while (i < productoGet.productoBase.inventarios.length) {
                                        var invent = productoGet.productoBase.inventarios[i];
                                        if (invent.cantidad > 0) {
                                            cantidadDisponible = round(cantidadDisponible + invent.cantidad, 2);
                                        }
                                        i++;
                                    }
                                    if (!productoGet.productoBase.activar_inventario) {
                                        cantidadDisponible = 9999999
                                    }
                                    if (productoGet.cantidadformulacion) {
                                        // productoGet.cantidadformulacion = productoGet.cantidadformulacion + parseFloat(productoGet.formulacion);
                                        var k = 0;
                                        while (k < $scope.venta.detallesVenta.length) {
                                            var getDetVenta = $scope.venta.detallesVenta[k];

                                            if (getDetVenta.producto.productosBase && getDetVenta.producto.productosBase.length > 0) {
                                                for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
                                                    if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
                                                        cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
                                                    }
                                                }
                                            }

                                            k++;
                                        }
                                        if (productoGet.cantidadformulacion >= cantidadDisponible) {
                                            productosN = true;
                                            txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
                                        }
                                    } else {

                                        var k = 0, encontradoCantidad = 1;
                                        if ($scope.venta.detallesVenta) {
                                            while (k < $scope.venta.detallesVenta.length) {
                                                var getDetVenta = $scope.venta.detallesVenta[k];

                                                if ((getDetVenta.producto.id == producto.id)) {
                                                    encontradoCantidad = getDetVenta.cantidad;
                                                } else {
                                                    if (getDetVenta.producto.productosBase && getDetVenta.producto.productosBase.length > 0) {
                                                        for (var p = 0; p < getDetVenta.producto.productosBase.length; p++) {
                                                            if ((getDetVenta.producto.productosBase[p].id_producto_base == productoGet.id_producto_base)) {
                                                                cantidadDisponible = round(cantidadDisponible - parseFloat(getDetVenta.producto.productosBase[p].formulacion) * getDetVenta.cantidad, 2);
                                                                // encontradoCantidad = getDetVenta.cantidad;
                                                            }
                                                        }
                                                    }
                                                }
                                                k++;
                                            }
                                        }

                                        if (parseFloat(productoGet.formulacion) <= cantidadDisponible) {
                                            productoGet.cantidadformulacion = parseFloat(productoGet.formulacion) * encontradoCantidad;
                                            if (productoGet.cantidadformulacion >= cantidadDisponible) {
                                                productosN = true;
                                                txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
                                            }
                                        } else {
                                            productosN = true;
                                            txtProductosInv = txtProductosInv + "<strong class='green'>" + productoGet.productoBase.nombre + "</strong>" + " insuficiente, inventario disponible: " + cantidadDisponible + "<br>";
                                            // $scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + cantidadDisponible + '!');
                                        }
                                    }
                                }
                            } else {
                                if (producto.tipoProducto && producto.tipoProducto.nombre_corto == "PFINAL") {
                                    productosN = true;
                                    txtProductosInv = txtProductosInv + "<strong class='red'> No tiene composición </strong> ";
                                }
                            }
                        }
                    }
                    var j = 0, encontrado = false;
                    while (j < $scope.venta.detallesVenta.length && !encontrado) {
                        if (($scope.venta.detallesVenta[j].producto.id == producto.id && !$scope.venta.detallesVenta[j].id)) {
                            if (producto.activar_inventario) {
                                if (($scope.venta.detallesVenta[j].cantidad + 1) <= $scope.cantidadInventario) {
                                    $scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
                                } else {
                                    $scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
                                }
                            } else {
                                if (productosN) {
                                    $scope.trustedHtml = "Hello World <br> dddddd <br>"
                                    $scope.mostrarMensaje(txtProductosInv);
                                } else {
                                    $scope.venta.detallesVenta[j].cantidad = $scope.venta.detallesVenta[j].cantidad + 1;
                                }

                            }
                            encontrado = true;
                            detalleVenta = $scope.venta.detallesVenta[j];
                        }
                        j++;
                    }
                    if (!encontrado) {
                        if (producto.activar_inventario) {
                            if (1 <= $scope.cantidadInventario) {
                                var precio = 0
                                if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
                                    if (producto.tiposPrecio.length > 0) {
                                        producto.tiposPrecio.forEach(function (tipo) {
                                            if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
                                                precio = tipo.precio_unitario
                                                //$scope.tipoPrecioProducto=tipo
                                            } else {
                                                precio = producto.precio_unitario
                                            }
                                        })
                                    } else {
                                        precio = producto.precio_unitario
                                    }
                                } else if (producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

                                    precio = producto.preciosPorSucursales[0].precio_unitario

                                } else {
                                    precio = producto.precio_unitario
                                }
                                if (promocionEnHora) {
                                    precio = promocionActual.precio
                                }
                                detalleVenta = {
                                    promocionActiva: promocionEnHora, promo: promocionActual,
                                    producto: producto, precio_unitario: precio,
                                    inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
                                    cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
                                };

                                $scope.venta.detallesVenta.push(detalleVenta);
                                $scope.calcularImporteDetalleVenta(detalleVenta);
                            } else {
                                $scope.mostrarMensaje('¡Cantidad de inventario insuficiente, inventario disponible: ' + $scope.cantidadInventario + '!');
                            }
                        } else {
                            var precio = 0
                            if ($scope.venta.cliente.id && $scope.venta.cliente.tipoPrecioVenta && $scope.usuario.empresa.usar_tipo_precio && producto.tiposPrecio.length > 0) {
                                if (producto.tiposPrecio.length > 0) {
                                    producto.tiposPrecio.forEach(function (tipo) {
                                        if (tipo.id_tipo_precio == $scope.venta.cliente.tipoPrecioVenta.id) {
                                            precio = tipo.precio_unitario
                                            //$scope.tipoPrecioProducto=tipo
                                        } else {
                                            precio = producto.precio_unitario
                                        }
                                    })
                                } else {
                                    precio = producto.precio_unitario
                                }
                            } else if (producto.preciosPorSucursales && producto.preciosPorSucursales.length > 0 && $scope.usuario.empresa.usar_precio_por_sucursal) {

                                precio = producto.preciosPorSucursales[0].precio_unitario

                            } else {
                                precio = producto.precio_unitario
                            }
                            if (promocionEnHora) {
                                precio = promocionActual.precio
                            }
                            detalleVenta = {
                                promocionActiva: promocionEnHora, promo: promocionActual,
                                producto: producto, precio_unitario: precio,
                                inventario_disponible: $scope.cantidadInventario, costos: producto.inventarios,
                                cantidad: 1, descuento: producto.descuento, tipo_descuento: (producto.descuento > 0 ? true : false), recargo: 0, ice: 0, excento: 0, tipo_recargo: false
                            };

                            if (productosN) {
                                $scope.trustedHtml = "Hello World <br> dddddd <br>"
                                $scope.mostrarMensaje(txtProductosInv);
                            } else {

                                $scope.venta.detallesVenta.push(detalleVenta);
                                $scope.calcularImporteDetalleVenta(detalleVenta);

                            }

                        }
                    } else {
                        $scope.calcularImporteDetalleVenta(detalleVenta);
                    }

                    $scope.sumarTotal();
                    $scope.sumarTotalImporte();
                    $scope.calcularSaldo();
                    $scope.calcularCambio();
                    //$scope.capturarInteraccion();
                    // ========= para rankin de vendidos =====================//
                    producto.rankin += 1;

                    var indice = $scope.productosProcesados.indexOf(producto);
                    $scope.productosProcesados[indice] = producto;

                    // setTimeout(function(){
                    // 	aplicarSwiper(4,3,true,2);
                    // },5);
                    $localStorage.productosProcesados = $scope.productosProcesados;
                    //}else{
                    //$scope.mostrarMensaje('¡No esta activado el inventario para este producto!');

                    //}
                    if (producto.activar_inventario && detalleVenta) {
                        producto.inventario_disponible = $scope.cantidadInventario - detalleVenta.cantidad;
                    }
                    // ===== fin rankin ============================//
                }
            })
        }
    }
    $scope.calcularImporteDetalleVenta = function (detalleVenta) {
        detalleVenta.importe = detalleVenta.cantidad * detalleVenta.precio_unitario;
        detalleVenta.importe_dolares = detalleVenta.cantidad * (detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : detalleVenta.precio_unitario ? detalleVenta.precio_unitario / ($scope.venta_dolar) : 0);
        detalleVenta.descuento = detalleVenta.descuento ? detalleVenta.descuento : detalleVenta.descuento_dolares ? detalleVenta.descuento_dolares * (detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
        detalleVenta.descuento_dolares = detalleVenta.descuento_dolares ? detalleVenta.descuento_dolares : detalleVenta.descuento ? detalleVenta.descuento / (detalleVenta.tipo_descuento ? 1 : $scope.venta_dolar) : 0
        detalleVenta.recargo = detalleVenta.recargo ? detalleVenta.recargo : detalleVenta.recargo_dolares ? detalleVenta.recargo_dolares * (detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
        detalleVenta.recargo_dolares = detalleVenta.recargo_dolares ? detalleVenta.recargo_dolares : detalleVenta.recargo ? detalleVenta.recargo / (detalleVenta.tipo_recargo ? 1 : $scope.venta_dolar) : 0
        detalleVenta.ice = detalleVenta.ice ? detalleVenta.ice : detalleVenta.ice_dolares ? detalleVenta.ice_dolares * $scope.venta_dolar : 0
        detalleVenta.ice_dolares = detalleVenta.ice_dolares ? detalleVenta.ice_dolares : detalleVenta.ice ? detalleVenta.ice / $scope.venta_dolar : 0
        detalleVenta.excento = detalleVenta.excento ? detalleVenta.excento : detalleVenta.excento_dolares ? detalleVenta.excento_dolares * $scope.venta_dolar : 0
        detalleVenta.excento_dolares = detalleVenta.excento_dolares ? detalleVenta.excento_dolares : detalleVenta.excento ? detalleVenta.excento / $scope.venta_dolar : 0
        var descuento, recargo;
        var descuento_dolares, recargo_dolares;

        if (detalleVenta.tipo_descuento) {
            descuento = detalleVenta.importe * (detalleVenta.descuento / 100);
            descuento_dolares = detalleVenta.importe_dolares * (detalleVenta.descuento_dolares / 100);
        } else {
            descuento = detalleVenta.descuento;
            descuento_dolares = detalleVenta.descuento_dolares / 100;
        }
        if (detalleVenta.tipo_recargo) {
            recargo = detalleVenta.importe * (detalleVenta.recargo / 100);
            recargo_dolares = detalleVenta.importe_dolares * (detalleVenta.recargo_dolares / 100);
        } else {
            recargo = detalleVenta.recargo;
            recargo_dolares = detalleVenta.recargo_dolares;
        }
        detalleVenta.total = detalleVenta.importe - descuento + recargo - detalleVenta.ice - detalleVenta.excento;
        detalleVenta.total_dolares = detalleVenta.importe_dolares - descuento_dolares + recargo_dolares - detalleVenta.ice_dolares - detalleVenta.excento_dolares;
        detalleVenta.total = $scope.verificarPromosCumple(detalleVenta)
        $scope.sumarTotal()
    }

    $scope.sumarTotal = function () {
        $scope.venta.total_descuento_general = 0
        $scope.venta.total_descuento_dolares = 0
        $scope.venta.total_ice = 0
        $scope.venta.total_exento = 0
        $scope.venta.total_ice_dolares = 0
        $scope.venta.total_exento_dolares = 0
        var sumaTotal = 0;
        var sumaTotal_dolares = 0;
        $scope.venta.total_dolares = 0
        for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
            if (!$scope.venta.detallesVenta[i].eliminado) {
                // if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
                // sumaTotal_dolares = sumaTotal_dolares + $scope.venta.detallesVenta[i].total_dolares;
                $scope.venta.total_dolares += $scope.venta.detallesVenta[i].total_dolares;
                $scope.venta.total_descuento_general_dolares += $scope.venta.detallesVenta[i].descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
                $scope.venta.total_recargo_general_dolares += $scope.venta.detallesVenta[i].recargo ? $scope.venta.detallesVenta[i].total_recargo : 0
                sumaTotal = sumaTotal + $scope.venta.detallesVenta[i].total;
                $scope.venta.total_descuento_general += $scope.venta.detallesVenta[i].descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
                $scope.venta.total_recargo_general += $scope.venta.detallesVenta[i].recargo ? $scope.venta.detallesVenta[i].total_recargo : 0
                $scope.venta.total_ice += $scope.venta.detallesVenta[i].total_ice ? $scope.venta.detallesVenta[i].total_ice : 0
                $scope.venta.total_exento += $scope.venta.detallesVenta[i].total_excento ? $scope.venta.detallesVenta[i].total_excento : 0
                $scope.venta.total_ice_dolares += $scope.venta.detallesVenta[i].total_ice_dolares ? $scope.venta.detallesVenta[i].total_ice_dolares : 0
                $scope.venta.total_exento_dolares += $scope.venta.detallesVenta[i].total_exento_dolares ? $scope.venta.detallesVenta[i].total_recargo : 0
            }
        }
        //dolares
        // $scope.venta.total_dolares = sumaTotal_dolares;
        $scope.venta.pagado_dolares = Math.round($scope.venta.total_dolares * 100) / 100;
        $scope.venta.total_descuento_dolares = $scope.venta.total_descuento_dolares;
        //bolivianos
        $scope.venta.total = sumaTotal;
        $scope.venta.pagado = $scope.venta.total;
        $scope.venta.monto_tarjeta_credito = $scope.venta.total;
        $scope.venta.total_descuento_general = $scope.venta.total_descuento_general;
        $scope.venta.total_ice = $scope.venta.total_ice
        $scope.venta.total_exento = $scope.venta.total_exento
        $scope.venta.total_ice_dolares = $scope.venta.total_ice_dolares
        $scope.venta.total_exento_dolares = $scope.venta.total_exento_dolares
    }

    $scope.verificarPromosCumple = function (detalleVenta) {
        if (detalleVenta.promosCumple) {
            detalleVenta.cantidadPorCumple = detalleVenta.promosCumple.reduce(function (val, x) {
                vatotal = detalleVenta.producto
                return val + x.cantidad
            }, 0)
            var totalPorCumples = detalleVenta.promosCumple.reduce(function (val, x) {
                var total = x.cantidad * detalleVenta.producto.precio_unitario
                total = total * (1 - (x.descuento / 100))
                return val + total
            }, 0)
            cantidadRestante = detalleVenta.cantidad - detalleVenta.cantidadPorCumple
            var totalCantidadRestante = cantidadRestante * detalleVenta.producto.precio_unitario
            return totalPorCumples + totalCantidadRestante
        } else {
            return detalleVenta.total
        }
    }
    $scope.sumarTotalImporte = function () {
        var sumaImporte = 0;
        var sumaImporte_dolares = 0;
        $scope.venta.total_descuento_general = 0
        $scope.venta.total_recargo_general = 0
        $scope.venta.total_descuento_dolares = 0
        $scope.venta.total_recargo_dolares = 0
        $scope.venta.total_ice = 0
        $scope.venta.total_exento = 0
        $scope.venta.total_ice_dolares = 0
        $scope.venta.total_exento_dolares = 0
        for (var i = 0; i < $scope.venta.detallesVenta.length; i++) {
            if (!$scope.venta.detallesVenta[i].eliminado) {
                // if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
                sumaImporte_dolares = sumaImporte_dolares + $scope.venta.detallesVenta[i].importe_dolares;
                $scope.venta.total_descuento_dolares += $scope.venta.detallesVenta[i].total_descuento_dolares ? $scope.venta.detallesVenta[i].total_descuento_dolares : 0
                $scope.venta.total_recargo_dolares += $scope.venta.detallesVenta[i].total_recargo_dolares ? $scope.venta.detallesVenta[i].total_recargo_dolares : 0
                // } else {
                sumaImporte = sumaImporte + $scope.venta.detallesVenta[i].importe;
                $scope.venta.total_descuento_general += $scope.venta.detallesVenta[i].total_descuento ? $scope.venta.detallesVenta[i].total_descuento : 0
                $scope.venta.total_recargo_general += $scope.venta.detallesVenta[i].total_recargo ? $scope.venta.detallesVenta[i].total_recargo : 0

                $scope.venta.total_ice += $scope.venta.detallesVenta[i].total_ice ? $scope.venta.detallesVenta[i].total_ice : 0
                $scope.venta.total_exento += $scope.venta.detallesVenta[i].total_excento ? $scope.venta.detallesVenta[i].total_excento : 0
                $scope.venta.total_ice_dolares += $scope.venta.detallesVenta[i].total_ice_dolares ? $scope.venta.detallesVenta[i].total_ice_dolares : 0
                $scope.venta.total_exento_dolares += $scope.venta.detallesVenta[i].total_exento_dolares ? $scope.venta.detallesVenta[i].total_recargo : 0
                // }
            }
        }
        // if ($scope.usuario.empresa.ver_costos_dolares && $scope.venta.ver_dolares) {
        $scope.venta.importe_dolares = sumaImporte_dolares;
        $scope.venta.total_descuento_dolares = $scope.venta.total_descuento_dolares;
        $scope.venta.total_recargo_dolares = $scope.venta.total_recargo_dolares;

        $scope.venta.importe = sumaImporte;
        $scope.venta.total_descuento_general = $scope.venta.total_descuento_general;
        $scope.venta.total_recargo_general = $scope.venta.total_recargo_general;

        $scope.venta.total_ice = $scope.venta.total_ice
        $scope.venta.total_exento = $scope.venta.total_exento
        $scope.venta.total_ice_dolares = $scope.venta.total_ice_dolares
        $scope.venta.total_exento_dolares = $scope.venta.total_exento_dolares

    }

    $scope.calcularSaldo = function () {
        $scope.venta.saldo = $scope.venta.total - $scope.venta.a_cuenta;
    }

    $scope.calcularCambio = function () {
        if ($scope.esContado) {
            $scope.venta.cambio = Math.round(($scope.venta.pagado - $scope.venta.total) * 1000) / 1000;
            $scope.venta.cambio_dolares = Math.round(($scope.venta.pagado_dolares - $scope.venta.total_dolares) * 1000) / 1000;
            $scope.pagoMinimo_dolares = Math.round($scope.venta.total_dolares * 1000) / 1000;
            $scope.pagoMinimo = Math.round($scope.venta.total * 1000) / 1000;
        } else {
            $scope.venta.cambio = 0;
            $scope.venta.cambio_dolares = 0;
            $scope.pagoMinimo = 0;
            $scope.pagoMinimo_dolares = 0;
        }
    }

    $scope.disminuirDetalleVenta = function (detalleVenta) {
        var indice = $scope.productosProcesados.indexOf(detalleVenta.producto);
        if (detalleVenta.cantidad == 1) {
            $scope.eliminarDetalleVentaPanel(detalleVenta);
            // $scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
        } else {
            detalleVenta.cantidad = detalleVenta.cantidad - 1;
            $scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + 1;
            $scope.calcularImporteDetalleVenta(detalleVenta);
            $scope.sumarTotal();
            $scope.sumarTotalImporte();
            $scope.calcularSaldo();
        }
    }

    $scope.eliminarDetalleVentaPanel = function (detalleVenta) {
        var indice = $scope.productosProcesados.indexOf(detalleVenta.producto);
        if(detalleVenta.producto.activar_inventario && indice !== -1){
            $scope.productosProcesados[indice].inventario_disponible = $scope.productosProcesados[indice].inventario_disponible + detalleVenta.cantidad;
        }
        $scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
        $scope.sumarTotal();
        $scope.sumarTotalImporte();
        $scope.calcularSaldo();
        $scope.calcularCambio();
        //$scope.capturarInteraccion();
    }

    $scope.eliminarDetalleVenta = function (detalleVenta) {
        if (detalleVenta.id) {
            detalleVenta.eliminado = true
            $scope.sumarTotal();
            $scope.sumarTotalImporte();
            $scope.calcularSaldo();
            $scope.calcularCambio();
            //$scope.capturarInteraccion();
        } else {
            $scope.venta.detallesVenta.splice($scope.venta.detallesVenta.indexOf(detalleVenta), 1);
            $scope.sumarTotal();
            $scope.sumarTotalImporte();
            $scope.calcularSaldo();
            $scope.calcularCambio();
            //$scope.capturarInteraccion();
        }
    }

    // $scope.volverAtrasPanelGrupo = function () {
    //     $scope.textoGlobal = 0;
    //     $scope.search = "";
    //     if ($scope.paginaActualPanelgrupo > 1) {
    //         $scope.paginaActualPanelgrupo--
    //     }
    //     if ($scope.paginaActualPanelgrupo == 1) {
    //         $scope.idAnteriorPradreGlobal = 0
    //     }
    //     $scope.idPadreGlobal = $scope.idAnteriorPradreGlobal;
    //     // buscar por idPadreGlobal como id en clase=======
    //     /* var promesa = VerificarPadreGet($scope.idPadreGlobal)
    //     promesa.then(function (data) {
    //         if (data.producto) {
    //             $scope.idAnteriorPradreGlobal = data.producto.relacion.id_padre;
    //         }

    //     }); */

    //     $scope.cargarProductosRelacion()
    // }

    $scope.volverAtrasPanelGrupo =async  function () {
        $scope.textoGlobal = 0;
        $scope.search = "";
        if ($scope.paginaActualPanelgrupo > 1) {
            $scope.paginaActualPanelgrupo--
        }
        if ($scope.paginaActualPanelgrupo == 1) {
            $scope.idAnteriorPradreGlobal = 0
        }
        let ids=$scope.productos.reduce((res,x)=>{
            res.push(x.id)
            return res
        },[])
        let res = await ObtenerIdPadreAnterior(ids.join(","))
        if(res.id){
            $scope.idPadreGlobal=res.id
        }else{
            $scope.idPadreGlobal=0
        }
        $scope.cargarProductosRelacion()
        $scope.$evalAsync()
    }

    $scope.volverInicioPanelGrupo = function () {
        $scope.textoGlobal = 0;
        $scope.search = "";
        $scope.idAnteriorPradreGlobal = 0
        $scope.paginaActualPanelgrupo = 1
        $scope.idPadreGlobal = $scope.idAnteriorPradreGlobal;
        $scope.cargarProductosRelacion()
    }
    
    $scope.fechaATiempo = function (fecha) {
        var hours = fecha.getHours();
        var minutes = fecha.getMinutes();
        var seconds = fecha.getSeconds();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        //Anteponiendo un 0 a los segundos si son menos de 10
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;  // 2:41:30
    }

    $scope.guardarVentaPanel = function (valido, venta, llevar) {
        if (valido) {
            $scope.ventaBack = angular.copy(venta);
            // $scope.ocultarMensajesValidacion();
            var tiempoActual = new Date();
            venta.fecha = new Date($scope.convertirFecha(venta.fechaTexto));
            venta.fecha.setHours(tiempoActual.getHours());
            venta.fecha.setMinutes(tiempoActual.getMinutes());
            if (venta.hora_inicio && venta.hora_fin) {
                venta.hora_inicioTime = $scope.fechaATiempo(venta.hora_inicio);
                venta.hora_finTime = $scope.fechaATiempo(venta.hora_fin);
            }

            blockUI.start();
            var movimiento = venta.movimiento.nombre_corto;
            venta.$save(function (res) {
                blockUI.stop();
                if (res.hasError) {
                    if (res.detalles) {
                        SweetAlert.swal("", res.detalles.join('\n\n'), "warning");
                        $scope.venta = $scope.ventaBack;
                    } else {
                        SweetAlert.swal("", res.message, "warning");
                        $scope.venta.almacen.id = venta.almacen.id;
                        $scope.abrirPopupPanel(venta.sucursal, venta.almacen, venta.actividad, venta.tipoPago, venta.movimiento);
                    }
                } else {
                    $scope.venta = $scope.ventaBack
                    // $scope.cargarProductos();
                    if(res.venta.id_comanda) $scope.imprimirComanda(res.venta)
                    // $scope.$evalAsync()
                    SweetAlert.swal({
                        title: 'Guardado!',
                        text: "Venta registrada exitosamente!",
                        icon: 'success',
                        target: '#content-balneario',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    $scope.cerrarPopupPanelExpress();;
                    $scope.obtenerListaAmbientesActivos();
                    
                }
            }, function (error) {
                blockUI.stop();
                SweetAlert.swal("", "Ocurrio un problema al momento de guardar!", "warning");
            });
        }
    }

    $scope.calcularHorasAmbiente = (venta)=>{
        if (venta.ambiente.unidadMedida.nombre_corto == 'HORA_UNIDMED') {
            venta.hora_fin = angular.copy(venta.hora_inicio);
            venta.hora_fin = new Date(venta.hora_fin.setHours(venta.hora_fin.getHours() + (venta.ambiente.tiempo?venta.ambiente.tiempo:1)));
            console.log(venta.hora_fin)
        }else if(venta.ambiente.unidadMedida.nombre_corto == 'MINUTO_UNIDMED'){
            venta.hora_fin = angular.copy(venta.hora_inicio);
            venta.hora_fin = new Date(venta.hora_fin.setMinutes(venta.hora_fin.getMinutes() + (venta.ambiente.tiempo?venta.ambiente.tiempo:1)));
        }else if(venta.ambiente.unidadMedida.nombre_corto == 'SINTIEMPO_UNIDMED'){

        }
    }

    $scope.calcularImporteDescuento = function (venta) {
        var detalleAmbiente = $scope.venta.detallesVenta[0]
        detalleAmbiente.importe = detalleAmbiente.cantidad * detalleAmbiente.precio_unitario;
        detalleAmbiente.descuento = venta.descuento;
        var descuento;
        if (venta.tipo_descuento) {
            descuento = detalleAmbiente.importe * ((detalleAmbiente.descuento ? detalleAmbiente.descuento : detalleAmbiente.descuento_dolares ? detalleAmbiente.descuento_dolares : 0) / 100);
        } else {
            descuento = (detalleAmbiente.descuento ? detalleAmbiente.descuento : detalleAmbiente.descuento_dolares ? detalleAmbiente.descuento_dolares : 0);
        }
        
        detalleAmbiente.total = detalleAmbiente.importe - descuento;
        $scope.sumarTotal();
        $scope.sumarTotalImporte();
        $scope.calcularSaldo();
        $scope.calcularCambio();

        $scope.$evalAsync()
    }
    $scope.editarCantidad = function (venta) {
        var detalleAmbiente = $scope.venta.detallesVenta[0];
        detalleAmbiente.cantidad = venta.cantidad;
        $scope.calcularImporteDescuento(venta);
        $scope.$evalAsync()
    }
    

    $scope.abrirModalCerrarAmbiente = async function (ambiente) {
        // $scope.cierremesa = { fecha: new Date(), fechaTexto: $scope.fechaATexto(new Date()), id_empresa: $scope.usuario.id_empresa, movimiento: $scope.movimientosEgreso[0], actividad: $scope.actividades[0] }
        if (ambiente.estado_ambiente.nombre_corto == "OCUPADO_AMB" && ambiente.ventaAmbiente.length>0) {
            let datos = await DatosVenta(ambiente.ventaAmbiente[0].id_venta, $scope.usuario.id_empresa);
            $scope.venta = datos.venta;
            $scope.venta.movimiento = $scope.venta.movimiento.clase;
            $scope.venta.sucursal = $scope.venta.almacen.sucursal;
            $scope.venta.editable = true;
            $scope.venta.ambiente = ambiente;
            $scope.obtenerAlmacenesActividades($scope.venta.sucursal.id);
            $scope.abriModalFullScreen($scope.idModalCerrarAmbiente);
            $scope.$evalAsync()
        }
        
    }
    $scope.cerrarModalCerrarAmbiente = function () {
        $scope.cerrarPopup($scope.idModalCerrarAmbiente);
    }

    $scope.establecerCliente = function (cliente) {
        $scope.venta.cliente = cliente;
        $scope.enfocar('razon_social');
        //$scope.capturarInteraccion();
    }

    $scope.buscarCliente = async function (query) {
        if (query != "" && query != undefined) {
            var dato = await ClientesNit($scope.usuario.id_empresa, query);

            if (dato.length == 1) {
                $scope.establecerCliente(dato[0])
            } else {
                return dato;
            }
        }
    };

    //  guardar liquidacion venta ===================================

    $scope.guardarLiquidacionAmbiente = function (valid, venta, visa) {
        // actualizar ventas estado_mesa a false 
        // var fechaActual = new Date($scope.venta.fecha);
        //     var dia = ((fechaActual.getDate()) >= 10) ? fechaActual.getDate() : "0" + fechaActual.getDate()
        //     var mes = ((fechaActual.getMonth() + 1) >= 10) ? (fechaActual.getMonth() + 1) : "0" + (fechaActual.getMonth() + 1)
        //     $scope.venta.fechaTexto = dia + "/" + mes + "/" + fechaActual.getFullYear();

        venta.fechaTexto =   $scope.fechaATexto(new Date(venta.fecha))
        var estado = $scope.estadosAmbiente.find(est => est.nombre == 'LIBRE');
        venta.id_estado = estado ? estado.id : null;
        venta.id_venta_ambiente = venta.ambiente.ventaAmbiente[0].id;
        var promesa = UpdateVentaBalneario(venta)
        promesa.then(function (res) {
            toastr.success(res.mensaje);
            $scope.obtenerListaAmbientesActivos();
            $scope.cerrarModalCerrarAmbiente()
           
            // var datosVentasMesaGroup = groupVentasMesas(res.detalles);
            // $scope.detallesVentasMesa = res.detalles
            if (venta.movimiento.nombre_corto === $scope.diccionario.EGRE_FACTURACION) {
                $scope.imprimirVenta(venta, false)
            } else {
                $scope.generarpdfVentaMesa(venta.detallesVenta, venta, visa, "LIQUIDACIÓN CUENTA", null)
            }
        });

        
    }
    $scope.pdfPreview = function (detalle, venta, visa) {
        $scope.generarpdfVentaMesa(detalle, venta, visa, "PRELIMINAR")
    }
    $scope.generarpdfVentaMesa = function (detalle, venta, visa, titulo, pedidos) {
        var alto;
        var total = 0;
        if (detalle.length <= 2) {
            alto = 250;
        } else {
            alto = 250 + (20 * (detalle.length - 2))
        }
        for (var iterator of detalle) {
            total += iterator.total
        }
        papel = [227, alto];
        doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
        stream = doc.pipe(blobStream());
        doc.moveDown(0.4);
        doc.moveDown(0.4);
        doc.font('Helvetica-Bold', 10);
        doc.text($scope.usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
        doc.moveDown(0.4);
        doc.text(titulo, { align: 'center' });
        doc.moveDown(0.4);
        doc.font('Helvetica', 8);
        doc.text("AMBIENTE:                    " + venta.ambiente.tipo_ambiente.nombre+" #"+ venta.ambiente.numero, { align: 'left' });
        doc.moveDown(0.4);
        doc.text("ENCARGADO:                " + venta.ambiente.ventaAmbiente[venta.ambiente.ventaAmbiente.length - 1].encargado.persona.nombre_completo, { align: 'left' });
        doc.moveDown(0.4);
        var tipoPago = !visa ? "Efectivo" : "Visa"
        doc.text("PAGO                     " + tipoPago, { align: 'left' });
        doc.moveDown(0.4);
        doc.font('Helvetica-Bold', 8);
        doc.text("--------------------------------------------------------------", { align: 'center' });
        doc.moveDown(0.4);

        doc.text("TOTAL GENERAL                             " + $scope.number_format(total, 2), { align: 'center' });
        doc.text("--------------------------------------------------------------", { align: 'center' });
        doc.font('Helvetica', 8);
        doc.moveDown(0.4);
        doc.text("cant.                Producto                    SubTotal", { align: 'left' });
        doc.font('Helvetica-Bold', 8);;
        doc.moveDown(0.4);
        doc.text("--------------------------------------------------------------", { align: 'center' });
        doc.font('Helvetica', 8);
        doc.moveDown(0.4);
        var y = doc.y
        var x = doc.x
        for (var iterator of detalle) {
            doc.text(iterator.cantidad, x, y, { align: 'left', width: 110, })
            var nombre = iterator.promocionActual ? "(" + iterator.promocionActual.nombre + ")" : ""
            doc.text(iterator.producto.nombre + nombre, x + 30, y, { align: 'left', width: 110, })

            doc.text($scope.number_format(iterator.total, 2), x + 150, y, { align: 'left', width: 110, })
            y += 20

        }
        doc.y = y
        doc.x = x
        doc.moveDown(0.4);
        if (pedidos) {
            doc.text("Pedidos Realizados: " + pedidos, { align: 'center' });
        }
        doc.moveDown(0.8);
        doc.text("Gracias por su Preferencia", { align: 'center' });
        doc.moveDown(0.4);
        doc.text("Fecha: " + $scope.fechaATexto(new Date()), { align: 'center' });
        doc.moveDown(0.4);
        doc.font('Helvetica', 7);
        doc.text("AgilSof SRL. telf:4020688", { align: 'center' });
        doc.end();
        $scope.visa = false
        $scope.datosVentasMesas = [];
        stream.on('finish', function () {
            var fileURL = stream.toBlobURL('application/pdf');
            if (PDFObject.supportsPDFs) {
                $scope.abrirmodalPdfView(fileURL)
            } else {
                console.log("Boo, inline PDFs are not supported by this browser");
                var w = window.open(fileURL, '_blank', 'location=no');
                $timeout(function () {
                    w.print();
                }, 500);
            }
        });

    }

    $scope.abrirmodalPdfView = function (fileURL) {
        PDFObject.embed(fileURL, "#pdfview", {
            height: "600px", width: "600px",
            pdfOpenParams: { view: 'FitH', pagemode: 'bookmarks' }
        });  
        $scope.abriModalFullScreen($scope.modalPdfView);
    }
    $scope.cerrarmodalPdfView = function () {
        $scope.cerrarPopup($scope.modalPdfView);
    }

    $scope.imprimirVenta = async function (id_venta, esAccionGuardar) {
        if (typeof id_venta === 'object' && id_venta !== null) {
            id_venta = id_venta.id
        }
        var datos = await DatosVenta(id_venta, $scope.usuario.id_empresa);
        var ventaConsultada = datos.venta;
        ventaConsultada.configuracion = datos.configuracion;
        ventaConsultada.sucursal = datos.sucursal;
        ventaConsultada.numero_literal = datos.numero_literal;
        ventaConsultada.pieFactura = datos.pieFactura;
        ventaConsultada.sucursalDestino = datos.sucursalDestino;
        ventaConsultada.sucursalPrincipal = datos.sucursalPrincipal;
        var fecha = new Date(ventaConsultada.fecha);
        var mes = ((fecha.getMonth() + 1) >= 10) ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)
        ventaConsultada.fechaTexto = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();
       
        if (ventaConsultada.movimiento) {
            ImprimirSalida(ventaConsultada.movimiento.clase.nombre_corto, ventaConsultada, esAccionGuardar ? esAccionGuardar : false, $scope.usuario, false, $scope.mostrarMensaje);
        } else {
            ImprimirSalida(ventaConsultada.movimientoServicio.nombre_corto, ventaConsultada, esAccionGuardar ? esAccionGuardar : false, $scope.usuario, false, $scope.mostrarMensaje);
        }

    }

    $scope.imprimirComanda = async function (venta) {
        var datos = await DatosComanda(venta.id_comanda);
        var comandaConsultada = datos.comanda;

        var sizeY = 230 + (20 * comandaConsultada.DetallesComanda.length);
        doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
        stream = doc.pipe(blobStream());

        for (var j = 0; j < venta.sucursal.copias_impresion_pedido; j++) {
            if (j != 0) {
                doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
            }
            doc.font('Helvetica-Bold', 12);
            // if (llevar) {
            //     doc.text("PARA LLEVAR¡¡¡", { align: 'center' })
            // }
            doc.font('Helvetica-Bold', 14);
            doc.text("Nro. Pedido : " + comandaConsultada.numero + "", { align: 'left' });
            if ($scope.usuario.empresa.ver_usuario_en_ticket) {
                doc.font('Helvetica-Bold', 8);
                doc.text("Usuario : " + $scope.usuario.persona.nombre_completo, { align: 'left' });
            }

            doc.font('Helvetica', 8);
            doc.text(venta.sucursal.frase_pedido + " : " + venta.factura, { align: 'left' });
            doc.moveDown(0.4);
            doc.text("Encargado : " + venta.ambiente.ventaAmbiente.length > 0 ? venta.ambiente.ventaAmbiente[venta.ambiente.ventaAmbiente.length - 1].encargado.persona.nombre_completo : venta.encargado.persona.nombre_completo, { align: 'left' });
            doc.moveDown(0.4);
            doc.text("Ambiente : " + venta.ambiente.tipo_ambiente.nombre+" #"+ venta.ambiente.numero, { align: 'left' });
            doc.moveDown(0.4);
            doc.text("Total Transacción : " + comandaConsultada.total.toFixed(2), { align: 'left' });

            doc.moveDown(0.2);
            doc.text("----------------------------------------------------------------------", { align: 'center' });
            doc.moveDown(0.2);
            doc.text("Cant.                 Producto                          Subtotal", { align: 'left' });
            // doc.text("Cant.   Producto         Subtotal", { align: 'left' });
            doc.moveDown(0.2);
            doc.text("----------------------------------------------------------------------", { align: 'center' });
            doc.moveDown(0.4);
            var y = doc.y, sumaDescuento = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
            doc.fontSize(8);
            for (var i = 0; i < comandaConsultada.DetallesComanda.length; i++) {
                doc.text(comandaConsultada.DetallesComanda[i].cantidad, 20, y);
                if (comandaConsultada.DetallesComanda[i].producto) {
                    if (comandaConsultada.DetallesComanda[i].producto.nombre.length > 40) {
                        doc.fontSize(8);
                    }
                    doc.text(capitalize(comandaConsultada.DetallesComanda[i].producto.nombre.toLowerCase()), 45, y, { width: 110 });
                    doc.text(comandaConsultada.DetallesComanda[i].total.toFixed(2), 165, y, { width: 38, align: 'right' });
                    
                    doc.fontSize(8);
                }

                y = y + 18;
            }
            doc.moveDown(2);
            doc.x = 0;
            var fechaActual = new Date();
            var min = fechaActual.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            doc.fontSize(8);
            doc.text("Gracias por su preferencia", { align: 'center' });
            doc.text(" Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
            // doc.text("usuario : " + usuario.nombre_usuario, { align: 'center' });
        }
        if (venta.sucursal.imprimir_pedido_corto) {
            doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
            doc.font('Helvetica-Bold', 12);
            // if (llevar) {
            //     doc.text("PARA LLEVAR¡¡¡", { align: 'center' })
            // }
            doc.font('Helvetica-Bold', 13);
            if ($scope.usuario.empresa.ver_usuario_en_ticket) {
                doc.text($scope.usuario.persona.nombre_completo, { align: 'left' });
                doc.moveDown(0.1);
            }

            var x = doc.x
            var y = doc.y;
            doc.text("Nro. Pedido : ", 20, y, { align: 'left' });
            doc.font('Helvetica-Bold', 22);
            doc.text(venta.pedido, 120, y - 5);
            doc.font('Helvetica-Bold', 8);
            doc.text($scope.usuario.empresa.razon_social, 20, y + 15, { align: 'left' });
            /* doc.text(venta.sucursal.frase_pedido + " : " + venta.factura, { align: 'left' });
            doc.moveDown(0.4);
            doc.text("Cliente : " + venta.cliente.razon_social, { align: 'left' });
            doc.moveDown(0.4);
            doc.text("NIT/CI : " + venta.cliente.nit, { align: 'left' }); */
            doc.x = 20;
            y = doc.y;

            doc.font('Helvetica', 8);
            doc.text("Cant.  Producto                                         Subtotal", { align: 'left' });
            /* x=20 */
            y = doc.y;
            doc.fontSize(10);
            for (var i = 0; i < comandaConsultada.DetallesComanda.length; i++) {
                doc.text(comandaConsultada.DetallesComanda[i].cantidad, 20, y);
                if (comandaConsultada.DetallesComanda[i].producto) {
                    if (comandaConsultada.DetallesComanda[i].producto.nombre.length > 40) {
                        doc.fontSize(9);
                    }
                    doc.text(capitalize(comandaConsultada.DetallesComanda[i].producto.nombre.toLowerCase()), 45, y, { width: 110 });
                    doc.text(comandaConsultada.DetallesComanda[i].total.toFixed(2), 168, y);
                    doc.fontSize(10);
                }
                y = y + 20;
            }
            doc.moveDown(4);
            doc.x = 0;
            //doc.text("Gracias por su preferencia", { align: 'center' });
            var fechaActual = new Date();
            var min = fechaActual.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            doc.fontSize(8);
            doc.text(" Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
            // doc.text("usuario : " + usuario.nombre_usuario, { align: 'center' });
        }

        if (doc && stream) {
            doc.end();
            stream.on('finish', function () {
                var fileURL = stream.toBlobURL('application/pdf');
                if (PDFObject.supportsPDFs) {
                    $scope.abrirmodalPdfView(fileURL)
                } else {
                    console.log("Boo, inline PDFs are not supported by this browser");
                    var w = window.open(fileURL, '_blank', 'location=no');
                    $timeout(function () {
                        w.print();
                    }, 500);
                }
            });
        }
    }

    $scope.dateToMilliseconds = function (dato, fecha) {
        if (dato) {
            let fechaTiempo = $scope.timeToDate(dato, fecha)
            return fechaTiempo.getTime();
        }else{
            return 5000
        }
    }

    $scope.callbackTimer = {};
    $scope.callbackTimer.finished = function(ambiente) {
        ambiente.finalizado = true
        // $scope.$apply();
    };    


    // INICIO RECIBOS
	// FIN RUTAS
    $scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.idModalNuevoAmbiente);
        $scope.eliminarPopup($scope.idModalNuevoTipoAmbiente);
        $scope.eliminarPopup($scope.idModalEncargados);
        $scope.eliminarPopup($scope.idModalNuevoEncargado);
        $scope.eliminarPopup($scope.idModalPanelVentasExpress);
        $scope.eliminarPopup($scope.idModalEncargados);
        $scope.eliminarPopup($scope.idModalCerrarAmbiente);
        $scope.eliminarPopup($scope.modalPdfView);
        $scope.filtro = {}
	});
    $scope.inicio();

}]);



