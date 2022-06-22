angular.module('agil.controladores')

	.controller('ControladorEmpresas', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'ClasesTipo', 'Clases', 'Empresa', 'Empresas', 'ListaAplicacionesSistema', 'ListaOpcionesIntegracionAplicacion',
	'GuardarCorrelativosEmpresa','ObtenerCorrelativosEmpresa','ObtenerConfiguracionesIsoEmpresa','ModificarEstadoISOEmpresa','GuardarConfiguracionIsoEmpresa','ClasesTipoEmpresa','SweetAlert', 'DatosSaldosNegativosEmpresa', 'ObtenerEmpresaSFE','ListaCatalogosEmpresa','ListaXcatalogosEmpresa','saveCalalogos', 'GuardarFirmaEmpresa', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, ClasesTipo, Clases, Empresa, Empresas, ListaAplicacionesSistema, ListaOpcionesIntegracionAplicacion,
		GuardarCorrelativosEmpresa,ObtenerCorrelativosEmpresa,ObtenerConfiguracionesIsoEmpresa,ModificarEstadoISOEmpresa,GuardarConfiguracionIsoEmpresa,ClasesTipoEmpresa,SweetAlert, DatosSaldosNegativosEmpresa, ObtenerEmpresaSFE, ListaCatalogosEmpresa, ListaXcatalogosEmpresa, saveCalalogos, GuardarFirmaEmpresa) {
		blockUI.start();

		$scope.idModalWizardEmpresaEdicion = 'modal-wizard-empresa';
		$scope.idModalWizardEmpresaVista = 'modal-wizard-empresa-vista';
		$scope.idModalEliminarEmpresa = 'dialog-eliminar-empresa';
		$scope.idModalContenedorEmpresaEdicion = 'modal-wizard-container-empresa-edicion';
		$scope.idModalContenedorEmpresaVista = 'modal-wizard-container-empresa-vista';
		$scope.idImagenEmpresa = 'imagen-empresa';
		$scope.idModalCorrelativoEmpresa = 'dialog-correlativos-empresa';
		$scope.idModalConfiguracionIso = 'dialog-configuracion-iso';
		$scope.idModalReporteItems = 'dialog-reporte-items'
		$scope.idModalSistFactElectronicaWeb = 'modal-config-sistema-facturacion-elect-web'
		$scope.idModalEmpresaConfigSFE = 'modal-empresa-config-sfe'

		$scope.usuario = JSON.parse($localStorage.usuario);

		$scope.inicio = function () {
			$scope.obtenerEmpresas($scope.usuario.id_empresa);
			$scope.obtenerAplicaciones()
			if ($scope.usuario.id_empresa) {
				$scope.obtenerTiposDocumentosIso()
			}
			setTimeout(function () {
				ejecutarScriptsTabla('tabla-empresas', 12);
			}, 2000);
			$scope.dynamicPopoverIntegracion = {
				templateUrl: 'integracionTemplate.html',
			};
			$scope.obtenerListaOpcionesIntegracionAplicacion()
		}

		$scope.$on('$viewContentLoaded', function () {
			resaltarPestaña($location.path().substring(1));
			ejecutarScriptsEmpresa($scope.idModalWizardEmpresaEdicion,
				$scope.idImagenEmpresa,
				$scope.idModalContenedorEmpresaEdicion,
				$scope.idModalWizardEmpresaVista,
				$scope.idModalContenedorEmpresaVista,
				$scope.idModalEliminarEmpresa,
				$scope.idModalCorrelativoEmpresa,
				$scope.idModalConfiguracionIso,
				$scope.idModalReporteItems,
				$scope.idModalSistFactElectronicaWeb,
				$scope.idModalEmpresaConfigSFE
			);
			$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
			blockUI.stop();
			var promesa = ClasesTipo("DEP");
			promesa.then(function (entidad) {
				$scope.departamentos = entidad.clases;
			});
		});
		$scope.obtenerTiposDocumentosIso = function () {
			blockUI.start();
			var promesa = ClasesTipoEmpresa("TIPDOCISOEMP", $scope.usuario.id_empresa);
			promesa.then(function (entidad) {
				$scope.tiposDocumentosIso = entidad
				blockUI.stop();
			});
		}
		$scope.crearNuevaEmpresa = function () {
			$scope.esNuevo = true;
			$scope.empresa = new Empresa({ sucursal: {}, imagen: "img/icon-user-default.png", aplicaciones: [], integraciones: $scope.listaIntegracionesAplicacion });
			$scope.abrirPopup($scope.idModalWizardEmpresaEdicion);
		}

		$scope.cerrarPopPupNuevaEmpresa = function () {
			$scope.cerrarPopup($scope.idModalWizardEmpresaEdicion);
		}

		$scope.verEmpresa = function (empresa) {
			$scope.empresa = empresa;
			$scope.abrirPopup($scope.idModalWizardEmpresaVista);
		}

		$scope.cerrarPopPupVista = function () {
			$scope.cerrarPopup($scope.idModalWizardEmpresaVista);
		}

		$scope.cerrarPopPupEdicion = function () {
			$scope.cerrarPopup($scope.idModalWizardEmpresaEdicion);
		}

		$scope.modificarEmpresa = function (empresa) {
			empresa.aplicaciones = []
			$scope.esNuevo = false;
			$scope.empresa = empresa;
			$scope.empresa.rolUsuario = $scope.usuario.rolesUsuario[0].rol.nombre
			if ($scope.empresa.integraciones.length === 0) {
				$scope.empresa.integraciones = $scope.listaIntegracionesAplicacion
			}
			if (empresa.departamento) {
				$scope.buscarMunicipios(empresa.id_departamento + '-' + empresa.departamento.nombre_corto);
			}
			$scope.seleccionarAplicaciones(empresa.aplicacionesEmpresa)
			if ($scope.empresa.usar_facturacion_electronica) {
				var promesa = ObtenerEmpresaSFE($scope.empresa.id);
				promesa.then(function (data) {
					if (data.empresaGet) {
						$scope.empresa.facturacionConfigEmpresa = data.empresaGet
						$('#id-firmadigital').ace_file_input('reset_input_ui');
						if ($scope.empresa.facturacionConfigEmpresa.firmaDigital) {
							$('#id-firmadigital').ace_file_input('show_file_list', [$scope.empresa.facturacionConfigEmpresa.firmaDigital]);
						}
					}
				}).catch(function (err) {
                    var men = (err.data !== undefined && err.data !== null) ? err.data.message : err.message
                    SweetAlert.swal("", 'Se produjo un error! > ' + men, "warning");
                })
			}
			
			$scope.abrirPopup($scope.idModalWizardEmpresaEdicion);
		}

		$scope.mostrarConfirmacionEliminacion = function (empresa) {
			$scope.empresa = new Empresa(empresa);
			$scope.abrirPopup($scope.idModalEliminarEmpresa);
		}

		$scope.cerrarConfirmacionEliminacion = function () {
			$scope.cerrarPopup($scope.idModalEliminarEmpresa);
		};

		$scope.eliminarEmpresa = function (empresa) {
			blockUI.start();
			$scope.cerrarConfirmacionEliminacion();
			empresa.$delete();
			$scope.mostrarMensaje('Eliminado exitosamente!');
			$scope.recargarItemsTabla();
			blockUI.stop();
		}

		$scope.buscarMunicipios = function (idDepartamento) {
			var nombre_corto = idDepartamento.split('-')[1];
			var promesa = Clases(nombre_corto + "M");
			promesa.then(function (entidades) {
				$scope.municipios = entidades;
			});
		}

		$scope.saveForm = function (empresa) {
			var button = $('#modal-wizard-empresa').find('button[type=submit]').text().trim();
			if (button != "Siguiente") {
				// blockUI.start();
				var imagenEmpresa = empresa.imagen;
				if (typeof empresa.id_departamento == "string") {
					empresa.id_departamento = empresa.id_departamento.split('-')[0];
				}
				if ($scope.esNuevo && typeof empresa.sucursal.id_departamento == "string") {
					empresa.sucursal.id_departamento = empresa.sucursal.id_departamento.split('-')[0];
				}
				if (empresa.id) {
					if (empresa.usar_facturacion_electronica) {
						SweetAlert.swal({
							title: 'Actualizado datos de la empresa...',
							icon: 'info',
							text: 'Este puede tardar unos minutos por favor espere!',
							iconHtml: '<i class="fa fa-search size-icon"></i>',
							allowEscapeKey: false,
							allowOutsideClick: false
						})
					}
					SweetAlert.showLoading()
					var f = document.getElementById("id-firmadigital").files[0],
                        r = new FileReader();

                    if (f && empresa.usar_facturacion_electronica) {
                        r.onloadend = function (e) {
                            empresa.facturacionConfigEmpresa.docFirma = { name: "", data: null }
                            empresa.facturacionConfigEmpresa.docFirma.name = empresa.facturacionConfigEmpresa.firmaDigital[0].name
                            empresa.facturacionConfigEmpresa.docFirma.data = f;
							$scope.actualizarEmpresa(empresa)
							
                        }
                        r.readAsBinaryString(f);
                    }else{
						$scope.actualizarEmpresa(empresa);
					}
					
				} else {
					SweetAlert.swal({
						title: 'Guardando la empresa...',
						icon: 'info',
						text: 'Este puede tardar unos minutos por favor espere!',
						iconHtml: '<i class="fa fa-search size-icon"></i>',
						allowEscapeKey: false,
						allowOutsideClick: false
					})
					SweetAlert.showLoading()
					var f = document.getElementById("id-firmadigital").files[0],
                        r = new FileReader();

                    if (f && empresa.usar_facturacion_electronica) {
                        r.onloadend = function (e) {
                            empresa.facturacionConfigEmpresa.docFirma = { name: "", data: null }
                            empresa.facturacionConfigEmpresa.docFirma.name = empresa.facturacionConfigEmpresa.firmaDigital[0].name
                            empresa.facturacionConfigEmpresa.docFirma.data = f;
							$scope.guardarEmpresa(empresa);
                        }
                        r.readAsBinaryString(f);
                    }else{
						$scope.guardarEmpresa(empresa);
					}
				}
			}
		}

		$scope.actualizarEmpresa = function(empresa){
			blockUI.noOpen = true;
			Empresa.update({ idEmpresa: empresa.id }, empresa, function (res) {
				if (res.signedRequest == null) {
					$scope.cerrarPopPupNuevaEmpresa();
					blockUI.noOpen = true;
					$scope.recargarItemsTabla();
					if (empresa.usar_facturacion_electronica) {
						// if (!res.mensaje.includes('CUIS')) {
						// 	SweetAlert.swal("La empresa se actualizo!", res.mensaje, "warning")
						// }else{
						// 	SweetAlert.swal("",'Actualizado Exitosamente!',"success");
						// }
						blockUI.noOpen = true;
						GuardarFirmaEmpresa.update(empresa.id, empresa.facturacionConfigEmpresa.docFirma).then(function (result) {
							SweetAlert.swal("",'Actualizado Exitosamente!',"success");
						}).catch(function (error) {
							SweetAlert.swal("",'Actualizado Exitosamente!',"success");
						})
							
						
					}else{
						SweetAlert.swal("",'Actualizado Exitosamente!',"success");
					}
				} else {
					var xhr = new XMLHttpRequest();
					xhr.open('PUT', res.signedRequest);
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								blockUI.stop();
								$scope.cerrarPopPupNuevaEmpresa();
								$scope.mostrarMensaje('Actualizado Exitosamente!');
								$scope.recargarItemsTabla();
							}
							else {
								alert('Could not upload file.');
							}
						}
					};

					var binary = atob(imagenEmpresa.split(',')[1]);
					var data = [];
					for (var i = 0; i < binary.length; i++) {
						data.push(binary.charCodeAt(i));
					}
					var blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
					var file = new File([blob], res.image_name, { type: "image/jpeg" });
					console.log(file);
					xhr.send(file);
				}
			});
		}
		$scope.guardarEmpresa = function(empresa) {
			var usar_facturacion_electronica = empresa.usar_facturacion_electronica
			if (usar_facturacion_electronica) {
				var docFirma = empresa.facturacionConfigEmpresa.docFirma
			}
			
			blockUI.noOpen = true;
			empresa.$save(function (res) {
				if (res.signedRequest == null) {
					// blockUI.stop();
					$scope.empresa = new Empresa({ sucursal: {}, imagen: "img/icon-user-default.png" });
					$scope.cerrarPopPupNuevaEmpresa();
					blockUI.noOpen = true;
					$scope.recargarItemsTabla();
					if (usar_facturacion_electronica && res.empresa) {
						blockUI.noOpen = true;
						GuardarFirmaEmpresa.update(empresa.id, docFirma).then(function (result) {
							SweetAlert.swal("",'Actualizado Exitosamente!',"success");
						}).catch(function (error) {
							SweetAlert.swal("",'Actualizado Exitosamente!',"success");
						})
					}else{
						SweetAlert.swal("",'Guardado Exitosamente!',"success");
					}
				} else {
					var xhr = new XMLHttpRequest();
					xhr.open('PUT', res.signedRequest);
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								blockUI.stop();
								$scope.empresa = new Empresa({ sucursal: {}, imagen: "img/icon-user-default.png" });
								$scope.cerrarPopPupNuevaEmpresa();
								$scope.mostrarMensaje('Guardado Exitosamente!');
								$scope.recargarItemsTabla();
							}
							else {
								alert('Could not upload file.');
							}
						}
					};

					var binary = atob(imagenEmpresa.split(',')[1]);
					var data = [];
					for (var i = 0; i < binary.length; i++) {
						data.push(binary.charCodeAt(i));
					}
					var blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
					var file = new File([blob], res.image_name, { type: "image/jpeg" });
					xhr.send(file);
				}
			}, function (error) {
				blockUI.stop();
				$scope.cerrarPopPupNuevaEmpresa();
				$scope.mostrarMensaje('Ocurrio un problema al momento de guardar!');
				$scope.recargarItemsTabla();
			});
		}

		$scope.obtenerEmpresas = function (idEmpresa) {
			blockUI.start();
			if (idEmpresa == null) {
				idEmpresa = 0;
			}
			var promesa = Empresas(idEmpresa);
			promesa.then(function (empresas) {
				$scope.empresas = empresas;
				blockUI.stop();
			});
		}
		$scope.obtenerAplicaciones = function () {
			var tapp = ''
			if ($scope.usuario.empresa) {
				var listapp = $scope.usuario.empresa.aplicacionesEmpresa.map(function (app) {
					return app.id_aplicacion
				})
				var tapp = listapp.join(',')
			}
			var promesa = ListaAplicacionesSistema(tapp)
			promesa.then(function (datos) {
				$scope.llenarAplicaciones(datos)
			})
		}
		$scope.llenarAplicaciones = function (aplicaciones) {
			$scope.aplicacionesSistema = [];
			for (var i = 0; i < aplicaciones.length; i++) {
				var aplicacion = {
					name: aplicaciones[i].titulo,
					maker: "",
					ticked: false,
					id: aplicaciones[i].id
				}
				$scope.aplicacionesSistema.push(aplicacion);
			}
		}
		$scope.seleccionarAplicaciones = function (aplicacionesEmpresa) {
			for (var i = 0; i < $scope.aplicacionesSistema.length; i++) {
				for (var j = 0; j < aplicacionesEmpresa.length; j++) {
					if ($scope.aplicacionesSistema[i].id == aplicacionesEmpresa[j].id_aplicacion) {
						$scope.aplicacionesSistema[i].ticked = true;
					}
				}
			}
		}
		$scope.obtenerListaOpcionesIntegracionAplicacion = function (entidad) {
			var promesa = ListaOpcionesIntegracionAplicacion()
			promesa.then(function (dato) {
				if (entidad) {
					if ($scope.empresa.integraciones) {
						for (const antiguo of $scope.empresa.integraciones) {
							for (const nuevo of dato) {
								if (antiguo.id === nuevo.id) {
									nuevo.usar_integracion = antiguo.usar_integracion
								}
							}
						}
						$scope.empresa.integraciones = dato
					}

				}
				$scope.listaIntegracionesAplicacion = dato
			})
		}
		$scope.abrirModalCorrelativoEmpresa = function (empresa) {
			$scope.empresa = empresa;
			$scope.correlativos={}
			$scope.obtenerCorrelativosEmpesa()
			$scope.abrirPopup($scope.idModalCorrelativoEmpresa);
		}

		$scope.cerrarModalCorrelativoEmpresa = function () {
			$scope.cerrarPopup($scope.idModalCorrelativoEmpresa);
		};
		$scope.obtenerCorrelativosEmpesa = function () {
			let promesa = ObtenerCorrelativosEmpresa($scope.empresa.id)
			promesa.then(function (res) {
				$scope.correlativos = res.correlativos
			})
		}
		$scope.guardarCorrelativosEmpresa = function () {
			let promesa = GuardarCorrelativosEmpresa($scope.empresa.id,$scope.correlativos)
			promesa.then(function (res) {
				$scope.mostrarMensaje(res.mensaje)
				$scope.cerrarModalCorrelativoEmpresa()
			})
		}
		//inicio iso config
		$scope.abrirModalConfiguracionIso = async function (empresa) {
			$scope.empresa = empresa;
			$scope.configuracionesIso = await $scope.obtenerConfiguracionesIsoEmpresa()
			$scope.configuracionIso = { edit: false }
			$scope.errorConfiguracioniso=undefined
			$scope.abrirPopup($scope.idModalConfiguracionIso);
			$scope.$evalAsync()
		}
		$scope.obtenerConfiguracionesIsoEmpresa =async  function () {
			var data = await ObtenerConfiguracionesIsoEmpresa($scope.usuario.id_empresa)
			return data.configuracionesIso
		}
		$scope.modificarEstadosISO = function(configuracion, index){
			let versAnteriores = []
			if(configuracion.activo == true) {
				 versAnteriores = $scope.configuracionesIso.filter((val, i) => val.activo == true && i != index && val.tipoDocumento.id == configuracion.tipoDocumento.id);
				 
			}
			if(!configuracion.activo) configuracion.predefinido = false;
			if(versAnteriores.length === 0){
				var promesa = ModificarEstadoISOEmpresa (configuracion);
				promesa.then(a => {
					SweetAlert.swal("Guardado!", 'Actualizado correctamente', "success");
				})
				promesa.catch(e => {
					SweetAlert.swal("Error!", 'Error al actualizar', "warning");
				})
			}else{
				SweetAlert.swal("Error!", 'Debe inactivar la versión anterior del tipo Doc', "warning");
				$scope.configuracionesIso[index].activo = false
			}
		}
		$scope.cerrarModalConfiguracionIso = function () {
			$scope.cerrarPopup($scope.idModalConfiguracionIso);
		};
		$scope.cerrarModalMantenimiento = function () {
			$scope.cerrarPopup($scope.idModalMantenimiento);
		};
		$scope.agregarConfiguracionIso = function () {
			if ($scope.configuracionIso.edit) {
				$scope.configuracionIso.fecha_aprobacion=new Date($scope.convertirFecha($scope.configuracionIso.fecha_aprobacion_iso))
				$scope.configuracionIso = { edit: false }
				$scope.errorConfiguracioniso=undefined
			} else {
				$scope.configuracionIso.fecha_aprobacion=new Date($scope.convertirFecha($scope.configuracionIso.fecha_aprobacion_iso))
				$scope.configuracionesIso.push($scope.configuracionIso)
				$scope.configuracionIso = { edit: false }
			}
		}
		$scope.modificarConfiguracionIso = function (configuracion) {
			$scope.configuracionIso = configuracion
			$scope.configuracionIso.fecha_aprobacion_iso=$scope.fechaATexto($scope.configuracionIso.fecha_aprobacion)
			$scope.configuracionIso.edit = true
		}
		$scope.eliminarConfiguracionIso = function (configuracion) {
			if (configuracion.id) {
				configuracion.eliminado = true
			} else {
				$scope.configuracionesIso.splice($scope.configuracionesIso.indexOf(configuracion), 1);
			}
		}
		$scope.guardarConfiguracionIso = function () {
			// verificar que no hayan tipos de documentos activos duplicados
			 var unq = []
			 var configActivos = $scope.configuracionesIso.filter(c=> c.activo === true);
			for( i = 0; i < configActivos.length; i++) {
				let cfg = configActivos[i];
				if(i === 0) {
					cfg.id_tipo_documento ? unq.push(cfg.id_tipo_documento) : unq.push(cfg.tipoDocumento.id)
				}else{
					let val
					cfg.id_tipo_documento ? ( val = cfg.id_tipo_documento) :  (val = cfg.tipoDocumento.id) 
					$scope.res = unq.find(el => el === val);
					if($scope.res === undefined){
						unq.push(val);
					}else{
						break;
					}
				}
			}
			if(configActivos.length === unq.length){
				var promesa = GuardarConfiguracionIsoEmpresa($scope.configuracionesIso, $scope.usuario.id_empresa)
				promesa.then(function (dato) {
					SweetAlert.swal("Guardado!", dato.mensaje, "success");
					$scope.cerrarModalConfiguracionIso()
				})
			}else{
				SweetAlert.swal("Error!", "No se puede activar más de un tipo", "warning");
			}
		}

		$scope.obtenerSaldosNegativosEmpresa =async  function (empresa) {
			var data = await DatosSaldosNegativosEmpresa(empresa.id)
			return data.inventariosEmpresa
		}
		
		$scope.reporteItemsEmpresa = async function (empresa) {
			$scope.empresa = empresa;
			$scope.inventariosEmpresa = await $scope.obtenerSaldosNegativosEmpresa($scope.empresa)
			// $scope.inventariosEmpresa = { edit: false }
			// $scope.inventariosEmpresa=undefined
			$scope.abrirPopup($scope.idModalReporteItems);
			$scope.$evalAsync()
		}
		$scope.cerrarModalReporteItems = function () {
			$scope.cerrarPopup($scope.idModalReporteItems);
		};

		$scope.excelSaldosNegativosEmpresa = function (inventariosEmpresa) {
			blockUI.start();
			
			var data = [["Codigo", "Cantidad", "Unid.", "Descripcion", "Venc.", "Sucursal", "Almacen", "Grupo", "Sub Grupo"]];
			for (var i = 0; i < inventariosEmpresa.length; i++) {
				var itemInventario = inventariosEmpresa[i];
				var columns = [];
				columns.push(itemInventario.producto.codigo)
				columns.push(itemInventario.cantidad);
				columns.push(itemInventario.producto.unidad_medida);
				columns.push(itemInventario.producto.descripcion);
				columns.push($scope.fechaATexto(itemInventario.fecha_vencimiento));
				columns.push(itemInventario.almacen.nombre);
				columns.push(itemInventario.almacen.sucursal.nombre);
				columns.push(itemInventario.producto.grupo.nombre);
				columns.push(itemInventario.producto.subgrupo.nombre);

				data.push(columns);
			}

			var ws_name = "SheetJS";
			var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
			/* add worksheet to workbook */
			wb.SheetNames.push(ws_name);
			wb.Sheets[ws_name] = ws;
			var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
			saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE-SALDOS-NEGATIVOS.xlsx");
			blockUI.stop();
			
		}

		//fin iso config
		$scope.$on('$routeChangeStart', function (next, current) {
			$scope.eliminarPopup($scope.idModalWizardEmpresaEdicion);
			$scope.eliminarPopup($scope.idModalWizardEmpresaVista);
			$scope.eliminarPopup($scope.idModalEliminarEmpresa);
			$scope.eliminarPopup($scope.idModalCorrelativoEmpresa);
			$scope.eliminarPopup($scope.idModalConfiguracionIso );
			$scope.eliminarPopup($scope.idModalReporteItems);
			$scope.eliminarPopup($scope.idModalSistFactElectronicaWeb);
			$scope.eliminarPopup($scope.idModalEmpresaConfigSFE);
		});

		
//PARA CONFIGURACION DE SISTEMA DE FACTURACION ELECTRONICA WEB
		// Mostrar los tipos de catalogos
		$scope.configFacturacionElectWeb = async function (empresa) {
			try {
				const listaCatlogosEmpresa =  await ListaCatalogosEmpresa(empresa.id, empresa.nit);
				$scope.catalogosEmpresa = listaCatlogosEmpresa.data;
				$scope.abrirPopup($scope.idModalSistFactElectronicaWeb);
				$scope.$evalAsync()
			} catch (err) {
				alert(err.stack && err.stack || 'Se perdió la conexión')
			}
		}
		$scope.cerrarModalconfigFacturacionElectWeb = function () {
			$scope.catalogosEmpresa = ''
			$scope.cerrarPopup($scope.idModalSistFactElectronicaWeb);
		};
		// Mortar la lista por tipo de catalogos
		$scope.empresaConfigSFE = async function (catalogo) {
			try {
				const listaXcatalogoEmpr = await ListaXcatalogosEmpresa(catalogo.id_empresa,catalogo.accion)
				$scope.listaXcatalogo = listaXcatalogoEmpr.data;
				$scope.catalogo = catalogo
				$scope.abrirPopup($scope.idModalEmpresaConfigSFE);
				$scope.$evalAsync()
			} catch (err) {
				alert(err.stack && err.stack || 'Se perdió la conexión')
			}
		}
		$scope.cerrarModalempresaConfigSFE = function () {
			$scope.listaXcatalogo= ''
			$scope.cerrarPopup($scope.idModalEmpresaConfigSFE);
		};
		// Guardar lista por tipo de catalogos
		$scope.guardarCatalogos = async function(lista,catalogo) {
			try {
				var datos = {lista:lista, accion:catalogo.accion, id_empresa:catalogo.id_empresa, nombre:catalogo.nombre}
				const listaXcatalogoEmpr = await saveCalalogos(datos)
				toastr.success(listaXcatalogoEmpr.message);
				$scope.cerrarModalempresaConfigSFE();
			} catch (err) {
				alert(err.stack && err.stack || 'Se perdió la conexión')
			}
		}









		$scope.inicio();
	}]);



