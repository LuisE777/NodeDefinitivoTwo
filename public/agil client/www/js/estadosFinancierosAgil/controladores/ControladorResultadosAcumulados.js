angular.module('agil.controladores')

	.controller('controladorResultadosAcumulados', function ($scope, $localStorage, $location, $filter, $templateCache, $route, blockUI,
		ClasesTipoEmpresa, ClasesTipo, ObtenerConfiguracionImpresion, CuentasContabilidadEEFF, ObtenerGestionesEEFF, Paginator, CuentaContabilidad, CuentaResultadosAcumulados, SweetAlert) {


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
			var promesa = ClasesTipo("EEFF_TP");
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
				$scope.configuracionImpresion.bimonetario = true
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
			var promesa = ClasesTipo("TCC");
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
		$scope.GenerarResultadosAcumuladosPdf = function (gestion) {
			// blockUI.start();
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentaResultadosAcumulados($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(async function (result) {
				var x = ($scope.configuracionImpresion.bimonetario) ? 400 : 530
				if(!result.hasError){
					await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenLg) {
						let doc = new PDFDocument({ size: 'letter', margin: 10 });
						let stream = doc.pipe(blobStream());
						var datos = result.data
						let y = 150, itemsPorPagina = 27, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
						var totalGeneral = 0, totalGeneralSus = 0;
						let inicio = $scope.fechasImpresion.inicio.split('/');
                        let fin = $scope.fechasImpresion.fin.split('/');
                        let fechaInicio = new Date(Date.UTC(Number(gestion.nombre), Number(inicio[1]) - 1, Number(inicio[0]) + 1, 0, 0, 0))
                        let fechaFin = new Date(Date.UTC(Number(gestion.nombre), Number(fin[1])-1, Number(fin[0])+1, 0, 0, 0))
                        var fechaLargaInicio = fechaInicio.toLocaleDateString("es-ES", {year: 'numeric', month: 'long', day: 'numeric'})
                        var fechaLargaFin = fechaFin.toLocaleDateString("es-ES", {year: 'numeric', month: 'long', day: 'numeric'})
						$scope.dibujarCabeceraPDFResultadosAcumulados(doc, pagina, totalPaginas, imagenLg);
						doc.font('Helvetica', 9);
						for (let i = 0; i < datos.length; i++) {
							var reg = datos[i]
							var saldo_bs = Number((reg.haber_bs - reg.debe_bs).toFixed(2))
							var saldo_sus = Number((reg.haber_sus - reg.debe_sus).toFixed(2))
							totalGeneral += saldo_bs;
							totalGeneralSus += saldo_sus
							if(i == 0){
								doc.text('Saldo al ' + fechaLargaInicio, 50, y, { width: 345})
								doc.text(saldo_bs >= 0 ? number_format_negativo_to_positvo(saldo_bs, 2) : '-'+number_format_negativo_to_positvo(saldo_bs, 2), x, y, {width: 65, align: 'right'})
								if($scope.configuracionImpresion.bimonetario) doc.text(saldo_sus >= 0 ? number_format_negativo_to_positvo( saldo_sus, 2) : '-'+number_format_negativo_to_positvo(saldo_sus, 2), x + 80, y, {width: 65, align: 'right'})
								 y += 14;
							}else{
								doc.text(reg.glosa.charAt(0).toUpperCase() + reg.glosa.slice(1).toLowerCase() , 50, y,{width: 345})
								doc.text(saldo_bs >= 0 ? number_format_negativo_to_positvo( saldo_bs, 2) : '-'+number_format_negativo_to_positvo(saldo_bs , 2), x, y, {width: 65, align: 'right'})
								if($scope.configuracionImpresion.bimonetario) doc.text(saldo_sus >= 0 ? number_format_negativo_to_positvo( saldo_sus, 2) : '-'+number_format_negativo_to_positvo(saldo_sus , 2), x + 80, y, {width: 65, align: 'right'})	
								y += 14;
							}						
						}
						doc.font('Helvetica-Bold', 9).text('Saldo al ' + fechaLargaFin, 50, y,{width: 345})
						doc.text(totalGeneral >= 0 ? number_format_negativo_to_positvo( totalGeneral, 2) : '-'+number_format_negativo_to_positvo(totalGeneral , 2), x, y, {width: 65, align: 'right'})
						if($scope.configuracionImpresion.bimonetario) doc.text(totalGeneralSus >= 0 ? number_format_negativo_to_positvo( totalGeneralSus, 2) : '-'+number_format_negativo_to_positvo(totalGeneralSus , 2), x + 80, y, {width: 65, align: 'right'})	

						$scope.dibujarFirmas(doc)
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							window.open(fileURL, '_blank', 'location=no');
						});
						blockUI.stop();
					})
				}else{
					SweetAlert.swal("", result.message, "warning");
				}
				blockUI.stop();

			})
		}
		$scope.obtenerXlsResultadosAcumulados = function () {
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentaResultadosAcumulados($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (dato) {
				var x = ($scope.configuracionImpresion.bimonetario) ? 400 : 530
				$scope.generarXlsResultadosAcumulados(dato, x)
				blockUI.stop();

			})
		}
		$scope.obtenerCuentaResutaldoGestion = function (dato) {
			let cuentaResutaldoGestion = { nombre: "Resultado De La Gestión", total: 0, total_sus: 0 }
			for (var i = 0; i < dato.cuentasGrupoEERR.length; i++) {
				cuentaGrupo = dato.cuentasGrupoEERR[i]
				cuentaGrupo.total = 0
				cuentaGrupo.total_sus = 0
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoEERR.length; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoEERR[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0

							for (var k = 0; k < dato.cuentasGenericaEERR.length; k++) {
								cuentaGenerica = dato.cuentasGenericaEERR[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									for (var l = 0; l < dato.cuentasIngresoGastoEERR.length; l++) {
										cuentasApropiacion = dato.cuentasIngresoGastoEERR[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											cuentaGrupo.total += cuentasApropiacion.saldo
											cuentaGrupo.total_sus += cuentasApropiacion.saldo_sus
										}
									}
								}
							}

						}
					}
					if (cuentaGrupo.nombre == "INGRESO") {
						if (cuentaGrupo.total < 0) {
							cuentaGrupo.total = cuentaGrupo.total * (-1)
						} if (cuentaGrupo.total_sus < 0) {
							cuentaGrupo.total_sus = cuentaGrupo.total_sus * (-1)
						}
						cuentaResutaldoGestion.total = cuentaResutaldoGestion.total + cuentaGrupo.total
						cuentaResutaldoGestion.total_sus = cuentaResutaldoGestion.total_sus + cuentaGrupo.total_sus

					} else if (cuentaGrupo.nombre == "GASTOS") {
						if (cuentaGrupo.total < 0) {
							cuentaGrupo.total = cuentaGrupo.total * (-1)
						}
						if (cuentaGrupo.total_sus < 0) {
							cuentaGrupo.total_sus = cuentaGrupo.total_sus * (-1)
						}
						cuentaResutaldoGestion.total = cuentaResutaldoGestion.total - cuentaGrupo.total
						cuentaResutaldoGestion.total_sus = cuentaResutaldoGestion.total_sus - cuentaGrupo.total_sus
					}
				}
			}
			return cuentaResutaldoGestion
		}
		$scope.generarXlsResultadosAcumulados = function (dato, x) {
			blockUI.start();
			// Falta trabajar binometario
			var data = [["N°", "Cuenta", "Debe", "Haber", "Deudor", "Acreedor"]]
			for (var i = 0; i < dato.cuentas.length; i++) {
				var columns = [];
				columns.push(i + 1);
				columns.push(dato.cuentas[i].cuenta.nombre);
				columns.push(dato.cuentas[i].debe_bs);
				columns.push(dato.cuentas[i].haber_bs);
				if (dato.cuentas[i].debe_bs >= dato.cuentas[i].haber_bs) {
					columns.push(dato.cuentas[i].debe_bs - dato.cuentas[i].haber_bs);
					columns.push("");
				} else {
					columns.push("");
					columns.push(dato.cuentas[i].haber_bs - dato.cuentas[i].debe_bs);
				}
				data.push(columns);
			}

			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "Balance de Comprobacion de Sumas y Saldos.xlsx");
			blockUI.stop();
		}
		$scope.dibujarCabeceraPDFResultadosAcumulados = function (doc, pagina, totalPaginas, logo) {
			var y = 30, x = 50
            if(logo != 'error'){
				doc.image(logo, x, y, {width:70, height: y+15 });
                x = 125
            }
			doc.font('Helvetica-Bold', 10);
			doc.text($scope.usuario.empresa.razon_social, x, y); y+= 10
			doc.font('Helvetica', 9);
			doc.text($scope.usuario.empresa.direccion, x, y); y+=10
			doc.text("NIT: ", x, y);
			doc.text($scope.usuario.empresa.nit, x + 20, y); y+=10
            doc.text($scope.usuario.empresa ? $scope.usuario.empresa.departamento ?  $scope.usuario.empresa.departamento.nombre.charAt(0).toUpperCase()+$scope.usuario.empresa.departamento.nombre.slice(1).toLowerCase() +'-Bolivia' : 'Bolivia' : 'Bolivia', x, y); y+=30;
			doc.font('Helvetica-Bold', 12);
			doc.text("ESTADO DE RESULTADOS ACUMULADOS", 0, y, { align: "center" }); y += 12
			doc.font('Helvetica', 9);
			var anioActual = new Date().getFullYear()
			var mesActual = new Date().getMonth()
			var ultimoDiaMes = new Date(anioActual, mesActual - 1, 0).getDate();
			var diaInicio = $scope.configuracionImpresion.fechasImpresion.inicio.split("/")[0]
			var diafin = $scope.configuracionImpresion.fechasImpresion.fin.split("/")[0]
			var mesinico = parseInt($scope.configuracionImpresion.fechasImpresion.inicio.split("/")[1])
			var mesfin = parseInt($scope.configuracionImpresion.fechasImpresion.fin.split("/")[1])
			doc.text("Por el ejercicio terminado al " + diafin + " de " + $scope.meses[mesfin - 1].nombre + " de " + $scope.configuracionImpresion.gestion.nombre, 0, y, { align: "center" }); y += 12;
			if ($scope.configuracionImpresion.bimonetario) {
				doc.text("(Expresado en bolivianos y dólares)", 0, y, { align: "center" }); y += 20
				doc.font('Helvetica-Bold', 9).text('Bs.', 440, y);
				doc.text('$us.', 510, y);
			} else {
				doc.text("(Expresado en bolivianos)", 0, y, { align: "center" });
			}
			if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'SAD') {
				doc.text("PÁGINA " + pagina, 540, 740);
			} else if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'SAI') {
				doc.text("PÁGINA " + pagina, 0, 740, { align: "center" });
			} else if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'SSD') {
				doc.text("PÁGINA " + pagina, 540, 20);
			} else if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'PPD') {
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 520, 740);
			} else if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'PPC') {
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
			} else if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'PPSD') {
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 520, 20);
			}

			doc.font('Helvetica', 5);
			doc.text(($scope.configuracionImpresion.usar_frase_pie_pagina) ? $scope.configuracionImpresion.frase_pie_pagina + ", " : "", 40, 740);
			doc.text((($scope.configuracionImpresion.usar_lugar_emision) ? $scope.configuracionImpresion.lugar_emision + ", " : "") + (($scope.configuracionImpresion.usar_fecha_emision) ? $scope.fechaATexto($scope.configuracionImpresion.fecha_emision) : ""), 40, 750);

		}
		$scope.dibujarFirmas = (doc) =>{
			doc.font('Helvetica', 8);
			if ($scope.configuracionImpresion.usar_firma_uno) {
				doc.text('-------------------------------------------------------', 120, 714, {width: 150, align:'center'})
				doc.text($scope.configuracionImpresion.firma_uno, 120, 720, { width: 150, align: 'center'});
				doc.text($scope.configuracionImpresion.cargo_uno, 120, 730, { width: 150, align: 'center'});
			}
			if ($scope.configuracionImpresion.usar_firma_dos) {
				doc.text('-------------------------------------------------------', 340, 714, {width: 150, align:'center'})
				doc.text($scope.configuracionImpresion.firma_dos, 340, 720, { width: 150, align: 'center'});
				doc.text($scope.configuracionImpresion.cargo_dos, 340, 730, { width: 150, align: 'center'});
			}
		}
		$scope.$on('$routeChangeStart', function (next, current) {
			/* 	$scope.eliminarPopup(); */

		});

		$scope.inicio();
	});



