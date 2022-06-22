module.exports = function (router, sequelize, Sequelize, Persona, Cliente, AliasClienteEmpresa, ComensalesClienteEmpresa, GerenciasClienteEmpresa, horarioComidasClienteEmpresa, PrecioComidasClienteEmpresa, HistorialComidaClienteEmpresa, Usuario,
    ComensalesMarcacionesClienteEmpresa, ensureAuthorizedlogged) {
    mesesFiltro = [{ id: 1, nombre: "Enero" }, { id: 2, nombre: "Febrero" }, { id: 3, nombre: "Marzo" }, { id: 4, nombre: "Abril" }, { id: 5, nombre: "Mayo" }, { id: 6, nombre: "Junio" }, { id: 7, nombre: "Julio" }, { id: 8, nombre: "Agosto" },
    { id: 9, nombre: "Septiembre" }, { id: 10, nombre: "Octubre" }, { id: 11, nombre: "Noviembre" }, { id: 12, nombre: "Diciembre" }];
    function crearAlias(alias, empresa, t) {
        if (alias.id) {
            if (alias.eliminado) {
                return HistorialComidaClienteEmpresa.findAll({
                    where: { id_cliente: alias.id_cliente },
                    limit: 1
                }).then((busqueda) => {
                    if (busqueda.length > 0) {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'No se puede eliminar porque ya existen registros asociados a ' + alias.nombre, tipo: 'Error' })
                        })
                    } else {
                        return ComensalesClienteEmpresa.findAll({
                            where: { id_cliente: alias.id_cliente },
                            limit: 1
                        }).then((comensal) => {
                            if (comensal.length > 0) {
                                return new Promise(function (fullfil, reject) {
                                    fullfil({ hasErr: true, mensaje: 'No se puede eliminar porque ya existen registros asociados a ' + alias.nombre, tipo: 'Error' })
                                })
                            } else {
                                return AliasClienteEmpresa.update({ eliminado: true }, {
                                    where: { id: alias.id_cliente },
                                    transaction: t
                                }).then((itemEliminado) => {
                                    if (itemEliminado.length > 0) {
                                        if (itemEliminado[0] === 1) {
                                            return new Promise((f, r) => f({ mensaje: 'Item eliminado satisfactoriamente' }))
                                        } else {
                                            return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                                        }
                                    } else {
                                        return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                                    }
                                }).catch((err) => new Promise((f, r) => f({ hasErr: true, mensaje: err.stack, tipo: 'Error' })))
                            }
                        }).catch((err) => {
                            return new Promise(function (fullfil, reject) {
                                fullfil({ hasErr: true, mensaje: err.stack, tipo: 'Error' })
                            })
                        })
                    }
                }).catch((err) => {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, tipo: 'Error' })
                    })
                })
            } else {
                return AliasClienteEmpresa.update({
                    codigo: alias.codigo.trim(),
                    id_cliente: alias.empresaCliente.id,
                    nombre: alias.nombre.trim(),
                    id_empresa: empresa
                }, { where: { id: alias.id }, transaction: t })
            }
        } else {
            return AliasClienteEmpresa.create({
                codigo: alias.codigo.trim(),
                id_cliente: alias.empresaCliente.id,
                nombre: alias.nombre.trim(),
                id_empresa: empresa
            }, { transaction: t })
        }
    }
    function crearGerencia(gerencia, empresa, t) {
        if (gerencia.id) {
            if (gerencia.eliminado) {
                return GerenciasClienteEmpresa.update({ eliminado: true }, {
                    where: { id: gerencia.id }, transaction: t
                }).then((itemEliminado) => {
                    if (itemEliminado.length > 0) {
                        if (itemEliminado[0] === 1) {
                            return new Promise((f, r) => f({ mensaje: 'Item eliminado satisfactoriamente' }))
                        } else {
                            return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                        }
                    } else {
                        return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                    }
                }).catch((err) => new Promise((f, r) => f({ hasErr: true, mensaje: err.stack, tipo: 'Error' })))
            } else {
                return GerenciasClienteEmpresa.update({
                    codigo: gerencia.codigo.trim(),
                    id_cliente: gerencia.empresaCliente.id,
                    nombre: gerencia.nombre && gerencia.nombre.trim() || 'Error al guardar',
                    id_empresa: empresa,
                    identificador_equipo: gerencia.lectora && gerencia.lectora.trim() || ''
                }, { where: { id: gerencia.id }, transaction: t })
            }
        } else {
            return GerenciasClienteEmpresa.create({
                codigo: gerencia.codigo && gerencia.codigo.trim() || 'NANAN',
                id_cliente: gerencia.empresaCliente.id,
                nombre: gerencia.nombre && gerencia.nombre.trim() || 'Sin asignación',
                id_empresa: empresa,
                identificador_equipo: gerencia.lectora && gerencia.lectora.trim() || ''
            }, { transaction: t })
        }
    }
    function crearComensal(comensal, empresa, t, i) {
        if (comensal.id) {
            if (comensal.eliminado) {
                return ComensalesClienteEmpresa.update({ eliminado: true }, {
                    where: { id: comensal.id }, transaction: t
                }).then((itemEliminado) => {
                    if (itemEliminado.length > 0) {
                        if (itemEliminado[0] === 1) {
                            return new Promise((f, r) => f({ mensaje: 'Item eliminado satisfactoriamente' }))
                        } else {
                            return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                        }
                    } else {
                        return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                    }
                }).catch((err) => new Promise((f, r) => f({ hasErr: true, mensaje: err.stack, tipo: 'Error' })))
            } else {
                return ComensalesClienteEmpresa.update({
                    codigo: comensal.codigo.trim(),
                    tarjeta: comensal.tarjeta ? '' + comensal.tarjeta : 'error de ingreso',
                    id_cliente: comensal.empresaCliente.id,
                    nombre: comensal.nombre.trim(),
                    id_empresa: empresa,
                    id_gerencia: comensal.gerencia ? comensal.gerencia.id : null,
                    tipo: comensal.tipo.trim()
                }, { where: { id: comensal.id }, transaction: t })
            }
        } else {
            return ComensalesClienteEmpresa.create({
                codigo: comensal.codigo.trim(),
                tarjeta: comensal.tarjeta ? '' + comensal.tarjeta : 'error de ingreso',
                id_cliente: comensal.empresaCliente.id,
                nombre: comensal.nombre.trim(),
                id_empresa: empresa,
                id_gerencia: comensal.gerencia ? comensal.gerencia.id : null,
                tipo: comensal.tipo.trim()
            }, { transaction: t }).then(function (comensalCreado) {
                return new Promise(function (fullfil, reject) {
                    fullfil(comensalCreado)
                }).catch(function (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Registro ya existente: Comensal ' + comensal.nombre + ' Codigo:' + comensal.codigo, index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
            })
        }
    }
    function crearComida(comida, empresa, t) {
        let horas_final = (comida.final.split(':')[2].indexOf('P') > -1 || comida.final.split(':')[2].indexOf('p') > -1 ? (parseInt(comida.final.split(':')[0]) + 12) : comida.final.split(':')[0]) + ':' + comida.final.split(':')[1] + ':59'
        let horas_inicio = (comida.inicio.split(':')[2].indexOf('P') > -1 || comida.inicio.split(':')[2].indexOf('p') > -1 ? (parseInt(comida.inicio.split(':')[0]) + 12) : comida.inicio.split(':')[0]) + ':' + comida.inicio.split(':')[1] + ':00'
        comida.final = horas_final
        comida.inicio = horas_inicio
        if (comida.id) {
            if (comida.eliminado) {
                return horarioComidasClienteEmpresa.update({ eliminado: true }, {
                    where: { id: comida.id }, transaction: t
                }).then((itemEliminado) => {
                    if (itemEliminado.length > 0) {
                        if (itemEliminado[0] === 1) {
                            return new Promise((f, r) => f({ mensaje: 'Item eliminado satisfactoriamente' }))
                        } else {
                            return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                        }
                    } else {
                        return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                    }
                }).catch((err) => new Promise((f, r) => f({ hasErr: true, mensaje: err.stack, tipo: 'Error' })))
            } else {
                return horarioComidasClienteEmpresa.update({
                    codigo: comida.codigo.trim(),
                    id_cliente: comida.empresaCliente.id,
                    nombre: comida.nombre.trim(),
                    id_empresa: empresa,
                    inicio: comida.inicio,
                    final: comida.final
                }, { where: { id: comida.id }, transaction: t })
            }
        } else {
            return horarioComidasClienteEmpresa.create({
                codigo: comida.codigo.trim(),
                id_cliente: comida.empresaCliente.id,
                nombre: comida.nombre.trim(),
                id_empresa: empresa,
                inicio: comida.inicio,
                final: comida.final
            }, { transaction: t })
        }
    }
    function crearPrecioComida(precioComida, empresa, t, i) {
        if (precioComida.id) {
            if (precioComida.eliminado) {
                return PrecioComidasClienteEmpresa.update({ eliminado: true }, {
                    where: { id: precioComida.id }, transaction: t
                }).then((itemEliminado) => {
                    if (itemEliminado.length > 0) {
                        if (itemEliminado[0] === 1) {
                            return new Promise((f, r) => f({ mensaje: 'Item eliminado satisfactoriamente' }))
                        } else {
                            return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                        }
                    } else {
                        return new Promise((f, r) => f({ mensaje: 'Item no eliminado', hasErr: true }))
                    }
                }).catch((err) => new Promise((f, r) => f({ hasErr: true, mensaje: err.stack, tipo: 'Error' })))
            } else {
                return PrecioComidasClienteEmpresa.update({
                    codigo: precioComida.codigo.trim(),
                    id_cliente: precioComida.empresaCliente.id,
                    id_comida: precioComida.comida.id,
                    id_empresa: empresa,
                    precio: parseFloat(precioComida.precio)
                }, { where: { id: precioComida.id }, transaction: t })
            }
        } else {
            return PrecioComidasClienteEmpresa.create({
                codigo: precioComida.codigo.trim(),
                id_cliente: precioComida.empresaCliente.id,
                id_comida: precioComida.comida.id,
                id_empresa: empresa,
                precio: parseFloat(precioComida.precio)
            }, { transaction: t }).catch(function (err) {
                if (err.name === "SequelizeUniqueConstraintError") {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: 'Registro ya existente: Comida: ' + precioComida.comida.nombre + ' Codigo:' + precioComida.codigo + ' Cliente: ' + precioComida.empresaCliente.razon_social, index: i + 2, tipo: 'Error' })
                    })
                } else {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                    })
                }

            })
        }
    }
    function crearHistorial(historial, empresa, t, i) {
        if (historial.fecha_hora === null || historial.fecha_hora === undefined || historial.fecha_hora === "Invalid Date" || historial.fecha_hora === NaN) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: 'Error al obtener fecha y hora del registro en linea ' + (i + 2) + '.', index: i + 2, tipo: 'Error' })
            })
        }
        // var ffecha = new Date(historial.fecha_hora).toLocaleDateString() + ' ' + new Date(historial.fecha_hora).toLocaleTimeString()//.split('T').join(' ').split('.000Z').join('')
        if (historial.id) {
            if (historial.eliminado) {
                return HistorialComidaClienteEmpresa.update({ eliminado: true }, {
                    where: { id: historial.id }
                }, { transaction: t }).then((eliminado) => {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: 'Historial eliminado ' + historial.fecha, index: i + 2, tipo: 'Eliminación' })
                    })
                }).catch(function (err) {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                    })
                })
            } else {
                return HistorialComidaClienteEmpresa.update({
                    tarjeta: historial.tarjeta.trim(),
                    id_cliente: historial.alias.id_cliente,
                    id_comensal: historial.comensal.id,
                    id_empresa: empresa,
                    id_gerencia: historial.gerencia ? historial.gerencia.id : null,
                    id_comida: historial.comida.id,
                    fecha: historial.fecha_hora.split('T').join(' ').split('.000Z').join(''),
                    id_usuario: historial.id_usuario,
                    identificador_equipo: historial.lectora,
                    documento: historial.documento,
                    precio: historial.comida.precio ? historial.comida.precio.length > 0 ? historial.comida.precio[0].precio : null : null,
                    fecha_texto: historial.fecha_hora.split('T').join(' ').split('.000Z').join(''),
                    estado: historial.habilitado === undefined || historial.habilitado === null ? true : historial.habilitado,
                    verificado: historial.verificado !== null && historial.verificado !== undefined ? historial.verificado : null,
                    fecha_verificado: historial.verificado !== null && historial.verificado !== undefined ? new Date() : null,
                    verificado_por: historial.verificado !== null && historial.verificado !== undefined ? historial.id_usuario : null,
                    descartado: historial.descartado ? historial.descartado : false
                },
                    { where: { id: historial.id }, transaction: t }
                ).then(function (historialActualizado) {
                    return new Promise((f, r) => f(historial))
                    return crearMarcacion(historial, empresa, t)
                }).catch(function (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Registro ya existente: Comensal ' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
            }
        } else {
            const fecha = new Date(historial.fecha_hora.split('T').join(' ').split('.000Z').join(''))
            return HistorialComidaClienteEmpresa.create({
                tarjeta: historial.tarjeta.trim(),
                id_cliente: historial.alias.id_cliente,
                id_comensal: historial.comensal.id,
                id_empresa: empresa,
                id_gerencia: historial.gerencia ? historial.gerencia.id : (historial.comensal.gerencia ? historial.comensal.gerencia.id : null),
                id_comida: historial.comida.id,
                fecha: fecha,
                id_usuario: historial.id_usuario,
                identificador_equipo: historial.lectora,
                documento: (historial.documento ? historial.documento + new Date().toISOString().split('T')[0] : 'Marcaciones Faltantes-' + historial.fecha_hora.split('T')[0]),
                precio: historial.comida.precio ? historial.comida.precio.length > 0 ? historial.comida.precio[0].precio : null : null,
                fecha_texto: historial.fecha_hora.split('T').join(' ').split('.000Z')[0],
                estado: historial.habilitado === undefined || historial.habilitado === null ? true : historial.habilitado,
                verificado: historial.verificado !== null && historial.verificado !== undefined ? historial.verificado : null,
                fecha_verificado: historial.verificado !== null && historial.verificado !== undefined ? new Date() : null,
                verificado_por: historial.verificado !== null && historial.verificado !== undefined ? historial.id_usuario : null,
                descartado: historial.descartado ? historial.descartado : false
            },
                {
                    transaction: t
                }).then(function (historialCreado, creado) {
                    return new Promise((f, r) => f(historialCreado))
                }).catch(function (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Registro ya existente:'+(i + 2)+' Comensal ' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error' })
                        })
                    } else if(err.name === "SequelizeValidationError") {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Error en fecha:'+(i + 2)+' Comensal ' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error' })
                        })
                    }
                    else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: err.name +' '+(i + 2)+' '+ historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
        }
    }
    function crearEliminacionHistorial(historial, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas) {
        if (historial.fecha_hora === null || historial.fecha_hora === undefined || historial.fecha_hora === "Invalid Date" || historial.fecha_hora === NaN) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: 'Error al obtener fecha y hora del registro en linea ' + (i + 2) + '.', index: i + 2, tipo: 'Error' })
            })
        }
        var ffecha = new Date(historial.fecha_hora).toLocaleDateString() + ' ' + new Date(historial.fecha_hora).toLocaleTimeString()//.split('T').join(' ').split('.000Z').join('')
        let fecha = new Date(historial.fecha_hora)
        fecha.setHours(fecha.getHours() + 4)
        return HistorialComidaClienteEmpresa.findAll({
            where: {
                // tarjeta: historial.tarjeta.trim(),
                id_cliente: historial.alias.id_cliente,
                id_comensal: historial.comensal.id,
                id_empresa: empresa,
                // id_gerencia: historial.gerencia ? historial.gerencia.id : (historial.comensal.gerencia ? historial.comensal.gerencia.id : null),
                // id_comida: historial.comida.id,
                fecha: historial.fecha_hora.split('T').join(' ').split('.000Z').join(''),
                id_usuario: historial.id_usuario,
                identificador_equipo: historial.lectora,
                // documento: (historial.documento ? historial.documento + new Date().toISOString().split('T')[0] : 'Marcaciones Faltantes-' + historial.fecha_hora.split('T')[0]),
                // precio: historial.comida.precio ? historial.comida.precio.length > 0 ? historial.comida.precio[0].precio : null : null,
                // fecha_texto: new Date(historial.fecha_hora).toLocaleDateString() + ' ' + new Date(historial.fecha_hora).toLocaleTimeString(),//.split('T').join(' ').split('.000Z').join(''),//historial.fecha.split('T')[0],
                // estado: historial.habilitado === undefined || historial.habilitado === null ? true : historial.habilitado,
                // verificado: historial.verificado !== null && historial.verificado !== undefined ? historial.verificado : null,
                // fecha_verificado: historial.verificado !== null && historial.verificado !== undefined ? new Date() : null,
                // verificado_por: historial.verificado !== null && historial.verificado !== undefined ? historial.id_usuario : null,
                // descartado: historial.descartado ? historial.descartado : false
            },
            transaction: t
        }).then(function (historialEncontrado) {
            if (historialEncontrado.length === 1) {
                return HistorialComidaClienteEmpresa.destroy({
                    where: { id: historialEncontrado.id },
                    transaction: t
                }).then((eliminado) => {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: 'Historial eliminado ' + historial.fecha, index: i + 2, tipo: 'Eliminación' })
                    })
                }).catch(function (err) {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                    })
                })
                // return verificarDatosHistorialExcel(historialCopy, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas)
            }
            return new Promise((f, r) => f({ mensaje: 'Este registro parece no estar afectado, o puede que contenga otro tipo de error.' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error', hasErr: true }))
        }).catch(function (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'Registro ya existente: Comensal ' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error' })
                })
            } else {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                })
            }
        })
    }
    function verificarDatosHistorialExcel(historial, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas) {
        var erro = false
        var promises = []
        return AliasClienteEmpresa.find({
            where: { $or: [{ nombre: historial.alias.trim() }, { nombre: historial.alias }], id_empresa: empresa },
            transaction: t
        }).then(function (alias) {
            if (alias) {
                historial.alias = alias.dataValues
                return ComensalesClienteEmpresa.find({
                    where: { $or: [{ nombre: historial.nombre.trim() }, { nombre: historial.nombre }], id_empresa: empresa, id_cliente: historial.alias.id_cliente },
                    include: [{ model: GerenciasClienteEmpresa, as: 'gerencia' }],
                    transaction: t
                }).then(function (comensal) {
                    if (comensal) {
                        historial.fecha_texto = ""
                        if (!historial.fecha_hora) return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Error de fecha/hora en registro excel de ' + comensal.nombre, index: i + 2, tipo: 'Error' })
                        })
                        if (!historial.fecha) {
                            historial.fecha_texto, historial.fecha = historial.fecha_hora//extraerFechaExcel(historial.fecha_hora)
                        }
                        const condicionTiempo = { id_empresa: empresa, id_cliente: historial.alias.id_cliente }//.split('T')[1].split('.')[0]  //.split('T')[1].split('.')[0] }, final: { gte: historial.fecha_hora.split('T')[1].split('.')[0] }, id_empresa: empresa, id_cliente: historial.alias.id_cliente }
                        historial.comensal = comensal.dataValues
                        return horarioComidasClienteEmpresa.findAll({
                            where: condicionTiempo,
                            include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }],
                            transaction: t
                        }).then(function (listacomida) {
                            if (!listacomida) return new Promise(function (fullfil, reject) {
                                fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos horarios/precios de comida comensal ' + comensal.nombre, index: i + 2, tipo: 'Error' })
                            })
                            let comidaencontrada = []
                            for (let index = 0; index < listacomida.length; index++) {
                                const inicio_comida = new Date(historial.fecha_hora.split('T')[0] + ' ' + listacomida[index].inicio)
                                const fin_comida = new Date(historial.fecha_hora.split('T')[0] + ' ' + listacomida[index].final)
                                const hora = new Date(historial.fecha_hora.split('T')[0] + ' ' + historial.fecha_hora.split('T')[1].split('.')[0])
                                if (hora >= inicio_comida - 10000 && hora <= fin_comida) {
                                    comidaencontrada.push(listacomida[index])
                                }

                            }
                            const comida = comidaencontrada[0]
                            historial.comida = comida ? comida.dataValues : { id: null }
                            var condicionGerenciaComensal = historial.comensal.gerencia ? { nombre: historial.comensal.gerencia.nombre.trim() } : { identificador_equipo: historial.lectora.trim() }
                            return GerenciasClienteEmpresa.find({
                                where: condicionGerenciaComensal
                            }).then(function (gerenciaEncontrada) {
                                if (gerenciaEncontrada) {
                                    historial.gerencia = gerenciaEncontrada.dataValues
                                    return crearHistorial(historial, empresa, t, i)
                                } else {
                                    historial.gerencia = null
                                    return crearHistorial(historial, empresa, t, i)
                                }
                            }).catch(function (err) {
                                return new Promise(function (fullfil, reject) {
                                    fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                                })
                            })
                        }).catch(function (err) {
                            return new Promise(function (fullfil, reject) {
                                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                            })
                        })
                    } else {
                        erro = true
                        if (!comensalesNoRegistrados.some(function (comensal) {
                            return comensal === historial.nombre
                        })) {
                            comensalesNoRegistrados.push(historial.nombre + ' Empresa: ' + historial.alias.nombre)
                        }
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos el registro comensal : ' + historial.nombre + ' Empresa: ' + historial.alias.nombre, index: i + 2, tipo: 'Comensal -> No registrado.' })
                        })
                    }
                }).catch(function (err) {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                    })
                })
            } else {
                erro = true
                if (!empresasNoRegistradas.some(function (empresa) {
                    return empresa === historial.alias
                })) {
                    empresasNoRegistradas.push(historial.alias)
                }

                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos el registro alias empresa -> NAME: ' + historial.alias, index: i + 2, tipo: 'Empresa -> alias -> NAME' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function clone(obj) {
        if (obj == null || typeof (obj) != 'object')
            return obj;

        var temp = new obj.constructor();
        for (var key in obj)
            temp[key] = clone(obj[key]);

        return temp;
    }
    function verificarEliminacionDatosHistorialExcel(historial, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas) {
        var erro = false
        var promises = []
        // let historialCopy = clone(historial)
        return AliasClienteEmpresa.find({
            where: { nombre: historial.alias.trim(), id_empresa: empresa },
            transaction: t
        }).then(function (alias) {
            if (alias) {
                historial.alias = alias.dataValues
                return ComensalesClienteEmpresa.find({
                    where: { nombre: historial.nombre.trim(), id_empresa: empresa, id_cliente: historial.alias.id_cliente },
                    include: [{ model: GerenciasClienteEmpresa, as: 'gerencia' }],
                    transaction: t
                }).then(function (comensal) {
                    if (comensal) {
                        historial.fecha_texto = ""
                        if (!historial.fecha) {
                            historial.fecha_texto, historial.fecha = historial.fecha_hora//extraerFechaExcel(historial.fecha_hora)
                        }
                        var condicionTiempo = { inicio: { lte: new Date(historial.fecha_hora).toLocaleTimeString() }, final: { gte: new Date(historial.fecha_hora).toLocaleTimeString() }, id_empresa: empresa, id_cliente: historial.alias.id_cliente }//.split('T')[1].split('.')[0]  //.split('T')[1].split('.')[0] }, final: { gte: historial.fecha_hora.split('T')[1].split('.')[0] }, id_empresa: empresa, id_cliente: historial.alias.id_cliente }
                        historial.comensal = comensal.dataValues
                        return horarioComidasClienteEmpresa.find({
                            having: condicionTiempo,
                            include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }],
                            transaction: t
                        }).then(function (comida) {
                            historial.comida = comida ? comida.dataValues : { id: null }
                            var condicionGerenciaComensal = historial.comensal.gerencia ? { nombre: historial.comensal.gerencia.nombre.trim() } : { identificador_equipo: historial.lectora.trim() }
                            return GerenciasClienteEmpresa.find({
                                where: condicionGerenciaComensal
                            }).then(function (gerenciaEncontrada) {
                                if (gerenciaEncontrada) {
                                    historial.gerencia = gerenciaEncontrada.dataValues
                                    return crearEliminacionHistorial(historial, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas)
                                } else {
                                    historial.gerencia = null
                                    return crearEliminacionHistorial(historial, empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas)
                                }
                            }).catch(function (err) {
                                return new Promise(function (fullfil, reject) {
                                    fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                                })
                            })
                        }).catch(function (err) {
                            return new Promise(function (fullfil, reject) {
                                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                            })
                        })
                    } else {
                        erro = true
                        if (!comensalesNoRegistrados.some(function (comensal) {
                            return comensal === historial.nombre
                        })) {
                            comensalesNoRegistrados.push(historial.nombre + ' Empresa: ' + historial.alias.nombre)
                        }
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos el registro comensal : ' + historial.nombre + ' Empresa: ' + historial.alias.nombre, index: i + 2, tipo: 'Comensal -> No registrado.' })
                        })
                    }
                }).catch(function (err) {
                    return new Promise(function (fullfil, reject) {
                        fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                    })
                })
            } else {
                erro = true
                if (!empresasNoRegistradas.some(function (empresa) {
                    return empresa === historial.alias
                })) {
                    empresasNoRegistradas.push(historial.alias)
                }

                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos el registro alias empresa -> NAME: ' + historial.alias, index: i + 2, tipo: 'Empresa -> alias -> NAME' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function verificarDatosComensalExcel(comensal, empresa, t, i) {
        return AliasClienteEmpresa.find({
            where: { nombre: comensal.tipo.trim(), id_empresa: empresa },
            transaction: t
        }).then(function (alias) {
            if (alias) {
                comensal.empresaCliente = { id: alias.dataValues.id_cliente }
                return ComensalesClienteEmpresa.find({
                    where: { codigo: comensal.codigo.trim(), id_empresa: empresa, id_cliente: comensal.empresaCliente.id },
                    include: [{ model: GerenciasClienteEmpresa, as: 'gerencia' }],
                    transaction: t
                }).then(function (comensalEncontrado) {
                    if (comensalEncontrado) {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'El código ' + comensal.codigo + ' ya existe en la base de datos', index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return GerenciasClienteEmpresa.findOrCreate({
                            where: { nombre: comensal.gerencia.trim(), id_empresa: empresa, id_cliente: comensal.empresaCliente.id },
                            defaults: {
                                id_cliente: comensal.empresaCliente.id,
                                nombre: comensal.gerencia.trim(),
                                id_empresa: empresa,
                            },
                            transaction: t
                        }).spread(function (gerenciaEncontrada, created) {
                            comensal.gerencia = gerenciaEncontrada ? gerenciaEncontrada.dataValues : { id: null, nombre: 'Sin asignación' }
                            return crearComensal(comensal, empresa, t, i)
                        }).catch(function (err) {
                            if (err.name === "SequelizeUniqueConstraintError") {
                                return GerenciasClienteEmpresa.find({
                                    where: { nombre: err.fields.nombre, id_empresa: empresa, id_cliente: comensal.empresaCliente.id },
                                    transaction: t
                                }).then(function (gerenciaEncontrada) {
                                    comensal.gerencia = gerenciaEncontrada ? gerenciaEncontrada.dataValues : { id: null, nombre: 'Sin asignación' }
                                    return crearComensal(comensal, empresa, t, i)
                                })
                            } else {
                                return new Promise(function (fullfil, reject) {
                                    fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                                })
                            }
                        })
                    }
                }).catch(function (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'Registro ya existente: Codigo ' + err.fields.codigo_cliente_tipo.split('-')[1] + ' Empresa:' + err.fields.codigo_cliente_tipo.split('-')[2], index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
            } else {
                erro = true
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra en la Base de Datos el registro alias empresa -> NAME: ' + comensal.alias, index: i + 2, tipo: 'Empresa -> alias -> NAME' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function verificarDatosAliasExcel(alias, empresa, t, i) {
        return AliasClienteEmpresa.find({
            where: { $or: [{ nombre: { $like: alias.nombre.trim() + '%' } }, { codigo: alias.codigo.trim() }], id_empresa: empresa },
            transaction: t
        }).then(function (aliasEncontrado) {
            if (aliasEncontrado) {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'El código y/o alias NAME:' + alias.nombre + ' código: ' + alias.codigo + ' ya existe en la base de datos', index: i + 2, tipo: 'Error' })
                })
            } else {
                return Cliente.find({
                    where: { razon_social: { $like: alias.empresaCliente.trim() + '%' }, id_empresa: empresa },
                    transaction: t
                }).then(function (clienteEncontrado) {
                    if (clienteEncontrado) {
                        alias.empresaCliente = clienteEncontrado
                        return crearAlias(alias, empresa, t)
                    } else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'No se encuentra la información del cliente/empresa: ' + alias.empresaCliente, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function verificarDatosGerenciasExcel(gerencia, empresa, t, i) {
        return Cliente.find({
            where: { razon_social: { $like: gerencia.empresaCliente + '%' } },
            transaction: t
        }).then(function (aliasEncontrado) {
            if (aliasEncontrado) {
                gerencia.empresaCliente = aliasEncontrado.dataValues
                return GerenciasClienteEmpresa.find({
                    where: { $or: [{ nombre: { $like: gerencia.nombre.trim() + '%' }, codigo: gerencia.codigo.trim() }], id_empresa: empresa },
                    transaction: t
                }).then(function (gerenciaEncontrado) {
                    if (gerenciaEncontrado) {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'El código y/o gerencia NAME:' + gerencia.nombre + ' código: ' + gerencia.codigo + ' ya existe en la base de datos', index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return crearGerencia(gerencia, empresa, t)
                    }
                })
            } else {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra la información del cliente/empresa: ' + gerencia.empresaCliente, index: i + 2, tipo: 'Error' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function verificarDatosComidasExcel(comida, empresa, t, i) {
        return Cliente.find({
            where: { razon_social: { $like: comida.empresaCliente.trim() + "%" } },
            transaction: t
        }).then(function (aliasEncontrado) {
            if (aliasEncontrado) {
                comida.empresaCliente = aliasEncontrado.dataValues
                return horarioComidasClienteEmpresa.find({
                    where: { $or: [{ nombre: { $like: comida.nombre.trim() + "%" }, codigo: comida.codigo.trim() }], id_empresa: empresa, id_cliente: aliasEncontrado.id },
                    transaction: t
                }).then(function (comidaEncontrada) {
                    if (comidaEncontrada) {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'El código y/o comida Nombre:' + comida.nombre + ' código: ' + comida.codigo + ' ya existe en la base de datos', index: i + 2, tipo: 'Error' })
                        })
                    } else {
                        return crearComida(comida, empresa, t)
                    }
                })
            } else {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra la información del cliente/empresa: ' + comida.empresaCliente, index: i + 2, tipo: 'Error' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function verificarDatosPreciosExcel(precio, empresa, t, i) {
        return Cliente.find({
            where: { razon_social: { $like: precio.empresaCliente + '%' } },
            transaction: t
        }).then(function (aliasEncontrado) {
            if (aliasEncontrado) {
                precio.empresaCliente = aliasEncontrado.dataValues
                return horarioComidasClienteEmpresa.find({
                    where: { nombre: { $like: precio.nombre.trim() + '%' }, id_empresa: empresa, id_cliente: precio.empresaCliente.id },
                    transaction: t
                }).then(function (comidaEncontrada) {
                    if (comidaEncontrada) {
                        precio.comida = comidaEncontrada.dataValues
                        return crearPrecioComida(precio, empresa, t, i)
                    } else {
                        return new Promise(function (fullfil, reject) {
                            fullfil({ hasErr: true, mensaje: 'No se encuentra la información del comida/empresa: ' + precio.nombre, index: i + 2, tipo: 'Error' })
                        })
                    }
                })
            } else {
                return new Promise(function (fullfil, reject) {
                    fullfil({ hasErr: true, mensaje: 'No se encuentra la información del cliente/empresa: ' + precio.empresaCliente, index: i + 2, tipo: 'Error' })
                })
            }
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                fullfil({ hasErr: true, mensaje: err.stack, index: i + 2, tipo: 'Error' })
            })
        })
    }
    function extraerFechaExcel(datoFecha) {
        var horas = datoFecha.split(' ')[datoFecha.split(' ').length - 1]
        var fecha = datoFecha.split(' ')[0].split('/').reverse()
        if (horas.indexOf('AM') > 0) {
            horas = horas.split('A')[0].split(':')
        } else if (horas.indexOf('PM') > 0) {
            horas = horas.split('P')[0].split(':')
            if ((parseInt(horas[0])) < 12) {
                horas[0] = (parseInt(horas[0]) + 12) + ''
            }
        }
        var fechaCompleta = fecha[0] + '-' + (fecha[2].length == 2 ? fecha[2] : '0' + fecha[2]) + '-' + (fecha[1].length == 2 ? fecha[1] : '0' + fecha[1]) + 'T' + (horas[0].length == 2 ? horas[0] : '0' + horas[0]) + ':' + (horas[1].length == 2 ? horas[1] : '0' + horas[1]) + ':' + (horas[2].length == 2 ? horas[2] : '0' + horas[2]) + '.000Z'
        return fechaCompleta, new Date(fechaCompleta).toISOString()
    }
    router.route('/cliente/empresa/gerencias/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                for (let i = 0; i < req.body.length; i++) {
                    promises.push(crearGerencia(req.body[i], req.params.id_empresa, t))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ mensaje: 'Guardado correctamente.', lista: result })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            if (req.params.id_cliente != "0") {
                condicion.id_cliente = req.params.id_cliente
            }
            GerenciasClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }]
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ lista: result })
                } else {
                    sequelize.transaction(function (t) {
                        var gerencia = { codigo: 'NANAN', nombre: 'Sin asignación', empresaCliente: { id: req.params.id_cliente } }
                        return crearGerencia(gerencia, req.params.id_empresa, t)
                    }).then(function (resulta) {
                        res.json({ lista: [resulta] })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, hasErr: true })
                    })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/cliente/empresa/alias/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                for (let i = 0; i < req.body.length; i++) {
                    promises.push(crearAlias(req.body[i], req.params.id_empresa, t))
                }
                return Promise.all(promises)
            }).then(function (result) {
                let errorsCount = result.reduce((acc, actual) => {
                    return acc + (actual.hasErr ? 1 : 0)
                }, 0)
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            if (req.params.id_cliente != '0') {
                condicion.id_cliente = req.params.id_cliente
            }
            AliasClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }]
            }).then(function (result) {
                res.json({ lista: result })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/cliente/empresa/comensales/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                for (let i = 0; i < req.body.length; i++) {
                    promises.push(crearComensal(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ mensaje: 'Guardado correctamente.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            if (req.params.id_cliente != "0") {
                condicion.id_cliente = req.params.id_cliente
            }
            ComensalesClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: GerenciasClienteEmpresa, as: 'gerencia' }]
            }).then(function (result) {
                res.json({ lista: result })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/cliente/empresa/horarios/comida/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                for (let i = 0; i < req.body.length; i++) {
                    let fin = req.body[i].final.split(':')[0] + ':' + req.body[i].final.split(':')[1] + ':59'
                    req.body[i].final = fin
                    promises.push(crearComida(req.body[i], req.params.id_empresa, t))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ mensaje: 'Guardado correctamente.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            if (req.params.id_cliente && req.params.id_cliente !== "0") {
                condicion.id_cliente = req.params.id_cliente
            }
            horarioComidasClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: PrecioComidasClienteEmpresa, as: 'precio' }]
            }).then(function (result) {
                res.json({ lista: result })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/cliente/empresa/precio/comida/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                for (let i = 0; i < req.body.length; i++) {
                    promises.push(crearPrecioComida(req.body[i], req.params.id_empresa, t))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ mensaje: 'Guardado correctamente.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            if (req.params.id_cliente && req.params.id_cliente !== "0") {
                condicion.id_cliente = req.params.id_cliente
            }
            PrecioComidasClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: horarioComidasClienteEmpresa, as: 'comida' }]
            }).then(function (result) {
                res.json({ lista: result })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
    router.route('/cliente/empresa/edicion/historial/:id_empresa/:id_usuario/:id_cliente')
        .post(ensureAuthorizedlogged, function (req, res) {
            PrecioComidasClienteEmpresa.find({
                where: { id_comida: req.body.id_comida },
                include: [{ model: horarioComidasClienteEmpresa, as: 'comida' }]
            }).then(function (precio) {
                HistorialComidaClienteEmpresa.update({
                    tarjeta: parseInt(req.body.tarjeta),
                    id_cliente: req.params.id_cliente,
                    id_comensal: req.body.id_comensal,
                    id_empresa: req.body.id_empresa,
                    id_gerencia: req.body.id_gerencia,
                    id_comida: req.body.id_comida,
                    fecha: (req.body.fecha_texto.split(' ')[0] + ' ' + precio.comida.inicio),
                    id_usuario: req.body.id_usuario,
                    identificador_equipo: req.body.identificador_equipo,
                    documento: req.body.documento ? req.body.documento.trim() : 'RegistrosEditados',
                    precio: precio ? precio.precio : null,
                    fecha_texto: (req.body.fecha_texto.split(' ')[0].split('-').reverse().join('/') + ' ' + precio.comida.inicio),
                    estado: req.body.estado === undefined || req.body.estado === null ? true : req.body.estado,
                    verificado: null,
                    fecha_verificado: null,
                    verificado_por: null,
                    descartado: false
                },
                    { where: { id: req.body.id } }
                ).then(function (historialActualizado) {
                    res.json({ mensaje: 'Actualizado correctamente.' })
                }).catch(function (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        res.json({ hasErr: true, mensaje: 'Registro ya existente: Comensal ' + historial.comensal.nombre + ' Fecha:' + historial.fecha, index: i + 2, tipo: 'Error' })
                    } else {
                        res.json({ hasErr: true, mensaje: err.stack, tipo: 'Error' })
                    }
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
    router.route('/cliente/empresa/excel/historial/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            var fechasVerificacionMarcaciones = []
            const comensalesNoRegistrados = []
            const empresasNoRegistradas = []
            sequelize.transaction(function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    if (req.body[i].verificarActualizacion) {
                        let copyOf = clone(req.body[i])
                        promises.push(verificarEliminacionDatosHistorialExcel(copyOf, req.params.id_empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas))
                    } else {
                        promises.push(verificarDatosHistorialExcel(req.body[i], req.params.id_empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas))
                    }
                    // if (req.body[i].fecha && history.) {
                    //     if (fechasVerificacionMarcaciones.indexOf(req.body[i].fecha.split('T')[0]) < 0) {
                    //         fechasVerificacionMarcaciones.push(req.body[i].fecha.split('T')[0])
                    //     }
                    // }
                }
                return Promise.all(promises)
            }).then(function (result) {
                const fechasVerificacionMarcaciones = []
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        if (req.body[0].verificarActualizacion) {
                            var Errors = []
                            var promises = []
                            sequelize.transaction(function (t) {
                                for (let i = 0; i < req.body.length; i++) {
                                    req.body[i].id_usuario = req.params.id_usuario
                                    req.body[i].id_empresa = req.params.id_empresa
                                    promises.push(verificarDatosHistorialExcel(req.body[i], req.params.id_empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas))
                                }
                                return Promise.all(promises)
                            }).then(function (result) {
                                if (result.length > 0) {
                                    mensajes = []
                                    result.forEach(function (dato) {
                                        if (dato !== undefined) {
                                            if (dato.hasErr) {
                                                mensajes.push(dato.mensaje)
                                            }
                                        }
                                    });
                                    if (mensajes.length === result.length) {
                                        mensajes.unshift('No se guardo')
                                        if (req.body[0].verificarActualizacion) {

                                        }
                                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                                    } else if (mensajes.length === 0) {
                                        res.json({ mensaje: 'Guardado correctamente.', comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                                    } else {
                                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                                    }
                                } else {
                                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: [err.stack], hasErr: true })
                            })
                        } else {
                            mensajes.unshift('No se guardo')
                            res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                        }
                    } else if (mensajes.length === 0) {
                        if (req.body[0].verificarActualizacion) {
                            const Errors = []
                            const promises = []
                            sequelize.transaction(function (t) {
                                for (let i = 0; i < req.body.length; i++) {
                                    req.body[i].id_usuario = req.params.id_usuario
                                    req.body[i].id_empresa = req.params.id_empresa
                                    promises.push(verificarDatosHistorialExcel(req.body[i], req.params.id_empresa, t, i, comensalesNoRegistrados, empresasNoRegistradas))
                                }
                                return Promise.all(promises)
                            }).then(function (result) {
                                if (result.length > 0) {
                                    mensajes = []
                                    result.forEach(function (dato) {
                                        if (dato !== undefined) {
                                            if (dato.hasErr) {
                                                mensajes.push(dato.mensaje)
                                            }
                                        }
                                    });
                                    if (mensajes.length === result.length) {
                                        mensajes.unshift('No se guardo')
                                        if (req.body[0].verificarActualizacion) {

                                        }
                                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                                    } else if (mensajes.length === 0) {
                                        res.json({ mensaje: 'Guardado correctamente.', comensalesNoRegistrados: comensalesNoRegistrados })
                                    } else {
                                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                                    }
                                } else {
                                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, hasErr: true })
                            })
                        } else {
                            res.json({ mensaje: 'Guardado correctamente.', comensalesNoRegistrados: comensalesNoRegistrados })
                        }

                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes, comensalesNoRegistrados: comensalesNoRegistrados, empresasNoRegistradas: empresasNoRegistradas })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/excel/comensal/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED }, function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    promises.push(verificarDatosComensalExcel(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        mensajes.unshift('No se guardo')
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/excel/alias/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            sequelize.transaction(function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    promises.push(verificarDatosAliasExcel(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        mensajes.unshift('No se guardo')
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrio un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/excel/gerencias/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            sequelize.transaction(function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    promises.push(verificarDatosGerenciasExcel(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        mensajes.unshift('No se guardo')
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrió un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/excel/comidas/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            sequelize.transaction(function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    promises.push(verificarDatosComidasExcel(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        mensajes.unshift('No se guardo')
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrió un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/excel/precios/:id_empresa/:id_usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var Errors = []
            var promises = []
            sequelize.transaction(function (t) {
                for (let i = 0; i < req.body.length; i++) {
                    req.body[i].id_usuario = req.params.id_usuario
                    req.body[i].id_empresa = req.params.id_empresa
                    promises.push(verificarDatosPreciosExcel(req.body[i], req.params.id_empresa, t, i))
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    var mensajes = []
                    result.forEach(function (dato) {
                        if (dato !== undefined) {
                            if (dato.hasErr) {
                                mensajes.push(dato.mensaje)
                            }
                        }
                    });
                    if (mensajes.length === result.length) {
                        mensajes.unshift('No se guardo')
                        res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
                    } else if (mensajes.length === 0) {
                        res.json({ mensaje: 'Guardado correctamente.' })
                    } else {
                        mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
                        res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
                    }
                } else {
                    res.json({ mensaje: 'No se guardo, ocurrió un error.' })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/cliente/empresa/historial/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:mes/:anio/:empresaCliente/:gerencia/:comensal/:comida/:estado/:pagina/:items_pagina/:columna/:direccion')
        .post(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionHistorial = {}
            var condicionGerencia = {}
            var condicionEmpleado = {}
            condicionHistorial.id_empresa = req.params.id_empresa
            condicionHistorial.id_cliente = req.params.id_cliente
            var desde = false
            var hasta = false
            var fecha_desde;
            var fecha_hasta;
            if (req.params.mes != "0" && req.params.anio != "0") {
                var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
                var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), -1, 0, 0, 0)
                fecha_hasta.setHours(23)
                fecha_hasta.setMinutes(59)
                fecha_hasta.setSeconds(59)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            } else {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
            } else if (!desde && !hasta && (req.params.anio != "0")) {
                if (req.params.mes != "0") {
                    fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
                } else {
                    fecha_desde = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
                }
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            }
            if (req.params.empresaCliente != "0") {
                condicionHistorial.id_cliente = req.params.empresaCliente
            }
            if (req.params.gerencia != "0") {
                condicionHistorial.id_gerencia = req.params.gerencia
            }
            if (req.params.comensal != "0") {
                condicionHistorial.id_comensal = { $in: req.params.comensal.split(',') }
            }
            if (req.params.comida != "0") {
                condicionHistorial.id_comida = req.params.comida
            }
            if (req.params.estado != "0") {

            }
            var ordenamiento = []
            if (req.params.columna === "nombre") {
                ordenamiento.push([{ model: ComensalesClienteEmpresa, as: 'comensal' }, 'nombre', req.params.direccion])
            } else if (req.params.columna === "gerencia") {
                ordenamiento.push([{ model: GerenciasClienteEmpresa, as: 'gerencia' }, 'nombre', req.params.direccion])
            } else if (req.params.columna === "empresa") {
                ordenamiento.push([{ model: Cliente, as: 'empresaCliente' }, 'razon_social', req.params.direccion])
            } else if (req.params.columna === "comida") {
                ordenamiento.push([{ model: horarioComidasClienteEmpresa, as: 'comida' }, 'nombre', req.params.direccion])
            } else {
                ordenamiento.push([req.params.columna, req.params.direccion])
            }
            HistorialComidaClienteEmpresa.count({
                where: condicionHistorial,
                include: [
                    { model: GerenciasClienteEmpresa, as: 'gerencia', where: condicionGerencia, required: false },
                    { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'], required: false },
                    { model: ComensalesClienteEmpresa, as: 'comensal', where: condicionEmpleado },
                    { model: Usuario, as: 'usuario' },
                    { model: horarioComidasClienteEmpresa, as: 'comida' }
                ]
            }).then(function (historialCount) {
                HistorialComidaClienteEmpresa.findAll({
                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                    where: condicionHistorial,
                    include: [
                        { model: GerenciasClienteEmpresa, as: 'gerencia', where: condicionGerencia, required: false },
                        { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'], required: false },
                        { model: ComensalesClienteEmpresa, as: 'comensal' },
                        { model: Usuario, as: 'usuario' },
                        { model: horarioComidasClienteEmpresa, as: 'comida' }
                    ],
                    order: [ordenamiento]
                }).then(function (historial) {
                    res.json({ historial: historial, paginas: Math.ceil(historialCount / req.params.items_pagina) })
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true })
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
    router.route('/cliente/documentos/historial/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:mes/:anio/:empresaCliente/:gerencia/:comensal/:comida/:estado/:pagina/:items_pagina')
        .post(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionHistorial = {}
            var condicionGerencia = {}
            var condicionEmpleado = {}
            condicionHistorial.id_empresa = req.params.id_empresa
            condicionHistorial.id_cliente = req.params.id_cliente
            var desde = false
            var hasta = false
            if (req.params.mes != "0" && req.params.anio != "0") {
                var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0)
                var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes) + 1, 0, 23, 59, 0)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            } else {
                if (req.params.desde != "0") {
                    var inicio = new Date(req.params.desde.split('/').reverse()); inicio.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    var fin = new Date(req.params.hasta.split('/').reverse()); fin.setHours(23, 59, 0, 0, 0);
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [inicio, fin] }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [inicio]
                }
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fin]
                }
            } else if (!desde && !hasta && (req.params.anio != "0")) {
                var inicio;
                var fin;
                if (req.params.mes != "0") {
                    inicio = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
                    fin = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
                } else {
                    inicio = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
                    fin = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
                }
                condicionHistorial.fecha = { $between: [inicio, fin] }
            }
            if (req.params.empresaCliente != "0") {
                condicionHistorial.id_cliente = req.params.empresaCliente
            }
            if (req.params.gerencia != "0") {
                condicionHistorial.id_gerencia = req.params.gerencia
            }
            if (req.params.comensal != "0") {
                condicionHistorial.id_comensal = { $in: req.params.comensal.split(',') }
            }
            if (req.params.comida != "0") {
                condicionHistorial.id_comida = req.params.comida
            }
            if (req.params.estado != "0") {

            }
            sequelize.query("SELECT DISTINCT documento, SUBSTRING(fecha,1,10) as fecha from agil_comensales_historial_comida_cliente_empresa where empresa=" + req.params.id_empresa + " and cliente =  " + req.params.empresaCliente + " GROUP BY documento, fecha", { type: sequelize.QueryTypes.SELECT })
                .then(function (dato) {
                    res.json({ documentos: dato })
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true })
                })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
    router.route('/obtener/documentos/historial/:id_empresa/:id_usuario/:id_cliente/:documento/:fecha')
        .post(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionHistorial = { documento: req.params.documento }
            condicionHistorial.id_empresa = req.params.id_empresa
            var inicio = new Date(req.params.fecha.split('-'))
            inicio.setHours(0);
            inicio.setMinutes(0);
            var fin = new Date(req.params.fecha.split('-'))
            fin.setHours(23);
            fin.setMinutes(59);
            fin.setMinutes(59);
            condicionHistorial.fecha = { $between: [inicio, fin] }
            HistorialComidaClienteEmpresa.findAll({
                where: condicionHistorial,
                include: [
                    { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'], include: [{ model: AliasClienteEmpresa, as: 'alias' }], required: false },
                    { model: ComensalesClienteEmpresa, as: 'comensal' },
                    { model: Usuario, as: 'usuario' }
                ]
            }).then(function (historial) {
                res.json({ documento: historial })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
    router.route('/comensal/empresa/busqueda/:busqueda/:id_empresa/:id_usuario/:id_cliente')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente, nombre: { $like: req.params.busqueda + '%' } }
            ComensalesClienteEmpresa.findAll({
                where: condicion
            }).then(function (result) {
                res.json(result)
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/reporte/comedor/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:mes/:anio/:empresaCliente/:gerencia/:comensal/:comida/:estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente }
            var condicionHistorial = { id: { $not: null } }
            var desde = false
            var hasta = false
            var fecha_desde;
            var fecha_hasta;
            var periodoTexto = ""
            if (req.params.mes != "0" && req.params.anio != "0") {
                var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
                var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), -1, 0, 0, 0)
                fecha_hasta.setHours(23)
                fecha_hasta.setMinutes(59)
                fecha_hasta.setSeconds(59)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                periodoTexto = mesesFiltro[parseInt(req.params.mes) - 1].nombre + " / " + req.params.anio
            } else {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                if (fecha_desde.getMonth() === fecha_hasta.getMonth()) {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2]
                } else {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.hasta.split('/')[1]) - 1)].nombre + " de " + req.params.hasta.split('/')[2]
                }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
            } else if (!desde && !hasta && (req.params.anio != "0")) {
                if (req.params.mes != "0") {
                    fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
                } else {
                    fecha_desde = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
                }
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            }
            if (req.params.empresaCliente != "0") {
                condicionHistorial.id_cliente = req.params.empresaCliente
            }
            if (req.params.gerencia != "0") {
                condicionHistorial.id_gerencia = req.params.gerencia
            }
            if (req.params.comensal != "0") {
                condicionHistorial.id_comensal = { $in: req.params.comensal.split(',') }
            }
            if (req.params.comida != "0") {
                condicionHistorial.id_comida = req.params.comida
            }
            GerenciasClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: HistorialComidaClienteEmpresa, as: 'historial', where: condicionHistorial, require: false, include: [{ model: horarioComidasClienteEmpresa, as: 'comida', required: false, include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }, { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'], attributes: ['id', 'razon_social'] }, { model: ComensalesClienteEmpresa, as: 'comensal' }] }],///include: [{ model: HistorialComidaClienteEmpresa, as: 'historial', include: [{ model: horarioComidasClienteEmpresa, as: 'comida', include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }, { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }], where: condicionHistorial }],
                order: [[{ model: HistorialComidaClienteEmpresa, as: 'historial' }, 'fecha', 'asc']]
            }).then(function (result) {
                if (result.length > 0) {
                    var contador = 0
                    if (result.some(function (gerencia) {
                        if (gerencia.historial.length > 0) {
                            return true
                        }
                        return false
                    })) {
                        if (periodoTexto.length === 0) {
                            if (result.length > 0) {
                                for (var index = 0; index < result.length; index++) {
                                    var primerRegistro = result[index].historial[0].fecha.toISOString()
                                    var ultimoRegistro = result[index].historial[result[index].historial.length - 1].fecha.toISOString()
                                    var indexMesInicio = (parseInt(primerRegistro.split('T')[0].split('-')[1])) - 1
                                    var indexMesfinal = (parseInt(ultimoRegistro.split('T')[0].split('-')[1])) - 1
                                    if (primerRegistro.split('T')[0].split('-')[1] === ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] === ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    } else if (primerRegistro.split('T')[0].split('-')[1] !== ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] === ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesfinal].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    } else if (primerRegistro.split('T')[0].split('-')[1] !== ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] !== ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " de " + primerRegistro.split('T')[0].split('-')[0] + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesfinal].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    }
                                    result[index].dataValues.periodo = periodoTexto
                                }
                                periodoTexto = ""
                            }
                        }
                        return res.json({ reporte: result, periodo: [fecha_desde, fecha_hasta, periodoTexto] })
                    }
                }
                HistorialComidaClienteEmpresa.findAll({
                    where: condicionHistorial,
                    include: [{ model: horarioComidasClienteEmpresa, as: 'comida', include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }, { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }],
                    order: [['fecha', 'asc']]
                }).then(function (resuldato) {
                    if (resuldato) {
                        var sinAsignacion = { id: null, nombre: 'Sin asignación', id_cliente: req.params.id_cliente, id_empresa: req.params.id_empresa, historial: resuldato }
                        if (periodoTexto.length === 0) {
                            if (result.length > 0) {
                                for (var index = 0; index < result.length; index++) {
                                    var primerRegistro = result[index].historial[0].fecha.toISOString()
                                    var ultimoRegistro = result[index].historial[result[index].historial.length - 1].fecha.toISOString()
                                    var indexMesInicio = (parseInt(primerRegistro.split('T')[0].split('-')[1])) - 1
                                    var indexMesfinal = (parseInt(ultimoRegistro.split('T')[0].split('-')[1])) - 1
                                    if (primerRegistro.split('T')[0].split('-')[1] === ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] === ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    } else if (primerRegistro.split('T')[0].split('-')[1] !== ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] === ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesfinal].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    } else if (primerRegistro.split('T')[0].split('-')[1] !== ultimoRegistro.split('T')[0].split('-')[1] && primerRegistro.split('T')[0].split('-')[0] !== ultimoRegistro.split('T')[0].split('-')[0]) {
                                        periodoTexto = "Del " + primerRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesInicio].nombre + " de " + primerRegistro.split('T')[0].split('-')[0] + " al " + ultimoRegistro.split('T')[0].split('-')[2] + " de " + mesesFiltro[indexMesfinal].nombre + " de " + ultimoRegistro.split('T')[0].split('-')[0]
                                    }
                                    result[index].dataValues.periodo = periodoTexto
                                }
                                periodoTexto = ""
                            }
                        }
                        res.json({ reporte: [sinAsignacion], periodo: [fecha_desde, fecha_hasta, periodoTexto] })
                    } else {
                        res.json({ mensaje: 'No se puede generar el reporte, la consulta no arrojó ningún resultado.', hasErr: true })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true })
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/reporte/empresa/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:mes/:anio/:empresaCliente/:gerencia/:comensal/:comida/:estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente }
            var condicionHistorial = { id: { $not: null } }
            var desde = false
            var hasta = false
            var fecha_desde;
            var fecha_hasta;
            var periodoTexto = ""
            if (req.params.mes != "0" && req.params.anio != "0") {
                var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
                var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), -1, 0, 0, 0)
                fecha_hasta.setHours(23)
                fecha_hasta.setMinutes(59)
                fecha_hasta.setSeconds(59)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                periodoTexto = mesesFiltro[parseInt(req.params.mes) - 1].nombre + " / " + req.params.anio
            } else {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                if (fecha_desde.getMonth() === fecha_hasta.getMonth()) {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2]
                } else {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.hasta.split('/')[1]) - 1)].nombre + " de " + req.params.hasta.split('/')[2]
                }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
            } else if (!desde && !hasta && (req.params.anio != "0")) {
                if (req.params.mes != "0") {
                    fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
                } else {
                    fecha_desde = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
                }
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            }
            if (req.params.empresaCliente != "0") {
                condicionHistorial.id_cliente = req.params.empresaCliente
            }
            if (req.params.gerencia != "0") {
                condicionHistorial.id_gerencia = req.params.gerencia
            }
            if (req.params.comensal != "0") {
                condicionHistorial.id_comensal = { $in: req.params.comensal.split(',') }
            }
            if (req.params.comida != "0") {
                condicionHistorial.id_comida = req.params.comida
            }
            ComensalesClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: HistorialComidaClienteEmpresa, as: 'historial', where: condicionHistorial, required: true, include: [{ model: horarioComidasClienteEmpresa, as: 'comida', include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }, { model: GerenciasClienteEmpresa, as: 'gerencia' }, { model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }] }],
                order: [[{ model: HistorialComidaClienteEmpresa, as: 'historial' }, 'fecha', 'asc']]
            }).then(function (result) {
                GerenciasClienteEmpresa.find({
                    where: { id: req.params.gerencia }
                }).then(function (geren) {
                    if (result.length > 0) {
                        if (periodoTexto.length === 0) {
                            var primerRegistro = result[0].historial[0].fecha
                            var ultimoRegistro = result[0].historial[result[0].historial.length - 1].fecha
                            if (primerRegistro.getMonth() === ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                                periodoTexto = "Del " + primerRegistro.getDate() + " al " + ultimoRegistro.getDate() + " de " + mesesFiltro[primerRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                            } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() === ultimoRegistro.getFullYear()) {
                                periodoTexto = "Del " + primerRegistro.getDate() + " de " + mesesFiltro[primerRegistro.getMonth()].nombre + " al " + ultimoRegistro.getDate() + " de " + mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                            } else if (primerRegistro.getMonth() !== ultimoRegistro.getMonth() && primerRegistro.getFullYear() !== ultimoRegistro.getFullYear()) {
                                periodoTexto = "Del " + primerRegistro.getDate() + " de " + mesesFiltro[primerRegistro.getMonth()].nombre + " de " + primerRegistro.getFullYear() + " al " + ultimoRegistro.getDate() + " de " + mesesFiltro[ultimoRegistro.getMonth()].nombre + " de " + ultimoRegistro.getFullYear()
                            }
                        }
                    }
                    res.json({ reporte: result, periodo: [fecha_desde, fecha_hasta, periodoTexto], gerencia: geren })
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/reporte/comensal/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:mes/:anio/:empresaCliente/:gerencia/:comensal/:comida/:estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente }
            var condicionHistorial = { id: { $not: null }, estado: true }
            var desde = false
            var hasta = false
            var fecha_desde;
            var fecha_hasta;
            var asignarPeriodo = false
            var periodoTexto = ""
            if (req.params.mes != "0" && req.params.anio != "0") {
                var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
                var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), -1, 0, 0, 0)
                fecha_hasta.setHours(23)
                fecha_hasta.setMinutes(59)
                fecha_hasta.setSeconds(59)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                periodoTexto = mesesFiltro[parseInt(req.params.mes) - 1].nombre + " / " + req.params.anio

            } else if (req.params.desde != "0" || req.params.hasta != "0") {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                if (fecha_desde.getMonth() === fecha_hasta.getMonth()) {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2]
                } else {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.hasta.split('/')[1]) - 1)].nombre + " de " + req.params.hasta.split('/')[2]
                }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
                asignarPeriodo = true
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
                asignarPeriodo = true
            } else if (!desde && !hasta && (req.params.anio != "0")) {
                if (req.params.mes != "0") {
                    fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
                } else {
                    fecha_desde = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
                    fecha_hasta = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
                }
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            }
            if (req.params.empresaCliente != "0") {
                condicionHistorial.id_cliente = req.params.empresaCliente
            }
            if (req.params.gerencia != "0") {
                condicionHistorial.id_gerencia = req.params.gerencia
            }
            if (req.params.comensal != "0") {
                condicionHistorial.id_comensal = { $in: req.params.comensal.split(',') }
            }
            if (req.params.comida != "0") {
                condicionHistorial.id_comida = req.params.comida
            }
            ComensalesClienteEmpresa.findAll({
                where: condicion,
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: GerenciasClienteEmpresa, as: 'gerencia' }, { model: HistorialComidaClienteEmpresa, as: 'historial', where: condicionHistorial, required: true, include: [{ model: horarioComidasClienteEmpresa, as: 'comida', include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }] }],
                order: [[{ model: HistorialComidaClienteEmpresa, as: 'historial' }, 'fecha', 'asc']]
            }).then(function (result) {
                var imponente = Object.assign([], result)
                var arrFechas = []
                var fechas = []
                if (imponente.length > 0) {
                    res.json({ reporte: imponente, fechas: fechas, periodo: [fecha_desde, fecha_hasta, periodoTexto, arrFechas] })
                } else {
                    res.json({ reporte: [], periodo: [fecha_desde, fecha_hasta, periodoTexto, arrFechas] })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/alertas/marcaciones/:id_empresa/:id_usuario/:id_cliente/:desde/:hasta/:columna/:direccion/:descartados/:comensal')
        .get(ensureAuthorizedlogged, function (req, res) {
            let condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente }
            let condicionHistorial = { id_cliente: req.params.id_cliente }
            let desde = false
            let hasta = false
            let fecha_desde;
            let fecha_hasta;
            if (req.params.desde != "0" || req.params.hasta != "0") {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                if (fecha_desde.getMonth() === fecha_hasta.getMonth()) {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2]
                } else {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.hasta.split('/')[1]) - 1)].nombre + " de " + req.params.hasta.split('/')[2]
                }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
                asignarPeriodo = true
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
                asignarPeriodo = true
            } else if (!desde && !hasta) {
                fecha_hasta = new Date();
                fecha_hasta.setHours(23, 59, 59, 0)
                fecha_desde = new Date(fecha_hasta.getFullYear(), fecha_hasta.getMonth() - 1, fecha_hasta.getDate())
                fecha_desde.setHours(0, 0, 0, 0)
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
            }
            if (req.params.comensal != "0") {
                condicion.nombre = { $like: req.params.comensal + "%" }
            }
            let marcacionesFaltantes = []
            horarioComidasClienteEmpresa.findAll({
                where: { id_cliente: req.params.id_cliente },
                include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: PrecioComidasClienteEmpresa, as: 'precio' }]
            }).then((comidas) => {
                let desayuno = comidas.find((comida) => comida.nombre.toLowerCase() == 'desayuno')
                let almuerzo = comidas.find((comida) => comida.nombre.toLowerCase() == 'almuerzo')
                let cena = comidas.find((comida) => comida.nombre.toLowerCase() == 'cena')
                ComensalesClienteEmpresa.findAll({
                    where: condicion,
                    include: [{ model: Cliente, as: 'empresaCliente', attributes: ['id', 'razon_social'] }, { model: GerenciasClienteEmpresa, as: 'gerencia', attributes: ['id', 'id_cliente', 'codigo', 'nombre'] }, { model: HistorialComidaClienteEmpresa, as: 'historial', where: condicionHistorial, required: true, include: [{ model: horarioComidasClienteEmpresa, as: 'comida', include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' }] }] }],
                    order: [[{ model: HistorialComidaClienteEmpresa, as: 'historial' }, 'fecha', 'asc']]
                }).then((result) => {
                    let data = Object.assign([], result)
                    let arrFechas = []
                    let fechas = []
                    let xreporte = { desayuno: 0, almuerzo: 0, cena: 0 }
                    if (data.length > 0) {
                        data.forEach((repo) => {
                            repo.historial.sort((a, b) => {
                                if (a.fecha > b.fecha) {
                                    return 1
                                }
                                if (b.fecha > a.fecha) {
                                    return -1
                                }
                                return 0
                            })
                        })
                        for (let i = 0; i < data.length; i++) {
                            let fechas = getDaysArray(fecha_desde, fecha_hasta)
                            for (let k = 0; k < fechas.length; k++) {
                                let listaDelDia = data[i].historial.filter(function (elem) {
                                    return formatoFechaPDF(fechas[k]) === formatoFechaPDF(new Date(elem.fecha))
                                })
                                if (!listaDelDia.some(function (dato) {
                                    return (dato.comida && dato.comida.nombre.toUpperCase() === 'DESAYUNO') || false;
                                })) {
                                    let marcacion = {
                                        comida: desayuno,
                                        nombre_comida: desayuno.nombre,
                                        fecha: fechas[k],
                                        fecha_mostrar: formatoFechaPDF(fechas[k]),
                                        comensal: {
                                            id: data[i].id,
                                            nombre: data[i].nombre,
                                            id_cliente: data[i].id_cliente,
                                            id_empresa: data[i].id_empresa,
                                            tarjeta: data[i].tarjeta,
                                            tipo: data[i].tipo,
                                            gerencia: data[i].gerencia
                                        },
                                        comensal_nombre: data[i].nombre
                                    }
                                    marcacionesFaltantes.push(marcacion)
                                }
                                if (!listaDelDia.some(function (dato) {
                                    return (dato.comida && dato.comida.nombre.toUpperCase() === 'ALMUERZO') || false;
                                })) {
                                    let marcacion = {
                                        comida: almuerzo,
                                        nombre_comida: almuerzo.nombre,
                                        fecha: fechas[k],
                                        fecha_mostrar: formatoFechaPDF(fechas[k]),
                                        comensal: {
                                            id: data[i].id,
                                            nombre: data[i].nombre,
                                            id_cliente: data[i].id_cliente,
                                            id_empresa: data[i].id_empresa,
                                            tarjeta: data[i].tarjeta,
                                            tipo: data[i].tipo
                                        },
                                        comensal_nombre: data[i].nombre
                                    }
                                    marcacionesFaltantes.push(marcacion)
                                }
                                if (!listaDelDia.some(function (dato) {
                                    return (dato.comida && dato.comida.nombre.toUpperCase() === 'CENA') || false;
                                })) {
                                    let marcacion = {
                                        comida: cena,
                                        nombre_comida: cena.nombre,
                                        fecha: fechas[k],
                                        fecha_mostrar: formatoFechaPDF(fechas[k]),
                                        comensal: {
                                            id: data[i].id,
                                            nombre: data[i].nombre,
                                            id_cliente: data[i].id_cliente,
                                            id_empresa: data[i].id_empresa,
                                            tarjeta: data[i].tarjeta,
                                            tipo: data[i].tipo
                                        },
                                        comensal_nombre: data[i].nombre
                                    }
                                    marcacionesFaltantes.push(marcacion)
                                }
                                var datosMarcados = listaDelDia.filter((dato) => (dato.verificado !== null && dato.verificado !== undefined))
                                for (let j = 0; j < datosMarcados.length; j++) {
                                    let marcacion = {
                                        id: datosMarcados[j].id,
                                        comida: datosMarcados[j].comida,
                                        nombre_comida: datosMarcados[j].comida.nombre,
                                        fecha: fechas[k],
                                        fecha_mostrar: formatoFechaPDF(fechas[k]),
                                        comensal: {
                                            id: data[i].id,
                                            nombre: data[i].nombre,
                                            id_cliente: data[i].id_cliente,
                                            id_empresa: data[i].id_empresa,
                                            tarjeta: data[i].tarjeta,
                                            tipo: data[i].tipo
                                        },
                                        comensal_nombre: data[i].nombre,
                                        verificado: datosMarcados[j].verificado,
                                        habilitado: datosMarcados[j].estado
                                    }
                                    marcacionesFaltantes.push(marcacion)
                                }
                            }
                        }
                        res.json({ alertas: marcacionesFaltantes })
                    } else {
                        res.json({ alertas: [] })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true })
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    router.route('/agregar/marcaciones/:id_empresa/:id_usuario/:id_cliente/:comensal')
        .post(ensureAuthorizedlogged, function (req, res) {
            let empresa = req.params.id_empresa;
            var condicion = { id_empresa: req.params.id_empresa, id_cliente: req.params.id_cliente, comensal: req.params.comensal, id: req.body.id }
            var historial = {
                tarjeta: '' + req.body.comensal.tarjeta, verificado: req.body.verificado,
                fecha_verificado: req.body.fecha_verificado,
                verificado_por: req.body.verificado_por,
                descartado: req.body.descartado,
                alias: { id_cliente: req.body.comida.id_cliente },
                comensal: req.body.comensal,
                fecha: (req.body.fecha.split('T')[0] + 'T' + req.body.comida.inicio + '.000Z'),
                fecha_hora: (req.body.fecha.split('T')[0] + 'T' + req.body.comida.inicio + '.000Z'),
                gerencia: req.body.gerencia,
                comida: req.body.comida,
                habilitado: req.body.habilitado,
                id_usuario: req.params.id_usuario,
                id: req.body.id
            }
            var promesas = []
            sequelize.transaction(function (t) {
                let fecha_desde = new Date(historial.fecha)
                fecha_desde.setDate(fecha_desde.getDate() - 7)
                let fecha_hasta = new Date(historial.fecha)
                fecha_hasta.setDate(fecha_hasta.getDate() + 7)
                return HistorialComidaClienteEmpresa.findAll({
                    attributes: ['id_gerencia'],
                    where: { fecha: { $between: [fecha_desde, fecha_hasta] } },
                    limit: 1,
                    order: [['fecha', 'desc']]
                }).then((registroEncontrado) => {
                    if (registroEncontrado.length > 0) {
                        historial.gerencia = { id: registroEncontrado[0].id_gerencia }
                        return crearHistorial(historial, empresa, t, 0)
                    } else {
                        return crearHistorial(historial, empresa, t, 0)
                    }
                })
            }).then(function (marcacionActualizada) {
                if (marcacionActualizada.id) {
                    res.json({ mensaje: 'Actualizado correctamente', marcacion: marcacionActualizada })
                } else {
                    res.json({ mensaje: 'No se pudo actualizar. Error Desconocido.', hasErr: true })
                }

            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            res.json({ mensaje: 'sin funcionalidad' })
        })

    function formatoFechaPDF(fecha) {
        var MyDate = new Date(fecha);
        var MyDateString;
        MyDate.setDate(MyDate.getDate());
        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString
    }

    function getDaysArray(start, end) {
        let arr = []
        for (arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    router.route('/reporte/general/comensal/:id_empresa/:desde/:hasta')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicion = { id_empresa: req.params.id_empresa }
            var condicionHistorial = { id: { $not: null } }
            var desde = false
            var hasta = false
            var fecha_desde;
            var fecha_hasta;
            var asignarPeriodo = false
            var periodoTexto = ""
            if (req.params.desde != "0" || req.params.hasta != "0") {
                if (req.params.desde != "0") {
                    fecha_desde = new Date(req.params.desde.split('/').reverse()); fecha_desde.setHours(0, 0, 0, 0, 0);
                    desde = true
                }
                if (req.params.hasta != "0") {
                    fecha_hasta = new Date(req.params.hasta.split('/').reverse());
                    fecha_hasta.setHours(23)
                    fecha_hasta.setMinutes(59)
                    fecha_hasta.setSeconds(59)
                    hasta = true
                }
            }
            if (desde && hasta) {
                condicionHistorial.fecha = { $between: [fecha_desde, fecha_hasta] }
                if (fecha_desde.getMonth() === fecha_hasta.getMonth()) {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2]
                } else {
                    periodoTexto = "Del " + req.params.desde.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.desde.split('/')[1]) - 1)].nombre + " de " + req.params.desde.split('/')[2] + " al " + req.params.hasta.split('/')[0] + " de " + mesesFiltro[(parseInt(req.params.hasta.split('/')[1]) - 1)].nombre + " de " + req.params.hasta.split('/')[2]
                }
            } else if (desde && !hasta) {
                condicionHistorial.fecha = {
                    $gte: [fecha_desde]
                }
                asignarPeriodo = true
            } else if (!desde && hasta) {
                condicionHistorial.fecha = {
                    $lte: [fecha_hasta]
                }
                asignarPeriodo = true
            }
            ComensalesClienteEmpresa.findAll({
                where: condicion,
                include: [
                    {
                        model: Cliente, as: 'empresaCliente',
                        attributes: ['id', 'razon_social']
                    },
                    { model: GerenciasClienteEmpresa, as: 'gerencia' },
                    {
                        model: HistorialComidaClienteEmpresa, as: 'historial',
                        where: condicionHistorial, required: true,
                        include: [
                            {
                            model: horarioComidasClienteEmpresa, as: 'comida',
                            include: [{ model: PrecioComidasClienteEmpresa, as: 'precio' 
                            }
                        ]
                        },{
                            model: Usuario, as: 'usuario', attributes:['nombre_usuario']
                        }
                    ]
                    }],
                order: [[{ model: HistorialComidaClienteEmpresa, as: 'historial' }, 'fecha', 'asc']]
            }).then(function (result) {
                // var imponente = Object.assign([], result)
                if (result.length > 0) {
                    res.json({ reporte: result })
                } else {
                    res.json({ reporte: [] })
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true })
            })
        })

    router.route('/clientes/comensales/empresa/:id_empresa/busqueda/:texto')
		.get(function (req, res) {
            var tex = ""
            if (req.params.texto!=0) {
                tex = " AND C.razon_social LIKE '"+req.params.texto+"%' OR C.nit LIKE '"+req.params.texto+"%' "
            }
			sequelize.query("SELECT\
            C.id,C.razon_social, C.nit, COUNT(Cm.id) AS nroComensales\
            FROM agil_cliente C\
            INNER JOIN agil_comensales_cliente_empresa Cm ON Cm.cliente =C.id\
            WHERE C.empresa = "+req.params.id_empresa+"\
            AND Cm.eliminado=FALSE\
            "+tex+"\
            GROUP BY C.id", 
            { type: sequelize.QueryTypes.SELECT }).then(function (comensales) {
				res.json(comensales);
			});
		});
}