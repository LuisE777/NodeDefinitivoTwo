module.exports = function (router, sequelize, Sequelize, Usuario, RRHHParametros, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, RrhhEmpleadoFicha, RrhhEmpleadoCargo, MedicoPaciente, RrhhEmpleadoDiscapacidad, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoHorasExtra, RRHHPlanillaSueldos, RRHHDetallePlanillaSueldos, RrhhEmpleadoPrestamo, RRHHPlanillaRcIva, RRHHDetallePlanillaRcIva, RrhhAnticipo, RrhhEmpleadoRolTurno, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhClaseAsuencia, decodeBase64Image, fs, RRHHPlanillaCargasSociales, RRHHDetallePlanillaCargasSociales,
	RrhhEmpleadoHoraExtraOrdinaria, RrhhEmpleadoConfiguracionSubsidio, RrhhEmpleadoPlanificacionSubsidio, RrhhEmpleadoSeguimientoSubsidio, RRHHPlanillaSubsidios, RRHHDetallePlanillaSubsidios, ensureAuthorizedlogged, RrhhParametrosAreasFrontera, RrhhParametrosAreasHBD, RrhhEmpresaCargaHorario, RrhhEmpleadoBeneficioSocial, RrhhParametrosHorasExtrasCampo, RrhhEmpleadoRolTurnoNoche, RrhhEmpleadoTr3,
	RrhhEmpleadoPlanillaSueldoTr3, Banco, RRHHPlanillaAguinaldos, RRHHDetallePlanillaAguinaldos, RRHHAguinaldoPlanillaSueldo, RRHHPlanillaIncrementos, RRHHDetallePlanillaIncrementos, NumeroLiteral, RRHHPlanillaRetroActivas, RRHHDetallePlanillaRetroActivas,
	RrhhEmpleadoPlanillaAguinaldoTr3) {
		router.route('/rrhh-planilla-sueldo/mes/:mes/anio/:anio')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let meses = {
					0: "1-ENERO",
					1: "2-FEBRERO",
					2: "3-MARZO",
					3: "4-ABRIL",
					4: "5-MAYO",
					5: "6-JUNIO",
					6: "7-JULIO",
					7: "8-AGOSTO",
					8: "9-SEPTIEMBRE",
					9: "10-OCTUBRE",
					10: "11-NOVIEMBRE",
					11: "12-DICIEMBRE",				}
					var condicionPlanilla = { anio: req.params.anio, mes: meses[req.params.mes] };
					let planilla = await RRHHPlanillaSueldos.find({
						where: condicionPlanilla,
						attributes: ['id'],						
					})
				res.json({ registro: planilla });
			} catch (error) {
				return { hasErr: true, mensaje: error.stack, vacacion: vacacion };
			}

		});
	router.route('/rrhh-parametros/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			// ==== codigo para autenticar mediante token para acceder al api =====
			// var token = req.headers['x-access-token'];
			// if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
			// ================================================
			RRHHParametros.findOrCreate({
				where: { id_empresa: req.params.id_empresa },
				defaults: {
					id_empresa: req.params.id_empresa,
					salario_minimo: 2000,
					salario_rciva: 4,
					porcentage_iva: 13,
					decreto_supremo: '3161',
					seguro_salud: 'Caja Petrolera de Salud',
					aporte_serguro_salud: 10,
					numero_patronal: '942-2-1095',
					pension_vejez: 10,
					riesgo_comun: 1.71,
					comision: 0.5,
					aporte_solidario_laboral: 0.5,
					riesgo_profesional: 1.75,
					aporte_solidario_patronal: 3,
					rango_primero_inicio_solidario: 13000,
					rango_primero_fin_solidario: 1,
					rango_segundo_inicio_solidario: 25000,
					rango_segundo_fin_solidario: 5,
					rango_tercero_inicio_solidario: 35000,
					rango_tercero_fin_solidario: 10,
					salario_base_antiguedad: 6000,
					antiguedad_cero_uno: 0,
					antiguedad_dos_cuatro: 5,
					antiguedad_cinco_siete: 11,
					antiguedad_ocho_diez: 18,
					antiguedad_once_catorce: 26,
					antiguedad_quice_diecinueve: 34,
					antiguedad_veinte_veinticuatro: 42,
					antiguedad_mas_veinticinco: 50,
					pro_vivienda_patronal: 2,
					solo_jubilados_mayor_65: 1,
					frontera_monto: 20,
					frontera_porcentaje: true,
					hbd_monto: 20,
					hbd_porcentaje: true,
					indemnizaciones: 8.33,
					aguinaldos: 8.33,
					numero_empleador: 0,
					factor_calculo_dias: 365,
					resolucion_ministerio: null,
					dias_min_trabajos: 60,
					solo_jubilados_menor_65: 2.71
				},
				include: [
					{ model: RrhhParametrosAreasFrontera, as: 'areas_frontera', include: [{ model: Clase, as: "area" }] },
					{ model: RrhhParametrosAreasHBD, as: 'areas_hbd', include: [{ model: Clase, as: "area" }] },
					{ model: RrhhParametrosHorasExtrasCampo, as: 'campos_horas_extras', include: [{ model: Clase, as: "campo" }] },
					{ model: Clase, as: "tipoMetodoDias" }
				]
			}).spread(function (parametros, created) {
				res.json(parametros);
			});
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			RRHHParametros.update({
				salario_minimo: req.body.salario_minimo,
				salario_rciva: req.body.salario_rciva,
				porcentage_iva: req.body.porcentage_iva,
				decreto_supremo: req.body.decreto_supremo,
				seguro_salud: req.body.seguro_salud,
				aporte_serguro_salud: req.body.aporte_serguro_salud,
				numero_patronal: req.body.numero_patronal,
				pension_vejez: req.body.pension_vejez,
				riesgo_comun: req.body.riesgo_comun,
				comision: req.body.comision,
				aporte_solidario_laboral: req.body.aporte_solidario_laboral,
				riesgo_profesional: req.body.riesgo_profesional,
				aporte_solidario_patronal: req.body.aporte_solidario_patronal,
				rango_primero_inicio_solidario: req.body.rango_primero_inicio_solidario,
				rango_primero_fin_solidario: req.body.rango_primero_fin_solidario,
				rango_segundo_inicio_solidario: req.body.rango_segundo_inicio_solidario,
				rango_segundo_fin_solidario: req.body.rango_segundo_fin_solidario,
				rango_tercero_inicio_solidario: req.body.rango_tercero_inicio_solidario,
				rango_tercero_fin_solidario: req.body.rango_tercero_fin_solidario,
				salario_base_antiguedad: req.body.salario_base_antiguedad,
				antiguedad_cero_uno: req.body.antiguedad_cero_uno,
				antiguedad_dos_cuatro: req.body.antiguedad_dos_cuatro,
				antiguedad_cinco_siete: req.body.antiguedad_cinco_siete,
				antiguedad_ocho_diez: req.body.antiguedad_ocho_diez,
				antiguedad_once_catorce: req.body.antiguedad_once_catorce,
				antiguedad_quice_diecinueve: req.body.antiguedad_quice_diecinueve,
				antiguedad_veinte_veinticuatro: req.body.antiguedad_veinte_veinticuatro,
				antiguedad_mas_veinticinco: req.body.antiguedad_mas_veinticinco,
				pro_vivienda_patronal: req.body.pro_vivienda_patronal,
				solo_jubilados_mayor_65: req.body.solo_jubilados_mayor_65,
				frontera_monto: req.body.frontera_monto,
				frontera_porcentaje: req.body.frontera_porcentaje,
				hbd_monto: req.body.hbd_monto,
				hbd_porcentaje: req.body.hbd_porcentaje,
				indemnizaciones: req.body.indemnizaciones,
				aguinaldos: req.body.aguinaldos,
				numero_empleador: req.body.numero_empleador,
				factor_calculo_dias: req.body.factor_calculo_dias,
				resolucion_ministerio: req.body.resolucion_ministerio,
				dias_min_trabajos: req.body.dias_min_trabajos,
				id_metodo_dias: req.body.tipoMetodoDias ? req.body.tipoMetodoDias.id : null,
				solo_jubilados_menor_65: req.body.solo_jubilados_menor_65
			}, {
				where: { id_empresa: req.params.id_empresa },
			}).then(function (parametroActualizado) {
				RrhhParametrosAreasFrontera.destroy({
					where: {
						id_parametro: req.body.id
					}
				}).then(function (areasEliminados) {
					RrhhParametrosAreasHBD.destroy({
						where: {
							id_parametro: req.body.id
						}
					}).then(function (areasHBDEliminados) {
						if (req.body.frontera_area ? req.body.frontera_area.length : 0 > 0) {
							req.body.frontera_area.forEach(function (area, index, array) {
								RrhhParametrosAreasFrontera.findOrCreate({
									where: { id_parametro: req.body.id, id_area: area.id },
									defaults: {
										/*   id_empleado: req.body.id, */
										id_area: area.id,
										id_parametro: req.body.id,
									}
								}).spread(function (cargoEncontrado, created) {
									if (!created) {


									} else {
										if (index === (array.length - 1)) {
											if (req.body.hbd_area ? req.body.hbd_area.length : 0 > 0) {
												req.body.hbd_area.forEach(function (areaRBD, indexRBD, arrayRBD) {
													RrhhParametrosAreasHBD.findOrCreate({
														where: { id_parametro: req.body.id, id_area: areaRBD.id },
														defaults: {
															id_area: areaRBD.id,
															id_parametro: req.body.id,
														}
													}).spread(function (cargoEncontrado, created) {
														if (!created) {

														} else {
															if (indexRBD === (arrayRBD.length - 1)) {
																crearHorasExtrasCampo(res, req.body.campos_horas_extras, req.body.id);
															}
														}
													})
												});
											} else {
												crearHorasExtrasCampo(res, req.body.campos_horas_extras, req.body.id);
											}
										}
									}
								})
							});
						} else {
							if (req.body.hbd_area ? req.body.hbd_area.length : 0 > 0) {
								req.body.hbd_area.forEach(function (areaRBD, indexRBD, arrayRBD) {
									RrhhParametrosAreasHBD.findOrCreate({
										where: { id_parametro: req.body.id, id_area: areaRBD.id },
										defaults: {
											id_area: areaRBD.id,
											id_parametro: req.body.id,
										}
									}).spread(function (cargoEncontrado, created) {
										if (!created) {

										} else {
											if (indexRBD === (arrayRBD.length - 1)) {
												crearHorasExtrasCampo(res, req.body.campos_horas_extras, req.body.id);
											}
										}
									})
								});
							} else {
								crearHorasExtrasCampo(res, req.body.campos_horas_extras, req.body.id);
							}

						}
					});
				});
			});
		})

	function crearHorasExtrasCampo(res, camposHorasExtras, id_parametro) {
		if (camposHorasExtras ? camposHorasExtras.length : 0 > 0) {
			camposHorasExtras.forEach(function (itemCampo, indexCampo, arrayCampo) {
				RrhhParametrosHorasExtrasCampo.findOrCreate({
					where: { id_parametro: id_parametro, id: itemCampo.id },
					defaults: {
						id_parametro: id_parametro,
						id_campo: itemCampo.campo ? itemCampo.campo.id : null,
						horas: itemCampo.horas,
						inicio_mes: itemCampo.inicio_mes,
						fin_mes: itemCampo.fin_mes,
					}
				}).spread(function (cargoEncontrado, created) {
					if (!created) {
						RrhhParametrosHorasExtrasCampo.update({
							id_campo: itemCampo.campo ? itemCampo.campo.id : null,
							horas: itemCampo.horas,
							inicio_mes: itemCampo.inicio_mes,
							fin_mes: itemCampo.fin_mes,
						}, {
							where: { id_parametro: id_parametro, id: itemCampo.id }
						}).then(function (actualizado) {
							if (indexCampo === (arrayCampo.length - 1)) {
								res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
							}
						})

					} else {
						if (indexCampo === (arrayCampo.length - 1)) {
							res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
						}
					}
				})
			});
		} else {
			res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
		}
	}

	function obetenerMesTexto(mes) {
		switch (parseInt(mes)) {
			case 1: return "1-ENERO";
			case 2: return "2-FEBRERO";
			case 3: return "3-MARZO";
			case 4: return "4-ABRIL";
			case 5: return "5-MAYO";
			case 6: return "6-JUNIO";
			case 7: return "7-JULIO";
			case 8: return "8-AGOSTO";
			case 9: return "9-SEPTIEMBRE";
			case 10: return "10-OCTUBRE";
			case 11: return "11-NOVIEMBRE";
			case 12: return "12-DICIEMBRE";
			default: return "1-ENERO";
		}
	}

	router.route('/recursos-humanos-fichas/empleados/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			//      	var mes= new Date(req.params.gestion,parseInt(req.params.mes),0);
			// var primerDia = new Date(req.params.gestion,parseInt(req.params.mes)-1,1,0,0,0);
			// var ultimoDia = new Date(req.params.gestion,parseInt(req.params.mes)-1,mes.getDate(),23,59,59);
			//          { model: RrhhEmpleadoHorasExtra, as: 'horasExtra', where:{fecha: {$between: [primerDia,ultimoDia]}}},

			//===================================================================================================    
			// ==== obteber empleados que fecha de inicio menores o iguales al mes que gerera la planilla =================
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0));
			// console.log("primerDia =======", primerDia);
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59));
			// === corregir fecha formato
			// var ultimoDiaMes= ultimoDia.toLocaleString();
			var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');


			// console.log("primerDia =======", primerDia);
			var ultimoDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59);

			var qq = "ORDER BY gl_persona.apellido_paterno, gl_persona.apellido_materno, gl_persona.nombres DESC";
			sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', extencion.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    CONCAT_WS(' ', gl_persona.apellido_paterno, gl_persona.apellido_materno, gl_persona.nombres, gl_persona.segundo_nombre) AS 'nombre_completo', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento',fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico', fichas.matricula_seguro as 'matricula_seguro',fichas.id as 'id_ficha',fichas.jubilacion as 'jubilacion', fichas.total_ganado_fijo AS 'total_ganado_fijo',\
					fichas.monto_total_ganado AS 'monto_total_ganado', fichas.bono_dias AS 'bono_dias', fichas.costo_campo AS 'costo_campo', fichas.costo_descanso AS 'costo_descanso',\
					fichas.codigo_tributario As 'codigo_tributario', banco.nombre AS 'nombre_banco', fichas.numero_cuenta AS 'numero_cuenta',\
					fichas.horas_extra_dia_campo AS 'horas_extra_dia_campo', fichas.horas_campo AS 'horas_campo', contrato.nombre as 'tipoContrato', rrhhDetallePlanillaRcIva.nuevo_saldo AS 'nuevo_saldo',\
					rrhhDetallePlanillaRcIva.rc_iva_mes AS 'rc_iva_mes', area.nombre AS 'area', GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
					IFNULL(empleado_otros_bonos.monto_otro_bonos, 0) AS 'monto_otro_bonos'\
					FROM agil_medico_paciente \
					JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id AND agil_rrhh_empleado_ficha.fecha_inicio < '"+ ultimoDiaMes + "' order by agil_rrhh_empleado_ficha.id DESC limit 1) \
                    LEFT JOIN agil_rrhh_detalle_planilla_rc_iva AS rrhhDetallePlanillaRcIva ON rrhhDetallePlanillaRcIva.id = ( SELECT agil_rrhh_detalle_planilla_rc_iva.id FROM agil_rrhh_detalle_planilla_rc_iva INNER JOIN agil_rrhh_planilla_rc_iva AS planilla_rc_iva ON agil_rrhh_detalle_planilla_rc_iva.planilla = planilla_rc_iva.id WHERE agil_rrhh_detalle_planilla_rc_iva.ficha = fichas.id AND planilla_rc_iva.anio = '" + req.params.gestion + "' AND planilla_rc_iva.mes = '" + obetenerMesTexto(req.params.mes) + "' )\
					LEFT JOIN ( SELECT ficha, SUM( monto ) AS monto_otro_bonos FROM agil_rrhh_empleado_otros_bonos WHERE fecha BETWEEN '"+ primerDiaMes + "' AND '" + ultimoDiaMes + "' GROUP BY ficha ) AS empleado_otros_bonos ON empleado_otros_bonos.ficha = fichas.id\
					left JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id left JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha \
					LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id  left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase as extencion ON agil_medico_paciente.extension = extencion.id left JOIN gl_clase as estado ON gl_persona.estado_civil = estado.id\
					LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
					left JOIN gl_clase as campamento ON fichas.id_campo = campamento.id\
					LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id\
					LEFT JOIN gl_clase AS area ON fichas.area = area.id WHERE agil_medico_paciente.empresa = "+ req.params.id_empresa + " AND agil_medico_paciente.es_empleado = true AND agil_medico_paciente.regularizado = true AND IFNULL(fichas.fecha_expiracion, '" + primerDiaMes + "') >= '" + primerDiaMes + "' GROUP BY agil_medico_paciente.id", { type: sequelize.QueryTypes.SELECT })
				// sequelize.query("CALL empleadoPlanilla("+req.params.id_empresa+", '"+ultimoDiaMes+"')")
				.then(function (pacientes) {
					// pacientes.forEach(function(empleado){
					// 	empleado.extritas = "horasExtra";
					// 	RrhhEmpleadoHorasExtra.findAll({
					// 		where:{id_ficha: empleado.id_ficha, eliminado: false, fecha: {$between: [primerDia,ultimoDia]}}
					// 	}).then(function (horasExtra) {
					// 		console.log("horas extras", horasExtra);
					// 		empleado.extritas = "miau";
					// 	});
					// });

					// var promesas = []
					// pacientes.forEach(function (detalle) {
					// 	promesas.push(obtenerHorasExtra(detalle, primerDia, ultimoDia));
					// })
					// console.log(promesas);

					// sequelize.transaction(function (t) {
					// 	var promesas = []
					// 	pacientes.forEach(function (detalle) {
					// 		promesas.push(obtenerHorasExtra(detalle, t, primerDia, ultimoDia));
					// 	})
					// 	return Promise.all(promesas);
					// }).then(function (result) {
					// 	if (result) {
					// 		res.json({ empleados: pacientes });
					// 	} else {
					// 		res.json({ mensaje: 'Parece haber un error no determinado.', hasErr: true });
					// 	}
					// }).catch(function (err) {
					// 	res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
					// })
					res.json({ empleados: pacientes });
				});
			// ==================================================================================
			// 	MedicoPaciente.findAll({
			// 		where: {
			//                es_empleado: true,
			//                id_empresa:req.params.id_empresa
			//            }
			// 	}).then(function (empleados) {
			// 		var empleadosArray = [];
			// 		empleados.forEach( function(element, index) {
			// 			// console.log("los datosss ", element);

			// 			RrhhEmpleadoFicha.findOne({
			//     where: {
			//         id_empleado: element.dataValues.id,
			//     },
			//     include: [
			//     	{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
			//     	{ model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }
			//     ],
			//     order: [ [ 'id', 'DESC' ]],
			// }).then(function(entries){

			//   empleadosArray.push(entries);
			//   console.log("empleadosss ", empleadosArray);
			// }); 

			// 		});

			// 		// res.json({ empleados: empleadosArray });

			// 	});

			// ==================================================================================================== 

			//     MedicoPaciente.findAll({
			//     	where: {
			//             es_empleado: true,
			//             id_empresa:req.params.id_empresa
			//         },

			//         include: [
			//         	{ model: Clase, as: 'campo' }, 
			//         	{ model: RrhhEmpleadoFicha, 
			//         		as: 'empleadosFichas', 


			//         		where: {

			//     	haber_basico: {$ne: null} 
			//     },


			//         		include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }],

			//         		order: [['id', 'DESC']],



			//         	}, 
			//         	{ model: Clase, as: 'extension' }, 
			//         	{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }
			//             // { model: Empresa, as: 'empresa'},{model:MedicoPrerequisito, as: 'prerequisitos',include: [{ model: Clase, as: 'prerequisitoClase' }]}
			//         ]
			//         // para hacer las query ==================================================================================
			//         // primero obtener todos los pacientes de la empresa
			//         // luego de los resultados  hacer un for para obtener el id de el empleado
			//         // luego hacer el findall en fichas y hacer el where con el id del empleado y obtener la ultima ficha con limit


			//     }).then(function (empleado) {
			//     	var empleados = [];
			//     	empleado.forEach( function(element, index) {

			//     		if (element.dataValues.empleadosFichas.length > 0) {
			//     			empleados.push(element);
			//     		}
			//     	});
			//     	res.json({ empleados: empleados });

			//     });
		})

	router.route('/recursos-humanos-fichas/empleados/rc-iva/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			//===================================================================================================    
			// ==== obteber empleados que fecha de inicio menores o iguales al mes que gerera la planilla =================
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0));
			// console.log("primerDia =======", primerDia);
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59));

			var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');


			// console.log("primerDia =======", primerDia);
			var ultimoDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59);

			sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', extencion.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    CONCAT_WS(' ', gl_persona.apellido_paterno, gl_persona.apellido_materno, gl_persona.nombres, gl_persona.segundo_nombre) AS 'nombre_completo', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento',fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico', fichas.matricula_seguro as 'matricula_seguro',fichas.id as 'id_ficha',fichas.jubilacion as 'jubilacion', fichas.total_ganado_fijo AS 'total_ganado_fijo',\
					fichas.monto_total_ganado AS 'monto_total_ganado', fichas.bono_dias AS 'bono_dias', fichas.costo_campo AS 'costo_campo', fichas.costo_descanso AS 'costo_descanso',\
					fichas.codigo_tributario As 'codigo_tributario',\
					fichas.horas_extra_dia_campo AS 'horas_extra_dia_campo', fichas.horas_campo AS 'horas_campo', contrato.nombre as 'tipoContrato', rrhhDetallePlanillaRcIva.nuevo_saldo AS 'nuevo_saldo',\
					rrhhDetallePlanillaRcIva.rc_iva_mes AS 'rc_iva_mes', area.nombre AS 'area', GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
					IFNULL(empleado_otros_bonos.monto_otro_bonos, 0) AS 'monto_otro_bonos'\
					FROM agil_medico_paciente \
					JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id AND agil_rrhh_empleado_ficha.fecha_inicio < '"+ ultimoDiaMes + "' order by agil_rrhh_empleado_ficha.id DESC limit 1) \
					LEFT JOIN agil_rrhh_detalle_planilla_rc_iva AS rrhhDetallePlanillaRcIva ON rrhhDetallePlanillaRcIva.id = ( SELECT agil_rrhh_detalle_planilla_rc_iva.id FROM agil_rrhh_detalle_planilla_rc_iva WHERE agil_rrhh_detalle_planilla_rc_iva.ficha = fichas.id ORDER BY id DESC LIMIT 1)\
					LEFT JOIN ( SELECT ficha, SUM( monto ) AS monto_otro_bonos FROM agil_rrhh_empleado_otros_bonos WHERE fecha BETWEEN '"+ primerDiaMes + "' AND '" + ultimoDiaMes + "' GROUP BY ficha ) AS empleado_otros_bonos ON empleado_otros_bonos.ficha = fichas.id\
					left JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id left JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha \
					LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id  left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase as extencion ON agil_medico_paciente.extension = extencion.id left JOIN gl_clase as estado ON gl_persona.estado_civil = estado.id\
					LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
			        left JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id LEFT JOIN gl_clase AS area ON fichas.area = area.id WHERE agil_medico_paciente.empresa = "+ req.params.id_empresa + " AND agil_medico_paciente.es_empleado = true AND agil_medico_paciente.regularizado = true AND IFNULL(fichas.fecha_expiracion, '" + primerDiaMes + "') >= '" + primerDiaMes + "' GROUP BY agil_medico_paciente.id", { type: sequelize.QueryTypes.SELECT })
				// sequelize.query("CALL empleadoPlanilla("+req.params.id_empresa+", '"+ultimoDiaMes+"')")
				.then(function (pacientes) {
					res.json({ empleados: pacientes });
				});
		})

	function obtenerHorasExtra(detalle, primerDia, ultimoDia) {
		RrhhEmpleadoHorasExtra.findAll({
			where: { id_ficha: detalle.id_ficha, eliminado: false, fecha: { $between: [primerDia, ultimoDia] } }
		}).then(function (res) {
			console.log(res);
			return detalle;

		}).catch(function (err) {

			reject((err.stack !== undefined) ? err.stack : err);

		})
	};

	router.route('/recursos-humanos/horas-extra/empleado-sueldo/:id_ficha/gestion/:gestion/mes/:mes/empleado/:id_empleado')
		.get(ensureAuthorizedlogged, function (req, res) {
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0);
			// console.log("primerDia =======", primerDia);
			var ultimoDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59);
			// console.log("ultimoDia =======", ultimoDia);
			// var condicionHorasExtras = [{id_ficha: req.params.id_ficha, eliminado: false}];
			RrhhEmpleadoHoraExtraOrdinaria.findAll({
				where: { id_ficha: req.params.id_ficha, eliminado: false }
			}).then(function (horasExtraOrdianarios) {

				var totalHorasOrdinario = 0;
				if (horasExtraOrdianarios.length > 0) {
					// for reversa para acelera la carga =================
					for (var i = horasExtraOrdianarios.length - 1; i >= 0; i--) {
						// condicion para sacar horas extras==========
						// fecha cierre >= fecha inicio filtro && fecha cierre <= fecha fin filtro 
						var horaExtraOrdinario = horasExtraOrdianarios[i];
						var horas = 0;
						var diaCierre = new Date(horaExtraOrdinario.fecha_cierre)
						if (ultimoDia.getDate() == 31 && diaCierre.getDate() == 30) {
							diaCierre.setDate(diaCierre.getDate() + 1);
						}
						var diaInicio = new Date(horaExtraOrdinario.fecha);
						if (primerDia.getMonth() == diaInicio.getMonth() && primerDia.getFullYear() == diaInicio.getFullYear()) {
							primerDia = horaExtraOrdinario.fecha;
						}

						if (horaExtraOrdinario.cerrado && primerDia >= horaExtraOrdinario.fecha && ultimoDia <= diaCierre) {
							horas = horaExtraOrdinario.horas;
						} else if (!horaExtraOrdinario.cerrado && horaExtraOrdinario.fecha <= ultimoDia) {
							horas = horaExtraOrdinario.horas;
						}

						totalHorasOrdinario += horas;
					}

				}

				RrhhEmpleadoHorasExtra.findAll({
					where: { id_ficha: req.params.id_ficha, eliminado: false, fecha: { $between: [primerDia, ultimoDia] } }
				}).then(function (horasExtra) {

					var totalHoras = "";
					var timeHoras = 0;
					var timeMinutos = 0;
					if (horasExtra.length > 0) {
						// for reversa para acelera la carga =================
						for (var i = horasExtra.length - 1; i >= 0; i--) {
							// for (var i = 0; i < horasExtra.length; i++) {
							var minutos = horasExtra[i].tiempo.split(':')[1];
							var horas = horasExtra[i].tiempo.split(':')[0];

							timeHoras = timeHoras + parseInt(horas);
							timeMinutos = timeMinutos + parseInt(minutos);
							if (timeMinutos >= 60) {
								timeMinutos = timeMinutos - 60;
								timeHoras = timeHoras + 1;
							}
							totalHoras = timeHoras;
						}

					} else {
						totalHoras = 0;
					}

					// =========================================================================================================================
					// ==== hacer filtro del modelo recursos humanos anticipos para obtener el ultimo anticipo del mes del empleado :)  ============
					// =========================================================================================================================

					RrhhEmpleadoPrestamo.findAll({
						where: { id_empleado: req.params.id_empleado, cuota: { $gt: 0 } }
					}).then(function (prestamos) {
						// console.log("los prestamos ======================================================", prestamos);
						var totalCuotas = 0;

						if (prestamos.length > 0) {
							var fechaInicial = "";
							var fechaVencimiento = "";
							for (var j = prestamos.length - 1; j >= 0; j--) {
								// for (var j = 0; j < prestamos.length; j++) {
								fechaInicial = fechaATexto(prestamos[j].fecha_inicial);

								fechaVencimiento = editar_fecha(fechaInicial, prestamos[j].plazo, "m", "/");

								// totalCuotas = totalCuotas + prestamos[j].cuota;
								// condicion para que saque los prestamos de avuerdo al mes y año del prestamo ===========
								if (primerDia <= fechaVencimiento && ultimoDia >= prestamos[j].fecha_inicial) {
									totalCuotas = totalCuotas + prestamos[j].cuota;
								}
							}
						} else {
							totalCuotas = 0;
						}
						// console.log("los totales prestamos =====================", totalCuotas);
						// res.json({totalHoras: totalHoras, totalCuotas: totalCuotas});

						// query anticipo =============
						// RrhhAnticipo.findOne({
						// 	where: { id_empleado: req.params.id_empleado, eliminado: false, fecha: { $between: [primerDia, ultimoDia] } },
						// 	order: [['createdAt', 'DESC']]
						// }).then(function (anticipo) {
						var primerDiaFiltro = new Date(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0);
						RrhhAnticipo.findAll({
							where: { id_ficha: req.params.id_ficha, eliminado: false, fecha: { $between: [primerDiaFiltro, ultimoDia] } },
							attributes: [[sequelize.fn('sum', sequelize.col('monto')), 'total_monto']],
							group: ["`agil_rrhh_empleado_anticipo`.`ficha`"],
							raw: true
						}).then(function (anticipo) {
							var totalanticipo = 0;
							if (anticipo.length > 0) {
								totalanticipo = anticipo[0].total_monto ? anticipo[0].total_monto : 0;
							}
							// ==== obteniendo rol de turnos ===
							RrhhEmpleadoRolTurno.findAll({
								where: { id_ficha: req.params.id_ficha, eliminado: false },
								order: sequelize.literal("fecha_inicio asc"),
								include: [{ model: RrhhEmpleadoRolTurnoNoche, as: 'turnosExtra', required: false, where: { eliminado: false }, include: [{ model: Clase, as: 'tipo' }] },
								{ model: Clase, as: 'grupo' },
								{ model: Clase, as: 'clasificacion' },
								{
									model: RrhhEmpleadoFicha, as: 'ficha',
									include: [
										{ model: RrhhEmpleadoVacaciones, as: 'vacaciones', required: false, where: { eliminado: false } },
										{ 
											model: RrhhEmpleadoAusencia, as: 'ausencias', required: false, 
											include: [
												{ model: Clase, as: 'estado', required: false,
													where:{$or: [{nombre_corto: "AUT"}, {nombre_corto: "SAL"}, {nombre_corto: "RTR"}]}
												},
												{ model: RrhhClaseAsuencia, as: 'tipoAusencia', required: false, include: [{ model: Tipo, as: 'tipo' }] }
											] 
										}
									]
								}]
							}).then(function (datos2) {
								// var fechas = datos2.map(function (rol) {
								// 	return rol.fecha_inicio.getTime()
								// })

								// var fechaInicio = new Date(fechas.reduce(function (a, b) {
								// 	return Math.min(a, b)
								// }));

								// res.json({ rolesTurno: datos2, fechaInicio: fechaInicio, paginas: Math.ceil(datos.count / req.params.items_pagina) });
								res.json({ rolesTurno: datos2, totalHoras: totalHoras, totalCuotas: totalCuotas, totalAnticipo: totalanticipo, totalHorasOrdinario: totalHorasOrdinario });
							})

						});

					});


					// res.json({horasExtra: horasExtra});
				});
			});

			//  ==== hacer query x el updatedAt que sea menor o igual  a la fecha de vencimiento =======
			//          sequelize.query('SELECT * FROM agil_rrhh_empleado_prestamo WHERE empleado=:id_empleado AND updatedAt >= :fecha AND updatedAt < DATE_ADD(fecha_inicial, INTERVAL plazo MONTH) ',
			//   {replacements: { fecha: primerDia, id_empleado: req.params.id_empleado}, type: sequelize.QueryTypes.SELECT }
			// ).then( function(projects) {
			// 	console.log("projects prestamosssssssssss ======== ", projects);
			// 	// body...
			// });


			// =========== obetener de la base de datos los prestamos que sean mayores a cero ===========
		});

	function editar_fecha(fecha, intervalo, dma, simbolo) {
		var simbolo = simbolo || "-";
		var arrayFecha = fecha.split(simbolo);
		var dia = arrayFecha[0];
		var mes = arrayFecha[1];
		var anio = arrayFecha[2];

		var fechaInicial = new Date(anio, mes - 1, dia);
		var fechaFinal = fechaInicial;
		fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));

		console.log('la fecha venceeeee ==== ', fechaFinal);

		return fechaFinal;
	}

	function fechaATexto(fecha, formato_iso) {
		var MyDate = new Date(fecha);
		var MyDateString;
		MyDate.setDate(MyDate.getDate());
		if (formato_iso) {
			MyDateString = (MyDate.getFullYear() + '/' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2));

		} else {
			MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + MyDate.getFullYear();
		}

		return MyDateString
		// $scope.fechaAplicacionVacuna = new Date(convertirFecha(fecha))
	}

	router.route('/rrhh-planilla-sueldos/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			if (req.params.mes != 0) {
				condicionPlanilla.mes = req.params.mes;
			}

			RRHHPlanillaSueldos.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	function obtenerMesAnticipo(mes, year) {
		switch (mes) {
			case -1:
				return { mes: 11, year: year - 1 }

				break;

			default:
				return { mes: mes, year: year }
				break;
		}
	}

	router.route('/rrhh-planilla-sueldo/ficha/:id_ficha/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let meses = {
					0: "1-ENERO",
					1: "2-FEBRERO",
					2: "3-MARZO",
					3: "4-ABRIL",
					4: "5-MAYO",
					5: "6-JUNIO",
					6: "7-JULIO",
					7: "8-AGOSTO",
					8: "9-SEPTIEMBRE",
					9: "10-OCTUBRE",
					10: "11-NOVIEMBRE",
					11: "12-DICIEMBRE",
				}

				let fecha = new Date();
				let gestionesMesesFiltro = [];
				let gestionFiltro = [];
				for (const number of [1, 2, 3]) {
					let mes = fecha.getMonth() - number
					let year = fecha.getFullYear()
					let dataAnioMes = obtenerMesAnticipo(mes, year)
					mes = dataAnioMes.mes
					year = dataAnioMes.year
					gestionesMesesFiltro.push({ mes: meses[mes], anio: year });
				}
				let cantidadParaPromedio = 0
				let sumaTotal = 0
				for (const gestionMes of gestionesMesesFiltro) {

					var condicionPlanilla = { anio: gestionMes.anio.toString(), mes: gestionMes.mes };

					var condicionDetallePlanilla = { ficha: req.params.id_ficha }
					let planilla = await RRHHDetallePlanillaSueldos.find({
						where: condicionDetallePlanilla,
						attributes: ['total_ganado'],
						include: [{ model: RRHHPlanillaSueldos, as: "rrhhPlanilla", where: condicionPlanilla }]
					})
					if (planilla) {
						cantidadParaPromedio++
						sumaTotal = sumaTotal + planilla.total_ganado
					}
				}

				let sumaTotalGanado = sumaTotal / cantidadParaPromedio
				res.json({ sumaTotalGanado: sumaTotalGanado });
			} catch (error) {
				return { hasErr: true, mensaje: error.stack, vacacion: vacacion };
			}

		});

	router.route('/rrhh-planilla-cargas-sociales/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			if (req.params.mes != 0) {
				condicionPlanilla.mes = req.params.mes;
			}
			RRHHPlanillaCargasSociales.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-sueldos/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			console.log('los datos recibidos', planillas);
			RRHHPlanillaSueldos.create({
				id_empresa: req.body.id_empresa,
				mes: req.body.mes,
				anio: req.body.gestion,
				total_empleados: req.body.totalEmpleados,
				total: req.body.importeLiquidoPagable,
				importe_sueldo_basico: req.body.importeSueldoBasico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.totalHorasExtras,
				importe_horas_extras: req.body.importeHorasExtras,
				importe_recargo_nocturno: req.body.importeRecargoNocturno,
				importe_bono_antiguedad: req.body.importeBonoAntiguedad,
				importe_bono_frontera: req.body.importeBonoFrontera,
				importe_otros_bonos: req.body.importeOtrosBonos,
				importe_total_ganado: req.body.importeTotalGanado,
				importe_afp: req.body.importeAFP,
				importe_rc_iva: req.body.importeRCIVA,
				importe_anticipos: req.body.importeAniticipos,
				importe_prestamos: req.body.importePrestamos,
				importe_total_descuento: req.body.importeTotalDescuento,
				importe_liquido_pagable: req.body.importeLiquidoPagable
			}).then(function (planillaCreado) {
				// console.log("planillaCreado =============== ", planillaCreado);

				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					CrearDetallePlanillaSueldos(planillaCreado, detallePlanilla);
				});

				res.json(planillaCreado);
			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaSueldos.update({
				total_empleados: req.body.total_empleados,
				total: req.body.total,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.importe_horas_extras,
				importe_horas_extras: req.body.total_horas_extras,
				importe_recargo_nocturno: req.body.importe_recargo_nocturno,
				importe_bono_antiguedad: req.body.importe_bono_antiguedad,
				importe_bono_frontera: req.body.importe_bono_frontera,
				importe_otros_bonos: req.body.importe_otros_bonos,
				importe_total_ganado: req.body.importe_total_ganado,
				importe_afp: req.body.importe_afp,
				importe_rc_iva: req.body.importe_rc_iva,
				importe_anticipos: req.body.importe_anticipos,
				importe_prestamos: req.body.importe_prestamos,
				importe_total_descuento: req.body.importe_total_descuento,
				importe_liquido_pagable: req.body.importe_liquido_pagable
			}, {
				where: { id: req.body.id }
			}).then(function (planillaActualizado) {
				planillas.detalles.forEach(function (detallePlanilla, index, array) {
					EditarDetallePlanillaSueldos(detallePlanilla);
				});
				res.json({ "mensaje": "Actualizado Satisfactoriamente!" });
			})
		});


	function EditarDetallePlanillaSueldos(detallePlanilla) {
		RRHHDetallePlanillaSueldos.update({
			importe_sueldo_basico: detallePlanilla.importe_sueldo_basico,
			dt: detallePlanilla.dt,
			ganado: detallePlanilla.ganado,
			horas_extras: detallePlanilla.horas_extras,
			importe_horas_extras: detallePlanilla.importe_horas_extras,
			importe_recargo_nocturno: detallePlanilla.importe_recargo_nocturno,
			importe_bono_antiguedad: detallePlanilla.importe_bono_antiguedad,
			importe_bono_frontera: detallePlanilla.importe_bono_frontera,
			importe_otros_bonos: detallePlanilla.importe_otros_bonos,
			total_ganado: detallePlanilla.total_ganado,
			afp: detallePlanilla.afp,
			rc_iva: detallePlanilla.rc_iva,
			importe_anticipos: detallePlanilla.importe_anticipos,
			importe_prestamos: detallePlanilla.importe_prestamos,
			importe_total_descuento: detallePlanilla.importe_total_descuento,
			liquido_pagable: detallePlanilla.liquido_pagable,
			horas_extras_r: detallePlanilla.horas_extras_r,
			dias_rol_turnos: detallePlanilla.dias_rol_turnos,
			horas_extras_rol: detallePlanilla.horas_extras_rol,
			nt: detallePlanilla.nt
		}, {
			where: { id: detallePlanilla.id }
		}).then(function (detalles) {

		});
	}

	function CrearDetallePlanillaSueldos(planilla, detallePlanilla) {
		RRHHDetallePlanillaSueldos.create({
			planilla: planilla.id,
			ficha: detallePlanilla.id_ficha,
			importe_sueldo_basico: detallePlanilla.sueldoBasico,
			dt: detallePlanilla.dt,
			ganado: detallePlanilla.ganado,
			horas_extras: detallePlanilla.horasExtras,
			importe_horas_extras: detallePlanilla.totalHorasExtras,
			importe_recargo_nocturno: detallePlanilla.recargoNocturno,
			importe_bono_antiguedad: detallePlanilla.bonoAntiguedad,
			importe_bono_frontera: detallePlanilla.bonoFrontera,
			importe_otros_bonos: detallePlanilla.otrosBonos,
			total_ganado: detallePlanilla.totalGanado,
			afp: detallePlanilla.afp,
			rc_iva: detallePlanilla.rc_iva,
			importe_anticipos: detallePlanilla.anticipos,
			importe_prestamos: detallePlanilla.prestamos,
			importe_total_descuento: detallePlanilla.totalDescuento,
			liquido_pagable: detallePlanilla.liquidoPagable,
			horas_extras_r: detallePlanilla.horasExtrasR,
			dias_rol_turnos: detallePlanilla.diasRolTurnos,
			horas_extras_rol: detallePlanilla.horasExtrasRol,
			nt: detallePlanilla.nt,
			campo: detallePlanilla.campamento
		}).then(function (detalles) {

		});
	}

	router.route('/rrhh-planilla-cargas-sociales/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaCargasSociales.create({
				id_empresa: req.body.id_empresa,
				mes: req.body.mes,
				anio: req.body.gestion,
				total_empleados: req.body.totalEmpleados,
				total: req.body.importeLiquidoPagable,
				importe_sueldo_basico: req.body.importeSueldoBasico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.totalHorasExtras,
				importe_horas_extras: req.body.importeHorasExtras,
				importe_recargo_nocturno: req.body.importeRecargoNocturno,
				importe_bono_antiguedad: req.body.importeBonoAntiguedad,
				importe_bono_frontera: req.body.importeBonoFrontera,
				importe_otros_bonos: req.body.importeOtrosBonos,
				importe_total_ganado: req.body.importeTotalGanado,
				importe_afp: req.body.importeAFP,
				importe_sol: req.body.importeSol,
				importe_pro_v: req.body.importeProv,
				importe_cns: req.body.importeCNS,
				importe_prev_indemnizacion: req.body.importe_prev_indemnizacion,
				importe_prov_aguinaldo: req.body.importe_prov_aguinaldo
			}).then(function (planillaCreado) {
				// console.log("planillaCreado =============== ", planillaCreado);

				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					CrearDetallePlanillaCargasSociales(planillaCreado, detallePlanilla);
				});

				res.json(planillaCreado);
			});
		});

	function CrearDetallePlanillaCargasSociales(planilla, detallePlanilla) {
		RRHHDetallePlanillaCargasSociales.create({
			planilla: planilla.id,
			ficha: detallePlanilla.id_ficha,
			importe_sueldo_basico: detallePlanilla.sueldoBasico,
			dt: detallePlanilla.dt,
			ganado: detallePlanilla.ganado,
			horas_extras: detallePlanilla.horasExtras,
			importe_horas_extras: detallePlanilla.totalHorasExtras,
			importe_recargo_nocturno: detallePlanilla.recargoNocturno,
			importe_bono_antiguedad: detallePlanilla.bonoAntiguedad,
			importe_bono_frontera: detallePlanilla.bonoFrontera,
			importe_otros_bonos: detallePlanilla.otrosBonos,
			total_ganado: detallePlanilla.totalGanado,
			afp: detallePlanilla.afp,
			sol: detallePlanilla.sol,
			pro_v: detallePlanilla.pro_v,
			cns: detallePlanilla.cns,
			prev_indemnizacion: detallePlanilla.prev_indemnizacion,
			prov_aguinaldo: detallePlanilla.prov_aguinaldo
		}).then(function (detalles) {

		});
	}



	router.route('/rrhh-planilla-rc-iva/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			console.log('los datos recibidos', planillas);
			RRHHPlanillaRcIva.create({
				id_empresa: req.body.id_empresa,
				mes: req.body.mes,
				anio: req.body.gestion,
				total_empleados: req.body.totalEmpleados,
				total: req.body.importeLiquidoPagable,
				neto_imponible: req.body.netoImponible,
				dos_smn: req.body.sumaDos_SMN,
				diferencia: req.body.sumaDiferencia,
				rc_iva: req.body.sumarcIva13,
				dos_smn13: req.body.sumaDos_SMN13,
				f110: req.body.sumaF110,
				rc_iva_fisico: req.body.sumaRcIvaFisco,
				saldo_dependiente: req.body.sumaSaldoDependiente,
				saldo_anterior: req.body.sumaSaldoAnterior,
				actualizacion: req.body.sumaActualizacion,
				saldo_actualizado: req.body.sumaSaldoActualizado,
				saldo_total: req.body.sumaSaldoTotal,
				saldo_utilizado: req.body.sumaSaldoUtilizado,
				rc_iva_mes: req.body.sumaRcIvaMes,
				nuevo_saldo: req.body.sumaSaldoNuevo,
				otros_ingresos: req.body.sumaOtrosIngresos,
				monto_ingresos_netos: req.body.sumaMontoIngresosNetos,
				saldo_fisco: req.body.sumaSaldoFisco
			}).then(function (planillaCreado) {
				// console.log("planillaCreado =============== ", planillaCreado);

				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					CrearDetallePlanillaRcIva(planillaCreado, detallePlanilla);
				});

				res.json(planillaCreado);
			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaRcIva.update({
				neto_imponible: planillas.neto_imponible,
				dos_smn: planillas.dos_smn,
				diferencia: planillas.diferencia,
				rc_iva: planillas.rc_iva,
				dos_smn13: planillas.dos_smn13,
				f110: planillas.f110,
				rc_iva_fisico: planillas.rc_iva_fisico,
				saldo_dependiente: planillas.saldo_dependiente,
				saldo_anterior: planillas.saldo_anterior,
				actualizacion: planillas.actualizacion,
				saldo_actualizado: planillas.saldo_actualizado,
				saldo_total: planillas.saldo_total,
				saldo_utilizado: planillas.saldo_utilizado,
				rc_iva_mes: planillas.rc_iva_mes,
				nuevo_saldo: planillas.nuevo_saldo,
				otros_ingresos: req.body.otros_ingresos,
				monto_ingresos_netos: req.body.monto_ingresos_netos,
				saldo_fisco: req.body.saldo_fisco
			}, {
				where: { id: req.body.id }
			}).then(function (planillaActualizado) {
				planillas.rrhhPlanillaRcIva.forEach(function (detallePlanilla, index, array) {
					EditarDetallePlanillaRcIva(detallePlanilla);
				});
				res.json({ "mensaje": "Actualizado Satisfactoriamente!" });
			})
		});

	function EditarDetallePlanillaRcIva(detallePlanilla) {
		RRHHDetallePlanillaRcIva.update({
			neto_imponible: detallePlanilla.neto_imponible,
			dos_smn: detallePlanilla.dos_smn,
			diferencia: detallePlanilla.diferencia,
			rc_iva: detallePlanilla.rc_iva,
			dos_smn13: detallePlanilla.dos_smn13,
			f110: detallePlanilla.f110,
			rc_iva_fisico: detallePlanilla.rc_iva_fisico,
			saldo_dependiente: detallePlanilla.saldo_dependiente,
			saldo_anterior: detallePlanilla.saldo_anterior,
			actualizacion: detallePlanilla.actualizacion,
			saldo_actualizado: detallePlanilla.saldo_actualizado,
			saldo_total: detallePlanilla.saldo_total,
			saldo_utilizado: detallePlanilla.saldo_utilizado,
			rc_iva_mes: detallePlanilla.rc_iva_mes,
			nuevo_saldo: detallePlanilla.nuevo_saldo,
			saldo_fisco: detallePlanilla.saldo_fisco,
			otros_ingresos: detallePlanilla.otros_ingresos,
			monto_ingresos_netos: detallePlanilla.monto_ingresos_netos,
			saldo_anterior_arrastrado: detallePlanilla.saldo_anterior_arrastrado,
			otra_empresa: detallePlanilla.otra_empresa,
			observaciones: detallePlanilla.observaciones,
			nuevo_empleado: detallePlanilla.nuevo_empleado,
			f110_monto_declarado: detallePlanilla.montoDeclarado,
			f110_munero_facturas: detallePlanilla.muneroFacturas
		}, {
			where: { id: detallePlanilla.id }
		}).then(function (detalles) {

		});
	}

	function CrearDetallePlanillaRcIva(planilla, detallePlanilla) {
		RRHHDetallePlanillaRcIva.create({
			planilla: planilla.id,
			ficha: detallePlanilla.id_ficha,
			neto_imponible: detallePlanilla.netoImponible,
			dos_smn: detallePlanilla.dos_SMN,
			diferencia: detallePlanilla.diferencia,
			rc_iva: detallePlanilla.rcIva13,
			dos_smn13: detallePlanilla.dos_SMN13,
			f110: detallePlanilla.f110,
			rc_iva_fisico: detallePlanilla.rcIvaFisco,
			saldo_dependiente: detallePlanilla.saldoDependiente,
			saldo_anterior: detallePlanilla.saldoAnterior,
			actualizacion: detallePlanilla.actualizacion,
			saldo_actualizado: detallePlanilla.saldoActualizado,
			saldo_total: detallePlanilla.saldoTotal,
			saldo_utilizado: detallePlanilla.saldoUtilizado,
			rc_iva_mes: detallePlanilla.rcIvaMes,
			nuevo_saldo: detallePlanilla.saldoNuevo,
			saldo_fisco: detallePlanilla.saldo_fisco,
			otros_ingresos: detallePlanilla.otros_ingresos,
			monto_ingresos_netos: detallePlanilla.monto_ingresos_netos,
			saldo_anterior_arrastrado: detallePlanilla.saldo_anterior_arrastrado,
			otra_empresa: detallePlanilla.otra_empresa,
			observaciones: detallePlanilla.observaciones,
			nuevo_empleado: detallePlanilla.nuevo_empleado,
			f110_monto_declarado: detallePlanilla.montoDeclarado,
			f110_munero_facturas: detallePlanilla.muneroFacturas
		}).then(function (detalles) {

		});
	};
	//  =====  api para obtener  planilla rc iva del mes ========
	router.route('/rrhh-planilla-rc-iva/valid/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHPlanillaRcIva.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					anio: req.params.gestion,
					mes: req.params.mes
				}
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-rc-iva/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionRCIVA = { id_empresa: req.params.id_empresa, anio: req.params.gestion, mes: req.params.mes };

			if (req.params.mes == "TODOS") {
				condicionRCIVA = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			}

			RRHHPlanillaRcIva.findAll({
				where: condicionRCIVA,
				include: [{ model: Empresa, as: 'empresa' }]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-rc-iva/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaRcIva.findAll({
				where: { planilla: req.params.id_planilla },
				include: [
					{
						model: RrhhEmpleadoFicha, as: 'rrhhDetallePlanillaRcIva',
						// attributes: [sequelize.literal('`empleado.persona`.`nombre_completo`'), 'empleado'],
						include: [
							{
								model: MedicoPaciente, as: 'empleado',
								// attributes: ["id","cargo", "persona"],
								include: [
									{ model: Clase, as: 'campo' },
									{ model: Persona, as: 'persona' }

								]
							},
							{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }
						]
					}
				]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-sueldo/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHPlanillaSueldos.find({
				where: { id: req.params.id_planilla }
			}).then(function (planilla) {

				RRHHPlanillaRcIva.find({
					where: {
						id_empresa: planilla.id_empresa,
						anio: planilla.anio,
						mes: planilla.mes
					}
				}).then(function (planillasRcIva) {
					if (planillasRcIva) {
						RRHHDetallePlanillaSueldos.findAll({
							where: { planilla: req.params.id_planilla },
							include: [
								{
									model: RrhhEmpleadoFicha, as: 'DetalleFicha',
									include: [
										{ model: Clase, as: 'area' },
										{ model: Clase, as: 'banco' },
										{
											model: MedicoPaciente, as: 'empleado',
											include: [
												{ model: Clase, as: 'extension' },
												{ model: Persona, as: 'persona' }
											]
										},
										{ model: Clase, as: 'lugarSeguroSalud' },
										{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
										{ model: Clase, as: 'ubicacion' },
										{
											model: RRHHDetallePlanillaRcIva, as: 'rrhhDetalleRcIva', required: false,
											include: [
												{
													model: RRHHPlanillaRcIva, as: "rrhhPlanillaRcIva",
													where: { mes: planilla.mes, anio: planilla.anio }
												}
											]
										},
										{ model: Clase, as: 'campo' }
									]
								}
							]
						}).then(function (planillas) {
							obtenerDatosImpresiones(req, res, planillas);
						});
					} else {
						RRHHDetallePlanillaSueldos.findAll({
							where: { planilla: req.params.id_planilla },
							include: [
								{
									model: RrhhEmpleadoFicha, as: 'DetalleFicha',
									include: [
										{ model: Clase, as: 'area' },
										{ model: Clase, as: 'banco' },
										{
											model: MedicoPaciente, as: 'empleado',
											include: [
												{ model: Clase, as: 'extension' },
												{ model: Persona, as: 'persona' }
											]
										},
										{ model: Clase, as: 'lugarSeguroSalud' },
										{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
										{ model: Clase, as: 'ubicacion' },
										{ model: Clase, as: 'campo' }
									]
								}
							]
						}).then(function (planillas) {
							obtenerDatosImpresiones(req, res, planillas);
							// res.json({ planillas: planillas });
						});
					}
				});

			});
		});
	router.route('/rrhh-planilla-carga-social/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHPlanillaCargasSociales.find({
				where: { id: req.params.id_planilla }
			}).then(function (planilla) {

				RRHHPlanillaRcIva.find({
					where: {
						id_empresa: planilla.id_empresa,
						anio: planilla.anio,
						mes: planilla.mes
					}
				}).then(function (planillasRcIva) {
					if (planillasRcIva) {
						RRHHDetallePlanillaCargasSociales.findAll({
							where: { planilla: req.params.id_planilla },
							include: [
								{
									model: RrhhEmpleadoFicha, as: 'DetalleFicha',
									include: [
										{ model: Clase, as: 'area' },
										{ model: Clase, as: 'banco' },
										{
											model: MedicoPaciente, as: 'empleado',
											include: [
												{ model: Clase, as: 'extension' },
												{ model: Clase, as: 'campo' },
												{ model: Persona, as: 'persona' }
											]
										},
										{ model: Clase, as: 'lugarSeguroSalud' },
										{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
										{ model: Clase, as: 'ubicacion' },
										{
											model: RRHHDetallePlanillaRcIva, as: 'rrhhDetalleRcIva', required: false,
											include: [
												{
													model: RRHHPlanillaRcIva, as: "rrhhPlanillaRcIva",
													where: { mes: planilla.mes, anio: planilla.anio }
												}
											]
										}
									]
								}
							]
						}).then(function (planillas) {
							res.json({ planillas: planillas });
							//obtenerDatosImpresiones(req, res, planillas);
						}).catch(function (err) {
							var error = (err.stack) ? err.stack : err
							res.json({ hasError: true, mensaje: error });
						});;
					} else {
						RRHHDetallePlanillaCargasSociales.findAll({
							where: { planilla: req.params.id_planilla },
							include: [
								{
									model: RrhhEmpleadoFicha, as: 'DetalleFicha',
									include: [
										{ model: Clase, as: 'area' },
										{ model: Clase, as: 'banco' },
										{
											model: MedicoPaciente, as: 'empleado',
											include: [
												{ model: Clase, as: 'extension' },
												{ model: Clase, as: 'campo' },
												{ model: Persona, as: 'persona' }
											]
										},
										{ model: Clase, as: 'lugarSeguroSalud' },
										{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
										{ model: Clase, as: 'ubicacion' }
									]
								}
							]
						}).then(function (planillas) {
							//obtenerDatosImpresiones(req, res, planillas);
							res.json({ planillas: planillas });
						}).catch(function (err) {
							var error = (err.stack) ? err.stack : err
							res.json({ hasError: true, mensaje: error });
						});;
					}
				});

			});
		});
	function obtenerDatosImpresiones(req, res, planillas) {
		sequelize.query("SELECT lugarSeguroSalud.id AS id, lugarSeguroSalud.nombre AS nombre, lugarSeguroSalud.nombre_corto AS numero_patronal \
			FROM agil_rrhh_detalle_planilla_sueldos AS detalle_planilla_sueldos\
			LEFT OUTER JOIN agil_rrhh_empleado_ficha AS DetalleFicha ON detalle_planilla_sueldos.ficha = DetalleFicha.id \
			LEFT OUTER JOIN gl_clase AS lugarSeguroSalud ON DetalleFicha.lugar_seguro_salud = lugarSeguroSalud.id \
			WHERE detalle_planilla_sueldos.planilla = "+ req.params.id_planilla + " \
			GROUP BY lugarSeguroSalud.id;",
			{ type: sequelize.QueryTypes.SELECT })
			.then(function (lugaresSeguroSalud) {
				sequelize.query("SELECT area.id AS id, area.nombre AS nombre \
					FROM agil_rrhh_detalle_planilla_sueldos AS detalle_planilla_sueldos\
					LEFT OUTER JOIN agil_rrhh_empleado_ficha AS DetalleFicha ON detalle_planilla_sueldos.ficha = DetalleFicha.id \
					LEFT JOIN gl_clase AS area ON DetalleFicha.area = area.id \
					WHERE detalle_planilla_sueldos.planilla = "+ req.params.id_planilla + " \
					GROUP BY area.id;",
					{ type: sequelize.QueryTypes.SELECT })
					.then(function (areasPlanilla) {
						sequelize.query("SELECT ubicacion.id AS id, ubicacion.nombre AS nombre \
						FROM agil_rrhh_detalle_planilla_sueldos AS detalle_planilla_sueldos\
						LEFT OUTER JOIN agil_rrhh_empleado_ficha AS DetalleFicha ON detalle_planilla_sueldos.ficha = DetalleFicha.id \
						LEFT JOIN gl_clase AS ubicacion ON DetalleFicha.ubicacion = ubicacion.id \
						WHERE detalle_planilla_sueldos.planilla = "+ req.params.id_planilla + " \
						GROUP BY ubicacion.id;",
							{ type: sequelize.QueryTypes.SELECT })
							.then(function (ubicacionesPlanilla) {
								res.json({ planillas: planillas, lugares_seguro_salud: lugaresSeguroSalud, areas_planilla: areasPlanilla, ubicaciones_planilla: ubicacionesPlanilla });
							});
					});
			});
	}

	//  =====  api para obtener   subsidios planificacion  ========
	router.route('/recursos-humanos-fichas/empleados-subsidios/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			// ==== obteber empleados que fecha de inicio menores o iguales al mes que gerera la planilla =================
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0));
			// console.log("primerDia =======", primerDia);
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59));
			// === corregir fecha formato
			// var ultimoDiaMes= ultimoDia.toLocaleString();
			var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			RrhhEmpleadoPlanificacionSubsidio.findAll({
				where: {
					fecha_reporte: { $between: [primerDiaMes, ultimoDiaMes] }
				},
				include: [{ model: RrhhEmpleadoConfiguracionSubsidio, as: 'tipoSubsidio', where: { id_empresa: req.params.id_empresa } },
				{
					model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] },
					{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, order: [['id', 'DESC']] },
					{ model: Clase, as: 'extension' },
					{ model: Clase, as: 'campo' }
					]
				},
				{ model: RrhhEmpleadoFichaFamiliar, as: 'veneficiaria', required: false, include: [{ model: Persona, as: 'persona' }] }, { model: RrhhEmpleadoFichaFamiliar, as: 'hijo', required: false, include: [{ model: Persona, as: 'persona' }] }]
			}).then(function (empleadoSubsidios) {
				res.json({ 'empleados': empleadoSubsidios });
			})

		});

	function CrearDetallePlanillaSubsidio(planilla, detallePlanilla) {
		RRHHDetallePlanillaSubsidios.create({
			planilla: planilla.id,
			planificacion: detallePlanilla.id,
			monto: detallePlanilla.tipoSubsidio.monto,
			total: detallePlanilla.total
		}).then(function (detalles) {

		});
	}

	router.route('/rrhh-planilla-subsidio/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaSubsidios.create({
				id_empresa: req.body.id_empresa,
				mes: req.body.mes,
				anio: req.body.gestion,
				total_empleados: req.body.totalEmpleados,
				total_asignaciones: req.body.totalAsignanciones,
				total_monto: req.body.totalMonto,
				total_cantidad: req.body.totalCantidad,
				total: req.body.sumaTotal
			}).then(function (planillaCreado) {
				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					CrearDetallePlanillaSubsidio(planillaCreado, detallePlanilla);
				});

				res.json(planillaCreado);
			});
		});

	router.route('/rrhh-planilla-subsidios/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			if (req.params.mes != 0) {
				condicionPlanilla.mes = req.params.mes;
			}

			RRHHPlanillaSubsidios.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-subsidio/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaSubsidios.findAll({
				where: { planilla: req.params.id_planilla },
				include: [
					{
						model: RrhhEmpleadoPlanificacionSubsidio, as: 'planificacionSubsidio',
						include: [{ model: RrhhEmpleadoConfiguracionSubsidio, as: 'tipoSubsidio' },
						{
							model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] },
							{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, order: [['id', 'DESC']] },
							{ model: Clase, as: 'extension' },
							{ model: Clase, as: 'campo' }
							]
						},
						{ model: RrhhEmpleadoFichaFamiliar, as: 'veneficiaria', required: false, include: [{ model: Persona, as: 'persona' }] }, { model: RrhhEmpleadoFichaFamiliar, as: 'hijo', required: false, include: [{ model: Persona, as: 'persona' }] }]
					}
				]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-subsidio/planilla/:id_planilla')
		.delete(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaSubsidios.destroy({
				where: {
					planilla: req.params.id_planilla
				}
			}).then(function (persona) {
				RRHHPlanillaSubsidios.destroy({
					where: {
						id: req.params.id_planilla
					}
				}).then(function (persona) {
					res.json({ mensaje: "Planilla eliminado satisfactoriamente!" });
				});
			});
		});
	router.route('/recursos-humanos/reporte-excel-ovt/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			const fichaincludes = [
				{
					model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
					attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
					include: [
						{
							model: Clase, as: 'motivo',
							attributes: ['id', 'nombre', 'nombre_corto']
						}
					]
				},
				{
					model: Clase, as: 'cargaHorario',
					attributes: ['id'],
					include: [
						{
							model: RrhhEmpresaCargaHorario, as: 'horario'
						}
					]
				},
				{
					model: Clase, as: 'tipoPersonal',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'tipoContrato',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'ubicacion',
					attributes: ['id', 'nombre']
				},
				{
					model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
					attributes: ['id', 'id_discapacidad'],
					include: [
						{
							model: Clase, as: 'discapacidad',
							attributes: ['id', 'nombre'],
							required: false
						}
					],
					required: false
				},
				{
					model: Clase, as: 'aporteSeguroLargoPlazo',
					attributes: ['id', 'nombre']
				},
				{
					model: MedicoPaciente, as: 'empleado',
					// where: {id: {$in:[4697,6451]}},
					attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
					include: [
						{
							model: Clase, as: 'campo',
							attributes: ['nombre']
						},
						{
							model: Clase, as: 'extension',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Clase, as: 'tipoDocumento',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Persona, as: 'persona',
							// where : {apellido_paterno: {$like:'%ORTIZ%'}},// where: { apellido_paterno: { $like: '%EGUEZ%' } },//,// ,// 
							attributes: ['id',
								'nombres',
								'segundo_nombre',
								'apellido_paterno',
								'apellido_materno',
								'nombre_completo',
								'id_pais_nacimiento',
								'ci',
								'fecha_nacimiento',
								'id_genero'
							],
							include: [
								{
									model: Clase, as: 'pais',
									attributes: ['nombre'],
									required: false
								},
								{
									model: Clase, as: 'genero',
									attributes: ['nombre', 'nombre_corto'],
									required: false
								}
							]
						}
					]
				},
				{
					model: RrhhEmpleadoCargo, as: 'cargos',
					attributes: ['id'],
					include: [
						{
							model: Clase, as: "cargo",
							attributes: ['nombre']
						}
					],
					required: false
				}
			]
			RRHHPlanillaSueldos.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaSueldos, as: 'rrhhDetallePlanillaSueldos',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: fichaincludes
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['id', 'aporte_serguro_salud']
							}
						]
					}
				],
				order: sequelize.literal("apellido_paterno asc, apellido_materno asc, nombres asc, segundo_nombre asc")
			}).then((planilla) => {
				if (!planilla) return res.json({ reporte: [], errors: [], total: 0, hasErr: true });
				const cabeceraReporte = [
					"Nro",
					"Tipo de documento de identidad",
					"Número de documento de identidad",
					"Lugar de expedición",
					"Fecha de nacimiento",
					"Apellido Paterno",
					"Apellido Materno",
					"Nombres",
					"País de nacionalidad",
					"Sexo",
					"Jubilado",
					"¿Aporta a la AFP?",
					"¿Persona con discapacidad?",
					"Tutor de persona con discapacidad",
					"Fecha de ingreso",
					"Fecha de retiro",
					"Motivo retiro",
					"Caja de salud",
					"AFP a la que aporta",
					"NUA/CUA",
					"Sucursal o ubicación adicional",
					"Clasificación laboral",
					"Cargo",
					"Modalidad de contrato",
					"Tipo contrato",
					"Días pagados",
					"Horas pagadas",
					"Haber Básico",
					"Bono de antigüedad",
					"Horas extra",
					"Monto horas extra",
					"Horas recargo nocturno",
					"Monto horas extra nocturnas",
					"Horas extra dominicales",
					"Monto horas extra dominicales",
					"Domingos trabajados",
					"Monto domingo trabajado",
					"Nro. dominicales",
					"Salario dominical",
					"Bono producción",
					"Subsidio frontera",
					"Otros bonos y pagos",
					"RC-IVA",
					"Aporte Caja Salud",
					"Aporte AFP",
					"Otros descuentos"
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.rrhhDetallePlanillaSueldos.length || 0; index++) {
					// if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.activo) {
					// 	data.push(reporteOVT(planilla.rrhhDetallePlanillaSueldos[index], data))
					// 	continue
					// }
					const indx = index
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.id,
							activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null;
						const fila = reporteOVT(planilla, indx, errors, ficha__, warnings);
						if (fila) {
							data.push(fila)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.rrhhDetallePlanillaSueldos.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
							for (let index_ = 0; index_ < data.length; index_++) {
								if (index_ > 0) data[index_][0] = '' + index_
							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					})
					// planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha = 
				}
			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		});

	function reporteOVT(planilla, index, errors, ficha, warnings) {

		const ficha___ = ficha && ficha || planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues
		const columns = [];
		const _indx = index + 1 - errors.length;
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		const tipo_documento = ficha___.empleado && ficha___.empleado.tipoDocumento && ficha___.empleado.tipoDocumento.nombre_corto.trim() || '' || '' || '';
		if (tipo_documento.length > 0) {
			columns.push(tipo_documento);
		} else {
			columns.push(''); // Tipo de documento de identidad
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Tipo de documento: sin asignación.</p>' });
		}
		// # 3
		columns.push(ficha___.empleado.persona.ci.trim()); // Número de documento de identidad
		// # 4
		columns.push(ficha___.empleado.extension.nombre_corto.trim()); // Lugar de expedición (Documento Identficación)
		// # 5
		columns.push(fechaATexto(ficha___.empleado.persona.fecha_nacimiento)); // Fecha de nacimiento (Empleado)
		// # 6
		if (!ficha___.empleado.persona.apellido_paterno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_paterno = ficha___.empleado.persona.apellido_paterno && ficha___.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!ficha___.empleado.persona.apellido_materno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = ficha___.empleado.persona.apellido_materno && ficha___.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		const nombres = [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		columns.push(nombres.trim()); // Nombres
		// # 9
		columns.push(ficha___.empleado.persona.pais.nombre.trim()); // País de nacionalidad
		// # 10
		const genero = (ficha___.empleado.persona.genero.nombre.toUpperCase() === "MASCULINO" ? 'M' : 'F');
		columns.push(genero.trim()); // Sexo (Género)
		// # 11
		const jubilado = ficha___.jubilacion && (ficha___.jubilacion ? '1' : '0') || '0'; // 1 si es true
		columns.push(jubilado); // Jubilado (1 si es jubilado 0 si no es jubilado)
		// # 12
		const aportaAFP = (ficha___.aporteSeguroLargoPlazo ? '1' : '0'); // 1 si existe alguna asignación. si es null o indefinido no existe asignación por tanto 0 (Obligarorio: no debe ser 0)
		if (aportaAFP === '0') {
			errors.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Sin Asignación de aportes AFP. Es obligatorio</p>' });
			return
		}
		columns.push(aportaAFP); // ¿Aporta a la AFP? (1 si aporta)

		// # 14
		const discapacidades_ = ficha___.discapacidades.map((discapacidad) => (discapacidad && discapacidad.discapacidad.nombre ? discapacidad.discapacidad.nombre.toUpperCase() : ''))
		let tutor = '0'
		for (let index = 0; index < discapacidades_.length; index++) {
			if (discapacidades_[index].indexOf('TUTOR') !== -1) {
				tutor = '1'
			}
			if (discapacidades_[index].indexOf('PADRE') !== -1) {
				tutor = '1'
			}
		}
		//// #14 -->// # 13
		const discapacidad = ficha___.discapacidad && (tutor === '0' ? '1' : '0') || '0';
		columns.push(discapacidad); // ¿Persona con discapacidad? si es padre/madre o tutor es 0
		columns.push(tutor); // Tutor de persona con discapacidad
		// # 15
		columns.push(fechaATexto(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio)); // Fecha de ingreso
		// # 16 y 17 motivoBeneficio debe verificarse antes para obtener la fecha de retiro.
		//la fecha de retiro se determinó que es la fecha de expiración en la ficha del empleado.
		//const motivoBeneficio = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.length && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre !='QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null
		const fecha_expiracion_ = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = parseInt(planilla.mes.split('-')[0]);
		const _anio_planilla = parseInt(planilla.anio);
		const motivoBeneficio = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.length && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre != 'QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null;
		const fechaRetiro = motivoBeneficio && (((fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion.getFullYear() ? fechaATexto(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion) : null) || null); // Sólo en el caso que se retira el empleado en el mes de la planilla.

		if (motivoBeneficio && fecha_expiracion_ && !fechaRetiro) {
			if (_anio_planilla > fecha_expiracion_.getFullYear() && _mes_planilla > (fecha_expiracion_.getMonth() + 1)) {
				errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Parece que el empleado se retiró antes de la fecha de esta planilla.</p>' });
				return
			}
		}
		columns.push(fechaRetiro && fechaRetiro || ''); // Fecha de retiro
		// # 17
		const motivoRetiro = motivoBeneficio && fechaRetiro && motivoBeneficio.motivo.nombre_corto || '';
		columns.push(motivoRetiro); // Motivo retiro (Poner 2 = Vencimiento de contrato)
		// # 18
		columns.push('2'); // Caja de salud (Poner 2 = Caja Petrolera)
		// # 19
		const AFP_aporte = (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.aporteSeguroLargoPlazo ? (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.aporteSeguroLargoPlazo.nombre.toUpperCase().includes('FUTURO') ? '2' : '1') : '0'); // 0 Solo para evitar salten errores (Obligarorio: no debe ser 0)
		if (AFP_aporte === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: No se pudo determinar la AFP a la que aporta. Valores admitidos: 1.PREVISIÓN, 2.FUTURO</p>' });
			return
		}
		columns.push(AFP_aporte); // AFP a la que aporta (Obligatorio: 1 Si es Previsión 2 Futuro)
		// # 20
		const nua = (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== null && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== '' ? planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: El número NUA/CUA parece inválido.</p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 21
		//Por el momento poner 0 en ubicación.
		columns.push('0'); //columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.ubicacion.nombre.trim()); // Sucursal o ubicación adicional
		// # 22
		const tipoPersonal = (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal ? (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal.nombre.trim().toUpperCase() === 'CAMPO' ? '3' : (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal.nombre.trim().toUpperCase() === 'OFICINA' ? '4' : '0')) : '0');
		if (tipoPersonal === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Tipo de empleado inválido. Valores Admitidos: CAMPO/OFICINA</p>' });
			return
		}
		columns.push(tipoPersonal); // Clasificación laboral (Campo = 3, Oficina = 4)
		// # 23
		if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargos.length === 0) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: El empleado no tiene un cargo asignado</p>' });
			return
		}
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargos[0].cargo.nombre); // Cargo
		// # 24
		let modalidadContrato = '0';
		if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoContrato) {
			if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'INDEFINIDO') modalidadContrato = '1';
			if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'POR OBRA') modalidadContrato = '4';
			if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'EVENTUAL') modalidadContrato = '5';
		} else {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Tipo de contrato sin asignación.</p>' });
			return
		}
		if (modalidadContrato === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Tipo de contrato ' + planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() + ' es inválido. Valores Admitidos: INDEFINIDO/POR OBRA/EVENTUAL</p>' });
			return
		}
		columns.push(modalidadContrato); // Modalidad de contrato (Indefinido = 1, por obra = 4, Eventual = 5)
		// # 25
		columns.push('1'); // Tipo contrato (Poner 1, 1 = Escrito, 2 = Verbal)
		// # 26
		const diasTrabajadosPorMes = planilla.rrhhDetallePlanillaSueldos[index].dt && parseInt(planilla.rrhhDetallePlanillaSueldos[index].dt) + '' || '30';
		columns.push(diasTrabajadosPorMes); // Días pagados
		// # 27
		// const promedioHorasTrabajadasDia = parseInt(formatTime(timestrToSec(timeDiff(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargaHorario.horario.hora_inicio, planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargaHorario.horario.hora_fin)) - timestrToSec(timeDiff(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargaHorario.horario.hora_inicio_descanso, planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.cargaHorario.horario.hora_fin_descanso)))[0])
		columns.push('8'); // Horas pagadas (Promedio horas día). Colocar 8 para todos.
		// # 28
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.ganado)//columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.haber_basico.toFixed(2)); // Haber Básico
		// # 29
		const bonoAntiguedad = planilla.rrhhDetallePlanillaSueldos[index].importe_bono_antiguedad && planilla.rrhhDetallePlanillaSueldos[index].importe_bono_antiguedad.toFixed(2) || '0.00';
		columns.push(bonoAntiguedad); // Bono de antigüedad
		// # 30
		const totalHorasExtrasMes = (planilla.rrhhDetallePlanillaSueldos[index].horas_extras >= 1 ? planilla.rrhhDetallePlanillaSueldos[index].horas_extras : '');
		columns.push(totalHorasExtrasMes); // Horas extra
		// # 31
		const importeHorasExtras = (planilla.rrhhDetallePlanillaSueldos[index].importe_horas_extras > 0 ? planilla.rrhhDetallePlanillaSueldos[index].importe_horas_extras.toFixed(2) : '');
		columns.push(importeHorasExtras); // Monto horas extra
		// # 32
		//importe_recargo_nocturno = (haber_basico / 30 * CantidadnochesRolTurnos) * 35 / 100
		//CantidadnochesRolTurnos = ( importe_recargo_nocturno / (haber_basico / 30) * 35 / 100))
		const calculoHorasExtrasNocturnas = planilla.rrhhDetallePlanillaSueldos[index].nt //parseInt((planilla.rrhhDetallePlanillaSueldos[index].importe_recargo_nocturno / (((planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.haber_basico / 30) * 35) / 100)));
		columns.push(((calculoHorasExtrasNocturnas < 1 || calculoHorasExtrasNocturnas == 'NaN' || calculoHorasExtrasNocturnas === null) ? '' : '' + calculoHorasExtrasNocturnas)); // Horas recargo nocturno
		// # 33
		const montoHorasNocturnas = ((planilla.rrhhDetallePlanillaSueldos[index].importe_recargo_nocturno && planilla.rrhhDetallePlanillaSueldos[index].importe_recargo_nocturno > 0) ? planilla.rrhhDetallePlanillaSueldos[index].importe_recargo_nocturno.toFixed(2) : '');
		columns.push(montoHorasNocturnas); // Monto horas extra nocturnas
		// # 34
		columns.push(''); // Horas extra dominicales
		// # 35
		columns.push(''); // Monto horas extra dominicales
		// # 36
		columns.push(''); // Domingos trabajados
		// # 37
		columns.push(''); // Monto domingo trabajado
		// # 38
		columns.push(''); // Nro. dominicales
		// # 39
		columns.push(''); // Salario dominical
		// # 40
		columns.push(''); // Bono producción
		// # 41
		const bonoFrontera = (planilla.rrhhDetallePlanillaSueldos[index].importe_bono_frontera && planilla.rrhhDetallePlanillaSueldos[index].importe_bono_frontera >= 1 ? planilla.rrhhDetallePlanillaSueldos[index].importe_bono_frontera.toFixed(2) : '');
		columns.push(bonoFrontera); // Subsidio frontera
		// # 42
		const otrosBonos = (planilla.rrhhDetallePlanillaSueldos[index].importe_otros_bonos && planilla.rrhhDetallePlanillaSueldos[index].importe_otros_bonos >= 1 ? planilla.rrhhDetallePlanillaSueldos[index].importe_otros_bonos.toFixed(2) : '');
		columns.push(otrosBonos); // Otros bonos y pagos
		// # 43
		const iva = (planilla.rrhhDetallePlanillaSueldos[index].rc_iva && planilla.rrhhDetallePlanillaSueldos[index].rc_iva >= 1 ? planilla.rrhhDetallePlanillaSueldos[index].rc_iva.toFixed(2) : '0');
		columns.push(iva); // RC-IVA
		// # 44
		const aporteSalud = (planilla.empresa.rrhhParametros.aporte_serguro_salud && planilla.empresa.rrhhParametros.aporte_serguro_salud >= 1 ? (((planilla.empresa.rrhhParametros.aporte_serguro_salud) * planilla.rrhhDetallePlanillaSueldos[index].total_ganado) / 100).toFixed(2) : '0');
		if (aporteSalud === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Valor invalido para Aporte caja salud</p>' });
			return
		}
		columns.push(aporteSalud); // Aporte Caja Salud
		// # 45
		const afp = (planilla.rrhhDetallePlanillaSueldos[index].afp && planilla.rrhhDetallePlanillaSueldos[index].afp >= 1 ? planilla.rrhhDetallePlanillaSueldos[index].afp.toFixed(2) : '0');
		if (afp === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Valor invalido para Aporte AFP</p>' });
			return
		}
		columns.push(afp); // Aporte AFP
		// # 46
		const otrosDescuentos = ((planilla.rrhhDetallePlanillaSueldos[index].importe_anticipos && planilla.rrhhDetallePlanillaSueldos[index].importe_anticipos || 0) + (planilla.rrhhDetallePlanillaSueldos[index].importe_prestamos && planilla.rrhhDetallePlanillaSueldos[index].importe_prestamos || 0));
		columns.push(otrosDescuentos ? otrosDescuentos.toFixed(2) : ''); // Otros descuentos
		return columns
	}


	router.route('/recursos-humanos/reporte-excel-afp/futuro/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			RRHHPlanillaSueldos.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaSueldos, as: 'rrhhDetallePlanillaSueldos',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{
										model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
										attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
										include: [
											{
												model: Clase, as: 'motivo',
												attributes: ['nombre', 'nombre_corto']
											}
										]
									},
									{
										model: Clase, as: 'cargaHorario',
										attributes: ['id'],
										include: [
											{
												model: RrhhEmpresaCargaHorario, as: 'horario'
											}
										]
									},
									{
										model: Clase, as: 'tipoPersonal',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'tipoContrato',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'ubicacion',
										attributes: ['nombre']
									},
									{
										model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
										attributes: ['id_discapacidad'],
										include: [
											{
												model: Clase, as: 'discapacidad',
												attributes: ['nombre']
											}
										]
									},
									{
										model: Clase, as: 'aporteSeguroLargoPlazo',
										attributes: ['nombre'], where: {
											nombre: 'AFP FUTURO'
										}
									},
									{
										model: Clase, as: 'lugarSeguroSalud',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'lugarSeguroLargoPlazo',
										attributes: ['nombre']
									},
									{
										model: MedicoPaciente, as: 'empleado',
										attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
										include: [
											{
												model: Clase, as: 'campo',
												attributes: ['nombre']
											},
											{
												model: Clase, as: 'extension',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Clase, as: 'tipoDocumento',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Persona, as: 'persona',
												attributes: [
													'nombres',
													'segundo_nombre',
													'apellido_paterno',
													'apellido_materno',
													'nombre_completo',
													'id_pais_nacimiento',
													'ci',
													'fecha_nacimiento',
													'id_genero'
												],
												// where: {ci: "8932449"},
												include: [
													{
														model: Clase, as: 'pais',
														attributes: ['nombre'],
														required: true
													},
													{
														model: Clase, as: 'genero',
														attributes: ['nombre', 'nombre_corto'],
														required: true
													}
												]
											}
										]
									},
									{
										model: RrhhEmpleadoCargo, as: 'cargos',
										attributes: ['id'],
										include: [
											{
												model: Clase, as: "cargo",
												attributes: ['nombre']
											}
										]
									}
								]
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['aporte_serguro_salud']
							}
						]
					}
				]
			}).then((planilla) => {
				const fichaincludes = [
					{
						model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
						attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
						include: [
							{
								model: Clase, as: 'motivo',
								attributes: ['id', 'nombre', 'nombre_corto']
							}
						]
					},
					{
						model: Clase, as: 'cargaHorario',
						attributes: ['id'],
						include: [
							{
								model: RrhhEmpresaCargaHorario, as: 'horario'
							}
						]
					},
					{
						model: Clase, as: 'tipoPersonal',
						attributes: ['id', 'nombre']
					},
					{
						model: Clase, as: 'tipoContrato',
						attributes: ['id', 'nombre']
					},
					{
						model: Clase, as: 'ubicacion',
						attributes: ['id', 'nombre']
					},
					{
						model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
						attributes: ['id', 'id_discapacidad'],
						include: [
							{
								model: Clase, as: 'discapacidad',
								attributes: ['id', 'nombre'],
								required: false
							}
						],
						required: false
					},
					{
						model: Clase, as: 'aporteSeguroLargoPlazo',
						attributes: ['id', 'nombre']
					},
					{
						model: MedicoPaciente, as: 'empleado',
						// where: {id: {$in:[4697,6451]}},
						attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
						include: [
							{
								model: Clase, as: 'campo',
								attributes: ['nombre']
							},
							{
								model: Clase, as: 'extension',
								attributes: ['nombre_corto'],
								required: false
							},
							{
								model: Clase, as: 'tipoDocumento',
								attributes: ['nombre_corto'],
								required: false
							},
							{
								model: Persona, as: 'persona',
								// where : {apellido_paterno: {$like:'%ORTIZ%'}},// where: { apellido_paterno: { $like: '%EGUEZ%' } },//,// ,// 
								attributes: ['id',
									'nombres',
									'segundo_nombre',
									'apellido_paterno',
									'apellido_materno',
									'nombre_completo',
									'id_pais_nacimiento',
									'ci',
									'fecha_nacimiento',
									'id_genero'
								],
								include: [
									{
										model: Clase, as: 'pais',
										attributes: ['nombre'],
										required: false
									},
									{
										model: Clase, as: 'genero',
										attributes: ['nombre', 'nombre_corto'],
										required: false
									}
								]
							}
						]
					},
					{
						model: RrhhEmpleadoCargo, as: 'cargos',
						attributes: ['id'],
						include: [
							{
								model: Clase, as: "cargo",
								attributes: ['nombre']
							}
						],
						required: false
					}
				]
				const cabeceraReporte = [
					"Nº", //#1
					"(13) TIPO", //#2
					"(14) Nro", //#3
					"EXT", //#4
					"(15) NUA/CUA", //#5
					"(A)1er APELLIDO (PATERNO)", //#6
					"(B) 2do APELLIDO (MATERNO)", //#7
					"(C) APELLIDO CASADA", //#8
					"(D) PRIMER NOMBRE", //#9
					"(E) SEGUNDO NOMBRE", //#10
					"(F) DEPARTAMENTO", //#11
					"NOVEDAD I/R/L/S", //# 12
					"FECHA NOVEDAD", //#13
					"DÍAS COTIZADOS", //#14
					"TIPO ASEGURADO", //#15
					"TOTAL GANADO DEPEND. < 65 AÑOS O JUBILADO DECIDE APORTAR", //#16
					"TOTAL GANADO DEPEND. > 65 AÑOS DECIDE APORTAR", //#17
					"TOTAL GANADO DEPEND. < 65 AÑOS JUBILADO DECIDE NO APORTAR", //#18
					"TOTAL GANADO DEPEND. > 65 AÑOS JUBILADO DECIDE NO APORTAR ", //#19
					"COTIZACIÓN ADICIONAL", //#20
					"TOTAL GANADO EN Bs.", //#21
					"TOTAL GANADO EN Bs." //#22
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.rrhhDetallePlanillaSueldos.length || 0; index++) {
					const indx = index
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.id,
							// activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null
						const columna = reporteAFPFUTURO(planilla, indx, errors, ficha__, warnings);
						if (columna) {
							data.push(columna)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.rrhhDetallePlanillaSueldos.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
							for (let index = 0; index < data.length; index++) {
								if (index > 0) data[index][0] = '' + index

							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					})
					// planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha = 
				}

				// if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
				// res.json({ reporte: data, errors: errors, total: data.length + errors.length });

			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		});
	function reporteAFPFUTURO(planilla, index, errors, ficha, warning) {

		const ficha___ = ficha && ficha || planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues
		const _indx = index + 1 - errors.length;
		const nombre_afp = planilla.rrhhDetallePlanillaSueldos[index].DetalleFicha.aporteSeguroLargoPlazo && planilla.rrhhDetallePlanillaSueldos[index].DetalleFicha.aporteSeguroLargoPlazo.nombre || ''
		// if(nombre_afp !== 'AFP FUTURO') return
		const columns = [];
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.tipoDocumento.nombre_corto.trim()); // Tipo de documento de identidad
		// # 3
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.ci.trim()); // Número de documento de identidad
		// # 4
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.extension.nombre_corto.trim()); // Lugar de expedición (Documento Identficación)
		// # 5
		const nua = (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== null && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== '' ? planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">El número NUA/CUA parece inválido.</p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 6
		if (!planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno) {
			warning.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.<p style="color: orange;">Registro de emp</p>leado
		}
		const apellido_paterno = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno) {
			warning.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		if (!planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada) {
			warning.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido de casada</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido de casada.
		}
		const apellido_casada = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada.trim() || '';
		columns.push(apellido_casada.trim())
		// # 9
		const primer_nombre = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim() || '';// [planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim(), (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre ? planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres) {
			warning.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Primer Nombre</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		columns.push(primer_nombre.trim()); // Nombres
		// # 10
		const segundo_nombre = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() || '';// [planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim(), (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre ? planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre) {
			warning.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Segundo Nombre</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este falte.
		}
		columns.push(segundo_nombre.trim()); // Nombres
		// # 11 departamento afp, debe referirse al departamental. lugarSeguroLargoPlazo.
		// columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.lugarSeguroSalud.nombre.trim());
		columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.lugarSeguroLargoPlazo.nombre.trim());
		// # 12
		const fecha_inicio_ = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio || null;
		const fecha_expiracion_ = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = parseInt(planilla.mes.split('-')[0]);
		const _anio_planilla = parseInt(planilla.anio);
		const novedad = (((fecha_inicio_ ? fecha_inicio_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_inicio_.getFullYear() ? 'I' : (fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_expiracion_.getFullYear() ? 'R' : '') || '');
		columns.push(novedad);
		// # 13
		columns.push(novedad && (novedad === 'I' ? fechaATexto(fecha_inicio_) : fechaATexto(fecha_expiracion_)) || ''); // Fecha de retiro
		// # 14
		const diasTrabajadosPorMes = planilla.rrhhDetallePlanillaSueldos[index].dt && parseInt(planilla.rrhhDetallePlanillaSueldos[index].dt) + '' || '30';
		columns.push(diasTrabajadosPorMes);
		// # 15
		let tipo_asegurado = '';
		const edadTrabajador = ficha___.empleado.persona.fecha_nacimiento && getAge(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.fecha_nacimiento) || 0;
		if (edadTrabajador) {
			if (edadTrabajador < 65 && !ficha___.jubilacion) {
				tipo_asegurado = 'P';
			}
			if (edadTrabajador < 65 && ficha___.jubilacion) {
				tipo_asegurado = 'R';
			}
			if (edadTrabajador >= 65 && !ficha___.jubilacion) {
				tipo_asegurado = 'Q';
			}
			if (edadTrabajador >= 65 && ficha___.jubilacion) {
				tipo_asegurado = 'S';
			}
		}
		columns.push(tipo_asegurado);
		// # 16
		if (tipo_asegurado === 'P' && !planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.jubilacion) {
			columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 17
		if (tipo_asegurado === 'Q') {
			columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 18
		if (tipo_asegurado === 'R' && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.jubilacion) {
			columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 19
		if (tipo_asegurado === 'S') {
			columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 20
		columns.push('')
		// # 21
		columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		// # 22
		columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		// columns.push(edadTrabajador) Columna solo para verificacion visual
		return columns
		// data.push(columns);
	}
	router.route('/recursos-humanos/reporte-excel-siat-rciva/rciva/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			RRHHPlanillaSueldos.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaSueldos, as: 'rrhhDetallePlanillaSueldos',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{
										model: MedicoPaciente, as: 'empleado',
										attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
										include: [
											{
												model: Clase, as: 'campo',
												attributes: ['nombre']
											},
											{
												model: Clase, as: 'extension',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Clase, as: 'tipoDocumento',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Persona, as: 'persona',
												attributes: [
													'nombres',
													'segundo_nombre',
													'apellido_paterno',
													'apellido_materno',
													'apellido_casada',
													'nombre_completo',
													'direccion_zona',
													'id_pais_nacimiento',
													'ci',
													'fecha_nacimiento',
													'id_genero'
												],
												// where: {ci: "8932449"},
												include: [
													{
														model: Clase, as: 'pais',
														attributes: ['nombre'],
														required: true
													},
													{
														model: Clase, as: 'genero',
														attributes: ['nombre', 'nombre_corto'],
														required: true
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['aporte_serguro_salud']
							}
						]
					}
				]
			}).then((planilla) => {
				if (!planilla) return res.json({ empleados: [] });
				const data = []
				for (let index = 0; index < planilla.rrhhDetallePlanillaSueldos.length; index++) {
					data.push(planilla.rrhhDetallePlanillaSueldos[index].DetalleFicha.empleado);
					// planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha = 
				}
				res.json({ empleados: data });

			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		});


	router.route('/recursos-humanos/reporte-excel-afp/prevision/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			const fichaincludes = [
				{
					model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
					attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
					include: [
						{
							model: Clase, as: 'motivo',
							attributes: ['id', 'nombre', 'nombre_corto']
						}
					]
				},
				{
					model: Clase, as: 'cargaHorario',
					attributes: ['id'],
					include: [
						{
							model: RrhhEmpresaCargaHorario, as: 'horario'
						}
					]
				},
				{
					model: Clase, as: 'tipoPersonal',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'tipoContrato',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'ubicacion',
					attributes: ['id', 'nombre']
				},
				{
					model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
					attributes: ['id', 'id_discapacidad'],
					include: [
						{
							model: Clase, as: 'discapacidad',
							attributes: ['id', 'nombre'],
							required: false
						}
					],
					required: false
				},
				{
					model: Clase, as: 'aporteSeguroLargoPlazo',
					attributes: ['id', 'nombre']
				},
				{
					model: MedicoPaciente, as: 'empleado',
					// where: {id: {$in:[4697,6451]}},
					attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
					include: [
						{
							model: Clase, as: 'campo',
							attributes: ['nombre']
						},
						{
							model: Clase, as: 'extension',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Clase, as: 'tipoDocumento',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Persona, as: 'persona',
							// where : {apellido_paterno: {$like:'%ORTIZ%'}},// where: { apellido_paterno: { $like: '%EGUEZ%' } },//,// ,// 
							attributes: ['id',
								'nombres',
								'segundo_nombre',
								'apellido_paterno',
								'apellido_materno',
								'nombre_completo',
								'id_pais_nacimiento',
								'ci',
								'fecha_nacimiento',
								'id_genero'
							],
							include: [
								{
									model: Clase, as: 'pais',
									attributes: ['nombre'],
									required: false
								},
								{
									model: Clase, as: 'genero',
									attributes: ['nombre', 'nombre_corto'],
									required: false
								}
							]
						}
					]
				},
				{
					model: RrhhEmpleadoCargo, as: 'cargos',
					attributes: ['id'],
					include: [
						{
							model: Clase, as: "cargo",
							attributes: ['nombre']
						}
					],
					required: false
				}
			]
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			RRHHPlanillaSueldos.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaSueldos, as: 'rrhhDetallePlanillaSueldos',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{
										model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
										attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
										include: [
											{
												model: Clase, as: 'motivo',
												attributes: ['nombre', 'nombre_corto']
											}
										]
									},
									{
										model: Clase, as: 'cargaHorario',
										attributes: ['id'],
										include: [
											{
												model: RrhhEmpresaCargaHorario, as: 'horario'
											}
										]
									},
									{
										model: Clase, as: 'tipoPersonal',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'tipoContrato',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'ubicacion',
										attributes: ['nombre']
									},
									{
										model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
										attributes: ['id_discapacidad'],
										include: [
											{
												model: Clase, as: 'discapacidad',
												attributes: ['nombre']
											}
										]
									},
									{
										model: Clase, as: 'aporteSeguroLargoPlazo',
										attributes: ['nombre'],
										where: { nombre: 'AFP PREVISION' }
									},
									{
										model: Clase, as: 'lugarSeguroSalud',
										attributes: ['nombre']
									},

									{
										model: MedicoPaciente, as: 'empleado',
										attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
										include: [
											{
												model: Clase, as: 'campo',
												attributes: ['nombre']
											},
											{
												model: Clase, as: 'extension',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Clase, as: 'tipoDocumento',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Persona, as: 'persona',
												attributes: [
													'nombres',
													'segundo_nombre',
													'apellido_paterno',
													'apellido_materno',
													'nombre_completo',
													'id_pais_nacimiento',
													'ci',
													'fecha_nacimiento',
													'id_genero'
												],
												include: [
													{
														model: Clase, as: 'pais',
														attributes: ['nombre'],
														required: true
													},
													{
														model: Clase, as: 'genero',
														attributes: ['nombre', 'nombre_corto'],
														required: true
													}
												]
											}
										]
									},
									{
										model: RrhhEmpleadoCargo, as: 'cargos',
										attributes: ['id'],
										include: [
											{
												model: Clase, as: "cargo",
												attributes: ['nombre']
											}
										]
									}
								]
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['aporte_serguro_salud']
							}
						]
					}
				]
			}).then((planilla) => {
				const cabeceraReporte = [
					"Nº", //#1
					"TIPO DOC.", //#2
					"NÚMERO DOCUMENTO", //#3
					"ALFANUMERICO DEL DOCUMENTO", //#4
					"NUA/CUA", //#5
					"AP. PATERNO", //#6
					"AP. MATERNO", //#7
					"AP. CASADA", //#8
					"PRIMER NOMBRE", //#9
					"SEG. NOMBRE", //#10
					"NOVEDAD I/R/L/S", //# 11
					"FECHA NOVEDAD", //#12
					"DÍAS", //#13
					"TOTAL GANADO", //#14
					"TIPO COTIZANTE", //#15
					"TIPO ASEGURADO", //#16
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.rrhhDetallePlanillaSueldos.length || 0; index++) {
					const indx = index
					console.log(indx)
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.empleado.id,
							activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null
						const columna = reporteAFPPREVISION(planilla, indx, errors, ficha__, warnings);
						if (columna) {
							data.push(columna)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.rrhhDetallePlanillaSueldos.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
							for (let index = 0; index < data.length; index++) {
								if (index > 0) data[index][0] = '' + index

							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					})
				}
			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		})

	function reporteAFPPREVISION(planilla, index, errors, ficha, warnings) {
		console.log(index)
		const ficha___ = ficha && ficha || planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues
		const nombre_afp = planilla.rrhhDetallePlanillaSueldos[index].DetalleFicha.aporteSeguroLargoPlazo && planilla.rrhhDetallePlanillaSueldos[index].DetalleFicha.aporteSeguroLargoPlazo.nombre || ''
		if (nombre_afp !== 'AFP PREVISION') return
		const columns = [];
		const _indx = index + 1;
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		const ci = ficha___.empleado.persona.ci.trim().split('-');
		columns.push(ficha___.empleado.tipoDocumento.nombre_corto.trim()); // Tipo de documento de identidad
		// # 3
		columns.push(ci && ci[0] && ci[0] || '' || ''); // Número de documento de identidad
		// # 4
		columns.push(ci && ci[1] && ci[1] || '' || ''); // Alfanúmerico
		// # 5
		const nua = (ficha___.nua_seguro_largo_plazo !== null && ficha___.nua_seguro_largo_plazo !== '' ? ficha___.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {

			const persona_ = ficha___.empleado.persona;
			errors.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: red;">El número NUA/CUA parece inválido.<p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 6
		if (!ficha___.empleado.persona.apellido_paterno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_paterno = ficha___.empleado.persona.apellido_paterno && ficha___.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!ficha___.empleado.persona.apellido_materno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = ficha___.empleado.persona.apellido_materno && ficha___.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		// if (!ficha___.empleado.persona.apellido_casada) {
		// 	warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido de casada </p>' });
		// 	// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido de casada.
		// }
		const apellido_casada = ficha___.empleado.persona.apellido_casada && ficha___.empleado.persona.apellido_casada.trim() || '';
		columns.push(apellido_casada.trim())
		// # 9
		const primer_nombre = ficha___.empleado.persona.nombres && ficha___.empleado.persona.nombres.trim() || '';// [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!ficha___.empleado.persona.nombres) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Primer Nombre </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		columns.push(primer_nombre.trim()); // Nombres
		// # 10
		const segundo_nombre = ficha___.empleado.persona.segundo_nombre && ficha___.empleado.persona.segundo_nombre.trim() || '';// [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!ficha___.empleado.persona.segundo_nombre) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Segundo Nombre </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este falte.
		}
		columns.push(segundo_nombre.trim()); // Nombres
		// # 11
		// columns.push(ficha___.lugarSeguroSalud.nombre.trim());
		const fecha_inicio_ = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio || null;
		const fecha_expiracion_ = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = parseInt(planilla.mes.split('-')[0]);
		const _anio_planilla = parseInt(planilla.anio);
		const novedad = (((fecha_inicio_ ? fecha_inicio_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_inicio_.getFullYear() ? 'I' : (fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_expiracion_.getFullYear() ? 'R' : '') || '');
		columns.push(novedad);
		// # 12
		columns.push(novedad && (novedad === 'I' ? fechaATexto(fecha_inicio_, true) : fechaATexto(fecha_expiracion_, true)) || ''); // Fecha de retiro
		// # 13
		const diasTrabajadosPorMes = planilla.rrhhDetallePlanillaSueldos[index].dt && parseInt(planilla.rrhhDetallePlanillaSueldos[index].dt) + '' || '30';
		columns.push(diasTrabajadosPorMes);
		// # 14
		columns.push(planilla.rrhhDetallePlanillaSueldos[index].total_ganado && planilla.rrhhDetallePlanillaSueldos[index].total_ganado.toFixed(2) || '0')
		// # 15
		let tipo_asegurado = '';
		const edadTrabajador = ficha___.empleado && ficha___.empleado.persona.fecha_nacimiento && getAge(ficha___.empleado.persona.fecha_nacimiento) || 0;
		if (edadTrabajador) {
			if (edadTrabajador < 65 && !ficha___.jubilacion) {
				tipo_asegurado = '1';
			}
			if (edadTrabajador < 65 && ficha___.jubilacion) {
				tipo_asegurado = 'C';
			}
			if (edadTrabajador >= 65 && !ficha___.jubilacion) {
				tipo_asegurado = '8';
			}
			if (edadTrabajador >= 65 && ficha___.jubilacion) {
				tipo_asegurado = 'D';
			}
		}
		columns.push(tipo_asegurado);
		// # 16
		columns.push('')
		// columns.push(edadTrabajador)
		return columns;
	}
	function getAge(dateString, datePlanilla) {
		const today = datePlanilla?new Date(datePlanilla): new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
	function timestrToSec(timestr) {
		var parts = timestr.split(":");
		return (parts[0] * 3600) +
			(parts[1] * 60) +
			(+parts[2]);
	}

	function pad(num) {
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	}

	function formatTime(seconds) {
		return [pad(Math.floor(seconds / 3600)),
		pad(Math.floor(seconds / 60) % 60),
		pad(seconds % 60),
		].join(":");
	}

	function timeDiff(start, end) {
		start = start.split(":");
		end = end.split(":");
		var startDate = new Date(0, 0, 0, start[0], start[1], 0);
		var endDate = new Date(0, 0, 0, end[0], end[1], 0);
		var diff = endDate.getTime() - startDate.getTime();
		var hours = Math.floor(diff / 1000 / 60 / 60);
		diff -= hours * 1000 * 60 * 60;
		var minutes = Math.floor(diff / 1000 / 60);

		// If using time pickers with 24 hours format, add the below line get exact hours
		if (hours < 0) {
			hours = hours + 24;
		}
		return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
	}

	//tr3 planilla sueldos
	router.route('/planilla-sueldo/tr3/empresa/:id_empresa')
		.post(async function (req, res) {
			let transaction;
			let total = 0
			try {
				transaction = await sequelize.transaction();
				//crear tr3
				const tr3Creado = await RrhhEmpleadoTr3.create({
					id_empresa: req.params.id_empresa,
					id_cuenta: req.body.id_cuenta,
					fecha: req.body.fecha,
					fecha_elaboracion: req.body.fecha_elaboracion,
					planilla: req.body.planilla.toString(),
					id_departamento: req.body.id_departamento,
					nombre_archivo: req.body.nombre_archivo,
					nombre_planilla: req.body.nombre_planilla,
					numero_planilla: req.body.numero_planilla,
					origen_fondos: req.body.origen_fondos,
					destino_fondos: req.body.destino_fondos,
					dirigido_para: req.body.dirigido_para,
					cargo: req.body.cargo,
					firma_uno: req.body.firma_uno,
					firma_dos: req.body.firma_dos,
					firma_tres: req.body.firma_tres,
					firma_cuatro: req.body.firma_cuatro,
					aumentar_ceros: req.body.aumentar_ceros ? req.body.aumentar_ceros : false
				}, { transaction }).catch(function (err) {
					return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
				});
				//buscar tr3 con sus conceptos includos
				let tr3Encontrado = await RrhhEmpleadoTr3.find({
					where: { id: tr3Creado.id },
					include: [{ model: Banco, as: 'cuenta' }, { model: Clase, as: 'departamento' }],
					transaction
				}).catch(function (err) {
					return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
				})

				//recorrer planilla de sueldos para asignar entrega de tr3
				if (req.body.planillasSueldo.length > 0) {
					for (let index = 0; index < req.body.planillasSueldo.length; index++) {
						const planillaSueldo = req.body.planillasSueldo[index]
						if (!planillaSueldo.entregado_tr3) {
							total += planillaSueldo.liquido_pagable
							await RRHHDetallePlanillaSueldos.update({
								entrego_tr3: true
							}, {
								where: { id: planillaSueldo.id },
								transaction
							}).catch(function (err) {
								return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
							})
							await RrhhEmpleadoPlanillaSueldoTr3.create({
								id_planilla_sueldo: planillaSueldo.id,
								id_tr3: tr3Encontrado.id
							}, { transaction }).catch(function (err) {
								return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
							})
						}
					}
				}
				let datosPlanillaMes = await RRHHPlanillaSueldos.find({
					where: { id: req.body.planillasSueldo[0].planilla }
				})
				tr3Encontrado = await RrhhEmpleadoTr3.find({
					where: { id: tr3Creado.id },
					include: [{
						model: RrhhEmpleadoPlanillaSueldoTr3, required: true, as: 'historialPlanillaSueldoTr3',
						include: [{
							model: RRHHDetallePlanillaSueldos, required: true, as: 'planillaSueldo',
							include: [{
								model: RRHHPlanillaSueldos, as: "rrhhPlanilla"
							}, {
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [{
									model: MedicoPaciente, as: 'empleado',
									include: [{ model: Persona, as: 'persona' }]
								}]
							}]
						}]
					}, { model: Banco, as: 'cuenta' }, { model: Clase, as: 'departamento' }],
					order: sequelize.literal("apellido_paterno asc"),
					transaction
				}).catch(function (err) {
					return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
				})
				await transaction.commit();
				res.json({
					mensaje: "Tr3 creado satisfactoriamente!",
					planillasSueldo: req.body.planillasSueldo,
					tipo: req.body.tipo,
					tr3Encontrado: tr3Encontrado, total: total,
					datosPlanillaMes: datosPlanillaMes,
					fecha_elaboracion: req.body.fecha_elaboracion,
				})
			} catch (err) {
				// Rollback transaction only if the transaction object is defined
				if (transaction) await transaction.rollback();
				var error = (err.stack) ? err.stack : err
				res.json({ hasError: true, mensaje: error });
			}
		})
	router.route('/planilla-sueldo/tr3/empresa/:id_empresa/banco/:nombre')
		.get(ensureAuthorizedlogged, function (req, res) {
			RrhhEmpleadoTr3.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{
					model: RrhhEmpleadoPlanillaSueldoTr3, required: true, as: 'historialPlanillaSueldoTr3',
					include: [{
						model: RRHHDetallePlanillaSueldos, required: true, as: 'planillaSueldo',
						include: [{
							model: RRHHPlanillaSueldos, as: "rrhhPlanilla"
						}, {
							model: RrhhEmpleadoFicha, as: 'DetalleFicha',
							include: [{
								model: MedicoPaciente, as: 'empleado',
								include: [{ model: Persona, as: 'persona' }]
							}]
						}]
					}]
				},
				{ model: Banco, as: 'cuenta', where: { nombre: req.params.nombre } },
				{ model: Clase, as: 'departamento' }],
				order: sequelize.literal("apellido_paterno asc")
			}).then(function (params) {
				res.json(params)
			}).catch(function (err) {
				console.log(err)
			});
		})
//tr3 planilla sueldos
router.route('/planilla-aguinaldo/tr3/empresa/:id_empresa')
.post(async function (req, res) {
	let transaction;
	let total = 0
	try {
		transaction = await sequelize.transaction();
		//crear tr3
		const tr3Creado = await RrhhEmpleadoTr3.create({
			id_empresa: req.params.id_empresa,
			id_cuenta: req.body.id_cuenta,
			fecha: req.body.fecha,
			fecha_elaboracion: req.body.fecha_elaboracion,
			planilla: req.body.planilla.toString(),
			id_departamento: req.body.id_departamento,
			nombre_archivo: req.body.nombre_archivo,
			nombre_planilla: req.body.nombre_planilla,
			numero_planilla: req.body.numero_planilla,
			origen_fondos: req.body.origen_fondos,
			destino_fondos: req.body.destino_fondos,
			dirigido_para: req.body.dirigido_para,
			cargo: req.body.cargo,
			firma_uno: req.body.firma_uno,
			firma_dos: req.body.firma_dos,
			firma_tres: req.body.firma_tres,
			firma_cuatro: req.body.firma_cuatro,
			aumentar_ceros: req.body.aumentar_ceros ? req.body.aumentar_ceros : false
		}, { transaction }).catch(function (err) {
			return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
		});
		//buscar tr3 con sus conceptos includos
		let tr3Encontrado = await RrhhEmpleadoTr3.find({
			where: { id: tr3Creado.id },
			include: [{ model: Banco, as: 'cuenta' }, { model: Clase, as: 'departamento' }],
			transaction
		}).catch(function (err) {
			return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
		})

		//recorrer planilla de Aguinaldos para asignar entrega de tr3
		if (req.body.planillasAguinaldo.length > 0) {
			for (let index = 0; index < req.body.planillasAguinaldo.length; index++) {
				const planillaAguinaldo = req.body.planillasAguinaldo[index]
				if (!planillaAguinaldo.entregado_tr3) {
					total += planillaAguinaldo.liquido_pagable
					await RRHHDetallePlanillaAguinaldos.update({
						entrego_tr3: true
					}, {
						where: { id: planillaAguinaldo.id },
						transaction
					}).catch(function (err) {
						return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
					})
					await RrhhEmpleadoPlanillaAguinaldoTr3.create({
						id_planilla_aguinaldo: planillaAguinaldo.id,
						id_tr3: tr3Encontrado.id
					}, { transaction }).catch(function (err) {
						return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
					})
				}
			}
		}
		let datosPlanillaMes = await RRHHPlanillaAguinaldos.find({
			where: { id: req.body.planillasAguinaldo[0].planilla }
		})
		tr3Encontrado = await RrhhEmpleadoTr3.find({
			where: { id: tr3Creado.id },
			include: [{
				model: RrhhEmpleadoPlanillaAguinaldoTr3, required: true, as: 'historialPlanillaAguinaldoTr3',
				include: [{
					model: RRHHDetallePlanillaAguinaldos, required: true, as: 'planillaAguinaldo',
					include: [{
						model: RRHHPlanillaAguinaldos, as: "rrhhPlanilla"
					}, {
						model: RrhhEmpleadoFicha, as: 'DetalleFicha',
						include: [{
							model: MedicoPaciente, as: 'empleado',
							include: [{ model: Persona, as: 'persona' }]
						}]
					}]
				}]
			}, { model: Banco, as: 'cuenta' }, { model: Clase, as: 'departamento' }],
			order: sequelize.literal("apellido_paterno asc"),
			transaction
		}).catch(function (err) {
			return new Promise((resol, reject) => reject((err.stack !== undefined) ? err.stack : err))
		})
		await transaction.commit();
		res.json({
			mensaje: "Tr3 creado satisfactoriamente!",
			planillasAguinaldo: req.body.planillasAguinaldo,
			tipo: req.body.tipo,
			tr3Encontrado: tr3Encontrado, total: total,
			datosPlanillaMes: datosPlanillaMes,
			fecha_elaboracion: req.body.fecha_elaboracion,
		})
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) await transaction.rollback();
		var error = (err.stack) ? err.stack : err
		res.json({ hasError: true, mensaje: error });
	}
})
router.route('/planilla-aguinaldo/tr3/empresa/:id_empresa/banco/:nombre')
.get(ensureAuthorizedlogged, function (req, res) {
	RrhhEmpleadoTr3.findAll({
		where: { id_empresa: req.params.id_empresa },
		include: [{
			model: RrhhEmpleadoPlanillaAguinaldoTr3, required: true, as: 'historialPlanillaAguinaldoTr3',
			include: [{
				model: RRHHDetallePlanillaAguinaldos, required: true, as: 'planillaAguinaldo',
				include: [{
					model: RRHHPlanillaAguinaldos, as: "rrhhPlanilla"
				}, {
					model: RrhhEmpleadoFicha, as: 'DetalleFicha',
					include: [{
						model: MedicoPaciente, as: 'empleado',
						include: [{ model: Persona, as: 'persona' }]
					}]
				}]
			}]
		},
		{ model: Banco, as: 'cuenta', where: { nombre: req.params.nombre } },
		{ model: Clase, as: 'departamento' }],
		order: sequelize.literal("apellido_paterno asc")
	}).then(function (params) {
		res.json(params)
	}).catch(function (err) {
		console.log(err)
	});
})

	router.route('/planilla-sueldos/generar-planilla-aguinaldo/gestion/:gestion/dias/:dias/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {

			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth();
			var day = d.getDate();
			// controlar que la fecha de diciembre hacia atras
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, 12, 0, 23, 59, 59));
			ultimoDiaUtc.setDate(ultimoDiaUtc.getDate() - Number(req.params.dias));

			// var diaPlanilla = new Date(planilla.gestion, 11, 30, 23, 59, 59);
			// === corregir fecha formato
			var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDia = new Date(Date.UTC(req.params.gestion, month, day, 0, 0, 0));
			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
			console.log(primerDiaMes);

			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion, mes: { $in: ["9-SEPTIEMBRE", "10-OCTUBRE", "11-NOVIEMBRE"] } };

			// Object.keys(Customer.attributes).concat([[sequelize.fn('sum', sequelize.col('total_ganado')), 'sumaTotalGanado']]).concat([[sequelize.fn('sum', sequelize.col('total_ganado')), 'sumaTotalGanado']])

			// cambiar filtro por ficha del empleado
			RRHHPlanillaSueldos.find({
				where: {
					anio: req.params.gestion,
					mes: "11-NOVIEMBRE",
					id_empresa: req.params.id_empresa
				}
			}).then(function (planillaNoviembre) {
				if (planillaNoviembre) {
					RrhhEmpleadoFicha.findAll({
						where: Sequelize.literal("IFNULL(agil_rrhh_empleado_ficha.fecha_expiracion, '" + primerDiaMes + "') >= '" + primerDiaMes + "'AND agil_rrhh_empleado_ficha.fecha_inicio < '" + ultimoDiaMes + "'"),
						include: [
							{
								model: RRHHDetallePlanillaSueldos, as: 'rrhhDetalleSueldos',
								include: [
									{
										model: RRHHPlanillaSueldos, as: "rrhhPlanilla",
										where: condicionPlanilla
									}
								]
							},
							{
								model: MedicoPaciente, as: 'empleado',
								attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
								include: [
									{
										model: Clase, as: 'campo',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'extension',
										attributes: ['nombre_corto'],
										required: true
									},
									{
										model: Clase, as: 'tipoDocumento',
										attributes: ['nombre_corto'],
										required: true
									},
									{
										model: Persona, as: 'persona',
										attributes: [
											'nombres',
											'segundo_nombre',
											'apellido_paterno',
											'apellido_materno',
											'apellido_casada',
											'nombre_completo',
											'direccion_zona',
											'id_pais_nacimiento',
											'ci',
											'fecha_nacimiento',
											'id_genero'
										],
										include: [
											{
												model: Clase, as: 'pais',
												attributes: ['nombre'],
												required: true
											},
											{
												model: Clase, as: 'genero',
												attributes: ['nombre', 'nombre_corto'],
												required: true
											}
										]
									}
								]
							},
							{ model: Clase, as: 'banco' },
							{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }
						]
					}).then(function (planillas) {
						res.json({ empleados: planillas, error: false });
					});
				} else {
					res.json({ mensaje: "No tiene la planilla de sueldos de Noviembre " + req.params.gestion, error: true });
				}
			});
		});

	router.route('/planilla-sueldos/verificar-tr3/planilla/:id_planilla/banco/:id_banco')
		.get(ensureAuthorizedlogged, function (req, res) {
			RrhhEmpleadoTr3.find({
				where: { id_cuenta: req.params.id_banco },
				include: [{
					model: RrhhEmpleadoPlanillaSueldoTr3, required: true, as: 'historialPlanillaSueldoTr3',
					include: [{
						model: RRHHDetallePlanillaSueldos, required: true, as: 'planillaSueldo',
						include: [{
							model: RRHHPlanillaSueldos, required: true, as: 'rrhhPlanilla',
							where: { id: req.params.id_planilla }
						}]
					}]
				}]
			}).then(function (encontrado) {
				res.json({ registroEncontrado: encontrado })
			});
		});
		router.route('/planilla-aguinaldo/verificar-tr3/planilla/:id_planilla/banco/:id_banco')
		.get(ensureAuthorizedlogged, function (req, res) {
			RrhhEmpleadoTr3.find({
				where: { id_cuenta: req.params.id_banco },
				include: [{
					model: RrhhEmpleadoPlanillaAguinaldoTr3, required: true, as: 'historialPlanillaAguinaldoTr3',
					include: [{
						model: RRHHDetallePlanillaAguinaldos, required: true, as: 'planillaAguinaldo',
						include: [{
							model: RRHHPlanillaAguinaldos, required: true, as: 'rrhhPlanilla',
							where: { id: req.params.id_planilla }
						}]
					}]
				}]
			}).then(function (encontrado) {
				res.json({ registroEncontrado: encontrado })
			});
		});
	router.route('/rrhh-planilla-aguinaldos/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			console.log('los datos recibidos', planillas);
			RRHHPlanillaAguinaldos.create({
				id_empresa: req.body.id_empresa,
				anio: req.body.gestion,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_horas_extras: req.body.importe_horas_extras,
				importe_recargo_nocturno: req.body.importe_recargo_nocturno,
				importe_bono_antiguedad: req.body.importe_bono_antiguedad,
				importe_bono_frontera: req.body.importe_bono_frontera,
				importe_otros_bonos: req.body.importe_otros_bonos,
				importe_total_ganado: req.body.importe_total_ganado,
				total_dias_trabajados: req.body.total_dias_trabajados,
				importe_liquido_pagable: req.body.importe_liquido_pagable
			}).then(function (planillaCreado) {
				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					crearDetallePlanillaAguinaldos(res, planillaCreado, detallePlanilla);
					if (index === (array.length - 1)) {
						res.json(planillaCreado);
					}
				});


			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaSueldos.update({
				total_empleados: req.body.total_empleados,
				total: req.body.total,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.importe_horas_extras,
				importe_horas_extras: req.body.total_horas_extras,
				importe_recargo_nocturno: req.body.importe_recargo_nocturno,
				importe_bono_antiguedad: req.body.importe_bono_antiguedad,
				importe_bono_frontera: req.body.importe_bono_frontera,
				importe_otros_bonos: req.body.importe_otros_bonos,
				importe_total_ganado: req.body.importe_total_ganado,
				importe_afp: req.body.importe_afp,
				importe_rc_iva: req.body.importe_rc_iva,
				importe_anticipos: req.body.importe_anticipos,
				importe_prestamos: req.body.importe_prestamos,
				importe_total_descuento: req.body.importe_total_descuento,
				importe_liquido_pagable: req.body.importe_liquido_pagable
			}, {
				where: { id: req.body.id }
			}).then(function (planillaActualizado) {
				planillas.detalles.forEach(function (detallePlanilla, index, array) {
					EditarDetallePlanillaSueldos(detallePlanilla);
				});
				res.json({ "mensaje": "Actualizado Satisfactoriamente!" });
			})
		});

	function crearDetallePlanillaAguinaldos(res, planilla, detallePlanilla) {
		RRHHDetallePlanillaAguinaldos.create({
			planilla: planilla.id,
			ficha: detallePlanilla.id_ficha,
			promedio_basico: detallePlanilla.promedio_basico,
			prom_horas_extras: detallePlanilla.prom_horas_extras,
			prom_recargo_nocturno: detallePlanilla.prom_recargo_nocturno,
			prom_bono_antiguedad: detallePlanilla.prom_bono_antiguedad,
			prom_bono_frontera: detallePlanilla.prom_bono_frontera,
			prom_otros_bonos: detallePlanilla.prom_otros_bonos,
			prom_total_ganado: detallePlanilla.prom_total_ganado,
			dias_trabajados: detallePlanilla.dias_trabajados,
			liquido_pagable: detallePlanilla.liquido_pagable
		}).then(function (detalleAguinaldoCreado) {
			// guardando la relacion de planilla de aguinaldo con el de sueldos
			detallePlanilla.rrhhDetalleSueldos.forEach(function (detalle, index, array) {
				RRHHAguinaldoPlanillaSueldo.create({
					id_detalle_aguinaldo: detalleAguinaldoCreado.id,
					id_detalle_sueldo: detalle.id
				}).then(function (detalles) {

				})

			});
		});
	}

	router.route('/rrhh-planilla-aguinaldos/:id_empresa/gestion/:gestion')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };

			RRHHPlanillaAguinaldos.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/rrhh-planilla-aguinaldos/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaAguinaldos.findAll({
				where: { planilla: req.params.id_planilla },
				include: [
					{
						model: RrhhEmpleadoFicha, as: 'DetalleFicha',
						include: [
							{ model: Clase, as: 'area' },
							{ model: Clase, as: 'banco' },
							{
								model: MedicoPaciente, as: 'empleado',
								include: [
									{ model: Clase, as: 'extension' },
									{ model: Clase, as: 'campo' },
									{ model: Persona, as: 'persona' }
								]
							},
							{ model: Clase, as: 'lugarSeguroSalud' },
							{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
							{ model: Clase, as: 'ubicacion' }
						]
					},
					{
						model: RRHHAguinaldoPlanillaSueldo, as: 'detalleSueldos',
						include: [
							{
								model: RRHHDetallePlanillaSueldos, as: 'sueldo',
								include: [{ model: RRHHPlanillaSueldos, as: 'rrhhPlanilla' }]
							}
						]
					}
				]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/recursos-humanos/reporte-excel-ovt/aguinaldos/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			const fichaincludes = [
				{
					model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
					attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
					include: [
						{
							model: Clase, as: 'motivo',
							attributes: ['id', 'nombre', 'nombre_corto']
						}
					]
				},
				{
					model: Clase, as: 'cargaHorario',
					attributes: ['id'],
					include: [
						{
							model: RrhhEmpresaCargaHorario, as: 'horario'
						}
					]
				},
				{
					model: Clase, as: 'tipoPersonal',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'tipoContrato',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'ubicacion',
					attributes: ['id', 'nombre']
				},
				{
					model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
					attributes: ['id', 'id_discapacidad'],
					include: [
						{
							model: Clase, as: 'discapacidad',
							attributes: ['id', 'nombre'],
							required: false
						}
					],
					required: false
				},
				{
					model: Clase, as: 'aporteSeguroLargoPlazo',
					attributes: ['id', 'nombre']
				},
				{
					model: MedicoPaciente, as: 'empleado',
					// where: {id: {$in:[4697,6451]}},
					attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
					include: [
						{
							model: Clase, as: 'campo',
							attributes: ['nombre']
						},
						{
							model: Clase, as: 'extension',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Clase, as: 'tipoDocumento',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Persona, as: 'persona',
							// where : {apellido_paterno: {$like:'%ORTIZ%'}},// where: { apellido_paterno: { $like: '%EGUEZ%' } },//,// ,// 
							attributes: ['id',
								'nombres',
								'segundo_nombre',
								'apellido_paterno',
								'apellido_materno',
								'nombre_completo',
								'id_pais_nacimiento',
								'ci',
								'fecha_nacimiento',
								'id_genero'
							],
							include: [
								{
									model: Clase, as: 'pais',
									attributes: ['nombre'],
									required: false
								},
								{
									model: Clase, as: 'genero',
									attributes: ['nombre', 'nombre_corto'],
									required: false
								}
							]
						}
					]
				},
				{
					model: RrhhEmpleadoCargo, as: 'cargos',
					attributes: ['id'],
					include: [
						{
							model: Clase, as: "cargo",
							attributes: ['nombre']
						}
					],
					required: false
				}
			]
			RRHHPlanillaAguinaldos.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaAguinaldos, as: 'rrhhDetallePlanillaAguinaldos',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: fichaincludes
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['id', 'aporte_serguro_salud']
							}
						]
					}
				],
				order: sequelize.literal("apellido_paterno asc, apellido_materno asc, nombres asc, segundo_nombre asc")
			}).then((planilla) => {
				if (!planilla) return res.json({ mensaje: 'No se encontró información de la planilla.', reporte: [], errors: [], warnings: [], total: 0, hasErr: true });
				const cabeceraReporte = [
					"Nro",
					"Tipo de documento de identidad",
					"Número de documento de identidad",
					"Lugar de expedición",
					"Fecha de nacimiento",
					"Apellido Paterno",
					"Apellido Materno",
					"Nombres",
					"País de nacionalidad",
					"Sexo",
					"Jubilado",
					"¿Aporta a la AFP?",
					"¿Persona con discapacidad?",
					"Tutor de persona con discapacidad",
					"Fecha de ingreso",
					"Fecha de retiro",
					"Motivo retiro",
					"Caja de salud",
					"AFP a la que aporta",
					"NUA/CUA",
					"Sucursal o ubicación adicional",
					"Clasificación laboral",
					"Cargo",
					"Modalidad de contrato", //#24
					"Promedio haber básico",
					"Promedio bono de antigüedad",
					"Promedio bono producción",
					"Promedio subsidio frontera",
					"Promedio trabajo extraordinario y nocturno",
					"Promedio pago dominical trabajado",
					"Promedio otros bonos",
					"Promedio total ganado",
					"Meses trabajados",
					"Total ganado después de duodécimas"
					// "Tipo contrato",
					// "Días pagados",
					// "Horas pagadas",
					// "Haber Básico",
					// "Bono de antigüedad",
					// "Horas extra",
					// "Monto horas extra",
					// "Horas recargo nocturno",
					// "Monto horas extra nocturnas",
					// "Horas extra dominicales",
					// "Monto horas extra dominicales",
					// "Domingos trabajados",
					// "Monto domingo trabajado",
					// "Nro. dominicales",
					// "Salario dominical",
					// "Bono producción",
					// "Subsidio frontera",
					// "Otros bonos y pagos",
					// "RC-IVA",
					// "Aporte Caja Salud",
					// "Aporte AFP",
					// "Otros descuentos"
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.rrhhDetallePlanillaAguinaldos.length || 0; index++) {
					// if (planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.activo) {
					// 	data.push(reporteOVT(planilla.rrhhDetallePlanillaSueldos[index], data))
					// 	continue
					// }
					const indx = index
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.id,
							activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null;
						const fila = reporteOVTAguinaldos(planilla, indx, errors, ficha__, warnings);
						if (fila) {
							data.push(fila)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.rrhhDetallePlanillaAguinaldos.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors, warnings: warnings, reporte: [] });
							for (let index_ = 0; index_ < data.length; index_++) {
								if (index_ > 0) data[index_][0] = '' + index_
							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					}).catch((err) => {
						res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
					})
					// planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha = 
				}
			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		});

	function reporteOVTAguinaldos(planilla, index, errors, ficha, warnings) {

		const ficha___ = ficha && ficha || planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues
		const columns = [];
		const _indx = index + 1 - errors.length;
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		const tipo_documento = ficha___.empleado && ficha___.empleado.tipoDocumento && ficha___.empleado.tipoDocumento.nombre_corto.trim() || '' || '' || '';
		if (tipo_documento.length > 0) {
			columns.push(tipo_documento);
		} else {
			columns.push(''); // Tipo de documento de identidad
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Tipo de documento: sin asignación.</p>' });
		}
		// # 3
		columns.push(ficha___.empleado.persona.ci.trim()); // Número de documento de identidad
		// # 4
		columns.push(ficha___.empleado.extension.nombre_corto.trim()); // Lugar de expedición (Documento Identficación)
		// # 5
		columns.push(fechaATexto(ficha___.empleado.persona.fecha_nacimiento)); // Fecha de nacimiento (Empleado)
		// # 6
		if (!ficha___.empleado.persona.apellido_paterno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_paterno = ficha___.empleado.persona.apellido_paterno && ficha___.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!ficha___.empleado.persona.apellido_materno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = ficha___.empleado.persona.apellido_materno && ficha___.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		const nombres = [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		columns.push(nombres.trim()); // Nombres
		// # 9
		columns.push(ficha___.empleado.persona.pais.nombre.trim()); // País de nacionalidad
		// # 10
		const genero = (ficha___.empleado.persona.genero.nombre.toUpperCase() === "MASCULINO" ? 'M' : 'F');
		columns.push(genero.trim()); // Sexo (Género)
		// # 11
		const jubilado = ficha___.jubilacion && (ficha___.jubilacion ? '1' : '0') || '0'; // 1 si es true
		columns.push(jubilado); // Jubilado (1 si es jubilado 0 si no es jubilado)
		// # 12
		const aportaAFP = (ficha___.aporteSeguroLargoPlazo ? '1' : '0'); // 1 si existe alguna asignación. si es null o indefinido no existe asignación por tanto 0 (Obligarorio: no debe ser 0)
		if (aportaAFP === '0') {
			errors.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Sin Asignación de aportes AFP. Es obligatorio</p>' });
			return
		}
		columns.push(aportaAFP); // ¿Aporta a la AFP? (1 si aporta)

		// # 14
		const discapacidades_ = ficha___.discapacidades.map((discapacidad) => (discapacidad && discapacidad.discapacidad.nombre ? discapacidad.discapacidad.nombre.toUpperCase() : ''))
		let tutor = '0'
		for (let index = 0; index < discapacidades_.length; index++) {
			if (discapacidades_[index].indexOf('TUTOR') !== -1) {
				tutor = '1'
			}
			if (discapacidades_[index].indexOf('PADRE') !== -1) {
				tutor = '1'
			}
		}
		//// #14 -->// # 13
		const discapacidad = ficha___.discapacidad && (tutor === '0' ? '1' : '0') || '0';
		columns.push(discapacidad); // ¿Persona con discapacidad? si es padre/madre o tutor es 0
		columns.push(tutor); // Tutor de persona con discapacidad
		// # 15
		columns.push(fechaATexto(planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.fecha_inicio)); // Fecha de ingreso
		// # 16 y 17 motivoBeneficio debe verificarse antes para obtener la fecha de retiro.
		//la fecha de retiro se determinó que es la fecha de expiración en la ficha del empleado.
		// const motivoBeneficio = planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.length && planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre !='QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null
		const fecha_expiracion_ = planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = 12
		const _anio_planilla = parseInt(planilla.anio);
		const motivoBeneficio = planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.length && planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre != 'QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null;
		const fechaRetiro = motivoBeneficio && (((fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion.getFullYear() ? fechaATexto(planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.fecha_expiracion) : null) || null); // Sólo en el caso que se retira el empleado en el mes de la planilla.

		// if (motivoBeneficio && fecha_expiracion_ && !fechaRetiro) {
		// 	if (_anio_planilla > fecha_expiracion_.getFullYear() && _mes_planilla > (fecha_expiracion_.getMonth() + 1)) {
		// 		errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Parece que el empleado se retiró antes de la fecha de esta planilla.</p>' });
		// 		return
		// 	}
		// }
		columns.push(fechaRetiro); // Fecha de retiro
		// # 17
		const motivoRetiro = motivoBeneficio && fechaRetiro && motivoBeneficio.motivo.nombre_corto || '';
		columns.push(motivoRetiro); // Motivo retiro (Poner 2 = Vencimiento de contrato)
		// # 18
		columns.push('2'); // Caja de salud (Poner 2 = Caja Petrolera)
		// # 19
		const AFP_aporte = (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.aporteSeguroLargoPlazo ? (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.aporteSeguroLargoPlazo.nombre.toUpperCase().includes('FUTURO') ? '2' : '1') : '0'); // 0 Solo para evitar salten errores (Obligarorio: no debe ser 0)
		if (AFP_aporte === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: No se pudo determinar la AFP a la que aporta. Valores admitidos: 1.PREVISIÓN, 2.FUTURO</p>' });
			return
		}
		columns.push(AFP_aporte); // AFP a la que aporta (Obligatorio: 1 Si es Previsión 2 Futuro)
		// # 20
		const nua = (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== null && planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== '' ? planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: El número NUA/CUA parece inválido.</p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 21
		//Por el momento poner 0 en ubicación.
		columns.push('0'); //columns.push(planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.ubicacion.nombre.trim()); // Sucursal o ubicación adicional
		// # 22
		const tipoPersonal = (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal ? (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal.nombre.trim().toUpperCase() === 'CAMPO' ? '3' : (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoPersonal.nombre.trim().toUpperCase() === 'OFICINA' ? '4' : '0')) : '0');
		if (tipoPersonal === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: Tipo de empleado inválido. Valores Admitidos: CAMPO/OFICINA</p>' });
			return
		}
		columns.push(tipoPersonal); // Clasificación laboral (Campo = 3, Oficina = 4)
		// # 23
		if (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.cargos.length === 0) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">NO incluido: El empleado no tiene un cargo asignado</p>' });
			return
		}
		columns.push(planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.cargos[0].cargo.nombre); // Cargo
		// # 24
		let modalidadContrato = '0';
		if (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato) {
			if (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'INDEFINIDO') modalidadContrato = '1';
			if (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'POR OBRA') modalidadContrato = '4';
			if (planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() === 'EVENTUAL') modalidadContrato = '5';
		} else {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Tipo de contrato sin asignación.</p>' });
			return
		}
		if (modalidadContrato === '0') {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Tipo de contrato ' + planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() + ' es inválido. Valores Admitidos: INDEFINIDO/POR OBRA/EVENTUAL</p>' });
			return
		}
		columns.push(modalidadContrato); // Modalidad de contrato (Indefinido = 1, por obra = 4, Eventual = 5)
		// # 25
		const promedio_haber_basico = planilla.rrhhDetallePlanillaAguinaldos[index].promedio_basico || null;
		if (!promedio_haber_basico) {
			errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Tipo de contrato ' + planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.tipoContrato.nombre.trim().toUpperCase() + ' es inválido. Valores Admitidos: INDEFINIDO/POR OBRA/EVENTUAL</p>' });
			return
		}
		columns.push(promedio_haber_basico); // Promedio haber básico.
		// # 26
		const promedio_bono_antiguedad = planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_antiguedad && planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_antiguedad.toFixed(2) + '' || '';
		columns.push(promedio_bono_antiguedad); // Días pagados
		// # 27
		// const promedioHorasTrabajadasDia = planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_antiguedad && parseInt(planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_antiguedad) + '' || '';
		columns.push(''); // BONO PRODUCCION??
		// # 28
		columns.push(planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_frontera && planilla.rrhhDetallePlanillaAguinaldos[index].prom_bono_frontera + '' || '')//columns.push(planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.haber_basico.toFixed(2)); // Haber Básico
		// # 29
		const prom_hrs_extras = planilla.rrhhDetallePlanillaAguinaldos[index].prom_horas_extras && ((planilla.rrhhDetallePlanillaAguinaldos[index].prom_recargo_nocturno && planilla.rrhhDetallePlanillaAguinaldos[index].prom_recargo_nocturno || 0) + planilla.rrhhDetallePlanillaAguinaldos[index].prom_horas_extras).toFixed(2) || '';
		columns.push(prom_hrs_extras); // Bono de antigüedad
		// # 30
		const pago_dominical = ''//(planilla.rrhhDetallePlanillaAguinaldos[index].horas_extras >= 1 ? planilla.rrhhDetallePlanillaAguinaldos[index].horas_extras : '');
		columns.push(pago_dominical); // Horas extra
		// # 31
		const otros_bonos = planilla.rrhhDetallePlanillaAguinaldos[index].prom_otros_bonos || ''//(planilla.rrhhDetallePlanillaAguinaldos[index].importe_horas_extras > 0 ? planilla.rrhhDetallePlanillaAguinaldos[index].importe_horas_extras.toFixed(2) : '');
		columns.push(otros_bonos); // Monto horas extra
		// # 32
		//importe_recargo_nocturno = (haber_basico / 30 * CantidadnochesRolTurnos) * 35 / 100
		//CantidadnochesRolTurnos = ( importe_recargo_nocturno / (haber_basico / 30) * 35 / 100))
		const prom_total_ganado = planilla.rrhhDetallePlanillaAguinaldos[index].prom_total_ganado || '' //parseInt((planilla.rrhhDetallePlanillaAguinaldos[index].importe_recargo_nocturno / (((planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.haber_basico / 30) * 35) / 100)));
		columns.push(prom_total_ganado) //((calculoHorasExtrasNocturnas < 1 || calculoHorasExtrasNocturnas == 'NaN' || calculoHorasExtrasNocturnas === null) ? '' : '' + calculoHorasExtrasNocturnas)); // Horas recargo nocturno
		// # 33
		const mesesTrabajados = planilla.rrhhDetallePlanillaAguinaldos[index].dias_trabajados / 30  //((planilla.rrhhDetallePlanillaAguinaldos[index].importe_recargo_nocturno && planilla.rrhhDetallePlanillaAguinaldos[index].importe_recargo_nocturno > 0) ? planilla.rrhhDetallePlanillaAguinaldos[index].importe_recargo_nocturno.toFixed(2) : '');
		columns.push(mesesTrabajados.toFixed(2)); // Monto horas extra nocturnas
		// # 34
		// const calculo_duodecimas = planilla.rrhhDetallePlanillaAguinaldos[index].prom_total_ganado / (12 * mesesTrabajados)
		const calculo_duodecimas = (planilla.rrhhDetallePlanillaAguinaldos[index].prom_total_ganado / 12) * mesesTrabajados

		columns.push(calculo_duodecimas); // Horas extra dominicales
		// # 35
		// columns.push(''); // Monto horas extra dominicales
		// // # 36
		// columns.push(''); // Domingos trabajados
		// // # 37
		// columns.push(''); // Monto domingo trabajado
		// // # 38
		// columns.push(''); // Nro. dominicales
		// // # 39
		// columns.push(''); // Salario dominical
		// // # 40
		// columns.push(''); // Bono producción
		// // # 41
		// const bonoFrontera = (planilla.rrhhDetallePlanillaAguinaldos[index].importe_bono_frontera && planilla.rrhhDetallePlanillaAguinaldos[index].importe_bono_frontera >= 1 ? planilla.rrhhDetallePlanillaAguinaldos[index].importe_bono_frontera.toFixed(2) : '');
		// columns.push(bonoFrontera); // Subsidio frontera
		// // # 42
		// const otrosBonos = (planilla.rrhhDetallePlanillaAguinaldos[index].importe_otros_bonos && planilla.rrhhDetallePlanillaAguinaldos[index].importe_otros_bonos >= 1 ? planilla.rrhhDetallePlanillaAguinaldos[index].importe_otros_bonos.toFixed(2) : '');
		// columns.push(otrosBonos); // Otros bonos y pagos
		// // # 43
		// const iva = (planilla.rrhhDetallePlanillaAguinaldos[index].rc_iva && planilla.rrhhDetallePlanillaAguinaldos[index].rc_iva >= 1 ? planilla.rrhhDetallePlanillaAguinaldos[index].rc_iva.toFixed(2) : '0');
		// columns.push(iva); // RC-IVA
		// // # 44
		// const aporteSalud = (planilla.empresa.rrhhParametros.aporte_serguro_salud && planilla.empresa.rrhhParametros.aporte_serguro_salud >= 1 ? (((planilla.empresa.rrhhParametros.aporte_serguro_salud) * planilla.rrhhDetallePlanillaAguinaldos[index].total_ganado) / 100).toFixed(2) : '0');
		// if (aporteSalud === '0') {
		// 	errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Valor invalido para Aporte caja salud</p>' });
		// 	return
		// }
		// columns.push(aporteSalud); // Aporte Caja Salud
		// // # 45
		// // const afp = (planilla.rrhhDetallePlanillaAguinaldos[index].afp && planilla.rrhhDetallePlanillaAguinaldos[index].afp >= 1 ? planilla.rrhhDetallePlanillaAguinaldos[index].afp.toFixed(2) : '0');
		// // if (afp === '0') {
		// // 	errors.push({ nombre_empleado: planilla.dataValues.rrhhDetallePlanillaAguinaldos[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red">Valor invalido para Aporte AFP</p>' });
		// // 	return
		// // }
		// columns.push('afp'); // Aporte AFP
		// // # 46
		// const otrosDescuentos = ((planilla.rrhhDetallePlanillaAguinaldos[index].importe_anticipos && planilla.rrhhDetallePlanillaAguinaldos[index].importe_anticipos || 0) + (planilla.rrhhDetallePlanillaAguinaldos[index].importe_prestamos && planilla.rrhhDetallePlanillaAguinaldos[index].importe_prestamos || 0));
		// columns.push(otrosDescuentos ? otrosDescuentos.toFixed(2) : ''); // Otros descuentos
		return columns
	}

	router.route('/planilla-sueldos/generar-planilla-cargas/empresa/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			// cambiar filtro por ficha del empleado
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			if (req.params.mes != 0) {
				condicionPlanilla.mes = obetenerMesTexto(req.params.mes);
			}

			RRHHPlanillaCargasSociales.find({
				where: {
					anio: req.params.gestion,
					mes: obetenerMesTexto(req.params.mes),
					id_empresa: req.params.id_empresa
				}
			}).then(function (planillaCSExistente) {
				if (!planillaCSExistente) {
					RRHHDetallePlanillaSueldos.findAll({
						include: [
							{
								model: RRHHPlanillaSueldos, as: 'rrhhPlanilla',
								where: condicionPlanilla
							},
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{ model: Clase, as: 'area' },
									{ model: Clase, as: 'banco' },
									{
										model: MedicoPaciente, as: 'empleado',
										include: [
											{ model: Clase, as: 'extension' },
											{ model: Clase, as: 'campo' },
											{ model: Persona, as: 'persona' }
										]
									},
									{ model: Clase, as: 'lugarSeguroSalud' },
									{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
									{ model: Clase, as: 'ubicacion' }
								]
							}
						]
					}).then(function (planillas) {
						res.json({ planillas: planillas, error: false });
					})
				} else {
					res.json({ mensaje: "Ya existe la planilla de Cargas Sociales de " + obetenerMesTexto(req.params.mes).split("-")[1] + " " + req.params.gestion, error: true });
				}
			});
		})
	router.route('/recursos-humanos/sueldo-planilla/mes/:mes/gestion/:gestion/ficha/:id_ficha')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaSueldos.find({
				where: {
					ficha: req.params.id_ficha,
				},
				include: [
					{
						model: RRHHPlanillaSueldos, as: 'rrhhPlanilla',
						where: {
							anio: { $like: "%" + req.params.gestion + "%" },
							mes: obetenerMesTexto(parseInt(req.params.mes) + 1)
						},
					}
				]
			}).then(function (detalle) {
				res.json({ sueldo: detalle.total_ganado });
			}).catch(function (err) {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})


		});

	router.route('/planilla-sueldos/generar-planilla-incrementos/gestion/:gestion/empresa/:id_empresa')
		.get(function (req, res) {

			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth();
			var day = d.getDate();
			// controlar que la fecha de diciembre hacia atras
			// var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, 12, 0, 23, 59, 59));
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, month - 1, day, 23, 59, 59));
			// ultimoDiaUtc.setDate(ultimoDiaUtc.getDate() - Number(req.params.dias));

			// var diaPlanilla = new Date(planilla.gestion, 11, 30, 23, 59, 59);
			// === corregir fecha formato
			var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDia = new Date(Date.UTC(req.params.gestion, month, day, 0, 0, 0));
			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
			console.log(primerDiaMes);
			// cambiar filtro por ficha del empleado
				
			sequelize.query("SELECT DISTINCT \
				agil_medico_paciente.id AS 'id', \
				agil_medico_paciente.es_empleado AS 'es_empleado', \
				agil_medico_paciente.persona AS 'id_persona', \
				agil_medico_paciente.codigo AS 'codigo', \
				agil_medico_paciente.empresa AS 'id_empresa', \
				extencion.nombre_corto AS 'extension', \
				agil_medico_paciente.grupo_sanguineo AS 'grupo_sanguineo', \
				agil_medico_paciente.campo AS 'campo', \
				agil_medico_paciente.designacion_empresa AS 'designacion_empresa', \
				agil_medico_paciente.comentario AS 'comentario', \
				CONCAT_WS(' ', gl_persona.apellido_paterno, gl_persona.apellido_materno, gl_persona.nombres, gl_persona.segundo_nombre) AS 'nombre_completo', \
				gl_persona.apellido_paterno AS 'apellido_paterno', \
				gl_persona.apellido_materno AS 'apellido_materno', \
				estado.nombre AS 'estado', \
				gl_persona.nombres AS 'nombres', \
				gl_persona.direccion_zona AS 'direccion', \
				gl_persona.imagen AS 'imagen', \
				agil_medico_paciente.eliminado AS 'activo', \
				gl_persona.ci AS 'ci', \
				gl_persona.genero AS 'id_genero', \
				gl_persona.telefono AS 'telefono', \
				gl_persona.telefono_movil AS 'telefono_movil', \
				gl_persona.fecha_nacimiento AS 'fecha_nacimiento', \
				campamento.nombre AS 'campamento', \
				fichas.fecha_inicio AS 'fecha_inicio', \
				fichas.fecha_expiracion AS 'fecha_expiracion', \
				fichas.haber_basico AS 'sueldo_basico_ficha', \
				fichas.matricula_seguro AS 'matricula_seguro', \
				fichas.id AS 'id_ficha', \
				fichas.jubilacion AS 'jubilacion', \
				fichas.total_ganado_fijo AS 'total_ganado_fijo', \
				fichas.monto_total_ganado AS 'monto_total_ganado', \
				fichas.bono_dias AS 'bono_dias', \
				fichas.costo_campo AS 'costo_campo', \
				fichas.costo_descanso AS 'costo_descanso', \
				fichas.codigo_tributario AS 'codigo_tributario', \
				banco.nombre AS 'nombre_banco', \
				fichas.numero_cuenta AS 'numero_cuenta', \
				fichas.horas_extra_dia_campo AS 'horas_extra_dia_campo', \
				fichas.horas_campo AS 'horas_campo', \
				contrato.nombre AS 'tipoContrato', \
				IFNULL(rrhhDetallePlanillaSueldos.importe_sueldo_basico, fichas.haber_basico) AS 'sueldo_basico_planilla', \
				rrhhDetallePlanillaSueldos.total_ganado AS 'total_ganado', \
				area.nombre AS 'area', \
				GROUP_CONCAT(`cargos.cargo`.nombre ORDER BY `cargos.cargo`.id) cargos, \
				lugar_seguro_salud.nombre AS 'lugar_seguro_salud', \
				IFNULL(empleado_otros_bonos.monto_otro_bonos, 0) AS 'monto_otro_bonos' \
			FROM \
			agil_medico_paciente \
			JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id = ( \
				SELECT agil_rrhh_empleado_ficha.id FROM agil_rrhh_empleado_ficha WHERE agil_rrhh_empleado_ficha.id_empleado = agil_medico_paciente.id AND agil_rrhh_empleado_ficha.fecha_inicio < '"+ ultimoDiaMes + "' \
				ORDER BY agil_rrhh_empleado_ficha.id DESC LIMIT 1 \
			)\
			LEFT JOIN agil_rrhh_detalle_planilla_sueldos AS rrhhDetallePlanillaSueldos ON rrhhDetallePlanillaSueldos.id = ( \
				SELECT agil_rrhh_detalle_planilla_sueldos.id FROM agil_rrhh_detalle_planilla_sueldos WHERE agil_rrhh_detalle_planilla_sueldos.ficha = fichas.id ORDER BY agil_rrhh_detalle_planilla_sueldos.id DESC LIMIT 1 \
			)\
			LEFT JOIN(SELECT ficha, SUM(monto) AS monto_otro_bonos FROM agil_rrhh_empleado_otros_bonos WHERE fecha BETWEEN '"+ primerDiaMes + "'  \
				AND '" + ultimoDiaMes + "'\
				GROUP BY ficha) AS empleado_otros_bonos ON empleado_otros_bonos.ficha = fichas.id \
			LEFT JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id \
			LEFT JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha \
			LEFT OUTER JOIN gl_clase AS `cargos.cargo` \
			ON cargos.cargo = `cargos.cargo`.id \
			LEFT JOIN gl_persona ON(agil_medico_paciente.persona = gl_persona.id) \
			LEFT JOIN gl_clase AS extencion ON agil_medico_paciente.extension = extencion.id \
			LEFT JOIN gl_clase AS estado ON gl_persona.estado_civil = estado.id \
			LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id \
			LEFT JOIN gl_clase AS campamento ON agil_medico_paciente.campo = campamento.id \
			LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id \
			LEFT JOIN gl_clase AS area ON fichas.area = area.id \
			WHERE \
			agil_medico_paciente.empresa = "+ req.params.id_empresa + " \
			AND agil_medico_paciente.es_empleado = TRUE \
			AND agil_medico_paciente.regularizado = TRUE \
			AND IFNULL(fichas.fecha_expiracion, '" + primerDiaMes + "') >= '" + primerDiaMes + "' \
			GROUP BY \
			agil_medico_paciente.id", { type: sequelize.QueryTypes.SELECT }).then(function (planillas) {
				res.json({ empleados: planillas, error: false });
			});
				
		
		});
	
	router.route('/rrhh-planilla-incrementos/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			console.log('los datos recibidos', planillas);
			RRHHPlanillaIncrementos.create({
				id_empresa: req.body.id_empresa,
				anio: req.body.gestion,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_incrementos:  req.body.importe_incrementos,
				importe_incremento_adicional: req.body.importe_incremento_adicional,
				importe_nuevo_sueldo: req.body.importe_nuevo_sueldo
			}).then(function (planillaCreado) {
				// for para guardar los detalles de las planillas ==================
				planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
					crearDetallePlanillaincrementos(res, planillaCreado, detallePlanilla);
					if (index === (array.length - 1)) {
						res.json(planillaCreado);
					}
				});


			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaIncrementos.update({
				total_empleados: req.body.total_empleados,
				total: req.body.total,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.importe_horas_extras,
				importe_horas_extras: req.body.total_horas_extras,
				importe_recargo_nocturno: req.body.importe_recargo_nocturno,
				importe_bono_antiguedad: req.body.importe_bono_antiguedad,
				importe_bono_frontera: req.body.importe_bono_frontera,
				importe_otros_bonos: req.body.importe_otros_bonos,
				importe_total_ganado: req.body.importe_total_ganado,
				importe_afp: req.body.importe_afp,
				importe_rc_iva: req.body.importe_rc_iva,
				importe_anticipos: req.body.importe_anticipos,
				importe_prestamos: req.body.importe_prestamos,
				importe_total_descuento: req.body.importe_total_descuento,
				importe_liquido_pagable: req.body.importe_liquido_pagable
			}, {
				where: { id: req.body.id }
			}).then(function (planillaActualizado) {
				planillas.detalles.forEach(function (detallePlanilla, index, array) {
					EditarDetallePlanillaSueldos(detallePlanilla);
				});
				res.json({ "mensaje": "Actualizado Satisfactoriamente!" });
			})
		});

	function crearDetallePlanillaincrementos(res, planilla, detallePlanilla) {
		RRHHDetallePlanillaIncrementos.create({
			planilla: planilla.id,
			ficha: detallePlanilla.id_ficha,
			sueldo_basico: detallePlanilla.sueldo_basico_planilla,
			incremento_salarial: detallePlanilla.incremento,
			incremento_adicional: detallePlanilla.incremnto_adicional,
			nuevo_sueldo: detallePlanilla.nuevo_sueldo,
			sueldo_basico_ficha: detallePlanilla.sueldo_basico_ficha
		}).then(function (detalleAguinaldoCreado) {
			// guardando la relacion de planilla de aguinaldo con el de sueldos
			// detallePlanilla.rrhhDetalleSueldos.forEach(function (detalle, index, array) {
			// 	RRHHAguinaldoPlanillaSueldo.create({
			// 		id_detalle_aguinaldo: detalleAguinaldoCreado.id,
			// 		id_detalle_sueldo: detalle.id
			// 	}).then(function (detalles) {

			// 	})

			// });
		});
	}

	router.route('/rrhh-planilla-incrementos/:id_empresa/gestion/:gestion')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };

			RRHHPlanillaIncrementos.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});
	
	router.route('/rrhh-planilla-incrementos/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaIncrementos.findAll({
				where: { planilla: req.params.id_planilla },
				include: [
					{
						model: RrhhEmpleadoFicha, as: 'DetalleFicha',
						include: [
							{ model: Clase, as: 'area' },
							{ model: Clase, as: 'banco' },
							{
								model: MedicoPaciente, as: 'empleado',
								include: [
									{ model: Clase, as: 'extension' },
									{ model: Clase, as: 'campo' },
									{ model: Persona, as: 'persona' }
								]
							},
							{ model: Clase, as: 'lugarSeguroSalud' },
							{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
							{ model: Clase, as: 'ubicacion' }
						]
					}
				]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});
	
	router.route('/actualizar-sueldos/rrhh-planilla-incrementos')
		.post(ensureAuthorizedlogged, function (req, res) {
			var empleados = req.body;
			console.log('los datos recibidos', empleados);
			for (let index = 0; index < empleados.length; index++) {
				const empleado = empleados[index];
				var haber = parseFloat(empleado.nuevo_sueldo)
				var numero_literal = NumeroLiteral.Convertir(parseFloat(empleado.nuevo_sueldo).toFixed(2).toString());
				RrhhEmpleadoFicha.update({
					haber_basico: haber,
                    haber_basico_literal: numero_literal
				}, {
					where: { id: empleado.ficha }
				}).then(function (fichaActualizada) {

				})
			}
			// for para guardar los detalles de las planillas ==================
			// planillas.RecursosHumanosEmpleados.forEach(function (detallePlanilla, index, array) {
			// 	crearDetallePlanillaincrementos(res, planillaCreado, detallePlanilla);
			// 	if (index === (array.length - 1)) {
			// 		res.json(planillaCreado);
			// 	}
			// });
			res.json({mensaje: 'terminoooo'});

		})

	router.route('/planilla-sueldos/generar-planilla-retroactivas/gestion/:gestion/mes/:mes/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {

			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth();
			var day = d.getDate();
			// controlar que la fecha de diciembre hacia atras
			var ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, 12, 0, 23, 59, 59));
			ultimoDiaUtc.setDate(ultimoDiaUtc.getDate() - Number(req.params.dias));

			// var diaPlanilla = new Date(planilla.gestion, 11, 30, 23, 59, 59);
			// === corregir fecha formato
			// var ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');

			var primerDia = new Date(Date.UTC(req.params.gestion, month, day, 0, 0, 0));
			var primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
			console.log(primerDiaMes);

			// var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion, mes: obetenerMesTexto(req.params.mes)};
			// cambiar filtro por ficha del empleado
			RRHHPlanillaRetroActivas.find({
				where: {
					anio: req.params.gestion,
					mes: obetenerMesTexto(req.params.mes),
					id_empresa: req.params.id_empresa
				}
			}).then(function(planillaEncontrado) {
				if (!planillaEncontrado) {
					RRHHPlanillaSueldos.find({
						where: {
							anio: req.params.gestion,
							mes: obetenerMesTexto(req.params.mes),
							id_empresa: req.params.id_empresa
						},
						include: [
							{
								model: RRHHDetallePlanillaSueldos, as: 'rrhhDetallePlanillaSueldos',
								include: [
									{
										model: RrhhEmpleadoFicha, as: 'DetalleFicha',
										include: [
											{
												model: MedicoPaciente, as: 'empleado',
												attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
												include: [
													{
														model: Clase, as: 'campo',
														attributes: ['nombre']
													},
													{
														model: Clase, as: 'extension',
														attributes: ['nombre_corto'],
														required: true
													},
													{
														model: Clase, as: 'tipoDocumento',
														attributes: ['nombre_corto'],
														required: true
													},
													{
														model: Persona, as: 'persona',
														attributes: [
															'nombres',
															'segundo_nombre',
															'apellido_paterno',
															'apellido_materno',
															'apellido_casada',
															'nombre_completo',
															'direccion_zona',
															'id_pais_nacimiento',
															'ci',
															'fecha_nacimiento',
															'id_genero'
														],
														include: [
															{
																model: Clase, as: 'pais',
																attributes: ['nombre'],
																required: true
															},
															{
																model: Clase, as: 'genero',
																attributes: ['nombre', 'nombre_corto'],
																required: true
															}
														]
													}
												]
											},
											{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
											{ model: Clase, as: 'ubicacion' }
										]
									}
								]
							}
						]
					}).then(function (planillaSueldos) {
						if (planillaSueldos) {
							res.json({ planilla: planillaSueldos, error: false });
						} else {
							var mesPlanilla = obetenerMesTexto(req.params.mes);
							res.json({ mensaje: "No tiene la planilla de sueldos de "+ mesPlanilla.split("-")[1] +" "+ req.params.gestion, error: true });
						}
					});
				}else{
					var mesPlanilla = obetenerMesTexto(req.params.mes);
					res.json({ mensaje: "Ya tiene guardado la planilla retroactiva de "+ mesPlanilla.split("-")[1] +" "+ req.params.gestion, error: true });
				}
			})
			
		});
	
	router.route('/rrhh-planilla-retroactivas/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var planillas = req.body;
			RRHHPlanillaRetroActivas.create({
				id_empresa: req.body.id_empresa,
				mes: req.body.mes,
				anio: req.body.gestion,
				total: req.body.total,
				importe_sueldo_basico: req.body.importe_sueldo_basico,
				importe_ganado: req.body.importe_ganado,
				total_horas_extras: req.body.importe_horas_extras,
				importe_horas_extras: req.body.total_horas_extras,
				importe_recargo_nocturno: req.body.importe_recargo_nocturno,
				importe_bono_antiguedad: req.body.importe_bono_antiguedad,
				importe_bono_frontera: req.body.importe_bono_frontera,
				importe_otros_bonos: req.body.importe_otros_bonos,
				importe_total_ganado: req.body.importe_total_ganado,
				importe_afp: req.body.importe_afp,
				importe_rc_iva: req.body.importe_rc_iva,
				importe_anticipos: req.body.importe_anticipos,
				importe_prestamos: req.body.importe_prestamos,
				importe_total_descuento: req.body.importe_total_descuento,
				importe_liquido_pagable: req.body.importe_liquido_pagable
			}).then(function (planillaCreado) {
				planillas.detalles.forEach(function (detallePlanilla, index, array) {
					CrearDetallePlanillaRetroActivas(planillaCreado, detallePlanilla);
				});
				res.json({ "mensaje": "Guardado Satisfactoriamente!" });
			})
		});

	function CrearDetallePlanillaRetroActivas(planilla, detallePlanilla) {
		RRHHDetallePlanillaRetroActivas.create({
			planilla: planilla.id,
			ficha: detallePlanilla.ficha,
			id_sueldo: detallePlanilla.id,
			importe_sueldo_basico: detallePlanilla.importe_sueldo_basico,
			dt: detallePlanilla.dt,
			ganado: detallePlanilla.ganado,
			horas_extras: detallePlanilla.horas_extras,
			importe_horas_extras: detallePlanilla.importe_horas_extras,
			importe_recargo_nocturno: detallePlanilla.importe_recargo_nocturno,
			importe_bono_antiguedad: detallePlanilla.importe_bono_antiguedad,
			importe_bono_frontera: detallePlanilla.importe_bono_frontera,
			importe_otros_bonos: detallePlanilla.importe_otros_bonos,
			total_ganado: detallePlanilla.total_ganado,
			afp: detallePlanilla.afp,
			rc_iva: detallePlanilla.rc_iva,
			importe_anticipos: detallePlanilla.importe_anticipos,
			importe_prestamos: detallePlanilla.importe_prestamos,
			importe_total_descuento: detallePlanilla.importe_total_descuento,
			liquido_pagable: detallePlanilla.liquido_pagable,
			horas_extras_r: detallePlanilla.horas_extras_r,
			dias_rol_turnos: detallePlanilla.dias_rol_turnos,
			horas_extras_rol: detallePlanilla.horas_extras_rol,
			nt: detallePlanilla.nt
		}).then(function (detalles) {

		});
	}

	router.route('/rrhh-planilla-retroactivas/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };
			if (req.params.mes != 0) {
				condicionPlanilla.mes = req.params.mes;
			}
			RRHHPlanillaRetroActivas.findAll({
				where: condicionPlanilla
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});
	
	router.route('/rrhh-planilla-retroactivas/detalle/:id_planilla')
		.get(ensureAuthorizedlogged, function (req, res) {
			RRHHDetallePlanillaRetroActivas.findAll({
				where: { planilla: req.params.id_planilla },
				include: [
					{
						model: RrhhEmpleadoFicha, as: 'DetalleFicha',
						include: [
							{ model: Clase, as: 'area' },
							{ model: Clase, as: 'banco' },
							{
								model: MedicoPaciente, as: 'empleado',
								include: [
									{ model: Clase, as: 'extension' },
									{ model: Clase, as: 'campo' },
									{ model: Persona, as: 'persona' }
								]
							},
							{ model: Clase, as: 'lugarSeguroSalud' },
							{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] },
							{ model: Clase, as: 'ubicacion' }
						]
					},
					{ model: RRHHDetallePlanillaSueldos, as: "DetalleSueldo" }
				]
			}).then(function (planillas) {
				res.json({ planillas: planillas });
			});
		});

	router.route('/recursos-humanos/reporte-excel-afp/futuro/retroactivas/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			RRHHPlanillaRetroActivas.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaRetroActivas, as: 'RRHHDetallePlanillaRetroActivas',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{
										model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
										attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
										include: [
											{
												model: Clase, as: 'motivo',
												attributes: ['nombre', 'nombre_corto']
											}
										]
									},
									{
										model: Clase, as: 'cargaHorario',
										attributes: ['id'],
										include: [
											{
												model: RrhhEmpresaCargaHorario, as: 'horario'
											}
										]
									},
									{
										model: Clase, as: 'tipoPersonal',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'tipoContrato',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'ubicacion',
										attributes: ['nombre']
									},
									{
										model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
										attributes: ['id_discapacidad'],
										include: [
											{
												model: Clase, as: 'discapacidad',
												attributes: ['nombre']
											}
										]
									},
									{
										model: Clase, as: 'aporteSeguroLargoPlazo',
										attributes: ['nombre'], where: {
											nombre: 'AFP FUTURO'
										}
									},
									{
										model: Clase, as: 'lugarSeguroSalud',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'lugarSeguroLargoPlazo',
										attributes: ['nombre']
									},
									{
										model: MedicoPaciente, as: 'empleado',
										attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
										include: [
											{
												model: Clase, as: 'campo',
												attributes: ['nombre']
											},
											{
												model: Clase, as: 'extension',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Clase, as: 'tipoDocumento',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Persona, as: 'persona',
												attributes: [
													'nombres',
													'segundo_nombre',
													'apellido_paterno',
													'apellido_materno',
													'nombre_completo',
													'id_pais_nacimiento',
													'ci',
													'fecha_nacimiento',
													'id_genero'
												],
												include: [
													{
														model: Clase, as: 'pais',
														attributes: ['nombre'],
														required: true
													},
													{
														model: Clase, as: 'genero',
														attributes: ['nombre', 'nombre_corto'],
														required: true
													}
												]
											}
										]
									},
									{
										model: RrhhEmpleadoCargo, as: 'cargos',
										attributes: ['id'],
										include: [
											{
												model: Clase, as: "cargo",
												attributes: ['nombre']
											}
										]
									}
								]
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['aporte_serguro_salud']
							}
						]
					}
				]
			}).then((planilla) => {
				const fichaincludes = [
					{
						model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
						attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
						include: [
							{
								model: Clase, as: 'motivo',
								attributes: ['id', 'nombre', 'nombre_corto']
							}
						]
					},
					{
						model: Clase, as: 'cargaHorario',
						attributes: ['id'],
						include: [
							{
								model: RrhhEmpresaCargaHorario, as: 'horario'
							}
						]
					},
					{
						model: Clase, as: 'tipoPersonal',
						attributes: ['id', 'nombre']
					},
					{
						model: Clase, as: 'tipoContrato',
						attributes: ['id', 'nombre']
					},
					{
						model: Clase, as: 'ubicacion',
						attributes: ['id', 'nombre']
					},
					{
						model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
						attributes: ['id', 'id_discapacidad'],
						include: [
							{
								model: Clase, as: 'discapacidad',
								attributes: ['id', 'nombre'],
								required: false
							}
						],
						required: false
					},
					{
						model: Clase, as: 'aporteSeguroLargoPlazo',
						attributes: ['id', 'nombre']
					},
					{
						model: MedicoPaciente, as: 'empleado',
						// where: {id: {$in:[4697,6451]}},
						attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
						include: [
							{
								model: Clase, as: 'campo',
								attributes: ['nombre']
							},
							{
								model: Clase, as: 'extension',
								attributes: ['nombre_corto'],
								required: false
							},
							{
								model: Clase, as: 'tipoDocumento',
								attributes: ['nombre_corto'],
								required: false
							},
							{
								model: Persona, as: 'persona',
								attributes: ['id',
									'nombres',
									'segundo_nombre',
									'apellido_paterno',
									'apellido_materno',
									'nombre_completo',
									'id_pais_nacimiento',
									'ci',
									'fecha_nacimiento',
									'id_genero'
								],
								include: [
									{
										model: Clase, as: 'pais',
										attributes: ['nombre'],
										required: false
									},
									{
										model: Clase, as: 'genero',
										attributes: ['nombre', 'nombre_corto'],
										required: false
									}
								]
							}
						]
					},
					{
						model: RrhhEmpleadoCargo, as: 'cargos',
						attributes: ['id'],
						include: [
							{
								model: Clase, as: "cargo",
								attributes: ['nombre']
							}
						],
						required: false
					}
				]
				const cabeceraReporte = [
					"Nº", //#1
					"(13) TIPO", //#2
					"(14) Nro", //#3
					"EXT", //#4
					"(15) NUA/CUA", //#5
					"(A)1er APELLIDO (PATERNO)", //#6
					"(B) 2do APELLIDO (MATERNO)", //#7
					"(C) APELLIDO CASADA", //#8
					"(D) PRIMER NOMBRE", //#9
					"(E) SEGUNDO NOMBRE", //#10
					"(F) DEPARTAMENTO", //#11
					"NOVEDAD I/R/L/S", //# 12
					"FECHA NOVEDAD", //#13
					"DÍAS COTIZADOS", //#14
					"TIPO ASEGURADO", //#15
					"TOTAL GANADO DEPEND. < 65 AÑOS O JUBILADO DECIDE APORTAR", //#16
					"TOTAL GANADO DEPEND. > 65 AÑOS DECIDE APORTAR", //#17
					"TOTAL GANADO DEPEND. < 65 AÑOS JUBILADO DECIDE NO APORTAR", //#18
					"TOTAL GANADO DEPEND. > 65 AÑOS JUBILADO DECIDE NO APORTAR ", //#19
					"COTIZACIÓN ADICIONAL", //#20
					"TOTAL GANADO EN Bs.", //#21
					"TOTAL GANADO EN Bs." //#22
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.RRHHDetallePlanillaRetroActivas.length || 0; index++) {
					const indx = index
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.id,
							// activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null
						const columna = reporteAFPFUTURORetroActivas(planilla, indx, errors, ficha__, warnings);
						if (columna) {
							data.push(columna)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.RRHHDetallePlanillaRetroActivas.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
							for (let index = 0; index < data.length; index++) {
								if (index > 0) data[index][0] = '' + index

							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					})
					// planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha = 
				}

				// if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
				// res.json({ reporte: data, errors: errors, total: data.length + errors.length });

			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		});
	function reporteAFPFUTURORetroActivas(planilla, index, errors, ficha, warning) {

		const ficha___ = ficha && ficha || planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues
		const _indx = index + 1 - errors.length;
		const nombre_afp = planilla.RRHHDetallePlanillaRetroActivas[index].DetalleFicha.aporteSeguroLargoPlazo && planilla.RRHHDetallePlanillaRetroActivas[index].DetalleFicha.aporteSeguroLargoPlazo.nombre || ''
		// if(nombre_afp !== 'AFP FUTURO') return
		const columns = [];
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		columns.push(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.tipoDocumento.nombre_corto.trim()); // Tipo de documento de identidad
		// # 3
		columns.push(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.ci.trim()); // Número de documento de identidad
		// # 4
		columns.push(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.extension.nombre_corto.trim()); // Lugar de expedición (Documento Identficación)
		// # 5
		const nua = (planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== null && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo !== '' ? planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {
			errors.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: red;">El número NUA/CUA parece inválido.</p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 6
		if (!planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno) {
			warning.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.<p style="color: orange;">Registro de emp</p>leado
		}
		const apellido_paterno = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno) {
			warning.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		if (!planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada) {
			warning.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido de casada</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido de casada.
		}
		const apellido_casada = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.apellido_casada.trim() || '';
		columns.push(apellido_casada.trim())
		// # 9
		const primer_nombre = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim() || '';// [planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim(), (planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre ? planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres) {
			warning.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Primer Nombre</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		columns.push(primer_nombre.trim()); // Nombres
		// # 10
		const segundo_nombre = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() || '';// [planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombres.trim(), (planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre ? planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.segundo_nombre) {
			warning.push({ nombre_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Segundo Nombre</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este falte.
		}
		columns.push(segundo_nombre.trim()); // Nombres
		// # 11 departamento afp, debe referirse al departamental. lugarSeguroLargoPlazo.
		// columns.push(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.lugarSeguroSalud.nombre.trim());
		columns.push(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.lugarSeguroLargoPlazo.nombre.trim());
		// # 12
		const fecha_inicio_ = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_inicio && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_inicio || null;
		const fecha_expiracion_ = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = parseInt(planilla.mes.split('-')[0]);
		const _anio_planilla = parseInt(planilla.anio);
		const novedad = (((fecha_inicio_ ? fecha_inicio_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_inicio_.getFullYear() ? 'I' : (fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_expiracion_.getFullYear() ? 'R' : '') || '');
		columns.push(novedad);
		// # 13
		columns.push(novedad && (novedad === 'I' ? fechaATexto(fecha_inicio_) : fechaATexto(fecha_expiracion_)) || ''); // Fecha de retiro
		// # 14
		const diasTrabajadosPorMes = planilla.RRHHDetallePlanillaRetroActivas[index].dt && parseInt(planilla.RRHHDetallePlanillaRetroActivas[index].dt) + '' || '30';
		columns.push(diasTrabajadosPorMes);
		// # 15
		let tipo_asegurado = '';

		// calcular edad empleado hasta la fecha de la planilla =======================================================================
		var mes = new Date(planilla.anio, parseInt(planilla.mes), 0);
        var ultimoDiaMesPlanilla = new Date(planilla.anio, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
		const edadTrabajador = ficha___.empleado.persona.fecha_nacimiento && getAge(planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.persona.fecha_nacimiento, ultimoDiaMesPlanilla) || 0;
		if (edadTrabajador) {
			if (edadTrabajador < 65 && !ficha___.jubilacion) {
				tipo_asegurado = 'P';
			}
			if (edadTrabajador < 65 && ficha___.jubilacion) {
				tipo_asegurado = 'R';
			}
			if (edadTrabajador >= 65 && !ficha___.jubilacion) {
				tipo_asegurado = 'Q';
			}
			if (edadTrabajador >= 65 && ficha___.jubilacion) {
				tipo_asegurado = 'S';
			}
		}
		columns.push(tipo_asegurado);
		// # 16
		if (tipo_asegurado === 'P' && !planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.jubilacion) {
			columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 17
		if (tipo_asegurado === 'Q') {
			columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 18
		if (tipo_asegurado === 'R' && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.jubilacion) {
			columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 19
		if (tipo_asegurado === 'S') {
			columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		} else {
			columns.push('')
		}
		// # 20
		columns.push('')
		// # 21
		columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		// # 22
		columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		// columns.push(edadTrabajador) Columna solo para verificacion visual
		return columns
		// data.push(columns);
	}

	router.route('/recursos-humanos/reporte-excel-afp/prevision/retroactivas/:id_planilla')
		.get(ensureAuthorizedlogged, (req, res) => {
			let planillaId = parseInt(req.params.id_planilla) || 0
			const fichaincludes = [
				{
					model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
					attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
					include: [
						{
							model: Clase, as: 'motivo',
							attributes: ['id', 'nombre', 'nombre_corto']
						}
					]
				},
				{
					model: Clase, as: 'cargaHorario',
					attributes: ['id'],
					include: [
						{
							model: RrhhEmpresaCargaHorario, as: 'horario'
						}
					]
				},
				{
					model: Clase, as: 'tipoPersonal',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'tipoContrato',
					attributes: ['id', 'nombre']
				},
				{
					model: Clase, as: 'ubicacion',
					attributes: ['id', 'nombre']
				},
				{
					model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
					attributes: ['id', 'id_discapacidad'],
					include: [
						{
							model: Clase, as: 'discapacidad',
							attributes: ['id', 'nombre'],
							required: false
						}
					],
					required: false
				},
				{
					model: Clase, as: 'aporteSeguroLargoPlazo',
					attributes: ['id', 'nombre']
				},
				{
					model: MedicoPaciente, as: 'empleado',
					attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
					include: [
						{
							model: Clase, as: 'campo',
							attributes: ['nombre']
						},
						{
							model: Clase, as: 'extension',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Clase, as: 'tipoDocumento',
							attributes: ['nombre_corto'],
							required: false
						},
						{
							model: Persona, as: 'persona', 
							attributes: ['id',
								'nombres',
								'segundo_nombre',
								'apellido_paterno',
								'apellido_materno',
								'nombre_completo',
								'id_pais_nacimiento',
								'ci',
								'fecha_nacimiento',
								'id_genero'
							],
							include: [
								{
									model: Clase, as: 'pais',
									attributes: ['nombre'],
									required: false
								},
								{
									model: Clase, as: 'genero',
									attributes: ['nombre', 'nombre_corto'],
									required: false
								}
							]
						}
					]
				},
				{
					model: RrhhEmpleadoCargo, as: 'cargos',
					attributes: ['id'],
					include: [
						{
							model: Clase, as: "cargo",
							attributes: ['nombre']
						}
					],
					required: false
				}
			]
			if (!planillaId) return res.json({ hasErr: true, mensaje: 'Identificador inválido.' });
			RRHHPlanillaRetroActivas.find({
				where: { id: planillaId },
				include: [
					{
						model: RRHHDetallePlanillaRetroActivas, as: 'RRHHDetallePlanillaRetroActivas',
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'DetalleFicha',
								include: [
									{
										model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
										attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
										include: [
											{
												model: Clase, as: 'motivo',
												attributes: ['nombre', 'nombre_corto']
											}
										]
									},
									{
										model: Clase, as: 'cargaHorario',
										attributes: ['id'],
										include: [
											{
												model: RrhhEmpresaCargaHorario, as: 'horario'
											}
										]
									},
									{
										model: Clase, as: 'tipoPersonal',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'tipoContrato',
										attributes: ['nombre']
									},
									{
										model: Clase, as: 'ubicacion',
										attributes: ['nombre']
									},
									{
										model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
										attributes: ['id_discapacidad'],
										include: [
											{
												model: Clase, as: 'discapacidad',
												attributes: ['nombre']
											}
										]
									},
									{
										model: Clase, as: 'aporteSeguroLargoPlazo',
										attributes: ['nombre'],
										where: { nombre: 'AFP PREVISION' }
									},
									{
										model: Clase, as: 'lugarSeguroSalud',
										attributes: ['nombre']
									},

									{
										model: MedicoPaciente, as: 'empleado',
										attributes: ['id', 'id_extension', 'id_persona', 'id_tipo_documento'],
										include: [
											{
												model: Clase, as: 'campo',
												attributes: ['nombre']
											},
											{
												model: Clase, as: 'extension',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Clase, as: 'tipoDocumento',
												attributes: ['nombre_corto'],
												required: true
											},
											{
												model: Persona, as: 'persona',
												attributes: [
													'nombres',
													'segundo_nombre',
													'apellido_paterno',
													'apellido_materno',
													'nombre_completo',
													'id_pais_nacimiento',
													'ci',
													'fecha_nacimiento',
													'id_genero'
												],
												include: [
													{
														model: Clase, as: 'pais',
														attributes: ['nombre'],
														required: true
													},
													{
														model: Clase, as: 'genero',
														attributes: ['nombre', 'nombre_corto'],
														required: true
													}
												]
											}
										]
									},
									{
										model: RrhhEmpleadoCargo, as: 'cargos',
										attributes: ['id'],
										include: [
											{
												model: Clase, as: "cargo",
												attributes: ['nombre']
											}
										]
									}
								]
							}
						]
					},
					{
						model: Empresa, as: 'empresa',
						attributes: ['id'],
						include: [
							{
								model: RRHHParametros, as: "rrhhParametros",
								attributes: ['aporte_serguro_salud']
							}
						]
					}
				]
			}).then((planilla) => {
				const cabeceraReporte = [
					"Nº", //#1
					"TIPO DOC.", //#2
					"NÚMERO DOCUMENTO", //#3
					"ALFANUMERICO DEL DOCUMENTO", //#4
					"NUA/CUA", //#5
					"AP. PATERNO", //#6
					"AP. MATERNO", //#7
					"AP. CASADA", //#8
					"PRIMER NOMBRE", //#9
					"SEG. NOMBRE", //#10
					"NOVEDAD I/R/L/S", //# 11
					"FECHA NOVEDAD", //#12
					"DÍAS", //#13
					"TOTAL GANADO", //#14
					"TIPO COTIZANTE", //#15
					"TIPO ASEGURADO", //#16
				];
				const data = [cabeceraReporte];
				const errors = [];
				const warnings = []
				for (let index = 0; index < planilla.RRHHDetallePlanillaRetroActivas.length || 0; index++) {
					const indx = index
					RrhhEmpleadoFicha.findAll({
						where: {
							id_empleado: planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.empleado.id,
							activo: true
						},
						include: fichaincludes
					}).then((ficha) => {
						const ficha__ = ficha.length && ficha[0] || null
						const columna = reporteAFPPREVISIONRetroActivas(planilla, indx, errors, ficha__, warnings);
						if (columna) {
							data.push(columna)
						} else {
							let controlbreakpoint = 0
						}
						if (index === (planilla.RRHHDetallePlanillaRetroActivas.length - 1)) {
							if (data.length <= 1) return res.json({ hasErr: true, mensaje: 'El reporte no tiene ningun dato.', errors: errors });
							for (let index = 0; index < data.length; index++) {
								if (index > 0) data[index][0] = '' + index

							}
							res.json({ reporte: data, errors: errors, total: data.length - 1 + errors.length, warnings: warnings });
						}
					})
				}
			}).catch((err) => {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
			})
		})

	function reporteAFPPREVISIONRetroActivas(planilla, index, errors, ficha, warnings) {
		const ficha___ = ficha && ficha || planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues
		const nombre_afp = planilla.RRHHDetallePlanillaRetroActivas[index].DetalleFicha.aporteSeguroLargoPlazo && planilla.RRHHDetallePlanillaRetroActivas[index].DetalleFicha.aporteSeguroLargoPlazo.nombre || ''
		if (nombre_afp !== 'AFP PREVISION') return
		const columns = [];
		const _indx = index + 1;
		// # 1
		columns.push(_indx + ''); // (Nº) # correlativo
		// # 2
		const ci = ficha___.empleado.persona.ci.trim().split('-');
		columns.push(ficha___.empleado.tipoDocumento.nombre_corto.trim()); // Tipo de documento de identidad
		// # 3
		columns.push(ci && ci[0] && ci[0] || '' || ''); // Número de documento de identidad
		// # 4
		columns.push(ci && ci[1] && ci[1] || '' || ''); // Alfanúmerico
		// # 5
		const nua = (ficha___.nua_seguro_largo_plazo !== null && ficha___.nua_seguro_largo_plazo !== '' ? ficha___.nua_seguro_largo_plazo.trim() : '');
		if (nua.length < 5 || nua.length > 9) {

			const persona_ = ficha___.empleado.persona;
			errors.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: red;">El número NUA/CUA parece inválido.<p>' });
			return
		}
		columns.push(nua); // NUA/CUA
		// # 6
		if (!ficha___.empleado.persona.apellido_paterno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido paterno</p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_paterno = ficha___.empleado.persona.apellido_paterno && ficha___.empleado.persona.apellido_paterno.trim() || '';
		columns.push(apellido_paterno); // Apellido Paterno
		// # 7
		if (!ficha___.empleado.persona.apellido_materno) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido materno </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		const apellido_materno = ficha___.empleado.persona.apellido_materno && ficha___.empleado.persona.apellido_materno.trim() || '';
		columns.push(apellido_materno); // Apellido Materno
		// # 8
		// if (!ficha___.empleado.persona.apellido_casada) {
		// 	warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene apellido de casada </p>' });
		// 	// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido de casada.
		// }
		const apellido_casada = ficha___.empleado.persona.apellido_casada && ficha___.empleado.persona.apellido_casada.trim() || '';
		columns.push(apellido_casada.trim())
		// # 9
		const primer_nombre = ficha___.empleado.persona.nombres && ficha___.empleado.persona.nombres.trim() || '';// [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!ficha___.empleado.persona.nombres) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Primer Nombre </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este le falte el apellido.
		}
		columns.push(primer_nombre.trim()); // Nombres
		// # 10
		const segundo_nombre = ficha___.empleado.persona.segundo_nombre && ficha___.empleado.persona.segundo_nombre.trim() || '';// [ficha___.empleado.persona.nombres.trim(), (ficha___.empleado.persona.segundo_nombre ? ficha___.empleado.persona.segundo_nombre.trim() : '')].join(' ');
		if (!ficha___.empleado.persona.segundo_nombre) {
			warnings.push({ nombre_empleado: ficha___.empleado.persona.nombre_completo, error: '<p style="color: orange;">Registro de empleado no tiene Segundo Nombre </p>' });
			// continue // Comentado para Incluir en el reporte al empleado aunque este falte.
		}
		columns.push(segundo_nombre.trim()); // Nombres
		// # 11
		// columns.push(ficha___.lugarSeguroSalud.nombre.trim());
		const fecha_inicio_ = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_inicio && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_inicio || null;
		const fecha_expiracion_ = planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_expiracion && planilla.dataValues.RRHHDetallePlanillaRetroActivas[index].dataValues.DetalleFicha.dataValues.fecha_expiracion || null;
		const _mes_planilla = parseInt(planilla.mes.split('-')[0]);
		const _anio_planilla = parseInt(planilla.anio);
		const novedad = (((fecha_inicio_ ? fecha_inicio_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_inicio_.getFullYear() ? 'I' : (fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fecha_expiracion_.getFullYear() ? 'R' : '') || '');
		columns.push(novedad);
		// # 12
		columns.push(novedad && (novedad === 'I' ? fechaATexto(fecha_inicio_, true) : fechaATexto(fecha_expiracion_, true)) || ''); // Fecha de retiro
		// # 13
		const diasTrabajadosPorMes = planilla.RRHHDetallePlanillaRetroActivas[index].dt && parseInt(planilla.RRHHDetallePlanillaRetroActivas[index].dt) + '' || '30';
		columns.push(diasTrabajadosPorMes);
		// # 14
		columns.push(planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado && planilla.RRHHDetallePlanillaRetroActivas[index].total_ganado.toFixed(2) || '0')
		// # 15
		let tipo_asegurado = '';
		var mes = new Date(planilla.anio, parseInt(planilla.mes), 0);
        var ultimoDiaMesPlanilla = new Date(planilla.anio, parseInt(planilla.mes) - 1, mes.getDate(), 23, 59, 59);
		const edadTrabajador = ficha___.empleado && ficha___.empleado.persona.fecha_nacimiento && getAge(ficha___.empleado.persona.fecha_nacimiento, ultimoDiaMesPlanilla) || 0;
		if (edadTrabajador) {
			if (edadTrabajador < 65 && !ficha___.jubilacion) {
				tipo_asegurado = '1';
			}
			if (edadTrabajador < 65 && ficha___.jubilacion) {
				tipo_asegurado = 'C';
			}
			if (edadTrabajador >= 65 && !ficha___.jubilacion) {
				tipo_asegurado = '8';
			}
			if (edadTrabajador >= 65 && ficha___.jubilacion) {
				tipo_asegurado = 'D';
			}
		}
		columns.push(tipo_asegurado);
		// # 16
		columns.push('')
		// columns.push(edadTrabajador)
		return columns;
	}

	router.route('/rrhh-planilla-retroactivas/ovt/empresa/:id_empresa/gestion/:gestion')
		.get(async function (req, res) {
			var condicionPlanilla = { id_empresa: req.params.id_empresa, anio: req.params.gestion };

			MedicoPaciente.findAll({
				include: [
					{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', required: true,
						include: [
							{	model: RRHHDetallePlanillaRetroActivas, as: 'rrhhDetalleRetroActivas', required: true,
								include: [
									{ model: RRHHPlanillaRetroActivas, as : 'rrhhPlanilla', where: condicionPlanilla},
									{ model: RRHHDetallePlanillaSueldos, as : 'DetalleSueldo'}
								]
							},
							{
								model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales',
								attributes: ['id_ficha', 'id_motivo', 'fecha_retiro'],
								include: [
									{
										model: Clase, as: 'motivo',
										attributes: ['id', 'nombre', 'nombre_corto']
									}
								]
							},
							{
								model: Clase, as: 'cargaHorario',
								attributes: ['id'],
								include: [
									{
										model: RrhhEmpresaCargaHorario, as: 'horario'
									}
								]
							},
							{
								model: Clase, as: 'tipoPersonal',
								attributes: ['id', 'nombre']
							},
							{
								model: Clase, as: 'tipoContrato',
								attributes: ['id', 'nombre']
							},
							{
								model: Clase, as: 'ubicacion',
								attributes: ['id', 'nombre']
							},
							{
								model: RrhhEmpleadoDiscapacidad, as: 'discapacidades',
								attributes: ['id', 'id_discapacidad'],
								include: [
									{
										model: Clase, as: 'discapacidad',
										attributes: ['id', 'nombre'],
										required: false
									}
								],
								required: false
							},
							{
								model: Clase, as: 'aporteSeguroLargoPlazo',
								attributes: ['id', 'nombre']
							},
							
							{
								model: RrhhEmpleadoCargo, as: 'cargos',
								attributes: ['id'],
								include: [
									{
										model: Clase, as: "cargo",
										attributes: ['nombre']
									}
								],
								required: false
							}
						]
					},
					{
						model: Clase, as: 'extension',
						attributes: ['nombre_corto'],
						required: false
					},
					{
						model: Clase, as: 'tipoDocumento',
						attributes: ['nombre_corto'],
						required: false
					},
					{
						model: Clase, as: 'campo',
						attributes: ['nombre']
					},
					{
						model: Persona, as: 'persona',
						attributes: ['id',
							'nombres',
							'segundo_nombre',
							'apellido_paterno',
							'apellido_materno',
							'nombre_completo',
							'id_pais_nacimiento',
							'ci',
							'fecha_nacimiento',
							'id_genero'
						],
						include: [
							{
								model: Clase, as: 'pais',
								attributes: ['nombre'],
								required: false
							},
							{
								model: Clase, as: 'genero',
								attributes: ['nombre', 'nombre_corto'],
								required: false
							}
						]
					}
				]
			}).then(async function (empleados) {

				const cabeceraReporte = [
					"Nro",
					"Tipo de documento de identidad",
					"Número de documento de identidad",
					"Lugar de expedición",
					"Fecha de nacimiento",
					"Apellido Paterno",
					"Apellido Materno",
					"Nombres",
					"País de nacionalidad",
					"Sexo",
					"Jubilado",
					"¿Aporta a la AFP?",
					"¿Persona con discapacidad?",
					"Tutor de persona con discapacidad",
					"Fecha de ingreso",
					"Fecha de retiro",
					"Motivo retiro",
					"Caja de salud",
					"AFP a la que aporta",
					"NUA/CUA",
					"Sucursal o ubicación adicional",
					"Clasificación laboral",
					"Cargo",
					"Modalidad de contrato",
					"Tipo contrato",
					"Horas promedio",
					"Haber Básico Anterior",
					"Haber Básico Actual",
					"Monto Retroactivo mes de Enero",
					"Monto Retroactivo mes de Febrero",
					"Monto Retroactivo mes de Marzo",
					"Monto Retroactivo mes de Abril",
					"Monto Retroactivo mes de Mayo",
					"Monto Retroactivo mes de Junio",
					"Pago total de retroactivo de otros bonos y pagos",
					"RC-IVA",
					"Aporte AFP",
					"Otros descuentos"
				];
				const data = [cabeceraReporte];
				for (let index = 0; index < empleados.length || 0; index++) {
					const fila = await reporteOVTRetroActivas(index, empleados[index]);
					data.push(fila)
					if (index == empleados.length - 1) {
						console.log(data);
					}
				}
				

				res.json({ empleados: data });
			})

		});

		function obtenerMesesRetroActivas(fichas) {
			var mesesPlanillas =  {enero: null, febrero: null, marzo: null, abril: null}
			if (fichas.length > 1) {
				for (let j = 0; j < fichas.length; j++) {
					const ficha = fichas[j];
					for (let K = 0; K < ficha.rrhhDetalleRetroActivas.length; K++) {
						const planilla = ficha.rrhhDetalleRetroActivas[K];
						switch (planilla.rrhhPlanilla.mes) {
							case "1-ENERO": mesesPlanillas.enero={retroactiva: planilla, basico_ficha: ficha.haber_basico};
							break;
							case "2-FEBRERO": mesesPlanillas.febrero={retroactiva: planilla, basico_ficha: ficha.haber_basico};
							break;
							case "3-MARZO": mesesPlanillas.marzo={retroactiva: planilla, basico_ficha: ficha.haber_basico};
							break;
							case "4-ABRIL": mesesPlanillas.abril={retroactiva: planilla, basico_ficha: ficha.haber_basico};
							break;
						}
					}

				}
			}else{
				var ficha= fichas[0];
				// obtener las planillas retroACTIVAS 
				for (let K = 0; K < ficha.rrhhDetalleRetroActivas.length; K++) {
					const planilla = ficha.rrhhDetalleRetroActivas[K];
					switch (planilla.rrhhPlanilla.mes) {
						case "1-ENERO": mesesPlanillas.enero= {retroactiva: planilla, basico_ficha: ficha.haber_basico};
						break;
						case "2-FEBRERO": mesesPlanillas.febrero={retroactiva: planilla, basico_ficha: ficha.haber_basico};
						break;
						case "3-MARZO": mesesPlanillas.marzo={retroactiva: planilla, basico_ficha: ficha.haber_basico};
						break;
						case "4-ABRIL": mesesPlanillas.abril={retroactiva: planilla, basico_ficha: ficha.haber_basico};
						break;
					}
				}
			}
			return mesesPlanillas;
			
		}

		function reporteOVTRetroActivas(index, empleado) {
			// recorrer fichas empleados ==== 
			var fichaActual = {};
			if (empleado.empleadosFichas.length > 1) {
				fichaActual = empleado.empleadosFichas[empleado.empleadosFichas.length-1]
			}else{
				fichaActual = empleado.empleadosFichas[0]
			}
			// const ficha___ = ficha && ficha || planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues
			const columns = [];
			const _indx = index + 1;
			// # 1
			columns.push(_indx + ''); // (Nº) # correlativo
			// # 2
			const tipo_documento = empleado.tipoDocumento ? empleado.tipoDocumento.nombre_corto.trim() : '';
			if (tipo_documento.length > 0) {
				columns.push(tipo_documento);
			} else {
				columns.push(''); // Tipo de documento de identidad
			}
			// # 3
			columns.push(empleado.persona.ci.trim()); // Número de documento de identidad
			// # 4
			columns.push(empleado.extension.nombre_corto.trim()); // Lugar de expedición (Documento Identficación)
			// # 5
			columns.push(fechaATexto(empleado.persona.fecha_nacimiento)); // Fecha de nacimiento (Empleado)
			// # 6
			
			const apellido_paterno = empleado.persona.apellido_paterno && empleado.persona.apellido_paterno.trim() || '';
			columns.push(apellido_paterno); // Apellido Paterno
			// # 7
			const apellido_materno = empleado.persona.apellido_materno && empleado.persona.apellido_materno.trim() || '';
			columns.push(apellido_materno); // Apellido Materno
			// # 8
			const nombres = [empleado.persona.nombres.trim(), (empleado.persona.segundo_nombre ? empleado.persona.segundo_nombre.trim() : '')].join(' ');
			columns.push(nombres.trim()); // Nombres
			// # 9
			columns.push(empleado.persona.pais.nombre.trim()); // País de nacionalidad
			// # 10
			const genero = (empleado.persona.genero.nombre.toUpperCase() === "MASCULINO" ? 'M' : 'F');
			columns.push(genero.trim()); // Sexo (Género)
			// # 11
			const jubilado = fichaActual.jubilacion && (fichaActual.jubilacion ? '1' : '0') || '0'; // 1 si es true
			columns.push(jubilado); // Jubilado (1 si es jubilado 0 si no es jubilado)
			// # 12
			const aportaAFP = (fichaActual.aporteSeguroLargoPlazo ? '1' : '0'); // 1 si existe alguna asignación. si es null o indefinido no existe asignación por tanto 0 (Obligarorio: no debe ser 0)
			columns.push(aportaAFP); // ¿Aporta a la AFP? (1 si aporta)
	
			// # 14
			const discapacidades_ = fichaActual.discapacidades.map((discapacidad) => (discapacidad && discapacidad.discapacidad.nombre ? discapacidad.discapacidad.nombre.toUpperCase() : ''))
			let tutor = '0'
			for (let index = 0; index < discapacidades_.length; index++) {
				if (discapacidades_[index].indexOf('TUTOR') !== -1) {
					tutor = '1'
				}
				if (discapacidades_[index].indexOf('PADRE') !== -1) {
					tutor = '1'
				}
			}
			//// #14 -->// # 13
			const discapacidad = fichaActual.discapacidad && (tutor === '0' ? '1' : '0') || '0';
			columns.push(discapacidad); // ¿Persona con discapacidad? si es padre/madre o tutor es 0
			columns.push(tutor); // Tutor de persona con discapacidad
			// # 15
			columns.push(fechaATexto(fichaActual.fecha_inicio)); // Fecha de ingreso
			// # 16 y 17 motivoBeneficio debe verificarse antes para obtener la fecha de retiro.
			//la fecha de retiro se determinó que es la fecha de expiración en la ficha del empleado.
			//const motivoBeneficio = planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.length && planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre !='QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null
			const fecha_expiracion_ = fichaActual.fecha_expiracion && fichaActual.fecha_expiracion || null;
			var ultimaPlanilla = fichaActual.rrhhDetalleRetroActivas[fichaActual.rrhhDetalleRetroActivas.length - 1].rrhhPlanilla;
			const _mes_planilla = parseInt(ultimaPlanilla.mes.split('-')[0]);
			const _anio_planilla = parseInt(ultimaPlanilla.anio);
			const motivoBeneficio = fichaActual.beneficiosSociales.length && fichaActual.beneficiosSociales.find(beneficio => beneficio.motivo && (beneficio.motivo.nombre != 'QUINQUENIO' ? beneficio.motivo.nombre_corto : null)) || null;
			const fechaRetiro = motivoBeneficio && (((fecha_expiracion_ ? fecha_expiracion_.getMonth() + 1 : null) === _mes_planilla && _anio_planilla === fichaActual.fecha_expiracion.getFullYear() ? fechaATexto(fichaActual.fecha_expiracion) : null) || null); // Sólo en el caso que se retira el empleado en el mes de la planilla.
	
			columns.push(fechaRetiro && fechaRetiro || ''); // Fecha de retiro
			// // # 17
			const motivoRetiro = motivoBeneficio && fechaRetiro && motivoBeneficio.motivo.nombre_corto || '';
			columns.push(motivoRetiro); // Motivo retiro (Poner 2 = Vencimiento de contrato)
			// # 18
			columns.push('2'); // Caja de salud (Poner 2 = Caja Petrolera)
			// # 19
			const AFP_aporte = (fichaActual.aporteSeguroLargoPlazo ? (fichaActual.aporteSeguroLargoPlazo.nombre.toUpperCase().includes('FUTURO') ? '2' : '1') : '0'); // 0 Solo para evitar salten errores (Obligarorio: no debe ser 0)
			
			columns.push(AFP_aporte); // AFP a la que aporta (Obligatorio: 1 Si es Previsión 2 Futuro)
			// # 20
			const nua = (fichaActual.nua_seguro_largo_plazo !== null && fichaActual.nua_seguro_largo_plazo !== '' ? fichaActual.nua_seguro_largo_plazo.trim() : '');
			
			columns.push(nua); // NUA/CUA
			// # 21
			//Por el momento poner 0 en ubicación.
			columns.push('0'); //columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.ubicacion.nombre.trim()); // Sucursal o ubicación adicional
			// # 22
			const tipoPersonal = (fichaActual.tipoPersonal ? (fichaActual.tipoPersonal.nombre.trim().toUpperCase() === 'CAMPO' ? '3' : (fichaActual.tipoPersonal.nombre.trim().toUpperCase() === 'OFICINA' ? '4' : '0')) : '0');
			columns.push(tipoPersonal); // Clasificación laboral (Campo = 3, Oficina = 4)
			// # 23
			columns.push(fichaActual.cargos[0].cargo.nombre); // Cargo
			// # 24
			let modalidadContrato = '0';
			if (fichaActual.tipoContrato) {
				if (fichaActual.tipoContrato.nombre.trim().toUpperCase() === 'INDEFINIDO') modalidadContrato = '1';
				if (fichaActual.tipoContrato.nombre.trim().toUpperCase() === 'POR OBRA') modalidadContrato = '4';
				if (fichaActual.tipoContrato.nombre.trim().toUpperCase() === 'EVENTUAL') modalidadContrato = '5';
			}
			
			columns.push(modalidadContrato); // Modalidad de contrato (Indefinido = 1, por obra = 4, Eventual = 5)
			// # 25
			columns.push('1'); // Tipo contrato (Poner 1, 1 = Escrito, 2 = Verbal)
			// # 26
			columns.push('8'); // Horas pagadas (Promedio horas día). Colocar 8 para todos.
			// # 28 sueldo basico anterior 
			columns.push(empleado.empleadosFichas[0].haber_basico);
			// # sueldo basico actual
			columns.push(empleado.empleadosFichas[empleado.empleadosFichas.length-1].haber_basico);
			// columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.ganado)//columns.push(planilla.dataValues.rrhhDetallePlanillaSueldos[index].dataValues.DetalleFicha.dataValues.haber_basico.toFixed(2)); // Haber Básico
			// # 29
			// obtener retroactivo de los 4 meses =============
			var mesesRetroActivas = obtenerMesesRetroActivas(empleado.empleadosFichas);

			var plEnero = mesesRetroActivas.enero?mesesRetroActivas.enero.retroactiva:{importe_sueldo_basico: 0, ganado: 0, importe_horas_extras: 0, importe_recargo_nocturno: 0, importe_bono_antiguedad: 0, importe_bono_frontera: 0, importe_otros_bonos: 0, afp: 0};
			var plFebrero = mesesRetroActivas.febrero?mesesRetroActivas.febrero.retroactiva:{importe_sueldo_basico: 0, ganado: 0, importe_horas_extras: 0, importe_recargo_nocturno: 0, importe_bono_antiguedad: 0, importe_bono_frontera: 0, importe_otros_bonos: 0, afp: 0};
			var plMarzo = mesesRetroActivas.marzo?mesesRetroActivas.marzo.retroactiva:{importe_sueldo_basico: 0, ganado: 0, importe_horas_extras: 0, importe_recargo_nocturno: 0, importe_bono_antiguedad: 0, importe_bono_frontera: 0, importe_otros_bonos: 0, afp: 0};
			var plAbril = mesesRetroActivas.abril?mesesRetroActivas.abril.retroactiva:{importe_sueldo_basico: 0, ganado: 0, importe_horas_extras: 0, importe_recargo_nocturno: 0, importe_bono_antiguedad: 0, importe_bono_frontera: 0, importe_otros_bonos: 0, afp: 0};
			columns.push(plEnero.ganado); // enero
			columns.push(plFebrero.ganado); // febrero
			columns.push(plMarzo.ganado); // marzo
			columns.push(plAbril.ganado); // abril

			// var plEnero = mesesRetroActivas.enero?mesesRetroActivas.enero.retroactiva:{importe_sueldo_basico: 0, importe_bono_antiguedad: 0, afp: 0};
			// var plFebrero = mesesRetroActivas.febrero?mesesRetroActivas.febrero.retroactiva:{importe_sueldo_basico: 0, importe_bono_antiguedad: 0, afp: 0};
			// var plMarzo = mesesRetroActivas.marzo?mesesRetroActivas.marzo.retroactiva:{importe_sueldo_basico: 0, importe_bono_antiguedad: 0, afp: 0};
			// var plAbril = mesesRetroActivas.abril?mesesRetroActivas.abril.retroactiva:{importe_sueldo_basico: 0, importe_bono_antiguedad: 0, afp: 0};

			columns.push(0) //mayo
			columns.push(0) // junio
			var sumaTotalGanadoEnero = plEnero.importe_horas_extras + plEnero.importe_recargo_nocturno + plEnero.importe_bono_antiguedad + plEnero.importe_bono_frontera + plEnero.importe_otros_bonos;
			var sumaTotalGanadoFebrero = plFebrero.importe_horas_extras + plFebrero.importe_recargo_nocturno + plFebrero.importe_bono_antiguedad + plFebrero.importe_bono_frontera + plFebrero.importe_otros_bonos;
			var sumaTotalGanadoMarzo = plMarzo.importe_horas_extras + plMarzo.importe_recargo_nocturno + plMarzo.importe_bono_antiguedad + plMarzo.importe_bono_frontera + plMarzo.importe_otros_bonos;
			var sumaTotalGanadoAbril = plAbril.importe_horas_extras + plAbril.importe_recargo_nocturno + plAbril.importe_bono_antiguedad + plAbril.importe_bono_frontera + plAbril.importe_otros_bonos;
			var sumaBonosAtiguedad = sumaTotalGanadoEnero + sumaTotalGanadoFebrero + sumaTotalGanadoMarzo + sumaTotalGanadoAbril;
			columns.push(sumaBonosAtiguedad) // "Pago total de retroactivo de otros bonos y pagos", suma todos los bonos de antiguedad de todos los meses
			columns.push(0) // "RC-IVA",
			var sumaAFPS = plEnero.afp + plFebrero.afp + plMarzo.afp + plAbril.afp;
			columns.push(sumaAFPS) // "Aporte AFP", suma de todos los afps de todos meses
			columns.push(0) //"Otros descuentos"
			
			return columns
		}
	
	router.route('/empleados-viajes/horas-extra/:id_ficha/gestion/:gestion/mes/:mes/empleado/:id_empleado/campos/:campos')
		.get(ensureAuthorizedlogged, function (req, res) {
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0);
			// console.log("primerDia =======", primerDia);
			var ultimoDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59);
			// console.log("ultimoDia =======", ultimoDia);
			// var condicionHorasExtras = [{id_ficha: req.params.id_ficha, eliminado: false}];
			RrhhEmpleadoHoraExtraOrdinaria.findAll({
				where: { id_ficha: req.params.id_ficha, eliminado: false }
			}).then(function (horasExtraOrdianarios) {

				var totalHorasOrdinario = 0;
				if (horasExtraOrdianarios.length > 0) {
					// for reversa para acelera la carga =================
					for (var i = horasExtraOrdianarios.length - 1; i >= 0; i--) {
						// condicion para sacar horas extras==========
						// fecha cierre >= fecha inicio filtro && fecha cierre <= fecha fin filtro 
						var horaExtraOrdinario = horasExtraOrdianarios[i];
						var horas = 0;
						var diaCierre = new Date(horaExtraOrdinario.fecha_cierre)
						if (ultimoDia.getDate() == 31 && diaCierre.getDate() == 30) {
							diaCierre.setDate(diaCierre.getDate() + 1);
						}
						var diaInicio = new Date(horaExtraOrdinario.fecha);
						if (primerDia.getMonth() == diaInicio.getMonth() && primerDia.getFullYear() == diaInicio.getFullYear()) {
							primerDia = horaExtraOrdinario.fecha;
						}

						if (horaExtraOrdinario.cerrado && primerDia >= horaExtraOrdinario.fecha && ultimoDia <= diaCierre) {
							horas = horaExtraOrdinario.horas;
						} else if (!horaExtraOrdinario.cerrado && horaExtraOrdinario.fecha <= ultimoDia) {
							horas = horaExtraOrdinario.horas;
						}

						totalHorasOrdinario += horas;
					}

				}

				RrhhEmpleadoHorasExtra.findAll({
					where: { id_ficha: req.params.id_ficha, eliminado: false, fecha: { $between: [primerDia, ultimoDia] } }
				}).then(function (horasExtra) {

					var totalHoras = "";
					var timeHoras = 0;
					var timeMinutos = 0;
					if (horasExtra.length > 0) {
						// for reversa para acelera la carga =================
						for (var i = horasExtra.length - 1; i >= 0; i--) {
							// for (var i = 0; i < horasExtra.length; i++) {
							var minutos = horasExtra[i].tiempo.split(':')[1];
							var horas = horasExtra[i].tiempo.split(':')[0];

							timeHoras = timeHoras + parseInt(horas);
							timeMinutos = timeMinutos + parseInt(minutos);
							if (timeMinutos >= 60) {
								timeMinutos = timeMinutos - 60;
								timeHoras = timeHoras + 1;
							}
							totalHoras = timeHoras;
						}

					} else {
						totalHoras = 0;
					}

					// =========================================================================================================================
					// ==== hacer filtro del modelo recursos humanos anticipos para obtener el ultimo anticipo del mes del empleado :)  ============
					// =========================================================================================================================

					RrhhEmpleadoPrestamo.findAll({
						where: { id_empleado: req.params.id_empleado, cuota: { $gt: 0 } }
					}).then(function (prestamos) {
						// console.log("los prestamos ======================================================", prestamos);
						var totalCuotas = 0;

						if (prestamos.length > 0) {
							var fechaInicial = "";
							var fechaVencimiento = "";
							for (var j = prestamos.length - 1; j >= 0; j--) {
								// for (var j = 0; j < prestamos.length; j++) {
								fechaInicial = fechaATexto(prestamos[j].fecha_inicial);

								fechaVencimiento = editar_fecha(fechaInicial, prestamos[j].plazo, "m", "/");
								// condicion para que saque los prestamos de avuerdo al mes y año del prestamo ===========
								if (primerDia <= fechaVencimiento && ultimoDia >= prestamos[j].fecha_inicial) {
									totalCuotas = totalCuotas + prestamos[j].cuota;
								}
							}
						} else {
							totalCuotas = 0;
						}
						// console.log("los totales prestamos =====================", totalCuotas);
						
						var primerDiaFiltro = new Date(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0);
						RrhhAnticipo.findAll({
							where: { id_ficha: req.params.id_ficha, eliminado: false, fecha: { $between: [primerDiaFiltro, ultimoDia] } },
							attributes: [[sequelize.fn('sum', sequelize.col('monto')), 'total_monto']],
							group: ["`agil_rrhh_empleado_anticipo`.`ficha`"],
							raw: true
						}).then(function (anticipo) {
							var totalanticipo = 0;
							if (anticipo.length > 0) {
								totalanticipo = anticipo[0].total_monto ? anticipo[0].total_monto : 0;
							}
							var idsCampos = []
							var dato = req.params.campos.split(",")
							dato.map(function (grupo) {
								idsCampos.push(grupo)
							})
							// ==== obteniendo rol de turnos ===
							RrhhEmpleadoRolTurno.findAll({
								where: { 
									id_ficha: req.params.id_ficha,
									id_campo: { $in: idsCampos},
									eliminado: false 
								},
								order: sequelize.literal("fecha_inicio asc"),
								include: [{ model: RrhhEmpleadoRolTurnoNoche, as: 'turnosExtra', required: false, where: { eliminado: false }, include: [{ model: Clase, as: 'tipo' }] },
								{ model: Clase, as: 'grupo' },
								{ model: Clase, as: 'clasificacion' },
								{ model: Clase, as: 'campo' },
								{
									model: RrhhEmpleadoFicha, as: 'ficha',
									include: [
										{ model: RrhhEmpleadoVacaciones, as: 'vacaciones', required: false, where: { eliminado: false } },
										{ 
											model: RrhhEmpleadoAusencia, as: 'ausencias', required: false, 
											include: [
												{ model: Clase, as: 'estado', required: false,
													where:{$or: [{nombre_corto: "AUT"}, {nombre_corto: "SAL"}, {nombre_corto: "RTR"}]}
												},
												{ model: RrhhClaseAsuencia, as: 'tipoAusencia', required: false, include: [{ model: Tipo, as: 'tipo' }] }
											] 
										}
									]
								}]
							}).then(function (datos2) {
								res.json({ rolesTurno: datos2, totalHoras: totalHoras, totalCuotas: totalCuotas, totalAnticipo: totalanticipo, totalHorasOrdinario: totalHorasOrdinario });
							})

						});

					});


					// res.json({horasExtra: horasExtra});
				});
			});

			//  ==== hacer query x el updatedAt que sea menor o igual  a la fecha de vencimiento =======
			//          sequelize.query('SELECT * FROM agil_rrhh_empleado_prestamo WHERE empleado=:id_empleado AND updatedAt >= :fecha AND updatedAt < DATE_ADD(fecha_inicial, INTERVAL plazo MONTH) ',
			//   {replacements: { fecha: primerDia, id_empleado: req.params.id_empleado}, type: sequelize.QueryTypes.SELECT }
			// ).then( function(projects) {
			// 	console.log("projects prestamosssssssssss ======== ", projects);
			// 	// body...
			// });


			// =========== obetener de la base de datos los prestamos que sean mayores a cero ===========
		});
		
}