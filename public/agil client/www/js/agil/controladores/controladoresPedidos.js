angular.module("agil.controladores").controller("ControladorPedidos", [
  "$scope",
  "$filter",
  "$rootScope",
  "$route",
  "$templateCache",
  "$location",
  "$window",
  "$localStorage",
  "blockUI",
  "ClasesTipo",
  "Paginator",
  "PedidosFiltro",
  "ListaGruposProductoUsuario",
  "ProveedoresNit",
  "ListaProductosEmpresaUsuario",
  "GuardarPedido",
  "ListaProveedores",
  "InventarioPaginador",
  "ProductosPaginador",
  "ListaProductosProveedores",
  "ActualizarProductosProveedor",
  "ListaSubGruposProductoEmpresa",
  "ProductosPaginadorSubgrupos",
  "ProductosPaginadorAsignados",
  "ListaInventariosProducto",
  "ObtenerRegistroPedidoPorId",
  "ObtenerConfiguracionIso",
  "ObtenerDatosInventarioPedido",
  "ClasesTipoEmpresa",
  "SweetAlert",
  "GuardarEdicionPedido",
  "EliminarPedido",
  "$timeout",
  "PedidosDetallesFiltro",
  "ObtenerImagen",
  "FieldViewer",
  "ObtenerUltimoPrecioCompraProducto",
  function (
    $scope,
    $filter,
    $rootScope,
    $route,
    $templateCache,
    $location,
    $window,
    $localStorage,
    blockUI,
    ClasesTipo,
    Paginator,
    PedidosFiltro,
    ListaGruposProductoUsuario,
    ProveedoresNit,
    ListaProductosEmpresaUsuario,
    GuardarPedido,
    ListaProveedores,
    InventarioPaginador,
    ProductosPaginador,
    ListaProductosProveedores,
    ActualizarProductosProveedor,
    ListaSubGruposProductoEmpresa,
    ProductosPaginadorSubgrupos,
    ProductosPaginadorAsignados,
    ListaInventariosProducto,
    ObtenerRegistroPedidoPorId,
    ObtenerConfiguracionIso,
    ObtenerDatosInventarioPedido,
    ClasesTipoEmpresa,
    SweetAlert,
    GuardarEdicionPedido,
    EliminarPedido,
    $timeout,
    PedidosDetallesFiltro,
    ObtenerImagen,
    FieldViewer,
    ObtenerUltimoPrecioCompraProducto
  ) {
    $scope.usuario = JSON.parse($localStorage.usuario);
    // var pormimg = ObtenerImagen($scope.usuario.empresa.imagen)
    // 	pormimg.then(function (img) {
    // 		$scope.usuario.empresa.imagen = img
    // 	})

    $scope.idDialogNuevoPedido = "modal-nuevo-pedido-pedido";
    // $scope.idDialogListadoPedido = "modal-listado-nuevo-pedido"
    $scope.idDialogProductosProveedor =
      "dialog-productos-proveedor-configuracion";
    $scope.idDialogBusquedaProveedor = "dialog-Busqueda-proveedor";
    $scope.idDialogProductosAsigandosProveedor =
      "dialog-productos-proveedor-asignados";
    $scope.idModalInventarioPedidos = "dialog-productos-pedidos";
    $scope.modalEdicionOrdenCompra = "modal-editar-pedido-pedido";

    $scope.$on("$viewContentLoaded", function () {
      resaltarPestaña($location.path().substring(1));
      ejecutarScriptsPedidos(
        $scope.idDialogNuevoPedido,
        $scope.idDialogProductosProveedor,
        $scope.idDialogBusquedaProveedor,
        $scope.idDialogProductosAsigandosProveedor,
        $scope.idModalInventarioPedidos,
        $scope.modalEdicionOrdenCompra
      );
      $scope.buscarAplicacion(
        $scope.usuario.aplicacionesUsuario,
        $location.path().substring(1)
      );
      $scope.obtenerColumnasAplicacion();
    });

    $scope.$on("$routeChangeStart", function (next, current) {
      $scope.eliminarPopup($scope.idDialogListadoPedido);
      $scope.eliminarPopup($scope.idDialogProductosProveedor);
      $scope.eliminarPopup($scope.idDialogNuevoPedido);
      $scope.eliminarPopup($scope.idDialogBusquedaProveedor);
      $scope.eliminarPopup($scope.idDialogProductosAsigandosProveedor);
      $scope.eliminarPopup($scope.idModalInventarioPedidos);
      $scope.eliminarPopup($scope.modalEdicionOrdenCompra);
    });
    $scope.obtenerColumnasAplicacion = function () {
      $scope.fieldViewer = FieldViewer(
        {
          crear: true,
          id_empresa: $scope.usuario.id_empresa,
          configuracion: {
            sucursal: { value: "Sucursal", show: true },
            almacen: { value: "Almacen", show: true },
            proveedor: { value: "Proveedor", show: true },
            numero_correlativo: { value: "Doc.", show: true },
            numero_iso_orden_compra: { value: "Doc/ISO", show: true },
            factura: { value: "Factura", show: true },
            fecha: { value: "Fecha", show: true },
            usuario: { value: "Usuario", show: true },
          },
        },
        $scope.aplicacion.aplicacion.id
      );
      $scope.fieldViewer.updateObject();
    };
    $scope.inicio = function () {
      $scope.obtenerEstadoPedidos();
      $scope.obtenerFormasEntregaPedido();
      $scope.imprimir = { detalle: false };
      $scope.listaProductosProveedor = [];
      $scope.seleccionProductosProveedor = { seleccionar_todos: false };
      $scope.seleccionProductosProveedorAsignados = {
        seleccionar_todos: false,
      };
      $scope.productosAsignadosPorveedor = {
        itemsPorPagina: 10,
        textoBusqueda: "",
        paginaActual: 1,
        paginas: [1],
      };
      $scope.configuracionPorveedor = {
        itemsPorPagina: 10,
        textoBusqueda: "",
        paginaActual: 1,
        paginas: [1],
      };
      $scope.detallesPedido = [];
      $scope.mostarBusquedaProducto = false;
      $scope.ordenProductos = true;
      $scope.esContado = true;
      $scope.alreadyCalculated = false;
      $scope.sucursalesUsuario = "";
      $scope.obtenerTiposDePago();
      for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
        $scope.sucursalesUsuario =
          $scope.sucursalesUsuario +
          $scope.usuario.sucursalesUsuario[i].sucursal.id;
        if (i + 1 != $scope.usuario.sucursalesUsuario.length) {
          $scope.sucursalesUsuario = $scope.sucursalesUsuario + ",";
        }
      }

      $scope.obtenerProveedores();
      $scope.obtenerProductos();
      $scope.obtenerProductosAsignados();
      $scope.filtro = {
        desde: 0,
        hasta: 0,
        tipo: 0,
        proveedor: 0,
        nit: "",
        sucursal: 0,
        estado: 0,
        id_usuario: "",
      };
      $scope.direccionFiltroProveedores = "asc";
      // $scope.detalleVenta = { producto: {}, centroCosto: {}, cantidad: 1, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false }
      // $scope.solicitud = { solicitudesProductos: [] }
      $scope.obtenerPaginador();
      $scope.sucursales = $scope.obtenerSucursales();
      $scope.obtenerSubGruposProductosEmpresaUsuario();
    };
    $scope.obtenerEstadoPedidos = function () {
      var promesa = ClasesTipo("ESTMODPED");
      promesa.then(function (dato) {
        $scope.estadosPedido = dato.clases;
      });
    };
    $scope.obtenerSubGruposProductosEmpresaUsuario = function () {
      blockUI.start();
      // var promesa = ListaGruposProductoUsuario($scope.usuario.id_empresa, $scope.usuario.id);
      var promesa = ListaSubGruposProductoEmpresa(
        $scope.usuario.id_empresa,
        $scope.usuario.id
      );
      promesa
        .then(function (grupos) {
          blockUI.stop();
          if (grupos.length > 0) {
            $scope.subGruposProducto = grupos;
          } else {
            $scope.subGruposProducto = [];
            SweetAlert.swal(
              "",
              "Parece que el usuario actual no cuenta con grupos de productos.",
              "warning"
            );
          }
        })
        .catch(function (err) {
          $scope.subGruposProducto = [];
          var mensaje =
            err.stack !== undefined && err.stack !== null
              ? err.stack
              : err.data !== undefined && err.data !== null && err.data !== ""
              ? err.data
              : "Error: Se perdio la conexión.";
          SweetAlert.swal("", mensaje, "error");
          blockUI.stop();
        });
    };

    $scope.obtenerProveedores = function () {
      var prom = ListaProveedores($scope.usuario.id_empresa);
      prom
        .then(function (res) {
          $scope.proveedores = res.proveedores;
          $scope.proveedoresProcesado = res.proveedores;
          $scope.ordenarBusquedaPorveedores("razon_social");
        })
        .catch(function (err) {
          $scope.proveedores = [];
          var mensaje =
            err.stack !== undefined && err.stack !== null
              ? err.stack
              : err.data !== undefined && err.data !== null && err.data !== ""
              ? err.data
              : "Error: Se perdio la conexión.";
          SweetAlert.swal("", mensaje, "error");
        });
    };

    $scope.filtrarProveedores = function (query) {
      if ($scope.proveedores !== undefined) {
        $scope.proveedoresProcesado = $filter("filter")(
          $scope.proveedores,
          query
        );
      } else {
        $scope.proveedoresProcesado = [];
      }
    };

    $scope.ordenarBusquedaPorveedores = function (column) {
      if ($scope.direccionFiltroProveedores === "asc") {
        $scope.direccionFiltroProveedores = "desc";
        $scope.proveedoresProcesado.sort(function (a, b) {
          if (a[column] > b[column]) {
            return 1;
          }
          if (a[column] < b[column]) {
            return -1;
          }
          return 0;
        });
      } else {
        $scope.direccionFiltroProveedores = "asc";
        $scope.proveedoresProcesado.sort(function (a, b) {
          if (a[column] < b[column]) {
            return 1;
          }
          if (a[column] > b[column]) {
            return -1;
          }
          return 0;
        });
      }
    };

    $scope.establecerProveedor = function (proveedor, modal) {
      if ($scope.pedido === undefined) {
        $scope.pedido = {};
      }
      $scope.pedido.proveedor = proveedor;
      $scope.productosAsignadosProveedor = [];
      $scope.paginatorProductosAsignados.setPages(1);

      if (modal !== undefined) {
        $scope.cerrarModalBusquedaProveedor();
      }
      if ($scope.pedido.por_proveedor) {
        $scope.generarPorProveedor();
      }
    };

    $scope.checkProveedor = function (pedido) {
      if ($scope.pedido) {
        if ($scope.pedido.proveedor) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    $scope.buscarProveedor = function (query) {
      $scope.noResults = false;
      $scope.querySearch = "";
      if (query != "" && query != undefined) {
        var promesa = ProveedoresNit($scope.usuario.id_empresa, query);
        return promesa.then(function (datos) {
          $scope.pedido.proveedor = "";
          if (datos.length == 0) {
            $scope.querySearch = query;
            $scope.noResults = true;
          } else {
            $scope.noResults = false;
          }
          return datos;
        });
      }
    };

    // $scope.buscarProducto = function (query) {
    // 	if (query != "" && query != undefined) {
    // 		var promesa = ListaProductosEmpresaUsuario($scope.usuario.id_empresa, query, $scope.usuario.id, 0);
    // 		return promesa;
    // 	}
    // };

    // $scope.establecerProducto = function (producto, modelo) {
    // //	$scope.detallePedido = {};
    // 	producto.tipoProducto = producto['tipoProducto'] == null ? { id: producto['tipoProducto.id'], nombre: producto['tipoProducto.nombre'], nombre_corto: producto['tipoProducto.nombre_corto'] } : producto.tipoProducto;
    // 	// var centroCostos = $scope.pedido.centroCosto;
    // 	var inv_disponible = 0;
    // 	if (producto.inventarios.length > 0) {
    // 		producto.inventarios.forEach(function (inventario) {
    // 			inv_disponible += inventario.cantidad;
    // 		})
    // 	}
    // 	$scope.detallePedido.cantidad=1
    // 	$scope.detallePedido.precio_unitario=producto.precio_unitario
    // 	$scope.detallePedido.inventario_disponible=inv_disponible
    // 	// $scope.cerrarPopup($scope.idModalInventarioPedidos);
    // 	// $scope.enfocar('cantidad');
    // };
    $scope.establecerProducto = async function (producto) {
      try {
        producto.tipoProducto =
          producto["tipoProducto"] == null
            ? {
                id: producto["tipoProducto.id"],
                nombre: producto["tipoProducto.nombre"],
                nombre_corto: producto["tipoProducto.nombre_corto"],
              }
            : producto.tipoProducto;
        $scope.editar_precio = false;
        let inventarios = await ListaInventariosProducto(
          producto.id,
          $scope.pedido.almacen.id
        );

        producto.inventarios = inventarios;
        for (let i = 0; i < producto.inventarios.length; i++) {
          producto.inventarios[i].fecha_vencimiento = producto.inventarios[i]
            .fecha_vencimiento
            ? new Date(producto.inventarios[i].fecha_vencimiento)
            : null;
          producto.inventarios[i].fechaVencimientoTexto = producto.inventarios[
            i
          ].fecha_vencimiento
            ? producto.inventarios[i].fecha_vencimiento.getDate() +
              "/" +
              (producto.inventarios[i].fecha_vencimiento.getMonth() + 1) +
              "/" +
              producto.inventarios[i].fecha_vencimiento.getFullYear()
            : "";
          producto.inventarios[i].detallesMovimiento[0].movimiento.fecha =
            new Date(
              producto.inventarios[i].detallesMovimiento[0].movimiento.fecha
            );
          producto.inventarios[i].detallesMovimiento[0].movimiento.fechaTexto =
            producto.inventarios[
              i
            ].detallesMovimiento[0].movimiento.fecha.getDate() +
            "/" +
            (producto.inventarios[
              i
            ].detallesMovimiento[0].movimiento.fecha.getMonth() +
              1) +
            "/" +
            producto.inventarios[
              i
            ].detallesMovimiento[0].movimiento.fecha.getFullYear();
        }
        $scope.inventariosDisponibleProducto = [];
        $scope.inventariosDisponibleProducto.push({
          id: 0,
          fecha_vencimiento: "TODOS",
          fechaVencimientoTexto: "TODOS",
        });
        $scope.inventariosDisponibleProducto =
          $scope.inventariosDisponibleProducto.concat(producto.inventarios);
        let inventarioDisponible = $scope.obtenerInventarioTotal(producto);
        $scope.detallePedido.producto = producto;
        let costoDetalleAnterior = "sin Datos.";
        if ($scope.detallePedido.producto.inventarios.length > 0) {
          costoDetalleAnterior = $scope.detallePedido.producto.inventarios[
            $scope.detallePedido.producto.inventarios.length - 1
          ].costo_unitario
            ? $scope.detallePedido.producto.inventarios[
                $scope.detallePedido.producto.inventarios.length - 1
              ].costo_unitario
            : 0;
        }
        $scope.detallePedido.producto.costoanterior = costoDetalleAnterior;
        $scope.detallePedido.cantidad = 1;
        $scope.detallePedido.inventario_disponible = inventarioDisponible;
        $scope.colorearInventarioDisponible(inventarioDisponible, producto);
        let res = await ObtenerUltimoPrecioCompraProducto(
          producto.id,
          $scope.pedido.sucursal,
          $scope.pedido.almacen.id
        );
        $scope.preciosCompraProducto = res.precios;
        $scope.detallePedido.costo_unitario = $scope.preciosCompraProducto
          .sucursal.costo_unitario
          ? $scope.preciosCompraProducto.sucursal.costo_unitario
          : producto.precio_unitario;
        $scope.cerrarPopup($scope.idModalInventarioPedidos);
        $scope.enfocar("cantidadP");
      } catch (error) {
        console.log(error);
      }
    };

    $scope.colorearInventarioDisponible = function (
      inventarioDisponible,
      producto
    ) {
      if (inventarioDisponible == 0) {
        $scope.porcentaje = "100";
        $scope.color = "red";
      } else if (inventarioDisponible > producto.inventario_minimo * 3 + 1) {
        $scope.porcentaje = "100";
        $scope.color = "green";
      } else if (inventarioDisponible > producto.inventario_minimo * 2 + 1) {
        $scope.porcentaje = "75";
        $scope.color = "green";
      } else if (inventarioDisponible > producto.inventario_minimo * 1.5 + 1) {
        $scope.porcentaje = "50";
        $scope.color = "green";
      } else if (inventarioDisponible == producto.inventario_minimo + 1) {
        $scope.porcentaje = "38";
        $scope.color = "yellow";
      } else if (inventarioDisponible == producto.inventario_minimo) {
        $scope.porcentaje = "25";
        $scope.color = "red";
      } else if (
        inventarioDisponible < producto.inventario_minimo &&
        inventarioDisponible > 0
      ) {
        $scope.porcentaje = "12";
        $scope.color = "red";
      }
    };

    $scope.obtenerInventarioTotal = function (producto) {
      let cantidadTotal = 0;
      if (producto.activar_inventario) {
        for (var i = 0; i < producto.inventarios.length; i++) {
          cantidadTotal += producto.inventarios[i].cantidad;
        }
        // for (var j = 0; j < $scope.detallesPedido.length; j++) {
        // 	if ($scope.detallesPedido[j].producto.id == producto.id) {
        // 		cantidadTotal = cantidadTotal - $scope.detallesPedido[j].cantidad;
        // 	}
        // }
      } else {
        cantidadTotal = 500000;
      }
      return cantidadTotal;
    };
    $scope.obtenerInventarioTotalProvedor = async function (producto) {
      let inventarios = await ObtenerDatosInventarioPedido(
        producto.id,
        $scope.pedido.almacen.id
      );
      let cantidadTotal = 0;
      if (producto.activar_inventario) {
        for (var i = 0; i < inventarios.length; i++) {
          cantidadTotal += inventarios[i].cantidad;
        }
        for (var j = 0; j < $scope.detallesPedido.length; j++) {
          if ($scope.detallesPedido[j].producto.id == producto.id) {
            cantidadTotal = cantidadTotal - $scope.detallesPedido[j].cantidad;
          }
        }
      } else {
        cantidadTotal = 500000;
      }
      return cantidadTotal;
    };
    $scope.guardarPedido = async function (pedido) {
      if (pedido !== undefined && $scope.detallesPedido.length > 0) {
        var fortime = new Date();
        var dateSplit = pedido.fecha.split("/").reverse();
        /* var sendPedido = {
								fecha: new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2], fortime.getHours(), fortime.getMinutes()),
								sucursal: pedido.sucursal,
								almacen: pedido.almacen,
								proveedor: pedido.proveedor.id,
								observacion: pedido.observacion,
								grupo: (pedido.grupo !== undefined ? pedido.grupo !== null ? pedido.grupo : 0 : 0),
								detallesPedido: $scope.detallesPedido,
								usuario: $scope.usuario.id
							}; */

        $scope.pedido.estado = $scope.estadosPedido.find(function (x) {
          return x.nombre_corto == "PENDIENTE";
        });
        $scope.pedido.detallesPedido = $scope.detallesPedido;

        var q = await ObtenerConfiguracionIso(pedido.almacen.id_sucursal);
        if (q.configuracionesIso.length > 0)
          q = q.configuracionesIso.filter(
            (cfg) =>
              cfg.tipoDocumento.nombre_corto === "ORDENCOMPRA" &&
              cfg.activo == true
          );
        if (pedido.usar_configuracion_iso && q.length == 1) {
          $scope.pedido.configuracionesIso = q[0];
          $scope.pedido.config_doc_iso = q[0].id;
        } else {
          $scope.pedido.configuracionesIso = undefined;
          $scope.pedido.config_doc_iso = undefined;
        }

        SweetAlert.swal({
          title: "Esta seguro?",
          text: "Esta seguro de guardar la orden de compra!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(function (result) {
          if (result.value) {
            $scope.pedido.fecha = new Date(
              $scope.convertirFecha($scope.pedido.fecha)
            );
            $scope.pedido.fecha_recepcion = new Date(
              $scope.convertirFecha($scope.pedido.fecha_recepcion)
            );
            var prom = GuardarPedido(
              $scope.usuario.id_empresa,
              $scope.pedido,
              $scope.usuario.id
            );
            prom
              .then(function (dato) {
                if (dato.hasErr) {
                  SweetAlert.swal("", dato.mensaje, "error");
                } else {
                  $scope.recargarItemsTabla();
                  $scope.pedido.configuracionesIso != undefined
                    ? $scope.pedido.configuracionesIso.predefinido
                      ? $scope.imprimirIsoOrdenCompra(
                          dato.id_pedido,
                          $scope.pedido.configuracionesIso.version_impresion
                        )
                      : $scope.generarPdfpedido(dato.id_pedido)
                    : $scope.generarPdfpedido(dato.id_pedido);
                  blockUI.stop();
                  SweetAlert.swal("Guardado!", dato.mensaje, "success");
                }
              })
              .catch(function (err) {
                blockUI.stop();
                var msg =
                  err.stack !== undefined && err.stack !== null
                    ? err.stack
                    : err.data !== undefined && err.data !== null
                    ? err.data
                    : err.message !== undefined && err.message !== null
                    ? err.message
                    : "Se perdió la conexión.";
                SweetAlert.swal("", msg, "error");
              });
          }
        });
      } else {
        if ($scope.detallesPedido.length > 0) {
          SweetAlert.swal(
            "",
            "Existe un problema con los datos del pedido, no se puede generar!",
            "warning"
          );
        } else {
          SweetAlert.swal(
            "",
            "Existe un problema con los datos del pedido, no se puede generar sin lista de productos!",
            "warning"
          );
        }
        blockUI.stop();
      }
    };

    $scope.mostrarBusqueda = function (formNewPedido) {
      if (formNewPedido) {
        if (
          formNewPedido.sucursal.$error.required ||
          formNewPedido.almacen.$error.required
        ) {
          formNewPedido.$setSubmitted();
        } else {
          if ($scope.mostarBusquedaProducto) {
            $scope.mostarBusquedaProducto = false;
          } else {
            $scope.mostarBusquedaProducto = true;
          }
        }
      } else {
        if ($scope.mostarBusquedaProducto) {
          $scope.mostarBusquedaProducto = false;
        } else {
          $scope.mostarBusquedaProducto = true;
        }
      }
    };

    $scope.modificarTotalesOrdenCompra = function (detalle) {
      detalle.total = detalle.costo_unitario * detalle.cantidad;
      detalle.saldo_inventario = detalle.inventario_disponible;
      $scope.pedido.total = $scope.sumarTotalPedido();
    };
    $scope.agregardetallePedido = function (detalle) {
      if (detalle !== undefined && detalle !== null) {
        let exist = $scope.detallesPedido.some(function (x) {
          return x.producto.id === detalle.producto.id;
        });
        if (!exist) {
          detalle.total = detalle.costo_unitario * detalle.cantidad;
          detalle.saldo_inventario = detalle.inventario_disponible;
          $scope.detallesPedido.push(detalle);
          $scope.pedido.total = $scope.sumarTotalPedido();
        } else {
          let detallePedido = $scope.detallesPedido.find(function (x) {
            return x.producto.id === detalle.producto.id;
          });
          detallePedido.cantidad += detalle.cantidad;
          detallePedido.total =
            detallePedido.costo_unitario * detallePedido.cantidad;
          // detallePedido.saldo_inventario = detallePedido.inventario_disponible
          $scope.pedido.total = $scope.sumarTotalPedido();
        }
        $scope.detallePedido = {};
        $scope.enfocar("producto-pedidoP");
      } else {
        SweetAlert.swal(
          "",
          "Ocurrió un problema, no se puede agregar un valor no definido o nulo.",
          "warning"
        );
      }
    };
    $scope.sumarTotalPedido = function () {
      let total = 0;
      for (const x of $scope.detallesPedido) {
        if(!x.eliminado){
          total += x.total;
        }
      }
      return total;
    };
    $scope.calcularSaldoPedido = function () {
      $scope.pedido.saldo = $scope.pedido.total - $scope.pedido.a_cuenta;
    };

    $scope.enfocar = function (elemento) {
      $timeout(function () {
        $("#" + elemento).focus();
      }, 0);
    };

    $scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
      if (keyEvent.which === 13) {
        if (esEnfocar) {
          $scope.enfocar(elemento);
        } else {
          $timeout(function () {
            $("#" + elemento).trigger("click");
          }, 0);
        }
      }
    };

    $scope.filtrarFiltro = function (filtro, _, __) {
      if (__ !== undefined) {
        for (var key in filtro) {
          if (filtro[key] == 0) {
            filtro[key] = "";
          }
        }
      } else {
        for (var key in filtro) {
          if (
            filtro[key] === "" ||
            filtro[key] === null ||
            filtro[key] === undefined
          ) {
            filtro[key] = 0;
          }
        }
      }
      if (_ === undefined || !_) {
        $scope.obtenerPedidos();
      } else {
        return filtro;
      }
    };

    $scope.obtenerPaginador = function () {
      blockUI.start();
      $scope.paginator = Paginator();
      $scope.paginator.column = "fecha";
      $scope.paginator.direction = "desc";
      $scope.paginator.itemPerPage = 10;
      $scope.paginator.page = 1;
      $scope.filtro = {
        desde: 0,
        hasta: 0,
        tipo: 0,
        proveedor: 0,
        nit: "",
        sucursal: 0,
        estado: 0,
        usuario: "",
        almacen: 0,
      };
      $scope.paginator.callBack = $scope.obtenerPedidos;
      $scope.paginator.getSearch("");
      blockUI.stop();
    };
    $scope.obtenerPedidos = function (filtrado) {
      blockUI.start();
      $scope.filtro = $scope.filtrarFiltro($scope.filtro, true);
      $scope.paginator.filter = $scope.filtro;
      if (filtrado) {
        $scope.paginator.currentPage = 1;
      }

      var prom = PedidosFiltro($scope.usuario.id_empresa, $scope.paginator);
      prom
        .then(function (res) {
          if (res.hasErr) {
            SweetAlert.swal("", res.mensaje, "error");
          } else {
            $scope.listaPedidos = res.pedidos;
            $scope.paginator.setPages(res.paginas);
          }
          $scope.filtro = $scope.filtrarFiltro($scope.filtro, true, true);
          blockUI.stop();
        })
        .catch(function (err) {
          blockUI.stop();
          var msg =
            err.stack !== undefined && err.stack !== null
              ? err.stack
              : err.data !== undefined && err.data !== null
              ? err.data
              : err.message !== undefined && err.message !== null
              ? err.message
              : "Se perdió la conexión.";
          SweetAlert.swal("", msg, "error");
        });
    };

    $scope.obtenerSucursales = function () {
      var sucursales = [];
      for (var i = 0; i < $scope.usuario.sucursalesUsuario.length; i++) {
        sucursales.push($scope.usuario.sucursalesUsuario[i].sucursal);
      }
      return sucursales;
    };
    $scope.obtenerAlmacenes = function (idSucursal) {
      if (idSucursal === undefined) {
        $scope.filtro.sucursal = undefined;
        $scope.almacenes = [];
      }
      if (idSucursal !== undefined) {
        $scope.almacenes = [];
        var sucursal = $.grep($scope.sucursales, function (e) {
          return e.id == idSucursal;
        })[0];
        $scope.almacenes = sucursal ? sucursal.almacenes : [];

        // if ($scope.solicitud.almacen) {
        // 	$scope.cargarProductos();
        // } else {
        // 	$scope.solicitud.almacen = $scope.almacenes.length == 1 ? $scope.almacenes[0] : $scope.solicitud.almacen ? $scope.solicitud.almacen : null;
        // 	$scope.productosProcesados = []
        // }
      }
    };

    $scope.confirmarFinalizadoAnulado = function (solicitud, finalizar) {
      if (finalizar) {
        SweetAlert.swal({
          title: "Esta seguro?",
          text: "Esta seguro de Finalizar la orden de compra seleccionada!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(function (result) {
          if (result.value) {
            $scope.eliminar(solicitud);
          }
        });
      } else {
        SweetAlert.swal({
          title: "Esta seguro?",
          text: "Esta seguro de Anular la orden de compra seleccionada!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then(function (result) {
          if (result.value) {
            $scope.eliminar(solicitud);
          }
        });
      }
    };

    $scope.eliminar = function (solicitud) {
      EliminarPedido.delete(
        { id_pedido: solicitud.id },
        solicitud,
        function (res) {
          if (res.hasErr) return SweetAlert.swal("", res.mensaje, "warning");
          SweetAlert.swal("", res.mensaje, "success");
          solicitud.estado = res.estado;

          blockUI.stop();
        },
        function (error) {
          SweetAlert.swal(
            "Error",
            err.stack ? err.stack : "Se perdió la conexión.",
            "error"
          );
          blockUI.stop();
        }
      );
    };

    $scope.interceptarTecla = function (keyEvent, elemento, esEnfocar) {
      if (keyEvent.which === 13) {
        if (esEnfocar) {
          $scope.enfocar(elemento);
        } else {
          $timeout(function () {
            $("#" + elemento).trigger("click");
          }, 0);
        }
      }
    };

    $scope.ver = function (pedido) {
      var promise = ObtenerRegistroPedidoPorId(pedido.id);
      promise.then(function (data) {
        $scope.pedido = data.pedido;
        $scope.pedido.ver = true;
        $scope.detallesPedido = data.pedido.detallesPedido;
        $scope.abrirPopup($scope.idDialogNuevoPedido);
      });
    };

    $scope.sinFuncionalidad = function () {
      SweetAlert.swal("", "Sin funcionalidad", "warning");
    };

    $scope.generarPdfSolicitud = function (solicitud) {
      blockUI.start();
      $scope.calcularTotalViveres(solicitud);

      var doc = new PDFDocument({
        size: [612, 792],
        margin: 10,
        compress: false,
      });
      var stream = doc.pipe(blobStream());
      var fechaActual = new Date();
      var min = fechaActual.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      doc.font("Helvetica", 8);
      var y = 115,
        itemsPorPagina = 29,
        items = 0,
        pagina = 1,
        totalPaginas = Math.ceil(
          $scope.totalViveresSolicitados.length / itemsPorPagina
        );
      $scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas);

      for (
        var i = 0;
        i < $scope.totalViveresSolicitados.length && items <= itemsPorPagina;
        i++
      ) {
        // doc.rect(40, y - 10, 540, 40).stroke();

        doc.font("Helvetica", 8);
        doc.text(i + 1, 65, y);
        doc.text(
          $scope.totalViveresSolicitados[i].productoSolicitudBase.codigo,
          100,
          y
        );
        doc.text(
          $scope.totalViveresSolicitados[i].productoSolicitudBase.nombre,
          220,
          y
        );
        doc.text(
          $scope.totalViveresSolicitados[i].productoSolicitudBase.unidad_medida,
          400,
          y
        );
        doc.text(
          $scope.totalViveresSolicitados[i].totalMostrar.toFixed(2),
          500,
          y
        );
        y = y + 20;
        items++;

        if (items > itemsPorPagina) {
          doc.rect(40, 105, 540, y - 115).stroke();
          doc.text(pagina + "/" + totalPaginas, 570, y + 15);
          doc.font("Helvetica", 6);
          doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
          doc.text(
            "SOLICITANTE: " +
              $scope.totalViveresSolicitados.usuario.persona.nombre_completo,
            345,
            y + 10
          );
          doc.text(
            "IMPRESION : " +
              fechaActual.getDate() +
              "/" +
              (fechaActual.getMonth() + 1) +
              "/" +
              fechaActual.getFullYear() +
              " Hr. " +
              fechaActual.getHours() +
              ":" +
              min,
            175,
            y + 10
          );
          doc.addPage({ size: [612, 792], margin: 10 });
          y = 115;
          items = 0;
          pagina = pagina + 1;
          $scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas);
        }
      }
      doc.rect(40, 105, 540, y - 115).stroke();
      var fechaActual = new Date();
      var min = fechaActual.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      doc.text(pagina + "/" + totalPaginas, 570, y + 15);
      doc.font("Helvetica", 6);
      doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 5);
      doc.text(
        "SOLICITANTE: " +
          $scope.totalViveresSolicitados.usuario.persona.nombre_completo,
        345,
        y + 5
      );
      doc.text(
        "IMPRESION : " +
          fechaActual.getDate() +
          "/" +
          (fechaActual.getMonth() + 1) +
          "/" +
          fechaActual.getFullYear() +
          " Hr. " +
          fechaActual.getHours() +
          ":" +
          min,
        175,
        y + 5
      );
      doc.end();
      stream.on("finish", function () {
        var fileURL = stream.toBlobURL("application/pdf");
        window.open(fileURL, "_blank", "location=no");
      });
      blockUI.stop();
    };

    $scope.dibujarCabeceraPDFSolicitud = function (doc, pagina, totalPaginas) {
      doc.font("Helvetica-Bold", 12);
      doc.text("CONSUMOS", 0, 25, { align: "center" });
      // doc.font('Helvetica', 8);
      //doc.text("Desde  "+reporte.fechaInicioTexto,-70,40,{align:"center"});
      //doc.text("Hasta "+reporte.fechaFinTexto,70,40,{align:"center"});
      //doc.text("FOLIO "+pagina,550,25);
      // doc.rect(40, 60, 540, 40).stroke();
      doc.font("Helvetica-Bold", 8);
      doc.text("SUCURSAL : ", -40, 50, { align: "center" });
      doc.font("Helvetica", 8);
      doc.text($scope.totalViveresSolicitados.sucursal.nombre, 60, 50, {
        align: "center",
      });
      doc.font("Helvetica-Bold", 8);
      doc.text("FECHA : ", 40, 60, { width: 40 });
      doc.font("Helvetica", 8);
      doc.text(
        $scope.fechaATexto($scope.totalViveresSolicitados.fecha),
        75,
        60,
        { width: 40 }
      );
      doc.font("Helvetica-Bold", 14);
      doc.text("N°", 380, 40, { align: "center" });
      doc.text($scope.totalViveresSolicitados.identificador, 440, 40, {
        align: "center",
      });
      // doc.text("NIT : ", 440, 75);
      // doc.font('Helvetica', 8);
      //doc.text(datos.empresa.razon_social,195,75);
      //doc.text(datos.empresa.nit,460,75);
      doc.rect(40, 80, 540, 25).stroke();
      doc.font("Helvetica-Bold", 8);

      doc.text("Nº", 65, 90);
      doc.text("Código Ítem", 100, 90);
      doc.text("Producto", 220, 90);
      doc.text("Unidad medida", 380, 90);
      doc.text("Cantidad solicitada", 480, 90);
      // doc.text("Lote", 405, 110, { width: 35 });
      // doc.text("Descuento", 440, 110);
      // doc.text("Recargo", 490, 110);
      // doc.text("Total", 535, 110);
      // doc.font('Helvetica', 8);
    };

    $scope.buscarInventarios = function (
      idAlmacen,
      pagina,
      itemsPagina,
      texto,
      columna,
      direccion,
      cantidad
    ) {
      blockUI.start();
      $scope.itemsPorPagina = itemsPagina;
      if (texto == "" || texto == null) {
        texto = 0;
      } else {
        $scope.textoBusqueda = texto;
      }
      $scope.paginaActual = pagina;
      var verEstado = "false";
      var promesa = InventarioPaginador(
        $scope.usuario.id_empresa,
        idAlmacen,
        pagina,
        itemsPagina,
        texto,
        columna,
        direccion,
        cantidad,
        undefined,
        undefined,
        $scope.usuario.id,
        verEstado
      );
      promesa.then(function (dato) {
        var productos = dato.productos;
        //var mproductos=[];
        for (var i = 0; i < productos.length; i++) {
          var inventarios = [],
            cantidadTotal = 0;
          productos[i].fecha_vencimiento = new Date(
            productos[i].fecha_vencimiento
          );
          productos[i].cantidad_total = productos[i].cantidad;
          /*mproductos.push({id:productos[i].id,descuento:productos[i].descuento,descuento_fijo:productos[i].descuento_fijo,
												  nombre:productos[i].nombre,codigo:productos[i].codigo,grupo:productos[i].grupo,subgrupo:productos[i].subgrupo,
												  inventarios:inventarios,cantidad_total:productos[i].cantidad,fecha_vencimiento:new Date(productos[i].fecha_vencimiento),precio_unitario:productos[i].precio_unitario,
												  porcentaje:$scope.porcentaje,color:$scope.color});*/
        }
        $scope.paginas = [];
        for (var i = 1; i <= dato.paginas; i++) {
          $scope.paginas.push(i);
        }

        $scope.productosPedidoNuevo = productos;

        blockUI.stop();
      });
    };

    $scope.calcularViveresDesdeFiltro = function (UnDatoPorProducto) {
      var detallesSolicitudes = [];
      $scope.totalViveresSolicitados = {};
      $scope.solicitudesPedido = [];
      $scope.solicitudesOperaciones.forEach(function (solicitud, i) {
        if (!solicitud.activo && UnDatoPorProducto === undefined) {
          var desdd = $scope.calcularTotalViveres(solicitud, true);
          detallesSolicitudes.push(desdd);
        } else if (UnDatoPorProducto && !solicitud.id_pedido) {
          $scope.solicitudesPedido.push(solicitud.id);
          var desdd = $scope.calcularTotalViveres(solicitud, true);
          detallesSolicitudes.push(desdd);
        }
      });
      var productosParaSerProcesados = [];
      detallesSolicitudes.forEach(function (productoParaProcesar) {
        productoParaProcesar.productos.forEach(function (producto) {
          var productoSinProcesado = {
            almacen: producto.almacen,
            sucursal: producto.almacen.sucursal,
            cantidad: producto.cantidad_real,
            fecha: productoParaProcesar.fecha,
            hora_fecha: productoParaProcesar.fecha,
            usuario: productoParaProcesar.usuario,
            estado: producto.estado,
            producto: producto.productoSolicitudBase,
            costo: producto.productoSolicitudBase.inventarios
              ? producto.productoSolicitudBase.inventarios.length
                ? producto.productoSolicitudBase.inventarios[0].costo_unitario
                : 0
              : 0,
            grupo: producto.productoSolicitudBase.grupo,
            subgrupo: producto.productoSolicitudBase.subgrupo,
            total:
              (producto.productoSolicitudBase.inventarios
                ? producto.productoSolicitudBase.inventarios.length
                  ? producto.productoSolicitudBase.inventarios[0].costo_unitario
                  : 0
                : 0) * producto.cantidad_real,
            monto: producto.monto,
          };
          productosParaSerProcesados.push(productoSinProcesado);
        });
      });
      if (UnDatoPorProducto) {
        var productosReporteDetalle = [];
        while (productosParaSerProcesados.length > 0) {
          var dato = productosParaSerProcesados.pop();
          if (productosReporteDetalle.length === 0) {
            productosReporteDetalle.push(dato);
          } else {
            var encontrado = false;
            var indx;
            productosReporteDetalle.forEach(function (producto, i) {
              if (producto.producto.id == dato.producto.id && !encontrado) {
                encontrado = true;
                indx = i;
              }
            });
            if (encontrado && indx !== undefined) {
              productosReporteDetalle[indx].cantidad += dato.cantidad;
              productosReporteDetalle[indx].total =
                productosReporteDetalle[indx].cantidad *
                productosReporteDetalle[indx].costo;
            } else {
              productosReporteDetalle.push(dato);
            }
          }
        }
        return productosReporteDetalle;
      } else {
        return productosParaSerProcesados;
      }
    };

    $scope.reporteExcel = function (pdf) {
      blockUI.start();
      if ($scope.imprimir.detalle) {
        var cabecera = [
          "Nro.",
          "Sucursal",
          "Almacén",
          "Hora-fecha",
          "Usuario",
          "Estado",
          "Detalle",
          "Unidad",
          "Grupo",
          "Subgrupo",
          "Cantidad",
          "Costo",
          "Total",
        ];
        var data = [];
        data.push(cabecera);
        var reporteEx = $scope.calcularViveresDesdeFiltro();
        var columns = [];
        for (var i = 0; i < reporteEx.length; i++) {
          columns = [];
          columns.push(i + 1);
          columns.push(reporteEx[i].almacen.sucursal.nombre);
          columns.push(reporteEx[i].almacen.nombre);
          // columns.push(new Date(reporteEx[i].fecha).toLocaleDateString());
          columns.push(
            new Date(reporteEx[i].fecha).toLocaleTimeString() +
              " " +
              new Date(reporteEx[i].fecha).toLocaleDateString()
          );
          columns.push(reporteEx[i].usuario.nombre_usuario);
          columns.push(reporteEx[i].estado ? "Abierto" : "Cerrado");
          columns.push(reporteEx[i].producto.nombre);
          columns.push(reporteEx[i].producto.unidad_medida);
          columns.push(reporteEx[i].grupo.nombre);
          columns.push(reporteEx[i].subgrupo.nombre);
          columns.push(reporteEx[i].cantidad);
          columns.push(reporteEx[i].costo);
          columns.push(reporteEx[i].total.toFixed(2));
          data.push(columns);
        }
        blockUI.stop();
      } else {
        var cabecera = [
          "Nro.",
          "Sucursal",
          "proveedor",
          "Hora-fecha",
          "Estado",
        ];
        var data = [];
        data.push(cabecera);
        // var reporteEx = $scope.calcularViveresDesdeFiltro()
        var columns = [];
        for (var i = 0; i < $scope.listaPedidos.length; i++) {
          columns = [];
          columns.push(i + 1);
          columns.push($scope.listaPedidos[i].sucursal.nombre);
          columns.push($scope.listaPedidos[i].proveedor.razon_social);
          columns.push(
            new Date($scope.listaPedidos[i].fecha).toLocaleTimeString() +
              " " +
              new Date($scope.listaPedidos[i].fecha).toLocaleDateString()
          );
          columns.push(
            $scope.listaPedidos[i].recibido ? "Completado" : "En espera"
          );
          // columns.push(($scope.listaPedidos[i].activo ? 'Abierto' : 'Cerrado'));
          data.push(columns);
        }
        blockUI.stop();
      }
      if (pdf) {
        $scope.reportePdf(data);
        blockUI.stop();
      } else {
        var ws_name = "SheetJS";
        var wb = new Workbook();
        var ws = sheet_from_array_of_arrays(data);
        var wscols = [
          { wch: 5 },
          { wch: 18 },
          { wch: 18 },
          { wch: 12 },
          { wch: 15 },
          { wch: 15 },
          { wch: 12 },
          { wch: 25 },
          { wch: 12 },
          { wch: 12 },
          { wch: 12 },
        ];
        ws["!cols"] = wscols;
        ws["!rows"] = [{ hpx: 28, level: 3 }];
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: false,
          type: "binary",
        });
        saveAs(
          new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
          "REPORTE OPERACIONES.xlsx"
        );
        blockUI.stop();
      }
    };

    $scope.reportePdf = function (reporte) {
      var doc = new PDFDocument({
        size: "letter",
        margin: 10,
        compress: false,
      }); //[612, 792]
      var stream = doc.pipe(blobStream());
      var fechaActual = new Date();
      var min = fechaActual.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      $scope.posXforPdf = [];
      doc.font("Helvetica", 8);
      var x = 65,
        y = 115,
        itemsPorPagina = 29,
        items = 0,
        pagina = 1,
        totalPaginas = Math.ceil(reporte.length / itemsPorPagina);
      $scope.dibujarCabeceraReportePdf(doc, reporte);
      if ($scope.imprimir.detalle) {
        x = 50;
        for (var i = 0; i < reporte.length && items <= itemsPorPagina; i++) {
          var px = x;
          doc.font("Helvetica", 8);
          if (i > 0) {
            for (var j = 0; j < reporte[i].length; j++) {
              doc.text(
                reporte[i][j],
                px,
                y,
                { width: 40 },
                { align: "center" }
              );
              if (j == 0) {
                px = $scope.posXforPdf[j];
              } else {
                px = $scope.posXforPdf[j];
              }
            }
            y = y + 20;
            items++;
          }
          if (items > itemsPorPagina) {
            doc.rect(40, 105, 540, y - 115).stroke();
            doc.text(pagina + "/" + totalPaginas, 570, y + 15);
            doc.font("Helvetica", 6);
            // doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
            // doc.text("SOLICITANTE: " + $scope.reporte.usuario.persona.nombre_completo, 345, y + 10);
            doc.text(
              "IMPRESION : " +
                fechaActual.getDate() +
                "/" +
                (fechaActual.getMonth() + 1) +
                "/" +
                fechaActual.getFullYear() +
                " Hr. " +
                fechaActual.getHours() +
                ":" +
                min,
              175,
              y + 10
            );
            doc.addPage({ size: [612, 792], margin: 10 });
            y = 115;
            items = 0;
            pagina = pagina + 1;
            $scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas);
          }
        }
      } else {
        for (var i = 0; i < reporte.length && items <= itemsPorPagina; i++) {
          var px = x;
          doc.font("Helvetica", 8);
          if (i > 0) {
            for (var j = 0; j < reporte[i].length; j++) {
              doc.text(reporte[i][j], px, y, { width: 40 });
              if (j == 0) {
                px += 30;
              } else {
                px += 60;
              }
            }
            y = y + 20;
            items++;
          }
          if (items > itemsPorPagina) {
            doc.rect(40, 105, 540, y - 115).stroke();
            doc.text(pagina + "/" + totalPaginas, 570, y + 15);
            doc.font("Helvetica", 6);
            // doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 10);
            // doc.text("SOLICITANTE: " + $scope.reporte.usuario.persona.nombre_completo, 345, y + 10);
            doc.text(
              "IMPRESION : " +
                fechaActual.getDate() +
                "/" +
                (fechaActual.getMonth() + 1) +
                "/" +
                fechaActual.getFullYear() +
                " Hr. " +
                fechaActual.getHours() +
                ":" +
                min,
              175,
              y + 10
            );
            doc.addPage({ size: [612, 792], margin: 10 });
            y = 115;
            items = 0;
            pagina = pagina + 1;
            $scope.dibujarCabeceraPDFSolicitud(doc, pagina, totalPaginas);
          }
        }
      }
      doc.rect(40, 105, 540, 650).stroke();
      var fechaActual = new Date();
      var min = fechaActual.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      doc.text(pagina + "/" + totalPaginas, 570, 765);
      doc.font("Helvetica", 6);
      // doc.text("RESPONSABLE: " + $scope.usuario.nombre_usuario, 45, y + 5);
      // doc.text("SOLICITANTE: " + $scope.totalViveresSolicitados.usuario.persona.nombre_completo, 345, y + 5);
      doc.text(
        "IMPRESION : " +
          fechaActual.getDate() +
          "/" +
          (fechaActual.getMonth() + 1) +
          "/" +
          fechaActual.getFullYear() +
          " Hr. " +
          fechaActual.getHours() +
          ":" +
          min,
        175,
        765
      );
      doc.end();
      stream.on("finish", function () {
        var fileURL = stream.toBlobURL("application/pdf");
        window.open(fileURL, "_blank", "location=no");
      });
      blockUI.stop();
    };

    $scope.dibujarCabeceraReportePdf = function (doc, reporte) {
      doc.font("Helvetica-Bold", 12);
      doc.text("REPORTE OPERACIONES", 0, 25, { align: "center" });
      // doc.font('Helvetica', 8);
      //doc.text("Desde  "+reporte.fechaInicioTexto,-70,40,{align:"center"});
      //doc.text("Hasta "+reporte.fechaFinTexto,70,40,{align:"center"});
      //doc.text("FOLIO "+pagina,550,25);
      // // doc.rect(40, 60, 540, 40).stroke();
      // doc.font('Helvetica-Bold', 8);
      // doc.text("SUCURSAL : ", -40, 50, { align: "center" });
      // doc.font('Helvetica', 8);
      // doc.text($scope.totalViveresSolicitados.sucursal.nombre, 60, 50, { align: "center" });
      doc.font("Helvetica-Bold", 8);
      doc.text("FECHA : ", 40, 60, { width: 40 });
      doc.font("Helvetica", 8);
      doc.text(new Date().toLocaleDateString(), 75, 60, { width: 40 });
      // doc.font('Helvetica-Bold', 14);
      // doc.text("N°", 380, 40, { align: "center" });
      // doc.text($scope.totalViveresSolicitados.identificador, 440, 40, { align: "center" });
      // doc.text("NIT : ", 440, 75);
      // doc.font('Helvetica', 8);
      //doc.text(datos.empresa.razon_social,195,75);
      //doc.text(datos.empresa.nit,460,75);
      doc.rect(40, 80, 540, 25).stroke();
      doc.font("Helvetica-Bold", 8);
      if ($scope.imprimir.detalle) {
        px = 50;
        for (var i = 0; i < reporte[0].length; i++) {
          doc.text(reporte[0][i], px, 90);
          if (i == 0) {
            px += reporte[0][i].length * 4 + 5;
            $scope.posXforPdf.push(px);
          } else {
            if ($scope.imprimir.detalle) {
              px += reporte[0][i].length * 4 + 15;
              $scope.posXforPdf.push(px);
            } else {
              px += reporte[0][i].length * 4 + 15;
              $scope.posXforPdf.push(px);
            }
          }
        }
      } else {
        px = 65;
        for (var i = 0; i < reporte[0].length; i++) {
          doc.text(reporte[0][i], px, 90);
          if (i == 0) {
            px += 20;
            $scope.posXforPdf.push(px);
          } else {
            if ($scope.imprimir.detalle) {
              px += 40;
              // $scope.posXforPdf.push(px)
            } else {
              px += 60;
              // $scope.posXforPdf.push(px)
            }
          }
        }
      }

      // if ($scope.imprimir.detalle) {
      // 	doc.font('Helvetica-Bold', 8);
      // 	doc.text("Nº", 65, 90);
      // 	doc.text("Sucursal", 75, 90);
      // 	doc.text("Almacén", 85, 90)
      // 	doc.text("Fecha", 95, 90);
      // 	doc.text("Hora-fecha", 105, 90);
      // 	doc.text("Usuario", 115, 90);
      // 	doc.text("Estado", 125, 90);
      // 	doc.text("Detalle", 135, 90);
      // 	doc.text("Unidad", 145, 90);
      // 	doc.text("Grupo", 155, 90);
      // 	doc.text("Subgrupo", 165, 90);
      // 	doc.text("Cantidad", 175, 90);
      // 	doc.text("Costo", 185, 90);
      // 	doc.text("Total", 195, 90);
      // } else {
      // 	doc.font('Helvetica-Bold', 8);
      // 	doc.text("Nº", 65, 90);
      // 	doc.text("Sucursal", 75, 90);
      // 	doc.text("Fecha", 95, 90);
      // 	doc.text("Hora-fecha", 105, 90);
      // 	doc.text("Monto", 115, 90);
      // 	doc.text("Usuario", 125, 90);
      // 	doc.text("Estado", 135, 90);
      // }
      doc.font("Helvetica", 8);
    };

    // $scope.abrirModalPedido = function () {
    // 	$scope.abrirPopup($scope.idDialogListadoPedido)
    // }
    $scope.cerrarModalEdicionPedido = () => {
      $scope.cerrarPopup($scope.modalEdicionOrdenCompra);
    };
    $scope.abrirModalProductosProveedor = function (pedido) {
      if ($scope.checkProveedor(pedido)) {
        $scope.buscarProductos(null, $scope.pedido);
        // $scope.obtenerProductosProveedor($scope.pedido.proveedor);
        // $scope.verificarAsignacionProductosProveedor()
        $scope.abrirPopup($scope.idDialogProductosProveedor);
      } else {
        SweetAlert.swal(
          "",
          "Seleccione un proveedor para ver su asignación de productos..",
          "warning"
        );
      }
    };

    $scope.seleccionarProductoAsignado = function (producto) {
      if (producto.seleccionado) {
        if (
          !$scope.productosProveedorSeleccionados.some(function (id) {
            return id === producto.id;
          })
        ) {
          $scope.productosProveedorSeleccionados.push(producto);
        }
      } else {
        var indxDorp = $scope.productosProveedorSeleccionados.indexOf(producto);
        if (indxDorp >= 0 && !producto.seleccionado) {
          $scope.productosProveedorSeleccionados.splice(indxDorp, 1);
        } else if (indxDorp == -1 && producto.seleccionado) {
          $scope.productosProveedorSeleccionados.push(producto.id);
        }
      }
    };

    $scope.agregarProductosSeleccionados = function () {
      if ($scope.productosProveedorSeleccionados.length > 0) {
        $scope.productosProveedorSeleccionados.forEach(async function (
          producto,
          i,
          arr
        ) {
          var inventarioDisponible =
            await $scope.obtenerInventarioTotalProvedor(producto);
          $scope.detallePedido = {
            producto: producto,
            costo_unitario: producto.precio_unitario,
            inventario_disponible: inventarioDisponible,
            cantidad: 1,
            id_grupo: producto.id_grupo,
            id_subgrupo: producto.id_subgrupo,
          };
          $scope.agregardetallePedido($scope.detallePedido);
          if (i === arr.length) {
            $scope.cerrarModalProductosAsignadosProveedor();
          }
        });
      } else {
        SweetAlert.swal(
          "",
          "No se seleccionó ningún producto para ser agregado.",
          "warning"
        );
      }
      $scope.cerrarModalProductosAsignadosProveedor(true);
      $scope.$evalAsync();
    };

    $scope.eliminarDetallePedido = function (detalle) {
      $scope.detallesPedido.splice($scope.detallesPedido.indexOf(detalle), 1);
      $scope.pedido.total = $scope.sumarTotalPedido();
    };

    $scope.generarPorProveedor = function () {
      if ($scope.pedido.proveedor) {
        if ($scope.pedido.por_proveedor) {
          if ($scope.pedido.proveedor.productos.length > 0) {
            $scope.paginatorProductosAsignados.filter = $scope
              .productosAsignadosPorveedor.grupo
              ? $scope.productosAsignadosPorveedor.grupo
              : { id: 0 };
            var ids_productos_proveedor = "";

            // var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginatorProductosAsignados, $scope.usuario.id); //por grupos
            var prom = ListaProductosProveedores(
              $scope.usuario.id_empresa,
              $scope.pedido.proveedor
            );
            prom
              .then(function (res) {
                if (res.hasErr) {
                  SweetAlert.swal("", res.mensaje, "error");
                  $scope.listaProductosProveedor = [];
                } else {
                  if (res.productos) {
                    var arr = res.productos.split(",");
                    $scope.listaProductosProveedor = arr.map(function (id) {
                      return parseInt(id);
                    });
                    var promesa = ProductosPaginadorAsignados(
                      $scope.usuario.id_empresa,
                      $scope.paginatorProductosAsignados,
                      $scope.usuario.id,
                      $scope.listaProductosProveedor,
                      true
                    ); ///por subgrupos
                    promesa
                      .then(function (dato) {
                        if (dato.hasErr) {
                          SweetAlert.swal("", dato.mensaje, "error");
                        } else {
                          $scope.paginatorProductosAsignados.setPages(
                            dato.paginas
                          );
                          $scope.productosAsignadosProveedor = dato.productos;
                          $scope.productosAsignadosProveedor.forEach(function (
                            producto
                          ) {
                            if (
                              $scope.listaProductosProveedor.some(function (
                                id
                              ) {
                                return id === producto.id;
                              })
                            ) {
                              $scope.detallePedido = {
                                producto: producto,
                                costo_unitario: producto.precio_unitario,
                                cantidad: 1,
                                id_grupo: producto.id_grupo,
                                id_subgrupo: producto.id_subgrupo,
                              };
                              $scope.agregardetallePedido($scope.detallePedido);
                            }
                          });
                        }
                        blockUI.stop();
                      })
                      .catch(function (err) {
                        blockUI.stop();
                        var memo =
                          err.stack !== undefined &&
                          err.stack !== null &&
                          err.stack !== ""
                            ? err.stack
                            : err.data !== null &&
                              (err.data !== undefined) & (err.data !== "")
                            ? err.data
                            : "Error: se perdio la conexión con el servidor.";
                        SweetAlert.swal("", memo, "error");
                      });
                  } else {
                    SweetAlert.swal(
                      "",
                      "El proveedor no tiene productos asignados.",
                      "warning"
                    );
                    $scope.listaProductosProveedor = [];
                  }
                }
                blockUI.stop();
              })
              .catch(function (err) {
                blockUI.stop();
                var memo =
                  err.stack !== undefined &&
                  err.stack !== null &&
                  err.stack !== ""
                    ? err.stack
                    : err.data !== null &&
                      (err.data !== undefined) & (err.data !== "")
                    ? err.data
                    : "Error: se perdio la conexión con el servidor.";
                SweetAlert.swal("", memo, "error");
              });
          } else {
            SweetAlert.swal(
              "",
              "El proveedor no tiene productos asignados.",
              "warning"
            );
          }
        } else {
          $scope.detallePedido = {};
          $scope.detallesPedido = [];
        }
      } else {
        SweetAlert.swal("", "Seleccione un proveedor.", "warning");
      }
    };

    $scope.verificarAsignacionProductosProveedor = function () {
      if ($scope.listaProductosProveedor.length > 0) {
        $scope.listaProductosProveedor.forEach(function (id) {
          $scope.productosAsignacionProveedor.forEach(function (producto) {
            if (producto.id === id) {
              producto.seleccionado = true;
            }
          });
        });
      }
    };

    $scope.verificarSeleccionProductosProveedor = function () {
      if ($scope.listaProductosProveedorSeleccionados.length > 0) {
        $scope.listaProductosProveedorSeleccionados.forEach(function (id) {
          $scope.productosProveedorSeleccionados.forEach(function (producto) {
            if (producto.id === id) {
              producto.seleccionado = true;
            }
          });
        });
      }
    };

    $scope.obtenerProductos = function () {
      $scope.paginatorProductos = Paginator();
      $scope.paginatorProductos.column = "nombre";
      $scope.paginatorProductos.filter = $scope.grupo;
      $scope.paginatorProductos.callBack = $scope.buscarProductos;
      $scope.paginatorProductos.getSearch("", null, null);
    };

    $scope.buscarProducto = function (query, proveedor) {
      if ($scope.pedido === undefined) {
        SweetAlert.swal("", "Seleccione un almacen.", "warning");
        return;
      }
      if (
        query != "" &&
        query != undefined &&
        proveedor == undefined &&
        $scope.pedido.almacen.id
      ) {
        var promesa = ListaProductosEmpresaUsuario(
          $scope.usuario.id_empresa,
          query,
          $scope.usuario.id,
          $scope.pedido.almacen.id
        );
        return promesa;
      } else if (
        query != "" &&
        query != undefined &&
        proveedor &&
        $scope.pedido.almacen
      ) {
        var promesa = ListaProductosEmpresaUsuario(
          $scope.usuario.id_empresa,
          query,
          $scope.usuario.id,
          $scope.pedido.almacen.id
        );
        return promesa;
      } else {
        SweetAlert.swal("", "Seleccione un almacen.", "warning");
      }
    };

    $scope.filtrarProductosSeleccionadosPorGrupo = function () {
      if ($scope.detallesPedido.length > 0) {
        var productosPorGrupo = [];
        $scope.detallesPedido.forEach(function (prod) {
          if (prod.id_subgrupo === $scope.pedido.grupo) {
            productosPorGrupo.push(prod);
          }
        });
        if (productosPorGrupo.length > 0) {
          $scope.detallesPedido = productosPorGrupo.map(function (prod) {
            return prod;
          });
        } else {
          SweetAlert.swal(
            "",
            "No existen productos pertenecientes al grupo seleccionado. No se realizaron cambios.",
            "warning"
          );
        }
      }
    };

    $scope.modificarListaProductosProveedor = function (producto) {
      var indx = $scope.listaProductosProveedor.indexOf(producto.id);
      if (indx >= 0 && !producto.seleccionado) {
        $scope.listaProductosProveedor.splice(indx, 1);
      } else if (indx == -1 && producto.seleccionado) {
        $scope.listaProductosProveedor.push(producto.id);
      }
    };

    $scope.modificarListaProductosProveedorSeleccionados = function (producto) {
      var indx = $scope.listaProductosProveedorSeleccionados.indexOf(
        producto.id
      );
      if (indx >= 0 && !producto.seleccionado) {
        $scope.listaProductosProveedorSeleccionados.splice(indx, 1);
      } else if (indx == -1 && producto.seleccionado) {
        $scope.listaProductosProveedorSeleccionados.push(producto.id);
      }
    };

    $scope.seleccionarTodosParaAsignar = function () {
      if ($scope.seleccionProductosProveedor.seleccionar_todos) {
        $scope.productosAsignacionProveedor.forEach(function (producto) {
          producto.seleccionado = true;
          $scope.modificarListaProductosProveedor(producto);
        });
      } else {
        $scope.productosAsignacionProveedor.forEach(function (producto) {
          producto.seleccionado = false;
          $scope.modificarListaProductosProveedor(producto);
        });
      }
    };

    $scope.seleccionarTodosAsignados = function () {
      $scope.listaProductosProveedorSeleccionados = [];
      if ($scope.seleccionProductosProveedorAsignados.seleccionar_todos) {
        $scope.productosAsignadosProveedor.forEach(function (producto) {
          producto.seleccionado = true;
          $scope.productosProveedorSeleccionados.push(producto);
          $scope.modificarListaProductosProveedorSeleccionados(producto);
        });
      } else {
        $scope.productosAsignadosProveedor.forEach(function (producto) {
          producto.seleccionado = false;
          $scope.productosProveedorSeleccionados.push(producto);
          $scope.modificarListaProductosProveedorSeleccionados(producto);
        });
      }
    };
    // $scope.deseleccionarTodosAsignados = function () {
    // 	$scope.productosAsignadosProveedor.forEach(function (producto) {
    // 		producto.seleccionado = false;
    // 	});
    // }

    $scope.actualizarProductosProveedor = function () {
      var prom = ActualizarProductosProveedor(
        $scope.usuario.id_empresa,
        $scope.listaProductosProveedor,
        $scope.pedido.proveedor
      );
      prom
        .then(function (res) {
          if (res.hasErr) {
            SweetAlert.swal("", res.mensaje, "error");
          } else {
            SweetAlert.swal("Guardado!", res.mensaje, "success");
            $scope.cerrarModalProductosProveedor();
          }
        })
        .catch(function (err) {
          blockUI.stop();
          var memo =
            err.stack !== undefined && err.stack !== null && err.stack !== ""
              ? err.stack
              : err.data !== null &&
                (err.data !== undefined) & (err.data !== "")
              ? err.data
              : "Error: se perdio la conexión con el servidor.";
          SweetAlert.swal("", memo, "error");
        });
    };

    $scope.verificarPulso = function (evento, textoBusqueda) {
      if (evento.keyCode === 13) {
        //enter pressed
        $scope.buscarProductos(1);
      }
    };

    $scope.verificarPulsoAsignados = function (evento, textoBusqueda) {
      if (evento.keyCode === 13) {
        //enter pressed
        $scope.buscarProductosAsignados(1);
      }
    };

    $scope.buscarProductos = function (pagina, pedido) {
      blockUI.start();
      if (pagina) {
        $scope.paginatorProductos.currentPage = pagina;
      }
      $scope.paginatorProductos.filter = $scope.configuracionPorveedor.grupo
        ? $scope.configuracionPorveedor.grupo
        : { id: 0 };
      $scope.paginatorProductos.search = $scope.configuracionPorveedor
        .textoBusqueda
        ? $scope.configuracionPorveedor.textoBusqueda
        : 0;
      // var promesa = ProductosPaginador($scope.usuario.id_empresa, $scope.paginatorProductos, $scope.usuario.id); //por grupos
      var promesa = ProductosPaginadorSubgrupos(
        $scope.usuario.id_empresa,
        $scope.paginatorProductos,
        $scope.usuario.id
      ); ///por subgrupos
      promesa
        .then(function (dato) {
          if (dato.hasErr) {
            SweetAlert.swal("", dato.mensaje, "error");
          } else {
            $scope.paginatorProductos.setPages(dato.paginas);
            $scope.productosAsignacionProveedor = dato.productos;
            if ($scope.pedido && $scope.pedido.proveedor) {
              var prom = ListaProductosProveedores(
                $scope.usuario.id_empresa,
                $scope.pedido.proveedor
              );
              prom
                .then(function (res) {
                  if (res.hasErr) {
                    SweetAlert.swal("", res.mensaje, "error");
                    $scope.listaProductosProveedor = [];
                  } else {
                    if (res.productos) {
                      var arr = res.productos.split(",");
                      $scope.listaProductosProveedor = arr.map(function (id) {
                        return parseInt(id);
                      });
                      $scope.verificarAsignacionProductosProveedor();
                    } else {
                      $scope.listaProductosProveedor = [];
                    }
                  }
                  blockUI.stop();
                })
                .catch(function (err) {
                  blockUI.stop();
                  var memo =
                    err.stack !== undefined &&
                    err.stack !== null &&
                    err.stack !== ""
                      ? err.stack
                      : err.data !== null &&
                        (err.data !== undefined) & (err.data !== "")
                      ? err.data
                      : "Error: se perdio la conexión con el servidor.";
                  SweetAlert.swal("", memo, "error");
                });
            }
          }
          blockUI.stop();
        })
        .catch(function (err) {
          blockUI.stop();
          var memo =
            err.stack !== undefined && err.stack !== null && err.stack !== ""
              ? err.stack
              : err.data !== null &&
                (err.data !== undefined) & (err.data !== "")
              ? err.data
              : "Error: se perdio la conexión con el servidor.";
          SweetAlert.swal("", memo, "error");
        });
    };

    $scope.obtenerProductosAsignados = function () {
      $scope.paginatorProductosAsignados = Paginator();
      $scope.paginatorProductosAsignados.column = "nombre";
      $scope.paginatorProductosAsignados.filter = $scope.grupo;
      $scope.paginatorProductosAsignados.callBack =
        $scope.buscarProductosAsignados;
      $scope.paginatorProductosAsignados.getSearch("", null, null);
    };

    $scope.buscarProductosAsignados = function (pagina, pedido) {
      blockUI.start();
      if (pagina) {
        $scope.paginatorProductosAsignados.currentPage = pagina;
      }
      if ($scope.pedido === undefined) {
        $scope.pedido = {};
        blockUI.stop();
      } else {
        if ($scope.pedido.proveedor) {
          $scope.paginatorProductosAsignados.filter = $scope
            .productosAsignadosPorveedor.grupo
            ? $scope.productosAsignadosPorveedor.grupo
            : { id: 0 };
          $scope.paginatorProductosAsignados.search = $scope
            .productosAsignadosPorveedor.textoBusqueda
            ? $scope.productosAsignadosPorveedor.textoBusqueda
            : 0;
          var prom = ListaProductosProveedores(
            $scope.usuario.id_empresa,
            $scope.pedido.proveedor
          );
          prom
            .then(function (res) {
              if (res.hasErr) {
                SweetAlert.swal("", res.mensaje, "error");
                $scope.listaProductosProveedor = [];
              } else {
                if (res.productos) {
                  var arr = res.productos.split(",");
                  $scope.listaProductosProveedor = arr.map(function (id) {
                    return parseInt(id);
                  });
                  var promesa = ProductosPaginadorAsignados(
                    $scope.usuario.id_empresa,
                    $scope.paginatorProductosAsignados,
                    $scope.usuario.id,
                    $scope.listaProductosProveedor
                  ); ///por subgrupos
                  promesa
                    .then(function (dato) {
                      if (dato.hasErr) {
                        SweetAlert.swal("", dato.mensaje, "error");
                      } else {
                        $scope.paginatorProductosAsignados.setPages(
                          dato.paginas
                        );
                        $scope.productosAsignadosProveedor = dato.productos;
                        $scope.listaProductosProveedorSeleccionados = [];
                        $scope.verificarSeleccionProductosProveedor();
                      }
                      blockUI.stop();
                    })
                    .catch(function (err) {
                      blockUI.stop();
                      var memo =
                        err.stack !== undefined &&
                        err.stack !== null &&
                        err.stack !== ""
                          ? err.stack
                          : err.data !== null &&
                            (err.data !== undefined) & (err.data !== "")
                          ? err.data
                          : "Error: se perdio la conexión con el servidor.";
                      SweetAlert.swal("", memo, "error");
                    });
                } else {
                  $scope.listaProductosProveedor = [];
                }
              }
              blockUI.stop();
            })
            .catch(function (err) {
              blockUI.stop();
              var memo =
                err.stack !== undefined &&
                err.stack !== null &&
                err.stack !== ""
                  ? err.stack
                  : err.data !== null &&
                    (err.data !== undefined) & (err.data !== "")
                  ? err.data
                  : "Error: se perdio la conexión con el servidor.";
              SweetAlert.swal("", memo, "error");
            });
        } else {
          SweetAlert.swal(
            "",
            "El proveedor no tiene productos asignados.",
            "warning"
          );
        }
      }
    };

    $scope.cerrarModalProductosProveedor = function () {
      $scope.productosAsignacionProveedor = [];
      $scope.listaProductosProveedor = [];
      $scope.cerrarPopup($scope.idDialogProductosProveedor);
    };

    $scope.abrirModalNuevoPedido = function () {
      $scope.noResults = false;
      $scope.querySearch = "";
      $scope.detallesPedido = [];
      $scope.detallePedido = {};
      $scope.pedido = { fecha: $scope.fechaATexto(new Date()) };
      $scope.pedido.usar_configuracion_iso =
        $scope.usuario.empresa.usar_configuracion_iso;
      $scope.pedido.tipoPago = $scope.tiposPago[1];
      $scope.cambiarTipoPago($scope.pedido.tipoPago);
      if ($scope.sucursales.length == 1) {
        $scope.pedido.sucursal = $scope.sucursales[0].id;
        $scope.obtenerAlmacenes($scope.pedido.sucursal);
      }
      $scope.abrirPopup($scope.idDialogNuevoPedido);
    };

    $scope.cerrarModalNuevoPedido = function () {
      $scope.pedido = {};
      $scope.detallesPedido = [];
      $scope.cerrarPopup($scope.idDialogNuevoPedido);
    };

    $scope.abrirmodalBusquedaProveedor = function () {
      $scope.filtrarProveedores("");
      $scope.abrirPopup($scope.idDialogBusquedaProveedor);
    };

    $scope.cerrarModalBusquedaProveedor = function () {
      $scope.cerrarPopup($scope.idDialogBusquedaProveedor);
    };

    $scope.abrirmodalProductosAsignadosProveedor = function () {
      if ($scope.pedido === undefined) {
        $scope.pedido = { por_proveedor: false };
      }
      if (
        $scope.productosProveedorSeleccionados === undefined ||
        $scope.productosProveedorSeleccionados === null
      ) {
        $scope.productosProveedorSeleccionados = [];
      }
      if ($scope.pedido.proveedor) {
        $scope.buscarProductosAsignados();
        $scope.abrirPopup($scope.idDialogProductosAsigandosProveedor);
      } else {
        SweetAlert.swal("", "Seleccione un proveedor.", "warning");
      }
    };

    $scope.cerrarModalProductosAsignadosProveedor = function (throwChanges) {
      if (throwChanges) {
        $scope.productosProveedorSeleccionados = [];
        $scope.seleccionProductosProveedorAsignados.seleccionar_todos = false;
      }
      $scope.cerrarPopup($scope.idDialogProductosAsigandosProveedor);
    };
    $scope.abrirPopupInventario = function () {
      $scope.abs = $window.Math.abs;
      $scope.itemsPorPagina = 10;
      $scope.paginaActual = 1;
      $scope.columna = "nombre";
      $scope.direccion = "asc";
      $scope.cantidadInv = "0";
      $scope.textoBusqueda = "";
      if ($scope.pedido.almacen) {
        $scope.almacenBusqueda = $scope.pedido.almacen;
        $scope.buscarInventarios(
          $scope.almacenBusqueda.id,
          $scope.paginaActual,
          $scope.itemsPorPagina,
          $scope.textoBusqueda,
          $scope.columna,
          $scope.direccion,
          $scope.cantidadInv
        );
      } else {
        return SweetAlert.swal(
          "",
          "Seleccione un almacen y sucursal.",
          "warning"
        );
      }
      $scope.abrirPopup($scope.idModalInventarioPedidos);
    };
    $scope.cerrarPopupInventario = function () {
      $scope.abs = $window.Math.abs;
      $scope.itemsPorPagina = 10;
      $scope.paginaActual = 1;
      $scope.columna = "nombre";
      $scope.direccion = "asc";
      $scope.cantidadInv = "0";
      $scope.textoBusqueda = "";
      if ($scope.venta.almacen) {
        $scope.almacenBusqueda = $scope.venta.almacen;
        $scope.buscarInventarios(
          $scope.almacenBusqueda.id,
          $scope.paginaActual,
          $scope.itemsPorPagina,
          $scope.textoBusqueda,
          $scope.columna,
          $scope.direccion,
          $scope.cantidadInv
        );
      }
      $scope.cerrarPopup($scope.idModalInventarioPedidos);
    };
    $scope.obtenerConfiguracionesIso = async function (idSucursal) {
      var data = await ObtenerConfiguracionIso(idSucursal);
      return data.configuracionesIso;
    };
    $scope.generarPdfpedido = function (idPedido) {
      var promise = ObtenerRegistroPedidoPorId(idPedido);
      promise.then(function (data) {
        if (data.hasErr) {
          SweetAlert.swal(
            "",
            "Ocurrió un problema al recuperar los datos del pedido",
            "warning"
          );
        } else {
          blockUI.start();
          var pedido = data.pedido;
          var doc = new PDFDocument({ size: "letter", margin: 10 });
          var stream = doc.pipe(blobStream());
          // draw some text
          var totalCosto = 0;
          var x = 30,
            y = 170,
            width = 555,
            itemsPorPagina = 28,
            items = 0,
            pagina = 1,
            totalPaginas = Math.ceil(
              pedido.detallesPedido.length / itemsPorPagina
            );
          $scope.dibujarCabeceraPDFPedido(doc, 1, totalPaginas, pedido);
          doc.font("Helvetica", 8);
          for (
            var i = 0;
            i < pedido.detallesPedido.length && items <= itemsPorPagina;
            i++
          ) {
            var detalle = pedido.detallesPedido[i],
              height = 20;
            doc.rect(x, y, width, height).stroke();
            doc.text(i + 1, 40, y + 8, { width: 30, align: "center" });
            doc.text(detalle.producto.codigo, 70, y + 8, {
              width: 60,
              align: "center",
            });
            if (detalle.producto.nombre) {
              if (detalle.producto.nombre.length <= 23)
                doc.text(
                  detalle.producto.nombre ? detalle.producto.nombre : "",
                  132,
                  y + 8,
                  { width: 119 }
                );
              if (
                detalle.producto.nombre.length >= 24 &&
                detalle.producto.nombre.length <= 46
              )
                doc.text(
                  detalle.producto.nombre ? detalle.producto.nombre : "",
                  132,
                  y + 3,
                  { width: 118 }
                );
              if (detalle.producto.nombre.length > 46)
                doc.text(
                  detalle.producto.nombre.slice(0, 49) + "...",
                  132,
                  y + 3,
                  { width: 118 }
                );
            }
            doc.text(
              detalle.producto.unidad_medida
                ? detalle.producto.unidad_medida
                : "",
              250,
              y + 8,
              { width: 35, align: "center" }
            );
            doc.text(detalle.cantidad ? detalle.cantidad : "", 285, y + 8, {
              width: 33,
              align: "center",
            });
            doc.text(
              detalle.costo_unitario
                ? number_format_negativo_to_positvo(detalle.costo_unitario, 2)
                : "",
              320,
              y + 8,
              { width: 38, align: "right" }
            );
            doc.text(
              detalle.cantidad && detalle.costo_unitario
                ? number_format_negativo_to_positvo(
                    detalle.cantidad * detalle.costo_unitario,
                    2
                  )
                : "",
              360,
              y + 8,
              { width: 38, align: "right" }
            );
            totalCosto += detalle.cantidad * detalle.costo_unitario;
            if (detalle.observacion) {
              if (detalle.observacion.length <= 34)
                doc.text(
                  detalle.observacion ? detalle.observacion.toUpperCase() : "",
                  402,
                  y + 8,
                  { width: 181 }
                );
              if (
                detalle.observacion.length > 34 &&
                detalle.observacion.length < 64
              )
                doc.text(
                  detalle.observacion ? detalle.observacion.toUpperCase() : "",
                  402,
                  y + 3,
                  { width: 181 }
                );
              if (detalle.observacion.length > 64)
                doc.text(detalle.observacion.slice(0, 64) + "...", 402, y + 3, {
                  width: 181,
                });
            }
            y = y + height;
            items++;
            if (y >= 720) {
              y = y + 10;
              doc.font("Helvetica", 7);
              doc.text(pagina + " de " + totalPaginas, 520, 740);
              var currentDate = new Date();
              //doc.rect(50,y+6,520,0).stroke();
              doc.text(
                "FECHA : " +
                  currentDate.getDate() +
                  "/" +
                  (currentDate.getMonth() + 1) +
                  "/" +
                  currentDate.getFullYear() +
                  "   " +
                  "Hrs:" +
                  currentDate.getHours() +
                  ":" +
                  currentDate.getMinutes(),
                55,
                740
              );
              doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 740);

              doc.addPage({ margin: 0, bufferPages: true });
              y = 170;
              items = 0;
              pagina = pagina + 1;
              $scope.dibujarCabeceraPDFPedido(
                doc,
                pagina,
                totalPaginas,
                pedido
              );
              doc.font("Helvetica", 8);
            }
          }
          doc.font("Helvetica-Bold", 8);
          doc.text("TOTAL", 300, y + 8, { width: 58, align: "right" });
          doc.text(
            number_format_negativo_to_positvo(totalCosto, 2),
            360,
            y + 8,
            { width: 38, align: "right" }
          );
          doc.font("Helvetica", 7);
          doc.text(pagina + " de " + totalPaginas, 520, 740);
          var currentDate = new Date();
          doc.text(
            "FECHA : " +
              currentDate.getDate() +
              "/" +
              (currentDate.getMonth() + 1) +
              "/" +
              currentDate.getFullYear() +
              "   " +
              "Hrs:" +
              currentDate.getHours() +
              ":" +
              currentDate.getMinutes(),
            55,
            740
          );
          doc.text("USUARIO: " + $scope.usuario.nombre_usuario, 170, 740);
          doc.end();
          stream.on("finish", function () {
            var fileURL = stream.toBlobURL("application/pdf");
            window.open(fileURL, "_blank", "location=no");
          });
        }
        blockUI.stop();
      });
    };

    $scope.dibujarCabeceraPDFPedido = function (
      doc,
      pagina,
      totalPaginas,
      pedido
    ) {
      doc.font("Helvetica-Bold", 8);
      doc.text($scope.usuario.empresa.razon_social, 45, 25, {
        width: 150,
        align: "center",
      });
      doc.text($scope.usuario.empresa.direccion, 45, 35, {
        width: 150,
        align: "center",
      });
      doc.text("Nro." + pedido.numero_correlativo, 450, 35, {
        width: 150,
        align: "center",
      });
      var telf = $scope.usuario.empresa.telfono1
        ? $scope.usuario.empresa.telfono1
        : "";
      var telf = $scope.usuario.empresa.telfono2
        ? telf + " - " + $scope.usuario.empresa.telfono2
        : "";
      var telf = $scope.usuario.empresa.telfono3
        ? telf + " - " + $scope.usuario.empresa.telfono3
        : "";
      doc.text("TELF:" + telf, 45, 55, { width: 150, align: "center" });
      doc.text(
        $scope.usuario.empresa
          ? $scope.usuario.empresa.departamento.nombre.toUpperCase() +
              "-BOLIVIA"
          : "BOLIVIA",
        45,
        65,
        { width: 150, align: "center" }
      );
      doc.font("Helvetica-Bold", 12);
      doc.text("SOLICITUD DE COMPRA", 0, 75, { align: "center" });
      doc.font("Helvetica-Bold", 8);
      //doc.text("PÁGINA " + pagina + " DE " + totalPaginas, 0, 740, { align: "center" });
      doc.rect(30, 100, 555, 70).stroke();
      doc.font("Helvetica", 8);
      doc.text($scope.fechaATexto(pedido.fecha), 75, 110);
      doc.text(pedido.proveedor.razon_social, 100, 125);
      doc.text(pedido.proveedor.nit, 480, 110);
      doc.font("Helvetica-Bold", 8);
      doc.text("Fecha : ", 45, 110);
      doc.text("Señor(es) : ", 45, 125);
      doc.text("NIT : ", 450, 110);
      doc.font("Helvetica", 8);
      doc.rect(30, 140, 555, 0).stroke();
      doc.font("Helvetica-Bold", 8);
      doc.text("NRO", 40, 150, { width: 30, align: "center" });
      doc.text("CÓDIGO", 70, 150, { width: 60, align: "center" });
      doc.text("PRODUCTO", 130, 150, { width: 120, align: "center" });
      doc.text("UND.", 250, 150, { width: 35, align: "center" });
      doc.text("CANT", 285, 150, { width: 35, align: "center" });
      doc.text("P/U", 320, 150, { width: 40, align: "center" });
      doc.text("TOTAL", 360, 150, { width: 40, align: "center" });
      doc.text("OBSERVACIÓN", 400, 150, { width: 185, align: "center" });
      doc.font("Helvetica", 8);
    };
    $scope.cambiarTipoPago = function (tipoPago) {
      var tipoPago = $.grep($scope.tiposPago, function (e) {
        return e.id == tipoPago.id;
      })[0];
      let esContado = tipoPago.nombre_corto == "CONT" ? true : false;
      $scope.pedido.id_tipo_pago = tipoPago.id;
      if (!esContado) {
        $scope.pedido.a_cuenta = 0;
        $scope.pedido.dias_credito = 30;
        $scope.calcularSaldoPedido();
      } else {
        $scope.pedido.a_cuenta = null;
        $scope.pedido.saldo = null;
        $scope.pedido.dias_credito = null;
      }
    };

    $scope.obtenerFormasEntregaPedido = function () {
      blockUI.start();
      var promesa = ClasesTipoEmpresa(
        "FORMASENTREGAP",
        $scope.usuario.id_empresa
      );
      promesa.then(function (entidad) {
        $scope.formasEntrega = entidad;
        blockUI.stop();
      });
    };
    $scope.obtenerTiposDePago = function () {
      blockUI.start();
      var promesa = ClasesTipo("TIPA");
      promesa.then(function (entidad) {
        $scope.tiposPago = entidad.clases.reduce(function (value, x) {
          if (x.nombre_corto != $scope.diccionario.TIPO_PAGO_TARJETA_CREDITO) {
            value.push(x);
          }
          return value;
        }, []);

        blockUI.stop();
      });
    };
    $scope.buscarProductoCodigoEquipo = function (query) {
      if (query != "" && query != undefined) {
        var promesa = ListaProductosEmpresaUsuario(
          $scope.usuario.id_empresa,
          query,
          $scope.usuario.id,
          0
        );
        return promesa;
      }
    };
    $scope.establecerCodigoEquipo = function () {};
    $scope.editarPedido = async (pedido) => {
      $scope.noResults = false;
      $scope.detallesEliminados = 0;
      $scope.querySearch = "";
      try {
        const datosPedido = await ObtenerRegistroPedidoPorId(pedido.id);
        if (datosPedido.hasErr) return alert(datosPedido.mensaje);
        $scope.detallePedido = {};
        $scope.pedido = datosPedido.pedido;
        $scope.detallesPedido = datosPedido.pedido.detallesPedido || [];
        let totalPedido = 0;
        for (let index = 0; index < $scope.detallesPedido.length; index++) {
          if (!$scope.detallesPedido[index].eliminado) {
            $scope.detallesPedido[index].total =
              $scope.detallesPedido[index].cantidad *
              $scope.detallesPedido[index].costo_unitario;
            totalPedido += $scope.detallesPedido[index].total;
          } else {
            $scope.detallesPedido[index].total = 0;
          }
        }
        $scope.pedido.total = totalPedido;
        $scope.obtenerAlmacenes($scope.pedido.almacen.sucursal.id);
        setTimeout(() => {
          $scope.abrirPopup($scope.modalEdicionOrdenCompra);
        }, 500);
        $scope.$evalAsync();
      } catch (err) {
        const msg = err.stack || "Se perdió la conexión.";
        alert(msg);
      }
    };
    $scope.guardarEdicionOrdenCompra = async (pedido) => {
      try {
        const res = await GuardarEdicionPedido(pedido, $scope.usuario.id);
        if (res.hasErr) return SweetAlert.swal("", res.mensaje, "warning");

        SweetAlert.swal("Guardado!", res.mensaje, "success");
        const indexPedido = $scope.listaPedidos.findIndex(
          (pedido_) => pedido_.id === pedido.id
        );
        if (indexPedido)
          $scope.listaPedidos[indexPedido].proveedor = pedido.proveedor;
        $scope.cerrarPopup($scope.modalEdicionOrdenCompra);
        $scope.$evalAsync();
      } catch (error) {
        const msg = err.stack || "Se perdió la conexión.";
        alert(msg);
        SweetAlert.swal("", msg, "error");
      }
    };

    $scope.eliminarDetallePedidoEdicion = (detalle) => {
      detalle.eliminado = true;
      $scope.detallesEliminados += 1;
      if ($scope.detallesEliminados == $scope.detallesPedido.length) {
        SweetAlert.swal(
          "",
          "Agregue un item para poder guardar el Pedido !",
          "warning"
        );
      }
      $scope.pedido.total = $scope.sumarTotalPedido();
    };

    $scope.filtroExcelOrdenCompra = async function (listaPedidos, trueDetalle) {
      $scope.resaltar = false;
      blockUI.start();
      listaPedidos.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 0;
      });

      if (trueDetalle) {
        var data = [
          [
            "N°",
            "SUCURSAL",
            "ALMACEN",
            "PROVEEDOR",
            "DOC",
            "DOC/ISO",
            "FACTURA",
            "FECHA",
            "OBSERVACIÓN",
            "TIPO DE PAGO",
            "DÍAS",
            "TOTAL",
            "FORMA DE ENTREGA",
            "FECHA DE RECEPCIÓN",
            "USUARIO CREADOR",
            "ESTADO",
            "CÓDIGO",
            "ÍTEM",
            "UNIDAD DE MEDIDA",
            "CANTIDAD",
            "P.U.",
            "TOTAL",
            "CODIGO EQUIPO",
            "OBSERVACIÓN",
          ],
        ];
        var index = 1;
        blockUI.start();
        $scope.filtro = $scope.filtrarFiltro($scope.filtro, true);
        $scope.paginator.filter = $scope.filtro;
        // if (filtrado) {
        // 	$scope.paginator.currentPage = 1;
        // }

        var datosPedidos = await PedidosDetallesFiltro(
          $scope.usuario.id_empresa,
          $scope.paginator
        );
        var listaPedidosDetalles = datosPedidos.pedidos;
        $scope.paginator.setPages(datosPedidos.paginas);

        for (var i = 0; i < listaPedidosDetalles.length; i++) {
          var pedido = listaPedidosDetalles[i];
          for (var j = 0; j < pedido.detallesPedido.length; j++) {
            var detalleP = pedido.detallesPedido[j];
            columns = [];
            columns.push(index); //columns.push(i + 1);
            columns.push(
              pedido.almacen
                ? pedido.almacen.sucursal.nombre
                : pedido.sucursal.nombre
            );
            columns.push(pedido.almacen ? pedido.almacen.nombre : "");
            columns.push(pedido.proveedor ? pedido.proveedor.razon_social : "");
            columns.push(pedido.numero_correlativo); // DOC
            columns.push(pedido.numero_iso_orden_compra);
            columns.push(pedido.compra ? pedido.compra.factura : "");
            columns.push(
              pedido.fecha ? $scope.fechaATexto(new Date(pedido.fecha)) : ""
            );
            columns.push(pedido.observacion ? pedido.observacion : "");
            if (pedido.tipoPago) {
              columns.push(pedido.tipoPago.nombre);
              if (
                pedido.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO
              ) {
                columns.push(pedido.dias_credito);
              } else {
                columns.push("");
              }
            } else {
              columns.push("");
              columns.push("");
            }
            columns.push(pedido.total ? pedido.total : "");
            columns.push(pedido.formaEntrega ? pedido.formaEntrega.nombre : "");
            columns.push(
              pedido.fecha_recepcion
                ? $scope.fechaATexto(new Date(pedido.fecha_recepcion))
                : ""
            );
            columns.push(pedido.usuario ? pedido.usuario.nombre_usuario : "");
            columns.push(pedido.estado ? pedido.estado.nombre : "");
            columns.push(
              detalleP.producto ? detalleP.producto.codigo : "ERROR SIN NOMBRE"
            );
            columns.push(
              detalleP.producto ? detalleP.producto.nombre : "ERROR SIN NOMBRE"
            );
            columns.push(
              detalleP.producto
                ? detalleP.producto.unidad_medida
                : "ERROR SIN NOMBRE"
            );
            columns.push(
              detalleP.producto ? detalleP.cantidad : "ERROR SIN NOMBRE"
            );
            columns.push(detalleP.producto ? detalleP.costo_unitario : "0");
            columns.push(
              detalleP.producto
                ? detalleP.cantidad * detalleP.costo_unitario
                : "0"
            );
            columns.push(
              detalleP.codigoEquipo ? detalleP.codigoEquipo.nombre : ""
            );
            columns.push(detalleP.observacion ? detalleP.observacion : "");

            data.push(columns);
            index = index + 1;
          }
        }

        $scope.filtro = $scope.filtrarFiltro($scope.filtro, true, true);
        blockUI.stop();
      } else {
        var data = [
          [
            "N°",
            "SUCURSAL",
            "ALMACEN",
            "PROVEEDOR",
            "DOC",
            "DOC/ISO",
            "FACTURA",
            "FECHA",
            "HORA-FECHA",
            "OBSERVACIÓN",
            "TIPO DE PAGO",
            "DÍAS",
            "TOTAL",
            "FORMA DE ENTREGA",
            "FECHA DE RECEPCIÓN",
            "USUARIO CREADOR",
            "ESTADO",
          ],
        ];
        for (var i = 0; i < listaPedidos.length; i++) {
          var pedido = listaPedidos[i];
          var index = 1;
          columns = [];
          columns.push(index); //columns.push(i + 1);
          columns.push(
            pedido.almacen
              ? pedido.almacen.sucursal.nombre
              : pedido.sucursal.nombre
          );
          columns.push(pedido.almacen ? pedido.almacen.nombre : "");
          columns.push(pedido.proveedor ? pedido.proveedor.razon_social : "");
          columns.push(pedido.numero_correlativo); // DOC
          columns.push(pedido.numero_iso_orden_compra);
          columns.push(pedido.compra ? pedido.compra.factura : "");
          columns.push(
            pedido.fecha ? $scope.fechaATexto(new Date(pedido.fecha)) : ""
          );
          columns.push(
            pedido.fecha
              ? $scope.convertirFechaHora(new Date(pedido.fecha))
              : ""
          ); // hora fecha
          columns.push(pedido.observacion ? pedido.observacion : "");
          if (pedido.tipoPago) {
            columns.push(pedido.tipoPago.nombre);
            if (
              pedido.tipoPago.nombre == $scope.diccionario.TIPO_PAGO_CREDITO
            ) {
              columns.push(pedido.dias_credito);
            } else {
              columns.push("");
            }
          } else {
            columns.push("");
            columns.push("");
          }
          columns.push(pedido.total ? pedido.total : "");
          columns.push(pedido.formaEntrega ? pedido.formaEntrega.nombre : "");
          columns.push(
            pedido.fecha_recepcion
              ? $scope.fechaATexto(new Date(pedido.fecha_recepcion))
              : ""
          );
          columns.push(pedido.usuario ? pedido.usuario.nombre_usuario : "");
          columns.push(pedido.estado ? pedido.estado.nombre : "");

          data.push(columns);
          index = index + 1;
        }
      }
      var ws_name = "SheetJS";
      var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
      /* add worksheet to workbook */
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "binary",
      });
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        "Reporte-Orden-Compras.xlsx"
      );
      blockUI.stop();
      $scope.$evalAsync();
    };

    $scope.pdfOrdenCompra = async (listaPedidos) => {
      blockUI.stop();
      const doc = new PDFDocument({
        size: "letter",
        margin: 30,
        compress: false,
      });
      const stream = doc.pipe(blobStream());
      const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
      imgDelay
        .then((imagen) => {
          let y = 40;
          doc.moveDown(2);
          doc.font("Helvetica-Bold", 10);
          doc.text("REPORTE DE ORDENES DE COMPRA", 100, y, {
            width: 500,
            align: "center",
          });
          doc.font("Helvetica", 9);
          y += 15;
          // const inf_Depart = $scope.usuario.empresa.departamento.nombre;
          // doc.text(inf_Depart + ' - ' + $scope.aFechaLarga(pagosProg.CompProgramacPagos.fecha), 100, y, { width: 500, align: 'center' });
          // y += 15;
          // doc.text('N° ' + pagosProg.CompProgramacPagos.correlativo, 100, y, { width: 500, align: 'center' });

          if (imagen) doc.image(imagen, 45, 20, { fit: [70, 70] });
          // doc.font('Helvetica', 6);
          // const info_empresa = $scope.usuario.empresa.direccion + ' ' + $scope.usuario.empresa.departamento.nombre;
          // doc.text(info_empresa, 40, y, { width: 80, align: 'center' });
          y += 40;
          doc.font("Helvetica-Bold", 8);
          doc.text("N°", 40, y);
          doc.text("SUCURSAL", 60, y);
          doc.text("ALMACEN", 120, y, { width: 45 });
          doc.text("PROVEEDOR", 190, y, { width: 130 });
          doc.text("DOC", 305, y, { width: 50, align: "center" });
          doc.text("DOC/ISO", 335, y, { width: 75, align: "center" });
          doc.text("FACTURA", 390, y, { width: 55, align: "center" });
          doc.text("FECHA", 450, y, { width: 50 });
          doc.text("TOTAL", 500, y, { width: 55 });
          doc.text("ESTADO", 549, y, { width: 50 });
          y += 10;
          doc.rect(40, y - 3, 542, 0).stroke();
          doc.font("Helvetica", 7);
          doc.lineWidth(0.5);
          let paginas = 1;
          let total_bs = 0;
          var items = 0;
          var itemsPorPagina = 40;
          var totalPaginas = Math.ceil(listaPedidos.length / itemsPorPagina);
          doc.text("Pagina: " + paginas + " de " + totalPaginas, 0, 740, {
            align: "center",
          });
          if (listaPedidos.length) {
            for (let j = 0; j < listaPedidos.length; j++) {
              const registr = listaPedidos[j];
              // if (j % 3 != 0) doc.rect(40, y, 542, 12).fill('#f4f4f4').fillColor('#000');
              doc.font("Helvetica", 6);
              doc.text(j + 1, 40, y + 3);
              doc.text(
                registr.almacen ? registr.almacen.sucursal.nombre : "",
                60,
                y + 3,
                { width: 200 }
              );
              doc.text(
                registr.almacen ? registr.almacen.nombre : "",
                120,
                y + 3,
                { width: 70 }
              );
              doc.text(
                registr.proveedor ? registr.proveedor.razon_social : "",
                190,
                y + 3,
                { width: 130 }
              );
              doc.text(registr.numero_correlativo, 305, y + 3, {
                width: 50,
                align: "center",
              });
              doc.text(registr.numero_iso_orden_compra, 335, y + 3, {
                width: 75,
                align: "center",
              });
              doc.text(
                registr.compra
                  ? registr.compra.factura
                    ? registr.compra.factura
                    : ""
                  : "",
                390,
                y + 3,
                { width: 55, align: "center" }
              );
              doc.text(
                registr.fecha
                  ? $scope.fechaATexto(new Date(registr.fecha))
                  : "",
                450,
                y + 3,
                { width: 50 }
              );
              doc.text(
                registr.total
                  ? number_format_negativo_to_positvo(registr.total, 2)
                  : "",
                500,
                y + 3,
                { width: 55 }
              );
              doc.text(
                registr.estado ? registr.estado.nombre : "",
                549,
                y + 3,
                { width: 50 }
              );
              total_bs = total_bs + registr.total;
              y += 15;
              items += 1;
              if (items == itemsPorPagina && j != listaPedidos.length - 1) {
                doc.rect(40, y, 542, 0).stroke();
                doc.addPage({ margin: 0, bufferPages: true });
                y = 40;
                doc.font("Helvetica-Bold", 10);
                doc.text("PROGRAMACIÓN ORDEN DE PAGO", 40, y, {
                  width: 542,
                  align: "center",
                });
                doc.font("Helvetica", 9);
                // y += 10;
                // const inf_Depart = $scope.usuario.empresa.departamento.nombre;
                // doc.text(inf_Depart + ' - ' + $scope.aFechaLarga(pagosProg.CompProgramacPagos.fecha), 40, y, { width: 542, align: 'center' });
                // y += 10;
                // doc.text('N° ' + pagosProg.CompProgramacPagos.correlativo, 40, y, { width: 542, align: 'center' });
                y += 25;
                doc.font("Helvetica-Bold", 8);
                doc.text("N°", 40, y);
                doc.text("SUCURSAL", 60, y);
                doc.text("ALMACEN", 120, y, { width: 45 });
                doc.text("PROVEEDOR", 180, y, { width: 105 });
                doc.text("DOC", 305, y, { width: 50, align: "center" });
                doc.text("DOC/ISO", 335, y, { width: 75, align: "center" });
                doc.text("FACTURA", 390, y, { width: 55, align: "center" });
                doc.text("FECHA", 450, y, { width: 50 });
                doc.text("TOTAL", 500, y, { width: 55 });
                doc.text("ESTADO", 549, y, { width: 50 });
                y += 10;
                doc.rect(40, y - 3, 542, 0).stroke();
                items = 0;
                paginas += 1;
                doc.font("Helvetica", 7);
                doc.text("Pagina: " + paginas + " de " + totalPaginas, 0, 740, {
                  align: "center",
                });
              }
              if (items == itemsPorPagina && j != listaPedidos.length) {
                doc.addPage({ margin: 0, bufferPages: true });
                y = 40;
                doc.font("Helvetica", 7);
                doc.text(
                  "Pagina: " + (paginas + 1) + " de " + (totalPaginas + 1),
                  0,
                  740,
                  { align: "center" }
                );
              }
            }

            y += 15;
            doc.rect(40, y - 5, 540, 0).stroke();
            doc.text("TOTAL", 40, y);

            doc.text(number_format_negativo_to_positvo(total_bs, 2), 470, y, {
              width: 55,
              align: "right",
            });
            y += 20;
            doc.font("Helvetica-Bold", 6);
            doc.text("Usuario:", 40, y);

            doc.text("Fecha impresión:", 225, y);
            doc.font("Helvetica", 6);
            doc.text($scope.usuario.nombre_usuario, 66, y); //cambiar al ususario de la BASE DE DATOS
            doc.text(
              $scope.formatoFechaPDF(new Date()) +
                " " +
                $scope.formatoTiempoPDF(new Date()),
              276,
              y
            );
            doc.end();
            stream.on("finish", () => {
              const fileURL = stream.toBlobURL("application/pdf");
              window.open(fileURL, "_blank", "location=no");
            });
          } else {
            SweetAlert.swal("", "No existen ordenes de compras!", "warning");
          }
        })
        .catch((err) => {
          alert(err.stack);
        });
    };

    $scope.inicio();
  },
]);
