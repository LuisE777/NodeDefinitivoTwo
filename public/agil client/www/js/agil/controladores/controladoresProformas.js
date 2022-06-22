angular.module('agil.controladores')
    .controller('controladorProformas', ['$scope', '$interval', '$filter', '$rootScope', '$route', '$templateCache', '$location', '$window', '$localStorage', 'Paginator', '$timeout',
        'blockUI', 'ClasesTipo', 'ObtenerCambioMoneda', 'ClientesNit', 'FiltroProformas', 'ActividadServicio', 'ActividadesEmpresa',
        'ServiciosEmpresa', 'ProformaInfo', 'Clientes', 'fechasProforma', 'ListaSucursalesActividadesDosificacionEmpresa', 'DosificacionesDisponibles', 'ListaSucursalesUsuario', 'ListaHistorialActividad', 'ImprimirSalida', 'ConfiguracionesFacturasProformas', 'ProformasFacturadas',
        'ActualizarProforma', 'GuardarProformas', 'ProformaEliminar', 'GuardarActividadesEmpresa', 'obtenerAsignacionCentroCosto', 'GuardarAsignacionCentroCosto', 'importacionProformas', 'GuardarActividadServicio', 'FieldViewer',
        'FiltroListaProformas', 'filtroListaProformasEmpresa', 'ListaCentroCostos', 'ObtenerImagen', 'reporteProformaComparativo', 'buscarProformaPorCorrelatico', 'ProformasInfo', 'FacturaProforma', 'ImportacionFacturacion', 'ProformasFacturasImp', 'ObtenerFacturasProformas',
        'ListaCuentasParaAsignar', 'ObtenerfacturasPendienteDeContabilizar', 'SweetAlert', 'ObtenerCierreMesProforma', 'GuardarCierreMesProforma', 'VerificarUsuarioEmpresa',
        'GuardarAsignarCuentaActividad', 'FacturaProformaEliminar', function ($scope, $interval, $filter, $rootScope, $route, $templateCache, $location, $window, $localStorage, Paginator, $timeout,
            blockUI, ClasesTipo, ObtenerCambioMoneda, ClientesNit, FiltroProformas, ActividadServicio, ActividadesEmpresa,
            ServiciosEmpresa, ProformaInfo, Clientes, fechasProforma, ListaSucursalesActividadesDosificacionEmpresa, DosificacionesDisponibles, ListaSucursalesUsuario, ListaHistorialActividad, ImprimirSalida, ConfiguracionesFacturasProformas, ProformasFacturadas,
            ActualizarProforma, GuardarProformas, ProformaEliminar, GuardarActividadesEmpresa, obtenerAsignacionCentroCosto, GuardarAsignacionCentroCosto, importacionProformas, GuardarActividadServicio, FieldViewer,
            FiltroListaProformas, filtroListaProformasEmpresa, ListaCentroCostos, ObtenerImagen, reporteProformaComparativo, buscarProformaPorCorrelatico, ProformasInfo, FacturaProforma, ImportacionFacturacion, ProformasFacturasImp, ObtenerFacturasProformas, ListaCuentasParaAsignar,
            ObtenerfacturasPendienteDeContabilizar, SweetAlert, ObtenerCierreMesProforma, GuardarCierreMesProforma, VerificarUsuarioEmpresa,GuardarAsignarCuentaActividad, FacturaProformaEliminar) {

            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.modalConfiguracionActividadesServicios = 'modalConfiguracionActividadesServicios';
            $scope.wizardConfiguracionActividadesServicios = 'modal-wizard-panel-container';
            $scope.modalConfiguracionActividades = 'modalConfiguracionActividades';
            $scope.wizardConfiguracionActividades = 'modal-wizard-panel-container-actividad';
            $scope.dialogProformaEdicion = 'proforma-edicion';
            $scope.dialogClientesProforma = 'dialog-cliente-proforma';
            $scope.dialogmodalFechas = 'modalFechas';
            $scope.dialogBusquedaServicio = 'dialog-Busqueda-servicio-proforma';
            $scope.dialogDosificacionesDisponibles = 'dialog-dosificaciones-disponibles';
            $scope.confirmarDosificacion = 'dialog-dosificar-actividad';
            $scope.asignacionCentroCostoCliente = 'modalEmpresaCentroCosto';
            $scope.dialogClienteEmpresa = 'dialog-cliente-empresa';
            $scope.dialogVerFacturacion = 'dialog-ver-facturacion';
            $scope.dialogImportacion = 'dialog-importar-proformas';
            $scope.dialogReporteEmpresa = 'dialog-reporte-empresa';
            $scope.dialogGraficaEmpresa = 'dialog-grafico-reporte-empresa';
            $scope.dialogReporteCentroCostos = 'dialog-reporte-centro-costos';
            $scope.dialogGraficaIndividualEmpresa = 'dialog-grafico-individual-empresa';
            $scope.dialogGraficaComparativa = 'dialog-reporte-comparacion';
            $scope.dialog_reporte_facturas_proformas = 'dialog-reporte-facturas-proformas';
            $scope.IdModalAsignarCuentaProforma = 'dialog-asignar-cuenta-proforma';
            $scope.IdModalGenerarComprobante = 'dialog-generar-comprobante';
            $scope.IdModalVerificarCuenta = 'modal-verificar-cuenta';
            $scope.$on('$viewContentLoaded', function () {
                resaltarPestaña($location.path().substring(1));
                ejecutarScriptsProformas($scope.modalConfiguracionActividadesServicios, $scope.wizardConfiguracionActividadesServicios, $scope.dialogProformaEdicion,
                    $scope.dialogClientesProforma, $scope.modalConfiguracionActividades, $scope.wizardConfiguracionActividades, $scope.dialogmodalFechas,
                    $scope.dialogBusquedaServicio, $scope.dialogDosificacionesDisponibles, $scope.confirmarDosificacion, $scope.asignacionCentroCostoCliente,
                    $scope.dialogClienteEmpresa, $scope.dialogVerFacturacion, $scope.dialogImportacion, $scope.dialogReporteEmpresa, $scope.dialogGraficaEmpresa,
                    $scope.dialogReporteCentroCostos, $scope.dialogGraficaIndividualEmpresa, $scope.dialogGraficaComparativa, $scope.dialog_reporte_facturas_proformas,
                    $scope.IdModalAsignarCuentaProforma, $scope.IdModalGenerarComprobante, $scope.IdModalVerificarCuenta);
                $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
            });

            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.modalConfiguracionActividadesServicios);
                $scope.eliminarPopup($scope.dialogProformaEdicion);
                $scope.eliminarPopup($scope.modalConfiguracionActividades);
                $scope.eliminarPopup($scope.dialogClientesProforma);
                $scope.eliminarPopup($scope.dialogmodalFechas);
                $scope.eliminarPopup($scope.dialogBusquedaServicio)
                $scope.eliminarPopup($scope.dialogDosificacionesDisponibles)
                $scope.eliminarPopup($scope.confirmarDosificacion)
                $scope.eliminarPopup($scope.asignacionCentroCostoCliente)
                $scope.eliminarPopup($scope.dialogClienteEmpresa)
                $scope.eliminarPopup($scope.dialogVerFacturacion)
                $scope.eliminarPopup($scope.dialogImportacion)
                $scope.eliminarPopup($scope.dialogReporteEmpresa)
                $scope.eliminarPopup($scope.dialogGraficaEmpresa)
                $scope.eliminarPopup($scope.dialogReporteCentroCostos)
                $scope.eliminarPopup($scope.dialog_reporte_facturas_proformas)
                $scope.eliminarPopup($scope.IdModalAsignarCuentaProforma)
                $scope.eliminarPopup($scope.IdModalGenerarComprobante)
                $scope.eliminarPopup($scope.IdModalVerificarCuenta)
            })
            $scope.imagenEmpresa;
            const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
            imgDelay.then((img) => {
                $scope.imagenEmpresa = img
            }).catch((err) => {
                const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
                blockUI.stop()
            })
            $scope.cargarCabeceraProformasImportacion = function (event) {
                $scope.importacionCabecera = event.target.files
                $scope.importacionDetalle = event.target.files
            }
            $scope.cambiarValor = (variable) => variable && (variable ? false : true) || true;

            $scope.cargarDetalleProformasImportacion = function (event) {
                $scope.importacionDetalle = event.target.files
            }
            $scope.obtenerColumnasAplicacion = function () {
                blockUI.start();
                $scope.fieldViewer = FieldViewer({
                    crear: false,
                    id_empresa: $scope.usuario.id_empresa,
                    configuracion: {
                        numero: { value: "N°", show: true },
                        proforma: { value: "Proforma", show: true },
                        factura: { value: "Factura", show: true },
                        cliente: { value: "Cliente", show: true },
                        periodo: { value: "periodo", show: true },
                        sucursal: { value: "sucursal", show: true },
                        actividad: { value: "Act. Eco.", show: true },
                        servicio: { value: "servicio", show: true },
                        usuario: { value: "Usuario", show: true },
                        montobs: { value: "Monto Bs.", show: true },
                        montosus: { value: "monto $us", show: true },
                        fecha_proforma: { value: "Fecha Proforma", show: true },
                        fecha_recep: { value: "Fecha Recep.", show: true },
                        fecha_proforma_ok: { value: "Fecha Proforma OK", show: true },
                        fecha_factura: { value: "Fecha Factura", show: true },
                        fecha_cobro: { value: "Fecha Cobro", show: true }
                    }
                }, $scope.aplicacion.aplicacion.id);
                $scope.fieldViewer.updateObject();
                blockUI.stop();
            }

            $scope.imprimirReporteProformasPDF = function (proformas) {
                if (proformas.length === 0) {
                    blockUI.stop();
                    return $scope.mostrarMensaje('No existen datos.');
                }
                const doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                const stream = doc.pipe(blobStream());
                let y = 140;
                const itemsPorPagina = 25;
                let items = 0;
                let xSeparacion = 0;
                let pagina = 1;
                let cubeX = 70;
                let totalBsPagina = 0;
                let totalBsGeneral = 0;
                let totalSusPagina = 0;
                let totalSusGeneral = 0;
                const totalPaginas = Math.ceil(proformas.length / itemsPorPagina);
                const errores = [];
                $scope.cabeceraReporteProformasPDF(doc, pagina, totalPaginas, proformas);
                for (var i = 0; i < proformas.length; i++) {
                    doc.font('Helvetica', 6).fill('black');
                    doc.text(proformas[i].correlativo, 30, y, { width: 350 });
                    doc.text($scope.formatoFechaPDF(proformas[i].fecha_proforma), 65, y, { width: 350 });
                    doc.text(proformas[i].cliente.razon_social, 120, y, { width: 128 });
                    doc.text($scope.meses[proformas[i].periodo_mes].nombre + "/" + proformas[i].periodo_anio, 250, y, { width: 350 });
                    doc.text(proformas[i].actividadEconomica.nombre, 300, y, { width: 100 });
                    doc.text((proformas[i].factura ? "Facturado" : "Sin Facturar"), 400, y, { width: 350 });
                    doc.text($scope.number_format(proformas[i].totalImporteBs, 2), 460, y, { width: 350 });
                    const total_dolares = (proformas[i].totalImporteBs / proformas[i].cambio_dolar) || null
                    doc.text(total_dolares && $scope.number_format(total_dolares, 2) || 'ERROR', 520, y, { width: 350 });
                    totalBsPagina += proformas[i].totalImporteBs;
                    totalBsGeneral += proformas[i].totalImporteBs;
                    totalSusPagina += (proformas[i].totalImporteBs / proformas[i].cambio_dolar) || 0;
                    totalSusGeneral += (proformas[i].totalImporteBs / proformas[i].cambio_dolar) || 0;
                    y = y + 20;
                    items++;
                    if (items > itemsPorPagina || (y > 700)) {
                        doc.font('Helvetica-Bold', 6);
                        doc.text("TOTAL PÁGINA", 400, y, { width: 350 });
                        doc.text($scope.number_format(totalBsPagina, 2), 460, y, { width: 350 });
                        doc.text($scope.number_format(totalSusPagina, 2), 520, y, { width: 350 });
                        doc.addPage({ size: [612, 792], margin: 10 });
                        totalBsPagina = 0;
                        totalSusPagina = 0;
                        y = 140;;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.cabeceraReporteProformasPDF(doc, pagina, totalPaginas, proformas);
                    }
                }
                doc.font('Helvetica-Bold', 6);
                doc.text("TOTAL PÁGINA", 400, y, { width: 350 });
                doc.text($scope.number_format(totalBsPagina, 2), 460, y, { width: 350 });
                doc.text($scope.number_format(totalSusPagina, 2), 520, y, { width: 350 });
                y = y + 20;
                doc.text("TOTAL GENERAL", 400, y, { width: 350 });
                doc.text($scope.number_format(totalBsGeneral, 2), 460, y, { width: 350 });
                doc.text($scope.number_format(totalSusGeneral, 2), 520, y, { width: 350 });
                doc.end();
                blockUI.stop()
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.cabeceraReporteProformasPDF = (doc, pagina, totalPaginas, proformas) => {
                if (proformas.length === 0) {
                    blockUI.stop();
                    return $scope.mostrarMensaje('No existen datos.');
                }
                var y = 100;
                var xSeparacion = 0
                var cubeX = 100
                doc.font('Helvetica-Bold', 12)

                doc.text("REPORTE DE PROFORMAS", 150, 40, { width: 350, align: "center" });
                doc.font('Helvetica-Bold', 10)
                doc.text("Del " + $scope.formatoFechaPDF(proformas[proformas.length - 1].fecha_proforma) + " al " + $scope.formatoFechaPDF(proformas[0].fecha_proforma), 150, 60, { width: 350, align: "center" });
                doc.font('Helvetica-Bold', 7);
                doc.text("Servicio: " + ($scope.filtro.servicio ? $scope.filtro.servicio.nombre : "Todos"), 150, 80, { width: 350, align: "center" });
                doc.text("NRO. ", 30, 120, { width: 350 });
                doc.text("FECHA PROF. ", 60, 120, { width: 350 });
                doc.text("CLIENTE", 130, 120, { width: 350 });
                doc.text("PERIODO", 255, 120, { width: 350 });
                doc.text("ACTI. ECONÓMICA", 310, 120, { width: 350 });
                doc.text("ESTADO", 400, 120, { width: 350 });
                doc.text("BS", 470, 120, { width: 350 });
                doc.text("$US", 530, 120, { width: 350 });
                doc.font('Helvetica-Bold', 6);
                doc.text("Página " + pagina + " de " + totalPaginas, 200, 730, { width: 350, align: "right" });
                doc.text("Usuario " + $scope.usuario.nombre_usuario + " Fecha Imp. " + $scope.formatoFechaPDF(new Date()) + " Hrs.: " + $scope.formatoTiempoPDF(new Date()), 200, 750, { width: 350, align: "right" });

                if ($scope.imagenEmpresa) {
                    doc.image($scope.imagenEmpresa, 40, 30, { fit: [100, 100] });
                }
            }

            $scope.ReporteProformasEXCEL = function (proformas) {
                if (proformas.length === 0) {
                    blockUI.stop();
                    return $scope.mostrarMensaje('No existen datos.');
                }
                const data = [["Nro.", "FECHA", "Proforma Nro.", "Cliente/Razón socila", "NIT", "Periodo", "Sucursal", "Act. Económica", "Detalle", "servicio", "Monto Bs.", "Monto $us", "Centro de costo", "Fecha Recepción", "Fecha Prof ok", "Fecha Factura", "Fecha Cobro", "Nro. Factura", "Autorización:", "Código de control", "Estado", "Pagos a Cuenta.", "Saldo Bs."]];
                const errores = [];
                for (let i = 0; i < proformas.length; i++) {
                    for (let index = 0; index < proformas[i].detallesProformas.length; index++) {
                        const columns = [];
                        columns.push((i + 1));
                        columns.push($scope.formatoFechaPDF(proformas[i].fecha_proforma));
                        columns.push(proformas[i].correlativo);
                        columns.push(proformas[i].cliente.razon_social);
                        columns.push(proformas[i].cliente.nit);
                        columns.push(($scope.meses[proformas[i].periodo_mes].nombre + '-' + proformas[i].periodo_anio));
                        columns.push(proformas[i].sucursal.nombre);
                        columns.push(proformas[i].actividadEconomica.nombre);
                        columns.push(proformas[i].detalle);
                        columns.push(proformas[i].detallesProformas[index].servicio.nombre);
                        columns.push(proformas[i].detallesProformas[index].importe);
                        columns.push((proformas[i].detallesProformas[index].importe / proformas[i].cambio_dolar) || 'ERROR');
                        columns.push(proformas[i].detallesProformas[index].centroCosto && proformas[i].detallesProformas[index].centroCosto.nombre || '');
                        columns.push((proformas[i].fecha_recepcion ? $scope.formatoFechaPDF(proformas[i].fecha_recepcion) : "N/A"));
                        columns.push((proformas[i].fecha_proforma_ok ? $scope.formatoFechaPDF(proformas[i].fecha_proforma_ok) : "N/A"));
                        columns.push((proformas[i].fecha_factura ? $scope.formatoFechaPDF(proformas[i].fecha_factura) : "N/A"));
                        columns.push((proformas[i].fecha_cobro ? $scope.formatoFechaPDF(proformas[i].fecha_cobro) : "N/A"));
                        columns.push((proformas[i].factura ? proformas[i].factura : "N/A"));
                        columns.push((proformas[i].autorizacion ? proformas[i].autorizacion : "N/A"));
                        columns.push((proformas[i].codigo_control ? proformas[i].codigo_control : "N/A"));
                        if(proformas[i].eliminado == true){
                            columns.push(('ANULADO'));
                        }else{
                            columns.push(('VIGENTE'));
                        }
                       
                        if(proformas[i].a_cuenta > 0 ){
                            if(proformas[i].a_cuenta == proformas[i].totalImporteBs){
                                if(proformas[i].detallesProformas.length>1){
                                    columns.push((((proformas[i].detallesProformas[index].importe * 100)/ (proformas[i].totalImporteBs)) / 100) * (proformas[i].a_cuenta?proformas[i].a_cuenta:0));
                                    columns.push((0))
                                }else{
                                    columns.push((proformas[i].a_cuenta ? proformas[i].a_cuenta : "N/A"));
                                    columns.push((0))
                                }
                            }else{
                                if(proformas[i].detallesProformas.length>1){
                                    columns.push((((proformas[i].detallesProformas[index].importe * 100)/ (proformas[i].totalImporteBs)) / 100) * (proformas[i].a_cuenta?proformas[i].a_cuenta:0));
                                    columns.push((((proformas[i].detallesProformas[index].importe * 100)/ (proformas[i].totalImporteBs)) / 100) * ((proformas[i].totalImporteBs) - (proformas[i].a_cuenta?proformas[i].a_cuenta:0)));
                                }else{
                                    columns.push((proformas[i].a_cuenta ? proformas[i].a_cuenta : "N/A"));
                                    columns.push((proformas[i].totalImporteBs) - (proformas[i].a_cuenta?proformas[i].a_cuenta:0) );
                                }
                            }
                        }else if(proformas[i].a_cuenta == null ){
                            columns.push((0));
                            columns.push((proformas[i].detallesProformas[index].importe ));
                        }else if(proformas[i].a_cuenta == 0){
                            columns.push((0));
                            columns.push((proformas[i].detallesProformas[index].importe ));
                        }
                        data.push(columns);
                    }
                }
                const ws_name = "SheetJS";
                const wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                
                if (errores.length > 0) {
                    const errs = errores.map(err => 'Proforma Nº: ' + err.correlativo + ', Fecha: ' + err.fecha + ', No existe cambio dolar.').join('<br />');
                    $scope.mostrarMensaje(errs)
                }
                if (data.length < 2) return $scope.mostrarMensaje('No existen datos')
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE DE PROFORMAS.xlsx");
                blockUI.stop();
            }
            $scope.importarProformasv2 = function (event) {
                //console.log('iniciando carga de pacientes')
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    //console.log('iniciando lectura de excel(s)')
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0, row2 = 2;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var proformas = [];
                        var arregloClientes = []
                        /* var arregloCentrosCosto = [] */
                        /* var arregloProductos = [] */
                        do {
                            row2 = row
                            var proforma = { sucursal: {}, almacen: {}, tipoPago: {}, detallesVenta: [], cliente: {} };
                            proforma.correlativo = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? parseInt(worksheet['A' + row].w.toString()) : null;
                            proforma.sucursal = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : null;
                            proforma.actividad = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : null;
                            proforma.nombre_cliente = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? worksheet['D' + row].v.toString() : null;
                            proforma.nit = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? worksheet['E' + row].v.toString() : null;
                            proforma.detalle = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : null;
                            proforma.fecha_proforma = worksheet['N' + row] != undefined && worksheet['N' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheet['N' + row].v.toString())) : null;
                            proforma.fecha_recepcion = worksheet['O' + row] != undefined && worksheet['O' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheet['O' + row].v.toString())) : null;
                            proforma.fecha_proforma_ok = worksheet['P' + row] != undefined && worksheet['P' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheet['P' + row].v.toString())) : null;
                            proforma.periodo_mes = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : null;
                            proforma.periodo_anio = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? worksheet['H' + row].v.toString() : null;
                            proforma.row = row
                            proforma.detallesProformas = []
                            do {
                                var NumeroCompraA = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? parseInt(worksheet['A' + row2].v.toString()) : null;
                                if (NumeroCompraA == proforma.correlativo) {
                                    var detalleProforma = {};
                                    var bandera = false
                                    detalleProforma.id_proforma = worksheet['A' + row2] != undefined && worksheet['A' + row2] != "" ? parseInt(worksheet['A' + row2].v.toString()) : null;
                                    detalleProforma.servicio = worksheet['I' + row2] != undefined && worksheet['I' + row2] != "" ? worksheet['I' + row2].v.toString() : null;
                                    detalleProforma.precio_unitario = worksheet['J' + row2] != undefined && worksheet['J' + row2] != "" ? parseFloat(worksheet['J' + row2].v.toString()) : null;
                                    detalleProforma.cantidad = worksheet['K' + row2] != undefined && worksheet['K' + row2] != "" ? parseInt(worksheet['K' + row2].v.toString()) : null;
                                    detalleProforma.centro_costos = worksheet['L' + row2] != undefined && worksheet['L' + row2] != "" ? worksheet['L' + row2].v.toString().trim() : null;
                                    detalleProforma.monto = detalleProforma.precio_unitario * detalleProforma.cantidad;

                                    proforma.detallesProformas.push(detalleProforma);
                                    row2++;
                                }

                            } while (NumeroCompraA == proforma.correlativo);

                            row = (row2 - 1)
                            proformas.push(proforma);
                            row++;
                            i++;

                        } while (worksheet['A' + row] != undefined);
                        $scope.guardarImportacionProformas(proformas)
                    };
                    reader.readAsBinaryString(f);

                }
            }
            $scope.guardarImportacionVentasFacturacion = function (ventas, arregloClientes) {
                blockUI.start();
                var promesa = GuardarImportacionVentasFacturacion(ventas, arregloClientes, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    blockUI.stop()
                    $scope.mostrarMensaje(dato.mensaje)
                    $scope.recargarItemsTabla()
                })
            }
            $scope.importarProformas = function () {
                // blockUI.start()
                var files = $scope.importacionCabecera
                $scope.proformasImportadas = [];
                var i, f, k, l;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var readera = new FileReader();
                    var name = f.name;
                    readera.onload = function (e) {
                        // blockUI.start();
                        var data = e.target.result;
                        var workbooka = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbooka.SheetNames[0];
                        var row = 2, i = 0;
                        var worksheeta = workbooka.Sheets[first_sheet_name];
                        while (worksheeta['A' + row] != undefined) {
                            var proforma = {};
                            proforma.correlativo = worksheeta['A' + row] != undefined && worksheeta['A' + row] != "" ? parseInt(worksheeta['A' + row].w.toString()) : null;
                            proforma.sucursal = worksheeta['B' + row] != undefined && worksheeta['B' + row] != "" ? worksheeta['B' + row].v.toString() : null;
                            proforma.actividad = worksheeta['C' + row] != undefined && worksheeta['C' + row] != "" ? worksheeta['C' + row].v.toString() : null;
                            proforma.nombre_cliente = worksheeta['D' + row] != undefined && worksheeta['D' + row] != "" ? worksheeta['D' + row].v.toString() : null;
                            proforma.nit = worksheeta['E' + row] != undefined && worksheeta['E' + row] != "" ? worksheeta['E' + row].v.toString() : null;
                            proforma.detalle = worksheeta['F' + row] != undefined && worksheeta['F' + row] != "" ? worksheeta['F' + row].v.toString() : null;
                            proforma.fecha_proforma = worksheeta['N' + row] != undefined && worksheeta['N' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheeta['N' + row].v.toString())) : null;
                            proforma.fecha_recepcion = worksheeta['O' + row] != undefined && worksheeta['O' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheeta['O' + row].v.toString())) : null;
                            proforma.fecha_proforma_ok = worksheeta['P' + row] != undefined && worksheeta['P' + row] != "" ? $scope.fecha_excel_angular(parseInt(worksheeta['P' + row].v.toString())) : null;
                            proforma.periodo_mes = worksheeta['G' + row] != undefined && worksheeta['G' + row] != "" ? worksheeta['G' + row].v.toString() : null;
                            proforma.periodo_anio = worksheeta['H' + row] != undefined && worksheeta['H' + row] != "" ? worksheeta['H' + row].v.toString() : null;
                            proforma.row = row
                            proforma.detallesProformas = []
                            if (!$scope.proformasImportadas.some(function (prof) {
                                return proforma.correlativo === prof.correlativo
                            })) {
                                $scope.proformasImportadas.push(proforma);
                            }
                            row++;
                            i++;
                        }
                        blockUI.stop();
                    };
                    readera.readAsBinaryString(f);
                }
                // setTimeout(function () {
                //     $scope.guardarImportacionProformas($scope.proformasImportadas)
                // }, 2500)
                // var indx_for_delete = []
                // $scope.proformasImportadas.forEach(function (dato, i) {
                //     if (dato.actividad === null) {
                //         indx_for_delete.push(i)
                //     }
                // })
                // indx_for_delete.reverse()
                // indx_for_delete.forEach(function (indx) {
                //     $scope.proformasImportadas.splice(indx, 1)
                // })
                setTimeout(function () {
                    if ($scope.proformasImportadas.length > 0) {
                        $scope.importarDetallesProforma()
                    } else {
                        blockUI.stop()
                        $scope.mostrarMensaje('No existen datos validos para guardar.')
                    }
                }, 1500)
            }
            $scope.importarDetallesProforma = function () {
                var bfiles = $scope.importacionDetalle
                $scope.detallesImportados = [];
                for (k = 0, l = bfiles[k]; k != bfiles.length; ++k) {
                    var reader = new FileReader();
                    var name = l.name;
                    reader.onload = function (e) {
                        blockUI.start();
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, k = 0;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        do {
                            var detalleProforma = {};
                            detalleProforma.id_proforma = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? parseInt(worksheet['A' + row].v.toString()) : null;
                            detalleProforma.servicio = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : null;
                            detalleProforma.precio_unitario = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? parseFloat(worksheet['J' + row].v.toString()) : null;
                            detalleProforma.cantidad = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? parseInt(worksheet['K' + row].v.toString()) : null;
                            detalleProforma.centro_costos = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString().trim() : null;
                            detalleProforma.monto = detalleProforma.precio_unitario * detalleProforma.cantidad;
                            var indx = -1
                            if ($scope.proformasImportadas.some(function (prof) {
                                indx += 1
                                return detalleProforma.id_proforma === prof.correlativo
                            })) {
                                $scope.proformasImportadas[indx].detallesProformas.push(detalleProforma);
                            }
                            // detalle.push(detalleProforma);
                            row++;
                            k++;
                        } while (worksheet['A' + row] != undefined);
                        // $scope.guardarProductos(proformas);
                        blockUI.stop();
                    };
                    reader.readAsBinaryString(l);
                }
                setTimeout(function () {
                    $scope.guardarImportacionProformas($scope.proformasImportadas)
                }, 1500)
                // $scope.mostrarMensaje('importacionProformas')
            }

            $scope.guardarImportacionProformas = function (proformas) {
                $scope.proformasParaImportar = proformas
                var proformasArray = []
                if ($scope.proformasParaImportar.length > 0) {
                    if ($scope.proformasParaImportar.length > 100) {
                        proformasArray = $scope.proformasParaImportar.slice(0, 100)
                        $scope.proformasParaImportar = $scope.proformasParaImportar.slice(100, $scope.proformasParaImportar.length)
                    } else {
                        proformasArray = $scope.proformasParaImportar
                        $scope.proformasParaImportar = []
                    }
                    for (var index = 0; index < proformasArray.length; index++) {
                        var monto = 0
                        for (var ind = 0; ind < proformasArray[index].detallesProformas.length; ind++) {
                            monto += proformasArray[index].detallesProformas[ind].monto
                        }
                        proformasArray[index].monto = monto
                    }
                    var promesa = importacionProformas(proformasArray, $scope.usuario.id_empresa, $scope.usuario.id)
                    promesa.then(function (dato) {
                        if (dato.hasErr) {
                            blockUI.stop();
                            $scope.mostrarMensaje(dato.mensaje)
                            return
                        }
                        if ($scope.proformasParaImportar.length == 0) {
                            $scope.mostrarMensaje(dato.mensaje)
                            $scope.recargarItemsTabla()
                        } else {
                            $scope.mostrarMensaje("faltan procesar " + $scope.proformasParaImportar.length)
                        }
                        $scope.guardarImportacionProformas($scope.proformasParaImportar)
                        blockUI.stop();
                    }).catch(function (err) {
                        blockUI.stop()
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                } else {
                    $scope.cerrardialogImportacionProforma()
                    blockUI.stop();
                }
            }

            $scope.abrirdialogClienteEmpresa = function () {
                $scope.abrirPopup($scope.dialogClienteEmpresa)
            }
            $scope.cerrardialogClienteEmpresa = function () {
                $scope.cerrarPopup($scope.dialogClienteEmpresa)
            }

            $scope.calcularTotalProformas = function () {
                $scope.totalProformas = 0
                let hoy = new Date();
                $scope.totalProformasDolar = 0
                $scope.totalsaldo = 0
                $scope.totalsaldoDolar = 0
                // let dolarENUS = 0
                for (let i = 0; i < $scope.proformas.length; i++) {
                    if (!$scope.proformas[i].eliminado) {
                        // $scope.proformas[i].cambio_dolar = dolarENUS
                        $scope.totalProformas += $scope.proformas[i].totalImporteBs
                        $scope.totalProformasDolar = $scope.totalProformas / $scope.proformas[i].cambio_dolar
                        $scope.totalsaldo = (($scope.proformas[i].totalImporteBs) - ($scope.proformas[i].a_cuenta)) + ($scope.totalsaldo)
                        $scope.totalsaldoDolar = ((($scope.proformas[i].totalImporteBs) - ($scope.proformas[i].a_cuenta)) + ($scope.totalsaldo)) / ($scope.proformas[i].cambio_dolar)
                    }
                }
                // let promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                // promesa.then(function (res) {
                //     $scope.totalProformas = 0
                //     if (!res.monedaCambio) {
                //         $scope.mostrarMensaje('No hay información del tipo de cambio de dolar.')
                //     } else {
                //         dolarENUS = res.monedaCambio.dolar
                //     }
                //     for (let i = 0; i < $scope.proformas.length; i++) {
                //         if (!$scope.proformas[i].eliminado) {
                //             $scope.proformas[i].cambio_dolar = dolarENUS
                //             $scope.totalProformas += $scope.proformas[i].totalImporteBs
                //             $scope.totalProformasDolar = $scope.totalProformas / dolarENUS
                //         }
                //     }
                // }, function (err) {
                //     $scope.mostrarMensaje('Hubo un problema al recuperar el cambio de dolar para ' + hoy.toLocaleDateString())
                // })
            }

            $scope.obtenerHistorialActividad = function (actividad) {
                if (actividad.id !== undefined) {
                    var prom = ListaHistorialActividad(actividad.actividad.id, actividad.id_sucursal)
                    prom.then(function (res) {
                        $scope.historialActividad = res.historial
                    })
                }
            }

            $scope.verificarDetallesProformas = function () {
                if ($scope.detallesProformas.length > 0) {
                    var delCount = 0
                    $scope.detallesProformas.forEach(function (det) {
                        if (det.eliminado) {
                            delCount += 1
                        }
                    })
                    if (delCount === $scope.detallesProformas.length) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    if ($scope.proforma.ver) {
                        return false
                    } else if ($scope.proforma.cliente) {
                        return true
                    } else {
                        return false
                    }

                }
            }

            $scope.verificarBloqueoServicios = function () {
                if (($scope.proformaFechas !== undefined)) {
                    if ($scope.proformaFechas.ver !== undefined) {
                        return true
                    } else {
                        return false
                    }
                } else if ($scope.proforma) {
                    if ($scope.proforma.editar) {
                        return $scope.verificarDetallesProformas()
                    } else {
                        if ($scope.proforma.nueva) {
                            return false
                        } else {
                            return true
                        }
                    }
                }
            }

            //cambio de en mensaje de envio
            $scope.eliminar = (proforma, observacion) => {
                blockUI.start();
                proforma.observacion = observacion;
                // proforma.eliminado = true
                const prom = ProformaEliminar(proforma);
                prom.then((res) => {
                    blockUI.stop();
                    if (!res.hasErr) {
                        proforma.eliminado = true;
                        $scope.calcularTotalProformas();
                    } else {
                        $scope.mostrarMensaje(res.mensaje)
                    }
                    if (res.factura) {
                        $scope.mostrarMensajeEliminar(res.mensaje);
                    } else {
                        $scope.mostrarMensaje(res.mensaje);
                    }
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
                    $scope.mostrarMensaje(msg);
                })
            }


            $scope.editar = (proforma, ver) => {
                if (proforma.fecha_factura) {
                    var dfecha = new Date(proforma.fecha_factura)
                    if (proforma.fecha_factura !== null && proforma.fecha_factura !== undefined) {
                        if (Object.prototype.toString.call(dfecha) === "[object Date]") {
                            // it is a date
                            if (isNaN(dfecha.getTime())) {  // d.valueOf() could also work
                                // date is not valid
                                $scope.mostrarMensaje('Hay un problema con la fecha de la factura. Se bloqueará la edición de esta proforma.')
                                return
                            }
                            else {
                                // date is valid
                                if (!ver) {
                                    $scope.mostrarMensaje('Esta proforma no se puede editar, ya fué facturada.')
                                    return
                                }
                            }
                        }
                    }
                }

                blockUI.start()
                const prom = ProformaInfo(proforma.id, proforma.actividadEconomica.id)
                prom.then((proformaE) => {

                    $scope.proforma = proformaE.proforma
                    $scope.proforma.editar = true
                    $scope.proforma.fecha_proforma = $scope.formatoFechaPDF($scope.proforma.fecha_proforma)
                    $scope.proforma.sucursal = proformaE.proforma.sucursal
                    $scope.obtenerActividadesSucursal($scope.proforma.sucursal.id)
                    $scope.proforma.actividadEconomica = proformaE.proforma.actividadEconomica
                    $scope.obtenerServiciosActividadEmpresaPrincipal($scope.proforma.actividadEconomica)
                    if (ver !== undefined) {
                        $scope.proforma.ver = true
                    }
                    if (proformaE.mensaje !== undefined) {
                        $scope.mostrarMensaje(proformaE.mensaje)
                    } else {
                        if (!proforma.cambio_dolar) {
                            $scope.obtenerCambioMonedaProforma(dat, true)
                        }
                        $scope.proforma.periodo_mes = { id: $scope.proforma.periodo_mes }
                        $scope.proforma.periodo_anio = { id: $scope.proforma.periodo_anio }
                        $scope.obtenercentroCostosClienteEmpresa($scope.proforma.cliente)
                        $scope.detallesProformas = $scope.proforma.detallesProformas
                        $scope.detallesProformas.map(function (det, i) {
                            det.importe = det.precio_unitario * det.cantidad
                            det.precioSus = det.precio_unitario / $scope.proforma.cambio_dolar
                            det.importeSus = det.precioSus * det.cantidad
                            // $scope.detalleProforma = det
                            // $scope.calcularImporte()
                            // $scope.detalleProforma = undefined
                        })
                        // $scope.proforma.totalImporteSus = $scope.proforma.totalImporteBs / $scope.proforma.cambio_dolar
                        $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
                        // $scope.obtenerServiciosActividadEmpresaPrincipal($scope.proforma.actividadEconomica)
                    }
                    blockUI.stop()
                }).catch(function (err) {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
                $scope.abrirdialogProformaEdicion($scope.proforma)
            }
            $scope.ver = function (proforma) {
                $scope.proforma = proforma
                $scope.proforma.ver = true
                $scope.editar($scope.proforma, true)
            }

            $scope.mostarMensajeConfirmacionEliminacionActividad = function (actividad) {
                $scope.abrirPopupConfirmacionEliminacion($scope.eliminarDetalleActividadEmpresa, actividad)
            }

            $scope.verFactura = function (proforma) {
                $scope.verFacturacionProforma = {}
                if (proforma.fecha_factura == null) {
                    $scope.mostrarMensaje('La proforma aún no ha sido facturada.')
                    return
                }
                const datosProformas = []
                const prom = ProformasFacturadas($scope.usuario.id_empresa, proforma.factura, proforma.autorizacion)
                prom.then(function (res) {
                    if (res.datosProformas.length > 0) {
                        $scope.verFacturacionProforma.detalles = []
                        $scope.verFacturacionProforma.cliente = res.datosProformas[0].cliente
                        $scope.verFacturacionProforma.actividadEconomica = res.datosProformas[0].cliente
                        $scope.verFacturacionProforma.fecha_factura = res.datosProformas[0].fecha_factura.split('T')[0].split('-').reverse().join('/')
                        $scope.verFacturacionProforma.autorizacion = res.datosProformas[0].autorizacion
                        $scope.verFacturacionProforma.codigo_control = res.datosProformas[0].codigo_control
                        $scope.verFacturacionProforma.proformas = res.datosProformas
                        $scope.verFacturacionProforma.factura = res.datosProformas[0].factura
                        $scope.verFacturacionProforma.importeBs = 0
                        $scope.verFacturacionProforma.importeSus = 0
                        $scope.verFacturacionProforma.cambio_dolar = proforma.cambio_dolar
                        $scope.verFacturacionProforma.proformaSeleccionada = proforma.correlativo
                        $scope.verFacturacionProforma.fecha_proforma = proforma.fecha_proforma.split('T')[0].split('-').reverse().join('/')
                        for (let index = 0; index < res.datosProformas.length; index++) {
                            Array.prototype.push.apply($scope.verFacturacionProforma.detalles, res.datosProformas[index].detallesProformas)
                        }
                        for (let index = 0; index < $scope.verFacturacionProforma.detalles.length; index++) {
                            $scope.verFacturacionProforma.importeBs += $scope.verFacturacionProforma.detalles[index].importe
                        }
                        $scope.verFacturacionProforma.importeSus = $scope.verFacturacionProforma.importeBs / proforma.cambio_dolar
                    } else {
                        $scope.mostrarMensaje('Parece haber un error, no hay información de facturación!')
                        return
                    }
                    $scope.abrirPopup($scope.dialogVerFacturacion)
                }).catch(function (err) {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.cerrarVerFacturacion = function () {
                $scope.verFacturacionProforma = {}
                $scope.cerrarPopup($scope.dialogVerFacturacion)
            }

            $scope.imprimirFactura = (proforma, tipo, sinMembresia) => {
                if (proforma.fecha_factura == null) {
                    $scope.mostrarMensaje('La proforma aún no ha sido facturada.')
                    return
                }
                blockUI.start()
                const prom = ProformasFacturadas($scope.usuario.id_empresa, proforma.factura, proforma.autorizacion, proforma.factura_anulada)
                prom.then((res) => {
                    const datosProformas = res.datosProformas
                    let movimiento = {}
                    const promConfigFact = ConfiguracionesFacturasProformas($scope.usuario.id_empresa)
                    promConfigFact.then((configuracionFactura) => {
                        const promMov = ClasesTipo('MOVEGR')
                        promMov.then((dato) => {
                            dato.clases.forEach((clase) => {
                                if (clase.nombre == "FACTURACIÓN" && clase.nombre_corto == "FACT") {
                                    movimiento = clase
                                }
                            })
                            const promesa = ClasesTipo("TIPA");
                            promesa.then((entidad) => {
                                $scope.tiposPago = entidad.clases.reduce((value, x) => {
                                    if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
                                        value.push(x)
                                    }
                                    return value
                                }, []);
                                $scope.facturaProformas = {};
                                $scope.facturaProformas.factura_anulada = datosProformas[0].factura_anulada
                                $scope.facturaProformas.glosa_unica = datosProformas[0].glosa_unica;
                                $scope.facturaProformas.configuracion = configuracionFactura.configuracion;
                                $scope.facturaProformas.movimiento = movimiento;
                                $scope.facturaProformas.cliente = datosProformas[0].cliente;
                                $scope.facturaProformas.autorizacion = datosProformas[0].autorizacion;
                                $scope.facturaProformas.factura = datosProformas[0].factura;
                                $scope.facturaProformas.codigo_control = datosProformas[0].codigo_control;
                                $scope.facturaProformas.fecha = new Date(datosProformas[0].fecha_factura);
                                $scope.facturaProformas.fecha_limite_emision = new Date(datosProformas[0].fecha_limite_emision);
                                $scope.facturaProformas.actividad = datosProformas[0].actividadEconomica;
                                $scope.facturaProformas.sucursal = datosProformas[0].sucursal;
                                $scope.facturaProformas.detallesVenta = [];
                                $scope.facturaProformas.detalle = datosProformas[0].detalle;
                                $scope.facturaProformas.totalImporteBs = datosProformas[0].totalImporteBs;
                                $scope.facturaProformas.importe = datosProformas[0].importe;
                                $scope.facturaProformas.fecha_factura = new Date(datosProformas[0].fecha_factura).toLocaleDateString();
                                $scope.facturaProformas.fechaTexto = new Date($scope.facturaProformas.fecha).toLocaleDateString();
                                $scope.facturaProformas.periodo_mes = datosProformas[0].mes;
                                $scope.facturaProformas.periodo_anio = datosProformas[0].anio;
                                $scope.facturaProformas.datosProformas = datosProformas;
                                $scope.facturaProformas.descripcion = datosProformas[0].descripcion;
                                $scope.facturaProformas.movimiento = movimiento;
                                $scope.facturaProformas.id_movimiento = $scope.facturaProformas.movimiento.id;
                                $scope.facturaProformas.id_tipo_pago = $scope.tiposPago[0].id;
                                $scope.facturaProformas.tipoPago = $scope.tiposPago[1];
                                $scope.obtenerTipoEgreso($scope.facturaProformas.movimiento);
                                $scope.esContado = false;
                                $scope.facturaProformas.usar_servicios = true;
                                $scope.facturaProformas.id_usuario = $scope.usuario.id;
                                $scope.facturaProformas.fecha = datosProformas[0].fecha;
                                $scope.facturaProformas.id_empresa = $scope.usuario.id_empresa;
                                $scope.facturaProformas.total = 0;
                                $scope.facturaProformas.importe = 0;
                                $scope.facturaProformas.datosProformas.forEach((proforma, i) => {
                                    proforma.detallesProformas.map((det, y) => {
                                        det.tc = proforma.cambio_dolar;
                                        det.total = det.precio_unitario * det.cantidad;
                                        $scope.facturaProformas.total += det.total;
                                        $scope.facturaProformas.importe += det.total;
                                        $scope.facturaProformas.detallesVenta.push(det)
                                        if (y === proforma.detallesProformas.length - 1) {
                                            if (i == $scope.facturaProformas.datosProformas.length - 1) {
                                                $scope.facturaProformas.importeLiteral = ConvertirALiteral($scope.facturaProformas.importe.toFixed(2));
                                                $scope.facturaProformas.numero_literal = $scope.facturaProformas.importeLiteral;
                                                if ($scope.checkResourceImg($scope.usuario.empresa.imagen, $scope.usuario.empresa.imageLoaded)) {
                                                    convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
                                                        if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                                                            $scope.usuario.empresa.imagen = imagenEmpresa;
                                                            $scope.usuario.empresa.imageLoaded = true;
                                                            if (tipo === null) {
                                                                ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                            }
                                                            if (tipo === true) {
                                                                ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                            }
                                                            if (tipo === false) {
                                                                ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                            }
                                                        } else {
                                                            convertUrlToBase64Image("img/agilsoftware.png", (imagenEmpresa) => {
                                                                $scope.mostrarMensaje('No se encuentra la imagen de la empresa. Se usara la imagen del software.')
                                                                $scope.usuario.empresa.imagen = imagenEmpresa;
                                                                $scope.usuario.empresa.imageLoaded = true;
                                                                if (tipo === null) {
                                                                    ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                                }
                                                                if (tipo === true) {
                                                                    ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                                }
                                                                if (tipo === false) {
                                                                    ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, tipo, sinMembresia);
                                                                }
                                                            })
                                                        }
                                                    })
                                                } else {
                                                    $scope.mostrarMensaje('Existe un problema con la imagen, no se incluira en la impresión.')
                                                    $timeout(() => {
                                                        if (tipo === null) {
                                                            //Imprimir formato actual(antiguo)
                                                            ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, null)
                                                        }
                                                        if (tipo === true) {
                                                            //Imprimir formato nuevo con detalle
                                                            ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, true)
                                                        }
                                                        if (tipo === false) {
                                                            //Imprimir formato nuevo sin detalle
                                                            ImprimirSalida("FACT", $scope.facturaProformas, false, $scope.usuario, null, null, false)
                                                        }
                                                    }, 1500)
                                                }
                                            }
                                            // $scope.dolarActual = $scope.obtenerCambioDolarActual()
                                        }
                                    })
                                });
                                blockUI.stop()
                            }).catch((err) => {
                                blockUI.stop()
                                const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                $scope.mostrarMensaje(msg)
                            })
                        }).catch((err) => {
                            blockUI.stop()
                            const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                        })
                    }).catch((err) => {
                        blockUI.stop()
                        const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.eliminarDetalleActividadEmpresa = (actividad) => {
                if (actividad.id !== undefined) {
                    actividad.eliminado = true
                } else {
                    $scope.actividadesSucursal.splice($scope.actividadesSucursal.indexOf(actividad), 1)
                }
                $scope.cerrarConfirmacionEliminacion();
            }

            $scope.getFecha = () => {
                if ($scope.proforma !== undefined) {
                    return new Date($scope.proforma.fecha)
                } else {
                    return new Date()
                }
            }

            $scope.editarServicio = (servicio) => {
                servicio.editado = true
                $scope.nActividad.actividadEconomica.actividad = servicio.actividad
                $scope.nActividad.servicio = servicio

            }
            $scope.modificarProformaPrecioUnitarioServicio = (detalle) => {
                if (detalle.editarPrecio === undefined) {
                    detalle.editarPrecio = true
                } else {
                    detalle.editarPrecio = undefined
                }
            }
            $scope.actualizarPeriodo = (date) => {
                var fecha = new Date($scope.convertirFecha(date))
                $scope.obtenerCambioMonedaProforma(fecha, true)
                $scope.proforma.periodo_mes.id = fecha.getMonth()
                $scope.proforma.periodo_anio.id = fecha.getFullYear()
            }
            $scope.buscarCliente = (query) => {
                if (query != "" && query != undefined) {
                    var promesa = ClientesNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            }

            $scope.establecerCliente = (cliente) => {
                if (!$scope.proforma.ver && $scope.verificarDetallesProformas()) {
                    $scope.proforma.cliente = cliente
                    $scope.obtenercentroCostosClienteEmpresa(cliente)
                    $scope.enfocar('proformaDetalle')
                } else {
                    $scope.mostrarMensaje('No se permite.')
                }
            }

            $scope.enfocar = (elemento) => {
                $timeout(() => {
                    $("#" + elemento).focus();
                }, 0);
            }

            $scope.inicio = () => {
                setTimeout(() => {
                    $scope.obtenerColumnasAplicacion()
                }, 600)
                $scope.listaCentroCostosClienteEmpresa = []
                $scope.actividadesSucursal = []
                $scope.nActividad = {}
                $scope.proforma = {}
                $scope.configuracionActividadServicio = []
                $scope.servicios = []
                $scope.detalleProforma = {}
                $scope.detallesProformas = []
                $scope.obtenerClientes()
                $scope.obtenerActividadesEmpresa($scope.usuario.empresa.id)
                $scope.filtro = { buscarFactura: false, empresa: $scope.usuario.empresa.id, mes: { id: (new Date().getMonth() + 1) }, anio: { id: new Date().getFullYear() }, sucursal: 0, actividadEconomica: 0, servicio: 0, monto: 0, razon: 0, usuario: "", pagina: 1, items_pagina: 10, busqueda: 0, numero: 0 }
                // $scope.meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" }, { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
                // { id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];
                $scope.proformas = []
                $scope.sucursalesUsuario = "";
                for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
                    $scope.sucursalesUsuario = $scope.sucursalesUsuario + $scope.usuario.sucursalesUsuario[i].sucursal.id;
                    if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
                        $scope.sucursalesUsuario = $scope.sucursalesUsuario + ',';
                    }
                }
                // $scope.filtro.anio = $scope.anios[0];
                // $scope.filtro.mes = $scope.mesesFiltro[0];
                $scope.obtenerPaginador()
                $scope.obtenerCentroCosto()
                // $scope.estadoPGraficoEmpresa = 'gBarras';
                // $scope.estadoGraficoSimple = 'gBarras';
                // $scope.estadoGraficoFacturado = 'gFactura';
                $scope.estadoTipoMoneda = 'gDolar';
                // $scope.limiteListaClienteEmpresa = 10
            }

            // $scope.cargarMasItemsListaClienteEmpresa = () => {
            //     $scope.limiteListaClienteEmpresa += 10
            // }

            $scope.verificarFechaRecepcion = (fecha_recepcion) => {
                if (fecha_recepcion !== null && fecha_recepcion !== undefined) {
                    return false
                } else {
                    return true
                }
            }

            $scope.verificarFechaProformaOk = (fecha_proforma_ok) => {
                if (fecha_proforma_ok !== null && fecha_proforma_ok !== undefined) {
                    return false
                } else {
                    return true
                }
            }

            $scope.verificarFechaFactura = (fecha_factura) => {
                if (fecha_factura !== null && fecha_factura !== undefined) {
                    return false
                } else {
                    return true
                }
            }
            $scope.fechasIncorrec = false;
            $scope.validarNoMayorAlaFecha = function (fecha) {
                $scope.fecha_recepcion = new Date(fecha.fecha_recepcion_texto.split('/').reverse().join('-'));
                if($scope.fecha_recepcion > new Date(fecha.fecha_proforma)){
                    toastr.warning("Fecha de Recepción debe ser menor a la Fecha de Proforma");
                    $scope.fechasIncorrec = true;
                }else{
                    $scope.fechasIncorrec = false;
                }
            }

            $scope.actualizarFechas = () => {
                blockUI.start()
                if ($scope.proformaFechas !== undefined) {
                    $scope.proformaFechas.fecha_recepcion = $scope.proformaFechas.fecha_recepcion_texto && $scope.proformaFechas.fecha_recepcion_texto.split('/').reverse().join('-') || null;
                    $scope.proformaFechas.fecha_proforma_ok = $scope.proformaFechas.fecha_proforma_ok_texto && $scope.proformaFechas.fecha_proforma_ok_texto.split('/').reverse().join('-') || null;
                    $scope.proformaFechas.fecha_factura = $scope.proformaFechas.fecha_factura_texto && $scope.proformaFechas.fecha_factura_texto.split('/').reverse().join('-') || null;
                    $scope.proformaFechas.fecha_cobro = $scope.proformaFechas.fecha_cobro_texto && $scope.proformaFechas.fecha_cobro_texto.split('/').reverse().join('-') || null;
                    fechasProforma.save({ id: $scope.proformaFechas.id }, $scope.proformaFechas, (res) => {
                        $scope.proformaFechas = undefined;
                        SweetAlert.swal("Guardado!", res.mensaje, "success");
                        $scope.cerrardialogmodalFechas();
                        $route.reload()
                        blockUI.stop()
                    }, (err) => {
                        $scope.mostrarMensaje(err.data === undefined ? err.message + '<br />' + err.stack : err.data)
                        blockUI.stop()
                    })
                }
            }

            $scope.sinFuncionalidad = function () {
                $scope.mostrarMensaje('Sin funcionalidad')
            }

            $scope.agregardetalleProforma = function (detalleProforma) {
                if (detalleProforma.id_servicio !== undefined) {
                    if (!detalleProforma.editar) {
                        $scope.detallesProformas.push(detalleProforma)
                    } else {
                        $scope.detallesProformas[$scope.detallesProformas.indexOf(detalleProforma)] = detalleProforma
                        $scope.detalleProforma.editar = undefined
                    }

                    $scope.detalleProforma = {}
                    $scope.modificarProformaPrecioUnitarioServicio(detalleProforma)
                }
                $scope.getTotalesDetalleProforma();
                $scope.enfocar('id_servicioProforma')
            }
            $scope.obtenerCambioMonedaProforma = function (fechaMoneda, asignarAProforma) {
                var promesa = ObtenerCambioMoneda(fechaMoneda, $scope.usuario.id_empresa)
                promesa.then(function (dato) {
                    if (dato.monedaCambio) {
                        $scope.moneda = dato.monedaCambio;
                        if (asignarAProforma) $scope.proforma.cambio_dolar = $scope.moneda.dolar;
                        if ($scope.detalleProforma !== undefined) {
                            $scope.calcularImporte()
                        }
                    } else {
                        $scope.moneda = { ufv: "--", dolar: "--" }
                        $scope.mostrarMensaje('La fecha ' + $scope.proforma.fecha_proforma + ' no tiene datos del tipo de cambio de dolar. El tipo de cambio de dolar no afecta la información de la proforma y puede continuar sin problema.')
                    }
                })
            }

            $scope.obtenerCentroCosto = function () {
                var promesa = ClasesTipo('CENCOS')
                promesa.then(function (dato) {
                    $scope.centroCostos = dato.clases.sort(function (a, b) {
                        if (a.nombre > b.nombre) {
                            return 1;
                        }
                        if (a.nombre < b.nombre) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })
                })
            }


            $scope.obtenerActividadesSucursal = function (idSucursal) {
                var sucursal = $.grep($scope.sucursales, function (e) { return e.id == idSucursal; })[0];
                $scope.actividadesDosificaciones = sucursal.actividadesDosificaciones;
                $scope.actividadesSucursal = [];
                $scope.actividadesDosificaciones.map(function (actividad) {
                    if (actividad.dosificacion) {
                        if (!actividad.expirado && !actividad.dosificacion.expirado) {
                            $scope.actividadesSucursal.push(actividad.actividad)
                        } else {
                            $scope.dosificacionesExpiradas = true
                        }
                    }
                })
            }

            $scope.obtenerActividadesGral = function () {
                $scope.actividades = [];
                var promesa = ClasesTipo('ACTCOM')
                promesa.then(function (actividades) {
                    $scope.actividades = actividades.clases.sort()
                })
            }

            $scope.obtenerPaginador = function () {
                blockUI.start();
                $scope.paginator = Paginator();
                $scope.paginator.column = "correlativo";
                $scope.paginator.direction = "desc";
                const anioActual = new Date().getFullYear();
                const mesActual = (new Date().getMonth() + 1);

                $scope.filtro = { buscarFactura: false, empresa: $scope.usuario.empresa.id, mes: { id: mesActual }, anio: { id: anioActual }, sucursal: 0, actividadEconomica: 0, servicio: 0, monto: 0, razon: 0, usuario: 0, numero: 0 }
                $scope.paginator.filter = $scope.filtro;

                $scope.paginator.callBack = $scope.obtenerProformas;
                $scope.paginator.getSearch("", $scope.filtro, null);

                // $scope.filtro.anio = $scope.anios[0];
                // $scope.filtro.mes = $scope.mesesFiltro[0];

                // $scope.filtro = { empresa: $scope.usuario.empresa.id, mes: "", anio: "", sucursal: "", actividadEconomica: "", servicio: "", monto: "", razon: "", usuario: "", numero: "" }
                blockUI.stop();
            }

            $scope.guardarConfiguracionActividadServicios = function (actividadServicios) {
                var button = $('#siguiente').text().trim();
                if (button != "Siguiente") {
                    blockUI.start()
                    $scope.nActividad = {}
                    var toDrop = []
                    var nuevosServicios = actividadServicios.map(function (_, i) {
                        if (_.id === undefined || _.eliminado || _.editado !== undefined) {
                            return _
                        } else {
                            toDrop.push(i)
                        }
                    })
                    toDrop.reverse().forEach(function (_) {
                        nuevosServicios.splice(_, 1)
                    });

                    if (nuevosServicios.length > 0) {
                        var prom = GuardarActividadServicio($scope.usuario.empresa.id, actividadServicios[0].actividad, nuevosServicios)
                        prom.then(function (res) {
                            $scope.mostrarMensaje(res.mensaje)
                            $scope.obtenerSucursales();
                            blockUI.stop()
                            $scope.cerrarConfiguracionActividadesServicios()
                        }).catch(function (err) {
                            $scope.mostrarMensaje(err.data === undefined ? err.message + '<br />' + err.stack : err.data)
                            blockUI.stop()
                            $scope.cerrarConfiguracionActividadesServicios()

                        })
                    } else {
                        blockUI.stop()
                        $scope.cerrarConfiguracionActividadesServicios()
                    }
                }
            }

            $scope.buscarservicio = function (query) {
                if (query != "" && query != undefined) {
                    if ($scope.configuracionActividadServicio.length > 0) {
                        var promesa = $filter('filter')($scope.configuracionActividadServicio, query);
                        return promesa;
                    } else {
                        if ($scope.proforma !== undefined) {
                            if ($scope.proforma.actividadEconomica !== undefined) {
                                $scope.mostrarMensaje('No hay servicios en la actividad seleccionada: "' + $scope.proforma.actividadEconomica.nombre + '"')
                            }
                        }
                    }
                }
            }

            $scope.establecerservicio = function (servico, modal) {
                const servicio = Object.assign({}, servico)
                const dolar = $scope.proforma.cambio_dolar || 6.96;
                if ($scope.detalleProforma) {
                    if ($scope.detalleProforma.servicio) {
                        $scope.detalleProforma.id_servicio = servicio.id
                        $scope.detalleProforma.servicio = servicio
                        $scope.detalleProforma.precio_unitario = servicio.precio
                        $scope.detalleProforma.actividad_id = servicio.actividad.id
                        $scope.detalleProforma.actividad = servicio.actividad
                    } else {
                        $scope.detalleProforma = { id_servicio: servicio.id, cantidad: 1, servicio: servicio, precio_unitario: servicio.precio, actividad_id: servicio.actividad.id, actividad: servicio.actividad }
                    }
                } else {
                    $scope.detalleProforma = { id_servicio: servicio.id, cantidad: 1, servicio: servicio, precio_unitario: servicio.precio, actividad_id: servicio.actividad.id, actividad: servicio.actividad }
                }
                $scope.detalleProforma.importe = $scope.detalleProforma.precio_unitario * $scope.detalleProforma.cantidad
                $scope.detalleProforma.precioSus = $scope.detalleProforma.precio_unitario / dolar
                $scope.detalleProforma.importeSus = ($scope.detalleProforma.precio_unitario / dolar) * $scope.detalleProforma.cantidad

                $scope.enfocar('cantidad');
                if (modal !== undefined) {
                    $scope.cerrarBusquedaServiciosProforma()
                }
                // const prom = ObtenerCambioMoneda($scope.proforma.fecha_proforma, $scope.usuario.id_empresa);
                // prom.then((datos_dolar) => {

                // }).catch((err) => {
                //     if (modal !== undefined) {
                //         $scope.cerrarBusquedaServiciosProforma()
                //     }
                //     // blockUI.stop()
                //     const msg = (err.stack !== undefined && err.stack !== null) ? err.message +'<br />'+ err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                //     $scope.mostrarMensaje(msg)
                // })
            }
            $scope.calcularImporte = function (sus) {
                if (sus === undefined) {
                    $scope.detalleProforma.importe = $scope.detalleProforma.precio_unitario * $scope.detalleProforma.cantidad
                    // if ($scope.moneda !== undefined) {
                    // if ($scope.moneda.dolar !== null && $scope.moneda.dolar !== "--") {
                    $scope.detalleProforma.precioSus = $scope.detalleProforma.precio_unitario / $scope.proforma.cambio_dolar
                    $scope.detalleProforma.importeSus = ($scope.detalleProforma.precio_unitario * $scope.detalleProforma.cantidad) / ($scope.proforma.cambio_dolar)
                    // }
                    // }
                } else {
                    $scope.detalleProforma.importeSus = $scope.detalleProforma.precioSus * $scope.detalleProforma.cantidad
                    // if ($scope.moneda !== undefined) {
                    // if ($scope.moneda.dolar !== null && $scope.moneda.dolar !== "--") {
                    $scope.detalleProforma.precio_unitario = $scope.detalleProforma.precioSus * $scope.proforma.cambio_dolar
                    $scope.detalleProforma.importe = $scope.detalleProforma.precioSus * ($scope.proforma.cambio_dolar * $scope.detalleProforma.cantidad)
                    // }
                    // }
                }
            }
            $scope.agregarDetalleActividadServicio = function (actividadServicio) {
                if (actividadServicio !== undefined && actividadServicio !== null) {
                    var err = false
                    if (actividadServicio.actividadEconomica === undefined || actividadServicio.actividadEconomica === null) {
                        err = true
                    }
                    if (actividadServicio.servicio === undefined && actividadServicio.servicio === null) {
                        err = true
                    } else {
                        if (actividadServicio.servicio.codigo === undefined || actividadServicio.servicio.nombre === undefined || actividadServicio.servicio.precio === undefined) {
                            err = true
                        } else if (actividadServicio.servicio.codigo === "" || actividadServicio.servicio.nombre === "" || actividadServicio.servicio.precio === "") {
                            err = true
                        }
                    }
                    if (actividadServicio.actividadEconomica.dosificacion === undefined || actividadServicio.actividadEconomica.dosificacion === null) {
                        err = true
                        errDos = true
                    }
                    if (!err) {
                        var check = $scope.buscarservicio(actividadServicio.servicio.nombre)
                        if (check !== undefined) {
                            if (check.length < 1) {
                                if (actividadServicio.actividadEconomica.dosificacion) {

                                } else {

                                }
                                if ((actividadServicio.actividadEconomica.dosificacion.id !== undefined && actividadServicio.actividadEconomica.dosificacion.id !== null)) {
                                    var service = { id: actividadServicio.id, actividad: actividadServicio.actividadEconomica.actividad, codigo: actividadServicio.servicio.codigo, nombre: actividadServicio.servicio.nombre, precio: actividadServicio.servicio.precio }
                                    $scope.configuracionActividadServicio.push(service)
                                    $scope.nActividad.servicio = undefined
                                } else {
                                    $scope.mostrarMensaje('La actividad seleccionada no tiene dosificación activa, por favor asigne una dosificación para poder continuar.')
                                }
                            } else {
                                if (actividadServicio.servicio.id === undefined) {
                                    var encontrado = false
                                    check.map(function (ser) {
                                        if (ser.nombre === actividadServicio.servicio.nombre) {
                                            encontrado = true
                                            $scope.mostrarMensaje('El servicio ya fue asignado a esta actividad')
                                        }
                                        if (ser.codigo === actividadServicio.servicio.codigo) {
                                            encontrado = true
                                            $scope.mostrarMensaje('El codigo del servicio ya esta en uso o listo para ser asignado.')
                                        }
                                    })
                                    if (!encontrado) {
                                        if ((actividadServicio.actividadEconomica.dosificacion.id !== undefined && actividadServicio.actividadEconomica.dosificacion.id !== null)) {
                                            var service = { id: actividadServicio.id, actividad: actividadServicio.actividadEconomica.actividad, codigo: actividadServicio.servicio.codigo, nombre: actividadServicio.servicio.nombre, precio: actividadServicio.servicio.precio }
                                            $scope.configuracionActividadServicio.push(service)
                                            $scope.nActividad.servicio = undefined
                                        } else {
                                            $scope.mostrarMensaje('La actividad seleccionada no tiene dosificación activa, por favor asigne una dosificación para poder continuar.')
                                        }
                                    }
                                } else {
                                    $scope.nActividad.servicio = undefined
                                }
                            }
                        } else {
                            if ((actividadServicio.actividadEconomica.dosificacion.id !== undefined && actividadServicio.actividadEconomica.dosificacion.id !== null)) {
                                var service = { id: actividadServicio.id, actividad: actividadServicio.actividadEconomica.actividad, codigo: actividadServicio.servicio.codigo, nombre: actividadServicio.servicio.nombre, precio: actividadServicio.servicio.precio }
                                $scope.configuracionActividadServicio.push(service)
                                $scope.nActividad.servicio = undefined
                            } else {
                                $scope.mostrarMensaje('La actividad seleccionada no tiene dosificación activa, por favor asigne una dosificación para poder continuar.')
                            }
                        }
                    } else {
                        if (errDos) {
                            $scope.mostrarMensaje('La actividad seleccionada no tiene dosificación activa, por favor asigne una dosificación para poder continuar.')
                        } else {
                            $scope.mostrarMensaje('Revise los datos e intente nuevamente.')
                        }

                    }
                }
            }

            $scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
                if (keyEvent.which === 13) {
                    if (esEnfocar) {
                        if (!$scope.proforma.cliente) {
                            $scope.abrirdialogClientesProforma()
                        } else if (!$scope.detalleProforma.servicio) {
                            $scope.abrirBusquedaServiciosProforma($scope.proforma.actividadEconomica)
                        } else {
                            $scope.enfocar(elemento);
                        }
                    } else {
                        $timeout(function () {
                            $('#' + elemento).trigger('click');
                        }, 0);
                    }
                }
            }

            $scope.interceptarTeclaFacturasProformas = (keyEvent) => { if (keyEvent.which === 13) $scope.obtenerFacturasProformas(); }

            $scope.filtrarClientes = function (query) {
                $scope.clientesProcesados = $filter('filter')($scope.clientes, query);
            }

            $scope.filtrarServicios = function (query) {
                if ($scope.filser) {
                    $scope.serviciosProcesados = $filter('filter')($scope.filser, query);
                } else {
                    $scope.serviciosProcesados = $filter('filter')($scope.configuracionActividadServicio, query);
                }
            }

            $scope.guardarConfiguracionActividadEconomicas = function () {
                blockUI.start()
                if ($scope.actividadesDosificaciones.length > 0) {
                    var toDrop = []
                    var nuevasActividades = $scope.actividadesDosificaciones.map(function (_, i) {
                        if ((_.id === undefined || _.eliminado || (_.id_dosificacion == null && (_.dosificacion == undefined || _.dosificacion == null)) || _.editar) && _.expirado == false) {
                            return _
                        } else {
                            toDrop.push(i)
                        }
                    })
                    toDrop.reverse().forEach(function (_) {
                        nuevasActividades.splice(_, 1)
                    });
                    if (nuevasActividades.length > 0) {
                        var prom = GuardarActividadesEmpresa($scope.usuario.empresa.id, nuevasActividades)
                        prom.then(function (res) {
                            if (res.hasErr === undefined) {
                                $scope.obtenerSucursales()
                                $scope.mostrarMensaje(res.mensaje)
                                $scope.actividadesDosificaciones = []
                                var prome = ActividadesEmpresa($scope.usuario.empresa.id)
                                prome.then(function (activities) {
                                    $scope.actividadesEmpresa = activities.actividades
                                    if (activities.mensaje !== undefined) {
                                        $scope.mostrarMensaje(activities.mensaje)
                                    }
                                    blockUI.stop()
                                    $scope.cerrarConfiguracionActividades()
                                    // $scope.obtenerActividadesSucursal(sucursalActividades.id)

                                }).catch(function (err) {
                                    $scope.mostrarMensaje(err.data === undefined ? err.message + '<br />' + err.stack : err.data)
                                    blockUI.stop()
                                    $scope.cerrarConfiguracionActividades()

                                })
                            } else {
                                $scope.mostrarMensaje(res.mensaje)
                                blockUI.stop()
                            }
                        }).catch(function (err) {
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                            blockUI.stop()
                        })
                    } else {
                        blockUI.stop()
                        $scope.cerrarConfiguracionActividades()
                    }
                } else {
                    blockUI.stop()
                    $scope.mostrarMensaje('Ingrese al menos 1 actividad para guardar.')
                }
            }

            $scope.editarDetalleProforma = function (detalle) {
                detalle.editar = true
                $scope.detalleProforma = detalle
            }

            $scope.obtenerServiciosActividadEmpresaPrincipal = function (id_actividad, op) {
                $scope.detalleProforma = {}
                if (id_actividad == undefined) {
                    $scope.serviciosProcesados = []
                    return
                }
                if (id_actividad.id !== undefined) {
                    var prom;
                    if (op) {
                        prom = ServiciosEmpresa($scope.usuario.empresa.id, id_actividad.actividad.id)
                    } else {
                        prom = ServiciosEmpresa($scope.usuario.empresa.id, id_actividad.id)
                    }
                    prom.then(function (services) {
                        if (op !== undefined) {
                            $scope.filser = services.servicios
                            $scope.serviciosProcesados = services.servicios
                        } else {
                            $scope.configuracionActividadServicio = services.servicios
                            $scope.serviciosProcesados = services.servicios
                        }
                        if (services.mensaje !== undefined) {
                            $scope.mostrarMensaje(services.mensaje)
                        }
                    }).catch(function (err) {
                        proforma.fecha_proforma = $scope.fechaATexto(proforma.fecha_proforma)
                        blockUI.stop()
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }
            }

            $scope.showInActivities = function (actividad) {
                if (actividad.expirado || actividad.eliminado || actividad.dosificacion.expirado) {
                    return false
                } else {
                    return true
                }
            }

            $scope.obtenerSucursales = function () {
                blockUI.start();
                var promesa = ListaSucursalesUsuario($scope.usuario.id);
                promesa.then(function (sucursales) {
                    $scope.sucursales = sucursales.sucursales.map(function (_) {
                        return _.sucursal
                    })
                    blockUI.stop();
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.dosificarSucursalActividad = function () {
                $scope.cerrarconfirmarDosificacion()
                if ($scope.actividadesDosificaciones.length > 0) {
                    var encontrado = false
                    var salir = false
                    var indx = 0
                    while (salir == false) {
                        if ($scope.actividadesDosificaciones[indx].dosificacion !== undefined) {
                            if ($scope.actividadesDosificaciones[indx].dosificacion !== null) {
                                if ($scope.actividadesDosificaciones[indx].dosificacion.id == $scope.paraDosificar.id) {
                                    encontrado = true
                                    salir = true
                                }
                            }
                        }
                        if (indx < $scope.actividadesDosificaciones.length - 1) {
                            indx += 1
                        } else {
                            salir = true
                        }
                    }
                    if (!encontrado) {
                        $scope.actividadADosificar.dosificacionAnterior = $scope.actividadADosificar.dosificacion !== undefined || $scope.actividadADosificar.dosificacion !== null ? $scope.actividadADosificar.dosificacion : null
                        $scope.actividadesDosificaciones[$scope.actividadesDosificaciones.indexOf($scope.actividadADosificar)].dosificacion = $scope.paraDosificar
                        $scope.actividadADosificar.editar = true
                        $scope.actividadADosificar = undefined
                        $scope.cerrardialogDosificacionesDisponibles()
                    } else {
                        $scope.mostrarMensaje('Hubo un problema, la dosificacion esta en lista para ser asignada!')
                    }
                }
            }

            $scope.agregarDetalleActividadEmpresa = function (sucursal, actividad) {
                if (actividad.id !== undefined) {
                    if ($scope.actividadesDosificaciones.length > 0) {
                        var encontrado = false
                        var salir = false
                        var indx = 0
                        while (salir == false) {
                            if ($scope.actividadesDosificaciones[indx].actividad.nombre === actividad.nombre && !$scope.actividadesDosificaciones[indx].expirado) {
                                encontrado = true
                                salir = true
                            } else {
                                if (indx >= $scope.actividadesDosificaciones.length - 1) {
                                    salir = true
                                } else {
                                    indx += 1
                                }
                            }
                        }
                        if (!encontrado) {
                            var act = { actividad: actividad, sucursal: sucursal, expirado: false }
                            $scope.actividadesDosificaciones.push(act)
                        } else {
                            $scope.mostrarMensaje('La actividad "' + actividad.nombre + '" ya esta en la lista de esta sucursal "' + sucursal.nombre + '".')
                        }
                    } else {
                        var act = { actividad: actividad, sucursal: sucursal, expirado: false }
                        $scope.actividadesDosificaciones.push(act)
                    }
                }
            }

            $scope.obtenerDosificaciones = function () {
                var promesa = DosificacionesDisponibles($scope.usuario.id_empresa);
                promesa.then(function (dosificaciones) {
                    $scope.dosificaciones = dosificaciones;
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.abrirBusquedaServiciosProforma = function () {
                $scope.abrirPopup($scope.dialogBusquedaServicio)
            }

            $scope.cerrarBusquedaServiciosProforma = function () {
                $scope.cerrarPopup($scope.dialogBusquedaServicio)
            }

            $scope.abrirconfirmarDosificacion = function (dosificacion) {
                $scope.paraDosificar = dosificacion
                $scope.abrirPopup($scope.confirmarDosificacion)
            }

            $scope.cerrarconfirmarDosificacion = function () {
                $scope.cerrarPopup($scope.confirmarDosificacion)
            }

            $scope.abrirdialogDosificacionesDisponibles = function (actividad) {
                $scope.obtenerDosificaciones()
                $scope.actividadADosificar = actividad
                $scope.abrirPopup($scope.dialogDosificacionesDisponibles)
            }

            $scope.cerrardialogDosificacionesDisponibles = function () {
                $scope.dosificaciones = undefined
                $scope.actividadADosificar = undefined
                $scope.cerrarPopup($scope.dialogDosificacionesDisponibles)
            }

            $scope.eliminarDetalleProforma = function (detalle) {
                if (detalle.id !== undefined) {
                    detalle.eliminado = true
                } else {
                    $scope.detallesProformas.splice($scope.detallesProformas.indexOf(detalle), 1)
                }
                $scope.recalcularImportesProforma()
            }

            $scope.recalcularImportesProforma = function () {
                let importBs = 0;
                $scope.detallesProformas.map(function (detalle) {
                    if (!detalle.eliminado) {
                        importBs += detalle.precio_unitario * detalle.cantidad;
                        detalle.importe = detalle.precio_unitario * detalle.cantidad;
                    }
                })
                $scope.proforma.totalImporteBs = importBs;
                $scope.proforma.totalImporteSus = (importBs / $scope.proforma.cambio_dolar) || 0;
                $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
            }

            $scope.eliminarDetalleConfiguracion = function (servicio) {
                if (servicio.id !== undefined) {
                    servicio.eliminado = true
                } else {
                    $scope.configuracionActividadServicio.splice($scope.configuracionActividadServicio.indexOf(servicio), 1)
                }
                $scope.cerrarConfirmacionEliminacion();
            }

            $scope.buscarCliente = function (query) {
                if (query != "" && query != undefined) {
                    var promesa = ClientesNit($scope.usuario.id_empresa, query);
                    return promesa;
                }
            }

            $scope.seleccionarcliente = function (client) {
                if (!$scope.proforma.ver && !$scope.verificarDetallesProformas()) {
                    var sel = Object.assign({}, client);
                    $scope.proforma.cliente = sel
                    $scope.obtenercentroCostosClienteEmpresa(client)
                    $scope.cerrardialogClientesProforma()
                } else {
                    $scope.mostrarMensaje('No se permite.')
                }
            }

            $scope.obtenerClientes = function () {
                var prom = Clientes($scope.usuario.id_empresa);
                prom.then(function (cls) {
                    $scope.clientes = cls
                    $scope.clientesProcesados = cls
                }).catch(function (err) {
                    blockUI.stop()
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.filtrarProformasOperaciones = (filtro, _, __, ___) => {
                if (__ !== undefined) {
                    for (let key in filtro) {
                        if (filtro[key] == 0) {
                            filtro[key] = ""
                        }
                    }
                } else {
                    for (let key in filtro) {
                        if (filtro[key] === "" || filtro[key] === null) {
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
                    $scope.obtenerProformas(true)
                    // $scope.recargarItemsTabla()
                } else {
                    // if (___) {
                    //     $scope.obtenerProformas(false, true)
                    // } else {
                    return filtro
                    // }
                }
            }

            $scope.odenarColumnasProformas = function (columna) {
                // $scope.paginator.direction = $scope.paginator.direction == 'asc' ? 'desc' : 'asc'
                $scope.paginator.sortColumn(columna)
            }

            $scope.obtenerProformas = (filtrar, pdf, excel) => {
                blockUI.start()
                const itemsPerPage = $scope.paginator.itemsPerPage
                $scope.filtro = $scope.filtrarProformasOperaciones($scope.filtro, true)
                $scope.paginator.filter = $scope.filtro
                if (filtrar) {
                    $scope.paginator.currentPage = 1
                }
                $scope.obtenerCierreMesProforma($scope.filtro)
                const prom = FiltroProformas($scope.paginator)
                prom.then(function (res) {
                    if (pdf) {
                        $scope.paginator.itemsPerPage = itemsPerPage
                        return $scope.imprimirReporteProformasPDF(res.proformas)
                    }
                    if (excel) {
                        $scope.paginator.itemsPerPage = itemsPerPage
                        return $scope.ReporteProformasEXCEL(res.proformas)
                    }
                    $scope.proformas = res.proformas.map((prof) => {
                        // let dolar = res.datos_dolares.find((datos)=>{
                        //     if (datos.fecha.split('T')[0]===prof.fecha_proforma.split('T')[0]) {
                        //         return true
                        //     }
                        //     return false
                        // })
                        // dolar = dolar && dolar.dolar || 'Error';
                        // prof.totalImporteSus = prof.totalImporteBs / prof.cambio_dolar
                        // prof.cambio_dolar = dolar;
                        if (prof.eliminado) {
                            prof.color = "red"
                        } else {
                            prof.color = "black"
                        }
                        return prof
                    })

                    $scope.paginator.setPages(res.count)
                    if (res.mensaje !== undefined) {
                        $scope.mostrarMensaje(res.mensaje)
                    }

                    // if (!filtrar && !$scope.filtro.mes) {
                    //     const mesActualf = new Date().getMonth() + 1;
                    //     for (let index = 0; index < $scope.mesesFiltro.length; index++) {
                    //         if ($scope.mesesFiltro[index].id == mesActualf) {
                    //             $scope.filtro.mes = mes;
                    //         }

                    //     }
                    // }


                    $scope.filtro = $scope.filtrarProformasOperaciones($scope.filtro, true, true)

                    // if ($scope.paginator.currentPage < $scope.paginator.pages.length && $scope.paginator.currentPage > 1 && getLastPage) {
                    //     $scope.filtrarProformasOperaciones($scope.filtro, true, false, true)
                    // }
                    $timeout(() => {
                        $scope.$apply(() => {
                            $scope.totalProformas = 0
                            $scope.totalProformasDolar = 0
                            $scope.totalsaldo = 0
                            $scope.totalsaldoDolar = 0
                            $scope.calcularTotalProformas()
                        })
                    }, 1000)
                    blockUI.stop()
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.guardarProforma = function (valid, proforma) {
                blockUI.start()
                // var filtro = { id_empresa: $scope.usuario.empresa.id, mes: 0, anio: 0, sucursal: 0, actividad: 0, servicio: 0, monto: 0, razon: 0, usuario: $scope.usuario.id, pagina: 1, items_pagina: 10, busqueda: 0, numero: 0, id_opcion: 0 }
                if (!proforma.fecha_proforma || !proforma.periodo_mes || !proforma.periodo_anio) {
                    blockUI.stop()
                    return $scope.mostrarMensaje('La fecha o periodo son incorrectos.')
                }
                if (valid && $scope.detallesProformas.length > 0) {
                    if ($scope.detallesProformas.some(function (detalle) {
                        return detalle.editar
                    })) {
                        $scope.mostrarMensaje('No ha finalizado la edición de un detalle. No se puede guardar.')

                        return
                    }
                    if (proforma.id !== undefined) {
                        var delCount = 0
                        $scope.detallesProformas.forEach(function (detalle) {
                            if (detalle.eliminado) {
                                delCount += 1
                            }
                        })
                        if (delCount === $scope.detallesProformas.length) {
                            $scope.mostrarMensaje('Se requiere al menos un dellate.')
                            blockUI.stop()
                            return
                        }
                        proforma.detallesProformas = $scope.detallesProformas
                        proforma.usuarioProforma = $scope.usuario
                        proforma.id_empresa = $scope.usuario.empresa.id
                        proforma.fecha_proforma = new Date($scope.convertirFecha(proforma.fecha_proforma))
                        proforma.movimiento = 'PFR'
                        const prom = ActualizarProforma(proforma.id, proforma)
                        prom.then(function (res) {
                            $scope.mostrarMensaje(res.mensaje)
                            if (res.hasErr === undefined) {
                                $scope.cerrardialogProformaEdicion()
                                $scope.recargarItemsTabla()
                                // $scope.filtrarProformasOperaciones($scope.filtro)
                            } else {
                                $scope.proforma = res.proforma
                                // proforma.fecha_proforma = new Date($scope.convertirFecha(proforma.fecha_proforma))
                            }
                            blockUI.stop()
                        }).catch(function (err) {
                            blockUI.stop()
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                        })
                    } else {
                        proforma.id_empresa = $scope.usuario.empresa.id
                        proforma.detallesProformas = $scope.detallesProformas
                        proforma.usuarioProforma = $scope.usuario
                        proforma.fecha_proforma = new Date($scope.convertirFecha(proforma.fecha_proforma))
                        var prom = GuardarProformas($scope.usuario.empresa.id, $scope.usuario.id, proforma)
                        prom.then(function (res) {
                            proforma.id = res.proforma.id
                            $scope.abrirdialogmodalFechas(proforma,true)
                            //$scope.mostrarMensaje(res.mensaje)
                            if (res.hasErr === undefined) {
                                $scope.cerrardialogProformaEdicion()
                                //$scope.recargarItemsTabla()
                                $scope.filtrarProformasOperaciones($scope.filtro)
                            } else {
                                proforma.fecha_proforma = $scope.fechaATexto(proforma.fecha_proforma)
                            }
                            if (res.proforma) $scope.imprimir(res.proforma, 0);
                            
                            blockUI.stop()
                        }).catch(function (err) {
                            proforma.fecha_proforma = $scope.fechaATexto(proforma.fecha_proforma)
                            blockUI.stop()
                            var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                            $scope.mostrarMensaje(msg)
                        })
                    }
                } else {
                    $scope.mostrarMensaje('Falta algún dato requerido. Por favor revise el formulario.')
                    blockUI.stop()
                }
            }

            $scope.abrirdialogProformaEdicion = function (proforma) {
                // $scope.obtenerSucursales()
                // $scope.ocultarMensajesValidacion();
                if (proforma !== undefined) {
                    $scope.detalleProforma = undefined
                    $scope.proforma.totalImporteBs = 0
                    $scope.proforma.totalImporteSus = 0
                } else {
                    $scope.proforma = {};
                    $scope.proforma.nueva = true;
                    $scope.obtenerCambioMonedaProforma(new Date(), true);
                    $scope.proforma.sucursal = $scope.sucursales[0];
                    // $scope.proforma = { sucursal: $scope.sucursales[0], fecha_proforma: new Date(), periodo_mes: { id: new Date().getMonth() }, periodo_anio: { id: new Date().getFullYear() } }
                    $scope.proforma.fecha_proforma = $scope.formatoFechaPDF(new Date());
                    $scope.proforma.periodo_mes = { id: new Date().getMonth() };
                    $scope.proforma.periodo_anio = { id: new Date().getFullYear() };

                    $scope.detalleProforma = undefined;
                    $scope.obtenerActividadesSucursal($scope.proforma.sucursal.id);
                }
                $scope.detalleProforma = {};
                $scope.abrirPopup($scope.dialogProformaEdicion);
            }

            $scope.cerrardialogProformaEdicion = function () {
                $scope.proforma.ver = undefined
                // $scope.filtrarProformasOperaciones($scope.filtro)
                $scope.detallesProformas = []
                $scope.proforma = {}
                $scope.configuracionActividadServicio = []
                $scope.actividadesSucursal = []
                $scope.listaCentroCostosClienteEmpresaPro = []
                // $scope.obtenerProformas()
                $scope.cerrarPopup($scope.dialogProformaEdicion);
                // $scope.paginator.getLastPage()
            }

            $scope.abrirConfiguracionActividadesServicios = function () {
                $scope.obtenerSucursales()
                $scope.obtenerActividadesEmpresa($scope.usuario.empresa.id)
                $scope.abrirPopup($scope.modalConfiguracionActividadesServicios);
            }

            $scope.abrirdialogClientesProforma = function () {

                $scope.abrirPopup($scope.dialogClientesProforma);
            }

            $scope.cerrardialogClientesProforma = function () {
                $scope.cerrarPopup($scope.dialogClientesProforma);
            }

            $scope.obtenerActividadesEmpresa = function (idEmpresa) {

                var prom = ListaSucursalesActividadesDosificacionEmpresa(idEmpresa)
                var toDrop = []
                prom.then(function (actividades) {
                    $scope.actividadesEmpresaSinRepeticion = []
                    $scope.actividadesEmpresa = actividades.actividades
                    $scope.actividadesEmpresa.map(function (act) {
                        var encontrado = false
                        if ($scope.actividadesEmpresaSinRepeticion.length == 0) {
                            $scope.actividadesEmpresaSinRepeticion.push(act)
                        }
                        if ($scope.actividadesEmpresaSinRepeticion.some(function (activi, i) { return activi.actividad.id === act.actividad.id })) {
                            // $scope.actividadesEmpresaSinRepeticion.push(act)
                        } else {
                            $scope.actividadesEmpresaSinRepeticion.push(act)
                        }
                    })
                }, function (err) {
                    $scope.mostrarMensaje(err.stack !== undefined ? err.message + '<br />' + err.stack : err.data)
                })
            }

            $scope.obtenerActividadesDosificadasEmpresa = function (idEmpresa) {
                var prom = ListaSucursalesActividadesDosificacionEmpresa(idEmpresa)
                var toDrop = []
                prom.then(function (actividades) {
                    $scope.actividadesDosificadosEmpresa = actividades.actividades
                }, function (err) {
                    $scope.mostrarMensaje(err.stack !== undefined ? err.message + '<br />' + err.stack : err.data)
                })
            }

            $scope.abrirConfiguracionActividades = function () {
                $scope.obtenerSucursales()
                $scope.obtenerActividadesGral()
                $scope.obtenerActividadesEmpresa($scope.usuario.empresa.id)
                $scope.abrirPopup($scope.modalConfiguracionActividades);
            }

            $scope.cerrarConfiguracionActividades = function () {
                $scope.sucursalActividades = undefined
                $scope.actividadEconomicaEmpresa = undefined
                $scope.actividadesSucursal = []
                $scope.obtenerActividadesEmpresa($scope.usuario.empresa.id)
                $scope.recargarItemsTabla()
                $scope.cerrarPopup($scope.modalConfiguracionActividades);
            }

            $scope.abrirdialogmodalFechas = function (proforma, nuevo) {
                $scope.proformaFechas = proforma
                $scope.proformaFechas.nuevo = nuevo
                $scope.proformaFechas.FechProf = $scope.formatoFechaPDF(proforma.fecha_proforma) 
                
                setTimeout(function () {
                    aplicarDatePickers();
                }, 100);
                $scope.abrirPopup($scope.dialogmodalFechas);

                if ($scope.proformaFechas.fecha_recepcion !== null) {
                    // $scope.proformaFechas.fecha_recepcion = $scope.proformaFechas.fecha_recepcion && $scope.formatoFechaPDF($scope.proformaFechas.fecha_recepcion) || '';
                    $scope.proformaFechas.fecha_recepcion_texto = $scope.proformaFechas.fecha_recepcion && $scope.formatoFechaPDF($scope.proformaFechas.fecha_recepcion) || '';
                    // $scope.proformaFechas.fecha_recepcion_iso_value = $scope.formatoFechaPDF($scope.proformaFechas.fecha_recepcion).split('/').reverse().join('-')
                }
                if ($scope.proformaFechas.fecha_factura !== null) {
                    // $scope.proformaFechas.fecha_factura = $scope.proformaFechas.fecha_factura && $scope.formatoFechaPDF($scope.proformaFechas.fecha_factura) || '';
                    $scope.proformaFechas.fecha_factura_texto = $scope.proformaFechas.fecha_factura && $scope.formatoFechaPDF($scope.proformaFechas.fecha_factura) || '';
                }
                if ($scope.proformaFechas.fecha_proforma_ok !== null) {
                    // $scope.proformaFechas.fecha_proforma_ok = $scope.proformaFechas.fecha_proforma_ok && $scope.formatoFechaPDF($scope.proformaFechas.fecha_proforma_ok) || '';
                    $scope.proformaFechas.fecha_proforma_ok_texto = $scope.proformaFechas.fecha_proforma_ok && $scope.formatoFechaPDF($scope.proformaFechas.fecha_proforma_ok) || '';
                }
                if ($scope.proformaFechas.fecha_cobro !== null) {
                    // $scope.proformaFechas.fecha_cobro = $scope.proformaFechas.fecha_cobro && $scope.formatoFechaPDF($scope.proformaFechas.fecha_cobro) || '';
                    $scope.proformaFechas.fecha_cobro_texto = $scope.proformaFechas.fecha_cobro && $scope.formatoFechaPDF($scope.proformaFechas.fecha_cobro) || '';
                }
            }

            $scope.cerrardialogmodalFechas = function () {
                $scope.proformaFechas = undefined
                // $scope.recargarItemsTabla()
                $scope.cerrarPopup($scope.dialogmodalFechas);
            }

            $scope.cerrarConfiguracionActividadesServicios = function () {
                $scope.nActividad = {}
                $scope.configuracionActividadServicio = []
                $scope.recargarItemsTabla()
                $scope.cerrarPopup($scope.modalConfiguracionActividadesServicios);
            }

            $scope.abrirConfiguracionCentrosCostos = function (empresa) {
                if (empresa !== null && empresa !== undefined) {
                    if (!$scope.centroCostosClienteEmpresa) {
                        $scope.centroCostosClienteEmpresa = {}
                    }
                    $scope.centroCostosClienteEmpresa.empresa = empresa
                    $scope.centroCostosClienteEmpresa.desdeProforma = true
                    $scope.obtenercentroCostosClienteEmpresa(empresa)
                    $scope.abrirPopup($scope.asignacionCentroCostoCliente);
                } else {
                    $scope.abrirPopup($scope.asignacionCentroCostoCliente);
                }
            }

            $scope.abrirdialogImportacionProforma = function (empresa) {
                $scope.abrirPopup($scope.dialogImportacion);
            }
            $scope.cerrardialogImportacionProforma = function (empresa) {
                $scope.cerrarPopup($scope.dialogImportacion);
            }

            $scope.cerrarConfiguracionCentrosCostos = function () {
                $scope.listaCentroCostosClienteEmpresa = []
                $scope.centroCostosClienteEmpresa = {}
                $scope.cerrarPopup($scope.asignacionCentroCostoCliente);
            }

            $scope.agregarDetalleCentroCostosCliente = function (info) {
                if (info.centroCosto) {
                    if (!$scope.listaCentroCostosClienteEmpresa.some(function (data) {
                        return data.id == info.centroCosto.id
                    })) {
                        var detalle = Object.assign({}, info.centroCosto)
                        detalle.nuevo = true
                        $scope.listaCentroCostosClienteEmpresa.push(detalle)
                    } else {
                        $scope.mostrarMensaje('El centro ya fué asigando. No se puede duplicar.')
                    }
                } else {
                    $scope.mostrarMensaje('Seleccione un Centro de Costo')
                }
            }

            $scope.eliminarAsignacionCentroCosto = function (asignacion) {
                $scope.listaCentroCostosClienteEmpresa[$scope.listaCentroCostosClienteEmpresa.indexOf(asignacion)].eliminado = true
            }

            $scope.guardarAsignacionCentroCostos = function (empresa, pro) {
                var button = $('#siguiente').text().trim();
                if (button != "Siguiente") {
                    var datos = []
                    $scope.listaCentroCostosClienteEmpresa.forEach(function (centro) {
                        if (centro.nuevo || centro.eliminado) {
                            datos.push(centro)
                        }
                    })
                    var prom = GuardarAsignacionCentroCosto(empresa.id, datos)
                    prom.then(function (res) {
                        $scope.mostrarMensaje(res.mensaje)
                        if (!res.hasErr) {
                            if ($scope.centroCostosClienteEmpresa.desdeProforma) {
                                datos.forEach(function (dato) {
                                    if (dato.nuevo && !dato.eliminado) {
                                        $scope.listaCentroCostosClienteEmpresaPro.push(dato)
                                    }
                                    if (dato.eliminado) {
                                        var indx = $scope.listaCentroCostosClienteEmpresaPro.indexOf(dato)
                                        if (indx > -1) {
                                            $scope.listaCentroCostosClienteEmpresaPro.splice(indx, 1)
                                        }
                                    }
                                })
                            }
                            $scope.cerrarConfiguracionCentrosCostos()
                        }
                    }).catch(function (err) {
                        var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg)
                    })
                }
            }

            $scope.obtenercentroCostosClienteEmpresa = function (empresa) {
                $scope.listaCentroCostosClienteEmpresa = []
                $scope.listaCentroCostosClienteEmpresaPro = []
                var prom = obtenerAsignacionCentroCosto(empresa.id)
                prom.then(function (res) {
                    if (res.hasErr) {
                        $scope.mostrarMensaje(res.mensaje)
                    } else {
                        $scope.listaCentroCostosClienteEmpresa = res.centros.map(function (centro) {
                            return centro.centroCosto
                        })
                        $scope.listaCentroCostosClienteEmpresaPro = Object.assign([], $scope.listaCentroCostosClienteEmpresa)
                    }
                }).catch(function (err) {
                    var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.showInHist = function (actOne, actTwo) {
                if (actOne.id_actividad == actTwo.id_actividad && actOne.expirado) {
                    return true
                } else {
                    return false
                }

            }

            $scope.PopoverConfiguracionActividad = {
                templateUrl: 'PopoverConfiguracionActividad.html',
                title: 'Menu',
                isOpen: false
            };
            $scope.PopoverTipoImpresionFactura = {
                templateUrl: 'PopoverTipoImpresionFactura.html',
                title: 'Menu',
                isOpen: false
            };
            $scope.PopoverTipoImpresionFacturas = {
                templateUrl: 'PopoverTipoImpresionFacturas.html',
                title: 'Menu',
                isOpen: false
            };
            $scope.PopoverLibroFacturas = {
                templateUrl: 'PopoverLibroFacturas.html',
                title: 'Menu',
                isOpen: false
            };
            $scope.PopoverConfiguracionLlenarTabla = {
                templateUrl: 'PopoverConfiguracionLlenarTabla.html',
                title: 'Empresas',
                isOpen: false
            };

            $scope.PopoverConfiguracionActividadhistorial = {
                templateUrl: 'PopoverConfiguracionActividadhistorial.html',
                title: 'Historial dosificacion actividad',
                isOpen: false
            };

            $scope.impresiones = {
                templateUrl: 'impresiones.html',
                title: 'Opcion de impresion',
                isOpen: false
            };

            $scope.imprimir = function (proforma, opcionImpresion) {
                blockUI.start();
                const prom = ProformaInfo(proforma.id, proforma.actividadEconomica.id)
                prom.then(function (proformaE) {
                    blockUI.stop()
                    $scope.proforma = proformaE.proforma
                    if (proformaE.hasErr) {
                        $scope.mostrarMensaje(proformaE.mensaje)
                    }
                    // if (dato.monedaCambio) {
                    //     $scope.moneda = dato.monedaCambio;
                    //     if ($scope.detalleProforma !== undefined) {
                    //         $scope.calcularImporte()
                    //     }
                    // } else {
                    //     $scope.moneda = { ufv: "--", dolar: "--" }
                    //     $scope.mostrarMensaje('La fecha ' + $scope.proforma.fecha_proforma + ' no tiene datos del tipo de cambio de dolar. El tipo de cambio de dolar no afecta la información de la proforma y puede continuar sin problema.')

                    // }
                    convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
                        if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                            const imagen = imagenEmpresa;
                            if (opcionImpresion == 0) {
                                $scope.imprimirSinDetalle($scope.proforma, imagen)
                            }
                            if (opcionImpresion == 1) {
                                $scope.imprimirConDetalle($scope.proforma, imagen)
                            }
                            if (opcionImpresion == 2) {
                                $scope.imprimirMixto($scope.proforma, imagen)
                            }
                        } else {
                            convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
                                if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                                    $scope.mostrarMensaje('No se encuentra la imagen de la empresa. Se usara la imagen del software.')
                                    const imagen = imagenEmpresa;
                                    if (opcionImpresion == 0) {
                                        $scope.imprimirSinDetalle($scope.proforma, imagen)
                                    }
                                    if (opcionImpresion == 1) {
                                        $scope.imprimirConDetalle($scope.proforma, imagen)
                                    }
                                    if (opcionImpresion == 2) {
                                        $scope.imprimirMixto($scope.proforma, imagen)
                                    }
                                } else {
                                    convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
                                        $scope.mostrarMensaje('No se encuentra la imagen de la empresa ni la imagen alternativa. No se imprimira la la imagen.')
                                        const imagen = imagenEmpresa;
                                        if (opcionImpresion == 0) {
                                            $scope.imprimirSinDetalle($scope.proforma, imagen)
                                        }
                                        if (opcionImpresion == 1) {
                                            $scope.imprimirConDetalle($scope.proforma, imagen)
                                        }
                                        if (opcionImpresion == 2) {
                                            $scope.imprimirMixto($scope.proforma, imagen)
                                        }
                                    })
                                }
                            })
                        }
                    })
                    blockUI.stop()
                    // $scope.proforma.fecha_proforma = $scope.formatoFechaPDF(new Date($scope.proforma.fecha_proforma))
                    // const dat = new Date($scope.proforma.fecha_proforma)
                    // const promesa = ObtenerCambioMoneda(dat, $scope.usuario.id_empresa)
                    // promesa.then(function (dato) {
                    //     if (dato.monedaCambio) {
                    //         $scope.moneda = dato.monedaCambio;
                    //         if ($scope.detalleProforma !== undefined) {
                    //             $scope.calcularImporte()
                    //         }
                    //     } else {
                    //         $scope.moneda = { ufv: "--", dolar: "--" }
                    //         $scope.mostrarMensaje('La fecha ' + $scope.proforma.fecha_proforma + ' no tiene datos del tipo de cambio de dolar. El tipo de cambio de dolar no afecta la información de la proforma y puede continuar sin problema.')

                    //     }
                    //     convertUrlToBase64Image($scope.usuario.empresa.imagen, (imagenEmpresa) => {
                    //         if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    //             const imagen = imagenEmpresa;
                    //             if (opcionImpresion == 0) {
                    //                 $scope.imprimirSinDetalle($scope.proforma, imagen)
                    //             }
                    //             if (opcionImpresion == 1) {
                    //                 $scope.imprimirConDetalle($scope.proforma, imagen)
                    //             }
                    //             if (opcionImpresion == 2) {
                    //                 $scope.imprimirMixto($scope.proforma, imagen)
                    //             }
                    //         } else {
                    //             convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
                    //                 if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
                    //                     $scope.mostrarMensaje('No se encuentra la imagen de la empresa. Se usara la imagen del software.')
                    //                     const imagen = imagenEmpresa;
                    //                     if (opcionImpresion == 0) {
                    //                         $scope.imprimirSinDetalle($scope.proforma, imagen)
                    //                     }
                    //                     if (opcionImpresion == 1) {
                    //                         $scope.imprimirConDetalle($scope.proforma, imagen)
                    //                     }
                    //                     if (opcionImpresion == 2) {
                    //                         $scope.imprimirMixto($scope.proforma, imagen)
                    //                     }
                    //                 } else {
                    //                     convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
                    //                         $scope.mostrarMensaje('No se encuentra la imagen de la empresa ni la imagen alternativa. No se imprimira la la imagen.')
                    //                         const imagen = imagenEmpresa;
                    //                         if (opcionImpresion == 0) {
                    //                             $scope.imprimirSinDetalle($scope.proforma, imagen)
                    //                         }
                    //                         if (opcionImpresion == 1) {
                    //                             $scope.imprimirConDetalle($scope.proforma, imagen)
                    //                         }
                    //                         if (opcionImpresion == 2) {
                    //                             $scope.imprimirMixto($scope.proforma, imagen)
                    //                         }
                    //                     })
                    //                 }
                    //             })
                    //         }
                    //     })
                    //     blockUI.stop()
                    // }).catch((err) => {
                    //     const msg = (err.stack !== undefined && err.stack !== null) ? err.message +'<br />'+ err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    //     $scope.mostrarMensaje(msg)
                    //     blockUI.stop()
                    // })

                }).catch((err) => {
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                    blockUI.stop()
                })
            }

            $scope.imprimirMixto = function (proforma, imagen) {

                var importeTotal = 0
                var cantidadTotal = 0
                $scope.proforma = proforma
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //{compress: false},

                var separacionExtra = 50
                var stream = doc.pipe(blobStream());
                var fechaActual = new Date();
                var x = 80
                doc.font('Helvetica', 8);
                var y = 115 + 80 + separacionExtra, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(1 / itemsPorPagina);
                $scope.dibujarCabeceraPDFImpresion(doc, pagina, totalPaginas, $scope.proforma, imagen);
                var extraDetalle = 0
                var extraServ = 0
                for (var i = 0; i <= $scope.proforma.detallesProformas.length && items <= itemsPorPagina; i++) {
                    doc.font('Helvetica', 8);
                    if (i == 0) {
                        doc.text(($scope.proforma.detalle), 102, y - 2, { width: 260 });
                        var divisor = $scope.proforma.detalle !== null ? $scope.proforma.detalle.length : 0
                        extraDetalle = Math.ceil(divisor / 260) * 20
                    } else {
                        doc.text($scope.proforma.detallesProformas[i - 1].cantidad, 48, y - 2);
                        doc.text($scope.proforma.detallesProformas[i - 1].servicio.nombre, 102, y - 2, { width: 260 });
                        doc.text($scope.number_format($scope.proforma.detallesProformas[i - 1].precio_unitario, 2), 388, y - 2, { align: 'right', width: 90 });
                        doc.text($scope.number_format($scope.proforma.detallesProformas[i - 1].importe, 2), 488, y - 2, { align: 'right', width: 90 });
                    }

                    y = y + 20 + extraDetalle;
                    importeTotal += (i === 1) ? $scope.proforma.importe : 0
                    cantidadTotal += (i === 1) ? $scope.proforma.cantidad : 0
                    items++;
                    extraDetalle = 0
                    extraServ = 0
                    if (items > itemsPorPagina || (y > 700)) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 115 + 80 + separacionExtra;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFImpresion(doc, pagina, totalPaginas, $scope.proforma, imagen);
                    }
                }
                doc.rect(40, 705, 540, 15).stroke(); // cuadro literal bolivianos
                doc.rect(40, 725, 540, 15).stroke(); // cuadro total dolares
                $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
                doc.font('Helvetica', 6);
                doc.text('Son : ' + ($scope.proforma.importeLiteral), 58, 710);
                doc.font('Helvetica', 8);
                doc.text($scope.number_format($scope.proforma.totalImporteBs, 2), 488, 710);
                doc.rect(41, 725, 538, 14).fill("silver", "#000")
                    .fill('black')
                doc.text('Son : ' + $scope.number_format($scope.proforma.totalImporteBs / $scope.proforma.cambio_dolar, 2) + '  Dólares x ' + ($scope.proforma.cambio_dolar && $scope.proforma.cambio_dolar), 58, 730);
                // doc.text("Nota: La aprobación de la proforma deberá realizarse dentro de los próximos 7 días a partir de la fecha de recepción",0, 750,{ align: "center" })
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.imprimirConDetalle = function (proforma, imagen) {

                var importeTotal = 0
                var cantidadTotal = 0
                $scope.proforma = proforma
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //{compress: false},
                var separacionExtra = 50
                var stream = doc.pipe(blobStream());
                var fechaActual = new Date();
                var x = 80
                doc.font('Helvetica', 8);
                var y = 115 + 80 + separacionExtra, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(1 / itemsPorPagina);
                $scope.dibujarCabeceraPDFImpresion(doc, pagina, totalPaginas, $scope.proforma, imagen);
                var extraServ = 0
                for (var i = 0; i < $scope.proforma.detallesProformas.length && items <= itemsPorPagina; i++) {
                    doc.font('Helvetica', 8);

                    doc.text($scope.proforma.detallesProformas[i].cantidad, 48, y - 2);
                    doc.text($scope.proforma.detallesProformas[i].servicio.nombre, 102, y - 2, { width: 260 });
                    doc.text($scope.number_format($scope.proforma.detallesProformas[i].precio_unitario, 2), 388, y - 2, { align: 'right', width: 90 });
                    doc.text($scope.number_format($scope.proforma.detallesProformas[i].importe, 2), 488, y - 2, { align: 'right', width: 90 });

                    if ($scope.proforma.detallesProformas[i].servicio.nombre.length > 260) {
                        extraServ = Math.ceil($scope.proforma.detallesProformas[i].servicio.nombre.length / 260) * 10
                    }

                    y = y + 20 + extraServ;
                    importeTotal += (i === 1) ? $scope.proforma.importe : 0
                    cantidadTotal += (i === 1) ? $scope.proforma.cantidad : 0
                    items++;
                    extraServ = 0
                    if (items > itemsPorPagina || y > 700) {
                        doc.addPage({ size: [612, 792], margin: 10 });
                        y = 115 + 80 + separacionExtra;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFImpresion(doc, pagina, totalPaginas, $scope.proforma, imagen);
                    }
                }
                doc.rect(40, 705, 540, 15).stroke(); // cuadro literal bolivianos
                doc.rect(40, 725, 540, 15).stroke(); // cuadro total dolares
                $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
                doc.font('Helvetica', 6);
                doc.text('Son : ' + ($scope.proforma.importeLiteral), 58, 710);
                doc.font('Helvetica', 8);
                doc.text($scope.number_format($scope.proforma.totalImporteBs, 2), 488, 710);
                doc.font('Helvetica', 8);
                doc.rect(41, 725, 538, 14).fill("silver", "#000")
                    .fill('black')
                doc.text('Son : ' + $scope.number_format($scope.proforma.totalImporteBs / $scope.proforma.cambio_dolar, 2) + '  Dólares x ' + ($scope.proforma.cambio_dolar && $scope.proforma.cambio_dolar || 'Sin 1datos de tipo de cambio.'), 58, 730);
                // doc.text("Nota: La aprobación de la proforma deberá realizarse dentro de los próximos 7 días a partir de la fecha de recepción",0, 750,{ align: "center" })
                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.imprimirSinDetalle = function (proforma, imagen) {

                var importeTotal = 0
                var cantidadTotal = 0
                $scope.proforma = proforma
                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false });//[612, 792] {compress: false},
                var separacionExtra = 50
                var stream = doc.pipe(blobStream());
                var fechaActual = new Date();
                var x = 80
                doc.font('Helvetica', 8);
                var y = 195 + separacionExtra, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(1 / itemsPorPagina);
                $scope.dibujarCabeceraPDFImpresion(doc, pagina, totalPaginas, $scope.proforma, imagen);
                doc.font('Helvetica', 8);
                var cant = 0
                $scope.proforma.detallesProformas.map(function (_) {
                    cant += _.cantidad
                })
                doc.text(1, 48, y - 2);
                doc.text(($scope.proforma.detalle), 102, y - 2, { width: 260 });
                extraDetalle = Math.ceil($scope.proforma.detalle.length && $scope.proforma.detalle.length || 1 / 260) * 20
                doc.text($scope.number_format($scope.proforma.totalImporteBs, 2), 388, y - 2, { align: 'right', width: 90 });
                doc.text($scope.number_format($scope.proforma.totalImporteBs, 2), 488, y - 2, { align: 'right', width: 90 })
                y = y + 20 + extraDetalle;
                $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
                doc.rect(40, 705, 540, 15).stroke(); // cuadro literal bolivianos
                doc.rect(40, 725, 540, 15).stroke(); // cuadro total dolares
                doc.font('Helvetica', 6);
                doc.text('Son : ' + ($scope.proforma.importeLiteral), 58, 710);
                doc.font('Helvetica', 8);
                doc.text($scope.number_format($scope.proforma.totalImporteBs, 2), 488, 710);
                doc.rect(41, 725, 538, 14).fill("silver", "#000")
                    .fill('black')
                doc.text('Son : ' + $scope.number_format($scope.proforma.totalImporteBs / $scope.proforma.cambio_dolar, 2) + '  Dólares x ' + (($scope.proforma.cambio_dolar && $scope.proforma.cambio_dolar) || 'Sin datos 2de tipo de cambio.'), 58, 730);

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
            }

            $scope.dibujarCabeceraPDFImpresion = function (doc, pagina, totalPaginas, proforma, imagen) {
                let yCabecera = 80;
                let yEspacio = 10;
                const separacionExtra = 50
                const fecha = proforma.fecha_proforma && proforma.fecha_proforma || new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
                doc.rect(40, 80 + 80 + separacionExtra, 540, 25).fillAndStroke("silver", "#000");
                doc.font('Helvetica-Bold', 12)
                    .fill('black')
                doc.text("PRE-FACTURA", 0, 80 + separacionExtra, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.font('Helvetica', 8);
                doc.font('Helvetica-Bold', 8);
                doc.font('Helvetica', 8);
                if (imagen) {
                    doc.image(imagen, 40, 30, { fit: [100, 100] }); //{ fit: [200, 72] } { fit: [100, 72] }
                }
                doc.text($scope.usuario.empresa.direccion ? $scope.usuario.empresa.direccion.toUpperCase() : "", 145, 34, { width: 250 });
                let contacto = ""
                if($scope.usuario.empresa.telefono1) contacto += (" "+ $scope.usuario.empresa.telefono1)
                if($scope.usuario.empresa.telefono2) contacto += (" "+ $scope.usuario.empresa.telefono2) 
                if(contacto != "") doc.text("TELÉFONO: ", 145, 64);
                doc.text(contacto ? contacto.toUpperCase() :"", 190, 64);
                doc.text( ($scope.usuario.empresa.departamento.nombre ? $scope.capitalizarTexto($scope.usuario.empresa.departamento.nombre) + ',     ' : 'Santa Cruz,     ') + $scope.fechaATexto(fecha, true, true), 65, 115 + separacionExtra)
                doc.font('Helvetica-Bold', 8);
                doc.font('Helvetica', 8);
                doc.font('Helvetica-Bold', 14);
                doc.text("N°", 380, 60, { align: "center" });
                doc.text(proforma.correlativo, 510, 60);
                doc.rect(40, 80 + 80 + separacionExtra, 540, 25).stroke()
                    .fill('silver')
                doc.rect(0, 0, 0, 0).stroke()
                    .fill('black')
                doc.font('Helvetica-Bold', 8);
                doc.text("CANTIDAD", 45, 90 + yCabecera + separacionExtra);
                doc.text("DETALLE", 200, 90 + yCabecera + separacionExtra);
                doc.text("P.UNIT", 440, 90 + yCabecera + separacionExtra);
                doc.text("IMPORTE BS", 510, 90 + yCabecera + separacionExtra);
                doc.text("Señor (es):", 50, 143 + separacionExtra);
                doc.text("CI/NIT:", 440, 145 + separacionExtra);
                doc.font('Helvetica', 8);
                doc.text(proforma.cliente.razon_social, 100, 143 + separacionExtra);

                doc.text(proforma.cliente.nit, 500, 145 + separacionExtra);
                doc.rect(40, 110 + separacionExtra, 540, 20).stroke();
                doc.rect(40, 135 + separacionExtra, 540, 20).stroke();
                doc.rect(40, 210, 540, 490).stroke(); //235
                doc.rect(100, 210, 0, 490).stroke(); //cant | det
                doc.rect(380, 210, 0, 490).stroke();// det| punit
                doc.rect(480, 210, 0, 490).stroke(); // punit | import
                doc.text("Nota: La aprobación de la proforma deberá realizarse dentro de los próximos 7 días a partir de la fecha de recepción", 0, 750, { align: "center" })
            }

            $scope.PopoverReportesSimpleGraficoComparativo = {
                templateUrl: 'PopoverReportesSimpleGraficoComparativo.html',
                title: 'Reportes Comparativo',
                isOpen: false
            }

            $scope.PopoverReportesGraficoGeneral = {
                templateUrl: 'PopoverReportesGraficoGeneral.html',
                title: 'Reportes Graficos',
                isOpen: false
            }

            $scope.PopoverReportesRapido = {
                templateUrl: 'PopoverReportesRapido.html',
                title: 'Reportes Rapidos',
                isOpen: false
            }

            $scope.abrirVentaReportePorEmpresa = function () {
                $scope.abrirPopup($scope.dialogReporteEmpresa);
            }

            $scope.cerrarVentanReportePorEmpresa = function () {
                $scope.cerrarPopup($scope.dialogReporteEmpresa);
                // $scope.inicio()
            }

            $scope.calcularCambioDolar = function () {
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    for (let i = 0; i < $scope.proformasEmpresa.length; i++) {
                        $scope.dolarGraf = res.monedaCambio.dolar
                        // $scope.proformasEmpresa[i].cambio_dolar = res.monedaCambio.dolar;

                    }
                })
            }

            $scope.obtenerListaProformas = () => {
                blockUI.start();
                $scope.paginatorGraficosEmpresa = Paginator();
                $scope.paginatorGraficosEmpresa.column = "id";
                $scope.paginatorGraficosEmpresa.direction = "asc";
                $scope.paginatorGraficosEmpresa.itemsPerPage = { cantidad: 10 };
                $scope.mesesFiltro[(new Date().getMonth())].activo = true;
                $scope.filtroGraficosEmpresa = { empresa: $scope.usuario.empresa.id, mes: $scope.mesesFiltro[(new Date().getMonth())].id, anio: { id: new Date().getFullYear() }, id_usuario: 0, estado: 0 };
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa;
                $scope.paginatorGraficosEmpresa.callBack = $scope.obtenerProformasImpresion;
                $scope.paginatorGraficosEmpresa.mes = new Date().getMonth() + 1
                $scope.paginatorGraficosEmpresa.getSearch("", $scope.filtroGraficosEmpresa, null);
                blockUI.stop();
            }

            $scope.obtenerProformasImpresion = (filtrar, getLastPage) => {
                blockUI.start()
                const prom = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa)
                prom.then((res) => {
                    $scope.proformasEmpresa = res.proformas
                    $scope.paginatorGraficosEmpresa.setPages(res.paginas);
                    $scope.calcularCambioDolar();
                    blockUI.stop()
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.abrirReporteEmpresas = (filtro) => {
                $scope.obtenerListaProformas(filtro);
                $scope.abrirVentaReportePorEmpresa();
            }


            $scope.abrirVentanGraficaEmpresa = () => {
                $scope.abrirPopup($scope.dialogGraficaEmpresa);
            }

            $scope.cerrarVentanaGraficaEmpresa = () => {
                $scope.cerrarPopup($scope.dialogGraficaEmpresa);
            }

            $scope.graficarEmpresa = () => {
                if (!$scope.graficoEmpresasTorta) $scope.graficoEmpresasTorta = false;
                if (!$scope.graficoEmpresasDolares) $scope.graficoEmpresasDolares = false;
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                const mes = [];
                if (Array.isArray($scope.filtroGraficosEmpresa.mes)) {
                    for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                        mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                    }
                    $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                }
                const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa, true)
                promesa.then((res) => {
                    const dato = [];
                    res.proformas.sort((a, b) => {
                        return b.totalImporteBs - a.totalImporteBs
                    });
                    for (let i = 0; i < res.proformas.length; i++) {
                        const columns = []
                        columns.push(res.proformas[i].razon_social);
                        columns.push(res.proformas[i].totalImporteBs);
                        columns.push(res.proformas[i].totalImporteSus);
                        dato.push(columns);
                    }
                    $scope.graficarDatosEmpresa(dato.slice(0, 10));
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.modificarGraficoEmpresas = () => {
                if (!$scope.graficoProformaChart) return $scope.mostrarMensaje('Error de gráfico.');
                if ($scope.graficoEmpresasDolares) {
                    $scope.graficoProformaChart.options.title.text = "Montos en Dolares"
                    $scope.graficoProformaChart.options.data[0].dataPoints = $scope.datosReporteGraficoEmpresasProforma[1];
                    $scope.graficoProformaChart.options.data[0].name = "$us.";
                    $scope.graficoProformaChart.options.data[0].legendText = "Dolares"
                    $scope.graficoProformaChart.options.axisY.suffix = " $us.";
                } else {
                    $scope.graficoProformaChart.options.title.text = "Montos en Bolivianos"
                    $scope.graficoProformaChart.options.data[0].dataPoints = $scope.datosReporteGraficoEmpresasProforma[0];
                    $scope.graficoProformaChart.options.data[0].name = "Bs."
                    $scope.graficoProformaChart.options.data[0].legendText = "Bolivianos"
                    $scope.graficoProformaChart.options.axisY.suffix = " Bs.";
                }
                if ($scope.graficoEmpresasTorta) {
                    $scope.graficoProformaChart.options.data[0].type = 'pie'
                    $scope.graficoProformaChart.options.data[0].showInLegend = false;
                } else {
                    $scope.graficoProformaChart.options.data[0].type = 'column'
                    $scope.graficoProformaChart.options.data[0].showInLegend = false;
                }
                $scope.graficoProformaChart.render()
            }

            $scope.graficarDatosEmpresa = (reporte) => {
                if (reporte.length === 0) return $scope.mostrarMensaje('No existen datos.')
                $scope.abrirVentanGraficaEmpresa();
                const datasReporteBolivianos = reporte.map((dato) => {
                    return { label: dato[0], y: dato[1] };
                });
                const datasReporteDolares = reporte.map((dato, i) => {
                    return { label: dato[0], y: dato[2] }
                });
                $scope.datosReporteGraficoEmpresasProforma = [datasReporteBolivianos, datasReporteDolares]
                $scope.graficoProformaChart = new CanvasJS.Chart("tablaReportesEmpresas", {
                    animationEnabled: true,
                    exportEnabled: true,
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "Montos en Bolivianos",
                    },
                    data: [
                        {
                            type: "column",
                            name: "Bs.",
                            showInLegend: false,
                            legendMarkerColor: "blue",
                            legendText: "Bolivianos",
                            indexLabelFontSize: 10,
                            dataPoints: $scope.datosReporteGraficoEmpresasProforma[0]
                        }
                    ],
                    axisY: {
                        prefix: "",
                        suffix: " Bs."
                    },
                    axisX: {
                        labelFontColor: "white",
                        labelMaxWidth: 50,
                        labelWrap: false,   // change it to false
                        interval: 1
                    }
                });
                $scope.graficoProformaChart.render();
            }

            function round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }

            $scope.filtrarEmpresas = (filtro) => {
                blockUI.start();
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                const mes = [];
                for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                    mes.push(filtro.mes[i].id);
                }
                $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa)
                promesa.then((res) => {
                    $scope.proformasEmpresa = res.proformas
                    $scope.paginatorGraficosEmpresa.setPages(res.paginas);
                    blockUI.stop()
                }).catch(function (err) {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.abrirSimpleGrafica = () => {
                $scope.abrirPopup($scope.dialogGraficaIndividualEmpresa);
            }

            $scope.cerrarSimpleGrafica = () => {
                $scope.filtroGraficosEmpresa.id_cliente = 0;
                $scope.cerrarPopup($scope.dialogGraficaIndividualEmpresa);
                $scope.estadoGraficoSimple = 'gBarras';
            }

            $scope.graficoProformasIndividualEmpresa = (cliente) => {
                blockUI.start();
                if (cliente) $scope.filtroGraficosEmpresa.id_cliente = cliente.id;
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                const mes = [];
                for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                    mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                }
                $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa)
                promesa.then((res) => {
                    if (res.hasErr) {
                        blockUI.stop();
                        return $scope.mostrarMensaje(res.mensaje);
                    }
                    blockUI.stop();
                    $scope.reporteGraficaIndividualEmpresas = res.proformas.map((info) => {
                        return {
                            id: info.id,
                            mes: info.periodo_mes,
                            anio: info.periodo_anio,
                            montoBs: info.totalImporteBs,
                            montoSus: info.totalImporteSus,
                            cliente: info.razon_social
                        }
                    }).slice(0, 12);
                    $scope.graficarProformasIndividualEmpresa();
                }).catch(function (err) {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.modificarGraficoIndividual = () => {
                if (!$scope.graficoIndividualProformaChart) return $scope.mostrarMensaje('Error de gráfico.');
                if ($scope.graficoIndividualDolares) {
                    $scope.graficoIndividualProformaChart.options.title.text = "Montos en Dolares"
                    $scope.graficoIndividualProformaChart.options.data[0].dataPoints = $scope.reporteGraficaIndividualEmpresas[1];
                    $scope.graficoIndividualProformaChart.options.data[0].name = "$us.";
                    $scope.graficoIndividualProformaChart.options.data[0].legendText = "Dolares"
                    $scope.graficoIndividualProformaChart.options.axisY.suffix = " $us.";
                } else {
                    $scope.graficoIndividualProformaChart.options.title.text = "Montos en Bolivianos"
                    $scope.graficoIndividualProformaChart.options.data[0].dataPoints = $scope.reporteGraficaIndividualEmpresas[0];
                    $scope.graficoIndividualProformaChart.options.data[0].name = "Bs."
                    $scope.graficoIndividualProformaChart.options.data[0].legendText = "Bolivianos"
                    $scope.graficoIndividualProformaChart.options.axisY.suffix = " Bs.";
                }
                if ($scope.graficoIndividualTorta) {
                    $scope.graficoIndividualProformaChart.options.data[0].type = 'pie'
                    $scope.graficoIndividualProformaChart.options.data[0].showInLegend = false;
                } else {
                    $scope.graficoIndividualProformaChart.options.data[0].type = 'column'
                    $scope.graficoIndividualProformaChart.options.data[0].showInLegend = false;
                }
                $scope.graficoIndividualProformaChart.render()
            }

            $scope.graficarProformasIndividualEmpresa = (facturas) => {
                if (!facturas) {
                    if ($scope.reporteGraficaIndividualEmpresas.length === 0) return $scope.mostrarMensaje('No existen datos.')
                    $scope.abrirPopup($scope.dialogGraficaIndividualEmpresa);
                    $scope.facturaciones = null;
                    const datasReporteBolivianos = $scope.reporteGraficaIndividualEmpresas.map((dato) => {
                        return { label: $scope.meses[parseInt(dato.mes)].nombre + '-' + dato.anio, y: dato.montoBs };
                    });
                    const datasReporteDolares = $scope.reporteGraficaIndividualEmpresas.map((dato) => {
                        return { label: $scope.meses[parseInt(dato.mes)].nombre + '-' + dato.anio, y: dato.montoSus }
                    });
                    const titulo = "REPORTE GRÁFICO - " + $scope.reporteGraficaIndividualEmpresas[0].cliente;
                    $scope.reporteGraficaIndividualEmpresas = [datasReporteBolivianos, datasReporteDolares]
                    $scope.graficoIndividualProformaChart = new CanvasJS.Chart("tablaSimpleReportesEmpresas", {
                        animationEnabled: true,
                        exportEnabled: true,
                        theme: "light1", // "light1", "light2", "dark1", "dark2"
                        title: {
                            text: titulo,
                            fontSize: 14,
                            horizontalAlign: "center",
                            fontColor: 'blue'
                        },
                        data: [
                            {
                                // Change type to "doughnut", "line", "splineArea", etc.
                                // color: "#7878D5",
                                type: "column",
                                name: "Bs.",
                                legendText: "Bolivianos.",
                                showInLegend: true,
                                indexLabelFontSize: 10,
                                dataPoints: $scope.reporteGraficaIndividualEmpresas[0]
                            }
                        ],
                        axisY: {
                            prefix: "",
                            suffix: " Bs."
                        }
                    });
                    $scope.modificarGraficoIndividual()
                } else {
                    $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                    const mes = [];
                    for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                        mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                    }
                    $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                    const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa, true, true)
                    promesa.then((res) => {
                        if (res.hasErr) {
                            blockUI.stop();
                            return $scope.mostrarMensaje(res.mensaje);
                        }
                        blockUI.stop();
                        if (res.proformas.length === 0) return $scope.mostrarMensaje('No existen datos.');
                        $scope.reporteGraficaIndividualEmpresas = res.proformas.map((info) => {
                            return {
                                id: info.id,
                                mes: info.periodo_mes,
                                anio: info.periodo_anio,
                                montoBs: info.totalImporteBs,
                                montoSus: info.totalImporteSus,
                                cliente: info.razon_social
                            }
                        }).slice(0, 12);

                        const datasReporteBolivianos = $scope.reporteGraficaIndividualEmpresas.map((dato) => {
                            return { label: $scope.meses[parseInt(dato.mes)].nombre + '-' + dato.anio, y: dato.montoBs };
                        });
                        const datasReporteDolares = $scope.reporteGraficaIndividualEmpresas.map((dato) => {
                            return { label: $scope.meses[parseInt(dato.mes)].nombre + '-' + dato.anio, y: dato.montoSus }
                        });
                        const titulo = "REPORTE GRÁFICO - " + $scope.reporteGraficaIndividualEmpresas[0].cliente;
                        $scope.reporteGraficaIndividualEmpresas = [datasReporteBolivianos, datasReporteDolares];
                        $scope.facturaciones = true;
                        $scope.graficoIndividualProformaChart = new CanvasJS.Chart("tablaSimpleReportesEmpresas", {
                            animationEnabled: true,
                            exportEnabled: true,
                            theme: "light1", // "light1", "light2", "dark1", "dark2"
                            title: {
                                text: titulo,
                                fontSize: 14,
                                horizontalAlign: "center",
                                fontColor: 'blue'
                            },
                            data: [
                                {
                                    // Change type to "doughnut", "line", "splineArea", etc.
                                    // color: "#7878D5",
                                    type: "column",
                                    name: "Bs.",
                                    legendText: "Bolivianos.",
                                    showInLegend: true,
                                    indexLabelFontSize: 10,
                                    dataPoints: $scope.reporteGraficaIndividualEmpresas[0]
                                }
                            ],
                            axisY: {
                                prefix: "",
                                suffix: " Bs."
                            }
                        });
                        $scope.modificarGraficoIndividual();
                    }).catch(function (err) {
                        blockUI.stop();
                        const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                        $scope.mostrarMensaje(msg);
                    })
                }


            }

            $scope.imprimirSimpleReportePDFEmpresa = (cliente) => {
                blockUI.start();
                if (cliente) $scope.filtroGraficosEmpresa.id_cliente = cliente.id;
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                const mes = [];
                for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                    mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                }
                $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa, false, false, true)
                promesa.then((res) => {
                    blockUI.stop();
                    if (res.hasErr) return $scope.mostrarMensaje(res.mensaje);
                    $scope.filtroGraficosEmpresa.id_cliente = 0;
                    $scope.imprimirReporteProformasPDF(res.proformas);
                }).catch(function (err) {
                    blockUI.stop();
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg);
                })
                // blockUI.start();
                // //$scope.filtroDatos.id_usuario = idUsuario
                // $scope.paginator.filter.id_usuario = idUsuario;
                // var promesa = filtroListaProformasEmpresa($scope.paginator)
                // promesa.then(function (res) {

                //     $scope.listaUsuarioEmpresa = res.proformas;

                //     $scope.listaUsuarioEmpresa.sort(function (a, b) {
                //         var fechaA = new Date(a.fecha_proforma);
                //         var fechaB = new Date(b.fecha_proforma)
                //         return fechaA.getTime() - fechaB.getTime();
                //     });

                //     var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //{compress: false},
                //     var stream = doc.pipe(blobStream());
                //     var fechaActual = new Date();

                //     var y = 120, itemsPorPagina = 38, items = 0, pagina = 1, totalPaginas = Math.ceil($scope.listaUsuarioEmpresa.length / itemsPorPagina);
                //     $scope.dibujarCabeceraPDFProformaEmpresa(doc, pagina, totalPaginas, $scope.listaUsuarioEmpresa, $scope.paginator);
                //     var index = 0;
                //     for (var i = 0; i < $scope.listaUsuarioEmpresa.length && items <= itemsPorPagina; i++) {


                //         for (let j = 0; j < $scope.listaUsuarioEmpresa[i].detallesProformas.length; j++) {
                //             const detallesProformas = $scope.listaUsuarioEmpresa[i].detallesProformas[j];
                //             index = index + 1;
                //             doc.font("Helvetica", 8);
                //             doc.text(index, 50, y);
                //             var fecha = $scope.fechaATexto($scope.listaUsuarioEmpresa[i].fecha_proforma);
                //             doc.text(fecha, 70, y);
                //             doc.text($scope.listaUsuarioEmpresa[i].correlativo, 120, y);
                //             doc.text(detallesProformas.servicio.nombre, 180, y);
                //             doc.text(formatNumber($scope.listaUsuarioEmpresa[i].totalImporteBs), 420, y);
                //             doc.text(formatNumber($scope.listaUsuarioEmpresa[i].totalImporteBs / $scope.dolarGraf, 2), 500, y);

                //             y = y + 15;
                //             items++;
                //             if (items > itemsPorPagina) {
                //                 doc.addPage({ margin: 10, bufferPages: true });
                //                 y = 120;
                //                 items = 0;
                //                 pagina = pagina + 1;
                //                 $scope.dibujarCabeceraPDFProformaEmpresa(doc, pagina, totalPaginas, $scope.listaUsuarioEmpresa, $scope.paginator);
                //             }
                //         }
                //     }

                //     doc.end();
                //     stream.on('finish', function () {
                //         var fileURL = stream.toBlobURL('application/pdf');
                //         window.open(fileURL, '_blank', 'location=no');
                //     });
                //     blockUI.stop();
                // })
            }

            $scope.dibujarCabeceraPDFProformaEmpresa = function (doc, pagina, totalPaginas, reporte, filtro) {

                doc.font("Helvetica-Bold", 12)
                doc.text("PROFORMAS IMP. IND.", 0, 40, { align: 'center' });
                doc.rect(235, 50, 132, 0).stroke();

                doc.font("Helvetica-Bold", 10)
                doc.text(reporte[0].cliente.razon_social, 0, 65, { align: 'center' });
                doc.font("Helvetica-Bold", 9)
                if (filtro.filter.mes != 0 && filtro.filter.anio != 0) {
                    var mes = filtro.filter.mes;
                    var anio = filtro.filter.anio;
                    var ultimoDia = new Date(anio, mes + 1, 0);
                    doc.text("Desde " + 1 + "/" + mes + "/" + anio + " al " + ultimoDia.getDate() + "/" + mes + "/" + anio, 0, 80, { align: 'center' });
                } else {
                    doc.text("Todo", 0, 80, { align: 'center' })
                }

                doc.font("Helvetica-Bold", 8)
                doc.text("N°", 50, 100);
                doc.text("fecha", 70, 100);
                doc.text("N° Prof.", 120, 100);
                doc.text("Servicio", 180, 100);
                doc.text("Monto Bs.", 420, 100);
                doc.text("Monto $us", 500, 100);
                doc.text(pagina + " de " + totalPaginas + " paginas", 500, 730)
            }

            $scope.abrirVentanaCentroCostos = function () {
                $scope.abrirPopup($scope.dialogReporteCentroCostos);
            }
            $scope.cerraVentanaCentroCostos = function () {
                $scope.cerrarPopup($scope.dialogReporteCentroCostos);
            }

            $scope.imprimirSimpleReporteExcelEmpresa = (cliente) => {
                blockUI.start();
                if (cliente) $scope.filtroGraficosEmpresa.id_cliente = cliente.id;
                $scope.paginatorGraficosEmpresa.filter = $scope.filtroGraficosEmpresa
                const mes = [];
                for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                    mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                }
                $scope.paginatorGraficosEmpresa.mes = mes.join(',');
                const promesa = filtroListaProformasEmpresa($scope.paginatorGraficosEmpresa, false, false, true)
                promesa.then((res) => {
                    blockUI.stop();
                    if (res.hasErr) return $scope.mostrarMensaje(res.mensaje);
                    $scope.filtroGraficosEmpresa.id_cliente = 0;
                    $scope.ReporteProformasEXCEL(res.proformas)
                }).catch(function (err) {
                    blockUI.stop();
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg);
                })
            }

            $scope.abrirReporteCentroCosto = function (filtro) {
                const mes = $scope.filtro.mes && $scope.filtro.mes.id || 0;
                const anio = $scope.filtro.anio && $scope.filtro.anio.id || 0;
                const promesa = ListaCentroCostos($scope.usuario.id_empresa, mes, anio)
                promesa.then(function (res) {
                    if (res.hasErr) return $scope.mostrarMensaje(res.mensaje);
                    let centroCostosDetallesProformas = res.campamentosProformas
                    let centrosCostoPlanillaSueldos = res.campamentosPlanilla
                    let datosReporte = []
                    let totalEmpleados = 0
                    let totalGanado = 0
                    let totalIngreso = 0
                    for (const ccDetalleProforma of centroCostosDetallesProformas) {
                        let ccPlanillaSueldo = centrosCostoPlanillaSueldos.find(function (x) {
                            return x.id == ccDetalleProforma.id
                        })
                        ccDetalleProforma.planillasSueldo = ccPlanillaSueldo
                        totalEmpleados += ccDetalleProforma.planillasSueldo ? ccDetalleProforma.planillasSueldo.empleadosCampo.length : 0
                        if (ccDetalleProforma.planillasSueldo) {
                            for (const empleado of ccDetalleProforma.planillasSueldo.empleadosCampo) {
                                totalGanado += empleado.empleadosFichas[0].rrhhDetalleSueldos.total_ganado
                            }
                        }
                        if (ccDetalleProforma.detallesProformas) {
                            for (const detalleProforma of ccDetalleProforma.detallesProformas) {
                                totalIngreso += detalleProforma.importe
                            }
                        }
                    }
                    for (const ccDetalleProforma of centroCostosDetallesProformas) {
                        let infoPorCentroCosto = {}
                        infoPorCentroCosto.nombre = ccDetalleProforma.nombre
                        infoPorCentroCosto.cantidadTrabajadores = ccDetalleProforma.planillasSueldo ? ccDetalleProforma.planillasSueldo.empleadosCampo.length : 0
                        infoPorCentroCosto.trabajadoresPorcentaje = (infoPorCentroCosto.cantidadTrabajadores / totalEmpleados) * 100
                        infoPorCentroCosto.totalGanado = 0
                        if (ccDetalleProforma.planillasSueldo) {
                            for (const empleado of ccDetalleProforma.planillasSueldo.empleadosCampo) {
                                infoPorCentroCosto.totalGanado += empleado.empleadosFichas[0].rrhhDetalleSueldos.total_ganado
                            }
                        }
                        infoPorCentroCosto.totalGanadoPorcentaje = (infoPorCentroCosto.totalGanado / totalGanado) * 100
                        infoPorCentroCosto.DifPorcentual = infoPorCentroCosto.totalGanadoPorcentaje - infoPorCentroCosto.trabajadoresPorcentaje
                        infoPorCentroCosto.ingreso = 0
                        if (ccDetalleProforma.detallesProformas) {
                            for (const detalleProforma of ccDetalleProforma.detallesProformas) {
                                infoPorCentroCosto.ingreso += detalleProforma.importe
                            }
                        }
                        infoPorCentroCosto.ingresoPorcentaje = (infoPorCentroCosto.ingreso / totalIngreso) * 100
                        infoPorCentroCosto.cargaSocial = 0
                        infoPorCentroCosto.totalGastos = 0
                        infoPorCentroCosto.utilidad = 0
                        datosReporte.push(infoPorCentroCosto)

                    }
                    $scope.imprimirReporteCentroCostos(datosReporte, filtro)
                })
            }

            $scope.imprimirReporteCentroCostos = function (reporte, filtro) {
                var centroCostos = reporte;

                var doc = new PDFDocument({ size: 'letter', margin: 10, compress: false }); //{compress: false},
                var stream = doc.pipe(blobStream());

                var totalEmpleados = 0;
                var totalGanado = 0;
                var totalIngreso = 0;
                for (let i = 0; i < centroCostos.length; i++) {
                    totalEmpleados = totalEmpleados + centroCostos[i].cantidadTrabajadores
                    totalGanado = totalGanado + centroCostos[i].totalGanado;
                    totalIngreso = totalIngreso + centroCostos[i].ingreso;
                }

                var y = 147, w = 145, itemsPorPagina = 29, items = 0, pagina = 1, totalPaginas = Math.ceil(centroCostos.length / itemsPorPagina);
                $scope.dibujarCabeceraPDFCentroCostos(doc, pagina, totalPaginas, centroCostos, totalEmpleados, totalGanado, filtro, totalIngreso);
                var index = 0;
                for (var i = 0; i < centroCostos.length && items <= itemsPorPagina; i++) {
                    var porcentaje = 0;
                    var porcentajeDif = 0;
                    var difProcentajes = 0;
                    var porcentajeIngreso = 0;
                    var cargaSocial = 0;
                    var utilidad = 0;
                    doc.font('Helvetica', 6)
                    doc.rect(50, w, 70, 20).stroke();
                    doc.text(centroCostos[i].nombre, 53, y)
                    doc.rect(120, w, 53, 20).stroke();
                    doc.text(centroCostos[i].cantidadTrabajadores, 140, y)
                    doc.rect(173, w, 40, 20).stroke();
                    //  porcentaje = (centroCostos[i].NumTrabajadores / totalEmpleados) * 100;
                    doc.text(centroCostos[i].trabajadoresPorcentaje ? formatNumber(centroCostos[i].trabajadoresPorcentaje) : 0, 183, y)
                    doc.rect(213, w, 55, 20).stroke();
                    var fechaA = new Date();
                    /*  if (filtro.mes.id == fechaA.getMonth() && filtro.anio.id == fechaA.getFullYear()) { */
                    doc.text(formatNumber(centroCostos[i].totalGanado), 220, y);
                    doc.rect(268, w, 40, 20).stroke();
                    //  porcentajeDif = (0) * 100;
                    doc.text(formatNumber(centroCostos[i].totalGanadoPorcentaje), 270, y);
                    doc.rect(308, w, 40, 20).stroke();
                    //  difProcentajes = porcentajeDif - porcentaje;
                    doc.text(formatNumber(centroCostos[i].DifPorcentual), 320, y);
                    doc.rect(348, w, 50, 20).stroke();
                    doc.text(formatNumber(centroCostos[i].ingreso), 352, y);
                    doc.rect(398, w, 40, 20).stroke();
                    // porcentajeIngreso = (centroCostos[i].ingreso / totalIngreso) * 100;
                    doc.text(formatNumber(centroCostos[i].ingresoPorcentaje), 410, y);
                    doc.rect(438, w, 40, 20).stroke();
                    cargaSocial = centroCostos[i].totalGanado * 0.50;
                    doc.text(formatNumber(cargaSocial), 440, y);
                    doc.rect(478, w, 50, 20).stroke();
                    doc.text(0, 480, y);
                    utilidad = centroCostos[i].ingreso - centroCostos[i].totalGanado - cargaSocial
                    doc.rect(528, w, 50, 20).stroke();
                    doc.text(formatNumber(utilidad), 530, y);
                    /* } else {
                        doc.text(formatNumber(centroCostos[i].importe_sueldo_basico), 214, y);
                        doc.rect(268, w, 40, 20).stroke();
                        porcentajeDif = (centroCostos[i].importe_sueldo_basico / totalGanado) * 100;
                        doc.text(formatNumber(porcentajeDif), 280, y);
                        doc.rect(308, w, 40, 20).stroke();
                        difProcentajes = porcentajeDif - porcentaje;
                        doc.text(formatNumber(difProcentajes), 320, y);
                        doc.rect(348, w, 50, 20).stroke();
                        doc.text(formatNumber(centroCostos[i].ingreso), 350, y);
                        doc.rect(398, w, 40, 20).stroke();
                        porcentajeIngreso = (centroCostos[i].ingreso / totalIngreso) * 100;
                        doc.text(formatNumber(porcentajeIngreso), 410, y);
                        doc.rect(438, w, 40, 20).stroke();
                        cargaSocial = centroCostos[i].importe_sueldo_basico * 0.50;
                        doc.text(formatNumber(cargaSocial), 440, y);
                        doc.rect(478, w, 50, 20).stroke();
                        utilidad = (centroCostos[i].ingreso / (centroCostos[i].importe_sueldo_basico + cargaSocial)) * 100
                        doc.text(formatNumber(utilidad), 480, y);
                    } */



                    y = y + 20;
                    w = w + 20;
                    items++;
                    if (items > itemsPorPagina) {
                        doc.addPage({ margin: 10, bufferPages: true });
                        y = 147;
                        w = 145;
                        items = 0;
                        pagina = pagina + 1;
                        $scope.dibujarCabeceraPDFCnetroCostos(doc, pagina, totalPaginas, centroCostos, totalEmpleados, totalGanado, filtro, totalIngreso);
                    }
                }

                doc.end();
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
            }

            $scope.dibujarCabeceraPDFCentroCostos = function (doc, pagina, totalPaginas, centroCostos, totalEmpleados, totalGanado, filtro, totalIngreso) {
                var fechaA = new Date();
                var ultimoDia = new Date(fechaA.getFullYear(), fechaA.getMonth() + 1, 0);
                var periodo = "";
                if (filtro.mes != "" && filtro.anio != "") {
                    periodo = "Periodo " + filtro.mes.nombre + " del " + filtro.anio.id;
                } else {
                    periodo = "Pediodo: Todos"
                }

                doc.font('Helvetica-Bold', 8)
                /*    if (filtro.mes.id < fechaA.getMonth() && filtro.anio.id < fechaA.getFullYear()) {
                       doc.text(totalEmpleados, 140, 110)
                   } else if (filtro.mes.id == "" && filtro.anio.id == "") { */
                doc.text(totalEmpleados, 140, 110)
                /*   } else if (filtro.mes.id == fechaA.getMonth() && filtro.anio.id == fechaA.getFullYear()) {
                      doc.text(0, 140, 110)
                  }
   */
                doc.text(100 + "%", 183, 110)
                doc.text(formatNumber(totalGanado), 223, 110)
                doc.text(100 + "%", 278, 110)
                doc.text(formatNumber(totalIngreso), 350, 110);
                doc.text(formatNumber((totalGanado) * 0.50), 440, 110)

                doc.font('Helvetica-Bold', 12)
                doc.text("CENTRO DE COSTOS", 0, 60, { align: 'center' });
                doc.font('Helvetica-Bold', 10)
                doc.text(periodo, 0, 75, { align: 'center' });
                doc.text("Expresado en Bolivianos", 0, 90, { align: 'center' });
                doc.font('Helvetica-Bold', 8)
                doc.rect(50, 120, 70, 25).stroke();
                doc.text("Campo", 60, 123);

                doc.rect(120, 120, 53, 25).stroke();
                doc.text("Cantidad", 123, 123);
                doc.text("Trabajadores", 121, 133);

                doc.rect(173, 120, 40, 25).stroke();
                doc.text("%", 183, 123);

                doc.rect(213, 120, 55, 25).stroke();
                doc.text("Total Ganado", 214, 123);

                doc.rect(268, 120, 40, 25).stroke();
                doc.text("%", 280, 123);

                doc.rect(308, 120, 40, 25).stroke();
                doc.text("%", 320, 123);
                doc.text("Dif.", 317, 133);

                doc.rect(348, 120, 50, 25).stroke();
                doc.text("Ingresos", 358, 123);

                doc.rect(398, 120, 40, 25).stroke();
                doc.text("%", 415, 123);

                doc.rect(438, 120, 40, 25).stroke();
                doc.text("Carga", 445, 123);
                doc.text("Social", 444, 133);
                doc.rect(478, 120, 50, 25).stroke();
                doc.text("Total", 491, 123);
                doc.text("Gastado", 490, 133);

                doc.rect(528, 120, 50, 25).stroke();
                doc.text("Utilidad", 535, 123);
                /* doc.text("Utilidad", 488, 133); */

                doc.font('Helvetica-Bold', 8);
                var fechaActual = new Date();
                doc.text("Usuario: " + $scope.usuario.nombre_usuario + " Fecha: " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + " - " + fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds(), 400, 760);

            }

            $scope.abrirVentaGraficaComparativa = function () {
                $scope.abrirPopup($scope.dialogGraficaComparativa);
            }

            $scope.cerrarVentaGraficaComparativa = function () {
                $scope.cerrarPopup($scope.dialogGraficaComparativa);
            }

            $scope.graficoComparativo = (proforma) => {
                $scope.abrirVentaGraficaComparativa();
                const empresa = $scope.usuario.id_empresa;
                let mes = [];
                if (Array.isArray($scope.filtroGraficosEmpresa.mes)) {
                    for (let i = 0; i < $scope.filtroGraficosEmpresa.mes.length; i++) {
                        mes.push($scope.filtroGraficosEmpresa.mes[i].id);
                    }
                } else {
                    mes = 0;
                }
                const cliente = proforma && proforma.id || 0;
                const anio = $scope.filtroGraficosEmpresa.anio ? $scope.filtroGraficosEmpresa.anio.id : "0";
                const promesa = reporteProformaComparativo(empresa, cliente, mes, anio)
                promesa.then((res) => {
                    const comparativa_proformas = res.comparativa.proformas;
                    const comparativa_facturas = res.comparativa.facturas;
                    const Dataproforma = comparativa_proformas.map((dato, index) => (index === dato.periodo_mes ? dato.monto : 0));
                    const Datafactura = comparativa_facturas.map((dato, index) => (index === dato.periodo_mes ? dato.monto : 0));
                    const ctx = document.getElementById("myChartSaleVsPurchase");
                    const myChartPurchase = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiempbre", "Octubre", "Noviembre", "Diciembre"],
                            datasets: [{
                                label: '# Proformas',
                                data: Dataproforma,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)'

                                ],
                                borderWidth: 1
                            }, {
                                label: '# Facturaciones',
                                data: Datafactura,
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(54, 162, 235, 1)'
                                ],
                                borderWidth: 1
                            }]

                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Tabla Comparativa',
                                fontSize: 20
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                    // myChartPurchase.render()
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }

            $scope.subirExcelFacturacion2 = function (event) {
                var files = event.target.files;
                var i, f;

                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0, row2 = 2;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var listaFacturas = []
                        var salir = 0;
                        do {
                            row2 = 2
                            var dato = {}
                            dato.NumFactura = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : salir + 1;
                            dato.NumProforma = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : salir + 1;
                            dato.NumAutorizacion = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : salir + 1;
                            dato.FechaFactura = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? $scope.convertirNumerosFecha(worksheet['D' + row].v.toString()) : salir + 1;
                            dato.FechaOk = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? $scope.convertirNumerosFecha(worksheet['E' + row].v.toString()) : salir + 1;
                            dato.cliente = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : salir + 1;
                            dato.nit = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : salir + 1;
                            dato.monto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : salir + 1;
                            dato.detalle = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : salir + 1;
                            dato.codigoControl = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : salir + 1;
                            dato.tipoPago = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : salir + 1;
                            dato.dias = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : salir + 1;
                            dato.ac = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : salir + 1;

                            listaFacturas.push(dato)
                            row++

                        } while (worksheet['A' + row] != undefined);
                        if (salir != 0) {
                            $scope.mostrarMensaje("Todos los campos son requeridos");
                            $scope.limpiarArchivoImportacion()
                        } else {
                            // $scope.verificarListaProformas2(listaFacturas);
                            $scope.generarFacturasProforma2(listaFacturas);
                            $scope.limpiarArchivoImportacion()
                        }
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.generarFacturasProforma2 = async function (paraFacturar) {
                if (paraFacturar.length > 0) {
                    $scope.arreglo = new Array();
                    blockUI.start()
                    $scope.obtenerMovimientosEgreso()
                    $scope.obtenerTiposDePago()
                    var movimiento;
                    var promMov = ClasesTipo('MOVEGR')
                    promMov.then(function (dato) {
                        dato.clases.forEach(function (clase) {
                            if (clase.nombre == "FACTURACIÓN" && clase.nombre_corto == "FACT") {
                                movimiento = clase
                            }
                        })
                        $scope.mostrarMensaje('Por favor espere...')
                        blockUI.start()
                        paraFacturar.forEach(function (proforma, y) {
                            proforma.importe = proforma.importeTotalBs
                            var fecha_facturar = ("0" + (proforma.FechaFactura.getDate())).slice(-2) + "/" + ("0" + (proforma.FechaFactura.getMonth() + 1)).slice(-2) + "/" + proforma.FechaFactura.getFullYear();
                            proforma.FechaFactura = fecha_facturar;
                            proforma.movimiento = movimiento;
                            var prom = ProformasFacturasImp($scope.usuario.empresa.id, proforma.NumFactura, proforma)
                            prom.then(function (res) {
                                if (res.hasErr == false) {
                                    var imgDelay = ObtenerImagen($scope.usuario.empresa.imagen)
                                    imgDelay.then(function (img) {
                                        // ImprimirSalida("FACT", res.factura, false, $scope.usuario)
                                        $scope.mostrarMensaje(res.mensaje)
                                    })

                                } else {
                                    $scope.mostrarMensaje(res.mensaje)
                                    // txtProductosInv = txtProductosInv + "numAutorizacion: <strong class='green'>" + res.factura.NumAutorizacion + "</strong>" + " numProforma: " + res.factura.NumProforma + "<br>";
                                    // if (y == paraFacturar.length - 1) {
                                    //     $scope.mostrarMensaje(txtProductosInv);
                                    // }
                                }

                                blockUI.stop()
                            }).catch(function (err) {
                                var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                $scope.mostrarMensaje(msg)
                                blockUI.stop()
                            })
                            // $scope.dolarActual = $scope.obtenerCambioDolarActual()
                        });

                        blockUI.stop()
                    })
                } else {
                    console.log("Error no existen proformas")
                }
            }


            $scope.subirExcelFacturacion = function (event) {
                var files = event.target.files;
                var i, f;

                for (i = 0, f = files[i]; i != files.length; ++i) {
                    //console.log('iniciando lectura de excel(s)')
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var first_sheet_name = workbook.SheetNames[0];
                        var row = 2, i = 0, row2 = 2;
                        var worksheet = workbook.Sheets[first_sheet_name];
                        var listaFacturas = []
                        var salir = 0;
                        do {
                            row2 = 2
                            var dato = {}

                            dato.NumFactura = worksheet['A' + row] != undefined && worksheet['A' + row] != "" ? worksheet['A' + row].v.toString() : salir + 1;
                            dato.NumProforma = worksheet['B' + row] != undefined && worksheet['B' + row] != "" ? worksheet['B' + row].v.toString() : salir + 1;
                            dato.NumAutorizacion = worksheet['C' + row] != undefined && worksheet['C' + row] != "" ? worksheet['C' + row].v.toString() : salir + 1;
                            dato.FechaFactura = worksheet['D' + row] != undefined && worksheet['D' + row] != "" ? $scope.convertirNumerosFecha(worksheet['D' + row].v.toString()) : salir + 1;
                            dato.FechaOk = worksheet['E' + row] != undefined && worksheet['E' + row] != "" ? $scope.convertirNumerosFecha(worksheet['E' + row].v.toString()) : salir + 1;
                            dato.cliente = worksheet['F' + row] != undefined && worksheet['F' + row] != "" ? worksheet['F' + row].v.toString() : salir + 1;
                            dato.nit = worksheet['G' + row] != undefined && worksheet['G' + row] != "" ? worksheet['G' + row].v.toString() : salir + 1;
                            dato.monto = worksheet['H' + row] != undefined && worksheet['H' + row] != "" ? parseFloat(worksheet['H' + row].v.toString()) : salir + 1;
                            dato.detalle = worksheet['I' + row] != undefined && worksheet['I' + row] != "" ? worksheet['I' + row].v.toString() : salir + 1;
                            dato.codigoControl = worksheet['J' + row] != undefined && worksheet['J' + row] != "" ? worksheet['J' + row].v.toString() : salir + 1;
                            dato.tipoPago = worksheet['K' + row] != undefined && worksheet['K' + row] != "" ? worksheet['K' + row].v.toString() : salir + 1;
                            dato.dias = worksheet['L' + row] != undefined && worksheet['L' + row] != "" ? worksheet['L' + row].v.toString() : salir + 1;
                            dato.ac = worksheet['M' + row] != undefined && worksheet['M' + row] != "" ? worksheet['M' + row].v.toString() : salir + 1;

                            /*var sucursalEncontrada = $scope.sucursales.find(function (sucursal) {
                                return sucursal.nombre.toUpperCase() == dato.sucursal.toUpperCase()
                            })*/

                            listaFacturas.push(dato)
                            row++

                        } while (worksheet['A' + row] != undefined);
                        if (salir != 0) {
                            $scope.mostrarMensaje("Todos los campos son requeridos");
                            $scope.limpiarArchivoImportacion()
                        } else {
                            $scope.verificarListaProformas(listaFacturas);
                            $scope.limpiarArchivoImportacion()
                        }
                    };
                    reader.readAsBinaryString(f);
                }
            }

            $scope.verificarListaProformas = async function (lista) {
                blockUI.start()
                $scope.errorFacturacion = 0;
                var tm = lista.length * 100;
                lista.forEach(function (element, index, array) {
                    var empresa = $scope.usuario.id_empresa


                    $scope.verificar(lista, element, empresa, element.NumProforma)
                        .then((data) => {
                            $scope.listaFacturas = data;
                        }
                        );
                });

                // corregir esta parte ===============================================
                setTimeout(function () {
                    if ($scope.listaFacturas) {

                        $scope.separarProformas($scope.listaFacturas);
                    } else {
                        blockUI.stop();
                    }

                }, tm)
            }

            $scope.separarProformas = function (lista) {
                var listas = lista.lista;
                if (listas.length > 0) {
                    var listaAxu = listas;
                    var listaMaster = listas;
                    //for (var i = listaMaster.length - 1; i > 1; i--) {
                    var i = 0;
                    while (listaMaster.length != 0) {
                        var i = listaMaster.length - 1;
                        var listasAprovadas = new Array();
                        var id_cliente = listaMaster[i].id_cliente;
                        var id_actividad = listaMaster[i].id_actividad;
                        var factNum = listaMaster[i].NumFactura;
                        for (var j = listaAxu.length - 1; j >= 0; j--) {
                            if (id_cliente == listaAxu[j].id_cliente && id_actividad == listaAxu[j].id_actividad && factNum == listaAxu[j].NumFactura) {
                                if (listaAxu[j].fecha_proforma_ok != null) {
                                    listasAprovadas.push(listaAxu[j])
                                    listaMaster.splice(j, 1)
                                }
                            }

                        }
                        $scope.generarFacturasProforma(listasAprovadas);
                    }
                    //}

                    // setTimeout(function(){

                    //     for (let i = 0; i < $scope.arreglo.length; i++) {
                    //         const element = $scope.arreglo[i];
                    //         var num_correlativo = element.num_factura;
                    //         blockUI.start();
                    //         var prom = ImportacionFacturacion($scope.usuario.empresa.id,num_correlativo,element)
                    //             prom.then(function (res) {
                    //             if (res.hasError === undefined) {
                    //                 var imgDelay = ObtenerImagen($scope.usuario.empresa.imagen)
                    //                 imgDelay.then(function (img) {
                    //                     ImprimirSalida("FACT", res.factura, false, $scope.usuario)
                    //                     $scope.mostrarMensaje(res.mensaje)

                    //                 })

                    //             } else {
                    //                 $scope.mostrarMensaje(res.mensaje)

                    //             }
                    //             blockUI.stop()
                    //         }).catch(function (err) {
                    //             var msg = (err.stack !== undefined && err.stack !== null) ? err.message +'<br />'+ err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    //             $scope.mostrarMensaje(msg)
                    //             blockUI.stop()
                    //         })
                    //     }
                    // },6000)

                }
            }

            $scope.obtenerMovimientosEgreso = function () {
                blockUI.start();
                var promesa = ClasesTipo("MOVEGR");
                promesa.then(function (entidad) {
                    $scope.movimientosEgreso = entidad.clases;
                    blockUI.stop();
                });
            }

            $scope.obtenerTiposDePago = function () {
                blockUI.start();
                var promesa = ClasesTipo("TIPA");
                promesa.then(function (entidad) {
                    $scope.tiposPago = entidad.clases.reduce(function (value, x) {
                        if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
                            value.push(x)
                        }
                        return value
                    }, []);
                    blockUI.stop();
                });
            }

            $scope.obtenerCambioDolarActual = function () {
                var hoy = new Date();
                var dolarActual = { ufv: "--", dolar: "--" }
                var promesa = ObtenerCambioMoneda(new Date(), $scope.usuario.id_empresa)
                promesa.then(function (res) {
                    dolarActual = { ufv: res.monedaCambio.ufv, dolar: res.monedaCambio.dolar }
                    return dolarActual
                }, function (err) {
                    $scope.mostrarMensaje('Hubo un problema al recuperar el cambio de dolar para ' + hoy.toLocaleDateString())
                    return dolarActual
                })

            }

            $scope.generarFacturasProforma = function (paraFacturar) {

                if (paraFacturar.length > 0) {
                    if ($scope.listaFacturas.profError.length > 0) {
                        $scope.mostrarMensaje("Las proformas " + $scope.listaFacturas.profError.join("," + " no existen"));
                    }
                    var tipoPago = new Array()
                    $scope.arreglo = new Array();
                    var variables = {};
                    for (let i = 0; i < paraFacturar.length; i++) {
                        const element = paraFacturar[i];
                        variables.id = element.id
                        variables.tipoPago = element.tipoPago;
                        variables.dias = element.dias
                        variables.ac = element.ac,
                            variables.NumFactura = element.NumFactura
                        tipoPago.push(variables)
                    }
                    blockUI.start()
                    $scope.obtenerMovimientosEgreso()
                    $scope.obtenerTiposDePago()
                    let fecha_facturacion = paraFacturar[0].FechaFactura;
                    let tiposPagos = paraFacturar[0].tipoPago;
                    var NumeroAutorizacion = Number(paraFacturar[0].NumAutorizacion);

                    var datosProformas = []
                    var promMov = ClasesTipo('MOVEGR')
                    var movimiento = {}
                    promMov.then(function (dato) {
                        dato.clases.forEach(function (clase) {
                            if (clase.nombre == "FACTURACIÓN" && clase.nombre_corto == "FACT") {
                                movimiento = clase
                            }
                        })
                        var fact = []
                        paraFacturar.forEach(function (proforma, i) {
                            fact.push(proforma.id)
                        })
                        var prom = ProformasInfo(fact.join(','))

                        prom.then(function (datosProformas) {
                            if (datosProformas.hasErr) {
                                $scope.mostrarMensaje(datosProformas.mensaje)
                                blockUI.stop()
                                return
                            }
                            // datosProformas.push(porformaConsultada.proforma)
                            $scope.facturaProformas = {}
                            $scope.facturaProformas.movimiento = movimiento
                            $scope.facturaProformas.cliente = datosProformas.proformas[0].cliente
                            // $scope.facturaProformas.actividadEconomica = datosProformas.proformas[0].actividadEconomica
                            var continuar = false
                            $scope.facturaProformas.actividad = datosProformas.proformas[0].actividadEconomica
                            datosProformas.proformas[0].sucursal.actividadesDosificaciones.forEach(function (dosificacion, k) {
                                // if (dosificacion.id_actividad == $scope.facturaProformas.actividad.id && !dosificacion.expirado && !dosificacion.dosificacion.expirado) {
                                // corregir de que sean los mismos numeros de autorizacion ===========
                                if (dosificacion.id_actividad == $scope.facturaProformas.actividad.id && NumeroAutorizacion == dosificacion.dosificacion.autorizacion && !dosificacion.expirado) {
                                    $scope.facturaProformas.sucursal = Object.assign({}, datosProformas.proformas[0].sucursal)
                                    $scope.facturaProformas.sucursal.actividadesDosificaciones = Object.assign({}, dosificacion)
                                }
                                if (k == datosProformas.proformas[0].sucursal.actividadesDosificaciones.length - 1) {
                                    if ($scope.facturaProformas.sucursal !== undefined) {
                                        continuar = true
                                    }
                                }
                            })
                            if (!continuar) {
                                blockUI.stop()
                                $scope.mostrarMensaje('Existe un problema con la dosificación actual. No se puede continuar con la facturación')
                                return
                            }
                            // $scope.facturaProformas.sucursal = datosProformas.proformas[0].sucursal
                            $scope.facturaProformas.detallesVenta = []
                            $scope.facturaProformas.detalle = ""
                            $scope.facturaProformas.totalImporteBs = 0
                            $scope.facturaProformas.totalImporteSus = 0
                            $scope.facturaProformas.importe = 0
                            var fecha_facturar = ("0" + (fecha_facturacion.getDate())).slice(-2) + "/" + ("0" + (fecha_facturacion.getMonth() + 1)).slice(-2) + "/" + fecha_facturacion.getFullYear();
                            $scope.facturaProformas.fecha_factura = fecha_facturar;
                            $scope.facturaProformas.fechaTexto = fecha_facturar;
                            $scope.facturaProformas.periodo_mes = { id: (new Date(fecha_facturacion).getMonth() + 1) }
                            $scope.facturaProformas.periodo_anio = { id: new Date(fecha_facturacion).getFullYear() }
                            $scope.facturaProformas.datosProformas = datosProformas.proformas
                            $scope.facturaProformas.descripcion = ""
                            $scope.facturaProformas.movimiento = $scope.movimientosEgreso[0]
                            $scope.facturaProformas.id_movimiento = $scope.facturaProformas.movimiento.id


                            if (tiposPagos === "credito") {
                                $scope.facturaProformas.id_tipo_pago = $scope.tiposPago[1].id
                                $scope.facturaProformas.tipoPago = $scope.tiposPago[1]
                            } else if (tiposPagos === "contado") {
                                $scope.facturaProformas.id_tipo_pago = $scope.tiposPago[0].id
                                $scope.facturaProformas.tipoPago = $scope.tiposPago[0]
                            } else {
                                $scope.mostrarMensaje("El tipo de credito no esta bien definido de la proforma " + proforma.correlativo);
                                return;
                            }
                            // $scope.obtenerTipoEgreso($scope.facturaProformas.movimiento)
                            $scope.esContado = false
                            $scope.facturaProformas.usar_servicios = true
                            $scope.facturaProformas.id_usuario = $scope.usuario.id
                            $scope.facturaProformas.fecha = new Date()
                            $scope.facturaProformas.detallesVentaNoConsolidadas = []
                            $scope.facturaProformas.id_empresa = $scope.usuario.id_empresa
                            $scope.facturaProformas.datosProformas.forEach(function (proforma, y) {
                                $scope.facturaProformas.descripcion += proforma.detalle + ". "
                                $scope.facturaProformas.totalImporteBs += proforma.totalImporteBs
                                $scope.facturaProformas.importe = $scope.facturaProformas.totalImporteBs
                                $scope.facturaProformas.total = $scope.facturaProformas.importe
                                $scope.facturaProformas.importeLiteral = ConvertirALiteral($scope.facturaProformas.totalImporteBs.toFixed(2));
                                // $scope.facturaProformas.totalImporteSus = $scope.facturaProformas.totalImporteBs / proforma.tc.dolar
                                proforma.importe = proforma.importeTotalBs
                                proforma.detallesProformas.forEach(function (det, c) {
                                    det.tc = proforma.tc
                                    if (c === proforma.detallesProformas.length - 1) {
                                        Array.prototype.push.apply($scope.facturaProformas.detallesVenta, proforma.detallesProformas);
                                    }
                                    if (y === $scope.facturaProformas.datosProformas.length - 1 && c === proforma.detallesProformas.length - 1) {
                                        $scope.mostrarMensaje('Por favor espere...')
                                        //console.log($scope.facturaProformas)
                                        blockUI.start()
                                        for (let j = 0; j < tipoPago.length; j++) {
                                            const element = tipoPago[j];
                                            $scope.facturaProformas.num_factura = element.NumFactura;
                                            if (element.tipoPago === 'credito') {
                                                if ($scope.facturaProformas.a_cuenta == undefined || $scope.facturaProformas.a_cuenta == null) {
                                                    $scope.facturaProformas.a_cuenta = Number(element.ac);
                                                    $scope.facturaProformas.saldo = Number($scope.facturaProformas.total - $scope.facturaProformas.a_cuenta)
                                                }
                                                if ($scope.facturaProformas.dias_credito == undefined || $scope.facturaProformas.dias_credito == null) {
                                                    $scope.facturaProformas.dias_credito = Number(element.dias);
                                                }
                                            } else if (element.tipoPago === 'contado') {
                                                if ($scope.facturaProformas.a_cuenta == undefined || $scope.facturaProformas.a_cuenta == null) {
                                                    $scope.facturaProformas.a_cuenta = 0;
                                                    $scope.facturaProformas.saldo = $scope.facturaProformas.total - $scope.facturaProformas.a_cuenta
                                                }
                                                if ($scope.facturaProformas.dias_credito == undefined || $scope.facturaProformas.dias_credito == null) {
                                                    $scope.facturaProformas.dias_credito = Number(element.dias);
                                                }
                                            }
                                        }
                                        // $scope.arreglo.push($scope.facturaProformas)
                                        var prom = ImportacionFacturacion($scope.usuario.empresa.id, $scope.facturaProformas.num_factura, $scope.facturaProformas)
                                        prom.then(function (res) {
                                            if (res.hasError === undefined) {
                                                var imgDelay = ObtenerImagen($scope.usuario.empresa.imagen)
                                                imgDelay.then(function (img) {
                                                    ImprimirSalida("FACT", res.factura, false, $scope.usuario)
                                                    $scope.mostrarMensaje(res.mensaje)

                                                })

                                            } else {
                                                $scope.mostrarMensaje(res.mensaje)

                                            }
                                            blockUI.stop()
                                        }).catch(function (err) {
                                            var msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                            $scope.mostrarMensaje(msg)
                                            blockUI.stop()
                                        })
                                        /* var prom = await FacturaProforma($scope.usuario.empresa.id, $scope.facturaProformas)
                                           prom.then(function (res) {
                                             if (res.hasError === undefined) {
                                                 var imgDelay = ObtenerImagen($scope.usuario.empresa.imagen)
                                                 imgDelay.then(function (img) {
                                                     ImprimirSalida("FACT", res.factura, false, $scope.usuario)
                                                     $scope.mostrarMensaje(res.mensaje)
                                                     
                                                 })
                                              
                                             } else {
                                                 $scope.mostrarMensaje(res.mensaje)
                                            
                                             }
                                             blockUI.stop()
                                         }).catch(function (err) {
                                             var msg = (err.stack !== undefined && err.stack !== null) ? err.message +'<br />'+ err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                                             $scope.mostrarMensaje(msg)
                                             blockUI.stop()
                                         }) */


                                        blockUI.stop();

                                    }
                                })

                                $scope.dolarActual = $scope.obtenerCambioDolarActual()
                            });
                            blockUI.stop()

                        }).catch(function (err) {
                            var mensaje = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.data !== undefined && err.data !== null && err.data !== "") ? err.data : 'Error: Se perdio la conexión.'
                            $scope.mostrarMensaje(mensaje)
                            blockUI.stop()
                        })
                    })


                } else {
                    console.log("Error no existen proformas")
                }
            }

            $scope.guardarFacturas = function (facturarProformas) {
                console.log(facturarProformas)
            }

            $scope.verificar = async function (lista, element, empresa, NumProforma) {
                $scope.listaImportacionFacturas = new Array();
                var respuestaLista = [];
                var proformasInvalidas = [];
                var f = new Date(element.FechaOk);
                var fechaOk = f.getFullYear() + "/" + ("0" + (f.getMonth() + 1)).slice(-2) + "/" + f.getDate();

                var promesa = buscarProformaPorCorrelatico(empresa, NumProforma, fechaOk)
                $scope.listaRespuesta = await promesa.then(function (datas) {
                    if (datas.respuesta.length > 0) {
                        for (let i = 0; i < datas.respuesta.length; i++) {
                            const data = datas.respuesta[i];

                            var numProforma = lista.find(function (elementFind) {
                                return elementFind.NumProforma == data.correlativo;
                            });
                            var fecha1 = new Date(numProforma.FechaOk); fecha1.setHours(0, 0, 0, 0, 0);
                            var fecha2 = new Date(data.fecha_proforma_ok); fecha2.setHours(0, 0, 0, 0, 0);
                            if ((Number(numProforma.NumProforma) == data.correlativo) && (fecha1.getTime() === fecha2.getTime())) {
                                var id_cliente = data.id_cliente;
                                var id_actividad = data.id_actividad
                                if ($scope.listaImportacionFacturas.length > 0) {
                                    var existe = $scope.listaImportacionFacturas.find(function (e) {
                                        return (e.correlativo == data.correlativo);
                                    })
                                    if (existe) {
                                        $scope.errorFacturacion = $scope.errorFacturacion + 1;
                                        $scope.mostrarMensaje("Existen Proformas Similares: " + existe.correlativo)
                                        console.log("Existen Proformas Similares linea:433");
                                        blockUI.stop();
                                        return;
                                    } else {
                                        data.FechaFactura = numProforma.FechaFactura;
                                        data.NumFactura = numProforma.NumFactura;
                                        data.tipoPago = numProforma.tipoPago;
                                        data.dias = numProforma.dias;
                                        data.ac = numProforma.ac;
                                        data.NumAutorizacion = numProforma.NumAutorizacion;
                                        data.codigo_control = numProforma.codigoControl;
                                        $scope.listaImportacionFacturas.push(data)
                                    }
                                } else {
                                    data.FechaFactura = numProforma.FechaFactura;
                                    data.NumFactura = numProforma.NumFactura;
                                    data.tipoPago = numProforma.tipoPago;
                                    data.dias = numProforma.dias;
                                    data.ac = numProforma.ac;
                                    data.NumAutorizacion = numProforma.NumAutorizacion;
                                    data.codigo_control = numProforma.codigoControl;
                                    $scope.listaImportacionFacturas.push(data)
                                }
                            } else {
                                $scope.mostrarMensaje("Puedeser que la fecha no coincida");
                                return
                                //throw Error("Puedeser que la fecha no coincida"); 
                            }
                        }

                    } else {
                        $scope.errorFacturacion = $scope.errorFacturacion + 1;
                        proformasInvalidas.push(element.NumProforma);

                        //$scope.mostrarMensaje("El numero de proforma "+element.NumProforma+" no existe.")
                        //blockUI.stop();  
                        //throw Error("Proforma no existe") 
                    }

                    blockUI.stop();
                    respuestaLista.profError = proformasInvalidas;
                    respuestaLista.lista = $scope.listaImportacionFacturas;
                    respuestaLista.error = $scope.errorFacturacion
                    return respuestaLista

                });

                return $scope.listaRespuesta
            }

            $scope.convertirNumerosFecha = function (fecha) {
                //Realiza la conversión de fechas excel a fechas javascript, la diferencia es que en excel las fechas empiezan en 1900 y en javascript en 1970.
                //Por tanto  en excel Date(0) = 1900-01-01 y en javascript Date(0) = 1970-01-01
                var salidaFecha = null;
                if (typeof Number(fecha) === 'number') {
                    if (Number(fecha) % 1 === 0) {
                        salidaFecha = new Date((fecha - (25567 + 1)) * 86400 * 1000);
                    }
                }
                return salidaFecha;
            }

            $scope.ReporteFacturasProformasEXCEL = (facturas) => {
                if (facturas.length === 0) {
                    blockUI.stop();
                    return $scope.mostrarMensaje('No existen datos.');
                }
                const data = [
                    [
                        "#",
                        'FECHA',
                        'NÚMERO',
                        'CLIENTE',
                        'BS.',
                        '$US',
                        'AUTORIZACIÓN',
                        'CÓDIGO CONTROL',
                        'ACTIVIDAD',
                        'SUCURSAL',
                        'PERIODO'
                    ]
                ]
                const errores = [];
                blockUI.stop();
                for (let i = 0; i < facturas.length; i++) {
                    const columns = [];
                    columns.push((i + 1));
                    columns.push($scope.formatoFechaPDF(facturas[i].fecha_factura));
                    columns.push(facturas[i].factura);
                    const cliente = (facturas[i].cliente && facturas[i].cliente.razon_social && facturas[i].cliente.razon_social) || 'ANULADA';
                    columns.push(cliente);
                    columns.push(facturas[i].totalImporteBs);
                    columns.push(facturas[i].totalImporteSus);
                    columns.push(facturas[i].autorizacion);
                    const codigo_control = facturas[i].codigo_control && facturas[i].codigo_control || '0';
                    columns.push(codigo_control);
                    columns.push(facturas[i].actividadEconomica.nombre);
                    columns.push(facturas[i].sucursal.nombre);
                    columns.push(($scope.meses[facturas[i].periodo_mes].nombre + '/' + facturas[i].periodo_anio));
                    data.push(columns);
                }
                const ws_name = "SheetJS";
                const wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                ws['!cols'] = [
                    { wch: 6 }, //#
                    { wch: 12 }, // fecha
                    { wch: 10 }, // número factura
                    { wch: 30 }, // cliente
                    { wch: 16 }, // bs
                    { wch: 16 }, // $us
                    { wch: 16 }, // autorización
                    { wch: 16 }, // código control
                    { wch: 20 }, // actividad
                    { wch: 20 }, // sucursal
                    { wch: 12 } // periodo
                ];
                if (errores.length > 0) {
                    const errs = errores.map(err => 'Proforma Nº: ' + err.correlativo + ', Fecha: ' + err.fecha + ', No existe cambio dolar.').join('<br />');
                    $scope.mostrarMensaje(errs)
                }
                if (data.length < 2) return $scope.mostrarMensaje('No existen datos')
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE DE FACTURAS DE PROFORMAS.xlsx");
            }

            $scope.obtenerFacturasProformas = (excel) => {
                $scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
                const prom = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, excel);
                prom.then((facturas) => {
                    blockUI.stop();
                    if (facturas.hasErr) return $scope.mostrarMensaje(facturas.mensaje);
                    if (excel) return $scope.ReporteFacturasProformasEXCEL(facturas.facturas);
                    $scope.paginatorReporteFacturasProformas.setPages(facturas.count);
                    $scope.listaFacturasProformas = facturas.facturas;
                    if (!$scope.dialog_reporte_facturas_proformas_visible) abrirPopup($scope.dialog_reporte_facturas_proformas);
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.estadosFacturaProformaFiltro = [{ id: 1, nombre: 'Vigente' }, { id: 2, nombre: 'Anulada' }]
            $scope.abrir_dialog_reporte_facturas_proformas = () => {
                blockUI.start()
                const hoy = new Date();
                const desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                const hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
                $scope.dialog_reporte_facturas_proformas_visible = $scope.dialog_reporte_facturas_proformas_visible && $scope.dialog_reporte_facturas_proformas_visible || false;
                if ($scope.filtroFacturasProformas === undefined) $scope.filtroFacturasProformas = {
                    usuario: '', factura: null, actividadEconomica: null, sucursal: null, razon: '',
                    anio: null, mes: null, fecha_factura_desde: $scope.formatoFechaPDF(desde), fecha_factura_hasta: $scope.formatoFechaPDF(hasta), estado: null
                };
                if ($scope.paginatorReporteFacturasProformas === undefined || $scope.paginatorReporteFacturasProformas === null) {
                    $scope.paginatorReporteFacturasProformas = new Paginator();
                    $scope.paginatorReporteFacturasProformas.currentPage = 1;
                    $scope.paginatorReporteFacturasProformas.itemsPerPage = { cantidad: 10 };
                    $scope.paginatorReporteFacturasProformas.direction = "desc";
                    $scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
                    $scope.paginatorReporteFacturasProformas.callBack = $scope.obtenerFacturasProformas
                }
                $scope.paginatorReporteFacturasProformas.getSearch("", $scope.filtroFacturasProformas, null);
            }
            $scope.cerrar_dialog_reporte_facturas_proformas = () => {
                $scope.dialog_reporte_facturas_proformas_visible = false;
                $scope.cerrarPopup($scope.dialog_reporte_facturas_proformas);
            }

            $scope.checkInUseInput = (input) => {
                if (input.value !== '' && input.value !== null && input.value !== undefined) {
                    input.style.color = '#000000'
                    input.style.outline = '2px solid orange;'
                }
            }
            $scope.generarPdfLibroVentasProforma = () => {
                blockUI.start();
                $scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
                const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
                $scope.paginatorReporteFacturasProformas.direction = 'asc';
                const prom = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
                prom.then((datos) => {
                    $scope.paginatorReporteFacturasProformas.direction = directionTemp;
                    const ventas = datos.facturas;
                    const doc = new PDFDocument({ compress: false, margin: 10, layout: 'landscape' });
                    const stream = doc.pipe(blobStream());
                    // draw some text
                    $scope.dibujarCabeceraPDFLibroFacturasProformas(doc, datos, $scope.filtroFacturasProformas, 1);
                    doc.font('Helvetica', 8);
                    let y = 170, itemsPorPagina = 12, items = 0, pagina = 1;
                    let sumaImporte = 0.0, sumaImporteIce = 0.0, sumaImporteExp = 0.0, sumaImporteGrab = 0.0, sumaTotal = 0.0, sumaDescuentos = 0.0, sumaImporteBase = 0.0, sumaCredito = 0.0;
                    let sumaSubImporte = 0.0, sumaSubImporteIce = 0.0, sumaSubImporteExp = 0.0, sumaSubImporteGrab = 0.0, sumaSubTotal = 0.0, sumaSubDescuentos = 0.0, sumaSubImporteBase = 0.0, sumaSubCredito = 0.0;
                    for (let i = 0; i < ventas.length && items <= itemsPorPagina; i++) {
                        ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
                        ventas[i].total_ice = 0;
                        ventas[i].importe = ventas[i].totalImporteBs;
                        ventas[i].total_descuento = 0;
                        ventas[i].total_exento = 0;
                        doc.font('Helvetica', 6);
                        doc.rect(40, y - 10, 720, 30).stroke();
                        // ventas[i].fecha = new Date(ventas[i].fecha);
                        doc.text(i + 1, 43, y);
                        doc.text($scope.formatoFechaPDF(ventas[i].fecha_factura), 62, y);
                        doc.text(ventas[i].factura, 102, y);
                        doc.text(ventas[i].autorizacion, 130, y);
                        doc.text((ventas[i].activa ? "V" : "A"), 190, y);
                        doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0', 210, y);
                        if (ventas[i].cliente) {
                            if (ventas[i].cliente.razon_social && ventas[i].cliente.razon_social.length > 19) {
                                doc.font('Helvetica', 6);
                            }
                        }
                        doc.text(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO', 260, y - 6, { width: 100 });
                        doc.font('Helvetica', 6)
                        doc.text(ventas[i].activa ? $scope.number_format(((ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0.00) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0)), 2) : '0.00', 360, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? ventas[i].total_ice ? $scope.number_format(ventas[i].total_ice, 2) : '0.00' : '0.00', 402, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? ventas[i].total_exento ? $scope.number_format(ventas[i].total_exento, 2) : '0.00' : '0.00', 444, y, { width: 40, align: 'right' });
                        doc.text('0.00', 486, y, { width: 40, align: 'right' });
                        const venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
                        const venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
                        const venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0
                        doc.text(ventas[i].activa ? $scope.number_format(venta_subtotal, 2) : '0.00', 528, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? ventas[i].total_descuento ? $scope.number_format(ventas[i].total_descuento, 2) : '0.00' : '0.00', 570, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? $scope.number_format(venta_importe_base_debito_fiscal, 2) : '0.00', 612, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? $scope.number_format((venta_importe_base_debito_fiscal * 0.13), 2) : '0.00', 654, y, { width: 40, align: 'right' });
                        doc.text(ventas[i].activa ? ventas[i].codigo_control : 0, 702, y);
                        y = y + 30;
                        sumaSubImporte = (ventas[i].activa ? sumaSubImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubImporte);
                        sumaSubImporteIce = (ventas[i].activa ? sumaSubImporteIce + ventas[i].total_ice : sumaSubImporteIce);
                        sumaSubImporteExp = (ventas[i].activa ? sumaSubImporteExp + ventas[i].total_exento : sumaSubImporteExp);
                        sumaSubImporteGrab = 0///(ventas[i].activa ? sumaSubImporteGrab + ventas[i].total_recargo : sumaSubImporteGrab);
                        sumaSubTotal = ventas[i].activa ? sumaSubTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaSubTotal;
                        sumaSubDescuentos = ventas[i].activa ? sumaSubDescuentos + ventas[i].total_descuento : sumaSubDescuentos;
                        sumaSubImporteBase = ventas[i].activa ? sumaSubImporteBase + venta_importe_base_debito_fiscal : sumaSubImporteBase;
                        sumaSubCredito = ventas[i].activa ? sumaSubCredito + venta_importe_base_debito_fiscal * 0.13 : sumaSubCredito;
                        sumaImporte = ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte;

                        sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
                        sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
                        sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
                        sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
                        items++;

                        if (items == itemsPorPagina || i + 1 == ventas.length) {
                            sumaImporteIce += sumaSubImporteIce;
                            sumaImporteExp += sumaSubImporteExp;
                            sumaImporteGrab += sumaSubImporteGrab;
                            doc.font('Helvetica-Bold', 7);
                            doc.text("SUBTOTALES", 283, y);
                            doc.font('Helvetica-Bold', 6);
                            doc.text($scope.number_format(sumaSubImporte, 2), 360, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubImporteIce, 2), 402, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubImporteExp, 2), 444, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubImporteGrab, 2), 486, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubTotal, 2), 528, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubDescuentos, 2), 570, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubImporteBase, 2), 612, y, { width: 40, align: 'right' });
                            doc.text($scope.number_format(sumaSubCredito, 2), 654, y, { width: 40, align: 'right' });
                            doc.rect(40, y - 10, 720, 30).stroke();
                            doc.font('Helvetica', 8);
                            sumaSubImporte = 0; sumaSubImporteNo = 0; sumaSubTotal = 0; sumaSubDescuentos = 0; sumaSubImporteBase = 0; sumaSubCredito = 0;

                            if (i + 1 == ventas.length) {
                                doc.font('Helvetica-Bold', 7);
                                doc.text("TOTALES", 283, y + 30);
                                doc.font('Helvetica-Bold', 6);
                                doc.text($scope.number_format(sumaImporte, 2), 360, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaImporteIce, 2), 402, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaImporteExp, 2), 444, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaImporteGrab, 2), 486, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaTotal, 2), 528, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaDescuentos, 2), 570, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaImporteBase, 2), 612, y + 30, { width: 40, align: 'right' });
                                doc.text($scope.number_format(sumaCredito, 2), 654, y + 30, { width: 40, align: 'right' });
                                doc.rect(40, y - 10 + 30, 720, 30).stroke();
                                doc.font('Helvetica', 8);
                            } else {
                                doc.addPage({ margin: 0, bufferPages: true, layout: 'landscape' });
                                y = 170;
                                items = 0;
                                pagina = pagina + 1;
                                $scope.dibujarCabeceraPDFLibroFacturasProformas(doc, datos, $scope.filtroFacturasProformas, pagina);
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
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarExcelLibroVentasProforma = () => {
                blockUI.start();
                $scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
                const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
                $scope.paginatorReporteFacturasProformas.direction = 'asc'
                const prom = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
                prom.then((datos) => {
                    $scope.paginatorReporteFacturasProformas.direction = directionTemp;
                    const ventas = datos.facturas;
                    const data = [["N°", "FECHA DE LA FACTURA", "N° DE LA FACTURA", "N° DE AUTORIZACION", "ESTADO", "NIT/CI CLIENTE", "NOMBRE O RAZON SOCIAL", "IMPORTE TOTAL DE LA VENTA", "IMPORTE ICE/IEHD/TASAS", "EXPORTACIONES Y OPERACIONES EXENTAS", "VENTAS GRAVADAS A TASA CERO", "SUBTOTAL", "DESCUENTOS, BONIFICACIONES Y REBAJAS OBTENIDAS", "IMPORTE BASE PARA DEBITO FISCAL", "DEBITO FISCAL", "CODIGO DE CONTROL"]]
                    let sumaImporte = 0, sumaImporteIce = 0, sumaImporteExp = 0, sumaImporteGrab = 0, sumaTotal = 0, sumaDescuentos = 0, sumaImporteBase = 0, sumaCredito = 0;
                    for (let i = 0; i < ventas.length; i++) {
                        ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
                        ventas[i].total_ice = 0;
                        ventas[i].importe = ventas[i].totalImporteBs;
                        ventas[i].total_descuento = 0;
                        ventas[i].total_exento = 0;
                        const cabecera = [];
                        // ventas[i].fecha = new Date(ventas[i].fecha);
                        cabecera.push(i + 1);
                        cabecera.push($scope.formatoFechaPDF(ventas[i].fecha_factura));
                        cabecera.push(ventas[i].factura);
                        cabecera.push((ventas[i].autorizacion) ? ventas[i].autorizacion : "");
                        cabecera.push((ventas[i].activa ? "V" : "A"));
                        cabecera.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? '' + ventas[i].cliente.nit : '0' : '0' : '0');
                        cabecera.push(ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO');
                        cabecera.push(ventas[i].activa ? (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : 0);
                        cabecera.push(ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice : 0 : 0);
                        cabecera.push(ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento : 0 : 0);
                        cabecera.push(0);
                        const venta_subtotal = ventas[i].totalImporteBs;
                        const venta_importe_base_debito_fiscal = ventas[i].activa ? venta_subtotal : 0
                        cabecera.push(ventas[i].activa ? venta_subtotal : 0);
                        cabecera.push(ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento : 0 : 0);
                        cabecera.push(ventas[i].activa ? venta_importe_base_debito_fiscal : 0);
                        cabecera.push((ventas[i].activa ? venta_importe_base_debito_fiscal * 0.13 : 0));
                        cabecera.push(ventas[i].activa ? (ventas[i].codigo_control) ? ventas[i].codigo_control : "" : '0');
                        sumaImporte = (ventas[i].activa ? sumaImporte + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaImporte);
                        sumaImporteIce = (ventas[i].activa ? sumaImporteIce + ventas[i].total_ice : sumaImporteIce);;
                        sumaImporteExp = (ventas[i].activa ? sumaImporteExp + ventas[i].total_exento : sumaImporteExp);
                        sumaImporteGrab = 0;
                        sumaTotal = ventas[i].activa ? sumaTotal + (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) : sumaTotal;
                        sumaDescuentos = ventas[i].activa ? sumaDescuentos + ventas[i].total_descuento : sumaDescuentos;
                        sumaImporteBase = ventas[i].activa ? sumaImporteBase + venta_importe_base_debito_fiscal : sumaImporteBase;
                        sumaCredito = ventas[i].activa ? sumaCredito + venta_importe_base_debito_fiscal * 0.13 : sumaCredito;
                        data.push(cabecera);
                        if (i + 1 == ventas.length) {
                            const columns = [];
                            columns.push("");
                            columns.push("");
                            columns.push("");
                            columns.push("");
                            columns.push("");
                            columns.push("");
                            columns.push("TOTALES");
                            columns.push(Math.round((sumaImporte) * 100) / 100);
                            columns.push(Math.round((sumaImporteIce) * 100) / 100);
                            columns.push(Math.round((sumaImporteExp) * 100) / 100);
                            columns.push(Math.round((sumaImporteGrab) * 100) / 100);
                            columns.push(Math.round((sumaTotal) * 100) / 100);
                            columns.push(Math.round((sumaDescuentos) * 100) / 100);
                            columns.push(Math.round((sumaImporteBase) * 100) / 100);
                            columns.push(Math.round((sumaCredito) * 100) / 100);
                            data.push(columns);
                        }
                    }

                    const ws_name = "SheetJS";
                    const wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "LIBRO-VENTAS.xlsx");
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.generarTXTLibroVentasProformas = () => {
                blockUI.start();
                $scope.paginatorReporteFacturasProformas.filter = $scope.filtroFacturasProformas;
                const directionTemp = $scope.paginatorReporteFacturasProformas.direction;
                $scope.paginatorReporteFacturasProformas.direction = 'asc'
                const promesa = ObtenerFacturasProformas($scope.paginatorReporteFacturasProformas, $scope.usuario.id_empresa, true);
                promesa.then((datos) => {
                    $scope.paginatorReporteFacturasProformas.direction = directionTemp;
                    const ventas = datos.facturas;
                    let linea = "";
                    for (let i = 0; i < ventas.length; i++) {
                        ventas[i].fecha = new Date(ventas[i].fecha_factura);
                        ventas[i].activa = (ventas[i].id_cliente !== 'Anulada')
                        ventas[i].total_ice = 0;
                        ventas[i].importe = ventas[i].totalImporteBs;
                        ventas[i].total_descuento = 0;
                        ventas[i].total_exento = 0;
                        linea = linea + (ventas[i].fecha.getDate() + "/" + (ventas[i].fecha.getMonth() + 1) + "/" + ventas[i].fecha.getFullYear()) + "\|";
                        linea = linea + ventas[i].factura + "|";
                        linea = linea + (ventas[i].autorizacion) + "|";
                        linea = linea + (ventas[i].activa ? "V" : "A") + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.nit ? ventas[i].cliente.nit : '0' : '0' : '0') + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].cliente ? ventas[i].cliente.razon_social : 'Sin nombre' : 'ANULADO') + "|";
                        linea = linea + (ventas[i].activa ? (ventas[i].importe ? ventas[i].importe.toFixed(2) : '0.00') : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].total_ice ? ventas[i].total_ice.toFixed(2) : '0.00' : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].total_exento ? ventas[i].total_exento.toFixed(2) : '0.00' : '0.00') + "|";
                        linea = linea + 0 + "|";
                        const venta_importe_ICE_IE_HD_T = (ventas[i].total_ice ? ventas[i].total_ice : 0) + (ventas[i].total_exento ? ventas[i].total_exento : 0)
                        const venta_subtotal = (ventas[i].importe ? ventas[i].importe : ventas[i].total ? ventas[i].total : 0) + (ventas[i].total_recargo ? ventas[i].total_recargo : 0) - venta_importe_ICE_IE_HD_T
                        const venta_importe_base_debito_fiscal = (ventas[i].activa ? venta_subtotal - ventas[i].total_descuento : 0)
                        linea = linea + (ventas[i].activa ? venta_subtotal.toFixed(2) : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].total_descuento ? ventas[i].total_descuento.toFixed(2) : '0.00' : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? venta_importe_base_debito_fiscal.toFixed(2) : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? (venta_importe_base_debito_fiscal * 0.13).toFixed(2) : '0.00') + "|";
                        linea = linea + (ventas[i].activa ? ventas[i].codigo_control : 0);
                        if (i < (ventas.length - 1)) {
                            linea = linea + "\n"
                        }
                    }
                    const file = new Blob([linea.replace(/\n/g, "\r\n")], { type: 'text/plain' });
                    const mesReporte = $scope.filtroFacturasProformas.mes && $scope.filtroFacturasProformas.mes.id + 1 || new Date($scope.filtroFacturasProformas.fecha_factura_desde.split('/').reverse().join('-') + ' 12:00:00').getMonth() + 1
                    saveAs(file, "ventas_" + ('0' + mesReporte).slice(-2) + $scope.filtroFacturasProformas.anio.id + "_" + $scope.usuario.empresa.nit + ".txt");
                    blockUI.stop();
                }).catch((err) => {
                    blockUI.stop()
                    const msg = (err.stack !== undefined && err.stack !== null) ? err.message + ' Línea:' + err.lineNumber + '<br /> ' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                });
            }
            $scope.dibujarCabeceraPDFLibroFacturasProformas = (doc, datos, reporte, pagina) => {
                doc.font('Helvetica-Bold', 12);
                doc.text("LIBRO DE VENTAS IVA ESTÁNDAR", 0, 25, { align: "center" });
                doc.font('Helvetica-Bold', 8);
                doc.text("FOLIO " + pagina, 720, 25);
                doc.rect(40, 60, 720, 40).stroke();
                doc.text("PERIÓDO FISCAL : ", 65, 70);
                doc.text("NOMBRE O RAZÓN SOCIAL : ", 65, 85);
                doc.text("NIT : ", 440, 85);
                doc.font('Helvetica', 8);
                const anio = reporte.anio && reporte.anio.id || new Date(reporte.fecha_factura_desde.split('/').reverse().join('-') + ' 12:00:00').getFullYear()
                doc.text("AÑO " + anio, 140, 70);
                const mesReporte = reporte.mes && reporte.mes.id || new Date(reporte.fecha_factura_desde.split('/').reverse().join('-') + ' 12:00:00').getMonth()
                doc.text("MES " + $scope.meses[mesReporte].nombre.toUpperCase(), 200, 70);
                doc.text($scope.usuario.empresa.razon_social, 195, 85);
                doc.text($scope.usuario.empresa.nit, 460, 85);

                doc.rect(40, 100, 720, 60).stroke();
                doc.font('Helvetica-Bold', 6);
                doc.text("Nº", 45, 120);
                doc.text("Fecha de la Factura", 62, 120, { width: 40 });
                doc.text("Nº de la Factura", 100, 120, { width: 40 });
                doc.text("Nº Autorización", 130, 120, { width: 50 });
                doc.text("Estado", 184, 120, { width: 35 });
                doc.text("NIT / CI Cliente", 210, 120, { width: 50 });
                doc.text("Nombre o Razón Social", 260, 120);
                doc.text("Importe Total de la Venta", 370, 120, { width: 35 });
                doc.text("Importe ICE IE HD/T", 410, 120, { width: 35 });
                doc.text("Exp. y Op. exentas", 455, 120, { width: 42 });
                doc.text("Ventas grabadas a Tasa Cero", 497, 120, { width: 42 });
                doc.text("Subtotal", 544, 120, { width: 40 });
                doc.text("Desc., Bonif. y Rebajas", 575, 120, { width: 42 });
                doc.text("Importe Base para Débito Fiscal", 625, 120, { width: 35 });
                doc.text("Débito Fiscal I.V.A.", 660, 120, { width: 35 });
                doc.text("Código de Control", 700, 120);
            }
            $scope.abrirModalAsignarCuentaProforma = function (actividad, tipo) {
                $scope.actividadCuenta = ''
                $scope.actividadAsignacionCuenta = actividad
                $scope.tipoAsignacionCuenta = tipo
                switch ($scope.tipoAsignacionCuenta) {
                    case "cuentaIngreso":
                        $scope.actividadCuentaAnterior = actividad.cuenta
                        $scope.actividadCuenta = $scope.actividadAsignacionCuenta.id_cuenta ? $scope.actividadAsignacionCuenta.cuenta : $scope.actividadCuenta;
                        break;
                    case "cuentaCajaBanco":
                        $scope.actividadCuentaAnterior = actividad.cuentaCajaBanco
                        $scope.actividadCuenta = $scope.actividadAsignacionCuenta.id_cuenta_caja_banco ? $scope.actividadAsignacionCuenta.cuentaCajaBanco : $scope.actividadCuenta;

                        break;
                    default:
                        break;
                }
                $scope.abrirPopup($scope.IdModalAsignarCuentaProforma);
            }
            $scope.cerrarModalAsignarCuentaProforma = function () {
                switch ($scope.tipoAsignacionCuenta) {
                    case "cuentaIngreso":
                         $scope.actividadAsignacionCuenta.cuenta = $scope.actividadCuentaAnterior                    
                        break;
                    case "cuentaCajaBanco":
                        $scope.actividadAsignacionCuenta.cuentaCajaBanco = $scope.actividadCuentaAnterior 
                        break;
                    default:
                        break;
                }
                $scope.cerrarPopup($scope.IdModalAsignarCuentaProforma);
            }

            $scope.asignarCuentaProforma = function (evento) {
                switch ($scope.tipoAsignacionCuenta) {
                    case "cuentaIngreso":
                        $scope.actividadAsignacionCuenta.id_cuenta = evento.id
                        $scope.actividadAsignacionCuenta.cuenta = evento
                        break;
                    case "cuentaCajaBanco":
                        $scope.actividadAsignacionCuenta.id_cuenta_caja_banco = evento.id
                        $scope.actividadAsignacionCuenta.cuentaCajaBanco = evento

                        break;
                    default:
                        break;
                }
            }
            $scope.verificarAsignacionCuentaProforma = function (actividad) {
                if ($scope.actividadCuenta.id) {
                    const promesa = GuardarAsignarCuentaActividad(actividad)
                    promesa.then(dato => {
                        $scope.mostrarMensaje(dato.mensaje)
                        $scope.cerrarPopup($scope.IdModalAsignarCuentaProforma);
                    })
                }
            }
            $scope.buscarCuentasParaAsignarProforma = function (query, index) {

                var promesa = ListaCuentasParaAsignar($scope.usuario.id_empresa, query)
                var a = promesa.then(function (dato) {
                    if (dato.length == 1) {
                        $scope.actividadAsignacionCuenta.cuenta = dato[0]
                        $scope.asignarCuentaProforma(dato[0])
                        return []
                    } else {
                        return promesa
                    }

                })
                return a
            }
            $scope.generarComprobanteProformaFactura = function (tipo) {
                let fechaActual = new Date();
                let fechaCompro = new Date(convertirFechaProforma($scope.filtroGenComp.fecha_generacion_comprobante))
                switch (tipo) {
                    case "Vigente":                     
                        if (fechaCompro.getMonth() == fechaActual.getMonth()) {
                            $scope.crearNuevoComprobanteDesdeProforma('proforma',
                            "Registro de comprobante Diario desde proformas facturadas.",
                            "info")
                        } else {
                            $scope.crearNuevoComprobanteDesdeProforma('proforma',
                            "Registro de un comprobante antiguo desde proformas facturadas?",
                            "warning")
                        }
                        break;
                    case "Anulada":
                        if (fechaCompro.getMonth() == fechaActual.getMonth()) {                            
                            $scope.crearNuevoComprobanteDesdeProforma('proformaFactEliminada',
                            "Registro de comprobante diario con facturas anuladas desde proformas.",
                             'info')
                        } else {
                            $scope.crearNuevoComprobanteDesdeProforma('proformaFactEliminada',
                            "Registro de un comprobante antiguo desde proformas facturadas?",
                            "warning")
                        }
                        break;                    
                    case "Rectificar":
                        if (fechaCompro.getMonth() == fechaActual.getMonth()) {                            
                            $scope.crearNuevoComprobanteDesdeProforma('proformaFactEliminadaRectificacion',
                             'Registro de comprobante diario con facturas anuladas para rectificar desde proformas.',
                             "info")
                        } else {
                            $scope.crearNuevoComprobanteDesdeProforma('proformaFactEliminadaRectificacion',
                            'Registro de un comprobante antiguo con facturas anuladas para rectificar desde proformas?',
                            "warning")
                        }
                        break;
                    default:
                        break;
                }
            }

            $scope.crearNuevoComprobanteDesdeProforma=function(tipo,mensaje){
                SweetAlert.swal({
                    title: mensaje,
                    icon: "info",
                    showCloseButton: true,
                    html: '<h5>Generar el comprobante puede tardar unos minutos. se esta recuperando la información para generarlo.</h5>'
                })
                $scope.crearNuevoComprobante(tipo, $scope.listaProformaFacturaParaContabilizar)
            }
            $scope.abrirModalGenerarComprobante = function () {
                $scope.tiempoGC = new Date();
                $scope.intervalTiempoGC = $interval(function () {
                    $scope.tiempoGC = new Date();
                }, 1000);
                $scope.filtroGenComp = {
                    fecha_generacion_comprobante: moment(new Date()).format('DD/MM/YYYY HH:mm'),
                    estado: $scope.estadosFacturaProformaFiltro.find(function (x) {
                        return x.id == 1
                    })
                }
                $scope.obtenerfacturasPendienteDeContabilizar()
                $scope.obtenerCierreMesProformaCompGen()
                $scope.abrirPopup($scope.IdModalGenerarComprobante);
            }
            $scope.cerrarModalGenerarComprobante = function () {
                $interval.cancel($scope.intervalTiempoGC);
                $scope.cerrarPopup($scope.IdModalGenerarComprobante);
            }
            $scope.obtenerfacturasPendienteDeContabilizar = function () {
                const fechaBusqueda = new Date(convertirFechaProforma($scope.filtroGenComp.fecha_generacion_comprobante))
                const promesa = ObtenerfacturasPendienteDeContabilizar($scope.usuario.id_empresa, fechaBusqueda, $scope.filtroGenComp.estado.id)
                promesa.then(function (data) {
                    $scope.listaProformaFacturaParaContabilizar = data.facturas
                })
            }

            /* cierre mes */
            $scope.obtenerCierreMesProforma = function () {
                if (!$scope.filtro.mes || !$scope.filtro.anio) { return  }
                const promesa = ObtenerCierreMesProforma($scope.filtro)
                promesa.then(function (dato) {
                    $scope.datoMesCierre = dato.cierreMes
                    $scope.cierreMes = $scope.datoMesCierre ? true : false
                })
            }
            $scope.obtenerCierreMesProformaCompGen = function () {
                const fechaBusqueda = new Date(convertirFechaProforma($scope.filtroGenComp.fecha_generacion_comprobante))
                const filtro = { mes: { id: fechaBusqueda.getMonth() + 1 }, anio: { id: fechaBusqueda.getFullYear() } }
                const promesa = ObtenerCierreMesProforma(filtro)
                promesa.then(function (dato) {
                    $scope.datoMesCierreComGen = dato.cierreMes
                })
            }
            $scope.guardarCierreMesProforma = function () {
                const datos = { fecha: new Date(), id_usuario: $scope.usuario.id }
                const promesa = GuardarCierreMesProforma($scope.filtro, datos)
                promesa.then(function (dato) {
                    $scope.obtenerCierreMesProforma()
                    res.JSON(dato.mensaje)
                })
            }
            $scope.abrirModalVerificarCuenta = function (tipo) {
                $scope.tipoVerificacion = tipo
                $scope.abrirPopup($scope.IdModalVerificarCuenta);
            }
            $scope.cerrarModalVerificarCuenta = function () {
                $scope.cerrarPopup($scope.IdModalVerificarCuenta);
            }
            $scope.verificarCuentaAdmin = function (cuenta) {
                const promesa = VerificarUsuarioEmpresa($scope.usuario.id_empresa, cuenta)
                promesa.then(function (dato) {
                    console.log(dato)
                    if (dato.type) {
                        switch ($scope.tipoVerificacion) {
                            case 'cierre-mes':
                                $scope.guardarCierreMesProforma()
                                break;

                            default:
                                break;
                        }
                        $scope.cerrarModalVerificarCuenta();
                    } else {
                        SweetAlert.swal("", dato.message, "warning");
                    }
                })
            }
            $scope.anularProformaFactura = (proforma) => {
                $scope.observacionAnulacion = '';
                SweetAlert.swal({
                    title: 'CONFIRME',
                    html: `<div><p>Para anular la proforma debe proveer un motivo.</p></div>`,
                    icon: 'warning',
                    input: 'textarea',
                    inputPlaceholder: 'Escriba el motivo de la anulación...',
                    inputAttributes: {
                        'rows': 2,
                        'maxlength': 140,
                        'minlength': 9,
                        'resize': 'none'
                    },
                    inputValidator: (value) =>{
                        if(!value) return 'La observación es obligatoria'
                        if(value.length<9) return 'La observación debe tener al menos 9 caracteres'
                        if(value.length > 140) return 'La observación no debe tener más de 140 caracteres'
                    },
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Anular',
                    cancelButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        proforma.observacion = result.value;
                        ProformaEliminar(proforma)
                        .then(res => {
                            if (!res.hasErr) {
                                proforma.eliminado = true;
                                $scope.calcularTotalProformas();
                            } else {
                                if(res.factura){
                                    SweetAlert.swal({
                                        html: res.mensaje,
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: 'No',
                                        showLoaderOnConfirm: true
                                    })
                                    .then(result=>{
                                        if(result.isConfirmed){
                                            FacturaProformaEliminar(proforma)
                                            .then((res) => {
                                                if (res.hasErr || res.err){
                                                    proforma.eliminado = true;
                                                    proforma.observacion = "";
                                                    SweetAlert.swal("", res.mensaje, "error");
                                                    return;
                                                }else{
                                                    SweetAlert.swal("", res.mensaje, "success");
                                                    proforma.fecha_factura = null;
                                                    proforma.factura = null;
                                                    proforma.autorizacion = null;
                                                    $scope.dataParam = undefined;
                                                }
                                            })
                                            .catch((err) => {
                                                $scope.dataParam = undefined
                                                const msg = (err.stack !== undefined && err.stack !== null) ? err.data + '<br />' + err.stack : (err.data !== undefined && err.data !== null) ? err.data : 'Se perdió la conexión.'
                                                SweetAlert.swal("", msg, "warning");
                                            })
                                        }
                                    })
                                }else{
                                    SweetAlert.swal("", res.mensaje, "warning");
                                }
                            }
                        })
                        .catch(err => {
                            blockUI.stop();
                            const msg = (err.stack !== undefined && err.stack !== null) ? err.message + '<br />' + err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.';
                            SweetAlert.swal("", msg, "warning");
                        })
                    }
                })
            }
            $scope.deleteDetalleProforma = function (detalle) {
                SweetAlert.swal({
                    title: "¿Esta seguro de eliminar este detalle?",
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result.isConfirmed) {
                        $scope.eliminarDetalleProforma(detalle);
                        $scope.getTotalesDetalleProforma();
                    }
                });
            }
            $scope.getTotalesDetalleProforma = () =>{
                if($scope.detallesProformas.length > 0){
                    $scope.proforma.totalImporteBs = $scope.detallesProformas.reduce((arr, val)=> arr+=!val.eliminado ? val.importe : 0 , 0);
                    $scope.proforma.totalImporteSus = $scope.detallesProformas.reduce((arr, val)=> arr+=!val.eliminado ? val.importeSus : 0 , 0);
                }else{
                    $scope.proforma.totalImporteBs = 0
                    $scope.proforma.totalImporteSus = 0
                }
                if($scope.proforma.detalle){
                    let texto = $scope.proforma.detalle.split('($us.')
                    if(texto[0]){
                        $scope.proforma.detalle = $scope.proforma.totalImporteSus > 0 ? texto[0] +' '+ '  ($us.'+$scope.proforma.totalImporteSus.toFixed(2)+' X Bs.'+$scope.proforma.cambio_dolar+').' : texto[0];
                    }else{
                        $scope.proforma.detalle = $scope.proforma.totalImporteSus > 0 ? '  ($us.'+$scope.proforma.totalImporteSus.toFixed(2)+' X Bs.'+$scope.proforma.cambio_dolar+').' : '';
                    }
                    console.log(texto);
                }else{
                    $scope.proforma.detalle = $scope.proforma.totalImporteSus > 0 ? '  ($us.'+$scope.proforma.totalImporteSus.toFixed(2)+' X Bs.'+$scope.proforma.cambio_dolar+').' : '';
                }
                $scope.proforma.importeLiteral = ConvertirALiteral($scope.proforma.totalImporteBs.toFixed(2));
            }
            /* fin cierre */
            $scope.capitalizarTexto = function (texto) {
                texto = texto.toLowerCase();
                texto = texto.split(" ");
                for (var i = 0, x = texto.length; i < x; i++) {
                    texto[i] = texto[i][0].toUpperCase() + texto[i].substr(1);
                }
                return texto.join(" ");
            }
            $scope.inicio()
        }])
