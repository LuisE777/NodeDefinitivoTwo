angular.module('agil.controladores')

    .controller('controladoEvolucionPatrimonioNeto', function ($scope, $timeout, $localStorage, $filter, $location, blockUI,
        ClasesTipoEmpresa, ClasesTipo, ObtenerConfiguracionImpresion, ObtenerGestionesEEFF, ObtenerCuentasPatrimoniales, SweetAlert) {

        $scope.usuario = JSON.parse($localStorage.usuario);
        $scope.imagenEmpresa;

        $scope.$on('$viewContentLoaded', function () {

        });

        $scope.$on('$routeChangeStart', function (next, current) {

        });

        // var pormimg = ObtenerImagen($scope.usuarioSesion.empresa.imagen)
			// 	pormimg.then(function (img) {
			// 		$scope.usuarioSesion.empresa.imagen = img
			// 	})

        $scope.usuario = JSON.parse($localStorage.usuario);

        $scope.inicio = function () {
            $scope.obtenerTiposPeriodos()
            $scope.obtenerGestiones()
            $scope.obtenerTiposCuenta()
            $scope.obtenerConfiguracionImpresion()
            $scope.obtenerGestionesImpresion()
        }


        $scope.$on('$viewContentLoaded', function () {
            resaltarPestaña($location.path().substring(1));
            $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
            blockUI.stop();
        });

        $scope.obtenerTiposPeriodos = function () {
            blockUI.start();
            var promesa = ClasesTipoEmpresa("EEFF_TP", $scope.usuario.id_empresa);
            promesa.then(function (entidad) {
                $scope.TiposPeriodos = entidad
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
        $scope.obtenerConfiguracionImpresion = function () {
            var promesa = ObtenerConfiguracionImpresion($scope.usuario.id_empresa)
            promesa.then(function (dato) {
                $scope.configuracionImpresion = dato
                $scope.configuracionImpresion.bimonetario = false
                $scope.configuracionImpresion.tioPeriodo = ""
                $scope.configuracionImpresion.gestion = ""
                $scope.configuracionImpresion.gestion_fin = ""
                $scope.configuracionImpresion.mes = ""
                $scope.configuracionImpresion.fecha_inicio = null
                $scope.configuracionImpresion.fecha_fin = null
                blockUI.stop()
            })
        }
        $scope.cargarFechasFiltro = function (filtro) {
            if (filtro == 'FECHAS') {
                setTimeout(function () {
                    aplicarDatePickers();
                }, 300);
            }
        }
        $scope.obtenerTiposCuenta = function () {
            blockUI.start();
            var promesa = ClasesTipoEmpresa("TCC", $scope.usuario.id_empresa);
            promesa.then(function (entidad) {
                $scope.cuentaTipos = [{ id: 0, nombre: "PREESTABLECIDO" }]
                $scope.cuentaTipos = $scope.cuentaTipos.concat(entidad.clases);
                blockUI.stop();
            });
        }
        $scope.obtenerGestionesImpresion = function () {
            blockUI.start()
            $scope.gestionesEF = []
            var promesa = ObtenerGestionesEEFF($scope.usuario.id_empresa)
            promesa.then(function (datos) {
                blockUI.stop();
                datos.forEach(function (dato) {
                    if (dato.habilitado) {
                        $scope.fechasImpresion = dato
                    }
                })
            })
        }
        //EMPRESA COMERCIALES
        $scope.generarEstadoPdf = async (gestion)=>{
            await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenLg) {
                $scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion;
                await ObtenerCuentasPatrimoniales($scope.configuracionImpresion, $scope.usuario.id_empresa)
                .then(result => {
                    if(!result.hasError){
                        var registros = result.data;
                        var doc = new PDFDocument({compress: false, layout: 'landscape', size: 'letter', margin: 10 });
                        var stream = doc.pipe(blobStream());
                        var pagina = 1, y = 200, x = 50, dis = 672, w = 70, ancho;
                        let inicio = $scope.fechasImpresion.inicio.split('/');
                        let fin = $scope.fechasImpresion.fin.split('/');
                        let fechaInicio = new Date(Date.UTC(Number(gestion.nombre), Number(inicio[1]) - 1, Number(inicio[0]) + 1, 0, 0, 0))
                        let fechaFin = new Date(Date.UTC(Number(gestion.nombre), Number(fin[1])-1, Number(fin[0])+1, 0, 0, 0))
                        var fechaLargaInicio = fechaInicio.toLocaleDateString("es-ES", {year: 'numeric', month: 'long', day: 'numeric'})
                        var fechaLargaFin = fechaFin.toLocaleDateString("es-ES", {year: 'numeric', month: 'long', day: 'numeric'})
                        $scope.dibujarCabeceraPdfEvolucionPatrimonial(doc, pagina, imagenLg, registros[0], fechaLargaFin);
                        registros.shift();
                        for (let i = 0; i < registros.length; i++) {
                            var registro =  registros[i];
                            ancho = dis - (70 * (registros[0].length - 2))
                            for (let j = 0; j < registro.length; j++) {
                                if(j == 0){
                                    doc.font('Helvetica', 9);
                                    i == 0 ? doc.text(registro[j] + fechaLargaInicio, x, y, { width: ancho}) : 
                                    i == registros.length - 1 
                                    ? doc.font('Helvetica-Bold', 9).text(registro[j] + fechaLargaFin, x, y, { width: ancho}) 
                                    : doc.text(registro[j].charAt(0).toUpperCase() + registro[j].slice(1).toLowerCase() , x, y, { width: ancho});
                                    
                                }else{
                                    i === registros.length -1 ? doc.font('Helvetica-Bold', 9) :  doc.font('Helvetica', 9)
                                    if(registro[j]){
                                        x = 50
                                        doc.text( registro[j] >= 0 ? number_format_negativo_to_positvo(registro[j].toFixed(2), 2) : '-' + number_format_negativo_to_positvo(registro[j].toFixed(2), 2), ancho, y, {width: w - 5, align : 'right'})
                                    }
                                    ancho +=w;
                                }
                            }
                            y += 15;
                        }
                        $scope.dibujarFirmas(doc);
                        blockUI.stop();
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                    }else{
				        SweetAlert.swal("", result.message, "warning");
                    }
                })
            });
        }
        $scope.dibujarCabeceraPdfEvolucionPatrimonial = (doc, pagina, logo, cuentas, fechaLarga) =>{
            var y = 55, x = 50, dis = 742, w = 70;
            if(logo != 'error'){
				doc.image(logo, x, y, {width:70, height: y });
                x = 125
            }
            doc.font('Helvetica-Bold', 10).text($scope.usuario.empresa.razon_social ? $scope.usuario.empresa.razon_social.toUpperCase() : '', x, y); y+=10;
            doc.font('Helvetica', 9).text($scope.usuario.empresa.nit, x, y); y+= 10;
            doc.text($scope.usuario.empresa.direccion, x, y); y+=10;
            doc.text($scope.usuario.empresa ? $scope.usuario.empresa.departamento ?  $scope.usuario.empresa.departamento.nombre.charAt(0).toUpperCase()+$scope.usuario.empresa.departamento.nombre.slice(1).toLowerCase() +'-Bolivia' : 'Bolivia' : 'Bolivia', x, y); y+=30;
            doc.font('Helvetica-Bold', 12).text('ESTADO DE EVOLUCIÓN DEL PATRIMONIO NETO', 0, y, {align:'center'}); y+= 12;
            doc.font('Helvetica', 9).text('Por el ejercicio terminado el '+ fechaLarga, 0, y, {align:'center'}); y+= 12;
            doc.font('Helvetica', 9).text('(Expresado en Bolivianos)', 0, y, {align:'center'}); y+= 25;
            console.log('cuentas cabecera', cuentas);
            for (let i = cuentas.length - 1; i >= 0; i--) {
                dis-=w;
                doc.font('Helvetica-Bold', 9).text(cuentas[i], dis, y, {width: w, align:'center'});  
            }
        }
        $scope.dibujarFirmas = (doc) =>{
            doc.font('Helvetica', 8);
            if ($scope.configuracionImpresion.usar_firma_uno) {
                doc.text('---------------------------------------------------------', 0, 563, {width: 396, align:'center'})
                doc.text($scope.configuracionImpresion.firma_uno.toUpperCase(), 0, 570, { width: 396, align: 'center'});
                doc.text($scope.configuracionImpresion.cargo_uno, 0, 580, { width: 396, align: 'center'});
            }
            if ($scope.configuracionImpresion.usar_firma_dos) {
                doc.text('---------------------------------------------------------', 396, 563, {width: 396, align:'center'})
                doc.text($scope.configuracionImpresion.firma_dos.toUpperCase(), 396, 570, { width: 396, align: 'center'});
                doc.text($scope.configuracionImpresion.cargo_dos, 396, 580, { width: 396, align: 'center'});
            }
        }
        $scope.inicio()
    });