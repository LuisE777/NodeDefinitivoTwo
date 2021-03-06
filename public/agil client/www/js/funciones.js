function ejecutarScriptDespacho(
  idModalAsignacionFactura,
  idModalVentaKardexFactura,
  idModalAsignacionFacturaKardex,
  idModalDetalleKardex,
  IdModalVerificarCuenta,
  IdModalCobros,
  IdModalHistorialCobros,
  idModalConceptoEdicion,
  idModalAsignacionDespacho
) {
  crearPopup(idModalVentaKardexFactura, "80%", "auto");
  crearPopup(idModalAsignacionFactura, "auto", "auto");
  crearPopup(idModalDetalleKardex, "auto", "auto");
  crearPopup(idModalAsignacionFacturaKardex, "auto", "auto");
  crearPopup(IdModalCobros, "50%", "auto");
  crearPopup(IdModalHistorialCobros, "50%", "auto");
  crearPopup(idModalAsignacionDespacho, "auto", "auto");
  crearPopup(IdModalVerificarCuenta, "auto", "auto");
  setTimeout(function () {
    crearPopup(idModalConceptoEdicion, "auto", "auto");
  }, 5000);
}

function ejecutarScriptEstibaje(
  idModalWizardEstibajeEdicion,
  idContenedorEdicionEstibaje
) {
  crearPopup(idModalWizardEstibajeEdicion, "60%", 550);
  aplicarWizardFormulario(
    idModalWizardEstibajeEdicion,
    idContenedorEdicionEstibaje
  );
}

function ejecutarScriptsPedidos(
  idDialogListadoPedido,
  idDialogProductosProveedor,
  idDialogBusquedaProveedor,
  idDialogProductosAsigandosProveedor,
  idModalInventarioPedidos,
  modalEdicionOrdenCompra
) {
  crearPopup(modalEdicionOrdenCompra, screen.width, "auto");
  crearPopup(idDialogListadoPedido, "auto", "auto");
  crearPopup(idDialogProductosProveedor, screen.width, screen.height);
  crearPopup(idDialogProductosAsigandosProveedor, screen.width, screen.height);
  crearPopup(idModalInventarioPedidos, screen.width, screen.height);
  crearPopup(idDialogBusquedaProveedor, "auto", "auto");
  // aplicarWizardFormulario(idModalWizardEstibajeEdicion, idContenedorEdicionEstibaje);
}

function ejecutarScriptDestino(
  idModalWizardDestinoEdicion,
  idContenedorEdicionDestino,
  idModalConceptoEdicionCorrelativos,
  IdModalVerificarCuenta
) {
  crearPopup(idModalWizardDestinoEdicion, "60%", 550);
  aplicarWizardFormulario(
    idModalWizardDestinoEdicion,
    idContenedorEdicionDestino
  );

  setTimeout(function () {
    crearPopup(idModalConceptoEdicionCorrelativos, "auto", "auto");
    crearPopup(IdModalVerificarCuenta, "auto", "auto");
  }, 3000);
}
function ejecutarScriptsConfiguracionEstadosFinacioneros(
  idModalConfiguracionGestion,
  idModalDetalleImpresion
) {
  crearPopup(idModalConfiguracionGestion, "45%", "auto");
  crearPopup(idModalDetalleImpresion, "auto", "auto");
  setTimeout(function () {
    aplicarDatePickers();
  }, 200);
}
function ejecutarScriptsSolicitudCajaChicas(
  idModalSolicitudCajaChica,
  idModalConceptosMovimiento,
  idModalEliminarSolicitud,
  idModalVerificarAutorizacion,
  idModalNivelFondoRendir,
  idModalGastoFondoRendir,
  idModalPanelGastoFondo,
  idModalVehiculosViaje,
  idModalConductoresViaje,
  idModalConceptoEdicion,
  idModalFondoRendirEdicionSolicitud
) {
  crearPopup(idModalSolicitudCajaChica, "auto", "auto");
  crearPopup(idModalConceptosMovimiento, "auto", "auto");
  crearPopup(idModalEliminarSolicitud, "auto", "auto");
  crearPopup(idModalVerificarAutorizacion, "auto", "auto");
  crearPopup(idModalNivelFondoRendir, "auto", "auto");
  crearPopup(idModalGastoFondoRendir, "auto", "auto");
  crearPopup(idModalPanelGastoFondo, "100%", "auto");
  crearPopup(idModalFondoRendirEdicionSolicitud, "30%", "auto");
  setTimeout(function () {
    crearPopup(idModalVehiculosViaje, "auto", "auto");
    crearPopup(idModalConductoresViaje, "auto", "auto");
    crearPopup(idModalConceptoEdicion, "auto", "auto");
    aplicarDatePickers();
  }, 200);
}
function ejecutarScriptsCajaChicas(
  idModalSolicitudCajaChica,
  idModalConceptosMovimiento,
  idModalEliminarSolicitud,
  idModalVerificarAutorizacion,
  idModalRegistroCajaChica,
  idModalKardexCajaChica,
  idModalIngresosCajaChica,
  idModalRegistroIngresoCajaChica,
  idModalHistorialCierreCajaChica,
  idModalRegistroDesembolsoCajaChica,
  idModalServicios,
  idModalRegistroAnticipoCajaChica,
  idModalIncrementoSolicitud,
  idModalKardexGastoCajaChica,
  idModalVerificarCierreCajaChica,
  idModalValeCajaChica,
  idModalDetalleGastosFondo,
  idModalRegistroProveedorCajaChica,
  idModalDevolucionFondoRendir,
  idModallistaVales
) {
  crearPopup(idModalSolicitudCajaChica, "auto", "auto");
  crearPopup(idModalConceptosMovimiento, "auto", "auto");
  crearPopup(idModalEliminarSolicitud, "auto", "auto");
  crearPopup(idModalVerificarAutorizacion, "auto", "auto");
  crearPopup(idModalIngresosCajaChica, "auto", "auto");
  crearPopup(idModalKardexCajaChica, "auto", "auto");
  crearPopup(idModalRegistroCajaChica, "auto", "auto", 20, 50);
  crearPopup(idModalRegistroIngresoCajaChica, "auto", "auto");
  crearPopup(idModalHistorialCierreCajaChica, "auto", "auto");
  crearPopup(idModalRegistroDesembolsoCajaChica, "auto", "auto");
  crearPopup(idModalRegistroAnticipoCajaChica, "auto", "auto");
  crearPopup(idModalRegistroProveedorCajaChica, "auto", "auto");
  crearPopup(idModalServicios, "auto", "auto");
  crearPopup(idModalIncrementoSolicitud, "auto", "auto");
  crearPopup(idModalKardexGastoCajaChica, "auto", "auto");
  crearPopup(idModalVerificarCierreCajaChica, "auto", "auto");
  crearPopup(idModalValeCajaChica, "auto", "auto");
  crearPopup(idModalDetalleGastosFondo, "auto", "auto");
  crearPopup(idModalDevolucionFondoRendir, "auto", "auto");
  crearPopup(idModallistaVales, "auto", "auto");
  setTimeout(function () {
    aplicarDatePickers();
    AplicarImputCodigoControl("codigo-control-caja");
  }, 200);
}

function ejecutarScriptsOrdenServicio(
  idDialogNuevoPedido,
  idDialogProductosProveedor,
  idDialogBusquedaProveedor,
  idDialogProductosAsigandosProveedor,
  idModalInventarioPedidos,
  modalEdicionOrdenCompra
) {
  crearPopup(modalEdicionOrdenCompra, screen.width, "auto");
  crearPopup(idDialogNuevoPedido, "auto", "auto");
  crearPopup(idDialogProductosProveedor, screen.width, screen.height);
  crearPopup(idDialogProductosAsigandosProveedor, screen.width, screen.height);
  crearPopup(idModalInventarioPedidos, screen.width, screen.height);
  crearPopup(idDialogBusquedaProveedor, "auto", "auto");
  setTimeout(function () {
    aplicarDatePickerPedido();
  }, 200);
}

function ejecutarScriptsPolifuncionalidad(
  modalNuevaEvaluacion,
  modalNuevaEvaluacionWizard,
  modalBusquedaPersonal,
  modalParametrosPolifuncionalidad,
  modalParametrosPolifuncionalidadWizard,
  idModalReportes,
  reporteGraficoPolifuncional,
  modalBusquedaCentroCosto
) {
  crearPopup(modalNuevaEvaluacion, "auto", "auto");
  crearPopup(modalParametrosPolifuncionalidad, "auto", "auto");
  crearPopup(idModalReportes, "auto", "auto");
  crearPopup(modalBusquedaPersonal, "auto", "auto");
  crearPopup(modalBusquedaCentroCosto, "auto", "auto");
  crearPopup(reporteGraficoPolifuncional, "85%", 800);
  aplicarWizardFormulario(modalNuevaEvaluacion, modalNuevaEvaluacionWizard);
  aplicarWizardFormulario(
    modalParametrosPolifuncionalidad,
    modalParametrosPolifuncionalidadWizard
  );
}

function ejecutarScriptsTransacciones(
  modalNuevoIngreso,
  modalSeguimiento,
  modalRevision,
  modalVencimientoCreditos,
  modalVerIngreso,
  modalVerEgreso,
  idModalConceptoEdicion,
  modalEditarTransaccion,
  idModalWizardComprobanteTransaccionPago,
  idModalNuevoAdjuntarPDF
) {
  crearPopup(modalEditarTransaccion, "90%", "auto");
  crearPopup(modalNuevoIngreso, "90%", "auto");
  crearPopup(modalSeguimiento, "auto", "auto");
  crearPopup(modalRevision, "auto", "auto");
  crearPopup(modalVencimientoCreditos, "auto", "auto");
  crearPopup(modalVerIngreso, "auto", "auto");
  crearPopup(modalVerEgreso, "auto", "auto");
  crearPopup(idModalConceptoEdicion, "auto", "auto");
  crearPopup(idModalWizardComprobanteTransaccionPago, "90%", "auto");
  crearPopup(idModalNuevoAdjuntarPDF, "30%", "auto");
  setTimeout(function () {
    aplicarDatePickerPedido();
  }, 200);
}

function ejecutarScriptsMailer(modalBlanco) {
  crearPopup(modalBlanco, screen.availWidth, screen.availHeight);
}

function ejecutarScriptsComensales(
  modalEdicionAlias,
  modalEdicionGerencias,
  modalEdicionComensales,
  modalEdicionComidas,
  modalEdicionPrecios,
  dialogClienteEmpresa,
  busquedaComensalesEmpresa,
  dialogAlertasMarcaciones,
  dialogHistorialDocumentos,
  modalEdicionHistorial,
  dialogClienteEmpresaHuella
) {
  crearPopup(modalEdicionAlias, "auto", "auto");
  crearPopup(modalEdicionGerencias, "auto", "auto");
  crearPopup(modalEdicionComensales, "auto", "auto");
  crearPopup(modalEdicionComidas, "auto", "auto");
  crearPopup(modalEdicionPrecios, "auto", "auto");
  crearPopup(dialogAlertasMarcaciones, "auto", "auto");
  crearPopup(dialogHistorialDocumentos, "auto", "auto");
  crearPopup(modalEdicionHistorial, "auto", "auto");
  crearPopup(dialogClienteEmpresa, "auto", "auto");
  crearPopup(busquedaComensalesEmpresa, "auto", "auto");
  crearPopup(dialogClienteEmpresaHuella, "auto", "auto");
  // aplicarWizardFormulario(idModalWizardDestinoEdicion, idContenedorEdicionDestino);
}

function ejecutarScriptsProformas(
  modalConfiguracionActividadesServicios,
  wizardConfiguracionActividadesServicios,
  dialogProformaEdicion,
  dialogClientesProforma,
  modalConfiguracionActividades,
  wizardConfiguracionActividades,
  dialogmodalFechas,
  dialogBusquedaServicio,
  dialogDosificacionesDisponibles,
  confirmarDosificacion,
  asignacionCentroCostoCliente,
  dialogClienteEmpresa,
  dialogVerFacturacion,
  dialogImportacion,
  dialogReporteEmpresa,
  dialogGraficaEmpresa,
  dialogReporteCentroCostos,
  dialogGraficaIndividualEmpresa,
  dialogGraficaComparativa,
  dialog_reporte_facturas_proformas,
  IdModalAsignarCuentaProforma,
  IdModalGenerarComprobante,
  IdModalVerificarCuenta
) {
  crearPopup(dialog_reporte_facturas_proformas, "100%", "auto");
  crearPopup(modalConfiguracionActividadesServicios, "auto", "auto");
  crearPopup(modalConfiguracionActividades, "auto", "auto");
  crearPopup(dialogProformaEdicion, "auto", "auto");
  crearPopup(dialogClientesProforma, "auto", "auto");
  crearPopup(dialogmodalFechas, "auto", "auto");
  crearPopup(dialogBusquedaServicio, "auto", "auto");
  crearPopup(dialogDosificacionesDisponibles, "auto", "auto");
  crearPopup(confirmarDosificacion, "auto", "auto");
  crearPopup(asignacionCentroCostoCliente, "auto", "auto");
  crearPopup(dialogClienteEmpresa, "auto", "auto");
  crearPopup(dialogVerFacturacion, "auto", "auto");
  crearPopup(dialogImportacion, "auto", "auto");
  crearPopup(dialogReporteEmpresa, "60%", "auto");
  crearPopup(dialogGraficaEmpresa, "840px", "auto");
  crearPopup(dialogReporteCentroCostos, "60%", "auto");
  crearPopup(dialogGraficaIndividualEmpresa, "840px", "auto");
  crearPopup(dialogGraficaComparativa, "840px", "auto");
  crearPopup(IdModalAsignarCuentaProforma, "auto", "auto");
  crearPopup(IdModalGenerarComprobante, "auto", "auto");
  crearPopup(IdModalVerificarCuenta, "20%", "auto");
  aplicarWizardFormulario(wizardConfiguracionActividadesServicios);
  aplicarWizardFormulario(wizardConfiguracionActividades);
  setTimeout(function () {
    aplicarTiempoInicio();
  }, 200);
}
function ejecutarScriptTransportista(
  idModalWizardTransportistajeEdicion,
  idContenedorEdicionTransportista
) {
  crearPopup(idModalWizardTransportistajeEdicion, "60%", 550);
  aplicarWizardFormulario(
    idModalWizardTransportistajeEdicion,
    idContenedorEdicionTransportista
  );
}

function ejecutarScriptGrupoEstibaje(
  idModalWizardGrupoEstibajeEdicion,
  idContenedorEdicionGrupoEstibaje
) {
  crearPopup(idModalWizardGrupoEstibajeEdicion, "60%", 550);
  aplicarWizardFormulario(
    idModalWizardGrupoEstibajeEdicion,
    idContenedorEdicionGrupoEstibaje
  );
}

function ejecutarScriptsMesas(
  idPopupPanel,
  idPopupEdicionSala,
  idContenedorEdicionSala,
  idPopupEdicionMesa,
  idContenedorEdicionMesa,
  idPopupGarzonEdicion,
  idContenedorEdicionGarzon,
  idPopupFacturacion,
  idContenedorFacturacion,
  idPopupReserva,
  idContenedorReserva,
  idPopupCambioMesa,
  idContenedorCambioMesa,
  idPopupUnionMesas,
  idContenedorUnionMesas,
  idPopupAsignacionMesas,
  idContenedorAsignacionMesas
) {
  crearPopup(idPopupPanel, "100%", screen.height);
  crearPopup(idPopupEdicionSala, "60%", 550);
  aplicarWizardFormulario(idPopupEdicionSala, idContenedorEdicionSala);
  crearPopup(idPopupEdicionMesa, "60%", 550);
  aplicarWizardFormulario(idPopupEdicionMesa, idContenedorEdicionMesa);
  crearPopup(idPopupGarzonEdicion, "60%", 550);
  aplicarWizardFormulario(idPopupGarzonEdicion, idContenedorEdicionGarzon);
  crearPopup(idPopupFacturacion, "60%", 550);
  aplicarWizardFormulario(idPopupFacturacion, idContenedorFacturacion);
  crearPopup(idPopupReserva, "60%", 550);
  aplicarWizardFormulario(idPopupReserva, idContenedorReserva);
  crearPopup(idPopupCambioMesa, "60%", 550);
  aplicarWizardFormulario(idPopupCambioMesa, idContenedorCambioMesa);
  crearPopup(idPopupUnionMesas, "60%", 550);
  aplicarWizardFormulario(idPopupUnionMesas, idContenedorUnionMesas);
  crearPopup(idPopupAsignacionMesas, "60%", 550);
  aplicarWizardFormulario(idPopupAsignacionMesas, idContenedorAsignacionMesas);
  setTimeout(function () {
    aplicarTiempos();
  }, 200);
}

function ejecutarScriptsPantallaDespacho(idModalPantallaDespacho) {
  crearPopup(idModalPantallaDespacho, "100%", screen.height);
}

function ejecutarScriptsPantallaCliente(
  idModalPantallaCliente,
  idPopupPregunta,
  idModalImagenesPromociones
) {
  crearPopup(idModalPantallaCliente, "100%", screen.height);
  crearPopup(idPopupPregunta, "30%", 100);
  crearPopup(idModalImagenesPromociones, "70%", "auto");
}

function ejecutarScriptsInventario(
  idModalActualizacionInventario,
  idModalCreacionInventario,
  idModalIngresosPorInventario,
  idModalMovimientoConsolidados
) {
  crearPopup(idModalActualizacionInventario, "30%", 100);
  crearPopup(idModalCreacionInventario, "80%", 250);
  crearPopup(idModalIngresosPorInventario, "80%", 500);
  crearPopup(idModalMovimientoConsolidados, "auto", "auto");
  setTimeout(function () {
    aplicarDatePickers();
  }, 200);
}

function ejecutarScriptsOperaciones(
  idDialogDialogPanelOperaciones,
  idDialogEntregaViveres,
  idConfirmacionCierre,
  idDialogTotalIngredientes,
  idDialogoListadoPedido,
  idDialogoNuevoPedido,
  idDialogProductosProveedor,
  idDialogBusquedaProveedor,
  idDialogProductosAsigandosProveedor,
  idDialogDatos,
  idDialogOrdenReposicion,
  idDialogNuevaOrdenReposicion,
  idDialogEliminarOrdenReposicion,
  idDialogCerrarOrdenReposicion,
  idDialogSincronizacionDatos,
  idModalHSyncCampamento
) {
  crearPopup(idDialogDialogPanelOperaciones, "100%", $(window).height());
  crearPopup(idDialogEntregaViveres, "60%", "auto");
  crearPopup(idConfirmacionCierre, "40%", "auto");
  crearPopup(idDialogTotalIngredientes, "60%", "auto");
  crearPopup(idDialogoListadoPedido, "auto", "auto");
  crearPopup(idDialogoNuevoPedido, "auto", "auto");
  crearPopup(idDialogProductosProveedor, "auto", "auto");
  crearPopup(idDialogBusquedaProveedor, "auto", "auto");
  crearPopup(idDialogProductosAsigandosProveedor, "auto", "auto");
  crearPopup(idDialogDatos, "auto", "auto");
  crearPopup(idDialogOrdenReposicion, "auto", "auto");
  crearPopup(idDialogNuevaOrdenReposicion, "80%", "auto");
  crearPopup(idDialogEliminarOrdenReposicion, "auto", "auto");
  crearPopup(idDialogCerrarOrdenReposicion, "auto", "auto");
  crearPopup(idDialogSincronizacionDatos, "auto", "auto");
  crearPopup(idModalHSyncCampamento, "auto", "auto");
}
function ejecutarScriptsInicio(
  IdModalDialogPreRequisitos,
  idModalAlertPrerequisitos,
  idPopupTablaProductos,
  idPopupTablaCreditos,
  idPopupTablaDeudas,
  idPopupPago,
  idPopupActualizarCreditoCliente,
  idPopupActualizarCreditoDeuda,
  idPopupDeuda,
  idModalDescuento,
  idModalTablaVentasPendientes,
  idModalTablaComprasPendientes,
  idModalTablaBancosPendientes,
  idModalTablaOtrosPendientes,
  idModalInicioSesion,
  idModalWizardComprobanteEdicion,
  IdModalOpcionesQr,
  IdModalRegistrarComprobante,
  IdModalRevisarComprobante,
  IdModalLibroMayor,
  IdModalAsignarCuenta,
  idModalTablaDespachos,
  idModalTablaAsignacionDespacho,
  IdModalEliminarProductoVencido,
  dialogAlertasProformas,
  facturarProformas,
  mensajeConfirmacionComprobante,
  idModalNuevoPedido,
  idModalDatosProducto,
  idModalNuevoClientePedido,
  idModalNuevaRazonCliente,
  idModalNuevoDestino,
  idModalVerificacionCajaChica,
  ModalMensajePago,
  IdModalLibroCompraComprobante,
  IdModalVerificacionCompra,
  ModalTablaListaProgrPagos,
  idModalDialogPrerequisitoNuevo,
  idModalDialogPrerequisitosConfig,
  idModalHistorialPrerequisito,
  idModalEditarPrerequisito,
  idModalReprogramarPrerequisitos,
  idInputDocPrerequisito,
  idModalReportesPrerequisitosGeneral,
  idModalWizardProductoKardex,
  idModalAlertVacunas,
  idModalDiasActivacionPrerequisitos,
  idModalDiasActivacionVacunas,
  idModalDialogProyeccionVacunas,
  IdEntregaPrerequisito,

) {
  crearPopup(idModalAlertPrerequisitos, "70%", "auto");
  crearPopup(IdModalDialogPreRequisitos, "60%", "auto");
  crearPopup(idPopupTablaProductos, "70%", "auto");
  crearPopup(idModalWizardComprobanteEdicion, "100%", $(window).height());
  crearPopup(idPopupTablaCreditos, "auto", "auto");
  crearPopup(idPopupTablaDeudas, "80%", "auto");
  crearPopup(idPopupPago, "auto", "auto");
  crearPopup(idPopupActualizarCreditoCliente, "auto", "auto");
  crearPopup(idPopupActualizarCreditoDeuda, "auto", "auto");
  crearPopup(idPopupDeuda, "auto", "auto");
  crearPopup(idModalDescuento, "40%", 100);
  crearPopup(idModalTablaVentasPendientes, "60%", "auto");
  crearPopup(idModalTablaComprasPendientes, "70%", "auto");
  crearPopup(idModalTablaBancosPendientes, "60%", 550);
  crearPopup(idModalTablaOtrosPendientes, "60%", 550);
  crearPopup(dialogAlertasProformas, "100%", screen.height);
  crearPopup(idModalInicioSesion, "100%", screen.height);
  crearPopup(mensajeConfirmacionComprobante, "40%", "auto");
  crearPopup(facturarProformas, "80%", "auto");
  crearPopup(IdModalOpcionesQr, "30%", 250);
  crearPopup(IdModalRegistrarComprobante, "60%", 350);
  crearPopup(IdModalRevisarComprobante, "60%", "auto");
  crearPopup(IdModalLibroMayor, "90%", "auto");
  crearPopup(IdModalAsignarCuenta, "auto", "auto");
  crearPopup(idModalVerificacionCajaChica, "100%", screen.height);
  crearPopup(IdModalLibroCompraComprobante, "auto", "auto");
  crearPopup(ModalTablaListaProgrPagos, "80%", "auto");
  crearPopup(idModalWizardProductoKardex, "90%", "auto");
  crearPopup(idModalAlertVacunas, "70%", "auto");
  crearPopup(idModalDiasActivacionPrerequisitos, "35%", "auto");
  crearPopup(idModalDiasActivacionVacunas, "35%", "auto");
  crearPopup(idModalDialogProyeccionVacunas, "60%", "auto");
  
  setTimeout(function name(params) {
    crearPopup(idModalTablaDespachos, screen.width, screen.height);
    crearPopup(idModalTablaAsignacionDespacho, "auto", "auto");
    aplicarDatePickers();
    crearPopup(idModalNuevoPedido, screen.width, screen.height);
    aplicarDatePickerPedido();
    crearPopup(idModalDatosProducto, "36%", 370);
    crearPopup(idModalNuevoClientePedido, "36%", 330);
    crearPopup(idModalNuevaRazonCliente, "36%", 275);
    crearPopup(idModalNuevoDestino, "36%", 275);
    // Material Select Initialization
    AplicarImputCodigoControl("codigo-control-lc-comprobante");
    crearPopup(idModalReportesPrerequisitosGeneral, "50%", "auto");
  }, 2000);
  
  crearPopup(IdModalEliminarProductoVencido, "60%", 550);
  crearPopup(ModalMensajePago, "40%", 230);
  crearPopup(IdModalVerificacionCompra, "auto", "auto");
  crearPopup(idModalDialogPrerequisitoNuevo, "60%", "auto");
  crearPopup(idModalDialogPrerequisitosConfig, "55%", "auto");
  crearPopup(idModalHistorialPrerequisito, "50%", "auto");
  crearPopup(idModalEditarPrerequisito, "auto", "auto");
  crearPopup(idModalReprogramarPrerequisitos, "35%", "auto");
  AplicarImputFile(idInputDocPrerequisito);
  
  $("#" + idModalInicioSesion)
    .siblings(".ui-dialog-titlebar")
    .remove();
    aplicarDatePickers();
  quitarScrollInputNumber();
  $(document).on("click", "#field-viewer", function (e) {
    e.stopPropagation();
  });
  crearPopup(IdEntregaPrerequisito, "35%", "auto");
}

function aplicarDatePickerPedido() {
  $(".date-picker-pedido")
    .datetimepicker({
      locale: "es",
      format: "DD/MM/YYYY", //use this option to display seconds
      autoclose: true,
      pickTime: false,
    })
    .on("changeDate", function (e) {
      $(this).datetimepicker("hide");
    });
}

function quitarScrollInputNumber() {
  $(".input-fix-mousewheel1")
    .on("focus", function (e) {
      $(this).on("mousewheel.disableScroll", function (e) {
        e.preventDefault();
      });
    })
    .on("blur", function (e) {
      $(this).off("mousewheel.disableScroll");
    });
}
function ejecutarScriptsComprobante(
  IdModalVerificarCuenta,
  IdModalEliminarComprobante,
  IdModalCambioMoneda
) {
  /* crearPopup(idModalWizardComprobanteNuevo, "100%", 800); */
  crearPopup(IdModalVerificarCuenta, "20%", "auto");
  crearPopup(IdModalEliminarComprobante, "20%", "auto");
  crearPopup(IdModalCambioMoneda, "40%", "auto");
  /*crearPopup(IdModalRevisarComprobante, "80%", 500);
	crearPopup(IdModalLibroMayor, "80%", 500); */
}

function ejecutarScriptsCotizacion(
  idModalWizardCotizacionEdicion,
  idModalInventario,
  idModalDialogRechazo,
  idModalDialogFirmaUsuario,
  idImagenFirmaUsuario,
  idModalImpresionDetalleAlerta,
  idPopupPanel
) {
  crearPopup(idModalWizardCotizacionEdicion, "100%", 1800);
  crearPopup(idModalDialogRechazo, "40%", "auto");
  crearPopup(idModalDialogFirmaUsuario, "46%", "auto");

  aplicarVisorImagenArchivo(idImagenFirmaUsuario);
  crearPopup(idPopupPanel, "100%", screen.height, "center", "top");

  setTimeout(function () {
    aplicarDatePickers();
    crearPopup(idModalImpresionDetalleAlerta, "30%", 150);
  }, 2000);
}
function ejecutarScriptsPacientes(
  idModalDialogVacunasPacientes,
  idModalDialogConsulta,
  idModalwizardContainerConsulta,
  idModalDialogVacunasConfig,
  idModalDialogVacunaEdicion,
  idModalDialogFechaEntrega,
  IdModalDialogLaboratorio,
  IdModalDialogGraficoSV,
  idModalDialogHistorico,
  idModalFichaTecnica,
  idModalwizardContainerFichaTecnica,
  IdModalDialogLaboratorioExamen,
  IdModalDialogLaboratorioExamenes,
  IdModalDialogLaboratorioExamenesNuevoResultado,
  IdModalDialogLaboratorioExamenHistoricoPreview,
  IdModalDialogLaboratorioExamenHistoricoResultado,
  idModalDialogPacienteNuevo,
  idModalwizardContainerPaciente,
  idModalDialogHistorialVacuna,
  idModalDialogHistorialVacunaGeneral,
  idModalDialogDiagnosticos,
  idModalDialogDiagnosticoNuevo,
  idModalDialogExamenesDiagnostico,
  idModalDialogNuevoExamenDiagnostico,
  idModalDialogHistorialFicha,
  idModalDialogCredencial,
  idModalDialogPatologias,
  idModalDialogComentario,
  idModalReprogramarVacunas,
  idImagenUsuario,
  idModalHistorialConsulta,
  idModalWizardPacienteVista,
  idModalContenedorPacienteVista,
  idModalEliminarPaciente,
  IdModalDialogNuevoLaboratorio,
  IdModalDialogDiagnosticoExamenHistoricoResultado,
  idModalDialogVerResultadosHistorialLab,
  idModalDialogConfirmacionEntregaAdelantado,
  idModalConceptoEdicionRiesgos,
  idModalRolTurnos,
  idModalHistorialTurnos,
  idModalCerrarRolDeTurno,
  IdModalVerificarCuenta,
  idModalRolTurnosNoche,
  idModalReporteRolTurnos,
  idModalReporteTurnosDetallado,
  idModalReporteFichasMedicas,
  idModalDialogVacunas,
  idModalConfigProdVac,
  idModalReporteLaboratorios,
  idModalReporteConsultas,
  idModalReporteDiagnosticos
) {
  crearPopup(idModalDialogVacunasPacientes, "60%", "auto");
  crearPopup(idModalDialogVacunas, "60%", "auto");
  crearPopup(idModalDialogVacunasConfig, "60%", "auto");
  crearPopup(idModalDialogVacunaEdicion, "70%", "auto");
  crearPopup(idModalDialogHistorialVacuna, "60%", "auto");
  crearPopup(idModalDialogHistorialVacunaGeneral, "60%", "auto");

  crearPopup(idModalDialogFechaEntrega, "80%", 800);
  crearPopup(IdModalDialogGraficoSV, "100%", "auto");
  crearPopup(idModalDialogHistorico, "100%", 800);
  crearPopup(idModalFichaTecnica, "90%", "auto");
  crearPopup(IdModalDialogLaboratorio, "80%", "auto");
  crearPopup(IdModalDialogLaboratorioExamen, "35%", "auto");
  crearPopup(IdModalDialogLaboratorioExamenes, "50%", "auto");
  crearPopup(IdModalDialogLaboratorioExamenHistoricoPreview, "50%", "auto");
  crearPopup(IdModalDialogLaboratorioExamenesNuevoResultado, "35%", "auto");
  crearPopup(IdModalDialogLaboratorioExamenHistoricoResultado, "50%", 400);

  crearPopup(idModalDialogPacienteNuevo, "50%", "auto");
  crearPopup(idModalDialogDiagnosticos, "80%", "auto");
  crearPopup(idModalDialogDiagnosticoNuevo, "40%", "auto");
  crearPopup(idModalDialogExamenesDiagnostico, "50%", "auto");
  crearPopup(idModalDialogNuevoExamenDiagnostico, "40%", "auto");
  crearPopup(idModalDialogHistorialFicha, "70%", "auto");
  crearPopup(idModalDialogCredencial, "82%", "auto");
  crearPopup(idModalDialogPatologias, "70%", "auto");
  crearPopup(idModalDialogComentario, "40%", "auto");
  crearPopup(idModalReprogramarVacunas, "35%", "auto");
  crearPopup(idModalWizardPacienteVista, "50%", "auto");
  crearPopup(idModalEliminarPaciente, "35%", "auto");
  crearPopup(IdModalDialogNuevoLaboratorio, "35%", "auto");
  crearPopup(IdModalDialogDiagnosticoExamenHistoricoResultado, "35%", "auto");
  aplicarWizardFormulario(
    idModalWizardPacienteVista,
    idModalContenedorPacienteVista
  );
  aplicarWizardFormulario(
    idModalDialogPacienteNuevo,
    idModalwizardContainerPaciente
  );
  aplicarWizardFormulario(
    idModalDialogConsulta,
    idModalwizardContainerConsulta
  );
  aplicarWizardFormulario(
    idModalFichaTecnica,
    idModalwizardContainerFichaTecnica
  );
  crearPopup(idModalDialogVerResultadosHistorialLab, "55%", "auto");
  crearPopup(idModalDialogConfirmacionEntregaAdelantado, "35%", "auto");
  crearPopup(idModalRolTurnos, "auto", "auto");
  crearPopup(idModalHistorialTurnos, "auto", "auto");
  crearPopup(idModalCerrarRolDeTurno, "auto", "auto");
  crearPopup(IdModalVerificarCuenta, "auto", "auto");
  crearPopup(idModalRolTurnosNoche, "auto", "auto");
  crearPopup(idModalReporteRolTurnos, "auto", "auto");
  crearPopup(idModalReporteTurnosDetallado, screen.width, screen.height);
  crearPopup(idModalReporteFichasMedicas, "auto", "auto");
  crearPopup(idModalConfigProdVac, "60%", "auto");
  crearPopup(idModalReporteLaboratorios, "70%", "auto");
  crearPopup(idModalReporteConsultas, "70%", "auto");
  crearPopup(idModalReporteDiagnosticos, "70%", "auto");

  // aplicarDatePickers();
  // aplicarVisorImagenArchivo(idImagenUsuario);
  setTimeout(function name(params) {
    aplicarDatePickers();
    // aplicarHoras();
    aplicarTiempos();
    aplicarVisorImagenArchivo(idImagenUsuario);
    crearPopup(idModalConceptoEdicionRiesgos, "62%", "auto");
    crearPopup(idModalDialogConsulta, "75%", "auto");
    crearPopup(idModalHistorialConsulta, "35%", "auto");
  }, 2000);
}

function ejecutarScriptsMantenimientos(
  idModalInicioMantenimiento,
  idModalOTNuevo,
  idModalwizardContainerOTNuevo,
  idModalFacturaServicioExterno,
  idModaRepuestosOT,
  idModalLiquidacionMantenimiento,
  idModalwiZardcontainerliquidacionmantenimiento
) {
  crearPopup(idModalInicioMantenimiento, "48%", "auto");
  crearPopup(idModalOTNuevo, "90%", "auto");
  aplicarWizardFormulario(idModalOTNuevo, idModalwizardContainerOTNuevo);
  crearPopup(idModalFacturaServicioExterno, "50%", "auto");
  crearPopup(idModaRepuestosOT, "75%", "auto");
  crearPopup(idModalLiquidacionMantenimiento, "80%", "auto");
  aplicarWizardFormulario(
    idModalLiquidacionMantenimiento,
    idModalwiZardcontainerliquidacionmantenimiento
  );
  aplicarDatePickers();
  // aplicarHoras();
  aplicarTiempos();
}

function ejecutarScriptsRecursosHumanos(
  idModalPrerequisitosInactivos,
  idModalEmpleado,
  idModalwizardContainerEmpleado,
  idModalDepartamentoEstado,
  idModalProvincia,
  idModalLocalidad,
  idImput,
  idModalHojaVida,
  idModalwizardContainerHojaVida,
  idModalNuevoFamiliar,
  idModalHistorialContrato,
  idModalBeneficiosSociales,
  idModalDetalleVacaciones,
  idModalBitacoraFicha,
  idModalAnticipoExtraordinario,
  idModalNuevoAnticipoExtraordinario,
  idModalNuevoPrestamo,
  idModalAusenciasVacaciones,
  idTabAusenciasVacaciones,
  idModalTipoBaja,
  idModalFeriados,
  idModalHitorialVacaciones,
  idModalCompensacion,
  idModalHistorialAusencias,
  idModalHistorialAusenciaMedica,
  idModalTipoAusencia,
  idModalRolTurnos,
  idModalHistorialTurnos,
  idModalHorasExtras,
  idModalHistorialHorasExtras,
  idModalAnticipoRegular,
  idModalPrestamosPersonal,
  idModalAdvertencia,
  idModalPretamosNuevoTodos,
  idModalReporteHijos,
  idModalReporteVeneficios,
  idModalPagoPrestamo,
  idModalReporteVacaciones,
  idModalReporteBajasMedicas,
  idModalReporteRolTurnos,
  idModalReporteTurnosDetallado,
  idModalViajes,
  idModalVisita,
  idModalVehiculosViaje,
  idModalHistorialViajes,
  idModalReporteAusencias,
  idModalCertificado,
  idModalRhNuevo,
  idModalWizardRhNuevo,
  idImagenUsuario,
  idEliminarUsuarioRh,
  idModalWizardRhVista,
  idModalContenedorRhVista,
  idEliminarSeguroEmpleado,
  idEliminarFamiliarEmpleado,
  idModalHistorialPrerequisito,
  idModalHistorialPrerequisitoInactivos,
  idModalEditarPrerequisito,
  idModalDialogConfirmacionEntregaAdelantado,
  IdModalVerificarCuenta,
  idModalImpresionHojaVida,
  idModalNuevoAnticipoRegularTodos,
  idModalTr3BancoMsc,
  idModalTr3BancoUnion,
  idModalHistorialTr3,
  IdModalVerificarCuentaRrhh,
  idModalConfirmarDesabilitacion,
  idModalReingresoEmpleado,
  idModalHistorialBeneficios,
  idModalConfiguracionRopaDeTrabajo,
  idModalReporteRopaDeTrabajo,
  idmodalWizardContainerConfiguracionRopaTrabajo,
  idModalRopaTrabajo,
  idModalNuevaRopaTrabajo,
  idModalItemsNuevaRopaTrabajo,
  idModalEliminarRopaTrabajo,
  idModalConceptoEdicion,
  idModalVisitaSalida,
  idModalDesabilitarPasajero,
  idModalCerrarRolDeTurno,
  idModalConductoresViaje,
  idModalHistorialGestionesVacaciones,
  idModalTipoImportacionRol,
  idModalCargaHorario,
  idModalHistorialContratoHijos,
  idModalEliminarPrestamo,
  idModalHistorialHorasExtrasOrdinarias,
  idModalVistaVacaciones,
  idModalConfiguracionSubsidios,
  idmodalWizardContainerConfiguracionSubsidios,
  idModalNuevoSubsidio,
  idModalReporteAltasBajas,
  idModalRolTurnosNoche,
  idModalParmEmpleadoCampa,
  idTabSubsidios,
  idInputDocPrerequisito,
  idDialogEditarDocPreRequisito,
  idInputEdicionDocPrerequisito,
  idModalEliminarAusenciaMedica,
  idModalAsignarDocumentoPrerequisito,
  idModalMatrizAnticipo,
  idModalCopiaAnticipo,
  idModalNuevoEmpleadoAnticipo,
  idModalHistorialFichas,
  idModalCerrarHorasExtrasOrdinario,
  idModalOtrosBonos,
  idModalHistorialOtrosBonos,
  idModalLugarSeguroSaludEdicion,
  idmodalFechasAnticipoExcel,
  idModalLlamadaATencion,
  idModalHistorialLlamadaATencionEmpleado,
  idModalHistorialLlamadasDeATencion,
  idModalReporteGeneralOtrosBonos,
  idInputDocFormacion,
  idInputDocExperiencia,
  idInputDocCapacitacion,
  idInputDocLogro,
  idModalEdicionRopaTrabajo
) {
  // crearPopup(idModalCaracteristicaDiscapacidadEdicion, "auto", "auto");
  crearPopup(idmodalFechasAnticipoExcel, "auto", "auto");
  crearPopup(idModalHistorialFichas, "auto", "auto");
  crearPopup(idModalPrerequisitosInactivos, "auto", "auto");
  crearPopup(idModalEmpleado, "auto", "auto");
  aplicarWizardFormulario(idModalEmpleado, idModalwizardContainerEmpleado);
  crearPopup(idModalDepartamentoEstado, "auto", "auto");
  crearPopup(idModalProvincia, "auto", "auto");
  crearPopup(idModalLocalidad, "auto", "auto");
  crearPopup(idModalHojaVida, "80%", "auto");
  aplicarWizardFormulario(idModalHojaVida, idModalwizardContainerHojaVida);
  crearPopup(idModalHistorialContrato, "auto", "auto");
  crearPopup(idModalBeneficiosSociales, "auto", "auto");
  crearPopup(idModalBitacoraFicha, "70%", "auto");
  crearPopup(idModalAnticipoExtraordinario, "95%", "auto");
  crearPopup(idModalNuevoAnticipoExtraordinario, "auto", "auto");
  crearPopup(idModalNuevoPrestamo, "auto", "auto");
  crearPopup(idModalReporteRolTurnos, "auto", "auto");
  crearPopup(idModalReporteTurnosDetallado, "100%", screen.height);
  crearPopup(idModalRolTurnos, "40%", "auto");
  crearPopup(idModalHistorialTurnos, "auto", "auto");
  crearPopup(idModalHorasExtras, "auto", "auto");
  crearPopup(idModalHistorialHorasExtras, "auto", "auto");
  crearPopup(idModalAnticipoRegular, "auto", "auto");
  crearPopup(idModalPrestamosPersonal, "auto", "auto");
  crearPopup(idModalAdvertencia, "auto", "auto");
  crearPopup(idModalPretamosNuevoTodos, "auto", "auto");
  crearPopup(idModalReporteHijos, "auto", "auto");
  crearPopup(idModalReporteVeneficios, "auto", "auto");
  crearPopup(idModalPagoPrestamo, "auto", "auto");
  crearPopup(idModalReporteVacaciones, "80%", "auto");
  crearPopup(idModalReporteBajasMedicas, "auto", "auto");

  crearPopup(idModalViajes, "90%", "auto");
  crearPopup(idModalAusenciasVacaciones, "55%", "auto");
  aplicarTab(idTabAusenciasVacaciones);
  crearPopup(idModalTipoBaja, "auto", "auto");
  crearPopup(idModalFeriados, "auto", "auto");
  crearPopup(idModalHitorialVacaciones, "70%", "auto");
  crearPopup(idModalDetalleVacaciones, "auto", "auto");
  crearPopup(idModalCompensacion, "auto", "auto");
  crearPopup(idModalHistorialAusencias, "auto", "auto");
  crearPopup(idModalHistorialAusenciaMedica, "auto", "auto");
  crearPopup(idModalTipoAusencia, "auto", "auto");
  crearPopup(idModalVisita, "auto", "auto");
  crearPopup(idModalVehiculosViaje, "auto", "auto");
  crearPopup(idModalHistorialViajes, "auto", "auto");
  crearPopup(idModalReporteAusencias, "auto", "auto");
  crearPopup(idModalCertificado, "auto", "auto");
  crearPopup(idEliminarUsuarioRh, "auto", "auto");
  crearPopup(idModalWizardRhVista, "auto", "auto");
  crearPopup(idEliminarSeguroEmpleado, "auto", "auto");
  crearPopup(idEliminarFamiliarEmpleado, "auto", "auto");
  aplicarWizardFormulario(idModalWizardRhVista, idModalContenedorRhVista);
  crearPopup(idModalNuevoFamiliar, "auto", "auto");
  crearPopup(idModalHistorialPrerequisito, "auto", "auto");
  crearPopup(idModalHistorialPrerequisitoInactivos, "auto", "auto");
  crearPopup(idModalEditarPrerequisito, "auto", "auto");
  crearPopup(idModalDialogConfirmacionEntregaAdelantado, "auto", "auto");
  crearPopup(idModalImpresionHojaVida, "auto", "auto");
  crearPopup(idModalNuevoAnticipoRegularTodos, "auto", "auto");
  crearPopup(idModalTr3BancoMsc, "auto", "auto");
  crearPopup(idModalTr3BancoUnion, "auto", "auto");
  crearPopup(idModalHistorialTr3, "auto", "auto");
  crearPopup(IdModalVerificarCuentaRrhh, "auto", "auto");
  crearPopup(idModalConfirmarDesabilitacion, "auto", "auto");
  crearPopup(idModalReingresoEmpleado, "auto", "auto");
  crearPopup(idModalHistorialBeneficios, "auto", "auto");
  crearPopup(idModalConfiguracionRopaDeTrabajo, "auto", "auto");
  aplicarWizardFormulario(
    idModalConfiguracionRopaDeTrabajo,
    idmodalWizardContainerConfiguracionRopaTrabajo
  );
  crearPopup(idModalReporteRopaDeTrabajo, "auto", "auto");
  crearPopup(idModalRopaTrabajo, "auto", "auto");
  crearPopup(idModalNuevaRopaTrabajo, "70%", "auto");
  crearPopup(idModalItemsNuevaRopaTrabajo, "auto", "auto");
  crearPopup(IdModalVerificarCuenta, "auto", "auto");
  crearPopup(idModalEliminarRopaTrabajo, "auto", "auto");
  crearPopup(idModalVisitaSalida, "auto", "auto");
  crearPopup(idModalDesabilitarPasajero, "auto", "auto");
  crearPopup(idModalCerrarRolDeTurno, "auto", "auto");
  crearPopup(idModalConductoresViaje, "auto", "auto");
  crearPopup(idModalHistorialGestionesVacaciones, "auto", "auto");
  crearPopup(idModalTipoImportacionRol, "auto", "auto");
  crearPopup(idModalCargaHorario, "50%", "auto");
  crearPopup(idModalHistorialContratoHijos, "30%", "auto");
  crearPopup(idModalEliminarPrestamo, "30%", "auto");
  crearPopup(idModalHistorialHorasExtrasOrdinarias, "auto", "auto");
  crearPopup(idModalVistaVacaciones, "auto", "auto");
  crearPopup(idModalConfiguracionSubsidios, "auto", "auto");
  crearPopup(idModalReporteAltasBajas, "auto", "auto");
  crearPopup(idModalRolTurnosNoche, "auto", "auto");
  crearPopup(idModalParmEmpleadoCampa, "auto", "auto");
  aplicarTab(idTabSubsidios);
  aplicarWizardFormulario(
    idModalConfiguracionSubsidios,
    idmodalWizardContainerConfiguracionSubsidios
  );
  crearPopup(idModalNuevoSubsidio, "50%", "auto");
  crearPopup(idDialogEditarDocPreRequisito, "auto", "auto");
  crearPopup(idModalEliminarAusenciaMedica, "auto", "auto");
  crearPopup(idModalAsignarDocumentoPrerequisito, "auto", "auto");
  crearPopup(idModalMatrizAnticipo, "auto", "auto");
  crearPopup(idModalCopiaAnticipo, "auto", "auto");
  crearPopup(idModalNuevoEmpleadoAnticipo, "auto", "auto");
  crearPopup(idModalCerrarHorasExtrasOrdinario, "auto", "auto");
  crearPopup(idModalOtrosBonos, "30%", "auto");
  crearPopup(idModalLlamadaATencion, "55%", "auto");
  crearPopup(idModalHistorialLlamadaATencionEmpleado, "60%", "auto");
  crearPopup(idModalHistorialLlamadasDeATencion, "70%", "auto");
  crearPopup(idModalReporteGeneralOtrosBonos, "70%", "auto");
  crearPopup(idModalEdicionRopaTrabajo, "70%", "auto");


  setTimeout(function () {
    aplicarDatePickers();
    // aplicarHoras();
    aplicarTiempos();
    aplicarDatePickerPedido();
    AplicarImputFile(idImput);
    AplicarImputFile(idInputDocPrerequisito);
    AplicarImputFile(idInputEdicionDocPrerequisito);
    AplicarImputFile("id-docseguimiento");
    AplicarImputFile(idInputDocFormacion);
    AplicarImputFile(idInputDocExperiencia);
    AplicarImputFile(idInputDocCapacitacion);
    AplicarImputFile(idInputDocLogro);
  }, 5000);
  setTimeout(function () {
    crearPopup(idModalRhNuevo, "auto", "auto");
    aplicarWizardFormulario(idModalRhNuevo, idModalWizardRhNuevo);
    aplicarVisorImagenArchivo(idImagenUsuario);
    crearPopup(idModalConceptoEdicion, "auto", "auto");
    crearPopup(idModalHistorialOtrosBonos, "auto", "auto");
    crearPopup(idModalLugarSeguroSaludEdicion, "auto", "auto");
  }, 5000);
}

function ejecutarScriptsPlanillaSueldos(
  idModalNuevaPlanillaSueldos,
  idModalEditarPlanillaSueldo,
  idModalParametros,
  idModalContenedorParametros,
  idModalTR3,
  idModalHistorialTR3,
  idEliminarSueldoEmpleado,
  idModalVerPlanillaSueldo,
  idModalEditarSueldo,
  idModalImpresion,
  idModalParametroHoraExtraC,
  idTabImpresiones,
  idModalGenerarComprobante,
  idModalVerificarTr3
) {
  crearPopup(idModalNuevaPlanillaSueldos, "100%", 700);
  crearPopup(idModalParametros, "90%", "auto");
  aplicarWizardFormulario(idModalParametros, idModalContenedorParametros);
  crearPopup(idEliminarSueldoEmpleado, "30%", "auto");
  crearPopup(idModalVerPlanillaSueldo, "100%", 700);
  crearPopup(idModalImpresion, "75%", "auto");
  crearPopup(idModalTR3, "50%", "auto");
  crearPopup(idModalHistorialTR3, "70%", "auto");
  crearPopup(idModalGenerarComprobante, "100%", "auto");
  crearPopup(idModalVerificarTr3, "30%", "auto");
  aplicarTab(idTabImpresiones);
  setTimeout(function () {
    crearPopup(idModalEditarPlanillaSueldo, "50%", "auto");
    crearPopup(idModalEditarSueldo, "50%", "auto");
    crearPopup(idModalParametroHoraExtraC, "auto", "auto");
    aplicarMesAnio();
  }, 5000);
}

function ejecutarScriptsPlanillaCargasSociales(
  idModalNuevaPlanillaSueldos,
  idModalEditarPlanillaSueldo,
  idModalParametros,
  idEliminarSueldoEmpleado,
  idModalGenerarComprobante,
  idModalVerPlanillCargaSocial
) {
  crearPopup(idModalNuevaPlanillaSueldos, "100%", 700);
  crearPopup(idModalEditarPlanillaSueldo, "50%", "auto");
  crearPopup(idModalParametros, "90%", "auto");
  crearPopup(idEliminarSueldoEmpleado, "30%", "auto");
  crearPopup(idModalGenerarComprobante, "100%", "auto");
  crearPopup(idModalVerPlanillCargaSocial, "100%", 700);
}

function ejecutarScriptsIncrementoSalarial(idModalNuevoIncrementoSalarial) {
  crearPopup(idModalNuevoIncrementoSalarial, "100%", "auto");
}

function ejecutarScriptsPlanillaRCIVA(
  idModalNuevoPlanillaRCIVA,
  idModalFormulario110,
  idModalFormularioGeneral110,
  idModalArchivosTXT,
  idModalEditarPlanillaRCIVA,
  idModalSaldoArrastrado,
  idModalOtrosIngresos
) {
  crearPopup(idModalNuevoPlanillaRCIVA, "100%", 700);

  setTimeout(function () {
    crearPopup(idModalEditarPlanillaRCIVA, "100%", 700);
    crearPopup(idModalFormulario110, "40%", "auto");
    crearPopup(idModalFormularioGeneral110, "70%", "auto");
    crearPopup(idModalArchivosTXT, "60%", "auto");
    crearPopup(idModalSaldoArrastrado, "40%", "auto");
    crearPopup(idModalOtrosIngresos, "40%", "auto");
  }, 5000);
}
function ejecutarScriptsPlanillaRetroActivos(idModalNuevoPlanillaRetroactivo) {
  crearPopup(idModalNuevoPlanillaRetroactivo, "100%", "auto");
}
function ejecutarScriptsPlanillaSubsidios(
  idModalNuevaPlanillaSubsidios,
  idModalEditarPlanillaSueldo,
  idEliminarPlanillaSubsidio,
  idModalVerPlanillaSueldo,
  idModalEditarSueldo
) {
  crearPopup(idModalNuevaPlanillaSubsidios, "100%", 600);
  crearPopup(idEliminarPlanillaSubsidio, "30%", "auto");
  crearPopup(idModalVerPlanillaSueldo, "100%", 600);
  setTimeout(function () {
    crearPopup(idModalEditarPlanillaSueldo, "50%", "auto");
    crearPopup(idModalEditarSueldo, "50%", "auto");
  }, 5000);
}

function ejecutarScriptsFarmacia(
  idModalWizardFarmaciaEdicion,
  idModalInventario,
  idPopupVista,
  idPopupPago
) {
  crearPopup(idModalWizardFarmaciaEdicion, "100%", 600);
  crearPopup(idModalInventario, "85%", 550);
  crearPopup(idPopupVista, "100%", 600);
  crearPopup(idPopupPago, "30%", 200);
}

function aplicarTab(idTab) {
  $("#" + idTab).tabs({ orientation: "vertical" });
}

function ejecutarScriptsComprobantesContabilidad(
  idModalWizardComprobantesContabilidadNueva,
  idModalInventario,
  idModalWizardComprobantesContabilidadModificar
) {
  crearPopup(idModalWizardComprobantesContabilidadNueva, "100%", 600);
  crearPopup(idModalInventario, "100%", 600);
  crearPopup(idModalWizardComprobantesContabilidadModificar, "100%", 600);
  aplicarDatePickers();
}
function ejecutarScriptsEstadoCuentasClientes(
  idPopupTablaEstadoCuentasClientes,
  idModalPagoDeudaCliente,
  idModalTablaEstadoCuentaMantenimiento,
  idModalPagoCreditoMantenmimiento,
  idModalTablaEstadoCuentaProforma
) {
  crearPopup(idPopupTablaEstadoCuentasClientes, "auto", "auto");
  crearPopup(idModalPagoDeudaCliente, "auto", "auto");
  crearPopup(idModalTablaEstadoCuentaMantenimiento, "70%", 600);
  crearPopup(idModalPagoCreditoMantenmimiento, "auto", "auto");
  crearPopup(idModalTablaEstadoCuentaProforma, "80%", 700);
  // aplicarTab(idTabReporte);
  aplicarDatePickers();
}

function ejecutarScriptsContabilidadCuentas(
  idModalWizardCuentaEdicion,
  idModalWizardContainerCuentaEdicion,
  idModalWizardClasificacionCuentaNueva,
  idModalWizardContainerClasificacionNueva,
  idModalWizardClasificacionVer,
  idModalWizardCuentaVer,
  idModalWizardContainerCuentaVer,
  idModalEliminarCuenta,
  idModalPlantilla,
  idModalWizardTipoCuenta,
  idModalWizardClasificacionCuenta,
  idModalWizardConfiguracionCuenta,
  idModalConfiguracionContableComprobante
) {
  crearPopup(idModalEliminarCuenta, "20%", 250);
  crearPopup(idModalWizardCuentaVer, "55%", 500);
  crearPopup(idModalWizardCuentaEdicion, "60%", "auto");
  crearPopup(idModalWizardClasificacionCuentaNueva, "auto", "auto");
  crearPopup(idModalWizardClasificacionVer, "auto", "auto");
  crearPopup(idModalPlantilla, "auto", "auto");
  crearPopup(idModalWizardTipoCuenta, "auto", "auto");
  crearPopup(idModalWizardClasificacionCuenta, "auto", "auto");
  aplicarWizardFormulario(
    idModalWizardCuentaVer,
    idModalWizardContainerCuentaVer
  );
  aplicarWizardFormulario(
    idModalWizardCuentaEdicion,
    idModalWizardContainerCuentaEdicion
  );
  crearPopup(idModalWizardConfiguracionCuenta, "auto", "auto");
  crearPopup(idModalConfiguracionContableComprobante, "auto", "auto");
  aplicarDatePickers();
}

function ejecutarScriptsRuta(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista
) {
  crearPopup(idPopupEdicion, "60%", 550);
  crearPopup(idPopupVista, "60%", 550);
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarDatePickers();
  crearPopup(idPopupEliminacion, "30%", 170);
}

function ejecutarScriptsEstadoResultadosNoContable(idPopupGastos) {
  crearPopup(idPopupGastos, "30%", 100);
  aplicarDatePickers();
}

function ejecutarScriptsConfiguracionFactura(
  idPopupEdicion,
  idContenedorEdicion,
  idPopupEdicionGeneral,
  idContenedorEdicionGeneral
) {
  crearPopup(idPopupEdicion, "60%", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  crearPopup(idPopupEdicionGeneral, "60%", "auto");
  aplicarWizardFormulario(idPopupEdicionGeneral, idContenedorEdicionGeneral);
}

function ejecutarScriptsConfiguracionApp(
  idPopupEdicion,
  idContenedorEdicion,
  idPopupEdicionGeneral,
  idContenedorEdicionGeneral
) {
  crearPopup(idPopupEdicion, "60%", 550);
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  crearPopup(idPopupEdicionGeneral, "60%", 550);
  aplicarWizardFormulario(idPopupEdicionGeneral, idContenedorEdicionGeneral);
}

function ejecutarScriptsSeguimiento(
  idPopupSeguimiento,
  idPopupFiltro,
  idPopupFiltroGraficos,
  idPopupComisiones
) {
  aplicarDatePickers();
  crearPopup(idPopupSeguimiento, "60%", 550);
  crearPopup(idPopupFiltro, "80%", 200);
  crearPopup(idPopupFiltroGraficos, "80%", 650);
  crearPopup(idPopupComisiones, "80%", 650);
}

function ejecutarScriptsVentasMensuales() {
  aplicarDatePickers();
}

function ejecutarScriptsVenta(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista,
  idInput,
  url,
  idPopupPago,
  idPopupCierre,
  idPopupPanel,
  idModalPanelVentasExpress,
  idPopupEliminacion,
  idModalInventario,
  idModalPanelCobro,
  idModalVendedor,
  idModalImpresionVencimiento,
  IdModalVerificarCuenta,
  modalReportesProductos,
  modalServicioVenta,
  modelGraficaProductos,
  modalReportesEmpresas,
  modelGraficaEmpresas,
  modelImportacionVentaServicio,
  idModalCotizaciones,
  idModalDetalleCotizaciones,
  idModalDetalleCotizacionEditar,
  ModalMensajePago,
  ModalDestinatarioEmail,
  idModalMeserosVenta,
  idModalNuevoMesero,
  idModalCerrarMesa,
  ModalRepostePorUnidad,
  ModalRepostePorMesero,
  ModalRepostePorMesa,
  modalPdfView,
  modalEntregaDetalleVentaCliente,
  modalReportesClientesPuntaje,
  modelGraficaClientesPuntajes,
  modalCambiosProductoBaseVenta,
  modalMesasVentaExpress,
  idModalVentaDevolucion,
  idModalItemDevolucion,
  idModalItemReposicion,
  idModalItemCambio,
  idModalItemEfectivo,
  idModalProductoReposicion,
  idModalReposicionAlmacen,
  idModalDetalleReposicionPedidos,
  idModalHTraspasoCampamento
) {
  crearPopup(idPopupEdicion, "100%", screen.height);
  crearPopup(idPopupVista, "100%", 600);
  crearPopup(idPopupPago, "30%", 200);
  crearPopup(idPopupCierre, "30%", 200);
  crearPopup(idPopupEliminacion, "30%", 170);
  crearPopup(idPopupPanel, "100%", screen.height, "center", "top");
  crearPopup(idModalPanelVentasExpress, "100%", screen.height, "center", "top");
  crearPopup(idModalPanelCobro, "40%", 500);
  crearPopup(idPopupEliminacion, "30%", 350);
  crearPopup(idModalImpresionVencimiento, "30%", 150);
  crearPopup(idModalVendedor, "50%", 250);
  crearPopup(IdModalVerificarCuenta, "auto", "auto");
  crearPopup(modalReportesProductos, "60%", "auto");
  crearPopup(modelGraficaProductos, "50%", 500);
  crearPopup(modalServicioVenta, "auto", "auto");
  crearPopup(modalReportesEmpresas, "50%", "auto");
  crearPopup(modelGraficaEmpresas, "50%", "auto");
  crearPopup(modelImportacionVentaServicio, "30%", "auto");
  crearPopup(idModalCotizaciones, "85%", 550);
  crearPopup(idModalDetalleCotizaciones, "79%", 480);
  crearPopup(idModalDetalleCotizacionEditar, "30%", 270);
  crearPopup(ModalMensajePago, "40%", 230);
  crearPopup(ModalDestinatarioEmail, "auto", "auto");
  crearPopup(idModalMeserosVenta, "auto", "auto");
  crearPopup(idModalNuevoMesero, "auto", "auto");
  crearPopup(idModalCerrarMesa, "auto", 650);
  crearPopup(ModalRepostePorUnidad, "auto", "auto");
  crearPopup(ModalRepostePorMesero, "auto", "auto");
  crearPopup(ModalRepostePorMesa, "auto", "auto");
  crearPopup(modalPdfView, "auto", "auto");
  crearPopup(modalEntregaDetalleVentaCliente, "auto", "auto");
  crearPopup(modalReportesClientesPuntaje, "50%", "auto");
  crearPopup(modalCambiosProductoBaseVenta, "auto", "auto", "center", "top");
  crearPopup(idModalReposicionAlmacen, "auto", "auto");
  crearPopup(modalMesasVentaExpress, "auto", "auto", "center", "top");
  crearPopup(idModalVentaDevolucion, "100%", screen.height, "center", "top");
  crearPopup(idModalDetalleReposicionPedidos, "auto", "auto");
  crearPopup(idModalHTraspasoCampamento, "auto", "auto");
  setTimeout(function () {
    aplicarDatePickers();
    // aplicarTiempos();
    aplicarTiempoInicio();
    aplicarTiempoFin();
    $("#venta-proforma").draggable();
    crearPopup(modelGraficaClientesPuntajes, "50%", "auto");
    crearPopup(idModalItemDevolucion, "30%", "auto");
    crearPopup(idModalItemReposicion, "30%", "auto");
    crearPopup(idModalItemCambio, "35%", "auto");
    crearPopup(idModalItemEfectivo, "35%", "auto");
    crearPopup(idModalInventario, "85%", 565);
    crearPopup(idModalProductoReposicion, "85%", 565);
  }, 2000);
  clockUpdate();
  setInterval(clockUpdate, 1000);
  $(document).on("click", "#campos-detalle-venta", function (e) {
    e.stopPropagation();
  });
}

function ejecutarScriptsCompra(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista,
  idInput,
  url,
  idPopupPago,
  idModalServicios,
  idModalPedidos,
  idModalDetallePedidos,
  idModalEliminarPedido,
  idModalEliminarProductoPedido,
  ModalMensajePago,
  VentanaProductos,
  idModalConceptoEdicion,
  idModalDetalleEvaluacionProveedores,
  idModalGraficoEvaluacionProveedores,
  idModalConfigEvaluacionProveedores,
 /*  idModalWizardCompraB */
) {
  crearPopup(idPopupEdicion, "100%", screen.height);
  crearPopup(idPopupVista, "100%", 600);
  crearPopup(idPopupPago, "30%", 200);
  crearPopup(idModalServicios, "auto", "auto");
  crearPopup(idModalPedidos, "auto", "auto");
  crearPopup(idModalDetallePedidos, "100%", 600);
  crearPopup(idModalEliminarPedido, "30%", 200);
  crearPopup(idModalEliminarProductoPedido, "30%", 200);
  crearPopup(ModalMensajePago, "40%", 230);
  crearPopup(VentanaProductos, "20%", "auto");
  crearPopup(idModalDetalleEvaluacionProveedores, "auto", "auto");
  crearPopup(idModalGraficoEvaluacionProveedores, screen.width, "auto");
  crearPopup(idModalConfigEvaluacionProveedores, "auto", "auto");
 /*  crearPopup(idModalWizardCompraB,"100%", screen.height, "center", "top"); */

  setTimeout(function () {
    aplicarDatePickers();
    AplicarImputCodigoControl("codigo-control-compra");
    crearPopup(idModalConceptoEdicion, "auto", "auto");
  }, 200);
  setTimeout(function () {
    crearPopup(idModalConceptoEdicion, "auto", "auto");
  }, 5000);
  //aplicarWizardFormulario(idPopupEdicion,idContenedorEdicion);
  //aplicarWizardFormulario(idPopupVista,idContenedorVista);
  crearPopup(idPopupEliminacion, "30%", 170);
  //aplicarCompletarTexto(idInput,url);

  $(document).on("click", "#campos-detalle-compra", function (e) {
    e.stopPropagation();
  });
}

function ejecutarScriptsDosificacion(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista
) {
  crearPopup(idPopupEdicion, "auto", "auto");
  crearPopup(idPopupVista, "auto", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  crearPopup(idPopupEliminacion, "auto", "auto");
  aplicarDatePickers();
}

function ejecutarScriptsSucursal(
  idModalWizardSucursalEdicion,
  idModalWizardSucursalVista,
  idModalEliminarSucursal,
  idModalContenedorSucursalEdicion,
  idModalContenedorSucursalVista,
  idModalWizardSucursalCorrelativoEdicion,
  idModalConfiguracionIso,
  idModalMantenimiento,
  idModalContenedorSucursalCorrelativoEdicion,
  idModalActivarSFE,
  idModalCatalogoSFE
) {
  crearPopup(idModalWizardSucursalEdicion, "auto", "auto");
  crearPopup(idModalWizardSucursalVista, "auto", "auto");
  crearPopup(idModalWizardSucursalCorrelativoEdicion, "70%", "auto");
  aplicarWizardFormulario(
    idModalWizardSucursalCorrelativoEdicion,
    idModalContenedorSucursalCorrelativoEdicion
  );
  aplicarWizardFormulario(idModalWizardSucursalEdicion, idModalContenedorSucursalEdicion);
  aplicarWizardFormulario(idModalWizardSucursalVista, idModalContenedorSucursalVista);
  crearPopup(idModalEliminarSucursal, "auto", "auto");
  crearPopup(idModalConfiguracionIso, "auto", "auto");
  crearPopup(idModalMantenimiento, "auto", "auto");
  crearPopup(idModalActivarSFE, "50%", "auto");
  crearPopup(idModalCatalogoSFE, "70%", "auto");
}

function ejecutarScriptsConcepto(idPopupEdicion, idContenedorEdicion) {
  crearPopup(idPopupEdicion, "50%", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
}

function ejecutarScriptsProducto(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista,
  idImagen,
  idModalReporteProductosKardex,
  idModalConceptoEdicion,
  idModalPromocionesProducto,
  idModalPromocionesPuntajes
) {
  crearPopup(idPopupEdicion, "60%", "auto");
  crearPopup(idPopupVista, "60%", 610);
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarVisorImagenArchivo(idImagen);
  crearPopup(idPopupEliminacion, "30%", 170);
  crearPopup(idModalReporteProductosKardex, "auto", "auto");
  crearPopup(idModalPromocionesProducto, "auto", "auto");
  crearPopup(idModalPromocionesPuntajes, "50%", "auto");
  setTimeout(function () {
    aplicarDatePickers();
    aplicarTiempos();
    crearPopup(idModalConceptoEdicion, "35%", "auto");
  }, 3000);
}

function ejecutarScriptsProveedor(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista,
  IdModalNuevoAnticipo,
  IdModalCalificacionProvDocIso,
  IdModalCalificacionesProveedores
) {
  crearPopup(idPopupEdicion, "auto", "auto");
  crearPopup(idPopupVista, "auto", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarDatePickers();
  crearPopup(idPopupEliminacion, "auto", "auto");
  crearPopup(IdModalNuevoAnticipo, "auto", "auto");
  crearPopup(IdModalCalificacionProvDocIso, "auto", "auto");
  crearPopup(IdModalCalificacionesProveedores, "auto", "auto");
}
function ejecutarScriptsEstadoCuentaProveedor(
  idModalPagoDeudaProveedor,
  idModalTablaEstadoCuenta
) {
  crearPopup(idModalTablaEstadoCuenta, "auto", "auto");
  crearPopup(idModalPagoDeudaProveedor, "auto", "auto");
}
function ejecutarScriptsCliente(
  idPopupEdicion,
  idPopupVista,
  idPopupEliminacion,
  idContenedorEdicion,
  idContenedorVista,
  idModalConceptoEdicionCorrelativos,
  IdModalVerificarCuenta,
  IdModalNuevoAnticipo
) {
  crearPopup(idPopupEdicion, "auto", "auto");
  crearPopup(idPopupVista, "auto", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarDatePickers();
  crearPopup(idPopupEliminacion, "auto", "auto");
  crearPopup(IdModalNuevoAnticipo, 300, "auto");
  setTimeout(function name(params) {
    crearPopup(idModalConceptoEdicionCorrelativos, "auto", "auto");
    crearPopup(IdModalVerificarCuenta, "auto", "auto");
  }, 3000);
}

function ejecutarScriptsUsuario(
  idPopupEdicion,
  idImagen,
  idContenedorEdicion,
  idPopupVista,
  idContenedorVista,
  idPopupEliminacion,
  idPopupRutas,
  idContenedorRutas,
  idPopupComisiones,
  idContenedorComisiones
) {
  crearPopup(idPopupEdicion, "auto", "auto");
  crearPopup(idPopupVista, "auto", "auto");
  crearPopup(idPopupRutas, "auto", "auto");
  crearPopup(idPopupComisiones, "auto", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarWizardFormulario(idPopupRutas, idContenedorRutas);
  aplicarWizardFormulario(idPopupComisiones, idContenedorComisiones);
  crearPopup(idPopupEliminacion, "auto", "auto");
  aplicarVisorImagenArchivo(idImagen);
}

function ejecutarScriptsEmpresa(
  idPopupEdicion,
  idImagen,
  idContenedorEdicion,
  idPopupVista,
  idContenedorVista,
  idPopupEliminacion,
  idModalCorrelativoEmpresa,
  idModalConfiguracionIso,
  idModalReporteItems,
  idModalSistFactElectronicaWeb,
  idModalEmpresaConfigSFE
) {
  crearPopup(idPopupEdicion, "auto", "auto");
  crearPopup(idPopupVista, "auto", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  aplicarVisorImagenArchivo(idImagen);
  crearPopup(idModalCorrelativoEmpresa, "auto", "auto");
  crearPopup(idPopupEliminacion, "30%", 170);
  crearPopup(idModalConfiguracionIso, "auto", "auto");
  crearPopup(idModalReporteItems, "70%", "auto");
  crearPopup(idModalSistFactElectronicaWeb, "50%", "auto");
  crearPopup(idModalEmpresaConfigSFE, "60%", "auto");

  setTimeout(function() {
    AplicarImputFileFirma("id-firmadigital");
  }, 5000)
}

function AplicarImputFileFirma(idImput) {
  $("#" + idImput).ace_file_input({
    no_file: "Ning??n archivo ..",
    btn_choose: "Elegir",
    btn_change: "Cambiar",
    droppable: false,
    onchange: null,
    thumbnail: false, //| true | large
    allowExt:'p12',
    denyExt: 'pdf'
    //blacklist:'exe|php'
    //onchange:''
    //
  });
}

function ejecutarScriptsBanco(
  idPopupEdicion,
  idContenedorEdicion,
  idPopupVista,
  idContenedorVista,
  idPopupEliminacion
) {
  crearPopup(idPopupEdicion, "46%", "auto");
  crearPopup(idPopupVista, "46%", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  crearPopup(idPopupEliminacion, "30%", 170);
}

function ejecutarScriptsCierre(
  idPopupEdicion,
  idContenedorEdicion,
  idPopupVista,
  idContenedorVista,
  idPopupEliminacion,
  idModalDeposito,
  idPopupDatosAdicionales,
  idPopupCancelar,
  idModalWizardCierreMeseroEdicion
) {
  crearPopup(idPopupEdicion, "60%", "auto");
  crearPopup(idPopupVista, "60%", "auto");
  aplicarWizardFormulario(idPopupEdicion, idContenedorEdicion);
  aplicarWizardFormulario(idPopupVista, idContenedorVista);
  crearPopup(idPopupEliminacion, "30%", 170);
  crearPopup(idModalDeposito, "50%", 500);
  crearPopup(idPopupDatosAdicionales, "60%", 200);
  crearPopup(idPopupCancelar, "auto", "auto");
  crearPopup(idModalWizardCierreMeseroEdicion, "60%", "auto");
  aplicarDatePickers();
}
function ejecutarScriptsVehiculos(
  modalNuevoMantenimiento,
  modalReportarIncidente,
  modalCheckListDiario,
  modalCheckListMensual,
  modalEditarHistorico,
  modalMantenimientoCorrectivo,
  modalBusquedaProducto,
  modalBusquedaEncargado,
  modalLogin,
  modalNuevoMantenimientoMaquinaria,
  modalCheckListMensualMaquinaria,
  modalEditarItemList,
  modalProxMantenimientoMaquinaria,
  modalProxMantenimientoVehiculo,
  modalCalendar,
  modalFichaVehiculo,
  modalEditarCheckList,
  modalBuscarMaquinaria,
  modalReportarIncidenteMaquinaria,
  idModalInicioMantenimiento,
  idModalOTNuevo,
  idModalwizardContainerOTNuevo,
  idModalFacturaServicioExterno,
  idModaRepuestosOT,
  idModalEventoCalendario,
  idModalEditarEventoCalendario,
  idModalAgregarDatosVehiculo,
  idModalConceptoEdicion,
  idModalListaVehiculos,
  idmodalKardexVehiculo,
  idModalInventario,
  idModalLiquidacionMantenimiento,
  idModalwiZardcontainerliquidacionmantenimiento,
  idModalConceptoEdicionEspecialidad,
  idModalConfiguracionMecanica,
  idFinalizarLiquidacion,
  idTipoImpresionLiquidacion,
  idModalSettings,
  idModalPagoCreditoMantenmimiento
) {
  crearPopup(modalNuevoMantenimiento, "auto", "auto");
  crearPopup(modalReportarIncidente, "45%", 445);
  crearPopup(modalCheckListDiario, "45%", 710);
  crearPopup(modalCheckListMensual, "45%", 710);
  crearPopup(modalEditarHistorico, "45%", 500);
  crearPopup(modalMantenimientoCorrectivo, "50%", 360);
  crearPopup(modalBusquedaProducto, "45%", 510);
  crearPopup(modalBusquedaEncargado, "45%", 460);
  crearPopup(modalLogin, "43%", 290);
  crearPopup(modalNuevoMantenimientoMaquinaria, "43%", 250);
  crearPopup(modalCheckListMensualMaquinaria, "45%", 560);
  crearPopup(modalEditarItemList, "50%", 360);
  crearPopup(modalProxMantenimientoMaquinaria, "50%", 360);
  crearPopup(modalProxMantenimientoVehiculo, "50%", 360);
  crearPopup(modalCalendar, "80%", 600);
  crearPopup(modalFichaVehiculo, "45%", 833);
  crearPopup(modalEditarCheckList, "45%", 400);
  crearPopup(modalBuscarMaquinaria, "45%", 260);
  crearPopup(modalReportarIncidenteMaquinaria, "45%", 450);
  // ======
  crearPopup(idModalInicioMantenimiento, "50%", "auto");
  // crearPopup(idModalOTNuevo, "90%", 'auto');
  // crearPopup(idModalOTNuevo, "100%", screen.height);
  crearPopup(idModalOTNuevo, "100%", 600);
  aplicarWizardFormulario(idModalOTNuevo, idModalwizardContainerOTNuevo);
  crearPopup(idModaRepuestosOT, "75%", "auto");
  crearPopup(idModalEventoCalendario, "45%", 250);
  crearPopup(idModalEditarEventoCalendario, "45%", 250);
  crearPopup(idModalListaVehiculos, "auto", "auto");
  crearPopup(idmodalKardexVehiculo, "auto", "auto");
  crearPopup(idModalInventario, "auto", "auto");

  crearPopup(idModalAgregarDatosVehiculo, "auto", "auto");
  crearPopup(idModalSettings, "auto", "auto");

  crearPopup(idModalLiquidacionMantenimiento, "100%", "auto");
  crearPopup(idModalConfiguracionMecanica, "85%", "auto");
  aplicarTab(idModalConfiguracionMecanica);
  crearPopup(idModalPagoCreditoMantenmimiento, "auto", "auto");

  // aplicarWizardFormulario(idModalLiquidacionMantenimiento, idModalwiZardcontainerliquidacionmantenimiento);

  setTimeout(function () {
    crearPopup(idModalFacturaServicioExterno, "50%", "auto");
    crearPopup(idModalConceptoEdicion, "auto", "auto");
    crearPopup(idModalConceptoEdicionEspecialidad, "auto", "auto");
    crearPopup(idFinalizarLiquidacion, "auto", "auto");
    crearPopup(idTipoImpresionLiquidacion, "45%", "auto");
  }, 5000);

  aplicarModalCabeceraBotonesVehiculos();
  aplicarMultiSelect();

  aplicarDatePickers();
  // aplicarHoras();
  aplicarTiempos();
}

function ejecutarScriptsActivos(
  idModalconfiguracionActivos,
  idModalRevaluarActivo
) {
  crearPopup(idModalconfiguracionActivos, "50%", "auto");
  crearPopup(idModalRevaluarActivo, "auto", "auto");
}
function ejecutarScriptGeoLocalizacion(ModalVendedorMapa, ModalFiltroMapa) {
  crearPopup(ModalVendedorMapa, "80%", 600);
  crearPopup(ModalFiltroMapa, "auto", "auto");
}
function ejecutarScriptsPorteria() {
  clockUpdate();
  setInterval(clockUpdate, 1000);
  aplicarDatePickers();
}

function ejecutarScriptLibroCompras(idModalcompra) {
  crearPopup(idModalcompra, "30%", "auto");
}

function ejecutarScriptsPlanillaAguinaldos(
  idModalNuevaPlanillaAguinaldos,
  idModalVerPlanillaAguinaldos,
  idModalImpresion,
  idModalTR3,
  idModalHistorialTR3,
  idModalVerificarTr3
) {
  crearPopup(idModalNuevaPlanillaAguinaldos, "100%", 700);
  crearPopup(idModalVerPlanillaAguinaldos, "100%", 700);
  crearPopup(idModalImpresion, "75%", "auto");
  crearPopup(idModalTR3, "75%", "auto");
  crearPopup(idModalHistorialTR3, "75%", "auto");
  crearPopup(idModalVerificarTr3, "75%", "auto");
}
function ejecutarScriptsConfigImpresoras(idModalNuevaImpresora) {
  crearPopup(idModalNuevaImpresora, "60%", "auto");
}
function ejecutarScriptsConsultaContableUno(
  IdModalConfiguracionAreaCostos,
  IdModalConfiguracionCentroCosto
) {
  crearPopup(IdModalConfiguracionAreaCostos, "auto", "auto");
  crearPopup(IdModalConfiguracionCentroCosto, "auto", "auto");
  // crearPopup(idModalNuevaImpresora, "60%", "auto");
}
function ejecutarScriptsConsultaContableDos() {
  // crearPopup(idModalNuevaImpresora, "60%", "auto");
}

function ejecutarScriptsPlanillaIncrementos(
  idDialogNuevaPlanilla,
  idModalVerPlanillaIncremento
) {
  crearPopup(idDialogNuevaPlanilla, "auto", "auto");
  crearPopup(idModalVerPlanillaIncremento, "auto", "auto");
}

function ejecutarScriptsRecibos(
  idModalNuevoRecibo,
  idModalChoferes,
  idModalVehiculos,
  idModalRutas
) {
  crearPopup(idModalNuevoRecibo, "95%", "auto");
  crearPopup(idModalChoferes, "70%", "auto");
  crearPopup(idModalVehiculos, "70%", "auto");
  crearPopup(idModalRutas, "70%", "auto");
}

function ejecutarScriptsPlanillaRetoactivas(idDialogNuevaPlanilla) {
  crearPopup(idDialogNuevaPlanilla, "100%", 700);
}

function ejecutarScriptsBalnearios(
  idModalNuevoAmbiente,
  idModalNuevoTipoAmbiente,
  idModalEncargados,
  idModalNuevoEncargado,
  idModalPanelVentasExpress,
  idModalAmbientes,
  idModalCerrarAmbiente,
  modalPdfView
) {
  crearPopup(idModalNuevoAmbiente, "60%", "auto");
  crearPopup(idModalNuevoTipoAmbiente, "55%", "auto");
  crearPopup(idModalEncargados, "70%", "auto");
  crearPopup(idModalNuevoEncargado, "50%", "auto");
  crearPopup(idModalPanelVentasExpress, "100%", screen.height);
  crearPopup(idModalAmbientes, "70%", "auto");
  crearPopup(idModalCerrarAmbiente, "auto", 650);
  crearPopup(modalPdfView, "auto", "auto");
  // crearPopup(idModalRutas, "70%", 'auto');
}
function ejecutarScriptsCapacitaciones(
  modalCapacitacion,
  modalConceptoEdicion,
  modalPonderacion,
  modalCalificacion,
  modalCertificado,
  imagenCertificado,
  modalEmpleado
) {
  crearPopup(modalCapacitacion, "auto", "auto");
  crearPopup(modalConceptoEdicion, "auto", "auto");
  crearPopup(modalPonderacion, "auto", "auto");
  crearPopup(modalCalificacion, "auto", "auto");
  crearPopup(modalCertificado, "80%",  "auto");
  crearPopup(modalEmpleado, "auto", "auto");

  aplicarVisorImagenArchivo(imagenCertificado,true);
  setTimeout(function () {
    aplicarDatePickers();
    aplicarTiempos();
  }, 3000);
}
function ejecutarScriptsMail(idModalNuevoEmail,idModalReenvioEmail) 
{
  crearPopup(idModalNuevoEmail, "50%", "auto");
  crearPopup(idModalReenvioEmail, "50%", "auto");
}



function aplicarMultiSelect() {
  $(".multiselect").multiselect({
    enableFiltering: true,
    enableHTML: true,
    buttonClass: "btn btn-white btn-primary",
    templates: {
      button:
        '<button type="button" class="multiselect dropdown-toggle form-control" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
      ul: '<ul class="multiselect-container dropdown-menu"></ul>',
      filter:
        '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
      filterClearBtn:
        '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
      li: '<li><a tabindex="0"><label></label></a></li>',
      divider: '<li class="multiselect-item divider"></li>',
      liGroup:
        '<li class="multiselect-item multiselect-group"><label></label></li>',
    },
  });
  $(".knob").knob();
}

function aplicarModalCabeceraBotonesVehiculos() {
  $("#id-btn-edicion-correctivo").on("click", function (e) {
    e.preventDefault();

    $("#dialog-edicion-correctivo")
      .removeClass("hide")
      .dialog({
        resizable: true,
        width: "100%",
        modal: true,
        title:
          "<div class='bg-green' ><h4 class='smaller'><i class='fa fa-calendar  '></i> <label>Registro/edici??n Orden de Trabajo</label></h4></div>",
        title_html: true,
        buttons: [
          {
            html: "<i class='ace-icon fa fa-check bigger-110'></i>&nbsp; Finalizar orden de trabajo",
            class: "btn btn-success",
            click: function () {
              $(this).dialog("close");
            },
          },
          {
            html: "<i class='ace-icon fa fa-floppy-o bigger-110'></i>&nbsp; Guardar",
            class: "btn btn-primary",
            click: function () {
              $(this).dialog("close");
            },
          },
          {
            html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancelar",
            class: "btn btn-danger",
            click: function () {
              $(this).dialog("close");
            },
          },
        ],
      });
  });
  $("#id-btn-mantenimiento-correctivo").on("click", function (e) {
    e.preventDefault();

    $("#dialog-mantenimiento-correctivo")
      .removeClass("hide")
      .dialog({
        resizable: true,
        width: "1200",
        modal: true,
        title:
          "<div ><h4 class='smaller'><i class='fa fa-calendar  '></i> <label>Mantenimiento Correctivo</label></h4></div>",
        title_html: true,
        buttons: [
          {
            html: "<i class='ace-icon fa fa-print bigger-110'></i>&nbsp; Imprimir",
            class: "btn btn-primary",
            click: function () {
              $(this).dialog("close");
            },
          },
          {
            html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancelar",
            class: "btn btn-danger",
            click: function () {
              $(this).dialog("close");
            },
          },
        ],
      });
  });
}

function resaltarPesta??a(idMenu) {
  $("#sidebar ul li.active").removeClass("active");
  $("#sidebar2 ul li.active").removeClass("active");
  $("#" + idMenu + "1").addClass("active");
  $("#" + idMenu + "2").addClass("active");
}

function ocultarPopup(idPopup) {
  if ($("#" + idPopup).hasClass("ui-dialog-content")) {
    $("#" + idPopup).dialog("close");
  }
}

function eliminarPopup(idPopup) {
  console.log(idPopup);
  if ($("#" + idPopup).hasClass("ui-dialog-content")) {
    $("#" + idPopup).dialog("destroy");
  } else {
    // it is not initialized yet
  }
}

function abrirPopup(idPopup) {
  var popupAttr = modalsAgil.find((mod) => mod[0] == idPopup);
  if (popupAttr[3]) {
    var dialog = $("#" + idPopup).dialog({
      modal: true,
      width: popupAttr[1],
      height: popupAttr[2],
      autoOpen: false,
      resizable: true,
      position: [popupAttr[3], popupAttr[4]],
    });
  } else {
    var dialog = $("#" + idPopup).dialog({
      modal: true,
      width: popupAttr[1],
      height: popupAttr[2],
      autoOpen: false,
      resizable: true,
    });
  }

  $.ui.dialog.prototype._focusTabbable = $.noop;
  $("#" + idPopup)
    .siblings(".ui-dialog-titlebar")
    .remove();
  $("#" + idPopup).dialog("open");
}

function aplicarDatePickers() {
  $(".date-picker")
    .datepicker({
      autoclose: true,
      todayHighlight: true,
      defaultDate: new Date($("#" + $(this).attr("id")).val()),
      onSelect: function (dateText) {
        $("#" + $(this).attr("id")).trigger("change");
      },
    })
    //show datepicker when clicking on the icon
    .next()
    .on(ace.click_event, function () {
      $(this).prev().focus();
    });
}

function aplicarListasDesplegables() {
  var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox({
    infoTextFiltered:
      '<span class="label label-purple label-lg">Filtered</span>',
  });
  var container1 = demo1.bootstrapDualListbox("getContainer");
  container1.find(".btn").addClass("btn-white btn-info btn-bold");

  /**var setRatingColors = function() {
		$(this).find('.star-on-png,.star-half-png').addClass('orange2').removeClass('grey');
		$(this).find('.star-off-png').removeClass('orange2').addClass('grey');
	}*/
  $(".rating").raty({
    cancel: true,
    half: true,
    starType: "i",
    /**,
		
		'click': function() {
			setRatingColors.call(this);
		},
		'mouseover': function() {
			setRatingColors.call(this);
		},
		'mouseout': function() {
			setRatingColors.call(this);
		}*/
  }); //.find('i:not(.star-raty)').addClass('grey');

  //////////////////
  //select2
  $(".select2")
    .css("width", "200px")
    .select2({ allowClear: true, language: "es" });
  $(".select2").on("change", function (e) {
    $("#" + $(this).attr("id")).trigger("change");
  });

  $("#select2-multiple-style .btn").on("click", function (e) {
    var target = $(this).find("input[type=radio]");
    var which = parseInt(target.val());
    if (which == 2) $(".select2").addClass("tag-input-style");
    else $(".select2").removeClass("tag-input-style");
  });

  //////////////////
  $(".multiselect").multiselect({
    enableFiltering: true,
    buttonClass: "btn btn-white btn-primary",
    templates: {
      button:
        '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"></button>',
      ul: '<ul class="multiselect-container dropdown-menu"></ul>',
      filter:
        '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
      filterClearBtn:
        '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
      li: '<li><a href="javascript:void(0);"><label></label></a></li>',
      divider: '<li class="multiselect-item divider"></li>',
      liGroup:
        '<li class="multiselect-item group"><label class="multiselect-group"></label></li>',
    },
  });

  ///////////////////

  //typeahead.js
  //example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, "i");

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });

      cb(matches);
    };
  };

  $("input.typeahead").typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: "states",
      displayKey: "value",
      source: substringMatcher(ace.vars["US_STATES"]),
    }
  );

  ///////////////

  //in ajax mode, remove remaining elements before leaving page
  $(document).one("ajaxloadstart.page", function (e) {
    $("[class*=select2]").remove();
    $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox("destroy");
    $(".rating").raty("destroy");
    $(".multiselect").multiselect("destroy");
  });
}

function aplicarVisorImagenArchivo(idImagen,icon) {
  $("#" + idImagen)
    .ace_file_input({
      style: "well",
      btn_choose: "Seleccione o Arrastrar el Archivo",
      btn_change: null,
      no_icon: icon|| "ace-icon fa fa-cloud-upload",
      droppable: true,
      thumbnail: "small", //large | fit
      //,icon_remove:null//set null, to hide remove/reset button
      before_change: function (files, dropped) {
        //Check an example below
        //or examples/file-upload.html
        // Create the image editor overlay
        return true;
      },
      /**,before_remove : function() {
			return true;
		}*/
      preview_error: function (filename, error_code) {
        //name of the file that failed
        //error_code values
        //1 = 'FILE_LOAD_FAILED',
        //2 = 'IMAGE_LOAD_FAILED',
        //3 = 'THUMBNAIL_FAILED'
        //alert(error_code);
      },
    })
    .on("change", function () {
      //console.log($(this).data('ace_input_files'));
      var files = $("#" + idImagen).data("ace_input_files");
      var valid_files = [];
      var editor = document.createElement("div");
      editor.setAttribute("id", "DivCrop");
      editor.style.position = "fixed";
      editor.style.left = 0;
      editor.style.right = 0;
      editor.style.top = 0;
      editor.style.bottom = 0;
      editor.style.zIndex = 9999;
      editor.style.backgroundColor = "#555";
      document.body.appendChild(editor);

      // Create the confirm button
      var confirm = document.createElement("button");
      // confirm.style.position = 'absolute';
      confirm.style.left = "47%";
      confirm.style.top = "85%";
      confirm.style.zIndex = 9999;

      confirm.classList.add("btn");
      confirm.classList.add("btn-success");
      confirm.innerHTML =
        '<i class="fa fa-check bigger-110" aria-hidden="true"></i> Confirmar';

      confirm.addEventListener("click", async function () {
        // Get the output file data from Croppie
        await croppie
          .result({
            type: "blob",
            size: "viewport",
            quality: 0.6,
            format: "webp",
          })
          .then(function (blob) {
            var file = new File([blob], files[0].name, { type: blob.type });
            valid_files.push(file);
          });

        // Remove the editor from view
        editor.parentNode.removeChild(editor);
        // return valid_files;
        $("#" + idImagen).ace_file_input("show_file_list", valid_files);
        uploadImage({ files: valid_files }, idImagen + "-oculto");
      });
      editor.appendChild(confirm);

      // Create the croppie editor
      var croppie = new Croppie(editor, {
        enableResize: true,
        viewport: {
          width: 300,
          height: 300,
        },
        boundary: {
          width: 400,
          height: 400,
        },
      });

      // Load the image to Croppie
      swal.fire({
        title: "Cargando Imagen ...",
        icon: "info",
        iconHtml: '<i class="fa fa-picture-o size-icon"></i>',
        target: document.getElementById("DivCrop"),
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      swal.showLoading();
      croppie
        .bind({
          url: URL.createObjectURL(files[0]),
        })
        .then(function (params) {
          // alert('terminado......')
          croppie.setZoom(0);
          swal.fire({
            title: "Finalizado!",
            icon: "success",
            timer: 1000,
            target: document.getElementById("DivCrop"),
            showConfirmButton: false,
          });
        });
    });
}

// funcion para agrgar mascara de codigo de control
function AplicarImputCodigoControl(idCampo) {
  if(document.getElementById(idCampo)){
    document.getElementById(idCampo).addEventListener(
      "keydown",
      function (e) {
        var value = this.value;
        var key = event.keyCode || event.charCode;
        let ultimoValor = event.key.toUpperCase();
        if (key == 9 || key == 8 || key == 46 || key == 13) {
          return false;
        }
        if (value.length % 3 == 2 && value.substr(value.length - 1, 1) !== "-") {
          this.value = this.value + "-";
        }
      },
      false
    );
  }
}

function AplicarImputFile(idImput) {
  $("#" + idImput).ace_file_input({
    no_file: "Ning??n archivo ..",
    btn_choose: "Elegir",
    btn_change: "Cambiar",
    droppable: false,
    onchange: null,
    thumbnail: false, //| true | large
    //whitelist:'gif|png|jpg|jpeg'
    //blacklist:'exe|php'
    //onchange:''
    //
  });
}

function aplicarWizardFormulario(idPopup, idContenedor) {
  $("[data-rel=tooltip]").tooltip();
  var $validation = false;
  $("#" + idContenedor).ace_wizard();
  $("#" + idPopup + " .wizard-actions .btn[data-dismiss=modal]").removeAttr(
    "disabled"
  );
  $(document).one("ajaxloadstart.page", function (e) {
    //in ajax mode, remove remaining elements before leaving page
    $("[class*=select2]").remove();
  });
}

var modalsAgil = [];
var sinModals = [];
function crearPopup(idPopup, ancho, altura, positionX, positionY) {
  var index = modalsAgil.findIndex((x) => x[0] == idPopup);
  // here you can check specific property for an object whether it exist in your array or not
  if (index === -1) modalsAgil.push(Object.assign({}, arguments));
  // console.log("argumentoss modalsssss  ", modalsAgil);

  // if ($("#" + idPopup).hasClass('modal')) {
  // 	$("#" + idPopup).dialog('destroy');
  // } else {
  // 	if(index === -1) sinModals.push(idPopup)
  // }
  // console.log('sin modasllllllll', sinModals)

  // if (positionX) {
  // 	var dialog = $("#" + idPopup).dialog({
  // 		modal: true,
  // 		width: ancho,
  // 		height: altura,
  // 		autoOpen: false,
  // 		resizable: true,
  // 		position: [positionX, positionY],
  // 	});
  // } else {
  // 	var dialog = $("#" + idPopup).dialog({
  // 		modal: true,
  // 		width: ancho,
  // 		height: altura,
  // 		autoOpen: false,
  // 		resizable: true,

  // 	});
  // }

  // $.ui.dialog.prototype._focusTabbable = $.noop;

  // $("#" + idPopup).siblings('.ui-dialog-titlebar').remove();
  /* $("#" + idPopup).dialog("moveToTop"); */
  // $("#" + idPopup).draggable({
  // 	handle: ".modal-header"
  // });
}

function crearArregloColumnas(valor, longitud) {
  var arr = [],
    i = longitud + 2;
  while (i--) {
    arr[i] = valor;
  }
  return arr;
}

function ejecutarScriptsTabla(idTabla, longitudColumnas) {
  var columnas = crearArregloColumnas(null, longitudColumnas);
  columnas[0] = { bSortable: false };
  columnas[longitudColumnas + 1] = { bSortable: false };
  //initiate dataTables plugin
  var oTable1 = $("#" + idTabla).dataTable({
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ items",
        zeroRecords: "No existen resultados - lo sentimos",
        info: "Mostrando p??gina _PAGE_ de _PAGES_",
        search: "Buscar:",
        infoEmpty: "Ningun objeto disponible",
        infoFiltered: "(Filtrando de un total de _MAX_ objetos)",
        paginate: {
          previous: "Primero",
          next: "Ultimo",
        },
      },
      bAutoWidth: false,
      aoColumns: columnas,
      aaSorting: [],

      //,
      //"sScrollY": "200px",
      //"bPaginate": false,

      //"sScrollX": "100%",
      //"sScrollXInner": "120%",
      //"bScrollCollapse": true,
      //Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
      //you may want to wrap the table inside a "div.dataTables_borderWrap" element

      //"iDisplayLength": 50
    });
  //oTable1.fnAdjustColumnSizing();

  //TableTools settings
  TableTools.classes.container = "btn-group btn-overlap";
  TableTools.classes.print = {
    body: "DTTT_Print",
    info: "tableTools-alert gritter-item-wrapper gritter-info gritter-center white",
    message: "tableTools-print-navbar",
  };

  //initiate TableTools extension
  // var tableTools_obj = new $.fn.dataTable.TableTools(oTable1, {
  //   sSwfPath: "assets/swf/copy_csv_xls_pdf.swf",

  //   sRowSelector: "td:not(:last-child)",
  //   sRowSelect: "multi",
  //   fnRowSelected: function (row) {
  //     //check checkbox when row is selected
  //     try {
  //       $(row).find("input[type=checkbox]").get(0).checked = true;
  //     } catch (e) {}
  //   },
  //   fnRowDeselected: function (row) {
  //     //uncheck checkbox
  //     try {
  //       $(row).find("input[type=checkbox]").get(0).checked = false;
  //     } catch (e) {}
  //   },

  //   sSelectedClass: "success",
  //   aButtons: [
  //     {
  //       sExtends: "copy",
  //       sToolTip: "Copy to clipboard",
  //       sButtonClass: "btn btn-white btn-primary btn-bold",
  //       sButtonText: "<i class='fa fa-copy bigger-110 pink'></i>",
  //       fnComplete: function () {
  //         this.fnInfo(
  //           '<h3 class="no-margin-top smaller">Table copied</h3>\
	// 								<p>Copied ' +
  //             oTable1.fnSettings().fnRecordsTotal() +
  //             " row(s) to the clipboard.</p>",
  //           1500
  //         );
  //       },
  //     },

  //     {
  //       sExtends: "csv",
  //       sToolTip: "Export to CSV",
  //       sButtonClass: "btn btn-white btn-primary  btn-bold",
  //       sButtonText: "<i class='fa fa-file-excel-o bigger-110 green'></i>",
  //     },

  //     {
  //       sExtends: "pdf",
  //       sToolTip: "Export to PDF",
  //       sButtonClass: "btn btn-white btn-primary  btn-bold",
  //       sButtonText: "<i class='fa fa-file-pdf-o bigger-110 red'></i>",
  //     },

  //     {
  //       sExtends: "print",
  //       sToolTip: "Print view",
  //       sButtonClass: "btn btn-white btn-primary  btn-bold",
  //       sButtonText: "<i class='fa fa-print bigger-110 grey'></i>",

  //       sMessage:
  //         "<div class='navbar navbar-default'><div class='navbar-header pull-left'><a class='navbar-brand' href='#'><small>Optional Navbar &amp; Text</small></a></div></div>",

  //       sInfo:
  //         "<h3 class='no-margin-top'>Print view</h3>\
	// 								  <p>Please use your browser's print function to\
	// 								  print this table.\
	// 								  <br />Press <b>escape</b> when finished.</p>",
  //     },
  //   ],
  // });
  //we put a container before our table and append TableTools element to it
  // $(tableTools_obj.fnContainer()).appendTo($(".tableTools-container"));

  //also add tooltips to table tools buttons
  //addding tooltips directly to "A" buttons results in buttons disappearing (weired! don't know why!)
  //so we add tooltips to the "DIV" child after it becomes inserted
  //flash objects inside table tools buttons are inserted with some delay (100ms) (for some reason)
  // setTimeout(function () {
  //   $(tableTools_obj.fnContainer())
  //     .find("a.DTTT_button")
  //     .each(function () {
  //       var div = $(this).find("> div");
  //       if (div.length > 0) div.tooltip({ container: "body" });
  //       else $(this).tooltip({ container: "body" });
  //     });
  // }, 200);

  //ColVis extension
  // var colvis = new $.fn.dataTable.ColVis(oTable1, {
  //   buttonText: "<i class='fa fa-search'></i>",
  //   aiExclude: [0, 6],
  //   bShowAll: true,
  //   //"bRestore": true,
  //   sAlign: "right",
  //   fnLabel: function (i, title, th) {
  //     return $(th).text(); //remove icons, etc
  //   },
  // });

  //style it
  // $(colvis.button())
  //   .addClass("btn-group")
  //   .find("button")
  //   .addClass("btn btn-white btn-info btn-bold");

  // //and append it to our table tools btn-group, also add tooltip
  // $(colvis.button())
  //   .prependTo(".tableTools-container .btn-group")
  //   .attr("title", "Show/hide columns")
  //   .tooltip({ container: "body" });

  // //and make the list, buttons and checkboxed Ace-like
  // $(colvis.dom.collection)
  //   .addClass(
  //     "dropdown-menu dropdown-light dropdown-caret dropdown-caret-right"
  //   )
  //   .find("li")
  //   .wrapInner('<a href="javascript:void(0)" />') //'A' tag is required for better styling
  //   .find("input[type=checkbox]")
  //   .addClass("ace")
  //   .next()
  //   .addClass("lbl padding-8");

  /////////////////////////////////
  //table checkboxes
  //$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

  //select/deselect all rows according to table header checkbox
  $("#" + idTabla + " > thead > tr > th input[type=checkbox]")
    .eq(0)
    .on("click", function () {
      var th_checked = this.checked; //checkbox inside "TH" table header

      $(this)
        .closest("table")
        .find("tbody > tr")
        .each(function () {
          var row = this;
          if (th_checked) tableTools_obj.fnSelect(row);
          else tableTools_obj.fnDeselect(row);
        });
    });

  //select/deselect a row when the checkbox is checked/unchecked
  $("#" + idTabla).on("click", "td input[type=checkbox]", function () {
    var row = $(this).closest("tr").get(0);
    if (!this.checked) tableTools_obj.fnSelect(row);
    else tableTools_obj.fnDeselect($(this).closest("tr").get(0));
  });

  $(document).on("click", "#" + idTabla + " .dropdown-toggle", function (e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  });

  //And for the first simple table, which doesn't have TableTools or dataTables
  //select/deselect all rows according to table header checkbox
  var active_class = "active";
  $("#simple-table > thead > tr > th input[type=checkbox]")
    .eq(0)
    .on("click", function () {
      var th_checked = this.checked; //checkbox inside "TH" table header

      $(this)
        .closest("table")
        .find("tbody > tr")
        .each(function () {
          var row = this;
          if (th_checked)
            $(row)
              .addClass(active_class)
              .find("input[type=checkbox]")
              .eq(0)
              .prop("checked", true);
          else
            $(row)
              .removeClass(active_class)
              .find("input[type=checkbox]")
              .eq(0)
              .prop("checked", false);
        });
    });

  //select/deselect a row when the checkbox is checked/unchecked
  $("#simple-table").on("click", "td input[type=checkbox]", function () {
    var $row = $(this).closest("tr");
    if (this.checked) $row.addClass(active_class);
    else $row.removeClass(active_class);
  });

  /********************************/
  //add tooltip for small view action buttons in dropdown menu
  $('[data-rel="tooltip"]').tooltip({ placement: tooltip_placement });

  //tooltip placement on right or left
  function tooltip_placement(context, source) {
    var $source = $(source);
    var $parent = $source.closest("table");
    var off1 = $parent.offset();
    var w1 = $parent.width();

    var off2 = $source.offset();
    //var w2 = $source.width();

    if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2))
      return "right";
    return "left";
  }
}

function convertirFecha(fecha) {
  var dia = fecha.split("/")[0];
  var mes = fecha.split("/")[1];
  var a??o = fecha.split("/")[2];
  if (a??o == undefined) {
    a??o = new Date().getFullYear();
  }
  var f = new Date();
  return (
    mes +
    "/" +
    dia +
    "/" +
    a??o +
    " " +
    f.getHours() +
    ":" +
    f.getMinutes() +
    ":" +
    f.getSeconds()
  );
}
function convertirFechaVenta(fecha) {
  var dia = fecha.split("/")[0];
  var mes = fecha.split("/")[1];
  var a??o = fecha.split("/")[2];
  if (a??o == undefined) {
    a??o = new Date().getFullYear();
  }
  var f = new Date();
  return mes + "/" + dia + "/" + a??o;
}
function convertirFechaProforma(fecha) {
  var dia = fecha.split("/")[0];
  var mes = fecha.split("/")[1];
  var a??o = fecha.split("/")[2];
  return mes + "/" + dia + "/" + a??o + ":00";
}
function number_format(amount, decimals) {
  var negativo = false;
  if (amount == null) {
    return 0;
  }
  if (amount.constructor === Number) {
    if (amount < 0) {
      negativo = true;
    }
  } else {
    amount = parseFloat(amount);
    if (amount.constructor === Number) {
      if (amount < 0) {
        negativo = true;
      }
    }
  }
  amount += ""; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);

  var amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  var a = amount_parts.join(".");
  if (negativo) {
    return "-" + a;
  } else {
    return a;
  }
}
function number_format_negativo_to_positvo(amount, decimals) {
  var negativo = false;
  if (amount == null) {
    return 0;
  }
  if (amount.constructor === Number) {
    if (amount < 0) {
      negativo = true;
    }
  } else {
    amount = parseFloat(amount);
    if (amount.constructor === Number) {
      if (amount < 0) {
        negativo = true;
      }
    }
  }
  amount += ""; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);

  var amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  var a = amount_parts.join(".");

  return a;
}
function formatearSeparadorMiles(amount, decimals) {
  var negativo = false;
  if (amount == null) {
    return 0;
  }
  if (amount.constructor === Number) {
    if (amount < 0) {
      negativo = true;
    }
  } else {
    negativo = false;
  }
  amount += ""; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = "" + amount.toFixed(decimals);

  var amount_parts = amount.split("."),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
    amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

  if (negativo) {
    var a = "-" + amount_parts.join(".");
  } else {
    var a = amount_parts.join(".");
  }

  return a;
}
function sumaFecha(d, fecha) {
  var Fecha = new Date(fecha);
  /* var dia = Fecha.getDate(),
    mes = Fecha.getMonth() + 1,
    anio = Fecha.getFullYear(),*/
    addTime = d * 86400; 
  Fecha.setSeconds(addTime);
  /*console.log("Fecha actual: " + dia + "/" + mes + "/" + anio)
	console.log("Tiempo a??adido: " + d )
	console.log("Fecha final: " + Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear())*//* 
  fecha = new Date(Fecha); */
  return Fecha;
}

function aplicarSwiper(
  slidesPerView,
  slidesPerColumn,
  paginationClickable,
  spaceBetween
) {
  var swiper = new Swiper(".swiper-container", {
    // slidesPerView: slidesPerView,
    // slidesPerColumn: slidesPerColumn,
    // paginationClickable: paginationClickable,
    // spaceBetween: spaceBetween
    slidesPerColumn: slidesPerColumn,
    paginationClickable: paginationClickable,
    slidesPerView: "auto",
    spaceBetween: 30,
  });
}
function editar_fecha(fecha, intervalo, dma, simbolo) {
  var simbolo = simbolo || "-";
  var arrayFecha = fecha.split(simbolo);
  var dia = arrayFecha[0];
  var mes = arrayFecha[1];
  var anio = arrayFecha[2];

  var fechaInicial = new Date(anio, mes - 1, dia);
  var fechaFinal = fechaInicial;
  if (dma == "m" || dma == "M") {
    fechaFinal.setMonth(fechaInicial.getMonth() + parseInt(intervalo));
  } else if (dma == "y" || dma == "Y") {
    fechaFinal.setFullYear(fechaInicial.getFullYear() + parseInt(intervalo));
  } else if (dma == "d" || dma == "D") {
    fechaFinal.setDate(fechaInicial.getDate() + parseInt(intervalo));
  } else {
    return fecha;
  }
  dia = fechaFinal.getDate();
  mes = fechaFinal.getMonth() + 1;
  anio = fechaFinal.getFullYear();

  dia = dia.toString().length == 1 ? "0" + dia.toString() : dia;
  mes = mes.toString().length == 1 ? "0" + mes.toString() : mes;

  return dia + simbolo + mes + simbolo + anio;
}
function aplicarTiempos() {
  $(".date-timepicker")
    .datetimepicker({
      locale: "es",
      format: "DD/MM/YYYY h:mm A", //use this option to display seconds
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-arrows ",
        clear: "fa fa-trash",
        close: "fa fa-times",
      },
    })
    .next()
    .on(ace.click_event, function () {
      $(this).prev().focus();
    });
}

function aplicarTiempoInicio() {
  var dateNow = new Date();
  $(".date-timepicker-inicio")
    .datetimepicker({
      locale: "es",
      format: "DD/MM/YYYY  HH:mm", //use this option to display seconds
      use24hours: true,
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-arrows ",
        clear: "fa fa-trash",
        close: "fa fa-times",
      },
    })
    .next()
    .on(ace.click_event, function () {
      $(this).prev().focus();
    });
}

function aplicarTiempoFin() {
  $(".date-timepicker-fin")
    .datetimepicker({
      locale: "es",
      format: "DD/MM/YYYY  HH:mm", //use this option to display seconds
      use24hours: true,
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-arrows ",
        clear: "fa fa-trash",
        close: "fa fa-times",
      },
    })
    .next()
    .on(ace.click_event, function () {
      $(this).prev().focus();
    });
}

function aplicarMesAnio() {
  $(".date-mes-anio").datetimepicker({
    locale: "es",
    startView: 1,
    minViewMode: 1,
    format: "MM/YYYY",
    pickTime: false,
  });
}

function parseDate(input) {
  var parts = input.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getDates(startDate, endDate) {
  var mes2 = startDate.getMonth() + 1;
  var dia2 = startDate.getDate();
  mes2 = mes2 < 10 ? "0" + mes2 : mes2;
  dia2 = dia2 < 10 ? "0" + dia2 : dia2;
  var mes3 = endDate.getMonth() + 1;
  var dia3 = endDate.getDate();
  mes3 = mes3 < 10 ? "0" + mes3 : mes3;
  dia3 = dia3 < 10 ? "0" + dia3 : dia3;
  startDate = startDate.getFullYear() + "/" + mes2 + "/" + dia2;
  endDate = endDate.getFullYear() + "/" + mes3 + "/" + dia3;
  var listDate = [];
  var dateMove = new Date(startDate);
  var strDate = startDate;
  while (strDate <= endDate) {
    //var strDate = dateMove.toISOString().slice(0, 10);
    listDate.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
    var mes = dateMove.getMonth() + 1;
    var dia = dateMove.getDate();
    mes = mes < 10 ? "0" + mes : mes;
    dia = dia < 10 ? "0" + dia : dia;
    strDate = dateMove.getFullYear() + "/" + mes + "/" + dia;
  }
  return listDate;
}
function convertirSegundosATiempo(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor((time % 3600) / 60);
  var seconds = time % 60;

  //Anteponiendo un 0 a los minutos si son menos de 10
  minutes = minutes < 10 ? "0" + minutes : minutes;

  //Anteponiendo un 0 a los segundos si son menos de 10
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var result = hours + ":" + minutes + ":" + seconds;
  return result;
}
function ValidarForm(form, steps, button) {
  /* if (!form.$valid) { */
  steps.forEach(function (dato, index, array) {
    var step = $("#" + dato.cabeza).attr("class");
    /* console.log(step) */
    var fail = false;
    if (step == "active") {
      $("#" + dato.cuerpo)
        .find("select")
        .each(function () {
          if ($(this).prop("required")) {
            if (this.value.length > 0) {
              $(this).removeClass("validacionRRhh");
              if (this.value == "?") {
                $(this).addClass("validacionRRhh");
                fail = true;
              }
            } else {
              $(this).addClass("validacionRRhh");
              fail = true;
            }
          }
        });
      $("#" + dato.cuerpo)
        .find("input")
        .each(function () {
          if ($(this).prop("required")) {
            if (this.value.length > 0) {
              $(this).removeClass("validacionRRhh");
            } else {
              $(this).addClass("validacionRRhh");
              fail = true;
            }
          }
        });
      $("#" + dato.cuerpo)
        .find("#cargos")
        .each(function () {
          if (this.innerText != "No se ha seleccionado nada") {
            $(this).removeClass("validacionRRhh");
          } else {
            $(this).addClass("validacionRRhh");
            fail = true;
          }
        });
      /*  stepDatosLaborales
			 stepdatosAfiliacion
			 stepDatosFamiliares */

      if (fail) {
        setTimeout(function () {
          $("#" + button).click();
        }, 300);
      }
    }
  });
  // cancel change
}

function duration(startDate, endDate, extra) {
  if (startDate > endDate) {
    return { anios: 0, meses: 0, dias: 0 };
  }

  endDate.setDate(endDate.getDate() + extra);
  // if (startDate.getDate() == 1 && endDate.getDate() == 30 ||  endDate.getDate() == 31) {
  // 	endDate.setDate(endDate.getDate() + 1);
  // }
  var startYear = startDate.getFullYear();
  var startMonth = startDate.getMonth();
  var startDay = startDate.getDate();

  var endYear = endDate.getFullYear();
  var endMonth = endDate.getMonth();
  var endDay = endDate.getDate();

  // We calculate February based on end year as it might be a leep year which might influence the number of days.
  var february =
    (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
  var daysOfMonth = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

  var startDateNotPassedInEndYear =
    endMonth < startMonth || (endMonth == startMonth && endDay < startDay);
  var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

  var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

  // (12 + ???) % 12 makes sure index is always between 0 and 11
  var days =
    startDay <= endDay
      ? endDay - startDay
      : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

  return { anios: years, meses: months, dias: days };
}

// function duration(since, until, extra) {

// 	//if first date is greater that the first, we fix the order
// 	/* if (since > until) {
// 		var temp = since;
// 		since = until;
// 		until = temp;
// 	}
//  */
// 	var years, months, days;

// 	var now = moment(since); //todays date
// 	var end = moment(until); // another date
// 	var duration = moment.duration(end.diff(now));
// 	if (duration._data.hours > 0 || duration._data.minutes > 0 || duration._data.seconds > 0) {
// 		duration._data.days++
// 	}
// 	duration._data.days += extra
// 	return ({ "anios": duration._data.years, "meses": duration._data.months, "dias": duration._data.days });
// 	/* 	return ({ "anios": years, "meses": months, "dias": days }); */
// }

function dayssInmonths(date) {
  date = new Date(date);
  return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

function dec2gms(valor, tipo) {
  grados = Math.abs(parseInt(valor));
  minutos = (Math.abs(valor) - grados) * 60;
  segundos = minutos;
  minutos = Math.abs(parseInt(minutos));
  segundos = Math.round((segundos - minutos) * 60 * 1000000) / 1000000;
  signo = valor < 0 ? -1 : 1;
  direccion =
    tipo == "LATITUD" ? (signo > 0 ? "N" : "S") : signo > 0 ? "E" : "W";

  if (isNaN(direccion)) grados = grados * signo;

  return {
    grados: grados,
    minutos: minutos,
    segundos: segundos,
    direccion: direccion,
    valor:
      grados +
      "?? " +
      minutos +
      "' " +
      segundos +
      "'" +
      (isNaN(direccion) ? " " + direccion : ""),
  };
}

function formatNumber(num) {
  if (!num || num == "NaN") return "-";
  if (num == "Infinity") return "&#x221e;";
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "." +
      num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num + "," + cents;
}
function capitalize(str) {
  strVal = "";
  str = str.split(" ");
  for (var chr = 0; chr < str.length; chr++) {
    strVal +=
      str[chr].substring(0, 1).toUpperCase() +
      str[chr].substring(1, str[chr].length) +
      " ";
  }
  return strVal;
}

function clockUpdate() {
  var date = new Date();
  function addZero(x) {
    if (x < 10) {
      return (x = "0" + x);
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return (x = x - 12);
    } else if (x == 0) {
      return (x = 12);
    } else {
      return x;
    }
  }

  var h = addZero(twelveHour(date.getHours()));
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  $(".digital-clock").text(h + ":" + m + ":" + s);
}
function dia_semana(fecha) {
  fecha = fecha.split("/");
  if (fecha.length != 3) {
    return null;
  }
  //Vector para calcular d??a de la semana de un a??o regular.
  var regular = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
  //Vector para calcular d??a de la semana de un a??o bisiesto.
  var bisiesto = [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
  //Vector para hacer la traducci??n de resultado en d??a de la semana.
  var semana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Mi??rcoles",
    "Jueves",
    "Viernes",
    "S??bado",
  ];
  //D??a especificado en la fecha recibida por parametro.
  var dia = fecha[0];
  //M??dulo acumulado del mes especificado en la fecha recibida por parametro.
  var mes = fecha[1] - 1;
  //A??o especificado por la fecha recibida por parametros.
  var anno = fecha[2];
  //Comparaci??n para saber si el a??o recibido es bisiesto.
  if (anno % 4 == 0 && !(anno % 100 == 0 && anno % 400 != 0))
    mes = bisiesto[mes];
  else mes = regular[mes];
  //Se retorna el resultado del calculo del d??a de la semana.
  return semana[
    Math.ceil(
      Math.ceil(
        Math.ceil((anno - 1) % 7) +
          Math.ceil(
            (Math.floor((anno - 1) / 4) -
              Math.floor((3 * (Math.floor((anno - 1) / 100) + 1)) / 4)) %
              7
          ) +
          mes +
          (dia % 7)
      ) % 7
    )
  ];
}

// Detectar cambios de conexi??n
function isOnline() {
  if (navigator.onLine) {
    /* alert("tiene internet"); */
  } else {
    alert("no tiene conexion a internet");   
   // toastr.warning("no tiene conexion a internet");
  }
}

window.addEventListener("online", isOnline);
window.addEventListener("offline", isOnline);

isOnline();

function removeDumplicateValue(myArray) {
  var newArray = [];

  angular.forEach(myArray, function (value, key) {
    var exists = false;
    angular.forEach(newArray, function (val2, key) {
      if (angular.equals(value.id, val2.id)) {
        exists = true;
      }
    });
    if (exists == false && value.id != "") {
      newArray.push(value);
    }
  });

  return newArray;
}
function ejecutarScriptsFacturacion( idModalNuevaFactura, idModalNuevoCliente){
  crearPopup(idModalNuevaFactura, "100%", screen.height);
  crearPopup(idModalNuevoCliente, "60%", 'auto' );
  setTimeout(function () {
    aplicarTiempos();
  }, 200);
}
function ejecutarScriptsEventosSignificativos(idModalNuevoEvento, idModalRecepcionFacturas, idModalNuevaFactura, idModalNuevoCliente){
  crearPopup(idModalNuevoEvento, "45%", "auto");
  crearPopup(idModalRecepcionFacturas, "45%", "auto");
  crearPopup(idModalNuevaFactura, "100%", screen.height);
  crearPopup(idModalNuevoCliente, "60%", 'auto' );
  setTimeout(function () {
    aplicarTiempos();
  }, 200);
}
function ejecutarScriptsConfiguracionFacturacion (  ){
  
}
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
function ejecutarScriptsTicket(idModalNuevoTicket) 
{
  crearPopup(idModalNuevoTicket, "65%", "auto");
}
const generarCuf = async ( factura ) => {
  return new Promise( async( resolve, reject ) => {
      try {
          let cadena = aumentarCerosIzquierda(factura)
          let mod11 = calculaDigitoMod11(cadena, 1, 9, false)
          let bruto = cadena + mod11
          let base16 = BigInt(bruto).toString(16).toUpperCase()
          return resolve({ error: false, codigo: base16 });
      } catch (e) {
        return resolve({ error: true, message: '<b class="">ERROR AL GENERAR CUF</b></br>'+e.message})  
      }
  })
}
function aumentarCerosIzquierda(fact){
  let concatenado = ""
  for (let i = 0; i < fact.length; i++) {
      const dato = fact[i];
      if(dato.campo === 'fecha' ){
          concatenado += dateyyyyMMddHHmmssSSSFormat(dato.valor)
      }else{
          concatenado += (''+dato.valor).padStart(dato.longitud, '0')
      }
  }
  return concatenado
}   
function calculaDigitoMod11( cadena, numDig, limMult, x10 ) {
  let mult, suma, i, n, dig;

  if (!x10) numDig = 1;

  for (n = 1; n <= numDig; n++) {
      suma = 0;
      mult = 2;
      for (i = cadena.length - 1; i >= 0; i--) {
          suma += (mult * +(cadena.substring(i, i + 1)));
          if (++mult > limMult) mult = 2;
      }

      if (x10) {
          dig = ((suma * 10) % 11) % 10;
      } else {
          dig = suma % 11;
      }

      if (dig == 10) {
          cadena += "1";
      }

      if (dig == 11) {
          cadena += "0";
      }

      if (dig < 10) {
          cadena += dig.toString();
      }

  }

  return cadena.substring(cadena.length - numDig, cadena.length);
}
function dateyyyyMMddHHmmssSSSFormat(date){
  let dateString = ""
  if(!date) date = new Date()
      dateString+=date.getFullYear();
      let mes = date.getMonth()+1;
      if(mes<10) mes = "0"+mes;
      dateString+=mes
      let dia = date.getDate()
      if(dia < 10) dia = '0'+dia
      dateString += dia
      let hora = date.getHours()
      if(hora <10) hora = '0'+hora
      dateString+= hora
      let mins = date.getMinutes()
      if(mins < 10) mins = '0'+mins
      dateString+=mins;
      let seconds = date.getSeconds()
      if( seconds < 10) seconds = '0'+seconds;
      dateString += seconds;
      let millis = date.getMilliseconds()
      millis = millis < 100 ? millis < 10 ? '00'+millis : '0'+millis : millis;
      dateString += millis;    
  return dateString;
}
function datetimeFormatyyyyMMddTHHmmssSSS (fecha) {
  //'11/03/2022 9:29 PM' to yyyy-MM-ddTHH:mm:ss:SSS
  let newDate = ""
  if(!fecha) return newDate;
  let dateString = fecha.split(' ')

  let newTime=""
  let [ hours, mins ] = dateString[1].split(':')
  if(dateString[2] == 'PM') hours = +hours+12
  if(+hours < 10) hours = '0'+(+hours);
  newTime +=hours
  if(+mins < 10) mins = '0'+(+mins)
  newTime += ":"+mins+":00.000"
  return dateString[0].split('/').reverse().join('-')+'T' + newTime
}