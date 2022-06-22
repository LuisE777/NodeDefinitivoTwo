//----------------------------
let axios = require('axios')
let idEquipo
//-----------------------------
module.exports = function (router, sequelize, Sequelize, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, decodeBase64Image, fs, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad
    , RrhhEmpleadoCargo, RrhhEmpleadoHojaVida, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, NumeroLiteral, RrhhEmpleadoPrestamo, RrhhEmpleadoPrestamoPago, RrhhEmpleadoRolTurno, RrhhEmpleadoHorasExtra, RrhhAnticipo,
    EvaluacionPolifuncional, ConfiguracionCalificacionEvaluacionPolifuncional, ConfiguracionDesempenioEvaluacionPolifuncional, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhEmpleadoCompensacionAusencia, RrhhFeriado, RrhhClaseAsuencia, RrhhEmpleadoConfiguracionVacacion, RrhhEmpleadoHistorialVacacion, RrhhEmpleadoTr3, RrhhEmpleadoAnticipoTr3, Banco, RrhhEmpleadoDeduccionIngreso,
    RrhhEmpleadoBeneficioSocial, RrhhEmpleadoBitacoraFicha, RrhhEmpleadoConfiguracionRopa, Producto, Inventario, RrhhEmpleadoDotacionRopaItem, RrhhEmpleadoDotacionRopa, RrhhViajeDetalle, RrhhViaje, RrhhViajeDestino, RrhhViajeConductor, Movimiento, DetalleMovimiento, Almacen, RrhhEmpleadoDescuentoVacacionHistorial, RrhhEmpleadoPrerequisitoCargo, MedicoPrerequisito, ensureAuthorizedlogged, RrhhEmpresaCargaHorario, RrhhEmpleadoSolicitudVacacion) {

    router.route('/app/recursos-humanos/empleado/:carnet/:id_empresa')
        .get(function (req, res) {

            sequelize.query("SELECT DISTINCT \
            agil_medico_paciente.id AS 'id',\
            agil_medico_paciente.es_empleado AS 'es_empleado',\
            agil_medico_paciente.persona AS 'id_persona',\
            agil_medico_paciente.codigo AS 'codigo',\
            agil_medico_paciente.empresa AS 'id_empresa',\
            extencion.nombre AS 'extension',\
            agil_medico_paciente.grupo_sanguineo AS 'grupo_sanguineo',\
            agil_medico_paciente.campo AS 'campo',\
            agil_medico_paciente.designacion_empresa AS 'designacion_empresa',\
            agil_medico_paciente.comentario AS 'comentario',\
            gl_persona.id AS `persona.id`,\
            gl_persona.apellido_paterno AS `persona.apellido_paterno`,\
            gl_persona.apellido_materno AS `persona.apellido_materno`,\
            gl_persona.nombres AS `persona.nombres`,\
            gl_persona.nombre_completo AS  `persona.nombre_completo`,\
            gl_persona.direccion AS `persona.direccion`,\
            gl_persona.imagen AS  `persona.imagen`,\
            gl_persona.ci AS `persona.ci`,\
            gl_persona.genero AS `persona.genero`,\
            gl_persona.telefono AS `persona.telefono`,\
            gl_persona.fecha_nacimiento AS `persona.fecha_nacimiento`,\
            gl_persona.telefono_movil AS `persona.telefono_movil`,\
            gl_persona.correo_electronico AS `persona.correo_electronico`,\
            agil_medico_paciente.eliminado AS 'activo',\
            fichas.fecha_inicio AS `empleadosFichas.fecha_inicio`,\
            fichas.fecha_expiracion AS `empleadosFichas.fecha_expiracion`,\
            fichas.haber_basico AS `empleadosFichas.haber_basico`,\
            fichas.matricula_seguro AS `empleadosFichas.matricula_seguro`,\
            fichas.activo AS `empleadosFichas.activo`,\
            fichas.id AS `empleadosFichas.id`,\
            fichas.id_empleado AS `empleadosFichas.id_empleado`,\
            fichas.fecha AS `empleadosFichas.fecha`,\
            fichas.codigo_empleado AS `empleadosFichas.codigo_empleado`,\
            fichas.encargado_area AS `empleadosFichas.encargado_area`,\
            fichas.area AS `empleadosFichas.id_area`,\
            GROUP_CONCAT( `cargos.cargo`.nombre ORDER BY `cargos.cargo`.id ) cargos,\
            `empleadosFichas.cargaHorario`.`id` AS `empleadosFichas.cargaHorario.id`,\
            `empleadosFichas.cargaHorario`.`tipo` AS `empleadosFichas.cargaHorario.id_tipo`,\
            `empleadosFichas.cargaHorario`.`nombre` AS `empleadosFichas.cargaHorario.nombre`,\
            `empleadosFichas.cargaHorario`.`nombre_corto` AS `empleadosFichas.cargaHorario.nombre_corto`,\
            `empleadosFichas.cargaHorario`.`habilitado` AS `empleadosFichas.cargaHorario.habilitado`,\
            `empleadosFichas.cargaHorario`.`eliminado` AS `empleadosFichas.cargaHorario.eliminado`,\
            `empleadosFichas.cargaHorario`.`padre` AS `empleadosFichas.cargaHorario.id_padre`,\
            `empleadosFichas.cargaHorario`.`createdAt` AS `empleadosFichas.cargaHorario.createdAt`,\
            `empleadosFichas.cargaHorario`.`updatedAt` AS `empleadosFichas.cargaHorario.updatedAt`,\
            `empleadosFichas.cargaHorario.horario`.`id` AS `empleadosFichas.cargaHorario.horario.id`,\
            `empleadosFichas.cargaHorario.horario`.`carga_horario` AS `empleadosFichas.cargaHorario.horario.id_carga_horario`,\
            `empleadosFichas.cargaHorario.horario`.`hora_inicio` AS `empleadosFichas.cargaHorario.horario.hora_inicio`,\
            `empleadosFichas.cargaHorario.horario`.`hora_fin` AS `empleadosFichas.cargaHorario.horario.hora_fin`,\
            `empleadosFichas.cargaHorario.horario`.`usar_descanso` AS `empleadosFichas.cargaHorario.horario.usar_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`hora_inicio_descanso` AS `empleadosFichas.cargaHorario.horario.hora_inicio_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`hora_fin_descanso` AS `empleadosFichas.cargaHorario.horario.hora_fin_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`eliminado` AS `empleadosFichas.cargaHorario.horario.eliminado`,\
            `empleadosFichas.cargaHorario.horario`.`createdAt` AS `empleadosFichas.cargaHorario.horario.createdAt`,\
            `empleadosFichas.cargaHorario.horario`.`updatedAt` AS `empleadosFichas.cargaHorario.horario.updatedAt` \
        FROM \
            agil_medico_paciente \
            JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id = ( \
            SELECT\
                agil_rrhh_empleado_ficha.id \
            FROM \
                agil_rrhh_empleado_ficha \
            WHERE \
                agil_rrhh_empleado_ficha.id_empleado = agil_medico_paciente.id \
            ORDER BY\
                id DESC \
                LIMIT 1 \
            )\
            LEFT OUTER JOIN `gl_clase` AS `empleadosFichas.cargaHorario` ON `fichas`.`carga_horarios` = `empleadosFichas.cargaHorario`.`id` \
            LEFT OUTER JOIN `agil_rrhh_empresa_carga_horario` AS `empleadosFichas.cargaHorario.horario` ON `empleadosFichas.cargaHorario`.`id` = `empleadosFichas.cargaHorario.horario`.`carga_horario` \
            LEFT JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha \
            LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id \
            LEFT JOIN gl_persona ON ( agil_medico_paciente.persona = gl_persona.id ) \
            LEFT JOIN gl_clase AS extencion ON agil_medico_paciente.extension = extencion.id \
        WHERE \
            agil_medico_paciente.empresa =" + req.params.id_empresa + "\
            AND agil_medico_paciente.es_empleado = TRUE \
            AND agil_medico_paciente.eliminado = FALSE \
            AND gl_persona.ci = "+req.params.carnet+"\
        GROUP BY \
            agil_medico_paciente.id", { type: sequelize.QueryTypes.SELECT, raw: false, nest: true }).then(function (empleados) {

                res.json({ empleados: empleados });

            });

            // MedicoPaciente.findAll({
            //     where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
            //     include: [{
            //         model: RrhhEmpleadoFicha, as: 'empleadosFichas',where:{activo:true},
            //         include: [{ model: Clase, as: 'cargaHorario', include: [{ model: RrhhEmpresaCargaHorario, as: 'horario', where: { eliminado: false } }] },{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }],
            //         where: { fecha_expiracion: null }
            //     },
            //     { model: Persona, as: 'persona', where: { ci: req.params.carnet } }]
            // }).then(function (empleado) {
            //     res.json({ empleado: empleado })
            // }).catch(function (err) {
            //     res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            // });
        })
    router.route('/app/recursos-humanos/empleados/:id_empresa')
        .get(function (req, res) {

            sequelize.query("SELECT DISTINCT \
            agil_medico_paciente.id AS 'id',\
            agil_medico_paciente.es_empleado AS 'es_empleado',\
            agil_medico_paciente.persona AS 'id_persona',\
            agil_medico_paciente.codigo AS 'codigo',\
            agil_medico_paciente.empresa AS 'id_empresa',\
            extencion.nombre AS 'extension',\
            agil_medico_paciente.grupo_sanguineo AS 'grupo_sanguineo',\
            agil_medico_paciente.campo AS 'campo',\
            agil_medico_paciente.designacion_empresa AS 'designacion_empresa',\
            agil_medico_paciente.comentario AS 'comentario',\
            gl_persona.id AS `persona.id`,\
            gl_persona.apellido_paterno AS `persona.apellido_paterno`,\
            gl_persona.apellido_materno AS `persona.apellido_materno`,\
            gl_persona.nombres AS `persona.nombres`,\
            gl_persona.nombre_completo AS  `persona.nombre_completo`,\
            gl_persona.direccion AS `persona.direccion`,\
            gl_persona.imagen AS  `persona.imagen`,\
            gl_persona.ci AS `persona.ci`,\
            gl_persona.genero AS `persona.genero`,\
            gl_persona.telefono AS `persona.telefono`,\
            gl_persona.fecha_nacimiento AS `persona.fecha_nacimiento`,\
            gl_persona.telefono_movil AS `persona.telefono_movil`,\
            gl_persona.correo_electronico AS `persona.correo_electronico`,\
            agil_medico_paciente.eliminado AS 'activo',\
            fichas.fecha_inicio AS `empleadosFichas.fecha_inicio`,\
            fichas.fecha_expiracion AS `empleadosFichas.fecha_expiracion`,\
            fichas.haber_basico AS `empleadosFichas.haber_basico`,\
            fichas.matricula_seguro AS `empleadosFichas.matricula_seguro`,\
            fichas.activo AS `empleadosFichas.activo`,\
            fichas.id AS `empleadosFichas.id`,\
            fichas.id_empleado AS `empleadosFichas.id_empleado`,\
            fichas.fecha AS `empleadosFichas.fecha`,\
            fichas.codigo_empleado AS `empleadosFichas.codigo_empleado`,\
            fichas.encargado_area AS `empleadosFichas.encargado_area`,\
            fichas.area AS `empleadosFichas.id_area`,\
            GROUP_CONCAT( `cargos.cargo`.nombre ORDER BY `cargos.cargo`.id ) cargos,\
            `empleadosFichas.cargaHorario`.`id` AS `empleadosFichas.cargaHorario.id`,\
            `empleadosFichas.cargaHorario`.`tipo` AS `empleadosFichas.cargaHorario.id_tipo`,\
            `empleadosFichas.cargaHorario`.`nombre` AS `empleadosFichas.cargaHorario.nombre`,\
            `empleadosFichas.cargaHorario`.`nombre_corto` AS `empleadosFichas.cargaHorario.nombre_corto`,\
            `empleadosFichas.cargaHorario`.`habilitado` AS `empleadosFichas.cargaHorario.habilitado`,\
            `empleadosFichas.cargaHorario`.`eliminado` AS `empleadosFichas.cargaHorario.eliminado`,\
            `empleadosFichas.cargaHorario`.`padre` AS `empleadosFichas.cargaHorario.id_padre`,\
            `empleadosFichas.cargaHorario`.`createdAt` AS `empleadosFichas.cargaHorario.createdAt`,\
            `empleadosFichas.cargaHorario`.`updatedAt` AS `empleadosFichas.cargaHorario.updatedAt`,\
            `empleadosFichas.cargaHorario.horario`.`id` AS `empleadosFichas.cargaHorario.horario.id`,\
            `empleadosFichas.cargaHorario.horario`.`carga_horario` AS `empleadosFichas.cargaHorario.horario.id_carga_horario`,\
            `empleadosFichas.cargaHorario.horario`.`hora_inicio` AS `empleadosFichas.cargaHorario.horario.hora_inicio`,\
            `empleadosFichas.cargaHorario.horario`.`hora_fin` AS `empleadosFichas.cargaHorario.horario.hora_fin`,\
            `empleadosFichas.cargaHorario.horario`.`usar_descanso` AS `empleadosFichas.cargaHorario.horario.usar_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`hora_inicio_descanso` AS `empleadosFichas.cargaHorario.horario.hora_inicio_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`hora_fin_descanso` AS `empleadosFichas.cargaHorario.horario.hora_fin_descanso`,\
            `empleadosFichas.cargaHorario.horario`.`eliminado` AS `empleadosFichas.cargaHorario.horario.eliminado`,\
            `empleadosFichas.cargaHorario.horario`.`createdAt` AS `empleadosFichas.cargaHorario.horario.createdAt`,\
            `empleadosFichas.cargaHorario.horario`.`updatedAt` AS `empleadosFichas.cargaHorario.horario.updatedAt` \
        FROM \
            agil_medico_paciente \
            JOIN agil_rrhh_empleado_ficha AS fichas ON fichas.id = ( \
            SELECT\
                agil_rrhh_empleado_ficha.id \
            FROM \
                agil_rrhh_empleado_ficha \
            WHERE \
                agil_rrhh_empleado_ficha.id_empleado = agil_medico_paciente.id \
            ORDER BY\
                id DESC \
                LIMIT 1 \
            )\
            LEFT OUTER JOIN `gl_clase` AS `empleadosFichas.cargaHorario` ON `fichas`.`carga_horarios` = `empleadosFichas.cargaHorario`.`id` \
            LEFT OUTER JOIN `agil_rrhh_empresa_carga_horario` AS `empleadosFichas.cargaHorario.horario` ON `empleadosFichas.cargaHorario`.`id` = `empleadosFichas.cargaHorario.horario`.`carga_horario` \
            LEFT JOIN agil_rrhh_empleado_cargo AS cargos ON fichas.id = cargos.ficha \
            LEFT OUTER JOIN gl_clase AS `cargos.cargo` ON cargos.cargo = `cargos.cargo`.id \
            LEFT JOIN gl_persona ON ( agil_medico_paciente.persona = gl_persona.id ) \
            LEFT JOIN gl_clase AS extencion ON agil_medico_paciente.extension = extencion.id \
        WHERE \
            agil_medico_paciente.empresa =" + req.params.id_empresa + "\
            AND agil_medico_paciente.es_empleado = TRUE \
            AND agil_medico_paciente.eliminado = FALSE \
        GROUP BY \
            agil_medico_paciente.id", { type: sequelize.QueryTypes.SELECT, raw: false, nest: true }).then(function (empleados) {

                res.json({ empleados: empleados });

            });

        
            // MedicoPaciente.findAll({
            //     where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
            //     include: [{
            //         model: RrhhEmpleadoFicha, as: 'empleadosFichas',where:{activo:true},
            //         include: [{ model: Clase, as: 'cargaHorario', include: [{ model: RrhhEmpresaCargaHorario, as: 'horario', where: { eliminado: false } }] },{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: "cargo" }] }],
            //         where: { fecha_expiracion: null }
            //     },
            //     { model: Persona, as: 'persona', where: { ci: req.params.carnet } }]
            // }).then(function (empleado) {
            //     res.json({ empleado: empleado })
            // }).catch(function (err) {
            //     res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            // });
        })
    router.route('/app/clase/:nombre_corto/tipo/:id_tipo')
        .get(function (req, res) {
            Clase.find({
                where: {
                    nombre_corto: req.params.nombre_corto,
                    id_tipo: req.params.id_tipo
                }
            }).then(function (entidad) {
                res.json({ clase: entidad });
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });;
        })
    router.route('/app/recursos-humanos-solicitudes-ausencia/empresa/:id_empresa/estado/:estado/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/area/:id_area')
        .get(function (req, res) {
            var condicionFicha = {}, condicionPersona = {}, condicionAusencia = { eliminado: false },
                condicionEstado = { nombre_corto: { $in: ['SOL', 'AUT', 'DES'] } }
            if (req.params.estado != 0) {
                condicionEstado = { nombre_corto: { $in: [req.params.estado] } }
            }
            if (req.params.inicio != 0) {
                var fechaInicio = req.params.inicio.split('-') 
                var inicio = fechaInicio[0] + "-" + fechaInicio[1] + "-" +  (fechaInicio[2] < 10 ? '0'+fechaInicio[2]:fechaInicio[2]) + "T00:00:00.000Z"
                var fin = req.params.fin + "T23:59:59.000Z"
                // var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                // var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 0);
                condicionAusencia.fecha_inicio = { $between: [inicio, fin] };
            }
            var arrelo = []
            var dato = req.params.id_area.split(",")
            dato.map(function (x) {
                arrelo.push(x)
            })
            if (req.params.id_area != 0) {
                if (req.params.inicio != 0) {
                    condicionAusencia.fecha_inicio = { $gte: [inicio] };
                }
                condicionFicha.id_area = { $in: arrelo }
                
            }
            /* if (req.params.id_empleado != 0) {
                condicionFicha.id_empleado = req.params.id_empleado
            } */
            if (req.params.texto_busqueda != 0) {
                condicionPersona = {
                    $or: [
                        {
                            nombre_completo: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        },
                        {
                            ci: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        }
                    ]
                };
                MedicoPaciente.findAll({
                    where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                    include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                }).then(function (empleadosEncontrado) {
                    var idEmpleados = empleadosEncontrado.map(function (dato) {
                        return dato.id
                    })
                    condicionFicha.id_empleado = { $in: [idEmpleados] }
                    RrhhEmpleadoAusencia.count({
                        where: condicionAusencia,
                        include: [{ model: Clase, as: 'estado', where: condicionEstado, required:true }, {
                            model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha,
                            include: [{
                                model: MedicoPaciente, as: 'empleado',
                                where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                                include: [{ model: Persona, as: 'persona' }]
                            }]
                        },
                        {
                            model: RrhhClaseAsuencia, as: 'tipoAusencia',
                            include: [{ model: Tipo, as: 'tipo' }]
                        }]
                    }).then(function (datos) {
                        RrhhEmpleadoAusencia.findAll({
                            where: condicionAusencia,
                            
                            include: [{ model: Clase, as: 'estado', where: condicionEstado, required:true }, {
                                model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha,
                                include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' ,required: false}], required: false }, {
                                    model: MedicoPaciente, as: 'empleado',
                                    where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                                    include: [{ model: Persona, as: 'persona' }]
                                }]
                            },
                            {
                                model: RrhhClaseAsuencia, as: 'tipoAusencia',
                                include: [{ model: Tipo, as: 'tipo' }]
                            }],
                            offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                            order: [['fecha_inicio', 'asc']]
                        }).then(function (ausencias) {
                            res.json({ ausencias: ausencias, paginas: Math.ceil(datos / req.params.items_pagina) });
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                        });
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                    });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                });
            } else {
                RrhhEmpleadoAusencia.count({
                    where: condicionAusencia,
                    include: [{ model: Clase, as: 'estado', where: condicionEstado, required:true }, {
                        model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha,
                        include: [{
                            model: MedicoPaciente, as: 'empleado',
                            where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                            include: [{ model: Persona, as: 'persona'}]
                        }]
                    },
                    {
                        model: RrhhClaseAsuencia, as: 'tipoAusencia',
                        include: [{ model: Tipo, as: 'tipo'}]
                    }]
                }).then(function (datos) {
                    RrhhEmpleadoAusencia.findAll({
                        where: condicionAusencia,
                        offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                        include: [{ model: Clase, as: 'estado', where: condicionEstado, required: true }, {
                            model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha,
                            include: [{ model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo', required: false }] , required: false}, {
                                model: MedicoPaciente, as: 'empleado',
                                where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                                include: [{ model: Persona, as: 'persona', }]
                            }]
                        },
                        {
                            model: RrhhClaseAsuencia, as: 'tipoAusencia',
                            include: [{ model: Tipo, as: 'tipo'}]
                        }],
                        order: [['fecha_inicio', 'asc']]
                    }).then(function (ausencias) {
                        res.json({ ausencias: ausencias, paginas: Math.ceil(datos / req.params.items_pagina) });
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                    });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                });
            }
        })
    router.route('/app/tipos/:nombre_corto/empresa/:id_empresa')
        .get(function (req, res) {
            Tipo.find({
                where: {
                    nombre_corto: req.params.nombre_corto,
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'clases', required: false, where: { eliminado: false } }, { model: RrhhClaseAsuencia, as: 'ausencias', required: false }]
            }).then(function (entidad) {
                res.json(entidad);
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });;
        });
    router.route('/app/recursos-humanos/ausencia')
        .post(function (req, res) {           
            req.body = JSON.parse(req.body.json)
            var id_vehiculo = req.body.id_vehiculo || null;
            if (req.body.id_vehiculo != null && req.body.id_vehiculo != undefined && req.body.id_vehiculo != "") {
                id_vehiculo = parseInt(req.body.id_vehiculo);
            }
            RrhhEmpleadoAusencia.create({
                id_ficha: req.body.id_ficha,
                id_tipo: req.body.id_tipo,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                fecha_inicio_solicitud: req.body.fecha_inicio,
                fecha_fin_solicitud: req.body.fecha_fin,
                observacion: req.body.observacion,
                horas: req.body.horas,
                eliminado: false,
                planilla: false,
                usar_vehiculo: req.body.usar_vehiculo,
                id_vehiculo: id_vehiculo,
                id_estado: req.body.id_estado,
                id_autorizador: req.body.id_autorizador,
                sin_ingreso: req.body.sin_ingreso,
                sin_retorno: req.body.sin_retorno
            }).then(function (empleadoAusenciaCreado) {
                res.json({ mensaje: "Guardado satisfactoriamente!" })
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });
        })
        .put(async function (req, res) {
            //-------------------------------------------------
            //se usa esta ruta PUT para dos cosas:
            //1)para actualizar informacion de la solicitud
            //2)para cuando alguien autoriza la solicitud
            let estadoSolicitud=""
            req.body = JSON.parse(req.body.json)
            //verificando que la solicitud no fue autorizada
            //verificando que la solicitud no fue eliminada 
            if(Number(req.body.id_autorizador) === 1 || req.body.eliminado === true){
            }else{
                //verificando el estado de solicitud si fue aprobada o autorizada
                let verificarEstado = ((String(req.body.id_estado))==="14420")
                if(verificarEstado){
                    estadoSolicitud="aprobada"
                }else{
                    estadoSolicitud="rechazada"
                }
                //obteniendo el periodo que dura la ausencia
                let periodo =await obtHoraSE(req.body.id)
                //obteniendo el nombre del autorizador
                let autorizador = await obtNomAut(req.body.id_autorizador)
                //Obtener ci y el id del equipo del solicitante de ausencia
                //El id del equipo del supervisado se guarda en idEquipo
                let ci = await obteniendoCi(Number(req.body.id_ficha))

                if(idEquipo!=false && idEquipo!=undefined && idEquipo!=null){
                    //generando la notificacion
                    let cabeza='Solicitud '+estadoSolicitud
                    let cuerpo='Su solicitud fue '+estadoSolicitud+' por: '+autorizador+" para su ausencia de: "+periodo
                    //generando la notificacion con el one signal
                    await generandoNotificacion(cabeza, cuerpo)
                    //guardando la notificacion en la base de datos 
                    await guardarNot(ci, cabeza, cuerpo)
                }
                //--------------------------------------------------
            }
            RrhhEmpleadoAusencia.update({
                id_tipo: req.body.id_tipo,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                fecha_inicio_solicitud: req.body.fecha_inicio,
                fecha_fin_solicitud: req.body.fecha_fin,
                observacion: req.body.observacion,
                horas: req.body.horas,
                eliminado: req.body.eliminado,
                planilla: req.body.planilla,
                usar_vehiculo: req.body.usar_vehiculo,
                id_vehiculo: req.body.id_vehiculo,
                id_estado: req.body.id_estado,
                id_autorizador: req.body.id_autorizador,
                sin_ingreso: req.body.sin_ingreso,
                sin_retorno: req.body.sin_retorno
            }, {
                    where: { id: req.body.id }

                }).then(function (empleadoAusenciaCreado) {
                    res.json({ mensaje: "Actualizado satisfactoriamente!" })
                }).catch(function (err) {
                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                });
        })
    router.route('/app/recursos-humanos/ausencia/:id_ausencia')
        .get(function (req, res) {
            RrhhEmpleadoAusencia.find({
                where: { id: req.params.id_ausencia },
                include: [{ model: Clase, as: 'vehiculo' }, { model: Clase, as: 'estado' }, { model: RrhhClaseAsuencia, as: 'tipoAusencia' }]
            }).then(function (Ausencia) {
                res.json(Ausencia)
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });
        })

    //Notificacion para el supervisor autorizador cuando el supervisado sale
    router.route('/app/recursos-humanos-portero/ausencia')
        .post(async function (req, res) {
            //--------------------------------------------------------
            let verificarEstadoSalida = ((String(req.body.estado.id))==="14438")
            if(verificarEstadoSalida ){
                //obteniendo el ci del autorizador 
                let ci = await obtCiAutorizador(req.body.id)
                //obteniendo el id del equipo movil del autorizador
                await obtenerIdEq(ci)
                //verificando que el id euipo sea valido
                if(idEquipo!=false && idEquipo!=undefined && idEquipo!=null){
                    //obteniendo nombre del autorizado
                    let autorizado =await obtNomAutorizado(req.body.id)
                    //obteniendo la hora y minutos exactos de la salida del supervisado
                    var hoy = new Date();
                    function minutos(){
                        if((Number(hoy.getMinutes()))<10){
                            return "0"+(String(hoy.getMinutes()))
                        }else{
                            return (String(hoy.getMinutes()))
                        }
                    }
                    var hora = hoy.getHours() + ':' + minutos()
                    //estableciendo el contenido de la notificacion
                    let cabeza='Seguimiento de autorización'
                    let cuerpo='El personal con ausencia: '+autorizado+' salió de las instalaciones a las '+ hora
                    //generando la notificaion mediante el onesignal
                    await generandoNotificacion(cabeza, cuerpo)
                    //guardar la notificacion en la base de datos
                    await guardarNot(ci, cabeza, cuerpo)
                }
            }
            //--------------------------------------------------------------------
            RrhhEmpleadoAusencia.update({
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                horas: req.body.horas,
                eliminado: req.body.eliminado,
                id_estado: req.body.estado.id,
                id_portero_salida: req.body.id_portero_salida,
                id_portero_retorno: req.body.id_portero_retorno

            }, {
                    where: { id: req.body.id }

                }).then(function (empleadoAusenciaCreado) {
                    res.json({ mensaje: "Actualizado satisfactoriamente!" })
                }).catch(function (err) {
                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                });
        })

    router.route('/recursos-humanos-portero/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/estado/:estado/fecha/:fecha')
        .get(function (req, res) {
            var condicionPersona = {}, condicionAusencia = { eliminado: false },
                condicionEstado = { nombre_corto: { $in: ['AUT', 'SAL'] } }

            if (req.params.fecha != 0) {
                var inicio = new Date(req.params.fecha); inicio.setHours(0, 0, 0);
                var fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 59);
                condicionAusencia.fecha_inicio = { $between: [inicio, fin] };
            }
            if (req.params.texto_busqueda != 0) {
                condicionPersona = {
                    $or: [
                        {
                            nombre_completo: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        },
                        {
                            ci: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        }
                    ]
                };
            }
            if (req.params.estado != 0) {
                condicionEstado = { nombre_corto: { $in: [req.params.estado] } }
            }
            var datosBusqueda = {
                where: condicionAusencia,

                limit: req.params.items_pagina,
                include: [{model:MedicoPaciente,as:'autorizador',include: [{ model: Persona, as: 'persona'}]},{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{ model: Clase, as: 'cargaHorario', include: [{ model: RrhhEmpresaCargaHorario, as: 'horario', where: { eliminado: false } }] }, {
                        model: MedicoPaciente, as: 'empleado',
                        where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                        include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                    }]
                }, { model: Clase, as: 'estado', where: condicionEstado },
                {
                    model: RrhhClaseAsuencia, as: 'tipoAusencia',
                    include: [{ model: Tipo, as: 'tipo' }]
                }]
            }

            RrhhEmpleadoAusencia.count(datosBusqueda).then(function (datos) {
                datosBusqueda.offset = (req.params.items_pagina * (req.params.pagina - 1))
                if (req.params.items_pagina == 0) {
                    delete datosBusqueda['offset'];
                    delete datosBusqueda['limit'];
                }
                RrhhEmpleadoAusencia.findAll(datosBusqueda).then(function (ausencias) {
                    res.json({ ausencias: ausencias, paginas: Math.ceil(datos / req.params.items_pagina) });
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });
        })
    
    router.route('/recursos-humanos-portero/solitudes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/estado/:estado/fecha/:fecha')
        .get(function (req, res) {
            var condicionPersona = {}, condicionAusencia = { eliminado: false },
                condicionEstado = { nombre_corto: { $in: ['SOL', 'DES'] } }

            if (req.params.fecha != 0) {
                var inicio = new Date(req.params.fecha); inicio.setHours(0, 0, 0);
                var fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 59);
                condicionAusencia.fecha_inicio = { $between: [inicio, fin] };
            }
            if (req.params.texto_busqueda != 0) {
                condicionPersona = {
                    $or: [
                        {
                            nombre_completo: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        },
                        {
                            ci: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        }
                    ]
                };
            }
            if (req.params.estado != 0) {
                condicionEstado = { nombre_corto: { $in: [req.params.estado] } }
            }
            var datosBusqueda = {
                where: condicionAusencia,

                limit: req.params.items_pagina,
                include: [{model:MedicoPaciente,as:'autorizador',include: [{ model: Persona, as: 'persona'}]},{
                    model: RrhhEmpleadoFicha, as: 'ficha',
                    include: [{ model: Clase, as: 'cargaHorario', include: [{ model: RrhhEmpresaCargaHorario, as: 'horario', where: { eliminado: false } }] }, {
                        model: MedicoPaciente, as: 'empleado',
                        where: { id_empresa: req.params.id_empresa, es_empleado: true, eliminado: false },
                        include: [{ model: Persona, as: 'persona', where: condicionPersona }]
                    }]
                }, { model: Clase, as: 'estado', where: condicionEstado },
                {
                    model: RrhhClaseAsuencia, as: 'tipoAusencia',
                    include: [{ model: Tipo, as: 'tipo' }]
                }]
            }

            RrhhEmpleadoAusencia.count(datosBusqueda).then(function (datos) {
                datosBusqueda.offset = (req.params.items_pagina * (req.params.pagina - 1))
                if (req.params.items_pagina == 0) {
                    delete datosBusqueda['offset'];
                    delete datosBusqueda['limit'];
                }
                RrhhEmpleadoAusencia.findAll(datosBusqueda).then(function (ausencias) {
                    res.json({ ausencias: ausencias, paginas: Math.ceil(datos / req.params.items_pagina) });
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });
        })


    router.route("/app/consulta-padre/:id_padre")
        .get(function (req, res) {
            Clase.find({
                where: { id: req.params.id_padre },
                include: [{ model: Clase, as: "padre" }]
            }).then(function (padre) {
                res.json({ padre: padre })
            })
        })

    router.route("/app/consulta-hijos/:id_padre")
        .get(function (req, res) {
            Clase.findAll({
                where: { id_padre: req.params.id_padre },
                include: [{
                    model: Clase, as: "hijos",
                    include: [{
                        model: Clase, as: "hijos",
                        include: [{
                            model: Clase, as: "hijos",
                            include: [{ model: Clase, as: "hijos" }]
                        }]
                    }]
                }]
            }).then(function (hijos) {
                res.json({ hijos: hijos })
            })
        })

        router.route('/app/recursos-humanos-solicitudes-vacacion/empresa/:id_empresa/estado/:estado/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/ficha/:id_ficha')
        .get(function (req, res) {
            var condicionEmpleado = { id_empresa: req.params.id_empresa }
            var condicionFicha = {}
            var condicionEstado = { nombre_corto: { $in: ['SOL', 'AUT', 'DES'] } }
            if (req.params.estado != 0) {
                condicionEstado = { nombre_corto: { $in: [req.params.estado] } }
            }
            var condicionSolicitudVacaciones = { eliminado: false };
            if (req.params.id_ficha != 0){
                var condicionFicha = {id: req.params.id_ficha}
            }
            if (req.params.inicio != 0) {
                var inicio = req.params.inicio + "T00:00:00.000Z"
                var fin = req.params.fin + "T23:59:59.000Z"

                // var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                // var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 0);
                condicionSolicitudVacaciones.fecha_inicio = { $between: [inicio, fin] };
            }
            RrhhEmpleadoSolicitudVacacion.count({
                where: condicionSolicitudVacaciones,
                include: [{ model: Clase, as: 'estado', where: condicionEstado, required:true },
                {
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
                    include: [{ model: Clase, as: 'estado', where: condicionEstado, required:true },
                    {
                        model: RrhhEmpleadoFicha, as: 'ficha', where: condicionFicha, include: [{
                            model: RrhhEmpleadoCargo, as: 'cargos', include: [{ model: Clase, as: 'cargo' }]
                        }, { model: RrhhEmpleadoHistorialVacacion, as: 'historialVacaciones' }, { model: MedicoPaciente, as: 'empleado', required: true, where: condicionEmpleado, include: [{ model: Persona, as: 'persona' }, { model: Clase, as: 'campo' }] }]
                    }]
                }).then(function (solicitudesVacacion) {
                    res.json({ solicitudes: solicitudesVacacion, paginas: Math.ceil(datos / req.params.items_pagina) });
                })
            })
        })

        router.route('/app/recursos-humanos/solicitud-vacacion/ficha/:id_ficha')
        .post(function (req, res) {
            req.body = JSON.parse(req.body.json);
            RrhhEmpleadoSolicitudVacacion.create({
                id_ficha: req.params.id_ficha,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                observacion: req.body.observacion,
                dias:req.body.dias,
                sabado: req.body.sabado,
                inicio_tipo: req.body.inicio_tipo,
                fin_tipo: req.body.fin_tipo,
                eliminado: false,
                domingos: req.body.domingos,
                feriados: req.body.feriados, //dias_Descuento
                fecha_creacion: req.body.fecha_creacion,
                id_estado:req.body.id_estado,
                id_autorizador: req.body.id_autorizador,
                comentario:req.body.comentario
            }).then(function (empleadoVacacionCreado) {

                res.json({ mensaje: "Solicitud de vacación creada Satisfactoriamente!" })
            })
        })
        .put(function (req, res) {
            req.body = JSON.parse(req.body.json);

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
                id_estado:req.body.id_estado,
                id_autorizador: req.body.id_autorizador,
                comentario:req.body.comentario       
            }, {
                where: { id: req.body.id }
            }).then(function (empleadoVacacionActualizada) {
                res.json({ mensaje: "Solicitud de vacación actualizada Satisfactoriamente!" })
            })

        })

        //rutas vacaciones
    router.route('/app/recursos-humanos/vacacion/ficha/:id_ficha')
    .post(function (req, res) {

        req.body = JSON.parse(req.body.json)
    
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
        })
        //----------------------------------------------------------
        //obteniendo el nombre del autorizador
        async function obtNomAut(valor){
            const [metadata] = await sequelize.query('select\
                     b.nombre_completo\
                    from \
                    agil.agil_medico_paciente a, agil.gl_persona b\
                    where \
                    a.codigo = b.ci and a.id='+valor+';')
            return String(metadata[0].nombre_completo)
        }
        //obteniendo el nombre del autorizado
        async function obtNomAutorizado(valor){
            const [metadata] = await sequelize.query('select\
                    d.nombre_completo\
                    from agil.agil_rrhh_empleado_ausencia a , agil.agil_rrhh_empleado_ficha b ,\
                    agil.agil_medico_paciente c,agil.gl_persona d\
                    where a.ficha =b.id and b.id_empleado = c.id and c.codigo = d.ci and a.id='+valor+' LIMIT 1;')
            return String(metadata[0].nombre_completo)
        }

        //obtener ci del supervisado
        async function obteniendoCi( valor){
            const [metadata] = await sequelize.query('select\
                     b.codigo \
                    from \
                    agil.agil_rrhh_empleado_ficha as a , agil.agil_medico_paciente  as b\
                    where \
                    a.id_empleado = b.id and a.id ='+valor+';')
            let ci= Number(metadata[0].codigo)
            await obtenerIdEq(ci)
            return ci

        }
        //obtner el id del equipo movil 
        async function obtenerIdEq(ci){
            //cambiar url por el link donde corre el servidor de la app movil
            let url ='http://api-prueba-new.herokuapp.com/api/getIdEquipo/'+ci
            await axios.get(url).then(function(response){
                idEquipo = response.data
            }).catch(function(error){
                idEquipo = false
            })
        }
        //generando notificaciones 
        async function generandoNotificacion(cabeza, cuerpo){
            var sendNotification = function(data) {
            var headers = {
              "Content-Type": "application/json; charset=utf-8",
              //ojo con cambiar esto con los nuevos datos de onesignal
              //cabe mencionar que se debe descargar el archivo del firebase y subir al ionic 
              //"Authorization": "Basic ODViMTM0MGItZDVjYy00ODgwLTk4YmItMjZhNmEyNDFmZmIy"
              "Authorization": "Basic NTk1MmZlNjItMWE0YS00MGRlLTg5MGYtM2QyODI4Y2NiNjVm"
            };
            //------------------------------------------
            var options = {
              host: "onesignal.com",
              port: 443,
              path: "/api/v1/notifications",
              method: "POST",
              headers: headers
            };
            //----------------------------------------------
       
            var https = require('https');
            var req = https.request(options, function(res) {  
              res.on('data', function(data) {
              });
            });
            //--------------------------------------------
            req.on('error', function(e) {
              console.log("-------------------------------------------ERROR:--------------------------------------");
              //console.log(e);
            });
            //-----------------------------------------------
            req.write(JSON.stringify(data));
            req.end();
            };
            var message = { 
            //ojo con cambiar esto con los nuevos datos de onesignal
            //app_id: "0e757101-1b73-4e2e-93d9-a1f1bcf75002",
            app_id: "bd522930-3fc5-4982-8158-42a0c6539aa9",
            contents: {"en": cuerpo},
            headings:{"en": cabeza},
            //OJO ONESIGNAL ES EL ENCARGADO DE ASIGNAR ESTOS ID 
            include_player_ids:[String(idEquipo)]
            };  
            sendNotification(message);
            console.log("---------------------------------------------")
            console.log("La notificacion fue enviada al equipo "+String(idEquipo))
            console.log("---------------------------------------------")
        }
        //obteniendo ci del autorizador
        async function obtCiAutorizador(valor){
            const [metadata] = await sequelize.query('select\
                    b.codigo\
                    from \
                    agil.agil_rrhh_empleado_ausencia a,agil.agil_medico_paciente b\
                    where \
                    a.autorizador = b.id and a.id='+valor+';')
            return Number(metadata[0].codigo)
        }
        //obteniendo el periodo de tiempo de la ausencia 
       async function obtHoraSE(valor){
            const [metadata] = await sequelize.query('select\
                    substring(fecha_inicio,11,6) as inicio, substring(fecha_fin,11,6) as fin\
                    from \
                    agil.agil_rrhh_empleado_ausencia\
                    where \
                    agil.agil_rrhh_empleado_ausencia.id='+valor+';')
            return String(metadata[0].inicio)+" a"+String(metadata[0].fin)
        }
        //guardando notificacion en la base de datos
        async function guardarNot(ci, cabeza, cuerpo){
            //cambiar url por el link donde corre el servidor de la app movil
            let url ='http://api-prueba-new.herokuapp.com/api/guardarNotificaciones'
            await axios.post(url, {
                    ciNot:String(ci),
                    cabezaNot:String(cabeza),
                    cuerpoNot:String(cuerpo)
            }).then(function (response) {
                    return true
            }).catch(function(err) {
                    return false
            })
        }

}

