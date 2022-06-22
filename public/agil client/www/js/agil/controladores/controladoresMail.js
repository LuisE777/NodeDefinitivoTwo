angular.module('agil.controladores')

	.controller('controladoresMail', ['$scope', '$timeout', '$filter', '$window', '$localStorage', '$location', '$templateCache', '$route', 'blockUI','SweetAlert','listaMailInbox','detalleMailInbox','addEnvioCorreoMail','addMailBorrador','moverApapelera','marcarSinDestacarr','marcarDestacadoo','reenvioCorreoMail','eliminarBorrador',
		 function ($scope, $timeout, $filter, $window, $localStorage, $location, $templateCache, $route, blockUI, SweetAlert, listaMailInbox,detalleMailInbox,addEnvioCorreoMail,addMailBorrador,moverApapelera,marcarSinDestacarr,marcarDestacadoo,reenvioCorreoMail,eliminarBorrador) {
            blockUI.start();
            $scope.usuario = JSON.parse($localStorage.usuario);
            $scope.idModalNuevoEmail= "modal-nuevo-email";
            $scope.idModalReenvioEmail= "modal-reenvio-email"

            $scope.$on('$viewContentLoaded', function () {
                ejecutarScriptsMail($scope.idModalNuevoEmail, $scope.idModalReenvioEmail);
                
            });
            $scope.$on('$routeChangeStart', function (next, current) {
                $scope.eliminarPopup($scope.idModalNuevoEmail);
                $scope.eliminarPopup($scope.idModalReenvioEmail);   
            });

            $scope.inicio = function () {
                $scope.listaMailInboxUsuario(false, false, false)
            }
			/* fin kardex  */
			
            //===================================RESPONCIVE DE MAIL=================================

            // Open Modal on Compose Button Click
            $('#btn-compose-mail').on('click', function(event) {
                $('#btn-send').show();
                $('#btn-reply').hide();
                $('#btn-fwd').hide();
                $('#composeMailModal').modal('show');

                // Save And Reply Save
                $('#btn-save').show();
                $('#btn-reply-save').hide();
                $('#btn-fwd-save').hide();
            })

            // Triggered when mail is Closed

            $('.close-message').on('click', function(event) {
                event.preventDefault();
                $('.content-box .collapse').collapse('hide')
                $(this).parents('.content-box').css({
                    width: '0',
                    left: 'auto',
                    right: '-46px'
                });
            });

            // Open Mail Sidebar on resolution below or equal to 991px.
            $('.mail-menu').on('click', function(e){
                $(this).parents('.mail-box-container').children('.tab-title').addClass('mail-menu-show')
                $(this).parents('.mail-box-container').children('.mail-overlay').addClass('mail-overlay-show')
            })

            // Close sidebar when clicked on ovelay ( and ovelay itself ).
            $('.mail-overlay').on('click', function(e){
                $(this).parents('.mail-box-container').children('.tab-title').removeClass('mail-menu-show')
                $(this).removeClass('mail-overlay-show')
            })

            /*  fn. contentBoxPosition ==> Triggered when clicked on any each mail to show the mail content.*/
            function contentBoxPosition() {
                $('.content-box .collapse').on('show.bs.collapse', function(event) {
                    var getCollpaseElementId = this.id;
                    var getSelectedMailTitleElement = $('.content-box').find('.mail-title');
                    var getSelectedMailContentTitle = $(this).find('.mail-content').attr('data-mailTitle');
                    $(this).parent('.content-box').css({
                        width: '100%',
                        left: '0',
                        right: '100%'
                    });
                    $(this).parents('#mailbox-inbox').find('.message-box [data-target="#'+getCollpaseElementId+'"]').parents('.mail-item').removeAttr('id');
                    
                })
            }
            
            /*=========================
                Tab Functionality
            =========================*/
            
            var $listbtns = $('.list-actions').click(function() {
                $(this).parents('.mail-box-container').find('.mailbox-inbox > .content-box').css({
                    width: '0',
                    left: 'auto',
                    right: '-46px'
                });
                $('.content-box .collapse').collapse('hide');
                var getActionCenterDivElement = $(this).parents('.mail-box-container').find('.action-center');
                if (this.id == 'mailInbox') {
                    var $el = $('.' + this.id).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div').not($el).hide();
                } else if (this.id == 'personal') {
                    $el = '.' + $(this).attr('id');
                    $elShow = $($el).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div .mail-item-heading'+$el).parents('.mail-item').show();
                    $('#ct > div .mail-item-heading').not($el).parents('.mail-item').hide();
                } else if (this.id == 'work') {
                    $el = '.' + $(this).attr('id');
                    $elShow = $($el).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div .mail-item-heading'+$el).parents('.mail-item').show();
                    $('#ct > div .mail-item-heading').not($el).parents('.mail-item').hide();
                } else if (this.id == 'social') {
                    $el = '.' + $(this).attr('id');
                    $elShow = $($el).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div .mail-item-heading'+$el).parents('.mail-item').show();
                    $('#ct > div .mail-item-heading').not($el).parents('.mail-item').hide();
                } else if (this.id == 'private') {
                    $el = '.' + $(this).attr('id');
                    $elShow = $($el).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div .mail-item-heading'+$el).parents('.mail-item').show();
                    $('#ct > div .mail-item-heading').not($el).parents('.mail-item').hide();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                } else if (this.id == 'trashed') {
                    var $el = $('.' + this.id).show();
                    getActionCenterDivElement.addClass('tab-trash-active');
                    $('#ct > div').not($el).hide();
                } else {
                    var $el = $('.' + this.id).show();
                    getActionCenterDivElement.removeClass('tab-trash-active');
                    $('#ct > div').not($el).hide();
                }
                $listbtns.removeClass('active');
                $(this).addClass('active');
            })

            /* setTimeout(function() {
                $(".list-actions#mailInbox").trigger('click');
            },10); */
            
            contentBoxPosition();

            $('.tab-title .nav-pills a.nav-link').on('click', function(event) {
            $(this).parents('.mail-box-container').find('.tab-title').removeClass('mail-menu-show')
            $(this).parents('.mail-box-container').find('.mail-overlay').removeClass('mail-overlay-show')
            })
            
            $scope.tinymceOptions = {
                onChange: function(e) {
                  // put logic here for keypress and cut/paste changes
                },
                height: 150,
                    menubar: false,
                    plugins: [ 'advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code','textcolor','emoticons','fullscreen' ],
                    toolbar: 'undo redo | fontsizeselect fontselect | bold italic underline strikethrough | forecolor | backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | emoticons fullscreen',
                skin: 'lightgray',
                theme : 'modern',
                setup: function (editor) {
                    editor.on('init', function (e) {
                      editor.setContent('');
                    });
                  } 
              };




			



            $scope.listaMailInboxUsuario = function (destacado, eliminado, borrador) {
                const prom = listaMailInbox($scope.usuario.id_empresa,$scope.usuario.id, destacado, eliminado, borrador);
                prom.then(function (res) {
                    $scope.listaGmailEnviados = res.data
                    //$scope.listaGmailEnviados.fechaa =  $scope.formatoFechaPDF(res.data.fecha)
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            $scope.detalleInbox = {}
            $scope.verDetalleInbox = function (inbox) {
                const prom = detalleMailInbox($scope.usuario.id_empresa,inbox._id)
                prom.then(function (res) {
                    $scope.detalleGmailEnviados = res.data[0]
                    //$scope.listaGmailEnviados.fechaa =  $scope.formatoFechaPDF(res.data.fecha)
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            //$scope.datosMail={}
            $scope.abrirNuevoMail = function () {
                $('#id-adjunto-pdf').ace_file_input({no_file: "Adjuntar archivo...", btn_choose: "Elegir", btn_change: "Cambiar", droppable: false, onchange: null, thumbnail: false });
                $('#id-adjunto-pdf').ace_file_input('reset_input_ui');
                $('#id-adjunto-pdf').ace_file_input('reset_input');
                $scope.tinymceOptions.
                setup = function (editor) {
                    editor.on('init', function (e) {
                        editor.setContent('');
                    });
                } 
                $scope.$emit('$tinymce:refresh')
                $scope.datosMail = {}
                $scope.abrirPopup($scope.idModalNuevoEmail);
            }
            
            $scope.cerrarNuevoMail = function () {
                $scope.cerrarPopup($scope.idModalNuevoEmail);
            }


            $scope.addEnvioCorreoMailNuevo = async function (datosEmail) { ///para enviar nuevo email
                datosEmail.empresa = { id_empresa:$scope.usuario.empresa.id, id_usuario:$scope.usuario.id, email_host: $scope.usuario.empresa.email_host, email_puerto: $scope.usuario.empresa.email_puerto, email_empresa_aplicacion:$scope.usuario.empresa.email_empresa_aplicacion, email_password_aplicacion:$scope.usuario.empresa.email_password_aplicacion, subNombre_email: $scope.usuario.empresa.asunto_email, URLactual: (window.location.origin)}
				SweetAlert.swal({
                    title: 'Enviando Correo...!!!',
                    html: '<center><lottie-player src="https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    background: 'rgba(76, 175, 80, 0.0)',
                    timer: 4000,
                })
                var prom = await addEnvioCorreoMail(datosEmail)
                $scope.cerrarNuevoMail()
                $scope.listaMailInboxUsuario(false, false, false)
                return prom
               
			}

            $scope.addBorrador = async function (datosEmail) { 
                datosEmail.empresa = { id_empresa:$scope.usuario.empresa.id, id_usuario:$scope.usuario.id, email_host: $scope.usuario.empresa.email_host, email_puerto: $scope.usuario.empresa.email_puerto, email_empresa_aplicacion:$scope.usuario.empresa.email_empresa_aplicacion, email_password_aplicacion:$scope.usuario.empresa.email_password_aplicacion, subNombre_email: $scope.usuario.empresa.asunto_email, URLactual: (window.location.origin)}
				SweetAlert.swal({
                    title: 'Guardando en Borrador...!!!',
                    html: '<center><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_a4oisbpo.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    background: 'rgba(76, 175, 80, 0.0)',
                    timer: 2000,
                })
                var prom = await addMailBorrador(datosEmail)
                $scope.cerrarNuevoMail()
                $scope.listaMailInboxUsuario(false, false, true)
                return prom
               
			}

            $scope.moverMailApapelera = async function (datos) { 
                var prom = await moverApapelera(datos)
                
                let index = $scope.listaGmailEnviados.findIndex(dat => dat._id === datos._id);
                $scope.listaGmailEnviados.splice(index,1)
                //$scope.listaMailInboxUsuario(false, false, false)
                $scope.detalleGmailEnviados = false;
			}

            $scope.marcarSinDestacar = async function (datos) { 
                var prom = await marcarSinDestacarr(datos)
               datos.destacado = false                
			}

            $scope.marcarDestacado = async function (datos) { 
                var prom = await marcarDestacadoo(datos)
                datos.destacado = true               
			}


            $scope.abrirReenvioMail = function (detalleInbox) {
                $('#id-adjunto-pdf').ace_file_input({no_file: "Adjuntar archivo...", btn_choose: "Elegir", btn_change: "Cambiar", droppable: false, onchange: null, thumbnail: false});
                $('#id-adjunto-pdf').ace_file_input('reset_input_ui');
                $('#id-adjunto-pdf').ace_file_input('reset_input');
                
                const prom = detalleMailInbox($scope.usuario.id_empresa,detalleInbox._id)
                prom.then(function (res) {
                    $scope.detalleGmailEnviados = res.data[0]
                    var mensaje = ''
                        if(!$scope.detalleGmailEnviados.borrador){
                            var mensajeReevio = '<p>----------Forwarded message----------<br> De: <b>'+$scope.detalleGmailEnviados.subTituloUsuario+'</b> ||'+$scope.detalleGmailEnviados.correoUsuario+'||<br> Fecha: '+$scope.fechaATexto($scope.detalleGmailEnviados.fecha)+' '+$scope.fechaATiempo(new Date($scope.detalleGmailEnviados.fecha))+' <br>Asunto: '+$scope.detalleGmailEnviados.asunto+' <br>Para: ||'+$scope.detalleGmailEnviados.correoDestino+'||</p>'
                            
                            mensaje = mensajeReevio+'<br><br>'+ ($scope.detalleGmailEnviados.mensajeAdj?$scope.detalleGmailEnviados.mensajeAdj:'')
                            $scope.detalleGmailEnviados.mensaje = mensaje
                        }else{
                            mensaje = $scope.detalleGmailEnviados.mensajeAdj?$scope.detalleGmailEnviados.mensajeAdj:''
                            $scope.detalleGmailEnviados.mensaje = mensaje
                        }
                    $scope.tinymceOptions.
                    setup = function (editor) {
                        editor.on('init', function (e) {
                            editor.setContent(mensaje);
                        });
                      } 
                      $scope.$emit('$tinymce:refresh')
                     $scope.abrirPopup($scope.idModalReenvioEmail);
                }).catch((err) => {
                    blockUI.stop();
                    const msg = (err.data !== undefined && err.data !== null) ? err.data : (err.message !== undefined && err.message !== null) ? err.message : 'Se perdió la conexión.'
                    $scope.mostrarMensaje(msg)
                })
            }
            
            $scope.cerrarReenvioMail = function () {
                $scope.cerrarPopup($scope.idModalReenvioEmail);
            }

            $scope.addReenvioCorreo = async function (datosEmail, xxx) { 
                try {
                    datosEmail.empresa = { id_empresa:$scope.usuario.empresa.id, id_usuario:$scope.usuario.id, email_host: $scope.usuario.empresa.email_host, email_puerto: $scope.usuario.empresa.email_puerto, email_empresa_aplicacion:$scope.usuario.empresa.email_empresa_aplicacion, email_password_aplicacion:$scope.usuario.empresa.email_password_aplicacion, subNombre_email: $scope.usuario.empresa.asunto_email, URLactual: (window.location.origin)}
                    SweetAlert.swal({
                        title: 'Enviando Correo...!!!',
                        html: '<center><lottie-player src="https://assets1.lottiefiles.com/packages/lf20_y9qOnk.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        background: 'rgba(76, 175, 80, 0.0)',
                        timer: 4000,
                    })
                    var prom = await reenvioCorreoMail(datosEmail)
                    if(datosEmail.borrador){ 
                        $scope.eliminarBorradorInbox(datosEmail)///ELIMINA EL REGISTRO REALIZADO EN BORRADOR
                    }
                    $scope.cerrarReenvioMail()
                    $scope.detalleGmailEnviados = false;
                    $scope.listaMailInboxUsuario(false, false, false)
                    return prom 
                } catch (error) {
                    return error
                }  
			}

            $scope.eliminarBorradorInbox = async function (datos) { 
                var prom = await eliminarBorrador(datos)
               datos.destacado = false                
			}







    

			$scope.inicio();
		}]);