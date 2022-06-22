angular.module('agil.controladores')

.controller('ControladorRecibosTrasporte', ['$scope','$localStorage','$location','$templateCache','$route','blockUI','$timeout','ClasesTipo','SweetAlert', 'ObtenerChoferes', 'GuardarEditarChofer', 'EliminarChofer', 'ObtenerVehiculos', 'GuardarEditarVehiculo', 'EliminarVehiculo', 'ObtenerRutas', 'GuardarEditarRuta', 'EliminarRuta', 'BuscarChoferPorNombre', 'BuscarVehiculoPorPlaca', 'BuscarBancosEmpresa', 'BuscarBancoDestinoPorNombre', 'BuscarRutaPorNombre', 'ObtenerRecibos', 'GuardarEditarRecibo', 'EliminarRecibo', 'ObtenerReciboPorId', 'FieldViewer', 'Paginator', 'ObtenerSucursalesEmpresa', 'ObtenerUsuariosEmpresa', 'GetRecibosReporte', function($scope, $localStorage, $location, $templateCache, $route, blockUI, $timeout, ClasesTipo, SweetAlert, ObtenerChoferes, GuardarEditarChofer, EliminarChofer, ObtenerVehiculos, GuardarEditarVehiculo, EliminarVehiculo, ObtenerRutas, GuardarEditarRuta, EliminarRuta, BuscarChoferPorNombre, BuscarVehiculoPorPlaca, BuscarBancosEmpresa, BuscarBancoDestinoPorNombre, BuscarRutaPorNombre, ObtenerRecibos, GuardarEditarRecibo, EliminarRecibo, ObtenerReciboPorId, FieldViewer, Paginator, ObtenerSucursalesEmpresa, ObtenerUsuariosEmpresa, GetRecibosReporte ){
    blockUI.start();

    $scope.$on('$viewContentLoaded', function () {
        resaltarPestaña($location.path().substring(1));
        ejecutarScriptsRecibos($scope.idModalNuevoRecibo, $scope.idModalChoferes, $scope.idModalVehiculos, $scope.idModalRutas);
        $scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
        $scope.configurarColumnasListaRecibos();
        blockUI.stop();
    });
	
	$scope.usuario=JSON.parse($localStorage.usuario);
    $scope.idModalNuevoRecibo = 'dialog-nuevo-recibo';
    $scope.idModalChoferes = 'dialog-choferes';
    $scope.idModalVehiculos = 'dialog-vehiculos';
    $scope.idModalRutas = 'dialog-rutas';
	$scope.inicio=function(){
        $scope.verFiltros = false;
        let hoy = new Date()
        $scope.filtro = {
            inicio: fechaATexto(hoy.setDate(hoy.getDate() - 7)),
            fin: fechaATexto(new Date()),
            recibo:"",
            moneda:"TODOS",
            monto: "",
            chofer: "",
            vehiculo: "",
            estado: "TODOS",
            metodo_pago: "TODOS",
            banco: { id: 0, nombre:"TODOS" },
            bancoDestino: "",
            nro_cheque: "",
            sucursal: { id: 0, nombre:"TODOS" },
            usuario: { id: 0, nombre:"TODOS" },
        }
        $scope.cargarRecibos();
        $scope.listarBancos( "undefined", true);
        $scope.listarSucursales()
        $scope.listarUsuarios()
        
	}
    // INICIO RECIBOS
	$scope.abrirDialogNuevoRecibo = async (recibo, vista) => {
        $scope.modoVista = vista;
        $scope.totalDetalles = 0.00
        $scope.detallesEliminados = 0;
        if(recibo == undefined){
            $scope.recibo={
                metodo_pago:"EFECTIVO",
                moneda: true,
                fecha: fechaATexto(new Date()),
                nro_cheque: "",
                observacion: ""
            }
            $scope.detalles = []
            $scope.abrirPopup($scope.idModalNuevoRecibo);        
        }else{
            ObtenerReciboPorId(recibo.id)
            .then(async data => {
                $scope.recibo = data.recibo
                $scope.recibo.moneda = data.recibo.moneda.nombre_corto === "BOB" ? true : false;
                await $scope.listarBancos($scope.modoVista != undefined ? $scope.recibo.moneda : true);
                $scope.recibo.fecha = fechaATexto(data.recibo.fecha)
                $scope.recibo.metodo_pago = data.recibo.metodo_pago
                $scope.recibo.banco = data.recibo.banco
                $scope.recibo.bancoDestino = data.recibo.bancoPais;
                $scope.detalles = data.recibo.detalle
                if($scope.detalles.length > 0) $scope.calcularTotalDetalles();
                $scope.abrirPopup($scope.idModalNuevoRecibo);        
            })
        }
        $scope.concepto = { ruta:undefined, peso:undefined, unidad:'Kg', importe: undefined, descripcion_descuento: "", observacion:"" }
        $scope.bancoNoEncontrado = false
        $scope.bancoBuscado = ""
        $scope.rutaNoEncontrado = false
        $scope.rutaBuscado=""
    }
    $scope.cerrarDialogNuevoRecibo = () => {
        $scope.recibo = {}
        $scope.detalles = []
        $scope.totalDetalles = 0.00
        $scope.bancos.unshift({
            id: 0,
            nombre: "TODOS"
            
        })
        $scope.filtro.banco = $scope.bancos[0]
        $scope.cerrarPopup($scope.idModalNuevoRecibo);
    }
    $scope.agregarConcepto = (concepto) => {

        let errores = ''
        if(typeof concepto.ruta != "object") errores+="ruta no válida"
        if(!concepto.importe) errores+="<br>importe no válido"
        if(errores.length > 0) {
            SweetAlert.swal("", errores, "warning");
        }else{
            if($scope.indexDetalleEdicion >= 0){
                $scope.detalles[$scope.indexDetalleEdicion]=concepto
            }else{
                $scope.detalles.push(concepto);
            }
            $scope.indexDetalleEdicion = undefined
            $scope.concepto={}
           
        }
        if($scope.detalles.length > 0) $scope.calcularTotalDetalles();
        $scope.concepto = { ruta:undefined, peso:undefined, unidad:'Kg', importe: undefined, descripcion_descuento: "", observacion:"" }
    }
    $scope.cargarRecibos = () => {
        $scope.paginator = Paginator ();
        $scope.paginator.column = 'correlativo'
        $scope.paginator.direction = "desc";
        $scope.paginator.itemsPerPage = 10;
        $scope.paginator.filter = $scope.filtro
        $scope.paginator.callBack = $scope.obtenerRecibos;
        $scope.paginator.getSearch("", null, null);
    }
    $scope.obtenerRecibos = function (filtrar) {
        $scope.paginator.filtrar = filtrar
        ObtenerRecibos($scope.usuario.id_empresa, $scope.paginator)
        .then(data=>{
            if(!data.error){
                $scope.paginator.setPages(data.paginas);
                $scope.recibos = data.recibos;
            }else{
                SweetAlert.swal("", data.message, data.messageType);
            }
            
        })
    }
    $scope.capitalizar = function (texto) {
        texto = texto.toLowerCase();
        return texto[0].toUpperCase() + texto.substr(1);
    }
    $scope.guardarRecibo = (recibo) => {
        let errores = ''
        if(typeof recibo.chofer != "object") errores+="chofer no válido"
        if(typeof recibo.vehiculo != "object") errores+="<br>placa no válido"
        if(typeof recibo.banco != "object" && recibo.banco != undefined) errores+="<br>banco no válido"
        if(errores.length > 0) {
            SweetAlert.swal("Error", errores, "warning");
        }else{
            var hoy = new Date()
            let id_sucursal = 0
            if($scope.usuario.sucursalesUsuario.length == 1){
                id_sucursal = $scope.usuario.sucursalesUsuario[0].sucursal.id;
            }else{ 
                id_sucursal = $scope.usuario.sucursalesUsuario.filter(suc => suc.sucursal.numero == 0)[0].id_sucursal
            }
            GuardarEditarRecibo({
                id: recibo.id ? recibo.id : null,
                id_usuario: $scope.usuario.id,
                id_empresa: $scope.usuario.id_empresa,
                moneda: recibo.moneda,
                metodo_pago: recibo.metodo_pago,
                fecha: recibo.fecha ? recibo.fecha : null ,
                hora: " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds(),
                observacion: recibo.observacion ? recibo.observacion : null,
                chofer: recibo.chofer ? recibo.chofer.id : null,
                vehiculo: recibo.vehiculo ? recibo.vehiculo.id : null,
                sucursal : id_sucursal ? id_sucursal : null,
                banco: recibo.banco ? recibo.banco.id : null,
                banco_destino: recibo.bancoDestino ? recibo.bancoDestino.id : null,
                nro_cheque: recibo.nro_cheque ? recibo.nro_cheque : null,
                estado: recibo.estado ? recibo.estado.id : null,
                eliminado: recibo.eliminado ? recibo.eliminado : null,
                detalle: $scope.detalles
            })
            .then( data =>{
                if(!data.error) { 
                    if(data.id_recibo) $scope.generarPdfRecibo(data.id_recibo)
                    $scope.cargarRecibos();
                    $scope.recibo={
                        metodo_pago:"EFECTIVO",
                        moneda: true,
                        fecha: fechaATexto(new Date()),
                        cheque: "",
                        observacion: ""
                    }
                    $scope.concepto = { ruta:undefined, peso:undefined, unidad:'Kg', importe: undefined, descripcion_descuento: "", observacion:"" }
                    $scope.detalles=[]
                    $scope.totalDetalles = 0.00
                    if($scope.modoVista == false) $scope.cerrarDialogNuevoRecibo(); 
                } 
                SweetAlert.swal("", data.message, data.messageType);
            })

        }
    }
    $scope.bloquearRecibo = (recibo) => {
        SweetAlert.swal({
            title: "Confirme",
            text: "Esta seguro de cerrar este recibo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                EliminarRecibo(recibo.id, 0)
                .then(data => {
                    SweetAlert.swal("", data.message, data.messageType);
                    $scope.cargarRecibos();
                })
            }
        });
    }
    $scope.generarPdfRecibo = (id_recibo) => {
        if(id_recibo){
            ObtenerReciboPorId(id_recibo)
            .then(async data => {
                if(!data.error){
                    const { detalle, usuario, moneda, chofer, vehiculo, banco, bancoPais } = data.recibo
                    const recibo = data.recibo
                    await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenLg) {
                        var doc = new PDFDocument({compress: false, size: 'letter', margin: 10 });
                        var stream = doc.pipe(blobStream());
                        var y = 30, x = 40
                        // cabecera recibo
                        doc.lineGap(-1.5)
                        doc.font('Helvetica-Bold', 13).text("COMPROBANTE DE PAGO", 0, y, { align: 'center'}); y += 14;
                        doc.text(recibo.correlativo ? "N°: "+recibo.correlativo : 'N°: ', 515, y - 3)
                        doc.font('Helvetica-Bold', 11).text("SERVICIO DE TRANSPORTE", 0, y, {align: 'center'}); y += 35;
                        var yInicio = y;
                        doc.font('Helvetica-Bold', 8 ).text("CANCELADO A: ", x, y)
                        doc.font('Helvetica', 8 ).text(chofer ? chofer.persona ? chofer.persona.nombre_completo.toUpperCase() : '' : '', x + 65, y, { width: 131})
                        doc.font('Helvetica-Bold', 8 ).text("PLACA: ", 237, y)
                        doc.font('Helvetica', 8 ).text(vehiculo ? vehiculo.placa ? vehiculo.placa.toUpperCase() : '' : '', 217 + 55, y)
                        doc.font('Helvetica-Bold', 8 ).text("FECHA: ", 394, y);
                        doc.font('Helvetica', 8 ).text(recibo.fecha ? $scope.fechaATexto(recibo.fecha) : '', 430, y); y += 16;
                        doc.font('Helvetica-Bold', 8 ).text("MÉTODO DE PAGO: ", x, y);
                        doc.font('Helvetica', 8 ).text(recibo.metodo_pago ? recibo.metodo_pago : '', x + 85, y);
                        if(recibo.metodo_pago == "CHEQUE"){
                            doc.font('Helvetica-Bold', 8 ).text("CHEQUE N°: ", 237, y);
                            doc.font('Helvetica', 8 ).text(recibo.nro_cheque ? recibo.nro_cheque : '', 290, y);
                            doc.font('Helvetica-Bold', 8 ).text("BANCO: ", 394, y);
                            doc.font('Helvetica', 8 ).text(banco ? banco.nombre.toUpperCase() : '', 430, y, { width: 141}); 
                        }
                        if(recibo.metodo_pago == "TRANSFERENCIA"){
                            doc.font('Helvetica-Bold', 8 ).text("BANCO ORIGEN: ", 237, y);
                            doc.font('Helvetica', 8 ).text(banco ? banco.nombre.toUpperCase() : '', 305, y, {width: 88})
                            doc.font('Helvetica-Bold', 8 ).text("BANCO DESTINO: ", 394, y);
                            doc.font('Helvetica', 8 ).text(bancoPais ? bancoPais.nombre.toUpperCase() : '', 465, y, { width: 106});
                        }
                        y += 20;
                        doc.lineWidth(1).rect(x, y - 3, 532, 0).stroke();
                        doc.font('Helvetica-Bold', 9).text("RUTA", x, y, { width: 130, align: 'center'})
                        doc.font('Helvetica-Bold', 9).text("PESO", 170, y, { width: 50, align: 'center'})
                        doc.font('Helvetica-Bold', 9).text("UNID.", 220, y, { width: 35, align: 'center'})
                        doc.font('Helvetica-Bold', 9).text("DESCUENTO", 255, y, { width: 257, align: 'center'})
                        if(moneda.nombre_corto =="BOB") doc.font('Helvetica-Bold', 9).text("Bs.", 512, y, { width: 60, align: 'center'}); 
                        if(moneda.nombre_corto =="SUS") doc.font('Helvetica-Bold', 9).text("$us.", 512, y, { width: 60, align: 'center'}); 
                        doc.lineWidth(1).rect(x, y + 10 , 532, 0).stroke();
                        // cuerpo recibo
                        doc.font('Helvetica', 8)
                        y += 14;
                        var total = 0;
                        for (let i = 0; i < detalle.length; i++) {
                            const registro = detalle[i];
                            doc.text(registro.ruta ? registro.ruta.origen ? registro.ruta.destino ?  $scope.capitalizar(registro.ruta.origen)+"-"+ $scope.capitalizar(registro.ruta.destino) : '' : '' : '', x+4, y, { width: 130})
                            doc.text(registro.peso ? number_format_negativo_to_positvo(registro.peso, 2) : '', 170, y, { width: 50, align: 'right'})
                            doc.text(registro.unidad ? registro.unidad : '', 222, y, { width: 33, align: 'left'})
                            doc.text(registro.importe ? number_format_negativo_to_positvo(registro.importe, 2) : '', 512, y, { width: 60, align: 'right'});
                            if(registro.descripcion_descuento){
                                doc.text($scope.capitalizar(registro.descripcion_descuento), 255, y, { width: 257})
                                registro.descripcion_descuento.length > 68 ? y += 6 : ''
                            }else{ doc.text('', 255, y, { width: 257}) }
                            y += 14;
                            if(registro.observacion){
                                doc.font('Helvetica-Bold', 8).text("Observación: ", x + 4, y)
                                doc.font('Helvetica', 8).text("                        " + $scope.capitalizar(registro.observacion), x + 4, y, { width: 528})
                                registro.observacion.length > 138 ?  y += 20 : y += 14;
                            }
                            total += registro.importe;
                            doc.lineWidth(0.4).rect(x, y - 3, 532, 0).stroke();
                        }
                        doc.font('Helvetica-Bold', 8).text("TOTAL", 319, y, { width: 190, align: 'right'})
                        doc.text(total ? number_format_negativo_to_positvo(total, 2) : '', 512, y, { width: 60, align: 'right'});
                        y += 12;
                        doc.font('Helvetica', 8)
                        let literal =  ConvertirALiteral(total.toFixed(2)).split("BOLIVIANOS")[0];
                        if(moneda.nombre_corto =="BOB") doc.font('Helvetica', 9).text("Bolivianos: " + $scope.capitalizar(literal), x, y, { width: 532})
                        if(moneda.nombre_corto =="SUS") doc.font('Helvetica', 9).text("Dólares: " + $scope.capitalizar(literal), x, y, { width: 532})
                        // pie de pagina recibo
                        y += 60;
                        doc.font('Helvetica-Bold', 8)
                        doc.text("ENTREGUE CONFORME", 0, y, { align: 'center', width: 306 })
                        doc.text("RECIBÍ CONFORME", 306, y, { align: 'center', width: 306 })
                        doc.font('Helvetica', 8)
                        let nombre = $scope.usuario.persona 
                            ? usuario.persona.nombres 
                            ? usuario.persona.apellido_paterno 
                            ? usuario.persona.apellido_materno 
                            ?  usuario.persona.nombres+" "+usuario.persona.apellido_paterno+" "+usuario.persona.apellido_materno
                            : usuario.persona.nombres
                            : ''
                            : ''
                            : ''
                        y += 10;
                        doc.text(nombre ? nombre.toUpperCase() : '', 0, y, { width: 306, align:"center"})
                        doc.text(chofer.persona ? chofer.persona.nombre_completo.toUpperCase() : '', 306, y, { width: 306, align:"center"})
                        y += 14
                        let metaData =  "Creado por: "+ usuario.nombre_usuario + 
                                        "         Fecha Creación: "+$scope.convertirFechaHora(recibo.createdAt)  +  
                                        "         Fecha Modificación: "+$scope.convertirFechaHora(recibo.updatedAt) + 
                                        "         Fecha Impresión: "+ $scope.convertirFechaHora(new Date()) + 
                                        "         Emitido por: "+ $scope.usuario.nombre_usuario;
                        doc.font('Helvetica', 4);
                        doc.text(metaData, 0, y, {width: 612, align: 'center'})
                        if(recibo.eliminado){
                            var dx = x - 572;
                            var dy = 30 - y;
                            var angulo = Math.atan2(-dy, -dx);
                            angulo *= 180 / Math.PI;
                            if(angulo < 0) angulo +=360;
                            var ancho = Math.sqrt((532*532) + (y-30)*(y-30))
                            doc.opacity(0.2).fill('red').fillOpacity(0.3).rotate(-angulo, {origin: [x,y]}).font("Helvetica-Bold", 42).text("ANULADO", x, y, {width: ancho, align:"center" });
                            doc.rotate(0, {origin: [0,0]})
                        }
                        blockUI.stop();
                        doc.end();
                        stream.on('finish', function () {
                            var fileURL = stream.toBlobURL('application/pdf');
                            window.open(fileURL, '_blank', 'location=no');
                        });
                    }); 
                }else{
                    SweetAlert.swal("", data.message, data.messageType);
                }
            })
        }else{
            SweetAlert.swal("ERROR", "ID recibo no válido", "danger");
        }
    }
    $scope.deleteRecibo = (recibo) => {
        SweetAlert.swal({
            title: "Confirme",
            text: "Esta seguro de anular este recibo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                EliminarRecibo(recibo.id, 1)
                .then(data => {
                    SweetAlert.swal("", data.message, data.messageType);
                    $scope.cargarRecibos();
                })
            }
        });
    }
    $scope.addToEditDetalle = (detalle, i)=>{
        $scope.indexDetalleEdicion = i;
        $scope.concepto=detalle
    }
    $scope.deleteDetalle = (detalle, i) => {
        SweetAlert.swal({
            title: "Confirme",
            text: "Esta seguro de eliminar este detalle?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                if(detalle.id){
                    $scope.detallesEliminados++;
                    $scope.detalles[i].eliminado = true;
                }else{
                    $scope.detalles.splice(i,1);
                }
            }
            if($scope.detalles.length > 0) $scope.calcularTotalDetalles();
        });
       
    }
    $scope.calcularTotalDetalles = () =>{
        $scope.totalDetalles = $scope.detalles.reduce((total, detalle, i) => detalle.eliminado != true ? total += detalle.importe : total += 0 ,0)
    }
    $scope.asignarBancosEmpresa = () => {
        if($scope.recibo.metodo != "EFECTIVO") $scope.listarBancos($scope.recibo.moneda, false)
        if($scope.recibo.metodo != "CHEQUE") $scope.recibo.nro_cheque = "";
        if($scope.recibo.metodo != "TRANSFERENCIA") $scope.recibo.bancoDestino = "";
    }
    $scope.listarChoferes = (texto, lista) => {
        $scope.choferNoEncontrado = false
        $scope.choferBuscado = ""
        return BuscarChoferPorNombre($scope.usuario.id_empresa, texto)
        .then(data=>{
            lista ? $scope.filtro.chofer = "" : $scope.recibo.chofer = ""
            if(data.length == 0){
                $scope.choferBuscado = texto
                $scope.choferNoEncontrado = true
            }
            return data;
        })
    }
    $scope.listarVehiculos = (texto, lista) => {
        $scope.placaNoEncontrado = false
        $scope.placaBuscado = ""
        return BuscarVehiculoPorPlaca($scope.usuario.id_empresa, texto)
        .then(data=>{
            lista ? $scope.filtro.vehiculo = "" : $scope.recibo.vehiculo = ""
            if(data.length == 0){
                $scope.placaBuscado = texto
                $scope.placaNoEncontrado = true
            }
            return data;
        })
    }
    $scope.listarRutas = (texto) => {
        $scope.rutaNoEncontrado = false;
        $scope.rutaBuscado = ""
        return BuscarRutaPorNombre($scope.usuario.id_empresa, texto)
        .then(data=>{
            $scope.concepto.ruta=""
            if(data.length == 0){
                $scope.rutaBuscado = texto
                $scope.rutaNoEncontrado = true
            }
            return data;
        })
    }
    $scope.listarBancos = (moneda, lista ) => {
        BuscarBancosEmpresa($scope.usuario.id_empresa, moneda)
        .then(data => {
            if(!data.error){
                $scope.bancos = data.bancos
                if($scope.bancos.length > 0) {
                    if(($scope.modoVista == undefined || $scope.modoVista == false) && !lista) {
                        $scope.recibo.banco = $scope.bancos[0];
                    }else{
                        $scope.bancos.unshift({
                            id: 0,
                            nombre: "TODOS"
                            
                        })
                        $scope.filtro.banco = $scope.bancos[0];
                    }
                }
            }else{ 
                $scope.bancos = []
                SweetAlert.swal("", data.message, data.messageType);
            }
        })
    }
    $scope.listarBancosDestino = (texto, lista) => {
        $scope.bancoNoEncontrado = false;
        $scope.bancoBuscado = ""
        return BuscarBancoDestinoPorNombre(texto)
        .then(data=>{
            lista ? $scope.filtro.bancoDestino = "" : $scope.recibo.bancoDestino = "";
            if(data.length == 0){
                $scope.bancoBuscado = texto;
                $scope.bancoNoEncontrado = true;
            }
            return data
        })
    }
    $scope.listarSucursales = () => {
        ObtenerSucursalesEmpresa($scope.usuario.id_empresa)
        .then(data => {
            if(!data.error){
                $scope.sucursales = data.sucursales
                $scope.sucursales.unshift({id:0, nombre:"TODOS"})
                $scope.filtro.sucursal = $scope.sucursales[0];
            }else{ 
                $scope.sucursales = []
                SweetAlert.swal("", data.message, data.messageType);
            }
        })
    }
    $scope.listarUsuarios = () => {
        ObtenerUsuariosEmpresa($scope.usuario.id_empresa)
        .then(data => {
            if(!data.error){
                $scope.usuarios = data.usuarios
                $scope.usuarios.unshift({id: 0, nombre_usuario:"TODOS"})
                $scope.filtro.usuario = $scope.usuarios[0];
            }else{ 
                $scope.usuarios = []
                SweetAlert.swal("", data.message, data.messageType);
            }
        })
    }
    $scope.establecerChofer = function (chofer, lista) {
        lista ? $scope.filtro.chofer = chofer :$scope.recibo.chofer = chofer;
    }
    $scope.establecerVehiculo = function (vehiculo, lista) {
        lista ? $scope.filtro.vehiculo = vehiculo : $scope.recibo.vehiculo = vehiculo;
    }
    $scope.establecerBanco = function (banco, lista) {
       lista ?  $scope.filtro.bancoDestino = banco :  $scope.recibo.bancoDestino = banco;
    }
    $scope.establecerRuta = function (ruta) {
        $scope.concepto.ruta = ruta;
        $scope.concepto.importe = ruta.costo;
    }
    $scope.configurarColumnasListaRecibos = () => {
        $scope.fieldViewer = FieldViewer({
            crear: false,
            id_empresa: $scope.usuario.id_empresa,
            configuracion: {
                fecha: { value: "Fecha", show: true },
                correlativo: { value: "Recibo", show: true },
                monto: { value: "Monto", show: true },
                chofer: { value: "Chofer", show: true },
                placa: { value: "Placa", show: true },
                metodo_pago: { value: "Método Pago", show: true },
                banco: { value: "Banco Origen", show: true },
                banco_destino: { value: "Banco Destino", show: true },
                nro_cheque: { value: "Cheque", show: true },
                sucursal: { value: "Sucursal.", show: true },
                usuario: { value: "Usuario", show: true },
                estado: { value: "Estado", show: true }
            }
        }, $scope.aplicacion.aplicacion.id);
        $scope.fieldViewer.updateObject();
    }
    $scope.reporteRecibosPdf = (filtro) => {
        if(filtro.inicio.length == 10 && filtro.fin.length == 10){
            var desde = $scope.fechaATexto(filtro.inicio)
            var hasta = $scope.fechaATexto(filtro.fin)
            GetRecibosReporte($scope.usuario.id_empresa, filtro)
            .then(async data => {
                if(!data.error){
                    if(data.recibos.length >0){
                        await convertUrlToBase64Image($scope.usuario.empresa.imagen, async function (imagenLg) {
                            var doc = new PDFDocument({compress: false, size: 'letter', margin: 10 });
                            var stream = doc.pipe(blobStream());
                            doc.lineGap(-1.5)
                            var y = 105, items = 0, itemsPorPagina = 50, pagina = 1, paginas=Math.ceil(data.recibos.length/itemsPorPagina);
                            $scope.cabeceraReporteRecibosPdf(doc, imagenLg, desde, hasta, pagina, paginas, filtro)
                            doc.font('Helvetica', 6)
                            for (let i = 0; i < data.recibos.length; i++) {
                                const { fecha, correlativo, obs_recibo, nombre_chofer, placa, ruta_detalle, peso, unidad, importe, descuento, obs_detalle, metodo_pago, nombre_moneda, banco_origen, cuenta_origen, banco_destino, nro_cheque, nombre_estado, nombre_usuario } = data.recibos[i]
                                doc.text(i + 1, 32, y + 3);
                                doc.text(fecha ? $scope.fechaATexto(fecha) : '', 57, y + 3);
                                doc.text(correlativo ? correlativo : "", 94, y + 3);
                                doc.text(nombre_chofer ? nombre_chofer.toUpperCase() : '', 122, y + 3, {width:128});
                                doc.text(placa ? placa.toUpperCase() : '', 254, y + 3);
                                doc.text(ruta_detalle ? ruta_detalle.toUpperCase() : '', 292, y + 3, {width: 100});
                                doc.text(importe ? number_format_negativo_to_positvo(importe,2): '', 394, y + 3, {width: 38, align:'right'});
                                doc.text(metodo_pago ? metodo_pago : '', 435, y + 3);
                                doc.text(nombre_moneda ? nombre_moneda : '', 495, y + 3);
                                doc.text(nombre_estado ? nombre_estado : '', 535, y + 3, { width: 50, align: 'center' });
                                doc.lineWidth(0.1).rect(30, y, 552, 0).stroke()
                                items++
                                if (items == itemsPorPagina) {
                                    doc.lineWidth(0.4).rect(30, y + 12, 552, 0).stroke()
                                    doc.addPage({ size: [612, 792], margin: 10 });
                                    y = 105;
                                    items = 0;
                                    pagina = pagina + 1;
                                    $scope.cabeceraReporteRecibosPdf(doc, imagenLg, desde, hasta, pagina, paginas, filtro);
                                    doc.font('Helvetica', 6)
                                }else{
                                    y+=12;
                                }
                            }
                            doc.lineWidth(0.4).rect(30, y, 552, 0).stroke()
                            blockUI.stop();
                            doc.end();
                            stream.on('finish', function () {
                                var fileURL = stream.toBlobURL('application/pdf');
                                window.open(fileURL, '_blank', 'location=no');
                            });
                        }); 
                    }else{ SweetAlert.swal("", "La empresa no tiene recibos registrados", "warning")}
                }else{ SweetAlert.swal("", data.message, data.messageType)}
            })
        }else{ SweetAlert.swal("", "Fechas no válidas", "warning")}
    }
    $scope.reporteRecibosExcel = (filtro) => {
        if(filtro.inicio.length == 10 && filtro.fin.length == 10){
            GetRecibosReporte($scope.usuario.id_empresa, filtro)
            .then(data => {
                if(!data.error){
                    if(data.recibos.length >0){
                        var datos = [["NRO", "FECHA", "CORRELATIVO", "OBSERVACION RECIBO", "CHOFER", "PLACA", "RUTA", "PESO", "UNIDAD", "IMPORTE", "DESCUENTO", "OBSERVACION DETALLE", "MÉTODO DE PAGO", "MONEDA", "BANCO ORIGEN", "NRO CUENTA ORIGEN","BANCO DESTINO", "NRO CHEQUE", "ESTADO", "SUCURSAL", "USUARIO"]]
                        for (let i = 0; i < data.recibos.length; i++) {
                            const { banco_origen, banco_destino, nombre_chofer, correlativo, nombre_estado, fecha, metodo_pago, nombre_moneda, nro_cheque, obs_recibo, nombre_sucursal, nombre_usuario, placa, ruta_detalle, peso, unidad, importe, descuento, obs_detalle, cuenta_origen,} = data.recibos[i];
                            datos.push([
                                i+1,
                                fecha ? $scope.fechaATexto(fecha): '',
                                correlativo ? correlativo : '',
                                obs_recibo ? obs_recibo : '',
                                nombre_chofer ? nombre_chofer.toUpperCase() : '',
                                placa ? placa : '',
                                ruta_detalle ? ruta_detalle.toUpperCase() : '',
                                peso ? peso : '',
                                unidad ? unidad : '',
                                importe ? importe : '',
                                descuento ? descuento : '',
                                obs_detalle ? obs_detalle : '',
                                metodo_pago ? metodo_pago : '',
                                nombre_moneda ? nombre_moneda : '',
                                banco_origen ? banco_origen : '',
                                cuenta_origen ? cuenta_origen : '',
                                banco_destino ? banco_destino : '',
                                nro_cheque ? nro_cheque : '',
                                nombre_estado ? nombre_estado : '',
                                nombre_sucursal ? nombre_sucursal : '',
                                nombre_usuario ? nombre_usuario : ''

                            ])
                        }
                        var ws_name = "SheetJS";
						var wb = new Workbook(), ws = sheet_from_array_of_arrays(datos);
						wb.SheetNames.push(ws_name);
						wb.Sheets[ws_name] = ws;
						var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
						var filesaver = saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "REPORTE DE RECIBOS.xlsx");
						filesaver.onwriteend = function() { 
							swal.close();
						}
                    }else{ SweetAlert.swal("", "La empresa no tiene recibos registrados", "warning")}
                }else{ SweetAlert.swal("", data.message, data.messageType)}
            })
        }else{ SweetAlert.swal("", "Fechas no válidas", "warning")}
    }
    $scope.cabeceraReporteRecibosPdf = (doc, logo, desde, hasta, pagina, paginas, filtro) => {
        var { recibo, moneda, monto, chofer, vehiculo, estado, metodo_pago, banco, bancoDestino, nro_cheque, sucursal, usuario } = filtro
        if(logo != "error") doc.image(logo, 30, 20 , { width: 95, height:60})
        doc.font('Helvetica-Bold', 10).text("REPORTE DE PAGOS", 0, 50, { align: 'center'});
        doc.font('Helvetica-Bold', 6).text("Del "+desde + " al "+hasta, 0, 60, {align: 'center'});
        doc.font('Helvetica-Bold', 7)
        doc.text('N°', 30, 94, {width:25, align: 'center'})
        doc.text('FECHA', 55, 94, {width:35, align: 'center'})
        doc.text('N° RECIBO', 90, 90, {width:30, align: 'center'})
        doc.text('CHOFER', 120, 94, {width:130, align: 'center'})
        doc.text('PLACA', 250, 94, {width:40, align: 'center'})
        doc.text('RUTA', 290, 94, {width:102, align: 'center'})
        doc.text('IMPORTE', 392, 94, {width:40, align: 'center'})
        doc.text('MÉTODO DE PAGO', 432, 90, {width:60, align: 'center'})
        doc.text('MONEDA', 492, 94, {width:40, align: 'center'})
        doc.text('ESTADO', 532, 94, {width:50, align: 'center'})

        doc.lineWidth(0.4).rect(30, 87, 552, 18).stroke();
        doc.rect(55, 87, 0, 18).stroke()
        doc.rect(90, 87, 0, 18).stroke()
        doc.rect(120, 87, 0, 18).stroke()
        doc.rect(250, 87, 0, 18).stroke()
        doc.rect(290, 87, 0, 18).stroke()
        doc.rect(392, 87, 0, 18).stroke()
        doc.rect(432, 87, 0, 18).stroke()
        doc.rect(492, 87, 0, 18).stroke()
        doc.rect(532, 87, 0, 18).stroke()

        doc.font('Helvetica-Bold', 6).text(pagina + " de "+ paginas , 0, 750, {width: 612, align: 'center'})
        let metaData =  "" ;
        if(recibo) metaData += "     Recibo: "+recibo
        if(moneda != "TODOS") metaData += moneda == "true" ? "     Moneda: Bs." : "     Moneda: $us"
        if(monto) metaData += "     Monto: "+monto
        if(chofer) metaData += chofer.persona ? "     Chofer: "+chofer.persona.nombre_completo : ''
        if(vehiculo) metaData += vehiculo.placa ? "     Placa: "+vehiculo.placa : ''
        if(estado != "TODOS") metaData += "     Estado: "+estado
        if(metodo_pago != "TODOS") metaData += "     Método Pago: "+metodo_pago
        if(banco.id != 0) metaData += "     Banco Origen: "+banco.nombre
        if(bancoDestino) metaData += bancoDestino.nombre ? "     Banco Destino: "+bancoDestino.nombre:''
        if(nro_cheque) metaData += "     Cheque: "+nro_cheque
        if(sucursal.id != 0) metaData += sucursal.nombre ? "     Sucursal: "+sucursal.nombre: ''
        if(usuario.id != 0) metaData += usuario.nombre_usuario ? "     Usuario: "+usuario.nombre_usuario:''
        if(metaData.length>0) metaData += "           "
        metaData +="Fecha Impresión: "+ $scope.convertirFechaHora(new Date());
        metaData += "     Emitido por: "+ $scope.usuario.nombre_usuario;
        doc.font('Helvetica', 4).text(metaData, 0, 760, {width: 612, align: 'center'})
    }
    // FIN RECIBOS

    // INICIO CHOFERES
    $scope.abrirDialogChoferes = () => {
        $scope.edicion=false;
        var promesa = ClasesTipo("LICOND");
        promesa.then(function (entidad) {
            $scope.categorias = entidad.clases
            if(entidad.clases.length > 0){
                $scope.chofer={}
                $scope.chofer.categoria = $scope.categorias[0]
                $scope.cargarChoferes();
                $scope.abrirPopup($scope.idModalChoferes);
            }else{
                SweetAlert.swal("", "La empresa no tiene cargada las categorias de conducción", "error");
            }
        });
        blockUI.stop();
    }
    $scope.guardarChofer = () => {
        $scope.edicion=false;
        $scope.chofer.id_empresa = $scope.usuario.id_empresa;
        GuardarEditarChofer($scope.chofer)
        .then(data=>{
            if(!data.error) { 
                $scope.cargarChoferes();
                $scope.chofer={}
            }
            $scope.chofer.categoria = $scope.categorias[0]
            SweetAlert.swal("", data.message, data.messageType);
        })
    }
    $scope.cargarChoferes = ()=>{
        ObtenerChoferes($scope.usuario.id_empresa)
        .then(data=>{
            $scope.choferes=data.choferes;
        })
    }
    $scope.addToEdit = (chofer)=>{
        $scope.edicion=true;
        $scope.chofer={
            nombre_completo:chofer.persona ? chofer.persona.nombre_completo : '',
            ci:chofer.persona ? chofer.persona.ci : null,
            categoria:chofer.categoria ? chofer.categoria: null,
            direccion:chofer.persona ? chofer.persona.direccion : null,
            licencia:chofer.vencimiento ? fechaATexto(chofer.vencimiento) : null,
            telefono:chofer.persona ? chofer.persona.telefonos.length > 0 ? chofer.persona.telefonos[0].numero : '': '',
            id:chofer.id ? chofer.id: null,
            id_telefono:chofer.persona ? chofer.persona.telefonos.length > 0 ? chofer.persona.telefonos[0].id : null : null,
            id_persona:chofer.persona ? chofer.persona.id : null,
        };
    }
    $scope.deleteChofer = (chofer) => {
       if(chofer.id && chofer.persona.id){
        SweetAlert.swal({
            title: "Confirme",
            html: "Esta seguro de eliminar al chofer <strong>"+chofer.persona.nombre_completo+"</strong> del sistema?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                EliminarChofer(chofer.id, chofer.persona.id)
                .then(data=>{
                    if(!data.error) $scope.cargarChoferes();
                    SweetAlert.swal("", data.message, data.messageType);
                })
            }
        });
        
       }  
    }
    $scope.cerrarDialogChoferes = () => {
        $scope.choferes={}
        $scope.cerrarPopup($scope.idModalChoferes);
    }
    //FIN CHOFERES

    // INICIO VEHICULOS
    $scope.abrirDialogVehiculos = () => {
        $scope.edicion=false;
        $scope.vehiculo={}
        $scope.cargarVehiculos();
        $scope.abrirPopup($scope.idModalVehiculos);
    }
    $scope.guardarVehiculo = () => {
        $scope.edicion=false;
        $scope.vehiculo.id_empresa = $scope.usuario.id_empresa;
        GuardarEditarVehiculo($scope.vehiculo)
        .then(data=>{
            if(!data.error) { 
                $scope.cargarVehiculos();
                $scope.vehiculo={}
            }
            SweetAlert.swal("", data.message, data.messageType);
        })
    }
    $scope.cargarVehiculos = ()=>{
        ObtenerVehiculos($scope.usuario.id_empresa)
        .then(data=>{
            $scope.vehiculos=data.vehiculos;
        })
    }
    $scope.addToEditVehiculo = (vehiculo)=>{
        $scope.edicion=true;
        $scope.vehiculo={
            placa: vehiculo.placa ? vehiculo.placa: null,
            marca: vehiculo.marca ? vehiculo.marca : null,
            modelo: vehiculo.modelo ? vehiculo.modelo : null,
            capacidad: vehiculo.capacidad ? vehiculo.capacidad : null,
            id: vehiculo.id ? vehiculo.id : null,
            id_empresa: vehiculo.id_empresa
        };
    }
    $scope.deleteVehiculo = (vehiculo) => {
       if(vehiculo.id){
        SweetAlert.swal({
            title: "Confirme",
            html: "Esta seguro de eliminar el vehículo con placa <strong>"+vehiculo.placa+"</strong> del sistema?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                EliminarVehiculo(vehiculo.id)
                .then(data=>{
                    if(!data.error) $scope.cargarVehiculos();
                    SweetAlert.swal("", data.message, data.messageType);
                })
            }
        });
        
       }  
    }
    $scope.cerrarDialogVehiculos = () => {
        $scope.vehiculos={}
        $scope.cerrarPopup($scope.idModalVehiculos);
    }
    // FIN DE VEHÍCULOS

    //INICIO RUTAS
    $scope.abrirDialogRutas = () => {
        $scope.ruta={}
        $scope.cargarRutas();
        $scope.abrirPopup($scope.idModalRutas);
    }
    $scope.guardarRuta = () => {
        $scope.edicion=false;
        $scope.ruta.id_empresa = $scope.usuario.id_empresa;
        GuardarEditarRuta($scope.ruta)
        .then(data=>{
            if(!data.error) { 
                $scope.cargarRutas();
                $scope.ruta={}
            }
            SweetAlert.swal("", data.message, data.messageType);
        })
    }
    $scope.cargarRutas = ()=>{
        ObtenerRutas($scope.usuario.id_empresa)
        .then(data=>{
            $scope.rutas = data.rutas;
        })
    }
    $scope.addToEditRuta = (ruta)=>{
        $scope.edicion=true;
        $scope.ruta={
            origen: ruta.origen ? ruta.origen: null,
            destino: ruta.destino ? ruta.destino : null,
            costo: ruta.costo ? ruta.costo.toString() : null,
            id_empresa: $scope.usuario.id_empresa,
            id: ruta.id
        };
    }
    $scope.deleteRuta = (ruta) => {
       if(ruta.id){
        SweetAlert.swal({
            title: "Confirme",
            html: "Esta seguro de eliminar la ruta <strong>"+ruta.origen+" - "+ruta.destino+"</strong> del sistema?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then(function (result) {
            if (result.value) {
                EliminarRuta(ruta.id)
                .then(data=>{
                    if(!data.error) $scope.cargarRutas();
                    SweetAlert.swal("", data.message, data.messageType);
                })
            }
        });
        
       }  
    }
    $scope.cerrarDialogRutas = () => {
        $scope.rutas={}
        $scope.cerrarPopup($scope.idModalRutas);
    }
    // FIN RUTAS
    $scope.$on('$routeChangeStart', function(next, current) { 
        $scope.eliminarPopup($scope.idModalNuevoRecibo);
        $scope.eliminarPopup($scope.idModalChoferes);
        $scope.eliminarPopup($scope.idModalVehiculos);
        $scope.eliminarPopup($scope.idModalRutas);
        $scope.recibos = {}
        $scope.filtro = {}
	});
    $scope.inicio();

}]);



