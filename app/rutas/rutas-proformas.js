module.exports = function (router, sequelize, Sequelize, Usuario, Cliente, Proforma, DetallesProformas, Servicios, Clase, Sucursal, SucursalActividadDosificacion, Dosificacion,
    CodigoControl, NumeroLiteral, Empresa, ConfiguracionGeneralFactura, Tipo, UsuarioSucursal, Almacen, Venta, DetalleVenta, ConfiguracionGeneralFactura, ConfiguracionFactura, Movimiento, ClienteCentroCostos, MonedaTipoCambio, ensureAuthorizedlogged,
    MedicoPaciente, RrhhEmpleadoFicha, RRHHDetallePlanillaSueldos, RRHHPlanillaSueldos, ProformaFacturaAnulada, ContabilidadCuenta, CierreMensualProforma, AsientoContabilida, ProformaContabilidadd, UsuarioAlmacen) {
    router.route('/cierre-mensual-proforma/:mes/:anio')
        .get(ensureAuthorizedlogged, async (req, res) => {
            try {
                let cierreMes = await CierreMensualProforma.find({
                    where: {
                        periodo_mes: req.params.mes,
                        periodo_anio: req.params.anio
                    }
                })
                res.json({ cierreMes: cierreMes })
            } catch (err) {
                res.json({ mensaje: err.stack === undefined ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            }
        })
        .post(ensureAuthorizedlogged, async (req, res) => {
            try {
                let cierreMes = await CierreMensualProforma.create({
                    fecha: req.body.fecha,
                    periodo_mes: req.params.mes,
                    periodo_anio: req.params.anio,
                    id_usuario: req.body.id_usuario
                })
                res.json({ mensaje: 'Asignado satisfactoriamente!' })
            } catch (err) {
                res.json({ mensaje: err.stack === undefined ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            }
        })
    router.route('/proformas/empresa/:id_empresa/mes/:mes/anio/:anio/suc/:sucursal/act/:actividad/ser/:servicio/monto/:monto/razon/:razon/usuario/:usuario/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/num/:numero/facturas/:id_opcion/col/:col/dir/:dir/:fecha_proforma_desde/:fecha_proforma_hasta/:buscar_factura/:factura')
        .get(ensureAuthorizedlogged, (req, res) => {
            const condicion = {};
            let condicionCliente = {};
            const condicionServicio = {};
            let condicionUsuario = {};
            const condicionActividad = {};
            condicion.id_empresa = parseInt(req.params.id_empresa);
            // condicion.eliminado = false
            if (req.params.mes != "0") {
                condicion.periodo_mes = (parseInt(req.params.mes) - 1);
            }
            if (req.params.anio != "0") {
                condicion.periodo_anio = parseInt(req.params.anio) || undefined;
            }
            if (req.params.buscar_factura !== '0') {
                if (req.params.fecha_proforma_desde !== '0' && req.params.fecha_proforma_hasta === '0') {
                    const fecha_desde = req.params.fecha_proforma_desde.split('-');
                    const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                    condicion.fecha_factura = { $gte: [inicio] };
                } else if (req.params.fecha_proforma_desde !== '0' && req.params.fecha_proforma_hasta !== '0') {
                    const fecha_desde = req.params.fecha_proforma_desde.split('-');
                    const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                    const fecha_hasta = req.params.fecha_proforma_hasta.split('-');
                    const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                    condicion.fecha_factura = { $between: [inicio, fin] };
                } else if (req.params.fecha_proforma_desde === '0' && req.params.fecha_proforma_hasta !== '0') {
                    const fecha_hasta = req.params.fecha_proforma_hasta.split('-');
                    const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                    condicion.fecha_factura = { $lte: [fin] };
                } else {
                    condicion.fecha_factura = { $not: null };
                }
            } else {
                if (req.params.fecha_proforma_desde !== '0' && req.params.fecha_proforma_hasta === '0') {
                    const fecha_desde = req.params.fecha_proforma_desde.split('-');
                    const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                    condicion.fecha_proforma = { $gte: [inicio] };
                } else if (req.params.fecha_proforma_desde !== '0' && req.params.fecha_proforma_hasta !== '0') {
                    const fecha_desde = req.params.fecha_proforma_desde.split('-');
                    const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                    const fecha_hasta = req.params.fecha_proforma_hasta.split('-');
                    const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                    condicion.fecha_proforma = { $between: [inicio, fin] };
                } else if (req.params.fecha_proforma_desde === '0' && req.params.fecha_proforma_hasta !== '0') {
                    const fecha_hasta = req.params.fecha_proforma_hasta.split('-');
                    const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                    condicion.fecha_proforma = { $lte: [fin] };
                } else {
                    condicion.fecha_proforma = { $not: null };
                }
            }
            if (req.params.factura != "0") {
                condicion.factura = parseInt(req.params.factura) || undefined;
            }
            if (req.params.sucursal != "0") {
                condicion.id_sucursal = parseInt(req.params.sucursal) || undefined;
            }
            if (req.params.actividad != "0") {
                condicionActividad.id = parseInt(req.params.actividad) || undefined;
            }
            if (req.params.monto != "0") {
                condicion.totalImporteBs = req.params.monto
            }
            if (req.params.servicio != "0") {
                condicionServicio.id = parseInt(req.params.servicio) || undefined;
            }
            if (req.params.razon != "0") {
                condicionCliente = {
                    razon_social: { $or: [{ $like: '%' + req.params.razon.replace(/(')/g, '\'') + '%' }] }
                }
            }
            if (req.params.usuario != "0") {
                condicionUsuario = {
                    nombre_usuario: { $or: [{ $like: '%' + req.params.usuario + '%' }] }
                }
            }
            if (req.params.numero != "0") {
                condicion.correlativo = req.params.numero
            }
            var condicionSaldo = '';
            if (req.params.id_opcion != "0") {
                if (req.params.id_opcion == "1") {
                    condicion.fecha_factura = { $ne: null }
                    condicion.factura = { $ne: null }
                    condicion.eliminado = { $eq: false }
                } else if (req.params.id_opcion == "2") {
                    condicion.fecha_factura = { $eq: null }
                    condicion.factura = { $eq: null }
                    condicion.eliminado = { $eq: false }
                } else if (req.params.id_opcion == "3") {
                    condicion.eliminado = { $eq: true }
                } else if (req.params.id_opcion == "4") {
                    condicion.fecha_cobro = { $ne: null }
                    condicion.eliminado = { $eq: false }
                } else if (req.params.id_opcion == "5") {
                    condicion.fecha_factura = { $ne: null }
                    condicion.factura = { $ne: null }
                    //condicion.fecha_cobro = { $eq: null }
                    condicion.eliminado = { $eq: false }
                    condicionSaldo = sequelize.literal('`agil_proforma`.`monto` - `agil_proforma`.`a_cuenta` > 0')
                }else if (req.params.id_opcion == "6") {
                    condicion.fecha_factura = { $ne: null }
                    condicion.factura = { $ne: null }
                    condicion.fecha_cobro = { $ne: null }
                    condicion.eliminado = { $eq: false }
                    condicionSaldo = sequelize.literal('`agil_proforma`.`monto` - `agil_proforma`.`a_cuenta` > 0')
                }
            }

            const direccionOrden = (req.params.dir === 'asc' ? 'asc' : 'desc')
            let ordenamiento = []
            if (req.params.col === "cliente") {
                ordenamiento = sequelize.literal('`cliente.razon_social` ' + direccionOrden)
            } else if (req.params.col === "periodo") {
                ordenamiento.push([{ raw: 'periodo_mes + periodo_anio ' + direccionOrden }])
            } else if (req.params.col === "sucursal") {
                ordenamiento = sequelize.literal('`sucursal`.`nombre` ' + direccionOrden)
            } else if (req.params.col === "actividad") {
                ordenamiento = sequelize.literal('`actividadEconomica`.`nombre` ' + direccionOrden)
            } else if (req.params.col === "servicio") {
                ordenamiento = sequelize.literal('`detallesProformas.servicio`.`nombre` ' + direccionOrden)
            } else if (req.params.col === "usuario") {
                ordenamiento = sequelize.literal('`usuarioProforma.nombre_usuario` ' + direccionOrden)
            } else if (req.params.col === "monto") {
                ordenamiento = sequelize.literal('totalImporteBs ' + direccionOrden)
            } else if (req.params.col === "montosus") {
                ordenamiento = sequelize.literal('totalImporteSus ' + direccionOrden)
            } else if (req.params.col === "factura") {
                ordenamiento.push([{ raw: 'factura + fecha_factura ' + direccionOrden }])
            } else if (req.params.col === "fecha_proforma") {
                ordenamiento.push([{ raw: 'correlativo + fecha_proforma ' + direccionOrden }])
            } else if (req.params.col === "fecha_recepcion") {
                ordenamiento.push([{ raw: 'correlativo + fecha_recepcion ' + direccionOrden }])
            } else if (req.params.col === "fecha_proforma_ok") {
                ordenamiento.push([{ raw: 'correlativo + fecha_proforma_ok ' + direccionOrden }])
            } else if (req.params.col === "fecha_factura") {
                ordenamiento.push([{ raw: 'correlativo + fecha_factura ' + direccionOrden }])
            } else if (req.params.col === "fecha_cobro") {
                ordenamiento.push([{ raw: 'correlativo + fecha_cobro ' + direccionOrden }])
            } else {
                ordenamiento.push([req.params.col, direccionOrden])
            }

            if (req.params.items_pagina != "0") {
                Proforma.findAndCountAll(
                    {
                        offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                        where: [condicionSaldo?condicionSaldo:condicion,condicion],
                        include: [
                            { model: Clase, as: 'actividadEconomica', where: condicionActividad },
                            { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio', where: condicionServicio }, { model: Clase, as: 'centroCosto' }] },
                            { model: Usuario, as: 'usuarioProforma', where: condicionUsuario },
                            { model: Cliente, as: 'cliente', where: condicionCliente },
                            { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }
                        ],
                        order: [ordenamiento]
                    }).then((proformas) => {
                        const idFacturasAnuladas = proformas.rows.map(proforma => proforma.facturas_anuladas).filter((e) => e);
                        const idFacturasAnuladasSinRepeticion = [];
                        for (let index = 0; index < idFacturasAnuladas.length; index++) {
                            if (idFacturasAnuladasSinRepeticion.indexOf(idFacturasAnuladas[index]) === -1) {
                                const idCorrecto = idFacturasAnuladas[index] && (idFacturasAnuladas[index] !== '' && idFacturasAnuladas[index] !== null && idFacturasAnuladas[index] !== undefined && idFacturasAnuladas[index] !== '0' ? idFacturasAnuladas[index] : null) || null;
                                if (idCorrecto) {
                                    idFacturasAnuladasSinRepeticion.push(idFacturasAnuladas[index]);
                                }
                            }
                        }
                        if (idFacturasAnuladasSinRepeticion.length > 0) return checkProformasFacturasAnuladasObservacion(res, { proformas: proformas.rows, count: Math.ceil(proformas.count / req.params.items_pagina) }, idFacturasAnuladasSinRepeticion);
                        res.json({ proformas: proformas.rows, count: Math.ceil(proformas.count / req.params.items_pagina) })
                    }).catch((err) => {
                        res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                    });
            } else {
                Proforma.findAll(
                    {
                        where: [condicionSaldo?condicionSaldo:condicion,condicion],
                        include: [
                            { model: Clase, as: 'actividadEconomica', where: condicionActividad },
                            { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio', where: condicionServicio }, { model: Clase, as: 'centroCosto' }] },
                            { model: Usuario, as: 'usuarioProforma', where: condicionUsuario },
                            { model: Cliente, as: 'cliente', where: condicionCliente },
                            { model: Sucursal, as: 'sucursal', where: { activo: true } }
                        ],
                        order: [ordenamiento]
                    }).then((proformas) => {
                        const idFacturasAnuladas = proformas.map(proforma => proforma.facturas_anuladas).filter((e) => e);
                        const idFacturasAnuladasSinRepeticion = [];
                        for (let index = 0; index < idFacturasAnuladas.length; index++) {
                            if (idFacturasAnuladasSinRepeticion.indexOf(idFacturasAnuladas[index]) === -1) {
                                const idCorrecto = idFacturasAnuladas[index] && (idFacturasAnuladas[index] !== '' && idFacturasAnuladas[index] !== null && idFacturasAnuladas[index] !== undefined && idFacturasAnuladas[index] !== '0' ? idFacturasAnuladas[index] : null) || null;
                                if (idCorrecto) {
                                    idFacturasAnuladasSinRepeticion.push(idFacturasAnuladas[index]);
                                }
                            }
                        }
                        if (idFacturasAnuladasSinRepeticion.length > 0) return checkProformasFacturasAnuladasObservacion(res, { proformas: proformas, count: proformas.length }, idFacturasAnuladasSinRepeticion);
                        res.json({ proformas: proformas });
                    }).catch((err) => {
                        res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                    });
            }
        })

    //Ruta para el listado de la ventan de proformas empresa
    router.route('/proformasEmpresa/empresa/:id_empresa/mes/:mes/anio/:anio/id_cliente/:id_cliente/estado/:estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/:excel')
        .get(ensureAuthorizedlogged, function (req, res) {
            let fechas = "";
            if (req.params.mes === "0" && req.params.anio === "0") {
                fechas = " ";
            } else if (req.params.mes === "0" && req.params.anio != "0") {
                fechas = " and p.periodo_anio = " + req.params.anio;
            } else if (req.params.mes != "0" && req.params.anio != "0") {
                const mesTam = req.params.mes.split(",") //parseInt(req.params.mes) 
                let mes = []
                for (let i = 0; i < mesTam.length; i++) {
                    mes.push(parseInt(mesTam[i]) - 1)
                }
                fechas = " and p.periodo_mes in (" + mes.join(',') + ") and p.periodo_anio = " + req.params.anio;
            }
            const empresa = parseInt(req.params.id_empresa);
            if (req.params.id_cliente === "0") {
                const queryBusqueda = (req.params.texto_busqueda != "0") ? " AND c.razon_social like '%" + req.params.texto_busqueda.replace(/'/g, '\'') + "%' " : " ";
                let limite = "";
                if (req.params.items_pagina === "0") {
                    limite = " ";
                } else {
                    limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina;
                }
                const query_count = "select count(c.razon_social)\
                from agil_proforma as p \
                inner join agil_cliente as c on c.id = p.cliente\
                where p.empresa = "+ empresa + "" + fechas + "" + queryBusqueda + "and p.eliminado = false \
                GROUP BY c.razon_social";
                const columns = req.params.columna;
                const direction = (req.params.direccion === 'asc' ? 'asc' : 'desc');
                const query_ = "select c.id, c.razon_social, SUM(p.monto) as totalImporteBs, SUM(p.totalImporteSus) as totalImporteSus,\
                p.periodo_mes, p.periodo_anio\
                from agil_proforma as p \
                inner join agil_cliente as c on c.id = p.cliente\
                where p.empresa="+ empresa + " " + fechas + " " + queryBusqueda + "and p.eliminado = false \
                GROUP BY c.id \
                ORDER BY "+ columns + " " + direction + " " + limite;
                sequelize.query(query_count,
                    { type: sequelize.QueryTypes.SELECT })
                    .then(function (data) {
                        sequelize.query(query_,
                            { type: sequelize.QueryTypes.SELECT })
                            .then(function (proformas) {
                                res.json({ proformas: proformas, paginas: Math.ceil(data.length / req.params.items_pagina) });
                            }).catch((err) => {
                                res.json({ proformas: [], paginas: 0, mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                            });
                    }).catch((err) => {
                        res.json({ proformas: [], paginas: 0, mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                    })
            } else {
                if (req.params.excel !== "0") {
                    const condicion = {};
                    const condicionCliente = { id: parseInt(req.params.id_cliente) }
                    condicion.id_empresa = parseInt(req.params.id_empresa);
                    if (req.params.mes != "0") {
                        const meses = req.params.mes.split(',').map(mes => mes - 1);
                        condicion.periodo_mes = { $in: meses };
                    }
                    if (req.params.anio != "0") {
                        condicion.periodo_anio = parseInt(req.params.anio) || undefined;
                    }
                    Proforma.findAll(
                        {
                            where: condicion,
                            include: [
                                { model: Clase, as: 'actividadEconomica', attributes: ['id', 'nombre'] },
                                { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                                { model: Usuario, as: 'usuarioProforma', attributes: ['id', 'nombre_usuario'] },
                                { model: Cliente, as: 'cliente', where: condicionCliente, attributes: ['id', 'razon_social', 'nit'] },
                                { model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre', 'activo'], where: { activo: true } }
                            ],
                            order: [['fecha_proforma', 'desc']]
                        }).then((proformas) => {
                            res.json({ proformas: proformas });
                        }).catch((err) => {
                            res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                        });
                } else {
                    const id_cliente = parseInt(req.params.id_cliente);
                    if (req.params.estado !== "0") {
                        req.params.estado = true;
                    } else {
                        req.params.estado = null;
                    }
                    if (req.params.mes === "0" && req.params.anio === "0") {
                        fechas = " ";
                    } else if (req.params.mes === "0" && req.params.anio != "0") {
                        fechas = " and p.periodo_anio = " + req.params.anio;
                    } else if (req.params.mes != "0" && req.params.anio != "0") {
                        const mesTam = req.params.mes.split(",") //parseInt(req.params.mes) 
                        let mes = []
                        for (let i = 0; i < mesTam.length; i++) {
                            mes.push(parseInt(mesTam[i]) - 1)
                        }
                        fechas = " and p.periodo_mes in (" + mes.join(',') + ") and p.periodo_anio = " + req.params.anio;
                    }
                    const groupBy = 'p.periodo_mes, p.periodo_anio' // req.params.estado && 'factura,' || '' + 
                    const empresa = parseInt(req.params.id_empresa);
                    const facturas = req.params.estado && ' and factura is not null' || ''
                    const query_ = "select c.razon_social, factura, SUM(p.monto) as totalImporteBs, SUM(p.totalImporteSus) as totalImporteSus,\
                p.periodo_mes, p.periodo_anio\
                from agil_proforma as p \
                inner join agil_cliente as c on c.id = p.cliente\
                where p.empresa="+ empresa + " " + fechas + " " + "and p.eliminado = false and p.cliente = " + id_cliente + facturas + " \
                GROUP BY "+ groupBy + ";"
                    sequelize.query(query_,
                        { type: sequelize.QueryTypes.SELECT })
                        .then((proformas) => {
                            res.json({ proformas: proformas });
                        }).catch((err) => {
                            res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                        });
                }
            }
        })

    router.route('/proformas-comparativo/empresa/:id_empresa/cliente/:id_cliente/mes/:mes/anio/:anio')
        .get(function (req, res) {
            let fechas = "";
            if (req.params.mes === "0" && req.params.anio === "0") {
                fechas = " ";
            } else if (req.params.mes === "0" && req.params.anio != "0") {
                fechas = " and p.periodo_anio = " + req.params.anio;
            } else if (req.params.mes != "0" && req.params.anio != "0") {
                const mesTam = req.params.mes.split(",") //parseInt(req.params.mes) 
                let mes = []
                for (let i = 0; i < mesTam.length; i++) {
                    mes.push(parseInt(mesTam[i]) - 1)
                }
                fechas = " and p.periodo_mes in (" + mes.join(',') + ") and p.periodo_anio = " + req.params.anio;
            }
            let id_cliente = "";
            let razon_social = "";
            if (req.params.id_cliente != "0") {
                id_cliente = "and c.id = " + parseInt(req.params.id_cliente);
                razon_social = "c.razon_social, "
            } else {
                id_cliente = "";
                razon_social = "";
            }
            const empresa = parseInt(req.params.id_empresa);
            sequelize.query("SELECT " + razon_social + "sum(p.monto) as monto,sum(p.totalImporteSus) as totalImporteSus,\
                        p.periodo_mes, p.periodo_anio\
                        FROM agil_proforma as p \
                        inner join agil_cliente as c on c.id = p.cliente "+ id_cliente + "\
                        where p.empresa="+ empresa + " " + fechas + " and p.eliminado = false and p.factura is not null\
                        GROUP BY p.periodo_mes, p.periodo_anio",
                { type: sequelize.QueryTypes.SELECT })
                .then((comparativa_facturas) => {
                    sequelize.query("SELECT " + razon_social + "sum(p.monto) as monto,sum(p.totalImporteSus) as totalImporteSus, p.factura,\
                        p.fecha_cobro, p.periodo_mes, p.periodo_anio\
                        FROM agil_proforma as p \
                        inner join agil_cliente as c on c.id = p.cliente "+ id_cliente + "\
                        where p.empresa="+ empresa + " " + fechas + " and p.eliminado = false and p.factura is null\
                        GROUP BY p.periodo_mes, p.periodo_anio",
                        { type: sequelize.QueryTypes.SELECT })
                        .then((comparativa_proformas) => {
                            const comparativa = { proformas: comparativa_proformas, facturas: comparativa_facturas }
                            res.json({ comparativa: comparativa });
                        }).catch((err) => {
                            res.json({ comparativa: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                        })
                }).catch((err) => {
                    res.json({ comparativa: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                })

        })

    router.route('/proforma-CentroCostos/empresa/:empresa/mes/:mes/anio/:anio')
        .get(function (req, res) {
            var mes = parseInt(req.params.mes) - 1;
            var anio = req.params.anio;
            var empresa = req.params.empresa
            var fecha = "";
            if (mes != "0" && anio != "0") {
                fecha = " and agil_proforma.periodo_mes = " + mes + " and agil_proforma.periodo_anio = " + anio
            }
            Clase.findAll({
                include: [{
                    model: DetallesProformas, as: 'detallesProformas', where: { eliminado: false },
                    include: [{
                        model: Proforma, as: 'proforma',
                        where: { id_empresa: empresa, periodo_mes: mes, periodo_anio: anio, eliminado: false }
                    }]
                }]
            }).then(function (centrosDeCostos) {
                Clase.findAll({
                    include: [
                        {
                            model: MedicoPaciente, as: 'empleadosCampo',
                            include: [{
                                model: RrhhEmpleadoFicha, as: 'empleadosFichas'
                                , include: [{
                                    model: RRHHDetallePlanillaSueldos, as: 'rrhhDetalleSueldos',
                                    include: [{
                                        model: RRHHPlanillaSueldos, as: 'rrhhPlanilla',
                                        where: { id_empresa: empresa, anio: anio, mes: { $like: '%' + (mes + 1) + '%' } }
                                    }]
                                }]
                            }]
                        }]
                }).then(function (centrosDeCostosS) {
                    res.json({ campamentosProformas: centrosDeCostos, campamentosPlanilla: centrosDeCostosS });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack === undefined ? err.message + '<br />' + err.stack : err.message, hasErr: true })
                });
            }).catch(function (err) {
                res.json({ mensaje: err.stack === undefined ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            });
        })

    //Ruta para el graficado de empresa
    router.route('/proformas/empresa/:id_empresa/mes/:mes/anio/:anio')
        .get(ensureAuthorizedlogged, function (req, res) {
            var fechas = "";
            if (req.params.mes === "0" && req.params.anio === "0") {
                fechas = " ";
            } else if (req.params.mes === "0" && req.params.anio != "0") {
                fechas = " and p.periodo_anio = " + req.params.anio;
            } else if (req.params.mes != "0" && req.params.anio != "0") {
                fechas = "and p.periodo_mes = " + req.params.mes + " and p.periodo_anio = " + req.params.anio;
            }
            var empresa = req.params.id_empresa;

            sequelize.query("select c.id, c.razon_social, SUM(p.monto) as totalImporteBs, SUM(p.totalImporteSus) as totalImporteSus\
                from agil_proforma as p \
                inner join agil_cliente as c on c.id = p.cliente\
                where p.empresa="+ empresa + "" + fechas + "and p.eliminado = false \
                GROUP BY c.id",
                { type: sequelize.QueryTypes.SELECT })
                .then(function (proformas) {
                    res.json({ proformas: proformas })
                });
        })

    router.route('/proforma-sucursales/:id_usuario')
        .get(ensureAuthorizedlogged, function (req, res) {
            UsuarioSucursal.findAll({
                where: {
                    id_usuario: req.params.id_usuario
                },
                include: [{
                    model: Sucursal, as: 'sucursal', where: { activo: true },
                    include: [
                        { model: Almacen, as: 'almacenes' },
                        {
                            model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
                            include: [{ model: ContabilidadCuenta, as: 'cuenta' }, { model: ContabilidadCuenta, as: 'cuentaCajaBanco' }, { model: Dosificacion, as: 'dosificacion' },
                            { model: Clase, as: 'actividad' }]
                        }]
                }]
            }).then(function (entidades) {
                res.json({ sucursales: entidades });
            }).catch(function (err) {
                res.json({ mensaje: err.stack === undefined ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            });
        });

    router.route('/guardar/proforma/:id_empresa/:usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            const detalles = []
            const proforma = { id: 0 }
            sequelize.transaction(function (t) {
                return Sucursal.find({
                    where: { id: req.body.sucursal.id }
                }).then(function (sucursal) {
                    if (!sucursal.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
                    var conteo = sucursal.dataValues.correlativo_proforma + 1
                    return Sucursal.update({
                        correlativo_proforma: conteo
                    }, {
                        where: { id: sucursal.dataValues.id },
                        transaction: t
                    }).then(function (sucursalActualizada) {
                        return Proforma.create({
                            fecha_proforma: new Date(),//req.body.fecha_proforma,
                            // fecha_proforma_ok:null,
                            // fecha_recepcion:null,
                            // fecha_factura:null,
                            // fecha_cobro:null,
                            id_empresa: req.body.id_empresa,
                            detalle: req.body.detalle,
                            periodo_mes: req.body.periodo_mes.id,
                            periodo_anio: req.body.periodo_anio.id,
                            id_sucursal: req.body.sucursal.id,
                            id_actividad: req.body.actividadEconomica.id,
                            id_cliente: req.body.cliente.id,
                            id_usuario: req.body.usuarioProforma.id,
                            totalImporteBs: req.body.totalImporteBs,
                            totalImporteSus: req.body.totalImporteSus,
                            correlativo: sucursal.dataValues.correlativo_proforma,
                            eliminado: false
                        }, { transaction: t }).then(function (proformaCreada) {
                            proforma.id = proformaCreada.id;
                           // proforma.fecha_proforma = proformaCreada.fecha_proforma;
                            proforma.fecha_proforma = proformaCreada.fecha_proforma;
                            proforma.actividadEconomica = { id: proformaCreada.id_actividad }
                            req.body.detallesProformas.map(function (detalle, i) {
                                detalles.push(crearDetalleProforma(proformaCreada, detalle, t))
                            })
                            return Promise.all(detalles)
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
                });
            }).then(function (result) {
                if (result.length === req.body.detallesProformas.length) {
                    res.json({ mensaje: 'Proforma creada satisfactoriamente!', proforma: proforma })
                } else {
                    res.json({ mensaje: 'Existe un error no identificado!' })
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
            });
        })

    router.route('/importacion/proforma/:id_empresa/:usuario')
        .post(ensureAuthorizedlogged, function (req, res) {
            var proformas = []
            var errores = []
            return Sucursal.findAll({
                where: { id_empresa: req.params.id_empresa, activo: true }
            }).then(function (sucursales) {
                var sucursal = sucursales[0]
                sequelize.transaction(function (t) {
                    for (var index = 0; index < req.body.length; index++) {
                        if (req.body[index].actividad !== null) {
                            proformas.push(crearProformaImportada(req.body[index], t, sucursal, req.params.usuario, req.params.id_empresa))
                        } else {
                            errores.push(('Error: sin actividad; linea excel: ' + req.body[index].row))
                        }
                    }
                    return Promise.all(proformas)
                }).then(function (result) {
                    if (result.length === req.body.length) {
                        res.json({ mensaje: 'Proformas importadas satisfactoriamente!' })
                    } else {
                        res.json({ mensaje: errores })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
                });
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
            });
        })

    function crearProformaImportada(proforma, t, sucursal, usuario, empresa) {
        if (!sucursal.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
        var detalles = []
        var nombre_cliente = proforma.nombre_cliente.trim().split(' ')
        nombre_cliente = nombre_cliente.map(function (str) {
            var ts = str.trim()
            if (ts.length > 0) {
                return str
            }
            return ''
        })
        nombre_cliente = nombre_cliente.join(' ')
        return Cliente.findOrCreate({
            where: {
                razon_social: nombre_cliente.trim(),
                id_empresa: empresa
            },
            defaults: {
                razon_social: nombre_cliente.trim(),
                nit: proforma.nit.trim(),
                id_empresa: empresa
            },
            transaction: t
        }).spread(function (cliente, created) {
            if (cliente) {
                return Clase.find({
                    where: {
                        nombre: proforma.actividad,
                    },
                    transaction: t
                }).then(function (actividad) {
                    if (actividad) {
                        return Proforma.findOrCreate({
                            where:
                            {
                                id_empresa: empresa,
                                correlativo: proforma.correlativo,
                                eliminado: false
                            },
                            defaults: {
                                fecha_proforma: proforma.fecha_proforma,
                                fecha_proforma_ok: proforma.fecha_proforma_ok,
                                fecha_recepcion: proforma.fecha_recepcion,
                                fecha_factura: null,
                                fecha_cobro: null,
                                id_empresa: empresa,
                                detalle: proforma.detalle,
                                periodo_mes: ((parseInt(proforma.periodo_mes)) - 1),
                                periodo_anio: proforma.periodo_anio,
                                id_sucursal: sucursal.id,
                                id_actividad: actividad.id,
                                id_cliente: cliente.id,
                                id_usuario: usuario,
                                totalImporteBs: parseFloat(proforma.monto),
                                totalImporteSus: parseFloat(proforma.totalImporteSus),
                                correlativo: proforma.correlativo,
                                eliminado: false
                            },
                            transaction: t
                        }).spread(function (proformaCreadaEncontrada, created) {
                            if (created) {
                                proforma.detallesProformas.forEach(function (detalle, i) {
                                    detalles.push(crearDetalleProformaImportada(proformaCreadaEncontrada, detalle, t, actividad, empresa))
                                })
                                return Promise.all(detalles)
                            } else {
                                return DetallesProformas.destroy({
                                    where: { id_proforma: proformaCreadaEncontrada.id },
                                    transaction: t
                                }).then(function name(detallesEliminados) {
                                    return Proforma.destroy({
                                        where: { id: proformaCreadaEncontrada.id },
                                        transaction: t
                                    }).then(function (proformaEliminada) {
                                        return Proforma.create({
                                            fecha_proforma: proforma.fecha_proforma,
                                            fecha_proforma_ok: proforma.fecha_proforma_ok,
                                            fecha_recepcion: proforma.fecha_recepcion,
                                            fecha_factura: null,
                                            fecha_cobro: null,
                                            id_empresa: empresa,
                                            detalle: proforma.detalle,
                                            periodo_mes: ((parseInt(proforma.periodo_mes)) - 1),
                                            periodo_anio: proforma.periodo_anio,
                                            id_sucursal: sucursal.id,
                                            id_actividad: actividad.id,
                                            id_cliente: cliente.id,
                                            id_usuario: usuario,
                                            totalImporteBs: parseFloat(proforma.monto),
                                            totalImporteSus: parseFloat(proforma.totalImporteSus),
                                            correlativo: proforma.correlativo,
                                            eliminado: false
                                        }, { transaction: t }).then(function (proformaCreada) {
                                            proforma.detallesProformas.forEach(function (detalle, i) {
                                                detalles.push(crearDetalleProformaImportada(proformaCreada, detalle, t, actividad, empresa))
                                            })
                                            return Promise.all(detalles)
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
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
                    } else {
                        return new Promise(function (fullfil, reject) {
                            reject('No se encontro la actividad "' + proforma.actividad + '" en la base de datos. No se almaceno ningun dato. ')
                        })
                    }
                })
            } else {
                return new Promise(function (fullfil, reject) {
                    reject('No se encontro el cliente "' + proforma.nombre_cliente + '" en la base de datos. No se almaceno ningun dato.')
                })
            }
        })
    }

    function crearDetalleProformaImportada(proformaCreada, detalle, t, actividad, empresa) {
        var servname = detalle.servicio.trim()
        // if (servname === "Servicio de Alquielr de Equipos") {
        //     servname = "Servicio de Alquiler de Equipos"
        // }
        return Servicios.find({
            where: { nombre: servname, id_empresa: empresa },
            transaction: t
        }).then(function (servicio) {
            if (servicio) {
                return Clase.find({
                    where: {
                        nombre: detalle.centro_costos
                    },
                    transaction: t
                }).then(function (centroCostos) {
                    return DetallesProformas.create({
                        id_proforma: proformaCreada.id,
                        id_servicio: servicio.id,
                        precio_unitario: detalle.precio_unitario,
                        cantidad: detalle.cantidad,
                        importe: (detalle.monto * detalle.cantidad),
                        id_centro_costo: centroCostos && detalle.centro_costos ? centroCostos.id : null,
                        eliminado: false
                    }, { transaction: t }).then(function (detalleCreado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill(detalleCreado)
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                }).catch(function (err) {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
            } else {
                return new Promise(function (fullfil, reject) {
                    reject('No se encontro el servicio "' + detalle.servicio + ' (Actividad: ' + actividad.nombre + ')" en la base de datos. No se almaceno ningún dato.')
                })
            }
        })
    }

    function crearDetalleProforma(proformaCreada, detalle, t) {
        return DetallesProformas.create({
            id_proforma: proformaCreada.id,
            id_servicio: detalle.id_servicio,
            precio_unitario: detalle.precio_unitario,
            cantidad: detalle.cantidad,
            importe: detalle.importe,
            id_centro_costo: detalle.centroCosto !== undefined && detalle.centroCosto !== null ? detalle.centroCosto.id : null,
            eliminado: false
        }, { transaction: t }).then(function (detalleCreado) {
            return new Promise(function (fulfill, reject) {
                fulfill(detalleCreado)
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    router.route('/fechas/proforma/:id')
        .post(ensureAuthorizedlogged, (req, res) => {
            const currentDateTime = new Date();
            const fecha_recepcion = req.body.fecha_recepcion && new Date(req.body.fecha_recepcion.split('-')[0], req.body.fecha_recepcion.split('-')[1] - 1, req.body.fecha_recepcion.split('-')[2], currentDateTime.getHours(), currentDateTime.getMinutes()) || null;
            const fecha_proforma_ok = req.body.fecha_proforma_ok && new Date(req.body.fecha_proforma_ok.split('-')[0], req.body.fecha_proforma_ok.split('-')[1] - 1, req.body.fecha_proforma_ok.split('-')[2], currentDateTime.getHours(), currentDateTime.getMinutes()) || null;
            const fecha_factura = req.body.fecha_factura && new Date(req.body.fecha_factura.split('-')[0], req.body.fecha_factura.split('-')[1] - 1, req.body.fecha_factura.split('-')[2], currentDateTime.getHours(), currentDateTime.getMinutes()) || null;
            const fecha_cobro = req.body.fecha_cobro && new Date(req.body.fecha_cobro.split('-')[0], req.body.fecha_cobro.split('-')[1] - 1, req.body.fecha_cobro.split('-')[2], currentDateTime.getHours(), currentDateTime.getMinutes()) || null;
            Proforma.update({
                fecha_recepcion: fecha_recepcion,
                fecha_proforma_ok: fecha_proforma_ok,
                fecha_factura: fecha_factura,
                fecha_cobro: fecha_cobro
                // fecha_recepcion: (req.body.fecha_recepcion !== null) ? new Date(req.body.fecha_recepcion) : null,
                // fecha_proforma_ok: (req.body.fecha_proforma_ok !== null) ? new Date(req.body.fecha_proforma_ok) : null,
                // fecha_factura: (req.body.fecha_factura !== null) ? new Date(req.body.fecha_factura) : null,
                // fecha_cobro: (req.body.fecha_cobro !== null) ? new Date(req.body.fecha_cobro) : null
            }, {
                where: {
                    id: req.body.id
                }
            }).then(function (fechasActualizadas) {
                res.json({ mensaje: 'Correctamente.' })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })
    router.route('/proforma/:id')
        .get(ensureAuthorizedlogged, (req, res) => {
            Proforma.find(
                {
                    where: { id: req.params.id },
                    include: [
                        { model: Clase, as: 'actividadEconomica' },
                        { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                        { model: Usuario, as: 'usuarioProforma' },
                        { model: Cliente, as: 'cliente' },
                        {
                            model: Sucursal, as: 'sucursal', include: [
                                // { model: Almacen, as: 'almacenes' },
                                {
                                    model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
                                    include: [{ model: Dosificacion, as: 'dosificacion' },
                                    { model: Clase, as: 'actividad' }]
                                }]
                        }
                    ]
                }).then(function (proforma) {
                    res.json({ proforma: proforma })
                }).catch(function (err) {
                    res.json({ proforma: {}, mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            Sucursal.find({
                where: {
                    id: req.body.sucursal.id
                }
            }).then((suc) => {
                sequelize.transaction(function (t) {
                    if (!suc.activo) throw new Error('Sucursal deshabilitada, no se puede hacer cambios.')
                    var promesas = []
                    return Proforma.update({
                        // fecha_proforma: req.body.fecha_proforma,
                        // fecha_proforma_ok:null,
                        // fecha_recepcion:null,
                        // fecha_factura:null,
                        // fecha_cobro:null,
                        detalle: req.body.detalle,
                        id_empresa: req.body.id_empresa,
                        periodo_mes: req.body.periodo_mes.id,
                        periodo_anio: req.body.periodo_anio.id,
                        id_sucursal: req.body.sucursal.id,
                        id_actividad: req.body.actividadEconomica.id,
                        id_cliente: req.body.cliente.id,
                        id_usuario: req.body.usuarioProforma.id,
                        totalImporteBs: req.body.totalImporteBs,
                        totalImporteSus: req.body.totalImporteSus,
                        eliminado: false
                    }, { where: { id: req.params.id }, transaction: t }).then(function (proformaActualizada) {
                        return DetallesProformas.destroy({
                            where: { id_proforma: req.params.id }
                            , transaction: t
                        }).then(function (detalleEliminado) {
                            req.body.detallesProformas.forEach(function (detalle) {
                                if (!detalle.eliminado) {
                                    promesas.push(crearDetalleProforma({ id: req.params.id }, detalle, t))
                                }
                            })
                            return Promise.all(promesas)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject(err)
                            })
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject(err)
                        })
                    });
                }).then(function (result) {
                    res.json({ mensaje: 'Actualizado correctamente.' })
                }).catch(function (err) {
                    res.json({ proforma: {}, mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
            }).catch(function (err) {
                res.json({ proforma: {}, mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });

        })

    router.route('/actividades/historial/:id/:id_sucursal')
        .get(ensureAuthorizedlogged, function (req, res) {
            SucursalActividadDosificacion.findAll({
                where: { id_sucursal: req.params.id_sucursal, id_actividad: req.params.id, expirado: true },
                include: [{ model: Dosificacion, as: 'dosificacion' },
                { model: Clase, as: 'actividad' }]
            }).then(function (histo) {
                res.json({ historial: histo })
            }).catch(function (err) {
                res.json({ historial: [], mensaje: err.stack ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            })
        })
    router.route('/asignar-cuentas-actividades')
        .post(ensureAuthorizedlogged, function (req, res) {
            SucursalActividadDosificacion.update({
                id_cuenta: req.body.id_cuenta ? req.body.id_cuenta : null,
                id_cuenta_caja_banco: req.body.id_cuenta_caja_banco ? req.body.id_cuenta_caja_banco : null,
            }, {
                where: { id: req.body.id }
            }).then(function (actualizado) {
                res.json({ mensaje: "cuenta asignada satisfactoriamente!" })
            }).catch(function (err) {
                res.json({ historial: [], mensaje: err.stack ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            })
        });
    router.route('/actividades/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            var mensajeExtra = ""
            const sucursales = req.body.map(actividad => actividad.id_sucursal)
            Sucursal.findAll({
                where: {
                    id: { $in: sucursales },
                    activo: false
                }
            }).then((suc) => {
                if (suc.length > 0) {
                    return res.json({ mensaje: 'Existe(n) sucursal(es) deshabilitada(s), no se puede hacer cambios.' })
                }
                req.body.map(function (actividad, i) {
                    if (actividad.id !== undefined) {
                        var enUso = false
                        if (actividad.eliminado) {
                            Servicios.find({
                                where: { id_actividad: actividad.id_actividad }
                            }).then(function (ActividadEnUso) {
                                if (ActividadEnUso !== null) {
                                    if (ActividadEnUso.id !== undefined) {
                                        enUso = true
                                        mensajeExtra += ". La actividad " + actividad.actividad.nombre + " tiene servicios activos y no se puede eliminar. Para eliminar la actividad primero elimine sus servicios."
                                    }
                                }
                                if (!enUso) {
                                    SucursalActividadDosificacion.update({
                                        expirado: true
                                    }, {
                                        where: { id: actividad.id }
                                    }).then(function (actividadEliminada) {
                                        Dosificacion.update({
                                            expirado: true,
                                            where: { id: actividad.dosificacion.id }
                                        }).then(function (dosificacionExpirada) {
                                            if (i === req.body.length - 1) {
                                                res.json({ mensaje: 'Actividades actualizadas satisfactoriamente!' + mensajeExtra })
                                            }
                                        }).catch(function (err) {
                                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                                        });
                                    }).catch(function (err) {
                                        res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                                    });
                                } else {
                                    if (i === req.body.length - 1) {
                                        res.json({ mensaje: mensajeExtra })
                                    }
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                            });

                        } else {
                            SucursalActividadDosificacion.update({
                                expirado: true,
                                id_cuenta: actividad.id_cuenta
                            }, {
                                where: { id: actividad.id }
                            }).then(function (actividadEmpresaCreada) {
                                Dosificacion.update({
                                    expirado: true
                                }, {
                                    where: { id: actividad.dosificacionAnterior.id }
                                }).then(function (dosificacionExpirada) {
                                    if (i === req.body.length - 1) {
                                        SucursalActividadDosificacion.create({
                                            id_sucursal: actividad.id_sucursal,
                                            id_actividad: actividad.id_actividad,
                                            id_dosificacion: actividad.dosificacion !== undefined && actividad.dosificacion !== null ? actividad.dosificacion.id : null,
                                            expirado: false
                                        }).then(function (actividadEmpresaCreada) {
                                            if (i === req.body.length - 1) {
                                                res.json({ mensaje: 'Actividades actualizadas satisfactoriamente!' })
                                            }
                                        }).catch(function (err) {
                                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                                        });
                                    }
                                }).catch(function (err) {
                                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                                });
                            }).catch(function (err) {
                                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                            });
                        }
                    } else {
                        SucursalActividadDosificacion.create({
                            id_sucursal: actividad.sucursal.id,
                            id_actividad: actividad.actividad.id,
                            id_dosificacion: actividad.dosificacion !== undefined && actividad.dosificacion !== null ? actividad.dosificacion.id : null,
                            expirado: false
                        }).then(function (actividadEmpresaCreada) {
                            if (i === req.body.length - 1) {
                                res.json({ mensaje: 'Actividades actualizadas satisfactoriamente!' })
                            }
                        }).catch(function (err) {
                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                        });
                    }
                })
            }).catch((err) => {
                res.json({ mensaje: err.stack, hasErr: true })
            })

        })
        .get(ensureAuthorizedlogged, function (req, res) {
            Clase.findAll({
                where: { habilitado: true },
                include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
            }).then(function (actividades) {
                res.json({ actividades: actividades })
            }).catch(function (err) {
                res.json({ actividades: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })

    router.route('/actividades/servicios/empresa/:id_empresa/:id_actividad')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.length > 0) {
                req.body.map(function (servicio, i) {
                    var enUso = false
                    var mensajeExtra = ""
                    if (servicio.id !== undefined) {
                        if (servicio.eliminado) {
                            DetallesProformas.find({
                                where: { id_servicio: servicio.id }
                            }).then(function (servicioEnuso) {
                                if (servicioEnuso !== null) {
                                    if (servicioEnuso.id !== undefined) {
                                        enUso = true
                                        mensajeExtra += ". El servicio " + servicio.nombre + " ya fué utilizado y no se puede eliminar"
                                    }
                                }
                                if (!enUso) {
                                    Servicios.destroy({
                                        where: { id: servicio.id }
                                    }).then(function (actividadEliminada) {
                                        if (i === req.body.length - 1) {
                                            res.json({ mensaje: 'Servicios actualizados satisfactoriamente!' + mensajeExtra })
                                        }
                                    }).catch(function (err) {
                                        res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                                    });
                                } else {
                                    if (i === req.body.length - 1) {
                                        res.json({ mensaje: 'Servicios actualizados satisfactoriamente!' + mensajeExtra })
                                    }
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                            });
                        } else {
                            Servicios.update({
                                id_actividad: servicio.actividad.id,
                                centro_costo: null,
                                codigo: servicio.codigo,
                                nombre: servicio.nombre,
                                precio: parseFloat(servicio.precio),
                                id_empresa: req.params.id_empresa,
                                eliminado: false
                            }, {
                                where: { id: servicio.id }
                            }).then(function (servicioActualizado) {
                                if (i === req.body.length - 1) {
                                    res.json({ mensaje: 'Servicios actualizados satisfactoriamente!' })
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                            });
                        }
                    } else {
                        Servicios.create({
                            id_actividad: servicio.actividad.id,
                            centro_costo: null,
                            codigo: servicio.codigo,
                            nombre: servicio.nombre,
                            precio: parseFloat(servicio.precio),
                            id_empresa: req.params.id_empresa,
                            eliminado: false
                        }).then(function (servicioCreado) {
                            if (i == req.body.length - 1) {
                                res.json({ mensaje: 'Servicio creado satisfactoriamente!' })
                            }
                        }).catch(function (err) {
                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                        });
                    }
                })
            } else {
                res.json({ mensaje: 'No se encontraron datos para guardar' })
            }
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            Servicios.findAll({
                where: {
                    id_actividad: req.params.id_actividad,
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'actividad' }]
            }).then(function (servicios) {
                if (servicios !== null) {
                    res.json({ servicios: servicios })
                } else {
                    res.json({ servicios: [] })
                }

            }).catch(function (err) {
                res.json({ servicios: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })
        .put(ensureAuthorizedlogged, function (req, res) {
            Servicios.update({
                id_actividad: servicio.actividad.id,
                centro_costo: null,
                codigo: servicio.codigo,
                nombre: servicio.nombre,
                precio: parseFloat(servicio.precio),
                id_empresa: req.params.id_empresa,
                eliminado: false,
                where: { id: req.body.id }
            }).then(function (servicioActualizado) {
                res.json({ mensaje: 'Servicio actualizado' })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })

    router.route('/eliminar/proforma/:id')
        .post(ensureAuthorizedlogged, (req, res) => {
            Proforma.find({
                where: req.body.id
            }).then((prof) => {
                if (prof.fecha_factura || prof.fecha_cobro) {
                    res.json({ mensaje: '<strong><h2>Desea anular la factura?</h2></strong><small>La proforma no se puede anular, debido a que ya fué aceptada, facturada y/o cobrada.</small><br> <small><small><small>Si no ha sido aceptada, facturada o cobrada pongase en contacto con servicio.</small></small></small>', factura: true, hasErr: true })
                } else {
                    if (req.body.observacion === '' & req.body.observacion.length < 10) return res.json({ mensaje: 'Debe proveer una observación de la menos 9 caracteres para la anulación.', hasErr: true })
                    Proforma.update({
                        eliminado: true,
                        observacion: req.body.observacion
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then((fechasActualizadas) => {
                        res.json({ mensaje: 'Proforma Anulada.' })
                    }).catch((err) => {
                        res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                    });
                }
            }).catch((err) => {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })


    router.route('/eliminar/FacturaProforma/:id')
        .post(ensureAuthorizedlogged, (req, res) => {
            Proforma.find({
                where: req.body.id,
                attributes: ['factura', 'autorizacion', 'facturas_anuladas', 'fecha_factura', 'periodo_mes', 'periodo_anio', 'id_sucursal', 'id_actividad', 'id_usuario', 'id_empresa']
            }).then((proforma) => {
                Sucursal.find({
                    where: {
                        id: proforma.id_sucursal
                    }

                }).then((suc) => {
                    if (!suc.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se pueden realizar cambios.' })
                    const observacion = req.body.observacion && req.body.observacion || null;
                    const numero_factura = proforma && proforma.factura || null;
                    const autorizacion = proforma && proforma.autorizacion || null;
                    if (numero_factura && autorizacion) {
                        Proforma.findAll({
                            where: {
                                factura: numero_factura,
                                autorizacion: autorizacion,
                                fecha_cobro: { $not: null }
                            },
                            attributes: ['fecha_cobro']
                        }).then((proformas) => {
                            if (proformas.length > 0) {
                                res.json({ mensaje: 'No se puede anular la factura, ya fué cobrada.', hasErr: true, err: true })
                            } else {
                                Proforma.findAll({
                                    where: {
                                        factura: numero_factura,
                                        autorizacion: autorizacion
                                    },
                                    attributes: ['id', 'monto', "totalImporteSus", 'cliente', 'correlativo']
                                }).then((proformasAnulacion) => {
                                    const idProformasAnulacion = proformasAnulacion.map(proforma => proforma.dataValues.id).join(',')
                                    const correlativosProformasAnulacion = proformasAnulacion.map(proforma => proforma.dataValues.correlativo).join(',')
                                    const monto = proformasAnulacion.reduce((val, proforma) => {
                                        val += proforma.dataValues.monto
                                        return val
                                    }, 0)
                                    const totalImporteSus = proformasAnulacion.reduce((val, proforma) => {
                                        val += proforma.dataValues.totalImporteSus
                                        return val
                                    }, 0)
                                    const id_cliente = proformasAnulacion[0].dataValues.cliente
                                    sequelize.transaction((t) => {
                                        return Proforma.update({
                                            factura: null,
                                            autorizacion: null,
                                            fecha_factura: null,
                                            contabilizado: false
                                        }, {
                                            where: {
                                                factura: numero_factura,
                                                autorizacion: autorizacion
                                            },
                                            transaction: t
                                        }).then((result) => {
                                            return registroFacturaAnulada(t, proforma.fecha_factura, proforma.periodo_mes, proforma.periodo_anio,
                                                proforma.id_sucursal, proforma.id_actividad, proforma.id_usuario, proforma.id_empresa, numero_factura, autorizacion, observacion,
                                                idProformasAnulacion, monto, totalImporteSus, id_cliente, correlativosProformasAnulacion)
                                        }).catch((err) => {
                                            throw err
                                        });
                                    }).then((transaction) => {
                                        if (Array.isArray(transaction)) {
                                            res.json({ mensaje: transaction[0], err: false });
                                        } else {
                                            res.json({ mensaje: transaction, err: false });
                                        }
                                    }).catch((err) => {
                                        res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, err: true })
                                    });
                                }).catch((err) => {
                                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, err: true })
                                })
                            }
                        }).catch((err) => {
                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, err: true })
                        });
                    } else {
                        res.json({ mensaje: 'Hubo un problema con el número de factura o autorización, no se realizó ningún cambio.', hasErr: true, err: true })
                    }
                }).catch((err) => {
                    res.json({ mensaje: err.stack, hasErr: true, err: true })
                })
            }).catch((err) => {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, err: true })
            });
        })


    router.route('/factura/:id_factura/proforma/facturada/:id_empresa/:autorizacion/:anulada')
        .get(ensureAuthorizedlogged, (req, res) => {
            if (req.params.anulada !== '0') {
                ProformaFacturaAnulada.find({
                    where: {
                        factura: req.params.id_factura,
                        autorizacion: req.params.autorizacion
                    },
                    include: [
                        { model: Clase, as: 'actividadEconomica', attributes: ['id', 'nombre'] },
                        // { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio', where: condicionServicio }, { model: Clase, as: 'centroCosto' }] },
                        { model: Usuario, as: 'usuarioProforma', attributes: ['id', 'nombre_usuario'] },
                        // { model: Cliente, as: 'cliente', where: condicionCliente, attributes: ['id', 'razon_social'] },
                        {
                            model: Sucursal, as: 'sucursal', include: [
                                {
                                    model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
                                    include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
                                    { model: Clase, as: 'actividad' }]
                                }]
                        }
                    ],
                    group: ['factura']
                }).then((facturaAnulada) => {
                    facturaAnulada.dataValues.detallesProformas = [{ importe: 0, cantidad: 0, total: 0, precio_unitario: 0, servicio: { nombre: 'ANULADA' } }];
                    facturaAnulada.dataValues.cliente = { razon_social: 'ANULADA', nit: '0' };
                    facturaAnulada.dataValues.detalle = 'ANULADA';
                    facturaAnulada.dataValues.fecha_limite_emision = facturaAnulada.fecha_factura;
                    facturaAnulada.dataValues.cambio_dolar = 0;
                    res.json({ datosProformas: [facturaAnulada] })
                }).catch((err) => {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
            } else {
                Proforma.findAll({
                    where: {
                        factura: req.params.id_factura,
                        correlativo: { $ne: null },
                        autorizacion: req.params.autorizacion
                    },
                    include: [
                        { model: Clase, as: 'actividadEconomica' },
                        { model: DetallesProformas, as: 'detallesProformas', where: { eliminado: false }, include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                        { model: Usuario, as: 'usuarioProforma' },
                        { model: Cliente, as: 'cliente' },
                        {
                            model: Sucursal, as: 'sucursal', include: [
                                {
                                    model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
                                    include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
                                    { model: Clase, as: 'actividad' }]
                                }]
                        }
                    ]
                }).then((facturadas) => {
                    res.json({ datosProformas: facturadas })
                }).catch((err) => {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
            }
        })

    router.route('/alertas/proformas/cantidad/:id_empresa')
        .get(function (req, res) {
            var condicion = {
                id_empresa: req.params.id_empresa,
                eliminado: false,
                fecha_factura: null,
                fecha_proforma_ok: { $not: null }
            }
            Proforma.count({
                where: condicion,
                include: [
                    { model: Clase, as: 'actividadEconomica', required: false },
                    { model: Cliente, as: 'cliente' }
                ]
            }).then(function (proformasAlertas) {
                res.json({ cantidad_proformas: proformasAlertas })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })

    router.route('/alertas/proformas/:id_empresa/:mes/:anio/:razon_social/:proforma/col/:col/dir/:dir')
        .get(ensureAuthorizedlogged, (req, res) => {
            const condicionCliente = { id_empresa: parseInt(req.params.id_empresa) }
            const condicion = {
                id_empresa: parseInt(req.params.id_empresa),
                eliminado: false,
                fecha_factura: null,
                fecha_proforma_ok: { $not: null }
            }
            if (req.params.mes != "0") {
                condicion.periodo_mes = (parseInt(req.params.mes) - 1)
            }
            if (req.params.anio != "0") {
                condicion.periodo_anio = parseInt(req.params.anio)
            }
            if (req.params.razon_social != "0") {
                condicionCliente.razon_social = { $like: req.params.razon_social + '%' }
            }
            if (req.params.proforma != "0") {
                condicion.correlativo = parseInt(req.params.proforma)
            }
            const direccionOrden = (req.params.dir === 'asc' ? 'asc' : 'desc')
            let ordenamiento = []
            if (req.params.col === "correlativoProforma") {
                ordenamiento.push(['correlativo', direccionOrden])
            } else if (req.params.col === "nitAlertaProforma") {
                ordenamiento = sequelize.literal('`cliente.nit` ' + direccionOrden)
            } else if (req.params.col === "clienteProforma") {
                ordenamiento = sequelize.literal('`cliente.razon_social` ' + direccionOrden)
            } else if (req.params.col === "actividadEconomicaProforma") {
                ordenamiento = sequelize.literal('`actividadEconomica`.`nombre` ' + direccionOrden)
            } else if (req.params.col === "periodoAlertaProforma") {
                ordenamiento.push([{ raw: 'periodo_mes + periodo_anio ' + direccionOrden }])
            } else if (req.params.col === "fecha_proforma_alertas") {
                ordenamiento.push([{ raw: 'fecha_proforma + correlativo ' + direccionOrden }])
            } else if (req.params.col === "fecha_proforma_ok_alertas") {
                ordenamiento.push([{ raw: 'correlativo + fecha_proforma_ok ' + direccionOrden }])
            } else if (req.params.col === "total_bs_proforma_alertas") {
                ordenamiento = sequelize.literal('totalImporteBs ' + direccionOrden)
            } else if (req.params.col === "total_sus_proforma_alertas") {
                ordenamiento = sequelize.literal('totalImporteBs ' + direccionOrden)
            } else {
                ordenamiento.push(['correlativo', direccionOrden])
            }
            if (req.params.id_empresa) {
                Proforma.findAll({
                    where: condicion,
                    include: [
                        { model: Clase, as: 'actividadEconomica', required: false },
                        { model: Cliente, as: 'cliente', where: condicionCliente }
                    ],
                    order: ordenamiento
                }).then((proformasAlertas) => {
                    res.json({ proformas: proformasAlertas });
                }).catch((err) => {
                    res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
            } else {
                res.json({ mensaje: 'No se puede identificar la empresa.', hasErr: true })
            }
        })

    function formatearFecha(fecha) {
        const mes = fecha.split('/')[1];
        const dia = fecha.split('/')[0];
        const anio = fecha.split('/')[2]
        const MyDateString = anio + '' + ('0' + mes).slice(-2) + '' + ('0' + dia).slice(-2);
        return MyDateString
    }
    router.route('/actividades/servicios/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            // const factura = req.body;
            SucursalActividadDosificacion.findAll({
                where: {
                    id_dosificacion: { $not: null },
                    id_sucursal: { $not: null },
                    expirado: false
                },
                include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura', required: false }] },
                { model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa, activo: true }, include: [{ model: Empresa, as: 'empresa' }] },
                { model: Clase, as: 'actividad' }]
            }).then(function (actividades) {
                res.json({ actividades: actividades })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })

    router.route('/clientes/centroCostos/:id_cliente')
        .get(ensureAuthorizedlogged, function (req, res) {
            ClienteCentroCostos.findAll({
                where: {
                    id_cliente: req.params.id_cliente
                },
                include: [{ model: Clase, as: 'centroCosto' }]
            }).then(function (centroCostos) {
                res.json({ centros: centroCostos })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
            });
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                if (req.body.length > 0) {
                    for (var index = 0; index < req.body.length; index++) {
                        if (req.body[index].eliminado) {
                            promises.push(eliminarAsignacionCentroCostoCliente(req.params.id_cliente, req.body[index], t))
                        } else {
                            promises.push(AsignarCentroCostoCliente(req.params.id_cliente, req.body[index], t))
                        }
                    }
                } else {
                    return new Promise(function (fulfill, reject) {
                        reject('No hay información para guardar.')
                    })
                }
                return Promise.all(promises)
            }).then(function (result) {
                if (result.length > 0) {
                    res.json({ mensaje: 'Actualizado correctamente' })
                } else {
                    throw new Error('Error al guardar los datos.')
                }
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err, hasErr: true })
            });
        })

    function AsignarCentroCostoCliente(clienteId, centro, t) {
        ClienteCentroCostos.create({
            id_cliente: clienteId,
            id_centro: centro.id
        }, { transaction: t }).then(function (centroCreado) {
            return new Promise(function (fullfil, reject) {
                fullfil(centroCreado)
            })
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                reject(err)
            })
        });
    }
    function eliminarAsignacionCentroCostoCliente(clienteId, centro, t) {
        ClienteCentroCostos.destroy({
            where: {
                id_cliente: clienteId,
                id_centro: centro.id
            }
        }, { transaction: t }).then(function (AsiganacionEliminada) {
            return new Promise(function (fullfil, reject) {
                fullfil(centroCreado)
            })
        }).catch(function (err) {
            return new Promise(function (fullfil, reject) {
                reject(err)
            })
        });
    }


    router.route('/proforma/facturar/:id_empresa')
        .post(ensureAuthorizedlogged, (req, res) => {
            const factura = req.body;
            ConfiguracionGeneralFactura.find({
                where: {
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'impresionFactura' },
                { model: Clase, as: 'tipoFacturacion' },
                { model: Clase, as: 'tamanoPapelFactura' },
                { model: Clase, as: 'tituloFactura' },
                { model: Clase, as: 'subtituloFactura' },
                { model: Clase, as: 'tamanoPapelNotaVenta' },
                { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                { model: Clase, as: 'tamanoPapelNotaBaja' },
                { model: Clase, as: 'tamanoPapelNotaPedido' },
                { model: Clase, as: 'tamanoPapelCierreCaja' },
                { model: Clase, as: 'formatoPapelFactura' },
                { model: Clase, as: 'formatoColorFactura' },
                { model: Clase, as: 'formatoPapelFacturaServicio' },
                { model: Clase, as: 'formatoColorFacturaServicio' }
                ]
            }).then((configuracionGeneralFactura) => {
                factura.configuracion = configuracionGeneralFactura
                let total = 0
                factura.detallesVenta = factura.detallesVenta.map((det) => {
                    const producto = { codigo: det.servicio.codigo, nombre: det.servicio.nombre, unidad_medida: "" }
                    total += det.importe
                    det.total = det.precio_unitario * det.cantidad
                    det.producto = producto
                    return det
                })
                factura.total = total
                SucursalActividadDosificacion.find({
                    where: {
                        id_actividad: req.body.actividad.id,
                        id_sucursal: req.body.sucursal.id,
                        expirado: false
                    },
                    include: [{ model: Dosificacion, as: 'dosificacion', where: { expirado: false }, include: [{ model: Clase, as: 'pieFactura' }] },
                    { model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
                }).then((sucursalActividadDosificacion) => {
                    if (sucursalActividadDosificacion) {
                        if (!sucursalActividadDosificacion.sucursal.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se puede hacer cambios.', hasErr: true, factura: req.body })
                        if (sucursalActividadDosificacion.dosificacion) {
                            if (sucursalActividadDosificacion.dosificacion.expirado) return res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                            const dosificacion = sucursalActividadDosificacion.dosificacion;
                            const fechaActual = new Date();
                            const fechaActualTexto = fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear()
                            factura.factura = dosificacion.correlativo;
                            factura.pieFactura = dosificacion.pieFactura;
                            factura.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
                                dosificacion.correlativo.toString(),
                                factura.cliente.nit.toString(),
                                formatearFecha(fechaActualTexto).toString(), //formatearFecha(factura.fecha_factura).toString(),
                                parseFloat(factura.totalImporteBs).toFixed(2),
                                dosificacion.llave_digital.toString());
                            factura.autorizacion = dosificacion.autorizacion.toString();
                            factura.fecha_limite_emision = dosificacion.fecha_limite_emision;
                            factura.numero_literal = NumeroLiteral.Convertir(parseFloat(factura.totalImporteBs).toFixed(2).toString());
                            const laFecha = factura.fecha_factura.split("/").reverse(); //fechaActual.split("/").reverse()
                            const fecha_factura = new Date(laFecha[0], laFecha[1] - 1, laFecha[2], new Date().getHours(), new Date().getMinutes(), 0)
                            const promisse = []
                            sequelize.transaction((t) => {
                                factura.datosProformas.forEach((prof) => {
                                    promisse.push(updateProforma(factura, prof, t, fecha_factura))
                                })
                                promisse.push(updateDosificacionCorrelativo(factura, t, dosificacion))
                                return Promise.all(promisse);
                            }).then((tranTermino) => {
                                if (tranTermino === undefined) {
                                    res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                                } else {
                                    res.json({ mensaje: 'Factura generada...', factura: req.body })
                                }
                            }).catch((err) => {
                                if (typeof err === 'string' || err instanceof String) {
                                    res.json({ mensaje: err, hasErr: true, factura: req.body })
                                } else {
                                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: factura })
                                }
                            })
                        } else {
                            res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                        }
                    } else {
                        res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa para la sucursal actual. No se puede generar factura!', hasErr: true, factura: req.body })
                    }
                }).catch((err) => {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
                });
            }).catch((err) => {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
            });
        })

    function updateDosificacionCorrelativo(factura, t, dosificacion) {
        return Dosificacion.update({
            correlativo: (factura.factura + 1)
        }, {
            where: { id: dosificacion.id },
            transaction: t
        })
    }
    function updateProforma(factura, prof, t, fecha_factura) {
        return Proforma.update({
            movimiento: factura.movimiento.id,
            factura: factura.factura,
            autorizacion: factura.autorizacion,
            fecha_limite_emision: factura.fecha_limite_emision,
            codigo_control: factura.codigo_control,
            detalle: prof.detalle || '',
            descripcion: factura.descripcion || '',
            fecha_factura: new Date(), //fecha_factura,
            dias_credito: factura.dias_credito,
            glosa_unica: factura.glosa_unica || false,
            a_cuenta: factura.a_cuenta,
            id_tipo_pago: factura.tipoPago.id
        }, {
            where: { id: prof.id },
            transaction: t
        })
    }

    router.route('/proforma/importacion-factura/:id_empresa/correlativo/:correlativo')
        .post(ensureAuthorizedlogged, function (req, res) {
            var factura = req.body;
            var num_factura = Number(req.params.correlativo);
            var total = 0
            factura.total = total
            Dosificacion.find({
                where: {
                    autorizacion: Number(req.body.NumAutorizacion),
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'pieFactura' }, { model: Sucursal, as: 'sucursal' }]
            }).then(function (dosificacion) {
                if (dosificacion) {
                    if (!dosificacion.sucursal.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se puden hacer cambios.', factura: req.body, hasErr: true })
                    factura.pieFactura = dosificacion.pieFactura;
                    factura.fecha_limite_emision = dosificacion.fecha_limite_emision;
                    factura.factura = num_factura;

                    var laFecha = factura.FechaFactura.split("/")
                    var fecha_factura = new Date(laFecha[2], laFecha[1] - 1, laFecha[0])
                    var promisse = []
                    sequelize.transaction(function (t) {
                        promisse.push(updateProforma2(factura, t, fecha_factura, req.params.id_empresa))
                        return Promise.all(promisse);
                    }).then(function (tranTermino) {
                        if (tranTermino === undefined) {
                            res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                        } else {
                            res.json({ mensaje: 'Factura generada...', factura: req.body, hasErr: false })
                        }
                    }).catch(function (err) {
                        if (typeof err === 'string' || err instanceof String) {
                            res.json({ mensaje: err, hasErr: true, factura: req.body })
                        } else {
                            res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: factura })
                        }
                    })
                } else {
                    res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa para la sucursal actual. No se puede generar factura!', hasErr: true, factura: req.body })
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
            });
        })

    function updateProforma2(factura, t, fecha_factura, id_empresa) {
        return Proforma.update({
            movimiento: Number(factura.movimiento.id),
            factura: factura.factura,
            autorizacion: Number(factura.NumAutorizacion),
            fecha_limite_emision: factura.fecha_limite_emision,
            codigo_control: factura.codigoControl,
            descripcion: factura.descripcion,
            fecha_factura: fecha_factura,
            dias_credito: factura.dias_credito,
            a_cuenta: factura.a_cuenta,
            id_tipo_pago: factura.tipoPago.id
        }, {
            where: { correlativo: Number(factura.NumProforma), id_empresa: id_empresa },
            transaction: t
        })
    }

    //Inicio de Importacion de facturas
    router.route('/proforma/facturar/:id_empresa/correlativo/:correlativo')
        .post(ensureAuthorizedlogged, function (req, res) {
            var factura = req.body;
            var num_factura = Number(req.params.correlativo);
            ConfiguracionGeneralFactura.find({
                where: {
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'impresionFactura' },
                { model: Clase, as: 'tipoFacturacion' },
                { model: Clase, as: 'tamanoPapelFactura' },
                { model: Clase, as: 'tituloFactura' },
                { model: Clase, as: 'subtituloFactura' },
                { model: Clase, as: 'tamanoPapelNotaVenta' },
                { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                { model: Clase, as: 'tamanoPapelNotaBaja' },
                { model: Clase, as: 'tamanoPapelNotaPedido' },
                { model: Clase, as: 'tamanoPapelCierreCaja' },
                { model: Clase, as: 'formatoPapelFactura' },
                { model: Clase, as: 'formatoColorFactura' },
                { model: Clase, as: 'formatoPapelFacturaServicio' },
                { model: Clase, as: 'formatoColorFacturaServicio' }
                ]
            }).then(function (configuracionGeneralFactura) {
                factura.configuracion = configuracionGeneralFactura
                var total = 0
                factura.detallesVenta = factura.detallesVenta.map(function (det, i) {
                    var producto = { codigo: det.servicio.codigo, nombre: det.servicio.nombre, unidad_medida: "" }
                    total += det.importe
                    det.total = det.precio_unitario * det.cantidad
                    det.producto = producto
                    return det
                })
                factura.total = total
                SucursalActividadDosificacion.find({
                    where: {
                        id_actividad: req.body.actividad.id,
                        id_sucursal: req.body.sucursal.id,
                        expirado: false
                    },
                    include: [{ model: Dosificacion, as: 'dosificacion', where: { expirado: false, autorizacion: req.body.sucursal.actividadesDosificaciones.dosificacion.autorizacion }, include: [{ model: Clase, as: 'pieFactura' }] },
                    { model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
                }).then(function (sucursalActividadDosificacion) {
                    if (sucursalActividadDosificacion) {
                        if (!sucursalActividadDosificacion.sucursal.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se puden hacer cambios.', factura: req.body, hasErr: true })
                        if (sucursalActividadDosificacion.dosificacion) {
                            var dosificacion = sucursalActividadDosificacion.dosificacion;
                            factura.factura = num_factura;
                            factura.pieFactura = dosificacion.pieFactura;
                            factura.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
                                num_factura.toString(),
                                factura.cliente.nit.toString(),
                                formatearFecha(factura.fecha_factura).toString(),
                                parseFloat(factura.totalImporteBs).toFixed(2),
                                dosificacion.llave_digital.toString());
                            factura.autorizacion = dosificacion.autorizacion.toString();
                            factura.fecha_limite_emision = dosificacion.fecha_limite_emision;
                            factura.numero_literal = NumeroLiteral.Convertir(parseFloat(factura.totalImporteBs).toFixed(2).toString());
                            var laFecha = factura.fecha_factura.split("/")
                            var fecha_factura = new Date(laFecha[2], laFecha[1] - 1, laFecha[0])
                            var promisse = []
                            sequelize.transaction(function (t) {
                                factura.datosProformas.forEach(function (prof, i) {
                                    promisse.push(updateProforma(factura, prof, t, fecha_factura))
                                })
                                promisse.push(updateDosificacionCorrelativo(factura, t, dosificacion))
                                return Promise.all(promisse);
                            }).then(function (tranTermino) {
                                if (tranTermino === undefined) {
                                    res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                                } else {
                                    res.json({ mensaje: 'Factura generada...', factura: req.body })
                                }
                            }).catch(function (err) {
                                if (typeof err === 'string' || err instanceof String) {
                                    res.json({ mensaje: err, hasErr: true, factura: req.body })
                                } else {
                                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: factura })
                                }
                            })
                        } else {
                            res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa. No se puede generar factura!', hasErr: true, factura: req.body })
                        }
                    } else {
                        res.json({ mensaje: 'La actividad no tiene asignada una dosificación activa para la sucursal actual. No se puede generar factura!', hasErr: true, factura: req.body })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
                });
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
            });
        })

    function updateDosificacionCorrelativo(factura, t, dosificacion) {
        return Dosificacion.update({
            correlativo: (factura.factura + 1)
        }, {
            where: { id: dosificacion.id },
            transaction: t
        })
    }

    //Fin de Importacion de facturas

    router.route('/detalles/proforma/facturar/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var detalles = []
            req.body.map(function (ids, i) {
                DetallesProformas.findAll({
                    where: { id_proforma: ids },
                    include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }]
                }).then(function (Detalles) {
                    Detalles.map(function (_) {
                        detalles.push(_)
                    })
                    if (i === req.body.length - 1) {
                        res.json({ detalles: detalles })
                    }
                }).catch(function (err) {
                    res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
                });
            })
        })

    router.route('/configuracion/proforma/facturar/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            ConfiguracionGeneralFactura.find({
                where: {
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'impresionFactura' },
                { model: Clase, as: 'tipoFacturacion' },
                { model: Clase, as: 'tamanoPapelFactura' },
                { model: Clase, as: 'tituloFactura' },
                { model: Clase, as: 'subtituloFactura' },
                { model: Clase, as: 'tamanoPapelNotaVenta' },
                { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                { model: Clase, as: 'tamanoPapelNotaBaja' },
                { model: Clase, as: 'tamanoPapelNotaPedido' },
                { model: Clase, as: 'tamanoPapelCierreCaja' },
                { model: Clase, as: 'formatoPapelFactura' },
                { model: Clase, as: 'formatoColorFactura' },
                { model: Clase, as: 'formatoPapelFacturaServicio' },
                { model: Clase, as: 'formatoColorFacturaServicio' }
                ]
            }).then(function (configuracionGeneralFactura) {
                res.json({ configuracion: configuracionGeneralFactura })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true, factura: req.body })
            });
        })

    router.route('/proformas/:ids')
        .get(ensureAuthorizedlogged, (req, res) => {
            const lista = req.params.ids.split(',')
            Proforma.findAll(
                {
                    where: { id: { $in: lista } },
                    include: [
                        { model: Clase, as: 'actividadEconomica' },
                        { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                        { model: Usuario, as: 'usuarioProforma' },
                        { model: Cliente, as: 'cliente' },
                        {
                            model: Sucursal, as: 'sucursal', include: [
                                {
                                    model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
                                    include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
                                    { model: Clase, as: 'actividad' }]
                                }],
                                where: { activo: true}
                        }
                    ]
                }).then((proformas) => {
                    res.json({ proformas: proformas });
                }).catch((err) => {
                    res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
        })

    router.route("/buscar-proforma/empresa/:id_empresa/proforma/:proforma/fechaOk/:fechaOk")
        .get(ensureAuthorizedlogged, function (req, res) {

            var empresa = req.params.id_empresa;
            var proforma = req.params.proforma;
            var fechaOk = new Date(req.params.fechaOk); fechaOk.setHours(0, 0, 0, 0);
            var fechaOkFin = new Date(req.params.fechaOk); fechaOkFin.setHours(23, 59, 59, 0);

            Proforma.findAll({
                where: { empresa: empresa, correlativo: proforma, fecha_factura: null, fecha_proforma_ok: { $between: [fechaOk, fechaOkFin] } },
                include: [{ model: Clase, as: 'actividadEconomica' }, { model: Cliente, as: 'cliente' }]
            }).then(function (dato) {
                res.json({ respuesta: dato })
            });
        });
    router.route('/actividad/:id/:autorizacion')
        .get(ensureAuthorizedlogged, function (req, res) {
            SucursalActividadDosificacion.find({
                where: { id_actividad: req.params.id },
                include: [{
                    model: Dosificacion, as: 'dosificacion',
                    where: { autorizacion: req.params.autorizacion }
                },
                { model: ContabilidadCuenta, as: 'cuenta' },
                { model: ContabilidadCuenta, as: 'cuentaCajaBanco' }]
            }).then(function (actividadDosificacion) {
                res.json({ actividadDosificacion: actividadDosificacion })
            }).catch(function (err) {
                res.json({ mensaje: err.stack ? err.message + '<br />' + err.stack : err.message, hasErr: true })
            })
        })
    router.route('/obtener-proformas-no-contabilizadas/:id_empresa/:fecha/:eliminado')
        .get(async (req, res) => {
            let inicio = new Date(req.params.fecha)
            inicio.setDate(1)
            inicio.setHours(0, 0, 0, 0);
            let fin = new Date(req.params.fecha)
            try {
                if (req.params.eliminado == '1') {
                    let condicion = { factura: { $not: null }, eliminado: false, contabilizado: false };
                    condicion.id_empresa = parseInt(req.params.id_empresa);
                    condicion.fecha_factura = { $between: [inicio, fin] };
                    let facturas = await Proforma.findAll(
                        {
                            where: condicion,
                            attributes: [
                                'id',
                                'factura',
                                'fecha_factura',
                                [sequelize.fn('GROUP_CONCAT', sequelize.col('correlativo')), 'correlativo'],
                                [sequelize.fn('SUM', sequelize.col('monto')), 'totalImporteBs'],
                                [sequelize.fn('SUM', sequelize.col('totalImporteSus')), 'totalImporteSus'],
                                'periodo_mes',
                                'periodo_anio',
                                'autorizacion',
                                'id_actividad',
                                'id_empresa',
                                'id_sucursal',
                                'autorizacion'
                            ],
                            include: [{
                                model: Clase, as: 'actividadEconomica'
                                , attributes: ['id', 'nombre']
                            }, { model: Cliente, as: 'cliente', attributes: ['id', 'razon_social', 'nit'] }],
                            group: ['factura', 'autorizacion'],
                            order: [['fecha_factura', 'asc']]
                        })
                    for (const factura of facturas) {
                        factura.dataValues.detallesProformas = await DetallesProformas.findAll({
                            where: {
                                id_proforma: factura.dataValues.id
                            },
                            include: [{ model: Servicios, as: 'servicio' },
                            { model: Clase, as: 'centroCosto' }]
                        });
                    }
                    res.json({ facturas: facturas })
                } else {
                    let condicionAnulada = { fecha_factura: { $between: [inicio, fin] }, proformas_anulacion: { $not: '' }, id_asiento_contabilidad: null }
                    facturasAnuladas = await ProformaFacturaAnulada.findAll(
                        {
                            where: condicionAnulada,
                            attributes: [
                                'id',
                                'factura',
                                'fecha_factura',
                                [sequelize.fn('SUM', sequelize.col('monto')), 'totalImporteBs'],
                                [sequelize.fn('SUM', sequelize.col('totalImporteSus')), 'totalImporteSus'],
                                'periodo_mes',
                                'periodo_anio',
                                'autorizacion',
                                'id_actividad',
                                'id_empresa',
                                'id_sucursal',
                                'proformas_anulacion'
                            ],
                            include: [{
                                model: Clase, as: 'actividadEconomica'
                                , attributes: ['id', 'nombre']
                            }, { model: Cliente, as: 'cliente', attributes: ['id', 'razon_social', 'nit'] },],
                            group: ['factura', 'autorizacion'],
                            order: [['fecha_factura', 'asc']]
                        })
                    deleteIds = ""
                    for (let index = 0; index < facturasAnuladas.length; index++) {
                        const facturaAnulada = facturasAnuladas[index];
                        let idsFacturas = facturaAnulada.proformas_anulacion.split(',')
                        idsFacturas = idsFacturas.reduce((newArray, x) => {
                            if (x != "") newArray.push(x)
                            return newArray
                        }, [])

                        let condicion = { id: { $in: [idsFacturas] }, eliminado: false, contabilizado: true };
                        let dato = await Proforma.findAll(
                            {
                                where: condicion,
                                attributes: [
                                    'id',
                                    'factura',
                                    [sequelize.fn('GROUP_CONCAT', sequelize.col('correlativo')), 'correlativo'],
                                    [sequelize.fn('SUM', sequelize.col('monto')), 'totalImporteBs'],
                                    [sequelize.fn('SUM', sequelize.col('totalImporteSus')), 'totalImporteSus'],
                                    'monto',
                                    'totalImporteSus',
                                    'periodo_mes',
                                    'periodo_anio',
                                    'autorizacion',
                                    'id_actividad',
                                    'id_empresa',
                                    'id_sucursal',
                                    'id_asiento_contabilidad'
                                ],
                                include: [{
                                    model: Clase, as: 'actividadEconomica'
                                    , attributes: ['id', 'nombre']
                                }, { model: Cliente, as: 'cliente', attributes: ['id', 'razon_social', 'nit'] }],
                                /*  group: ['factura', 'autorizacion'],
                                 order: [['factura', 'asc']] */
                            })
                        if (dato.length > 0) {
                            dato[0].dataValues.detallesProformas = await DetallesProformas.findAll({
                                where: {
                                    id_proforma: {
                                        $in: [idsFacturas]
                                    }
                                },
                                include: [{ model: Servicios, as: 'servicio' },
                                { model: Clase, as: 'centroCosto' }]
                            });
                        }
                        facturaAnulada.dataValues.proformas = dato
                    }
                    facturasAnuladas = await facturasAnuladas.reduce((newArray, x) => {
                        if (x.dataValues.proformas.length > 0) {
                            let detallesProformas = []
                            /* for (const proforma of x.dataValues.proformas) {
                                x.dataValues.totalImporteBs += proforma.dataValues.monto
                                x.dataValues.totalImporteSus += proforma.dataValues.totalImporteSus
                                x.dataValues.cliente = proforma.dataValues.cliente
                                detallesProformas = detallesProformas.concat(proforma.dataValues.detallesProformas)
                            }
                            x.dataValues.detallesProformas = detallesProformas */
                            for (const proforma of x.dataValues.proformas) {
/*                                 if (proforma.id_asiento_contabilidad) {
 */                                    x.dataValues.correlativo = proforma.dataValues.correlativo
                                x.dataValues.detallesProformas = proforma.dataValues.detallesProformas
                                newArray.push(x)
                                /*   } */
                            }
                        }
                        return newArray
                    }, [])
                    res.json({ facturas: facturasAnuladas })

                }

            } catch (error) {
                res.json({ mensaje: error })
            }
        })
    router.route('/facturas/proformas/:id_empresa/:usuario/:actividad/:sucursal/:razon/:anio/:mes/:dir/:col/:items_pagina/:pagina/:factura/:excel/:fecha_factura_desde/:fecha_factura_hasta/:autorizacion/:libro/:estado')
        .get(ensureAuthorizedlogged, (req, res) => {
            const condicion = {};
            const condicionAnuladas = {};
            let condicionCliente = {};
            // const condicionServicio = {};
            let condicionUsuario = {};
            const condicionActividad = {};
            condicion.id_empresa = parseInt(req.params.id_empresa);
            if (req.params.mes != "0") {
                if (req.params.libro != '0') {
                    const lastMonthDate = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 0).getDate();
                    req.params.fecha_factura_desde = '01-' + req.params.mes + '-' + req.params.anio;
                    req.params.fecha_factura_hasta = lastMonthDate + '-' + req.params.mes + '-' + req.params.anio;
                } else {
                    condicion.periodo_mes = (parseInt(req.params.mes) - 1);
                    condicionAnuladas.periodo_mes = (parseInt(req.params.mes) - 1);
                }
            }
            if (req.params.anio != "0") {
                if (req.params.libro != '0') {
                    // Se evalua en el if de params.mes ^
                } else {
                    condicion.periodo_anio = parseInt(req.params.anio) || undefined;
                    condicionAnuladas.periodo_anio = parseInt(req.params.anio) || undefined;
                }
            }
            if (req.params.autorizacion != "0") {
                condicion.autorizacion = parseInt(req.params.autorizacion) || undefined;
                condicionAnuladas.autorizacion = parseInt(req.params.autorizacion) || undefined;
            }
            if (req.params.factura != "0") {
                condicion.factura = parseInt(req.params.factura) || { $not: null };
                condicionAnuladas.factura = parseInt(req.params.factura) || { $not: null };
            } else {
                condicion.factura = { $not: null };
                condicionAnuladas.factura = { $not: null };
            }
            if (req.params.sucursal != "0") {
                condicion.id_sucursal = parseInt(req.params.sucursal) || undefined;
                condicionAnuladas.id_sucursal = parseInt(req.params.sucursal) || undefined;
            }
            if (req.params.actividad != "0") {
                condicionActividad.id = parseInt(req.params.actividad) || undefined;
            }

            var Modelcliente = { model: Cliente, as: 'cliente', required: false, where: condicionCliente, attributes: ['id', 'razon_social', 'nit'] };
            if (req.params.razon != "0") {
                condicionCliente = {
                    razon_social: { $or: [{ $like: '%' + req.params.razon.replace(/(')/g, '\'') + '%' }] }
                }
                Modelcliente = { model: Cliente, as: 'cliente', required: true, where: condicionCliente, attributes: ['id', 'razon_social', 'nit'] };
            }
            if (req.params.usuario != "0") {
                condicionUsuario = {
                    nombre_usuario: { $or: [{ $like: '%' + req.params.usuario + '%' }] }
                }
            }
            if (req.params.fecha_factura_desde !== '0' && req.params.fecha_factura_hasta === '0') {
                const fecha_desde = req.params.fecha_factura_desde.split('-');
                const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                condicion.fecha_factura = { $gte: [inicio] };
                condicionAnuladas.fecha_factura = { $gte: [inicio] };
            } else if (req.params.fecha_factura_desde !== '0' && req.params.fecha_factura_hasta !== '0') {
                const fecha_desde = req.params.fecha_factura_desde.split('-');
                const inicio = new Date(parseInt(fecha_desde[0]), parseInt(fecha_desde[1]) - 1, parseInt(fecha_desde[2]), 0, 0, 0, 0);
                const fecha_hasta = req.params.fecha_factura_hasta.split('-');
                const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                condicion.fecha_factura = { $between: [inicio, fin] };
                condicionAnuladas.fecha_factura = { $between: [inicio, fin] };
            } else if (req.params.fecha_factura_desde === '0' && req.params.fecha_factura_hasta !== '0') {
                const fecha_hasta = req.params.fecha_factura_hasta.split('-');
                const fin = new Date(parseInt(fecha_hasta[0]), parseInt(fecha_hasta[1]) - 1, parseInt(fecha_hasta[2]), 23, 59, 59, 999)
                condicion.fecha_factura = { $lte: [fin] };
                condicionAnuladas.fecha_factura = { $lte: [fin] };
            } else {
                condicion.fecha_factura = { $not: null };
                condicionAnuladas.fecha_factura = { $not: null };
            }
            const direccionOrden = (req.params.dir === 'asc' ? 'asc' : 'desc');
            let ordenamiento = [];
            if (req.params.col === "razon_social") {
                ordenamiento = sequelize.literal('`cliente.razon_social` ' + direccionOrden);
            } else if (req.params.col === "sucursal") {
                ordenamiento = sequelize.literal('`sucursal`.`nombre` ' + direccionOrden);
            } else if (req.params.col === "actividad") {
                ordenamiento = sequelize.literal('`actividadEconomica`.`nombre` ' + direccionOrden);
            } else if (req.params.col === "usuario") {
                ordenamiento = sequelize.literal('`usuarioProforma.nombre_usuario` ' + direccionOrden);
            } else if (req.params.col === "montosus" || req.params.col === "monto") {
                ordenamiento = sequelize.literal('totalImporteBs ' + direccionOrden);
            } else if (req.params.col === "factura") {
                ordenamiento.push([{ raw: 'factura + fecha_factura ' + direccionOrden }]);
            } else if (req.params.col === "periodo") {
                ordenamiento.push([{ raw: 'periodo_mes + periodo_anio' + direccionOrden }]);
            } else {
                ordenamiento.push([req.params.col, direccionOrden])
            }
            Proforma.findAndCountAll(
                {
                    // offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                    where: condicion,
                    attributes: [
                        'id',
                        'factura',
                        'fecha_factura',
                        [sequelize.fn('GROUP_CONCAT', sequelize.col('correlativo')), 'correlativo'],
                        [sequelize.fn('SUM', sequelize.col('monto')), 'totalImporteBs'],
                        [sequelize.fn('SUM', sequelize.col('totalImporteSus')), 'totalImporteSus'],
                        'cambio_dolar',
                        'codigo_control',
                        'periodo_mes',
                        'periodo_anio',
                        'id_sucursal',
                        'autorizacion',
                        'id_empresa',
                        'id_usuario',
                        'id_cliente',
                        'id_actividad'
                    ],
                    include: [
                        { model: Clase, as: 'actividadEconomica', where: condicionActividad, attributes: ['id', 'nombre'] },
                        // { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio', where: condicionServicio }, { model: Clase, as: 'centroCosto' }] },
                        { model: Usuario, as: 'usuarioProforma', where: condicionUsuario, attributes: ['id', 'nombre_usuario'] },
                        { model: Cliente, as: 'cliente', where: condicionCliente, attributes: ['id', 'razon_social', 'nit'] },
                        { model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre'] }
                    ],
                    group: ['factura', 'autorizacion'],
                    order: [ordenamiento]
                }).then((facturas) => {
                    ProformaFacturaAnulada.findAndCountAll({
                        where: condicionAnuladas,
                        attributes: [
                            'id',
                            'factura',
                            'fecha_factura',
                            'codigo_control',
                            'periodo_mes',
                            'periodo_anio',
                            'id_sucursal',
                            'autorizacion',
                            'id_empresa',
                            'id_usuario',
                            'id_cliente',
                            'id_actividad',
                            'factura_anulada'
                        ],
                        include: [
                            { model: Clase, as: 'actividadEconomica', where: condicionActividad, attributes: ['id', 'nombre'] },
                            // { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio', where: condicionServicio }, { model: Clase, as: 'centroCosto' }] },
                            { model: Usuario, as: 'usuarioProforma', where: condicionUsuario, attributes: ['id', 'nombre_usuario'] },
                            Modelcliente,
                            { model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre'] }
                        ],
                        group: ['factura']
                    }).then((facturasAnuladas) => {
                        let lista_facturas;
                        if (req.params.estado === "0") {
                            lista_facturas = facturas.rows.concat(facturasAnuladas.rows);
                        } else if (req.params.estado === '1') {
                            lista_facturas = facturas.rows;
                        } else {
                            lista_facturas = facturasAnuladas.rows;
                        }
                        if (req.params.col === "razon_social") {
                            lista_facturas.sort(orderByRazon);
                        } else if (req.params.col === "sucursal") {
                            lista_facturas.sort(orderBySucursal);
                        } else if (req.params.col === "actividad") {
                            lista_facturas.sort(orberByActividad);
                        } else if (req.params.col === "usuario") {
                            lista_facturas.sort(orberByusuario);
                        } else if (req.params.col === "montosus" || req.params.col === "monto") {
                            lista_facturas.sort(orberBymonto);
                        } else if (req.params.col === "factura") {
                            lista_facturas.sort(orberByfactura);
                        } else if (req.params.col === "periodo") {
                            lista_facturas.sort(orberByperiodo);
                        } else if (req.params.col === "fecha_factura") {
                            lista_facturas.sort(orberByFechafactura);
                        } else {
                            lista_facturas.sort(orberByfactura);
                        }
                        const excel = (req.params.excel === "0");
                        if (direccionOrden === 'desc') lista_facturas.reverse();
                        const facturasPAginador = (excel && lista_facturas.slice((req.params.items_pagina * (req.params.pagina - 1)), req.params.items_pagina * req.params.pagina)) || lista_facturas;
                        const totalCount = lista_facturas.length;
                        res.json({ facturas: facturasPAginador, count: Math.ceil(totalCount / req.params.items_pagina) })
                    }).catch((err) => {
                        res.json({ facturas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                    });
                }).catch((err) => {
                    res.json({ facturas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
                });
        })

    function registroFacturaAnulada(transaction, fecha, mes, anio, sucursal, actividad, usuario,
        empresa, factura, autorizacion, observacion,
        idProformasAnulacion, monto, totalImporteSus, id_cliente, correlativos) {
        return ProformaFacturaAnulada.create({
            fecha_factura: fecha,
            periodo_mes: mes,
            periodo_anio: anio,
            id_sucursal: sucursal,
            id_actividad: actividad,
            id_cliente: id_cliente,
            id_usuario: usuario,
            totalImporteBs: monto,
            totalImporteSus: totalImporteSus,
            id_empresa: empresa,
            factura: factura,
            autorizacion: autorizacion,
            codigo_control: '',
            correlativo: correlativos,
            eliminado: false,
            factura_anulada: true,
            observacion: observacion,
            proformas_anulacion: idProformasAnulacion
        },
            {
                transaction: transaction
            }).then((registroAnulacion) => {
                return Proforma.findAll({
                    where: {
                        id: { $in: idProformasAnulacion.split(',') }
                    },
                    transaction: transaction
                }).then((proformas) => {
                    const promises = [];
                    for (let index = 0; index < proformas.length; index++) {
                        const facturasdeprforma = (proformas[index].facturas_anuladas !== '' ? proformas[index].facturas_anuladas.split(',') : [])
                        facturasdeprforma.push(registroAnulacion.id)
                        promises.push(
                            Proforma.update({
                                facturas_anuladas: facturasdeprforma.join(',')
                            }, {
                                where: {
                                    id: proformas[index].id
                                },
                                transaction: transaction
                            }).then((proformaActualizada_) => {
                                return 'Factura anulada con éxito.'
                            }).catch((err) => {
                                throw err
                            })
                        )
                    }
                    return Promise.all(promises)
                }).catch((err) => {
                    throw err
                });
            }).catch((err) => {
                throw err
            });
    }
    function orderByRazon(facturA, facturB) {
        if (facturA.cliente.razon_social.toUpperCase() < facturB.cliente.razon_social.toUpperCase()) return -1;
        if (facturA.cliente.razon_social.toUpperCase() > facturB.cliente.razon_social.toUpperCase()) return 1;
        return 0;
    }
    function orderBySucursal(facturA, facturB) {
        if (facturA.sucursal.nombre.toUpperCase() < facturB.sucursal.nombre.toUpperCase()) return -1;
        if (facturA.sucursal.nombre.toUpperCase() > facturB.sucursal.nombre.toUpperCase()) return 1;
        return 0;
    }
    function orberByActividad(facturA, facturB) {
        if (facturA.actividadEconomica.nombre.toUpperCase() < facturB.actividadEconomica.nombre.toUpperCase()) return -1;
        if (facturA.actividadEconomica.nombre.toUpperCase() > facturB.actividadEconomica.nombre.toUpperCase()) return 1;
        return 0;
    }
    function orberByfactura(facturA, facturB) {
        if (facturB === undefined || facturB === null) return 1;
        return facturA.factura - facturB.factura
    }
    function orberByFechafactura(facturA, facturB) {
        if (facturB === undefined || facturB === null) return 1;
        // const fech = facturA.fecha_factura.getTime() - facturB.fecha_factura.getTime()
        if (facturA.fecha_factura.getDate() === facturB.fecha_factura.getDate() &&
            facturA.fecha_factura.getMonth() === facturB.fecha_factura.getMonth() &&
            facturA.fecha_factura.getFullYear() === facturB.fecha_factura.getFullYear()) {
            return facturA.factura - facturB.factura
        }
        return facturA.fecha_factura.getTime() - facturB.fecha_factura.getTime()
    }
    function orberByperiodo(facturA, facturB) {
        if (facturB === undefined || facturB === null) return 1;
        const valor_anio = facturA.periodo_anio - facturB.periodo_anio
        if (valor_anio == 0) return facturA.periodo_mes - facturB.periodo_mes;
        return valor_anio
    }
    function orberByusuario(facturA, facturB) {
        if (facturA.sucursal.nombre.toUpperCase() < facturB.sucursal.nombre.toUpperCase()) return -1;
        if (facturA.sucursal.nombre.toUpperCase() > facturB.sucursal.nombre.toUpperCase()) return 1;
        return 0;
    }
    function orberBymonto(facturA, facturB) {
        if (facturB === undefined || facturB === null) return 1;
        return facturA.totalImporteBs - facturB.totalImporteBs
    }

    function checkProformasFacturasAnuladasObservacion(res, datos, idfacturas) {
        ProformaFacturaAnulada.findAll({
            where: {
                id: { $in: idfacturas }
            }
        }).then((facturasAnuladas_) => {
            for (let index = 0; index < datos.proformas.length; index++) {
                const observacionProforma = datos.proformas[index].dataValues.observacion && ((datos.proformas[index].dataValues.observacion !== 'Sin observaciones.' && datos.proformas[index].eliminado) ? datos.proformas[index].dataValues.observacion : null) || null;
                datos.proformas[index].dataValues.observacion = ''
                for (let index_ = 0; index_ < facturasAnuladas_.length; index_++) {
                    if (datos.proformas[index].facturas_anuladas.split(',').indexOf(facturasAnuladas_[index_].id.toString()) > -1) {
                        if (observacionProforma) {
                            datos.proformas[index].dataValues.observacion = 'Proforma Anulada:\n' + observacionProforma + '\n' + 'Factura Anulada ' + facturasAnuladas_[index_].factura + '\n' + facturasAnuladas_[index_].observacion
                        } else {
                            if (index_ === 0) {
                                datos.proformas[index].dataValues.observacion = 'Factura Anulada Nro. ' + facturasAnuladas_[index_].factura + '\n' + facturasAnuladas_[index_].observacion
                            } else {
                                datos.proformas[index].dataValues.observacion += '\nFactura Anulada Nro. ' + facturasAnuladas_[index_].factura + '\n' + facturasAnuladas_[index_].observacion
                            }
                        }
                    }
                }
            }
            res.json(datos)
        }).catch((err) => {
            res.json({ proformas: [], mensaje: (err.stack !== undefined ? err.message + '<br />' + err.stack : err.message), hasErr: true })
        });
    }
    router.route('/arreglo-proformas-anuladas')
        .get((req, res) => {
            sequelize.transaction(async function (t) {
                try {
                    let condicionAnulada = { proformas_anulacion: { $not: '' } }
                    facturasAnuladas = await ProformaFacturaAnulada.findAll(
                        {
                            where: condicionAnulada,
                            attributes: [
                                'id',
                                'factura',
                                'fecha_factura',
                                ['monto', 'totalImporteBs'],
                                'totalImporteSus',
                                'periodo_mes',
                                'periodo_anio',
                                'autorizacion',
                                'id_actividad',
                                'id_empresa',
                                'id_cliente',
                                'id_sucursal',
                                'proformas_anulacion',
                                'correlativo'
                            ],
                            include: [{
                                model: Clase, as: 'actividadEconomica'
                                , attributes: ['id', 'nombre']
                            }],
                            group: ['factura', 'autorizacion'],
                            order: [['fecha_factura', 'asc']],
                            transaction: t
                        })
                    deleteIds = ""
                    for (let index = 0; index < facturasAnuladas.length; index++) {
                        const facturaAnulada = facturasAnuladas[index];
                        let idsFacturas = facturaAnulada.proformas_anulacion.split(',')
                        idsFacturas = idsFacturas.reduce((newArray, x) => {
                            if (x != "") newArray.push(x)
                            return newArray
                        }, [])

                        let condicion = { id: { $in: [idsFacturas] } };
                        let dato = await Proforma.findAll(
                            {
                                where: condicion,
                                attributes: [
                                    'id',
                                    'factura',
                                    [sequelize.fn('GROUP_CONCAT', sequelize.col('correlativo')), 'correlativo'],
                                    [sequelize.fn('SUM', sequelize.col('monto')), 'totalImporteBs'],
                                    [sequelize.fn('SUM', sequelize.col('totalImporteSus')), 'totalImporteSus'],
                                    'monto',
                                    'totalImporteSus',
                                    'periodo_mes',
                                    'periodo_anio',
                                    'autorizacion',
                                    'id_actividad',
                                    'id_empresa',
                                    'id_sucursal',
                                    'id_cliente',
                                    'id_asiento_contabilidad'
                                ],
                                include: [{
                                    model: Clase, as: 'actividadEconomica'
                                    , attributes: ['id', 'nombre']
                                }],
                                transaction: t
                            })
                        facturaAnulada.dataValues.proformas = dato
                    }
                    facturasAnuladas = await facturasAnuladas.reduce((newArray, x) => {
                        if (x.dataValues.proformas.length > 0) {
                            for (const proforma of x.dataValues.proformas) {
                                x.dataValues.totalImporteBs = proforma.dataValues.monto
                                x.dataValues.totalImporteSus = proforma.dataValues.totalImporteSus
                                x.dataValues.id_cliente = proforma.dataValues.id_cliente
                                x.dataValues.correlativo = proforma.dataValues.correlativo
                                newArray.push(x)
                            }
                        }
                        return newArray
                    }, [])
                    for (const facturaA of facturasAnuladas) {
                        await ProformaFacturaAnulada.update({
                            id_cliente: facturaA.dataValues.id_cliente,
                            totalImporteBs: facturaA.dataValues.totalImporteBs,
                            totalImporteSus: facturaA.dataValues.totalImporteSus,
                            correlativo: facturaA.dataValues.correlativo
                        },
                            {
                                where: { id: facturaA.dataValues.id },
                                transaction: t
                            })
                    }
                    return new Promise(function (fulfill, reject) {
                        fulfill({ mensaje: "actualizado" });
                    });
                } catch (err) {
                    return new Promise(function (fulfill, reject) {
                        reject({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                    });
                }
            }).then(function (result) {
                res.json(result)
            }).catch(function (err) {
                res.json(err)
            });

        })
    router.route('/arreglo-proformas-asiento_contable')
        .get((req, res) => {
            sequelize.transaction(async function (t) {
                try {
                    let condicion = { id_asiento_contabilidad: { $not: null } }
                    facturas = await Proforma.findAll(
                        {
                            where: condicion,
                            include: [{
                                model: Clase, as: 'actividadEconomica'
                                , attributes: ['id', 'nombre']
                            }],
                            order: [['fecha_factura', 'asc']],
                            transaction: t
                        })
                    for (const factura of facturas) {
                        await ProformaContabilidad.create({
                            id_proforma: factura.dataValues.id,
                            id_asiento_contabilidad: factura.dataValues.id_asiento_contabilidad,
                            monto: factura.dataValues.totalImporteBs,
                            totalImporteSus: factura.dataValues.totalImporteSus,
                            cambio_dolar: factura.dataValues.cambio_dolar,
                            fecha_factura: factura.dataValues.fecha_factura,
                            factura: factura.dataValues.factura,
                            autorizacion: factura.dataValues.autorizacion,
                        }, { transaction: t })
                        await Proforma.update({
                            id_asiento_contabilidad: null
                        }, {
                            where: { id: factura.dataValues.id },
                            transaction: t
                        })
                    }
                    return new Promise(function (fulfill, reject) {
                        fulfill({ mensaje: "actualizado" });
                    });
                } catch (err) {
                    return new Promise(function (fulfill, reject) {
                        reject({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                    });
                }
            }).then(function (result) {
                res.json(result)
            }).catch(function (err) {
                res.json(err)
            });

        })
}