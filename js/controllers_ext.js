'use strict';



angular.module('app.controllers_ext', [])



.controller('FormRegistroMenorCExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $state, $timeout, $scope, $http, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {

  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }

  $("#header_status").hide();
  $scope.formData = {};
  $scope.formSearch = {};
  $scope.formNoData = {};

    $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

    $scope.generos = [
      { id: 'M', genero: 'Masculino'},
      { id: 'F', genero: 'Femenino'}
    ];

    $scope.codigos = CodigoTelfFactory;

    $scope.buscar_menor_cedulado = function() {
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrame, cedula: $scope.formSearch.cedula}).success(function(response) {
        if(response.errorCode === '00000'){

          $http.post("api/api.php?opc=validar_cita_menor&bcode="+$rootScope.bcode, {idpersona:response.cedulado.idpersona, minorType:$scope.formData.minorType}).success(function(res) { 
            if(res.errorCode === '00000'){
              $scope.formData.minorId = response.cedulado.idpersona; 
              $scope.formSearch.cedula = response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
              $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
              $timeout(function(){
                $scope.showModal = false;
                $scope.continuar1();
              }, 1500);
            }else if(res.errorCode === '90000'){
              $scope.error = res.consumerMessage;
            }else{
              $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            }
          })

        }else if(response.errorCode === '90000'){
          $scope.error = response.consumerMessage;
        }else{
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      })
    }


    $scope.buscar_madre = function() {
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.motherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);

          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })
    }

    $scope.buscar_padre = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;

      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.fatherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
            
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })


    }

    $scope.buscar_legal = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.legalId = response.cedulado.idpersona; 
            $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
            
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })
    }



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })



    $scope.get_consulados = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    
    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step3 = "display:none;";
        $scope.step4 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }

     $scope.continuar3 = function(form){
      if(form.currentCity && form.countrySede && form.pCode) {      
        $scope.step4 = "display:none;";
        $scope.step5 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }



    $scope.guardar = function(form){
      $scope.formData.country = $scope.formData.countryIni;
      $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");
      
      if($scope.formData.sedeConsular){

        $http.post("api/api.php?opc=sol_ext_menor&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ext");
          }else if(response.errorCode === '90000'){
            //$state.go("saime.solicitud_pasaporte_error_ext");
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }else{
            $scope.showModal = true;
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }



    $scope.atras1 = function(){
      $scope.step2 = "display:none;";
      $scope.step1 = "display:block;";
    }

    $scope.atras2 = function(){
      $scope.step4 = "display:none;";
      $scope.step3 = "display:block;";
    }

    $scope.atras3 = function(){
      $scope.step5 = "display:none;";
      $scope.step4 = "display:block;";
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


}])





.controller('FormRegistroMenorNcExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $state, $timeout, $scope, $http, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {

    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formSearch = {};
    $scope.formNoData = {};

    $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

    $scope.generos = [
      { id: 'M', genero: 'Masculino'},
      { id: 'F', genero: 'Femenino'}
    ];


    $scope.codigos = CodigoTelfFactory;


    $scope.buscar_madre = function() {
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.motherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);

          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })
    }

    $scope.buscar_padre = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;

      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.fatherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
            
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })


    }

    $scope.buscar_legal = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
        if(response.errorCode === '00000'){
            $scope.formData.legalId = response.cedulado.idpersona; 
            $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
            
          }else if(response.errorCode === '90000'){
            $scope.error = response.consumerMessage;
          }else{
            $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
          }     
        
      })
    }



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })


    $scope.get_consulados = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.continuar1 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }

     $scope.continuar2 = function(form){
      if(form.currentCity && form.countrySede && form.pCode) {     
        $scope.step2 = "display:none;";
        $scope.step3 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }


    $scope.guardar = function(form){
      $scope.formData.country = $scope.formData.countryIni;
      $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");

     
      if($scope.formData.sedeConsular){

        $http.post("api/api.php?opc=sol_ext_menor&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ext");
          }else if(response.errorCode === '90000'){
            //$state.go("saime.solicitud_pasaporte_error_ext");
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }else{
            $scope.showModal = true;
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }


    $scope.atras1 = function(){
      $scope.step2 = "display:none;";
      $scope.step1 = "display:block;";
    }

    $scope.atras2 = function(){
      $scope.step3 = "display:none;";
      $scope.step2 = "display:block;";
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

}])




.controller('FormRegistroDatosPersonalesExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'ConsuladosFactory',  function($rootScope, $state, $timeout, $scope, $http, ConsuladosFactory) {

  if(!$rootScope.authenticated){
    $state.go('saime.autenticacion');
  }

  $("#header_status").hide();
  $scope.formData = {};
  $scope.formNoData = {};


    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })

    $scope.get_consulados = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.guardar = function(form){

      
      if($scope.formData.sedeConsular) {

        $http.post("api/api.php?opc=sol_ext_mayor&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ext");
          }else if(response.errorCode === '90000'){
            //$state.go("saime.solicitud_pasaporte_error_ext");
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }else{
            $scope.showModal = true;
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }
    
    
    $scope.continuar1 = function(form){
      if(form.country && form.city && form.currentCity && form.pCode && form.countrySede) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }



    $scope.atras1 = function(){
      $scope.step2 = "display:none;";
      $scope.step1 = "display:block;";
    }


  }])





  ;
