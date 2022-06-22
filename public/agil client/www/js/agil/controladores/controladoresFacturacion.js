angular.module('agil.controladores')

.controller('controladoresFacturacion', 
['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','SweetAlert', 'Paginator', 'FieldViewer', 'ObtenerListaEventoCufd', 'ObtenerListaEventos', 'GuardarNuevoEvento', 'ObtenerListaEventosPaginado', 'ObtenerActividadesEconomicas', 'ObtenerTiposMetodoPago', 'ObtenerTiposMoneda', 'ObtenerLeyendas', 'ObtenerDocumentosSector', 'ObtenerTiposEmision', 'ObtenerTiposFactura', 'BuscarClientes', 'ObtenerTiposIdentidad', 'GuardarNuevoCliente', 'BuscarProductos', 'ValidarFactura', 'ObtenerListaFacturasPaginado', 'ObtenerMotivosAnulacion', 'ObtenerImagen', 'AnularFactura', 'NumeroLiteral', 'NotificarEmision', 'ActualizarFactura', 'NotificarAnulacion', 'ActualizarInventariosFacturacion', 'VerificacionNit', 'ObtenerFacturaPorID', function( $scope, $localStorage, $location, $templateCache, $route, blockUI, $timeout, SweetAlert, Paginator, FieldViewer, ObtenerListaEventoCufd, ObtenerListaEventos, GuardarNuevoEvento, ObtenerListaEventosPaginado, ObtenerActividadesEconomicas,ObtenerTiposMetodoPago, ObtenerTiposMoneda, ObtenerLeyendas, ObtenerDocumentosSector, ObtenerTiposEmision, ObtenerTiposFactura, BuscarClientes, ObtenerTiposIdentidad, GuardarNuevoCliente, BuscarProductos, ValidarFactura, ObtenerListaFacturasPaginado, ObtenerMotivosAnulacion, ObtenerImagen, AnularFactura, NumeroLiteral, NotificarEmision, ActualizarFactura, NotificarAnulacion, ActualizarInventariosFacturacion, VerificacionNit, ObtenerFacturaPorID ){
    blockUI.start();
    $scope.usuario=JSON.parse($localStorage.usuario);
    $scope.idModalNuevaFactura = 'dialog-nueva-factura';
    $scope.idModalNuevoCliente = 'dialog-nuevo-cliente-facturacion';
    $scope.$on('$viewContentLoaded', function () {
        ejecutarScriptsFacturacion( $scope.idModalNuevaFactura, $scope.idModalNuevoCliente  );
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        $scope.configurarColumnasListaFacturas();
        blockUI.stop();
    });
	
	$scope.inicio = async() => {
        $scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario )
        $scope.verFiltros = false;
        let hoy = new Date()
        $scope.filtro = {
            desde: fechaATexto(hoy.setDate(hoy.getDate() - 7)),
            hasta: fechaATexto(hoy),
           
        }
        $scope.imagenEmpresa;
        const imgDelay = ObtenerImagen($scope.usuario.empresa.imagen);
        imgDelay.then(function (img) {
            $scope.imagenEmpresa = img
        }).catch(function (err) {
            const msg = (err.stack !== undefined && err.stack !== null) ? err.stack : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
            $scope.mostrarMensaje(msg)
            blockUI.stop()
        })

        $scope.cargarFacturas();
        try {
            let act = await getActividadesEconomicas($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id );
            if( act.error ) return SweetAlert.swal("", "ERROR AL OBTENER ACTIVIDADES</br>"+act.message, "error")
            $scope.actividades = act.data;
            console.log('Actividades', $scope.actividades);
            let ley = await getLeyendas($scope.sucursalUsuario.id_empresa);
            if( ley.error ) return SweetAlert.swal("", "ERROR AL OBTENER LEYENDAS</br>"+ley.message, "error")
            $scope.leyendas = ley.data;
            
            let emisiones = await getTiposEmision($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if(emisiones.error) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS EMISIÓN</br>"+emisiones.message, "error")
            $scope.emisiones = emisiones.data
            
            let fact = await getTiposFactura($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( fact.error ) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS DE FACTURAS</br>"+fact.message, "error");
            $scope.tiposFacturas = fact.data;
            
            let sect = await getDocumentosSector($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( sect.error ) return SweetAlert.swal("", "ERROR AL OBTENER DOCUMENTOS SECTOR</br>"+sect.message, "error");
            $scope.documentosSector = sect.data;

            let mon = await getTiposMoneda($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( mon.error ) return SweetAlert.swal("", "ERROR AL OBTENER TIPOS DE MONEDAS</br>"+mon.message, "error");
            $scope.tiposMoneda = mon.data;

            let metodo = await getMetodosPago($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id);
            if( metodo.error ) return SweetAlert.swal("", "ERROR AL OBTENER MÉTODOS PAGO</br>"+metodo.message, "error");
            $scope.metodosPago = metodo.data;
        } catch (e) {
            return SweetAlert.swal("", e.message, "error")
        }

        blockUI.stop();
	}
    // INICIO FACTURAS

    //Carga lista de Facturas
    $scope.cargarFacturas = () => {
        $scope.paginator = Paginator ();
        $scope.paginator.column = 'createdAt'
        $scope.paginator.direction = "desc";
        $scope.paginator.itemsPerPage = 10;
        $scope.paginator.filter = $scope.filtro
        $scope.paginator.callBack = $scope.obtenerFacturas;
        $scope.paginator.getSearch("", null, null);
    }
    $scope.obtenerFacturas = async() => {
        let { error, message, data, paginas } = await ObtenerListaFacturasPaginado($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0, $scope.paginator)
        if(error) return console.error(message);
        console.log(data);
        $scope.paginator.setPages(paginas)
        $scope.facturas = data;
        $scope.datosFF= data
        console.log($scope.facturas);
        $scope.$evalAsync()
    }
    // Abre modal nuevo Evento
	$scope.abrirDialogNuevaFactura = async () => {
        $scope.verDescuentos = false;
        try {
            $scope.nuevaFactura = {
                cambio: 0,
                descuento: 0,
                pagado: 0,
                total_sujeto_df: 0,
                sucursal: $scope.sucursalUsuario,
                vendedor: $scope.usuario,
                montoGiftCard: 0
            }
            $scope.item = {}
            $scope.items = []

            if($scope.actividades ==  0 ) return SweetAlert.swal("","<small><b>Actividades no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.leyendas ==  0 ) return SweetAlert.swal("","<small><b>Leyendas no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.emisiones == 0 )    return SweetAlert.swal("","<small><b>Leyendas no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.tiposFacturas == 0 )    return SweetAlert.swal("","<small><b>Tipos de Facturas no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.documentosSector == 0 ) return SweetAlert.swal("","<small><b>Documentos Sector no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.tiposMoneda == 0 )  return SweetAlert.swal("","<small><b>Tipos Moneda no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")
            if($scope.metodosPago == 0 )  return SweetAlert.swal("","<small><b>Metodos de Pago no encontradas</b></br>El catálogo es imprescindible para la facturación</small>","error")

            $scope.nuevaFactura.actividadEconomica = $scope.actividades[0];
            $scope.nuevaFactura.tipoEmision = $scope.emisiones[0]
            $scope.nuevaFactura.tipoFactura = $scope.tiposFacturas[0];
            $scope.nuevaFactura.tipoDocSector = $scope.documentosSector[0];
            $scope.nuevaFactura.tipoMoneda = $scope.tiposMoneda[0];
            $scope.nuevaFactura.metodoPago = $scope.metodosPago[0];
            if($scope.sucursalUsuario.almacenes && $scope.sucursalUsuario.almacenes.length == 1){
                $scope.nuevaFactura.almacen = $scope.sucursalUsuario.almacenes[0]
            }
            abrirPopup($scope.idModalNuevaFactura); 

        } catch (e) {
            console.log(e);
           SweetAlert.swal("","<b>Ocurrió un error</b></br>"+ e.message) 
        }       
        
    }
    // Cierra modal Evento
    $scope.cerrarDialogNuevaFactura = () => {
        $scope.nuevoFactura = {}
        $scope.items = []
        $scope.cerrarPopup($scope.idModalNuevaFactura);
    }
    // Guarda el nuevo evento
    $scope.guardarFactura = async( form ) => {
        try {
            SweetAlert.swal({
                icon: 'info',
                iconHtml: '<i class="fa fa-cloud size-icon"></i>',
                html: `<div class="small"><b>INICIANDO FACTURACIÓN</b></div>`,
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            SweetAlert.showLoading()
            blockUI.noOpen = true;
            console.log('nuevaFactura', $scope.nuevaFactura);
            let empresa = $scope.usuario.empresa
            let sucursal = $scope.sucursalUsuario
            let codigoExcepcion = 0;
            if( $scope.nuevaFactura.cliente && $scope.nuevaFactura.cliente.tipo_doc === 5 ){
                swal.update({
                    icon: 'info',
                    iconHtml: '<i class="fa fa-cloud size-icon"></i>',
                    html: `<div class="small"><b>VERIFICANDO NIT DEL CLIENTE</b></div>`,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                let estadoCliente = await VerificacionNit( $scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, $scope.nuevaFactura.cliente.nit );
                if(estadoCliente.error) return SweetAlert.swal("", "<small><b>NO SE PUDO VALIDAR NIT DEL CLIENTE</b></br></small>", "error");
                codigoExcepcion = estadoCliente.isValid ? 0 : 1;
            }
            let leyendasActividad = $scope.leyendas.filter(e => e.codigoCaeb === $scope.nuevaFactura.actividadEconomica.codigoCaeb )
            let idx = Math.floor(Math.random() * ((leyendasActividad.length - 1) - 0 + 1)) + 0;
            let leyenda = leyendasActividad[idx];
            let factura = {
                codigoActividadEconomica: $scope.nuevaFactura.actividadEconomica.codigoCaeb,
                id_empresa: $scope.usuario.id_empresa, //? Para registro en API_SFE
                id_sucursal: $scope.sucursalUsuario.id,
                nitEmisor: empresa.nit ,
                razonSocialEmisor: empresa.razon_social ,
                municipio: empresa.municipio.nombre,
                telefono: empresa.telefono1,
                cuf: "", //? se genera en backend
                cufd: "", //? se genera en backend
                codigoSucursal: sucursal.numero,
                direccion: sucursal.direccion,
                codigoPuntoVenta: 0,
                fechaEmision: $scope.nuevaFactura.fecha,
                nombreRazonSocial: $scope.nuevaFactura.cliente.razon_social,
                correoCliente: $scope.nuevaFactura.cliente.correo ? $scope.nuevaFactura.cliente.correo : null,
                codigoTipoDocumentoIdentidad: $scope.nuevaFactura.tipo_doc,
                numeroDocumento: $scope.nuevaFactura.cliente.nit,
                complemento: $scope.nuevaFactura.cliente.complemento,
                codigoCliente: $scope.nuevaFactura.cliente.codigo,
                codigoMetodoPago: $scope.nuevaFactura.metodoPago.codigoTipoMetodoPago,
                numeroTarjeta: $scope.mostrarNroTarjeta ? $scope.nuevaFactura.numeroTarjeta : 0,
                montoTotal: $scope.nuevaFactura.total_bruto ? $scope.nuevaFactura.total_bruto.toFixed(2) : 0.00,
                montoTotalSujetoIva: $scope.nuevaFactura.total_sujeto_df ? $scope.nuevaFactura.total_sujeto_df.toFixed(2) : 0.00,
                codigoMoneda: $scope.nuevaFactura.tipoMoneda.codigoTipoMoneda,
                tipoCambio: 1,
                montoTotalMoneda: $scope.nuevaFactura.total_bruto ? $scope.nuevaFactura.total_bruto.toFixed(2) : 0.00,
                montoGiftCard: 0.00,
                descuentoAdicional: $scope.nuevaFactura.descuento ? $scope.nuevaFactura.descuento.toFixed(2) : 0.00,
                codigoExcepcion,
                cafc: null, //? Código de Autorización de Facturas por Contingencia (ver con Daniel)
                leyenda: leyenda.descripcionLeyenda,
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
                    cantidad: item.cantidad ? item.cantidad.toFixed(2) : 0,
                    codigoUnidadMedida: item.codigoUnidadMedida,
                    unidadMedida: item.unidad_medida,
                    precioUnitario: item.precio_unitario ? item.precio_unitario.toFixed(2) : 0.00,
                    montoDescuento: item.descuento ? item.descuento.toFixed(2) : 0.00,
                    subTotal: item.importe ? item.importe.toFixed(2) : 0.00,
                    numeroSerie: 0,
                    numeroImei: item.numero_imei,
                }) 
            }
            swal.update({
                icon: 'info',
                iconHtml: '<i class="fa fa-cloud size-icon"></i>',
                html: `<div class="small"><b>VALIDANDO FACTURA</b></div>`,
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            let { error, message, data } = await ValidarFactura( factura,sucursal );
            if(error) return SweetAlert.swal("", message, "error")
            // si retorna codigo guardar la factura incluyendo codigo
            $scope.enviarFacturaPorCorreo( data.id )
            $scope.obtenerFacturas();
            $scope.cerrarDialogNuevaFactura();
            SweetAlert.swal("","<b>FACTURA GUARDADA</b>", "success")
        } catch (e) {
            console.log('error', e.message);
            SweetAlert.swal("","<b>ERROR AL GUARDAR FACTURA</b>", "error")
        }
    }
    // Mostrar  Factura
    $scope.generarFactura = async( id, getBinary ) => {
        if(!id) return SweetAlert.swal("","<b>DATOS DE FACTURA INCOMPLETOS</b>", "error")
        try {
            let { error, message, data } = await ObtenerFacturaPorID( id );
            if( error ) return SweetAlert.swal("","<b class='small'>ERROR AL OBTENER FACTURA</b></br>"+message, "error")
            let factura = data
            console.log('factura', factura);

            var doc = new PDFDocument({ size: [612, 792], compress: false, margin: 10 });
            var stream = doc.pipe(blobStream());
            doc.lineWidth(0.3)
            doc.lineGap(-1)
            var y = 170, itemsPorPagina = 52, items = 0, pagina = 1, totalPaginas = Math.ceil(( factura.detalleFactura.length + 31) / 52 );
            items +=18
            $scope.headerFactura( doc, factura );
            for (let i = 0; i < factura.detalleFactura.length; i++) {
                const { codigoProducto, cantidad, unidadMedida, descripcion, precioUnitario, montoDescuento, subTotal  } = factura.detalleFactura[i];
                doc.font('Helvetica', 6)
                doc.text( codigoProducto ? "" + codigoProducto.toUpperCase() : "", 30, y + 3, { width: 60, align:'center'})
                doc.text( cantidad ? number_format_negativo_to_positvo(cantidad, 2) : "", 90, y + 3, { width: 43, align:'right'})
                doc.text( unidadMedida ? unidadMedida.toUpperCase() :"", 136, y + 3, { width: 86, align:'center'})
                doc.text( descripcion ? descripcion.toUpperCase() : "", 221, y + 3, { width: 201})
                doc.text( precioUnitario ? number_format_negativo_to_positvo(precioUnitario, 2) : "", 422, y + 3, { width: 48, align:'right'})
                doc.text(montoDescuento ? number_format_negativo_to_positvo(montoDescuento, 2) : "", 472, y + 3, { width: 48, align:'right'})
                doc.text(subTotal ? number_format_negativo_to_positvo(subTotal,2 ) : "", 522, y + 3, { width: 58, align:'right'})
                y += 10
                doc.rect(30, y, 552, 0).stroke()
                items++;
                if(itemsPorPagina === items){
                    doc.addPage({ margin: 0, compress:false, bufferPages: true });
                    y = 30;
                    items = 0
                    pagina++
                    doc.font('Helvetica-Bold', 5).text( pagina + " de "+ totalPaginas,0, 765, { width: 612, align: 'center'})
                }
                
            }

            $scope.footerFactura( doc, y, factura );
            if(pagina === totalPaginas ) doc.font('Helvetica-Bold', 5).text( "Página " + pagina + " de "+ totalPaginas,0, 765, { width: 612, align: 'center'})
            doc.end();
            if(!getBinary){
                stream.on('finish', function () {
                    var fileURL = stream.toBlobURL('application/pdf');
                    window.open(fileURL, '_blank', 'location=no');
                });
                blockUI.stop();
                return;
            }else{
                let res = await $scope.convertirABinario( doc, stream );
                return res;
            }
        } catch (e) {
            return SweetAlert.swal("","<b class='small'>ERROR AL GENERAR VISTA DE FACTURA</b></br>"+e.message, "error")
        }

    }
    $scope.headerFactura = async(doc, { sucursal, codigoPuntoVenta, cuf, fechaEmision, numeroFactura, numeroDocumento, nombreRazonSocial, codigoCliente, actividad, tipoFactura, complemento  }) => {
        let x = 30, y = 30
        if ($scope.imagenEmpresa) {
            doc.image($scope.imagenEmpresa, x, 30, { fit: [80, 80] });
            x += 85;
        }
        let f = new Date(fechaEmision).toLocaleString("es-BO", { timeZone: "America/La_Paz" })
        doc.font('Helvetica-Bold', 8).text(sucursal.empresa.razonSocial.toUpperCase(), x, y)
        doc.font('Helvetica-Bold', 7).text("NIT: ", 336, y, { width: 70, align: 'right'})
        doc.font('Helvetica', 7).text(sucursal.empresa.nit, 412, y, { width: 176 })
        y += 10;
        doc.font('Helvetica-Bold', 7).text(sucursal.nombre.toUpperCase(), x, y)
        doc.font('Helvetica-Bold', 7).text("FACTURA N°: ", 336, y, { width: 70, align: 'right'})
        doc.font('Helvetica', 7).text(numeroFactura, 412, y, { width: 176 })
        y+=10
        doc.font('Helvetica', 7).text( 'Punto de Venta ' + codigoPuntoVenta, x, y)
        doc.font('Helvetica-Bold', 7).text("CÓDIGO DE AUTORIZACIÓN: ", 336, y, { width: 70, align: 'right'})
        doc.font('Helvetica', 7).text(cuf, 412, y, { width: 176 })
        y += 10;
        doc.text(sucursal.telefono ? "Teléfono: "+sucursal.telefono : "", x, y)
        y += 10;
        doc.text(sucursal.direccion ? sucursal.direccion : "", x, y, { width: 191 })
        doc.font('Helvetica-Bold', 7).text("ACTIVIDAD: ", 336, y, { width: 70, align: 'right'})
        doc.font('Helvetica', 7).text(actividad.descripcion, 412, y, { width: 176 })
        y += 20
        doc.font("Helvetica-Bold", 10).text("FACTURA", 0, y, { width: 612, align:'center'})
        y += 10
        let subtitulo = ""
        if( tipoFactura.descripcion.includes('FACTURA') ){
            subtitulo= tipoFactura.descripcion.replace('FACTURA ',"")
        }else{
            subtitulo = tipoFactura.descripcion;
        }
        let capitalizado = subtitulo.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
        doc.font("Helvetica", 6).text("("+capitalizado+")", 0, y + 3, { width: 612, align: 'center'})
        y += 20
        // DATA SUB HEADER
        doc.font("Helvetica-Bold", 7)
        doc.text("FECHA:", 30, y)
        doc.text("NIT/CI/CEX:", 406, y)
        doc.font("Helvetica", 7)
        doc.text( fechaEmision ? $scope.convertirFechaHora(fechaEmision) : "", 130, y)
        doc.text( complemento ? numeroDocumento + " "+ complemento : numeroDocumento, 463, y)
        y += 10
        doc.font("Helvetica-Bold", 7)
        doc.text("NOMBRE/RAZÓN SOCIAL: ", 30, y)
        doc.text("COD. CLIENTE: ", 406, y)
        doc.font("Helvetica", 7)
        doc.text(nombreRazonSocial.toUpperCase(), 130, y)
        doc.text(codigoCliente, 463, y)

        y+=20

        //DETAIL HEADER
        doc.rect(30, y, 552, 20).stroke();
        doc.rect(90, y, 0, 20).stroke();
        doc.rect(135, y, 0, 20).stroke();
        doc.rect(221, y, 0, 20).stroke();
        doc.rect(422, y, 0, 20).stroke();
        doc.rect(472, y, 0, 20).stroke();
        doc.rect(522, y, 0, 20).stroke();
        doc.font("Helvetica-Bold", 7);
        doc.text("CÓDIGO PRODUCTO", 30, y + 5, { width: 60, align:'center'})
        doc.text("CANTIDAD", 90, y + 5, { width: 45, align:'center'})
        doc.text("UNIDAD DE MEDIDA", 135, y + 5, { width: 86, align:'center'})
        doc.text("DESCRIPCIÓN", 221, y + 5, { width: 201, align:'center'})
        doc.text("PRECIO UNITARIO", 422, y + 5, { width: 50, align:'center'})
        doc.text("DESCUENTO", 472, y + 5, { width: 50, align:'center'})
        doc.text("SUB TOTAL", 522, y + 5, { width: 60, align:'center'})
    }
    $scope.footerFactura = async(doc, y, { leyenda, montoTotal, montoGiftCard, montoTotalSujetoIva, descuentoAdicional, nitEmisor, cuf, numeroFactura } ) => {
        doc.font("Helvetica", 6)
        doc.text("SUB TOTAL " + 'Bs', 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo(montoTotal, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.rect(422, y, 160, 0 ).stroke()
        doc.text("DESCUENTO " + 'Bs', 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo(descuentoAdicional, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.rect(422, y, 160, 0 ).stroke()
        doc.text("TOTAL " + 'Bs', 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo(montoTotal - descuentoAdicional, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.rect(422, y, 160, 0 ).stroke()
        doc.text("MONTO GIFT CARD " + 'Bs', 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo( montoGiftCard, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.font('Helvetica-Bold', 6).text('SON: ', 30, y + 3)
        doc.text(NumeroLiteral.Convertir(parseFloat(montoTotal - descuentoAdicional - montoGiftCard).toFixed(2).toString(), "Bolivianos"), 48, y + 3, { width: 200})
        doc.rect(422, y, 160, 0 ).stroke()
        doc.text("MONTO A PAGAR " + 'Bs', 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo( montoTotal - descuentoAdicional - montoGiftCard, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.rect(422, y, 160, 0 ).stroke()
        doc.text("IMPORTE BASE CRÉDITO FISCAL ", 422, y + 3, { width: 100, align:'right'})
        doc.text( number_format_negativo_to_positvo( montoTotalSujetoIva - descuentoAdicional, 2), 522, y + 3, { width: 58, align: 'right'})
        y+=10
        doc.rect(422, y, 160, 0 ).stroke()
        y+=10
        y+=10
        var canvas = document.getElementById('qr-code');
        qr.canvas({
            canvas: canvas,
            value: `https://pilotosiat.impuestos.gob.bo/consulta/QR?nit=${nitEmisor}&cuf=${cuf }&numero=${numeroFactura}&t=1`
        }, function (e) { 
            console.log(e);
        });

        var qrImage = canvas.toDataURL('image/png');
        doc.image(qrImage, 512, y - 15, { width: 70, height: 70 });
        y += 10
        doc.font("Helvetica", 7).text("ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS, EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY", 30, y, {width: 490, align: "center"})
        y += 10
        doc.font("Helvetica", 7).text( leyenda, 30, y, {width: 490, align: "center"})
        if(leyenda.length > 155) y += 3
        y += 10
        doc.font("Helvetica", 7).text('"Este documento es la Representación Gráfica de un Documento Fiscal Digital emitido en una modalidad de facturación en línea"', 30, y, {width: 490, align: "center"})
    }
    //Anular factura
    $scope.anularFactura = async (factura) => {
        if(!factura) return SweetAlert.swal("", "<b>DATOS DE FACTURA INCOMPLETOS</b>", "errror");
        if( !$scope.motivosAnulacion || $scope.motivosAnulacion == 0) {
            let { error, message, data } = await ObtenerMotivosAnulacion( $scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id )
            if( error ) return SweetAlert.swal("","<b class='small'></b></br><small>"+message+"</small>", "error");
            $scope.motivosAnulacion = data;
        }
        let motivos = {}
        $scope.motivosAnulacion.map(e => {
            motivos[e.codigoMotivoAnulacion] = e.descripcion;
            return 1 
        })
        Swal.fire({
            title: 'Motivo de Anulación',
            //html: '<small>Selecione el motivo por el cual anula la factura</small>',
            input: 'select',
            inputOptions: motivos,
            inputPlaceholder: 'SELECCIONE MOTIVO',
            showCancelButton: true,
            confirmButtonText: 'Anular',
            cancelButtonText: 'Salir',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            backdrop: true,               
            /* allowOutsideClick: false,     
            allowEscapeKey: false, */
            customClass: { title: 'smaller', input: 'input-sm smaller text-capitalize' },
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value !== '') {
                  resolve();
                } else {
                  resolve('Debe seleccionar un motivo');
                }
              });
            }
          }).then( async (result) => {
            if (result.isConfirmed) {
                factura.codigoMotivoAnulacion = +result.value
                let { error:err, message: msg, errors } = await AnularFactura( factura )
                $scope.$evalAsync();
                if(err) {
                    let m = `<b>${ msg }</b></br>`
                    if(errors){
                        console.log('errores', errors);
                        m += `<small>`
                        for (let n = 0; n < errors.length; n++) {
                            const { codigo, descripcion } = errors[n];
                            m += `<p class="small">${codigo} - ${ descripcion }</p></br>`
                        }
                        m += `</small>`
                    }
                    return SweetAlert.swal("", m, "error");
                }
                let { email_host, email_puerto, email_empresa_aplicacion, email_password_aplicacion } = $scope.usuario.empresa
                if(!(email_host || email_puerto || email_empresa_aplicacion || email_password_aplicacion)) return SweetAlert.swal("", "<b>ERROR DE CONFIGURACIÓN</b></br><small>La empresa no tiene configurada el <b>servicio de correos.</b></small>", "error");
                let dataNotificacion = {
                    correoCliente: factura.correoCliente,
                    numeroFactura: factura.numeroFactura,
                    nombreRazonSocial: factura.nombreRazonSocial,
                    nombreSucursal: factura.sucursal ? factura.sucursal.nombre : "",
                    direccionSucursal: factura.sucursal ? factura.sucursal.direccion : "",
                    telefonoSucursal: factura.sucursal ? factura.sucursal.telefono : "",
                    social: null,
                    razonSocialEmisor: factura.razonSocialEmisor,
                    cuf: factura.cuf
                }
                dataNotificacion.fechaEmisionTexto = new Date(factura.fechaEmision).toLocaleString("es-BO", { timeZone: "America/La_Paz" })
                let not = await NotificarAnulacion( dataNotificacion,  $location.$$protocol+"://"+$location.$$host+"/"+$scope.usuario.empresa.imagen, email_host, email_puerto, email_empresa_aplicacion, email_password_aplicacion)
                $scope.obtenerFacturas();
                SweetAlert.swal("","<b class='small'>FACTURA ANULADA</b>", "success");
            }
          });        
    }
    // obtiene lista de clientes
    $scope.listarClientes = async ( texto, nit ) => {
        try {
            let { error, message, data } = await BuscarClientes( $scope.sucursalUsuario.id_empresa, texto, nit )
            if( error ) return SweetAlert.swal("", "<b>Ocurrió un error</b></br>"+message, "error")
            if(data == 0 ) {
                $scope.registroNuevoCliente(nit)
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
    $scope.registroNuevoCliente = async ( isNit ) => {
        let { error, message, data } = await getTiposIdentidad($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id )
        if(error) return SweetAlert.swal("", "<b>ERROR AL OBTENER DOCUMENTOS IDENTIDAD</b></br>"+ message, "error");
        $scope.tiposDoc = data;
        $scope.nuevoCliente = {
            idEmpresa: $scope.usuario.id_empresa,
            codigo: Date.now().toString(32).toUpperCase(),
            tipoDocumento: $scope.tiposDoc[0],
            razon_social: isNit ? null : $scope.nuevaFactura.razon_social,
            complemento: null,
            telefono: "",
            nit: isNit ? $scope.nuevaFactura.cliente : null,
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
        $scope.calcularTotalPago()
    }
    $scope.calcularTotalPago = () => {
        $scope.nuevaFactura.totalPago = $scope.nuevaFactura.total_sujeto_df - $scope.nuevaFactura.descuento
        if($scope.nuevaFactura.pagado) $scope.nuevaFactura.cambio = +($scope.nuevaFactura.pagado - ($scope.nuevaFactura.totalPago ? $scope.nuevaFactura.totalPago : 0)).toFixed(2)
    }
    //* Envia factura por correo del cliente
    $scope.enviarFacturaPorCorreo = async (factura) => {
        try {
            if( typeof factura == 'number'){
                let { error, message, data } = await ObtenerFacturaPorID(factura)
                if( error ) return SweetAlert.swal("","<small><b>ERROR AL OBTENER DETALLE FACTURA</b></br>"+message+"</small>","error")
                factura = data
            }
            let { email_host, email_puerto, email_empresa_aplicacion, email_password_aplicacion } = $scope.usuario.empresa
            if(!(email_host || email_puerto || email_empresa_aplicacion || email_password_aplicacion)) return SweetAlert.swal("", "<b>ERROR DE CONFIGURACIÓN</b></br><small>La empresa no tiene configurada el <b>servicio de correos.</b></small>", "error")
            let textBin = await $scope.generarFactura( factura.id, true )
            let xml = await $scope.generarXML(factura);
            if(xml.error) return SweetAlert.swal("","ERROR AL GENERAR XML", "error")
            let dataNotificacion = {
                correoCliente: factura.correoCliente,
                numeroFactura: factura.numeroFactura,
                nombreRazonSocial: factura.nombreRazonSocial,
                nombreSucursal: factura.sucursal ? factura.sucursal.nombre : "",
                direccionSucursal: factura.sucursal ? factura.sucursal.direccion : "",
                telefonoSucursal: factura.sucursal ? factura.sucursal.telefono : "",
                social: null,
                razonSocialEmisor: factura.razonSocialEmisor,
            }
            dataNotificacion.fechaEmisionTexto = new Date(factura.fechaEmision).toLocaleString("es-BO", { timeZone: "America/La_Paz" })
            let not = await NotificarEmision( dataNotificacion, textBin, xml.data, $location.$$protocol+"://"+$location.$$host+"/"+$scope.usuario.empresa.imagen, email_host, email_puerto, email_empresa_aplicacion, email_password_aplicacion);
            if(not.error){
                toastr.options.timeOut = '1400'
                    toastr.options.positionClass = 'toast-top-center'
                    toastr.error(not.message);
                    return;
                }
            let update = await ActualizarFactura(factura.id);
            if(update.error) {
                return SweetAlert.swal("", "<b>ERROR AL ACTUALIZAR ESTADO DE FACTURA</b></br>"+update.message,"error")
            }
            $scope.obtenerFacturas();
            toastr.options.timeOut = '1400'
            toastr.options.positionClass = 'toast-top-center'
            toastr.success('Factura enviada por correo');
            return;
        } catch (e) {
            if(e.status == -1) return SweetAlert.swal("", "<b class='small'>EL SERVIDOR DE CORREOS NO RESPONDE</b>", "error")
            console.error(e);
            toastr.options.timeOut = '1600'
            toastr.options.positionClass = 'toast-top-center'
            toastr.error(e.message);
        }

    }
    $scope.convertirABinario = async (doc, stream) => {
        return new Promise((resolve, reject) => {
            if (!(doc || stream)) return;
            stream.on('finish', async function () {
                fileReader = new FileReader();
                fileReader.onload = async function (event) {
                    resolve({error: false, data: event.target.result });
                };
                fileReader.onerror = async function () {
                    resolve({error: true, message: 'ERROR AL GENERAR PDF' });
                };
                fileReader.readAsDataURL(stream.toBlob('application/pdf'));
            });

        })
    }
    $scope.generarXML = async (factura) => {
        return new Promise( ( resolve, reject ) => {
            try {
                parser = new DOMParser();
                text = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <facturaElectronicaCompraVenta xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:noNamespaceSchemaLocation="../../store/xsd/facturaElectronicaCompraVenta.xsd">
                                <cabecera>
                                    <nitEmisor>${ factura.nitEmisor }</nitEmisor>
                                    <razonSocialEmisor>${ factura.razonSocialEmisor }</razonSocialEmisor>
                                    <municipio>${ factura.municipio }</municipio>
                                    <telefono>${ factura.telefono }</telefono>
                                    <numeroFactura>${ factura.numeroFactura }</numeroFactura>
                                    <cuf>${factura.cuf}</cuf>
                                    <cufd>${ factura.cufd }</cufd>
                                    <codigoSucursal>${ factura.codigoSucursal }</codigoSucursal>
                                    <direccion>${ factura.sucursal.direccion }</direccion>
                                    <codigoPuntoVenta>${ factura.codigoPuntoVenta }</codigoPuntoVenta>
                                    <fechaEmision>${ fechaATexto(factura.fechaEmision)}</fechaEmision>
                                    <nombreRazonSocial>${ factura.nombreRazonSocial }</nombreRazonSocial>
                                    <codigoTipoDocumentoIdentidad>${ factura.codigoTipoDocIdentidad }</codigoTipoDocumentoIdentidad>
                                    <numeroDocumento>${ factura.numeroDocumento }</numeroDocumento>`
                                    text += factura.complemento ? `<complemento>${ factura.complemento }</complemento>` : `<complemento xsi:nil="true"/>` 
                                    
                                    text += `<codigoCliente>${ factura.codigoCliente }</codigoCliente>
                                    <codigoMetodoPago>${ factura.codigoMetodoPago }</codigoMetodoPago>`
                                    text += factura.numeroTarjeta ? `<numeroTarjeta xsi:nil="true"/>` : `<numeroTarjeta>${ factura.numeroTarjeta }</numeroTarjeta>`
                                    text += `<montoTotal>${ factura.montoTotal - factura.descuentoAdicional }</montoTotal>
                                    <montoTotalSujetoIva>${ factura.montoTotalSujetoIva - factura.descuentoAdicional}</montoTotalSujetoIva>
                                    <codigoMoneda>${ factura.codigoTipoMoneda }</codigoMoneda>
                                    <tipoCambio>${ factura.tipoCambio }</tipoCambio>
                                    <montoTotalMoneda>${ factura.montoTotalMoneda - factura.descuentoAdicional }</montoTotalMoneda>`
                                    text += factura.montoGiftCard ? `<montoGiftCard xsi:nil="true"/>` : `<montoGiftCard xsi:nil="true"/>`
                                    text += `<descuentoAdicional>${factura.descuentoAdicional }</descuentoAdicional>
                                        <codigoExcepcion xsi:nil="true"/>`
                                    text += `<cafc xsi:nil="true"/>
                                    <leyenda>${ factura.leyenda }</leyenda>
                                    <usuario>${ factura.usuario }</usuario>
                                    <codigoDocumentoSector>${ factura.codigoDocumentoSector }</codigoDocumentoSector>
                                </cabecera>`

                                for (let i = 0; i < factura.detalleFactura.length; i++) {
                                    const { actividadEconomica, codigoProductoSin, codigoProducto, descripcion, cantidad, codigoUnidadMedida, precioUnitario, montoDescuento, subTotal, numeroSerie, numeroImei  } = factura.detalleFactura[i];
                                    text += `<detalle>
                                                    <actividadEconomica>${ actividadEconomica }</actividadEconomica>
                                                    <codigoProductoSin>${ codigoProductoSin }</codigoProductoSin>
                                                    <codigoProducto>${ codigoProducto }</codigoProducto>
                                                    <descripcion>${ descripcion }</descripcion>
                                                    <cantidad>${ cantidad }</cantidad>
                                                    <unidadMedida>${ codigoUnidadMedida }</unidadMedida>
                                                    <precioUnitario>${ precioUnitario }</precioUnitario>
                                                    <montoDescuento>${ montoDescuento }</montoDescuento>
                                                    <subTotal>${ subTotal }</subTotal>
                                                    <numeroSerie>${ numeroSerie ? numeroSerie : 0 }</numeroSerie>
                                                    <numeroImei>${ numeroImei ? numeroImei : 0}</numeroImei>
                                                </detalle>`
                                }
                text += `</facturaElectronicaCompraVenta>`;;
                return resolve({ error: false, data:text })
            } catch (e) {
                return resolve({ error:true, message: e.message })
            }
        })
    }
    





    //Obtiene Tipos de Eventos
    /* $scope.obtenerTiposEventos = async() => {
        return new Promise( async ( resolve, reject) => {
            let { error, message, data } = await ObtenerListaEventos($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0 )
            if( error ) return resolve({ error, message: "<b>ERROR AL OBTENER CUFDs</b></br>"+message })
            return resolve({ error, data })
        })
    } */
    // Obtiene Lista CUFDs
    /* $scope.obtenerListaCufd = async () => {
        return new Promise( async( resolve, reject) => {
            let { error, message, data } = await ObtenerListaEventoCufd($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id, 0 )
            if( error ) return resolve({ error, message: "<b>ERROR AL OBTENER CUFDs</b></br>"+message })
            return resolve({ error, data })
        });
    }  */

    // configura las columnas de la tabla de Eventos
    $scope.configurarColumnasListaFacturas = () => {
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
    // FIN FACTURAS

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
                if(e.status === -1) return reject({ error: true, message:'<small>EL SERVICIO DE FACTURACIÓN ELECTRÓNICA NO RESPONDE</small>' })
                return reject({ error: true, message:'ERROR AL OBTENER ACTIVIDADES ECONÓMICAS'+e })
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
                return resolve({ error: false, data })
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
    $scope.actualizarCamposFacturacion = () => {
        if( !$scope.nuevaFactura.metodoPago ) return;
        $scope.mostrarNroTarjeta = $scope.nuevaFactura.metodoPago.descripcion.includes('TARJETA');
        $scope.mostrarGiftCard = $scope.nuevaFactura.metodoPago.descripcion.includes('GIFT');
    }
    $scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.idModalNuevaFactura);
        $scope.facturas = {}
        $scope.filtro = {}
	});
    $scope.inicio();

}]);



