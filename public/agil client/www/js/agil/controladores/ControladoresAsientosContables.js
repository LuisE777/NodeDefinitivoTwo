

angular.module('agil.controladores')
.controller('ControladorComprobantes', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI','CodigoControl', 'Paginator', 'ComprobantePaginador', 'ClasesTipo', 'ListaCuentasComprobanteContabilidad',
'ListaAsientosComprobanteContabilidad', 'NuevoComprobanteContabilidad', 'ClasesTipo', 'LibroMayorCuenta', 'ComprobanteRevisarPaginador','AsignarComprobanteFavorito', 'Diccionario', 'ObtenerCambioMoneda', 'ImprimirComprobante',
'ComprasComprobante', 'VerificarUsuarioEmpresa', 'FieldViewer', 'DatosComprobante', 'EliminarComprobante', 'ListaCambioMoneda', 'ActualizarCambioMoneda', 'GuardarComprobantesImportados',
    'ComprobanteTotalGeneralEmpresa', 'EdicionComprobanteContabilidad','DescargarListaAsientosDeComprobantes', 'ImprimirComprobanteRes', 'SweetAlert', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, CodigoControl, Paginator, ComprobantePaginador, ClasesTipo, ListaCuentasComprobanteContabilidad, ListaAsientosComprobanteContabilidad, NuevoComprobanteContabilidad, ClasesTipo, LibroMayorCuenta, ComprobanteRevisarPaginador,
    AsignarComprobanteFavorito, Diccionario, ObtenerCambioMoneda, ImprimirComprobante, ComprasComprobante, VerificarUsuarioEmpresa, FieldViewer, DatosComprobante, EliminarComprobante, ListaCambioMoneda, ActualizarCambioMoneda, GuardarComprobantesImportados,
    ComprobanteTotalGeneralEmpresa, EdicionComprobanteContabilidad,DescargarListaAsientosDeComprobantes, ImprimirComprobanteRes, SweetAlert) {
 
    $scope.asientoNuevo = false
    $scope.usuario = JSON.parse($localStorage.usuario);
    $scope.IdModalVerificarCuenta = 'modal-verificar-cuenta';
    $scope.IdModalEliminarComprobante = 'dialog-eliminar-comprobante';
    $scope.IdModalCambioMoneda = 'dialog-cambio-moneda';
    $scope.IdModalConfiguracionAreaCostos = 'modalConfiguracionAreaCostos';
    $scope.IdModalConfiguracionCentroCosto = 'modalConfiguracionCentroCosto';

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsComprobante($scope.IdModalVerificarCuenta, $scope.IdModalEliminarComprobante, $scope.IdModalCambioMoneda, $scope.IdModalConfiguracionAreaCostos, $scope.IdModalConfiguracionCentroCosto);
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        $scope.obtenerColumnasAplicacion();
        blockUI.stop();
    });
    $scope.$on('$routeChangeStart', function (next, current) {

        $scope.eliminarPopup($scope.IdModalVerificarCuenta);
        $scope.eliminarPopup($scope.IdModalEliminarComprobante)
        $scope.eliminarPopup($scope.IdModalCambioMoneda)
        $scope.eliminarPopup($scope.IdModalConfiguracionAreaCostos)
        $scope.eliminarPopup($scope.IdModalConfiguracionCentroCosto)
    });


    $scope.inicio = function () {
        $scope.opcionBimonetario2 = false
        $scope.detalleComprobante = {}
        $scope.obtenerTiposComprobante();
        $scope.asientos = []
        $scope.cuenta = {}
        $scope.diccionario = Diccionario
        $scope.comprobante = { asientos: [] }
        $scope.sucursales = $scope.obtenerSucursales();
        $scope.obtenerMeses()
        $scope.ObtenerComprobantes();
        $scope.obtenerGestiones();
        $scope.obtenerAnios("2016")
        $scope.obtenerCambioDolar()
        $scope.costoss = []
        $scope.areaCostos = { costoss: [] }
    }

    $scope.obtenerColumnasAplicacion = function () {
        $scope.fieldViewer = FieldViewer({
            crear: true,
            id_empresa: $scope.usuario.id_empresa,
            configuracion: {
                abierto: { value: "Abierto", show: true },
                comprobante: { value: "Comp.", show: true },
                numero: { value: "Nro", show: true },
                fecha: { value: "Fecha", show: true },
                sucursal: { value: "Sucursal", show: true },
                gloza: { value: "Gloza", show: true },
                hora_fecha: { value: "Hora-Fecha", show: true },
                importe: { value: "Importe", show: true },
                usuario: { value: "Usuario", show: true }
            }
        }, $scope.aplicacion.aplicacion.id);
        $scope.fieldViewer.updateObject();
    }


    $scope.obtenerTotalGeneral = function name(params) {
        var prom = ComprobanteTotalGeneralEmpresa($scope.usuario.id_empresa)
        prom.then(function (res) {
            $scope.totalGeneralComprobantes = res.total[0].total
        })
    }
    $scope.obtenerSucursales = function () {
        var sucursales = [];
        for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
            sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
        }
        return sucursales;
    }


    $scope.ObtenerComprobantes = function () {
        $scope.paginator = Paginator();
        $scope.paginator.column = "numero";
        $scope.paginator.direction = "desc";
        $scope.paginator.callBack = $scope.obtenerLista;
        var date = new Date()
        var fechafin = $scope.fechaATexto(date)
        var fechaInicio = $scope.fechaATexto(sumarDias(date, -10))
        $scope.filtro = { inicio: fechaInicio, fin: fechafin, empresa: $scope.usuario.id_empresa, clasificacion: "", tipo_comprobante: "", monto: "" };
        if ($scope.filtro.inicio != null) {
            $scope.paginator.getSearch("", $scope.filtro);
        }
    }
    function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }
    $scope.obtenerLista = function () {

        blockUI.start();

        var fechainico = $scope.paginator.filter.inicio;
        var fechafin = $scope.paginator.filter.fin;
        $scope.paginator.filter.inicio = new Date($scope.convertirFecha($scope.paginator.filter.inicio));
        $scope.paginator.filter.fin = new Date($scope.convertirFecha($scope.paginator.filter.fin));
        var promise = ComprobantePaginador($scope.paginator);
        $scope.totalImporte = 0;
        $scope.obtenerTotalGeneral()
        promise.then(function (data) {
            $scope.paginator.setPages(data.paginas);
            $scope.comprobantes = data.comprobantes;
            $scope.comprobantes.forEach(function (comprobante) {
                $scope.totalImporte = $scope.totalImporte + comprobante.importe;
            }, this);
            //$scope.filtro = { empresa: $scope.usuario.id_empresa, inicio: fechainico, fin: fechafin};
            $scope.paginator.filter.inicio = fechainico
            $scope.paginator.filter.fin = fechafin
            blockUI.stop();
        });
    }

    $scope.formatearFecha = function (fecha) {
        var fechaArreglo = fecha.split('/');
        var fechaFormateada = fechaArreglo[0] + fechaArreglo[1] + fechaArreglo[2];
        return fechaFormateada;
    }

    $scope.cerrarModalLibrosMayores = function () {
        $scope.cerrarPopup($scope.IdModalLibroMayor);
    }

    $scope.obtenerTiposComprobante = function () {
        blockUI.start();
        var promesa = ClasesTipo("TCMC");
        promesa.then(function (entidad) {
            $scope.tiposComprobantes = entidad.clases;
            blockUI.stop();
        });
    }

    $scope.obtenerGestiones = function () {
        blockUI.start();
        var promesa = ClasesTipo("GTN");
        promesa.then(function (entidad) {
            $scope.gestiones = entidad.clases;
            blockUI.stop();
        });
    }
    $scope.buscarCuentas = function (query) {
        if (query != "" && query != undefined) {
            // console.log(query)
            var promesa = ListaCuentasComprobanteContabilidad($scope.usuario.id_empresa, query);
           
            return promesa;
        }
    }

    $scope.DatosCodigoQr = [];
    $scope.cont2 = 1
    $scope.disparo = true;

    $scope.AgregarComprobante = function () {
        if ($scope.nuevoComprobante.tipo_comprobante != null && $scope.nuevoComprobante.id_sucursal != null && $scope.nuevoComprobante.fecha != null) {
            for (var index = 0; index < $scope.nuevoComprobante.asientosContables.length; index++) {

                var element = $scope.nuevoComprobante.asientosContables[index];
                if (element.activo != false && element.debe_bs != "") {
                    $scope.nuevoComprobante.importe = Math.round(($scope.nuevoComprobante.importe + element.debe_bs) * 10000) / 10000
                }
            }
            $scope.nuevoComprobante.fecha = new Date($scope.convertirFecha($scope.nuevoComprobante.fecha))
            NuevoComprobanteContabilidad.save($scope.nuevoComprobante, function (dato) {
                SweetAlert.swal("Guardado!", dato.mensaje, "success");
                $scope.cerrarNuevoComprobante();


            })
        } else {

        }
    }

     $scope.verComprobanteGuardadoSis = function (comprobante,view) {
         /* if (comprobante.abierto) { */
             $scope.crearNuevoComprobante('edicion', comprobante)
        /*  } */
     }
    $scope.verComprobante = function (comprobante, view) {
        var promesa = EdicionComprobanteContabilidad(comprobante.id)
        promesa.then(function (dato) {
            if (view) {
                $scope.crearNuevoComprobante('vista', dato.comprobante)
            } else {
                if (comprobante.abierto) {
                    // $scope.obtenerCambioMoneda2($scope.fechaATexto(dato.comprobante.fecha))
                    $scope.crearNuevoComprobante('edicion', dato.comprobante)
                    $scope.comprobanteActivoEdicion = dato.comprobante
                } else {
                    if (!dato.comprobante.id) {
                        $scope.crearNuevoComprobante('edicion', dato.comprobante)
                    }
                }

            }
        })
    }
    $scope.ComvertirDebeEnDolar = function (asiento) {
        asiento.debe_sus = Math.round((asiento.debe_bs / $scope.valorDolar) * 10000) / 10000;
    }
    $scope.ComvertirHaberEnDolar = function (asiento) {
        asiento.haber_sus = Math.round((asiento.haber_bs / $scope.valorDolar) * 10000) / 10000;
    }
    $scope.ComvertirDebeEnBolivianos = function (asiento) {
        asiento.debe_bs = Math.round((asiento.debe_sus * $scope.valorDolar) * 10000) / 10000;
    }
    $scope.ComvertirHaberEnBolivianos = function (asiento) {
        asiento.haber_bs = Math.round((asiento.haber_sus * $scope.valorDolar) * 10000) / 10000;
    }

    $scope.verificarCuentaAdmin = function (cuenta) {
        cuenta.id_comprobante = $scope.dato.id
        const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa,cuenta)
        promesa.then( function (dato) {
            console.log(dato)
            if (dato.type) {
                SweetAlert.swal("Verificado!", dato.message, "success");
                /*  cuenta.abierto= cuenta.abierto; */
                if (!$scope.dato.abierto) {
                    $scope.dato.abierto = true
                } else {
                    $scope.dato.abierto = false
                }
                $scope.cerrarModalVerificarCuenta();
            } else {
                SweetAlert.swal("", dato.message, "warning");
            }
        })
    }

    $scope.abrirModalVerificarCuenta = function (comprobante) {
        $scope.dato = comprobante
        $scope.abrirPopup($scope.IdModalVerificarCuenta);
    }
    $scope.cerrarModalVerificarCuenta = function () {

        $scope.cerrarPopup($scope.IdModalVerificarCuenta);
    }
    $scope.abrirModalEliminarComprobante = function (comprobante) {
        $scope.dato = comprobante
        $scope.abrirPopup($scope.IdModalEliminarComprobante);
    }
    $scope.cerrarModalEliminarComprobante = function () {

        $scope.cerrarPopup($scope.IdModalEliminarComprobante);
    }
    $scope.eliminarComprobante = function () {
        var promesa = EliminarComprobante($scope.dato.id)
        promesa.then(function (dato) {
            $scope.recargarItemsTabla()
            SweetAlert.swal("Eliminado!", dato.mensaje, "success");
            $scope.cerrarModalEliminarComprobante()
        })
    }
    $scope.opcionBimonetario = true;
    $scope.VerBimonetario = function () {
        console.log($scope.opcionBimonetario)
        if ($scope.opcionBimonetario != true) {
            $scope.opcionBimonetario = false;
        } else {
            $scope.opcionBimonetario = true;
        }
    }
    $scope.imprimirComprobante = function (comprobante, bimonetario, resumido) {
        blockUI.start();
        var promesa = DatosComprobante(comprobante.id)
        promesa.then(function (datosComprobante) {
            if (!datosComprobante.hasError) {
                datosComprobante.comprobante.importe_literal = datosComprobante.importeLiteral
                if (resumido) {
                    ImprimirComprobanteRes(datosComprobante.comprobante, bimonetario, $scope.usuario, $scope.number_format)
                }else{
                    ImprimirComprobante(datosComprobante.comprobante, bimonetario, $scope.usuario, $scope.number_format)
                }
            }else{
                SweetAlert.swal("", datosComprobante.mensaje, "warning");
            }
            blockUI.stop();
        })
    }

    $scope.buscarCambioMoneda = function name(filtro) {
        var promesa = ListaCambioMoneda(filtro,$scope.usuario.id_empresa)
        promesa.then(function (datos) {
            $scope.cambiosMoneda = datos
        })
    }
    $scope.abrirCambioMoneda = function () {
        $scope.filtroMoneda = { mes: "a", anio: 2018 }
        var promesa = ListaCambioMoneda($scope.filtroMoneda,$scope.usuario.id_empresa)
        promesa.then(function (datos) {
            $scope.cambiosMoneda = datos
            $scope.abrirPopup($scope.IdModalCambioMoneda);
        })

    }
    $scope.cerrarCambioMoneda = function () {
        $scope.cerrarPopup($scope.IdModalCambioMoneda);
    }
    $scope.obtenerAnios = function (startYear) {
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;

        while (startYear <= currentYear) {
            years.push(startYear++);
        }

        $scope.listYears = years;
    }
    $scope.EditarCambioMoneda = function (moneda) {
        moneda.edit = true
    }
    $scope.CancelarModificarMoneda = function () {
        var promesa = ListaCambioMoneda($scope.filtroMoneda,$scope.usuario.id_empresa)
        promesa.then(function (datos) {
            $scope.cambiosMoneda = datos
        })
    }
    $scope.GuardarCambio = function (moneda) {
        var promesa = ActualizarCambioMoneda(moneda)
        promesa.then(function (datos) {
            SweetAlert.swal("Guardado!", datos.mensaje, "success");
            moneda.edit = false
        })
    }
    $scope.obtenerCambioDolar = function () {
        var fecha = new Date()
        var promesa = ObtenerCambioMoneda(fecha,$scope.usuario.id_empresa)
        promesa.then(function (dato) {
            if (dato.monedaCambio) {
                $scope.moneda = dato.monedaCambio;

            }
        })
    }
    $scope.subirExcelComprobantes = function (event) {
       blockUI.start();
        //console.log('iniciando carga de pacientes')
        var files = event.target.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            //console.log('iniciando lectura de excel(s)')
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                blockUI.start();
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var first_sheet_name = workbook.SheetNames[0];
                var row = 2, i = 0, row2 = 2;
                var worksheet = workbook.Sheets[first_sheet_name];
                var comprobantes = [];
                var codigo = "", fecha = "", tipo = ""
                do {
                    row2 = row
                    var comprobante = { asientosContables: [] };
                    comprobante.tipoCambio = $scope.moneda
                    comprobante.tipo_comprobante = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : null;
                    tipo = comprobante.tipo_comprobante
                    comprobante.codigo = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                    codigo = comprobante.codigo
                    comprobante.fecha = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? new Date($scope.fecha_excel_angular(worksheet['C' + row].v.toString())) : null;
                    comprobante.fechaActual = new Date()
                    comprobante.sucursal = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                    fecha = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? $scope.fecha_excel_angular(worksheet['C' + row].v.toString()) : null;
                    comprobante.importe = 0
                    comprobante.gloza = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                    do {
                        var asiento = {}
                        asiento.numero_cuenta = worksheet['F' + row2] != undefined && worksheet['F' + row2] != "" ? worksheet['F' + row2].v.toString() : null;
                        asiento.codigo = worksheet['G' + row2] != undefined && worksheet['G' + row2] != "" ? worksheet['G' + row2].v.toString() : null;
                        asiento.gloza = worksheet['H' + row2] != undefined && worksheet['H' + row2] != "" ? worksheet['H' + row2].v.toString() : null;
                        asiento.debe_bs = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? parseFloat(worksheet['I' + row2].v.toString()) : null;
                        asiento.haber_bs = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? parseFloat(worksheet['J' + row2].v.toString()) : null;
                        asiento.centroCosto = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? worksheet['K' + row2].v.toString() : null;
                        asiento.auxiliares = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? worksheet['L' + row2].v.toString() : null;
                        asiento.debe_sus = Math.round((asiento.debe_bs / $scope.moneda.dolar) * 10000) / 10000;
                        asiento.haber_sus = Math.round((asiento.haber_bs / $scope.moneda.dolar) * 10000) / 10000;
                        asiento.eliminado = false
                        var codigoPrueba = worksheet['B' + row2] != undefined && worksheet['B' + row2] != "" ? parseInt(worksheet['B' + row2].v.toString()) : null;
                        var fechaPrueba = worksheet['C' + row2] != undefined && worksheet['C' + row2] != "" ? $scope.fecha_excel_angular(worksheet['C' + row2].v.toString()) : null;
                        var tipoPrueba = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? worksheet['A' + row2].v.toString() : null;

                        if (codigoPrueba == codigo && fechaPrueba == fecha && tipo == tipoPrueba) {
                            comprobante.importe += asiento.debe_bs
                            comprobante.asientosContables.push(asiento);
                        }
                        row2++;
                        var codigoPrueba2 = worksheet['B' + row2] != undefined && worksheet['B' + row2] != "" ? parseInt(worksheet['B' + row2].v.toString()) : null;
                        /*  i++; */
                    } while (codigoPrueba2 == codigo);
                    if (comprobantes.length == 0) {
                        comprobantes.push(comprobante);
                    } else if (comprobantes[comprobantes.length - 1].codigo != codigo || comprobantes[comprobantes.length - 1].tipo_comprobante != tipo) {
                        comprobantes.push(comprobante);
                    }
                    row = row2;
                    console.log(row)
                    i++;

                } while (worksheet['A' + row] != undefined);
                $scope.GuardarComprobantesImportacion(comprobantes);
            };
            reader.readAsBinaryString(f);

        }
    }
    $scope.GuardarComprobantesImportacion = function (comprobantes) {
        $scope.comprobantesParaGuardar = comprobantes
        var comprobantesArray = []
        if ($scope.comprobantesParaGuardar.length > 0) {
            if ($scope.comprobantesParaGuardar.length > 1) {
                comprobantesArray = $scope.comprobantesParaGuardar.slice(0, 1)
                $scope.comprobantesParaGuardar = $scope.comprobantesParaGuardar.slice(1, $scope.comprobantesParaGuardar.length)
            } else {
                comprobantesArray = $scope.comprobantesParaGuardar
                $scope.comprobantesParaGuardar = []
            }
            var promesa = GuardarComprobantesImportados(comprobantesArray, $scope.usuario.id, $scope.usuario.id_empresa)
            promesa.then(function (dato) {     
                blockUI.stop();    
                $scope.mostrarMensaje("del codigo "+comprobantesArray[0].codigo+" hasta el codigo "+comprobantesArray[comprobantesArray.length-1].codigo+" "+ dato.mensaje+" faltan procesar "+$scope.comprobantesParaGuardar.length+" comprobantes")
                $scope.GuardarComprobantesImportacion($scope.comprobantesParaGuardar)
            })
        }else{
            blockUI.stop();  
        }
    }



  /*  $scope.ObtenerReporteComprobantes = function () {
        $scope.paginator = Paginator();
        $scope.paginator.column = "numero";
        $scope.paginator.direction = "desc";
        $scope.paginator.callBack = $scope.obtenerLista;
        var date = new Date()
        var fechafin = $scope.fechaATexto(date)
        var fechaInicio = $scope.fechaATexto(sumarDias(date, -10))
        $scope.filtro = { inicio: fechaInicio, fin: fechafin, empresa: $scope.usuario.id_empresa, clasificacion: "", tipo_comprobante: "", monto: "" };
        if ($scope.filtro.inicio != null) {
            $scope.paginator.getSearch("", $scope.filtro);
        }
    }*/

    $scope.imprimirFiltroPDFCajaCartaOficio = function(){
        $scope.resaltar = true;
        blockUI.start();

        var fechainico = $scope.paginator.filter.inicio;
        var fechafin = $scope.paginator.filter.fin;
        var fechas = [fechainico,fechafin];

        $scope.paginator.filter.inicio = new Date($scope.convertirFecha($scope.paginator.filter.inicio));
        $scope.paginator.filter.fin = new Date($scope.convertirFecha($scope.paginator.filter.fin));
        
        var paginador = Object.assign({},$scope.paginator)
        paginador.itemsPerPage = 0;
        var promise = ComprobantePaginador(paginador);
        promise.then(function (data) {
            var reporteComprobante = data.comprobantes;

            var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //{compress: false},
                var stream = doc.pipe(blobStream());
                var fechaActual = new Date();

                var y = 100, itemsPorPagina = 27, items = 0, pagina = 1, totalPaginas = Math.ceil(reporteComprobante.length / itemsPorPagina);
                $scope.dibujarCabeceraPDFComprobantes(doc, pagina, totalPaginas, reporteComprobante,fechas);
                var index = 0;
                for (var i = 0; i < reporteComprobante.length && items <= itemsPorPagina; i++) {

                    doc.font("Helvetica",8);
                    index = index + 1;
                    doc.text(index, 40, y);
                    doc.text(reporteComprobante[i].tipoComprobante.nombre,60,y);      
                    doc.text(reporteComprobante[i].numero,125,y);  
                    var fecha = $scope.fechaATexto(reporteComprobante[i].fecha); 
                    doc.text(fecha,160,y)
                    doc.text(reporteComprobante[i].sucursal.nombre,210,y)
                    var gloza = capitalize(reporteComprobante[i].gloza.toLowerCase());
                    doc.text(gloza,280,y,{width:230})
                    if (gloza.length > 171) {
                        y = y + 20;
                    } else if (gloza.length > 106) {
                        y = y + 10;
                    } else if (gloza.length > 90) {
                        y = y + 10;
                    }  
                    doc.text(reporteComprobante[i].usuario.persona.nombres,510,y);
                    doc.text(reporteComprobante[i].importe,560,y)

                    y = y + 17;
                    items++;
                    if (items > itemsPorPagina) {
                        doc.addPage({ margin: 10, bufferPages: true });
                        y = 100;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFComprobantes(doc, pagina, totalPaginas, reporteComprobante,fechas);
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
    
    $scope.dibujarCabeceraPDFComprobantes = function(doc, pagina, totalPaginas, reporteComprobante,fechas){
        
        doc.font("Helvetica-Bold",13);
        doc.text("REPORTE COMPROBANTES",0,50,{align:'center'});
        doc.font("Helvetica-Bold",11);
        if(fechas[0] != "" && fechas[1] != ""){
            doc.text(fechas[0]+" al "+fechas[1],0,65,{align:"center"});
        }else{
            doc.text("Todo",0,65,{align:"center"});
        }

        doc.font("Helvetica-Bold",8);
        doc.text("N°",40, 90);
        doc.text("Comprobante",55,90);
        doc.text("Número",120,90);
        doc.text("Fecha",160,90);
        doc.text("Sucursal",210,90);
        doc.text("Gloza General",280,90);
        doc.text("Usuario",510,90);
        doc.text("Monto",560,90);

    }

    $scope.imprimirFiltroExcelCajaCartaOficio = function(){
        $scope.resaltar = true;
        blockUI.start();

        var fechainico = $scope.paginator.filter.inicio;
        var fechafin = $scope.paginator.filter.fin;
        $scope.paginator.filter.inicio = new Date($scope.convertirFecha($scope.paginator.filter.inicio));
        $scope.paginator.filter.fin = new Date($scope.convertirFecha($scope.paginator.filter.fin));
        
        var paginador = Object.assign({},$scope.paginator)
        paginador.itemsPerPage = 0;
        var promise = ComprobantePaginador(paginador);
        promise.then(function (data) {
            $scope.ReporteComprovante = data.comprobantes;

            var data = []
            var cabecera = ["N°","COMPROBANTE","NUMERO","FECHA","SUCURSAL","GLOZA GENERAL"
                            ,"USUARIO","MONTO"];
            data.push(cabecera);
            var index = 0;
            for (var i = 0; i < $scope.ReporteComprovante.length; i++) {	
                $scope.reporte = $scope.ReporteComprovante[i];
                columns = [];
                index = index + 1;
                columns.push(index);       
                columns.push($scope.reporte.tipoComprobante.nombre);       
                columns.push($scope.reporte.numero);    
                columns.push($scope.reporte.fecha)
                columns.push($scope.reporte.sucursal.nombre)
                columns.push($scope.reporte.gloza)
                columns.push($scope.reporte.usuario.persona.nombres);
                columns.push($scope.reporte.importe)
                data.push(columns);
            }
            
            var ws_name = "SheetJS";
            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "VENTAS-MENSUALES.xlsx");
            blockUI.stop();
        });
       // $scope.paginator.itemsPerPage = 10;
    }
    $scope.generarExcelAsientosDeComprobantes = function (inicio,fin) {
        $scope.remarcar = true;
        // SweetAlert.swal("", "Descargando archivo, por favor espere esto puede tardar varios minutos...", "info");
        SweetAlert.swal({
            title:'',
            icon: 'info',
            iconHtml:'<i class="fa fa-cloud-download size-icon"></i>',
            text: 'Descargando archivo, por favor espere esto puede tardar varios minutos...',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        SweetAlert.showLoading()
        blockUI.noOpen = true;
        var promesa = DescargarListaAsientosDeComprobantes($scope.usuario.id_empresa,inicio,fin);
        promesa.then(function (dato) {
            var data = $scope.opcionBimonetario2?[["TIPO COMPROBANTE","NUMERACION",'FECHA',"SUCURSAL","GLOSA GENERAL",'NRO. CUENTA',"CUENTA","GLOSA INDIVIDUAL","DEBE","HABER","DEBE SUS","HABER SUS","CENTRO DE COSTO","CÓDIGO CC","AUXILIARES", "ESTADO"]]:[["TIPO COMPROBANTE","NUMERACION",'FECHA',"SUCURSAL","GLOSA GENERAL",'NRO. CUENTA',"CUENTA","GLOSA INDIVIDUAL","DEBE","HABER","CENTRO DE COSTO","CÓDIGO CC","AUXILIARES", "ESTADO"]]
            var totalCosto = 0;
            for (var i = 0; i < dato.comprobantes.length; i++) {
                var comprobante =dato.comprobantes[i]
                var columns = [];

                columns.push(comprobante.tipo_comprobante)
                columns.push(comprobante.numero_comprobante)
                columns.push(new Date(comprobante.fecha_comprobante))
                columns.push(comprobante.nombre_sucursal)
                columns.push(comprobante.gloza_comprobante)
                columns.push(comprobante.codigo_cuenta)
                columns.push(comprobante.nombre_cuenta)
                columns.push(comprobante.gloza)                  
                columns.push(comprobante.debe_bs)        
                columns.push(comprobante.haber_bs)
                if($scope.opcionBimonetario2){
                    columns.push(comprobante.debe_sus)        
                    columns.push(comprobante.haber_sus)
                }
                columns.push(comprobante.nombre_centro_costos)
                columns.push(comprobante.numero_centro_costo)
                columns.push(comprobante.nombre_cuenta_auxiliar?$scope.quitarEspacioTexto(comprobante.nombre_cuenta_auxiliar): "")    
                if (comprobante.eliminado) {
                    columns.push("ANULADO") 
                }else{
                    columns.push("VIGENTE") 
                }

                data.push(columns);
            }                
            var ws_name = "SheetJS";
            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LISTA-ASIENTOS-CONTABLES-DE-COMPROBANTES.xlsx");
            SweetAlert.swal("Descarga Completa", dato.mensaje, "success");
            // blockUI.stop();
        }).catch(function (err) {
            var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
            SweetAlert.swal("", msg, "error");
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: msg, tipo: 'Error' })
            })
        });
    }
    $scope.inicio();
    

}]);