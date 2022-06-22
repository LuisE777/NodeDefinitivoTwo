module.exports = function (router, sequelize, Sequelize, jwt, md5, forEach, ensureAuthorized, ensureAuthorizedAdministrador, PDF, fs,
	excelbuilder, decodeBase64Image, signs3, schedule, nodemailer, axios, FormData, restApiSFE) {

	//*****ENTITIES*****
	//entities GRAL
	const Persona = require('../modelos/GRAL/persona')(sequelize, Sequelize);
	const Tipo = require('../modelos/GRAL/tipo')(sequelize, Sequelize);
	const Clase = require('../modelos/GRAL/clase')(sequelize, Sequelize);
	//entities SYS
	const Usuario = require('../modelos/SYS/usuario')(sequelize, Sequelize);
	const Rol = require('../modelos/SYS/rol')(sequelize, Sequelize);
	const UsuarioRol = require('../modelos/SYS/usuario-rol')(sequelize, Sequelize);
	const Aplicacion = require('../modelos/SYS/aplicacion')(sequelize, Sequelize);
	const RolAplicacion = require('../modelos/SYS/rol-aplicacion')(sequelize, Sequelize);
	const UsuarioAplicacion = require('../modelos/SYS/usuario-aplicacion')(sequelize, Sequelize);
	const VistaColumnasAplicacion = require('../modelos/SYS/vista-columnas-aplicacion')(sequelize, Sequelize);
	const CodigoControl = require('../codigo-control')();
	const NumeroLiteral = require('../numero-literal')();
	const Diccionario = require('../diccionario')();
	const EmpresaAplicacion = require('../modelos/SYS/empresa-aplicacion')(sequelize, Sequelize);
	const UsuarioAlerta = require('../modelos/SYS/usuario-alerta')(sequelize, Sequelize);
	const OpcionAplicacion = require('../modelos/SYS/opcion-aplicacion')(sequelize, Sequelize);
	const UsuarioAplicacionOpcion = require('../modelos/SYS/usuario-aplicacion-opcion')(sequelize, Sequelize);
	//entities AGIL
	const Empresa = require('../modelos/AGIL/empresa')(sequelize, Sequelize);
	const Sucursal = require('../modelos/AGIL/sucursal')(sequelize, Sequelize);
	const UsuarioSucursal = require('../modelos/AGIL/usuario-sucursal')(sequelize, Sequelize);
	const UsuarioAlmacen = require('../modelos/AGIL/usuario-almacen')(sequelize, Sequelize);
	const Cliente = require('../modelos/AGIL/cliente')(sequelize, Sequelize);
	const ClienteAnticipo = require('../modelos/AGIL/cliente-anticipo')(sequelize, Sequelize);
	const Proveedor = require('../modelos/AGIL/proveedor')(sequelize, Sequelize);
	const ProveedorAnticipo = require('../modelos/AGIL/proveedor-anticipo')(sequelize, Sequelize);
	const Producto = require('../modelos/AGIL/producto')(sequelize, Sequelize);
	const ProductoPadre = require('../modelos/AGIL/producto-padre')(sequelize, Sequelize);
	const ProductoTipoPrecio = require('../modelos/AGIL/producto-tipo-precio')(sequelize, Sequelize);
	const ProductoPrecioPorSucursal = require('../modelos/AGIL/producto-precio-por-sucursal')(sequelize, Sequelize);
	const ProductoBase = require('../modelos/AGIL/producto-base')(sequelize, Sequelize);
	const ProductoPromocion = require('../modelos/AGIL/producto-promocion')(sequelize, Sequelize);
	const ProductoPromocionPuntaje = require('../modelos/AGIL/producto-promocion-puntaje')(sequelize, Sequelize);
	const Almacen = require('../modelos/AGIL/almacen')(sequelize, Sequelize);
	const Dosificacion = require('../modelos/AGIL/dosificacion')(sequelize, Sequelize);
	const SucursalActividadDosificacion = require('../modelos/AGIL/sucursal-actividad-dosificacion')(sequelize, Sequelize);
	const ConfiguracionFactura = require('../modelos/AGIL/configuracion-factura')(sequelize, Sequelize);
	const ConfiguracionGeneralFactura = require('../modelos/AGIL/configuracion-general-factura')(sequelize, Sequelize);
	const ConfiguracionVendedorApp = require('../modelos/AGIL/configuracion-vendedor-app')(sequelize, Sequelize);
	const ConfiguracionGeneralApp = require('../modelos/AGIL/configuracion-general-app')(sequelize, Sequelize);
	const Ruta = require('../modelos/AGIL/ruta')(sequelize, Sequelize);
	const RutaDia = require('../modelos/AGIL/ruta-dia')(sequelize, Sequelize);
	const RutaCliente = require('../modelos/AGIL/ruta-cliente')(sequelize, Sequelize);
	const UsuarioRuta = require('../modelos/AGIL/usuario-ruta')(sequelize, Sequelize);
	const ComisionVendedorProducto = require('../modelos/AGIL/comision-vendedor-producto')(sequelize, Sequelize);
	const ConfiguracionVentaVista = require('../modelos/AGIL/configuracion-venta-vista')(sequelize, Sequelize);
	const ConfiguracionCompraVista = require('../modelos/AGIL/configuracion-compra-vista')(sequelize, Sequelize);
	const Banco = require('../modelos/AGIL/banco')(sequelize, Sequelize);
	const CierreCaja = require('../modelos/AGIL/cierre-caja')(sequelize, Sequelize);
	const CierreCajaMesero = require('../modelos/AGIL/cierre-caja-mesero')(sequelize, Sequelize);
	const CajaSiguienteTurno = require('../modelos/AGIL/caja-siguiente-turno')(sequelize, Sequelize);
	const CajaSiguienteTurnoMesero = require('../modelos/AGIL/caja-siguiente-turno-mesero')(sequelize, Sequelize);
	const Garzon = require('../modelos/AGIL/garzon')(sequelize, Sequelize);
	const MedicoPaciente = require('../modelos/AGIL/medico-paciente')(sequelize, Sequelize);
	const MedicoPrerequisito = require('../modelos/AGIL/medico-prerequisito')(sequelize, Sequelize);
	const GarzonPedidoRestaurante = require('../modelos/AGIL/garzon-pedido-restaurante')(sequelize, Sequelize);
	const PedidoRestaurante = require('../modelos/AGIL/pedido-restaurante')(sequelize, Sequelize);
	const MesaPedidoRestaurante = require('../modelos/AGIL/mesa-pedido-restaurante')(sequelize, Sequelize);
	const DetallePedidoRestaurante = require('../modelos/AGIL/detalle-pedido-restaurante')(sequelize, Sequelize);
	const CuentaRestaurante = require('../modelos/AGIL/cuenta-restaurante')(sequelize, Sequelize);
	const Mesa = require('../modelos/AGIL/mesa')(sequelize, Sequelize);
	const Sala = require('../modelos/AGIL/sala')(sequelize, Sequelize);
	const ContabilidadCuenta = require('../modelos/AGIL/contabilidad-cuenta')(sequelize, Sequelize);
	const ClasificacionCuenta = require('../modelos/AGIL/contabilidad-clasificacion-cuenta')(sequelize, Sequelize);
	const ComprobanteContabilidad = require('../modelos/AGIL/comprobante-contabilidad')(sequelize, Sequelize);
	const AsientoContabilidad = require('../modelos/AGIL/asiento-contabilidad')(sequelize, Sequelize);
	const AsientoContabilidadCentroCosto = require('../modelos/AGIL/asiento-contabilidad-centro-costo')(sequelize, Sequelize);
	const ClienteCuenta = require('../modelos/AGIL/cliente-cuenta')(sequelize, Sequelize);
	const ProveedorCuenta = require('../modelos/AGIL/proveedor-cuenta')(sequelize, Sequelize);
	const ConfiguracionCuenta = require('../modelos/AGIL/configuracion-cuenta')(sequelize, Sequelize);
	const MonedaTipoCambio = require('../modelos/AGIL/moneda-tipo-cambio')(sequelize, Sequelize);
	const MedicoPacienteVacunaDosis = require('../modelos/AGIL/medico-paciente-vacuna-dosis')(sequelize, Sequelize);
	const MedicoVacuna = require('../modelos/AGIL/medico-vacuna')(sequelize, Sequelize);
	const VacunaDosis = require('../modelos/AGIL/medico-vacuna-dosis')(sequelize, Sequelize);
	const MedicoPacienteVacuna = require('../modelos/AGIL/medico-paciente-vacuna')(sequelize, Sequelize);
	const MedicoPacienteConsulta = require('../modelos/AGIL/medico-paciente-consulta')(sequelize, Sequelize);
	const MedicoPacienteFicha = require('../modelos/AGIL/medico-paciente-ficha')(sequelize, Sequelize);
	const MedicoLaboratorioExamen = require('../modelos/AGIL/medico-laboratorio-examen')(sequelize, Sequelize);
	const MedicoLaboratorio = require('../modelos/AGIL/medico-laboratorio')(sequelize, Sequelize);
	const MedicoLaboratorioPaciente = require('../modelos/AGIL/medico-laboratorio-paciente')(sequelize, Sequelize);
	const MedicoLaboratorioResultado = require('../modelos/AGIL/medico-laboratorio-resultado')(sequelize, Sequelize);
	const MedicoDiagnostico = require('../modelos/AGIL/medico-diagnostico')(sequelize, Sequelize);
	const MedicoDiagnosticoExamen = require('../modelos/AGIL/medico-diagnostico-examen')(sequelize, Sequelize);
	const MedicoDiagnosticoPaciente = require('../modelos/AGIL/medico-diagnostico-paciente')(sequelize, Sequelize);
	const MedicoDiagnosticoResultado = require('../modelos/AGIL/medico-diagnostico-resultado')(sequelize, Sequelize);
	const MantenimientoOrdenTrabajo = require('../modelos/AGIL/mantenimiento-orden-trabajo')(sequelize, Sequelize);
	const MantenimientoOrdenTrabajoSistema = require('../modelos/AGIL/mantenimiento-orden-trabajo-sistema')(sequelize, Sequelize);
	const MantenimientoOrdenTrabajoManoObra = require('../modelos/AGIL/mantenimiento-orden-trabajo-mano-obra')(sequelize, Sequelize);
	const MantenimientoOrdenTrabajoServicioExterno = require('../modelos/AGIL/mantenimiento-orden-trabajo-servicio-externo')(sequelize, Sequelize);
	const MantenimientoOrdenTrabajoMaterial = require('../modelos/AGIL/mantenimiento-orden-trabajo-material')(sequelize, Sequelize);
	const MantenimientoEspecialidadPrecios = require('../modelos/AGIL/mantenimiento-especialidad-precios')(sequelize, Sequelize);
	const RrhhEmpleadoFicha = require('../modelos/AGIL/rrhh-empleado-ficha')(sequelize, Sequelize);
	const RrhhEmpleadoFichaFamiliar = require('../modelos/AGIL/rrhh-empleado-ficha-familiares')(sequelize, Sequelize);
	const RrhhEmpleadoFichaOtrosSeguros = require('../modelos/AGIL/rrhh-empleado-ficha-otros-seguros')(sequelize, Sequelize);
	const MedicoPacientePreRequisito = require('../modelos/AGIL/medico-paciente-prerequisito')(sequelize, Sequelize);
	const RrhhEmpleadoDiscapacidad = require('../modelos/AGIL/rrhh-empleado-discapacidad')(sequelize, Sequelize);
	const RrhhEmpleadoCargo = require('../modelos/AGIL/rrhh-empleado-cargo')(sequelize, Sequelize);
	const RrhhEmpleadoPrerequisitoCargo = require('../modelos/AGIL/rrhh-empleado-prerequisito-cargo')(sequelize, Sequelize);
	const ClienteRazon = require('../modelos/AGIL/cliente-razon')(sequelize, Sequelize);
	const GtmDestino = require('../modelos/AGIL/agil-gtm-destino')(sequelize, Sequelize);
	const GtmEstibaje = require('../modelos/AGIL/agil-gtm-estibaje')(sequelize, Sequelize);
	const GtmGrupoEstibaje = require('../modelos/AGIL/agil-gtm-grupo-estibaje')(sequelize, Sequelize);
	const GtmTransportista = require('../modelos/AGIL/agil-gtm-transportista')(sequelize, Sequelize);
	const GtmDespacho = require('../modelos/AGIL/agil-gtm-despacho')(sequelize, Sequelize);
	const GtmClienteDestino = require('../modelos/AGIL/agil-gtm-cliente-destino')(sequelize, Sequelize);
	const GtmDespachoDetalle = require('../modelos/AGIL/agil-gtm-despacho-detalle')(sequelize, Sequelize);
	const GtmVentaKardex = require('../modelos/AGIL/agil-gtm-venta-kardex')(sequelize, Sequelize);
	const GtmVentaKardexDetalle = require('../modelos/AGIL/agil-gtm-venta-kardex-detalle')(sequelize, Sequelize);
	const RrhhEmpleadoHojaVida = require('../modelos/AGIL/rrhh_empleado_hoja_vida')(sequelize, Sequelize);
	const RrhhEmpleadoFormacionAcademica = require('../modelos/AGIL/rrhh_empleado_formacion_academica')(sequelize, Sequelize);
	const RrhhEmpleadoExperienciaLaboral = require('../modelos/AGIL/rrhh_empleado_experiencia_laboral')(sequelize, Sequelize);
	const RrhhEmpleadoLogroInternoExterno = require('../modelos/AGIL/rrhh_empleado_logro_interno_externo')(sequelize, Sequelize);
	const RrhhEmpleadoCapacidadInternaExterna = require('../modelos/AGIL/rrhh_empleado_capacidad_interna_externa')(sequelize, Sequelize);
	const ContabilidadCuentaAuxiliar = require('../modelos/AGIL/contabilidad-cuenta-auxiliar')(sequelize, Sequelize);
	const RRHHParametros = require('../modelos/AGIL/rrhh-parametros')(sequelize, Sequelize);
	const RrhhParametrosAreasFrontera = require('../modelos/AGIL/rrhh-parametros-areas-frontera')(sequelize, Sequelize);
	const RrhhParametrosAreasHBD = require('../modelos/AGIL/rrhh-parametros-areas-hbd')(sequelize, Sequelize);
	const RrhhParametrosHorasExtrasCampo = require('../modelos/AGIL/rrhh-parametros-horas-extras-campo')(sequelize, Sequelize);
	const ConfiguracionCalificacionEvaluacionPolifuncional = require('../modelos/AGIL/configuracion-calificacion-evaluacion')(sequelize, Sequelize);
	const ConfiguracionDesempenioEvaluacionPolifuncional = require('../modelos/AGIL/configuracion-desempenio-evaluacion')(sequelize, Sequelize);
	const CuentaTransaccion = require('../modelos/AGIL/cuenta-transaccion')(sequelize, Sequelize);
	const TransaccionSeguimiento = require('../modelos/AGIL/transaccion-seguimiento')(sequelize, Sequelize)
	const ConfigMantenimiento = require('../modelos/AGIL/config-mantenimiento')(sequelize, Sequelize)
	const EvaluacionProveedor = require('../modelos/AGIL/evaluacion-proveedor')(sequelize, Sequelize)
	const EvaluacionProveedorCalificacion = require('../modelos/AGIL/evaluacion-proveedor-calificacion')(sequelize, Sequelize)
	const EvaluacionProveedorGeneral = require('../modelos/AGIL/evaluacion-general-proveedor')(sequelize, Sequelize)
	const DetalleEvaluacionProveedorGeneral = require('../modelos/AGIL/detalle-evaluacion-general-proveedor')(sequelize, Sequelize)
	const EvaluacionProveedorCalificacionGeneral = require('../modelos/AGIL/evaluacion-proveedor-calificacion-general')(sequelize, Sequelize)
	//entities INV
	const Inventario = require('../modelos/INV/inventario')(sequelize, Sequelize);
	const Movimiento = require('../modelos/INV/movimiento')(sequelize, Sequelize);
	const DetalleMovimiento = require('../modelos/INV/detalle-movimiento')(sequelize, Sequelize);
	const Compra = require('../modelos/INV/compra')(sequelize, Sequelize);
	const DetalleCompra = require('../modelos/INV/detalle-compra')(sequelize, Sequelize);
	const Venta = require('../modelos/INV/venta')(sequelize, Sequelize);
	const DetalleVenta = require('../modelos/INV/detalle-venta')(sequelize, Sequelize);
	const EntragaDetalleVentaCliente = require('../modelos/AGIL/entrega-detalle-venta-cliente')(sequelize, Sequelize);
	const DetalleVentaProductoFinal = require('../modelos/INV/detalle-venta-producto-final')(sequelize, Sequelize);
	const PagoVenta = require('../modelos/INV/pago-venta')(sequelize, Sequelize);
	const PagoCompra = require('../modelos/INV/pago-compra')(sequelize, Sequelize);
	const DetalleVentaNoConsolidada = require('../modelos/INV/detalle-venta-no-consolidada')(sequelize, Sequelize);
	const VentaReprogramacionPago = require('../modelos/INV/venta-reprogramacion-pago')(sequelize, Sequelize);
	const CompraReprogramacionPago = require('../modelos/INV/compra-reprogramacion-pago')(sequelize, Sequelize);
	const Cotizacion = require('../modelos/INV/cotizacion')(sequelize, Sequelize);
	const DetalleCotizacion = require('../modelos/INV/detalle-cotizacion')(sequelize, Sequelize);
	const VendedorVenta = require('../modelos/INV/vendedor-venta')(sequelize, Sequelize);
	const MeseroVenta = require('../modelos/AGIL/mesero-venta')(sequelize, Sequelize);
	const LiquidacionVentasMesa = require('../modelos/INV/liquidacion-ventas-mesa')(sequelize, Sequelize);
	const DetalleSolicitudProducto = require('../modelos/INV/detalle-solicitud-producto')(sequelize, Sequelize);
	const DetalleSolicitudProductoBase = require('../modelos/INV/detalle-solicitud-producto-base')(sequelize, Sequelize);
	const SolicitudReposicion = require('../modelos/INV/solicitud-reposicion')(sequelize, Sequelize);
	const Proforma = require('../modelos/AGIL/proforma')(sequelize, Sequelize);
	const ProformaContabilidad = require('../modelos/AGIL/proforma_contabilidad')(sequelize, Sequelize);
	const CierreMensualProforma = require('../modelos/AGIL/cierre-mensual-proforma')(sequelize, Sequelize);
	const DetallesProformas = require('../modelos/AGIL/detalles-proformas')(sequelize, Sequelize);
	const Servicios = require('../modelos/AGIL/servicios')(sequelize, Sequelize);
	const EvaluacionPolifuncional = require('../modelos/AGIL/evaluacion-polifuncional')(sequelize, Sequelize);
	const Farmacia = require('../modelos/INV/farmacia')(sequelize, Sequelize);

	const RrhhEmpresaCargaHorario = require('../modelos/AGIL/rrhh-empresa-carga-horario')(sequelize, Sequelize);
	const RrhhEmpleadoPrestamo = require('../modelos/AGIL/rrhh-empleado-prestamo')(sequelize, Sequelize);
	const RrhhEmpleadoRolTurno = require('../modelos/AGIL/rrhh-empleado-rol-turno')(sequelize, Sequelize);
	const RrhhEmpleadoPrestamoPago = require('../modelos/AGIL/rrhh-empleado-prestamo-pago')(sequelize, Sequelize);
	const RrhhEmpleadoHorasExtra = require('../modelos/AGIL/rrhh-empleado-horas-extra')(sequelize, Sequelize);
	const RRHHPlanillaSueldos = require('../modelos/AGIL/rrhh-planilla-sueldos')(sequelize, Sequelize);
	const RRHHDetallePlanillaSueldos = require('../modelos/AGIL/rrhh-detalle-planilla-sueldos')(sequelize, Sequelize);
	const RRHHPlanillaRcIva = require('../modelos/AGIL/rrhh-planilla-rc-iva')(sequelize, Sequelize);
	const RRHHDetallePlanillaRcIva = require('../modelos/AGIL/rrhh-detalle-planilla-rc-iva')(sequelize, Sequelize);
	const RrhhAnticipo = require('../modelos/AGIL/rrhh-empleado-anticipo')(sequelize, Sequelize);
	const RrhhEmpleadoAusencia = require('../modelos/AGIL/rrhh-empleado-ausencia')(sequelize, Sequelize);
	const RrhhEmpleadoVacaciones = require('../modelos/AGIL/rrhh-empleado-vacaciones')(sequelize, Sequelize);
	const RrhhEmpleadoSolicitudVacacion = require('../modelos/AGIL/rrhh-empleado-solicitud-vacacion')(sequelize, Sequelize);
	const RrhhEmpleadoCompensacionAusencia = require('../modelos/AGIL/rrhh-empleado-compensacion-ausencias')(sequelize, Sequelize);
	const RrhhFeriado = require('../modelos/AGIL/rrhh-feriados')(sequelize, Sequelize);
	const RrhhClaseAsuencia = require('../modelos/AGIL/rrhh-empleado-clase-ausencia')(sequelize, Sequelize);
	const RrhhEmpleadoConfiguracionVacacion = require('../modelos/AGIL/rrhh-empleado-configuracion_vacaciones')(sequelize, Sequelize);
	const RrhhEmpleadoHistorialVacacion = require('../modelos/AGIL/rrhh-empleado-historial_vacacion')(sequelize, Sequelize);
	const RrhhEmpleadoAnticipoTr3 = require('../modelos/AGIL/rrhh-empleado-anticipo-tr3')(sequelize, Sequelize);
	const RrhhEmpleadoPlanillaSueldoTr3 = require('../modelos/AGIL/rrhh-empleado-planilla-sueldo-tr3')(sequelize, Sequelize);
	const RrhhEmpleadoPlanillaAguinaldoTr3 = require('../modelos/AGIL/rrhh-empleado-planilla-aguinaldo-tr3')(sequelize, Sequelize);
	const RrhhEmpleadoTr3 = require('../modelos/AGIL/rrhh-empleado-tr3')(sequelize, Sequelize);
	const RrhhEmpleadoDeduccionIngreso = require('../modelos/AGIL/rrhh-empleado-deduccion-ingreso')(sequelize, Sequelize);
	const RrhhEmpleadoBeneficioSocial = require('../modelos/AGIL/rrhh-empleado-beneficio-social')(sequelize, Sequelize);
	const RrhhEmpleadoBitacoraFicha = require('../modelos/AGIL/rrhh-empleado-bitacora-ficha')(sequelize, Sequelize);
	const UsuarioGrupos = require('../modelos/SYS/usuario-grupos')(sequelize, Sequelize);
	const RrhhEmpleadoConfiguracionRopa = require('../modelos/AGIL/rrhh-empleado-configuracion-ropa')(sequelize, Sequelize);
	const RrhhEmpleadoDotacionRopaItem = require('../modelos/AGIL/rrhh-empleado-dotacion-ropa-item')(sequelize, Sequelize);
	const RrhhEmpleadoDotacionRopa = require('../modelos/AGIL/rrhh-empleado-dotacion-ropa')(sequelize, Sequelize);
	const RrhhViajeDetalle = require('../modelos/AGIL/rrhh-viaje-detalle')(sequelize, Sequelize);
	const RrhhViaje = require('../modelos/AGIL/rrhh-viaje')(sequelize, Sequelize);
	const RrhhViajeDestino = require('../modelos/AGIL/rrhh-viaje-destino')(sequelize, Sequelize);
	const RrhhViajeConductor = require('../modelos/AGIL/rrhh-viaje-conductor')(sequelize, Sequelize);
	const GtmDespachoDetalleResivo = require('../modelos/AGIL/agil-gtm-despacho-detalle-resivo')(sequelize, Sequelize);
	const Pedido = require('../modelos/AGIL/agil-pedidos')(sequelize, Sequelize);
	const DetallesPedido = require('../modelos/AGIL/agil-detalle-pedidos')(sequelize, Sequelize);
	const DetallePedidoEntrega = require('../modelos/AGIL/agil-detalle-pedido-entregas')(sequelize, Sequelize);
	const RrhhEmpleadoDescuentoVacacionHistorial = require('../modelos/AGIL/rrhh-empleado-descuento-vacacion-historial')(sequelize, Sequelize);
	const ClienteCentroCostos = require('../modelos/AGIL/cliente-centro-costos')(sequelize, Sequelize);
	const RrhhEmpleadoDocumentoFamiliar = require('../modelos/AGIL/rrhh-empleado-documento-familiar')(sequelize, Sequelize);
	const RRHHPlanillaCargasSociales = require('../modelos/AGIL/rrhh-planilla-cargas-sociales')(sequelize, Sequelize);
	const RRHHDetallePlanillaCargasSociales = require('../modelos/AGIL/rrhh-detalle-planilla-cargas-sociales')(sequelize, Sequelize);
	const RrhhEmpleadoHoraExtraOrdinaria = require('../modelos/AGIL/rrhh-empleado-hora-extra-ordinaria')(sequelize, Sequelize);
	const RrhhEmpleadoConfiguracionSubsidio = require('../modelos/AGIL/rrhh-empleado-configuracion-subsidio')(sequelize, Sequelize);
	const RrhhEmpleadoPlanificacionSubsidio = require('../modelos/AGIL/rrhh-empleado-planificacion-subsidio')(sequelize, Sequelize);
	const RrhhEmpleadoSeguimientoSubsidio = require('../modelos/AGIL/rrhh-empleado-seguimiento-subsidio')(sequelize, Sequelize);
	const RRHHPlanillaSubsidios = require('../modelos/AGIL/rrhh-planilla-subsidios')(sequelize, Sequelize);
	const RRHHDetallePlanillaSubsidios = require('../modelos/AGIL/rrhh-detalle-planilla-subsidios')(sequelize, Sequelize);
	// activos fijos
	const ActivosFijos = require('../modelos/AGIL/activos-fijos')(sequelize, Sequelize);
	const ActivosFijosValores = require('../modelos/AGIL/activos-fijos-valor')(sequelize, Sequelize);
	const ActivosFijosConfiguracion = require('../modelos/AGIL/activos-fijos-configuracion')(sequelize, Sequelize);
	//ESTADO FINANCIERO
	const EstadoFinancieroConfiguracionImpresion = require('../modelos/AGIL/estado-financiero-configuracion-impresion')(sequelize, Sequelize);
	const EstadoFinancieroGestion = require('../modelos/AGIL/estado-financiero-gestion')(sequelize, Sequelize);

	const CajaChica = require('../modelos/AGIL/caja-chica')(sequelize, Sequelize);
	const CajaChicaCentroCosto = require('../modelos/AGIL/caja-chica-centro-costo')(sequelize, Sequelize);
	const SolicitudCajaChica = require('../modelos/AGIL/solicitud-caja-chica')(sequelize, Sequelize);
	const ConceptoMovimientoCajaChica = require('../modelos/AGIL/concepto-movimiento-caja-chica')(sequelize, Sequelize);
	const CierreCajaChica = require('../modelos/AGIL/cierre-caja-chica')(sequelize, Sequelize);
	const ValeCajaChica = require('../modelos/AGIL/vale-caja-chica')(sequelize, Sequelize);
	const CajaChicaNivelGasto = require('../modelos/AGIL/caja-chica-nivel-gasto')(sequelize, Sequelize);
	const CajaChicaGasto = require('../modelos/AGIL/caja-chica-gasto')(sequelize, Sequelize);
	const CajaChicaRendicionFondo = require('../modelos/AGIL/caja-chica-rendicion-fondo')(sequelize, Sequelize);
	const CajaChicaDetalleRendicionFondo = require('../modelos/AGIL/caja-chica-detalle-rendicion-fondo')(sequelize, Sequelize);
	const CajaChicaDetalleRendicionFondoCentroCosto = require('../modelos/AGIL/caja-chica-detalle-rendicion-fondo-centro-costo')(sequelize, Sequelize);
	//Comensales cliente empresa.
	const AliasClienteEmpresa = require('../modelos/AGIL/comensales-cliente-empresa-alias')(sequelize, Sequelize);
	const ComensalesClienteEmpresa = require('../modelos/AGIL/comensales-cliente-empresa')(sequelize, Sequelize);
	const GerenciasClienteEmpresa = require('../modelos/AGIL/comensales-gerencias-cliente-empresa')(sequelize, Sequelize);
	const horarioComidasClienteEmpresa = require('../modelos/AGIL/comensales-horario-comidas-cliente-empresa')(sequelize, Sequelize);
	const PrecioComidasClienteEmpresa = require('../modelos/AGIL/comensales-precio-comida-cliente-empresa')(sequelize, Sequelize);
	const HistorialComidaClienteEmpresa = require('../modelos/AGIL/comensales-cliente-empresa-historial-comidas')(sequelize, Sequelize);
	const ComensalesMarcacionesClienteEmpresa = require('../modelos/AGIL/comensales-marcaciones-cliente-empresa')(sequelize, Sequelize);
	//servicios venta
	const ServicioVenta = require('../modelos/AGIL/servicio-venta')(sequelize, Sequelize);
	//configuracion plan cuenta
	const ContabilidadConfiguracionGeneralTipoCuenta = require('../modelos/AGIL/contabilidad-configuracion-general-tipo-cuenta')(sequelize, Sequelize);
	//integracion
	const EmpresaIntegracion = require('../modelos/SYS/integracion-aplicacion-empresa')(sequelize, Sequelize);
	const IntegracionAplicacion = require('../modelos/SYS/integracion-aplicacion')(sequelize, Sequelize);
	const ConfiguracionContableComprobante = require('../modelos/AGIL/configuracion-contable-comprobante')(sequelize, Sequelize);
	const ConfiguracionContableMovimientoCentroCosto = require('../modelos/AGIL/configuracion-contable-movimiento-centro-costo')(sequelize, Sequelize);
	const ConfiguracionContableMovimientoAuxiliar = require('../modelos/AGIL/configuracion-contable-movimiento-auxiliare')(sequelize, Sequelize);
	const VehiculoExterno = require('../modelos/AGIL/agil_vehiculos_externos.js')(sequelize, Sequelize);
	const InventarioRecepcion = require('../modelos/AGIL/agil_inventario_recepcion.js')(sequelize, Sequelize);

	const GestionOrdenReposicion = require('../modelos/AGIL/gestion-orden-reposicion')(sequelize, Sequelize);
	const GestionDetalleOrdenReposicion = require('../modelos/AGIL/gestion-detalle-orden-reposicion')(sequelize, Sequelize);
	const PagoOT = require('../modelos/INV/pago-ot')(sequelize, Sequelize);
	//Riesgo de cargos.
	const RiesgoCargo = require('../modelos/AGIL/rrhh-riesgo-cargo')(sequelize, Sequelize);
	const DetalleCalificacionProveedor = require('../modelos/AGIL/detalle_calificacion_proveedor')(sequelize, Sequelize);
	const ConfiguracionCalificacionProveedor = require('../modelos/AGIL/configuracion-calificacion-proveedor')(sequelize, Sequelize);
	const RrhhEmpleadoRolTurnoNoche = require('../modelos/AGIL/rrhh-empleado-rol-turno-noche')(sequelize, Sequelize);
	const DetalleComboVenta = require('../modelos/INV/detalle-combo-venta')(sequelize, Sequelize);
	const RrhhEmpleadoCampamentoEmpleado = require('../modelos/AGIL/rrhh-empleado-campamento-empleado')(sequelize, Sequelize);
	const ConfiguracionIso = require('../modelos/AGIL/agil-configuracion-iso')(sequelize, Sequelize);
	const ConfiguracionIsoEmpresa = require('../modelos/AGIL/agil-configuracion-iso-empresa')(sequelize, Sequelize);
	const ProformaFacturaAnulada = require('../modelos/AGIL/proformas-facturas-anuladas')(sequelize, Sequelize);
	const RrhhEmpleadoOtrosBonos = require('../modelos/AGIL/rrhh-empleado-otros-bonos')(sequelize, Sequelize);
	const DetalleVentaProductoDevolucion = require('../modelos/INV/detalle-venta-producto-devolucion')(sequelize, Sequelize);
	const DetalleVentaProductoReposicion = require('../modelos/INV/detalle-venta-producto-reposicion')(sequelize, Sequelize);

	const RRHHPlanillaAguinaldos = require('../modelos/AGIL/rrhh-planilla-aguinaldos')(sequelize, Sequelize);
	const RRHHDetallePlanillaAguinaldos = require('../modelos/AGIL/rrhh-detalle-planilla-aguinaldos')(sequelize, Sequelize);
	const RRHHAguinaldoPlanillaSueldo = require('../modelos/AGIL/rrhh-aguinaldo-planilla-sueldo')(sequelize, Sequelize);
	const RrhhEmpleadoLlamadaAtencion = require('../modelos/AGIL/rrhh-empleado-llamada-atencion')(sequelize, Sequelize);

	const AreaCostos = require('../modelos/AGIL/area-costos')(sequelize, Sequelize);
	const ComprobanteCentroCostos = require('../modelos/AGIL/comprobante-centro-costos')(sequelize, Sequelize);

	const CorrelativosEmpresa = require('../modelos/AGIL/correlativos-empresa')(sequelize, Sequelize);
	const OrdenServicio = require('../modelos/AGIL/orden-servicio/orden-servicio')(sequelize, Sequelize);
	const DetalleOrdenServicio = require('../modelos/AGIL/orden-servicio/detalle-orden-servicio')(sequelize, Sequelize);
	const DetalleTransaccion = require('../modelos/AGIL/cuenta-transaccion-detalle')(sequelize, Sequelize);
	const CorrelativoOt = require('../modelos/AGIL/agil-correlativos-ot')(sequelize, Sequelize);
	const DetalleOrdenServicioEntrega = require('../modelos/AGIL/agil-detalle-oden-servicio-entregas')(sequelize, Sequelize);
	const RRHHPlanillaIncrementos = require('../modelos/AGIL/rrhh-planilla-incrementos')(sequelize, Sequelize);
	const RRHHDetallePlanillaIncrementos = require('../modelos/AGIL/rrhh-detalle-planilla-incrementos')(sequelize, Sequelize);
	const TransporteRuta = require('../modelos/AGIL/agil_transporte_rutas')(sequelize, Sequelize);
	const Recibo = require('../modelos/AGIL/agil_transporte_recibo')(sequelize, Sequelize);
	const DetalleRecibo = require('../modelos/AGIL/agil_transporte_detalle_recibo')(sequelize, Sequelize);
	const Chofer = require('../modelos/AGIL/agil_transporte_chofer')(sequelize, Sequelize);
	const Telefono = require('../modelos/GRAL/telefono')(sequelize, Sequelize);

	const RRHHPlanillaRetroActivas = require('../modelos/AGIL/rrhh-planilla-retroactivas')(sequelize, Sequelize);
	const RRHHDetallePlanillaRetroActivas = require('../modelos/AGIL/rrhh-detalle-planilla-retroactivas')(sequelize, Sequelize);
	const ContabilidadCuentaGrupo = require('../modelos/AGIL/contabilidad-cuenta-grupo')(sequelize, Sequelize);
	const ContabilidadCuentaCampo = require('../modelos/AGIL/contabilidad-cuenta-campo')(sequelize, Sequelize);
	const CompraProgramacionPago = require('../modelos/INV/compra-programacion-pago')(sequelize, Sequelize);
	const DetalleCompraProgramacionPago = require('../modelos/INV/detalle-compra-programacion-pago')(sequelize, Sequelize);
	const ConfigAlertas = require('../modelos/AGIL/agil_config_alertas')(sequelize, Sequelize);
	const MedicoVacunaProducto = require('../modelos/AGIL/agil_medico_vacuna_producto')(sequelize, Sequelize);
	const ConfigVacunaProducto = require('../modelos/AGIL/agil_config_vacuna_producto')(sequelize, Sequelize);
	const Ambientes = require('../modelos/AGIL/ambientes')(sequelize, Sequelize);
	const EncargadoVenta = require('../modelos/AGIL/encargado_venta')(sequelize, Sequelize);
	const VentaAmbiente = require('../modelos/INV/venta-ambiente')(sequelize, Sequelize);
	const ComandaVenta = require('../modelos/INV/comanda-venta')(sequelize, Sequelize);
	const DetalleComanda = require('../modelos/INV/detalle-comanda')(sequelize, Sequelize);
	const GestionOrdenReposicionIso = require('../modelos/AGIL/gestion-orden-reposicion-iso')(sequelize, Sequelize);
	const GestionDetalleOrdenReposicionIso = require('../modelos/AGIL/gestion-detalle-orden-reposicion-iso')(sequelize, Sequelize);
	const ModelosCapacitacion = {
		Capacitacion: require('../modelos/AGIL/capacitacion/capacitacion')(sequelize, Sequelize),
		Calificacion: require('../modelos/AGIL/capacitacion/capacitacion-calificacion')(sequelize, Sequelize),
		DetalleCalificacion: require('../modelos/AGIL/capacitacion/capacitacion-detalle-calificacion')(sequelize, Sequelize),
		Certificado: require('../modelos/AGIL/capacitacion/capacitacion-certificado')(sequelize, Sequelize),
		Docente: require('../modelos/AGIL/capacitacion/capacitacion-docente')(sequelize, Sequelize),
		Empleado: require('../modelos/AGIL/capacitacion/capacitacion-empleado')(sequelize, Sequelize),
		Ponderacion: require('../modelos/AGIL/capacitacion/capacitacion-ponderacion')(sequelize, Sequelize)
	}
	const CuentasBancoProveedor = require('../modelos/AGIL/agil-cuentas-banco-proveedor')(sequelize, Sequelize);
	

	const ensureAuthorizedlogged = function authorize(req, res, next) {
		let bearerToken;
		if (req.headers["authorization"]) {
			let bearerHeader = req.headers["authorization"];
			try {
				let decodeInfo = jwt.decode(bearerHeader.split(' ')[1], Diccionario.ClaveSuperSecreta);
				if (decodeInfo) {
					sequelize.query('select token from sys_usuario where id = ' + decodeInfo.id, { type: sequelize.QueryTypes.SELECT })
						.then(function (usuario) {
							Usuario.find({ where: { id: decodeInfo.id, activo: true } }).then((usuarioEncontrado) => {
								if (usuarioEncontrado) {
									const fechaLogin = new Date().toISOString()
									const user = {
										id: usuarioEncontrado.id,
										id_persona: usuarioEncontrado.id_persona,
										id_empresa: usuarioEncontrado.id_empresa,
										nombre_usuario: usuarioEncontrado.nombre_usuario,
										activo: usuarioEncontrado.activo,
										fechaLogin: fechaLogin
									};
									const tokenUsuario = jwt.sign(user, Diccionario.ClaveSuperSecreta);
									res.set('Authorization', tokenUsuario);
									Usuario.update({
										token: fechaLogin,
									}, {
										where: {
											id: usuarioEncontrado.id
										}
									}).then((usuarioActualizado) => {
										res.set('Authorization', tokenUsuario);
										next();
									});

								} else {
									res.set('Authorization', 'invalid');
									return res.status(401).send({ message: 'No access' });
								}

							});
						}).catch(function (err) {
							return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
						})
				} else {
					return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
				}
			} catch (error) {
				return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
			}
		} else {
			return res.status(403).send({ message: 'Token invalido. ' + req.originalUrl })
		}
	}

	//*****RELATIONS*****
	require('../modelos/relaciones.js')(sequelize, Usuario, Persona, Rol, UsuarioRol, Tipo, Clase, Aplicacion, RolAplicacion,
		Empresa, Sucursal, UsuarioSucursal, Cliente, Proveedor, Producto, UsuarioAplicacion,
		Almacen, Dosificacion, SucursalActividadDosificacion, Inventario, Movimiento,
		Compra, DetalleMovimiento, DetalleCompra, Venta, DetalleVenta, ConfiguracionFactura,
		ConfiguracionGeneralFactura, PagoVenta, ConfiguracionVendedorApp, ConfiguracionGeneralApp,
		Ruta, RutaDia, RutaCliente, UsuarioRuta, ComisionVendedorProducto, DetalleVentaNoConsolidada,
		ProductoBase, ConfiguracionVentaVista, ConfiguracionCompraVista, CierreCaja, Banco, PagoCompra,
		CajaSiguienteTurno, VentaReprogramacionPago, CompraReprogramacionPago,
		MedicoPaciente, Garzon, GarzonPedidoRestaurante, PedidoRestaurante, MesaPedidoRestaurante,
		DetallePedidoRestaurante, CuentaRestaurante, Mesa, Sala, Cotizacion, DetalleCotizacion, ContabilidadCuenta, ClasificacionCuenta, ComprobanteContabilidad, AsientoContabilidad,
		ClienteCuenta, ProveedorCuenta, MedicoPrerequisito, ConfiguracionCuenta, MedicoVacuna, VacunaDosis, MedicoPacienteVacuna, MedicoPacienteVacunaDosis, VistaColumnasAplicacion, MedicoPacienteConsulta,
		MedicoPacienteFicha, MedicoLaboratorioExamen, MedicoLaboratorio, MedicoLaboratorioPaciente, MedicoLaboratorioResultado, MedicoDiagnostico, MedicoDiagnosticoExamen, MedicoDiagnosticoPaciente, MedicoDiagnosticoResultado,
		MantenimientoOrdenTrabajo, MantenimientoOrdenTrabajoManoObra, MantenimientoOrdenTrabajoMaterial, MantenimientoOrdenTrabajoServicioExterno, MantenimientoOrdenTrabajoSistema, VendedorVenta, RrhhEmpleadoFicha,
		RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, MedicoPacientePreRequisito, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo, ClienteRazon, GtmDestino, GtmEstibaje, GtmGrupoEstibaje, GtmTransportista, GtmDespacho, GtmClienteDestino,
		RrhhEmpleadoHojaVida, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, SolicitudReposicion, DetalleSolicitudProducto, DetalleSolicitudProductoBase, MonedaTipoCambio, ContabilidadCuentaAuxiliar, GtmDespachoDetalle, RrhhEmpleadoPrestamo, RrhhEmpleadoPrestamoPago, Proforma, DetallesProformas, Servicios, Farmacia, RRHHParametros, RrhhEmpleadoRolTurno, RrhhEmpleadoHorasExtra, RRHHPlanillaSueldos, RRHHDetallePlanillaSueldos, RrhhAnticipo, EvaluacionPolifuncional,
		RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhEmpleadoCompensacionAusencia, RrhhClaseAsuencia, RrhhEmpleadoHistorialVacacion, RrhhEmpleadoTr3, RrhhEmpleadoAnticipoTr3, RrhhEmpleadoDeduccionIngreso,
		RrhhEmpleadoBeneficioSocial, RrhhEmpleadoBitacoraFicha, UsuarioGrupos, RrhhEmpleadoConfiguracionRopa, GtmVentaKardex, GtmVentaKardexDetalle, RrhhEmpleadoDotacionRopaItem,
		RrhhEmpleadoDotacionRopa, RrhhViajeDetalle, RrhhViaje, RrhhViajeDestino, RrhhViajeConductor, TransaccionSeguimiento, CuentaTransaccion, GtmDespachoDetalleResivo, RRHHPlanillaRcIva, RRHHDetallePlanillaRcIva, EmpresaAplicacion, Pedido, DetallesPedido, RrhhEmpleadoDescuentoVacacionHistorial, ActivosFijos, ActivosFijosValores, ActivosFijosConfiguracion,
		EstadoFinancieroConfiguracionImpresion, EstadoFinancieroGestion, ClienteCentroCostos, CajaChica, SolicitudCajaChica, ConceptoMovimientoCajaChica, CierreCajaChica,
		AliasClienteEmpresa, ComensalesClienteEmpresa, GerenciasClienteEmpresa, horarioComidasClienteEmpresa, PrecioComidasClienteEmpresa, HistorialComidaClienteEmpresa, ServicioVenta, ComensalesMarcacionesClienteEmpresa, DetalleVentaProductoFinal, ProductoTipoPrecio, ProveedorAnticipo, ClienteAnticipo,
		ContabilidadConfiguracionGeneralTipoCuenta, RrhhEmpleadoPrerequisitoCargo, UsuarioAlerta, OpcionAplicacion, UsuarioAplicacionOpcion, ValeCajaChica, CajaChicaNivelGasto, CajaChicaGasto,
		CajaChicaRendicionFondo, CajaChicaDetalleRendicionFondo, CajaChicaDetalleRendicionFondoCentroCosto, CajaChicaCentroCosto, RrhhEmpresaCargaHorario, RrhhEmpleadoDocumentoFamiliar, RRHHPlanillaCargasSociales, RRHHDetallePlanillaCargasSociales, RrhhEmpleadoHoraExtraOrdinaria, EmpresaIntegracion, IntegracionAplicacion,
		ConfiguracionContableComprobante, ConfiguracionContableMovimientoCentroCosto, ConfiguracionContableMovimientoAuxiliar, AsientoContabilidadCentroCosto, VehiculoExterno, ProductoPromocion, GestionOrdenReposicion, GestionDetalleOrdenReposicion, InventarioRecepcion, MeseroVenta, LiquidacionVentasMesa, CierreCajaMesero,
		CajaSiguienteTurnoMesero, RrhhEmpleadoConfiguracionSubsidio, RrhhEmpleadoPlanificacionSubsidio, EntragaDetalleVentaCliente, MantenimientoEspecialidadPrecios, DetallePedidoEntrega, PagoOT, ProductoPromocionPuntaje, RiesgoCargo, DetalleCalificacionProveedor, RrhhEmpleadoRolTurnoNoche, RrhhEmpleadoCampamentoEmpleado, RrhhEmpleadoSeguimientoSubsidio,
		ProductoPrecioPorSucursal, RRHHPlanillaSubsidios, RRHHDetallePlanillaSubsidios, DetalleComboVenta, RrhhEmpleadoSolicitudVacacion, ConfiguracionIso, RrhhParametrosAreasFrontera, RrhhParametrosAreasHBD, RrhhParametrosHorasExtrasCampo, ProformaFacturaAnulada, RrhhEmpleadoPlanillaSueldoTr3, RrhhEmpleadoOtrosBonos,CierreMensualProforma,
		ProformaContabilidad, DetalleVentaProductoDevolucion, DetalleVentaProductoReposicion, RRHHPlanillaAguinaldos,RRHHDetallePlanillaAguinaldos,RRHHAguinaldoPlanillaSueldo, UsuarioAlmacen,RrhhEmpleadoLlamadaAtencion,CorrelativosEmpresa,AreaCostos,ComprobanteCentroCostos, OrdenServicio, DetalleOrdenServicio, DetalleTransaccion, CorrelativoOt,DetalleOrdenServicioEntrega,
		RRHHPlanillaIncrementos,RRHHDetallePlanillaIncrementos, Recibo, DetalleRecibo, Chofer, Telefono, TransporteRuta, RRHHPlanillaRetroActivas, RRHHDetallePlanillaRetroActivas,ContabilidadCuentaGrupo, ConfigMantenimiento,ConfiguracionCalificacionProveedor,EvaluacionProveedor,ConfiguracionIsoEmpresa,EvaluacionProveedorCalificacion,EvaluacionProveedorGeneral,
		DetalleEvaluacionProveedorGeneral,EvaluacionProveedorCalificacionGeneral,CompraProgramacionPago,DetalleCompraProgramacionPago, ConfigAlertas, MedicoVacunaProducto, ConfigVacunaProducto,ContabilidadCuentaCampo, Ambientes, EncargadoVenta,ProductoPadre, VentaAmbiente, ComandaVenta, DetalleComanda,RrhhEmpleadoPlanillaAguinaldoTr3, GestionOrdenReposicionIso, GestionDetalleOrdenReposicionIso, CuentasBancoProveedor, ModelosCapacitacion);
	//require('../sockets/pantallas.js')(io, socket);
	//*****ROUTES*****
	//SYS
	require('./rutas-usuarios')(router, ensureAuthorizedAdministrador, fs, decodeBase64Image, forEach, jwt, md5, Usuario, Persona, UsuarioRol, Rol, Tipo, Clase,
		Aplicacion, RolAplicacion, Empresa, UsuarioSucursal, Sucursal, UsuarioAplicacion, Almacen,
		SucursalActividadDosificacion, Dosificacion, UsuarioRuta, Ruta, VistaColumnasAplicacion, Diccionario, ComprobanteContabilidad, UsuarioGrupos, EmpresaAplicacion, sequelize, ensureAuthorizedlogged, UsuarioAlerta, OpcionAplicacion, UsuarioAplicacionOpcion, MedicoPaciente, UsuarioAlmacen);
	require('./rutas-roles')(router, Rol, RolAplicacion, Aplicacion, ensureAuthorizedlogged, OpcionAplicacion, UsuarioAplicacionOpcion);
	require('./rutas-tipos')(router, Tipo, Clase, Venta, DetalleVenta, Cliente, Almacen, Sucursal, Compra, DetalleCompra, Proveedor,
		Producto, Usuario, Movimiento, VentaReprogramacionPago, CompraReprogramacionPago, RrhhClaseAsuencia, sequelize, ensureAuthorizedlogged, CorrelativoOt, MantenimientoEspecialidadPrecios, CompraProgramacionPago, DetalleCompraProgramacionPago, CorrelativosEmpresa, AsientoContabilidad, ComprobanteContabilidad);
	require('./rutas-personas')(router, Persona, VendedorVenta, Venta, MeseroVenta, ensureAuthorizedlogged);

	//AGIL
	require('./rutas-empresas')(router, decodeBase64Image, fs, Empresa, Sucursal, Clase, Tipo, signs3, ConfiguracionVentaVista, ConfiguracionCompraVista, sequelize, EmpresaAplicacion, Aplicacion, Usuario, ensureAuthorizedlogged, EmpresaIntegracion,
		IntegracionAplicacion, UsuarioGrupos, OpcionAplicacion, CorrelativosEmpresa, ConfiguracionIsoEmpresa, axios, FormData, restApiSFE);
	require('./rutas-clientes')(router, forEach, decodeBase64Image, fs, Empresa, Cliente, RutaCliente, Venta, VentaReprogramacionPago, sequelize, ClienteRazon, GtmClienteDestino, GtmDestino, Clase, ClienteAnticipo, Sucursal, ensureAuthorizedlogged, EntragaDetalleVentaCliente);
	require('./rutas-proveedores')(router, sequelize, forEach, decodeBase64Image, fs, Empresa, Proveedor, Compra, CompraReprogramacionPago, Pedido, ProveedorAnticipo, Sucursal, ensureAuthorizedlogged, Producto,EvaluacionProveedor,DetalleCalificacionProveedor,Clase,DetalleCompra,ConfiguracionCalificacionProveedor,
		Persona,Usuario,MedicoPaciente,RrhhEmpleadoFicha,RrhhEmpleadoCargo,EvaluacionProveedorCalificacion,EvaluacionProveedorGeneral,DetalleEvaluacionProveedorGeneral,EvaluacionProveedorCalificacionGeneral,Tipo,Movimiento, CuentasBancoProveedor);
	require('./rutas-productos')(router, forEach, decodeBase64Image, fs, Empresa, Producto, Proveedor, Cliente, Clase, Inventario, ComisionVendedorProducto, Usuario,
		DetalleVenta, DetalleMovimiento, Movimiento, Venta, Compra, DetalleCompra, Almacen, Sucursal, signs3, Tipo, ProductoBase, sequelize, ContabilidadCuenta, UsuarioGrupos, ActivosFijos, ActivosFijosValores, ProductoTipoPrecio, Diccionario, ensureAuthorizedlogged, ProductoPromocion, ProductoPromocionPuntaje, ProductoPrecioPorSucursal,
		RrhhEmpleadoDotacionRopaItem, RrhhEmpleadoDotacionRopa, Persona, MedicoPaciente, VehiculoExterno, MantenimientoOrdenTrabajoMaterial, MantenimientoOrdenTrabajo,ProductoPadre,SolicitudReposicion);
	require('./rutas-sucursales')(router, forEach, decodeBase64Image, fs, Empresa, Sucursal, Almacen, Clase, SucursalActividadDosificacion, Dosificacion, schedule, ConfiguracionFactura, ensureAuthorizedlogged, ConfiguracionIso, sequelize, CorrelativoOt, Tipo, ContabilidadCuenta);
	require('./rutas-dosificaciones')(router, forEach, fs, sequelize, Empresa, Dosificacion, SucursalActividadDosificacion, Sucursal, Clase, ensureAuthorizedlogged);
	require('./rutas-pruebas-codigo-control')(router, fs, excelbuilder, CodigoControl, ensureAuthorizedlogged);
	require('./rutas-configuraciones-factura')(router, Sucursal, ConfiguracionFactura, Clase, ConfiguracionGeneralFactura, ensureAuthorizedlogged, Empresa);
	require('./rutas-configuraciones-app')(router, Usuario, ConfiguracionVendedorApp, Clase, ConfiguracionGeneralApp, Rol, UsuarioRol, Diccionario, Persona, ensureAuthorizedlogged);
	require('./rutas-reportes')(router, sequelize, Sequelize, Compra, Proveedor, Almacen, Sucursal, Empresa, Venta, Cliente, Movimiento, Clase,
		Inventario, Producto, DetalleVenta, DetalleCompra, Usuario, Diccionario, PagoVenta, Persona, VendedorVenta, UsuarioGrupos, ClienteAnticipo, ProveedorAnticipo, PagoCompra, MantenimientoOrdenTrabajo, PagoOT, ensureAuthorizedlogged, Tipo, SolicitudCajaChica, MedicoPaciente, RrhhEmpleadoFicha,
		ConceptoMovimientoCajaChica, CajaChica, CajaChicaRendicionFondo, RrhhViajeConductor, CajaChicaDetalleRendicionFondo, CajaChicaGasto, CajaChicaDetalleRendicionFondoCentroCosto, CajaChicaNivelGasto,
		AsientoContabilidad, ComprobanteContabilidad, CuentaTransaccion, Banco, DetalleTransaccion, Proforma, Cliente, DetallesProformas, Servicios);
	require('./rutas-rutas')(router, Ruta, RutaDia, RutaCliente, Clase, Cliente, Persona, UsuarioRuta, Usuario, Venta, Movimiento,
		DetalleVenta, Producto, DetalleVentaNoConsolidada, ensureAuthorizedlogged);
	require('./rutas-seguimiento-app')(router, UsuarioRuta, Ruta, Usuario, Persona, Venta, RutaDia, Clase, DetalleVenta, Producto, Cliente,
		RutaCliente, DetalleVentaNoConsolidada, ComisionVendedorProducto, PagoVenta, ensureAuthorizedlogged);
	require('./rutas-bancos')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Banco, Clase, ensureAuthorizedlogged,
		ContabilidadCuenta);
	require('./rutas-cierres-caja')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, CierreCaja, Clase, Sucursal, Usuario,
		Venta, DetalleVenta, Cliente, Almacen, Sucursal, PagoVenta, PagoCompra, Compra, Proveedor, sequelize, Banco, DetalleCompra,
		CajaSiguienteTurno, Diccionario, Producto, Inventario, Sequelize, ensureAuthorizedlogged, CierreCajaMesero, CajaSiguienteTurnoMesero);
	require('./rutas-contabilidad-cuenta')(router, ContabilidadCuenta, ClasificacionCuenta, Tipo, Clase, Usuario, Diccionario, ClienteCuenta, ProveedorCuenta, ConfiguracionCuenta, sequelize, Cliente, Proveedor, MedicoPaciente, Persona, ContabilidadConfiguracionGeneralTipoCuenta, ensureAuthorizedlogged, ContabilidadCuentaGrupo, AsientoContabilidad,
		ContabilidadCuentaCampo);
	require('./rutas-comprobante-contabilidad')(router, ComprobanteContabilidad, AsientoContabilidad, ContabilidadCuenta, ClasificacionCuenta, Sucursal, Clase, Usuario, Diccionario, Empresa, Persona, Compra, Venta, MonedaTipoCambio, NumeroLiteral, ContabilidadCuentaAuxiliar, Tipo, sequelize, ensureAuthorizedlogged, AsientoContabilidadCentroCosto,
		CierreCajaChica, Proveedor, ContabilidadConfiguracionGeneralTipoCuenta, Movimiento, Proforma, ProformaContabilidad, ProformaFacturaAnulada,
		RRHHPlanillaSueldos, RRHHPlanillaCargasSociales, RrhhAnticipo, RRHHDetallePlanillaSueldos, RRHHDetallePlanillaAguinaldos, AreaCostos, ComprobanteCentroCostos, SolicitudReposicion, MantenimientoOrdenTrabajo,
		RrhhEmpleadoDotacionRopa, CajaChica); //MonedaTipoCambio
	// require('./rutas-contabilidad-clasificacion-cuenta')(router,ClasificacionCuenta,tipo,Usuario,Diccionario);
	require('./rutas-gtm-estibajes')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmEstibaje, ensureAuthorizedlogged); //MonedaTipoCambio
	require('./rutas-gtm-destinos')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmDestino, Cliente, GtmClienteDestino, Clase, ensureAuthorizedlogged);
	require('./rutas-gtm-transportistas')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmTransportista, Persona, ensureAuthorizedlogged);
	require('./rutas-gtm-grupo-estibajes')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmGrupoEstibaje, ensureAuthorizedlogged);
	require('./rutas-gtm-despacho')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, GtmDespacho,
		GtmDespachoDetalle, Cliente, Usuario, GtmDestino, Producto, GtmTransportista, GtmEstibaje, GtmGrupoEstibaje,
		Persona, ClienteRazon, sequelize, Inventario, Movimiento, DetalleMovimiento, Tipo, Clase, Diccionario, Sequelize, Sucursal, GtmVentaKardex, GtmVentaKardexDetalle, GtmDespachoDetalleResivo, Banco, ensureAuthorizedlogged);
	require('./rutas-transacciones')(router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Banco, Clase, TransaccionSeguimiento, CuentaTransaccion, Cliente, ClienteRazon,
		MedicoPaciente, Persona, sequelize, Proveedor, ProveedorCuenta, Venta, Almacen, Sucursal, PagoVenta, PagoCompra, Compra, Proforma, ensureAuthorizedlogged, DetallesProformas, 
		Servicios, DetalleTransaccion, CorrelativosEmpresa,DetalleCompraProgramacionPago,CompraProgramacionPago, AsientoContabilidad, ComprobanteContabilidad, ContabilidadCuenta, 
		ClasificacionCuenta, ConfiguracionCuenta, ConfiguracionContableComprobante, EmpresaIntegracion, IntegracionAplicacion, Aplicacion, Tipo, ContabilidadCuentaAuxiliar, Usuario, Empresa, MonedaTipoCambio, Persona, ProformaContabilidad, nodemailer, jwt, Diccionario, CuentasBancoProveedor)



	//INV
	require('./rutas-inventario')(router, ensureAuthorized, forEach, Compra, DetalleCompra, Almacen, Sucursal, Empresa, sequelize, Sequelize,
		Tipo, Clase, Proveedor, Producto, Movimiento, DetalleMovimiento, Inventario, Venta, DetalleVenta,
		Cliente, CodigoControl, NumeroLiteral, Diccionario, SucursalActividadDosificacion, Dosificacion,
		ConfiguracionGeneralFactura, ConfiguracionFactura, PagoVenta, PagoCompra, Usuario, DetalleVentaNoConsolidada, ClienteCuenta, ContabilidadCuenta, ProveedorCuenta, UsuarioGrupos, Pedido, DetallesPedido, ProductoBase, ServicioVenta, DetalleVentaProductoFinal, ClienteAnticipo, ProveedorAnticipo, ensureAuthorizedlogged, nodemailer, jwt, CajaChica, MeseroVenta,
		LiquidacionVentasMesa, Persona, ProductoPromocion, EntragaDetalleVentaCliente, DetallePedidoEntrega, ProductoPromocionPuntaje, DetalleCalificacionProveedor, DetalleComboVenta,
		DetalleVentaProductoDevolucion, DetalleVentaProductoReposicion,
		GestionOrdenReposicion, ConfiguracionIso, OrdenServicio, DetalleOrdenServicio, DetalleOrdenServicioEntrega, ConfiguracionCalificacionProveedor, UsuarioSucursal, SolicitudReposicion, ProductoTipoPrecio);
	require('./rutas-salidas')(router, forEach, decodeBase64Image, fs, Empresa, Producto, Proveedor, Cliente, Clase, Inventario, ComisionVendedorProducto, Usuario,
		DetalleVenta, DetalleMovimiento, Movimiento, Venta, Compra, DetalleCompra, Almacen, Sucursal, signs3, Tipo, VentaReprogramacionPago, UsuarioGrupos, ProductoBase, ProductoTipoPrecio, ensureAuthorizedlogged, ProductoPromocionPuntaje, ProductoPrecioPorSucursal, sequelize, SolicitudReposicion, DetalleSolicitudProducto);

	require('./rutas-mesa')(router, forEach, fs, sequelize, Empresa, Dosificacion, SucursalActividadDosificacion,
		Sucursal, Clase, Mesa, Sala, PedidoRestaurante, MesaPedidoRestaurante, DetallePedidoRestaurante,
		Producto, Inventario, Tipo, Movimiento, DetalleMovimiento, Garzon, Persona, decodeBase64Image,
		GarzonPedidoRestaurante, ensureAuthorizedlogged);

	require('./rutas-cotizacion')(router, sequelize, Sequelize, Cotizacion, DetalleCotizacion, Usuario, Producto, Diccionario, Clase, ConfiguracionGeneralFactura, ConfiguracionFactura, Sucursal, Cliente, Almacen, NumeroLiteral, Inventario, Movimiento, DetalleMovimiento, Tipo, ProductoBase, Persona, ensureAuthorizedlogged)
	require('./rutas-paciente')(router, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, MedicoPrerequisito, Clase, Diccionario, Tipo, decodeBase64Image, fs, MedicoVacuna, VacunaDosis, MedicoPacienteVacuna, MedicoPacienteVacunaDosis, MedicoPacienteConsulta, MedicoPacienteFicha, sequelize, Sequelize, MedicoLaboratorioExamen, MedicoLaboratorio, MedicoLaboratorioPaciente, MedicoLaboratorioResultado, MedicoLaboratorioResultado, MedicoDiagnostico, MedicoDiagnosticoExamen, MedicoDiagnosticoPaciente, MedicoDiagnosticoResultado, MedicoPacientePreRequisito, RrhhEmpleadoCargo, RrhhEmpleadoFicha, RrhhEmpleadoPrerequisitoCargo, ensureAuthorizedlogged, RiesgoCargo, ConfiguracionIso, ConfigAlertas, MedicoVacunaProducto, ConfigVacunaProducto, Producto, DetalleMovimiento, Movimiento)
	require('./rutas-farmacia')(router, sequelize, Sequelize, Usuario, Farmacia, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, Movimiento, SucursalActividadDosificacion, CodigoControl, NumeroLiteral, Dosificacion, Venta, DetalleVenta, Producto, Cliente, Almacen, MedicoPaciente, RrhhEmpleadoCargo, Inventario, ConfiguracionGeneralFactura, DetalleMovimiento, ConfiguracionFactura, RrhhEmpleadoFicha, decodeBase64Image, fs, ensureAuthorizedlogged);

	//Mantenimiento Vehiculos
	require('./rutas-maquinaria')(router, sequelize, Sequelize, Usuario, Producto, Diccionario, Clase, Sucursal, Empresa, ProductoBase, Almacen, ContabilidadCuenta, Persona, MantenimientoOrdenTrabajo, MantenimientoOrdenTrabajoManoObra,
		MantenimientoOrdenTrabajoMaterial, MantenimientoOrdenTrabajoServicioExterno, MantenimientoOrdenTrabajoSistema,
		Inventario, Clase, ensureAuthorizedlogged, VehiculoExterno, Cliente, InventarioRecepcion, MedicoPaciente, Proveedor, MantenimientoEspecialidadPrecios, Tipo, Movimiento, DetalleMovimiento, NumeroLiteral, PagoOT, CorrelativoOt, ContabilidadCuentaGrupo, ConfigMantenimiento,ContabilidadCuentaCampo)

	require('./rutas-recursos-humanos')(router, sequelize, Sequelize, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, decodeBase64Image, fs, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad, RrhhEmpleadoCargo,
		RrhhEmpleadoHojaVida, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, NumeroLiteral, RrhhEmpleadoPrestamo, RrhhEmpleadoPrestamoPago, RrhhEmpleadoRolTurno, RrhhEmpleadoHorasExtra, RrhhAnticipo, EvaluacionPolifuncional, ConfiguracionCalificacionEvaluacionPolifuncional, ConfiguracionDesempenioEvaluacionPolifuncional, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhEmpleadoCompensacionAusencia,
		RrhhFeriado, RrhhClaseAsuencia, RrhhEmpleadoConfiguracionVacacion, RrhhEmpleadoHistorialVacacion, RrhhEmpleadoTr3, RrhhEmpleadoAnticipoTr3, Banco, RrhhEmpleadoDeduccionIngreso,
		RrhhEmpleadoBeneficioSocial, RrhhEmpleadoBitacoraFicha, RrhhEmpleadoConfiguracionRopa, Producto, Inventario, RrhhEmpleadoDotacionRopaItem,
		RrhhEmpleadoDotacionRopa, RrhhViajeDetalle, RrhhViaje, RrhhViajeDestino, RrhhViajeConductor, Movimiento, DetalleMovimiento, Almacen, RrhhEmpleadoDescuentoVacacionHistorial, RrhhEmpleadoPrerequisitoCargo, MedicoPrerequisito, ensureAuthorizedlogged, RrhhEmpresaCargaHorario, RrhhEmpleadoDocumentoFamiliar, RrhhEmpleadoHoraExtraOrdinaria,
		MedicoPacienteFicha, RRHHDetallePlanillaSueldos, MedicoPacientePreRequisito, RrhhEmpleadoConfiguracionSubsidio, RRHHParametros, RrhhEmpleadoRolTurnoNoche, RrhhEmpleadoPlanificacionSubsidio,
		RrhhEmpleadoCampamentoEmpleado, RrhhEmpleadoSeguimientoSubsidio, RrhhEmpleadoSolicitudVacacion, RrhhEmpleadoOtrosBonos, RrhhEmpleadoLlamadaAtencion, ConfiguracionIso, CorrelativosEmpresa, ContabilidadCuenta, ConfiguracionIsoEmpresa)

	require('./rutas-recursos-humanos-app')(router, sequelize, Sequelize, Usuario, MedicoPaciente, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, decodeBase64Image, fs, RrhhEmpleadoFicha, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoDiscapacidad
		, RrhhEmpleadoCargo, RrhhEmpleadoHojaVida, RrhhEmpleadoFormacionAcademica, RrhhEmpleadoExperienciaLaboral, RrhhEmpleadoLogroInternoExterno, RrhhEmpleadoCapacidadInternaExterna, NumeroLiteral, RrhhEmpleadoPrestamo, RrhhEmpleadoPrestamoPago, RrhhEmpleadoRolTurno, RrhhEmpleadoHorasExtra, RrhhAnticipo,
		EvaluacionPolifuncional, ConfiguracionCalificacionEvaluacionPolifuncional, ConfiguracionDesempenioEvaluacionPolifuncional, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhEmpleadoCompensacionAusencia, RrhhFeriado, RrhhClaseAsuencia, RrhhEmpleadoConfiguracionVacacion, RrhhEmpleadoHistorialVacacion, RrhhEmpleadoTr3, RrhhEmpleadoAnticipoTr3, Banco, RrhhEmpleadoDeduccionIngreso,
		RrhhEmpleadoBeneficioSocial, RrhhEmpleadoBitacoraFicha, RrhhEmpleadoConfiguracionRopa, Producto, Inventario, RrhhEmpleadoDotacionRopaItem, RrhhEmpleadoDotacionRopa, RrhhViajeDetalle, RrhhViaje, RrhhViajeDestino, RrhhViajeConductor, Movimiento, DetalleMovimiento, Almacen, RrhhEmpleadoDescuentoVacacionHistorial, RrhhEmpleadoPrerequisitoCargo, MedicoPrerequisito, ensureAuthorizedlogged, RrhhEmpresaCargaHorario, RrhhEmpleadoSolicitudVacacion)

	require('./rutas-planillas')(router, sequelize, Sequelize, Usuario, RRHHParametros, Persona, Empresa, Sucursal, Clase, Diccionario, Tipo, RrhhEmpleadoFicha, RrhhEmpleadoCargo, MedicoPaciente, RrhhEmpleadoDiscapacidad, RrhhEmpleadoFichaOtrosSeguros, RrhhEmpleadoFichaFamiliar, RrhhEmpleadoHorasExtra, RRHHPlanillaSueldos, RRHHDetallePlanillaSueldos, RrhhEmpleadoPrestamo,
		RRHHPlanillaRcIva, RRHHDetallePlanillaRcIva, RrhhAnticipo, RrhhEmpleadoRolTurno, RrhhEmpleadoAusencia, RrhhEmpleadoVacaciones, RrhhClaseAsuencia, decodeBase64Image, fs, RRHHPlanillaCargasSociales, RRHHDetallePlanillaCargasSociales, RrhhEmpleadoHoraExtraOrdinaria, RrhhEmpleadoConfiguracionSubsidio, RrhhEmpleadoPlanificacionSubsidio, RrhhEmpleadoSeguimientoSubsidio,
		RRHHPlanillaSubsidios, RRHHDetallePlanillaSubsidios, ensureAuthorizedlogged, RrhhParametrosAreasFrontera, RrhhParametrosAreasHBD, RrhhEmpresaCargaHorario, RrhhEmpleadoBeneficioSocial, RrhhParametrosHorasExtrasCampo, RrhhEmpleadoRolTurnoNoche, RrhhEmpleadoTr3, RrhhEmpleadoPlanillaSueldoTr3, Banco,
		RRHHPlanillaAguinaldos, RRHHDetallePlanillaAguinaldos, RRHHAguinaldoPlanillaSueldo, RRHHPlanillaIncrementos, RRHHDetallePlanillaIncrementos, NumeroLiteral, RRHHPlanillaRetroActivas, RRHHDetallePlanillaRetroActivas, RrhhEmpleadoPlanillaAguinaldoTr3)

	require('./rutas-operaciones')(router, sequelize, Sequelize, Usuario, Producto, Diccionario, Clase, Sucursal, Empresa, ProductoBase, Almacen,
		Inventario, SolicitudReposicion, DetalleSolicitudProducto, DetalleSolicitudProductoBase, Persona, UsuarioGrupos, Tipo, Movimiento, DetalleMovimiento, Proveedor, ensureAuthorizedlogged, GestionDetalleOrdenReposicion, GestionOrdenReposicion, MedicoPaciente, ConfiguracionIso, ContabilidadCuenta, ContabilidadCuentaGrupo, ContabilidadCuentaCampo, GestionOrdenReposicionIso, GestionDetalleOrdenReposicionIso)
	require('./rutas-proformas')(router, sequelize, Sequelize, Usuario, Cliente, Proforma, DetallesProformas, Servicios, Clase, Sucursal, SucursalActividadDosificacion, Dosificacion,
		CodigoControl, NumeroLiteral, Empresa, ConfiguracionGeneralFactura, Tipo, UsuarioSucursal, Almacen, Venta, DetalleVenta, ConfiguracionGeneralFactura, ConfiguracionFactura, Movimiento, ClienteCentroCostos, MonedaTipoCambio, ensureAuthorizedlogged,
		MedicoPaciente, RrhhEmpleadoFicha, RRHHDetallePlanillaSueldos, RRHHPlanillaSueldos, ProformaFacturaAnulada, ContabilidadCuenta, CierreMensualProforma, AsientoContabilidad, ProformaContabilidad, UsuarioAlmacen)
	require('./rutas-pedidos')(router, sequelize, Sequelize, Usuario, Cliente, Proforma, DetallesProformas, Servicios, Clase, Sucursal, SucursalActividadDosificacion, Dosificacion,
		Empresa, Tipo, UsuarioSucursal, Almacen, Venta, DetalleVenta, Pedido, DetallesPedido, SolicitudReposicion, DetalleSolicitudProducto, DetalleSolicitudProductoBase, Proveedor, Persona,
		Compra, Movimiento, Inventario, DetalleCompra, DetalleMovimiento, ensureAuthorizedlogged, GestionDetalleOrdenReposicion, GestionOrdenReposicion, Producto, UsuarioAlmacen, ConfiguracionIso)

	require('./rutas-activos-fijos')(router, sequelize, Sequelize, Usuario, ActivosFijos, ActivosFijosValores, ActivosFijosConfiguracion, Clase, Producto, Inventario, MonedaTipoCambio, ensureAuthorizedlogged)
	require('./rutas-estados-financieros')(router, sequelize, Sequelize, EstadoFinancieroConfiguracionImpresion, EstadoFinancieroGestion, Tipo, Clase, ProveedorCuenta
		, Proveedor, ClienteCuenta, Cliente, ClasificacionCuenta, ContabilidadCuenta, AsientoContabilidad, ComprobanteContabilidad, MonedaTipoCambio, ContabilidadCuentaAuxiliar, Usuario,
		Persona, Sucursal, Empresa, NumeroLiteral, ensureAuthorizedlogged)
	require('./rutas-solicitud-caja-chica')(router, sequelize, Sequelize, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Tipo, Clase, CajaChica, SolicitudCajaChica, Empresa, ConceptoMovimientoCajaChica, MedicoPaciente, Usuario, Persona, ContabilidadCuenta,
		Movimiento, Proveedor, Compra, Sucursal, CierreCajaChica, DetalleCompra, Producto, ensureAuthorizedlogged, RrhhEmpleadoFicha, ValeCajaChica, CajaChicaNivelGasto, CajaChicaGasto, CajaChicaRendicionFondo, CajaChicaDetalleRendicionFondo, CajaChicaDetalleRendicionFondoCentroCosto,
		RrhhViajeConductor, CajaChicaCentroCosto, RrhhAnticipo, ConfiguracionContableComprobante, ConfiguracionContableMovimientoCentroCosto, ConfiguracionContableMovimientoAuxiliar,
		EmpresaIntegracion, IntegracionAplicacion, Aplicacion,DetalleMovimiento)
	require('./rutas-comensales')(router, sequelize, Sequelize, Persona, Cliente, AliasClienteEmpresa, ComensalesClienteEmpresa, GerenciasClienteEmpresa, horarioComidasClienteEmpresa, PrecioComidasClienteEmpresa, HistorialComidaClienteEmpresa, Usuario, ComensalesMarcacionesClienteEmpresa, ensureAuthorizedlogged)
	require('./rutas-estado-evolucion-patrimonio-neto')(router, sequelize, Sequelize, EstadoFinancieroConfiguracionImpresion, EstadoFinancieroGestion, Tipo, Clase, ProveedorCuenta
		, Proveedor, ClienteCuenta, Cliente, ClasificacionCuenta, ContabilidadCuenta, AsientoContabilidad, ComprobanteContabilidad, MonedaTipoCambio, ensureAuthorizedlogged)
	require('./rutas-balance-comp-suma-saldo')(router, sequelize, Sequelize, EstadoFinancieroConfiguracionImpresion, EstadoFinancieroGestion, Tipo, Clase, ProveedorCuenta
		, Proveedor, ClienteCuenta, Cliente, ClasificacionCuenta, ContabilidadCuenta, AsientoContabilidad, ComprobanteContabilidad, MonedaTipoCambio, ensureAuthorizedlogged)

	require('./rutas-app-producto-inventrario')(router, ensureAuthorized, forEach, Compra, DetalleCompra, Almacen, Sucursal, Empresa, sequelize, Sequelize,
		Tipo, Clase, Proveedor, Producto, Movimiento, DetalleMovimiento, Inventario, Venta, DetalleVenta,
		Cliente, CodigoControl, NumeroLiteral, Diccionario, SucursalActividadDosificacion, Dosificacion,
		ConfiguracionGeneralFactura, ConfiguracionFactura, PagoVenta, PagoCompra, Usuario, DetalleVentaNoConsolidada, ClienteCuenta, ContabilidadCuenta, ProveedorCuenta, UsuarioGrupos, Pedido, DetallesPedido, ProductoBase, ServicioVenta, DetalleVentaProductoFinal, ClienteAnticipo, ProveedorAnticipo, ensureAuthorizedlogged, nodemailer, jwt, CajaChica)

	require('./rutas-orden-servicio')(router, sequelize, Sequelize, Usuario, Cliente, Clase, Sucursal, SucursalActividadDosificacion, Dosificacion,
		Empresa, Tipo, OrdenServicio, Proveedor, Persona, ensureAuthorizedlogged, ConfiguracionIso, DetalleOrdenServicio, Almacen)
	require('./rutas-transporte')(router, sequelize, Sequelize, Usuario, Tipo, Clase, Empresa, Persona, ensureAuthorizedlogged, Recibo, DetalleRecibo, Chofer, Telefono, VehiculoExterno, Banco, TransporteRuta, UsuarioSucursal, Sucursal)
	require('./rutas-balnearios')(router, sequelize, Sequelize, Usuario, Tipo, Clase, Empresa, Persona, ensureAuthorizedlogged, Sucursal, Ambientes, EncargadoVenta, Producto, VentaAmbiente, Inventario, Movimiento, DetalleMovimiento, SucursalActividadDosificacion, Cliente, Venta, DetalleVenta, Dosificacion, ConfiguracionGeneralFactura, ConfiguracionFactura, EntragaDetalleVentaCliente, DetalleComboVenta, DetalleVentaProductoFinal, Diccionario, CodigoControl, NumeroLiteral, ComandaVenta, DetalleComanda)
	require('./rutas-capacitacion')(router, sequelize, Sequelize,
		fs,ensureAuthorizedlogged,decodeBase64Image ,Usuario,Clase,MedicoPaciente,Persona,Empresa,RrhhEmpleadoFicha,ModelosCapacitacion)
	router.route('/test')
		.get(function (req, res) {
			var rest;
			for (var i = 5000.36; i <= 6532; i++) {
				rest = NumeroLiteral.prueba(parseFloat(i).toString());
			}
			res.json({ rest: rest });
		});
}