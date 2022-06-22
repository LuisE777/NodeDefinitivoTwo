angular.module('agil.servicios')

	.factory('Diccionario', [function () {
		return {
			MOV_ING: "MOVING",
			MOV_EGR: "MOVEGR",
			ING_INV_INICIAL: "III",
			EGRE_FACTURACION: "FACT",
			EGRE_PRE_FACTURACION: "PREFACT",
			EGRE_BAJA: "BAJA",
			EGRE_PROFORMA: "PFR",
			EGRE_TRASPASO: "TRAS",
			EGRE_TRASPASO_ALMACEN: "TRAS_ALM",
			EGRE_AJUSTE: "AJU",
			EGRE_COTIZACION: "COT",
			FACT_IMPRESION_VACIA: "VAC",
			FACT_IMPRESION_COMPLETA: "COMPL",
			FACT_IMPRESION_SEMICOMPLETA: "SEMICOMPL",
			FACT_PAPEL_OFICIO: "OFICIO",
			FACT_PAPEL_CARTA: "CARTA",
			FACT_PAPEL_MEDIOOFICIO: "MEDOFI",
			FACT_PAPEL_ROLLO: "ROLLO",
			FACT_PAPEL_CUARTOCARTA: "CARTACUARTO",
			TIPO_PAGO_CREDITO: "CREDITO",
			TIPO_PAGO_CONTADO: "CONTADO",
			TIPO_PAGO_TARJETA_CREDITO: "TARCRE",
			CENTRO_COSTO_ALMACEN: "ALMACEN",
			ROL_ADMINISTRADOR: "ADMINISTRADOR",
			ROL_VENDEDOR: "VENDEDOR",
			ROL_OPERADOR: "OPERADOR",
			DIA_LUNES: "LUN19",
			DIA_MARTES: "MAR19",
			DIA_MIERCOLES: "MIE19",
			DIA_JUEVES: "JUE19",
			DIA_VIERNES: "VIE19",
			DIA_SABADO: "SAB19",
			DIA_DOMINGO: "DOM19",
			USUARIO_SUPERADMIN: "SUPER-ADMINISTRADOR",
			MENU_RUTAS: "RUTAS",
			MENU_SEGUIMIENTOAPP: "SEGUIMIENTO APP",
			MENU_APPMOVIL: "APP MOVIL",
			MENU_PANTALLACLIENTE: "PANTALLA CLIENTE",
			MENU_PANTALLADESPACHO: "PANTALLA DESPACHO",
			TIPO_PRODUCTO_BASE: "PBASE",
			TIPO_PRODUCTO_INTER: "PINTER",
			TIPO_PRODUCTO_FINAL: "PFINAL",
			DESTINO_CIERRE_BANCO: "DBANCO",
			DESTINO_CIERRE_CAJA: "CAJA",
			DESTINO_CIERRE_SIGUIENTETURNO: "SIGUIENTETURNO",
			ESTADO_MESA_OCUPADO: 'OCU',
			ESTADO_MESA_DISPONIBLE: 'DIS',
			ESTADO_MESA_RESERVADO: 'RE',
			MENU_MESAS: "MESAS",
			MENU_PLAN_CUENTAS: "PLAN CUENTAS",
			MENU_COMPROBANTES: "COMPROBANTES",
			MENU_MEDICO: "PACIENTES",
			IVA_DF: "IVA DF",
			IVA_CF: "IVA CF",
			IT: "IT",
			IT_POR_PAGAR: "IT POR PAGAR",
			CAJA_BANCOS: "CAJA/BANCOS",
			COMPROBANTE_INGRESO: "INGRESO",
			COMPROBANTE_EGRESO: "EGRESO",
			COMPROBANTE_TRASPASO: "TRASPASO",
			COMPROBANTE_CAJA_CHICA: "CAJA CHICA",
			MENU_VEHICULOS: "MANTENIMIENTO",
			MENU_PROFORMAS: "PROFORMAS",
			MENU_USUARIO: "USUARIOS",
			MENU_EMPRESA: "EMPRESAS",
			MENU_VENTA: "VENTAS",
			MENU_COMPRA: "COMPRAS",
			MENU_CONFIGURACION: "CONFIGURACIONES",
			MENU_REPORTE: "REPORTES",
			MENU_LIBRO_COMPRA: "LIBRO DE COMPRAS",
			MENU_LIBRO_VENTAS: "LIBRO DE VENTAS",
			MENU_REPORTE_VENTAS: "REPORTE DE VENTAS",
			MENU_REPORTE_COMPRAS: "REPORTE DE COMPRAS",
			MENU_ESTADO_RESULTADOS: "ESTADO DE RESULTADOS NO CONTABLE",
			MENU_ALMACEN: "ALMACENES",
			MENU_CERT_COD_CONTROL: "CERT. COD. DE CONTROL",
			MENU_ESTADO_CUENTAS_CLIENTES: "ESTADO DE CUENTAS CLIENTES",
			MENU_ESTADO_CUENTAS_PROVEEDORES: "ESTADO DE CUENTAS PROVEEDORES",
			MENU_PANTALLA: "PANTALLAS",
			MENU_DESPACHO: "DESPACHOS",
			MENU_CONCEPTO: "CONCEPTOS",
			MENU_DOSIFICACION: "DOSIFICACIONES",
			TIPO_CORRELATIVO_CLIENTES: "CORRELATIVO CLIENTES",
			TIPO_CORRELATIVO_DESTINOS: "CORRELATIVO DESTINOS",
			MOVING_INVENTARIO_INICIAL: "III",
			MOVING_POR_TRASPASO: "IPT",
			MOVING_POR_DEVOLUCION: "IPD",
			MOVING_DIARIO: "ID",
			MOVING_POR_AJUSTE: "IPA",
			MOVING_POR_PRODUCCION: "IPRO",
			MOVING_POR_IMPORTACION: "IPI",
			MOVING_POR_RETENCION_SERVICIOS: "IPRS",
			MOVING_POR_RETENCION_BIENES: "IPRB",
			MOVING_POR_COMPRA_SIN_FACTURA: "IPCSF",
			IUE: 'IUE',
			IT_RETENCION_BIEN: "IT",
			IUE_RETENCION_BIEN: "IUE",
			CUENTA_ALMACEN_RETENCION_BIEN: "CUENTA DE ALMACEN",
			CUENTA_GASTO_RETENCION_BIEN: "CUENTA DE GASTO",
			IT_RETENCION_BIEN_GASTO: "IT",
			IUE_RETENCION_BIEN_GASTO: "IUE",
			CUENTA_RETENCION_SERVICIO: "CUENTA DE SERVICIO",
			IT_RETENCION_SERVICIO: "IT",
			IUE_RETENCION_SERVICIO: "IUE",
			INGRESO_REVERTIDO: "INGRESO REVERTIDO",
			IVA_DF_REVERTIDO: "IVA DF REVERTIDO",
			CC_ESTADO_PROCESADO: "PROCESADO",
			CC_ESTADO_DESEMBOLSADO: "DESEMBOLSADO",
			CC_ESTADO_VERIFICADO: "VERIFICADO",
			CC_ESTADO_PENDIENTE: "PENDIENTE",
			CC_ESTADO_AUTORIZADO: "AUTORIZADO",
			CC_ESTADO_ANULADO: "ANULADO",
			CC_MOV_ANTICIPO: "ANTICIPO",
			EGRE_SERVICIO: "SERV",
			RRHH_OPCION_FP: 'FICHA DE PERSONA',
			RRHH_OPCION_PREREQUISITO: 'PRE-REQUISITO',
			RRHH_OPCION_DATOS_EMPLEADO: 'DATOS EMPLEADO',
			RRHH_OPCION_FINIQUITO: 'FINIQUITO',
			RRHH_OPCION_ANTICIPO: 'ANTICIPO EXTRAORDINARIO',
			RRHH_OPCION_PRESTAMO: 'PRESTAMO',
			RRHH_OPCION_AUSENCIA_VACACION: 'AUSENCIA Y VACACION',
			RRHH_OPCION_HISTORIAL_FICHAS: 'HISTÓRICO',
			RRHH_OPCION_SUBSIDIO: 'SUBSIDIO',
			RRHH_OPCION_LLAMADA_ATENCION: 'LLAMADAS DE ATENCIÓN',
			RRHH_OPCION_ROL_TURNO: 'ROL DE TURNOS',
			RRHH_OPCION_HORAS_EXTRA: 'HORAS EXTRAS',
			RRHH_OPCION_HOJA_VIDA: 'HOJA DE VIDA',
			RRHH_OPCION_ROPA_TRABAJO: 'ROPA DE TRABAJO',
			CC_OPCION_FONDO_A_RENDIR: 'FONDO A RENDIR',
			CC_OPCION_CIERRE_CAJA: 'CIERRE DE CAJA',
			CC_ESTADO_VALE_PENDIENTE: 'PENDIENTE',
			CC_ESTADO_VALE_PROCESADO: 'PROCESADO',
			CC_RENDICION_INTERNA: 'RENDICIÓN INTERNA',
			CC_RENDICION_EXTERNA: 'RENDICIÓN EXTERNA',
			CC_MOV_INGRESO: 'INGRESO',
			CC_MOV_KARDEX: 'KARDEX',
			CC_MOV_GASTO: 'GASTO',
			CC_MOV_PROVEEDOR: 'PROVEEDOR',
			EGRE_CONSUMO: 'CONSUM',
			VENTA_OPCION_FACTURACION: 'FACTURACIÓN',
			VENTA_OPCION_BAJA: 'BAJA',
			VENTA_OPCION_PROFORMA: 'PROFORMA',
			VENTA_OPCION_TRASPASO: 'TRASPASO',
			VENTA_OPCION_AJUSTE: 'AJUSTE',
			VENTA_OPCION_SERVICIO: 'SERVICIO',
			VENTA_OPCION_TRASPASO_ALMACEN: 'TRASPASO ALMACEN',
			CARGO_FINIQUITO: "REPRESENTANTE LEGA",
			NOMBRE_FINIQUITO: "VIRREIRA MORALES JOSE WALTER",
			INTEGRACION_PROF_FACT: 'PROF/FACTURA',
			MENU_CONSULTAS_DINAMICAS: "CONSULTAS DINÁMICAS",
			MENU_CONTABLE1: "CONTABLE 1",
			MENU_CONTABLE2: "CONTABLE 2"

		}
	}])

	.factory('NumeroLiteral', [function () {
		return {
			prueba: function (numero) {
				var res = this.Convertir(numero);
				return res;
			},

			UNIDADES: ["", "un ", "dos ", "tres ", "cuatro ", "cinco ", "seis ", "siete ", "ocho ", "nueve "],
			DECENAS: ["diez ", "once ", "doce ", "trece ", "catorce ", "quince ", "dieciseis ",
				"diecisiete ", "dieciocho ", "diecinueve ", "veinte ", "veintiuno ", "veintidos ", "veintitres ", "veinticuatro ",
				"veinticinco ", "veintiseis ", "veintisiete ", "veintiocho ", "veintinueve "
				, "treinta ", "cuarenta ",
				"cincuenta ", "sesenta ", "setenta ", "ochenta ", "noventa "],
			CENTENAS: ["", "ciento ", "doscientos ", "trecientos ", "cuatrocientos ", "quinientos ", "seiscientos ",
				"setecientos ", "ochocientos ", "novecientos "],

			Convertir: function (numero, moneda) {
				var mayusculas = true;
				var literal = "";
				var parte_decimal;
				//si el numero utiliza (.) en lugar de (,) -> se reemplaza
				numero = numero.replace(".", ",");
				//si el numero no tiene parte decimal, se le agrega ,00
				if (numero.indexOf(",") == -1) {
					numero = numero + ",00";
				} console.log(numero);
				//se valida formato de entrada -> 0,00 y 999 999 999,00
				var re = /\d{1,9},\d{1,2}/;
				if (re.exec(numero)) {
					//se divide el numero 0000000,00 -> entero y decimal
					var Num = numero.split(",");
					//de da formato al numero decimal
					if (moneda) {
						parte_decimal = Num[1] + "/100 " + moneda + '.';
					} else {
						parte_decimal = Num[1] + "/100 ";
					}

					//se convierte el numero a literal
					if (parseInt(Num[0]) == 0) {//si el valor es cero
						literal = "cero ";
					} else if (parseInt(Num[0]) > 999999) {//si es millon
						literal = this.getMillones(Num[0]);
					} else if (parseInt(Num[0]) > 999) {//si es miles
						literal = this.getMiles(Num[0]);
					} else if (parseInt(Num[0]) > 99) {//si es centena
						literal = this.getCentenas(Num[0]);
					} else if (parseInt(Num[0]) > 9) {//si es decena
						literal = this.getDecenas(Num[0]);
					} else {//sino unidades -> 9
						literal = this.getUnidades(Num[0]);
					}
					//devuelve el resultado en mayusculas o minusculas
					if (mayusculas && moneda) {
						return ("" + literal + parte_decimal).toUpperCase();
					} else {
						return mayusculas ? ("BOLIVIANOS, " + literal + parte_decimal).toUpperCase()  : ("BOLIVIANOS, " + literal + parte_decimal);
					}
				} else {//error, no se puede convertir
					console.log("entro null");
					return literal = null;
				}
			},

			getUnidades: function (numero) {// 1 - 9
				//si tuviera algun 0 antes se lo quita -> 09 = 9 o 009=9
				var num = numero.substring(numero.length - 1);
				return this.UNIDADES[parseInt(num)];
			},

			getDecenas: function (num) {// 99
				var n = parseInt(num);
				if (n < 10) {//para casos como -> 01 - 09
					return this.getUnidades(num);
				} else if (n > 29) {//para 30...99
					var u = this.getUnidades(num);
					if (u == "") { //para 30,40,50,60,70,80,90
						return this.DECENAS[parseInt(num.substring(0, 1)) + 17];
					} else {
						return this.DECENAS[parseInt(num.substring(0, 1)) + 17] + "y " + u;
					}
				} else if (n > 19 && n < 30) {//numeros entre 21 y 29
					var u = this.getUnidades(num);
					if (u == "") { //para 20
						return this.DECENAS[parseInt(num.substring(0, 1)) + 8];
					} else {
						return this.DECENAS[n - 10];
					}
				} else {//numeros entre 11 y 19
					return this.DECENAS[n - 10];
				}
			},

			getCentenas: function (num) {// 999 o 099
				if (parseInt(num) > 99) {//es centena
					if (parseInt(num) == 100) {//caso especial
						return " cien ";
					} else {
						return this.CENTENAS[parseInt(num.substring(0, 1))] + this.getDecenas(num.substring(1));
					}
				} else {//por Ej. 099
					//se quita el 0 antes de convertir a decenas
					return this.getDecenas(parseInt(num) + "");
				}
			},

			getMiles: function (numero) {// 999 999
				//obtiene las centenas
				var c = numero.substring(numero.length - 3);
				//obtiene los miles
				var m = numero.substring(0, numero.length - 3);
				var n = "";
				//se comprueba que miles tenga valor entero
				if (parseInt(m) > 0) {
					n = this.getCentenas(m);
					return n + "mil " + this.getCentenas(c);
				} else {
					return "" + this.getCentenas(c);
				}

			},

			getMillones: function (numero) { //000 000 000
				//se obtiene los miles
				var miles = numero.substring(numero.length - 6);
				//se obtiene los millones
				var millon = numero.substring(0, numero.length - 6);
				var n = "";
				if (millon.length > 1) {
					n = this.getCentenas(millon) + "millones ";
				} else {
					n = this.getUnidades(millon) + "millon ";
				}
				return n + this.getMiles(miles);
			}
		}
	}])

	.factory('VerificarDescuentos', [function () {
		var res = function (detalles) {
			var existencias = { descuento: false, recargo: false, ice: false, excento: false }
			var existe = false;
			if (detalles !== undefined) {
				for (var i = 0; i < detalles.length; i++) {
					if (detalles[i].descuento > 0) {
						existencias.descuento = true;
					}
					if (detalles[i].recargo > 0) {
						existencias.recargo = true;
					}
					if (detalles[i].ice > 0) {
						existencias.ice = true;
					}
					if (detalles[i].excento > 0) {
						existencias.excento = true;
					}
				}
			}
			return existencias;
		};
		return res;
	}])
	.factory('ObtenerImagen', ['$q', function ($q) {
		var res = function (img) {
			var delay = $q.defer();
			convertUrlToBase64Image(img, function (imagenEmpresa) {
				if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
					delay.resolve(imagenEmpresa)
				} else {
					convertUrlToBase64Image("img/agilsoftware.png", function (imagenEmpresa) {
						if (imagenEmpresa.length > 0 && imagenEmpresa !== "error") {
							delay.resolve(imagenEmpresa)
							return imagenEmpresa;
						} else {
							// mostrarMensaje('ERROR no se encuentra la imagen.')
							delay.reject('No se encuentra la imagen.')
						}
					})
				}
			})
			return delay.promise;
		};
		return res;
	}])
	//factory para nuevos comprobantes
	.factory('NuevoComprobante', ["blockUI", "AsignarComprobanteFavorito", "LibroMayorCuenta", "ComprobanteRevisarPaginador", "NuevoComprobanteContabilidad", "ListaCuentasComprobanteContabilidadEspesifica", "ActualizarComprobanteContabilidad", "ImprimirComprobante", "DatosComprobante",
		function (blockUI, AsignarComprobanteFavorito, LibroMayorCuenta, ComprobanteRevisarPaginador, NuevoComprobanteContabilidad, ListaCuentasComprobanteContabilidadEspesifica, ActualizarComprobanteContabilidad, ImprimirComprobante, DatosComprobante) {
			var res = function (SweetAlert, paginator, filtro, usuario, idComprobante, datoslibroMayor, revisar, convertirFecha, cerrarModal, nuevoComprobante,
				buscarCuentaQuery, verificarVentasComprobantes, verificarComprasComprobantes, recargarItemsTabla, number_format, imprimir_comprobante) {
				if (idComprobante) {
					var promesa = AsignarComprobanteFavorito(idComprobante)
					promesa.then(function (entidad) {
						SweetAlert.swal("Guardado!", entidad.mensaje, "success");
						paginator.getSearch("", filtro);
					})
				}
				if (datoslibroMayor) {
					if (datoslibroMayor.filter.asiento.id) {
						var promesa = LibroMayorCuenta(datoslibroMayor)
						return promesa;
					}
				}
				if (revisar) {
					var fechainico = paginator.filter.inicio;
					var fechafin = paginator.filter.fin;
					if (paginator.filter.inicio == null) {
						paginator.filter.inicio = 0
						paginator.filter.fin = 0
					}
					if (paginator.filter.inicio != 0) {
						paginator.filter.inicio = new Date(convertirFecha(filtro.inicio));
						paginator.filter.fin = new Date(convertirFecha(filtro.fin));
					} else {
						fechainico = ""
						fechafin = ""
					}
					var promesa = ComprobanteRevisarPaginador(paginator)
					return promesa;
				}
				if (nuevoComprobante) {
					var fecha = new Date()
					nuevoComprobante.fechaActual = new Date()

					if (!nuevoComprobante.id) {
						nuevoComprobante.importe = 0;
						for (var index = 0; index < nuevoComprobante.asientosContables.length; index++) {
							var element = nuevoComprobante.asientosContables[index];
							if (element.activo != false&& element.debe_bs !=null && element.debe_bs != ""&& element.debe_bs !=undefined) {
								nuevoComprobante.importe = Math.round((nuevoComprobante.importe + element.debe_bs) * 10000) / 10000
							}
						}

						nuevoComprobante.fecha = new Date(convertirFecha(nuevoComprobante.fecha))
						nuevoComprobante.fecha.setHours(fecha.getHours())
						nuevoComprobante.fecha.setMinutes(fecha.getMinutes())
						NuevoComprobanteContabilidad.save(nuevoComprobante, function (dato) {
							//verificarVentasComprobantes(usuario.id_empresa)
							//verificarComprasComprobantes(usuario.id_empresa)
							// imprimir_comprobante(dato.comprobante)

							if (dato.hasErr) {
								SweetAlert.swal({
									title: "Error al guardar!",
									icon: "warning",
									html: dato.mensaje + '<br />' + (dato.hasErr ? dato.stack : '')
								});
							} else {
								SweetAlert.swal({
									title: "Guardado!",
									icon: "success",
									html: dato.mensaje + '<br />' + (dato.hasErr ? dato.stack : '')
								});
							}
							var promesa = DatosComprobante(dato.comprobante.id)
							promesa.then(function (datosComprobante) {
								datosComprobante.comprobante.importe_literal = datosComprobante.importeLiteral
								ImprimirComprobante(datosComprobante.comprobante, false, usuario, number_format)
							})
							recargarItemsTabla()
							cerrarModal();
						})

					} else {
						nuevoComprobante.importe = 0;
						nuevoComprobante.abierto = false
						for (var index = 0; index < nuevoComprobante.asientosContables.length; index++) {
							var element = nuevoComprobante.asientosContables[index];
							if (element.activo != false&& element.debe_bs !=null && element.debe_bs != ""&& element.debe_bs !=undefined) {
								nuevoComprobante.importe = Math.round((nuevoComprobante.importe + element.debe_bs) * 10000) / 10000
							}
						}
						nuevoComprobante.fecha = new Date(convertirFecha(nuevoComprobante.fecha))
						nuevoComprobante.fecha.setHours(fecha.getHours())
						nuevoComprobante.fecha.setMinutes(fecha.getMinutes())
						ActualizarComprobanteContabilidad.update({ id_comprobante: nuevoComprobante.id }, nuevoComprobante, function (dato) {
							//verificarVentasComprobantes(usuario.id_empresa)
							//verificarComprasComprobantes(usuario.id_empresa)
							var promesa = DatosComprobante(nuevoComprobante.id)
							promesa.then(function (datosComprobante) {
								datosComprobante.comprobante.importe_literal = datosComprobante.importeLiteral
								ImprimirComprobante(datosComprobante.comprobante, false, usuario, number_format)
							})

							SweetAlert.swal("Guardado!", dato.mensaje, "success");
							cerrarModal();
							recargarItemsTabla()
						})
					}
				}
				if (buscarCuentaQuery)
					if (buscarCuentaQuery != "" && buscarCuentaQuery != undefined) {
						// console.log(query)
						var promesa = ListaCuentasComprobanteContabilidadEspesifica(usuario.id_empresa, buscarCuentaQuery);
						console.log(promesa)
						return promesa;
					}
			};
			return res;
		}])

	.factory('loggoutUser', ['$resource', function ($resource) {
		return $resource(restServer + "logout");
	}])

	.factory('SalirAlias', ['loggoutUser', '$q', function (loggoutUser, $q) {
		var res = function () {
			var delay = $q.defer();
			loggoutUser.save({}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImprimirComprobante', ['blockUI', 'DibujarCabeceraComprobante', 'Diccionario', 'DibujarCabeceraFacturaNVCartaOficio', 'DibujarCabeceraFacturaNVmedioOficio', '$timeout',
		function (blockUI, DibujarCabeceraComprobante, Diccionario, DibujarCabeceraFacturaNVCartaOficio, DibujarCabeceraFacturaNVmedioOficio, $timeout) {
			var res = function (comprobante, bimonetario, usuario, number_format) {
				var arregloDebe = [], arregloHaber = [], datosDF = { calculo: 0, monto: 0, texto1: "", texto2: "", texto3: "", cant: 0 }, datosCF = { calculo: 0, monto: 0, texto1: "", texto2: "", texto3: "", cant: 0 };
				comprobante.asientosContables.forEach(function (asiento, index, array) {

					if (asiento.debe_bs != 0) {
						arregloDebe.push(asiento)
					} else {
						arregloHaber.push(asiento)
					}
					if (asiento.cuenta.especifica) {
						if (asiento.cuenta.tipo_especifica) {
							datosCF.monto += asiento.debe_bs
							datosCF.texto1 = asiento.cuenta.especificaTexto1.nombre_corto
							datosCF.texto2 = asiento.cuenta.especificaTexto2.nombre_corto
							datosCF.texto3 = asiento.cuenta.especificaTexto3.nombre_corto
							datosCF.cant++
							datosCF.calculo = (datosCF.monto * 100) / 13
							datosCF.calculo = number_format(datosCF.calculo, 2)
						} else {
							datosDF.monto += asiento.haber_bs
							datosDF.texto1 = asiento.cuenta.especificaTexto1.nombre_corto
							datosDF.texto2 = asiento.cuenta.especificaTexto2.nombre_corto
							datosDF.texto3 = asiento.cuenta.especificaTexto3.nombre_corto
							datosDF.cant++
							datosDF.calculo = (datosDF.monto * 100) / 13
							datosDF.calculo = number_format(datosDF.calculo, 2)
						}

					}

					if (index === (array.length - 1)) {

						var asientosContables = arregloDebe.concat(arregloHaber);
						var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
						var stream = doc.pipe(blobStream());
						doc.font('Helvetica', 8);
						var itemsPorPagina = 20;
						var y = 150, items = 0, pagina = 1, totalPaginas = (Math.ceil((asientosContables.length + 2) / itemsPorPagina));
						var sumaDebeBs = 0, sumaHaberBs = 0, sumaDebeSus = 0, sumaHaberSus = 0;
						var fecha = new Date()
						if (bimonetario) {
							DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
							for (var i = 0; i < asientosContables.length && items <= itemsPorPagina; i++) {
								var asiento = asientosContables[i]
								let centrosCosto = ''
								if (asiento.centrosCostos.length > 0) centrosCosto = asiento.centrosCostos.map(centro => centro.centroCosto.nombre).join(',')
								doc.rect(390, y, 0, 30).stroke();
								doc.rect(440, y, 0, 30).stroke();
								doc.rect(490, y, 0, 30).stroke();
								doc.rect(540, y, 0, 30).stroke();
								doc.font('Helvetica', 7);
								doc.text(asiento.cuenta.codigo, 28, y + 5)
								doc.font('Helvetica-Bold', 7);
								if (asiento.cuenta.tipoAuxiliar) doc.text(asiento.cuentaAux.nombre, 28, y + 13, { width: 80 })
								doc.font('Helvetica-Bold', 7);
								doc.text(asiento.cuenta.nombre, 120, y + 5, { width: 190, underline: true })
								doc.font('Helvetica', 7);
								doc.text(asiento.glosa, 125, y + 13, { width: 190 })
								doc.text(centrosCosto, 310, y + 5)
								doc.text("", 350, y + 5)
								var debe_bs = number_format(asiento.debe_bs, 2)
								var haber_bs = number_format(asiento.haber_bs, 2)
								if (debe_bs != "0.00") doc.text(debe_bs, 390, y + 5, { width: 47, align: 'right' })
								if (haber_bs != "0.00") doc.text(haber_bs, 440, y + 5, { width: 47, align: 'right' })
								var debe_sus = number_format(asiento.debe_sus, 2)
								var haber_sus = number_format(asiento.haber_sus, 2)
								if (debe_sus != "0.00") doc.text(debe_sus, 490, y + 5, { width: 47, align: 'right' })
								if (haber_sus != "0.00") doc.text(haber_sus, 540, y + 5, { width: 47, align: 'right' })
								sumaDebeBs += 0 + asiento.debe_bs
								sumaHaberBs += 0 + asiento.haber_bs
								sumaDebeSus += 0 + asiento.debe_sus
								sumaHaberSus += 0 + asiento.haber_sus
								y = y + 30;
								items++;
								if (items === itemsPorPagina) {
									if (pagina != totalPaginas) {
										doc.rect(390, y, 0, 12).stroke();
										doc.rect(440, y, 0, 12).stroke();
										doc.rect(490, y, 0, 12).stroke();
										doc.rect(540, y, 0, 12).stroke();
									}
									doc.addPage({ compress: false, size: 'letter', margin: 10 });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
								}
							}
							doc.font('Helvetica-Bold', 7);
							doc.text("SUMA TOTAL:", 330, y + 5)
							sumaDebeBs = number_format(sumaDebeBs, 2)
							sumaHaberBs = number_format(sumaHaberBs, 2)
							doc.text(sumaDebeBs, 390, y + 5, { width: 47, align: 'right' })
							doc.text(sumaHaberBs, 440, y + 5, { width: 47, align: 'right' })
							sumaHaberSus = number_format(sumaHaberSus, 2)
							sumaDebeSus = number_format(sumaDebeSus, 2)
							doc.text(sumaDebeSus, 490, y + 5, { width: 47, align: 'right' })
							doc.text(sumaHaberSus, 540, y + 5, { width: 47, align: 'right' })
							doc.rect(20, y, 571, 0).stroke();
							doc.rect(20, y + 15, 571, 0).stroke();
							doc.rect(390, y, 0, 15).stroke();
							doc.rect(440, y, 0, 15).stroke();
							doc.rect(490, y, 0, 15).stroke();
							doc.rect(540, y, 0, 15).stroke();
						} else {
							DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
							doc.lineGap(-1.5)
							for (var i = 0; i < asientosContables.length && items <= itemsPorPagina; i++) {
								var asiento = asientosContables[i]
								let centrosCosto = ''
								if (asiento.centrosCostos.length > 0) centrosCosto = asiento.centrosCostos.map(centro => centro.centroCosto.nombre).join(',')
								doc.rect(450, y, 0, 30).stroke();
								doc.rect(520, y, 0, 30).stroke();
								doc.font('Helvetica', 7);
								doc.text(asiento.cuenta.codigo, 38, y + 5, { width: 92 })
								if (asiento.cuenta.tipoAuxiliar) { if (asiento.cuentaAux) doc.font('Helvetica-Bold', 6).text(asiento.cuentaAux.nombre, 38, y + 13, { width: 90 }) }
								doc.font('Helvetica-Bold', 7);
								doc.text(asiento.cuenta.nombre, 130, y + 5, { width: 190, underline: true })
								doc.font('Helvetica', 6);
								doc.text(asiento.glosa, 135, y + 13, { width: 185 })
								doc.font('Helvetica', 6).text(centrosCosto, 322, y + 5, { width:78  })
								doc.text("", 400, y + 5)

								var debe_bs = number_format(asiento.debe_bs, 2)
								var haber_bs = number_format(asiento.haber_bs, 2)
								if (debe_bs != "0.00") doc.text(debe_bs, 450, y + 5, { width: 60, align: 'right' })
								if (haber_bs != "0.00") doc.text(haber_bs, 520, y + 5, { width: 60, align: 'right' })
								sumaDebeBs += 0 + asiento.debe_bs
								sumaHaberBs += 0 + asiento.haber_bs
								y = y + 30;
								items++;
								if (items === itemsPorPagina) {
									if (pagina != totalPaginas) {
										doc.rect(450, y, 0, 12).stroke();
										doc.rect(520, y, 0, 12).stroke();
									}
									doc.addPage({ compress: false, size: 'letter', margin: 10 });
									y = 150;
									items = 0;
									pagina = pagina + 1;
									DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
								}
							}
							doc.font('Helvetica-Bold', 7);
							doc.text("SUMA TOTAL:", 390, y + 5)
							//doc.font('Helvetica', 7);
							sumaDebeBs = number_format(sumaDebeBs, 2)
							sumaHaberBs = number_format(sumaHaberBs, 2)
							doc.text(sumaDebeBs, 450, y + 5, { width: 60, align: 'right' })
							doc.text(sumaHaberBs, 520, y + 5, { width: 60, align: 'right' })
							doc.rect(20, y, 571, 0).stroke();
							doc.rect(20, y + 15, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.rect(450, y, 0, 15).stroke();
							doc.rect(520, y, 0, 15).stroke();
						}
						doc.text("Son:", 38, y + 20)
						doc.font('Helvetica', 7);
						doc.text(comprobante.importe_literal, 60, y + 20)
						doc.rect(20, y + 30, 571, 0).stroke();

						if (comprobante.tipoComprobante.nombre == "TRASPASO") {
							doc.rect(20, 720, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.text("Preparado por:", 38, 725)
							doc.font('Helvetica', 7);
							doc.text(usuario.persona.nombre_completo, 38, 735)
							doc.rect(200, 720, 0, 42).stroke();
							var fechaActual = new Date(comprobante.fecha_creacion)
							var mont = fechaActual.getMonth() + 1
							var min = fechaActual.getMinutes()
							if (min < 10) { min = "0" + fechaActual.getMinutes() }
							var hora = fechaActual.getHours()
							if (hora < 10) { hora = "0" + fechaActual.getHours() }
							var sec = fechaActual.getSeconds()
							if (sec < 10) { sec = "0" + fechaActual.getSeconds() }
							if (mont < 10) {
								doc.text(+fechaActual.getDate() + "/0" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							} else {
								doc.text(+fechaActual.getDate() + "/" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							}
							var mont2 = fecha.getMonth() + 1
							var min2 = fecha.getMinutes()
							if (min2 < 10) { min2 = "0" + fecha.getMinutes() }
							var hora2 = fecha.getHours()
							if (hora2 < 10) { hora2 = "0" + fecha.getHours() }
							var sec2 = fecha.getSeconds()
							if (sec2 < 10) { sec2 = "0" + fecha.getSeconds() }
							if (mont2 < 10) {
								doc.text("IMP.:" + fecha.getDate() + "/0" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							} else {
								doc.text("IMP.:" + fecha.getDate() + "/" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							}
							doc.text("Revisado", 290, 752)
							doc.text("Autorizado", 480, 752)

							doc.rect(410, 720, 0, 42).stroke();
							doc.rect(20, 750, 571, 0).stroke();
						} else {
							doc.rect(20, 720, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.text("Preparado por:", 38, 725)
							doc.font('Helvetica', 7);
							doc.text(usuario.persona.nombre_completo, 38, 735)
							doc.rect(200, 720, 0, 42).stroke();
							var fechaActual = new Date(comprobante.fecha_creacion)
							var mont = fechaActual.getMonth() + 1
							var min = fechaActual.getMinutes()
							if (min < 10) { min = "0" + fechaActual.getMinutes() }
							var hora = fechaActual.getHours()
							if (hora < 10) { hora = "0" + fechaActual.getHours() }
							var sec = fechaActual.getSeconds()
							if (sec < 10) { sec = "0" + fechaActual.getSeconds() }
							if (mont < 10) {
								doc.text(+fechaActual.getDate() + "/0" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							} else {
								doc.text(+fechaActual.getDate() + "/" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							}
							var mont2 = fecha.getMonth() + 1
							var min2 = fecha.getMinutes()
							if (min2 < 10) { min2 = "0" + fecha.getMinutes() }
							var hora2 = fecha.getHours()
							if (hora2 < 10) { hora2 = "0" + fecha.getHours() }
							var sec2 = fecha.getSeconds()
							if (sec2 < 10) { sec2 = "0" + fecha.getSeconds() }
							if (mont2 < 10) {
								doc.text("IMP.:" + fecha.getDate() + "/0" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							} else {
								doc.text("IMP.:" + fecha.getDate() + "/" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							}
							doc.text("Revisado", 240, 752)
							doc.text("Autorizado", 350, 752)
							doc.text("Recibio conforme:", 425, 740)
							doc.text("CI:", 425, 752)
							doc.rect(310, 720, 0, 42).stroke();
							doc.rect(420, 720, 0, 42).stroke();
							doc.rect(20, 750, 571, 0).stroke();
						}
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							var w = window.open(fileURL, '_blank', 'location=no');
							$timeout(function () {
								w.print();
							}, 500);
						});
						blockUI.stop();
					}

				});



			};
			return res;
		}])

	.factory('ImprimirComprobanteRes', ['blockUI', 'DibujarCabeceraComprobante', 'Diccionario', 'DibujarCabeceraFacturaNVCartaOficio', 'DibujarCabeceraFacturaNVmedioOficio', '$timeout',
		function (blockUI, DibujarCabeceraComprobante, Diccionario, DibujarCabeceraFacturaNVCartaOficio, DibujarCabeceraFacturaNVmedioOficio, $timeout) {
			var res = function (comprobante, bimonetario, usuario, number_format) {
				var arregloDebe = [], arregloHaber = [], datosDF = { calculo: 0, monto: 0, texto1: "", texto2: "", texto3: "", cant: 0 }, datosCF = { calculo: 0, monto: 0, texto1: "", texto2: "", texto3: "", cant: 0 };
				var reg = {};
				var haberBOB = 0;
				var haberUSD = 0;
				var nuevoComprobante = comprobante.asientosContables.map((cuenta, idx, arr) => {
					if (cuenta.haber_bs != 0 && cuenta.cuenta.codigo == '1010101') {
						reg = cuenta;
						haberBOB += cuenta.haber_bs;
						haberUSD += cuenta.haber_sus;
						delete comprobante.asientosContables[idx];
						cuenta.borrar = true;
					}
					return cuenta;
				});
				comprobante.asientosContables = nuevoComprobante.filter(asiento => asiento.borrar != true);
				reg.haber_bs = haberBOB;
				reg.haber_sus = haberUSD;
				reg.glosa = comprobante.gloza;
				comprobante.asientosContables.push(reg);
				comprobante.asientosContables.forEach(function (asiento, index, array) {
					if (asiento.debe_bs != 0) {
						arregloDebe.push(asiento)
					} else {
						arregloHaber.push(asiento)
					}
					if (asiento.cuenta.especifica) {
						if (asiento.cuenta.tipo_especifica) {
							datosCF.monto += asiento.debe_bs
							datosCF.texto1 = asiento.cuenta.especificaTexto1.nombre_corto
							datosCF.texto2 = asiento.cuenta.especificaTexto2.nombre_corto
							datosCF.texto3 = asiento.cuenta.especificaTexto3.nombre_corto
							datosCF.cant++
							datosCF.calculo = (datosCF.monto * 100) / 13
							datosCF.calculo = number_format(datosCF.calculo, 2)
						} else {
							datosDF.monto += asiento.haber_bs
							datosDF.texto1 = asiento.cuenta.especificaTexto1.nombre_corto
							datosDF.texto2 = asiento.cuenta.especificaTexto2.nombre_corto
							datosDF.texto3 = asiento.cuenta.especificaTexto3.nombre_corto
							datosDF.cant++
							datosDF.calculo = (datosDF.monto * 100) / 13
							datosDF.calculo = number_format(datosDF.calculo, 2)
						}

					}

					if (index === (array.length - 1)) {

						var asientosContables = arregloDebe.concat(arregloHaber);
						var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
						var stream = doc.pipe(blobStream());
						doc.font('Helvetica', 8);
						var itemsPorPagina = 19;
						var y = 150, items = 0, pagina = 1, totalPaginas = Math.ceil(asientosContables.length / itemsPorPagina);
						var sumaDebeBs = 0, sumaHaberBs = 0, sumaDebeSus = 0, sumaHaberSus = 0;
						var fecha = new Date()
						if (bimonetario) {
							DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
							for (var i = 0; i < asientosContables.length && items <= itemsPorPagina; i++) {
								var asiento = asientosContables[i]
								let centrosCosto = ''
								if (asiento.centrosCostos.length > 0) centrosCosto = asiento.centrosCostos.map(centro => centro.centroCosto.nombre).join(',')
								doc.rect(390, y, 0, 30).stroke();
								doc.rect(440, y, 0, 30).stroke();
								doc.rect(490, y, 0, 30).stroke();
								doc.rect(540, y, 0, 30).stroke();
								doc.font('Helvetica', 7);
								doc.text(asiento.cuenta.codigo, 28, y + 5)
								doc.font('Helvetica-Bold', 7);
								if (asiento.cuenta.tipoAuxiliar) doc.text(asiento.cuentaAux.nombre, 28, y + 13, { width: 80 })
								doc.font('Helvetica-Bold', 7);
								doc.text(asiento.cuenta.nombre, 120, y + 5, { width: 190, underline: true })
								doc.font('Helvetica', 7);
								doc.text(asiento.glosa, 125, y + 13, { width: 190 })
								doc.text(centrosCosto, 310, y + 5)
								doc.text("", 350, y + 5)
								var debe_bs = number_format(asiento.debe_bs, 2)
								var haber_bs = number_format(asiento.haber_bs, 2)
								if (debe_bs != "0.00") doc.text(debe_bs, 395, y + 5)
								if (haber_bs != "0.00") doc.text(haber_bs, 445, y + 5)
								var debe_sus = number_format(asiento.debe_sus, 2)
								var haber_sus = number_format(asiento.haber_sus, 2)
								if (debe_sus != "0.00") doc.text(debe_sus, 500, y + 5)
								if (haber_bs != "0.00") doc.text(haber_sus, 545, y + 5)
								sumaDebeBs += 0 + asiento.debe_bs
								sumaHaberBs += 0 + asiento.haber_bs
								sumaDebeSus += 0 + asiento.debe_sus
								sumaHaberSus += 0 + asiento.haber_sus
								y = y + 30;
								items++;
								if (items > itemsPorPagina) {
									doc.addPage({ compress: false, size: 'letter', margin: 10 });
									y = 160;
									items = 0;
									pagina = pagina + 1;
									DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
								}
							}
							doc.font('Helvetica-Bold', 7);
							doc.text("SUMA TOTAL:", 330, y + 5)
							sumaDebeBs = number_format(sumaDebeBs, 2)
							sumaHaberBs = number_format(sumaHaberBs, 2)
							doc.text(sumaDebeBs, 395, y + 5)
							doc.text(sumaHaberBs, 445, y + 5)
							sumaHaberSus = number_format(sumaHaberSus, 2)
							sumaDebeSus = number_format(sumaDebeSus, 2)
							doc.text(sumaDebeSus, 500, y + 5)
							doc.text(sumaHaberSus, 545, y + 5)
							doc.rect(20, y, 571, 0).stroke();
							doc.rect(20, y + 20, 571, 0).stroke();
							doc.rect(390, y, 0, 20).stroke();
							doc.rect(440, y, 0, 20).stroke();
							doc.rect(490, y, 0, 20).stroke();
							doc.rect(540, y, 0, 20).stroke();
						} else {
							DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
							for (var i = 0; i < asientosContables.length && items <= itemsPorPagina; i++) {
								var asiento = asientosContables[i]
								let centrosCosto = ''
								if (asiento.centrosCostos.length > 0) centrosCosto = asiento.centrosCostos.map(centro => centro.centroCosto.nombre).join(',')
								doc.rect(450, y, 0, 30).stroke();
								doc.rect(520, y, 0, 30).stroke();
								doc.font('Helvetica', 7);
								doc.text(asiento.cuenta.codigo, 38, y + 5)
								doc.font('Helvetica-Bold', 7);
								if (asiento.cuenta.tipoAuxiliar) { if (asiento.cuentaAux) doc.text(asiento.cuentaAux.nombre, 38, y + 13, { width: 80 }) }
								doc.font('Helvetica-Bold', 7);
								doc.text(asiento.cuenta.nombre, 130, y + 5, { width: 190, underline: true })
								doc.font('Helvetica', 7);
								doc.text(asiento.glosa, 135, y + 13, { width: 190 })
								doc.text(centrosCosto, 340, y + 5)
								doc.text("", 380, y + 5)
								var debe_bs = number_format(asiento.debe_bs, 2)
								var haber_bs = number_format(asiento.haber_bs, 2)
								if (debe_bs != "0.00") doc.text(debe_bs, 470, y + 5)
								if (haber_bs != "0.00") doc.text(haber_bs, 540, y + 5)
								sumaDebeBs += 0 + asiento.debe_bs
								sumaHaberBs += 0 + asiento.haber_bs
								y = y + 30;
								items++;
								if (items > itemsPorPagina) {
									doc.rect(450, y, 0, 2).stroke();
									doc.rect(520, y, 0, 2).stroke();
									doc.addPage({ compress: false, size: 'letter', margin: 10 });
									y = 160;
									items = 0;
									pagina = pagina + 1;
									DibujarCabeceraComprobante(doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF);
								}
							}
							doc.font('Helvetica-Bold', 7);
							doc.text("SUMA TOTAL:", 390, y + 5)
							doc.font('Helvetica', 7);
							sumaDebeBs = number_format(sumaDebeBs, 2)
							sumaHaberBs = number_format(sumaHaberBs, 2)
							doc.text(sumaDebeBs, 470, y + 5)
							doc.text(sumaHaberBs, 540, y + 5)
							doc.rect(20, y, 571, 0).stroke();
							doc.rect(20, y + 20, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.rect(450, y, 0, 20).stroke();
							doc.rect(520, y, 0, 20).stroke();
						}
						doc.text("Son:", 38, y + 25)
						doc.font('Helvetica', 7);
						doc.text(comprobante.importe_literal, 60, y + 25)

						doc.rect(20, y + 40, 571, 0).stroke();
						if (comprobante.tipoComprobante.nombre == "TRASPASO") {
							doc.rect(20, 720, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.text("Preparado por:", 38, 725)
							doc.font('Helvetica', 7);
							doc.text(usuario.persona.nombre_completo, 38, 735)
							doc.rect(200, 720, 0, 42).stroke();
							var fechaActual = new Date(comprobante.fecha_creacion)
							var mont = fechaActual.getMonth() + 1
							var min = fechaActual.getMinutes()
							if (min < 10) { min = "0" + fechaActual.getMinutes() }
							var hora = fechaActual.getHours()
							if (hora < 10) { hora = "0" + fechaActual.getHours() }
							var sec = fechaActual.getSeconds()
							if (sec < 10) { sec = "0" + fechaActual.getSeconds() }
							if (mont < 10) {
								doc.text(+fechaActual.getDate() + "/0" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							} else {
								doc.text(+fechaActual.getDate() + "/" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							}
							var mont2 = fecha.getMonth() + 1
							var min2 = fecha.getMinutes()
							if (min2 < 10) { min2 = "0" + fecha.getMinutes() }
							var hora2 = fecha.getHours()
							if (hora2 < 10) { hora2 = "0" + fecha.getHours() }
							var sec2 = fecha.getSeconds()
							if (sec2 < 10) { sec2 = "0" + fecha.getSeconds() }
							if (mont2 < 10) {
								doc.text("IMP.:" + fecha.getDate() + "/0" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							} else {
								doc.text("IMP.:" + fecha.getDate() + "/" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							}
							doc.text("Revisado", 290, 752)
							doc.text("Autorizado", 480, 752)

							doc.rect(410, 720, 0, 42).stroke();
							doc.rect(20, 750, 571, 0).stroke();
						} else {
							doc.rect(20, 720, 571, 0).stroke();
							doc.font('Helvetica-Bold', 7);
							doc.text("Preparado por:", 38, 725)
							doc.font('Helvetica', 7);
							doc.text(usuario.persona.nombre_completo, 38, 735)
							doc.rect(200, 720, 0, 42).stroke();
							var fechaActual = new Date(comprobante.fecha_creacion)
							var mont = fechaActual.getMonth() + 1
							var min = fechaActual.getMinutes()
							if (min < 10) { min = "0" + fechaActual.getMinutes() }
							var hora = fechaActual.getHours()
							if (hora < 10) { hora = "0" + fechaActual.getHours() }
							var sec = fechaActual.getSeconds()
							if (sec < 10) { sec = "0" + fechaActual.getSeconds() }
							if (mont < 10) {
								doc.text(+fechaActual.getDate() + "/0" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							} else {
								doc.text(+fechaActual.getDate() + "/" + mont + "/" + fechaActual.getFullYear() + "         " + hora + ":" + min + ":" + sec, 58, 752)
							}
							var mont2 = fecha.getMonth() + 1
							var min2 = fecha.getMinutes()
							if (min2 < 10) { min2 = "0" + fecha.getMinutes() }
							var hora2 = fecha.getHours()
							if (hora2 < 10) { hora2 = "0" + fecha.getHours() }
							var sec2 = fecha.getSeconds()
							if (sec2 < 10) { sec2 = "0" + fecha.getSeconds() }
							if (mont2 < 10) {
								doc.text("IMP.:" + fecha.getDate() + "/0" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							} else {
								doc.text("IMP.:" + fecha.getDate() + "/" + mont2 + "/" + fecha.getFullYear() + "         " + hora2 + ":" + min2 + ":" + sec2, 38, 765)
							}
							doc.text("Revisado", 240, 752)
							doc.text("Autorizado", 350, 752)
							doc.text("Recibio conforme:", 425, 740)
							doc.text("CI:", 425, 752)
							doc.rect(310, 720, 0, 42).stroke();
							doc.rect(420, 720, 0, 42).stroke();
							doc.rect(20, 750, 571, 0).stroke();
						}
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							var w = window.open(fileURL, '_blank', 'location=no');
							$timeout(function () {
								w.print();
							}, 500);
						});
						blockUI.stop();
					}

				});



			};
			return res;
		}])

	.factory('DibujarCabeceraComprobante', [function () {
		var res = function (doc, bimonetario, usuario, comprobante, pagina, totalPaginas, datosCF, datosDF) {
			var fecha = new Date(comprobante.fecha)
			if (bimonetario) {
				doc.rect(20, 30, 571, 732).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), 25, 35)
				if (usuario.empresa.direccion) {
					doc.font('Helvetica', 7).text(usuario.empresa.direccion, 25, 44, { width: 280 })
					doc.text("NIT:", 25, 60)
					doc.text(usuario.empresa.nit, 40, 60)
				} else {
					doc.font('Helvetica', 7);
					doc.text("NIT:", 25, 44)
					doc.text(usuario.empresa.nit, 40, 44)
				}
				doc.font('Helvetica-Bold', 14);
				doc.text("COMPROBANTE DE " + comprobante.tipoComprobante.nombre, 0, 75, { align: 'center' })
				doc.font('Helvetica-Bold', 8);
				doc.text("N° " + comprobante.numero, 515, 35, { width: 85, align: 'center' })
				doc.text(pagina + ' de ' + totalPaginas, 515, 47, { width: 85, align: 'center' })
				doc.text("Gestión " + fecha.getFullYear(), 515, 57, { width: 85, align: 'center' })
				doc.rect(20, 90, 571, 0).stroke();
				doc.font('Helvetica', 8);
				doc.text(comprobante.gloza, 35, 100, { width: 460 })
				doc.font('Helvetica-Bold', 8);
				var mont = fecha.getMonth() + 1
				if (mont < 10) {
					doc.text("Fecha: " + fecha.getDate() + "/0" + mont + "/" + fecha.getFullYear(), 500, 95)
				} else {
					doc.text("Fecha: " + fecha.getDate() + "/" + mont + "/" + fecha.getFullYear(), 500, 95)
				}
				doc.text("T. Cambio: ", 500, 105)
				doc.font('Helvetica', 8);
				doc.text(comprobante.tipoCambio.dolar, 545, 105)
				if (datosCF.cant > 0 && datosDF.cant == 0) doc.text(datosCF.texto1 + " " + datosCF.monto + "    " + datosCF.texto2 + " " + datosCF.calculo + "    " + datosCF.texto3 + " " + datosCF.cant, 400, 117)
				if (datosDF.cant > 0 && datosCF.cant == 0) doc.text(datosDF.texto1 + " " + datosDF.monto + "    " + datosDF.texto2 + " " + datosDF.calculo + "    " + datosDF.texto3 + " " + datosDF.cant, 400, 117)
				if (datosDF.cant > 0 && datosCF.cant > 0) doc.text(datosDF.texto1 + " " + datosDF.monto + "    " + datosDF.texto2 + " " + datosDF.calculo + "    " + datosDF.texto3 + " " + datosDF.cant + "     " + datosCF.texto1 + " " + datosCF.monto + "    " + datosCF.texto2 + " " + datosCF.calculo + "    " + datosCF.texto3 + " " + datosCF.cant, 350, 117)
				doc.font('Helvetica-Bold', 8);
				doc.rect(20, 125, 571, 0).stroke();
				doc.font('Helvetica-Bold', 8);
				doc.text("Cuenta", 45, 135)
				doc.text("Descripcion/Glosa", 140, 135)
				doc.text("C.Costo", 310, 135)
				doc.text("Ref", 350, 135)
				doc.rect(20, 150, 571, 0).stroke();
				doc.rect(390, 125, 0, 25).stroke();
				doc.rect(440, 137, 0, 14).stroke();
				doc.rect(390, 137, 200, 0).stroke();
				doc.text("BOLIVIANOS", 415, 128)
				doc.text("Debe", 405, 140)
				doc.text("Haber", 455, 140)
				doc.rect(490, 125, 0, 25).stroke();
				doc.rect(540, 137, 0, 14).stroke();
				doc.text("DOLARES", 520, 128)
				doc.text("Debe", 505, 140)
				doc.text("Haber", 550, 140)
			} else {
				doc.rect(20, 30, 571, 731).stroke();
				doc.font('Helvetica-Bold', 9);
				doc.text(usuario.empresa.razon_social.toUpperCase(), 25, 35)
				if (usuario.empresa.direccion) {
					doc.font('Helvetica', 7);
					doc.text(usuario.empresa.direccion, 25, 44, { width: 280 })
					doc.text("NIT:", 25, 60)
					doc.text(usuario.empresa.nit, 40, 60)
				} else {
					doc.font('Helvetica', 7);
					doc.text("NIT:", 25, 44)
					doc.text(usuario.empresa.nit, 40, 44)
				}
				doc.font('Helvetica-Bold', 14);
				doc.text("COMPROBANTE DE " + comprobante.tipoComprobante.nombre, 0, 72, { align: 'center' })
				doc.font('Helvetica-Bold', 12);
				doc.text("N° " + comprobante.numero, 515, 35, { width: 85, align: 'center' })
				doc.font('Helvetica-Bold', 8);
				doc.text(pagina + ' de ' + totalPaginas, 515, 47, { width: 85, align: 'center' })
				doc.text("Gestión " + fecha.getFullYear(), 515, 57, { width: 85, align: 'center' })
				doc.rect(20, 90, 571, 0).stroke();
				doc.font('Helvetica', 8);
				doc.text(comprobante.gloza, 35, 100, { width: 460 })
				doc.font('Helvetica-Bold', 8);
				var mont = fecha.getMonth() + 1
				if (mont < 10) {
					doc.text("Fecha: " + fecha.getDate() + "/0" + mont + "/" + fecha.getFullYear(), 500, 100)
				} else {
					doc.text("Fecha: " + fecha.getDate() + "/" + mont + "/" + fecha.getFullYear(), 500, 100)
				}
				doc.text("T. Cambio: ", 500, 108)
				doc.font('Helvetica', 8);
				doc.text(comprobante.tipoCambio.dolar, 545, 108)
				if (datosCF.cant > 0 && datosDF.cant == 0) doc.text(datosCF.texto1 + " " + datosCF.monto + "    " + datosCF.texto2 + " " + datosCF.calculo + "    " + datosCF.texto3 + " " + datosCF.cant, 400, 117)
				if (datosDF.cant > 0 && datosCF.cant == 0) doc.text(datosDF.texto1 + " " + datosDF.monto + "    " + datosDF.texto2 + " " + datosDF.calculo + "    " + datosDF.texto3 + " " + datosDF.cant, 400, 117)
				if (datosDF.cant > 0 && datosCF.cant > 0) doc.text(datosDF.texto1 + " " + datosDF.monto + "    " + datosDF.texto2 + " " + datosDF.calculo + "    " + datosDF.texto3 + " " + datosDF.cant + "     " + datosCF.texto1 + " " + datosCF.monto + "    " + datosCF.texto2 + " " + datosCF.calculo + "    " + datosCF.texto3 + " " + datosCF.cant, 350, 117)
				doc.font('Helvetica-Bold', 8);
				doc.rect(20, 125, 571, 0).stroke();
				doc.text("Cuenta", 50, 135)
				doc.text("Descripcion/Glosa", 150, 135)
				doc.text("C.Costo", 340, 135)
				doc.text("Ref", 418, 135)
				doc.text("BOLIVIANOS", 500, 128)
				doc.rect(20, 150, 571, 0).stroke();//
				doc.rect(450, 137, 140, 0).stroke();//*
				doc.rect(450, 125, 0, 25).stroke();
				doc.rect(520, 137, 0, 14).stroke();
				doc.text("Debe", 475, 140)
				doc.text("Haber", 545, 140)
				/* doc.rect(50, 700, 520, 0).stroke();
				doc.rect(200, 700, 0, 40).stroke();
				doc.rect(320, 700, 0, 40).stroke();
				doc.rect(420, 700, 0, 40).stroke();
				doc.rect(50, 730, 520, 0).stroke(); */
			}
			if (comprobante.eliminado) {
				doc.save()
				doc.font('Times-Roman', 60);
				doc.rotate(330, { origin: [885, 920] })
				doc.fillColor('yellow')
				doc.text('Anulado', {
					width: 410
				}).fillColor('black')
				doc.restore()
			}
		}


		return res;
	}])


	.factory('ComprasComprobante', ['$resource', function ($resource) {
		return $resource(restServer + "comprasComprobante");
	}])
	.factory('CuentasAuxiliares', ['$resource', function ($resource) {
		return $resource(restServer + "cuentas-auxiliares/empresa/:id_empresa/tipo/:tipo");
	}])
	.factory('ListasCuentasAuxiliares', ['CuentasAuxiliares', '$q', function (CuentasAuxiliares, $q) {
		var res = function (idEmpresa, Tipo) {
			var delay = $q.defer();
			CuentasAuxiliares.query({ id_empresa: idEmpresa, tipo: Tipo }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ComprobanteTotalGeneral', ['$resource', function ($resource) {
		return $resource(restServer + "comprobantes/totalGeneral/empresa/:id_empresa");
	}])
	.factory('ComprobanteTotalGeneralEmpresa', ['ComprobanteTotalGeneral', '$q', function (ComprobanteTotalGeneral, $q) {
		var res = function (empresa) {
			var delay = $q.defer();
			ComprobanteTotalGeneral.get({ id_empresa: empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ComprobanteRevisarDatosPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "comprobantes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion/busqueda/:texto_busqueda");
	}])

	.factory('ComprobanteRevisarPaginador', ['ComprobanteRevisarDatosPaginador', '$q', function (ComprobanteRevisarDatosPaginador, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			ComprobanteRevisarDatosPaginador.get({ id_empresa: paginator.filter.empresa, pagina: paginator.currentPage, items_pagina: paginator.itemsPerPage, inicio: paginator.filter.inicio, fin: paginator.filter.fin, columna: paginator.column, direccion: paginator.direction, texto_busqueda: paginator.search }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CuentasComprobanteContabilidadEspesifica', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta-espesifica/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaCuentasComprobanteContabilidadEspesifica', ['CuentasComprobanteContabilidadEspesifica', '$q', function (CuentasComprobanteContabilidadEspesifica, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			CuentasComprobanteContabilidadEspesifica.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CuentasComprobanteContabilidad', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaCuentasComprobanteContabilidad', ['CuentasComprobanteContabilidad', '$q', function (CuentasComprobanteContabilidad, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			CuentasComprobanteContabilidad.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CuentasParaAsignar', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta-filtro/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('DibujarCabeceraImpresionCompra', ['$q', function ($q) {
		var res = function (doc, compra, pagina, totalPaginas, existenDescuentos, usuario) {
			if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 50, { width: 50, height: 50 }); }
			doc.font('Helvetica-Bold', 8);
			/*doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
			doc.font('Helvetica', 7);
			doc.text(compra.sucursal.nombre.toUpperCase(), 60, 113);
			doc.text(compra.sucursal.direccion.toUpperCase(), 60, 121);
			var telefono = (compra.sucursal.telefono1 != null ? compra.sucursal.telefono1 : "") +
				(compra.sucursal.telefono2 != null ? "-" + compra.sucursal.telefono2 : "") +
				(compra.sucursal.telefono3 != null ? "-" + compra.sucursal.telefono3 : "");
			doc.text("TELF.: " + telefono, 60, 129);
			doc.text("COCHABAMBA - BOLIVIA", 60, 137);*/
			var telefono1 = compra.sucursal.telefono1 != null ? compra.sucursal.telefono1 : "";
			var telefono2 = compra.sucursal.telefono2 != null ? "-" + compra.sucursal.telefono2 : "";
			var telefono3 = compra.sucursal.telefono3 != null ? "-" + compra.sucursal.telefono3 : "";
			doc.text(usuario.empresa.razon_social.toUpperCase() + "\n " + compra.sucursal.nombre.toUpperCase() + "\n " + compra.sucursal.direccion.toUpperCase() + "\n TELF: " + telefono1 + "" + telefono2 + "" + telefono3 + "\n COCHABAMBA - BOLIVIA", 40, 30, { width: 180, align: 'center' })
			doc.font('Helvetica-Bold', 16);
			if (compra.movimiento.clase.nombre_corto === 'IPA' || compra.movimiento.clase.nombre_corto === 'IPRO') {
				doc.text("NOTA DE " + compra.movimiento.clase.nombre, 0, 100, { align: 'center' });
				doc.text("Nro.: " + compra.factura, 450, 50);
			} else {
				doc.text("NOTA DE COMPRA", 0, 100, { align: 'center' });
			}
			doc.font('Helvetica-Bold', 8);
			//doc.text(compra.actividad.nombre,380,105,{width:200});

			/*doc.rect(380, 50, 190, 50).stroke();
			doc.text("NIT : ", 390, 60);
			doc.text("FACTURA No : ", 390, 70);
			doc.text("AUTORIZACIÓN No : ", 390, 80);

			doc.text(usuario.empresa.nit, 500, 60);
			doc.text(compra.factura, 500, 70);
			doc.text(compra.autorizacion, 500, 80);*/

			doc.rect(50, 150, 540, 50).stroke();
			doc.text("FECHA : ", 60, 165);
			doc.text(compra.fechaTexto, 155, 165);
			if (compra.movimiento.clase.nombre_corto == 'IPA') {
				doc.text("OBSERVACIÓN : ", 60, 180);
				doc.text(compra.observacion, 155, 180);
			} else if (compra.movimiento.clase.nombre_corto == 'IPRO') {
				doc.text("ALMACEN : ", 60, 180);
				doc.text(compra.almacen.nombre, 155, 180);
			} else {
				doc.text("SEÑOR(ES) : ", 60, 175);
				doc.text("CÓDIGO DE CONTROL : ", 60, 185);
				doc.text("NIT : ", 360, 165);
				doc.text("FACTURA N° : ", 360, 175);
				doc.text("AUTORIZACIÓN No : ", 360, 185);
				doc.text(compra.proveedor.razon_social, 155, 175);
				doc.text(compra.codigo_control, 155, 185);
				doc.text(compra.proveedor.nit, 440, 165).fillColor('red');
				doc.text(compra.factura, 440, 175).fillColor('black');
				doc.text(compra.autorizacion, 440, 185);
			}
			doc.rect(50, 200, 540, 25).stroke();
			doc.rect(50, 225, 540, 792 - 118 - 225).stroke();
			if (compra.movimiento.clase.nombre_corto == 'IPRO') {
				doc.text("CODIGO", 55, 210);
				doc.text("CANT.", 135, 210);
				doc.text("UNID.", 165, 210);
				doc.text("DETALLE", 210, 210);
				doc.text("FECHA VENC.", 400, 205, { width: 50 });
				doc.text("LOTE", 480, 210);
			} else
				if (existenDescuentos) {
					if (usuario.empresa.usar_vencimientos) {
						doc.font('Helvetica-Bold', 7);
						doc.text("CODIGO", 55, 210);
						doc.text("CANT.", 105, 210);
						doc.text("UNID.", 135, 210);
						doc.text("DETALLE", 170, 210);
						doc.text("P. UNIT.", 280, 210);
						doc.text("IMPORTE", 315, 210);
						doc.text("DESC.", 365, 210);
						doc.text("REC.", 395, 210);
						doc.text("ICE", 425, 210);
						doc.text("EXC.", 455, 210);
						doc.text("F. VENC.", 485, 210, { width: 50 });
						doc.text("LOTE", 525, 210);
						doc.text("TOTAL", 555, 210);
					} else {
						doc.font('Helvetica-Bold', 8);
						doc.text("CODIGO", 55, 210);
						doc.text("CANT.", 105, 210);
						doc.text("UNID.", 135, 210);
						doc.text("DETALLE", 170, 210);
						doc.text("P. UNIT.", 300, 210);
						doc.text("IMPORTE", 335, 210);
						doc.text("DESC.", 385, 210);
						doc.text("REC.", 420, 210);
						doc.text("ICE", 455, 210);
						doc.text("EXC.", 490, 210);
						doc.text("TOTAL", 520, 210);
					}
				} else {
					doc.font('Helvetica-Bold', 8);
					doc.text("CODIGO", 55, 210);
					doc.text("CANT.", 135, 210);
					doc.text("UNID.", 165, 210);
					if (usuario.empresa.usar_vencimientos) {
						doc.text("DETALLE", 210, 210);
						doc.text("FECHA VENC.", 400, 205, { width: 50 });
						doc.text("LOTE", 450, 210);
					} else {
						doc.text("DETALLE", 210, 210);
					}
					doc.text("P.UNIT.", 495, 210);
					doc.text("TOTAL", 540, 210);
				}
			doc.font('Helvetica', 6);
			var currentDate = new Date();
			doc.text("Usuario: " + usuario.nombre_usuario + "   " + "Fecha:" + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "   " + "Hr:" + currentDate.getHours() + ":" + currentDate.getMinutes(), 50, 750);

		}
		return res;
	}])
	.factory('GenerarImpresionCompra', ['blockUI', 'DatosCompra', 'DibujarCabeceraImpresionCompra', function (blockUI, DatosCompra, DibujarCabeceraImpresionCompra) {
		var res = function (compra, usuario, ConvertirALiteral, verificarDescuentos) {
			blockUI.start()
			var promesa = DatosCompra(compra.id, usuario.id_empresa);
			promesa.then(function (datos) {
				compra = datos.compra;
				compra.sucursal = datos.sucursal;
				if (usuario.empresa.ver_costos_dolares) {
					compra.numero_literal = ConvertirALiteral(compra.total_dolares != null ? compra.total_dolares.toFixed(2) : (0).toFixed(2), 'Dolares Americanos');
				} else {
					compra.numero_literal = datos.numero_literal;
				}

				compra.fecha = new Date(compra.fecha);
				compra.fechaTexto = compra.fecha.getDate() + "/" + (compra.fecha.getMonth() + 1) + "/" + compra.fecha.getFullYear();
				compra.configuracion = datos.configuracion;
				var doc = new PDFDocument({ size: [612, 792], margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text

				var y = 240, totalAray = 0, itemsPorPagina = 15, items = 0, pagina = 1, totalPaginas = Math.ceil(compra.detallesCompra.length / itemsPorPagina);
				var existenDescuentos = verificarDescuentos(compra.detallesCompra);
				DibujarCabeceraImpresionCompra(doc, compra, pagina, totalPaginas, existenDescuentos, usuario);
				let totalCantidad=0
				var y = 240;
				for (var i = 0; i < compra.detallesCompra.length; i++) {
					if (usuario.empresa.ver_costos_dolares) {
						if (existenDescuentos) {

							if (usuario.empresa.usar_vencimientos) {
								doc.font('Helvetica', 7);
								var longitudCaracteres = compra.detallesCompra[i].producto.codigo.length;
								var yDesc = (longitudCaracteres <= 11) ? y : ((longitudCaracteres > 11 && longitudCaracteres <= 22) ? y - 4 : y - 11);
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, yDesc, { width: 50 });
								doc.text(compra.detallesCompra[i].cantidad, 110, y);
								totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida ? compra.detallesCompra[i].producto.unidad_medida : "", 135, y);

								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 170, y, { width: 130 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 170, y, { width: 130 });
								}

								doc.text(compra.detallesCompra[i].costo_unitario_dolares.toFixed(2), 280, y);
								doc.text(compra.detallesCompra[i].importe_dolares.toFixed(2), 315, y);
								doc.text(compra.descuento_general ? compra.tipo_descuento ? "%" : "Bs" : compra.detallesVenta[i].tipo_descuento ? "%" : "Bs", 365, y - 10);
								doc.text(compra.detallesCompra[i].descuento.toFixed(2), 365, y);
								doc.text(compra.descuento_general ? compra.tipo_recargo ? "%" : "Bs" : compra.detallesVenta[i].tipo_recargo ? "%" : "Bs", 395, y - 10);
								doc.text(compra.detallesCompra[i].recargo.toFixed(2), 395, y);
								doc.text(compra.detallesCompra[i].ice.toFixed(2), 425, y);
								doc.text(compra.detallesCompra[i].excento.toFixed(2), 455, y);
								doc.text(compra.detallesCompra[i].total_dolares.toFixed(2), 555, y);

								if (compra.detallesCompra[i].inventario) {
									compra.detallesCompra[i].inventario.fecha_vencimiento = compra.detallesCompra[i].inventario.fecha_vencimiento ? new Date(compra.detallesCompra[i].inventario.fecha_vencimiento) : "";
									compra.detallesCompra[i].inventario.fechaVencimientoTexto = compra.detallesCompra[i].inventario.fecha_vencimiento ? compra.detallesCompra[i].inventario.fecha_vencimiento.getDate() + "/" + (compra.detallesCompra[i].inventario.fecha_vencimiento.getMonth() + 1) + "/" + compra.detallesCompra[i].inventario.fecha_vencimiento.getFullYear() : "";
									doc.text(compra.detallesCompra[i].inventario.fechaVencimientoTexto, 485, y);
									doc.text((compra.detallesCompra[i].inventario.lote) ? compra.detallesCompra[i].inventario.lote : "", 525, y);
								}
							} else {
								doc.font('Helvetica', 7);
								var longitudCaracteres = compra.detallesCompra[i].producto.codigo.length;
								var yDesc = (longitudCaracteres <= 11) ? y : ((longitudCaracteres > 11 && longitudCaracteres <= 22) ? y - 4 : y - 11);
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, yDesc, { width: 70 });
								doc.text(compra.detallesCompra[i].cantidad, 110, y);
								totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida ? compra.detallesCompra[i].producto.unidad_medida : "", 135, y);

								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 170, y - 6, { width: 130 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 170, y - 6, { width: 130 });
								}

								doc.text(compra.detallesCompra[i].costo_unitario_dolares.toFixed(2), 300, y);
								doc.text(compra.detallesCompra[i].importe_dolares.toFixed(2), 335, y);

								doc.text(compra.descuento_general ? compra.tipo_descuento ? "%" : "Bs" : compra.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
								doc.text(compra.detallesCompra[i].descuento.toFixed(2), 385, y);
								doc.text(compra.descuento_general ? compra.tipo_recargo ? "%" : "Bs" : compra.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
								doc.text(compra.detallesCompra[i].recargo.toFixed(2), 420, y);
								doc.text(compra.detallesCompra[i].ice.toFixed(2), 455, y);
								doc.text(compra.detallesCompra[i].excento.toFixed(2), 490, y);
								doc.text(compra.detallesCompra[i].total_dolares.toFixed(2), 520, y);
							}
						} else {
							doc.font('Helvetica', 7);
							if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, y, { width: 70 });
							doc.text(compra.detallesCompra[i].cantidad, 140, y);
							totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
							if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida, 160, y);
							if (compra.detallesCompra[i].producto) {
								var longitudCaracteres = compra.detallesCompra[i].producto.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y + 11 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
							} else {
								var longitudCaracteres = compra.detallesCompra[i].servicio.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y + 11 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
							}
							if (usuario.empresa.usar_vencimientos) {
								if (compra.detallesCompra[i].inventario) {
									compra.detallesCompra[i].inventario.fecha_vencimiento = compra.detallesCompra[i].inventario.fecha_vencimiento ? new Date(compra.detallesCompra[i].inventario.fecha_vencimiento) : "";
									compra.detallesCompra[i].inventario.fechaVencimientoTexto = compra.detallesCompra[i].inventario.fecha_vencimiento ? compra.detallesCompra[i].inventario.fecha_vencimiento.getDate() + "/" + (compra.detallesCompra[i].inventario.fecha_vencimiento.getMonth() + 1) + "/" + compra.detallesCompra[i].inventario.fecha_vencimiento.getFullYear() : "";
									doc.text(compra.detallesCompra[i].inventario.fechaVencimientoTexto, 400, y);
									doc.text(compra.detallesCompra[i].inventario.lote ? compra.detallesCompra[i].inventario.lote : "", 450, y, { width: 50 });
								}
								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 210, yDesc - 10, { width: 185 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 210, yDesc - 10, { width: 185 });
								}
							} else {
								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 210, yDesc - 11.5, { width: 225 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 210, yDesc - 11.5, { width: 185 });
								}
							}
							doc.text(compra.detallesCompra[i].costo_unitario_dolares != null ? compra.detallesCompra[i].costo_unitario_dolares.toFixed(2) : (0).toFixed(2), 505, y);
							doc.text(compra.detallesCompra[i].total_dolares != null ? compra.detallesCompra[i].total_dolares.toFixed(2) : (0).toFixed(2), 545, y);
						}
					} else {
						if (existenDescuentos) {
							if (usuario.empresa.usar_vencimientos) {
								doc.font('Helvetica', 7);
								var longitudCaracteres = compra.detallesCompra[i].producto.codigo ? compra.detallesCompra[i].producto.codigo.length : 0;
								var yDesc = (longitudCaracteres <= 11) ? y : ((longitudCaracteres > 11 && longitudCaracteres <= 22) ? y - 4 : y - 11);
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, yDesc, { width: 50 });
								doc.text(compra.detallesCompra[i].cantidad, 110, y);
								totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida, 135, y);

								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 170, y, { width: 110 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 170, y, { width: 110 });
								}

								doc.text(compra.detallesCompra[i].costo_unitario.toFixed(2), 280, y);
								doc.text(compra.detallesCompra[i].importe.toFixed(2), 315, y);
								doc.text(compra.descuento_general ? compra.tipo_descuento ? "%" : "Bs" : compra.detallesCompra[i].tipo_descuento ? "%" : "Bs", 365, y - 10);
								doc.text(compra.detallesCompra[i].descuento.toFixed(2), 365, y);
								doc.text(compra.descuento_general ? compra.tipo_recargo ? "%" : "Bs" : compra.detallesCompra[i].tipo_recargo ? "%" : "Bs", 395, y - 10);
								doc.text(compra.detallesCompra[i].recargo.toFixed(2), 395, y);
								doc.text(compra.detallesCompra[i].ice.toFixed(2), 425, y);
								doc.text(compra.detallesCompra[i].excento.toFixed(2), 455, y);
								doc.text(compra.detallesCompra[i].total.toFixed(2), 555, y);

								if (compra.detallesCompra[i].inventario) {
									compra.detallesCompra[i].inventario.fecha_vencimiento = compra.detallesCompra[i].inventario.fecha_vencimiento ? new Date(compra.detallesCompra[i].inventario.fecha_vencimiento) : "";
									compra.detallesCompra[i].inventario.fechaVencimientoTexto = compra.detallesCompra[i].inventario.fecha_vencimiento ? compra.detallesCompra[i].inventario.fecha_vencimiento.getDate() + "/" + (compra.detallesCompra[i].inventario.fecha_vencimiento.getMonth() + 1) + "/" + compra.detallesCompra[i].inventario.fecha_vencimiento.getFullYear() : "";

									doc.text(compra.detallesCompra[i].inventario.fechaVencimientoTexto, 485, y);
									doc.text((compra.detallesCompra[i].inventario.lote) ? compra.detallesCompra[i].inventario.lote : "", 525, y);
								}
							} else {
								doc.font('Helvetica', 7);
								var longitudCaracteres = compra.detallesCompra[i].producto.codigo.length;
								var yDesc = (longitudCaracteres <= 11) ? y : ((longitudCaracteres > 11 && longitudCaracteres <= 22) ? y - 4 : y - 11);
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, yDesc, { width: 70 });
								doc.text(compra.detallesCompra[i].cantidad, 110, y);
								totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
								if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida, 135, y);

								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 170, y - 6, { width: 130 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 170, y - 6, { width: 130 });
								}

								doc.text(compra.detallesCompra[i].costo_unitario.toFixed(2), 300, y);
								doc.text(compra.detallesCompra[i].importe.toFixed(2), 335, y);

								doc.text(compra.descuento_general ? compra.tipo_descuento ? "%" : "Bs" : compra.detallesCompra[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
								doc.text(compra.detallesCompra[i].descuento.toFixed(2), 385, y);
								doc.text(compra.descuento_general ? compra.tipo_recargo ? "%" : "Bs" : compra.detallesCompra[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
								doc.text(compra.detallesCompra[i].recargo.toFixed(2), 420, y);
								doc.text(compra.detallesCompra[i].ice.toFixed(2), 455, y);
								doc.text(compra.detallesCompra[i].excento.toFixed(2), 490, y);
								doc.text(compra.detallesCompra[i].total.toFixed(2), 520, y);
							}
						} else {
							doc.font('Helvetica', 7);
							if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.codigo, 55, y, { width: 70 });
							doc.text(compra.detallesCompra[i].cantidad, 140, y);
							totalCantidad=totalCantidad+compra.detallesCompra[i].cantidad
							if (compra.detallesCompra[i].producto) doc.text(compra.detallesCompra[i].producto.unidad_medida, 160, y);
							if (compra.detallesCompra[i].producto) {
								var longitudCaracteres = compra.detallesCompra[i].producto.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
							} else {
								var longitudCaracteres = compra.detallesCompra[i].servicio.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
							}
							if (usuario.empresa.usar_vencimientos) {
								if (compra.detallesCompra[i].inventario) {
									compra.detallesCompra[i].inventario.fecha_vencimiento = compra.detallesCompra[i].inventario.fecha_vencimiento ? new Date(compra.detallesCompra[i].inventario.fecha_vencimiento) : "";
									compra.detallesCompra[i].inventario.fechaVencimientoTexto = compra.detallesCompra[i].inventario.fecha_vencimiento ? compra.detallesCompra[i].inventario.fecha_vencimiento.getDate() + "/" + (compra.detallesCompra[i].inventario.fecha_vencimiento.getMonth() + 1) + "/" + compra.detallesCompra[i].inventario.fecha_vencimiento.getFullYear() : "";
									doc.text(compra.detallesCompra[i].inventario.fechaVencimientoTexto, 400, y);
									doc.text(compra.detallesCompra[i].inventario.lote ? compra.detallesCompra[i].inventario.lote : "", 460, y);
								}
								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 210, yDesc, { width: 185 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 210, yDesc, { width: 185 });
								}
							} else {
								if (compra.detallesCompra[i].producto) {
									doc.text(compra.detallesCompra[i].producto.nombre, 210, yDesc - 11.5, { width: 225 });
								} else {
									doc.text(compra.detallesCompra[i].servicio.nombre, 210, yDesc - 11.5, { width: 185 });
								}
							}
							if (compra.movimiento.clase.nombre_corto != 'IPRO') {
							doc.text(compra.detallesCompra[i].costo_unitario.toFixed(2), 500, y);
							doc.text(compra.detallesCompra[i].total.toFixed(2), 540, y);
							}
						}
					}


					doc.rect(50, y - 15, 540, 30).stroke();

					y = y + 30;

					items++;

					if (items == itemsPorPagina) {
						totalAray = totalAray + items;
						if (totalAray != compra.detallesCompra.length) {
							/* var currentDate=new Date();
							doc.text("Usuario: "+usuario.nombre_usuario,50,y);
							doc.text("Usuario: "+usuario.nombre_usuario+"   "+"Fecha:"+currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear(),50,y); */
							doc.addPage({ size: [612, 792], margin: 10 });
							y = 240;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraImpresionCompra(doc, compra, pagina, totalPaginas, existenDescuentos, usuario);
						}
					}
				}
				if (compra.movimiento.clase.nombre_corto != 'IPRO') {
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL", 455, 792 - 97);

				doc.font('Helvetica', 8);
				if (usuario.empresa.ver_costos_dolares) {
					doc.text(compra.total_dolares != null ? compra.total_dolares.toFixed(2) : (0).toFixed(2), 520, 792 - 97);
				} else {
					doc.text(compra.total.toFixed(2), 520, 792 - 97);
				}


				doc.text("SON : " + compra.numero_literal, 55, 792 - 97);

			}else{
				
			doc.text("TOTAL", 55, 792 - 97);
			doc.text(totalCantidad, 140, 792 - 97);
			}
				//var currentDate=new Date();
				//doc.text("Usuario: "+usuario.nombre_usuario+"--"+"Fecha:"+currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear(),50,792-100);
				//compra.fecha_limite_emision=new Date(compra.fecha_limite_emision);
				//doc.text("FECHA LÍMITE DE EMISIÓN: "+compra.fecha_limite_emision.getDate()+"/"+(compra.fecha_limite_emision.getMonth()+1)+"/"+compra.fecha_limite_emision.getFullYear(),55,792-100);


				doc.rect(50, 792 - 107, 540, 30).stroke();
				//doc.rect(50, 792 - 72, 400, 20).stroke();
				//doc.rect(50,792-110,400,20).stroke();

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			});
		}
		return res;
	}])
	.factory('ListaCuentasParaAsignar', ['CuentasParaAsignar', '$q', function (CuentasParaAsignar, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			CuentasParaAsignar.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ComprobanteEmpresaPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "comprobantes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion/monto/:monto/tipo-comprobante/:tipo_comprobante/sucursal/:sucursal/usuario/:usuario/numero/:numero/busqueda/:busqueda/gloza/:gloza");
	}])

	.factory('ComprobantePaginador', ['ComprobanteEmpresaPaginador', '$q', function (ComprobanteEmpresaPaginador, $q) {
		var res = function (paginator) {

			if (paginator.filter.monto == null) {
				paginator.filter.monto = 0
			}
			if (paginator.filter.tipo_comprobante == null) {
				paginator.filter.tipo_comprobante = 0;
			}
			if (paginator.filter.sucursal == null) {
				paginator.filter.sucursal = 0;
			}
			if (paginator.filter.usuario == null) {
				paginator.filter.usuario = 0;
			}
			if (paginator.filter.numero == null) {
				paginator.filter.numero = 0;
			}
			if (paginator.filter.gloza == null) {
				paginator.filter.gloza = 0;
			}
			var delay = $q.defer();
			ComprobanteEmpresaPaginador.get({ id_empresa: paginator.filter.empresa, pagina: paginator.currentPage, items_pagina: paginator.itemsPerPage, inicio: paginator.filter.inicio, fin: paginator.filter.fin, columna: paginator.column, direccion: paginator.direction, monto: paginator.filter.monto, tipo_comprobante: paginator.filter.tipo_comprobante, sucursal: paginator.filter.sucursal, usuario: paginator.filter.usuario, numero: paginator.filter.numero, busqueda: paginator.search, gloza: paginator.filter.gloza }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('LibroMayor', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta/:id_cuenta/periodo/:inicio/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cuenta_auxiliar/:cuenta_auxiliar/centro_costos/:centro_costos");
	}])

	.factory('LibroMayorCuenta', ['LibroMayor', '$q', function (LibroMayor, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			LibroMayor.get({
				id_cuenta: paginator.filter.asiento.id,
				inicio: paginator.filter.fechaInicio,
				fin: paginator.filter.fechaFin,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				cuenta_auxiliar: paginator.filter.cuenta_auxiliar,
				centro_costos: paginator.filter.centro_costos
			}, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('LibroMayorReporte', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta-reporte/:id_cuenta/inicio/:inicio/fin/:fin");
	}])

	.factory('LibroMayorCuentaReporte', ['LibroMayorReporte', '$q', function (LibroMayorReporte, $q) {
		var res = function (asientos, inicio, fin) {
			var delay = $q.defer();
			LibroMayorReporte.get({
				id_cuenta: asientos.id,
				inicio: inicio,
				fin: fin
			}, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ComprobanteFavorito', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-contabilidad/favorito/:id_comprobante", { id_comprobante: '@id_comprobante' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('AsignarComprobanteFavorito', ['ComprobanteFavorito', '$q', function (ComprobanteFavorito, $q) {
		var res = function (idComprobante) {
			var delay = $q.defer();
			ComprobanteFavorito.update({ id_comprobante: idComprobante }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('AsientosComprobanteContabilidad', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-cuenta/asientos/:id_cuenta", { id_cuenta: '@id_cuenta' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('FormatoImpresion', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/:nombre_corto", { nombre_corto: '@nombre_corto' },
			{
				'update': { method: 'PUT' }
			});
	}]).factory('IdsFormatoImpresion', ['FormatoImpresion', '$q', function (FormatoImpresion, $q) {
		var res = function () {
			var delay = $q.defer();
			FormatoImpresion.get({ nombre_corto: 'FORM_IMP_FAC' }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaAsientosComprobanteContabilidad', ['AsientosComprobanteContabilidad', '$q', function (AsientosComprobanteContabilidad, $q) {
		var res = function (id_cuenta) {
			var delay = $q.defer();
			AsientosComprobanteContabilidad.query({ id_cuenta: id_cuenta }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('NuevoComprobanteContabilidad', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-contabolidad",
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarComprobanteContabilidad', ['$resource', function ($resource) {
		return $resource(restServer + "comprobante-contabolidad/:id_comprobante", { id_comprobante: '@id_comprobante' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('DatosComprobante', ['ActualizarComprobanteContabilidad', '$q', function (ActualizarComprobanteContabilidad, $q) {
		var res = function (id_comprobante) {
			var delay = $q.defer();
			ActualizarComprobanteContabilidad.get({ id_comprobante: id_comprobante }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('EliminarComprobante', ['ActualizarComprobanteContabilidad', '$q', function (ActualizarComprobanteContabilidad, $q) {
		var res = function (id_comprobante) {
			var delay = $q.defer();
			ActualizarComprobanteContabilidad.save({ id_comprobante: id_comprobante }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	//fin factory para nuevos comprobantes

	.factory('ImprimirSalida', ['Diccionario', 'ImprimirFactura', 'ImprimirProforma', 'ImprimirNotaBaja', 'ImprimirNotaTraspaso', 'ImprimirServicio',
		function (Diccionario, ImprimirFactura, ImprimirProforma, ImprimirNotaBaja, ImprimirNotaTraspaso, ImprimirServicio) {
			var res = function (movimiento, salida, esAccionGuardar, usuario, llevar, mostrarMensaje, tipoFormatoFactura, sinMembresia) {

				if (movimiento == Diccionario.EGRE_FACTURACION) {
					ImprimirFactura(salida, esAccionGuardar, usuario, null, tipoFormatoFactura, sinMembresia);
				} else if (movimiento == Diccionario.EGRE_PROFORMA) {
					ImprimirProforma(salida, esAccionGuardar, usuario, llevar, mostrarMensaje);
				}
				else if (movimiento == Diccionario.EGRE_BAJA) {
					ImprimirNotaBaja(salida, usuario);
				}
				else if (movimiento == Diccionario.EGRE_TRASPASO) {
					ImprimirNotaTraspaso(salida, usuario, mostrarMensaje);
				} else if (movimiento == Diccionario.EGRE_SERVICIO) {
					ImprimirServicio(salida, esAccionGuardar, usuario);
				}

			};
			return res;
		}])

	.factory('ImprimirFactura', ['Diccionario', 'ImprimirFacturaCartaOficio', 'ImprimirFacturaCartaOficioSinFormato', 'ImprimirPedido', 'ImprimirFacturaRollo', '$timeout', 'ImprimirFacturaCartaFormatoNuevo',
		function (Diccionario, ImprimirFacturaCartaOficio, ImprimirFacturaCartaOficioSinFormato, ImprimirPedido, ImprimirFacturaRollo, $timeout, ImprimirFacturaCartaFormatoNuevo) {
			var res = function (salida, esAccionGuardar, usuario, idFormatoImpresion, tipoFacturaConDetalle, sinMembresia) {
				var papel, doc, stream;
				salida.configuracion.formatoColor = salida.configuracion.formatoColorFactura
				salida.configuracion.formatoPapel = salida.configuracion.formatoPapelFactura
				salida.configuracion.color1 = salida.configuracion.color_cabecera_factura
				salida.configuracion.color2 = salida.configuracion.color_detalle_factura
				salida.configuracion.nota = salida.configuracion.nota_factura_bien ? salida.configuracion.nota_factura_bien : ""
				if (salida.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					papel = [612, 936];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						if (tipoFacturaConDetalle === null || tipoFacturaConDetalle === undefined) { //Imprimir formato actual
							ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
						}
						if (tipoFacturaConDetalle === false) { //Imprimir formato nuevo sin detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
						if (tipoFacturaConDetalle === true) { //Imprimir formato nuevo con detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						// ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
						if (tipoFacturaConDetalle === null || tipoFacturaConDetalle === undefined) { //Imprimir formato actual
							ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
						}
						if (tipoFacturaConDetalle === false) { //Imprimir formato nuevo sin detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
						if (tipoFacturaConDetalle === true) { //Imprimir formato nuevo con detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						// ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
						if (tipoFacturaConDetalle === null || tipoFacturaConDetalle === undefined) { //Imprimir formato actual
							ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
						}
						if (tipoFacturaConDetalle === false) { //Imprimir formato nuevo sin detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
						if (tipoFacturaConDetalle === true) { //Imprimir formato nuevo con detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}

					}
				} else if (salida.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					papel = [612, 792];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						//var formatoConMargen = idFormatoImpresion.filter(elem => id)
						//var formatoSinMargen = $filter('id')(idFormatoImpresion,'FORMATO SIN MARGEN');
						//var idConf = idFormatoImpresion[0].id;
						/* if (idFormatoImpresion[0].nombre_corto === 'FORM_C_MAR') {
							var idConFormato = idFormatoImpresion[0].id;
						}
						if (idFormatoImpresion[1].nombre_corto === 'FORM_S_MAR') {
							var idSinFormato = idFormatoImpresion[1].id;
						} */

						/* if (salida.configuracion.id_formato_papel_factura === idConFormato) { */

						// ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
						if (tipoFacturaConDetalle === null || tipoFacturaConDetalle === undefined) { //Imprimir formato actual
							ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
						}
						if (tipoFacturaConDetalle === false) { //Imprimir formato nuevo sin detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}
						if (tipoFacturaConDetalle === true) { //Imprimir formato nuevo con detalle
							ImprimirFacturaCartaFormatoNuevo(salida, papel, usuario, tipoFacturaConDetalle, sinMembresia);
						}



						/* } else if (salida.configuracion.id_formato_papel_factura === idSinFormato) {
							ImprimirFacturaCartaOficioSinFormato(salida, papel, true, false, false, usuario);
						} */

					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
					}
				} else if (salida.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					papel = [598, 600];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
					}
				} else if (salida.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_ROLLO) {
					var alto;
					if (salida.detallesVenta.length <= 2) {
						alto = 610;
					} else {
						alto = 610 + (20 * (salida.detallesVenta.length - 2))
					}
					papel = [226, alto];

					if (esAccionGuardar && !salida.configuracion.imprimir_al_guardar) {
						if (usuario.empresa.usar_pedidos) {
							var sizeY = 230 + (20 * salida.detallesVenta.length);
							if (salida.ImprimirfacturaNoPedidoExpress != true) {
								doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
								stream = doc.pipe(blobStream());
								ImprimirPedido(salida, esAccionGuardar, doc, stream, sizeY, usuario, false);
							}
						}
					} else if (!salida.sin_impresion_proforma_en_express) {

						doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 10, right: 20 } });
						stream = doc.pipe(blobStream());
						ImprimirFacturaRollo(salida, papel, doc, stream, usuario);
						if (usuario.empresa.usar_pedidos && !usuario.empresa.usar_restaurante_express) {
							var sizeY = 230 + (20 * salida.detallesVenta.length);
							if (salida.ImprimirfacturaNoPedidoExpress != true) {
								doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
								ImprimirPedido(salida, esAccionGuardar, doc, stream, sizeY, usuario, false);
							}
						}
					} else {
						if (usuario.empresa.usar_pedidos) {
							var sizeY = 230 + (20 * salida.detallesVenta.length);
							doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
							stream = doc.pipe(blobStream());
							ImprimirPedido(salida, esAccionGuardar, doc, stream, sizeY, usuario, false);
						}
					}
					if (doc && stream) {
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							var w = window.open(fileURL, '_blank', 'location=no');
							$timeout(function () {
								w.print();
							}, 500);
						});
					}
				}
			};
			return res;
		}])
	//imprimir servicio
	.factory('ImprimirServicio', ['Diccionario', 'ImprimirFacturaCartaOficio', 'ImprimirFacturaCartaOficioSinFormato', 'ImprimirPedido', 'ImprimirFacturaRollo', '$timeout',
		function (Diccionario, ImprimirFacturaCartaOficio, ImprimirFacturaCartaOficioSinFormato, ImprimirPedido, ImprimirFacturaRollo, $timeout) {
			var res = function (salida, esAccionGuardar, usuario) {
				var papel, doc, stream;
				salida.configuracion.formatoColor = salida.configuracion.formatoColorFacturaServicio
				salida.configuracion.formatoPapel = salida.configuracion.formatoPapelFacturaServicio
				salida.configuracion.color1 = salida.configuracion.color_cabecera_factura_servicio
				salida.configuracion.color2 = salida.configuracion.color_detalle_factura_servicio
				salida.configuracion.nota = salida.configuracion.nota_factura_servicio ? salida.configuracion.nota_factura_servicio : ""
				if (salida.configuracion.tamanoPapelFacturaServicio.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					papel = [612, 936];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, false, true), usuario;
					}
				} else if (salida.configuracion.tamanoPapelFacturaServicio.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					papel = [612, 792];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						//var formatoConMargen = idFormatoImpresion.filter(elem => id)
						//var formatoSinMargen = $filter('id')(idFormatoImpresion,'FORMATO SIN MARGEN');
						//var idConf = idFormatoImpresion[0].id;
						/* if (idFormatoImpresion[0].nombre_corto === 'FORM_C_MAR') {
							var idConFormato = idFormatoImpresion[0].id;
						}
						if (idFormatoImpresion[1].nombre_corto === 'FORM_S_MAR') {
							var idSinFormato = idFormatoImpresion[1].id;
						}

						if (salida.configuracion.id_formato_papel_factura === idConFormato) { */
						ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
						/* } else if (salida.configuracion.id_formato_papel_factura === idSinFormato) {
							ImprimirFacturaCartaOficioSinFormato(salida, papel, true, false, false, usuario);
						} */

					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
					}
				} else if (salida.configuracion.tamanoPapelFacturaServicio.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					papel = [612, 1008];
					if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
						ImprimirFacturaCartaOficio(salida, papel, true, false, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, true, false, usuario);
					} else if (salida.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
						ImprimirFacturaCartaOficio(salida, papel, false, false, true, usuario);
					}
				} else if (salida.configuracion.tamanoPapelFacturaServicio.nombre_corto == Diccionario.FACT_PAPEL_ROLLO) {
					var alto;
					if (salida.detallesVenta.length <= 2) {
						alto = 610;
					} else {
						alto = 610 + (20 * (salida.detallesVenta.length - 2))
					}
					papel = [227, alto];

					if (esAccionGuardar && !salida.configuracion.imprimir_al_guardar) {
						if (usuario.empresa.usar_pedidos) {
							var sizeY = 230 + (20 * salida.detallesVenta.length);
							doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
							stream = doc.pipe(blobStream());
							ImprimirPedido(salida, esAccionGuardar, doc, stream, sizeY, usuario, false);
						}
					} else {
						doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
						stream = doc.pipe(blobStream());
						ImprimirFacturaRollo(salida, papel, doc, stream, usuario);
						if (usuario.empresa.usar_pedidos) {
							var sizeY = 230 + (20 * salida.detallesVenta.length);
							doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
							ImprimirPedido(salida, esAccionGuardar, doc, stream, sizeY, usuario, false);
						}
					}

					if (doc && stream) {
						doc.end();
						stream.on('finish', function () {
							var fileURL = stream.toBlobURL('application/pdf');
							var w = window.open(fileURL, '_blank', 'location=no');
							$timeout(function () {
								w.print();
							}, 500);
						});
					}
				}
			};
			return res;
		}])

	.factory('ImprimirFacturaCartaFormatoNuevo', ['blockUI', 'VerificarDescuentos', 'Diccionario', 'DibujarCabeceraFacturaNVCartaOficio', 'DibujarCabeceraFacturaNVmedioOficio', '$timeout', 'DibujarCabeceraFacturaCartaOficioFormatoNuevo',
		function (blockUI, VerificarDescuentos, Diccionario, DibujarCabeceraFacturaNVCartaOficio, DibujarCabeceraFacturaNVmedioOficio, $timeout, DibujarCabeceraFacturaCartaOficioFormatoNuevo) {
			var res = function (venta, papel, usuario, tipoFacturaConDetalle, sinMembresia) {
				const number_format = (amount, decimals) => {
					var negativo = false
					if (amount == null) {
						return 0
					}
					if (amount.constructor === Number) {
						if (amount < 0) {
							negativo = true
						}
					} else {
						amount = parseFloat(amount)
						if (amount.constructor === Number) {
							if (amount < 0) {
								negativo = true
							}
						}
					}
					amount += ''; // por si pasan un numero en vez de un string
					amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

					decimals = decimals || 0; // por si la variable no fue fue pasada

					// si no es un numero o es igual a cero retorno el mismo cero
					if (isNaN(amount) || amount === 0)
						return parseFloat(0).toFixed(decimals);

					// si es mayor o menor que cero retorno el valor formateado como numero
					amount = '' + amount.toFixed(decimals);

					var amount_parts = amount.split('.'),
						regexp = /(\d+)(\d{3})/;

					while (regexp.test(amount_parts[0]))
						amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

					var a = amount_parts.join('.');
					if (negativo) {
						return "-" + a
					} else {
						return a
					}
				}
				var doc = new PDFDocument({ compress: false, layout: 'portrait', size: papel, margin: 40 });
				var stream = doc.pipe(blobStream());
				var itemsPorPagina = 0;
				if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					itemsPorPagina = 17;
				} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					itemsPorPagina = 14;
				} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					itemsPorPagina = 3;
				}
				var canvas = document.getElementById('qr-code');
				// draw some text
				// var existencias = VerificarDescuentos(venta.detallesVenta);
				// var existenDescuentos = existencias.descuento

				doc.font('Helvetica', 8);
				var itemsPorPagina = 0;
				if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					itemsPorPagina = 17;
				} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					itemsPorPagina = 14;
				} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					itemsPorPagina = 3;
				}
				// var detalles = venta.detallesVenta !== undefined ? venta.detallesVenta : venta.detallesProformas
				var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
				DibujarCabeceraFacturaCartaOficioFormatoNuevo(doc, venta, papel, pagina, totalPaginas, usuario, tipoFacturaConDetalle, sinMembresia);
				if (tipoFacturaConDetalle) {
					let index_proforma = 0;
					let idProforma = 0;
					let glosa_unica_already_writed = false;
					let glosa_already_writed = false;
					let descripcion_proforma = '';
					for (let i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
						if ((idProforma === 0 && !venta.glosa_unica) || (idProforma !== venta.detallesVenta[i].id_proforma && glosa_already_writed && !venta.glosa_unica)) {
							idProforma = venta.detallesVenta[i].id_proforma;
							index_proforma = venta.datosProformas.findIndex(proforma => proforma.id === idProforma)
							glosa_already_writed = false;
							descripcion_proforma = venta.datosProformas[index_proforma] && venta.datosProformas[index_proforma].detalle || 'Anulada';
						}
						if (venta.glosa_unica && !glosa_unica_already_writed) {
							let lineas_salto = (venta.descripcion && (venta.descripcion.length && Math.floor(Math.floor(venta.descripcion.length / 80) / 3))) || 0;
							if (lineas_salto <= 0) lineas_salto = 1;
							doc.text(venta.descripcion, 132, y, { width: 280 });
							y += 30 * lineas_salto;
							items += lineas_salto;
							glosa_unica_already_writed = true;
						}
						if (!venta.glosa_unica && (idProforma === venta.detallesVenta[i].id_proforma) && !glosa_already_writed) {
							glosa_already_writed = true;
							let lineas_salto = Math.floor(Math.floor(descripcion_proforma.length / 80) / 3);
							if (lineas_salto <= 0) lineas_salto = 1;
							doc.text(descripcion_proforma, 132, y, { width: 280 });
							y += 30 * lineas_salto;
							items += lineas_salto;
						}
						doc.font('Helvetica', 8);
						doc.text(venta.detallesVenta[i].cantidad, 50, y, { align: 'center', width: 80 });
						// var longitudCaracteres = venta.detallesVenta[i].servicio.nombre.length;
						// var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
						doc.text(venta.detallesVenta[i].servicio.nombre, 132, y, { width: 280 });
						doc.text(number_format(venta.detallesVenta[i].precio_unitario, 2), 410, y, { align: 'center', width: 80 });
						doc.text(number_format(venta.detallesVenta[i].total, 2), 490, y, { align: 'center', width: 80 });
						y = y + 30;
						items++;
						if (items > (itemsPorPagina)) {
							doc.rect(50, 225, 80, 30 * items - 1).stroke();
							doc.rect(130, 225, 280, 30 * items - 1).stroke();
							doc.rect(410, 225, 80, 30 * items - 1).stroke();
							doc.rect(490, 225, 80, 30 * items - 1).stroke()
							doc.addPage({ size: papel, margin: 40 });
							y = 240;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraFacturaCartaOficioFormatoNuevo(doc, venta, papel, pagina, totalPaginas, usuario, tipoFacturaConDetalle);
						}
					}
				} else {
					if (venta.glosa_unica) {
						doc.font('Helvetica', 8);
						doc.text('1', 50, y, { align: 'center', width: 80 });
						// var longitudCaracteres = venta.descripcion.length;
						// var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
						doc.text((venta.descripcion && venta.descripcion) || (venta.detalle && venta.detalle) || '', 132, y, { width: 280 });
						doc.text(number_format(venta.total, 2), 410, y, { align: 'center', width: 80 });
						doc.text(number_format(venta.total, 2), 490, y, { align: 'center', width: 80 });

					} else {
						let index_proforma = 0;
						let idProforma = 0;
						let glosa_already_writed = false;
						let descripcion_proforma = '';
						for (let i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
							if (idProforma === 0 && !venta.glosa_unica || (idProforma !== venta.detallesVenta[i].id_proforma && glosa_already_writed && !venta.glosa_unica)) {
								idProforma = venta.detallesVenta[i].id_proforma;
								index_proforma = venta.datosProformas.findIndex(proforma => proforma.id === idProforma)
								descripcion_proforma = venta.datosProformas[index_proforma] && venta.datosProformas[index_proforma].detalle || 'Anulada';
								glosa_already_writed = false;
							}
							if (!venta.glosa_unica && (idProforma === venta.detallesVenta[i].id_proforma) && !glosa_already_writed) {
								glosa_already_writed = true;
								let lineas_salto = Math.floor(Math.floor(descripcion_proforma.length / 80) / 3);
								const contador = (acumulador, valor_actual) => acumulador + valor_actual;
								const total = venta.detallesVenta.map(detalle => (detalle.id_proforma === idProforma ? detalle.total : 0)).reduce(contador, 0)
								if (lineas_salto <= 0) lineas_salto = 1;
								doc.text('1', 50, y, { align: 'center', width: 80 });
								doc.text(descripcion_proforma && descripcion_proforma || '', 132, y, { width: 280 });
								doc.text(number_format(total, 2), 410, y, { align: 'center', width: 80 }); // previus precio_unitario
								doc.text(number_format(total, 2), 490, y, { align: 'center', width: 80 });
								y += 30 * lineas_salto;
								items += lineas_salto;
							}
							if (items > (itemsPorPagina)) {
								doc.rect(50, 225, 80, 30 * items - 1).stroke();
								doc.rect(130, 225, 280, 30 * items - 1).stroke();
								doc.rect(410, 225, 80, 30 * items - 1).stroke();
								doc.rect(490, 225, 80, 30 * items - 1).stroke()
								doc.addPage({ size: papel, margin: 40 });
								y = 240;
								items = 0;
								pagina = pagina + 1;
								DibujarCabeceraFacturaCartaOficioFormatoNuevo(doc, venta, papel, pagina, totalPaginas, usuario, tipoFacturaConDetalle);
							}
						}
					}
				}
				let yy = (itemsPorPagina)
				y = 240;
				y += 30 * (yy - 1)
				doc.rect(50, 225, 80, 30 * (itemsPorPagina - 1)).stroke();
				doc.rect(130, 225, 280, 30 * (itemsPorPagina - 1)).stroke();
				doc.rect(410, 225, 80, 30 * (itemsPorPagina - 1)).stroke();
				doc.rect(490, 225, 80, 30 * (itemsPorPagina - 1)).stroke()
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL", 455, y);

				doc.font('Helvetica', 8);
				if (venta.ver_dolares) {
					doc.text(number_format(venta.total_dolares, 2), 520, y);

					doc.text("SON : " + venta.numero_literal_dolares, 55, y)
				} else {
					doc.text(number_format(venta.total, 2), 520, y);

					doc.text("SON : " + venta.numero_literal, 55, y)
				}
				doc.text("CÓDIGO DE CONTROL : " + venta.codigo_control, 55, y + 30);
				venta.fecha_limite_emision = new Date(venta.fecha_limite_emision);
				doc.text("FECHA LÍMITE DE EMISIÓN: " + ("0" + venta.fecha_limite_emision.getDate()).slice(-2) + "/" + ("0" + (venta.fecha_limite_emision.getMonth() + 1)).slice(-2) + "/" + venta.fecha_limite_emision.getFullYear(), 55, y + 60);

				doc.rect(50, y - 15, 520, 30).stroke();
				doc.rect(50, y + 25, 400, 20).stroke();
				doc.rect(50, y + 55, 400, 20).stroke();

				if (venta.configuracion.formatoConFirmaFactura) {
					if (venta.configuracion.formatoConFirmaFactura.nombre_corto === 'FORM_C_FIRMA') {
						doc.font('Helvetica-Bold', 7);
						doc.text(" ...............................................                                                       ................................................", 140, 620);
						doc.text("         RECIBÍ CONFORME                                                               ENTREGUE CONFORME", 140, 630);
					}
				}
				const leyendaPiePagina = venta.sucursal.actividadesDosificaciones.find((actividad) => {
					if (actividad.dosificacion.autorizacion === venta.autorizacion) return true;
					return false
				})
				const tamanoPapel = papel[1]
				// doc.text(venta.configuracion.nota, 50, tamanoPapel - 80);
				// doc.text(venta.pieFactura !== undefined && venta.pieFactura !== null ? venta.pieFactura.nombre : "", 50, (tamanoPapel - 60));
				doc.font('Helvetica', 7);
				doc.text("\"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS. EL USO ÍLICITO DE ÉSTA SERÁ SANCIONADO DE ACUERDO A LEY\"", 50, (tamanoPapel - 60), { align: 'left' });

				doc.text(leyendaPiePagina && leyendaPiePagina.dosificacion.pieFactura.nombre || 'Error', 50, (tamanoPapel - 50), { align: 'left' });
				qr.canvas({
					canvas: canvas,
					value: usuario.empresa.nit + "|" + venta.factura + "|" + venta.autorizacion + "|" + venta.fechaTexto + "|" + venta.total.toFixed(2) + "|" + venta.total.toFixed(2) + "|" + venta.codigo_control + "|" + venta.cliente.nit + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0"
				}, function () { });

				var qrImage = canvas.toDataURL('image/png');
				doc.image(qrImage, 470, y + 20, { width: 70, height: 70 });
				if (venta.factura_anulada) {
					doc.fontSize(30)
						.fillColor('red')
						.text('ANULADA', 250, 300, {
							underline: true
						}
						);
				}
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			};
			return res;
		}])

	//Imprimir Factura con formato de margen
	.factory('ImprimirFacturaCartaOficio', ['blockUI', 'VerificarDescuentos', 'Diccionario', 'DibujarCabeceraFacturaNVCartaOficio', 'DibujarCabeceraFacturaNVmedioOficio', '$timeout',
		function (blockUI, VerificarDescuentos, Diccionario, DibujarCabeceraFacturaNVCartaOficio, DibujarCabeceraFacturaNVmedioOficio, $timeout) {
			var res = function (venta, papel, vacia, completa, semicompleta, usuario) {
				var doc = new PDFDocument({ compress: false, layout: 'portrait', size: papel, margin: 10 });
				var stream = doc.pipe(blobStream());

				if (venta.configuracion.usar_pf) {
					var itemsPorPagina = 0;
					if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						itemsPorPagina = 19;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						itemsPorPagina = 16;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						itemsPorPagina = 3;
					}
					if (venta.imprimir_con_detalle) {
						var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
						DibujarCabeceraFacturaNVCartaOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, venta.imprimir_con_detalle);
						for (var i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
							doc.font('Helvetica', 8);
							if (venta.detallesVenta[i].producto) {
								venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
								var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

								doc.text(venta.detallesVenta[i].producto.codigo, 55, y, { width: 70 });
								doc.text(venta.detallesVenta[i].cantidad, 135, y);
								doc.text(venta.detallesVenta[i].producto.unidad_medida, 160, y, { width: 43 });
								var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }

								var longitudCaracteres = venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length;
								var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);

								var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
								doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 198, yDesc, { width: 130 });

								if (venta.con_vencimiento) {
									if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
										doc.text(venta.detallesVenta[i].lote, 400, y, { width: 60 });
									} else {
										doc.text(fechaVencimientoTexto, 360, y);
										doc.text(venta.detallesVenta[i].lote, 410, y, { width: 60 });
									}
								}
								if (venta.ver_dolares) {
									doc.text(venta.detallesVenta[i].precio_unitario_dolares.toFixed(2), 480, y);
									doc.text(venta.detallesVenta[i].total_dolares.toFixed(2), 530, y);
								} else {
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 480, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 530, y);
								}
								//doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
								//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);

								if (completa || vacia) {
									if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								}
							} else if (venta.detallesVenta[i].servicio) {
								venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
								var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

								doc.text(venta.detallesVenta[i].servicio.codigo, 55, y, { width: 70 });
								doc.text(venta.detallesVenta[i].cantidad, 130, y);
								// 							doc.text(venta.detallesVenta[i].servicio.unidad_medida, 155, y - 3, { width: 43 });
								var longitudCaracteres = venta.detallesVenta[i].servicio.nombre.length;
								var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);
								doc.text(venta.detallesVenta[i].servicio.nombre, 198, yDesc, { width: 130 });

								/*if (venta.con_vencimiento) {
									doc.text(fechaVencimientoTexto, 340, y);
									doc.text(venta.detallesVenta[i].lote, 380, y);
								}*/
								if (venta.con_vencimiento) {
									if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
										doc.text(venta.detallesVenta[i].lote, 380, y);
									} else {
										doc.text(fechaVencimientoTexto, 340, y);
										doc.text(venta.detallesVenta[i].lote, 380, y);
									}

								}

								// doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 410, y);
								if (venta.ver_dolares) {
									doc.text(venta.detallesVenta[i].importe_dolares.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total_dolares.toFixed(2), 530, y);
								} else {
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 530, y);
								}

								// doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);

								if (completa || vacia) {
									if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								}
							}
							y = y + 30;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ size: papel, margin: 10 });
								y = 240;
								items = 0;
								pagina = pagina + 1;
								DibujarCabeceraFacturaNVCartaOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, venta.imprimir_con_detalle);
							}
						}
						if (completa || vacia) {
							doc.font('Helvetica-Bold', 8);
							doc.text("TOTAL", 485, y);
						}
						doc.font('Helvetica', 8);
						doc.text(venta.total.toFixed(2), 530, y);

						if (venta.ver_dolares) {
							doc.text("SON : " + venta.numero_literal, 55, y);
						} else {
							doc.text("SON : " + venta.numero_literal_dolares, 55, y);
						}

						if (completa || vacia) {
							doc.rect(50, y - 15, 520, 30).stroke();
						}
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}

						doc.text("usuario : " + usuario.nombre_usuario, 55, y + 20);
						doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 180, y + 20);


						if (venta.configuracion.formatoConFirmaFactura) {
							if (venta.configuracion.formatoConFirmaFactura.nombre_corto === 'FORM_C_FIRMA') {
								doc.font('Helvetica-Bold', 7);
								doc.text(" ...............................................                                                       ................................................", 140, y + 60);
								doc.text("         RECIBÍ CONFORME                                                               ENTREGUE CONFORME", 140, y + 70);
							}
						}
						////FIN IMPRIMIR CON DETALLE
					} else {
						var detalle = []
						var d = venta.detallesVenta.forEach(orden => {
							var idx = detalle.findIndex(prod => prod.id_producto === orden.id_producto);
							if (idx != -1) {
								detalle[idx].cantidad = detalle[idx].cantidad + orden.cantidad;
								detalle[idx].total = detalle[idx].total + orden.total;
								detalle[idx].total_dolares = detalle[idx].total_dolares + orden.total_dolares;
							} else {
								detalle.push(orden);
							}
						});
						var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(detalle.length / itemsPorPagina);
						DibujarCabeceraFacturaNVCartaOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario);
						for (var i = 0; i < detalle.length && items <= itemsPorPagina; i++) {
							doc.font('Helvetica', 8);
							if (detalle[i].producto) {
								detalle[i].fecha_vencimiento = new Date(detalle[i].fecha_vencimiento);
								var fechaVencimientoTexto = detalle[i].fecha_vencimiento.getDate() + "/" + (detalle[i].fecha_vencimiento.getMonth() + 1) + "/" + detalle[i].fecha_vencimiento.getFullYear().toString().substring(2);

								doc.text(detalle[i].producto.codigo, 55, y, { width: 70 });
								doc.text(detalle[i].cantidad, 135, y);
								doc.text(detalle[i].producto.unidad_medida, 160, y, { width: 43 });
								var promocion = detalle[i].producto.promocionActual ? detalle[i].producto.promocionActual : detalle[i].promocionActual ? detalle[i].promocionActual : { nombre: "" }
								var longitudCaracteres = detalle[i].producto.nombre.length + promocion.nombre.length;
								var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);

								var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
								doc.text(detalle[i].producto.nombre + nombrePromo, 198, yDesc, { width: 130 });

								if (venta.con_vencimiento) {
									if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
										doc.text(detalle[i].lote ? detalle[i].lote : '', 400, y, { width: 60 });
									} else {
										doc.text(fechaVencimientoTexto ? fechaVencimientoTexto : '', 360, y);
										doc.text(detalle[i].lote ? detalle[i].lote : '', 410, y, { width: 60 });
									}

								}

								if (venta.ver_dolares) {
									doc.text(detalle[i].precio_unitario_dolares.toFixed(2), 480, y);
									doc.text(detalle[i].total_dolares.toFixed(2), 530, y);
								} else {
									doc.text(detalle[i].precio_unitario.toFixed(2), 480, y);
									doc.text(detalle[i].total.toFixed(2), 530, y);
								}
								//doc.text(detalle[i].importe.toFixed(2), 450, y);
								//doc.text((detalle[i].descuento ? detalle[i].descuento.toFixed(2) : "0.00"), 490, y);

								if (completa || vacia) {
									if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								}
							} else if (detalle[i].servicio) {
								detalle[i].fecha_vencimiento = new Date(detalle[i].fecha_vencimiento);
								var fechaVencimientoTexto = detalle[i].fecha_vencimiento.getDate() + "/" + (detalle[i].fecha_vencimiento.getMonth() + 1) + "/" + detalle[i].fecha_vencimiento.getFullYear().toString().substring(2);

								doc.text(detalle[i].servicio.codigo, 55, y, { width: 70 });
								doc.text(detalle[i].cantidad, 130, y);
								// 							doc.text(detalle[i].servicio.unidad_medida, 155, y - 3, { width: 43 });
								var longitudCaracteres = detalle[i].servicio.nombre.length;
								var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);
								doc.text(detalle[i].servicio.nombre, 198, yDesc, { width: 130 });

								/*if (venta.con_vencimiento) {
									doc.text(fechaVencimientoTexto, 340, y);
									doc.text(detalle[i].lote, 380, y);
								}*/
								if (venta.con_vencimiento) {
									if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
										doc.text(detalle[i].lote, 380, y);
									} else {
										doc.text(fechaVencimientoTexto, 340, y);
										doc.text(detalle[i].lote, 380, y);
									}

								}

								// doc.text(detalle[i].precio_unitario.toFixed(2), 410, y);
								if (venta.ver_dolares) {
									doc.text(detalle[i].importe_dolares.toFixed(2), 450, y);
									doc.text(detalle[i].total_dolares.toFixed(2), 530, y);
								} else {
									doc.text(detalle[i].importe.toFixed(2), 450, y);
									doc.text(detalle[i].total.toFixed(2), 530, y);
								}

								// doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);

								if (completa || vacia) {
									if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								}
							}
							y = y + 30;
							items++;
							if (items == itemsPorPagina) {
								doc.addPage({ size: papel, margin: 10 });
								y = 240;
								items = 0;
								pagina = pagina + 1;
								DibujarCabeceraFacturaNVCartaOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario);
							}
						}
						if (completa || vacia) {
							doc.font('Helvetica-Bold', 8);
							doc.text("TOTAL", 485, y);
						}
						doc.font('Helvetica', 8);
						doc.text(venta.total.toFixed(2), 530, y);

						if (venta.ver_dolares) {
							doc.text("SON : " + venta.numero_literal_dolares, 55, y);
						} else {
							doc.text("SON : " + venta.numero_literal, 55, y);
						}

						if (completa || vacia) {
							doc.rect(50, y - 15, 520, 30).stroke();
						}
						var fechaActual = new Date();
						var min = fechaActual.getMinutes();
						if (min < 10) {
							min = "0" + min;
						}

						doc.text("usuario : " + usuario.nombre_usuario, 55, y + 20);
						doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 180, y + 20);


						if (venta.configuracion.formatoConFirmaFactura) {
							if (venta.configuracion.formatoConFirmaFactura.nombre_corto === 'FORM_C_FIRMA') {
								doc.font('Helvetica-Bold', 7);
								doc.text(" ...............................................                                                       ................................................", 140, y + 60);
								doc.text("         RECIBÍ CONFORME                                                               ENTREGUE CONFORME", 140, y + 70);
							}
						}
					}
				} else {
					var canvas = document.getElementById('qr-code');
					// draw some text
					var existencias = VerificarDescuentos(venta.detallesVenta);
					var existenDescuentos = existencias.descuento

					doc.font('Helvetica', 8);
					var itemsPorPagina = 0;
					if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						itemsPorPagina = 19;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						itemsPorPagina = 16;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						itemsPorPagina = 3;
					}
					var detalles = venta.detallesVenta !== undefined ? venta.detallesVenta : venta.detallesProformas
					var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
					DibujarCabeceraFacturaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, Diccionario);
					for (var i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 7.5);
						doc.lineGap(-1.8)
						if (venta.detallesVenta[i].producto) {
							if (existenDescuentos) {
								if (venta.ver_dolares) {
									doc.text(venta.detallesVenta[i].producto.codigo, 68, y);
									doc.text(venta.detallesVenta[i].cantidad, 115, y);
									doc.text(venta.detallesVenta[i].producto.unidad_medida, 140, y);
									var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
									var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
									doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 180, y, { width: 120 });
									doc.text(venta.detallesVenta[i].precio_unitario_dolares.toFixed(2), 300, y);
									doc.text(venta.detallesVenta[i].importe_dolares.toFixed(2), 335, y);
									doc.text(venta.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
									doc.text(venta.detallesVenta[i].descuento_dolares.toFixed(2), 385, y);
									doc.text(venta.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
									doc.text(venta.detallesVenta[i].recargo_dolares.toFixed(2), 420, y);
									doc.text(venta.detallesVenta[i].ice_dolares.toFixed(2), 455, y);
									doc.text(venta.detallesVenta[i].excento_dolares.toFixed(2), 490, y);
									doc.text(venta.detallesVenta[i].total_dolares.toFixed(2), 520, y);
								} else {
									doc.text(venta.detallesVenta[i].producto.codigo, 68, y);
									doc.text(venta.detallesVenta[i].cantidad, 115, y);
									doc.text(venta.detallesVenta[i].producto.unidad_medida, 140, y);
									var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
									var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
									doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 180, y, { width: 120 });
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									doc.text(venta.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
									doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
									doc.text(venta.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
									doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
									doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
									doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								}
							} else {
								doc.text(venta.detallesVenta[i].producto.codigo, 68, y);
								doc.text(venta.detallesVenta[i].cantidad, 110, y);
								doc.text(venta.detallesVenta[i].producto.unidad_medida, 165, y);
								var longitudCaracteres = venta.detallesVenta[i].producto.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
								var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
								var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
								doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 220, yDesc, { width: 225 });
								if (venta.ver_dolares) {
									doc.text(venta.detallesVenta[i].precio_unitario_dolares.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total_dolares.toFixed(2), 520, y);
								} else {
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								}
							}
						} else {
							if (venta.movimiento) {
								venta.movimientoServicio = venta.movimiento.nombre_corto == Diccionario.EGRE_SERVICIO ? venta.movimiento : null
							}

							var tipoConfiguracionNotaServicio = venta.configuracion.tipoConfiguracionNotaServicio ? venta.configuracion.tipoConfiguracionNotaServicio.nombre_corto : "";
							if (venta.movimientoServicio) {
								venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
								var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

								if (existenDescuentos) {
									var longitudCaracteres = venta.detallesVenta[i].observaciones.length;
									var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);

									if (tipoConfiguracionNotaServicio == "CON_CANTIDAD") {
										doc.text(1, 55, y);
										doc.text(venta.detallesVenta[i].observaciones, 110, yDesc, { width: 300 });
										doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									} else {
										doc.text(venta.detallesVenta[i].observaciones, 55, yDesc, { width: 300 });
										//doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
										doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									}

									doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
									doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
									doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
									doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
									//doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
									//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 530, y);
									if (completa || vacia) {
										if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
											doc.rect(50, y - 15, 520, 30).stroke();
										}
									}
								} else {
									var longitudCaracteres = venta.detallesVenta[i].observaciones ? venta.detallesVenta[i].observaciones.length : 0;
									var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);

									if (tipoConfiguracionNotaServicio == "CON_CANTIDAD") {
										doc.text(1, 52, y, { width: 28 });
										doc.text(venta.detallesVenta[i].observaciones ? venta.detallesVenta[i].observaciones : venta.detallesVenta[i].servicio.nombre, 80, yDesc, { width: 377 });
										doc.text(venta.detallesVenta[i].importe ? number_format_negativo_to_positvo(venta.detallesVenta[i].importe, 2) : '', 460, y, { width: 54, align: 'right' });
									} else {
										doc.text(venta.detallesVenta[i].observaciones ? venta.detallesVenta[i].observaciones : venta.detallesVenta[i].servicio.nombre, 55, yDesc, { width: 400 });
										doc.text(venta.detallesVenta[i].importe ? number_format_negativo_to_positvo(venta.detallesVenta[i].importe, 2) : '', 450, y);
									}

									//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
									doc.text(venta.detallesVenta[i].total ? number_format_negativo_to_positvo(venta.detallesVenta[i].total, 2) : '', 515, y, { width: 54, align: 'right' });
									if (completa || vacia) {
										if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
											doc.rect(50, y - 15, 520, 30).stroke();
										}
									}
								}
							} else {
								if (existenDescuentos) {
									doc.text(venta.detallesVenta[i].servicio.codigo, 55, y);
									doc.text(venta.detallesVenta[i].cantidad, 115, y);
									// doc.text(venta.detallesVenta[i].servicio.unidad_medida, 140, y);
									doc.text(venta.detallesVenta[i].servicio.nombre, 180, y - 6, { width: 120 });
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									// doc.text(venta.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
									// doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
									// doc.text(venta.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
									// doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
									// doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
									// doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								} else {
									doc.text(venta.detallesVenta[i].servicio.codigo, 55, y);
									doc.text(venta.detallesVenta[i].cantidad, 110, y);
									// doc.text(venta.detallesVenta[i].servicio.unidad_medida, 165, y);
									var longitudCaracteres = venta.detallesVenta[i].servicio.nombre.length;
									var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
									doc.text(venta.detallesVenta[i].servicio.nombre, 220, yDesc, { width: 225 });
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								}
							}
						}
						if (completa || vacia) {
							if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
								doc.rect(50, y - 15, 520, 30).stroke();
							}
						}
						y = y + 30;
						items++;

						if (items > itemsPorPagina) {
							doc.addPage({ size: papel, margin: 10 });
							y = 240;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraFacturaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, Diccionario);
						}
					}
					y += 3;
					if (completa || vacia) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL BS.", 455, y);
					}
					doc.font('Helvetica', 8);
					if (venta.ver_dolares) {
						doc.text(venta.total_dolares.toFixed(2), 520, y);

						doc.text("SON : " + venta.numero_literal_dolares, 55, y)
					} else {
						doc.text(venta.total ? number_format_negativo_to_positvo(venta.total, 2) : '', 515, y, { width: 54, align: 'right' });

						doc.text("SON : " + venta.numero_literal, 55, y)
					}
					;

					if (!venta.id_mesero) {
						doc.text("CÓDIGO DE CONTROL : " + venta.codigo_control, 55, y + 30);

						venta.fecha_limite_emision = new Date(venta.fecha_limite_emision);
						doc.text("FECHA LÍMITE DE EMISIÓN: " + ("0" + venta.fecha_limite_emision.getDate()).slice(-2) + "/" + ("0" + (venta.fecha_limite_emision.getMonth() + 1)).slice(-2) + "/" + venta.fecha_limite_emision.getFullYear(), 55, y + 60);
					}
					if (completa || vacia) {
						doc.rect(50, y - 15, 520, 30).stroke();
						if (!venta.id_mesero) {
							doc.rect(50, y + 25, 400, 20).stroke();

							doc.rect(50, y + 55, 400, 20).stroke();
						}
					}

					if (venta.configuracion.formatoConFirmaFactura) {
						if (venta.configuracion.formatoConFirmaFactura.nombre_corto === 'FORM_C_FIRMA') {
							doc.font('Helvetica-Bold', 7);
							doc.text(" ...............................................                                                       ................................................", 140, 620);
							doc.text("         RECIBÍ CONFORME                                                               ENTREGUE CONFORME", 140, 630);
						}
					}
					if (!venta.id_mesero) {
						qr.canvas({
							canvas: canvas,
							value: usuario.empresa.nit + "|" + venta.factura + "|" + venta.autorizacion + "|" + venta.fechaTexto + "|" + venta.total.toFixed(2) + "|" + venta.total.toFixed(2) + "|" + venta.codigo_control + "|" + venta.cliente.nit + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0"
						}, function () { });

						var qrImage = canvas.toDataURL('image/png');
						doc.image(qrImage, 470, y + 20, { width: 70, height: 70 });

						if (completa || vacia) {
							doc.text(venta.configuracion.nota, 50, papel[1] - 80);
							doc.text(venta.pieFactura !== undefined && venta.pieFactura !== null ? venta.pieFactura.nombre : "", 50, papel[1] - 60);
							doc.text("\"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAIS. EL USO ILICITO DE ESTA SERA SANCIONADO DE ACUERDO A LEY\"", 50, papel[1] - 40);
						}
					}
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			};
			return res;
		}])

	.factory('DibujarCabeceraFacturaCartaOficioFormatoNuevo', [function () {
		var res = function (doc, venta, papel, pagina, totalPaginas, usuario, imprimir_con_detalle, sinMembresia) {
			if (imprimir_con_detalle) {
				if (!sinMembresia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 88, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
					doc.font('Helvetica-Bold', 16).fill('blue')
					doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 60);
					doc.font('Helvetica-Bold', 8)
					doc.text(usuario.empresa.razon_social.toUpperCase(), 55, 90, { align: 'center', width: 130 });
					doc.font('Helvetica', 7)
					doc.text(venta.sucursal.nombre.toUpperCase(), 55, 100, { align: 'center', width: 130 });
					var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 55, 110, { align: 'center', width: 130 });
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
					doc.text("TELF.: " + telefono, 55, yDesc - 10, { align: 'center', width: 130 });
				}
				// doc.text("COCHABAMBA - BOLIVIA", 55, yDesc + 8 - 10, { align: 'center', width: 130 });
				doc.font('Helvetica-Bold', 10)
				doc.text('ORIGINAL', 380, 95, { align: 'center', width: 190 });
			}

			doc.font('Helvetica-Bold', 8).fill('black')
			doc.text(venta.actividad.nombre, 380, 110, { align: 'center', width: 190 });

			if(imprimir_con_detalle){ 
				if(sinMembresia){ 
					doc.rect(380, 24, 190, 40).stroke(); 
					doc.text("NIT : ", 400, 31) 
					doc.text("Factura No : ", 400, 41); 
					doc.text("Autorización : ", 400, 51); 
					doc.font('Helvetica', 8) 
					doc.text(usuario.empresa.nit, 460, 31); 
					doc.text(venta.factura, 460, 41); 
					doc.text(venta.autorizacion, 460, 51); 
				}else{ 
					doc.rect(380, 43, 190, 40).stroke(); 
					doc.text("NIT : ", 400, 50) 
					doc.text("Factura No : ", 400, 60); 
					doc.text("Autorización : ", 400, 70); 
					doc.font('Helvetica', 8) 
					doc.text(usuario.empresa.nit, 460, 50); 
					doc.text(venta.factura, 460, 60); 
					doc.text(venta.autorizacion, 460, 70); 
				} 
			}else{ 
				doc.rect(380, 24, 190, 40).stroke(); 
				doc.text("NIT : ", 400, 31) 
				doc.text("Factura No : ", 400, 41); 
				doc.text("Autorización : ", 400, 51); 
				doc.font('Helvetica', 8) 
				doc.text(usuario.empresa.nit, 460, 31); 
				doc.text(venta.factura, 460, 41); 
				doc.text(venta.autorizacion, 460, 51); 
			}
			const formatearFecha_ = (fecha) => {
				const meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" }, { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
				{ id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];
				const MyDate = new Date(fecha.split('/').reverse().join('-') + ' 12:30:00');
				let MyDateString = ('0' + MyDate.getDate()).slice(-2) + ' de ' + meses[MyDate.getMonth()].nombre + ' de ' + MyDate.getFullYear();
				return MyDateString
			}
			doc.font('Helvetica-Bold', 8)
			doc.text("LUGAR Y FECHA : ", 60, 165);
			doc.text("SEÑOR(ES) : ", 60, 175);
			doc.text("NIT/CI :", 480, 165);
			doc.font('Helvetica', 8)
			doc.text(venta.cliente.nit, 0, 165, { align: 'right' });
			let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
			fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
			const lugarFacturacion = usuario.empresa.departamento && usuario.empresa.departamento.nombre.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ') + ', ' || '';
			doc.text(lugarFacturacion + fecha_facturacion, 150, 165);
			doc.text(venta.cliente.razon_social, 120, 175);
			// doc.text(venta.cliente.nit, 400, 165);

			// doc.rect(50, 200, 70, 25).stroke();
			doc.rect(50, 200, 80, 25).stroke();
			doc.rect(130, 200, 280, 25).stroke();
			doc.rect(410, 200, 80, 25).stroke();
			doc.rect(490, 200, 80, 25).stroke();
			// doc.text("CODIGO", 50, 210, {align: 'center', width: 70 });
			doc.font('Helvetica-Bold', 8)
			doc.text("CANTIDAD", 50, 210, { align: 'center', width: 80 });
			doc.text("DESCRIPCIÓN", 130, 210, { align: 'center', width: 280 });
			if (venta.con_vencimiento) {
				if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
					doc.text("SERIE", 400, 210);
				} else {
					doc.text("VENC.", 360, 210);
					doc.text("LOTE", 410, 210);
				}
			}
			// if (venta.detallesVenta[0].producto) {
			// 	doc.text("P.UNIT.", 480, 210);
			// }
			doc.text("P. UNITARIO", 410, 210, { align: 'center', width: 80 });
			if (venta.glosa_unica && !imprimir_con_detalle) {
				doc.text("TOTAL", 490, 210, { align: 'center', width: 80 });
			} else {
				doc.text("SUBTOTAL", 490, 210, { align: 'center', width: 80 });
			}
			doc.fillColor('black');

			doc.font('Helvetica', 7);

			if (papel[0] == 598 && papel[1] == 600) {
				doc.text("PÁGINA " + pagina + " DE " + (totalPaginas + 1), 0, papel[1] - 265, { align: 'right' });
			} else {
				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, papel[1] - 52, { align: 'right' });
			}
		}
		return res;
	}])

	.factory('DibujarCabeceraFacturaNVCartaOficio', [function () {
		var res = function (doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, imprimir_con_detalle) {
			const formatearFecha_ = (fecha) => {
				const meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" }, { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
				{ id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];
				const MyDate = new Date(fecha.split('/').reverse().join('-') + ' 12:30:00');
				let MyDateString = ('0' + MyDate.getDate()).slice(-2) + ' de ' + meses[MyDate.getMonth()].nombre + ' de ' + MyDate.getFullYear();
				return MyDateString
			}
			if (venta.configuracion.usar_pf) {
				if (vacia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
					doc.font('Helvetica-Bold', 8);
					doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
					doc.font('Helvetica', 7);
					doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
					var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 60, 121);
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
					doc.text("TELF.: " + telefono, 60, yDesc);
					doc.text("COCHABAMBA - BOLIVIA", 60, yDesc + 8);
				}
				doc.font('Helvetica-Bold', 16);
				doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 90);
				doc.font('Helvetica-Bold', 8);
				if (completa || vacia) {
					if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
						if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
							doc.rect(380, 40, 190, 50).stroke();
						} else {
							doc.rect(380, 40, 190, 50).fillAndStroke(venta.configuracion.color1, "black").fillColor('black').stroke();
						}
					}
					//doc.rect(380, 40, 190, 50).stroke();
					doc.text("NIT : ", 400, 50);
					doc.text("Nota No : ", 400, 60);
				}
				doc.text(usuario.empresa.nit, 500, 50);
				doc.text(venta.factura ? venta.factura : "pendiente", 500, 60);
				if (completa || vacia) {

					//doc.rect(50, 160, 520, 40).stroke();
					if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 160, 520, 40).stroke();
					} else {
						doc.rect(50, 160, 520, 40).fillAndStroke(venta.configuracion.color1, "black").fillColor('black').stroke();
					}
					doc.text("LUGAR Y FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 360, 165);
				}

				let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
				fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
				const lugarFacturacion = usuario.empresa.departamento && usuario.empresa.departamento.nombre.toLowerCase().split(' ').map(name => name.trim().charAt(0).toUpperCase() + name.slice(1)).join(' ') + ', ' || '';
				doc.text(lugarFacturacion + fecha_facturacion, 150, 165);
				doc.text(venta.cliente ? venta.cliente.razon_social : "pendiente", 120, 175);
				doc.text(venta.cliente ? venta.cliente.nit : "pendiente", 400, 165);

				if (completa || vacia) {
					//doc.rect(50, 200, 520, 25).stroke();
					if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 200, 520, 25).stroke();
					} else {
						doc.rect(50, 200, 520, 25).fillAndStroke(venta.configuracion.color2, "black").fillColor('black').stroke();
					}
					//doc.rect(50,225,520,papel[1]-175-225).stroke();
					doc.text("CODIGO", 55, 210, { width: 70 });
					doc.text("CANT.", 125, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("UNIDAD", 155, 210);
					}
					doc.text("DETALLE", 198, 210);

					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracion.nombre_corto == 'SERIE') {
							doc.text("SERIE", 400, 210);
						} else {
							doc.text("VENC.", 360, 210);
							doc.text("LOTE", 410, 210);
						}
					}
					if (venta.detallesVenta[0].producto) {
						doc.text("P.UNIT.", 480, 210);
					}
					/*doc.text("IMP.", 450, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("DESC.", 490, 210);
					}*/
					doc.text("TOTAL", 530, 210);
					doc.fillColor('black');
				}
				doc.font('Helvetica', 7);

				if (papel[0] == 598 && papel[1] == 600) {
					doc.text("PÁGINA " + pagina + " DE " + (totalPaginas + 1), 500, papel[1] - 270);
				} else {
					doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 500, papel[1] - 60);
				}
			} else {
				if (imprimir_con_detalle) {
					if (vacia) {
						if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
						doc.font('Helvetica-Bold', 8);
						doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
						doc.font('Helvetica', 7);
						doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
						var longitudCaracteres = venta.sucursal.direccion.length;
						var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
						doc.text(venta.sucursal.direccion.toUpperCase(), 60, 121);
						var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
							(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
							(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
						doc.text("TELF.: " + telefono, 60, yDesc);
						doc.text("COCHABAMBA - BOLIVIA     ---------CON DELATTE", 60, yDesc + 8);
					}
					doc.font('Helvetica-Bold', 16);
					doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 90);
					doc.font('Helvetica-Bold', 8);
					doc.text(venta.actividad.nombre, 380, 95, { width: 200 });


					if (completa || vacia) {
						doc.rect(380, 40, 190, 50).stroke();
						doc.text("NIT : ", 390, 50);
						doc.text("FACTURA No : ", 390, 60);
						doc.text("AUTORIZACIÓN No : ", 390, 70);
					}
					doc.text(usuario.empresa.nit, 500, 50);
					doc.text(venta.factura, 500, 60);
					doc.text(venta.autorizacion, 500, 70);

					if (completa || vacia) {
						doc.rect(50, 160, 520, 40).stroke();
						doc.text("LUGAR Y FECHA : ", 60, 165);
						doc.text("SEÑOR(ES) : ", 60, 175);
						doc.text("NIT : ", 360, 165);
					}
					let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
					fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
					const lugarFacturacion = usuario.empresa.departamento && usuario.empresa.departamento.nombre.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ') + ', ' || '';
					doc.text(lugarFacturacion + fecha_facturacion, 150, 165);
					doc.text(venta.cliente.razon_social, 120, 175);
					doc.text(venta.cliente.nit, 400, 165);

					if (completa || vacia) {
						doc.rect(50, 200, 520, 25).stroke();
						//doc.rect(50,225,520,papel[1]-175-225).stroke();
						doc.text("CODIGO", 55, 210, { width: 70 });
						doc.text("CANT.", 125, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("UNIDAD", 155, 210);
						}
						doc.text("DETALLE", 198, 210);

						if (venta.con_vencimiento) {
							doc.text("VENC.", 340, 210);
							doc.text("LOTE", 380, 210);
						}
						if (venta.detallesVenta[0].producto) {
							doc.text("P.UNIT.", 410, 210);
						}
						doc.text("IMP.", 450, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("DESC.", 490, 210);
						}
						doc.text("TOTAL", 530, 210);
					}
					doc.font('Helvetica', 7);

					doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 500, papel[1] - 60);
				} else {
					if (vacia) {
						if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
						doc.font('Helvetica-Bold', 8);
						doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
						doc.font('Helvetica', 7);
						doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
						var longitudCaracteres = venta.sucursal.direccion.length;
						var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
						doc.text(venta.sucursal.direccion.toUpperCase(), 60, 121);
						var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
							(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
							(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
						doc.text("TELF.: " + telefono, 60, yDesc);
						doc.text("COCHABAMBA - BOLIVIA     ---------SIN DELATTE", 60, yDesc + 8);
					}
					doc.font('Helvetica-Bold', 16);
					doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 90);
					doc.font('Helvetica-Bold', 8);
					doc.text(venta.actividad.nombre, 380, 95, { width: 200 });


					if (completa || vacia) {
						doc.rect(380, 40, 190, 50).stroke();
						doc.text("NIT : ", 390, 50);
						doc.text("FACTURA No : ", 390, 60);
						doc.text("AUTORIZACIÓN No : ", 390, 70);
					}
					doc.text(usuario.empresa.nit, 500, 50);
					doc.text(venta.factura, 500, 60);
					doc.text(venta.autorizacion, 500, 70);

					if (completa || vacia) {
						doc.rect(50, 160, 520, 40).stroke();
						doc.text("LUGAR Y FECHA : ", 60, 165);
						doc.text("SEÑOR(ES) : ", 60, 175);
						doc.text("NIT : ", 360, 165);
					}
					let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
					fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
					const lugarFacturacion = usuario.empresa.departamento && usuario.empresa.departamento.nombre.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ') + ', ' || '';
					doc.text(lugarFacturacion + fecha_facturacion, 150, 165);
					// doc.text(venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto, 120, 165);
					doc.text(venta.cliente.razon_social, 120, 175);
					doc.text(venta.cliente.nit, 400, 165);

					if (completa || vacia) {
						doc.rect(50, 200, 520, 25).stroke();
						//doc.rect(50,225,520,papel[1]-175-225).stroke();
						doc.text("CODIGO", 55, 210, { width: 70 });
						doc.text("CANT.", 125, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("UNIDAD", 155, 210);
						}
						doc.text("DETALLE", 198, 210);

						if (venta.con_vencimiento) {
							doc.text("VENC.", 340, 210);
							doc.text("LOTE", 380, 210);
						}
						if (venta.detallesVenta[0].producto) {
							doc.text("P.UNIT.", 410, 210);
						}
						doc.text("IMP.", 450, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("DESC.", 490, 210);
						}
						doc.text("TOTAL", 530, 210);
					}
					doc.font('Helvetica', 7);

					doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 500, papel[1] - 60);
				}
			}
		};
		return res;
	}])

	//Imprimir formato Sin Formato del margen
	.factory('ImprimirFacturaCartaOficioSinFormato', ['blockUI', 'VerificarDescuentos', 'Diccionario', 'DibujarCabeceraFacturaNVCartaOficioSinFormato', 'DibujarCabeceraFacturaNVmedioOficio', '$timeout',
		function (blockUI, VerificarDescuentos, Diccionario, DibujarCabeceraFacturaNVCartaOficioSinFormato, DibujarCabeceraFacturaNVmedioOficio, $timeout) {
			var res = function (venta, papel, vacia, completa, semicompleta, usuario) {
				var doc = new PDFDocument({ compress: false, size: papel, margin: 10 });
				var stream = doc.pipe(blobStream());

				if (venta.configuracion.usar_pf) {
					var itemsPorPagina = 0;
					if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						itemsPorPagina = 19;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						itemsPorPagina = 32;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						itemsPorPagina = 3;
					}
					var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
					DibujarCabeceraFacturaNVCartaOficioSinFormato(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario);
					for (var i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 8);
						if (venta.detallesVenta[i].producto) {
							venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
							var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

							doc.text(venta.detallesVenta[i].producto.codigo, 55, y, { width: 70 });
							doc.text(venta.detallesVenta[i].cantidad, 135, y);
							doc.text(venta.detallesVenta[i].producto.unidad_medida, 180, y - 3, { width: 43 });
							var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
							var longitudCaracteres = venta.detallesVenta[i].producto.nombre.length + promocion.length;
							var yDesc = (longitudCaracteres <= 27) ? y : ((longitudCaracteres > 27 && longitudCaracteres <= 63) ? y - 4 : y - 11);

							var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
							doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 240, yDesc, { width: 250 });

							if (venta.con_vencimiento) {
								doc.text(fechaVencimientoTexto, 340, y);
								doc.text(venta.detallesVenta[i].lote, 380, y);
							}

							doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 505, y);
							//doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
							//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
							doc.text(venta.detallesVenta[i].total.toFixed(2), 560, y);
							if (completa || vacia) {
								//doc.rect(50, y - 15, 520, 30).stroke();
							}
						} else {
							venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
							var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

							doc.text(venta.detallesVenta[i].servicio.codigo, 55, y, { width: 70 });
							doc.text(venta.detallesVenta[i].cantidad, 130, y);
							// 							doc.text(venta.detallesVenta[i].servicio.unidad_medida, 155, y - 3, { width: 43 });
							var longitudCaracteres = venta.detallesVenta[i].observaciones.length;
							var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);
							doc.text(venta.detallesVenta[i].observaciones, 198, yDesc, { width: 130 });

							if (venta.con_vencimiento) {
								doc.text(fechaVencimientoTexto, 340, y);
								doc.text(venta.detallesVenta[i].lote, 380, y);
							}

							// doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 410, y);
							doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
							// doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
							doc.text(venta.detallesVenta[i].total.toFixed(2), 580, y);
							/*if (completa || vacia) {
								doc.rect(50, y - 15, 520, 30).stroke();
							}*/
						}
						y = y + 15;
						items++;
						if (items == itemsPorPagina) {
							doc.addPage({ size: papel, margin: 10 });
							y = 240;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraFacturaNVCartaOficioSinFormato(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario);
						}
					}
					if (completa || vacia) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL", 500, y);
					}
					doc.font('Helvetica', 8);
					doc.text(venta.total.toFixed(2), 560, y);

					doc.text("SON : " + venta.numero_literal, 55, y);

					if (completa || vacia) {
						doc.rect(50, y - 5, 545, 15).stroke();
					}
					var fechaActual = new Date();
					var min = fechaActual.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}

					doc.text("usuario : " + usuario.nombre_usuario, 55, y + 20);
					doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 180, y + 20);

				} else {
					var canvas = document.getElementById('qr-code');
					// draw some text
					var existencias = VerificarDescuentos(venta.detallesVenta);
					var existenDescuentos = existencias.descuento

					doc.font('Helvetica', 8);
					var itemsPorPagina = 0;
					if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						itemsPorPagina = 19;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						itemsPorPagina = 32;
					} else if (venta.configuracion.tamanoPapelFactura.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						itemsPorPagina = 3;
					}
					var detalles = venta.detallesVenta !== undefined ? venta.detallesVenta : venta.detallesProformas
					var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
					DibujarCabeceraFacturaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, Diccionario);
					for (var i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {
						doc.font('Helvetica', 8);
						if (venta.detallesVenta[i].producto) {
							if (existenDescuentos) {
								doc.text(venta.detallesVenta[i].producto.codigo, 55, y);
								doc.text(venta.detallesVenta[i].cantidad, 115, y);
								doc.text(venta.detallesVenta[i].producto.unidad_medida, 140, y);
								var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
								var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
								doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 180, y - 6, { width: 120 });
								doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
								doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
								doc.text(venta.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
								doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
								doc.text(venta.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
								doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
								doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
								doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
								doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
							} else {
								doc.text(venta.detallesVenta[i].producto.codigo, 55, y);
								doc.text(venta.detallesVenta[i].cantidad, 110, y);
								doc.text(venta.detallesVenta[i].producto.unidad_medida, 165, y);
								var longitudCaracteres = venta.detallesVenta[i].producto.nombre.length;
								var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
								var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
								var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
								doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 220, yDesc, { width: 225 });
								doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 450, y);
								doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
							}
						} else {
							if (venta.movimiento) {
								venta.movimientoServicio = venta.movimiento.nombre_corto == Diccionario.EGRE_SERVICIO ? venta.movimiento : null
							}
							if (venta.movimientoServicio) {
								venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento);
								var fechaVencimientoTexto = venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear().toString().substring(2);

								if (existenDescuentos) {
									var longitudCaracteres = venta.detallesVenta[i].observaciones.length;
									var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);
									doc.text(venta.detallesVenta[i].observaciones, 55, yDesc, { width: 300 });
									//doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
									doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
									doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
									doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
									//doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
									//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 530, y);
									if (completa || vacia) {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								} else {
									var longitudCaracteres = venta.detallesVenta[i].observaciones.length;
									var yDesc = (longitudCaracteres <= 24) ? y : ((longitudCaracteres > 24 && longitudCaracteres <= 60) ? y - 4 : y - 11);
									doc.text(venta.detallesVenta[i].observaciones, 55, yDesc, { width: 400 });
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 450, y);
									//doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : "0.00"), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 530, y);
									if (completa || vacia) {
										doc.rect(50, y - 15, 520, 30).stroke();
									}
								}
							} else {
								if (existenDescuentos) {
									doc.text(venta.detallesVenta[i].servicio.codigo, 55, y);
									doc.text(venta.detallesVenta[i].cantidad, 115, y);
									// doc.text(venta.detallesVenta[i].servicio.unidad_medida, 140, y);
									doc.text(venta.detallesVenta[i].observaciones, 180, y - 6, { width: 120 });
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
									doc.text(venta.detallesVenta[i].importe.toFixed(2), 335, y);
									// doc.text(venta.detallesVenta[i].tipo_descuento ? "%" : "Bs", 385, y - 10);
									// doc.text(venta.detallesVenta[i].descuento.toFixed(2), 385, y);
									// doc.text(venta.detallesVenta[i].tipo_recargo ? "%" : "Bs", 420, y - 10);
									// doc.text(venta.detallesVenta[i].recargo.toFixed(2), 420, y);
									// doc.text(venta.detallesVenta[i].ice.toFixed(2), 455, y);
									// doc.text(venta.detallesVenta[i].excento.toFixed(2), 490, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								} else {
									doc.text(venta.detallesVenta[i].servicio.codigo, 55, y);
									doc.text(venta.detallesVenta[i].cantidad, 110, y);
									// doc.text(venta.detallesVenta[i].servicio.unidad_medida, 165, y);
									var longitudCaracteres = venta.detallesVenta[i].observaciones.length;
									var yDesc = (longitudCaracteres <= 45) ? y : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? y - 4 : y - 11);
									doc.text(venta.detallesVenta[i].observaciones, 220, yDesc, { width: 225 });
									doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 450, y);
									doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);
								}
							}
						}

						if (completa || vacia) {
							doc.rect(50, y - 15, 520, 30).stroke();
						}
						y = y + 30;
						items++;

						if (items > itemsPorPagina) {
							doc.addPage({ size: papel, margin: 10 });
							y = 240;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraFacturaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, Diccionario);
						}
					}
					if (completa || vacia) {
						doc.font('Helvetica-Bold', 8);
						doc.text("TOTAL", 455, y);
					}
					doc.font('Helvetica', 8);
					doc.text(venta.total.toFixed(2), 520, y);

					doc.text("SON : " + venta.numero_literal, 55, y);


					doc.text("CÓDIGO DE CONTROL : " + venta.codigo_control, 55, y + 30);
					venta.fecha_limite_emision = new Date(venta.fecha_limite_emision);
					doc.text("FECHA LÍMITE DE EMISIÓN: " + ("0" + venta.fecha_limite_emision.getDate()).slice(-2) + "/" + ("0" + (venta.fecha_limite_emision.getMonth() + 1)).slice(-2) + "/" + venta.fecha_limite_emision.getFullYear(), 55, y + 60);

					if (completa || vacia) {
						doc.rect(50, y - 15, 520, 30).stroke();
						doc.rect(50, y + 25, 400, 20).stroke();
						doc.rect(50, y + 55, 400, 20).stroke();
					}

					qr.canvas({
						canvas: canvas,
						value: usuario.empresa.nit + "|" + venta.factura + "|" + venta.autorizacion + "|" + venta.fechaTexto + "|" + venta.total.toFixed(2) + "|" + venta.total.toFixed(2) + "|" + venta.codigo_control + "|" + venta.cliente.nit + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0"
					}, function () { });
					var qrImage = canvas.toDataURL('image/png');
					doc.image(qrImage, 470, y + 20, { width: 70, height: 70 });
					if (completa || vacia) {
						doc.text(venta.pieFactura !== undefined && venta.pieFactura !== null ? venta.pieFactura.nombre : "", 50, papel[1] - 60);
						doc.text("\"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAIS. EL USO ILICITO DE ESTA SERA SANCIONADO DE ACUERDO A LEY\"", 50, papel[1] - 40);
					}

				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			};
			return res;
		}])

	.factory('DibujarCabeceraFacturaNVCartaOficioSinFormato', [function () {
		var res = function (doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario) {
			const formatearFecha_ = (fecha) => {
				const meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" }, { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
				{ id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];
				const MyDate = new Date(fecha.split('/').reverse().join('-') + ' 12:30:00');
				let MyDateString = ('0' + MyDate.getDate()).slice(-2) + ' de ' + meses[MyDate.getMonth()].nombre + ' de ' + MyDate.getFullYear();
				return MyDateString
			}
			if (venta.configuracion.usar_pf) {
				if (vacia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
					doc.font('Helvetica-Bold', 8);
					doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
					doc.font('Helvetica', 7);
					doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
					//var longitudCaracteres = venta.sucursal.direccion.length;
					//var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					//doc.text(venta.sucursal.direccion.toUpperCase(), 60, 121);
					var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 60, 120, { width: 150 });
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");

					doc.text("TELF.: " + telefono, 60, yDesc);
					yDesc += 11
					doc.font('Helvetica-Bold').text("COCHABAMBA - BOLIVIA", 60, yDesc);
				}
				doc.font('Helvetica-Bold', 16);
				doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 90);
				doc.font('Helvetica-Bold', 10);
				if (completa || vacia) {
					//doc.rect(380, 40, 190, 50).stroke();
					doc.text("NIT : ", 410, 50);
					doc.text("Nota No : ", 410, 60);
				}

				doc.text(usuario.empresa.nit, 500, 50);
				doc.font('Helvetica-Bold', 13);
				doc.text(venta.factura, 500, 60);
				doc.font('Helvetica-Bold', 10);
				if (completa || vacia) {
					//doc.rect(50, 160, 520, 40).stroke();
					doc.text("LUGAR Y FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 470, 165);
				}
				let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
				fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
				doc.text(fecha_facturacion, 150, 165);
				doc.text(venta.cliente.razon_social, 130, 175);
				doc.text(venta.cliente.nit, 530, 165);

				if (completa || vacia) {
					doc.rect(50, 200, 545, 25).stroke();
					//doc.rect(50,225,520,papel[1]-175-225).stroke();
					doc.text("CODIGO", 55, 210, { width: 70 });
					doc.text("CANT.", 125, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("UNIDAD", 175, 210);
					}
					doc.text("DETALLE", 250, 210);

					if (venta.con_vencimiento) {
						doc.text("VENC.", 340, 210);
						doc.text("LOTE", 380, 210);
					}
					if (venta.detallesVenta[0].producto) {
						doc.text("P.UNIT.", 505, 210);
					}
					/*doc.text("IMP.", 450, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("DESC.", 490, 210);
					}*/
					doc.text("TOTAL", 555, 210);
				}
				doc.font('Helvetica', 7);

				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 500, papel[1] - 60);

			} else {
				if (vacia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] }); } //{ width: 50, height: 50 }
					doc.font('Helvetica-Bold', 8);
					doc.text(usuario.empresa.razon_social.toUpperCase(), 60, 105);
					doc.font('Helvetica', 7);
					doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
					/*var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 24) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 60, yDesc,{width: 150});

					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
					doc.text("TELF.: " + telefono, 60, yDesc);
					doc.text("COCHABAMBA - BOLIVIA", 60, yDesc + 8);*/
					var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 60, 120, { width: 150 });
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");

					doc.text("TELF.: " + telefono, 60, yDesc);
					yDesc += 11
					doc.font('Helvetica-Bold').text("COCHABAMBA - BOLIVIA", 60, yDesc);
				}
				doc.font('Helvetica-Bold', 16);
				doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 90);
				doc.font('Helvetica-Bold', 8);
				doc.text(venta.actividad.nombre, 380, 95, { width: 200 });


				if (completa || vacia) {
					//doc.rect(380, 40, 190, 50).stroke();
					doc.text("NIT : ", 390, 50);
					doc.text("FACTURA No : ", 390, 60);
					doc.text("AUTORIZACIÓN No : ", 390, 70);
				}
				doc.text(usuario.empresa.nit, 500, 50);
				doc.text(venta.factura, 500, 60);
				doc.text(venta.autorizacion, 500, 70);

				if (completa || vacia) {
					//doc.rect(50, 160, 520, 40).stroke();
					doc.text("LUGAR Y FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 360, 165);
				}
				let fecha_facturacion = (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto)
				fecha_facturacion = formatearFecha_(fecha_facturacion, true, true)
				doc.text(fecha_facturacion, 150, 165);
				doc.text(venta.cliente.razon_social, 130, 175);
				doc.text(venta.cliente.nit, 410, 165);

				if (completa || vacia) {
					//doc.rect(50, 200, 520, 25).stroke();
					//doc.rect(50,225,520,papel[1]-175-225).stroke();
					doc.text("CODIGO", 55, 210, { width: 70 });
					doc.text("CANT.", 125, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("UNIDAD", 155, 210);
					}
					doc.text("DETALLE", 198, 210);

					if (venta.con_vencimiento) {
						doc.text("VENC.", 340, 210);
						doc.text("LOTE", 380, 210);
					}
					if (venta.detallesVenta[0].producto) {
						doc.text("P.UNIT.", 410, 210);
					}
					/*doc.text("IMP.", 450, 210);
					if (venta.detallesVenta[0].producto) {
						doc.text("DESC.", 490, 210);
					}*/
					doc.text("TOTAL", 530, 210);
				}
				doc.font('Helvetica', 7);

				doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 500, papel[1] - 60);
			}
		};
		return res;
	}])

	.factory('DibujarCabeceraFacturaNVmedioOficio', ['VerificarDescuentos', function (VerificarDescuentos) {
		var res = function (doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario, Diccionario) {
			var departamentoSucursal = "";
			if (venta.configuracion.usar_pf) {
				if (vacia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 40, { fit: [70, 70] }); } //width: 50, height: 50
					doc.font('Helvetica-Bold', 8);
					var longitudCaracteres = usuario.empresa.razon_social.length + 30;
					var yDesc = (longitudCaracteres <= 35) ? 105 : ((longitudCaracteres > 36 && longitudCaracteres <= 72) ? 95 : 85);
					doc.text(usuario.empresa.razon_social.toUpperCase(), 60, yDesc, { width: 170 });
					doc.font('Helvetica', 7);
					doc.text(venta.sucursal.nombre.toUpperCase(), 60, 113);
					var longitudCaracteres = venta.sucursal.direccion.length;
					var yDesc = (longitudCaracteres <= 45) ? 129 : ((longitudCaracteres > 45 && longitudCaracteres <= 90) ? 139 : 145);
					doc.text(venta.sucursal.direccion.toUpperCase(), 60, 121, { width: 200 });
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null && venta.sucursal.textlefono2 != "" ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null && venta.sucursal.textlefono3 != "" ? "-" + venta.sucursal.telefono3 : "");
					doc.text("TELF.: " + telefono, 60, yDesc);
					doc.text("COCHABAMBA - BOLIVIA", 60, yDesc + 6);
				}
				departamentoSucursal = venta.sucursal.departamento ? venta.sucursal.departamento.nombre : "";
				doc.font('Helvetica-Bold', 16);
				doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 100);
				doc.font('Helvetica-Bold', 8);


				if (completa || vacia) {
					if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
						doc.rect(380, 40, 190, 50).stroke();
					}
					doc.text("NIT : ", 390, 50);
					doc.text("NOTA No : ", 390, 60);

				}
				doc.text(usuario.empresa.nit, 500, 50);
				doc.text(venta.factura, 500, 60);
				doc.text(venta.autorizacion, 500, 70);
				if (completa || vacia) {
					doc.rect(50, 160, 520, 40).stroke();
					doc.text("LUGAR Y FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 360, 165);
				}
				doc.text(departamentoSucursal + ", " + (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto), 140, 165);
				doc.text(venta.cliente.razon_social, 120, 175);
				doc.text(venta.cliente.nit, 400, 165);
				if (completa || vacia) {
					doc.rect(50, 200, 520, 25).stroke();
					//doc.rect(50,225,520,papel[1]-175-225).stroke();
					var existencias = VerificarDescuentos(venta.detallesVenta);
					var existenDescuentos = existencias.descuento
					if (existenDescuentos) {
						doc.text("CODIGO", 55, 210);
						doc.text("CANT.", 110, 210);
						doc.text("DETALLE", 160, 210);
						doc.text("P. UNIT.", 300, 210);
						doc.text("IMPORTE", 335, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("UNID.", 140, 210);
							doc.text("DESC.", 385, 210);
							doc.text("REC.", 420, 210);
							doc.text("ICE", 455, 210);
							doc.text("EXC.", 490, 210);
						}
						doc.text("TOTAL", 520, 210);
					} else {
						doc.text("CODIGO", 55, 210);
						doc.text("CANTIDAD", 110, 210);
						if (venta.detallesVenta[0].producto) {
							doc.text("UNIDAD", 165, 210);
						}
						doc.text("DETALLE", 220, 210);
						doc.text("P.UNIT.", 450, 210);
						doc.text("TOTAL", 520, 210);
					}
				}
			} else {
				if (vacia) {

					if (venta.sucursal.numero == 0) {
						// la altura en pixeles para convertir seria dividirlo entre 96;
						var alturaImagen = 80;
						if (usuario.empresa.imagen.length > 100) {
							doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] });
							alturaImagen = usuario.altura_imagen;
						} //width: 50, height: 50
						var yAltura = (alturaImagen <= 1.95) ? alturaImagen + 85 : ((alturaImagen > 2 && alturaImagen <= 80) ? 105 : 105);


						doc.font('Helvetica-Bold', 8);
						var longitudCaracteres = usuario.empresa.razon_social.length;

						var yDesc = (longitudCaracteres <= 35) ? yAltura + 11 : ((longitudCaracteres > 36 && longitudCaracteres <= 52) ? yAltura + 20 : yAltura + 20);

						doc.text(usuario.empresa.razon_social.toUpperCase(), 60, yAltura, { width: 170 });
						doc.font('Helvetica', 7);
						doc.text(venta.sucursal.nombre.toUpperCase(), 60, yDesc);
						var longitudCaracteres = venta.sucursal.direccion.length;
						var yDescDir = (longitudCaracteres <= 35) ? yDesc + 9 : ((longitudCaracteres > 36 && longitudCaracteres <= 90) ? yDesc + 18 : yDesc + 18);
						doc.text(venta.sucursal.direccion.toUpperCase(), 60, yDesc + 9, { width: 200 });
						var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
							(venta.sucursal.telefono2 != null && venta.sucursal.telefono2 != "" ? "-" + venta.sucursal.telefono2 : "") +
							(venta.sucursal.telefono3 != null && venta.sucursal.telefono3 != "" ? "-" + venta.sucursal.telefono3 : "");
						doc.text("TELF.: " + telefono, 60, yDescDir + 9);
						doc.text("COCHABAMBA - BOLIVIA", 60, yDescDir + 18);
						departamentoSucursal = venta.sucursal.departamento ? venta.sucursal.departamento.nombre : "";
					} else {
						if (venta.sucursalPrincipal != undefined) {
							var alturaImagen = 80;
							if (usuario.empresa.imagen.length > 100) {
								doc.image(usuario.empresa.imagen, 60, 25, { fit: [50, 50] });
								alturaImagen = usuario.altura_imagen;
							} //width: 50, height: 50
							var yAltura = (alturaImagen <= 1.95) ? alturaImagen + 85 : ((alturaImagen > 2 && alturaImagen <= 80) ? 105 : 105);
							doc.font('Helvetica-Bold', 8);
							doc.text(venta.sucursalPrincipal[0].nombre, 60, yAltura - 30);
							doc.font('Helvetica', 7);

							doc.text(venta.sucursalPrincipal[0].direccion, 60, yAltura - 22, { width: 150 });
							var longitudCaracteres = venta.sucursalPrincipal[0].direccion.length;
							var yDescDir = (longitudCaracteres <= 36) ? yAltura - 5 : yAltura + 4;

							var telefono = (venta.sucursalPrincipal[0].telefono1 != null ? venta.sucursalPrincipal[0].telefono1 : "") +
								(venta.sucursalPrincipal[0].telefono2 != null && venta.sucursalPrincipal[0].telefono2 != "" ? "-" + venta.sucursalPrincipal[0].telefono2 : "") +
								(venta.sucursalPrincipal[0].telefono3 != null && venta.sucursalPrincipal[0].telefono3 != "" ? "-" + venta.sucursalPrincipal[0].telefono3 : "");
							doc.text("TELF: " + telefono, 60, yDescDir - 10);
							yDescDir += 10;
							doc.font('Helvetica-Bold', 8);
							doc.text("COCHABAMBA - BOLIVIA", 60, yDescDir - 13);
							yDescDir += 10;
							doc.font('Helvetica-Bold', 8);
							doc.text("Sucursal " + venta.sucursal.numero, 60, yDescDir - 10, { width: 150 });
							doc.font('Helvetica', 7);
							var sucursalDireccion = venta.sucursal.direccion.toLowerCase();
							var direccionCapitalizada = sucursalDireccion.replace(/\b[a-z]/g, c => c.toUpperCase());
							doc.text(direccionCapitalizada, 60, yDescDir - 2, { width: 150 });
							var longitudSucursal = direccionCapitalizada.length;
							if (longitudSucursal > 80) {
								yTamDir = yDescDir + 30
							} else if (longitudSucursal >= 45) {
								yTamDir = yDescDir + 20;
							} else {
								yTamDir = yDescDir + 13;
							}
							//var yTamDir = (longitudSucursal <= 36)? yDescDir + 10: yDescDir + 10;

							//  para segunda sucursal ===============
							var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
								(venta.sucursal.telefono2 != null && venta.sucursal.telefono2 != "" ? "-" + venta.sucursal.telefono2 : "") +
								(venta.sucursal.telefono3 != null && venta.sucursal.textlefono3 != "" ? "-" + venta.sucursal.telefono3 : "");
							doc.text("TELF: " + telefono, 60, yTamDir - 8);
							doc.font('Helvetica-Bold', 8);
							yTamDir += 10;
							doc.text(venta.sucursal.nombre + " - BOLIVIA", 60, yTamDir - 11);
							departamentoSucursal = venta.sucursal.departamento ? venta.sucursal.departamento.nombre : "";

						} else {
							var alturaImagen = 80;
							if (usuario.empresa.imagen.length > 100) {
								doc.image(usuario.empresa.imagen, 60, 40, { fit: [65, 65] });
								alturaImagen = usuario.altura_imagen;
							} //width: 50, height: 50
							var yAltura = (alturaImagen <= 1.95) ? alturaImagen + 85 : ((alturaImagen > 2 && alturaImagen <= 80) ? 105 : 105);


							doc.font('Helvetica-Bold', 8);
							var longitudCaracteres = usuario.empresa.razon_social.length;

							var yDesc = (longitudCaracteres <= 35) ? yAltura + 11 : ((longitudCaracteres > 36 && longitudCaracteres <= 52) ? yAltura + 20 : yAltura + 20);

							doc.text(usuario.empresa.razon_social.toUpperCase(), 60, yAltura, { width: 170 });
							doc.font('Helvetica', 7);
							doc.text(venta.sucursal.nombre.toUpperCase(), 60, yDesc);
							var longitudCaracteres = venta.sucursal.direccion.length;
							var yDescDir = (longitudCaracteres <= 35) ? yDesc + 9 : ((longitudCaracteres > 36 && longitudCaracteres <= 90) ? yDesc + 18 : yDesc + 18);
							doc.text(venta.sucursal.direccion.toUpperCase(), 60, yDesc + 9, { width: 200 });
							var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
								(venta.sucursal.telefono2 != null && venta.sucursal.textlefono2 != "" ? "-" + venta.sucursal.telefono2 : "") +
								(venta.sucursal.telefono3 != null && venta.sucursal.textlefono3 != "" ? "-" + venta.sucursal.telefono3 : "");
							doc.text("TELF.: " + telefono, 60, yDescDir + 5);
							doc.text("COCHABAMBA - BOLIVIA", 60, yDescDir + 5);
							departamentoSucursal = venta.sucursal.departamento ? venta.sucursal.departamento.nombre : "";
						}

					}

				}
				doc.font('Helvetica-Bold', 16);
				if (!venta.id_mesero) {
					doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), 250, 100);
				} else {
					doc.text("VENTA", 250, 100);
				}
				doc.font('Helvetica-Bold', 8);
				doc.text("ORIGINAL", 450, 98, { width: 200 });
				doc.font('Helvetica-Bold', 8)
				doc.text(venta.actividad.nombre, 400, 105, { width: 200 });

				if (completa || vacia) {
					if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
						if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
							doc.rect(380, 40, 190, 50).stroke();
						} else {

							doc.rect(380, 40, 190, 50).fillAndStroke(venta.configuracion.color1, "black").fillColor('black').stroke();
						}
					}
					doc.text("NIT : ", 390, 50);
					doc.text("FACTURA No : ", 390, 60);
					doc.text("AUTORIZACIÓN No : ", 390, 70);
				}
				doc.text(usuario.empresa.nit, 500, 50);
				doc.font('Helvetica-Bold', 8);
				doc.text(venta.factura ? venta.factura : "pendiente", 500, 60);
				doc.text(venta.autorizacion ? venta.autorizacion : "pendiente", 500, 70);
				if (completa || vacia) {
					/* if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') { */
					if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 160, 520, 40).stroke();
					} else {
						doc.rect(50, 160, 520, 40).fillAndStroke(venta.configuracion.color1, "black").fillColor('black').stroke();
					}
					/* } */
					doc.text("LUGAR Y FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 360, 165);
				}
				doc.text(departamentoSucursal + ", " + (venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto), 140, 165);
				doc.text(venta.cliente ? venta.cliente.razon_social : "pendiente", 120, 175);
				doc.text(venta.cliente ? venta.cliente.nit : "pendiente", 400, 165);
				if (completa || vacia) {
					/* if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') { */
					if (venta.configuracion.formatoColor.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 200, 520, 25).stroke();
					} else {
						doc.rect(50, 200, 520, 25).fillAndStroke(venta.configuracion.color2, "black").fillColor('white').stroke();
						/* 	} */
					}
					//doc.rect(50,225,520,papel[1]-175-225).stroke();
					var existencias = VerificarDescuentos(venta.detallesVenta);
					var existenDescuentos = existencias.descuento

					if (venta.movimiento) {
						venta.movimientoServicio = venta.movimiento.nombre_corto == Diccionario.EGRE_SERVICIO ? venta.movimiento : null
					}
					var tipoConfiguracionNotaServicio = venta.configuracion.tipoConfiguracionNotaServicio ? venta.configuracion.tipoConfiguracionNotaServicio.nombre_corto : "";
					if (venta.movimientoServicio) {
						if (existenDescuentos) {
							if (tipoConfiguracionNotaServicio == "CON_CANTIDAD") {
								doc.text("CANT.", 55, 210);
								doc.text("DETALLE", 110, 210);
								doc.text("P. UNIT.", 335, 210);
							} else {
								doc.text("DETALLE", 55, 210);
								doc.text("IMPORTE", 335, 210);
							}

							doc.text("DESC.", 385, 210);
							doc.text("REC.", 420, 210);
							doc.text("ICE", 455, 210);
							doc.text("EXC.", 490, 210);

							doc.text("TOTAL", 520, 210);
						} else {
							if (tipoConfiguracionNotaServicio == "CON_CANTIDAD") {
								doc.text("CANT.", 50, 210, { width: 30, align: 'center' });
								doc.text("DETALLE", 80, 210, { width: 380, align: 'center' });
								doc.text("P. UNIT.", 460, 210, { width: 55, align: 'center' });
							} else {
								doc.text("DETALLE", 55, 210);
								doc.text("IMPORTE", 450, 210);
							}

							doc.text("TOTAL", 515, 210, { width: 55, align: 'center' });
						}
					} else {
						if (existenDescuentos) {
							doc.text("CODIGO", 55, 210);
							doc.text("CANT.", 110, 210);
							doc.text("DETALLE", 180, 210);
							doc.text("P. UNIT.", 300, 210);
							doc.text("IMPORTE", 335, 210);
							if (venta.detallesVenta[0].producto) {
								doc.text("UNID.", 140, 210);
								doc.text("DESC.", 385, 210);
								doc.text("REC.", 420, 210);
								doc.text("ICE", 455, 210);
								doc.text("EXC.", 490, 210);
							}
							doc.text("TOTAL", 520, 210);
						} else {
							doc.text("CODIGO", 55, 210);
							doc.text("CANTIDAD", 110, 210);
							if (venta.detallesVenta[0].producto) {
								doc.text("UNIDAD", 165, 210);
							}
							doc.text("DETALLE", 220, 210);
							doc.text("P.UNIT.", 450, 210);
							doc.text("TOTAL", 520, 210);
						}
					}
					doc.fillColor('black');
				}
			}

		};
		return res;
	}])

	.factory('ImprimirPedido', [function () {
		var res = function (venta, esAccionGuardar, doc, stream, sizeY, usuario, llevar) {


			for (var j = 0; j < venta.sucursal.copias_impresion_pedido; j++) {
				if (j != 0) {
					doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
				}
				doc.font('Helvetica-Bold', 12);
				if (llevar) {
					doc.text("PARA LLEVAR¡¡¡", { align: 'center' })
				}
				doc.font('Helvetica-Bold', 14);
				doc.text("Nro. Pedido : " + venta.pedido + "", { align: 'left' });
				if (usuario.empresa.ver_usuario_en_ticket) {
					doc.font('Helvetica-Bold', 8);
					doc.text("Usuario : " + usuario.persona.nombre_completo, { align: 'left' });
				}

				doc.font('Helvetica', 8);
				doc.text(venta.sucursal.frase_pedido + " : " + venta.factura, { align: 'left' });
				doc.moveDown(0.4);
				if (!venta.mesero) {
					doc.text("Cliente : " + venta.cliente.razon_social, { align: 'left' });
					doc.moveDown(0.4);
					doc.text("NIT/CI : " + venta.cliente.nit, { align: 'left' });
				} else {
					doc.text("Mesero : " + venta.mesero.persona.nombre_completo, { align: 'left' });
					doc.moveDown(0.4);
					doc.text("Mesa : " + venta.mesa, { align: 'left' });
				}
				doc.moveDown(0.4);
				doc.text("Total Transacción : " + venta.total.toFixed(2), { align: 'left' });

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
				for (var i = 0; i < venta.detallesVenta.length; i++) {
					doc.text(venta.detallesVenta[i].cantidad, 20, y);
					if (venta.detallesVenta[i].producto) {
						if (venta.detallesVenta[i].producto.nombre.length > 40) {
							doc.fontSize(8);
						}
						doc.text(capitalize(venta.detallesVenta[i].producto.nombre.toLowerCase()), 45, y, { width: 110 });
						doc.text(venta.detallesVenta[i].total.toFixed(2), 165, y, { width: 38, align: 'right' });
						if (venta.detallesVenta[i].producto.combo) {
							y = y + 10;
							for (const detalleCombo of venta.detallesVenta[i].detallesCombo) {
								if (detalleCombo.mostrar) {
									doc.font('Helvetica-Oblique', 7);
									doc.text(capitalize(detalleCombo.producto.nombre.toLowerCase()), 50, y, { width: 160 });
									doc.font('Helvetica', 8);
									y = y + 10;
								}
							}


						}
						if (venta.detallesVenta[i].observaciones) {
							if (!venta.detallesVenta[i].producto.combo) {
								y = y + 10;
							}
							doc.font('Helvetica-BoldOblique', 7);
							doc.text(capitalize(venta.detallesVenta[i].observaciones.toLowerCase()), 50, y, { width: 160 });
							doc.font('Helvetica', 8);
						}
						doc.fontSize(8);
					} else {
						if (venta.detallesVenta[i].servicio.nombre.length > 40) {
							doc.fontSize(9);
						}
						doc.text(capitalize(venta.detallesVenta[i].servicio.nombre.toLowerCase()), 45, y, { width: 110 });
						doc.text((venta.detallesVenta[i].total ? venta.detallesVenta[i].total.toFixed(2) : venta.detallesVenta[i].importe.toFixed(2)), 168, y);
						doc.fontSize(10);
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
				if (llevar) {
					doc.text("PARA LLEVAR¡¡¡", { align: 'center' })
				}
				doc.font('Helvetica-Bold', 13);
				if (usuario.empresa.ver_usuario_en_ticket) {
					doc.text(usuario.persona.nombre_completo, { align: 'left' });
					doc.moveDown(0.1);
				}

				var x = doc.x
				var y = doc.y;
				doc.text("Nro. Pedido : ", 20, y, { align: 'left' });
				doc.font('Helvetica-Bold', 22);
				doc.text(venta.pedido, 120, y - 5);
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social, 20, y + 15, { align: 'left' });
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
				for (var i = 0; i < venta.detallesVenta.length; i++) {
					doc.text(venta.detallesVenta[i].cantidad, 20, y);
					if (venta.detallesVenta[i].producto) {
						if (venta.detallesVenta[i].producto.nombre.length > 40) {
							doc.fontSize(9);
						}
						doc.text(capitalize(venta.detallesVenta[i].producto.nombre.toLowerCase()), 45, y, { width: 110 });
						doc.text(venta.detallesVenta[i].total.toFixed(2), 168, y);
						doc.fontSize(10);
					} else {
						if (venta.detallesVenta[i].servicio.nombre.length > 40) {
							doc.fontSize(9);
						}
						doc.text(capitalize(venta.detallesVenta[i].servicio.nombre.toLowerCase()), 45, y, { width: 110 });
						doc.text((venta.detallesVenta[i].total ? venta.detallesVenta[i].total.toFixed(2) : venta.detallesVenta[i].importe.toFixed(2)), 168, y);
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
		}
		return res;
	}])

	.factory('ImprimirFacturaRollo', ['blockUI', function (blockUI) {
		var res = function (venta, papel, doc, stream, usuario) {
			if (venta.configuracion.usar_pf) {
				var canvas = document.getElementById('qr-code');
				doc.moveDown(1);
				if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, (doc.page.width - 80) / 2, doc.y, { fit: [70, 70] }); }  //{ width: 80, height: 50 }
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				if (venta.sucursal.numero > 0 && venta.sucursalPrincipal.length > 0) {
					doc.text(venta.sucursalPrincipal[0].nombre.toUpperCase(), { align: 'center' });
					doc.moveDown(0.4);
					doc.text(venta.sucursalPrincipal[0].direccion.toUpperCase(), { align: 'center' });
					doc.moveDown(0.4);
					var telefonoP = (venta.sucursalPrincipal[0].telefono1 != null ? venta.sucursalPrincipal[0].telefono1 : "") +
						(venta.sucursalPrincipal[0].telefono2 != null ? "-" + venta.sucursalPrincipal[0].telefono2 : "") +
						(venta.sucursalPrincipal[0].telefono3 != null ? "-" + venta.sucursalPrincipal[0].telefono3 : "");
					doc.text("TELF.: " + telefonoP, { align: 'center' });
					doc.moveDown(0.4);
					doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
					doc.text("------------------------------------", { align: 'center' });
					doc.moveDown(0.4);

				}

				doc.text(venta.sucursal.nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.sucursal.direccion.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
					(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
					(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.textlefono3 : "");
				doc.text("TELF.: " + telefono, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				doc.text("PROFORMA NV", { align: 'center' });
				doc.font('Helvetica', 7);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				var factura = venta.factura != null ? venta.factura : "pendiente"
				doc.text("Nro.  " + factura, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.tipoPago.nombre_corto, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.6);
				doc.text("FECHA : " + venta.fechaTexto, { align: 'left' });
				doc.moveDown(0.4);
				var cliente = venta.cliente != null ? venta.cliente.razon_social : "pendiente"
				doc.text("SEÑOR(ES) : " + cliente, { align: 'left' });
				doc.moveDown(0.4);
				var nit = venta.cliente != null ? venta.cliente.nit : "pendiente"
				doc.text("NIT/CI : " + nit, { align: 'left' });
				doc.moveDown(0.4);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.2);
				doc.text("CANT   CONCEPTO                                   P. UNIT.    SUBTOTAL", { align: 'left' });
				doc.moveDown(0.2);
				doc.text("---------------------------------------------------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				var y = doc.y, sumaDescuento = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
				for (var i = 0; i < venta.detallesVenta.length; i++) {
					doc.text(venta.detallesVenta[i].cantidad, 15, y);
					if (venta.detallesVenta[i].producto) {
						if (venta.detallesVenta[i].producto.nombre.length > 40) {
							doc.fontSize(6);
						}
						var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
						var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
						doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 35, y, { width: 100 });
						doc.fontSize(7);
						if (venta.ver_dolares) {
							doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 145, y);
							doc.text(venta.detallesVenta[i].importe.toFixed(2), 180, y);
							sumaDescuento = sumaDescuento + venta.detallesVenta[i].descuento_dolares;
							sumaRecargo = sumaRecargo + venta.detallesVenta[i].recargo_dolares;
							sumaIce = sumaIce + venta.detallesVenta[i].ice_dolares;
							sumaExcento = sumaExcento + venta.detallesVenta[i].excento_dolares;
						} else {
							doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 145, y);
							doc.text(venta.detallesVenta[i].importe.toFixed(2), 180, y);
							sumaDescuento = sumaDescuento + venta.detallesVenta[i].descuento;
							sumaRecargo = sumaRecargo + venta.detallesVenta[i].recargo;
							sumaIce = sumaIce + venta.detallesVenta[i].ice;
							sumaExcento = sumaExcento + venta.detallesVenta[i].excento;
						}
					} else {
						if (venta.detallesVenta[i].servicio.nombre.length > 40) {
							doc.fontSize(6);
						}
						doc.text(venta.detallesVenta[i].servicio.nombre, 35, y, { width: 100 });
						doc.fontSize(7);
						doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 145, y);
						doc.text(venta.detallesVenta[i].importe.toFixed(2), 180, y);
						sumaDescuento = sumaDescuento + (venta.detallesVenta[i].tipo_descuento ? (venta.detallesVenta[i].importe * (venta.detallesVenta[i].descuento / 100)) : venta.detallesVenta[i].descuento);
						sumaRecargo = sumaRecargo + (venta.detallesVenta[i].tipo_recargo ? (venta.detallesVenta[i].importe * (venta.detallesVenta[i].recargo / 100)) : venta.detallesVenta[i].recargo);
						sumaIce = sumaIce + venta.detallesVenta[i].ice;
						sumaExcento = sumaExcento + venta.detallesVenta[i].excento;
					}

					y = y + 20;
				}
				doc.text("--------------", 10, y, { align: 'right' });
				//oc.text("--------------------",{align:'right'});
				doc.moveDown(0.4);
				doc.text("IMPORTE TOTAL Bs.              " + venta.importe.toFixed(2), { align: 'right' });
				doc.moveDown(0.3);
				if (sumaDescuento > 0) {
					doc.text("DESCUENTO Bs.              " + sumaDescuento.toFixed(2), { align: 'right' });
				}
				doc.moveDown(0.3);
				if (sumaRecargo > 0) {
					doc.text("RECARGO Bs.              " + sumaRecargo.toFixed(2), { align: 'right' });
				}
				doc.moveDown(0.3);
				if (sumaIce > 0) {
					doc.text("ICE Bs.              " + sumaIce.toFixed(2), { align: 'right' });
				}
				doc.moveDown(0.3);
				if (sumaExcento > 0) {
					doc.text("EXCENTO Bs.              " + sumaExcento.toFixed(2), { align: 'right' });
				}
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.              " + venta.total.toFixed(2), { align: 'right' });
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.text("SON: " + venta.numero_literal, { align: 'left' });
				doc.moveDown(0.6);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.text("usuario : " + usuario.nombre_usuario, 0, y + 205, { align: 'right' });
				doc.moveDown(0.4);
				doc.text("fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min, 10, y + 215, { align: 'right' });

			} else {
				var canvas = document.getElementById('qr-code');
				var anchoVisible = 197;
				var inicioFila = 14;
				var anchoUso = anchoVisible - inicioFila;
				// draw some text
				doc.moveDown(0.8);
				if (usuario.empresa.imagen.length > 100) {
					doc.image(usuario.empresa.imagen, (anchoUso / 2) - 30, doc.y, { fit: [70, 70] });
				}
				doc.y = 40;
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
				//doc.text(usuario.empresa.razon_social.toUpperCase(),{align:'center'});
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				if (venta.sucursal.numero > 0 && venta.sucursalPrincipal.length > 0) {
					doc.text(venta.sucursalPrincipal[0].nombre.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.moveDown(0.4);
					doc.text(venta.sucursalPrincipal[0].direccion.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.moveDown(0.4);
					var telefonoP = (venta.sucursalPrincipal[0].telefono1 != null ? venta.sucursalPrincipal[0].telefono1 : "") +
						(venta.sucursalPrincipal[0].telefono2 != null ? "-" + venta.sucursalPrincipal[0].telefono2 : "") +
						(venta.sucursalPrincipal[0].telefono3 != null ? "-" + venta.sucursalPrincipal[0].telefono3 : "");
					doc.text("TELF.: " + telefonoP, inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.moveDown(0.4);
					doc.text("COCHABAMBA - BOLIVIA", inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.text("------------------------------------", inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.moveDown(0.4);
				}

				doc.text(venta.sucursal.nombre.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.sucursal.direccion.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
					(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
					(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
				doc.text("TELF.: " + telefono, inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				if (!venta.id_mesero) {
					doc.text(venta.configuracion.tituloFactura.nombre.toUpperCase(), inicioFila, doc.y, { width: anchoUso, align: 'center' });
				} else {
					doc.text("VENTA", inicioFila, doc.y, { width: anchoUso, align: 'center' });
				}
				doc.font('Helvetica', 7);
				doc.moveDown(0.4);
				doc.text("------------------------------------", inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				doc.text("NIT: " + usuario.empresa.nit, inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				var factura = venta.factura != null ? venta.factura : "pendiente"
				doc.text("Nro.  " + factura, inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				var autorizacion = venta.autorizacion != null ? venta.autorizacion : "pendiente"
				doc.text("AUTORIZACIÓN No: " + autorizacion, inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				doc.text("------------------------------------", inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.actividad.nombre, inicioFila, doc.y, { width: anchoUso, align: 'center' });
				doc.x = 20;
				doc.moveDown(0.6);
				doc.text("FECHA : " + venta.fechaTexto, inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.4);
				var cliente = venta.cliente != null ? venta.cliente.razon_social ? venta.cliente.razon_social : "SIN NOMBRE" : "pendiente"
				doc.text("SEÑOR(ES) : " + cliente, inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.4);
				var nit = venta.cliente != null ? venta.cliente.nit ? venta.cliente.nit : "0" : "pendiente"
				doc.text("NIT/CI : " + nit, inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.4);
				doc.text("------------------------------------------------------------------------------", inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.2);
				doc.text("CANT             CONCEPTO               P. UNIT.  SUBTOTAL", inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.2);
				doc.text("------------------------------------------------------------------------------", inicioFila, doc.y, { width: anchoUso, align: 'left' });
				doc.moveDown(0.4);
				var y = doc.y, sumaDescuento = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
				for (var i = 0; i < venta.detallesVenta.length; i++) {
					doc.text(venta.detallesVenta[i].cantidad, inicioFila, y, { width: 17, align: 'left' });
					if (venta.detallesVenta[i].producto) {
						if (venta.detallesVenta[i].producto.nombre.length > 40) {
							doc.fontSize(6);
						}
						var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
						var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
						doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 31, y, { width: 100 });
						doc.fontSize(7);
						doc.text(number_format_negativo_to_positvo(venta.detallesVenta[i].precio_unitario, 2), 131, y, { width: 32, align: 'right' });
						doc.text(number_format_negativo_to_positvo(venta.detallesVenta[i].importe, 2), 163, y, { width: 34, align: 'right' });
						sumaDescuento = sumaDescuento + (venta.detallesVenta[i].tipo_descuento ? (venta.detallesVenta[i].importe * (venta.detallesVenta[i].descuento / 100)) : venta.detallesVenta[i].descuento);
						sumaRecargo = sumaRecargo + (venta.detallesVenta[i].tipo_recargo ? (venta.detallesVenta[i].importe * (venta.detallesVenta[i].recargo / 100)) : venta.detallesVenta[i].recargo);
						sumaIce = sumaIce + venta.detallesVenta[i].ice;
						sumaExcento = sumaExcento + venta.detallesVenta[i].excento;
					} else {
						if (venta.detallesVenta[i].servicio.nombre.length > 40) {
							doc.fontSize(6);
						}
						doc.text(venta.detallesVenta[i].servicio.nombre, 40, y, { width: 100 });
						doc.fontSize(7);
						doc.text(number_format_negativo_to_positvo(venta.detallesVenta[i].precio_unitario, 2), 131, y, { width: 32, align: 'right' });
						doc.text(number_format_negativo_to_positvo(venta.detallesVenta[i].importe, 2), 163, y, { width: 34, align: 'right' });
					}

					y = y + 20;
				}
				doc.x = 20;
				doc.text("---------------", 163, doc.y,);

				doc.text("IMPORTE TOTAL Bs.", 31, doc.y, { width: 130, align: 'right' }); doc.y -= 8;
				doc.text(number_format_negativo_to_positvo(venta.importe, 2), 163, doc.y, { width: 34, align: 'right' });
				if (sumaDescuento > 0) {
					doc.text("DESCUENTO Bs.", 31, doc.y, { width: 130, align: 'right' });
					doc.text(number_format_negativo_to_positvo(sumaDescuento, 2), 163, doc.y, { width: 34, align: 'right' });
				}
				if (sumaRecargo > 0) {
					doc.moveDown(0.3);
					doc.text("RECARGO Bs.", 31, doc.y, { width: 130, align: 'right' }); doc.y -= 8;
					doc.text(number_format_negativo_to_positvo(sumaRecargo, 2), 163, doc.y, { width: 34, align: 'right' });
				}
				if (sumaIce > 0) {
					doc.moveDown(0.3);
					doc.text("ICE Bs.", 31, doc.y, { width: 130, align: 'right' }); doc.y -= 8;
					doc.text(number_format_negativo_to_positvo(sumaIce, 2), 163, doc.y, { width: 34, align: 'right' });
				}
				if (sumaExcento > 0) {
					doc.moveDown(0.3);
					doc.text("EXCENTO Bs.", 31, doc.y, { width: 130, align: 'right' }); doc.y -= 8;
					doc.text(number_format_negativo_to_positvo(sumaExcento, 2), 163, doc.y, { width: 34, align: 'right' });
				}
				doc.moveDown(0.3);
				doc.text("TOTAL Bs.", 31, doc.y, { width: 130, align: 'right' }); doc.y -= 8;
				doc.text(number_format_negativo_to_positvo(venta.total, 2), 163, doc.y, { width: 34, align: 'right' });
				doc.x = 20;
				doc.fontSize(8);
				doc.moveDown(0.4);
				doc.moveDown(0.4);
				doc.text("SON: " + venta.numero_literal, { align: 'left' });
				doc.moveDown(0.6);
				if (!venta.id_mesero) {
					doc.text("CÓDIGO DE CONTROL: " + venta.codigo_control, inicioFila, doc.y, { width: anchoUso, align: 'center' });

					doc.moveDown(0.4);
					venta.fecha_limite_emision = new Date(venta.fecha_limite_emision);
					doc.text("FECHA LÍMITE DE EMISIÓN: " + ("0" + venta.fecha_limite_emision.getDate()).slice(-2) + "/" + ("0" + (venta.fecha_limite_emision.getMonth() + 1)).slice(-2) + "/" + venta.fecha_limite_emision.getFullYear(), inicioFila, doc.y, { width: anchoUso, align: 'center' });

					doc.moveDown(0.4);
					qr.canvas({
						canvas: canvas,
						value: usuario.empresa.nit + "|" + venta.factura + "|" + venta.autorizacion + "|" + venta.fechaTexto + "|" + venta.total.toFixed(2) + "|" + venta.total.toFixed(2) + "|" + venta.codigo_control + "|" + venta.cliente.nit + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0"
					}, function () { });

					var qrImage = canvas.toDataURL('image/png');
					doc.image(qrImage, (anchoUso / 2) - 30, doc.y, { width: 80, height: 80 });

					doc.moveDown(0.4);
					doc.text((venta.pieFactura) ? venta.pieFactura.nombre : ""/*,0,doc.y*/, inicioFila, doc.y, { width: anchoUso, align: 'center' });
					doc.moveDown(0.6);
					doc.text("\"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAIS. EL USO ILICITO DE ESTA SERA SANCIONADO DE ACUERDO A LEY\"", inicioFila, doc.y, { width: anchoUso, align: 'center' });
				}
				doc.moveDown(0.4);

				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}
				doc.fontSize(6);
				doc.text("  Usuario : " + usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
			}
			blockUI.stop();
		}
		return res;
	}])

	.factory('ImprimirProforma', ['Diccionario', 'ImprimirProformaCartaOficio', 'ImprimirPedido', 'ImprimirProformaRollo', '$timeout',
		function (Diccionario, ImprimirProformaCartaOficio, ImprimirPedido, ImprimirProformaRollo, $timeout) {
			var res = function (venta, esAccionGuardar, usuario, llevar, mostrarMensaje) {
				var papel, doc, stream;
				if (venta.configuracion.tipoConfiguracionNotaVenta == null) {
					mostrarMensaje("Configure la Nota de Venta en Configuraciones");
				} else {
					if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						papel = [612, 936];
						if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
							ImprimirProformaCartaOficio(venta, papel, true, false, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, true, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, false, true, usuario);
						}
					} else if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						papel = [612, 792];
						if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
							ImprimirProformaCartaOficio(venta, papel, true, false, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, true, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, false, true, usuario);
						}
					} else if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						papel = [612, 468];
						if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_VACIA) {
							ImprimirProformaCartaOficio(venta, papel, true, false, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_COMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, true, false, usuario);
						} else if (venta.configuracion.impresionFactura.nombre_corto == Diccionario.FACT_IMPRESION_SEMICOMPLETA) {
							ImprimirProformaCartaOficio(venta, papel, false, false, true, usuario);
						}
					} else if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_ROLLO) {
						var alto;
						if (venta.detallesVenta.length <= 2) {
							alto = 400;
						} else {
							alto = 400 + (20 * (venta.detallesVenta.length - 2))
						}
						papel = [227, alto];

						if (esAccionGuardar && !venta.configuracion.imprimir_al_guardar) {
							if (usuario.empresa.usar_pedidos) {
								var sizeY = 230 + (20 * venta.detallesVenta.length);
								for (const detalleVenta of venta.detallesVenta) {
									sizeY += (10 * detalleVenta.detallesCombo.length);
									if (detalleVenta.observaciones) {
										sizeY += 10
									}
								}
								doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
								stream = doc.pipe(blobStream());
								ImprimirPedido(venta, esAccionGuardar, doc, stream, sizeY, usuario, llevar);
							}
						} else {
							if (!venta.sin_impresion_proforma_en_express) {
								doc = new PDFDocument({ compress: false, size: papel, margins: { top: 0, bottom: 0, left: 20, right: 20 } });
								stream = doc.pipe(blobStream());
								ImprimirProformaRollo(venta, papel, doc, stream, usuario);

								if (usuario.empresa.usar_pedidos && !usuario.empresa.usar_restaurante_express) {
									var sizeY = 230 + (20 * venta.detallesVenta.length);
									for (const detalleVenta of venta.detallesVenta) {
										sizeY += (10 * detalleVenta.detallesCombo.length);
										if (detalleVenta.observaciones) {
											sizeY += 10
										}
									}
									doc.addPage({ size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
									ImprimirPedido(venta, esAccionGuardar, doc, stream, sizeY, usuario, llevar);
								}
							} else {
								if (usuario.empresa.usar_pedidos) {
									var sizeY = 230 + (20 * venta.detallesVenta.length);
									for (const detalleVenta of venta.detallesVenta) {
										sizeY += (10 * detalleVenta.detallesCombo.length);
										if (detalleVenta.observaciones) {
											sizeY += 10
										}
									}
									doc = new PDFDocument({ compress: false, size: [227, sizeY], margins: { top: 10, bottom: 10, left: 20, right: 20 } });
									stream = doc.pipe(blobStream());
									ImprimirPedido(venta, esAccionGuardar, doc, stream, sizeY, usuario, llevar);
								}
							}
						}

						if (doc && stream) {
							doc.end();
							stream.on('finish', function () {
								var fileURL = stream.toBlobURL('application/pdf');
								var w = window.open(fileURL, '_blank', 'location=no');
								$timeout(function () {
									w.print();
								}, 500);
							});
						}
					}
				}
			}
			return res;
		}])
	.factory('DibujarDetalleCuerpoProformaNVmedioOficio', ['blockUI', function (blockUI) {
		var res = function (i, y, doc, usuario, venta, tipo, texto1, texto2, texto3) {
			var posicionCuadro = 30
			if (tipo == 0) {
				doc.text(venta.detallesVenta[i].producto.codigo, 55, y);
				doc.text(venta.detallesVenta[i].cantidad, 140, y);
				doc.text(venta.detallesVenta[i].producto.unidad_medida, 175, y, { width: 30 });
				var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 210, y, { width: 147 });
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text(venta.detallesVenta[i].lote, 400, y, { width: 47 });
						} else {
							doc.text(venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear(), 350, y);
							doc.text(venta.detallesVenta[i].lote, 415, y, { width: 47 });
						}
					}
				}
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 465, y);
				doc.text(venta.detallesVenta[i].total.toFixed(2), 520, y);

			}
			if (tipo == 1) {
				var ydesc = y
				venta.detallesVenta[i].producto.codigo = venta.detallesVenta[i].producto.codigo
				if (venta.detallesVenta[i].producto.codigo.length > 14 && venta.detallesVenta[i].producto.codigo.length <= 28) {
					ydesc = y - 5
				} else if (venta.detallesVenta[i].producto.codigo.length > 28) {
					ydesc = y - 10
				}
				doc.text(venta.detallesVenta[i].producto.codigo, 55, ydesc, { width: 62 });
				doc.text(venta.detallesVenta[i].cantidad, 120, y);
				doc.text(venta.detallesVenta[i].producto.unidad_medida, 150, y, { width: 50 });
				ydesc = y
				venta.detallesVenta[i].producto.nombre = venta.detallesVenta[i].producto.nombre
				var cantidadlineas = venta.detallesVenta[i].producto.nombre.length
				var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 30 && (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) <= 60) {
					ydesc = y - 7
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 30
					posicionCuadro = 25 + cantidadlineas * 5
				} else if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 60) {
					ydesc = y - 10
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 30
					posicionCuadro = 30 + cantidadlineas * 5
				}
				if (posicionCuadro < 30) {
					posicionCuadro = 30
				}

				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 200, ydesc, { width: 140 });
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text(venta.detallesVenta[i].lote, 340, y, { width: 80 });
						} else {
							doc.text(venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear(), 340, y);
							doc.text(venta.detallesVenta[i].lote, 395, y, { width: 35 });
						}

					}
				}
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 435, y);
				doc.text(venta.detallesVenta[i].importe.toFixed(2), 470, y);
				doc.text((texto1 ? texto1.toFixed(2) : 0), 505, y);
				doc.text(venta.detallesVenta[i].total.toFixed(2), 535, y);
			} else if (tipo == 2) {
				var ydesc = y
				if (venta.detallesVenta[i].producto.codigo.length > 14 && venta.detallesVenta[i].producto.codigo.length <= 28) {
					ydesc = y - 5
				} else if (venta.detallesVenta[i].producto.codigo.length > 28) {
					ydesc = y - 10
				}
				doc.text(venta.detallesVenta[i].producto.codigo, 55, ydesc, { width: 60 });
				doc.text(venta.detallesVenta[i].cantidad, 130, y);
				doc.text(venta.detallesVenta[i].producto.unidad_medida, 155, y, { width: 30 });
				ydesc = y
				venta.detallesVenta[i].producto.nombre = venta.detallesVenta[i].producto.nombre
				var cantidadlineas = venta.detallesVenta[i].producto.nombre.length
				var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 20 && (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) <= 40) {
					ydesc = y - 7
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 20
					posicionCuadro = 25 + cantidadlineas * 5
				} else if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 46) {
					ydesc = y - 10
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 20
					posicionCuadro = 30 + cantidadlineas * 5
				}
				if (posicionCuadro < 30) {
					posicionCuadro = 30
				}

				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 195, ydesc, { width: 110 });
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text(venta.detallesVenta[i].lote, 305, y, { width: 80 });
						} else {
							doc.text(venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear(), 305, y);
							doc.text(venta.detallesVenta[i].lote, 350, y, { width: 35 });
						}
					}
				}
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 395, y);
				doc.text(venta.detallesVenta[i].importe.toFixed(2), 435, y);
				doc.text((texto1 ? texto1.toFixed(2) : 0), 470, y);

				doc.text(texto2.toFixed(2), 505, y);
				doc.text(venta.detallesVenta[i].total.toFixed(2), 535, y);
			} else if (tipo == 3) {
				var ydesc = y
				if (venta.detallesVenta[i].producto.codigo.length > 14 && venta.detallesVenta[i].producto.codigo.length <= 28) {
					ydesc = y - 5
				} else if (venta.detallesVenta[i].producto.codigo.length > 28) {
					ydesc = y - 10
				}
				doc.text(venta.detallesVenta[i].producto.codigo, 55, ydesc, { width: 60 });
				doc.text(venta.detallesVenta[i].cantidad, 130, y);
				doc.text(venta.detallesVenta[i].producto.unidad_medida, 155, y, { width: 30 });
				ydesc = y
				venta.detallesVenta[i].producto.nombre = venta.detallesVenta[i].producto.nombre
				var cantidadlineas = venta.detallesVenta[i].producto.nombre.length
				var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 23 && (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) <= 46) {
					ydesc = y - 7
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 23
					posicionCuadro = 25 + cantidadlineas * 5
				} else if (venta.detallesVenta[i].producto.nombre.length > 46) {
					ydesc = y - 10
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 23
					posicionCuadro = 30 + cantidadlineas * 5
				}
				if (posicionCuadro < 30) {
					posicionCuadro = 30
				}

				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 195, ydesc, { width: 90 });
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text(venta.detallesVenta[i].lote, 280, y, { width: 80 });
						} else {
							doc.text(venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear(), 280, y);
							doc.text(venta.detallesVenta[i].lote, 315, y, { width: 35 });
						}

					}
				}
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 350, y);
				doc.text(venta.detallesVenta[i].importe.toFixed(2), 390, y);
				doc.text(texto1 ? texto1.toFixed(2) : 0, 435, y);
				doc.text(texto2 ? texto2.toFixed(2) : 0, 470, y);
				doc.text(texto3 ? texto3.toFixed(2) : 0, 505, y);
				doc.text(venta.detallesVenta[i].total.toFixed(2), 535, y);
			} else if (tipo == 4) {
				var ydesc = y
				if (venta.detallesVenta[i].producto.codigo.length > 8 && venta.detallesVenta[i].producto.codigo.length <= 16) {
					ydesc = y - 5
				} else if (venta.detallesVenta[i].producto.codigo.length > 16) {
					ydesc = y - 10
				}
				doc.text(venta.detallesVenta[i].producto.codigo, 55, ydesc, { width: 35 });
				doc.text(venta.detallesVenta[i].cantidad, 95, y);
				doc.text(venta.detallesVenta[i].producto.unidad_medida, 118, y, { width: 30 });
				ydesc = y
				venta.detallesVenta[i].producto.nombre = venta.detallesVenta[i].producto.nombre
				var cantidadlineas = venta.detallesVenta[i].producto.nombre.length
				var promocion = venta.detallesVenta[i].producto.promocionActual ? venta.detallesVenta[i].producto.promocionActual : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 20 && (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) <= 40) {
					ydesc = y - 7
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 20
					posicionCuadro = 25 + cantidadlineas * 5
				} else if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 40) {
					ydesc = y - 10
					cantidadlineas = (venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) / 20
					posicionCuadro = 30 + cantidadlineas * 5
				}
				if (posicionCuadro < 30) {
					posicionCuadro = 30
				}

				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 155, ydesc, { width: 80 });
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text(venta.detallesVenta[i].lote, 279, y, { width: 30 });
						} else {
							doc.text(venta.detallesVenta[i].fecha_vencimiento.getDate() + "/" + (venta.detallesVenta[i].fecha_vencimiento.getMonth() + 1) + "/" + venta.detallesVenta[i].fecha_vencimiento.getFullYear(), 240, y);
							doc.text(venta.detallesVenta[i].lote, 279, y, { width: 35 });
						}

					}
				}
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 315, y);
				doc.text(venta.detallesVenta[i].importe.toFixed(2), 350, y);
				doc.text((venta.detallesVenta[i].descuento ? venta.detallesVenta[i].descuento.toFixed(2) : 0), 395, y);
				doc.text(venta.detallesVenta[i].recargo.toFixed(2), 435, y);
				doc.text(venta.detallesVenta[i].ice.toFixed(2), 470, y);
				doc.text(venta.detallesVenta[i].excento.toFixed(2), 505, y);
				doc.text(venta.detallesVenta[i].total.toFixed(2), 535, y);

			}
			var datos = { y: y, posicionCuadro: posicionCuadro }
			return datos
		}
		return res;
	}])
	.factory('ImprimirProformaCartaOficio', ['Diccionario', '$timeout', 'blockUI', 'VerificarDescuentos', 'DibujarCabeceraProformaNVmedioOficio', 'DibujarDetalleCuerpoProformaNVmedioOficio',
		function (Diccionario, $timeout, blockUI, VerificarDescuentos, DibujarCabeceraProformaNVmedioOficio, DibujarDetalleCuerpoProformaNVmedioOficio) {
			var res = function (venta, papel, vacia, completa, semicompleta, usuario) {
				var doc = new PDFDocument({ compress: false, size: papel, margin: 10 });
				var stream = doc.pipe(blobStream());
				//var canvas=document.getElementById('qr-code');
				// draw some text
				var tamañoPapelComparacion = 0
				var existencias = VerificarDescuentos(venta.detallesVenta);
				var existenDescuentos = existencias.descuento
				var existenRecargo = existencias.recargo
				var existenIce = existencias.ice
				var existenExcento = existencias.excento
				doc.font('Helvetica', 8);
				var itemsPorPagina = 0;
				if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					tamañoPapelComparacion = 860
					itemsPorPagina = 20;
				} else if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					tamañoPapelComparacion = 700
					itemsPorPagina = 16;
				} else if (venta.configuracion.tamanoPapelNotaVenta.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					itemsPorPagina = 6;
					tamañoPapelComparacion = 380
				}
				var y = 240, items = 0, pagina = 1, totalPaginas = Math.ceil(venta.detallesVenta.length / itemsPorPagina);
				DibujarCabeceraProformaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario);
				doc.font('Helvetica', 7);
				var totalPuntajes = 0;

				for (var i = 0; i < venta.detallesVenta.length && items <= itemsPorPagina; i++) {

					if (venta.detallesVenta[i].promocionActualPuntaje) {
						totalPuntajes = totalPuntajes + venta.detallesVenta[i].promocionActualPuntaje.puntaje;
					}

					venta.detallesVenta[i].fecha_vencimiento = new Date(venta.detallesVenta[i].fecha_vencimiento)
					var posicionCuadro = 30
					if (existenDescuentos && existenRecargo && existenIce && existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 4)
					} else if (existenDescuentos && !existenRecargo && !existenIce && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 1, venta.detallesVenta[i].descuento)
					} else if (existenDescuentos && existenIce && !existenRecargo && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].descuento, venta.detallesVenta[i].ice)
					} else if (existenDescuentos && existenExcento && !existenRecargo && !existenIce) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].descuento, venta.detallesVenta[i].excento)
					} else if (existenRecargo && !existenDescuentos && !existenIce && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 1, venta.detallesVenta[i].recargo)
					} else if (existenRecargo && existenDescuentos && !existenIce && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].descuento, venta.detallesVenta[i].recargo)
					} else if (existenRecargo && existenIce && !existenDescuentos && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].descuento, venta.detallesVenta[i].ice)
					} else if (existenRecargo && existenExcento && !existenDescuentos && !existenIce) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].descuento, venta.detallesVenta[i].exento)
					} else if (existenIce && !existenDescuentos && !existenRecargo && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 1, venta.detallesVenta[i].ice)
					} else if (existenIce && existenExcento && !existenDescuentos && !existenRecargo) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 2, venta.detallesVenta[i].ice, venta.detallesVenta[i].exento)
					} else if (existenExcento && !existenDescuentos && !existenRecargo && !existenIce) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 1, venta.detallesVenta[i].exento)
					} else if (existenDescuentos && existenRecargo && existenIce && !existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 3, venta.detallesVenta[i].descuento, venta.detallesVenta[i].recargo, venta.detallesVenta[i].ice)
					} else if (existenDescuentos && existenRecargo && !existenIce && existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 3, venta.detallesVenta[i].descuento, venta.detallesVenta[i].recargo, venta.detallesVenta[i].exento)
					} else if (existenDescuentos && !existenRecargo && existenIce && existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 3, venta.detallesVenta[i].descuento, venta.detallesVenta[i].ice, venta.detallesVenta[i].exento)
					} else if (!existenDescuentos && existenRecargo && existenIce && existenExcento) {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 3, venta.detallesVenta[i].recargo, venta.detallesVenta[i].ice, venta.detallesVenta[i].exento)
					} else {
						var posicionYyTamañoCuadro = DibujarDetalleCuerpoProformaNVmedioOficio(i, y, doc, usuario, venta, 0)
					}
					y = posicionYyTamañoCuadro.y
					posicionCuadro = posicionYyTamañoCuadro.posicionCuadro
					if (completa || vacia) {
						if (venta.configuracion.formatoPapelNotaVenta.nombre_corto == "FORM_C_MAR") {
							doc.rect(50, y - 15, 520, posicionCuadro).stroke();
						}

					}
					y = y + posicionCuadro;
					items++;

					if ((items == itemsPorPagina || doc.y > tamañoPapelComparacion) && (i != venta.detallesVenta.length - 1)) {
						doc.addPage({ size: papel, margin: 10 });
						y = 240;
						items = 0;
						pagina = pagina + 1;
						DibujarCabeceraProformaNVmedioOficio(doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario)
						doc.font('Helvetica', 7);
					}
				}

				if (totalPuntajes > 0) {
					doc.font('Helvetica', 7);
					if (totalPuntajes == 1) {
						doc.text("Total " + totalPuntajes + " punto", 50, 140);
					} else {
						doc.text("Total " + totalPuntajes + " puntos", 50, 140);
					}
				}
				if (completa || vacia) {
					doc.font('Helvetica-Bold', 7);
					doc.text("TOTAL", 455, y - 5);
				}
				doc.font('Helvetica', 7);
				doc.text(venta.total.toFixed(2), 520, y - 5);

				doc.text("SON : " + venta.numero_literal, 55, y - 5);

				if (completa || vacia) {
					doc.rect(50, y - 15, 520, 20).stroke();
				}

				if (completa || vacia) {
					//doc.text(venta.configuracion.pieFactura.nombre,50,y+100);
					//doc.text("\"ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAIS. EL USO ILICITO DE ESTA SERA SANCIONADO DE ACUERDO A LEY\"",50,y+110);
				}
				doc.moveDown(2);
				var fechaActual = new Date();
				var min = fechaActual.getMinutes();
				if (min < 10) {
					min = "0" + min;
				}

				doc.text(venta.configuracion.nota_factura_nota_venta ? "Nota: " + venta.configuracion.nota_factura_nota_venta : "", { align: 'left' });
				doc.text("  Usuario : " + usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
				if (venta.configuracion) {
					if (venta.configuracion.formatoConFirmaNotaVenta.nombre_corto === "FORM_C_FIRMA") {
						doc.font('Helvetica-Bold', 7);
						doc.text(" ...............................................                                                       ................................................", 140, 620);
						doc.text("         RECIBÍ CONFORME                                                               ENTREGUE CONFORME", 140, 630);


					}
				}
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					var w = window.open(fileURL, '_blank', 'location=no');
					$timeout(function () {
						w.print();
					}, 500);
				});
				blockUI.stop();
			}
			return res;
		}])

	.factory('DibujarCabeceraProformaNVmedioOficio', ['VerificarDescuentos', 'DibujarDetalleCabeceraProformaNVmedioOficio',
		function (VerificarDescuentos, DibujarDetalleCabeceraProformaNVmedioOficio) {
			var res = function (doc, vacia, completa, venta, papel, pagina, totalPaginas, usuario) {
				if (vacia) {
					if (usuario.empresa.imagen.length > 100) { doc.image(usuario.empresa.imagen, 60, 50, { fit: [75, 75] }); } //{ width: 50, height: 50 }
					//doc.rect(145, 50, 200, 50).stroke();
					doc.font('Helvetica-Bold', 8);
					doc.text(usuario.empresa.razon_social.toUpperCase(), 170, 60);
					doc.font('Helvetica', 7);
					doc.text(venta.sucursal.nombre.toUpperCase(), 170, 70);
					doc.text(venta.sucursal.direccion.toUpperCase(), 170, 80);
					var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
						(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
						(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
					doc.text("TELF.: " + telefono, 170, 90);
					doc.text("COCHABAMBA - BOLIVIA", 170, 100);
				}
				doc.font('Helvetica-Bold', 16);
				if (!venta.id_mesero) {
					doc.text('PROFORMA', 0, 125, { align: 'center' });
				} else {
					doc.text('VENTA', 0, 125, { align: 'center' });
				}
				var textFact = + venta.factura ? venta.factura : "pendiente"
				doc.text("N° " + textFact, 500, 80)
				doc.font('Helvetica-Bold', 8);
				if (completa || vacia) {

				}
				if (completa || vacia) {
					//doc.rect(50, 150, 520, 50).stroke();
					//if (venta.configuracion.formatoPapel.nombre_corto == 'FORM_C_MAR') {
					if (venta.configuracion.formatoColorNotaVenta.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 150, 520, 50).stroke();
					} else {
						doc.rect(50, 150, 520, 50).fillAndStroke(venta.configuracion.color_cabecera_nota_venta, "black").fillColor('black').stroke();
					}
					//}
					doc.text("FECHA : ", 60, 165);
					doc.text("SEÑOR(ES) : ", 60, 175);
					doc.text("NIT : ", 360, 165);
				}
				doc.font('Helvetica', 8);
				doc.text(venta.fecha_factura ? venta.fecha_factura : venta.fechaTexto, 120, 165);
				doc.text(venta.cliente ? venta.cliente.razon_social : "pendiente", 120, 175);
				doc.text(venta.cliente ? venta.cliente.nit : "pendiente", 400, 165);
				doc.font('Helvetica-Bold', 7);
				if (completa || vacia) {
					//doc.rect(50, 200, 520, 25).stroke();
					if (venta.configuracion.formatoColorNotaVenta.nombre_corto == "FORM_S_COL") {
						doc.rect(50, 200, 520, 25).stroke();
					} else {
						doc.rect(50, 200, 520, 25).fillAndStroke(venta.configuracion.color_detalle_nota_venta, "black").fillColor('black').stroke();
					}
					var existencias = VerificarDescuentos(venta.detallesVenta);
					var existenDescuentos = existencias.descuento
					var existenRecargo = existencias.recargo
					var existenIce = existencias.ice
					var existenExcento = existencias.excento
					if (existenDescuentos && existenRecargo && existenIce && existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 4, 'DESC.', "REC.", "ICE.", "EXC.")
					} else if (existenDescuentos && !existenRecargo && !existenIce && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 1, "DESC.")
					} else if (existenDescuentos && existenIce && !existenRecargo && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "DESC.", "ICE.")
					} else if (existenDescuentos && existenExcento && !existenRecargo && !existenIce) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "DESC.", "EXC.")
					} else if (existenRecargo && !existenDescuentos && !existenIce && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 1, "REC.")
					} else if (existenRecargo && existenDescuentos && !existenIce && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "DESC.", "REC.")
					} else if (existenRecargo && existenIce && !existenDescuentos && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "REC.", "ICE.")
					} else if (existenRecargo && existenExcento && !existenDescuentos && !existenIce) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "REC.", "EXC.")
					} else if (existenIce && !existenDescuentos && !existenRecargo && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 1, "ICE.")
					} else if (existenIce && existenExcento && !existenDescuentos && !existenRecargo) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 2, "ICE.", "EXC.")
					} else if (existenExcento && !existenDescuentos && !existenRecargo && !existenIce) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 1, "EXC.")
					} else if (existenDescuentos && existenRecargo && existenIce && !existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 3, "DESC.", "REC.", "ICE.")
					} else if (existenDescuentos && existenRecargo && !existenIce && existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 3, "DESC.", "REC.", "EXC.")
					} else if (existenDescuentos && !existenRecargo && existenIce && existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 3, "DESC.", "ICE.", "EXC.")
					} else if (!existenDescuentos && existenRecargo && existenIce && existenExcento) {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 3, "REC.", "ICE.", "EXC.")
					} else {
						DibujarDetalleCabeceraProformaNVmedioOficio(doc, usuario, venta, 0)
					}
					doc.fillColor('black');
				}
			}
			return res;
		}])
	.factory('DibujarDetalleCabeceraProformaNVmedioOficio', ['blockUI', function (blockUI) {
		var res = function (doc, usuario, venta, tipo, texto1, texto2, texto3) {
			if (tipo == 0) {
				doc.text("CODIGO", 55, 210);
				doc.text("CANTIDAD", 130, 210);
				doc.text("UNIDAD", 175, 210);
				doc.text("DETALLE", 210, 210);
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text("SERIE", 415, 210);
						} else {
							doc.text("VENC.", 360, 210)
							doc.text("LOTE.", 415, 210)
						}
						//doc.text("VENC.", 360, 210)
						//doc.text("LOTE.", 415, 210)
					}
				}
				doc.text("P.UNIT.", 465, 210);
				doc.text("TOTAL", 520, 210);
			} else if (tipo == 1) {
				doc.text("CODIGO", 55, 210);
				doc.text("CANT.", 115, 210);
				doc.text("UNID.", 155, 210);
				doc.text("DETALLE", 200, 210);
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text("SERIE.", 345, 210);
						} else {
							doc.text("VENC.", 345, 210);
							doc.text("LOTE.", 395, 210);
						}
					}
				}
				doc.text("P. UNIT.", 430, 210);
				doc.text("IMPORTE", 465, 210);
				doc.text(texto1, 505, 210);
				doc.text("TOTAL", 530, 210);
			} else if (tipo == 2) {
				doc.text("CODIGO", 55, 210);
				doc.text("CANT.", 120, 210);
				doc.text("UNID.", 160, 210);
				doc.text("DETALLE", 200, 210);
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text("SERIE.", 310, 210);
						} else {
							doc.text("VENC.", 310, 210);
							doc.text("LOTE.", 345, 210);
						}
					}
				}
				doc.text("P. UNIT.", 395, 210);
				doc.text("IMPORTE", 430, 210);
				doc.text(texto1, 468, 210);
				doc.text(texto2, 505, 210);
				doc.text("TOTAL", 530, 210);
			} else if (tipo == 3) {
				doc.text("CODIGO", 55, 210);
				doc.text("CANT.", 120, 210);
				doc.text("UNID.", 160, 210);
				doc.text("DETALLE", 200, 210);
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text("SERIE.", 275, 210)
						} else {
							doc.text("VENC.", 275, 210)
							doc.text("LOTE.", 310, 210);
						}
					}
				}
				doc.text("P. UNIT.", 345, 210);
				doc.text("IMPORTE", 390, 210);
				doc.text(texto1, 430, 210);
				doc.text(texto2, 465, 210);
				doc.text(texto3, 505, 210);
				doc.text("TOTAL", 530, 210);
			} else if (tipo == 4) {
				doc.text("CODIGO", 55, 210);
				doc.text("CANT.", 90, 210);
				doc.text("UNID.", 120, 210);
				doc.text("DETALLE", 160, 210);
				if (usuario.empresa.usar_vencimientos) {
					if (venta.con_vencimiento) {
						if (venta.configuracion.tipoConfiguracionNotaVenta.nombre_corto == "SERIE") {
							doc.text("SERIE.", 240, 210)
						} else {
							doc.text("VENC.", 240, 210)
							doc.text("LOTE.", 278, 210)
						}
					}
				}
				doc.text("P. UNIT.", 310, 210);
				doc.text("IMPORTE", 345, 210);
				doc.text("DESC.", 395, 210);
				doc.text("REC.", 430, 210);
				doc.text("ICE", 465, 210);
				doc.text("EXC.", 505, 210);
				doc.text("TOTAL", 530, 210);
			}

		}
		return res;
	}])
	.factory('ImprimirProformaRollo', ['blockUI', function (blockUI) {
		var res = function (venta, papel, doc, stream, usuario) {
			doc.moveDown(2);
			doc.font('Helvetica-Bold', 8);
			doc.text(usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
			doc.moveDown(0.4);
			doc.font('Helvetica', 7);
			if (venta.sucursal.numero > 0 && venta.sucursalPrincipal.length > 0) {
				doc.text(venta.sucursalPrincipal[0].nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(venta.sucursalPrincipal[0].direccion.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				var telefonoP = (venta.sucursalPrincipal[0].telefono1 != null ? venta.sucursalPrincipal[0].telefono1 : "") +
					(venta.sucursalPrincipal[0].telefono2 != null ? "-" + venta.sucursalPrincipal[0].telefono2 : "") +
					(venta.sucursalPrincipal[0].telefono3 != null ? "-" + venta.sucursalPrincipal[0].telefono3 : "");
				doc.text("TELF.: " + telefonoP, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
			}
			doc.text(venta.sucursal.nombre.toUpperCase(), { align: 'center' });
			doc.moveDown(0.4);
			doc.text(venta.sucursal.direccion.toUpperCase(), { align: 'center' });
			doc.moveDown(0.4);
			var telefono = (venta.sucursal.telefono1 != null ? venta.sucursal.telefono1 : "") +
				(venta.sucursal.telefono2 != null ? "-" + venta.sucursal.telefono2 : "") +
				(venta.sucursal.telefono3 != null ? "-" + venta.sucursal.telefono3 : "");
			doc.text("TELF.: " + telefono, { align: 'center' });
			doc.moveDown(0.4);
			doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
			doc.moveDown(0.5);
			doc.font('Helvetica-Bold', 8);
			var textFact = venta.factura ? venta.factura : "pendiente"
			doc.text("PROFORMA Nº " + textFact, { align: 'center' });
			doc.font('Helvetica', 7);
			doc.moveDown(0.4);
			doc.text("------------------------------------", { align: 'center' });
			doc.moveDown(0.3);
			doc.text("------------------------------------", { align: 'center' });
			doc.moveDown(0.4);
			doc.moveDown(0.6);
			doc.text("FECHA : " + venta.fechaTexto, { align: 'left' });
			doc.moveDown(0.4);
			var razon_social = venta.cliente ? venta.cliente.razon_social : "pendiente"
			doc.text("SEÑOR(ES) : " + razon_social, { align: 'left' });
			doc.moveDown(0.4);
			var nit = venta.cliente ? venta.cliente.nit : "pendiente";
			doc.text("NIT/CI : " + nit, { align: 'left' });
			doc.moveDown(0.4);
			doc.text("--------------------------------------------------------------------------------", { align: 'center' });
			doc.moveDown(0.2);
			doc.text("CANT       CONCEPTO                      P. UNIT.    SUBTOTAL", { align: 'left' });
			doc.moveDown(0.2);
			doc.text("--------------------------------------------------------------------------------", { align: 'center' });
			doc.moveDown(0.4);
			var y = doc.y, sumaDescuento = 0, sumaRecargo = 0, sumaIce = 0, sumaExcento = 0;
			for (var i = 0; i < venta.detallesVenta.length; i++) {
				doc.text(venta.detallesVenta[i].cantidad, 22, y);
				var promocion = venta.detallesVenta[i].producto.promocionActual ? Object.keys(venta.detallesVenta[i].producto.promocionActual).length > 0 ? venta.detallesVenta[i].producto.promocionActual : { nombre: "" } : venta.detallesVenta[i].promocionActual ? venta.detallesVenta[i].promocionActual : { nombre: "" }
				if ((venta.detallesVenta[i].producto.nombre.length + promocion.nombre.length) > 40) {
					doc.fontSize(6);
				}

				var nombrePromo = promocion.nombre ? promocion.nombre.length > 0 ? "(" + promocion.nombre + ")" : "" : ""
				doc.text(venta.detallesVenta[i].producto.nombre + nombrePromo, 35, y, { width: 100 });
				doc.fontSize(7);
				doc.text(venta.detallesVenta[i].precio_unitario.toFixed(2), 138, y, { width: 35, align: 'right' });
				doc.text(venta.detallesVenta[i].importe.toFixed(2), 175, y, { width: 35, align: 'right' });
				sumaDescuento = sumaDescuento + venta.detallesVenta[i].descuento;
				sumaRecargo = sumaRecargo + (venta.detallesVenta[i].tipo_recargo ? (venta.detallesVenta[i].importe * (venta.detallesVenta[i].recargo / 100)) : venta.detallesVenta[i].recargo);
				sumaIce = sumaIce + venta.detallesVenta[i].ice;
				sumaExcento = sumaExcento + venta.detallesVenta[i].excento;
				y = y + 18;
			}
			doc.text("-------------", 0, y, { width: 210, align: 'right' });
			//oc.text("--------------------",{align:'right'});
			doc.moveDown(0.4);
			doc.text("IMPORTE TOTAL Bs.         " + venta.importe.toFixed(2), { width: 210, align: 'right' });
			doc.moveDown(0.3);
			if (sumaDescuento > 0) {
				doc.text("DESCUENTO Bs.         " + sumaDescuento.toFixed(2), { width: 210, align: 'right' });
			}
			doc.moveDown(0.3);
			if (sumaRecargo > 0) {
				doc.text("RECARGO Bs.         " + sumaRecargo.toFixed(2), { width: 210, align: 'right' });
			}
			doc.moveDown(0.3);
			if (sumaIce > 0) {
				doc.text("ICE Bs.         " + sumaIce.toFixed(2), { width: 210, align: 'right' });
			}
			doc.moveDown(0.3);
			if (sumaExcento > 0) {
				doc.text("EXCENTO Bs.         " + sumaExcento.toFixed(2), { width: 210, align: 'right' });
			}
			doc.moveDown(0.3);
			doc.text("TOTAL Bs.         " + venta.total.toFixed(2), { width: 210, align: 'right' });
			doc.moveDown(0.4);
			doc.moveDown(0.4);
			doc.text("SON: " + venta.numero_literal, { width: 210, align: 'center' });
			doc.moveDown(0.6);

			doc.moveDown(0.4);

			doc.moveDown(0.4);
			doc.moveDown(0.4);
			doc.moveDown(0.4);

			var fechaActual = new Date();
			var min = fechaActual.getMinutes();
			if (min < 10) {
				min = "0" + min;
			}
			doc.text(venta.configuracion.nota_factura_nota_venta ? "Nota: " + venta.configuracion.nota_factura_nota_venta : "", { align: 'center' });
			doc.text("  Usuario : " + usuario.nombre_usuario + " -- Fecha : " + fechaActual.getDate() + "/" + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear() + "  " + fechaActual.getHours() + ":" + min + "  ", { align: 'center' });
			blockUI.stop();
		}
		return res;
	}])

	.factory('ImprimirNotaBaja', ['blockUI', 'Diccionario', 'ImprimirNotaBajaCartaOficio', 'ImprimirNotaBajaRollo',
		function (blockUI, Diccionario, ImprimirNotaBajaCartaOficio, ImprimirNotaBajaRollo) {
			var res = function (baja, usuario) {
				blockUI.start();
				var itemsPorPagina;
				if (baja.configuracion.tamanoPapelNotaBaja.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
					papel = [612, 936];
					itemsPorPagina = 23;
					ImprimirNotaBajaCartaOficio(baja, papel, itemsPorPagina, usuario);
				} else if (baja.configuracion.tamanoPapelNotaBaja.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
					papel = [612, 792];
					itemsPorPagina = 20;
					ImprimirNotaBajaCartaOficio(baja, papel, itemsPorPagina, usuario);
				} else if (baja.configuracion.tamanoPapelNotaBaja.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
					papel = [598, 600]; /*[612, 468];*/
					itemsPorPagina = 10;
					ImprimirNotaBajaCartaOficio(baja, papel, itemsPorPagina, usuario);
				} else if (baja.configuracion.tamanoPapelNotaBaja.nombre_corto == Diccionario.FACT_PAPEL_ROLLO) {
					var totalItems = baja.detallesVenta.length, totalobs = 0, alto = ((totalItems * 15) + 400);
					papel = [227, alto];
					ImprimirNotaBajaRollo(baja, papel, usuario);
				}
			}
			return res;
		}])

	.factory('ImprimirNotaBajaCartaOficio', ['blockUI', 'VerificarDescuentos', 'DibujarCabeceraPDFBaja',
		function (blockUI, VerificarDescuentos, DibujarCabeceraPDFBaja) {
			var res = function (baja, papel, itemsPorPagina, usuario) {

				var doc = new PDFDocument({ compress: false, size: papel, margin: 0 });
				var stream = doc.pipe(blobStream());
				var existencias = VerificarDescuentos(baja.detallesVenta);
				var existenDescuentos = existencias.descuento
				doc.font('Helvetica', 7);
				var totalAray = 0;
				var totalBaja = 0
				var y = 140, items = 0, pagina = 1, totalPaginas = Math.ceil(baja.detallesVenta.length / itemsPorPagina);
				DibujarCabeceraPDFBaja(doc, 1, totalPaginas, baja, existenDescuentos, usuario);
				for (var i = 0; i < baja.detallesVenta.length && items <= itemsPorPagina; i++) {
					if (existenDescuentos) {
						doc.text(baja.detallesVenta[i].producto.codigo, 55, y);
						doc.text(baja.detallesVenta[i].cantidad, 110);
						doc.text(baja.detallesVenta[i].producto.unidad_medida, 135, y);
						doc.text(baja.detallesVenta[i].producto.nombre, 170, y - 6, { width: 120 });
						doc.text(baja.detallesVenta[i].inventario.costo_unitario.toFixed(2), 300, y);
						doc.text(baja.detallesVenta[i].importe.toFixed(2), 335, y);
						doc.text(baja.detallesVenta[i].descuento.toFixed(2), 385, y);
						doc.text(baja.detallesVenta[i].recargo.toFixed(2), 420, y);
						doc.text(baja.detallesVenta[i].ice.toFixed(2), 455, y);
						doc.text(baja.detallesVenta[i].excento.toFixed(2), 490, y);
						doc.text(baja.detallesVenta[i].total.toFixed(2), 520, y);
					} else {
						doc.font('Helvetica', 6);
						doc.text(baja.detallesVenta[i].producto.codigo, 55, y, { width: 60 });
						doc.text(baja.detallesVenta[i].cantidad, 110, y, { width: 70 });
						doc.text(baja.detallesVenta[i].producto.unidad_medida, 140, y);

						var longitudCaracteres = baja.detallesVenta[i].producto.nombre.length;
						var yDesc = (longitudCaracteres <= 30) ? y : ((longitudCaracteres > 40 && longitudCaracteres <= 75) ? y : y - 7);
						if (usuario.empresa.usar_vencimientos) {
							doc.font('Helvetica', 6);
							doc.text(baja.detallesVenta[i].producto.nombre, 180, yDesc, { width: 160 });
							var fecha_vencimiento = new Date(baja.detallesVenta[i].inventario.fecha_vencimiento);
							doc.font('Helvetica', 7);

							if (baja.configuracion.tipoConfiguracionNotaBaja) {
								if (baja.configuracion.tipoConfiguracionNotaBaja.nombre_corto == "LOTE") {
									doc.text(fecha_vencimiento.getDate() + "/" + (fecha_vencimiento.getMonth() + 1) + "/" + fecha_vencimiento.getFullYear(), 360, y);
									doc.text(baja.detallesVenta[i].inventario.lote, 420, y, { width: 40 });
								} else {
									doc.text(baja.detallesVenta[i].observaciones ? baja.detallesVenta[i].observaciones : "", 350, y, { width: 70 });
									doc.text(baja.detallesVenta[i].inventario.lote, 420, y, { width: 40 });
								}
							}

						} else {
							doc.text(baja.detallesVenta[i].observaciones ? baja.detallesVenta[i].observaciones : "", 360, y, { width: 70 });
							doc.text(baja.detallesVenta[i].producto.nombre, 210, yDesc, { width: 250 });
						}
						doc.text((baja.detallesVenta[i].inventario.costo_unitario * 0.87).toFixed(2), 470, y);
						var totalDetalle = (baja.detallesVenta[i].inventario.costo_unitario * 0.87) * baja.detallesVenta[i].cantidad;
						totalBaja += totalDetalle
						doc.text(totalDetalle.toFixed(2), 520, y);
					}
					if (baja.configuracion.formatoPapelNotaBaja) {
						if (baja.configuracion.formatoPapelNotaBaja.nombre_corto == "FORM_C_MAR") {
							doc.rect(50, y - 15, 520, 30).stroke();
						}
					}

					y = y + 30;
					items++;

					if (items == itemsPorPagina) {
						totalAray = totalAray + items;
						if (totalAray != baja.detallesVenta.length) {
							var currentDate = new Date();
							baja.fecha = new Date(baja.fecha);
							doc.font('Helvetica', 5);
							doc.text("EMISIÓN: " + baja.fecha.getDate() + "/" + (baja.fecha.getMonth() + 1) + "/" + baja.fecha.getFullYear(), 200, y);
							doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 260, y);
							doc.text("USUARIO: " + usuario.persona.nombre_completo, 55, y);

							doc.text(pagina + " de " + totalPaginas, 540, y - 10);
							doc.addPage({ margin: 0, bufferPages: true });

							y = 140;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraPDFBaja(doc, 1, totalPaginas, baja, existenDescuentos, usuario);
						}
					}
				}
				doc.font('Helvetica-Bold', 7);
				doc.text("OBSERVACIÓN:", 55, y - 5, { width: 250 });
				doc.text(baja.observacion ? baja.observacion : "", 115, y - 5, { width: 250 });
				doc.text("TOTAL", 465, y - 5);
				doc.font('Helvetica', 7);
				doc.text(totalBaja.toFixed(2), 520, y - 5);
				doc.rect(50, y - 15, 520, 20).stroke();
				var currentDate = new Date();
				baja.fecha = new Date(baja.fecha);
				doc.font('Helvetica', 5);
				doc.text("EMISIÓN: " + baja.fecha.getDate() + "/" + (baja.fecha.getMonth() + 1) + "/" + baja.fecha.getFullYear(), 200, y + 10);
				doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 260, y + 10);
				doc.text("USUARIO: " + usuario.persona.nombre_completo, 55, y + 10);

				if (pagina > totalPaginas) {

				} else {
					doc.text(pagina + " de " + totalPaginas, 540, y + 10);
				}

				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}
			return res;
		}])

	.factory('DibujarCabeceraPDFBaja', [function () {
		var res = function (doc, pagina, totalPaginas, baja, existenDescuentos, usuario) {
			doc.font('Helvetica-Bold', 7);
			if (baja.configuracion.formatoColorNotaBaja.nombre_corto == "FORM_S_COL") {
				doc.rect(50, 40, 520, 60).stroke();
			} else {
				doc.rect(50, 40, 520, 60).fillAndStroke(baja.configuracion.color_cabecera_nota_baja, "black").fillColor('black').stroke();
			}
			doc.text(usuario.empresa.razon_social, 55, 55);
			doc.text("SUCURSAL: ", 55, 65);
			doc.text("DIRECCIÓN: ", 55, 75);

			var telefono = (baja.sucursal.telefono1 != null ? baja.sucursal.telefono1 : "") +
				(baja.sucursal.telefono2 != null ? "-" + baja.sucursal.telefono2 : "") +
				(baja.sucursal.telefono3 != null ? "-" + baja.sucursal.telefono3 : "");
			doc.text("TELF.: ", 55, 85);
			doc.font('Helvetica', 7);
			doc.text(baja.sucursal.nombre, 105, 65);
			doc.text(baja.sucursal.direccion, 105, 75);
			doc.text(telefono, 85, 85);
			doc.font('Helvetica-Bold', 15);
			doc.text("NOTA DE BAJA", 0, 65, { align: 'center' });
			doc.font('Helvetica-Bold', 7);
			baja.fecha = new Date(baja.fecha);
			doc.font('Helvetica', 11);
			doc.text("Fecha: " + baja.fecha.getDate() + "/" + (baja.fecha.getMonth() + 1) + "/" + baja.fecha.getFullYear(), 0, 85, { align: 'center' });
			doc.font('Helvetica-Bold', 7)
			doc.text("NRO. : " + baja.factura, 450, 75);
			///doc.rect(50, 40, 520, 60).stroke();

			//doc.rect(50, 100, 520, 25).stroke();
			if (baja.configuracion.formatoColorNotaBaja.nombre_corto == "FORM_S_COL") {
				doc.rect(50, 100, 520, 25).stroke();
			} else {
				doc.rect(50, 100, 520, 25).fillAndStroke(baja.configuracion.color_detalle_nota_baja, "black").fillColor('black').stroke();
			}
			if (existenDescuentos) {
				doc.text("CODIGO", 55, 110);
				doc.text("CANT.", 90, 110);
				doc.text("UNID.", 135, 110);
				doc.text("DETALLE", 170, 110);
				doc.text("C.UNIT.", 300, 110);
				doc.text("IMPORTE", 335, 110);
				doc.text("DESC.", 385, 110);
				doc.text("REC.", 420, 110);
				doc.text("ICE", 455, 110);
				doc.text("EXC.", 490, 110);
				doc.text("TOTAL", 520, 110);
			} else {
				doc.text("CODIGO", 55, 110);
				doc.text("CANTIDAD", 95, 110);
				doc.text("UNIDAD", 140, 110);

				if (usuario.empresa.usar_vencimientos) {
					doc.text("DETALLE", 180, 110);
					if (baja.configuracion.tipoConfiguracionNotaBaja) {
						if (baja.configuracion.tipoConfiguracionNotaBaja.nombre_corto == "LOTE") {
							doc.text("FECHA VENC.", 360, 110);
							doc.text("LOTE", 420, 110);
						} else {
							doc.text("OBSERVACIONES", 350, 110, { width: 70 });
							doc.text("SERIE", 420, 110);
						}
					}

				} else {
					doc.text("OBSERVACIONES", 360, 110, { width: 70 });
					doc.text("DETALLE", 210, 110);
				}

				doc.text("C.UNIT.", 470, 110);
				doc.text("TOTAL", 520, 110);
			}
		}
		return res;
	}])

	.factory('ImprimirNotaBajaRollo', ['blockUI', 'VerificarDescuentos',
		function (blockUI, VerificarDescuentos) {
			var res = function (baja, papel, usuario) {

				var doc = new PDFDocument({ compress: false, size: papel, margins: { top: 10, bottom: 10, left: 10, right: 20 } });
				var stream = doc.pipe(blobStream());
				var existencias = VerificarDescuentos(baja.detallesVenta);
				var existenDescuentos = existencias.descuento

				doc.moveDown(2);
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				doc.text(baja.sucursal.nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(baja.sucursal.direccion.toUpperCase(), { align: 'center' });
				var telefono = (baja.sucursal.telefono1 != null ? baja.sucursal.telefono1 : "") +
					(baja.sucursal.telefono2 != null ? "-" + baja.sucursal.telefono2 : "") +
					(baja.sucursal.telefono3 != null ? "-" + baja.sucursal.telefono3 : "");
				doc.moveDown(0.4);
				doc.text("TELF.: " + telefono, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				doc.text("NOTA DE BAJA", { align: 'center' });
				baja.fecha = new Date(baja.fecha);
				doc.font('Helvetica', 8);
				doc.text("Fecha: " + baja.fecha.getDate() + "/" + (baja.fecha.getMonth() + 1) + "/" + baja.fecha.getFullYear(), { align: 'center' });
				doc.font('Helvetica-Bold', 8);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				var y = 130;
				if (baja.observacion) {
					doc.text("Observación: " + (baja.observacion ? baja.observacion : ""), { align: 'center' });
					y += 20;
				}
				doc.font('Helvetica-Bold', 7);
				doc.moveDown(0.4);
				doc.text("CÓDIGO", 10, y + 4, { width: 40 });
				doc.text("CANT.", 50, y + 4, { width: 30, align: 'center' });
				doc.text("DETALLE", 80, y + 4, { width: 95, align: 'center' });
				doc.text("TOTAL", 175, y + 4, { width: 35, align: 'center' });
				y += 15
				var totalBaja = 0;
				for (var i = 0; i < baja.detallesVenta.length; i++) {
					doc.font('Helvetica', 7);
					doc.text(baja.detallesVenta[i].producto.codigo, 10, y, { width: 40 });
					doc.text(baja.detallesVenta[i].cantidad, 50, y, { width: 30 });
					doc.text(baja.detallesVenta[i].producto.nombre, 80, y, { width: 95 });
					var totalDetalle = (baja.detallesVenta[i].inventario.costo_unitario * 0.87) * baja.detallesVenta[i].cantidad;
					totalBaja += totalDetalle
					doc.text(totalDetalle.toFixed(2), 175, y, { width: 35, align: 'right' });
					y += 14;
				}
				doc.font('Helvetica-Bold', 7);
				doc.text('TOTAL', 75, y, { width: 90, align: 'right' });
				doc.text(totalBaja.toFixed(2), 175, y, { width: 35, align: 'right' });
				var currentDate = new Date();
				baja.fecha = new Date(baja.fecha);
				y += 25;
				doc.font('Helvetica', 6);
				doc.text("EMISIÓN: " + baja.fecha.getDate() + "/" + (baja.fecha.getMonth() + 1) + "/" + baja.fecha.getFullYear(), 10, y);
				doc.text("IMPRESO: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 76, y);
				doc.text("USUARIO: " + usuario.nombre_usuario, 142, y);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}
			return res;
		}])

	.factory('ImprimirNotaTraspaso', ['Diccionario', 'blockUI', 'ImprimirNotaTraspasoCartaOficio', 'ImprimirNotaTraspasoRollo',
		function (Diccionario, blockUI, ImprimirNotaTraspasoCartaOficio, ImprimirNotaTraspasoRollo) {
			var res = function (traspaso, usuario, mostrarMensaje) {
				blockUI.start();
				if (traspaso.configuracion.tipoConfiguracionNotaTraspaso == null) {
					mostrarMensaje("Configure la Nota de Traspaso en Configuraciones antes de continuar.");
					blockUI.stop();
				} else {
					if (traspaso.configuracion.tamanoPapelNotaTraspaso.nombre_corto == Diccionario.FACT_PAPEL_OFICIO) {
						papel = [612, 936];
						itemsPorPagina = 19;
						ImprimirNotaTraspasoCartaOficio(traspaso, papel, itemsPorPagina, usuario);
					} else if (traspaso.configuracion.tamanoPapelNotaTraspaso.nombre_corto == Diccionario.FACT_PAPEL_CARTA) {
						papel = [612, 792];
						itemsPorPagina = 16;
						ImprimirNotaTraspasoCartaOficio(traspaso, papel, itemsPorPagina, usuario, mostrarMensaje);
					} else if (traspaso.configuracion.tamanoPapelNotaTraspaso.nombre_corto == Diccionario.FACT_PAPEL_MEDIOOFICIO) {
						papel = [598, 600];
						itemsPorPagina = 5;
						ImprimirNotaTraspasoCartaOficio(traspaso, papel, itemsPorPagina, usuario);
					} else if (traspaso.configuracion.tamanoPapelNotaTraspaso.nombre_corto == Diccionario.FACT_PAPEL_ROLLO) {
						var alto, totalItems = traspaso.detallesVenta.length;
						if (totalItems <= 2) {
							alto = 440;
						} else {
							alto = 440 + (30 * (totalItems - 2))
						}
						papel = [227, alto];
						ImprimirNotaTraspasoRollo(traspaso, papel, usuario);
					}
				}
			}
			return res;
		}])

	.factory('ImprimirNotaTraspasoCartaOficio', ['blockUI', 'VerificarDescuentos', 'DibujarCabeceraPDFTraspaso',
		function (blockUI, VerificarDescuentos, DibujarCabeceraPDFTraspaso) {
			var res = function (traspaso, papel, itemsPorPagina, usuario) {
				var doc = new PDFDocument({ compress: false, layout: 'portrait', size: papel, margin: 0 });
				var stream = doc.pipe(blobStream());
				var existencias = VerificarDescuentos(traspaso.detallesVenta);
				var existenDescuentos = existencias.descuento
				doc.font('Helvetica', 8);
				var y = 150, items = 0, pagina = 1, totalPaginas = Math.ceil(traspaso.detallesVenta.length / itemsPorPagina);
				var longitudCaracteres;
				var yDesc, totalAray = 0;
				var totalTrasp = 0;
				DibujarCabeceraPDFTraspaso(doc, 1, totalPaginas, traspaso, existenDescuentos, usuario);
				for (var i = 0; i < traspaso.detallesVenta.length && items <= itemsPorPagina; i++) {
					if (existenDescuentos) {
						doc.font('Helvetica', 7);
						longitudCaracteres = traspaso.detallesVenta[i].producto.codigo.length;
						yDesc = (longitudCaracteres <= 15) ? y : ((longitudCaracteres > 15 && longitudCaracteres <= 15) ? y - 4 : y - 11);
						doc.text(traspaso.detallesVenta[i].producto.codigo, 63, yDesc, { width: 40 });
						doc.text(traspaso.detallesVenta[i].cantidad, 110, y);
						doc.text(traspaso.detallesVenta[i].producto.unidad_medida, 135, y);
						doc.text(traspaso.detallesVenta[i].producto.nombre, 170, y, { width: 130 });
						doc.text(traspaso.detallesVenta[i].precio_unitario.toFixed(2), 300, y);
						doc.text(traspaso.detallesVenta[i].importe.toFixed(2), 335, y);
						doc.text(traspaso.detallesVenta[i].descuento.toFixed(2), 385, y);
						doc.text(traspaso.detallesVenta[i].recargo.toFixed(2), 420, y);
						doc.text(traspaso.detallesVenta[i].ice.toFixed(2), 455, y);
						doc.text(traspaso.detallesVenta[i].excento.toFixed(2), 490, y);
						doc.text(traspaso.detallesVenta[i].total.toFixed(2), 520, y);
					} else {
						doc.font('Helvetica', 7);
						longitudCaracteres = traspaso.detallesVenta[i].producto.codigo.length;
						yDesc = (longitudCaracteres <= 15) ? y : ((longitudCaracteres > 15 && longitudCaracteres <= 15) ? y - 4 : y - 11);
						doc.font('Helvetica', 6);
						doc.text(traspaso.detallesVenta[i].producto.codigo, 63, yDesc, { width: 70 });
						doc.font('Helvetica', 7);
						doc.text(traspaso.detallesVenta[i].cantidad, 135, y);
						doc.text(traspaso.detallesVenta[i].producto.unidad_medida, 160, y);
						longitudCaracteres = traspaso.detallesVenta[i].producto.nombre.length;
						yDesc = (longitudCaracteres <= 25) ? y : ((longitudCaracteres > 25 && longitudCaracteres <= 40) ? y - 4 : y - 11);
						//if (usuario.empresa.usar_vencimientos) {
						doc.font('Helvetica', 6);
						doc.text(traspaso.detallesVenta[i].producto.nombre, 210, yDesc + 5, { width: 175 });
						doc.font('Helvetica', 7);

						if (traspaso.detallesVenta[i].id_inventario || traspaso.detallesVenta[i].inventario) {
							if (traspaso.con_vencimiento) {
								if (traspaso.configuracion.tipoConfiguracionNotaTraspaso.nombre_corto == "LOTE") {
									var fecha_vencimiento = new Date(traspaso.detallesVenta[i].fecha_vencimiento);
									doc.text(fecha_vencimiento.getDate() + "/" + (fecha_vencimiento.getMonth() + 1) + "/" + fecha_vencimiento.getFullYear(), 390, y);
									doc.text(traspaso.detallesVenta[i].lote, 455, y);

								} else {
									doc.text(traspaso.detallesVenta[i].lote, 455, y);
								}
							}
						}

						//} else {
						//	doc.text(traspaso.detallesVenta[i].producto.nombre, 210, yDesc, { width: 250 });
						//}
						doc.text((traspaso.detallesVenta[i].inventario.costo_unitario * 0.87).toFixed(2), 490, y);
						var totalDetalle = (traspaso.detallesVenta[i].inventario.costo_unitario * 0.87) * traspaso.detallesVenta[i].cantidad
						totalTrasp += totalDetalle
						doc.text(totalDetalle.toFixed(2), 530, y);
					}
					if (traspaso.configuracion.formatoPapelNotaTraspaso.nombre_corto == "FORM_C_MAR") {
						doc.rect(50, y - 15, 520, 30).stroke();
					}

					y = y + 30;
					items++;
					if (items == itemsPorPagina) {
						totalAray = totalAray + items;
						if (totalAray != traspaso.detallesVenta.length) {
							var currentDate = new Date();
							traspaso.fecha = new Date(traspaso.fecha);
							doc.font('Helvetica', 6);
							doc.text("EMISIÓN: " + traspaso.fecha.getDate() + "/" + (traspaso.fecha.getMonth() + 1) + "/" + traspaso.fecha.getFullYear(), 200, y - 10);
							doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 260, y - 10);
							doc.text("USUARIO: " + usuario.persona.nombre_completo, 55, y - 10);

							doc.text(pagina + " de " + totalPaginas, 540, y - 10);

							doc.addPage({ margin: 0, bufferPages: true });
							y = 140;
							items = 0;
							pagina = pagina + 1;
							DibujarCabeceraPDFTraspaso(doc, pagina, totalPaginas, traspaso, existenDescuentos, usuario);
							doc.font('Helvetica', 8);
						}
					}
				}
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTAL", 465, y - 5);
				doc.font('Helvetica', 8);
				doc.text(totalTrasp.toFixed(2), 520, y - 5);
				doc.rect(50, y - 15, 520, 20).stroke();
				doc.text("------------------------------------------", 180, y + 80);
				doc.text("------------------------------------------", 340, y + 80);
				doc.text("ENTREGA CONFORME", 190, y + 90);
				doc.text("RECIBO CONFORME", 350, y + 90);
				var currentDate = new Date();
				traspaso.fecha = new Date(traspaso.fecha);
				doc.font('Helvetica', 6);
				doc.text("EMISIÓN: " + traspaso.fecha.getDate() + "/" + (traspaso.fecha.getMonth() + 1) + "/" + traspaso.fecha.getFullYear(), 200, y + 10);
				doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 260, y + 10);
				doc.text("USUARIO: " + usuario.persona.nombre_completo, 55, y + 10);
				if (pagina > totalPaginas) {

				} else {
					doc.text(pagina + " de " + totalPaginas, 540, y + 10);
				}
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}
			return res;
		}])

	.factory('DibujarCabeceraPDFTraspaso', [function () {
		var res = function (doc, pagina, totalPaginas, traspaso, existenDescuentos, usuario) {
			//doc.rect(50, 40, 520, 70).stroke();
			if (traspaso.configuracion.formatoColorNotaTraspaso.nombre_corto == "FORM_S_COL") {
				doc.rect(50, 40, 520, 70).stroke();
			} else {
				doc.rect(50, 40, 520, 70).fillAndStroke(traspaso.configuracion.color_cabecera_nota_traspaso, "black").fillColor('black').stroke();
			}

			//doc.rect(50, 110, 520, 25).stroke();
			if (traspaso.configuracion.formatoColorNotaTraspaso.nombre_corto == "FORM_S_COL") {
				doc.rect(50, 110, 520, 25).stroke();
			} else {
				doc.rect(50, 110, 520, 25).fillAndStroke(traspaso.configuracion.color_detalle_nota_traspaso, "black").fillColor('black').stroke();
			}

			doc.font('Helvetica-Bold', 8);
			doc.text(usuario.empresa.razon_social, 50, 55, { width: 160, align: 'center' });
			doc.font('Helvetica-Bold', 7);

			var telefono = (traspaso.sucursal.telefono1 != null ? traspaso.sucursal.telefono1 : "") +
				(traspaso.sucursal.telefono2 != null ? "-" + traspaso.sucursal.telefono2 : "") +
				(traspaso.sucursal.telefono3 != null ? "-" + traspaso.sucursal.telefono3 : "");
			//doc.text("TELF.: ", 55, 95);
			doc.text(traspaso.sucursal.nombre, 50, 65, { width: 160, align: 'center' });
			doc.text(traspaso.sucursal.direccion, 50, 75, { width: 160, align: 'center' });
			doc.text('Telf. ' + usuario.empresa.telefono1, 50, 95, { width: 160, align: 'center' });
			doc.font('Helvetica-Bold', 15);
			doc.text("NOTA DE TRASPASO", 0, 60, { align: 'center' });
			doc.font('Helvetica-Bold', 8);
			doc.text("DE SUCURSAL: " + traspaso.sucursal.nombre + " A " + traspaso.sucursalDestino.nombre, 0, 78, { align: 'center' });
			doc.font('Helvetica-Bold', 7);
			doc.text("DE ALMACÉN " + traspaso.almacen.nombre + " A " + traspaso.almacenTraspaso.nombre, 0, 88, { align: 'center' });
			doc.font('Helvetica-Bold', 11);
			doc.text("N°: " + traspaso.factura, 500, 70);
			doc.font('Helvetica-Bold', 7);
			if (existenDescuentos) {
				doc.text("CODIGO", 55, 120);
				doc.text("CANT.", 105, 120);
				doc.text("UNID.", 135, 120);
				doc.text("DETALLE", 170, 120);
				doc.text("C.UNIT.", 300, 120);
				doc.text("IMPORTE", 335, 120);
				doc.text("DESC.", 385, 120);
				doc.text("REC.", 420, 120);
				doc.text("ICE", 455, 120);
				doc.text("EXC.", 490, 120);
				doc.text("TOTAL", 520, 120);
			} else {
				doc.text("CODIGO", 55, 120);
				doc.text("CANT.", 128, 120);
				doc.text("UNID.", 165, 120);
				//if (usuario.empresa.usar_vencimiento) {
				doc.text("DETALLE", 210, 120, { width: 110 });
				if (traspaso.con_vencimiento) {
					if (traspaso.configuracion.tipoConfiguracionNotaTraspaso.nombre_corto == "LOTE") {
						doc.text("FECHA VENC.", 380, 120);
						doc.text("LOTE", 450, 120);
					} else {
						doc.text("SERIE", 450, 120);
					}
				}
				//} else {
				//	doc.text("DETALLE", 190, 120, { width: 250 });
				//}
				doc.text("C.UNIT.", 490, 120);
				doc.text("TOTAL", 530, 120);
			}
		}
		return res;
	}])

	.factory('ImprimirNotaTraspasoRollo', ['blockUI', 'VerificarDescuentos',
		function (blockUI, VerificarDescuentos) {
			var res = function (traspaso, papel, usuario) {
				var doc = new PDFDocument({ compress: false, size: papel, margins: { top: 10, bottom: 10, left: 10, right: 20 } });
				var stream = doc.pipe(blobStream());
				var existencias = VerificarDescuentos(traspaso.detallesVenta);
				var existenDescuentos = existencias.descuento
				doc.moveDown(2);
				doc.font('Helvetica-Bold', 8);
				doc.text(usuario.empresa.razon_social.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 7);
				doc.text(traspaso.sucursal.nombre.toUpperCase(), { align: 'center' });
				doc.moveDown(0.4);
				doc.text(traspaso.sucursal.direccion.toUpperCase(), { align: 'center' });
				var telefono = (traspaso.sucursal.telefono1 != null ? traspaso.sucursal.telefono1 : "") +
					(traspaso.sucursal.telefono2 != null ? "-" + traspaso.sucursal.telefono2 : "") +
					(traspaso.sucursal.telefono3 != null ? "-" + traspaso.sucursal.telefono3 : "");
				doc.moveDown(0.4);
				doc.text("TELF.: " + telefono, { align: 'center' });
				doc.moveDown(0.4);
				doc.text("COCHABAMBA - BOLIVIA", { align: 'center' });
				doc.moveDown(0.5);
				doc.font('Helvetica-Bold', 8);
				doc.text("NOTA DE TRASPASO ", { align: 'center' });
				doc.text("DE SUCURSAL: " + traspaso.sucursal.nombre + " A " + traspaso.sucursalDestino.nombre, { align: 'center' });
				doc.font('Helvetica-Bold', 8);
				doc.moveDown(0.4);
				doc.text("------------------------------------", { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica-Bold', 7);
				var y = 160, items = 0;
				var longitudCaracteres;
				var yDesc;
				doc.moveDown(0.4);
				doc.text("COD.", 10, 145);
				doc.text("CANT.", 35, 145);
				doc.text("DETALL.", 60, 145);
				doc.text("F. VENC.", 128, 145);
				doc.text("LOTE", 162, 145);
				doc.text("TOTAL", 183, 145);
				doc.moveDown(0.4);
				var totalTrasp = 0
				for (var i = 0; i < traspaso.detallesVenta.length; i++) {
					doc.font('Helvetica', 7);
					longitudCaracteres = traspaso.detallesVenta[i].producto.codigo.length;
					yDesc = (longitudCaracteres <= 15) ? y : ((longitudCaracteres > 15 && longitudCaracteres <= 15) ? y - 4 : y - 11);
					doc.moveDown(0.4);
					doc.text(traspaso.detallesVenta[i].producto.codigo, 10, yDesc, { width: 25 });
					doc.text(traspaso.detallesVenta[i].cantidad, 38, y);
					doc.text(traspaso.detallesVenta[i].producto.nombre, 57, y, { width: 70 });
					if (traspaso.detallesVenta[i].id_inventario || traspaso.detallesVenta[i].inventario) {
						var fecha_vencimiento = new Date(traspaso.detallesVenta[i].fecha_vencimiento); console.log(new Date().getFullYear().toString().substr(-2));
						doc.text(fecha_vencimiento.getDate() + "/" + (fecha_vencimiento.getMonth() + 1) + "/" + fecha_vencimiento.getFullYear().toString().substr(-2), 128, y);
						doc.text(traspaso.detallesVenta[i].lote, 164, y);
					}
					var totalDetalle = (traspaso.detallesVenta[i].inventario.costo_unitario * 0.87) * traspaso.detallesVenta[i].cantidad
					totalTrasp += totalDetalle
					doc.text(totalDetalle.toFixed(2), 187, y, { width: 100 });
					y = y + 30;
					items++;
				}
				var currentDate = new Date();
				traspaso.fecha = new Date(traspaso.fecha);
				doc.font('Helvetica-Bold', 8);
				doc.x = 10;
				doc.text("   -----------------------------                 --------------------------", 0, y + 130, { align: 'center' });
				doc.text("   ENTREGUE CONFORME          RECIBI CONFORME", { align: 'center' });
				doc.moveDown(0.4);
				doc.font('Helvetica', 6);
				doc.text("EMISIÓN: " + traspaso.fecha.getDate() + "/" + (traspaso.fecha.getMonth() + 1) + "/" + traspaso.fecha.getFullYear(), 150, y + 190);
				doc.text("IMPRESIÓN: " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(), 15, y + 200);
				doc.text("USUARIO: " + usuario.persona.nombre_completo, 15, y + 190);
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();
			}
			return res;
		}])

	.factory('ImprimirPdfAlertaDespacho', ['blockUI', 'DibujarCabeceraPDFAlertaDespacho',
		function (blockUI, DibujarCabeceraPDFAlertaDespacho) {
			var res = function (despachos, filtro, usuario, convertirFecha) {
				blockUI.start();
				var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0;
				var y = 130, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(despachos.length / itemsPorPagina);
				DibujarCabeceraPDFAlertaDespacho(doc, 1, totalPaginas, despachos, filtro, usuario, convertirFecha);
				doc.font('Helvetica', 8);
				for (var i = 0; i < despachos.length && items <= itemsPorPagina; i++) {
					var detalle_despacho = despachos[i]
					/* doc.rect(30, y - 10, 555, 20).stroke(); */
					doc.text(i + 1, 45, y);
					doc.text(detalle_despacho.despacho.usuario.persona.nombre_completo, 70, y, { width: 100 });
					doc.text(detalle_despacho.despacho.cliente.razon_social, 190, y, { width: 100 });
					doc.text(detalle_despacho.producto.nombre, 300, y, { width: 110 });
					doc.text(detalle_despacho.cantidad, 420, y, { width: 50 });
					doc.text(detalle_despacho.cantidad_despacho, 460, y, { width: 50 });
					doc.text(detalle_despacho.cantidad - detalle_despacho.cantidad_despacho, 500, y, { width: 50 });
					doc.text("Bs. " + detalle_despacho.servicio_transporte + ".-", 545, y, { width: 80 });
					y = y + 25;
					items++;

					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						DibujarCabeceraPDFAlertaDespacho(doc, pagina, totalPaginas, despachos, filtro, usuario, convertirFecha);
						doc.font('Helvetica', 8);
					}
				}
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();

			}
			return res;
		}])
	.factory('ImprimirPdfDespachos', ['blockUI', 'DibujarCabeceraPDFDespacho',
		function (blockUI, DibujarCabeceraPDFDespacho) {
			var res = function (despachos, filtro, usuario) {
				blockUI.start();
				var doc = new PDFDocument({ compress: false, size: 'letter', margin: 10 });
				var stream = doc.pipe(blobStream());
				// draw some text
				var totalCosto = 0, totalTransporte = 0;
				var y = 130, itemsPorPagina = 24, items = 0, pagina = 1, totalPaginas = Math.ceil(despachos.length / itemsPorPagina);
				DibujarCabeceraPDFDespacho(doc, 1, totalPaginas, despachos, filtro, usuario);
				doc.font('Helvetica', 8);
				for (var i = 0; i < despachos.length && items <= itemsPorPagina; i++) {
					var detalle_despacho = despachos[i]
					/* doc.rect(30, y - 10, 555, 20).stroke(); */
					doc.text(i + 1, 45, y);
					doc.text(detalle_despacho.despacho.usuario.persona.nombre_completo, 70, y, { width: 100 });
					doc.text(detalle_despacho.despacho.cliente.razon_social, 190, y, { width: 100 });
					doc.text(detalle_despacho.producto.nombre, 320, y, { width: 110 });
					doc.text(detalle_despacho.cantidad, 440, y, { width: 50 });
					doc.text("Bs. " + detalle_despacho.servicio_transporte + ".-", 500, y, { width: 80 });
					y = y + 25;
					items++;

					if (items == itemsPorPagina) {
						doc.addPage({ margin: 0, bufferPages: true });
						y = 130;
						items = 0;
						pagina = pagina + 1;
						DibujarCabeceraPDFDespacho(doc, pagina, totalPaginas, despachos, filtro, usuario);
						doc.font('Helvetica', 8);
					}
					totalCosto += detalle_despacho.cantidad
					totalTransporte += detalle_despacho.servicio_transporte
				}
				doc.font('Helvetica-Bold', 8);
				doc.text("TOTALES:", 350, y, { width: 80 });
				doc.text(totalCosto, 440, y, { width: 80 });
				doc.text("Bs. " + totalTransporte + ".-", 500, y, { width: 80 });
				doc.end();
				stream.on('finish', function () {
					var fileURL = stream.toBlobURL('application/pdf');
					window.open(fileURL, '_blank', 'location=no');
				});
				blockUI.stop();

			}
			return res;
		}])

	.factory('ExportarExelAlarmasDespachos', ['blockUI',
		function (blockUI) {
			res = function (despachos, filtro, usuario) {
				var vendedor = "Todos"
				var cliente = "Todos"
				if (filtro.empleado != "") {
					vendedor = despachos[0].despacho.usuario.persona.nombre_completo
				}
				if (filtro.razon_social != "") {
					cliente = despachos[0].despacho.cliente.razon_social
				}
				var data = [["", "", "REPORTE DE PEDIDOS "], ["Vendedor :" + vendedor], ["Cliente :" + cliente], ["Nro", "Vendedor", "Cliente", "Direccion", "Razón social", "Fecha", "Producto", "Cant.", "Desp.", "Saldo", "S. Transp."]]
				var totalCosto = 0;
				for (var i = 0; i < despachos.length; i++) {
					var detalle_despacho = despachos[i]
					detalle_despacho.despacho.usuario.persona.nombre_completo
					var columns = [];
					columns.push(i + 1)
					columns.push(detalle_despacho.despacho.usuario.persona.nombre_completo)
					columns.push(detalle_despacho.despacho.cliente.razon_social)
					columns.push(detalle_despacho.despacho.destino.direccion)
					columns.push(detalle_despacho.despacho.cliente_razon ? detalle_despacho.despacho.cliente_razon.razon_social : "")
					var fecha = new Date(detalle_despacho.despacho.fecha)
					var dia = ((fecha.getDate()) >= 10) ? fecha.getDate() : "0" + fecha.getDate()
					var mes = ((fecha.getMonth()) >= 10) ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)
					columns.push(dia + "/" + mes + "/" + fecha.getFullYear())
					columns.push(detalle_despacho.producto.nombre)
					columns.push(detalle_despacho.cantidad)
					columns.push(detalle_despacho.cantidad_despacho)
					var desp = detalle_despacho.cantidad - detalle_despacho.cantidad_despacho
					columns.push(desp)
					columns.push(detalle_despacho.servicio_transporte)
					data.push(columns);
				}

				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-PEDIDOS.xlsx");
				blockUI.stop();

			}
			return res;
		}])
	.factory('ExportarExelDespachos', ['blockUI',
		function (blockUI) {
			res = function (despachos, filtro, usuario) {
				var vendedor = "Todos"
				var cliente = "Todos"
				/* if (filtro.empleado != "") {
					vendedor = despachos[0].despacho.usuario.persona.nombre_completo
				}
				if (filtro.razon_social != "") {
					cliente = despachos[0].despacho.cliente.razon_social
				} */
				var data = [["", "", "REPORTE DE DESPACHOS "]/*,  ["Vendedor :" +vendedor], ["Cliente :" + cliente] */, ["cod. dest", "Destino", "Direccion", "Cod Cliente", "Cliente", "cod dest.factura", "Razón social", "NIT", "Vendedor", "Nro. pedido", "F. Pedido", "Factura SAP", "fecha fact.", "No. Despacho", "fecha desp.", "Transportista", "Total Cobro", "Saldo", "Cod. prodcuto", "Producto", "cant. pedido", "cant. Despacho", "P/U", "Total", "Costo Transportista", "Grupo de Estibaje", "Tipo de Estibaje", "Costo Estibaje", "Precio Transporte", "Total Pedido"]]
				var totalCosto = 0;
				for (var i = 0; i < despachos.length; i++) {
					var detalle_despacho = despachos[i]
					var columns = [];
					columns.push(detalle_despacho.despacho.destino != undefined ? detalle_despacho.despacho.destino.codigo : "")
					columns.push(detalle_despacho.despacho.destino != undefined ? detalle_despacho.despacho.destino.destino : "Sin destino")
					columns.push(detalle_despacho.despacho.destino != undefined ? detalle_despacho.despacho.destino.direccion : "Sin direccion")
					columns.push(detalle_despacho.despacho.cliente.codigo)
					columns.push(detalle_despacho.despacho.cliente.razon_social)
					columns.push(detalle_despacho.despacho.cliente_razon != undefined ? detalle_despacho.despacho.cliente_razon.codigo_sap : "")
					columns.push(detalle_despacho.despacho.cliente_razon != undefined ? detalle_despacho.despacho.cliente_razon.razon_social : "")
					columns.push(detalle_despacho.despacho.cliente_razon != undefined ? detalle_despacho.despacho.cliente_razon.nit : "")
					columns.push(detalle_despacho.despacho.usuario.persona.nombre_completo)
					var fecha = new Date(detalle_despacho.despacho.fecha)
					var dia = ((fecha.getDate()) >= 10) ? fecha.getDate() : "0" + fecha.getDate()
					var mes = ((fecha.getMonth()) >= 10) ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)
					columns.push(detalle_despacho.despacho.id)
					columns.push(new Date(detalle_despacho.despacho.fecha))


					columns.push(detalle_despacho.factura)
					columns.push(new Date(detalle_despacho.fecha_factura))
					columns.push(detalle_despacho.numero_correlativo)
					var fechaPedido = new Date(detalle_despacho.fecha)
					var dia2 = ((fechaPedido.getDate()) >= 10) ? fechaPedido.getDate() : "0" + fechaPedido.getDate()
					var mes2 = ((fechaPedido.getMonth() + 1) >= 10) ? (fechaPedido.getMonth() + 1) : "0" + (fechaPedido.getMonth() + 1)
					columns.push(new Date(detalle_despacho.fecha))
					columns.push(detalle_despacho.transportista.persona.nombre_completo)
					columns.push(detalle_despacho.pago_ac)
					columns.push(detalle_despacho.saldo_pago_ac)
					columns.push(detalle_despacho.producto.codigo)
					columns.push(detalle_despacho.producto.nombre)
					columns.push(detalle_despacho.cantidad)
					columns.push(detalle_despacho.cantidad_despacho)
					columns.push(detalle_despacho.precio_unitario)
					var total = detalle_despacho.precio_unitario * detalle_despacho.cantidad_despacho
					columns.push(total)

					var costo = detalle_despacho.transportista.costo_transporte * detalle_despacho.cantidad_despacho
					columns.push(costo)
					columns.push(detalle_despacho.grupo_estibaje.nombre)
					columns.push(detalle_despacho.estibaje.nombre)
					var costoEstibaje = detalle_despacho.estibaje.costo * detalle_despacho.cantidad_despacho
					columns.push(costoEstibaje)
					columns.push(detalle_despacho.servicio_transporte)
					var TotalPedido = detalle_despacho.servicio_transporte + total
					columns.push(TotalPedido)

					columns.push(detalle_despacho.despacho.cliente_razon != undefined ? detalle_despacho.despacho.cliente_razon.codigo_sap : "")
					data.push(columns);
				}
				var ws_name = "SheetJS";
				var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

				wb.SheetNames.push(ws_name);
				wb.Sheets[ws_name] = ws;
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
				saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-DESPACHOS.xlsx");
				blockUI.stop();

			}
			return res;
		}])
	.factory('DibujarCabeceraPDFAlertaDespacho', [function () {
		res = function (doc, pagina, totalPaginas, despachos, filtro2, usuario, convertirFecha) {
			var filtro = { inicio: filtro2.inicio, fin: filtro2.fin }
			doc.font('Helvetica-Bold', 12);
			doc.text("REPORTE DE PEDIDOS", 0, 25, { align: "center" });
			doc.font('Helvetica', 12);
			if (filtro.inicio && filtro.fin) {
				filtro.inicio = new Date(convertirFecha(filtro.inicio))
				filtro.fin = new Date(convertirFecha(filtro.fin))
				var mes = ((filtro.inicio.getMonth() + 1) < 10) ? "0" + (filtro.inicio.getMonth() + 1) : (filtro.inicio.getMonth() + 1);
				var dia = ((filtro.inicio.getDate()) < 10) ? "0" + filtro.inicio.getDate() : filtro.inicio.getDate();
				var mes2 = ((filtro.fin.getMonth() + 1) < 10) ? "0" + (filtro.fin.getMonth() + 1) : (filtro.fin.getMonth() + 1);
				var dia2 = ((filtro.fin.getDate()) < 10) ? "0" + filtro.fin.getDate() : filtro.fin.getDate();
				doc.text(dia + "/" + mes + "/" + filtro.inicio.getFullYear() + " AL " + dia2 + "/" + mes2 + "/" + filtro.fin.getFullYear(), 0, 45, { align: "center" });
			}

			doc.font('Helvetica-Bold', 8);
			doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
			/* doc.rect(30, 70, 555, 30).stroke(); */
			var vendedor = "Todos"
			var cliente = "Todos"
			if (filtro.empleado != "") {
				vendedor = despachos[0].despacho.usuario.persona.nombre_completo
			}
			if (filtro.razon_social != "") {
				cliente = despachos[0].despacho.cliente.razon_social
			}
			doc.font('Helvetica-Bold', 8);
			doc.text("Vendedor : " + vendedor, 45, 80);
			doc.text("Cliente : " + cliente, 245, 80);
			doc.font('Helvetica', 8);
			//doc.text(despachos.razon_social, 140, 60);
			/* doc.rect(30, 100, 555, 30).stroke(); */
			doc.font('Helvetica-Bold', 8);
			doc.text("Nro.", 45, 110);
			doc.text("Vendedor", 80, 110, { width: 50 });
			doc.text("Cliente", 200, 110, { width: 60 });
			doc.text("Producto", 300, 110, { width: 50 });
			doc.text("Cant.", 420, 110, { width: 50 });
			doc.text("desp.", 460, 110, { width: 50 });
			doc.text("saldo", 500, 110, { width: 50 });
			doc.text("S. Transp.", 545, 110, { width: 80 });
			doc.font('Helvetica', 8);
			var currentDate = new Date();
			doc.text("USUARIO: " + usuario.persona.nombre_completo + " fecha " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "Hrs." + currentDate.getHours() + ":" + currentDate.getMinutes(), 15, 765);

		}
		return res;
	}])
	.factory('DibujarCabeceraPDFDespacho', [function () {
		res = function (doc, pagina, totalPaginas, despachos, filtro, usuario) {
			doc.font('Helvetica-Bold', 12);
			doc.text("REPORTE DE PEDIDOS", 0, 25, { align: "center" });
			doc.font('Helvetica', 12);
			if (filtro.inicio && filtro.fin) {
				var mes = ((filtro.inicio.getMonth() + 1) < 10) ? "0" + (filtro.inicio.getMonth() + 1) : (filtro.inicio.getMonth() + 1);
				var dia = ((filtro.inicio.getDate()) < 10) ? "0" + filtro.inicio.getDate() : filtro.inicio.getDate();
				var mes2 = ((filtro.fin.getMonth() + 1) < 10) ? "0" + (filtro.fin.getMonth() + 1) : (filtro.fin.getMonth() + 1);
				var dia2 = ((filtro.fin.getDate()) < 10) ? "0" + filtro.fin.getDate() : filtro.fin.getDate();

				doc.text(dia + "/" + mes + "/" + filtro.inicio.getFullYear() + " AL " + dia2 + "/" + mes2 + "/" + filtro.fin.getFullYear(), 0, 45, { align: "center" });
			}
			doc.font('Helvetica-Bold', 8);
			doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
			/* doc.rect(30, 70, 555, 30).stroke(); */
			var vendedor = "Todos"
			var cliente = "Todos"
			/* 	if (filtro.empleado != "") {
					vendedor = despachos[0].despacho.usuario.persona.nombre_completo
				}
				if (filtro.razon_social != "") {
					cliente = despachos[0].despacho.cliente.razon_social
				} */
			doc.font('Helvetica-Bold', 8);
			doc.text("Vendedor : " + vendedor, 45, 80);
			doc.text("Cliente : " + cliente, 245, 80);
			doc.font('Helvetica', 8);
			//doc.text(despachos.razon_social, 140, 60);
			/* doc.rect(30, 100, 555, 30).stroke(); */
			doc.font('Helvetica-Bold', 8);
			doc.text("Nro.", 45, 110);
			doc.text("Vendedor", 80, 110, { width: 50 });
			doc.text("Cliente", 200, 110, { width: 60 });
			doc.text("Producto", 320, 110, { width: 50 });
			doc.text("Cant.", 440, 110, { width: 50 });
			doc.text("S. Transp.", 500, 110, { width: 80 });
			doc.font('Helvetica', 8);
			var currentDate = new Date();
			doc.text("USUARIO: " + usuario.persona.nombre_completo + " fecha " + currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + "Hrs." + currentDate.getHours() + ":" + currentDate.getMinutes(), 15, 765);

		}
		return res;
	}])
