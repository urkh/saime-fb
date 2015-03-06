'use strict';



angular.module('app.controllers_gen', ['ngCookies', 'ngFacebook'])


.controller('AppCtrl', ['$scope', '$localStorage', '$window', 
    function(              $scope,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');

      // config
      $scope.app = {
        name: 'Saime - AngularJS',
        version: '1.0',
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);


  }])


.controller('FBCtrl',['$scope','$facebook', function($scope, $facebook){

  $("#header_status").show();
  $facebook.login().then(function() {
      $scope.refresh();
      
    });


  $scope.refresh = function(){

    $facebook.api("/me").then( 
      function(response) {
        $scope.bienvenido = response.name;
      },
      function(err) {
        $scope.bienvenido = "Please log in";
      });


    $facebook.api("/me/picture?redirect=false&height=128&type=normal&width=128").then(
      function(response){
        $scope.profile_pic = response.data.url;
        $("#fb_profile").show();
      });

  }

}])


.controller('SignInCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {


      $("#header_status").hide();
      window.scrollTo(0, 0);
      $scope.formData = {};

      

      $scope.login = function(form) {

        $scope.showModal = true;
        
        if(form.username && form.password){
          $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'

          $http.post("api/api.php?opc=signin", $scope.formData).success(function(response) {
            if(response.status === 'granted'){
              $scope.showModal = false;
              $state.go('saime.inicio');
              
            }else if(response.status === 'denied'){
              $scope.error = response.msg;
            }else{
              $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
            }
              
          })

        }else{
          $scope.error= "Debe llenar los campos correctamente."
        }

      }

}])


.controller('MainCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();   

  $scope.validar_cita_ven = function(){
    $scope.showModal = true;
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
    $http.get("api/api.php?opc=validar_cita").success(function(response) { 
      if(response.errorCode === '00000'){
        $scope.showModal = false;
        $state.go("saime.registro_datos_personales_ven");
      }else if(response.errorCode === '90000'){
        //$scope.error2 = response.consumerMessage;
        $scope.error = response.consumerMessage;
      }else{
        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      }
    })
  }


  $scope.validar_cita_ext = function(){
    $scope.showModal = true;
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
    $http.get("api/api.php?opc=validar_cita").success(function(response) { 
      if(response.errorCode === '00000'){
        $scope.showModal = false;
        $state.go("saime.registro_datos_personales_ext");
      }else if(response.errorCode === '90000'){
        $scope.error = response.consumerMessage;
      }else{
        $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      }
    })
  }



  $scope.validar_cita_menor_ven = function(minorType){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

      $http.post("api/api.php?opc=validar_cita_menor", {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          $scope.showModal = false;
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else if(response.errorCode === '90000'){
          $scope.error = response.consumerMessage;
        }else{
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }

  $scope.validar_cita_menor_ext = function(minorType){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      
      $http.post("api/api.php?opc=validar_cita_menor", {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          $scope.showModal = false;
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else if(response.errorCode === '90000'){
          $scope.error = response.consumerMessage;
        }else{
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }

}])


.controller('OlvidoContrasenaCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
  $("#header_status").hide();   

  $scope.enviar = function(form){
    $scope.showModal = true;
    if(form.$valid){
      $http.post("api/api.php?opc=req_pass", $scope.formData).success(function(response) {
        if(response.errorCode==='00000'){
          $scope.showModal = false;
          $state.go("saime.enviocontrasena");
        }else if(response.errorCode==='90000'){
          $scope.error = response.consumerMessage;
        }else{
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      })
    }else{
      $scope.error = "Debe llenar el campo correctamente.";  
    }  
  }  

}])



.controller('RegistroCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();

  $scope.formData = {};
  $scope.formNoData = {};
  var original = $scope.formData;

  
  $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

  $scope.codigos = [
      {numero: '0412'},
      {numero: '0414'},
      {numero: '0416'},
      {numero: '0424'},
      {numero: '0426'}
    ];


    $scope.guardar = function(form){
      $scope.formData.phone = $scope.formNoData.phone_code + $scope.formNoData.phone;
      if(form.$valid){
        $http.post("api/api.php?opc=reg_usuario", $scope.formData).success(function(response) {
          if(response.errorCode==='00000'){
            $state.go("saime.registro_usuario_exitoso");
          }else if(response.errorCode==='90000'){
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }else{
            $scope.showModal = true;
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
          }
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
      

}])


.controller('ReclamosCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();

  $scope.formData = {};
  $scope.formNoData = {};
  var original = $scope.formData;

  
  $scope.codigos = [
      {numero: '0412'},
      {numero: '0414'},
      {numero: '0416'},
      {numero: '0424'},
      {numero: '0426'}
    ];


    $scope.guardar = function(enviar){
      
    }


    $scope.reset = function(){
      $scope.formData = angular.copy({});
      $scope.formNoData = angular.copy({});
    }
      

}])



.controller('InicioCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();
  $scope.formData = {};

}])



.controller('NoticiasWebCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {
  $("#header_status").hide();
  $scope.showModal = true;
  $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

  $http.post("api/api.php?opc=get_noticias_web", {pageNo:"1", pageSize:"10"}).success(function(response) { 
    if(response.errorCode==='00000'){
      $scope.noticias = response.noticiaWebList;
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }else{
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
    }
    
  })

}])



.controller('OTramitesCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {
  $("#header_status").hide();
  $scope.oneAtATime = true;
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.showModal = true;
  $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';


  $http.post("api/api.php?opc=get_tramites_web", {pageNo:"1", pageSize:"10"}).success(function(response) { 
    if(response.errorCode==='00000'){
      $scope.tramites = response.tramiteWebList;
      console.log(response)
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }else{
      $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
    }
    
  })
  

}])




.controller('MapasCtrl', ['$scope', '$facebook', '$http', function($scope, $facebook, $http){

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

          $http.post('api/api.php?opc=get_oficinas_web').success(function(res) { 
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

}])



.controller('ListaTramitesCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {

    $("#header_status").hide();
    $scope.formData = {};
    $scope.showModal = true;
    $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
          
    $http.post("api/api.php?opc=get_estado_tramites").success(function(response) {       
          
        if(response.errorCode === '00000'){
          $scope.tramites = response.CeduladoloadList;
          $timeout(function(){
            $scope.showModal = false;
          }, 1500);
        }else if(response.errorCode === '90000'){
          $scope.error = response.consumerMessage;
        }else{
          $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
        }
    
    })


}])

.controller('EstadoTramiteCtrl', ['$scope', '$http', '$state', '$stateParams', '$timeout', function($scope, $http, $state, $stateParams, $timeout) {
      $("#header_status").hide();
      $scope.formData = {};
      
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=detalle_tramites", {idpersona: $stateParams.personId}).success(function(response) {    
            
          if(response.errorCode === '00000'){
            
            $scope.estado = 'en_proceso';
            $scope.tramite = response;
            $scope.cedula = $stateParams.cedula;
            $scope.nombre = $stateParams.nombre;
            $scope.fecha = $stateParams.fecha;

            $timeout(function(){
              $scope.showModal = false;
            }, 1500);

            
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
            $scope.estado = 'sin_solicitud';
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }         
            
      })


      $scope.enviar_correo = function(idpersona){
        $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
        $scope.showModal = true;
        
        $http.post("api/api.php?opc=enviar_planilla", {idpersona: idpersona}).success(function(response) {   

          if(response.errorCode === '00000'){
            $scope.error = response.consumerMessage;
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }   
        });

      }

}])


  
  .controller('FormMenuCtrl', ['$scope', function($scope) {
    

  }])




  // Form controller
  .controller('FormDemoCtrl', ['$scope', function($scope) {
    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }

    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.select2Number = [
      {text:'First',  value:'One'},
      {text:'Second', value:'Two'},
      {text:'Third',  value:'Three'}
    ];

    $scope.list_of_string = ['tag1', 'tag2']
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };



/* Controllers */
$scope.inputs_jq = function() {
    $("input[type=text]").after("<div class='border-input'></div>");
    $("input[type=email]").after("<div class='border-input'></div>");
};

$scope.inputs_jq();





  }])


  ;
