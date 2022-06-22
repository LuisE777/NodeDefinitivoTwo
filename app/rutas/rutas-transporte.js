const { CloudFormation } = require("aws-sdk")

module.exports = function (router, sequelize, Sequelize, Usuario, Tipo, Clase, Empresa, Persona, ensureAuthorizedlogged, Recibo, DetalleRecibo, Chofer, Telefono, VehiculoExterno, Banco, TransporteRuta, UsuarioSucursal, Sucursal) {
    
    //INICIO RECIBOS TRANSPORTE
        // buscar chofer por nombre
        router.route('/transporte/chofer/empresa/:id_empresa/busqueda/:busqueda')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa, busqueda} = req.params
            Chofer.findAll({
                where:{
                    id_empresa:id_empresa
                },
                include:[
                    {model: Persona, as: 'persona', required:true, where:{ nombre_completo: {
                        $like: "%" + busqueda + "%"
                    }}}
                ],
                order: [['createdAt', 'desc']]
            })
            .then(choferes=>{
                res.json(choferes)
            })
            .catch(err=>{
                res.json({ error:true, message: "<strong>Error al obtener los choferes</strong><br> "+err})
            })
		})
        // buscar vehiculo por placa
        router.route('/transporte/vehiculo/empresa/:id_empresa/busqueda/:busqueda')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa, busqueda} = req.params
            VehiculoExterno.findAll({
                where:{
                    id_empresa:id_empresa,
                    placa: { $like: "%" + busqueda + "%" }
                },
                order: [['createdAt', 'desc']]
            })
            .then(vehiculos=>{
                res.json(vehiculos)
            })
            .catch(err=>{
                res.json({ error:true, message: "<strong>Error al obtener los vehículos</strong><br> "+err})
            })
		})

        // buscar bancos de la empresa
        router.route('/transporte/banco/empresa/:id_empresa/moneda/:moneda')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa, moneda} = req.params
            if( !id_empresa ) return res.json({ error:true, message:'Parámetros incorrectos', messageType: 'error' })
            if ( moneda != "undefined"){
                Tipo.find({ where: { nombre_corto: "TM" } })
                .then(tipo=>{
                    var nombre_corto_moneda = moneda=="true" ? "BOB" : "SUS"
                    var condicion = { tipo: tipo.id, nombre_corto: nombre_corto_moneda }
                    Clase.find({ where: condicion })
                    .then(moneda => {
                        Banco.findAll({ where: { empresa: id_empresa, tipo_moneda:moneda.id, eliminar: false }})
                        .then(bancos => res.json({ error:false, bancos:bancos, message: "Bancos obtenidos con éxito", messageType:"success"}))
                        .catch(err => res.json({ error: true, message: "Error al obtener bancos de la empresa.<br>"+err, messageType:"error" }))
                    })
                    .catch(err => res.json({ error: true, message: "Error al obtener ID moneda.<br>"+err, messageType:"error" }))
                })
                .catch(err => res.json({ error: true, message: "Error al obtener el tipo de moneda.<br>"+err, messageType:"error" }))
            }else{
                Banco.findAll({ where: { empresa: id_empresa, eliminar: false }})
                .then(bancos => res.json({ error:false, bancos:bancos, message: "Bancos obtenidos con éxito", messageType:"success"}))
                .catch(err => res.json({ error: true, message: "Error al obtener bancos de la empresa.<br>"+err, messageType:"error" }))
            }
		})
        // buscar sucursales que emitieron recibos
        router.route('/transporte/recibo/sucursales/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa} = req.params
            sequelize.query("SELECT * FROM agil_sucursal sucursal WHERE  sucursal.empresa = "+id_empresa+" ORDER BY sucursal.nombre ASC", { type: sequelize.QueryTypes.SELECT })
            .then(sucursales => res.json({ error:false, sucursales:sucursales, message: "Sucursales obtenidos con éxito", messageType:"success"}))
            .catch(err => res.json({ error: true, message: "Error al obtener las sucursales de la empresa.<br>"+err, messageType:"error" }))
		})
        // buscar usuarios que generaron recibos
        router.route('/transporte/recibo/usuarios/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa } = req.params
            sequelize.query("SELECT usuario.* FROM sys_usuario usuario INNER JOIN agil_transporte_recibo recibo ON recibo.id_usuario=usuario.id WHERE usuario.empresa="+id_empresa+" GROUP BY usuario.id ORDER BY usuario.nombre_usuario ASC", { type: sequelize.QueryTypes.SELECT })
            .then(usuarios => res.json({ error:false, usuarios:usuarios, message: "Usuarios obtenidos con éxito", messageType:"success"}))
            .catch(err => res.json({ error: true, message: "Error al obtener los usuarios de la empresa.<br>"+err, messageType:"error" }))
		})

        // buscar bancos del sistema financiero
        router.route('/transporte/bancos/busqueda/:busqueda')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { busqueda} = req.params
            Tipo.find({ where:{ nombre_corto: "BASIFI" } })
            .then(tipo => { 
                Clase.findAll({ where: { tipo: tipo.id, nombre: { $like:"%"+busqueda+"%" }}
                })
                .then(bancos => res.json(bancos))
                .catch(err => res.json({ error: true, message: "<strong>Error al obtener los bancos </strong><br>" + err, messageType:"error"}))
            })
            .catch(err => res.json({ error: true, message: "<strong>Error al obtener el tipo bancos </strong><br>" + err, messageType:"error"}))
		})

        // buscar rutas por nombre
        router.route('/transporte/ruta/empresa/:id_empresa/busqueda/:busqueda')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa, busqueda} = req.params
            TransporteRuta.findAll({
                where:{
                    id_empresa:id_empresa,
                    $or: [{ origen: { $like: "%" + busqueda + "%" } }, { destino: { $like: "%" + busqueda + "%" } }],
                    
                },
                order: [['createdAt', 'desc']]
            })
            .then(rutas=>{
                rutas.map((act, i, arr)=>arr[i].tag=act.origen+' - '+act.destino)
                res.json(rutas)
            })
            .catch(err=>{
                res.json({ error:true, message: "<strong>Error al obtener los rutas</strong><br> "+err})
            })
		})
        
        // Guardar o editar recibo
        router.route('/transporte/recibo_detalle')
        .post(ensureAuthorizedlogged, function (req, res) {
            const { id, id_usuario, id_empresa, moneda, metodo_pago, fecha, hora, observacion, chofer, vehiculo, banco, banco_destino, nro_cheque, detalle, sucursal } = req.body
            let nombre_corto_moneda = moneda ? "BOB" : "SUS"
            if(id){
                Tipo.find({ where: { nombre_corto: "TM" } })
                .then(tipo=>{
                    Clase.find({ where: { tipo: tipo.id, nombre_corto: nombre_corto_moneda } })
                    .then(moneda => {
                        Recibo.update({
                            id_moneda: moneda.id ? moneda.id : null,
                            fecha: fecha ? fecha.split("/").reverse().join("-") + hora : null,
                            observacion: observacion ? observacion : null,
                            id_chofer: chofer ? chofer : null,
                            id_vehiculo: vehiculo ? vehiculo : null,
                            metodo_pago: metodo_pago ? metodo_pago : null,
                            id_banco: banco ? banco : null,
                            id_banco_destino: banco_destino ? banco_destino : null,
                            nro_cheque: nro_cheque ? nro_cheque : null
                        },{
                            where: { id:id}
                        })
                        .then(recibo => {
                            detalle.forEach(e => {
                                if(e.id){
                                    if(e.eliminado){
                                        DetalleRecibo.destroy({ where:{id:e.id}})
                                        .then(eliminado => {})
                                        .catch(err => res.json({ error: true, message: "Error al eliminar recibo.<br>"+err, messageType:"error" }))
                                    }else{
                                        DetalleRecibo.update({
                                            importe: e.importe? e.importe : null,
                                            id_ruta: e.ruta ? e.ruta.id : null,
                                            peso: e.peso ? e.peso : null,
                                            unidad: e.unidad ? e.unidad : null,
                                            descripcion_descuento: e.descripcion_descuento ? e.descripcion_descuento : null,
                                            observacion: e.observacion ? e.observacion : null
                                        },{
                                            where: { id:e.id}
                                        })
                                        .then(detalleGuardado => {})
                                        .catch(err => res.json({ error: true, message: "Error al editar detalle.<br>"+err, messageType:"error" }))
                                    }
                                }else{
                                    DetalleRecibo.create({
                                        id_recibo: id ? id : null,
                                        importe: e.importe? e.importe : null,
                                        id_ruta: e.ruta ? e.ruta.id : null,
                                        peso: e.peso ? e.peso : null,
                                        unidad: e.unidad ? e.unidad : null,
                                        descripcion_descuento: e.descripcion_descuento ? e.descripcion_descuento : null,
                                        observacion: e.observacion ? e.observacion : null
                                    })
                                    .then(detalleGuardado => {})
                                    .catch(err => res.json({ error: true, message: "Error al guardar detalle.<br>"+err, messageType:"error" }))
                                } 
                            });
                            res.json({ error: false, id_recibo: id, message: "Recibo editado con éxito", messageType:"success" })
                        })
                        .catch(err => res.json({ error: true, message: "Error al guardar recibo.<br>"+err, messageType:"error" }))
                    })
                    .catch(err => res.json({ error: true, message: "Error al obtener ID moneda.<br>"+err, messageType:"error" }))
                })
                .catch(err => res.json({ error: true, message: "Error al obtener el Tipo de moneda.<br>"+err, messageType:"error" }))
            }else{
                Tipo.find({ where: { nombre_corto: "TM" } })
                .then(tipo=>{
                    Clase.find({ where: { tipo: tipo.id, nombre_corto: nombre_corto_moneda } })
                    .then(moneda => {
                        sequelize.query("SELECT MAX(recibo.correlativo) as correlativo FROM agil_transporte_recibo recibo INNER JOIN sys_usuario usuario ON usuario.id=recibo.id_usuario WHERE usuario.empresa = "+id_empresa, { type: sequelize.QueryTypes.SELECT })
                        .then(correlativo => {
                            Tipo.find({ where:{ nombre_corto: "ESRETRA" } })
                            .then(tipo=>{
                                Clase.find({ where:{ tipo: tipo.id, nombre_corto: "ABIERTO" }})
                                .then(estado=> {
                                    Recibo.create({
                                        id_usuario: id_usuario,
                                        id_moneda: moneda.id ? moneda.id : null,
                                        fecha: fecha ? fecha.split("/").reverse().join("-") + hora : null,
                                        observacion: observacion ? observacion : null,
                                        id_chofer: chofer ? chofer : null,
                                        id_vehiculo: vehiculo ? vehiculo : null,
                                        id_sucursal: sucursal ? sucursal : null,
                                        metodo_pago: metodo_pago ? metodo_pago : null,
                                        id_banco: banco ? banco : null,
                                        id_banco_destino: banco_destino ? banco_destino : null,
                                        nro_cheque: nro_cheque ? nro_cheque : null,
                                        correlativo: correlativo[0].correlativo ? correlativo[0].correlativo + 1 : 1,
                                        id_estado: estado.id ? estado.id : null,
                                        eliminado: 0
                                    })
                                    .then(recibo => {
                                        if(detalle.length > 0){
                                            detalle.forEach(e => {
                                                DetalleRecibo.create({
                                                    id_recibo: recibo.id ? recibo.id : null,
                                                    importe: e.importe? e.importe : null,
                                                    id_ruta: e.ruta ? e.ruta.id : null,
                                                    peso: e.peso ? e.peso : null,
                                                    unidad: e.unidad ? e.unidad : null,
                                                    descripcion_descuento: e.descuento ? e.descuento : null,
                                                    observacion: e.observacion ? e.observacion : null
                                                })
                                                .then(detalleGuardado => {})
                                                .catch(err => res.json({ error: true, message: "Error al guardar detalle.<br>"+err, messageType:"error" }))
                                            });
                                            res.json({ error: false, id_recibo: recibo.id, message: "Recibo guardado con éxito", messageType:"success" })
                                        }else{
                                            Recibo.destroy({ where:{id:recibo.id}})
                                            .then(eliminado => {
                                                res.json({ error: true, message: "No se guardó el recibo por no tener detalles.<br>"+err, messageType:"error" })
                                            })
                                            .catch(err => res.json({ error: true, message: "Error al eliminar recibo.<br>"+err, messageType:"error" }))
                                        }
                                    })
                                    .catch(err => res.json({ error: true, message: "Error al guardar recibo.<br>"+err, messageType:"error" }))
                                })
                                .catch(err => res.json({ error:true, message: "Error al obtener el estado del recibo.", messageType:"error" }))
                            })
                            .catch(err => res.json({ error:true, message: "Error al obtener el tipo de estado del recibo.<br>"+err, messageType:"error" })) 
                        })
                        .catch(err => res.json({ error: true, message: "Error al obtener Correlativo de recibo.<br>"+err, messageType:"error" }))
                    })
                    .catch(err => res.json({ error: true, message: "Error al obtener ID moneda.<br>"+err, messageType:"error" }))
                })
                .catch(err => res.json({ error: true, message: "Error al obtener el tipo de moneda.<br>"+err, messageType:"error" }))
            }
		})

        // obtener recibo por ID
        router.route('/transporte/recibo/id_recibo/:id_recibo')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_recibo} = req.params
            Recibo.find({ 
                where: { id:id_recibo},
                include: [
                    {model: Usuario, as: 'usuario', include: [ { model: Persona, as: 'persona'}]},
                    {model: DetalleRecibo, as:'detalle', required: true, include: [ {model: TransporteRuta, as:'ruta'}]},
                    {model: Clase, as: 'moneda'},
                    {model: Sucursal, as: 'sucursal'},
                    {model: Chofer, as: 'chofer', include: [ {model: Persona, as:'persona'}]},
                    {model: VehiculoExterno, as:'vehiculo'},
                    {model: Banco, as:'banco'},
                    {model: Clase, as:'bancoPais'}
                ]
            })
            .then(recibo=>{
                if(recibo){
                    res.json({error:false, message:"Recibo recuperado con éxito", recibo:recibo, messageType:'success'})
                }else{
                    res.json({error:true, message:"No se encontró datos del recibo<br>ID_RECIBO: "+id_recibo, messageType:'error'})
                } 
            })
            .catch(err=>{
                res.json({ error:true, message: "Error al obtener el recibo con ID:"+id_recibo+"<br>"+err, messageType:'error'})
            })
		})
        // obtener todos los recibos
        router.route('/transporte/recibos/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
            const { inicio, fin, banco, bancoDestino, chofer, estado, metodo_pago, moneda, monto, nro_cheque, recibo, sucursal, usuario, vehiculo } = req.body.filter
            if(inicio && fin){
                var fechaInicio = inicio.split("/").reverse().join("-")+" 00:00:00"
                var fechaFin = fin.split("/").reverse().join("-")+" 23:59:59"
                const { id_empresa} = req.params
                const { filtrar, column, direction, currentPage, itemsPerPage, search } = req.body
                var condicion = "WHERE usuario.empresa="+id_empresa+" AND recibo.fecha BETWEEN '"+fechaInicio+"' AND '"+fechaFin+"'"
                if(filtrar){
                    let moneda_nombre_corto = moneda == "true" ? "BOB": "SUS"
                    if(banco.id != 0) condicion += " AND recibo.id_banco= "+banco.id
                    if(bancoDestino) condicion += " AND recibo.id_banco_destino= "+bancoDestino.id
                    if(chofer && chofer.id) condicion += " AND recibo.id_chofer= "+chofer.id
                    if(estado != "TODOS") condicion += " AND estado.nombre_corto= '"+estado+"'"
                    if(metodo_pago != "TODOS") condicion += " AND recibo.metodo_pago= '"+metodo_pago+"'"
                    if(moneda != "TODOS") condicion += " AND moneda.nombre_corto= '"+moneda_nombre_corto+"'"
                    if(monto) condicion += " AND detalle.monto LIKE '%"+monto+"%'"
                    if(nro_cheque) condicion += " AND recibo.nro_cheque LIKE '%"+nro_cheque+"%'"
                    if(recibo) condicion += " AND recibo.correlativo LIKE '%"+recibo+"%'"
                    if(sucursal.id != 0) condicion += " AND sucursal.id= "+sucursal.id
                    if(usuario.id != 0) condicion += " AND recibo.id_usuario= "+usuario.id
                    if(vehiculo) condicion += " AND recibo.id_vehiculo= "+vehiculo.id
                }else{
                   if(search != 0 ) condicion += " AND (recibo.correlativo LIKE '%"+search+"%' OR persona.nombre_completo LIKE '%"+search+"%' OR banco_origen.nombre LIKE '%"+search+"%' OR banco_destino.nombre LIKE '%"+search+"%' OR recibo.nro_cheque LIKE '%"+search+"%' OR sucursal.nombre LIKE '%"+search+"%' OR usuario.nombre_usuario LIKE '%"+search+"%' OR detalle.monto LIKE '%"+search+"%' OR vehiculo.placa LIKE '%"+search+"%' )"
                }
                var limit  = itemsPerPage != "0" ?  " LIMIT "+ (itemsPerPage * (currentPage - 1)) +", "+itemsPerPage : " "
                var orderBy =" ORDER BY recibo.correlativo"
                var groupBy = " GROUP BY recibo.id "
                if(column != "correlativo"){
                    orderBy = " ORDER BY "
                    if(column == "fecha" || column =="correlativo" || column == "metodo_pago" || column == "nro_cheque" ) orderBy += " recibo."+column
                    if(column == "monto") orderBy += " monto"
                    if(column == "chofer") orderBy += " persona.nombre_completo"
                    if(column == "placa") orderBy += " vehiculo.placa"
                    if(column == "banco") orderBy += " banco_origen.nombre"
                    if(column == "banco_destino") orderBy += " banco_destino.nombre"
                    if(column == "sucursal") orderBy += " sucursal.nombre"
                    if(column == "usuario") orderBy += " usuario.nombre_usuario"
                    if(column == "estado") orderBy += " estado.nombre"
                }   
                sequelize.query("SELECT recibo.id FROM agil_transporte_recibo recibo INNER JOIN ( SELECT id_recibo, SUM(importe) AS monto FROM agil_transporte_detalle_recibo GROUP BY id_recibo ) AS detalle ON detalle.id_recibo=recibo.id INNER JOIN sys_usuario usuario ON usuario.id=recibo.id_usuario INNER JOIN agil_usuario_sucursal usuario_sucursal ON usuario_sucursal.usuario=usuario.id INNER JOIN agil_sucursal sucursal ON sucursal.id=usuario_sucursal.sucursal INNER JOIN gl_clase moneda ON moneda.id=recibo.id_moneda INNER JOIN agil_transporte_chofer chofer ON chofer.id=recibo.id_chofer INNER JOIN gl_persona persona ON persona.id=chofer.id_persona INNER JOIN agil_vehiculos_externos vehiculo ON vehiculo.id=recibo.id_vehiculo LEFT JOIN agil_banco banco_origen ON banco_origen.id=recibo.id_banco LEFT JOIN gl_clase banco_destino ON banco_destino.id=recibo.id_banco_destino LEFT JOIN gl_clase estado ON estado.id=recibo.id_estado "+condicion+groupBy, { type: sequelize.QueryTypes.SELECT })
                .then(data=>{
                    sequelize.query("SELECT recibo.id,recibo.fecha,recibo.correlativo,recibo.metodo_pago,recibo.nro_cheque,detalle.monto AS monto,chofer.id AS id_chofer,persona.id AS id_persona,persona.nombre_completo AS nombre_chofer,vehiculo.id AS id_vehiculo,vehiculo.placa AS placa,sucursal.nombre AS nombre_sucursal,usuario.nombre_usuario,estado.nombre AS nombre_estado,banco_origen.nombre AS banco_origen,banco_origen.numero AS cuenta_origen,banco_destino.nombre AS banco_destino,moneda.nombre_corto AS moneda, moneda.nombre AS nombre_moneda FROM agil_transporte_recibo recibo INNER JOIN ( SELECT id_recibo, SUM(importe) AS monto FROM agil_transporte_detalle_recibo GROUP BY id_recibo ) AS detalle ON detalle.id_recibo=recibo.id INNER JOIN sys_usuario usuario ON usuario.id=recibo.id_usuario INNER JOIN agil_usuario_sucursal usuario_sucursal ON usuario_sucursal.usuario=usuario.id INNER JOIN agil_sucursal sucursal ON sucursal.id=usuario_sucursal.sucursal INNER JOIN gl_clase moneda ON moneda.id=recibo.id_moneda INNER JOIN agil_transporte_chofer chofer ON chofer.id=recibo.id_chofer INNER JOIN gl_persona persona ON persona.id=chofer.id_persona INNER JOIN agil_vehiculos_externos vehiculo ON vehiculo.id=recibo.id_vehiculo LEFT JOIN agil_banco banco_origen ON banco_origen.id=recibo.id_banco LEFT JOIN gl_clase banco_destino ON banco_destino.id=recibo.id_banco_destino LEFT JOIN gl_clase estado ON estado.id=recibo.id_estado "+condicion+groupBy+orderBy+" "+direction+limit, { type: sequelize.QueryTypes.SELECT })
                    .then(recibos=>{
                        let paginas = itemsPerPage != "0" ? Math.ceil(data.length / itemsPerPage) : 1;
                        res.json({error:false, paginas: paginas , message:"Recibos recuperados con éxito", recibos:recibos, messageType:"success"})
                    })
                    .catch(err=>{
                        res.json({ error:true, message: "Error al obtener los recibos<br>"+err, messageType:"error"})
                    })
                })
                .catch(err=>{
                    res.json({ error:true, message: "Error al obtener la cantidad total de recibos<br>"+err, messageType:"error"})
                })
            }else{
                res.json({ error:true, message: "Fechas no válidas", messageType:"error"})
            }
		})

        //Obtener recibos para reportes
        router.route('/transporte/RecibosReporte/reportes/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
            const { inicio, fin, banco, bancoDestino, chofer, estado, metodo_pago, moneda, monto, nro_cheque, recibo, sucursal, usuario, vehiculo } = req.body
            if(inicio && fin){
                var fechaInicio = inicio.split("/").reverse().join("-")+" 00:00:00"
                var fechaFin = fin.split("/").reverse().join("-")+" 23:59:59"
                const { id_empresa} = req.params
                var condicion = " WHERE usuario.empresa="+id_empresa+" AND recibo.fecha BETWEEN '"+fechaInicio+"' AND '"+fechaFin+"'"
                let moneda_nombre_corto = moneda == "true" ? "BOB": "SUS"
                if(banco.id != 0) condicion += " AND recibo.id_banco= "+banco.id
                if(bancoDestino) condicion += " AND recibo.id_banco_destino= "+bancoDestino.id
                if(chofer) condicion += " AND recibo.id_chofer= "+chofer.id
                if(estado != "TODOS") condicion += " AND estado.nombre_corto= '"+estado+"'"
                if(metodo_pago != "TODOS") condicion += " AND recibo.metodo_pago= '"+metodo_pago+"'"
                if(moneda != "TODOS") condicion += " AND moneda.nombre_corto= '"+moneda_nombre_corto+"'"
                if(monto) condicion += " AND detalle.monto LIKE '%"+monto+"%'"
                if(nro_cheque) condicion += " AND recibo.nro_cheque LIKE '%"+nro_cheque+"%'"
                if(recibo) condicion += " AND recibo.correlativo LIKE '%"+recibo+"%'"
                if(sucursal.id != 0) condicion += " AND sucursal.id= "+sucursal.id
                if(usuario.id != 0) condicion += " AND recibo.id_usuario= "+usuario.id
                if(vehiculo) condicion += " AND recibo.id_vehiculo= "+vehiculo.id
                var groupBy = " GROUP BY recibo.id "
                var orderBy =" ORDER BY recibo.correlativo" 
                sequelize.query("SELECT recibo.id,recibo.fecha,recibo.correlativo,recibo.metodo_pago,recibo.nro_cheque,recibo.observacion AS obs_recibo,detalle.monto AS monto,detalles.importe AS importe,detalles.peso AS peso,detalles.unidad AS unidad,detalles.descripcion_descuento AS descuento,detalles.observacion AS obs_detalle,CONCAT(rutas.origen,'-',rutas.destino) AS ruta_detalle,chofer.id AS id_chofer,persona.id AS id_persona,persona.nombre_completo AS nombre_chofer,vehiculo.id AS id_vehiculo,vehiculo.placa AS placa,sucursal.nombre AS nombre_sucursal,usuario.nombre_usuario,estado.nombre AS nombre_estado,banco_origen.nombre AS banco_origen,banco_origen.numero AS cuenta_origen,banco_destino.nombre AS banco_destino,moneda.nombre_corto AS moneda,moneda.nombre AS nombre_moneda FROM agil_transporte_recibo recibo INNER JOIN (SELECT id_recibo,SUM(importe) AS monto FROM agil_transporte_detalle_recibo GROUP BY id_recibo) AS detalle ON detalle.id_recibo=recibo.id INNER JOIN agil_transporte_detalle_recibo detalles ON detalles.id_recibo=recibo.id LEFT JOIN agil_transporte_rutas rutas ON rutas.id=detalles.id_ruta INNER JOIN sys_usuario usuario ON usuario.id=recibo.id_usuario INNER JOIN agil_usuario_sucursal usuario_sucursal ON usuario_sucursal.usuario=usuario.id INNER JOIN agil_sucursal sucursal ON sucursal.id=usuario_sucursal.sucursal INNER JOIN gl_clase moneda ON moneda.id=recibo.id_moneda INNER JOIN agil_transporte_chofer chofer ON chofer.id=recibo.id_chofer INNER JOIN gl_persona persona ON persona.id=chofer.id_persona INNER JOIN agil_vehiculos_externos vehiculo ON vehiculo.id=recibo.id_vehiculo LEFT JOIN agil_banco banco_origen ON banco_origen.id=recibo.id_banco LEFT JOIN gl_clase banco_destino ON banco_destino.id=recibo.id_banco_destino LEFT JOIN gl_clase estado ON estado.id=recibo.id_estado "+ condicion + groupBy + orderBy, { type: sequelize.QueryTypes.SELECT })
                .then(recibos=>{
                    res.json({error:false, message:"Recibos recuperados con éxito", recibos:recibos, messageType:"success"})
                })
                .catch(err=>{
                    res.json({ error:true, message: "Error al obtener los recibos<br>"+err, messageType:"error"})
                })
            }else{
                res.json({ error:true, message: "Fechas no válidas", messageType:"error"})
            }
		})

        // Eliminar recibo 
        router.route('/transporte/recibo/:id_recibo/eliminar/:eliminar')
        .delete(ensureAuthorizedlogged, async function (req, res) {
            const { id_recibo, eliminar } = req.params
            if(id_recibo && eliminar.length > 0){
                Tipo.find({ where:{ nombre_corto: "ESRETRA" }})
            .then(tipo=>{
                if(eliminar==="1"){
                    Clase.find({ where:{ tipo: tipo.id, nombre_corto: "ANULADO" }})
                    .then(estado=> {
                        Recibo.update({ eliminado: true, id_estado: estado.id }, { where:{ id:id_recibo } })
                        .then(eliminado => res.json({ error:false, message: "Recibo eliminado con éxito.", messageType:"success" }))
                        .catch(err => res.json({ error:true, message: "Error al eliminar recibo! <br>"+err, messageType:"error" }))
                    })
                    .catch(err => res.json({ error:true, message: "Error al obtener el estado del recibo. <br>"+err, messageType:"error" }))
                }else{
                    Clase.find({ where:{ tipo: tipo.id, nombre_corto: "CERRADO" }})
                    .then(estado=> {
                        Recibo.update({ id_estado: estado.id }, { where:{ id:id_recibo } })
                        .then(cerrado => res.json({ error:false, message: "Recibo cerrado con éxito.", messageType:"success" }))
                        .catch(err => res.json({ error:true, message: "Error al cerrar recibo! <br>"+err, messageType:"error" }))
                    })
                    .catch(err => res.json({ error:true, message: "Error al obtener el estado del recibo.<br>"+err, messageType:"error" }))
                }
                    
            })
            .catch(err => res.json({ error:true, message: "Error al obtener el tipo de estado del recibo.<br>"+err, messageType:"error" })) 
            }else{
                res.json({ error:true, message: "Parámetros recibido en servidor no válidos.", messageType:"error" })
            }
            
		});

    // FIN RECIBOS TRANSPORTE

    // INICIO CHOFERES
        router.route('/transporte/chofer')
        .post(ensureAuthorizedlogged, function (req, res) {
            const { categoria, ci, direccion, id_empresa, licencia, nombre_completo,telefono , id, id_telefono, id_persona} = req.body
            if(id){
                Chofer.update({
                    id_persona: id_persona,
                    id_categoria: categoria.id,
                    vencimiento: licencia ? licencia.split("/").reverse().join("-") + " 00:00:00" : null,
                    id_empresa: id_empresa
                },
                { where:{ id:id } })
                .then(choferEditado=>{
                    Persona.update({
                        nombre_completo: nombre_completo,
                        direccion: direccion,
                        ci:ci
                    },{ where:{ id: id_persona } })
                    .then(personaEditada=>{
                        if(id_telefono){
                            Telefono.update({
                                id_persona:id_persona,
                                numero: telefono,
                                fijo: 0
                            },{ where:{id:id_telefono}})
                            .then(telefonoEditado=>{
                                res.json({error:false, message:'<strong>Registro editado con éxito</strong>', messageType: 'success' })
                            })
                            .catch(err=>{
                                res.json({error:true, message:'<strong>Error al editar Telefono</strong></br>'+err , messageType: 'error' })
                            })
                        }else{
                            if(telefono){
                                Telefono.create({
                                    id_persona:id_persona,
                                    numero: telefono,
                                    fijo: 0
                                })
                                .then(telefonoCreado=>{
                                    res.json({error:false, message:'<strong>Registro editado con éxito</strong>', messageType: 'success' })
                                })
                                .catch(err=>{
                                    res.json({error:true, message:'<strong>Error al crear Telefono</strong></br>'+err , messageType: 'error' })
                                })
                            }else{
                                res.json({error:false, message:'<strong>Registro editado con éxito</strong>', messageType: 'success' })
                            }
                        }
                    })
                    .catch(err=>{
                    res.json({error:true, message:'<strong>Error al editar Persona</strong></br>'+err , messageType: 'error' })
                    })
                })
                .catch(err=>{
                    res.json({error:true, message:'<strong>Error al editar Chofer </strong></br> '+err , messageType: 'error' })
                })
            }else{
                Persona.create({
                    nombre_completo: nombre_completo,
                    direccion: direccion,
                    ci:ci
                })
                .then(persona=>{
                    Chofer.create({
                        id_persona: persona.id,
                        id_categoria: categoria.id,
                        vencimiento: licencia ? licencia.split("/").reverse().join("-") + " 00:00:00" : null,
                        id_empresa: id_empresa
                    })
                    .then(chofer=>{
                        if(telefono){
                            Telefono.create({
                                id_persona:persona.id,
                                numero: telefono,
                                fijo: 0
                            })
                            .then(contacto=>{
                                res.json({error:false, chofer:chofer, message:'Chofer Guardado', messageType: 'success' })
                            })
                            .catch(err=>{
                                res.json({error:true, message:'Error al guardar telefono \n '+err , messageType: 'error' })
                            })
                        }else{
                            res.json({error:false, chofer:chofer, message:'Chofer Guardado', messageType: 'success' })
                        }
                    })
                    .catch(err=>{
                        res.json({error:true, message:'Error al guardar chofer \n '+err, messageType: 'error' })
                    }) 
                })
                .catch(err=>{
                    res.json({error:true, message:'Error al guardar persona \n '+err , messageType: 'error' })

                })
            }
		})

        router.route('/transporte/chofer/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            const { id_empresa} = req.params
            Chofer.findAll({
                where:{
                    id_empresa:id_empresa
                },
                include:[
                    {model: Persona, as: 'persona',
                        include:[
                            {model:Telefono,as:'telefonos'}
                        ]
                    },
                    {model:Clase, as: 'categoria'}
                ],
                order: [['createdAt', 'desc']]
            })
            .then(choferes=>{
                res.json({error:false, message:"Choferes recuperados con éxito", choferes:choferes})
            })
            .catch(err=>{
                res.json({ error:true, message: "Error al obtener los choferes\n "+err})
            })
		})

        router.route('/transporte/chofer/:id_chofer/persona/:id_persona')
        .delete(ensureAuthorizedlogged, async function (req, res) {
            const { id_chofer, id_persona } = req.params
            
            const data = await Recibo.findAll({
                where:{id_chofer: id_chofer}
            })

            if(data.length>0){
                let mensaje =  data.length == 1 ? "recibo </strong> registrado a su favor." : " recibos </strong> registrados a su favor."
                res.json({error: true, message:"No se puede eliminar chofer porque tiene <strong>"+data.length + mensaje, messageType:"warning"})
            }else{
               const eliminarChofer = await Chofer.destroy({ where: {id: id_chofer} })
                const eliminarTelefono = await Telefono.destroy({ where:{id_persona:id_persona}})
                const eliminarPerson = await Persona.destroy({ where: { id: id_persona } })
                res.json({ error:false, message: "Chofer eliminado Satisfactoriamente!", messageType:"success" });
            }
		});
    // FIN CHOFERES
    
    //INICIO VEHICULOS
    router.route('/transporte/vehiculo')
    .post(ensureAuthorizedlogged, function (req, res) {
        const { id_empresa, placa, marca, modelo, capacidad, id} = req.body
        if(id){
            VehiculoExterno.update({
                placa: placa,
                marca: marca,
                modelo: modelo,
                capacidad: capacidad ?  parseFloat(capacidad) : null
            },
            { where:{ id:id } })
            .then(vehiculo=>{
                res.json({error:false, vehiculo:vehiculo, message:'Vehículo Editado', messageType: 'success' })
            })
            .catch(err=>{
                res.json({error:true, message:'<strong>Error al editar Vehículo </strong></br> '+err , messageType: 'error' })
            })
        }else{
            VehiculoExterno.create({
                placa: placa,
                marca: marca,
                modelo: modelo,
                id_empresa: id_empresa ? id_empresa.toString() : null,
                capacidad: capacidad ?  parseFloat(capacidad) : null
            })
            .then(vehiculo=>{
                res.json({error:false, vehiculo:vehiculo, message:'Vehículo Guardado', messageType: 'success' })
            })
            .catch(err=>{
                res.json({error:true, message:'<strong>Error al guardar Vehículo </strong></br> '+err , messageType: 'error' })
            }) 
        }
    })

    router.route('/transporte/vehiculo/empresa/:id_empresa')
    .get(ensureAuthorizedlogged, function (req, res) {
        const { id_empresa} = req.params
        VehiculoExterno.findAll({
            where:{
                empresa:id_empresa
            },
            order: [['createdAt', 'desc']]
        })
        .then(vehiculos=>{
            res.json({error:false, message:"Vehículos recuperados con éxito", vehiculos:vehiculos})
        })
        .catch(err=>{
            res.json({ error:true, message: "<strong>Error al obtener los vehículos</strong></br>"+err})
        })
    })

    router.route('/transporte/vehiculo/:id_vehiculo')
    .delete(ensureAuthorizedlogged, async function (req, res) {
        const { id_vehiculo } = req.params
        
        const data = await Recibo.findAll({
            where:{id_vehiculo: id_vehiculo}
        })

        if(data.length>0){
            let mensaje =  data.length == 1 ? " recibo.</strong>" : " recibos. </strong>"
            res.json({error: true, message:"No se puede eliminar el vehículo porque está vinculado a <strong>"+data.length + mensaje, messageType:"warning"})
        }else{
           const eliminado = await VehiculoExterno.destroy({ where: {id: id_vehiculo} })
            res.json({ error:false, message: "Vehículo eliminado Satisfactoriamente!", messageType:"success" });
        }
    });
    //FIN VEHICULOS

    //INICIO RUTAS
    router.route('/transporte/ruta')
    .post(ensureAuthorizedlogged, function (req, res) {
        const { id_empresa, origen, destino, costo, id} = req.body
        if(id){
            TransporteRuta.update({
                origen: origen,
                destino: destino,
                costo: costo ? costo : 0.00
            },
            { where:{ id:id } })
            .then(ruta=>{
                res.json({error:false, ruta:ruta, message:'Ruta Editada', messageType: 'success' })
            })
            .catch(err=>{
                res.json({error:true, message:'<strong>Error al editar Ruta </strong></br> '+err , messageType: 'error' })
            })
        }else{
            TransporteRuta.create({
                origen: origen,
                destino: destino,
                costo: costo ? costo : 0.00,
                id_empresa: id_empresa ? id_empresa : null
            })
            .then(ruta=>{
                res.json({error:false, ruta:ruta, message:'Ruta Guardada', messageType: 'success' })
            })
            .catch(err=>{
                res.json({error:true, message:'<strong>Error al guardar Ruta </strong></br> '+err , messageType: 'error' })
            }) 
        }
    })

    router.route('/transporte/rutas/empresa/:id_empresa')
    .get(ensureAuthorizedlogged, function (req, res) {
        const { id_empresa} = req.params
        TransporteRuta.findAll({
            where:{
                id_empresa:id_empresa
            },
            order: [['createdAt', 'desc']]
        })
        .then(rutas=>{
            res.json({error:false, message:"Rutas recuperados con éxito", rutas:rutas})
        })
        .catch(err=>{
            res.json({ error:true, message: "<strong>Error al obtener las rutas</strong></br>"+err})
        })
    })

    router.route('/transporte/ruta/:id_ruta')
    .delete(ensureAuthorizedlogged, async function (req, res) {
        const { id_ruta } = req.params
        
        const data = await DetalleRecibo.findAll({
            where:{id_ruta: id_ruta}
        })

        if(data.length>0){
            let mensaje =  data.length == 1 ? " recibo.</strong>" : " recibos. </strong>"
            res.json({error: true, message:"No se puede eliminar la ruta porque está vinculado a <strong>"+data.length + mensaje , messageType:"warning"})
        }else{
           const eliminado = await TransporteRuta.destroy({ where: {id: id_ruta} })
            res.json({ error:false, message: "Ruta eliminada con éxito!", messageType:"success" });
        }
    });
    //FIN RUTAS

	
}