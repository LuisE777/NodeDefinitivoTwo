module.exports = function (router, sequelize, Sequelize, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, decodeBase64Image, fs, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad
    , RrhhEmpleadoCargo, RrhhEmpleadoHojaVida, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, NumeroLiteral, RrhhEmpleadoPrestamo, RrhhEmpleadoPrestamoPago, RrhhEmpleadoRolTurno, RrhhEmpleadoHorasExtra, RrhhAnticipo,
    EvaluacionPolifuncional, ConfiguracionCalificacionEvaluacionPolifuncional, ConfiguracionDesempenioEvaluacionPolifuncional, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhEmpleadoCompensacionAusencia, RrhhFeriado, RrhhClaseAsuencia, RrhhEmpleadoConfiguracionVacacion, RrhhEmpleadoHistorialVacacion, RrhhEmpleadoTr3, RrhhEmpleadoAnticipoTr3, Banco, RrhhEmpleadoDeduccionIngreso,
    RrhhEmpleadoBeneficioSocial, RrhhEmpleadoBitacoraFicha, RrhhEmpleadoConfiguracionRopa, Producto, Inventario, RrhhEmpleadoDotacionRopaItem, RrhhEmpleadoDotacionRopa, RrhhViajeDetalle, RrhhViaje, RrhhViajeDestino, RrhhViajeConductor, Movimiento, DetalleMovimiento, Almacen, RrhhEmpleadoDescuentoVacacionHistorial, RrhhEmpleadoPrerequisitoCargo, MedicoPrerequisito, ensureAuthorizedlogged, RrhhEmpresaCargaHorario,
    RrhhEmpleadoDocumentoFamiliar, RrhhEmpleadoHoraExtraOrdinaria, MedicoPacienteFicha, RRHHDetallePlanillaSueldos, MedicoPacientePreRequisito, RrhhEmpleadoConfiguracionSubsidio, RRHHParametros, RrhhEmpleadoRolTurnoNoche, RrhhEmpleadoPlanificacionSubsidio,
    RrhhEmpleadoCampamentoEmpleado, RrhhEmpleadoSeguimientoSubsidio, RrhhEmpleadoSolicitudVacacion, RrhhEmpleadoOtrosBonos, RrhhEmpleadoLlamadaAtencion, ConfiguracionIso, CorrelativosEmpresa, ContabilidadCuenta, ConfiguracionIsoEmpresa) {
    router.route('/recursos-humanos/campamento-empleados/campamento/:id_campamento')
        .get(async function (req, res) {
            var data = await RrhhEmpleadoCampamentoEmpleado.find({
                include: [{
                    model: Clase, as: 'campo'
                }],
                where: { eliminado: false, id_campo: req.params.id_campamento }
            })
            res.json({ campamento: data })
        })
    router.route('/recursos-humanos/campamento-empleados/empresa/:id_empresa')
        .get(async function (req, res) {
            var data = await RrhhEmpleadoCampamentoEmpleado.findAll({
                include: [{
                    model: Clase, as: 'campo',
                    include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
                }],
                where: { eliminado: false }
            })
            res.json({ campamentos: data })
        })
        .post(async function (req, res) {
            var i = 0
            for (const camp of req.body.campamentosEmpleados) {
                if (camp.eliminado) {
                    var campDelete = await RrhhEmpleadoCampamentoEmpleado.update({
                        eliminado: true
                    }, { where: { id: camp.id } })
                } else if (camp.id && camp.edit == true) {
                    var campUpdate = await RrhhEmpleadoCampamentoEmpleado.update({
                        id_campo: camp.campo.id,
                        comensales: camp.comensales
                    }, { where: { id: camp.id } })
                } else if (!camp.id) {
                    var campCreate = await RrhhEmpleadoCampamentoEmpleado.create({
                        id_campo: camp.campo.id,
                        comensales: camp.comensales,
                        eliminado: camp.eliminado
                    })
                }
                i++
                if (i === (req.body.campamentosEmpleados.length)) {
                    res.json({ mensaje: "Registro Actualizado Satisfactoriamente!" })
                }
            }

        })

    router.route('/recursos-humanos-vacas/empresa/:id_empresa/ficha/:id_ficha')
        .get(function (req, res) {
            RrhhEmpleadoFicha.findAll({
                where: { id: id_ficha },
                include: [{ model: MedicoPaciente, as: 'empleado', where: { empresa: req.params.id_empresa } }, { model: RrhhEmpleadoVacaciones, as: 'vacaciones', required: true, where: { eliminado: false } }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones', required: true }],
                order: [[{ model: RrhhEmpleadoVacaciones, as: 'vacaciones' }, 'fecha_inicio', 'asc'], [{ model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' }, 'id', 'asc']]
            }).then(async function (fichas) {
                var cont = 0
                for (let i = 0; i < fichas.length; i++) {
                    const ficha = fichas[i]
                    for (let index = 0; index < ficha.historialVacaciones.length; index++) {
                        const historial = ficha.historialVacaciones[index];

                        for (const vacacion of ficha.vacaciones) {
                            vacacion.dias = parseFloat(vacacion.dias)
                            var restantes = historial.aplicadas - historial.tomadas
                            if (restantes > 0 && vacacion.dias > 0) {

                                var vaca = await RrhhEmpleadoVacaciones.update({
                                    dias_restante: restantes - vacacion.dias,
                                }, {
                                    where: { id: vacacion.id }
                                })
                                console.log("vaca:", vaca.dataValues)
                                if (vacacion.dias <= restantes) {
                                    historial.tomadas = historial.tomadas + vacacion.dias
                                    vacacion.dias = 0
                                } else {
                                    historial.tomadas = historial.tomadas + restantes
                                    vacacion.dias = vacacion.dias - restantes
                                }
                                var vaca = await RrhhEmpleadoHistorialVacacion.update({
                                    tomadas: historial.tomadas
                                }, {
                                    where: { id: historial.id }
                                })
                                console.log("vacacion:", vaca.dataValues)
                                var histo = await RrhhEmpleadoDescuentoVacacionHistorial.create({
                                    id_vacacion: vacacion.id,
                                    id_historial_vacacion: ficha.historialVacaciones[index].id
                                })
                                console.log("historial:", histo.dataValues)
                            }
                        }
                    }
                    cont++
                    if (i === (fichas.length - 1)) {
                        res.json({ mensaje: "actualizados 1" })
                    }
                }

            })
        })
    router.route('/recursos-humanos/rol-turno-noche/:id_rol_turno/:id_tipo')
        .post(async function (req, res) {
            var i = 0
            for (const rolTurnoNoche of req.body.rolesTurnosNoche) {
                if (rolTurnoNoche.eliminado) {
                    var rolNocturnoEliminado = await RrhhEmpleadoRolTurnoNoche.update({
                        eliminado: rolTurnoNoche.eliminado
                    },
                        {
                            where: { id: rolTurnoNoche.id }
                        })
                } else if (rolTurnoNoche.id && rolTurnoNoche.editar) {
                    var rolNocturnoActualizado = await RrhhEmpleadoRolTurnoNoche.update({
                        fecha_inicio: rolTurnoNoche.fecha_inicio,
                        fecha_fin: rolTurnoNoche.fecha_fin,
                        comentario: rolTurnoNoche.comentario,
                        eliminado: rolTurnoNoche.eliminado,
                        id_rol_turno: req.params.id_rol_turno,
                        id_tipo: req.params.id_tipo,
                    },
                        {
                            where: { id: rolTurnoNoche.id }
                        })
                } else if (!rolTurnoNoche.id) {
                    var rolNocturnoCreado = await RrhhEmpleadoRolTurnoNoche.create({
                        fecha_inicio: rolTurnoNoche.fecha_inicio,
                        fecha_fin: rolTurnoNoche.fecha_fin,
                        fecha_creacion: rolTurnoNoche.fecha_creacion,
                        comentario: rolTurnoNoche.comentario,
                        eliminado: rolTurnoNoche.eliminado,
                        id_rol_turno: req.params.id_rol_turno,
                        id_tipo: req.params.id_tipo,
                    })
                }
                i++
                if (i === (req.body.rolesTurnosNoche.length)) {
                    res.json({ mensaje: "Registro actualizado satisfactoriamente!" })
                }
            }
        })
        .get(async function (req, res) {
            datos = await RrhhEmpleadoRolTurnoNoche.findAll({
                where: { id_rol_turno: req.params.id_rol_turno, eliminado: false, id_tipo: req.params.id_tipo }, include: [{ model: Clase, as: 'tipo' }]
            })
            res.json({ turnosExtra: datos })
        })
    router.route('/recursos-humanos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/codigo/:codigo/nombres/:nombres/ci/:ci/campo/:campo/cargo/:cargo/busquedaEmpresa/:busquedaEmpresa/grupo/:grupo_sanguineo/estado/:estado/apellido/:apellido/reguralizado/:reguralizado/area/:area')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = ""
            var condicionCargo = ""
            var activo = "true"
            var reguralizado = "true"
            var condicionContrato = ""
            var condicionArea = ""
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
                    condicion += " or agil_medico_paciente.campo =" + req.params.campo
                } else {
                    condicion += "agil_medico_paciente.campo =" + req.params.campo
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
                condicionContrato = "INNER JOIN agil_rrhh_empleado_ficha as ficha on agil_medico_paciente.id = ficha.id_empleado AND ficha.tipo_contrato = " + req.params.grupo_sanguineo
            } else {
                condicionContrato = ""
            }

            if (req.params.estado != "0") {
                if (req.params.estado === 'Inactivo') {

                    activo = " AND agil_medico_paciente.eliminado = false"

                } else {
                    activo = " AND agil_medico_paciente.eliminado = true"
                }
            } else {
                activo = ""
            }


            if (req.params.reguralizado != "0") {
                if (req.params.reguralizado === 'SI') {
                    reguralizado = " AND agil_medico_paciente.regularizado = true"
                } else {
                    reguralizado = " AND agil_medico_paciente.regularizado = false"
                }
            } else {
                reguralizado = ""
            }

            if (req.params.texto_busqueda != "0") {
                if (condicion.length > 1) {
                    condicion += " or nombre_completo like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or agil_medico_paciente.campo like '%" + req.params.texto_busqueda + "%'"
                } else {
                    condicion += "nombre_completo like '%" + req.params.texto_busqueda + "%' or ci like '%" + req.params.texto_busqueda + "%' or designacion_empresa like '%" + req.params.texto_busqueda + "%' or grupo_sanguineo like '%" + req.params.texto_busqueda + "%' or agil_medico_paciente.campo like '%" + req.params.texto_busqueda + "%'"
                }
            }

            if (req.params.area != "0") {
                condicionArea = "INNER JOIN gl_clase AS area ON fichas.area = area.id AND area.id = " + req.params.area
            } else {
                condicionArea = "LEFT JOIN gl_clase AS area ON fichas.area = area.id "
            }
            console.log(condicion)
            var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
            if (req.params.items_pagina == "0") {
                limite = "";
            }
            if (condicion.length > 1) {
                sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.regularizado, agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa', agil_medico_paciente.comentario as 'comentario', \
                gl_persona.nombre_completo as 'nombre_completo',gl_persona.direccion_numero as 'direccion_numero', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_numero as 'residencia', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
                ,campamento.nombre as 'campamento' ,fichas.caracteristica_discapacidad as 'id_caracteristica_discapacidad',\
                fichas.vencimiento_carnet_discapacidad as 'vencimiento_carnet_discapacidad', fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico',fichas.id as 'id_ficha', subsidios.tipo_subsidio AS 'tipo_subsidio',contrato.nombre as 'tipoContrato', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, fichaBitacora.campo AS 'campoBit', fichaBitacora.valor_actual AS 'valorActual', fichaBitacora.fecha AS 'fechaBitacora',\
                fichas.numero_cuenta AS 'numero_cuenta',banco.nombre AS 'banco_cuenta',\
                fichas.jubilacion AS 'jubilacion', fichas.fecha_jubilacion AS fecha_jubilacion, fichas.nua_seguro_largo_plazo AS 'nua_seguro_largo_plazo',aporte_seguro.nombre AS 'aporte_seguro_nombre',\
                lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
                area.nombre AS 'area'\
                FROM agil_medico_paciente "+ condicionContrato + " JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id order by id desc limit 1)\
                LEFT JOIN agil_rrhh_empleado_bitacora_ficha AS fichaBitacora ON fichaBitacora.id = ( SELECT agil_rrhh_empleado_bitacora_ficha.id FROM agil_rrhh_empleado_bitacora_ficha WHERE agil_rrhh_empleado_bitacora_ficha.ficha = fichas.id AND agil_rrhh_empleado_bitacora_ficha.campo = 'Inactivar Empleado' ORDER BY id DESC LIMIT 1 )\
                INNER JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id\
                LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id\
                LEFT JOIN gl_clase AS aporte_seguro ON fichas.aporte_seguro_largo_plazo = aporte_seguro.id\
                LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
                inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
                LEFT JOIN agil_rrhh_empleado_planificacion_subsidio AS subsidios ON subsidios.id = ( SELECT agil_rrhh_empleado_planificacion_subsidio.id FROM agil_rrhh_empleado_planificacion_subsidio WHERE agil_rrhh_empleado_planificacion_subsidio.id_empleado = agil_medico_paciente.id ORDER BY id DESC LIMIT 1 )\
                    LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase ON agil_medico_paciente.extension = gl_clase.id left JOIN gl_clase as estado ON gl_persona.genero = estado.id\
                    left JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id " + condicionArea + " where agil_medico_paciente.empresa = " + req.params.id_empresa + activo + reguralizado + " AND (" + condicion + ") \
                AND agil_medico_paciente.es_empleado = true GROUP BY agil_medico_paciente.id, fichas.fecha_inicio, fichas.fecha_expiracion, fichas.haber_basico, fichas.id, subsidios.tipo_subsidio, fichaBitacora.campo,fichaBitacora.valor_actual,fichaBitacora.fecha order by "+ req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
                    .then(function (data) {
                        var options = {
                            model: MedicoPaciente,
                            include: [{ model: Persona, as: 'persona' },
                            { model: Clase, as: 'extension' }]
                        };
                        Sequelize.Model.$validateIncludedElements(options);
                        sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.regularizado, agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa', agil_medico_paciente.comentario as 'comentario', \
                    gl_persona.nombre_completo as 'nombre_completo',gl_persona.direccion_numero as 'direccion_numero', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_numero as 'residencia', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
                    ,campamento.nombre as 'campamento',fichas.caracteristica_discapacidad as 'id_caracteristica_discapacidad',\
                    fichas.vencimiento_carnet_discapacidad as 'vencimiento_carnet_discapacidad', fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico',fichas.id as 'id_ficha', subsidios.tipo_subsidio AS 'tipo_subsidio', contrato.nombre as 'tipoContrato', genero.nombre AS 'genero', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, \
                    fichaBitacora.campo AS 'campoBit', fichaBitacora.valor_actual AS 'valorActual', fichaBitacora.fecha AS 'fechaBitacora',\
                    fichas.numero_cuenta AS 'numero_cuenta',banco.nombre AS 'banco_cuenta',\
                    fichas.jubilacion AS 'jubilacion', fichas.fecha_jubilacion AS fecha_jubilacion, fichas.nua_seguro_largo_plazo AS 'nua_seguro_largo_plazo',aporte_seguro.nombre AS 'aporte_seguro_nombre',\
                    lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
                    area.nombre AS 'area'\
                    FROM agil_medico_paciente "+ condicionContrato + " JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id order by id desc limit 1)\
                    LEFT JOIN agil_rrhh_empleado_bitacora_ficha AS fichaBitacora ON fichaBitacora.id = ( SELECT agil_rrhh_empleado_bitacora_ficha.id FROM agil_rrhh_empleado_bitacora_ficha WHERE agil_rrhh_empleado_bitacora_ficha.ficha = fichas.id AND agil_rrhh_empleado_bitacora_ficha.campo = 'Inactivar Empleado' ORDER BY id DESC LIMIT 1 )\
                    LEFT JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id\
                    LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id\
                    LEFT JOIN gl_clase AS aporte_seguro ON fichas.aporte_seguro_largo_plazo = aporte_seguro.id\
                    LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
                    left JOIN gl_clase AS caracteristica_discapacidad ON caracteristica_discapacidad.id = fichas.caracteristica_discapacidad inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
                    LEFT JOIN agil_rrhh_empleado_planificacion_subsidio AS subsidios ON subsidios.id = ( SELECT agil_rrhh_empleado_planificacion_subsidio.id FROM agil_rrhh_empleado_planificacion_subsidio WHERE agil_rrhh_empleado_planificacion_subsidio.id_empleado = agil_medico_paciente.id ORDER BY id DESC LIMIT 1 )\
                    LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase ON agil_medico_paciente.extension = gl_clase.id \
                    LEFT JOIN gl_clase AS estado ON gl_persona.estado_civil = estado.id\
                    LEFT JOIN gl_clase AS genero ON gl_persona.genero = genero.id \
                    left JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id " + condicionArea + " where agil_medico_paciente.empresa = " + req.params.id_empresa + activo + reguralizado + " AND (" + condicion + ") \
                    AND agil_medico_paciente.es_empleado = true GROUP BY agil_medico_paciente.id, fichas.fecha_inicio, fichas.fecha_expiracion, fichas.haber_basico, fichas.id, subsidios.tipo_subsidio, fichaBitacora.campo,fichaBitacora.valor_actual,fichaBitacora.fecha	 order by "+ req.params.columna + " " + req.params.direccion + limite, { type: sequelize.QueryTypes.SELECT })
                            .then(function (pacientes) {

                                res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });

                            });
                    });
            } else {
                sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.regularizado, agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                agil_medico_paciente.empresa as 'id_empresa', gl_clase.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                gl_persona.nombre_completo as 'nombre_completo',gl_persona.direccion_numero as 'direccion_numero', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                gl_persona.telefono as 'telefono', gl_persona.direccion_numero as 'residencia', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
                ,campamento.nombre as 'campamento',fichas.caracteristica_discapacidad as 'id_caracteristica_discapacidad',\
                fichas.vencimiento_carnet_discapacidad as 'vencimiento_carnet_discapacidad', fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico',fichas.id as 'id_ficha',contrato.nombre as 'tipoContrato', subsidios.tipo_subsidio AS 'tipo_subsidio', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, \
                fichaBitacora.campo AS 'campoBit', fichaBitacora.valor_actual AS 'valorActual', fichaBitacora.fecha AS 'fechaBitacora',\
                fichas.numero_cuenta AS 'numero_cuenta',banco.nombre AS 'banco_cuenta',\
                fichas.jubilacion AS 'jubilacion', fichas.fecha_jubilacion AS fecha_jubilacion, fichas.nua_seguro_largo_plazo AS 'nua_seguro_largo_plazo',aporte_seguro.nombre AS 'aporte_seguro_nombre',\
                lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
                area.nombre AS 'area'\
                FROM agil_medico_paciente "+ condicionContrato + " JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id order by id desc limit 1) left JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id\
                LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id\
                LEFT JOIN gl_clase AS aporte_seguro ON fichas.aporte_seguro_largo_plazo = aporte_seguro.id\
                LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
                left JOIN gl_clase AS caracteristica_discapacidad ON caracteristica_discapacidad.id = fichas.caracteristica_discapacidad\
                LEFT JOIN agil_rrhh_empleado_bitacora_ficha AS fichaBitacora ON fichaBitacora.id = ( SELECT agil_rrhh_empleado_bitacora_ficha.id FROM agil_rrhh_empleado_bitacora_ficha WHERE agil_rrhh_empleado_bitacora_ficha.ficha = fichas.id AND agil_rrhh_empleado_bitacora_ficha.campo = 'Inactivar Empleado' ORDER BY id DESC LIMIT 1 )\
                INNER JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
                LEFT JOIN agil_rrhh_empleado_planificacion_subsidio AS subsidios ON subsidios.id = ( SELECT agil_rrhh_empleado_planificacion_subsidio.id FROM agil_rrhh_empleado_planificacion_subsidio WHERE agil_rrhh_empleado_planificacion_subsidio.id_empleado = agil_medico_paciente.id ORDER BY id DESC LIMIT 1 )\
                    LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase ON agil_medico_paciente.extension = gl_clase.id left JOIN gl_clase as estado ON gl_persona.genero = estado.id\
                    left JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id " + condicionArea + " where agil_medico_paciente.empresa = " + req.params.id_empresa + activo + reguralizado + " AND agil_medico_paciente.es_empleado = true GROUP BY agil_medico_paciente.id, fichas.fecha_inicio, fichas.fecha_expiracion, fichas.haber_basico, fichas.id, subsidios.tipo_subsidio, fichaBitacora.campo,fichaBitacora.valor_actual,fichaBitacora.fecha order by " + req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
                    .then(function (data) {
                        var options = {
                            model: MedicoPaciente,
                            include: [{ model: Persona, as: 'persona' },
                            { model: Clase, as: 'extension' }]
                        };
                        Sequelize.Model.$validateIncludedElements(options);
                        sequelize.query("select DISTINCT agil_medico_paciente.id as 'id',agil_medico_paciente.es_empleado as 'es_empleado', agil_medico_paciente.regularizado, agil_medico_paciente.persona as 'id_persona',agil_medico_paciente.codigo as 'codigo',\
                    agil_medico_paciente.empresa as 'id_empresa', extencion.nombre_corto as 'extension', agil_medico_paciente.grupo_sanguineo as 'grupo_sanguineo',\
                    agil_medico_paciente.campo as 'campo', agil_medico_paciente.designacion_empresa as 'designacion_empresa',agil_medico_paciente.comentario as 'comentario',\
                    gl_persona.nombre_completo as 'nombre_completo',gl_persona.direccion_numero as 'direccion_numero', gl_persona.apellido_paterno as 'apellido_paterno', gl_persona.apellido_materno as 'apellido_materno',\
                    estado.nombre as 'estado', gl_persona.nombres as 'nombres',gl_persona.direccion_zona as 'direccion',gl_persona.imagen as 'imagen', agil_medico_paciente.eliminado as 'activo', gl_persona.ci as 'ci', gl_persona.genero as 'id_genero', \
                    gl_persona.telefono as 'telefono', gl_persona.direccion_numero as 'residencia', gl_persona.telefono_movil as 'telefono_movil', gl_persona.fecha_nacimiento as 'fecha_nacimiento'\
                    ,campamento.nombre as 'campamento', fichas.caracteristica_discapacidad as 'id_caracteristica_discapacidad',\
                    fichas.vencimiento_carnet_discapacidad as 'vencimiento_carnet_discapacidad', fichas.fecha_inicio as 'fecha_inicio',fichas.fecha_expiracion as 'fecha_expiracion',fichas.haber_basico as 'haber_basico',fichas.id as 'id_ficha',contrato.nombre as 'tipoContrato', subsidios.tipo_subsidio AS 'tipo_subsidio', genero.nombre AS 'genero', GROUP_CONCAT(`cargos.cargo`.id order by `cargos.cargo`.id) cargosids, GROUP_CONCAT(`cargos.cargo`.nombre order by `cargos.cargo`.id) cargos, \
                    fichaBitacora.campo AS 'campoBit', fichaBitacora.valor_actual AS 'valorActual', fichaBitacora.fecha AS 'fechaBitacora',\
                    fichas.numero_cuenta AS 'numero_cuenta',banco.nombre AS 'banco_cuenta',\
                    fichas.jubilacion AS 'jubilacion', fichas.fecha_jubilacion AS fecha_jubilacion, fichas.nua_seguro_largo_plazo AS 'nua_seguro_largo_plazo',aporte_seguro.nombre AS 'aporte_seguro_nombre',\
                    lugar_seguro_salud.nombre AS 'lugar_seguro_salud',\
                    area.nombre AS 'area'\
                    FROM agil_medico_paciente "+ condicionContrato + " JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id=( select agil_rrhh_empleado_ficha.id from agil_rrhh_empleado_ficha where  agil_rrhh_empleado_ficha.id_empleado =  agil_medico_paciente.id order by id desc limit 1) left JOIN gl_clase AS contrato ON fichas.tipo_contrato = contrato.id\
                    LEFT JOIN gl_clase AS banco ON fichas.banco = banco.id\
                    LEFT JOIN gl_clase AS aporte_seguro ON fichas.aporte_seguro_largo_plazo = aporte_seguro.id\
                    LEFT JOIN gl_clase AS lugar_seguro_salud ON fichas.lugar_seguro_salud = lugar_seguro_salud.id\
                    left JOIN gl_clase AS caracteristica_discapacidad ON caracteristica_discapacidad.id = fichas.caracteristica_discapacidad inner JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha  " + condicionCargo + " \
                    LEFT JOIN agil_rrhh_empleado_bitacora_ficha AS fichaBitacora ON fichaBitacora.id = ( SELECT agil_rrhh_empleado_bitacora_ficha.id FROM agil_rrhh_empleado_bitacora_ficha WHERE agil_rrhh_empleado_bitacora_ficha.ficha = fichas.id AND agil_rrhh_empleado_bitacora_ficha.campo = 'Inactivar Empleado' ORDER BY id DESC LIMIT 1 )\
                    LEFT JOIN agil_rrhh_empleado_planificacion_subsidio AS subsidios ON subsidios.id = ( SELECT agil_rrhh_empleado_planificacion_subsidio.id FROM agil_rrhh_empleado_planificacion_subsidio WHERE agil_rrhh_empleado_planificacion_subsidio.id_empleado = agil_medico_paciente.id ORDER BY id DESC LIMIT 1 )\
                    LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id  left JOIN gl_persona ON (agil_medico_paciente.persona = gl_persona.id) left JOIN gl_clase as extencion ON agil_medico_paciente.extension = extencion.id left JOIN gl_clase as estado ON gl_persona.estado_civil = estado.id\
                    LEFT JOIN gl_clase AS genero ON gl_persona.genero = genero.id \
                    left JOIN gl_clase as campamento ON agil_medico_paciente.campo = campamento.id " + condicionArea + " where agil_medico_paciente.empresa = " + req.params.id_empresa + activo + reguralizado + " AND agil_medico_paciente.es_empleado = true GROUP BY agil_medico_paciente.id, fichas.fecha_inicio, fichas.fecha_expiracion, fichas.haber_basico, fichas.id, subsidios.tipo_subsidio, fichaBitacora.campo,fichaBitacora.valor_actual,fichaBitacora.fecha order by " + req.params.columna + " " + req.params.direccion + limite, { type: sequelize.QueryTypes.SELECT }/* , options */)
                            .then(function (pacientes) {
                                res.json({ pacientes: pacientes, paginas: Math.ceil(data.length / req.params.items_pagina) });
                            });
                    });
            }

        })

    router.route('/rr-hh-reporte-excel/id_empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            MedicoPaciente.findAll({
                where: { id_empresa: req.params.id_empresa },
                include: [{ model: Persona, as: 'persona', include: [{ model: Clase, as: 'localidad' }, { model: Clase, as: 'provincia' }, { model: Clase, as: 'ciudad' }, { model: Clase, as: 'pais' }, { model: Clase, as: 'lugar_nacimiento' }, { model: Clase, as: 'genero' }, { model: Clase, as: 'estadoCivil' }] },
                { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoHorasExtra, as: 'horasExtra' }, { model: RrhhEmpleadoRolTurno, as: 'rolesTurno', include: [{ model: Clase, as: 'grupo' }] }, { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: 'tipoSeguro' }] }, { model: Clase, as: 'lugarSeguroLargoPlazo' }, { model: Clase, as: 'aporteSeguroLargoPlazo' }, { model: Clase, as: 'seguroSalud' }, { model: Clase, as: 'lugarSeguroSalud' }, { model: Clase, as: 'ubicacion' }, { model: Clase, as: 'cargaHorario' }, { model: Clase, as: 'banco' }, { model: Persona, as: 'personaReferencia' }, { model: Clase, as: 'tipoContrato' }, { model: Clase, as: 'tipoPersonal' }, { model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }] },
                { model: Clase, as: 'extension' },
                { model: Empresa, as: 'empresa' },
                { model: Clase, as: 'campo' },
                { model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                { model: MedicoPacientePreRequisito, as: 'pacientesPrerequisitos', include: [{ model: MedicoPrerequisito, as: 'preRequisito' }] }

                ]
            }).then(function (reportes) {
                res.json({ reportes: reportes });
            });
        })

    router.route('/recursos-humanos-familiar/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFichaFamiliar.findAll({
                include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }, {
                    model: MedicoPaciente, as: "empleado", where: { id_empresa: req.params.id_empresa }, include: [{ model: Empresa, as: 'empresa' }, { model: Clase, as: 'campo' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: Clase, as: "lugarSeguroSalud" }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }] }, { model: Clase, as: 'extension' }, {
                        model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' },
                        { model: Clase, as: 'pais' },
                        { model: Clase, as: 'ciudad' },
                        { model: Clase, as: 'provincia' },
                        { model: Clase, as: 'localidad' },
                        { model: Clase, as: 'estadoCivil' }]
                    }]
                }]
            }).then(function (FamiliaresEncontrados) {
                res.json(FamiliaresEncontrados);
            });
        })


    router.route('/recursos-humanos-familiar/:id_persona/familiar-relacion/:id_familiar')
        .put(ensureAuthorizedlogged, function (req, res) {

            RrhhEmpleadoFichaFamiliar.destroy({
                where: {
                    id: req.params.id_familiar
                },
            }).then(function (RelacionEliminado) {
                Persona.destroy({
                    where: {
                        id: req.params.id_persona
                    },
                }).then(function (FamiliarEliminado) {
                    res.json({ mensaje: "Familiar eliminado satisfactoriamente!" });
                });
            });
        })
    /*    router.route('/recursos-humanos-seguro/:id_seguro')
           .put(ensureAuthorizedlogged,function (req, res) {
               RrhhEmpleadoFichaOtrosSeguros.destroy({
                   where: {
                       id: req.params.id_seguro
                   },
               }).then(function (SeguroEliminado) {
                   res.json({ mensaje: "Seguro eliminado satisfactoriamente!" });
               });
           }) */
    router.route('/configuracion-subsidio/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (conf, index, array) {
                var control_medico = (conf.control_medico) ? conf.control_medico : false
                var vincular_hijo = (conf.vincular_hijo) ? conf.vincular_hijo : false
                var planillas = (conf.planillas) ? conf.planillas : false
                if (conf.id) {
                    if (conf.eliminado) {
                        RrhhEmpleadoConfiguracionSubsidio.destroy({
                            where: { id: conf.id }
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    } else {
                        RrhhEmpleadoConfiguracionSubsidio.update({
                            tipo_subsidio: conf.tipo_subsidio,
                            meses: conf.meses,
                            mes_gestacion: conf.mes_gestacion,
                            monto: conf.monto,
                            control_medico: control_medico,
                            vincular_hijo: vincular_hijo,
                            planillas: planillas
                        },
                            {
                                where: { id: conf.id }
                            }).then(function (configuracion) {
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                                }
                            })
                    }
                } else {
                    if (conf.eliminado) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                        }
                    } else {
                        RrhhEmpleadoConfiguracionSubsidio.create({
                            id_empresa: req.params.id_empresa,
                            tipo_subsidio: conf.tipo_subsidio,
                            meses: conf.meses,
                            mes_gestacion: conf.mes_gestacion,
                            monto: conf.monto,
                            control_medico: control_medico,
                            vincular_hijo: vincular_hijo,
                            planillas: planillas
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    }
                }

            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoConfiguracionSubsidio.findAll({
                where: {
                    id_empresa: req.params.id_empresa,
                }
            }).then(function (configSubsidios) {
                res.json(configSubsidios)
            })
        });


    function convertirFecha(fecha) {
        var dia = fecha.split('/')[0];
        var mes = fecha.split('/')[1];
        var año = fecha.split('/')[2];
        if (año == undefined) {
            año = new Date().getFullYear();
        }
        return mes + '/' + dia + '/' + año;
    }

    router.route('/empleado-subsidio/:id_empleado')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (conf, index, array) {
                // var control_medico = (conf.control_medico) ? conf.control_medico : false
                // var vincular_hijo = (conf.vincular_hijo) ? conf.vincular_hijo : false
                // var planillas = (conf.planillas) ? conf.planillas : false
                if (conf.id) {
                    if (conf.eliminado) {
                        RrhhEmpleadoPlanificacionSubsidio.destroy({
                            where: { id: conf.id }
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    } else {
                        RrhhEmpleadoPlanificacionSubsidio.update({
                            tipo_subsidio: conf.tipo_subsidio.id,
                            mes_gestacion: conf.mes_gestacion,
                            fecha_reporte: conf.fecha_reporte,
                            cantidad: conf.cantidad,
                            observaciones: conf.observaciones,
                            vincular_hijo: conf.vincular_hijo ? conf.vincular_hijo.id : null,
                            vincular_veneficiaria: conf.vincular_veneficiaria ? conf.vincular_veneficiaria.id : null,
                            hijo_gestacion: conf.hijo_gestacion ? conf.hijo_gestacion : null,
                            nro_asignacion: conf.nro_asignacion ? conf.nro_asignacion : null
                        },
                            {
                                where: { id: conf.id }
                            }).then(function (configuracion) {
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                                }
                            })
                    }
                } else {
                    if (conf.eliminado) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                        }
                    } else {
                        var tiempoActual = new Date();
                        // venta.fecha = new Date(convertirFecha(conf.fecha_reporte));


                        RrhhEmpleadoPlanificacionSubsidio.create({
                            id_empleado: req.params.id_empleado,
                            tipo_subsidio: conf.tipo_subsidio.id,
                            mes_gestacion: conf.mes_gestacion,
                            fecha_reporte: new Date(convertirFecha(conf.fecha_reporte)),
                            cantidad: conf.cantidad,
                            observaciones: conf.observaciones,
                            vincular_hijo: conf.vincular_hijo ? conf.vincular_hijo.id : null,
                            vincular_veneficiaria: conf.vincular_veneficiaria ? conf.vincular_veneficiaria.id : null,
                            hijo_gestacion: conf.hijo_gestacion ? conf.hijo_gestacion : null,
                            nro_asignacion: conf.nro_asignacion ? conf.nro_asignacion : null
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    }
                }

            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoPlanificacionSubsidio.findAll({
                where: {
                    id_empleado: req.params.id_empleado,
                },
                include: [{ model: RrhhEmpleadoConfiguracionSubsidio, as: 'tipoSubsidio' }, { model: RrhhEmpleadoFichaFamiliar, as: 'veneficiaria', required: false }, { model: RrhhEmpleadoFichaFamiliar, as: 'hijo', required: false, include: [{ model: Persona, as: 'persona' }] }]
            }).then(function (empleadoSubsidios) {
                res.json(empleadoSubsidios)
            })
        });

    router.route('/empleado-subsidio-planificacion/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoPlanificacionSubsidio.findAll({
                where: {
                    id_empleado: req.params.id_empleado,
                },
                include: [{ model: RrhhEmpleadoConfiguracionSubsidio, as: 'tipoSubsidio', where: { control_medico: true } }, { model: RrhhEmpleadoFichaFamiliar, as: 'veneficiaria', required: false }, { model: RrhhEmpleadoFichaFamiliar, as: 'hijo', required: false, include: [{ model: Persona, as: 'persona' }] }]
            }).then(function (empleadoSubsidios) {
                res.json(empleadoSubsidios)
            })
        });

    function guardarDocumentoSubsidioSeguiento(conf, seguientoCreado) {
        fs.writeFileSync('./documentos/rrhh/subsidio-seguimientos/seguimiento-' + seguientoCreado.id + "-" + conf.documento2.name, conf.documento2.data, 'binary', function (err) {
            if (err)
                console.log(err);
            else
                console.log("The file was saved!");
        });
        var namedoc = './documentos/rrhh/subsidio-seguimientos/seguimiento-' + seguientoCreado.id + "-" + conf.documento2.name;
        RrhhEmpleadoSeguimientoSubsidio.update({
            documento: namedoc
        }, {
            where: { id: seguientoCreado.id }
        }).then(function (affecteedRows) {
        })
    }

    router.route('/empleado-subsidio-seguimiento/:id_empleado')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (conf, index, array) {
                if (conf.id) {
                    if (conf.eliminado) {
                        RrhhEmpleadoSeguimientoSubsidio.destroy({
                            where: { id: conf.id }
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    } else {
                        RrhhEmpleadoSeguimientoSubsidio.update({
                            id_planificacion: conf.planificacion.id,
                            fecha: conf.fecha,
                            medico: conf.medico,
                            num_control: conf.num_control
                        },
                            {
                                where: { id: conf.id }
                            }).then(function (configuracion) {
                                if (conf.documento2) {
                                    guardarDocumentoSubsidioSeguiento(conf, conf);
                                }
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                                }
                            })
                    }
                } else {
                    if (conf.eliminado) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                        }
                    } else {
                        RrhhEmpleadoSeguimientoSubsidio.create({
                            id_empleado: req.params.id_empleado,
                            id_planificacion: conf.planificacion.id,
                            fecha: new Date(convertirFecha(conf.fecha)),
                            medico: conf.medico,
                            num_control: conf.num_control
                        }).then(function (seguientoCreado) {
                            if (conf.documento2) {
                                guardarDocumentoSubsidioSeguiento(conf, seguientoCreado);
                            }

                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    }
                }

            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoSeguimientoSubsidio.findAll({
                where: {
                    id_empleado: req.params.id_empleado,
                },
                include: [{ model: RrhhEmpleadoPlanificacionSubsidio, as: 'planificacion', include: [{ model: RrhhEmpleadoConfiguracionSubsidio, as: 'tipoSubsidio' }] }]
            }).then(function (empleadoSubsidios) {
                res.json(empleadoSubsidios)
            })
        });

    router.route('/recursos-humanos/:id_usuario')
        .get(ensureAuthorizedlogged, function (req, res) {
            MedicoPaciente.find({
                where: {
                    id: req.params.id_usuario
                },
                include: [{ model: Clase, as: 'campo' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }] }, { model: Clase, as: 'extension' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }
                    // { model: Empresa, as: 'empresa'},{model:MedicoPrerequisito, as: 'prerequisitos',include: [{ model: Clase, as: 'prerequisitoClase' }]}
                ]
            }).then(function (medicoPaciente) {
                if (medicoPaciente.empleadosFichas != undefined) {
                    if (medicoPaciente.empleadosFichas.length > 0) {
                        Clase.find({
                            where: {
                                id: medicoPaciente.empleadosFichas[(medicoPaciente.empleadosFichas.length - 1)].id_tipo_contrato
                            }
                        }).then(function (clase) {
                            res.json({ medicoPaciente: medicoPaciente, clase: clase })
                        })
                    } else {
                        res.json({ medicoPaciente: medicoPaciente })
                    }
                } else {
                    res.json({ medicoPaciente: medicoPaciente })
                }
            })
        })

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
                        segundo_nombre: req.body.persona.segundo_nombre,
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
                            fs.writeFileSync('./img/persona' + personaCreada.id + '.jpg', imagenPersona.data, 'base64', function (err) { });
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
                                // cargo: req.body.cargo,
                                id_campo: req.body.campo.id,
                                designacion_empresa: req.body.designacion_empresa,
                                eliminado: false,
                                es_empleado: req.body.es_empleado
                            }).then(function (medicoPacienteCreado) {
                                RrhhEmpleadoFicha.create({
                                    fecha: req.body.fechaFicha,
                                    id_empleado: medicoPacienteCreado.id,
                                    // id_caracteristica_discapacidad: req.body.caracteristica_discapacidad.id,
                                    // vencimiento_carnet_discapacidad: req.body.vencimiento_carnet_discapacidad.length ? req.body.vencimiento_carnet_discapacidad.split('/').reverse().join('-') + "T04:00:00.000Z" : null ,
                                    id_tipo_contrato: req.body.tipo_contrato.id,
                                    codigo_tributario: req.body.codigo_tributario ? req.body.codigo_tributario.toString() : '',
                                    activo: true,
                                    id_campo: req.body.campo.id
                                }).then(function (Creado) {
                                    if (req.body.cargos) {
                                        req.body.cargos.forEach(function (cargo, index, array) {
                                            RrhhEmpleadoCargo.create({
                                                /* id_empleado: medicoPacienteCreado.id, */
                                                id_cargo: cargo.id,
                                                id_ficha: Creado.id
                                            }).then(function (cargoCreado) {
                                                if (index === (array.length - 1)) {
                                                    RrhhEmpleadoBitacoraFicha.create({
                                                        id_ficha: Creado.id,
                                                        campo: 'Creación Ususario',
                                                        valor_anterior: 'No existe',
                                                        valor_actual: 'Nuevo Registro',
                                                        fecha: Date.now(),
                                                        id_usuario: req.body.usuario_en_uso
                                                    }).then(function (bitacoraCreada) {
                                                        if (index === (array.length - 1)) {
                                                            res.json({ message: 'creado Satisfactoriamente' });
                                                        }
                                                    })

                                                }
                                            })
                                        });
                                    } else {
                                        RrhhEmpleadoBitacoraFicha.create({
                                            id_ficha: Creado.id,
                                            campo: 'Creación Ususario',
                                            valor_anterior: 'No existe',
                                            valor_actual: 'Nuevo Registro',
                                            fecha: Date.now(),
                                            id_usuario: req.body.usuario_en_uso
                                        }).then(function (bitacoraCreada) {
                                            res.json({ message: 'creado Satisfactoriamente' });
                                        })
                                    }
                                })

                            });
                        });
                    });

                })
            })

        })
        .put(ensureAuthorizedlogged, function (req, res) {
            if (req.body.eliminar == undefined) {
                var nombre = (req.body.persona.apellido_paterno != undefined || req.body.persona.apellido_paterno != null ? req.body.persona.apellido_paterno : '')
                    + ' ' + (req.body.persona.apellido_materno != undefined || req.body.persona.apellido_materno != null ? req.body.persona.apellido_materno : '')
                    + ' ' + (req.body.persona.nombres != undefined || req.body.persona.nombres != null ? req.body.persona.nombres : '')
                    + ' ' + (req.body.persona.segundo_nombre != undefined || req.body.persona.segundo_nombre != null ? req.body.persona.segundo_nombre : '')
                Persona.update({
                    nombres: req.body.persona.nombres,
                    segundo_nombre: req.body.persona.segundo_nombre ? req.body.persona.segundo_nombre : "",
                    apellido_paterno: req.body.persona.apellido_paterno,
                    apellido_materno: req.body.persona.apellido_materno,
                    ci: req.body.persona.ci,
                    id_genero: req.body.persona.genero.id,
                    nombre_completo: nombre,
                    telefono: req.body.persona.telefono,
                    telefono_movil: req.body.persona.telefono_movil,
                    fecha_nacimiento: req.body.persona.fecha_nacimiento_update,
                }, {
                    where: {
                        id: req.body.id_persona
                    }
                }).then(function (personaActualizada) {
                    var imagen;
                    if (req.body.persona.imagen.indexOf('default') > -1 || req.body.persona.imagen.indexOf('persona' + req.body.persona.id) > -1) {
                        imagen = req.body.persona.imagen; console.log('entro1');
                    } else {
                        var imagenPersona = decodeBase64Image(req.body.persona.imagen);
                        fs.writeFileSync('./img/persona' + req.body.persona.id + '.jpg', imagenPersona.data, 'base64', function (err) { });
                        imagen = './img/persona' + req.body.persona.id + '.jpg'; console.log('entro2');
                    }
                    Persona.update({
                        imagen: imagen
                    }, {
                        where: {
                            id: req.body.id_persona
                        }
                    }).then(function (personaActualizada) {
                        MedicoPaciente.update({
                            regularizado: req.body.regularizado,
                            id_persona: personaActualizada.id,
                            id_empresa: req.body.id_empresa,
                            codigo: req.body.codigo,
                            id_extension: req.body.extension.id,
                            grupo_sanguineo: req.body.grupo_sanguineo,
                            cargo: req.body.cargo,
                            id_campo: req.body.campo.id,
                            designacion_empresa: req.body.designacion_empresa,
                            eliminado: req.body.eliminado,
                            es_empleado: req.body.es_empleado
                        }, {
                            where: { id: req.body.id }
                        }).then(async function (medicoPacienteActualizado) {
                            let fichasMedicas = await MedicoPacienteFicha.findAll({ where: { id_paciente: req.body.id }, raw: true })
                            if (fichasMedicas.length > 0) {
                                let ficha = fichasMedicas[fichasMedicas.length - 1]
                                let edit = await MedicoPacienteFicha.update({ area_operacion: req.body.campo ? req.body.campo.nombre : null }, { where: { id: ficha.id } })
                            }
                            RrhhEmpleadoCargo.destroy({
                                where: {
                                    id_ficha: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id,
                                }
                            }).then(function (EmpleadoCargosActualizada) {
                                RrhhEmpleadoFicha.update({
                                    id_campo: req.body.campo.id,
                                }, {
                                    where: { id: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id }
                                }).then(function (Creado) {
                                    if (req.body.cargos.length > 0) {
                                        req.body.cargos.forEach(function (cargo, index, array) {
                                            RrhhEmpleadoCargo.findOrCreate({
                                                where: { id_ficha: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id, id_cargo: cargo.id },
                                                defaults: {
                                                    /*   id_empleado: req.body.id, */
                                                    id_cargo: cargo.id,
                                                    id_ficha: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id,
                                                }
                                            }).spread(function (cargoEncontrado, created) {
                                                if (!created) {
                                                    RrhhEmpleadoCargo.update({
                                                        /* id_empleado: req.body.id, */
                                                        id_cargo: cargo.id,
                                                        id_ficha: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id,
                                                    }, {
                                                        where: { id_ficha: req.body.empleadosFichas[req.body.empleadosFichas.length - 1].id, id_cargo: cargo.id }
                                                    }).then(function (actualizado) {
                                                        if (index === (array.length - 1)) {
                                                            res.json({ message: 'creado Satisfactoriamente' });
                                                        } s
                                                    })

                                                } else {
                                                    if (index === (array.length - 1)) {
                                                        res.json({ message: 'creado Satisfactoriamente' });
                                                    }
                                                }
                                            })
                                        });
                                    } else {
                                        res.json({ message: 'creado Satisfactoriamente' });
                                    }
                                })


                            });
                        })
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
    router.route('/usuario-recurso-humano/:id_empleado')
        .put(ensureAuthorizedlogged, function (req, res) {
            var activo
            if (req.body.eliminado) {
                activo = req.body.eliminado
            } else {
                activo = req.body.activo
            }
            sequelize.transaction((t) => {
                return MedicoPaciente.update({
                    eliminado: activo
                }, {
                    where: {
                        id: req.body.id
                    }, transaction: t
                }).then(function (personaActualizada) {
                    /*  var mn = (req.body.activo == true) ? 'activo' : 'inactivo' */
                    //Cuando se inhabilita o desactiva un emplesdo desde rrhh
                    if (req.body.nueva_fecha_expiracion) {
                        return RrhhEmpleadoFicha.update({
                            fecha_expiracion: req.body.nueva_fecha_expiracion,
                            activo: false,
                            observacion: req.body.observacion
                        }, {
                            where: { id: req.body.id_ficha }
                            , transaction: t
                        }).then(function (fichaActualizada) {
                            return RrhhEmpleadoBitacoraFicha.create({
                                id_ficha: req.body.id_ficha,
                                campo: 'Inactivar Empleado',
                                valor_anterior: 'Empleado Activo',
                                valor_actual: req.body.motivo_retiro.nombre,
                                fecha: Date.now(),
                                id_usuario: req.body.quienModifico
                            }, { transaction: t }).then(function (bitacoraCreada) {
                                return RrhhEmpleadoBeneficioSocial.create({
                                    id_ficha: req.body.id_ficha,
                                    tipo_beneficio: true,
                                    fecha_retiro: req.body.nueva_fecha_expiracion,
                                    id_motivo: req.body.motivo_retiro.id,
                                    eliminado: false
                                }, { transaction: t }).then(function (creado) {
                                    return new Promise((f, r) => f("Usuario actualizado satisfactoriamente!"))
                                    // res.json({ mensaje: "Usuario actualizado satisfactoriamente!" });
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
                        })
                    } else if (req.body.tipoReincorporacion) {
                        if (req.body.tipoReincorporacion.nombre_corto == Diccionario.TIPO_REINCORPORACION) {
                            return RrhhEmpleadoFicha.update({
                                fecha_expiracion: null,
                                activo: true,
                            }, {
                                where: { id: req.body.id_ficha }, transaction: t
                            }).then(function (fichaActualizada) {
                                return RrhhEmpleadoBitacoraFicha.create({
                                    id_ficha: req.body.id_ficha,
                                    campo: 'Activar Empleado',
                                    valor_anterior: 'Empleado Inactivo',
                                    valor_actual: req.body.tipoReincorporacion.nombre,
                                    fecha: Date.now(),
                                    id_usuario: req.body.quienModifico
                                }, { transaction: t }).then(function (bitacoraCreada) {
                                    return RrhhEmpleadoBeneficioSocial.update({
                                        eliminado: true
                                    }, {
                                        where: {
                                            id_ficha: req.body.id_ficha,
                                            tipo_beneficio: true
                                        }, transaction: t
                                    }).then(function (beneficioEncontrado) {
                                        return new Promise((f, r) => f("Usuario actualizado satisfactoriamente!"))
                                        // res.json({ mensaje: "Usuario actualizado satisfactoriamente!" });
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
                            })
                        } else {
                            return new Promise((f, r) => f("Usuario actualizado satisfactoriamente!"))
                        }

                    } else {
                        return new Promise((f, r) => f("Usuario actualizado satisfactoriamente!"))
                    }
                }).then((result) => {
                    res.json({ mensaje: result })
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            })
            // https://emserso.tk/agilsoft2019srl/app/recursos-humanos-solicitudes-ausencia/empresa/35/estado/0/inicio/2019-08-1/fin/2019-08-31/pagina/1/items_pagina/7/texto_busqueda/0/columna/0/direccion/0/area/0
        })//RrhhEmpleadoFichaOtrosSeguros,RrhhEmpleadoFichaFamiliar
    router.route('/usuario-recurso-humano-ficha/empleado/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFicha.findAll({
                limit: 1,
                where: {
                    id_empleado: req.params.id_empleado
                },
                include: [{ model: Clase, as: 'tipoContrato' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                { model: Clase, as: 'tipoPersonal' },
                { model: Clase, as: 'cargaHorario' },
                { model: Clase, as: 'area' },
                { model: Clase, as: 'ubicacion' },
                { model: Clase, as: 'seguroSalud' },
                { model: Clase, as: 'lugarSeguroSalud' },
                { model: Clase, as: 'aporteSeguroLargoPlazo' },
                { model: Clase, as: 'lugarSeguroLargoPlazo' },
                { model: Clase, as: 'banco' },
                { model: Clase, as: 'caracteristica_discapacidad' },
                { model: RrhhEmpleadoDiscapacidad, as: 'discapacidades', include: [{ model: Clase, as: "discapacidad" }] },
                /* { model: RrhhEmpleadoFichaFamiliar, as: 'familiares' },*/
                { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: "tipoSeguro" }] },
                {
                    model: MedicoPaciente, as: 'empleado',
                    include: [{ model: RrhhViajeConductor, as: 'conductor', include: [{ model: Clase, as: "tipoLicencia" }] }, { model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                    { model: Clase, as: 'extension' }, { model: Clase, as: 'tipoDocumento' },
                    {
                        model: Persona, as: 'persona',
                        include: [{ model: Clase, as: 'genero' },
                        { model: Clase, as: 'pais' },
                        { model: Clase, as: 'ciudad' },
                        { model: Clase, as: 'provincia' },
                        { model: Clase, as: 'localidad' },
                        { model: Clase, as: 'estadoCivil' }]
                    }]
                }, { model: Persona, as: 'personaReferencia' }],
                order: [['id', 'DESC']]
            }).then(function (fichaEncontrada) {
                var ficha = fichaEncontrada[0]
                /* if (ficha) { */
                res.json({ ficha: ficha })
                /*  } else {
                     MedicoPaciente.find({
                         where: { id: req.params.id_empleado },
                         include: [{ model: RrhhEmpleadoDiscapacidad, as: 'discapacidades', include: [{ model: Clase, as: "discapacidad" }] }, { model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                         { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: "tipoSeguro" }] }, { model: Clase, as: 'extension' }, { model: Clase, as: 'tipoDocumento' }, { model: Empresa, as: 'empresa' },
                         {
                             model: Persona, as: 'persona',
                             include: [{ model: Clase, as: 'genero' },
                             { model: Clase, as: 'pais' },
                             { model: Clase, as: 'ciudad' },
                             { model: Clase, as: 'provincia' },
                             { model: Clase, as: 'localidad' },
                             { model: Clase, as: 'estadoCivil' }]
                         }]
                     }).then(function (pacienteEncontrado) {
                         res.json({ empleado: pacienteEncontrado })
                     })
                 } */
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                return RrhhEmpleadoFicha.find({
                    where: {
                        id: req.body.id
                    }, transaction: t,
                    include: [{ model: Clase, as: 'tipoContrato' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                    { model: Clase, as: 'tipoPersonal' },
                    { model: Clase, as: 'cargaHorario' },
                    { model: Clase, as: 'area' },
                    { model: Clase, as: 'ubicacion' },
                    { model: Clase, as: 'seguroSalud' },
                    { model: Clase, as: 'lugarSeguroSalud' },
                    { model: Clase, as: 'aporteSeguroLargoPlazo' },
                    { model: Clase, as: 'lugarSeguroLargoPlazo' },
                    { model: Clase, as: 'banco' },
                    { model: RrhhEmpleadoDiscapacidad, as: 'discapacidades', include: [{ model: Clase, as: "discapacidad" }] },
                    /* { model: RrhhEmpleadoFichaFamiliar, as: 'familiares' }, */
                    { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: "tipoSeguro" }] },
                    {
                        model: MedicoPaciente, as: 'empleado',
                        include: [{ model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                        { model: Clase, as: 'extension' }, { model: Clase, as: 'tipoDocumento' },
                        {
                            model: Persona, as: 'persona',
                            include: [{ model: Clase, as: 'genero' },
                            { model: Clase, as: 'pais' },
                            { model: Clase, as: 'ciudad' },
                            { model: Clase, as: 'provincia' },
                            { model: Clase, as: 'localidad' },
                            { model: Clase, as: 'estadoCivil' }]
                        }]
                    }, { model: Persona, as: 'personaReferencia' }],
                    order: [['id', 'DESC']]
                }).then(function (fichaAnterior) {
                    if (req.body.personaReferencia == null || req.body.personaReferencia == undefined) {
                        var personaReferenciaCreada = null
                        return MedicoPaciente.update({
                            regularizado: req.body.empleado.regularizado,
                            codigo: req.body.empleado.codigo,
                            id_extension: req.body.empleado.extension.id,
                            id_tipo_documento: req.body.empleado.tipoDocumento ? req.body.empleado.tipoDocumento.id : null,
                            fecha_vence_documento: req.body.empleado.fecha_vence_documento,
                            chofer: req.body.empleado.chofer
                        }, {
                            where: {
                                id: req.body.empleado.id
                            }, transaction: t
                        }).then(function (medicoPacienteActualizado) {
                            if (req.body.empleado.chofer) {
                                return RrhhViajeConductor.find({
                                    where: { id_empleado: req.body.empleado.id }, transaction: t
                                }).then(function (conductor) {
                                    var nombre = ""
                                    if (req.body.empleado.persona.segundo_nombre) {
                                        nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.segundo_nombre + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                    } else {
                                        nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                    }
                                    if (conductor) {
                                        return RrhhViajeConductor.update({
                                            nombre: nombre,
                                            licencia: req.body.empleado.persona.ci,
                                            id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                            habilitado: true,
                                        }, {
                                            where: { id: conductor.id }, transaction: t,
                                        }).then(function (conductorCreado) {

                                            guardarDatosFicha(req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    } else {
                                        return RrhhViajeConductor.create({
                                            nombre: nombre,
                                            licencia: req.body.empleado.persona.ci,
                                            id_empleado: req.body.empleado.id,
                                            habilitado: true,
                                            id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                            id_empresa: req.body.empleado.id_empresa
                                        }, { transaction: t }).then(function (conductorCreado) {
                                            guardarDatosFicha(req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    }
                                })
                            } else {
                                return RrhhViajeConductor.find({
                                    where: { id_empleado: req.body.empleado.id }, transaction: t
                                }).then(function (conductor) {
                                    if (conductor) {
                                        return RrhhViajeConductor.update({
                                            habilitado: false
                                        }, {
                                            where: { id: conductor.id }, transaction: t
                                        }).then(function (conductorCreado) {
                                            return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    } else {
                                        return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                    }
                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                })
                            }

                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                    } else
                        if (!req.body.personaReferencia.id) {
                            return Persona.create({
                                nombres: req.body.personaReferencia.nombres,
                                segundo_nombre: req.body.personaReferencia.segundo_nombre ? req.body.personaReferencia.segundo_nombre : "",

                                telefono: req.body.personaReferencia.telefono,
                                direccion: req.body.personaReferencia.direecion,
                                telefono_movil: req.body.personaReferencia.telefono_movil,
                                direccion_ciudad: req.body.personaReferencia.direccion_ciudad,
                                direccion_zona: req.body.personaReferencia.direccion_zona,
                                direccion_localidad: req.body.personaReferencia.direccion_localidad,
                                direccion_numero: req.body.personaReferencia.direccion_numero
                            }, { transaction: t }).then(function (personaReferenciaCreada) {
                                return MedicoPaciente.update({
                                    regularizado: req.body.empleado.regularizado,
                                    codigo: req.body.empleado.codigo,
                                    id_extension: req.body.empleado.extension.id,
                                    id_tipo_documento: req.body.empleado.tipoDocumento.id,
                                    fecha_vence_documento: req.body.empleado.fecha_vence_documento,
                                    chofer: req.body.empleado.chofer
                                }, {
                                    where: {
                                        id: req.body.empleado.id
                                    }, transaction: t
                                }).then(function (medicoPacienteActualizado) {
                                    if (req.body.empleado.chofer) {
                                        return RrhhViajeConductor.find({
                                            where: { id_empleado: req.body.empleado.id }, transaction: t
                                        }).then(function (conductor) {
                                            var nombre = ""
                                            if (req.body.empleado.persona.segundo_nombre) {
                                                nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.segundo_nombre + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                            } else {
                                                nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                            }
                                            if (conductor) {
                                                return RrhhViajeConductor.update({
                                                    nombre: nombre,
                                                    licencia: req.body.empleado.persona.ci,
                                                    id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                                    habilitado: true,
                                                }, {
                                                    where: { id: conductor.id }, transaction: t
                                                }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            } else {
                                                return RrhhViajeConductor.create({
                                                    nombre: nombre,
                                                    licencia: req.body.empleado.persona.ci,
                                                    id_empleado: req.body.empleado.id,
                                                    habilitado: true,
                                                    id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                                    id_empresa: req.body.empleado.id_empresa
                                                }, { transaction: t }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            }
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    } else {
                                        return RrhhViajeConductor.find({
                                            where: { id_empleado: req.body.empleado.id }, transaction: t
                                        }).then(function (conductor) {
                                            if (conductor) {
                                                return RrhhViajeConductor.update({
                                                    habilitado: false
                                                }, {
                                                    where: { id: conductor.id }, transaction: t
                                                }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            } else {
                                                return guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                            }
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
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
                        } else {
                            return Persona.update({
                                nombres: req.body.personaReferencia.nombres,
                                segundo_nombre: req.body.personaReferencia.segundo_nombre ? req.body.personaReferencia.segundo_nombre : "",
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
                                }, transaction: t
                            }).then(function (personaReferenciaCreada) {

                                return MedicoPaciente.update({
                                    regularizado: req.body.empleado.regularizado,
                                    codigo: req.body.empleado.codigo,
                                    id_extension: req.body.empleado.extension.id,
                                    id_tipo_documento: req.body.empleado.tipoDocumento.id,
                                    fecha_vence_documento: req.body.empleado.fecha_vence_documento,
                                    chofer: req.body.empleado.chofer
                                }, {
                                    where: {
                                        id: req.body.empleado.id
                                    }, transaction: t
                                }).then(function (medicoPacienteActualizado) {
                                    var personaReferencia = req.body.personaReferencia
                                    if (req.body.empleado.chofer) {
                                        return RrhhViajeConductor.find({
                                            where: { id_empleado: req.body.empleado.id }, transaction: t
                                        }).then(function (conductor) {
                                            var nombre = ""
                                            if (req.body.empleado.persona.segundo_nombre) {
                                                nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.segundo_nombre + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                            } else {
                                                nombre = req.body.empleado.persona.nombres + ' ' + req.body.empleado.persona.apellido_paterno + ' ' + req.body.empleado.persona.apellido_materno
                                            }
                                            if (conductor) {
                                                return RrhhViajeConductor.update({
                                                    nombre: nombre,
                                                    licencia: req.body.empleado.persona.ci,
                                                    id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                                }, {
                                                    where: { id: conductor.id }, transaction: t
                                                }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferencia, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            } else {

                                                return RrhhViajeConductor.create({
                                                    nombre: nombre,
                                                    licencia: req.body.empleado.persona.ci,
                                                    id_empleado: req.body.empleado.id,
                                                    habilitado: true,
                                                    id_empresa: req.body.empleado.id_empresa,
                                                    id_tipo_licencia: req.body.empleado.conductor.tipoLicencia.id,
                                                }, { transaction: t }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferencia, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            }
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    } else {
                                        return RrhhViajeConductor.find({
                                            where: { id_empleado: req.body.empleado.id }, transaction: t
                                        }).then(function (conductor) {
                                            if (conductor) {
                                                return RrhhViajeConductor.update({
                                                    habilitado: false,
                                                    id_tipo_licencia: req.body.conductor.tipoLicencia.id,
                                                }, {
                                                    where: { id: conductor.id }, transaction: t
                                                }).then(function (conductorCreado) {
                                                    return guardarDatosFicha(t, req, res, personaReferencia, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                            } else {
                                                return guardarDatosFicha(t, req, res, personaReferencia, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior)
                                            }
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
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

                        }
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            }).then(function (result) {
                //var datos = result[2][1]
                RrhhEmpleadoFicha.findAll({
                    limit: 1,
                    where: {
                        id_empleado: req.body.empleado.id
                    },
                    include: [{ model: Clase, as: 'tipoContrato' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                    { model: Clase, as: 'tipoPersonal' },
                    { model: Clase, as: 'cargaHorario' },
                    { model: Clase, as: 'area' },
                    { model: Clase, as: 'ubicacion' },
                    { model: Clase, as: 'seguroSalud' },
                    { model: Clase, as: 'lugarSeguroSalud' },
                    { model: Clase, as: 'aporteSeguroLargoPlazo' },
                    { model: Clase, as: 'lugarSeguroLargoPlazo' },
                    { model: Clase, as: 'banco' },
                    { model: RrhhEmpleadoDiscapacidad, as: 'discapacidades', include: [{ model: Clase, as: "discapacidad" }] },
                    /* { model: RrhhEmpleadoFichaFamiliar, as: 'familiares' },*/
                    { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: "tipoSeguro" }] },
                    {
                        model: MedicoPaciente, as: 'empleado',
                        include: [{ model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                        { model: Clase, as: 'extension' }, { model: Clase, as: 'tipoDocumento' },
                        {
                            model: Persona, as: 'persona',
                            include: [{ model: Clase, as: 'genero' },
                            { model: Clase, as: 'pais' },
                            { model: Clase, as: 'ciudad' },
                            { model: Clase, as: 'provincia' },
                            { model: Clase, as: 'localidad' },
                            { model: Clase, as: 'estadoCivil' }]
                        }]
                    }, { model: Persona, as: 'personaReferencia' }],
                    order: [['id', 'DESC']]
                }).then(function (fichas) {
                    var fichaActual = fichas[0]
                    res.json({ message: "Ficha empleado actualizada satisfactoriamente!", fichaActual: fichaActual, fichaAnterior: req.body.fichaAnterior })

                })

            }).catch(function (err) {
                res.json({ hasError: true, message: err.stack ? err.stack : err });
            });
        })

    function guardarDatosFicha(t, req, res, personaReferenciaCreada, Persona, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoCargo, RrhhEmpleadoDiscapacidad, fichaAnterior) {
        var provincia = (req.body.empleado.persona.provincia) ? req.body.empleado.persona.provincia.id : null
        var localidad = (req.body.empleado.persona.localidad) ? req.body.empleado.persona.localidad.id : null
        var ciudad = (req.body.empleado.persona.ciudad) ? req.body.empleado.persona.ciudad.id : null

        var nombre = (req.body.empleado.persona.apellido_paterno != undefined || req.body.empleado.persona.apellido_paterno != null ? req.body.empleado.persona.apellido_paterno : '')
            + ' ' + (req.body.empleado.persona.apellido_materno != undefined || req.body.empleado.persona.apellido_materno != null ? req.body.empleado.persona.apellido_materno : '')
            + ' ' + (req.body.empleado.persona.nombres != undefined || req.body.empleado.persona.nombres != null ? req.body.empleado.persona.nombres : '')
            + ' ' + (req.body.empleado.persona.segundo_nombre != undefined || req.body.empleado.persona.segundo_nombre != null ? req.body.empleado.persona.segundo_nombre : '')
        return Persona.update({
            nombres: req.body.empleado.persona.nombres,
            segundo_nombre: req.body.empleado.persona.segundo_nombre ? req.body.empleado.persona.segundo_nombre : "",
            apellido_paterno: req.body.empleado.persona.apellido_paterno,
            apellido_materno: req.body.empleado.persona.apellido_materno,
            ci: req.body.empleado.persona.ci,
            id_genero: req.body.empleado.persona.genero.id,
            nombre_completo: nombre,
            telefono: req.body.empleado.persona.telefono,
            telefono_movil: req.body.empleado.persona.telefono_movil,
            correo_electronico: req.body.empleado.persona.correo_electronico,
            id_estado_civil: req.body.empleado.persona.estadoCivil ? req.body.empleado.persona.estadoCivil.id : null,
            direccion_zona: req.body.empleado.persona.direccion_zona,
            direccion_numero: req.body.empleado.persona.direccion_numero,
            id_pais_nacimiento: req.body.empleado.persona.pais ? req.body.empleado.persona.pais.id : null,
            id_ciudad_nacimiento: ciudad,
            id_provincia_nacimiento: provincia,
            id_localidad_nacimiento: localidad,
            apellido_casada: req.body.empleado.persona.apellido_casada,
            segundo_nombre: req.body.empleado.persona.segundo_nombre,
            fecha_nacimiento: req.body.empleado.persona.fecha_nacimiento
        }, {
            where: {
                id: req.body.empleado.persona.id
            }, transaction: t
        }).then(function (EmpleadoPersonaActualizado) {
            var haber = parseFloat(req.body.haber_basico)
            var numero_literal = NumeroLiteral.Convertir(parseFloat(req.body.haber_basico).toFixed(2).toString());
            var inicio = new Date(req.body.fecha_inicio2); inicio.setHours(0, 0, 0, 0, 0);

            condicionFicha = { id: req.body.id };
            return RrhhEmpleadoFicha.find({
                where: condicionFicha, transaction: t

            }).then(function (ficha) {
                var contrato = fechaATexto(ficha.fecha_inicio)
                var fechaconT = fechaATexto(inicio)
                if (ficha.activo) {
                    return RrhhEmpleadoFicha.update({
                        discapacidad: req.body.discapacidad,
                        detalle_discapacidades: req.body.detalle_discapacidades,
                        id_caracteristica_discapacidad: req.body.caracteristica_discapacidad ? req.body.caracteristica_discapacidad.id : null,
                        vencimiento_carnet_discapacidad: req.body.vencimiento_carnet_discapacidad.length ? req.body.vencimiento_carnet_discapacidad.split('/').reverse().join('-') + "T04:00:00.000Z" : null,
                        codigo_tributario: req.body.codigo_tributario ? req.body.codigo_tributario.toString() : '',
                        id_empleado: req.body.empleado.id,
                        fecha: req.body.fecha_elaboracion,
                        //codigo_empleado: req.body.codigo_empleado,
                        id_tipo_contrato: req.body.tipoContrato.id,
                        fecha_inicio: req.body.fecha_inicio2,
                        fecha_fin: req.body.fecha_fin2,
                        id_tipo_personal: req.body.tipoPersonal ? req.body.tipoPersonal.id : null,
                        id_carga_horarios: req.body.cargaHorario ? req.body.cargaHorario.id : null,
                        id_area: req.body.area ? req.body.area.id : null,
                        id_ubicacion: req.body.ubicacion ? req.body.ubicacion.id : null,
                        haber_basico: haber,
                        haber_basico_literal: numero_literal,
                        //contrato: req.body.alergia_quimico,
                        jubilacion: req.body.jubilacion,
                        fecha_jubilacion: req.body.fecha_jubilacion ? req.body.fecha_jubilacion : null,
                        id_persona_referencia: personaReferenciaCreada ? personaReferenciaCreada.id : null,
                        matricula_seguro: req.body.matricula_seguro,
                        id_seguro_salud: req.body.seguroSalud ? req.body.seguroSalud.id : null,
                        id_lugar_seguro_salud: req.body.lugarSeguroSalud ? req.body.lugarSeguroSalud.id : null,
                        seguro_salud_carnet: req.body.seguro_salud_carnet,
                        nua_seguro_largo_plazo: req.body.nua_seguro_largo_plazo,
                        id_aporte_seguro_largo_plazo: req.body.aporteSeguroLargoPlazo ? req.body.aporteSeguroLargoPlazo.id : null,
                        id_lugar_seguro_largo_plazo: req.body.lugarSeguroLargoPlazo ? req.body.lugarSeguroLargoPlazo.id : null,
                        numero_cuenta: req.body.numero_cuenta,
                        id_banco: req.body.banco ? req.body.banco.id : null,
                        horas_extra: req.body.horas_extra,
                        encargado_area: req.body.encargado_area,
                        total_ganado_fijo: req.body.total_ganado_fijo,
                        monto_total_ganado: req.body.monto_total_ganado,
                        bono_dias: req.body.bono_dias,
                        costo_campo: req.body.costo_campo,
                        costo_descanso: req.body.costo_descanso,
                        horas_extra_dia_campo: req.body.horas_extra_dia_campo,
                        horas_campo: req.body.horas_campo
                    }, {
                        where: { id: ficha.id }, transaction: t
                    }).then(function (actualizado) {
                        if (req.body.contrato2) {
                            fs.writeFileSync('./contratos/contrato-' + ficha.id + "-" + req.body.contrato2.name, req.body.contrato2.data, 'binary', function (err) {
                                if (err)
                                    console.log(err);
                                else
                                    console.log("The file was saved!");
                            });

                            return RrhhEmpleadoFicha.update({
                                contrato: req.body.contrato2.name
                            }, {
                                where: { id: ficha.id }, transaction: t
                            }).then(function (affecteedRows) {
                                return guardarOtrosSeguros(t, req, res, Persona, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
                            });
                        } else {
                            return guardarOtrosSeguros(t, req, res, Persona, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })

                } else {
                    return RrhhEmpleadoFicha.update({
                        activo: false
                    }, {
                        where: { id: ficha.id }, transaction: t
                    }).then(function (actualizado) {
                        if (req.body.ultimaAccion) {
                            console.table(req.body.ultimaAccion)
                        }
                        return RrhhEmpleadoBitacoraFicha.create({
                            id_ficha: ficha.id,
                            campo: 'Termino de contrato',
                            valor_anterior: "Contrato Activo",
                            valor_actual: req.body.ultimaAccion ? req.body.ultimaAccion.nombre : "Termino de contrato",
                            fecha: Date.now(),
                            id_usuario: req.body.quienModifico
                        }, { transaction: t }).then(function (bitacoraCreada) {
                            return RrhhEmpleadoFicha.create({
                                id_caracteristica_discapacidad: req.body.caracteristica_discapacidad ? req.body.caracteristica_discapacidad.id : null,
                                vencimiento_carnet_discapacidad: req.body.vencimiento_carnet_discapacidad.length ? req.body.vencimiento_carnet_discapacidad.split('/').reverse().join('-') + "T04:00:00.000Z" : null,
                                discapacidad: req.body.discapacidad,
                                codigo_tributario: req.body.codigo_tributario ? req.body.codigo_tributario.toString() : '',
                                detalle_discapacidades: req.body.detalle_discapacidades,
                                id_empleado: req.body.empleado.id,
                                fecha: req.body.fecha_elaboracion,
                                //codigo_empleado: req.body.codigo_empleado,
                                id_tipo_contrato: req.body.tipoContrato ? req.body.tipoContrato.id : null,
                                fecha_inicio: req.body.fecha_inicio2,
                                fecha_fin: req.body.fecha_fin2,
                                id_tipo_personal: req.body.tipoPersonal ? req.body.tipoPersonal.id : null,
                                id_carga_horarios: req.body.cargaHorario ? req.body.cargaHorario.id : null,
                                id_area: req.body.area ? req.body.area.id : null,
                                id_ubicacion: req.body.ubicacion ? req.body.ubicacion.id : null,
                                haber_basico: haber,
                                haber_basico_literal: numero_literal,
                                //contrato: req.body.alergia_quimico,
                                jubilacion: req.body.jubilacion,
                                fecha_jubilacion: req.body.fecha_jubilacion ? req.body.fecha_jubilacion : null,
                                id_persona_referencia: personaReferenciaCreada ? personaReferenciaCreada.id : null,
                                matricula_seguro: req.body.matricula_seguro,
                                id_seguro_salud: req.body.seguroSalud ? req.body.seguroSalud.id : null,
                                id_lugar_seguro_salud: req.body.lugarSeguroSalud ? req.body.lugarSeguroSalud.id : null,
                                seguro_salud_carnet: req.body.seguro_salud_carnet,
                                nua_seguro_largo_plazo: req.body.nua_seguro_largo_plazo,
                                id_aporte_seguro_largo_plazo: req.body.aporteSeguroLargoPlazo ? req.body.aporteSeguroLargoPlazo.id : null,
                                id_lugar_seguro_largo_plazo: req.body.lugarSeguroLargoPlazo ? req.body.lugarSeguroLargoPlazo.id : null,
                                numero_cuenta: req.body.numero_cuenta,
                                id_banco: req.body.banco ? req.body.banco.id : null,
                                activo: true,
                                horas_extra: req.body.horas_extra,
                                encargado_area: req.body.encargado_area,
                                total_ganado_fijo: req.body.total_ganado_fijo,
                                monto_total_ganado: req.body.monto_total_ganado,
                                bono_dias: req.body.bono_dias,
                                costo_campo: req.body.costo_campo,
                                costo_descanso: req.body.costo_descanso,
                                horas_extra_dia_campo: req.body.horas_extra_dia_campo,
                                horas_campo: req.body.horas_campo,
                                id_campo: req.body.empleado.id_campo
                            }, { transaction: t }).then(function (medicoPacientefichaCreado) {
                                return RrhhEmpleadoBitacoraFicha.create({
                                    id_ficha: medicoPacientefichaCreado.id,
                                    campo: 'Nuevo Contrato',
                                    valor_anterior: "Id anterior:" + fichaAnterior.id + " Contrato: " + fichaAnterior.tipoContrato.nombre,
                                    valor_actual: req.body.ultimaAccion ? req.body.ultimaAccion.nombre : "Nuevo Contrato",
                                    fecha: Date.now(),
                                    id_usuario: req.body.usuario_en_uso
                                }, { transaction: t }).then(function (bitacoraCreada) {
                                    if (req.body.contrato2) {
                                        fs.writeFileSync('./contratos/contrato-' + medicoPacientefichaCreado.id + "-" + req.body.contrato2.name, req.body.contrato2.data, 'binary', function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("The file was saved!");
                                        });
                                        return RrhhEmpleadoFicha.update({
                                            contrato: req.body.contrato2.name
                                        }, {
                                            where: { id: medicoPacientefichaCreado.id }, transaction: t
                                        }).then(function (affecteedRows) {
                                            return guardarOtrosSeguros(t, req, res, Persona, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, medicoPacientefichaCreado, fichaAnterior)
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        });
                                    } else {
                                        return guardarOtrosSeguros(t, req, res, Persona, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, medicoPacientefichaCreado, fichaAnterior)
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
                        })
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
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
    }
    function guardarOtrosSeguros(t, req, res, Persona, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior) {
        if (req.body.otrosSeguros.length > 0) {
            var promises = []
            req.body.otrosSeguros.forEach(function (seguroSalud, index, array) {
                if (seguroSalud.id) {
                    if (seguroSalud.eliminado != true) {
                        promises.push(RrhhEmpleadoFichaOtrosSeguros.update({
                            id_ficha: ficha.id,
                            id_tipo_seguro: seguroSalud.tipoSeguro.id,
                            monto: seguroSalud.monto,
                            observacion: seguroSalud.observacion,
                        }, {
                            where: { id: seguroSalud.id }, transaction: t
                        }).then(function (seguroCreado) {
                            /*  if (index === (array.length - 1)) {
                                 return guardarFamiliares(t,req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
 
                             } */
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        }));
                    } else {
                        promises.push(RrhhEmpleadoFichaOtrosSeguros.destroy({
                            where: {
                                id: seguroSalud.id
                            }, transaction: t
                        }).then(function (SeguroEliminado) {
                            /*  if (index === (array.length - 1)) {
                                 return guardarFamiliares(req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
 
                             } */
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        }));
                    }
                } else {
                    promises.push(RrhhEmpleadoFichaOtrosSeguros.create({
                        id_ficha: ficha.id,
                        id_tipo_seguro: seguroSalud.tipoSeguro.id,
                        monto: seguroSalud.monto,
                        observacion: seguroSalud.observacion,
                    }, { transaction: t }).then(function (seguroCreado) {
                        /*   if (index === (array.length - 1)) {
                              guardarFamiliares(req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
  
                          } */
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }));
                }
            })
            promises.push(guardarFamiliares(t, req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior))
            return Promise.all(promises)
        } else {
            return guardarFamiliares(t, req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
        }
    }
    function guardarFamiliares(t, req, res, Persona, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior) {
        if (req.body.empleado.familiares.length > 0) {
            var promises = []
            req.body.empleado.familiares.forEach(function (familiar, index, array) {
                if (familiar.id) {
                    if (familiar.eliminado != true) {
                        promises.push(Persona.update({
                            nombres: familiar.persona.nombres,
                            segundo_nombre: familiar.persona.segundo_nombre ? familiar.persona.segundo_nombre : "",

                            apellido_paterno: familiar.persona.apellido_paterno,
                            apellido_materno: familiar.persona.apellido_materno,
                            fecha_nacimiento: familiar.persona.fecha_nacimiento,
                            id_genero: familiar.persona.genero.id,
                        }, {
                            where: {
                                id: familiar.persona.id
                            }, transaction: t
                        }).then(function (personaActualizada) {

                            return RrhhEmpleadoFichaFamiliar.update({
                                id_empleado: req.body.empleado.id,
                                id_persona_familiar: familiar.persona.id,
                                id_relacion: familiar.relacion.id,
                                afiliado: familiar.persona.afiliado,
                            }, {
                                where: { id: familiar.id }, transaction: t
                            }).then(function (empleadoFamiliarActulizado) {
                                /*  if (index === (array.length - 1)) {
                                     guardarCargo(req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
 
                                 } */
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })

                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        }));
                    } else {
                        promises.push(RrhhEmpleadoFichaFamiliar.destroy({
                            where: {
                                id: familiar.id
                            }, transaction: t
                        }).then(function (RelacionEliminado) {
                            return Persona.destroy({
                                where: {
                                    id: familiar.persona.id
                                }, transaction: t
                            }).then(function (FamiliarEliminado) {
                                /* if (index === (array.length - 1)) {
                                    guardarCargo(req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
 
                                } */
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        }));
                    }
                } else {
                    promises.push(Persona.create({
                        nombres: familiar.persona.nombres,
                        segundo_nombre: familiar.persona.segundo_nombre ? familiar.persona.segundo_nombre : "",
                        apellido_paterno: familiar.persona.apellido_paterno,
                        apellido_materno: familiar.persona.apellido_materno,
                        fecha_nacimiento: familiar.persona.fecha_nacimiento,
                        id_genero: familiar.persona.genero.id,
                    }, { transaction: t }).then(function (personaCreada) {
                        return RrhhEmpleadoFichaFamiliar.create({
                            id_empleado: req.body.empleado.id,
                            id_persona_familiar: personaCreada.id,
                            id_relacion: familiar.relacion.id,
                            afiliado: familiar.persona.afiliado,
                            referencia: familiar.referencia
                        }, { transaction: t }).then(function (RrhhEmpleadoFichaFamiliarCreado) {
                            /* if (index === (array.length - 1)) {
                                guardarCargo(req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
                            } */
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })

                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }));
                }
            });
            promises.push(guardarCargo(t, req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior))
            return Promise.all(promises)
        } else {
            return guardarCargo(t, req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior)
        }
    }
    function guardarCargo(t, req, res, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ficha, fichaAnterior) {
        return RrhhEmpleadoCargo.destroy({
            where: {
                id_ficha: ficha.id
            }, transaction: t
        }).then(function (EmpleadoCargosActualizada) {
            var cargoPrincipal = req.body.cargoPrincipal ? req.body.cargoPrincipal.id : 0;
            if (req.body.cargo.length > 0) {
                var promises = []
                req.body.cargo.forEach(function (cargo, index, array) {
                    promises.push(RrhhEmpleadoCargo.findOrCreate({
                        where: { id_ficha: ficha.id, id_cargo: cargo.id },
                        defaults: {
                            /*  id_empleado: req.body.empleado.id, */
                            id_cargo: cargo.id,
                            id_ficha: ficha.id,
                            principal: cargoPrincipal == cargo.id ? true : false
                        }, transaction: t,
                        lock: t.LOCK.UPDATE
                    }).spread(function (cargoEncontrado, created) {
                        if (!created) {
                            return RrhhEmpleadoCargo.update({
                                /* id_empleado: req.body.empleado.id, */
                                id_cargo: cargo.id,
                                id_ficha: ficha.id,
                                principal: cargoPrincipal == cargo.id ? true : false
                            }, {
                                where: { id_ficha: ficha.id, id_cargo: cargo.id }, transaction: t
                            }).then(function (actualizado) {
                                /*  if (index === (array.length - 1)) {
                                     guardarSeguros(RrhhEmpleadoDiscapacidad, req, req.body.empleado, res, fichaAnterior, ficha)
                                 } */
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })

                        } else {
                            /*  if (index === (array.length - 1)) {
                                 guardarSeguros(RrhhEmpleadoDiscapacidad, req, req.body.empleado, res, fichaAnterior, ficha)
                             } */
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }));
                });
                promises.push(guardarSeguros(t, RrhhEmpleadoDiscapacidad, req, req.body.empleado, res, fichaAnterior, ficha))
                return Promise.all(promises)
            } else {
                return new Promise(function (fulfill, reject) {
                    reject("ERROR: Sin asignación de cargo, no se guardaron los datos.");
                });
                //return guardarSeguros(t, RrhhEmpleadoDiscapacidad, req, req.body.empleado, res, fichaAnterior, ficha)
            }
        })
    }
    function guardarSeguros(t, RrhhEmpleadoDiscapacidad, req, empleado, res, fichaAnterior, ficha) {
        var discapacidades = req.body.discapacidades
        return RrhhEmpleadoDiscapacidad.destroy({
            where: {
                id_ficha: ficha.id,
            }, transaction: t
        }).then(function (EmpleadoDiscapacidadesActualizada) {
            if (discapacidades.length > 0) {
                var promises = []
                req.body.discapacidades.forEach(function (discapacidad, index, array) {
                    promises.push(RrhhEmpleadoDiscapacidad.findOrCreate({
                        where: { id_ficha: ficha.id, id_discapacidad: discapacidad.id },
                        defaults: {
                            id_ficha: ficha.id,
                            id_discapacidad: discapacidad.id
                        }, transaction: t,
                        lock: t.LOCK.UPDATE
                    }).spread(function (discapacidadEncontrada, created) {
                        if (!created) {
                            return RrhhEmpleadoDiscapacidad.update({
                                id_ficha: ficha.id,
                                id_discapacidad: discapacidad.id
                            }, {
                                where: { id_ficha: ficha.id, id_discapacidad: discapacidad.id }, transaction: t
                            }).then(function (actualizado) {
                                /* if (index === (array.length - 1)) {
                                    guardarHistorialVacacion(RrhhEmpleadoHistorialVacacion, req, res, empleado, true, fichaAnterior, ficha)
                                    res.json({ message: "Ficha empleado actualizada satisfactoriamente!" })
                                } */
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })

                        } else {
                            /*  if (index === (array.length - 1)) {
                                 guardarHistorialVacacion(RrhhEmpleadoHistorialVacacion, req, res, empleado, true, fichaAnterior, ficha)
 
                             } */
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }));

                })
                promises.push(guardarHistorialVacacion(t, RrhhEmpleadoHistorialVacacion, req, res, empleado, true, fichaAnterior, ficha))
                return Promise.all(promises)
            } else {
                return guardarHistorialVacacion(t, RrhhEmpleadoHistorialVacacion, req, res, empleado, true, fichaAnterior, ficha)

            }
        })
    }
    function guardarHistorialVacacion(t, RrhhEmpleadoHistorialVacacion, req, res, empleado, upload, fichaAnterior, ficha) {
        if (req.body.historialVacacion.length > 0) {
            /* RrhhEmpleadoHistorialVacacion.update({
                eliminado: true,
            }, {
                    where: { id_empleado: empleado.id }
                }).then(function (historialActualizado) { */
            /* req.body.historialVacacion.forEach(function (historial, index, array) { */
            var contador = 0
            var promises = []
            for (var i = 0; i < req.body.historialVacacion.length; i++) {
                var historial = req.body.historialVacacion[i];
                promises.push(RrhhEmpleadoHistorialVacacion.create({
                    aplicadas: historial.aplicadas,
                    tomadas: historial.tomadas,
                    anio: historial.anio,
                    gestion: historial.gestion,
                    /* id_empleado: empleado.id, */
                    eliminado: false,
                    id_ficha: ficha.id
                }, { transaction: t }).then(function (historialCreado) {

                    /* if (contador == (req.body.historialVacacion.length - 1)) {
                        if (upload) {
 
                            guardarBitacoraCambiosFicha(fichaAnterior, empleado, req, res)
 
 
                        } else {
 
                        }
                    }
                    contador++ */
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                }));
            }
            promises.push(guardarBitacoraCambiosFicha(t, fichaAnterior, empleado, req, res))
            return Promise.all(promises)

            /* }) */
            /* }); */

        } else {
            return guardarBitacoraCambiosFicha(t, fichaAnterior, empleado, req, res)

        }
    }
    router.route('/usuario-ficha/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFicha.findAll({
                where: { id_empleado: req.params.id_empleado, contrato: { $ne: null } },

            }).then(function (empleado) {
                res.json(empleado)

            })
        })
    router.route('/usuario-hoja-vida/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoHojaVida.find({
                where: { id_empleado: req.params.id_empleado },
                include: [{ model: RrhhEmpleadoCapacidadInternaExterna, as: 'capacidades', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoCapacidad', required: false }] },
                { model: RrhhEmpleadoLogroInternoExterno, as: 'logros', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoLogro', required: false }] },
                { model: RrhhEmpleadoExperienciaLaboral, as: 'experienciasLaborales', where: { eliminado: false }, required: false },
                {
                    model: RrhhEmpleadoFormacionAcademica, as: 'formacionesAcademicas', where: { eliminado: false }, required: false,
                    include: [{ model: Clase, as: 'grado', required: false }, { model: Clase, as: 'institucion', required: false }, { model: Clase, as: 'titulo', required: false }]
                }]
            }).then(function (HojaVida) {
                res.json({ hojaVida: HojaVida })
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id) {
                guardarRrhhHojaVidaFormacionAcademica(req, res, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
            } else {
                RrhhEmpleadoHojaVida.create({
                    id_empleado: req.params.id_empleado
                }).then(function (hojaVidaCreado) {
                    guardarRrhhHojaVidaFormacionAcademica(req, res, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, hojaVidaCreado)
                })
            }
        })

    function guardarRrhhHojaVidaFormacionAcademica(req, res, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, hojaVidaCreado) {
        var idhojaVida = 0
        if (hojaVidaCreado) {
            idhojaVida = hojaVidaCreado.id
        } else {
            idhojaVida = req.body.id
        }
        if (req.body.formacionesAcademicas.length > 0) {
            req.body.formacionesAcademicas.forEach(function (formacionAcademica, index, array) {
                var idformacion = 0
                let docPath = null
                if (formacionAcademica.id) {
                    idformacion = formacionAcademica.id
                }
                if (!formacionAcademica.eliminado) {
                    RrhhEmpleadoFormacionAcademica.findOrCreate({
                        where: { id: idformacion },
                        defaults: {
                            id_hoja_vida: idhojaVida,
                            id_grado: formacionAcademica.grado.id,
                            id_titulo: formacionAcademica.titulo.id,
                            id_institucion: formacionAcademica.institucion.id,
                            descripcion: formacionAcademica.descripcion,
                            anio_obtencion: formacionAcademica.anio_obtencion
                        }
                    }).spread(function (formacion, created) {
                        let idRespaldoFormacion = formacion ? formacion.id : formacionAcademica.id
                        if (formacionAcademica.sin_respaldo) {
                            if (formacionAcademica.documento) eliminarRecurso(formacionAcademica.documento)
                            formacionAcademica.documento = null
                        }
                        if (!formacionAcademica.documento && formacionAcademica.respaldo) {
                            if (formacionAcademica.respaldo.ext === ".pdf") {
                                docPath = "./documentos/rrhh/respaldos/formacion/" + req.body.id_empleado + "_" + idRespaldoFormacion + formacionAcademica.respaldo.ext
                                fs.writeFileSync(docPath, formacionAcademica.respaldo.data, 'binary', (err) => console.log(err ? err : "The file was saved!"));
                            } else {
                                docPath = "./documentos/rrhh/respaldos/formacion/" + req.body.id_empleado + "_" + idRespaldoFormacion + formacionAcademica.respaldo.ext
                                var docRespaldo = decodeBase64Image(formacionAcademica.respaldo.data);
                                fs.writeFileSync(docPath, docRespaldo.data, 'base64', function (err) { });
                            }
                        } else {
                            docPath = formacionAcademica.documento ? formacionAcademica.documento : null;
                        }
                        if (!created) {
                            RrhhEmpleadoFormacionAcademica.update({
                                id_grado: formacionAcademica.grado.id,
                                id_titulo: formacionAcademica.titulo.id,
                                id_institucion: formacionAcademica.institucion.id,
                                descripcion: formacionAcademica.descripcion,
                                anio_obtencion: formacionAcademica.anio_obtencion,
                                documento: docPath
                            }, {
                                where: { id: formacionAcademica.id }
                            }).then(function (actualizado) {
                                if (index === (array.length - 1)) {
                                    guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                                }
                            })
                        } else {
                            if (!formacionAcademica.documento && docPath) {
                                RrhhEmpleadoFormacionAcademica.update({
                                    documento: docPath
                                }, { where: { id: formacion.id } })
                                    .then(act => {
                                        if (index === (array.length - 1)) {
                                            guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                                        }
                                    })
                            } else if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                            }
                        }
                    })
                } else {
                    if (formacionAcademica.id) {
                        RrhhEmpleadoFormacionAcademica.update({
                            eliminado: true
                        }, {
                            where: { id: formacionAcademica.id }
                        }).then(function (formacionEliminada) {
                            if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                            }
                        })
                    } else {
                        if (index === (array.length - 1)) {
                            guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                        }
                    }
                }
            })
        } else {
            guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
        }
    }
    function guardarRrhhHojaVidaExperienciaLaboral(req, res, idhojaVida, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna) {
        if (req.body.experienciasLaborales.length > 0) {
            req.body.experienciasLaborales.forEach(function (experienciaLaboral, index, array) {
                var idexperiencia = 0
                let docPath = null
                if (experienciaLaboral.id) {
                    idexperiencia = experienciaLaboral.id
                }
                if (!experienciaLaboral.eliminado) {
                    RrhhEmpleadoExperienciaLaboral.findOrCreate({
                        where: { id: idexperiencia },
                        defaults: {
                            id_hoja_vida: idhojaVida,
                            fecha_inicio: experienciaLaboral.fecha_inicio,
                            fecha_fin: experienciaLaboral.fecha_fin,
                            empresa: experienciaLaboral.empresa,
                            cargo: experienciaLaboral.cargo,
                            motivo_retiro: experienciaLaboral.motivo_retiro,
                            contacto: experienciaLaboral.contacto,
                            telefono: experienciaLaboral.telefono ? Number(experienciaLaboral.telefono) : 0
                        }
                    }).spread(function (experiencia, created) {
                        let idRespaldoExperiencia = experiencia ? experiencia.id : experienciaLaboral.id;
                        if (experienciaLaboral.sin_respaldo) {
                            if (experienciaLaboral.documento) eliminarRecurso(experienciaLaboral.documento)
                            experienciaLaboral.documento = null
                        }
                        if (!experienciaLaboral.documento && experienciaLaboral.respaldo) {
                            if (experienciaLaboral.respaldo.ext === ".pdf") {
                                docPath = "./documentos/rrhh/respaldos/experiencia/" + req.body.id_empleado + "_" + idRespaldoExperiencia + experienciaLaboral.respaldo.ext
                                fs.writeFileSync(docPath, experienciaLaboral.respaldo.data, 'binary', (err) => console.log(err ? err : "The file was saved!"));
                            } else {
                                docPath = "./documentos/rrhh/respaldos/experiencia/" + req.body.id_empleado + "_" + idRespaldoExperiencia + experienciaLaboral.respaldo.ext
                                var docRespaldo = decodeBase64Image(experienciaLaboral.respaldo.data);
                                fs.writeFileSync(docPath, docRespaldo.data, 'base64', function (err) { });
                            }
                        } else {
                            docPath = experienciaLaboral.documento ? experienciaLaboral.documento : null;
                        }
                        if (!created) {
                            RrhhEmpleadoExperienciaLaboral.update({
                                fecha_inicio: experienciaLaboral.fecha_inicio,
                                fecha_fin: experienciaLaboral.fecha_fin,
                                empresa: experienciaLaboral.empresa,
                                cargo: experienciaLaboral.cargo,
                                motivo_retiro: experienciaLaboral.motivo_retiro,
                                contacto: experienciaLaboral.contacto,
                                telefono: experienciaLaboral.telefono,
                                documento: docPath
                            }, {
                                where: { id: experienciaLaboral.id }
                            }).then(function (actualizado) {
                                if (index === (array.length - 1)) {
                                    guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                                }
                            })
                        } else {
                            if (!experienciaLaboral.documento && docPath) {
                                RrhhEmpleadoExperienciaLaboral.update({ documento: docPath }, { where: { id: experiencia.id } })
                                    .then(act => {
                                        if (index === (array.length - 1)) {
                                            guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                                        }
                                    })
                            } else if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                            }
                        }
                    })
                } else {
                    if (experienciaLaboral.id) {
                        RrhhEmpleadoExperienciaLaboral.update({
                            eliminado: true
                        }, {
                            where: { id: experienciaLaboral.id }
                        }).then(function (experienciaEliminada) {
                            if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                            }
                        })
                    } else {
                        if (index === (array.length - 1)) {
                            guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
                        }
                    }
                }
            })
        } else {
            guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna)
        }
    }
    function guardarRrhhHojaVidaCapacidades(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna) {
        if (req.body.capacidades.length > 0) {
            req.body.capacidades.forEach(function (capacidad, index, array) {
                var idcapacidad = 0
                let docPath = null
                if (capacidad.id) {
                    idcapacidad = capacidad.id
                }
                if (!capacidad.eliminado) {
                    RrhhEmpleadoCapacidadInternaExterna.findOrCreate({
                        where: { id: idcapacidad },
                        defaults: {
                            id_hoja_vida: idhojaVida,
                            id_tipo_capacidad: capacidad.tipoCapacidad.id,
                            curso: capacidad.curso,
                            institucion: capacidad.institucion,
                            certificado: capacidad.certificado,
                            fecha: capacidad.fecha,
                        }
                    }).spread(function (capacidadCreada, created) {
                        let idRespaldoCapacidad = capacidadCreada ? capacidadCreada.id : capacidad.id
                        if (capacidad.sin_respaldo) {
                            if (capacidad.documento) eliminarRecurso(capacidad.documento)
                            capacidad.documento = null
                        }
                        if (!capacidad.documento && capacidad.respaldo) {
                            if (capacidad.respaldo.ext === ".pdf") {
                                docPath = "./documentos/rrhh/respaldos/capacitacion/" + req.body.id_empleado + "_" + idRespaldoCapacidad + capacidad.respaldo.ext
                                fs.writeFileSync(docPath, capacidad.respaldo.data, 'binary', (err) => console.log(err ? err : "The file was saved!"));
                            } else {
                                docPath = "./documentos/rrhh/respaldos/capacitacion/" + req.body.id_empleado + "_" + idRespaldoCapacidad + capacidad.respaldo.ext
                                var docRespaldo = decodeBase64Image(capacidad.respaldo.data);
                                fs.writeFileSync(docPath, docRespaldo.data, 'base64', function (err) { });
                            }
                        } else {
                            docPath = capacidad.documento ? capacidad.documento : null;
                        }
                        if (!created) {
                            RrhhEmpleadoCapacidadInternaExterna.update({
                                id_tipo_capacidad: capacidad.tipoCapacidad.id,
                                curso: capacidad.curso,
                                institucion: capacidad.institucion,
                                certificado: capacidad.certificado,
                                fecha: capacidad.fecha,
                                documento: docPath
                            }, {
                                where: { id: capacidad.id }
                            }).then(function (actualizado) {
                                if (index === (array.length - 1)) {
                                    guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                                }
                            })
                        } else {
                            if (!capacidad.documento && docPath) {
                                RrhhEmpleadoCapacidadInternaExterna.update({ documento: docPath }, { where: { id: capacidad.id } })
                                    .then(act => {
                                        if (index === (array.length - 1)) {
                                            guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                                        }
                                    })
                            } else if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                            }
                        }
                    })
                } else {
                    if (capacidad.id) {
                        RrhhEmpleadoCapacidadInternaExterna.update({
                            eliminado: true
                        }, {
                            where: { id: capacidad.id }
                        }).then(function (capacidadEliminada) {
                            if (index === (array.length - 1)) {
                                guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                            }
                        })
                    } else {
                        if (!capacidad.documento && docPath) {
                            RrhhEmpleadoCapacidadInternaExterna.update({ documento: docPath }, { where: { id: capacidad.id } })
                                .then(act => {
                                    if (index === (array.length - 1)) {
                                        guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                                    }
                                })
                        } else if (index === (array.length - 1)) {
                            guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
                        }
                    }
                }
            })
        } else {
            guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno)
        }
    }

    function guardarRrhhHojaVidaLogros(req, res, idhojaVida, RrhhEmpleadoLogroInternoExterno) {
        if (req.body.logros.length > 0) {
            req.body.logros.forEach(function (logro, index, array) {
                var idlogro = 0
                let docPath = null
                if (logro.id) {
                    idlogro = logro.id
                }
                if (!logro.eliminado) {
                    RrhhEmpleadoLogroInternoExterno.findOrCreate({
                        where: { id: idlogro },
                        defaults: {
                            id_hoja_vida: idhojaVida,
                            id_tipo_logro: logro.tipoLogro.id,
                            motivo: logro.motivo,
                            institucion: logro.institucion,
                            observacion: logro.observacion,
                            fecha: logro.fecha,
                        }
                    }).spread(function (logroCreada, created) {
                        let idRespaldoLogro = logroCreada ? logroCreada.id : logro.id
                        if (logro.sin_respaldo) {
                            if (logro.documento) eliminarRecurso(logro.documento)
                            logro.documento = null
                        }
                        if (!logro.documento && logro.respaldo) {
                            if (logro.respaldo.ext === ".pdf") {
                                docPath = "./documentos/rrhh/respaldos/logro/" + req.body.id_empleado + "_" + idRespaldoLogro + logro.respaldo.ext
                                fs.writeFileSync(docPath, logro.respaldo.data, 'binary', (err) => console.log(err ? err : "The file was saved!"));
                            } else {
                                docPath = "./documentos/rrhh/respaldos/logro/" + req.body.id_empleado + "_" + idRespaldoLogro + logro.respaldo.ext
                                var docRespaldo = decodeBase64Image(logro.respaldo.data);
                                fs.writeFileSync(docPath, docRespaldo.data, 'base64', function (err) { });
                            }
                        } else {
                            docPath = logro.documento ? logro.documento : null;
                        }
                        if (!created) {
                            RrhhEmpleadoLogroInternoExterno.update({
                                id_tipo_logro: logro.tipoLogro.id,
                                motivo: logro.motivo,
                                institucion: logro.institucion,
                                observacion: logro.observacion,
                                fecha: logro.fecha,
                                documento: docPath
                            }, {
                                where: { id: logro.id }
                            }).then(function (actualizado) {
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
                                }
                            })
                        } else {
                            if (!experienciaLaboral.documento && docPath) {
                                RrhhEmpleadoLogroInternoExterno.update({ documento: docPath }, { where: { id: logro.id } })
                                    .then(act => {
                                        if (index === (array.length - 1)) {
                                            res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
                                        }
                                    })
                            } else if (index === (array.length - 1)) {
                                res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
                            }
                        }
                    })
                } else {
                    if (logro.id) {
                        RrhhEmpleadoLogroInternoExterno.update({
                            eliminado: true
                        }, {
                            where: { id: logro.id }
                        }).then(function (logroEliminada) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
                            }
                        })
                    } else {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
                        }
                    }
                }
            })
        } else {
            res.json({ mensaje: "Hoja de vida guardada satisfactoriamente!" })
        }

    }
    router.route('/recursos-humanos/prestamo/empleado/:id_empleado/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.params.id_empleado == "0") {
                Sucursal.find({
                    where: {
                        numero: 0, id_empresa: req.params.id_empresa
                    }
                }).then(function (SucursalEncontrada) {
                    req.body.empleados.forEach(function (empleado, index, array) {
                        RrhhEmpleadoPrestamo.create({
                            id_empleado: empleado.id,
                            fecha_inicial: req.body.fecha_inicial,
                            monto: req.body.monto,
                            interes_pactado: req.body.interes_pactado,
                            plazo: req.body.plazo,
                            observacion: req.body.observacion,
                            id_usuario: req.body.id_usuario,
                            total: req.body.total,
                            cuota: req.body.cuota,
                            numero_correlativo: SucursalEncontrada.numero_correlativo_prestamo_rrhh + index,
                            id_tipo_prestamo: req.body.tipo_prestamo.id,
                            descuento_planilla: req.body.descuento_planilla
                        }).then(function (empleadoPrestamoCreado) {

                            if (index === (array.length - 1)) {
                                Sucursal.update({
                                    numero_correlativo_prestamo_rrhh: SucursalEncontrada.numero_correlativo_prestamo_rrhh + index + 1
                                }, {
                                    where: { id: SucursalEncontrada.id }
                                }).then(function (actualizada) {
                                    res.json({ mensaje: "Prestamos guardados satisfactoriamente!" })
                                })
                            }
                        })
                    });
                });
            } else {
                Sucursal.find({
                    where: {
                        numero: 0, id_empresa: req.params.id_empresa
                    }
                }).then(function (SucursalEncontrada) {
                    RrhhEmpleadoPrestamo.create({
                        id_empleado: req.params.id_empleado,
                        fecha_inicial: req.body.fecha_inicial,
                        monto: req.body.monto,
                        interes_pactado: req.body.interes_pactado,
                        plazo: req.body.plazo,
                        observacion: req.body.observacion,
                        id_usuario: req.body.id_usuario,
                        total: req.body.total,
                        cuota: req.body.cuota,
                        numero_correlativo: SucursalEncontrada.numero_correlativo_prestamo_rrhh,
                        id_tipo_prestamo: req.body.tipo_prestamo.id,
                        descuento_planilla: req.body.descuento_planilla
                    }).then(function (empleadoPrestamoCreado) {
                        Sucursal.update({
                            numero_correlativo_prestamo_rrhh: SucursalEncontrada.numero_correlativo_prestamo_rrhh + 1
                        }, {
                            where: { id: SucursalEncontrada.id }
                        }).then(function (actualizada) {
                            RrhhEmpleadoPrestamo.find({
                                where: { id: empleadoPrestamoCreado.id },
                                include: [{ model: MedicoPaciente, as: "empleado", include: [{ model: Persona, as: "persona", include: [{ model: Clase, as: 'ciudad' }] }] }]
                            }).then(function (encontrado) {
                                res.json({ mensaje: "Guardado satisfactoriamente!", prestamo: encontrado })
                            })
                        })


                    })
                })

            }
        })
    router.route('/recursos-humanos/prestamo/:id_prestamo')
        .put(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoPrestamo.update({
                monto: req.body.monto,
                interes_pactado: req.body.interes_pactado,
                plazo: req.body.plazo,
                observacion: req.body.observacion,
                total: req.body.total,
                cuota: req.body.cuota
            }, {
                where: { id: req.params.id_prestamo }
            }).then(function (empleadoPrestamoCreado) {
                if (req.body.prestamoPagos.length > 0) {
                    req.body.prestamoPagos.forEach(function (pago, index, array) {
                        RrhhEmpleadoPrestamoPago.update({
                            saldo_anterior: pago.saldo_anterior
                        }, {
                            where: { id: pago.id }
                        }).then(function (params) {
                            res.json({ mensaje: "Actualizado satisfactoriamente!" })
                        })
                    });
                } else {
                    res.json({ mensaje: "Actualizado satisfactoriamente!" })
                }

            })
        })

    router.route('/recursos-humanos/prestamos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/plazo/:plazo/inicio/:inicio/fin/:fin/nombre/:nombre/cuenta-liquida/:cuentas_liquidas')
        .get(ensureAuthorizedlogged, function (req, res) {

            var ordenArreglo = [], condicionPrestamo = {};
            var condicionPersona = {};
            ordenArreglo.push(req.params.columna);
            ordenArreglo.push(req.params.direccion);
            /*   if (req.params.texto_busqueda != 0 || req.params.plazo != 0 || req.params.inicio != 0 || req.params.fin != 0 || req.params.texto_busqueda != 0) { */
            if (req.params.texto_busqueda != 0) {
                var num = parseFloat(req.params.texto_busqueda)
                if (isNaN(num)) {
                    condicionPrestamo = {
                        $or: [
                            {
                                observacion:
                                    { $like: "%" + req.params.texto_busqueda + "%" }

                            }
                        ]
                    };
                } else {
                    condicionPrestamo = {
                        $or: [
                            {
                                monto:
                                    parseFloat(req.params.texto_busqueda)

                            },
                            {
                                numero_correlativo:
                                    parseFloat(req.params.texto_busqueda)

                            }
                        ]
                    };
                }

            }
            if (req.params.plazo != 0) {
                condicionPrestamo.plazo = req.params.plazo
            }
            if (req.params.cuentas_liquidas != 0) {
                condicionPrestamo.cuota = { $eq: 0.00 }

            } else {
                condicionPrestamo.cuota = { $ne: 0.00 }

            }
            if (req.params.inicio != 0 && req.params.fin != 0) {
                var fechaInicial = req.params.inicio == 0 ? new Date(2016, 0, 1, 0, 0, 0) : new Date(req.params.inicio);
                var fechaFinal = req.params.fin == 0 ? new Date() : new Date(req.params.fin);
                condicionPrestamo.fecha_inicial = { $between: [fechaInicial, fechaFinal] }
            }
            if (req.params.nombre != 0) {
                condicionPersona = {
                    $or: [
                        {
                            nombres: {
                                $like: "%" + req.params.nombre + "%"
                            }
                        }
                    ]
                };
            }
            var datosbusqueda = {
                where: condicionPrestamo,
                offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                include: [{ model: Usuario, as: 'usuario' }, { model: RrhhEmpleadoPrestamoPago, as: "prestamoPagos" }, { model: MedicoPaciente, as: "empleado", where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: "campo" }, { model: Persona, as: "persona", where: condicionPersona, include: [{ model: Clase, as: 'ciudad' }] }] }],
                order: [ordenArreglo]
            }
            if (req.params.items_pagina == 0) {
                datosbusqueda = {
                    where: condicionPrestamo,
                    include: [{ model: Usuario, as: 'usuario' }, { model: RrhhEmpleadoPrestamoPago, as: "prestamoPagos" }, { model: MedicoPaciente, as: "empleado", where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: "campo" }, { model: Persona, as: "persona", where: condicionPersona, include: [{ model: Clase, as: 'ciudad' }] }] }],
                    order: [ordenArreglo]
                }
            }
            RrhhEmpleadoPrestamo.findAndCountAll({
                where: condicionPrestamo,
                include: [{ model: RrhhEmpleadoPrestamoPago, as: "prestamoPagos" }, { model: MedicoPaciente, as: "empleado", where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: "campo" }], include: [{ model: Persona, as: "persona", where: condicionPersona, include: [{ model: Clase, as: 'ciudad' }] }] }],
                order: [ordenArreglo]
            }).then(function (data) {
                RrhhEmpleadoPrestamo.findAndCountAll(datosbusqueda).then(function (prestamos) {
                    res.json({ prestamos: prestamos.rows, paginas: Math.ceil(data.count / req.params.items_pagina) });
                });
            })

        })

    router.route('/recursos-humanos/pago-prestamo/:id_prestamo/usuario/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var monto_pagado = 0
            var saldo_anterior = 0
            var a_cuenta_anterior = 0
            var prestamoAnterior = req.body.prestamoPagos[(req.body.prestamoPagos.length - 1)]
            if (req.body.prestamoPagos.length > 0) {
                saldo_anterior = prestamoAnterior.saldo_anterior - prestamoAnterior.monto_pagado /* - req.body.monto_pagado */
                a_cuenta_anterior = prestamoAnterior.a_cuenta_anterior + req.body.monto_pagado
                //req.body.total
            } else {
                saldo_anterior = req.body.total /* - req.body.monto_pagado */
                a_cuenta_anterior = req.body.monto_pagado
            }
            RrhhEmpleadoPrestamoPago.create({
                id_usuario: req.params.id_usuario,
                id_prestamo: req.params.id_prestamo,
                fecha: req.body.pagoFecha,
                monto_pagado: req.body.monto_pagado,
                saldo_anterior: saldo_anterior,
                a_cuenta_anterior: a_cuenta_anterior
            }).then(function (empleadoPrestamoCreado) {
                RrhhEmpleadoPrestamo.update({
                    cuota: req.body.cuota2
                }, {
                    where: { id: req.params.id_prestamo }
                }).then(function (params) {
                    res.json({ mensaje: "Pago efectuado satisfactoriamente!" })
                })
            })
        })
    router.route('/recursos-humanos/empleados/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            MedicoPaciente.findAll({
                where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                include: [
                    { model: Persona, as: 'persona' },
                    { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, limit: 1, order: [['id', 'DESC']] }

                ],
                order: [[{ model: Persona, as: 'persona' }, 'nombre_completo', 'ASC']]
            }).then(function (empleados) {
                /*  if (empleados.length > 0) {
                     empleados.forEach(function (empleado, index, array) {
                         RrhhEmpleadoFicha.findAll({
                             limit: 1,
                             where: {
                                 id_empleado: empleado.id
                             },
                             order: [['id', 'DESC']]
                         }).then(function (fichaActual) {
                             empleado.dataValues.ficha = fichaActual[0]
                             if (index === (array.length - 1)) {
                                 res.json({ empleados: empleados })
                             }
                         })
                     })
 
                 } else {
  */
                res.json({ empleados: empleados })

                /*  }
  */
            })
        })

    // 
    router.route('/recursos-humanos/fichas-empleados/:id_empresa/:inicio/:fin/tipo/:tipo')
        .get(ensureAuthorizedlogged, function (req, res) {
            var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
            var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
            switch (req.params.tipo) {
                case '1':
                    RrhhEmpleadoFicha.findAll({
                        where: { activo: true, fecha_inicio: { $between: [inicio, fin] }, fecha_expiracion: null },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false, where: { eliminado: false },
                            include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichas) {
                        res.json({ fichas: fichas })
                    })
                    break;
                case '2':
                    RrhhEmpleadoFicha.findAll({
                        where: { activo: false, fecha_expiracion: { $between: [inicio, fin] } },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false, where: { eliminado: false },
                            include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichas) {
                        res.json({ fichas: fichas })
                    })
                    break;
                case '3':
                    RrhhEmpleadoFicha.findAll({
                        where: { activo: false, fecha_expiracion: { $between: [inicio, fin] } },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false, where: { eliminado: false },
                            include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichasInactivas) {
                        RrhhEmpleadoFicha.findAll({
                            where: { activo: true, fecha_inicio: { $between: [inicio, fin] }, fecha_expiracion: null },
                            include: [{
                                model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false, where: { eliminado: false },
                                include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                            }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                            { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                        }).then(function (fichasActivas) {
                            let fichas = fichasInactivas.concat(fichasActivas)
                            res.json({ fichas: fichas })
                        })
                    })
                    break;
                default:
                    break;
            }
        })

    router.route('/recursos-humanos/fichas-empleados/:id_empresa/:inicio/:fin/tipo/:tipo/:id_paciente')
        .get(ensureAuthorizedlogged, function (req, res) {
            // var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
            // var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
            switch (req.params.tipo) {
                case '1':
                    RrhhEmpleadoFicha.findAll({
                        where: { id_empleado: req.params.id_paciente, activo: true }, //fecha_inicio: { $between: [inicio, fin] }, fecha_expiracion: null },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false,
                            include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichas) {
                        res.json({ fichas: fichas })
                    })
                    break;
                case '2':
                    RrhhEmpleadoFicha.findAll({
                        where: { id_empleado: req.params.id_paciente, activo: false }, //fecha_expiracion: { $between: [inicio, fin] } },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: true,
                            include: [{ model: Clase, as: 'motivo', required: true, include: [{ model: Tipo, as: 'tipo', required: true, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichas) {
                        res.json({ fichas: fichas })
                    })
                    break;
                case '3':
                    RrhhEmpleadoFicha.findAll({
                        where: { id_empleado: req.params.id_paciente, activo: false }, //fecha_expiracion: { $between: [inicio, fin] } },
                        include: [{
                            model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: true,
                            include: [{ model: Clase, as: 'motivo', required: true, include: [{ model: Tipo, as: 'tipo', required: true, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                        }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                        { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }).then(function (fichasInactivas) {
                        RrhhEmpleadoFicha.findAll({
                            where: { id_empleado: req.params.id_paciente, activo: true }, //fecha_inicio: { $between: [inicio, fin] }, fecha_expiracion: null },
                            include: [{
                                model: RrhhEmpleadoBeneficioSocial, as: 'beneficiosSociales', required: false,
                                include: [{ model: Clase, as: 'motivo', required: false, include: [{ model: Tipo, as: 'tipo', required: false, where: { nombre_corto: 'RRHH_TPMR' } }] }]
                            }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                            { model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                        }).then(function (fichasActivas) {
                            let fichas = fichasInactivas.concat(fichasActivas)
                            res.json({ fichas: fichas })
                        })
                    })
                    break;
                default:
                    res.json({ hasErr: true, mensaje: 'Se produjo un error, no se pueden obtener los datos.' })
                    break;
            }
        })


    router.route('/recursos-humanos/choferes/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhViajeConductor.findAll({
                where: { id_empresa: req.params.id_empresa },
                include: [{ model: Clase, as: 'tipoLicencia' }]
            }).then(function (dato) {
                res.json(dato)
            })
        })
    /* router.route('/recursos-humanos/crearrolturno/:id_empresa')
    .get(ensureAuthorizedlogged,function (req, res) {
        RrhhEmpleadoFicha.findAll({
            include: [{model:MedicoPaciente,as:"empleado",where: { id_empresa: req.params.id_empresa, es_empleado: true },include: [{ model: Persona, as: 'persona' }]}],
        }).then(function (datos) {
            datos.forEach(function(dato,index,array) {
                RrhhEmpleadoRolTurno.create({
 
                    id_ficha: dato.dataValues.id,
                    id_campo: 810,
                    fecha_inicio: new Date(),
                    tipo: 1,
                    dias_trabajado:14,
                    dias_descanso: 7,
                    id_grupo: 4287,
                    eliminado: false
                }).then(function (empleadoRolTurnoCreado) {
                    if(index===(array.length-1)){
                        res.json({ mensaje: "Creado satisfactoriamente!" })
                     }
 
               });
            })
        })
    }) */
    router.route('/recursos-humanos/rolTurno/empleado/:id_empleado')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.fecha_fin = (req.body.fecha_fin == '') ? null : req.body.fecha_fin
            if (req.body.id) {
                RrhhEmpleadoRolTurno.update({
                    /* id_empleado: req.params.id_empleado, */
                    /* id_ficha: req.body.id_ficha, */
                    id_campo: req.body.campo.id,
                    fecha_inicio: req.body.fecha_inicio,
                    fecha_fin: req.body.fecha_fin,
                    tipo: req.body.tipo,
                    dias_trabajado: req.body.dias_trabajado,
                    dias_descanso: req.body.dias_descanso,
                    id_grupo: req.body.grupo ? req.body.grupo.id : null,
                    eliminado: false,
                    turno_dia: req.body.turno_dia,
                    alerta: req.body.alerta,
                    comentario: req.body.comentario,
                    id_clasificacion: req.body.clasificacion ? req.body.clasificacion.id : null
                }
                    , {
                        where: { id: req.body.id }
                    }).then(function (empleadoRolTurnoCreado) {
                        res.json({ mensaje: "Actualizado satisfactoriamente!" })

                    })
            } else {
                RrhhEmpleadoRolTurno.create({
                    /* id_empleado: req.params.id_empleado, */
                    id_ficha: req.body.id_ficha,
                    id_campo: req.body.campo.id,
                    fecha_inicio: req.body.fecha_inicio,
                    fecha_fin: req.body.fecha_fin,
                    tipo: req.body.tipo,
                    dias_trabajado: req.body.dias_trabajado,
                    dias_descanso: req.body.dias_descanso,
                    id_grupo: req.body.grupo.id,
                    eliminado: false,
                    turno_dia: req.body.turno_dia,
                    alerta: req.body.alerta,
                    comentario: req.body.comentario,
                    id_clasificacion: req.body.clasificacion.id
                }).then(function (empleadoRolTurnoCreado) {
                    res.json({ mensaje: "Guardado satisfactoriamente!" })

                })
            }
        })
    router.route('/recursos-humanos/empresa/:id_empresa/rolTurno/empleado/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            if (req.params.id_empleado != 0) {
                RrhhEmpleadoRolTurno.findAll({
                    where: { id_ficha: req.params.id_empleado, eliminado: false },
                    include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'clasificacion' }, { model: Clase, as: 'grupo' }, { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa } }] }]
                }).then(function (empleadoRolesTurno) {
                    res.json({ rolesTurno: empleadoRolesTurno })

                })
            } else {
                MedicoPaciente.findAll({
                    where: { id_empresa: req.params.id_empresa, es_empleado: true },
                    include: [{ model: Persona, as: 'persona' },
                    {
                        model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true },
                        include: [{ model: RrhhEmpleadoRolTurno, as: "rolesTurno", include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'grupo' }, { model: Clase, as: 'clasificacion' }] }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: RrhhEmpleadoVacaciones, as: 'vacaciones', where: { eliminado: false } }, { model: RrhhEmpleadoAusencia, as: 'ausencias', include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] }]
                    }]
                }).then(function (empleadoRolesTurno) {
                    sequelize.query("select min(r.fecha_inicio) as fecha from agil_rrhh_empleado_rol_turno as r\
                    INNER JOIN agil_rrhh_empleado_ficha as f on f.id=r.ficha\
                    inner join agil_medico_paciente as m on m.id=f.id_empleado\
                    where m.empresa="+ req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
                        .then(function (fechaInicio) {
                            res.json({ rolesTurno: empleadoRolesTurno, fechaInicio: fechaInicio[0].fecha })
                        })
                })

                /* RrhhEmpleadoRolTurno.findAll({
                    where: { eliminado: false },
                    include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'grupo' }, { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: RrhhEmpleadoVacaciones, as: 'vacaciones' }, { model: RrhhEmpleadoAusencia, as: 'ausencias', include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] }, { model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }] }] }]
                }).then(function (empleadoRolesTurno) {
                    sequelize.query("select min(fecha_inicio) as fecha from agil_rrhh_empleado_rol_turno;", { type: sequelize.QueryTypes.SELECT })
                        .then(function (fechaInicio) {
                            res.json({ rolesTurno: empleadoRolesTurno, fechaInicio: fechaInicio[0].fecha })
                        })
                }) */
            }
        })
    router.route('/recursos-humanos/empresa/:id_empresa/rolTurnoCalendario/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/grupo/:grupo/nombre/:nombre/campo/:campo')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionRolTurno = {},
                condicionCampo = {},
                condicionEmpleado = {}
            if (req.params.grupo != "0") {
                condicionRolTurno.id_grupo = req.params.grupo
            }
            if (req.params.nombre != "0") {
                condicionEmpleado.nombre_completo = { $like: '%' + req.params.nombre + '%' }
            }
            if (req.params.campo != "0") {
                condicionRolTurno.id_campo = req.params.campo
            }

            if (req.params.inicio != 0 && req.params.fin != 0) {
                var inicio = new Date(req.params.inicio.split('/').reverse()); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin.split('/').reverse()); fin.setHours(23, 59, 59, 0);
                condicionRolTurno.$or = [
                    { fecha_fin: { $between: [inicio, fin] } },
                    { fecha_fin: { $is: null } }
                ]
            }
            RrhhEmpleadoRolTurno.count({
                distinct: true,
                where: condicionRolTurno,
                include: [
                    { model: RrhhEmpleadoRolTurnoNoche, as: 'turnosExtra', required: false, where: { eliminado: false }, include: [{ model: Clase, as: 'tipo' }] },
                    { model: Clase, as: 'campo' },
                    { model: Clase, as: 'grupo' },
                    { model: Clase, as: 'clasificacion' },
                    {
                        model: RrhhEmpleadoFicha, as: 'ficha',
                        include: [
                            { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                            { model: RrhhEmpleadoVacaciones, as: 'vacaciones', required: false, where: { eliminado: false } },
                            { model: RrhhEmpleadoAusencia, as: 'ausencias', required: false, include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] },
                            { model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona', where: condicionEmpleado }] }
                        ]
                    }
                ]
            }).then(function (datos) {
                /*  MedicoPaciente.findAndCountAll({
                     offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                     where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                     include: [{ model: Persona, as: 'persona', where: condicionEmpleado },
                     {
                         model: RrhhEmpleadoFicha, as: 'empleadosFichas',where:{activo:true},
                         include: [{ model: RrhhEmpleadoRolTurno, as: "rolesTurno", where: condicionRolTurno, include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'grupo' }] }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: RrhhEmpleadoVacaciones, as: 'vacaciones' }, { model: RrhhEmpleadoAusencia, as: 'ausencias', include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] }]
                     }]
                 }).then(function (datos) { */
                var offsetW = (req.params.items_pagina * (req.params.pagina - 1));
                var limitW = req.params.items_pagina;
                if (datos < 50) {
                    offsetW = 0;
                    limitW = 0;
                }
                var datosbusqueda = {
                    where: condicionRolTurno,
                    offset: offsetW, limit: limitW,
                    order: sequelize.literal("CAST(clasificacion.nombre_corto AS UNSIGNED INTEGER) ASC, grupo.nombre_corto asc"),
                    include: [
                        { model: RrhhEmpleadoRolTurnoNoche, as: 'turnosExtra', required: false, where: { eliminado: false }, include: [{ model: Clase, as: 'tipo' }] },
                        { model: Clase, as: 'campo' },
                        { model: Clase, as: 'grupo' },
                        { model: Clase, as: 'clasificacion' },
                        {
                            model: RrhhEmpleadoFicha, as: 'ficha',
                            include: [
                                { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                                { model: RrhhEmpleadoVacaciones, as: 'vacaciones', required: false, where: { eliminado: false } },
                                { model: RrhhEmpleadoAusencia, as: 'ausencias', required: false, include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] },
                                { model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona', where: condicionEmpleado }] }
                            ]
                        }
                    ]
                }
                if (req.params.items_pagina == '0') {
                    delete datosbusqueda.offset
                    delete datosbusqueda.limit

                    RrhhEmpleadoRolTurno.findAll(datosbusqueda).then(function (datos2) {
                        if (datos2.length > 0) {
                            var fechas = datos2.map(function (rol) {
                                return rol.fecha_inicio.getTime()
                            })

                            var fechaInicio = new Date(fechas.reduce(function (a, b) {
                                return Math.min(a, b)
                            }));

                            res.json({ rolesTurno: datos2, fechaInicio: fechaInicio, paginas: 1 });
                        } else {
                            res.json({ mensaje: "no se encontro" });
                        }


                    })
                } else {
                    RrhhEmpleadoRolTurno.findAll(datosbusqueda).then(function (datos2) {
                        if (datos2.length > 0) {
                            var fechas = datos2.map(function (rol) {
                                return rol.fecha_inicio.getTime()
                            })

                            var fechaInicio = new Date(fechas.reduce(function (a, b) {
                                return Math.min(a, b)
                            }));

                            res.json({ rolesTurno: datos2, fechaInicio: fechaInicio, paginas: Math.ceil(datos / req.params.items_pagina) });
                        } else {
                            res.json({ mensaje: "no se encontro" });
                        }


                    })
                }
            })
        })

    router.route('/recursos-humanos/empresa/:id_empresa/rolTurno/inicio/:inicio/fin/:fin/alerta/:alerta/grupo/:grupo/pagina/:pagina/items/:items_pagina/campo/:campo/texto_busqueda/:texto_busqueda/direccion/:direccion/columna/:columna')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionRolTurno = { eliminado: false }, ordenArreglo = [], condicionRolTurno = {};
            var orderValue = "`agil_rrhh_empleado_rol_turno`.`id`"
            if (req.params.columna == "nombre") {
                orderValue = "`ficha.empleado.persona`.nombres"
            } else if (req.params.columna == "campo") {
                orderValue = "`campo`.`nombre`"
            } else if (req.params.columna == "f-inicio") {
                orderValue = "`agil_rrhh_empleado_rol_turno`.`fecha_inicio`"
            } else if (req.params.columna == "f-fin") {
                orderValue = "`agil_rrhh_empleado_rol_turno`.`fecha_fin`"
            } else if (req.params.columna == "d-trab") {
                orderValue = "`agil_rrhh_empleado_rol_turno`.`dias_trabajado`"
            } else if (req.params.columna == "d-desc") {
                orderValue = "`agil_rrhh_empleado_rol_turno`.`dias_descanso`"
            } else if (req.params.columna == "grupo") {
                orderValue = "`grupo`.`nombre`"
            }
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio.split('/').reverse()); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin.split('/').reverse()); fin.setHours(23, 59, 59, 0);
                var condicionRolTurno = { eliminado: false, fecha_inicio: { $between: [inicio, fin] } };
            }
            if (req.params.grupo != "0") {
                condicionRolTurno.id_grupo = req.params.grupo
            }
            if (req.params.alerta != "0") {
                condicionRolTurno.alerta = (req.params.alerta == "true") ? true : false
            }
            if (req.params.campo != "0") {
                condicionRolTurno.id_campo = req.params.campo
            }
            RrhhEmpleadoRolTurno.findAndCountAll({
                where: condicionRolTurno,
                include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'grupo' },
                {
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{ model: RrhhEmpleadoVacaciones, as: 'vacaciones', where: { eliminado: false } },
                    { model: RrhhEmpleadoAusencia, as: 'ausencias', include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] }, { model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa, eliminado: false }, include: [{ model: Persona, as: 'persona' }] }]
                }],

            }).then(function (datos2) {
                var offset = (req.params.items_pagina * (req.params.pagina - 1))
                textOrder = orderValue + " " + req.params.direccion
                if (req.params.items_pagina != '0') {
                    textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
                }
                RrhhEmpleadoRolTurno.findAll({
                    where: condicionRolTurno,

                    //
                    include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'grupo' },
                    {
                        model: RrhhEmpleadoFicha, as: 'ficha',
                        include: [{ model: RrhhEmpleadoAusencia, as: 'ausencias', include: [{ model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }] }, {
                            model: MedicoPaciente, as: 'empleado',
                            where: { id_empresa: req.params.id_empresa, eliminado: false },
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                    }],
                    order: sequelize.literal(textOrder)
                }).then(function (datos) {
                    res.json({ rolesTurno: datos, paginas: Math.ceil(datos2.count / req.params.items_pagina) })
                })
            })
        })

    router.route('/recursos-humanos/horas-extra/empleado/:id_empleado')
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoHorasExtra.create({
                id_empleado: req.params.id_empleado,
                id_ficha: req.body.id_ficha,
                fecha: req.body.fecha,
                hora_inicio: req.body.hora_inicio2,
                hora_fin: req.body.hora_fin2,
                tiempo: req.body.tiempo,
                observacion: req.body.observacion,
                eliminado: false
            }).then(function (empleadohorasExtraCreado) {
                res.json({ mensaje: "Guardado satisfactoriamente!" })
            })
        })
    router.route('/recursos-humanos/horas-extra/empleado/:id_empleado/inicio/:inicio/fin/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionHorasExtra = { id_ficha: req.params.id_empleado, eliminado: false };
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                var condicionHorasExtra = { id_ficha: req.params.id_empleado, eliminado: false, fecha: { $between: [inicio, fin] } };
            }
            RrhhEmpleadoHorasExtra.findAll({
                where: condicionHorasExtra,
                include: [{ model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado' }] }]
            }).then(function (horasExtra) {
                res.json(horasExtra)

            })
        })

    router.route('/fichas/empleados/empresa/excel/upload')
        .post(ensureAuthorizedlogged, function (req, res) {
            var promises = [];
            sequelize.transaction(function (t) {
                req.body.bancos.forEach(function (banco, index, array) {
                    promises.push(Tipo.find({
                        where: {
                            nombre_corto: 'RRHH_BAN',
                            id_empresa: req.body.id_empresa
                        }
                    }).then(function (tipo) {
                        return Clase.findOrCreate({
                            where: {
                                nombre: banco,
                                id_tipo: tipo.dataValues.id
                            },
                            transaction: t,
                            defaults: {
                                nombre: banco,
                                id_tipo: tipo.dataValues.id,
                                habilitado: true,
                                eliminado: false
                            }
                        })
                    }))
                    if (index === (array.length - 1)) {
                        req.body.pacientes.forEach(function (pacienteActual, index3, array3) {
                            promises.push(MedicoPaciente.find({
                                where: { codigo: pacienteActual.codigo, id_empresa: req.body.id_empresa },
                                transaction: t
                            }).then(function (pacienteFound) {
                                // console.log(pacienteFound)
                                if (pacienteFound != null) {
                                    return RrhhEmpleadoFicha.findAll({
                                        where: {
                                            id_empleado: pacienteFound.id,
                                        },
                                        transaction: t,
                                        include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo', include: [{ model: Tipo, as: 'tipo' }] }] }],
                                        limit: 1,
                                        order: [['id', 'desc']]
                                    }).then(function (fichaEncontrada) {
                                        return Tipo.find({
                                            where: {
                                                nombre_corto: 'RRHH_BAN',
                                                id_empresa: req.body.id_empresa
                                            }, transaction: t
                                        }).then(function (tipo) {
                                            return Clase.find({
                                                where: {
                                                    nombre: pacienteActual.banco,
                                                    id_tipo: tipo.dataValues.id
                                                },
                                                transaction: t,
                                            }).then(function (bancoEncontrado) {
                                                return RrhhEmpleadoFicha.update({
                                                    numero_cuenta: pacienteActual.numero_cuenta,
                                                    id_banco: bancoEncontrado.dataValues.id,
                                                },
                                                    {
                                                        where: {
                                                            id: fichaEncontrada[0].dataValues.id
                                                        }, transaction: t
                                                    })
                                            })
                                        })

                                    })
                                }

                            }))
                        })
                    }
                })
                return Promise.all(promises);
            }).then(function (result) {
                res.json({ mensaje: "¡Datos de ficha empleados actualizados satisfactoriamente!" });
            }).catch(function (err) {
                res.json({ hasError: true, message: err.stack });
            });
        })

    router.route('/familiares/empleados/empresa/excel/upload')
        .post(ensureAuthorizedlogged, function (req, res) {
            var promises = [];
            var arregloRelacionesCreadas = []

            req.body.relaciones.forEach(function (relacion, index, array) {
                Tipo.find({
                    where: {
                        nombre_corto: 'RRHH_REL',
                        id_empresa: req.body.id_empresa
                    }
                }).then(function (tipo) {
                    Clase.findOrCreate({
                        where: {
                            nombre: relacion,
                            id_tipo: tipo.dataValues.id
                        },
                        defaults: {
                            nombre: relacion,
                            id_tipo: tipo.dataValues.id,
                            habilitado: true,
                            eliminado: false
                        }
                    }).spread(function (dato, cread) {
                        if (index === (array.length - 1)) {
                            sequelize.transaction(function (t) {
                                req.body.familiares.forEach(function (familiar, index3, array3) {
                                    promises.push(MedicoPaciente.find({
                                        where: { codigo: familiar.codigoEmpleado, id_empresa: req.body.id_empresa },
                                        transaction: t
                                    }).then(function (pacienteFound) {
                                        // console.log(pacienteFound)
                                        if (pacienteFound != null) {
                                            return Tipo.find({
                                                where: {
                                                    nombre_corto: 'RRHH_REL',
                                                    id_empresa: req.body.id_empresa
                                                }, transaction: t
                                            }).then(function (tipo) {
                                                return Clase.find({
                                                    where: {
                                                        nombre: familiar.relacion,
                                                        id_tipo: tipo.dataValues.id
                                                    },
                                                    transaction: t,

                                                }).then(function (relacionEncontrado) {
                                                    var nombre_corto = familiar.genero.charAt(0)
                                                    return Clase.find({
                                                        where: { nombre_corto: nombre_corto },
                                                        transaction: t
                                                    }).then(function (generoEncontrado) {
                                                        /* var nombre = ""
                                                        if (familiar.nombres) {
                                                            nombre += familiar.nombres
                                                        }
                                                        if (familiar.apellido_paterno) {
                                                            nombre += ' ' + familiar.apellido_paterno
                                                        }
                                                        if (familiar.apellido_materno) {
                                                            nombre += ' ' + familiar.apellido_materno
                                                        } */
                                                        var nombre = (familiar.apellido_paterno != undefined || familiar.apellido_paterno != null ? familiar.apellido_paterno : '')
                                                            + ' ' + (familiar.apellido_materno != undefined || familiar.apellido_materno != null ? familiar.apellido_materno : '')
                                                            + ' ' + (familiar.nombres != undefined || familiar.nombres != null ? familiar.nombres : '')
                                                        return Persona.create({
                                                            nombres: familiar.nombres,
                                                            segundo_nombre: familiar.segundo_nombre ? familiar.segundo_nombre : "",
                                                            apellido_paterno: familiar.apellido_paterno,
                                                            apellido_materno: familiar.apellido_materno,
                                                            fecha_nacimiento: familiar.fecha_nacimiento,
                                                            nombre_completo: nombre,
                                                            id_genero: generoEncontrado.id
                                                        }, {
                                                            transaction: t
                                                        }).then(function (personaCreada) {
                                                            return RrhhEmpleadoFichaFamiliar.create({
                                                                id_empleado: pacienteFound.id,
                                                                id_persona_familiar: personaCreada.id,
                                                                id_relacion: relacionEncontrado.id,
                                                                //afiliado: familiar.afiliado
                                                                referencia: familiar.referencia
                                                            }, {
                                                                transaction: t
                                                            }).then(function (RrhhEmpleadoFichaFamiliarCreado) {
                                                            })
                                                        })
                                                    })
                                                })
                                            })


                                        }

                                    }))
                                })
                                return Promise.all(promises);
                            }).then(function (result) {
                                res.json({ mensaje: "¡Datos de familiares empleados actualizados satisfactoriamente!" });
                            }).catch(function (err) {
                                res.json({ hasError: true, mensaje: err.stack });
                            });
                        }
                    })
                })
            })
        })
    router.route('/empleados/empresa/:id_empresa/fichas/excel/upload')
        .post(ensureAuthorizedlogged, function (req, res) {
            Tipo.find({
                where: { nombre_corto: 'NAC' }
            }).then(function (tipoEncontradoNAC) {
                Tipo.find({
                    where: { nombre_corto: 'DEP' }
                }).then(function (tipoEncontradoDEP) {
                    Tipo.find({
                        where: { nombre_corto: 'MUN' }
                    }).then(function (tipoEncontradoMUN) {
                        Tipo.find({
                            where: { nombre_corto: 'LOC' }
                        }).then(function (tipoEncontradoLOC) {
                            Tipo.find({
                                where: { nombre_corto: 'RRHH_ASLP', id_empresa: req.params.id_empresa }
                            }).then(function (tipoEncontradoRRHH_ASLP) {
                                Tipo.find({
                                    where: { nombre_corto: 'RRHH_LSS', id_empresa: req.params.id_empresa }
                                }).then(function (tipoEncontradoRRHH_LSS) {
                                    Tipo.find({
                                        where: { nombre_corto: 'RRHH_TP', id_empresa: req.params.id_empresa }
                                    }).then(function (tipoEncontradoRRHH_TP) {
                                        Tipo.find({
                                            where: { nombre_corto: 'RRHH_CH', id_empresa: req.params.id_empresa }
                                        }).then(function (tipoEncontradoRRHH_CH) {
                                            Tipo.find({
                                                where: { nombre_corto: 'RRHH_AREA', id_empresa: req.params.id_empresa }
                                            }).then(function (tipoEncontradoRRHH_AREA) {
                                                Tipo.find({
                                                    where: { nombre_corto: 'RRHH_UBI', id_empresa: req.params.id_empresa }
                                                }).then(function (tipoEncontradoRRHH_UBI) {
                                                    Tipo.find({
                                                        where: { nombre_corto: 'RRHH_EC', id_empresa: req.params.id_empresa }
                                                    }).then(function (tipoEncontradoRRHH_EC) {
                                                        Tipo.find({
                                                            where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                        }).then(function (tipoEncontradoRRHH_OST) {
                                                            var promises = []
                                                            sequelize.transaction(function (t) {
                                                                req.body.arregloAporteAfp.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_ASLP.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_ASLP.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloLugarAfp.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_LSS.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_LSS.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloLugarSeguroSalud.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_LSS.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_LSS.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloTipoPersona.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_TP.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_TP.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloCargaHorario.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_CH.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_CH.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloArega.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_AREA.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_AREA.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloUbicacion.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_UBI.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_UBI.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloEstadoCivil.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_EC.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_EC.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloOtrosSeguros1.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { habilitado: true, nombre: dato, id_tipo: tipoEncontradoRRHH_OST.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_OST.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })
                                                                req.body.arregloOtrosSeguros2.forEach(function (dato, index, array) {
                                                                    promises.push(Clase.findOrCreate({
                                                                        where: { nombre: dato, id_tipo: tipoEncontradoRRHH_OST.dataValues.id },
                                                                        defaults: {
                                                                            nombre: dato,
                                                                            id_tipo: tipoEncontradoRRHH_OST.dataValues.id,
                                                                            habilitado: true,
                                                                            eliminado: false
                                                                        }, transaction: t,
                                                                        lock: t.LOCK.UPDATE
                                                                    }).spread(function (datos, cread) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(datos);
                                                                        });
                                                                    }).catch(function (err) {
                                                                        return new Promise(function (fulfill, reject) {
                                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                                        });
                                                                    }))
                                                                })

                                                                req.body.fichas.forEach(function (empleado, index, array) {
                                                                    promises.push(MedicoPaciente.find({
                                                                        where: { codigo: empleado.codigo, id_empresa: req.params.id_empresa }, transaction: t
                                                                        , include: [{ model: Persona, as: 'persona' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, limit: 1, order: [["id", "desc"]] }]
                                                                    }).then(function (pacienteFound) {
                                                                        if (pacienteFound != null) {
                                                                            return Clase.find({
                                                                                where: { habilitado: true, nombre: empleado.nacionalidad, id_tipo: tipoEncontradoNAC.dataValues.id }, transaction: t
                                                                            }).then(function (claseNacEncontrada) {
                                                                                return Clase.find({
                                                                                    where: { habilitado: true, nombre: empleado.departamento, id_tipo: tipoEncontradoDEP.dataValues.id, nombre_corto: { $like: '%' + claseNacEncontrada.nombre_corto + '%' } }, transaction: t
                                                                                }).then(function (claseDepEncontrada) {
                                                                                    return Clase.find({
                                                                                        where: { habilitado: true, nombre: empleado.provincia, id_tipo: tipoEncontradoMUN.dataValues.id, nombre_corto: { $like: '%' + claseDepEncontrada.nombre_corto.split("-")[0] + '%' } }, transaction: t
                                                                                    }).then(function (claseMunEncontrada) {
                                                                                        return Clase.find({
                                                                                            where: { habilitado: true, nombre: empleado.localidad, id_tipo: tipoEncontradoLOC.dataValues.id, nombre_corto: { $like: '%' + claseMunEncontrada.nombre_corto.split("-")[1] + '%' } }, transaction: t
                                                                                        }).then(function (claseLocEncontrada) {
                                                                                            return Clase.find({
                                                                                                where: { habilitado: true, nombre: empleado.estado_civil, id_tipo: tipoEncontradoRRHH_EC.dataValues.id }, transaction: t
                                                                                            }).then(function (claseEncontrada) {
                                                                                                var idEstC = (claseEncontrada) ? claseEncontrada.id : null
                                                                                                var idNac = (claseNacEncontrada) ? claseNacEncontrada.id : null
                                                                                                var idDep = (claseDepEncontrada) ? claseDepEncontrada.id : null
                                                                                                var idProv = (claseMunEncontrada) ? claseMunEncontrada.id : null
                                                                                                var idLoc = (claseLocEncontrada) ? claseLocEncontrada.id : null
                                                                                                return Persona.update({
                                                                                                    id_estado_civil: idEstC,
                                                                                                    id_pais_nacimiento: idNac,
                                                                                                    id_ciudad_nacimiento: idDep,
                                                                                                    id_provincia_nacimiento: idProv,
                                                                                                    id_localidad_nacimiento: idLoc,
                                                                                                    direccion_zona: empleado.direccion_zona,
                                                                                                    direccion_numero: empleado.direccion_numero,
                                                                                                    correo_electronico: empleado.correo_electronico,
                                                                                                }, {
                                                                                                    where: { id: pacienteFound.persona.id }, transaction: t
                                                                                                }).then(function (PersonaActualizada) {
                                                                                                    return Clase.find({
                                                                                                        where: { habilitado: true, nombre: empleado.afp_aporte, id_tipo: tipoEncontradoRRHH_ASLP.dataValues.id }, transaction: t
                                                                                                    }).then(function (claseAfpEncontrada) {
                                                                                                        return Clase.find({
                                                                                                            where: { habilitado: true, nombre: empleado.tipo_personal, id_tipo: tipoEncontradoRRHH_TP.dataValues.id }, transaction: t
                                                                                                        }).then(function (clasePersonaEncontrada) {
                                                                                                            return Clase.find({
                                                                                                                where: { habilitado: true, nombre: empleado.carga_horario, id_tipo: tipoEncontradoRRHH_CH.dataValues.id }, transaction: t
                                                                                                            }).then(function (claseCargaEncontrada) {
                                                                                                                return Clase.find({
                                                                                                                    where: { habilitado: true, nombre: empleado.area, id_tipo: tipoEncontradoRRHH_AREA.dataValues.id }, transaction: t
                                                                                                                }).then(function (claseAreaEncontrada) {
                                                                                                                    return Clase.find({
                                                                                                                        where: { habilitado: true, nombre: empleado.ubicacion, id_tipo: tipoEncontradoRRHH_UBI.dataValues.id }, transaction: t
                                                                                                                    }).then(function (claseUbicacionEncontrada) {
                                                                                                                        return Clase.find({
                                                                                                                            where: { habilitado: true, nombre: empleado.lugar_afp, id_tipo: tipoEncontradoRRHH_LSS.dataValues.id }, transaction: t
                                                                                                                        }).then(function (claseLugarSeguroAfpEncontrada) {
                                                                                                                            return Clase.find({
                                                                                                                                where: { habilitado: true, nombre: empleado.lugar_seguro, id_tipo: tipoEncontradoRRHH_LSS.dataValues.id }, transaction: t
                                                                                                                            }).then(function (claseLugarSeguroEncontrada) {
                                                                                                                                var id_tipo_personal = (clasePersonaEncontrada) ? clasePersonaEncontrada.id : null,
                                                                                                                                    id_carga_horarios = (claseCargaEncontrada) ? claseCargaEncontrada.id : null,
                                                                                                                                    id_area = (claseAreaEncontrada) ? claseAreaEncontrada.id : null,
                                                                                                                                    id_ubicacion = (claseUbicacionEncontrada) ? claseUbicacionEncontrada.id : null,
                                                                                                                                    nua_seguro_largo_plazo = (empleado.nua_cua) ? empleado.nua_cua : null,
                                                                                                                                    id_aporte_seguro_largo_plazo = (claseAfpEncontrada) ? claseAfpEncontrada.id : null,
                                                                                                                                    id_lugar_seguro_largo_plazo = (claseLugarSeguroAfpEncontrada) ? claseLugarSeguroAfpEncontrada.id : null,
                                                                                                                                    id_lugar_seguro_salud = (claseLugarSeguroEncontrada) ? claseLugarSeguroEncontrada.id : null;
                                                                                                                                return RrhhEmpleadoFicha.update({
                                                                                                                                    id_tipo_personal: id_tipo_personal,
                                                                                                                                    id_carga_horarios: id_carga_horarios,
                                                                                                                                    id_caracteristica_discapacidad: req.body.caracteristica_discapacidad ? req.body.caracteristica_discapacidad.id : null,
                                                                                                                                    vencimiento_carnet_discapacidad: req.body.vencimiento_carnet_discapacidad.length ? req.body.vencimiento_carnet_discapacidad.split('/').reverse().join('-') + "T04:00:00.000Z" : null,
                                                                                                                                    id_area: id_area,
                                                                                                                                    id_ubicacion: id_ubicacion,
                                                                                                                                    nua_seguro_largo_plazo: nua_seguro_largo_plazo,
                                                                                                                                    id_aporte_seguro_largo_plazo: id_aporte_seguro_largo_plazo,
                                                                                                                                    id_lugar_seguro_largo_plazo: id_lugar_seguro_largo_plazo,
                                                                                                                                    id_lugar_seguro_salud: id_lugar_seguro_salud,
                                                                                                                                }, {

                                                                                                                                    where: {
                                                                                                                                        id: pacienteFound.empleadosFichas[0].id
                                                                                                                                    }, transaction: t

                                                                                                                                }).then(function (fichaCreada) {
                                                                                                                                    if (empleado.seguro1) {

                                                                                                                                        return Clase.find({
                                                                                                                                            where: { habilitado: true, nombre: empleado.seguro1, id_tipo: tipoEncontradoRRHH_OST.dataValues.id }, transaction: t
                                                                                                                                        }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                            return RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                monto: empleado.monto1,
                                                                                                                                                observacion: empleado.observacion2
                                                                                                                                            }, { transaction: t }).then(function (seguroCreado) {
                                                                                                                                                if (empleado.seguro2) {

                                                                                                                                                    return Clase.find({
                                                                                                                                                        where: { habilitado: true, nombre: empleado.seguro2, id_tipo: tipoEncontradoRRHH_OST.dataValues.id }, transaction: t
                                                                                                                                                    }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                                        return RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                            id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                            id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                            monto: empleado.monto2,
                                                                                                                                                            observacion: empleado.observacion2
                                                                                                                                                        }, { transaction: t }).then(function (seguroCreado) {
                                                                                                                                                            return new Promise(function (fulfill, reject) {
                                                                                                                                                                fulfill(seguroCreado);
                                                                                                                                                            });
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

                                                                                                                                    } else if (empleado.seguro2) {

                                                                                                                                        return Clase.find({
                                                                                                                                            where: { habilitado: true, nombre: empleado.seguro2, id_tipo: tipoEncontradoRRHH_OST.dataValues.id }, transaction: t
                                                                                                                                        }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                            return RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                monto: empleado.monto2,
                                                                                                                                                observacion: empleado.observacion2
                                                                                                                                            }, { transaction: t }).then(function (seguroCreado) {
                                                                                                                                                return new Promise(function (fulfill, reject) {
                                                                                                                                                    fulfill(seguroCreado);
                                                                                                                                                });
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

                                                                                                                                    } else {
                                                                                                                                        return new Promise(function (fulfill, reject) {
                                                                                                                                            reject((err.stack !== undefined) ? err.stack : err);
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
                                                                                })
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
                                                                    }))
                                                                })
                                                                return Promise.all(promises);
                                                            }).then(function (result) {
                                                                res.json({ mensaje: "¡Datos de empleados actualizados satisfactoriamente!" });
                                                            }).catch(function (err) {
                                                                res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                                                            });
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
            /* req.body.arregloAporteAfp.forEach(function (dato, index, array) {
            Tipo.find({
                where: { nombre_corto: 'RRHH_ASLP', id_empresa: req.params.id_empresa }
            }).then(function (tipoEncontrado) {
                Clase.findOrCreate({
                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                    defaults: {
                        nombre: dato,
                        id_tipo: tipoEncontrado.dataValues.id,
                        habilitado: true
                    }
                }).spread(function (datos, cread) {
                    if (index === (array.length - 1)) {
                        req.body.arregloLugarAfp.forEach(function (dato, index, array) {
                            Tipo.find({
                                where: { nombre_corto: 'RRHH_LSS', id_empresa: req.params.id_empresa }
                            }).then(function (tipoEncontrado) {
                                Clase.findOrCreate({
                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                    defaults: {
                                        nombre: dato,
                                        id_tipo: tipoEncontrado.dataValues.id,
                                        habilitado: true
                                    }
                                }).spread(function (datos, cread) {
                                    if (index === (array.length - 1)) {
                                        req.body.arregloLugarSeguroSalud.forEach(function (dato, index, array) {
                                            Tipo.find({
                                                where: { nombre_corto: 'RRHH_LSS', id_empresa: req.params.id_empresa }
                                            }).then(function (tipoEncontrado) {
                                                Clase.findOrCreate({
                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                    defaults: {
                                                        nombre: dato,
                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                        habilitado: true
                                                    }
                                                }).spread(function (datos, cread) {
                                                    if (index === (array.length - 1)) {
                                                        req.body.arregloTipoPersona.forEach(function (dato, index, array) {
                                                            Tipo.find({
                                                                where: { nombre_corto: 'RRHH_TP', id_empresa: req.params.id_empresa }
                                                            }).then(function (tipoEncontrado) {
                                                                Clase.findOrCreate({
                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                    defaults: {
                                                                        nombre: dato,
                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                        habilitado: true
                                                                    }
                                                                }).spread(function (datos, cread) {
                                                                    if (index === (array.length - 1)) {
                                                                        req.body.arregloCargaHorario.forEach(function (dato, index, array) {
                                                                            Tipo.find({
                                                                                where: { nombre_corto: 'RRHH_CH', id_empresa: req.params.id_empresa }
                                                                            }).then(function (tipoEncontrado) {
                                                                                Clase.findOrCreate({
                                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                    defaults: {
                                                                                        nombre: dato,
                                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                                        habilitado: true
                                                                                    }
                                                                                }).spread(function (datos, cread) {
                                                                                    if (index === (array.length - 1)) {
                                                                                        req.body.arregloArega.forEach(function (dato, index, array) {
                                                                                            Tipo.find({
                                                                                                where: { nombre_corto: 'RRHH_AREA', id_empresa: req.params.id_empresa }
                                                                                            }).then(function (tipoEncontrado) {
                                                                                                Clase.findOrCreate({
                                                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                                    defaults: {
                                                                                                        nombre: dato,
                                                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                                                        habilitado: true
                                                                                                    }
                                                                                                }).spread(function (datos, cread) {
                                                                                                    if (index === (array.length - 1)) {
                                                                                                        req.body.arregloUbicacion.forEach(function (dato, index, array) {
                                                                                                            Tipo.find({
                                                                                                                where: { nombre_corto: 'RRHH_UBI', id_empresa: req.params.id_empresa }
                                                                                                            }).then(function (tipoEncontrado) {
                                                                                                                Clase.findOrCreate({
                                                                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                                                    defaults: {
                                                                                                                        nombre: dato,
                                                                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                                                                        habilitado: true
                                                                                                                    }
                                                                                                                }).spread(function (datos, cread) {
                                                                                                                    if (index === (array.length - 1)) {
                                                                                                                        req.body.arregloEstadoCivil.forEach(function (dato, index, array) {
                                                                                                                            Tipo.find({
                                                                                                                                where: { nombre_corto: 'RRHH_EC', id_empresa: req.params.id_empresa }
                                                                                                                            }).then(function (tipoEncontrado) {
                                                                                                                                Clase.findOrCreate({
                                                                                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                                                                    defaults: {
                                                                                                                                        nombre: dato,
                                                                                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                                                                                        habilitado: true
                                                                                                                                    }
                                                                                                                                }).spread(function (datos, cread) {
                                                                                                                                    if (index === (array.length - 1)) {
                                                                                                                                        req.body.arregloOtrosSeguros1.forEach(function (dato, index, array) {
                                                                                                                                            Tipo.find({
                                                                                                                                                where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                                                                                                            }).then(function (tipoEncontrado) {
                                                                                                                                                Clase.findOrCreate({
                                                                                                                                                    where: { habilitado: true, nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                                                                                    defaults: {
                                                                                                                                                        nombre: dato,
                                                                                                                                                        id_tipo: tipoEncontrado.dataValues.id,
                                                                                                                                                        habilitado: true
                                                                                                                                                    }
                                                                                                                                                }).spread(function (datos, cread) {
                                                                                                                                                    if (index === (array.length - 1)) {
                                                                                                                                                        if (req.body.arregloOtrosSeguros2.length > 0) {
                                                                                                                                                            req.body.arregloOtrosSeguros2.forEach(function (dato, index, array) {
                                                                                                                                                                Tipo.find({
                                                                                                                                                                    where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                                                                                                                                }).then(function (tipoEncontrado) {
                                                                                                                                                                    Clase.findOrCreate({
                                                                                                                                                                        where: { nombre: dato, id_tipo: tipoEncontrado.dataValues.id },
                                                                                                                                                                        defaults: {
                                                                                                                                                                            habilitado: true,
                                                                                                                                                                            nombre: dato,
                                                                                                                                                                            id_tipo: tipoEncontrado.dataValues.id,
                                                                                                                                                                            habilitado: true
                                                                                                                                                                        }
                                                                                                                                                                    }).spread(function (datos, cread) {
                                                                                                                                                                        if (index === (array.length - 1)) {
                                                                                                                                                                            guardarFichas(req, res)
                                                                                                                                                                        }
                                                                                                                                                                    })
                                                                                                                                                                })
                                                                                                                                                            })
                                                                                                                                                        } else {
                                                                                                                                                            if (index === (array.length - 1)) {
                                                                                                                                                                guardarFichas(req, res)
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                            })
                                                                                                                                        })
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            })
                                                                                                                        })
                                                                                                                    }
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    }
                                                                                })
                                                                            })
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        })
                                                    }
                                                })
                                            })
                                        })
                                    }
                                })
                            })
                        })
 
                    }
                })
            })
        }) */

        })
    /* function guardarFichas(req, res) {
        req.body.fichas.forEach(function (empleado, index, array) {
            MedicoPaciente.find({
                where: { codigo: empleado.codigo, id_empresa: req.params.id_empresa }
                , include: [{ model: Persona, as: 'persona' }, { model: RrhhEmpleadoFicha, as: 'empleadosFichas',where:{activo:true}, required: false, limit: 1, order: [["id", "desc"]] }]
            }).then(function (pacienteFound) {
                if (pacienteFound != null) {
                    Tipo.find({
                        where: { nombre_corto: 'NAC' }
                    }).then(function (tipoEncontrado) {
                        Clase.find({
                            where: { habilitado: true, nombre: empleado.nacionalidad, id_tipo: tipoEncontrado.dataValues.id }
                        }).then(function (claseNacEncontrada) {
                            Tipo.find({
                                where: { nombre_corto: 'DEP' }
                            }).then(function (tipoEncontrado) {
                                Clase.find({
                                    where: { habilitado: true, nombre: empleado.departamento, id_tipo: tipoEncontrado.dataValues.id }
                                }).then(function (claseDepEncontrada) {
                                    Tipo.find({
                                        where: { nombre_corto: 'MUN' }
                                    }).then(function (tipoEncontrado) {
                                        Clase.find({
                                            where: { habilitado: true, nombre: empleado.provincia, id_tipo: tipoEncontrado.dataValues.id }
                                        }).then(function (claseMunEncontrada) {
                                            Tipo.find({
                                                where: { nombre_corto: 'LOC' }
                                            }).then(function (tipoEncontrado) {
                                                Clase.find({
                                                    where: { habilitado: true, nombre: empleado.provincia, id_tipo: tipoEncontrado.dataValues.id }
                                                }).then(function (claseLocEncontrada) {
                                                    Tipo.find({
                                                        where: { nombre_corto: 'RRHH_EC', id_empresa: req.params.id_empresa }
                                                    }).then(function (tipoEncontrado) {
                                                        Clase.find({
                                                            where: { habilitado: true, nombre: empleado.estado_civil, id_tipo: tipoEncontrado.dataValues.id }
                                                        }).then(function (claseEncontrada) {
                                                            var idNac = (claseNacEncontrada) ? claseNacEncontrada.id : null
                                                            var idDep = (claseDepEncontrada) ? claseDepEncontrada.id : null
                                                            var idProv = (claseMunEncontrada) ? claseMunEncontrada.id : null
                                                            var idLoc = (claseLocEncontrada) ? claseLocEncontrada.id : null
                                                            if (!pacienteFound.persona) {
                                                                console.log(pacienteFound)
                                                                console.log("pacienteFound")
                                                            }
                                                            Persona.update({
                                                                id_estado_civil: claseEncontrada.id,
                                                                id_pais_nacimiento: idNac,
                                                                id_ciudad_nacimiento: idDep,
                                                                id_provincia_nacimiento: idProv,
                                                                id_localidad_nacimiento: idLoc
                                                            }, {
                                                                    where: { id: pacienteFound.persona.id }
                                                                }).then(function (PersonaActualizada) {
                                                                    Tipo.find({
                                                                        where: { nombre_corto: 'RRHH_TP', id_empresa: req.params.id_empresa }
                                                                    }).then(function (tipoEncontrado) {
                                                                        Clase.find({
                                                                            where: { habilitado: true, nombre: empleado.tipo_personal, id_tipo: tipoEncontrado.dataValues.id }
                                                                        }).then(function (clasePersonaEncontrada) {
                                                                            Tipo.find({
                                                                                where: { nombre_corto: 'RRHH_CH', id_empresa: req.params.id_empresa }
                                                                            }).then(function (tipoEncontrado) {
                                                                                Clase.find({
                                                                                    where: { habilitado: true, nombre: empleado.carga_horario, id_tipo: tipoEncontrado.dataValues.id }
                                                                                }).then(function (claseCargaEncontrada) {
                                                                                    Tipo.find({
                                                                                        where: { nombre_corto: 'RRHH_AREA', id_empresa: req.params.id_empresa }
                                                                                    }).then(function (tipoEncontrado) {
                                                                                        Clase.find({
                                                                                            where: { habilitado: true, nombre: empleado.area, id_tipo: tipoEncontrado.dataValues.id }
                                                                                        }).then(function (claseAreaEncontrada) {
                                                                                            Tipo.find({
                                                                                                where: { nombre_corto: 'RRHH_UBI', id_empresa: req.params.id_empresa }
                                                                                            }).then(function (tipoEncontrado) {
                                                                                                Clase.find({
                                                                                                    where: { habilitado: true, nombre: empleado.ubicacion, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                }).then(function (claseUbicacionEncontrada) {
                                                                                                    Tipo.find({
                                                                                                        where: { nombre_corto: 'RRHH_LSS', id_empresa: req.params.id_empresa }
                                                                                                    }).then(function (tipoEncontrado) {
                                                                                                        Clase.find({
                                                                                                            where: { habilitado: true, nombre: empleado.lugar_afp, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                        }).then(function (claseLugarSeguroAfpEncontrada) {
                                                                                                            Clase.find({
                                                                                                                where: { habilitado: true, nombre: empleado.lugar_seguro, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                            }).then(function (claseLugarSeguroEncontrada) {
                                                                                                                Tipo.find({
                                                                                                                    where: { nombre_corto: 'RRHH_ASLP', id_empresa: req.params.id_empresa }
                                                                                                                }).then(function (tipoEncontrado) {
                                                                                                                    Clase.find({
                                                                                                                        where: { habilitado: true, nombre: empleado.afp_aporte, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                                    }).then(function (claseAfpEncontrada) {
 
                                                                                                                        var id_tipo_personal = (clasePersonaEncontrada) ? clasePersonaEncontrada.id : null,
                                                                                                                            id_carga_horarios = (clasePersonaEncontrada) ? claseCargaEncontrada.id : null,
                                                                                                                            id_area = (clasePersonaEncontrada) ? claseAreaEncontrada.id : null,
                                                                                                                            id_ubicacion = (clasePersonaEncontrada) ? claseUbicacionEncontrada.id : null,
                                                                                                                            nua_seguro_largo_plazo = (clasePersonaEncontrada) ? empleado.nua_cua : null,
                                                                                                                            id_aporte_seguro_largo_plazo = (clasePersonaEncontrada) ? claseAfpEncontrada.id : null,
                                                                                                                            id_lugar_seguro_largo_plazo = (clasePersonaEncontrada) ? claseLugarSeguroAfpEncontrada.id : null,
                                                                                                                            id_lugar_seguro_salud = (clasePersonaEncontrada) ? claseLugarSeguroEncontrada.id : null;
                                                                                                                        RrhhEmpleadoFicha.update({
                                                                                                                            id_tipo_personal: id_tipo_personal,
                                                                                                                            id_carga_horarios: id_carga_horarios,
                                                                                                                            id_area: id_area,
                                                                                                                            id_ubicacion: id_ubicacion,
                                                                                                                            nua_seguro_largo_plazo: nua_seguro_largo_plazo,
                                                                                                                            id_aporte_seguro_largo_plazo: id_aporte_seguro_largo_plazo,
                                                                                                                            id_lugar_seguro_largo_plazo: id_lugar_seguro_largo_plazo,
                                                                                                                            id_lugar_seguro_salud: id_lugar_seguro_salud,
                                                                                                                        }, {
 
                                                                                                                                where: {
                                                                                                                                    id: pacienteFound.empleadosFichas[0].id
                                                                                                                                }
 
                                                                                                                            }).then(function (fichaCreada) {
                                                                                                                                if (empleado.seguro1) {
                                                                                                                                    Tipo.find({
                                                                                                                                        where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                                                                                                    }).then(function (tipoEncontrado) {
                                                                                                                                        Clase.find({
                                                                                                                                            where: { habilitado: true, nombre: empleado.seguro1, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                                                        }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                            RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                monto: empleado.monto1,
                                                                                                                                                observacion: empleado.observacion2
                                                                                                                                            }).then(function (seguroCreado) {
                                                                                                                                                if (empleado.seguro2) {
                                                                                                                                                    Tipo.find({
                                                                                                                                                        where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                                                                                                                    }).then(function (tipoEncontrado) {
                                                                                                                                                        Clase.find({
                                                                                                                                                            where: { habilitado: true, nombre: empleado.seguro2, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                                                                        }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                                            RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                                id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                                monto: empleado.monto2,
                                                                                                                                                                observacion: empleado.observacion2
                                                                                                                                                            }).then(function (seguroCreado) {
                                                                                                                                                                if (index === (array.length - 1)) {
                                                                                                                                                                    res.json({ mensaje: 'importacion satisfactoria!' })
                                                                                                                                                                }
                                                                                                                                                            }).catch(function (err) {
                                                                                                                                                                res.json({ mensaje: err.stack });
                                                                                                                                                            });
                                                                                                                                                        }).catch(function (err) {
                                                                                                                                                            res.json({ mensaje: err.stack });
                                                                                                                                                        });
                                                                                                                                                    }).catch(function (err) {
                                                                                                                                                        res.json({ mensaje: err.stack });
                                                                                                                                                    });
                                                                                                                                                } else {
                                                                                                                                                    if (index === (array.length - 1)) {
                                                                                                                                                        res.json({ mensaje: 'importacion satisfactoria!' })
                                                                                                                                                    }
                                                                                                                                                }
 
                                                                                                                                            }).catch(function (err) {
                                                                                                                                                res.json({ mensaje: err.stack });
                                                                                                                                            });
                                                                                                                                        }).catch(function (err) {
                                                                                                                                            res.json({ mensaje: err.stack });
                                                                                                                                        });
                                                                                                                                    }).catch(function (err) {
                                                                                                                                        res.json({ mensaje: err.stack });
                                                                                                                                    });
                                                                                                                                } else if (empleado.seguro2) {
                                                                                                                                    Tipo.find({
                                                                                                                                        where: { nombre_corto: 'RRHH_OST', id_empresa: req.params.id_empresa }
                                                                                                                                    }).then(function (tipoEncontrado) {
                                                                                                                                        Clase.find({
                                                                                                                                            where: { habilitado: true, nombre: empleado.seguro2, id_tipo: tipoEncontrado.dataValues.id }
                                                                                                                                        }).then(function (claseOtroSeguroEncontrada) {
                                                                                                                                            RrhhEmpleadoFichaOtrosSeguros.create({
                                                                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                                                                id_tipo_seguro: claseOtroSeguroEncontrada.id,
                                                                                                                                                monto: empleado.monto2,
                                                                                                                                                observacion: empleado.observacion2
                                                                                                                                            }).then(function (seguroCreado) {
                                                                                                                                                if (index === (array.length - 1)) {
                                                                                                                                                    res.json({ mensaje: 'importacion satisfactoria!' })
                                                                                                                                                }
                                                                                                                                            }).catch(function (err) {
                                                                                                                                                res.json({ mensaje: err.stack });
                                                                                                                                            });
                                                                                                                                        }).catch(function (err) {
                                                                                                                                            res.json({ mensaje: err.stack });
                                                                                                                                        });
                                                                                                                                    }).catch(function (err) {
                                                                                                                                        res.json({ mensaje: err.stack });
                                                                                                                                    });
                                                                                                                                } else {
                                                                                                                                    if (index === (array.length - 1)) {
                                                                                                                                        res.json({ mensaje: 'importacion satisfactoria!' })
                                                                                                                                    }
                                                                                                                                }
 
                                                                                                                            }).catch(function (err) {
                                                                                                                                res.json({ mensaje: err.stack });
                                                                                                                            });
                                                                                                                    }).catch(function (err) {
                                                                                                                        res.json({ mensaje: err.stack });
                                                                                                                    });
                                                                                                                }).catch(function (err) {
                                                                                                                    res.json({ mensaje: err.stack });
                                                                                                                });
                                                                                                            }).catch(function (err) {
                                                                                                                res.json({ mensaje: err.stack });
                                                                                                            });
                                                                                                        }).catch(function (err) {
                                                                                                            res.json({ mensaje: err.stack });
                                                                                                        });
                                                                                                    }).catch(function (err) {
                                                                                                        res.json({ mensaje: err.stack });
                                                                                                    });
                                                                                                }).catch(function (err) {
                                                                                                    res.json({ mensaje: err.stack });
                                                                                                });
                                                                                            }).catch(function (err) {
                                                                                                res.json({ mensaje: err.stack });
                                                                                            });
                                                                                        }).catch(function (err) {
                                                                                            res.json({ mensaje: err.stack });
                                                                                        });
                                                                                    }).catch(function (err) {
                                                                                        res.json({ mensaje: err.stack });
                                                                                    });
                                                                                }).catch(function (err) {
                                                                                    res.json({ mensaje: err.stack });
                                                                                });
                                                                            }).catch(function (err) {
                                                                                res.json({ mensaje: err.stack });
                                                                            });
                                                                        }).catch(function (err) {
                                                                            res.json({ mensaje: err.stack });
                                                                        });
                                                                    }).catch(function (err) {
                                                                        res.json({ mensaje: err.stack });
                                                                    });
 
 
                                                                }).catch(function (err) {
                                                                    res.json({ mensaje: err.stack });
                                                                });
 
 
                                                        }).catch(function (err) {
                                                            res.json({ mensaje: err.stack });
                                                        });
                                                    }).catch(function (err) {
                                                        res.json({ mensaje: err.stack });
                                                    });
                                                }).catch(function (err) {
                                                    res.json({ mensaje: err.stack });
                                                });
 
                                            }).catch(function (err) {
                                                res.json({ mensaje: err.stack });
                                            });
                                        }).catch(function (err) {
                                            res.json({ mensaje: err.stack });
                                        });
                                    }).catch(function (err) {
                                        res.json({ mensaje: err.stack });
                                    });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack });
                                });
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack });
                            });
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack });
                        });
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack });
                    });
                } else {
                    if (index === (array.length - 1)) {
                        res.json({ mensaje: 'importacion satisfactoria!' })
                    }
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack });
            })
 
        })
    } */
    router.route('/empleados/empresa/:id_empresa/rolTurnos/tipo/:tipo/excel/upload')
        .post(ensureAuthorizedlogged, function (req, res) {
            var arregloSucursales = []
            var arregloGrupos = []
            req.body.forEach(function (rol, index, array) {
                var bandera = false
                if (arregloSucursales.length > 0) {
                    for (var i = 0; i < arregloSucursales.length; i++) {
                        var element = arregloSucursales[i];
                        if (rol.campo != null) {
                            if (element == rol.campo) {
                                bandera = true
                            }
                        }
                    }
                    if (!bandera) {

                        arregloSucursales.push(rol.campo)

                    }
                } else {
                    arregloSucursales.push(rol.campo)

                }
                var bandera2 = false
                if (arregloGrupos.length > 0) {
                    for (var i = 0; i < arregloGrupos.length; i++) {
                        var element = arregloGrupos[i];
                        if (rol.grupo != null) {
                            if (element == rol.grupo) {
                                bandera2 = true
                            }
                        }
                    }
                    if (!bandera2) {

                        arregloGrupos.push(rol.grupo)

                    }
                } else {
                    arregloGrupos.push(rol.grupo)

                }
                if (index === (array.length - 1)) {
                    arregloSucursales.forEach(function (sucursal, index2, array2) {
                        Tipo.find({
                            where: {
                                nombre_corto: 'CENCOS',
                                id_empresa: req.params.id_empresa
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
                            }).spread(function (dato, created) {
                                if (index2 === (array2.length - 1)) {
                                    arregloGrupos.forEach(function (grupo, index3, array3) {
                                        Tipo.find({
                                            where: {
                                                nombre_corto: 'RRHH_GROL',
                                                id_empresa: req.params.id_empresa
                                            }
                                        }).then(function (tipo) {
                                            Clase.findOrCreate({
                                                where: {

                                                    nombre_corto: grupo,
                                                    id_tipo: tipo.dataValues.id
                                                },
                                                defaults: {
                                                    nombre: "GRUPO " + grupo,
                                                    nombre_corto: grupo,
                                                    id_tipo: tipo.dataValues.id,
                                                    habilitado: true,
                                                    eliminado: false
                                                }
                                            }).spread(function (dato, created) {
                                                if (index3 === (array3.length - 1)) {
                                                    req.body.forEach(function (rol, index, array) {
                                                        MedicoPaciente.find({
                                                            where: { codigo: rol.codigo, id_empresa: req.params.id_empresa }
                                                            , include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, limit: 1, order: [["id", "desc"]] }]
                                                        }).then(function (pacienteFound) {
                                                            var sucursal = rol.campo
                                                            if (pacienteFound != null) {
                                                                Tipo.find({
                                                                    where: {
                                                                        nombre_corto: 'CENCOS',
                                                                        id_empresa: req.params.id_empresa
                                                                    }
                                                                }).then(function (tipo) {
                                                                    Clase.find({
                                                                        where: {
                                                                            nombre: sucursal,
                                                                            id_tipo: tipo.id
                                                                        }
                                                                    }).then(function (CentroCosto) {
                                                                        if (CentroCosto) {
                                                                            Tipo.find({
                                                                                where: {
                                                                                    nombre_corto: 'RRHH_GROL',
                                                                                    id_empresa: req.params.id_empresa
                                                                                }
                                                                            }).then(function (tipo) {
                                                                                Clase.find({
                                                                                    where: {
                                                                                        nombre_corto: rol.grupo,
                                                                                        id_tipo: tipo.dataValues.id
                                                                                    }
                                                                                }).then(function (Grupo) {
                                                                                    if (Grupo) {
                                                                                        RrhhEmpleadoRolTurno.find({
                                                                                            where: {
                                                                                                id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                tipo: rol.tipo
                                                                                            },
                                                                                            limit: 1,
                                                                                            order: [['id', 'desc']]
                                                                                        }).then(function (rolEncontrado) {
                                                                                            if (req.params.tipo != 'false') {
                                                                                                if (rolEncontrado) {
                                                                                                    RrhhEmpleadoRolTurno.update({
                                                                                                        id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                        id_campo: CentroCosto.id,
                                                                                                        fecha_inicio: rol.fecha_inicio,
                                                                                                        fecha_fin: rol.fecha_fin,
                                                                                                        tipo: rol.tipo,
                                                                                                        dias_trabajado: rol.dias_trabajo,
                                                                                                        dias_descanso: rol.dias_descanso,
                                                                                                        id_grupo: Grupo.id,
                                                                                                        eliminado: false
                                                                                                    }, {
                                                                                                        where: { id: rolEncontrado.id }
                                                                                                    }).then(function (empleadoRolTurnoActualizado) {
                                                                                                        if (index === (array.length - 1)) {
                                                                                                            res.json({ mensaje: "Registros actualizados satisfactoria!" })
                                                                                                        }

                                                                                                    })
                                                                                                } else {
                                                                                                    if (index === (array.length - 1)) {
                                                                                                        res.json({ mensaje: "Registros actualizados satisfactoria!" })
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                                if (rolEncontrado) {
                                                                                                    RrhhEmpleadoRolTurno.update({
                                                                                                        fecha_fin: rol.fecha_inicio
                                                                                                    }, {
                                                                                                        where: { id: rolEncontrado.id }
                                                                                                    }).then(function (empleadoRolTurnoActualizado) {
                                                                                                        RrhhEmpleadoRolTurno.create({
                                                                                                            id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                            id_campo: CentroCosto.id,
                                                                                                            fecha_inicio: rol.fecha_inicio,
                                                                                                            fecha_fin: rol.fecha_fin,
                                                                                                            tipo: rol.tipo,
                                                                                                            dias_trabajado: rol.dias_trabajo,
                                                                                                            dias_descanso: rol.dias_descanso,
                                                                                                            id_grupo: Grupo.id,
                                                                                                            eliminado: false
                                                                                                        }).then(function (empleadoRolTurnoCreado) {
                                                                                                            if (index === (array.length - 1)) {
                                                                                                                res.json({ mensaje: "Nuevos registros creados satisfactoria!" })
                                                                                                            }

                                                                                                        })
                                                                                                    })
                                                                                                } else {
                                                                                                    RrhhEmpleadoRolTurno.create({
                                                                                                        id_ficha: pacienteFound.empleadosFichas[0].id,
                                                                                                        id_campo: CentroCosto.id,
                                                                                                        fecha_inicio: rol.fecha_inicio,
                                                                                                        fecha_fin: rol.fecha_fin,
                                                                                                        tipo: rol.tipo,
                                                                                                        dias_trabajado: rol.dias_trabajo,
                                                                                                        dias_descanso: rol.dias_descanso,
                                                                                                        id_grupo: Grupo.id,
                                                                                                        eliminado: false
                                                                                                    }).then(function (empleadoRolTurnoCreado) {
                                                                                                        if (index === (array.length - 1)) {
                                                                                                            res.json({ mensaje: "Nuevos registros creados satisfactoria!" })
                                                                                                        }

                                                                                                    })
                                                                                                }
                                                                                            }
                                                                                        })

                                                                                    } else {
                                                                                        if (index === (array.length - 1)) {
                                                                                            res.json({ mensaje: "Importacion satisfactoria!" })
                                                                                        }
                                                                                    }
                                                                                })
                                                                            })
                                                                        } else {
                                                                            if (index === (array.length - 1)) {
                                                                                res.json({ mensaje: "Importacion satisfactoria!" })
                                                                            }
                                                                        }
                                                                    })
                                                                })
                                                            } else {
                                                                if (index === (array.length - 1)) {
                                                                    res.json({ mensaje: "Importacion satisfactoria!" })
                                                                }
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        })
                                    })

                                }
                            })
                        })

                    })
                }
            })
        })

    router.route('/empleados/empresa/excel/upload')
        .post(ensureAuthorizedlogged, function (req, res) {
            var promises = []
            Tipo.find({
                where: {
                    nombre_corto: 'CENCOS',
                    id_empresa: req.body.id_empresa
                }
            }).then(function (tipoCentro) {
                Tipo.find({
                    where: {
                        nombre_corto: 'RRHH_CARGO',
                        id_empresa: req.body.id_empresa
                    }
                }).then(function (tipoCargo) {
                    Tipo.find({
                        where: {
                            nombre_corto: 'RRHH_TC',
                            id_empresa: req.body.id_empresa
                        }
                    }).then(function (tipoContrato) {
                        Tipo.find({
                            where: {
                                nombre_corto: 'RRHH_EXP',
                                id_empresa: req.body.id_empresa
                            }
                        }).then(function (tipoExp) {
                            Tipo.find({
                                where: {
                                    nombre_corto: 'RRHH_SS',
                                    id_empresa: req.body.id_empresa
                                }
                            }).then(function (tipoSeguroSalud) {
                                Tipo.find({
                                    where: { nombre_corto: Diccionario.GENERO }
                                }).then(function (tipoEE) {
                                    Tipo.find({
                                        where: {
                                            nombre_corto: 'RRHH_TEXP',
                                            id_empresa: req.body.id_empresa
                                        }
                                    }).then(function (tipoE) {
                                        sequelize.transaction(function (t) {
                                            for (var i = 0; i < req.body.arregloCargo.length; i++) {
                                                var cargo = req.body.arregloCargo[i];
                                                promises.push(guardarDatosCargo(req, cargo, i, t, tipoCargo))

                                            }
                                            for (var i = 0; i < req.body.arregloContrato.length; i++) {
                                                var contrato = req.body.arregloContrato[i];
                                                promises.push(guardarDatosContrato(req, contrato, i, t, tipoContrato))

                                            }
                                            for (var i = 0; i < req.body.arregloExpedido.length; i++) {
                                                var expedido = req.body.arregloExpedido[i];
                                                promises.push(guardarDatosExpedido(req, expedido, i, t, tipoExp))

                                            }
                                            for (var i = 0; i < req.body.arregloSegurosSalud.length; i++) {
                                                var seguroSalud = req.body.arregloSegurosSalud[i];
                                                promises.push(guardarDatosSeguro(req, seguroSalud, i, t, tipoSeguroSalud))

                                            }
                                            for (var i = 0; i < req.body.arregloSucursales.length; i++) {
                                                var sucursal = req.body.arregloSucursales[i];
                                                promises.push(guardarDatosSucursal(req, sucursal, i, t))

                                            }
                                            for (var i = 0; i < req.body.arregloSucursales.length; i++) {
                                                var sucursal = req.body.arregloSucursales[i];
                                                promises.push(guardarDatosCentroCostos(req, sucursal, i, t, tipoCentro))

                                            }

                                            for (var i = 0; i < req.body.pacientes.length; i++) {
                                                var paciente = req.body.pacientes[i];
                                                promises.push(guardarDatosEmpleado(req, paciente, i, t, tipoCentro,
                                                    tipoCargo,
                                                    tipoContrato,
                                                    tipoExp,
                                                    tipoSeguroSalud, tipoEE, tipoE))
                                            }

                                            return Promise.all(promises);
                                        }).then(function (result) {
                                            res.json({ mensaje: "¡Datos de empleados actualizados satisfactoriamente!" });
                                        }).catch(function (err) {
                                            res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                                        });
                                    }).catch(function (err) {
                                        res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                                    });
                                }).catch(function (err) {
                                    res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                                });
                            }).catch(function (err) {
                                res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                            });
                        }).catch(function (err) {
                            res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                        });
                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                    });
                }).catch(function (err) {
                    res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
                });
            })
        })
    function guardarDatosSucursal(req, sucursal, i, t) {
        return Sucursal.findOrCreate({
            where: {
                nombre: sucursal,
                id_empresa: req.body.id_empresa
            },
            defaults: {
                nombre: sucursal,
                id_empresa: req.body.id_empresa
            }, transaction: t
        }).spread(function (sucursalC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    function guardarDatosCentroCostos(req, sucursal, i, t, tipo) {

        return Clase.findOrCreate({
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
            }, transaction: t
        }).spread(function (sucursalC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }
    function guardarDatosCargo(req, cargo, i, t, tipoCargo) {


        var nombre_corto = cargo.substr(0, 3);
        return Clase.findOrCreate({
            where: {
                nombre: cargo,
                id_tipo: tipoCargo.dataValues.id,
            },
            defaults: {
                id_tipo: tipoCargo.dataValues.id,
                nombre: cargo,
                nombre_corto: nombre_corto,
                habilitado: true,
                eliminado: false
            }, transaction: t
        }).spread(function (cargoC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }
    function guardarDatosContrato(req, contrato, i, t, tipoContrato) {

        var nombre_corto3 = contrato.substr(0, 3);
        return Clase.findOrCreate({
            where: {
                nombre: contrato,
                id_tipo: tipoContrato.dataValues.id,
            },

            defaults: {
                id_tipo: tipoContrato.dataValues.id,
                nombre: contrato,
                nombre_corto: nombre_corto3,
                habilitado: true,
                eliminado: false

            }, transaction: t
        }).spread(function (contratoC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }
    function guardarDatosExpedido(req, expedido, i, t, tipoExp) {

        var nombre_corto3 = expedido.substr(0, 3);
        return Clase.findOrCreate({
            where: {
                nombre: expedido,
                id_tipo: tipoExp.dataValues.id,
            },
            defaults: {
                id_tipo: tipoExp.dataValues.id,
                nombre: expedido,
                nombre_corto: nombre_corto3,
                habilitado: true,
                eliminado: false
            }, transaction: t
        }).spread(function (expeditoC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }
    function guardarDatosSeguro(req, seguroSalud, i, t, tipoSeguroSalud) {

        var nombre_corto3 = seguroSalud.substr(0, 3);
        return Clase.findOrCreate({
            where: {
                nombre: seguroSalud,
                id_tipo: tipoSeguroSalud.dataValues.id,
            },
            defaults: {
                id_tipo: tipoSeguroSalud.dataValues.id,
                nombre: seguroSalud,
                nombre_corto: nombre_corto3,
                habilitado: true,
                eliminado: false
            }, transaction: t
        }).spread(function (seguroSaludC, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }

    function guardarDatosEmpleado(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE) {

        var nombre_corto = pacienteActual.genero.charAt(0)
        return Clase.find({
            where: { nombre_corto: nombre_corto, id_tipo: tipoEE.id },
            transaction: t
        }).then(function (generoEncontrado) {
            return MedicoPaciente.find({
                where: { codigo: pacienteActual.codigo, id_empresa: req.body.id_empresa },
                transaction: t
            }).then(function (pacienteFound) {
                // console.log(pacienteFound)
                return guardarEmpleadoImportacion(req, pacienteActual, i, t, tipoCentro,
                    tipoCargo,
                    tipoContrato,
                    tipoExp,
                    tipoSeguroSalud, tipoEE, tipoE, pacienteFound, generoEncontrado)

            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            })
        })



    }
    function guardarEmpleadoImportacion(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, generoEncontrado) {
        if (pacienteFound != null) {
            var imagen;
            if (pacienteActual.imagen.indexOf('default') > -1) {
                imagen = pacienteActual.imagen;
            } else {
                var imagenPersona = decodeBase64Image(pacienteActual.imagen);
                fs.writeFileSync('./img/persona' + pacienteFound.id_persona + '.jpg', imagenPersona.data, 'base64', function (err) { });
                imagen = './img/persona' + pacienteFound.id_persona + '.jpg';
            }
            /*   var nombre = ""
              if (pacienteActual.nombres) {
                  nombre += pacienteActual.nombres
              }
              if (pacienteActual.segundo_nombre) {
                  nombre += ' ' + pacienteActual.segundo_nombre
              }
              if (pacienteActual.apellido_paterno) {
                  nombre += ' ' + pacienteActual.apellido_paterno
              }
              if (pacienteActual.apellido_materno) {
                  nombre += ' ' + pacienteActual.apellido_materno
              } */
            var nombre = (pacienteActual.apellido_paterno != undefined || pacienteActual.apellido_paterno != null ? pacienteActual.apellido_paterno : '')
                + ' ' + (pacienteActual.apellido_materno != undefined || pacienteActual.apellido_materno != null ? pacienteActual.apellido_materno : '')
                + ' ' + (pacienteActual.nombres != undefined || pacienteActual.nombres != null ? pacienteActual.nombres : '')
                + ' ' + (pacienteActual.segundo_nombre != undefined || pacienteActual.segundo_nombre != null ? pacienteActual.segundo_nombre : '')
            return Persona.update({
                nombres: pacienteActual.nombres,
                segundo_nombre: pacienteActual.segundo_nombre,
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
                },
                transaction: t
            }).then(function (personaActualizada) {
                var persona = { id: pacienteFound.id_persona }
                return guardarDatosEmpleadoExtension(req, pacienteActual, i, t, tipoCentro,
                    tipoCargo,
                    tipoContrato,
                    tipoExp,
                    tipoSeguroSalud, tipoEE, tipoE, persona, pacienteFound)
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })


        } else {
            console.log('paciente nuevo')
            /* var nombre = ""
            if (pacienteActual.nombres) {
                nombre += pacienteActual.nombres
            }
            if (pacienteActual.segundo_nombre) {
                nombre += ' ' + pacienteActual.segundo_nombre
            }
            if (pacienteActual.apellido_paterno) {
                nombre += ' ' + pacienteActual.apellido_paterno
            }
            if (pacienteActual.apellido_materno) {
                nombre += ' ' + pacienteActual.apellido_materno
            } */
            var nombre = (pacienteActual.apellido_paterno != undefined || pacienteActual.apellido_paterno != null ? pacienteActual.apellido_paterno : '')
                + ' ' + (pacienteActual.apellido_materno != undefined || pacienteActual.apellido_materno != null ? pacienteActual.apellido_materno : '')
                + ' ' + (pacienteActual.nombres != undefined || pacienteActual.nombres != null ? pacienteActual.nombres : '')
                + ' ' + (pacienteActual.segundo_nombre != undefined || pacienteActual.segundo_nombre != null ? pacienteActual.segundo_nombre : '')
            return Persona.create({
                nombres: pacienteActual.nombres,
                segundo_nombre: pacienteActual.segundo_nombre ? pacienteActual.segundo_nombre : "",
                segundo_nombre: pacienteActual.segundo_nombre,
                apellido_paterno: pacienteActual.apellido_paterno,
                apellido_materno: pacienteActual.apellido_materno,
                ci: pacienteActual.ci,
                id_genero: generoEncontrado.id,
                nombre_completo: nombre,
                telefono: pacienteActual.telefono,
                telefono_movil: pacienteActual.telefono_movil,
                fecha_nacimiento: pacienteActual.fecha_nacimiento,
                activo: true,
            },
                { transaction: t }).then(function (personaCreada) {
                    var imagen;
                    if (pacienteActual.imagen.indexOf('default') > -1) {
                        imagen = pacienteActual.imagen;
                    } else {
                        var imagenPersona = decodeBase64Image(pacienteActual.imagen);
                        fs.writeFileSync('./img/persona' + personaCreada.id + '.jpg', imagenPersona.data, 'base64', function (err) { });
                        imagen = './img/persona' + personaCreada.id + '.jpg';

                    }
                    return Persona.update({
                        imagen: imagen
                    }, {
                        where: {
                            id: personaCreada.id
                        },
                        transaction: t
                    }).then(function (imagenAct) {
                        return guardarDatosEmpleadoExtension(req, pacienteActual, i, t, tipoCentro,
                            tipoCargo,
                            tipoContrato,
                            tipoExp,
                            tipoSeguroSalud, tipoEE, tipoE, personaCreada, pacienteFound)
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
        }
    }
    function guardarDatosEmpleadoExtension(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, personaCreada, pacienteFound) {
        var nombre_corto2 = pacienteActual.extension.substr(0, 3);
        return Clase.find({
            where: {
                nombre: pacienteActual.extension,
                id_tipo: tipoExp.dataValues.id,
            },
            transaction: t,

        }).then(function (expClase) {
            var idexpClase = null
            if (expClase) {
                idexpClase = expClase.dataValues.id
            }
            return Clase.find({
                where: {
                    nombre: pacienteActual.campamento,
                    id_tipo: tipoCentro.dataValues.id
                },
                transaction: t
            }).then(function (centroCosto) {
                var idcentroCosto = null
                if (centroCosto) {
                    idcentroCosto = centroCosto.id
                }

                return Clase.find({
                    where: {
                        nombre_corto: "CI",
                        id_tipo: tipoE.dataValues.id,
                    },
                    transaction: t,

                }).then(function (TexpClase) {
                    return guardarDatosMedicoPaciente(req, pacienteActual, i, t, tipoCentro,
                        tipoCargo,
                        tipoContrato,
                        tipoExp,
                        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase)
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
        })

    }
    function guardarDatosMedicoPaciente(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase) {
        if (pacienteFound != null) {
            return MedicoPaciente.update({
                regularizado: req.body.empleado.regularizado,
                id_persona: personaCreada.id,
                id_empresa: req.body.id_empresa,
                codigo: pacienteActual.codigo,
                id_extension: idexpClase,
                cargo: pacienteActual.cargo,
                id_campo: idcentroCosto,
                id_tipo_documento: TexpClase.dataValues.id,
                designacion_empresa: pacienteActual.designacion_empresa,
                eliminado: pacienteActual.eliminado,
                es_empleado: true,
                eliminado: pacienteActual.estado
            }, {
                where: { id: pacienteFound.id },
                transaction: t

            }).then(function (medicoPacienteActualizado) {
                return guardarPersonaReferencia(req, pacienteActual, i, t, tipoCentro,
                    tipoCargo,
                    tipoContrato,
                    tipoExp,
                    tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, pacienteFound)
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        } else {
            return MedicoPaciente.create({
                // regularizado: false,
                id_persona: personaCreada.id,
                id_empresa: req.body.id_empresa,
                codigo: pacienteActual.codigo,
                id_extension: idexpClase,
                cargo: pacienteActual.cargo,
                id_campo: idcentroCosto,
                id_tipo_documento: TexpClase.dataValues.id,
                designacion_empresa: pacienteActual.designacion_empresa,
                eliminado: pacienteActual.eliminado,
                es_empleado: true,
                eliminado: pacienteActual.estado
                //comentario: pacienteActual.comentario
            },
                { transaction: t }).then(function (medicoPacienteActualizado) {
                    return guardarPersonaReferencia(req, pacienteActual, i, t, tipoCentro,
                        tipoCargo,
                        tipoContrato,
                        tipoExp,
                        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado)
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
        }

    }
    function guardarPersonaReferencia(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado) {
        /*   if (pacienteActual.contrato) {
              var nombre_corto3 = pacienteActual.contrato.substr(0, 3);
          } else {
              var nombre_corto3 = null
          } */
        return Clase.find({
            where: {
                nombre: pacienteActual.contrato,
                id_tipo: tipoContrato.dataValues.id,
            },
            transaction: t,

        }).then(function (contratoClase) {
            var idcontratoClase = ""
            if (contratoClase) {
                idcontratoClase = contratoClase.dataValues.id
            }
            var fecha = new Date()

            /*   if (pacienteActual.seguro_salud) {
                  var nombre_corto3 = pacienteActual.seguro_salud.substr(0, 3);
              } else {
                  var nombre_corto3 = null;
              } */
            return Clase.find({
                where: {
                    nombre: pacienteActual.seguro_salud,
                    id_tipo: tipoSeguroSalud.dataValues.id,
                },
                transaction: t,
            }).then(function (SeguroSalud) {
                var idSeguroSalud = null
                if (SeguroSalud) {
                    idSeguroSalud = SeguroSalud.dataValues.id
                }
                return guardarPersonaRefFicha(req, pacienteActual, i, t, tipoCentro,
                    tipoCargo,
                    tipoContrato,
                    tipoExp,
                    tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, idcontratoClase, idSeguroSalud)
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


    }
    function guardarPersonaRefFicha(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, idcontratoClase, idSeguroSalud) {
        if (pacienteFound != null) {
            return RrhhEmpleadoFicha.findAll({
                where: {
                    id_empleado: pacienteFound.id,
                },
                transaction: t,
                include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo', include: [{ model: Tipo, as: 'tipo' }] }] }],
                limit: 1,
                order: [['id', 'desc']]
            }).then(function (fichaEncontrada) {

                return Persona.destroy({
                    where: { id: fichaEncontrada[0].id_persona_referencia },
                    transaction: t,
                }).then(function (personaReferenciaEliminada) {
                    /* if (fecha1 == fecha2) { */
                    return Persona.create({
                        nombres: pacienteActual.personaReferencia.nombre_referencia,
                        segundo_nombre: pacienteActual.personaReferencia.segundo_nombre ? pacienteActual.personaReferencia.segundo_nombre : "",
                        telefono: pacienteActual.personaReferencia.telefonos_referencia,
                        telefono_movil: pacienteActual.personaReferencia.celular_referencia,
                        direccion_ciudad: pacienteActual.personaReferencia.ciudad_referencia,
                        direccion_zona: pacienteActual.personaReferencia.zona_referencia,
                        direccion_localidad: pacienteActual.personaReferencia.calle_av_referencia,
                        direccion_numero: pacienteActual.personaReferencia.direccion_numero
                    },
                        {
                            transaction: t
                        }).then(function (personaReferenciaCreada) {
                            return guardarFichasEmpleadoI(req, pacienteActual, i, t, tipoCentro,
                                tipoCargo,
                                tipoContrato,
                                tipoExp,
                                tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada)
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
            })
        } else {
            return Persona.create({
                nombres: pacienteActual.personaReferencia.nombre_referencia,
                telefono: pacienteActual.personaReferencia.telefonos_referencia,
                telefono_movil: pacienteActual.personaReferencia.celular_referencia,
                direccion_ciudad: pacienteActual.personaReferencia.ciudad_referencia,
                direccion_zona: pacienteActual.personaReferencia.zona_referencia,
                direccion_localidad: pacienteActual.personaReferencia.calle_av_referencia,
                direccion_numero: pacienteActual.personaReferencia.direccion_numero
            },
                {
                    transaction: t
                }).then(function (personaReferenciaCreada) {
                    return guardarFichasEmpleadoI(req, pacienteActual, i, t, tipoCentro,
                        tipoCargo,
                        tipoContrato,
                        tipoExp,
                        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud)
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
        }
    }

    function guardarFichasEmpleadoI(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada) {
        if (pacienteFound != null) {
            pacienteActual.fecha_inicio = new Date(pacienteActual.fecha_inicio); pacienteActual.fecha_inicio.setHours(0, 0, 0, 0, 0);
            var fechaFichaEncontrada = new Date(fichaEncontrada[0].dataValues.fecha_inicio)
            var fecha1 = fechaATexto(fechaFichaEncontrada)
            var fecha2 = fechaATexto(pacienteActual.fecha_inicio)
            return RrhhEmpleadoFicha.update({
                id_tipo_contrato: idcontratoClase,
                fecha_inicio: pacienteActual.fecha_inicio,
                haber_basico: pacienteActual.haber_basico,
                // id_caracteristica_discapacidad: pacienteActual.caracteristica_discapacidad.id,
                // vencimiento_carnet_discapacidad: pacienteActual.vencimiento_carnet_discapacidad,
                matricula_seguro: pacienteActual.matricula_seguro,
                id_seguro_salud: idSeguroSalud,
                seguro_salud_carnet: true,
                fecha_expiracion: pacienteActual.fecha_expiracion,
                id_persona_referencia: personaReferenciaCreada.id
            },
                {
                    where: {
                        id: fichaEncontrada[0].dataValues.id
                    }, transaction: t
                }).then(function (CreadoA) {
                    return recorrerHistorialVacacionI(req, pacienteActual, i, t, tipoCentro,
                        tipoCargo,
                        tipoContrato,
                        tipoExp,
                        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada)
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
        } else {
            return RrhhEmpleadoFicha.create({
                fecha: new Date(),
                id_empleado: medicoPacienteActualizado.dataValues.id,
                // id_caracteristica_discapacidad: medicoPacienteActualizado.caracteristica_discapacidad.id,
                //                         vencimiento_carnet_discapacidad: medicoPacienteActualizado.vencimiento_carnet_discapacidad,
                // codigo_tributario: req.body.codigo_tributario ? req.body.codigo_tributario.toString() : '',
                id_tipo_contrato: idcontratoClase,
                fecha_inicio: pacienteActual.fecha_inicio,
                haber_basico: pacienteActual.haber_basico,
                matricula_seguro: pacienteActual.matricula_seguro,
                id_seguro_salud: idSeguroSalud,
                seguro_salud_carnet: true,
                fecha_expiracion: pacienteActual.fecha_expiracion,
                id_persona_referencia: personaReferenciaCreada.id,
                activo: true,
                id_campo: idcentroCosto
            },
                { transaction: t }).then(function (Creado) {
                    return guardarCargoEmpleadoI(req, pacienteActual, i, t, tipoCentro,
                        tipoCargo,
                        tipoContrato,
                        tipoExp,
                        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, Creado)
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
        }
    }
    function guardarCargoEmpleadoI(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada) {
        if (pacienteFound != null) {
            if (pacienteActual.cargo) {
                var nombre_corto = pacienteActual.cargo.substr(0, 3);
            } else {
                var nombre_corto = null
            }
            return Clase.find({
                where: {
                    nombre: pacienteActual.cargo,
                    id_tipo: tipoCargo.dataValues.id,
                },
                transaction: t,
            }).then(function (cargoClase) {
                return RrhhEmpleadoCargo.destroy({
                    where: {
                        id_ficha: fichaEncontrada[0].dataValues.id
                    }
                }).then(function (cargoDestruido) {
                    return RrhhEmpleadoCargo.create({
                        /* id_empleado: medicoPacienteActualizado.id, */
                        id_cargo: cargoClase.id,
                        id_ficha: fichaEncontrada[0].dataValues.id

                    }, {
                        transaction: t
                    }).then(function (params) {
                        return recorrerHistorialVacacionI(req, pacienteActual, i, t, tipoCentro,
                            tipoCargo,
                            tipoContrato,
                            tipoExp,
                            tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada)
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
            })
        } else {
            if (pacienteActual.cargo) {
                var nombre_corto = pacienteActual.cargo.substr(0, 3);
            } else {
                var nombre_corto = null
            }
            return Clase.find({
                where: {
                    nombre: pacienteActual.cargo,
                    id_tipo: tipoCargo.dataValues.id,
                },
                transaction: t,

            }).then(function (cargoClase) {
                return RrhhEmpleadoCargo.create({
                    /* id_empleado: medicoPacienteActualizado.id, */
                    id_cargo: cargoClase.id,
                    id_ficha: fichaEncontrada.id
                },
                    { transaction: t }).then(function (params) {
                        return recorrerHistorialVacacionI(req, pacienteActual, i, t, tipoCentro,
                            tipoCargo,
                            tipoContrato,
                            tipoExp,
                            tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada)
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

        }

    }
    function recorrerHistorialVacacionI(req, pacienteActual, i, t, tipoCentro,
        tipoCargo,
        tipoContrato,
        tipoExp,
        tipoSeguroSalud, tipoEE, tipoE, pacienteFound, personaCreada, idexpClase, idcentroCosto, TexpClase, medicoPacienteActualizado, personaReferenciaCreada, idcontratoClase, idSeguroSalud, fichaEncontrada) {
        if (pacienteFound != null) {
            return RrhhEmpleadoHistorialVacacion.destroy({
                where: { id_ficha: fichaEncontrada[0].dataValues.id }, transaction: t
            }).then(function (historialvacacionEliminado) {
                if (pacienteActual.historialVacacion.length > 0) {
                    var promises = []
                    for (var i = 0; i < pacienteActual.historialVacacion.length; i++) {
                        var historial = pacienteActual.historialVacacion[i];
                        promises.push(guardarhistorialVacacionI(req, historial, i, t, fichaEncontrada))
                    }
                }
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        } else {
            if (pacienteActual.historialVacacion.length > 0) {
                var contador = 0
                var promises = []
                for (var i = 0; i < pacienteActual.historialVacacion.length; i++) {
                    var historial = pacienteActual.historialVacacion[i];
                    promises.push(guardarhistorialVacacionI(req, historial, i, t, fichaEncontrada))
                }
                return Promise.all(promises)
            } else {
                return new Promise(function (fulfill, reject) {
                    fulfill();
                });
            }
        }
    }
    function guardarhistorialVacacionI(req, historial, i, t, fichaEncontrada) {
        return RrhhEmpleadoHistorialVacacion.create({
            aplicadas: historial.aplicadas,
            tomadas: historial.tomadas,
            anio: historial.anio,
            gestion: historial.gestion,
            eliminado: false,
            id_ficha: fichaEncontrada.dataValues ? fichaEncontrada.id : fichaEncontrada[0].dataValues.id
        },
            { transaction: t }).then(function (historialCreado) {

            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
    }
    router.route('/validar-codigo-empleado/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            MedicoPaciente.find({
                where: {
                    codigo: req.body.codigo,
                    eliminado: false,
                    id_empresa: req.params.id_empresa
                }
            }).then(function (entidad) {
                if (entidad) {
                    res.json({
                        type: true,
                        message: "¡el codigo ya Exsiste!"
                    });
                } else {
                    res.json({
                        type: false,
                        message: "Codigo Disponible"
                    });
                }
            });
        })
    router.route('/recurso-humanos/capacidades/hoja-vida/:id_hoja_vida/inicio/:inicio/fin/:fin/tipo/:tipo')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionCapacidades = {}
            var condicionTipo = {}
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 0, 0, 0);
                condicionCapacidades = { id_hoja_vida: req.params.id_hoja_vida, fecha: { $between: [inicio, fin] } };
            } else {
                condicionCapacidades = { id_hoja_vida: req.params.id_hoja_vida };
            }
            if (req.params.tipo != "INTER") {
                condicionTipo = { nombre_corto: req.params.tipo }
            }
            RrhhEmpleadoCapacidadInternaExterna.findAll({
                where: condicionCapacidades,
                include: [{ model: Clase, as: 'tipoCapacidad', where: condicionTipo }]
            }).then(function (entidad) {
                res.json({ capacidades: entidad })
            });
        });

    router.route('/recursos-humanos/matriz-anticipos/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhAnticipo.findAll({
                include: [{ model: Clase, as: 'tipoAnticipo' }, {
                    model: RrhhEmpleadoFicha, as: 'ficha', required: true, include: [
                        { model: RrhhEmpleadoHoraExtraOrdinaria, as: 'horasExtraOrdiniarias' },
                        { model: Clase, as: 'tipoPersonal' },
                        { model: Clase, as: 'banco' }, {
                            model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa },
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                }],
                where: { matriz_reutilizable: true }
            }).then(function (encontrados) {
                res.json({ matriz: encontrados })
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhAnticipo.findAll({
                include: [{ model: Clase, as: 'tipoAnticipo' }, {
                    model: RrhhEmpleadoFicha, as: 'ficha', include: [
                        { model: RrhhEmpleadoHoraExtraOrdinaria, as: 'horasExtraOrdiniarias' },
                        { model: Clase, as: 'tipoPersonal' },
                        { model: Clase, as: 'banco' }, {
                            model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa },
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                }],
                where: { matriz_reutilizable: true }
            }).then(function (encontrados) {
                if (encontrados.length > 0) {
                    encontrados.forEach(function (anticipo, index2, array2) {
                        RrhhAnticipo.update({
                            matriz_reutilizable: false
                        }, { where: { id: anticipo.id } }).then(function (actulizado) {
                            if (index2 === (array2.length - 1)) {
                                req.body.forEach(function (anticipo, index, array) {
                                    RrhhAnticipo.update({
                                        matriz_reutilizable: true
                                    }, { where: { id: anticipo.id } }).then(function (actulizado) {
                                        if (index === (array.length - 1)) {
                                            res.json({ mensaje: 'Matriz asignada satisfactoriamente!' })
                                        }
                                    })
                                });
                            }
                        })
                    });
                } else {
                    req.body.forEach(function (anticipo, index, array) {
                        RrhhAnticipo.update({
                            matriz_reutilizable: true
                        }, { where: { id: anticipo.id } }).then(function (actulizado) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: 'Matriz asignada satisfactoriamente!' })
                            }
                        })
                    });
                }
            })

        })
    router.route('/recursos-humanos/anticipos/empleado/:id_ficha')
        .post(ensureAuthorizedlogged, function (req, res) {
            Clase.find({
                where: { nombre_corto: req.body.textoClase }
            }).then(function (clase) {
                RrhhAnticipo.create({
                    id_ficha: req.params.id_ficha,
                    fecha: req.body.fecha,
                    monto: req.body.monto,
                    id_tipo: clase.id,
                    total: req.body.total,
                    salario_basico: req.body.salario_basico,
                    eliminado: false,
                    entregado: false,
                    detalle: req.body.detalle
                }).then(function (empleadoaAnticipo) {
                    RrhhAnticipo.findAll({
                        where: { id_ficha: req.params.id_ficha, id_tipo: { $ne: clase.id } }
                    }).then(function (anticipos) {
                        var anteriorMonto = 0
                        if (anticipos.length > 0) {
                            anticipos.forEach(function (anticipo, index, array) {
                                /*   var total = req.body.montoExtraoridnario + anticipo.monto */
                                if (index == 0) {
                                    var total = req.body.montoExtraoridnario + anticipo.monto
                                } else {
                                    var total = anticipo.monto + anteriorMonto
                                }
                                anteriorMonto = total
                                RrhhAnticipo.update({
                                    total: total,
                                }, {
                                    where: { id: anticipo.id }
                                }).then(function (empleadoaAnticipo) {
                                    if (index === (array.length - 1)) {
                                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                                    }
                                })
                            });
                        } else {
                            res.json({ mensaje: "Guardado satisfactoriamente!" })
                        }

                    })
                })
            })

        })
        .put(ensureAuthorizedlogged, function (req, res) {
            if (!req.body.eliminado) {
                RrhhAnticipo.update({
                    monto: req.body.monto,
                    total: req.body.total,
                }, {
                    where: { id: req.body.id }
                }).then(function (empleadoaAnticipo) {
                    RrhhAnticipo.findAll({
                        where: { id_ficha: req.params.id_ficha, id_tipo: { $ne: req.body.id_tipo } }
                    }).then(function (anticipos) {
                        var anteriorMonto = 0
                        if (anticipos.length > 0) {
                            anticipos.forEach(function (anticipo, index, array) {
                                /*   var total = req.body.montoExtraoridnario + anticipo.monto */
                                if (index == 0) {
                                    var total = req.body.montoExtraoridnario + anticipo.monto
                                } else {
                                    var total = anticipo.monto + anteriorMonto
                                }
                                anteriorMonto = total
                                RrhhAnticipo.update({
                                    total: total,
                                }, {
                                    where: { id: anticipo.id }
                                }).then(function (empleadoaAnticipo) {
                                    if (index === (array.length - 1)) {
                                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                                    }
                                })
                            });
                        } else {
                            res.json({ mensaje: "Guardado satisfactoriamente!" })
                        }
                    })

                })
            } else {
                RrhhAnticipo.update({
                    eliminado: true,
                }, {
                    where: { id: req.body.id }
                }).then(function (empleadoaAnticipo) {
                    res.json({ mensaje: "Guardado satisfactoriamente!" })
                })
            }
        })
    router.route('/recursos-humanoss/anticipos/empleados')
        .post(ensureAuthorizedlogged, function (req, res) {

            for (let i = 0; i < req.body.anticipos.length; i++) {
                const anticipo = req.body.anticipos[i];
                Clase.find({
                    where: { nombre_corto: req.body.textoClase }
                }).then(function (clase) {
                    RrhhEmpleadoFicha.findAll({
                        limit: 1,
                        where: {
                            id_empleado: anticipo.empleado.id,
                            activo: true
                        },
                        order: [['id', 'DESC']]
                    }).then(function (fichaEncontrada) {
                        RrhhAnticipo.create({
                            // id_ficha: anticipo.empleado.ficha ? anticipo.empleado.ficha.id : anticipo.empleado.id_ficha,
                            id_ficha: fichaEncontrada[0].id,
                            fecha: anticipo.fecha,
                            monto: anticipo.monto,
                            id_tipo: clase.id,
                            total: anticipo.total,
                            eliminado: false,
                            salario_basico: anticipo.salario_basico,
                            tope: anticipo.tope,
                            tipo_porcentual: anticipo.tipo_porcentual,
                            porcentaje: anticipo.porcentaje,
                            promedio_total_ganado: anticipo.promedio_total_ganado
                        }).then(function (empleadoaAnticipo) {
                            RrhhAnticipo.findAll({
                                where: { id_ficha: fichaEncontrada[0].id, id_tipo: { $ne: clase.id } }
                            }).then(function (anticipos) {
                                if (anticipos.length > 0) {
                                    var anteriorMonto = 0
                                    anticipos.forEach(function (anticipo2, index, array) {
                                        if (index == 0) {
                                            var total = anticipo.montoordinario + anticipo2.monto
                                        } else {
                                            var total = anticipo2.monto + anteriorMonto
                                        }
                                        anteriorMonto = total
                                        RrhhAnticipo.update({
                                            total: total,
                                        }, {
                                            where: { id: anticipo2.id }
                                        }).then(function (empleadoaAnticipo) {
                                            if (index === (array.length - 1)) {
                                                res.json({ mensaje: "Guardado satisfactoriamente!" })
                                            }
                                        })
                                    })
                                } else {
                                    res.json({ mensaje: "Guardado satisfactoriamente!" })
                                }
                            })
                        })
                    })


                })
            }
            /* req.body.anticipos.forEach(function (anticipo, index, array) {
 
                Clase.find({
                    where: { nombre_corto: req.body.textoClase }
                }).then(function (clase) {
                    RrhhAnticipo.create({
                        id_empleado: anticipo.empleado.id,
                        fecha: anticipo.fecha,
                        monto: anticipo.monto,
                        id_tipo: clase.id,
                        total: anticipo.total,
                        eliminado: false,
                        salario_basico: anticipo.salario_basico,
                        tope: anticipo.tope
                    }).then(function (empleadoaAnticipo) {
                        RrhhAnticipo.findAll({
                            where: { id_empleado: empleadoaAnticipo.id_empleado, id_tipo: { $ne: clase.id } }
                        }).then(function (anticipos) {
                            if (anticipos.length > 0) {
                                var anteriorMonto = 0
                                anticipos.forEach(function (anticipo2, index, array) {
                                    if (index == 0) {
                                        var total = anticipo.montoordinario + anticipo2.monto
                                    }else{
                                        var total = anticipo.montoordinario + anticipo2.monto+anteriorMonto
                                    }
                                    anteriorMonto=anticipo2.monto
                                    RrhhAnticipo.update({
                                        total: total,
                                    }, {
                                            where: { id: anticipo2.id }
                                        }).then(function (empleadoaAnticipo) {
                                            if (index === (array.length - 1)) {
                                                res.json({ mensaje: "Guardado satisfactoriamente!" })
                                            }
                                        })
                                })
                            } else {
                                res.json({ mensaje: "Guardado satisfactoriamente!" })
                             }
 
 
                    })
                })
            }); */

        })

    router.route('/recursos-humanos/anticipos/empleado/:id_ficha/inicio/:inicio/fin/:fin/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionAnticipo = {}
            var condicionEmpleado = { es_empleado: true }
            var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
            var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
            if (req.params.id_ficha != "0") {
                condicionAnticipo = { id_ficha: req.params.id_ficha, eliminado: false, fecha: { $between: [inicio, fin] } };
            } else {
                condicionAnticipo = { eliminado: false, fecha: { $between: [inicio, fin] } };
                condicionEmpleado = { es_empleado: true, id_empresa: req.params.id_empresa }
            }
            RrhhAnticipo.findAll({
                where: condicionAnticipo,
                include: [{ model: Clase, as: 'tipoAnticipo' }, {
                    model: RrhhEmpleadoFicha, as: 'ficha', include: [
                        { model: RrhhEmpleadoHoraExtraOrdinaria, as: 'horasExtraOrdiniarias' },
                        { model: Clase, as: 'tipoPersonal' },
                        { model: Clase, as: 'banco' },
                        { model: Clase, as: 'area' },
                        {
                            model: MedicoPaciente, as: 'empleado', where: condicionEmpleado,
                            include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'extension' }]
                        }]
                }],

                order: sequelize.literal('`ficha.empleado`.`id` asc, `agil_rrhh_empleado_anticipo`.`createdAt` asc')
            }).then(function (empleadoaAnticipo) {
                RRHHParametros.find({
                    where: { id_empresa: req.params.id_empresa },
                }).then(function (parametros, created) {
                    res.json({ anticipos: empleadoaAnticipo, parametros: parametros })
                }).catch((err) => {
                    console.error(err)
                    res.json({ hasErr: true, mensaje: err.stack, anticipos: [], parametros: [] })
                });
            })
        })
    router.route('/empleados/edicion/doc-pre-requisito')
        .post(ensureAuthorizedlogged, function (req, res) {
            var prerequisitoAsignado = req.body
            fs.writeFileSync('./documentos/rrhh/empleados-prerequisitos/prerequisito-' + prerequisitoAsignado.id + "-" + req.body.documento2.name, req.body.documento2.data, 'binary', function (err) {

                if (err)
                    console.log(err);
                else
                    console.log("The file was saved!");
            });
            var namedoc = './documentos/rrhh/empleados-prerequisitos/prerequisito-' + prerequisitoAsignado.id + "-" + req.body.documento2.name;
            MedicoPacientePreRequisito.update({
                documento: namedoc
            }, {
                where: { id: prerequisitoAsignado.id }
            }).then(function (affecteedRows) {
                res.json({ mensaje: "documento Pre-requisito actualizado satisfactoriamente!" });
            })
        })
    router.route('/pre-requisito/asignar/documento-pre-requisito')
        .post(ensureAuthorizedlogged, function (req, res) {
            var prerequisitoAsignado = req.body.prerequisitoParaAsignar
            MedicoPacientePreRequisito.update({
                documento: req.body.documento
            }, {
                where: { id: prerequisitoAsignado.id }
            }).then(function (affecteedRows) {
                res.json({ mensaje: "documento asignado a Pre-requisito seleccionado satisfactoriamente!" });
            })
        })

    //rutas ausencias
    router.route('/recursos-humanos/ausencia/empleado/:id_ficha')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id != undefined) {
                if (req.body.eliminado) {
                    RrhhEmpleadoAusencia.update({
                        eliminado: req.body.eliminado,
                    }, {
                        where: { id: req.body.id }
                    }).then(function (empleadoAusenciaActualizada) {
                        res.json({ mensaje: "Eliminado satisfactoriamente!" })
                    })
                } else {
                    RrhhEmpleadoAusencia.update({
                        id_tipo: req.body.tipoAusencia.id,
                        fecha_inicio: req.body.fecha_inicio,
                        fecha_fin: req.body.fecha_fin,
                        diagnostico: req.body.diagnostico,
                        observacion: req.body.observacion,
                        dias: req.body.dias,
                        horas: req.body.horas,
                        eliminado: false,
                        primera_baja: req.body.primera_baja,
                        usar_vehiculo: req.body.usar_vehiculo,
                        id_vehiculo: req.body.vehiculo ? req.body.vehiculo.id : null,
                        planilla: req.body.planilla,
                        id_estado: req.body.estado ? req.body.estado.id : null,
                        id_usuario: req.body.id_usuario
                    }, {
                        where: { id: req.body.id }
                    }).then(function (empleadoAusenciaActualizada) {
                        res.json({ mensaje: "Actualizado satisfactoriamente!" })
                    })
                }
            } else {
                RrhhEmpleadoAusencia.create({
                    id_ficha: req.params.id_ficha,
                    id_tipo: req.body.tipoAusencia.id,
                    fecha_inicio: req.body.fecha_inicio,
                    fecha_fin: req.body.fecha_fin,
                    diagnostico: req.body.diagnostico,
                    observacion: req.body.observacion,
                    dias: req.body.dias,
                    horas: req.body.horas,
                    eliminado: false,
                    primera_baja: req.body.primera_baja,
                    usar_vehiculo: req.body.usar_vehiculo,
                    id_vehiculo: req.body.vehiculo ? req.body.vehiculo.id : null,
                    planilla: req.body.planilla,
                    id_estado: req.body.estado ? req.body.estado.id : null,
                    id_usuario: req.body.id_usuario
                }).then(function (empleadoAusenciaCreado) {
                    if (req.body.compensaciones) {
                        if (req.body.compensaciones.length > 0) {
                            req.body.compensaciones.forEach(function (compensacion, index, array) {
                                RrhhEmpleadoCompensacionAusencia.create({
                                    id_ausencia: empleadoAusenciaCreado.id,
                                    fecha: compensacion.fecha_real,
                                    hora_inicio: compensacion.hora_inicio,
                                    hora_fin: compensacion.hora_fin,
                                    tiempo: compensacion.total,
                                    eliminado: false
                                }).then(function (compensacionCreada) {
                                    if (index === (array.length - 1)) {
                                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                                    }
                                })
                            })

                        } else {
                            res.json({ mensaje: "Guardado satisfactoriamente!" })
                        }
                    } else {
                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                    }
                })
            }
        })
    router.route('/recursos-humanos/ausencias/empleado/:id_empleado/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/tipo/:tipo')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionAusencias = { id_ficha: req.params.id_empleado, eliminado: false };
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionAusencias = { id_ficha: req.params.id_empleado, eliminado: false, fecha_inicio: { $between: [inicio, fin] } };
                if (req.params.tipo_ausencia != 0) {
                    condicionAusencias = { id_ficha: req.params.id_empleado, eliminado: false, tipo: req.params.tipo_ausencia, fecha_inicio: { $between: [inicio, fin] } };
                }
            } else if (req.params.tipo_ausencia != 0) {
                condicionAusencias = { id_ficha: req.params.id_empleado, eliminado: false, tipo: req.params.tipo_ausencia };
            }
            RrhhEmpleadoAusencia.findAll({
                where: condicionAusencias,
                include: [
                    {
                        model: Usuario, as: 'usuario',
                        attributes: ['id', 'id_persona'],
                        include: [{
                            model: Persona, as: 'persona',
                            attributes: ['nombre_completo']
                        }]

                    },
                    { model: Clase, as: 'estado', required: false, where: { nombre_corto: 'RTR' } }, { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado' }] }, { model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: req.params.tipo } }] }]
            }).then(function (ausencias) {
                res.json(ausencias)
            })

        })
    router.route('/recursos-humanos/ausencias/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/estado/:estado/tipo/:tipo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionAusencias = { eliminado: false };
            var condicionPersona = {}
            var condicionEstado = {}
            if (req.params.estado != 0) {
                condicionEstado.id = req.params.estado
            }
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
                condicionAusencias = { eliminado: false, fecha_inicio: { $between: [inicio, fin] } };
                if (req.params.tipo_ausencia != 0) {
                    condicionAusencias = { eliminado: false, tipo: req.params.tipo_ausencia, fecha_inicio: { $between: [inicio, fin] } };
                }
            } else if (req.params.tipo_ausencia != 0) {
                condicionAusencias = { eliminado: false, tipo: req.params.tipo_ausencia };
            }
            if (req.params.texto_busqueda != '0') {
                condicionPersona = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
            }
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            datosbusqueda = {
                where: condicionAusencias,
                include: [{ model: Usuario, as: 'usuario', required: false, include: [{ model: Persona, as: 'persona', attributes: ['nombre_completo'] }] }, { model: Clase, as: 'vehiculo' }, {
                    model: MedicoPaciente, as: 'autorizador',
                    include: [{ model: Persona, as: 'persona' }]
                }, { model: Clase, as: 'estado', where: condicionEstado }, {
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{
                        model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                    }]
                },
                {
                    model: RrhhClaseAsuencia, as: 'tipoAusencia',
                    include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: req.params.tipo } }]
                }]
            }

            datosbusqueda.group = ["`agil_rrhh_empleado_ausencia`.`id`"]
            RrhhEmpleadoAusencia.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                RrhhEmpleadoAusencia.findAll(
                    datosbusqueda
                ).then(function (ausencias) {
                    res.json({ ausencias: ausencias, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/recursos-humanos/ausencias-med/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipo-ausencia/:tipo_ausencia/estado/:estado/tipo/:tipo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionAusencias = { eliminado: false };
            var condicionPersona = {}
            var condicionEstado = {}
            if (req.params.estado != 0) {
                condicionEstado.id = req.params.estado
            }
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
                condicionAusencias = { eliminado: false, fecha_inicio: { $between: [inicio, fin] } };
                if (req.params.tipo_ausencia != 0) {
                    condicionAusencias = { eliminado: false, tipo: req.params.tipo_ausencia, fecha_inicio: { $between: [inicio, fin] } };
                }
            } else if (req.params.tipo_ausencia != 0) {
                condicionAusencias = { eliminado: false, tipo: req.params.tipo_ausencia };
            }
            if (req.params.texto_busqueda != '0') {
                condicionPersona = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
            }
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            datosbusqueda = {
                where: condicionAusencias,
                include: [{
                    model: Usuario, as: 'usuario', required: false,
                    attributes: ['id_persona'],
                    include: [{ model: Persona, as: 'persona', attributes: ['nombre_completo'] }]
                }
                    , {
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{
                        model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                    },
                    {
                        model: Clase, as: 'ubicacion',
                        attributes: ['nombre']
                    },]
                },
                {
                    model: RrhhClaseAsuencia, as: 'tipoAusencia',
                    include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: req.params.tipo } }]
                }]
            }
            datosbusqueda.group = ["`agil_rrhh_empleado_ausencia`.`id`"]
            RrhhEmpleadoAusencia.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                RrhhEmpleadoAusencia.findAll(
                    datosbusqueda
                ).then(function (ausencias) {
                    res.json({ ausencias: ausencias, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    //fin rutas ausencias

    //inicio ruta ausencia personal
    router.route('/recursos-humanos/ausencias/empresa/:id_empresa/id_ausencia/:id_ausencia')
        .get(ensureAuthorizedlogged, function (req, res) {

            RrhhEmpleadoAusencia.findAll({
                where: { id: req.params.id_ausencia },
                include: [{ model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }] }] }, { model: RrhhClaseAsuencia, as: 'tipoAusencia', include: [{ model: Tipo, as: 'tipo' }] }]
            }).then(function (ausencias) {
                res.json(ausencias)
            })
        })
    //Fin ruta ausencia personal
    //rutas solicitud vacacion
    //crear concepto nombre:"estados solicitud vacacion" nombre_corto:"ESVRRHH"
    //pendiente
    //aprobado
    //rechasado
    router.route('/recursos-humanos/solicitud-vacacion/ficha/:id_ficha')
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoSolicitudVacacion.create({
                id_ficha: req.params.id_ficha,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                observacion: req.body.observacion,
                dias: req.body.dias,
                sabado: req.body.sabado,
                inicio_tipo: req.body.inicio_tipo,
                fin_tipo: req.body.fin_tipo,
                eliminado: false,
                domingos: req.body.domingos,
                feriados: req.body.feriados,//dias_Descuento
                fecha_creacion: req.body.fecha_creacion,
                id_estado: req.body.estado.id,
                comentario: req.body.comentario
            }).then(function (empleadoVacacionCreado) {
                res.json({ mensaje: "Solicitud creada Satisfactoriamente!" })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoSolicitudVacacion.update({
                id_ficha: req.params.id_ficha,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                observacion: req.body.observacion,
                dias: req.body.dias,
                sabado: req.body.sabado,
                inicio_tipo: req.body.inicio_tipo,
                fin_tipo: req.body.fin_tipo,
                eliminado: req.body.eliminado,
                domingos: req.body.domingos,
                feriados: req.body.dias_descuento,
                id_estado: req.body.estado.id,
                comentario: req.body.comentario
            }, {
                where: { id: req.body.id }
            }).then(function (empleadoVacacionActualizada) {
                res.json({ mensaje: "Solicitud actualizada Satisfactoriamente!" })
            })

        })
    router.route('/recursos-humanos-solicitudes-vacacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(function (req, res) {
            var condicionEmpleado = { id_empresa: req.params.id_empresa }
            var condicionFicha = {}
            var condicionSolicitudVacaciones = { eliminado: false };
            if (req.params.inicio != 0) {
                var inicio = req.params.inicio + "T00:00:00.000Z"
                var fin = req.params.fin + "T23:59:59.000Z"
                // var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                // var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 0);
                condicionSolicitudVacaciones.fecha_Creacion = { $between: [inicio, fin] };
            }
            RrhhEmpleadoSolicitudVacacion.count({
                where: condicionSolicitudVacaciones,
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha, include: [{
                        model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }]
                    }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' },
                    {
                        model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado,
                        include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }]
                    }]
                }]
            }).then(function (datos) {
                RrhhEmpleadoSolicitudVacacion.findAll({
                    where: condicionSolicitudVacaciones,
                    include: [{
                        model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha, include: [{
                            model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }]
                        }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' }, { model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }]
                }).then(function (solicitudesVacacion) {
                    res.json({ solicitudes: solicitudesVacacion, paginas: Math.ceil(datos / req.params.items_pagina) });
                })
            })
        })
    //rutas vacaciones
    router.route('/recursos-humanos/vacacion/ficha/:id_ficha')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id) {
                sequelize.transaction(async (t) => {
                    try {
                        await RrhhEmpleadoVacaciones.update({
                            id_usuario: req.body.id_usuario,
                            id_ficha: req.params.id_ficha,
                            fecha_inicio: req.body.fecha_inicio,
                            fecha_fin: req.body.fecha_fin,
                            observacion: req.body.observacion,
                            dias: req.body.dias,
                            sabado: req.body.sabado,
                            inicio_tipo: req.body.inicio_tipo,
                            fin_tipo: req.body.fin_tipo,
                            eliminado: false,
                            domingos: req.body.domingos,
                            feriados: req.body.dias_descuento
                        }, { where: { id: req.body.id }, transaction: t })
                        var gestiones = ""
                        await RrhhEmpleadoDescuentoVacacionHistorial.destroy({
                            where: {
                                id_vacacion: req.body.id
                            }, transaction: t
                        })
                        for (const historial of req.body.historial) {
                            if (historial.anio <= req.body.aniosDisponibles) {
                                var restante = historial.aplicadas - historial.tomadas
                                if (restante != 0) {
                                    var tomadas = 0
                                    if (req.body.dias >= restante) {
                                        req.body.dias = req.body.dias - restante
                                        tomadas = restante + historial.tomadas
                                    } else {
                                        tomadas = req.body.dias + historial.tomadas
                                        req.body.dias = 0
                                    }
                                    if (tomadas != 0) {

                                        restantes = (historial.aplicadas - tomadas) + " días de la gestion " + historial.gestion + "-" + (historial.gestion + 1)
                                        gestiones += historial.gestion + "-" + (historial.gestion + 1) + ", "
                                        await RrhhEmpleadoVacaciones.update({
                                            dias_restante: historial.aplicadas - tomadas,
                                        }, {
                                            where: { id: req.body.id }, transaction: t
                                        })
                                        await RrhhEmpleadoHistorialVacacion.update({
                                            tomadas: tomadas
                                        }, {
                                            where: { id: historial.id }, transaction: t
                                        })
                                        await RrhhEmpleadoDescuentoVacacionHistorial.create({
                                            id_vacacion: req.body.id,
                                            id_historial_vacacion: historial.id
                                        }, { transaction: t })
                                    }
                                }
                            }
                        }

                        return new Promise(function (fulfill, reject) {
                            fulfill({ mensaje: "Guardado satisfactoriamente!", gestiones: gestiones, restantes: restantes });
                        });
                    } catch (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }
                }).then((result) => {
                    res.json(result)
                }).catch((err) => {
                    res.json({ mensaje: err.stack ? err.stack : err })
                })

            } else {
                RrhhEmpleadoVacaciones.create({
                    id_usuario: req.body.id_usuario,
                    id_ficha: req.params.id_ficha,
                    fecha_inicio: req.body.fecha_inicio,
                    fecha_fin: req.body.fecha_fin,
                    observacion: req.body.observacion,
                    dias: req.body.dias,
                    sabado: req.body.sabado,
                    inicio_tipo: req.body.inicio_tipo,
                    fin_tipo: req.body.fin_tipo,
                    eliminado: false,
                    domingos: req.body.domingos,
                    feriados: req.body.dias_descuento,
                    fecha_creacion: req.body.fecha_creacion
                }).then(function (empleadoVacacionCreado) {//dias=12
                    var gestiones = ""
                    req.body.historial.forEach(function (historial, index, array) {
                        if (historial.anio <= req.body.aniosDisponibles) {
                            var restante = historial.aplicadas - historial.tomadas
                            if (restante != 0) {
                                var tomadas = 0
                                if (req.body.dias >= restante) {
                                    req.body.dias = req.body.dias - restante
                                    tomadas = restante + historial.tomadas
                                } else {
                                    tomadas = req.body.dias + historial.tomadas
                                    req.body.dias = 0
                                }
                                if (tomadas != 0) {

                                    restantes = (historial.aplicadas - tomadas) + " días de la gestion " + historial.gestion + "-" + (historial.gestion + 1)
                                    gestiones += historial.gestion + "-" + (historial.gestion + 1) + ", "
                                    RrhhEmpleadoVacaciones.update({
                                        dias_restante: historial.aplicadas - tomadas,
                                    }, {
                                        where: { id: empleadoVacacionCreado.id }
                                    }).then(function (empleadoVacaActualizado) {
                                        RrhhEmpleadoHistorialVacacion.update({
                                            tomadas: tomadas
                                        }, {
                                            where: { id: historial.id }
                                        }).then(function (historialVacacionActualizado) {
                                            RrhhEmpleadoDescuentoVacacionHistorial.create({
                                                id_vacacion: empleadoVacacionCreado.id,
                                                id_historial_vacacion: historial.id
                                            }).then(function (descuentoCreado) {
                                                if (index === (array.length - 1)) {
                                                    res.json({ mensaje: "Guardado satisfactoriamente!", gestiones: gestiones, restantes: restantes })
                                                }
                                            })

                                        })

                                    })
                                } else {
                                    if (index === (array.length - 1)) {
                                        res.json({ mensaje: "Guardado satisfactoriamente!", gestiones: gestiones, restantes: restantes })
                                    }
                                }
                            } else {
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Guardado satisfactoriamente!", gestiones: gestiones, restantes: restantes })
                                }
                            }
                        } else {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Guardado satisfactoriamente!", gestiones: gestiones, restantes: restantes })
                            }
                        }
                    });
                })
            }
        })
    router.route('/recursos-humanos/eliminar-vacacion/:id_vacacion')
        .post(ensureAuthorizedlogged, async function (req, res) {
            sequelize.transaction(async (t) => {
                try {
                    let tomadas = 0
                    let restante = 0
                    await RrhhEmpleadoVacaciones.update({
                        eliminado: true
                    }, { where: { id: req.params.id_vacacion }, transaction: t })
                    let datosVacacion = await RrhhEmpleadoVacaciones.find({
                        where: { id: req.params.id_vacacion }, transaction: t
                    })
                    let historiales = await RrhhEmpleadoDescuentoVacacionHistorial.findAll({
                        where: { id_vacacion: req.params.id_vacacion }, transaction: t,
                        include: [{ model: RrhhEmpleadoHistorialVacacion, as: 'historialVacacion' }],
                        order: [[{ model: RrhhEmpleadoHistorialVacacion, as: 'historialVacacion' }, 'anio', 'desc']]
                    })
                    for (const historial of historiales) {
                        datosVacacion.dias = restante == 0 ? datosVacacion.dias : restante
                        if (historial.historialVacacion.tomadas > datosVacacion.dias) {
                            tomadas = historial.historialVacacion.tomadas - datosVacacion.dias
                            restante = 0
                        } else {
                            restante = datosVacacion.dias - historial.historialVacacion.tomadas
                            tomadas = historial.historialVacacion.tomadas - (datosVacacion.dias - restante)
                        }
                        await RrhhEmpleadoVacaciones.update({
                            dias_restante: historial.historialVacacion.aplicadas + tomadas,
                        }, {
                            where: { id: req.params.id_vacacion }, transaction: t
                        })
                        await RrhhEmpleadoHistorialVacacion.update({
                            tomadas: tomadas
                        }, {
                            where: { id: historial.historialVacacion.id }, transaction: t
                        })
                    }
                    return new Promise(function (fulfill, reject) {
                        fulfill({ mensaje: 'Eliminado satisfactoriamente!' });
                    });
                } catch (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                }
            }).then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json({ mensaje: err.stack ? err.stack : err })
            })
        })
    router.route('/recursos-humanos/vacacion/empleado/:id_empleado/inicio/:inicio/fin/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionVacaciones = { id_ficha: req.params.id_empleado };
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionVacaciones = { id_ficha: req.params.id_empleado, fecha_inicio: { $between: [inicio, fin] } };
            }
            RrhhEmpleadoVacaciones.findAll({
                where: condicionVacaciones,
                include: [{ model: RrhhEmpleadoDescuentoVacacionHistorial, as: 'detalleDescuentosVacacionHistorial', include: [{ model: RrhhEmpleadoHistorialVacacion, as: 'historialVacacion' }] }, { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] }],
                order: [['fecha_inicio', 'ASC']]
            }).then(function (vacaciones) {
                res.json(vacaciones)
            })
        })
    router.route('/recursos-humanos/vacacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/estado/:estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionEmpleado = { id_empresa: req.params.id_empresa }
            var condicionFicha = {}
            if (req.params.estado != 2) {
                if (req.params.estado == 0) {
                    condicionEmpleado = { eliminado: true, id_empresa: req.params.id_empresa }
                    condicionFicha = { fecha_expiracion: { $ne: null } }
                } else {
                    condicionEmpleado = { eliminado: false, id_empresa: req.params.id_empresa }
                    condicionFicha = { fecha_expiracion: { $eq: null } }
                }

            }
            var condicionVacaciones = { eliminado: false };
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionVacaciones = { eliminado: false, fecha_inicio: { $between: [inicio, fin] } };
            }
            RrhhEmpleadoVacaciones.findAll({
                where: condicionVacaciones,
                include: [{ model: RrhhEmpleadoDescuentoVacacionHistorial, as: 'detalleDescuentosVacacionHistorial', include: [{ model: RrhhEmpleadoHistorialVacacion, as: 'historialVacacion' }] }, {
                    model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha, include: [{
                        model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }]
                    }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' }, { model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                }]
            }).then(function (vacaciones) {
                res.json(vacaciones)
            })
        })
    router.route('/recursos-humanos/vacacion/empresa/:id_empresa/estado/:estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            /* var condicionEmpleado = { id_empresa: req.params.id_empresa },
                condicionFicha = { activo: false };
            RrhhEmpleadoHistorialVacacion.findAll({
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha,
                    include: [{
                        model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado,
                        include: [{
                            model: Persona, as: 'persona'
                        }]
                    }]
                }]
            }).then(function (vacaciones) {
                res.json(vacaciones)
            }) */
            var condicionEmpleado = { id_empresa: req.params.id_empresa, es_empleado: true }
            var condicionFicha = {}
            if (req.params.estado != 2) {
                if (req.params.estado == 0) {
                    condicionEmpleado = { eliminado: true, id_empresa: req.params.id_empresa, es_empleado: true }
                    condicionFicha = { fecha_expiracion: { $ne: null } }
                } else {
                    condicionEmpleado = { eliminado: false, id_empresa: req.params.id_empresa, regularizado: true, es_empleado: true }
                    condicionFicha = { fecha_expiracion: { $eq: null }, activo: true }
                }

            }
            var condicionVacaciones = { eliminado: false };
            if (req.params.inicio != 0) {
                condicionVacaciones = { eliminado: false };
            }

            RrhhEmpleadoFicha.findAll({
                where: condicionFicha,
                include: [{
                    model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }]
                }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' }, { model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]

            }).then(function (vacaciones) {
                res.json(vacaciones)
            })
        })
    router.route('/recursos-humanos/vacacion/feriados/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.feriados.length > 0) {
                req.body.feriados.forEach(function (feriado, index, array) {
                    if (feriado.id == undefined) {
                        feriado.start = new Date(feriado.start)
                        feriado.end = new Date(feriado.end)
                        /*    var a = new Date().setTime(feriado.start .getTime() + 1000 * 60 * 60 * 24)
                           feriado.start = new Date(a)     */
                        feriado.start.setHours(20, 0, 0, 0, 0);
                        feriado.end.setHours(20, 0, 0, 0, 0);
                        RrhhFeriado.create({
                            fecha_inicio: feriado.start,
                            fecha_fin: feriado.end,
                            id_empresa: req.params.id_empresa
                        }).then(function (feriadoCreado) {
                            if (index === (array.length - 1)) {
                                if (req.body.feriadosEliminados.length > 0) {
                                    guardarEliminados(req, res)
                                } else {
                                    res.json({ mensaje: "Guardado satisfactoriamente!" })
                                }
                            }

                        })
                    } else {
                        if (index === (array.length - 1)) {
                            if (req.body.feriadosEliminados.length > 0) {
                                guardarEliminados(req, res)
                            } else {
                                res.json({ mensaje: "Guardado satisfactoriamente!" })
                            }
                        }

                    }
                });
            } else {
                guardarEliminados(req, res)
            }
        })
        .get(function (req, res) {
            RrhhFeriado.findAll({
                where: { id_empresa: req.params.id_empresa }
            }).then(function (dato) {
                res.json(dato)
            })
        })

    guardarEliminados = function (req, res) {
        req.body.feriadosEliminados.forEach(function (feriado, index, array) {
            RrhhFeriado.destroy({
                where: { id: feriado.id }
            }).then(function (feriadoCreado) {
                if (index === (array.length - 1)) {
                    res.json({ mensaje: "Guardado satisfactoriamente!" })
                }
            })
        })
    }
    //fin rutas vacaciones
    // TIPOS AUSENCIA
    router.route('/recursos-humanos/ausencia/clases/tipo/:tipo')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (clase, index, array) {
                if (clase.id) {
                    RrhhClaseAsuencia.update({
                        nombre: clase.nombre,
                        id_tipo: req.params.tipo,
                        porcentaje: clase.porcentaje,
                        dias_descuento: clase.dias_descuento,
                        habilitado: clase.habilitado,
                    }, {
                        where: { id: clase.id }
                    }).then(function (claseCreada) {
                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                    })
                } else {
                    RrhhClaseAsuencia.create({
                        nombre: clase.nombre,
                        id_tipo: req.params.tipo,
                        porcentaje: clase.porcentaje,
                        dias_descuento: clase.dias_descuento,
                        habilitado: true
                    }).then(function (claseCreada) {
                        res.json({ mensaje: "Guardado satisfactoriamente!" })
                    })
                }
            });
        })
    router.route('/recursos-humanos/configuracion/vacacion')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoConfiguracionVacacion.findAll({

            }).then(function (params) {
                res.json(params)
            })
        })
    router.route('/recursos-humanos/historial/gestion/vacacion/empleado/:id')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoHistorialVacacion.findAll({
                where: { id_ficha: req.params.id, eliminado: false }
            }).then(function (params) {
                res.json(params)
            })
        })
        .post(ensureAuthorizedlogged, async function (req, res) {
            for (const h of req.body) {
                await RrhhEmpleadoHistorialVacacion.create({
                    aplicadas: h.aplicadas,
                    tomadas: h.tomadas,
                    anio: h.anio,
                    gestion: h.gestion,
                    id_ficha: req.params.id,
                    eliminado: false
                }, {
                    where: { id_empleado: req.params.id }
                })
            }

            res.json({ mensaje: 'historial vacaciones Actualizado satisfactoriamente!' })
        })
    router.route('/recursos-humanos/tr3/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
            let transaction;
            let total = 0
            try {
                transaction = await sequelize.transaction();
                let tr3Creado = await RrhhEmpleadoTr3.create({
                    id_empresa: req.params.id_empresa,
                    id_cuenta: req.body.id_cuenta,
                    fecha: req.body.fecha,
                    fecha_elaboracion: req.body.fecha_elaboracion2,
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
                    aumentar_ceros: req.body.aumentar_ceros
                }, { transaction })

                if (req.body.anticipos.length > 0) {
                    for (const anticipo of req.body.anticipos) {
                        if (!anticipo.entregado) {
                            total += anticipo.monto
                            await RrhhAnticipo.update({
                                entregado: true
                            }, {
                                where: { id: anticipo.id },
                                transaction
                            })
                            await RrhhEmpleadoAnticipoTr3.create({
                                id_anticipo: anticipo.id,
                                id_tr3: tr3Creado.id
                            }, { transaction })
                        }
                    }

                } else {
                    return new Promise((resol, reject) => reject({ mensaje: "No existen anticipos para esta cuenta.", anticipos: req.body.anticipos, tipo: req.body.tipo, tr3Encontrado: tr3Encontrado, total: total }))
                }
                tr3Encontrado = await RrhhEmpleadoTr3.find({
                    where: { id: tr3Creado.id },
                    include: [{
                        model: RrhhEmpleadoAnticipoTr3, required: true, as: 'historialtr3',
                        include: [{
                            model: RrhhAnticipo, required: true, as: 'anticipo',
                            include: [{
                                model: RrhhEmpleadoFicha, as: 'ficha', include: [{
                                    model: MedicoPaciente, as: 'empleado',
                                    include: [{ model: Persona, as: 'persona' }]
                                }]
                            }]
                        }]
                    }, { model: Clase, as: 'departamento' }, { model: Banco, as: 'cuenta' }],
                    order: sequelize.literal("apellido_paterno asc"),
                    transaction
                })
                await transaction.commit();
                res.json({
                    mensaje: "Tr3 creado satisfactoriamente!",
                    anticipos: req.body.anticipos,
                    tipo: req.body.tipo,
                    tr3Encontrado: tr3Encontrado,
                    total: total,
                    fecha_elaboracion: req.body.fecha_elaboracion2,
                })

            } catch (err) {
                // Rollback transaction only if the transaction object is defined
                if (transaction) await transaction.rollback();
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            }


        })
    router.route('/recursos-humanos/ultimo-tr3/empresa/:id_empresa/banco/:nombre')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoTr3.findAll({
                where: { id_empresa: req.params.id_empresa },
                limit: 1,
                include: [{
                    model: RrhhEmpleadoAnticipoTr3, required: true, as: 'historialtr3',
                    include: [{
                        model: RrhhAnticipo, required: true, as: 'anticipo',
                        include: [{
                            model: RrhhEmpleadoFicha, as: 'ficha', include: [
                                { model: RrhhEmpleadoHoraExtraOrdinaria, as: 'horasExtraOrdiniarias' },
                                { model: Clase, as: 'tipoPersonal' },
                                { model: Clase, as: 'banco' }, {
                                    model: MedicoPaciente, as: 'empleado',
                                    include: [{ model: Persona, as: 'persona' }]
                                }]
                        }]
                    }]
                },
                { model: Banco, as: 'cuenta', where: { nombre: req.params.nombre } },
                { model: Clase, as: 'departamento' }],
                order: [['id', 'desc']],
            }).then(function (params) {
                res.json({ ultimoRegistro: params[0] })
            }).catch(function (err) {
                console.log(err)
            });
        })
    router.route('/recursos-humanos/tr3/empresa/:id_empresa/banco/:nombre')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoTr3.findAll({
                where: { id_empresa: req.params.id_empresa },
                include: [{
                    model: RrhhEmpleadoAnticipoTr3, required: true, as: 'historialtr3',
                    include: [{
                        model: RrhhAnticipo, required: true, as: 'anticipo',
                        include: [{
                            model: RrhhEmpleadoFicha, as: 'ficha', include: [
                                { model: RrhhEmpleadoHoraExtraOrdinaria, as: 'horasExtraOrdiniarias' },
                                { model: Clase, as: 'tipoPersonal' },
                                { model: Clase, as: 'banco' }, {
                                    model: MedicoPaciente, as: 'empleado',
                                    include: [{ model: Persona, as: 'persona' }]
                                }]
                        }]
                    }]
                },
                { model: Banco, as: 'cuenta', where: { nombre: req.params.nombre } },
                { model: Clase, as: 'departamento' }]
            }).then(function (params) {
                res.json(params)
            }).catch(function (err) {
                console.log(err)
            });
        })
    router.route('/fix-ficha/:id_empresa')
        .post(function (req, res) {
            /*  RrhhEmpleadoFicha.findAll({
                 order: [['id_empleado', 'asc'],['id','desc']],
                 where:{id_empleado:{$ne:null}}
             }).then(function (fichas) {
     
                 res.json({ beneficio: fichas })
             }) */
            MedicoPaciente.findAll({
                where: { id_empresa: req.params.id_empresa }
            }).then(function (empleados) {
                empleados.forEach(function (x, i, a) {
                    RrhhEmpleadoFicha.findAll({
                        where: { id_empleado: x.id },
                        limit: 1,
                        order: [['id', 'desc']]
                    }).then(function (fichas) {
                        if (fichas[0].fecha_expiracion) {
                            RrhhEmpleadoFicha.update({
                                activo: false
                            }, { where: { id: fichas[0].id } })
                            if (i === (a.length - 1)) {
                                res.json({ mensaje: 'fichas actualizadas' })
                            }
                        } else {
                            RrhhEmpleadoFicha.update({
                                activo: true
                            }, { where: { id: fichas[0].id } })
                            if (i === (a.length - 1)) {
                                res.json({ mensaje: 'fichas actualizadas' })
                            }
                        }

                    })
                })
            })
        })
    router.route('/recursos-humanos/beneficio/ficha/:id')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoBeneficioSocial.find({
                where: { id_ficha: req.params.id, tipo_beneficio: true, eliminado: false },
                include: [{ model: Clase, as: 'motivo' }, { model: Banco, as: 'cuenta' }, { model: RrhhEmpleadoDeduccionIngreso, as: 'deduccionEingresos', include: [{ model: Clase, as: "tipo" }] }]
            }).then(function (beneficio) {
                res.json({ beneficio: beneficio })
            })
        })
    router.route('/recursos-humanos/beneficio/empresa/:id_empresa/tipo/:tipo/inicio/:inicio/fin/:fin/motivo/:motivo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionBeneficio = { tipo_beneficio: false }
            var condicionPersona = {}
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionBeneficio.fecha_elaboracion = { $between: [inicio, fin] };
            }
            if (req.params.tipo != 0) {
                condicionBeneficio.tipo_beneficio = true
            }
            if (req.params.motivo != 0) {
                condicionBeneficio.id_motivo = req.params.motivo
            }
            if (req.params.texto_busqueda != 0) {
                condicionPersona = { nombre_completo: { $like: '%' + req.params.texto_busqueda + '%' } }
            }
            RrhhEmpleadoBeneficioSocial.count({
                where: condicionBeneficio,
                include: [{ model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona', wher: condicionPersona }] }] }, { model: Clase, as: 'motivo' }, { model: Banco, as: 'cuenta' }],
                grupo: ['id']
            }).then(function (datos) {
                RrhhEmpleadoBeneficioSocial.findAll({
                    where: condicionBeneficio,
                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                    include: [{
                        model: RrhhEmpleadoFicha, as: 'ficha',
                        include: [{
                            model: MedicoPaciente, as: 'empleado',
                            where: { id_empresa: req.params.id_empresa },

                            include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                        }]
                    },
                    { model: Clase, as: 'motivo' }, { model: Banco, as: 'cuenta' }],
                    grupo: ['id']
                }).then(function (beneficios) {
                    res.json({ beneficios: beneficios, paginas: Math.ceil(datos / req.params.items_pagina) });

                })
            })
        })

    router.route('/recursos-humanos-finiquito/beneficio/:id_beneficio')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoBeneficioSocial.find({
                where: { id: req.params.id_beneficio },
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{
                        model: RrhhEmpleadoCargo, as: 'cargos',
                        include: [{ model: Clase, as: 'cargo' }]
                    },
                    // agil_rrhh_empleado_campamento_empleado
                    {
                        model: MedicoPaciente, as: 'empleado',
                        include: [{ model: Clase, as: 'campo' }, { model: Clase, as: 'extension', required: true },
                        {
                            model: Persona, as: 'persona'
                            , include: [{ model: Clase, as: 'estadoCivil' }]
                        }]
                    }]
                },
                { model: Clase, as: 'motivo' }, { model: Banco, as: 'cuenta' },
                {
                    model: RrhhEmpleadoDeduccionIngreso, as: 'deduccionEingresos',
                    include: [{ model: Clase, as: "tipo" }]
                }]
            }).then(function (beneficio) {
                RrhhEmpleadoBeneficioSocial.count({
                    where: { tipo_beneficio: false, id_ficha: beneficio.ficha.id }
                }).then(function (quiqueniosEncontrados) {
                    beneficio.dataValues.cantidad_quinquenios = quiqueniosEncontrados
                    res.json({ beneficio: beneficio });
                })
            })
        })
    router.route('/recursos-humanos/beneficios/ficha/:id')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoBeneficioSocial.findAll({
                where: { id_ficha: req.params.id, tipo_beneficio: false }
            }).then(function (beneficios) {
                res.json(beneficios)
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id) {
                var id = null, idcuenta = null;
                if (req.body.motivo) {
                    id = req.body.motivo.id
                }

                if (req.body.cuenta) {
                    idcuenta = req.body.cuenta.id
                }
                RrhhEmpleadoBeneficioSocial.update({
                    id_ficha: req.params.id,
                    id_motivo: id,
                    fecha_elaboracion: req.body.fecha_elaboracion,
                    fecha_asistensia: req.body.fecha_asistensia,
                    fecha_ingreso: req.body.fecha_ingreso,
                    fecha_retiro: req.body.fecha_retiro,
                    primer_mes: req.body.primer_mes,
                    segundo_mes: req.body.segundo_mes,
                    tercer_mes: req.body.tercer_mes,
                    numero_quinquenio: req.body.numero_quinquenio,
                    quinquenio_adelantado: req.body.quinquenio_adelantado,
                    tipo_beneficio: req.body.tipo_beneficio,
                    desahucio: req.body.desahucio,
                    total_deducciones: req.body.total_deducciones,
                    total_ingresos: req.body.total_ingresos,
                    eliminado: false,
                    id_cuenta_banco: idcuenta,
                    promedio: req.body.promedio,
                    mes_uno: req.body.mes_uno.id,
                    mes_dos: req.body.mes_dos.id,
                    mes_tres: req.body.mes_tres.id,
                    empleado_cargo_impresion: req.body.empleado_cargo_impresion,
                    cargo_imprecion: req.body.cargo_imprecion,
                    usar_primer_mes: req.body.usar_primer_mes ? req.body.usar_primer_mes : false,
                    usar_segundo_mes: req.body.usar_segundo_mes ? req.body.usar_segundo_mes : false,
                }, {
                    where: { id: req.body.id }
                }).then(function (beneficioActualizado) {
                    RrhhEmpleadoBeneficioSocial.find({
                        where: { id: req.body.id }
                    }).then(function (beneficioCreado) {

                        if (req.body.ingresos.length > 0) {
                            req.body.ingresos.forEach(function (ingreso, index, array) {
                                if (ingreso.eliminado == true) {
                                    RrhhEmpleadoDeduccionIngreso.destroy({
                                        where: { id: ingreso.id }
                                    }).then(function (decuccionEliminada) {
                                        if (index === (array.length - 1)) {
                                            guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                                        }
                                    })
                                } else if (ingreso.id) {
                                    RrhhEmpleadoDeduccionIngreso.update({
                                        monto: ingreso.monto,
                                        motivo: ingreso.motivo,
                                        id_tipo: ingreso.tipo.id,
                                    }, {
                                        where: { id: ingreso.id }
                                    }).then(function (decuccionActualizada) {
                                        if (index === (array.length - 1)) {
                                            guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                                        }
                                    })
                                } else {
                                    RrhhEmpleadoDeduccionIngreso.create({
                                        id_beneficio: beneficioCreado.id,
                                        monto: ingreso.monto,
                                        motivo: ingreso.motivo,
                                        id_tipo: ingreso.tipo.id,
                                        eliminado: false
                                    }).then(function (decuccionCreada) {
                                        if (index === (array.length - 1)) {
                                            guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                                        }
                                    })
                                }
                            });
                        } else {
                            guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                        }
                    })
                })

            } else {
                var id = null, idcuenta = null;
                if (req.body.motivo) {
                    id = req.body.motivo.id
                }
                if (req.body.cuenta) {
                    idcuenta = req.body.cuenta.id
                }
                if (!req.body.tipo_beneficio) {
                    RrhhEmpleadoBeneficioSocial.create({
                        id_ficha: req.params.id,
                        fecha_elaboracion: req.body.fecha_elaboracion,
                        fecha_asistensia: req.body.fecha_asistensia,
                        fecha_ingreso: req.body.fecha_ingreso,
                        primer_mes: req.body.primer_mes,
                        segundo_mes: req.body.segundo_mes,
                        tercer_mes: req.body.tercer_mes,
                        total_quinquenio: req.body.total_quinquenio,
                        tipo_beneficio: req.body.tipo_beneficio,
                        eliminado: false,
                        numero_quinquenio: req.body.numero_quinquenio,
                        id_cuenta_banco: idcuenta,
                        promedio: req.body.promedio,
                        mes_uno: req.body.mes_uno.id,
                        mes_dos: req.body.mes_dos.id,
                        mes_tres: req.body.mes_tres.id,
                        empleado_cargo_impresion: req.body.empleado_cargo_impresion,
                        cargo_imprecion: req.body.cargo_imprecion,
                        usar_primer_mes: req.body.usar_primer_mes ? req.body.usar_primer_mes : true,
                        usar_segundo_mes: req.body.usar_segundo_mes ? req.body.usar_segundo_mes : true,
                    }).then(function (beneficioCreado) {
                        res.json({ mensaje: 'Beneficio social creado satisfactoriamente!', id_beneficio: beneficioCreado.id })

                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack });
                    });
                } else {

                    RrhhEmpleadoBeneficioSocial.create({
                        id_ficha: req.params.id,
                        id_motivo: id,
                        fecha_elaboracion: req.body.fecha_elaboracion,
                        fecha_asistensia: req.body.fecha_asistensia,
                        fecha_ingreso: req.body.fecha_ingreso,
                        fecha_retiro: req.body.fecha_retiro,
                        primer_mes: req.body.primer_mes,
                        segundo_mes: req.body.segundo_mes,
                        tercer_mes: req.body.tercer_mes,
                        numero_quinquenio: req.body.numero_quinquenio,
                        quinquenio_adelantado: req.body.quinquenio_adelantado,
                        tipo_beneficio: req.body.tipo_beneficio,
                        desahucio: req.body.desahucio,
                        total_deducciones: req.body.total_deducciones,
                        total_ingresos: req.body.total_ingresos,
                        eliminado: false,
                        id_cuenta_banco: idcuenta,
                        promedio: req.body.promedio,
                        mes_uno: req.body.mes_uno.id,
                        mes_dos: req.body.mes_dos.id,
                        mes_tres: req.body.mes_tres.id,
                        empleado_cargo_impresion: req.body.empleado_cargo_impresion,
                        cargo_imprecion: req.body.cargo_imprecion,
                        usar_primer_mes: req.body.usar_primer_mes ? req.body.usar_primer_mes : true,
                        usar_segundo_mes: req.body.usar_segundo_mes ? req.body.usar_segundo_mes : true,
                    }).then(function (beneficioCreado) {
                        req.body.id = beneficioCreado.id
                        if (req.body.ingresos.length > 0) {
                            req.body.ingresos.forEach(function (ingreso, index, array) {
                                RrhhEmpleadoDeduccionIngreso.create({
                                    id_beneficio: beneficioCreado.id,
                                    monto: ingreso.monto,
                                    motivo: ingreso.motivo,
                                    id_tipo: ingreso.tipo.id,
                                    eliminado: false
                                }).then(function (decuccionCreada) {
                                    if (index === (array.length - 1)) {
                                        guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                                    }
                                }).catch(function (err) {
                                    res.json({ hasError: true, mensaje: err.stack });
                                });

                            });
                        } else {
                            guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado)
                        }

                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack });
                    });
                }
            }
        })
    function fechaATexto(fecha) {
        fech = new Date(fecha)
        var valor = (fech.getMonth() + 1)
        if (valor < 10) {
            valor = "0" + valor
        }
        var valor2 = fech.getDate()
        if (valor2 < 10) {
            valor2 = "0" + valor2
        }
        fecha = valor2 + "/" + valor + "/" + fech.getFullYear();
        return fecha
        // $scope.fechaAplicacionVacuna = new Date(convertirFecha(fecha))
    }

    function guardarDeducciones(req, res, RrhhEmpleadoDeduccionIngreso, beneficioCreado) {
        if (req.body.deducciones.length > 0) {
            req.body.deducciones.forEach(function (deduccion, index, array) {
                if (deduccion.eliminado == true) {
                    RrhhEmpleadoDeduccionIngreso.destroy({
                        where: { id: deduccion.id }
                    }).then(function (decuccionEliminada) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: 'Beneficio social actualizado satisfactoriamente!', id_beneficio: beneficioCreado.id })
                        }
                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack });
                    });
                } else if (deduccion.id) {
                    RrhhEmpleadoDeduccionIngreso.update({
                        monto: deduccion.monto,
                        motivo: deduccion.motivo,
                        id_tipo: deduccion.tipo.id,
                    }, {
                        where: { id: deduccion.id }
                    }).then(function (decuccionActualizada) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: 'Beneficio social actualizado satisfactoriamente!', id_beneficio: beneficioCreado.id })
                        }
                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack });
                    });
                } else {
                    RrhhEmpleadoDeduccionIngreso.create({
                        id_beneficio: beneficioCreado.id,
                        monto: deduccion.monto,
                        motivo: deduccion.motivo,
                        id_tipo: deduccion.tipo.id,
                        eliminado: false
                    }).then(function (decuccionCreada) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: 'Beneficio social actualizado satisfactoriamente!', id_beneficio: beneficioCreado.id })
                        }
                    }).catch(function (err) {
                        res.json({ hasError: true, mensaje: err.stack });
                    });
                }

            });
        } else {
            res.json({ mensaje: 'Beneficio social creado satisfactoriamente!', id_beneficio: beneficioCreado.id })
        }
    }
    router.route('/recursos-humanos/bitacora-ficha/usuario/:id')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (cambio, index, array) {
                if (cambio.valor_anterior === true) {
                    cambio.valor_anterior = "true"
                } else if (cambio.valor_anterior === false) {
                    cambio.valor_anterior = "false"
                }
                if (cambio.valor_actual === true) {
                    cambio.valor_actual = "true"
                } else if (cambio.valor_actual === false) {
                    cambio.valor_actual = "false"
                }

                RrhhEmpleadoBitacoraFicha.create({
                    id_ficha: cambio.id_ficha,
                    campo: cambio.campo,
                    valor_anterior: cambio.valor_anterior,
                    valor_actual: cambio.valor_actual,
                    fecha: cambio.fecha,
                    id_usuario: req.params.id
                }).then(function (bitacoraCreada) {
                    if (index === (array.length - 1)) {
                        res.json({ message: "Ficha empleado actualizada satisfactoriamente!" })
                    }
                })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFicha.findAll({
                where: { id_empleado: req.params.id },
                attributes: ['id', 'fecha']
            }).then((fichas) => {
                var ids = fichas.map(ficha => ficha.id)
                RrhhEmpleadoBitacoraFicha.findAll({
                    where: {
                        id_ficha: { $in: ids }
                    },
                    include: [{ model: Usuario, as: 'usuario', attributes: ['id', "nombre_usuario"], include: [{ model: Persona, as: 'persona', attributes: ['nombre_completo'] }] }]

                }).then(function (bitacoras) {

                    res.json([fichas, bitacoras])
                })
            })
        });

    router.route('/reporte/configuracion/ropa-trabajo/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoConfiguracionRopa.findAll({
                include: [{ model: Clase, as: 'cargo' }, { model: Clase, as: 'ropaTrabajo', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }] }]
            }).then(function (entidad) {
                res.json(entidad);
            });
        });
    router.route('/recursos-humanos/configuracion-ropa-trabajo/cargo/:id_empresa?')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (ropa, index, array) {
                if (ropa.id) {
                    if (ropa.eliminado) {
                        RrhhEmpleadoConfiguracionRopa.destroy({
                            where: { id: ropa.id }
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    } else {
                        RrhhEmpleadoConfiguracionRopa.update({
                            id_ropa_trabajo: ropa.ropaTrabajo.id,
                            cantidad: ropa.cantidad,
                            meses_uso: ropa.meses_uso
                        },
                            {
                                where: { id: ropa.id }
                            }).then(function (configuracion) {
                                if (index === (array.length - 1)) {
                                    res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                                }
                            })
                    }
                } else {
                    if (ropa.eliminado) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                        }
                    } else {
                        RrhhEmpleadoConfiguracionRopa.create({
                            id_ropa_trabajo: ropa.ropaTrabajo.id,
                            id_cargo: ropa.id_cargo,
                            cantidad: ropa.cantidad,
                            meses_uso: ropa.meses_uso
                        }).then(function (configuracion) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Configuración guardada satisfactoriamente!" })
                            }
                        })
                    }
                }

            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoConfiguracionRopa.findAll({
                include: [{ model: Clase, as: 'ropaTrabajo', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }] }]
            }).then(function (ropasTrabajo) {
                res.json(ropasTrabajo)
            })
        });
    router.route('/recursos-humanos/importacion/configuracion-ropa/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                if (req.body.ropas.length > 0) {
                    let promises = []
                    return Tipo.find({
                        where: { nombre_corto: "SUBGRUPOS PRODUCTOS", id_empresa: req.params.id_empresa }, transaction: t
                    }).then(function (tipoEncontrado) {
                        for (const ropa of req.body.ropas) {
                            promises.push(Clase.findOrCreate({
                                where: {
                                    nombre: ropa,
                                    id_tipo: tipoEncontrado.id,
                                },
                                defaults: {
                                    id_tipo: tipoEncontrado.id,
                                    nombre: ropa,
                                    nombre_corto: 'ROPA DE TRABAJO-G',
                                    habilitado: true,
                                    eliminado: false
                                }, transaction: t
                            }).spread(function (ropaCreada, created) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill(created)
                                });
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            }))

                        }
                        return Promise.all(promises)
                    })
                }
                if (req.body.configuraciones.length > 0) {
                    for (const config of req.body.configuraciones) {
                        return Clase.find({
                            include: [{
                                model: Tipo, as: 'tipo',
                                where: { id_empresa: req.params.id_empresa }
                            }],
                            where: {
                                nombre: config.ropa,
                            },
                            transaction: t
                        }).then(function (ropaEncontrada) {
                            return RrhhEmpleadoConfiguracionRopa.findOrCreate(
                                {
                                    where: {
                                        id_ropa_trabajo: ropaEncontrada.id,
                                        id_cargo: config.cargo.id,
                                    },
                                    defaults: {
                                        id_ropa_trabajo: ropaEncontrada.id,
                                        id_cargo: config.cargo.id,
                                        cantidad: config.cantidad,
                                        meses_uso: config.meses_uso
                                    }
                                }).spread(function (configuracionEncontrada, created) {
                                    if (!created) {
                                        return RrhhEmpleadoConfiguracionRopa.update({
                                            cantidad: config.cantidad,
                                            meses_uso: config.meses_uso
                                        },
                                            {
                                                where: { id: configuracionEncontrada.id }
                                            }).then(function (configuracion) {
                                                return new Promise(function (fulfill, reject) {
                                                    fulfill()
                                                });
                                            })
                                    } else {
                                        return new Promise(function (fulfill, reject) {
                                            fulfill(created)
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
                    }
                }
            }).then(function (result) {
                res.json({ mensaje: "Creado Satisfactoriamente!" })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });
        })

    router.route('/recursos-humanos/cargos/empleado/:id_ficha/:id_almacen')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_ficha, id_almacen } = req.params
            RrhhEmpleadoCargo.findAll({
                where: { id_ficha },
                include: [{
                    model: Clase,
                    as: 'cargo',
                    include: [{
                        model: RrhhEmpleadoConfiguracionRopa,
                        as: 'ConfiguracionesCargo',
                        include: [{
                            model: Clase,
                            as: 'cargo'
                        }, {
                            model: Clase,
                            as: 'ropaTrabajo',
                            include: [{
                                model: Producto,
                                attributes: ['id', 'nombre'],
                                as: 'productosSubGrupo',
                                include: [{
                                    model: Inventario,
                                    as: 'inventarios',
                                    attributes: ['cantidad'],
                                    required: false,
                                    where: {
                                        id_almacen,
                                        cantidad: {
                                            $gt: 0
                                        }
                                    }
                                }]
                            }]
                        }]
                    }]
                }]
            }).then(function (cargosEmpleado) {
                res.json({ error: false, cargosEmpleado })
            })
            .catch(e=> {
                res.json({ error: true, message: e})
            })
        })

    router.route('/recursos-humanos/ropa-trabajo/almacen/:id_almacen/productos/subgrupos/:subgrupos')
        .get(ensureAuthorizedlogged, function (req, res) {
            var arrelo = []
            var dato = req.params.subgrupos.split(",")
            dato.map(function (grupo) {
                arrelo.push(grupo)
            })
            Producto.findAll({
                where: {
                    id_subgrupo: { $in: arrelo }
                },
                include: [{ model: Inventario, as: 'inventarios', where: { id_almacen: req.params.id_almacen } }]
            }).then(function (cargosEmpleado) {
                res.json(cargosEmpleado)
            }).catch(function (err) {
                console.log(err)
            })
        })
    router.route('/recursos-humanos/ropa-trabajo/actualizar/empleado/:id_empleado')
        .put(ensureAuthorizedlogged, function (req, res) {
            try {
                sequelize.transaction(function (t) {
                    var promises = [];
                    return RrhhEmpleadoDotacionRopa.update({
                        fecha: req.body.fecha,
                        // fecha_vencimiento: req.body.fecha_vencimiento,
                        id_cumplimiento: req.body.cumplimiento.id,
                        id_periodo: req.body.periodo.id,
                        //id_ficha: req.body.id_ficha,
                        //id_estado: req.body.estado.id,
                        observacion: req.body.observacion,
                        //id_usuario: req.body.id_usuario,
                    }, {
                        transaction: t,
                        where: {
                            id: req.body.id
                        }
                    }).then(function (dotacionActualizada) {
                        return actualizarItemRopa(req, res, t)
                    })
                }).then(function (result) {
                    res.json({ error: false, message: "Editado Satisfactoriamente!", numero: req.body.numero, messageType: "success" })
                }).catch(function (err) {
                    var error = (err.stack) ? err.stack : err
                    res.json({ error: true, message: error, messageType: "error" });
                });
            } catch (e) {
                res.json({ error: true, message: "<b>Error al actualizar la dotación</b><br>" + e, messageType: "error" })
            }
        })

    async function actualizarItemRopa(req, res, t) {
        try {
            var promises = []
            const { id: id_dotacion, dotacionItems, id_almacen, fecha } = req.body
            let entregados = dotacionItems.filter(e => e.id_movimiento || e.entregado)
            for (let i = 0; i < entregados.length; i++) {
                const { id, id_dotacion_ropa, id_producto, producto: prod, ropaTrabajo, id_ropa_trabajo, id_movimiento, entregado, cantidad, cantidad_disponible, cargo, id_cargo } = entregados[i];
                let producto = await Producto.findById(id_producto, { transaction: t });
                if (producto && producto.activar_inventario) {
                    if (id_movimiento) {
                        if (entregado) {
                            await Movimiento.update({ fecha: new Date() }, { where: { id: id_movimiento }, transaction: t })
                            promises.push(
                                RrhhEmpleadoDotacionRopaItem.findById(id, { transaction: t })
                                    .then(async det_dotacion => {
                                        if ((det_dotacion.id_producto != prod.id) || (det_dotacion.cantidad != cantidad)) {
                                            if (det_dotacion.id_producto && prod.id && (det_dotacion.id_producto != prod.id)) {
                                                let det_movs = await DetalleMovimiento.findAll({ where: { id_movimiento: det_dotacion.id_movimiento }, transaction: t });
                                                let promesas = []
                                                if (det_movs.length > 0) {
                                                    for (let k = 0; k < det_movs.length; k++) {
                                                        const det = det_movs[k];
                                                        //actualizar (+) el inventario del producto anterior
                                                        promesas.push(
                                                            Inventario.update({ cantidad: sequelize.literal('cantidad +' + det.cantidad) }, { where: { id: det.id_inventario }, transaction: t })
                                                                .then(inv_act => {
                                                                    //eliminar los movimientos del producto anterior
                                                                    return DetalleMovimiento.destroy({ where: { id: det.id }, transaction: t })
                                                                        .then(async det_del => {
                                                                            //crear nuevos detalles movimiento para el nuevo producto con su respectivo inventario
                                                                            if (k === det_movs.length - 1) {
                                                                                let inventarios = await Inventario.findAll({ where: { id_producto: prod.id, id_almacen, cantidad: { $gt: 0 } }, transaction: t })
                                                                                let cantidad_disp = inventarios.reduce((acc, { cantidad }) => acc += cantidad, 0)
                                                                                if (inventarios && (cantidad_disp >= cantidad)) {
                                                                                    let cantidad_consumir = cantidad
                                                                                    let proms = []
                                                                                    for (let j = 0; j < inventarios.length; j++) {
                                                                                        const inv = inventarios[j];
                                                                                        if (cantidad_consumir > 0) {
                                                                                            let cantidad_parcial = cantidad_consumir > inv.cantidad ? inv.cantidad : cantidad_consumir
                                                                                            cantidad_consumir = cantidad_consumir - cantidad_parcial
                                                                                            proms.push(
                                                                                                Inventario.update({ cantidad: sequelize.literal('cantidad -' + cantidad_parcial) },
                                                                                                    { where: { id: inv.id }, transaction: t })
                                                                                                    .then(inv_consumido => {
                                                                                                        return DetalleMovimiento.create({
                                                                                                            id_movimiento: id_movimiento,
                                                                                                            id_producto: prod.id,
                                                                                                            cantidad: cantidad_parcial,
                                                                                                            costo_unitario: inv.costo_unitario,
                                                                                                            importe: (cantidad_parcial * inv.costo_unitario),
                                                                                                            total: (cantidad_parcial * inv.costo_unitario),
                                                                                                            descuento: 0,
                                                                                                            recargo: 0,
                                                                                                            ice: 0,
                                                                                                            excento: 0,
                                                                                                            tipo_descuento: 0,
                                                                                                            tipo_recargo: 0,
                                                                                                            id_inventario: inv.id
                                                                                                        }, { transaction: t })
                                                                                                            .then(det_mov_creado => {
                                                                                                                if (cantidad_consumir === 0) {
                                                                                                                    //actualizar detalle dotacion
                                                                                                                    return RrhhEmpleadoDotacionRopaItem.update({
                                                                                                                        id_producto: prod.id,
                                                                                                                        cantidad
                                                                                                                    }, { where: { id }, transaction: t })
                                                                                                                } else {
                                                                                                                    return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                                                }
                                                                                                            })
                                                                                                    })
                                                                                            )
                                                                                        } else {
                                                                                            return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                        }
                                                                                    }
                                                                                    return Promise.all(proms);
                                                                                } else {
                                                                                    return new Promise(function (fulfill, reject) { fulfill("Producto sin inventarios disponible.") });
                                                                                }
                                                                            } else {
                                                                                return new Promise(function (fulfill, reject) { fulfill("Producto sin inventarios disponible.") });
                                                                            }
                                                                        })
                                                                })
                                                        )
                                                    }
                                                } else {
                                                    let inventarios = await Inventario.findAll({ where: { id_producto: prod.id, id_almacen, cantidad: { $gt: 0 } }, transaction: t })
                                                    let cantidad_disp = inventarios.reduce((acc, { cantidad }) => acc += cantidad, 0)
                                                    if (inventarios && (cantidad_disp >= cantidad)) {
                                                        let cantidad_consumir = cantidad
                                                        let proms = []
                                                        for (let j = 0; j < inventarios.length; j++) {
                                                            const inv = inventarios[j];
                                                            if (cantidad_consumir > 0) {
                                                                let cantidad_parcial = cantidad_consumir > inv.cantidad ? inv.cantidad : cantidad_consumir
                                                                cantidad_consumir = cantidad_consumir - cantidad_parcial
                                                                proms.push(
                                                                    Inventario.update({ cantidad: sequelize.literal('cantidad -' + cantidad_parcial) },
                                                                        { where: { id: inv.id }, transaction: t })
                                                                        .then(inv_consumido => {
                                                                            return DetalleMovimiento.create({
                                                                                id_movimiento: id_movimiento,
                                                                                id_producto: prod.id,
                                                                                cantidad: cantidad_parcial,
                                                                                costo_unitario: inv.costo_unitario,
                                                                                importe: (cantidad_parcial * inv.costo_unitario),
                                                                                total: (cantidad_parcial * inv.costo_unitario),
                                                                                descuento: 0,
                                                                                recargo: 0,
                                                                                ice: 0,
                                                                                excento: 0,
                                                                                tipo_descuento: 0,
                                                                                tipo_recargo: 0,
                                                                                id_inventario: inv.id
                                                                            }, { transaction: t })
                                                                                .then(det_mov_creado => {
                                                                                    if (cantidad_consumir === 0) {
                                                                                        //actualizar detalle dotacion
                                                                                        return RrhhEmpleadoDotacionRopaItem.update({
                                                                                            id_producto: prod.id,
                                                                                            cantidad
                                                                                        }, { where: { id }, transaction: t })
                                                                                    } else {
                                                                                        return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                    }
                                                                                })
                                                                        })
                                                                )
                                                            } else {
                                                                return new Promise(function (fulfill, reject) { fulfill({}) });
                                                            }
                                                        }
                                                        return Promise.all(proms);
                                                    }
                                                }

                                                return Promise.all(promesas);
                                            } else if (det_dotacion.cantidad && cantidad && (det_dotacion.cantidad != cantidad)) {
                                                // verificar si es incremento o decremento
                                                if (cantidad > det_dotacion.cantidad) {
                                                    let cantidad_consumo = cantidad - det_dotacion.cantidad
                                                    let inventarios = await Inventario.findAll({ where: { id_producto, id_almacen, cantidad: { $gt: 0 } }, transaction: t })
                                                    let cantidad_disp = inventarios.reduce((acc, { cantidad }) => acc += cantidad, 0)
                                                    if (cantidad_disp >= cantidad_consumo) {
                                                        let promesas = []
                                                        for (let j = 0; j < inventarios.length; j++) {
                                                            const inv = inventarios[j];
                                                            if (cantidad_consumo > 0) {
                                                                let consumo_parcial = cantidad_consumo > inv.cantidad ? inv.cantidad : cantidad_consumo
                                                                cantidad_consumo = cantidad_consumo - consumo_parcial;
                                                                promesas.push(
                                                                    Inventario.update({ cantidad: sequelize.literal('cantidad -' + consumo_parcial) },
                                                                        { where: { id: inv.id } })
                                                                        .then(inv_consumido => {
                                                                            return DetalleMovimiento.create({
                                                                                id_movimiento: id_movimiento,
                                                                                id_producto: id_producto,
                                                                                cantidad: consumo_parcial,
                                                                                costo_unitario: inv.costo_unitario,
                                                                                importe: (consumo_parcial * inv.costo_unitario),
                                                                                total: (consumo_parcial * inv.costo_unitario),
                                                                                descuento: 0,
                                                                                recargo: 0,
                                                                                ice: 0,
                                                                                excento: 0,
                                                                                tipo_descuento: 0,
                                                                                tipo_recargo: 0,
                                                                                id_inventario: inv.id
                                                                            })
                                                                                .then(det_mov_creado => {
                                                                                    if (cantidad_consumo === 0) {
                                                                                        return RrhhEmpleadoDotacionRopaItem.update({
                                                                                            cantidad: cantidad
                                                                                        }, { where: { id: det_dotacion.id }, transaction: t })
                                                                                            .then(inv_mod => {
                                                                                                return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                            })
                                                                                    }
                                                                                })
                                                                        })
                                                                )
                                                            }
                                                        }
                                                    } else {
                                                        return new Promise(function (fulfill, reject) { fulfill({}) });
                                                    }
                                                } else {
                                                    let det_movs = await DetalleMovimiento.findAll({ where: { id_movimiento: det_dotacion.id_movimiento }, transaction: t });
                                                    if (det_movs && det_movs.length > 0) det_movs.reverse()
                                                    let cantidad_reponer = det_dotacion.cantidad - cantidad
                                                    let promesas = []
                                                    for (let k = 0; k < det_movs.length; k++) {
                                                        const det = det_movs[k];
                                                        if (cantidad_reponer > 0) {
                                                            let cantidad_parcial = det.cantidad >= cantidad_reponer ? cantidad_reponer : det.cantidad
                                                            cantidad_reponer -= cantidad_parcial;
                                                            promesas.push(
                                                                Inventario.update({
                                                                    cantidad: sequelize.literal('cantidad +' + cantidad_parcial)
                                                                }, { where: { id: det.id_inventario }, transaction: t })
                                                                    .then(inv_act => {
                                                                        if (det.cantidad >= cantidad_reponer) {
                                                                            return DetalleMovimiento.update({
                                                                                cantidad: sequelize.literal('cantidad -' + cantidad_parcial)
                                                                            }, { where: { id: det.id }, transaction: t })
                                                                                .then(det_act => {
                                                                                    if (cantidad_reponer === 0) {
                                                                                        return RrhhEmpleadoDotacionRopaItem.update({ cantidad }, { where: { id }, transaction: t })
                                                                                    } else {
                                                                                        return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                    }
                                                                                })
                                                                        } else {
                                                                            return DetalleMovimiento.destroy({ where: { id: det.id }, transaction: t })
                                                                                .then(det_del => {
                                                                                    if (cantidad_reponer === 0) {
                                                                                        return RrhhEmpleadoDotacionRopaItem.update({ cantidad }, { where: { id }, transaction: t })
                                                                                    } else {
                                                                                        return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                    }
                                                                                })
                                                                        }
                                                                    })
                                                            )
                                                        } else {
                                                            return new Promise(function (fulfill, reject) { fulfill({}) });
                                                        }
                                                    }
                                                    return Promise.all(promesas);
                                                }
                                            }
                                        }
                                    })
                                    .catch(e => res.json({ error: true, message: "<b>Error al obtener detalle.</b><br>" + e, messageType: "error" }))
                            )
                        } else {
                            promises.push(
                                RrhhEmpleadoDotacionRopaItem.findById(id, { transaction: t })
                                    .then(det => {
                                        if (det) {
                                            return DetalleMovimiento.findAll({ where: { id_movimiento: det.id_movimiento }, transaction: t })
                                                .then(det_movs => {
                                                    if (det_movs && det_movs.length > 0) {
                                                        let promesas = []
                                                        for (let k = 0; k < det_movs.length; k++) {
                                                            const detalle = det_movs[k];
                                                            promesas.push(
                                                                Inventario.update(
                                                                    { cantidad: sequelize.literal('cantidad +' + detalle.cantidad) },
                                                                    { where: { id: detalle.id_inventario }, transaction: t },
                                                                )
                                                                    .then(inv_act => {
                                                                        return DetalleMovimiento.destroy({ where: { id_movimiento: detalle.id_movimiento }, transaction: t })
                                                                            .then(dm_eliminado => {
                                                                                if (k === det_movs.length - 1) {
                                                                                    return RrhhEmpleadoDotacionRopaItem.update({
                                                                                        id_movimiento: null,
                                                                                        entregado: false
                                                                                    }, {
                                                                                        where: { id: det.id }, transaction: t
                                                                                    })
                                                                                        .then(id_editado => {
                                                                                            return Movimiento.destroy({ where: { id: detalle.id_movimiento }, transaction: t })
                                                                                                .then(m_eliminado => {
                                                                                                    return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                                })
                                                                                        })
                                                                                } else {
                                                                                    return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                }
                                                                            })

                                                                    })
                                                            )
                                                        }
                                                        return Promise.all(promesas);
                                                    } else {
                                                        return RrhhEmpleadoDotacionRopaItem.update({
                                                            entregado: false,
                                                            id_movimiento: null
                                                        }, { where: { id }, transaction: t })
                                                            .then(det_item => {
                                                                return Movimiento.destroy({ where: { id: id_movimiento }, transaction: t })
                                                                    .then(mov_del => new Promise(function (fulfill, reject) { fulfill({}) }))
                                                            })
                                                    }
                                                })
                                                .catch(e => console.log(e))
                                        } else {
                                            return new Promise(function (fulfill, reject) { fulfill({}) });
                                        }
                                    })
                                    .catch(e => console.log(e))
                            )
                        }
                    } else {
                        // cuando agregan nuevo item en la dotacion
                        if (entregado) {
                            let inventarios = await Inventario.findAll({ where: { id_producto: prod.id, id_almacen, cantidad: { $gt: 0 } }, transaction: t })
                            let cantidad_disp = inventarios.reduce((acc, { cantidad }) => acc += cantidad, 0)
                            if (inventarios && (cantidad_disp >= cantidad)) {
                                promises.push(
                                    //obtener tipo movimiento
                                    Tipo.find({
                                        where: { nombre_corto: Diccionario.MOV_EGRE },
                                        transaction: t
                                    })
                                        .then(function (tipoMovimiento) {
                                            //obtener clase de movimiento
                                            return Clase.find({
                                                where: { nombre_corto: 'EPPS', id_tipo: tipoMovimiento.id },
                                                transaction: t
                                            })
                                                .then(function (claseMovimiento) {
                                                    // generar el movimiento
                                                    return Movimiento.create({
                                                        id_tipo: tipoMovimiento.id,
                                                        id_clase: claseMovimiento.id,
                                                        id_almacen,
                                                        fecha: new Date()
                                                    }, { transaction: t })
                                                        .then(mov_creado => {
                                                            // Editar la dotacion item
                                                            return RrhhEmpleadoDotacionRopaItem.update({
                                                                id_producto: prod.id,
                                                                entregado: true,
                                                                id_ropa_trabajo,
                                                                id_cargo,
                                                                cantidad,
                                                                id_movimiento: mov_creado.id
                                                            }, {
                                                                where: { id, },
                                                                transaction: t
                                                            })
                                                                .then(item_editado => {
                                                                    // Consumir inventarios
                                                                    let cantidad_consumir = cantidad
                                                                    let promesas = []
                                                                    for (let j = 0; j < inventarios.length; j++) {
                                                                        const inv = inventarios[j];
                                                                        if (cantidad_consumir > 0) {
                                                                            let cantidad_parcial = cantidad_consumir > inv.cantidad ? inv.cantidad : cantidad_consumir
                                                                            cantidad_consumir = cantidad_consumir - cantidad_parcial
                                                                            promesas.push(
                                                                                Inventario.update({ cantidad: inv.cantidad - cantidad_parcial }, {
                                                                                    where: { id: inv.id }, transaction: t
                                                                                })
                                                                                    .then(inv_consumido => {
                                                                                        return DetalleMovimiento.create({
                                                                                            id_movimiento: mov_creado.id,
                                                                                            id_producto: id_producto,
                                                                                            cantidad: cantidad_parcial,
                                                                                            costo_unitario: inv.costo_unitario,
                                                                                            importe: (cantidad_parcial * inv.costo_unitario),
                                                                                            total: (cantidad_parcial * inv.costo_unitario),
                                                                                            descuento: 0,
                                                                                            recargo: 0,
                                                                                            ice: 0,
                                                                                            excento: 0,
                                                                                            tipo_descuento: 0,
                                                                                            tipo_recargo: 0,
                                                                                            id_inventario: inv.id
                                                                                        }, { transaction: t })
                                                                                            .then(det_mov_creado => {
                                                                                                return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                                            })
                                                                                    })
                                                                            )
                                                                        } else {
                                                                            return new Promise(function (fulfill, reject) { fulfill({}) });
                                                                        }
                                                                    }
                                                                    return Promise.all(promesas);
                                                                })

                                                        })
                                                })
                                        })
                                )
                            } else {
                                return new Promise(function (fulfill, reject) { fulfill("Producto sin inventarios disponible.") });
                            }
                        }
                    }
                } else {
                    return new Promise(function (fulfill, reject) {
                        fulfill("Producto no habilitado para control de inventarios.");
                    });
                }
            }
            return Promise.all(promises);
        } catch (e) {
            console.log(e);
        }
    }




    /* req.body.dotacionItems.forEach(function (item, index, array) {
        item.id = (item.id) ? item.id : 0
        promises.push(
            RrhhEmpleadoDotacionRopaItem.find({
            transaction: t,
            where: { id_ropa_trabajo: item.id_ropa_trabajo, id_producto: item.producto.id, entregado: true }
        }).then(function (dato) {
            if (dato) {
                if (!dato.entregado) {
                    return Producto.find({
                        include: [{
                            model: Inventario, as: 'inventarios', required: false, where: {
                                id_almacen: req.body.almacen.id
                            }
                        }],
                        where: {
                            id: item.producto.id
                        },
                        transaction: t
                    }).then(function (producto) {
                        return Tipo.find({
                            where: { nombre_corto: Diccionario.MOV_EGRE },
                            transaction: t
                        }).then(function (tipoMovimiento) {
                            return Clase.find({
                                where: { nombre_corto: 'EPPS', id_tipo: tipoMovimiento.id },
                                transaction: t
                            }).then(function (tipoEgreso) {
                                req.body.id_almacen = req.body.almacen.id
                                calcularCostosEgresosRopa(tipoMovimiento, tipoEgreso, producto, item.cantidad, producto.inventarios, index, array, res, t, req, item)
                            })
                        })
                    })
                } else {
                    // hacer que descuente cuando esta en entregado= si y no tiene movimiento
                    // hacer que reponga la cantidad si entregado esta=no y si tiene movi
                    if (item.entregado && item.id_movimiento == null) {
                        return Producto.find({
                            include: [{
                                model: Inventario, as: 'inventarios', required: false, where: {
                                    id_almacen: req.body.almacen.id
                                }
                            }],
                            where: {
                                id: item.producto.id
                            },
                            transaction: t
                        }).then(function (producto) {
                            return Tipo.find({
                                where: { nombre_corto: Diccionario.MOV_EGRE },
                                transaction: t
                            }).then(function (tipoMovimiento) {
                                return Clase.find({
                                    where: { nombre_corto: 'EPPS', id_tipo: tipoMovimiento.id },
                                    transaction: t
                                }).then(function (tipoEgreso) {
                                    req.body.id_almacen = req.body.almacen.id
                                    calcularCostosEgresosRopa(tipoMovimiento, tipoEgreso, producto, item.cantidad, producto.inventarios, index, array, res, t, req, item)
                                })
                            })
                        })
                    } else if (!item.entregado && item.id_movimiento) {
                        devolucionEgresosRopa(item, t);
                    } else {

                        return RrhhEmpleadoDotacionRopaItem.update({
                            id_producto: item.producto.id,
                            entregado: item.entregado,
                            id_ropa_trabajo: item.ropaTrabajo.id,
                            id_cargo: item.cargo.id,
                            cantidad: item.cantidad
                        }, {
                            where: { id: item.id },
                            transaction: t
                        }).then(function (detalleCreado) {
                            return DetalleMovimiento.find({
                                where: { id_movimiento: item.id_movimiento },
                                transaction: t
                            }).then(function (detMoviento) {
                                if (detMoviento && detMoviento.id_producto != item.producto.id) {
                                    // devolver inventario del producto anterior
                                    // del detalle movimiento cambiar item, id inventario, cambiar costo y recalcular totales
                                    // descontar el inventario con el producto actual
                                    return Inventario.update({
                                        cantidad: sequelize.literal('cantidad + ' + detMoviento.cantidad),
                                        costo_total: sequelize.literal('cantidad * costo_unitario')
                                    }, {
                                        where: { id: detMoviento.id_inventario }
                                    }).then(function (actualizado) {
                                        DetalleMovimiento.destroy({
                                            where: { id_movimiento: item.id_movimiento }
                                        }).then(function (detalleMovimientoEliminado) {
                                            var cantidadTotal = item.cantidad;
                                            for (var i = 0; i < item.producto.inventarios.length; i++) {
                                                if (cantidadTotal > 0) {
                                                    var cantidadParcial;
                                                    if (cantidadTotal > item.producto.inventarios[i].cantidad) {
                                                        cantidadParcial = item.producto.inventarios[i].cantidad;
                                                        cantidadTotal = cantidadTotal - item.producto.inventarios[i].cantidad
                                                    } else {
                                                        cantidadParcial = cantidadTotal;
                                                        cantidadTotal = 0;
                                                    }

                                                    if (cantidadParcial > 0) {
                                                        var rrr = crearMovimientoEgresoYActualizarInventario({ id: item.id_movimiento }, item.producto, null, null, cantidadParcial, item.producto.inventarios[i], null, null, i, res, t);
                                                        promises.push(new Promise(function (fulfill, reject) {
                                                            fulfill({});
                                                        }));
                                                    }
                                                } else {
                                                    //if (index == (array.length - 1) && i == (inventarios.length - 1)) {
                                                    //res.json(venta);
                                                    
                                                    //}
                                                }
                                            }
                                        })

                                    })

                                }

                            })
                        })



                    }
                }
            } else {
                return Producto.find({
                    include: [{
                        model: Inventario, as: 'inventarios', required: false, where: {
                            id_almacen: req.body.almacen.id
                        }
                    }],
                    where: {
                        id: item.producto.id
                    },
                    transaction: t
                }).then(function (producto) {
                    return Tipo.find({
                        where: { nombre_corto: Diccionario.MOV_EGRE },
                        transaction: t
                    }).then(function (tipoMovimiento) {
                        return Clase.find({
                            where: { nombre_corto: 'EPPS', id_tipo: tipoMovimiento.id },
                            transaction: t
                        }).then(function (tipoEgreso) {
                            req.body.id_almacen = req.body.almacen.id
                            calcularCostosEgresosRopa(tipoMovimiento, tipoEgreso, producto, item.cantidad, producto.inventarios, index, array, res, t, req, item)
                        })
                    })
                })
            }
        }))
    })
    return Promise.all(promises); */







    function devolucionEgresosRopa(item, t) {
        // buscar detalle movimiento
        return RrhhEmpleadoDotacionRopaItem.update({
            id_producto: item.producto.id,
            entregado: item.entregado,
            id_ropa_trabajo: item.ropaTrabajo.id,
            id_cargo: item.cargo.id,
            cantidad: item.cantidad,
            id_movimiento: null
        }, {
            where: { id: item.id },
            transaction: t
        }).then(function (detalleCreado) {
            return DetalleMovimiento.findAll({
                where: { id_movimiento: item.id_movimiento },
                transaction: t
            }).then(async function (detalles) {

                var promises = [];
                for (let index = 0; index < detalles.length; index++) {
                    const detalle = detalles[index];
                    var actualizadoInv = await Inventario.update({
                        cantidad: sequelize.literal('cantidad + ' + detalle.cantidad),
                        costo_total: sequelize.literal('cantidad * costo_unitario')
                    }, {
                        where: { id: detalle.id_inventario }
                    });

                    if (index === (detalles.length - 1)) {
                        // eliminar detalle movimiento y movimiento
                        // actualizar item ropa quitar movimiento poner null
                        DetalleMovimiento.destroy({
                            where: { id: item.id_movimiento }
                        }).then(function (detalleMovimientoEliminado) {
                            Movimiento.destroy({
                                where: { id: item.id_movimiento }
                            }).then(function (MovientoEliminado) {
                                // corregir esta parte
                            })
                        })

                    }
                    // promises.push(new Promise(function (fulfill, reject) {
                    //     fulfill({});
                    // }));

                }
                return Promise.all(promises);
                //    return Promise.all(promises);
            })
        })

    }

    function calcularCostosEgresosRopa(tipoMovimiento, tipoEgreso, producto, cantidad, inventarios, index, array, res, t, req, item) {
        var cantidadTotal = cantidad;
        if (producto.activar_inventario) {
            if (inventarios.length > 0) {
                var promises = [];
                var totalInventario = 0
                for (var p = 0; p < inventarios.length; p++) {
                    totalInventario = totalInventario + inventarios[p].cantidad;
                    if (p === (inventarios.length - 1)) {
                        if (totalInventario >= cantidad) {
                            return Movimiento.create({
                                id_tipo: tipoMovimiento.id,
                                id_clase: tipoEgreso.id,
                                id_almacen: req.body.id_almacen,
                                fecha: req.body.fecha
                            }, { transaction: t }).then(function (movimientoCreado) {
                                var anterior = false
                                if (!item.modificable) {
                                    anterior = true
                                }
                                return RrhhEmpleadoDotacionRopaItem.update({
                                    id_producto: item.producto.id,
                                    entregado: item.entregado,
                                    id_ropa_trabajo: item.ropaTrabajo.id,
                                    id_cargo: item.cargo.id,
                                    cantidad: item.cantidad,
                                    id_movimiento: movimientoCreado.id
                                }, {
                                    where: { id: item.id },
                                    transaction: t
                                }).then(function (detalleCreado) {
                                    for (var i = 0; i < inventarios.length; i++) {
                                        if (cantidadTotal > 0) {
                                            var cantidadParcial;
                                            if (cantidadTotal > inventarios[i].cantidad) {
                                                cantidadParcial = inventarios[i].cantidad;
                                                cantidadTotal = cantidadTotal - inventarios[i].cantidad
                                            } else {
                                                cantidadParcial = cantidadTotal;
                                                cantidadTotal = 0;
                                            }

                                            if (cantidadParcial > 0) {
                                                //req.body.mensaje += "cliente pedido: "+detalle_despacho.despacho.cliente.razon_social+" producto: "+producto.nombre+" inventario=" + totalInventario+ "cantidad despachadas=" + cantidad+"|------|"
                                                var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, t);
                                                //console.log(rrr);
                                                promises.push(new Promise(function (fulfill, reject) {
                                                    fulfill({});
                                                }));
                                            }
                                        } else {
                                            //if (index == (array.length - 1) && i == (inventarios.length - 1)) {
                                            //res.json(venta);
                                            /*promises.push(new Promise(function (fulfill, reject){
                                                fulfill(venta);
                                            }));*/
                                            //}
                                        }
                                    }
                                })

                            })
                        } else {
                            var anterior = false
                            if (!item.modificable) {
                                anterior = true
                            }
                            promises.push(RrhhEmpleadoDotacionRopaItem.update({
                                id_producto: item.producto.id,
                                entregado: false,
                                id_ropa_trabajo: item.ropaTrabajo.id,
                                id_cargo: item.cargo.id,
                                cantidad: item.cantidad,
                                anterior: anterior
                            }, {
                                where: { id: item.id },
                                transaction: t
                            }).then(function (detalleCreado) {
                                //  req.body.mensaje += "cliente pedido: " + detalle_despacho.despacho.cliente.razon_social + " producto: " + producto.nombre + " inventario=" + totalInventario + "cantidad despachadas=" + cantidad + "|---|"
                            }))

                        }
                    }
                }
                return Promise.all(promises);
            } else {
                return RrhhEmpleadoDotacionRopaItem.create({
                    id_dotacion_ropa: dotacionCreada.dataValues.id,
                    id_producto: item.producto.id,
                    entregado: false,
                    id_ropa_trabajo: item.ropaTrabajo.id,
                    id_cargo: item.cargo.id,
                    cantidad: item.cantidad,
                    anterior: anterior
                }, {
                    transaction: t
                }).then(function (detalleCreado) {
                    return new Promise(function (fulfill, reject) {
                        fulfill({});
                    }); //  req.body.mensaje += "cliente pedido: " + detalle_despacho.despacho.cliente.razon_social + " producto: " + producto.nombre + " inventario=" + totalInventario + "cantidad despachadas=" + cantidad + "|---|"
                })
                //if (index == (array.length - 1)) {

                //}
            }
        } else {
            //if (index == (array.length - 1)) {
            return new Promise(function (fulfill, reject) {
                fulfill(venta);
            });
            //}
        }
    }
    router.route('/recursos-humanos/ropa-trabajo/empleado/:id_empleado')
        .post(ensureAuthorizedlogged, async (req, res) => {
            try {
                req.body.errores = []
                const dotacion = req.body
                let items = dotacion.dotacionItems.filter( e => e.entregado )
                if(!items || items.length === 0 ) return res.json({ hasError: true, mensaje: "No se seleccionó productos a entregar"})
                // recuperar almacen
                let almacenRecuperado = await Almacen.find({ where: { id: dotacion.almacen.id } } )
                sequelize.transaction(function (t) {
                    return Sucursal.find({ where: { id: dotacion.sucursal.id }, transaction: t })
                        .then(sucursalRecuperado => {
                            req.body.nro_iso = almacenRecuperado.numero_correlativo_iso_dotacion_ropa || 0;
                            return RrhhEmpleadoDotacionRopa.create({
                                fecha: req.body.fecha,
                                // fecha_vencimiento: req.body.fecha_vencimiento,
                                id_cumplimiento: req.body.cumplimiento.id,
                                id_periodo: req.body.periodo.id,
                                // id_estado: req.body.estado.id,
                                id_empleado: req.params.id_empleado,
                                observacion: req.body.observacion,
                                id_usuario: req.body.id_usuario,
                                numero_iso_dotacion_ropa: req.body.nro_iso ? req.body.nro_iso : null,
                                eliminado: false,
                                id_ficha: req.body.id_ficha,
                                numero: sucursalRecuperado.ropa_trabajo_correlativo,
                                id_sucursal: req.body.sucursal.id,
                                id_almacen: req.body.almacen.id,
                                config_doc_iso: req.body.config_doc_iso ? req.body.config_doc_iso : null
                            }, {
                                transaction: t,
                            })
                            .then(function (dotacionCreada) {
                                req.body.nuevo = dotacionCreada
                                return Sucursal.update({
                                    ropa_trabajo_correlativo: sucursalRecuperado.ropa_trabajo_correlativo ? sucursalRecuperado.ropa_trabajo_correlativo + 1 : 1
                                }, {
                                    transaction: t,
                                    where: {
                                        id: req.body.sucursal.id,
                                    }
                                }).then(function (sucursalActualizado) {
                                    return Almacen.update({
                                        numero_correlativo_iso_dotacion_ropa: req.body.config_doc_iso != undefined ? almacenRecuperado.numero_correlativo_iso_dotacion_ropa + 1 : almacenRecuperado.numero_correlativo_iso_dotacion_ropa
                                    }, {
                                        transaction: t,
                                        where: { id: req.body.almacen.id }
                                    })
                                    .then( (almacenActualizado) => {
                                        return agregarItemsRopa( req, res, t )
                                    })
                                })
                            })
                        })
                })
                .then(function (result) {
                    let errores = req.body.errores
                    res.json({ error: false, message: "<b>Dotación realizada</b>", numero: req.body.nro_iso , nuevo: req.body.nuevo, errores, messageType: errores.length > 0 ? "warning" : "success"})
                })
                .catch(function (err) {
                    var error = (err.stack) ? err.stack : err
                    res.json({ error: true, message: error, messageType:"error"});
                })
            } catch (e) {
                res.json({ hasError: true, mensaje: "<b>Error al actualizar la dotación</b><br>"+e, messageType:"error"})  
            }
        })


        .put(ensureAuthorizedlogged, async function (req, res) {
            try {
                const detalleDotRopaTrabajoItem = await RrhhEmpleadoDotacionRopaItem.findAll({ where: { id_dotacion_ropa: req.body.id, id_movimiento: { $not: null } }, order: [['id', 'asc']] })
                if (detalleDotRopaTrabajoItem.length > 0) {
                    for (let index = 0; index < detalleDotRopaTrabajoItem.length; index++) {
                        const detalleRopa = detalleDotRopaTrabajoItem[index];
                        const detallMovInv = await DetalleMovimiento.findAll({ where: { id_movimiento: detalleRopa.id_movimiento } })
                        if (detallMovInv.length > 0) {
                            for (let index = 0; index < detallMovInv.length; index++) {
                                const detalleRopaInv = detallMovInv[index];
                                var actualizadoInv = await Inventario.update({
                                    cantidad: sequelize.literal('cantidad + ' + detalleRopaInv.cantidad),
                                    costo_total: sequelize.literal('cantidad * costo_unitario')
                                }, { where: { id: detalleRopaInv.id_inventario } });
                                const eliminadDetallMov = await DetalleMovimiento.destroy({ where: { id_movimiento: detalleRopaInv.id_movimiento } })
                                const eliminadMov = await Movimiento.destroy({ where: { id: detalleRopaInv.id_movimiento } })
                            }
                        }
                    }
                    const elimRRHH = await RrhhEmpleadoDotacionRopa.update({ eliminado: true }, { where: { id: req.body.id } })
                    res.json({ mensaje: "Eliminado satisfactoriamente" })
                } else {
                    const elimRRHH = await RrhhEmpleadoDotacionRopa.update({ eliminado: true }, { where: { id: req.body.id } })
                    res.json({ mensaje: "Eliminado satisfactoriamente" })
                }
            } catch (e) {
                res.json({ error: true, mensaje: e.message})
            }
        })

    async function agregarItemsRopa(req, res, t) {
        try {
            var promises = []
            const { id_almacen, id_sucursal } = req.body.nuevo
            req.body.dotacionItems = req.body.dotacionItems.filter( e => e.producto )
            for (let i = 0; i < req.body.dotacionItems.length; i++) {
                const { id, id_dotacion_ropa, id_producto, producto, ropaTrabajo, id_ropa_trabajo, id_movimiento, entregado, cantidad, cantidad_disponible, cargo, id_cargo } = req.body.dotacionItems[i];
                if (entregado) {
                    let inventarios = await Inventario.findAll({ where: { id_producto: producto.id, id_almacen, cantidad: { $gt: 0 } } })
                    let cantidad_disp = inventarios.reduce((acc, { cantidad }) => acc += cantidad, 0)
                    if (inventarios && (cantidad_disp >= cantidad)) {
                        promises.push(
                            //obtener tipo movimiento
                            Tipo.find({ where: { nombre_corto: Diccionario.MOV_EGRE } })
                            .then(function (tipoMovimiento) {
                                //obtener clase de movimiento
                                return Clase.find({ where: { nombre_corto: 'EPPS', id_tipo: tipoMovimiento.id } })
                                    .then(function (claseMovimiento) {
                                        // generar el movimiento
                                        return Movimiento.create({
                                                id_tipo: tipoMovimiento.id,
                                                id_clase: claseMovimiento.id,
                                                id_almacen,
                                                fecha: new Date()
                                            }, {
                                                transaction: t
                                            })
                                            .then(mov_creado => {
                                                // Editar la dotacion item
                                                return RrhhEmpleadoDotacionRopaItem.create({
                                                        id_dotacion_ropa: req.body.nuevo.id,
                                                        id_producto: producto.id,
                                                        entregado: true,
                                                        id_ropa_trabajo,
                                                        id_cargo,
                                                        cantidad,
                                                        anterior: 0,
                                                        id_movimiento: mov_creado.id
                                                    }, {
                                                        transaction: t
                                                    })
                                                    .then(item_editado => {
                                                        // Consumir inventarios
                                                        let cantidad_consumir = cantidad
                                                        let promesas = []
                                                        for (let j = 0; j < inventarios.length; j++) {
                                                            const inv = inventarios[j];
                                                            if (cantidad_consumir > 0) {
                                                                let cantidad_parcial = cantidad_consumir > inv.cantidad ? inv.cantidad : cantidad_consumir
                                                                cantidad_consumir = cantidad_consumir - cantidad_parcial
                                                                promesas.push(
                                                                    Inventario.update({
                                                                        cantidad: inv.cantidad - cantidad_parcial
                                                                    }, {
                                                                        where: {
                                                                            id: inv.id
                                                                        },
                                                                        transaction: t
                                                                    })
                                                                    .then( inv_consumido => {
                                                                        return DetalleMovimiento.create({
                                                                                id_movimiento: mov_creado.id,
                                                                                id_producto: producto.id,
                                                                                cantidad: cantidad_parcial,
                                                                                costo_unitario: inv.costo_unitario,
                                                                                importe: (cantidad_parcial * inv.costo_unitario),
                                                                                total: (cantidad_parcial * inv.costo_unitario),
                                                                                descuento: 0,
                                                                                recargo: 0,
                                                                                ice: 0,
                                                                                excento: 0,
                                                                                tipo_descuento: 0,
                                                                                tipo_recargo: 0,
                                                                                id_inventario: inv.id
                                                                            }, {
                                                                                transaction: t
                                                                            })
                                                                            .then(det_mov_creado => {
                                                                                return new Promise(function (fulfill, reject) {
                                                                                    fulfill({message: 'detalle movimiento creado'})
                                                                                });
                                                                            })
                                                                            .catch(e => {
                                                                                console.log(e);
                                                                            })
                                                                    })
                                                                    .catch(e => {
                                                                        console.log(e);
                                                                    })
                                                                )
                                                            } else {
                                                                return new Promise(function (fulfill, reject) {
                                                                    fulfill({ message: "Dotación item completado"})
                                                                });
                                                            }
                                                        }
                                                        return Promise.all(promesas);
                                                    })
                                                    .catch(e => {
                                                        console.log(e);
                                                    })
                                            })
                                            .catch(e => {
                                                console.log(e);
                                            })
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    })
                            })
                            .catch(e => {
                                console.log(e);
                            })
                        )
                    } else {
                        req.body.errores.push(producto.nombre + " no tiene suficiente stock disponible.")
                        promises.push(
                            RrhhEmpleadoDotacionRopaItem.create({
                                id_dotacion_ropa: req.body.nuevo.id,
                                id_producto: producto.id || null,
                                entregado: false,
                                id_ropa_trabajo: id_ropa_trabajo,
                                id_cargo: id_cargo,
                                cantidad: cantidad,
                                anterior: 0,
                                id_movimiento: null
                            }, {
                                transaction: t
                            })
                            .then(item_creado => {
                                return new Promise(function (fulfill, reject) {
                                    fulfill({ message: 'Item sin stock creado'})
                                });
                            })
                            .catch(e => {
                                return new Promise(function ( fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })
                        )
                    }
                } else {
                    promises.push(
                        RrhhEmpleadoDotacionRopaItem.create({
                            id_dotacion_ropa: req.body.nuevo.id,
                            id_producto: producto.id || null,
                            entregado: false,
                            id_ropa_trabajo: id_ropa_trabajo,
                            id_cargo: id_cargo,
                            cantidad: cantidad,
                            anterior: 0,
                            id_movimiento: null
                        }, {
                            transaction: t
                        })
                        .then(item_creado => {
                            return new Promise(function (fulfill, reject) {
                                fulfill({ message: 'Item creado'})
                            });
                        })
                        .catch(e => {
                            return new Promise(function ( fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                    )
                }
            }
            return Promise.all(promises);
        } catch (e) {
            console.log(e);
        }
    }

    async function crearMovimientoEgresoYActualizarInventario(movimientoCreado, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, t) {
        // console.log(cantidad);
        var detalleMovimientoCreado = await DetalleMovimiento.create({
            id_movimiento: movimientoCreado.id,
            id_producto: producto.id,
            cantidad: cantidadParcial,
            costo_unitario: costo.costo_unitario,
            importe: (cantidadParcial * costo.costo_unitario),
            total: (cantidadParcial * costo.costo_unitario),
            descuento: 0,
            recargo: 0,
            ice: 0,
            excento: 0,
            tipo_descuento: 0,
            tipo_recargo: 0,
            id_inventario: costo.id
        });

        var inventario = await Inventario.find({
            where: {
                id: costo.id
            }
        });

        var inventarioActualizado = await Inventario.update({
            cantidad: inventario.cantidad - cantidadParcial,
            costo_total: ((inventario.cantidad - cantidadParcial) * costo.costo_unitario)
        }, {
            where: {
                id: inventario.id
            }
        });

        return promise = await new Promise(function (fulfill, reject) {
            fulfill({});
        });

    }
    // function crearMovimientoEgresoYActualizarInventario(movimientoCreado, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, t) {
    //     console.log(cantidad);
    //     return DetalleMovimiento.create({
    //         id_movimiento: movimientoCreado.id,
    //         id_producto: producto.id,
    //         cantidad: cantidadParcial,
    //         costo_unitario: costo.costo_unitario,
    //         importe: (cantidadParcial * costo.costo_unitario),
    //         total: (cantidadParcial * costo.costo_unitario),
    //         descuento: 0,
    //         recargo: 0,
    //         ice: 0,
    //         excento: 0,
    //         tipo_descuento: 0,
    //         tipo_recargo: 0,
    //         id_inventario: costo.id
    //     }, { transaction: t }).then(function (detalleMovimientoCreado) {
    //         sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
    //             return Inventario.find({
    //                 where: {
    //                     id: costo.id
    //                 },
    //                 transaction: tu,
    //                 lock: tu.LOCK.UPDATE
    //             }).then(function (inventario) {
    //                 return Inventario.update({
    //                     cantidad: inventario.cantidad - cantidadParcial,
    //                     costo_total: ((inventario.cantidad - cantidadParcial) * costo.costo_unitario)
    //                 }, {
    //                     where: {
    //                         id: inventario.id
    //                     },
    //                     transaction: tu
    //                 });
    //             });
    //         }).then(function (result) {
    //             return new Promise(function (fulfill, reject) {
    //                 fulfill({});
    //             });
    //         }).catch(function (err) {
    //             return new Promise(function (fulfill, reject) {
    //                 reject(err);
    //             });
    //         });
    //     });
    // }

    function calcularCostosEgresos(tipoMovimiento, tipoEgreso, producto, cantidad, inventarios, index, array, res, t, req, item, a, dotacionCreada) {
        var cantidadTotal = cantidad;
        if (producto.activar_inventario) {
            if (inventarios.length > 0) {
                var promises = [];
                var totalInventario = 0
                for (var p = 0; p < inventarios.length; p++) {
                    totalInventario = totalInventario + inventarios[p].cantidad;
                    if (p === (inventarios.length - 1)) {
                        if (totalInventario >= cantidad) {
                            return Movimiento.create({
                                id_tipo: tipoMovimiento.id,
                                id_clase: tipoEgreso.id,
                                id_almacen: req.body.id_almacen,
                                fecha: req.body.fecha
                            }, { transaction: t }).then(function (movimientoCreado) {
                                var anterior = false
                                if (!item.modificable) {
                                    anterior = true
                                }
                                return RrhhEmpleadoDotacionRopaItem.create({
                                    id_dotacion_ropa: dotacionCreada.dataValues.id,
                                    id_producto: item.producto.id,
                                    entregado: item.entregado,
                                    id_ropa_trabajo: item.ropaTrabajo.id,
                                    id_cargo: item.cargo.id,
                                    cantidad: item.cantidad,
                                    anterior: anterior,
                                    id_movimiento: movimientoCreado.id
                                }, {
                                    transaction: t
                                }).then(function (detalleCreado) {
                                    for (var i = 0; i < inventarios.length; i++) {
                                        if (cantidadTotal > 0) {
                                            var cantidadParcial;
                                            if (cantidadTotal > inventarios[i].cantidad) {
                                                cantidadParcial = inventarios[i].cantidad;
                                                cantidadTotal = cantidadTotal - inventarios[i].cantidad
                                            } else {
                                                cantidadParcial = cantidadTotal;
                                                cantidadTotal = 0;
                                            }

                                            if (cantidadParcial > 0) {
                                                //req.body.mensaje += "cliente pedido: "+detalle_despacho.despacho.cliente.razon_social+" producto: "+producto.nombre+" inventario=" + totalInventario+ "cantidad despachadas=" + cantidad+"|------|"
                                                var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, t);
                                                //console.log(rrr);
                                                promises.push(new Promise(function (fulfill, reject) {
                                                    fulfill({});
                                                }));
                                            }
                                        } else {
                                            //if (index == (array.length - 1) && i == (inventarios.length - 1)) {
                                            //res.json(venta);
                                            /*promises.push(new Promise(function (fulfill, reject){
                                                fulfill(venta);
                                            }));*/
                                            //}
                                        }
                                    }
                                })

                            })
                        } else {
                            var anterior = false
                            if (!item.modificable) {
                                anterior = true
                            }
                            promises.push(RrhhEmpleadoDotacionRopaItem.create({
                                id_dotacion_ropa: dotacionCreada.dataValues.id,
                                id_producto: item.producto.id,
                                entregado: false,
                                id_ropa_trabajo: item.ropaTrabajo.id,
                                id_cargo: item.cargo.id,
                                cantidad: item.cantidad,
                                anterior: anterior
                            }, {
                                transaction: t
                            }).then(function (detalleCreado) {
                                //  req.body.mensaje += "cliente pedido: " + detalle_despacho.despacho.cliente.razon_social + " producto: " + producto.nombre + " inventario=" + totalInventario + "cantidad despachadas=" + cantidad + "|---|"
                            }))

                        }
                    }
                }
                return Promise.all(promises);
            } else {
                var anterior = false
                if (!item.modificable) {
                    anterior = true
                }

                return RrhhEmpleadoDotacionRopaItem.create({
                    id_dotacion_ropa: dotacionCreada.dataValues.id,
                    id_producto: item.producto.id,
                    entregado: false,
                    id_ropa_trabajo: item.ropaTrabajo.id,
                    id_cargo: item.cargo.id,
                    cantidad: item.cantidad,
                    anterior: anterior
                }, {
                    transaction: t
                }).then(function (detalleCreado) {
                    return new Promise(function (fulfill, reject) {
                        fulfill({});
                    }); //  req.body.mensaje += "cliente pedido: " + detalle_despacho.despacho.cliente.razon_social + " producto: " + producto.nombre + " inventario=" + totalInventario + "cantidad despachadas=" + cantidad + "|---|"
                })
                //if (index == (array.length - 1)) {

                //}
            }
        } else {
            //if (index == (array.length - 1)) {
            return new Promise(function (fulfill, reject) {
                fulfill(venta);
            });
            //}
        }
    }
    router.route('/recursos-humanos/ropa-trabajo/empleado/:id_empleado/inicio/:inicio/fin/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionRopaTrabajo = { id_empleado: req.params.id_empleado }
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 0);
                condicionRopaTrabajo = { id_empleado: req.params.id_empleado, eliminado: false, fecha: { $between: [inicio, fin] } };
            }
            RrhhEmpleadoDotacionRopa.findAll({
                where: condicionRopaTrabajo,
                include: [
                    { model: RrhhEmpleadoFicha, as: "ficha", required: false },
                    { model: Sucursal, as: "sucursal" },
                    { model: Almacen, as: "almacen" },
                    { model: ConfiguracionIso, as: 'configuracionesIso', required: false },
                    {
                        model: RrhhEmpleadoDotacionRopaItem, as: "dotacionItems", where: { id_producto: { $not: null } },
                        include: [{ model: Clase, as: "cargo" },
                        {
                            model: Clase, as: "ropaTrabajo",
                            include: [{ model: RrhhEmpleadoConfiguracionRopa, as: 'ropasTrabajo' }]
                        }]
                    },
                    { model: MedicoPaciente, as: "empleado" },
                    { model: Clase, as: "estado" },
                    { model: Clase, as: "periodo" },
                    { model: Clase, as: "cumplimiento" },
                    { model: Usuario, as: "usuario", include: [{ model: Persona, as: 'persona' }] }],
                order: [["id", "asc"]]
            }).then(function (entity) {
                res.json(entity)
            })
        })

    router.route('/recursos-humanos/ropa-trabajo/reportes/:id_empresa/:inicio/:fin/:campamento')
        .get(ensureAuthorizedlogged, function (req, res) {
            var { id_empresa, inicio, fin, campamento } = req.params
            if (!id_empresa) return res.json({ error: true, message: "Parámetros inválidos", messageType: "error" });
            try {
                let qry = `SELECT DISTINCT(item.id), dr.id AS id_dotacion,item.id AS id_item, campo.id AS id_campo,prod.id AS id_producto, mp.id AS id_empleado, dr.numero,dr.numero_iso_dotacion_ropa,p.nombre_completo,cargo.nombre AS cargo,campo.nombre AS campo,ef.fecha_inicio,cump.nombre AS cumplimiento,dr.fecha AS fecha_entrega,prod.codigo AS codigo,prod.nombre AS descripcion,grupo.nombre AS grupo,subgrupo.nombre AS subgrupo,prod.unidad_medida,item.cantidad,dmv.costo_unitario AS costo,dmv.importe,( SELECT meses_uso AS config_cantidad FROM agil_rrhh_empleado_configuracion_ropa WHERE ropa_trabajo=item.ropa AND cargo=item.cargo LIMIT 1) AS meses_uso, ( SELECT cantidad FROM agil_rrhh_empleado_configuracion_ropa WHERE ropa_trabajo = item.ropa AND cargo = item.cargo LIMIT 1 ) AS cantidad_config FROM agil_rrhh_empleado_dotacion_ropa dr INNER JOIN agil_medico_paciente mp ON mp.id=dr.empleado INNER JOIN gl_persona p ON p.id=mp.persona INNER JOIN agil_rrhh_empleado_ficha ef ON ef.id=dr.ficha INNER JOIN gl_clase campo ON campo.id=ef.id_campo INNER JOIN gl_clase cump ON cump.id=dr.cumplimiento INNER JOIN agil_rrhh_empleado_dotacion_ropa_item item ON item.dotacion_ropa=dr.id AND item.entregado=TRUE INNER JOIN gl_clase cargo ON cargo.id=item.cargo INNER JOIN agil_producto prod ON prod.id=item.producto INNER JOIN gl_clase grupo ON grupo.id=prod.grupo INNER JOIN gl_clase subgrupo ON subgrupo.id=prod.subgrupo INNER JOIN inv_detalle_movimiento dmv ON dmv.movimiento=item.movimiento WHERE mp.empresa=${id_empresa}  AND dr.eliminado=FALSE`
                if (inicio != "0" && fin != "0") {
                    qry += ` AND dr.fecha BETWEEN '${inicio.split('/').reverse().join('-')} 00:00:00' AND '${fin.split('/').reverse().join('-')} 23:59:59'`
                } else {
                    qry += inicio != "0" ? ` AND dr.fecha > '${inicio.split('/').reverse().join('-')} 00:00:00' ` : ` AND dr.fecha > '${new Date().getFullYear()}-01-01 00:00:00'`
                    qry += fin != "0" ? ` AND dr.fecha < '${fin.split('/').reverse().join('-')} 23:59:59'` : ` AND dr.fecha < CURRENT_TIMESTAMP `
                }
                if (campamento != "0") qry += ` AND campo.id=${campamento}`
                qry += ` ORDER BY dr.fecha ASC`
                sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
                    .then(data => {
                        res.json({ error: false, data })
                    })
            } catch (e) {
                res.json({ error: true, message: "Parámetros inválidos", messageType: "error" });
            }


        })
    router.route('/recursos-humanos/ropa-trabajo/comprobante/empresa/:id_empresa/inicio/:inicio/fin/:fin/campamento/:campamento')
        .get(ensureAuthorizedlogged, async function (req, res) {
            try {

                var condicionRopaTrabajo = { eliminado: false }
                if (req.params.inicio != 0) {
                    var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                    var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                    condicionRopaTrabajo = { id_comprobante: null, eliminado: false, fecha: { $between: [inicio, fin] } };
                }
                let condicionEmpleado = { id_campo: req.params.campamento, id_empresa: req.params.id_empresa }
                if (req.params.campamento == 0) {
                    delete condicionEmpleado.id_campo
                }
                entity = await RrhhEmpleadoDotacionRopaItem.findAll({
                    where: { anterior: false, entregado: true }
                    , attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`dotacion_ropa`'))), 'ids']],
                    include: [{
                        model: Movimiento, as: 'movimiento', required: true,
                        include: [{
                            model: DetalleMovimiento, as: 'detallesMovimiento',
                            attributes: [[sequelize.fn('sum', sequelize.col('total')), 'total']]
                        }]
                    }, { model: Clase, as: "cargo" },
                    { model: Clase, as: "ropaTrabajo" },
                    {
                        model: Producto, as: "producto",
                        include: [{ model: Clase, as: "grupo" },
                        { model: Clase, as: "subgrupo" }]
                    }, {
                        model: RrhhEmpleadoDotacionRopa, as: "dotacionRopa", where: condicionRopaTrabajo,
                        include: [
                            {
                                model: RrhhEmpleadoFicha, as: "ficha", include: [
                                    { model: Clase, as: 'tipoPersonal', include: [{ model: ContabilidadCuenta, as: 'cuenta' }] },
                                    {
                                        model: MedicoPaciente, as: 'empleado', where: condicionEmpleado,
                                        include: [{ model: Clase, as: 'campo' }, { model: Persona, as: 'persona' }]
                                    }]
                            }, { model: Clase, as: "estado" }
                        ]
                    }],
                    group: ["`dotacionRopa.ficha.empleado.campo.id`", "`dotacionRopa.ficha.tipoPersonal.id`"]
                })
                res.json(entity)


            } catch (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            }
        })
    router.route('/recursos-humanos/viaje/empresa/:id_empresa/inicio/:inicio/fin/:fin/tipoPasajero/:tipoPasajero/destino/:destino/vehiculo/:vehiculo/conductor/:conductor/tipoViaje/:tipoViaje/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionViaje = { id_empresa: req.params.id_empresa }
            var condicionDetalleViaje = {}
            var condicionEmpleado = {}
            if (req.params.inicio != 0 && req.params.fin != 0) {
                var fechaInicial = new Date(req.params.inicio);
                var fechaFinal = new Date(req.params.fin);
                fechaInicial.setHours(0, 0, 0, 0, 0);
                fechaFinal.setHours(23, 59, 59, 59, 0);
                condicionViaje = {
                    id_empresa: req.params.id_empresa,
                    $or: [
                        {
                            fecha: { $between: [fechaInicial, fechaFinal] },
                        }
                    ]
                };
            }
            if (req.params.tipoPasajero != 0) {
                if (req.params.tipoPasajero == "E") {
                    condicionDetalleViaje.id_ficha = { $ne: null }
                } else if (req.params.tipoPasajero == "V") {
                    condicionDetalleViaje.id_visita = { $ne: null }
                }
            }
            if (req.params.vehiculo != 0) {
                condicionViaje.id_vehiculo = req.params.vehiculo
            }
            if (req.params.conductor != 0) {
                condicionViaje.id_conductor = req.params.conductor
            }
            if (req.params.tipoViaje != 0) {
                condicionDetalleViaje.id_tipo_viaje = parseInt(req.params.tipoViaje)
            }
            if (req.params.destino != 0) {
                condicionDetalleViaje.id_campo = parseInt(req.params.destino)
            }
            RrhhViajeDetalle.findAndCountAll({
                where: condicionDetalleViaje,
                offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                include: [{ model: Clase, as: 'estado' }, { model: Clase, as: 'campo' }, { model: Clase, as: "tipoViaje" }, { model: RrhhViaje, as: "viaje", where: condicionViaje, include: [{ model: Clase, as: "vehiculo" }, { model: RrhhViajeConductor, as: "conductor", required: false }] },
                { model: Persona, as: "visita", required: false },
                { model: RrhhEmpleadoFicha, as: "ficha", required: false, include: [{ model: MedicoPaciente, as: "empleado", required: false, include: [{ model: Persona, as: "persona", required: false }] }] }],
                order: [["id", "asc"]]
            }).then(function (datos) {
                res.json({ viajes: datos.rows, paginas: Math.ceil(datos.count / req.params.items_pagina) });
            })
        })

    router.route('/recursos-humanos/viaje/empresa/:id_empresa/inicio/:inicio/fin/:fin/destino/:destino/vehiculo/:vehiculo/conductor/:conductor/relevo/:relevo/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionViaje = { id_empresa: req.params.id_empresa }
            var condicionDetalleViaje = {}
            var condicionEmpleado = {}
            if (req.params.inicio != 0 && req.params.fin != 0) {
                var fechaInicial = new Date(req.params.inicio);
                var fechaFinal = new Date(req.params.fin);
                fechaInicial.setHours(0, 0, 0, 0, 0);
                fechaFinal.setHours(23, 59, 59, 59, 0);
                condicionViaje = {
                    id_empresa: req.params.id_empresa,
                    $or: [
                        {
                            fecha: { $between: [fechaInicial, fechaFinal] },
                        }
                    ]
                };
            }
            if (req.params.vehiculo != 0) {
                condicionViaje.id_vehiculo = req.params.vehiculo
            }
            if (req.params.conductor != 0) {
                condicionViaje.id_conductor = req.params.conductor
            }
            if (req.params.relevo != 0) {
                condicionViaje.id_relevo = parseInt(req.params.tipoViaje)
            }
            if (req.params.destino != 0) {
                condicionDetalleViaje.id_campo = parseInt(req.params.destino)
            }
            RrhhViaje.findAndCountAll({
                where: condicionViaje,
                offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                include: [{ model: Clase, as: "vehiculo" },
                { model: RrhhViajeConductor, as: "conductor", required: false, include: [{ model: Clase, as: 'tipoLicencia' }] },
                { model: RrhhViajeConductor, as: "relevo", required: false, include: [{ model: Clase, as: 'tipoLicencia' }] },
                { model: RrhhViajeDestino, as: "destinos", include: [{ model: Clase, as: 'destino' }] },
                {
                    model: RrhhViajeDetalle, as: "viajeDetalles",
                    include: [{ model: Clase, as: 'estado' }, { model: Clase, as: 'campo' }, { model: Clase, as: "tipoViaje" },
                    { model: Persona, as: "visita", required: false },
                    { model: RrhhEmpleadoFicha, as: "ficha", required: false, include: [{ model: MedicoPaciente, as: "empleado", required: false, include: [{ model: Persona, as: "persona", required: false }] }] }]
                }],

                order: [["id", "asc"]]
            }).then(function (datos) {
                res.json({ viajes: datos.rows, paginas: Math.ceil(datos.count / req.params.items_pagina) });
            })
        })
    router.route('/recursos-humanos/viaje/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async (req, res) => {
            if (!req.params.id_empresa) return res.json({ mensaje: "Parámetros incorrectos" })
            let empresa = await Empresa.findById(req.params.id_empresa)
            let numeracion = empresa.correlativo_iso_viajes ? empresa.correlativo_iso_viajes + 1 : 1
            RrhhViaje.create({
                id_empresa: req.params.id_empresa,
                id_vehiculo: req.body.vehiculo.id,
                id_conductor: req.body.conductor.id,
                id_relevo: req.body.relevo.id,
                fecha_ingreso: req.body.fecha_ingreso,
                fecha_salida: req.body.fecha_salida,
                fecha: req.body.fecha,
                eliminado: false,
                config_doc_iso: req.body.config_doc_iso,
                nro_iso: numeracion
            }).then(async (viajeCreado) => {
                await Empresa.update({ correlativo_iso_viajes: numeracion }, { where: { id: empresa.id } })
                req.body.destinos.forEach(function (destino, index, array) {
                    RrhhViajeDestino.create({
                        id_viaje: viajeCreado.id,
                        id_destino: destino.id,
                    }).then(function (destinoCreado) {
                        if (index === (array.length - 1)) {
                            if (req.body.empleadosEntrada.length > 0) {
                                req.body.empleadosEntrada.forEach(function (entrada, index, array) {
                                    if (entrada.esVisita) {
                                        var nombre = (entrada.persona.apellido_paterno != undefined || entrada.persona.apellido_paterno != null ? entrada.persona.apellido_paterno : '')
                                            + ' ' + (entrada.persona.apellido_materno != undefined || entrada.persona.apellido_materno != null ? entrada.persona.apellido_materno : '')
                                            + ' ' + (entrada.persona.nombres != undefined || entrada.persona.nombres != null ? entrada.persona.nombres : '')
                                        Persona.create({
                                            nombres: entrada.persona.nombres,
                                            segundo_nombre: entrada.persona.segundo_nombre ? entrada.persona.segundo_nombre : "",

                                            apellido_paterno: entrada.persona.apellido_paterno,
                                            apellido_materno: entrada.persona.apellido_materno,
                                            nombre_completo: nombre,
                                            ci: entrada.persona.ci,
                                            id_expedido: entrada.persona.expedido.id,
                                        }).then(function (personaCreada) {
                                            RrhhViajeDetalle.create({
                                                id_viaje: viajeCreado.id,
                                                id_visita: personaCreada.id,
                                                eliminado: false,
                                                id_estado: entrada.estado.id,
                                                id_tipo_viaje: entrada.tipoViaje.id,
                                                habilitado: entrada.habilitado,
                                                id_campo: entrada.campo.id
                                            }).then(function (destinoCreado) {
                                                if (index === (array.length - 1)) {
                                                    guardarEmpleadosSalida(req, res, viajeCreado)
                                                }
                                            })
                                        })

                                    } else {
                                        RrhhViajeDetalle.create({
                                            id_viaje: viajeCreado.id,
                                            id_ficha: entrada.id_ficha,
                                            eliminado: false,
                                            id_estado: entrada.estado.id,
                                            id_tipo_viaje: entrada.tipoViaje.id,
                                            habilitado: entrada.habilitado,
                                            id_campo: entrada.campo.id
                                        }).then(function (destinoCreado) {
                                            if (index === (array.length - 1)) {
                                                guardarEmpleadosSalida(req, res, viajeCreado)
                                            }
                                        })
                                    }

                                })
                            } else {
                                guardarEmpleadosSalida(req, res, viajeCreado)
                            }
                        }
                    })

                });
            })
        })
    function guardarEmpleadosSalida(req, res, viajeCreado) {
        if (req.body.empleadosSalida.length > 0) {
            req.body.empleadosSalida.forEach(function (salida, index, array) {
                if (salida.esVisita) {
                    var nombre = (salida.persona.apellido_paterno != undefined || salida.persona.apellido_paterno != null ? salida.persona.apellido_paterno : '')
                        + ' ' + (salida.persona.apellido_materno != undefined || salida.persona.apellido_materno != null ? salida.persona.apellido_materno : '')
                        + ' ' + (salida.persona.nombres != undefined || salida.persona.nombres != null ? salida.persona.nombres : '')
                    Persona.create({
                        nombres: salida.persona.nombres,
                        segundo_nombre: salida.persona.segundo_nombre ? salida.persona.segundo_nombre : "",
                        apellido_paterno: salida.persona.apellido_paterno,
                        apellido_materno: salida.persona.apellido_materno,
                        nombre_completo: nombre,
                        ci: salida.persona.ci,
                        id_expedido: salida.persona.expedido.id,
                    }).then(function (personaCreada) {
                        RrhhViajeDetalle.create({
                            id_viaje: viajeCreado.id,
                            id_visita: personaCreada.id,
                            eliminado: false,
                            id_estado: salida.estado.id,
                            id_tipo_viaje: salida.tipoViaje.id,
                            habilitado: salida.habilitado,
                            id_campo: salida.campo.id
                        }).then(function (destinoCreado) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Creado Satisfactoriamente" })
                            }
                        })
                    })

                } else {
                    RrhhViajeDetalle.create({
                        id_viaje: viajeCreado.id,
                        id_ficha: salida.id_ficha,
                        eliminado: false,
                        id_estado: salida.estado.id,
                        id_tipo_viaje: salida.tipoViaje.id,
                        habilitado: salida.habilitado,
                        id_campo: salida.campo.id
                    }).then(function (destinoCreado) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: "Creado Satisfactoriamente" })
                        }
                    })
                }

            })
        } else {
            res.json({ mensaje: "Creado Satisfactoriamente" })
        }
    }
    router.route('/recursos-humanos/conductor/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (conductor, index, array) {
                if (conductor.id_empleado) {
                    if (index === (array.length - 1)) {
                        res.json({ mensaje: "Agregados satisfactoriamente!" })
                    }
                } else {
                    if (conductor.id) {
                        RrhhViajeConductor.update({
                            nombre: conductor.nombre,
                            licencia: conductor.licencia,
                            habilitado: conductor.habilitado,
                            id_empresa: req.params.id_empresa,
                            id_tipo_licencia: conductor.tipoLicencia.id,
                        }, {
                            where: { id: conductor.id }
                        }).then(function (ConductorActualizado) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Agregados satisfactoriamente!" })
                            }
                        })
                    } else {
                        RrhhViajeConductor.create({
                            nombre: conductor.nombre,
                            licencia: conductor.licencia,
                            habilitado: conductor.habilitado,
                            id_empresa: req.params.id_empresa,
                            id_tipo_licencia: conductor.tipoLicencia.id,
                        }).then(function (ConductorCreado) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: "Agregados satisfactoriamente!" })
                            }
                        })
                    }

                }
            });
        });
    //FIN
    /////////////////////////////////////////////////////// RUTAS PARA POLIFUNCIONAL ///////////////////////////////////////////////////

    var meses = [{ id: 0, nombre: "Enero" }, { id: 1, nombre: "Febrero" }, { id: 2, nombre: "Marzo" }, { id: 3, nombre: "Abril" },
    { id: 4, nombre: "Mayo" }, { id: 5, nombre: "Junio" }, { id: 6, nombre: "Julio" }, { id: 7, nombre: "Agosto" },
    { id: 8, nombre: "Septiembre" }, { id: 9, nombre: "Octubre" }, { id: 10, nombre: "Noviembre" }, { id: 11, nombre: "Diciembre" }];
    var actual_year_diference = (new Date().getFullYear() - 1980)
    var anios = Array.apply(null, Array(actual_year_diference + 1)).map(function (_, i) {
        var start_year = 1980
        var year = { id: start_year + i, nombre: start_year + i }
        return year
    })
    ///////////////////////////////////// FILTRO POLIFUNCIONAL

    router.route('/personal/filtro/:id_empresa/:mes/:anio/:desempenio/:mas_campo/:campo/:cargo/:estado/:codigo/:nombre/:apellido/:pagina/:items_pagina/:columna/:direccion/fiu')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion_evaluacion = {
                eliminado: false
            };

            var condicion_cargos = {}
            var condicion_persona = {}
            let condicion_empleado = {}
            if (req.params.mes !== "0") {
                condicion_evaluacion.mes = parseInt(req.params.mes) - 1
            }
            if (req.params.anio !== "0") {
                condicion_evaluacion.anio = req.params.anio
            }
            if (req.params.desempenio !== "0") {
                condicion_evaluacion.desempenio = req.params.desempenio
            }
            if (req.params.mas_campo !== "0") {

            }
            if (req.params.campo !== "0") {
                condicion_empleado.campo = req.params.campo
            }
            if (req.params.cargo !== "0") {
                condicion_cargos.cargo = req.params.cargo
            }
            if (req.params.estado !== "0") {
                condicion_empleado.eliminado = req.params.estado == "1" ? false : true
            }
            if (req.params.codigo !== "0") {
                condicion_empleado.codigo = { $like: req.params.codigo + '%' }
            }
            if (req.params.nombre !== "0") {
                condicion_persona.nombre_completo = { $like: '%' + req.params.nombre + '%' }
            }
            if (req.params.apellido !== "0") {
                condicion_persona.nombre_completo = { $like: '%' + req.params.apellido + '%' }
            }
            //condicion_empleado.es_empleado = true
            condicion_empleado.id_empresa = req.params.id_empresa
            condicion_evaluacion.eliminado = false
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            EvaluacionPolifuncional.findAndCountAll({
                where: condicion_evaluacion,
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [
                        {
                            model: MedicoPaciente, as: 'empleado', required: true, where: condicion_empleado,
                            include: [{ model: Clase, as: 'campo' },{ model: Persona, as: 'persona', where:condicion_persona }]
                        },
                        {
                            model: RrhhEmpleadoCargo, as: 'cargos', where: condicion_cargos,
                            include: [{ model: Clase, as: 'cargo' }]
                        },
                    ],
                }],
                order: textOrder
            }).then(function (evaluaciones) {
                res.json({ evaluaciones: evaluaciones.rows, paginas: Math.ceil(evaluaciones.count / req.params.items_pagina) })
            }).catch(function (err) {
                res.json({ personal: [], mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    /////////////////////////////////////// Lista de trabajadores

    router.route('/todo/personal/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            MedicoPaciente.findAll({
                where: {
                    es_empleado: true,
                    id_empresa: req.params.id_empresa
                }, include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }] }, { model: Persona, as: 'persona' }]
            }).then(function (personal) {
                res.json({ personal: personal })
            }).catch(function (err) {
                res.json({ personal: [], mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })


    router.route('/carga-horario-configuracion/:id_empresa?')
        .post(function (req, res) {
            req.body.forEach(function (x, i, a) {
                if (x.id != undefined) {
                    RrhhEmpresaCargaHorario.update({
                        id_carga_horario: x.cargaHorario.id,
                        hora_inicio: x.hora_inicio,
                        hora_fin: x.hora_fin,
                        usar_descanso: x.usar_descanso,
                        hora_inicio_descanso: x.hora_inicio_descanso,
                        hora_fin_descanso: x.hora_fin_descanso,
                        eliminado: x.eliminado
                    }, {
                        where: { id: x.id }
                    }).then(function (dato) {
                        if (i === (a.length - 1)) {
                            res.json({ mensaje: 'creado Satisfactoriamente!' })
                        }
                    })
                } else {
                    RrhhEmpresaCargaHorario.create({
                        id_carga_horario: x.cargaHorario.id,
                        hora_inicio: x.hora_inicio,
                        hora_fin: x.hora_fin,
                        usar_descanso: x.usar_descanso,
                        hora_inicio_descanso: x.hora_inicio_descanso,
                        hora_fin_descanso: x.hora_fin_descanso,
                        eliminado: x.eliminado
                    }).then(function (dato) {
                        if (i === (a.length - 1)) {
                            res.json({ mensaje: 'creado Satisfactoriamente!' })
                        }
                    })
                }
            })
        })

        .get(function (req, res) {
            RrhhEmpresaCargaHorario.findAll({
                where: { eliminado: false },
                include: [{ model: Clase, as: 'cargaHorario', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }] }]
            }).then(function (datos) {
                res.json(datos)
            })
        })
    router.route('/rrhh-contratos/familiar/:id_familiar')
        .post(function (req, res) {
            fs.writeFileSync('./documentos/rrhh/empleados-familiares/doc-' + req.params.id_familiar + "-" + req.body.name, req.body.data, 'binary', function (err) {
                if (err)
                    res.json(err);
                else
                    console.log("The file was saved!");
            });

            RrhhEmpleadoDocumentoFamiliar.create({
                id_familiar: req.params.id_familiar,
                nombre: req.body.name,
                fecha: req.body.fecha,
                eliminado: false,
                aceptado: false
            }).then(function (dato) {
                res.json({ mensaje: 'Documento registrado satisfactoria!' })
            })
        })
        .get(function (req, res) {
            RrhhEmpleadoDocumentoFamiliar.findAll({
                where: { id_familiar: req.params.id_familiar, eliminado: false },

            }).then(function (datos) {
                res.json(datos)
            })
        })

    router.route('/rrhh-familiar/documento')
        .put(function (req, res) {
            RrhhEmpleadoDocumentoFamiliar.update({
                eliminado: req.body.eliminado,
                aceptado: req.body.aceptado
            }, {
                where: { id: req.body.id }
            }).then(function (dato) {
                res.json({ mensaje: 'Actualizado satisfactoria!' })
            })
        })
    router.route('/rrhh-anular-prestamo-personal')
        .put(function (req, res) {
            RrhhEmpleadoPrestamo.update({
                eliminado: req.body.eliminado,
                observacion_eliminado: req.body.observacion_eliminado
            }, {
                where: { id: req.body.id }
            }).then(function (dato) {
                res.json({ mensaje: 'Actualizado satisfactoria!' })
            })
        })
    router.route('/rrhh-horas-extra-ordinarias/ficha/:id_ficha')
        .post(function (req, res) {
            if (req.body.id != undefined || req.body.id != null) {
                RrhhEmpleadoHoraExtraOrdinaria.update({
                    fecha: req.body.fecha2,
                    id_tipo: req.body.tipoHoraExtra.id,
                    horas: req.body.horas,
                    eliminado: false,
                    cerrado: false,
                }, {
                    where: { id: req.body.id }
                }).then(function (dato) {
                    res.json({ mensaje: 'Actualizado satisfactoria!' })
                })
            } else {
                RrhhEmpleadoHoraExtraOrdinaria.create({
                    id_ficha: req.params.id_ficha,
                    fecha: req.body.fecha2,
                    id_tipo: req.body.tipoHoraExtra.id,
                    horas: req.body.horas,
                    eliminado: false,
                    cerrado: false
                }).then(function (dato) {
                    res.json({ mensaje: 'Actualizado satisfactoria!' })
                })
            }
        })
        .put(function (req, res) {
            var fecha_cierre = null;
            if (req.body.fecha_cierre) {
                fecha_cierre = new Date(req.body.fecha_cierre); fecha_cierre.setHours(23, 59, 59, 0, 0)
            }
            RrhhEmpleadoHoraExtraOrdinaria.update({
                cerrado: req.body.cerrado,
                eliminado: req.body.eliminado,
                fecha_cierre: fecha_cierre
            }, {
                where: { id: req.body.id }
            }).then(function (dato) {
                res.json({ mensaje: 'Actualizado satisfactoria!' })
            })
        })
        .get(function (req, res) {
            RrhhEmpleadoHoraExtraOrdinaria.findAll({
                where: { id_ficha: req.params.id_ficha, eliminado: false },
                include: [{ model: Clase, as: 'tipoHoraExtra' }]
            }).then(function (datos) {
                res.json(datos)
            })
        })
















    /////////////////////////////////////////// Guardar evaluaciones

    router.route('/evaluacion/personal/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.eliminar) {
                EvaluacionPolifuncional.update({
                    eliminado: req.body.eliminado
                }, {
                    where: { id: req.body.id }
                }).then(function (evaluacionCreada) {
                    res.json({ mensaje: 'Evaluación eliminada correctamente!' })
                }).catch(function (err) {
                    res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
                });
            } else {
                EvaluacionPolifuncional.findOrCreate({
                    where: {
                        id_ficha: req.body.ficha.id,
                        anio: req.body.anio.id,
                        mes: req.body.mes.id,
                        id_empresa: req.params.id_empresa,
                        eliminado: false
                        // fecha: req.body.fecha,
                    },
                    include: [{
                        model: RrhhEmpleadoFicha, as: 'ficha',
                        include: [
                            {
                                model: MedicoPaciente, as: 'empleado', required: true, where: { id_empresa: req.params.id_empresa },
                                include: [{ model: Clase, as: 'campo' },{ model: Persona, as: 'persona' }]
                            },
                            {
                                model: RrhhEmpleadoCargo, as: 'cargos',
                                include: [{ model: Clase, as: 'cargo' }]
                            },
                        ],
                    }],
                    defaults: {
                        id_ficha: req.body.ficha.id,
                        anio: req.body.anio.id,
                        mes: req.body.mes.id,
                        fecha: req.body.fecha,
                        asistencia_capacitacion: req.body.asistencia_capacitacion,
                        documentos_actualizados: req.body.documentos_actualizados,
                        trabajo_equipo: req.body.trabajo_equipo,
                        funciones_puntualidad: req.body.funciones_puntualidad,
                        higiene_personal: req.body.higiene_personal,
                        asistencia_reunion: req.body.asistencia_reunion,
                        ingreso_campo: req.body.ingreso_campo,
                        llenado_formularios: req.body.llenado_formularios,
                        nota_total: req.body.nota_total,
                        id_desempenio: req.body.id_desempenio,
                        encargado: req.body.encargado,
                        eliminado: req.body.eliminado,
                        id_empresa: req.params.id_empresa
                    }
                }).spread(function (evaluacion, nueva) {
                    if (!nueva) {
                        res.json({ mensaje: 'Ya existe una evaluación de fecha ' + meses[evaluacion.mes].nombre + '-' + evaluacion.anio + ' para el empleado ' + evaluacion.empleado.persona.nombre_completo })
                    } else {
                        res.json({ mensaje: 'Evaluación Creada satisfactoriamente!' })
                    }

                }).catch(function (err) {
                    res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
                });
            }

        })
        .put(ensureAuthorizedlogged, function (req, res) {
            EvaluacionPolifuncional.update({
                id_ficha: req.body.ficha.id,
                anio: req.body.anio.id,
                mes: req.body.mes.id,
                fecha: req.body.fecha,
                asistencia_capacitacion: req.body.asistencia_capacitacion,
                documentos_actualizados: req.body.documentos_actualizados,
                trabajo_equipo: req.body.trabajo_equipo,
                funciones_puntualidad: req.body.funciones_puntualidad,
                higiene_personal: req.body.higiene_personal,
                asistencia_reunion: req.body.asistencia_reunion,
                ingreso_campo: req.body.ingreso_campo,
                llenado_formularios: req.body.llenado_formularios,
                nota_total: req.body.nota_total,
                id_desempenio: req.body.id_desempenio,
                encargado: req.body.encargado,
                eliminado: req.body.eliminado,
                id_empresa: req.params.id_empresa
            }, {
                where: { id: req.body.id }
            }).then(function (evaluacionCreada) {
                res.json({ mensaje: 'Evaluación modificada correctamente!' })
            }).catch(function (err) {
                res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    router.route('/evaluacion/personal/test/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFicha.findAll({
                limit: 1,
                include: [{
                    model: MedicoPaciente, as: 'empleado',
                    where: {
                        es_empleado: true,
                        id_empresa: req.params.id_empresa
                    }
                }],
                order: [["id", "asc"]]

            }).then(function (fichasEmpleados) {
                fichasEmpleados.map(function (ficha, i) {
                    EvaluacionPolifuncional.findOrCreate({
                        where: {
                            id_empleado: ficha.id,
                            anio: new Date().getFullYear(),
                            mes: new Date().getMonth() + 4,
                            id_empresa: req.params.id_empresa,
                            eliminado: false
                            // fecha: req.body.fecha
                        },
                        defaults: {
                            id_empleado: ficha.id,
                            anio: new Date().getFullYear(),
                            mes: new Date().getMonth() + 4,
                            fecha: new Date(),
                            asistencia_capacitacion: Math.floor((Math.random() * 10) + 1),
                            documentos_actualizados: Math.floor((Math.random() * 10) + 1),
                            trabajo_equipo: Math.floor((Math.random() * 10) + 1),
                            funciones_puntualidad: Math.floor((Math.random() * 10) + 1),
                            higiene_personal: Math.floor((Math.random() * 10) + 1),
                            asistencia_reunion: Math.floor((Math.random() * 10) + 1),
                            ingreso_campo: Math.floor((Math.random() * 10) + 1),
                            llenado_formularios: Math.floor((Math.random() * 10) + 1),
                            nota_total: 80,
                            id_desempenio: 8,
                            encargado: false,
                            eliminado: false,
                            id_empresa: req.params.id_empresa
                        }
                    }).spread(function (evaluacion, nueva) {
                        if (i === empleados.length - 1) {
                            res.json({ mensaje: 'Evaluación Creada satisfactoriamente!' })
                        }
                    }).catch(function (err) {
                        res.json({ mensaje: err.message !== undefined ? err.stack : err.message, hasErr: true })
                    });
                })
            })
        })

    /////////////////////////////////////////// configuraciones

    //////Configuracion Desempeño
    router.route('/desempenio/configuracion/:id_empresa/sufra')
        .post(ensureAuthorizedlogged, function (req, res) {
            var i = 0
            req.body.forEach(function (dato, i) {
                ConfiguracionDesempenioEvaluacionPolifuncional.findOrCreate({
                    where: {
                        id_empresa: req.params.id_empresa,
                        id: dato.id,
                        nombre: dato.nombre
                    },
                    defaults: {
                        id_empresa: req.params.id_empresa,
                        nombre: dato.nombre,
                        desde: dato.desde,
                        hasta: dato.hasta,
                        color: dato.color,
                        activo: dato.activo !== undefined && dato.activo !== null ? dato.activo : false
                    }
                }).spread(function (configuracion, created) {
                    if (created) {
                        if (i == req.body.length - 1) {
                            res.json({ mensaje: 'Configuración guardada correctamente!' })
                        }
                    } else {
                        ConfiguracionDesempenioEvaluacionPolifuncional.update({
                            id_empresa: req.params.id_empresa,
                            nombre: dato.nombre,
                            desde: dato.desde,
                            hasta: dato.hasta,
                            activo: dato.activo
                        }, {
                            where: {
                                id_empresa: req.params.id_empresa,
                                id: dato.id,
                                nombre: dato.nombre
                            }
                        }).then(function (configuracionActializada) {
                            if (i == req.body.length - 1) {
                                res.json({ mensaje: 'Configuracion Actualizada...' })
                            }
                        })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
                });
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            ConfiguracionDesempenioEvaluacionPolifuncional.findAll({
                where: {
                    id_empresa: req.params.id_empresa
                }
            }).then(function (configuracion) {
                res.json({ parametros: configuracion })
            }).catch(function (err) {
                res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    ///////Configuracion evaluacion
    router.route('/evaluacion/configuracion/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (obj, i) {
                ConfiguracionCalificacionEvaluacionPolifuncional.findOrCreate({
                    where: {
                        id: obj.id,
                        encargados: obj.encargados,
                        id_empresa: req.params.id_empresa
                    },
                    defaults: {
                        asistencia_capacitacion: obj.asistencia_capacitacion,
                        documentos_actualizados: obj.documentos_actualizados,
                        trabajo_equipo: obj.trabajo_equipo,
                        funciones_puntualidad: obj.funciones_puntualidad,
                        higiene_personal: obj.higiene_personal,
                        asistencia_reunion: obj.asistencia_reunion,
                        ingreso_campo: obj.ingreso_campo,
                        llenado_formularios: obj.llenado_formularios,
                        encargados: obj.encargados,
                        nota_total: obj.nota_total,
                        eliminado: obj.parametros !== undefined && obj.parametros !== null ? obj.parametros : false
                    }
                }).spread(function (configuracion, created) {
                    if (created) {
                        if (i == req.body.length - 1) {
                            res.json({ mensaje: 'Configuración registrada correctamente!' })
                        }
                    } else {
                        ConfiguracionCalificacionEvaluacionPolifuncional.update({
                            asistencia_capacitacion: obj.asistencia_capacitacion,
                            documentos_actualizados: obj.documentos_actualizados,
                            trabajo_equipo: obj.trabajo_equipo,
                            funciones_puntualidad: obj.funciones_puntualidad,
                            higiene_personal: obj.higiene_personal,
                            asistencia_reunion: obj.asistencia_reunion,
                            ingreso_campo: obj.ingreso_campo,
                            llenado_formularios: obj.llenado_formularios,
                            encargados: obj.encargados,
                            nota_total: obj.nota_total,
                            eliminado: obj.parametros !== undefined && obj.parametros !== null ? obj.parametros : false
                        }, {
                            where: {
                                id: obj.id,
                                encargados: obj.encargados,
                                id_empresa: req.params.id_empresa
                            }
                        }).then(function (configuracionActializada) {
                            if (i == req.body.length - 1) {
                                res.json({ mensaje: 'Actualizada registrada correctamente!' })
                            }
                        })
                    }
                    // i += 1
                }).catch(function (err) {
                    res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
                });
            })
            // var i = 0
            // for (var key in req.body) {
            //     ConfiguracionCalificacionEvaluacionPolifuncional.findOrCreate({
            //         where: {
            //             id: req.body[key].id,
            //             encargados: req.body[key].encargados,
            //             id_empresa: req.params.id_empresa
            //         },
            //         defaults: {
            //             asistencia_capacitacion: req.body[key].asistencia_capacitacion,
            //             documentos_actualizados: req.body[key].documentos_actualizados,
            //             trabajo_equipo: req.body[key].trabajo_equipo,
            //             funciones_puntualidad: req.body[key].funciones_puntualidad,
            //             higiene_personal: req.body[key].higiene_personal,
            //             asistencia_reunion: req.body[key].asistencia_reunion,
            //             ingreso_campo: req.body[key].ingreso_campo,
            //             llenado_formularios: req.body[key].llenado_formularios,
            //             encargados: req.body[key].encargados,
            //             nota_total: req.body[key].nota_total,
            //             eliminado: req.body[key].parametros !== undefined && req.body[key].parametros !== null ? req.body[key].parametros : false
            //         }
            //     }).spread(function (configuracion, created) {
            //         if (created) {
            //             if (i >= 1) {
            //                 res.json({ mensaje: 'Configuración registrada correctamente!' })
            //             }
            //         } else {
            //             ConfiguracionCalificacionEvaluacionPolifuncional.update({
            //                 asistencia_capacitacion: req.body[key].asistencia_capacitacion,
            //                 documentos_actualizados: req.body[key].documentos_actualizados,
            //                 trabajo_equipo: req.body[key].trabajo_equipo,
            //                 funciones_puntualidad: req.body[key].funciones_puntualidad,
            //                 higiene_personal: req.body[key].higiene_personal,
            //                 asistencia_reunion: req.body[key].asistencia_reunion,
            //                 ingreso_campo: req.body[key].ingreso_campo,
            //                 llenado_formularios: req.body[key].llenado_formularios,
            //                 encargados: req.body[key].encargados,
            //                 nota_total: req.body[key].nota_total,
            //                 eliminado: req.body[key].parametros !== undefined && req.body[key].parametros !== null ? req.body[key].parametros : false
            //             }, {
            //                     where: {
            //                         id: req.body[key].id,
            //                         encargados: req.body[key].encargados,
            //                         id_empresa: req.params.id_empresa
            //                     }
            //                 }).then(function (configuracionActializada) {
            //                     if (i >= 1) {
            //                         res.json({ mensaje: 'Actualizada registrada correctamente!' })
            //                     }
            //                 })
            //         }
            //         i += 1
            //     }).catch(function (err) {
            //         res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            //     });
            // }

        })
        .get(ensureAuthorizedlogged, function (req, res) {
            ConfiguracionCalificacionEvaluacionPolifuncional.findAll({
                where: { id_empresa: req.params.id_empresa }
            }).then(function (configuracion) {
                var configuraciones = {}
                for (var key in configuracion) {
                    if (configuracion[key].encargados) {
                        configuraciones.encargados = configuracion[key];
                    } else {
                        configuraciones.empleados = configuracion[key]
                    }
                }
                res.json({ configuracion: configuraciones })
            })
        })

    ///////////////////////////////////////////////Reporte por meses

    router.route('/reportes/:desde_mes/:desde_anio/:hasta_mes/:hasta_anio/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var desde = new Date(parseInt(req.params.desde_anio), parseInt(req.params.desde_mes), 1, 0, 0, 0)
            var hasta = new Date(parseInt(req.params.hasta_anio), parseInt(req.params.hasta_mes) + 1, 0, 23, 59, 0)
            var condicion = { fecha: { $between: [desde, hasta] }, eliminado: false }
            RrhhEmpleadoFicha.findAll({
                include: [
                    {
                        model: EvaluacionPolifuncional, as: 'evaluaciones',
                        where: condicion, order: [['fecha', 'asc']], required: true
                    },
                    {
                        model: MedicoPaciente, as: 'empleado',
                        where: {
                            es_empleado: true,
                            id_empresa: req.params.id_empresa
                        }, include: [{ model: Clase, as: 'campo' },{ model: Persona, as: 'persona' }]
                    },
                    {
                        model: RrhhEmpleadoCargo, as: 'cargos',
                        include: [{ model: Clase, as: 'cargo' }]
                    }],
                order: [[{ model: EvaluacionPolifuncional, as: 'evaluaciones' }, 'fecha', 'asc']]

            }).then(function (reporteEvaluaciones) {
                var evaluaciones = []
                var mesesReporte = []
                reporteEvaluaciones.forEach(function (ficha) {
                    ficha.evaluaciones.forEach(function (evaluacion) {
                        var fechatexto = meses[evaluacion.mes].nombre.substring(0, 3) + '-' + (evaluacion.anio).toString().substring(4, 2)
                        var mesAnio = { texto: fechatexto, fecha: evaluacion.fecha }
                        var existe = mesesReporte.indexOf(mesAnio)
                        if (existe < 0) {
                            mesesReporte.push(mesAnio)
                        }
                    })
                })
                mesesReporte.sort(function compare(a, b) {
                    var aDate = new Date(a.fecha)
                    var bDate = new Date(b.fecha)
                    return aDate - bDate;
                })
                var mesesAnio = mesesReporte.map(function (fecha) {
                    return fecha.texto
                })
                var mesesEnviar = []
                mesesAnio.forEach(function (fecha) {
                    var esta = mesesEnviar.indexOf(fecha)
                    if (esta < 0) {
                        mesesEnviar.push(fecha)
                    }
                })
                res.json({ reporte: reporteEvaluaciones, mesesReporte: mesesEnviar })
            }).catch(function (err) {
                res.json({ reporte: [], mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    ////////////////////////////////////////////////////// Promedios anuales de campos

    router.route('/reportes/anual/:anio/campos/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionCampo = {}
            EvaluacionPolifuncional.findAll({
                where: { anio: req.params.anio },
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [
                        {
                            model: MedicoPaciente, as: 'empleado', required: true,
                            where: { id_empresa: req.params.id_empresa },
                            include: [{ model: Clase, as: 'campo' },{ model: Persona, as: 'persona' }]
                        },
                        {
                            model: RrhhEmpleadoCargo, as: 'cargos',
                            include: [{ model: Clase, as: 'cargo' }]
                        },
                    ],
                }],
                order: [[{ model: MedicoPaciente, as: 'empleado' }, 'campo', 'asc']]
            }).then(function (evaluaciones) {
                var reportesCampos = []
                var reporteAnual = []
                evaluaciones.forEach(function (evaluacion) {
                    var reporte = {
                        campo: evaluacion.empleado.campo,
                        asistencia_capacitacion: evaluacion.asistencia_capacitacion,
                        documentos_actualizados: evaluacion.documentos_actualizados,
                        trabajo_equipo: evaluacion.trabajo_equipo,
                        funciones_puntualidad: evaluacion.funciones_puntualidad,
                        higiene_personal: evaluacion.higiene_personal,
                        asistencia_reunion: evaluacion.asistencia_reunion,
                        ingreso_campo: evaluacion.ingreso_campo,
                        llenado_formularios: evaluacion.llenado_formularios,
                        count: 1
                    }
                    reportesCampos.push(reporte)
                })
                while (reportesCampos.length > 0) {
                    if (reporteAnual.length == 0) {
                        reporteAnual.push(reportesCampos.pop())
                    } else {
                        var reporteCampo = reportesCampos.pop()
                        var indx = -1
                        var existe = reporteAnual.some(function (reporte, i) {
                            indx = i
                            return reporte.campo.nombre_corto == reporteCampo.campo.nombre_corto
                        })
                        if (existe) {
                            reporteAnual[indx].asistencia_capacitacion += reporteCampo.asistencia_capacitacion
                            reporteAnual[indx].documentos_actualizados += reporteCampo.documentos_actualizados
                            reporteAnual[indx].trabajo_equipo += reporteCampo.trabajo_equipo
                            reporteAnual[indx].funciones_puntualidad += reporteCampo.funciones_puntualidad
                            reporteAnual[indx].higiene_personal += reporteCampo.higiene_personal
                            reporteAnual[indx].asistencia_reunion += reporteCampo.asistencia_reunion
                            reporteAnual[indx].ingreso_campo += reporteCampo.ingreso_campo
                            reporteAnual[indx].llenado_formularios += reporteCampo.llenado_formularios
                            reporteAnual[indx].count += 1
                        } else {
                            reporteAnual.push(reporteCampo)
                        }
                    }
                }
                if (reporteAnual.length > 0) {
                    reporteAnual.forEach(function (campo, i) {
                        campo.asistencia_capacitacion = campo.asistencia_capacitacion / campo.count
                        campo.documentos_actualizados = campo.documentos_actualizados / campo.count
                        campo.trabajo_equipo = campo.trabajo_equipo / campo.count
                        campo.funciones_puntualidad = campo.funciones_puntualidad / campo.count
                        campo.higiene_personal = campo.higiene_personal / campo.count
                        campo.asistencia_reunion = campo.asistencia_reunion / campo.count
                        campo.ingreso_campo = campo.ingreso_campo / campo.count
                        campo.llenado_formularios = campo.llenado_formularios / campo.count
                        campo.total = campo.asistencia_capacitacion + campo.documentos_actualizados + campo.trabajo_equipo + campo.funciones_puntualidad + campo.higiene_personal + campo.asistencia_reunion + campo.ingreso_campo + campo.llenado_formularios
                        if (i == reporteAnual.length - 1) {
                            res.json({ reporte: reporteAnual })
                        }
                    })
                } else {
                    res.json({ reporte: [], mensaje: 'No existen datos.' })
                }

            }).catch(function (err) {
                res.json({ reporte: [], mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    // =================== ruta hijos empleado =====
    router.route('/recursos-humanos-hijo/empleado/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFichaFamiliar.findAll({
                where: { id_empleado: req.params.id_empleado },
                include: [{ model: Clase, as: 'relacion' }, {
                    model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }]
                }]
            }).then(function (FamiliaresEncontrados) {
                res.json(FamiliaresEncontrados);
            });
        })
    // =================== ruta existe empleado ci =====
    router.route('/validar/empleado/empresa/:id_empresa/texto/:texto')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionPersona = {
                ci: req.params.texto
            };

            MedicoPaciente.findAll({
                where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                include: [{ model: Persona, as: 'persona', where: condicionPersona }]
            }).then(function (empleadosEncontrado) {
                res.json(empleadosEncontrado);
            });
        });

    ////////////////////////////////////////////////////////////////Reporte Anual de campo

    router.route('/reportes/anual/:anio/:campo/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionCampo = {}
            EvaluacionPolifuncional.findAll({
                where: { anio: req.params.anio },
                include: [{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [
                        {
                            model: MedicoPaciente, as: 'empleado', required: true,
                            where: { id_empresa: req.params.id_empresa, id_campo: req.params.campo },
                            include: [{ model: Clase, as: 'campo' },{ model: Persona, as: 'persona' }]
                        },
                        {
                            model: RrhhEmpleadoCargo, as: 'cargos',
                            include: [{ model: Clase, as: 'cargo' }]
                        },
                    ],
                }],
                order: [['mes', 'DESC']]
            }).then(function (evaluaciones) {
                var reportesCampo = []
                var reporteAnual = []
                evaluaciones.forEach(function (evaluacion) {
                    var reporte = {
                        mes: evaluacion.mes,
                        asistencia_capacitacion: evaluacion.asistencia_capacitacion,
                        documentos_actualizados: evaluacion.documentos_actualizados,
                        trabajo_equipo: evaluacion.trabajo_equipo,
                        funciones_puntualidad: evaluacion.funciones_puntualidad,
                        higiene_personal: evaluacion.higiene_personal,
                        asistencia_reunion: evaluacion.asistencia_reunion,
                        ingreso_campo: evaluacion.ingreso_campo,
                        llenado_formularios: evaluacion.llenado_formularios,
                        count: 1
                    }
                    reportesCampo.push(reporte)
                })
                while (reportesCampo.length > 0) {
                    if (reporteAnual.length == 0) {
                        reporteAnual.push(reportesCampo.pop())
                    } else {
                        var reporteCampo = reportesCampo.pop()
                        var indx = -1
                        var existe = reporteAnual.some(function (reporte, i) {
                            indx = i
                            return reporte.mes == reporteCampo.mes
                        })
                        if (existe) {
                            reporteAnual[indx].asistencia_capacitacion += reporteCampo.asistencia_capacitacion
                            reporteAnual[indx].documentos_actualizados += reporteCampo.documentos_actualizados
                            reporteAnual[indx].trabajo_equipo += reporteCampo.trabajo_equipo
                            reporteAnual[indx].funciones_puntualidad += reporteCampo.funciones_puntualidad
                            reporteAnual[indx].higiene_personal += reporteCampo.higiene_personal
                            reporteAnual[indx].asistencia_reunion += reporteCampo.asistencia_reunion
                            reporteAnual[indx].ingreso_campo += reporteCampo.ingreso_campo
                            reporteAnual[indx].llenado_formularios += reporteCampo.llenado_formularios
                            reporteAnual[indx].count += 1
                        } else {
                            reporteAnual.push(reporteCampo)
                        }
                    }
                }
                if (reporteAnual.length > 0) {
                    reporteAnual.forEach(function (campo, i) {
                        campo.asistencia_capacitacion = campo.asistencia_capacitacion / campo.count
                        campo.documentos_actualizados = campo.documentos_actualizados / campo.count
                        campo.trabajo_equipo = campo.trabajo_equipo / campo.count
                        campo.funciones_puntualidad = campo.funciones_puntualidad / campo.count
                        campo.higiene_personal = campo.higiene_personal / campo.count
                        campo.asistencia_reunion = campo.asistencia_reunion / campo.count
                        campo.ingreso_campo = campo.ingreso_campo / campo.count
                        campo.llenado_formularios = campo.llenado_formularios / campo.count
                        campo.total = campo.asistencia_capacitacion + campo.documentos_actualizados + campo.trabajo_equipo + campo.funciones_puntualidad + campo.higiene_personal + campo.asistencia_reunion + campo.ingreso_campo + campo.llenado_formularios
                        if (i == reporteAnual.length - 1) {
                            res.json({ reporte: reporteAnual })
                        }
                    })
                } else {
                    res.json({ reporte: [], mensaje: 'No existen datos.' })
                }
            }).catch(function (err) {
                res.json({ reporte: [], mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
        })

    ///////////////////////////////////////////////////// FIN RUTAS POLIFUNCIONAL /////////////////////////////////////////////////////    
    function guardarClaseHojaVida(nombre, tipo, t) {
        return Clase.findOrCreate({
            where: {
                nombre: nombre,
                id_tipo: tipo.id,
            },

            defaults: {
                id_tipo: tipo.id,
                nombre: nombre,
                nombre_corto: nombre,
                habilitado: true,
                eliminado: false

            }, transaction: t
        }).spread(function (conceptoCreado, created) {
            return new Promise(function (fulfill, reject) {
                fulfill()
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    router.route('/recursos-humanos/importacion/conceptos-hojas-de-vida/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
            let tipoGradoAcademico = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_GRA'
                }
            })
            let tipoTitulo = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TITL'
                }
            })
            let tipoInstitucion = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_INST'
                }
            })
            let tipoCapacitacion = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TCIE'
                }
            })
            let tipoLogro = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TLIE'
                }
            })
            sequelize.transaction(function (t) {
                let promises = []
                if (req.body.conceptosArray.gradosAcademicos.length > 0) {
                    for (const gradoAcademico of req.body.conceptosArray.gradosAcademicos) {
                        promises.push(guardarClaseHojaVida(gradoAcademico, tipoGradoAcademico, t))
                    }
                }
                if (req.body.conceptosArray.Instituciones.length > 0) {
                    for (const institucion of req.body.conceptosArray.Instituciones) {
                        promises.push(guardarClaseHojaVida(institucion, tipoInstitucion, t))
                    }
                }
                if (req.body.conceptosArray.titulos.length > 0) {
                    for (const titulo of req.body.conceptosArray.titulos) {
                        promises.push(guardarClaseHojaVida(titulo, tipoTitulo, t))
                    }
                }
                if (req.body.conceptosArray.logros.length > 0) {
                    for (const logro of req.body.conceptosArray.logros) {
                        promises.push(guardarClaseHojaVida(logro, tipoLogro, t))
                    }
                }
                if (req.body.conceptosArray.hojasVidaEmpleados.length > 0) {
                    for (const codigo of req.body.conceptosArray.hojasVidaEmpleados) {
                        promises.push(MedicoPaciente.find({
                            where: {
                                codigo: codigo,
                                id_empresa: req.params.id_empresa
                            }, transaction: t
                        }).then(function (empleadosEncontrado) {
                            RrhhEmpleadoHojaVida.findOrCreate({
                                where: { id_empleado: empleadosEncontrado.id },
                                defaults: { id_empleado: empleadosEncontrado.id }, transaction: t
                            }).spread(function (HojaVida, created) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill()
                                });
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

                    }
                }
                return Promise.all(promises)
            }).then(function (result) {
                res.json({ mensaje: "Creado Satisfactoriamente!", guardado: true })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });
        })
    function obtenerTipoHV(nombre, id_tipo, t) {
        return Clase.find({
            where: { nombre: nombre, id_tipo: id_tipo }, transaction: t
        }).then(function (dato) {
            return new Promise(function (fulfill, reject) {
                fulfill(dato)
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    function obtenerHojaVidaRRHH(codigo, id_empresa, t) {
        return MedicoPaciente.find({
            where: {
                codigo: codigo,
                id_empresa: id_empresa
            }, transaction: t
        }).then(function (empleadosEncontrado) {
            return RrhhEmpleadoHojaVida.find({
                where: { id_empleado: empleadosEncontrado.id }, transaction: t
            }).then(function (HojaVida) {
                return new Promise(function (fulfill, reject) {
                    fulfill(HojaVida)
                });
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
    }
    router.route('/recursos-humanos/importacion/hojas-de-vida/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
            let tipoGradoAcademico = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_GRA'
                }
            })
            let tipoTitulo = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TITL'
                }
            })
            let tipoInstitucion = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_INST'
                }
            })
            let tipoCapacitacion = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TCIE'
                }
            })
            let tipoLogro = await Tipo.find({
                where: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto: 'RRHH_TLIE'
                }
            })
            sequelize.transaction(async function (t) {
                let promises = []
                for (const formacionAcademica of req.body.hojasDeVida.formacionesAcademicas) {
                    let grado = await obtenerTipoHV(formacionAcademica.gradoAcademico, tipoGradoAcademico.id, t)
                    let titulo = await obtenerTipoHV(formacionAcademica.titulo, tipoTitulo.id, t)
                    let institucion = await obtenerTipoHV(formacionAcademica.institucion, tipoInstitucion.id, t)
                    let hojaVidaEmpleado = await obtenerHojaVidaRRHH(formacionAcademica.codigo, req.params.id_empresa, t)
                    promises.push(RrhhEmpleadoFormacionAcademica.findOrCreate({
                        where: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_grado: grado.id,
                            id_titulo: titulo.id,
                            id_institucion: institucion.id,
                            anio_obtencion: formacionAcademica.anioObtenido
                        },
                        defaults: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_grado: grado.id,
                            id_titulo: titulo.id,
                            id_institucion: institucion.id,
                            descripcion: formacionAcademica.descripcion,
                            anio_obtencion: formacionAcademica.anioObtenido
                        }, transaction: t
                    }).spread(function (formacion, created) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))
                }

                for (const experienciaLaboral of req.body.hojasDeVida.experienciasLaborales) {
                    let hojaVidaEmpleado = await obtenerHojaVidaRRHH(experienciaLaboral.codigo, req.params.id_empresa, t)
                    promises.push(RrhhEmpleadoExperienciaLaboral.findOrCreate({
                        where: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            fecha_inicio: experienciaLaboral.fecha_inicio,
                            fecha_fin: experienciaLaboral.fecha_fin,
                            empresa: experienciaLaboral.empresa,
                            cargo: experienciaLaboral.cargo
                        },
                        defaults: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            fecha_inicio: experienciaLaboral.fecha_inicio,
                            fecha_fin: experienciaLaboral.fecha_fin,
                            empresa: experienciaLaboral.empresa,
                            cargo: experienciaLaboral.cargo,
                            motivo_retiro: experienciaLaboral.motivo_retiro,
                            contacto: experienciaLaboral.contacto,
                            telefono: experienciaLaboral.telefono
                        }
                    }).spread(function (experiencia, created) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))
                }
                for (const capacidad of req.body.hojasDeVida.capacitaciones) {
                    let hojaVidaEmpleado = await obtenerHojaVidaRRHH(capacidad.codigo, req.params.id_empresa, t)
                    promises.push(RrhhEmpleadoCapacidadInternaExterna.findOrCreate({
                        where: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_tipo_capacidad: capacidad.tipo.id,
                            curso: capacidad.curso,
                            institucion: capacidad.institucion,
                        },
                        defaults: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_tipo_capacidad: capacidad.tipo.id,
                            curso: capacidad.curso,
                            institucion: capacidad.institucion,
                            certificado: capacidad.certificado,
                            fecha: capacidad.fecha,
                        }
                    }).spread(function (capacidadCreada, created) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))
                }
                for (const logro of req.body.hojasDeVida.logros) {
                    let tipo = await obtenerTipoHV(logro.tipo, tipoLogro.id, t)
                    let hojaVidaEmpleado = await obtenerHojaVidaRRHH(logro.codigo, req.params.id_empresa, t)
                    promises.push(RrhhEmpleadoLogroInternoExterno.findOrCreate({
                        where: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_tipo_logro: tipo.id,
                            institucion: logro.institucion,
                            fecha: logro.fecha
                        },
                        defaults: {
                            id_hoja_vida: hojaVidaEmpleado.id,
                            id_tipo_logro: tipo.id,
                            motivo: logro.motivo,
                            institucion: logro.institucion,
                            observacion: logro.observacion,
                            fecha: logro.fecha,
                        }
                    }).spread(function (logroCreada, created) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))
                }
                return Promise.all(promises)
            }).then(function (result) {
                res.json({ mensaje: "Creado Satisfactoriamente!", numero: req.bod })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });
        })
    //bitacora de cambios ficha
    function guardarBitacoraCambiosFicha(t, fichaAnterior, empleado, req, res) {
        req.body.fichaAnterior = fichaAnterior
        return new Promise(function (fulfill, reject) {
            fulfill();
        });
    }

    //rutas importacion vacaciones
    router.route('/recursos-humanos/importacion/vacaciones/empleado/:id_usuario/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            let errors = [];
            let promises = [];
            RrhhEmpleadoConfiguracionVacacion.findAll({

            }).then(function (configuracionVacaciones) {
                RrhhFeriado.findAll({
                    where: { id_empresa: req.params.id_empresa }
                }).then(function (feriados) {
                    sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED }, (transaction) => {
                        for (let index = 0; index < req.body.vacaciones.length; index++) {
                            req.body.vacaciones[index].id_usuario = req.params.id_usuario;
                            req.body.vacaciones[index].id_empresa = req.params.id_empresa;
                            req.body.vacaciones[index].domingos = 0;
                            req.body.vacaciones[index].sabados = 0;
                            req.body.vacaciones[index].feriados = 0;
                            req.body.vacaciones[index].feriadoslst = feriados;
                            req.body.vacaciones[index].inicio_tipo = 1;
                            req.body.vacaciones[index].fin_tipo = 1;
                            req.body.vacaciones[index].dias = 0;
                            req.body.vacaciones[index].configuracionVacaciones = configuracionVacaciones;
                            req.body.vacaciones[index].sabado = req.body.vacaciones[index].sabado.toLowerCase() === 'no' ? false : true;
                            promises.push(verificarVacacion(req.body.vacaciones[index], transaction));
                        }
                        return Promise.all(promises);
                    }).then((result) => {
                        let mensajes = [];
                        if (result.length > 0) {
                            for (let index = 0; index < result.length; index++) {
                                if (result[index] !== undefined) {
                                    if (result[index].hasErr) {
                                        mensajes.push(result[index].mensaje);
                                    }
                                }
                            }
                            if (mensajes.length === result.length) {
                                res.json({ hasErr: true, mensaje: "<strong class='red'>" + 'No se guardo:' + mensajes.length + ' registros...' + '</strong><br/>', mensajes: mensajes });
                            } else if (mensajes.length === 0) {
                                res.json({ mensaje: 'Guardado correctamente.', mensajes: [] });
                            } else {
                                mensajes.unshift("<strong class='green'>" + '<br/>Cantidad guardados correctamente: ' + (result.length - mensajes.length) + '</strong>' + "<strong class='red'>" + ' <br />Cantidad no guardados: ' + mensajes.length + ' <br />');
                                res.json({ hasErr: true, mensaje: 'Con errores...', mensajes: mensajes });
                            }
                        } else {
                            res.json({ mensaje: "<strong class='red'>" + 'No se guardo, ocurrió un error. No existen detalles sobre el error.' + '</strong><br />', hasErr: true, mensajes: [] });
                        }
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, hasErr: true, mensajes: [] });
                    })
                }).catch(function (err) {
                    res.json({ mensaje: "<strong class='red'>No se guardo, ocurrió el siguiente error.</strong><br />" + err.stack, hasErr: true, mensajes: [] });
                })
            }).catch(function (err) {
                res.json({ mensaje: "<strong class='red'>No se guardo, ocurrió el siguiente error.</strong><br />" + err.stack, hasErr: true, mensajes: [] });
            })
        })

    function verificarVacacion(vacacion, transaction) {
        return MedicoPaciente.find({
            where: { codigo: vacacion.codigo_empleado.trim(), es_empleado: true, eliminado: false },
            attributes: ['id', 'codigo', 'regularizado', 'id_persona'],
            include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, attributes: ['id', 'fecha', 'fecha_inicio', 'activo'], required: false }, { model: Persona, as: 'persona', attributes: ['id', 'nombre_completo'] }],
            transaction: transaction
        }).then((empleado) => {
            if (empleado) {
                if (empleado.empleadosFichas.length > 0) {
                    let ficha = empleado.empleadosFichas[0];
                    let fechaActual = new Date();
                    let fechaAnterior = new Date(ficha.fecha_inicio);
                    let antiguedad = calculateAge(ficha.fecha_inicio);
                    let calculosVacacion = CalcularDiferenciaDiasVacaciones(vacacion, vacacion.feriadoslst);
                    return RrhhEmpleadoHistorialVacacion.findAll({
                        where: { id_ficha: empleado.empleadosFichas[0].id, eliminado: false },
                        transaction: transaction
                    }).then(function (historialVacaciones) {
                        let diasEmpleado = diferenciaEntreDiasEnDias(fechaAnterior, fechaActual);
                        let años = Math.floor(diasEmpleado / 365);
                        vacacion.aniosDisponibles = años;
                        vacacion.historial = historialVacaciones;
                        vacacion.diasDisponibles = 0;
                        for (let index = 0; index < historialVacaciones.length; index++) {
                            if (historialVacaciones[index].anio <= años) {
                                vacacion.diasDisponibles += (historialVacaciones[index].aplicadas - historialVacaciones[index].tomadas);
                            }
                        }
                        if (historialVacaciones[(historialVacaciones.length - 1)].gestion < fechaActual.getFullYear()) {
                            //Verificar si la última gestión del historial para crear uno nuevo si la ultima es de un año anterior al actual.
                            let anioConfiguracion = historialVacaciones[(historialVacaciones.length - 1)].anio + 1;
                            let config = 0;
                            let gestion = fechaActual.getFullYear();
                            if (anioConfiguracion <= 5) {
                                config = vacacion.configuracionesVacacion[0].dias;
                            } else if (anioConfiguracion <= 10) {
                                config = vacacion.configuracionesVacacion[1].dias;
                            } else if (anioConfiguracion > 10) {
                                config = vacacion.configuracionesVacacion[2].dias;
                            }
                            let historialVacacion = {
                                gestion: gestion,
                                anio: anioConfiguracion,
                                aplicadas: config,
                                tomadas: 0
                            }
                            return RrhhEmpleadoHistorialVacacion.create({
                                aplicadas: historialVacacion.aplicadas,
                                tomadas: historialVacacion.tomadas,
                                anio: historialVacacion.anio,
                                gestion: historialVacacion.gestion,
                                id_ficha: ficha.id,
                                eliminado: false
                            }, {
                                where: { id_empleado: empleado.id },
                                transaction: transaction
                            }).then(function (params) {
                                if (antiguedad >= 1) {
                                    if (Number.isInteger(parseInt(vacacion.dias_previstos))) {
                                        if (calculosVacacion.hasErr) {
                                            return { hasErr: true, mensaje: 'Ocurrió un error al cálcular días de descuento (domingos y feriados), línea ' + calculosVacacion.vacacion.row + ' archivo Excel, código: ' + vacacion.vacacion.codigoEmpleado + '. Detalles del error ' + calculosVacacion.vacacion.mensaje + '<br />' }
                                        }
                                        if (calculosVacacion.dias === parseInt(calculosVacacion.dias_previstos)) {
                                            if (vacacion.dias <= vacacion.diasDisponibles) {
                                                return guardarImportacionVacaciones(empleado, calculosVacacion, transaction);
                                            }
                                            return { hasErr: true, mensaje: "El empleado solo cuenta con " + vacacion.diasDisponibles + " dias disponbles para asignar vacaciones" };
                                        } else {
                                            return { hasErr: true, mensaje: 'Inconsistencia de datos: La cantidad de (la columna) días y la diferencia de días entre fechas no concuerda, línea ' + calculosVacacion.row + ' archivo Excel, código:' + calculosVacacion.codigo_empleado + '<br />' };
                                        }
                                    } else {
                                        return { hasErr: true, mensaje: 'Inconsistencia de datos: El valor de (la columna) días no parece ser un número entero, línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                                    }
                                } else {
                                    return { hasErr: true, mensaje: 'Empleado ' + empleado.persona.nombre_completo + ' no cuenta con antiguedad necesaria. Línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                                }
                            }).catch(function (err) {
                                return { mensaje: "<strong class='red'>Historial de empleado " + empleado.persona.nombre_completo + ", ocurrió el siguiente error.</strong><br />" + err.stack, hasErr: true }
                            })
                        } else {
                            if (antiguedad >= 1) {
                                if (Number.isInteger(parseInt(vacacion.dias_previstos))) {
                                    if (calculosVacacion.hasErr) {
                                        return { hasErr: true, mensaje: 'Ocurrió un error al cálcular días de descuento (domingos y feriados), línea ' + calculosVacacion.vacacion.row + ' archivo Excel, código: ' + vacacion.vacacion.codigoEmpleado + '. Detalles del error ' + calculosVacacion.vacacion.mensaje + '<br />' }
                                    }
                                    if (calculosVacacion.dias === parseInt(calculosVacacion.dias_previstos)) {
                                        if (vacacion.dias <= vacacion.diasDisponibles) {
                                            return guardarImportacionVacaciones(empleado, calculosVacacion, transaction);
                                        }
                                        return { hasErr: true, mensaje: "El empleado solo cuenta con " + vacacion.diasDisponibles + " dias disponbles para asignar vacaciones" };
                                    } else {
                                        return { hasErr: true, mensaje: 'Inconsistencia de datos: La cantidad de (la columna) días y la diferencia de días entre fechas no concuerda, línea ' + calculosVacacion.row + ' archivo Excel, código:' + calculosVacacion.codigo_empleado + '<br />' };
                                    }
                                } else {
                                    return { hasErr: true, mensaje: 'Inconsistencia de datos: El valor de (la columna) días no parece ser un número entero, línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                                }
                            } else {
                                return { hasErr: true, mensaje: 'Empleado ' + empleado.persona.nombre_completo + ' no cuenta con antiguedad necesaria. Línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                            }
                        }
                    }).catch((err) => {
                        return { hasErr: true, mensaje: 'Error al obtener el historial. Línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                    })
                } else {
                    return { hasErr: true, mensaje: 'Ficha activa de empleado ' + empleado.persona.nombre_completo + ' no encontrada. Línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
                }
            } else {
                return { hasErr: true, mensaje: 'Empleado no encontrado. Línea ' + vacacion.row + ' archivo Excel, código:' + vacacion.codigo_empleado + '<br />' }
            }
        }).catch(function (err) {
            return { mensaje: err.stack, hasErr: true }
        })
    }

    function fecha_excel_angular(fecha_desde_excel) {
        var fecha_minima_angular_indice_excel_1970 = 25569 - 1 //fecha minima angular. el -1 es para ajustar que el resultado que daba 1 anterior a la fecha real.
        var fecha_excel = new Date(1 / 1 / 1970)
        var diferencia_de_fecha = fecha_desde_excel - fecha_minima_angular_indice_excel_1970
        return fecha_excel.setTime(fecha_excel.getTime() + diferencia_de_fecha * 86400000)
    }

    function CalcularDiferenciaDiasVacaciones(vacacion, feriados) {
        // return new Promise((f, r) => {
        try {
            if (vacacion.fecha_inicio && vacacion.fecha_fin) {
                let fechaInicio = new Date(vacacion.fecha_inicio);
                let fechaFin = new Date(vacacion.fecha_fin);
                let cantidadDias = diferenciaEntreDiasEnDias(fechaInicio, fechaFin);
                cantidadDias += 1
                let dateRange = getDaysArray(vacacion.fecha_inicio, vacacion.fecha_fin);
                vacacion.aniosDisponibles = Math.floor(cantidadDias / 365)
                for (let index = 0; index < dateRange.length; index++) {
                    let dia = new Date(dateRange[index]).getDay();
                    if (vacacion.sabado) {
                        if (dia === 0) {
                            vacacion.domingos += 1;
                        }
                        // let diaEsFeriado = feriados.indexOf(dateRange[index]);
                        let diaEsFeriado = feriados.filter((feriado) => (feriado.fecha_incio <= dateRange[index] && feriado.fecha_fin >= dateRange[index]))
                        if (diaEsFeriado.length) {
                            vacacion.feriados += 1;
                        }
                    } else {
                        if (dia === 0) {
                            vacacion.domingos += 1;
                        }
                        if ((dia == 6)) {
                            vacacion.sabados += 1;
                        }
                        // let diaEsFeriado = feriados.indexOf(dateRange[index]);
                        let diaEsFeriado = feriados.filter((feriado) => (feriado.fecha_incio <= dateRange[index] && feriado.fecha_fin >= dateRange[index]))
                        if (diaEsFeriado.length) {
                            vacacion.feriados += 1;
                        }
                    }
                }
                // if (cantidadDias == 0) {
                //     cantidadDias = 1;
                // }
                if (vacacion.sabado) {
                    vacacion.dias = (cantidadDias) - (vacacion.feriados + vacacion.domingos);
                } else {
                    vacacion.dias = (cantidadDias) - (vacacion.feriados + vacacion.domingos + vacacion.sabados);
                }
                if (!vacacion.inicio_tipo && !vacacion.fin_tipo) {
                    vacacion.dias = vacacion.dias - 1;
                } else if (vacacion.inicio_tipo && !vacacion.fin_tipo) {
                    vacacion.dias = vacacion.dias - 0.5;
                } else if (!vacacion.inicio_tipo && vacacion.fin_tipo) {
                    vacacion.dias = vacacion.dias - 0.5;
                } else if (vacacion.inicio_tipo && vacacion.fin_tipo) {
                    vacacion.dias = vacacion.dias;
                }
                let fechaRer = new Date(new Date().setTime(new Date(vacacion.fecha_fin).getTime() + 1000 * 60 * 60 * 24));
                if (fechaRer.getDay() === 0) {
                    fechaRer.setDate(fechaRer.getDate() + 1)
                }
                vacacion.fecha_Retorno = (!vacacion.fin_tipo) ? vacacion.fecha_fin : new Date(fechaRer);
                vacacion.dias_reales = cantidadDias;
                return vacacion;
            } else {
                return { hasErr: true, mensaje: 'ERROR DE FECHAS, FECHAS NO SON CONFIABLES...', vacacion: vacacion }
            }
        } catch (error) {
            return { hasErr: true, mensaje: error.stack, vacacion: vacacion };
        }
    }

    function diferenciaEntreDiasEnDias(a, b) {
        var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
    }

    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function guardarImportacionVacaciones(empleado, vacacion, transaction) {
        // return RrhhEmpleadoHistorialVacacion.findAll({
        //     where: { id_ficha: empleado.empleadosFichas[0].id },
        //     transaction: transaction
        // }).then((historial) => {
        return RrhhEmpleadoVacaciones.create({
            id_usuario: vacacion.id_usuario,
            id_ficha: empleado.empleadosFichas[0].id,
            fecha_inicio: vacacion.fecha_inicio,
            fecha_fin: vacacion.fecha_fin,
            observacion: vacacion.observacion,
            dias: vacacion.dias,
            sabado: vacacion.sabado,
            inicio_tipo: 1,
            fin_tipo: 1,
            eliminado: false,
            domingos: vacacion.domingos,
            feriados: vacacion.feriados,
            fecha_creacion: vacacion.fecha_creacion
        }, { transaction: transaction }).then(function (VacacionCreada) {
            let gestiones = "";
            let promises = []
            for (let index = 0; index < vacacion.historial.length; index++) {
                if (vacacion.historial[index].anio <= vacacion.aniosDisponibles) {
                    var restante = vacacion.historial[index].aplicadas - vacacion.historial[index].tomadas
                    if (restante != 0) {
                        var tomadas = 0
                        if (vacacion.dias >= restante) {
                            vacacion.dias = vacacion.dias - restante
                            tomadas = restante + vacacion.historial[index].tomadas
                        } else {
                            tomadas = vacacion.dias + vacacion.historial[index].tomadas
                            vacacion.dias = 0
                        }
                        if (tomadas != 0) {
                            restantes = (vacacion.historial[index].aplicadas - tomadas) + " días de la gestión " + vacacion.historial[index].gestion + "-" + (vacacion.historial[index].gestion + 1)
                            gestiones += vacacion.historial[index].gestion + "-" + (vacacion.historial[index].gestion + 1) + ", "
                            promises.push(actualizarHistorialVacaciones(vacacion.historial[index], VacacionCreada, tomadas, transaction))
                        }
                    }
                }
            }
            return Promise.all(promises)
        }).catch((err) => {
            if (err.name === "SequelizeUniqueConstraintError") {
                return new Promise(function (fullfil, reject) {
                    fullfil({ mensaje: 'Registro ya existente: Error al crear el registro de vacación para ' + empleado.persona.nombre_completo + ', Línea ' + vacacion.row + ' archivo Excel, codigo: ' + vacacion.codigo_empleado, hasErr: true })
                })
            } else {
                new Promise((f, r) => f({ mensaje: 'Error al crear el registro de vacación para ' + empleado.persona.nombre_completo + ', Línea ' + vacacion.row + ' archivo Excel, codigo: ' + vacacion.codigo_empleado + '. Detalles del error:' + err.stack, hasErr: true }))
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: err.stack })
                })
            }
        })
        // }).catch(function (err) {
        //     return new Promise((f, r) => f({ mensaje: err.stack, hasErr: true }));
        // })
    }

    function actualizarHistorialVacaciones(historial, VacacionCreada, tomadas, transaction) {
        return RrhhEmpleadoHistorialVacacion.update({
            tomadas: tomadas
        }, {
            where: { id: historial.id }, transaction: transaction
        }).then(function (historialVacacionActualizado) {
            return RrhhEmpleadoDescuentoVacacionHistorial.create({
                id_vacacion: VacacionCreada.id,
                id_historial_vacacion: historial.id
            }, { transaction: transaction }).then(function (descuentoCreado) {
                return { mensaje: "Guardado satisfactoriamente!" }
            }).catch(function (err) {
                return new Promise((f, r) => f({ mensaje: err.stack, hasErr: true }));
            })
        }).catch(function (err) {
            return new Promise((f, r) => f({ mensaje: err.stack, hasErr: true }));
        })
    }

    function getDaysArray(start, end) {
        let arr = []
        for (arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    /*inicio ruta para obtener lista de fichas empleado*/
    router.route('/recursos-humanos/fichas/empleado/:id_empleado')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoFicha.findAll({
                where: {
                    activo: false,
                    id_empleado: req.params.id_empleado
                },
                include: [{ model: Clase, as: 'tipoContrato' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] },
                { model: Clase, as: 'tipoPersonal' },
                { model: Clase, as: 'cargaHorario' },
                { model: Clase, as: 'area' },
                { model: Clase, as: 'ubicacion' },
                { model: Clase, as: 'seguroSalud' },
                { model: Clase, as: 'lugarSeguroSalud' },
                { model: Clase, as: 'aporteSeguroLargoPlazo' },
                { model: Clase, as: 'lugarSeguroLargoPlazo' },
                { model: Clase, as: 'banco' },
                { model: RrhhEmpleadoDiscapacidad, as: 'discapacidades', include: [{ model: Clase, as: "discapacidad" }] },
                /* { model: RrhhEmpleadoFichaFamiliar, as: 'familiares' },*/
                { model: RrhhEmpleadoFichaOtrosSeguros, as: 'otrosSeguros', include: [{ model: Clase, as: "tipoSeguro" }] },
                {
                    model: MedicoPaciente, as: 'empleado',
                    include: [{ model: RrhhEmpleadoFichaFamiliar, as: 'familiares', include: [{ model: Clase, as: 'relacion' }, { model: Persona, as: 'persona', include: [{ model: Clase, as: 'genero' }] }] },
                    { model: Clase, as: 'extension' }, { model: Clase, as: 'tipoDocumento' },
                    {
                        model: Persona, as: 'persona',
                        include: [{ model: Clase, as: 'genero' },
                        { model: Clase, as: 'pais' },
                        { model: Clase, as: 'ciudad' },
                        { model: Clase, as: 'provincia' },
                        { model: Clase, as: 'localidad' },
                        { model: Clase, as: 'estadoCivil' }]
                    }]
                }, { model: Persona, as: 'personaReferencia' }]
            }).then(function (fichas) {
                res.json({ fichas: fichas })
            }).catch(function (err) {
                res.json({ hasError: true, message: err.stack ? err.stack : err });
            });

        })
    /* fin ruta para obter lista de fichas empleado */
    router.route('/recursos-humanos/otros-bonos/empleado/:id_empleado')
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoOtrosBonos.create({
                id_ficha: req.body.id_ficha,
                fecha: req.body.fecha,
                monto: req.body.monto,
                observacion: req.body.observacion,
                eliminado: false
            }).then(function (empleadohorasExtraCreado) {
                res.json({ mensaje: "Guardado satisfactoriamente!" })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoOtrosBonos.update({
                fecha: req.body.fecha,
                monto: req.body.monto,
                observacion: req.body.observacion,
                eliminado: req.body.eliminado
            }, { where: { id: req.body.id } }).then(function (empleadohorasExtraCreado) {
                res.json({ mensaje: "Actualizado satisfactoriamente!" })
            })
        })

    router.route('/recursos-humanos/otros-bonos/empleado/:id_empleado/inicio/:inicio/fin/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionOtrosBonos = { id_ficha: req.params.id_empleado };
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                var condicionOtrosBonos = { id_ficha: req.params.id_empleado, fecha: { $between: [inicio, fin] } };
            }
            RrhhEmpleadoOtrosBonos.findAll({
                where: condicionOtrosBonos,
                include: [{ model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: MedicoPaciente, as: 'empleado' }] }]
            }).then(function (otrosBonos) {
                res.json(otrosBonos)
            })
        })
    router.route('/recursos-humanos/cerrar/llamada-atencion/:id')
        .post(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoLlamadaAtencion.update({
                cerrado: true
            }, { where: { id: req.params.id } }).then(function (llamadastencionActulizada) {
                res.json({ mensaje: 'Cerrado satisfactoriamente!' })
            })

        })
    //inicio llamadas de atencion
    router.route('/recursos-humanos/registro/llamada-atencion/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(async (t) => {
                if (req.body.eliminado === true) {
                    const [atencionEliminada] = await RrhhEmpleadoLlamadaAtencion.update({
                        eliminado: req.body.eliminado
                    }, { where: { id: req.body.id } }, { transaction: t });
                    if (atencionEliminada) return { mensaje: 'Eliminado satisfactoriamente' };
                    return { mensaje: 'No se eliminó.', hasErr: true };
                } else if (req.body.id) {
                    const [atencionActualizada] = await RrhhEmpleadoLlamadaAtencion.update({
                        id_ficha: req.body.id_ficha,
                        id_motivo: req.body.motivo.id,
                        fecha_solicitud: req.body.fecha_solicitud,
                        fecha_realizacion: req.body.fecha_realizacion,
                        fecha_entrega: req.body.fecha_entrega,
                        fecha_devolucion: req.body.fecha_devolucion,
                        id_solicitante: req.body.solicitante.id,
                        id_recepcionista: req.body.recepcionista.id,
                        visado: req.body.visado,
                        id_firmante: req.body.firmante.empleadosFichas[0].id,
                        detalle: req.body.detalle,
                        observacion: req.body.observacion
                    }, { where: { id: req.body.id }, transaction: t });
                    if (atencionActualizada) {
                        return { mensaje: 'Registro editado con éxito' };
                    } else {
                        return { mensaje: 'Error al actualizar el registro.', hasErr: true };
                    }
                } else {
                    const CorrelativosEmpresaEncontrado = await CorrelativosEmpresa.find({
                        where: { id_empresa: req.params.id_empresa }
                    }, { transaction: t });
                    if (!CorrelativosEmpresaEncontrado) throw new Error('No se encuentra el número correlativo.');
                    const atencionCreada = await RrhhEmpleadoLlamadaAtencion.create({
                        id_ficha: req.body.id_ficha,
                        id_motivo: req.body.motivo.id,
                        fecha: req.params.fecha,
                        fecha_solicitud: req.body.fecha_solicitud,
                        fecha_realizado: req.body.fecha_realizado,
                        fecha_entrega: req.body.fecha_entrega,
                        fecha_devolucion: req.body.fecha_devolucion,
                        id_solicitante: req.body.solicitante.id,
                        id_recepcionista: req.body.recepcionista ? req.body.recepcionista.id : null,
                        visado: req.body.visado,
                        numero_correlativo: CorrelativosEmpresaEncontrado.numero_correlativo_llamada_atencion,
                        id_firmante: req.body.firmante.empleadosFichas[0].id,
                        detalle: req.body.detalle,
                        observacion: req.body.observacion
                    });
                    if (!atencionCreada) throw new Error('No se creó el nuevo registro.');
                    const [correlativoActualizado] = await CorrelativosEmpresa.update({
                        numero_correlativo_llamada_atencion: CorrelativosEmpresaEncontrado.numero_correlativo_llamada_atencion + 1
                    }, {
                        where: { id_empresa: req.params.id_empresa },
                        transaction: t
                    });
                    if (!correlativoActualizado) throw new Error('No se creó el nuevo registro porque no se pudo actualizar el número correlativo.');
                    const llamadaAtencion = await RrhhEmpleadoLlamadaAtencion.find({
                        where: { id: atencionCreada.id },
                        include: [{ model: Clase, as: 'motivo' },
                        { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                        { model: RrhhEmpleadoFicha, as: 'firmante', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                        { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] },
                        { model: MedicoPaciente, as: 'recepcionista', include: [{ model: Persona, as: 'persona' }] }]
                    }, { transaction: t })
                    return { mensaje: 'Creado Correctamente', llamadaAtencion: llamadaAtencion };
                }
            }).then(async (result) => {
                const llamadaAtencion = await RrhhEmpleadoLlamadaAtencion.find({
                    where: { id: req.body.id },
                    include: [{ model: Clase, as: 'motivo' },
                    { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                    { model: RrhhEmpleadoFicha, as: 'firmante', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                    { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] },
                    { model: MedicoPaciente, as: 'recepcionista', include: [{ model: Persona, as: 'persona' }] }]
                })
                result.llamadaAtencion = llamadaAtencion ? llamadaAtencion : {};
                res.json(result)
            }).catch((err) => {
                res.json({ mensaje: err.stack && err.stack || 'Error!', hasErr: true })
            })

        })
    router.route('/recursos-humanos/llamada-atencion/tipo-fecha/:tipo_fecha/fecha_inicio/:fecha_inicio/fecha_fin/:fecha_fin/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/ficha/:id_ficha')
        .get(ensureAuthorizedlogged, function (req, res) {
            let condicionLlamadasAtencion = {}
            let textOrder = ""
            if (req.params.id_ficha !== '0') {
                condicionLlamadasAtencion.id_ficha = req.params.id_ficha
            }
            if (req.params.fecha_inicio !== '0' && req.params.fecha_fin !== '0') {
                let fecha_inicio = new Date(req.params.fecha_inicio);
                let fecha_fin = new Date(req.params.fecha_fin);
                condicionLlamadasAtencion.fecha_solicitud = { $between: [fecha_inicio, fecha_fin] }
            }
            if (req.params.texto_busqueda != '0') {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionBeneficiario = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
                } else {
                    condicionCajaChica.numero_correlativo = req.params.texto_busqueda
                }
            }
            if (req.params.columna == 'solicitante') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            let datosbusqueda = {
                where: condicionLlamadasAtencion,
                include: [{ model: Clase, as: 'motivo' },
                { model: RrhhEmpleadoFicha, as: 'ficha', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                { model: RrhhEmpleadoFicha, as: 'firmante', include: [{ model: Clase, as: 'area' }, { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }, { model: MedicoPaciente, as: 'empleado', include: [{ model: Persona, as: 'persona' }] }] },
                { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] },
                { model: MedicoPaciente, as: 'recepcionista', include: [{ model: Persona, as: 'persona' }] }]
            }
            datosbusqueda.group = ["`agil_rrhh_empleado_llamada_atencion`.`id`"]
            RrhhEmpleadoLlamadaAtencion.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                RrhhEmpleadoLlamadaAtencion.findAll(
                    datosbusqueda
                ).then(function (llamadasAtencion) {
                    res.json({ llamadasAtencion: llamadasAtencion, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })

    router.route('/recursos-humanos/dotacion-ropa/id/:id')
        .get(ensureAuthorizedlogged, function (req, res) {
            RrhhEmpleadoDotacionRopa.findOne({
                where: { id: req.params.id },
                include: [
                    { model: RrhhEmpleadoFicha, as: "ficha", where: { activo: true }, required: false },
                    { model: Sucursal, as: "sucursal" },
                    { model: Almacen, as: "almacen" },
                    { model: ConfiguracionIso, as: 'configuracionesIso', required: false },
                    {
                        model: RrhhEmpleadoDotacionRopaItem, as: "dotacionItems",
                        include: [{ model: Clase, as: "cargo" },
                        {
                            model: Clase, as: "ropaTrabajo",
                            include: [{ model: RrhhEmpleadoConfiguracionRopa, as: 'ropasTrabajo' }]
                        },
                        {
                            model: Producto, as: "producto",
                            include: [{ model: Inventario, as: 'inventarios' }]
                        }]
                    },
                    { model: MedicoPaciente, as: "empleado", include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] },
                    { model: Clase, as: "estado" },
                    { model: Clase, as: "periodo" },
                    { model: Clase, as: "cumplimiento" },
                    { model: Usuario, as: "usuario" }],
                order: [["id", "asc"]]
            })
                .then(data => {
                    res.json({ hasError: false, dotacion: data })
                })
                .catch(e => {
                    res.json({ hasError: true })
                })
        })
    //fin llamadas de atencion


    /// REPORTES DE BENEFICIOS SOCIALES

    router.route('/recursos-humanos/beneficios-sociales/reportes/:id_empresa/:tipo/:inicio/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            let { id_empresa, tipo, inicio, fin } = req.params
            if (tipo === undefined && !id_empresa) return res.json({ error: true, message: "Parámetros inválidos", messageType: "error" })
            if (inicio) inicio = inicio.split("/").reverse().join("-") + " 00:00:00";
            if (fin) fin = fin.split("/").reverse().join("-") + " 23:59:59";
            let condicion = { tipo_beneficio: +tipo ? true : false, eliminado: false, fecha_elaboracion: { $ne: null } }
            if (req.params.inicio != "0" && req.params.fin != "0") {
                condicion.fecha_asistensia = { $between: [inicio, fin] }
            } else {
                if (req.params.inicio != "0") condicion.fecha_asistensia = { $gte: [inicio] }
                if (req.params.fin != "0") condicion.fecha_asistensia = { $lte: [fin] }
            }
            RrhhEmpleadoBeneficioSocial.findAll({
                where: condicion,
                include: [
                    { model: Clase, as: 'motivo', required: false },
                    {
                        model: RrhhEmpleadoFicha, as: 'ficha', include: [
                            {
                                model: MedicoPaciente, as: "empleado", where: { empresa: id_empresa }, include: [
                                    { model: Persona, as: "persona", attributes: ['id', 'nombre_completo', 'ci'] },
                                    { model: Clase, as: 'extension', required: false }
                                ]
                            },
                            { model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }] }
                        ]
                    },
                    { model: RrhhEmpleadoDeduccionIngreso, as: 'deduccionEingresos' },
                    { model: Banco, as: 'cuenta', required: false }
                ]
            })
                .then(data => {
                    res.json({ error: false, data: data })
                })
                .catch(e => {
                    res.json({ error: true, message: "<b>Ocurrió un error al recuperar datos</b><br>" + e, messageType: "error" })
                })
        })
    /// FIN REPORTE DE BENEFICIOS SOCIALES

    /// INICIO REPORTE OTROS BONOS 
    router.route('/recursos-humanos/otros-bonos/reportes/:id_empresa/:inicio/:fin/:empleado/:texto_busqueda/:pagina/:items_pagina/:columna/:direccion/:paginado')
        .get(ensureAuthorizedlogged, (req, res) => {
            const { id_empresa, inicio, fin, empleado, texto_busqueda, pagina, items_pagina, columna, direccion, paginado } = req.params
            if (!id_empresa) return res.json({ error: true, message: 'Parámetros incorrectos', messageType: 'error' })
            try {
                let count = ""
                if (paginado != '0') count = `SELECT COUNT(ob.id) AS total FROM agil_rrhh_empleado_otros_bonos ob INNER JOIN agil_rrhh_empleado_ficha ef ON ef.id=ob.ficha INNER JOIN agil_medico_paciente pac ON pac.id=ef.id_empleado INNER JOIN gl_persona p ON p.id=pac.persona LEFT JOIN gl_clase area ON area.id=ef.area LEFT JOIN gl_clase campo ON campo.id=ef.id_campo LEFT JOIN sys_usuario us ON us.id=ob.id_usuario WHERE pac.empresa=${id_empresa}`
                let qry = `SELECT ob.fecha,p.nombre_completo AS empleado,(SELECT GROUP_CONCAT(cargo.nombre SEPARATOR ', ') AS cargos FROM agil_rrhh_empleado_cargo ec INNER JOIN gl_clase cargo ON cargo.id=ec.cargo WHERE ec.ficha=ef.id GROUP BY ec.ficha) AS cargos,campo.nombre AS campo,area.nombre AS area,ob.monto,ob.eliminado,ob.observacion,us.nombre_usuario,ob.createdAt,ob.updatedAt FROM agil_rrhh_empleado_otros_bonos ob INNER JOIN agil_rrhh_empleado_ficha ef ON ef.id=ob.ficha INNER JOIN agil_medico_paciente pac ON pac.id=ef.id_empleado INNER JOIN gl_persona p ON p.id=pac.persona LEFT JOIN gl_clase area ON area.id=ef.area LEFT JOIN gl_clase campo ON campo.id=ef.id_campo LEFT JOIN sys_usuario us ON us.id=ob.id_usuario WHERE pac.empresa=${id_empresa}`
                if (inicio != '0' && fin != '0') {
                    desde = inicio.split('/').reverse().join('-') + " 00:00:00"
                    hasta = fin.split('/').reverse().join('-') + " 23:59:59"
                    qry += ` AND ob.fecha between '${desde}' AND '${hasta}'`
                    if (paginado != '0') count += ` AND ob.fecha between '${desde}' AND '${hasta}'`
                }
                if (inicio != '0') {
                    desde = inicio.split('/').reverse().join('-') + " 00:00:00"
                    qry += ` AND ob.fecha > '${desde}'`
                    if (paginado != '0') count += ` AND ob.fecha > '${desde}'`
                } else {
                    if (empleado === "0") {
                        desde = new Date().getFullYear() + "-01-01 00:00:00";
                        qry += ` AND ob.fecha > '${desde}'`
                        if (paginado != '0') count += ` AND ob.fecha > '${desde}'`
                    }
                }
                if (fin != '0') {
                    hasta = fin.split('/').reverse().join('-') + " 23:59:59"
                    qry += ` AND ob.fecha < '${hasta}'`
                    if (paginado != '0') count += ` AND ob.fecha < '${hasta}'`
                } else {
                    if (empleado === "0") {
                        hasta = new Date();
                        qry += ` AND ob.fecha < '${hasta}'`
                        if (paginado != '0') count += ` AND ob.fecha < '${hasta}'`
                    }
                }
                if (empleado != 0) {
                    qry += ` AND pac.id=${empleado}`
                    if (paginado != '0') count += ` AND pac.id=${empleado}`
                }
                if (texto_busqueda != '0') {
                    qry += ` AND (p.nombre_completo LIKE '%${texto_busqueda}%' OR ob.observacion LIKE '%${texto_busqueda}%' OR ob.monto LIKE '%${texto_busqueda}%' )`
                    if (paginado != '0') count += ` AND (p.nombre_completo LIKE '%${texto_busqueda}%' OR ob.observacion LIKE '%${texto_busqueda}%' OR ob.monto LIKE '%${texto_busqueda}%' )`
                }
                qry += ` ORDER BY ${columna === 'empleado' ? 'p.nombre_completo' : 'ob.fecha'}  ${direccion} `
                if (items_pagina != '0' && paginado != '0') qry += ` LIMIT ${(req.params.items_pagina * (req.params.pagina - 1))} , ${items_pagina} `

                sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
                    .then(data => {
                        if (paginado != '0') {
                            if (data.length === 0) return res.json({ error: false, data, paginas: 1 })
                            sequelize.query(count, { type: sequelize.QueryTypes.SELECT })
                                .then(contados => {
                                    paginas = (contados[0] && contados[0].total) ? Math.ceil(contados[0].total / (items_pagina != '0' ? items_pagina : 1)) : 1
                                    res.json({ error: false, data, paginas })
                                })
                                .catch(e => res.json({ error: true, message: '<b>Error al obtener registros</b><br>' + e, messageType: 'error' }))
                        } else {
                            res.json({ error: false, data })
                        }

                    })
                    .catch(e => res.json({ error: true, message: '<b>Error al obtener registros</b><br>' + e, messageType: 'error' }))
            } catch (e) {
                res.json({ error: true, message: '<b>Error al obtener registros</b><br>' + e, messageType: 'error' })
            }

        })
    /// FIN REPORTE OTROS BONOS

    /// INICIO OBTENER DATOS PARA EDICION RT
    router.route('/recursos-humanos/dotacion-ropa/individual/:id_dotacion/:id_almacen')
        .get(ensureAuthorizedlogged, async (req, res) => {
            const { id_dotacion, id_almacen } = req.params
            if (!(id_dotacion && id_almacen)) return res.json({ error: true, message: "Parámetro incorrecto", messageType: "error" })
            try {
                let data = await RrhhEmpleadoDotacionRopa.findById(id_dotacion, {
                    include: [
                        {
                            model: RrhhEmpleadoDotacionRopaItem, as: 'dotacionItems',
                            include: [{
                                model: Producto, as: 'producto', include: [{
                                    model: Clase, as: 'subgrupo', include: [{
                                        model: Producto, as: "productosSubGrupo",
                                        include: [{ model: Inventario, as: "inventarios", where: { id_almacen: id_almacen, cantidad: { $gt: 0 } }, required: false }]
                                    }]
                                }]
                            },
                            { model: Clase, as: "ropaTrabajo", required: false }
                            ]
                        },
                        { model: Sucursal, as: "sucursal" },
                        { model: Almacen, as: 'almacen' },
                        { model: Clase, as: 'cumplimiento', required: false },
                        { model: Clase, as: 'periodo', required: false }
                    ]
                })
                res.json({ error: false, data })
            } catch (e) {
                res.json({ error: true, message: "<b>Ocurrió un error</b><br>" + e, messageType: "error" })
            }
        })
    /// FIN OBTENER DATOS PARA EDICION RT

    function eliminarRecurso(rutaPDF) {
        if (fs.existsSync(rutaPDF)) {
            fs.unlinkSync(rutaPDF)
        }
    }

    // INICIO REPORTE BAJAS MÉDICAS
    router.route('/rrhh/bajas-medicas/reporte/:id_empresa/:desde/:hasta/:tipo/:tipo_reporte')
        .get(ensureAuthorizedlogged, async (req, res) => {
            try {
                let { id_empresa, desde, hasta, tipo, tipo_reporte } = req.params
                let qry = `SELECT `
                if (tipo_reporte === "0") qry += `lugar.nombre lugar_seguro,  ( SELECT GROUP_CONCAT( DISTINCT cargo.nombre SEPARATOR ', ') cargos FROM agil_rrhh_empleado_cargo ec INNER JOIN gl_clase cargo ON cargo.id=ec.cargo WHERE ficha=ficha.id GROUP BY ec.ficha) cargos, `
                qry += `persona.nombre_completo, campo.nombre campo, ausencia.fecha_inicio desde, ausencia.fecha_fin hasta, ausencia.primera_baja, clase.nombre tipo, ausencia.observacion, ausencia.diagnostico, ausencia.dias FROM agil_rrhh_empleado_ausencia ausencia INNER JOIN agil_rrhh_clase_ausencia clase ON clase.id = ausencia.tipo INNER JOIN gl_tipo tipo ON tipo.id = clase.tipo INNER JOIN agil_rrhh_empleado_ficha ficha ON ficha.id = ausencia.ficha INNER JOIN agil_medico_paciente paciente ON paciente.id=ficha.id_empleado INNER JOIN gl_persona persona ON persona.id=paciente.persona`
                if (tipo_reporte === "0") qry += ` LEFT JOIN gl_clase lugar ON lugar.id = ficha.lugar_seguro_salud `
                qry += ` LEFT JOIN gl_clase campo ON campo.id = ficha.id_campo WHERE ausencia.eliminado = FALSE AND tipo.nombre_corto = "RRHH_AUSMED" AND paciente.empresa=${id_empresa}`
                if (tipo != "0") qry += ` AND clase.id=${tipo}`
                if (desde != "0" || hasta != "0") {
                    if (desde != "0" && hasta != "0") {
                        desde = desde.split('/').reverse().join('-') + " 00:00:00"
                        hasta = hasta.split('/').reverse().join('-') + " 23:59:59"
                        qry += ` AND ausencia.fecha_inicio BETWEEN '${desde}' AND '${hasta}'`
                    } else {
                        if (desde != "0") {
                            desde = desde.split('/').reverse().join('-') + " 00:00:00"
                            qry += ` AND ausencia.fecha_inicio > '${desde}'`
                        }
                        if (hasta != "0") {
                            hasta = hasta.split('/').reverse().join('-') + " 23:59:59"
                            qry += ` AND ausencia.fecha_inicio < '${hasta}'`
                        }
                    }
                } else {
                    desde = new Date().getFullYear() + "-01-01 00:00:00"
                    qry += ` AND ausencia.fecha_inicio BETWEEN "${desde}" AND CURRENT_TIMESTAMP `
                }
                qry += ` ORDER BY ausencia.fecha_inicio ASC`
                sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
                    .then(bajas => {
                        res.json({ error: false, bajas, desde, hasta })
                    })
            } catch (e) {
                res.json({ error: true, message: '<b>Error al obtener registros</b><br>' + e, messageType: 'error' })
            }
        })
    // FIN REPORTE BAJAS MÉDICAS

    //INICIO ISO VIAJE
    router.route('/rrhh/viajes/:id')
        .get(ensureAuthorizedlogged, async (req, res) => {
            try {
                const { id } = req.params
                if (!id) return res.json({ error: true, message: "<b>Párametros incorrecto</b>", messageType: "error" })
                let viaje = await RrhhViaje.findById(id, {
                    include: [
                        { model: RrhhViajeDetalle, as: 'viajeDetalles', include: [{ model: RrhhEmpleadoFicha, as: 'ficha', attributes: ['id_empleado'], raw: true, include: [{ model: MedicoPaciente, as: 'empleado', attributes: ['id_persona'], include: [{ model: Persona, as: 'persona', attributes: ['nombre_completo'] }] }] }] },
                        { model: RrhhViajeConductor, as: 'conductor', include: [{ model: Clase, as: 'tipoLicencia', required: false }] },
                        { model: RrhhViajeConductor, as: 'relevo', include: [{ model: Clase, as: 'tipoLicencia', required: false }] },
                        { model: RrhhViajeDestino, as: 'destinos', include: [{ model: Clase, as: 'destino', required: false }] },
                        { model: Clase, as: 'vehiculo', required: false },
                        { model: ConfiguracionIsoEmpresa, as: 'configuracionIso' }
                    ]
                })
                res.json({ error: false, viaje })
            } catch (e) {
                res.json({ error: true, message: "<b>Ocurrió un error en el servidor</b><small>" + e + "</small>", messageType: "error" })
            }
        })
    //FIN ISO VIAJE

}

