'use strict';



var ctrl = angular.module('app.controllers_gen', ['ngFacebook']);


ctrl.controller('AppCtrl', ['$scope', function($scope) {
    $scope.app = {
      name: 'Saime - AngularJS',
      version: '1.0',
    }

}]);


ctrl.controller('AuthCtrl',['$scope', '$rootScope', '$facebook', '$http', '$state', '$window', '$localStorage', function($scope, $rootScope, $facebook, $http, $state, $window, $localStorage){

    $window.scrollTo(0, 0);
    //$("#header_status").hidden();


    //$scope.login = function() {
        $facebook.login().then(function() {

            $facebook.api("/me/likes/120779134607103").then(function(response){
                if(response.data.length === 0){
                    $state.go("saime.like_page");
                }else{
                    $scope.refresh();
                }
            });
            
                
        });
    //}


    $scope.refresh = function(){
        
        $facebook.api("/me").then(function(fbresponse) {

            $facebook.api("/me/picture?redirect=false&height=128&type=normal&width=128").then(function(fbresponse2){
                $scope.profile_pic = fbresponse2.data.url;
                //$("#fb_profile").show();
            });


            $scope.bienvenido = fbresponse.name;
            $rootScope.fbid = fbresponse.id;


            $http.get("api/api.php?opc=get_fb_perfil&fbid="+fbresponse.id).success(function(response) {

                if(response.errorCode === '00000'){
                    $rootScope.authenticated = true;
                    $rootScope.bcode = response.facebookProfile.accessToken;

                    $scope.fb_public_profile = {
                        'facebookId':fbresponse.id, 
                        //'email':fbresponse.email, 
                        'name':fbresponse.name,
                        'firstName':fbresponse.first_name, 
                        'lastName':fbresponse.last_name,
                        'gender':fbresponse.gender,
                        'link':fbresponse.link,
                        'locale':fbresponse.locale,
                        'timezone':fbresponse.timezone,
                        'username':fbresponse.username,
                        'verified':fbresponse.verified,
                        'updatedTime':fbresponse.updated_time,
                        'picSquare':$scope.profile_pic,
                        'ipAddress': response.facebookProfile.ipAddress,
                        'accessToken': response.facebookProfile.accessToken,
                        'tokenType': response.facebookProfile.tokenType,
                        'refreshToken': response.facebookProfile.refreshToken,
                        'expiresIn': response.facebookProfile.expiresIn, 
                        'scope': response.facebookProfile.scope
                    }

                    $http.post("api/api.php?opc=reg_fb_perfil&bcode="+$rootScope.bcode, $scope.fb_public_profile).success(function(response2) { 
                        if(response2.errorCode === '90000'){
                            $state.go("saime.autenticacion");
                        }else{

                              $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.paises = respponse;
                                  }
                              });

                              $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.estados = respponse;
                                  }
                              });

                              $http.get("api/api.php?opc=get_municipios&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.municipios = respponse;
                                  }
                              });

                              $http.get("api/api.php?opc=get_parroquias&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.parroquias = respponse;
                                  }
                              });

                              $http.get("api/api.php?opc=get_oficinas&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.oficinas = respponse;
                                  }
                              });

                              $http.get("api/api.php?opc=get_consulados&bcode="+$rootScope.bcode).success(function(respponse) { 
                                  if(response.errorCode==='00000'){
                                      $localStorage.consulados = respponse;
                                  }
                              });


                            $state.go("saime.inicio");
                        }
                    }).error(function(){
                        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                    });
                    
                }else{
                    $state.go("saime.login");
                }

            }).error(function(){
                $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });

        });
    }


    //$scope.login()

}]);


ctrl.controller('SignInCtrl', ['$scope', '$http', '$state', '$rootScope', '$timeout', '$facebook', '$window', '$localStorage', function($scope, $http, $state, $rootScope, $timeout, $facebook, $window, $localStorage) {
     
    $("#header_status").hide();
    $window.scrollTo(0, 0);

    $scope.formData = {};

    $scope.login = function(form) {
   
        if(form.username && form.password){

            $scope.alldata = {
                'username':form.username,
                'password':form.password
            }

            $scope.error = true;
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';


            $http.post("api/api.php?opc=signin", $scope.alldata).success(function(response) {
                if(response.status === 'granted'){
                    $rootScope.authenticated = true;
                    $rootScope.bcode = response.bcode;

                    $facebook.api("/me").then(function(fbresponse) {

                        $facebook.api("/me/picture?redirect=false&height=128&type=normal&width=128").then(function(fbresponse2){
                            $scope.profile_pic = fbresponse2.data.url;
                        });

                        
                        $scope.fb_public_profile = {
                            'facebookId':fbresponse.id, 
                            //'email':fbresponse.email, 
                            'name':fbresponse.name,
                            'firstName':fbresponse.first_name, 
                            'lastName':fbresponse.last_name,
                            'gender':fbresponse.gender,
                            'link':fbresponse.link,
                            'locale':fbresponse.locale,
                            'timezone':fbresponse.timezone,
                            'username':fbresponse.username,
                            'verified':fbresponse.verified,
                            'updatedTime':fbresponse.updated_time,
                            'picSquare':$scope.profile_pic,

                            //'ipAddress': response.facebookProfile.ipAddress,
                            'accessToken': response.bcode,
                            'tokenType': response.token_type,
                            'refreshToken': response.refresh_token,
                            'expiresIn': response.expires_in, 
                            'scope': response.scope
                        }
                        
                        $http.post("api/api.php?opc=reg_fb_perfil&bcode="+$rootScope.bcode, $scope.fb_public_profile).success(function(response2) { 
                            if(response2.errorCode === '90000'){
                                $state.go("saime.autenticacion");
                            }else{

                                $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.paises = respponse;
                                    }
                                });

                                $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.estados = respponse;
                                    }
                                });

                                $http.get("api/api.php?opc=get_municipios&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.municipios = respponse;
                                    }
                                });

                                $http.get("api/api.php?opc=get_parroquias&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.parroquias = respponse;
                                    }
                                });

                                $http.get("api/api.php?opc=get_oficinas&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.oficinas = respponse;
                                    }
                                });

                                $http.get("api/api.php?opc=get_consulados&bcode="+$rootScope.bcode).success(function(respponse) { 
                                    if(response.errorCode==='00000'){
                                        $localStorage.consulados = respponse;
                                    }
                                });

                                $state.go("saime.inicio");
                            }
                        }).error(function(){
                            $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                        });               

                    });

          
                }else if(response.status === 'denied'){
                    $scope.error_msg = response.msg;
                }else{
                    $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                }
          
            })

        }else{
            $scope.showErrorsCheckValidity = true;
        }

    }


}]);


ctrl.controller('LikeFBCtrl', ['$scope', '$state', '$facebook', function($scope, $state, $facebook){

  $("#header_status").hide();


  $facebook.promise.then(function(FB) {
      FB.Event.subscribe('edge.create', function(response) {
          $state.go("saime.auth");
      });
  });



  $scope.icon = 'fa fa-share-alt';
  $scope.msg = 'Compartir en tu muro ';
  
  $scope.fb_share = function(){
    
    $facebook.api("/me/feed", 'post', {message: 'Estoy usando la nueva aplicación de SAIME en Facebook'}).then(function(response){
      $scope.msg = 'Compartido';
      $scope.icon = 'fa fa-thumbs-o-up';
    });
  }

  $scope.fb_invitable_friends = function(){
    $facebook.ui({method: 'apprequests',
      message: 'Por la aplicación de facebook es mas rápido y ágil tramitar los pasaportes',
      //to: '10205953481778797, 10205953481778797',
      action_type:'turn'
    }).then(function(response){
      console.log(response);
    });
  }



}]);


ctrl.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$state', '$facebook', '$window', '$localStorage', function($rootScope, $scope, $http, $state, $facebook, $window, $localStorage) {
  
    $window.scrollTo(0, 0);

   
    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();  
    
    $scope.validar_cita_ven = function(){
        $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
        $scope.error = true;

        $http.get("api/api.php?opc=validar_cita&bcode="+$rootScope.bcode).success(function(response) { 
            if(response.errorCode === '00000'){
                $http.post("api/api.php?opc=get_perfil&bcode="+$rootScope.bcode).success(function(response2) {
                    
                    $rootScope.pnombre = response2.firstName;
                    $rootScope.snombre = response2.secondName;
                    $rootScope.papellido = response2.lastName;
                    $rootScope.sapellido = response2.secondLastName;
                    $rootScope.fechan = response2.birthday;
                    $rootScope.sexo = response2.gender;
                    $state.go("saime.registro_datos_personales_ven");

                }).error(function(){
                    $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                });
            }else{
                $scope.error_msg = response.consumerMessage;
            }
        }).error(function(){
            $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        });
    }


    $scope.validar_cita_ext = function(){
        $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
        $scope.error = true;

        $http.get("api/api.php?opc=validar_cita&bcode="+$rootScope.bcode).success(function(response) { 
            if(response.errorCode === '00000'){
                $http.post("api/api.php?opc=get_perfil&bcode="+$rootScope.bcode).success(function(response2) {
                    
                    $rootScope.pnombre = response2.firstName;
                    $rootScope.snombre = response2.secondName;
                    $rootScope.papellido = response2.lastName;
                    $rootScope.sapellido = response2.secondLastName;
                    $rootScope.fechan = response2.birthday;
                    $rootScope.sexo = response2.gender;
                    $state.go("saime.registro_datos_personales_ext");

                }).error(function(){
                    $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                });
                
            }else{
                $scope.error_msg = response.consumerMessage;
            }
        }).error(function(){
            $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        });
    }

    $scope.logout = function(){
        $state.go("saime.autenticacion")
    }

}]);


ctrl.controller('OlvidoContrasenaCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
    $("#header_status").hide();   

    $scope.enviar = function(form){
     
        if(form.email){
            $scope.error = true;
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

            $http.post("api/api.php?opc=req_pass", {'email':$scope.formData.email}).success(function(response) {
                if(response.errorCode==='00000'){
                    //$scope.error = false;
                    $state.go("saime.enviocontrasena");
                }else{
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
            })
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }  

}]);



ctrl.controller('RegistroCtrl', ['$scope', '$http', '$state', 'CodigoCelFactory', function($scope, $http, $state, CodigoCelFactory) {
  $("#header_status").hide();

  $scope.formData = {};
  $scope.formNoData = {};
  var original = $scope.formData;

  
  $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

  $scope.codigosc = CodigoCelFactory;


  $scope.guardar = function(form){
      
      $scope.formData.phone = $scope.formNoData.phone_code + $scope.formNoData.phone;

      if(form.cedula && form.firstName && form.lastName && form.email && form.altEmail && $scope.formData.phone){

          $scope.alldata = {
              'letra':$scope.formData.letra,
              'cedula':$scope.formData.cedula,
              'firstName':$scope.formData.firstName,
              'lastName':$scope.formData.lastName,
              'email':$scope.formData.email,
              'altEmail':$scope.formData.altEmail,
              'phone':$scope.formData.phone
          }

          $scope.error = true;
          $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

          $http.post("api/api.php?opc=reg_usuario", $scope.alldata).success(function(response) {
              if(response.errorCode==='00000'){
                  $state.go("saime.registro_usuario_exitoso");
              }else{
                  $scope.error_msg = response.consumerMessage;
              }
          }).error(function(response){
              $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
          });
      }else{
        $scope.showErrorsCheckValidity = true;
      }  
    }


    $scope.reset = function(){
      $scope.formData = angular.copy({});
      $scope.formNoData = angular.copy({});
    }
      

}]);




ctrl.controller('NoticiasWebCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {

  
    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }


    $("#header_status").hide();
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

    $http.post("api/api.php?opc=get_noticias_web&bcode="+$rootScope.bcode, {pageNo:"1", pageSize:"10"}).success(function(response) { 
        if(response.errorCode==='00000'){
            $scope.noticias = response.noticiaWebList;
            $scope.error = false;
        }else{
            $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      
    })

}]);



ctrl.controller('OTramitesCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {
  
  
    
    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }
    

    $("#header_status").hide();

    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
    

    
    $http.post("api/api.php?opc=get_tramites_web&bcode="+$rootScope.bcode, {pageNo:"1", pageSize:"10"}).success(function(response) { 
        if(response.errorCode==='00000'){

            $scope.oneAtATime = true;
            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.tramites = response.tramiteWebList;
            $scope.error = false;
        }else{
            $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      
    })
  

}]);




ctrl.controller('MapasCtrl', ['$rootScope', '$scope', '$facebook', '$http', '$state', function($rootScope, $scope, $facebook, $http, $state){

  
  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }

  $("#header_status").hide();
  
  $facebook.api("/me").then( 
      function(response) {
        $scope.url = 'https://graph.facebook.com/'+response.location.id;

        $http.get($scope.url).success(function(res) { 
     
          $scope.map = { 
            center: { 
              latitude: res.location.latitude,
              //latitude: 5.1632956,
              longitude: res.location.longitude
              //longitude: -69.4146705
            }, 
            zoom: 14
          };
         
          $scope.options = {
            scrollwheel: true
          };
 
          $http.post("api/api.php?opc=get_oficinas_web&bcode="+$rootScope.bcode).success(function(res) { 
            var oficinas = res.oficinaWebList;
            var noficinas = []

            for(var i in oficinas){
              var oficina = oficinas[i];
              if(oficina['coordenadas'] === null){
                var coordenadas = ["0","0"];
              }else{
                var coordenadas = oficina['coordenadas'].split(',');
              }
              noficinas.push(
                {
                  'id': oficina['id'], 
                  'oficina': oficina['titulo'],
                  'direccion': oficina['direccion'],
                  'telefono': oficina['telefonos'],
                  'coords': {
                    'latitude': coordenadas[0], 
                    'longitude': coordenadas[1]
                  }
                }
              )
            }
            $scope.markers = noficinas;
          })

        })
      });

}]);



ctrl.controller('ListaTramitesCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {


    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
          
    $http.post("api/api.php?opc=get_estado_tramites&bcode="+$rootScope.bcode).success(function(response) {       
          
        if(response.errorCode === '00000'){
            $scope.tramites = response.CeduladoloadList;
            $scope.error = false;
        }else{
            $scope.error_msg = response.consumerMessage;
        }
    
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    })

    $scope.datos = function(cedula, nombre1, nombre2, apellido1, apellido2, fecha){

        $rootScope.dcedula = cedula;
        $rootScope.nombre = nombre1+" "+nombre2+" "+apellido1+" "+apellido2;
        $rootScope.fecha = fecha;

    }


}]);




ctrl.controller('MisSolicitudesVenCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {


    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
          
    $http.post("api/api.php?opc=get_perfil&bcode="+$rootScope.bcode).success(function(response) {       
          
        $scope.idregistrousuario = response.idregistrousuario;
        $http.post("api/api.php?opc=mis_solicitudes_cita&bcode="+$rootScope.bcode, {idregistrousuario:$scope.idregistrousuario}).success(function(response2) {       

            if(response2.errorCode === '00000'){
                $scope.misc = response2.pesonasperfilurbList;
                $scope.error = false;
                
            }else{
                $scope.error_msg = response2.consumerMessage;
            }
        
        }).error(function(){
            $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        });

    
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    });

    $scope.datos = function(nombre, cedula, fechanac, idplanillapasaporte){

        $rootScope.dcedula = cedula;
        $rootScope.nombre = nombre;
        $rootScope.fecha = fechanac;
        $rootScope.idplanillapasaporte = idplanillapasaporte;

    }



}]);




ctrl.controller('MisSolicitudesExtCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {


    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }


    $("#header_status").hide();
    $scope.formData = {};
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
          
    $http.post("api/api.php?opc=get_perfil&bcode="+$rootScope.bcode).success(function(response) {       
          
        $scope.idregistrousuario = response.idregistrousuario;
        $http.post("api/api.php?opc=mis_solicitudes_cita_ext&bcode="+$rootScope.bcode, {idregistrousuario:$scope.idregistrousuario}).success(function(response2) {       

            if(response2.errorCode === '00000'){
                $scope.misc = response2.pesonasperfilurbList;
                $scope.error = false;
                
            }else{
                $scope.error_msg = response2.consumerMessage;
            }
        
        }).error(function(){
            $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        });

    
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    });

    $scope.datos = function(nombre, cedula, fechanac, idplanillapasaporte){

        $rootScope.dcedula = cedula;
        $rootScope.nombre = nombre;
        $rootScope.fecha = fechanac;
        $rootScope.idplanillapasaporte = idplanillapasaporte;

    }



}]);






ctrl.controller('EstadoTramiteCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};

    
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

    $http.post("api/api.php?opc=detalle_tramites&bcode="+$rootScope.bcode, {idpersona: $stateParams.personId}).success(function(response) {    
          
        if(response.errorCode === '00000'){

            $scope.error = false;
          
            $scope.estado = 'en_proceso';
            $scope.tramite = response;
            $scope.formData.cedula = $rootScope.dcedula;
            $scope.formData.nombre = $rootScope.nombre;
            $scope.formData.fecha = $rootScope.fecha;

        }else{
            $scope.error_msg = response.consumerMessage;
            $scope.estado = 'sin_solicitud';
        }         
          
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    })


    $scope.enviar_correo = function(idpersona){
        $scope.error = true;
        $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      
      
        $http.post("api/api.php?opc=enviar_planilla&bcode="+$rootScope.bcode, {idpersona: idpersona}).success(function(response) {   

            if(response.errorCode === '00000'){
                $scope.error_msg = response.consumerMessage;
            }else{
                $scope.error_msg = response.consumerMessage;
            }   
        }).error(function(){
            $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        })

    }

}]);



ctrl.controller('EstadoCitaVenCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};

    
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

    $http.post("api/api.php?opc=ver_solicitudes_cita&bcode="+$rootScope.bcode, {idplanillapasaporte: $stateParams.idPlanillaPasaporte}).success(function(response) {    
         
        if(response.errorCode === '00000'){
            $scope.pp = response.planillaperfilporpl;
            $scope.vinculosperfil = response.vinculosperfilList;
            $scope.oficinas = response.officeList;
            $scope.formData.cedula = $rootScope.dcedula;
            $scope.formData.nombre = $rootScope.nombre;
            $scope.formData.fecha = $rootScope.fecha;
            $scope.error = false;

        }else{
            $scope.error_msg = response.consumerMessage;
            $scope.estado = 'sin_solicitud';
        }  
               
          
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    })




}]);





ctrl.controller('EstadoCitaExtCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};

    
    $scope.error = true;
    $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

    $http.post("api/api.php?opc=ver_solicitudes_cita_ext&bcode="+$rootScope.bcode, {idplanillapasaporte: $stateParams.idPlanillaPasaporte}).success(function(response) {    
         
        if(response.errorCode === '00000'){
            $scope.pp = response.planillaperfilporplsc;
            $scope.vinculosperfil = response.vinculosperfilList;
            $scope.oficinas = response.officeList;
            $scope.formData.cedula = $rootScope.dcedula;
            $scope.formData.nombre = $rootScope.nombre;
            $scope.formData.fecha = $rootScope.fecha;
            $scope.error = false;

        }else{
            $scope.error_msg = response.consumerMessage;
            $scope.estado = 'sin_solicitud';
        }  
               
          
    }).error(function(){
        $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    });




}]);


ctrl.controller('EliminarCitaExtCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};

    $scope.formData.cedula = $rootScope.dcedula;
    $scope.formData.nombre = $rootScope.nombre;
    $scope.formData.fecha = $rootScope.fecha;
    $scope.formData.idplanillapasaporte = $rootScope.idplanillapasaporte;
   
    $scope.eliminar = function(){
        $scope.error = true;
        $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

        $http.post("api/api.php?opc=eliminar_solicitudes_cita_ext&bcode="+$rootScope.bcode, {idplanillapasaporte: $stateParams.idPlanillaPasaporte}).success(function(response) {    
             
            if(response.errorCode === '00000'){
                $scope.error_msg = response.consumerMessage;
                $timeout(function(){
                    $scope.error = false;
                    $state.go("saime.mis_solicitudes_ext");
                }, 1500);
            }else{
                $scope.error_msg = response.consumerMessage;
            }  
                   
              
        }).error(function(){
            $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        });

    }

}]);


ctrl.controller('EliminarCitaVenCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};

    $scope.formData.cedula = $rootScope.dcedula;
    $scope.formData.nombre = $rootScope.nombre;
    $scope.formData.fecha = $rootScope.fecha;
    $scope.formData.idplanillapasaporte = $rootScope.idplanillapasaporte;
   
    $scope.eliminar = function(){
        $scope.error = true;
        $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

        $http.post("api/api.php?opc=eliminar_solicitudes_cita&bcode="+$rootScope.bcode, {idplanillapasaporte: $stateParams.idPlanillaPasaporte}).success(function(response) {    
             
            if(response.errorCode === '00000'){
                $scope.error_msg = response.consumerMessage;
                $timeout(function(){
                    $scope.error = false;
                    $state.go("saime.mis_solicitudes_ven");
                }, 1500);
            }else{
                $scope.error_msg = response.consumerMessage;
            }  
                   
              
        }).error(function(){
            $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        });

    }

}]);