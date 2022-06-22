angular.module('agil.controladores')

	.controller('controladoresConfiguracionesFacturacion', ['$scope', '$localStorage', '$location', '$templateCache', '$route', 'blockUI', 'SweetAlert', 'GetPosConfigs', 'SavePosConfigs', 'ObtenerActividadesEconomicas', 'ObtenerLeyendas', 'ObtenerTiposEmision', 'ObtenerTiposFactura', 'ObtenerDocumentosSector', 'ObtenerTiposMoneda', 'ObtenerTiposMetodoPago', function ($scope, $localStorage, $location, $templateCache, $route, blockUI, SweetAlert, GetPosConfigs, SavePosConfigs, ObtenerActividadesEconomicas, ObtenerLeyendas, ObtenerTiposEmision, ObtenerTiposFactura, ObtenerDocumentosSector, ObtenerTiposMoneda, ObtenerTiposMetodoPago ) {
		$scope.usuario = JSON.parse($localStorage.usuario);
		$scope.$on('$routeChangeStart', function (next, current) {
            delete $scope.actividades
            delete $scope.emisiones
            delete $scope.facturas
            delete $scope.metodos
            delete $scope.monedas
            delete $scope.sectores
		});

		$scope.inicio = async () => {
            $scope.catalogo = {}
            $scope.cfg = {}
            try {
                $scope.sucursalUsuario = $scope.obtenerSucursalUsuario( $scope.usuario.sucursalesUsuario )
                SweetAlert.swal({
                    html: `<small><b>Obteniendo configuraciones facturación</b></br>Espere porfavor...</small>`,
                    icon: 'info',
                    iconHtml: '<i class="fa fa-info-circle size-icon"></i>',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    //showConfirmButton: false,
                })
                SweetAlert.showLoading()
                blockUI.noOpen = true;
                let pos = await $scope.obtenerConfiguracionPuntoVenta($scope.sucursalUsuario.id, 0 )
                console.log('pos', pos);
                SweetAlert.swal({
                    html: pos.error ? pos.message : `<small><b>Obteniendo catálogos facturación</b></br>Espere porfavor...</small>`,
                    icon: `${ pos.error ? 'error' : 'info'}`,
                    iconHtml: `<i class="fa ${ pos.error ? 'fa-exclamation-triangle' : 'fa-info-circle' } size-icon"></i>`,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    //showConfirmButton: false,
                })
                SweetAlert.showLoading()

                if(pos.error) return
                let catalogos = await $scope.obtenerCatalogos($scope.sucursalUsuario.id_empresa, $scope.sucursalUsuario.id)
                console.log('catalogos', catalogos);
                if(catalogos.error){
                    SweetAlert.hideLoading()
                    SweetAlert.update({
                        html: catalogos.message ,
                        icon:  'error',
                        iconHtml: '<i class="fa fa-exclamation-triangle size-icon"></i>',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                    });
                }else{
                    $scope.catalogo.actividad = $scope.actividades[0]
                    $scope.catalogo.emision = $scope.emisiones[0]
                    $scope.catalogo.factura = $scope.facturas[0]
                    $scope.catalogo.metodo = $scope.metodos[0]
                    $scope.catalogo.moneda = $scope.monedas[0]
                    $scope.catalogo.sector = $scope.sectores[0]
                    swal.close();
                }
            } catch (e) {
               console.error(e); 
            }
		}

		$scope.$on('$viewContentLoaded', function () {
			resaltarPestaña($location.path().substring(1));
			
			$scope.buscarAplicacion($scope.usuario.aplicacionesUsuario, $location.path().substring(1));
			blockUI.stop();
		});

        $scope.obtenerConfiguracionPuntoVenta = ( id_sucursal, codigo_pos ) => {
            return new Promise( async ( resolve, reject ) => {
               try {
                    let { error, message, data } = await GetPosConfigs( id_sucursal, codigo_pos)
                    if( error ) return resolve({ error, message:"<small><b>ERROR AL OBTENER CONFIGURACIONES POS</b></br>"+message+"</br>Vuelva a intentarlo mas tarde.</small>" })
                    return resolve({ error: false, data })
               } catch (e) {
                   console.log(e);
                   return resolve({ error: true, message: "<small><b>ERROR AL OBTENER CONFIGURACIONES POS</b></br>"+ e.message+"</br>Vuelva a intentarlo mas tarde.</small>" })
               }
            })
        }
        $scope.obtenerCatalogos = ( id_empresa, id_sucursal ) => {
            return new Promise( async( resolve, reject ) => {
                try {
                    let actividades = await ObtenerActividadesEconomicas(id_empresa, id_sucursal);
                    if( actividades.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER ACTIVIDADES</b></br>"+ actividades.message +"<small>"})
                    $scope.actividades = actividades.data
                    console.log('$scope.actividades', $scope.actividades);
                    /* let leyendas = await ObtenerLeyendas( id_empresa );
                    if( leyendas.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER LEYENDAS</b></br>"+ leyendas.message +"<small>"})
                    $scope.leyendas = leyendas.data
                    console.log('$scope.leyendas', $scope.leyendas); */
                    let emisiones = await ObtenerTiposEmision(id_empresa, id_sucursal);
                    if( emisiones.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER TIPOS DE EMISIÓN</b></br>"+ emisiones.message +"<small>"})
                    $scope.emisiones = emisiones.data
                    console.log('$scope.emisiones', $scope.emisiones);
                    let facturas = await ObtenerTiposFactura(id_empresa, id_sucursal);
                    if( facturas.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER TIPOS DE FACTURAS</b></br>"+ facturas.message +"<small>"})
                    $scope.facturas = facturas.data
                    console.log('$scope.facturas', $scope.facturas);
                    let sectores = await ObtenerDocumentosSector(id_empresa, id_sucursal);
                    if( sectores.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER DOCS. SECTOR</b></br>"+ sectores.message +"<small>"})
                    $scope.sectores = sectores.data
                    console.log('$scope.sectores', $scope.sectores);
                    let monedas = await ObtenerTiposMoneda(id_empresa, id_sucursal);
                    if( monedas.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER TIPOS DE MONEDA</b></br>"+ monedas.message +"<small>"})
                    $scope.monedas = monedas.data
                    console.log('$scope.monedas', $scope.monedas);
                    let metodos = await ObtenerTiposMetodoPago(id_empresa, id_sucursal);
                    if( metodos.error ) return resolve({ error: true, message:"<small><b>ERROR AL OBTENER MÉTODOS DE PAGO</b></br>"+ metodos.message +"<small>"})
                    $scope.metodos = metodos.data
                    console.log('$scope.metodos', $scope.metodos);
                    return resolve({ error: false })
                } catch (e) {
                    console.log(e);
                    return resolve({ error: true, message:"<small><b>ERROR AL OBTENER CATALOGOS</b></br>"+ e.message +"<small>"})
                }
            })
        }
        $scope.guardarConfiguraciones = async () => {

        }

		$scope.inicio();
	}]);



