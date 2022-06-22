module.exports = function (
  router,
  sequelize,
  Sequelize,
  Usuario,
  Cliente,
  Proforma,
  DetallesProformas,
  Servicios,
  Clase,
  Sucursal,
  SucursalActividadDosificacion,
  Dosificacion,
  Empresa,
  Tipo,
  UsuarioSucursal,
  Almacen,
  Venta,
  DetalleVenta,
  Pedido,
  DetallesPedido,
  SolicitudReposicion,
  DetalleSolicitudProducto,
  DetalleSolicitudProductoBase,
  Proveedor,
  Persona,
  Compra,
  Movimiento,
  Inventario,
  DetalleCompra,
  DetalleMovimiento,
  ensureAuthorizedlogged,
  GestionDetalleOrdenReposicion,
  GestionOrdenReposicion,
  Producto,
  UsuarioAlmacen,
  ConfiguracionIso
) {
  router
    .route("/pedido/:id_empresa/:id_pedido")
    .get(ensureAuthorizedlogged, function (req, res) {
      Pedido.find({
        where: { id: req.params.id_pedido },
        include: [
          { model: Clase, as: "formaEntrega" },
          { model: Clase, as: "tipoPago" },
          {
            model: Sucursal,
            as: "sucursal",
            where: { activo: true },
            include: [
              {
                model: Empresa,
                as: "empresa",
                where: { id: req.params.id_empresa },
              },
            ],
          },
          {
            model: SolicitudReposicion,
            as: "solicitud",
            include: [
              {
                model: Almacen,
                as: "almacen",
                include: [
                  { model: Sucursal, as: "sucursal", where: { activo: true } },
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
                      { model: Inventario, as: "inventarios", required: false },
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
                include: [
                  { model: Persona, as: "persona", where: condicionPersona },
                ],
              },
            ],
          },
        ],
      })
        .then(function (pedido) {
          res.json({ pedido: pedido });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack, hasErr: true });
        });
    });
  router
    .route("/pedido/:id_pedido")
    .delete(ensureAuthorizedlogged, function (req, res) {
      Pedido.find({
        where: {
          id: req.params.id_pedido,
        },
        include: [{ model: Clase, as: "estado" }],
      }).then((ped) => {
        Sucursal.find({
          where: {
            id: ped.id_sucursal,
          },
        })
          .then((suc) => {
            if (suc && !suc.activo)
              return res.json({
                mensaje:
                  "Sucursal de pedido deshabilitada, no se puede eliminar.",
              });
            Tipo.find({
              where: {
                nombre_corto: "ESTMODPED",
              },
              include: [
                { model: Clase, as: "clases", where: { eliminado: false } },
              ],
            })
              .then(function (entidad) {
                const estado_parcial = entidad.clases.find(
                  (clase) => clase.nombre === "Parcial"
                );
                const estado_anulado = entidad.clases.find(
                  (clase) => clase.nombre === "Anulado"
                );
                const estado_finalizado = entidad.clases.find(
                  (clase) => clase.nombre === "Finalizado"
                );
                if (estado_parcial.id === ped.id_estado) {
                  Pedido.update(
                    {
                      id_estado: estado_finalizado.id,
                    },
                    {
                      where: { id: ped.id },
                    }
                  ).then(function (actualizado) {
                    res.json({
                      mensaje: "Finalizado satisfactoriamente",
                      estado: estado_finalizado,
                    });
                  });
                } else {
                  Pedido.update(
                    {
                      eliminado: true,
                      id_estado: estado_anulado.id,
                    },
                    {
                      where: { id: ped.id },
                    }
                  ).then(function (actualizado) {
                    res.json({
                      mensaje: "Anulado satisfactoriamente",
                      estado: estado_anulado,
                    });
                  });
                }
              })
              .catch((err) => {
                res.json({ hasErr: true, mensaje: err.stack });
              });
          })
          .catch((err) => {
            res.json({ hasErr: true, mensaje: err.stack });
          });
      });
    });
  router
    .route("/pedido/detalle/:id_detalle")
    .delete(ensureAuthorizedlogged, function (req, res) {
      DetallesPedido.update(
        {
          eliminado: true,
        },
        {
          where: { id: req.params.id_detalle },
        }
      ).then(function (actualizado) {
        res.json({ mensaje: "eliminado satisfactoriamente" });
      });
    });
  router
    .route("/proveedores/:id_empresa")
    .get(ensureAuthorizedlogged, function (req, res) {
      Proveedor.findAll({
        where: { id_empresa: req.params.id_empresa, estado: "V" },
      })
        .then(function (proveedores) {
          res.json({ proveedores: proveedores });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack, hasErr: true });
        });
    });
  function formatearFecha(fecha) {
    var ini = fecha.split("/");
    var formatea = ini[1] + "/" + ini[0] + "/" + ini[2];
    return new Date(formatea);
  }
  router
    .route(
      "/pedidos/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen/direccion/:direccion/columna/:columna"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionPersona = {};
      var condicionProveedor = {};
      var condicionUsuario = {};
      var condicionSucursal = {};
      var condicionTipo = {};
      var condicionEstado = {};
      var condicionPedido = {};
      var condicionAlmacen = {};
      var desde = false;
      var hasta = false;
      if (req.params.desde != "0") {
        req.params.pagina = 1;
        var inicio = formatearFecha(req.params.desde);
        inicio.setHours(0, 0, 0, 0, 0);
        desde = true;
      }
      if (req.params.hasta != "0") {
        req.params.pagina = 1;
        var fin = formatearFecha(req.params.hasta);
        fin.setHours(23, 59, 59, 59);
        hasta = true;
      }
      if (desde && hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $between: [inicio, fin],
        };
      } else if (desde && !hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $gte: [inicio],
        };
      } else if (!desde && hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $lte: [fin],
        };
      }
      if (req.params.id_tipo !== 0) {
      }
      if (req.params.id_proveedor != 0) {
        req.params.pagina = 1;
        condicionPedido.id_proveedor = req.params.id_proveedor;
      }
      if (req.params.dociso != 0) {
        req.params.pagina = 1;
        condicionPedido.numero_iso_orden_compra = parseInt(req.params.dociso);
      }
      if (req.params.nit != 0) {
        req.params.pagina = 1;
        condicionProveedor.nit = req.params.nit;
      }
      if (req.params.id_sucursal != 0) {
        condicionSucursal.id = req.params.id_sucursal;
      }
      if (req.params.id_almacen != 0) {
        condicionAlmacen.id = req.params.id_almacen;
      }
      if (req.params.estado != 0) {
        condicionPedido.id_estado = parseInt(req.params.estado);
      }
      if (req.params.usuario != 0) {
        req.params.pagina = 1;
        condicionUsuario.id = req.params.usuario;
      }
      if (req.params.texto_busqueda != 0) {
        // condicionSucursal.$or = [{ id: { $not: null } }, { nombre: { $like: req.params.texto_busqueda + '%' } }]
        if (isNaN(req.params.texto_busqueda * 1)) {
          condicionProveedor.razon_social = {
            $like: "%" + req.params.texto_busqueda + "%",
          };
        } else {
          condicionPedido.numero_correlativo = parseInt(
            req.params.texto_busqueda
          );
        }
      }
      let textOrder =
        req.params.columna != "factura"
          ? "`agil_pedidos`.`" +
            req.params.columna +
            "` " +
            req.params.direccion
          : req.params.columna + " " + req.params.direccion;

      condicionSucursal.id_empresa = req.params.id_empresa;
      condicionSucursal.activo = true;
      Pedido.findAndCountAll({
        where: condicionPedido,
        include: [
          { model: Clase, as: "formaEntrega" },
          { model: Clase, as: "estado" },
          {
            model: Almacen,
            as: "almacen",
            where: condicionAlmacen,
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                where: condicionSucursal,
              },
            ],
          },
          {
            model: ConfiguracionIso,
            as: "configuracionesIso",
            required: false,
          },
          { model: Clase, as: "tipoPago" },
          {
            model: Compra,
            as: "compra",
          },
          {
            model: Proveedor,
            as: "proveedor",
            where: condicionProveedor,
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
        order: sequelize.literal(textOrder),
        offset: req.params.items_pagina * (req.params.pagina - 1),
        limit: req.params.items_pagina,
      })
        .then(function (pedidos) {
          res.json({
            pedidos: pedidos.rows,
            paginas: Math.ceil(pedidos.count / req.params.items_pagina),
          });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack, hasErr: true });
        });
    });

  router.route("/pedidos/:id_empresa/:id_usuario").post(function (req, res) {
    if (req.body.almacen && req.body.usar_configuracion_iso) {
      var objeto = { id_pedido: 0 };
      sequelize
        .transaction(
          {
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          },
          function (t) {
            req.body.arrayIdsSolicitud = [];
            return Sucursal.find({
              where: { id: req.body.sucursal },
              transaction: t,
            })
              .then(function (sucursalEncontrada) {
                if (!sucursalEncontrada.activo)
                  throw new Error(
                    "Sucursal deshabilitada, no se pueden hacer cambios."
                  );
                return Almacen.find({
                  where: { id: req.body.almacen.id },
                  transaction: t,
                })
                  .then(function (almacenObtenido) {
                    return Pedido.create(
                      {
                        //id_sucursal: req.body.sucursal,
                        id_almacen: req.body.almacen.id,
                        //id_empresa: req.params.id_empresa,
                        id_proveedor: req.body.proveedor.id,
                        // id_compra: req.body.id_compra,
                        id_usuario: req.params.id_usuario,
                        fecha: req.body.fecha,
                        id_estado: req.body.estado.id,
                        numero_correlativo:
                          sucursalEncontrada.numero_correlativo_modulo_pedido,
                        recibido: false,
                        eliminado: false,
                        id_tipo_pago: req.body.tipoPago.id,
                        dias_credito: req.body.dias_credito,
                        total: req.body.total,
                        a_cuenta: req.body.a_cuenta,
                        saldo: req.body.saldo,
                        fecha_recepcion: req.body.fecha_recepcion,
                        id_forma_entrega: req.body.formaEntrega.id,
                        observacion: req.body.observacion,
                        numero_iso_orden_compra: req.body.config_doc_iso
                          ? almacenObtenido.numero_correlativo_iso_orden_compra
                            ? almacenObtenido.numero_correlativo_iso_orden_compra
                            : null
                          : null,
                        config_doc_iso: req.body.config_doc_iso
                          ? req.body.config_doc_iso
                          : null,
                      },
                      {
                        transaction: t,
                      }
                    )
                      .then(async function (pedidoCreado) {
                        objeto.id_pedido = pedidoCreado.id;
                        return Sucursal.update(
                          {
                            numero_correlativo_modulo_pedido:
                              sucursalEncontrada.numero_correlativo_modulo_pedido +
                              1,
                          },
                          { where: { id: req.body.sucursal }, transaction: t }
                        )
                          .then(function (sucursalActualizada) {
                            return Almacen.update(
                              {
                                numero_correlativo_iso_orden_compra:
                                  req.body.config_doc_iso != undefined
                                    ? almacenObtenido.numero_correlativo_iso_orden_compra +
                                      1
                                    : almacenObtenido.numero_correlativo_iso_orden_compra,
                              },
                              {
                                where: { id: req.body.almacen.id },
                                transaction: t,
                              }
                            )
                              .then(function (dataAlmacen) {
                                if (req.body.detallesPedido.length > 0) {
                                  var promises = [];
                                  for (
                                    var index = 0;
                                    index < req.body.detallesPedido.length;
                                    index++
                                  ) {
                                    promises.push(
                                      crearDetallePedido(
                                        pedidoCreado.id,
                                        req.body.detallesPedido[index],
                                        req.params.id_empresa,
                                        t,
                                        req
                                      )
                                    );
                                    // promesas.push(crearDetalleCompra(req.body.detallesPedido[index], movimientoCreado.id, compraCreada.id, compra.almacen, compra.detallesPedido[index].producto.id, compra.sucursal, t));
                                  }
                                  return Promise.all(promises);
                                } else {
                                  return new Promise(function (
                                    fulfill,
                                    reject
                                  ) {
                                    reject(
                                      "No existen detalles para crear el pedido, agrege algunos productos para crear un pedido de productos."
                                    );
                                  });
                                }
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
              })
              .catch(function (err) {
                return new Promise(function (fulfill, reject) {
                  reject(err.stack !== undefined ? err.stack : err);
                });
              });
          }
        )
        .then(async function (result) {
          if (req.body.arrayIdsSolicitud.length > 0) {
            console.log("array", req.body.arrayIdsSolicitud);
            for (var i = 0; i < req.body.arrayIdsSolicitud.length; i++) {
              var id = req.body.arrayIdsSolicitud[i];
              var SolRepoEncontrada = await SolicitudReposicion.find({
                where: { id: id },
                include: [
                  {
                    model: DetalleSolicitudProducto,
                    as: "solicitudesProductos",
                  },
                ],
              });
              todosconDetalleOrden =
                SolRepoEncontrada.solicitudesProductos.find(function (x) {
                  return x.id_detalle_orden_reposicion == null;
                });
              if (todosconDetalleOrden != undefined) {
                var bandera = false;
                //si los detalles de orden reposisicion ya estan en pedido
                for (
                  var j = 0;
                  j < SolRepoEncontrada.solicitudesProductos.length;
                  j++
                ) {
                  var x = SolRepoEncontrada.solicitudesProductos[j];
                  element = await GestionDetalleOrdenReposicion.find({
                    where: { id: x.id_detalle_orden_reposicion },
                  });
                  if (
                    element.id_detalle_pedido != null &&
                    element.eliminado == false
                  ) {
                    bandera = true;
                  }
                  if (j === SolRepoEncontrada.solicitudesProductos.length - 1) {
                    if (bandera) {
                      estadoParcial = await Clase.find({
                        where: { nombre_corto: "PARCIAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoParcial.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          id_pedido: objeto.id_pedido,
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    }
                  }
                }
              } else {
                var bandera = false;
                //si alguno de los detalles de orden reposisicion no estan en pedido
                for (
                  var j = 0;
                  j < SolRepoEncontrada.solicitudesProductos.length;
                  j++
                ) {
                  var x = SolRepoEncontrada.solicitudesProductos[j];
                  var element = await GestionDetalleOrdenReposicion.find({
                    where: { id: x.id_detalle_orden_reposicion },
                  });
                  if (
                    element.id_detalle_pedido == null &&
                    element.eliminado == false
                  ) {
                    bandera = true;
                  }
                  if (j === SolRepoEncontrada.solicitudesProductos.length - 1) {
                    if (!bandera) {
                      var estadoTotal = await Clase.find({
                        where: { nombre_corto: "TOTAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      var ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoTotal.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          id_pedido: objeto.id_pedido,
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    } else {
                      var estadoParcial = await Clase.find({
                        where: { nombre_corto: "PARCIAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      var ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoParcial.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          id_pedido: objeto.id_pedido,
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    }
                  }
                }
              }
            }
          } else {
            res.json({
              id_pedido: objeto.id_pedido,
              mensaje: "Pedido creado satisfactoriamente!",
            });
          }
        })
        .catch(function (err) {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
          });
        });
    } else {
      sequelize
        .transaction(function (t) {
          req.body.arrayIdsSolicitud = [];
          return Sucursal.find({
            where: { id: req.body.sucursal },
            transaction: t,
          })
            .then(function (sucursalEncontrada) {
              if (!sucursalEncontrada.activo)
                throw new Error(
                  "Sucursal deshabilitada, no se pueden hacer cambios."
                );
              return Pedido.create(
                {
                  //id_sucursal: req.body.sucursal,
                  id_almacen: req.body.almacen.id,
                  //id_empresa: req.params.id_empresa,
                  id_proveedor: req.body.proveedor.id,
                  // id_compra: req.body.id_compra,
                  id_usuario: req.params.id_usuario,
                  fecha: req.body.fecha,
                  id_estado: req.body.estado.id,
                  numero_correlativo:
                    sucursalEncontrada.numero_correlativo_modulo_pedido,
                  recibido: false,
                  eliminado: false,
                  id_tipo_pago: req.body.tipoPago.id,
                  dias_credito: req.body.dias_credito,
                  total: req.body.total,
                  a_cuenta: req.body.a_cuenta,
                  saldo: req.body.saldo,
                  fecha_recepcion: req.body.fecha_recepcion,
                  id_forma_entrega: req.body.formaEntrega.id,
                  observacion: req.body.observacion,
                  numero_iso_orden_compra:
                    almacenObtenido.numero_correlativo_iso_orden_compra
                      ? almacenObtenido.numero_correlativo_iso_orden_compra
                      : 0,
                  config_doc_iso: req.body.config_doc_iso
                    ? req.body.config_doc_iso
                    : null,
                },
                {
                  transaction: t,
                }
              )
                .then(function (pedidoCreado) {
                  return Sucursal.update(
                    {
                      numero_correlativo_modulo_pedido:
                        sucursalEncontrada.numero_correlativo_modulo_pedido + 1,
                    },
                    { where: { id: req.body.sucursal }, transaction: t }
                  )
                    .then(function (sucursalActualizada) {
                      if (req.body.detallesPedido.length > 0) {
                        var promises = [];
                        for (
                          var index = 0;
                          index < req.body.detallesPedido.length;
                          index++
                        ) {
                          promises.push(
                            crearDetallePedido(
                              pedidoCreado.id,
                              req.body.detallesPedido[index],
                              req.params.id_empresa,
                              t,
                              req
                            )
                          );
                          // promesas.push(crearDetalleCompra(req.body.detallesPedido[index], movimientoCreado.id, compraCreada.id, compra.almacen, compra.detallesPedido[index].producto.id, compra.sucursal, t));
                        }
                        return Promise.all(promises);
                      } else {
                        return new Promise(function (fulfill, reject) {
                          reject(
                            "No existen detalles para crear el pedido, agrege algunos productos para crear un pedido de productos."
                          );
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
            })
            .catch(function (err) {
              return new Promise(function (fulfill, reject) {
                reject(err.stack !== undefined ? err.stack : err);
              });
            });
        })
        .then(async function (result) {
          console.log(req.body.arrayIdsSolicitud);
          if (req.body.arrayIdsSolicitud.length > 0) {
            for (var i = 0; i < req.body.arrayIdsSolicitud.length; i++) {
              var id = req.body.arrayIdsSolicitud[i];
              var SolRepoEncontrada = await SolicitudReposicion.find({
                where: { id: id },
                include: [
                  {
                    model: DetalleSolicitudProducto,
                    as: "solicitudesProductos",
                  },
                ],
              });
              todosconDetalleOrden =
                SolRepoEncontrada.solicitudesProductos.find(function (x) {
                  return x.id_detalle_orden_reposicion == null;
                });
              if (todosconDetalleOrden != undefined) {
                var bandera = false;
                //si los detalles de orden reposisicion ya estan en pedido
                for (
                  var j = 0;
                  j < SolRepoEncontrada.solicitudesProductos.length;
                  j++
                ) {
                  var x = SolRepoEncontrada.solicitudesProductos[j];
                  element = await GestionDetalleOrdenReposicion.find({
                    where: { id: x.id_detalle_orden_reposicion },
                  });
                  if (
                    element.id_detalle_pedido != null &&
                    element.eliminado == false
                  ) {
                    bandera = true;
                  }
                  if (j === SolRepoEncontrada.solicitudesProductos.length - 1) {
                    if (bandera) {
                      estadoParcial = await Clase.find({
                        where: { nombre_corto: "PARCIAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoParcial.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    }
                  }
                }
              } else {
                var bandera = false;
                //si alguno de los detalles de orden reposisicion no estan en pedido
                for (
                  var j = 0;
                  j < SolRepoEncontrada.solicitudesProductos.length;
                  j++
                ) {
                  var x = SolRepoEncontrada.solicitudesProductos[j];
                  var element = await GestionDetalleOrdenReposicion.find({
                    where: { id: x.id_detalle_orden_reposicion },
                  });
                  if (
                    element.id_detalle_pedido == null &&
                    element.eliminado == false
                  ) {
                    bandera = true;
                  }
                  if (j === SolRepoEncontrada.solicitudesProductos.length - 1) {
                    if (!bandera) {
                      var estadoTotal = await Clase.find({
                        where: { nombre_corto: "TOTAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      var ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoTotal.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    } else {
                      var estadoParcial = await Clase.find({
                        where: { nombre_corto: "PARCIAL" },
                        include: [
                          {
                            model: Tipo,
                            as: "tipo",
                            where: { nombre_corto: "GESTION_ESR" },
                          },
                        ],
                      });
                      var ActualizadoRepo = await SolicitudReposicion.update(
                        {
                          id_estado: estadoParcial.id,
                        },
                        {
                          where: { id: SolRepoEncontrada.id },
                        }
                      );
                      if (i === req.body.arrayIdsSolicitud.length - 1) {
                        res.json({
                          mensaje: "Pedido creado satisfactoriamente!",
                        });
                      }
                    }
                  }
                }
              }
            }
          } else {
            res.json({ mensaje: "Pedido creado satisfactoriamente!" });
          }
        })
        .catch(function (err) {
          res.json({
            mensaje: err.stack !== undefined ? err.stack : err,
            hasErr: true,
          });
        });
    }
  });

  function crearDetallePedido(pedido, detalle, empresa, t, req) {
    if (detalle.eliminarReposicion) {
      return GestionDetalleOrdenReposicion.update(
        {
          eliminado: true,
        },
        { where: { id: detalle.id_detalle_orden_reposicion }, transaction: t }
      ).then(function (detalleActualizado) {
        return GestionOrdenReposicion.find({
          include: [
            {
              model: GestionDetalleOrdenReposicion,
              as: "detallesOrdenReposicion",
              where: { id: detalle.id_detalle_orden_reposicion },
            },
          ],
          transaction: t,
        }).then(function (OrdenREpoEncontrada) {
          return GestionOrdenReposicion.find({
            where: { id: OrdenREpoEncontrada.id },
            transaction: t,
            include: [
              {
                model: GestionDetalleOrdenReposicion,
                as: "detallesOrdenReposicion",
                include: [
                  {
                    model: DetalleSolicitudProducto,
                    as: "detallesSolicitudProductos",
                  },
                ],
              },
            ],
          }).then(function (dato) {
            dato.detallesOrdenReposicion.forEach(function (x) {
              x.detallesSolicitudProductos.forEach(function (y) {
                if (req.body.arrayIdsSolicitud.length > 0) {
                  var bandera = false;
                  for (var i = 0; i < req.body.arrayIdsSolicitud.length; i++) {
                    var element = req.body.arrayIdsSolicitud[i];
                    if (element === y.id_solicitud) {
                      bandera = true;
                    }
                  }
                  if (!bandera) {
                    req.body.arrayIdsSolicitud.push(y.id_solicitud);
                  }
                } else {
                  req.body.arrayIdsSolicitud.push(y.id_solicitud);
                }
              });
            });
          });
        });
      });
    } else {
      return DetallesPedido.create(
        {
          id_pedido: pedido,
          //id_empresa: empresa,
          id_producto: detalle.producto.id,
          cantidad:
            (detalle.cantidad && parseFloat(detalle.cantidad)) ||
            parseFloat("0"),
          recibido: false,
          eliminado: false,
          id_solicitud: detalle.solicitud,
          observacion: detalle.observacion,
          costo_unitario: detalle.precio_unitario
            ? detalle.precio_unitario
            : detalle.costo_unitario,
          id_codigo_equipo: detalle.codigoEquipo
            ? detalle.codigoEquipo.id
            : null,
          saldo_inventario: detalle.saldo_inventario,
        },
        {
          transaction: t,
        }
      )
        .then(function (detallecreado) {
          if (detalle.id_detalle_orden_reposicion) {
            return GestionDetalleOrdenReposicion.update(
              {
                id_detalle_pedido: detallecreado.id,
              },
              {
                where: { id: detalle.id_detalle_orden_reposicion },
                transaction: t,
              }
            ).then(function (detalleActualizado) {
              return GestionOrdenReposicion.find({
                include: [
                  {
                    model: GestionDetalleOrdenReposicion,
                    as: "detallesOrdenReposicion",
                    where: { id: detalle.id_detalle_orden_reposicion },
                  },
                ],
                transaction: t,
              }).then(function (OrdenREpoEncontrada) {
                return GestionOrdenReposicion.find({
                  where: { id: OrdenREpoEncontrada.id },
                  transaction: t,
                  include: [
                    {
                      model: GestionDetalleOrdenReposicion,
                      as: "detallesOrdenReposicion",
                      include: [
                        {
                          model: DetalleSolicitudProducto,
                          as: "detallesSolicitudProductos",
                        },
                      ],
                    },
                  ],
                }).then(function (dato) {
                  dato.detallesOrdenReposicion.forEach(function (x) {
                    x.detallesSolicitudProductos.forEach(function (y) {
                      if (req.body.arrayIdsSolicitud.length > 0) {
                        var bandera = false;
                        for (
                          var i = 0;
                          i < req.body.arrayIdsSolicitud.length;
                          i++
                        ) {
                          var element = req.body.arrayIdsSolicitud[i];
                          if (element === y.id_solicitud) {
                            bandera = true;
                          }
                        }
                        if (!bandera) {
                          req.body.arrayIdsSolicitud.push(y.id_solicitud);
                        }
                      } else {
                        req.body.arrayIdsSolicitud.push(y.id_solicitud);
                      }
                    });
                  });
                });
              });
            });
          }
        })
        .catch(function (err) {
          return new Promise(function (fulfill, reject) {
            reject(err.stack !== undefined ? err.stack : err);
          });
        });
    }
  }
  router
    .route("/pedido/producto/inventarios/:id_producto/:id_almacen")
    .get(ensureAuthorizedlogged, function (req, res) {
      Inventario.findAll({
        where: {
          id_producto: req.params.id_producto,
          id_almacen: req.params.id_almacen,
          cantidad: { $gte: 0 },
        },
      }).then(function (inventarios) {
        res.json(inventarios);
      });
    });
  router
    .route(
      "/pedido/ultimo-precio-compra-producto/:id_producto/:id_almacen/:id_sucursal"
    )
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let detalleProductoAlmacen = await DetalleCompra.findAll({
          where: {
            id_producto: req.params.id_producto,
          },
          include: [
            {
              model: Compra,
              as: "compra",
              where: { id_almacen: req.params.id_almacen },
              include: [
                { model: Proveedor, as: "proveedor" },
                {
                  model: Movimiento,
                  as: "movimiento",

                  include: [
                    {
                      model: Clase,
                      as: "clase",
                      where: {
                        nombre_corto: {
                          $in: ["ID", "IPCSF", "IPI", "IPRS", "IPRB"],
                        },
                      },
                    },
                  ],
                }
              ],
            },
          ],
          limit: 1,
          order: [["createdAt", "DESC"]],
        });
        let detalleProductoSucursal = await DetalleCompra.findAll({
          where: {
            id_producto: req.params.id_producto,
          },
          include: [
            {
              model: Compra,
              as: "compra",
              include: [
                {
                  model: Movimiento,
                  as: "movimiento",

                  include: [
                    {
                      model: Clase,
                      as: "clase",
                      where: {
                        nombre_corto: {
                          $in: ["ID", "IPCSF", "IPI", "IPRS", "IPRB"],
                        },
                      },
                    },
                  ],
                },
                { model: Proveedor, as: "proveedor" },
                {
                  model: Almacen,
                  as: "almacen",
                  include: [
                    {
                      model: Sucursal,
                      as: "sucursal",
                      where: { id: req.params.id_sucursal },
                    },
                  ],
                },
              ],
            },
          ],
          limit: 1,
          order: [["createdAt", "DESC"]],
        });
        res.json({
          precios: {
            almacen: detalleProductoAlmacen[0],
            sucursal: detalleProductoSucursal[0],
          },
        });
      } catch (err) {
        res.json({ hasError: true, message: err.stack ? err.stack : err });
      }
    });
  router
    .route("/editar/orden/compra/:id_usuario")
    .post(ensureAuthorizedlogged, async (req, res) => {
      const transaction = await sequelize.transaction();
      try {
        const pedidoActualizado = Pedido.update(
          {
            id_proveedor: req.body.proveedor.id,
            total: req.body.total,
            id_tipo_pago: req.body.tipoPago.id,
          },
          {
            where: {
              id: req.body.id,
            },
            transaction: transaction,
          }
        );
        for (let index = 0; index < req.body.detallesPedido.length; index++) {
          if (req.body.detallesPedido[index].id) {
            const detallesActualizados = await DetallesPedido.update(
              {
                eliminado: req.body.detallesPedido[index].eliminado,
                cantidad:
                  (req.body.detallesPedido[index].cantidad &&
                    parseFloat(req.body.detallesPedido[index].cantidad)) ||
                  parseFloat("0"),
                costo_unitario:
                  (req.body.detallesPedido[index].cantidad &&
                    parseFloat(
                      req.body.detallesPedido[index].costo_unitario
                    )) ||
                  parseFloat("0"),
              },
              {
                where: { id: req.body.detallesPedido[index].id },
                transaction: transaction,
              }
            );
            const actualizadoCorrectamente =
              (detallesActualizados[0] && detallesActualizados[0]) || false;
            if (!actualizadoCorrectamente)
              throw new Error(
                "Uno de los detalles no se pudo actualizar, no se realizó ningún cambio."
              );
          } else {
            const detalleCreado = await DetallesPedido.create(
              {
                id_pedido: req.body.id,
                id_producto: req.body.detallesPedido[index].producto.id,
                cantidad:
                  (req.body.detallesPedido[index].cantidad &&
                    parseFloat(req.body.detallesPedido[index].cantidad)) ||
                  parseFloat("0"),
                recibido: false,
                eliminado: false,
                id_solicitud: req.body.detallesPedido[index].solicitud,
                observacion: req.body.detallesPedido[index].observacion,
                costo_unitario:
                  (req.body.detallesPedido[index].costo_unitario &&
                    parseFloat(
                      req.body.detallesPedido[index].costo_unitario
                    )) ||
                  parseFloat("0"),
                id_codigo_equipo: req.body.detallesPedido[index].codigoEquipo
                  ? req.body.detallesPedido[index].codigoEquipo.id
                  : null,
                saldo_inventario:
                  req.body.detallesPedido[index].saldo_inventario,
              },
              {
                transaction: transaction,
              }
            );
            const creadoSatisfactoriamente =
              (detalleCreado && detalleCreado.id) || false;
            if (!creadoSatisfactoriamente)
              throw new Error(
                "Uno de los detalles no se pudo crear, no se realizó ningún cambio."
              );
          }
        }
        transaction.commit();
        res.json({ mensaje: "Actualizado satisfactoriamente." });
      } catch (err) {
        transaction.rollback();
        res.json({ mensaje: err.stack, hasErr: true });
      }
    });

  router
    .route(
      "/pedidos-detalles/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen"
    )
    .get(ensureAuthorizedlogged, function (req, res) {
      var condicionProveedor = {};
      var condicionUsuario = {};
      var condicionSucursal = {};
      var condicionPedido = {};
      var condicionAlmacen = {};
      var desde = false;
      var hasta = false;
      if (req.params.desde != "0") {
        req.params.pagina = 1;
        var inicio = formatearFecha(req.params.desde);
        inicio.setHours(0, 0, 0, 0, 0);
        desde = true;
      }
      if (req.params.hasta != "0") {
        req.params.pagina = 1;
        var fin = formatearFecha(req.params.hasta);
        fin.setHours(23, 59, 59, 59);
        hasta = true;
      }
      if (desde && hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $between: [inicio, fin],
        };
      } else if (desde && !hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $gte: [inicio],
        };
      } else if (!desde && hasta) {
        req.params.pagina = 1;
        condicionPedido.fecha = {
          $lte: [fin],
        };
      }
      if (req.params.id_tipo !== 0) {
      }
      if (req.params.id_proveedor != 0) {
        req.params.pagina = 1;
        condicionPedido.id_proveedor = req.params.id_proveedor;
      }
      if (req.params.dociso != 0) {
        req.params.pagina = 1;
        condicionPedido.numero_iso_orden_compra = parseInt(req.params.dociso);
      }
      if (req.params.nit != 0) {
        req.params.pagina = 1;
        condicionProveedor.nit = req.params.nit;
      }
      if (req.params.id_sucursal != 0) {
        condicionSucursal.id = req.params.id_sucursal;
      }
      if (req.params.id_almacen != 0) {
        condicionAlmacen.id = req.params.id_almacen;
      }
      if (req.params.estado != 0) {
        condicionPedido.id_estado = parseInt(req.params.estado);
      }
      if (req.params.usuario != 0) {
        req.params.pagina = 1;
        condicionUsuario.id = req.params.usuario;
      }
      if (req.params.texto_busqueda != 0) {
        // condicionSucursal.$or = [{ id: { $not: null } }, { nombre: { $like: req.params.texto_busqueda + '%' } }]
        if (isNaN(req.params.texto_busqueda * 1)) {
          condicionProveedor.razon_social = {
            $like: "%" + req.params.texto_busqueda + "%",
          };
        } else {
          condicionPedido.numero_correlativo = parseInt(
            req.params.texto_busqueda
          );
        }
      }

      condicionSucursal.id_empresa = req.params.id_empresa;
      condicionSucursal.activo = true;
      Pedido.findAndCountAll({
        where: condicionPedido,
        include: [
          { model: Clase, as: "formaEntrega" },
          { model: Clase, as: "estado" },
          {
            model: Almacen,
            as: "almacen",
            where: condicionAlmacen,
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                where: condicionSucursal,
              },
            ],
          },
          {
            model: DetallesPedido,
            as: "detallesPedido",
            include: [
              { model: Producto, as: "producto", required: true },
              { model: Producto, as: "codigoEquipo", required: false },
            ],
            where: { eliminado: false },
          },
          {
            model: ConfiguracionIso,
            as: "configuracionesIso",
            required: false,
          },
          { model: Clase, as: "tipoPago" },
          {
            model: Compra,
            as: "compra",
          },
          {
            model: Proveedor,
            as: "proveedor",
            where: condicionProveedor,
          },
          {
            model: Usuario,
            as: "usuario",
            include: [{ model: Persona, as: "persona" }],
          },
        ],
        order: [["fecha", "DESC"]],
        offset: req.params.items_pagina * (req.params.pagina - 1),
        limit: req.params.items_pagina,
      })
        .then(function (pedidos) {
          res.json({
            pedidos: pedidos.rows,
            paginas: Math.ceil(pedidos.count / req.params.items_pagina),
          });
        })
        .catch(function (err) {
          res.json({ mensaje: err.stack, hasErr: true });
        });
    });
};
