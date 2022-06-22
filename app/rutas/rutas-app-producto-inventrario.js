module.exports = function (router, ensureAuthorized, forEach, Compra, DetalleCompra, Almacen, Sucursal, Empresa, sequelize, Sequelize,
    Tipo, Clase, Proveedor, Producto, Movimiento, DetalleMovimiento, Inventario, Venta, DetalleVenta,
    Cliente, CodigoControl, NumeroLiteral, Diccionario, SucursalActividadDosificacion, Dosificacion,
    ConfiguracionGeneralFactura, ConfiguracionFactura, PagoVenta, PagoCompra, Usuario, DetalleVentaNoConsolidada, ClienteCuenta, ContabilidadCuenta, ProveedorCuenta, UsuarioGrupos, Pedido, DetallesPedido, ProductoBase, ServicioVenta, DetalleVentaProductoFinal, ClienteAnticipo, ProveedorAnticipo, ensureAuthorizedlogged, nodemailer, jwt, CajaChica) {
        router.route('/desktop/empresa/:idEmpresa/almacen/:idAlmacen/currentPage/:currentPage/itemsPerPage/:itemsPerPage/search/:search/column/:column/direction/:direction')
        .get(ensureAuthorizedlogged, (req, res) => {
            var CondicionInventario = { id_almacen: req.params.idAlmacen, cantidad: { $gte: 0 } }
            var CondicionProducto = {}
            if (req.params.search != 0) {
                console.log(req.params.search)
                CondicionProducto.nombre = { $like: "%" + req.params.search + "%" };
                /*   TypeCondition.nick_name = { [Op.iLike]: "%" + req.params.search + "%" };  */
            }
            var textOrder = ""
            textOrder = req.params.column + " " + req.params.direction
            /* Producto.count({
                where: CondicionProducto,
                include: [{ model: Inventario, as: 'inventarios', where: CondicionInventario }],
                group: ["`agil_producto`.`id`"]

            }).then(function (data) {
                Producto.findAll({
                    where: CondicionProducto,
                    include: [{ model: Inventario, as: 'inventarios', where: CondicionInventario }],
                    offset: (req.params.itemsPerPage * (req.params.currentPage - 1)), limit: req.params.itemsPerPage,
                    order: sequelize.literal(textOrder)
                }).then((FoundProduct) => {
                    res.json({ products: FoundProduct, totalItems: data.length })
                })
            }) */
            sequelize.query("SELECT \
            p.nombre\
        FROM agil_producto AS p INNER JOIN inv_inventario AS i ON i.producto = p.id \
        WHERE i.almacen =" + req.params.idAlmacen + " GROUP BY p.id"
                , { type: sequelize.QueryTypes.SELECT }).then(function (contador) {
                    sequelize
                    .query('call seleccionarkardex(:limite, :offsset, :idAlmacen)', 
                          {replacements: { limite: (req.params.itemsPerPage * (req.params.currentPage - 1)), offsset: parseInt(req.params.itemsPerPage), idAlmacen: parseInt(req.params.idAlmacen), }})
                        .then(function (FoundProduct) {
                            res.json({ products: FoundProduct, totalItems: contador.length })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                        });
                })
        });
    router.route('/desktop/producto/:id_producto/almacen/:id_almacen')
        .get(ensureAuthorizedlogged, (req, res) => {
            condicionPoducto = { id_producto: req.params.id_producto }
            var condicionMovimiento = { id_almacen: req.params.id_almacen }
            /*  Producto.find(include:{}) */
            sequelize.query("SELECT `inv_detalle_movimiento`.`id`, `inv_detalle_movimiento`.`producto` AS `id_producto`,\
            (SUM(CASE \
            WHEN `movimiento.tipo`.`nombre_corto` = 'MOVING' \
            THEN `inv_detalle_movimiento`.`cantidad`  \
            ELSE 0 \
        END)-SUM(CASE \
            WHEN `movimiento.tipo`.`nombre_corto` = 'MOVEGR' \
            THEN `inv_detalle_movimiento`.`cantidad` \
            ELSE 0 \
        END)) as total\
        FROM\
            `inv_detalle_movimiento` AS `inv_detalle_movimiento`\
            INNER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id` \
            AND `movimiento`.`almacen` ="+ req.params.id_almacen + " \
            LEFT OUTER JOIN `gl_tipo` AS `movimiento.tipo` ON `movimiento`.`tipo` = `movimiento.tipo`.`id`\
            LEFT OUTER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id` \
        WHERE `inv_detalle_movimiento`.`producto` ="+ req.params.id_producto + " \
        ORDER BY `movimiento`.`fecha` ASC;", {
                    type: sequelize.QueryTypes.SELECT
                }).then(function (detallesMovimiento) {
                    sequelize.query("SELECT\
                              SUM(dv.cantidad) AS cantidad\
                                FROM\
                                inv_venta AS v\
                                 INNER JOIN inv_detalle_venta AS dv ON dv.venta = v.id\
                                where v.activa=true and dv.producto="+ req.params.id_producto + " and almacen =" + req.params.id_almacen
                        , { type: sequelize.QueryTypes.SELECT })
                        .then(function (TotalCantVentas) {
                            sequelize.query("SELECT\
                        SUM(dc.cantidad) AS cantidad\
                          FROM\
                          inv_compra AS c\
                           INNER JOIN inv_detalle_compra AS dc ON dc.compra = c.id\
                          where dc.producto="+ req.params.id_producto + " and almacen =" + req.params.id_almacen + ";"
                                , { type: sequelize.QueryTypes.SELECT })
                                .then(function (TotalCantCompras) {
                                    sequelize.query("SELECT\
                                SUM(`inv_detalle_movimiento`.`cantidad`) as cantidad	 \
                            FROM\
                                `inv_detalle_movimiento` AS `inv_detalle_movimiento`\
                                LEFT OUTER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id`\
                                INNER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id` \
                                AND `movimiento.clase`.`nombre_corto` = '"+ Diccionario.ING_POR_INVENTARIO + "' \
                            WHERE\
                                `inv_detalle_movimiento`.`producto` =" + req.params.id_producto + " and almacen =" + req.params.id_almacen + ";"
                                        , { type: sequelize.QueryTypes.SELECT })
                                        .then(function (TotalCantInventarioInicial) {
                                            sequelize.query("SELECT\
                                SUM(`inv_detalle_movimiento`.`cantidad`) as cantidad	 \
                            FROM\
                                `inv_detalle_movimiento` AS `inv_detalle_movimiento`\
                                LEFT OUTER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id`\
                                INNER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id` \
                                AND `movimiento.clase`.`nombre_corto` = '"+ Diccionario.EGRE_TRASPASO + "' \
                            WHERE\
                                `inv_detalle_movimiento`.`producto` =" + req.params.id_producto + " and almacen =" + req.params.id_almacen + ";"
                                                , { type: sequelize.QueryTypes.SELECT })
                                                .then(function (TotalCantTraspasos) {
                                                    sequelize.query("SELECT\
                                                SUM(`inv_detalle_movimiento`.`cantidad`) as cantidad	 \
                                            FROM\
                                                `inv_detalle_movimiento` AS `inv_detalle_movimiento`\
                                                LEFT OUTER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id`\
                                                INNER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id` \
                                                AND `movimiento.clase`.`nombre_corto` = '"+ Diccionario.EGRE_BAJA + "' \
                                            WHERE\
                                                `inv_detalle_movimiento`.`producto` =" + req.params.id_producto + " and almacen =" + req.params.id_almacen + ";"
                                                        , { type: sequelize.QueryTypes.SELECT })
                                                        .then(function (TotalCantBajas) {
                                                            sequelize.query("SELECT\
                                                                SUM(`inv_detalle_movimiento`.`cantidad`) as cantidad	 \
                                                            FROM\
                                                                `inv_detalle_movimiento` AS `inv_detalle_movimiento`\
                                                                LEFT OUTER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id`\
                                                                INNER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id` \
                                                                AND `movimiento.clase`.`nombre_corto` = '"+ Diccionario.ING_TRASPASO + "' \
                                                            WHERE\
                                                                `inv_detalle_movimiento`.`producto` =" + req.params.id_producto + " and almacen =" + req.params.id_almacen + ";"
                                                                , { type: sequelize.QueryTypes.SELECT })
                                                                .then(function (TotalCantIngTraspasos) {
                                                                    res.json({
                                                                        saldoFisico: detallesMovimiento[0].total, TotalCantIngTraspasos: TotalCantIngTraspasos[0].cantidad, TotalCantBajas: TotalCantBajas[0].cantidad, TotalCantTraspasos: TotalCantTraspasos[0].cantidad, TotalCantInventarioInicial: TotalCantInventarioInicial[0].cantidad,
                                                                        totalCantidadVentas: TotalCantVentas[0].cantidad, totalCantidadCompras: TotalCantCompras[0].cantidad
                                                                    });
                                                                }).catch(function (err) {
                                                                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                                                                });
                                                        }).catch(function (err) {
                                                            res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                                                        });
                                                }).catch(function (err) {
                                                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                                                });
                                        }).catch(function (err) {
                                            res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                                        });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                                });
                        });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
                });
        })
    }