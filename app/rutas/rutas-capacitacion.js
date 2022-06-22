module.exports = function (
  router,
  sequelize,
  Sequelize,
  fs,
  ensureAuthorizedlogged,
  decodeBase64Image,
  Usuario,
  Clase,
  MedicoPaciente,
  Persona,
  Empresa,
  RrhhEmpleadoFicha,
  ModelosCapacitacion
) {
  router
    .route("/capacitacion/empresa/:id_empresa")
    .post(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        const capacitacionCreada =
          await ModelosCapacitacion.Capacitacion.create({
            id_usuario: req.body.id_usuario,
            id_empresa: req.params.id_empresa,
            curso: req.body.curso,
            fecha: req.body.fecha,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            descripcion: req.body.descripcion,
            id_tipo_curso: req.body.id_tipo_curso,
            id_ponderacion: req.body.id_ponderacion,
            id_certificado: req.body.id_certificado,
            duracion: req.body.duracion
          }, {
            transaction
          });
        for (const docente of req.body.docentes) {
          await ModelosCapacitacion.Docente.create({
            id_capacitacion: capacitacionCreada.id,
            detalle_docente: docente.detalle_docente,
          }, {
            transaction
          });
        }
        await transaction.commit();
        res.json({
          mensaje: "Creado satisfactoriamente!"
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    })
    .put(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        await ModelosCapacitacion.Capacitacion.update({
          curso: req.body.curso,
          fecha_inicio: req.body.fecha_inicio,
          fecha_fin: req.body.fecha_fin,
          descripcion: req.body.descripcion,
          id_tipo_curso: req.body.id_tipo_curso,
          id_ponderacion: req.body.id_ponderacion,
          id_certificado: req.body.id_certificado,
          duracion: req.body.duracion
        }, {
          where: {
            id: req.body.id
          },
          transaction,
        });
        for (const docente of req.body.docentes) {
          if (!docente.id) {
            await ModelosCapacitacion.Docente.create({
              id_capacitacion: req.body.id,
              detalle_docente: docente.detalle_docente,
            }, {
              transaction
            });
          } else if (!docente.eliminado) {
            await ModelosCapacitacion.Docente.update({
              detalle_docente: docente.detalle_docente
            }, {
              where: {
                id: docente.id
              },
              transaction,
            });
          } else {
            await ModelosCapacitacion.Docente.update({
              eliminado: true,
            }, {
              where: {
                id: docente.id
              },
              transaction,
            });
          }
        }
        await transaction.commit();
        res.json({
          mensaje: "Actualizado satisfactoriamente!"
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    })
    .delete(ensureAuthorizedlogged, async (req, res) => {
      try {
        await ModelosCapacitacion.Capacitacion.update({
          eliminado: true,
        }, {
          where: {
            id: req.body.id
          },
        });
        res.json({
          mensaje: "Actualizado satisfactoriamente!"
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route(
      "/capacitacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionCapacitacion = {
          eliminado: false
        };

        if (req.params.texto_busqueda != 0) {
          condicionCapacitacion = {
            eliminado: false,
            $and: [{
              $or: [
                sequelize.where(sequelize.col("`curso`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`descripcion`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        if (req.params.inicio !== '0' && req.params.fin !== '0') {
          let fecha_inicio = new Date(req.params.inicio);
          let fecha_fin = new Date(req.params.fin);
          condicionCapacitacion.fecha_inicio = {
            $between: [fecha_inicio, fecha_fin]
          }
        }
        let ordenArreglo = [];
        let condicionPagina = {
          offset: req.params.items_pagina * (req.params.pagina - 1),
          limit: parseInt(req.params.items_pagina),
          where: condicionCapacitacion,
          include: [{
            model: ModelosCapacitacion.Docente,
            as: "docentes",
            required: false,
            where: {
              eliminado: false
            },
          },
          {
            model: Usuario,
            as: "usuario",
            where:{id_empresa:req.params.id_empresa}
          },
          {
            model: ModelosCapacitacion.Ponderacion,
            as: "ponderacion",
          },
          {
            model: Clase,
            as: "tipoCurso",
            required: true
          },
          {
            model: ModelosCapacitacion.Certificado,
            as: "certificado",
          },
          {
            model: ModelosCapacitacion.Empleado,
            as: "empleados",
            required: false,
            include: [{
              model: MedicoPaciente, as: 'empleado',
              include: [{
                model: Persona, as: 'persona'
              }]
            }]
          },
          ],
          order: [],
        };
        if (req.params.items_pagina == "0") {
          delete condicionPagina.offset;
          delete condicionPagina.limit;
        }
        ordenArreglo.push(req.params.columna);
        ordenArreglo.push(req.params.direccion);
        condicionPagina.order.push(ordenArreglo);

        const data = await ModelosCapacitacion.Capacitacion.findAndCountAll(
          condicionPagina
        );

        res.json({
          capacitaciones: data.rows,
          paginas: Math.ceil(data.count / req.params.items_pagina),
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route(
      "/capacitacion/empresa/:id_empresa/inicio/:inicio/fin/:fin/detallado/:detallado"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionCapacitacion = {
          eliminado: false
        };
        if (req.params.inicio !== '0' && req.params.fin !== '0') {
          let fecha_inicio = new Date(req.params.inicio);
          let fecha_fin = new Date(req.params.fin);
          condicionCapacitacion.fecha_inicio = {
            $between: [fecha_inicio, fecha_fin]
          }
        }
        let condicionBusqueda = {
          where: condicionCapacitacion,
          include: [{
            model: ModelosCapacitacion.Docente,
            as: "docentes",
            where: {
              eliminado: false
            },
          },
          {
            model: Clase,
            as: "tipoCurso",
          },
          {
            model: ModelosCapacitacion.Ponderacion,
            as: "ponderacion",
          },
          {
            model: ModelosCapacitacion.Empleado,
            as: "empleados",
            required: false,
          },
          ],
        };

        let data = [];
        if (req.params.detallado != 0) {
          let condicionBusquedaDetallada = {
            include: [{
              model: ModelosCapacitacion.Capacitacion,
              as: 'capacitacionesCurso',
              where: condicionCapacitacion,
              include: [{
                model: ModelosCapacitacion.Docente,
                as: "docentes",
                where: {
                  eliminado: false
                },
              },
              {
                model: Clase,
                as: "tipoCurso",
              },
              {
                model: ModelosCapacitacion.Ponderacion,
                as: "ponderacion",
              },
              {
                model: ModelosCapacitacion.Empleado,
                as: "empleados",
                required: false,
              },
              ],
            }],
          };
          data = await Clase.findAll(
            condicionBusquedaDetallada
          );
        } else {
          data = await ModelosCapacitacion.Capacitacion.findAll(
            condicionBusqueda
          );
        }

        res.json({
          detalles: data,
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion-ponderacion/empresa/:id_empresa")
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let ponderaciones = await ModelosCapacitacion.Ponderacion.findAll({
          where: {
            eliminado: false,
            habilitado: true
          },
        });
        res.json({
          ponderaciones: ponderaciones
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    })
    .post(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        const ponderacion = req.body;
        let mensaje = "Guarado satisfactoriamente!";
        if (!ponderacion.id) {
          await ModelosCapacitacion.Ponderacion.create({
            id_empresa: req.params.id_empresa,
            nombre: ponderacion.nombre,
            nota_maxima: ponderacion.nota_maxima.toString(),
            nota_minima: ponderacion.nota_minima.toString(),
            numerico: ponderacion.numerico,
          }, {
            transaction
          });
        } else if (!ponderacion.eliminado) {
          await ModelosCapacitacion.Ponderacion.update({
            nombre: ponderacion.nombre,
            nota_maxima: ponderacion.nota_maxima.toString(),
            nota_minima: ponderacion.nota_minima.toString(),
            numerico: ponderacion.numerico,
            habilitado: ponderacion.habilitado,
          }, {
            where: {
              id: ponderacion.id
            },
            transaction,
          });
          mensaje = "Actualizado satisfactoriamente!";
        } else if (ponderacion.eliminado) {
          await ModelosCapacitacion.Ponderacion.update({
            eliminado: true,
          }, {
            where: {
              id: ponderacion.id
            },
            transaction,
          });

          mensaje = "Eliminado satisfactoriamente!";
        }
        await transaction.commit();
        res.json({
          mensaje: mensaje
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route(
      "/capacitacion-ponderacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionPonderacion = {};

        if (req.params.texto_busqueda != 0) {
          condicionPonderacion = {
            $and: [{
              $or: [
                sequelize.where(sequelize.col("`nombre`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`nota_minima`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`nota_maxima`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        let ordenArreglo = [];
        let condicionPagina = {
          offset: req.params.items_pagina * (req.params.pagina - 1),
          limit: parseInt(req.params.items_pagina),
          where: condicionPonderacion,
          order: [],
        };
        if (req.params.items_pagina == "0") {
          delete condicionPagina.offset;
          delete condicionPagina.limit;
        }
        ordenArreglo.push(req.params.columna);
        ordenArreglo.push(req.params.direccion);
        condicionPagina.order.push(ordenArreglo);
        const data = await ModelosCapacitacion.Ponderacion.findAndCountAll(
          condicionPagina
        );

        res.json({
          ponderaciones: data.rows,
          paginas: Math.ceil(data.count / req.params.items_pagina),
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion-calificacion/empresa/:id_empresa")
    .post(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        const calificacion = req.body;
        let mensaje = "Guarado satisfactoriamente!";
        let calificacionNueva = {};
        if (calificacion.eliminado) {
          calificacionNueva = await ModelosCapacitacion.Calificacion.update({
            eliminado: true,
          }, {
            where: {
              id: calificacion.id
            },
            transaction
          });
          mensaje = "Eliminado satisfactoriamente!";
        } else {
          if (!calificacion.id) {
            calificacionNueva = await ModelosCapacitacion.Calificacion.create({
              id_ponderacion: calificacion.ponderacion.id,
            }, {
              transaction
            });
          } else {
            await ModelosCapacitacion.Calificacion.update({
              predefinido: calificacion.predefinido,
            }, {
              where: {
                id: calificacion.id
              },
              transaction
            });
            calificacionNueva.id = calificacion.id;
            mensaje = "Actualizado satisfactoriamente!";
          }
          for (const detalleCalificacion of calificacion.detallesCalificacion) {
            if (!detalleCalificacion.id) {
              await ModelosCapacitacion.DetalleCalificacion.create({
                id_calificacion: calificacionNueva.id,
                nombre: detalleCalificacion.nombre,
                desde: detalleCalificacion.desde.toString(),
                hasta: detalleCalificacion.hasta.toString(),
              }, {
                transaction
              });
            } else if (!detalleCalificacion.eliminado) {
              await ModelosCapacitacion.DetalleCalificacion.update({
                nombre: detalleCalificacion.nombre,
                desde: detalleCalificacion.desde.toString(),
                hasta: detalleCalificacion.hasta.toString(),
              }, {
                where: {
                  id: detalleCalificacion.id
                },
                transaction,
              });
            } else if (detalleCalificacion.eliminado) {
              await ModelosCapacitacion.DetalleCalificacion.update({
                eliminado: true,
              }, {
                where: {
                  id: detalleCalificacion.id
                },
                transaction,
              });
            }
          }
        }
        await transaction.commit();
        res.json({
          mensaje: mensaje
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route(
      "/capacitacion-calificacion/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionCalificacion = {};

        if (req.params.texto_busqueda != 0) {
          condicionCalificacion = {
            $and: [{
              $or: [
                sequelize.where(sequelize.col("`nombre`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`hasta`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`desde`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        let ordenArreglo = [];
        let condicionPagina = {
          offset: req.params.items_pagina * (req.params.pagina - 1),
          limit: parseInt(req.params.items_pagina),
          where: condicionCalificacion,
          include: [{
            model: ModelosCapacitacion.Ponderacion,
            as: "ponderacion"
          },
          {
            model: ModelosCapacitacion.DetalleCalificacion,
            as: "detallesCalificacion",
            where: {
              eliminado: false
            },
          },
          ],
          order: [],
        };
        if (req.params.items_pagina == "0") {
          delete condicionPagina.offset;
          delete condicionPagina.limit;
        }
        ordenArreglo.push(req.params.columna);
        ordenArreglo.push(req.params.direccion);
        condicionPagina.order.push(ordenArreglo);
        const data = await ModelosCapacitacion.Calificacion.findAndCountAll(
          condicionPagina
        );

        res.json({
          calificaciones: data.rows,
          paginas: Math.ceil(data.count / req.params.items_pagina),
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/ultimo-registro/capacitacion-certificados/empresa/:id_empresa")
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        const registro = await ModelosCapacitacion.Certificado.findAll({
          where: {
            id_empresa: req.params.id_empresa
          },
          order: [
            ["modelo", "desc"]
          ],
          limit: 1,
        });
        res.json({
          modelo: registro.length > 0 ? parseFloat(registro[0].modelo) + 1 : "1",
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion-certificados/empresa/:id_empresa")
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let certificados = await ModelosCapacitacion.Certificado.findAll({
          where: {
            eliminado: false
          },
        });
        res.json({
          certificados: certificados
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    })
    .post(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      let imagen;
      let imagenCertificado;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        const certificado = req.body;
        if (!certificado.id) {
          const certificadoCreado =
            await ModelosCapacitacion.Certificado.create({
              id_empresa: req.params.id_empresa,
              modelo: certificado.modelo.toString(),
              titulo: certificado.titulo,
              texto_uno: certificado.texto_uno,
              texto_dos: certificado.texto_dos,
              plantilla: certificado.plantilla,
              color_texto_uno: certificado.color_texto_uno,
              color_subtitulo: certificado.color_subtitulo,
              color_detalle_estudiante: certificado.color_detalle_estudiante,
              color_texto_dos: certificado.color_texto_dos,
              color_nombre_docente: certificado.color_nombre_docente,
              color_subtitulo_docente: certificado.color_subtitulo_docente,
              dimencion_texto_uno: certificado.dimencion_texto_uno,
              dimencion_subtitulo: certificado.dimencion_subtitulo,
              dimencion_detalle_estudiante: certificado.dimencion_detalle_estudiante,
              dimencion_texto_dos: certificado.dimencion_texto_dos,
              dimencion_nombre_docente: certificado.dimencion_nombre_docente,
              dimencion_subtitulo_docente: certificado.dimencion_subtitulo_docente,
              id_font_texto_uno: certificado.fontTextoUno.id,
              id_font_subtitulo: certificado.fontSubtitulo.id,
              id_font_detalle_estudiante: certificado.fontDetalleEstudiante.id,
              id_font_texto_dos: certificado.fontTextoDos.id,
              id_font_nombre_docente: certificado.fontNombreDocente.id,
              id_font_subtitulo_docente: certificado.fontSubtituloDocente.id,
              id_orientacion: certificado.orientacion.id,
              id_dimencion: certificado.dimencion.id,
              color_plantilla_uno: certificado.color_plantilla_uno,
              color_plantilla_dos: certificado.color_plantilla_dos,
              usar_imagen_empleado: certificado.usar_imagen_empleado,
            }, {
              transaction
            });
          if (certificado.imagen.indexOf("default") > -1) {
            imagen = certificado.imagen;
          } else {
            imagenCertificado = decodeBase64Image(certificado.imagen);
            fs.writeFileSync(
              "./img/certificado-" + certificadoCreado.id + ".jpg",
              imagenCertificado.data,
              "base64",
              function (err) { }
            );
            imagen = "img/certificado-" + certificadoCreado.id + ".jpg";
          }
          await ModelosCapacitacion.Certificado.update({
            imagen: imagen,
          }, {
            where: {
              id: certificadoCreado.id
            },
            transaction,
          });
        } else if (!certificado.eliminado) {
          if (
            (certificado.imagen.indexOf("default") > -1 ||
              certificado.imagen.indexOf("producto-" + certificado.id) > -1 ||
              certificado.imagen.indexOf(certificado.id) > -1) &&
            certificado.imagen.length < 200
          ) {
            imagen = certificado.imagen;
          } else {
            imagenCertificado = decodeBase64Image(certificado.imagen);
            fs.writeFileSync(
              "./img/certificado-" + certificado.id + ".jpg",
              imagenCertificado.data,
              "base64",
              function (err) { }
            );
            imagen = "img/certificado-" + certificado.id + ".jpg";
          }
          await ModelosCapacitacion.Certificado.update({
            modelo: certificado.modelo || 1,
            titulo: certificado.titulo,
            texto_uno: certificado.texto_uno,
            texto_dos: certificado.texto_dos,
            plantilla: certificado.plantilla,
            imagen: imagen,
            color_texto_uno: certificado.color_texto_uno,
            color_subtitulo: certificado.color_subtitulo,
            color_detalle_estudiante: certificado.color_detalle_estudiante,
            color_texto_dos: certificado.color_texto_dos,
            color_nombre_docente: certificado.color_nombre_docente,
            color_subtitulo_docente: certificado.color_subtitulo_docente,
            dimencion_texto_uno: certificado.dimencion_texto_uno,
            dimencion_subtitulo: certificado.dimencion_subtitulo,
            dimencion_detalle_estudiante: certificado.dimencion_detalle_estudiante,
            dimencion_texto_dos: certificado.dimencion_texto_dos,
            dimencion_nombre_docente: certificado.dimencion_nombre_docente,
            dimencion_subtitulo_docente: certificado.dimencion_subtitulo_docente,
            id_font_texto_uno: certificado.fontTextoUno.id,
            id_font_subtitulo: certificado.fontSubtitulo.id,
            id_font_detalle_estudiante: certificado.fontDetalleEstudiante.id,
            id_font_texto_dos: certificado.fontTextoDos.id,
            id_font_nombre_docente: certificado.fontNombreDocente.id,
            id_font_subtitulo_docente: certificado.fontSubtituloDocente.id,
            id_orientacion: certificado.orientacion.id,
            id_dimencion: certificado.dimencion.id,
            color_plantilla_uno: certificado.color_plantilla_uno,
            color_plantilla_dos: certificado.color_plantilla_dos,
            usar_imagen_empleado: certificado.usar_imagen_empleado,
          }, {
            where: {
              id: certificado.id
            },
            transaction,
          });
        } else if (certificado.eliminado) {
          await ModelosCapacitacion.Certificado.update({
            eliminado: true,
          }, {
            where: {
              id: certificado.id
            },
            transaction,
          });
        }
        await transaction.commit();
        res.json({
          mensaje: "Guarado satisfactoriamente!"
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });

  router
    .route(
      "/capacitacion-certificado/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionCertificado = {};

        if (req.params.texto_busqueda != 0) {
          condicionCertificado = {
            $and: [{
              $or: [
                sequelize.where(sequelize.col("`modelo`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`titulo`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`Texto_uno`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`Texto_dos`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        let ordenArreglo = [];
        let condicionPagina = {
          offset: req.params.items_pagina * (req.params.pagina - 1),
          limit: parseInt(req.params.items_pagina),
          where: condicionCertificado,
          include: [
            { model: Clase, as: 'fontTextoUno' },
            { model: Clase, as: 'fontSubtitulo' },
            { model: Clase, as: 'fontDetalleEstudiante' },
            { model: Clase, as: 'fontTextoDos' },
            { model: Clase, as: 'fontNombreDocente' },
            { model: Clase, as: 'fontSubtituloDocente' },
            { model: Clase, as: 'orientacion' },
            { model: Clase, as: 'dimencion' },
          ],
          order: [],
        };
        if (req.params.items_pagina == "0") {
          delete condicionPagina.offset;
          delete condicionPagina.limit;
        }
        ordenArreglo.push(req.params.columna);
        ordenArreglo.push(req.params.direccion);
        condicionPagina.order.push(ordenArreglo);

        let data = await ModelosCapacitacion.Certificado.findAndCountAll(
          condicionPagina
        );

        res.json({
          certificados: data.rows,
          paginas: Math.ceil(data.count / req.params.items_pagina),
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion-empleado/empresa/:id_empresa")
    .post(ensureAuthorizedlogged, async (req, res) => {
      let transaction;
      try {
        // get transaction
        transaction = await sequelize.transaction();
        const empleado = req.body;
        const nota = empleado.nota? empleado.nota.toString() : null;
        if (!empleado.id) {
          await ModelosCapacitacion.Empleado.create({
            id_capacitacion: empleado.id_capacitacion,
            id_empleado: empleado.id_empleado,
            nombre_empleado: empleado.nombre_empleado,
            ci: empleado.ci,
            campo: empleado.campo,
            nota: nota,
          }, {
            transaction
          });
        } else if (!empleado.eliminado) {
          await ModelosCapacitacion.Empleado.update({
            id_empleado: empleado.id_empleado,
            nombre_empleado: empleado.nombre_empleado,
            ci: empleado.ci,
            campo: empleado.campo,
            nota: nota,
          }, {
            where: {
              id: empleado.id
            },
            transaction,
          });
        } else if (empleado.eliminado) {
          await ModelosCapacitacion.Empleado.update({
            eliminado: true,
          }, {
            where: {
              id: empleado.id
            },
            transaction,
          });
        }

        await transaction.commit();
        res.json({
          mensaje: "Guarado satisfactoriamente!"
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    })
    .put(ensureAuthorizedlogged, async (req, res) => {
      try {
        // get transaction
        transaction = await sequelize.transaction();
        for (const empleado of req.body) {
          if (empleado.modificado) {
            await ModelosCapacitacion.Empleado.update({
              nota: empleado.nota.toString(),
              comentario: empleado.comentario
            }, {
              where: {
                id: empleado.id
              },
              transaction,
            });
          }
        }

        await transaction.commit();
        res.json({
          mensaje: "Guarado satisfactoriamente!"
        });
      } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route(
      "/capacitacion-empleado/empresa/:id_empresa/capacitacion/:id_capacitacion/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion"
    )
    .get(ensureAuthorizedlogged, async (req, res) => {
      try {
        let condicionEmpleado = {
          eliminado: false,
          id_capacitacion: req.params.id_capacitacion
        };

        if (req.params.texto_busqueda != 0) {
          condicionEmpleado = {
            eliminado: false,
            id_capacitacion: req.params.id_capacitacion,
            $and: [{
              $or: [
                sequelize.where(sequelize.col("`nombre_empleado`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`ci`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
                sequelize.where(sequelize.col("`campo`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        let ordenArreglo = [];
        let condicionPagina = {
          offset: req.params.items_pagina * (req.params.pagina - 1),
          limit: parseInt(req.params.items_pagina),
          where: condicionEmpleado,
          include: [{
            model: MedicoPaciente, as: 'empleado',
            include: [{
              model: Persona, as: 'persona'
            }]
          }],
          order: [],
        };
        if (req.params.items_pagina == "0") {
          delete condicionPagina.offset;
          delete condicionPagina.limit;
        }
        ordenArreglo.push(req.params.columna);
        ordenArreglo.push(req.params.direccion);
        condicionPagina.order.push(ordenArreglo);

        const data = await ModelosCapacitacion.Empleado.findAndCountAll(
          condicionPagina
        );

        res.json({
          empleados: data.rows,
          paginas: Math.ceil(data.count / req.params.items_pagina),
        });
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion/personal/:id_empresa/busqueda/:texto_busqueda")
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let condicionPersonal = {
          es_empleado: true,
          id_empresa: req.params.id_empresa,
        };

        if (req.params.texto_busqueda != 0) {
          condicionPersonal = {
            $and: [{
              $or: [
                sequelize.where(
                  sequelize.col("`persona`.`nombre_completo`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }
                ),
                sequelize.where(sequelize.col("`persona`.`ci`"), {
                  $like: `%${req.params.texto_busqueda}%`,
                }),
              ],
            },],
          };
        }
        const personal = await MedicoPaciente.findAll({
          where: condicionPersonal,
          include: [{
            model: Clase,
            as: "campo"
          },
          {
            model: Persona,
            as: "persona"
          },
          ],
        });
        res.json(personal);
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
  router
    .route("/capacitacion-reportes/empresa/:id_empresa/:desde/:hasta/:id_empleado/:id_curso/:id_cargo/:id_campo")
    .get(ensureAuthorizedlogged, async function (req, res) {
      try {
        let fecha_inicio = new Date(req.params.desde);
        let fecha_fin = new Date(req.params.hasta);
        let condicionEstudiante = {
          id_empleado: req.params.id_empleado
        };
        let condicionEmpleado = {
          id_campo: req.params.id_campo
        };
        if (req.params.id_empleado == "0") {
          delete condicionEstudiante.id_empleado;
        }
        if (req.params.id_campo == "0") {
          delete condicionEmpleado.id_campo;
        }
        let parametros = {
          where: {
            fecha_inicio: {
              $between: [fecha_inicio, fecha_fin]
            },
            id_tipo_curso: req.params.id_curso,
          },
          include: [{ model: Clase,as:'tipoCurso'},{model:Usuario,as:'usuario',where:{id_empresa:req.params.id_empresa}}, {
            model: ModelosCapacitacion.Empleado, as: 'empleados', where: condicionEstudiante,
            include: [{ model: MedicoPaciente, as: 'empleado', where: condicionEmpleado }]
          }]
        };
        if (req.params.id_curso == "0") {
          delete parametros.where.id_tipo_curso;
        }
        let capacitaciones = await ModelosCapacitacion.Capacitacion.findAll(parametros)
        res.json(capacitaciones);
      } catch (err) {
        res.status(400).json({
          mensaje: err.stack ? err.stack : err
        });
      }
    });
};