angular.module('agil.controladores')

	.controller('ControladorEstadoResultados', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
		ClasesTipoEmpresa, ClasesTipo, ObtenerConfiguracionImpresion, CuentasContabilidadEEFF, ObtenerGestionesEEFF, ObtenerCuentasEstadoResultado, ObtenerCencosEmpresa, SweetAlert) {


		$scope.usuario = JSON.parse($localStorage.usuario);

		convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenEmpresa) {
			$scope.usuario.empresa.imagen = imagenEmpresa;
		});

		$scope.inicio = function () {
			$scope.obtenerTiposPeriodos()
			$scope.obtenerGestiones()
			$scope.obtenerConfiguracionImpresion()
			$scope.obtenerGestionesImpresion()
			$scope.obtenerTiposCuenta()
			$scope.obtenerCencosEmpresa()
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
				$scope.configuracionImpresion.bimonetario = false
				$scope.configuracionImpresion.codigos = false
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
				$scope.cuentaTipos = [{id: 0, id_tipo: 0, nombre_corto: 0, nombre: "PREESTABLECIDO" }]
				$scope.cuentaTipos = $scope.cuentaTipos.concat(entidad.clases);
				$scope.configuracionImpresion.tipo_cuenta = $scope.cuentaTipos[0];
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
		$scope.generarPdfEstadoResultados = function () {
			blockUI.start();
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentasContabilidadEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (cuentas) {
				cuentas.todas = cuentas.cuentas.filter(dt => dt.movimiento === "AER");
				delete cuentas.cuentas;
				console.log(cuentas);
				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					var nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") 			nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") 		nivel = 1;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") 		nivel = 2;
					if($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") 		nivel = 3;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO")	nivel = 2;
					var x = ($scope.configuracionImpresion.bimonetario) ? 380 : 480;
						$scope.generarDocumento(cuentas, x, nivel)
				} else {
					var cuentasGrupo = []
					var cuentasSubGrupo = [],
						cuentasGenericas = [],
						cuentasApropiacion = [],
						cuentasSubGrupoFijo = [],
						cuentasGenericasFijo = [],
						cuentasApropiacionFijo = [];
					dato.primero.cuentasGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGrupo.length; i++) {
									var element = cuentasGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupo.length; i++) {
									var element = cuentasSubGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericas.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericas.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericas.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericas.length; i++) {
									var element = cuentasGenericas[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacion.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacion.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacion.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacion.length; i++) {
									var element = cuentasApropiacion[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupoFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupoFijo.length; i++) {
									var element = cuentasSubGrupoFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericasFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericasFijo.length; i++) {
									var element = cuentasGenericasFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacionFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacionFijo.length; i++) {
									var element = cuentasApropiacionFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					var x = ($scope.configuracionImpresion.bimonetario) ? 290 : 310
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
						$scope.generarPdfComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
						$scope.generarPdfComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
						$scope.generarPdfComparativoGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
						$scope.generarPdfComparativosubGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
						$scope.generarPdfComparativoApropiacion(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					}
					blockUI.stop();
				}
			})
		}
		$scope.generarDocumento = async function (cuentas, x, nivel) {
			await convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenLg) {
				var logo = imagenLg;
				if(cuentas.todas.length > 0){
					blockUI.start();
					var doc = new PDFDocument({compress: false, size: 'letter', margin: 10 });
					var stream = doc.pipe(blobStream());
					let val = $scope.dibujarGrupos(doc, x, logo, cuentas.todas, nivel);
					y = val.y, pagina = val.pagina, totalPaginas = val.totalPaginas, items = val.items, itemsPorPagina = val.itemsPorPagina
					
					if (items >= 45) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, 'INGRESOS', logo);
						$scope.dibujarFirmas(doc);
					}else{
						$scope.dibujarFirmas(doc);
					}
					
					blockUI.stop();
					doc.end();
					stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
					});
				}else{
					blockUI.stop();
					SweetAlert.swal("Configure su plan de cuentas", "No existen cuentas para generar el Estado de Resultados", "warning");
				}
			})
		}

		$scope.dibujarGrupos = (doc, x, logo, grupos , nivelDoc) =>{
			var y = 120, itemsPorPagina = 50, items = 0, pagina = 1;  totalPaginas = 5;// ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
			$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, 'ACTIVO', logo);
			var b = 1;
			grupos.forEach( grupo => {
				var titulo = grupo.nombre;
				if(grupo.hijos.length > 0 && grupo.saldo != 0){
					doc.font('Helvetica-Bold', 8);
					doc.text(grupo.nombre.toUpperCase(), 0, b == 1 ? 105 : y, { align: "center" });
					b = 0;
					items++;
					y += 12;
					if (items >= itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
					} 
					if(1 <= nivelDoc){
						let val = $scope.dibujarSubgrupos(doc, x, y, logo, grupo.hijos, nivelDoc, items, itemsPorPagina, pagina, totalPaginas, titulo);
						y = val.y, pagina = val.pagina, totalPaginas = val.totalPaginas, items = val.items, itemsPorPagina = val.itemsPorPagina
					}
					doc.font( nivelDoc != 0 ? 'Helvetica-Bold' : 'Helvetica', 8);
					doc.rect(25, y-3, 520, 12).fill('#E0E6E9').fillColor('#000');
					doc.text('TOTAL ' + grupo.nombre.toUpperCase(), 30, y);
					doc.text(grupo.saldo < 0 ? '-' + number_format_negativo_to_positvo(grupo.saldo, 2) : number_format_negativo_to_positvo(grupo.saldo, 2), x, y, {width: 60, align: 'right'});
					if ($scope.configuracionImpresion.bimonetario) doc.text( grupo.saldo_sus < 0 ? '-' + number_format_negativo_to_positvo(grupo.saldo_sus, 2) : number_format_negativo_to_positvo(grupo.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
					y += 24;
					items += 2;
					if (items >= itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
					} 
				}else{
					blockUI.stop();
				}
			});
			return { y:y, pagina: pagina, totalPaginas:totalPaginas, items: items, itemsPorPagina: itemsPorPagina };
	
		}
		$scope.dibujarSubgrupos = (doc, x, y, logo, subgrupos, nivelDoc, items, itemsPorPagina, pagina, totalPaginas, titulo ) =>{
			subgrupos.forEach(subgrupo => {
				if(subgrupo.hijos.length > 0 && subgrupo.saldo != 0){
					if(nivelDoc != 1) {
						doc.font('Helvetica-Bold', 8);
						doc.text(subgrupo.nombre.toUpperCase(), 40, y);
						items++;
						y += 12;
						if (items >= itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 130;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo, titulo);
						}
					}
					if(2 <= nivelDoc){
						let val = $scope.dibujarGenericas(doc, x, y, logo, subgrupo.hijos, nivelDoc, items, itemsPorPagina, pagina, totalPaginas, titulo);
						y = val.y, pagina = val.pagina, totalPaginas = val.totalPaginas, items = val.items, itemsPorPagina = val.itemsPorPagina
					}
					if(nivelDoc != 1){
						doc.font('Helvetica-Bold', 8);
						doc.text('TOTAL ' + subgrupo.nombre.toUpperCase(), 40, y);
					}else{
						doc.font('Helvetica', 8);
						doc.text(subgrupo.nombre.toUpperCase(), 40, y);	
					}
					doc.text(subgrupo.saldo < 0 ? '-' + number_format_negativo_to_positvo(subgrupo.saldo, 2) : number_format_negativo_to_positvo(subgrupo.saldo, 2), x, y, {width: 60, align: 'right'});
					if ($scope.configuracionImpresion.bimonetario) doc.text( subgrupo.saldo_sus < 0 ? '-' + number_format_negativo_to_positvo(subgrupo.saldo_sus, 2) : number_format_negativo_to_positvo(subgrupo.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
					items ++; 
					y += 12;
					if (items >= itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo, titulo);
					}
					}else{
						blockUI.stop();
					}
			});
			return { y:y, pagina: pagina, totalPaginas:totalPaginas, items: items, itemsPorPagina: itemsPorPagina };
		}
		$scope.dibujarGenericas = (doc, x, y, logo, genericas, nivelDoc, items, itemsPorPagina, pagina, totalPaginas, titulo) =>{
			genericas.forEach(generica => {
				if(generica.hijos.length > 0 && generica.saldo != 0) {
					if(nivelDoc != 2){
						doc.font('Helvetica-Bold', 8);
						doc.text(generica.nombre, 50, y);
						items++;
						y += 12;
						if (items >= itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 130;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
						}
					}
					if(3 === nivelDoc) {
						let val = $scope.dibujarSeccionHijos(doc, x, y, pagina, totalPaginas, items, itemsPorPagina, logo, generica.hijos, titulo);
						y = val.y, pagina = val.pagina, totalPaginas = val.totalPaginas, items = val.items, itemsPorPagina = val.itemsPorPagina
					}
					if(nivelDoc > 2){
						doc.font('Helvetica-Bold', 8);
						doc.text('TOTAL ' + generica.nombre.toUpperCase(), 50, y);
						if(generica.ctaDep != undefined){
							let saldoBs = generica.saldo - generica.ctaDep.saldo;
							let saldoSus = generica.saldo_sus - generica.ctaDep.saldo_sus;
							doc.text(saldoBs < 0 ? '-' + number_format_negativo_to_positvo(saldoBs, 2) : number_format_negativo_to_positvo(saldoBs, 2), x, y, {width: 60, align: 'right'});
							if ($scope.configuracionImpresion.bimonetario) doc.text( saldoSus < 0 ? '-' + number_format_negativo_to_positvo(saldoSus, 2) : number_format_negativo_to_positvo(saldoSus, 2), x + 100, y, {width: 60, align: 'right'});
						}else{
							doc.text(generica.saldo < 0 ? '-' + number_format_negativo_to_positvo(generica.saldo, 2) : number_format_negativo_to_positvo(generica.saldo, 2), x, y, {width: 60, align: 'right'});
							if ($scope.configuracionImpresion.bimonetario) doc.text( generica.saldo_sus < 0 ? '-' + number_format_negativo_to_positvo(generica.saldo_sus, 2) : number_format_negativo_to_positvo(generica.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
						}
						y += 12;
						items ++;
						if (items >= itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 130;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
						} 
					}
					if(nivelDoc === 2){
						doc.font('Helvetica', 8);
						doc.text(generica.nombre.toUpperCase(), 50, y);
						doc.text(generica.saldo < 0 ? '-' + number_format_negativo_to_positvo(generica.saldo, 2) : number_format_negativo_to_positvo(generica.saldo, 2), x, y, {width: 60, align: 'right'});
						if ($scope.configuracionImpresion.bimonetario) doc.text( generica.saldo_sus < 0 ? '-' + number_format_negativo_to_positvo(generica.saldo_sus, 2) : number_format_negativo_to_positvo(generica.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
						y += 12;
						items ++;
						if (items >= itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 130;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
						} 
						if(generica.ctaDep != undefined){
							if (generica.activoFijo === 1) doc.text('(-) ' + generica.ctaDep.nombre.toUpperCase(), 50, y);
							doc.text((generica.ctaDep.haber - generica.ctaDep.debe) < 0 ? number_format_negativo_to_positvo(generica.ctaDep.haber - generica.ctaDep.debe, 2) : '-' + number_format_negativo_to_positvo(generica.ctaDep.haber - generica.ctaDep.debe, 2), x, y, {width: 60, align: 'right'});
							if ($scope.configuracionImpresion.bimonetario) doc.text( (generica.ctaDep.haber_sus - generica.ctaDep.debe_sus) < 0 ? '-' + number_format_negativo_to_positvo(generica.ctaDep.haber_sus - generica.debe_sus, 2) : '-' + number_format_negativo_to_positvo(generica.ctaDep.haber_sus - generica.ctaDep.debe_sus, 2), x + 100, y, {width: 60, align: 'right'});
							y += 12;
							items ++;
							if (items >= itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 130;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
							} 
						}
						
					}
				}else{
					blockUI.stop();
				}
			});
			return { y:y, pagina: pagina, totalPaginas:totalPaginas, items: items, itemsPorPagina: itemsPorPagina };
		}
		$scope.dibujarSeccionHijos = (doc, x, y, pagina, totalPaginas, items, itemsPorPagina, logo, hijos, titulo) => {
			doc.font('Helvetica', 8);
			for (let i = 0; i < hijos.length; i++) {
				if(!hijos[i].resultado_acumulado){
					let saldo_bs = 0;
					let saldo_sus = 0;
					hijos[i].tipoSaldo === 'DEDE' ? saldo_bs = hijos[i].debe - hijos[i].haber : saldo_bs = hijos[i].haber - hijos[i].debe;
					hijos[i].tipoSaldo === 'DEDE' ? saldo_sus = hijos[i].debe_sus - hijos[i].haber_sus : saldo_sus = hijos[i].haber_sus - hijos[i].debe_sus;
					doc.text(hijos[i].nombre.toUpperCase(), 60, y);
					doc.text(saldo_bs < 0 ? '-'+number_format_negativo_to_positvo(saldo_bs, 2) : number_format_negativo_to_positvo(saldo_bs, 2), x, y, {width: 60, align: 'right'});
					if ($scope.configuracionImpresion.bimonetario) doc.text( saldo_sus < 0 ? '-' + number_format_negativo_to_positvo(saldo_sus, 2) : number_format_negativo_to_positvo(saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
					items++;
					y += 12;
					if (items >= itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
						doc.font('Helvetica', 8);
					}
					if(hijos[i].activoFijo === 1 && hijos[i].ctaDep != undefined){
						doc.text('(-) ' + hijos[i].ctaDep.nombre.toUpperCase(), 60, y);
						doc.text((hijos[i].ctaDep.haber - hijos[i].ctaDep.debe) < 0 ? '-'+number_format_negativo_to_positvo(hijos[i].ctaDep.haber - hijos[i].ctaDep.debe, 2) : number_format_negativo_to_positvo(hijos[i].ctaDep.haber - hijos[i].ctaDep.debe, 2), x, y, {width: 60, align: 'right'});
						if ($scope.configuracionImpresion.bimonetario) doc.text( (hijos[i].ctaDep.haber_sus - hijos[i].ctaDep.debe_sus) < 0 ? '-' + number_format_negativo_to_positvo(hijos[i].ctaDep.haber_sus - hijos[i].ctaDep.debe_sus, 2) : number_format_negativo_to_positvo(hijos[i].ctaDep.haber_sus - hijos[i].ctaDep.debe_sus, 2), x + 100, y, {width: 60, align: 'right'});
						items++;
						y += 12;
						if (items >= itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 130;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
							doc.font('Helvetica', 8);
						}
					}
				}else{
					doc.text(hijos[i].nombre.toUpperCase(), 60, y);
					doc.text(hijos[i].saldo < 0 ? number_format_negativo_to_positvo(hijos[i].saldo, 2) : '-' + number_format_negativo_to_positvo(hijos[i].saldo, 2), x, y, {width: 60, align: 'right'});
					if ($scope.configuracionImpresion.bimonetario) doc.text( hijos[i].saldo_sus < 0 ? number_format_negativo_to_positvo(hijos[i].saldo_sus, 2) : '-' + number_format_negativo_to_positvo(hijos[i].saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
					items++;
					y += 12;
					if (items >= itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
						doc.font('Helvetica', 8);
					}
				}
				if (items >= itemsPorPagina) {
					doc.addPage({ margin: 0, bufferPages: true });
					y = 130;
					items = 0;
					pagina = pagina + 1;
					$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, totalPaginas, titulo, logo);
					doc.font('Helvetica', 8);
				}
				
			}
			return { y:y, pagina: pagina, totalPaginas:totalPaginas, items: items, itemsPorPagina: itemsPorPagina };
		}


		



		$scope.generarExelBalanceGeneral = function () {
			blockUI.start();
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentasContabilidadEstadoResultadoEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (dato) {
				if (dato.monedaCambio) {
					$scope.moneda = dato.monedaCambio;

				} else {
					$scope.moneda = { ufv: "--", dolar: "--" }
				}
				dato.arregloActivos = []
				dato.arregloActivosFijos = []
				dato.arregloPasivos = []
				dato.arregloPatrimonio = []
				dato.arregloIngreso = []
				dato.arregloEgreso = []
				dato.arregleCostos = []
				var totalActivos = 0
				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					dato.arregloPasivos = dato.arregloPasivos.concat(dato.arregloPatrimonio);
					var x = ($scope.configuracionImpresion.bimonetario) ? 400 : 530
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
						$scope.generarExelAPreestablecido(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
						$scope.generarExelAPreestablecido(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
						$scope.generarExelGrupo(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
						$scope.generarExelSubGrupo(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
						$scope.generarExelApropiacion(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion)
					}
				} else {
					var cuentasGrupo = []
					var cuentasSubGrupo = [],
						cuentasGenericas = [],
						cuentasApropiacion = [],
						cuentasSubGrupoFijo = [],
						cuentasGenericasFijo = [],
						cuentasApropiacionFijo = [];
					dato.primero.cuentasGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGrupo.length; i++) {
									var element = cuentasGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupo.length; i++) {
									var element = cuentasSubGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericas.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericas.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericas.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericas.length; i++) {
									var element = cuentasGenericas[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacion.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacion.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacion.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacion.length; i++) {
									var element = cuentasApropiacion[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupoFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupoFijo.length; i++) {
									var element = cuentasSubGrupoFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericasFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericasFijo.length; i++) {
									var element = cuentasGenericasFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacionFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacionFijo.length; i++) {
									var element = cuentasApropiacionFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					var x = ($scope.configuracionImpresion.bimonetario) ? 290 : 310
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
						$scope.generarExelComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
						$scope.generarExelComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
						$scope.generarExelComparativoGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
						$scope.generarExelComparativosubGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
						$scope.generarExelComparativoApropiacion(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					}
					blockUI.stop();
				}
			})
		}
		$scope.generarWordBalanceGeneral = function () {
			blockUI.start();
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentasContabilidadEstadoResultadoEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (dato) {
				if (dato.monedaCambio) {
					$scope.moneda = dato.monedaCambio;

				} else {
					$scope.moneda = { ufv: "--", dolar: "--" }
				}
				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					var x = ($scope.configuracionImpresion.bimonetario) ? 400 : 530
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
						$scope.descargarArchivo($scope.generarWordPreestablecido(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion), "reporte-balance-general.doc");
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
						$scope.descargarArchivo($scope.generarWordPreestablecido(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion), "reporte-balance-general.doc");
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
						$scope.descargarArchivo($scope.generarWordGrupo(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion), "reporte-balance-general.doc");
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
						$scope.descargarArchivo($scope.generarWordSubGrupo(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion), "reporte-balance-general.doc");
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
						$scope.descargarArchivo($scope.generarWordApropiacion(dato, x, dato.cuentasGrupo, dato.cuentasSubGrupo, dato.cuentasGenericas, dato.cuentasApropiacion), "reporte-balance-general.doc");
					}
				} else {
					var cuentasGrupo = []
					var cuentasSubGrupo = [],
						cuentasGenericas = [],
						cuentasApropiacion = [],
						cuentasSubGrupoFijo = [],
						cuentasGenericasFijo = [],
						cuentasApropiacionFijo = [];
					dato.primero.cuentasGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGrupo.length; i++) {
									var element = cuentasGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupo.length; i++) {
									var element = cuentasSubGrupo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericas.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericas.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericas.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericas.length; i++) {
									var element = cuentasGenericas[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacion.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacion.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacion.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacion.length; i++) {
									var element = cuentasApropiacion[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasSubGrupoFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasSubGrupoFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasSubGrupoFijo.length; i++) {
									var element = cuentasSubGrupoFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasGenericasFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasGenericasFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasGenericasFijo.length; i++) {
									var element = cuentasGenericasFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					dato.primero.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
						var datos2 = {}
						datos2.primerAno = cuenta
						cuentasApropiacionFijo.push(datos2)
						if (index === (array.length - 1)) {
							dato.segundo.cuentasApropiacionFijo.forEach(function (cuenta, index, array) {
								for (var i = 0; i < cuentasApropiacionFijo.length; i++) {
									var element = cuentasApropiacionFijo[i];
									if (element.primerAno.id == cuenta.id) {
										element.segundoAno = cuenta
									}
								}
							})
						}
					})
					var x = ($scope.configuracionImpresion.bimonetario) ? 290 : 310
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
						$scope.generarWordComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
						$scope.generarWordComprobantePreestablecido(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
						$scope.generarWordComparativoGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
						$scope.generarWordComparativosubGrupo(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
						$scope.generarWordComparativoApropiacion(dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacioncuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
					}
					blockUI.stop();
				}
			})
		}
		$scope.generarPdfApropiacion = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {

			var doc = new PDFDocument({ size: 'letter', margin: 10 });
			var stream = doc.pipe(blobStream());
			// draw some text
			var totalCosto = 0;
			var datos = cuentasSubGrupo.length + cuentasGenericas.length + (cuentasApropiacion?cuentasApropiacion.length:0)
			var datosPasivo = []
			var y = 130, itemsPorPagina = 28, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
			var totalActivos = 0
			var totalPasivo = 0
			$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
			doc.font('Helvetica', 8);
			for (var i = 0; i < cuentasSubGrupo.length && items <= itemsPorPagina; i++) {
				cuenta = cuentasSubGrupo[i]
				cuenta.total = 0

				if (cuenta.clasificacion.nombre === "Activo") {
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
						doc.font('Helvetica', 8);
					}
					doc.text(cuenta.nombre, 30, y)
					/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
					/* total+=cuenta.saldo */
					y = y + 20;
					items++;

					for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {
						cuenta3 = cuentasGenericas[L]

						var cod = String(cuenta3.codigo).substr(0, 3)
						if (cuenta.codigo == cod) {
							if (cuentasApropiacion.some(function (cuenta2) {
								var cod = String(cuenta2.codigo).substr(0, 5)
								if (cuenta3.codigo == cod) {
									return true
								} else {
									return false
								}
							})) {
								doc.text(cuenta3.nombre, 40, y)
								y = y + 20;
								items++;
								for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {
									cuenta2 = cuentasApropiacion[p]
									cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										doc.text(cuenta2.nombre, 60, y)
										doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x, y);
										var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
										if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
										cuenta.total += cuenta2.saldo
										totalActivos += cuenta2.saldo
										y = y + 20;
										items++;
										if (items == itemsPorPagina) {
											doc.addPage({ margin: 0, bufferPages: true });
											y = 140;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
											doc.font('Helvetica', 8);
										}
									} else {
										if (items == itemsPorPagina) {
											doc.addPage({ margin: 0, bufferPages: true });
											y = 140;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
											doc.font('Helvetica', 8);
										}
									}


								}
							}
						} else {
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
						}



					}
					doc.text("TOTAL " + cuenta.nombre, 90, y);
					doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
					var cuentatotalSus = cuenta.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
					y = y + 20;
					items++;
					if (i === (cuentasSubGrupo.length - 1)) {
						$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (cuentasSubGrupo.length - 1)) {
						$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
				}

			}
			if ($scope.configuracionImpresion.usar_firma_uno) {
				doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
				doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
			}
			if ($scope.configuracionImpresion.usar_firma_dos) {
				doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
				doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
			}

			doc.end();
			stream.on('finish', function () {
				var fileURL = stream.toBlobURL('application/pdf');
				window.open(fileURL, '_blank', 'location=no');
			});
			blockUI.stop();

		}
		$scope.DibujarFijoApropiacion = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {

				doc.font('Helvetica', 8);
				for (var i = 0; i < dato.cuentasSubGrupoFijo.length && items <= itemsPorPagina; i++) {
					cuenta = dato.cuentasSubGrupoFijo[i]
					cuenta.total = 0

					if (cuenta.clasificacion.nombre === "Activo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
						/* total+=cuenta.saldo */
						y = y + 20;
						items++;

						for (var L = 0; L < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; L++) {
							cuenta3 = dato.cuentasGenericasFijo[L]
							if (cuenta3.tipoCuenta.nombre_corto === "3") {
								var cod = String(cuenta3.codigo).substr(0, 3)
								if (cuenta.codigo == cod) {
									if (dato.cuentasApropiacionFijo.some(function (cuenta2) {
										var cod = String(cuenta2.codigo).substr(0, 5)
										if (cuenta3.codigo == cod) {
											return true
										} else {
											return false
										}
									})) {
										doc.text(cuenta3.nombre, 40, y)
										y = y + 20;
										items++;


										for (var p = 0; p < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; p++) {
											cuenta2 = dato.cuentasApropiacionFijo[p]
											if (cuenta2.tipoCuenta.nombre_corto === "4") {
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta3.codigo == cod) {
													doc.text(cuenta2.nombre, 60, y)
													doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x - 80, y);
													var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
													if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 65, y);
													/* cuenta.total += cuenta2.saldo
													totalActivos += cuenta2.saldo */
													y = y + 20;
													items++;
													for (var S = 0; S < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; S++) {
														cuenta5 = dato.cuentasApropiacionFijo[S]
														if (cuenta5.tipoCuenta.nombre_corto === "4") {
															var cod = String(cuenta5.codigo).substr(4)
															var codDos = String(cuenta2.codigo).substr(4)
															if (codDos == cod && cuenta5.clasificacion.nombre === "Pasivo") {
																doc.text(cuenta5.nombre, 60, y)
																doc.text("(" + number_format_negativo_to_positvo(cuenta5.saldo, 2) + ")", x - 80, y);
																var totalSumado = cuenta2.saldo - cuenta5.saldo
																doc.text(number_format_negativo_to_positvo((totalSumado), 2), x, y);
																var saldoSus = cuenta5.saldo / $scope.moneda.dolar;
																var saldoSusTotal = totalSumado / $scope.moneda.dolar;
																if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 65, y);
																if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSusTotal, 2), x + 130, y);
																cuenta.total += totalSumado
																totalActivos += totalSumado
																y = y + 20;
																items++;
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															} else {
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															}
														} else {
															if (items == itemsPorPagina) {
																doc.addPage({ margin: 0, bufferPages: true });
																y = 140;
																items = 0;
																pagina = pagina + 1;
																$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																doc.font('Helvetica', 8);
															}
														}


													}
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												} else {
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												}
											} else {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
													doc.font('Helvetica', 8);
												}
											}


										}
									}
								} else {
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
										doc.font('Helvetica', 8);
									}
								}
							} else {
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
									doc.font('Helvetica', 8);
								}
							}


						}
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var cuentatotalSus = cuenta.total / $scope.moneda.dolar
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
						/* 	y = y + 20;
							items++; */
					} else {
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
					}

				}
			} else {

			}
		}
		$scope.DibujarFijoPreestablecido = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {


			doc.font('Helvetica', 8);
			for (var i = 0; i < dato.cuentasSubGrupoFijo.length && items <= itemsPorPagina; i++) {
				cuenta = dato.cuentasSubGrupoFijo[i]
				cuenta.total = 0

				if (cuenta.clasificacion.nombre === "Activo") {
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
						doc.font('Helvetica', 8);
					}
					doc.text(cuenta.nombre, 30, y)
					/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
					/* total+=cuenta.saldo */
					y = y + 20;
					items++;

					for (var L = 0; L < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; L++) {
						cuenta3 = dato.cuentasGenericasFijo[L]
						cuenta3.total = 0
						if (cuenta3.tipoCuenta.nombre_corto === "3") {
							var cod = String(cuenta3.codigo).substr(0, 3)
							if (cuenta.codigo == cod) {
								if (dato.cuentasApropiacionFijo.some(function (cuenta2) {
									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										return true
									} else {
										return false
									}
								})) {
									doc.text(cuenta3.nombre, 40, y)
									y = y + 20;
									items++;
									for (var s = 0; s < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; s++) {
										cuenta6 = dato.cuentasGenericasFijo[s]
										cuenta6.total = 0
										var cod = String(cuenta6.codigo).substr(3)
										var codDos = String(cuenta3.codigo).substr(3)
										if (codDos == cod && cuenta6.clasificacion.nombre === "Pasivo") {
											doc.text(cuenta6.nombre, 40, y)
											y = y + 20;
											items++;
										}
										if (s == (dato.cuentasGenericasFijo.length - 1)) {
											for (var p = 0; p < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; p++) {
												cuenta2 = dato.cuentasApropiacionFijo[p]
												if (cuenta2.tipoCuenta.nombre_corto === "4") {
													var cod = String(cuenta2.codigo).substr(0, 5)
													if (cuenta3.codigo == cod) {
														/* 	doc.text(cuenta2.nombre, 60, y) */
														cuenta3.total += cuenta2.saldo
														//doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x - 80, y-20);
														var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
														//if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x +65, y-20);

														/* y = y + 20;
														items++; */
														for (var S = 0; S < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; S++) {
															cuenta5 = dato.cuentasApropiacionFijo[S]
															if (cuenta5.tipoCuenta.nombre_corto === "4") {
																var cod = String(cuenta5.codigo).substr(4)
																var codDos = String(cuenta2.codigo).substr(4)
																if (codDos == cod && cuenta5.clasificacion.nombre === "Pasivo") {
																	/* doc.text(cuenta5.nombre, 60, y) */
																	/* doc.text("("+number_format_negativo_to_positvo(cuenta5.saldo, 2)+")", x - 80, y-20); */
																	cuenta6.total += cuenta5.saldo
																	var totalSumado = cuenta2.saldo - cuenta5.saldo
																	/* 	doc.text(number_format_negativo_to_positvo((totalSumado), 2), x, y-20); */
																	var saldoSus = cuenta5.saldo / $scope.moneda.dolar;
																	var saldoSusTotal = totalSumado / $scope.moneda.dolar;
																	/* 	if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 65, y-20);
																		if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSusTotal, 2), x + 130, y-20); */
																	cuenta.total += totalSumado
																	totalActivos += totalSumado
																	/* 	y = y + 20;
																		items++; */
																	if (items == itemsPorPagina) {
																		doc.addPage({ margin: 0, bufferPages: true });
																		y = 140;
																		items = 0;
																		pagina = pagina + 1;
																		$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																		doc.font('Helvetica', 8);
																	}
																} else {
																	if (items == itemsPorPagina) {
																		doc.addPage({ margin: 0, bufferPages: true });
																		y = 140;
																		items = 0;
																		pagina = pagina + 1;
																		$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																		doc.font('Helvetica', 8);
																	}
																}
															} else {
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															}


														}
														if (items == itemsPorPagina) {
															doc.addPage({ margin: 0, bufferPages: true });
															y = 140;
															items = 0;
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
															doc.font('Helvetica', 8);
														}
													} else {
														if (items == itemsPorPagina) {
															doc.addPage({ margin: 0, bufferPages: true });
															y = 140;
															items = 0;
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
															doc.font('Helvetica', 8);
														}
													}
												} else {
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												}


											}

											doc.text(number_format_negativo_to_positvo(cuenta3.total, 2), x - 80, y - 40);
											var saldoSus = cuenta3.total / $scope.moneda.dolar;
											if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 65, y - 40);
											doc.text("(" + number_format_negativo_to_positvo(cuenta6.total, 2) + ")", x - 80, y - 20);
											var saldoSus = cuenta6.total / $scope.moneda.dolar;
											if ($scope.configuracionImpresion.bimonetario) doc.text("(" + number_format_negativo_to_positvo(saldoSus, 2) + ")", x + 65, y - 20);
											var totalFijos = cuenta3.total - cuenta6.total
											var totalFijosSus = totalFijos / $scope.moneda.dolar;
											doc.text(number_format_negativo_to_positvo(totalFijos, 2), x, y - 20);
											if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalFijosSus, 2), x + 130, y - 20);
										}

									}

								}
							} else {
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
									doc.font('Helvetica', 8);
								}
							}
						} else {
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
						}


					}
					doc.text("TOTAL " + cuenta.nombre, 90, y);
					doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
					var cuentatotalSus = cuenta.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
					y = y + 20;
					items++;
					if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
						$scope.dibujarPatrimonioPredefinido(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
						$scope.dibujarPatrimonioPredefinido(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
				}

			}


		}
		$scope.DibujarFijoComparativoPreestablecido = function (dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
			cuentasGenericasFijo,
			cuentasApropiacionFijo) {
			doc.font('Helvetica', 8);
			for (var i = 0; i < cuentasSubGrupoFijo.length && items <= itemsPorPagina; i++) {
				cuenta = cuentasSubGrupoFijo[i]
				cuenta.primerAno.total = 0
				cuenta.segundoAno.total = 0

				if (cuenta.primerAno.clasificacion.nombre === "Activo") {
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
						doc.font('Helvetica', 8);
					}
					doc.text(cuenta.primerAno.nombre, 30, y)
					/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
					/* total+=cuenta.saldo */
					y = y + 20;
					items++;

					for (var L = 0; L < cuentasGenericasFijo.length && items <= itemsPorPagina; L++) {
						cuenta3 = cuentasGenericasFijo[L]
						cuenta3.primerAno.total = 0
						cuenta3.segundoAno.total = 0
						var cod = String(cuenta3.primerAno.codigo).substr(0, 3)
						if (cuenta.primerAno.codigo == cod) {
							if (cuentasApropiacionFijo.some(function (cuenta2) {
								var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
								if (cuenta3.primerAno.codigo == cod) {
									return true
								} else {
									return false
								}
							})) {
								doc.text(cuenta3.primerAno.nombre, 40, y)
								y = y + 20;
								items++;
								for (var s = 0; s < cuentasGenericasFijo.length && items <= itemsPorPagina; s++) {
									cuenta6 = cuentasGenericasFijo[s]
									cuenta6.primerAno.total = 0
									cuenta6.segundoAno.total = 0
									var cod = String(cuenta6.primerAno.codigo).substr(3)
									var codDos = String(cuenta3.primerAno.codigo).substr(3)
									if (codDos == cod && cuenta6.primerAno.clasificacion.nombre === "Pasivo") {
										doc.text(cuenta6.primerAno.nombre, 40, y)
										y = y + 20;
										items++;
									}
									if (s == (cuentasGenericasFijo.length - 1)) {
										for (var p = 0; p < cuentasApropiacionFijo.length && items <= itemsPorPagina; p++) {
											cuenta2 = cuentasApropiacionFijo[p]
											if (cuenta2.primerAno.tipoCuenta.nombre_corto === "4") {
												var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
												if (cuenta3.primerAno.codigo == cod) {
													/* 	doc.text(cuenta2.nombre, 60, y) */
													cuenta3.primerAno.total += cuenta2.primerAno.saldo
													cuenta3.segundoAno.total += cuenta2.segundoAno.saldo
													//doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x - 80, y-20);
													//var saldoSus = cuenta2.primerAno.saldo / $scope.moneda.dolar;
													//if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x +65, y-20);

													/* y = y + 20;
													items++; */
													for (var S = 0; S < cuentasApropiacionFijo.length && items <= itemsPorPagina; S++) {
														cuenta5 = cuentasApropiacionFijo[S]
														if (cuenta5.primerAno.tipoCuenta.nombre_corto === "4") {
															var cod = String(cuenta5.primerAno.codigo).substr(4)
															var codDos = String(cuenta2.primerAno.codigo).substr(4)
															if (codDos == cod && cuenta5.primerAno.clasificacion.nombre === "Pasivo") {
																/* doc.text(cuenta5.nombre, 60, y) */
																/* doc.text("("+number_format_negativo_to_positvo(cuenta5.saldo, 2)+")", x - 80, y-20); */
																cuenta6.primerAno.total += cuenta5.primerAno.saldo
																cuenta6.segundoAno.total += cuenta5.segundoAno.saldo
																var totalSumado = cuenta2.primerAno.saldo - cuenta5.primerAno.saldo
																var totalSumado2 = cuenta2.segundoAno.saldo - cuenta5.segundoAno.saldo
																/* 	doc.text(number_format_negativo_to_positvo((totalSumado), 2), x, y-20); */
																/* var saldoSus = cuenta5.primerAno.saldo / $scope.moneda.dolar;
																var saldoSusTotal = totalSumado / $scope.moneda.dolar; */
																/* 	if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 65, y-20);
																	if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSusTotal, 2), x + 130, y-20); */
																cuenta.primerAno.total += totalSumado
																totalesActivos.totalActivosPrimerAnio += totalSumado
																cuenta.segundoAno.total += totalSumado2
																totalesActivos.totalActivosSegundoAnio += totalSumado2
																/* 	y = y + 20;
																	items++; */
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															} else {
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															}
														} else {
															if (items == itemsPorPagina) {
																doc.addPage({ margin: 0, bufferPages: true });
																y = 140;
																items = 0;
																pagina = pagina + 1;
																$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
																doc.font('Helvetica', 8);
															}
														}


													}
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												} else {
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												}
											} else {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
													doc.font('Helvetica', 8);
												}
											}


										}

										doc.text(cuenta3.primerAno.total.toFixed(2), x - 80, y - 40);
										doc.text(cuenta3.segundoAno.total.toFixed(2), x + 130, y - 40);
										var saldoSus = cuenta3.primerAno.total / $scope.moneda.dolar;
										//if ($scope.configuracionImpresion.bimonetario) doc.text(saldoSus, 2), x + 65, y - 40);
										doc.text("(" + cuenta6.primerAno.total.toFixed(2) + ")", x - 80, y - 20);
										doc.text("(" + cuenta6.segundoAno.total.toFixed(2) + ")", x + 130, y - 20);
										var saldoSus = cuenta6.primerAno.total / $scope.moneda.dolar;
										//if ($scope.configuracionImpresion.bimonetario) doc.text("(" + number_format_negativo_to_positvo(saldoSus, 2) + ")", x + 65, y - 20);
										var totalFijos = cuenta3.primerAno.total - cuenta6.primerAno.total
										var totalFijosSus = totalFijos / $scope.moneda.dolar;
										doc.text(number_format_negativo_to_positvo(totalFijos, 2), x, y - 20);

										if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalFijosSus, 2), x + 80, y - 20);
										var totalFijos = cuenta3.segundoAno.total - cuenta6.segundoAno.total
										var totalFijosSus = totalFijos / $scope.moneda.dolar;
										doc.text(number_format_negativo_to_positvo(totalFijos, 2), x + 180, y - 20);
										if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalFijosSus, 2), x + 260, y - 20);
									}

								}

							}
						} else {
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
						}



					}
					doc.text("TOTAL " + cuenta.primerAno.nombre, 90, y);
					doc.text(number_format_negativo_to_positvo(cuenta.primerAno.total, 2), x, y);
					var cuentatotalSus = cuenta.primerAno.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 80, y);
					doc.text(number_format_negativo_to_positvo(cuenta.segundoAno.total, 2), x + 180, y);
					var cuentatotalSus = cuenta.segundoAno.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 260, y);
					y = y + 20;
					items++;
					if (i === (cuentasSubGrupoFijo.length - 1)) {
						$scope.dibujarPatrimonioComparativoPredefinido(dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (cuentasSubGrupoFijo.length - 1)) {
						$scope.dibujarPatrimonioComparativoPredefinido(dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion)

					}
				}

			}
		}
		$scope.DibujarFijoSubGrupo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {

				doc.font('Helvetica', 8);
				for (var i = 0; i < dato.cuentasSubGrupoFijo.length && items <= itemsPorPagina; i++) {
					cuenta = dato.cuentasSubGrupoFijo[i]
					cuenta.total = 0

					if (cuenta.clasificacion.nombre === "Activo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)

						y = y + 20;
						items++;

						for (var L = 0; L < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; L++) {
							cuenta3 = dato.cuentasGenericasFijo[L]
							cuenta3.total = 0

							var cod = String(cuenta3.codigo).substr(0, 3)
							if (cuenta.codigo == cod) {
								if (dato.cuentasApropiacionFijo.some(function (cuenta2) {
									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										return true
									} else {
										return false
									}
								})) {

									for (var s = 0; s < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; s++) {
										cuenta6 = dato.cuentasGenericasFijo[s]
										cuenta6.total = 0
										var cod = String(cuenta6.codigo).substr(3)
										var codDos = String(cuenta3.codigo).substr(3)

										if (s == (dato.cuentasGenericasFijo.length - 1)) {
											for (var p = 0; p < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; p++) {
												cuenta2 = dato.cuentasApropiacionFijo[p]
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta3.codigo == cod) {
													cuenta3.total += cuenta2.saldo
													for (var S = 0; S < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; S++) {
														cuenta5 = dato.cuentasApropiacionFijo[S]
														var cod = String(cuenta5.codigo).substr(4)
														var codDos = String(cuenta2.codigo).substr(4)
														if (codDos == cod && cuenta5.clasificacion.nombre === "Pasivo") {
															cuenta6.total += cuenta5.saldo
															var totalSumado = cuenta2.saldo - cuenta5.saldo
															cuenta.total += totalSumado
															totalActivos += totalSumado
														}
													}
												}
											}
										}

									}

								}

							} else {
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
									doc.font('Helvetica', 8);
								}
							}

						}
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var cuentatotalSus = cuenta.total / $scope.moneda.dolar
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonioSubGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
						/* 	y = y + 20;
							items++; */
					} else {
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonioSubGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
					}

				}
			} else {

			}
		}
		$scope.DibujarFijoGrupo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {

				doc.font('Helvetica', 8);
				var cantidadcuentasSubGrupoFijo = dato.cuentasSubGrupoFijo?dato.cuentasSubGrupoFijo.length:0;
				for (var i = 0; i < cantidadcuentasSubGrupoFijo && items <= itemsPorPagina; i++) {
					cuenta = dato.cuentasSubGrupoFijo[i]
					cuenta.total = 0

					if (cuenta.clasificacion.nombre === "Activo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						/* doc.text(cuenta.nombre, 30, y) */
						/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
						/* total+=cuenta.saldo */
						/* y = y + 20;
						items++; */

						for (var L = 0; L < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; L++) {
							cuenta3 = dato.cuentasGenericasFijo[L]
							cuenta3.total = 0
							var cod = String(cuenta3.codigo).substr(0, 3)
							if (cuenta.codigo == cod) {
								if (dato.cuentasApropiacionFijo.some(function (cuenta2) {
									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										return true
									} else {
										return false
									}
								})) {
									/* doc.text(cuenta3.nombre, 40, y)
									y = y + 20;
									items++; */
									for (var s = 0; s < dato.cuentasGenericasFijo.length && items <= itemsPorPagina; s++) {
										cuenta6 = dato.cuentasGenericasFijo[s]
										cuenta6.total = 0
										var cod = String(cuenta6.codigo).substr(3)
										var codDos = String(cuenta3.codigo).substr(3)
										if (codDos == cod && cuenta6.clasificacion.nombre === "Pasivo") {
											/* doc.text(cuenta6.nombre, 40, y)
											y = y + 20;
											items++; */
										}
										if (s == (dato.cuentasGenericasFijo.length - 1)) {
											for (var p = 0; p < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; p++) {
												cuenta2 = dato.cuentasApropiacionFijo[p]
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta3.codigo == cod) {
													/* 	doc.text(cuenta2.nombre, 60, y) */
													cuenta3.total += cuenta2.saldo
													//doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x - 80, y-20);
													var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
													//if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x +65, y-20);

													/* y = y + 20;
													items++; */
													for (var S = 0; S < dato.cuentasApropiacionFijo.length && items <= itemsPorPagina; S++) {
														cuenta5 = dato.cuentasApropiacionFijo[S]

														var cod = String(cuenta5.codigo).substr(4)
														var codDos = String(cuenta2.codigo).substr(4)
														if (codDos == cod && cuenta5.clasificacion.nombre === "Pasivo") {
															cuenta6.total += cuenta5.saldo
															var totalSumado = cuenta2.saldo - cuenta5.saldo

															cuenta.total += totalSumado
															totalActivos += totalSumado

														}



													}
												}



											}
										}

									}

								}
							}
						}
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var cuentatotalSus = cuenta.total / $scope.moneda.dolar
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonioGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
						/* 	y = y + 20;
							items++; */
					} else {
						if (i === (dato.cuentasSubGrupoFijo.length - 1)) {
							$scope.dibujarPatrimonioGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
					}

				}
			} else {

			}
		}
		$scope.dibujarPatrimonio = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				var totalPasivo = 0
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL Gastos de Operación :  ", 30, y);
				doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y);
				var cuentatotalSus = totalActivos / $scope.moneda.dolar
				if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
				y += 20
				doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
				y += 20
				for (var j = 0; j < dato.cuentasSubGrupo.length && items <= itemsPorPagina; j++) {
					var cuenta = dato.cuentasSubGrupo[j]
					if (cuenta.clasificacion.nombre === "Pasivo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						cuenta.total = 0
						y = y + 20;
						items++;
						for (var L = 0; L < dato.cuentasGenericas.length && items <= itemsPorPagina; L++) {
							var cuenta4 = dato.cuentasGenericas[L]
							if (cuenta4.tipoCuenta.nombre_corto === "3") {
								var cod = String(cuenta4.codigo).substr(0, 3)
								if (cuenta.codigo == cod) {
									if (dato.cuentasApropiacion.some(function (cuenta2) {
										var cod = String(cuenta2.codigo).substr(0, 5)
										if (cuenta4.codigo == cod) {
											return true
										} else {
											return false
										}
									})) {
										doc.text(cuenta4.nombre, 40, y)
										y = y + 20;
										items++;
										for (var p = 0; p < dato.cuentasApropiacion.length && items <= itemsPorPagina; p++) {
											var cuenta2 = dato.cuentasApropiacion[p]
											if (cuenta2.tipoCuenta.nombre_corto === "4") {
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta4.codigo == cod) {
													doc.text(cuenta2.nombre, 60, y)
													doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x, y);
													var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
													if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
													cuenta.total += cuenta2.saldo
													totalPasivo += cuenta2.saldo
													y = y + 20;
													items++;
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
														doc.font('Helvetica', 8);
													}
												} else {
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
														doc.font('Helvetica', 8);
													}
												}
											} else {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
													doc.font('Helvetica', 8);
												}
											}


										}
									}
								} else {
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
										doc.font('Helvetica', 8);
									}
								}
							} else {

								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
									doc.font('Helvetica', 8);
								}
							}


						}
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var saldoSus = Math.round((cuenta.total / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
						y = y + 20;
						items++;
					}
					if (j === (dato.cuentasSubGrupo.length - 1)) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL PASIVO:  ", 30, y)
						doc.text(number_format_negativo_to_positvo(totalPasivo, 2), x, y)
						var saldoSus = Math.round((totalPasivo / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
					}
				}
			} else {

			}
		}
		$scope.dibujarPatrimonioComparativoPredefinido = function (dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {

			var totalesPasivo = { totalPasivoPrimerAnio: 0, totalPasivoSegundoAnio: 0 }
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalesActivos.totalActivosPrimerAnio, 2), x, y);

			var cuentatotalSus = totalesActivos.totalActivosPrimerAnio / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
			y += 20
			items++;
			doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			items++;
			y += 20
			for (var j = 0; j < cuentasSubGrupo.length && items <= itemsPorPagina; j++) {
				doc.font('Helvetica', 8);
				var cuenta = cuentasSubGrupo[j]
				if (cuenta.primerAno.clasificacion.nombre === "Pasivo" || cuenta.primerAno.clasificacion.nombre == 'Capital') {
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
						doc.font('Helvetica', 8);
					}
					doc.text(cuenta.primerAno.nombre, 30, y)
					cuenta.primerAno.total = 0
					cuenta.segundoAno.total = 0
					y = y + 20;
					items++;
					for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {
						var cuenta4 = cuentasGenericas[L]

						var cod = String(cuenta4.primerAno.codigo).substr(0, 3)
						if (cuenta.primerAno.codigo == cod) {
							if (cuentasApropiacion.some(function (cuenta2) {
								var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
								if (cuenta4.primerAno.codigo == cod) {
									return true
								} else {
									return false
								}
							})) {
								doc.text(cuenta4.primerAno.nombre, 40, y)
								cuenta4.primerAno.total = 0
								cuenta4.primerAno.totalSus = 0
								cuenta4.segundoAno.total = 0
								cuenta4.segundoAno.totalSus = 0
								/* y = y + 20;
								items++; */
								for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {
									var cuenta2 = cuentasApropiacion[p]
									cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
									if (cuenta2.primerAno.tipoCuenta.nombre_corto === "4") {
										var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
										if (cuenta4.primerAno.codigo == cod) {
											/* doc.text(cuenta2.nombre, 60, y)
											doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x, y);
											var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
											if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y); */
											cuenta4.primerAno.total += cuenta2.primerAno.saldo
											cuenta4.primerAno.totalSus += cuenta2.primerAno.saldo / $scope.moneda.dolar;
											cuenta.primerAno.total += cuenta2.primerAno.saldo
											cuenta4.segundoAno.total += cuenta2.segundoAno.saldo
											cuenta4.segundoAno.totalSus += cuenta2.segundoAno.saldo / $scope.moneda.dolar;
											cuenta.segundoAno.total += cuenta2.segundoAno.saldo
											totalesPasivo.totalPasivoPrimerAnio += cuenta2.primerAno.saldo
											totalesPasivo.totalPasivoSegundoAnio += cuenta2.segundoAno.saldo
											if (items == itemsPorPagina) {
												doc.addPage({ margin: 0, bufferPages: true });
												y = 140;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
												doc.font('Helvetica', 8);
											}
										} else {
											if (items == itemsPorPagina) {
												doc.addPage({ margin: 0, bufferPages: true });
												y = 140;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
												doc.font('Helvetica', 8);
											}
										}
									} else {
										if (items == itemsPorPagina) {
											doc.addPage({ margin: 0, bufferPages: true });
											y = 140;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
											doc.font('Helvetica', 8);
										}
									}


								}
								doc.text(cuenta4.primerAno.total, x, y)
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta4.primerAno.totalSus, 2), x + 80, y);
								doc.text(cuenta4.segundoAno.total, x + 180, y)
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta4.segundoAno.totalSus, 2), x + 260, y);
								y = y + 20;
								items++;
							}
						} else {
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
								doc.font('Helvetica', 8);
							}
						}



					}
					doc.text("TOTAL " + cuenta.primerAno.nombre, 90, y);
					doc.text(number_format_negativo_to_positvo(cuenta.primerAno.total, 2), x, y);
					doc.text(number_format_negativo_to_positvo(cuenta.segundoAno.total, 2), x + 180, y);
					var saldoSus = Math.round((cuenta.primerAno.total / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 80, y);
					var saldoSus = Math.round((cuenta.segundoAno.total / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 260, y);
					y = y + 20;
					items++;
				}
				if (j === (cuentasSubGrupo.length - 1)) {
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO:  ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalesPasivo.totalPasivoPrimerAnio, 2), x, y)
					var saldoSus = Math.round((totalesPasivo.totalPasivoPrimerAnio / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 80, y);
					doc.text(number_format_negativo_to_positvo(totalesPasivo.totalPasivoSegundoAnio, 2), x + 180, y)
					var saldoSus = Math.round((totalesPasivo.totalPasivoSegundoAnio / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 260, y);
				}
			}

		}
		$scope.dibujarIngresoEgresoPredefinido = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, totalVenta) {
			var totalPasivo = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL GASTOS DE OPERACIÓN  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y, {width: 80, align:'right'});
			if($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalActivos/$scope.moneda.dolar, 2), x+90, y, {width: 80, align:'right'});
			y += 24;
			items+=2;
			var totalPasivoR = 0;
			if(dato.cuentasPasivosPatrimonios.length > 0) 
			{
				doc.text("OTROS INGRESOS Y EGRESOS", 30, y);
				doc.font('Helvetica', 8);
				y += 12; 
				items++;
				for (var i = 0; i < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; i++) {
					cuentaGrupo = dato.cuentasPasivosPatrimonios[i]
					if (cuentaGrupo.hijos.length > 0) {
						for (var j = 0; j < cuentaGrupo.hijos.length && items <= itemsPorPagina; j++) {
							cuentaSubGrupo = cuentaGrupo.hijos[j]
							cuentaSubGrupo.total = 0
							doc.text(cuentaSubGrupo.nombre.toUpperCase(), 30, y)
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 115;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "OTROS INGRESOS Y EGRESOS");
								doc.font('Helvetica', 8);
							}
							for (var k = 0; k < cuentaSubGrupo.hijos.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = cuentaSubGrupo.hijos[k]
								cuentaGenerica.total = 0
								doc.text(cuentaGenerica.nombre, 40, y)
								for (var l = 0; l < cuentaGenerica.hijos.length && items <= itemsPorPagina; l++) {
									// cuentasApropiacion = cuentaGenerica.hijos[l]
									// cuentaGenerica.total += cuentasApropiacion.saldo
									// cuentaSubGrupo.total += cuentasApropiacion.saldo
									// totalPasivo += cuentasApropiacion.saldo

									// for (const cuentasiento of cuentaGenerica.hijos[l].cuenta) {

									// 	cuentasApropiacion = cuentaGenerica.hijos[l]
									// 	cuentaGenerica.total += (cuentasiento.haber_bs - cuentasiento.debe_bs)
									// 	cuentaSubGrupo.total += (cuentasiento.haber_bs - cuentasiento.debe_bs)
									// 	totalPasivo += (cuentasiento.haber_bs - cuentasiento.debe_bs)

									// }
									var cuentahijo = cuentaGenerica.hijos[l].cuenta;
									var debeBs = 0;
									var haberBs = 0;
									var saldoCA = 0;

									for (var p = 0; p < cuentahijo.length; p++) {
										var cuentasiento = cuentahijo[p]
										debeBs+= cuentasiento.debe_bs;
										haberBs+= cuentasiento.haber_bs;
										if (p === (cuentahijo.length - 1)) {
											saldoCA = (Math.round(haberBs * 10000) / 10000) - debeBs;
											cuentaGenerica.total += saldoCA
											cuentaSubGrupo.total += saldoCA
											totalPasivo += saldoCA
										}
									}
									
								}
								doc.text(number_format_negativo_to_positvo(cuentaGenerica.total, 2), x, y, {width: 80, align:'right'})
								if($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.total/$scope.moneda.dolar, 2), x+90, y, {width: 80, align:'right'})
								y = y + 12;
								items ++;
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 115;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "OTROS INGRESOS Y EGRESOS");
									doc.font('Helvetica', 8);
								}
							}

							doc.text("TOTAL " + cuentaSubGrupo.nombre.toUpperCase(), 90, y);
							if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total / $scope.moneda.dolar, 2), x + 90, y, {width: 80, align:'right'});
							doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 80, align:'right'})
							y = y + 24;
							items += 2;
							if (items >= itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 115;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "OTROS INGRESOS Y EGRESOS");
								doc.font('Helvetica', 8);
							}

						}
					}
					if (i === (dato.cuentasPasivosPatrimonios.length - 1)) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL OTROS INGRESOS Y EGRESOS", 30, y)
						totalPasivoR = Math.round(totalPasivo * 10000) / 10000;
						doc.text(number_format_negativo_to_positvo(totalPasivoR, 2), x, y, {width: 80, align: 'right'});
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoR/ $scope.moneda.dolar, 2), x + 90, y, {width: 80, align: 'right'});
						y += 12;
						items++;
					}
				}
			}
			var resultadoPeriodo = totalVenta - totalActivos + totalPasivoR;
			doc.text("RESULTADO DEL PERIODO", 30, y);
			doc.text(number_format_negativo_to_positvo(resultadoPeriodo, 2), x, y, {width: 80, align: 'right'});
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(resultadoPeriodo/$scope.moneda.dolar, 2), x+90, y, {width: 80, align: 'right'});
			items++;
			if(items < 46){
				if ($scope.configuracionImpresion.usar_firma_uno) {
					doc.text('-----------------------------------------------------------', 40, 720, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.firma_uno, 40, 726, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.cargo_uno, 40, 735, {width: 271, align:'center'});
				}
				if ($scope.configuracionImpresion.usar_firma_dos) {
					doc.text('-----------------------------------------------------------', 311, 720, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.firma_dos, 311, 726, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.cargo_dos, 311, 735, {width: 271, align:'center'});
				}
			}else{
				doc.addPage({ margin: 0, bufferPages: true });
				y = 115;
				items = 0;
				pagina = pagina + 1;
				$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
				doc.font('Helvetica', 8);
				if ($scope.configuracionImpresion.usar_firma_uno) {
					doc.text('-----------------------------------------------------------', 40, 720, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.firma_uno, 40, 726, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.cargo_uno, 40, 735, {width: 271, align:'center'});
				}
				if ($scope.configuracionImpresion.usar_firma_dos) {
					doc.text('-----------------------------------------------------------', 311, 720, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.firma_dos, 311, 726, {width: 271, align:'center'});
					doc.text($scope.configuracionImpresion.cargo_dos, 311, 735, {width: 271, align:'center'});
				}
			}

		}

		$scope.dibujarPatrimonioSubGrupo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				var totalPasivo = 0
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL ACTIVOS  ", 30, y);
				doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y);

				var cuentatotalSus = totalActivos / $scope.moneda.dolar
				if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
				y += 20
				items++;
				doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
				y += 20
				items++;
				for (var j = 0; j < dato.cuentasSubGrupo.length && items <= itemsPorPagina; j++) {
					doc.font('Helvetica', 8);
					var cuenta = dato.cuentasSubGrupo[j]
					if (cuenta.clasificacion.nombre === "Pasivo" || cuenta.clasificacion.nombre == 'Capital') {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						cuenta.total = 0
						cuenta.totalSus = 0
						/* y = y + 20;
						items++; */
						for (var L = 0; L < dato.cuentasGenericas.length && items <= itemsPorPagina; L++) {
							var cuenta4 = dato.cuentasGenericas[L]
							if (cuenta4.tipoCuenta.nombre_corto === "3") {
								var cod = String(cuenta4.codigo).substr(0, 3)
								if (cuenta.codigo == cod) {
									if (dato.cuentasApropiacion.some(function (cuenta2) {
										var cod = String(cuenta2.codigo).substr(0, 5)
										if (cuenta4.codigo == cod) {
											return true
										} else {
											return false
										}
									})) {

										for (var p = 0; p < dato.cuentasApropiacion.length && items <= itemsPorPagina; p++) {
											var cuenta2 = dato.cuentasApropiacion[p]
											if (cuenta2.tipoCuenta.nombre_corto === "4") {
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta4.codigo == cod) {
													cuenta.totalSus += cuenta2.saldo / $scope.moneda.dolar;
													cuenta.total += cuenta2.saldo
													totalPasivo += cuenta2.saldo
												}
											}
										}
									}
								}
							}
						}
						doc.text(cuenta.total, x, y)
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta.totalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var saldoSus = Math.round((cuenta.total / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
						y = y + 20;
						items++;
					}
					if (j === (dato.cuentasSubGrupo.length - 1)) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL PASIVO:  ", 30, y)
						doc.text(number_format_negativo_to_positvo(totalPasivo, 2), x, y)
						var saldoSus = Math.round((totalPasivo / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
					}
				}
			} else {

			}
		}
		$scope.dibujarPatrimonioGrupo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				var totalPasivo = 0
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL ACTIVOS  ", 30, y);
				doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y);

				var cuentatotalSus = totalActivos / $scope.moneda.dolar
				if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
				y += 20
				items++;
				doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
				y += 20
				items++;
				for (var i = 0; i < dato.cuentasGrupo.length && items <= itemsPorPagina; i++) {
					cuenta = dato.cuentasGrupo[i]
					cuenta.total = 0
					cuenta.totalSus = 0
					if (cuenta.clasificacion.nombre === "Pasivo" || cuenta.clasificacion.nombre === "Capital") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						for (var r = 0; r < dato.cuentasSubGrupo.length && items <= itemsPorPagina; r++) {
							cuenta4 = dato.cuentasSubGrupo[r]
							if (cuenta4.tipoCuenta.nombre_corto === "2") {
								var cod = String(cuenta4.codigo).substr(0, 1)
								if (cuenta.codigo == cod) {

									for (var L = 0; L < dato.cuentasGenericas.length && items <= itemsPorPagina; L++) {
										cuenta3 = dato.cuentasGenericas[L]
										if (cuenta3.tipoCuenta.nombre_corto === "3") {
											var cod = String(cuenta3.codigo).substr(0, 3)
											if (cuenta4.codigo == cod) {
												if (dato.cuentasApropiacion.some(function (cuenta2) {
													var cod = String(cuenta2.codigo).substr(0, 5)
													if (cuenta3.codigo == cod) {
														return true
													} else {
														return false
													}
												})) {
													for (var p = 0; p < dato.cuentasApropiacion.length && items <= itemsPorPagina; p++) {
														cuenta2 = dato.cuentasApropiacion[p]
														if (cuenta2.tipoCuenta.nombre_corto === "4") {
															var cod = String(cuenta2.codigo).substr(0, 5)
															if (cuenta3.codigo == cod) {
																cuenta.total += cuenta2.saldo
																cuenta.totalSus += cuenta2.saldo
																totalPasivo += cuenta2.saldo
															}
														}
													}

												}
											}
										}

									}
								}
							}
						}

						doc.text(cuenta.total, x, y)
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta.totalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var saldoSus = Math.round((cuenta.total / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
						y = y + 20;
						items++;
					}
					if (i === (dato.cuentasGrupo.length - 1)) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL PASIVO:  ", 30, y)
						doc.text(number_format_negativo_to_positvo(totalPasivo, 2), x, y)
						var saldoSus = Math.round((totalPasivo / $scope.moneda.dolar) * 10000) / 10000;
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
					}
				}
			} else {

			}
		}
		$scope.generarPdfPreComparativo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {

		}
		$scope.generarPdfGrupo = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				var doc = new PDFDocument({ size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;
				var datos = []
				var datosPasivo = []
				var y = 130, itemsPorPagina = 28, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos.length + datosPasivo.length) / itemsPorPagina) : Math.ceil((datos.length + datosPasivo.length) / itemsPorPagina);
				var totalActivos = 0
				var totalPasivo = 0
				$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
				doc.font('Helvetica', 8);
				for (var i = 0; i < cuentasGrupo.length && items <= itemsPorPagina; i++) {
					cuenta = cuentasGrupo[i]
					cuenta.total = 0
					cuenta.totalSus = 0
					if (cuenta.clasificacion.nombre === "Activo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						for (var r = 0; r < cuentasSubGrupo.length && items <= itemsPorPagina; r++) {
							cuenta4 = cuentasSubGrupo[r]
							if (cuenta4.tipoCuenta.nombre_corto === "2") {
								var cod = String(cuenta4.codigo).substr(0, 1)
								if (cuenta.codigo == cod) {

									for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {
										cuenta3 = cuentasGenericas[L]
										if (cuenta3.tipoCuenta.nombre_corto === "3") {
											var cod = String(cuenta3.codigo).substr(0, 3)
											if (cuenta4.codigo == cod) {
												if (cuentasApropiacion.some(function (cuenta2) {
													var cod = String(cuenta2.codigo).substr(0, 5)
													if (cuenta3.codigo == cod) {
														return true
													} else {
														return false
													}
												})) {
													for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {
														cuenta2 = cuentasApropiacion[p]
														cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
														if (cuenta2.tipoCuenta.nombre_corto === "4") {
															var cod = String(cuenta2.codigo).substr(0, 5)
															if (cuenta3.codigo == cod) {
																cuenta.total += cuenta2.saldo
																cuenta.totalSus += cuenta2.saldo
																totalActivos += cuenta2.saldo
															}
														}
													}

												}
											}
										}

									}
								}
							}
						}
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta.totalSus, 2), x + 130, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y)
						y = y + 20;
						items++;
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var cuentatotalSus = cuenta.total / $scope.moneda.dolar
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						if (i === (cuentasGrupo.length - 1)) {
							$scope.DibujarFijoGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
						/* 	y = y + 20;
							items++; */
					} else {
						if (i === (cuentasGrupo.length - 1)) {
							$scope.DibujarFijoGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
					}

				}
				if ($scope.configuracionImpresion.usar_firma_uno) {
					doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
					doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
				}
				if ($scope.configuracionImpresion.usar_firma_dos) {
					doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
					doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			} else {

			}
		}

		$scope.generarPdfsubGrupo = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				var doc = new PDFDocument({ size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;
				var datos = []
				var datosPasivo = []
				var y = 130, itemsPorPagina = 28, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos.length + datosPasivo.length) / itemsPorPagina) : Math.ceil((datos.length + datosPasivo.length) / itemsPorPagina);
				var totalActivos = 0
				var totalPasivo = 0
				$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
				doc.font('Helvetica', 8);
				for (var i = 0; i < cuentasSubGrupo.length && items <= itemsPorPagina; i++) {
					cuenta = cuentasSubGrupo[i]
					cuenta.total = 0

					if (cuenta.clasificacion.nombre === "Activo") {
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						doc.text(cuenta.nombre, 30, y)
						for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {
							cuenta3 = cuentasGenericas[L]
							if (cuenta3.tipoCuenta.nombre_corto === "3") {
								var cod = String(cuenta3.codigo).substr(0, 3)
								if (cuenta.codigo == cod) {
									if (cuentasApropiacion.some(function (cuenta2) {
										var cod = String(cuenta2.codigo).substr(0, 5)
										if (cuenta3.codigo == cod) {
											return true
										} else {
											return false
										}
									})) {
										for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {
											cuenta2 = cuentasApropiacion[p]
											cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
											if (cuenta2.tipoCuenta.nombre_corto === "4") {
												var cod = String(cuenta2.codigo).substr(0, 5)
												if (cuenta3.codigo == cod) {
													cuenta.total += cuenta2.saldo
													cuenta.totalSus += cuenta2.saldo
													totalActivos += cuenta2.saldo
												}
											}
										}

									}
								}
							}

						}
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta.totalSus, 2), x + 130, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y)
						y = y + 20;
						items++;
						doc.text("TOTAL " + cuenta.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuenta.total, 2), x, y);
						var cuentatotalSus = cuenta.total / $scope.moneda.dolar
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
						y = y + 20;
						items++;
						if (i === (cuentasSubGrupo.length - 1)) {
							$scope.DibujarFijoSubGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
						/* 	y = y + 20;
							items++; */
					} else {
						if (i === (cuentasSubGrupo.length - 1)) {
							$scope.DibujarFijoSubGrupo(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

						}
					}

				}
				if ($scope.configuracionImpresion.usar_firma_uno) {
					doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
					doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
				}
				if ($scope.configuracionImpresion.usar_firma_dos) {
					doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
					doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			} else {

			}
		}

		
		$scope.generarPdfComprobantePreestablecido = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
			cuentasGenericasFijo,
			cuentasApropiacionFijo) {

			var doc = new PDFDocument({ size: 'letter', margin: 10 });
			var stream = doc.pipe(blobStream());
			// draw some text
			var totalCosto = 0;
			var datos = cuentasSubGrupo.length + cuentasGenericas.length
			var datosPasivo = []
			var y = 130, itemsPorPagina = 28, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
			var totalesActivos = { totalActivosPrimerAnio: 0, totalActivosSegundoAnio: 0 }
			var totalesPasivos = { totalPasivosPrimerAnio: 0, totalPasivosSegundoAnio: 0 }
			$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
			doc.font('Helvetica', 8);
			for (var i = 0; i < cuentasSubGrupo.length && items <= itemsPorPagina; i++) {
				cuenta = cuentasSubGrupo[i]
				cuenta.total = 0

				if (cuenta.primerAno.clasificacion.nombre === "Activo") {
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
						doc.font('Helvetica', 8);
					}
					doc.text(cuenta.primerAno.nombre, 30, y)
					/*doc.text(number_format_negativo_to_positvo(cuenta.saldo,2), 530, y); */
					/* total+=cuenta.saldo */
					cuenta.primerAno.total = 0
					cuenta.primerAno.totalSus = 0
					cuenta.segundoAno.total = 0
					cuenta.segundoAno.totalSus = 0
					y = y + 20;
					items++;

					for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {
						cuenta3 = cuentasGenericas[L]
						if (cuenta3.primerAno.tipoCuenta.nombre_corto === "3") {
							var cod = String(cuenta3.primerAno.codigo).substr(0, 3)
							if (cuenta.primerAno.codigo == cod) {
								if (cuentasApropiacion.some(function (cuenta2) {
									var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
									if (cuenta3.primerAno.codigo == cod) {
										return true
									} else {
										return false
									}
								})) {
									doc.text(cuenta3.primerAno.nombre, 40, y)
									cuenta3.primerAno.total = 0
									cuenta3.primerAno.totalSus = 0
									cuenta3.segundoAno.total = 0
									cuenta3.segundoAno.totalSus = 0
									/*  y = y + 20;
									items++; */


									for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {
										cuenta2 = cuentasApropiacion[p]
										cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
										if (cuenta2.primerAno.tipoCuenta.nombre_corto === "4") {
											var cod = String(cuenta2.primerAno.codigo).substr(0, 5)
											if (cuenta3.primerAno.codigo == cod) {
												/* doc.text(cuenta2.nombre, 60, y) */
												/* doc.text(number_format_negativo_to_positvo(cuenta2.saldo, 2), x, y); */
												cuenta3.primerAno.totalSus += cuenta2.primerAno.saldo / $scope.moneda.dolar;
												cuenta3.segundoAno.totalSus += cuenta2.segundoAno.saldo / $scope.moneda.dolar;
												//if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
												cuenta3.primerAno.total += cuenta2.primerAno.saldo
												cuenta.primerAno.total += cuenta2.primerAno.saldo
												cuenta3.segundoAno.total += cuenta2.segundoAno.saldo
												cuenta.segundoAno.total += cuenta2.segundoAno.saldo
												totalesActivos.totalActivosPrimerAnio += cuenta2.primerAno.saldo
												totalesActivos.totalActivosSegundoAnio += cuenta2.segundoAno.saldo
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
													doc.font('Helvetica', 8);
												}
											} else {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
													doc.font('Helvetica', 8);
												}
											}
										} else {
											if (items == itemsPorPagina) {
												doc.addPage({ margin: 0, bufferPages: true });
												y = 140;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
												doc.font('Helvetica', 8);
											}
										}


									}
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta3.primerAno.totalSus, 2), x + 80, y);
									doc.text(number_format_negativo_to_positvo(cuenta3.primerAno.total, 2), x + 180, y)
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuenta3.segundoAno.totalSus, 2), x + 260, y);
									doc.text(number_format_negativo_to_positvo(cuenta3.segundoAno.total, 2), x, y)
									y = y + 20;
									items++;
								}
							} else {
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
									doc.font('Helvetica', 8);
								}
							}
						} else {
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFEstadoResultado(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
						}


					}
					doc.text("TOTAL " + cuenta.primerAno.nombre, 90, y);
					doc.text(number_format_negativo_to_positvo(cuenta.primerAno.total, 2), x, y);
					doc.text(number_format_negativo_to_positvo(cuenta.segundoAno.total, 2), x + 180, y);
					var cuentatotalSus = cuenta.primerAno.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 80, y);
					var cuentatotalSus = cuenta.segundoAno.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 260, y);
					y = y + 20;
					items++;
					if (i === (cuentasSubGrupo.length - 1)) {
						$scope.DibujarFijoComparativoPreestablecido(dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
						//$scope.dibujarPatrimonioPredefinido(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (cuentasSubGrupo.length - 1)) {
						$scope.DibujarFijoComparativoPreestablecido(dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
							cuentasGenericasFijo,
							cuentasApropiacionFijo)
						//$scope.dibujarPatrimonioPredefinido(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
				}

			}
			if ($scope.configuracionImpresion.usar_firma_uno) {
				doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
				doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
			}
			if ($scope.configuracionImpresion.usar_firma_dos) {
				doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
				doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
			}

			doc.end();
			stream.on('finish', function () {
				var fileURL = stream.toBlobURL('application/pdf');
				window.open(fileURL, '_blank', 'location=no');
			});
			blockUI.stop();

		}


		///impresion exel
		$scope.generarExcelBalanceGeneral = function (configuracionImpresion) {
			var promesa = CuentasContabilidadEstadoResultadoEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (dato) {
				$scope.Cuentas = dato.cuentas;


				var data = [["", "", "ESTADO CUENTAS PROVEEDOR"], ["Deudor :" + proveedor.razon_social], ["Fecha", "N Recibo", "Descripción", "monto", "total", "total General"]]
				var totalCosto = 0;
				for (var i = 0; i < proveedor.compras.length; i++) {
					var columns = [];
					totalCosto = totalCosto + proveedor.compras[i].saldo;
					proveedor.compras[i].fecha = new Date(proveedor.compras[i].fecha);
					columns.push(proveedor.compras[i].fecha.getDate() + "/" + (proveedor.compras[i].fecha.getMonth() + 1) + "/" + proveedor.compras[i].fecha.getFullYear());
					columns.push(proveedor.compras[i].id_movimiento);
					if (proveedor.compras[i].factura == null) {
						columns.push('PROFORMA');
					} else {
						columns.push('factura : ' + proveedor.compras[i].factura);
					}
					columns.push(proveedor.compras[i].saldo);
					columns.push(totalCosto);
					columns.push(totalCosto);
					data.push(columns);
				}

				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-CUENTA-PROVEEDOR.xlsx");
				blockUI.stop();
			})
		}
		$scope.dibujarCabeceraExelBalanceGeneral = function () {
			var textoTipoFiltro = ""
			var textoExpresado = ""
			if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'GES') {
				var anioActual = new Date().getFullYear()
				var mesActual = new Date().getMonth()
				var ultimoDiaMes = new Date(anioActual, mesActual - 1, 0).getDate();
				if ($scope.configuracionImpresion.gestion.nombre < anioActual) {
					textoTipoFiltro = "Al 31 de Diciembre de " + $scope.configuracionImpresion.gestion.nombre;
				} else {
					textoTipoFiltro = "Al " + ultimoDiaMes + " de " + $scope.meses[mesActual].nombre + " de " + $scope.configuracionImpresion.gestion.nombre;
				}

			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'MES') {
				textoTipoFiltro = $scope.configuracionImpresion.mes.nombre + " de " + $scope.configuracionImpresion.gestion.nombre;
			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'FECHAS') {
				var fechaInicio = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				var FechaFin = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
				textoTipoFiltro = "Desde el " + fechaInicio.getDate() + " de " + $scope.meses[fechaInicio.getMonth()].nombre + " " + fechaInicio.getFullYear() + " al " + FechaFin.getDate() + " de " + $scope.meses[FechaFin.getMonth()].nombre + " de " + FechaFin.getFullYear();
			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'COMP') {
				textoTipoFiltro = "Gestión " + $scope.configuracionImpresion.gestion.nombre + "- Gestión " + $scope.configuracionImpresion.gestion_fin.nombre;
			}
			if ($scope.configuracionImpresion.bimonetario) {
				textoExpresado = "Expresado en Bolivianos y Dólares";

				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS', "", 'DOLARES']
			} else {
				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS']
				textoExpresado = "Expresado en Bolivianos";
			}

			var arregloCabezera = [["", "", "", "BALANCE GENERAL"], ["", "", "", textoTipoFiltro], ["", "", "", textoExpresado], arregloDatos]
			return arregloCabezera
		}

		$scope.generarExelApropiacion = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {
			var totalActivos = 0;
			var data = $scope.dibujarCabeceraExelBalanceGeneral()

			for (var i = 0; i < cuentasSubGrupo.length; i++) {
				var columns = [];
				cuenta = cuentasSubGrupo[i]
				cuenta.total = 0

				if (cuenta.clasificacion.nombre === "Activo") {
					columns.push("")
					columns.push(cuenta.nombre)
					data.push(columns);

					for (var L = 0; L < cuentasGenericas.length; L++) {
						columns = []
						cuenta3 = cuentasGenericas[L]

						var cod = String(cuenta3.codigo).substr(0, 3)
						if (cuenta.codigo == cod) {
							if (cuentasApropiacion.some(function (cuenta2) {
								var cod = String(cuenta2.codigo).substr(0, 5)
								if (cuenta3.codigo == cod) {
									return true
								} else {
									return false
								}
							})) {
								columns.push("")
								columns.push("")
								columns.push(cuenta3.nombre)
								data.push(columns);

								for (var p = 0; p < cuentasApropiacion.length; p++) {
									columns = []
									cuenta2 = cuentasApropiacion[p]

									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										columns.push("")
										columns.push("")
										columns.push("")
										columns.push(cuenta2.nombre)
										columns.push("")
										columns.push(number_format_negativo_to_positvo(cuenta2.saldo, 2));
										var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
										if ($scope.configuracionImpresion.bimonetario) columns.push(""); columns.push(number_format_negativo_to_positvo(saldoSus, 2));
										cuenta.total += cuenta2.saldo
										totalActivos += cuenta2.saldo
										data.push(columns);
									}

								}
							}
						}
					}

					columns = []
					/* columns.push("")
					columns.push("")
					columns.push("")
					data.push("TOTAL " + cuenta.nombre);
					data.push(number_format_negativo_to_positvo(cuenta.total, 2));
					columns.push("")
					var cuentatotalSus = cuenta.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) columns.push(""); data.push(number_format_negativo_to_positvo(cuentatotalSus, 2)); */
					if (i === (cuentasSubGrupo.length - 1)) {
						//$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (cuentasSubGrupo.length - 1)) {
						//	$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
				}

			}
			if ($scope.configuracionImpresion.usar_firma_uno) {
				//doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
				//doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
			}
			if ($scope.configuracionImpresion.usar_firma_dos) {
				//doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
				//doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
			}

			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-BALANCE-GENERAL.xlsx");

			blockUI.stop();

		}


		//impresion en word
		$scope.descargarArchivo = function (contenidoEnBlob, nombreArchivo) {
			var reader = new FileReader();
			reader.onload = function (event) {
				var save = document.createElement('a');
				save.href = event.target.result;
				save.target = '_blank';
				save.download = nombreArchivo || 'archivo.dat';
				var clicEvent = new MouseEvent('click', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
				save.dispatchEvent(clicEvent);
				(window.URL || window.webkitURL).revokeObjectURL(save.href);
			};
			reader.readAsDataURL(contenidoEnBlob);
		};
		$scope.dibujarCabeceraWordBalanceGeneral = function () {
			var textoTipoFiltro = ""
			var textoExpresado = ""
			if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'GES') {
				var anioActual = new Date().getFullYear()
				var mesActual = new Date().getMonth()
				var ultimoDiaMes = new Date(anioActual, mesActual - 1, 0).getDate();
				if ($scope.configuracionImpresion.gestion.nombre < anioActual) {
					textoTipoFiltro = "Al 31 de Diciembre de " + $scope.configuracionImpresion.gestion.nombre;
				} else {
					textoTipoFiltro = "Al " + ultimoDiaMes + " de " + $scope.meses[mesActual].nombre + " de " + $scope.configuracionImpresion.gestion.nombre;
				}

			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'MES') {
				textoTipoFiltro = $scope.configuracionImpresion.mes.nombre + " de " + $scope.configuracionImpresion.gestion.nombre;
			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'FECHAS') {
				var fechaInicio = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				var FechaFin = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
				textoTipoFiltro = "Desde el " + fechaInicio.getDate() + " de " + $scope.meses[fechaInicio.getMonth()].nombre + " " + fechaInicio.getFullYear() + " al " + FechaFin.getDate() + " de " + $scope.meses[FechaFin.getMonth()].nombre + " de " + FechaFin.getFullYear();
			} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'COMP') {
				textoTipoFiltro = "Gestión " + $scope.configuracionImpresion.gestion.nombre + "- Gestión " + $scope.configuracionImpresion.gestion_fin.nombre;
			}
			if ($scope.configuracionImpresion.bimonetario) {
				textoExpresado = "Expresado en Bolivianos y Dólares";

				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS', "", 'DOLARES']
			} else {
				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS']
				textoExpresado = "Expresado en Bolivianos";
			}

			var arregloCabezera = "\t\t\t\t\tBALANCE GENERAL\r\n" + "\t\t\t\t\t" + textoTipoFiltro + "\r\n" + "\t\t\t\t" + textoExpresado + "\r\n"
			return arregloCabezera
		}
		$scope.generarWordApropiacion = function (dato, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion) {
			var cabezera = $scope.dibujarCabeceraWordBalanceGeneral()

			var texto = []

			texto.push(cabezera)

			var totalActivos = 0;
			var data = $scope.dibujarCabeceraExelBalanceGeneral()
			var datos = cuentasSubGrupo.length + cuentasGenericas.length + cuentasApropiacion.length
			var datosPasivo = []
			var y = 130, itemsPorPagina = 51, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
			for (var i = 0; i < cuentasSubGrupo.length && items <= itemsPorPagina; i++) {

				cuenta = cuentasSubGrupo[i]
				cuenta.total = 0

				if (cuenta.clasificacion.nombre === "Activo") {
					if (items == itemsPorPagina) {
						items = 0;
						pagina = pagina + 1;
						texto.push(cabezera)

					}
					texto.push(cuenta.nombre + "\r\n")
					items++

					for (var L = 0; L < cuentasGenericas.length && items <= itemsPorPagina; L++) {

						cuenta3 = cuentasGenericas[L]

						var cod = String(cuenta3.codigo).substr(0, 3)
						if (cuenta.codigo == cod) {
							if (cuentasApropiacion.some(function (cuenta2) {
								var cod = String(cuenta2.codigo).substr(0, 5)
								if (cuenta3.codigo == cod) {
									return true
								} else {
									return false
								}
							})) {
								texto.push("\t")
								texto.push(cuenta3.nombre + "\r\n")
								items++
								if (items == itemsPorPagina) {
									items = 0;
									pagina = pagina + 1;
									texto.push(cabezera)

								}
								for (var p = 0; p < cuentasApropiacion.length && items <= itemsPorPagina; p++) {

									cuenta2 = cuentasApropiacion[p]
									cuenta2.saldo = (cuenta2.debe > cuenta2.haber) ? cuenta2.saldo : -(cuenta.saldo)
									var cod = String(cuenta2.codigo).substr(0, 5)
									if (cuenta3.codigo == cod) {
										texto.push("\t\t")
										if (cuenta2.nombre.length > 22) {
											text1 = String(cuenta2.nombre).substr(0, 22)
											text2 = String(cuenta2.nombre).substr(22)
											texto.push(text1)
											texto.push("\n\r\t\t"); items++
											texto.push(text2)
											texto.push("\t")
										} else {
											texto.push(cuenta2.nombre)
											texto.push("\t")
										}
										/* texto.push(cuenta2.nombre)
										texto.push("\t") */
										texto.push(number_format_negativo_to_positvo(cuenta2.saldo, 2));
										var saldoSus = cuenta2.saldo / $scope.moneda.dolar;
										if ($scope.configuracionImpresion.bimonetario) texto.push("\t\t" + number_format_negativo_to_positvo(saldoSus, 2));
										cuenta.total += cuenta2.saldo
										totalActivos += cuenta2.saldo
										texto.push("\r\n")
										items++
										if (items == itemsPorPagina) {
											items = 0;
											pagina = pagina + 1;
											texto.push(cabezera)

										}
									}

								}
							}
						}
					}


					texto.push("\t")
					texto.push("TOTAL " + cuenta.nombre);
					texto.push("\t\t\t\t")
					texto.push(number_format_negativo_to_positvo(cuenta.total, 2));

					var cuentatotalSus = cuenta.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) texto.push("\t\t\t\t"); texto.push(number_format_negativo_to_positvo(cuentatotalSus, 2));
					if (i === (cuentasSubGrupo.length - 1)) {
						//$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
					/* 	y = y + 20;
						items++; */
				} else {
					if (i === (cuentasSubGrupo.length - 1)) {
						//	$scope.DibujarFijoApropiacion(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						//$scope.dibujarPatrimonio(dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)

					}
				}

			}
			if ($scope.configuracionImpresion.usar_firma_uno) {
				//doc.text($scope.configuracionImpresion.firma_uno, 170, 720);
				//doc.text($scope.configuracionImpresion.cargo_uno, 170, 730);
			}
			if ($scope.configuracionImpresion.usar_firma_dos) {
				//doc.text($scope.configuracionImpresion.firma_dos, 370, 720);
				//doc.text($scope.configuracionImpresion.cargo_dos, 370, 730);
			}

			blockUI.stop();
			return new Blob(texto, {
				type: 'text/plain'
			});
		}

		// EMPRESA COMERCIAL
		$scope.generarPdf = () =>{
			if($scope.fechasImpresion.tipoGestion){
				$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					var nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") 			nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") 		nivel = 1;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") 		nivel = 2;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") 		nivel = 3;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO")	nivel = 2;
					var x = $scope.configuracionImpresion.bimonetario ? 380 : 480;
						//$scope.generarDocumento(cuentas, x, nivel)
					switch($scope.fechasImpresion.tipoGestion.nombre){
						case "COMERCIAL":
							if($scope.configuracionImpresion.cencos){
								if( $scope.configuracionImpresion.cencos.length > 0 ) {
									$scope.configuracionImpresion.cencosSeleccionados=$scope.configuracionImpresion.cencos.map(c=>c.id).join();
								}else{
									$scope.configuracionImpresion.cencosSeleccionados=[]
								}
							}else { $scope.configuracionImpresion.cencosSeleccionados=[] }
							let cuentasEstadoResultado = ObtenerCuentasEstadoResultado($scope.configuracionImpresion, $scope.usuario.id_empresa);
							cuentasEstadoResultado.then(async cuentas=>{
								if(!cuentas.hasError){
									await convertUrlToBase64Image($scope.usuario.empresa.imagen, function (imagenLg) {
										var doc = new PDFDocument({compress: false, size: 'letter', margin: 10 });
										var stream = doc.pipe(blobStream());
										var pagina = 1, y, x, l=35;
										$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
										doc.font('Helvetica', 8);
										if($scope.configuracionImpresion.bimonetario){
											 y=135
											 x=420
										}else{
											y=111
											x=465
										}
										var resultado = cuentas.data.reduce((ac,val, i)=> val.tipo_saldo === "ACHA" ? ac+=val.saldoBs : ac-=val.saldoBs, 0)
										if($scope.configuracionImpresion.bimonetario){
											var resultado_sus = cuentas.data.reduce((ac,val, i)=> val.tipo_saldo === "ACHA" ? ac+=val.saldoSus : ac-=val.saldoSus, 0)
										}
										if(nivel==0){
											for (let i = 0; i < cuentas.data.length; i++) {
												var cuenta = cuentas.data[i];
												$scope.configuracionImpresion.codigos ?  doc.font('Helvetica', 8).text(cuenta.nombre.toUpperCase(), l + 35, y) : doc.font('Helvetica', 8).text(cuenta.nombre.toUpperCase(), l, y);
												if($scope.configuracionImpresion.codigos) doc.text(cuenta.codigo, l, y, {width: 33, align:'right'})
												doc.text(cuenta.saldoBs >= 0 ? number_format_negativo_to_positvo(cuenta.saldoBs, 2) : '-'+number_format_negativo_to_positvo(cuenta.saldoBs, 2), x, y, { width:65, align: 'right'} )
												if($scope.configuracionImpresion.bimonetario) doc.text(cuenta.saldoSus >= 0 ? number_format_negativo_to_positvo(cuenta.saldoSus, 2) : '-'+number_format_negativo_to_positvo(cuenta.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
												y += 12;
												$scope.configuracionImpresion.codigos ? doc.font('Helvetica-Bold', 8).text('TOTAL '+cuenta.nombre.toUpperCase(), l + 35, y) : doc.font('Helvetica-Bold', 8).text('TOTAL '+cuenta.nombre.toUpperCase(), l, y);
												doc.text(cuenta.saldoBs >= 0 ? number_format_negativo_to_positvo(cuenta.saldoBs, 2) : '-'+number_format_negativo_to_positvo(cuenta.saldoBs, 2), x, y, { width:65, align: 'right'} )
												if($scope.configuracionImpresion.bimonetario) doc.text(cuenta.saldoSus >= 0 ? number_format_negativo_to_positvo(cuenta.saldoSus, 2) : '-'+number_format_negativo_to_positvo(cuenta.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
												y+=20;
											}
											doc.rect(35, y-3, 535, 12).fill('#E0E6E9').fillColor('#000');
											doc.font('Helvetica-Bold', 8);
											$scope.configuracionImpresion.codigos ? doc.text('RESULTADO DEL PERIODO', l + 35, y) : doc.text('RESULTADO DEL PERIODO', 40, y);
											doc.text(resultado >= 0 ? number_format_negativo_to_positvo(resultado, 2) : '-'+number_format_negativo_to_positvo(resultado, 2), x, y, { width:65, align: 'right'} )
											if($scope.configuracionImpresion.bimonetario) doc.text(resultado_sus >= 0 ? number_format_negativo_to_positvo(resultado_sus, 2) : '-'+number_format_negativo_to_positvo(resultado_sus, 2), x + 80, y, { width:65, align: 'right'} )
											$scope.dibujarFirmas(doc);
										}else{
											var datos = []
											var primera = true;
											var ingresos = cuentas.data[0].subgrupos
											var gastos =cuentas.data[1].subgrupos
											var ing_corrientes=ingresos.shift();
											datos.push(ing_corrientes)
											/* var costoVentas = gastos.shift();
											datos.push(costoVentas) */
											var otros_gastos=gastos.pop()
											for (let i = 0; i < gastos.length; i++) { datos.push(gastos[i])}
											for (let i = 0; i < ingresos.length; i++) { datos.push(ingresos[i]) }
											datos.push(otros_gastos)
											console.log('datos er', cuentas);
											for (let j = 0; j < datos.length; j++) {
												var subgrupo=datos[j];
												if(datos.length-2 === j || datos.length-1 === j){
													if(nivel > 1 && datos.length-2 === j) y-=12;
													doc.font('Helvetica-Bold', 8)
													if(primera) {
														$scope.configuracionImpresion.codigos ? doc.text(subgrupo.codigo +"  "+titulo, l, y) : doc.text(titulo, l, y);
														primera=false;
													}
													if(datos.length-2 === j){
														doc.text(totalBs >= 0 ? number_format_negativo_to_positvo(totalBs, 2) : '-'+number_format_negativo_to_positvo(totalBs, 2), x, y, { width:65, align: 'right'} )
														doc.lineWidth(0.3).rect(x, y-2, 65, 0).stroke();
														if($scope.configuracionImpresion.bimonetario) {
															doc.text(totalSus >= 0 ? number_format_negativo_to_positvo(totalSus, 2) : '-'+number_format_negativo_to_positvo(totalSus, 2), x + 80, y, { width:65, align: 'right'} )
															doc.rect(x+80, y-2, 65, 0).stroke();
														}
														if(datos.length-2 === j) y+=12;
													}
													y+=24;
													if(y >= 720){
														doc.addPage({ margin: 0, bufferPages: true });
														if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
													}
													nivel > 1 ? doc.font('Helvetica-Bold', 8) : doc.font('Helvetica', 8)
													$scope.configuracionImpresion.codigos ? doc.text(subgrupo.codigo + "  "+subgrupo.nombre, l, y) : doc.text(subgrupo.nombre, l, y);
													if(nivel === 1){
														doc.text(subgrupo.saldoBs >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoBs, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoBs, 2), x, y, { width:65, align: 'right'} )
														if($scope.configuracionImpresion.bimonetario) doc.text(subgrupo.saldoSus >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoSus, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
													}
													if(nivel>1){
														for (let q = 0; q < subgrupo.genericas.length; q++) {
															let generica = subgrupo.genericas[q];
															y+=12;
															if(y >= 720){
																doc.addPage({ margin: 0, bufferPages: true });
																if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																pagina = pagina + 1;
																$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
															}	
															nivel > 2 ? doc.font('Helvetica-Bold', 8) : doc.font('Helvetica', 8)
															$scope.configuracionImpresion.codigos ? doc.text(generica.codigo + "  "+generica.nombre.toUpperCase(), l + 5, y) : doc.text(generica.nombre.toUpperCase(), l + 5, y);
															if(nivel === 2){
																doc.text(generica.saldoBs >= 0 ? number_format_negativo_to_positvo(generica.saldoBs, 2) : '-'+number_format_negativo_to_positvo(generica.saldoBs, 2), x, y, { width:65, align: 'right'} )
																if($scope.configuracionImpresion.bimonetario) doc.text(generica.saldoSus >= 0 ? number_format_negativo_to_positvo(generica.saldoSus, 2) : '-'+number_format_negativo_to_positvo(generica.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
															}
															if(nivel > 2){
																for (let c = 0; c < generica.apropiaciones.length; c++) {
																	var apropiacion = generica.apropiaciones[c];
																	y+=12;
																	if(y >= 720){
																		doc.addPage({ margin: 0, bufferPages: true });
																		if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																		pagina = pagina + 1;
																		$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																	}
																	doc.font('Helvetica', 8)
																	$scope.configuracionImpresion.codigos ? doc.text(apropiacion.codigo +"  "+apropiacion.nombre.toUpperCase(), l + 10, y) : doc.text(apropiacion.nombre.toUpperCase(), l + 10, y);
																	apropiacion.tipoSaldo === "ACHA" ? apropiacion.saldoBs = apropiacion.haber - apropiacion.debe : apropiacion.saldoBs = apropiacion.debe - apropiacion.haber;

																	doc.text(apropiacion.saldoBs >= 0 ? number_format_negativo_to_positvo(apropiacion.saldoBs, 2) : '-'+number_format_negativo_to_positvo(apropiacion.saldoBs, 2), x, y, { width:65, align: 'right'} )
																	if($scope.configuracionImpresion.bimonetario) {
																		apropiacion.tipoSaldo === "ACHA" ? apropiacion.saldoSus = apropiacion.haber_sus - apropiacion.debe_sus : apropiacion.saldoSus = apropiacion.debe_sus - apropiacion.haber_sus;
																		doc.text(apropiacion.saldoSus >= 0 ? number_format_negativo_to_positvo(apropiacion.saldoSus, 2) : '-'+number_format_negativo_to_positvo(apropiacion.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
																	}
																}
																y+=12;
																if(y >= 720){
																	doc.addPage({ margin: 0, bufferPages: true });
																	if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																}
																doc.font('Helvetica-Bold', 8)
																doc.text('TOTAL '+ generica.nombre.toUpperCase(), l, y);
																doc.text(generica.saldoBs >= 0 ? number_format_negativo_to_positvo(generica.saldoBs, 2) : '-'+number_format_negativo_to_positvo(generica.saldoBs, 2), x, y, { width:65, align: 'right'} )
																if($scope.configuracionImpresion.bimonetario) doc.text(generica.saldoSus >= 0 ? number_format_negativo_to_positvo(generica.saldoSus, 2) : '-'+number_format_negativo_to_positvo(generica.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
																y+=6;
																if(y >= 720){
																	doc.addPage({ margin: 0, bufferPages: true });
																	if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																}
															}
														}
													}
													doc.font('Helvetica-Bold', 8);
													titulo = "TOTAL " + subgrupo.nombre.toUpperCase();											
													y+=12;
													if(y >= 720){
														doc.addPage({ margin: 0, bufferPages: true });
														if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
													}
													doc.font('Helvetica-Bold', 8)
													$scope.configuracionImpresion.codigos ? doc.text(titulo.toUpperCase(), l, y) : doc.text(titulo.toUpperCase(), l, y);
													doc.text(subgrupo.saldoBs >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoBs, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoBs, 2), x, y, { width:65, align: 'right'} )
													doc.lineWidth(0.5).rect(x, y-2, 65, 0).stroke();
													if($scope.configuracionImpresion.bimonetario) {
														doc.text(subgrupo.saldoSus >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoSus, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
														doc.rect(x+80, y-2, 65, 0).stroke();
													}
												}else{
													nivel > 1 ? doc.font('Helvetica-Bold', 8) : doc.font('Helvetica', 8)
													j === 0 ? $scope.configuracionImpresion.codigos ? doc.text(subgrupo.codigo + "  "+ subgrupo.nombre.toUpperCase(), l, y) : doc.text(subgrupo.nombre.toUpperCase(), l, y) : $scope.configuracionImpresion.codigos ? doc.text(subgrupo.codigo + "  "+ subgrupo.nombre.toUpperCase(), l+5, y) : doc.text(subgrupo.nombre.toUpperCase(), l+5, y);
													if(nivel === 1){
														doc.text(subgrupo.saldoBs >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoBs, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoBs, 2), x, y, { width:65, align: 'right'} )
														if($scope.configuracionImpresion.bimonetario) doc.text(subgrupo.saldoSus >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoSus, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
													}
													if(nivel>1){
														for (let q = 0; q < subgrupo.genericas.length; q++) {
															let generica = subgrupo.genericas[q];
															y+=12;
															if(y >= 720){
																doc.addPage({ margin: 0, bufferPages: true });
																if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																pagina = pagina + 1;
																$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
															}				
															nivel > 2 ? doc.font('Helvetica-Bold', 8) : doc.font('Helvetica', 8)
															j === 0 ? $scope.configuracionImpresion.codigos ? doc.text(generica.codigo +"  "+ generica.nombre.toUpperCase(), l + 5, y) : doc.text(generica.nombre.toUpperCase(), l + 5, y) : $scope.configuracionImpresion.codigos ? doc.text(generica.codigo + "  "+ generica.nombre.toUpperCase(), l + 10, y) : doc.text(generica.nombre.toUpperCase(), l + 10, y);
															if(nivel === 2){
																doc.text(generica.saldoBs >= 0 ? number_format_negativo_to_positvo(generica.saldoBs, 2) : '-'+number_format_negativo_to_positvo(generica.saldoBs, 2), x, y, { width:65, align: 'right'} )
																if($scope.configuracionImpresion.bimonetario) doc.text(generica.saldoSus >= 0 ? number_format_negativo_to_positvo(generica.saldoSus, 2) : '-'+number_format_negativo_to_positvo(generica.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
															}
															if(nivel > 2){
																for (let c = 0; c < generica.apropiaciones.length; c++) {
																	var apropiacion = generica.apropiaciones[c];
																	y+=12;
																	if(y >= 720){
																		doc.addPage({ margin: 0, bufferPages: true });
																		if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																		pagina = pagina + 1;
																		$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																	}
																	doc.font('Helvetica', 8)
																	$scope.configuracionImpresion.codigos ? doc.text(apropiacion.codigo +"  "+ apropiacion.nombre.toUpperCase(), l + 15, y) : doc.text(apropiacion.nombre.toUpperCase(), l + 15, y);
																	apropiacion.tipoSaldo === "ACHA" ? apropiacion.saldoBs = apropiacion.haber - apropiacion.debe : apropiacion.saldoBs = apropiacion.debe - apropiacion.haber;

																	doc.text(apropiacion.saldoBs > 0 ? number_format_negativo_to_positvo(apropiacion.saldoBs, 2) : '-'+number_format_negativo_to_positvo(apropiacion.saldoBs, 2), x, y, { width:65, align: 'right'} )
																	if($scope.configuracionImpresion.bimonetario) {
																		apropiacion.tipoSaldo === "ACHA" ? apropiacion.saldoSus = apropiacion.haber_sus - apropiacion.debe_sus : apropiacion.saldoSus = apropiacion.debe_sus - apropiacion.haber_sus;
																		doc.text(apropiacion.saldoSus > 0 ? number_format_negativo_to_positvo(apropiacion.saldoSus, 2) : '-'+number_format_negativo_to_positvo(apropiacion.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
																	}
																}
																y+=12;
																if(y >= 720){
																	doc.addPage({ margin: 0, bufferPages: true });
																	if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																}
																doc.font('Helvetica-Bold', 8)
																j === 0 ? doc.text('TOTAL '+ generica.nombre.toUpperCase(), l + 5, y) : doc.text('TOTAL '+ generica.nombre.toUpperCase(), l + 10, y);
																doc.text(generica.saldoBs > 0 ? number_format_negativo_to_positvo(generica.saldoBs, 2) : '-'+number_format_negativo_to_positvo(generica.saldoBs, 2), x, y, { width:65, align: 'right'} )
																if($scope.configuracionImpresion.bimonetario) doc.text(generica.saldoSus > 0 ? number_format_negativo_to_positvo(generica.saldoSus, 2) : '-'+number_format_negativo_to_positvo(generica.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
																y+=6;
																if(y >= 720){
																	doc.addPage({ margin: 0, bufferPages: true });
																	if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
																}
															}
														}
														y+=12;
														if(y >= 720){
															doc.addPage({ margin: 0, bufferPages: true });
															if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
														}
														doc.font('Helvetica-Bold', 8)
														j == 0 ? doc.text('TOTAL '+ subgrupo.nombre.toUpperCase(), l, y) : doc.text('TOTAL '+ subgrupo.nombre.toUpperCase(), l + 5, y);
														doc.text(subgrupo.saldoBs >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoBs, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoBs, 2), x, y, { width:65, align: 'right'} )
														if($scope.configuracionImpresion.bimonetario) doc.text(subgrupo.saldoSus >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoSus, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
														y+=12;
														if(y >= 720){
															doc.addPage({ margin: 0, bufferPages: true });
															if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
														}
													}
													y+=12;
													if(y >= 720){
														doc.addPage({ margin: 0, bufferPages: true });
														if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
													}
													if(j === 0){
														doc.text('COSTO DE VENTAS',l, y)	
														doc.text('0.00', x, y, { width:65, align: 'right'} )
														if($scope.configuracionImpresion.bimonetario) doc.text('0.00', x + 80, y, { width:65, align: 'right'} )
														y+=12;
														if(y >= 720){
															doc.addPage({ margin: 0, bufferPages: true });
															if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
														}
														doc.font('Helvetica-Bold', 8).text('UTILIDAD BRUTA SOBRE VENTAS',l, y)	
														doc.text(subgrupo.saldoBs >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoBs, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoBs, 2), x, y, { width:65, align: 'right'} )
														if($scope.configuracionImpresion.bimonetario) doc.text(subgrupo.saldoSus >= 0 ? number_format_negativo_to_positvo(subgrupo.saldoSus, 2) : '-'+number_format_negativo_to_positvo(subgrupo.saldoSus, 2), x + 80, y, { width:65, align: 'right'} )
														doc.lineWidth(0.5).rect(x, y-2, 65, 0).stroke();
														if($scope.configuracionImpresion.bimonetario) doc.rect(x+80, y-2, 65, 0).stroke();
														y+=24;
														if(y >= 720){
															doc.addPage({ margin: 0, bufferPages: true });
															if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
														}
														doc.text('GASTOS DE OPERACIÓN', l, y);
														var titulo = "TOTAL GASTOS DE OPERACIÓN";
														var totalBs = 0;
														if($scope.configuracionImpresion.bimonetario) var totalSus = 0;
														y+=12;
														if(y >= 720){
															doc.addPage({ margin: 0, bufferPages: true });
															if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
															pagina = pagina + 1;
															$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
														}
													}else{
														totalBs += subgrupo.saldoBs;
														totalSus += subgrupo.saldoSus;
													}
												}
												
											}
											y+= 12;
											if(y >= 720){
												doc.addPage({ margin: 0, bufferPages: true });
												if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
											}
											doc.rect(30, y-3, 540, 12).fill('#E0E6E9').fillColor('#000');
											doc.text('RESULTADO DEL PERIODO', l, y);
											doc.text(resultado >= 0 ? number_format_negativo_to_positvo(resultado, 2) : '-'+number_format_negativo_to_positvo(resultado, 2), x, y, { width:65, align: 'right'} )
											doc.lineWidth(0.7).rect(x, y-3, 65, 0).stroke();
											if($scope.configuracionImpresion.bimonetario) {
												doc.text(resultado_sus >= 0 ? number_format_negativo_to_positvo(resultado_sus, 2) : '-'+number_format_negativo_to_positvo(resultado_sus, 2), x + 80, y, { width:65, align: 'right'} )
												doc.rect(x+80, y-3, 65, 0).stroke();
											}
											if(y >= 680){
												doc.addPage({ margin: 0, bufferPages: true });
												if($scope.configuracionImpresion.bimonetario){ y=135, x=420 }else{ y=111, x=465 }
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFEstadoResultados(doc, pagina, imagenLg);
											}
											$scope.dibujarFirmas(doc)
										}
										blockUI.stop();
										doc.end();
										stream.on('finish', function () {
										var fileURL = stream.toBlobURL('application/pdf');
										window.open(fileURL, '_blank', 'location=no');
										});
									})
								}else{
									SweetAlert.swal("", cuentas.message, "warning");
								}
							});
							cuentasEstadoResultado.catch(e => e)
							break;
						default:
							console.log('Por desarrollar para otros tipos de empresas');
					}
				} else {


				}
				
			}else{
				SweetAlert.swal("", "Error al obtener el Tipo de Empresa", "warning");
			}

		} 
		$scope.generarXlsx = () =>{
			if($scope.fechasImpresion.tipoGestion){
				$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					switch($scope.fechasImpresion.tipoGestion.nombre){
						case "COMERCIAL":
							if( $scope.configuracionImpresion.cencos.length > 0 ) {
								$scope.configuracionImpresion.cencosSeleccionados=$scope.configuracionImpresion.cencos.map(c=>c.id).join();
							}else{
								$scope.configuracionImpresion.cencosSeleccionados=[]
							}
							let cuentasEstadoResultado = ObtenerCuentasEstadoResultado($scope.configuracionImpresion, $scope.usuario.id_empresa);
							cuentasEstadoResultado.then(async cuentas=>{
								if(!cuentas.hasError){
									blockUI.start();
									var resultado = cuentas.data.reduce((ac,val, i)=> val.tipo_saldo === "ACHA" ? ac+=val.saldoBs : ac-=val.saldoBs, 0)
									if($scope.configuracionImpresion.bimonetario){
										var resultado_sus = cuentas.data.reduce((ac,val, i)=> val.tipo_saldo === "ACHA" ? ac+=val.saldoSus : ac-=val.saldoSus, 0)
									}
									if($scope.configuracionImpresion.bimonetario){
										var data = [["CÓDIGO", "CUENTAS", "CLASIFICACIÓN", "TIPO CUENTA", "BOLIVIANOS", "DOLARES"]]
									}else{
										var data = [["CÓDIGO", "CUENTAS", "CLASIFICACIÓN", "TIPO CUENTA", "BOLIVIANOS"]]
									}
									for (let i = 0; i < cuentas.data.length; i++) {
										const grupo = cuentas.data[i];
										if($scope.configuracionImpresion.bimonetario){
											data.push([grupo.codigo, grupo.nombre, grupo.clasificacion, grupo.tipo, grupo.saldoBs, grupo.saldoSus ]);
										}else{
											data.push([grupo.codigo, grupo.nombre, grupo.clasificacion, grupo.tipo, grupo.saldoBs ])
										} 
										for (let j = 0; j < grupo.subgrupos.length; j++) {
											const subgrupo = grupo.subgrupos[j];
											if($scope.configuracionImpresion.bimonetario){
												data.push([subgrupo.codigo, subgrupo.nombre, subgrupo.clasificacion, subgrupo.tipo, subgrupo.saldoBs, subgrupo.saldoSus ]);
											}else{
												data.push([subgrupo.codigo, subgrupo.nombre, subgrupo.clasificacion, subgrupo.tipo, subgrupo.saldoBs ])
											}  
											for (let k = 0; k < subgrupo.genericas.length; k++) {
												const generica = subgrupo.genericas[k];
												if($scope.configuracionImpresion.bimonetario){
													data.push([generica.codigo, generica.nombre, generica.clasificacion, generica.tipo, generica.saldoBs, generica.saldoSus ]);
												}else{
													data.push([generica.codigo, generica.nombre, generica.clasificacion, generica.tipo, generica.saldoBs ])
												}  
												for (let l = 0; l < generica.apropiaciones.length; l++) {
													const apropiacion = generica.apropiaciones[l];
													var saldoBs= apropiacion.tipoSaldo === "ACHA" ? apropiacion.haber - apropiacion.debe : apropiacion.debe - apropiacion.haber ;
													if($scope.configuracionImpresion.bimonetario){
														var saldoSus= apropiacion.tipoSaldo === "ACHA" ? apropiacion.haber_sus - apropiacion.debe_sus : apropiacion.debe_sus - apropiacion.haber_sus ;
													}
													if($scope.configuracionImpresion.bimonetario){
														data.push([apropiacion.codigo, apropiacion.nombre, apropiacion.clasificacion, apropiacion.tipo, saldoBs, saldoSus ]);
													}else{
														data.push([apropiacion.codigo, apropiacion.nombre, apropiacion.clasificacion, apropiacion.tipo, saldoBs ])
													} 
												}
											}
										}
									}
									if($scope.configuracionImpresion.bimonetario){
										data.push(["","RESULTADO DEL PERIODO","","",resultado, resultado_sus]); 
									}else{
										data.push(["","RESULTADO DEL PERIODO","","",resultado])
									}
									var ws_name = "SheetJS";
									var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
									wb.SheetNames.push(ws_name);
									wb.Sheets[ws_name] = ws;
									var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
									saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-ESTADO-DE-RESULTADOS.xlsx");
									blockUI.stop();
								}else{
									SweetAlert.swal("", cuentas.message, "warning");
								}
							});
							cuentasEstadoResultado.catch(e => e)
							break;
						default:
							console.log('Por desarrollar para otros tipos de empresas');
					}
				} else {


				}
				
			}else{
				SweetAlert.swal("", "Error al obtener el Tipo de Empresa", "warning");
			}

		} 
		$scope.dibujarCabeceraPDFEstadoResultados = async function (doc, pagina, logo) {
				if (logo != 'error') {
					doc.image(logo, 30, 25, {width:70, height: 45 });
					doc.font('Helvetica-Bold', 9);
					doc.text($scope.usuario.empresa.razon_social, 105, 30);
					doc.font('Helvetica', 8);
					doc.text($scope.usuario.empresa.direccion, 105, 40);			
					doc.text("NIT ", 105, 50);			
					doc.text($scope.usuario.empresa.nit, 120, 50);
					doc.text( $scope.usuario.empresa.departamento.nombre.charAt(0) + $scope.usuario.empresa.departamento.nombre.slice(1).toLowerCase() +"- Bolivia", 105, 60);
				}else{
					doc.font('Helvetica-Bold', 9);
					doc.text($scope.usuario.empresa.razon_social, 40, 30);
					doc.font('Helvetica', 8);
					doc.text($scope.usuario.empresa.direccion, 40, 40);			
					doc.text("NIT ", 40, 50);			
					doc.text($scope.usuario.empresa.nit, 55, 50);
					doc.text($scope.usuario.empresa.departamento.nombre.charAt(0) + $scope.usuario.empresa.departamento.nombre.slice(1).toLowerCase() + "- Bolivia", 40, 60);	
				}
				
				doc.font('Helvetica-Bold', 12);
				doc.text("ESTADO DE RESULTADOS", 0, 75, { align: "center" });
				doc.font('Helvetica-Bold', 8);
				if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'GES') {
					var anioActual = new Date().getFullYear()
					var mesActual = new Date().getMonth()
					var ultimoDiaMes = new Date(anioActual, mesActual - 1, 0).getDate();
					if ($scope.configuracionImpresion.gestion.nombre < anioActual) {
						doc.text("Al 31 de Diciembre de " + $scope.configuracionImpresion.gestion.nombre, 0, 86, { align: "center" });
					} else {
						doc.text("Al " + ultimoDiaMes + " de " + $scope.meses[mesActual].nombre + " de " + $scope.configuracionImpresion.gestion.nombre, 0, 86, { align: "center" });
					}
		
				} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'MES') {
					doc.text($scope.configuracionImpresion.mes.nombre + " de " + $scope.configuracionImpresion.gestion.nombre, 0, 85, { align: "center" });
				} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'FECHAS') {
					var fechaInicio = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
					var FechaFin = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
					doc.text("Desde el " + fechaInicio.getDate() + " de " + $scope.meses[fechaInicio.getMonth()].nombre + " " + fechaInicio.getFullYear() + " al " + FechaFin.getDate() + " de " + $scope.meses[FechaFin.getMonth()].nombre + " de " + FechaFin.getFullYear(), 0, 85, { align: "center" });
				} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'COMP') {
					doc.text("Gestión " + $scope.configuracionImpresion.gestion.nombre + "- Gestión " + $scope.configuracionImpresion.gestion_fin.nombre, 0, 85, { align: "center" });
				}
				if ($scope.configuracionImpresion.bimonetario) {
					doc.text("(Expresado en Bolivianos y Dólares)", 0, 95, { align: "center" });
					if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
						doc.text('Bs.', 420, 115, {width: 65, align: 'center'});
						doc.text('$us.', 500, 115, {width: 65, align: 'center'});
						doc.rect(420, 122, 65,0).stroke()
						doc.rect(500, 122, 65,0).stroke()
					} else {
						doc.text($scope.configuracionImpresion.gestion.nombre, 340, 115);
						doc.text('Bs.', 290, 125);
						doc.text('$us.', 370, 125);
						doc.text($scope.configuracionImpresion.gestion_fin.nombre, 525, 115);
						doc.text('Bs.', 473, 125);
						doc.text('$us.', 553, 125);

					}
				} else {
					doc.text("(Expresado en Bolivianos)", 0, 95, { align: "center" });

				}
				doc.font('Helvetica-Bold', 7);
				if ($scope.configuracionImpresion.tipoNumeracion.nombre_corto == 'SAD') {
					doc.text("PÁGINA " + pagina, 540, 750);
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
				doc.font('Helvetica', 8);	
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

		$scope.obtenerCencosEmpresa = () =>{
			var p = ObtenerCencosEmpresa($scope.usuario.empresa.id)
			p.then(cencos=>{
				if(cencos.length > 0){	
					if(cencos[0].clases.length>0) {
						cencos=cencos[0].clases
						$scope.llenarCencos(cencos);
					}else{
						$scope.cencos=[]
					}
				}else{
					console.log('La empresa no tiene cencos configurada.');
				}
			})
		}

		$scope.llenarCencos = function (cencos) {
			$scope.cencos = [];
			for (var i = 0; i < cencos.length; i++) {
				var cenco = {
					name: cencos[i].nombre,
					maker: "",
					ticked: false,
					id: cencos[i].id
				}
				$scope.cencos.push(cenco);
			}
		}

		$scope.$on('$routeChangeStart', function (next, current) {
			/* 	$scope.eliminarPopup(); */

		});

		$scope.inicio();
	});



