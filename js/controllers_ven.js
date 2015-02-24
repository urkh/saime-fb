'use strict';



angular.module('app.controllers_ven', ['ngCookies'])





.controller('FormRegistroMenorCCtrl', ['$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', function($scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory) {

    $scope.formData = {};
    $scope.formSearch = {};

    $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

    $scope.generos = [
      { id: 'M', genero: 'Masculino'},
      { id: 'F', genero: 'Femenino'}
    ];

    $scope.buscar_menor_cedulado = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrame, cedula: cedula})
      .success(function(response) {
          $scope.menor = [response.cedulado]; 
        })
    }


    $scope.buscar_madre = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letram, cedula: cedula})
      .success(function(response) {
          $scope.madre = [response.cedulado]; 
        })
    }

    $scope.buscar_padre = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrap, cedula: cedula})
        .success(function(response) {
          $scope.padre = [response.cedulado]; 
        })
    }

    $scope.buscar_legal = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letral, cedula: cedula})
        .success(function(response) {
          $scope.legal = [response.cedulado]; 
        })
    }



    $http.get("api/api.php?opc=get_paises")
    .success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados")
    .success(function(response) { 
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
    }




    $scope.continuar1 = function(form){
      if(form.$valid) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.error1 = "Debe llenar los campos requeridos";
      }
    }


    $scope.continuar2 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step3 = "display:none;";
        $scope.step4 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos requeridos";
      }  
    }

     $scope.continuar3 = function(form){
      if((form.currentState && form.currentTown && form.currentParish && form.urbanization && form.noApto && form.street && form.pCode) && (form.cellPhone || form.workPhone || form.homePhone)) {      
        $scope.step4 = "display:none;";
        $scope.step5 = "display:block;";
      }else{
        $scope.error2 = "Debe llenar los campos requeridos";
      }  
    }


    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString();
      $scope.formData.country = $scope.formData.countryIni;
      if($scope.formData.offices != ""){
        console.log("fino");
      }else{
        $scope.error2 = "Debe llenar los campos requeridos";
      }  

      console.log(form)
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





.controller('FormRegistroMenorNcCtrl', ['$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', function($scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory) {

   $scope.formData = {};
    $scope.formSearch = {};

    $scope.letras = [
      { id: 'V', letra: 'V'},
      { id: 'E', letra: 'E'}
    ];

    $scope.generos = [
      { id: 'M', genero: 'Masculino'},
      { id: 'F', genero: 'Femenino'}
    ];


    $scope.buscar_madre = function(cedula) {
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letram, cedula: cedula})
      .success(function(response) {
          $scope.madre = [response.cedulado]; 
        })
    }

    $scope.buscar_padre = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letrap, cedula: cedula})
        .success(function(response) {
          $scope.padre = [response.cedulado]; 
        })
    }

    $scope.buscar_legal = function(cedula){
      $http.post("api/api.php?opc=get_cedula", {letra: $scope.formSearch.letral, cedula: cedula})
        .success(function(response) {
          $scope.legal = [response.cedulado]; 
        })
    }



    $http.get("api/api.php?opc=get_paises")
    .success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados")
    .success(function(response) { 
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
    }




    $scope.continuar1 = function(form){
      if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.error2 = "Los campos con asterisco (*) son requeridos";
      }  
    }

     $scope.continuar2 = function(form){
      if((form.currentState && form.currentTown && form.currentParish && form.currentCity && form.urbanization && form.noApto && form.street && form.pCode) && (form.cellPhone || form.workPhone || form.homePhone)) {              
        $scope.step2 = "display:none;";
        $scope.step3 = "display:block;";
      }else{
        $scope.error2 = "Los campos con asterisco (*) son requeridos";
      }  
    }


    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString();
      $scope.formData.country = $scope.formData.countryIni;
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=sol_ven_menor", $scope.formData)
          .success(function(response) {
              if(response.errorCode == '00000'){
                $state.go("saime.solicitud_pasaporte_exitoso_ven");
              }else{
                $state.go("saime.solicitud_pasaporte_error_ven");
              }
          })

      }else{
        $scope.error2 = "Los campos con asterisco (*) son requeridos";
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



  .controller('FormRegistroDatosPersonalesVenCtrl', ['$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', function($scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory) {


    $http.get("api/api.php?opc=get_paises")
    .success(function(response) { 
      $scope.paises = response.countryList
    })


    $http.get("api/api.php?opc=get_estados")
      .success(function(response) { 
        $scope.estados = response.stateList;
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
    }

    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString();
      $scope.formData.country = $scope.formData.countryIni;
      $http.post("api/api.php?opc=reg_persona", $scope.formData)
        .success(function(response) {
            if(response.errorCode == '00000'){
              $state.go("saime.solicitud_pasaporte_exitoso_ven");
            }else{
              $state.go("saime.solicitud_pasaporte_error_ven");
            }
        })
    }
    
    
    $scope.continuar1 = function(){
      //if((form.name1 && form.lastName1 && form.bDate && form.countryIni && form.state && form.town) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      //}else{
      //  $scope.error2 = "Debe llenar los campos requeridos";
      //}  
    }


    $scope.continuar2 = function(){
      //if((form.name1 && form.lastName1 && form.bDate && form.countryIni && form.state && form.town) && (form.motherId || form.fatherId || form.legalId)) {
        $scope.step2 = "display:none;";
        $scope.step3 = "display:block;";
      //}else{
      //  $scope.error2 = "Debe llenar los campos requeridos";
      //}  
    }

    $scope.atras1 = function(){
      $scope.step2 = "display:none;";
      $scope.step1 = "display:block;";
    }

    $scope.atras2 = function(){
      $scope.step3 = "display:none;";
      $scope.step2 = "display:block;";
    }



  }])


  ;
