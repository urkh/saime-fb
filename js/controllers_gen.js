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
 
        if(form.$valid){

          $http.post("api/api.php?opc=signin", $scope.formData).success(function(response) {
            if(response.status === 'granted'){
              $state.go('saime.inicio');
              
            }else if(response.status === 'denied'){
              $scope.authError = response.msg;
            }else{
              $scope.authError = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
            }
              
          })

        }else{

          $scope.authError = "Debe llenar los campos correctamente."
        }

      }

}])


.controller('MainCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();   

  $scope.validar_cita_ven = function(){
    $http.get("api/api.php?opc=validar_cita").success(function(response) { 
      if(response.errorCode === '00000'){
        $state.go("saime.registro_datos_personales_ven");
      }else if(response.errorCode === '90000'){
        $scope.error2 = response.consumerMessage;
      }else{
        $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      }
    })
  }


  $scope.validar_cita_ext = function(){
    $http.get("api/api.php?opc=validar_cita").success(function(response) { 
      if(response.errorCode === '00000'){
        $state.go("saime.registro_datos_personales_ext");
      }else if(response.errorCode === '90000'){
        $scope.error2 = response.consumerMessage;
      }else{
        $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
      }
    })
  }



  $scope.validar_cita_menor_ven = function(minorType){
      $http.post("api/api.php?opc=validar_cita_menor", {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else if(response.errorCode === '90000'){
          $scope.error2 = response.consumerMessage;
        }else{
          $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }

  $scope.validar_cita_menor_ext = function(minorType){
      $http.post("api/api.php?opc=validar_cita_menor", {idpersona:""}).success(function(response) { 
        if(response.errorCode === '00000'){
          if(minorType==1){
            $state.go("saime.registro_menor_nc_ext")
          }else{
            $state.go("saime.registro_menor_nat_nc_ext")
          }
          
        }else if(response.errorCode === '90000'){
          $scope.error2 = response.consumerMessage;
        }else{
          $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }

}])


.controller('OlvidoContrasenaCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
  $("#header_status").hide();   

  $scope.enviar = function(form){
    if(form.$valid){
      $http.post("api/api.php?opc=req_pass", $scope.formData)
      .success(function(response) {
        if(response.errorCode==='00000'){
          $state.go("saime.enviocontrasena");
        }else if(response.errorCode==='90000'){
          $scope.error2 = response.consumerMessage;
        }else{
          $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      })
    }else{
      $scope.error2 = "Debe llenar el campo correctamente.";  
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
        $http.post("api/api.php?opc=reg_usuario", $scope.formData)
        .success(function(response) {
          if(response.errorCode==='00000'){
            $state.go("saime.registro_usuario_exitoso");
          }else if(response.errorCode==='90000'){
            $scope.error2 = response.consumerMessage;
          }else{
            $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
          }
        })
      }else{
        $scope.error2 = "Debe llenar los campos correctamente";  
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



.controller('NoticiasWebCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $("#header_status").hide();

  $http.post("api/api.php?opc=get_noticias_web", {pageNo:"1", pageSize:"10"}).success(function(response) { 
    if(response.errorCode==='00000'){
      $scope.noticias = response.noticiaWebList;
    }else{
      $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
    }
    
  })

}])




.controller('MapasCtrl', ['$scope', '$facebook', '$http', function($scope, $facebook, $http){

  $("#header_status").hide();
  $facebook.api("/me").then( 
      function(response) {
        $scope.url = 'https://graph.facebook.com/'+response.location.id;

        $http.get($scope.url).success(function(res) { 
          $scope.map = { center: { latitude: res.location.latitude, longitude: res.location.longitude }, zoom: 14 };
        })

      });

  /*
  $http.get('api/api.php?opc=get_oficinas_web').success(function(response) { 
      console.log(response)
    })
*/
  
}])



.controller('EstadoTramiteCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

      $scope.formData = {};

      
      $http.post("api/api.php?opc=detalle_tramites", {idpersona:"FBBC483865226C66E030320A0B0A37BE"})

        .success(function(response) {       

          if(response.errorCode == '00000'){

            $scope.estado = 'en_proceso';
            $scope.procesos = response;
            
          }else{
            $scope.mensaje = response.applicationMessage;
            $scope.estado = 'sin_solicitud';
          }

          //console.log(response)
          
            
        })

/*

    $http.get("api/api.php?opc=get_perfil")
        .success(function(response) {       

          console.log(response)
          
            
        })
*/


}])




  
  .controller('FormMenuCtrl', ['$scope', function($scope) {
    

  }])





  .controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
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


  // jVectorMap controller
  .controller('JVectorMapDemoCtrl', ['$scope', function($scope) {

    $scope.usa_markers = [
      {latLng: [40.71, -74.00], name: 'New York'},
      {latLng: [34.05, -118.24], name: 'Los Angeles'},
      {latLng: [41.87, -87.62], name: 'Chicago'},
      {latLng: [29.76, -95.36], name: 'Houston'},
      {latLng: [39.95, -75.16], name: 'Philadelphia'},
      {latLng: [38.90, -77.03], name: 'Washington'},
      {latLng: [37.36, -122.03], name: 'Silicon Valley'}
    ];
  }])



  // signup controller
  .controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      $http.post('api/signup', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = response;
        }else{
          $state.go('saime.inicio');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
  ;
