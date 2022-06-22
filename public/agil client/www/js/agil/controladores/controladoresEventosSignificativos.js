angular.module('agil.controladores')

.controller('controladoresEventosSignificativos', 
['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','SweetAlert', 'Paginator', 'FieldViewer', 'ObtenerListaEventoCufd', 'ObtenerListaEventos', 'GuardarNuevoEvento', 'ObtenerListaEventosPaginado', 'ObtenerActividadesEconomicas', 'ObtenerTiposMetodoPago', 'ObtenerTiposMoneda', 'ObtenerLeyendas', 'ObtenerDocumentosSector', 'ObtenerTiposEmision', 'ObtenerTiposFactura', 'BuscarClientes', 'ObtenerTiposIdentidad', 'GuardarNuevoCliente', 'BuscarProductos', 'ValidarFactura', 'RecepcionEventoSignificativo','EmisionPaquetes', 
function($scope, $localStorage, $location, $templateCache, $route, blockUI, $timeout, SweetAlert, Paginator, FieldViewer, ObtenerListaEventoCufd, ObtenerListaEventos, GuardarNuevoEvento, ObtenerListaEventosPaginado, ObtenerActividadesEconomicas,ObtenerTiposMetodoPago, ObtenerTiposMoneda, ObtenerLeyendas, ObtenerDocumentosSector, ObtenerTiposEmision, ObtenerTiposFactura, BuscarClientes, ObtenerTiposIdentidad, GuardarNuevoCliente, BuscarProductos, ValidarFactura, RecepcionEventoSignificativo, EmisionPaquetes ){
    blockUI.start();
    $scope.usuario=JSON.parse($localStorage.usuario);
    $scope.idModalNuevoEvento = 'dialog-nuevo-evento';
    $scope.idModalRecepcionFacturas = 'dialog-recepcion-facturas';
    $scope.idModalNuevaFactura = 'dialog-nueva-factura';
    $scope.idModalNuevoCliente = 'dialog-nuevo-cliente-facturacion';
    $scope.$on('$viewContentLoaded', function () {
        ejecutarScriptsEventosSignificativos($scope.idModalNuevoEvento,  $scope.idModalRecepcionFacturas, $scope.idModalNuevaFactura, $scope.idModalNuevoCliente);
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        $scope.configurarColumnasListaEventos();
        blockUI.stop();
    });
	
	$scope.inicio=function(){
        $scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario )
        $scope.verFiltros = false;
        let hoy = new Date()
        $scope.filtro = {
            desde: fechaATexto(hoy.setDate(hoy.getDate() - 7)),
            hasta: fechaATexto(new Date()),
            tipo: 0,
            cufd: 0,
            codigo: 0,
            estado: 0
        }
        $scope.cargarEventos();
        $scope.obtenerTiposFact()
        blockUI.stop();
	}
    $scope.obtenerTiposFact = async () => {
        let fact = await getTiposFactura($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
        if( fact.error ) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS DE FACTURAS</br>"+fact.message, "error");
        $scope.tiposFacturas = fact.data;
        
        let sect = await getDocumentosSector($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
        if( sect.error ) return SweetAlert.swal("", "ERROR AL OBTENER DOCUMENTOS SECTOR</br>"+sect.message, "error");
        $scope.documentosSector = sect.data;
    }
    // INICIO RECIBOS

    //Carga lista de eventos
    $scope.cargarEventos = () => {
        $scope.paginator = Paginator ();
        $scope.paginator.column = 'createdAt'
        $scope.paginator.direction = "desc";
        $scope.paginator.itemsPerPage = 10;
        $scope.paginator.filter = $scope.filtro
        $scope.paginator.callBack = $scope.obtenerEventos;
        $scope.paginator.getSearch("", null, null);
    }
    $scope.obtenerEventos = async () => {
        let { error, message, data, paginas } = await ObtenerListaEventosPaginado($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0, $scope.paginator)
        if(error) return console.error(message);
        console.log(data);
        $scope.paginator.setPages(paginas)
        $scope.eventos = data;
    }
    //Obtiene Tipos de Eventos
    $scope.obtenerTiposEventos = async () => {
        return new Promise( async ( resolve, reject) => {
            let { error, message, data } = await ObtenerListaEventos($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0 )
            if( error ) return resolve({ error, message: "<b>ERROR AL OBTENER CUFDs</b></br>"+message })
            return resolve({ error, data })
        })
    }
    // Obtiene Lista CUFDs
    $scope.obtenerListaCufd = async () => {
        return new Promise( async( resolve, reject) => {
            let { error, message, data } = await ObtenerListaEventoCufd($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0 )
            if( error ) return resolve({ error, message: "<b>ERROR AL OBTENER CUFDs</b></br>"+message })
            return resolve({ error, data })
        });
    }
    //Abre modal nuevo Evento
	$scope.abrirDialogNuevoEvento = async () => {
        try {
            $scope.nuevoEvento = {  }
            let tiposEvento = await $scope.obtenerTiposEventos();
            if(tiposEvento.error) return SweetAlert.swal("", tiposEvento.message, "error")
            $scope.tiposEvento = tiposEvento.data;
            $scope.nuevoEvento.tipoEvento=$scope.tiposEvento[0];
            let listaCufds = await $scope.obtenerListaCufd();
            if(listaCufds.error) return SweetAlert.swal("", listaCufds.message, "error")
            $scope.cufds = listaCufds.data
            $scope.nuevoEvento.cufdEvento=$scope.cufds[0];
            abrirPopup($scope.idModalNuevoEvento); 
        } catch (e) {
           SweetAlert.swal("","<b>Ocurrió un error</b></br>"+ e) 
        }       
        
    }
    //cierra modal Evento
    $scope.cerrarDialogNuevoEvento = () => {
        $scope.nuevoEvento = {}
        $scope.cerrarPopup($scope.idModalNuevoEvento);
    }
    // Guarda el nuevo evento
    $scope.guardarEvento = async () => {
        let { error, message } = await GuardarNuevoEvento( $scope.sucursalUsuario, $scope.nuevoEvento );
        if(error) return SweetAlert.swal("",message, "error")
        $scope.obtenerEventos();
        $scope.cerrarDialogNuevoEvento();
        SweetAlert.swal("","<b>EVENTO GUARDADO</b>", "success")
    }
    // Mostrar detalle evento
    $scope.verRegistroEvento = ( evento) => {
        if(!evento) console.error('No existe evento');
        SweetAlert.swal({
            html:`
            <div class="small">
                <h5 class="smaller bolder">${ evento.tipo }</h5>
                <h6 class="smaller bolder"> CÓDIGO: ${ evento.codigoRecepcion }</h6>
                <div class="row">
                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">FECHA</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small>${ $scope.formatoFechaHora(evento.fecha) }</small></p></div>

                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">INICIO</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small>${ $scope.formatoFechaHora(evento.inicio) }</small></p></div>

                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">FIN</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small>${ $scope.formatoFechaHora(evento.fin) }</small></p></div>
                    
                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">CUFD</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small class="smaller"><small><small>${ evento.cufd }</small></small></small></p></div>
                    
                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">CUFD EVENTO</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small class="smaller"><small><small>${ evento.cufdEvento }</small></small></small></p></div>

                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">SUCURSAL</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small>${ evento.sucursal  }</small></p></div>

                    <div class="col-xs-6 col-sm-4"><p class="small bolder text-left">ESTADO</p></div>
                    <div class="col-xs-6 col-sm-8"><p class="small text-left"><small>${ evento.estado }</small></p></div>
                </div>
            </div>`,
            showConfirmButton: false
        })
    }
    // configura las columnas de la tabla de Eventos
    $scope.configurarColumnasListaEventos = () => {
        $scope.fieldViewer = FieldViewer({
            crear: false,
            id_empresa: $scope.usuario.id_empresa,
            configuracion: {
                fecha: { value: "Fecha", show: true },
                tipo: { value: "Evento", show: true },
                codigo: { value: "Código", show: true },
                inicio: { value: "Inicio", show: true },
                fin: { value: "Fin", show: true },
                sucursal: { value: "Sucursal", show: true },
                estado: { value: "Estado", show: true }
            }
        }, $scope.aplicacion.aplicacion.id);
        $scope.fieldViewer.updateObject();
    }
    $scope.abrirRecepcionFacturas = async (evento) => {
        $scope.evento = evento;
        $scope.evento.facturas = []
        console.log(evento);
        $scope.abrirPopup($scope.idModalRecepcionFacturas);
    }

    // Abre modal nuevo Evento
	$scope.abrirDialogNuevaFactura = async (evento) => {
        $scope.verDescuentos = false;
        try {
            $scope.nuevaFactura = {
                cambio: 0,
                sucursal: $scope.sucursalUsuario,
                vendedor: $scope.usuario,
            }
            $scope.item = {}
            $scope.items = []
            let act = await getActividadesEconomicas($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id );
            if( act.error ) return SweetAlert.swal("", "ERROR AL OBTENER ACTIVIDADES</br>"+act.message, "error")
            $scope.actividades = act.data;
            if( $scope.actividades.length == 1 ){
                $scope.nuevaFactura.actividadEconomica = $scope.actividades[0];
            }else{
                $scope.nuevaFactura.actividadEconomica = $scope.actividades.filter(e => e.isDefault )[0]
            }
            let ley = await getLeyendas($scope.sucursalUsuario.id_empresa, $scope.nuevaFactura.actividadEconomica.codigoCaeb);
            if( ley.error ) return SweetAlert.swal("", "ERROR AL OBTENER LEYENDAS</br>"+ley.message, "error")
            $scope.leyendas = ley.data;
            let leyendaDefault = $scope.leyendas.find( leyenda => leyenda.id == $scope.nuevaFactura.actividadEconomica.leyendaDefault);
            $scope.nuevaFactura.tipoLeyenda = leyendaDefault ? leyendaDefault : $scope.leyendas[0];

            let emisiones = await getTiposEmision($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if(emisiones.error) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS EMISIÓN</br>"+emisiones.message, "error")
            $scope.emisiones = emisiones.data
            $scope.nuevaFactura.tipoEmision = $scope.emisiones[0]

            
            $scope.nuevaFactura.tipoFactura = $scope.evento.tipoFactura;
            $scope.nuevaFactura.tipoDocSector = $scope.evento.tipoDocSector;

            let mon = await getTiposMoneda($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( mon.error ) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS DE MONEDAS</br>"+mon.message, "error");
            $scope.tiposMoneda = mon.data;
            $scope.nuevaFactura.tipoMoneda = $scope.tiposMoneda.filter( tipo => tipo.isDefault )[0];
            
            let metodo = await getMetodosPago($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( metodo.error ) return SweetAlert.swal("", "ERROR AL OBTENER MÉTODOS PAGO</br>"+metodo.message, "error");
            $scope.metodosPago = metodo.data;
            $scope.nuevaFactura.metodoPago = $scope.metodosPago[0];
            console.log('configuracionVentaVista', $scope.configuracionVentaVista);
            abrirPopup($scope.idModalNuevaFactura); 

        } catch (e) {
           SweetAlert.swal("","<b>Ocurrió un error</b></br>"+ e) 
        }       
        
    }
    // Cierra modal Evento
    $scope.cerrarDialogNuevaFactura = () => {
        $scope.nuevoFactura = {}
        $scope.cerrarPopup($scope.idModalNuevaFactura);
    }

    //? OBTIENE CATÁLOGOS NECESARIOS
    //* Obtiene Actividades económicas
    function getActividadesEconomicas( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerActividadesEconomicas(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER ACTIVIDADES ECONÓMICAS'+e })
            }
        })
    }

    //* Obtiene Métodos de pagos
    function getMetodosPago( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerTiposMetodoPago(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER MÉTODOS DE PAGO'+e })
            }
        })
    }

    //* Obtiene Tipo de monedas
    function getTiposMoneda( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerTiposMoneda(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS MONEDA'+e })
            }
        })
    }

    //* Obtiene Leyendas
    function getLeyendas( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerLeyendas(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS MONEDA'+e })
            }
        })
    }
    //* Obtiene Documentos sector
    function getDocumentosSector( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerDocumentosSector(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS MONEDA'+e })
            }
        })
    }

    //* Obtiene Tipos Emision de Facturas
    function getTiposEmision( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerTiposEmision(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                let datos = data.filter(emision => emision.descripcion == 'FUERA DE LINEA')
                return resolve({ error: false, data:datos })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS DE EMISIÓN'+e })
            }
        })
    }

    //* Obtiene Tipos  de Facturas
    function getTiposFactura( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerTiposFactura(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS DE FACTURAS'+e })
            }
        })
    }
    //* Obtiene tipos documento identidad
    function getTiposIdentidad( id_empresa, id_sucursal ) {
        return new Promise( async( resolve, reject ) => {
            try {
                if(!(id_empresa || id_sucursal )) return resolve({ error: true, message: 'Parámetros incorrectos'})
                let { error, message, data } = await ObtenerTiposIdentidad(id_empresa, id_sucursal)
                if(error) return resolve({ error, message })
                return resolve({ error: false, data })
            } catch (e) {
                reject({ error: true, message:'ERROR AL OBTENER TIPOS DE IDENTIDAD'+e })
            }
        })
    }

    $scope.buscarProducto = async ( texto ) => {
        if(!$scope.nuevaFactura.almacen) return;
        let { error, message, data } = await BuscarProductos($scope.sucursalUsuario.id_empresa, $scope.nuevaFactura.almacen.id, texto );
        if(error) return SweetAlert.swal("", "<b class='small'>ERROR AL OBTENER PRODUCTOS</b></br>"+message, "error")
        if(data != 0 && data.length === 1 ) $scope.producto = data[0]
        return data;
    }
    $scope.establecerProducto = async ( producto ) => {
        $scope.item = producto
        $scope.item.cantidad = 1
        $scope.item.descuento = 0
        $scope.item.recargo = 0
        $scope.item.ice = 0
        $scope.item.exento = 0
        let importe = $scope.item.cantidad * $scope.item.precio_unitario
        $scope.item.importe = importe ? importe : 0
    }
    $scope.agregarItem = async( item ) => {
        item.df = item.importe - item.descuento + item.recargo - item.ice - item.exento
        $scope.items.push( { ...item })
        $scope.item = {}
        $scope.totalizarDetalleVenta();
    }
    $scope.eliminarItem = (i) => {
        $scope.items.splice(i, 1)
        $scope.totalizarDetalleVenta();
    }
    $scope.calcularImporte = () => {
        $scope.item.importe = $scope.item.cantidad * $scope.item.precio_unitario;
    }
    $scope.totalizarDetalleVenta = async () => {
        $scope.nuevaFactura.total_bruto = $scope.items.reduce((acc, cur) => acc+cur.importe , 0)
        $scope.nuevaFactura.total_descuentos = $scope.items.reduce((acc, cur) => acc+cur.descuento , 0)
        $scope.nuevaFactura.total_recargos = $scope.items.reduce((acc, cur) => acc+cur.recargo , 0)
        $scope.nuevaFactura.total_ice = $scope.items.reduce((acc, cur) => acc+cur.ice , 0)
        $scope.nuevaFactura.total_exentos = $scope.items.reduce((acc, cur) => acc+cur.exento , 0)
        $scope.nuevaFactura.total_sujeto_df = $scope.items.reduce((acc, cur) => acc+cur.df, 0)
    }

    // obtiene lista de clientes
    $scope.listarClientes = async ( texto, nit ) => {
        try {
            let { error, message, data } = await BuscarClientes( $scope.sucursalUsuario.id_empresa, texto, nit )
            if( error ) return SweetAlert.swal("", "<b>Ocurrió un error</b></br>"+message, "error")
            if(data == 0 ) {
                $scope.registroNuevoCliente()
                return;
            }
            return data;
        } catch (e) {
            SweetAlert.swal("", "<b>No se puedo obtener clientes</b></br>"+e.message, "error")
            return []
        }
    }
    //establece cliente en la factura
    $scope.establecerCliente = ( cliente ) => {
        if(!cliente) return;
        $scope.nuevaFactura.cliente = cliente
        $scope.nuevaFactura.razon_social = cliente.razon_social
    }
    // Nuevo Cliente
    $scope.registroNuevoCliente = async () => {
        let { error, message, data } = await getTiposIdentidad($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id )
        if(error) return SweetAlert.swal("", "<b>ERROR AL OBTENER DOCUMENTOS IDENTIDAD</b></br>"+ message, "error");
        $scope.tiposDoc = data;
        $scope.nuevoCliente = {
            idEmpresa: $scope.usuario.id_empresa,
            codigo: Date.now().toString(32).toUpperCase(),
            tipoDocumento: $scope.tiposDoc[0],
            razon_social: '',
            complemento: null,
            telefono: "",
            correo: "",
            direccion: "",
            usuario: $scope.usuario.id
        }
        abrirPopup( $scope.idModalNuevoCliente )
    }
    $scope.cerrarNuevoCliente = () => {
        $scope.nuevoCliente = {}
        $scope.cerrarPopup( $scope.idModalNuevoCliente );
    }
    $scope.guardarCliente = async ( form ) => {
        if(form.$invalid) return;
        let { error, message, data } = await GuardarNuevoCliente( $scope.sucursalUsuario.id_empresa, $scope.nuevoCliente )
        if(error ) return SweetAlert.swal("", "<b class='small'>ERROR AL GUARDAR NUEVO CLIENTE</b></br>"+message, "error")
        if($scope.nuevaFactura){
            $scope.nuevaFactura.cliente = data 
            $scope.nuevaFactura.razon_social = data.razon_social 
        } 
        $scope.cerrarNuevoCliente();
    }

    // Guarda el nuevo evento
    $scope.guardarFactura = async(form) => {
        console.log('form', form );
        console.log('nuevaFactura', $scope.nuevaFactura);
        console.log('sucursal', $scope.sucursalUsuario);
        console.log('empresa',$scope.usuario.empresa);
        let empresa = $scope.usuario.empresa
        let sucursal = $scope.sucursalUsuario
        console.log('detalle', $scope.items);
        let factura = {
            id_empresa: $scope.usuario.id_empresa, //? Para registro en API_SFE
            id_sucursal: $scope.sucursalUsuario.id,
            nitEmisor: empresa.nit ,
            razonSocialEmisor: empresa.razon_social ,
            municipio: empresa.municipio.nombre,
            telefono: empresa.telefono1,
            numeroFactura: 1, //? se genera en backend
            cuf: "", //? se genera en backend
            cufd: $scope.evento.cufdEvento, //? se genera en backend
            codigoSucursal: sucursal.numero,
            direccion: sucursal.direccion,
            codigoPuntoVenta: 0,
            fechaEmision: new Date($scope.convertirFechaVenta($scope.nuevaFactura.fecha)),
            nombreRazonSocial: $scope.nuevaFactura.cliente.razon_social,
            codigoTipoDocumentoIdentidad: $scope.nuevaFactura.tipo_doc,
            numeroDocumento: $scope.nuevaFactura.cliente.nit,
            complemento: $scope.nuevaFactura.cliente.complemento,
            codigoCliente: $scope.nuevaFactura.cliente.codigo,
            codigoMetodoPago: $scope.nuevaFactura.metodoPago.codigoTipoMetodoPago,
            numeroTarjeta: 0,
            montoTotal: $scope.nuevaFactura.total_bruto,
            montoTotalSujetoIva: $scope.nuevaFactura.total_sujeto_df,
            codigoMoneda: $scope.nuevaFactura.tipoMoneda.codigoTipoMoneda,
            tipoCambio: 1,
            montoTotalMoneda: $scope.nuevaFactura.total_bruto,
            montoGiftCard: 0,
            descuentoAdicional: $scope.nuevaFactura.descuento ? $scope.nuevaFactura.descuento : 0,
            codigoExcepcion: 0, //? Valor que se envía para autorizar el registro de una factura con NIT inválido. Por defecto, enviar cero (0) o nulo y uno (1) cuando se autorice el registro.
            cafc: null, //? Código de Autorización de Facturas por Contingencia (ver con Daniel)
            leyenda: $scope.nuevaFactura.tipoLeyenda.descripcionLeyenda,
            usuario: $scope.nuevaFactura.vendedor.nombre_usuario,
            codigoTipoDocIdentidad: $scope.nuevaFactura.cliente.tipo_doc,
            codigoDocumentoSector: $scope.nuevaFactura.tipoDocSector.codigoTipoDocSector,
            codigoTipoFactura: $scope.nuevaFactura.tipoFactura.codigoTipoFactura,
            codigoTipoEmision: $scope.nuevaFactura.tipoEmision.codigoTipoEmision,
            
        }
        factura.detalle=[]
        for (let i = 0; i < $scope.items.length; i++) {
            const item = $scope.items[i];
            factura.detalle.push({
                actividadEconomica: item.codigoActividad,
                codigoProductoSin: item.codigoProductoServ,
                codigoProducto: item.codigo,
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                codigoUnidadMedida: item.codigoUnidadMedida,
                precioUnitario: item.precio_unitario,
                montoDescuento: item.descuento,
                subTotal: item.importe,
                numeroSerie: 0,
                numeroImei: item.numero_imei,
            }) 
        }
        // let { error, message, data } = await ValidarFactura( factura );

        // if(error) return SweetAlert.swal("", message, "error")
        // si retorna codigo guardar la factura incluyendo codigo

        //$scope.obtenerFacturas();
        
        $scope.evento.facturas.push(factura)
        // SweetAlert.swal("","<b>FACTURA GUARDADA</b>", "success")
        $scope.cerrarDialogNuevaFactura();
    }

    $scope.guardarRecepcionFacturas = async (evento) => {
        evento.idEventoSignificativo = evento.id
        evento.punto_venta = evento.puntoVenta
        evento.id_sucursal = $scope.sucursalUsuario.id
        evento.id_empresa = $scope.sucursalUsuario.id_empresa
        let { error, message, data } = await RecepcionEventoSignificativo( evento );
        if (error) {
            SweetAlert.swal("","<b>Ocurrió un error</b></br>"+ message) 
        }else{
            evento.codigoRecepcionPaquete =  data.codigoRecepcion
            $scope.$evalAsync()
            $scope.cerrarRecepcionFacturas()
            SweetAlert.swal("","<b>FACTURA GUARDADA</b>", "success")
        }
    }
    $scope.cerrarRecepcionFacturas = function () {
        $scope.cerrarPopup($scope.idModalRecepcionFacturas);
    };

    //ENVIO DE paquetes
    $scope.generarPaquete = (evento) => {
        let fechaEvento = $scope.fechaATexto(evento.fecha);
        SweetAlert.swal({
            title: "Esta seguro confirmar ?",
            html: "<h4>ENVIO DE PAQUETE POR <br><b>"+ evento.tipo +"</b>,</br>  EN FECHA <br><b>"+ fechaEvento +"</b></br></h4>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(async function (result) {
            if (result.value) { 
                let datos = {codigoRecepcion:evento.codigoRecepcion,codigoRecepcionPaquete:evento.codigoRecepcionPaquete, punto_venta:evento.puntoVenta, id_sucursal: $scope.sucursalUsuario.id, id_empresa:  $scope.sucursalUsuario.id_empresa, codigoDocumentoSector: 1, tipoFacturaDocumento: 1, idEventoSignificativo: evento.id}
                let  respuestaSIN = await EmisionPaquetes(datos);
               if(respuestaSIN.datos.codigoEstado == 900){
                    SweetAlert.swal({
                        title: respuestaSIN.datos.codigoDescripcion,
                        html: "<h4>ENVIO DE PAQUETE DE FACTURAS </h4>",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33'
                    })
                }else{
                    SweetAlert.swal({
                        title: respuestaSIN.datos.codigoDescripcion,
                        html: "<h4>ENVIO DE PAQUETE DE FACTURAS </h4>",
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33'
                    }) 
                }
            }  
        });
    }

    // FIN RECIBOS

    $scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.idModalNuevoEvento);
        $scope.eliminarPopup($scope.idModalRecepcionFacturas)
        $scope.eliminarPopup(scope.idModalNuevoCliente)
        $scope.eventos = {}
        $scope.filtro = {}
	});
    $scope.inicio();

}]);



