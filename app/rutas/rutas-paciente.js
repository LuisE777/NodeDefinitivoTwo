const { config } = require("aws-sdk");
const movimiento = require("../modelos/INV/movimiento");

module.exports = function (router, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, MedicoPrerequisito, Clase, Diccionario, Tipo, decodeBase64Image, fs, MedicoVacuna, VacunaDosis,
	MedicoPacienteVacuna, MedicoPacienteVacunaDosis, MedicoPacienteConsulta, MedicoPacienteFicha, sequelize, Sequelize, MedicoLaboratorioExamen, MedicoLaboratorio, MedicoLaboratorioPaciente, MedicoLaboratorioResultado,
	MedicoLaboratorioResultado, MedicoDiagnostico, MedicoDiagnosticoExamen, MedicoDiagnosticoPaciente, MedicoDiagnosticoResultado, MedicoPacientePreRequisito, RrhhEmpleadoCargo, RrhhEmpleadoFicha, RrhhEmpleadoPrerequisitoCargo, ensureAuthorizedlogged, RiesgoCargo, ConfiguracionIso, ConfigAlertas, MedicoVacunaProducto, ConfigVacunaProducto, Producto, DetalleMovimiento, Movimiento) {

	router.route('/paciente/:id_paciente')
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPaciente.find({
				where: {
					id: req.params.id_paciente
				},
				include: [{ model: Clase, as: 'campo' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }
					// { model: Empresa, as: 'empresa'},{model:MedicoPrerequisito, as: 'prerequisitos',include: [{ model: Clase, as: 'prerequisitoClase' }]}
				]
			}).then(function (medicoPaciente) {
				res.json(medicoPaciente);
			});
		});
	router.route('/pacientes/:id_paciente/comentario')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPaciente.update({
				comentario: req.body.comentario
			}, {
				where: { id: req.params.id_paciente }
			}).then(function (medicoPacienteActualizado) {
				res.json({ mensaje: "Comentario Actualizado." });
			})
		})

	router.route('/pacientes/:id_paciente/activo/:activo')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPaciente.update({
				eliminado: req.params.activo
			}, {
				where: {
					id: req.params.id_paciente
				}
			}).then(function (pacienteInactivo) {
				var mn = (req.body.activo == true) ? 'activo' : 'inactivo'
				res.json({ mensaje: "Paciente " + mn });
			})
		})

	router.route('/pacientes/:id_paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre_corto: Diccionario.GENERO }
			}).then(function (clase) {
				Persona.find({
					where: {
						$or: [{ id_genero: req.body.persona.id_genero }]
					},
				}).then(function (generoEncontrado) {
					var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
						+ ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
						+ ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
						+ ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
					Persona.create({
						nombres: req.body.persona.nombres,
						apellido_paterno: req.body.persona.apellido_paterno,
						apellido_materno: req.body.persona.apellido_materno,
						ci: req.body.persona.ci,
						id_genero: req.body.persona.genero.id,
						nombre_completo: nombre,
						telefono: req.body.persona.telefono,
						telefono_movil: req.body.persona.telefono_movil,
						fecha_nacimiento: req.body.persona.fecha_nacimiento
					}).then(function (personaCreada) {
						var imagen;
						if (req.body.persona.imagen.indexOf('default') > -1) {
							imagen = req.body.persona.imagen;
						} else {
							var imagenPersona = decodeBase64Image(req.body.persona.imagen);
							fs.writeFileSync('./img/persona' + personaCreada.id + '.jpg', imagenPersona.data, 'base64', function (err) { res.json({ mensaje: 'error' }) });
							imagen = './img/persona' + personaCreada.id + '.jpg';
						}
						Persona.update({
							imagen: imagen
						}, {
							where: { id: personaCreada.id }
						}).then(function (affecteedRows) {
							MedicoPaciente.create({
								id_persona: personaCreada.id,
								id_empresa: req.body.id_empresa,
								codigo: req.body.codigo,
								id_extension: req.body.extension.id,
								grupo_sanguineo: req.body.grupo_sanguineo,
								cargo: req.body.cargo,
								id_campo: req.body.campo.id,
								designacion_empresa: req.body.designacion_empresa,
								eliminado: false,
							}).then(function (medicoPacienteCreado) {
								guardarCargo(req, res, RrhhEmpleadoCargo, medicoPacienteCreado)
							});
						});
					});

				})
			})

		})
		.put(ensureAuthorizedlogged, function (req, res) {
			if (req.body.eliminar == undefined) {
				var imagen;
				if (req.body.persona.imagen.indexOf('default') > -1 || req.body.persona.imagen.indexOf('persona' + req.body.persona.id) > -1) {
					imagen = req.body.persona.imagen;
				} else {
					var imagenPersona = decodeBase64Image(req.body.persona.imagen);
					fs.writeFileSync('./img/persona' + req.body.persona.id + '.jpg', imagenPersona.data, 'base64', function (err) { });
					imagen = './img/persona' + req.body.persona.id + '.jpg'; console.log('entro2');
				}
				var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
					+ ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
					+ ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
					+ ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
				Persona.update({
					nombres: req.body.persona.nombres,
					apellido_paterno: req.body.persona.apellido_paterno,
					apellido_materno: req.body.persona.apellido_materno,
					ci: req.body.persona.ci,
					id_genero: req.body.persona.genero.id,
					nombre_completo: nombre,
					telefono: req.body.persona.telefono,
					telefono_movil: req.body.persona.telefono_movil,
					fecha_nacimiento: req.body.persona.fecha_nacimiento,
					imagen: imagen
				}, {
					where: {
						id: req.body.id_persona
					}
				}).then(function (personaActualizada) {
					MedicoPaciente.update({
						id_persona: personaActualizada.id,
						id_empresa: req.body.id_empresa,
						codigo: req.body.codigo,
						id_extension: req.body.extension.id,
						grupo_sanguineo: req.body.grupo_sanguineo,
						cargo: req.body.cargo,
						id_campo: req.body.campo.id,
						designacion_empresa: req.body.designacion_empresa,
						eliminado: req.body.eliminado,
					}, {
						where: { id: req.params.id_paciente }

					}).then(function (medicoPacienteActualizado) {
						guardarCargo(req, res, RrhhEmpleadoCargo)
					})
				})
			} else {
				MedicoPaciente.update({
					eliminado: true
				}, {
					where: {
						id: req.params.id_paciente
					}
				}).then(function (pacienteInactivo) {
					res.json({ mensaje: "Eliminado!" });
				})
			}
		})

		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPaciente.find({
				where: {
					id: req.params.id_paciente
				},
				include: [{ model: Clase, as: 'campo' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }] }, { model: Clase, as: 'extension' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }
					// { model: Empresa, as: 'empresa'},{model:MedicoPrerequisito, as: 'prerequisitos',include: [{ model: Clase, as: 'prerequisitoClase' }]}
				]
			}).then(function (medicoPaciente) {
				res.json(medicoPaciente);
			});
		});
	function guardarCargo(req, res, RrhhEmpleadoCargo, medicoPacienteCreado) {
		var idpaciente = 0
		var mensaje = ""
		if (medicoPacienteCreado) {
			idpaciente = medicoPacienteCreado.id
			mensaje = "Creado Satisfactoriamente!"
		} else {
			idpaciente = req.body.id
			mensaje = "Actualizado Satisfactoriamente!"
		}
		/* RrhhEmpleadoCargo.destroy({
			where: {
				id_empleado: idpaciente
			}
		}).then(function (EmpleadoCargoEliminados) { */
		/* if (req.body.cargos) {
			if (req.body.cargos.length > 0) {
				req.body.cargos.forEach(function (cargo, index, array) {
					RrhhEmpleadoCargo.findOrCreate({
						where: { id_empleado: idpaciente, id_cargo: cargo.id },
						defaults: {
							id_empleado: idpaciente,
							id_cargo: cargo.id
						}
					}).spread(function (ficha, created) {
						if (!created) {
							RrhhEmpleadoCargo.update({
								id_empleado: idpaciente,
								id_cargo: cargo.id
							}, {
									where: { id_empleado: idpaciente, id_cargo: cargo.id }
								}).then(function (actualizado) {
									if (index === (array.length - 1)) {
										res.json({ message: mensaje });
									}
								})

						} else {
							if (index === (array.length - 1)) {
								res.json({ message: mensaje });
							}
						}
					})
				});
			} else {
				res.json({ message: mensaje });
			}
		} else { */
		res.json({ message: mensaje });

		/* } */
		/* }) */
	}
	router.route('/pacientes/ficha_tecnica/excel/upload')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.fichas.forEach(function (fichaActual, index, array) {
				Clase.find({
					where: { nombre: fichaActual.tipo_control }
				}).then(function (tipoControl) {
					MedicoPaciente.find({
						where: { codigo: fichaActual.codigo }
					}).then(function (pacienteEncontrado) {
						console.log(pacienteEncontrado)
						MedicoPacienteFicha.findOrCreate({
							where: { id_paciente: pacienteEncontrado.id, fecha: fichaActual.fecha },
							defaults: {
								id_paciente: pacienteEncontrado.id,
								fecha: fichaActual.fecha,
								estilo_vida: fichaActual.estilo_vida,
								actividad_laboral: fichaActual.actividad_laboral,
								area_operacion: fichaActual.area_operacion,
								riesgo: fichaActual.riesgo,
								// id_persona_referencia: 1, //SE ACTUALIZA AL FINAL
								id_tipo_control: tipoControl.id,
								alergia_humo_cigarrillo: fichaActual.alergia_humo_cigarrillo,
								alergia_polvo: fichaActual.alergia_polvo,
								alergia_picadura: fichaActual.alergia_picadura,
								alergia_quimico: fichaActual.alergia_quimico,
								alergia_algun_material: fichaActual.alergia_algun_material,
								alergia_medicamento: fichaActual.alergia_medicamento,
								alergia_plantas: fichaActual.alergia_plantas,
								alergia_alimentos: fichaActual.alergia_alimentos,
								alergia_conservas: fichaActual.alergia_conservas,
								alergia_otros: fichaActual.alergia_otros,
								alergia_otros_comentario: fichaActual.alergia_otros_comentario,
								es_donante: fichaActual.es_donante,
								enfermedad_hipertension: fichaActual.enfermedad_hipertension,
								enfermedad_cardilogia: fichaActual.enfermedad_cardiologia,
								enfermedad_lumbalgia: fichaActual.enfermedad_lumbalgia,
								enfermedad_diabetes: fichaActual.enfermedad_diabetes,
								enfermedad_digestiva: fichaActual.enfermedad_digestivas,
								enfermedad_epilepsia: fichaActual.enfermedad_epilepsia,
								enfermedad_chagas: fichaActual.enfermedad_chagas,
								enfermedad_asma: fichaActual.enfermedad_asma,
								enfermedad_hepatitis: fichaActual.enfermedad_hepatitis,
								enfermedad_otros: fichaActual.enfermedad_otros,
								enfermedad_comentario: fichaActual.enfermedad_comentario,
								quirurgico_operado: fichaActual.quirurgico_operado,
								quirurgico_comentario: fichaActual.quirurgico_comentario,
								descripcion_indicadores: fichaActual.descripcion_indicadores,
								descripcion_antecedentes: fichaActual.descripcion_antecedentes,
								quirurgico_descripcion: fichaActual.quirurgico_descripcion,
								tratamiento: fichaActual.tratamiento

							}
						}).spread(function (ficha, created) {
							if (created) {
								Persona.findOrCreate({
									where: {
										nombres: fichaActual.nombre_referencia,
										telefono: fichaActual.telefono_referencia,
										telefono_movil: fichaActual.celular_referencia,
										direccion_numero: fichaActual.numero_referencia,
										direccion_zona: fichaActual.zona_referencia,
										direccion_ciudad: fichaActual.ciudad_referencia,
										direccion_localidad: fichaActual.calle_av_referencia
									},
									defaults: {
										nombres: fichaActual.nombre_referencia,
										nombre_completo: fichaActual.nombre_referencia,
										telefono: fichaActual.telefono_referencia,
										telefono_movil: fichaActual.celular_referencia,
										direccion_numero: fichaActual.numero_referencia,
										direccion_zona: fichaActual.zona_referencia,
										direccion_ciudad: fichaActual.ciudad_referencia,
										direccion: fichaActual.calle_av_referencia
									}
								}).spread(function (personaReferencia, created) {
									MedicoPacienteFicha.update({
										id_persona_referencia: personaReferencia.id
									}, {
										where: { id: ficha.id }
									}).then(function (affectedRows) {

									})
								})
							}
							if (index === (array.length - 1)) {
								res.json({ mensaje: "¡Datos de fichas técnicas actualizados satisfactoriamente!" });
							}
						})
					})
				})
			}, this)
			// res.json({ mensaje: 'Creando fichas medicas...' })
		})


	router.route('/pacientes/Vacunas/excel/upload')
		.post(ensureAuthorizedlogged, async function  (req, res) {
			var { datos, id_empresa } = req.body
			if(datos.length > 0 && id_empresa){
				var errors = []
				var cods = new Map()
				var codsInvalid = []
				var vacs = new Map()
				var vacsInvalid = []
				for (let i = 0; i < datos.length; i++) {
					const dato = datos[i];
					if(dato.A){
						if(!cods.has(dato.A)){
							let result =  await MedicoPaciente.findOne({ attributes: ['id'], where:{codigo: dato.A}, raw: true})
							if(result){
								cods.set(dato.A, {id: result.id})
							}else{
								codsInvalid.push(dato.A);
								errors.push({ type: "PACIENTE NO ENCONTRADO", message: `Paciente con <b>CÓDIGO ${ dato.A}</b> no encontrado`, codigo: dato.A, vacuna: dato.B, dosis: dato.C, fecha: dato.D, comentario:dato.E, fila:dato.fila})
							}
						}
						if(dato.B){
							if(!vacs.has(dato.B)){
								let re = await MedicoVacuna.findOne({
									include: [{model: VacunaDosis, as: 'vacunaDosis', where:{ eliminado:false }}],
									where: { nombre: dato.B.trim(), id_empresa:id_empresa, eliminado: false },
								})
								if(re){
									let vacuna = re.dataValues
									if(vacuna.vacunaDosis.length>0){
										let dosis= []
										if(vacuna.vacunaDosis.length == 1){
											let detalle =  vacuna.vacunaDosis[0].dataValues 
											dosis[1] = { id: detalle.id, tipo: detalle.es_dosis, tiempo: null}
										}else{
											dosis = vacuna.vacunaDosis.reduce((acc, curr, i)=> {
												if(i == 0){
													acc[i+1] = {
														id: curr.dataValues.id ,
														tipo: curr.dataValues.es_dosis,
														tiempo: vacuna.vacunaDosis[i+1].dataValues.tiempo
													}
												}else{
													if(vacuna.vacunaDosis.length != i + 1){
														acc[i+1] = {
															id: curr.dataValues.id,
															tipo: curr.dataValues.es_dosis,
															tiempo: vacuna.vacunaDosis[i+1].dataValues.tiempo
														}
													}else{
														acc[i+1] = {
															id: curr.dataValues.id ,
															tipo: curr.dataValues.es_dosis,
															tiempo: null
														}
													}
												}
												return acc
											}, {})
										}
										vacs.set(dato.B, {id: re.id, unico: re.unico, totalDosis: vacuna.vacunaDosis.length, dosis:dosis})
									}else{
										errors.push({ type: "VACUNA NO CONFIGURADA", message: `La vacuna con <b>${ dato.B}</b> no tiene configurada sus <b>dosis</b>.`, codigo: dato.A, vacuna: dato.B, dosis: dato.C, fecha: dato.D, comentario: dato.E, fila:dato.fila})
									}
								}else{
									vacsInvalid.push(dato.B);
									errors.push({ type: "VACUNA NO ENCONTRADA", message: `Vacuna con <b>NOMBRE ${ dato.B}</b> no encontrado`, codigo: dato.A, vacuna: dato.B, dosis: dato.C, fecha: dato.D, comentario: dato.E, fila:dato.fila})
								}
							}
						}else{
							errors.push({ type: "VACUNA NO VÁLIDO", message: `La vacuna no existe en el sistema`, codigo: dato.A, vacuna: dato.B, dosis: dato.C, fecha: dato.D, comentario: dato.E, fila:dato.fila })
						}
					}else{
						errors.push({ type: "CÓDIGO NO VÁLIDO", message: `Código de paciente no válido`, codigo: dato.A, vacuna: dato.B, dosis: dato.C, fecha: dato.D, comentario: dato.E, fila:dato.fila })
					}
				}
				if(errors.length > 0) {
					res.json({ error : true, errors: errors, saved: false,  message: 'El archivo de importación tiene errores.', messageType: "error"})
				}else{
					procesarDatosImportacion(req, res, datos, cods, vacs);
				}
			}else{
				res.json({ error: true, message: 'Los datos y empresa son requeridos.', messageType:"error" })
			}
		})

	async function procesarDatosImportacion(req, res, datos, cods, vacs){	
		let errors = []
		let details = new Map()
		try {
			for (let i = 0; i < datos.length; i++) {
				var registro = datos[i];
				if(!details.has(registro.A)){
					details.set(registro.A, {valid: true, vacunas: [] })
				}
				if(cods.has(registro.A) && vacs.has(registro.B) && details.get(registro.A).valid){
					let paciente = cods.get(registro.A);
					let vacuna = vacs.get(registro.B)
				  var pac = await MedicoPacienteVacuna.findOne({ attributes: ['id','fecha_ultima_aplicacion'], where:{ id_paciente: paciente.id , id_vacuna: vacuna.id }, raw: true})
					if(pac){
						if(!pac.fecha_ultima_aplicacion){
							var d = new Date(Date.parse(registro.D))
							let pacAct = await MedicoPacienteVacuna.update({
								id_paciente: paciente.id, 
								id_vacuna: vacuna.id, 
								fecha_ultima_aplicacion: registro.D, 
								fecha_siguiente_aplicacion: vacuna.dosis[1].tiempo ? vacuna.dosis[1].tipo ? d.setDate(d.getDate() + vacuna.dosis[1].tiempo) : d.setMonth(d.getMonth() + vacuna.dosis[1].tiempo) : null, 
								eliminado: false },{
									where: { id:pac.id }
								});
							if(pacAct){
								let vacCreado = await MedicoPacienteVacunaDosis.create({
									id_paciente_vacuna: pac.id,
									fecha_aplicacion: registro.D,
									eliminado: false,
									id_dosis: vacuna.dosis[1].id,
									comentario: registro.E
								})
							}
						}else{
							if(vacuna.totalDosis>=registro.C){
								if(vacuna.dosis[registro.C] && registro.C > 1){
									let det = details.get(registro.A);
									if(!det.vacunas.includes(registro.B)){
										let [prevData] = await MedicoPacienteVacunaDosis.findAll({ where:{ id_paciente_vacuna: pac.id }, raw:true, order:[['id','DESC']]})
										if(vacuna.dosis[registro.C-1].id == prevData.id_dosis){
											var d = new Date(Date.parse(registro.D))
											let upd = await MedicoPacienteVacuna.update({
												fecha_ultima_aplicacion: registro.D,
												fecha_siguiente_aplicacion: vacuna.dosis[registro.C].tiempo ? vacuna.dosis[registro.C].tipo ? d.setDate(d.getDate() + vacuna.dosis[registro.C].tiempo) : d.setMonth(d.getMonth() + vacuna.dosis[registro.C].tiempo) : null, 
											}, { where: { id: pac.id } })
		
											let pvdguardado = await MedicoPacienteVacunaDosis.create({
												id_paciente_vacuna: pac.id,
												fecha_aplicacion: registro.D,
												eliminado: false,
												id_dosis: vacuna.dosis[registro.C].id,
												comentario: registro.E
											})
										}else{
											details.set(registro.A, {valid: false, vacunas: [registro.B] })
											console.log(details.get(registro.A));
											errors.push({ type: "DOSIS VACUNA INCORRECTO "+registro.B , message: `No se aplicó ninguna dosis de la vacuna <b>${ registro.B}</b>`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario:registro.E, fila:registro.fila})
											
										}
									}
								}else{
									details.set(registro.A, {valid: false, vacunas: [registro.B] })
									errors.push({ type: "DOSIS DUPLICADA", message: `Se intenta aplicar dosis duplicada de <b>${ registro.B}</b>`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario:registro.E, fila:registro.fila})
								}
							}else{
								details.set(registro.A, {valid: false, vacunas: [registro.B] })
								errors.push({ type: "DOSIS NO REGISTRADO EN SISTEMA", message: `Se intenta aplicar dosis inexistente de <b>${ registro.B}</b>`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario:registro.E, fila:registro.fila})
							}
						}	
					}else{
						if(registro.C === 1){
							var d = new Date(Date.parse(registro.D))
							let pacCreado = await MedicoPacienteVacuna.create({
								id_paciente: paciente.id, 
								id_vacuna: vacuna.id, 
								fecha_ultima_aplicacion: registro.D, 
								fecha_siguiente_aplicacion: vacuna.unico ? null : vacuna.dosis[1].tipo ? d.setDate(d.getDate() + vacuna.dosis[1].tiempo) : d.setMonth(d.getMonth() + vacuna.dosis[1].tiempo), 
								eliminado: false });
							if(pacCreado && pacCreado.id){
								let vacCreado = await MedicoPacienteVacunaDosis.create({
									id_paciente_vacuna: pacCreado.id,
									fecha_aplicacion: registro.D,
									eliminado: false,
									id_dosis: vacuna.dosis[1].id,
									comentario: registro.E
								})
							}
						}else{
							details.set(registro.A, {valid: false, vacunas: [registro.B] })
							console.log(details.get(registro.A));
							errors.push({ type: "PACIENTE SIN PRIMERA DOSIS DE "+registro.B , message: `No se aplicó ninguna dosis de la vacuna <b>${ registro.B}</b>`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario: registro.E, fila:registro.fila})
						}
					}
				}else{
					if(!cods.has(registro.A)) errors.push({ type: "PACIENTE NO REGISTRADO", message: `Paciente con <b>CÓDIGO ${ registro.A}</b> no encontrado`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario: registro.E, fila:registro.fila})
					if(!vacs.has(registro.B)) errors.push({ type: "VACUNA NO ENCONTRADA", message: `La vacuna con <b> ${ registro.B}</b> no existe`, codigo: registro.A, vacuna: registro.B, dosis: registro.C, fecha: registro.D, comentario: registro.E, fila:registro.fila})
				}
			}
			res.json({error: false, errors: errors, saved: true, message: "<b>Datos importados con éxitos</b><br>", messageType:"success"})
		} catch (error) {
			res.json({error: true, errors: errors, saved: true, message: "<b>Error al importar datos</b><br>"+error, messageType:"error"})
		}
	}
	
	router.route('/pacientes/empresa/excel/upload')
		.post(ensureAuthorizedlogged, function (req, res) {
			var arregloSucursales = []
			var bandera = false
			req.body.pacientes.forEach(function (pacienteActual, index, array) {
				if (arregloSucursales.length > 0) {
					for (var i = 0; i < arregloSucursales.length; i++) {
						var element = arregloSucursales[i];
						if (element == pacienteActual.campamento) {
							bandera = true
						}
					}
					if (!bandera) {
						arregloSucursales.push(pacienteActual.campamento)
					}
				} else {
					arregloSucursales.push(pacienteActual.campamento)
				}
				if (index === (array.length - 1)) {
					arregloSucursales.forEach(function (sucursal, index2, array2) {
						Tipo.find({
							where: {
								nombre_corto: 'CENCOS',
								id_empresa: req.body.id_empresa
							}
						}).then(function (tipo) {
							Clase.findOrCreate({
								where: {
									nombre: sucursal,
									nombre_corto: sucursal,
									id_tipo: tipo.dataValues.id
								},
								defaults: {
									nombre: sucursal,
									id_tipo: tipo.dataValues.id,
									habilitado: true,
									eliminado: false
								}
							})
						})
						Sucursal.findOrCreate({
							where: {
								nombre: sucursal,
								id_empresa: req.body.id_empresa
							},
							defaults: {
								nombre: sucursal,
								id_empresa: req.body.id_empresa
							}
						})
						if (index2 === (array2.length - 1)) {
							req.body.pacientes.forEach(function (pacienteActual, index, array) {
								Clase.find({
									where: { nombre_corto: pacienteActual.genero }
								}).then(function (generoEncontrado) {
									MedicoPaciente.find({
										where: { codigo: pacienteActual.codigo }
									}).then(function (pacienteFound) {
										// console.log(pacienteFound)
										if (pacienteFound != null) {
											var imagen;
											if (pacienteActual.imagen.indexOf('default') > -1) {
												imagen = pacienteActual.imagen;
											} else {
												var imagenPersona = decodeBase64Image(pacienteActual.imagen);
												fs.writeFileSync('./img/persona' + pacienteFound.id_persona + '.jpg', imagenPersona.data, 'base64', function (err) { });
												imagen = './img/persona' + pacienteFound.id_persona + '.jpg';
											}
											var nombre = (pacienteActual.apellido_paterno != undefined || pacienteActual.apellido_paterno != null ? pacienteActual.apellido_paterno : '')
												+ ' ' + (pacienteActual.apellido_materno != undefined || pacienteActual.apellido_materno != null ? pacienteActual.apellido_materno : '')
												+ ' ' + (pacienteActual.nombres != undefined || pacienteActual.nombres != null ? pacienteActual.nombres : '')
											Persona.update({
												nombres: pacienteActual.nombres,
												apellido_paterno: pacienteActual.apellido_paterno,
												apellido_materno: pacienteActual.apellido_materno,
												ci: pacienteActual.ci,
												imagen: imagen,
												id_genero: generoEncontrado.id,
												nombre_completo: nombre,
												telefono: pacienteActual.telefono,
												telefono_movil: pacienteActual.telefono_movil,
												fecha_nacimiento: pacienteActual.fecha_nacimiento,
												activo: true,
											}, {
												where: {
													id: pacienteFound.id_persona
												}
											}).then(function (personaActualizada) {
												Tipo.find({
													where: { nombre_corto: 'RRHH_EXP', id_empresa: req.body.id_empresa }
												}).then(function (tipoExp) {
													var nombre_corto2 = pacienteActual.extension.substr(0, 3);
													Clase.findOrCreate({
														where: {
															nombre: pacienteActual.extension,
															id_tipo: tipoExp.dataValues.id,
														},
														defaults: {
															id_tipo: tipoExp.dataValues.id,
															nombre: pacienteActual.extension,
															nombre_corto: nombre_corto2,
															habilitado: true,
															eliminado: false
														}
													}).spread(function (expClase, created) {
														MedicoPaciente.update({
															id_persona: personaActualizada.id,
															id_empresa: req.body.id_empresa,
															codigo: pacienteActual.codigo,
															id_extension: expClase.id,
															grupo_sanguineo: pacienteActual.grupo_sanguineo,
															cargo: pacienteActual.cargo,
															id_campo: pacienteActual.campamento,
															designacion_empresa: pacienteActual.designacion_empresa,
															eliminado: false,
															es_empleado: false
														}, {
															where: { id: pacienteFound.id }

														}).then(function (medicoPacienteActualizado) {
															RrhhEmpleadoCargo.findAll({
																where: {
																	id_empleado: pacienteFound.id,
																},
																include: [{ model: Clase, as: 'cargo', include: [{ model: Tipo, as: 'tipo' }] }]
															}).then(function (EmpleadoCargos) {
																var dato = 0;
																/* EmpleadoCargos.forEach(function (cargo, index, array) {
																	var nombre_corto = pacienteActual.cargo.substr(0, 3);
																	Clase.findOrCreate({
																		where: {
																			nombre: pacienteActual.cargo,
																			id_tipo: cargo.dataValues.cargo.dataValues.tipo.dataValues.id,
																		},
																		defaults: {
																			id_tipo: cargo.dataValues.cargo.dataValues.tipo.dataValues.id,
																			nombre: pacienteActual.cargo,
																			nombre_corto: nombre_corto
																		}
																	}).spread(function (cargoClase, created) {
																		RrhhEmpleadoCargo.findOrCreate({
																			where: {
																				id_empleado: pacienteFound.id,
																				id_cargo: cargoClase.id,
																			},
																			defaults: {
																				id_empleado: pacienteFound.id,
																				id_cargo: cargoClase.id,
																			}
																		}).spread(function (cargoAc, created) {
																			if (index === (array.length - 1)) { */
																res.json({ mensaje: "¡Datos de pacientes actualizados satisfactoriamente!" });
																/* 	}
																})
															})
	
														}); */
															})
														})
													})
												})
											})
										} else {
											console.log('paciente nuevo')
											var nombre = (pacienteActual.apellido_paterno != undefined || pacienteActual.apellido_paterno != null ? pacienteActual.apellido_paterno : '')
												+ ' ' + (pacienteActual.apellido_materno != undefined || pacienteActual.apellido_materno != null ? pacienteActual.apellido_materno : '')
												+ ' ' + (pacienteActual.nombres != undefined || pacienteActual.nombres != null ? pacienteActual.nombres : '')
											Persona.create({
												nombres: pacienteActual.nombres,
												apellido_paterno: pacienteActual.apellido_paterno,
												apellido_materno: pacienteActual.apellido_materno,
												ci: pacienteActual.ci,
												id_genero: generoEncontrado.id,
												nombre_completo: nombre,
												telefono: pacienteActual.telefono,
												telefono_movil: pacienteActual.telefono_movil,
												fecha_nacimiento: pacienteActual.fecha_nacimiento,
												activo: true,
											}).then(function (personaCreada) {
												var imagen;
												if (pacienteActual.imagen.indexOf('default') > -1) {
													imagen = pacienteActual.imagen;
												} else {
													var imagenPersona = decodeBase64Image(pacienteActual.imagen);
													fs.writeFileSync('./img/persona' + personaCreada.id + '.jpg', imagenPersona.data, 'base64', function (err) { });
													imagen = './img/persona' + personaCreada.id + '.jpg';

												}
												Persona.update({
													imagen: imagen
												}, {
													where: {
														id: personaCreada.id
													}
												}).then(function (imagenAct) {
													Tipo.find({
														where: { nombre_corto: 'RRHH_EXP', id_empresa: req.body.id_empresa }
													}).then(function (tipoExp) {
														var nombre_corto2 = pacienteActual.extension.substr(0, 3);
														Clase.findOrCreate({
															where: {
																nombre: pacienteActual.extension,
																id_tipo: tipoExp.dataValues.id,
															},
															defaults: {
																id_tipo: tipoExp.dataValues.id,
																nombre: pacienteActual.extension,
																nombre_corto: nombre_corto2,
																habilitado: true,
																eliminado: false
															}
														}).spread(function (expClase, created) {
															Tipo.find({
																where: {
																	nombre_corto: 'CENCOS',
																	id_empresa: req.body.id_empresa
																}
															}).then(function (tipo) {
																Clase.findOrCreate({
																	where: {
																		nombre: pacienteActual.campamento,
																		id_tipo: tipo.dataValues.id
																	},
																	defaults: {
																		nombre: pacienteActual.campamento,
																		id_tipo: tipo.dataValues.id,
																		habilitado: true,
																		eliminado: false
																	}
																}).spread(function (centroCosto, created2) {
																	MedicoPaciente.create({
																		id_persona: personaCreada.id,
																		id_empresa: req.body.id_empresa,
																		codigo: pacienteActual.codigo,
																		grupo_sanguineo: pacienteActual.grupo_sanguineo,
																		cargo: pacienteActual.cargo,
																		id_extension: expClase.id,
																		id_campo: centroCosto.id,
																		designacion_empresa: pacienteActual.designacion_empresa,
																		eliminado: false,
																		es_empleado: false
																		//comentario: pacienteActual.comentario
																	}).then(function (medicoPacienteActualizado) {
																		/* Tipo.find({
																			where: { nombre_corto: 'RRHH_CARGO' }
																		}).then(function (tipoCargo) {
																			var nombre_corto = pacienteActual.cargo.substr(0, 3);
																			Clase.findOrCreate({
																				where: {
																					nombre: pacienteActual.cargo,
																					id_tipo: tipoCargo.dataValues.id,
																				},
																				defaults: {
																					id_tipo: tipoCargo.dataValues.id,
																					nombre: pacienteActual.cargo,
																					nombre_corto: nombre_corto
																				}
																			}).spread(function (cargoClase, created) {
																				RrhhEmpleadoCargo.create({
																					id_empleado: medicoPacienteActualizado.id,
																					id_cargo: cargoClase.id
																				}).then(function (params) {
					
					
																					if (index === (array.length - 1)) { */
																		res.json({ mensaje: "¡Datos de pacientes actualizados satisfactoriamente!" });
																		/* 	}
			
			
																		})
			
																	}) 
																})*/
																	})
																})
															})


														})
													})
												})
											})
										}
									})
								});
							})
						}
					})
				}
			})

		})
	router.route('/pacientes/SOAP/excel/upload')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.SOAPLista.forEach(function (soap, index, array) {
				MedicoPaciente.find({
					where: { codigo: soap.codigo }
				}).then(function (pacienteEncontrado) {
					var fecha_inicio = new Date(soap.fecha)
					var fecha_fin = new Date(soap.fecha)
					fecha_inicio.setMinutes(0)
					fecha_inicio.setHours(0)
					fecha_fin.setMinutes(59)
					fecha_fin.setHours(23)
					MedicoPacienteConsulta.findOrCreate({
						where: {
							fecha: { $between: [fecha_inicio, fecha_fin] },
							id_paciente: pacienteEncontrado.id
						},
						defaults: {
							id_paciente: pacienteEncontrado.id,
							fecha: soap.fecha,
							subjetivo: soap.subjetivo,
							objetivo: soap.objetivo,
							analitico: soap.analitico,
							plan: soap.plan,
							evolucion: soap.evolucion
						}
					}).spread(function (soapActual, created) {
						if (!created) {
							MedicoPacienteConsulta.update({
								fecha: soap.fecha,
								subjetivo: soap.subjetivo,
								objetivo: soap.objetivo,
								analitico: soap.analitico,
								plan: soap.plan,
								evolucion: soap.evolucion
							}, {
								where: { id: soapActual.id }
							})
						}
						if (index === (array.length - 1)) {
							res.json({ mensaje: "¡Datos de SOAP pacientes actualizados satisfactoriamente!" });
						}
					})
				})
			}, this)
		})
	router.route('/pacientes/signos_vitales/excel/upload')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.signosVitales.forEach(function (signo_vital, index, array) {
				MedicoPaciente.find({
					where: { codigo: signo_vital.codigo }
				}).then(function (pacienteEncontrado) {
					var fecha_inicio = new Date(signo_vital.fecha)
					var fecha_fin = new Date(signo_vital.fecha)
					fecha_inicio.setMinutes(0)
					fecha_inicio.setHours(0)
					fecha_fin.setMinutes(59)
					fecha_fin.setHours(23)
					MedicoPacienteConsulta.findOrCreate({
						where: {
							fecha: { $between: [fecha_inicio, fecha_fin] },
							id_paciente: pacienteEncontrado.id
						},
						defaults: {
							id_paciente: pacienteEncontrado.id,
							fecha: signo_vital.fecha,
							presion: signo_vital.presion,
							pulso: signo_vital.pulso,
							talla: signo_vital.talla,
							peso: signo_vital.peso,
							temperatura: signo_vital.temperatura,
							frecuencia_respiratoria: signo_vital.frecuencia_respiratoria,
							frecuencia_cardiaca: signo_vital.frecuencia_cardiaca
						}
					}).spread(function (signoVitalActual, created) {
						if (!created) {
							MedicoPacienteConsulta.update({
								fecha: signo_vital.fecha,
								presion: signo_vital.presion,
								pulso: signo_vital.pulso,
								talla: signo_vital.talla,
								peso: signo_vital.peso,
								temperatura: signo_vital.temperatura,
								frecuencia_respiratoria: signo_vital.frecuencia_respiratoria,
								frecuencia_cardiaca: signo_vital.frecuencia_cardiaca
							}, {
								where: { id: signoVitalActual.id, fecha: { $between: [fecha_inicio, fecha_fin] } }
							})
						}
						if (index === (array.length - 1)) {
							res.json({ mensaje: "¡Datos de consultas actualizados satisfactoriamente!" });
						}
					})
				})
			}, this);
		})

	// ========= ruta para obtener pacientes x su nit ==============
	router.route('/pacientes/empresa/:id_empresa/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			var orCondition = []; console.log(req.params.texto);
			if (req.params.texto == 0) {
				orCondition.push({ ci: req.params.texto });
			} else if (req.params.texto) {
				orCondition.push({ ci: req.params.texto });
			}
			orCondition.push({ nombre_completo: { $like: "%" + req.params.texto + "%" } });
			MedicoPaciente.findAll({
				where: {
					empresa: req.params.id_empresa
				},
				include: [{ model: Clase, as: 'campo' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }] }, { model: Clase, as: 'extension' }, { model: Persona, as: 'persona', where: { $or: orCondition }, include: [{ model: Clase, as: 'genero' }] }
					// { model: Empresa, as: 'empresa'},{model:MedicoPrerequisito, as: 'prerequisitos',include: [{ model: Clase, as: 'prerequisitoClase' }]}
				]
			}).then(function (pacientes) {
				res.json(pacientes);
			});
		})

	/* router.route('/pacientes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado')
		.get(ensureAuthorizedlogged,function (req, res) {
			var condicion = ""
			var activo = "false"
			if (req.params.codigo != "0") {
				condicion += "codigo like '%" + req.params.codigo + "%'"
			}
			if (req.params.nombres != "0") {
				if (condicion.length > 1) {
					condicion += " or nombre_completo like '%" + req.params.nombres + "%'"
				} else {
					condicion += "nombre_completo like '%" + req.params.nombres + "%'"
				}
			}
			if (req.params.ci != "0") {
				if (condicion.length > 1) {
					condicion += " or ci like '%" + req.params.ci + "%'"
				} else {
					condicion += "ci like '%" + req.params.ci + "%'"
				}
			}
			if (req.params.campo != "0") {
				if (condicion.length > 1) {
					condicion += " or campo like '%" + req.params.campo + "%'"
				} else {
					condicion += "campo like '%" + req.params.campo + "%'"
				}
			}
			if (req.params.cargo != "0") {
				if (condicion.length > 1) {
					condicion += " or cargo like '%" + req.params.cargo + "%'"
				} else {
					condicion += "cargo like '%" + req.params.cargo + "%'"
				}
			}
			if (req.params.busquedaEmpresa != "0") {
				if (condicion.length > 1) {
					condicion += " or designacion_empresa like '%" + req.params.busquedaEmpresa + "%'"
				} else {
					condicion += "designacion_empresa like '%" + req.params.busquedaEmpresa + "%'"
				}
			}
			if (req.params.grupo_sanguineo != "0") {
				if (condicion.length > 1) {
					condicion += " or grupo_sanguineo like '%" + req.params.grupo_sanguineo + "%'"
				} else {
					condicion += "grupo_sanguineo like '%" + req.params.grupo_sanguineo + "%'"
				}
			}
	
			if (req.params.estado != "0") {
				if (req.params.estado === 'Inactivo') {
					activo = "false"
				} else {
					activo = "true"
				}
			}
			if (req.params.texto_busqueda != 0) {
				if (condicion.length > 1) {
					condicion += " or nombre_completo like '%" + req.params.texto_busqueda + "%' or codigo like '%" + req.params.texto_busqueda + "%' or ci like '%" + req.params.texto_busqueda + "%' or designacion_empresa like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or campo like '%" + req.params.texto_busqueda + "%' or cargo like '%" + req.params.texto_busqueda + "%' or extension like '%" + req.params.texto_busqueda + "%'"
				} else {
					condicion += "nombre_completo like '%" + req.params.texto_busqueda + "%' or codigo like '%" + req.params.texto_busqueda + "%' or ci like '%" + req.params.texto_busqueda + "%' or designacion_empresa like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or campo like '%" + req.params.texto_busqueda + "%' or cargo like '%" + req.params.texto_busqueda + "%' or extension like '%" + req.params.texto_busqueda + "%'"
				}
			}
			console.log(condicion)
	
			if (condicion.length > 1) {
				sequelize.query("select count(*) as cantidad_pacientes from agil_medico_paciente inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) where agil_medico_paciente.eliminado = " + activo + " AND (" + condicion + ")", { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select agil_medico_paciente.id as 'id', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
						agil_medico_paciente.empresa as 'id_empresa', agil_medico_paciente.extension as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo', \
						agil_medico_paciente.cargo as 'cargo', agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa', agil_medico_paciente.comentario as 'comentario', \
						gl_persona.nombre_completo as 'nombre_completo', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
						gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
						gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
						from agil_medico_paciente inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id)\
						where agil_medico_paciente.empresa = "+ req.params.id_empresa + " AND agil_medico_paciente.eliminado = " + activo + " AND (" + condicion + ") \
						GROUP BY agil_medico_paciente.id order by "+ req.params.columna + " " + req.params.direccion + " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina, options)
							.then(function (pacientes) {
								res.json({ pacientes: pacientes, paginas: Math.ceil(data[0].cantidad_pacientes / req.params.items_pagina) });
							});
					});
			} else {
				sequelize.query("select count(*) as cantidad_pacientes from agil_medico_paciente inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) where  agil_medico_paciente.eliminado = " + activo, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select agil_medico_paciente.id as 'id', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
						agil_medico_paciente.empresa as 'id_empresa', agil_medico_paciente.extension as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo', \
						agil_medico_paciente.cargo as 'cargo', agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
						gl_persona.nombre_completo as 'nombre_completo', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
						gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
						gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
						from agil_medico_paciente inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id)\
						where agil_medico_paciente.empresa = "+ req.params.id_empresa + " AND agil_medico_paciente.eliminado = " + activo + " GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion + " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina, options)
							.then(function (pacientes) {
								res.json({ pacientes: pacientes, paginas: Math.ceil(data[0].cantidad_pacientes / req.params.items_pagina) });
							});
					});
			}
		});
	*/
	router.route('/pacientes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado/apellido/:apellido')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicion = ""
			var condicionCargo = ""
			var activo = "true"
			var condicionContrato = ""
			if (req.params.codigo != "0") {
				condicion += "codigo like '%" + req.params.codigo + "%'"
			}
			if (req.params.nombres != "0") {
				if (condicion.length > 1) {
					condicion += " or gl_persona.nombre_completo like '%" + req.params.nombres + "%'"
				} else {
					condicion += "gl_persona.nombre_completo like '%" + req.params.nombres + "%'"
				}
			}
			if (req.params.apellido != "0") {
				if (condicion.length > 1) {
					condicion += " or nombre_completo like '%" + req.params.apellido + "%'"
				} else {
					condicion += "nombre_completo like '%" + req.params.apellido + "%'"
				}
			}
			if (req.params.ci != "0") {
				if (condicion.length > 1) {
					condicion += " or ci like '%" + req.params.ci + "%'"
				} else {
					condicion += "ci like '%" + req.params.ci + "%'"
				}
			}
			if (req.params.campo != "0") {
				if (condicion.length > 1) {
					condicion += " and campo like '%" + req.params.campo + "%'"
				} else {
					condicion += "campo like '%" + req.params.campo + "%'"
				}
			}
			if (req.params.cargo != "0") {
				condicionCargo = "AND cargos.cargo = " + req.params.cargo
			} else {
				condicionCargo = ""
			}
			if (req.params.busquedaEmpresa != "0") {
				if (condicion.length > 1) {
					condicion += " or designacion_empresa like '%" + req.params.busquedaEmpresa + "%'"
				} else {
					condicion += "designacion_empresa like '%" + req.params.busquedaEmpresa + "%'"
				}
			}
			if (req.params.grupo_sanguineo != "0") {
				if (condicion.length > 1) {
					condicion += " or grupo_sanguineo like '%" + req.params.grupo_sanguineo + "%'"
				} else {
					condicion += "grupo_sanguineo like '%" + req.params.grupo_sanguineo + "%'"
				}
			}

			if (req.params.estado != "0") {
				if (req.params.estado === 'Inactivo') {

					activo = " AND agil_medico_paciente.eliminado = false"

				} else {
					activo = " AND agil_medico_paciente.eliminado = true"
				}
			} else {
				activo = " AND agil_medico_paciente.eliminado = false"
			}
			if (req.params.texto_busqueda != "0") {
				if (condicion.length > 1) {
					condicion += " or nombre_completo like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or campo like '%" + req.params.texto_busqueda + "%'"
				} else {
					condicion += "nombre_completo like '%" + req.params.texto_busqueda + "%' or ci like '%" + req.params.texto_busqueda + "%' or designacion_empresa like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or campo like '%" + req.params.texto_busqueda + "%'"
				}
			}
			console.log(condicion)
			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}
			const items = req.params.items_pagina && (req.params.items_pagina === '0' ? '' : req.params.items_pagina)


			if (condicion.length > 1 && req.params.cargo == 0) {
				sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa', agil_medico_paciente.comentario as 'comentario', \
                gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
				,campamento.nombre as 'campamento', ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
				LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
				LEFT JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) LEFT JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
				LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " AND (" + condicion + ") \
                GROUP BY agil_medico_paciente.id order by "+ req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' },
							{ model: Clase, as: 'extension' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa', agil_medico_paciente.comentario as 'comentario', \
                    gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
					LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
					LEFT JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) LEFT JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
					LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                    LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " AND (" + condicion + ")\
                    GROUP BY agil_medico_paciente.id order by "+ req.params.columna + " " + req.params.direccion + limite, options)
							.then(function (pacientes) {
								var a = ""
								var arregloCargos = []
								if (pacientes.length > 0) {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								} else {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								}
							});
					});
			} else if (req.params.cargo != 0 && condicion.length > 1) {
				sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
				,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' \
				from agil_medico_paciente "+ condicionContrato + "\
				LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
				inner JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
				LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
				LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id \
				where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " AND (" + condicion + ") GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' },
							{ model: Clase, as: 'extension' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
					LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
					inner JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
					LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                    LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " AND (" + condicion + ") GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion + limite, options)
							.then(function (pacientes) {
								var a = ""
								var arregloCargos = []
								if (pacientes.length > 0) {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								} else {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });

								}
							});
					});
			} else if (req.params.cargo != 0) {
				const condicioncargo = " and `cargos.cargo`.id = " + req.params.cargo
				sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
				,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
				LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
				inner JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
				LEFT JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + condicioncargo + " GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' },
							{ model: Clase, as: 'extension' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
					LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
					inner JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
					LEFT JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id and `cargos.cargo`.id = "+ req.params.cargo + " inner join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                    LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + condicioncargo + " GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion + limite, options)
							.then(function (pacientes) {
								var a = ""
								var arregloCargos = []
								if (pacientes.length > 0) {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								} else {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								}
							});
					});
			} else {
				sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',fichas.id as 'id_ficha',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
				,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' from agil_medico_paciente "+ condicionContrato + "\
				LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
				left JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id order by id desc limit 1) left JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha\
				LEFT JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id left join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
                LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						var options = {
							model: MedicoPaciente,
							include: [{ model: Persona, as: 'persona' },
							{ model: Clase, as: 'extension' }]
						};
						Sequelize.Model.$validateIncludedElements(options);
						sequelize.query("select DISTINCT agil_medico_paciente.id as 'id', agil_medico_paciente.id_grupo_sanguineo,agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',fichas.id as 'id_ficha',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    gl_persona.nombre_completo as 'nombre_completo',fichas.fecha_inicio as 'fecha_inicio', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    gl_persona.nombres as 'nombres',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'eliminado', IF(agil_medico_paciente.eliminado=1, FALSE, TRUE) as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_ciudad as 'residencia', gl_persona.direccion_zona as 'zona', gl_persona.direccion_numero as 'numero', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
					,campamento.nombre as 'campamento', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, ficha_paciente.id AS 'id_ficha_paciente' \
					from agil_medico_paciente "+ condicionContrato + "\
					LEFT JOIN agil_medico_paciente_ficha AS ficha_paciente ON ficha_paciente.id=(SELECT agil_medico_paciente_ficha.id FROM agil_medico_paciente_ficha WHERE agil_medico_paciente_ficha.id_paciente=agil_medico_paciente.id ORDER BY id DESC LIMIT 1)\
					left JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id and agil_rrhh_empleado_ficha.activo = true order by id desc limit 1) left JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha\
					LEFT JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id left join gl_persona ON (agil_medico_paciente.persona = gl_persona.id) LEFT JOIN gl_clase ON (agil_medico_paciente.extension = gl_clase.id)\
					LEFT JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id \
					where agil_medico_paciente.empresa = "+ req.params.id_empresa + activo + " GROUP BY agil_medico_paciente.id order by " + req.params.columna + " " + req.params.direccion + limite, options)
							.then(function (pacientes) {
								var a = ""
								var arregloCargos = []
								if (pacientes.length > 0) {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
								} else {
									res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });

								}
							});
					});
			}
		})

	router.route('/pacientes/empresa/:id_empresa/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado')
		.get(ensureAuthorizedlogged, function (req, res) {
			condicion = {};

			condicion.id_empresa = req.params.id_empresa;
			if (req.params.codigo != "0") {
				condicion.codigo = req.params.codigo
			}

			condicionPersona = {};
			if (req.params.nombres != "0") {
				condicionPersona.nombre_completo = { $like: "%" + req.params.nombres + "%" }
			}
			if (req.params.ci != "0") {
				condicionPersona.ci = req.params.ci;
			}
			if (req.params.campo != "0") {
				condicion.id_campo = Number(req.params.campo);
			}

			var consultaCargo = {};
			if (req.params.cargo != "0") {
				consultaCargo.id_cargo = Number(req.params.cargo);
			}

			if (req.params.busquedaEmpresa != 0) {
				condicion.designacion_empresa = { $like: "%" + req.params.busquedaEmpresa + "%" };
			}

			if (req.params.estado != "0") {
				if (req.params.estado == "Activo") {
					condicion.eliminado = false
				} else {
					condicion.eliminado = true
				}
			}

			MedicoPaciente.findAll({
				where: condicion,
				include: [{ model: MedicoPacientePreRequisito, as: 'pacientesPrerequisitos', include: [{ model: MedicoPrerequisito, as: 'preRequisito' }] },
				{ model: Persona, as: 'persona', where: condicionPersona },
				{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoCargo, as: 'cargos', where: consultaCargo }] }]
			}).then(function (prerequisitos) {
				res.json({ prerequisitos: prerequisitos })
			})
		})

	router.route('/vacunas/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoVacuna.update({
				nombre: req.body.nombre,
				observacion: req.body.observacion
			}, {
				where: { id: req.body.id }
			}).then(function (vacunaActualizada) {
				var memo = "Vacuna actualizada"
				req.body.vacunaDosis.forEach(function (dosis, index, array) {
					if (dosis.id > 0 && dosis.eliminar == undefined) {
						VacunaDosis.update({
							es_dosis: dosis.es_dosis,
							tiempo: dosis.tiempo,
							numero: dosis.numero,
							id_vacuna: dosis.id_vacuna,
							unico: dosis.unico,
							eliminado: dosis.eliminado
						}, {
							where: { id: dosis.id, id_vacuna: dosis.id_vacuna }
						}).then(function (dosis_Creada) {
							if (index === array.length - 1) {
								res.json({ mensaje: memo })
							}
						})
					} else if (dosis.id == undefined && dosis.eliminar == undefined) {
						VacunaDosis.create({
							es_dosis: dosis.es_dosis,
							tiempo: dosis.tiempo,
							numero: dosis.numero,
							id_vacuna: req.body.id,
							unico: dosis.unico,
							eliminado: false
						}).then(function (dosis_Creada) {
							if (index === array.length - 1) {
								res.json({ mensaje: memo })
							}
						})
					} else if (dosis.eliminar == true) {
						var lmax = 0
						MedicoPacienteVacuna.findAndCountAll({
							where: { id_vacuna: req.body.id },
							include: [{ model: MedicoVacuna, as: 'pacienteVacuna', include: [{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }] }, { model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', order: [['createdAt', 'desc']] }]
						}).then(function (vacunasPaciente) {
							if (vacunasPaciente.count > 0) {
								var a = vacunasPaciente.rows
								a.forEach(function (vacun, indexb, arrayb) {

									MedicoPacienteVacunaDosis.findAndCountAll({
										where: {
											id_paciente_vacuna: vacun.dataValues.id
										}
									}).then(function (dosisCount) {
										console.log(dosisCount)
										lmax = (lmax <= dosisCount.count) ? dosisCount.count : lmax
										if (indexb == arrayb.length - 1) {
											if (lmax < dosis.numero) {
												VacunaDosis.update({
													es_dosis: dosis.es_dosis,
													tiempo: dosis.tiempo,
													numero: dosis.numero,
													id_vacuna: dosis.id_vacuna,
													unico: dosis.unico,
													eliminado: true
												}, {
													where: { id: dosis.id, id_vacuna: dosis.id_vacuna }
												}).then(function (dosis_Creada) {
													if (index === array.length - 1) {
														res.json({ mensaje: memo })
													}
												})
											} else {
												memo += "\n La dosis N° " + dosis.numero + " No se puede eliminar."
												if (index === array.length - 1) {
													res.json({ mensaje: memo })
												}
											}
										}
									})
								});
							} else {
								VacunaDosis.update({
									es_dosis: dosis.es_dosis,
									tiempo: dosis.tiempo,
									numero: dosis.numero,
									id_vacuna: dosis.id_vacuna,
									unico: dosis.unico,
									eliminado: dosis.eliminado
								}, {
									where: { id: dosis.id, id_vacuna: dosis.id_vacuna }
								}).then(function (dosis_Creada) {
									if (index === array.length - 1) {
										res.json({ mensaje: memo })
									}
								})
							}
						});
					}
				}, this);
			}).then(function (vacunaActualizada) {
				// res.json({mensaje: 'vacuna Actializada'})
			})
		})

	router.route('/vacunas')
		
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoVacuna.findAll({
				// where: {eliminado: false},
				include: [{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }] //where:{eliminado: false}
			}).then(function (vacunas) {
				res.json(vacunas);
			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id != undefined) {
				MedicoVacuna.update({
					dias_activacion: req.body.dias_activacion
				}, {
					where: {
						id: req.body.id
					}
				}).then(function (alertaDiasActualizados) {
					res.json({ mensaje: 'Días de alerta de vacuna actualizada!' })
				})
			} else {
				if (req.body.setDiasTodos != undefined) {
					MedicoVacuna.findAll({
						where: {
							eliminado: false
						}
					}).then(function (vacunas) {
						vacunas.forEach(function (vac, index, array) {
							MedicoVacuna.update({
								dias_activacion: req.body.dias_activacion
							}, {
								where: {
									id: vac.id
								}
							}).then(function (alertaDiasActualizados) {
								if (index === array.length - 1) {
									res.json({ mensaje: 'Días de alerta de vacunas actualizados!' })
								}
							})
						});
					})
				}
			}
		})

	router.route('/paciente/vacuna/aplicacion')
		.put(ensureAuthorizedlogged, function (req, res) {
			const { id, fecha_aplicacion, comentario } = req.body
			if(id && fecha_aplicacion){
				MedicoPacienteVacuna.findOne({
					where:{ id:id},
					include: [
						{ model: MedicoVacuna, as: 'pacienteVacuna', 
							include: [
								{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }
							] 
						}, 
						{ model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', where:{ eliminado: false }, order: [['createdAt', 'desc']], required:false, 
							include:[{model: VacunaDosis, as: "dosis", required:false}]  
						},
						{ model: MedicoPaciente ,as:'paciente'}
					]
				})
				.then(aplicacion => {
					const { eliminado, pacienteVacuna: vacuna, pacienteVacunaDosis:pacienteDosis } = aplicacion
					if(!eliminado){
						if(vacuna.unico){
							if(pacienteDosis.length == 1){
								res.json({error:true, message:"<b>Vacuna de dosis única</b><br><p>La vacuna ya tiene una aplicación registrada.</p><br>", messageType:"error"})
							}else{
								let dosis = vacuna.vacunaDosis ? vacuna.vacunaDosis[0]  : null
								registrarVacuna(id, fecha_aplicacion, comentario, dosis, true, false, res);
							}
						}else{
							if(vacuna.vacunaDosis.length == pacienteDosis.length){
								res.json({error:true, message:"<b>No se guardaron cambios</b><br><p>El paciente ya recibió todas las dosis de la vacuna.</p><br>", messageType:"error"})
							}else if(pacienteDosis.length == 0){
								let dosis = vacuna.vacunaDosis ? vacuna.vacunaDosis[0]  : null
								let ultima = vacuna.vacunaDosis.length == 1 ? true : false;
								if(!ultima) dosis.siguiente =  vacuna.vacunaDosis[1].tiempo;
								registrarVacuna(id, fecha_aplicacion, comentario, dosis, false, ultima, res);
							}else{
								let dosis = vacuna.vacunaDosis ? vacuna.vacunaDosis[pacienteDosis.length]  : null
								let ultima = pacienteDosis.length +1 == vacuna.vacunaDosis.length ? true : false;
								if(!ultima) dosis.siguiente =  vacuna.vacunaDosis[pacienteDosis.length+1].tiempo;
								registrarVacuna(id, fecha_aplicacion, comentario, dosis, false, ultima, res);
							}
						}
					}else{
						res.json({error:true, message:"<b>Paciente inactivo</b><br><p>No se puede vacunar a personal inactivo.</p><br>", messageType:"error"})
					}
				})
				.catch(e=>res.json({error:true, message:"<b>Error al guardar datos de vacunación</b><br>"+e, messageType:"error"}))
			}else{
				res.json({error:false, message:"<b>Parámetros incorrectos</b><br>", messageType:"success"})
			}
		})
	
	function registrarVacuna(id, fecha_aplicacion, comentario, dosis, unica, ultima, res){
		if(dosis){
			MedicoPacienteVacunaDosis.create({
				id_paciente_vacuna: id,
				fecha_aplicacion: fecha_aplicacion,
				eliminado: 0,
				id_dosis: dosis.id ? dosis.id  : null,
				comentario: comentario ? comentario : null
			})
			.then(creado => {
				let qry = `UPDATE agil_medico_paciente_vacuna pv set pv.ultima_aplicacion = "${ fecha_aplicacion}", pv.siguiente_aplicacion = IF(${unica} OR ${ultima}, NULL, DATE_ADD("${ fecha_aplicacion}", INTERVAL ${dosis.siguiente ? dosis.siguiente : 0} ${dosis.es_dosis ? 'DAY' : 'MONTH'})) WHERE pv.id=${id}`
				sequelize.query(qry, {type: sequelize.QueryTypes.UPDATE})	
				.then(registrado => res.json({error:false, message:"<b>Aplicación registrada</b><br>", messageType:"success"}))
				.catch(e=>res.json({error:true, message:"<b>Error al actualizar registro de vacunas del paciente.</b><br>"+e, messageType:"error"}))
			})
			.catch(e=>res.json({error:true, message:"<b>Error al registrar la vacuna.</b><br>"+e, messageType:"error"}))
		}else{
			res.json({error:true, message:"<b>Ocurrió un error al registrar la vacuna.</b><br><p><small>Dosis no especificado.</small></p>", messageType:"error"})
		}
	}

	router.route('/paciente/vacuna')
		.post(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteVacuna.create({
				id_paciente: req.body.id_paciente,
				id_vacuna: req.body.id_vacuna,
				fecha_ultima_aplicacion: req.body.ultima_aplicacion,
				fecha_siguiente_aplicacion: req.body.siguiente_aplicacion,
				eliminado: false
			}).then(function (pacienteVacuna) {
				res.json(pacienteVacuna.id)
			})
		})

		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteVacuna.findAll({
				where: { id_paciente: req.query.id_paciente },
				include: [{ model: MedicoVacuna, as: 'pacienteVacuna', include: [{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }] }, { model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', order: [['createdAt', 'desc']] }]
			}).then(function (vacunasPaciente) {
				res.json(vacunasPaciente);
			});
		});

	router.route('/paciente/vacuna/:id_paciente')
		.get(ensureAuthorizedlogged, function (req, res) {
			const { id_paciente } = req.params;
			MedicoPaciente.findOne({
				where: { id:id_paciente },
				include: [ {model: Persona, as:'persona'}]
			})
			.then(paciente => {
				MedicoPacienteVacuna.findAll({
					where: { id_paciente },
					include: [
						{ model: MedicoVacuna, as: 'pacienteVacuna', 
							include: [
								{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }
							] }, 
							{ model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', order: [['createdAt', 'desc']] }]
				})
				.then(function (vacunas) {
					res.json({ error: false, paciente: paciente, vacunas: vacunas});
				})
				.catch(e => res.json({ error: true, message: "Error al obtener vacunas del paciente.", err: e }))
			})
			.catch(e => res.json({ error: true, message: "Error al obtener datos del paciente.", err: e }))
		});

	router.route('/paciente/vacuna/asignacion')
		.post(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteVacuna.create({
				id_paciente: req.body.id_paciente,
				id_vacuna: req.body.id_vacuna,
				fecha_ultima_aplicacion: req.body.fecha_ultima_aplicacion,
				fecha_siguiente_aplicacion: req.body.fecha_siguiente_aplicacion,
				eliminado: false
			}).then(function (vacunaAsignada) {
				res.json({ mensaje: 'Vacuna Asignada' })
			})
		})

	router.route('/paciente/vacuna/asignacion/:id_paciente/:id_vacuna')
		.put(ensureAuthorizedlogged, function (req, res) {
			const { id_paciente, id_vacuna } = req.params
			if(id_paciente && id_vacuna){
				MedicoPacienteVacuna.findOne({
					where: {
						id_paciente: id_paciente,
						id_vacuna:id_vacuna
					}
				})
				.then(pacienteVacuna => {
					if(pacienteVacuna && pacienteVacuna.id){
						MedicoPacienteVacuna.update({
							eliminado: !pacienteVacuna.eliminado
						},{
							where:{ id_paciente: id_paciente, id_vacuna: id_vacuna }
						})
						.then((result) => {
							res.json({error:false, message: pacienteVacuna.eliminado==1 ? "<b>Asignación realizada con éxito</b><br>" : "<b>Asignación eliminada con éxito</b><br>", messageType:"success"})
						}).catch((err) => {
							res.json({error:true, message:"<b>Error al crear asignación de vacuna</b><br>"+err, messageType:"error"})
						});
					}else{
						MedicoPacienteVacuna.create({
							id_paciente: id_paciente,
							id_vacuna: id_vacuna,
							ultima_aplicacion: null,
							siguiente_aplicacion: null,
							eliminado: 0
						})
						.then((result) => {
							res.json({error:false, message: "<b>Asignación realizada con éxito</b><br>", messageType:"success"})
						}).catch((err) => {
							res.json({error:true, message:"<b>Error al crear asignación de vacuna</b><br>"+err, messageType:"error"})
						});
					}
				})
				.catch(e => res.json({error:true, message:"<b>Error al verificar estado paciente-vacuna</b>", messageType:"error"}))
			}else{
				res.json({error:true, message:"<b>Los IDs son requeridos para generar los cambios</b><br>"+err, messageType:"error"})
			}
		});

	router.route('/prerequisito/:id_pre/historial/:id_pac/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionPreRequisito = { eliminado: false }
			var desde = false
			var hasta = false
			if (req.params.inicio != '0') {
				var inicio = req.params.inicio.split('/').reverse().join('-')+ " 00:00:00";
				desde = true
			}
			if (req.params.fin != '0') {
				var fin =req.params.fin.split('/').reverse().join('-')+ " 23:59:59";
				hasta = true
			}
			if (desde && hasta) {
				condicionPreRequisito = {
					id_prerequisito: req.params.id_pre,
					id_paciente: req.params.id_pac,
					eliminado: false,
					fecha_vencimiento: {
						$between: [inicio, fin]
					}
				}
			}
			if (desde && !hasta) {
				condicionPreRequisito = {
					id_prerequisito: req.params.id_pre,
					id_paciente: req.params.id_pac,
					eliminado: false,
					fecha_vencimiento: {
						$gte: [inicio]
					}
				}
			}
			if (!desde && hasta) {
				condicionPreRequisito = {
					id_prerequisito: req.params.id_pre,
					id_paciente: req.params.id_pac,
					eliminado: false,
					fecha_vencimiento: {
						$lte: [fin]
					}
				}
			}
			 if (!desde && !hasta) {
				condicionPreRequisito = {
					id_prerequisito: req.params.id_pre,
					id_paciente: req.params.id_pac,
					eliminado: false
				}
			}
			MedicoPacientePreRequisito.findAll({
				where: condicionPreRequisito,
				include: [{ model: MedicoPrerequisito, as: 'preRequisito' }]
			}).then(function (historial) {
				res.json({ error:false, historial: historial })
			})
			.catch(e=>res.json({ error: true, message:e }))
		})
	router.route('/prerequisitos/hablilitar/deshabilitar')
		.post(ensureAuthorizedlogged, function (req, res) {
			MedicoPrerequisito.update({
				habilitado: req.body.habilitado
			}, { where: { id: req.body.id } }).then(function (prerequisitoHabilitadoODeshabilitado) {
				res.json({ mensaje: "Pre-requisitos actualizado satisfactoriamente!" });
			})
		})
	router.route('/prerequisitos/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id != undefined) {
				MedicoPrerequisito.update({
					nombre: req.body.nombre,
					vencimiento_mes: req.body.vencimiento_mes,
					// fecha_inicio: req.body.fecha_inicio,
					dias_activacion: req.body.dias_activacion,
					observacion: req.body.observacion,
					puede_modificar_rrhh: req.body.puede_modificar_rrhh
				}, {
					where: {
						id: req.body.id
					}
				}).then(function (prerequisitoCreado) {
					RrhhEmpleadoPrerequisitoCargo.destroy({
						where: {
							id_prerequisito: req.body.id
						}
					}).then(function (cargosPrerequisitosVacios) {
						req.body.cargos.forEach(function (cargo, index, array) {
							RrhhEmpleadoPrerequisitoCargo.create({
								id_cargo: cargo.id,
								id_prerequisito: req.body.id
							}).then(function (creado) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: "Pre-requisitos actualizado satisfactoriamente!" });
								}
							})
						})
					})
				});

			} else {
				if (req.body.setDiasTodos != undefined) {
					MedicoPrerequisito.findAll({

					}).then(function (prere) {
						prere.forEach(function (element, index, array) {
							MedicoPrerequisito.update({
								dias_activacion: req.body.dias_activacion
							}, {
								where: {
									id: element.id
								}
							}).then(function (prerequisitoCreado) {
								if (index === array.length - 1) {
									res.json({ mensaje: "Pre-requisitos actualizado satisfactoriamente!" });
								}
							});
						});
					})
				} else {
					MedicoPrerequisito.create({
						// id_paciente: req.params.id_paciente,
						// id_prerequisito: req.body.prerequisito.id,
						nombre: req.body.nombre,
						vencimiento_mes: req.body.vencimiento_mes,
						// fecha_inicio: req.body.fecha_inicio,
						// fecha_vencimiento: req.body.fecha_vencimiento,
						observacion: req.body.observacion,
						puede_modificar_rrhh: req.body.puede_modificar_rrhh ? req.body.puede_modificar_rrhh : 0,
						id_empresa: req.params.id_empresa ? req.params.id_empresa : null
					}).then(function (prerequisitoCreado) {
						req.body.cargos.forEach(function (cargo, index, array) {
							RrhhEmpleadoPrerequisitoCargo.create({
								id_cargo: cargo.id,
								id_prerequisito: prerequisitoCreado.id
							}).then(function (creado) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: "Pre-requisitos creados satisfactoriamente!" });
								}
							})
						})
					});
				}
			}
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPrerequisito.update({
				nombre: req.body.nombre,
				vencimiento_mes: req.body.vencimiento_mes,
				// fecha_inicio: req.body.fecha_inicio,
				// fecha_vencimiento: req.body.fecha_vencimiento,
				observacion: req.body.observacion,
				puede_modificar_rrhh: req.body.puede_modificar_rrhh
			}, {
				where: {
					id: req.body.id
				}
			}).then(function (prerequisitoCreado) {
				res.json({ mensaje: "Pre-requisitos actualizado satisfactoriamente!" });
			});
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPrerequisito.findAll({
				include: [{
					model: RrhhEmpleadoPrerequisitoCargo, as: 'prerequisitoCargos',
					include: [{
						model: Clase, as: 'cargo',
						include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
					}]
				}]
			}).then(function (prerequisitos) {
				res.json({ prerequisitos: prerequisitos });
			}).catch((err) => {
				res.json({ prerequisitos: [], mensaje: err.stack });
			})
		});

	router.route('/generos')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { nombre_corto: Diccionario.GENERO }
				// include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: Diccionario.GENERO } }]
			}).then(function (tipo) {
				Clase.findAll({
					where: { id_tipo: tipo.id }
				}).then(function (generos) {
					res.json(generos);
				})

			});
		});
	router.route('/tipo-control/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { nombre_corto: Diccionario.TIPOCONTROL, empresa: req.params.id_empresa }
				// include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: Diccionario.GENERO } }]
			}).then(function (tipo) {
				Clase.findAll({
					where: { id_tipo: tipo.id }
				}).then(function (generos) {
					res.json(generos);
				})

			});
		})
	router.route('/prerequisitos/cargos/:id_cargos?')
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPrerequisito.findAll({
				where: { habilitado: true },
				include: [{
					model: RrhhEmpleadoPrerequisitoCargo, as: 'prerequisitoCargos', where: { id_cargo: { $in: req.params.id_cargos.split(",") } },
					include: [{
						model: Clase, as: 'cargo'/* ,
								include: [{ model: Clase, as: 'cargo' }] */
					}]
				}]
			}).then(function (prerequisitos) {
				res.json({ prerequisitos: prerequisitos });
			});
		});
	function guardarDocumentoPrerequisto(req, res, id) {
		fs.writeFileSync('./documentos/rrhh/empleados-prerequisitos/prerequisito-' + id + "-" + req.body.documento2.name, req.body.documento2.data, 'binary', function (err) {

			if (err)
				console.log(err);
			else
				console.log("The file was saved!");
		});
		var namedoc = './documentos/rrhh/empleados-prerequisitos/prerequisito-' + id + "-" + req.body.documento2.name;
		MedicoPacientePreRequisito.update({
			documento: namedoc
		}, {
			where: { id: id }
		})
		.then(function (affecteedRows) {
			res.json({ error: false, message: "Documento del paciente guardado!", messageType:"success" });
		})
		.catch(e=>res.json({error:true, message: "Error al guardar el documento", messageType:"error"}))

	}
	router.route('/prerequisito/paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			const { id, fecha_vencimiento, id_paciente, id_prerequisito, nueva_fecha_vencimiento, nueva_fecha_entrega, nueva_fecha_emision, nueva_observacion, documento2 } = req.body
			if(!fecha_vencimiento){
				MedicoPacientePreRequisito.update({
					fecha_inicio: nueva_fecha_emision ? nueva_fecha_emision : null,
					fecha_entrega: nueva_fecha_entrega,
					fecha_vencimiento: nueva_fecha_vencimiento,
					observacion: nueva_observacion
				},{
					where: { id:id }
				})
				.then(updated =>{
					if(documento2){
						guardarDocumentoPrerequisto(req, res, id)
					} else {
						res.json({ error: false, message: "Pre-requisito actualizado satisfactoriamente!", messageType:"success" });
					}
				})
				.catch(e=>res.json({error:true, message: "Error al actualizar prerequisito"+e, messageType:"error"}))
			}else{
				MedicoPacientePreRequisito.create({
					id_paciente: id_paciente,
					id_prerequisito: id_prerequisito,
					fecha_inicio: nueva_fecha_emision ? nueva_fecha_emision : null,
					fecha_entrega: nueva_fecha_entrega,
					fecha_vencimiento: nueva_fecha_vencimiento,
					observacion: nueva_observacion,
					eliminado: 0,
					reprogramado: 0,
					asignado: 1
				})
				.then(created =>{
					if(documento2){
						guardarDocumentoPrerequisto(req, res, created.id)
					} else {
						res.json({ error: false, message: "Pre-requisito actualizado satisfactoriamente!", messageType:"success" });
					}
				})
				.catch(e=>res.json({error:true, message: "Error al actualizar prerequisito"+e, messageType:"error"}))
			}
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPacientePreRequisito.findAll({
				where: {
					id: req.body.id_paciente,
					eliminado: false
				},
				include: [{ model: MedicoPrerequisito, as: 'preRequisito' }]
			}).then(function (requisitos) {
				res.json({ Requisitos: requisitos })
			})
		})

	router.route('/medico-paciente-pre-requisito-alertas/empresa/:id_empresa/:inicio/:fin/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:reporte')
		.get(ensureAuthorizedlogged, function (req, res) {
			const {id_empresa, inicio, fin, texto_busqueda, pagina, items_pagina, columna, direccion, reporte } = req.params;
			let offset = items_pagina * (pagina - 1);
			let qry = `SELECT t1.*,persona.nombre_completo,pre.puede_modificar_rrhh,pre.nombre FROM agil_medico_paciente_prerequisito t1 INNER JOIN (
				SELECT MAX(id) AS max FROM agil_medico_paciente_prerequisito pacpre GROUP BY paciente,prerequisito) AS t2 ON t1.id=t2.max AND t1.id=t2.max INNER JOIN agil_medico_prerequisito pre ON pre.id=t1.prerequisito INNER JOIN agil_medico_paciente paciente ON paciente.id=t1.paciente AND paciente.empresa=${id_empresa} AND paciente.eliminado=FALSE INNER JOIN gl_persona persona ON persona.id=paciente.persona WHERE t1.fecha_vencimiento IS NOT NULL AND t1.asignado=TRUE AND t1.eliminado=FALSE AND pre.habilitado=true`
			let count = `SELECT COUNT(t1.id) AS total FROM agil_medico_paciente_prerequisito t1 INNER JOIN ( SELECT MAX( id ) max FROM agil_medico_paciente_prerequisito pacpre GROUP BY paciente, prerequisito ) t2 ON t1.id = t2.max AND t1.id = t2.max INNER JOIN agil_medico_prerequisito pre ON pre.id = t1.prerequisito INNER JOIN agil_medico_paciente paciente ON paciente.id=t1.paciente AND paciente.empresa=${id_empresa} AND paciente.eliminado=FALSE INNER JOIN gl_persona persona ON persona.id=paciente.persona WHERE  t1.fecha_vencimiento IS NOT NULL AND t1.asignado = TRUE AND t1.eliminado=FALSE AND pre.habilitado=true`
			if(inicio != "0" && fin != "0"){
				let f_inicio = inicio.split('/').reverse().join('-')
				let f_fin = fin.split('/').reverse().join('-')
				qry += " AND t1.fecha_vencimiento BETWEEN '"+ f_inicio + " 00:00:00' AND '"+ f_fin +" 23:59:59' ";
				count += " AND t1.fecha_vencimiento BETWEEN '"+ f_inicio + " 00:00:00' AND '"+ f_fin +" 23:59:59' ";
			}else{
				qry += " AND DATE_SUB(t1.fecha_vencimiento, INTERVAL (SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa="+id_empresa+" AND cfg.tipo='PREREQUISITOS') DAY)<=CURRENT_DATE";
				count += " AND DATE_SUB(t1.fecha_vencimiento, INTERVAL (SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa="+id_empresa+" AND cfg.tipo='PREREQUISITOS') DAY)<=CURRENT_DATE";
			}
			if(texto_busqueda != "0") {
				qry += " AND (persona.nombre_completo LIKE '%"+texto_busqueda+"%' OR pre.nombre LIKE '%"+texto_busqueda+"%')";

				count += " AND (persona.nombre_completo LIKE '%"+texto_busqueda+"%' OR pre.nombre LIKE '%"+texto_busqueda+"%')";
			}
			qry += " ORDER BY t1." + columna+ " " + direccion;
			if(items_pagina != "0" && reporte != "1") qry += " LIMIT " + offset + ", "+ items_pagina;
			sequelize.query(count, {type: sequelize.QueryTypes.SELECT})
			.then(total => {
				sequelize.query(qry, {type: sequelize.QueryTypes.SELECT
				})
				.then(data => res.json({ error: false, empleados: data, paginas: Math.ceil(total[0].total/ items_pagina)}))
				.catch(e => res.json({ error: true, message: e}))
			})
			.catch(e => res.json({ error: true, message: e}))

		})
	router.route('/medico-paciente-pre-requisito/paciente/:id_paciente/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var requisitosPac = []
			MedicoPrerequisito.findAll({
			}).then(function (lstRequisitos) {
				if (lstRequisitos.length > 0) {
					lstRequisitos.forEach(function (requi, index, array) {
						var condicionPreRequisito = { id_paciente: req.params.id_paciente }
						var desde = false
						var hasta = false
						if (req.params.inicio != 0) {
							var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
							desde = true
						}
						if (req.params.fin != 0) {
							var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
							hasta = true
						}
						if (desde && hasta) {
							condicionPreRequisito = {
								id_paciente: req.params.id_paciente,

								id_prerequisito: requi.id,
								fecha_vencimiento: {
									$between: [inicio, fin]
								}
							}
						} else if (desde && !hasta) {
							condicionPreRequisito = {
								id_paciente: req.params.id_paciente,

								id_prerequisito: requi.id,
								fecha_vencimiento: {
									$gte: [inicio]
								}
							}
						} else if (!desde && hasta) {
							condicionPreRequisito = {
								id_paciente: req.params.id_paciente,

								id_prerequisito: requi.id,
								fecha_vencimiento: {
									$lte: [fin]
								}
							}
						} else if (!desde && !hasta) {
							var hoy = new Date()
							// hoy.setHours(0,0,0,0)
							condicionPreRequisito = {
								id_paciente: req.params.id_paciente,
								id_prerequisito: requi.id,

								// fecha_vencimiento: {
								// 	$gte: hoy
								// }
							}
						}
						MedicoPacientePreRequisito.findAll({
							limit: 1,
							where: condicionPreRequisito,
							include: [{ model: MedicoPrerequisito, as: 'preRequisito' }, { model: MedicoPaciente, as: 'pacientePrerequisito' }
							],
							order: [['id', 'DESC']]
						}).then(function (prerequisitos) {
							if (prerequisitos[0] != undefined) {
								requisitosPac.push(prerequisitos[0])
							}

							// res.json({ Prerequisitos: prerequisitos });
							if (index == array.length - 1) {
								res.json({ Prerequisitos: requisitosPac });
							}
						});
					});
				} else {
					res.json({ Prerequisitos: [] });
				}
			})

		})
	router.route('/medico-paciente-consulta')
		.post(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteFicha.findAll({
				where: { id_paciente: req.body.id_paciente },
				order: [['createdAt', 'DESC']],
				limit: 1
			}).then(function (fichaEncontrada) {
				if (fichaEncontrada.length > 0) {
					MedicoPacienteConsulta.create({
						id_paciente: req.body.id_paciente,
						id_ficha_medica: fichaEncontrada[0].id,
						fecha: req.body.fecha,
						presion: req.body.presion,
						pulso: req.body.pulso,
						talla: req.body.talla,
						peso: req.body.peso,
						temperatura: req.body.temperatura,
						frecuencia_respiratoria: req.body.frecuencia_respiratoria,
						frecuencia_cardiaca: req.body.frecuencia_cardiaca,
						indice_masa_corporal: req.body.indice_masa,
						subjetivo: req.body.subjetivo,
						objetivo: req.body.objetivo,
						analitico: req.body.diagnosticos,
						plan: req.body.planes,
						evolucion: req.body.evolucion,
						nervioso_central: req.body.nervioso_central,
						sentidos: req.body.ojos_oido_nariz_garganta,
						cardiovascular: req.body.cardio_vascular,
						respiratorio: req.body.respiratorio,
						gastrointestinal: req.body.gastro_instestinal,
						genitourinario: req.body.genitourinario,
						locomotor: req.body.locomotor,
						piel: req.body.piel_faneras,
					}).then(function (medicoPacienteConsultaCreado) {
						res.json({ message: "Consulta creada satisfactoriamente!" })
					})
				} else {
					res.json({ message: "No tiene una ficha medica guardada" })
				}

			}).catch((err) => {
				res.json({ message: "No se guardó!" })
			})
		})
	router.route('/medico-paciente-consulta/paciente/:id_paciente/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var desde = false
			var hasta = false
			var condicionPaciente = { id_ficha_medica: req.params.id_paciente }
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				desde = true
			}
			if (req.params.fin != 0) {
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				hasta = true
			}
			if (desde && hasta) {
				condicionPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$between: [inicio, fin]
					}
				}
			} else if (desde && !hasta) {
				condicionPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$gte: [inicio]
					}
				}
			} else if (!desde && hasta) {
				condicionPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$lte: [fin]
					}
				}
			} else if (!desde && !hasta) {
				var hoy = new Date()
				condicionPaciente = {
					id_paciente: req.params.id_paciente
				}
			}
			// if (req.params.inicio != 0) {
			// 	var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			// 	var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);

			// 	var condicionPaciente = {
			// 		id_paciente: req.params.id_paciente,
			// 		$or: [
			// 			{
			// 				fecha: {
			// 					$between: [inicio, fin]
			// 				}
			// 			}
			// 		]
			// 	};
			// } else {
			// 	var condicionPaciente = {
			// 		id_paciente: req.params.id_paciente,
			// 	}
			// }
			MedicoPacienteConsulta.findAll({
				where: condicionPaciente,
				order: [['createdAt', 'ASC']]
			}).then(function (MedicoPacienteConsultaEncontrado) {
				res.json({ consultas: MedicoPacienteConsultaEncontrado })
			})
		})
	router.route('/medico-paciente-consulta/paciente/:id_ficha_medica')
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteConsulta.findAll({
				limit: 1,
				where: {
					id_ficha_medica: req.params.id_ficha_medica
				},
				order: [['id', 'DESC']]
			}).then(function (MedicoPacienteConsultaEncontrado) {
				var consulta = MedicoPacienteConsultaEncontrado[0]
        		if (consulta) {
					res.json({ consulta: consulta })
				}else{
					res.json({ message: "no se encontro consulta!"})
				}
				
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteConsulta.update({
				fecha: req.body.fecha,
				presion: req.body.presion,
				pulso: req.body.pulso,
				talla: req.body.talla,
				peso: req.body.peso,
				temperatura: req.body.temperatura,
				frecuencia_respiratoria: req.body.frecuencia_respiratoria,
				frecuencia_cardiaca: req.body.frecuencia_cardiaca,
				indice_masa_corporal: req.body.indice_masa,
				subjetivo: req.body.subjetivo,
				objetivo: req.body.objetivo,
				analitico: req.body.diagnosticos,
				plan: req.body.planes,
				evolucion: req.body.evolucion,
				nervioso_central: req.body.nervioso_central,
				sentidos: req.body.ojos_oido_nariz_garganta,
				cardiovascular: req.body.cardio_vascular,
				respiratorio: req.body.respiratorio,
				gastrointestinal: req.body.gastro_instestinal,
				genitourinario: req.body.genitourinario,
				locomotor: req.body.locomotor,
				piel: req.body.piel_faneras,
			}, {
				where: {
					id: req.body.id
				}
			}).then(function (medicoPacientefichaCreado) {
				res.json({ message: "Consulta actualizada satisfactoriamente!" })
			})
		})
	router.route('/medico-paciente-patologia/paciente/:id_paciente')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteFicha.update({
				/* 	id_paciente: req.body.paciente.id,
					fecha: req.body.fecha_elaboracion,
					estilo_vida: req.body.estilo_vida,
					actividad_laboral: req.body.actividad_laboral,
					area_operacion: req.body.area_operacion,
					riesgo: req.body.riesgo,
					id_persona_referencia: personaReferenciaCreada.id,
					id_tipo_control: req.body.tipoControl.id,
					alergia_humo_cigarrillo: req.body.alergia_humo_cigarrillo,
					alergia_polvo: req.body.alergia_polvo,
					alergia_picadura: req.body.alergia_picadura,
					alergia_quimico: req.body.alergia_quimico,
					alergia_algun_material: req.body.alergia_algun_material,
					alergia_medicamento: req.body.alergia_medicamento,
					alergia_plantas: req.body.alergia_plantas,
					alergia_alimentos: req.body.alergia_alimentos,
					alergia_conservas: req.body.alergia_conservas,
					alergia_otros: req.body.alergia_otros,
					alergia_otros_comentario: req.body.alergia_otros_comentario,
					es_donante: req.body.es_donante, */
				enfermedad_hipertension: req.body.enfermedad_hipertension,
				enfermedad_cardilogia: req.body.enfermedad_cardilogia,
				enfermedad_lumbalgia: req.body.enfermedad_lumbalgia,
				enfermedad_diabetes: req.body.enfermedad_diabetes,
				enfermedad_digestiva: req.body.enfermedad_digestiva,
				enfermedad_epilepsia: req.body.enfermedad_epilepsia,
				enfermedad_chagas: req.body.enfermedad_chagas,
				enfermedad_asma: req.body.enfermedad_asma,
				enfermedad_hepatitis: req.body.enfermedad_hepatitis,
				enfermedad_otros: req.body.enfermedad_otros,
				enfermedad_comentario: req.body.enfermedad_comentario,
				quirurgico_operado: req.body.quirurgico_operado,
				quirurgico_comentario: req.body.quirurgico_comentario,
				descripcion_indicadores: req.body.descripcion_indicadores,
				descripcion_antecedentes: req.body.descripcion_antecedentes,
				quirurgico_descripcion: req.body.quirurgico_descripcion,
				tratamiento: req.body.tratamiento
			}, {
				where: {
					id: req.body.id
				}
			}).then(function (medicoPacientefichaCreado) {
				res.json({ message: "Patologías paciente actualizadas satisfactoriamente!" })
			})
		})
	router.route('/medico-paciente-pre-requisito/empresa/:id_empresa/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				var condicionPreRequisito = {

					$or: [
						{
							fecha_vencimiento: {
								$between: [inicio, fin]
							}
						}
					]
				};
			} else {
				var condicionPaciente = {}
			}

			MedicoPacientePreRequisito.findAll({
				where: condicionPreRequisito,
				include: [{ model: MedicoPrerequisito, as: 'preRequisito' }, { model: MedicoPaciente, as: 'pacientePrerequisito', include: [{ model: Persona, as: 'persona' }] }
				]
			}).then(function (prerequisitos) {
				res.json({ Prerequisitos: prerequisitos });
			});
		})
	router.route('/medico-paciente-vacunas-alertas/empresa/:id_empresa/:inicio/:fin/:vacuna/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:reporte')
		.get(ensureAuthorizedlogged, function (req, res) {
			let { id_empresa, inicio, fin, vacuna, texto_busqueda, pagina, items_pagina, columna, direccion, reporte } = req.params;
			let offset = items_pagina * (pagina - 1);
			let qry = "SELECT DISTINCT(pacvac.id),pac.id AS id_paciente,vac.id AS id_vacuna,persona.nombre_completo,vac.nombre,pacvac.ultima_aplicacion,pacvac.siguiente_aplicacion FROM agil_medico_paciente_vacuna pacvac INNER JOIN agil_medico_paciente pac ON pac.id=pacvac.id_paciente INNER JOIN gl_persona persona ON persona.id=pac.persona INNER JOIN agil_medico_vacuna vac ON vac.id=pacvac.id_vacuna WHERE pac.empresa=" + id_empresa +" AND vac.unico=FALSE AND pac.eliminado=FALSE AND pacvac.siguiente_aplicacion IS NOT NULL"
			let count = "SELECT COUNT(DISTINCT ( pacvac.id )) AS total FROM agil_medico_paciente_vacuna pacvac INNER JOIN agil_medico_paciente pac ON pac.id=pacvac.id_paciente INNER JOIN gl_persona persona ON persona.id=pac.persona INNER JOIN agil_medico_vacuna vac ON vac.id=pacvac.id_vacuna WHERE pac.empresa=" + id_empresa +" AND vac.unico=FALSE AND pac.eliminado=FALSE AND pacvac.siguiente_aplicacion IS NOT NULL "
			if(inicio != "0" && fin != "0"){
				let f_inicio = inicio.split('/').reverse().join('-')
				let f_fin = fin.split('/').reverse().join('-')
				qry += " AND pacvac.siguiente_aplicacion BETWEEN '"+ f_inicio + " 00:00:00' AND '"+ f_fin +" 23:59:59' ";
				count += " AND pacvac.siguiente_aplicacion BETWEEN '"+ f_inicio + " 00:00:00' AND '"+ f_fin +" 23:59:59' ";
			}else{
				qry += " AND DATE_SUB(pacvac.siguiente_aplicacion, INTERVAL (SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa="+id_empresa+" AND cfg.tipo='VACUNAS') DAY)<=CURRENT_DATE";
				count += " AND DATE_SUB(pacvac.siguiente_aplicacion, INTERVAL (SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa="+id_empresa+" AND cfg.tipo='VACUNAS') DAY)<=CURRENT_DATE";
			}
			if(vacuna != "0") {
				qry += " AND pacvac.id_vacuna="+vacuna
				count += " AND pacvac.id_vacuna="+vacuna
			}
			
			if(texto_busqueda != "0") {
				qry += " AND ( persona.nombre_completo LIKE '%"+texto_busqueda+"%' OR vac.nombre LIKE '%"+ texto_busqueda +"%')";
				count += " AND ( persona.nombre_completo LIKE '%"+texto_busqueda+"%' OR vac.nombre LIKE '%"+ texto_busqueda +"%')";
			}
			qry += " ORDER BY pacvac." + columna+ " " + direccion;
			if(reporte != "1" && items_pagina != "0") qry += " LIMIT " + offset + ", "+ items_pagina;
			sequelize.query(count, {type: sequelize.QueryTypes.SELECT})
			.then(result => {
				sequelize.query(qry, {type: sequelize.QueryTypes.SELECT })
				.then(data => res.json({ error: false, empleados: data, paginas: Math.ceil(result[0].total / items_pagina)}))
				.catch(e => res.json({ error: true, message: e}))
			})
			.catch(e => res.json({ error: true, message: e}))
			
		})
	router.route('/medico-paciente-vacunas/empresa/:id_empresa/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				var condicionPaciente = {
					eliminado: false,
					$or: [
						{
							ultima_Aplicacion: {
								$between: [inicio, fin]
							}
						}
					]
				};
			} else {
				var condicionPaciente = { eliminado: false, }
			}

			MedicoPacienteVacuna.findAll({
				where: condicionPaciente,
				include: [{ model: MedicoPaciente, as: 'paciente', include: [{ model: Persona, as: 'persona' }] }, { model: MedicoVacuna, as: 'pacienteVacuna' }]
			}).then(function (vacunas) {
				res.json({ Vacunas: vacunas });
			});
		})

	router.route('/historial-ficha-medico-paciente/paciente/:id_paciente/inicio/:inicio/fin/:fin/tipo-control/:tipo_control')
		.get(ensureAuthorizedlogged, function (req, res) {
			// var condicionFichaPaciente = { id_paciente: req.params.id_paciente }
			var condicionTipoControl = {}
			var desde = false
			var hasta = false
			var condicionFichaPaciente = { id_paciente: req.params.id_paciente }
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				desde = true
			}
			if (req.params.fin != 0) {
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				hasta = true
			}
			if (desde && hasta) {
				condicionFichaPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$between: [inicio, fin]
					}
				}
			} else if (desde && !hasta) {
				condicionFichaPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$gte: [inicio]
					}
				}
			} else if (!desde && hasta) {
				condicionFichaPaciente = {
					id_paciente: req.params.id_paciente,
					fecha: {
						$lte: [fin]
					}
				}
			} else if (!desde && !hasta) {
				var hoy = new Date()
				condicionFichaPaciente = {
					id_paciente: req.params.id_paciente
				}
			}
			// if (req.params.inicio != 0) {
			// 	var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			// 	var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			// 	condicionFichaPaciente = {
			// 		id_paciente: req.params.id_paciente,
			// 		$and: [
			// 			{
			// 				fecha: {
			// 					$between: [inicio, fin]
			// 				}
			// 			}
			// 		]
			// 	};
			// }
			if (req.params.tipo_control != 0) {
				condicionTipoControl = { id: req.params.tipo_control }
				// }else{
				// 	MedicoPacienteFicha.findAll({
				// 		where: condicionFichaPaciente,
				// 		include: [{ model: Clase, as: 'tipoControl'}, {
				// 			model: MedicoPaciente, as: 'paciente', include: [{ model: Empresa, as: 'empresa' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }]
				// 		}, { model: Persona, as: 'personaReferencia' }],
				// 		order: [['createdAt', 'DESC']]
				// 	}).then(function (fichaEncontrada) {
				// 		res.json(fichaEncontrada)
				// 	})
			}
			MedicoPacienteFicha.findAll({
				where: condicionFichaPaciente,
				include: [{ model: Clase, as: 'tipoControl', where: condicionTipoControl },
				{ model: MedicoPacienteConsulta, as: 'consultas', order: [['id', 'desc']], limit: 1 },
				{ model: ConfiguracionIso, as: 'configuracionesIso', required:false},
				{
					model: MedicoPaciente, as: 'paciente',
					include: [
						{ model: Empresa, as: 'empresa' },
						{ model: Clase, as: 'extension' },
						// { model: Clase, as: 'grupo_sanguineo' },
						{ model: Clase, as: 'campo' },
						{
							model: Persona, as: 'persona',
							include: [
								{ model: Clase, as: 'genero' }
							]
						}]
				}, { model: Persona, as: 'personaReferencia', required: false }],
				order: [['createdAt', 'DESC']]
			}).then(function (fichaEncontrada) {
				res.json(fichaEncontrada)
			}).catch((err) => {
				MedicoPacienteFicha.findAll({
					where: condicionFichaPaciente,
					include: [{ model: Clase, as: 'tipoControl', where: condicionTipoControl },
					{ model: MedicoPacienteConsulta, as: 'consultas', required: false },
					{ model: ConfiguracionIso, as: 'configuracionesIso', required:false},
					{
						model: MedicoPaciente, as: 'paciente',
						include: [
							{ model: Empresa, as: 'empresa' },
							// { model: MedicoPacienteConsulta, as: 'consultas', required:false},
							{ model: Clase, as: 'extension' },
							{ model: Clase, as: 'campo' },
							{
								model: Persona, as: 'persona',
								include: [
									{ model: Clase, as: 'genero' }
								]
							}]
					}, { model: Persona, as: 'personaReferencia', required: false }],
					order: [['createdAt', 'DESC']]
				}).then(function (fichaEncontrada) {
					res.json(fichaEncontrada)
				}).catch((err) => {
					res.json([])
				})
			})
		})
	router.route('/medico-paciente-ficha/paciente/:id_paciente')
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteFicha.findAll({
				limit: 1,
				where: {
					id_paciente: req.params.id_paciente
				},
				include: [
				{ model: Clase, as: 'tipoControl' },
				{model: ConfiguracionIso, as: 'configuracionesIso', required: false},
				{
					model: MedicoPaciente, as: 'paciente', include: [
						{
							required: true, model: RrhhEmpleadoFicha, as: 'empleadosFichas',
							where: { activo: true },
							// attributes: ['id', 'id_area', 'id_empleado', 'tipo_personal'],
							include: [
								{
									model: Clase, as: 'tipoPersonal',
									attributes: ['nombre']
								},
								{
									model: Clase, as: "area",
									attributes: ['id', 'nombre']
								},
								{
									model: RrhhEmpleadoCargo, as: 'cargos',
									// attributes: ['id'],
									include: [
										{
											model: Clase, as: "cargo",
											attributes: ['id', 'nombre'],
											include: [
												{
													model: RiesgoCargo, as: 'riesgos',
													attributes: ['id', 'nombre_riesgo', 'eliminado']
												}
											]
										}
									]
								},
								{
									model: Persona, as: 'personaReferencia', required: false,
									attributes: ['id', 'nombre_completo', 'telefono', 'telefono_movil', 'direccion_ciudad', 'direccion_zona', 'direccion_numero']
								}
							]
						},
						{ model: Clase, as: 'extension' },
						{ model: Empresa, as: 'empresa', attributes: ['razon_social', 'telefono1'] },
						{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }
					]
				}, { model: Persona, as: 'personaReferencia' }],
				order: [['id', 'DESC']]
			}).then(function (fichaEncontrada) {
				var ficha = fichaEncontrada[0]
				if (ficha) {
					res.json({ ficha: ficha })
				} else {
					MedicoPaciente.find({
						where: { id: req.params.id_paciente },
						include: [
							{
								required: false, model: RrhhEmpleadoFicha, as: 'empleadosFichas',
								where: { activo: true },
								include: [
									{
										model: Clase, as: 'tipoPersonal',
										attributes: ['nombre']
									},
									{
										model: Clase, as: "area",
										attributes: ['id', 'nombre']
									},
									{
										model: RrhhEmpleadoCargo, as: 'cargos',
										include: [
											{
												model: Clase, as: "cargo",
												attributes: ['id', 'nombre'],
												include: [
													{
														model: RiesgoCargo, as: 'riesgos',
														attributes: ['id', 'nombre_riesgo', 'eliminado']
													}
												]
											}
										]
									},
									{
										model: Persona, as: 'personaReferencia', required: false,
										attributes: ['id', 'nombre_completo', 'telefono', 'telefono_movil', 'direccion_ciudad', 'direccion_zona', 'direccion_numero']
									}
								]
							},
							{ model: Clase, as: 'extension' },
							{ model: Clase, as: 'campo' },
							{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] },
							{ model: Empresa, as: 'empresa' }]
					}).then(function (pacienteEncontrado) {
						res.json({ paciente: pacienteEncontrado })
					});
				}
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})
		.post(ensureAuthorizedlogged, async function (req, res) {
			var validarPersonaReferencia = req.body.personaReferencia ? req.body.personaReferencia.id : null;
			let campo = await Clase.findOne({ where: { id: req.body.paciente.id_campo }, raw:true})
			if (!validarPersonaReferencia) {
				Persona.create({
					nombres: req.body.personaReferencia.nombres,
					telefono: req.body.personaReferencia.telefono,
					direccion: req.body.personaReferencia.direecion,
					telefono_movil: req.body.personaReferencia.telefono_movil,
					direccion_ciudad: req.body.personaReferencia.direccion_ciudad,
					direccion_zona: req.body.personaReferencia.direccion_zona,
					direccion_localidad: req.body.personaReferencia.direccion_localidad,
					direccion_numero: req.body.personaReferencia.direccion_numero
				}).then(function (personaReferenciaCreada) {
					Empresa.update({
						razon_social: req.body.paciente.empresa.razon_social,
						telefono: req.body.paciente.empresa.telefono
					}, {
						where: {
							id: req.body.paciente.empresa.id
						}
					}).then(function (EmpresaActualizada) {
						MedicoPaciente.update({
							grupo_sanguineo: req.body.paciente.grupo_sanguineo.nombre,
							id_extension: req.body.paciente.extension.id,
							activo: req.body.paciente.activo,
							id_grupo_sanguineo: req.body.paciente.grupo_sanguineo.id
						}, {
							where: {
								id: req.body.paciente.id
							}
						}).then(function (medicoPacienteActualizado) {
							var nombre = (req.body.paciente.persona.apellido_paterno != undefined || req.body.paciente.persona.apellido_paterno != null ? req.body.paciente.persona.apellido_paterno : '')
								+ ' ' + (req.body.paciente.persona.apellido_materno != undefined || req.body.paciente.persona.apellido_materno != null ? req.body.paciente.persona.apellido_materno : '')
								+ ' ' + (req.body.paciente.persona.nombres != undefined || req.body.paciente.persona.nombres != null ? req.body.paciente.persona.nombres : '')
								+ ' ' + (req.body.paciente.persona.segundo_nombre != undefined || req.body.paciente.persona.segundo_nombre != null ? req.body.paciente.persona.segundo_nombre : '')
							Persona.update({
								nombres: req.body.paciente.persona.nombres,
								apellido_paterno: req.body.paciente.persona.apellido_paterno,
								apellido_materno: req.body.paciente.persona.apellido_materno,
								ci: req.body.paciente.persona.ci,
								id_genero: req.body.paciente.persona.id_genero,
								nombre_completo: nombre,
								telefono: req.body.paciente.persona.telefono,
								telefono_movil: req.body.paciente.persona.telefono_movil,
								correo_electronico: req.body.paciente.persona.correo_electronico
							}, {
								where: {
									id: req.body.paciente.persona.id
								}
							}).then(function (MedicoPasientePersonaActualizado) {
								MedicoPacienteFicha.create({
									id_paciente: req.body.paciente.id,
									fecha: req.body.fecha_elaboracion,
									estilo_vida: req.body.estilo_vida,
									actividad_laboral: req.body.actividad_laboral,
									area_operacion: campo ? campo.nombre : null,
									riesgo: req.body.riesgo,
									id_persona_referencia: personaReferenciaCreada.id,
									id_tipo_control: req.body.tipoControl.id,
									alergia_humo_cigarrillo: req.body.alergia_humo_cigarrillo,
									alergia_polvo: req.body.alergia_polvo,
									alergia_picadura: req.body.alergia_picadura,
									alergia_quimico: req.body.alergia_quimico,
									alergia_algun_material: req.body.alergia_algun_material,
									alergia_medicamento: req.body.alergia_medicamento,
									alergia_plantas: req.body.alergia_plantas,
									alergia_alimentos: req.body.alergia_alimentos,
									alergia_conservas: req.body.alergia_conservas,
									alergia_otros: req.body.alergia_otros,
									alergia_otros_comentario: req.body.alergia_otros_comentario,
									es_donante: req.body.es_donante,
									enfermedad_hipertension: req.body.enfermedad_hipertension,
									enfermedad_cardilogia: req.body.enfermedad_cardilogia,
									enfermedad_lumbalgia: req.body.enfermedad_lumbalgia,
									enfermedad_diabetes: req.body.enfermedad_diabetes,
									enfermedad_digestiva: req.body.enfermedad_digestiva,
									enfermedad_epilepsia: req.body.enfermedad_epilepsia,
									enfermedad_chagas: req.body.enfermedad_chagas,
									enfermedad_asma: req.body.enfermedad_asma,
									enfermedad_hepatitis: req.body.enfermedad_hepatitis,
									enfermedad_otros: req.body.enfermedad_otros,
									enfermedad_comentario: req.body.enfermedad_comentario,
									quirurgico_operado: req.body.quirurgico_operado,
									quirurgico_comentario: req.body.quirurgico_comentario,
									descripcion_indicadores: req.body.descripcion_indicadores,
									descripcion_antecedentes: req.body.descripcion_antecedentes,
									quirurgico_descripcion: req.body.quirurgico_descripcion,
									tratamiento: req.body.tratamiento,
									config_doc_iso: req.body.config_doc_iso ? req.body.config_doc_iso : 0,
									cargos: req.body.cargos ? req.body.cargos: null
								}).then(function (medicoPacientefichaCreado) {
									if(medicoPacientefichaCreado.config_doc_iso){
										ConfiguracionIso.find({
											where:{ id: req.body.config_doc_iso}
										}).then(config_iso=>{
										res.json({ message: "Ficha paciente actualizada satisfactoriamente!", ficha_medica: medicoPacientefichaCreado, config_iso: config_iso})

										})
									}else{
										res.json({ message: "Ficha paciente actualizada satisfactoriamente!", ficha_medica: medicoPacientefichaCreado })
									}
								})
							})
						})
					})
				})
			} else {
				Persona.update({
					nombres: req.body.personaReferencia.nombres,
					telefono: req.body.personaReferencia.telefono,
					direccion: req.body.personaReferencia.direecion,
					telefono_movil: req.body.personaReferencia.telefono_movil,
					direccion_ciudad: req.body.personaReferencia.direccion_ciudad,
					direccion_zona: req.body.personaReferencia.direccion_zona,
					direccion_localidad: req.body.personaReferencia.direccion_localidad,
					direccion_numero: req.body.personaReferencia.direccion_numero
				}, {
					where: {
						id: req.body.personaReferencia.id
					}
				}).then(function (personaReferenciaCreada) {
					Empresa.update({
						razon_social: req.body.paciente.empresa.razon_social,
						telefono: req.body.paciente.empresa.telefono
					}, {
						where: {
							id: req.body.paciente.empresa.id
						}
					}).then(function (EmpresaActualizada) {
						MedicoPaciente.update({
							id_grupo_sanguineo: req.body.paciente.grupo_sanguineo.id,
							id_extension: req.body.paciente.extension.id,
							activo: req.body.paciente.activo
						}, {
							where: {
								id: req.body.paciente.id
							}
						}).then(function (medicoPacienteActualizado) {
							var nombre = (req.body.paciente.persona.apellido_paterno != undefined || req.body.paciente.persona.apellido_paterno != null ? req.body.paciente.persona.apellido_paterno : '')
								+ ' ' + (req.body.paciente.persona.apellido_materno != undefined || req.body.paciente.persona.apellido_materno != null ? req.body.paciente.persona.apellido_materno : '')
								+ ' ' + (req.body.paciente.persona.nombres != undefined || req.body.paciente.persona.nombres != null ? req.body.paciente.persona.nombres : '')
								+ ' ' + (req.body.paciente.persona.segundo_nombre != undefined || req.body.paciente.persona.segundo_nombre != null ? req.body.paciente.persona.segundo_nombre : '')
							Persona.update({
								nombres: req.body.paciente.persona.nombres,
								apellido_paterno: req.body.paciente.persona.apellido_paterno,
								apellido_materno: req.body.paciente.persona.apellido_materno,
								ci: req.body.paciente.persona.ci,
								id_genero: req.body.paciente.persona.genero.id,
								nombre_completo: nombre,
								telefono: req.body.paciente.persona.telefono,
								telefono_movil: req.body.paciente.persona.telefono_movil,
								correo_electronico: req.body.paciente.persona.correo_electronico
							}, {
								where: {
									id: req.body.paciente.persona.id
								}
							}).then(function (MedicoPasientePersonaActualizado) {
								MedicoPacienteFicha.create({
									id_paciente: req.body.paciente.id,
									fecha: req.body.fecha_elaboracion,
									estilo_vida: req.body.estilo_vida,
									actividad_laboral: req.body.actividad_laboral,
									area_operacion: campo ? campo.nombre : null,
									riesgo: req.body.riesgo,
									id_persona_referencia: req.body.personaReferencia.id,
									id_tipo_control: req.body.tipoControl.id,
									alergia_humo_cigarrillo: req.body.alergia_humo_cigarrillo,
									alergia_polvo: req.body.alergia_polvo,
									alergia_picadura: req.body.alergia_picadura,
									alergia_quimico: req.body.alergia_quimico,
									alergia_algun_material: req.body.alergia_algun_material,
									alergia_medicamento: req.body.alergia_medicamento,
									alergia_plantas: req.body.alergia_plantas,
									alergia_alimentos: req.body.alergia_alimentos,
									alergia_conservas: req.body.alergia_conservas,
									alergia_otros: req.body.alergia_otros,
									alergia_otros_comentario: req.body.alergia_otros_comentario,
									es_donante: req.body.es_donante,
									enfermedad_hipertension: req.body.enfermedad_hipertension,
									enfermedad_cardilogia: req.body.enfermedad_cardilogia,
									enfermedad_lumbalgia: req.body.enfermedad_lumbalgia,
									enfermedad_diabetes: req.body.enfermedad_diabetes,
									enfermedad_digestiva: req.body.enfermedad_digestiva,
									enfermedad_epilepsia: req.body.enfermedad_epilepsia,
									enfermedad_chagas: req.body.enfermedad_chagas,
									enfermedad_asma: req.body.enfermedad_asma,
									enfermedad_hepatitis: req.body.enfermedad_hepatitis,
									enfermedad_otros: req.body.enfermedad_otros,
									enfermedad_comentario: req.body.enfermedad_comentario,
									quirurgico_operado: req.body.quirurgico_operado,
									quirurgico_comentario: req.body.quirurgico_comentario,
									descripcion_indicadores: req.body.descripcion_indicadores,
									descripcion_antecedentes: req.body.descripcion_antecedentes,
									quirurgico_descripcion: req.body.quirurgico_descripcion,
									tratamiento: req.body.tratamiento,
									config_doc_iso: req.body.config_doc_iso ? req.body.config_doc_iso : null,
									cargos: req.body.cargos ? req.body.cargos: null
								}).then(function (medicoPacientefichaCreado) {
									if(medicoPacientefichaCreado.config_doc_iso){
										ConfiguracionIso.find({
											where:{id: medicoPacientefichaCreado.config_doc_iso}
										}).then(config_iso=>{
										res.json({ message: "Ficha paciente actualizada satisfactoriamente!", ficha_medica: medicoPacientefichaCreado, config_iso: config_iso})

										})
									}else{
										res.json({ message: "Ficha paciente actualizada satisfactoriamente!", ficha_medica: medicoPacientefichaCreado })
									}
								})
							})
						})
					})
				})
			}
		})
	router.route('/medico-paciente-consulta/paciente/:id_paciente')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoPacienteConsulta.update({
				id_paciente: req.body.id_paciente,
				fecha: req.body.fecha,
				presion: req.body.presion,
				pulso: req.body.pulso,
				talla: req.body.talla,
				peso: req.body.peso,
				temperatura: req.body.temperatura,
				frecuencia_respiratoria: req.body.frecuencia_respiratoria,
				frecuencia_cardiaca: req.body.frecuencia_cardiaca,
				indice_masa_corporal: req.body.indice_masa,
				subjetivo: req.body.subjetivo,
				objetivo: req.body.objetivo,
				analitico: req.body.diagnosticos,
				plan: req.body.planes,
				evolucion: req.body.evolucion,
				nervioso_central: req.body.nervioso_central,
				sentidos: req.body.ojos_oido_nariz_garganta,
				cardiovascular: req.body.cardio_vascular,
				respiratorio: req.body.respiratorio,
				gastrointestinal: req.body.gastro_instestinal,
				genitourinario: req.body.genitourinario,
				locomotor: req.body.locomotor,
				piel: req.body.piel_faneras,
			}, {
				where: {
					id: req.params.id_paciente
				}
			}).then(function (medicoPacienteConsultaCreado) {
				res.json({ message: "consulta creada satisfactoriamente!" })
			})
		})

	router.route('/prerequisitos/paciente/:id_paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre_corto: Diccionario.PRE_REQUSITO }
			}).then(function (clase) {
				req.body.prerequisitos.forEach(function (prerequisito, index, array) {
					MedicoPrerequisito.find({
						where: {
							$or: [{ id_prerequisito: prerequisito.id_prerequisito }]
						},
					}).then(function (prerequisitoEncontrado) {
						if (prerequisitoEncontrado) {
							MedicoPrerequisito.update({
								vencimiento_mes: prerequisito.vencimiento_mes,
								fecha_inicio: prerequisito.fecha_inicio,
								fecha_vencimiento: prerequisito.fecha_vencimiento,
								observacion: prerequisito.observacion,
								puede_modificar_rrhh: prerequisito.puede_modificar_rrhh
							}, {
								where: {
									id: prerequisitoEncontrado.id
								}
							}).then(function (prerequisitoCreado) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: "¡Datos de Pre-requisito actualizados satisfactoriamente!" });
								}
							});
						} else {
							MedicoPrerequisito.create({
								id_paciente: req.params.id_paciente,
								id_prerequisito: prerequisito.id_prerequisito,
								vencimiento_mes: prerequisito.vencimiento_mes,
								fecha_inicio: prerequisito.fecha_inicio,
								fecha_vencimiento: prerequisito.fecha_vencimiento,
								observacion: prerequisito.observacion,
								puede_modificar_rrhh: prerequisito.puede_modificar_rrhh

							}).then(function (prerequisitoCreado) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: "Pre-requisitos creados satisfactoriamente!" });
								}
							});
						}

					})

				})
			})
		})
	router.route('/empleados/empresa/:id_empresa/pre-requisito/excel/upload')
		.post(ensureAuthorizedlogged, function (req, res) {
			var promises = [];
			sequelize.transaction(function (t) {
				req.body.forEach(function (requisito, index, array) {
					promises.push(MedicoPaciente.find({
						where: { codigo: requisito.codigo, empresa: req.params.id_empresa, es_empleado: true }, transaction: t
					}).then(function (empleadoEncontrado) {
						return MedicoPrerequisito.find({
							where: { nombre: requisito.preRequisito }, transaction: t
						}).then(function (prerequisitoEncontrado) {
							var fecha_ini = requisito.fecha_inicio.split('/')
							requisito.fecha_inicio = new Date(fecha_ini[2], parseInt(fecha_ini[1]) - 1, fecha_ini[0])
							var fechaI = new Date(fecha_ini[2], parseInt(fecha_ini[1]) - 1, fecha_ini[0])
							//requisito.fecha_inicio.setHours(1, 0, 0, 0);
							requisito.fecha_vencimiento = new Date(fechaI.setTime(fechaI.getTime() + (prerequisitoEncontrado.vencimiento_mes * 30) * 86400000))
							var entregado = new Date(requisito.fecha_entrega)
							var inicio = new Date(fecha_ini[2], parseInt(fecha_ini[1]) - 1, fecha_ini[0])
							inicio.setHours(0, 0, 0, 0)
							var fin = new Date(fecha_ini[2], parseInt(fecha_ini[1]) - 1, fecha_ini[0])
							fin.setHours(23, 59, 59, 0)
							return MedicoPacientePreRequisito.findOrCreate({
								where: {
									id_paciente: empleadoEncontrado.id,
									id_prerequisito: prerequisitoEncontrado.id,
									fecha_inicio: { $between: [inicio, fin] },
									fecha_entrega: entregado,
									fecha_vencimiento: requisito.fecha_vencimiento,
									observacion: requisito.observacion,
									eliminado: false
								},
								defaults: {
									id_paciente: empleadoEncontrado.id,
									id_prerequisito: prerequisitoEncontrado.id,
									fecha_inicio: requisito.fecha_inicio2,
									fecha_entrega: entregado,
									fecha_vencimiento: requisito.fecha_vencimiento,
									observacion: requisito.observacion,
									eliminado: false
								}, transaction: t,
								lock: t.LOCK.UPDATE,
							}).spread(function (prerequisitoAsignado, is_new) {
								if (!is_new) {
									return MedicoPacientePreRequisito.update({
										id_prerequisito: prerequisitoEncontrado.id,
										fecha_inicio: requisito.fecha_inicio2,
										fecha_entrega: entregado,
										fecha_vencimiento: requisito.fecha_vencimiento,
										observacion: requisito.observacion,
										eliminado: false
									}, {
										where: {
											id_paciente: empleadoEncontrado.id,
											id_prerequisito: prerequisitoEncontrado.id,
										}, transaction: t
									}).then(function (preRequisitoActualizado) {
										res.json({ mensaje: "Pre-requisito actualizado satisfactoriamente!" });
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject((err.stack !== undefined) ? err.stack : err);
										});
									})
								} else {
									return new Promise(function (fulfill, reject) {
										fulfill();
									});
								}
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject((err.stack !== undefined) ? err.stack : err);
								});
							})
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						})

					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					}))
				})
				return Promise.all(promises);
			}).then(function (result) {
				res.json({ mensaje: "¡Datos de pre requisitos empleados actualizados satisfactoriamente!" });
			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			});
		})
	//rutas laboratorio inicio
	router.route('/nuevo-laboratorio/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				MedicoLaboratorio.update({
					nombre: req.body.nombre,
					descripcion: req.body.descripcion,
					id_empresa: req.params.id_empresa,
				}, {
					where: { id: req.body.id }
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "laboratorio actualizado satisfactoriamente!" })
				})
			} else {
				MedicoLaboratorio.create({
					nombre: req.body.nombre,
					descripcion: req.body.descripcion,
					id_empresa: req.params.id_empresa
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "laboratorio creado satisfactoriamente!" })
				})
			}
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoLaboratorio.find({
				where: { id_empresa: req.params.id_empresa, id: req.body.id },
				include: [{ model: MedicoLaboratorioExamen, as: 'laboratorioExamenes' }]
			}).then(function (MedicosLaboratorioEncontrados) {
				if (MedicosLaboratorioEncontrados.laboratorioExamenes.length > 0) {

					res.json({ message: "EL laboratorio cuenta con historial de examenes no se puede eliminar!" })
				} else {
					MedicoLaboratorio.destroy({
						where: {
							id: req.body.id
						}
					}).then(function (medicoLaboratorioEliminado) {
						res.json({ message: "Eliminado Satisfactoriamente!" })
					})

				}

			})
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoLaboratorio.findAll({
				where: { id_empresa: req.params.id_empresa }
			}).then(function (MedicosLaboratorioEncontrados) {
				res.json(MedicosLaboratorioEncontrados)
			})
		})
	router.route('/nuevo-laboratorio-examen/laboratorio/:id_laboratorio/paciente/:paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				MedicoLaboratorioExamen.update({
					nombre: req.body.nombre,
					examen: req.body.examen,
					unidad: req.body.unidad,
					minimo: req.body.minimo,
					maximo: req.body.maximo,
					observacion: req.body.observacion,
					id_laboratorio: req.params.id_laboratorio
				}, {
					where: { id: req.body.id }
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "laboratorio examen actualizado satisfactoriamente!" })
				})
			} else {
				MedicoLaboratorioExamen.create({
					nombre: req.body.nombre,
					examen: req.body.examen,
					unidad: req.body.unidad,
					minimo: req.body.minimo,
					maximo: req.body.maximo,
					observacion: req.body.observacion,
					id_laboratorio: req.params.id_laboratorio
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "laboratorio examen creado satisfactoriamente1" })
				})
			}

		})
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoLaboratorioExamen.find({
				where: { id: req.body.id },
				include: [{ model: MedicoLaboratorioResultado, as: 'laboratorioPacientesExamenes' }]
			}).then(function (MedicosLaboratorioExamenEncontrados) {
				if (MedicosLaboratorioExamenEncontrados.laboratorioPacientesExamenes.length > 0) {

					res.json({ message: "EL examen cuenta con historial de resultados no se puede eliminar!" })
				} else {
					MedicoLaboratorioExamen.destroy({
						where: {
							id: req.body.id
						}
					}).then(function (medicoLaboratorioEliminado) {
						res.json({ message: "Eliminado Satisfactoriamente!" })
					})

				}

			})
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			let query = "SELECT\
			agil_medico_laboratorio_examen.id,\
			agil_medico_laboratorio_examen.laboratorio AS id_laboratorio,\
			agil_medico_laboratorio_examen.nombre,\
			agil_medico_laboratorio_examen.examen,\
			agil_medico_laboratorio_examen.unidad,\
			agil_medico_laboratorio_examen.observacion,\
			agil_medico_laboratorio_examen.minimo,\
			agil_medico_laboratorio_examen.maximo,\
			agil_medico_laboratorio_examen.createdAt,\
			agil_medico_laboratorio_examen.updatedAt,\
			agil_medico_laboratorio_resultado.resultado as ultimo_resultado\
		FROM\
			agil_medico_laboratorio_examen AS agil_medico_laboratorio_examen\
			left JOIN agil_medico_laboratorio_resultado AS agil_medico_laboratorio_resultado ON agil_medico_laboratorio_resultado.laboratorio_examen = agil_medico_laboratorio_examen.id and agil_medico_laboratorio_resultado.laboratorio_paciente = (select id from agil_medico_laboratorio_paciente where agil_medico_laboratorio_paciente.laboratorio = '8' and agil_medico_laboratorio_paciente.paciente = '2909' and agil_medico_laboratorio_paciente.createdAt = (select max(createdAt) from agil_medico_laboratorio_paciente where agil_medico_laboratorio_paciente.laboratorio = :laboratorio and agil_medico_laboratorio_paciente.paciente = :paciente))\
			left JOIN agil_medico_laboratorio_paciente on agil_medico_laboratorio_paciente.id = agil_medico_laboratorio_resultado.laboratorio_paciente\
		WHERE\
			agil_medico_laboratorio_examen.laboratorio = :laboratorio;"

			sequelize.query(query, { replacements: { laboratorio: req.params.id_laboratorio, paciente: req.params.paciente }, type: sequelize.QueryTypes.SELECT }).then((MedicoLaboratorioExamenesEncontrado) => {
				res.json(MedicoLaboratorioExamenesEncontrado)
			})
		})
	router.route('/nuevo-laboratorio-resultado/laboratorio/:id_laboratorio/paciente/:id_paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.examenes[0].id_resultado) {
				MedicoLaboratorioPaciente.find({
					where: {
						id_laboratorio: req.params.id_laboratorio
					}
				}).then(function (MedicoLaboratorioCreado) {
					req.body.examenes.forEach(function (examen, index, array) {
						if (examen.eliminado) {
							MedicoLaboratorioResultado.destroy({
								where: {
									id: examen.id_resultado
								}
							}).then(function (MedicoLaboratorioCreado) {
								if (index === (array.length - 1)) {
									MedicoLaboratorioPaciente.destroy({
										where: {
											id: req.body.historico.id
										}
									}).then(function (MedicoLaboratorioCreado) {
										res.json({ message: "Resultados Eliminados satisfactoriamente" })
									}).catch((err) => {
										res.json({ message: err.stack })
									})
									res.json({ message: "Resultados Eliminados satisfactoriamente" })
								}
							}).catch((err) => {
								if (index === (array.length - 1)) {
									res.json({ message: err.stack })
								}
							})
						} else {
							if (examen.estado != null || examen.resultado != null) {
								MedicoLaboratorioResultado.update({
									resultado: examen.resultado
								}, {
									where: {
										id: examen.id_resultado
									}
								}).then(function (MedicoLaboratorioCreado) {
									if (index === (array.length - 1)) {
										res.json({ message: "Resultados Editados satisfactoriamente" })
									}
								}).catch((err) => {
									if (index === (array.length - 1)) {
										res.json({ message: err.stack })
									}
								})
							} else {
								if (index === (array.length - 1)) {
									res.json({ message: err.stack })
								}
							}
						}
					}, this);
				})
			} else {
				if (req.body.fecha) {
					MedicoLaboratorioPaciente.create({
						id_laboratorio: req.params.id_laboratorio,
						id_paciente: req.params.id_paciente,
						fecha: req.body.fecha
					}).then(function (MedicoLaboratorioCreado) {
						req.body.examenes.forEach(function (examen, index, array) {
							if (examen.resultado) {
								MedicoLaboratorioResultado.create({
									id_laboratorio_paciente: MedicoLaboratorioCreado.id,
									id_laboratorio_examen: examen.id,
									resultado: examen.resultado
								}).then(function (MedicoLaboratorioCreado) {
									if (index === (array.length - 1)) {
										res.json({ message: "Resultados agregados satisfactoriamente" })
									}
								})
							} else {
								if (index === (array.length - 1)) {
									res.json({ message: "Ocurrió un error, revise sus datos." })
								}
							}
						}, this);
					})
				} else {
					MedicoLaboratorioPaciente.destroy({
						where: {
							id: req.body.historico.id
						}
					}).then(function (MedicoLaboratorioCreado) {
						res.json({ message: "Resultados Eliminados satisfactoriamente" })
					}).catch((err) => {
						res.json({ message: err.stack })
					})
				}
			}


		})
	router.route('/laboratorio-resultado/laboratorio/:id_laboratorio/paciente/:id_paciente/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var desde = false
			var hasta = false
			var condicionLaboratorioPaciente = { id_laboratorio: req.params.id_laboratorio, id_paciente: req.params.id_paciente }
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				desde = true
			}
			if (req.params.fin != 0) {
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				hasta = true
			}
			if (desde && hasta) {
				condicionLaboratorioPaciente = {
					id_laboratorio: req.params.id_laboratorio,
					id_paciente: req.params.id_paciente,
					fecha: {
						$between: [inicio, fin]
					}
				}
			} else if (desde && !hasta) {
				condicionLaboratorioPaciente = {
					id_laboratorio: req.params.id_laboratorio,
					id_paciente: req.params.id_paciente,
					fecha: {
						$gte: [inicio]
					}
				}
			} else if (!desde && hasta) {
				condicionLaboratorioPaciente = {
					id_laboratorio: req.params.id_laboratorio,
					id_paciente: req.params.id_paciente,
					fecha: {
						$lte: [fin]
					}
				}
			} else if (!desde && !hasta) {
				var hoy = new Date()
				condicionLaboratorioPaciente = {
					id_laboratorio: req.params.id_laboratorio,
					id_paciente: req.params.id_paciente
				}
			}
			// if (req.params.inicio != 0) {
			// 	var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			// 	var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			// 	condicionLaboratorioPaciente = {
			// 		id_laboratorio: req.params.id_laboratorio, id_paciente: req.params.id_paciente,
			// 		$or: [
			// 			{
			// 				fecha: {
			// 					$between: [inicio, fin]
			// 				}
			// 			}
			// 		]
			// 	};
			// }
			// condicionLaboratorioPaciente.eliminado = false
			MedicoLaboratorioPaciente.findAll({
				where: condicionLaboratorioPaciente,
				include: [{ model: MedicoLaboratorio, as: 'laboratorio' },
				{ model: MedicoLaboratorioResultado, as: 'laboratorioResultados', include: [{ model: MedicoLaboratorioExamen, as: 'laboratorioExamen' }] }]
			}).then(function (MedicoLaboratorioExamenesEncontrado) {
				res.json(MedicoLaboratorioExamenesEncontrado)
			})
		})

	//rutas laboratorio fin

	//rutas Diagnostico inicio

	router.route('/nuevo-diagnostico/empresa/:id_empresa')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoDiagnostico.find({
				where: { id_empresa: req.params.id_empresa, id: req.body.id },
				include: [{ model: MedicoDiagnosticoExamen, as: 'diagnosticoExamenes' }]
			}).then(function (MedicosDiagnosticoEncontrados) {
				if (MedicosDiagnosticoEncontrados.diagnosticoExamenes.length > 0) {

					res.json({ message: "EL diagnostico cuenta con historial de examenes no se puede eliminar!" })
				} else {
					MedicoDiagnostico.destroy({
						where: {
							id: req.body.id
						}
					}).then(function (medicoDiagnosticoEliminado) {
						res.json({ message: "Eliminado Satisfactoriamente!" })
					})

				}

			})
		})
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				MedicoDiagnostico.update({
					nombre: req.body.nombre,
					descripcion: req.body.descripcion,
					id_empresa: req.params.id_empresa,
				}, {
					where: { id: req.body.id }
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "diagnostico actualizado satisfactoriamente!" })
				})
			} else {
				MedicoDiagnostico.create({
					nombre: req.body.nombre,
					descripcion: req.body.descripcion,
					id_empresa: req.params.id_empresa
				}).then(function (MedicoLaboratorioCreado) {
					res.json({ message: "diagnostico creado satisfactoriamente!" })
				})
			}
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoDiagnostico.findAll({
				where: { id_empresa: req.params.id_empresa }
			}).then(function (MedicosDiagnosticosEncontrados) {
				res.json(MedicosDiagnosticosEncontrados)
			})
		})

	router.route('/nuevo-diagnostico-examen/diagnostico/:id_diagnostico')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoDiagnosticoExamen.find({
				where: { id: req.body.id },
				include: [{ model: MedicoDiagnosticoResultado, as: 'diagnosticoPacientesExamenes' }]
			}).then(function (MedicosDiagnosticoExamenEncontrados) {
				if (MedicosDiagnosticoExamenEncontrados.diagnosticoPacientesExamenes.length > 0) {
					res.json({ message: "EL examen cuenta con historial de resultados no se puede eliminar!" })
				} else {
					MedicoDiagnosticoExamen.destroy({
						where: {
							id: req.body.id
						}
					}).then(function (medicoDiagnosticoEliminado) {
						res.json({ message: "Eliminado Satisfactoriamente!" })
					})

				}

			}).catch((err) => {
				res.json({ message: "Error al eliminar!" })
			})
		})
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				MedicoDiagnosticoExamen.update({
					nombre: req.body.nombre,
					examen: req.body.examen,
					unidad: req.body.unidad,
					minimo: req.body.minimo,
					maximo: req.body.maximo,
					observacion: req.body.observacion,
					id_diagnostico: req.params.id_diagnostico
				}, {
					where: { id: req.body.id }
				}).then(function (MedicodiagnosticoCreado) {
					res.json({ message: "diagnostico examen actualizado satisfactoriamente!" })
				}).catch((err) => {
					res.json({ message: "Error al actualizar!" })
				})
			} else {
				MedicoDiagnosticoExamen.create({
					nombre: req.body.nombre,
					examen: req.body.examen,
					unidad: req.body.unidad,
					minimo: req.body.minimo,
					maximo: req.body.maximo,
					observacion: req.body.observacion,
					id_diagnostico: req.params.id_diagnostico
				}).then(function (MedicodiagnosticoCreado) {
					res.json({ message: "diagnostico examen creado satisfactoriamente!" })
				})
					.catch((err) => {
						res.json({ message: "Error al crear!" })
					})
			}

		})
		.get(ensureAuthorizedlogged, function (req, res) {
			MedicoDiagnosticoExamen.findAll({
				where: { id_diagnostico: req.params.id_diagnostico }
			}).then(function (MedicoDiagnosticoExamenesEncontrado) {
				res.json(MedicoDiagnosticoExamenesEncontrado)
			})
				.catch((err) => {
					res.json({ message: "Error al recuperar información!" })
				})
		})
	router.route('/nuevo-diagnostico-resultado/diagnostico/:id_diagnostico/paciente/:id_paciente')
		.post(ensureAuthorizedlogged, function (req, res) {
			MedicoDiagnosticoPaciente.create({
				id_diagnostico: req.params.id_diagnostico,
				id_paciente: req.params.id_paciente,
				fecha: req.body.fecha
			})
			.then(function (MedicoDiagnosticoCreado) {
				req.body.examenes.forEach(function (examen, index, array) {
					if (examen.estado != null || examen.resultado != null) {
						MedicoDiagnosticoResultado.create({
							id_diagnostico_paciente: MedicoDiagnosticoCreado.id,
							id_diagnostico_examen: examen.id,
							estado: examen.estado,
							resultado: examen.resultado,
							estadistica: examen.estadistica ? examen.estadistica.nombre : null
						}).then(function (MedicoDiagnosticoResltadoCreado) {
							if (index === (array.length - 1)) {
								res.json({ message: "Resultados agregados satisfactoriamente", messageType:"success" })
							}
						})
					} else {
						if (index === (array.length - 1)) {
							res.json({ message: "Resultados agregados satisfactoriamente", messageType:"success" })
						}
					}
				}, this);

			})
			.catch(e=>res.json({error: true, message: "Error al guardar diagnóstico<br>"+e, messageType:"error"}))
		})

	router.route('/diagnostico-resultado/diagnostico/:id_diagnostico/paciente/:id_paciente/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var desde = false
			var hasta = false
			var condicionDiagnosticoPaciente = { id_diagnostico: req.params.id_diagnostico, id_paciente: req.params.id_paciente }
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				desde = true
			}
			if (req.params.fin != 0) {
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				hasta = true
			}
			if (desde && hasta) {
				condicionDiagnosticoPaciente = {
					id_diagnostico: req.params.id_diagnostico,
					id_paciente: req.params.id_paciente,
					fecha: {
						$between: [inicio, fin]
					}
				}
			} else if (desde && !hasta) {
				condicionDiagnosticoPaciente = {
					id_diagnostico: req.params.id_diagnostico,
					id_paciente: req.params.id_paciente,
					fecha: {
						$gte: [inicio]
					}
				}
			} else if (!desde && hasta) {
				condicionDiagnosticoPaciente = {
					id_diagnostico: req.params.id_diagnostico,
					id_paciente: req.params.id_paciente,
					fecha: {
						$lte: [fin]
					}
				}
			} else if (!desde && !hasta) {
				var hoy = new Date()
				condicionDiagnosticoPaciente = {
					id_diagnostico: req.params.id_diagnostico,
					id_paciente: req.params.id_paciente
				}
			}
			// var condicionDiagnosticoPaciente = { id_diagnostico: req.params.id_diagnostico, id_paciente: req.params.id_paciente }
			// if (req.params.inicio != 0) {
			// 	var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			// 	var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			// 	condicionDiagnosticoPaciente = {
			// 		id_diagnostico: req.params.id_diagnostico, id_paciente: req.params.id_paciente,
			// 		$or: [
			// 			{
			// 				fecha: {
			// 					$between: [inicio, fin]
			// 				}
			// 			}
			// 		]
			// 	};
			// }
			MedicoDiagnosticoPaciente.findAll({
				where: condicionDiagnosticoPaciente,
				include: [{ model: MedicoDiagnostico, as: 'diagnostico' },
				{ model: MedicoDiagnosticoResultado, as: 'diagnosticoResultados', include: [{ model: MedicoDiagnosticoExamen, as: 'diagnosticoExamen' }], order: sequelize.literal(' id desc') }]
			}).then(function (MedicoDiagnosticoExamenesEncontrado) {
				res.json(MedicoDiagnosticoExamenesEncontrado)
			})
		})
	//rutas Diagnostico fin
	router.route('/laboratorio/activar/:id_laboratorio')
		.put(ensureAuthorizedlogged, function (req, res) {
			MedicoLaboratorio.update({
				eliminar: req.body.eliminar
			}, {
				where: { id: req.params.id_laboratorio }
			}).then(function (laboratorio) {
				res.json({ mensaje: "Banco Actualizado." });
			})
		})

	//Riesgo laboral por cargo.

	router.route('/empleados/riesgo/cargo/:id_empresa/:id_cargo')
		.post(ensureAuthorizedlogged, (req, res) => {
			let id_empresa = parseInt(req.params.id_empresa)
			let id_cargo = parseInt(req.body.cargo.id)
			let checkNumber = (Number.isInteger(id_empresa) && Number.isInteger(id_cargo))
			if (checkNumber) {
				sequelize.transaction((t) => {
					return crearRiesgoLaboral(t, req.body, id_empresa)
				}).then((result) => {
					if (result) {
						res.json({ riesgo: result })
					} else {
						res.json({ mensaje: 'Error al crear', hasErr: true })
					}
				}).catch((err) => {
					res.json({ mensaje: err.stack, hasErr: true })
				})
			} else {
				res.json({ mensaje: 'Error de comprobación de parametros.' })
			}
		})
		.get(ensureAuthorizedlogged, (req, res) => {
			let id_empresa = parseInt(req.params.id_empresa)
			let checkNumber = Number.isInteger(id_empresa)
			if (checkNumber) {
				RiesgoCargo.findAll({
					where: { id_cargo: { $in: req.params.id_cargo.split(',') } },
					include: [
						{
							model: Clase, as: "riesgo"
						}
					]
				}).then((riesgos) => {
					if (riesgos.length > 0) {
						res.json({ riesgos: riesgos })
					} else {
						res.json({ mensaje: 'No se encontró información.', riesgos: [], hasErr: true })
					}
				}).catch((err) => {
					res.json({ mensaje: err.stack, hasErr: true })
				})
			} else {
				res.json({ mensaje: 'Error de comprobación de parametros.', riesgos: [], hasErr: true })
			}
		})
		.put(ensureAuthorizedlogged, (req, res) => {
			let id_empresa = parseInt(req.params.id_empresa)
			let riesgo = req.body;
			let checkNumber = Number.isInteger(id_empresa)
			if (checkNumber) {
				Tipo.find({
					where: { nombre_corto: 'RRHH_CARGO', id_empresa: id_empresa }
				}).then((tipoCargo) => {
					if (tipoCargo) {
						if (riesgo.desactivar) {
							RiesgoCargo.update({
								eliminado: riesgo.eliminado,
							}, {
								where: { id: riesgo.id }
							}).then(function (result) {
								res.json({ riesgo: result })
							}).catch(function (err) {
								res.json({ mensaje: err.stack, hasErr: true })
							});
						} else {
							RiesgoCargo.update({
								id_cargo: riesgo.cargo.id,
								nombre_riesgo: riesgo.nombre,
								descripcion: riesgo.descripcion,
							}, {
								where: { id: riesgo.id }
							}).then(function (result) {
								res.json({ riesgo: result })
							}).catch(function (err) {
								res.json({ mensaje: err.stack, hasErr: true })
							});
						}

					} else {
						res.json({ mensaje: 'El concepto [nombre:CARGO, nombre_corto:RRHH_CARGO] requerido, no se encuentra.' })
					}
				}).catch((err) => {
					res.json({ mensaje: err.stack, hasErr: true })
				})
			} else {
				res.json({ mensaje: 'Error de comprobación de parametros.' })
			}
		})
		.delete(ensureAuthorizedlogged, (req, res) => {
			let id_empresa = parseInt(req.params.id_empresa)
			let riesgo = req.body;
			let checkNumber = Number.isInteger(id_empresa)
			if (checkNumber) {
				Tipo.find({
					where: { nombre_corto: 'RRHH_CARGO', id_empresa: id_empresa }
				}).then((tipoCargo) => {
					if (tipoCargo) {
						RiesgoCargo.update({
							eliminado: riesgo.eliminado,
						}, {
							where: { id: riesgo.id }
						}).then(function (result) {
							res.json({ riesgo: result })
						}).catch(function (err) {
							res.json({ mensaje: err.stack, hasErr: true })
						});
					} else {
						res.json({ mensaje: 'El concepto [nombre:CARGO, nombre_corto:RRHH_CARGO] requerido, no se encuentra.' })
					}
				}).catch((err) => {
					res.json({ mensaje: err.stack, hasErr: true })
				})
			} else {
				res.json({ mensaje: 'Error de comprobación de parametros.' })
			}
		})

	function crearRiesgoLaboral(t, riesgo, id_empresa) {
		return RiesgoCargo.create({
			id_cargo: riesgo.cargo.id,
			nombre_riesgo: riesgo.nombre,
			descripcion: riesgo.descripcion,
			id_empresa: id_empresa
		}, {
			transaction: t
		}).then((riesgoCreado) => {
			if (riesgoCreado) {
				return riesgoCreado
			} else {
				throw new Error('Ups!!! algo salió mal.')
			}
		}).catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				throw new Error('Registro de riesgo repetido para el cargo en la empresa actual.')
			} else {
				throw new Error(err)
			}
		})
	}

	router.route('/ficha-medica/paciente/:id_paciente')
		.put(ensureAuthorizedlogged, function (req, res) {
			var validarPersonaReferencia = req.body.personaReferencia ? req.body.personaReferencia.id : null;
			if (!validarPersonaReferencia) {
				Persona.create({
					nombres: req.body.personaReferencia.nombres,
					telefono: req.body.personaReferencia.telefono,
					direccion: req.body.personaReferencia.direecion,
					telefono_movil: req.body.personaReferencia.telefono_movil,
					direccion_ciudad: req.body.personaReferencia.direccion_ciudad,
					direccion_zona: req.body.personaReferencia.direccion_zona,
					direccion_localidad: req.body.personaReferencia.direccion_localidad,
					direccion_numero: req.body.personaReferencia.direccion_numero
				}).then(function (personaReferenciaCreada) {
					actualizarFichaMedica(req, res, personaReferenciaCreada);
				})
			} else {
				Persona.update({
					nombres: req.body.personaReferencia.nombres,
					telefono: req.body.personaReferencia.telefono,
					direccion: req.body.personaReferencia.direecion,
					telefono_movil: req.body.personaReferencia.telefono_movil,
					direccion_ciudad: req.body.personaReferencia.direccion_ciudad,
					direccion_zona: req.body.personaReferencia.direccion_zona,
					direccion_localidad: req.body.personaReferencia.direccion_localidad,
					direccion_numero: req.body.personaReferencia.direccion_numero
				}, {
					where: {
						id: req.body.personaReferencia.id
					}
				}).then(function (personaReferenciaActualizada) {
					actualizarFichaMedica(req, res);
				})

			}
		})

	function actualizarFichaMedica(req, res, personaReferenciaCreada) {
		MedicoPaciente.update({
			grupo_sanguineo: req.body.paciente.grupo_sanguineo.nombre,
			id_extension: req.body.paciente.extension.id,
			activo: req.body.paciente.activo,
			id_grupo_sanguineo: req.body.paciente.grupo_sanguineo.id
		}, {
			where: {
				id: req.body.paciente.id
			}
		}).then(function (medicoPacienteActualizado) {
			Persona.update({
				telefono: req.body.paciente.persona.telefono,
				telefono_movil: req.body.paciente.persona.telefono_movil,
				correo_electronico: req.body.paciente.persona.correo_electronico
			}, {
				where: {
					id: req.body.paciente.persona.id
				}
			}).then(function (MedicoPacientePersonaActualizado) {
				var id_personaReferencia = personaReferenciaCreada ? personaReferenciaCreada.id : req.body.personaReferencia.id;
				MedicoPacienteFicha.update({
					fecha: req.body.fecha_elaboracion,
					estilo_vida: req.body.estilo_vida,
					actividad_laboral: req.body.actividad_laboral,
					area_operacion: req.body.area_operacion,
					riesgo: req.body.riesgo,
					id_persona_referencia: id_personaReferencia,
					id_tipo_control: req.body.tipoControl.id,
					alergia_humo_cigarrillo: req.body.alergia_humo_cigarrillo,
					alergia_polvo: req.body.alergia_polvo,
					alergia_picadura: req.body.alergia_picadura,
					alergia_quimico: req.body.alergia_quimico,
					alergia_algun_material: req.body.alergia_algun_material,
					alergia_medicamento: req.body.alergia_medicamento,
					alergia_plantas: req.body.alergia_plantas,
					alergia_alimentos: req.body.alergia_alimentos,
					alergia_conservas: req.body.alergia_conservas,
					alergia_otros: req.body.alergia_otros,
					alergia_otros_comentario: req.body.alergia_otros_comentario,
					es_donante: req.body.es_donante,
					enfermedad_hipertension: req.body.enfermedad_hipertension,
					enfermedad_cardilogia: req.body.enfermedad_cardilogia,
					enfermedad_lumbalgia: req.body.enfermedad_lumbalgia,
					enfermedad_diabetes: req.body.enfermedad_diabetes,
					enfermedad_digestiva: req.body.enfermedad_digestiva,
					enfermedad_epilepsia: req.body.enfermedad_epilepsia,
					enfermedad_chagas: req.body.enfermedad_chagas,
					enfermedad_asma: req.body.enfermedad_asma,
					enfermedad_hepatitis: req.body.enfermedad_hepatitis,
					enfermedad_otros: req.body.enfermedad_otros,
					enfermedad_comentario: req.body.enfermedad_comentario,
					quirurgico_operado: req.body.quirurgico_operado,
					quirurgico_comentario: req.body.quirurgico_comentario,
					descripcion_indicadores: req.body.descripcion_indicadores,
					descripcion_antecedentes: req.body.descripcion_antecedentes,
					quirurgico_descripcion: req.body.quirurgico_descripcion,
					tratamiento: req.body.tratamiento
				}, {
					where: {
						id: req.body.id
					}
				}).then(function (medicoPacientefichaCreado) {
					res.json({ message: "Ficha de paciente actualizado satisfactoriamente!" })
				})
			})

		})
	}
	router.route('/medico-paciente/ficha/:id_ficha_medica')
	.get(ensureAuthorizedlogged, (req, res) => {
		MedicoPacienteFicha.find({
			where:{ id: req.params.id_ficha_medica},
			include:[
				{model: MedicoPaciente, as:'paciente',
					include: [
						{ model: Empresa, as: 'empresa' },
						{ model: Clase, as: 'extension' },
						// { model: Clase, as: 'grupo_sanguineo' },
						{ model: Clase, as: 'campo' },
						{
							model: Persona, as: 'persona',
							include: [ { model: Clase, as: 'genero' } ]
						}]
				},/* 
				{ model: RrhhEmpleadoFicha, as: 'fichaEmpleado', 
					include:[
						{model: RrhhEmpleadoCargo, as:'cargos',
							include:[{model: Clase, as: 'cargo', 
								include:[{model: RiesgoCargo, as: 'riesgos'}]
						}]
						}
					]
				}, */
				{ model: ConfiguracionIso, as: 'configuracionesIso'},
				{ model: Clase, as: 'tipoControl'},
				{ model: Persona, as: 'personaReferencia'},
				{ model: MedicoPacienteConsulta, as: 'consultas', order: [['id', 'desc']], limit: 1 }
				
			]
		})
		.then(ficha=>{
			res.json({fichaMedica: ficha, error: false})
		})
		.catch(e => {
			res.json({error:true})
		})
	})


	//GET cargosByName
	router.route('/paciente/ficha-medica/reportes/cargo/:busqueda/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		MedicoPacienteFicha.findAll({
			attributes: ['cargos'],
			where: {
				cargos: { $like: "%" + req.params.busqueda + "%" }
			},
			include: [{ model:MedicoPaciente, as:'paciente', where: { empresa: req.params.id_empresa }}],
			group: ['cargos']
		}).then(entidad => {
			let data = entidad.map(ele=>ele.cargos)
			res.json(data)
		});
	});

	//GET camposByName
	router.route('/paciente/ficha-medica/reportes/campo/:busqueda/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		Tipo.find({
			where: {
				nombre_corto: "CENCOS",
				id_empresa: req.params.id_empresa
			},
			include: [
				{ model: Clase, as: 'clases', required: false, where: {  nombre: { $like: "%" + req.params.busqueda + "%" }  }}]
		}).then(entidad => res.json(entidad.clases));
	});

	router.route('/paciente/ficha-medica/reportes/data/:id_empresa/:tipo_control/:inicio/:fin/:nombres/:cargo/:campo/:estado/:grupo_sanguineo/:tipo')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa, tipo_control, inicio, fin, nombres, cargo, campo, estado, grupo_sanguineo, tipo } = req.params
		let qry =  tipo == "1"
		?"SELECT persona.nombre_completo, tipo_control.nombre AS tipo, ficha.fecha, campo.nombre AS campo FROM agil_medico_paciente_ficha ficha LEFT JOIN gl_clase tipo_control ON tipo_control.id=ficha.id_tipo_control INNER JOIN agil_medico_paciente paciente ON paciente.id=ficha.id_paciente INNER JOIN gl_clase campo ON campo.id=paciente.campo LEFT JOIN gl_clase grupo_sanguineo ON grupo_sanguineo.id=paciente.id_grupo_sanguineo INNER JOIN gl_persona persona ON persona.id=paciente.persona WHERE paciente.empresa = "+ id_empresa 
		:`SELECT persona.nombre_completo,persona.ci,extension.nombre_corto AS extension,IF (persona.fecha_nacimiento,TIMESTAMPDIFF(YEAR,persona.fecha_nacimiento,CURDATE()),0) AS edad,IF (genero.nombre IS NOT NULL,genero.nombre,"") AS genero,IF(ficha.fecha IS NOT NULL, ficha.fecha, "") AS fecha,IF (tipo_control.nombre IS NOT NULL,tipo_control.nombre,"") AS tipo_control,IF (ficha.estilo_vida IS NOT NULL,ficha.estilo_vida,"") AS estilo_vida,IF (ficha.area_operacion IS NOT NULL,ficha.area_operacion,"") AS area_operacion,IF (ficha.cargos IS NOT NULL,ficha.cargos,"") AS cargos,IF (ficha.riesgo IS NOT NULL,ficha.riesgo,"") AS riesgo,IF (ref.direccion_ciudad IS NOT NULL,ref.direccion_ciudad,"") AS ref_ciudad,IF (ref.direccion_zona IS NOT NULL,ref.direccion_zona,"") AS ref_zona,IF (ref.direccion IS NOT NULL,ref.direccion,"") AS ref_calle,IF (ref.direccion_numero IS NOT NULL,ref.direccion_numero,"") AS ref_calle_nro,IF (ref.telefono IS NOT NULL,ref.telefono,"") AS ref_telefono,IF (ref.telefono_movil IS NOT NULL,ref.telefono_movil,"") AS ref_celular,IF (ref.nombres IS NOT NULL,ref.nombres,"") AS ref_nombres,IF (paciente.grupo_sanguineo IS NOT NULL,paciente.grupo_sanguineo,"") AS grupo_sanguineo,IF (ficha.alergia_humo_cigarrillo IS NOT NULL,ficha.alergia_humo_cigarrillo,"") AS alg_humo,IF (ficha.alergia_quimico IS NOT NULL,ficha.alergia_quimico,"") AS alg_quimicos,IF (ficha.alergia_medicamento IS NOT NULL,ficha.alergia_medicamento,"") AS alg_medicamentos,IF (ficha.alergia_plantas IS NOT NULL,ficha.alergia_plantas,"") AS alg_plantas,IF (ficha.alergia_polvo IS NOT NULL,ficha.alergia_polvo,"") AS alg_polvo,IF (ficha.alergia_algun_material IS NOT NULL,ficha.alergia_algun_material,"") AS alg_materiales,IF (ficha.alergia_alimentos IS NOT NULL,ficha.alergia_alimentos,"") AS alg_alimentos,IF (ficha.alergia_conservas IS NOT NULL,ficha.alergia_conservas,"") AS alg_conservas,IF (ficha.alergia_picadura IS NOT NULL,ficha.alergia_picadura,"") AS alg_picaduras,IF (ficha.alergia_otros IS NOT NULL,ficha.alergia_otros,"") AS alg_otros,IF (ficha.alergia_otros_comentario IS NOT NULL,ficha.alergia_otros_comentario,"") AS producto_alergico,IF (ficha.enfermedad_hipertension IS NOT NULL,ficha.enfermedad_hipertension,"") AS enf_hipertension,IF (ficha.enfermedad_diabetes IS NOT NULL,ficha.enfermedad_diabetes,"") AS enf_diabetes,IF (ficha.enfermedad_epilepsia IS NOT NULL,ficha.enfermedad_epilepsia,"") AS enf_epilepsia,IF (ficha.enfermedad_asma IS NOT NULL,ficha.enfermedad_asma,"") AS enf_asma,IF (ficha.enfermedad_cardilogia IS NOT NULL,ficha.enfermedad_cardilogia,"") AS enf_cardiologicas,IF (ficha.enfermedad_digestiva IS NOT NULL,ficha.enfermedad_digestiva,"") AS enf_digestivas,IF (ficha.enfermedad_chagas IS NOT NULL,ficha.enfermedad_chagas,"") AS enf_chagas,IF (ficha.enfermedad_hepatitis IS NOT NULL,ficha.enfermedad_hepatitis,"") AS enf_hepatitis,IF (ficha.enfermedad_lumbalgia IS NOT NULL,ficha.enfermedad_lumbalgia,"") AS enf_lumbalgias,IF (ficha.enfermedad_otros IS NOT NULL,ficha.enfermedad_otros,"") AS enf_otros,IF (ficha.enfermedad_comentario IS NOT NULL,ficha.enfermedad_comentario,"") AS enf_comentario,IF (ficha.descripcion IS NOT NULL,ficha.descripcion,"") AS enf_descripcion,IF (ficha.tratamiento IS NOT NULL,ficha.tratamiento,"") AS enf_tratamiento,IF (ficha.quirurgico_operado,"SI","NO") AS operado,IF (ficha.quirurgico_comentario IS NOT NULL,ficha.quirurgico_comentario,"") AS op_comentario,IF (ficha.quirurgico_descripcion IS NOT NULL,ficha.quirurgico_descripcion,"") AS op_descripcion,IF (consulta.presion IS NOT NULL,consulta.presion,"") AS presion,IF (consulta.frecuencia_cardiaca IS NOT NULL,consulta.frecuencia_cardiaca,"") AS frecuencia_cardiaca,IF (consulta.talla IS NOT NULL,consulta.talla,"") AS talla,IF (consulta.peso IS NOT NULL,consulta.peso,"") AS peso,IF(consulta.indice_masa_corporal IS NOT NULL, consulta.indice_masa_corporal, "") AS imc,IF (paciente.eliminado,"INACTIVO","ACTIVO") AS estado FROM agil_medico_paciente paciente INNER JOIN gl_persona persona ON persona.id=paciente.persona LEFT JOIN agil_medico_paciente_ficha ficha ON ficha.id_paciente=paciente.id LEFT JOIN gl_clase genero ON genero.id=persona.genero LEFT JOIN gl_persona ref ON ref.id=ficha.id_persona_referencia LEFT JOIN gl_clase extension ON extension.id=paciente.extension INNER JOIN gl_clase tipo_control ON tipo_control.id=ficha.id_tipo_control LEFT JOIN gl_clase grupo_sanguineo ON grupo_sanguineo.id=paciente.id_grupo_sanguineo LEFT JOIN ( SELECT A.*FROM agil_medico_paciente_consulta A INNER JOIN ( SELECT MAX(id) AS id FROM agil_medico_paciente_consulta GROUP BY id_paciente) B ON A.id=B.id ORDER BY A.id_paciente) AS consulta ON consulta.id_paciente=paciente.id WHERE paciente.empresa=${id_empresa}`

		if(tipo_control != "0") qry += " AND tipo_control.id="+tipo_control
		if(inicio != "0" || fin != "0"){
			if(inicio != "0" && fin != "0"){
				qry += " AND ficha.fecha BETWEEN '"+inicio+"' AND '"+fin+"'"
			}else{
				if(inicio != "0") qry += " AND ficha.fecha>'"+inicio+"'"
				if(fin != "0") qry += " AND ficha.fecha<'"+fin+"'"
			}
		}
		if(nombres != "0") qry += " AND persona.nombre_completo LIKE '%"+nombres+"%'"
		if(cargo != "0") qry += " AND ficha.cargos='"+cargo+"'"
		if(campo != "0") qry += " AND paciente.campo="+campo
		if(estado != "NA") qry += " AND paciente.eliminado="+ estado
		if(grupo_sanguineo != "0") qry += " AND grupo_sanguineo.nombre_corto='"+grupo_sanguineo+"'"
		qry += " ORDER BY tipo_control.nombre, ficha.fecha ASC"
		sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
		.then(data => {
			res.json({error:false, data: data})
		})
		.catch(e => {
			res.json({error: true, message: e})
		});
	});

	router.route('/pacientes/alertas/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa } = req.params
		if(id_empresa){
			let qry = `SELECT "VACUNAS" AS nombre,COUNT(DISTINCT (pacvac.id)) AS cantidad FROM agil_medico_paciente_vacuna pacvac INNER JOIN agil_medico_vacuna vac ON vac.id=pacvac.id_vacuna AND vac.eliminado=FALSE INNER JOIN agil_medico_paciente pac ON pac.id=pacvac.id_paciente AND pac.eliminado=FALSE WHERE pac.empresa=${id_empresa} AND IF (siguiente_aplicacion IS NOT NULL,IF (( SELECT dias_anticipacion FROM agil_config_alertas WHERE id_empresa=${id_empresa} AND tipo="VACUNAS") IS NOT NULL,DATE_SUB(siguiente_aplicacion,INTERVAL ( SELECT dias_anticipacion FROM agil_config_alertas WHERE id_empresa=${id_empresa} AND tipo="VACUNAS") DAY)<=CURRENT_DATE,''),'') UNION SELECT "PREREQUISITOS" AS nombre,COUNT(t1.id) AS cantidad FROM agil_medico_paciente_prerequisito t1 INNER JOIN ( SELECT MAX( id ) max FROM agil_medico_paciente_prerequisito pacpre GROUP BY paciente, prerequisito ) t2 ON t1.id = t2.max AND t1.id = t2.max INNER JOIN agil_medico_prerequisito pre ON pre.id = t1.prerequisito INNER JOIN agil_medico_paciente paciente ON paciente.id=t1.paciente AND paciente.empresa=${id_empresa} AND paciente.eliminado=FALSE INNER JOIN gl_persona persona ON persona.id=paciente.persona WHERE  t1.fecha_vencimiento IS NOT NULL AND t1.asignado = TRUE AND t1.eliminado=FALSE AND pre.habilitado=true AND DATE_SUB(t1.fecha_vencimiento, INTERVAL (SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa=${id_empresa} AND cfg.tipo='PREREQUISITOS') DAY)<=CURRENT_DATE`
			sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
			.then(data => {
				if(data.length>0){
					let total = data.reduce((acc, val )=> acc+val.cantidad , 0)
					res.json({error:false, todas: data, total:total})
				}else{
					res.json({error:true, todas: data})
				}
			})
			.catch(e => {
				res.json({error: true, message: e})
			});
		}else{
			res.json({error:false, message: "ID empresa es requerido"});
		}
	});
	
	//guardar configuracion alertas
	router.route('/pacientes/alertas/config/:id_empresa')
	.post(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa } = req.params
		const { dias, tipo } = req.body
		if(id_empresa){
			ConfigAlertas.find({
				where: {
					id_empresa: id_empresa,
					tipo: tipo
				}
			})
			.then(result => {
				if(result){
					ConfigAlertas.update({
						dias_anticipacion: dias
					},{
						where:{
							id:result.id
						}
					})
					.then(data => res.json({error: false, datos: data}))
				}else{
					ConfigAlertas.create({
						id_empresa: id_empresa,
						dias_anticipacion: dias ? dias : 1,
						tipo:tipo
					})
					.then(data => res.json({error: false, datos: data}))
				}
			})
		}else{
			res.json({error:false, message: "ID empresa es requerido"});
		}
	});

	// Obtener una configuracion de alertas
	router.route('/pacientes/alertas/config/:id_empresa/:tipo')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa, tipo } = req.params
		if(id_empresa && tipo ){
			ConfigAlertas.findOne({
				where:{
					id_empresa,
					tipo
				}
			}).then(config => {
				res.json({ error:false, config:config})
			})
		}else{
			res.json({error:true, message: "ID empresa es requerido"});
		}
	});

	//Obtener paciente vacuna
	// Obtener una configuracion de alertas
	router.route('/pacientes/vacuna/paciente_vacuna/:id_paciente_vacuna')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_paciente_vacuna } = req.params
		if(id_paciente_vacuna){
			MedicoPacienteVacuna.findOne({
				where:{
					id: id_paciente_vacuna
				},
				include:[
					{model: MedicoVacuna, as: "pacienteVacuna", include: [ {model: VacunaDosis, as: "vacunaDosis"}]},
					{model: MedicoPacienteVacunaDosis, as: "pacienteVacunaDosis"},
					{model:MedicoPaciente, as:"paciente"}
				]
			}).then(vacuna => {
				res.json({ error:false, vacuna:vacuna})
			})
		}else{
			res.json({error:true, message: "ID requerido"});
		}
	});

	router.route('/pacientes/vacunas/lista/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa } = req.params
		if(id_empresa){
			MedicoVacuna.findAll({ where:{ id_empresa: id_empresa } })
			.then(vacunas => {
				res.json({ error:false, vacunas:vacunas})
			})
		}else{
			res.json({error:true, message: "ID empresa requerido"});
		}
	});
	

	router.route('/pacientes/vacuna/dosis/:id_vacuna')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_vacuna } = req.params
		if(id_vacuna){
			VacunaDosis.findAll({ 
				where:{ 
					id_vacuna: id_vacuna,
					eliminado: false
				} 
			})
			.then(dosis => {
				res.json({ error:false, dosis:dosis})
			})
		}else{
			res.json({error:true, message: "ID empresa requerido"});
		}
	});

	// GUARDAR UNA VACUNA
	router.route('/pacientes/vacunas/save')
	.post(ensureAuthorizedlogged, function (req, res) {
		const { id, nombre, observacion, unico , id_empresa, vacunaDosis, vacunaProductos } = req.body
		if(id){
			if(unico){
				MedicoVacuna.findById(id)
				.then(vacuna => {
					if(vacuna.unico != (unico ? 1: 0)){
						if(vacunaDosis.length > 1){
							res.json({error:false, message:"<b>No se pudo cambiar a vacuna de dosis única</b><br><p>La vacuna tiene configurada más de una dosis.</p><br>", typeMessage:"success"})
						}else{
							if(req.body.vacunaDosis.length==1){
								req.body.vacunaDosis[0].es_dosis = 1;
							}else{
								req.body.vacunaDosis = [{ es_dosis: 1, tiempo: 1, numero:1, eliminado: 0 }]
							} 
							editarVacunaDosis(req, res)
						}
					}else{
						editarVacunaDosis(req, res)
					}
				})
			}else{
				editarVacunaDosis(req, res)
			}
		}else{
			MedicoVacuna.create({
				nombre: nombre ? nombre : null,
				observacion: observacion ? observacion : null,
				unico: unico ? 1 : 0,
				eliminado: false,
				id_empresa: id_empresa ? id_empresa : null,
			}).then(function (vacuna) {
				vacunaDosis.forEach(function (dosis, index, array) {
					VacunaDosis.create({
						es_dosis: dosis.es_dosis,
						tiempo: dosis.tiempo,
						numero: dosis.numero,
						id_vacuna: vacuna.id,
						eliminado: false
					}).then(function (dosis_Creada) {
	
					})
				}, this);
				if(vacunaProductos.length>0){
					vacunaProductos.forEach(function (prod) {
						MedicoVacunaProducto.create({
							id_producto: prod.producto.id,
							id_vacuna: vacuna.id,
							eliminado: false
						}).then(function (prod_Creado) {
		
						})
					}, this);
				}
			}).then(function () {
				res.json({error:false, message:"<b>Vacuna creada</b>", typeMessage:"success"})
			})
			.catch(e => res.json({error:true, message:"<b>Error al guardar vacuna</b><br>"+e, typeMessage:"error"}))
		}
	})
	function editarVacunaDosis (req, res) {
		const { id, nombre, observacion, unico , id_empresa, vacunaDosis, vacunaProductos } = req.body
		MedicoVacuna.update({
			nombre: nombre ? nombre : null,
			observacion: observacion ? observacion : null,
			unico: unico ? 1 : 0,
		},{
			where:{id:id}
		}
		).then(function (vacuna) {
			vacunaDosis.forEach(function (dosis) {
				if(dosis.id){
					VacunaDosis.update({
						es_dosis: dosis.es_dosis,
						tiempo: dosis.tiempo,
						numero: dosis.numero,
					},{
						where: {id:dosis.id}
					})
					.then(function (dosis_Act) {})
					.catch(e => res.json({error:true, message:"<b>Error al editar dosis</b>", typeMessage:"error"}))
				}else{
					VacunaDosis.create({
						es_dosis: dosis.es_dosis,
						tiempo: dosis.tiempo,
						numero: dosis.numero,
						id_vacuna: id,
						eliminado: false
					})
					.then(async (dosis_Creada) => {
						let data = await VacunaDosis.findAll({ where:{ id_vacuna: id  }, order:[['id', 'desc']], limit: 2})
						if(data && data.length === 2){
							let current = JSON.parse(JSON.stringify(data[0]));
							let prev = JSON.parse(JSON.stringify(data[1]));
							let qry = `UPDATE agil_medico_paciente_vacuna mpv INNER JOIN agil_medico_paciente_vacuna_dosis pvd ON pvd.id_paciente_vacuna=mpv.id AND pvd.id_dosis=${prev.id} SET siguiente_aplicacion=IF(${current.es_dosis}=TRUE, DATE_ADD(mpv.ultima_aplicacion,INTERVAL ${current.tiempo} DAY), DATE_ADD(mpv.ultima_aplicacion,INTERVAL ${current.tiempo} MONTH) ) WHERE mpv.ultima_aplicacion IS NOT NULL`
							sequelize.query(qry, { type: sequelize.QueryTypes.UPDATE })
							.then(act => {

							})
							.catch(e => {
								res.json({error:true, message:"<b>Error al actualizar dosis</b>", typeMessage:"error"}
							)})

						}
					})
					.catch(e => res.json({error:true, message:"<b>Error al crear dosis</b>", typeMessage:"error"}))
				}
			}, this);
			if(vacunaProductos.length>0){
				vacunaProductos.forEach(function (prod) {
					if(prod.id){
						MedicoVacunaProducto.update({
							id_producto: prod.id_producto,
							id_vacuna: prod.id_vacuna,
							eliminado: prod.eliminado
						},{
							where: {id:prod.id}
						})
						.then(function (prod_Act) {})
						.catch(e => res.json({error:true, message:"<b>Error al editar producto</b>", typeMessage:"error"}))
					}else{
						MedicoVacunaProducto.create({
							id_producto: prod.producto.id,
							id_vacuna: id,
							eliminado: false
						})
						.then(function (prod_Creada) { })
						.catch(e => res.json({error:true, message:"<b>Error al crear producto</b>", typeMessage:"error"}))
					}
				}, this);
			}
		}).then(function () {
			res.json({error:false, message:"<b>Vacuna Editada</b>", typeMessage:"success"})
		})
		.catch(e => res.json({error:true, message:"<b>Error al editar vacuna</b><br>"+e, typeMessage:"error"}))
	}

	router.route('/pacientes/vacunas/delete/:id')
	.put(ensureAuthorizedlogged, function (req, res) {
		const { id } = req.params
		const { eliminado } = req.body
		MedicoVacuna.update({
			eliminado: eliminado
		},{
			where: { id:id}
		})
		.then( data => {
			res.json({error:false, message: eliminado ? "<b>Vacuna inhabilitada con éxito.</b>" : "<b>Vacuna restaurada con éxito.</b>", typeMessage:"success"})
		})
		.catch(e => res.json({error:true, message: eliminado ? "<b>Error al inhabilitar vacuna.</b><br>": "<b>Error al restaurar vacuna.</b><br>" +e, typeMessage:"error"}))
	})

	router.route('/pacientes/vacunas/delete/vacuna/:id_vacuna/dosis/:id_dosis')
	.put(ensureAuthorizedlogged, function (req, res) {
		const { id_vacuna, id_dosis } = req.params
		if(id_dosis){
			MedicoPacienteVacunaDosis.findAll({
				where: { id_dosis: id_dosis }
			})
			.then(result => {
				if(result.length > 0){
					res.json({error: true, message: "<b>No se puede eliminar la dosis.</b><br><p>Esta dosis ya fue aplicado a los pacientes.</p>", typeMessage:"error"})
				}else{
					VacunaDosis.update({
						eliminado: true
					},{
						where: { id:id_dosis}
					})
					.then( data => {
						res.json({error:false, message: "<b>Dosis eliminada con éxito.</b>", typeMessage:"success"})
					})
					.catch(e => res.json({error:true, message: "<b>Error al eliminar dosis.</b><br>"+e, typeMessage:"error"}))
				}
			})
		}else{
			res.json({error:true, message: "<b>Parámetros incorrectos</b><br>ID dosis es requerido.<br>" +e, typeMessage:"error"})
		}
	})

	router.route('/pacientes/vacunas/lista/:config/:id_empresa/:id_paciente')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { config, id_empresa, id_paciente } = req.params
		if(id_empresa && id_paciente){
			if(config == "1"){
				let qry = 'SELECT vacuna.id,vacuna.nombre,vacuna.unico,vacuna.observacion,vacuna.eliminado,IF(vacuna.id=alt.id_vacuna AND alt.eliminado=0, true, false) AS asignado,IF (alt.aplicado IS NULL,0,alt.aplicado) AS aplicado FROM agil_medico_vacuna vacuna LEFT JOIN (SELECT pacvac.*,EXISTS ( SELECT*FROM agil_medico_paciente_vacuna_dosis pacdos WHERE pacdos.id_paciente_vacuna=pacvac.id) AS aplicado FROM agil_medico_paciente_vacuna pacvac WHERE pacvac.id_paciente='+id_paciente+') AS alt ON vacuna.id=alt.id_vacuna WHERE vacuna.id_empresa='+id_empresa+' AND ((vacuna.eliminado=1 AND alt.aplicado=1) OR vacuna.eliminado=0)'
				sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
				.then(vacunas => {
					if(config) vacunas=vacunas.map(map=>{
						map.asignado = map.asignado==1 ? true : false;
						return map
					})
					res.json({error:false, vacunas: vacunas});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar vacunas del paciente</b><br>"+e, messageType:"error"}))
			}else{
				MedicoPacienteVacuna.findAll({
					where: { id_paciente: id_paciente, eliminado: false },
					include: [
						{ model: MedicoVacuna, as: 'pacienteVacuna', 
							include: [ { model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] } ] 
						}, 
						{ model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', where:{ eliminado: {$not: true }  }, required:false, 
							include:[{model: VacunaDosis, as: "dosis", required:false}]  
						}
					],
					order: [[{model: MedicoVacuna, as: 'pacienteVacuna'},'nombre', 'asc'],[{model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis'},'id','desc']],
				})
				.then(vacunas => {
					res.json({error:false, vacunas: vacunas});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar vacunas asignadas del paciente</b><br>"+e, messageType:"error"}))
				
			}
		}else{
			res.json({error:true, message: "Los IDs son requeridos", typeMessage:"error"});
		}
	});

	

	router.route('/pacientes/vacunas/aplicaciones/historial/:general/:id')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { general, id } = req.params
		if(id){
			if(general == "1"){
				MedicoPacienteVacuna.findAll({
					where:{ id_paciente: id},
					include: [{ model: MedicoVacuna, as: 'pacienteVacuna', include: [{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }] }, { model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', order: [['createdAt', 'desc']] }]
				})
				.then(historial => {
					res.json({error:false, historial: historial});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar historial del paciente</b><br>"+e, messageType:"error"}))
			}else{
				MedicoPacienteVacuna.findOne({
					where: { id: id },
					include: [{ model: MedicoVacuna, as: 'pacienteVacuna', include: [{ model: VacunaDosis, as: 'vacunaDosis', where: { eliminado: false }, order: [['numero', 'desc']] }] }, { model: MedicoPacienteVacunaDosis, as: 'pacienteVacunaDosis', order: [['createdAt', 'desc']] }]
				})
				.then(historial => {
					res.json({error:false, historial: historial});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar historial del paciente</b><br>"+e, messageType:"error"}))
			}
		}else{
			res.json({error:true, message: "El ID es requerido", typeMessage:"error"});
		}
	});
	

	router.route('/pacientes/prerequisito/:id')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id } = req.params
		if(id){
				MedicoPacientePreRequisito.findOne({
					where:{ id: id},
					include: [
						{ model: MedicoPaciente, as: 'pacientePrerequisito' },
						{ model: MedicoPrerequisito, as: 'preRequisito' }
					]
				})
				.then(paciente => {
					res.json({error:false, paciente: paciente});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar datos del paciente</b><br>"+e, messageType:"error"}))
		}else{
			res.json({error:true, message: "El ID es requerido", typeMessage:"error"});
		}
	});

	router.route('/pacientes/prerequisitos/reprogramacion')
	.put(ensureAuthorizedlogged, function (req, res) {
		const { id, fecha_reprogramada} = req.body
		MedicoPacientePreRequisito.update({
			fecha_vencimiento: fecha_reprogramada,
			reprogramado: 1
		},{
			where:{id:id}
		})
		.then(data => res.json({error:false, message:"Prerequisito reprogramado con éxito.", messageType:"success"}))
		.catch(e => res.json({error:false, message:"<b>No se pudo reprogramar el prerequisito.</b><br>"+e, messageType:"error"}))
	})

	router.route('/pacientes/prerequisitos/lista/:config/:id_empresa/:id_paciente/:inicio/:fin')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { config, id_empresa, id_paciente, inicio, fin } = req.params
		if(id_empresa && id_paciente){
			if(config == "1"){
				let qry = 'SELECT mepre.*,IF (asg.asignado,TRUE,FALSE) AS asignado FROM agil_medico_prerequisito mepre RIGHT JOIN ( SELECT precargo.prerequisito FROM agil_rrhh_empleado_ficha ficha INNER JOIN agil_rrhh_empleado_cargo empcargo ON empcargo.ficha=ficha.id INNER JOIN agil_rrhh_empleado_prerequisito_cargo precargo ON precargo.cargo=empcargo.cargo WHERE ficha.id_empleado='+id_paciente+' AND ficha.activo=TRUE GROUP BY precargo.prerequisito) AS apl ON apl.prerequisito=mepre.id LEFT JOIN ( SELECT DISTINCT pacpre.* FROM agil_medico_paciente_prerequisito pacpre WHERE pacpre.paciente='+id_paciente+' GROUP BY pacpre.prerequisito) AS asg ON asg.prerequisito=mepre.id ORDER BY mepre.nombre ASC'
				sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
				.then(prerequisitos => {
					if(config) prerequisitos=prerequisitos.map(map=>{
						map.asignado = map.asignado==1 ? true : false;
						return map
					})
					res.json({error:false, prerequisitos: prerequisitos});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar prerequisitos del paciente</b><br>"+e, messageType:"error"}))
			}else{
				let desde = inicio.split('/').reverse().join('-') + " 00:00:00"
				let hasta = fin.split('/').reverse().join('-') + " 23:59:59"
				let qry = "SELECT t1.*, pre.nombre nombre_prerequisito, pre.vencimiento_mes, pre.puede_modificar_rrhh FROM agil_medico_paciente_prerequisito t1 INNER JOIN ( SELECT MAX(id) max FROM agil_medico_paciente_prerequisito pacpre WHERE pacpre.paciente = "+id_paciente+" GROUP BY prerequisito ) t2 ON t1.id = t2.max AND t1.id = t2.max INNER JOIN agil_medico_prerequisito pre ON pre.id=t1.prerequisito WHERE (t1.asignado=FALSE AND t1.fecha_vencimiento IS NOT NULL) OR (t1.asignado=TRUE)"
				if(inicio != "0" && fin != "0") qry += " AND t1.fecha_entrega BETWEEN '"+desde+"' AND '"+hasta+"'"
				qry += " ORDER BY pre.nombre "
				sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
				.then(prerequisitos => {
					res.json({error:false, prerequisitos: prerequisitos});
				})
				.catch(e=>res.json({error:true, message:"<b>Error al recuperar preRequisitos asignadas del paciente</b><br>"+e, messageType:"error"}))
				
			}
		}else{
			res.json({error:true, message: "Los IDs son requeridos", typeMessage:"error"});
		}
	});

	router.route('/paciente/prerequisito/asignacion/:id_paciente/:id_prerequisito')
	.put(ensureAuthorizedlogged, function (req, res) {
		const { id_paciente, id_prerequisito} = req.params
		MedicoPacientePreRequisito.findAll({
			where:{paciente:id_paciente, prerequisito: id_prerequisito}, 
			raw:true
		})
		.then(result => {
			if(result.length>0){
				MedicoPacientePreRequisito.update({
					asignado: !result[0].asignado
				},{
					where:{ 
						id_paciente,
						id_prerequisito
					}
				})
				.then(data => {
					res.json({error:false, message:result[0].asignado ? 'Se inhabilitó el prerequisito para el paciente'  : 'Prerequisito asignado con éxito.', messageType:"success"})
				})
				.catch(e => res.json({error:true, message:"<b>Error al crear prerequisito para el paciente.</b><br>"+e, messageType:"error"}))
			}else{
				let hoy = new Date();
				MedicoPacientePreRequisito.create({
					id_paciente: id_paciente,
					id_prerequisito: id_prerequisito,
					fecha_entrega: hoy,
					eliminado: 0,
					asignado: 1
				})
				.then(data => {
					res.json({error:false, message:"Prerequisito asignado con éxito.", messageType:"success"})
				})
				.catch(e => res.json({error:true, message:"<b>Error al crear prerequisito para el paciente.</b><br>"+e, messageType:"error"}))
			}
		})
		.catch(e => res.json({error:true, message:"<b>No se pudo verificar el prerequisito del paciente.</b><br>"+e, messageType:"error"}))
	})

	router.route('/pacientes/prerequisitos/delete/:id')
	.put(ensureAuthorizedlogged, function (req, res) {
		const { id } = req.params
		if(id){
			MedicoPrerequisito.findById(id)
			.then(pre=>{
				MedicoPrerequisito.update({habilitado:!pre.habilitado},{where:{id:id}})
				.then(result=>{
					res.json({error: false, message:pre.habilitado ? 'Prerequisito inhabilitado' : 'Prerequisito habilitado', messageType:'success'})
				})
				.catch(e => res.json({error:true, message:"<b>No se pudo inhabilitar el prerequisito.</b><br>"+e, messageType:"error"}))
			})
			.catch(e => res.json({error:true, message:"<b>No se pudo obtener el prerequisito.</b><br>"+e, messageType:"error"}))
		}else{
			res.json({error: true, message:'Parámetros incorrectos', messageType:'error'})
		}
	})

	router.route('/pacientes/prerequisitos/reporte/empresa/:id_empresa/:prerequisito/:epre/:cargo/:ecargo')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa, prerequisito, epre, cargo, ecargo } = req.params
		if(id_empresa){
			let qry = `SELECT pre.nombre AS prerequisito, pre.habilitado AS pre_activo, cargo.nombre AS cargo, cargo.habilitado AS cargo_habilitado, cargo.eliminado AS cargo_eliminado, pre.vencimiento_mes  FROM agil_rrhh_empleado_prerequisito_cargo peca INNER JOIN agil_medico_prerequisito pre ON pre.id=peca.prerequisito INNER JOIN gl_clase cargo ON cargo.id=peca.cargo WHERE pre.id_empresa=${id_empresa}`
			if(prerequisito != "0") qry += ` AND pre.id=${prerequisito}`
			if(cargo != "0") qry += ` AND cargo.id=${cargo}`
			if(epre != "TODOS") qry += ` AND pre.habilitado=${epre}`
			if(ecargo != "TODOS") qry += ` AND cargo.habilitado=${ecargo}`
			qry += ` ORDER BY pre.nombre ASC,cargo.nombre ASC`

			sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
			.then(preq=>{
				res.json({error: false, datos:preq, message:"ok", messageType:'success'})
			})
			.catch(e => res.json({error:true, message:"<b>No se pudo obtener el prerequisito.</b><br>"+e, messageType:"error"}))
		}else{
			res.json({error: true, message:'Parámetros incorrectos', messageType:'error'})
		}
	})

	
	router.route('/pacientes/prerequisitos/reporte/campos/:tipo/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa, tipo } = req.params
		if(id_empresa && tipo){
			Tipo.findOne({
				where: { nombre_corto: tipo, empresa: id_empresa },
				include: [{
					model: Clase, as: 'clases'
				}]
			})
			.then(data=>res.json({error:false, campos: data.clases}))
			.catch(e=>res.json({false: true, message:"Error al recuperar campos", messageType:"error"}))
		}else{
			res.json({error: true, message:'Parámetros incorrectos', messageType:'error'})
		}
	})

	router.route('/pacientes/prerequisitos/reportes/:id_empresa/:inicio/:fin/:eempleado/:prerequisito/:cargo/:campo/:epre/:ecargo/:ecampo/:id_paciente')
	.get(ensureAuthorizedlogged, function (req, res) {
		const { id_empresa, inicio, fin, eempleado, prerequisito, cargo, campo, epre, ecargo, ecampo, id_paciente } = req.params
		if(id_empresa){
			let qry = 'SELECT mpp.id id_paciente, prerequisitos.id_prerequisito, pacientes.nombre_completo,pacientes.eliminado,pacientes.cargo,pacientes.cargo_principal,pacientes.estado_cargo,pacientes.campo,pacientes.estado_campo,prerequisitos.nombre_prerequisito,prerequisitos.habilitado estado_prerequisito,mpp.fecha_inicio fecha_emision,mpp.fecha_entrega,mpp.fecha_vencimiento,prerequisitos.vencimiento_mes,mpp.observacion,mpp.documento FROM agil_medico_paciente_prerequisito mpp INNER JOIN (SELECT mepre.id id_prerequisito,precar.cargo id_cargo,mepre.nombre nombre_prerequisito,mepre.vencimiento_mes,mepre.habilitado FROM agil_medico_prerequisito mepre INNER JOIN agil_rrhh_empleado_prerequisito_cargo precar ON mepre.id=precar.prerequisito WHERE mepre.id_empresa='+id_empresa+') prerequisitos ON prerequisitos.id_prerequisito=mpp.prerequisito INNER JOIN ( SELECT per.id id_persona,p.id id_paciente,ef.id id_ficha,per.nombre_completo,p.eliminado,cargos.id id_carg,cargos.nombre cargo,cargos.principal cargo_principal,cargos.habilitado AS estado_cargo, campo.id AS id_campo, campo.nombre campo,campo.habilitado estado_campo FROM agil_medico_paciente p INNER JOIN gl_persona per ON per.id=p.persona INNER JOIN agil_rrhh_empleado_ficha ef ON ef.id=( SELECT f.id FROM agil_rrhh_empleado_ficha f WHERE f.id_empleado=p.id ORDER BY f.id DESC LIMIT 1) INNER JOIN ( SELECT ec.principal, ec.ficha,cargo.*FROM agil_rrhh_empleado_cargo ec INNER JOIN gl_clase cargo ON cargo.id=ec.cargo) AS cargos ON cargos.ficha=ef.id INNER JOIN gl_clase campo ON campo.id=p.campo WHERE p.empresa='+id_empresa+') pacientes ON pacientes.id_paciente=mpp.paciente WHERE mpp.fecha_vencimiento IS NOT NULL AND prerequisitos.id_cargo=pacientes.id_carg'

			if((inicio != "0" && inicio.length==10) && ( fin != "0" && fin.length==10)) {
				let desde = inicio.split('/').reverse().join('-') + " 00:00:00"
				let hasta = fin.split('/').reverse().join('-') + " 23:59:59"
				qry += ' AND mpp.fecha_entrega BETWEEN "'+ desde +'" AND "'+ hasta +'"'
			}
			if(id_paciente != "0"){
				qry += ` AND pacientes.id_paciente=${id_paciente}`
			}else{
				if(eempleado != "TODOS") qry += ` AND pacientes.eliminado=${eempleado}`
				if(prerequisito != "0") qry += ' AND mpp.prerequisito='+prerequisito
				if(cargo != "0") qry += ` AND pacientes.id_carg=${cargo}`
				if(campo != "0") qry += ` AND pacientes.id_campo=${campo}`
				if(epre != "TODOS") qry += ` AND prerequisitos.habilitado=${epre}`
				if(ecargo != "TODOS") qry += ` AND pacientes.estado_cargo=${ecargo}`
				if(ecampo != "TODOS") qry += ` AND pacientes.estado_campo=${ecargo}`
			}
			qry += ' GROUP BY prerequisitos.id_prerequisito, prerequisitos.id_cargo, mpp.id ORDER BY pacientes.nombre_completo ASC'
			sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
			.then(preq=>{
				res.json({error: false, datos:preq, message:"ok", messageType:'success'})
			})
			.catch(e => res.json({error:true, message:"<b>Error al obtener registros.</b><br>"+e, messageType:"error"}))
		}else{
			res.json({error: true, message:'Parámetros incorrectos', messageType:'error'})
		}
	})
	
	///// INICIO CONFIGURACION VACUNA PRODUCTO
	router.route('/pacientes/vacuna/producto/config/:id_empresa')
	///// GUARDAR CONFIGURACION VACUNA PRODUCTO
	.post(ensureAuthorizedlogged, async function (req, res) {
		const { grupo, subgrupo, id_empresa } = req.body
		if( grupo && subgrupo && id_empresa ){
			try {
				let config = await ConfigVacunaProducto.findOne({ where: { id_grupo:grupo, id_subgrupo: subgrupo, id_empresa:id_empresa }, raw: true})
				if(!config){
					let result = await ConfigVacunaProducto.create({
						id_grupo: grupo,
						id_subgrupo: subgrupo,
						id_empresa: id_empresa,
						eliminado: false
					})
					res.json({error: false, message:"<b>Configuración guardada.</b>", messageType:"success"})
				}else{
					config.eliminado ? 
						res.json({error: true, message:'<b>Ya existe la configuración</b><p><small>La configuración es encuentra inactivado, pruebe activandolo.</small></p>', messageType:'error'}) : 
						res.json({error: true, message:'<b>Ya existe la configuración</b>', messageType:'error'})
				}
			} catch (error) {
				res.json({error: true, message:'<b>Ocurrió un error al guardar</b>'+error, messageType:'error'})
			}
		}else{
			res.json({error: true, message:'Parámetros incorrectos', messageType:'error'})
		}
	})

	/// OBTENER CONFIGURACION VACUNA PRODUCTO
	.get(ensureAuthorizedlogged, async function (req, res) {
		const { id_empresa } = req.params
		if(id_empresa){
			try {
				let configs = await ConfigVacunaProducto.findAll({ 
					include: [
						{ model: Clase, as: 'grupoConfig'},
						{model: Clase, as: 'subgrupoConfig'}
					],
					where: { id_empresa: id_empresa },
				})
					res.json({ error: false, configs: configs, message:"<b>Datos recuperados con éxito.</b>", messageType:"success" })
			} catch (error) {
				res.json({ error: true, message:'<b>Ocurrió un error al guardar</b>'+error, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'Parámetros incorrectos', messageType:'error' })
		}
	})

	// ELIMINAR CONFIGURACION VACUNA PRODUCTO
	.put(ensureAuthorizedlogged, async function (req, res) {
		const { id_empresa: id } = req.params
		const { eliminar } = req.body
		if(id){
			try {
				await ConfigVacunaProducto.update({ eliminado: eliminar },{where: { id: id } })
				res.json({ error: false,  message:"<b>Configuración eliminada.</b>", messageType:"success" })
			} catch (error) {
				res.json({ error: true, message:'<b>Ocurrió un error al eliminar</b>'+error, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'Parámetros incorrectos', messageType:'error' })
		}
	})

	///// FIN CONFIGURACION VACUNA PRODUCTO


 /// INICIO VACUNA PRODUCTOS
	/// LISTA PRODUCTOS - VACUNAS
	router.route('/pacientes/vacuna/producto/lista/:id_empresa')
	.get(ensureAuthorizedlogged, async function (req, res) {
		const { id_empresa } = req.params
		if(id_empresa){
			try {
				let cats = await sequelize.query(`SELECT GROUP_CONCAT( DISTINCT id_grupo SEPARATOR ',') AS grupos, GROUP_CONCAT( DISTINCT id_subgrupo SEPARATOR ',') AS subgrupos FROM agil_config_vacuna_producto WHERE id_empresa = ${id_empresa} AND eliminado=false`, { type: sequelize.QueryTypes.SELECT })
				if(cats[0]){
					let prods = await sequelize.query(`SELECT prod.id, prod.nombre FROM agil_producto prod WHERE prod.empresa=${id_empresa} AND prod.grupo IN (${cats[0].grupos}) AND prod.subgrupo IN (${cats[0].subgrupos})`, { type: sequelize.QueryTypes.SELECT })
					res.json({ error: false, productos: prods, message:"<b>Datos recuperados con éxito.</b>", messageType:"success" })
				}else{
					res.json({ error: false, productos: [], message:"<b>No se puedieron localizar los grupos y subgrupos de los productos.</b>", messageType:"success" })
				}
			} catch (error) {
				res.json({ error: true, message:'<b>Ocurrió un error al guardar</b>'+error, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'Parámetros incorrectos', messageType:'error' })
		}
	})
	/// OBTIENE LOS PRODUCTOS DE UNA VACUNA
	router.route('/pacientes/vacuna/producto/:id')
	.get(ensureAuthorizedlogged, async function (req, res) {
		const { id } = req.params
		if(id){
			try {
				let prods = await MedicoVacunaProducto.findAll({ 
					include:[{model: Producto , as:'producto', attributes: ['id', 'nombre']}],
					where: { id_vacuna: id }
				})
				res.json({ error: false, productos: prods, message:"<b>Productos recuperados con éxito.</b>", messageType:"success" })
			} catch (error) {
				res.json({ error: true, message:'<b>Ocurrió un error al obtener productos</b>'+error, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'Parámetros incorrectos', messageType:'error' })
		}
	})

	
	router.route('/pacientes/vacuna/productos/:id')
	//ELIMINAR PRODUCTO DE VACUNA
	.put(ensureAuthorizedlogged, async function (req, res) {
		const {  id } = req.params
		const { eliminado } = req.body
		if(id){
			try {
				await MedicoVacunaProducto.update({ eliminado: !eliminado },{where: { id: id } })
				res.json({ error: false,  message:"<b>Producto eliminado.</b>", messageType:"success" })
			} catch (error) {
				res.json({ error: true, message:'<b>Ocurrió un error al eliminar</b>'+error, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'Parámetros incorrectos', messageType:'error' })
		}
	})

	/// OBTIENE EMPLEADOS Y SUS VACUNAS A APLICARSE EN FUNCION AL FILTRO
	router.route('/pacientes/vacunas/proyeccion/:id_empresa')
	.get(ensureAuthorizedlogged, async function (req, res) {
		const { id_empresa } = req.params
		if( id_empresa ){
			try {
				let query = `SELECT DISTINCT
						( pacvac.id ),
						pac.id AS id_paciente,
						vac.id AS id_vacuna,
						persona.nombre_completo,
						campo.nombre as campo,
						vac.nombre,
						vac.eliminado AS estado_vacuna,
						pacvac.ultima_aplicacion,
						pacvac.siguiente_aplicacion 
					FROM
						agil_medico_paciente_vacuna pacvac
						INNER JOIN agil_medico_paciente pac ON pac.id = pacvac.id_paciente
						LEFT JOIN gl_clase campo ON campo.id=pac.campo
						INNER JOIN gl_persona persona ON persona.id = pac.persona
						INNER JOIN agil_medico_vacuna vac ON vac.id = pacvac.id_vacuna 
					WHERE
						pac.empresa = ${id_empresa} 
						AND vac.unico = FALSE 
						AND pac.eliminado = FALSE 
						AND pacvac.siguiente_aplicacion IS NOT NULL 
						AND DATE_SUB(
							pacvac.siguiente_aplicacion,
							INTERVAL ( SELECT cfg.dias_anticipacion FROM agil_config_alertas cfg WHERE cfg.id_empresa = ${ id_empresa } AND cfg.tipo = 'VACUNAS' ) DAY 
						)<= CURRENT_DATE 
					ORDER BY pacvac.siguiente_aplicacion ASC`
				let registros = await sequelize.query(query,{ type: sequelize.QueryTypes.SELECT })
				let vacunas = registros.reduce((acc, val) => {
					let idx = acc.findIndex(el => el.id == val.id_vacuna)
					if( idx == - 1){
						acc.push({id:val.id_vacuna, nombre:val.nombre, cantidad: 1, seleccionado:{}, valuar:true})
					}else{
						acc[idx].cantidad = acc[idx].cantidad + 1;
					}
					return acc 
				}, [])
				// Recuperar productos y su precio desde detalle movimiento donde clase sea ID, IPI
				for (let i = 0; i < vacunas.length; i++) {
					const vacuna = vacunas[i];
					let productos = await MedicoVacunaProducto.findAll({
						where: {id_vacuna: vacuna.id},
						include: [
							{ model:Producto, as:'producto', required: false, attributes: 
								['id','nombre',[
									sequelize.literal('(SELECT dm.costo_unitario FROM inv_detalle_movimiento dm INNER JOIN inv_movimiento m ON m.id=dm.movimiento INNER JOIN gl_clase c  ON c.id=m.clase WHERE c.nombre_corto IN ("ID","IPI") AND dm.producto=`producto`.`id` ORDER BY dm.id DESC LIMIT 1)'), 'costo'
								]]
							}
						]
					})
					vacunas[i].productos = productos
					if(productos.length > 0 ) vacunas[i].seleccionado = productos[0]
				}
				res.json({ error: false, registros: registros, vacunas: vacunas })
			} catch (e) {
				res.json({ error: true, message:'<b>Error al obtener empleados y vacunas</b><br>'+e, messageType:'error' })
			}
		}else{
			res.json({ error: true, message:'<b>Parámetros incorrectos</b>', messageType:'error' })
		}
	})

	// OBTIENE UNO O TODOS LOS LABORATORIOS PRACTICADOS A UN PACIENTE
	router.route('/pacientes/laboratorio/reportes/:id_paciente/:id_examen')
	.get( async (req,res) => {
		const { id_paciente, id_examen } = req.params
		examen = Number(id_examen)
		if(!id_paciente) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
		try {
			let data = await MedicoPaciente.findOne({
				where: { id: id_paciente },
				attributes:['codigo','id','id_persona'],
				include: [
					{ model: Persona, as: "persona", attributes: ['nombre_completo','ci']},
					{ model: MedicoLaboratorioPaciente, as:"pacienteLaboratorios", required:false, where: { id_laboratorio: examen? examen : {$ne: null} },
						include: [ { model:MedicoLaboratorio , as: "laboratorio"}, { model: MedicoLaboratorioResultado, as:"laboratorioResultados", include: [{ model:MedicoLaboratorioExamen,as:"laboratorioExamen" } ]}]
					}
				]
			})
			res.json({ error: false, data:data, message:"Datos recuperados satisfactoriamente", messageType:"success" })
		} catch (e) {
			res.json({ error: true, message:'<b>Ocurrió un error</b><br>'+e, messageType:'error' })
		}
	})
	
	// OBTIENE UNO O TODOS LOS LABORATORIOS PRACTICADOS A UN PACIENTE
	router.route('/pacientes/consulta/reportes/:id_paciente')
	.get( async (req,res) => {
		const { id_paciente } = req.params
		if(!id_paciente) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
		try {
			let data = await MedicoPaciente.findOne({
				where: { id: id_paciente },
				attributes:['codigo','id','id_persona'],
				include: [
					{ model: Persona, as: "persona", attributes: ['nombre_completo','ci']},
					{ model: MedicoPacienteConsulta, as:"consultas", required:false }
				]
			})
			res.json({ error: false, data:data, message:"Datos recuperados satisfactoriamente", messageType:"success" })
		} catch (e) {
			res.json({ error: true, message:'<b>Ocurrió un error</b><br>'+e, messageType:'error' })
		}
	})

	// OBTIENE UNO O TODOS LOS DIAGNOSTICOS PRACTICADOS A UN PACIENTE
	router.route('/pacientes/diagnostico/reportes/:id_paciente/:id_examen')
	.get( async (req,res) => {
		const { id_paciente, id_examen } = req.params
		examen = Number(id_examen)
		if(!id_paciente) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
		try {
			let data = await MedicoPaciente.findOne({
				where: { id: id_paciente },
				attributes:['codigo','id','id_persona'],
				include: [
					{ model: Persona, as: "persona", attributes: ['nombre_completo','ci']},
					{ model: MedicoDiagnosticoPaciente, as:"diagnosticos", required:false, where: { id_diagnostico: examen? examen : {$ne: null} },
						include: [ { model:MedicoDiagnostico , as: "diagnostico"}, { model: MedicoDiagnosticoResultado, as:"diagnosticoResultados", include: [{ model:MedicoDiagnosticoExamen,as:"diagnosticoExamen" } ]}]
					}
				]
			})
			res.json({ error: false, data:data, message:"Datos recuperados satisfactoriamente", messageType:"success" })
		} catch (e) {
			res.json({ error: true, message:'<b>Ocurrió un error</b><br>'+e, messageType:'error' })
		}
	})
	
	// OBTIENE UNO O TODOS LOS DIAGNOSTICOS PRACTICADOS A UN PACIENTE
	router.route('/paciente/reportes/general/:id_empresa/:id_tipo/:inicio/:fin/:nombres/:cargo/:campo/:estado/:formato/:tipo')
	.get( async (req,res) => {
		const { id_empresa, id_tipo, inicio, fin, nombres, cargo, campo, estado, formato, tipo } = req.params
		if(!(id_empresa && formato!="0" && tipo!="0")) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
		try {
			let tipo_reporte = Number(tipo);
			if(tipo_reporte>3) return res.json({ error: true, message:'<b>Tipo desconocido</b><br>', messageType:'error' })
			if(tipo_reporte === 1){
				if(formato === "1"){

					res.json({ error: false, data:[], message:"Laboratorios pdf recuperados satisfactoriamente", messageType:"success" })
				}else{
					let qry = `SELECT p.nombre_completo, p.ci, ext.nombre_corto AS extension, mp.cargo, campo.nombre AS campo, labpac.fecha, ml.nombre AS laboratorio, labex.examen, labres.resultado, labex.unidad, labex.minimo, labex.maximo, mp.eliminado
					FROM agil_medico_laboratorio_resultado labres
					INNER JOIN agil_medico_laboratorio_paciente labpac ON labpac.id=labres.laboratorio_paciente
					INNER JOIN agil_medico_laboratorio_examen labex ON labex.id=labres.laboratorio_examen
					INNER JOIN agil_medico_paciente mp ON mp.id=labpac.paciente
					INNER JOIN agil_medico_laboratorio ml ON ml.id=labpac.laboratorio
					INNER JOIN gl_persona p ON p.id=mp.persona
					INNER JOIN gl_clase ext ON ext.id=mp.extension
					INNER JOIN gl_clase campo ON campo.id=mp.campo
					WHERE ml.empresa=${ id_empresa }`
					if(nombres != "0") qry += ` AND p.nombre_completo LIKE "%${ nombres }%"`
					if(id_tipo != "0") qry += ` AND ml.id=${ id_tipo }`
					if(inicio != "0" && fin != "0"){
						qry += ` AND labpac.fecha BETWEEN "${ inicio }" AND "${ fin }"`
					}else{
						if(inicio != "0") qry += ` AND labpac.fecha >= "${ inicio }"`
						if(fin != "0") qry += ` AND labpac.fecha <= "${ fin }"`
					}
					if(cargo != "0") qry += ` AND mp.cargo="${ cargo }"`
					if(campo != "0") qry += ` AND campo.id=${ campo }`
					if(estado != "NA") qry += ` AND mp.eliminado=${estado}`

					qry+=` ORDER BY p.nombre_completo ASC, labex.id ASC, labpac.fecha ASC`
					let datos = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
					res.json({ error: false, data:datos, message:"Laboratorios excel recuperados satisfactoriamente", messageType:"success" })
				}
			}
			if(tipo_reporte === 2){
				if(formato === "1"){

					res.json({ error: false, data:[], message:"Consultas recuperados satisfactoriamente", messageType:"success" })
				}else{
					let qry = `SELECT p.nombre_completo,p.ci,ext.nombre_corto AS extension,mp.eliminado,mp.cargo,campo.nombre AS campo,pc.fecha,pc.presion,pc.pulso,pc.talla,pc.peso,pc.temperatura,pc.frecuencia_respiratoria,pc.frecuencia_cardiaca,pc.indice_masa_corporal,pc.subjetivo,pc.objetivo,pc.analitico,pc.plan,pc.evolucion,pc.nervioso_central,pc.sentidos,pc.cardiovascular,pc.respiratorio,pc.gastrointestinal,pc.genitourinario,pc.locomotor,pc.piel FROM agil_medico_paciente_consulta pc INNER JOIN agil_medico_paciente mp ON mp.id=pc.id_paciente INNER JOIN gl_persona p ON p.id=mp.persona LEFT JOIN gl_clase campo ON campo.id=mp.campo LEFT JOIN gl_clase ext ON ext.id=mp.extension WHERE mp.empresa=${id_empresa}`
					if(nombres != "0") qry += ` AND p.nombre_completo LIKE "%${ nombres }%"`
					if(inicio != "0" && fin != "0"){
						qry += ` AND pc.fecha BETWEEN "${ inicio }" AND "${ fin }"`
					}else{
						if(inicio != "0") qry += ` AND pc.fecha >= "${ inicio }"`
						if(fin != "0") qry += ` AND pc.fecha <= "${ fin }"`
					}
					if(cargo != "0") qry += ` AND mp.cargo="${ cargo }"`
					if(campo != "0") qry += ` AND campo.id=${ campo }`
					if(estado != "NA") qry += ` AND mp.eliminado=${estado}`
					qry += ` ORDER BY p.nombre_completo ASC,pc.fecha ASC`
					let datos = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
					res.json({ error: false, data:datos, message:"Consultas excel recuperados satisfactoriamente", messageType:"success" })
				}
			}
			if(tipo_reporte === 3){
				if(formato === "1"){

					res.json({ error: false, data:[], message:"Diagnósticos recuperados satisfactoriamente", messageType:"success" })
				}else{
					let qry = `SELECT p.nombre_completo,p.ci,ext.nombre_corto AS extension,mp.cargo,campo.nombre AS campo,dipac.fecha,md.nombre AS diagnostico,diex.examen,dires.resultado, dires.estadistica,diex.unidad,diex.minimo,diex.maximo,mp.eliminado FROM agil_medico_diagnostico_resultado dires INNER JOIN agil_medico_diagnostico_paciente dipac ON dipac.id=dires.laboratorio_paciente INNER JOIN agil_medico_diagnostico_examen diex ON diex.id=dires.laboratorio_examen INNER JOIN agil_medico_paciente mp ON mp.id=dipac.paciente INNER JOIN agil_medico_diagnostico md ON md.id=dipac.diagnostico INNER JOIN gl_persona p ON p.id=mp.persona INNER JOIN gl_clase ext ON ext.id=mp.extension INNER JOIN gl_clase campo ON campo.id=mp.campo WHERE md.empresa=${id_empresa}`
					if(nombres != "0") qry += ` AND p.nombre_completo LIKE "%${nombres}%"`
					if(id_tipo != "0") qry += ` AND md.id=${id_tipo}`
					if(inicio != "0" && fin != "0"){
						qry += ` AND dipac.fecha BETWEEN "${inicio}" AND "${fin}"`
					}else{
						if(inicio != "0") qry +=` AND dipac.fecha >= "${inicio}"`
						if(fin != "0") qry +=` AND dipac.fecha <= "${fin}"`
					}
					if(cargo != "0") qry +=` AND mp.cargo="${cargo}"`
					if(campo != "0") qry +=` AND campo.id=${campo}`
					if(estado != "NA") qry +=` AND mp.eliminado=${campo}`
					qry += ` ORDER BY p.nombre_completo ASC, diex.id ASC, dipac.fecha ASC`

					let datos = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
					res.json({ error: false, data:datos, message:"Diagnósticos excel recuperados satisfactoriamente", messageType:"success" })
				}
			}
		} catch (e) {
			res.json({ error: true, message:'<b>Ocurrió un error</b><br>'+e, messageType:'error' })
		}
	})

	// ELIMINA RESULTADOS DE LABORATORIO, CONSULTA O DIAGNOSTICO PRACTICADOS A UN PACIENTE
	router.route('/pacientes/resultados/historico/:id/:tipo')
	.put( async (req, res) => {
		const { id, tipo } = req.params
		if(!id && !tipo) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
		try {
			if(tipo>3) return res.json({ error: true, message:'<b>Tipo desconocido</b><br>', messageType:'error' })
			if(tipo == 3){
				MedicoDiagnosticoPaciente.destroy({where: {id:id }})
				.then(del => {
					MedicoDiagnosticoResultado.destroy({where:{ id_diagnostico_paciente: id }})
					.then(el => res.json({error:false, message:"Histórico eliminado con éxito", messageType:"success"}) )
					.catch(e=>res.json({error: true, message:"<b>Error al eliminar histórico</b><br>"+e, messageType:"error"}))
				})
				.catch(e=>res.json({error: true, message:"<b>Error al eliminar histórico</b><br>"+e, messageType:"error"}))
			}
		} catch (e) {
			res.json({error: true, message:"<b>Error al eliminar histórico</b><br>"+e, messageType:"error"})
		}
	})
}