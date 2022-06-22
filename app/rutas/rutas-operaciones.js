const { raw } = require("body-parser");

module.exports = function (
  router,
  sequelize,
  Sequelize,
  Usuario,
  Producto,
  Diccionario,
  Clase,
  Sucursal,
  Empresa,
  ProductoBase,
  Almacen,
  Inventario,
  SolicitudReposicion,
  DetalleSolicitudProducto,
  DetalleSolicitudProductoBase,
  Persona,
  UsuarioGrupos,
  Tipo,
  Movimiento,
  DetalleMovimiento,
  Proveedor,
  ensureAuthorizedlogged,
  GestionDetalleOrdenReposicion,
  GestionOrdenReposicion,
  MedicoPaciente,
  ConfiguracionIso,
  ContabilidadCuenta,
  ContabilidadCuentaGrupo,
  ContabilidadCuentaCampo,
  GestionOrdenReposicionIso,
  GestionDetalleOrdenReposicionIso
) {
  router
    .route(
      "/operaciones-orden-reposicion/inventario/producto/:id_producto/almacen/:id_almacen"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      Inventario.findAll({
        where: {
          id_producto: req.params.id_producto,
          id_almacen: req.params.id_almacen,
          cantidad: { $gt: 0 },
        },
        attributes: [
          [sequelize.fn("sum", sequelize.col("cantidad")), "cantidadTotal"],
        ],
        group: ["`inv_inventario`.`producto`"],
      }).then(function (inventarios) {
        res.json({
          inventario_disponible:
            inventarios.length > 0
              ? inventarios[0].dataValues.cantidadTotal
              : 0,
        });
      });
    });
  router
    .route(
      "/operaciones-orden-reposicion/almacen/:id_almacen/grupo/:id_grupo/fecha/:fecha"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      let condicionSolicitud = {
        id_almacen: req.params.id_almacen,
        activo: false,
        id_movimiento: { $ne: null },
        eliminado: false,
      };
      let condicionGrupo = {};
      if (req.params.id_grupo != "0") {
        condicionGrupo = { id: req.params.id_grupo };
      }
      if (req.params.fecha != "0") {
        var inicio = new Date(req.params.fecha);
        inicio.setHours(0, 0, 0, 0);
        desde = true;

        var fin = new Date(req.params.fecha);
        fin.setHours(23, 59, 59, 59);
        hasta = true;
        condicionSolicitud.fecha = {
          $lte: [fin],
        };
      }
      SolicitudReposicion.findAll({
        where: condicionSolicitud,
        include: [
          {
            model: Almacen,
            as: "almacen",
            include: [{ model: Sucursal, as: "sucursal" }],
          },
          {
            model: DetalleSolicitudProducto,
            as: "solicitudesProductos",
            where: { id_detalle_orden_reposicion: null },
            attributes: [
              [
                sequelize.fn(
                  "sum",
                  sequelize.col("solicitudesProductos.cantidad")
                ),
                "cantidad",
              ],
              [
                sequelize.fn(
                  "GROUP_CONCAT",
                  sequelize.col("`solicitudesProductos`.`id`")
                ),
                "ids",
              ],
            ],
            include: [
              {
                model: Producto,
                as: "productoSolicitado",
                required: true,
                include: [
                  { model: Clase, as: "tipoProducto" },
                  { model: Clase, as: "grupo", where: condicionGrupo },
                  { model: Clase, as: "subgrupo" },
                ],
              },
              /* {
                        model: DetalleSolicitudProductoBase, as: 'detallesIngredientesProducto',
                        include: [{
                            model: Producto, as: 'productoSolicitudBase',
                            include: [{ model: Inventario, as: 'inventarios', required: false },
                            { model: Clase, as: 'grupo' },
                            { model: Clase, as: 'subgrupo' }]
                        }]
                    } */
            ],
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
        group: ["solicitudesProductos.producto"],
      })
        .then(function (solicitudes) {
          res.json({ error: false, solicitudes: solicitudes });
        })
        .catch(function (err) {
          res.json({ error: true, mensaje: err.stack });
        });
      // SolicitudReposicion.findAll({
      //     where: condicionAlmacen,
      //     include: [{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] },
      //     {
      //         model: DetalleSolicitudProducto, as: 'solicitudesProductos',
      //         // include: [{
      //         //     model: Producto, as: 'productoSolicitado', required: false, include: [{ model: Clase, as: 'tipoProducto' }, {
      //         //         model: Inventario, as: 'inventarios',
      //         //         where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } }
      //         //     }, { model: Clase, as: 'grupo', where: condicionGrupo }, { model: Clase, as: 'subgrupo' }]
      //         // },]
      //         // {
      //         //     model: DetalleSolicitudProductoBase, as: 'detallesIngredientesProducto', include: [{
      //         //         model: Producto, as: 'productoSolicitudBase', include: [{
      //         //             model: Inventario, as: 'inventarios', required: false,
      //         //             where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } }
      //         //         }, { model: Clase, as: 'grupo' }, { model: Clase, as: 'subgrupo' }]
      //         //     }]
      //         // }]
      //     },
      //     { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }
      // ]//, { model: Clase, as: 'movimiento' }]

      // }).then(function (solicitudes) {
      //     res.json({ solicitudes: solicitudes })
      // }).catch(function (err) {
      //     res.json({ mensaje: err.stack })
      // });
    });
  router
    .route("/operaciones-pedidos/almacen/:id_almacen/grupo/:id_grupo")
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionProducto = {};
      if (req.params.id_grupo != "0") {
        condicionProducto = { id_grupo: req.params.id_grupo };
      }
      var datosbusqueda = {
        include: [
          {
            model: GestionDetalleOrdenReposicion,
            as: "detallesOrdenReposicion",
            where: { id_detalle_pedido: null, eliminado: false },
            include: [
              { model: Producto, as: "producto", where: condicionProducto },
              {
                model: DetalleSolicitudProducto,
                as: "detallesSolicitudProductos",
              },
            ],
          },
          {
            model: Clase,
            as: "estado",
            required: true,
            where: { nombre_corto: "FINALIZADO" },
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
          {
            model: Almacen,
            as: "almacen",
            where: { id: req.params.id_almacen },
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                where: { activo: true },
                required: true,
              },
            ],
          },
        ],
      };
      GestionOrdenReposicion.findAll(datosbusqueda).then(function (
        ordenesReposicion
      ) {
        res.json({ ordenesReposicion: ordenesReposicion });
      });
    });
  router
    .route("/operaciones-reposicion/orden_repo/:id_orden_repo/tipo/:tipo")
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionDetalle = { id_orden_reposicion: req.params.id_orden_repo };
      /*  if (req.params.tipo != 0) {
                 condicionDetalle.observado = true
             } */
      GestionDetalleOrdenReposicion.findAll({
        where: condicionDetalle,
        include: [
          {
            model: Producto,
            as: "producto",
            include: [{ model: Clase, as: "tipoProducto" }],
          },
          { model: DetalleSolicitudProducto, as: "detallesSolicitudProductos" },
          {
            model: DetalleSolicitudProductoBase,
            as: "detallesSolicitudProductosBase",
          },
        ],

        order: [[{ model: Producto, as: "producto" }, "codigo"]],
      }).then(function (detalleOrdenRepo) {
        GestionOrdenReposicion.find({
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [
                {
                  model: Sucursal,
                  as: "sucursal",
                  where: { activo: true },
                  required: true,
                },
              ],
            },
          ],
          where: { id: req.params.id_orden_repo },
        }).then(function (orden) {
          res.json({
            tamaño: detalleOrdenRepo.length,
            detalles: detalleOrdenRepo,
            ordenReposicion: orden,
          });
        });
      });
    });
  router
    .route(
      "/operaciones-reposicion/orden_repo/producto/:id_producto/almacen/:id_almacen/limit/:limit"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let query =
          "SELECT\
      id,\
      sum( cantidad ) AS `cantidad`,\
      count( id ) AS `contador_registros`,\
      GROUP_CONCAT( orden_reposicion  ) AS `ids` \
    FROM (SELECT\
      `agil_gestion_detalle_orden_reposicion`.`id`,\
      `agil_gestion_detalle_orden_reposicion`.`cantidad` as cantidad,\
      `agil_gestion_detalle_orden_reposicion`.`orden_reposicion` as orden_reposicion\
    FROM\
      `agil_gestion_detalle_orden_reposicion` AS `agil_gestion_detalle_orden_reposicion`\
      LEFT OUTER JOIN `agil_producto` AS `producto` ON `agil_gestion_detalle_orden_reposicion`.`producto` = `producto`.`id`\
      INNER JOIN `agil_gestion_orden_reposicion` AS `ordenReposicion` ON `agil_gestion_detalle_orden_reposicion`.`orden_reposicion` = `ordenReposicion`.`id` \
      AND `ordenReposicion`.`almacen` = " +
          req.params.id_almacen +
          "\
      LEFT OUTER JOIN `agil_almacen` AS `ordenReposicion.almacen` ON `ordenReposicion`.`almacen` = `ordenReposicion.almacen`.`id`\
      INNER JOIN `agil_sucursal` AS `ordenReposicion.almacen.sucursal` ON `ordenReposicion.almacen`.`sucursal` = `ordenReposicion.almacen.sucursal`.`id` \
      AND `ordenReposicion.almacen.sucursal`.`activo` = TRUE \
    WHERE \
      `agil_gestion_detalle_orden_reposicion`.`producto` = " +
          req.params.id_producto +
          " \
    ORDER BY \
      `agil_gestion_detalle_orden_reposicion`.`id` DESC \
      LIMIT " +
          req.params.limit +
          ") t;";
        let registros = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT,
        });
        let registrosFijo = await GestionDetalleOrdenReposicion.findAll({
          where: { id_producto: req.params.id_producto },
          include: [
            {
              model: GestionOrdenReposicion,
              as: "ordenReposicion",
              where: { id_almacen: req.params.id_almacen, maximos: true },

            },
          ],
          order: [[`orden_reposicion`, "desc"]],
          limit: 1
        });
        let registroFijo = registrosFijo.length > 0 ? registrosFijo[0] : null
        res.json({ registro: registros[0], registroFijo: registroFijo });
      } catch (error) {
        console.error(error);
      }
    });
  router
    .route("/operaciones-datos-solictud/:id_solicitud/alm/:id_almacen")
    .get(ensureAuthorizedlogged, function (req, res) {
      SolicitudReposicion.find({
        where: { id: req.params.id_solicitud },
        include: [
          { model: Clase, as: "estado" },
          { model: Clase, as: "area", required: false },
          { model: Clase, as: "campo", required: false },
          {
            model: Almacen,
            as: "almacen",
            include: [
              { model: ContabilidadCuenta, as: "cuenta" },
              {
                model: Sucursal,
                as: "sucursal",
                where: { activo: true },
                required: true,
              },
            ],
          },
          { model: ConfiguracionIso, as: "configuracionesIso" },
          {
            model: DetalleSolicitudProducto,
            as: "solicitudesProductos",
            include: [
              {
                model: Producto,
                as: "productoSolicitado",
                include: [
                  {
                    model: Inventario,
                    as: "inventarios",
                    required: false,
                    where: {
                      id_almacen: req.params.id_almacen,
                      cantidad: { $gte: 0 },
                    },
                  },
                  { model: Clase, as: "grupo" },
                  { model: Clase, as: "subgrupo" },
                ],
              },
              {
                model: DetalleSolicitudProductoBase,
                as: "detallesIngredientesProducto",
                include: [
                  {
                    model: Producto,
                    as: "productoSolicitudBase",
                    include: [
                      { model: Clase, as: "grupo" },
                      { model: Clase, as: "subgrupo" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
      }).then(function (solicitud) {
        res.json({ solicitud: solicitud });
      });
    });
  router
    .route("/operaciones-datos-detalle-solictud/:id_solicitud")
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let detallesm = await DetalleMovimiento.findAll({
          where: Sequelize.literal(
            "`producto.grupo.cuentasGrupo`.cuenta = `producto.grupo.cuentasGrupo.cuenta.camposCuenta`.cuenta \
          AND `movimiento.solicitud`.campo = `producto.grupo.cuentasGrupo.cuenta.camposCuenta`.campo"
          ),
          attributes: [
            [sequelize.fn("sum", sequelize.col("total")), "total"],
            [
              sequelize.fn(
                "GROUP_CONCAT",
                sequelize.fn(
                  "DISTINCT",
                  sequelize.col("`inv_detalle_movimiento`.`id`")
                )
              ),
              "ids",
            ],
          ],
          include: [
            {
              model: Movimiento,
              as: "movimiento",
              include: [
                {
                  model: SolicitudReposicion,
                  as: "solicitud",
                  where: { id: { $in: req.params.id_solicitud.split(",") } },
                },
              ],
            },
            {
              model: Producto,
              as: "producto",
              include: [
                {
                  model: Clase,
                  as: "grupo",
                  include: [
                    {
                      model: ContabilidadCuentaGrupo,
                      as: "cuentasGrupo",
                      include: [
                        {
                          model: ContabilidadCuenta,
                          as: "cuenta",
                          include: [
                            {
                              model: ContabilidadCuentaCampo,
                              as: "camposCuenta",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { model: Clase, as: "subgrupo" },
              ],
            },
          ],
          group: ["`producto`.`grupo`", "`movimiento.solicitud`.`campo`"],
        });
        let movimientos = await Movimiento.findAll({
          attributes: ["id"],
          include: [
            {
              model: DetalleMovimiento,
              as: "detallesMovimiento",
              attributes: [
                [sequelize.fn("sum", sequelize.col("total")), "total"],
                [
                  sequelize.fn(
                    "GROUP_CONCAT",
                    sequelize.fn(
                      "DISTINCT",
                      sequelize.col("`detallesMovimiento`.`id`")
                    )
                  ),
                  "ids",
                ],
              ],
              include: [
                {
                  model: Producto,
                  as: "producto",
                  include: [
                    {
                      model: Clase,
                      as: "grupo",
                      include: [
                        {
                          model: ContabilidadCuentaGrupo,
                          as: "cuentasGrupo",
                          include: [
                            {
                              model: ContabilidadCuenta,
                              as: "cuenta",
                              include: [
                                {
                                  model: ContabilidadCuentaCampo,
                                  as: "camposCuenta",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { model: Clase, as: "subgrupo" },
                  ],
                },
              ],
            },
            {
              model: SolicitudReposicion,
              as: "solicitud",
              where: { id: { $in: req.params.id_solicitud.split(",") } },
            },
          ],
          group: ["`detallesMovimiento.producto.grupo`"],
        });
        let detalles = [];
        for (const mov of movimientos) {
          detalles = detalles.concat(...mov.detallesMovimiento);
        }
        res.json(detallesm);
      } catch (error) {
        res.json({ mensaje: error.stack ? error.stack : error });
      }
    });
  router
    .route("/operaciones-datos-solictud/valuado/:id_solicitud")
    .get(ensureAuthorizedlogged, function (req, res) {
      SolicitudReposicion.find({
        where: { id: req.params.id_solicitud },
        include: [
          { model: Clase, as: "estado" },
          { model: Clase, as: "area", required: false },
          { model: Clase, as: "campo", required: false },
          {
            model: Almacen,
            as: "almacen",
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                where: { activo: true },
                required: true,
              },
            ],
          },
          {
            model: Movimiento,
            as: "movimiento",
            include: [
              {
                model: DetalleMovimiento,
                as: "detallesMovimiento",
                include: [{ model: Producto, as: "producto" }],
              },
            ],
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
      }).then(function (solicitud) {
        res.json({ solicitud: solicitud });
      });
    });
  router
    .route(
      "/operaciones/empresa/:id_empresa/vintage/:id_usuario/nro_almacen/:nro_almacen/capo/:rol/desde/:desde/hasta/:hasta/suc/:sucursal/alm/:almacen/mov/:movimiento/est/:estado/val/:valuado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/usuario/:usuario"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionSuc = { id_empresa: req.params.id_empresa, activo: true };
      var condicion = {};
      var condicionSucursal = {};
      var condicionAlmac = "";
      var condicionUsuario = {};
      var condicionPersona = {};
      ordenArreglo = [];
      var desde = false;
      var hasta = false;
      if (req.params.desde != "0") {
        var inicio = new Date(req.params.desde);
        inicio.setHours(0, 0, 0, 0);
        desde = true;
      }
      if (req.params.hasta != "0") {
        var fin = new Date(req.params.hasta);
        fin.setHours(23, 59, 59, 59);
        hasta = true;
      }

      if (req.params.sucursal != "0") {
        condicionSuc.id = req.params.sucursal;
      }

      if (req.params.almacen != "0") {
        condicion.almacen = parseInt(req.params.almacen);
      }
      // if (req.params.movimiento != "0") {
      //     condicion.movimiento = parseInt(req.params.movimiento)
      // }
      if (req.params.estado != "0") {
        // condicion.id_estado = req.params.estado
        if (req.params.estado == 1) {
          condicion.eliminado = false;
          condicion.activo = true;
        } else {
          condicion.eliminado = false;
          condicion.activo = false;
        }
      }

      if (req.params.usuario != "0") {
        condicionPersona = {
          $or: [
            {
              nombre_completo: {
                $like: "%" + req.params.usuario + "%",
              },
            },
          ],
        };
      }
      if (req.params.nro_almacen != "0") {
        condicionAlmac = Sequelize.literal(
          "`almacen`.`numero` = " + req.params.nro_almacen
        );
      }
      if (req.params.busqueda != "0") {
        condicion = {
          $or: [
            {
              descripcion: {
                $like: "%" + req.params.busqueda + "%",
              },
            },
          ],
        };
      }
      if (desde && hasta) {
        condicion.fecha = { $between: [inicio, fin] };
      } else if (desde && !hasta) {
        condicion.fecha = {
          $gte: [inicio],
        };
      } else if (!desde && hasta) {
        condicion.fecha = {
          $lte: [fin],
        };
      } else if (!desde && !hasta) {
        // var hoy = new Date()
        // condicion.fecha = {
        // }
        if (req.params.items_pagina == "0") {
          req.params.items_pagina = 100;
        }
      }
      if (req.params.valuado != "0") {
        condicion.valuado = req.params.valuado;
      }

      if (req.params.rol === "ADMINISTRADOR") {
        //:desde/:hasta/:sucursal/:almacen/:movimimento/:estado/:valuado
        // condicion.eliminado = false
        if (req.params.items_pagina !== "0") {
          SolicitudReposicion.count({
            distinct: true,
            where: condicion,
            include: [
              { model: Clase, as: "estado" },
              {
                model: Almacen,
                as: "almacen",
                where: condicionAlmac,
                include: [
                  { model: Sucursal, as: "sucursal", where: condicionSuc },
                ],
              },
              {
                model: Usuario,
                as: "usuario",
                include: [
                  { model: Persona, as: "persona", where: condicionPersona },
                ],
              },
            ], //, { model: Clase, as: 'movimiento' }]
          })
            .then(function (data) {
              var textOrder = "`inv_solicitud_reposicion`.fecha desc ";
              textOrder =
                textOrder +
                " limit " +
                req.params.items_pagina * (req.params.pagina - 1) +
                ", " +
                req.params.items_pagina;
              SolicitudReposicion.findAll({
                where: condicion,
                include: [
                  { model: Clase, as: "estado" },
                  { model: ConfiguracionIso, as: "configuracionesIso" },
                  {
                    model: Almacen,
                    as: "almacen",
                    where: condicionAlmac,
                    include: [
                      { model: ContabilidadCuenta, as: "cuenta" },
                      { model: Sucursal, as: "sucursal", where: condicionSuc },
                    ],
                  },
                  {
                    model: Usuario,
                    as: "usuario",
                    include: [
                      {
                        model: Persona,
                        as: "persona",
                        where: condicionPersona,
                      },
                    ],
                  },
                  {
                    model: Usuario,
                    as: "cierre_usuario",
                    required: false,
                    include: [
                      {
                        model: Persona,
                        as: "persona",
                        required: false,
                        where: condicionPersona,
                      },
                    ],
                  },
                ], //, { model: Clase, as: 'movimiento' }]
                order: sequelize.literal(textOrder),
                group: ["inv_solicitud_reposicion`.id"],
              })
                .then(function (solicitudes) {
                  res.json({
                    solicitudes: solicitudes,
                    paginas: Math.ceil(data / req.params.items_pagina),
                  });
                })
                .catch(function (err) {
                  res.json({ mensaje: err.stack });
                });
            })
            .catch(function (err) {
              res.json({ mensaje: err.stack });
            });
        } else {
          SolicitudReposicion.count({
            distinct: true,
            where: condicion,
            include: [
              { model: Clase, as: "estado" },
              {
                model: Almacen,
                as: "almacen",
                where: condicionAlmac,
                include: [
                  { model: Sucursal, as: "sucursal", where: condicionSuc },
                ],
              },
              {
                model: DetalleSolicitudProducto,
                as: "solicitudesProductos",
                include: [
                  {
                    model: Producto,
                    as: "productoSolicitado",
                    include: [
                      { model: Clase, as: "grupo" },
                      { model: Clase, as: "subgrupo" },
                    ],
                  },
                  {
                    model: DetalleSolicitudProductoBase,
                    as: "detallesIngredientesProducto",
                    include: [
                      {
                        model: Producto,
                        as: "productoSolicitudBase",
                        include: [
                          { model: Clase, as: "grupo" },
                          { model: Clase, as: "subgrupo" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                model: Usuario,
                as: "usuario",
                include: [
                  { model: Persona, as: "persona", where: condicionPersona },
                ],
              },
            ], //, { model: Clase, as: 'movimiento' }]
          })
            .then(function (data) {
              SolicitudReposicion.findAll({
                where: condicion,
                include: [
                  { model: Clase, as: "estado" },
                  { model: ConfiguracionIso, as: "configuracionesIso" },
                  {
                    model: Almacen,
                    as: "almacen",
                    where: condicionAlmac,
                    include: [
                      { model: ContabilidadCuenta, as: "cuenta" },
                      { model: Sucursal, as: "sucursal", where: condicionSuc },
                    ],
                  },
                  {
                    model: Usuario,
                    as: "usuario",
                    include: [
                      {
                        model: Persona,
                        as: "persona",
                        where: condicionPersona,
                      },
                    ],
                  },
                ], //, { model: Clase, as: 'movimiento' }]
              })
                .then(function (solicitudes) {
                  res.json({ solicitudes: solicitudes, paginas: 1 });
                })
                .catch(function (err) {
                  res.json({ mensaje: err.stack });
                });
            })
            .catch(function (err) {
              res.json({ mensaje: err.stack });
            });
        }
      } else {
        // condicion.eliminado = false
        condicion.id_usuario = req.params.id_usuario;
        if (req.params.items_pagina !== "0") {
          SolicitudReposicion.count({
            distinct: true,
            where: condicion,
            include: [
              { model: Clase, as: "estado" },
              {
                model: Almacen,
                as: "almacen",
                where: condicionAlmac,
                include: [
                  { model: Sucursal, as: "sucursal", where: condicionSuc },
                ],
              },
              {
                model: Usuario,
                as: "usuario",
                include: [
                  { model: Persona, as: "persona", where: condicionPersona },
                ],
              },
            ], //, { model: Clase, as: 'movimiento' }]
          })
            .then(function (data) {
              SolicitudReposicion.findAll({
                offset: req.params.items_pagina * (req.params.pagina - 1),
                limit: req.params.items_pagina,
                where: condicion,
                include: [
                  { model: Clase, as: "estado" },
                  { model: ConfiguracionIso, as: "configuracionesIso" },
                  {
                    model: Almacen,
                    as: "almacen",
                    where: condicionAlmac,
                    include: [
                      { model: ContabilidadCuenta, as: "cuenta" },
                      { model: Sucursal, as: "sucursal", where: condicionSuc },
                    ],
                  },
                  {
                    model: Usuario,
                    as: "usuario",
                    include: [
                      {
                        model: Persona,
                        as: "persona",
                        where: condicionPersona,
                      },
                    ],
                  },
                ], //, { model: Clase, as: 'movimiento' }],
                order: [["fecha", "desc"]],
              })
                .then(function (solicitudes) {
                  res.json({
                    solicitudes: solicitudes,
                    paginas: Math.ceil(data / req.params.items_pagina),
                  });
                })
                .catch(function (err) {
                  res.json({ solicitudes: [], mensaje: err.stack });
                });
            })
            .catch(function (err) {
              res.json({ mensaje: err.stack });
            });
        } else {
          SolicitudReposicion.count({
            distinct: true,
            where: condicion,
            include: [
              { model: Clase, as: "estado" },
              {
                model: Almacen,
                as: "almacen",
                where: condicionAlmac,
                include: [
                  { model: Sucursal, as: "sucursal", where: condicionSuc },
                ],
              },
              {
                model: Usuario,
                as: "usuario",
                include: [
                  { model: Persona, as: "persona", where: condicionPersona },
                ],
              },
            ], //, { model: Clase, as: 'movimiento' }]
          })
            .then(function (data) {
              SolicitudReposicion.findAll({
                where: condicion,
                include: [
                  { model: Clase, as: "estado" },
                  { model: ConfiguracionIso, as: "configuracionesIso" },
                  {
                    model: Almacen,
                    as: "almacen",
                    where: condicionAlmac,
                    include: [
                      { model: ContabilidadCuenta, as: "cuenta" },
                      { model: Sucursal, as: "sucursal", where: condicionSuc },
                    ],
                  },
                  {
                    model: Usuario,
                    as: "usuario",
                    include: [
                      {
                        model: Persona,
                        as: "persona",
                        where: condicionPersona,
                      },
                    ],
                  },
                ], //, { model: Clase, as: 'movimiento' }],
                order: [["fecha", "desc"]],
              })
                .then(function (solicitudes) {
                  res.json({ solicitudes: solicitudes, paginas: 1 });
                })
                .catch(function (err) {
                  res.json({ solicitudes: [], mensaje: err.stack });
                });
            })
            .catch(function (err) {
              res.json({ mensaje: err.stack });
            });
        }
      }
    });
  router
    .route("/almacen/solicitud/:id")
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicion = { id: req.params.id };
      SolicitudReposicion.find({
        where: condicion,
        include: [
          { model: Clase, as: "estado" },
          {
            model: Almacen,
            as: "almacen",
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                where: { activo: true },
                required: true,
              },
            ],
          },
          {
            model: DetalleSolicitudProducto,
            as: "solicitudesProductos",
            include: [
              {
                model: Producto,
                as: "productoSolicitado",
                include: [
                  {
                    model: Inventario,
                    as: "inventarios",
                    required: false,
                    where: Sequelize.literal(
                      "`solicitudesProductos.productoSolicitado.inventarios`.`almacen` = `almacen.id`"
                    ),
                  },
                  { model: Clase, as: "grupo" },
                  { model: Clase, as: "subgrupo" },
                ],
              },
              {
                model: DetalleSolicitudProductoBase,
                as: "detallesIngredientesProducto",
                include: [
                  {
                    model: Producto,
                    as: "productoSolicitudBase",
                    include: [
                      {
                        model: Inventario,
                        as: "inventarios",
                        required: false,
                        where: Sequelize.literal(
                          "`solicitudesProductos.productoSolicitado.inventarios`.`almacen` = `almacen.id`"
                        ),
                      },
                      { model: Clase, as: "grupo" },
                      { model: Clase, as: "subgrupo" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ], //, { model: Clase, as: 'movimiento' }]
      })
        .then(function (solicitud) {
          res.json({ solicitud: solicitud });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack });
        });
    });

  function crearDetalleSolicitudProductoBase(ingrediente, t, detalleCreado) {
    if (ingrediente.eliminado) {
      return new Promise(function (fulfill, reject) {
        fulfill("Ingrediente eliminado");
      });
    } else {
      return DetalleSolicitudProductoBase.create(
        {
          id_detalle_solicitud_producto: detalleCreado.id,
          id_producto_base: ingrediente.id_producto_base,
          cantidad_ideal: ingrediente.cantidad_ideal,
          cantidad_real: ingrediente.cantidad_real,
          total: ingrediente.total,
        },
        { transaction: t }
      )
        .then(function (detalleBaseCreado) {
          return new Promise(function (fulfill, reject) {
            return fulfill("detalleBaseCreado");
          });
        })
        .catch(function (err) {
          return new Promise(function (fulfill, reject) {
            return reject(err.stack !== undefined ? err.stack : err);
          });
        });
    }
  }

  function crearDetalleSolicitudProducto(producto, solicitudCreada, t) {
    if (producto.eliminado) {
      return new Promise(function (fulfill, reject) {
        fulfill("Producto eliminado.");
      });
    } else {
      return DetalleSolicitudProducto.create(
        {
          id_solicitud: solicitudCreada.id,
          id_producto: producto.productoSolicitado.id,
          cantidad: producto.cantidad,
        },
        { transaction: t }
      )
        .then(function (detalleCreado) {
          var detallesProductoBase = [];
          if (producto.detallesIngredientesProducto.length > 0) {
            for (
              let i = 0;
              i < producto.detallesIngredientesProducto.length;
              i++
            ) {
              detallesProductoBase.push(
                crearDetalleSolicitudProductoBase(
                  producto.detallesIngredientesProducto[i],
                  t,
                  detalleCreado
                )
              );
            }
          } else {
            detallesProductoBase.push(
              new Promise(function (fulfill, reject) {
                fulfill("Empty object");
              })
            );
          }
          Promise.all(detallesProductoBase);
        })
        .catch(function (err) {
          new Promise(function (fulfill, reject) {
            reject(err.stack !== undefined ? err.stack : err);
          });
        });
    }
  }
  router
    .route("/solicitud-eliminar/almacen/:id")
    .post(ensureAuthorizedlogged, function (req, res) {
      SolicitudReposicion.update(
        {
          eliminado: true,
        },
        { where: { id: req.params.id } }
      ).then(function (sol) {
        res.json({ mensaje: "eliminado satisfactoriamente!" });
      });
    });
  router
    .route("/solicitud/empresa/:id_empresa")

    .post(ensureAuthorizedlogged, function (req, res) {
      Sucursal.find({
        where: { id: req.body.almacen.id_sucursal },
      })
        .then(function (sucursalEncontrada) {
          if (!sucursalEncontrada.activo)
            return res.json({
              mensaje: "Sucursal deshabilitada, no se pueden realizar cambios",
              hasErr: true,
            });
          if (req.body.id) {
            sequelize
              .transaction(
                {
                  isolationLevel:
                    Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
                },
                function (t) {
                  return SolicitudReposicion.update(
                    {
                      id_almacen: req.body.almacen.id,
                      id_movimiento: req.body.id_movimiento,
                      fecha: req.body.fecha,
                      id_usuario: req.body.id_usuario,
                      activo: req.body.activo,
                      monto: req.body.monto,
                      comensales: req.body.comensales,
                      eliminado: req.body.eliminado,
                      id_area: req.body.area ? req.body.area.id : null,
                      id_campo: req.body.campo ? req.body.campo.id : null,
                      descripcion: req.body.descripcion,
                    },
                    {
                      where: { id: req.body.id },
                      transaction: t,
                    }
                  )
                    .then(function (sol) {
                      return DetalleSolicitudProducto.destroy({
                        where: { id_solicitud: req.body.id },
                        transaction: t,
                      })
                        .then(function (result) {
                          var promises = [];
                          for (
                            let i = 0;
                            i < req.body.solicitudesProductos.length;
                            i++
                          ) {
                            promises.push(
                              crearDetalleSolicitudProducto(
                                req.body.solicitudesProductos[i],
                                req.body,
                                t
                              )
                            );
                          }
                          return Promise.all(promises).then(function (data) {
                            return new Promise(function (fulfill, reject) {
                              fulfill("Solicitud actualizada.");
                            });
                          });
                        })
                        .catch(function (err) {
                          return new Promise(function (fulfill, reject) {
                            reject(err.stack !== undefined ? err.stack : err);
                          });
                        });
                    })
                    .catch(function (err) {
                      return new Promise(function (fulfill, reject) {
                        reject(err.stack !== undefined ? err.stack : err);
                      });
                    });
                }
              )
              .then(function (transaccionActualizada) {
                if (transaccionActualizada !== undefined) {
                  res.json({ mensaje: transaccionActualizada });
                } else {
                  throw new Error(
                    "Se produjo un error, contacte con servicio técnico."
                  );
                }
              })
              .catch(function (err) {
                return new Promise(function (fulfill, reject) {
                  reject(err.stack !== undefined ? err.stack : err);
                });
              });
          } else {
            if (req.body.almacen && req.body.usar_configuracion_iso) {
              var objeto = { solicitud: {} };
              sequelize
                .transaction(
                  {
                    isolationLevel:
                      Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
                  },
                  function (t) {
                    return Sucursal.find({
                      where: { id: req.body.almacen.id_sucursal },
                      transaction: t,
                    })
                      .then(function (sucursalEncontrada) {
                        return Almacen.find({
                          where: { id: req.body.almacen.id },
                          transaction: t,
                        })
                          .then(function (almacenObtenido) {
                            return SolicitudReposicion.create(
                              {
                                id_almacen: req.body.almacen.id,
                                // id_movimiento: movimientoEgresoCreado.id,
                                fecha: req.body.fecha,
                                id_usuario: req.body.id_usuario,
                                activo: req.body.activo,
                                monto: 0,
                                numero_correlativo:
                                  sucursalEncontrada.numero_correlativo_solicitud_almacen,
                                id_estado: req.body.estado.id,
                                comensales: req.body.comensales,
                                id_area:
                                  (req.body.area && req.body.area.id) || null,
                                numero_iso_consumo: req.body.config_doc_iso
                                  ? almacenObtenido.numero_correlativo_iso_consumo
                                    ? almacenObtenido.numero_correlativo_iso_consumo
                                    : null
                                  : null,
                                descripcion: req.body.descripcion,
                                config_doc_iso: req.body.config_doc_iso
                                  ? req.body.config_doc_iso
                                  : null,
                                id_campo: req.body.campo
                                  ? req.body.campo.id
                                  : null,
                              },
                              { transaction: t }
                            )
                              .then(function (solicitudCreada) {
                                objeto.solicitud = solicitudCreada;
                                return Sucursal.update(
                                  {
                                    numero_correlativo_solicitud_almacen:
                                      sucursalEncontrada.numero_correlativo_solicitud_almacen +
                                      1,
                                  },
                                  {
                                    where: { id: req.body.almacen.id_sucursal },
                                    transaction: t,
                                  }
                                )
                                  .then(function (sucursalActualizada) {
                                    return Almacen.update(
                                      {
                                        numero_correlativo_iso_consumo:
                                          req.body.config_doc_iso != undefined
                                            ? almacenObtenido.numero_correlativo_iso_consumo +
                                            1
                                            : almacenObtenido.numero_correlativo_iso_consumo,
                                      },
                                      {
                                        where: { id: req.body.almacen.id },
                                        transaction: t,
                                      }
                                    )
                                      .then(function (dataAlmacen) {
                                        var aceptado = false;
                                        var done = false;
                                        var detallesSolicitud = [];
                                        for (
                                          let i = 0;
                                          i <
                                          req.body.solicitudesProductos.length;
                                          i++
                                        ) {
                                          detallesSolicitud.push(
                                            crearDetalleSolicitudProducto(
                                              req.body.solicitudesProductos[i],
                                              solicitudCreada,
                                              t
                                            )
                                          );
                                        }
                                        return Promise.all(
                                          detallesSolicitud
                                        ).then(function (donePromises) {
                                          return new Promise(function (
                                            fulfill,
                                            reject
                                          ) {
                                            fulfill(
                                              "Solicitud creada, para actualizar el inventario confirme la entrega."
                                            );
                                          });
                                        });
                                      })
                                      .catch(function (err) {
                                        return new Promise(function (
                                          fulfill,
                                          reject
                                        ) {
                                          reject(
                                            err.stack !== undefined
                                              ? err.stack
                                              : err
                                          );
                                        });
                                      });
                                  })
                                  .catch(function (err) {
                                    return new Promise(function (
                                      fulfill,
                                      reject
                                    ) {
                                      reject(
                                        err.stack !== undefined
                                          ? err.stack
                                          : err
                                      );
                                    });
                                  });
                              })
                              .catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                  reject(
                                    err.stack !== undefined ? err.stack : err
                                  );
                                });
                              });
                          })
                          .catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                              reject(err.stack !== undefined ? err.stack : err);
                            });
                          });
                      })
                      .catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                          reject(err.stack !== undefined ? err.stack : err);
                        });
                      });
                  }
                )
                .then(function (result) {
                  if (result) {
                    res.json({ solicitud: objeto.solicitud, mensaje: result });
                  } else {
                    throw new Error(
                      "Parece que hubo un error pero no capturó correctamente. Por favor revise que se guardaron los datos de la acción que acaba de realizar, si no es así, por favor vuelva a intentarlo o contacte a servicio técnico."
                    );
                  }
                })
                .catch(function (err) {
                  res.json({
                    solicitud: objeto.solicitud,
                    mensaje: err.stack !== undefined ? err.stack : err,
                    hasErr: true,
                  });
                });
            } else {
              var objeto = { solicitud: {} };
              sequelize
                .transaction(
                  {
                    isolationLevel:
                      Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
                  },
                  function (t) {
                    return Sucursal.find({
                      where: { id: req.body.almacen.id_sucursal },
                      transaction: t,
                    })
                      .then(function (sucursalEncontrada) {
                        return SolicitudReposicion.create(
                          {
                            id_almacen: req.body.almacen.id,
                            // id_movimiento: movimientoEgresoCreado.id,
                            fecha: req.body.fecha,
                            id_usuario: req.body.id_usuario,
                            activo: req.body.activo,
                            monto: 0,
                            numero_correlativo:
                              sucursalEncontrada.numero_correlativo_solicitud_almacen,
                            id_estado: req.body.estado.id,
                            comensales: req.body.comensales,
                            id_area: req.body.area ? req.body.area.id : null,
                            id_campo: req.body.campo ? req.body.campo.id : null,
                            descripcion: req.body.descripcion,
                          },
                          { transaction: t }
                        )
                          .then(function (solicitudCreada) {
                            objeto.solicitud = solicitudCreada;
                            return Sucursal.update(
                              {
                                numero_correlativo_solicitud_almacen:
                                  sucursalEncontrada.numero_correlativo_solicitud_almacen +
                                  1,
                              },
                              {
                                where: { id: req.body.almacen.id_sucursal },
                                transaction: t,
                              }
                            )
                              .then(function (sucursalActualizada) {
                                var aceptado = false;
                                var done = false;
                                var detallesSolicitud = [];
                                for (
                                  let i = 0;
                                  i < req.body.solicitudesProductos.length;
                                  i++
                                ) {
                                  detallesSolicitud.push(
                                    crearDetalleSolicitudProducto(
                                      req.body.solicitudesProductos[i],
                                      solicitudCreada,
                                      t
                                    )
                                  );
                                }
                                return Promise.all(detallesSolicitud).then(
                                  function (donePromises) {
                                    return new Promise(function (
                                      fulfill,
                                      reject
                                    ) {
                                      fulfill(
                                        "Solicitud creada, para actualizar el inventario confirme la entrega."
                                      );
                                    });
                                  }
                                );
                              })
                              .catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                  reject(
                                    err.stack !== undefined ? err.stack : err
                                  );
                                });
                              });
                          })
                          .catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                              reject(err.stack !== undefined ? err.stack : err);
                            });
                          });
                      })
                      .catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                          reject(err.stack !== undefined ? err.stack : err);
                        });
                      });
                  }
                )
                .then(function (result) {
                  if (result) {
                    res.json({ solicitud: objeto.solicitud, mensaje: result });
                  } else {
                    throw new Error(
                      "Parece que hubo un error pero no capturó correctamente. Por favor revise que se guardaron los datos de la acción que acaba de realizar, si no es así, por favor vuelva a intentarlo o contacte a servicio técnico."
                    );
                  }
                })
                .catch(function (err) {
                  res.json({
                    solicitud: objeto.solicitud,
                    mensaje: err.stack !== undefined ? err.stack : err,
                    hasErr: true,
                  });
                });
            }
          }
        })
        .catch((err) => {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
          });
        });
    });

  function crearDetalleMovimientoIngresoYActualizarInventario(
    movimiento,
    detalleMovimiento,
    t
  ) {
    return DetalleMovimiento.create(
      {
        id_movimiento: movimiento.id,
        id_producto: detalleMovimiento.id_producto,
        costo_unitario: detalleMovimiento.costo_unitario,
        cantidad: detalleMovimiento.cantidad,
        importe: detalleMovimiento.costo_unitario * detalleMovimiento.cantidad,
        descuento: detalleMovimiento.descuento,
        recargo: detalleMovimiento.recargo,
        ice: detalleMovimiento.ice,
        excento: detalleMovimiento.excento,
        tipo_descuento: detalleMovimiento.tipo_descuento,
        tipo_recargo: detalleMovimiento.tipo_recargo,
        total: detalleMovimiento.total,
        id_inventario: detalleMovimiento.id_inventario,
      },
      { transaction: t }
    ).then(function (detalleMovimientoCreado) {
      sequelize
        .transaction(
          {
            isolationLevel:
              Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
          },
          function (tu) {
            return Inventario.find({
              where: {
                id: detalleMovimiento.id_inventario,
              },
              transaction: tu,
              lock: tu.LOCK.UPDATE,
            }).then(function (inventarioEncontrado) {
              return Inventario.update(
                {
                  cantidad:
                    inventarioEncontrado.cantidad +
                    detalleMovimientoCreado.cantidad,
                  costo_total:
                    inventarioEncontrado.costo_unitario *
                    (inventarioEncontrado.cantidad +
                      detalleMovimientoCreado.cantidad),
                },
                {
                  where: {
                    id: detalleMovimiento.id_inventario,
                  },
                  transaction: tu,
                }
              );
            });
          }
        )
        .then(function (result) {
          return new Promise(function (fulfill, reject) {
            fulfill({});
          });
        })
        .catch(function (err) {
          return new Promise(function (fulfill, reject) {
            reject(err);
          });
        });
    });
  }

  router
    .route("/productos-operaciones/empresa/:id_empresa/cerrar")
    .post(ensureAuthorizedlogged, function (req, res) {
      req.body.totalGeneral = 0;
      Almacen.find({
        where: {
          id: req.body.almacen.id,
        },
        include: [
          {
            model: Sucursal,
            as: "sucursal",
          },
        ],
      }).then((alm) => {
        if (!alm.sucursal.activo)
          return res.json({
            mensaje: "Sucursal deshabilitada, no se pueden hacer cambios.",
            hasErr: true,
          });
        var Mypromise = [];
        var trans = sequelize
          .transaction(
            {
              isolationLevel:
                Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
            },
            function (t) {
              return Tipo.find({
                where: { nombre_corto: Diccionario.MOV_EGRE },
                transaction: t,
              })
                .then(function (tipoMovimiento) {
                  return Clase.find({
                    where: {
                      nombre_corto: Diccionario.EGRE_CONSUMO,
                      id_tipo: tipoMovimiento.id,
                    },
                    transaction: t,
                  })
                    .then(function (conceptoMovimiento) {
                      return Movimiento.create(
                        {
                          id_tipo: tipoMovimiento.id,
                          id_clase: conceptoMovimiento.id,
                          id_almacen: req.body.almacen.id,
                          fecha: req.body.fecha,
                        },
                        { transaction: t }
                      )
                        .then(function (movimientoEgresoCreado) {
                          return SolicitudReposicion.update(
                            {
                              id_movimiento: movimientoEgresoCreado.id,
                              activo: false,
                              fecha_cierre: new Date(),
                              id_cierre_usuario: req.body.id_cierre_usuario
                                ? req.body.id_cierre_usuario
                                : null,
                            },
                            {
                              where: { id: req.body.id },
                              transaction: t,
                            }
                          )
                            .then(function (solicitudActualizada) {
                              for (
                                let index = 0;
                                index <
                                req.body.listaProductosSolicitados.productos
                                  .length;
                                index++
                              ) {
                                Mypromise.push(
                                  calcularCostosEgresos(
                                    req.body.listaProductosSolicitados
                                      .productos[index],
                                    req.body.listaProductosSolicitados
                                      .productos[index].productoSolicitudBase,
                                    req.body.listaProductosSolicitados
                                      .productos[index].total,
                                    [],
                                    movimientoEgresoCreado,
                                    index,
                                    req.body.listaProductosSolicitados,
                                    res,
                                    req.body,
                                    t,
                                    req
                                  )
                                );
                              }
                              return Promise.all(Mypromise).then(function (
                                data
                              ) {
                                return new Promise(function (fulfill, reject) {
                                  fulfill(
                                    "Solicitud cerrada, inventario actualizado."
                                  );
                                });
                              });
                            })
                            .catch(function (err) {
                              return new Promise(function (fulfill, reject) {
                                reject(
                                  err.stack !== undefined ? err.stack : err
                                );
                              });
                            });
                        })
                        .catch(function (err) {
                          return new Promise(function (fulfill, reject) {
                            reject(err.stack !== undefined ? err.stack : err);
                          });
                        });
                    })
                    .catch(function (err) {
                      return new Promise(function (fulfill, reject) {
                        reject(err.stack !== undefined ? err.stack : err);
                      });
                    });
                })
                .catch(function (err) {
                  return new Promise(function (fulfill, reject) {
                    reject(err.stack !== undefined ? err.stack : err);
                  });
                });
            }
          )
          .then(async function (transaccionCreada) {
            if (transaccionCreada !== undefined) {
              SolicitudReposicion.update(
                {
                  monto: req.body.totalGeneral,
                },
                {
                  where: { id: req.body.id },
                }
              ).then(function (solicitudActualizada) {
                res.json({ mensaje: transaccionCreada });
              });
            } else {
              throw new Error(
                "Se produjo un error y no se puede asegurar que los datos se guardaron correctamente, contacte con servicio técnico."
              );
            }
          })
          .catch(function (err) {
            res.json({
              mensaje: err.stack !== undefined ? err.stack : err,
              hasErr: true,
            });
          });
      });
    });

  function calcularCostosEgresos(
    detalleVenta,
    producto,
    cantidad,
    inventarios,
    movimientoCreado,
    index,
    array,
    res,
    venta,
    t,
    req
  ) {
    var condicionInventario = {
      id_producto: producto.id,
      id_almacen: venta.almacen.id,
      cantidad: { $gt: 0 },
    };
    return Inventario.findAll({
      where: condicionInventario,
      transaction: t,
    }).then(function (inventariosEncontrados) {
      inventarios = inventariosEncontrados;
      var promesas = [];
      var cantidadTotal = cantidad;
      if (producto.activar_inventario) {
        if (inventarios !== undefined) {
          if (inventarios.length > 0) {
            var promises = [];
            for (var i = 0; i < inventarios.length; i++) {
              if (cantidadTotal > 0) {
                var cantidadParcial;
                if (cantidadTotal > inventarios[i].cantidad) {
                  cantidadParcial = inventarios[i].cantidad;
                  cantidadTotal = cantidadTotal - inventarios[i].cantidad;
                } else {
                  cantidadParcial = cantidadTotal;
                  cantidadTotal = 0;
                }
                if (cantidadParcial > 0) {
                  promesas.push(
                    crearMovimientoEgresoYActualizarInventario(
                      movimientoCreado,
                      detalleVenta,
                      producto,
                      cantidad,
                      inventarios,
                      cantidadParcial,
                      inventarios[i],
                      index,
                      array,
                      i,
                      res,
                      venta,
                      t,
                      req
                    )
                  );
                }
              }
            }
          } else {
            promesas.push(
              new Promise(function (fulfill, reject) {
                reject(
                  "Producto " +
                  producto.nombre +
                  " sin inventario disponible, no se puede cerrar la solicitud"
                );
              })
            );
          }
        } else {
          promesas.push(
            new Promise(function (fulfill, reject) {
              reject(
                "Producto " +
                producto.nombre +
                " sin inventario disponible, no se puede cerrar la solicitud"
              );
            })
          );
        }
      } else {
        promesas.push(
          new Promise(function (fulfill, reject) {
            fulfill("Producto no inventariado.");
          })
        );
      }
      return Promise.all(promesas);
    });
  }

  function crearMovimientoEgresoYActualizarInventario(
    movimientoCreado,
    detalleVenta,
    producto,
    cantidad,
    inventarios,
    cantidadParcial,
    costo,
    index,
    array,
    i,
    res,
    datosVenta,
    t,
    req
  ) {
    return DetalleMovimiento.create(
      {
        id_movimiento: movimientoCreado.id,
        id_producto: producto.id,
        cantidad: cantidadParcial,
        costo_unitario: costo.costo_unitario,
        importe: cantidadParcial * costo.costo_unitario,
        total: cantidadParcial * costo.costo_unitario,
        descuento: producto.descuento * cantidadParcial,
        recargo: 0 * cantidadParcial,
        ice: 0 * cantidadParcial,
        excento: 0 * cantidadParcial,
        tipo_descuento: producto.descuento_fijo,
        tipo_recargo: 0,
        fecha_vencimiento: costo.fecha_vencimiento, //producto.inventarios[0].fecha_vencimiento,
        lote: costo.lote, //producto.inventarios[0].lote,
        id_inventario: costo.id,
      },
      { transaction: t }
    ).then(function (detalleMovimientoCreado) {
      return Inventario.find({
        where: {
          id: costo.id,
        },
        transaction: t,
        lock: t,
      })
        .then(function (inventario) {
          if (inventario.cantidad >= cantidadParcial) {
            return Inventario.update(
              {
                cantidad: inventario.cantidad - cantidadParcial,
                costo_total:
                  (inventario.cantidad - cantidadParcial) *
                  costo.costo_unitario,
              },
              {
                where: {
                  id: inventario.id,
                },
                transaction: t,
              }
            )
              .then(function (result) {
                req.body.totalGeneral =
                  req.body.totalGeneral +
                  cantidadParcial * costo.costo_unitario;
                return new Promise(function (fulfill, reject) {
                  fulfill(result);
                });
              })
              .catch(function (err) {
                return new Promise(function (fulfill, reject) {
                  reject(err.stack !== undefined ? err.stack : err);
                });
              });
          } else {
            return new Promise(function (fulfill, reject) {
              reject(
                "Error: La cantidad disponible es menor a la cantidad solicitada."
              );
            });
          }
        })
        .catch(function (err) {
          return new Promise(function (fulfill, reject) {
            reject(err.stack !== undefined ? err.stack : err);
          });
        });
    });
  }

  router
    .route(
      "/productos-operaciones/empresa/:id_empresa/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cantidad/:cantidad/grupo/:id_grupo/user/:id_usuario/verEstado/:verEstado/subGrupo/:id_subgrupo"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      UsuarioGrupos.findAll({
        where: { id_usuario: req.params.id_usuario },
      }).then(function (grupos) {
        var gruposUsuario = grupos.map(function (grupo) {
          return grupo.id_grupo;
        });
        var condicionGrupo = { $in: gruposUsuario };
        if (req.params.id_grupo != 0) {
          condicionGrupo = req.params.id_grupo;
        }
        var condicionProducto = {
          id_empresa: req.params.id_empresa,
          publicar_panel: true,
          id_grupo: condicionGrupo,
        };
        if (req.params.texto_busqueda != 0) {
          condicionProducto = {
            id_empresa: req.params.id_empresa,
            publicar_panel: true,
            id_grupo: condicionGrupo,
            $or: [
              { nombre: { $like: "%" + req.params.texto_busqueda + "%" } },
              { codigo: req.params.texto_busqueda },
              { descripcion: { $like: "%" + req.params.texto_busqueda + "%" } },
            ],
          };
        }
        var textOrder = "`agil_producto`.`nombre` asc";

        if (req.params.items_pagina != "0") {
          textOrder =
            textOrder +
            " limit " +
            req.params.items_pagina * (req.params.pagina - 1) +
            ", " +
            req.params.items_pagina;
        }
        var datosbusqueda = {
          where: condicionProducto,
          include: [
            {
              model: Inventario,
              as: "inventarios",
              where: {
                id_almacen: req.params.id_almacen,
                cantidad: { $gte: 0 },
              },
            },
            { model: Clase, as: "tipoProducto", required: false },
            {
              model: ProductoBase,
              as: "productosBase",
              required: false,
              include: [
                {
                  model: Producto,
                  as: "productoBase",
                  required: false,
                  include: [
                    {
                      model: Inventario,
                      as: "inventarios",
                      required: false,
                      where: {
                        id_almacen: req.params.id_almacen,
                        cantidad: { $gte: 0 },
                      },
                    },
                    { model: Clase, as: "tipoProducto", required: false },
                    {
                      model: ProductoBase,
                      as: "productosBase",
                      required: false,
                      include: [
                        {
                          model: Producto,
                          as: "productoBase",
                          required: false,
                          include: [
                            {
                              model: Inventario,
                              as: "inventarios",
                              required: false,
                              where: {
                                id_almacen: req.params.id_almacen,
                                cantidad: { $gte: 0 },
                              },
                            },
                            {
                              model: Clase,
                              as: "tipoProducto",
                              required: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };
        datosbusqueda.group = ["`agil_producto`.`id`"];
        Producto.count(datosbusqueda)
          .then(function (count) {
            datosbusqueda.order = sequelize.literal(textOrder);
            Producto.findAll(datosbusqueda)
              .then(function (productos) {
                res.json({
                  productos: productos,
                  paginas: Math.ceil(count.length / req.params.items_pagina),
                });
              })
              .catch(function (err) {
                res.json([
                  {
                    hasError: true,
                    mensaje: err.stack + "---LN 535 rutas operaciones.",
                  },
                ]);
              });
          })
          .catch(function (err) {
            res.json([
              {
                hasError: true,
                mensaje: err.stack + "---LN 529 rutas operaciones.",
              },
            ]);
          });
      });
    });
  router
    .route(
      "/productos-operaciones/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      UsuarioGrupos.findAll({
        where: { id_usuario: req.params.id_usuario },
      })
        .then(function (grupos) {
          var gruposUsuario = grupos.map(function (grupo) {
            return grupo.id_grupo;
          });
          var condicionGrupo = { $in: gruposUsuario };
          if (req.params.id_grupo != 0) {
            condicionGrupo = req.params.id_grupo;
          }
          var condicionProducto = {
            id_empresa: req.params.id_empresa,
            publicar_panel: true,
            id_grupo: condicionGrupo,
          };
          if (req.params.texto != 0) {
            condicionProducto = {
              id_empresa: req.params.id_empresa,
              publicar_panel: true,
              id_grupo: condicionGrupo,
              $or: [
                { nombre: { $like: "%" + req.params.texto + "%" } },
                { codigo: req.params.texto },
                { descripcion: { $like: "%" + req.params.texto + "%" } },
              ],
            };
          }
          Producto.findAll({
            offset: 15 * (req.params.pagina - 1),
            limit: 15,
            where: condicionProducto,
            include: [
              {
                model: Inventario,
                as: "inventarios",
                where: {
                  id_almacen: req.params.id_almacen,
                  cantidad: { $gte: 0 },
                },
              },
              { model: Clase, as: "tipoProducto", required: false },
              {
                model: ProductoBase,
                as: "productosBase",
                required: false,
                include: [
                  {
                    model: Producto,
                    as: "productoBase",
                    required: false,
                    include: [
                      {
                        model: Inventario,
                        as: "inventarios",
                        required: false,
                        where: {
                          id_almacen: req.params.id_almacen,
                          cantidad: { $gte: 0 },
                        },
                      },
                      { model: Clase, as: "tipoProducto", required: false },
                      {
                        model: ProductoBase,
                        as: "productosBase",
                        required: false,
                        include: [
                          {
                            model: Producto,
                            as: "productoBase",
                            required: false,
                            include: [
                              {
                                model: Inventario,
                                as: "inventarios",
                                required: false,
                                where: {
                                  id_almacen: req.params.id_almacen,
                                  cantidad: { $gte: 0 },
                                },
                              },
                              {
                                model: Clase,
                                as: "tipoProducto",
                                required: false,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            // order: [[{ model: Inventario, as: 'inventarios' }, 'updatedAt', 'DESC']]
            order: [["nombre", "ASC"]],
          })
            .then(function (productos) {
              res.json(productos);
            })
            .catch(function (err) {
              res.json([
                {
                  hasError: true,
                  mensaje: err.stack + "---LN 535 rutas operaciones.",
                },
              ]);
            });
        })
        .catch(function (err) {
          res.json([
            {
              hasError: true,
              mensaje: err.stack + "---LN 529 rutas operaciones.",
            },
          ]);
        });
    });

  router
    .route("/operaciones/impresion/:id_solicitud")
    .get(ensureAuthorizedlogged, function (req, res) {
      SolicitudReposicion.find({
        where: condicion,
        include: [
          {
            model: Almacen,
            as: "almacen",
            include: [{ model: Sucursal, as: "sucursal" }],
          },
          {
            model: DetalleSolicitudProducto,
            as: "solicitudesProductos",
            include: [
              { model: Producto, as: "productoSolicitado" },
              {
                model: DetalleSolicitudProductoBase,
                as: "detallesIngredientesProducto",
                include: [{ model: Producto, as: "productoSolicitudBase" }],
              },
            ],
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
      })
        .then(function (solicitudImprimir) {
          res.json({ solicitud: solicitudImprimir });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack });
        });
    });

  router
    .route("/operaciones/eliminar/:id_solicitud")
    .post(ensureAuthorizedlogged, function (req, res) {
      SolicitudReposicion.find({
        where: { id: req.params.id_solicitud },
      })
        .then((sol) => {
          Almacen.find({
            where: {
              id: sol.id_almacen,
            },
            include: [
              {
                model: Sucursal,
                as: "sucursal",
              },
            ],
          }).then((alm) => {
            if (!alm.sucursal.activo)
              return res.json({
                mensaje: "Sucursal deshabilitada, no se pueden hacer cambios.",
              });
            SolicitudReposicion.update(
              {
                eliminado: true,
              },
              {
                where: { id: req.params.id_solicitud },
              }
            )
              .then(function (solicitudEliminada) {
                res.json({ mensaje: "Solicitud eliminada!" });
              })
              .catch(function (err) {
                res.json({ mensaje: err.stack });
              });
          });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack });
        });
    });

  router
    .route("/operaciones/producto/:id_producto")
    .get(ensureAuthorizedlogged, function (req, res) {
      Producto.find({
        where: { id: req.params.id_producto },
        include: [
          {
            model: ProductoBase,
            as: "productosBase",
            where: { id_producto: { $ne: null } },
            required: true,
            include: [{ model: Producto, as: "productoBase", required: true }],
          },
        ],
      })
        .then(function (producto) {
          res.json(producto);
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack });
        });
    });

  router
    .route("/operaciones/pedido/:id_empresa")
    .post(ensureAuthorizedlogged, function (req, res) {
      Producto.find({
        where: { id: req.params.id_producto },
        include: [
          {
            model: ProductoBase,
            as: "productosBase",
            where: { id_producto: { $ne: null } },
            required: true,
            include: [{ model: Producto, as: "productoBase", required: true }],
          },
        ],
      })
        .then(function (producto) {
          res.json(producto);
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack });
        });
    });

  router
    .route(
      "/operaciones-proveedor-relacion/empresa/:id_empresa/razon_social/:razon_social/almacen/:id_almacen/grupo/:id_grupo"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionProveedor = {};
      if (req.params.id_empresa != "0") {
        condicionProveedor.empresa = req.params.id_empresa;
      }
      if (req.params.razon_social != "0") {
        condicionProveedor.razon_social = req.params.razon_social;
      }
      var condicionGrupo = {};
      if (req.params.id_grupo != "0") {
        condicionGrupo = { id: req.params.id_grupo };
      }
      var productos = new Array();
      Proveedor.findAll({
        where: condicionProveedor,
      }).then(function (proveedores) {
        var producto = proveedores[0].productos.split(",");

        GestionDetalleOrdenReposicion.findAll({
          where: { id_detalle_pedido: null, eliminado: false },
          include: [
            {
              model: GestionOrdenReposicion,
              as: "ordenReposicion",
              where: { id_almacen: req.params.id_almacen },
            },
            {
              model: Producto,
              as: "producto",
              where: { id: { $in: producto } },
            },
          ],
        })
          .then(function (detalles) {
            //proveedores.productos = productos;
            res.json(detalles);
          })
          .catch(function (err) {
            res.json({ mensaje: err.stack });
          });
      });
    });
  ///rutas orden reposicion
  router
    .route(
      "/orden-reposicion/inicio/:inicio/fin/:fin/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/estado/:id_estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionOrdenReposicion = {},
        condicionSucursal = { id_empresa: req.params.id_empresa, activo: true },
        condicionAlmacen = {},
        condicionEstado = {};
      includeEstado = {
        model: Clase,
        as: "estado",
        where: condicionEstado,
        required: false,
      };
      if (req.params.inicio != "0" && req.params.fin != "0") {
        inicio = new Date(req.params.inicio);
        fin = new Date(req.params.fin);
        inicio.setHours(0, 0, 0, 0);
        fin.setHours(23, 59, 59, 59);
        condicionOrdenReposicion.fecha_consumo = { $between: [inicio, fin] };
      }
      if (req.params.id_sucursal != "0") {
        condicionSucursal.id = req.params.id_sucursal;
      }
      if (req.params.id_almacen != "0") {
        condicionAlmacen.id = req.params.id_almacen;
      }
      if (req.params.id_estado != "0") {
        condicionEstado.id = req.params.id_estado;
        includeEstado.required = true;
      }
      var textOrder = "";
      if (req.params.columna == "item-producto") {
        // textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
      } else if (req.params.columna == "id") {
        textOrder =
          "`agil_gestion_orden_reposicion`.`id` " + req.params.direccion;
      } else {
        textOrder = req.params.columna + " " + req.params.direccion;
      }

      if (req.params.items_pagina != "0") {
        textOrder =
          textOrder +
          " limit " +
          req.params.items_pagina * (req.params.pagina - 1) +
          ", " +
          req.params.items_pagina;
      }
      var datosbusqueda = {
        where: condicionOrdenReposicion,
        include: [
          /* {
                    model: GestionDetalleOrdenReposicion, as: 'detallesOrdenReposicion'
                    , include: [{ model: Producto, as: 'producto' }, { model: DetalleSolicitudProducto, as: 'detallesSolicitudProductos' }]
                }, */
          includeEstado,
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
          {
            model: Almacen,
            as: "almacen",
            where: condicionAlmacen,
            include: [
              { model: Sucursal, as: "sucursal", where: condicionSucursal },
            ],
          },
        ],
      };
      datosbusqueda.group = ["`agil_gestion_orden_reposicion`.`id`"];
      GestionOrdenReposicion.count(datosbusqueda).then(function (count) {
        datosbusqueda.order = sequelize.literal(textOrder);
        delete datosbusqueda.group;
        GestionOrdenReposicion.findAll(datosbusqueda).then(function (
          ordenesReposicion
        ) {
          res.json({
            ordenesReposicion: ordenesReposicion,
            paginas: Math.ceil(count.length / req.params.items_pagina),
          });
        });
      });
    });
  router
    .route("/obtener-ultima-fecha-orden-reposicion/empresa/:id_almacen")
    .get(ensureAuthorizedlogged, function (req, res) {
      GestionOrdenReposicion.findAll({
        where: { almacen: req.params.id_almacen },
        limit: 1,
        order: [["id", "desc"]],
      }).then(function (dato) {
        res.json({ ordenReposicion: dato[0] });
      });
    });
  router
    .route("/nueva/orden-reposicion/usuario/:id_usuario")
    .post(ensureAuthorizedlogged, function (req, res) {
      var reposicion = req.body;
      sequelize
        .transaction(function (t) {
          if (reposicion.id) {
            return actualizarOrdenReposicion(req, res, t, reposicion);
          } else {
            return crearOrdenReposicion(req, res, t, reposicion);
          }
        })
        .then(function (result) {
          if (reposicion.id) {
            res.json({ mensaje: "Actualizado satisfactoriamente" });
          } else {
            res.json({ nuevo: req.body.nuevo, mensaje: "Creado satisfactoriamente" });
          }
        })
        .catch(function (err) {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
          });
        });
    });
  function crearOrdenReposicion(req, res, t, reposicion) {
    return Sucursal.find({
      where: { id: reposicion.almacen.id_sucursal },
      transaction: t,
    })
      .then(function (sucursalEncontrada) {
        if (!sucursalEncontrada.activo)
          throw new Error(
            "Sucursal deshabilitada, no se pueden hacer cambios."
          );
        return Almacen.findById(req.body.almacen.id, { raw: true })
          .then((almacen) => {
            return GestionOrdenReposicion.create(
              {
                fecha_creacion: reposicion.fecha_creacion,
                indice_rotacion: reposicion.indice_rotacion,
                fecha_inicio: reposicion.fecha_inicio
                  ? reposicion.fecha_inicio
                  : new Date(),
                fecha_consumo: reposicion.fecha_consumo,
                id_almacen: reposicion.almacen.id,
                usar_observacion: reposicion.usar_observacion,
                observacion: reposicion.observacion
                  ? reposicion.observacion
                  : null,
                eliminado: reposicion.eliminado ? reposicion.eliminado : false,
                id_estado: reposicion.id_estado,
                id_usuario: req.params.id_usuario,
                confirmacion_reposicion: reposicion.confirmacion_reposicion
                  ? reposicion.confirmacion_reposicion
                  : false,
                numero_correlativo:
                  sucursalEncontrada.numero_correlativo_reposicion_almacen,
                id_orden_reposicion_campamento: req.body.numero_orden,
                nro_correlativo_iso_recepcion:
                  almacen && almacen.correlativo_iso_gestion_recepcion
                    ? almacen.correlativo_iso_gestion_recepcion
                    : null,
                nro_correlativo_iso_envio: null,
                config_doc_iso_recepcion: req.body.config_doc_iso_recepcion
                  ? req.body.config_doc_iso_recepcion
                  : null,
                config_doc_iso_envio: null,
                maximos: reposicion.maximos
              },
              { transaction: t }
            )
              .then(function (ordenReposicionCreado) {
                req.body.nuevo = ordenReposicionCreado
                return Sucursal.update(
                  {
                    numero_correlativo_reposicion_almacen:
                      sucursalEncontrada.numero_correlativo_reposicion_almacen
                        ? sucursalEncontrada.numero_correlativo_reposicion_almacen +
                        1
                        : null,
                  },
                  {
                    where: { id: reposicion.almacen.id_sucursal },
                    transaction: t,
                  }
                )
                  .then(function (sucursalSaved) {
                    return Almacen.update(
                      {
                        correlativo_iso_gestion_recepcion:
                          almacen.correlativo_iso_gestion_recepcion
                            ? almacen.correlativo_iso_gestion_recepcion + 1
                            : null,
                      },
                      {
                        where: { id: almacen.id },
                        transaction: t,
                      }
                    )
                      .then((almacenSaved) => {
                        var promises = [];
                        reposicion.detallesOrdenReposicion.forEach(function (
                          x
                        ) {
                          promises.push(
                            crearGestionDetalleOrdenReposicion(
                              req,
                              res,
                              t,
                              x,
                              ordenReposicionCreado
                            )
                          );
                        });
                        return Promise.all(promises);
                      })
                      .catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                          reject(err.stack !== undefined ? err.stack : err);
                        });
                      });
                  })
                  .catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                      reject(err.stack !== undefined ? err.stack : err);
                    });
                  });
              })
              .catch(function (err) {
                return new Promise(function (fulfill, reject) {
                  reject(err.stack !== undefined ? err.stack : err);
                });
              });
          })
          .catch((err) => {
            return new Promise(function (fulfill, reject) {
              reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function crearGestionDetalleOrdenReposicion(
    req,
    res,
    t,
    detalle,
    ordenReposicionCreado
  ) {
    return GestionDetalleOrdenReposicion.create(
      {
        id_orden_reposicion: ordenReposicionCreado.id,
        observado: detalle.observado,
        observacion_revisor: detalle.observacion_revisor,
        observacion: detalle.observacion,
        cantidad: detalle.cantidad,
        extra: detalle.extra,
        cantidad_corregida: 0,
        inventario_disponible: detalle.inventario_disponible,
        id_producto: detalle.producto.id,
        cantidad_maxima: detalle.cantidad_maxima,
        cantidad_sugerida: detalle.cantidad_sugerida,
        id_orden_reposicion_campamento: detalle.numero_detalle_reposicion,
        eliminado: detalle.eliminado ? detalle.eliminado : false,
        cantidad_total: detalle.cantidad_total,
        cantidad_fijo: detalle.cantidad_fijo,
      },
      { transaction: t }
    )
      .then(function (detalleOrdenReposicionCreado) {
        var promises = [];
        if (detalle.detallesSolicitudProductos.length !== "") {
          promises.push(
            actualizarSolicitudGestion(
              req,
              res,
              t,
              detalle.detallesSolicitudProductos,
              detalleOrdenReposicionCreado
            )
          );
        }

        if (detalle.detallesSolicitudProductosBase !== "") {
          promises.push(
            actualizarSolicitudGestionBase(
              req,
              res,
              t,
              detalle.detallesSolicitudProductosBase,
              detalleOrdenReposicionCreado
            )
          );
        }
        return Promise.all(promises);
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function actualizarSolicitudGestion(
    req,
    res,
    t,
    x,
    detalleOrdenReposicionCreado
  ) {
    return DetalleSolicitudProducto.update(
      {
        id_detalle_orden_reposicion: detalleOrdenReposicionCreado.id,
      },
      { where: { id: { $in: x.split(",") } }, transaction: t }
    )
      .then(function (dato) {
        return new Promise(function (fulfill, reject) {
          fulfill();
        });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function actualizarSolicitudGestionBase(
    req,
    res,
    t,
    x,
    detalleOrdenReposicionCreado
  ) {
    return DetalleSolicitudProductoBase.update(
      {
        id_detalle_orden_reposicion: detalleOrdenReposicionCreado.id,
      },
      { where: { id: { $in: x.split(",") } }, transaction: t }
    )
      .then(function (dato) {
        return new Promise(function (fulfill, reject) {
          fulfill();
        });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function actualizarOrdenReposicion(req, res, t, reposicion) {
    return Almacen.find({
      where: {
        id: reposicion.almacen.id,
      },
      include: [
        {
          model: Sucursal,
          as: "sucursal",
        },
      ],
    })
      .then((alm) => {
        if (!alm.sucursal.activo)
          throw new Error(
            "Sucursal deshabilitada, no se pueden hacer cambios."
          );
        return GestionOrdenReposicion.update(
          {
            fecha_inicio: reposicion.fecha_inicio,
            fecha_consumo: reposicion.fecha_consumo,
            id_almacen: reposicion.almacen.id,
            usar_observacion: reposicion.usar_observacion,
            observacion: reposicion.observacion,
            eliminado: reposicion.eliminado,
            id_estado: reposicion.id_estado,
            confirmacion_reposicion: reposicion.confirmacion_reposicion,
            nro_correlativo_iso_envio: reposicion.confirmacion_reposicion
              ? alm.correlativo_iso_gestion_envio
                ? alm.correlativo_iso_gestion_envio
                : null
              : null,
            config_doc_iso_envio: reposicion.confirmacion_reposicion
              ? reposicion.config_doc_iso_envio
                ? reposicion.config_doc_iso_envio
                : null
              : null,
            maximos: reposicion.maximos
          },
          { where: { id: reposicion.id }, transaction: t }
        )
          .then(async (dato) => {
            if (reposicion.confirmacion_reposicion) {
              await Almacen.update(
                {
                  correlativo_iso_gestion_envio:
                    alm.correlativo_iso_gestion_envio
                      ? alm.correlativo_iso_gestion_envio + 1
                      : alm.correlativo_iso_gestion_envio,
                },
                {
                  where: {
                    id: reposicion.almacen.id,
                  },
                  transaction: t,
                }
              );
            }
            var promises = [];
            if (req.body.detallesOrdenReposicion) {
              if (req.body.detallesOrdenReposicion.length > 0) {
                req.body.detallesOrdenReposicion.forEach(function (x) {
                  x.id_orden_reposicion = x.id
                    ? x.id_orden_reposicion
                    : reposicion.id;
                  promises.push(
                    actualizarGestionDetalleOrdenReposicion(
                      req,
                      res,
                      t,
                      x,
                      reposicion
                    )
                  );
                });
                return Promise.all(promises);
              }
            } else {
              return GestionDetalleOrdenReposicion.findAll({
                where: { id_orden_reposicion: reposicion.id },
              })
                .then(function (detallesOrdenReposicion) {
                  detallesOrdenReposicion.forEach(function (x) {
                    let ids = [x.id];
                    if (reposicion.eliminado) {
                      promises.push(
                        DetalleSolicitudProducto.update(
                          {
                            id_detalle_orden_reposicion: null,
                          },
                          {
                            where: {
                              id_detalle_orden_reposicion: { $in: ids },
                            },
                            transaction: t,
                          }
                        )
                          .then(function (actualizado) {
                            return new Promise(function (fulfill, reject) {
                              fulfill();
                            });
                          })
                          .catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                              reject(err.stack !== undefined ? err.stack : err);
                            });
                          })
                      );
                      promises.push(
                        DetalleSolicitudProductoBase.update(
                          {
                            id_detalle_orden_reposicion: null,
                          },
                          {
                            where: {
                              id_detalle_orden_reposicion: { $in: ids },
                            },
                            transaction: t,
                          }
                        )
                          .then(function (actualizadoBase) {
                            return new Promise(function (fulfill, reject) {
                              fulfill();
                            });
                          })
                          .catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                              reject(err.stack !== undefined ? err.stack : err);
                            });
                          })
                      );
                    } else {
                      x.id_orden_reposicion = x.id
                        ? x.id_orden_reposicion
                        : reposicion.id;
                      promises.push(
                        actualizarGestionDetalleOrdenReposicion(
                          req,
                          res,
                          t,
                          x,
                          reposicion
                        )
                      );
                    }
                  });
                  return Promise.all(promises);
                })
                .catch(function (err) {
                  return new Promise(function (fulfill, reject) {
                    reject(err.stack !== undefined ? err.stack : err);
                  });
                });
            }
          })
          .catch(function (err) {
            return new Promise(function (fulfill, reject) {
              reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function actualizarGestionDetalleOrdenReposicion(
    req,
    res,
    t,
    detalle,
    reposicion
  ) {
    if (detalle.id) {
      return GestionDetalleOrdenReposicion.update(
        {
          observado: detalle.observado,
          observacion_revisor: detalle.observacion_revisor,
          observacion: detalle.observacion,
          extra: detalle.extra,
          eliminado: detalle.eliminado,
          cantidad_corregida: detalle.cantidad_corregida,
          justificativo: detalle.justificativo,
          cantidad_total: detalle.cantidad_total,
          cantidad_fijo: detalle.cantidad_fijo,
        },
        { where: { id: detalle.id }, transaction: t }
      )
        .then(function (dato) {
          return new Promise(function (fulfill, reject) {
            fulfill();
          });
        })
        .catch(function (err) {
          return new Promise(function (fulfill, reject) {
            reject(err.stack !== undefined ? err.stack : err);
          });
        });
    } else {
      return crearGestionDetalleOrdenReposicion(
        req,
        res,
        t,
        detalle,
        reposicion
      );
    }
  }
  router
    .route("/operaciones-importacion-solicitud/empresa/:id_empresa")
    .post(ensureAuthorizedlogged, function (req, res) {
      sequelize
        .transaction(function (t) {
          var promisesSol = [];

          return Tipo.find({
            where: { nombre_corto: Diccionario.MOV_EGRE },
            transaction: t,
          })
            .then(function (tipoMovimiento) {
              return Clase.find({
                where: {
                  nombre_corto: Diccionario.EGRE_CONSUMO,
                  id_tipo: tipoMovimiento.id,
                },
                transaction: t,
              })
                .then(function (conceptoMovimiento) {
                  for (let index = 0; index < req.body.length; index++) {
                    const solicitud = req.body[index];
                    promisesSol.push(
                      Movimiento.create(
                        {
                          id_tipo: tipoMovimiento.id,
                          id_clase: conceptoMovimiento.id,
                          id_almacen: solicitud.almacen.id,
                          fecha: solicitud.fecha,
                        },
                        { transaction: t }
                      )
                        .then(function (movimientoEgresoCreado) {
                          return Sucursal.find({
                            where: {
                              nombre: solicitud.almacen.sucursal.nombre,
                              id_empresa: req.params.id_empresa,
                            },
                            include: [
                              {
                                model: Almacen,
                                as: "almacenes",
                                where: { nombre: solicitud.almacen.nombre },
                              },
                              { model: Empresa, as: "empresa" },
                            ],
                            transaction: t,
                          })
                            .then(function (sucursalEncontrada) {
                              if (!sucursalEncontrada.activo)
                                throw new Error(
                                  "Sucursal(es) deshabilitada(s), no se puede hacer cambios"
                                );
                              solicitud.almacen =
                                sucursalEncontrada.almacenes[0];
                              solicitud.almacen.sucursal = sucursalEncontrada;
                              return Usuario.find({
                                where: {
                                  empresa: req.params.id_empresa,
                                  nombre_usuario:
                                    solicitud.usuario.nombre_usuario,
                                },
                                transaction: t,
                              })
                                .then(function (usuarioEncontrado) {
                                  return ConfiguracionIso.find({
                                    where: {
                                      id_sucursal: sucursalEncontrada.id,
                                      eliminado: false,
                                    },
                                    transaction: t,
                                    include: [
                                      {
                                        model: Clase,
                                        as: "tipoDocumento",
                                        where: { nombre_corto: "CONSUMO" },
                                      },
                                    ],
                                  })
                                    .then(async function (configiso) {
                                      let area = await Clase.find({
                                        where:{nombre:solicitud.area.toUpperCase()},
                                        include:[{model:Tipo, as: 'tipo',where:{id_empresa:req.params.id_empresa,nombre_corto:'RRHH_AREA'}}]
                                      })
                                      let centro = await Clase.find({
                                        where:{nombre:solicitud.centroCosto.toUpperCase()},
                                        include:[{model:Tipo, as: 'tipo',where:{id_empresa:req.params.id_empresa,nombre_corto:'CENCOS'}}]
                                      })
                                      return SolicitudReposicion.create(
                                        {
                                          id_almacen: solicitud.almacen.id,
                                          id_movimiento:
                                            movimientoEgresoCreado.id,
                                          fecha: solicitud.fecha,
                                          id_usuario: usuarioEncontrado.id,
                                          activo: solicitud.activo,
                                          monto: 0,
                                          id_estado: solicitud.estado.id,
                                          comensales: solicitud.comensales,
                                          descripcion: solicitud.descripcion,
                                          numero_correlativo:
                                            sucursalEncontrada.numero_correlativo_solicitud_almacen,
                                          numero_iso_consumo: configiso
                                            ? solicitud.almacen
                                              .numero_correlativo_iso_consumo
                                              ? solicitud.almacen
                                                .numero_correlativo_iso_consumo
                                              : null
                                            : null,
                                          config_doc_iso: configiso
                                            ? configiso.id
                                            : null,
                                          id_area:
                                            (area && area.id) || null,
                                          id_campo: (centro && centro.id) || null,
                                        },
                                        { transaction: t }
                                      )
                                        .then(async function (solicitudCreada) {
                                          try {
                                            await Sucursal.update(
                                              {
                                                numero_correlativo_solicitud_almacen:
                                                  sucursalEncontrada.numero_correlativo_solicitud_almacen +
                                                  1,
                                              },
                                              {
                                                where: {
                                                  id: sucursalEncontrada.id,
                                                },
                                                transaction: t,
                                              }
                                            );
                                            await Almacen.update(
                                              {
                                                numero_correlativo_iso_consumo:
                                                  configiso
                                                    ? solicitud.almacen
                                                      .numero_correlativo_iso_consumo +
                                                    1
                                                    : solicitud.almacen
                                                      .numero_correlativo_iso_consumo,
                                              },
                                              {
                                                where: {
                                                  id: solicitud.almacen.id,
                                                },
                                                transaction: t,
                                              }
                                            );
                                            solicitud.solicitudCreada =
                                              solicitudCreada;
                                            solicitud.movimientoEgresoCreado =
                                              movimientoEgresoCreado;
                                            promisesDetallesSolicitd = [];
                                            solicitud.detalles = [];
                                            req.body.errorDetalle = [];
                                            let errorProducto = false;
                                            solicitud.detalles =
                                              await solicitud.detalleSolicitud.reduce(
                                                async function (
                                                  val,
                                                  detalle,
                                                  index,
                                                  array
                                                ) {
                                                  let productoEncontrado =
                                                    await Producto.find({
                                                      where: {
                                                        codigo:
                                                          detalle
                                                            .productoSolicitado
                                                            .codigo,
                                                        nombre:
                                                          detalle
                                                            .productoSolicitado
                                                            .nombre,
                                                        id_empresa:
                                                          req.params.id_empresa,
                                                      },
                                                      transaction: t,
                                                      include: [
                                                        {
                                                          model: Clase,
                                                          as: "tipoProducto",
                                                        },
                                                        {
                                                          model: ProductoBase,
                                                          as: "productosBase",
                                                          include: [
                                                            {
                                                              model: Producto,
                                                              as: "productoBase",
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    });
                                                  if (productoEncontrado) {
                                                    detalle.producto =
                                                      productoEncontrado;
                                                    var condicionInventario = {
                                                      id_producto:
                                                        productoEncontrado.id,
                                                      id_almacen:
                                                        solicitud.almacen.id,
                                                      cantidad: { $gt: 0 },
                                                    };
                                                    if (detalle.lote) {
                                                      condicionInventario.lote =
                                                        detalle.lote;
                                                    }
                                                    if (
                                                      detalle.fecha_vencimiento
                                                    ) {
                                                      var inicio = new Date(
                                                        detalle.fecha_vencimiento
                                                      );
                                                      inicio.setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                      );
                                                      var fin = new Date(
                                                        detalle.fecha_vencimiento
                                                      );
                                                      fin.setHours(
                                                        23,
                                                        59,
                                                        59,
                                                        0,
                                                        0
                                                      );

                                                      condicionInventario.fecha_vencimiento =
                                                      {
                                                        $between: [
                                                          inicio,
                                                          fin,
                                                        ],
                                                      };
                                                    }
                                                    let encontrado =
                                                      await Inventario.findAll({
                                                        where:
                                                          condicionInventario,
                                                        order: [["id", "asc"]],
                                                        transaction: t,
                                                      });
                                                    detalle.costos = encontrado;
                                                    var promises = [];
                                                    if (
                                                      productoEncontrado.tipoProducto
                                                    ) {
                                                      val =
                                                        generarDetalleConsumosPeps(
                                                          t,
                                                          req,
                                                          movimientoEgresoCreado,
                                                          solicitudCreada,
                                                          detalle,
                                                          solicitud,
                                                          productoEncontrado,
                                                          encontrado,
                                                          solicitud.almacen
                                                            .sucursal,
                                                          index,
                                                          array
                                                        );
                                                    } else {
                                                      req.body.errorDetalle.push(
                                                        {
                                                          mensaje:
                                                            "producto con codigo " +
                                                            productoEncontrado.codigo +
                                                            "no cuenta con tipo producto definido no se puedo registrar la solicitud N° " +
                                                            solicitud.numero_solicitud,
                                                          codigo:
                                                            detalle
                                                              .productoSolicitado
                                                              .codigo,
                                                        }
                                                      );
                                                      errorProducto = true;
                                                    }
                                                  } else {
                                                    req.body.errorDetalle.push({
                                                      mensaje:
                                                        "no existe el producto con codigo " +
                                                        detalle
                                                          .productoSolicitado
                                                          .codigo +
                                                        " no se puedo registrar la solicitud N° " +
                                                        solicitud.numero_solicitud,
                                                      codigo:
                                                        detalle
                                                          .productoSolicitado
                                                          .codigo,
                                                    });
                                                    errorProducto = true;
                                                  }
                                                  return val;
                                                },
                                                {}
                                              );
                                            if (errorProducto) {
                                              return new Promise(function (
                                                fulfill,
                                                reject
                                              ) {
                                                reject({ hasErr: true });
                                              });
                                            }
                                            if (solicitud.monto === 0) {
                                              for (const detalle of solicitud.detalles) {
                                                if (
                                                  detalle.costos != undefined ||
                                                  detalle.costos != null
                                                ) {
                                                  req.body.codigoProductoSinInv =
                                                    detalle.costos.length > 0
                                                      ? ""
                                                      : detalle.producto.codigo;
                                                  let costoUnitario =
                                                    detalle.costos.length > 0
                                                      ? detalle.costos[0]
                                                        .costo_unitario
                                                      : 0;
                                                  solicitud.monto +=
                                                    costoUnitario *
                                                    detalle.cantidad;
                                                  console.log(solicitud.monto);
                                                } else {
                                                  console.log(detalle.costos);
                                                }
                                              }
                                            }
                                            return SolicitudReposicion.update(
                                              {
                                                monto: solicitud.monto,
                                              },
                                              {
                                                where: {
                                                  id: solicitudCreada.id,
                                                },
                                                transaction: t,
                                              }
                                            )
                                              .then(function (solAct) {
                                                for (
                                                  let i = 0;
                                                  i < solicitud.detalles.length;
                                                  i++
                                                ) {
                                                  if (
                                                    solicitud.detalles[i]
                                                      .producto &&
                                                    solicitud.detalles[i].costos
                                                      .length > 0
                                                  ) {
                                                    promisesDetallesSolicitd.push(
                                                      calcularCostosEgresosImp(
                                                        solicitud.detalles[i]
                                                          .producto,
                                                        solicitud.detalles[i]
                                                          .cantidad,
                                                        solicitud.detalles[i]
                                                          .costos,
                                                        movimientoEgresoCreado,
                                                        t,
                                                        req
                                                      )
                                                    );
                                                    promisesDetallesSolicitd.push(
                                                      crearDetalleSolicitudImp(
                                                        solicitud.detalles[i],
                                                        solicitudCreada,
                                                        movimientoEgresoCreado,
                                                        t,
                                                        req
                                                      )
                                                    );
                                                  } else {
                                                    let bool =
                                                      req.body.errorDetalle.some(
                                                        (x) => {
                                                          return (x.codigo =
                                                            solicitud.detalles[
                                                              i
                                                            ].productoSolicitado.codigo);
                                                        }
                                                      );
                                                    if (
                                                      !solicitud.detalles[i]
                                                        .producto
                                                    ) {
                                                      if (!bool) {
                                                        req.body.errorDetalle.push(
                                                          {
                                                            mensaje:
                                                              "no existe el producto con codigo " +
                                                              solicitud
                                                                .detalles[i]
                                                                .productoSolicitado
                                                                .codigo +
                                                              " no se puedo registrar la solicitud N° " +
                                                              solicitud.numero_solicitud,
                                                            codigo:
                                                              solicitud
                                                                .detalles[i]
                                                                .productoSolicitado
                                                                .codigo,
                                                          }
                                                        );
                                                        return new Promise(
                                                          function (
                                                            fulfill,
                                                            reject
                                                          ) {
                                                            reject({
                                                              hasErr: true,
                                                              mensaje2: err,
                                                            });
                                                          }
                                                        );
                                                      }
                                                    } else {
                                                      if (!bool) {
                                                        req.body.errorDetalle.push(
                                                          {
                                                            mensaje:
                                                              "no existe inventario del producto con codigo " +
                                                              solicitud
                                                                .detalles[i]
                                                                .producto
                                                                .codigo +
                                                              " no se agrego el detalle a la solicitud N° " +
                                                              solicitud.numero_solicitud,
                                                            codigo:
                                                              solicitud
                                                                .detalles[i]
                                                                .producto
                                                                .codigo,
                                                          }
                                                        );
                                                      }
                                                    }
                                                  }
                                                }
                                                return Promise.all(
                                                  promisesDetallesSolicitd
                                                );
                                              })
                                              .catch(function (err) {
                                                return new Promise(function (
                                                  fulfill,
                                                  reject
                                                ) {
                                                  reject(
                                                    err.stack !== undefined
                                                      ? err.stack
                                                      : err
                                                  );
                                                });
                                              });
                                          } catch (err) {
                                            return new Promise(function (
                                              fulfill,
                                              reject
                                            ) {
                                              reject({
                                                mensaje:
                                                  err.stack !== undefined
                                                    ? err.stack
                                                    : err,
                                                hasErr: true,
                                                codigoProducto:
                                                  req.body.codigoProductoSinInv,
                                              });
                                            });
                                          }
                                        })
                                        .catch(function (err) {
                                          return new Promise(function (
                                            fulfill,
                                            reject
                                          ) {
                                            reject(
                                              err.stack !== undefined
                                                ? err.stack
                                                : err
                                            );
                                          });
                                        });
                                    })
                                    .catch(function (err) {
                                      return new Promise(function (
                                        fulfill,
                                        reject
                                      ) {
                                        reject(
                                          err.stack !== undefined
                                            ? err.stack
                                            : err
                                        );
                                      });
                                    });
                                })
                                .catch(function (err) {
                                  return new Promise(function (
                                    fulfill,
                                    reject
                                  ) {
                                    reject(err);
                                  });
                                });
                            })
                            .catch(function (err) {
                              return new Promise(function (fulfill, reject) {
                                reject(err);
                              });
                            });
                        })
                        .catch(function (err) {
                          return new Promise(function (fulfill, reject) {
                            reject(err.stack !== undefined ? err.stack : err);
                          });
                        })
                    );
                  }

                  return Promise.all(promisesSol)
                    .then(function (data) {
                      return new Promise(function (fulfill, reject) {
                        fulfill("Solicitud creada, inventario actualizado.");
                      });
                    })
                    .catch(function (err) {
                      return new Promise(function (fulfill, reject) {
                        reject(err);
                      });
                    });
                })
                .catch(function (err) {
                  return new Promise(function (fulfill, reject) {
                    reject(err.stack !== undefined ? err.stack : err);
                  });
                });
            })
            .catch(function (err) {
              return new Promise(function (fulfill, reject) {
                reject(err.stack !== undefined ? err.stack : err);
              });
            });
        })
        .then(function (result) {
          res.json({
            mensaje: result,
            ids_detalles_solicitud: req.body.detallesIds,
            ids_detalles_ingredientes: req.body.detallesBaseIds,
            errorDetalle: req.body.errorDetalle,
          });
        })
        .catch(function (err) {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
            errorDetalle: req.body.errorDetalle,
          });
        });
    });
  function generarDetalleConsumosPeps(
    t,
    req,
    movimientoCreado,
    ventaCreada,
    detalleSolicitud,
    solicitud,
    ProductoEncontrado,
    encontrado,
    sucursal,
    index,
    array
  ) {
    detalleSolicitud.producto = ProductoEncontrado;
    detalleSolicitud.costos = encontrado;
    let paraRectificacionDescuento = [];
    if (detalleSolicitud.producto.id) {
      if (detalleSolicitud.producto.activar_inventario) {
        if (detalleSolicitud.costos.length > 1) {
          let datosDetalle = [],
            cantidadTotal = detalleSolicitud.cantidad,
            i = 0,
            detalleVentaOriginal = JSON.parse(JSON.stringify(detalleSolicitud));
          while (i < detalleSolicitud.costos.length && cantidadTotal > 0) {
            detalleSolicitud.inventarioProducto = detalleSolicitud.costos[i];
            let cantidadDisponible = obtenerInventarioTotalPorFechaVencimiento(
              detalleSolicitud,
              datosDetalle
            );
            if (cantidadDisponible > 0) {
              let nuevoDetalleVenta = JSON.parse(
                JSON.stringify(detalleVentaOriginal)
              );
              let cantidadParcial;

              if (cantidadTotal > cantidadDisponible) {
                cantidadParcial = cantidadDisponible;
                cantidadTotal = cantidadTotal - cantidadDisponible;
              } else {
                cantidadParcial = cantidadTotal;
                cantidadTotal = 0;
              }
              nuevoDetalleVenta.cantidad = cantidadParcial;
              if (sucursal.empresa.usar_vencimientos) {
                nuevoDetalleVenta.fecha_vencimiento =
                  detalleSolicitud.costos[i].fecha_vencimiento;
                nuevoDetalleVenta.lote = detalleSolicitud.costos[i].lote;
              }
              nuevoDetalleVenta.costos = [];
              nuevoDetalleVenta.costos.push(detalleSolicitud.costos[i]);
              nuevoDetalleVenta.inventario = detalleSolicitud.costos[i];
              paraRectificacionDescuento.push(nuevoDetalleVenta);
              solicitud.detalles.push(nuevoDetalleVenta);
              i++;
            }
          }
        } else {
          if (detalleSolicitud.costos.length > 0) {
            if (sucursal.empresa.usar_vencimientos) {
              detalleSolicitud.fecha_vencimiento =
                detalleSolicitud.costos[0].fecha_vencimiento;
              detalleSolicitud.lote = detalleSolicitud.costos[0].lote;
              detalleSolicitud.inventario = detalleSolicitud.costos[0];
            }
          }
          solicitud.detalles.push(detalleSolicitud);
        }
      } else {
        solicitud.detalles.push(detalleVenta);
      }
    } else {
      solicitud.detalles.push(detalleSolicitud);
    }
    return solicitud.detalles;
  }
  function obtenerInventarioTotalPorFechaVencimiento(
    detalleVenta,
    datosDetalle
  ) {
    var cantidadTotal = detalleVenta.inventarioProducto.cantidad;
    if (datosDetalle.length > 0) {
      for (var j = 0; j < datosDetalle.length; j++) {
        if (
          datosDetalle[j].producto.id == detalleVenta.producto.id &&
          datosDetalle[j].costos[0].id == detalleVenta.inventarioProducto.id &&
          !datosDetalle[j].id
        ) {
          cantidadTotal = cantidadTotal - datosDetalle[j].cantidad;
        }
      }
    }
    return cantidadTotal;
  }
  /* importacion  desde almacenes*/

  router
    .route(
      "/operaciones-importacion-solicitud-reposicion-almacen/empresa/:id_empresa"
    )
    .post(ensureAuthorizedlogged, function (req, res) {
      req.body.detallesIds = [];
      req.body.detallesBaseIds = [];
      sequelize
        .transaction(
          {
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          },
          function (t) {
            var promisesSol = [];
            return Tipo.find({
              where: { nombre_corto: Diccionario.MOV_EGRE },
              transaction: t,
            })
              .then(function (tipoMovimiento) {
                return Clase.find({
                  where: {
                    nombre_corto: Diccionario.EGRE_CONSUMO,
                    id_tipo: tipoMovimiento.id,
                  },
                  transaction: t,
                })
                  .then(function (conceptoMovimiento) {
                    for (
                      let index = 0;
                      index < req.body.solicitudes.length;
                      index++
                    ) {
                      const solicitud = req.body.solicitudes[index];
                      promisesSol.push(
                        Movimiento.create(
                          {
                            id_tipo: tipoMovimiento.id,
                            id_clase: conceptoMovimiento.id,
                            id_almacen: solicitud.almacen.id,
                            fecha: solicitud.fecha,
                          },
                          { transaction: t }
                        )
                          .then(function (movimientoEgresoCreado) {
                            return Usuario.find({
                              where: {
                                empresa: req.params.id_empresa,
                                nombre_usuario:
                                  solicitud.usuario.nombre_usuario,
                              },
                              transaction: t,
                            })
                              .then(function (usuarioEncontrado) {
                                return Almacen.find({
                                  where: {
                                    id: solicitud.almacen.id,
                                  },
                                  include: [
                                    {
                                      model: Sucursal,
                                      as: "sucursal",
                                    },
                                  ],
                                })
                                  .then(async (alm) => {
                                    if (!alm.sucursal.activo)
                                      throw new Error(
                                        "Sucursal(es) deshabilitada(s), no se puede hacer cambios"
                                      );
                                    let configIso = await ConfiguracionIso.find(
                                      {
                                        where: { id_sucursal: alm.sucursal.id },
                                        include: [
                                          {
                                            model: Clase,
                                            as: "tipoDocumento",
                                            where: { nombre: "CONSUMO" },
                                          },
                                        ],
                                      }
                                    );
                                    let solicitudCreada =
                                      await SolicitudReposicion.create(
                                        {
                                          id_almacen: solicitud.almacen.id,
                                          id_movimiento:
                                            movimientoEgresoCreado.id,
                                          fecha: solicitud.fecha,
                                          id_usuario: usuarioEncontrado.id,
                                          activo: solicitud.activo,
                                          monto: solicitud.monto,
                                          id_estado: solicitud.estado.id,
                                          comensales: solicitud.comensales,
                                          descripcion: solicitud.descripcion,
                                          numero_correlativo:
                                            alm.sucursal
                                              .numero_correlativo_solicitud_almacen,
                                          numero_iso_consumo: configIso
                                            ? alm.numero_correlativo_iso_consumo
                                              ? alm.numero_correlativo_iso_consumo
                                              : null
                                            : null,
                                          config_doc_iso: configIso
                                            ? configIso.id
                                            : null,
                                          id_solicitud_campamento:
                                            solicitud.numero_solicitud,
                                        },
                                        { transaction: t }
                                      );

                                    await Sucursal.update(
                                      {
                                        numero_correlativo_solicitud_almacen:
                                          alm.sucursal
                                            .numero_correlativo_solicitud_almacen +
                                          1,
                                      },
                                      {
                                        where: { id: alm.sucursal.id },
                                        transaction: t,
                                      }
                                    );
                                    await Almacen.update(
                                      {
                                        numero_correlativo_iso_consumo:
                                          configIso
                                            ? alm.numero_correlativo_iso_consumo +
                                            1
                                            : alm.numero_correlativo_iso_consumo,
                                      },
                                      {
                                        where: { id: alm.id },
                                        transaction: t,
                                      }
                                    );
                                    solicitud.solicitudCreada = solicitudCreada;
                                    solicitud.movimientoEgresoCreado =
                                      movimientoEgresoCreado;
                                    promisesDetallesSolicitd = [];
                                    for (
                                      let i = 0;
                                      i < solicitud.detalleSolicitud.length;
                                      i++
                                    ) {
                                      promisesDetallesSolicitd.push(
                                        crearDetalleSolicitudProductoImp(
                                          solicitud.detalleSolicitud[i],
                                          solicitudCreada,
                                          movimientoEgresoCreado,
                                          t,
                                          req
                                        )
                                      );
                                    }
                                    return Promise.all(
                                      promisesDetallesSolicitd
                                    );
                                  })
                                  .catch(function (err) {
                                    return new Promise(function (
                                      fulfill,
                                      reject
                                    ) {
                                      reject(
                                        err.stack !== undefined
                                          ? err.stack
                                          : err
                                      );
                                    });
                                  });
                              })
                              .catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                  reject(
                                    err.stack !== undefined ? err.stack : err
                                  );
                                });
                              });
                          })
                          .catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                              reject(err.stack !== undefined ? err.stack : err);
                            });
                          })
                      );
                    }
                    return Promise.all(promisesSol)
                      .then(function (data) {
                        return new Promise(function (fulfill, reject) {
                          fulfill("Solicitud creada, inventario actualizado.");
                        });
                      })
                      .catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                          reject(err);
                        });
                      });
                  })
                  .catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                      reject(err.stack !== undefined ? err.stack : err);
                    });
                  });
              })
              .catch(function (err) {
                return new Promise(function (fulfill, reject) {
                  reject(err.stack !== undefined ? err.stack : err);
                });
              });
          }
        )
        .then(function (result) {
          res.json({
            mensaje: result,
            ids_detalles_solicitud: req.body.detallesIds,
            ids_detalles_ingredientes: req.body.detallesBaseIds,
          });
        })
        .catch(function (err) {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
          });
        });
    });

  function crearDetalleSolicitudProductoImp(
    detalle,
    solicitudCreada,
    movimientoCreado,
    t,
    req
  ) {
    return Producto.find({
      where: {
        codigo: detalle.productoSolicitado.codigo,
        id_empresa: req.params.id_empresa,
      },
      transaction: t,
      include: [{ model: Clase, as: "tipoProducto" }],
    })
      .then(function (productoEncontrado) {
        return DetalleSolicitudProducto.create(
          {
            id_solicitud: solicitudCreada.id,
            id_producto: productoEncontrado.id,
            cantidad: detalle.cantidad,
            id_detalle_solicitud_campamento: detalle.numero_detalle_solicitud,
          },
          { transaction: t }
        )
          .then(function (detalleCreado) {
            req.body.detallesIds.push({
              id_detalle_orden_reposicion: detalle.detalle_orden_reposicion,
              id_detalle_solicitud: detalleCreado.id,
            });
            var detallesProductoBase = [];
            if (
              detalle.detallesIngredientesProducto.length > 0 &&
              productoEncontrado.tipoProducto.nombre_corto !=
              Diccionario.TIPO_PRODUCTO_BASE
            ) {
              for (
                let i = 0;
                i < detalle.detallesIngredientesProducto.length;
                i++
              ) {
                detallesProductoBase.push(
                  crearDetalleSolicitudProductoBaseImp(
                    detalle.detallesIngredientesProducto[i],
                    detalleCreado,
                    movimientoCreado,
                    t,
                    req,
                    solicitudCreada
                  )
                );
              }
            } else {
              return DescontarInventarSolicitudProuctoImp(
                productoEncontrado,
                detalle.cantidad,
                movimientoCreado,
                t,
                req,
                solicitudCreada
              );
            }
            Promise.all(detallesProductoBase);
          })
          .catch(function (err) {
            return new Promise(function (fulfill, reject) {
              reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function crearDetalleSolicitudImp(
    detalle,
    solicitudCreada,
    movimientoCreado,
    t,
    req
  ) {
    return Producto.find({
      where: {
        codigo: detalle.productoSolicitado.codigo,
        id_empresa: req.params.id_empresa,
      },
      transaction: t,
      include: [{ model: Clase, as: "tipoProducto" }],
    })
      .then(function (productoEncontrado) {
        return DetalleSolicitudProducto.create(
          {
            id_solicitud: solicitudCreada.id,
            id_producto: productoEncontrado.id,
            cantidad: detalle.cantidad,
          },
          { transaction: t }
        )
          .then(function (detalleCreado) {
            return new Promise(function (fulfill, reject) {
              fulfill();
            });
          })
          .catch(function (err) {
            return new Promise(function (fulfill, reject) {
              reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function crearDetalleSolicitudProductoBaseImp(
    ingrediente,
    detalleCreado,
    movimientoCreado,
    t,
    req,
    solicitudCreada
  ) {
    return Producto.find({
      where: {
        codigo: ingrediente.productoSolicitudBase.codigo,
        id_empresa: req.params.id_empresa,
      },
      transaction: t,
      include: [{ model: Clase, as: "tipoProducto" }],
    })
      .then(function (productoEncontrado) {
        return DetalleSolicitudProductoBase.create(
          {
            id_detalle_solicitud_producto: detalleCreado.id,
            id_producto_base: productoEncontrado.id,
            cantidad_ideal: ingrediente.cantidad_ideal,
            cantidad_real: ingrediente.cantidad_real,
            total: ingrediente.total,
          },
          { transaction: t }
        )
          .then(function (detalleBaseCreado) {
            req.body.detallesBaseIds.push({
              id_detalle_orden_reposicion: ingrediente.detalle_orden_reposicion,
              id_detalle_solicitud_base: detalleBaseCreado.id,
            });
            return DescontarInventarSolicitudProuctoImp(
              productoEncontrado,
              ingrediente.cantidad_real,
              movimientoCreado,
              t,
              req,
              solicitudCreada
            );
          })
          .catch(function (err) {
            return new Promise(function (fulfill, reject) {
              return reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          return reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function DescontarInventarSolicitudProuctoImp(
    producto,
    cantidad,
    movimientoCreado,
    t,
    req,
    solicitudCreada
  ) {
    var condicionInventario = {
      id_producto: producto.id,
      id_almacen: solicitudCreada.id_almacen,
      cantidad: { $gt: 0 },
    };
    /* if (detalleVenta.lote) {
            condicionInventario.lote = detalleVenta.lote
        }
        if (detalleVenta.fecha_vencimiento) {
            var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
            var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);
     
            condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
        } */
    return Inventario.findAll({
      where: condicionInventario,
      transaction: t,
      order: [["id", "asc"]],
    })
      .then(function (InventarioEencontrado) {
        return calcularCostosEgresosImp(
          producto,
          cantidad,
          InventarioEencontrado,
          movimientoCreado,
          t,
          req
        );
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  function calcularCostosEgresosImp(
    producto,
    cantidad,
    inventarios,
    movimientoCreado,
    t,
    req
  ) {
    var promesas = [];
    var cantidadTotal = cantidad;
    if (producto.activar_inventario) {
      if (inventarios !== undefined) {
        if (inventarios.length > 0) {
          var promises = [];
          for (var i = 0; i < inventarios.length; i++) {
            if (cantidadTotal > 0) {
              var cantidadParcial;
              if (cantidadTotal > inventarios[i].cantidad) {
                cantidadParcial = inventarios[i].cantidad;
                cantidadTotal = cantidadTotal - inventarios[i].cantidad;
              } else {
                cantidadParcial = cantidadTotal;
                cantidadTotal = 0;
              }
              if (cantidadParcial > 0) {
                promesas.push(
                  crearMovimientoEgresoYActualizarInventarioImp(
                    movimientoCreado,
                    producto,
                    cantidadParcial,
                    inventarios[i],
                    t,
                    req
                  )
                );
              }
            }
          }
          return Promise.all(promesas);
        } else {
          var err =
            producto.codigo +
            " " +
            producto.nombre +
            " inventarios sin cantidades. ";
          return new Promise(function (fulfill, reject) {
            reject(err.stack !== undefined ? err.stack : err);
          });
        }
      } else {
        var err = producto.codigo + " " + producto.nombre + "sin inventario. ";
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      }
    } else {
      var err = "producto sin activar inventario";
      return new Promise(function (fulfill, reject) {
        reject(err.stack !== undefined ? err.stack : err);
      });
    }
  }

  function crearMovimientoEgresoYActualizarInventarioImp(
    movimientoCreado,
    producto,
    cantidadParcial,
    inventario,
    t,
    req
  ) {
    return DetalleMovimiento.create(
      {
        id_movimiento: movimientoCreado.id,
        id_producto: producto.id,
        cantidad: cantidadParcial,
        costo_unitario: inventario.costo_unitario,
        importe: cantidadParcial * inventario.costo_unitario,
        total: cantidadParcial * inventario.costo_unitario,
        descuento: producto.descuento * cantidadParcial,
        recargo: 0 * cantidadParcial,
        ice: 0 * cantidadParcial,
        excento: 0 * cantidadParcial,
        tipo_descuento: producto.descuento_fijo,
        tipo_recargo: 0,
        // fecha_vencimiento: producto.inventarios[0].fecha_vencimiento,
        //  lote: producto.inventarios[0].lote,
        id_inventario: inventario.id,
      },
      { transaction: t }
    )
      .then(function (detalleMovimientoCreado) {
        return Inventario.find({
          where: {
            id: inventario.id,
          },
          transaction: t,
        })
          .then(function (inventario) {
            if (inventario.cantidad >= cantidadParcial) {
              return Inventario.update(
                {
                  cantidad: inventario.cantidad - cantidadParcial,
                  costo_total:
                    (inventario.cantidad - cantidadParcial) *
                    inventario.costo_unitario,
                },
                {
                  where: {
                    id: inventario.id,
                  },
                  transaction: t,
                }
              )
                .then(function (result) {
                  return new Promise(function (fulfill, reject) {
                    fulfill(result);
                  });
                })
                .catch(function (err) {
                  return new Promise(function (fulfill, reject) {
                    reject(err.stack !== undefined ? err.stack : err);
                  });
                });
            } else {
              return new Promise(function (fulfill, reject) {
                reject(err.stack !== undefined ? err.stack : err);
              });
            }
          })
          .catch(function (err) {
            return new Promise(function (fulfill, reject) {
              reject(err.stack !== undefined ? err.stack : err);
            });
          });
      })
      .catch(function (err) {
        return new Promise(function (fulfill, reject) {
          reject(err.stack !== undefined ? err.stack : err);
        });
      });
  }
  router
    .route(
      "/operaciones-importacion-solicitud-reposicion-almacen/sucursal/:id_sucursal"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let solicitudes = await SolicitudReposicion.findAll({
          where: {
            campamento_sincronizado: false,
            id_solicitud_campamento: { $ne: null },
          },
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [
                {
                  model: Sucursal,
                  as: "sucursal",
                  required: true,
                  where: { id: req.params.id_sucursal },
                },
              ],
            },
          ],
        });

        let ordenes = await GestionOrdenReposicion.findAll({
          where: {
            campamento_sincronizado: false,
            id_orden_reposicion_campamento: { $ne: null },
          },
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [
                {
                  model: Sucursal,
                  as: "sucursal",
                  required: true,
                  where: { id: req.params.id_sucursal },
                },
              ],
            },
          ],
        });

        res.json({ solicitudes: solicitudes, ordenes: ordenes });
      } catch (error) {
        res.json({ error: error });
      }
    });
  router
    .route(
      "/operaciones-importacion-solicitud-reposicion-almacen/cerrar/sucursal/:id_sucursal/fecha/:fecha"
    )
    .post(async function (req, res) {
      try {
        var options = {
          model: GestionOrdenReposicion,
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [{ model: Sucursal, as: "sucursal" }],
            },
          ],
        };
        var fecha = new Date(req.params.fecha)
          .toISOString()
          .replace("T", " ")
          .replace("Z", "");
        Sequelize.Model.$validateIncludedElements(options);
        await sequelize.query(
          "UPDATE `inv_solicitud_reposicion` as solicitud \
                INNER JOIN agil_almacen AS almacen on almacen.id=solicitud.almacen \
                 INNER JOIN agil_sucursal as sucursal on sucursal.id = almacen.sucursal\
                SET solicitud.campamento_sincronizado=true, solicitud.fecha_sincronizado='" +
          fecha +
          "', solicitud.updatedAt=NOW() \
                WHERE solicitud.campamento_sincronizado = false AND sucursal.id=" +
          req.params.id_sucursal +
          " AND solicitud.solicitud_campamento IS NOT NULL;"
        );
        res.json({ mensaje: "datos sincronizados cerrados" });
        var options = {
          model: SolicitudReposicion,
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [{ model: Sucursal, as: "sucursal" }],
            },
          ],
        };
        Sequelize.Model.$validateIncludedElements(options);
        await sequelize.query(
          "UPDATE `agil_gestion_orden_reposicion` as gestion \
                INNER JOIN agil_almacen AS almacen on almacen.id=gestion.almacen \
                 INNER JOIN agil_sucursal as sucursal on sucursal.id = almacen.sucursal\
                SET gestion.campamento_sincronizado=true, gestion.fecha_sincronizado='" +
          fecha +
          "', gestion.updatedAt=NOW() \
                WHERE gestion.campamento_sincronizado = false AND sucursal.id=" +
          req.params.id_sucursal +
          " AND gestion.orden_reposicion_campamento IS NOT NULL;"
        );
        res.json({ mensaje: "datos sincronizados cerrados" });
      } catch (error) {
        res.json({ error: error });
      }
    });
  router
    .route(
      "/venta/ordenes-reposicion/empresa/:id_empresa/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/sucursal/:id_sucursal/almacen/:id_almacen"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let textOrder = "";
        let condicionOrdenReposicion = {
          eliminado: false,
          confirmacion_reposicion: true,
          id_venta: null,
        };
        let condicionAlmacen = { id: req.params.id_almacen };
        /*  if (req.params.fecha_inicio != 0 && req.params.fecha_fin != 0) {
                     var inicio = new Date(req.params.fecha_inicio); inicio.setHours(0, 0, 0, 0);
                     var fin = new Date(req.params.fecha_fin); fin.setHours(23, 59, 59, 59);
                     condicionOrdenReposicion.fecha = { $between: [inicio, fin] };
     
                 } */

        textOrder = req.params.columna + " " + req.params.direccion;

        var datosbusqueda = {
          where: condicionOrdenReposicion,
          include: [
            {
              model: Usuario,
              as: "usuario",
              include: [{ model: Persona, as: "persona" }],
            },
            {
              model: Almacen,
              as: "almacen",
              where: condicionAlmacen,
              include: [
                { model: Sucursal, as: "sucursal", where: { activo: true } },
              ],
            },
          ],
        };
        datosbusqueda.group = ["`agil_gestion_orden_reposicion`.`id`"];
        let count = await GestionOrdenReposicion.count(datosbusqueda);
        if (req.params.items_pagina != "0") {
          textOrder =
            textOrder +
            " limit " +
            req.params.items_pagina * (req.params.pagina - 1) +
            ", " +
            req.params.items_pagina;
        }
        datosbusqueda.order = sequelize.literal(textOrder);
        let ordenesReposiciones = await GestionOrdenReposicion.findAll(
          datosbusqueda
        );
        res.json({
          reposiciones: ordenesReposiciones,
          paginas: Math.ceil(count.length / req.params.items_pagina),
        });
      } catch (err) {
        res.json({ hasErr: true, mensaje: err.stack ? err.stack : err });
      }
    });
  router
    .route(
      "/venta/detalles-ordenes-reposicion/id/:id_reposicion/almacen/:id_almacen"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let condicionDetalle = {
          id_orden_reposicion: req.params.id_reposicion,
          eliminado: false,
        };
        let datosbusqueda = {
          where: condicionDetalle,
          include: [
            {
              model: Producto,
              as: "producto",
              include: [
                {
                  model: Inventario,
                  as: "inventarios",
                  where: {
                    cantidad: { $gt: 0 },
                    id_almacen: req.params.id_almacen,
                  },
                },
                { model: Clase, as: "tipoProducto" },
              ],
            },
            {
              model: DetalleSolicitudProducto,
              as: "detallesSolicitudProductos",
            },
            {
              model: DetalleSolicitudProductoBase,
              as: "detallesSolicitudProductosBase",
            },
          ],

          order: [[{ model: Producto, as: "producto" }, "codigo"]],
        };

        let DetallesordenReposicion =
          await GestionDetalleOrdenReposicion.findAll(datosbusqueda);
        res.json({ detallesReposicion: DetallesordenReposicion });
      } catch (err) {
        res.json({ hasErr: true, mensaje: err.stack ? err.stack : err });
      }
    });
  /* importacion desde almacenes */
  router
    .route(
      "/datos-campamento-almacen-solicitud/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let textOrder = "";
        let condicionSolicitud = {
          fecha_sincronizado: { $ne: null },
        };
        let condicionSucursal =
          req.params.id_sucursal !== "0" ? { id: req.params.id_sucursal } : {};
        textOrder = req.params.columna + " " + req.params.direccion;
        //solicitudes
        let datosbusqueda = {
          where: condicionSolicitud,
          attributes: [
            [
              sequelize.fn(
                "GROUP_CONCAT",
                sequelize.col("`inv_solicitud_reposicion`.`id`")
              ),
              "ids",
            ],
            "fecha_sincronizado",
            "campamento_sincronizado",
          ],
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [
                {
                  model: Sucursal,
                  as: "sucursal",
                  where: condicionSucursal,
                },
              ],
            },
          ],
        };
        datosbusqueda.group = [
          "`inv_solicitud_reposicion`.`fecha_sincronizado`",
        ];

        let countSolicitudes = await SolicitudReposicion.count(datosbusqueda);
        if (req.params.items_pagina != "0") {
          textOrder =
            textOrder +
            " limit " +
            req.params.items_pagina * (req.params.pagina - 1) +
            ", " +
            req.params.items_pagina;
        }
        datosbusqueda.order = sequelize.literal(textOrder);
        let solicitudes = await SolicitudReposicion.findAll(datosbusqueda);
        for (const solcitud of solicitudes) {
          condicionSolicitud.id = { $in: solcitud.dataValues.ids.split(",") };
          (datosbusqueda.attributes = [
            "id",
            "numero_correlativo",
            "fecha_sincronizado",
            "campamento_sincronizado",
          ]),
            (datosbusqueda.group = ["`inv_solicitud_reposicion`.`id`"]);

          solcitud.dataValues.solicitudes = await SolicitudReposicion.findAll(
            datosbusqueda
          );
        }

        res.json({
          solicitudes: solicitudes,
          paginas: Math.ceil(countSolicitudes.length / req.params.items_pagina),
        });
      } catch (err) {
        res.json({ hasErr: true, mensaje: err.stack ? err.stack : err });
      }
    });
  router
    .route(
      "/datos-campamento-almacen-orden/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let textOrder = "";

        //ordenes reposicion
        let condicionOrden = {
          fecha_sincronizado: { $ne: null },
        };
        let condicionSucursal =
          req.params.id_sucursal !== "0" ? { id: req.params.id_sucursal } : {};
        textOrder = req.params.columna + " " + req.params.direccion;
        let datosbusquedaOrden = {
          where: condicionOrden,
          attributes: [
            [
              sequelize.fn(
                "GROUP_CONCAT",
                sequelize.col("`agil_gestion_orden_reposicion`.`id`")
              ),
              "ids",
            ],
            "fecha_sincronizado",
            "campamento_sincronizado",
          ],
          include: [
            {
              model: Almacen,
              as: "almacen",
              include: [
                {
                  model: Sucursal,
                  as: "sucursal",
                  where: condicionSucursal,
                },
              ],
            },
          ],
        };
        datosbusquedaOrden.group = [
          "`agil_gestion_orden_reposicion`.`fecha_sincronizado`",
        ];

        let countOrdenes = await GestionOrdenReposicion.count(
          datosbusquedaOrden
        );

        datosbusquedaOrden.order = sequelize.literal(textOrder);
        let ordenes = await GestionOrdenReposicion.findAll(datosbusquedaOrden);
        for (const orden of ordenes) {
          condicionOrden.id = { $in: orden.dataValues.ids.split(",") };
          (datosbusquedaOrden.attributes = [
            "id",
            "numero_correlativo",
            "fecha_sincronizado",
            "campamento_sincronizado",
          ]),
            (datosbusquedaOrden.group = [
              "`agil_gestion_orden_reposicion`.`id`",
            ]);

          orden.dataValues.ordenes = await GestionOrdenReposicion.findAll(
            datosbusquedaOrden
          );
        }
        res.json({
          ordenes: ordenes,
          paginas: Math.ceil(countOrdenes.length / req.params.items_pagina),
        });
      } catch (err) {
        res.json({ hasErr: true, mensaje: err.stack ? err.stack : err });
      }
    });

  router
    .route(
      "/solicitudes/reporte/desde/:desde/hasta/:hasta/sucursal/:sucursal/almacen/:almacen/:nro_almacen/:detallado"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        var desde, hasta;
        if (req.params.desde == "0") {
          let hoy = new Date();
          let mes = hoy.getMonth() + 1;
          mes = mes < 9 ? "0" + mes : mes;
          desde = new Date().getFullYear() + "-" + mes + "-01 00:00:00";
        } else {
          desde = req.params.desde.split("/").reverse().join("-") + " 00:00:00";
        }
        if (req.params.hasta == "0") {
          let now = new Date();
          hasta =
            now.getFullYear() +
            "-" +
            (now.getMonth() + 1) +
            "-" +
            now.getDate() +
            " 23:59:59";
        } else {
          hasta = req.params.hasta.split("/").reverse().join("-") + " 23:59:59";
        }
        var qry = "";
        if (req.params.detallado == "1") {
          qry +=
            "SELECT suc.id AS id_sucursal, det_mov.id AS id_detalle, alm.id AS id_almacen, grupo.id AS id_grupo, subgrupo.id AS id_subgrupo, prod.id AS id_producto, solrep.numero_correlativo AS doc,solrep.numero_iso_consumo AS doc_iso,suc.nombre AS sucursal,alm.nombre AS almacen,solrep.fecha AS fecha,solrep.descripcion AS observacion, solrep.activo AS activo, solrep.eliminado AS eliminado, usu.nombre_usuario AS usuario,solrep.monto AS monto,estado.nombre AS estado,det_mov.cantidad AS cantidad,det_mov.costo_unitario AS costo, prod.nombre AS producto, prod.descripcion AS detalle,prod.codigo AS codigo, prod.unidad_medida AS unidad,grupo.nombre AS grupo,subgrupo.nombre AS subgrupo,area.nombre AS area FROM inv_solicitud_reposicion solrep LEFT JOIN agil_almacen alm ON alm.id=solrep.almacen LEFT JOIN agil_sucursal suc ON suc.id=alm.sucursal INNER JOIN sys_usuario usu ON usu.id=solrep.usuario LEFT JOIN gl_clase estado ON estado.id=solrep.estado LEFT JOIN inv_detalle_movimiento det_mov ON det_mov.movimiento=solrep.movimiento INNER JOIN agil_producto prod ON prod.id=det_mov.producto LEFT JOIN gl_clase grupo ON grupo.id=prod.grupo LEFT JOIN gl_clase subgrupo ON subgrupo.id=prod.subgrupo LEFT JOIN gl_clase area ON area.id=solrep.area";
          if (
            (desde != "0" && hasta != "0") ||
            req.params.almacen != "0" ||
            req.params.sucursal != "0"
          )
            qry += " WHERE ";
          if (desde != 0 && hasta.length != 0)
            qry += "solrep.fecha BETWEEN '" + desde + "' AND '" + hasta + "'";
          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen != "0"
          )
            qry +=
              " AND suc.id=" +
              req.params.sucursal +
              " AND solrep.almacen=" +
              req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen != "0"
          )
            qry +=
              " suc.id=" +
              req.params.sucursal +
              " AND solrep.almacen=" +
              req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen == "0"
          )
            qry += " suc.id=" + req.params.sucursal;
          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen == "0"
          )
            qry += " AND suc.id=" + req.params.sucursal;
          if (req.params.nro_almacen != "0")
            qry += ` AND alm.numero=${req.params.nro_almacen}`;
          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal == "0" &&
            req.params.almacen != "0"
          )
            qry += " AND solrep.almacen=" + req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal == "0" &&
            req.params.almacen != "0"
          )
            qry += " solrep.almacen=" + req.params.almacen;
          qry += " ORDER BY solrep.fecha ASC";
        } else {
          qry +=
            "SELECT solrep.id AS id, suc.id AS id_sucursal, alm.id AS id_almacen, solrep.numero_correlativo AS doc, solrep.numero_iso_consumo AS doc_iso, solrep.activo AS activo, suc.nombre AS sucursal, alm.nombre AS almacen, solrep.fecha AS fecha, usu.nombre_usuario AS usuario, solrep.monto AS monto, estado.nombre AS estado FROM inv_solicitud_reposicion solrep LEFT JOIN agil_almacen alm ON alm.id=solrep.almacen LEFT JOIN agil_sucursal suc ON suc.id=alm.sucursal INNER JOIN sys_usuario usu ON usu.id=solrep.usuario LEFT JOIN gl_clase estado ON estado.id=solrep.estado ";
          if (
            (desde != "0" && hasta != "0") ||
            req.params.almacen != "0" ||
            req.params.sucursal != "0"
          )
            qry += " WHERE ";
          if (desde != 0 && hasta.length != 0)
            qry += "solrep.fecha BETWEEN '" + desde + "' AND '" + hasta + "'";

          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen != "0"
          )
            qry +=
              " AND suc.id=" +
              req.params.sucursal +
              " AND solrep.almacen=" +
              req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen != "0"
          )
            qry +=
              " suc.id=" +
              req.params.sucursal +
              " AND solrep.almacen=" +
              req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen == "0"
          )
            qry += " suc.id=" + req.params.sucursal;
          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal != "0" &&
            req.params.almacen == "0"
          )
            qry += " AND suc.id=" + req.params.sucursal;
          if (req.params.nro_almacen != "0")
            qry += ` AND alm.numero=${req.params.nro_almacen}`;

          if (
            desde != "0" &&
            hasta != "0" &&
            req.params.sucursal == "0" &&
            req.params.almacen != "0"
          )
            qry += " AND solrep.almacen=" + req.params.almacen;
          if (
            desde == "0" &&
            hasta == "0" &&
            req.params.sucursal == "0" &&
            req.params.almacen != "0"
          )
            qry += " solrep.almacen=" + req.params.almacen;

          qry += " ORDER BY solrep.fecha ASC";
        }
        sequelize
          .query(qry, { type: sequelize.QueryTypes.SELECT })
          .then((data) => {
            res.json({
              hasErr: false,
              mensaje: "datos recuperados con éxito",
              solicitudes: data,
            });
          })
          .catch((data) => {
            res.json({ hasErr: true, mensaje: data.stack ? data.stack : data });
          });
      } catch (err) {
        res.json({ hasErr: true, mensaje: err.stack ? err.stack : err });
      }
    });

  router
    .route("/validar-importar-consumos/empresa/:id_empresa")
    .post(ensureAuthorizedlogged, async function (req, res) {
      var solicitudes = req.body.solicitudes;
      // var detallesNoValidos = ["<span style='color:#dd3333'>No cuenta con la cantidad de inventarios disponibles</span><br/>"];
      var detallesNoValidos = [];
      var solicitudesValidas = [];
      // recorrer ventas
      for (let index = 0; index < solicitudes.length; index++) {
        const solicitud = solicitudes[index];
        // eliminar detalles productos duplicados, convertirlos en unico y dentro agregar sus detalles que son
        var simpleArray = solicitud.detalleSolicitud;
        var helper = {};
        var resultDetalles = await simpleArray.reduce(function (r, o) {
          var key = o.productoSolicitado.codigo;
          if (!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            helper[key].detalles = [];
            helper[key].detalles.push(Object.assign({}, o));
            r.push(helper[key]);
          } else {
            helper[key].cantidad += o.cantidad;
            helper[key].detalles.push(Object.assign({}, o));
          }
          return r;
        }, []);

        // obtener sucursal
        await Sucursal.find({
          where: {
            nombre: solicitud.almacen.sucursal.nombre,
            id_empresa: req.params.id_empresa,
          },
        }).then(async function (sucursal) {
          if (sucursal) {
            if (!sucursal.activo) {
              detallesNoValidos.push(
                "<span style='font-size: 12px;'>Nro Solicitud: " +
                solicitud.numero_solicitud +
                " la Sucursal " +
                sucursal.nombre +
                " de origen está deshabilitada, no se puede hacer cambios. </span><br/>"
              );
              // aqui poner el reponse
              if (index === solicitudes.length - 1) {
                res.json({
                  solicitudes: solicitudesValidas,
                  noValidos: detallesNoValidos,
                });
              }
            } else {
              // obtener almacen
              await Almacen.find({
                where: {
                  nombre: solicitud.almacen.nombre,
                  id_sucursal: sucursal.id,
                },
              }).then(async function (almacenOrigen) {
                // recorrer detalles solicitudes
                var detallesValidos = [];
                if (almacenOrigen) {
                  solicitud.almacen = almacenOrigen;
                  solicitud.almacen.dataValues.sucursal = sucursal;
                  for (let j = 0; j < resultDetalles.length; j++) {
                    const detalle = resultDetalles[j];
                    let productoEncontrado = await Producto.find({
                      where: {
                        codigo: detalle.productoSolicitado.codigo,
                        nombre: detalle.productoSolicitado.nombre,
                        id_empresa: req.params.id_empresa,
                      },
                    });
                    if (productoEncontrado) {
                      detalle.productoSolicitado = productoEncontrado;
                      let encontradoActual = await Inventario.findAll({
                        where: {
                          id_producto: detalle.productoSolicitado.id,
                          id_almacen: solicitud.almacen.id,
                          cantidad: { $gt: 0 },
                        },
                        attributes: [
                          [
                            sequelize.fn("sum", sequelize.col("cantidad")),
                            "cantidadTotal",
                          ],
                        ],
                        group: ["`inv_inventario`.`producto`"],
                        raw: true,
                      });
                      var sumaTotalInventarios =
                        encontradoActual.length > 0
                          ? encontradoActual[0].cantidadTotal
                          : 0;
                      // validar o comprobar si la cantidad de inventarios alcanza
                      if (detalle.cantidad > sumaTotalInventarios) {
                        detallesNoValidos.push(
                          "<span style='font-size: 12px;'>Nro Solicitud: " +
                          solicitud.numero_solicitud +
                          " Item: " +
                          detalle.productoSolicitado.nombre +
                          "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " +
                          detalle.cantidad +
                          "</span><span style='font-size: 12px;color:#dd3333'> disponible: " +
                          sumaTotalInventarios +
                          "</span><br/>"
                        );
                      } else {
                        // detallesValidos.push(...detalle.detalles);
                        if (detalle.cantidad > 0) {
                          detallesValidos.push(detalle);
                        } else {
                          detallesNoValidos.push(
                            "<span style='font-size: 12px;'>Nro Solicitud: " +
                            solicitud.numero_solicitud +
                            " Item: " +
                            detalle.productoSolicitado.nombre +
                            "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " +
                            detalle.cantidad +
                            "</span><span style='font-size: 12px;color:#dd3333'> la cantidad deve ser mayor a cero</span><br/>"
                          );
                        }
                      }

                      if (j === resultDetalles.length - 1) {
                        solicitud.detalleSolicitud = detallesValidos;
                        // comprobar o agregar solo los que tienen detalles con cantidad ====
                        if (solicitud.detalleSolicitud.length > 0) {
                          solicitudesValidas.push(solicitud);
                        }
                      }
                    } else {
                      detallesNoValidos.push(
                        "<span style='font-size: 12px;'>Nro Solicitud: " +
                        solicitud.numero_solicitud +
                        " Item: " +
                        detalle.productoSolicitado.nombre +
                        "</span><span style='font-size: 12px;color:#dd3333'> No se Encontro el item</span><br/>"
                      );
                      if (j === resultDetalles.length - 1) {
                        solicitud.detalleSolicitud = detallesValidos;
                        // comprobar o agregar solo los que tienen detalles con cantidad ====
                        if (solicitud.detalleSolicitud.length > 0) {
                          solicitudesValidas.push(solicitud);
                        }
                      }
                    }
                  }
                } else {
                  detallesNoValidos.push(
                    "<span style='font-size: 12px;'>Nro Solicitud: " +
                    solicitud.numero_solicitud +
                    " el almacen " +
                    solicitud.almacen.nombre +
                    "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>"
                  );
                  // aqui poner el reponse
                  if (index === solicitudes.length - 1) {
                    res.json({
                      solicitudes: solicitudesValidas,
                      noValidos: detallesNoValidos,
                    });
                  }
                }

                // aqui poner el reponse
                if (index === solicitudes.length - 1) {
                  res.json({
                    solicitudes: solicitudesValidas,
                    noValidos: detallesNoValidos,
                  });
                }
              });
            }
          } else {
            detallesNoValidos.push(
              "<span style='font-size: 12px;'>Nro Solicitud: " +
              solicitud.numero_solicitud +
              " la sucursal " +
              solicitud.almacen.sucursal.nombre +
              "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>"
            );
            // aqui poner el reponse
            if (index === solicitudes.length - 1) {
              res.json({
                solicitudes: solicitudesValidas,
                noValidos: detallesNoValidos,
              });
            }
          }
        });
      }

      //res.json({ mensaje: "Importación satisfactoriamente!" });
    });
  router.route("/asignar-cencos").post(async function (req, res) {
    try {
      sequelize
        .transaction(async function (t) {
          let cencos = await Clase.findAll({
            where: { habilitado: true },
            include: [
              {
                model: Tipo,
                as: "tipo",
                where: { nombre_corto: "CENCOS", id_empresa: "35" },
              },
            ],
          });
          for (const cenco of cencos) {
            if (cenco.dataValues.nombre) {
              if (cenco.dataValues.nombre == "ESS-SCZ") {
                cenco.dataValues.nombre = "CASA MATRIZ";
              }
              let solicitudes = await SolicitudReposicion.findAll({
                transaction: t,
                include: [
                  {
                    model: Almacen,
                    as: "almacen",
                    include: [
                      {
                        model: Sucursal,
                        as: "sucursal",
                        where: {
                          nombre: {
                            $like: "%" + cenco.dataValues.nombre.trim() + "%",
                          },
                        },
                      },
                    ],
                  },
                ],
              });
              if (solicitudes.length > 0) {
                for (const soli of solicitudes) {
                  await SolicitudReposicion.update(
                    {
                      id_campo: cenco.dataValues.id,
                    },
                    {
                      where: { id: soli.dataValues.id },
                      transaction: t,
                    }
                  );
                }
              }
            }
          }
          return new Promise(function (fulfill, reject) {
            fulfill("Solicitud actuallizada.");
          });
        })
        .then(function (result) {
          res.json({
            mensaje: "actualizados",
          });
        });
    } catch (error) {
      res.json(error);
    }
  });
  router
    .route("/operaciones/reposiciones/doc-iso/:id/:finalizado")
    .get(ensureAuthorizedlogged, async (req, res) => {
      const { id, finalizado } = req.params;
      if (!id)
        return res.json({
          error: true,
          message: "Parámetros incorrectos",
          messageType: "error",
        });
      try {
        let qry =
          finalizado === "0"
            ? `SELECT r.usar_maximos_fijos,   u.nombre_usuario, cfg.nombre cfg_nombre, cfg.revicion cfg_revision, cfg.codigo cfg_codigo, cfg.fecha_aprobacion cfg_aprobacion, cfg.eliminado cfg_eliminado, cfg.activo cfg_activo, cfg.predefinido cfg_predefinido, cfg.version_impresion cfg_version, suc.nombre sucursal, alm.nombre almacen, r.nro_correlativo_iso_recepcion nro_iso, r.desde, r.hasta, r.createdAt FROM agil_gestion_orden_reposicion_iso r LEFT JOIN agil_almacen alm ON alm.id=r.id_almacen INNER JOIN agil_sucursal suc ON suc.id=alm.sucursal LEFT JOIN agil_configuracion_iso cfg ON cfg.id=r.config_doc_iso_recepcion INNER JOIN sys_usuario u ON u.id=r.id_usuario WHERE r.id_orden=${id} AND r.finalizado=FALSE`
            : `SELECT r.usar_maximos_fijos,  cfg.nombre cfg_nombre,cfg.revicion cfg_revision,cfg.codigo cfg_codigo,cfg.fecha_aprobacion cfg_aprobacion,cfg.eliminado cfg_eliminado,cfg.activo cfg_activo,cfg.predefinido cfg_predefinido,cfg.version_impresion cfg_version,suc.nombre sucursal,alm.nombre almacen,r.desde,r.hasta,r.nro_correlativo_iso_envio nro_iso,u.nombre_usuario,p.nombre_completo responsable_origen, r.createdAt FROM agil_gestion_orden_reposicion_iso r LEFT JOIN agil_almacen alm ON alm.id=r.id_almacen INNER JOIN agil_sucursal suc ON suc.id=alm.sucursal LEFT JOIN agil_configuracion_iso cfg ON cfg.id=r.config_doc_iso_envio INNER JOIN sys_usuario u ON u.id=r.id_usuario INNER JOIN gl_persona p ON p.id=u.persona WHERE r.id_orden=${id} AND r.finalizado=TRUE`;

        let reposicion = await sequelize.query(qry, {
          type: sequelize.QueryTypes.SELECT,
        });
        if (reposicion && reposicion.length === 0)
          return res.json({
            error: true,
            message: "<b>Documento no encotrado</b>",
            messageType: "error",
          });
        let qry2 =
          finalizado === "0"
            ? `SELECT det.cantidad_fijo, prod.codigo, prod.nombre, prod.unidad_medida, det.consumo, det.extra, det.saldo, det.cantidad_maxima, det.observacion FROM agil_gestion_detalle_orden_reposicion_iso det INNER JOIN agil_producto prod ON prod.id=det.id_producto WHERE det.id_orden=${id} AND det.eliminado=FALSE ORDER BY prod.codigo ASC`
            : `SELECT det.cantidad_fijo, prod.codigo,prod.nombre,prod.unidad_medida,det.cantidad,det.extra,det.observacion,det.cantidad_corregida FROM agil_gestion_detalle_orden_reposicion det INNER JOIN agil_producto prod ON prod.id=det.producto WHERE det.orden_reposicion=${id} AND det.eliminado=FALSE AND det.cantidad > 0 ORDER BY prod.codigo ASC`;
        let detalle = await sequelize.query(qry2, {
          type: sequelize.QueryTypes.SELECT,
        });
        if (detalle && detalle.length === 0)
          return res.json({
            error: true,
            message: "<b>Documento no encotrado</b>",
            messageType: "error",
          });
        reposicion[0].detalle = detalle;
        res.json({ error: false, data: reposicion[0] });
      } catch (e) {
        res.json({
          error: true,
          message: "<b>Error al recuperar datos</b><br>" + e,
          messageType: "error",
        });
      }
    });
};
