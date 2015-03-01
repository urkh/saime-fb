'use strict';



angular.module('app.controllers_ext', ['ngCookies'])



.controller('FormRegistroMenorCExtCtrl', ['$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', function($scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory) {

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

    $scope.buscar_menor_cedulado = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrame, cedula: cedula}).success(function(response) {
        if(response.errorCode === '00000'){
          $scope.menor = [response.cedulado]; 
        }else if(response.errorCode === '90000'){
          $scope.error2 = response.consumerMessage;
        }else{
          $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo."
        }
      })
    }


    $scope.validar_cita_menor = function(){
      $http.post("api/api.php?opc=validar_cita_menor", {idpersona:$scope.formData.minorId}).success(function(response) { 
        if(response.errorCode === '00000'){
          $scope.continuar1();
        }else if(response.errorCode === '90000'){
          $scope.error2 = response.consumerMessage;
        }else{
          $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        }
      })
    }


    $scope.buscar_madre = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letram, cedula: cedula}).success(function(response) {
        $scope.madre = [response.cedulado]; 
      })
    }

    $scope.buscar_padre = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrap, cedula: cedula}).success(function(response) {
        $scope.padre = [response.cedulado]; 
      })
    }

    $scope.buscar_legal = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letral, cedula: cedula}).success(function(response) {
        $scope.legal = [response.cedulado]; 
      })
    }



    $http.get("api/api.php?opc=get_paises").success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados").success(function(response) { 
      $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
      $scope.municipios = MunicipiosFactory($scope.formData.state);
    }

    $scope.get_parroquias = function(){
      $scope.parroquias = ParroquiasFactory($scope.formData.town);
    }


    $scope.get_cmunicipios = function(){
      $scope.municipios = MunicipiosFactory($scope.formData.currentState);
    }

    $scope.get_cparroquias = function(){
      $scope.parroquias = ParroquiasFactory($scope.formData.currentTown);
    }

    $scope.get_oficinas = function(){
      $scope.oficinas = OficinasFactory($scope.formData.currentState);
      //$scope.oficinas = OficinasFactory("126");
    }

    



    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step3 = "display:none;";
        $scope.step4 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }

     $scope.continuar3 = function(form){
      if((form.currentState && form.currentTown && form.currentParish && form.urbanization && form.noApto && form.street && form.pCode) && (form.cellPhone || form.workPhone || form.homePhone)) {      
        $scope.step4 = "display:none;";
        $scope.step5 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }



    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString();
      $scope.formData.country = $scope.formData.countryIni;

      $scope.formData.cellPhone = $scope.formNoData.phone_code_cell + $scope.formNoData.cellPhone;
      $scope.formData.homePhone = $scope.formNoData.phone_code_home + $scope.formNoData.homePhone;
      $scope.formData.workPhone = $scope.formNoData.phone_code_work + $scope.formNoData.workPhone;
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=sol_ven_menor", $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ven");
          }else if(response.errorCode === '90000'){
            $state.go("saime.solicitud_pasaporte_error_ven");
          }else{
            $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
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





.controller('FormRegistroMenorNcExtCtrl', ['$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', function($scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory) {

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


    $scope.buscar_madre = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letram, cedula: cedula}).success(function(response) {
        $scope.madre = [response.cedulado]; 
      })
    }

    $scope.buscar_padre = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrap, cedula: cedula}).success(function(response) {
        $scope.padre = [response.cedulado]; 
      })
    }

    $scope.buscar_legal = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letral, cedula: cedula}).success(function(response) {
        $scope.legal = [response.cedulado]; 
      })
    }



    $http.get("api/api.php?opc=get_paises").success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados").success(function(response) { 
      $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
      $scope.municipios = MunicipiosFactory($scope.formData.state);
    }

    $scope.get_parroquias = function(){
      $scope.parroquias = ParroquiasFactory($scope.formData.town);
    }


    $scope.get_cmunicipios = function(){
      $scope.municipios = MunicipiosFactory($scope.formData.currentState);
    }

    $scope.get_cparroquias = function(){
      $scope.parroquias = ParroquiasFactory($scope.formData.currentTown);
    }

    $scope.get_consulados = function(){
      $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
    }




    $scope.continuar1 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }

     $scope.continuar2 = function(form){
      if((form.currentState && form.currentTown && form.currentParish && form.currentCity && form.urbanization && form.noApto && form.street && form.pCode) && (form.cellPhone || form.workPhone || form.homePhone)) {              
        $scope.step2 = "display:none;";
        $scope.step3 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }


    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString();
      $scope.formData.country = $scope.formData.countryIni;

      $scope.formData.cellPhone = $scope.formNoData.phone_code_cell + $scope.formNoData.cellPhone;
      $scope.formData.homePhone = $scope.formNoData.phone_code_home + $scope.formNoData.homePhone;
      $scope.formData.workPhone = $scope.formNoData.phone_code_work + $scope.formNoData.workPhone;
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=sol_ven_menor", $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ven");
          }else if(response.errorCode === '90000'){
            $state.go("saime.solicitud_pasaporte_error_ven");
          }else{
            $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
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




.controller('FormRegistroDatosPersonalesExtCtrl', ['$scope', '$http', '$state', 'ConsuladosFactory',  function($scope, $http, $state, ConsuladosFactory) {

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formNoData = {};


    $http.get("api/api.php?opc=get_paises").success(function(response) { 
      $scope.paises = response.countryList
    })

    $scope.get_consulados = function(){
      $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
    }


    $scope.guardar = function(form){

      
      if($scope.formData.sedeConsular) {

        $http.post("api/api.php?opc=sol_ext_mayor", $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ext");
          }else if(response.errorCode === '90000'){
            $state.go("saime.solicitud_pasaporte_error_ext");
          }else{
            $scope.error2 = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          }
        })

      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }
    
    
    $scope.continuar1 = function(form){
      if(form.country && form.city && form.currentCity && form.pCode && form.countrySede) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos correctamente."
      }  
    }



    $scope.atras1 = function(){
      $scope.step2 = "display:none;";
      $scope.step1 = "display:block;";
    }


  }])





  ;
