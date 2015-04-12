'use strict';



var ctrl = angular.module('app.controllers_gen', ['ngFacebook'])


ctrl.controller('AppCtrl', ['$scope', function($scope) {
    $scope.app = {
      name: 'Saime - AngularJS',
      version: '1.0',
    }

}]);


ctrl.controller('FBCtrl',['$scope', '$rootScope', '$facebook', '$http', '$state', '$window', function($scope, $rootScope, $facebook, $http, $state, $window){

    $window.scrollTo(0, 0);
    $("#header_status").show();



    $facebook.api("/me/likes/120779134607103").then(function(response){
        if(response.data.length === 0){
            $scope.saime_like = false
        }else{
            $scope.saime_like = true
        }
    });



    $scope.login = function() {
        $facebook.login().then(function() {
            $scope.refresh();    
        });
    }


    $scope.refresh = function(){
        
        $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
        $scope.showModal = true;

        $facebook.api("/me").then(function(fbresponse) {

            $facebook.api("/me/picture?redirect=false&height=128&type=normal&width=128").then(function(fbresponse2){
                $scope.profile_pic = fbresponse2.data.url;
                //$("#fb_profile").show();
            });


            $scope.bienvenido = fbresponse.name;
            $rootScope.fbid = fbresponse.id;

            //fbresponse.id

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
                        //if(response.errorCode === '00000'){
                            $scope.showModal = false;
                            $state.go("saime.inicio");
                        //}else{
                        //    $scope.error = response2.consumerMessage;
                        //}
                    }).error(function(){
                        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                    });
                    
                }else{
                    $state.go("saime.terminos")
                }

            }).error(function(){
                $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });

        });
    }


    $scope.login()

}]);


ctrl.controller('SignInCtrl', ['$scope', '$http', '$state', '$rootScope', '$timeout', '$facebook', '$window', function($scope, $http, $state, $rootScope, $timeout, $facebook, $window) {
     
    $("#header_status").hide();
    $window.scrollTo(0, 0);

    $scope.formData = {};

    $scope.login = function(form) {

        $scope.showModal = true;
    
        if(form.username && form.password){
            $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

            $http.post("api/api.php?opc=signin", $scope.formData).success(function(response) {
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
                        /* {'facebookId':fbresponse.id, 'name':fbresponse.name,'firstName':fbresponse.first_name, 'lastName':fbresponse.last_name, 'gender':fbresponse.gender, 'link':fbresponse.link, 'locale':fbresponse.locale, 'timezone':fbresponse.timezone, 'username':fbresponse.username, 'verified':fbresponse.verified , 'updatedTime':fbresponse.updated_time, 'picSquare':$scope.profile_pic, 'ipAddress': '200,44.20.32', 'accessToken': response.bcode, 'tokenType': response.token_type, 'refreshToken': response.refresh_token, 'expiresIn': response.expires_in,  'scope': response.scope} */

                        $http.post("api/api.php?opc=reg_fb_perfil&bcode="+$rootScope.bcode, $scope.fb_public_profile).success(function(response2) { 
                            $scope.showModal = false;
                            $state.go("saime.inicio");
                        }).error(function(){
                            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                        });   
                                         

                    });

                    /*
                
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 1500);  
                    
                    $timeout(function(){            
                        $state.go('saime.inicio');
                    }, 1500);  

                    */
          
                }else if(response.status === 'denied'){
                    $scope.error = response.msg;
                }else{
                    $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                }
          
            })

        }else{
            $scope.error= "Debe llenar los campos correctamente."
        }

    }


}]);


ctrl.controller('OtherCtrl', ['$scope', '$facebook', function($scope, $facebook){

  $("#header_status").hide();




/*
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

*/

}]);


ctrl.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$state', '$facebook', '$window', function($rootScope, $scope, $http, $state, $facebook, $window) {
  
  $window.scrollTo(0, 0);


  /*
  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }

  */

  $("#header_status").hide();  
  
  $scope.validar_cita_ven = function(){
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
    $scope.showModal = true;

    $http.get("api/api.php?opc=validar_cita&bcode="+$rootScope.bcode).success(function(response) { 
      if(response.errorCode === '00000'){
        $scope.showModal = false;
        $state.go("saime.registro_datos_personales_ven");
      }else{
        $scope.error = response.consumerMessage;
      }
    }).error(function(){
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
    })
  }


  $scope.validar_cita_ext = function(){
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
    $scope.showModal = true;

    $http.get("api/api.php?opc=validar_cita&bcode="+$rootScope.bcode).success(function(response) { 
      if(response.errorCode === '00000'){
        $scope.showModal = false;
        $state.go("saime.registro_datos_personales_ext");
      }else{
        $scope.error = response.consumerMessage;
      }
    }).error(function(){
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
    })
  }



  $scope.validar_cita_menor_ven = function(minorType){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.showModal = true;

      $http.post("api/api.php?opc=validar_cita_menor&bcode="+$rootScope.bcode, {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          $scope.showModal = false;
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else{
          $scope.error = response.consumerMessage;
        }
      }).error(function(){
        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      })
    }

  $scope.validar_cita_menor_ext = function(minorType){
      
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.showModal = true;
      
      $http.post("api/api.php?opc=validar_cita_menor&bcode="+$rootScope.bcode, {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          $scope.showModal = false;
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else{
          $scope.error = response.consumerMessage;
        }
      }).error(function(){
        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      })
    }



    $scope.logout = function(){
      
      $http.get("api/api.php?opc=cerrar_sesion").success(function(response) { 
        if(response.errorCode === '00000'){
          $rootScope.authenticated = false;
          $state.go("saime.autenticacion")          
        }else{
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }

}]);


ctrl.controller('OlvidoContrasenaCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
  $("#header_status").hide();   

  $scope.enviar = function(form){
    $scope.showModal = true;
    if(form.email){
      $http.post("api/api.php?opc=req_pass", $scope.formData).success(function(response) {
        if(response.errorCode==='00000'){
          $scope.showModal = false;
          $state.go("saime.enviocontrasena");
        }else{
          $scope.error = response.consumerMessage;
        }
      }).error(function(){
        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
      })
    }else{
      $scope.error = "Debe llenar el campo correctamente.";  
    }  
  }  

}]);



ctrl.controller('RegistroCtrl', ['$scope', '$http', '$state', 'CodigoTelfFactory', function($scope, $http, $state, CodigoTelfFactory) {
  $("#header_status").hide();

  $scope.formData = {};
  $scope.formNoData = {};
  var original = $scope.formData;

  
  $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

  $scope.codigos = CodigoTelfFactory;


  $scope.guardar = function(form){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.showModal = true;
      $scope.formData.phone = $scope.formNoData.phone_code + $scope.formNoData.phone;

      if(form.cedula && form.firstName && form.lastName && form.email && form.altEmail && $scope.formData.phone){
        $http.post("api/api.php?opc=reg_usuario", $scope.formData).success(function(response) {
          if(response.errorCode==='00000'){
            $state.go("saime.registro_usuario_exitoso");
          }else{
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }
        }).error(function(response){
            console.log("asdas")
            $scope.showModal = true;
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        })
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente";  
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
  $scope.showModal = true;
  $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

  $http.post("api/api.php?opc=get_noticias_web&bcode="+$rootScope.bcode, {pageNo:"1", pageSize:"10"}).success(function(response) { 
    if(response.errorCode==='00000'){
      $scope.noticias = response.noticiaWebList;
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }else{
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
    }
    
  })

}]);



ctrl.controller('OTramitesCtrl', ['$rootScope', '$scope', '$http', '$state', '$timeout', function($rootScope, $scope, $http, $state, $timeout) {
  
  
  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }
  

  $("#header_status").hide();
  $scope.oneAtATime = true;
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.showModal = true;
  $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';


  $http.post("api/api.php?opc=get_tramites_web&bcode="+$rootScope.bcode, {pageNo:"1", pageSize:"10"}).success(function(response) { 
    if(response.errorCode==='00000'){
      $scope.tramites = response.tramiteWebList;
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }else{
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
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
    $scope.showModal = true;
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
          
    $http.post("api/api.php?opc=get_estado_tramites&bcode="+$rootScope.bcode).success(function(response) {       
          
        if(response.errorCode === '00000'){
          $scope.tramites = response.CeduladoloadList;
          $timeout(function(){
            $scope.showModal = false;
          }, 1500);
        }else{
          $scope.error = response.consumerMessage;
          $state.go("saime.inicio");
        }
    
    }).error(function(){
      $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    })

    $scope.datos = function(cedula, nombre1, nombre2, apellido1, apellido2, fecha){

      $rootScope.dcedula = cedula;
      $rootScope.nombre = nombre1+" "+nombre2+" "+apellido1+" "+apellido2;
      $rootScope.fecha = fecha;

    }


}]);

ctrl.controller('EstadoTramiteCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$timeout', function($rootScope, $scope, $http, $state, $stateParams, $timeout) {

  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }

  $("#header_status").hide();
  $scope.formData = {};

  
  $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
  $scope.showModal = true;
  $http.post("api/api.php?opc=detalle_tramites&bcode="+$rootScope.bcode, {idpersona: $stateParams.personId}).success(function(response) {    
        
    if(response.errorCode === '00000'){
      
      $scope.estado = 'en_proceso';
      $scope.tramite = response;
      $scope.formData.cedula = $rootScope.dcedula;
      $scope.formData.nombre = $rootScope.nombre;
      $scope.formData.fecha = $rootScope.fecha;


      $timeout(function(){
        $scope.showModal = false;
      }, 1500);

      
    }else{
      $scope.error = response.consumerMessage;
      $scope.estado = 'sin_solicitud';
    }         
        
  }).error(function(){
    $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
  })


  $scope.enviar_correo = function(idpersona){
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
    $scope.showModal = true;
    
    $http.post("api/api.php?opc=enviar_planilla&bcode="+$rootScope.bcode, {idpersona: idpersona}).success(function(response) {   

      if(response.errorCode === '00000'){
        $scope.error = response.consumerMessage;
      }else{
        $scope.error = response.consumerMessage;
      }   
    }).error(function(){
      $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
    })

  }

}]);
