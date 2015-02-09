'use strict';



angular.module('app.controllers', ['ngCookies'])
  .controller('AppCtrl', ['$scope', '$localStorage', '$window', 
    function(              $scope,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');

      // config
      $scope.app = {
        name: 'Saime - AngularJS',
        version: '1',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },

        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: false,
          asideFixed: true,
          asideFolded: true
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);


  }])



.controller('SignInCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

      $scope.formData = {};

      $scope.login = function() {

          $http.post("api/api.php?opc=signin", $scope.formData)

          .success(function(response) {
            if(response.status == 'granted'){
              $state.go('saime.inicio');
              
            }else{
              $scope.authError = response.msg;
            }
              
          })

      }

}])




.controller('InicioCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

      $scope.formData = {};


}])


.controller('EstadoTramiteCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

      $scope.formData = {};

      $http.get("api/api.php?opc=get_estado_tramites")

        .success(function(response) {       

          if(response.transaction == ''){

            $scope.estado = 'en_proceso';
            $scope.procesos = response;
            
          }else{
            $scope.mensaje = response.applicationMessage;
            $scope.estado = 'sin_solicitud';
          }
          
            
        })


}])



.controller('FormMenorVenNcCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {

    $scope.formData = {};

    /*
    $http.get("api/api.php?opc=get_paises")
    .success(function(response) { 
      $scope.paises = response.countryList
    })*/


    $scope.buscar_madre = function(cedula) {

      $http.post("api/api.php?opc=get_cedula", {letra: 'V', cedula: cedula})
      .success(function(response) {
          $scope.madre = [response.cedulado]; 
        })
    }

    $scope.buscar_padre = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: 'V', cedula: cedula})
        .success(function(response) {
          $scope.padre = [response.cedulado]; 
        })
    }

    $scope.buscar_legal = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: 'V', cedula: cedula})
        .success(function(response) {
          $scope.legal = [response.cedulado]; 
        })
    }


    $scope.set_mid = function(item, model) {
      $scope.formData.motherId = item.idpersona; 
    }

    $scope.set_pid = function(item, model) {
      $scope.formData.fatherId = item.idpersona; 
    }

    $scope.set_lid = function(item, model) {
      $scope.formData.legalId = item.idpersona; 
    }


    $scope.get_estados = function(){
      $http.get("api/api.php?opc=get_estados")
      .success(function(response) { 
        $scope.estados = response.stateList
      })
    }

    $scope.get_municipios = function(){
      $http.get("api/api.php?opc=get_municipios")
      .success(function(response) { 
        $scope.municipios = response.townList
      })
    }

    $scope.get_parroquias = function(){
      $http.get("api/api.php?opc=get_parroquias")
      .success(function(response) { 
        $scope.parroquias = response.parishList
      })
    }


    


    $scope.continuar = function(){
      $scope.step1 = "display:none;";
      $scope.step2 = "display:block;";
    }
    

    $scope.registro = function() {

        console.log($scope.formData)

        /*$http.post("api/api.php?opc=menorvennc", $scope.formData)

        .success(function(response) {
          if(response == 'aceptado'){
            //$state.go('saime.inicio');
            
          }else{
            $scope.authError = response.error_description;
          }
            
        })*/

    }





    $scope.date_clear = function () {
      $scope.dt = null;
    };
  
    $scope.date_open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.format = 'dd/MM/yyyy';


    /*
      $scope.inputs_jq = function() {
          $("input[type=text]").after("<div class='border-input'></div>");
          $("input[type=email]").after("<div class='border-input'></div>");
      };

      $scope.inputs_jq();


      */

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
