angular.module('agil.controladores')
    .controller('ControladorReporteRendicionCajaChica', ['$scope', '$localStorage', '$location', 'blockUI', 'obtenerRendicionesCajaChica', function ($scope, $localStorage, $location, blockUI, obtenerRendicionesCajaChica) {
        blockUI.start();

        // $scope.idModalWizardBancoEdicion = 'modal-wizard-banco';

        $scope.usuario = JSON.parse($localStorage.usuario);

        $scope.inicio = function () {
            // $scope.paginadorBancos($scope.usuario.id_empresa)
        }

        $scope.$on('$viewContentLoaded', () => {
            resaltarPestaña($location.path().substring(1));
            // ejecutarScriptsBanco($scope.idModalWizardBancoEdicion,
            //     $scope.idModalContenedorBancoEdicion,
            //     $scope.idModalWizardBancoVista,
            //     $scope.idModalContenedorBancoVista,
            //     $scope.idModalEliminarBanco);
            $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        });

        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        $scope.generarExcelReporteRendicionCajaChica = (parametrosBusqueda) => {
            let desde = new Date(parametrosBusqueda.desde.split('/').reverse().join('-'))
            desde.setHours(desde.getHours() + 4)
            desde.setHours(0, 0, 0, 0)
            let hasta = new Date(parametrosBusqueda.hasta.split('/').reverse().join('-'))
            hasta.setHours(hasta.getHours() + 4)
            hasta.setHours(23, 59, 59, 99)
            let informacionRencicion = obtenerRendicionesCajaChica($scope.usuario.id_empresa, desde.getTime(), hasta.getTime())
            informacionRencicion.then((res) => {
                if (res.hasErr) {
                    $scope.mostrarMensaje(res.mensaje)
                    return
                }
                var cabecera = ['Beneficiario', 'Autorizador','Rendición', 'Tipo Gasto', 'Km Recorrido', 'Gasto Km', 'Fecha Doc', 'Nro.', 'Nro. Doc', 'FONDO A RENDIR', 'Conductor', 'Placa', 'Tipo', 'Gasto', 'Fecha Gasto', 'Nro Fact. Rec.', 'Detalle', 'Monto', 'Área', 'Centro C1', 'Centro C2', 'Centro C3', 'Centro C4']
                var data = [cabecera]
                console.log(res);
                var totalGastosPropios = 0;
                for (var index = 0; index < res.lista.length; index++) {
                    // var columns = []
                    let fecha_doc = new Date(res.lista[index].fecha).toLocaleDateString('en-US').trim()// + ' ' + new Date(res.lista[index].fecha).toTimeString('en-US').trim();
                    for (let jindex = 0; jindex < res.lista[index].gastos.length; jindex++) {
                        if(res.lista[index].gastos[jindex].gasto.id_nivel == 1){
                            totalGastosPropios += res.lista[index].gastos[jindex].monto;
                        }
                        console.log(res.lista[index]);
                        var columns = []
                        //datos de la cabecera (se repite por cada linea de gasto que tuviera esta rendición)
                        //console.log(res.lista[index].solicitud.solicitante);
                        columns.push(res.lista[index].solicitud != null ? res.lista[index].solicitud.solicitante.persona.nombre_completo : 'Sin Beneficiario' ) //Beneficiario
                        columns.push((res.lista[index].solicitud != null ? res.lista[index].solicitud.autorizador.persona.nombre_completo : 'Sin Autorizador')) //Autorizador
                        columns.push((res.lista[index] ? res.lista[index].rendicion ? res.lista[index].rendicion.nombre ? res.lista[index].rendicion.nombre : 'xxxx' : 'xxxx' : 'xxxx'))// Rendición
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].gasto.nivel.nombre : '')) //Tipo gasto
                        if(res.lista[index].odometro_salida == null || res.lista[index].odometro_entrada == null){
                            columns.push( ''); //Km Recorrido
                        }else{
                            columns.push(res.lista[index].odometro_entrada - res.lista[index].odometro_salida); //Km Recorrido 
                        }
                        var gPropios = res.lista[index].gastos.reduce(function(gastosPropios, gasto){
                            if(gasto.gasto.id_nivel == 1){
                                return gastosPropios + gasto.monto;
                            }else{
                                return gastosPropios;
                            }
                        },0);
                        var gastoKm=gPropios / (res.lista[index].odometro_entrada - res.lista[index].odometro_salida);
                        if(gastoKm != Infinity){
                            columns.push(round(gastoKm,2));//Gasto Km
                        }else{
                            columns.push('');//Gasto Km 
                        }
                        columns.push((res.lista[index] ? fecha_doc ? fecha_doc : 'xxxx' : 'xxxx'))//Fecha Doc
                        columns.push((res.lista[index] ? res.lista[index].numero_correlativo ? res.lista[index].numero_correlativo : 'xxxx' : 'xxxx'))//Nro.
                        columns.push((res.lista[index] ? res.lista[index].solicitud ? res.lista[index].solicitud.cajasChicas.length > 0 ? res.lista[index].solicitud.cajasChicas[0].numero_correlativo : 'xxxx' : 'xxxx' : 'xxxx'))//Nro. Doc //nro correlativo cajachica
                        columns.push((res.lista[index] ? res.lista[index].total ? res.lista[index].total : 'xxxx' : 'xxxx'))//FONDO A RENDIR
                        columns.push((res.lista[index] ? res.lista[index].conductor ? res.lista[index].conductor.nombre ? res.lista[index].conductor.nombre : 'xxxx' : 'xxxx' : 'xxxx'))//CONDUCTOR
                        columns.push((res.lista[index] ? res.lista[index].vehiculo ? res.lista[index].vehiculo.nombre ? res.lista[index].vehiculo.nombre : 'xxxx' : 'xxxx' : 'xxxx')) //PLACA
                        columns.push((res.lista[index] ? res.lista[index].rendicion ? res.lista[index].rendicion.nombre ? res.lista[index].rendicion.nombre : 'xxxx' : 'xxxx' : 'xxxx')) //TIPO

                        //fin datos cabecera
                        //inicio datos de gastos de rendición (una por linea, acompañada de datos de la cabecera.)
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].gasto ? res.lista[index].gastos[jindex].gasto.nombre : 'xxxx' : 'xxxx'))//Gasto
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].fecha ? new Date(res.lista[index].gastos[jindex].fecha).toLocaleDateString('es-BO').trim() : 'xxxx' : 'xxxx'))//Fecha gasto
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].numero_factura_recargo ? res.lista[index].gastos[jindex].numero_factura_recargo : 'xxxx' : 'xxxx'))//Nro fact.
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].detalle ? res.lista[index].gastos[jindex].detalle : 'xxxx' : 'xxxx'))//Detalle
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].monto ? res.lista[index].gastos[jindex].monto : 'xxxx' : 'xxxx'))//Monto
                        columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].area ? res.lista[index].gastos[jindex].area.nombre ? res.lista[index].gastos[jindex].area.nombre : 'xxxx' : 'xxxx' : 'xxxx'))//Area
                        if (res.lista[index].gastos[jindex].datosCentrosCosto) {
                            for (let tindex = 0; tindex < res.lista[index].gastos[jindex].datosCentrosCosto.length; tindex++) {
                                columns.push((res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex] ? res.lista[index].gastos[jindex].datosCentrosCosto[tindex] ? res.lista[index].gastos[jindex].datosCentrosCosto[tindex].centro_costo ? res.lista[index].gastos[jindex].datosCentrosCosto[tindex].centro_costo.nombre : 'xxxx' : 'xxxx' : 'xxxx' : 'xxxx'))//Centro c1
                            }
                            let arreglo = []
                            for (let pindex = 0; pindex < cabecera.length; pindex++) {
                                arreglo.push(columns[pindex])

                            }
                            data.push(arreglo)
                        } else {
                            let arreglo = []
                            for (let pindex = 0; pindex < cabecera.length; pindex++) {
                                arreglo.push(columns[pindex])

                            }
                            data.push(arreglo)
                        }

                    }
                    // data.push(columns)
                }
                var ws_name = "SheetJS";
                var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
                var wscols = [
                    { wch: 25 },//beneficiario
                    { wch: 25 },// autorizador
                    { wch: 10 },//rendicion
                    { wch: 10 },//fecha doc
                    { wch: 10 },//nro
                    { wch: 8 },//nro doc
                    { wch: 15 },//fondo a rendir
                    { wch: 15 },//conductor
                    { wch: 25 },//placa
                    { wch: 25 },//tipo
                    { wch: 25 },//gasto
                    { wch: 10 },//fecha gasto
                    { wch: 15 },//nro fac
                    { wch: 25 },//detalle
                    { wch: 10 },//monto
                    { wch: 15 },//area
                    { wch: 15 },//c1
                    { wch: 15 },//c2
                    { wch: 15 },//c3
                    { wch: 15 },//c4
                ];
                ws['!cols'] = wscols;
                ws['!rows'] = [{ hpx: 28, level: 3 }];
                // ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, { s: { r: 1, c: 4 }, e: { r: 1, c: 4 } }, { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, { s: { r: (3 + data.length), c: 0 }, e: { r: (3 + data.length), c: 1 } }]
                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Rendiciones Caja Chica.xlsx');
            }).catch(function (err) {
                var msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                $scope.mostrarMensaje(msg)
                blockUI.stop()
            })
        }
        // $scope.cerrarPopPupVista = function () {
        //     $scope.cerrarPopup($scope.idModalWizardBancoVista);
        // }

        // $scope.modificarBanco = function (banco) {
        //     $scope.banco = banco;
        //     $scope.abrirPopup($scope.idModalWizardBancoEdicion);
        // }

        $scope.$on('$routeChangeStart', function (next, current) {
            // $scope.eliminarPopup($scope.idModalWizardBancoEdicion);
            // $scope.eliminarPopup($scope.idModalWizardBancoVista);
            // $scope.eliminarPopup($scope.idModalEliminarBanco);
        });

        $scope.verificarPulso = function (evento, textoBusqueda) {
            if (evento.keyCode === 13) { //enter pressed
                $scope.buscarBancos(1, $scope.itemsPorPagina, textoBusqueda);
            }
        }
        $scope.inicio();
    }]);
