
angular.module('agil.controladores')

	.controller('ControladorBalanceGeneral', [ '$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI',
		'ClasesTipoEmpresa', 'ClasesTipo', 'ObtenerConfiguracionImpresion', 'CuentasContabilidadEEFF', 'ObtenerGestionesEEFF','SweetAlert', function ($scope, $localStorage, $location, $templateCache, $route, blockUI,
		ClasesTipoEmpresa, ClasesTipo, ObtenerConfiguracionImpresion, CuentasContabilidadEEFF, ObtenerGestionesEEFF, SweetAlert ) {


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

/// INICIO FUNCIONES GENERALES 
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
			if (filtro === 'FECHAS') {
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
						let anio = new Date().getFullYear();
						$scope.configuracionImpresion ? $scope.configuracionImpresion.fechaFijada = dato.inicio +"/"+anio : '';
					}
				})

			})
		}
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
		}
/// FIN FUNCIONES GENERALES
		

/// INICIO BALANCE GENERAL EN PDF
	$scope.modificarFechaInicio = function(fecha){
		let anioFin = fecha.split('/')[2];
		$scope.configuracionImpresion.fechaFijada = $scope.fechasImpresion.inicio +"/"+ anioFin;
		$scope.configuracionImpresion.fecha_inicio = $scope.fechasImpresion.inicio +"/"+ anioFin;
	}
	$scope.generarPdfBalanceGeneral = function () {	
		if($scope.configuracionImpresion.tipo_cuenta == undefined) SweetAlert.swal("", "Elija la distribución del balance", "warning");
		if ($scope.configuracionImpresion.fecha_inicio) {
			$scope.configuracionImpresion.inicio2 = $scope.configuracionImpresion.fecha_inicio
			$scope.configuracionImpresion.fin2 = $scope.configuracionImpresion.fecha_fin
		}
		$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
		if($scope.configuracionImpresion.tipoPeriodo.nombre=="FECHAS"){
			if($scope.configuracionImpresion.fechasImpresion.tipoGestion.nombre_corto === "CM"){
				let anio = $scope.configuracionImpresion.fecha_fin.split('/')[2];
				$scope.configuracionImpresion.gestion={}
				$scope.configuracionImpresion.gestion.nombre = parseInt(anio);
			}else{
				let anio = $scope.configuracionImpresion.fecha_fin.split('/')[2];
				$scope.configuracionImpresion.gestion={}
				$scope.configuracionImpresion.gestion.nombre = parseInt(anio) -1;
			}
		}
		var promesa = CuentasContabilidadEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
		promesa.then(function (cuentas) {
			if(!cuentas.hasError){
				cuentas.todas = cuentas.cuentas.filter(dt => dt.movimiento === "ABG");
				delete cuentas.cuentas;
				if(cuentas.todas.length === 2) cuentas.todas[1].nombre = "PASIVO Y PATRIMONIO"
					if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
						var nivel = 0;
						if ($scope.configuracionImpresion.tipo_cuenta.nombre_corto == "1")		nivel = 0;
						if ($scope.configuracionImpresion.tipo_cuenta.nombre_corto == "2") 		nivel = 1;
						if ($scope.configuracionImpresion.tipo_cuenta.nombre_corto == "3") 		nivel = 2;
						if($scope.configuracionImpresion.tipo_cuenta.nombre_corto == "4") 		nivel = 3;
						if (!$scope.configuracionImpresion.tipo_cuenta.nombre_corto)		nivel = 2;
						var x = ($scope.configuracionImpresion.bimonetario) ? 380 : 480;
							$scope.generarDocumento(cuentas, x, nivel)
					} else {
						dato.cuentasGrupo = []
						dato.cuentasSubGrupo = [],
							dato.cuentasGenericas = [],
							dato.cuentasApropiacion = [],
							dato.cuentasApropiacionFijo = [],
							dato.cuentasPasivoPatrimonio = [],
							dato.cuentasIngresoGastoEERR = [],
							dato.cuentaSubGrupoEERR = [],
							dato.cuentaGenericaEERR = [],
							dato.cuentaGrupoEERR = [];
						dato.primero.cuentasGrupo.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasGrupo.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasGrupoDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasGrupo.length; i++) {
										var element = dato.cuentasGrupo[i];
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
							dato.cuentasSubGrupo.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasSubGrupoDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasSubGrupo.length; i++) {
										var element = dato.cuentasSubGrupo[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasGenerica.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasGenericas.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasGenericaDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasGenericas.length; i++) {
										var element = dato.cuentasGenericas[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasActivos.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasApropiacion.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasActivosDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasApropiacion.length; i++) {
										var element = dato.cuentasApropiacion[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasFijos.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasApropiacionFijo.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasFijosDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasApropiacionFijo.length; i++) {
										var element = dato.cuentasApropiacionFijo[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasPasivosPatrimonios.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasPasivoPatrimonio.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasPasivosPatrimoniosDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasPasivoPatrimonio.length; i++) {
										var element = dato.cuentasPasivoPatrimonio[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})

						dato.primero.cuentasGenericaEERR.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentaGenericaEERR.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasGenericaEERRDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentaGenericaEERR.length; i++) {
										var element = dato.cuentaGenericaEERR[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasSubGrupoEERR.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentaSubGrupoEERR.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasSubGrupoEERRDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentaSubGrupoEERR.length; i++) {
										var element = dato.cuentaSubGrupoEERR[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasGrupoEERR.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentaGrupoEERR.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasGrupoEERRDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentaGrupoEERR.length; i++) {
										var element = dato.cuentaGrupoEERR[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.primero.cuentasIngresoGastoEERR.forEach(function (cuenta, index, array) {
							var datos2 = {}
							datos2.primerAno = cuenta
							dato.cuentasIngresoGastoEERR.push(datos2)
							if (index === (array.length - 1)) {
								dato.segundo.cuentasIngresoGastoEERRDos.forEach(function (cuenta, index, array) {
									for (var i = 0; i < dato.cuentasIngresoGastoEERR.length; i++) {
										var element = dato.cuentasIngresoGastoEERR[i];
										if (element.primerAno.id == cuenta.id) {
											element.segundoAno = cuenta
										}
									}
								})
							}
						})
						dato.cuentasGrupoActivo = dato.cuentasGrupo.filter(function (cuenta) {
							return cuenta.primerAno.tipo_cuenta_nombre == 'ACTIVO'
						})
						dato.cuentasSubGrupoActivo = dato.cuentasSubGrupo.filter(function (cuenta) {
							return cuenta.primerAno.tipo_cuenta_nombre == 'ACTIVO'
						})
						dato.cuentasGenericaActivo = dato.cuentasGenericas.filter(function (cuenta) {
							return cuenta.primerAno.tipo_cuenta_nombre == 'ACTIVO'
						})
						dato.cuentasGrupoPasivo = dato.cuentasGrupo.filter(function (cuenta) {
							return (cuenta.primerAno.tipo_cuenta_nombre == 'PASIVO' || cuenta.primerAno.tipo_cuenta_nombre == 'PATRIMONIO')
						})
						dato.cuentasSubGrupoPasivo = dato.cuentasSubGrupo.filter(function (cuenta) {
							return (cuenta.primerAno.tipo_cuenta_nombre == 'PASIVO' || cuenta.primerAno.tipo_cuenta_nombre == 'PATRIMONIO')
						})
						dato.cuentasGenericaPasivo = dato.cuentasGenericas.filter(function (cuenta) {
							return (cuenta.primerAno.tipo_cuenta_nombre == 'PASIVO' || cuenta.primerAno.tipo_cuenta_nombre == 'PATRIMONIO')
						})

						var x = ($scope.configuracionImpresion.bimonetario) ? 290 : 310
						if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO") {
							$scope.generarPdfComprobantePreestablecido(dato, x)
						} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") {
							$scope.generarPdfComprobantePreestablecido(dato, x)
						} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") {
							$scope.generarPdfComparativoGrupo(dato, x)
						} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") {
							$scope.generarPdfComparativosubGrupo(dato, x)
						} else if ($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") {
							$scope.generarPdfComparativoApropiacion(dato, x)
						}
						blockUI.stop();
					}
			}else{
				SweetAlert.swal("", cuentas.message, "warning");
			}
		})
	}
	$scope.generarDocumento = async (cuentas, x, nivel) => {
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
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, 'INGRESOS', logo);
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
				SweetAlert.swal("Configure su plan de cuentas", "No existen cuentas para generar el Balance General", "warning");
			}
			
			
	})
	}
	$scope.dibujarGrupos = (doc, x, logo, grupos , nivelDoc) =>{
		var y = 120, itemsPorPagina = 50, items = 0, pagina = 1;  totalPaginas = 5;// ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
		$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, 'ACTIVO', logo);
		var b = 1;
		if(grupos.length > 2) {
			var totalPyP_bs = 0;
			var totalPyP_sus = 0;
		}
		var titulo
		grupos.forEach( (grupo, inde) => {
			if(grupos.length > 2 && inde > 0){
				totalPyP_bs += grupo.saldo
				totalPyP_sus += grupo.saldo_sus
			}
			titulo = grupo.nombre;
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
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
				} 
				if(1 <= nivelDoc){
					let val = $scope.dibujarSubgrupos(doc, x, y, logo, grupo.hijos, nivelDoc, items, itemsPorPagina, pagina, totalPaginas, titulo);
					y = val.y, pagina = val.pagina, totalPaginas = val.totalPaginas, items = val.items, itemsPorPagina = val.itemsPorPagina
				}
				doc.font( nivelDoc != 0 ? 'Helvetica-Bold' : 'Helvetica', 8);
				if(inde == 0) doc.rect(25, y-3, 520, 12).fill('#E0E6E9').fillColor('#000');
				grupos.length == 2 ? inde == grupos.length -1  ? doc.rect(25, y-3, 520, 12).fill('#E0E6E9').fillColor('#000'): '' : ''
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
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
				} 
			}else{
				blockUI.stop();
			}
		});
		if(grupos.length > 2){
			y -= 12;
			doc.font('Helvetica-Bold', 8);
			doc.rect(25, y-3, 520, 12).fill('#E0E6E9').fillColor('#000');
			doc.text('TOTAL PASIVO Y PATRIMONIO', 30, y);
			doc.text(totalPyP_bs < 0 ? '-' + number_format_negativo_to_positvo(totalPyP_bs, 2) : number_format_negativo_to_positvo(totalPyP_bs, 2), x, y, {width: 60, align: 'right'});
			if ($scope.configuracionImpresion.bimonetario) doc.text( totalPyP_sus < 0 ? '-' + number_format_negativo_to_positvo(totalPyP_sus, 2) : number_format_negativo_to_positvo(totalPyP_sus, 2), x + 100, y, {width: 60, align: 'right'});
			y += 24;
			items += 2;
			if (items >= itemsPorPagina) {
				doc.addPage({ margin: 0, bufferPages: true });
				y = 130;
				items = 0;
				pagina = pagina + 1;
				$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
			} 
		}
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo, titulo);
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
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo, titulo);
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
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
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
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
			if(!hijos[i].estado_resultado){
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
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
						doc.font('Helvetica', 8);
					}
				}
			}else{
				doc.text(hijos[i].nombre.toUpperCase(), 60, y);
				let resultadoFinal = hijos[i].tipoSaldo == "ACHA" ? hijos[i].haber - hijos[i].debe : hijos[i].debe - hijos[i].haber 
				let resultadoFinal_sus = hijos[i].tipoSaldo == "ACHA" ? hijos[i].haber_sus - hijos[i].debe_sus : hijos[i].debe_sus - hijos[i].haber_sus 
				doc.text(resultadoFinal >= 0 ? number_format_negativo_to_positvo(resultadoFinal, 2) : '-' + number_format_negativo_to_positvo(resultadoFinal, 2), x, y, {width: 60, align: 'right'});
				if ($scope.configuracionImpresion.bimonetario) doc.text( resultadoFinal_sus >= 0 ? number_format_negativo_to_positvo(resultadoFinal_sus, 2) : '-' + number_format_negativo_to_positvo(resultadoFinal_sus, 2), x + 100, y, {width: 60, align: 'right'});
				items++;
				y += 12;
				if (items >= itemsPorPagina) {
					doc.addPage({ margin: 0, bufferPages: true });
					y = 130;
					items = 0;
					pagina = pagina + 1;
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
					doc.font('Helvetica', 8);
				}
			}
			if (items >= itemsPorPagina) {
				doc.addPage({ margin: 0, bufferPages: true });
				y = 130;
				items = 0;
				pagina = pagina + 1;
				$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, titulo, logo);
				doc.font('Helvetica', 8);
			}
			
		}
		return { y:y, pagina: pagina, totalPaginas:totalPaginas, items: items, itemsPorPagina: itemsPorPagina };
	}
	
	$scope.dibujarCabeceraPDFBalanceGeneral = function (doc, pagina, totalPaginas, nombreTipo, logo) {
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
		doc.text("BALANCE GENERAL", 0, 75, { align: "center" });
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
			doc.text("A " +$scope.configuracionImpresion.mes.nombre + " de " + $scope.configuracionImpresion.gestion.nombre, 0, 86, { align: "center" });
		} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'FECHAS') {
			//TEMPORTAL 
			var fechaInicio = new Date($scope.convertirFecha($scope.configuracionImpresion.fechaFijada))
			var FechaFin = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
/* 			ORIGINAL 
			var fechaInicio = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
			var FechaFin = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin)) */
			doc.text("Desde el " + fechaInicio.getDate() + " de " + $scope.meses[fechaInicio.getMonth()].nombre + " " + fechaInicio.getFullYear() + " al " + FechaFin.getDate() + " de " + $scope.meses[FechaFin.getMonth()].nombre + " de " + FechaFin.getFullYear(), 0, 86, { align: "center" });
		} else if ($scope.configuracionImpresion.tipoPeriodo.nombre_corto == 'COMP') {
			doc.text("Gestión " + $scope.configuracionImpresion.gestion.nombre + "- Gestión " + $scope.configuracionImpresion.gestion_fin.nombre, 0, 86, { align: "center" });
		}
		if ($scope.configuracionImpresion.bimonetario) {
			doc.text("(Expresado en Bolivianos y Dólares)", 0, 95, { align: "center" });
			if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
				doc.text('Bolivianos', 380, 115, {width: 70, align: 'center'});
				doc.text('Dólares', 480, 115, {width: 70, align: 'center'});
			} else {
				doc.text($scope.configuracionImpresion.gestion.nombre, 340, 115);
				doc.text('Bolivianos', 290, 125);
				doc.text('Dólares', 370, 125);
				doc.text($scope.configuracionImpresion.gestion_fin.nombre, 525, 115);
				doc.text('Bolivianos', 473, 125);
				doc.text('Dólares', 553, 125);
			}
		} else {
			doc.text("(Expresado en Bolivianos)", 0, 95, { align: "center" });
		}
		if(pagina != 1) doc.text(nombreTipo, 0, 105, { align: "center" });
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
		doc.font('Helvetica', 8);	
	}
	$scope.dibujarFirmas = (doc) =>{
		if ($scope.configuracionImpresion.usar_firma_uno) {
			doc.text($scope.configuracionImpresion.firma_uno, 120, 720, { width: 150, align: 'center'});
			doc.text($scope.configuracionImpresion.cargo_uno, 120, 730, { width: 150, align: 'center'});
		}
		if ($scope.configuracionImpresion.usar_firma_dos) {
			doc.text($scope.configuracionImpresion.firma_dos, 340, 720, { width: 150, align: 'center'});
			doc.text($scope.configuracionImpresion.cargo_dos, 340, 730, { width: 150, align: 'center'});
		}
	}
/// FIN BALANCE GENERAL EN PDF

//Inicio XLS Balance General
	$scope.generarExelBalanceGeneral = function () {
		if($scope.configuracionImpresion.tipo_cuenta == undefined) SweetAlert.swal("", "Elija la distribución del balance", "warning");
		if ($scope.configuracionImpresion.fecha_inicio) {
			$scope.configuracionImpresion.inicio2 = $scope.configuracionImpresion.fecha_inicio
			$scope.configuracionImpresion.fin2 = $scope.configuracionImpresion.fecha_fin
		}
		$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			if($scope.configuracionImpresion.tipoPeriodo.nombre=="FECHAS"){
				if($scope.configuracionImpresion.fechasImpresion.tipoGestion.nombre_corto === "CM"){
					let anio = $scope.configuracionImpresion.fecha_fin.split('/')[2];
					$scope.configuracionImpresion.gestion={}
					$scope.configuracionImpresion.gestion.nombre = parseInt(anio);
				}else{
					let anio = $scope.configuracionImpresion.fecha_fin.split('/')[2];
					$scope.configuracionImpresion.gestion={}
					$scope.configuracionImpresion.gestion.nombre = parseInt(anio) -1;
				}
			}
			var promesa = CuentasContabilidadEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
			promesa.then(function (dato) {
				dato.cuentas = dato.cuentas.filter(dt => dt.movimiento === "ABG")
				if(dato.cuentas === 2) cuentas.todas[1].nombre = "PASIVO Y PATRIMONIO"

				if ($scope.configuracionImpresion.tipoPeriodo.nombre != 'COMPARATIVO') {
					var nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GRUPO") 			nivel = 0;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "SUB GRUPO") 		nivel = 1;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "GENERICA") 		nivel = 2;
					if($scope.configuracionImpresion.tipo_cuenta.nombre == "APROPIACION") 		nivel = 3;
					if ($scope.configuracionImpresion.tipo_cuenta.nombre == "PREESTABLECIDO")	nivel = 2;
					$scope.generarDocumentoXlsx(dato.cuentas, dato.resultado, nivel)
				} else {}
				
			})
			
		}
		$scope.generarDocumentoXlsx = function(datos, resultado, nivel) {
			if ($scope.configuracionImpresion.bimonetario) var data = [["CÓDIGO", "NOMBRE", "CLASIFICACIÓN", "TIPO CUENTA", 'BOLIVIANOS', 'DOLARES']]
			if (!$scope.configuracionImpresion.bimonetario) var data = [["CÓDIGO", "NOMBRE", "CLASIFICACIÓN", "TIPO CUENTA", 'BOLIVIANOS']]
			console.log('datos bg', datos);
			if(datos.length > 0){
				datos.forEach((grupo, i) => {
					if(i === datos.length -1){
						if(resultado.saldo < 0) {
							grupo.saldo = grupo.saldo + (resultado.saldo * -1)
							grupo.saldo_sus = grupo.saldo_sus + (resultado.saldo_sus * -1)
						}else{
							grupo.saldo = grupo.saldo - resultado.saldo;
							grupo.saldo_sus = grupo.saldo_sus - resultado.saldo_sus;
						}
					}
					var registro = []
					registro.push(grupo.codigo)
					registro.push(grupo.nombre ? grupo.nombre.toUpperCase() :'')
					registro.push(grupo.clasificacion ? grupo.clasificacion.toUpperCase() :'')
					registro.push(grupo.tipo ? grupo.tipo.toUpperCase() :'')
					registro.push(grupo.tipoSaldo === "DEDE" ? grupo.debe - grupo.haber : grupo.haber - grupo.debe )
					if ($scope.configuracionImpresion.bimonetario) registro.push(grupo.tipoSaldo === "DEDE" ? grupo.debe_sus - grupo.haber_sus : grupo.haber_sus - grupo.debe_sus)
					data.push(registro);
					if(nivel > 0 && grupo.hijos.length > 0){
						grupo.hijos.forEach((subgrupo, ind) => {
							if(ind === grupo.hijos.length -1){
								if(resultado.saldo < 0) {
									subgrupo.saldo = subgrupo.saldo + (resultado.saldo * -1)
									subgrupo.saldo_sus = subgrupo.saldo_sus + (resultado.saldo_sus * -1)
								}else{
									subgrupo.saldo = subgrupo.saldo - resultado.saldo;
									subgrupo.saldo_sus = subgrupo.saldo_sus - resultado.saldo_sus;
								}
							}
							var registro = []
							registro.push(subgrupo.codigo)
							registro.push(subgrupo.nombre ? subgrupo.nombre.toUpperCase(): '')
							registro.push(subgrupo.clasificacion ? subgrupo.clasificacion.toUpperCase():'')
							registro.push(subgrupo.tipo ? subgrupo.tipo.toUpperCase() : '')
							registro.push(subgrupo.tipoSaldo === "DEDE" ? subgrupo.debe - subgrupo.haber :  subgrupo.haber - subgrupo.debe)
							if ($scope.configuracionImpresion.bimonetario) registro.push(subgrupo.tipoSaldo === "DEDE" ? subgrupo.debe_sus - subgrupo.haber_sus : subgrupo.haber_sus - subgrupo.debe_sus)
							data.push(registro);
							if(nivel > 1 && subgrupo.hijos.length > 0){
								subgrupo.hijos.forEach((generica, indx) =>{
									if(indx === subgrupo.hijos.length -1){
										resultado.saldo < 0 ? generica.saldo += (resultado.saldo * -1) : generica.saldo += resultado.saldo ;
										resultado.saldo_sus < 0 ? generica.saldo_sus += (resultado.saldo_sus * -1) : generica.saldo_sus += resultado.saldo_sus ;
									}
									var registro = []
									registro.push(generica.codigo)
									registro.push(generica.nombre ? generica.nombre.toUpperCase() : '')
									registro.push(generica.clasificacion ? generica.clasificacion.toUpperCase() : '')
									registro.push(generica.tipo ? generica.tipo.toUpperCase() : '')
									registro.push(generica.tipoSaldo === "DEDE" ? generica.debe - generica.haber : generica.haber - generica.debe )
									if ($scope.configuracionImpresion.bimonetario) registro.push(generica.tipoSaldo == "DEDE" ? generica.debe_sus - generica.haber_sus : generica.haber_sus - generica.debe_sus)
									data.push(registro);
									if(nivel > 2 && generica.hijos.length > 0){
										generica.hijos.forEach((apropiacion, ix) => {
											var registro = []
											let saldo_bs = 0;
											let saldo_sus = 0;
											if(apropiacion.tipoSaldo === "DEDE") {
												saldo_bs = apropiacion.debe - apropiacion.haber;
												saldo_sus = apropiacion.debe_sus - apropiacion.haber_sus;
											}
											if(apropiacion.tipoSaldo === "ACHA") {
												if(apropiacion.estado_resultado){
													resultado.saldo < 0 ? saldo_bs = resultado.saldo * -1 : saldo_bs = resultado.saldo;
													resultado.saldo < 0 ? saldo_sus = resultado.saldo_sus * -1 : saldo_sus = resultado.saldo_sus;

												}else{
													saldo_bs = apropiacion.haber - apropiacion.debe;
													saldo_sus = apropiacion.haber_sus - apropiacion.debe_sus;
												}

												
											}
											registro.push(apropiacion.codigo)
											registro.push(apropiacion.nombre ? apropiacion.nombre.toUpperCase() : '')
											registro.push(apropiacion.clasificacion ? apropiacion.clasificacion.toUpperCase() : '')
											registro.push(apropiacion.tipo ? apropiacion.tipo.toUpperCase() : '')
											registro.push(saldo_bs)
											if ($scope.configuracionImpresion.bimonetario) registro.push(saldo_sus)
											data.push(registro);
										})
									}
								})
							}
						})
					}
	
				});
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
				
				/* add worksheet to workbook */
				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-BALANCE-GENERAL.xlsx");
				blockUI.stop();
			}else{
				SweetAlert.swal("", "No se encontraron cuentas de balance", "warning");
			}
		}




		$scope.generarExelApropiacion = function (dato) {
			var grupos = dato.cuentasGrupo;
			var subGrupos = dato.cuentasSubGrupo;
			var genericas = dato.cuentasGenerica;
			var apropiacion = dato.cuentasActivos.concat(dato.cuentasPasivosPatrimonios);
			var data = $scope.dibujarCabeceraExelBalanceGeneral();
			for (let i = 0; i < grupos.length; i++) {
				var ctaSubGrupo = subGrupos.filter( subgrupo => subgrupo.cuenta_padre === grupos[i].id )
				for (let j = 0; j < ctaSubGrupo.length; j++) {
					var registro = [];
					registro.push(ctaSubGrupo[j].codigo_cuenta_subgrupo)
					registro.push(ctaSubGrupo[j].nombre)
					registro.push(ctaSubGrupo[j].tipo_cuenta_nombre)
					registro.push("SUBGRUPO")
					data.push(registro);
					var ctaGenerica = genericas.filter( gen => gen.cuenta_padre === ctaSubGrupo[j].id )	
					for (let k = 0; k < ctaGenerica.length; k++) {
						var registro = [];
						registro.push(ctaGenerica[k].codigo_cuenta_generico)
						registro.push(ctaGenerica[k].nombre)
						registro.push(ctaGenerica[k].tipo_cuenta_nombre)
						registro.push("GENÉRICA")
						data.push(registro);
						var ctaApropiacion = apropiacion.filter(aprop => aprop.cuenta_padre	=== ctaGenerica[k].id )
						for (let l = 0; l < ctaApropiacion.length; l++) {
							var registro = [];
							if (ctaApropiacion[l].saldo != 0 ){
								
								registro.push(ctaApropiacion[l].codigo)
								registro.push(ctaApropiacion[l].nombre)
								registro.push(ctaGenerica[k].tipo_cuenta_nombre)
								registro.push("APROPIACIÓN")
								registro.push(number_format_negativo_to_positvo(ctaApropiacion[l].saldo, 2))
								if ($scope.configuracionImpresion.bimonetario) {
									registro.push(number_format_negativo_to_positvo(ctaApropiacion[l].saldo_sus, 2))
								}
								data.push(registro);
							}
							
						}	
						
					}

				}

					
			}
			var resultadoG= $scope.calcularResultadoExcel(dato);
			var registro = [];
			registro.push("")
			registro.push("Resultado de la Gestión")
			registro.push("PATRIMONIO")
			registro.push("APROPIACIÓN")
			registro.push(number_format_negativo_to_positvo(resultadoG.bs, 2))
			if ($scope.configuracionImpresion.bimonetario) {
				registro.push(number_format_negativo_to_positvo(resultadoG.usd, 2))
			}
			data.push(registro);
			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			var wscols = [
				{ wch: 10 },
				{ wch: 42 },
				{ wch: 13 },
				{ wch: 12 },
				{ wch: 12 }
			];
			ws['!cols'] = wscols;
			ws['!rows'] = [{ hpx: 28, level: 3 }];
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-BALANCE-GENERAL.xlsx");
			blockUI.stop();
		}
		$scope.calcularResultadoExcel = function(dato){
			var ingresosBs = 0;
			var ingresosUsd = 0;
			var egresosBs = 0;
			var egresosUsd = 0;
			for (let i = 0; i < dato.cuentasGrupoEERR.length; i++) {
				if (dato.cuentasGrupoEERR[i].nombre === "INGRESO") {
					dato.cuentasIngresoGastoEERR
					.filter(cuenta => cuenta.codigo.substr(0,1) === dato.cuentasGrupoEERR[i].codigo_cuenta_grupo)
					.reduce(function(accu, valor){
						ingresosBs += valor.saldo;
						ingresosUsd += valor.saldo_sus;
					}, [] )
				}
				if (dato.cuentasGrupoEERR[i].nombre === "GASTOS") {
					dato.cuentasIngresoGastoEERR
					.filter(cuenta => cuenta.codigo.substr(0,1) === dato.cuentasGrupoEERR[i].codigo_cuenta_grupo)
					.reduce(function(accu, valor){
						egresosBs += valor.saldo;
						egresosUsd += valor.saldo_sus;
					}, [] )
				}
				
			}
			return {bs:ingresosBs + egresosBs, usd: ingresosUsd + egresosUsd};
		}
		$scope.generarExcelBalanceGeneral = function (configuracionImpresion) {
			var promesa = CuentasContabilidadEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
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
				textoExpresado = "(Expresado en Bolivianos y Dólares)";

				var arregloDatos = ["CÓDIGO", "NOMBRE", "CLASIFICACIÓN", "TIPO CUENTA", 'BOLIVIANOS', 'DOLARES']
			} else {
				var arregloDatos = ["CÓDIGO", "NOMBRE", "CLASIFICACIÓN", "TIPO CUENTA", 'BOLIVIANOS',]
				textoExpresado = "(Expresado en Bolivianos)";
			}

			var arregloCabezera = [["", "BALANCE GENERAL"], [, textoTipoFiltro], [ "", textoExpresado], arregloDatos]
			return arregloCabezera
		}
//Fin XLS Balance General

		$scope.generarWordBalanceGeneral = function () {
			blockUI.start();
			if ($scope.configuracionImpresion.fecha_inicio) {
				$scope.configuracionImpresion.inicio2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_inicio))
				$scope.configuracionImpresion.fin2 = new Date($scope.convertirFecha($scope.configuracionImpresion.fecha_fin))
			}
			$scope.configuracionImpresion.fechasImpresion = $scope.fechasImpresion
			var promesa = CuentasContabilidadEEFF($scope.configuracionImpresion, $scope.usuario.id_empresa);
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
		
		$scope.DibujarFijoApropiacion = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo, limit, logo) {
			doc.font('Helvetica', 8);
			if (dato.cuentasFijos.length > 0) {
				/* for (var i = 0; i < dato.cuentasFijos.length && items <= itemsPorPagina; i++) {
					cuentaGrupo = dato.cuentasFijos[i]
					if (cuentaGrupo.hijos.length > 0) { */
				for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
					cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
					if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 1) {
						cuentaSubGrupo.total = 0
						cuentaSubGrupo.total_sus = 0
						doc.font('Helvetica-Bold', 8)
						doc.text(cuentaSubGrupo.nombre, 30, y)
						doc.font('Helvetica', 8)
						y = y + 12;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = dato.cuentasGenericaActivo[k]
							if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 1) {
								cuentaGenerica.total = 0
								cuentaGenerica.total_sus = 0
								doc.font('Helvetica-Bold', 8)
								doc.text(cuentaGenerica.nombre, 40, y)
								doc.font('Helvetica', 8)
								y = y + 12;
								items++;
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
									doc.font('Helvetica', 8);
								}
								for (var d = 0; d < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; d++) {
									cuentaGenericaDepre = dato.cuentasGenericaActivo[d]
									if (cuentaGenericaDepre.cuenta_activo == 1) {
										var cod = String(cuentaGenericaDepre.codigo).substr(2)
										var codDos = String(cuentaGenerica.codigo).substr(2)
										if (codDos == cod) {
											doc.font('Helvetica', 8);
											if (cuentaGenerica.id != cuentaGenericaDepre.id) {

												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
													doc.font('Helvetica', 8);
												}
											}
										}
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
													doc.text(cuentasApropiacion.nombre, sangria, y)
													doc.text(cuentasApropiacion.saldo, x, y)
													y = y + 12;
													items++;
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
														doc.font('Helvetica', 8);
													}
												}
											}
										}

									} else {
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
													doc.text(cuentasApropiacion.nombre, 50, y)
													doc.text(cuentasApropiacion.saldo, x, y, {width: 60, align: 'right'})
													if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentasApropiacion.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
													y = y + 12;
													items++;
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
														doc.font('Helvetica', 8);
													}
												}
											}
										}
									}
								}
								doc.font('Helvetica-Bold', 8)
								doc.text("Total " + cuentaGenerica.nombre, 90, y);
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaGenerica.total, 2), x, y, {width: 60, align: 'right'})
								doc.font('Helvetica', 8)
								y = y + 12;
								items++;
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
									doc.font('Helvetica', 8);
								}
							}
						}
						doc.font('Helvetica-Bold', 8)
						doc.text("Total " + cuentaSubGrupo.nombre, 100, y);
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
						doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
						doc.font('Helvetica', 8)
						y = y + 12;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioApropiacion(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, limit, logo)
						}
					} else {
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioApropiacion(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, limit, logo)
						}
					}

				}

			} else {
				$scope.dibujarPatrimonioApropiacion(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, limit, logo)
			}

		}
		$scope.dibujarPatrimonioApropiacion = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, limit, logo) {
			if (pagina === totalPaginas) {
				limit = limit - 100
			}
			var totalPasivo = 0
			var totalPasivoSus = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y, {width: 60, align: 'right'});
			var resGest = $scope.calcularResultadoGestion(dato)
			var cuentatotalSus = totalActivos / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalActivosSus, 2), x + 100, y, {width: 60, align: 'right'});
			y += 12
			items++;

			doc.addPage({ margin: 0, bufferPages: true });
			y = 140;
			items = 0;
			pagina = pagina + 1;
			$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
			doc.font('Helvetica', 8);
			
			// doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			doc.font('Helvetica', 8);
			y += 12
			items++;
			for (var i = 0; i < dato.cuentasGrupoPasivo.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoPasivo[i]
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoPasivo.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoPasivo[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0
							doc.font('Helvetica-Bold', 8)
							doc.text(cuentaSubGrupo.nombre, 30, y)
							doc.font('Helvetica', 8)
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
							for (var k = 0; k < dato.cuentasGenericaPasivo.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaPasivo[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									doc.font('Helvetica-Bold', 8)
									doc.text(cuentaGenerica.nombre, 40, y)
									doc.font('Helvetica', 8)
									y = y + 12;
									items++;
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
										doc.font('Helvetica', 8);
									}
									for (var l = 0; l < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; l++) {

										cuentasApropiacion = dato.cuentasPasivosPatrimonios[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											totalPasivo += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											totalPasivoSus += cuentasApropiacion.saldo_sus
											if (cuentasApropiacion.saldo < 0) {
												doc.text(cuentasApropiacion.nombre, 50, y)
												doc.text(number_format_negativo_to_positvo(cuentasApropiacion.saldo, 2), x, y, {width: 60, align: 'right'})
												if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentasApropiacion.saldo_sus, 2), x + 100, y, {width: 60, align: 'right'});
												y = y + 12;
												items++;
											}
											if (items == itemsPorPagina) {
												doc.addPage({ margin: 0, bufferPages: true });
												y = 140;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
												doc.font('Helvetica', 8);
											}
										}
									}
									if ( i === (dato.cuentasGrupoPasivo.length - 1) && j === (dato.cuentasSubGrupoPasivo.length - 1)) {
										y = y + 12;
									}
									doc.font('Helvetica-Bold', 8)
									doc.text("Total " + cuentaGenerica.nombre, 90, y);
									doc.text(number_format_negativo_to_positvo(cuentaGenerica.total, 2), x, y, {width: 60, align: 'right'})
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
									doc.font('Helvetica', 8)
									y = y + 12;
									items++;
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
										doc.font('Helvetica', 8);
									}
								}
								
							}
							doc.font('Helvetica-Bold', 8)
							doc.text("Total " + cuentaSubGrupo.nombre, 100, y);
							if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
							doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
							doc.font('Helvetica', 8)
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
						}
					}
				}
				/*if (i === (dato.cuentasGrupoPasivo.length - 1)) {
					$scope.dibujarPatrimonioEERR(dato, totalPasivo, totalPasivoSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
				}*/
				if (i === (dato.cuentasGrupoPasivo.length - 1)) {
					y = y - 24
					doc.font('Helvetica', 8);
					doc.text("Resultado de la Gestión",50, y - 12);
					doc.text(number_format_negativo_to_positvo(resGest.importeBs, 2), x, y - 12, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(resGest.importeUSD, 2), x + 100, y - 12, {width: 60, align: 'right'});
					y= y + 12;
					items++;

					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO ", 30, y + 12)
					doc.text(number_format_negativo_to_positvo(totalPasivo - resGest.importeBs, 2), x, y + 12, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoSus - resGest.importeUSD, 2), x + 100, y + 12, {width: 60, align: 'right'});
				}
			}
		}
		$scope.DibujarFijoPreestablecido = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo, logo) {
			if (dato.cuentasFijos.length > 0) {
				/* for (var i = 0; i < dato.cuentasFijos.length && items <= itemsPorPagina; i++) {
					cuentaGrupo = dato.cuentasFijos[i]
					if (cuentaGrupo.hijos.length > 0) { */
				for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
					cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
					if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 1) {
						cuentaSubGrupo.total = 0
						cuentaSubGrupo.total_sus = 0
						doc.font('Helvetica-Bold', 8);
						doc.text(cuentaSubGrupo.nombre, 30, y)
						y = y + 12;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = dato.cuentasGenericaActivo[k]
							if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 1) {
								cuentaGenerica.total = 0
								cuentaGenerica.total_sus = 0
								y = y + 12;
								items++;
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
									doc.font('Helvetica', 8);
								}
								for (var d = 0; d < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; d++) {
									cuentaGenericaDepre = dato.cuentasGenericaActivo[d]
									if (cuentaGenericaDepre.cuenta_activo == 1) {
										var cod = String(cuentaGenericaDepre.codigo).substr(2)
										var codDos = String(cuentaGenerica.codigo).substr(2)
										if (codDos == cod) {
											doc.font('Helvetica', 8);
											if (cuentaGenerica.id != cuentaGenericaDepre.id) {

												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
													doc.font('Helvetica', 8);
												}
											}
										}
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										}

									} else {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										
									}
								}
								if (cuentaGenerica.total > 0) {
									doc.text(cuentaGenerica.nombre, 40, y)
									doc.text(number_format_negativo_to_positvo(cuentaGenerica.total, 2), x, y - 20, {width: 60, align: 'right'})
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.total_sus, 2), x + 100, y - 20, {width: 60, align: 'right'});
								}
							}
						}
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL " + cuentaSubGrupo.nombre, 90, y);
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
						doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
						y = y + 12;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					} else {
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					}

				}

			} else {
				$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
			}

		}
		$scope.DibujarFijoComparativoPreestablecido = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo) {
			doc.font('Helvetica', 8);
			if (dato.cuentasFijos.length > 0) {
				/* for (var i = 0; i < dato.cuentasFijos.length && items <= itemsPorPagina; i++) {
					cuentaGrupo = dato.cuentasFijos[i]
					if (cuentaGrupo.hijos.length > 0) { */
				for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
					cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
					if (cuentaSubGrupo.primerAno.cuenta_padre == cuentaGrupo.primerAno.id && cuentaSubGrupo.primerAno.cuenta_activo == 1) {
						cuentaSubGrupo.primerAno.total = 0
						cuentaSubGrupo.primerAno.total_sus = 0
						cuentaSubGrupo.segundoAno.total = 0
						cuentaSubGrupo.segundoAno.total_sus = 0
						doc.text(cuentaSubGrupo.primerAno.nombre, 30, y)
						y = y + 20;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = dato.cuentasGenericaActivo[k]
							if (cuentaGenerica.primerAno.cuenta_padre == cuentaSubGrupo.primerAno.id && cuentaGenerica.primerAno.cuenta_activo == 1) {
								cuentaGenerica.primerAno.total = 0
								cuentaGenerica.primerAno.total_sus = 0
								cuentaGenerica.segundoAno.total = 0
								cuentaGenerica.segundoAno.total_sus = 0
								doc.text(cuentaGenerica.primerAno.nombre, 40, y)
								y = y + 20;
								items++;
								if (items == itemsPorPagina) {
									doc.addPage({ margin: 0, bufferPages: true });
									y = 140;
									items = 0;
									pagina = pagina + 1;
									$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
									doc.font('Helvetica', 8);
								}
								for (var d = 0; d < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; d++) {
									cuentaGenericaDepre = dato.cuentasGenericaActivo[d]
									if (cuentaGenericaDepre.primerAno.cuenta_activo == 1) {
										var cod = String(cuentaGenericaDepre.primerAno.codigo).substr(2)
										var codDos = String(cuentaGenerica.primerAno.codigo).substr(2)
										if (codDos == cod) {
											doc.font('Helvetica', 8);
											if (cuentaGenerica.primerAno.id != cuentaGenericaDepre.primerAno.id) {

												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
													doc.font('Helvetica', 8);
												}
											}
										}
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.primerAno.cuenta_padre == cuentaGenerica.primerAno.id) {
													cuentaGenerica.primerAno.total += cuentasApropiacion.primerAno.saldo
													cuentaSubGrupo.primerAno.total += cuentasApropiacion.primerAno.saldo
													totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.primerAno.saldo
													cuentaGenerica.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
													cuentaSubGrupo.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
													totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.primerAno.saldo_sus
													//segundo año
													cuentaGenerica.segundoAno.total += cuentasApropiacion.segundoAno.saldo
													cuentaSubGrupo.segundoAno.total += cuentasApropiacion.segundoAno.saldo
													totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.segundoAno.saldo
													cuentaGenerica.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
													cuentaSubGrupo.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
													totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.segundoAno.saldo
												}
											}
										}

									} else {
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.primerAno.cuenta_padre == cuentaGenerica.primerAno.id) {
													cuentaGenerica.primerAno.total += cuentasApropiacion.primerAno.saldo
													cuentaSubGrupo.primerAno.total += cuentasApropiacion.primerAno.saldo
													totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.primerAno.saldo
													cuentaGenerica.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
													cuentaSubGrupo.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
													totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.primerAno.saldo_sus
													//segundo año
													cuentaGenerica.segundoAno.total += cuentasApropiacion.segundoAno.saldo
													cuentaSubGrupo.segundoAno.total += cuentasApropiacion.segundoAno.saldo
													totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.segundoAno.saldo
													cuentaGenerica.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
													cuentaSubGrupo.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
													totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.segundoAno.saldo
												}
											}
										}
									}
								}
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.primerAno.total_sus, 2), x + 80, y, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaGenerica.primerAno.total, 2), x + 180, y)
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.segundoAno.total_sus, 2), x + 260, y, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaGenerica.segundoAno.total, 2), x, y)
							}
						}
						doc.text("TOTAL " + cuentaSubGrupo.primerAno.nombre, 90, y);
						doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.primerAno.total, 2), x, y);
						doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.segundoAno.total, 2), x + 180, y);
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.primerAno.total_sus, 2), x + 80, y, {width: 60, align: 'right'});
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.segundoAno.total_sus, 2), x + 260, y, {width: 60, align: 'right'});
						y = y + 20;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
							doc.font('Helvetica', 8);
						}
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						}
					} else {
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
						}
					}

				}

			} else {
				$scope.dibujarPatrimonioPredefinido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
			}

		}
		$scope.DibujarFijoComparativoPreestablecido2 = function (dato, totalesActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentasGrupo, cuentasSubGrupo, cuentasGenericas, cuentasApropiacion, cuentasSubGrupoFijo,
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
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
																	$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															} else {
																if (items == itemsPorPagina) {
																	doc.addPage({ margin: 0, bufferPages: true });
																	y = 140;
																	items = 0;
																	pagina = pagina + 1;
																	$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
																	doc.font('Helvetica', 8);
																}
															}
														} else {
															if (items == itemsPorPagina) {
																doc.addPage({ margin: 0, bufferPages: true });
																y = 140;
																items = 0;
																pagina = pagina + 1;
																$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
																doc.font('Helvetica', 8);
															}
														}


													}
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												} else {
													if (items == itemsPorPagina) {
														doc.addPage({ margin: 0, bufferPages: true });
														y = 140;
														items = 0;
														pagina = pagina + 1;
														$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
														doc.font('Helvetica', 8);
													}
												}
											} else {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
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
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
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
		$scope.DibujarFijoSubGrupo = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo, logo) {
			doc.font('Helvetica', 8);
			if (dato.cuentasFijos.length > 0) {
				for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
					cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
					if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 1) {
						cuentaSubGrupo.total = 0
						cuentaSubGrupo.total_sus = 0
						doc.text(cuentaSubGrupo.nombre, 30, y)
						for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = dato.cuentasGenericaActivo[k]
							if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 1) {
								cuentaGenerica.total = 0
								cuentaGenerica.total_sus = 0
								for (var d = 0; d < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; d++) {
									cuentaGenericaDepre = dato.cuentasGenericaActivo[d]
									if (cuentaGenericaDepre.cuenta_activo == 1) {
										var cod = String(cuentaGenericaDepre.codigo).substr(2)
										var codDos = String(cuentaGenerica.codigo).substr(2)
										if (codDos == cod) {
											doc.font('Helvetica', 8);
											if (cuentaGenerica.id != cuentaGenericaDepre.id) {

												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
													doc.font('Helvetica', 8);
												}
											}
										}
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										}

									} else {
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										}
									}
								}
							}
						}
						//doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y)
						y = y + 20;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						if (cuentaSubGrupo.total > 0) {
							doc.text("Total " + cuentaSubGrupo.nombre, 100, y);
							if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
							doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
							y = y + 20;
							items++;
						}
						if (items == itemsPorPagina) {
							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
							doc.font('Helvetica', 8);
						}
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioSubGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					} else {
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioSubGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					}

				}

			} else {
				$scope.dibujarPatrimonioSubGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
			}

		}
		$scope.DibujarFijoGrupo = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo, logo) {
			doc.font('Helvetica', 8);
			if (dato.cuentasFijos.length > 0) {
				for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
					cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
					if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 1) {
						cuentaSubGrupo.total = 0
						cuentaSubGrupo.total_sus = 0
						for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = dato.cuentasGenericaActivo[k]
							if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 1) {
								cuentaGenerica.total = 0
								cuentaGenerica.total_sus = 0
								for (var d = 0; d < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; d++) {
									cuentaGenericaDepre = dato.cuentasGenericaActivo[d]
									if (cuentaGenericaDepre.cuenta_activo == 1) {
										var cod = String(cuentaGenericaDepre.codigo).substr(2)
										var codDos = String(cuentaGenerica.codigo).substr(2)
										if (codDos == cod) {
											doc.font('Helvetica', 8);
											if (cuentaGenerica.id != cuentaGenericaDepre.id) {
												if (items == itemsPorPagina) {
													doc.addPage({ margin: 0, bufferPages: true });
													y = 140;
													items = 0;
													pagina = pagina + 1;
													$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO", logo);
													doc.font('Helvetica', 8);
												}
											}
										}
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										}

									} else {
										if (d == (dato.cuentasGenericaActivo.length - 1)) {
											for (var l = 0; l < dato.cuentasFijos.length && items <= itemsPorPagina; l++) {
												cuentasApropiacion = dato.cuentasFijos[l]
												if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
													cuentaGenerica.total += cuentasApropiacion.saldo
													cuentaSubGrupo.total += cuentasApropiacion.saldo
													totalActivos += cuentasApropiacion.saldo
													cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
													cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
													totalActivosSus += cuentasApropiacion.saldo_sus
												}
											}
										}
									}
								}
							}
						}

						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					} else {
						if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
							$scope.dibujarPatrimonioGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo)
						}
					}

				}

			} else {
				$scope.dibujarPatrimonioGrupo(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x)
			}

		}
	
		$scope.dibujarPatrimonioEERR = function (dato, totalPasivo, totalPasivoSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo) {
			$scope.cuentaResutaldoGestion = { nombre: "Resultado de la Gestión", total: 0, total_sus: 0 }
			for (var i = 0; i < dato.cuentasGrupoEERR.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoEERR[i]
				cuentaGrupo.total = 0
				cuentaGrupo.total_sus = 0
				if (cuentaGrupo.nombre != "INGRESO" && cuentaGrupo.nombre != "GASTOS") {
					doc.text(cuentaGrupo.nombre, 50, y)
					y = y + 12;
					items++;

				}
				if (items == itemsPorPagina) {
					doc.addPage({ margin: 0, bufferPages: true });
					y = 140;
					items = 0;
					pagina = pagina + 1;
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
					doc.font('Helvetica', 8);
				}
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoEERR.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoEERR[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0

							for (var k = 0; k < dato.cuentasGenericaEERR.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaEERR[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									for (var l = 0; l < dato.cuentasIngresoGastoEERR.length && items <= itemsPorPagina; l++) {
										cuentasApropiacion = dato.cuentasIngresoGastoEERR[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											totalPasivo += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											totalPasivoSus += cuentasApropiacion.saldo_sus
											cuentaGrupo.total += cuentasApropiacion.saldo
											cuentaGrupo.total_sus += cuentasApropiacion.saldo_sus
										}
									}
								}
							}

						}
					}
					if (cuentaGrupo.nombre == "INGRESO") {
						if( cuentaGrupo.total<0){
							cuentaGrupo.total=cuentaGrupo.total*(-1)
							cuentaGrupo.total_sus=cuentaGrupo.total_sus*(-1)
						}
						$scope.cuentaResutaldoGestion.total = $scope.cuentaResutaldoGestion.total + cuentaGrupo.total
						$scope.cuentaResutaldoGestion.total_sus = $scope.cuentaResutaldoGestion.total_sus + cuentaGrupo.total_sus
					} else if (cuentaGrupo.nombre == "GASTOS") {
						if( cuentaGrupo.total<0){
							cuentaGrupo.total=cuentaGrupo.total*(-1)
							cuentaGrupo.total_sus=cuentaGrupo.total_sus*(-1)
						}
						$scope.cuentaResutaldoGestion.total = $scope.cuentaResutaldoGestion.total - cuentaGrupo.total
						$scope.cuentaResutaldoGestion.total_sus = $scope.cuentaResutaldoGestion.total_sus - cuentaGrupo.total_sus
					} else {
						doc.text("Total 1 " + cuentaGrupo.nombre, 100, y);
						if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
						doc.text(number_format_negativo_to_positvo(cuentaGrupo.total, 2), x, y, {width: 60, align: 'right'})
						y = y + 12;
						items++;
					}
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
						doc.font('Helvetica', 8);
					}
				}
				if (i === (dato.cuentasGrupoEERR.length - 1)) {
					doc.text($scope.cuentaResutaldoGestion.nombre, 50, y - 36)
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo($scope.cuentaResutaldoGestion.total_sus, 2), x + 100, y - 36, {width: 60, align: 'right'});
					doc.text(number_format_negativo_to_positvo($scope.cuentaResutaldoGestion.total, 2), x, y - 36, {width: 60, align: 'right'})
					y = y + 12;
					items++;
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalPasivo, 2), x, y,{width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoSus, 2), x + 100, y, {width: 60, align: 'right'});
				}
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
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
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
												$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
												doc.font('Helvetica', 8);
											}
										} else {
											if (items == itemsPorPagina) {
												doc.addPage({ margin: 0, bufferPages: true });
												y = 140;
												items = 0;
												pagina = pagina + 1;
												$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
												doc.font('Helvetica', 8);
											}
										}
									} else {
										if (items == itemsPorPagina) {
											doc.addPage({ margin: 0, bufferPages: true });
											y = 140;
											items = 0;
											pagina = pagina + 1;
											$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
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
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
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
					doc.text("TOTAL PASIVO Y PATRIMONIO:  ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalesPasivo.totalPasivoPrimerAnio, 2), x, y)
					var saldoSus = Math.round((totalesPasivo.totalPasivoPrimerAnio / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 80, y);
					doc.text(number_format_negativo_to_positvo(totalesPasivo.totalPasivoSegundoAnio, 2), x + 180, y)
					var saldoSus = Math.round((totalesPasivo.totalPasivoSegundoAnio / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 260, y);
				}
			}

		}
		$scope.dibujarPatrimonioPredefinido = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo) {
			var totalPasivo = 0
			var totalPasivoSus = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y, {width: 60, align: 'right'});

			var cuentatotalSus = totalActivos / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalActivosSus, 2), x + 100, y, {width: 60, align: 'right'});
			y += 20
			items++;
			doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			
			y += 20
			items++;
			var resGest = $scope.calcularResultadoGestion(dato);
			for (var i = 0; i < dato.cuentasGrupoPasivo.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoPasivo[i]
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoPasivo.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoPasivo[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0
							doc.text(cuentaSubGrupo.nombre, 30, y)
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
							doc.font('Helvetica', 8);
							for (var k = 0; k < dato.cuentasGenericaPasivo.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaPasivo[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									for (var l = 0; l < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; l++) {
										
										cuentasApropiacion = dato.cuentasPasivosPatrimonios[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											totalPasivo += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											totalPasivoSus += cuentasApropiacion.saldo_sus
										}
									}
									if (cuentaGenerica.total < 0) {
										doc.text(cuentaGenerica.nombre, 40, y)
										doc.text(number_format_negativo_to_positvo(cuentaGenerica.total, 2), x, y, {width: 60, align: 'right'})
										if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
									}
									y = y + 12;
									items++;
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
										doc.font('Helvetica', 8);
									}
								}
								
							}
							
							doc.font('Helvetica-Bold', 8);
							if (j === (dato.cuentasSubGrupoPasivo.length - 1)) {
								doc.text("Total " + cuentaSubGrupo.nombre, 90, y+12);
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus - resGest.importeUSD, 2), x + 100, y+12, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total - resGest.importeBs, 2), x, y+12, {width: 60, align: 'right'})

							}else{
								doc.text("Total " + cuentaSubGrupo.nombre, 90, y);
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
							}
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
						}
					}
				}
				if (i === (dato.cuentasGrupoPasivo.length - 1)) {
					doc.font('Helvetica', 8);
					doc.text("Resultado de la Gestión",40, y-12);
					doc.text(number_format_negativo_to_positvo(resGest.importeBs, 2), x, y-12, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(resGest.importeUSD, 2), x + 100, y-12, {width: 60, align: 'right'});
					y= y + 12;
					items++;

					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalPasivo - resGest.importeBs, 2), x, y, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoSus - resGest.importeUSD, 2), x + 100, y, {width: 60, align: 'right'});
				}
			}
		}
		$scope.calcularResultadoGestion = function (dato) {
			var result = {importeBs: 0, importeUSD: 0};
			for (var i = 0; i < dato.cuentasGrupoEERR.length;  i++) {
				cuentaGrupo = dato.cuentasGrupoEERR[i]
				cuentaGrupo.total = 0
				cuentaGrupo.total_sus = 0
				if (dato.cuentasSubGrupoPasivo.length > 0 ) {
					for (var j = 0; j < dato.cuentasSubGrupoEERR.length; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoEERR[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 
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
						if( cuentaGrupo.total<0){
							cuentaGrupo.total=cuentaGrupo.total*(-1)
							cuentaGrupo.total_sus=cuentaGrupo.total_sus*(-1)
						}
						result.importeBs = result.importeBs + cuentaGrupo.total
						result.importeUSD = result.importeUSD + cuentaGrupo.total_sus
					} else if (cuentaGrupo.nombre == "GASTOS") {
						if( cuentaGrupo.total<0){
							cuentaGrupo.total=cuentaGrupo.total*(-1)
							cuentaGrupo.total_sus=cuentaGrupo.total*(-1)
						}
						result.importeBs = result.importeBs - cuentaGrupo.total
						result.importeUSD = result.importeUSD - cuentaGrupo.total_sus
					} 
				}
				
			}
			return result;
		}
		$scope.dibujarPatrimonioSubGrupo = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo) {
			var result = $scope.calcularResultadoGestion(dato);
			var totalPasivo = 0
			var totalPasivoSus = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y, {width: 60, align: 'right'});

			var cuentatotalSus = totalActivos / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalActivosSus, 2),x + 100, y, {width: 60, align: 'right'});
			y += 12
			items++;
			doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			doc.font('Helvetica', 8);
			y += 12
			items++;
			for (var i = 0; i < dato.cuentasGrupoPasivo.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoPasivo[i]
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoPasivo.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoPasivo[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0
							doc.text(cuentaSubGrupo.nombre, 30, y)
							for (var k = 0; k < dato.cuentasGenericaPasivo.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaPasivo[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									for (var l = 0; l < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; l++) {
										cuentasApropiacion = dato.cuentasPasivosPatrimonios[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											totalPasivo += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											totalPasivoSus += cuentasApropiacion.saldo_sus
										}
									}
								}
							}
							//doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y)
							y = y + 12;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
							if (j === (dato.cuentasSubGrupoPasivo.length - 1)) {
								cuentaSubGrupo.total_sus= cuentaSubGrupo.total_sus - result.importeUSD;
								cuentaSubGrupo.total = cuentaSubGrupo.total - result.importeBs;
							}
							if (cuentaSubGrupo.total < 0) {
								doc.text("Total " + cuentaSubGrupo.nombre, 100, y);
								if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
								doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.total, 2), x, y, {width: 60, align: 'right'})
								y = y + 12;
								items++;
							}
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
								doc.font('Helvetica', 8);
							}
						}
					}
				}
				if (i === (dato.cuentasGrupoPasivo.length - 1)) {
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO:  ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalPasivo - result.importeBs, 2), x , y, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoSus - result.importeUSD, 2), x + 100, y, {width: 60, align: 'right'});
				}
			}
		}
		$scope.dibujarPatrimonioGrupo = function (dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, logo) {

			var totalPasivo = 0
			var totalPasivoSus = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y, {width: 60, align: 'right'});
			var resGest = $scope.calcularResultadoGestion(dato);
			var cuentatotalSus = totalActivos / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalActivosSus, 2), x + 100, y, {width: 60, align: 'right'});
			y += 12
			items++;
			doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			doc.font('Helvetica', 8);
			y += 12
			items++;
			for (var i = 0; i < dato.cuentasGrupoPasivo.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoPasivo[i]
				cuentaGrupo.total = 0
				cuentaGrupo.total_sus = 0
				doc.text(cuentaGrupo.nombre, 30, y)
				y = y + 12;
				items++;
				if (items == itemsPorPagina) {
					doc.addPage({ margin: 0, bufferPages: true });
					y = 140;
					items = 0;
					pagina = pagina + 1;
					$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo );
					doc.font('Helvetica', 8);
				}
				if (dato.cuentasSubGrupoPasivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoPasivo.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoPasivo[j]
						if (cuentaSubGrupo.cuenta_padre == cuentaGrupo.id && cuentaSubGrupo.cuenta_activo == 0) {
							cuentaSubGrupo.total = 0
							cuentaSubGrupo.total_sus = 0
							for (var k = 0; k < dato.cuentasGenericaPasivo.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaPasivo[k]
								if (cuentaGenerica.cuenta_padre == cuentaSubGrupo.id && cuentaGenerica.cuenta_activo == 0) {
									cuentaGenerica.total = 0
									cuentaGenerica.total_sus = 0
									for (var l = 0; l < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; l++) {
										cuentasApropiacion = dato.cuentasPasivosPatrimonios[l]
										if (cuentasApropiacion.cuenta_padre == cuentaGenerica.id) {
											cuentaGenerica.total += cuentasApropiacion.saldo
											cuentaSubGrupo.total += cuentasApropiacion.saldo
											totalPasivo += cuentasApropiacion.saldo
											cuentaGenerica.total_sus += cuentasApropiacion.saldo_sus
											cuentaSubGrupo.total_sus += cuentasApropiacion.saldo_sus
											totalPasivoSus += cuentasApropiacion.saldo_sus
											cuentaGrupo.total += cuentasApropiacion.saldo
											cuentaGrupo.total_sus += cuentasApropiacion.saldo_sus
										}
									}
								}
								if ( j == (dato.cuentasSubGrupoPasivo.length - 1) && k === (dato.cuentasGenericaPasivo.length - 1)) {
									cuentaGrupo.total = cuentaGrupo.total - resGest.importeBs;
									cuentaGrupo.total_sus = cuentaGrupo.total_sus - resGest.importeUSD;
								}
							}

						}

					}
					doc.text("TOTAL " + cuentaGrupo.nombre, 100, y);
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGrupo.total_sus, 2), x + 100, y, {width: 60, align: 'right'});
					doc.text(number_format_negativo_to_positvo(cuentaGrupo.total, 2), x, y, {width: 60, align: 'right'})
					y = y + 12;
					items++;
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO", logo);
						doc.font('Helvetica', 8);
					}
				}
				if (i === (dato.cuentasGrupoPasivo.length - 1)) {
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalPasivo - resGest.importeBs, 2), x, y, {width: 60, align: 'right'})
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(totalPasivoSus - resGest.importeUSD, 2), x + 100, y, {width: 60, align: 'right'});
				}
				
			}
		}
		$scope.dibujarPatrimonioGrupo2 = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {
			var totalPasivo = 0
			doc.font('Helvetica-Bold', 8);
			doc.text("TOTAL ACTIVOS  ", 30, y);
			doc.text(number_format_negativo_to_positvo(totalActivos, 2), x, y);
			var cuentatotalSus = totalActivos / $scope.moneda.dolar
			if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
			y += 20
			items++;
			doc.text("PASIVO Y PATRIMONIO", 0, y, { align: "center" });
			doc.font('Helvetica', 8);
			y += 20
			items++;
			for (var i = 0; i < dato.cuentasPasivosPatrimonios.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasPasivosPatrimonios[i]
				cuentaGrupo.total = 0
				doc.text(cuentaGrupo.nombre, 30, y)

				if (cuentaGrupo.hijos.length > 0) {
					for (var j = 0; j < cuentaGrupo.hijos.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = cuentaGrupo.hijos[j]
						for (var k = 0; k < cuentaSubGrupo.hijos.length && items <= itemsPorPagina; k++) {
							cuentaGenerica = cuentaSubGrupo.hijos[k]
							cuentaGenerica.total = 0
							for (var l = 0; l < cuentaGenerica.hijos.length && items <= itemsPorPagina; l++) {
								cuentaGenerica.hijos[l].saldo = (cuentaGenerica.hijos[l].debe > cuentaGenerica.hijos[l].haber) ? cuentaGenerica.hijos[l].saldo : -(cuentaGenerica.hijos[l].saldo)
								cuentasApropiacion = cuentaGenerica.hijos[l]
								cuentaGenerica.total += cuentasApropiacion.saldo
								cuentaGrupo.total += cuentasApropiacion.saldo
								totalPasivo += cuentasApropiacion.saldo
							}
						}
					}
					doc.text(number_format_negativo_to_positvo(cuentaGrupo.total, 2), x, y)
					y = y + 20;
					items++;
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
						doc.font('Helvetica', 8);
					}
					doc.text("TOTAL " + cuentaGrupo.nombre, 90, y);
					var cuentatotalSus = cuentaGrupo.total / $scope.moneda.dolar
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentatotalSus, 2), x + 130, y);
					doc.text(number_format_negativo_to_positvo(cuentaGrupo.total, 2), x, y)
					y = y + 20;
					items++;
					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 140;
						items = 0;
						pagina = pagina + 1;
						$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "PASIVO Y PATRIMONIO");
						doc.font('Helvetica', 8);
					}
				}
				if (i === (dato.cuentasPasivosPatrimonios.length - 1)) {
					doc.font('Helvetica-Bold', 8);
					doc.text("TOTAL PASIVO Y PATRIMONIO:  ", 30, y)
					doc.text(number_format_negativo_to_positvo(totalPasivo, 2), x, y)
					var saldoSus = Math.round((totalPasivo / $scope.moneda.dolar) * 10000) / 10000;
					if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(saldoSus, 2), x + 130, y);
				}
			}
		}
		$scope.generarPdfPreComparativo = function (dato, totalActivos, doc, y, items, pagina, totalPaginas, itemsPorPagina, x) {

		}
		

		$scope.obtenercodigoCuenta = function (codigo) {
			var checkOK = "123456789";
			var checkStr = codigo;
			var allValid = true;
			var decPoints = 0;
			var nuevoString = "";
			for (i = 0; i < checkStr.length; i++) {
				ch = checkStr.charAt(i);
				for (j = 0; j < checkOK.length; j++) {
					if (ch == checkOK.charAt(j)) {
						nuevoString = nuevoString + ch;
					}
				}
			}
			return nuevoString;
		}
		

		
		$scope.generarPdfComprobantePreestablecido = function (dato, x) {
			var doc = new PDFDocument({compress: false, size: 'letter', margin: 10 });
			var stream = doc.pipe(blobStream());
			// draw some text
			var totalCosto = 0;
			var datos = 2000
			/* var datosPasivo = [] */
			var y = 130, itemsPorPagina = 28, items = 0, pagina = ($scope.configuracionImpresion.usar_empesar_numeracion) ? $scope.configuracionImpresion.empesar_numeracion : 1, totalPaginas = ($scope.configuracionImpresion.usar_empesar_numeracion) ? ($scope.configuracionImpresion.empesar_numeracion - 1) + Math.ceil((datos) / itemsPorPagina) : Math.ceil((datos) / itemsPorPagina);
			var totalesActivos = { totalActivosPrimerAnio: 0, totalActivosPrimerAnioSus: 0, totalActivosSegundoAnio: 0, totalActivosSegundoAnioSus: 0 }
			var totalActivosSus = 0
			$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
			doc.font('Helvetica', 8);
			for (var i = 0; i < dato.cuentasGrupoActivo.length && items <= itemsPorPagina; i++) {
				cuentaGrupo = dato.cuentasGrupoActivo[i]
				if (dato.cuentasSubGrupoActivo.length > 0) {
					for (var j = 0; j < dato.cuentasSubGrupoActivo.length && items <= itemsPorPagina; j++) {
						cuentaSubGrupo = dato.cuentasSubGrupoActivo[j]
						if (cuentaSubGrupo.primerAno.cuenta_padre == cuentaGrupo.primerAno.id && cuentaSubGrupo.primerAno.cuenta_activo == 0) {
							cuentaSubGrupo.primerAno.total = 0
							cuentaSubGrupo.primerAno.total_Sus = 0
							cuentaSubGrupo.segundoAno.total = 0
							cuentaSubGrupo.segundoAno.total_Sus = 0
							doc.text(cuentaSubGrupo.primerAno.nombre, 30, y)
							y = y + 20;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
							for (var k = 0; k < dato.cuentasGenericaActivo.length && items <= itemsPorPagina; k++) {
								cuentaGenerica = dato.cuentasGenericaActivo[k]
								if (cuentaGenerica.primerAno.cuenta_padre == cuentaSubGrupo.primerAno.id && cuentaGenerica.primerAno.cuenta_activo == 0) {
									cuentaGenerica.primerAno.total = 0
									cuentaGenerica.primerAno.total_Sus = 0
									cuentaGenerica.segundoAno.total = 0
									cuentaGenerica.segundoAno.total_Sus = 0
									doc.text(cuentaGenerica.primerAno.nombre, 40, y)
									for (var l = 0; l < dato.cuentasApropiacion.length && items <= itemsPorPagina; l++) {
										cuentasApropiacion = dato.cuentasApropiacion[l]
										if (cuentasApropiacion.primerAno.cuenta_padre == cuentaGenerica.primerAno.id) {
											cuentaGenerica.primerAno.total += cuentasApropiacion.primerAno.saldo
											cuentaSubGrupo.primerAno.total += cuentasApropiacion.primerAno.saldo
											totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.primerAno.saldo
											cuentaGenerica.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
											cuentaSubGrupo.primerAno.total_sus += cuentasApropiacion.primerAno.saldo_sus
											totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.primerAno.saldo_sus
											//segundo año
											cuentaGenerica.segundoAno.total += cuentasApropiacion.segundoAno.saldo
											cuentaSubGrupo.segundoAno.total += cuentasApropiacion.segundoAno.saldo
											totalesActivos.totalActivosPrimerAnio += cuentasApropiacion.segundoAno.saldo
											cuentaGenerica.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
											cuentaSubGrupo.segundoAno.total_sus += cuentasApropiacion.segundoAno.saldo_sus
											totalesActivos.totalActivosPrimerAnioSus += cuentasApropiacion.segundoAno.saldo
										}
									}
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.primerAno.total_sus, 2), x + 80, y);
									doc.text(number_format_negativo_to_positvo(cuentaGenerica.primerAno.total, 2), x + 180, y)
									if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaGenerica.segundoAno.total_sus, 2), x + 260, y);
									doc.text(number_format_negativo_to_positvo(cuentaGenerica.segundoAno.total, 2), x, y)
									y = y + 20;
									items++;
									if (items == itemsPorPagina) {
										doc.addPage({ margin: 0, bufferPages: true });
										y = 140;
										items = 0;
										pagina = pagina + 1;
										$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
										doc.font('Helvetica', 8);
									}
								}
							}
							doc.text("TOTAL " + cuentaSubGrupo.primerAno.nombre, 90, y);
							doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.primerAno.total, 2), x, y);
							doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.segundoAno.total, 2), x + 180, y);
							if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.primerAno.total_sus, 2), x + 80, y);
							if ($scope.configuracionImpresion.bimonetario) doc.text(number_format_negativo_to_positvo(cuentaSubGrupo.segundoAno.total_sus, 2), x + 260, y);
							y = y + 20;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ margin: 0, bufferPages: true });
								y = 140;
								items = 0;
								pagina = pagina + 1;
								$scope.dibujarCabeceraPDFBalanceGeneral(doc, pagina, totalPaginas, "ACTIVO");
								doc.font('Helvetica', 8);
							}
							if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
								$scope.DibujarFijoComparativoPreestablecido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo)

							}
						} else {
							if (j === (dato.cuentasSubGrupoActivo.length - 1)) {
								$scope.DibujarFijoComparativoPreestablecido(dato, totalActivos, totalActivosSus, doc, y, items, pagina, totalPaginas, itemsPorPagina, x, cuentaGrupo)
							}
						}
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
				textoExpresado = "(Expresado en Bolivianos y Dólares)";

				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS', "", 'DOLARES']
			} else {
				var arregloDatos = ["GRUPO", "SUB GRUPO", "GENERICO", "APROPIACION", "", 'BOLIVIANOS']
				textoExpresado = "(Expresado en Bolivianos)";
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

				if (cuenta.clasificacionTipoClasificacionNombre === "ACTIVO") {
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

		$scope.$on('$routeChangeStart', function (next, current) {
			/* 	$scope.eliminarPopup(); */

		});

		$scope.inicio();
	}]);



